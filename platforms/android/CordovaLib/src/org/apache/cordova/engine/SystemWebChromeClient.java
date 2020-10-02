ularNew;
        }
        function createWideningContext(parent, propertyName, siblings) {
            return { parent: parent, propertyName: propertyName, siblings: siblings, resolvedProperties: undefined };
        }
        function getSiblingsOfContext(context) {
            if (!context.siblings) {
                var siblings_1 = [];
                for (var _i = 0, _a = getSiblingsOfContext(context.parent); _i < _a.length; _i++) {
                    var type = _a[_i];
                    if (isObjectLiteralType(type)) {
                        var prop = getPropertyOfObjectType(type, context.propertyName);
                        if (prop) {
                            forEachType(getTypeOfSymbol(prop), function (t) {
                                siblings_1.push(t);
                            });
                        }
                    }
                }
                context.siblings = siblings_1;
            }
            return context.siblings;
        }
        function getPropertiesOfContext(context) {
            if (!context.resolvedProperties) {
                var names = ts.createMap();
                for (var _i = 0, _a = getSiblingsOfContext(context); _i < _a.length; _i++) {
                    var t = _a[_i];
                    if (isObjectLiteralType(t) && !(ts.getObjectFlags(t) & 1024)) {
                        for (var _b = 0, _c = getPropertiesOfType(t); _b < _c.length; _b++) {
                            var prop = _c[_b];
                            names.set(prop.escapedName, prop);
                        }
                    }
                }
                context.resolvedProperties = ts.arrayFrom(names.values());
            }
            return context.resolvedProperties;
        }
        function getWidenedProperty(prop, context) {
            var original = getTypeOfSymbol(prop);
            var propContext = context && createWideningContext(context, prop.escapedName, undefined);
            var widened = getWidenedTypeWithContext(original, propContext);
            return widened === original ? prop : createSymbolWithType(prop, widened);
        }
        function getUndefinedProperty(prop) {
            var cached = undefinedProperties.get(prop.escapedName);
            if (cached) {
                return cached;
            }
            var result = createSymbolWithType(prop, undefinedType);
            result.flags |= 16777216;
            undefinedProperties.set(prop.escapedName, result);
            return result;
        }
        function getWidenedTypeOfObjectLiteral(type, context) {
            var members = ts.createSymbolTable();
            for (var _i = 0, _a = getPropertiesOfObjectType(type); _i < _a.length; _i++) {
                var prop = _a[_i];
                members.set(prop.escapedName, prop.flags & 4 ? getWidenedProperty(prop, context) : prop);
            }
            if (context) {
                for (var _b = 0, _c = getPropertiesOfContext(context); _b < _c.length; _b++) {
                    var prop = _c[_b];
                    if (!members.has(prop.escapedName)) {
                        members.set(prop.escapedName, getUndefinedProperty(prop));
                    }
                }
            }
            var stringIndexInfo = getIndexInfoOfType(type, 0);
            var numberIndexInfo = getIndexInfoOfType(type, 1);
            return createAnonymousType(type.symbol, members, ts.emptyArray, ts.emptyArray, stringIndexInfo && createIndexInfo(getWidenedType(stringIndexInfo.type), stringIndexInfo.isReadonly), numberIndexInfo && createIndexInfo(getWidenedType(numberIndexInfo.type), numberIndexInfo.isReadonly));
        }
        function getWidenedType(type) {
            return getWidenedTypeWithContext(type, undefined);
        }
        function getWidenedTypeWithContext(type, context) {
            if (type.flags & 50331648) {
                if (type.flags & 12288) {
                    return anyType;
                }
                if (isObjectLiteralType(type)) {
                    return getWidenedTypeOfObjectLiteral(type, context);
                }
                if (type.flags & 131072) {
                    var unionContext_1 = context || createWideningContext(undefined, undefined, type.types);
                    var widenedTypes = ts.sameMap(type.types, function (t) { return t.flags & 12288 ? t : getWidenedTypeWithContext(t, unionContext_1); });
                    return getUnionType(widenedTypes, ts.some(widenedTypes, isEmptyObjectType) ? 2 : 1);
                }
                if (isArrayType(type) || isTupleType(type)) {
                    return createTypeReference(type.target, ts.sameMap(type.typeArguments, getWidenedType));
                }
            }
            return type;
        }
        function reportWideningErrorsInType(type) {
            var errorReported = false;
            if (type.flags & 16777216) {
                if (type.flags & 131072) {
                    if (ts.some(type.types, isEmptyObjectType)) {
                        errorReported = true;
                    }
                    else {
                        for (var _i = 0, _a = type.types; _i < _a.length; _i++) {
                            var t = _a[_i];
                            if (reportWideningErrorsInType(t)) {
                                errorReported = true;
                            }
                        }
                    }
                }
                if (isArrayType(type) || isTupleType(type)) {
                    for (var _b = 0, _c = type.typeArguments; _b < _c.length; _b++) {
                        var t = _c[_b];
                        if (reportWideningErrorsInType(t)) {
                            errorReported = true;
                        }
                    }
                }
                if (isObjectLiteralType(type)) {
                    for (var _d = 0, _e = getPropertiesOfObjectType(type); _d < _e.length; _d++) {
                        var p = _e[_d];
                        var t = getTypeOfSymbol(p);
                        if (t.flags & 16777216) {
                            if (!reportWideningErrorsInType(t)) {
                                error(p.valueDeclaration, ts.Diagnostics.Object_literal_s_property_0_implicitly_has_an_1_type, symbolToString(p), typeToString(getWidenedType(t)));
                            }
                            errorReported = true;
                        }
                    }
                }
            }
            return errorReported;
        }
        function reportImplicitAnyError(declaration, type) {
            var typeAsString = typeToString(getWidenedType(type));
            var diagnostic;
            switch (declaration.kind) {
                case 199:
                case 151:
                case 150:
                    diagnostic = ts.Diagnostics.Member_0_implicitly_has_an_1_type;
                    break;
                case 148:
                    diagnostic = declaration.dotDotDotToken ?
                        ts.Diagnostics.Rest_parameter_0_implicitly_has_an_any_type :
                        ts.Diagnostics.Parameter_0_implicitly_has_an_1_type;
                    break;
                case 181:
                    diagnostic = ts.Diagnostics.Binding_element_0_implicitly_has_an_1_type;
                    break;
                case 233:
                case 153:
                case 152:
                case 155:
                case 156:
                case 191:
                case 192:
                    if (!declaration.name) {
                        error(declaration, ts.Diagnostics.Function_expression_which_lacks_return_type_annotation_implicitly_has_an_0_return_type, typeAsString);
                        return;
                    }
                    diagnostic = ts.Diagnostics._0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type;
                    break;
                case 176:
                    error(declaration, ts.Diagnostics.Mapped_object_type_implicitly_has_an_any_template_type);
                    return;
                default:
                    diagnostic = ts.Diagnostics.Variable_0_implicitly_has_an_1_type;
            }
            error(declaration, diagnostic, ts.declarationNameToString(ts.getNameOfDeclaration(declaration)), typeAsString);
        }
        function reportErrorsFromWidening(declaration, type) {
            if (produceDiagnostics && noImplicitAny && type.flags & 16777216) {
                if (!reportWideningErrorsInType(type)) {
                    reportImplicitAnyError(declaration, type);
                }
            }
        }
        function forEachMatchingParameterType(source, target, callback) {
            var sourceMax = source.parameters.length;
            var targetMax = target.parameters.length;
            var count;
            if (source.hasRestParameter && target.hasRestParameter) {
                count = Math.max(sourceMax, targetMax);
            }
            else if (source.hasRestParameter) {
                count = targetMax;
            }
            else if (target.hasRestParameter) {
                count = sourceMax;
            }
            else {
                count = Math.min(sourceMax, targetMax);
            }
            for (var i = 0; i < count; i++) {
                callback(getTypeAtPosition(source, i), getTypeAtPosition(target, i));
            }
        }
        function createInferenceContext(typeParameters, signature, flags, compareTypes, baseInferences) {
            var inferences = baseInferences ? baseInferences.map(cloneInferenceInfo) : typeParameters.map(createInferenceInfo);
            var context = mapper;
            context.typeParameters = typeParameters;
            context.signature = signature;
            context.inferences = inferences;
            context.flags = flags;
            context.compareTypes = compareTypes || compareTypesAssignable;
            return context;
            function mapper(t) {
                for (var i = 0; i < inferences.length; i++) {
                    if (t === inferences[i].typeParameter) {
                        inferences[i].isFixed = true;
                        return getInferredType(context, i);
                    }
                }
                return t;
            }
        }
        function createInferenceInfo(typeParameter) {
            return {
                typeParameter: typeParameter,
                candidates: undefined,
                contraCandidates: undefined,
                inferredType: undefined,
                priority: undefined,
                topLevel: true,
                isFixed: false
            };
        }
        function cloneInferenceInfo(inference) {
            return {
                typeParameter: inference.typeParameter,
                candidates: inference.candidates && inference.candidates.slice(),
                contraCandidates: inference.contraCandidates && inference.contraCandidates.slice(),
                inf