ractToOtherFunctionLike = createMessage("Cannot extract method to a function-like scope that is not a function");
                Messages.cannotExtractToJSClass = createMessage("Cannot extract constant to a class scope in JS");
                Messages.cannotExtractToExpressionArrowFunction = createMessage("Cannot extract constant to an arrow function without a block");
            })(Messages = extractSymbol.Messages || (extractSymbol.Messages = {}));
            var RangeFacts;
            (function (RangeFacts) {
                RangeFacts[RangeFacts["None"] = 0] = "None";
                RangeFacts[RangeFacts["HasReturn"] = 1] = "HasReturn";
                RangeFacts[RangeFacts["IsGenerator"] = 2] = "IsGenerator";
                RangeFacts[RangeFacts["IsAsyncFunction"] = 4] = "IsAsyncFunction";
                RangeFacts[RangeFacts["UsesThis"] = 8] = "UsesThis";
                /**
                 * The range is in a function which needs the 'static' modifier in a class
                 */
                RangeFacts[RangeFacts["InStaticRegion"] = 16] = "InStaticRegion";
            })(RangeFacts || (RangeFacts = {}));
            /**
             * getRangeToExtract takes a span inside a text file and returns either an expression or an array
             * of statements representing the minimum set of nodes needed to extract the entire span. This
             * process may fail, in which case a set of errors is returned instead (these are currently
             * not shown to the user, but can be used by us diagnostically)
             */
            // exported only for tests
            function getRangeToExtract(sourceFile, span) {
                var length = span.length;
                if (length === 0) {
                    return { errors: [ts.createFileDiagnostic(sourceFile, span.start, length, Messages.cannotExtractEmpty)] };
                }
                // Walk up starting from the the start position until we find a non-SourceFile node that subsumes the selected span.
                // This may fail (e.g. you select two statements in the root of a source file)
                var start = ts.getParentNodeInSpan(ts.getTokenAtPosition(sourceFile, span.start), sourceFile, span);
                // Do the same for the ending position
                var end = ts.getParentNodeInSpan(ts.findTokenOnLeftOfPosition(sourceFile, ts.textSpanEnd(span)), sourceFile, span);
                var declarations = [];
                // We'll modify these flags as we walk the tree to collect data
                // about what things need to be done as part of the extraction.
                var rangeFacts = RangeFacts.None;
                if (!start || !end) {
                    // cannot find either start or end node
                    return { errors: [ts.createFileDiagnostic(sourceFile, span.start, length, Messages.cannotExtractRange)] };
                }
                if (start.parent !== end.parent) {
                    // start and end nodes belong to different subtrees
                    return { errors: [ts.createFileDiagnostic(sourceFile, span.start, length, Messages.cannotExtractRange)] };
                }
                if (start !== end) {
                    // start and end should be statements and parent should be either block or a source file
                    if (!isBlockLike(start.parent)) {
                        return { errors: [ts.createFileDiagnostic(sourceFile, span.start, length, Messages.cannotExtractRange)] };
                    }
                    var statements = [];
                    var start2 = start; // TODO: GH#18217 Need to alias `start` to get this to compile. See https://github.com/Microsoft/TypeScript/issues/19955#issuecomment-344118248
                    for (var _i = 0, _a = start2.parent.statements; _i < _a.length; _i++) {
                        var statement = _a[_i];
                        if (statement === start || statements.length) {
                            var errors_1 = checkNode(statement);
                            if (errors_1) {
                                return { errors: errors_1 };
                            }
                            statements.push(statement);
                        }
                        if (statement === end) {
                            break;
                        }
                    }
                    if (!statements.length) {
                        // https://github.com/Microsoft/TypeScript/issues/20559
                        // Ranges like [|case 1: break;|] will fail to populate `statements` because
                        // they will never find `start` in `start.parent.statements`.
                        // Consider: We could support ranges like [|case 1:|] by refining them to just
                        // the expression.
                        return { errors: [ts.createFileDiagnostic(sourceFile, span.start, length, Messages.cannotExtractRange)] };
                    }
                    return { targetRange: { range: statements, facts: rangeFacts, declarations: declarations } };
                }
                if (ts.isReturnStatement(start) && !start.expression) {
                    // Makes no sense to extract an expression-less return statement.
                    return { errors: [ts.createFileDiagnostic(sourceFile, span.start, length, Messages.cannotExtractRange)] };
                }
                // We have a single node (start)
                var node = refineNode(start);
                var errors = checkRootNode(node) || checkNode(node);
                if (errors) {
                    return { errors: errors };
                }
                return { targetRange: { range: getStatementOrExpressionRange(node), facts: rangeFacts, declarations: declarations } }; // TODO: GH#18217
                /**
                 * Attempt to refine the extraction node (generally, by shrinking it) to produce better results.
                 * @param node The unrefined extraction node.
                 */
                function refineNode(node) {
                    if (ts.isReturnStatement(node)) {
                        if (node.expression) {
                            return node.expression;
                        }
                    }
                    else if (ts.isVariableStatement(node)) {
                        var numInitializers = 0;
                        var lastInitializer = void 0;
                        for (var _i = 0, _a = node.declarationList.declarations; _i < _a.length; _i++) {
                            var declaration = _a[_i];
                            if (declaration.initializer) {
                                numInitializers++;
                                lastInitializer = declaration.initializer;
                            }
                        }
                        if (numInitializers === 1) {
                            return lastInitializer;
                        }
                        // No special handling if there are multiple initializers.
                    }
                    else if (ts.isVariableDeclaration(node)) {
                        if (node.initializer) {
                            return node.initializer;
                        }
                    }
                    return node;
                }
                function checkRootNode(node) {
                    if (ts.isIdentifier(ts.isExpressionStatement(node) ? node.expression : node)) {
                        return [ts.createDiagnosticForNode(node, Messages.cannotExtractIdentifier)];
                    }
                    return undefined;
                }
                function checkForStaticContext(nodeToCheck, containingClass) {
                    var current = nodeToCheck;
                    while (current !== containingClass) {
                        if (current.kind === 154 /* PropertyDeclaration */) {
                            if (ts.hasModifier(current, 32 /* Static */)) {
                                rangeFacts |= RangeFacts.InStaticRegion;
                            }
                            break;
                        }
                        else if (current.kind === 151 /* Parameter */) {
                            var ctorOrMethod = ts.getContainingFunction(current);
                            if (ctorOrMethod.kind === 157 /* Constructor */) {
                                rangeFacts |= RangeFacts.InStaticRegion;
                            }
                            break;
                        }
                        else if (current.kind === 156 /* MethodDeclaration */) {
                            if (ts.hasModifier(current, 32 /* Static */)) {
                                rangeFacts |= RangeFacts.InStaticRegion;
                            }
                        }
                        current = current.parent;
                    }
                }
                // Verifies whether we can actually extract this node or not.
                function checkNode(nodeToCheck) {
                    var PermittedJumps;
                    (function (PermittedJumps) {
                        PermittedJumps[PermittedJumps["None"] = 0] = "None";
                        PermittedJumps[PermittedJumps["Break"] = 1] = "Break";
                        PermittedJumps[PermittedJumps["Continue"] = 2] = "Continue";
                        PermittedJumps[PermittedJumps["Return"] = 4] = "Return";
                    })(PermittedJumps || (PermittedJumps = {}));
                    // We believe it's true because the node is from the (unmodified) tree.
                    ts.Debug.assert(nodeToCheck.pos <= nodeToCheck.end, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
                    // For understanding how skipTrivia functioned:
                    ts.Debug.assert(!ts.positionIsSynthesized(nodeToCheck.pos), "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
                    if (!ts.isStatement(nodeToCheck) && !(ts.isExpressionNode(nodeToCheck) && isExtractableExpression(nodeToCheck))) {
                        return [ts.createDiagnosticForNode(nodeToCheck, Messages.statementOrExpressionExpected)];
                    }
                    if (nodeToCheck.flags & 4194304 /* Ambient */) {
                        return [ts.createDiagnosticForNode(nodeToCheck, Messages.cannotExtractAmbientBlock)];
                    }
                    // If we're in a class, see whether we're in a static region (static property initializer, static method, class constructor parameter default)
                    var containingClass = ts.getContainingClass(nodeToCheck);
                    if (containingClass) {
                        checkForStaticContext(nodeToCheck, containingClass);
                    }
                    var errors;
                    var permittedJumps = 4 /* Return */;
                    var seenLabels;
                    visit(nodeToCheck);
                    return errors;
                    function visit(node) {
                        if (errors) {
                            // already found an error - can stop now
                            return true;
                        }
                        if (ts.isDeclaration(node)) {
                            var declaringNode = (node.kind === 237 /* VariableDeclaration */) ? node.parent.parent : node;
                            if (ts.hasModifier(declaringNode, 1 /* Export */)) {
                                // TODO: GH#18217 Silly to use `errors ||` since it's definitely not defined (see top of `visit`)
                                // Also, if we're only pushing one error, just use `let error: Diagnostic | undefined`!
                                // Also TODO: GH#19956
                                (errors || (errors = [])).push(ts.createDiagnosticForNode(node, Messages.cannotExtractExportedEntity));
                                return true;
                            }
                            declarations.push(node.symbol);
                        }
                        // Some things can't be extracted in certain situations
                        switch (node.kind) {
                            case 249 /* ImportDeclaration */:
                                (errors || (errors = [])).push(ts.createDiagnosticForNode(node, Messages.cannotExtractImport));
                                return true;
                            case 98 /* SuperKeyword */:
                                // For a super *constructor call*, we have to be extracting the entire class,
                                // but a super *method call* simply implies a 'this' reference
                                if (node.parent.kind === 191 /* CallExpression */) {
                                    // Super constructor call
                                    var containingClass_1 = ts.getContainingClass(node); // TODO:GH#18217
                                    if (containingClass_1.pos < span.start || containingClass_1.end >= (span.start + span.length)) {
                                        (errors || (errors = [])).push(ts.createDiagnosticForNode(node, Messages.cannotExtractSuper));
                                        return true;
                                    }
                                }
                                else {
                                    rangeFacts |= RangeFacts.UsesThis;
                                }
                                break;
                        }
                        if (ts.isFunctionLikeDeclaration(node) || ts.isClassLike(node)) {
                            switch (node.kind) {
                                case 239 /* FunctionDeclaration */:
                                case 240 /* ClassDeclaration */:
                                    if (ts.isSourceFile(node.parent) && node.parent.externalModuleIndicator === undefined) {
                                        // You cannot extract global declarations
                                        (errors || (errors = [])).push(ts.createDiagnosticForNode(node, Messages.functionWillNotBeVisibleInTheNewScope));
                                    }
                                    break;
                            }
                            // do not dive into functions or classes
                            return false;
                        }
                        var savedPermittedJumps = permittedJumps;
                        switch (node.kind) {
                            case 222 /* IfStatement */:
                                permittedJumps = 0 /* None */;
                                break;
                            case 235 /* TryStatement */:
                                // forbid all jumps inside try blocks
                                permittedJumps = 0 /* None */;
                                break;
                            case 218 /* Block */:
                                if (node.parent && node.parent.kind === 235 /* TryStatement */ && node.parent.finallyBlock === node) {
                                    // allow unconditional returns from finally blocks
                                    permittedJumps = 4 /* Return */;
                                }
                                break;
                            case 271 /* CaseClause */:
                                // allow unlabeled break inside case clauses
                                permittedJumps |= 1 /* Break */;
                                break;
                            default:
                                if (ts.isIterationStatement(node, /*lookInLabeledStatements*/ false)) {
                                    // allow unlabeled break/continue inside loops
                                    permittedJumps |= 1 /* Break */ | 2 /* Continue */;
                                }
                                break;
                        }
                        switch (node.kind) {
                            case 178 /* ThisType */:
                            case 100 /* ThisKeyword */:
                                rangeFacts |= RangeFacts.UsesThis;
                                break;
                            case 233 /* LabeledStatement */:
                                {
                                    var label = node.label;
                                    (seenLabels || (seenLabels = [])).push(label.escapedText);
                                    ts.forEachChild(node, visit);
                                    seenLabels.pop();
                                    break;
                                }
                            case 229 /* BreakStatement */:
                            case 228 /* ContinueStatement */:
                                {
                                    var label = node.label;
                                    if (label) {
                                        if (!ts.contains(seenLabels, label.escapedText)) {
                                            // attempts to jump to label that is not in range to be extracted
                                            (errors || (errors = [])).push(ts.createDiagnosticForNode(node, Messages.cannotExtractRangeContainingLabeledBreakOrContinueStatementWithTargetOutsideOfTheRange));
                                        }
                                    }
                                    else {
                                        if (!(permittedJumps & (node.kind === 229 /* BreakStatement */ ? 1 /* Break */ : 2 /* Continue */))) {
                                            // attempt to break or continue in a forbidden context
                                            (errors || (errors = [])).push(ts.createDiagnosticForNode(node, Messages.cannotExtractRangeContainingConditionalBreakOrContinueStatements));
                                        }
                                    }
                                    break;
                                }
                            case 201 /* AwaitExpression */:
                                rangeFacts |= RangeFacts.IsAsyncFunction;
                                break;
                            case 207 /* YieldExpression */:
                                rangeFacts |= RangeFacts.IsGenerator;
                                break;
                            case 230 /* ReturnStatement */:
                                if (permittedJumps & 4 /* Return */) {
                                    rangeFacts |= RangeFacts.HasReturn;
                                }
                                else {
                                    (errors || (errors = [])).push(ts.createDiagnosticForNode(node, Messages.cannotExtractRangeContainingConditionalReturnStatement));
                                }
                                break;
                            default:
                                ts.forEachChild(node, visit);
                                break;
                        }
                        permittedJumps = savedPermittedJumps;
                    }
                }
            }
            extractSymbol.getRangeToExtract = getRangeToExtract;
            function getStatementOrExpressionRange(node) {
                if (ts.isStatement(node)) {
                    return [node];
                }
                else if (ts.isExpressionNode(node)) {
                    // If our selection is the expression in an ExpressionStatement, expand
                    // the selection to include the enclosing Statement (this stops us
                    // from trying to care about the return value of the extracted function
                    // and eliminates double semicolon insertion in certain scenarios)
                    return ts.isExpressionStatement(node.parent) ? [node.parent] : node;
                }
                return undefined;
            }
            function isScope(node) {
                return ts.isFunctionLikeDeclaration(node) || ts.isSourceFile(node) || ts.isModuleBlock(node) || ts.isClassLike(node);
            }
            /**
             * Computes possible places we could extract the function into. For example,
             * you may be able to extract into a class method *or* local closure *or* namespace function,
             * depending on what's in the extracted body.
             */
            function collectEnclosingScopes(range) {
                var current = isReadonlyArray(range.range) ? ts.first(range.range) : range.range;
                if (range.facts & RangeFacts.UsesThis) {
                    // if range uses this as keyword or as type inside the class then it can only be extracted to a method of the containing class
                    var containingClass = ts.getContainingClass(current);
                    if (containingClass) {
                        var containingFunction = ts.findAncestor(current, ts.isFunctionLikeDeclaration);
                        return containingFunction
                            ? [containingFunction, containingClass]
                            : [containingClass];
                    }
                }
                var scopes = [];
                while (true) {
                    current = current.parent;
                    // A function parameter's initializer is actually in the outer scope, not the function declaration
                    if (current.kind === 151 /* Parameter */) {
                        // Skip all the way to the outer scope of the function that declared this parameter
                        current = ts.findAncestor(current, function (parent) { return ts.isFunctionLikeDeclaration(parent); }).parent;
                    }
                    // We want to find the nearest parent where we can place an "equivalent" sibling to the node we're extracting out of.
                    // Walk up to the closest parent of a place where we can logically put a sibling:
                    //  * Function declaration
                    //  * Class declaration or expression
                    //  * Module/namespace or source file
                    if (isScope(current)) {
                        scopes.push(current);
                        if (current.kind === 279 /* SourceFile */) {
                            return scopes;
                        }
                    }
                }
            }
            function getFunctionExtractionAtIndex(targetRange, context, requestedChangesIndex) {
                var _a = getPossibleExtractionsWorker(targetRange, context), scopes = _a.scopes, _b = _a.readsAndWrites, target = _b.target, usagesPerScope = _b.usagesPerScope, functionErrorsPerScope = _b.functionErrorsPerScope, exposedVariableDeclarations = _b.exposedVariableDeclarations;
                ts.Debug.assert(!functionErrorsPerScope[requestedChangesIndex].length, "The extraction went missing? How?");
                context.cancellationToken.throwIfCancellationRequested(); // TODO: GH#18217
                return extractFunctionInScope(target, scopes[requestedChangesIndex], usagesPerScope[requestedChangesIndex], exposedVariableDeclarations, targetRange, context);
            }
            function getConstantExtractionAtIndex(targetRange, context, requestedChangesIndex) {
                var _a = getPossibleExtractionsWorker(targetRange, context), scopes = _a.scopes, _b = _a.readsAndWrites, target = _b.target, usagesPerScope = _b.usagesPerScope, constantErrorsPerScope = _b.constantErrorsPerScope, exposedVariableDeclarations = _b.exposedVariableDeclarations;
                ts.Debug.assert(!constantErrorsPerScope[requestedChangesIndex].length, "The extraction went missing? How?");
                ts.Debug.assert(exposedVariableDeclarations.length === 0, "Extract constant accepted a range containing a variable declaration?");
                context.cancellationToken.throwIfCancellationRequested();
                var expression = ts.isExpression(target)
                    ? target
                    : target.statements[0].expression;
                return extractConstantInScope(expression, scopes[requestedChangesIndex], usagesPerScope[requestedChangesIndex], targetRange.facts, context);
            }
            /**
             * Given a piece of text to extract ('targetRange'), computes a list of possible extractions.
             * Each returned ExtractResultForScope corresponds to a possible target scope and is either a set of changes
             * or an error explaining why we can't extract into that scope.
             */
            function getPossibleExtractions(targetRange, context) {
                var _a = getPossibleExtractionsWorker(targetRange, context), scopes = _a.scopes, _b = _a.readsAndWrites, functionErrorsPerScope = _b.functionErrorsPerScope, constantErrorsPerScope = _b.constantErrorsPerScope;
                // Need the inner type annotation to avoid https://github.com/Microsoft/TypeScript/issues/7547
                var extractions = scopes.map(function (scope, i) {
                    var functionDescriptionPart = getDescriptionForFunctionInScope(scope);
                    var constantDescriptionPart = getDescriptionForConstantInScope(scope);
                    var scopeDescription = ts.isFunctionLikeDeclaration(scope)
                        ? getDescriptionForFunctionLikeDeclaration(scope)
                        : ts.isClassLike(scope)
                            ? getDescriptionForClassLikeDeclaration(scope)
                            : getDescriptionForModuleLikeDeclaration(scope);
                    var functionDescription;
                    var constantDescription;
                    if (scopeDescription === 1 /* Global */) {
                        functionDescription = ts.formatStringFromArgs(ts.getLocaleSpecificMessage(ts.Diagnostics.Extract_to_0_in_1_scope), [functionDescriptionPart, "global"]);
                        constantDescription = ts.formatStringFromArgs(ts.getLocaleSpecificMessage(ts.Diagnostics.Extract_to_0_in_1_scope), [constantDescriptionPart, "global"]);
                    }
                    else if (scopeDescription === 0 /* Module */) {
                        functionDescription = ts.formatStringFromArgs(ts.getLocaleSpecificMessage(ts.Diagnostics.Extract_to_0_in_1_scope), [functionDescriptionPart, "module"]);
                        constantDescription = ts.formatStringFromArgs(ts.getLocaleSpecificMessage(ts.Diagnostics.Extract_to_0_in_1_scope), [constantDescriptionPart, "module"]);
                    }
                    else {
                        functionDescription = ts.formatStringFromArgs(ts.getLocaleSpecificMessage(ts.Diagnostics.Extract_to_0_in_1), [functionDescriptionPart, scopeDescription]);
                        constantDescription = ts.formatStringFromArgs(ts.getLocaleSpecificMessage(ts.Diagnostics.Extract_to_0_in_1), [constantDescriptionPart, scopeDescription]);
                    }
                    // Customize the phrasing for the innermost scope to increase clarity.
                    if (i === 0 && !ts.isClassLike(scope)) {
                        constantDescription = ts.formatStringFromArgs(ts.getLocaleSpecificMessage(ts.Diagnostics.Extract_to_0_in_enclosing_scope), [constantDescriptionPart]);
                    }
                    return {
                        functionExtraction: {
                            description: functionDescription,
                            errors: functionErrorsPerScope[i],
                        },
                        constantExtraction: {
                            description: constantDescription,
                            errors: constantErrorsPerScope[i],
                        },
                    };
                });
                return extractions;
            }
            function getPossibleExtractionsWorker(targetRange, context) {
                var sourceFile = context.file;
                var scopes = collectEnclosingScopes(targetRange);
                var enclosingTextRange = getEnclosingTextRange(targetRange, sourceFile);
                var readsAndWrites = collectReadsAndWrites(targetRange, scopes, enclosingTextRange, sourceFile, context.program.getTypeChecker(), context.cancellationToken);
                return { scopes: scopes, readsAndWrites: readsAndWrites };
            }
            function getDescriptionForFunctionInScope(scope) {
                return ts.isFunctionLikeDeclaration(scope)
                    ? "inner function"
                    : ts.isClassLike(scope)
                        ? "method"
                        : "function";
            }
            function getDescriptionForConstantInScope(scope) {
                return ts.isClassLike(scope)
                    ? "readonly field"
                    : "constant";
            }
            function getDescriptionForFunctionLikeDeclaration(scope) {
                switch (scope.kind) {
                    case 157 /* Constructor */:
                        return "constructor";
                    case 196 /* FunctionExpression */:
                    case 239 /* FunctionDeclaration */:
                        return scope.name
                            ? "function '" + scope.name.text + "'"
                            : "anonymous function";
                    case 197 /* ArrowFunction */:
                        return "arrow function";
                    case 156 /* MethodDeclaration */:
                        return "method '" + scope.name.getText() + "'";
                    case 158 /* GetAccessor */:
                        return "'get " + scope.name.getText() + "'";
                    case 159 /* SetAccessor */:
                        return "'set " + scope.name.getText() + "'";
                    default:
                        throw ts.Debug.assertNever(scope);
                }
            }
            function getDescriptionForClassLikeDeclaration(scope) {
                return scope.kind === 240 /* ClassDeclaration */
                    ? scope.name ? "class '" + scope.name.text + "'" : "anonymous class declaration"
                    : scope.name ? "class expression '" + scope.name.text + "'" : "anonymous class expression";
            }
            function getDescriptionForModuleLikeDeclaration(scope) {
                return scope.kind === 245 /* ModuleBlock */
                    ? "namespace '" + scope.parent.name.getText() + "'"
                    : scope.externalModuleIndicator ? 0 /* Module */ : 1 /* Global */;
            }
            var SpecialScope;
            (function (SpecialScope) {
                SpecialScope[SpecialScope["Module"] = 0] = "Module";
                SpecialScope[SpecialScope["Global"] = 1] = "Global";
            })(SpecialScope || (SpecialScope = {}));
            /**
             * Result of 'extractRange' operation for a specific scope.
             * Stores either a list of changes that should be applied to extract a range or a list of errors
             */
            function extractFunctionInScope(node, scope, _a, exposedVariableDeclarations, range, context) {
                var usagesInScope = _a.usages, typeParameterUsages = _a.typeParameterUsages, substitutions = _a.substitutions;
                var checker = context.program.getTypeChecker();
                // Make a unique name for the extracted function
                var file = scope.getSourceFile();
                var functionNameText = ts.getUniqueName(ts.isClassLike(scope) ? "newMethod" : "newFunction", file);
                var isJS = ts.isInJSFile(scope);
                var functionName = ts.createIdentifier(functionNameText);
                var returnType;
                var parameters = [];
                var callArguments = [];
                var writes;
                usagesInScope.forEach(function (usage, name) {
                    var typeNode;
                    if (!isJS) {
                        var type = checker.getTypeOfSymbolAtLocation(usage.symbol, usage.node);
                        // Widen the type so we don't emit nonsense annotations like "function fn(x: 3) {"
                        type = checker.getBaseTypeOfLiteralType(type);
                        typeNode = checker.typeToTypeNode(type, scope, 1 /* NoTruncation */);
                    }
                    var paramDecl = ts.createParameter(
                    /*decorators*/ undefined, 
                    /*modifiers*/ undefined, 
                    /*dotDotDotToken*/ undefined, 
                    /*name*/ name, 
                    /*questionToken*/ undefined, typeNode);
                    parameters.push(paramDecl);
                    if (usage.usage === 2 /* Write */) {
                        (writes || (writes = [])).push(usage);
                    }
                    callArguments.push(ts.createIdentifier(name));
                });
                var typeParametersAndDeclarations = ts.arrayFrom(typeParameterUsages.values()).map(function (type) { return ({ type: type, declaration: getFirstDeclaration(type) }); });
                var sortedTypeParametersAndDeclarations = typeParametersAndDeclarations.sort(compareTypesByDeclarationOrder);
                var typeParameters = sortedTypeParametersAndDeclarations.length === 0
                    ? undefined
                    : sortedTypeParametersAndDeclarations.map(function (t) { return t.declaration; });
                // Strictly speaking, we should check whether each name actually binds to the appropriate type
                // parameter.  In cases of shadowing, they may not.
                var callTypeArguments = typeParameters !== undefined
                    ? typeParameters.map(function (decl) { return ts.createTypeReferenceNode(decl.name, /*typeArguments*/ undefined); })
                    : undefined;
                // Provide explicit return types for contextually-typed functions
                // to avoid problems when there are literal types present
                if (ts.isExpression(node) && !isJS) {
                    var contextualType = checker.getContextualType(node);
                    returnType = checker.typeToTypeNode(contextualType, scope, 1 /* NoTruncation */); // TODO: GH#18217
                }
                var _b = transformFunctionBody(node, exposedVariableDeclarations, writes, substitutions, !!(range.facts & RangeFacts.HasReturn)), body = _b.body, returnValueProperty = _b.returnValueProperty;
                ts.suppressLeadingAndTrailingTrivia(body);
                var newFunction;
                if (ts.isClassLike(scope)) {
                    // always create private method in TypeScript files
                    var modifiers = isJS ? [] : [ts.createToken(113 /* PrivateKeyword */)];
                    if (range.facts & RangeFacts.InStaticRegion) {
                        modifiers.push(ts.createToken(116 /* StaticKeyword */));
                    }
                    if (range.facts & RangeFacts.IsAsyncFunction) {
                        modifiers.push(ts.createToken(121 /* AsyncKeyword */));
                    }
                    newFunction = ts.createMethod(
                    /*decorators*/ undefined, modifiers.length ? modifiers : undefined, range.facts & RangeFacts.IsGenerator ? ts.createToken(40 /* AsteriskToken */) : undefined, functionName, 
                    /*questionToken*/ undefined, typeParameters, parameters, returnType, body);
                }
                else {
                    newFunction = ts.createFunctionDeclaration(
                    /*decorators*/ undefined, range.facts & RangeFacts.IsAsyncFunction ? [ts.createToken(121 /* AsyncKeyword */)] : undefined, range.facts & RangeFacts.IsGenerator ? ts.createToken(40 /* AsteriskToken */) : undefined, functionName, typeParameters, parameters, returnType, body);
                }
                var changeTracker = ts.textChanges.ChangeTracker.fromContext(context);
                var minInsertionPos = (isReadonlyArray(range.range) ? ts.last(range.range) : range.range).end;
                var nodeToInsertBefore = getNodeToInsertFunctionBefore(minInsertionPos, scope);
                if (nodeToInsertBefore) {
                    changeTracker.insertNodeBefore(context.file, nodeToInsertBefore, newFunction, /*blankLineBetween*/ true);
                }
                else {
                    changeTracker.insertNodeAtEndOfScope(context.file, scope, newFunction);
                }
                var newNodes = [];
                // replace range with function call
                var called = getCalledExpression(scope, range, functionNameText);
                var call = ts.createCall(called, callTypeArguments, // Note that no attempt is made to take advantage of type argument inference
                callArguments);
                if (range.facts & RangeFacts.IsGenerator) {
                    call = ts.createYield(ts.createToken(40 /* AsteriskToken */), call);
                }
                if (range.facts & RangeFacts.IsAsyncFunction) {
                    call = ts.createAwait(call);
                }
                if (exposedVariableDeclarations.length && !writes) {
                    // No need to mix declarations and writes.
                    // How could any variables be exposed if there's a return statement?
                    ts.Debug.assert(!returnValueProperty);
                    ts.Debug.assert(!(range.facts & RangeFacts.HasReturn));
                    if (exposedVariableDeclarations.length === 1) {
                        // Declaring exactly one variable: let x = newFunction();
                        var variableDeclaration = exposedVariableDeclarations[0];
                        newNodes.push(ts.createVariableStatement(
                        /*modifiers*/ undefined, ts.createVariableDeclarationList([ts.createVariableDeclaration(ts.getSynthesizedDeepClone(variableDeclaration.name), /*type*/ ts.getSynthesizedDeepClone(variableDeclaration.type), /*initializer*/ call)], // TODO (acasey): test binding patterns
                        variableDeclaration.parent.flags)));
                    }
                    else {
                        // Declaring multiple variables / return properties:
                        //   let {x, y} = newFunction();
                        var bindingElements = [];
                        var typeElements = [];
                        var commonNodeFlags = exposedVariableDeclarations[0].parent.flags;
                        var sawExplicitType = false;
                        for (var _i = 0, exposedVariableDeclarations_1 = exposedVariableDeclarations; _i < exposedVariableDeclarations_1.length; _i++) {
                            var variableDeclaration = exposedVariableDeclarations_1[_i];
                            bindingElements.push(ts.createBindingElement(
                            /*dotDotDotToken*/ undefined, 
                            /*propertyName*/ undefined, 
                            /*name*/ ts.getSynthesizedDeepClone(variableDeclaration.name)));
                            // Being returned through an object literal will have widened the type.
                            var variableType = checker.typeToTypeNode(checker.getBaseTypeOfLiteralType(checker.getTypeAtLocation(variableDeclaration)), scope, 1 /* NoTruncation */);
                            typeElements.push(ts.createPropertySignature(
                            /*modifiers*/ undefined, 
                            /*name*/ variableDeclaration.symbol.name, 
                            /*questionToken*/ undefined, 
                            /*type*/ variableType, 
                            /*initializer*/ undefined));
                            sawExplicitType = sawExplicitType || variableDeclaration.type !== undefined;
                            commonNodeFlags = commonNodeFlags & variableDeclaration.parent.flags;
                        }
                        var typeLiteral = sawExplicitType ? ts.createTypeLiteralNode(typeElements) : undefined;
                        if (typeLiteral) {
                            ts.setEmitFlags(typeLiteral, 1 /* SingleLine */);
                        }
                        newNodes.push(ts.createVariableStatement(
                        /*modifiers*/ undefined, ts.createVariableDeclarationList([ts.createVariableDeclaration(ts.createObjectBindingPattern(bindingElements), 
                            /*type*/ typeLiteral, 
                            /*initializer*/ call)], commonNodeFlags)));
                    }
                }
                else if (exposedVariableDeclarations.length || writes) {
                    if (exposedVariableDeclarations.length) {
                        // CONSIDER: we're going to create one statement per variable, but we could actually preserve their original grouping.
                        for (var _c = 0, exposedVariableDeclarations_2 = exposedVariableDeclarations; _c < exposedVariableDeclarations_2.length; _c++) {
                            var variableDeclaration = exposedVariableDeclarations_2[_c];
                            var flags = variableDeclaration.parent.flags;
                            if (flags & 2 /* Const */) {
                                flags = (flags & ~2 /* Const */) | 1 /* Let */;
                            }
                            newNodes.push(ts.createVariableStatement(
                            /*modifiers*/ undefined, ts.createVariableDeclarationList([ts.createVariableDeclaration(variableDeclaration.symbol.name, getTypeDeepCloneUnionUndefined(variableDeclaration.type))], flags)));
                        }
                    }
                    if (returnValueProperty) {
                        // has both writes and return, need to create variable declaration to hold return value;
                        newNodes.push(ts.createVariableStatement(
                        /*modifiers*/ undefined, ts.createVariableDeclarationList([ts.createVariableDeclaration(returnValueProperty, getTypeDeepCloneUnionUndefined(returnType))], 1 /* Let */)));
                    }
                    var assignments = getPropertyAssignmentsForWritesAndVariableDeclarations(exposedVariableDeclarations, writes);
                    if (returnValueProperty) {
                        assignments.unshift(ts.createShorthandPropertyAssignment(returnValueProperty));
                    }
                    // propagate writes back
                    if (assignments.length === 1) {
                        // We would only have introduced a return value property if there had been
                        // other assignments to make.
                        ts.Debug.assert(!returnValueProperty);
                        newNodes.push(ts.createStatement(ts.createAssignment(assignments[0].name, call)));
                        if (range.facts & RangeFacts.HasReturn) {
                            newNodes.push(ts.createReturn());
                        }
                    }
                    else {
                        // emit e.g.
                        //   { a, b, __return } = newFunction(a, b);
                        //   return __return;
                        newNodes.push(ts.createStatement(ts.createAssignment(ts.createObjectLiteral(assignments), call)));
                        if (returnValueProperty) {
                            newNodes.push(ts.createReturn(ts.createIdentifier(returnValueProperty)));
                        }
                    }
                }
                else {
                    if (range.facts & RangeFacts.HasReturn) {
                        newNodes.push(ts.createReturn(call));
                    }
                    else if (isReadonlyArray(range.range)) {
                        newNodes.push(ts.createStatement(call));
                    }
                    else {
                        newNodes.push(call);
                    }
                }
                if (isReadonlyArray(range.range)) {
                    changeTracker.replaceNodeRangeWithNodes(context.file, ts.first(range.range), ts.last(range.range), newNodes);
                }
                else {
                    changeTracker.replaceNodeWithNodes(context.file, range.range, newNodes);
                }
                var edits = changeTracker.getChanges();
                var renameRange = isReadonlyArray(range.range) ? ts.first(range.range) : range.range;
                var renameFilename = renameRange.getSourceFile().fileName;
                var renameLocation = ts.getRenameLocation(edits, renameFilename, functionNameText, /*isDeclaredBeforeUse*/ false);
                return { renameFilename: renameFilename, renameLocation: renameLocation, edits: edits };
                function getTypeDeepCloneUnionUndefined(typeNode) {
                    if (typeNode === undefined) {
                        return undefined;
                    }
                    var clone = ts.getSynthesizedDeepClone(typeNode);
                    var withoutParens = clone;
                    while (ts.isParenthesizedTypeNode(withoutParens)) {
                        withoutParens = withoutParens.type;
                    }
                    return ts.isUnionTypeNode(withoutParens) && ts.find(withoutParens.types, function (t) { return t.kind === 141 /* UndefinedKeyword */; })
                        ? clone
                        : ts.createUnionTypeNode([clone, ts.createKeywordTypeNode(141 /* UndefinedKeyword */)]);
                }
            }
            /**
             * Result of 'extractRange' operation for a specific scope.
             * Stores either a list of changes that should be applied to extract a range or a list of errors
             */
            function extractConstantInScope(node, scope, _a, rangeFacts, context) {
                var substitutions = _a.substitutions;
                var checker = context.program.getTypeChecker();
                // Make a unique name for the extracted variable
                var file = scope.getSourceFile();
                var localNameText = ts.getUniqueName(ts.isClassLike(scope) ? "newProperty" : "newLocal", file);
                var isJS = ts.isInJSFile(scope);
                var variableType = isJS || !checker.isContextSensitive(node)
                    ? undefined
                    : checker.typeToTypeNode(checker.getContextualType(node), scope, 1 /* NoTruncation */); // TODO: GH#18217
                var initializer = transformConstantInitializer(node, substitutions);
                ts.suppressLeadingAndTrailingTrivia(initializer);
                var changeTracker = ts.textChanges.ChangeTracker.fromContext(context);
                if (ts.isClassLike(scope)) {
                    ts.Debug.assert(!isJS); // See CannotExtractToJSClass
                    var modifiers = [];
                    modifiers.push(ts.createToken(113 /* PrivateKeyword */));
                    if (rangeFacts & RangeFacts.InStaticRegion) {
                        modifiers.push(ts.createToken(116 /* StaticKeyword */));
                    }
                    modifiers.push(ts.createToken(133 /* ReadonlyKeyword */));
                    var newVariable = ts.createProperty(
                    /*decorators*/ undefined, modifiers, localNameText, 
                    /*questionToken*/ undefined, variableType, initializer);
                    var localReference = ts.createPropertyAccess(rangeFacts & RangeFacts.InStaticRegion
                        ? ts.createIdentifier(scope.name.getText()) // TODO: GH#18217
                        : ts.createThis(), ts.createIdentifier(localNameText));
                    // Declare
                    var maxInsertionPos = node.pos;
                    var nodeToInsertBefore = getNodeToInsertPropertyBefore(maxInsertionPos, scope);
                    changeTracker.insertNodeBefore(context.file, nodeToInsertBefore, newVariable, /*blankLineBetween*/ true);
                    // Consume
                    changeTracker.replaceNode(context.file, node, localReference);
                }
                else {
                    var newVariableDeclaration = ts.createVariableDeclaration(localNameText, variableType, initializer);
                    // If the node is part of an initializer in a list of variable declarations, insert a new
                    // variable declaration into the list (in case it depends on earlier ones).
                    // CONSIDER: If the declaration list isn't const, we might want to split it into multiple
                    // lists so that the newly extracted one can be const.
                    var oldVariableDeclaration = getContainingVariableDeclarationIfInList(node, scope);
                    if (oldVariableDeclaration) {
                        // Declare
                        // CONSIDER: could detect that each is on a separate line (See `extractConstant_VariableList_MultipleLines` in `extractConstants.ts`)
                        changeTracker.insertNodeBefore(context.file, oldVariableDeclaration, newVariableDeclaration);
                        // Consume
                        var localReference = ts.createIdentifier(localNameText);
                        changeTracker.replaceNode(context.file, node, localReference);
                    }
                    else if (node.parent.kind === 221 /* ExpressionStatement */ && scope === ts.findAncestor(node, isScope)) {
                        // If the parent is an expression statement and the target scope is the immediately enclosing one,
                        // replace the statement with the declaration.
                        var newVariableStatement = ts.createVariableStatement(
                        /*modifiers*/ undefined, ts.createVariableDeclarationList([newVariableDeclaration], 2 /* Const */));
                        changeTracker.replaceNode(context.file, node.parent, newVariableStatement);
                    }
                    else {
                        var newVariableStatement = ts.createVariableStatement(
                        /*modifiers*/ undefined, ts.createVariableDeclarationList([newVariableDeclaration], 2 /* Const */));
                        // Declare
                        var nodeToInsertBefore = getNodeToInsertConstantBefore(node, scope);
                        if (nodeToInsertBefore.pos === 0) {
                            changeTracker.insertNodeAtTopOfFile(context.file, newVariableStatement, /*blankLineBetween*/ false);
                        }
                        else {
                            changeTracker.insertNodeBefore(context.file, nodeToInsertBefore, newVariableStatement, /*blankLineBetween*/ false);
                        }
                        // Consume
                        if (node.parent.kind === 221 /* ExpressionStatement */) {
                            // If the parent is an expression statement, delete it.
                            changeTracker.delete(context.file, node.parent);
                        }
                        else {
                            var localReference = ts.createIdentifier(localNameText);
                            changeTracker.replaceNode(context.file, node, localReference);
                        }
                    }
                }
                var edits = changeTracker.getChanges();
                var renameFilename = node.getSourceFile().fileName;
                var renameLocation = ts.getRenameLocation(edits, renameFilename, localNameText, /*isDeclaredBeforeUse*/ true);
                return { renameFilename: renameFilename, renameLocation: renameLocation, edits: edits };
            }
            function getContainingVariableDeclarationIfInList(node, scope) {
                var prevNode;
                while (node !== undefined && node !== scope) {
                    if (ts.isVariableDeclaration(node) &&
                        node.initializer === prevNode &&
                        ts.isVariableDeclarationList(node.parent) &&
                        node.parent.declarations.length > 1) {
                        return node;
                    }
                    prevNode = node;
                    node = node.parent;
                }
            }
            function getFirstDeclaration(type) {
                var firstDeclaration;
                var symbol = type.symbol;
                if (symbol && symbol.declarations) {
                    for (var _i = 0, _a = symbol.declarations; _i < _a.length; _i++) {
                        var declaration = _a[_i];
                        if (firstDeclaration === undefined || declaration.pos < firstDeclaration.pos) {
                            firstDeclaration = declaration;
                        }
                    }
                }
                return firstDeclaration;
            }
            function compareTypesByDeclarationOrder(_a, _b) {
                var type1 = _a.type, declaration1 = _a.declaration;
                var type2 = _b.type, declaration2 = _b.declaration;
                return ts.compareProperties(declaration1, declaration2, "pos", ts.compareValues)
                    || ts.compareStringsCaseSensitive(type1.symbol ? type1.symbol.getName() : "", type2.symbol ? type2.symbol.getName() : "")
                    || ts.compareValues(type1.id, type2.id);
            }
            function getCalledExpression(scope, range, functionNameText) {
                var functionReference = ts.createIdentifier(functionNameText);
                if (ts.isClassLike(scope)) {
                    var lhs = range.facts & RangeFacts.InStaticRegion ? ts.createIdentifier(scope.name.text) : ts.createThis(); // TODO: GH#18217
                    return ts.createPropertyAccess(lhs, functionReference);
                }
                else {
                    return functionReference;
                }
            }
            function transformFunctionBody(body, exposedVariableDeclarations, writes, substitutions, hasReturn) {
                var hasWritesOrVariableDeclarations = writes !== undefined || exposedVariableDeclarations.length > 0;
                if (ts.isBlock(body) && !hasWritesOrVariableDeclarations && substitutions.size === 0) {
                    // already block, no declarations or writes to propagate back, no substitutions - can use node as is
                    return { body: ts.createBlock(body.statements, /*multLine*/ true), returnValueProperty: undefined };
                }
                var returnValueProperty;
                var ignoreReturns = false;
                var statements = ts.createNodeArray(ts.isBlock(body) ? body.statements.slice(0) : [ts.isStatement(body) ? body : ts.createReturn(body)]);
                // rewrite body if either there are writes that should be propagated back via return statements or there are substitutions
                if (hasWritesOrVariableDeclarations || substitutions.size) {
                    var rewrittenStatements = ts.visitNodes(statements, visitor).slice();
                    if (hasWritesOrVariableDeclarations && !hasReturn && ts.isStatement(body)) {
                        // add return at the end to propagate writes back in case if control flow falls out of the function body
                        // it is ok to know that range has at least one return since it we only allow unconditional returns
                        var assignments = getPropertyAssignmentsForWritesAndVariableDeclarations(exposedVariableDeclarations, writes);
                        if (assignments.length === 1) {
                            rewrittenStatements.push(ts.createReturn(assignments[0].name));
                        }
                        else {
                            rewrittenStatements.push(ts.createReturn(ts.createObjectLiteral(assignments)));
                        }
                    }
                    return { body: ts.createBlock(rewrittenStatements, /*multiLine*/ true), returnValueProperty: returnValueProperty };
                }
                else {
                    return { body: ts.createBlock(statements, /*multiLine*/ true), returnValueProperty: undefined };
                }
                function visitor(node) {
                    if (!ignoreReturns && node.kind === 230 /* ReturnStatement */ && hasWritesOrVariableDeclarations) {
                        var assignments = getPropertyAssignmentsForWritesAndVariableDeclarations(exposedVariableDeclarations, writes);
                        if (node.expression) {
                            if (!returnValueProperty) {
                                returnValueProperty = "__return";
                            }
                            assignments.unshift(ts.createPropertyAssignment(returnValueProperty, ts.visitNode(node.expression, visitor)));
                        }
                        if (assignments.length === 1) {
                            return ts.createReturn(assignments[0].name);
                        }
                        else {
                            return ts.createReturn(ts.createObjectLiteral(assignments));
                        }
                    }
                    else {
                        var oldIgnoreReturns = ignoreReturns;
                        ignoreReturns = ignoreReturns || ts.isFunctionLikeDeclaration(node) || ts.isClassLike(node);
                        var substitution = substitutions.get(ts.getNodeId(node).toString());
                        var result = substitution ? ts.getSynthesizedDeepClone(substitution) : ts.visitEachChild(node, visitor, ts.nullTransformationContext);
                        ignoreReturns = oldIgnoreReturns;
                        return result;
                    }
                }
            }
            function transformConstantInitializer(initializer, substitutions) {
                return substitutions.size
                    ? visitor(initializer)
                    : initializer;
                function visitor(node) {
                    var substitution = substitutions.get(ts.getNodeId(node).toString());
                    return substitution ? ts.getSynthesizedDeepClone(substitution) : ts.visitEachChild(node, visitor, ts.nullTransformationContext);
                }
            }
            function getStatementsOrClassElements(scope) {
                if (ts.isFunctionLikeDeclaration(scope)) {
                    var body = scope.body; // TODO: GH#18217
                    if (ts.isBlock(body)) {
                        return body.statements;
                    }
                }
                else if (ts.isModuleBlock(scope) || ts.isSourceFile(scope)) {
                    return scope.statements;
                }
                else if (ts.isClassLike(scope)) {
                    return scope.members;
                }
                else {
                    ts.assertType(scope);
                }
                return ts.emptyArray;
            }
            /**
             * If `scope` contains a function after `minPos`, then return the first such function.
             * Otherwise, return `undefined`.
             */
            function getNodeToInsertFunctionBefore(minPos, scope) {
                return ts.find(getStatementsOrClassElements(scope), function (child) {
                    return child.pos >= minPos && ts.isFunctionLikeDeclaration(child) && !ts.isConstructorDeclaration(child);
                });
            }
            function getNodeToInsertPropertyBefore(maxPos, scope) {
                var members = scope.members;
                ts.Debug.assert(members.length > 0); // There must be at least one child, since we extracted from one.
                var prevMember;
                var allProperties = true;
                for (var _i = 0, members_2 = members; _i < members_2.length; _i++) {
                    var member = members_2[_i];
                    if (member.pos > maxPos) {
                        return prevMember || members[0];
                    }
                    if (allProperties && !ts.isPropertyDeclaration(member)) {
                        // If it is non-vacuously true that all preceding members are properties,
                        // insert before the current member (i.e. at the end of the list of properties).
                        if (prevMember !== undefined) {
                            return member;
                        }
                        allProperties = false;
                    }
                    prevMember = member;
                }
                if (prevMember === undefined)
                    return ts.Debug.fail(); // If the loop didn't return, then it did set prevMember.
                return prevMember;
            }
            function getNodeToInsertConstantBefore(node, scope) {
                ts.Debug.assert(!ts.isClassLike(scope));
                var prevScope;
                for (var curr = node; curr !== scope; curr = curr.parent) {
                    if (isScope(curr)) {
                        prevScope = curr;
                    }
                }
                for (var curr = (prevScope || node).parent;; curr = curr.parent) {
                    if (isBlockLike(curr)) {
                        var prevStatement = void 0;
                        for (var _i = 0, _a = curr.statements; _i < _a.length; _i++) {
                            var statement = _a[_i];
                            if (statement.pos > node.pos) {
                                break;
                            }
                            prevStatement = statement;
                        }
                        if (!prevStatement && ts.isCaseClause(curr)) {
                            // We must have been in the expression of the case clause.
                            ts.Debug.assert(ts.isSwitchStatement(curr.parent.parent));
                            return curr.parent.parent;
                        }
                        // There must be at least one statement since we started in one.
                        return ts.Debug.assertDefined(prevStatement);
                    }
                    ts.Debug.assert(curr !== scope, "Didn't encounter a block-like before encountering scope");
                }
            }
            function getPropertyAssignmentsForWritesAndVariableDeclarations(exposedVariableDeclarations, writes) {
                var variableAssignments = ts.map(exposedVariableDeclarations, function (v) { return ts.createShorthandPropertyAssignment(v.symbol.name); });
                var writeAssignments = ts.map(writes, function (w) { return ts.createShorthandPropertyAssignment(w.symbol.name); });
                // TODO: GH#18217 `variableAssignments` not possibly undefined!
                return variableAssignments === undefined
                    ? writeAssignments
                    : writeAssignments === undefined
                        ? variableAssignments
                        : variableAssignments.concat(writeAssignments);
            }
            function isReadonlyArray(v) {
                return ts.isArray(v);
            }
            /**
             * Produces a range that spans the entirety of nodes, given a selection
             * that might start/end in the middle of nodes.
             *
             * For example, when the user makes a selection like this
             *                     v---v
             *   var someThing = foo + bar;
             *  this returns     ^-------^
             */
            function getEnclosingTextRange(targetRange, sourceFile) {
                return isReadonlyArray(targetRange.range)
                    ? { pos: ts.first(targetRange.range).getStart(sourceFile), end: ts.last(targetRange.range).getEnd() }
                    : targetRange.range;
            }
            var Usage;
            (function (Usage) {
                // value should be passed to extracted method
                Usage[Usage["Read"] = 1] = "Read";
                // value should be passed to extracted method and propagated back
                Usage[Usage["Write"] = 2] = "Write";
            })(Usage || (Usage = {}));
            function collectReadsAndWrites(targetRange, scopes, enclosingTextRange, sourceFile, checker, cancellationToken) {
                var allTypeParameterUsages = ts.createMap(); // Key is type ID
                var usagesPerScope = [];
                var substitutionsPerScope = [];
                var functionErrorsPerScope = [];
                var constantErrorsPerScope = [];
                var visibleDeclarationsInExtractedRange = [];
                var exposedVariableSymbolSet = ts.createMap(); // Key is symbol ID
                var exposedVariableDeclarations = [];
                var firstExposedNonVariableDeclaration;
                var expression = !isReadonlyArray(targetRange.range)
                    ? targetRange.range
                    : targetRange.range.length === 1 && ts.isExpressionStatement(targetRange.range[0])
                        ? targetRange.range[0].expression
                        : undefined;
                var expressionDiagnostic;
                if (expression === undefined) {
                    var statements = targetRange.range;
                    var start = ts.first(statements).getStart();
                    var end = ts.last(statements).end;
                    expressionDiagnostic = ts.createFileDiagnostic(sourceFile, start, end - start, Messages.expressionExpected);
                }
                else if (checker.getTypeAtLocation(expression).flags & (16384 /* Void */ | 131072 /* Never */)) {
                    expressionDiagnostic = ts.createDiagnosticForNode(expression, Messages.uselessConstantType);
                }
                // initialize results
                for (var _i = 0, scopes_1 = scopes; _i < scopes_1.length; _i++) {
                    var scope = scopes_1[_i];
                    usagesPerScope.push({ usages: ts.createMap(), typeParameterUsages: ts.createMap(), substitutions: ts.createMap() });
                    substitutionsPerScope.push(ts.createMap());
                    functionErrorsPerScope.push(ts.isFunctionLikeDeclaration(scope) && scope.kind !== 239 /* FunctionDeclaration */
                        ? [ts.createDiagnosticForNode(scope, Messages.cannotExtractToOtherFunctionLike)]
                        : []);
                    var constantErrors = [];
                    if (expressionDiagnostic) {
                        constantErrors.push(expressionDiagnostic);
                    }
                    if (ts.isClassLike(scope) && ts.isInJSFile(scope)) {
                        constantErrors.push(ts.createDiagnosticForNode(scope, Messages.cannotExtractToJSClass));
                    }
                    if (ts.isArrowFunction(scope) && !ts.isBlock(scope.body)) {
                        // TODO (https://github.com/Microsoft/TypeScript/issues/18924): allow this
                        constantErrors.push(ts.createDiagnosticForNode(scope, Messages.cannotExtractToExpressionArrowFunction));
                    }
                    constantErrorsPerScope.push(constantErrors);
                }
                var seenUsages = ts.createMap();
                var target = isReadonlyArray(targetRange.range) ? ts.createBlock(targetRange.range) : targetRange.range;
                var unmodifiedNode = isReadonlyArray(targetRange.range) ? ts.first(targetRange.range) : targetRange.range;
                var inGenericContext = isInGenericContext(unmodifiedNode);
                collectUsages(target);
                // Unfortunately, this code takes advantage of the knowledge that the generated method
                // will use the contextual type of an expression as the return type of the extracted
                // method (and will therefore "use" all the types involved).
                if (inGenericContext && !isReadonlyArray(targetRange.range)) {
                    var contextualType = checker.getContextualType(targetRange.range); // TODO: GH#18217
                    recordTypeParameterUsages(contextualType);
                }
                if (allTypeParameterUsages.size > 0) {
                    var seenTypeParameterUsages = ts.createMap(); // Key is type ID
                    var i_1 = 0;
                    for (var curr = unmodifiedNode; curr !== undefined && i_1 < scopes.length; curr = curr.parent) {
                        if (curr === scopes[i_1]) {
                            // Copy current contents of seenTypeParameterUsages into scope.
                            seenTypeParameterUsages.forEach(function (typeParameter, id) {
                                usagesPerScope[i_1].typeParameterUsages.set(id, typeParameter);
                            });
                            i_1++;
                        }
                        // Note that we add the current node's type parameters *after* updating the corresponding scope.
                        if (ts.isDeclarationWithTypeParameters(curr)) {
                            for (var _a = 0, _b = ts.getEffectiveTypeParameterDeclarations(curr); _a < _b.length; _a++) {
                                var typeParameterDecl = _b[_a];
                                var typeParameter = checker.getTypeAtLocation(typeParameterDecl);
                                if (allTypeParameterUsages.has(typeParameter.id.toString())) {
                                    seenTypeParameterUsages.set(typeParameter.id.toString(), typeParameter);
                                }
                            }
                        }
                    }
                    // If we didn't get through all the scopes, then there were some that weren't in our
                    // parent chain (impossible at time of writing).  A conservative solution would be to
                    // copy allTypeParameterUsages into all remaining scopes.
                    ts.Debug.assert(i_1 === scopes.length);
                }
                // If there are any declarations in the extracted block that are used in the same enclosing
                // lexical scope, we can't move the extraction "up" as those declarations will become unreachable
                if (visibleDeclarationsInExtractedRange.length) {
                    var containingLexicalScopeOfExtraction = ts.isBlockScope(scopes[0], scopes[0].parent)
                        ? scopes[0]
                        : ts.getEnclosingBlockScopeContainer(scopes[0]);
                    ts.forEachChild(containingLexicalScopeOfExtraction, checkForUsedDeclarations);
                }
                var _loop_13 = function (i) {
                    var scopeUsages = usagesPerScope[i];
                    // Special case: in the innermost scope, all usages are available.
                    // (The computed value reflects the value at the top-level of the scope, but the
                    // local will actually be declared at the same level as the extracted expression).
                    if (i > 0 && (scopeUsages.usages.size > 0 || scopeUsages.typeParameterUsages.size > 0)) {
                        var errorNode = isReadonlyArray(targetRange.range) ? targetRange.range[0] : targetRange.range;
                        constantErrorsPerScope[i].push(ts.createDiagnosticForNode(errorNode, Messages.cannotAccessVariablesFromNestedScopes));
                    }
                    var hasWrite = false;
                    var readonlyClassPropertyWrite;
                    usagesPerScope[i].usages.forEach(function (value) {
                        if (value.usage === 2 /* Write */) {
                            hasWrite = true;
                            if (value.symbol.flags & 106500 /* ClassMember */ &&
                                value.symbol.valueDeclaration &&
                                ts.hasModifier(value.symbol.valueDeclaration, 64 /* Readonly */)) {
                                readonlyClassPropertyWrite = value.symbol.valueDeclaration;
                            }
                        }
                    });
                    // If an expression was extracted, then there shouldn't have been any variable declarations.
                    ts.Debug.assert(isReadonlyArray(targetRange.range) || exposedVariableDeclarations.length === 0);
                    if (hasWrite && !isReadonlyArray(targetRange.range)) {
                        var diag = ts.createDiagnosticForNode(targetRange.range, Messages.cannotWriteInExpression);
                        functionErrorsPerScope[i].push(diag);
                        constantErrorsPerScope[i].push(diag);
                    }
                    else if (readonlyClassPropertyWrite && i > 0) {
                        var diag = ts.createDiagnosticForNode(readonlyClassPropertyWrite, Messages.cannotExtractReadonlyP