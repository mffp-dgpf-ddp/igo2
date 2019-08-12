/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map, tap, catchError, debounceTime } from 'rxjs/operators';
import olPoint from 'ol/geom/Point';
import { uuid } from '@igo2/utils';
import { ConfigService, RouteService, LanguageService } from '@igo2/core';
import { AuthService } from '@igo2/auth';
import { TypePermission } from './context.enum';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@igo2/auth";
import * as i3 from "@igo2/core";
var ContextService = /** @class */ (function () {
    function ContextService(http, authService, languageService, config, route) {
        var _this = this;
        this.http = http;
        this.authService = authService;
        this.languageService = languageService;
        this.config = config;
        this.route = route;
        this.context$ = new BehaviorSubject(undefined);
        this.contexts$ = new BehaviorSubject({ ours: [] });
        this.defaultContextId$ = new BehaviorSubject(undefined);
        this.editedContext$ = new BehaviorSubject(undefined);
        this.mapViewFromRoute = {};
        this.options = Object.assign({
            basePath: 'contexts',
            contextListFile: '_contexts.json',
            defaultContextUri: '_default'
        }, this.config.getConfig('context'));
        this.baseUrl = this.options.url;
        this.readParamsFromRoute();
        this.authService.authenticate$.subscribe((/**
         * @param {?} authenticated
         * @return {?}
         */
        function (authenticated) {
            if (authenticated === null) {
                _this.loadDefaultContext();
                return;
            }
            /** @type {?} */
            var contexts$$ = _this.contexts$.subscribe((/**
             * @param {?} contexts
             * @return {?}
             */
            function (contexts) {
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
            .pipe(catchError((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return _this.handleError(res, id); })));
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
        return this.http.get(url).pipe(tap((/**
         * @param {?} context
         * @return {?}
         */
        function (context) {
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
        return this.http.delete(url).pipe(tap((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            /** @type {?} */
            var contexts = { ours: [] };
            Object.keys(_this.contexts$.value).forEach((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                return (contexts[key] = _this.contexts$.value[key].filter((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return c.id !== id; })));
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
        return this.http.post(url, JSON.stringify(context)).pipe(map((/**
         * @param {?} contextCreated
         * @return {?}
         */
        function (contextCreated) {
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
        if (properties === void 0) { properties = {}; }
        /** @type {?} */
        var url = this.baseUrl + '/contexts/' + id + '/clone';
        return this.http.post(url, JSON.stringify(properties)).pipe(map((/**
         * @param {?} contextCloned
         * @return {?}
         */
        function (contextCloned) {
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
        return this.http.get(url).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
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
        return this.http.get(url).pipe(catchError((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
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
        request.subscribe((/**
         * @param {?} contexts
         * @return {?}
         */
        function (contexts) {
            /** @type {?} */
            var publicsContexts = _this.contexts$.value.public;
            if (publicsContexts) {
                /** @type {?} */
                var contextUri = publicsContexts.find((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return c.uri === _this.options.defaultContextUri; }));
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
        var loadFct = (/**
         * @param {?=} direct
         * @return {?}
         */
        function (direct) {
            if (direct === void 0) { direct = false; }
            if (!direct && _this.baseUrl && _this.authService.authenticated) {
                _this.getDefault().subscribe((/**
                 * @param {?} _context
                 * @return {?}
                 */
                function (_context) {
                    _this.options.defaultContextUri = _context.uri;
                    _this.addContextToList(_context);
                    _this.setContext(_context);
                }), (/**
                 * @return {?}
                 */
                function () {
                    _this.defaultContextId$.next(undefined);
                    _this.loadContext(_this.options.defaultContextUri);
                }));
            }
            else {
                _this.loadContext(_this.options.defaultContextUri);
            }
        });
        if (this.route && this.route.options.contextKey) {
            this.route.queryParams.pipe(debounceTime(100)).subscribe((/**
             * @param {?} params
             * @return {?}
             */
            function (params) {
                /** @type {?} */
                var contextParam = params[(/** @type {?} */ (_this.route.options.contextKey))];
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
        var contexts$$ = this.getContextByUri(uri).subscribe((/**
         * @param {?} _context
         * @return {?}
         */
        function (_context) {
            contexts$$.unsubscribe();
            _this.addContextToList(_context);
            _this.setContext(_context);
        }), (/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
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
        this.getContextByUri(uri).subscribe((/**
         * @param {?} _context
         * @return {?}
         */
        function (_context) {
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
            uri: uuid(),
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
            for (var layers_1 = tslib_1.__values(layers), layers_1_1 = layers_1.next(); !layers_1_1.done; layers_1_1 = layers_1.next()) {
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
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (layers_1_1 && !layers_1_1.done && (_a = layers_1.return)) _a.call(layers_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        context.tools = this.tools.map((/**
         * @param {?} tool
         * @return {?}
         */
        function (tool) { return String(tool.id); }));
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
                for (var _b = tslib_1.__values(Object.keys(this.contexts$.value)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    contextToLoad = this.contexts$.value[key].find((/**
                     * @param {?} c
                     * @return {?}
                     */
                    function (c) {
                        return c.uri === uri;
                    }));
                    if (contextToLoad) {
                        break;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
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
        this.route.queryParams.subscribe((/**
         * @param {?} params
         * @return {?}
         */
        function (params) {
            /** @type {?} */
            var centerKey = _this.route.options.centerKey;
            if (centerKey && params[(/** @type {?} */ (centerKey))]) {
                /** @type {?} */
                var centerParams = params[(/** @type {?} */ (centerKey))];
                _this.mapViewFromRoute.center = centerParams.split(',').map(Number);
                _this.mapViewFromRoute.geolocate = false;
            }
            /** @type {?} */
            var projectionKey = _this.route.options.projectionKey;
            if (projectionKey && params[(/** @type {?} */ (projectionKey))]) {
                /** @type {?} */
                var projectionParam = params[(/** @type {?} */ (projectionKey))];
                _this.mapViewFromRoute.projection = projectionParam;
            }
            /** @type {?} */
            var zoomKey = _this.route.options.zoomKey;
            if (zoomKey && params[(/** @type {?} */ (zoomKey))]) {
                /** @type {?} */
                var zoomParam = params[(/** @type {?} */ (zoomKey))];
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
        var context = this.contexts$.value.ours.find((/**
         * @param {?} obj
         * @return {?}
         */
        function (obj) { return obj.uri === uri; }));
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
        if (keepCurrentContext === void 0) { keepCurrentContext = false; }
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
            this.getDefault().subscribe((/**
             * @return {?}
             */
            function () { }));
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
            for (var _b = tslib_1.__values(Object.keys(contexts)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                /** @type {?} */
                var value = contexts[key];
                found = value.find((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return c.id === context.id; }));
                if (found) {
                    break;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return found;
    };
    ContextService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ContextService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: AuthService },
        { type: LanguageService },
        { type: ConfigService },
        { type: RouteService, decorators: [{ type: Optional }] }
    ]; };
    /** @nocollapse */ ContextService.ngInjectableDef = i0.defineInjectable({ factory: function ContextService_Factory() { return new ContextService(i0.inject(i1.HttpClient), i0.inject(i2.AuthService), i0.inject(i3.LanguageService), i0.inject(i3.ConfigService), i0.inject(i3.RouteService, 8)); }, token: ContextService, providedIn: "root" });
    return ContextService;
}());
export { ContextService };
if (false) {
    /** @type {?} */
    ContextService.prototype.context$;
    /** @type {?} */
    ContextService.prototype.contexts$;
    /** @type {?} */
    ContextService.prototype.defaultContextId$;
    /** @type {?} */
    ContextService.prototype.editedContext$;
    /**
     * @type {?}
     * @private
     */
    ContextService.prototype.mapViewFromRoute;
    /**
     * @type {?}
     * @private
     */
    ContextService.prototype.options;
    /**
     * @type {?}
     * @private
     */
    ContextService.prototype.baseUrl;
    /**
     * @type {?}
     * @private
     */
    ContextService.prototype.tools;
    /**
     * @type {?}
     * @private
     */
    ContextService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    ContextService.prototype.authService;
    /**
     * @type {?}
     * @private
     */
    ContextService.prototype.languageService;
    /**
     * @type {?}
     * @private
     */
    ContextService.prototype.config;
    /**
     * @type {?}
     * @private
     */
    ContextService.prototype.route;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29udGV4dC8iLCJzb3VyY2VzIjpbImxpYi9jb250ZXh0LW1hbmFnZXIvc2hhcmVkL2NvbnRleHQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVwRSxPQUFPLE9BQU8sTUFBTSxlQUFlLENBQUM7QUFHcEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNuQyxPQUFPLEVBQ0wsYUFBYSxFQUNiLFlBQVksRUFFWixlQUFlLEVBQ2hCLE1BQU0sWUFBWSxDQUFDO0FBRXBCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFHekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7OztBQVVoRDtJQWdCRSx3QkFDVSxJQUFnQixFQUNoQixXQUF3QixFQUN4QixlQUFnQyxFQUNoQyxNQUFxQixFQUNULEtBQW1CO1FBTHpDLGlCQWlDQztRQWhDUyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ1QsVUFBSyxHQUFMLEtBQUssQ0FBYztRQWpCbEMsYUFBUSxHQUFHLElBQUksZUFBZSxDQUFrQixTQUFTLENBQUMsQ0FBQztRQUMzRCxjQUFTLEdBQUcsSUFBSSxlQUFlLENBQWUsRUFBRSxJQUFJLEVB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QUM7Z0JBQzdDLElBQUksS0FBSyxFQUFFO29CQUNULE1BQU07aUJBQ1A7YUFDRjs7Ozs7Ozs7O1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOztnQkExZEYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkEvQlEsVUFBVTtnQkFnQlYsV0FBVztnQkFIbEIsZUFBZTtnQkFIZixhQUFhO2dCQUNiLFlBQVksdUJBdUNULFFBQVE7Ozt5QkFuRGI7Q0F5ZkMsQUEzZEQsSUEyZEM7U0F4ZFksY0FBYzs7O0lBQ3pCLGtDQUFrRTs7SUFDbEUsbUNBQW1FOztJQUNuRSwyQ0FBa0U7O0lBQ2xFLHdDQUF3RTs7Ozs7SUFDeEUsMENBQThDOzs7OztJQUM5QyxpQ0FBdUM7Ozs7O0lBQ3ZDLGlDQUF3Qjs7Ozs7SUFJeEIsK0JBQXNCOzs7OztJQUdwQiw4QkFBd0I7Ozs7O0lBQ3hCLHFDQUFnQzs7Ozs7SUFDaEMseUNBQXdDOzs7OztJQUN4QyxnQ0FBNkI7Ozs7O0lBQzdCLCtCQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwLCB0YXAsIGNhdGNoRXJyb3IsIGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCBvbFBvaW50IGZyb20gJ29sL2dlb20vUG9pbnQnO1xyXG5cclxuaW1wb3J0IHsgVG9vbCB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcbmltcG9ydCB7IHV1aWQgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcbmltcG9ydCB7XHJcbiAgQ29uZmlnU2VydmljZSxcclxuICBSb3V0ZVNlcnZpY2UsXHJcbiAgTWVzc2FnZSxcclxuICBMYW5ndWFnZVNlcnZpY2VcclxufSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvYXV0aCc7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJ0BpZ28yL2dlbyc7XHJcblxyXG5pbXBvcnQgeyBUeXBlUGVybWlzc2lvbiB9IGZyb20gJy4vY29udGV4dC5lbnVtJztcclxuaW1wb3J0IHtcclxuICBDb250ZXh0c0xpc3QsXHJcbiAgQ29udGV4dFNlcnZpY2VPcHRpb25zLFxyXG4gIENvbnRleHQsXHJcbiAgRGV0YWlsZWRDb250ZXh0LFxyXG4gIENvbnRleHRNYXBWaWV3LFxyXG4gIENvbnRleHRQZXJtaXNzaW9uXHJcbn0gZnJvbSAnLi9jb250ZXh0LmludGVyZmFjZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb250ZXh0U2VydmljZSB7XHJcbiAgcHVibGljIGNvbnRleHQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEZXRhaWxlZENvbnRleHQ+KHVuZGVmaW5lZCk7XHJcbiAgcHVibGljIGNvbnRleHRzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Q29udGV4dHNMaXN0Pih7IG91cnM6IFtdIH0pO1xyXG4gIHB1YmxpYyBkZWZhdWx0Q29udGV4dElkJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPih1bmRlZmluZWQpO1xyXG4gIHB1YmxpYyBlZGl0ZWRDb250ZXh0JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RGV0YWlsZWRDb250ZXh0Pih1bmRlZmluZWQpO1xyXG4gIHByaXZhdGUgbWFwVmlld0Zyb21Sb3V0ZTogQ29udGV4dE1hcFZpZXcgPSB7fTtcclxuICBwcml2YXRlIG9wdGlvbnM6IENvbnRleHRTZXJ2aWNlT3B0aW9ucztcclxuICBwcml2YXRlIGJhc2VVcmw6IHN0cmluZztcclxuXHJcbiAgLy8gVW50aWwgdGhlIENvbnRleHRTZXJ2aWNlIGlzIGNvbXBsZXRlbHkgcmVmYWN0b3JlZCwgdGhpcyBpcyBuZWVkZWRcclxuICAvLyB0byB0cmFjayB0aGUgY3VycmVudCB0b29sc1xyXG4gIHByaXZhdGUgdG9vbHM6IFRvb2xbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSxcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcm91dGU6IFJvdXRlU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbihcclxuICAgICAge1xyXG4gICAgICAgIGJhc2VQYXRoOiAnY29udGV4dHMnLFxyXG4gICAgICAgIGNvbnRleHRMaXN0RmlsZTogJ19jb250ZXh0cy5qc29uJyxcclxuICAgICAgICBkZWZhdWx0Q29udGV4dFVyaTogJ19kZWZhdWx0J1xyXG4gICAgICB9LFxyXG4gICAgICB0aGlzLmNvbmZpZy5nZXRDb25maWcoJ2NvbnRleHQnKVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLmJhc2VVcmwgPSB0aGlzLm9wdGlvbnMudXJsO1xyXG5cclxuICAgIHRoaXMucmVhZFBhcmFtc0Zyb21Sb3V0ZSgpO1xyXG5cclxuICAgIHRoaXMuYXV0aFNlcnZpY2UuYXV0aGVudGljYXRlJC5zdWJzY3JpYmUoYXV0aGVudGljYXRlZCA9PiB7XHJcbiAgICAgIGlmIChhdXRoZW50aWNhdGVkID09PSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkRGVmYXVsdENvbnRleHQoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgY29udGV4dHMkJCA9IHRoaXMuY29udGV4dHMkLnN1YnNjcmliZShjb250ZXh0cyA9PiB7XHJcbiAgICAgICAgaWYgKGNvbnRleHRzJCQpIHtcclxuICAgICAgICAgIGNvbnRleHRzJCQudW5zdWJzY3JpYmUoKTtcclxuICAgICAgICAgIHRoaXMuaGFuZGxlQ29udGV4dHNDaGFuZ2UoY29udGV4dHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMubG9hZENvbnRleHRzKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldCgpOiBPYnNlcnZhYmxlPENvbnRleHRzTGlzdD4ge1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5iYXNlVXJsICsgJy9jb250ZXh0cyc7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxDb250ZXh0c0xpc3Q+KHVybCk7XHJcbiAgfVxyXG5cclxuICBnZXRCeUlkKGlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPENvbnRleHQ+IHtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuYmFzZVVybCArICcvY29udGV4dHMvJyArIGlkO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8Q29udGV4dD4odXJsKTtcclxuICB9XHJcblxyXG4gIGdldERldGFpbHMoaWQ6IHN0cmluZyk6IE9ic2VydmFibGU8RGV0YWlsZWRDb250ZXh0PiB7XHJcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmJhc2VVcmx9L2NvbnRleHRzLyR7aWR9L2RldGFpbHNgO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuZ2V0PERldGFpbGVkQ29udGV4dD4odXJsKVxyXG4gICAgICAucGlwZShjYXRjaEVycm9yKHJlcyA9PiB0aGlzLmhhbmRsZUVycm9yKHJlcywgaWQpKSk7XHJcbiAgfVxyXG5cclxuICBnZXREZWZhdWx0KCk6IE9ic2VydmFibGU8RGV0YWlsZWRDb250ZXh0PiB7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnL2NvbnRleHRzL2RlZmF1bHQnO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8RGV0YWlsZWRDb250ZXh0Pih1cmwpLnBpcGUoXHJcbiAgICAgIHRhcChjb250ZXh0ID0+IHtcclxuICAgICAgICB0aGlzLmRlZmF1bHRDb250ZXh0SWQkLm5leHQoY29udGV4dC5pZCk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgc2V0RGVmYXVsdChpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuYmFzZVVybCArICcvY29udGV4dHMvZGVmYXVsdCc7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCB7IGRlZmF1bHRDb250ZXh0SWQ6IGlkIH0pO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlKGlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuYmFzZVVybCArICcvY29udGV4dHMvJyArIGlkO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGU8dm9pZD4odXJsKS5waXBlKFxyXG4gICAgICB0YXAocmVzID0+IHtcclxuICAgICAgICBjb25zdCBjb250ZXh0czogQ29udGV4dHNMaXN0ID0geyBvdXJzOiBbXSB9O1xyXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuY29udGV4dHMkLnZhbHVlKS5mb3JFYWNoKFxyXG4gICAgICAgICAga2V5ID0+XHJcbiAgICAgICAgICAgIChjb250ZXh0c1trZXldID0gdGhpcy5jb250ZXh0cyQudmFsdWVba2V5XS5maWx0ZXIoYyA9PiBjLmlkICE9PSBpZCkpXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLmNvbnRleHRzJC5uZXh0KGNvbnRleHRzKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGUoY29udGV4dDogRGV0YWlsZWRDb250ZXh0KTogT2JzZXJ2YWJsZTxDb250ZXh0PiB7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnL2NvbnRleHRzJztcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxDb250ZXh0Pih1cmwsIEpTT04uc3RyaW5naWZ5KGNvbnRleHQpKS5waXBlKFxyXG4gICAgICBtYXAoY29udGV4dENyZWF0ZWQgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmF1dGhTZXJ2aWNlLmF1dGhlbnRpY2F0ZWQpIHtcclxuICAgICAgICAgIGNvbnRleHRDcmVhdGVkLnBlcm1pc3Npb24gPSBUeXBlUGVybWlzc2lvbltUeXBlUGVybWlzc2lvbi53cml0ZV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnRleHRDcmVhdGVkLnBlcm1pc3Npb24gPSBUeXBlUGVybWlzc2lvbltUeXBlUGVybWlzc2lvbi5yZWFkXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb250ZXh0cyQudmFsdWUub3Vycy5wdXNoKGNvbnRleHRDcmVhdGVkKTtcclxuICAgICAgICB0aGlzLmNvbnRleHRzJC5uZXh0KHRoaXMuY29udGV4dHMkLnZhbHVlKTtcclxuICAgICAgICByZXR1cm4gY29udGV4dENyZWF0ZWQ7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgY2xvbmUoaWQ6IHN0cmluZywgcHJvcGVydGllcyA9IHt9KTogT2JzZXJ2YWJsZTxDb250ZXh0PiB7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnL2NvbnRleHRzLycgKyBpZCArICcvY2xvbmUnO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PENvbnRleHQ+KHVybCwgSlNPTi5zdHJpbmdpZnkocHJvcGVydGllcykpLnBpcGUoXHJcbiAgICAgIG1hcChjb250ZXh0Q2xvbmVkID0+IHtcclxuICAgICAgICBjb250ZXh0Q2xvbmVkLnBlcm1pc3Npb24gPSBUeXBlUGVybWlzc2lvbltUeXBlUGVybWlzc2lvbi53cml0ZV07XHJcbiAgICAgICAgdGhpcy5jb250ZXh0cyQudmFsdWUub3Vycy5wdXNoKGNvbnRleHRDbG9uZWQpO1xyXG4gICAgICAgIHRoaXMuY29udGV4dHMkLm5leHQodGhpcy5jb250ZXh0cyQudmFsdWUpO1xyXG4gICAgICAgIHJldHVybiBjb250ZXh0Q2xvbmVkO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZShpZDogc3RyaW5nLCBjb250ZXh0OiBDb250ZXh0KTogT2JzZXJ2YWJsZTxDb250ZXh0PiB7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnL2NvbnRleHRzLycgKyBpZDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucGF0Y2g8Q29udGV4dD4odXJsLCBKU09OLnN0cmluZ2lmeShjb250ZXh0KSk7XHJcbiAgfVxyXG5cclxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICBhZGRUb29sQXNzb2NpYXRpb24oY29udGV4dElkOiBzdHJpbmcsIHRvb2xJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTx2b2lkPiB7XHJcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmJhc2VVcmx9L2NvbnRleHRzLyR7Y29udGV4dElkfS90b29sc2A7XHJcbiAgICBjb25zdCBhc3NvY2lhdGlvbiA9IHtcclxuICAgICAgdG9vbElkXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PHZvaWQ+KHVybCwgSlNPTi5zdHJpbmdpZnkoYXNzb2NpYXRpb24pKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZVRvb2xBc3NvY2lhdGlvbihjb250ZXh0SWQ6IHN0cmluZywgdG9vbElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5iYXNlVXJsfS9jb250ZXh0cy8ke2NvbnRleHRJZH0vdG9vbHMvJHt0b29sSWR9YDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKHVybCk7XHJcbiAgfVxyXG5cclxuICBnZXRQZXJtaXNzaW9ucyhpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxDb250ZXh0UGVybWlzc2lvbltdPiB7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnL2NvbnRleHRzLycgKyBpZCArICcvcGVybWlzc2lvbnMnO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8Q29udGV4dFBlcm1pc3Npb25bXT4odXJsKTtcclxuICB9XHJcblxyXG4gIGFkZFBlcm1pc3Npb25Bc3NvY2lhdGlvbihcclxuICAgIGNvbnRleHRJZDogc3RyaW5nLFxyXG4gICAgcHJvZmlsOiBzdHJpbmcsXHJcbiAgICB0eXBlOiBUeXBlUGVybWlzc2lvblxyXG4gICk6IE9ic2VydmFibGU8Q29udGV4dFBlcm1pc3Npb25bXT4ge1xyXG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5iYXNlVXJsfS9jb250ZXh0cy8ke2NvbnRleHRJZH0vcGVybWlzc2lvbnNgO1xyXG4gICAgY29uc3QgYXNzb2NpYXRpb24gPSB7XHJcbiAgICAgIHByb2ZpbCxcclxuICAgICAgdHlwZVBlcm1pc3Npb246IHR5cGVcclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8Q29udGV4dFBlcm1pc3Npb25bXT4oXHJcbiAgICAgIHVybCxcclxuICAgICAgSlNPTi5zdHJpbmdpZnkoYXNzb2NpYXRpb24pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlUGVybWlzc2lvbkFzc29jaWF0aW9uKFxyXG4gICAgY29udGV4dElkOiBzdHJpbmcsXHJcbiAgICBwZXJtaXNzaW9uSWQ6IHN0cmluZ1xyXG4gICk6IE9ic2VydmFibGU8dm9pZD4ge1xyXG4gICAgY29uc3QgdXJsID0gYCR7XHJcbiAgICAgIHRoaXMuYmFzZVVybFxyXG4gICAgfS9jb250ZXh0cy8ke2NvbnRleHRJZH0vcGVybWlzc2lvbnMvJHtwZXJtaXNzaW9uSWR9YDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlPHZvaWQ+KHVybCk7XHJcbiAgfVxyXG5cclxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gIGdldExvY2FsQ29udGV4dHMoKTogT2JzZXJ2YWJsZTxDb250ZXh0c0xpc3Q+IHtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0UGF0aCh0aGlzLm9wdGlvbnMuY29udGV4dExpc3RGaWxlKTtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PENvbnRleHRzTGlzdD4odXJsKS5waXBlKFxyXG4gICAgICBtYXAoKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgb3VyczogcmVzIH07XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0TG9jYWxDb250ZXh0KHVyaSk6IE9ic2VydmFibGU8RGV0YWlsZWRDb250ZXh0PiB7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmdldFBhdGgoYCR7dXJpfS5qc29uYCk7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxEZXRhaWxlZENvbnRleHQ+KHVybCkucGlwZShcclxuICAgICAgY2F0Y2hFcnJvcihyZXMgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhhbmRsZUVycm9yKHJlcywgdXJpKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBsb2FkQ29udGV4dHMoKSB7XHJcbiAgICBsZXQgcmVxdWVzdDtcclxuICAgIGlmICh0aGlzLmJhc2VVcmwpIHtcclxuICAgICAgcmVxdWVzdCA9IHRoaXMuZ2V0KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXF1ZXN0ID0gdGhpcy5nZXRMb2NhbENvbnRleHRzKCk7XHJcbiAgICB9XHJcbiAgICByZXF1ZXN0LnN1YnNjcmliZShjb250ZXh0cyA9PiB7XHJcbiAgICAgIGNvbnN0IHB1YmxpY3NDb250ZXh0cyA9IHRoaXMuY29udGV4dHMkLnZhbHVlLnB1YmxpYztcclxuXHJcbiAgICAgIGlmIChwdWJsaWNzQ29udGV4dHMpIHtcclxuICAgICAgICBjb25zdCBjb250ZXh0VXJpID0gcHVibGljc0NvbnRleHRzLmZpbmQoXHJcbiAgICAgICAgICBjID0+IGMudXJpID09PSB0aGlzLm9wdGlvbnMuZGVmYXVsdENvbnRleHRVcmlcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmIChjb250ZXh0VXJpKSB7XHJcbiAgICAgICAgICBpZiAoIWNvbnRleHRzLnB1YmxpYykge1xyXG4gICAgICAgICAgICBjb250ZXh0cy5wdWJsaWMgPSBbXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNvbnRleHRzLnB1YmxpYy5wdXNoKGNvbnRleHRVcmkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aGlzLmNvbnRleHRzJC5uZXh0KGNvbnRleHRzKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbG9hZERlZmF1bHRDb250ZXh0KCkge1xyXG4gICAgY29uc3QgbG9hZEZjdCA9IChkaXJlY3QgPSBmYWxzZSkgPT4ge1xyXG4gICAgICBpZiAoIWRpcmVjdCAmJiB0aGlzLmJhc2VVcmwgJiYgdGhpcy5hdXRoU2VydmljZS5hdXRoZW50aWNhdGVkKSB7XHJcbiAgICAgICAgdGhpcy5nZXREZWZhdWx0KCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgKF9jb250ZXh0OiBEZXRhaWxlZENvbnRleHQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmRlZmF1bHRDb250ZXh0VXJpID0gX2NvbnRleHQudXJpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENvbnRleHRUb0xpc3QoX2NvbnRleHQpO1xyXG4gICAgICAgICAgICB0aGlzLnNldENvbnRleHQoX2NvbnRleHQpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0Q29udGV4dElkJC5uZXh0KHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZENvbnRleHQodGhpcy5vcHRpb25zLmRlZmF1bHRDb250ZXh0VXJpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubG9hZENvbnRleHQodGhpcy5vcHRpb25zLmRlZmF1bHRDb250ZXh0VXJpKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAodGhpcy5yb3V0ZSAmJiB0aGlzLnJvdXRlLm9wdGlvbnMuY29udGV4dEtleSkge1xyXG4gICAgICB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zLnBpcGUoZGVib3VuY2VUaW1lKDEwMCkpLnN1YnNjcmliZShwYXJhbXMgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbnRleHRQYXJhbSA9IHBhcmFtc1t0aGlzLnJvdXRlLm9wdGlvbnMuY29udGV4dEtleSBhcyBzdHJpbmddO1xyXG4gICAgICAgIGxldCBkaXJlY3QgPSBmYWxzZTtcclxuICAgICAgICBpZiAoY29udGV4dFBhcmFtKSB7XHJcbiAgICAgICAgICB0aGlzLm9wdGlvbnMuZGVmYXVsdENvbnRleHRVcmkgPSBjb250ZXh0UGFyYW07XHJcbiAgICAgICAgICBkaXJlY3QgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsb2FkRmN0KGRpcmVjdCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbG9hZEZjdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbG9hZENvbnRleHQodXJpOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNvbnRleHQkLnZhbHVlO1xyXG4gICAgaWYgKGNvbnRleHQgJiYgY29udGV4dC51cmkgPT09IHVyaSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29udGV4dHMkJCA9IHRoaXMuZ2V0Q29udGV4dEJ5VXJpKHVyaSkuc3Vic2NyaWJlKFxyXG4gICAgICAoX2NvbnRleHQ6IERldGFpbGVkQ29udGV4dCkgPT4ge1xyXG4gICAgICAgIGNvbnRleHRzJCQudW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB0aGlzLmFkZENvbnRleHRUb0xpc3QoX2NvbnRleHQpO1xyXG4gICAgICAgIHRoaXMuc2V0Q29udGV4dChfY29udGV4dCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgY29udGV4dHMkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgc2V0Q29udGV4dChjb250ZXh0OiBEZXRhaWxlZENvbnRleHQpIHtcclxuICAgIGNvbnN0IGN1cnJlbnRDb250ZXh0ID0gdGhpcy5jb250ZXh0JC52YWx1ZTtcclxuICAgIGlmIChjdXJyZW50Q29udGV4dCAmJiBjb250ZXh0ICYmIGNvbnRleHQuaWQgPT09IGN1cnJlbnRDb250ZXh0LmlkKSB7XHJcbiAgICAgIGlmIChjb250ZXh0Lm1hcC52aWV3LmtlZXBDdXJyZW50VmlldyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY29udGV4dC5tYXAudmlldy5rZWVwQ3VycmVudFZpZXcgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY29udGV4dCQubmV4dChjb250ZXh0KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghY29udGV4dC5tYXApIHtcclxuICAgICAgY29udGV4dC5tYXAgPSB7IHZpZXc6IHt9IH07XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmFzc2lnbihjb250ZXh0Lm1hcC52aWV3LCB0aGlzLm1hcFZpZXdGcm9tUm91dGUpO1xyXG5cclxuICAgIHRoaXMuY29udGV4dCQubmV4dChjb250ZXh0KTtcclxuICB9XHJcblxyXG4gIGxvYWRFZGl0ZWRDb250ZXh0KHVyaTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmdldENvbnRleHRCeVVyaSh1cmkpLnN1YnNjcmliZSgoX2NvbnRleHQ6IERldGFpbGVkQ29udGV4dCkgPT4ge1xyXG4gICAgICB0aGlzLnNldEVkaXRlZENvbnRleHQoX2NvbnRleHQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRFZGl0ZWRDb250ZXh0KGNvbnRleHQ6IERldGFpbGVkQ29udGV4dCkge1xyXG4gICAgdGhpcy5lZGl0ZWRDb250ZXh0JC5uZXh0KGNvbnRleHQpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29udGV4dEZyb21NYXAoaWdvTWFwOiBJZ29NYXApOiBEZXRhaWxlZENvbnRleHQge1xyXG4gICAgY29uc3QgdmlldyA9IGlnb01hcC5vbC5nZXRWaWV3KCk7XHJcbiAgICBjb25zdCBwcm9qID0gdmlldy5nZXRQcm9qZWN0aW9uKCkuZ2V0Q29kZSgpO1xyXG4gICAgY29uc3QgY2VudGVyOiBhbnkgPSBuZXcgb2xQb2ludCh2aWV3LmdldENlbnRlcigpKS50cmFuc2Zvcm0oXHJcbiAgICAgIHByb2osXHJcbiAgICAgICdFUFNHOjQzMjYnXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGNvbnRleHQgPSB7XHJcbiAgICAgIHVyaTogdXVpZCgpLFxyXG4gICAgICB0aXRsZTogJycsXHJcbiAgICAgIHNjb3BlOiAncHJpdmF0ZScsXHJcbiAgICAgIG1hcDoge1xyXG4gICAgICAgIHZpZXc6IHtcclxuICAgICAgICAgIGNlbnRlcjogY2VudGVyLmdldENvb3JkaW5hdGVzKCksXHJcbiAgICAgICAgICB6b29tOiB2aWV3LmdldFpvb20oKSxcclxuICAgICAgICAgIHByb2plY3Rpb246IHByb2pcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGxheWVyczogW10sXHJcbiAgICAgIHRvb2xzOiBbXVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBsYXllcnMgPSBpZ29NYXAubGF5ZXJzJC5nZXRWYWx1ZSgpO1xyXG5cclxuICAgIGZvciAoY29uc3QgbCBvZiBsYXllcnMpIHtcclxuICAgICAgY29uc3QgbGF5ZXI6IGFueSA9IGw7XHJcbiAgICAgIGNvbnN0IG9wdHMgPSB7XHJcbiAgICAgICAgaWQ6IGxheWVyLm9wdGlvbnMuaWQgPyBTdHJpbmcobGF5ZXIub3B0aW9ucy5pZCkgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgdGl0bGU6IGxheWVyLm9wdGlvbnMudGl0bGUsXHJcbiAgICAgICAgekluZGV4OiBsYXllci56SW5kZXgsXHJcbiAgICAgICAgdmlzaWJsZTogbGF5ZXIudmlzaWJsZSxcclxuICAgICAgICBzb3VyY2VPcHRpb25zOiB7XHJcbiAgICAgICAgICB0eXBlOiBsYXllci5kYXRhU291cmNlLm9wdGlvbnMudHlwZSxcclxuICAgICAgICAgIHBhcmFtczogbGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zLnBhcmFtcyxcclxuICAgICAgICAgIHVybDogbGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zLnVybFxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgY29udGV4dC5sYXllcnMucHVzaChvcHRzKTtcclxuICAgIH1cclxuXHJcbiAgICBjb250ZXh0LnRvb2xzID0gdGhpcy50b29scy5tYXAodG9vbCA9PiBTdHJpbmcodG9vbC5pZCkpO1xyXG5cclxuICAgIHJldHVybiBjb250ZXh0O1xyXG4gIH1cclxuXHJcbiAgc2V0VG9vbHModG9vbHM6IFRvb2xbXSkge1xyXG4gICAgdGhpcy50b29scyA9IHRvb2xzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRDb250ZXh0QnlVcmkodXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPERldGFpbGVkQ29udGV4dD4ge1xyXG4gICAgaWYgKHRoaXMuYmFzZVVybCkge1xyXG4gICAgICBsZXQgY29udGV4dFRvTG9hZDtcclxuICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModGhpcy5jb250ZXh0cyQudmFsdWUpKSB7XHJcbiAgICAgICAgY29udGV4dFRvTG9hZCA9IHRoaXMuY29udGV4dHMkLnZhbHVlW2tleV0uZmluZChjID0+IHtcclxuICAgICAgICAgIHJldHVybiBjLnVyaSA9PT0gdXJpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChjb250ZXh0VG9Mb2FkKSB7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFRPRE8gOiB1c2UgYWx3YXlzIGlkIG9yIHVyaVxyXG4gICAgICBjb25zdCBpZCA9IGNvbnRleHRUb0xvYWQgPyBjb250ZXh0VG9Mb2FkLmlkIDogdXJpO1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXREZXRhaWxzKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5nZXRMb2NhbENvbnRleHQodXJpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVhZFBhcmFtc0Zyb21Sb3V0ZSgpIHtcclxuICAgIGlmICghdGhpcy5yb3V0ZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yb3V0ZS5xdWVyeVBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuICAgICAgY29uc3QgY2VudGVyS2V5ID0gdGhpcy5yb3V0ZS5vcHRpb25zLmNlbnRlcktleTtcclxuICAgICAgaWYgKGNlbnRlcktleSAmJiBwYXJhbXNbY2VudGVyS2V5IGFzIHN0cmluZ10pIHtcclxuICAgICAgICBjb25zdCBjZW50ZXJQYXJhbXMgPSBwYXJhbXNbY2VudGVyS2V5IGFzIHN0cmluZ107XHJcbiAgICAgICAgdGhpcy5tYXBWaWV3RnJvbVJvdXRlLmNlbnRlciA9IGNlbnRlclBhcmFtcy5zcGxpdCgnLCcpLm1hcChOdW1iZXIpO1xyXG4gICAgICAgIHRoaXMubWFwVmlld0Zyb21Sb3V0ZS5nZW9sb2NhdGUgPSBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcHJvamVjdGlvbktleSA9IHRoaXMucm91dGUub3B0aW9ucy5wcm9qZWN0aW9uS2V5O1xyXG4gICAgICBpZiAocHJvamVjdGlvbktleSAmJiBwYXJhbXNbcHJvamVjdGlvbktleSBhcyBzdHJpbmddKSB7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdGlvblBhcmFtID0gcGFyYW1zW3Byb2plY3Rpb25LZXkgYXMgc3RyaW5nXTtcclxuICAgICAgICB0aGlzLm1hcFZpZXdGcm9tUm91dGUucHJvamVjdGlvbiA9IHByb2plY3Rpb25QYXJhbTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3Qgem9vbUtleSA9IHRoaXMucm91dGUub3B0aW9ucy56b29tS2V5O1xyXG4gICAgICBpZiAoem9vbUtleSAmJiBwYXJhbXNbem9vbUtleSBhcyBzdHJpbmddKSB7XHJcbiAgICAgICAgY29uc3Qgem9vbVBhcmFtID0gcGFyYW1zW3pvb21LZXkgYXMgc3RyaW5nXTtcclxuICAgICAgICB0aGlzLm1hcFZpZXdGcm9tUm91dGUuem9vbSA9IE51bWJlcih6b29tUGFyYW0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0UGF0aChmaWxlOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGJhc2VQYXRoID0gdGhpcy5vcHRpb25zLmJhc2VQYXRoLnJlcGxhY2UoL1xcLyQvLCAnJyk7XHJcblxyXG4gICAgcmV0dXJuIGAke2Jhc2VQYXRofS8ke2ZpbGV9YDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IocmVzOiBSZXNwb25zZSwgdXJpOiBzdHJpbmcpOiBNZXNzYWdlW10ge1xyXG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMuY29udGV4dHMkLnZhbHVlLm91cnMuZmluZChvYmogPT4gb2JqLnVyaSA9PT0gdXJpKTtcclxuICAgIGNvbnN0IHRpdGxlQ29udGV4dCA9IGNvbnRleHQgPyBjb250ZXh0LnRpdGxlIDogdXJpO1xyXG4gICAgY29uc3QgdGl0bGVFcnJvciA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAnaWdvLmNvbnRleHQuY29udGV4dE1hbmFnZXIuaW52YWxpZC50aXRsZSdcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgdGV4dEVycm9yID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5pbnZhbGlkLnRleHQnLFxyXG4gICAgICB7IHZhbHVlOiB0aXRsZUNvbnRleHQgfVxyXG4gICAgKTtcclxuXHJcbiAgICB0aHJvdyBbeyB0aXRsZTogdGl0bGVFcnJvciwgdGV4dDogdGV4dEVycm9yIH1dO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVDb250ZXh0c0NoYW5nZShcclxuICAgIGNvbnRleHRzOiBDb250ZXh0c0xpc3QsXHJcbiAgICBrZWVwQ3VycmVudENvbnRleHQgPSBmYWxzZVxyXG4gICkge1xyXG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMuY29udGV4dCQudmFsdWU7XHJcbiAgICBjb25zdCBlZGl0ZWRDb250ZXh0ID0gdGhpcy5lZGl0ZWRDb250ZXh0JC52YWx1ZTtcclxuXHJcbiAgICBpZiAoIWtlZXBDdXJyZW50Q29udGV4dCB8fCAhdGhpcy5maW5kQ29udGV4dChjb250ZXh0KSkge1xyXG4gICAgICB0aGlzLmxvYWREZWZhdWx0Q29udGV4dCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGNvbnRleHQubWFwLnZpZXcua2VlcEN1cnJlbnRWaWV3ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb250ZXh0Lm1hcC52aWV3LmtlZXBDdXJyZW50VmlldyA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jb250ZXh0JC5uZXh0KGNvbnRleHQpO1xyXG4gICAgICB0aGlzLmdldERlZmF1bHQoKS5zdWJzY3JpYmUoKCkgPT4ge30pO1xyXG4gICAgfVxyXG4gICAgY29uc3QgZWRpdGVkRm91bmQgPSB0aGlzLmZpbmRDb250ZXh0KGVkaXRlZENvbnRleHQpO1xyXG4gICAgaWYgKCFlZGl0ZWRGb3VuZCB8fCBlZGl0ZWRGb3VuZC5wZXJtaXNzaW9uICE9PSAnd3JpdGUnKSB7XHJcbiAgICAgIHRoaXMuc2V0RWRpdGVkQ29udGV4dCh1bmRlZmluZWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRDb250ZXh0VG9MaXN0KGNvbnRleHQ6IENvbnRleHQpIHtcclxuICAgIGNvbnN0IGNvbnRleHRGb3VuZCA9IHRoaXMuZmluZENvbnRleHQoY29udGV4dCk7XHJcbiAgICBpZiAoIWNvbnRleHRGb3VuZCkge1xyXG4gICAgICBjb25zdCBjb250ZXh0U2ltcGxpZmllID0ge1xyXG4gICAgICAgIGlkOiBjb250ZXh0LmlkLFxyXG4gICAgICAgIHVyaTogY29udGV4dC51cmksXHJcbiAgICAgICAgdGl0bGU6IGNvbnRleHQudGl0bGUsXHJcbiAgICAgICAgc2NvcGU6IGNvbnRleHQuc2NvcGUsXHJcbiAgICAgICAgcGVybWlzc2lvbjogVHlwZVBlcm1pc3Npb25bVHlwZVBlcm1pc3Npb24ucmVhZF1cclxuICAgICAgfTtcclxuICAgICAgaWYgKHRoaXMuY29udGV4dHMkLnZhbHVlICYmIHRoaXMuY29udGV4dHMkLnZhbHVlLnB1YmxpYykge1xyXG4gICAgICAgIHRoaXMuY29udGV4dHMkLnZhbHVlLnB1YmxpYy5wdXNoKGNvbnRleHRTaW1wbGlmaWUpO1xyXG4gICAgICAgIHRoaXMuY29udGV4dHMkLm5leHQodGhpcy5jb250ZXh0cyQudmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZpbmRDb250ZXh0KGNvbnRleHQ6IENvbnRleHQpIHtcclxuICAgIGlmICghY29udGV4dCB8fCAhY29udGV4dC5pZCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29udGV4dHMgPSB0aGlzLmNvbnRleHRzJC52YWx1ZTtcclxuICAgIGxldCBmb3VuZDtcclxuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGNvbnRleHRzKSkge1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IGNvbnRleHRzW2tleV07XHJcbiAgICAgIGZvdW5kID0gdmFsdWUuZmluZChjID0+IGMuaWQgPT09IGNvbnRleHQuaWQpO1xyXG4gICAgICBpZiAoZm91bmQpIHtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmb3VuZDtcclxuICB9XHJcbn1cclxuIl19