/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class ContextService {
    /**
     * @param {?} http
     * @param {?} authService
     * @param {?} languageService
     * @param {?} config
     * @param {?} messageService
     * @param {?} route
     */
    constructor(http, authService, languageService, config, messageService, route) {
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
        (authenticated) => {
            if (authenticated && this.baseUrl) {
                this.get().subscribe((/**
                 * @param {?} contexts
                 * @return {?}
                 */
                (contexts) => {
                    this.handleContextsChange(contexts);
                }));
            }
            else {
                /** @type {?} */
                const contexts$$ = this.contexts$.subscribe((/**
                 * @param {?} contexts
                 * @return {?}
                 */
                (contexts) => {
                    if (contexts$$) {
                        contexts$$.unsubscribe();
                        this.handleContextsChange(contexts);
                    }
                }));
                this.loadContexts();
            }
        }));
    }
    /**
     * @return {?}
     */
    get defaultContextUri() {
        return this._defaultContextUri || this.options.defaultContextUri;
    }
    /**
     * @param {?} uri
     * @return {?}
     */
    set defaultContextUri(uri) {
        this._defaultContextUri = uri;
    }
    /**
     * @param {?=} permissions
     * @param {?=} hidden
     * @return {?}
     */
    get(permissions, hidden) {
        /** @type {?} */
        let url = this.baseUrl + '/contexts';
        if (permissions && this.authService.authenticated) {
            url += '?permission=' + permissions.join();
            if (hidden) {
                url += '&hidden=true';
            }
        }
        return this.http.get(url);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    getById(id) {
        /** @type {?} */
        const url = this.baseUrl + '/contexts/' + id;
        return this.http.get(url);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    getDetails(id) {
        /** @type {?} */
        const url = `${this.baseUrl}/contexts/${id}/details`;
        return this.http.get(url).pipe(catchError((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            return this.handleError(res, id);
        })));
    }
    /**
     * @return {?}
     */
    getDefault() {
        /** @type {?} */
        const url = this.baseUrl + '/contexts/default';
        return this.http.get(url).pipe(tap((/**
         * @param {?} context
         * @return {?}
         */
        (context) => {
            this.defaultContextId$.next(context.id);
        })));
    }
    /**
     * @return {?}
     */
    getProfilByUser() {
        if (this.baseUrl) {
            /** @type {?} */
            const url = this.baseUrl + '/profils?';
            return this.http.get(url);
        }
        return of([]);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    setDefault(id) {
        /** @type {?} */
        const url = this.baseUrl + '/contexts/default';
        return this.http.post(url, { defaultContextId: id });
    }
    /**
     * @param {?} id
     * @return {?}
     */
    hideContext(id) {
        /** @type {?} */
        const url = this.baseUrl + '/contexts/' + id + '/hide';
        return this.http.post(url, {});
    }
    /**
     * @param {?} id
     * @return {?}
     */
    showContext(id) {
        /** @type {?} */
        const url = this.baseUrl + '/contexts/' + id + '/show';
        return this.http.post(url, {});
    }
    /**
     * @param {?} id
     * @param {?=} imported
     * @return {?}
     */
    delete(id, imported = false) {
        /** @type {?} */
        const contexts = { ours: [] };
        Object.keys(this.contexts$.value).forEach((/**
         * @param {?} key
         * @return {?}
         */
        (key) => (contexts[key] = this.contexts$.value[key].filter((/**
         * @param {?} c
         * @return {?}
         */
        (c) => c.id !== id)))));
        if (imported) {
            this.importedContext = this.importedContext.filter((/**
             * @param {?} c
             * @return {?}
             */
            (c) => c.id !== id));
            return of(this.contexts$.next(contexts));
        }
        /** @type {?} */
        const url = this.baseUrl + '/contexts/' + id;
        return this.http.delete(url).pipe(tap((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            this.contexts$.next(contexts);
        })));
    }
    /**
     * @param {?} context
     * @return {?}
     */
    create(context) {
        /** @type {?} */
        const url = this.baseUrl + '/contexts';
        return this.http.post(url, JSON.stringify(context)).pipe(map((/**
         * @param {?} contextCreated
         * @return {?}
         */
        (contextCreated) => {
            if (this.authService.authenticated) {
                contextCreated.permission = TypePermission[TypePermission.write];
            }
            else {
                contextCreated.permission = TypePermission[TypePermission.read];
            }
            this.contexts$.value.ours.unshift(contextCreated);
            this.contexts$.next(this.contexts$.value);
            return contextCreated;
        })));
    }
    /**
     * @param {?} id
     * @param {?=} properties
     * @return {?}
     */
    clone(id, properties = {}) {
        /** @type {?} */
        const url = this.baseUrl + '/contexts/' + id + '/clone';
        return this.http.post(url, JSON.stringify(properties)).pipe(map((/**
         * @param {?} contextCloned
         * @return {?}
         */
        (contextCloned) => {
            contextCloned.permission = TypePermission[TypePermission.write];
            this.contexts$.value.ours.unshift(contextCloned);
            this.contexts$.next(this.contexts$.value);
            return contextCloned;
        })));
    }
    /**
     * @param {?} id
     * @param {?} context
     * @return {?}
     */
    update(id, context) {
        /** @type {?} */
        const url = this.baseUrl + '/contexts/' + id;
        return this.http.patch(url, JSON.stringify(context));
    }
    // =================================================================
    /**
     * @param {?} contextId
     * @param {?} toolId
     * @return {?}
     */
    addToolAssociation(contextId, toolId) {
        /** @type {?} */
        const url = `${this.baseUrl}/contexts/${contextId}/tools`;
        /** @type {?} */
        const association = {
            toolId
        };
        return this.http.post(url, JSON.stringify(association));
    }
    /**
     * @param {?} contextId
     * @param {?} toolId
     * @return {?}
     */
    deleteToolAssociation(contextId, toolId) {
        /** @type {?} */
        const url = `${this.baseUrl}/contexts/${contextId}/tools/${toolId}`;
        return this.http.delete(url);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    getPermissions(id) {
        /** @type {?} */
        const url = this.baseUrl + '/contexts/' + id + '/permissions';
        return this.http.get(url);
    }
    /**
     * @param {?} contextId
     * @param {?} profil
     * @param {?} type
     * @return {?}
     */
    addPermissionAssociation(contextId, profil, type) {
        /** @type {?} */
        const url = `${this.baseUrl}/contexts/${contextId}/permissions`;
        /** @type {?} */
        const association = {
            profil,
            typePermission: type
        };
        return this.http
            .post(url, JSON.stringify(association))
            .pipe(catchError((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            return [this.handleError(res, undefined, true)];
        })));
    }
    /**
     * @param {?} contextId
     * @param {?} permissionId
     * @return {?}
     */
    deletePermissionAssociation(contextId, permissionId) {
        /** @type {?} */
        const url = `${this.baseUrl}/contexts/${contextId}/permissions/${permissionId}`;
        return this.http.delete(url);
    }
    // ======================================================================
    /**
     * @return {?}
     */
    getLocalContexts() {
        /** @type {?} */
        const url = this.getPath(this.options.contextListFile);
        return this.http.get(url).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            return { ours: res };
        })));
    }
    /**
     * @param {?} uri
     * @return {?}
     */
    getLocalContext(uri) {
        /** @type {?} */
        const url = this.getPath(`${uri}.json`);
        return this.http.get(url).pipe(flatMap((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            if (!res.base) {
                return of(res);
            }
            /** @type {?} */
            const urlBase = this.getPath(`${res.base}.json`);
            return this.http.get(urlBase).pipe(map((/**
             * @param {?} resBase
             * @return {?}
             */
            (resBase) => {
                /** @type {?} */
                const resMerge = res;
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
                (l, index, self) => !l.id || self.findIndex((/**
                 * @param {?} l2
                 * @return {?}
                 */
                (l2) => l2.id === l.id)) === index))
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
                (t, index, self) => self.findIndex((/**
                 * @param {?} t2
                 * @return {?}
                 */
                (t2) => t2.name === t.name)) === index));
                return resMerge;
            })), catchError((/**
             * @param {?} err
             * @return {?}
             */
            (err) => {
                return this.handleError(err, uri);
            })));
        })), catchError((/**
         * @param {?} err2
         * @return {?}
         */
        (err2) => {
            return this.handleError(err2, uri);
        })));
    }
    /**
     * @param {?=} permissions
     * @param {?=} hidden
     * @return {?}
     */
    loadContexts(permissions, hidden) {
        /** @type {?} */
        let request;
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
        (contexts) => {
            contexts.ours = this.importedContext.concat(contexts.ours);
            this.contexts$.next(contexts);
        }));
    }
    /**
     * @return {?}
     */
    loadDefaultContext() {
        /** @type {?} */
        const loadFct = (/**
         * @param {?=} direct
         * @return {?}
         */
        (direct = false) => {
            if (!direct && this.baseUrl && this.authService.authenticated) {
                this.getDefault().subscribe((/**
                 * @param {?} _context
                 * @return {?}
                 */
                (_context) => {
                    this.defaultContextUri = _context.uri;
                    this.addContextToList(_context);
                    this.setContext(_context);
                }), (/**
                 * @return {?}
                 */
                () => {
                    this.defaultContextId$.next(undefined);
                    this.loadContext(this.defaultContextUri);
                }));
            }
            else {
                this.loadContext(this.defaultContextUri);
            }
        });
        if (this.route && this.route.options.contextKey) {
            this.route.queryParams.pipe(debounceTime(100)).subscribe((/**
             * @param {?} params
             * @return {?}
             */
            (params) => {
                /** @type {?} */
                const contextParam = params[(/** @type {?} */ (this.route.options.contextKey))];
                /** @type {?} */
                let direct = false;
                if (contextParam) {
                    this.defaultContextUri = contextParam;
                    direct = true;
                }
                loadFct(direct);
            }));
        }
        else {
            loadFct();
        }
    }
    /**
     * @param {?} uri
     * @return {?}
     */
    loadContext(uri) {
        /** @type {?} */
        const context = this.context$.value;
        if (context && context.uri === uri) {
            return;
        }
        /** @type {?} */
        const contexts$$ = this.getContextByUri(uri).subscribe((/**
         * @param {?} _context
         * @return {?}
         */
        (_context) => {
            if (contexts$$) {
                contexts$$.unsubscribe();
            }
            this.addContextToList(_context);
            this.setContext(_context);
        }), (/**
         * @param {?} err
         * @return {?}
         */
        (err) => {
            if (contexts$$) {
                contexts$$.unsubscribe();
            }
            if (uri !== this.options.defaultContextUri) {
                this.loadContext(this.options.defaultContextUri);
            }
        }));
    }
    /**
     * @param {?} context
     * @return {?}
     */
    setContext(context) {
        this.handleContextMessage(context);
        /** @type {?} */
        const currentContext = this.context$.value;
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
    }
    /**
     * @param {?} uri
     * @return {?}
     */
    loadEditedContext(uri) {
        this.getContextByUri(uri).subscribe((/**
         * @param {?} _context
         * @return {?}
         */
        (_context) => {
            this.setEditedContext(_context);
        }));
    }
    /**
     * @param {?} context
     * @return {?}
     */
    setEditedContext(context) {
        this.editedContext$.next(context);
    }
    /**
     * @param {?} igoMap
     * @param {?=} empty
     * @return {?}
     */
    getContextFromMap(igoMap, empty) {
        /** @type {?} */
        const view = igoMap.ol.getView();
        /** @type {?} */
        const proj = view.getProjection().getCode();
        /** @type {?} */
        const center = new olPoint(view.getCenter()).transform(proj, 'EPSG:4326');
        /** @type {?} */
        const context = {
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
        let layers = [];
        if (empty === true) {
            layers = igoMap.layers$
                .getValue()
                .filter((/**
             * @param {?} lay
             * @return {?}
             */
            (lay) => lay.baseLayer === true ||
                lay.options.id === 'searchPointerSummaryId'))
                .sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            (a, b) => a.zIndex - b.zIndex));
        }
        else {
            layers = igoMap.layers$.getValue().sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            (a, b) => a.zIndex - b.zIndex));
        }
        /** @type {?} */
        let i = 0;
        for (const l of layers) {
            /** @type {?} */
            const layer = l;
            /** @type {?} */
            const opts = {
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
        context.tools = this.tools.map((/**
         * @param {?} tool
         * @return {?}
         */
        (tool) => {
            return { id: String(tool.id), global: tool.global };
        }));
        return context;
    }
    /**
     * @param {?} igoMap
     * @param {?} layers
     * @param {?} name
     * @return {?}
     */
    getContextFromLayers(igoMap, layers, name) {
        /** @type {?} */
        const currentContext = this.context$.getValue();
        /** @type {?} */
        const view = igoMap.ol.getView();
        /** @type {?} */
        const proj = view.getProjection().getCode();
        /** @type {?} */
        const center = new olPoint(view.getCenter()).transform(proj, 'EPSG:4326');
        /** @type {?} */
        const context = {
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
        const currentLayers = igoMap.layers$.getValue();
        context.layers = currentLayers
            .filter((/**
         * @param {?} l
         * @return {?}
         */
        (l) => l.baseLayer))
            .map((/**
         * @param {?} l
         * @return {?}
         */
        (l) => {
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
        (layer) => {
            /** @type {?} */
            const layerFound = currentContext.layers.find((/**
             * @param {?} contextLayer
             * @return {?}
             */
            (contextLayer) => layer.id === contextLayer.source.id && !contextLayer.baseLayer));
            if (layerFound) {
                /** @type {?} */
                let layerStyle = layerFound[`style`];
                if (layerFound[`styleByAttribute`]) {
                    layerStyle = undefined;
                }
                else if (layerFound[`clusterBaseStyle`]) {
                    layerStyle = undefined;
                    delete layerFound.sourceOptions[`source`];
                    delete layerFound.sourceOptions[`format`];
                }
                /** @type {?} */
                const opts = {
                    baseLayer: layerFound.baseLayer,
                    title: layer.options.title,
                    zIndex: layer.zIndex,
                    styleByAttribute: layerFound[`styleByAttribute`],
                    clusterBaseStyle: layerFound[`clusterBaseStyle`],
                    style: layerStyle,
                    clusterParam: layerFound[`clusterParam`],
                    visible: layer.visible,
                    opacity: layer.opacity,
                    sourceOptions: layerFound.sourceOptions
                };
                context.layers.push(opts);
            }
            else {
                if (layer.ol.type !== 'VECTOR') {
                    /** @type {?} */
                    const catalogLayer = layer.options;
                    delete catalogLayer.source;
                    context.layers.push(catalogLayer);
                }
                else {
                    /** @type {?} */
                    let features;
                    /** @type {?} */
                    const writer = new GeoJSON();
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
    }
    /**
     * @param {?} tools
     * @return {?}
     */
    setTools(tools) {
        this.tools = tools;
    }
    /**
     * @param {?} toolbar
     * @return {?}
     */
    setToolbar(toolbar) {
        this.toolbar = toolbar;
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    handleContextMessage(context) {
        if (this.contextMessage) {
            this.messageService.remove(this.contextMessage.id);
        }
        /** @type {?} */
        const message = context.message;
        if (message) {
            message.title = message.title
                ? this.languageService.translate.instant(message.title)
                : undefined;
            message.text = message.text
                ? this.languageService.translate.instant(message.text)
                : undefined;
            this.messageService.message((/** @type {?} */ (message)));
        }
    }
    /**
     * @private
     * @param {?} uri
     * @return {?}
     */
    getContextByUri(uri) {
        if (this.baseUrl) {
            /** @type {?} */
            let contextToLoad;
            for (const key of Object.keys(this.contexts$.value)) {
                contextToLoad = this.contexts$.value[key].find((/**
                 * @param {?} c
                 * @return {?}
                 */
                (c) => {
                    return c.uri === uri;
                }));
                if (contextToLoad) {
                    break;
                }
            }
            if (contextToLoad && contextToLoad.imported) {
                return of(contextToLoad);
            }
            // TODO : use always id or uri
            /** @type {?} */
            const id = contextToLoad ? contextToLoad.id : uri;
            return this.getDetails(id);
        }
        /** @type {?} */
        const importedContext = this.contexts$.value.ours.find((/**
         * @param {?} currentContext
         * @return {?}
         */
        (currentContext) => {
            return currentContext.uri === uri && currentContext.imported === true;
        }));
        if (importedContext) {
            return of(importedContext);
        }
        else {
            return this.getLocalContext(uri);
        }
    }
    /**
     * @param {?} igoMap
     * @return {?}
     */
    getContextLayers(igoMap) {
        /** @type {?} */
        const layers = [];
        /** @type {?} */
        const mapLayers = igoMap.layers$.getValue();
        mapLayers.forEach((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => {
            if (!layer.baseLayer && layer.options.id !== 'searchPointerSummaryId') {
                layers.push(layer);
            }
        }));
        return layers;
    }
    /**
     * @private
     * @return {?}
     */
    readParamsFromRoute() {
        if (!this.route) {
            return;
        }
        this.route.queryParams.subscribe((/**
         * @param {?} params
         * @return {?}
         */
        (params) => {
            /** @type {?} */
            const centerKey = this.route.options.centerKey;
            if (centerKey && params[(/** @type {?} */ (centerKey))]) {
                /** @type {?} */
                const centerParams = params[(/** @type {?} */ (centerKey))];
                this.mapViewFromRoute.center = centerParams.split(',').map(Number);
                this.mapViewFromRoute.geolocate = false;
            }
            /** @type {?} */
            const projectionKey = this.route.options.projectionKey;
            if (projectionKey && params[(/** @type {?} */ (projectionKey))]) {
                /** @type {?} */
                const projectionParam = params[(/** @type {?} */ (projectionKey))];
                this.mapViewFromRoute.projection = projectionParam;
            }
            /** @type {?} */
            const zoomKey = this.route.options.zoomKey;
            if (zoomKey && params[(/** @type {?} */ (zoomKey))]) {
                /** @type {?} */
                const zoomParam = params[(/** @type {?} */ (zoomKey))];
                this.mapViewFromRoute.zoom = Number(zoomParam);
            }
        }));
    }
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    getPath(file) {
        /** @type {?} */
        const basePath = this.options.basePath.replace(/\/$/, '');
        return `${basePath}/${file}`;
    }
    /**
     * @private
     * @param {?} error
     * @param {?} uri
     * @param {?=} permissionError
     * @return {?}
     */
    handleError(error, uri, permissionError) {
        /** @type {?} */
        const context = this.contexts$.value.ours.find((/**
         * @param {?} obj
         * @return {?}
         */
        (obj) => obj.uri === uri));
        /** @type {?} */
        const titleContext = context ? context.title : uri;
        error.error.title = this.languageService.translate.instant('igo.context.contextManager.invalid.title');
        error.error.message = this.languageService.translate.instant('igo.context.contextManager.invalid.text', { value: titleContext });
        error.error.toDisplay = true;
        if (permissionError) {
            error.error.title = this.languageService.translate.instant('igo.context.contextManager.errors.addPermissionTitle');
            error.error.message = this.languageService.translate.instant('igo.context.contextManager.errors.addPermission');
        }
        throw error;
    }
    /**
     * @private
     * @param {?} contexts
     * @param {?=} keepCurrentContext
     * @return {?}
     */
    handleContextsChange(contexts, keepCurrentContext = true) {
        /** @type {?} */
        const context = this.context$.value;
        /** @type {?} */
        const editedContext = this.editedContext$.value;
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
        const editedFound = this.findContext(editedContext);
        if (!editedFound || editedFound.permission !== 'write') {
            this.setEditedContext(undefined);
        }
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    addContextToList(context) {
        /** @type {?} */
        const contextFound = this.findContext(context);
        if (!contextFound) {
            /** @type {?} */
            const contextSimplifie = {
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
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    findContext(context) {
        if (!context) {
            return false;
        }
        /** @type {?} */
        const contexts = this.contexts$.value;
        /** @type {?} */
        let found;
        for (const key of Object.keys(contexts)) {
            /** @type {?} */
            const value = contexts[key];
            found = value.find((/**
             * @param {?} c
             * @return {?}
             */
            (c) => (context.id && c.id === context.id) ||
                (context.uri && c.uri === context.uri)));
            if (found) {
                break;
            }
        }
        return found;
    }
}
ContextService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ContextService.ctorParameters = () => [
    { type: HttpClient },
    { type: AuthService },
    { type: LanguageService },
    { type: ConfigService },
    { type: MessageService },
    { type: RouteService, decorators: [{ type: Optional }] }
];
/** @nocollapse */ ContextService.ngInjectableDef = i0.defineInjectable({ factory: function ContextService_Factory() { return new ContextService(i0.inject(i1.HttpClient), i0.inject(i2.AuthService), i0.inject(i3.LanguageService), i0.inject(i3.ConfigService), i0.inject(i3.MessageService), i0.inject(i3.RouteService, 8)); }, token: ContextService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29udGV4dC8iLCJzb3VyY2VzIjpbImxpYi9jb250ZXh0LW1hbmFnZXIvc2hhcmVkL2NvbnRleHQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLFVBQVUsRUFBcUIsTUFBTSxzQkFBc0IsQ0FBQztBQUVyRSxPQUFPLEVBQUUsZUFBZSxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2RCxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdFLE9BQU8sT0FBTyxNQUFNLGVBQWUsQ0FBQztBQUNwQyxPQUFPLE9BQU8sTUFBTSxtQkFBbUIsQ0FBQztBQUN4QyxPQUFPLE9BQU8sTUFBTSxtQkFBbUIsQ0FBQztBQUd4QyxPQUFPLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNoRCxPQUFPLEVBQ0wsYUFBYSxFQUNiLFlBQVksRUFFWixjQUFjLEVBRWQsZUFBZSxFQUNoQixNQUFNLFlBQVksQ0FBQztBQUVwQixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBR3pDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFjaEQsTUFBTSxPQUFPLGNBQWM7Ozs7Ozs7OztJQXdCekIsWUFDVSxJQUFnQixFQUNoQixXQUF3QixFQUN4QixlQUFnQyxFQUNoQyxNQUFxQixFQUNyQixjQUE4QixFQUNsQixLQUFtQjtRQUwvQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3JCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUNsQixVQUFLLEdBQUwsS0FBSyxDQUFjO1FBN0JsQyxhQUFRLEdBQUcsSUFBSSxlQUFlLENBQWtCLFNBQVMsQ0FBQyxDQUFDO1FBQzNELGNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBZSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzVELHNCQUFpQixHQUFHLElBQUksZUFBZSxDQUFTLFNBQVMsQ0FBQyxDQUFDO1FBQzNELG1CQUFjLEdBQUcsSUFBSSxlQUFlLENBQWtCLFNBQVMsQ0FBQyxDQUFDO1FBQ2pFLG9CQUFlLEdBQTJCLEVBQUUsQ0FBQztRQUM1QyxxQkFBZ0IsR0FBbUIsRUFBRSxDQUFDO1FBMEI1QyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQzFCO1lBQ0UsUUFBUSxFQUFFLFVBQVU7WUFDcEIsZUFBZSxFQUFFLGdCQUFnQjtZQUNqQyxpQkFBaUIsRUFBRSxVQUFVO1NBQzlCLEVBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQ2pDLENBQUM7UUFFRixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBRWhDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRTNCLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFNBQVM7Ozs7UUFBQyxDQUFDLGFBQWEsRUFBRSxFQUFFO1lBQ3pELElBQUksYUFBYSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxTQUFTOzs7O2dCQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7b0JBQ2hDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEMsQ0FBQyxFQUFDLENBQUM7YUFDSjtpQkFBTTs7c0JBQ0MsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUzs7OztnQkFBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO29CQUN2RCxJQUFJLFVBQVUsRUFBRTt3QkFDZCxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7d0JBQ3pCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztxQkFDckM7Z0JBQ0gsQ0FBQyxFQUFDO2dCQUNGLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUNyQjtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQTVDRCxJQUFJLGlCQUFpQjtRQUNuQixPQUFPLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDO0lBQ25FLENBQUM7Ozs7O0lBQ0QsSUFBSSxpQkFBaUIsQ0FBQyxHQUFXO1FBQy9CLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxHQUFHLENBQUM7SUFDaEMsQ0FBQzs7Ozs7O0lBeUNELEdBQUcsQ0FBQyxXQUFzQixFQUFFLE1BQWdCOztZQUN0QyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxXQUFXO1FBQ3BDLElBQUksV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFO1lBQ2pELEdBQUcsSUFBSSxjQUFjLEdBQUcsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzNDLElBQUksTUFBTSxFQUFFO2dCQUNWLEdBQUcsSUFBSSxjQUFjLENBQUM7YUFDdkI7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQWUsR0FBRyxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7Ozs7SUFFRCxPQUFPLENBQUMsRUFBVTs7Y0FDVixHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLEdBQUcsRUFBRTtRQUM1QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFVLEdBQUcsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLEVBQVU7O2NBQ2IsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sYUFBYSxFQUFFLFVBQVU7UUFDcEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBa0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUM3QyxVQUFVOzs7O1FBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNqQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ25DLENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDOzs7O0lBRUQsVUFBVTs7Y0FDRixHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxtQkFBbUI7UUFDOUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBa0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUM3QyxHQUFHOzs7O1FBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNkLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDOzs7O0lBRUQsZUFBZTtRQUNiLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTs7a0JBQ1YsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsV0FBVztZQUN0QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFtQixHQUFHLENBQUMsQ0FBQztTQUM3QztRQUNELE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hCLENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLEVBQVU7O2NBQ2IsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CO1FBQzlDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN2RCxDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxFQUFVOztjQUNkLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksR0FBRyxFQUFFLEdBQUcsT0FBTztRQUN0RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxFQUFVOztjQUNkLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksR0FBRyxFQUFFLEdBQUcsT0FBTztRQUN0RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7Ozs7SUFFRCxNQUFNLENBQUMsRUFBVSxFQUFFLFFBQVEsR0FBRyxLQUFLOztjQUMzQixRQUFRLEdBQWlCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTzs7OztRQUN2QyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQ04sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTTs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBQyxDQUFDLEVBQ3pFLENBQUM7UUFFRixJQUFJLFFBQVEsRUFBRTtZQUNaLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNOzs7O1lBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFDLENBQUM7WUFDdkUsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztTQUMxQzs7Y0FFSyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLEdBQUcsRUFBRTtRQUM1QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FDckMsR0FBRzs7OztRQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDVixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQyxDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMsT0FBd0I7O2NBQ3ZCLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVc7UUFDdEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBVSxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDL0QsR0FBRzs7OztRQUFDLENBQUMsY0FBYyxFQUFFLEVBQUU7WUFDckIsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRTtnQkFDbEMsY0FBYyxDQUFDLFVBQVUsR0FBRyxjQUFjLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2xFO2lCQUFNO2dCQUNMLGNBQWMsQ0FBQyxVQUFVLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNqRTtZQUNELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDbEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQyxPQUFPLGNBQWMsQ0FBQztRQUN4QixDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7Ozs7O0lBRUQsS0FBSyxDQUFDLEVBQVUsRUFBRSxVQUFVLEdBQUcsRUFBRTs7Y0FDekIsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxHQUFHLEVBQUUsR0FBRyxRQUFRO1FBQ3ZELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQVUsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ2xFLEdBQUc7Ozs7UUFBQyxDQUFDLGFBQWEsRUFBRSxFQUFFO1lBQ3BCLGFBQWEsQ0FBQyxVQUFVLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUMsT0FBTyxhQUFhLENBQUM7UUFDdkIsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7Ozs7OztJQUVELE1BQU0sQ0FBQyxFQUFVLEVBQUUsT0FBZ0I7O2NBQzNCLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksR0FBRyxFQUFFO1FBQzVDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQVUsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDOzs7Ozs7O0lBSUQsa0JBQWtCLENBQUMsU0FBaUIsRUFBRSxNQUFjOztjQUM1QyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxhQUFhLFNBQVMsUUFBUTs7Y0FDbkQsV0FBVyxHQUFHO1lBQ2xCLE1BQU07U0FDUDtRQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQU8sR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDOzs7Ozs7SUFFRCxxQkFBcUIsQ0FBQyxTQUFpQixFQUFFLE1BQWM7O2NBQy9DLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLGFBQWEsU0FBUyxVQUFVLE1BQU0sRUFBRTtRQUNuRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBRUQsY0FBYyxDQUFDLEVBQVU7O2NBQ2pCLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksR0FBRyxFQUFFLEdBQUcsY0FBYztRQUM3RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFzQixHQUFHLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7Ozs7O0lBRUQsd0JBQXdCLENBQ3RCLFNBQWlCLEVBQ2pCLE1BQWMsRUFDZCxJQUFvQjs7Y0FFZCxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxhQUFhLFNBQVMsY0FBYzs7Y0FDekQsV0FBVyxHQUFHO1lBQ2xCLE1BQU07WUFDTixjQUFjLEVBQUUsSUFBSTtTQUNyQjtRQUVELE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixJQUFJLENBQXNCLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQzNELElBQUksQ0FDSCxVQUFVOzs7O1FBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEQsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNOLENBQUM7Ozs7OztJQUVELDJCQUEyQixDQUN6QixTQUFpQixFQUNqQixZQUFvQjs7Y0FFZCxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxhQUFhLFNBQVMsZ0JBQWdCLFlBQVksRUFBRTtRQUMvRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7O0lBSUQsZ0JBQWdCOztjQUNSLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDO1FBQ3RELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQWUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUMxQyxHQUFHOzs7O1FBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtZQUNmLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDdkIsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRUQsZUFBZSxDQUFDLEdBQVc7O2NBQ25CLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUM7UUFDdkMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBa0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUM3QyxPQUFPOzs7O1FBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNkLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFO2dCQUNiLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2hCOztrQkFDSyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQztZQUNoRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFrQixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ2pELEdBQUc7Ozs7WUFBQyxDQUFDLE9BQXdCLEVBQUUsRUFBRTs7c0JBQ3pCLFFBQVEsR0FBRyxHQUFHO2dCQUNwQixRQUFRLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzNELFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztxQkFDckMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO3FCQUN4QixPQUFPLEVBQUU7cUJBQ1QsTUFBTTs7Ozs7O2dCQUNMLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUNqQixDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLFNBQVM7Ozs7Z0JBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBQyxLQUFLLEtBQUssRUFDNUQ7cUJBQ0EsT0FBTyxFQUFFLENBQUM7Z0JBQ2IsUUFBUSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUM7Z0JBQ2xELFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztxQkFDL0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO3FCQUMzQixNQUFNOzs7Ozs7Z0JBQ0wsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLENBQ2pCLElBQUksQ0FBQyxTQUFTOzs7O2dCQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUMsS0FBSyxLQUFLLEVBQ3ZELENBQUM7Z0JBQ0osT0FBTyxRQUFRLENBQUM7WUFDbEIsQ0FBQyxFQUFDLEVBQ0YsVUFBVTs7OztZQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ2pCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDcEMsQ0FBQyxFQUFDLENBQ0gsQ0FBQztRQUNKLENBQUMsRUFBQyxFQUNGLFVBQVU7Ozs7UUFBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2xCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDckMsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7Ozs7OztJQUVELFlBQVksQ0FBQyxXQUFzQixFQUFFLE1BQWdCOztZQUMvQyxPQUFPO1FBQ1gsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN6QzthQUFNO1lBQ0wsT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ25DO1FBQ0QsT0FBTyxDQUFDLFNBQVM7Ozs7UUFBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQzdCLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hDLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELGtCQUFrQjs7Y0FDVixPQUFPOzs7O1FBQUcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxFQUFFLEVBQUU7WUFDakMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFO2dCQUM3RCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsU0FBUzs7OztnQkFDekIsQ0FBQyxRQUF5QixFQUFFLEVBQUU7b0JBQzVCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDO29CQUN0QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzVCLENBQUM7OztnQkFDRCxHQUFHLEVBQUU7b0JBQ0gsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDdkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDM0MsQ0FBQyxFQUNGLENBQUM7YUFDSDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2FBQzFDO1FBQ0gsQ0FBQyxDQUFBO1FBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTtZQUMvQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUzs7OztZQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7O3NCQUM1RCxZQUFZLEdBQUcsTUFBTSxDQUFDLG1CQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBVSxDQUFDOztvQkFDaEUsTUFBTSxHQUFHLEtBQUs7Z0JBQ2xCLElBQUksWUFBWSxFQUFFO29CQUNoQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsWUFBWSxDQUFDO29CQUN0QyxNQUFNLEdBQUcsSUFBSSxDQUFDO2lCQUNmO2dCQUNELE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsQixDQUFDLEVBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxPQUFPLEVBQUUsQ0FBQztTQUNYO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsR0FBVzs7Y0FDZixPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLO1FBRW5DLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLEtBQUssR0FBRyxFQUFFO1lBQ2xDLE9BQU87U0FDUjs7Y0FFSyxVQUFVLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTOzs7O1FBQ3BELENBQUMsUUFBeUIsRUFBRSxFQUFFO1lBQzVCLElBQUksVUFBVSxFQUFFO2dCQUNkLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUMxQjtZQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVCLENBQUM7Ozs7UUFDRCxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ04sSUFBSSxVQUFVLEVBQUU7Z0JBQ2QsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQzFCO1lBQ0QsSUFBSSxHQUFHLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRTtnQkFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7YUFDbEQ7UUFDSCxDQUFDLEVBQ0Y7SUFDSCxDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxPQUF3QjtRQUNqQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7O2NBQzdCLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUs7UUFDMUMsSUFBSSxjQUFjLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxFQUFFLEtBQUssY0FBYyxDQUFDLEVBQUUsRUFBRTtZQUNqRSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsS0FBSyxTQUFTLEVBQUU7Z0JBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7YUFDekM7WUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1QixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUNoQixPQUFPLENBQUMsR0FBRyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDO1NBQzVCO1FBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUV2RCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7OztJQUVELGlCQUFpQixDQUFDLEdBQVc7UUFDM0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxRQUF5QixFQUFFLEVBQUU7WUFDaEUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xDLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxPQUF3QjtRQUN2QyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxNQUFjLEVBQUUsS0FBZTs7Y0FDekMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFOztjQUMxQixJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLE9BQU8sRUFBRTs7Y0FDckMsTUFBTSxHQUFRLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FDekQsSUFBSSxFQUNKLFdBQVcsQ0FDWjs7Y0FFSyxPQUFPLEdBQUc7WUFDZCxHQUFHLEVBQUUsSUFBSSxFQUFFO1lBQ1gsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsU0FBUztZQUNoQixHQUFHLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNKLE1BQU0sRUFBRSxNQUFNLENBQUMsY0FBYyxFQUFFO29CQUMvQixJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDcEIsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLGVBQWUsRUFBRSxNQUFNLENBQUMsY0FBYyxDQUFDLGVBQWU7aUJBQ3ZEO2FBQ0Y7WUFDRCxNQUFNLEVBQUUsRUFBRTtZQUNWLEtBQUssRUFBRSxFQUFFO1NBQ1Y7O1lBRUcsTUFBTSxHQUFHLEVBQUU7UUFDZixJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDbEIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPO2lCQUNwQixRQUFRLEVBQUU7aUJBQ1YsTUFBTTs7OztZQUNMLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FDTixHQUFHLENBQUMsU0FBUyxLQUFLLElBQUk7Z0JBQ3RCLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLHdCQUF3QixFQUM5QztpQkFDQSxJQUFJOzs7OztZQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFDLENBQUM7U0FDeEM7YUFBTTtZQUNMLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUk7Ozs7O1lBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUMsQ0FBQztTQUN4RTs7WUFFRyxDQUFDLEdBQUcsQ0FBQztRQUNULEtBQUssTUFBTSxDQUFDLElBQUksTUFBTSxFQUFFOztrQkFDaEIsS0FBSyxHQUFRLENBQUM7O2tCQUNkLElBQUksR0FBRztnQkFDWCxFQUFFLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO2dCQUMzRCxZQUFZLEVBQUU7b0JBQ1osS0FBSyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSztvQkFDMUIsTUFBTSxFQUFFLEVBQUUsQ0FBQztvQkFDWCxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87aUJBQ3ZCO2dCQUNELGFBQWEsRUFBRTtvQkFDYixJQUFJLEVBQUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSTtvQkFDbkMsTUFBTSxFQUFFLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU07b0JBQ3ZDLEdBQUcsRUFBRSxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHO29CQUNqQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVM7aUJBQzNCO2FBQ0Y7WUFDRCxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFO2dCQUMzQixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMzQjtTQUNGO1FBRUQsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUc7Ozs7UUFBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3RDLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3RELENBQUMsRUFBQyxDQUFDO1FBRUgsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQzs7Ozs7OztJQUVELG9CQUFvQixDQUNsQixNQUFjLEVBQ2QsTUFBZSxFQUNmLElBQVk7O2NBRU4sY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFOztjQUN6QyxJQUFJLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUU7O2NBQzFCLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsT0FBTyxFQUFFOztjQUNyQyxNQUFNLEdBQVEsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUN6RCxJQUFJLEVBQ0osV0FBVyxDQUNaOztjQUVLLE9BQU8sR0FBRztZQUNkLEdBQUcsRUFBRSxJQUFJO1lBQ1QsS0FBSyxFQUFFLElBQUk7WUFDWCxHQUFHLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNKLE1BQU0sRUFBRSxNQUFNLENBQUMsY0FBYyxFQUFFO29CQUMvQixJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDcEIsVUFBVSxFQUFFLElBQUk7aUJBQ2pCO2FBQ0Y7WUFDRCxNQUFNLEVBQUUsRUFBRTtZQUNWLE9BQU8sRUFBRSxFQUFFO1lBQ1gsS0FBSyxFQUFFLEVBQUU7WUFDVCxhQUFhLEVBQUUsRUFBRTtTQUNsQjs7Y0FFSyxhQUFhLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7UUFDL0MsT0FBTyxDQUFDLE1BQU0sR0FBRyxhQUFhO2FBQzNCLE1BQU07Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBQzthQUMxQixHQUFHOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNULE9BQU87Z0JBQ0wsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsYUFBYSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYTtnQkFDdEMsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSztnQkFDdEIsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPO2FBQ25CLENBQUM7UUFDSixDQUFDLEVBQUMsQ0FBQztRQUVMLE1BQU0sQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTs7a0JBQ2pCLFVBQVUsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUk7Ozs7WUFDM0MsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUNmLEtBQUssQ0FBQyxFQUFFLEtBQUssWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUNqRTtZQUVELElBQUksVUFBVSxFQUFFOztvQkFDVixVQUFVLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQztnQkFDcEMsSUFBSSxVQUFVLENBQUMsa0JBQWtCLENBQUMsRUFBRTtvQkFDbEMsVUFBVSxHQUFHLFNBQVMsQ0FBQztpQkFDeEI7cUJBQU0sSUFBSSxVQUFVLENBQUMsa0JBQWtCLENBQUMsRUFBRTtvQkFDekMsVUFBVSxHQUFHLFNBQVMsQ0FBQztvQkFDdkIsT0FBTyxVQUFVLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUMxQyxPQUFPLFVBQVUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQzNDOztzQkFDSyxJQUFJLEdBQUc7b0JBQ1gsU0FBUyxFQUFFLFVBQVUsQ0FBQyxTQUFTO29CQUMvQixLQUFLLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLO29CQUMxQixNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07b0JBQ3BCLGdCQUFnQixFQUFFLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQztvQkFDaEQsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLGtCQUFrQixDQUFDO29CQUNoRCxLQUFLLEVBQUUsVUFBVTtvQkFDakIsWUFBWSxFQUFFLFVBQVUsQ0FBQyxjQUFjLENBQUM7b0JBQ3hDLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztvQkFDdEIsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO29CQUN0QixhQUFhLEVBQUUsVUFBVSxDQUFDLGFBQWE7aUJBQ3hDO2dCQUNELE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzNCO2lCQUFNO2dCQUNMLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFOzswQkFDeEIsWUFBWSxHQUFHLEtBQUssQ0FBQyxPQUFPO29CQUNsQyxPQUFPLFlBQVksQ0FBQyxNQUFNLENBQUM7b0JBQzNCLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUNuQztxQkFBTTs7d0JBQ0QsUUFBUTs7MEJBQ04sTUFBTSxHQUFHLElBQUksT0FBTyxFQUFFO29CQUM1QixJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFlBQVksT0FBTyxFQUFFO3dCQUMzQyxRQUFRLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FDN0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxXQUFXLEVBQUUsRUFDOUM7NEJBQ0UsY0FBYyxFQUFFLFdBQVc7NEJBQzNCLGlCQUFpQixFQUFFLFdBQVc7eUJBQy9CLENBQ0YsQ0FBQztxQkFDSDt5QkFBTTt3QkFDTCxRQUFRLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FDN0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxXQUFXLEVBQUUsRUFDbEM7NEJBQ0UsY0FBYyxFQUFFLFdBQVc7NEJBQzNCLGlCQUFpQixFQUFFLFdBQVc7eUJBQy9CLENBQ0YsQ0FBQztxQkFDSDtvQkFDRCxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDaEMsUUFBUSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztvQkFDcEMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ3RDO2FBQ0Y7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUMvQixPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFM0IsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQzs7Ozs7SUFFRCxRQUFRLENBQUMsS0FBYTtRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxPQUFpQjtRQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDOzs7Ozs7SUFFTyxvQkFBb0IsQ0FBQyxPQUF3QjtRQUNuRCxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNwRDs7Y0FDSyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU87UUFDL0IsSUFBSSxPQUFPLEVBQUU7WUFDWCxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLO2dCQUMzQixDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQ3ZELENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDZCxPQUFPLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJO2dCQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7Z0JBQ3RELENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDZCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxtQkFBQSxPQUFPLEVBQVcsQ0FBQyxDQUFDO1NBQ2pEO0lBQ0gsQ0FBQzs7Ozs7O0lBRU8sZUFBZSxDQUFDLEdBQVc7UUFDakMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFOztnQkFDWixhQUFhO1lBQ2pCLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNuRCxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSTs7OztnQkFBQyxDQUFDLENBQUMsRUFBRSxFQUFFO29CQUNuRCxPQUFPLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDO2dCQUN2QixDQUFDLEVBQUMsQ0FBQztnQkFDSCxJQUFJLGFBQWEsRUFBRTtvQkFDakIsTUFBTTtpQkFDUDthQUNGO1lBRUQsSUFBSSxhQUFhLElBQUksYUFBYSxDQUFDLFFBQVEsRUFBRTtnQkFDM0MsT0FBTyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDMUI7OztrQkFHSyxFQUFFLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHO1lBQ2pELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM1Qjs7Y0FFSyxlQUFlLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUk7Ozs7UUFBQyxDQUFDLGNBQWMsRUFBRSxFQUFFO1lBQ3hFLE9BQU8sY0FBYyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksY0FBYyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUM7UUFDeEUsQ0FBQyxFQUFDO1FBRUYsSUFBSSxlQUFlLEVBQUU7WUFDbkIsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDNUI7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNsQztJQUNILENBQUM7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsTUFBYzs7Y0FDdkIsTUFBTSxHQUFZLEVBQUU7O2NBQ3BCLFNBQVMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtRQUMzQyxTQUFTLENBQUMsT0FBTzs7OztRQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssd0JBQXdCLEVBQUU7Z0JBQ3JFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDcEI7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUNILE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Ozs7O0lBRU8sbUJBQW1CO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2YsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUzs7OztRQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7O2tCQUNwQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUztZQUM5QyxJQUFJLFNBQVMsSUFBSSxNQUFNLENBQUMsbUJBQUEsU0FBUyxFQUFVLENBQUMsRUFBRTs7c0JBQ3RDLFlBQVksR0FBRyxNQUFNLENBQUMsbUJBQUEsU0FBUyxFQUFVLENBQUM7Z0JBQ2hELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ25FLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2FBQ3pDOztrQkFFSyxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYTtZQUN0RCxJQUFJLGFBQWEsSUFBSSxNQUFNLENBQUMsbUJBQUEsYUFBYSxFQUFVLENBQUMsRUFBRTs7c0JBQzlDLGVBQWUsR0FBRyxNQUFNLENBQUMsbUJBQUEsYUFBYSxFQUFVLENBQUM7Z0JBQ3ZELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsZUFBZSxDQUFDO2FBQ3BEOztrQkFFSyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTztZQUMxQyxJQUFJLE9BQU8sSUFBSSxNQUFNLENBQUMsbUJBQUEsT0FBTyxFQUFVLENBQUMsRUFBRTs7c0JBQ2xDLFNBQVMsR0FBRyxNQUFNLENBQUMsbUJBQUEsT0FBTyxFQUFVLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ2hEO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7SUFFTyxPQUFPLENBQUMsSUFBWTs7Y0FDcEIsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO1FBRXpELE9BQU8sR0FBRyxRQUFRLElBQUksSUFBSSxFQUFFLENBQUM7SUFDL0IsQ0FBQzs7Ozs7Ozs7SUFFTyxXQUFXLENBQ2pCLEtBQXdCLEVBQ3hCLEdBQVcsRUFDWCxlQUF5Qjs7Y0FFbkIsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJOzs7O1FBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssR0FBRyxFQUFDOztjQUNsRSxZQUFZLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHO1FBQ2xELEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FDeEQsMENBQTBDLENBQzNDLENBQUM7UUFFRixLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQzFELHlDQUF5QyxFQUN6QyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsQ0FDeEIsQ0FBQztRQUVGLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUU3QixJQUFJLGVBQWUsRUFBRTtZQUNuQixLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQ3hELHNEQUFzRCxDQUN2RCxDQUFDO1lBQ0YsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUMxRCxpREFBaUQsQ0FDbEQsQ0FBQztTQUNIO1FBRUQsTUFBTSxLQUFLLENBQUM7SUFDZCxDQUFDOzs7Ozs7O0lBRU8sb0JBQW9CLENBQzFCLFFBQXNCLEVBQ3RCLGtCQUFrQixHQUFHLElBQUk7O2NBRW5CLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUs7O2NBQzdCLGFBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUs7UUFFL0MsSUFBSSxDQUFDLGtCQUFrQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNyRCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUMzQjthQUFNO1lBQ0wsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLEtBQUssU0FBUyxFQUFFO2dCQUNsRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO2FBQ3pDO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUIsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFO2dCQUNsRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDL0I7U0FDRjs7Y0FDSyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7UUFDbkQsSUFBSSxDQUFDLFdBQVcsSUFBSSxXQUFXLENBQUMsVUFBVSxLQUFLLE9BQU8sRUFBRTtZQUN0RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDbEM7SUFDSCxDQUFDOzs7Ozs7SUFFTyxnQkFBZ0IsQ0FBQyxPQUFnQjs7Y0FDakMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO1FBQzlDLElBQUksQ0FBQyxZQUFZLEVBQUU7O2tCQUNYLGdCQUFnQixHQUFHO2dCQUN2QixFQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUU7Z0JBQ2QsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHO2dCQUNoQixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7Z0JBQ3BCLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztnQkFDcEIsVUFBVSxFQUFFLGNBQWMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDO2FBQ2hEO1lBRUQsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMzQztTQUNGO0lBQ0gsQ0FBQzs7Ozs7O0lBRU8sV0FBVyxDQUFDLE9BQWdCO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixPQUFPLEtBQUssQ0FBQztTQUNkOztjQUVLLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUs7O1lBQ2pDLEtBQUs7UUFDVCxLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7O2tCQUNqQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQztZQUMzQixLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUk7Ozs7WUFDaEIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUNKLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxLQUFLLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQ25DLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFDekMsQ0FBQztZQUNGLElBQUksS0FBSyxFQUFFO2dCQUNULE1BQU07YUFDUDtTQUNGO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7WUF2dUJGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQXBDUSxVQUFVO1lBb0JWLFdBQVc7WUFIbEIsZUFBZTtZQUxmLGFBQWE7WUFHYixjQUFjO1lBRmQsWUFBWSx1QkFzRFQsUUFBUTs7Ozs7SUE3Qlgsa0NBQWtFOztJQUNsRSxtQ0FBbUU7O0lBQ25FLDJDQUFrRTs7SUFDbEUsd0NBQXdFOztJQUN4RSx5Q0FBb0Q7Ozs7O0lBQ3BELDBDQUE4Qzs7Ozs7SUFDOUMsaUNBQXVDOzs7OztJQUN2QyxpQ0FBd0I7Ozs7O0lBQ3hCLHdDQUFxQzs7Ozs7SUFJckMsK0JBQXNCOzs7OztJQUN0QixpQ0FBMEI7Ozs7O0lBUTFCLDRDQUFtQzs7Ozs7SUFHakMsOEJBQXdCOzs7OztJQUN4QixxQ0FBZ0M7Ozs7O0lBQ2hDLHlDQUF3Qzs7Ozs7SUFDeEMsZ0NBQTZCOzs7OztJQUM3Qix3Q0FBc0M7Ozs7O0lBQ3RDLCtCQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAsIHRhcCwgY2F0Y2hFcnJvciwgZGVib3VuY2VUaW1lLCBmbGF0TWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IG9sUG9pbnQgZnJvbSAnb2wvZ2VvbS9Qb2ludCc7XHJcbmltcG9ydCBHZW9KU09OIGZyb20gJ29sL2Zvcm1hdC9HZW9KU09OJztcclxuaW1wb3J0IENsdXN0ZXIgZnJvbSAnb2wvc291cmNlL0NsdXN0ZXInO1xyXG5cclxuaW1wb3J0IHsgVG9vbCB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcbmltcG9ydCB7IHV1aWQsIE9iamVjdFV0aWxzIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5pbXBvcnQge1xyXG4gIENvbmZpZ1NlcnZpY2UsXHJcbiAgUm91dGVTZXJ2aWNlLFxyXG4gIE1lc3NhZ2UsXHJcbiAgTWVzc2FnZVNlcnZpY2UsXHJcbiAgTm90aWZpY2F0aW9uLFxyXG4gIExhbmd1YWdlU2VydmljZVxyXG59IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICdAaWdvMi9hdXRoJztcclxuaW1wb3J0IHsgSWdvTWFwLCBMYXllciB9IGZyb20gJ0BpZ28yL2dlbyc7XHJcblxyXG5pbXBvcnQgeyBUeXBlUGVybWlzc2lvbiB9IGZyb20gJy4vY29udGV4dC5lbnVtJztcclxuaW1wb3J0IHtcclxuICBDb250ZXh0c0xpc3QsXHJcbiAgQ29udGV4dFNlcnZpY2VPcHRpb25zLFxyXG4gIENvbnRleHQsXHJcbiAgRGV0YWlsZWRDb250ZXh0LFxyXG4gIENvbnRleHRNYXBWaWV3LFxyXG4gIENvbnRleHRQZXJtaXNzaW9uLFxyXG4gIENvbnRleHRQcm9maWxzXHJcbn0gZnJvbSAnLi9jb250ZXh0LmludGVyZmFjZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb250ZXh0U2VydmljZSB7XHJcbiAgcHVibGljIGNvbnRleHQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEZXRhaWxlZENvbnRleHQ+KHVuZGVmaW5lZCk7XHJcbiAgcHVibGljIGNvbnRleHRzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Q29udGV4dHNMaXN0Pih7IG91cnM6IFtdIH0pO1xyXG4gIHB1YmxpYyBkZWZhdWx0Q29udGV4dElkJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPih1bmRlZmluZWQpO1xyXG4gIHB1YmxpYyBlZGl0ZWRDb250ZXh0JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RGV0YWlsZWRDb250ZXh0Pih1bmRlZmluZWQpO1xyXG4gIHB1YmxpYyBpbXBvcnRlZENvbnRleHQ6IEFycmF5PERldGFpbGVkQ29udGV4dD4gPSBbXTtcclxuICBwcml2YXRlIG1hcFZpZXdGcm9tUm91dGU6IENvbnRleHRNYXBWaWV3ID0ge307XHJcbiAgcHJpdmF0ZSBvcHRpb25zOiBDb250ZXh0U2VydmljZU9wdGlvbnM7XHJcbiAgcHJpdmF0ZSBiYXNlVXJsOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBjb250ZXh0TWVzc2FnZTogTm90aWZpY2F0aW9uO1xyXG5cclxuICAvLyBVbnRpbCB0aGUgQ29udGV4dFNlcnZpY2UgaXMgY29tcGxldGVseSByZWZhY3RvcmVkLCB0aGlzIGlzIG5lZWRlZFxyXG4gIC8vIHRvIHRyYWNrIHRoZSBjdXJyZW50IHRvb2xzXHJcbiAgcHJpdmF0ZSB0b29sczogVG9vbFtdO1xyXG4gIHByaXZhdGUgdG9vbGJhcjogc3RyaW5nW107XHJcblxyXG4gIGdldCBkZWZhdWx0Q29udGV4dFVyaSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRDb250ZXh0VXJpIHx8IHRoaXMub3B0aW9ucy5kZWZhdWx0Q29udGV4dFVyaTtcclxuICB9XHJcbiAgc2V0IGRlZmF1bHRDb250ZXh0VXJpKHVyaTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9kZWZhdWx0Q29udGV4dFVyaSA9IHVyaTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfZGVmYXVsdENvbnRleHRVcmk6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSxcclxuICAgIHByaXZhdGUgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByb3V0ZTogUm91dGVTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgICB7XHJcbiAgICAgICAgYmFzZVBhdGg6ICdjb250ZXh0cycsXHJcbiAgICAgICAgY29udGV4dExpc3RGaWxlOiAnX2NvbnRleHRzLmpzb24nLFxyXG4gICAgICAgIGRlZmF1bHRDb250ZXh0VXJpOiAnX2RlZmF1bHQnXHJcbiAgICAgIH0sXHJcbiAgICAgIHRoaXMuY29uZmlnLmdldENvbmZpZygnY29udGV4dCcpXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuYmFzZVVybCA9IHRoaXMub3B0aW9ucy51cmw7XHJcblxyXG4gICAgdGhpcy5yZWFkUGFyYW1zRnJvbVJvdXRlKCk7XHJcblxyXG4gICAgdGhpcy5hdXRoU2VydmljZS5hdXRoZW50aWNhdGUkLnN1YnNjcmliZSgoYXV0aGVudGljYXRlZCkgPT4ge1xyXG4gICAgICBpZiAoYXV0aGVudGljYXRlZCAmJiB0aGlzLmJhc2VVcmwpIHtcclxuICAgICAgICB0aGlzLmdldCgpLnN1YnNjcmliZSgoY29udGV4dHMpID0+IHtcclxuICAgICAgICAgIHRoaXMuaGFuZGxlQ29udGV4dHNDaGFuZ2UoY29udGV4dHMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGNvbnRleHRzJCQgPSB0aGlzLmNvbnRleHRzJC5zdWJzY3JpYmUoKGNvbnRleHRzKSA9PiB7XHJcbiAgICAgICAgICBpZiAoY29udGV4dHMkJCkge1xyXG4gICAgICAgICAgICBjb250ZXh0cyQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ29udGV4dHNDaGFuZ2UoY29udGV4dHMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubG9hZENvbnRleHRzKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0KHBlcm1pc3Npb25zPzogc3RyaW5nW10sIGhpZGRlbj86IGJvb2xlYW4pOiBPYnNlcnZhYmxlPENvbnRleHRzTGlzdD4ge1xyXG4gICAgbGV0IHVybCA9IHRoaXMuYmFzZVVybCArICcvY29udGV4dHMnO1xyXG4gICAgaWYgKHBlcm1pc3Npb25zICYmIHRoaXMuYXV0aFNlcnZpY2UuYXV0aGVudGljYXRlZCkge1xyXG4gICAgICB1cmwgKz0gJz9wZXJtaXNzaW9uPScgKyBwZXJtaXNzaW9ucy5qb2luKCk7XHJcbiAgICAgIGlmIChoaWRkZW4pIHtcclxuICAgICAgICB1cmwgKz0gJyZoaWRkZW49dHJ1ZSc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PENvbnRleHRzTGlzdD4odXJsKTtcclxuICB9XHJcblxyXG4gIGdldEJ5SWQoaWQ6IHN0cmluZyk6IE9ic2VydmFibGU8Q29udGV4dD4ge1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5iYXNlVXJsICsgJy9jb250ZXh0cy8nICsgaWQ7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxDb250ZXh0Pih1cmwpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGV0YWlscyhpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxEZXRhaWxlZENvbnRleHQ+IHtcclxuICAgIGNvbnN0IHVybCA9IGAke3RoaXMuYmFzZVVybH0vY29udGV4dHMvJHtpZH0vZGV0YWlsc2A7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxEZXRhaWxlZENvbnRleHQ+KHVybCkucGlwZShcclxuICAgICAgY2F0Y2hFcnJvcigocmVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlRXJyb3IocmVzLCBpZCk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGVmYXVsdCgpOiBPYnNlcnZhYmxlPERldGFpbGVkQ29udGV4dD4ge1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5iYXNlVXJsICsgJy9jb250ZXh0cy9kZWZhdWx0JztcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PERldGFpbGVkQ29udGV4dD4odXJsKS5waXBlKFxyXG4gICAgICB0YXAoKGNvbnRleHQpID0+IHtcclxuICAgICAgICB0aGlzLmRlZmF1bHRDb250ZXh0SWQkLm5leHQoY29udGV4dC5pZCk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0UHJvZmlsQnlVc2VyKCk6IE9ic2VydmFibGU8Q29udGV4dFByb2ZpbHNbXT4ge1xyXG4gICAgaWYgKHRoaXMuYmFzZVVybCkge1xyXG4gICAgICBjb25zdCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnL3Byb2ZpbHM/JztcclxuICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8Q29udGV4dFByb2ZpbHNbXT4odXJsKTtcclxuICAgIH1cclxuICAgIHJldHVybiBvZihbXSk7XHJcbiAgfVxyXG5cclxuICBzZXREZWZhdWx0KGlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5iYXNlVXJsICsgJy9jb250ZXh0cy9kZWZhdWx0JztcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIHsgZGVmYXVsdENvbnRleHRJZDogaWQgfSk7XHJcbiAgfVxyXG5cclxuICBoaWRlQ29udGV4dChpZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnL2NvbnRleHRzLycgKyBpZCArICcvaGlkZSc7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCB7fSk7XHJcbiAgfVxyXG5cclxuICBzaG93Q29udGV4dChpZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnL2NvbnRleHRzLycgKyBpZCArICcvc2hvdyc7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCB7fSk7XHJcbiAgfVxyXG5cclxuICBkZWxldGUoaWQ6IHN0cmluZywgaW1wb3J0ZWQgPSBmYWxzZSk6IE9ic2VydmFibGU8dm9pZD4ge1xyXG4gICAgY29uc3QgY29udGV4dHM6IENvbnRleHRzTGlzdCA9IHsgb3VyczogW10gfTtcclxuICAgIE9iamVjdC5rZXlzKHRoaXMuY29udGV4dHMkLnZhbHVlKS5mb3JFYWNoKFxyXG4gICAgICAoa2V5KSA9PlxyXG4gICAgICAgIChjb250ZXh0c1trZXldID0gdGhpcy5jb250ZXh0cyQudmFsdWVba2V5XS5maWx0ZXIoKGMpID0+IGMuaWQgIT09IGlkKSlcclxuICAgICk7XHJcblxyXG4gICAgaWYgKGltcG9ydGVkKSB7XHJcbiAgICAgIHRoaXMuaW1wb3J0ZWRDb250ZXh0ID0gdGhpcy5pbXBvcnRlZENvbnRleHQuZmlsdGVyKChjKSA9PiBjLmlkICE9PSBpZCk7XHJcbiAgICAgIHJldHVybiBvZih0aGlzLmNvbnRleHRzJC5uZXh0KGNvbnRleHRzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXJsID0gdGhpcy5iYXNlVXJsICsgJy9jb250ZXh0cy8nICsgaWQ7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZTx2b2lkPih1cmwpLnBpcGUoXHJcbiAgICAgIHRhcCgocmVzKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0cyQubmV4dChjb250ZXh0cyk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKGNvbnRleHQ6IERldGFpbGVkQ29udGV4dCk6IE9ic2VydmFibGU8Q29udGV4dD4ge1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5iYXNlVXJsICsgJy9jb250ZXh0cyc7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8Q29udGV4dD4odXJsLCBKU09OLnN0cmluZ2lmeShjb250ZXh0KSkucGlwZShcclxuICAgICAgbWFwKChjb250ZXh0Q3JlYXRlZCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmF1dGhTZXJ2aWNlLmF1dGhlbnRpY2F0ZWQpIHtcclxuICAgICAgICAgIGNvbnRleHRDcmVhdGVkLnBlcm1pc3Npb24gPSBUeXBlUGVybWlzc2lvbltUeXBlUGVybWlzc2lvbi53cml0ZV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnRleHRDcmVhdGVkLnBlcm1pc3Npb24gPSBUeXBlUGVybWlzc2lvbltUeXBlUGVybWlzc2lvbi5yZWFkXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb250ZXh0cyQudmFsdWUub3Vycy51bnNoaWZ0KGNvbnRleHRDcmVhdGVkKTtcclxuICAgICAgICB0aGlzLmNvbnRleHRzJC5uZXh0KHRoaXMuY29udGV4dHMkLnZhbHVlKTtcclxuICAgICAgICByZXR1cm4gY29udGV4dENyZWF0ZWQ7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgY2xvbmUoaWQ6IHN0cmluZywgcHJvcGVydGllcyA9IHt9KTogT2JzZXJ2YWJsZTxDb250ZXh0PiB7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnL2NvbnRleHRzLycgKyBpZCArICcvY2xvbmUnO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PENvbnRleHQ+KHVybCwgSlNPTi5zdHJpbmdpZnkocHJvcGVydGllcykpLnBpcGUoXHJcbiAgICAgIG1hcCgoY29udGV4dENsb25lZCkgPT4ge1xyXG4gICAgICAgIGNvbnRleHRDbG9uZWQucGVybWlzc2lvbiA9IFR5cGVQZXJtaXNzaW9uW1R5cGVQZXJtaXNzaW9uLndyaXRlXTtcclxuICAgICAgICB0aGlzLmNvbnRleHRzJC52YWx1ZS5vdXJzLnVuc2hpZnQoY29udGV4dENsb25lZCk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0cyQubmV4dCh0aGlzLmNvbnRleHRzJC52YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRleHRDbG9uZWQ7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKGlkOiBzdHJpbmcsIGNvbnRleHQ6IENvbnRleHQpOiBPYnNlcnZhYmxlPENvbnRleHQ+IHtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuYmFzZVVybCArICcvY29udGV4dHMvJyArIGlkO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wYXRjaDxDb250ZXh0Pih1cmwsIEpTT04uc3RyaW5naWZ5KGNvbnRleHQpKTtcclxuICB9XHJcblxyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gIGFkZFRvb2xBc3NvY2lhdGlvbihjb250ZXh0SWQ6IHN0cmluZywgdG9vbElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcclxuICAgIGNvbnN0IHVybCA9IGAke3RoaXMuYmFzZVVybH0vY29udGV4dHMvJHtjb250ZXh0SWR9L3Rvb2xzYDtcclxuICAgIGNvbnN0IGFzc29jaWF0aW9uID0ge1xyXG4gICAgICB0b29sSWRcclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8dm9pZD4odXJsLCBKU09OLnN0cmluZ2lmeShhc3NvY2lhdGlvbikpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlVG9vbEFzc29jaWF0aW9uKGNvbnRleHRJZDogc3RyaW5nLCB0b29sSWQ6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmJhc2VVcmx9L2NvbnRleHRzLyR7Y29udGV4dElkfS90b29scy8ke3Rvb2xJZH1gO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUodXJsKTtcclxuICB9XHJcblxyXG4gIGdldFBlcm1pc3Npb25zKGlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPENvbnRleHRQZXJtaXNzaW9uW10+IHtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuYmFzZVVybCArICcvY29udGV4dHMvJyArIGlkICsgJy9wZXJtaXNzaW9ucyc7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxDb250ZXh0UGVybWlzc2lvbltdPih1cmwpO1xyXG4gIH1cclxuXHJcbiAgYWRkUGVybWlzc2lvbkFzc29jaWF0aW9uKFxyXG4gICAgY29udGV4dElkOiBzdHJpbmcsXHJcbiAgICBwcm9maWw6IHN0cmluZyxcclxuICAgIHR5cGU6IFR5cGVQZXJtaXNzaW9uXHJcbiAgKTogT2JzZXJ2YWJsZTxDb250ZXh0UGVybWlzc2lvbltdIHwgTWVzc2FnZVtdPiB7XHJcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmJhc2VVcmx9L2NvbnRleHRzLyR7Y29udGV4dElkfS9wZXJtaXNzaW9uc2A7XHJcbiAgICBjb25zdCBhc3NvY2lhdGlvbiA9IHtcclxuICAgICAgcHJvZmlsLFxyXG4gICAgICB0eXBlUGVybWlzc2lvbjogdHlwZVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5wb3N0PENvbnRleHRQZXJtaXNzaW9uW10+KHVybCwgSlNPTi5zdHJpbmdpZnkoYXNzb2NpYXRpb24pKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBjYXRjaEVycm9yKChyZXMpID0+IHtcclxuICAgICAgICAgIHJldHVybiBbdGhpcy5oYW5kbGVFcnJvcihyZXMsIHVuZGVmaW5lZCwgdHJ1ZSldO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVQZXJtaXNzaW9uQXNzb2NpYXRpb24oXHJcbiAgICBjb250ZXh0SWQ6IHN0cmluZyxcclxuICAgIHBlcm1pc3Npb25JZDogc3RyaW5nXHJcbiAgKTogT2JzZXJ2YWJsZTx2b2lkPiB7XHJcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmJhc2VVcmx9L2NvbnRleHRzLyR7Y29udGV4dElkfS9wZXJtaXNzaW9ucy8ke3Blcm1pc3Npb25JZH1gO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGU8dm9pZD4odXJsKTtcclxuICB9XHJcblxyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgZ2V0TG9jYWxDb250ZXh0cygpOiBPYnNlcnZhYmxlPENvbnRleHRzTGlzdD4ge1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5nZXRQYXRoKHRoaXMub3B0aW9ucy5jb250ZXh0TGlzdEZpbGUpO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8Q29udGV4dHNMaXN0Pih1cmwpLnBpcGUoXHJcbiAgICAgIG1hcCgocmVzOiBhbnkpID0+IHtcclxuICAgICAgICByZXR1cm4geyBvdXJzOiByZXMgfTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXRMb2NhbENvbnRleHQodXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPERldGFpbGVkQ29udGV4dD4ge1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5nZXRQYXRoKGAke3VyaX0uanNvbmApO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8RGV0YWlsZWRDb250ZXh0Pih1cmwpLnBpcGUoXHJcbiAgICAgIGZsYXRNYXAoKHJlcykgPT4ge1xyXG4gICAgICAgIGlmICghcmVzLmJhc2UpIHtcclxuICAgICAgICAgIHJldHVybiBvZihyZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB1cmxCYXNlID0gdGhpcy5nZXRQYXRoKGAke3Jlcy5iYXNlfS5qc29uYCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8RGV0YWlsZWRDb250ZXh0Pih1cmxCYXNlKS5waXBlKFxyXG4gICAgICAgICAgbWFwKChyZXNCYXNlOiBEZXRhaWxlZENvbnRleHQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzTWVyZ2UgPSByZXM7XHJcbiAgICAgICAgICAgIHJlc01lcmdlLm1hcCA9IE9iamVjdFV0aWxzLm1lcmdlRGVlcChyZXNCYXNlLm1hcCwgcmVzLm1hcCk7XHJcbiAgICAgICAgICAgIHJlc01lcmdlLmxheWVycyA9IChyZXNCYXNlLmxheWVycyB8fCBbXSlcclxuICAgICAgICAgICAgICAuY29uY2F0KHJlcy5sYXllcnMgfHwgW10pXHJcbiAgICAgICAgICAgICAgLnJldmVyc2UoKVxyXG4gICAgICAgICAgICAgIC5maWx0ZXIoXHJcbiAgICAgICAgICAgICAgICAobCwgaW5kZXgsIHNlbGYpID0+XHJcbiAgICAgICAgICAgICAgICAgICFsLmlkIHx8IHNlbGYuZmluZEluZGV4KChsMikgPT4gbDIuaWQgPT09IGwuaWQpID09PSBpbmRleFxyXG4gICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICByZXNNZXJnZS50b29sYmFyID0gcmVzLnRvb2xiYXIgfHwgcmVzQmFzZS50b29sYmFyO1xyXG4gICAgICAgICAgICByZXNNZXJnZS50b29scyA9IChyZXMudG9vbHMgfHwgW10pXHJcbiAgICAgICAgICAgICAgLmNvbmNhdChyZXNCYXNlLnRvb2xzIHx8IFtdKVxyXG4gICAgICAgICAgICAgIC5maWx0ZXIoXHJcbiAgICAgICAgICAgICAgICAodCwgaW5kZXgsIHNlbGYpID0+XHJcbiAgICAgICAgICAgICAgICAgIHNlbGYuZmluZEluZGV4KCh0MikgPT4gdDIubmFtZSA9PT0gdC5uYW1lKSA9PT0gaW5kZXhcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzTWVyZ2U7XHJcbiAgICAgICAgICB9KSxcclxuICAgICAgICAgIGNhdGNoRXJyb3IoKGVycikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIHVyaSk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0pLFxyXG4gICAgICBjYXRjaEVycm9yKChlcnIyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlRXJyb3IoZXJyMiwgdXJpKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBsb2FkQ29udGV4dHMocGVybWlzc2lvbnM/OiBzdHJpbmdbXSwgaGlkZGVuPzogYm9vbGVhbikge1xyXG4gICAgbGV0IHJlcXVlc3Q7XHJcbiAgICBpZiAodGhpcy5iYXNlVXJsKSB7XHJcbiAgICAgIHJlcXVlc3QgPSB0aGlzLmdldChwZXJtaXNzaW9ucywgaGlkZGVuKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlcXVlc3QgPSB0aGlzLmdldExvY2FsQ29udGV4dHMoKTtcclxuICAgIH1cclxuICAgIHJlcXVlc3Quc3Vic2NyaWJlKChjb250ZXh0cykgPT4ge1xyXG4gICAgICBjb250ZXh0cy5vdXJzID0gdGhpcy5pbXBvcnRlZENvbnRleHQuY29uY2F0KGNvbnRleHRzLm91cnMpO1xyXG4gICAgICB0aGlzLmNvbnRleHRzJC5uZXh0KGNvbnRleHRzKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbG9hZERlZmF1bHRDb250ZXh0KCkge1xyXG4gICAgY29uc3QgbG9hZEZjdCA9IChkaXJlY3QgPSBmYWxzZSkgPT4ge1xyXG4gICAgICBpZiAoIWRpcmVjdCAmJiB0aGlzLmJhc2VVcmwgJiYgdGhpcy5hdXRoU2VydmljZS5hdXRoZW50aWNhdGVkKSB7XHJcbiAgICAgICAgdGhpcy5nZXREZWZhdWx0KCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgKF9jb250ZXh0OiBEZXRhaWxlZENvbnRleHQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0Q29udGV4dFVyaSA9IF9jb250ZXh0LnVyaTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDb250ZXh0VG9MaXN0KF9jb250ZXh0KTtcclxuICAgICAgICAgICAgdGhpcy5zZXRDb250ZXh0KF9jb250ZXh0KTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdENvbnRleHRJZCQubmV4dCh1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRDb250ZXh0KHRoaXMuZGVmYXVsdENvbnRleHRVcmkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5sb2FkQ29udGV4dCh0aGlzLmRlZmF1bHRDb250ZXh0VXJpKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAodGhpcy5yb3V0ZSAmJiB0aGlzLnJvdXRlLm9wdGlvbnMuY29udGV4dEtleSkge1xyXG4gICAgICB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zLnBpcGUoZGVib3VuY2VUaW1lKDEwMCkpLnN1YnNjcmliZSgocGFyYW1zKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29udGV4dFBhcmFtID0gcGFyYW1zW3RoaXMucm91dGUub3B0aW9ucy5jb250ZXh0S2V5IGFzIHN0cmluZ107XHJcbiAgICAgICAgbGV0IGRpcmVjdCA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChjb250ZXh0UGFyYW0pIHtcclxuICAgICAgICAgIHRoaXMuZGVmYXVsdENvbnRleHRVcmkgPSBjb250ZXh0UGFyYW07XHJcbiAgICAgICAgICBkaXJlY3QgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsb2FkRmN0KGRpcmVjdCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbG9hZEZjdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbG9hZENvbnRleHQodXJpOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNvbnRleHQkLnZhbHVlO1xyXG5cclxuICAgIGlmIChjb250ZXh0ICYmIGNvbnRleHQudXJpID09PSB1cmkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNvbnRleHRzJCQgPSB0aGlzLmdldENvbnRleHRCeVVyaSh1cmkpLnN1YnNjcmliZShcclxuICAgICAgKF9jb250ZXh0OiBEZXRhaWxlZENvbnRleHQpID0+IHtcclxuICAgICAgICBpZiAoY29udGV4dHMkJCkge1xyXG4gICAgICAgICAgY29udGV4dHMkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkZENvbnRleHRUb0xpc3QoX2NvbnRleHQpO1xyXG4gICAgICAgIHRoaXMuc2V0Q29udGV4dChfY29udGV4dCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIChlcnIpID0+IHtcclxuICAgICAgICBpZiAoY29udGV4dHMkJCkge1xyXG4gICAgICAgICAgY29udGV4dHMkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodXJpICE9PSB0aGlzLm9wdGlvbnMuZGVmYXVsdENvbnRleHRVcmkpIHtcclxuICAgICAgICAgIHRoaXMubG9hZENvbnRleHQodGhpcy5vcHRpb25zLmRlZmF1bHRDb250ZXh0VXJpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBzZXRDb250ZXh0KGNvbnRleHQ6IERldGFpbGVkQ29udGV4dCkge1xyXG4gICAgdGhpcy5oYW5kbGVDb250ZXh0TWVzc2FnZShjb250ZXh0KTtcclxuICAgIGNvbnN0IGN1cnJlbnRDb250ZXh0ID0gdGhpcy5jb250ZXh0JC52YWx1ZTtcclxuICAgIGlmIChjdXJyZW50Q29udGV4dCAmJiBjb250ZXh0ICYmIGNvbnRleHQuaWQgPT09IGN1cnJlbnRDb250ZXh0LmlkKSB7XHJcbiAgICAgIGlmIChjb250ZXh0Lm1hcC52aWV3LmtlZXBDdXJyZW50VmlldyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY29udGV4dC5tYXAudmlldy5rZWVwQ3VycmVudFZpZXcgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY29udGV4dCQubmV4dChjb250ZXh0KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghY29udGV4dC5tYXApIHtcclxuICAgICAgY29udGV4dC5tYXAgPSB7IHZpZXc6IHt9IH07XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmFzc2lnbihjb250ZXh0Lm1hcC52aWV3LCB0aGlzLm1hcFZpZXdGcm9tUm91dGUpO1xyXG5cclxuICAgIHRoaXMuY29udGV4dCQubmV4dChjb250ZXh0KTtcclxuICB9XHJcblxyXG4gIGxvYWRFZGl0ZWRDb250ZXh0KHVyaTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmdldENvbnRleHRCeVVyaSh1cmkpLnN1YnNjcmliZSgoX2NvbnRleHQ6IERldGFpbGVkQ29udGV4dCkgPT4ge1xyXG4gICAgICB0aGlzLnNldEVkaXRlZENvbnRleHQoX2NvbnRleHQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRFZGl0ZWRDb250ZXh0KGNvbnRleHQ6IERldGFpbGVkQ29udGV4dCkge1xyXG4gICAgdGhpcy5lZGl0ZWRDb250ZXh0JC5uZXh0KGNvbnRleHQpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29udGV4dEZyb21NYXAoaWdvTWFwOiBJZ29NYXAsIGVtcHR5PzogYm9vbGVhbik6IERldGFpbGVkQ29udGV4dCB7XHJcbiAgICBjb25zdCB2aWV3ID0gaWdvTWFwLm9sLmdldFZpZXcoKTtcclxuICAgIGNvbnN0IHByb2ogPSB2aWV3LmdldFByb2plY3Rpb24oKS5nZXRDb2RlKCk7XHJcbiAgICBjb25zdCBjZW50ZXI6IGFueSA9IG5ldyBvbFBvaW50KHZpZXcuZ2V0Q2VudGVyKCkpLnRyYW5zZm9ybShcclxuICAgICAgcHJvaixcclxuICAgICAgJ0VQU0c6NDMyNidcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgY29udGV4dCA9IHtcclxuICAgICAgdXJpOiB1dWlkKCksXHJcbiAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgc2NvcGU6ICdwcml2YXRlJyxcclxuICAgICAgbWFwOiB7XHJcbiAgICAgICAgdmlldzoge1xyXG4gICAgICAgICAgY2VudGVyOiBjZW50ZXIuZ2V0Q29vcmRpbmF0ZXMoKSxcclxuICAgICAgICAgIHpvb206IHZpZXcuZ2V0Wm9vbSgpLFxyXG4gICAgICAgICAgcHJvamVjdGlvbjogcHJvaixcclxuICAgICAgICAgIG1heFpvb21PbkV4dGVudDogaWdvTWFwLnZpZXdDb250cm9sbGVyLm1heFpvb21PbkV4dGVudFxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgbGF5ZXJzOiBbXSxcclxuICAgICAgdG9vbHM6IFtdXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBsYXllcnMgPSBbXTtcclxuICAgIGlmIChlbXB0eSA9PT0gdHJ1ZSkge1xyXG4gICAgICBsYXllcnMgPSBpZ29NYXAubGF5ZXJzJFxyXG4gICAgICAgIC5nZXRWYWx1ZSgpXHJcbiAgICAgICAgLmZpbHRlcihcclxuICAgICAgICAgIChsYXkpID0+XHJcbiAgICAgICAgICAgIGxheS5iYXNlTGF5ZXIgPT09IHRydWUgfHxcclxuICAgICAgICAgICAgbGF5Lm9wdGlvbnMuaWQgPT09ICdzZWFyY2hQb2ludGVyU3VtbWFyeUlkJ1xyXG4gICAgICAgIClcclxuICAgICAgICAuc29ydCgoYSwgYikgPT4gYS56SW5kZXggLSBiLnpJbmRleCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsYXllcnMgPSBpZ29NYXAubGF5ZXJzJC5nZXRWYWx1ZSgpLnNvcnQoKGEsIGIpID0+IGEuekluZGV4IC0gYi56SW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBpID0gMDtcclxuICAgIGZvciAoY29uc3QgbCBvZiBsYXllcnMpIHtcclxuICAgICAgY29uc3QgbGF5ZXI6IGFueSA9IGw7XHJcbiAgICAgIGNvbnN0IG9wdHMgPSB7XHJcbiAgICAgICAgaWQ6IGxheWVyLm9wdGlvbnMuaWQgPyBTdHJpbmcobGF5ZXIub3B0aW9ucy5pZCkgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgbGF5ZXJPcHRpb25zOiB7XHJcbiAgICAgICAgICB0aXRsZTogbGF5ZXIub3B0aW9ucy50aXRsZSxcclxuICAgICAgICAgIHpJbmRleDogKytpLFxyXG4gICAgICAgICAgdmlzaWJsZTogbGF5ZXIudmlzaWJsZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc291cmNlT3B0aW9uczoge1xyXG4gICAgICAgICAgdHlwZTogbGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zLnR5cGUsXHJcbiAgICAgICAgICBwYXJhbXM6IGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucy5wYXJhbXMsXHJcbiAgICAgICAgICB1cmw6IGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucy51cmwsXHJcbiAgICAgICAgICBxdWVyeWFibGU6IGxheWVyLnF1ZXJ5YWJsZVxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgaWYgKG9wdHMuc291cmNlT3B0aW9ucy50eXBlKSB7XHJcbiAgICAgICAgY29udGV4dC5sYXllcnMucHVzaChvcHRzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnRleHQudG9vbHMgPSB0aGlzLnRvb2xzLm1hcCgodG9vbCkgPT4ge1xyXG4gICAgICByZXR1cm4geyBpZDogU3RyaW5nKHRvb2wuaWQpLCBnbG9iYWw6IHRvb2wuZ2xvYmFsIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gY29udGV4dDtcclxuICB9XHJcblxyXG4gIGdldENvbnRleHRGcm9tTGF5ZXJzKFxyXG4gICAgaWdvTWFwOiBJZ29NYXAsXHJcbiAgICBsYXllcnM6IExheWVyW10sXHJcbiAgICBuYW1lOiBzdHJpbmdcclxuICApOiBEZXRhaWxlZENvbnRleHQge1xyXG4gICAgY29uc3QgY3VycmVudENvbnRleHQgPSB0aGlzLmNvbnRleHQkLmdldFZhbHVlKCk7XHJcbiAgICBjb25zdCB2aWV3ID0gaWdvTWFwLm9sLmdldFZpZXcoKTtcclxuICAgIGNvbnN0IHByb2ogPSB2aWV3LmdldFByb2plY3Rpb24oKS5nZXRDb2RlKCk7XHJcbiAgICBjb25zdCBjZW50ZXI6IGFueSA9IG5ldyBvbFBvaW50KHZpZXcuZ2V0Q2VudGVyKCkpLnRyYW5zZm9ybShcclxuICAgICAgcHJvaixcclxuICAgICAgJ0VQU0c6NDMyNidcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgY29udGV4dCA9IHtcclxuICAgICAgdXJpOiBuYW1lLFxyXG4gICAgICB0aXRsZTogbmFtZSxcclxuICAgICAgbWFwOiB7XHJcbiAgICAgICAgdmlldzoge1xyXG4gICAgICAgICAgY2VudGVyOiBjZW50ZXIuZ2V0Q29vcmRpbmF0ZXMoKSxcclxuICAgICAgICAgIHpvb206IHZpZXcuZ2V0Wm9vbSgpLFxyXG4gICAgICAgICAgcHJvamVjdGlvbjogcHJvalxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgbGF5ZXJzOiBbXSxcclxuICAgICAgdG9vbGJhcjogW10sXHJcbiAgICAgIHRvb2xzOiBbXSxcclxuICAgICAgZXh0cmFGZWF0dXJlczogW11cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgY3VycmVudExheWVycyA9IGlnb01hcC5sYXllcnMkLmdldFZhbHVlKCk7XHJcbiAgICBjb250ZXh0LmxheWVycyA9IGN1cnJlbnRMYXllcnNcclxuICAgICAgLmZpbHRlcigobCkgPT4gbC5iYXNlTGF5ZXIpXHJcbiAgICAgIC5tYXAoKGwpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgYmFzZUxheWVyOiB0cnVlLFxyXG4gICAgICAgICAgc291cmNlT3B0aW9uczogbC5vcHRpb25zLnNvdXJjZU9wdGlvbnMsXHJcbiAgICAgICAgICB0aXRsZTogbC5vcHRpb25zLnRpdGxlLFxyXG4gICAgICAgICAgdmlzaWJsZTogbC52aXNpYmxlXHJcbiAgICAgICAgfTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgbGF5ZXJzLmZvckVhY2goKGxheWVyKSA9PiB7XHJcbiAgICAgIGNvbnN0IGxheWVyRm91bmQgPSBjdXJyZW50Q29udGV4dC5sYXllcnMuZmluZChcclxuICAgICAgICAoY29udGV4dExheWVyKSA9PlxyXG4gICAgICAgICAgbGF5ZXIuaWQgPT09IGNvbnRleHRMYXllci5zb3VyY2UuaWQgJiYgIWNvbnRleHRMYXllci5iYXNlTGF5ZXJcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGlmIChsYXllckZvdW5kKSB7XHJcbiAgICAgICAgbGV0IGxheWVyU3R5bGUgPSBsYXllckZvdW5kW2BzdHlsZWBdO1xyXG4gICAgICAgIGlmIChsYXllckZvdW5kW2BzdHlsZUJ5QXR0cmlidXRlYF0pIHtcclxuICAgICAgICAgIGxheWVyU3R5bGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsYXllckZvdW5kW2BjbHVzdGVyQmFzZVN0eWxlYF0pIHtcclxuICAgICAgICAgIGxheWVyU3R5bGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICBkZWxldGUgbGF5ZXJGb3VuZC5zb3VyY2VPcHRpb25zW2Bzb3VyY2VgXTtcclxuICAgICAgICAgIGRlbGV0ZSBsYXllckZvdW5kLnNvdXJjZU9wdGlvbnNbYGZvcm1hdGBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBvcHRzID0ge1xyXG4gICAgICAgICAgYmFzZUxheWVyOiBsYXllckZvdW5kLmJhc2VMYXllcixcclxuICAgICAgICAgIHRpdGxlOiBsYXllci5vcHRpb25zLnRpdGxlLFxyXG4gICAgICAgICAgekluZGV4OiBsYXllci56SW5kZXgsXHJcbiAgICAgICAgICBzdHlsZUJ5QXR0cmlidXRlOiBsYXllckZvdW5kW2BzdHlsZUJ5QXR0cmlidXRlYF0sXHJcbiAgICAgICAgICBjbHVzdGVyQmFzZVN0eWxlOiBsYXllckZvdW5kW2BjbHVzdGVyQmFzZVN0eWxlYF0sXHJcbiAgICAgICAgICBzdHlsZTogbGF5ZXJTdHlsZSxcclxuICAgICAgICAgIGNsdXN0ZXJQYXJhbTogbGF5ZXJGb3VuZFtgY2x1c3RlclBhcmFtYF0sXHJcbiAgICAgICAgICB2aXNpYmxlOiBsYXllci52aXNpYmxlLFxyXG4gICAgICAgICAgb3BhY2l0eTogbGF5ZXIub3BhY2l0eSxcclxuICAgICAgICAgIHNvdXJjZU9wdGlvbnM6IGxheWVyRm91bmQuc291cmNlT3B0aW9uc1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29udGV4dC5sYXllcnMucHVzaChvcHRzKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAobGF5ZXIub2wudHlwZSAhPT0gJ1ZFQ1RPUicpIHtcclxuICAgICAgICAgIGNvbnN0IGNhdGFsb2dMYXllciA9IGxheWVyLm9wdGlvbnM7XHJcbiAgICAgICAgICBkZWxldGUgY2F0YWxvZ0xheWVyLnNvdXJjZTtcclxuICAgICAgICAgIGNvbnRleHQubGF5ZXJzLnB1c2goY2F0YWxvZ0xheWVyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbGV0IGZlYXR1cmVzO1xyXG4gICAgICAgICAgY29uc3Qgd3JpdGVyID0gbmV3IEdlb0pTT04oKTtcclxuICAgICAgICAgIGlmIChsYXllci5vbC5nZXRTb3VyY2UoKSBpbnN0YW5jZW9mIENsdXN0ZXIpIHtcclxuICAgICAgICAgICAgZmVhdHVyZXMgPSB3cml0ZXIud3JpdGVGZWF0dXJlcyhcclxuICAgICAgICAgICAgICBsYXllci5vbC5nZXRTb3VyY2UoKS5nZXRTb3VyY2UoKS5nZXRGZWF0dXJlcygpLFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRhdGFQcm9qZWN0aW9uOiAnRVBTRzo0MzI2JyxcclxuICAgICAgICAgICAgICAgIGZlYXR1cmVQcm9qZWN0aW9uOiAnRVBTRzozODU3J1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZlYXR1cmVzID0gd3JpdGVyLndyaXRlRmVhdHVyZXMoXHJcbiAgICAgICAgICAgICAgbGF5ZXIub2wuZ2V0U291cmNlKCkuZ2V0RmVhdHVyZXMoKSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkYXRhUHJvamVjdGlvbjogJ0VQU0c6NDMyNicsXHJcbiAgICAgICAgICAgICAgICBmZWF0dXJlUHJvamVjdGlvbjogJ0VQU0c6Mzg1NydcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBmZWF0dXJlcyA9IEpTT04ucGFyc2UoZmVhdHVyZXMpO1xyXG4gICAgICAgICAgZmVhdHVyZXMubmFtZSA9IGxheWVyLm9wdGlvbnMudGl0bGU7XHJcbiAgICAgICAgICBjb250ZXh0LmV4dHJhRmVhdHVyZXMucHVzaChmZWF0dXJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb250ZXh0LnRvb2xiYXIgPSB0aGlzLnRvb2xiYXI7XHJcbiAgICBjb250ZXh0LnRvb2xzID0gdGhpcy50b29scztcclxuXHJcbiAgICByZXR1cm4gY29udGV4dDtcclxuICB9XHJcblxyXG4gIHNldFRvb2xzKHRvb2xzOiBUb29sW10pIHtcclxuICAgIHRoaXMudG9vbHMgPSB0b29scztcclxuICB9XHJcblxyXG4gIHNldFRvb2xiYXIodG9vbGJhcjogc3RyaW5nW10pIHtcclxuICAgIHRoaXMudG9vbGJhciA9IHRvb2xiYXI7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUNvbnRleHRNZXNzYWdlKGNvbnRleHQ6IERldGFpbGVkQ29udGV4dCkge1xyXG4gICAgaWYgKHRoaXMuY29udGV4dE1lc3NhZ2UpIHtcclxuICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5yZW1vdmUodGhpcy5jb250ZXh0TWVzc2FnZS5pZCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBtZXNzYWdlID0gY29udGV4dC5tZXNzYWdlO1xyXG4gICAgaWYgKG1lc3NhZ2UpIHtcclxuICAgICAgbWVzc2FnZS50aXRsZSA9IG1lc3NhZ2UudGl0bGVcclxuICAgICAgICA/IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KG1lc3NhZ2UudGl0bGUpXHJcbiAgICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgICAgIG1lc3NhZ2UudGV4dCA9IG1lc3NhZ2UudGV4dFxyXG4gICAgICAgID8gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQobWVzc2FnZS50ZXh0KVxyXG4gICAgICAgIDogdW5kZWZpbmVkO1xyXG4gICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLm1lc3NhZ2UobWVzc2FnZSBhcyBNZXNzYWdlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0Q29udGV4dEJ5VXJpKHVyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxEZXRhaWxlZENvbnRleHQ+IHtcclxuICAgIGlmICh0aGlzLmJhc2VVcmwpIHtcclxuICAgICAgbGV0IGNvbnRleHRUb0xvYWQ7XHJcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHRoaXMuY29udGV4dHMkLnZhbHVlKSkge1xyXG4gICAgICAgIGNvbnRleHRUb0xvYWQgPSB0aGlzLmNvbnRleHRzJC52YWx1ZVtrZXldLmZpbmQoKGMpID0+IHtcclxuICAgICAgICAgIHJldHVybiBjLnVyaSA9PT0gdXJpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChjb250ZXh0VG9Mb2FkKSB7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjb250ZXh0VG9Mb2FkICYmIGNvbnRleHRUb0xvYWQuaW1wb3J0ZWQpIHtcclxuICAgICAgICByZXR1cm4gb2YoY29udGV4dFRvTG9hZCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFRPRE8gOiB1c2UgYWx3YXlzIGlkIG9yIHVyaVxyXG4gICAgICBjb25zdCBpZCA9IGNvbnRleHRUb0xvYWQgPyBjb250ZXh0VG9Mb2FkLmlkIDogdXJpO1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXREZXRhaWxzKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpbXBvcnRlZENvbnRleHQgPSB0aGlzLmNvbnRleHRzJC52YWx1ZS5vdXJzLmZpbmQoKGN1cnJlbnRDb250ZXh0KSA9PiB7XHJcbiAgICAgIHJldHVybiBjdXJyZW50Q29udGV4dC51cmkgPT09IHVyaSAmJiBjdXJyZW50Q29udGV4dC5pbXBvcnRlZCA9PT0gdHJ1ZTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChpbXBvcnRlZENvbnRleHQpIHtcclxuICAgICAgcmV0dXJuIG9mKGltcG9ydGVkQ29udGV4dCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXRMb2NhbENvbnRleHQodXJpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldENvbnRleHRMYXllcnMoaWdvTWFwOiBJZ29NYXApIHtcclxuICAgIGNvbnN0IGxheWVyczogTGF5ZXJbXSA9IFtdO1xyXG4gICAgY29uc3QgbWFwTGF5ZXJzID0gaWdvTWFwLmxheWVycyQuZ2V0VmFsdWUoKTtcclxuICAgIG1hcExheWVycy5mb3JFYWNoKChsYXllcikgPT4ge1xyXG4gICAgICBpZiAoIWxheWVyLmJhc2VMYXllciAmJiBsYXllci5vcHRpb25zLmlkICE9PSAnc2VhcmNoUG9pbnRlclN1bW1hcnlJZCcpIHtcclxuICAgICAgICBsYXllcnMucHVzaChsYXllcik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGxheWVycztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVhZFBhcmFtc0Zyb21Sb3V0ZSgpIHtcclxuICAgIGlmICghdGhpcy5yb3V0ZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yb3V0ZS5xdWVyeVBhcmFtcy5zdWJzY3JpYmUoKHBhcmFtcykgPT4ge1xyXG4gICAgICBjb25zdCBjZW50ZXJLZXkgPSB0aGlzLnJvdXRlLm9wdGlvbnMuY2VudGVyS2V5O1xyXG4gICAgICBpZiAoY2VudGVyS2V5ICYmIHBhcmFtc1tjZW50ZXJLZXkgYXMgc3RyaW5nXSkge1xyXG4gICAgICAgIGNvbnN0IGNlbnRlclBhcmFtcyA9IHBhcmFtc1tjZW50ZXJLZXkgYXMgc3RyaW5nXTtcclxuICAgICAgICB0aGlzLm1hcFZpZXdGcm9tUm91dGUuY2VudGVyID0gY2VudGVyUGFyYW1zLnNwbGl0KCcsJykubWFwKE51bWJlcik7XHJcbiAgICAgICAgdGhpcy5tYXBWaWV3RnJvbVJvdXRlLmdlb2xvY2F0ZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwcm9qZWN0aW9uS2V5ID0gdGhpcy5yb3V0ZS5vcHRpb25zLnByb2plY3Rpb25LZXk7XHJcbiAgICAgIGlmIChwcm9qZWN0aW9uS2V5ICYmIHBhcmFtc1twcm9qZWN0aW9uS2V5IGFzIHN0cmluZ10pIHtcclxuICAgICAgICBjb25zdCBwcm9qZWN0aW9uUGFyYW0gPSBwYXJhbXNbcHJvamVjdGlvbktleSBhcyBzdHJpbmddO1xyXG4gICAgICAgIHRoaXMubWFwVmlld0Zyb21Sb3V0ZS5wcm9qZWN0aW9uID0gcHJvamVjdGlvblBhcmFtO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCB6b29tS2V5ID0gdGhpcy5yb3V0ZS5vcHRpb25zLnpvb21LZXk7XHJcbiAgICAgIGlmICh6b29tS2V5ICYmIHBhcmFtc1t6b29tS2V5IGFzIHN0cmluZ10pIHtcclxuICAgICAgICBjb25zdCB6b29tUGFyYW0gPSBwYXJhbXNbem9vbUtleSBhcyBzdHJpbmddO1xyXG4gICAgICAgIHRoaXMubWFwVmlld0Zyb21Sb3V0ZS56b29tID0gTnVtYmVyKHpvb21QYXJhbSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRQYXRoKGZpbGU6IHN0cmluZykge1xyXG4gICAgY29uc3QgYmFzZVBhdGggPSB0aGlzLm9wdGlvbnMuYmFzZVBhdGgucmVwbGFjZSgvXFwvJC8sICcnKTtcclxuXHJcbiAgICByZXR1cm4gYCR7YmFzZVBhdGh9LyR7ZmlsZX1gO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVFcnJvcihcclxuICAgIGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSxcclxuICAgIHVyaTogc3RyaW5nLFxyXG4gICAgcGVybWlzc2lvbkVycm9yPzogYm9vbGVhblxyXG4gICk6IE1lc3NhZ2VbXSB7XHJcbiAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jb250ZXh0cyQudmFsdWUub3Vycy5maW5kKChvYmopID0+IG9iai51cmkgPT09IHVyaSk7XHJcbiAgICBjb25zdCB0aXRsZUNvbnRleHQgPSBjb250ZXh0ID8gY29udGV4dC50aXRsZSA6IHVyaTtcclxuICAgIGVycm9yLmVycm9yLnRpdGxlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5pbnZhbGlkLnRpdGxlJ1xyXG4gICAgKTtcclxuXHJcbiAgICBlcnJvci5lcnJvci5tZXNzYWdlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5pbnZhbGlkLnRleHQnLFxyXG4gICAgICB7IHZhbHVlOiB0aXRsZUNvbnRleHQgfVxyXG4gICAgKTtcclxuXHJcbiAgICBlcnJvci5lcnJvci50b0Rpc3BsYXkgPSB0cnVlO1xyXG5cclxuICAgIGlmIChwZXJtaXNzaW9uRXJyb3IpIHtcclxuICAgICAgZXJyb3IuZXJyb3IudGl0bGUgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmNvbnRleHQuY29udGV4dE1hbmFnZXIuZXJyb3JzLmFkZFBlcm1pc3Npb25UaXRsZSdcclxuICAgICAgKTtcclxuICAgICAgZXJyb3IuZXJyb3IubWVzc2FnZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5lcnJvcnMuYWRkUGVybWlzc2lvbidcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICB0aHJvdyBlcnJvcjtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlQ29udGV4dHNDaGFuZ2UoXHJcbiAgICBjb250ZXh0czogQ29udGV4dHNMaXN0LFxyXG4gICAga2VlcEN1cnJlbnRDb250ZXh0ID0gdHJ1ZVxyXG4gICkge1xyXG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMuY29udGV4dCQudmFsdWU7XHJcbiAgICBjb25zdCBlZGl0ZWRDb250ZXh0ID0gdGhpcy5lZGl0ZWRDb250ZXh0JC52YWx1ZTtcclxuXHJcbiAgICBpZiAoIWtlZXBDdXJyZW50Q29udGV4dCB8fCAhdGhpcy5maW5kQ29udGV4dChjb250ZXh0KSkge1xyXG4gICAgICB0aGlzLmxvYWREZWZhdWx0Q29udGV4dCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGNvbnRleHQubWFwLnZpZXcua2VlcEN1cnJlbnRWaWV3ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb250ZXh0Lm1hcC52aWV3LmtlZXBDdXJyZW50VmlldyA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jb250ZXh0JC5uZXh0KGNvbnRleHQpO1xyXG4gICAgICBpZiAodGhpcy5iYXNlVXJsICYmIHRoaXMuYXV0aFNlcnZpY2UuYXV0aGVudGljYXRlZCkge1xyXG4gICAgICAgIHRoaXMuZ2V0RGVmYXVsdCgpLnN1YnNjcmliZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBlZGl0ZWRGb3VuZCA9IHRoaXMuZmluZENvbnRleHQoZWRpdGVkQ29udGV4dCk7XHJcbiAgICBpZiAoIWVkaXRlZEZvdW5kIHx8IGVkaXRlZEZvdW5kLnBlcm1pc3Npb24gIT09ICd3cml0ZScpIHtcclxuICAgICAgdGhpcy5zZXRFZGl0ZWRDb250ZXh0KHVuZGVmaW5lZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZENvbnRleHRUb0xpc3QoY29udGV4dDogQ29udGV4dCkge1xyXG4gICAgY29uc3QgY29udGV4dEZvdW5kID0gdGhpcy5maW5kQ29udGV4dChjb250ZXh0KTtcclxuICAgIGlmICghY29udGV4dEZvdW5kKSB7XHJcbiAgICAgIGNvbnN0IGNvbnRleHRTaW1wbGlmaWUgPSB7XHJcbiAgICAgICAgaWQ6IGNvbnRleHQuaWQsXHJcbiAgICAgICAgdXJpOiBjb250ZXh0LnVyaSxcclxuICAgICAgICB0aXRsZTogY29udGV4dC50aXRsZSxcclxuICAgICAgICBzY29wZTogY29udGV4dC5zY29wZSxcclxuICAgICAgICBwZXJtaXNzaW9uOiBUeXBlUGVybWlzc2lvbltUeXBlUGVybWlzc2lvbi5yZWFkXVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKHRoaXMuY29udGV4dHMkLnZhbHVlICYmIHRoaXMuY29udGV4dHMkLnZhbHVlLnB1YmxpYykge1xyXG4gICAgICAgIHRoaXMuY29udGV4dHMkLnZhbHVlLnB1YmxpYy5wdXNoKGNvbnRleHRTaW1wbGlmaWUpO1xyXG4gICAgICAgIHRoaXMuY29udGV4dHMkLm5leHQodGhpcy5jb250ZXh0cyQudmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZpbmRDb250ZXh0KGNvbnRleHQ6IENvbnRleHQpIHtcclxuICAgIGlmICghY29udGV4dCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29udGV4dHMgPSB0aGlzLmNvbnRleHRzJC52YWx1ZTtcclxuICAgIGxldCBmb3VuZDtcclxuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGNvbnRleHRzKSkge1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IGNvbnRleHRzW2tleV07XHJcbiAgICAgIGZvdW5kID0gdmFsdWUuZmluZChcclxuICAgICAgICAoYykgPT5cclxuICAgICAgICAgIChjb250ZXh0LmlkICYmIGMuaWQgPT09IGNvbnRleHQuaWQpIHx8XHJcbiAgICAgICAgICAoY29udGV4dC51cmkgJiYgYy51cmkgPT09IGNvbnRleHQudXJpKVxyXG4gICAgICApO1xyXG4gICAgICBpZiAoZm91bmQpIHtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmb3VuZDtcclxuICB9XHJcbn1cclxuIl19