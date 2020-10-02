/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { map, tap, catchError, debounceTime, flatMap } from 'rxjs/operators';
import olPoint from 'ol/geom/Point';
import GeoJSON from 'ol/format/GeoJSON';
import Cluster from 'ol/source/Cluster';
import { uuid, ObjectUtils } from '@igo2/utils';
import { ConfigService, RouteService, MessageService, LanguageService } from '@igo2/core';
import { AuthService } from '@igo2/auth';
import { TypePermission } from './context.enum';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@igo2/auth";
import * as i3 from "@igo2/core";
var ContextService = /** @class */ (function () {
    function ContextService(http, authService, languageService, config, messageService, route) {
        var _this = this;
        this.http = http;
        this.authService = authService;
        this.languageService = languageService;
        this.config = config;
        this.messageService = messageService;
        this.route = route;
        this.context$ = new BehaviorSubject(undefined);
        this.contexts$ = new BehaviorSubject({ ours: [] });
        this.defaultContextId$ = new BehaviorSubject(undefined);
        this.editedContext$ = new BehaviorSubject(undefined);
        this.importedContext = [];
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
            if (authenticated && _this.baseUrl) {
                _this.get().subscribe((/**
                 * @param {?} contexts
                 * @return {?}
                 */
                function (contexts) {
                    _this.handleContextsChange(contexts);
                }));
            }
            else {
                /** @type {?} */
                var contexts$$_1 = _this.contexts$.subscribe((/**
                 * @param {?} contexts
                 * @return {?}
                 */
                function (contexts) {
                    if (contexts$$_1) {
                        contexts$$_1.unsubscribe();
                        _this.handleContextsChange(contexts);
                    }
                }));
                _this.loadContexts();
            }
        }));
    }
    Object.defineProperty(ContextService.prototype, "defaultContextUri", {
        get: /**
         * @return {?}
         */
        function () {
            return this._defaultContextUri || this.options.defaultContextUri;
        },
        set: /**
         * @param {?} uri
         * @return {?}
         */
        function (uri) {
            this._defaultContextUri = uri;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?=} permissions
     * @param {?=} hidden
     * @return {?}
     */
    ContextService.prototype.get = /**
     * @param {?=} permissions
     * @param {?=} hidden
     * @return {?}
     */
    function (permissions, hidden) {
        /** @type {?} */
        var url = this.baseUrl + '/contexts';
        if (permissions && this.authService.authenticated) {
            url += '?permission=' + permissions.join();
            if (hidden) {
                url += '&hidden=true';
            }
        }
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
        return this.http.get(url).pipe(catchError((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            return _this.handleError(res, id);
        })));
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
     * @return {?}
     */
    ContextService.prototype.getProfilByUser = /**
     * @return {?}
     */
    function () {
        if (this.baseUrl) {
            /** @type {?} */
            var url = this.baseUrl + '/profils?';
            return this.http.get(url);
        }
        return of([]);
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
    ContextService.prototype.hideContext = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        /** @type {?} */
        var url = this.baseUrl + '/contexts/' + id + '/hide';
        return this.http.post(url, {});
    };
    /**
     * @param {?} id
     * @return {?}
     */
    ContextService.prototype.showContext = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        /** @type {?} */
        var url = this.baseUrl + '/contexts/' + id + '/show';
        return this.http.post(url, {});
    };
    /**
     * @param {?} id
     * @param {?=} imported
     * @return {?}
     */
    ContextService.prototype.delete = /**
     * @param {?} id
     * @param {?=} imported
     * @return {?}
     */
    function (id, imported) {
        var _this = this;
        if (imported === void 0) { imported = false; }
        /** @type {?} */
        var contexts = { ours: [] };
        Object.keys(this.contexts$.value).forEach((/**
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
        if (imported) {
            this.importedContext = this.importedContext.filter((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c.id !== id; }));
            return of(this.contexts$.next(contexts));
        }
        /** @type {?} */
        var url = this.baseUrl + '/contexts/' + id;
        return this.http.delete(url).pipe(tap((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
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
            _this.contexts$.value.ours.unshift(contextCreated);
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
            _this.contexts$.value.ours.unshift(contextCloned);
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
        var _this = this;
        /** @type {?} */
        var url = this.baseUrl + "/contexts/" + contextId + "/permissions";
        /** @type {?} */
        var association = {
            profil: profil,
            typePermission: type
        };
        return this.http
            .post(url, JSON.stringify(association))
            .pipe(catchError((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            return [_this.handleError(res, undefined, true)];
        })));
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
        return this.http.get(url).pipe(flatMap((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (!res.base) {
                return of(res);
            }
            /** @type {?} */
            var urlBase = _this.getPath(res.base + ".json");
            return _this.http.get(urlBase).pipe(map((/**
             * @param {?} resBase
             * @return {?}
             */
            function (resBase) {
                /** @type {?} */
                var resMerge = res;
                resMerge.map = ObjectUtils.mergeDeep(resBase.map, res.map);
                resMerge.layers = (resBase.layers || [])
                    .concat(res.layers || [])
                    .reverse()
                    .filter((/**
                 * @param {?} l
                 * @param {?} index
                 * @param {?} self
                 * @return {?}
                 */
                function (l, index, self) {
                    return !l.id || self.findIndex((/**
                     * @param {?} l2
                     * @return {?}
                     */
                    function (l2) { return l2.id === l.id; })) === index;
                }))
                    .reverse();
                resMerge.toolbar = res.toolbar || resBase.toolbar;
                resMerge.tools = (res.tools || [])
                    .concat(resBase.tools || [])
                    .filter((/**
                 * @param {?} t
                 * @param {?} index
                 * @param {?} self
                 * @return {?}
                 */
                function (t, index, self) {
                    return self.findIndex((/**
                     * @param {?} t2
                     * @return {?}
                     */
                    function (t2) { return t2.name === t.name; })) === index;
                }));
                return resMerge;
            })), catchError((/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
                return _this.handleError(err, uri);
            })));
        })), catchError((/**
         * @param {?} err2
         * @return {?}
         */
        function (err2) {
            return _this.handleError(err2, uri);
        })));
    };
    /**
     * @param {?=} permissions
     * @param {?=} hidden
     * @return {?}
     */
    ContextService.prototype.loadContexts = /**
     * @param {?=} permissions
     * @param {?=} hidden
     * @return {?}
     */
    function (permissions, hidden) {
        var _this = this;
        /** @type {?} */
        var request;
        if (this.baseUrl) {
            request = this.get(permissions, hidden);
        }
        else {
            request = this.getLocalContexts();
        }
        request.subscribe((/**
         * @param {?} contexts
         * @return {?}
         */
        function (contexts) {
            contexts.ours = _this.importedContext.concat(contexts.ours);
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
                    _this.defaultContextUri = _context.uri;
                    _this.addContextToList(_context);
                    _this.setContext(_context);
                }), (/**
                 * @return {?}
                 */
                function () {
                    _this.defaultContextId$.next(undefined);
                    _this.loadContext(_this.defaultContextUri);
                }));
            }
            else {
                _this.loadContext(_this.defaultContextUri);
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
                    _this.defaultContextUri = contextParam;
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
            if (contexts$$) {
                contexts$$.unsubscribe();
            }
            _this.addContextToList(_context);
            _this.setContext(_context);
        }), (/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            if (contexts$$) {
                contexts$$.unsubscribe();
            }
            if (uri !== _this.options.defaultContextUri) {
                _this.loadContext(_this.options.defaultContextUri);
            }
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
        this.handleContextMessage(context);
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
     * @param {?=} empty
     * @return {?}
     */
    ContextService.prototype.getContextFromMap = /**
     * @param {?} igoMap
     * @param {?=} empty
     * @return {?}
     */
    function (igoMap, empty) {
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
                    projection: proj,
                    maxZoomOnExtent: igoMap.viewController.maxZoomOnExtent
                }
            },
            layers: [],
            tools: []
        };
        /** @type {?} */
        var layers = [];
        if (empty === true) {
            layers = igoMap.layers$
                .getValue()
                .filter((/**
             * @param {?} lay
             * @return {?}
             */
            function (lay) {
                return lay.baseLayer === true ||
                    lay.options.id === 'searchPointerSummaryId';
            }))
                .sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) { return a.zIndex - b.zIndex; }));
        }
        else {
            layers = igoMap.layers$.getValue().sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) { return a.zIndex - b.zIndex; }));
        }
        /** @type {?} */
        var i = 0;
        try {
            for (var layers_1 = tslib_1.__values(layers), layers_1_1 = layers_1.next(); !layers_1_1.done; layers_1_1 = layers_1.next()) {
                var l = layers_1_1.value;
                /** @type {?} */
                var layer = l;
                /** @type {?} */
                var opts = {
                    id: layer.options.id ? String(layer.options.id) : undefined,
                    layerOptions: {
                        title: layer.options.title,
                        zIndex: ++i,
                        visible: layer.visible
                    },
                    sourceOptions: {
                        type: layer.dataSource.options.type,
                        params: layer.dataSource.options.params,
                        url: layer.dataSource.options.url,
                        queryable: layer.queryable
                    }
                };
                if (opts.sourceOptions.type) {
                    context.layers.push(opts);
                }
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
        function (tool) {
            return { id: String(tool.id), global: tool.global };
        }));
        return context;
    };
    /**
     * @param {?} igoMap
     * @param {?} layers
     * @param {?} name
     * @return {?}
     */
    ContextService.prototype.getContextFromLayers = /**
     * @param {?} igoMap
     * @param {?} layers
     * @param {?} name
     * @return {?}
     */
    function (igoMap, layers, name) {
        /** @type {?} */
        var currentContext = this.context$.getValue();
        /** @type {?} */
        var view = igoMap.ol.getView();
        /** @type {?} */
        var proj = view.getProjection().getCode();
        /** @type {?} */
        var center = new olPoint(view.getCenter()).transform(proj, 'EPSG:4326');
        /** @type {?} */
        var context = {
            uri: name,
            title: name,
            map: {
                view: {
                    center: center.getCoordinates(),
                    zoom: view.getZoom(),
                    projection: proj
                }
            },
            layers: [],
            toolbar: [],
            tools: [],
            extraFeatures: []
        };
        /** @type {?} */
        var currentLayers = igoMap.layers$.getValue();
        context.layers = currentLayers
            .filter((/**
         * @param {?} l
         * @return {?}
         */
        function (l) { return l.baseLayer; }))
            .map((/**
         * @param {?} l
         * @return {?}
         */
        function (l) {
            return {
                baseLayer: true,
                sourceOptions: l.options.sourceOptions,
                title: l.options.title,
                visible: l.visible
            };
        }));
        layers.forEach((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) {
            /** @type {?} */
            var layerFound = currentContext.layers.find((/**
             * @param {?} contextLayer
             * @return {?}
             */
            function (contextLayer) {
                return layer.id === contextLayer.source.id && !contextLayer.baseLayer;
            }));
            if (layerFound) {
                /** @type {?} */
                var layerStyle = layerFound["style"];
                if (layerFound["styleByAttribute"]) {
                    layerStyle = undefined;
                }
                else if (layerFound["clusterBaseStyle"]) {
                    layerStyle = undefined;
                    delete layerFound.sourceOptions["source"];
                    delete layerFound.sourceOptions["format"];
                }
                /** @type {?} */
                var opts = {
                    baseLayer: layerFound.baseLayer,
                    title: layer.options.title,
                    zIndex: layer.zIndex,
                    styleByAttribute: layerFound["styleByAttribute"],
                    clusterBaseStyle: layerFound["clusterBaseStyle"],
                    style: layerStyle,
                    clusterParam: layerFound["clusterParam"],
                    visible: layer.visible,
                    opacity: layer.opacity,
                    sourceOptions: layerFound.sourceOptions
                };
                context.layers.push(opts);
            }
            else {
                if (layer.ol.type !== 'VECTOR') {
                    /** @type {?} */
                    var catalogLayer = layer.options;
                    delete catalogLayer.source;
                    context.layers.push(catalogLayer);
                }
                else {
                    /** @type {?} */
                    var features = void 0;
                    /** @type {?} */
                    var writer = new GeoJSON();
                    if (layer.ol.getSource() instanceof Cluster) {
                        features = writer.writeFeatures(layer.ol.getSource().getSource().getFeatures(), {
                            dataProjection: 'EPSG:4326',
                            featureProjection: 'EPSG:3857'
                        });
                    }
                    else {
                        features = writer.writeFeatures(layer.ol.getSource().getFeatures(), {
                            dataProjection: 'EPSG:4326',
                            featureProjection: 'EPSG:3857'
                        });
                    }
                    features = JSON.parse(features);
                    features.name = layer.options.title;
                    context.extraFeatures.push(features);
                }
            }
        }));
        context.toolbar = this.toolbar;
        context.tools = this.tools;
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
     * @param {?} toolbar
     * @return {?}
     */
    ContextService.prototype.setToolbar = /**
     * @param {?} toolbar
     * @return {?}
     */
    function (toolbar) {
        this.toolbar = toolbar;
    };
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    ContextService.prototype.handleContextMessage = /**
     * @private
     * @param {?} context
     * @return {?}
     */
    function (context) {
        if (this.contextMessage) {
            this.messageService.remove(this.contextMessage.id);
        }
        /** @type {?} */
        var message = context.message;
        if (message) {
            message.title = message.title
                ? this.languageService.translate.instant(message.title)
                : undefined;
            message.text = message.text
                ? this.languageService.translate.instant(message.text)
                : undefined;
            this.messageService.message((/** @type {?} */ (message)));
        }
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
            if (contextToLoad && contextToLoad.imported) {
                return of(contextToLoad);
            }
            // TODO : use always id or uri
            /** @type {?} */
            var id = contextToLoad ? contextToLoad.id : uri;
            return this.getDetails(id);
        }
        /** @type {?} */
        var importedContext = this.contexts$.value.ours.find((/**
         * @param {?} currentContext
         * @return {?}
         */
        function (currentContext) {
            return currentContext.uri === uri && currentContext.imported === true;
        }));
        if (importedContext) {
            return of(importedContext);
        }
        else {
            return this.getLocalContext(uri);
        }
    };
    /**
     * @param {?} igoMap
     * @return {?}
     */
    ContextService.prototype.getContextLayers = /**
     * @param {?} igoMap
     * @return {?}
     */
    function (igoMap) {
        /** @type {?} */
        var layers = [];
        /** @type {?} */
        var mapLayers = igoMap.layers$.getValue();
        mapLayers.forEach((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) {
            if (!layer.baseLayer && layer.options.id !== 'searchPointerSummaryId') {
                layers.push(layer);
            }
        }));
        return layers;
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
     * @param {?} error
     * @param {?} uri
     * @param {?=} permissionError
     * @return {?}
     */
    ContextService.prototype.handleError = /**
     * @private
     * @param {?} error
     * @param {?} uri
     * @param {?=} permissionError
     * @return {?}
     */
    function (error, uri, permissionError) {
        /** @type {?} */
        var context = this.contexts$.value.ours.find((/**
         * @param {?} obj
         * @return {?}
         */
        function (obj) { return obj.uri === uri; }));
        /** @type {?} */
        var titleContext = context ? context.title : uri;
        error.error.title = this.languageService.translate.instant('igo.context.contextManager.invalid.title');
        error.error.message = this.languageService.translate.instant('igo.context.contextManager.invalid.text', { value: titleContext });
        error.error.toDisplay = true;
        if (permissionError) {
            error.error.title = this.languageService.translate.instant('igo.context.contextManager.errors.addPermissionTitle');
            error.error.message = this.languageService.translate.instant('igo.context.contextManager.errors.addPermission');
        }
        throw error;
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
        if (keepCurrentContext === void 0) { keepCurrentContext = true; }
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
            if (this.baseUrl && this.authService.authenticated) {
                this.getDefault().subscribe();
            }
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
        if (!context) {
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
                function (c) {
                    return (context.id && c.id === context.id) ||
                        (context.uri && c.uri === context.uri);
                }));
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
        { type: MessageService },
        { type: RouteService, decorators: [{ type: Optional }] }
    ]; };
    /** @nocollapse */ ContextService.ngInjectableDef = i0.defineInjectable({ factory: function ContextService_Factory() { return new ContextService(i0.inject(i1.HttpClient), i0.inject(i2.AuthService), i0.inject(i3.LanguageService), i0.inject(i3.ConfigService), i0.inject(i3.MessageService), i0.inject(i3.RouteService, 8)); }, token: ContextService, providedIn: "root" });
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
    /** @type {?} */
    ContextService.prototype.importedContext;
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
    ContextService.prototype.contextMessage;
    /**
     * @type {?}
     * @private
     */
    ContextService.prototype.tools;
    /**
     * @type {?}
     * @private
     */
    ContextService.prototype.toolbar;
    /**
     * @type {?}
     * @private
     */
    ContextService.prototype._defaultContextUri;
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
    ContextService.prototype.messageService;
    /**
     * @type {?}
     * @private
     */
    ContextService.prototype.route;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29udGV4dC8iLCJzb3VyY2VzIjpbImxpYi9jb250ZXh0LW1hbmFnZXIvc2hhcmVkL2NvbnRleHQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxVQUFVLEVBQXFCLE1BQU0sc0JBQXNCLENBQUM7QUFFckUsT0FBTyxFQUFFLGVBQWUsRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3RSxPQUFPLE9BQU8sTUFBTSxlQUFlLENBQUM7QUFDcEMsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFHeEMsT0FBTyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDaEQsT0FBTyxFQUNMLGFBQWEsRUFDYixZQUFZLEVBRVosY0FBYyxFQUVkLGVBQWUsRUFDaEIsTUFBTSxZQUFZLENBQUM7QUFFcEIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUd6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBV2hEO0lBMkJFLHdCQUNVLElBQWdCLEVBQ2hCLFdBQXdCLEVBQ3hCLGVBQWdDLEVBQ2hDLE1BQXFCLEVBQ3JCLGNBQThCLEVBQ2xCLEtBQW1CO1FBTnpDLGlCQW9DQztRQW5DUyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxXQUFNLEdBQU4sTUFBTSxD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QUFVO2dCQW9CVixXQUFXO2dCQUhsQixlQUFlO2dCQUxmLGFBQWE7Z0JBR2IsY0FBYztnQkFGZCxZQUFZLHVCQXNEVCxRQUFROzs7eUJBcEViO0NBMndCQyxBQXh1QkQsSUF3dUJDO1NBcnVCWSxjQUFjOzs7SUFDekIsa0NBQWtFOztJQUNsRSxtQ0FBbUU7O0lBQ25FLDJDQUFrRTs7SUFDbEUsd0NBQXdFOztJQUN4RSx5Q0FBb0Q7Ozs7O0lBQ3BELDBDQUE4Qzs7Ozs7SUFDOUMsaUNBQXVDOzs7OztJQUN2QyxpQ0FBd0I7Ozs7O0lBQ3hCLHdDQUFxQzs7Ozs7SUFJckMsK0JBQXNCOzs7OztJQUN0QixpQ0FBMEI7Ozs7O0lBUTFCLDRDQUFtQzs7Ozs7SUFHakMsOEJBQXdCOzs7OztJQUN4QixxQ0FBZ0M7Ozs7O0lBQ2hDLHlDQUF3Qzs7Ozs7SUFDeEMsZ0NBQTZCOzs7OztJQUM3Qix3Q0FBc0M7Ozs7O0lBQ3RDLCtCQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAsIHRhcCwgY2F0Y2hFcnJvciwgZGVib3VuY2VUaW1lLCBmbGF0TWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IG9sUG9pbnQgZnJvbSAnb2wvZ2VvbS9Qb2ludCc7XHJcbmltcG9ydCBHZW9KU09OIGZyb20gJ29sL2Zvcm1hdC9HZW9KU09OJztcclxuaW1wb3J0IENsdXN0ZXIgZnJvbSAnb2wvc291cmNlL0NsdXN0ZXInO1xyXG5cclxuaW1wb3J0IHsgVG9vbCB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcbmltcG9ydCB7IHV1aWQsIE9iamVjdFV0aWxzIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5pbXBvcnQge1xyXG4gIENvbmZpZ1NlcnZpY2UsXHJcbiAgUm91dGVTZXJ2aWNlLFxyXG4gIE1lc3NhZ2UsXHJcbiAgTWVzc2FnZVNlcnZpY2UsXHJcbiAgTm90aWZpY2F0aW9uLFxyXG4gIExhbmd1YWdlU2VydmljZVxyXG59IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICdAaWdvMi9hdXRoJztcclxuaW1wb3J0IHsgSWdvTWFwLCBMYXllciB9IGZyb20gJ0BpZ28yL2dlbyc7XHJcblxyXG5pbXBvcnQgeyBUeXBlUGVybWlzc2lvbiB9IGZyb20gJy4vY29udGV4dC5lbnVtJztcclxuaW1wb3J0IHtcclxuICBDb250ZXh0c0xpc3QsXHJcbiAgQ29udGV4dFNlcnZpY2VPcHRpb25zLFxyXG4gIENvbnRleHQsXHJcbiAgRGV0YWlsZWRDb250ZXh0LFxyXG4gIENvbnRleHRNYXBWaWV3LFxyXG4gIENvbnRleHRQZXJtaXNzaW9uLFxyXG4gIENvbnRleHRQcm9maWxzXHJcbn0gZnJvbSAnLi9jb250ZXh0LmludGVyZmFjZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb250ZXh0U2VydmljZSB7XHJcbiAgcHVibGljIGNvbnRleHQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEZXRhaWxlZENvbnRleHQ+KHVuZGVmaW5lZCk7XHJcbiAgcHVibGljIGNvbnRleHRzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Q29udGV4dHNMaXN0Pih7IG91cnM6IFtdIH0pO1xyXG4gIHB1YmxpYyBkZWZhdWx0Q29udGV4dElkJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPih1bmRlZmluZWQpO1xyXG4gIHB1YmxpYyBlZGl0ZWRDb250ZXh0JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RGV0YWlsZWRDb250ZXh0Pih1bmRlZmluZWQpO1xyXG4gIHB1YmxpYyBpbXBvcnRlZENvbnRleHQ6IEFycmF5PERldGFpbGVkQ29udGV4dD4gPSBbXTtcclxuICBwcml2YXRlIG1hcFZpZXdGcm9tUm91dGU6IENvbnRleHRNYXBWaWV3ID0ge307XHJcbiAgcHJpdmF0ZSBvcHRpb25zOiBDb250ZXh0U2VydmljZU9wdGlvbnM7XHJcbiAgcHJpdmF0ZSBiYXNlVXJsOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBjb250ZXh0TWVzc2FnZTogTm90aWZpY2F0aW9uO1xyXG5cclxuICAvLyBVbnRpbCB0aGUgQ29udGV4dFNlcnZpY2UgaXMgY29tcGxldGVseSByZWZhY3RvcmVkLCB0aGlzIGlzIG5lZWRlZFxyXG4gIC8vIHRvIHRyYWNrIHRoZSBjdXJyZW50IHRvb2xzXHJcbiAgcHJpdmF0ZSB0b29sczogVG9vbFtdO1xyXG4gIHByaXZhdGUgdG9vbGJhcjogc3RyaW5nW107XHJcblxyXG4gIGdldCBkZWZhdWx0Q29udGV4dFVyaSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRDb250ZXh0VXJpIHx8IHRoaXMub3B0aW9ucy5kZWZhdWx0Q29udGV4dFVyaTtcclxuICB9XHJcbiAgc2V0IGRlZmF1bHRDb250ZXh0VXJpKHVyaTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9kZWZhdWx0Q29udGV4dFVyaSA9IHVyaTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfZGVmYXVsdENvbnRleHRVcmk6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSxcclxuICAgIHByaXZhdGUgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByb3V0ZTogUm91dGVTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgICB7XHJcbiAgICAgICAgYmFzZVBhdGg6ICdjb250ZXh0cycsXHJcbiAgICAgICAgY29udGV4dExpc3RGaWxlOiAnX2NvbnRleHRzLmpzb24nLFxyXG4gICAgICAgIGRlZmF1bHRDb250ZXh0VXJpOiAnX2RlZmF1bHQnXHJcbiAgICAgIH0sXHJcbiAgICAgIHRoaXMuY29uZmlnLmdldENvbmZpZygnY29udGV4dCcpXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuYmFzZVVybCA9IHRoaXMub3B0aW9ucy51cmw7XHJcblxyXG4gICAgdGhpcy5yZWFkUGFyYW1zRnJvbVJvdXRlKCk7XHJcblxyXG4gICAgdGhpcy5hdXRoU2VydmljZS5hdXRoZW50aWNhdGUkLnN1YnNjcmliZSgoYXV0aGVudGljYXRlZCkgPT4ge1xyXG4gICAgICBpZiAoYXV0aGVudGljYXRlZCAmJiB0aGlzLmJhc2VVcmwpIHtcclxuICAgICAgICB0aGlzLmdldCgpLnN1YnNjcmliZSgoY29udGV4dHMpID0+IHtcclxuICAgICAgICAgIHRoaXMuaGFuZGxlQ29udGV4dHNDaGFuZ2UoY29udGV4dHMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGNvbnRleHRzJCQgPSB0aGlzLmNvbnRleHRzJC5zdWJzY3JpYmUoKGNvbnRleHRzKSA9PiB7XHJcbiAgICAgICAgICBpZiAoY29udGV4dHMkJCkge1xyXG4gICAgICAgICAgICBjb250ZXh0cyQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ29udGV4dHNDaGFuZ2UoY29udGV4dHMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubG9hZENvbnRleHRzKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0KHBlcm1pc3Npb25zPzogc3RyaW5nW10sIGhpZGRlbj86IGJvb2xlYW4pOiBPYnNlcnZhYmxlPENvbnRleHRzTGlzdD4ge1xyXG4gICAgbGV0IHVybCA9IHRoaXMuYmFzZVVybCArICcvY29udGV4dHMnO1xyXG4gICAgaWYgKHBlcm1pc3Npb25zICYmIHRoaXMuYXV0aFNlcnZpY2UuYXV0aGVudGljYXRlZCkge1xyXG4gICAgICB1cmwgKz0gJz9wZXJtaXNzaW9uPScgKyBwZXJtaXNzaW9ucy5qb2luKCk7XHJcbiAgICAgIGlmIChoaWRkZW4pIHtcclxuICAgICAgICB1cmwgKz0gJyZoaWRkZW49dHJ1ZSc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PENvbnRleHRzTGlzdD4odXJsKTtcclxuICB9XHJcblxyXG4gIGdldEJ5SWQoaWQ6IHN0cmluZyk6IE9ic2VydmFibGU8Q29udGV4dD4ge1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5iYXNlVXJsICsgJy9jb250ZXh0cy8nICsgaWQ7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxDb250ZXh0Pih1cmwpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGV0YWlscyhpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxEZXRhaWxlZENvbnRleHQ+IHtcclxuICAgIGNvbnN0IHVybCA9IGAke3RoaXMuYmFzZVVybH0vY29udGV4dHMvJHtpZH0vZGV0YWlsc2A7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxEZXRhaWxlZENvbnRleHQ+KHVybCkucGlwZShcclxuICAgICAgY2F0Y2hFcnJvcigocmVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlRXJyb3IocmVzLCBpZCk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGVmYXVsdCgpOiBPYnNlcnZhYmxlPERldGFpbGVkQ29udGV4dD4ge1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5iYXNlVXJsICsgJy9jb250ZXh0cy9kZWZhdWx0JztcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PERldGFpbGVkQ29udGV4dD4odXJsKS5waXBlKFxyXG4gICAgICB0YXAoKGNvbnRleHQpID0+IHtcclxuICAgICAgICB0aGlzLmRlZmF1bHRDb250ZXh0SWQkLm5leHQoY29udGV4dC5pZCk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0UHJvZmlsQnlVc2VyKCk6IE9ic2VydmFibGU8Q29udGV4dFByb2ZpbHNbXT4ge1xyXG4gICAgaWYgKHRoaXMuYmFzZVVybCkge1xyXG4gICAgICBjb25zdCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnL3Byb2ZpbHM/JztcclxuICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8Q29udGV4dFByb2ZpbHNbXT4odXJsKTtcclxuICAgIH1cclxuICAgIHJldHVybiBvZihbXSk7XHJcbiAgfVxyXG5cclxuICBzZXREZWZhdWx0KGlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5iYXNlVXJsICsgJy9jb250ZXh0cy9kZWZhdWx0JztcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIHsgZGVmYXVsdENvbnRleHRJZDogaWQgfSk7XHJcbiAgfVxyXG5cclxuICBoaWRlQ29udGV4dChpZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnL2NvbnRleHRzLycgKyBpZCArICcvaGlkZSc7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCB7fSk7XHJcbiAgfVxyXG5cclxuICBzaG93Q29udGV4dChpZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnL2NvbnRleHRzLycgKyBpZCArICcvc2hvdyc7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCB7fSk7XHJcbiAgfVxyXG5cclxuICBkZWxldGUoaWQ6IHN0cmluZywgaW1wb3J0ZWQgPSBmYWxzZSk6IE9ic2VydmFibGU8dm9pZD4ge1xyXG4gICAgY29uc3QgY29udGV4dHM6IENvbnRleHRzTGlzdCA9IHsgb3VyczogW10gfTtcclxuICAgIE9iamVjdC5rZXlzKHRoaXMuY29udGV4dHMkLnZhbHVlKS5mb3JFYWNoKFxyXG4gICAgICAoa2V5KSA9PlxyXG4gICAgICAgIChjb250ZXh0c1trZXldID0gdGhpcy5jb250ZXh0cyQudmFsdWVba2V5XS5maWx0ZXIoKGMpID0+IGMuaWQgIT09IGlkKSlcclxuICAgICk7XHJcblxyXG4gICAgaWYgKGltcG9ydGVkKSB7XHJcbiAgICAgIHRoaXMuaW1wb3J0ZWRDb250ZXh0ID0gdGhpcy5pbXBvcnRlZENvbnRleHQuZmlsdGVyKChjKSA9PiBjLmlkICE9PSBpZCk7XHJcbiAgICAgIHJldHVybiBvZih0aGlzLmNvbnRleHRzJC5uZXh0KGNvbnRleHRzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXJsID0gdGhpcy5iYXNlVXJsICsgJy9jb250ZXh0cy8nICsgaWQ7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZTx2b2lkPih1cmwpLnBpcGUoXHJcbiAgICAgIHRhcCgocmVzKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0cyQubmV4dChjb250ZXh0cyk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKGNvbnRleHQ6IERldGFpbGVkQ29udGV4dCk6IE9ic2VydmFibGU8Q29udGV4dD4ge1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5iYXNlVXJsICsgJy9jb250ZXh0cyc7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8Q29udGV4dD4odXJsLCBKU09OLnN0cmluZ2lmeShjb250ZXh0KSkucGlwZShcclxuICAgICAgbWFwKChjb250ZXh0Q3JlYXRlZCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmF1dGhTZXJ2aWNlLmF1dGhlbnRpY2F0ZWQpIHtcclxuICAgICAgICAgIGNvbnRleHRDcmVhdGVkLnBlcm1pc3Npb24gPSBUeXBlUGVybWlzc2lvbltUeXBlUGVybWlzc2lvbi53cml0ZV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnRleHRDcmVhdGVkLnBlcm1pc3Npb24gPSBUeXBlUGVybWlzc2lvbltUeXBlUGVybWlzc2lvbi5yZWFkXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb250ZXh0cyQudmFsdWUub3Vycy51bnNoaWZ0KGNvbnRleHRDcmVhdGVkKTtcclxuICAgICAgICB0aGlzLmNvbnRleHRzJC5uZXh0KHRoaXMuY29udGV4dHMkLnZhbHVlKTtcclxuICAgICAgICByZXR1cm4gY29udGV4dENyZWF0ZWQ7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgY2xvbmUoaWQ6IHN0cmluZywgcHJvcGVydGllcyA9IHt9KTogT2JzZXJ2YWJsZTxDb250ZXh0PiB7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnL2NvbnRleHRzLycgKyBpZCArICcvY2xvbmUnO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PENvbnRleHQ+KHVybCwgSlNPTi5zdHJpbmdpZnkocHJvcGVydGllcykpLnBpcGUoXHJcbiAgICAgIG1hcCgoY29udGV4dENsb25lZCkgPT4ge1xyXG4gICAgICAgIGNvbnRleHRDbG9uZWQucGVybWlzc2lvbiA9IFR5cGVQZXJtaXNzaW9uW1R5cGVQZXJtaXNzaW9uLndyaXRlXTtcclxuICAgICAgICB0aGlzLmNvbnRleHRzJC52YWx1ZS5vdXJzLnVuc2hpZnQoY29udGV4dENsb25lZCk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0cyQubmV4dCh0aGlzLmNvbnRleHRzJC52YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRleHRDbG9uZWQ7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKGlkOiBzdHJpbmcsIGNvbnRleHQ6IENvbnRleHQpOiBPYnNlcnZhYmxlPENvbnRleHQ+IHtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuYmFzZVVybCArICcvY29udGV4dHMvJyArIGlkO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wYXRjaDxDb250ZXh0Pih1cmwsIEpTT04uc3RyaW5naWZ5KGNvbnRleHQpKTtcclxuICB9XHJcblxyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gIGFkZFRvb2xBc3NvY2lhdGlvbihjb250ZXh0SWQ6IHN0cmluZywgdG9vbElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcclxuICAgIGNvbnN0IHVybCA9IGAke3RoaXMuYmFzZVVybH0vY29udGV4dHMvJHtjb250ZXh0SWR9L3Rvb2xzYDtcclxuICAgIGNvbnN0IGFzc29jaWF0aW9uID0ge1xyXG4gICAgICB0b29sSWRcclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8dm9pZD4odXJsLCBKU09OLnN0cmluZ2lmeShhc3NvY2lhdGlvbikpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlVG9vbEFzc29jaWF0aW9uKGNvbnRleHRJZDogc3RyaW5nLCB0b29sSWQ6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmJhc2VVcmx9L2NvbnRleHRzLyR7Y29udGV4dElkfS90b29scy8ke3Rvb2xJZH1gO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUodXJsKTtcclxuICB9XHJcblxyXG4gIGdldFBlcm1pc3Npb25zKGlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPENvbnRleHRQZXJtaXNzaW9uW10+IHtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuYmFzZVVybCArICcvY29udGV4dHMvJyArIGlkICsgJy9wZXJtaXNzaW9ucyc7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxDb250ZXh0UGVybWlzc2lvbltdPih1cmwpO1xyXG4gIH1cclxuXHJcbiAgYWRkUGVybWlzc2lvbkFzc29jaWF0aW9uKFxyXG4gICAgY29udGV4dElkOiBzdHJpbmcsXHJcbiAgICBwcm9maWw6IHN0cmluZyxcclxuICAgIHR5cGU6IFR5cGVQZXJtaXNzaW9uXHJcbiAgKTogT2JzZXJ2YWJsZTxDb250ZXh0UGVybWlzc2lvbltdIHwgTWVzc2FnZVtdPiB7XHJcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmJhc2VVcmx9L2NvbnRleHRzLyR7Y29udGV4dElkfS9wZXJtaXNzaW9uc2A7XHJcbiAgICBjb25zdCBhc3NvY2lhdGlvbiA9IHtcclxuICAgICAgcHJvZmlsLFxyXG4gICAgICB0eXBlUGVybWlzc2lvbjogdHlwZVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5wb3N0PENvbnRleHRQZXJtaXNzaW9uW10+KHVybCwgSlNPTi5zdHJpbmdpZnkoYXNzb2NpYXRpb24pKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBjYXRjaEVycm9yKChyZXMpID0+IHtcclxuICAgICAgICAgIHJldHVybiBbdGhpcy5oYW5kbGVFcnJvcihyZXMsIHVuZGVmaW5lZCwgdHJ1ZSldO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVQZXJtaXNzaW9uQXNzb2NpYXRpb24oXHJcbiAgICBjb250ZXh0SWQ6IHN0cmluZyxcclxuICAgIHBlcm1pc3Npb25JZDogc3RyaW5nXHJcbiAgKTogT2JzZXJ2YWJsZTx2b2lkPiB7XHJcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmJhc2VVcmx9L2NvbnRleHRzLyR7Y29udGV4dElkfS9wZXJtaXNzaW9ucy8ke3Blcm1pc3Npb25JZH1gO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGU8dm9pZD4odXJsKTtcclxuICB9XHJcblxyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgZ2V0TG9jYWxDb250ZXh0cygpOiBPYnNlcnZhYmxlPENvbnRleHRzTGlzdD4ge1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5nZXRQYXRoKHRoaXMub3B0aW9ucy5jb250ZXh0TGlzdEZpbGUpO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8Q29udGV4dHNMaXN0Pih1cmwpLnBpcGUoXHJcbiAgICAgIG1hcCgocmVzOiBhbnkpID0+IHtcclxuICAgICAgICByZXR1cm4geyBvdXJzOiByZXMgfTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXRMb2NhbENvbnRleHQodXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPERldGFpbGVkQ29udGV4dD4ge1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5nZXRQYXRoKGAke3VyaX0uanNvbmApO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8RGV0YWlsZWRDb250ZXh0Pih1cmwpLnBpcGUoXHJcbiAgICAgIGZsYXRNYXAoKHJlcykgPT4ge1xyXG4gICAgICAgIGlmICghcmVzLmJhc2UpIHtcclxuICAgICAgICAgIHJldHVybiBvZihyZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB1cmxCYXNlID0gdGhpcy5nZXRQYXRoKGAke3Jlcy5iYXNlfS5qc29uYCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8RGV0YWlsZWRDb250ZXh0Pih1cmxCYXNlKS5waXBlKFxyXG4gICAgICAgICAgbWFwKChyZXNCYXNlOiBEZXRhaWxlZENvbnRleHQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzTWVyZ2UgPSByZXM7XHJcbiAgICAgICAgICAgIHJlc01lcmdlLm1hcCA9IE9iamVjdFV0aWxzLm1lcmdlRGVlcChyZXNCYXNlLm1hcCwgcmVzLm1hcCk7XHJcbiAgICAgICAgICAgIHJlc01lcmdlLmxheWVycyA9IChyZXNCYXNlLmxheWVycyB8fCBbXSlcclxuICAgICAgICAgICAgICAuY29uY2F0KHJlcy5sYXllcnMgfHwgW10pXHJcbiAgICAgICAgICAgICAgLnJldmVyc2UoKVxyXG4gICAgICAgICAgICAgIC5maWx0ZXIoXHJcbiAgICAgICAgICAgICAgICAobCwgaW5kZXgsIHNlbGYpID0+XHJcbiAgICAgICAgICAgICAgICAgICFsLmlkIHx8IHNlbGYuZmluZEluZGV4KChsMikgPT4gbDIuaWQgPT09IGwuaWQpID09PSBpbmRleFxyXG4gICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICByZXNNZXJnZS50b29sYmFyID0gcmVzLnRvb2xiYXIgfHwgcmVzQmFzZS50b29sYmFyO1xyXG4gICAgICAgICAgICByZXNNZXJnZS50b29scyA9IChyZXMudG9vbHMgfHwgW10pXHJcbiAgICAgICAgICAgICAgLmNvbmNhdChyZXNCYXNlLnRvb2xzIHx8IFtdKVxyXG4gICAgICAgICAgICAgIC5maWx0ZXIoXHJcbiAgICAgICAgICAgICAgICAodCwgaW5kZXgsIHNlbGYpID0+XHJcbiAgICAgICAgICAgICAgICAgIHNlbGYuZmluZEluZGV4KCh0MikgPT4gdDIubmFtZSA9PT0gdC5uYW1lKSA9PT0gaW5kZXhcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzTWVyZ2U7XHJcbiAgICAgICAgICB9KSxcclxuICAgICAgICAgIGNhdGNoRXJyb3IoKGVycikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIHVyaSk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0pLFxyXG4gICAgICBjYXRjaEVycm9yKChlcnIyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlRXJyb3IoZXJyMiwgdXJpKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBsb2FkQ29udGV4dHMocGVybWlzc2lvbnM/OiBzdHJpbmdbXSwgaGlkZGVuPzogYm9vbGVhbikge1xyXG4gICAgbGV0IHJlcXVlc3Q7XHJcbiAgICBpZiAodGhpcy5iYXNlVXJsKSB7XHJcbiAgICAgIHJlcXVlc3QgPSB0aGlzLmdldChwZXJtaXNzaW9ucywgaGlkZGVuKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlcXVlc3QgPSB0aGlzLmdldExvY2FsQ29udGV4dHMoKTtcclxuICAgIH1cclxuICAgIHJlcXVlc3Quc3Vic2NyaWJlKChjb250ZXh0cykgPT4ge1xyXG4gICAgICBjb250ZXh0cy5vdXJzID0gdGhpcy5pbXBvcnRlZENvbnRleHQuY29uY2F0KGNvbnRleHRzLm91cnMpO1xyXG4gICAgICB0aGlzLmNvbnRleHRzJC5uZXh0KGNvbnRleHRzKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbG9hZERlZmF1bHRDb250ZXh0KCkge1xyXG4gICAgY29uc3QgbG9hZEZjdCA9IChkaXJlY3QgPSBmYWxzZSkgPT4ge1xyXG4gICAgICBpZiAoIWRpcmVjdCAmJiB0aGlzLmJhc2VVcmwgJiYgdGhpcy5hdXRoU2VydmljZS5hdXRoZW50aWNhdGVkKSB7XHJcbiAgICAgICAgdGhpcy5nZXREZWZhdWx0KCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgKF9jb250ZXh0OiBEZXRhaWxlZENvbnRleHQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0Q29udGV4dFVyaSA9IF9jb250ZXh0LnVyaTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDb250ZXh0VG9MaXN0KF9jb250ZXh0KTtcclxuICAgICAgICAgICAgdGhpcy5zZXRDb250ZXh0KF9jb250ZXh0KTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdENvbnRleHRJZCQubmV4dCh1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRDb250ZXh0KHRoaXMuZGVmYXVsdENvbnRleHRVcmkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5sb2FkQ29udGV4dCh0aGlzLmRlZmF1bHRDb250ZXh0VXJpKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAodGhpcy5yb3V0ZSAmJiB0aGlzLnJvdXRlLm9wdGlvbnMuY29udGV4dEtleSkge1xyXG4gICAgICB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zLnBpcGUoZGVib3VuY2VUaW1lKDEwMCkpLnN1YnNjcmliZSgocGFyYW1zKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29udGV4dFBhcmFtID0gcGFyYW1zW3RoaXMucm91dGUub3B0aW9ucy5jb250ZXh0S2V5IGFzIHN0cmluZ107XHJcbiAgICAgICAgbGV0IGRpcmVjdCA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChjb250ZXh0UGFyYW0pIHtcclxuICAgICAgICAgIHRoaXMuZGVmYXVsdENvbnRleHRVcmkgPSBjb250ZXh0UGFyYW07XHJcbiAgICAgICAgICBkaXJlY3QgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsb2FkRmN0KGRpcmVjdCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbG9hZEZjdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbG9hZENvbnRleHQodXJpOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNvbnRleHQkLnZhbHVlO1xyXG5cclxuICAgIGlmIChjb250ZXh0ICYmIGNvbnRleHQudXJpID09PSB1cmkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNvbnRleHRzJCQgPSB0aGlzLmdldENvbnRleHRCeVVyaSh1cmkpLnN1YnNjcmliZShcclxuICAgICAgKF9jb250ZXh0OiBEZXRhaWxlZENvbnRleHQpID0+IHtcclxuICAgICAgICBpZiAoY29udGV4dHMkJCkge1xyXG4gICAgICAgICAgY29udGV4dHMkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkZENvbnRleHRUb0xpc3QoX2NvbnRleHQpO1xyXG4gICAgICAgIHRoaXMuc2V0Q29udGV4dChfY29udGV4dCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIChlcnIpID0+IHtcclxuICAgICAgICBpZiAoY29udGV4dHMkJCkge1xyXG4gICAgICAgICAgY29udGV4dHMkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodXJpICE9PSB0aGlzLm9wdGlvbnMuZGVmYXVsdENvbnRleHRVcmkpIHtcclxuICAgICAgICAgIHRoaXMubG9hZENvbnRleHQodGhpcy5vcHRpb25zLmRlZmF1bHRDb250ZXh0VXJpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBzZXRDb250ZXh0KGNvbnRleHQ6IERldGFpbGVkQ29udGV4dCkge1xyXG4gICAgdGhpcy5oYW5kbGVDb250ZXh0TWVzc2FnZShjb250ZXh0KTtcclxuICAgIGNvbnN0IGN1cnJlbnRDb250ZXh0ID0gdGhpcy5jb250ZXh0JC52YWx1ZTtcclxuICAgIGlmIChjdXJyZW50Q29udGV4dCAmJiBjb250ZXh0ICYmIGNvbnRleHQuaWQgPT09IGN1cnJlbnRDb250ZXh0LmlkKSB7XHJcbiAgICAgIGlmIChjb250ZXh0Lm1hcC52aWV3LmtlZXBDdXJyZW50VmlldyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY29udGV4dC5tYXAudmlldy5rZWVwQ3VycmVudFZpZXcgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY29udGV4dCQubmV4dChjb250ZXh0KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghY29udGV4dC5tYXApIHtcclxuICAgICAgY29udGV4dC5tYXAgPSB7IHZpZXc6IHt9IH07XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmFzc2lnbihjb250ZXh0Lm1hcC52aWV3LCB0aGlzLm1hcFZpZXdGcm9tUm91dGUpO1xyXG5cclxuICAgIHRoaXMuY29udGV4dCQubmV4dChjb250ZXh0KTtcclxuICB9XHJcblxyXG4gIGxvYWRFZGl0ZWRDb250ZXh0KHVyaTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmdldENvbnRleHRCeVVyaSh1cmkpLnN1YnNjcmliZSgoX2NvbnRleHQ6IERldGFpbGVkQ29udGV4dCkgPT4ge1xyXG4gICAgICB0aGlzLnNldEVkaXRlZENvbnRleHQoX2NvbnRleHQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRFZGl0ZWRDb250ZXh0KGNvbnRleHQ6IERldGFpbGVkQ29udGV4dCkge1xyXG4gICAgdGhpcy5lZGl0ZWRDb250ZXh0JC5uZXh0KGNvbnRleHQpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29udGV4dEZyb21NYXAoaWdvTWFwOiBJZ29NYXAsIGVtcHR5PzogYm9vbGVhbik6IERldGFpbGVkQ29udGV4dCB7XHJcbiAgICBjb25zdCB2aWV3ID0gaWdvTWFwLm9sLmdldFZpZXcoKTtcclxuICAgIGNvbnN0IHByb2ogPSB2aWV3LmdldFByb2plY3Rpb24oKS5nZXRDb2RlKCk7XHJcbiAgICBjb25zdCBjZW50ZXI6IGFueSA9IG5ldyBvbFBvaW50KHZpZXcuZ2V0Q2VudGVyKCkpLnRyYW5zZm9ybShcclxuICAgICAgcHJvaixcclxuICAgICAgJ0VQU0c6NDMyNidcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgY29udGV4dCA9IHtcclxuICAgICAgdXJpOiB1dWlkKCksXHJcbiAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgc2NvcGU6ICdwcml2YXRlJyxcclxuICAgICAgbWFwOiB7XHJcbiAgICAgICAgdmlldzoge1xyXG4gICAgICAgICAgY2VudGVyOiBjZW50ZXIuZ2V0Q29vcmRpbmF0ZXMoKSxcclxuICAgICAgICAgIHpvb206IHZpZXcuZ2V0Wm9vbSgpLFxyXG4gICAgICAgICAgcHJvamVjdGlvbjogcHJvaixcclxuICAgICAgICAgIG1heFpvb21PbkV4dGVudDogaWdvTWFwLnZpZXdDb250cm9sbGVyLm1heFpvb21PbkV4dGVudFxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgbGF5ZXJzOiBbXSxcclxuICAgICAgdG9vbHM6IFtdXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBsYXllcnMgPSBbXTtcclxuICAgIGlmIChlbXB0eSA9PT0gdHJ1ZSkge1xyXG4gICAgICBsYXllcnMgPSBpZ29NYXAubGF5ZXJzJFxyXG4gICAgICAgIC5nZXRWYWx1ZSgpXHJcbiAgICAgICAgLmZpbHRlcihcclxuICAgICAgICAgIChsYXkpID0+XHJcbiAgICAgICAgICAgIGxheS5iYXNlTGF5ZXIgPT09IHRydWUgfHxcclxuICAgICAgICAgICAgbGF5Lm9wdGlvbnMuaWQgPT09ICdzZWFyY2hQb2ludGVyU3VtbWFyeUlkJ1xyXG4gICAgICAgIClcclxuICAgICAgICAuc29ydCgoYSwgYikgPT4gYS56SW5kZXggLSBiLnpJbmRleCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsYXllcnMgPSBpZ29NYXAubGF5ZXJzJC5nZXRWYWx1ZSgpLnNvcnQoKGEsIGIpID0+IGEuekluZGV4IC0gYi56SW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBpID0gMDtcclxuICAgIGZvciAoY29uc3QgbCBvZiBsYXllcnMpIHtcclxuICAgICAgY29uc3QgbGF5ZXI6IGFueSA9IGw7XHJcbiAgICAgIGNvbnN0IG9wdHMgPSB7XHJcbiAgICAgICAgaWQ6IGxheWVyLm9wdGlvbnMuaWQgPyBTdHJpbmcobGF5ZXIub3B0aW9ucy5pZCkgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgbGF5ZXJPcHRpb25zOiB7XHJcbiAgICAgICAgICB0aXRsZTogbGF5ZXIub3B0aW9ucy50aXRsZSxcclxuICAgICAgICAgIHpJbmRleDogKytpLFxyXG4gICAgICAgICAgdmlzaWJsZTogbGF5ZXIudmlzaWJsZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc291cmNlT3B0aW9uczoge1xyXG4gICAgICAgICAgdHlwZTogbGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zLnR5cGUsXHJcbiAgICAgICAgICBwYXJhbXM6IGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucy5wYXJhbXMsXHJcbiAgICAgICAgICB1cmw6IGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucy51cmwsXHJcbiAgICAgICAgICBxdWVyeWFibGU6IGxheWVyLnF1ZXJ5YWJsZVxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgaWYgKG9wdHMuc291cmNlT3B0aW9ucy50eXBlKSB7XHJcbiAgICAgICAgY29udGV4dC5sYXllcnMucHVzaChvcHRzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnRleHQudG9vbHMgPSB0aGlzLnRvb2xzLm1hcCgodG9vbCkgPT4ge1xyXG4gICAgICByZXR1cm4geyBpZDogU3RyaW5nKHRvb2wuaWQpLCBnbG9iYWw6IHRvb2wuZ2xvYmFsIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gY29udGV4dDtcclxuICB9XHJcblxyXG4gIGdldENvbnRleHRGcm9tTGF5ZXJzKFxyXG4gICAgaWdvTWFwOiBJZ29NYXAsXHJcbiAgICBsYXllcnM6IExheWVyW10sXHJcbiAgICBuYW1lOiBzdHJpbmdcclxuICApOiBEZXRhaWxlZENvbnRleHQge1xyXG4gICAgY29uc3QgY3VycmVudENvbnRleHQgPSB0aGlzLmNvbnRleHQkLmdldFZhbHVlKCk7XHJcbiAgICBjb25zdCB2aWV3ID0gaWdvTWFwLm9sLmdldFZpZXcoKTtcclxuICAgIGNvbnN0IHByb2ogPSB2aWV3LmdldFByb2plY3Rpb24oKS5nZXRDb2RlKCk7XHJcbiAgICBjb25zdCBjZW50ZXI6IGFueSA9IG5ldyBvbFBvaW50KHZpZXcuZ2V0Q2VudGVyKCkpLnRyYW5zZm9ybShcclxuICAgICAgcHJvaixcclxuICAgICAgJ0VQU0c6NDMyNidcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgY29udGV4dCA9IHtcclxuICAgICAgdXJpOiBuYW1lLFxyXG4gICAgICB0aXRsZTogbmFtZSxcclxuICAgICAgbWFwOiB7XHJcbiAgICAgICAgdmlldzoge1xyXG4gICAgICAgICAgY2VudGVyOiBjZW50ZXIuZ2V0Q29vcmRpbmF0ZXMoKSxcclxuICAgICAgICAgIHpvb206IHZpZXcuZ2V0Wm9vbSgpLFxyXG4gICAgICAgICAgcHJvamVjdGlvbjogcHJvalxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgbGF5ZXJzOiBbXSxcclxuICAgICAgdG9vbGJhcjogW10sXHJcbiAgICAgIHRvb2xzOiBbXSxcclxuICAgICAgZXh0cmFGZWF0dXJlczogW11cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgY3VycmVudExheWVycyA9IGlnb01hcC5sYXllcnMkLmdldFZhbHVlKCk7XHJcbiAgICBjb250ZXh0LmxheWVycyA9IGN1cnJlbnRMYXllcnNcclxuICAgICAgLmZpbHRlcigobCkgPT4gbC5iYXNlTGF5ZXIpXHJcbiAgICAgIC5tYXAoKGwpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgYmFzZUxheWVyOiB0cnVlLFxyXG4gICAgICAgICAgc291cmNlT3B0aW9uczogbC5vcHRpb25zLnNvdXJjZU9wdGlvbnMsXHJcbiAgICAgICAgICB0aXRsZTogbC5vcHRpb25zLnRpdGxlLFxyXG4gICAgICAgICAgdmlzaWJsZTogbC52aXNpYmxlXHJcbiAgICAgICAgfTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgbGF5ZXJzLmZvckVhY2goKGxheWVyKSA9PiB7XHJcbiAgICAgIGNvbnN0IGxheWVyRm91bmQgPSBjdXJyZW50Q29udGV4dC5sYXllcnMuZmluZChcclxuICAgICAgICAoY29udGV4dExheWVyKSA9PlxyXG4gICAgICAgICAgbGF5ZXIuaWQgPT09IGNvbnRleHRMYXllci5zb3VyY2UuaWQgJiYgIWNvbnRleHRMYXllci5iYXNlTGF5ZXJcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGlmIChsYXllckZvdW5kKSB7XHJcbiAgICAgICAgbGV0IGxheWVyU3R5bGUgPSBsYXllckZvdW5kW2BzdHlsZWBdO1xyXG4gICAgICAgIGlmIChsYXllckZvdW5kW2BzdHlsZUJ5QXR0cmlidXRlYF0pIHtcclxuICAgICAgICAgIGxheWVyU3R5bGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsYXllckZvdW5kW2BjbHVzdGVyQmFzZVN0eWxlYF0pIHtcclxuICAgICAgICAgIGxheWVyU3R5bGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICBkZWxldGUgbGF5ZXJGb3VuZC5zb3VyY2VPcHRpb25zW2Bzb3VyY2VgXTtcclxuICAgICAgICAgIGRlbGV0ZSBsYXllckZvdW5kLnNvdXJjZU9wdGlvbnNbYGZvcm1hdGBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBvcHRzID0ge1xyXG4gICAgICAgICAgYmFzZUxheWVyOiBsYXllckZvdW5kLmJhc2VMYXllcixcclxuICAgICAgICAgIHRpdGxlOiBsYXllci5vcHRpb25zLnRpdGxlLFxyXG4gICAgICAgICAgekluZGV4OiBsYXllci56SW5kZXgsXHJcbiAgICAgICAgICBzdHlsZUJ5QXR0cmlidXRlOiBsYXllckZvdW5kW2BzdHlsZUJ5QXR0cmlidXRlYF0sXHJcbiAgICAgICAgICBjbHVzdGVyQmFzZVN0eWxlOiBsYXllckZvdW5kW2BjbHVzdGVyQmFzZVN0eWxlYF0sXHJcbiAgICAgICAgICBzdHlsZTogbGF5ZXJTdHlsZSxcclxuICAgICAgICAgIGNsdXN0ZXJQYXJhbTogbGF5ZXJGb3VuZFtgY2x1c3RlclBhcmFtYF0sXHJcbiAgICAgICAgICB2aXNpYmxlOiBsYXllci52aXNpYmxlLFxyXG4gICAgICAgICAgb3BhY2l0eTogbGF5ZXIub3BhY2l0eSxcclxuICAgICAgICAgIHNvdXJjZU9wdGlvbnM6IGxheWVyRm91bmQuc291cmNlT3B0aW9uc1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29udGV4dC5sYXllcnMucHVzaChvcHRzKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAobGF5ZXIub2wudHlwZSAhPT0gJ1ZFQ1RPUicpIHtcclxuICAgICAgICAgIGNvbnN0IGNhdGFsb2dMYXllciA9IGxheWVyLm9wdGlvbnM7XHJcbiAgICAgICAgICBkZWxldGUgY2F0YWxvZ0xheWVyLnNvdXJjZTtcclxuICAgICAgICAgIGNvbnRleHQubGF5ZXJzLnB1c2goY2F0YWxvZ0xheWVyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbGV0IGZlYXR1cmVzO1xyXG4gICAgICAgICAgY29uc3Qgd3JpdGVyID0gbmV3IEdlb0pTT04oKTtcclxuICAgICAgICAgIGlmIChsYXllci5vbC5nZXRTb3VyY2UoKSBpbnN0YW5jZW9mIENsdXN0ZXIpIHtcclxuICAgICAgICAgICAgZmVhdHVyZXMgPSB3cml0ZXIud3JpdGVGZWF0dXJlcyhcclxuICAgICAgICAgICAgICBsYXllci5vbC5nZXRTb3VyY2UoKS5nZXRTb3VyY2UoKS5nZXRGZWF0dXJlcygpLFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRhdGFQcm9qZWN0aW9uOiAnRVBTRzo0MzI2JyxcclxuICAgICAgICAgICAgICAgIGZlYXR1cmVQcm9qZWN0aW9uOiAnRVBTRzozODU3J1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZlYXR1cmVzID0gd3JpdGVyLndyaXRlRmVhdHVyZXMoXHJcbiAgICAgICAgICAgICAgbGF5ZXIub2wuZ2V0U291cmNlKCkuZ2V0RmVhdHVyZXMoKSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkYXRhUHJvamVjdGlvbjogJ0VQU0c6NDMyNicsXHJcbiAgICAgICAgICAgICAgICBmZWF0dXJlUHJvamVjdGlvbjogJ0VQU0c6Mzg1NydcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBmZWF0dXJlcyA9IEpTT04ucGFyc2UoZmVhdHVyZXMpO1xyXG4gICAgICAgICAgZmVhdHVyZXMubmFtZSA9IGxheWVyLm9wdGlvbnMudGl0bGU7XHJcbiAgICAgICAgICBjb250ZXh0LmV4dHJhRmVhdHVyZXMucHVzaChmZWF0dXJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb250ZXh0LnRvb2xiYXIgPSB0aGlzLnRvb2xiYXI7XHJcbiAgICBjb250ZXh0LnRvb2xzID0gdGhpcy50b29scztcclxuXHJcbiAgICByZXR1cm4gY29udGV4dDtcclxuICB9XHJcblxyXG4gIHNldFRvb2xzKHRvb2xzOiBUb29sW10pIHtcclxuICAgIHRoaXMudG9vbHMgPSB0b29scztcclxuICB9XHJcblxyXG4gIHNldFRvb2xiYXIodG9vbGJhcjogc3RyaW5nW10pIHtcclxuICAgIHRoaXMudG9vbGJhciA9IHRvb2xiYXI7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUNvbnRleHRNZXNzYWdlKGNvbnRleHQ6IERldGFpbGVkQ29udGV4dCkge1xyXG4gICAgaWYgKHRoaXMuY29udGV4dE1lc3NhZ2UpIHtcclxuICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5yZW1vdmUodGhpcy5jb250ZXh0TWVzc2FnZS5pZCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBtZXNzYWdlID0gY29udGV4dC5tZXNzYWdlO1xyXG4gICAgaWYgKG1lc3NhZ2UpIHtcclxuICAgICAgbWVzc2FnZS50aXRsZSA9IG1lc3NhZ2UudGl0bGVcclxuICAgICAgICA/IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KG1lc3NhZ2UudGl0bGUpXHJcbiAgICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgICAgIG1lc3NhZ2UudGV4dCA9IG1lc3NhZ2UudGV4dFxyXG4gICAgICAgID8gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQobWVzc2FnZS50ZXh0KVxyXG4gICAgICAgIDogdW5kZWZpbmVkO1xyXG4gICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLm1lc3NhZ2UobWVzc2FnZSBhcyBNZXNzYWdlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0Q29udGV4dEJ5VXJpKHVyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxEZXRhaWxlZENvbnRleHQ+IHtcclxuICAgIGlmICh0aGlzLmJhc2VVcmwpIHtcclxuICAgICAgbGV0IGNvbnRleHRUb0xvYWQ7XHJcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHRoaXMuY29udGV4dHMkLnZhbHVlKSkge1xyXG4gICAgICAgIGNvbnRleHRUb0xvYWQgPSB0aGlzLmNvbnRleHRzJC52YWx1ZVtrZXldLmZpbmQoKGMpID0+IHtcclxuICAgICAgICAgIHJldHVybiBjLnVyaSA9PT0gdXJpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChjb250ZXh0VG9Mb2FkKSB7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjb250ZXh0VG9Mb2FkICYmIGNvbnRleHRUb0xvYWQuaW1wb3J0ZWQpIHtcclxuICAgICAgICByZXR1cm4gb2YoY29udGV4dFRvTG9hZCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFRPRE8gOiB1c2UgYWx3YXlzIGlkIG9yIHVyaVxyXG4gICAgICBjb25zdCBpZCA9IGNvbnRleHRUb0xvYWQgPyBjb250ZXh0VG9Mb2FkLmlkIDogdXJpO1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXREZXRhaWxzKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpbXBvcnRlZENvbnRleHQgPSB0aGlzLmNvbnRleHRzJC52YWx1ZS5vdXJzLmZpbmQoKGN1cnJlbnRDb250ZXh0KSA9PiB7XHJcbiAgICAgIHJldHVybiBjdXJyZW50Q29udGV4dC51cmkgPT09IHVyaSAmJiBjdXJyZW50Q29udGV4dC5pbXBvcnRlZCA9PT0gdHJ1ZTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChpbXBvcnRlZENvbnRleHQpIHtcclxuICAgICAgcmV0dXJuIG9mKGltcG9ydGVkQ29udGV4dCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXRMb2NhbENvbnRleHQodXJpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldENvbnRleHRMYXllcnMoaWdvTWFwOiBJZ29NYXApIHtcclxuICAgIGNvbnN0IGxheWVyczogTGF5ZXJbXSA9IFtdO1xyXG4gICAgY29uc3QgbWFwTGF5ZXJzID0gaWdvTWFwLmxheWVycyQuZ2V0VmFsdWUoKTtcclxuICAgIG1hcExheWVycy5mb3JFYWNoKChsYXllcikgPT4ge1xyXG4gICAgICBpZiAoIWxheWVyLmJhc2VMYXllciAmJiBsYXllci5vcHRpb25zLmlkICE9PSAnc2VhcmNoUG9pbnRlclN1bW1hcnlJZCcpIHtcclxuICAgICAgICBsYXllcnMucHVzaChsYXllcik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGxheWVycztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVhZFBhcmFtc0Zyb21Sb3V0ZSgpIHtcclxuICAgIGlmICghdGhpcy5yb3V0ZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yb3V0ZS5xdWVyeVBhcmFtcy5zdWJzY3JpYmUoKHBhcmFtcykgPT4ge1xyXG4gICAgICBjb25zdCBjZW50ZXJLZXkgPSB0aGlzLnJvdXRlLm9wdGlvbnMuY2VudGVyS2V5O1xyXG4gICAgICBpZiAoY2VudGVyS2V5ICYmIHBhcmFtc1tjZW50ZXJLZXkgYXMgc3RyaW5nXSkge1xyXG4gICAgICAgIGNvbnN0IGNlbnRlclBhcmFtcyA9IHBhcmFtc1tjZW50ZXJLZXkgYXMgc3RyaW5nXTtcclxuICAgICAgICB0aGlzLm1hcFZpZXdGcm9tUm91dGUuY2VudGVyID0gY2VudGVyUGFyYW1zLnNwbGl0KCcsJykubWFwKE51bWJlcik7XHJcbiAgICAgICAgdGhpcy5tYXBWaWV3RnJvbVJvdXRlLmdlb2xvY2F0ZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwcm9qZWN0aW9uS2V5ID0gdGhpcy5yb3V0ZS5vcHRpb25zLnByb2plY3Rpb25LZXk7XHJcbiAgICAgIGlmIChwcm9qZWN0aW9uS2V5ICYmIHBhcmFtc1twcm9qZWN0aW9uS2V5IGFzIHN0cmluZ10pIHtcclxuICAgICAgICBjb25zdCBwcm9qZWN0aW9uUGFyYW0gPSBwYXJhbXNbcHJvamVjdGlvbktleSBhcyBzdHJpbmddO1xyXG4gICAgICAgIHRoaXMubWFwVmlld0Zyb21Sb3V0ZS5wcm9qZWN0aW9uID0gcHJvamVjdGlvblBhcmFtO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCB6b29tS2V5ID0gdGhpcy5yb3V0ZS5vcHRpb25zLnpvb21LZXk7XHJcbiAgICAgIGlmICh6b29tS2V5ICYmIHBhcmFtc1t6b29tS2V5IGFzIHN0cmluZ10pIHtcclxuICAgICAgICBjb25zdCB6b29tUGFyYW0gPSBwYXJhbXNbem9vbUtleSBhcyBzdHJpbmddO1xyXG4gICAgICAgIHRoaXMubWFwVmlld0Zyb21Sb3V0ZS56b29tID0gTnVtYmVyKHpvb21QYXJhbSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRQYXRoKGZpbGU6IHN0cmluZykge1xyXG4gICAgY29uc3QgYmFzZVBhdGggPSB0aGlzLm9wdGlvbnMuYmFzZVBhdGgucmVwbGFjZSgvXFwvJC8sICcnKTtcclxuXHJcbiAgICByZXR1cm4gYCR7YmFzZVBhdGh9LyR7ZmlsZX1gO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVFcnJvcihcclxuICAgIGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSxcclxuICAgIHVyaTogc3RyaW5nLFxyXG4gICAgcGVybWlzc2lvbkVycm9yPzogYm9vbGVhblxyXG4gICk6IE1lc3NhZ2VbXSB7XHJcbiAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jb250ZXh0cyQudmFsdWUub3Vycy5maW5kKChvYmopID0+IG9iai51cmkgPT09IHVyaSk7XHJcbiAgICBjb25zdCB0aXRsZUNvbnRleHQgPSBjb250ZXh0ID8gY29udGV4dC50aXRsZSA6IHVyaTtcclxuICAgIGVycm9yLmVycm9yLnRpdGxlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5pbnZhbGlkLnRpdGxlJ1xyXG4gICAgKTtcclxuXHJcbiAgICBlcnJvci5lcnJvci5tZXNzYWdlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5pbnZhbGlkLnRleHQnLFxyXG4gICAgICB7IHZhbHVlOiB0aXRsZUNvbnRleHQgfVxyXG4gICAgKTtcclxuXHJcbiAgICBlcnJvci5lcnJvci50b0Rpc3BsYXkgPSB0cnVlO1xyXG5cclxuICAgIGlmIChwZXJtaXNzaW9uRXJyb3IpIHtcclxuICAgICAgZXJyb3IuZXJyb3IudGl0bGUgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmNvbnRleHQuY29udGV4dE1hbmFnZXIuZXJyb3JzLmFkZFBlcm1pc3Npb25UaXRsZSdcclxuICAgICAgKTtcclxuICAgICAgZXJyb3IuZXJyb3IubWVzc2FnZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5lcnJvcnMuYWRkUGVybWlzc2lvbidcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICB0aHJvdyBlcnJvcjtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlQ29udGV4dHNDaGFuZ2UoXHJcbiAgICBjb250ZXh0czogQ29udGV4dHNMaXN0LFxyXG4gICAga2VlcEN1cnJlbnRDb250ZXh0ID0gdHJ1ZVxyXG4gICkge1xyXG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMuY29udGV4dCQudmFsdWU7XHJcbiAgICBjb25zdCBlZGl0ZWRDb250ZXh0ID0gdGhpcy5lZGl0ZWRDb250ZXh0JC52YWx1ZTtcclxuXHJcbiAgICBpZiAoIWtlZXBDdXJyZW50Q29udGV4dCB8fCAhdGhpcy5maW5kQ29udGV4dChjb250ZXh0KSkge1xyXG4gICAgICB0aGlzLmxvYWREZWZhdWx0Q29udGV4dCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGNvbnRleHQubWFwLnZpZXcua2VlcEN1cnJlbnRWaWV3ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb250ZXh0Lm1hcC52aWV3LmtlZXBDdXJyZW50VmlldyA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jb250ZXh0JC5uZXh0KGNvbnRleHQpO1xyXG4gICAgICBpZiAodGhpcy5iYXNlVXJsICYmIHRoaXMuYXV0aFNlcnZpY2UuYXV0aGVudGljYXRlZCkge1xyXG4gICAgICAgIHRoaXMuZ2V0RGVmYXVsdCgpLnN1YnNjcmliZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBlZGl0ZWRGb3VuZCA9IHRoaXMuZmluZENvbnRleHQoZWRpdGVkQ29udGV4dCk7XHJcbiAgICBpZiAoIWVkaXRlZEZvdW5kIHx8IGVkaXRlZEZvdW5kLnBlcm1pc3Npb24gIT09ICd3cml0ZScpIHtcclxuICAgICAgdGhpcy5zZXRFZGl0ZWRDb250ZXh0KHVuZGVmaW5lZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZENvbnRleHRUb0xpc3QoY29udGV4dDogQ29udGV4dCkge1xyXG4gICAgY29uc3QgY29udGV4dEZvdW5kID0gdGhpcy5maW5kQ29udGV4dChjb250ZXh0KTtcclxuICAgIGlmICghY29udGV4dEZvdW5kKSB7XHJcbiAgICAgIGNvbnN0IGNvbnRleHRTaW1wbGlmaWUgPSB7XHJcbiAgICAgICAgaWQ6IGNvbnRleHQuaWQsXHJcbiAgICAgICAgdXJpOiBjb250ZXh0LnVyaSxcclxuICAgICAgICB0aXRsZTogY29udGV4dC50aXRsZSxcclxuICAgICAgICBzY29wZTogY29udGV4dC5zY29wZSxcclxuICAgICAgICBwZXJtaXNzaW9uOiBUeXBlUGVybWlzc2lvbltUeXBlUGVybWlzc2lvbi5yZWFkXVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKHRoaXMuY29udGV4dHMkLnZhbHVlICYmIHRoaXMuY29udGV4dHMkLnZhbHVlLnB1YmxpYykge1xyXG4gICAgICAgIHRoaXMuY29udGV4dHMkLnZhbHVlLnB1YmxpYy5wdXNoKGNvbnRleHRTaW1wbGlmaWUpO1xyXG4gICAgICAgIHRoaXMuY29udGV4dHMkLm5leHQodGhpcy5jb250ZXh0cyQudmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZpbmRDb250ZXh0KGNvbnRleHQ6IENvbnRleHQpIHtcclxuICAgIGlmICghY29udGV4dCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29udGV4dHMgPSB0aGlzLmNvbnRleHRzJC52YWx1ZTtcclxuICAgIGxldCBmb3VuZDtcclxuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGNvbnRleHRzKSkge1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IGNvbnRleHRzW2tleV07XHJcbiAgICAgIGZvdW5kID0gdmFsdWUuZmluZChcclxuICAgICAgICAoYykgPT5cclxuICAgICAgICAgIChjb250ZXh0LmlkICYmIGMuaWQgPT09IGNvbnRleHQuaWQpIHx8XHJcbiAgICAgICAgICAoY29udGV4dC51cmkgJiYgYy51cmkgPT09IGNvbnRleHQudXJpKVxyXG4gICAgICApO1xyXG4gICAgICBpZiAoZm91bmQpIHtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmb3VuZDtcclxuICB9XHJcbn1cclxuIl19