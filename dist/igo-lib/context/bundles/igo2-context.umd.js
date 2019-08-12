(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs/operators'), require('ol/proj'), require('ol/easing'), require('ol/geom/Point'), require('@angular/common/http'), require('rxjs'), require('@angular/animations'), require('@angular/forms'), require('@igo2/utils'), require('@igo2/auth'), require('@angular/common'), require('@angular/material'), require('@igo2/core'), require('@angular/core'), require('@angular/platform-browser'), require('@igo2/common'), require('@igo2/geo'), require('ol/format/GeoJSON')) :
    typeof define === 'function' && define.amd ? define('@igo2/context', ['exports', 'rxjs/operators', 'ol/proj', 'ol/easing', 'ol/geom/Point', '@angular/common/http', 'rxjs', '@angular/animations', '@angular/forms', '@igo2/utils', '@igo2/auth', '@angular/common', '@angular/material', '@igo2/core', '@angular/core', '@angular/platform-browser', '@igo2/common', '@igo2/geo', 'ol/format/GeoJSON'], factory) :
    (factory((global.igo2 = global.igo2 || {}, global.igo2.context = {}),global.rxjs.operators,global.olproj,global.oleasing,global.olPoint,global.ng.common.http,global.rxjs,global.ng.animations,global.ng.forms,global.utils,global.i2,global.ng.common,global.ng.material,global.i1$1,global.ng.core,global.ng.platformBrowser,global.common$1,global.i3,global.olFormatGeoJSON));
}(this, (function (exports,operators,olproj,oleasing,olPoint,i1,rxjs,animations,forms,utils,i2,common,material,i1$1,i0,platformBrowser,common$1,i3,olFormatGeoJSON) { 'use strict';

    olPoint = olPoint && olPoint.hasOwnProperty('default') ? olPoint['default'] : olPoint;
    olFormatGeoJSON = olFormatGeoJSON && olFormatGeoJSON.hasOwnProperty('default') ? olFormatGeoJSON['default'] : olFormatGeoJSON;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var TypePermission = {
        null: 0,
        read: 1,
        write: 2,
    };
    TypePermission[TypePermission.null] = 'null';
    TypePermission[TypePermission.read] = 'read';
    TypePermission[TypePermission.write] = 'write';
    /** @enum {number} */
    var Scope = {
        public: 0,
        protected: 1,
        private: 2,
    };
    Scope[Scope.public] = 'public';
    Scope[Scope.protected] = 'protected';
    Scope[Scope.private] = 'private';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ContextService = /** @class */ (function () {
        function ContextService(http, authService, languageService, config, route) {
            var _this = this;
            this.http = http;
            this.authService = authService;
            this.languageService = languageService;
            this.config = config;
            this.route = route;
            this.context$ = new rxjs.BehaviorSubject(undefined);
            this.contexts$ = new rxjs.BehaviorSubject({ ours: [] });
            this.defaultContextId$ = new rxjs.BehaviorSubject(undefined);
            this.editedContext$ = new rxjs.BehaviorSubject(undefined);
            this.mapViewFromRoute = {};
            this.options = Object.assign({
                basePath: 'contexts',
                contextListFile: '_contexts.json',
                defaultContextUri: '_default'
            }, this.config.getConfig('context'));
            this.baseUrl = this.options.url;
            this.readParamsFromRoute();
            this.authService.authenticate$.subscribe(( /**
             * @param {?} authenticated
             * @return {?}
             */function (authenticated) {
                if (authenticated === null) {
                    _this.loadDefaultContext();
                    return;
                }
                /** @type {?} */
                var contexts$$ = _this.contexts$.subscribe(( /**
                 * @param {?} contexts
                 * @return {?}
                 */function (contexts) {
                    if (contexts$$) {
                        contexts$$.unsubscribe();
                        _this.handleContextsChange(contexts);
                    }
                }));
                _this.loadContexts();
            }));
        }
        /**
         * @return {?}
         */
        ContextService.prototype.get = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var url = this.baseUrl + '/contexts';
                return this.http.get(url);
            };
        /**
         * @param {?} id
         * @return {?}
         */
        ContextService.prototype.getById = /**
         * @param {?} id
         * @return {?}
         */
            function (id) {
                /** @type {?} */
                var url = this.baseUrl + '/contexts/' + id;
                return this.http.get(url);
            };
        /**
         * @param {?} id
         * @return {?}
         */
        ContextService.prototype.getDetails = /**
         * @param {?} id
         * @return {?}
         */
            function (id) {
                var _this = this;
                /** @type {?} */
                var url = this.baseUrl + "/contexts/" + id + "/details";
                return this.http
                    .get(url)
                    .pipe(operators.catchError(( /**
             * @param {?} res
             * @return {?}
             */function (res) { return _this.handleError(res, id); })));
            };
        /**
         * @return {?}
         */
        ContextService.prototype.getDefault = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var url = this.baseUrl + '/contexts/default';
                return this.http.get(url).pipe(operators.tap(( /**
                 * @param {?} context
                 * @return {?}
                 */function (context) {
                    _this.defaultContextId$.next(context.id);
                })));
            };
        /**
         * @param {?} id
         * @return {?}
         */
        ContextService.prototype.setDefault = /**
         * @param {?} id
         * @return {?}
         */
            function (id) {
                /** @type {?} */
                var url = this.baseUrl + '/contexts/default';
                return this.http.post(url, { defaultContextId: id });
            };
        /**
         * @param {?} id
         * @return {?}
         */
        ContextService.prototype.delete = /**
         * @param {?} id
         * @return {?}
         */
            function (id) {
                var _this = this;
                /** @type {?} */
                var url = this.baseUrl + '/contexts/' + id;
                return this.http.delete(url).pipe(operators.tap(( /**
                 * @param {?} res
                 * @return {?}
                 */function (res) {
                    /** @type {?} */
                    var contexts = { ours: [] };
                    Object.keys(_this.contexts$.value).forEach(( /**
                     * @param {?} key
                     * @return {?}
                     */function (key) {
                        return (contexts[key] = _this.contexts$.value[key].filter(( /**
                         * @param {?} c
                         * @return {?}
                         */function (c) { return c.id !== id; })));
                    }));
                    _this.contexts$.next(contexts);
                })));
            };
        /**
         * @param {?} context
         * @return {?}
         */
        ContextService.prototype.create = /**
         * @param {?} context
         * @return {?}
         */
            function (context) {
                var _this = this;
                /** @type {?} */
                var url = this.baseUrl + '/contexts';
                return this.http.post(url, JSON.stringify(context)).pipe(operators.map(( /**
                 * @param {?} contextCreated
                 * @return {?}
                 */function (contextCreated) {
                    if (_this.authService.authenticated) {
                        contextCreated.permission = TypePermission[TypePermission.write];
                    }
                    else {
                        contextCreated.permission = TypePermission[TypePermission.read];
                    }
                    _this.contexts$.value.ours.push(contextCreated);
                    _this.contexts$.next(_this.contexts$.value);
                    return contextCreated;
                })));
            };
        /**
         * @param {?} id
         * @param {?=} properties
         * @return {?}
         */
        ContextService.prototype.clone = /**
         * @param {?} id
         * @param {?=} properties
         * @return {?}
         */
            function (id, properties) {
                var _this = this;
                if (properties === void 0) {
                    properties = {};
                }
                /** @type {?} */
                var url = this.baseUrl + '/contexts/' + id + '/clone';
                return this.http.post(url, JSON.stringify(properties)).pipe(operators.map(( /**
                 * @param {?} contextCloned
                 * @return {?}
                 */function (contextCloned) {
                    contextCloned.permission = TypePermission[TypePermission.write];
                    _this.contexts$.value.ours.push(contextCloned);
                    _this.contexts$.next(_this.contexts$.value);
                    return contextCloned;
                })));
            };
        /**
         * @param {?} id
         * @param {?} context
         * @return {?}
         */
        ContextService.prototype.update = /**
         * @param {?} id
         * @param {?} context
         * @return {?}
         */
            function (id, context) {
                /** @type {?} */
                var url = this.baseUrl + '/contexts/' + id;
                return this.http.patch(url, JSON.stringify(context));
            };
        // =================================================================
        // =================================================================
        /**
         * @param {?} contextId
         * @param {?} toolId
         * @return {?}
         */
        ContextService.prototype.addToolAssociation =
            // =================================================================
            /**
             * @param {?} contextId
             * @param {?} toolId
             * @return {?}
             */
            function (contextId, toolId) {
                /** @type {?} */
                var url = this.baseUrl + "/contexts/" + contextId + "/tools";
                /** @type {?} */
                var association = {
                    toolId: toolId
                };
                return this.http.post(url, JSON.stringify(association));
            };
        /**
         * @param {?} contextId
         * @param {?} toolId
         * @return {?}
         */
        ContextService.prototype.deleteToolAssociation = /**
         * @param {?} contextId
         * @param {?} toolId
         * @return {?}
         */
            function (contextId, toolId) {
                /** @type {?} */
                var url = this.baseUrl + "/contexts/" + contextId + "/tools/" + toolId;
                return this.http.delete(url);
            };
        /**
         * @param {?} id
         * @return {?}
         */
        ContextService.prototype.getPermissions = /**
         * @param {?} id
         * @return {?}
         */
            function (id) {
                /** @type {?} */
                var url = this.baseUrl + '/contexts/' + id + '/permissions';
                return this.http.get(url);
            };
        /**
         * @param {?} contextId
         * @param {?} profil
         * @param {?} type
         * @return {?}
         */
        ContextService.prototype.addPermissionAssociation = /**
         * @param {?} contextId
         * @param {?} profil
         * @param {?} type
         * @return {?}
         */
            function (contextId, profil, type) {
                /** @type {?} */
                var url = this.baseUrl + "/contexts/" + contextId + "/permissions";
                /** @type {?} */
                var association = {
                    profil: profil,
                    typePermission: type
                };
                return this.http.post(url, JSON.stringify(association));
            };
        /**
         * @param {?} contextId
         * @param {?} permissionId
         * @return {?}
         */
        ContextService.prototype.deletePermissionAssociation = /**
         * @param {?} contextId
         * @param {?} permissionId
         * @return {?}
         */
            function (contextId, permissionId) {
                /** @type {?} */
                var url = this.baseUrl + "/contexts/" + contextId + "/permissions/" + permissionId;
                return this.http.delete(url);
            };
        // ======================================================================
        // ======================================================================
        /**
         * @return {?}
         */
        ContextService.prototype.getLocalContexts =
            // ======================================================================
            /**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var url = this.getPath(this.options.contextListFile);
                return this.http.get(url).pipe(operators.map(( /**
                 * @param {?} res
                 * @return {?}
                 */function (res) {
                    return { ours: res };
                })));
            };
        /**
         * @param {?} uri
         * @return {?}
         */
        ContextService.prototype.getLocalContext = /**
         * @param {?} uri
         * @return {?}
         */
            function (uri) {
                var _this = this;
                /** @type {?} */
                var url = this.getPath(uri + ".json");
                return this.http.get(url).pipe(operators.catchError(( /**
                 * @param {?} res
                 * @return {?}
                 */function (res) {
                    return _this.handleError(res, uri);
                })));
            };
        /**
         * @return {?}
         */
        ContextService.prototype.loadContexts = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var request;
                if (this.baseUrl) {
                    request = this.get();
                }
                else {
                    request = this.getLocalContexts();
                }
                request.subscribe(( /**
                 * @param {?} contexts
                 * @return {?}
                 */function (contexts) {
                    /** @type {?} */
                    var publicsContexts = _this.contexts$.value.public;
                    if (publicsContexts) {
                        /** @type {?} */
                        var contextUri = publicsContexts.find(( /**
                         * @param {?} c
                         * @return {?}
                         */function (c) { return c.uri === _this.options.defaultContextUri; }));
                        if (contextUri) {
                            if (!contexts.public) {
                                contexts.public = [];
                            }
                            contexts.public.push(contextUri);
                        }
                    }
                    _this.contexts$.next(contexts);
                }));
            };
        /**
         * @return {?}
         */
        ContextService.prototype.loadDefaultContext = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var loadFct = ( /**
                 * @param {?=} direct
                 * @return {?}
                 */function (direct) {
                    if (direct === void 0) {
                        direct = false;
                    }
                    if (!direct && _this.baseUrl && _this.authService.authenticated) {
                        _this.getDefault().subscribe(( /**
                         * @param {?} _context
                         * @return {?}
                         */function (_context) {
                            _this.options.defaultContextUri = _context.uri;
                            _this.addContextToList(_context);
                            _this.setContext(_context);
                        }), ( /**
                         * @return {?}
                         */function () {
                            _this.defaultContextId$.next(undefined);
                            _this.loadContext(_this.options.defaultContextUri);
                        }));
                    }
                    else {
                        _this.loadContext(_this.options.defaultContextUri);
                    }
                });
                if (this.route && this.route.options.contextKey) {
                    this.route.queryParams.pipe(operators.debounceTime(100)).subscribe(( /**
                     * @param {?} params
                     * @return {?}
                     */function (params) {
                        /** @type {?} */
                        var contextParam = params[( /** @type {?} */(_this.route.options.contextKey))];
                        /** @type {?} */
                        var direct = false;
                        if (contextParam) {
                            _this.options.defaultContextUri = contextParam;
                            direct = true;
                        }
                        loadFct(direct);
                    }));
                }
                else {
                    loadFct();
                }
            };
        /**
         * @param {?} uri
         * @return {?}
         */
        ContextService.prototype.loadContext = /**
         * @param {?} uri
         * @return {?}
         */
            function (uri) {
                var _this = this;
                /** @type {?} */
                var context = this.context$.value;
                if (context && context.uri === uri) {
                    return;
                }
                /** @type {?} */
                var contexts$$ = this.getContextByUri(uri).subscribe(( /**
                 * @param {?} _context
                 * @return {?}
                 */function (_context) {
                    contexts$$.unsubscribe();
                    _this.addContextToList(_context);
                    _this.setContext(_context);
                }), ( /**
                 * @param {?} err
                 * @return {?}
                 */function (err) {
                    contexts$$.unsubscribe();
                }));
            };
        /**
         * @param {?} context
         * @return {?}
         */
        ContextService.prototype.setContext = /**
         * @param {?} context
         * @return {?}
         */
            function (context) {
                /** @type {?} */
                var currentContext = this.context$.value;
                if (currentContext && context && context.id === currentContext.id) {
                    if (context.map.view.keepCurrentView === undefined) {
                        context.map.view.keepCurrentView = true;
                    }
                    this.context$.next(context);
                    return;
                }
                if (!context.map) {
                    context.map = { view: {} };
                }
                Object.assign(context.map.view, this.mapViewFromRoute);
                this.context$.next(context);
            };
        /**
         * @param {?} uri
         * @return {?}
         */
        ContextService.prototype.loadEditedContext = /**
         * @param {?} uri
         * @return {?}
         */
            function (uri) {
                var _this = this;
                this.getContextByUri(uri).subscribe(( /**
                 * @param {?} _context
                 * @return {?}
                 */function (_context) {
                    _this.setEditedContext(_context);
                }));
            };
        /**
         * @param {?} context
         * @return {?}
         */
        ContextService.prototype.setEditedContext = /**
         * @param {?} context
         * @return {?}
         */
            function (context) {
                this.editedContext$.next(context);
            };
        /**
         * @param {?} igoMap
         * @return {?}
         */
        ContextService.prototype.getContextFromMap = /**
         * @param {?} igoMap
         * @return {?}
         */
            function (igoMap) {
                var e_1, _a;
                /** @type {?} */
                var view = igoMap.ol.getView();
                /** @type {?} */
                var proj = view.getProjection().getCode();
                /** @type {?} */
                var center = new olPoint(view.getCenter()).transform(proj, 'EPSG:4326');
                /** @type {?} */
                var context = {
                    uri: utils.uuid(),
                    title: '',
                    scope: 'private',
                    map: {
                        view: {
                            center: center.getCoordinates(),
                            zoom: view.getZoom(),
                            projection: proj
                        }
                    },
                    layers: [],
                    tools: []
                };
                /** @type {?} */
                var layers = igoMap.layers$.getValue();
                try {
                    for (var layers_1 = __values(layers), layers_1_1 = layers_1.next(); !layers_1_1.done; layers_1_1 = layers_1.next()) {
                        var l = layers_1_1.value;
                        /** @type {?} */
                        var layer = l;
                        /** @type {?} */
                        var opts = {
                            id: layer.options.id ? String(layer.options.id) : undefined,
                            title: layer.options.title,
                            zIndex: layer.zIndex,
                            visible: layer.visible,
                            sourceOptions: {
                                type: layer.dataSource.options.type,
                                params: layer.dataSource.options.params,
                                url: layer.dataSource.options.url
                            }
                        };
                        context.layers.push(opts);
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (layers_1_1 && !layers_1_1.done && (_a = layers_1.return))
                            _a.call(layers_1);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
                context.tools = this.tools.map(( /**
                 * @param {?} tool
                 * @return {?}
                 */function (tool) { return String(tool.id); }));
                return context;
            };
        /**
         * @param {?} tools
         * @return {?}
         */
        ContextService.prototype.setTools = /**
         * @param {?} tools
         * @return {?}
         */
            function (tools) {
                this.tools = tools;
            };
        /**
         * @private
         * @param {?} uri
         * @return {?}
         */
        ContextService.prototype.getContextByUri = /**
         * @private
         * @param {?} uri
         * @return {?}
         */
            function (uri) {
                var e_2, _a;
                if (this.baseUrl) {
                    /** @type {?} */
                    var contextToLoad = void 0;
                    try {
                        for (var _b = __values(Object.keys(this.contexts$.value)), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var key = _c.value;
                            contextToLoad = this.contexts$.value[key].find(( /**
                             * @param {?} c
                             * @return {?}
                             */function (c) {
                                return c.uri === uri;
                            }));
                            if (contextToLoad) {
                                break;
                            }
                        }
                    }
                    catch (e_2_1) {
                        e_2 = { error: e_2_1 };
                    }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return))
                                _a.call(_b);
                        }
                        finally {
                            if (e_2)
                                throw e_2.error;
                        }
                    }
                    // TODO : use always id or uri
                    /** @type {?} */
                    var id = contextToLoad ? contextToLoad.id : uri;
                    return this.getDetails(id);
                }
                return this.getLocalContext(uri);
            };
        /**
         * @private
         * @return {?}
         */
        ContextService.prototype.readParamsFromRoute = /**
         * @private
         * @return {?}
         */
            function () {
                var _this = this;
                if (!this.route) {
                    return;
                }
                this.route.queryParams.subscribe(( /**
                 * @param {?} params
                 * @return {?}
                 */function (params) {
                    /** @type {?} */
                    var centerKey = _this.route.options.centerKey;
                    if (centerKey && params[( /** @type {?} */(centerKey))]) {
                        /** @type {?} */
                        var centerParams = params[( /** @type {?} */(centerKey))];
                        _this.mapViewFromRoute.center = centerParams.split(',').map(Number);
                        _this.mapViewFromRoute.geolocate = false;
                    }
                    /** @type {?} */
                    var projectionKey = _this.route.options.projectionKey;
                    if (projectionKey && params[( /** @type {?} */(projectionKey))]) {
                        /** @type {?} */
                        var projectionParam = params[( /** @type {?} */(projectionKey))];
                        _this.mapViewFromRoute.projection = projectionParam;
                    }
                    /** @type {?} */
                    var zoomKey = _this.route.options.zoomKey;
                    if (zoomKey && params[( /** @type {?} */(zoomKey))]) {
                        /** @type {?} */
                        var zoomParam = params[( /** @type {?} */(zoomKey))];
                        _this.mapViewFromRoute.zoom = Number(zoomParam);
                    }
                }));
            };
        /**
         * @private
         * @param {?} file
         * @return {?}
         */
        ContextService.prototype.getPath = /**
         * @private
         * @param {?} file
         * @return {?}
         */
            function (file) {
                /** @type {?} */
                var basePath = this.options.basePath.replace(/\/$/, '');
                return basePath + "/" + file;
            };
        /**
         * @private
         * @param {?} res
         * @param {?} uri
         * @return {?}
         */
        ContextService.prototype.handleError = /**
         * @private
         * @param {?} res
         * @param {?} uri
         * @return {?}
         */
            function (res, uri) {
                /** @type {?} */
                var context = this.contexts$.value.ours.find(( /**
                 * @param {?} obj
                 * @return {?}
                 */function (obj) { return obj.uri === uri; }));
                /** @type {?} */
                var titleContext = context ? context.title : uri;
                /** @type {?} */
                var titleError = this.languageService.translate.instant('igo.context.contextManager.invalid.title');
                /** @type {?} */
                var textError = this.languageService.translate.instant('igo.context.contextManager.invalid.text', { value: titleContext });
                throw [{ title: titleError, text: textError }];
            };
        /**
         * @private
         * @param {?} contexts
         * @param {?=} keepCurrentContext
         * @return {?}
         */
        ContextService.prototype.handleContextsChange = /**
         * @private
         * @param {?} contexts
         * @param {?=} keepCurrentContext
         * @return {?}
         */
            function (contexts, keepCurrentContext) {
                if (keepCurrentContext === void 0) {
                    keepCurrentContext = false;
                }
                /** @type {?} */
                var context = this.context$.value;
                /** @type {?} */
                var editedContext = this.editedContext$.value;
                if (!keepCurrentContext || !this.findContext(context)) {
                    this.loadDefaultContext();
                }
                else {
                    if (context.map.view.keepCurrentView === undefined) {
                        context.map.view.keepCurrentView = true;
                    }
                    this.context$.next(context);
                    this.getDefault().subscribe(( /**
                     * @return {?}
                     */function () { }));
                }
                /** @type {?} */
                var editedFound = this.findContext(editedContext);
                if (!editedFound || editedFound.permission !== 'write') {
                    this.setEditedContext(undefined);
                }
            };
        /**
         * @private
         * @param {?} context
         * @return {?}
         */
        ContextService.prototype.addContextToList = /**
         * @private
         * @param {?} context
         * @return {?}
         */
            function (context) {
                /** @type {?} */
                var contextFound = this.findContext(context);
                if (!contextFound) {
                    /** @type {?} */
                    var contextSimplifie = {
                        id: context.id,
                        uri: context.uri,
                        title: context.title,
                        scope: context.scope,
                        permission: TypePermission[TypePermission.read]
                    };
                    if (this.contexts$.value && this.contexts$.value.public) {
                        this.contexts$.value.public.push(contextSimplifie);
                        this.contexts$.next(this.contexts$.value);
                    }
                }
            };
        /**
         * @private
         * @param {?} context
         * @return {?}
         */
        ContextService.prototype.findContext = /**
         * @private
         * @param {?} context
         * @return {?}
         */
            function (context) {
                var e_3, _a;
                if (!context || !context.id) {
                    return false;
                }
                /** @type {?} */
                var contexts = this.contexts$.value;
                /** @type {?} */
                var found;
                try {
                    for (var _b = __values(Object.keys(contexts)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var key = _c.value;
                        /** @type {?} */
                        var value = contexts[key];
                        found = value.find(( /**
                         * @param {?} c
                         * @return {?}
                         */function (c) { return c.id === context.id; }));
                        if (found) {
                            break;
                        }
                    }
                }
                catch (e_3_1) {
                    e_3 = { error: e_3_1 };
                }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return))
                            _a.call(_b);
                    }
                    finally {
                        if (e_3)
                            throw e_3.error;
                    }
                }
                return found;
            };
        ContextService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        ContextService.ctorParameters = function () {
            return [
                { type: i1.HttpClient },
                { type: i2.AuthService },
                { type: i1$1.LanguageService },
                { type: i1$1.ConfigService },
                { type: i1$1.RouteService, decorators: [{ type: i0.Optional }] }
            ];
        };
        /** @nocollapse */ ContextService.ngInjectableDef = i0.defineInjectable({ factory: function ContextService_Factory() { return new ContextService(i0.inject(i1.HttpClient), i0.inject(i2.AuthService), i0.inject(i1$1.LanguageService), i0.inject(i1$1.ConfigService), i0.inject(i1$1.RouteService, 8)); }, token: ContextService, providedIn: "root" });
        return ContextService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MapContextDirective = /** @class */ (function () {
        function MapContextDirective(component, contextService) {
            this.contextService = contextService;
            this.component = component;
        }
        Object.defineProperty(MapContextDirective.prototype, "map", {
            get: /**
             * @return {?}
             */ function () {
                return this.component.map;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        MapContextDirective.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.context$$ = this.contextService.context$
                    .pipe(operators.filter(( /**
             * @param {?} context
             * @return {?}
             */function (context) { return context !== undefined; })))
                    .subscribe(( /**
             * @param {?} context
             * @return {?}
             */function (context) { return _this.handleContextChange(context); }));
            };
        /**
         * @return {?}
         */
        MapContextDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.context$$.unsubscribe();
            };
        /**
         * @private
         * @param {?} context
         * @return {?}
         */
        MapContextDirective.prototype.handleContextChange = /**
         * @private
         * @param {?} context
         * @return {?}
         */
            function (context) {
                if (context.map === undefined) {
                    return;
                }
                // This creates a new ol.Map when the context changes. Doing that
                // allows the print tool to work properly even when the map's canvas
                // has been tainted (CORS) with the layers of another context. This could
                // have some side effects such as unbinding all listeners on the first map.
                // A better solution would be to create a new map (preview) before
                // printing and avoid the tainted canvas issue. This will come later so
                // this snippet of code is kept here in case it takes too long becomes
                // an issue
                // const target = this.component.map.ol.getTarget();
                // this.component.map.ol.setTarget(undefined);
                // this.component.map.init();
                // this.component.map.ol.setTarget(target);
                /** @type {?} */
                var viewContext = context.map.view;
                if (viewContext.keepCurrentView !== true) {
                    this.component.view = ( /** @type {?} */(viewContext));
                }
            };
        MapContextDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[igoMapContext]'
                    },] }
        ];
        /** @nocollapse */
        MapContextDirective.ctorParameters = function () {
            return [
                { type: i3.MapBrowserComponent },
                { type: ContextService }
            ];
        };
        return MapContextDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LayerContextDirective = /** @class */ (function () {
        function LayerContextDirective(component, contextService, layerService, route) {
            this.component = component;
            this.contextService = contextService;
            this.layerService = layerService;
            this.route = route;
            this.contextLayers = [];
        }
        Object.defineProperty(LayerContextDirective.prototype, "map", {
            get: /**
             * @return {?}
             */ function () {
                return this.component.map;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        LayerContextDirective.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.context$$ = this.contextService.context$
                    .pipe(operators.filter(( /**
             * @param {?} context
             * @return {?}
             */function (context) { return context !== undefined; })))
                    .subscribe(( /**
             * @param {?} context
             * @return {?}
             */function (context) { return _this.handleContextChange(context); }));
                if (this.route &&
                    this.route.options.visibleOnLayersKey &&
                    this.route.options.visibleOffLayersKey &&
                    this.route.options.contextKey) {
                    /** @type {?} */
                    var queryParams$$_1 = this.route.queryParams
                        .pipe(operators.skip(1))
                        .subscribe(( /**
                 * @param {?} params
                 * @return {?}
                 */function (params) {
                        _this.queryParams = params;
                        queryParams$$_1.unsubscribe();
                    }));
                }
            };
        /**
         * @return {?}
         */
        LayerContextDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.context$$.unsubscribe();
            };
        /**
         * @private
         * @param {?} context
         * @return {?}
         */
        LayerContextDirective.prototype.handleContextChange = /**
         * @private
         * @param {?} context
         * @return {?}
         */
            function (context) {
                var _this = this;
                if (context.layers === undefined) {
                    return;
                }
                this.map.removeLayers(this.contextLayers);
                this.contextLayers = [];
                /** @type {?} */
                var layersAndIndex$ = rxjs.zip.apply(void 0, __spread(context.layers.map(( /**
                 * @param {?} layerOptions
                 * @param {?} index
                 * @return {?}
                 */function (layerOptions, index) {
                    return _this.layerService.createAsyncLayer(layerOptions).pipe(operators.withLatestFrom(rxjs.of(index)));
                }))));
                layersAndIndex$.subscribe(( /**
                 * @param {?} layersAndIndex
                 * @return {?}
                 */function (layersAndIndex) {
                    /** @type {?} */
                    var layers = layersAndIndex.reduce(( /**
                     * @param {?} acc
                     * @param {?} bunch
                     * @return {?}
                     */function (acc, bunch) {
                        var _a = __read(bunch, 2), layer = _a[0], index = _a[1];
                        layer.visible = _this.computeLayerVisibilityFromUrl(layer);
                        layer.zIndex = layer.zIndex || index + 1; // Map indexes start at 1
                        acc[index] = layer;
                        return acc;
                    }), new Array(layersAndIndex.length));
                    _this.contextLayers = layers;
                    _this.map.addLayers(layers);
                }));
            };
        /**
         * @private
         * @param {?} layer
         * @return {?}
         */
        LayerContextDirective.prototype.computeLayerVisibilityFromUrl = /**
         * @private
         * @param {?} layer
         * @return {?}
         */
            function (layer) {
                /** @type {?} */
                var params = this.queryParams;
                /** @type {?} */
                var currentContext = this.contextService.context$.value.uri;
                /** @type {?} */
                var currentLayerid = layer.id;
                /** @type {?} */
                var visible = layer.visible;
                if (!params || !currentLayerid) {
                    return visible;
                }
                /** @type {?} */
                var contextParams = params[( /** @type {?} */(this.route.options.contextKey))];
                if (contextParams === currentContext || !contextParams) {
                    /** @type {?} */
                    var visibleOnLayersParams = '';
                    /** @type {?} */
                    var visibleOffLayersParams = '';
                    /** @type {?} */
                    var visiblelayers = [];
                    /** @type {?} */
                    var invisiblelayers = [];
                    if (this.route.options.visibleOnLayersKey &&
                        params[( /** @type {?} */(this.route.options.visibleOnLayersKey))]) {
                        visibleOnLayersParams =
                            params[( /** @type {?} */(this.route.options.visibleOnLayersKey))];
                    }
                    if (this.route.options.visibleOffLayersKey &&
                        params[( /** @type {?} */(this.route.options.visibleOffLayersKey))]) {
                        visibleOffLayersParams =
                            params[( /** @type {?} */(this.route.options.visibleOffLayersKey))];
                    }
                    /* This order is important because to control whichever
                     the order of * param. First whe open and close everything.*/
                    if (visibleOnLayersParams === '*') {
                        visible = true;
                    }
                    if (visibleOffLayersParams === '*') {
                        visible = false;
                    }
                    // After, managing named layer by id (context.json OR id from datasource)
                    visiblelayers = visibleOnLayersParams.split(',');
                    invisiblelayers = visibleOffLayersParams.split(',');
                    if (visiblelayers.indexOf(currentLayerid) > -1) {
                        visible = true;
                    }
                    if (invisiblelayers.indexOf(currentLayerid) > -1) {
                        visible = false;
                    }
                }
                return visible;
            };
        LayerContextDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[igoLayerContext]'
                    },] }
        ];
        /** @nocollapse */
        LayerContextDirective.ctorParameters = function () {
            return [
                { type: i3.MapBrowserComponent },
                { type: ContextService },
                { type: i3.LayerService },
                { type: i1$1.RouteService, decorators: [{ type: i0.Optional }] }
            ];
        };
        return LayerContextDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ContextListComponent = /** @class */ (function () {
        function ContextListComponent(cdRef) {
            this.cdRef = cdRef;
            this._contexts = { ours: [] };
            this.select = new i0.EventEmitter();
            this.unselect = new i0.EventEmitter();
            this.edit = new i0.EventEmitter();
            this.delete = new i0.EventEmitter();
            this.save = new i0.EventEmitter();
            this.clone = new i0.EventEmitter();
            this.favorite = new i0.EventEmitter();
            this.managePermissions = new i0.EventEmitter();
            this.manageTools = new i0.EventEmitter();
            this.titleMapping = {
                ours: 'igo.context.contextManager.ourContexts',
                shared: 'igo.context.contextManager.sharedContexts',
                public: 'igo.context.contextManager.publicContexts'
            };
        }
        Object.defineProperty(ContextListComponent.prototype, "contexts", {
            get: /**
             * @return {?}
             */ function () {
                return this._contexts;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._contexts = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContextListComponent.prototype, "selectedContext", {
            get: /**
             * @return {?}
             */ function () {
                return this._selectedContext;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._selectedContext = value;
                this.cdRef.detectChanges();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContextListComponent.prototype, "defaultContextId", {
            get: /**
             * @return {?}
             */ function () {
                return this._defaultContextId;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._defaultContextId = value;
            },
            enumerable: true,
            configurable: true
        });
        ContextListComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-context-list',
                        template: "<igo-list [navigation]=\"true\">\r\n  <ng-template ngFor let-groupContexts [ngForOf]=\"contexts | keyvalue\">\r\n    <igo-collapsible *ngIf=\"groupContexts.value.length\" [title]=\"titleMapping[groupContexts.key] | translate\">\r\n\r\n      <ng-template ngFor let-context [ngForOf]=\"groupContexts.value\">\r\n        <igo-context-item\r\n          igoListItem\r\n          color=\"accent\"\r\n          [selected]=\"selectedContext && selectedContext.uri === context.uri\"\r\n          [context]=\"context\"\r\n          [default]=\"this.defaultContextId === context.id\"\r\n          (edit)=\"edit.emit(context)\"\r\n          (delete)=\"delete.emit(context)\"\r\n          (clone)=\"clone.emit(context)\"\r\n          (save)=\"save.emit(context)\"\r\n          (favorite)=\"favorite.emit(context)\"\r\n          (manageTools)=\"manageTools.emit(context)\"\r\n          (managePermissions)=\"managePermissions.emit(context)\"\r\n          (select)=\"select.emit(context)\"\r\n          (unselect)=\"unselect.emit(context)\">\r\n        </igo-context-item>\r\n      </ng-template>\r\n\r\n    </igo-collapsible>\r\n  </ng-template>\r\n</igo-list>\r\n"
                    }] }
        ];
        /** @nocollapse */
        ContextListComponent.ctorParameters = function () {
            return [
                { type: i0.ChangeDetectorRef }
            ];
        };
        ContextListComponent.propDecorators = {
            contexts: [{ type: i0.Input }],
            selectedContext: [{ type: i0.Input }],
            defaultContextId: [{ type: i0.Input }],
            select: [{ type: i0.Output }],
            unselect: [{ type: i0.Output }],
            edit: [{ type: i0.Output }],
            delete: [{ type: i0.Output }],
            save: [{ type: i0.Output }],
            clone: [{ type: i0.Output }],
            favorite: [{ type: i0.Output }],
            managePermissions: [{ type: i0.Output }],
            manageTools: [{ type: i0.Output }]
        };
        return ContextListComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ContextListBindingDirective = /** @class */ (function () {
        function ContextListBindingDirective(component, contextService, mapService, languageService, confirmDialogService, messageService) {
            this.contextService = contextService;
            this.mapService = mapService;
            this.languageService = languageService;
            this.confirmDialogService = confirmDialogService;
            this.messageService = messageService;
            this.component = component;
        }
        /**
         * @param {?} context
         * @return {?}
         */
        ContextListBindingDirective.prototype.onSelect = /**
         * @param {?} context
         * @return {?}
         */
            function (context) {
                this.contextService.loadContext(context.uri);
            };
        /**
         * @param {?} context
         * @return {?}
         */
        ContextListBindingDirective.prototype.onEdit = /**
         * @param {?} context
         * @return {?}
         */
            function (context) {
                this.contextService.loadEditedContext(context.uri);
            };
        /**
         * @param {?} context
         * @return {?}
         */
        ContextListBindingDirective.prototype.onSave = /**
         * @param {?} context
         * @return {?}
         */
            function (context) {
                var _this = this;
                /** @type {?} */
                var map = this.mapService.getMap();
                /** @type {?} */
                var contextFromMap = this.contextService.getContextFromMap(map);
                /** @type {?} */
                var changes = {
                    layers: contextFromMap.layers,
                    map: {
                        view: contextFromMap.map.view
                    }
                };
                this.contextService.update(context.id, changes).subscribe(( /**
                 * @return {?}
                 */function () {
                    /** @type {?} */
                    var translate = _this.languageService.translate;
                    /** @type {?} */
                    var message = translate.instant('igo.context.contextManager.dialog.saveMsg', {
                        value: context.title
                    });
                    /** @type {?} */
                    var title = translate.instant('igo.context.contextManager.dialog.saveTitle');
                    _this.messageService.success(message, title);
                }));
            };
        /**
         * @param {?} context
         * @return {?}
         */
        ContextListBindingDirective.prototype.onFavorite = /**
         * @param {?} context
         * @return {?}
         */
            function (context) {
                var _this = this;
                this.contextService.setDefault(context.id).subscribe(( /**
                 * @return {?}
                 */function () {
                    _this.contextService.defaultContextId$.next(context.id);
                    /** @type {?} */
                    var translate = _this.languageService.translate;
                    /** @type {?} */
                    var message = translate.instant('igo.context.contextManager.dialog.favoriteMsg', {
                        value: context.title
                    });
                    /** @type {?} */
                    var title = translate.instant('igo.context.contextManager.dialog.favoriteTitle');
                    _this.messageService.success(message, title);
                }));
            };
        /**
         * @param {?} context
         * @return {?}
         */
        ContextListBindingDirective.prototype.onManageTools = /**
         * @param {?} context
         * @return {?}
         */
            function (context) {
                this.contextService.loadEditedContext(context.uri);
            };
        /**
         * @param {?} context
         * @return {?}
         */
        ContextListBindingDirective.prototype.onManagePermissions = /**
         * @param {?} context
         * @return {?}
         */
            function (context) {
                this.contextService.loadEditedContext(context.uri);
            };
        /**
         * @param {?} context
         * @return {?}
         */
        ContextListBindingDirective.prototype.onDelete = /**
         * @param {?} context
         * @return {?}
         */
            function (context) {
                var _this = this;
                /** @type {?} */
                var translate = this.languageService.translate;
                this.confirmDialogService
                    .open(translate.instant('igo.context.contextManager.dialog.confirmDelete'))
                    .subscribe(( /**
             * @param {?} confirm
             * @return {?}
             */function (confirm) {
                    if (confirm) {
                        _this.contextService.delete(context.id).subscribe(( /**
                         * @return {?}
                         */function () {
                            /** @type {?} */
                            var message = translate.instant('igo.context.contextManager.dialog.deleteMsg', {
                                value: context.title
                            });
                            /** @type {?} */
                            var title = translate.instant('igo.context.contextManager.dialog.deleteTitle');
                            _this.messageService.info(message, title);
                        }));
                    }
                }));
            };
        /**
         * @param {?} context
         * @return {?}
         */
        ContextListBindingDirective.prototype.onClone = /**
         * @param {?} context
         * @return {?}
         */
            function (context) {
                var _this = this;
                /** @type {?} */
                var properties = {
                    title: context.title + '-copy',
                    uri: context.uri + '-copy'
                };
                this.contextService.clone(context.id, properties).subscribe(( /**
                 * @return {?}
                 */function () {
                    /** @type {?} */
                    var translate = _this.languageService.translate;
                    /** @type {?} */
                    var message = translate.instant('igo.context.contextManager.dialog.cloneMsg', {
                        value: context.title
                    });
                    /** @type {?} */
                    var title = translate.instant('igo.context.contextManager.dialog.cloneTitle');
                    _this.messageService.success(message, title);
                }));
            };
        /**
         * @return {?}
         */
        ContextListBindingDirective.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                // Override input contexts
                this.component.contexts = { ours: [] };
                this.contexts$$ = this.contextService.contexts$.subscribe(( /**
                 * @param {?} contexts
                 * @return {?}
                 */function (contexts) {
                    return _this.handleContextsChange(contexts);
                }));
                this.defaultContextId$$ = this.contextService.defaultContextId$.subscribe(( /**
                 * @param {?} id
                 * @return {?}
                 */function (id) {
                    _this.component.defaultContextId = id;
                }));
                // See feature-list.component for an explanation about the debounce time
                this.selectedContext$$ = this.contextService.context$
                    .pipe(operators.debounceTime(100))
                    .subscribe(( /**
             * @param {?} context
             * @return {?}
             */function (context) { return (_this.component.selectedContext = context); }));
                this.contextService.loadContexts();
            };
        /**
         * @return {?}
         */
        ContextListBindingDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.contexts$$.unsubscribe();
                this.selectedContext$$.unsubscribe();
                this.defaultContextId$$.unsubscribe();
            };
        /**
         * @private
         * @param {?} contexts
         * @return {?}
         */
        ContextListBindingDirective.prototype.handleContextsChange = /**
         * @private
         * @param {?} contexts
         * @return {?}
         */
            function (contexts) {
                this.component.contexts = contexts;
            };
        ContextListBindingDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[igoContextListBinding]'
                    },] }
        ];
        /** @nocollapse */
        ContextListBindingDirective.ctorParameters = function () {
            return [
                { type: ContextListComponent, decorators: [{ type: i0.Self }] },
                { type: ContextService },
                { type: i3.MapService },
                { type: i1$1.LanguageService },
                { type: common$1.ConfirmDialogService },
                { type: i1$1.MessageService }
            ];
        };
        ContextListBindingDirective.propDecorators = {
            onSelect: [{ type: i0.HostListener, args: ['select', ['$event'],] }],
            onEdit: [{ type: i0.HostListener, args: ['edit', ['$event'],] }],
            onSave: [{ type: i0.HostListener, args: ['save', ['$event'],] }],
            onFavorite: [{ type: i0.HostListener, args: ['favorite', ['$event'],] }],
            onManageTools: [{ type: i0.HostListener, args: ['manageTools', ['$event'],] }],
            onManagePermissions: [{ type: i0.HostListener, args: ['managePermissions', ['$event'],] }],
            onDelete: [{ type: i0.HostListener, args: ['delete', ['$event'],] }],
            onClone: [{ type: i0.HostListener, args: ['clone', ['$event'],] }]
        };
        return ContextListBindingDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ContextItemComponent = /** @class */ (function () {
        function ContextItemComponent(auth) {
            this.auth = auth;
            this.typePermission = TypePermission;
            this.color = 'primary';
            this.collapsed = true;
            this._default = false;
            this.edit = new i0.EventEmitter();
            this.delete = new i0.EventEmitter();
            this.save = new i0.EventEmitter();
            this.clone = new i0.EventEmitter();
            this.favorite = new i0.EventEmitter();
            this.managePermissions = new i0.EventEmitter();
            this.manageTools = new i0.EventEmitter();
        }
        Object.defineProperty(ContextItemComponent.prototype, "context", {
            get: /**
             * @return {?}
             */ function () {
                return this._context;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._context = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContextItemComponent.prototype, "default", {
            get: /**
             * @return {?}
             */ function () {
                return this._default;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._default = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} context
         * @return {?}
         */
        ContextItemComponent.prototype.favoriteClick = /**
         * @param {?} context
         * @return {?}
         */
            function (context) {
                if (this.auth.authenticated) {
                    this.favorite.emit(context);
                }
            };
        ContextItemComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-context-item',
                        template: "<mat-list-item>\r\n  <button mat-list-avatar\r\n    mat-icon-button\r\n    igoStopPropagation\r\n    [matTooltip]=\"'igo.context.contextManager.favorite' | translate\"\r\n    matTooltipShowDelay=\"500\"\r\n    [color]=\"default ? 'primary' : 'default'\"\r\n    (click)=\"favoriteClick(context)\">\r\n    <mat-icon *ngIf=\"!context.iconImage\" svgIcon=\"{{context.icon ? context.icon : context.scope === 'public' ? 'earth' : 'star'}}\"></mat-icon>\r\n    <img *ngIf=\"context.iconImage\" [src]=\"context.iconImage\">\r\n  </button>\r\n  <h4 matLine>{{context.title}}</h4>\r\n\r\n  <div *ngIf=\"auth.authenticated && context.permission === typePermission[typePermission.read]\"\r\n       igoStopPropagation\r\n       class=\"igo-actions-container\">\r\n\r\n       <button\r\n         mat-icon-button\r\n         [matTooltip]=\"'igo.context.contextManager.clone' | translate\"\r\n         matTooltipShowDelay=\"500\"\r\n         [color]=\"color\"\r\n         (click)=\"clone.emit(context)\">\r\n         <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n       </button>\r\n </div>\r\n\r\n\r\n  <div *ngIf=\"context.permission === typePermission[typePermission.write]\"\r\n       igoStopPropagation\r\n       class=\"igo-actions-container\">\r\n\r\n     <button *ngIf=\"collapsed\"\r\n       mat-icon-button\r\n       [matTooltip]=\"'igo.context.contextManager.save' | translate\"\r\n       matTooltipShowDelay=\"500\"\r\n       [color]=\"color\"\r\n       (click)=\"save.emit(context)\">\r\n       <mat-icon svgIcon=\"content-save\"></mat-icon>\r\n     </button>\r\n\r\n    <div #actions class=\"igo-actions-expand-container\">\r\n\r\n      <button\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.context.contextManager.managePermissions' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        [color]=\"color\"\r\n        (click)=\"managePermissions.emit(context)\">\r\n        <mat-icon svgIcon=\"account-outline\"></mat-icon>\r\n      </button>\r\n\r\n      <!--button\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.context.contextManager.manageTools' | translate\"\r\n        [color]=\"color\"\r\n        (click)=\"manageTools.emit(context)\">\r\n        <mat-icon svgIcon=\"widgets\"></mat-icon>\r\n      </button-->\r\n\r\n      <button\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.context.contextManager.clone' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        [color]=\"color\"\r\n        (click)=\"clone.emit(context)\">\r\n        <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n      </button>\r\n\r\n      <button\r\n        mat-icon-button\r\n        [color]=\"color\"\r\n        [matTooltip]=\"'igo.context.contextManager.edit' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"edit.emit(context)\">\r\n        <mat-icon svgIcon=\"pencil\"></mat-icon>\r\n      </button>\r\n\r\n      <button\r\n        mat-icon-button\r\n        color=\"warn\"\r\n        [matTooltip]=\"'igo.context.contextManager.delete' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"delete.emit(context)\">\r\n        <mat-icon svgIcon=\"delete\"></mat-icon>\r\n      </button>\r\n    </div>\r\n\r\n    <button\r\n      mat-icon-button\r\n      igoCollapse\r\n      [color]=\"color\"\r\n      [target]=\"actions\"\r\n      [collapsed]=collapsed\r\n      (click)=\"collapsed = !collapsed\">\r\n      <mat-icon svgIcon=\"dots-horizontal\"></mat-icon>\r\n    </button>\r\n\r\n  </div>\r\n\r\n</mat-list-item>\r\n",
                        styles: [":host{overflow:hidden}.igo-actions-container{flex-shrink:0}.igo-actions-expand-container{display:inline-flex}mat-list-item>>>.mat-list-item-content .mat-list-text{padding:0}mat-list-item>>>.mat-list-item-content .mat-list-text>h4{padding:0 16px}mat-icon.disabled{color:rgba(0,0,0,.38)}"]
                    }] }
        ];
        /** @nocollapse */
        ContextItemComponent.ctorParameters = function () {
            return [
                { type: i2.AuthService }
            ];
        };
        ContextItemComponent.propDecorators = {
            context: [{ type: i0.Input }],
            default: [{ type: i0.Input }],
            edit: [{ type: i0.Output }],
            delete: [{ type: i0.Output }],
            save: [{ type: i0.Output }],
            clone: [{ type: i0.Output }],
            favorite: [{ type: i0.Output }],
            managePermissions: [{ type: i0.Output }],
            manageTools: [{ type: i0.Output }]
        };
        return ContextItemComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ContextFormComponent = /** @class */ (function () {
        function ContextFormComponent(formBuilder) {
            this.formBuilder = formBuilder;
            this._disabled = false;
            // TODO: replace any by ContextOptions or Context
            this.submitForm = new i0.EventEmitter();
            this.clone = new i0.EventEmitter();
            this.delete = new i0.EventEmitter();
        }
        Object.defineProperty(ContextFormComponent.prototype, "btnSubmitText", {
            get: /**
             * @return {?}
             */ function () {
                return this._btnSubmitText;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._btnSubmitText = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContextFormComponent.prototype, "context", {
            get: /**
             * @return {?}
             */ function () {
                return this._context;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._context = value;
                this.buildForm();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContextFormComponent.prototype, "disabled", {
            get: /**
             * @return {?}
             */ function () {
                return this._disabled;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._disabled = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        ContextFormComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.buildForm();
            };
        /**
         * @param {?} value
         * @return {?}
         */
        ContextFormComponent.prototype.handleFormSubmit = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                /** @type {?} */
                var inputs = Object.assign({}, value);
                inputs = utils.ObjectUtils.removeNull(inputs);
                inputs.uri = inputs.uri.replace(' ', '');
                if (inputs.uri) {
                    inputs.uri = this.prefix + '-' + inputs.uri;
                }
                else {
                    inputs.uri = this.prefix;
                }
                this.submitForm.emit(inputs);
            };
        /**
         * @private
         * @return {?}
         */
        ContextFormComponent.prototype.buildForm = /**
         * @private
         * @return {?}
         */
            function () {
                /** @type {?} */
                var context = this.context || {};
                /** @type {?} */
                var uriSplit = context.uri.split('-');
                this.prefix = uriSplit.shift();
                /** @type {?} */
                var uri = uriSplit.join('-');
                this.form = this.formBuilder.group({
                    title: [context.title],
                    uri: [uri || ' ']
                });
            };
        ContextFormComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-context-form',
                        template: "<form class=\"igo-form\" [formGroup]=\"form\"\r\n  (ngSubmit)=\"handleFormSubmit(form.value)\">\r\n\r\n  <mat-form-field class=\"full-width\">\r\n    <input matInput required\r\n           [placeholder]=\"'igo.context.contextManager.form.title' | translate\"\r\n           formControlName=\"title\">\r\n   <mat-error>\r\n    {{ 'igo.context.contextManager.form.titleRequired' | translate }}\r\n   </mat-error>\r\n  </mat-form-field>\r\n\r\n  <mat-form-field id=\"uriInput\" class=\"full-width\">\r\n    <span *ngIf=\"prefix\" class=\"prefix\">{{prefix}}-</span>\r\n    <span class=\"fieldWrapper\">\r\n      <input matInput\r\n           [placeholder]=\"'igo.context.contextManager.form.uri' | translate\"\r\n           formControlName=\"uri\">\r\n    </span>\r\n  </mat-form-field>\r\n\r\n  <div class=\"igo-form-button-group\">\r\n    <button\r\n      mat-raised-button\r\n      type=\"submit\"\r\n      [disabled]=\"!form.valid || disabled\">\r\n      {{ 'igo.context.contextManager.form.edit' | translate }}\r\n    </button>\r\n  </div>\r\n\r\n</form>\r\n",
                        styles: [".full-width{width:100%}#uriInput .fieldWrapper{display:block;overflow:hidden}#uriInput .prefix{float:left}"]
                    }] }
        ];
        /** @nocollapse */
        ContextFormComponent.ctorParameters = function () {
            return [
                { type: forms.FormBuilder }
            ];
        };
        ContextFormComponent.propDecorators = {
            btnSubmitText: [{ type: i0.Input }],
            context: [{ type: i0.Input }],
            disabled: [{ type: i0.Input }],
            submitForm: [{ type: i0.Output }],
            clone: [{ type: i0.Output }],
            delete: [{ type: i0.Output }]
        };
        return ContextFormComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ContextEditComponent = /** @class */ (function () {
        function ContextEditComponent() {
            this.submitForm = new i0.EventEmitter();
        }
        Object.defineProperty(ContextEditComponent.prototype, "context", {
            get: /**
             * @return {?}
             */ function () {
                return this._context;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._context = value;
            },
            enumerable: true,
            configurable: true
        });
        ContextEditComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-context-edit',
                        template: "<igo-context-form *ngIf=\"context\"\r\n   [btnSubmitText]=\"'igo.context.contextManager.save' | translate\"\r\n   [context]=\"context\"\r\n   (submitForm)=\"submitForm.emit($event)\">\r\n</igo-context-form>\r\n"
                    }] }
        ];
        /** @nocollapse */
        ContextEditComponent.ctorParameters = function () { return []; };
        ContextEditComponent.propDecorators = {
            context: [{ type: i0.Input }],
            submitForm: [{ type: i0.Output }]
        };
        return ContextEditComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ContextEditBindingDirective = /** @class */ (function () {
        function ContextEditBindingDirective(component, contextService, messageService, languageService) {
            this.contextService = contextService;
            this.messageService = messageService;
            this.languageService = languageService;
            this.component = component;
        }
        /**
         * @param {?} context
         * @return {?}
         */
        ContextEditBindingDirective.prototype.onEdit = /**
         * @param {?} context
         * @return {?}
         */
            function (context) {
                var _this = this;
                /** @type {?} */
                var id = this.component.context.id;
                this.contextService.update(id, context).subscribe(( /**
                 * @return {?}
                 */function () {
                    /** @type {?} */
                    var translate = _this.languageService.translate;
                    /** @type {?} */
                    var message = translate.instant('igo.context.contextManager.dialog.saveMsg', {
                        value: context.title || _this.component.context.title
                    });
                    /** @type {?} */
                    var title = translate.instant('igo.context.contextManager.dialog.saveTitle');
                    _this.messageService.success(message, title);
                }));
            };
        /**
         * @return {?}
         */
        ContextEditBindingDirective.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.editedContext$$ = this.contextService.editedContext$.subscribe(( /**
                 * @param {?} context
                 * @return {?}
                 */function (context) { return _this.handleEditedContextChange(context); }));
            };
        /**
         * @return {?}
         */
        ContextEditBindingDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.editedContext$$.unsubscribe();
            };
        /**
         * @private
         * @param {?} context
         * @return {?}
         */
        ContextEditBindingDirective.prototype.handleEditedContextChange = /**
         * @private
         * @param {?} context
         * @return {?}
         */
            function (context) {
                this.component.context = context;
            };
        ContextEditBindingDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[igoContextEditBinding]'
                    },] }
        ];
        /** @nocollapse */
        ContextEditBindingDirective.ctorParameters = function () {
            return [
                { type: ContextEditComponent, decorators: [{ type: i0.Self }] },
                { type: ContextService },
                { type: i1$1.MessageService },
                { type: i1$1.LanguageService }
            ];
        };
        ContextEditBindingDirective.propDecorators = {
            onEdit: [{ type: i0.HostListener, args: ['submitForm', ['$event'],] }]
        };
        return ContextEditBindingDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ContextPermissionsComponent = /** @class */ (function () {
        function ContextPermissionsComponent(formBuilder) {
            this.formBuilder = formBuilder;
            this.addPermission = new i0.EventEmitter();
            this.removePermission = new i0.EventEmitter();
            this.scopeChanged = new i0.EventEmitter();
        }
        Object.defineProperty(ContextPermissionsComponent.prototype, "context", {
            get: /**
             * @return {?}
             */ function () {
                return this._context;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._context = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContextPermissionsComponent.prototype, "permissions", {
            get: /**
             * @return {?}
             */ function () {
                return this._permissions;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._permissions = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        ContextPermissionsComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.buildForm();
            };
        /**
         * @param {?} value
         * @return {?}
         */
        ContextPermissionsComponent.prototype.handleFormSubmit = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                this.addPermission.emit(value);
            };
        /**
         * @private
         * @return {?}
         */
        ContextPermissionsComponent.prototype.buildForm = /**
         * @private
         * @return {?}
         */
            function () {
                this.form = this.formBuilder.group({
                    profil: [],
                    typePermission: ['read']
                });
            };
        ContextPermissionsComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-context-permissions',
                        template: "<div *ngIf=\"context\">\r\n\r\n  <div class=\"scopeForm\">\r\n    <mat-radio-group [(ngModel)]=\"context.scope\"\r\n                    (change)=\"scopeChanged.emit(context)\">\r\n      <mat-radio-button value=\"private\">\r\n        {{ 'igo.context.permission.scope.private' | translate }}\r\n      </mat-radio-button>\r\n      <mat-radio-button value=\"protected\">\r\n        {{ 'igo.context.permission.scope.protected' | translate }}\r\n      </mat-radio-button>\r\n      <mat-radio-button value=\"public\">\r\n        {{ 'igo.context.permission.scope.public' | translate }}\r\n      </mat-radio-button>\r\n    </mat-radio-group>\r\n  </div>\r\n\r\n  <form *ngIf=\"context.scope !== 'private'\" [formGroup]=\"form\"\r\n    (ngSubmit)=\"handleFormSubmit(form.value)\">\r\n\r\n    <mat-form-field class=\"full-width\">\r\n      <input matInput required\r\n             [placeholder]=\"'igo.context.permission.profil' | translate\"\r\n             formControlName=\"profil\">\r\n     <mat-error>\r\n       {{ 'igo.context.permission.profilRequired' | translate }}\r\n     </mat-error>\r\n    </mat-form-field>\r\n\r\n\r\n    <mat-radio-group formControlName=\"typePermission\">\r\n      <mat-radio-button value=\"read\">\r\n        {{ 'igo.context.permission.read' | translate }}\r\n      </mat-radio-button>\r\n      <mat-radio-button value=\"write\">\r\n        {{ 'igo.context.permission.write' | translate }}\r\n      </mat-radio-button>\r\n    </mat-radio-group>\r\n\r\n\r\n    <div class=\"igo-form-button-group\">\r\n      <button\r\n        mat-raised-button\r\n        type=\"submit\"\r\n        [disabled]=\"!form.valid\">\r\n        {{ 'igo.context.permission.addBtn' | translate }}\r\n      </button>\r\n    </div>\r\n\r\n  </form>\r\n\r\n  <igo-list *ngIf=\"permissions && context.scope !== 'private'\">\r\n    <ng-template ngFor let-groupPermissions [ngForOf]=\"permissions | keyvalue\">\r\n      <igo-collapsible\r\n        *ngIf=\"groupPermissions.value.length\"\r\n        [title]=\"'igo.context.permission.' + groupPermissions.key | translate\">\r\n\r\n        <ng-template ngFor let-permission [ngForOf]=\"groupPermissions.value\">\r\n          <mat-list-item>\r\n            <mat-icon mat-list-avatar svgIcon=\"account-outline\"></mat-icon>\r\n            <h4 mat-line>{{permission.profil}}</h4>\r\n\r\n            <div igoStopPropagation\r\n                 class=\"igo-actions-container\">\r\n\r\n               <button\r\n                 mat-icon-button\r\n                 [matTooltip]=\"'igo.context.permission.delete' | translate\"\r\n                 matTooltipShowDelay=\"500\"\r\n                 color=\"warn\"\r\n                 (click)=\"removePermission.emit(permission)\">\r\n                 <mat-icon svgIcon=\"delete\"></mat-icon>\r\n               </button>\r\n            </div>\r\n\r\n          </mat-list-item>\r\n        </ng-template>\r\n      </igo-collapsible>\r\n    </ng-template>\r\n  </igo-list>\r\n\r\n</div>\r\n",
                        styles: [":host{margin:0 10px}.full-width{width:100%}mat-radio-button{padding:14px 14px 14px 0}.scopeForm,form{padding:5px}"]
                    }] }
        ];
        /** @nocollapse */
        ContextPermissionsComponent.ctorParameters = function () {
            return [
                { type: forms.FormBuilder }
            ];
        };
        ContextPermissionsComponent.propDecorators = {
            context: [{ type: i0.Input }],
            permissions: [{ type: i0.Input }],
            addPermission: [{ type: i0.Output }],
            removePermission: [{ type: i0.Output }],
            scopeChanged: [{ type: i0.Output }]
        };
        return ContextPermissionsComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ContextPermissionsBindingDirective = /** @class */ (function () {
        function ContextPermissionsBindingDirective(component, contextService, languageService, messageService) {
            this.contextService = contextService;
            this.languageService = languageService;
            this.messageService = messageService;
            this.component = component;
        }
        /**
         * @param {?} permission
         * @return {?}
         */
        ContextPermissionsBindingDirective.prototype.onAddPermission = /**
         * @param {?} permission
         * @return {?}
         */
            function (permission) {
                var _this = this;
                /** @type {?} */
                var contextId = this.component.context.id;
                this.contextService
                    .addPermissionAssociation(contextId, permission.profil, permission.typePermission)
                    .subscribe(( /**
             * @param {?} profils
             * @return {?}
             */function (profils) {
                    var e_1, _a;
                    try {
                        for (var profils_1 = __values(profils), profils_1_1 = profils_1.next(); !profils_1_1.done; profils_1_1 = profils_1.next()) {
                            var p = profils_1_1.value;
                            _this.component.permissions[permission.typePermission].push(p);
                        }
                    }
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (profils_1_1 && !profils_1_1.done && (_a = profils_1.return))
                                _a.call(profils_1);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
                    }
                    /** @type {?} */
                    var profil = permission.profil;
                    /** @type {?} */
                    var translate = _this.languageService.translate;
                    /** @type {?} */
                    var message = translate.instant('igo.context.permission.dialog.addMsg', {
                        value: profil
                    });
                    /** @type {?} */
                    var title = translate.instant('igo.context.permission.dialog.addTitle');
                    _this.messageService.success(message, title);
                }));
            };
        /**
         * @param {?} permission
         * @return {?}
         */
        ContextPermissionsBindingDirective.prototype.onRemovePermission = /**
         * @param {?} permission
         * @return {?}
         */
            function (permission) {
                var _this = this;
                /** @type {?} */
                var contextId = this.component.context.id;
                this.contextService
                    .deletePermissionAssociation(contextId, permission.id)
                    .subscribe(( /**
             * @return {?}
             */function () {
                    /** @type {?} */
                    var index = _this.component.permissions[permission.typePermission].findIndex(( /**
                     * @param {?} p
                     * @return {?}
                     */function (p) {
                        return p.id === permission.id;
                    }));
                    _this.component.permissions[permission.typePermission].splice(index, 1);
                    /** @type {?} */
                    var profil = permission.profil;
                    /** @type {?} */
                    var translate = _this.languageService.translate;
                    /** @type {?} */
                    var message = translate.instant('igo.context.permission.dialog.deleteMsg', {
                        value: profil
                    });
                    /** @type {?} */
                    var title = translate.instant('igo.context.permission.dialog.deleteTitle');
                    _this.messageService.success(message, title);
                }));
            };
        /**
         * @param {?} context
         * @return {?}
         */
        ContextPermissionsBindingDirective.prototype.onScopeChanged = /**
         * @param {?} context
         * @return {?}
         */
            function (context) {
                var _this = this;
                /** @type {?} */
                var scope = context.scope;
                this.contextService.update(context.id, { scope: scope }).subscribe(( /**
                 * @return {?}
                 */function () {
                    /** @type {?} */
                    var translate = _this.languageService.translate;
                    /** @type {?} */
                    var message = translate.instant('igo.context.permission.dialog.scopeChangedMsg', {
                        value: translate.instant('igo.context.permission.scope.' + scope)
                    });
                    /** @type {?} */
                    var title = translate.instant('igo.context.permission.dialog.scopeChangedTitle');
                    _this.messageService.success(message, title);
                }));
            };
        /**
         * @return {?}
         */
        ContextPermissionsBindingDirective.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.editedContext$$ = this.contextService.editedContext$.subscribe(( /**
                 * @param {?} context
                 * @return {?}
                 */function (context) { return _this.handleEditedContextChange(context); }));
            };
        /**
         * @return {?}
         */
        ContextPermissionsBindingDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.editedContext$$.unsubscribe();
            };
        /**
         * @private
         * @param {?} context
         * @return {?}
         */
        ContextPermissionsBindingDirective.prototype.handleEditedContextChange = /**
         * @private
         * @param {?} context
         * @return {?}
         */
            function (context) {
                var _this = this;
                this.component.context = context;
                if (context) {
                    this.contextService
                        .getPermissions(context.id)
                        .subscribe(( /**
                 * @param {?} permissionsArray
                 * @return {?}
                 */function (permissionsArray) {
                        permissionsArray = permissionsArray || [];
                        /** @type {?} */
                        var permissions = {
                            read: permissionsArray.filter(( /**
                             * @param {?} p
                             * @return {?}
                             */function (p) {
                                return p.typePermission.toString() === 'read';
                            })),
                            write: permissionsArray.filter(( /**
                             * @param {?} p
                             * @return {?}
                             */function (p) {
                                return p.typePermission.toString() === 'write';
                            }))
                        };
                        return (_this.component.permissions = permissions);
                    }));
                }
            };
        ContextPermissionsBindingDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[igoContextPermissionsBinding]'
                    },] }
        ];
        /** @nocollapse */
        ContextPermissionsBindingDirective.ctorParameters = function () {
            return [
                { type: ContextPermissionsComponent, decorators: [{ type: i0.Self }] },
                { type: ContextService },
                { type: i1$1.LanguageService },
                { type: i1$1.MessageService }
            ];
        };
        ContextPermissionsBindingDirective.propDecorators = {
            onAddPermission: [{ type: i0.HostListener, args: ['addPermission', ['$event'],] }],
            onRemovePermission: [{ type: i0.HostListener, args: ['removePermission', ['$event'],] }],
            onScopeChanged: [{ type: i0.HostListener, args: ['scopeChanged', ['$event'],] }]
        };
        return ContextPermissionsBindingDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var CONTEXT_DIRECTIVES = [
        MapContextDirective,
        LayerContextDirective
    ];
    var IgoContextManagerModule = /** @class */ (function () {
        function IgoContextManagerModule() {
        }
        /**
         * @return {?}
         */
        IgoContextManagerModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: IgoContextManagerModule
                };
            };
        IgoContextManagerModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                            material.MatFormFieldModule,
                            material.MatInputModule,
                            material.MatIconModule,
                            material.MatButtonModule,
                            material.MatTooltipModule,
                            material.MatListModule,
                            material.MatCheckboxModule,
                            material.MatRadioModule,
                            i2.IgoAuthModule,
                            common$1.IgoListModule,
                            common$1.IgoKeyValueModule,
                            common$1.IgoCollapsibleModule,
                            common$1.IgoStopPropagationModule,
                            i1$1.IgoLanguageModule
                        ],
                        exports: __spread([
                            ContextListComponent,
                            ContextListBindingDirective,
                            ContextItemComponent,
                            ContextFormComponent,
                            ContextEditComponent,
                            ContextEditBindingDirective,
                            ContextPermissionsComponent,
                            ContextPermissionsBindingDirective
                        ], CONTEXT_DIRECTIVES),
                        declarations: __spread([
                            ContextListComponent,
                            ContextListBindingDirective,
                            ContextItemComponent,
                            ContextFormComponent,
                            ContextEditComponent,
                            ContextEditBindingDirective,
                            ContextPermissionsComponent,
                            ContextPermissionsBindingDirective
                        ], CONTEXT_DIRECTIVES)
                    },] }
        ];
        return IgoContextManagerModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var BookmarkDialogComponent = /** @class */ (function () {
        function BookmarkDialogComponent(dialogRef) {
            this.dialogRef = dialogRef;
        }
        BookmarkDialogComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-bookmark-dialog',
                        template: "<h1 mat-dialog-title>{{ 'igo.context.bookmarkButton.dialog.title' |\u00A0translate }}</h1>\r\n<div mat-dialog-content>\r\n  <mat-form-field>\r\n    <input matInput required autocomplete=\"off\"\r\n      [placeholder]=\"'igo.context.bookmarkButton.dialog.placeholder' |\u00A0translate\"\r\n      [(ngModel)]=\"title\">\r\n  </mat-form-field>\r\n</div>\r\n<div mat-dialog-actions>\r\n  <button mat-button color=\"primary\"\r\n         [disabled]=\"!title\"\r\n         (click)=\"dialogRef.close(title)\">\r\n    {{'igo.common.confirmDialog.confirmBtn' | translate}}\r\n  </button>\r\n  <button mat-button\r\n          (click)=\"dialogRef.close(false)\">\r\n    {{'igo.common.confirmDialog.cancelBtn' |\u00A0translate}}\r\n  </button>\r\n</div>\r\n"
                    }] }
        ];
        /** @nocollapse */
        BookmarkDialogComponent.ctorParameters = function () {
            return [
                { type: material.MatDialogRef }
            ];
        };
        return BookmarkDialogComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var BookmarkButtonComponent = /** @class */ (function () {
        function BookmarkButtonComponent(dialog, contextService, languageService, messageService) {
            this.dialog = dialog;
            this.contextService = contextService;
            this.languageService = languageService;
            this.messageService = messageService;
        }
        Object.defineProperty(BookmarkButtonComponent.prototype, "map", {
            get: /**
             * @return {?}
             */ function () {
                return this._map;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._map = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BookmarkButtonComponent.prototype, "color", {
            get: /**
             * @return {?}
             */ function () {
                return this._color;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._color = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        BookmarkButtonComponent.prototype.createContext = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.dialog
                    .open(BookmarkDialogComponent, { disableClose: false })
                    .afterClosed()
                    .subscribe(( /**
             * @param {?} title
             * @return {?}
             */function (title) {
                    if (title) {
                        /** @type {?} */
                        var context_1 = _this.contextService.getContextFromMap(_this.map);
                        context_1.title = title;
                        _this.contextService.create(context_1).subscribe(( /**
                         * @return {?}
                         */function () {
                            /** @type {?} */
                            var translate = _this.languageService.translate;
                            /** @type {?} */
                            var titleD = translate.instant('igo.context.bookmarkButton.dialog.createTitle');
                            /** @type {?} */
                            var message = translate.instant('igo.context.bookmarkButton.dialog.createMsg', {
                                value: context_1.title
                            });
                            _this.messageService.success(message, titleD);
                        }));
                    }
                }));
            };
        BookmarkButtonComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-bookmark-button',
                        template: "<div class=\"igo-bookmark-button-container\">\r\n  <button\r\n    mat-icon-button\r\n    [matTooltip]=\"'igo.context.bookmarkButton.create' | translate\"\r\n    matTooltipPosition=\"above\"\r\n    [color]=\"color\"\r\n    (click)=\"createContext()\">\r\n    <mat-icon svgIcon=\"bookmark\"></mat-icon>\r\n  </button>\r\n</div>\r\n",
                        styles: [".igo-bookmark-button-container{width:40px}.igo-bookmark-button-container button{background-color:#fff}.igo-bookmark-button-container button:hover{background-color:#efefef}:host>>>button .mat-button-ripple-round,button{border-radius:0}"]
                    }] }
        ];
        /** @nocollapse */
        BookmarkButtonComponent.ctorParameters = function () {
            return [
                { type: material.MatDialog },
                { type: ContextService },
                { type: i1$1.LanguageService },
                { type: i1$1.MessageService }
            ];
        };
        BookmarkButtonComponent.propDecorators = {
            map: [{ type: i0.Input }],
            color: [{ type: i0.Input }]
        };
        return BookmarkButtonComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PoiService = /** @class */ (function () {
        function PoiService(http, config) {
            this.http = http;
            this.config = config;
            this.baseUrl = this.config.getConfig('context.url');
        }
        /**
         * @return {?}
         */
        PoiService.prototype.get = /**
         * @return {?}
         */
            function () {
                if (!this.baseUrl) {
                    return rxjs.EMPTY;
                }
                /** @type {?} */
                var url = this.baseUrl + '/pois';
                return this.http.get(url);
            };
        /**
         * @param {?} id
         * @return {?}
         */
        PoiService.prototype.delete = /**
         * @param {?} id
         * @return {?}
         */
            function (id) {
                /** @type {?} */
                var url = this.baseUrl + '/pois/' + id;
                return this.http.delete(url);
            };
        /**
         * @param {?} context
         * @return {?}
         */
        PoiService.prototype.create = /**
         * @param {?} context
         * @return {?}
         */
            function (context) {
                /** @type {?} */
                var url = this.baseUrl + '/pois';
                return this.http.post(url, JSON.stringify(context));
            };
        PoiService.decorators = [
            { type: i0.Injectable }
        ];
        /** @nocollapse */
        PoiService.ctorParameters = function () {
            return [
                { type: i1.HttpClient },
                { type: i1$1.ConfigService }
            ];
        };
        return PoiService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PoiDialogComponent = /** @class */ (function () {
        function PoiDialogComponent(dialogRef) {
            this.dialogRef = dialogRef;
        }
        PoiDialogComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-poi-dialog',
                        template: "<h1 mat-dialog-title>{{ 'igo.context.poiButton.dialog.title' | translate }}</h1>\r\n<div mat-dialog-content>\r\n  <mat-form-field>\r\n    <input matInput required autocomplete=\"off\"\r\n      [placeholder]=\"'igo.context.poiButton.dialog.placeholder' | translate\"\r\n      [(ngModel)]=\"title\">\r\n  </mat-form-field>\r\n</div>\r\n<div mat-dialog-actions>\r\n  <button mat-button color=\"primary\"\r\n         [disabled]=\"!title\"\r\n         (click)=\"dialogRef.close(title)\">\r\n    {{'igo.common.confirmDialog.confirmBtn' | translate}}\r\n  </button>\r\n  <button mat-button\r\n          (click)=\"dialogRef.close(false)\">\r\n    {{'igo.common.confirmDialog.cancelBtn' |\u00A0translate}}\r\n  </button>\r\n</div>\r\n"
                    }] }
        ];
        /** @nocollapse */
        PoiDialogComponent.ctorParameters = function () {
            return [
                { type: material.MatDialogRef }
            ];
        };
        return PoiDialogComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PoiButtonComponent = /** @class */ (function () {
        function PoiButtonComponent(dialog, authService, poiService, messageService, languageService, confirmDialogService) {
            this.dialog = dialog;
            this.authService = authService;
            this.poiService = poiService;
            this.messageService = messageService;
            this.languageService = languageService;
            this.confirmDialogService = confirmDialogService;
        }
        Object.defineProperty(PoiButtonComponent.prototype, "map", {
            get: /**
             * @return {?}
             */ function () {
                return this._map;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._map = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PoiButtonComponent.prototype, "color", {
            get: /**
             * @return {?}
             */ function () {
                return this._color;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._color = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        PoiButtonComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.authenticate$$ = this.authService.authenticate$.subscribe(( /**
                 * @param {?} auth
                 * @return {?}
                 */function (auth) {
                    if (auth) {
                        _this.getPois();
                    }
                }));
            };
        /**
         * @return {?}
         */
        PoiButtonComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.authenticate$$.unsubscribe();
            };
        /**
         * @param {?} poi
         * @return {?}
         */
        PoiButtonComponent.prototype.deletePoi = /**
         * @param {?} poi
         * @return {?}
         */
            function (poi) {
                var _this = this;
                if (poi && poi.id) {
                    /** @type {?} */
                    var translate_1 = this.languageService.translate;
                    this.confirmDialogService
                        .open(translate_1.instant('igo.context.poiButton.dialog.confirmDelete'))
                        .subscribe(( /**
                 * @param {?} confirm
                 * @return {?}
                 */function (confirm) {
                        if (confirm) {
                            _this.poiService.delete(poi.id).subscribe(( /**
                             * @return {?}
                             */function () {
                                /** @type {?} */
                                var title = translate_1.instant('igo.context.poiButton.dialog.deleteTitle');
                                /** @type {?} */
                                var message = translate_1.instant('igo.context.poiButton.dialog.deleteMsg', {
                                    value: poi.title
                                });
                                _this.messageService.info(message, title);
                                _this.pois = _this.pois.filter(( /**
                                 * @param {?} p
                                 * @return {?}
                                 */function (p) { return p.id !== poi.id; }));
                            }), ( /**
                             * @param {?} err
                             * @return {?}
                             */function (err) {
                                err.error.title = 'DELETE Pois';
                                _this.messageService.showError(err);
                            }));
                        }
                    }));
                }
            };
        /**
         * @private
         * @return {?}
         */
        PoiButtonComponent.prototype.getPois = /**
         * @private
         * @return {?}
         */
            function () {
                var _this = this;
                this.poiService.get().subscribe(( /**
                 * @param {?} rep
                 * @return {?}
                 */function (rep) {
                    _this.pois = rep;
                }), ( /**
                 * @param {?} err
                 * @return {?}
                 */function (err) {
                    err.error.title = 'GET Pois';
                    _this.messageService.showError(err);
                }));
            };
        /**
         * @return {?}
         */
        PoiButtonComponent.prototype.createPoi = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var view = this.map.ol.getView();
                /** @type {?} */
                var proj = view.getProjection().getCode();
                /** @type {?} */
                var center = new olPoint(view.getCenter()).transform(proj, 'EPSG:4326');
                /** @type {?} */
                var poi = {
                    title: '',
                    x: center.getCoordinates()[0],
                    y: center.getCoordinates()[1],
                    zoom: view.getZoom()
                };
                this.dialog
                    .open(PoiDialogComponent, { disableClose: false })
                    .afterClosed()
                    .subscribe(( /**
             * @param {?} title
             * @return {?}
             */function (title) {
                    if (title) {
                        poi.title = title;
                        _this.poiService.create(poi).subscribe(( /**
                         * @param {?} newPoi
                         * @return {?}
                         */function (newPoi) {
                            /** @type {?} */
                            var translate = _this.languageService.translate;
                            /** @type {?} */
                            var titleD = translate.instant('igo.context.poiButton.dialog.createTitle');
                            /** @type {?} */
                            var message = translate.instant('igo.context.poiButton.dialog.createMsg', {
                                value: poi.title
                            });
                            _this.messageService.success(message, titleD);
                            poi.id = newPoi.id;
                            _this.pois.push(poi);
                        }), ( /**
                         * @param {?} err
                         * @return {?}
                         */function (err) {
                            err.error.title = 'POST Pois';
                            _this.messageService.showError(err);
                        }));
                    }
                }));
            };
        /**
         * @param {?} id
         * @return {?}
         */
        PoiButtonComponent.prototype.zoomOnPoi = /**
         * @param {?} id
         * @return {?}
         */
            function (id) {
                /** @type {?} */
                var poi = this.pois.find(( /**
                 * @param {?} p
                 * @return {?}
                 */function (p) { return p.id === id; }));
                /** @type {?} */
                var center = olproj.fromLonLat([Number(poi.x), Number(poi.y)], this.map.projection);
                this.map.ol.getView().animate({
                    center: center,
                    zoom: poi.zoom,
                    duration: 500,
                    easing: oleasing.easeOut
                });
            };
        PoiButtonComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-poi-button',
                        template: "<mat-select [placeholder]=\"'igo.context.poiButton.placeholder' |\u00A0translate\"\r\n           floatPlaceholder=\"never\">\r\n\r\n  <mat-option (click)=\"createPoi()\">\r\n    <div class=\"titlePoi\">{{ 'igo.context.poiButton.create' |\u00A0translate }}</div>\r\n    <button igoStopPropagation class=\"addPoi buttonPoi\"\r\n      mat-icon-button\r\n      color=\"primary\"\r\n      (click)=\"createPoi()\">\r\n      <mat-icon svgIcon=\"plus-circle\"></mat-icon>\r\n    </button>\r\n  </mat-option>\r\n  <mat-option *ngFor=\"let poi of pois\" [value]=\"poi.id\" (click)=\"zoomOnPoi(poi.id)\">\r\n    <div class=\"titlePoi\">{{ poi.title }}</div>\r\n    <button igoStopPropagation class=\"deletePoi buttonPoi\"\r\n      mat-icon-button\r\n      color=\"warn\"\r\n      (click)=\"deletePoi(poi)\">\r\n      <mat-icon svgIcon=\"delete\"></mat-icon>\r\n    </button>\r\n  </mat-option>\r\n</mat-select>\r\n",
                        styles: ["mat-select{width:150px;background-color:#fff;height:40px;padding-top:0}mat-select>>>.mat-select-trigger{height:40px}mat-select>>>.mat-select-placeholder,mat-select>>>.mat-select-value-text{padding:5px;top:12px;position:relative}.mat-option{text-overflow:inherit}.titlePoi{max-width:135px;overflow:hidden;text-overflow:ellipsis;float:left}.buttonPoi{float:right;margin:4px -10px 4px 0}.buttonPoi>>>.mat-icon{margin:0 8px}"]
                    }] }
        ];
        /** @nocollapse */
        PoiButtonComponent.ctorParameters = function () {
            return [
                { type: material.MatDialog },
                { type: i2.AuthService },
                { type: PoiService },
                { type: i1$1.MessageService },
                { type: i1$1.LanguageService },
                { type: common$1.ConfirmDialogService }
            ];
        };
        PoiButtonComponent.propDecorators = {
            map: [{ type: i0.Input }],
            color: [{ type: i0.Input }]
        };
        return PoiButtonComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var UserDialogComponent = /** @class */ (function () {
        function UserDialogComponent(dialogRef, auth) {
            this.dialogRef = dialogRef;
            this.auth = auth;
            /** @type {?} */
            var decodeToken = this.auth.decodeToken();
            this.user = decodeToken.user;
            this.exp = new Date(decodeToken.exp * 1000).toLocaleString();
        }
        UserDialogComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-user-dialog',
                        template: "<h1 mat-dialog-title>{{'igo.context.userButton.infoTitle' | translate}}</h1>\r\n<div mat-dialog-content>\r\n  <p>{{'igo.context.userButton.dialog.user' | translate}}: {{user.sourceId}}</p>\r\n  <p>{{'igo.context.userButton.dialog.email' | translate}}: {{user.email}}</p>\r\n  <p>{{'igo.context.userButton.dialog.expiration' | translate}}: {{exp}}</p>\r\n</div>\r\n<div mat-dialog-actions style=\"justify-content: center\">\r\n  <button mat-button color=\"primary\"\r\n         (click)=\"dialogRef.close(false)\">\r\n    OK\r\n  </button>\r\n</div>\r\n"
                    }] }
        ];
        /** @nocollapse */
        UserDialogComponent.ctorParameters = function () {
            return [
                { type: material.MatDialogRef },
                { type: i2.AuthService }
            ];
        };
        return UserDialogComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @return {?}
     */
    function userButtonSlideInOut() {
        return animations.trigger('userButtonState', [
            animations.state('collapse', animations.style({
                width: '0',
                overflow: 'hidden',
                display: 'none'
            })),
            animations.state('expand', animations.style({
                overflow: 'hidden',
                display: 'display'
            })),
            animations.transition('collapse => expand', animations.animate('200ms')),
            animations.transition('expand => collapse', animations.animate('200ms'))
        ]);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var UserButtonComponent = /** @class */ (function () {
        function UserButtonComponent(dialog, config, auth) {
            this.dialog = dialog;
            this.config = config;
            this.auth = auth;
            this.expand = false;
            this.visible = false;
            this.visible = this.config.getConfig('auth') ? true : false;
        }
        Object.defineProperty(UserButtonComponent.prototype, "map", {
            get: /**
             * @return {?}
             */ function () {
                return this._map;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._map = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserButtonComponent.prototype, "color", {
            get: /**
             * @return {?}
             */ function () {
                return this._color;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._color = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        UserButtonComponent.prototype.accountClick = /**
         * @return {?}
         */
            function () {
                if (this.auth.authenticated) {
                    this.expand = !this.expand;
                }
                else {
                    this.auth.logout();
                }
            };
        /**
         * @return {?}
         */
        UserButtonComponent.prototype.logout = /**
         * @return {?}
         */
            function () {
                this.expand = false;
                this.auth.logout();
            };
        /**
         * @return {?}
         */
        UserButtonComponent.prototype.infoUser = /**
         * @return {?}
         */
            function () {
                this.dialog.open(UserDialogComponent, { disableClose: false });
            };
        UserButtonComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-user-button',
                        template: "<div *ngIf=\"visible\" class=\"igo-user-button-container\">\r\n  <div class=\"igo-user-button-more-container\" [@userButtonState]=\"expand ? 'expand' : 'collapse'\">\r\n\r\n    <igo-poi-button [color]=\"color\" [map]=\"map\"></igo-poi-button>\r\n    <igo-bookmark-button [color]=\"color\" [map]=\"map\"></igo-bookmark-button>\r\n\r\n    <button\r\n      mat-icon-button\r\n      [matTooltip]=\"'igo.context.userButton.infoTitle' | translate\"\r\n      matTooltipPosition=\"above\"\r\n      [color]=\"color\"\r\n      (click)=\"infoUser()\">\r\n      <mat-icon svgIcon=\"information-outline\"></mat-icon>\r\n    </button>\r\n\r\n    <button\r\n      mat-icon-button\r\n      [matTooltip]=\"'igo.context.userButton.logout' |\u00A0translate\"\r\n      matTooltipPosition=\"above\"\r\n      [color]=\"color\"\r\n      (click)=\"logout()\">\r\n      <mat-icon svgIcon=\"power\"></mat-icon>\r\n    </button>\r\n\r\n  </div>\r\n\r\n  <button\r\n    mat-icon-button\r\n    [color]=\"auth.authenticated ? color : 'warn'\"\r\n    (click)=\"accountClick()\">\r\n    <mat-icon svgIcon=\"account-box\"></mat-icon>\r\n  </button>\r\n</div>\r\n",
                        animations: [userButtonSlideInOut()],
                        styles: [".igo-user-button-container button{background-color:#fff}.igo-user-button-container button:hover{background-color:#efefef}.igo-user-button-more-container{float:left;height:40px}.igo-user-button-more-container>*{margin-right:2px;float:left}@media only screen and (max-width:450px),only screen and (max-height:450px){.igo-user-button-container>button{position:absolute;bottom:0}.igo-user-button-more-container{height:80px;width:150px;position:relative;left:24px}}:host>>>button .mat-button-ripple-round,button{border-radius:0}"]
                    }] }
        ];
        /** @nocollapse */
        UserButtonComponent.ctorParameters = function () {
            return [
                { type: material.MatDialog },
                { type: i1$1.ConfigService },
                { type: i2.AuthService }
            ];
        };
        UserButtonComponent.propDecorators = {
            map: [{ type: i0.Input }],
            color: [{ type: i0.Input }]
        };
        return UserButtonComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IgoContextMapButtonModule = /** @class */ (function () {
        function IgoContextMapButtonModule() {
        }
        /**
         * @return {?}
         */
        IgoContextMapButtonModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: IgoContextMapButtonModule
                };
            };
        IgoContextMapButtonModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            i1$1.IgoLanguageModule,
                            common$1.IgoConfirmDialogModule,
                            common$1.IgoStopPropagationModule,
                            i2.IgoAuthModule,
                            forms.FormsModule,
                            material.MatIconModule,
                            material.MatButtonModule,
                            material.MatSelectModule,
                            material.MatOptionModule,
                            material.MatTooltipModule,
                            material.MatFormFieldModule,
                            material.MatDialogModule,
                            material.MatInputModule
                        ],
                        exports: [BookmarkButtonComponent, PoiButtonComponent, UserButtonComponent],
                        declarations: [
                            BookmarkButtonComponent,
                            BookmarkDialogComponent,
                            PoiButtonComponent,
                            PoiDialogComponent,
                            UserButtonComponent,
                            UserDialogComponent
                        ],
                        entryComponents: [
                            BookmarkDialogComponent,
                            PoiDialogComponent,
                            UserDialogComponent
                        ],
                        providers: [PoiService]
                    },] }
        ];
        return IgoContextMapButtonModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ShareMapService = /** @class */ (function () {
        function ShareMapService(config, contextService, messageService, routingFormService, route) {
            this.config = config;
            this.contextService = contextService;
            this.messageService = messageService;
            this.routingFormService = routingFormService;
            this.route = route;
            this.apiUrl = this.config.getConfig('context.url');
        }
        /**
         * @param {?} map
         * @param {?} formValues
         * @param {?} publicShareOption
         * @return {?}
         */
        ShareMapService.prototype.getUrl = /**
         * @param {?} map
         * @param {?} formValues
         * @param {?} publicShareOption
         * @return {?}
         */
            function (map, formValues, publicShareOption) {
                if (this.apiUrl) {
                    return this.getUrlWithApi(map, formValues);
                }
                return this.getUrlWithoutApi(map, publicShareOption);
            };
        /**
         * @param {?} map
         * @param {?} formValues
         * @return {?}
         */
        ShareMapService.prototype.getUrlWithApi = /**
         * @param {?} map
         * @param {?} formValues
         * @return {?}
         */
            function (map, formValues) {
                var _this = this;
                /** @type {?} */
                var context = this.contextService.getContextFromMap(map);
                context.scope = 'public';
                context.title = formValues.title;
                context.uri = formValues.uri;
                this.contextService.create(context).subscribe(( /**
                 * @param {?} rep
                 * @return {?}
                 */function (rep) { }), ( /**
                 * @param {?} err
                 * @return {?}
                 */function (err) {
                    err.error.title = 'Share Map';
                    _this.messageService.showError(err);
                }));
                return location.origin + location.pathname + "?context=" + formValues.uri;
            };
        /**
         * @param {?} map
         * @param {?} publicShareOption
         * @return {?}
         */
        ShareMapService.prototype.getUrlWithoutApi = /**
         * @param {?} map
         * @param {?} publicShareOption
         * @return {?}
         */
            function (map, publicShareOption) {
                var e_1, _a;
                if (!this.route ||
                    !this.route.options.visibleOnLayersKey ||
                    !this.route.options.visibleOffLayersKey ||
                    !map.getZoom()) {
                    return;
                }
                /** @type {?} */
                var llc = publicShareOption.layerlistControls.querystring;
                /** @type {?} */
                var visibleKey = this.route.options.visibleOnLayersKey;
                /** @type {?} */
                var invisibleKey = this.route.options.visibleOffLayersKey;
                /** @type {?} */
                var layers = map.layers;
                /** @type {?} */
                var routingKey = this.route.options.routingCoordKey;
                /** @type {?} */
                var stopsCoordinates = [];
                if (this.routingFormService &&
                    this.routingFormService.getStopsCoordinates() &&
                    this.routingFormService.getStopsCoordinates().length !== 0) {
                    this.routingFormService.getStopsCoordinates().forEach(( /**
                     * @param {?} coord
                     * @return {?}
                     */function (coord) {
                        stopsCoordinates.push(coord);
                    }));
                }
                /** @type {?} */
                var routingUrl = '';
                if (stopsCoordinates.length >= 2) {
                    routingUrl = routingKey + "=" + stopsCoordinates.join(';');
                }
                /** @type {?} */
                var visibleLayers = layers.filter(( /**
                 * @param {?} lay
                 * @return {?}
                 */function (lay) { return lay.visible; }));
                /** @type {?} */
                var invisibleLayers = layers.filter(( /**
                 * @param {?} lay
                 * @return {?}
                 */function (lay) { return !lay.visible; }));
                /** @type {?} */
                var layersUrl = '';
                /** @type {?} */
                var layersToLoop = [];
                if (visibleLayers.length > invisibleLayers.length) {
                    layersUrl = visibleKey + "=*&" + invisibleKey + "=";
                    layersToLoop = invisibleLayers;
                }
                else {
                    layersUrl = invisibleKey + "=*&" + visibleKey + "=";
                    layersToLoop = visibleLayers;
                }
                try {
                    for (var layersToLoop_1 = __values(layersToLoop), layersToLoop_1_1 = layersToLoop_1.next(); !layersToLoop_1_1.done; layersToLoop_1_1 = layersToLoop_1.next()) {
                        var layer = layersToLoop_1_1.value;
                        if (layer.id) {
                            layersUrl += layer.id + ',';
                        }
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (layersToLoop_1_1 && !layersToLoop_1_1.done && (_a = layersToLoop_1.return))
                            _a.call(layersToLoop_1);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
                layersUrl = layersUrl.substr(0, layersUrl.length - 1);
                /** @type {?} */
                var zoom = 'zoom=' + map.getZoom();
                /** @type {?} */
                var arrayCenter = map.getCenter('EPSG:4326') || [];
                /** @type {?} */
                var center = 'center=' + arrayCenter.toString();
                /** @type {?} */
                var context = '';
                if (this.contextService.context$.value) {
                    context = 'context=' + this.contextService.context$.value.uri;
                }
                return ("" + location.origin + location.pathname + "?" + context + "&" + zoom + "&" + center + "&" + layersUrl + "&" + llc + "&" + routingUrl).replace(/&&/g, '&');
            };
        ShareMapService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        ShareMapService.ctorParameters = function () {
            return [
                { type: i1$1.ConfigService },
                { type: ContextService },
                { type: i1$1.MessageService },
                { type: i3.RoutingFormService, decorators: [{ type: i0.Optional }] },
                { type: i1$1.RouteService, decorators: [{ type: i0.Optional }] }
            ];
        };
        /** @nocollapse */ ShareMapService.ngInjectableDef = i0.defineInjectable({ factory: function ShareMapService_Factory() { return new ShareMapService(i0.inject(i1$1.ConfigService), i0.inject(ContextService), i0.inject(i1$1.MessageService), i0.inject(i3.RoutingFormService, 8), i0.inject(i1$1.RouteService, 8)); }, token: ShareMapService, providedIn: "root" });
        return ShareMapService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ShareMapComponent = /** @class */ (function () {
        function ShareMapComponent(config, languageService, messageService, auth, shareMapService, formBuilder, layerListService) {
            this.config = config;
            this.languageService = languageService;
            this.messageService = messageService;
            this.auth = auth;
            this.shareMapService = shareMapService;
            this.formBuilder = formBuilder;
            this.layerListService = layerListService;
            this._hasShareMapButton = true;
            this._hasCopyLinkButton = false;
            this.hasApi = false;
            this.publicShareOption = {
                layerlistControls: { querystring: '' }
            };
            this.hasApi = this.config.getConfig('context.url') ? true : false;
        }
        Object.defineProperty(ShareMapComponent.prototype, "map", {
            get: /**
             * @return {?}
             */ function () {
                return this._map;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._map = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShareMapComponent.prototype, "hasShareMapButton", {
            get: /**
             * @return {?}
             */ function () {
                return this._hasShareMapButton;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._hasShareMapButton = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShareMapComponent.prototype, "hasCopyLinkButton", {
            get: /**
             * @return {?}
             */ function () {
                return this._hasCopyLinkButton;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._hasCopyLinkButton = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        ShareMapComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.auth.authenticate$.subscribe(( /**
                 * @param {?} auth
                 * @return {?}
                 */function (auth) {
                    /** @type {?} */
                    var decodeToken = _this.auth.decodeToken();
                    _this.userId = decodeToken.user ? decodeToken.user.id : undefined;
                    _this.url = undefined;
                    _this.buildForm();
                }));
            };
        /**
         * @return {?}
         */
        ShareMapComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () {
                if (!this.hasApi) {
                    this.resetUrl();
                }
            };
        /**
         * @return {?}
         */
        ShareMapComponent.prototype.hasLayerListControls = /**
         * @return {?}
         */
            function () {
                if (this.layerListService.keyword || this.layerListService.sortedAlpha ||
                    this.layerListService.onlyVisible || this.layerListService.onlyInRange) {
                    this.publicShareOption.layerlistControls.querystring = '';
                    if (this.layerListService.keyword) {
                        this.publicShareOption.layerlistControls.querystring += '&llck=' + this.layerListService.keyword;
                    }
                    if (this.layerListService.sortedAlpha) {
                        this.publicShareOption.layerlistControls.querystring += '&llca=1';
                    }
                    if (this.layerListService.onlyVisible) {
                        this.publicShareOption.layerlistControls.querystring += '&llcv=1';
                    }
                    if (this.layerListService.onlyInRange) {
                        this.publicShareOption.layerlistControls.querystring += '&llcr=1';
                    }
                    return true;
                }
                return false;
            };
        /**
         * @param {?=} values
         * @return {?}
         */
        ShareMapComponent.prototype.resetUrl = /**
         * @param {?=} values
         * @return {?}
         */
            function (values) {
                if (values === void 0) {
                    values = {};
                }
                this.hasLayerListControls();
                /** @type {?} */
                var inputs = Object.assign({}, values);
                inputs.uri = this.userId ? this.userId + "-" + values.uri : values.uri;
                this.url = this.shareMapService.getUrl(this.map, inputs, this.publicShareOption);
            };
        /**
         * @param {?} textArea
         * @return {?}
         */
        ShareMapComponent.prototype.copyTextToClipboard = /**
         * @param {?} textArea
         * @return {?}
         */
            function (textArea) {
                /** @type {?} */
                var successful = utils.Clipboard.copy(textArea);
                if (successful) {
                    /** @type {?} */
                    var translate = this.languageService.translate;
                    /** @type {?} */
                    var title = translate.instant('igo.context.shareMap.dialog.copyTitle');
                    /** @type {?} */
                    var msg = translate.instant('igo.context.shareMap.dialog.copyMsg');
                    this.messageService.success(msg, title);
                }
            };
        /**
         * @private
         * @return {?}
         */
        ShareMapComponent.prototype.buildForm = /**
         * @private
         * @return {?}
         */
            function () {
                /** @type {?} */
                var id = utils.uuid();
                /** @type {?} */
                var title = 'Partage ';
                title += this.userId ? "(" + this.userId + "-" + id + ")" : "(" + id + ")";
                this.form = this.formBuilder.group({
                    title: [title],
                    uri: [id]
                });
            };
        ShareMapComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-share-map',
                        template: "<form class=\"igo-form\" [formGroup]=\"form\"\r\n  (ngSubmit)=\"resetUrl(form.value)\">\r\n\r\n  <div *ngIf=\"hasApi\" class=\"igo-input-container\">\r\n    <mat-form-field>\r\n      <input matInput required\r\n             [placeholder]=\"'igo.context.contextManager.form.title' | translate\"\r\n             formControlName=\"title\">\r\n     <mat-error>\r\n      {{ 'igo.context.contextManager.form.titleRequired' | translate }}\r\n     </mat-error>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div *ngIf=\"hasApi\" id=\"uriInput\" class=\"igo-input-container\">\r\n    <mat-form-field>\r\n      <span *ngIf=\"userId\" class=\"prefix\">{{userId}}-</span>\r\n      <span class=\"fieldWrapper\">\r\n        <input matInput required\r\n             [readonly]=\"!userId\"\r\n             [placeholder]=\"'igo.context.contextManager.form.uri' | translate\"\r\n             formControlName=\"uri\">\r\n       </span>\r\n     <mat-error>\r\n      {{ 'igo.context.contextManager.form.uriRequired' | translate }}\r\n     </mat-error>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div *ngIf=\"hasShareMapButton\" class=\"igo-form-button-group\">\r\n    <button\r\n      mat-raised-button\r\n      type=\"submit\"\r\n      [disabled]=\"!form.valid\">\r\n      {{ 'igo.context.shareMap.button' | translate }}\r\n    </button>\r\n  </div>\r\n\r\n</form>\r\n\r\n<div *ngIf=\"url\" class=\"igo-input-container linkToShare\">\r\n  <mat-form-field>\r\n    <textarea #textArea matInput readonly rows=\"1\"\r\n      [placeholder]=\"'igo.context.shareMap.placeholderLink' | translate\"\r\n      [value]=\"url\"></textarea>\r\n    <button\r\n      mat-icon-button\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.context.shareMap.copy' | translate\"\r\n      color=\"primary\"\r\n      (click)=\"copyTextToClipboard(textArea)\">\r\n      <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n    </button>\r\n  </mat-form-field>\r\n\r\n  <div *ngIf=\"hasCopyLinkButton\" class=\"igo-form-button-group\">\r\n    <button\r\n      mat-raised-button\r\n      (click)=\"copyTextToClipboard(textArea)\">\r\n      <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n      {{ 'igo.context.shareMap.copy' | translate }}\r\n    </button>\r\n  </div>\r\n\r\n</div>\r\n",
                        styles: ["@charset \"UTF-8\";mat-form-field{width:100%}#uriInput .fieldWrapper{display:block;overflow:hidden}#uriInput .prefix{float:left}.linkToShare{padding:25px 5px 5px}.linkToShare textarea{resize:none;width:calc(100% - 60px);line-height:1.3;height:40px;overflow-y:hidden;word-wrap:normal;word-break:break-all}.linkToShare mat-form-field>button{float:right;margin:-10px 0}.igo-form{padding:20px 5px 5px}.igo-form-button-group{text-align:center;padding-top:10px}"]
                    }] }
        ];
        /** @nocollapse */
        ShareMapComponent.ctorParameters = function () {
            return [
                { type: i1$1.ConfigService },
                { type: i1$1.LanguageService },
                { type: i1$1.MessageService },
                { type: i2.AuthService },
                { type: ShareMapService },
                { type: forms.FormBuilder },
                { type: i3.LayerListService }
            ];
        };
        ShareMapComponent.propDecorators = {
            map: [{ type: i0.Input }],
            hasShareMapButton: [{ type: i0.Input }],
            hasCopyLinkButton: [{ type: i0.Input }]
        };
        return ShareMapComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ShareMapBindingDirective = /** @class */ (function () {
        function ShareMapBindingDirective(component, layerListService, route) {
            this.layerListService = layerListService;
            this.route = route;
            this.component = component;
        }
        /**
         * @return {?}
         */
        ShareMapBindingDirective.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.initRoutes();
            };
        /**
         * @private
         * @return {?}
         */
        ShareMapBindingDirective.prototype.initRoutes = /**
         * @private
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.route &&
                    (this.route.options.llcKKey || this.route.options.llcAKey ||
                        this.route.options.llcVKey || this.route.options.llcVKey)) {
                    this.route.queryParams.subscribe(( /**
                     * @param {?} params
                     * @return {?}
                     */function (params) {
                        /** @type {?} */
                        var keywordFromUrl = params[( /** @type {?} */(_this.route.options.llcKKey))];
                        /** @type {?} */
                        var sortedAplhaFromUrl = params[( /** @type {?} */(_this.route.options.llcAKey))];
                        /** @type {?} */
                        var onlyVisibleFromUrl = params[( /** @type {?} */(_this.route.options.llcVKey))];
                        /** @type {?} */
                        var onlyInRangeFromUrl = params[( /** @type {?} */(_this.route.options.llcRKey))];
                        if (keywordFromUrl && !_this.layerListService.keywordInitialized) {
                            _this.layerListService.keyword = keywordFromUrl;
                            _this.layerListService.keywordInitialized = true;
                        }
                        if (sortedAplhaFromUrl && !_this.layerListService.sortedAlphaInitialized) {
                            _this.layerListService.sortedAlpha = sortedAplhaFromUrl === '1' ? true : false;
                            _this.layerListService.sortedAlphaInitialized = true;
                        }
                        if (onlyVisibleFromUrl && !_this.layerListService.onlyVisibleInitialized) {
                            _this.layerListService.onlyVisible = onlyVisibleFromUrl === '1' ? true : false;
                            _this.layerListService.onlyVisibleInitialized = true;
                        }
                        if (onlyInRangeFromUrl && !_this.layerListService.onlyInRangeInitialized) {
                            _this.layerListService.onlyInRange = onlyInRangeFromUrl === '1' ? true : false;
                            _this.layerListService.onlyInRangeInitialized = true;
                        }
                        if (!_this.component.hasApi) {
                            _this.component.resetUrl();
                        }
                    }));
                }
            };
        ShareMapBindingDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[igoShareMapBinding]'
                    },] }
        ];
        /** @nocollapse */
        ShareMapBindingDirective.ctorParameters = function () {
            return [
                { type: ShareMapComponent, decorators: [{ type: i0.Self }] },
                { type: i3.LayerListService },
                { type: i1$1.RouteService, decorators: [{ type: i0.Optional }] }
            ];
        };
        return ShareMapBindingDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IgoShareMapModule = /** @class */ (function () {
        function IgoShareMapModule() {
        }
        /**
         * @return {?}
         */
        IgoShareMapModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: IgoShareMapModule
                };
            };
        IgoShareMapModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                            material.MatIconModule,
                            material.MatTooltipModule,
                            material.MatFormFieldModule,
                            material.MatInputModule,
                            material.MatButtonModule,
                            i1$1.IgoLanguageModule
                        ],
                        exports: [ShareMapComponent, ShareMapBindingDirective],
                        declarations: [ShareMapComponent, ShareMapBindingDirective]
                    },] }
        ];
        return IgoShareMapModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SidenavComponent = /** @class */ (function () {
        function SidenavComponent(titleService) {
            this.titleService = titleService;
            this.format = new olFormatGeoJSON();
            this._title = this.titleService.getTitle();
            this.topPanelState = 'initial';
        }
        Object.defineProperty(SidenavComponent.prototype, "map", {
            get: /**
             * @return {?}
             */ function () {
                return this._map;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._map = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SidenavComponent.prototype, "opened", {
            get: /**
             * @return {?}
             */ function () {
                return this._opened;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._opened = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SidenavComponent.prototype, "feature", {
            get: /**
             * @return {?}
             */ function () {
                return this._feature;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._feature = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SidenavComponent.prototype, "tool", {
            get: /**
             * @return {?}
             */ function () {
                return this._tool;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._tool = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SidenavComponent.prototype, "media", {
            get: /**
             * @return {?}
             */ function () {
                return this._media;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._media = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SidenavComponent.prototype, "title", {
            get: /**
             * @return {?}
             */ function () {
                return this._title;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                if (value) {
                    this._title = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SidenavComponent.prototype, "featureTitle", {
            get: /**
             * @return {?}
             */ function () {
                return this.feature ? common$1.getEntityTitle(this.feature) : undefined;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        SidenavComponent.prototype.zoomToFeatureExtent = /**
         * @return {?}
         */
            function () {
                if (this.feature.geometry) {
                    /** @type {?} */
                    var olFeature = this.format.readFeature(this.feature, {
                        dataProjection: this.feature.projection,
                        featureProjection: this.map.projection
                    });
                    i3.moveToOlFeatures(this.map, [olFeature], i3.FeatureMotion.Zoom);
                }
            };
        /**
         * @return {?}
         */
        SidenavComponent.prototype.toggleTopPanel = /**
         * @return {?}
         */
            function () {
                if (this.topPanelState === 'initial') {
                    this.topPanelState = 'expanded';
                }
                else {
                    this.topPanelState = 'initial';
                }
            };
        SidenavComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-sidenav',
                        template: "<mat-sidenav\r\n  #sidenav\r\n  igoSidenavShim\r\n  mode=\"side\"\r\n  [opened]=\"opened\">\r\n\r\n  <div class=\"igo-sidenav-content\">\r\n\r\n    <igo-flexible\r\n      #topPanel\r\n      initial=\"50%\" initialMobile=\"100%\"\r\n      expanded=\"calc(100% - 58px)\"\r\n      [state]=\"topPanelState\">\r\n\r\n      <div class=\"igo-content\">\r\n        <igo-panel [title]=\"tool ? (tool.title | translate) : title\">\r\n          <button\r\n            mat-icon-button\r\n            panelLeftButton\r\n            tooltip-position=\"below\"\r\n            matTooltipShowDelay=\"500\"\r\n            [matTooltip]=\"'igo.context.sidenav.goBack' | translate\"\r\n            *ngIf=\"tool\">\r\n            <mat-icon svgIcon=\"arrow-back\"></mat-icon>\r\n          </button>\r\n\r\n          <button\r\n            mat-icon-button\r\n            panelRightButton\r\n            tooltip-position=\"below\"\r\n            matTooltipShowDelay=\"500\"\r\n            [matTooltip]=\"'igo.context.sidenav.mainMenu' | translate\"\r\n            *ngIf=\"tool\">\r\n            <mat-icon svgIcon=\"menu\"></mat-icon>\r\n          </button>\r\n\r\n          <!--igo-toolbar\r\n            igoToolContext igoToolbarBinding\r\n            [withTitle]=\"tool ? false : true\">\r\n          </igo-toolbar>\r\n\r\n          <div class=\"igo-toolbox-container\" [ngClass]=\"{'shown': tool ? true : false}\">\r\n            <igo-toolbox [animate]=\"true\"></igo-toolbox>\r\n          </div-->\r\n        </igo-panel>\r\n      </div>\r\n\r\n      <div igoFlexibleFill class=\"igo-content\">\r\n        <igo-panel\r\n          [title]=\"featureTitle\"\r\n          *ngIf=\"feature && media !== 'mobile'\">\r\n\r\n          <button\r\n            mat-icon-button\r\n            panelLeftButton\r\n            class=\"igo-icon-button\"\r\n            (click)=\"toggleTopPanel()\">\r\n            <mat-icon [svgIcon]=\"['collapsed', 'initial'].indexOf(topPanel.state) >= 0 ? 'arrow_downward' : 'arrow_upward'\"></mat-icon>\r\n          </button>\r\n\r\n          <button\r\n            mat-icon-button\r\n            panelRightButton\r\n            class=\"igo-icon-button\"\r\n            (click)=\"zoomToFeatureExtent()\"\r\n            *ngIf=\"feature.geometry\">\r\n            <mat-icon svgIcon=\"zoom-in\"></mat-icon>\r\n          </button>\r\n\r\n          <igo-feature-details\r\n            [feature]=\"feature\"\r\n            *ngIf=\"['collapsed', 'initial'].indexOf(topPanel.state) >= 0\">\r\n          </igo-feature-details>\r\n        </igo-panel>\r\n      </div>\r\n\r\n    </igo-flexible>\r\n\r\n  </div>\r\n</mat-sidenav>\r\n",
                        styles: [".igo-sidenav-content .igo-flexible-fill .igo-container,:host ::ng-deep .igo-flexible-fill .igo-container{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;border-top:1px solid rgba(0,0,0,.2)}igo-toolbar:not(.with-title),mat-sidenav{-o-box-shadow:2px 0 2px 0 #ddd;box-shadow:2px 0 2px 0 #ddd}:host{background-color:#fff}:host ::ng-deep mat-sidenav{z-index:3!important}mat-sidenav{width:400px}@media only screen and (max-width:450px),only screen and (max-height:450px){mat-sidenav{width:calc(100% - 40px - 5px)}}.igo-sidenav-content{margin-top:50px;height:calc(100% - 50px)}igo-toolbar{position:absolute;top:51px;left:0;bottom:0}igo-toolbar.with-title{right:0;overflow:auto}igo-toolbar:not(.with-title){overflow:hidden}igo-toolbar ::ng-deep igo-list{overflow:inherit}.igo-toolbox-container{position:absolute;top:51px;bottom:0;right:0;overflow:auto}.igo-toolbox-container.shown{left:48px}igo-feature-details ::ng-deep table{width:100%}"]
                    }] }
        ];
        /** @nocollapse */
        SidenavComponent.ctorParameters = function () {
            return [
                { type: platformBrowser.Title }
            ];
        };
        SidenavComponent.propDecorators = {
            map: [{ type: i0.Input }],
            opened: [{ type: i0.Input }],
            feature: [{ type: i0.Input }],
            tool: [{ type: i0.Input }],
            media: [{ type: i0.Input }],
            title: [{ type: i0.Input }]
        };
        return SidenavComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IgoSidenavModule = /** @class */ (function () {
        function IgoSidenavModule() {
        }
        /**
         * @return {?}
         */
        IgoSidenavModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: IgoSidenavModule
                };
            };
        IgoSidenavModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            material.MatIconModule,
                            material.MatButtonModule,
                            material.MatSidenavModule,
                            material.MatTooltipModule,
                            i1$1.IgoLanguageModule,
                            common$1.IgoPanelModule,
                            common$1.IgoFlexibleModule,
                            i3.IgoFeatureModule,
                            IgoContextManagerModule
                        ],
                        exports: [SidenavComponent],
                        declarations: [SidenavComponent]
                    },] }
        ];
        return IgoSidenavModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IgoContextModule = /** @class */ (function () {
        function IgoContextModule() {
        }
        /**
         * @return {?}
         */
        IgoContextModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: IgoContextModule,
                    providers: []
                };
            };
        IgoContextModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [],
                        declarations: [],
                        exports: [
                            IgoContextManagerModule,
                            IgoContextMapButtonModule,
                            IgoShareMapModule,
                            IgoSidenavModule
                        ]
                    },] }
        ];
        return IgoContextModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.IgoContextModule = IgoContextModule;
    exports.IgoContextManagerModule = IgoContextManagerModule;
    exports.IgoContextMapButtonModule = IgoContextMapButtonModule;
    exports.IgoShareMapModule = IgoShareMapModule;
    exports.IgoSidenavModule = IgoSidenavModule;
    exports.ContextService = ContextService;
    exports.TypePermission = TypePermission;
    exports.Scope = Scope;
    exports.LayerContextDirective = LayerContextDirective;
    exports.MapContextDirective = MapContextDirective;
    exports.ContextListComponent = ContextListComponent;
    exports.ContextListBindingDirective = ContextListBindingDirective;
    exports.ContextItemComponent = ContextItemComponent;
    exports.ContextFormComponent = ContextFormComponent;
    exports.ContextEditComponent = ContextEditComponent;
    exports.ContextEditBindingDirective = ContextEditBindingDirective;
    exports.ContextPermissionsComponent = ContextPermissionsComponent;
    exports.ContextPermissionsBindingDirective = ContextPermissionsBindingDirective;
    exports.BookmarkButtonComponent = BookmarkButtonComponent;
    exports.BookmarkDialogComponent = BookmarkDialogComponent;
    exports.PoiButtonComponent = PoiButtonComponent;
    exports.PoiDialogComponent = PoiDialogComponent;
    exports.PoiService = PoiService;
    exports.UserButtonComponent = UserButtonComponent;
    exports.UserDialogComponent = UserDialogComponent;
    exports.ShareMapService = ShareMapService;
    exports.ShareMapComponent = ShareMapComponent;
    exports.ShareMapBindingDirective = ShareMapBindingDirective;
    exports.SidenavComponent = SidenavComponent;
    exports.ɵg = ContextEditBindingDirective;
    exports.ɵf = ContextEditComponent;
    exports.ɵe = ContextFormComponent;
    exports.ɵd = ContextItemComponent;
    exports.ɵb = ContextListBindingDirective;
    exports.ɵa = ContextListComponent;
    exports.ɵi = ContextPermissionsBindingDirective;
    exports.ɵh = ContextPermissionsComponent;
    exports.ɵc = ContextService;
    exports.ɵk = LayerContextDirective;
    exports.ɵj = MapContextDirective;
    exports.ɵl = BookmarkButtonComponent;
    exports.ɵq = BookmarkDialogComponent;
    exports.ɵm = PoiButtonComponent;
    exports.ɵr = PoiDialogComponent;
    exports.ɵn = PoiService;
    exports.ɵp = userButtonSlideInOut;
    exports.ɵo = UserButtonComponent;
    exports.ɵs = UserDialogComponent;
    exports.ɵv = ShareMapBindingDirective;
    exports.ɵt = ShareMapComponent;
    exports.ɵu = ShareMapService;
    exports.ɵw = SidenavComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=igo2-context.umd.js.map