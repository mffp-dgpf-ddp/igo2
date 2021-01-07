           ts.forEach(node.arguments, visit);
                }
                else if (isPromiseReturningExpression(node, checker, "catch")) {
                    setOfExpressionsToReturn.set(ts.getNodeId(node).toString(), true);
                    // if .catch() is the last call in the chain, move leftward in the chain until we hit something else that should be returned
                    ts.forEachChild(node, visit);
                }
                else if (isPromiseReturningExpression(node, checker)) {
                    setOfExpressionsToReturn.set(ts.getNodeId(node).toString(), true);
                    // don't recurse here, since we won't refactor any children or arguments of the expression
                }
                else {
                    ts.forEachChild(node, visit);
                }
            });
            return setOfExpressionsToReturn;
        }
        /*
            Returns true if node is a promise returning expression
            If name is not undefined, node is a promise returning call of name
        */
        function isPromiseReturningExpression(node, checker, name) {
            var isNodeExpression = name ? ts.isCallExpression(node) : ts.isExpression(node);
            var isExpressionOfName = isNodeExpression && (!name || ts.hasPropertyAccessExpressionWithName(node, name));
            var nodeType = isExpressionOfName && checker.getTypeAtLocation(node);
            return !!(nodeType && checker.getPromisedTypeOfPromise(nodeType));
        }
        function declaredInFile(symbol, sourceFile) {
            return symbol.valueDeclaration && symbol.valueDeclaration.getSourceFile() === sourceFile;
        }
        /*
            Renaming of identifiers may be neccesary as the refactor changes scopes -
            This function collects all existing identifier names and names of identifiers that will be created in the refactor.
            It then checks for any collisions and renames them through getSynthesizedDeepClone
        */
        function renameCollidingVarNames(nodeToRename, checker, synthNamesMap, context, setOfAllExpressionsToReturn, originalType, allVarNames) {
            var identsToRenameMap = ts.createMap(); // key is the symbol id
            var collidingSymbolMap = ts.createMap();
            ts.forEachChild(nodeToRename, function visit(node) {
                if (!ts.isIdentifier(node)) {
                    ts.forEachChild(node, visit);
                    return;
                }
                var symbol = checker.getSymbolAtLocation(node);
                var isDefinedInFile = symbol && declaredInFile(symbol, context.sourceFile);
                if (symbol && isDefinedInFile) {
                    var type = checker.getTypeAtLocation(node);
                    var lastCallSignature = getLastCallSignature(type, checker);
                    var symbolIdString = ts.getSymbolId(symbol).toString();
                    // if the identifier refers to a function we want to add the new synthesized variable for the declaration (ex. blob in let blob = res(arg))
                    // Note - the choice of the last call signature is arbitrary
                    if (lastCallSignature && !ts.isFunctionLikeDeclaration(node.parent) && !synthNamesMap.has(symbolIdString)) {
                        var firstParameter = ts.firstOrUndefined(lastCallSignature.parameters);
                        var ident = firstParameter && ts.isParameter(firstParameter.valueDeclaration) && ts.tryCast(firstParameter.valueDeclaration.name, ts.isIdentifier) || ts.createOptimisticUniqueName("result");
                        var synthName = getNewNameIfConflict(ident, collidingSymbolMap);
                        synthNamesMap.set(symbolIdString, synthName);
                        allVarNames.push({ identifier: synthName.identifier, symbol: symbol });
                        addNameToFrequencyMap(collidingSymbolMap, ident.text, symbol);
                    }
                    // we only care about identifiers that are parameters and declarations (don't care about other uses)
                    else if (node.parent && (ts.isParameter(node.parent) || ts.isVariableDeclaration(node.parent))) {
                        var originalName = node.text;
                        var collidingSymbols = collidingSymbolMap.get(originalName);
                        // if the identifier name conflicts with a different identifier that we've already seen
                        if (collidingSymbols && collidingSymbols.some(function (prevSymbol) { return prevSymbol !== symbol; })) {
                            var newName = getNewNameIfConflict(node, collidingSymbolMap);
                            identsToRenameMap.set(symbolIdString, newName.identifier);
                            synthNamesMap.set(symbolIdString, newName);
                            allVarNames.push({ identifier: newName.identifier, symbol: symbol });
                            addNameToFrequencyMap(collidingSymbolMap, originalName, symbol);
                        }
                        else {
                            var identifier = ts.getSynthesizedDeepClone(node);
                            identsToRenameMap.set(symbolIdString, identifier);
                            synthNamesMap.set(symbolIdString, { identifier: identifier, types: [], numberOfAssignmentsOriginal: allVarNames.filter(function (elem) { return elem.identifier.text === node.text; }).length /*, numberOfAssignmentsSynthesized: 0*/ });
                            if ((ts.isParameter(node.parent) && isExpressionOrCallOnTypePromise(node.parent.parent)) || ts.isVariableDeclaration(node.parent)) {
                                allVarNames.push({ identifier: identifier, symbol: symbol });
                                addNameToFrequencyMap(collidingSymbolMap, originalName, symbol);
                            }
                        }
                    }
                }
            });
            return ts.getSynthesizedDeepCloneWithRenames(nodeToRename, /*includeTrivia*/ true, identsToRenameMap, checker, deepCloneCallback);
            function isExpressionOrCallOnTypePromise(child) {
                var node = child.parent;
                if (ts.isCallExpression(node) || ts.isIdentifier(node) && !setOfAllExpressionsToReturn.get(ts.getNodeId(node).toString())) {
                    var nodeType = checker.getTypeAtLocation(node);
                    var isPromise = nodeType && checker.getPromisedTypeOfPromise(nodeType);
                    return !!isPromise;
                }
                return false;
            }
            function deepCloneCallback(node, clone) {
                if (ts.isIdentifier(node)) {
                    var symbol = checker.getSymbolAtLocation(node);
                    var symboldIdString = symbol && ts.getSymbolId(symbol).toString();
                    var renameInfo = symbol && synthNamesMap.get(symboldIdString);
                    if (renameInfo) {
                        var type = checker.getTypeAtLocation(node);
                        originalType.set(ts.getNodeId(clone).toString(), type);
                    }
                }
                var val = setOfAllExpressionsToReturn.get(ts.getNodeId(node).toString());
                if (val !== undefined) {
                    setOfAllExpressionsToReturn.delete(ts.getNodeId(node).toString());
                    setOfAllExpressionsToReturn.set(ts.getNodeId(clone).toString(), val);
                }
            }
        }
        function addNameToFrequencyMap(renamedVarNameFrequencyMap, originalName, symbol) {
            if (renamedVarNameFrequencyMap.has(originalName)) {
                renamedVarNameFrequencyMap.get(originalName).push(symbol);
            }
            else {
                renamedVarNameFrequencyMap.set(originalName, [symbol]);
            }
        }
        function getNewNameIfConflict(name, originalNames) {
            var numVarsSameName = (originalNames.get(name.text) || ts.emptyArray).length;
            var numberOfAssignmentsOriginal = 0;
            var identifier = numVarsSameName === 0 ? name : ts.createIdentifier(name.text + "_" + numVarsSameName);
            return { identifier: identifier, types: [], numberOfAssignmentsOriginal: numberOfAssignmentsOriginal };
        }
        // dispatch function to recursively build the refactoring
        // should be kept up to date with isFixablePromiseHandler in suggestionDiagnostics.ts
        function transformExpression(node, transformer, outermostParent, prevArgName) {
            if (!node) {
                return ts.emptyArray;
            }
            var originalType = ts.isIdentifier(node) && transformer.originalTypeMap.get(ts.getNodeId(node).toString());
            var nodeType = originalType || transformer.checker.getTypeAtLocation(node);
            if (ts.isCallExpression(node) && ts.hasPropertyAccessExpressionWithName(node, "then") && nodeType && !!transformer.checker.getPromisedTypeOfPromise(nodeType)) {
                return transformThen(node, transformer, outermostParent, prevArgName);
            }
            else if (ts.isCallExpression(node) && ts.hasPropertyAccessExpressionWithName(node, "catch") && nodeType && !!transformer.checker.getPromisedTypeOfPromise(nodeType)) {
                return transformCatch(node, transformer, prevArgName);
            }
            else if (ts.isPropertyAccessExpression(node)) {
                return transformExpression(node.expression, transformer, outermostParent, prevArgName);
            }
            else if (nodeType && transformer.checker.getPromisedTypeOfPromise(nodeType)) {
                return transformPromiseCall(node, transformer, prevArgName);
            }
            codeActionSucceeded = false;
            return ts.emptyArray;
        }
        function transformCatch(node, transformer, prevArgName) {
            var func = node.arguments[0];
            var argName = getArgName(func, transformer);
            var shouldReturn = transformer.setOfExpressionsToReturn.get(ts.getNodeId(node).toString());
            /*
                If there is another call in the chain after the .catch() we are transforming, we will need to save the result of both paths (try block and catch block)
                To do this, we will need to synthesize a variable that we were not aware of while we were adding identifiers to the synthNamesMap
                We will use the prevArgName and then update the synthNamesMap with a new variable name for the next transformation step
            */
            if (prevArgName && !shouldReturn) {
                prevArgName.numberOfAssignmentsOriginal = 2; // Try block and catch block
                transformer.synthNamesMap.forEach(function (val, key) {
                    if (val.identifier.text === prevArgName.identifier.text) {
                        var newSynthName = createUniqueSynthName(prevArgName);
                        transformer.synthNamesMap.set(key, newSynthName);
                    }
                });
                // update the constIdentifiers list
                if (transformer.constIdentifiers.some(function (elem) { return elem.text === prevArgName.identifier.text; })) {
                    transformer.constIdentifiers.push(createUniqueSynthName(prevArgName).identifier);
                }
            }
            var tryBlock = ts.createBlock(transformExpression(node.expression, transformer, node, prevArgName));
            var transformationBody = getTransformationBody(func, prevArgName, argName, node, transformer);
            var catchArg = argName ? argName.identifier.text : "e";
            var catchClause = ts.createCatchClause(catchArg, ts.createBlock(tran