import { map, tap, catchError, debounceTime, filter, withLatestFrom, skip } from 'rxjs/operators';
import { fromLonLat } from 'ol/proj';
import { easeOut } from 'ol/easing';
import olPoint from 'ol/geom/Point';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of, zip, EMPTY } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { uuid, ObjectUtils, Clipboard } from '@igo2/utils';
import { AuthService, IgoAuthModule } from '@igo2/auth';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatButtonModule, MatTooltipModule, MatListModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatRadioModule, MatDialogRef, MatDialog, MatSelectModule, MatOptionModule, MatDialogModule, MatSidenavModule } from '@angular/material';
import { Injectable, Optional, Directive, Self, HostListener, Component, Input, Output, EventEmitter, ChangeDetectorRef, NgModule, defineInjectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfigService, RouteService, LanguageService, MessageService, IgoLanguageModule } from '@igo2/core';
import { ConfirmDialogService, IgoListModule, IgoKeyValueModule, IgoCollapsibleModule, IgoStopPropagationModule, IgoConfirmDialogModule, getEntityTitle, IgoPanelModule, IgoFlexibleModule } from '@igo2/common';
import { MapBrowserComponent, LayerService, MapService, RoutingFormService, moveToOlFeatures, FeatureMotion, LayerListService, IgoFeatureModule } from '@igo2/geo';
import olFormatGeoJSON from 'ol/format/GeoJSON';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const TypePermission = {
    null: 0,
    read: 1,
    write: 2,
};
TypePermission[TypePermission.null] = 'null';
TypePermission[TypePermission.read] = 'read';
TypePermission[TypePermission.write] = 'write';
/** @enum {number} */
const Scope = {
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
class ContextService {
    /**
     * @param {?} http
     * @param {?} authService
     * @param {?} languageService
     * @param {?} config
     * @param {?} route
     */
    constructor(http, authService, languageService, config, route) {
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
        authenticated => {
            if (authenticated === null) {
                this.loadDefaultContext();
                return;
            }
            /** @type {?} */
            const contexts$$ = this.contexts$.subscribe((/**
             * @param {?} contexts
             * @return {?}
             */
            contexts => {
                if (contexts$$) {
                    contexts$$.unsubscribe();
                    this.handleContextsChange(contexts);
                }
            }));
            this.loadContexts();
        }));
    }
    /**
     * @return {?}
     */
    get() {
        /** @type {?} */
        const url = this.baseUrl + '/contexts';
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
        return this.http
            .get(url)
            .pipe(catchError((/**
         * @param {?} res
         * @return {?}
         */
        res => this.handleError(res, id))));
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
        context => {
            this.defaultContextId$.next(context.id);
        })));
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
    delete(id) {
        /** @type {?} */
        const url = this.baseUrl + '/contexts/' + id;
        return this.http.delete(url).pipe(tap((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            /** @type {?} */
            const contexts = { ours: [] };
            Object.keys(this.contexts$.value).forEach((/**
             * @param {?} key
             * @return {?}
             */
            key => (contexts[key] = this.contexts$.value[key].filter((/**
             * @param {?} c
             * @return {?}
             */
            c => c.id !== id)))));
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
        contextCreated => {
            if (this.authService.authenticated) {
                contextCreated.permission = TypePermission[TypePermission.write];
            }
            else {
                contextCreated.permission = TypePermission[TypePermission.read];
            }
            this.contexts$.value.ours.push(contextCreated);
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
        contextCloned => {
            contextCloned.permission = TypePermission[TypePermission.write];
            this.contexts$.value.ours.push(contextCloned);
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
        return this.http.post(url, JSON.stringify(association));
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
        return this.http.get(url).pipe(catchError((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            return this.handleError(res, uri);
        })));
    }
    /**
     * @return {?}
     */
    loadContexts() {
        /** @type {?} */
        let request;
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
        contexts => {
            /** @type {?} */
            const publicsContexts = this.contexts$.value.public;
            if (publicsContexts) {
                /** @type {?} */
                const contextUri = publicsContexts.find((/**
                 * @param {?} c
                 * @return {?}
                 */
                c => c.uri === this.options.defaultContextUri));
                if (contextUri) {
                    if (!contexts.public) {
                        contexts.public = [];
                    }
                    contexts.public.push(contextUri);
                }
            }
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
                    this.options.defaultContextUri = _context.uri;
                    this.addContextToList(_context);
                    this.setContext(_context);
                }), (/**
                 * @return {?}
                 */
                () => {
                    this.defaultContextId$.next(undefined);
                    this.loadContext(this.options.defaultContextUri);
                }));
            }
            else {
                this.loadContext(this.options.defaultContextUri);
            }
        });
        if (this.route && this.route.options.contextKey) {
            this.route.queryParams.pipe(debounceTime(100)).subscribe((/**
             * @param {?} params
             * @return {?}
             */
            params => {
                /** @type {?} */
                const contextParam = params[(/** @type {?} */ (this.route.options.contextKey))];
                /** @type {?} */
                let direct = false;
                if (contextParam) {
                    this.options.defaultContextUri = contextParam;
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
            contexts$$.unsubscribe();
            this.addContextToList(_context);
            this.setContext(_context);
        }), (/**
         * @param {?} err
         * @return {?}
         */
        err => {
            contexts$$.unsubscribe();
        }));
    }
    /**
     * @param {?} context
     * @return {?}
     */
    setContext(context) {
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
     * @return {?}
     */
    getContextFromMap(igoMap) {
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
                    projection: proj
                }
            },
            layers: [],
            tools: []
        };
        /** @type {?} */
        const layers = igoMap.layers$.getValue();
        for (const l of layers) {
            /** @type {?} */
            const layer = l;
            /** @type {?} */
            const opts = {
                id: layer.options.id ? String(layer.options.id) : undefined,
                layerOptions: {
                    title: layer.options.title,
                    zIndex: layer.zIndex,
                    visible: layer.visible
                },
                sourceOptions: {
                    type: layer.dataSource.options.type,
                    params: layer.dataSource.options.params,
                    url: layer.dataSource.options.url
                }
            };
            context.layers.push(opts);
        }
        context.tools = this.tools.map((/**
         * @param {?} tool
         * @return {?}
         */
        tool => {
            return { id: String(tool.id) };
        }));
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
                c => {
                    return c.uri === uri;
                }));
                if (contextToLoad) {
                    break;
                }
            }
            // TODO : use always id or uri
            /** @type {?} */
            const id = contextToLoad ? contextToLoad.id : uri;
            return this.getDetails(id);
        }
        return this.getLocalContext(uri);
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
        params => {
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
     * @param {?} res
     * @param {?} uri
     * @return {?}
     */
    handleError(res, uri) {
        /** @type {?} */
        const context = this.contexts$.value.ours.find((/**
         * @param {?} obj
         * @return {?}
         */
        obj => obj.uri === uri));
        /** @type {?} */
        const titleContext = context ? context.title : uri;
        /** @type {?} */
        const titleError = this.languageService.translate.instant('igo.context.contextManager.invalid.title');
        /** @type {?} */
        const textError = this.languageService.translate.instant('igo.context.contextManager.invalid.text', { value: titleContext });
        throw [{ title: titleError, text: textError }];
    }
    /**
     * @private
     * @param {?} contexts
     * @param {?=} keepCurrentContext
     * @return {?}
     */
    handleContextsChange(contexts, keepCurrentContext = false) {
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
            this.getDefault().subscribe((/**
             * @return {?}
             */
            () => { }));
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
        if (!context || !context.id) {
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
            c => c.id === context.id));
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
    { type: RouteService, decorators: [{ type: Optional }] }
];
/** @nocollapse */ ContextService.ngInjectableDef = defineInjectable({ factory: function ContextService_Factory() { return new ContextService(inject(HttpClient), inject(AuthService), inject(LanguageService), inject(ConfigService), inject(RouteService, 8)); }, token: ContextService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MapContextDirective {
    /**
     * @param {?} component
     * @param {?} contextService
     */
    constructor(component, contextService) {
        this.contextService = contextService;
        this.component = component;
    }
    /**
     * @return {?}
     */
    get map() {
        return this.component.map;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.context$$ = this.contextService.context$
            .pipe(filter((/**
         * @param {?} context
         * @return {?}
         */
        context => context !== undefined)))
            .subscribe((/**
         * @param {?} context
         * @return {?}
         */
        context => this.handleContextChange(context)));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.context$$.unsubscribe();
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    handleContextChange(context) {
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
        const viewContext = context.map.view;
        if (viewContext.keepCurrentView !== true) {
            this.component.view = (/** @type {?} */ (viewContext));
        }
    }
}
MapContextDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoMapContext]'
            },] }
];
/** @nocollapse */
MapContextDirective.ctorParameters = () => [
    { type: MapBrowserComponent },
    { type: ContextService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LayerContextDirective {
    /**
     * @param {?} component
     * @param {?} contextService
     * @param {?} layerService
     * @param {?} route
     */
    constructor(component, contextService, layerService, route) {
        this.component = component;
        this.contextService = contextService;
        this.layerService = layerService;
        this.route = route;
        this.contextLayers = [];
    }
    /**
     * @return {?}
     */
    get map() {
        return this.component.map;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.context$$ = this.contextService.context$
            .pipe(filter((/**
         * @param {?} context
         * @return {?}
         */
        context => context !== undefined)))
            .subscribe((/**
         * @param {?} context
         * @return {?}
         */
        context => this.handleContextChange(context)));
        if (this.route &&
            this.route.options.visibleOnLayersKey &&
            this.route.options.visibleOffLayersKey &&
            this.route.options.contextKey) {
            /** @type {?} */
            const queryParams$$ = this.route.queryParams
                .pipe(skip(1))
                .subscribe((/**
             * @param {?} params
             * @return {?}
             */
            params => {
                this.queryParams = params;
                queryParams$$.unsubscribe();
            }));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.context$$.unsubscribe();
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    handleContextChange(context) {
        if (context.layers === undefined) {
            return;
        }
        this.map.removeLayers(this.contextLayers);
        this.contextLayers = [];
        /** @type {?} */
        const layersAndIndex$ = zip(...context.layers.map((/**
         * @param {?} layerOptions
         * @param {?} index
         * @return {?}
         */
        (layerOptions, index) => {
            return this.layerService.createAsyncLayer(layerOptions).pipe(withLatestFrom(of(index)));
        })));
        layersAndIndex$.subscribe((/**
         * @param {?} layersAndIndex
         * @return {?}
         */
        (layersAndIndex) => {
            /** @type {?} */
            const layers = layersAndIndex.reduce((/**
             * @param {?} acc
             * @param {?} bunch
             * @return {?}
             */
            (acc, bunch) => {
                const [layer, index] = bunch;
                layer.visible = this.computeLayerVisibilityFromUrl(layer);
                layer.zIndex = layer.zIndex || index + 1; // Map indexes start at 1
                acc[index] = layer;
                return acc;
            }), new Array(layersAndIndex.length));
            this.contextLayers = layers;
            this.map.addLayers(layers);
        }));
    }
    /**
     * @private
     * @param {?} layer
     * @return {?}
     */
    computeLayerVisibilityFromUrl(layer) {
        /** @type {?} */
        const params = this.queryParams;
        /** @type {?} */
        const currentContext = this.contextService.context$.value.uri;
        /** @type {?} */
        const currentLayerid = layer.id;
        /** @type {?} */
        let visible = layer.visible;
        if (!params || !currentLayerid) {
            return visible;
        }
        /** @type {?} */
        const contextParams = params[(/** @type {?} */ (this.route.options.contextKey))];
        if (contextParams === currentContext || !contextParams) {
            /** @type {?} */
            let visibleOnLayersParams = '';
            /** @type {?} */
            let visibleOffLayersParams = '';
            /** @type {?} */
            let visiblelayers = [];
            /** @type {?} */
            let invisiblelayers = [];
            if (this.route.options.visibleOnLayersKey &&
                params[(/** @type {?} */ (this.route.options.visibleOnLayersKey))]) {
                visibleOnLayersParams =
                    params[(/** @type {?} */ (this.route.options.visibleOnLayersKey))];
            }
            if (this.route.options.visibleOffLayersKey &&
                params[(/** @type {?} */ (this.route.options.visibleOffLayersKey))]) {
                visibleOffLayersParams =
                    params[(/** @type {?} */ (this.route.options.visibleOffLayersKey))];
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
    }
}
LayerContextDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoLayerContext]'
            },] }
];
/** @nocollapse */
LayerContextDirective.ctorParameters = () => [
    { type: MapBrowserComponent },
    { type: ContextService },
    { type: LayerService },
    { type: RouteService, decorators: [{ type: Optional }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ContextListComponent {
    /**
     * @param {?} cdRef
     */
    constructor(cdRef) {
        this.cdRef = cdRef;
        this._contexts = { ours: [] };
        this.select = new EventEmitter();
        this.unselect = new EventEmitter();
        this.edit = new EventEmitter();
        this.delete = new EventEmitter();
        this.save = new EventEmitter();
        this.clone = new EventEmitter();
        this.favorite = new EventEmitter();
        this.managePermissions = new EventEmitter();
        this.manageTools = new EventEmitter();
        this.titleMapping = {
            ours: 'igo.context.contextManager.ourContexts',
            shared: 'igo.context.contextManager.sharedContexts',
            public: 'igo.context.contextManager.publicContexts'
        };
    }
    /**
     * @return {?}
     */
    get contexts() {
        return this._contexts;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set contexts(value) {
        this._contexts = value;
    }
    /**
     * @return {?}
     */
    get selectedContext() {
        return this._selectedContext;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selectedContext(value) {
        this._selectedContext = value;
        this.cdRef.detectChanges();
    }
    /**
     * @return {?}
     */
    get defaultContextId() {
        return this._defaultContextId;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set defaultContextId(value) {
        this._defaultContextId = value;
    }
}
ContextListComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-context-list',
                template: "<igo-list [navigation]=\"true\">\r\n  <ng-template ngFor let-groupContexts [ngForOf]=\"contexts | keyvalue\">\r\n    <igo-collapsible *ngIf=\"groupContexts.value.length\" [title]=\"titleMapping[groupContexts.key] | translate\">\r\n\r\n      <ng-template ngFor let-context [ngForOf]=\"groupContexts.value\">\r\n        <igo-context-item\r\n          igoListItem\r\n          color=\"accent\"\r\n          [selected]=\"selectedContext && selectedContext.uri === context.uri\"\r\n          [context]=\"context\"\r\n          [default]=\"this.defaultContextId === context.id\"\r\n          (edit)=\"edit.emit(context)\"\r\n          (delete)=\"delete.emit(context)\"\r\n          (clone)=\"clone.emit(context)\"\r\n          (save)=\"save.emit(context)\"\r\n          (favorite)=\"favorite.emit(context)\"\r\n          (manageTools)=\"manageTools.emit(context)\"\r\n          (managePermissions)=\"managePermissions.emit(context)\"\r\n          (select)=\"select.emit(context)\"\r\n          (unselect)=\"unselect.emit(context)\">\r\n        </igo-context-item>\r\n      </ng-template>\r\n\r\n    </igo-collapsible>\r\n  </ng-template>\r\n</igo-list>\r\n"
            }] }
];
/** @nocollapse */
ContextListComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
ContextListComponent.propDecorators = {
    contexts: [{ type: Input }],
    selectedContext: [{ type: Input }],
    defaultContextId: [{ type: Input }],
    select: [{ type: Output }],
    unselect: [{ type: Output }],
    edit: [{ type: Output }],
    delete: [{ type: Output }],
    save: [{ type: Output }],
    clone: [{ type: Output }],
    favorite: [{ type: Output }],
    managePermissions: [{ type: Output }],
    manageTools: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ContextListBindingDirective {
    /**
     * @param {?} component
     * @param {?} contextService
     * @param {?} mapService
     * @param {?} languageService
     * @param {?} confirmDialogService
     * @param {?} messageService
     */
    constructor(component, contextService, mapService, languageService, confirmDialogService, messageService) {
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
    onSelect(context) {
        this.contextService.loadContext(context.uri);
    }
    /**
     * @param {?} context
     * @return {?}
     */
    onEdit(context) {
        this.contextService.loadEditedContext(context.uri);
    }
    /**
     * @param {?} context
     * @return {?}
     */
    onSave(context) {
        /** @type {?} */
        const map$$1 = this.mapService.getMap();
        /** @type {?} */
        const contextFromMap = this.contextService.getContextFromMap(map$$1);
        /** @type {?} */
        const changes = {
            layers: contextFromMap.layers,
            map: {
                view: contextFromMap.map.view
            }
        };
        this.contextService.update(context.id, changes).subscribe((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const translate = this.languageService.translate;
            /** @type {?} */
            const message = translate.instant('igo.context.contextManager.dialog.saveMsg', {
                value: context.title
            });
            /** @type {?} */
            const title = translate.instant('igo.context.contextManager.dialog.saveTitle');
            this.messageService.success(message, title);
        }));
    }
    /**
     * @param {?} context
     * @return {?}
     */
    onFavorite(context) {
        this.contextService.setDefault(context.id).subscribe((/**
         * @return {?}
         */
        () => {
            this.contextService.defaultContextId$.next(context.id);
            /** @type {?} */
            const translate = this.languageService.translate;
            /** @type {?} */
            const message = translate.instant('igo.context.contextManager.dialog.favoriteMsg', {
                value: context.title
            });
            /** @type {?} */
            const title = translate.instant('igo.context.contextManager.dialog.favoriteTitle');
            this.messageService.success(message, title);
        }));
    }
    /**
     * @param {?} context
     * @return {?}
     */
    onManageTools(context) {
        this.contextService.loadEditedContext(context.uri);
    }
    /**
     * @param {?} context
     * @return {?}
     */
    onManagePermissions(context) {
        this.contextService.loadEditedContext(context.uri);
    }
    /**
     * @param {?} context
     * @return {?}
     */
    onDelete(context) {
        /** @type {?} */
        const translate = this.languageService.translate;
        this.confirmDialogService
            .open(translate.instant('igo.context.contextManager.dialog.confirmDelete'))
            .subscribe((/**
         * @param {?} confirm
         * @return {?}
         */
        confirm => {
            if (confirm) {
                this.contextService.delete(context.id).subscribe((/**
                 * @return {?}
                 */
                () => {
                    /** @type {?} */
                    const message = translate.instant('igo.context.contextManager.dialog.deleteMsg', {
                        value: context.title
                    });
                    /** @type {?} */
                    const title = translate.instant('igo.context.contextManager.dialog.deleteTitle');
                    this.messageService.info(message, title);
                }));
            }
        }));
    }
    /**
     * @param {?} context
     * @return {?}
     */
    onClone(context) {
        /** @type {?} */
        const properties = {
            title: context.title + '-copy',
            uri: context.uri + '-copy'
        };
        this.contextService.clone(context.id, properties).subscribe((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const translate = this.languageService.translate;
            /** @type {?} */
            const message = translate.instant('igo.context.contextManager.dialog.cloneMsg', {
                value: context.title
            });
            /** @type {?} */
            const title = translate.instant('igo.context.contextManager.dialog.cloneTitle');
            this.messageService.success(message, title);
        }));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Override input contexts
        this.component.contexts = { ours: [] };
        this.contexts$$ = this.contextService.contexts$.subscribe((/**
         * @param {?} contexts
         * @return {?}
         */
        contexts => this.handleContextsChange(contexts)));
        this.defaultContextId$$ = this.contextService.defaultContextId$.subscribe((/**
         * @param {?} id
         * @return {?}
         */
        id => {
            this.component.defaultContextId = id;
        }));
        // See feature-list.component for an explanation about the debounce time
        this.selectedContext$$ = this.contextService.context$
            .pipe(debounceTime(100))
            .subscribe((/**
         * @param {?} context
         * @return {?}
         */
        context => (this.component.selectedContext = context)));
        this.contextService.loadContexts();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.contexts$$.unsubscribe();
        this.selectedContext$$.unsubscribe();
        this.defaultContextId$$.unsubscribe();
    }
    /**
     * @private
     * @param {?} contexts
     * @return {?}
     */
    handleContextsChange(contexts) {
        this.component.contexts = contexts;
    }
}
ContextListBindingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoContextListBinding]'
            },] }
];
/** @nocollapse */
ContextListBindingDirective.ctorParameters = () => [
    { type: ContextListComponent, decorators: [{ type: Self }] },
    { type: ContextService },
    { type: MapService },
    { type: LanguageService },
    { type: ConfirmDialogService },
    { type: MessageService }
];
ContextListBindingDirective.propDecorators = {
    onSelect: [{ type: HostListener, args: ['select', ['$event'],] }],
    onEdit: [{ type: HostListener, args: ['edit', ['$event'],] }],
    onSave: [{ type: HostListener, args: ['save', ['$event'],] }],
    onFavorite: [{ type: HostListener, args: ['favorite', ['$event'],] }],
    onManageTools: [{ type: HostListener, args: ['manageTools', ['$event'],] }],
    onManagePermissions: [{ type: HostListener, args: ['managePermissions', ['$event'],] }],
    onDelete: [{ type: HostListener, args: ['delete', ['$event'],] }],
    onClone: [{ type: HostListener, args: ['clone', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ContextItemComponent {
    /**
     * @param {?} auth
     */
    constructor(auth) {
        this.auth = auth;
        this.typePermission = TypePermission;
        this.color = 'primary';
        this.collapsed = true;
        this._default = false;
        this.edit = new EventEmitter();
        this.delete = new EventEmitter();
        this.save = new EventEmitter();
        this.clone = new EventEmitter();
        this.favorite = new EventEmitter();
        this.managePermissions = new EventEmitter();
        this.manageTools = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get context() {
        return this._context;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set context(value) {
        this._context = value;
    }
    /**
     * @return {?}
     */
    get default() {
        return this._default;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set default(value) {
        this._default = value;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    favoriteClick(context) {
        if (this.auth.authenticated) {
            this.favorite.emit(context);
        }
    }
}
ContextItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-context-item',
                template: "<mat-list-item>\r\n  <button mat-list-avatar\r\n    mat-icon-button\r\n    igoStopPropagation\r\n    [matTooltip]=\"'igo.context.contextManager.favorite' | translate\"\r\n    matTooltipShowDelay=\"500\"\r\n    [color]=\"default ? 'primary' : 'default'\"\r\n    (click)=\"favoriteClick(context)\">\r\n    <mat-icon *ngIf=\"!context.iconImage\" svgIcon=\"{{context.icon ? context.icon : context.scope === 'public' ? 'earth' : 'star'}}\"></mat-icon>\r\n    <img *ngIf=\"context.iconImage\" [src]=\"context.iconImage\">\r\n  </button>\r\n  <h4 matLine>{{context.title}}</h4>\r\n\r\n  <div *ngIf=\"auth.authenticated && context.permission === typePermission[typePermission.read]\"\r\n       igoStopPropagation\r\n       class=\"igo-actions-container\">\r\n\r\n       <button\r\n         mat-icon-button\r\n         [matTooltip]=\"'igo.context.contextManager.clone' | translate\"\r\n         matTooltipShowDelay=\"500\"\r\n         [color]=\"color\"\r\n         (click)=\"clone.emit(context)\">\r\n         <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n       </button>\r\n </div>\r\n\r\n\r\n  <div *ngIf=\"context.permission === typePermission[typePermission.write]\"\r\n       igoStopPropagation\r\n       class=\"igo-actions-container\">\r\n\r\n     <button *ngIf=\"collapsed\"\r\n       mat-icon-button\r\n       [matTooltip]=\"'igo.context.contextManager.save' | translate\"\r\n       matTooltipShowDelay=\"500\"\r\n       [color]=\"color\"\r\n       (click)=\"save.emit(context)\">\r\n       <mat-icon svgIcon=\"content-save\"></mat-icon>\r\n     </button>\r\n\r\n    <div #actions class=\"igo-actions-expand-container\">\r\n\r\n      <button\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.context.contextManager.managePermissions' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        [color]=\"color\"\r\n        (click)=\"managePermissions.emit(context)\">\r\n        <mat-icon svgIcon=\"account-outline\"></mat-icon>\r\n      </button>\r\n\r\n      <!--button\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.context.contextManager.manageTools' | translate\"\r\n        [color]=\"color\"\r\n        (click)=\"manageTools.emit(context)\">\r\n        <mat-icon svgIcon=\"widgets\"></mat-icon>\r\n      </button-->\r\n\r\n      <button\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.context.contextManager.clone' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        [color]=\"color\"\r\n        (click)=\"clone.emit(context)\">\r\n        <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n      </button>\r\n\r\n      <button\r\n        mat-icon-button\r\n        [color]=\"color\"\r\n        [matTooltip]=\"'igo.context.contextManager.edit' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"edit.emit(context)\">\r\n        <mat-icon svgIcon=\"pencil\"></mat-icon>\r\n      </button>\r\n\r\n      <button\r\n        mat-icon-button\r\n        color=\"warn\"\r\n        [matTooltip]=\"'igo.context.contextManager.delete' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"delete.emit(context)\">\r\n        <mat-icon svgIcon=\"delete\"></mat-icon>\r\n      </button>\r\n    </div>\r\n\r\n    <button\r\n      mat-icon-button\r\n      igoCollapse\r\n      [color]=\"color\"\r\n      [target]=\"actions\"\r\n      [collapsed]=collapsed\r\n      (click)=\"collapsed = !collapsed\">\r\n      <mat-icon svgIcon=\"dots-horizontal\"></mat-icon>\r\n    </button>\r\n\r\n  </div>\r\n\r\n</mat-list-item>\r\n",
                styles: [":host{overflow:hidden}.igo-actions-container{flex-shrink:0}.igo-actions-expand-container{display:inline-flex}mat-list-item>>>.mat-list-item-content .mat-list-text{padding:0}mat-list-item>>>.mat-list-item-content .mat-list-text>h4{padding:0 16px}mat-icon.disabled{color:rgba(0,0,0,.38)}"]
            }] }
];
/** @nocollapse */
ContextItemComponent.ctorParameters = () => [
    { type: AuthService }
];
ContextItemComponent.propDecorators = {
    context: [{ type: Input }],
    default: [{ type: Input }],
    edit: [{ type: Output }],
    delete: [{ type: Output }],
    save: [{ type: Output }],
    clone: [{ type: Output }],
    favorite: [{ type: Output }],
    managePermissions: [{ type: Output }],
    manageTools: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ContextFormComponent {
    /**
     * @param {?} formBuilder
     */
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this._disabled = false;
        // TODO: replace any by ContextOptions or Context
        this.submitForm = new EventEmitter();
        this.clone = new EventEmitter();
        this.delete = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get btnSubmitText() {
        return this._btnSubmitText;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set btnSubmitText(value) {
        this._btnSubmitText = value;
    }
    /**
     * @return {?}
     */
    get context() {
        return this._context;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set context(value) {
        this._context = value;
        this.buildForm();
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = value;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.buildForm();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    handleFormSubmit(value) {
        /** @type {?} */
        let inputs = Object.assign({}, value);
        inputs = ObjectUtils.removeNull(inputs);
        inputs.uri = inputs.uri.replace(' ', '');
        if (inputs.uri) {
            inputs.uri = this.prefix + '-' + inputs.uri;
        }
        else {
            inputs.uri = this.prefix;
        }
        this.submitForm.emit(inputs);
    }
    /**
     * @private
     * @return {?}
     */
    buildForm() {
        /** @type {?} */
        const context = this.context || {};
        /** @type {?} */
        const uriSplit = context.uri.split('-');
        this.prefix = uriSplit.shift();
        /** @type {?} */
        const uri = uriSplit.join('-');
        this.form = this.formBuilder.group({
            title: [context.title],
            uri: [uri || ' ']
        });
    }
}
ContextFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-context-form',
                template: "<form class=\"igo-form\" [formGroup]=\"form\"\r\n  (ngSubmit)=\"handleFormSubmit(form.value)\">\r\n\r\n  <mat-form-field class=\"full-width\">\r\n    <input matInput required\r\n           [placeholder]=\"'igo.context.contextManager.form.title' | translate\"\r\n           formControlName=\"title\">\r\n   <mat-error>\r\n    {{ 'igo.context.contextManager.form.titleRequired' | translate }}\r\n   </mat-error>\r\n  </mat-form-field>\r\n\r\n  <mat-form-field id=\"uriInput\" class=\"full-width\">\r\n    <span *ngIf=\"prefix\" class=\"prefix\">{{prefix}}-</span>\r\n    <span class=\"fieldWrapper\">\r\n      <input matInput\r\n           [placeholder]=\"'igo.context.contextManager.form.uri' | translate\"\r\n           formControlName=\"uri\">\r\n    </span>\r\n  </mat-form-field>\r\n\r\n  <div class=\"igo-form-button-group\">\r\n    <button\r\n      mat-raised-button\r\n      type=\"submit\"\r\n      [disabled]=\"!form.valid || disabled\">\r\n      {{ 'igo.context.contextManager.form.edit' | translate }}\r\n    </button>\r\n  </div>\r\n\r\n</form>\r\n",
                styles: ["form{margin:10px}.full-width{width:100%}#uriInput .fieldWrapper{display:block;overflow:hidden}#uriInput .prefix{float:left}"]
            }] }
];
/** @nocollapse */
ContextFormComponent.ctorParameters = () => [
    { type: FormBuilder }
];
ContextFormComponent.propDecorators = {
    btnSubmitText: [{ type: Input }],
    context: [{ type: Input }],
    disabled: [{ type: Input }],
    submitForm: [{ type: Output }],
    clone: [{ type: Output }],
    delete: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ContextEditComponent {
    /**
     * @param {?} cd
     */
    constructor(cd) {
        this.cd = cd;
        this.submitForm = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get context() {
        return this._context;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set context(value) {
        this._context = value;
        this.refresh();
    }
    /**
     * @return {?}
     */
    refresh() {
        this.cd.detectChanges();
    }
}
ContextEditComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-context-edit',
                template: "<igo-context-form *ngIf=\"context\"\r\n   [btnSubmitText]=\"'igo.context.contextManager.save' | translate\"\r\n   [context]=\"context\"\r\n   (submitForm)=\"submitForm.emit($event)\">\r\n</igo-context-form>\r\n"
            }] }
];
/** @nocollapse */
ContextEditComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
ContextEditComponent.propDecorators = {
    context: [{ type: Input }],
    submitForm: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ContextEditBindingDirective {
    /**
     * @param {?} component
     * @param {?} contextService
     * @param {?} messageService
     * @param {?} languageService
     */
    constructor(component, contextService, messageService, languageService) {
        this.contextService = contextService;
        this.messageService = messageService;
        this.languageService = languageService;
        this.component = component;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    onEdit(context) {
        /** @type {?} */
        const id = this.component.context.id;
        this.contextService.update(id, context).subscribe((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const translate = this.languageService.translate;
            /** @type {?} */
            const message = translate.instant('igo.context.contextManager.dialog.saveMsg', {
                value: context.title || this.component.context.title
            });
            /** @type {?} */
            const title = translate.instant('igo.context.contextManager.dialog.saveTitle');
            this.messageService.success(message, title);
        }));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.editedContext$$ = this.contextService.editedContext$.subscribe((/**
         * @param {?} context
         * @return {?}
         */
        context => this.handleEditedContextChange(context)));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.editedContext$$.unsubscribe();
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    handleEditedContextChange(context) {
        this.component.context = context;
    }
}
ContextEditBindingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoContextEditBinding]'
            },] }
];
/** @nocollapse */
ContextEditBindingDirective.ctorParameters = () => [
    { type: ContextEditComponent, decorators: [{ type: Self }] },
    { type: ContextService },
    { type: MessageService },
    { type: LanguageService }
];
ContextEditBindingDirective.propDecorators = {
    onEdit: [{ type: HostListener, args: ['submitForm', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ContextPermissionsComponent {
    /**
     * @param {?} formBuilder
     */
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.addPermission = new EventEmitter();
        this.removePermission = new EventEmitter();
        this.scopeChanged = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get context() {
        return this._context;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set context(value) {
        this._context = value;
    }
    /**
     * @return {?}
     */
    get permissions() {
        return this._permissions;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set permissions(value) {
        this._permissions = value;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.buildForm();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    handleFormSubmit(value) {
        this.addPermission.emit(value);
    }
    /**
     * @private
     * @return {?}
     */
    buildForm() {
        this.form = this.formBuilder.group({
            profil: [],
            typePermission: ['read']
        });
    }
}
ContextPermissionsComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-context-permissions',
                template: "<div *ngIf=\"context\">\r\n\r\n  <div class=\"scopeForm\">\r\n    <mat-radio-group [(ngModel)]=\"context.scope\"\r\n                    (change)=\"scopeChanged.emit(context)\">\r\n      <mat-radio-button value=\"private\">\r\n        {{ 'igo.context.permission.scope.private' | translate }}\r\n      </mat-radio-button>\r\n      <mat-radio-button value=\"protected\">\r\n        {{ 'igo.context.permission.scope.protected' | translate }}\r\n      </mat-radio-button>\r\n      <mat-radio-button value=\"public\">\r\n        {{ 'igo.context.permission.scope.public' | translate }}\r\n      </mat-radio-button>\r\n    </mat-radio-group>\r\n  </div>\r\n\r\n  <form *ngIf=\"context.scope !== 'private'\" [formGroup]=\"form\"\r\n    (ngSubmit)=\"handleFormSubmit(form.value)\">\r\n\r\n    <mat-form-field class=\"full-width\">\r\n      <input matInput required\r\n             [placeholder]=\"'igo.context.permission.profil' | translate\"\r\n             formControlName=\"profil\">\r\n     <mat-error>\r\n       {{ 'igo.context.permission.profilRequired' | translate }}\r\n     </mat-error>\r\n    </mat-form-field>\r\n\r\n\r\n    <mat-radio-group formControlName=\"typePermission\">\r\n      <mat-radio-button value=\"read\">\r\n        {{ 'igo.context.permission.read' | translate }}\r\n      </mat-radio-button>\r\n      <mat-radio-button value=\"write\">\r\n        {{ 'igo.context.permission.write' | translate }}\r\n      </mat-radio-button>\r\n    </mat-radio-group>\r\n\r\n\r\n    <div class=\"igo-form-button-group\">\r\n      <button\r\n        mat-raised-button\r\n        type=\"submit\"\r\n        [disabled]=\"!form.valid\">\r\n        {{ 'igo.context.permission.addBtn' | translate }}\r\n      </button>\r\n    </div>\r\n\r\n  </form>\r\n\r\n  <igo-list *ngIf=\"permissions && context.scope !== 'private'\">\r\n    <ng-template ngFor let-groupPermissions [ngForOf]=\"permissions | keyvalue\">\r\n      <igo-collapsible\r\n        *ngIf=\"groupPermissions.value.length\"\r\n        [title]=\"'igo.context.permission.' + groupPermissions.key | translate\">\r\n\r\n        <ng-template ngFor let-permission [ngForOf]=\"groupPermissions.value\">\r\n          <mat-list-item>\r\n            <mat-icon mat-list-avatar svgIcon=\"account-outline\"></mat-icon>\r\n            <h4 mat-line>{{permission.profil}}</h4>\r\n\r\n            <div igoStopPropagation\r\n                 class=\"igo-actions-container\">\r\n\r\n               <button\r\n                 mat-icon-button\r\n                 [matTooltip]=\"'igo.context.permission.delete' | translate\"\r\n                 matTooltipShowDelay=\"500\"\r\n                 color=\"warn\"\r\n                 (click)=\"removePermission.emit(permission)\">\r\n                 <mat-icon svgIcon=\"delete\"></mat-icon>\r\n               </button>\r\n            </div>\r\n\r\n          </mat-list-item>\r\n        </ng-template>\r\n      </igo-collapsible>\r\n    </ng-template>\r\n  </igo-list>\r\n\r\n</div>\r\n",
                styles: [":host{margin:10px}.full-width{width:100%}mat-radio-button{padding:14px 14px 14px 0}.scopeForm,form{padding:5px}"]
            }] }
];
/** @nocollapse */
ContextPermissionsComponent.ctorParameters = () => [
    { type: FormBuilder }
];
ContextPermissionsComponent.propDecorators = {
    context: [{ type: Input }],
    permissions: [{ type: Input }],
    addPermission: [{ type: Output }],
    removePermission: [{ type: Output }],
    scopeChanged: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ContextPermissionsBindingDirective {
    /**
     * @param {?} component
     * @param {?} contextService
     * @param {?} languageService
     * @param {?} messageService
     */
    constructor(component, contextService, languageService, messageService) {
        this.contextService = contextService;
        this.languageService = languageService;
        this.messageService = messageService;
        this.component = component;
    }
    /**
     * @param {?} permission
     * @return {?}
     */
    onAddPermission(permission) {
        /** @type {?} */
        const contextId = this.component.context.id;
        this.contextService
            .addPermissionAssociation(contextId, permission.profil, permission.typePermission)
            .subscribe((/**
         * @param {?} profils
         * @return {?}
         */
        profils => {
            for (const p of profils) {
                this.component.permissions[permission.typePermission].push(p);
            }
            /** @type {?} */
            const profil = permission.profil;
            /** @type {?} */
            const translate = this.languageService.translate;
            /** @type {?} */
            const message = translate.instant('igo.context.permission.dialog.addMsg', {
                value: profil
            });
            /** @type {?} */
            const title = translate.instant('igo.context.permission.dialog.addTitle');
            this.messageService.success(message, title);
        }));
    }
    /**
     * @param {?} permission
     * @return {?}
     */
    onRemovePermission(permission) {
        /** @type {?} */
        const contextId = this.component.context.id;
        this.contextService
            .deletePermissionAssociation(contextId, permission.id)
            .subscribe((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const index = this.component.permissions[permission.typePermission].findIndex((/**
             * @param {?} p
             * @return {?}
             */
            p => {
                return p.id === permission.id;
            }));
            this.component.permissions[permission.typePermission].splice(index, 1);
            /** @type {?} */
            const profil = permission.profil;
            /** @type {?} */
            const translate = this.languageService.translate;
            /** @type {?} */
            const message = translate.instant('igo.context.permission.dialog.deleteMsg', {
                value: profil
            });
            /** @type {?} */
            const title = translate.instant('igo.context.permission.dialog.deleteTitle');
            this.messageService.success(message, title);
        }));
    }
    /**
     * @param {?} context
     * @return {?}
     */
    onScopeChanged(context) {
        /** @type {?} */
        const scope = context.scope;
        this.contextService.update(context.id, { scope }).subscribe((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const translate = this.languageService.translate;
            /** @type {?} */
            const message = translate.instant('igo.context.permission.dialog.scopeChangedMsg', {
                value: translate.instant('igo.context.permission.scope.' + scope)
            });
            /** @type {?} */
            const title = translate.instant('igo.context.permission.dialog.scopeChangedTitle');
            this.messageService.success(message, title);
        }));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.editedContext$$ = this.contextService.editedContext$.subscribe((/**
         * @param {?} context
         * @return {?}
         */
        context => this.handleEditedContextChange(context)));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.editedContext$$.unsubscribe();
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    handleEditedContextChange(context) {
        this.component.context = context;
        if (context) {
            this.contextService
                .getPermissions(context.id)
                .subscribe((/**
             * @param {?} permissionsArray
             * @return {?}
             */
            permissionsArray => {
                permissionsArray = permissionsArray || [];
                /** @type {?} */
                const permissions = {
                    read: permissionsArray.filter((/**
                     * @param {?} p
                     * @return {?}
                     */
                    p => {
                        return p.typePermission.toString() === 'read';
                    })),
                    write: permissionsArray.filter((/**
                     * @param {?} p
                     * @return {?}
                     */
                    p => {
                        return p.typePermission.toString() === 'write';
                    }))
                };
                return (this.component.permissions = permissions);
            }));
        }
    }
}
ContextPermissionsBindingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoContextPermissionsBinding]'
            },] }
];
/** @nocollapse */
ContextPermissionsBindingDirective.ctorParameters = () => [
    { type: ContextPermissionsComponent, decorators: [{ type: Self }] },
    { type: ContextService },
    { type: LanguageService },
    { type: MessageService }
];
ContextPermissionsBindingDirective.propDecorators = {
    onAddPermission: [{ type: HostListener, args: ['addPermission', ['$event'],] }],
    onRemovePermission: [{ type: HostListener, args: ['removePermission', ['$event'],] }],
    onScopeChanged: [{ type: HostListener, args: ['scopeChanged', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CONTEXT_DIRECTIVES = [
    MapContextDirective,
    LayerContextDirective
];
class IgoContextManagerModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoContextManagerModule
        };
    }
}
IgoContextManagerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatIconModule,
                    MatButtonModule,
                    MatTooltipModule,
                    MatListModule,
                    MatCheckboxModule,
                    MatRadioModule,
                    IgoAuthModule,
                    IgoListModule,
                    IgoKeyValueModule,
                    IgoCollapsibleModule,
                    IgoStopPropagationModule,
                    IgoLanguageModule
                ],
                exports: [
                    ContextListComponent,
                    ContextListBindingDirective,
                    ContextItemComponent,
                    ContextFormComponent,
                    ContextEditComponent,
                    ContextEditBindingDirective,
                    ContextPermissionsComponent,
                    ContextPermissionsBindingDirective,
                    ...CONTEXT_DIRECTIVES
                ],
                declarations: [
                    ContextListComponent,
                    ContextListBindingDirective,
                    ContextItemComponent,
                    ContextFormComponent,
                    ContextEditComponent,
                    ContextEditBindingDirective,
                    ContextPermissionsComponent,
                    ContextPermissionsBindingDirective,
                    ...CONTEXT_DIRECTIVES
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BookmarkDialogComponent {
    /**
     * @param {?} dialogRef
     */
    constructor(dialogRef) {
        this.dialogRef = dialogRef;
    }
}
BookmarkDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-bookmark-dialog',
                template: "<h1 mat-dialog-title>{{ 'igo.context.bookmarkButton.dialog.title' |\u00A0translate }}</h1>\r\n<div mat-dialog-content>\r\n  <mat-form-field>\r\n    <input matInput required autocomplete=\"off\"\r\n      [placeholder]=\"'igo.context.bookmarkButton.dialog.placeholder' |\u00A0translate\"\r\n      [(ngModel)]=\"title\">\r\n  </mat-form-field>\r\n</div>\r\n<div mat-dialog-actions>\r\n  <button mat-button color=\"primary\"\r\n         [disabled]=\"!title\"\r\n         (click)=\"dialogRef.close(title)\">\r\n    {{'igo.common.confirmDialog.confirmBtn' | translate}}\r\n  </button>\r\n  <button mat-button\r\n          (click)=\"dialogRef.close(false)\">\r\n    {{'igo.common.confirmDialog.cancelBtn' |\u00A0translate}}\r\n  </button>\r\n</div>\r\n"
            }] }
];
/** @nocollapse */
BookmarkDialogComponent.ctorParameters = () => [
    { type: MatDialogRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BookmarkButtonComponent {
    /**
     * @param {?} dialog
     * @param {?} contextService
     * @param {?} languageService
     * @param {?} messageService
     */
    constructor(dialog, contextService, languageService, messageService) {
        this.dialog = dialog;
        this.contextService = contextService;
        this.languageService = languageService;
        this.messageService = messageService;
    }
    /**
     * @return {?}
     */
    get map() {
        return this._map;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set map(value) {
        this._map = value;
    }
    /**
     * @return {?}
     */
    get color() {
        return this._color;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set color(value) {
        this._color = value;
    }
    /**
     * @return {?}
     */
    createContext() {
        this.dialog
            .open(BookmarkDialogComponent, { disableClose: false })
            .afterClosed()
            .subscribe((/**
         * @param {?} title
         * @return {?}
         */
        title => {
            if (title) {
                /** @type {?} */
                const context = this.contextService.getContextFromMap(this.map);
                context.title = title;
                this.contextService.create(context).subscribe((/**
                 * @return {?}
                 */
                () => {
                    /** @type {?} */
                    const translate = this.languageService.translate;
                    /** @type {?} */
                    const titleD = translate.instant('igo.context.bookmarkButton.dialog.createTitle');
                    /** @type {?} */
                    const message = translate.instant('igo.context.bookmarkButton.dialog.createMsg', {
                        value: context.title
                    });
                    this.messageService.success(message, titleD);
                }));
            }
        }));
    }
}
BookmarkButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-bookmark-button',
                template: "<div class=\"igo-bookmark-button-container\">\r\n  <button\r\n    mat-icon-button\r\n    [matTooltip]=\"'igo.context.bookmarkButton.create' | translate\"\r\n    matTooltipPosition=\"above\"\r\n    [color]=\"color\"\r\n    (click)=\"createContext()\">\r\n    <mat-icon svgIcon=\"bookmark\"></mat-icon>\r\n  </button>\r\n</div>\r\n",
                styles: [".igo-bookmark-button-container{width:40px}.igo-bookmark-button-container button{background-color:#fff}.igo-bookmark-button-container button:hover{background-color:#efefef}:host>>>button .mat-button-ripple-round,button{border-radius:0}"]
            }] }
];
/** @nocollapse */
BookmarkButtonComponent.ctorParameters = () => [
    { type: MatDialog },
    { type: ContextService },
    { type: LanguageService },
    { type: MessageService }
];
BookmarkButtonComponent.propDecorators = {
    map: [{ type: Input }],
    color: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PoiService {
    /**
     * @param {?} http
     * @param {?} config
     */
    constructor(http, config) {
        this.http = http;
        this.config = config;
        this.baseUrl = this.config.getConfig('context.url');
    }
    /**
     * @return {?}
     */
    get() {
        if (!this.baseUrl) {
            return EMPTY;
        }
        /** @type {?} */
        const url = this.baseUrl + '/pois';
        return this.http.get(url);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    delete(id) {
        /** @type {?} */
        const url = this.baseUrl + '/pois/' + id;
        return this.http.delete(url);
    }
    /**
     * @param {?} context
     * @return {?}
     */
    create(context) {
        /** @type {?} */
        const url = this.baseUrl + '/pois';
        return this.http.post(url, JSON.stringify(context));
    }
}
PoiService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
PoiService.ctorParameters = () => [
    { type: HttpClient },
    { type: ConfigService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PoiDialogComponent {
    /**
     * @param {?} dialogRef
     */
    constructor(dialogRef) {
        this.dialogRef = dialogRef;
    }
}
PoiDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-poi-dialog',
                template: "<h1 mat-dialog-title>{{ 'igo.context.poiButton.dialog.title' | translate }}</h1>\r\n<div mat-dialog-content>\r\n  <mat-form-field>\r\n    <input matInput required autocomplete=\"off\"\r\n      [placeholder]=\"'igo.context.poiButton.dialog.placeholder' | translate\"\r\n      [(ngModel)]=\"title\">\r\n  </mat-form-field>\r\n</div>\r\n<div mat-dialog-actions>\r\n  <button mat-button color=\"primary\"\r\n         [disabled]=\"!title\"\r\n         (click)=\"dialogRef.close(title)\">\r\n    {{'igo.common.confirmDialog.confirmBtn' | translate}}\r\n  </button>\r\n  <button mat-button\r\n          (click)=\"dialogRef.close(false)\">\r\n    {{'igo.common.confirmDialog.cancelBtn' |\u00A0translate}}\r\n  </button>\r\n</div>\r\n"
            }] }
];
/** @nocollapse */
PoiDialogComponent.ctorParameters = () => [
    { type: MatDialogRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PoiButtonComponent {
    /**
     * @param {?} dialog
     * @param {?} authService
     * @param {?} poiService
     * @param {?} messageService
     * @param {?} languageService
     * @param {?} confirmDialogService
     */
    constructor(dialog, authService, poiService, messageService, languageService, confirmDialogService) {
        this.dialog = dialog;
        this.authService = authService;
        this.poiService = poiService;
        this.messageService = messageService;
        this.languageService = languageService;
        this.confirmDialogService = confirmDialogService;
    }
    /**
     * @return {?}
     */
    get map() {
        return this._map;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set map(value) {
        this._map = value;
    }
    /**
     * @return {?}
     */
    get color() {
        return this._color;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set color(value) {
        this._color = value;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.authenticate$$ = this.authService.authenticate$.subscribe((/**
         * @param {?} auth
         * @return {?}
         */
        auth => {
            if (auth) {
                this.getPois();
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.authenticate$$.unsubscribe();
    }
    /**
     * @param {?} poi
     * @return {?}
     */
    deletePoi(poi) {
        if (poi && poi.id) {
            /** @type {?} */
            const translate = this.languageService.translate;
            this.confirmDialogService
                .open(translate.instant('igo.context.poiButton.dialog.confirmDelete'))
                .subscribe((/**
             * @param {?} confirm
             * @return {?}
             */
            confirm => {
                if (confirm) {
                    this.poiService.delete(poi.id).subscribe((/**
                     * @return {?}
                     */
                    () => {
                        /** @type {?} */
                        const title = translate.instant('igo.context.poiButton.dialog.deleteTitle');
                        /** @type {?} */
                        const message = translate.instant('igo.context.poiButton.dialog.deleteMsg', {
                            value: poi.title
                        });
                        this.messageService.info(message, title);
                        this.pois = this.pois.filter((/**
                         * @param {?} p
                         * @return {?}
                         */
                        p => p.id !== poi.id));
                    }), (/**
                     * @param {?} err
                     * @return {?}
                     */
                    err => {
                        err.error.title = 'DELETE Pois';
                        this.messageService.showError(err);
                    }));
                }
            }));
        }
    }
    /**
     * @private
     * @return {?}
     */
    getPois() {
        this.poiService.get().subscribe((/**
         * @param {?} rep
         * @return {?}
         */
        rep => {
            this.pois = rep;
        }), (/**
         * @param {?} err
         * @return {?}
         */
        err => {
            err.error.title = 'GET Pois';
            this.messageService.showError(err);
        }));
    }
    /**
     * @return {?}
     */
    createPoi() {
        /** @type {?} */
        const view = this.map.ol.getView();
        /** @type {?} */
        const proj = view.getProjection().getCode();
        /** @type {?} */
        const center = new olPoint(view.getCenter()).transform(proj, 'EPSG:4326');
        /** @type {?} */
        const poi = {
            title: '',
            x: center.getCoordinates()[0],
            y: center.getCoordinates()[1],
            zoom: view.getZoom()
        };
        this.dialog
            .open(PoiDialogComponent, { disableClose: false })
            .afterClosed()
            .subscribe((/**
         * @param {?} title
         * @return {?}
         */
        title => {
            if (title) {
                poi.title = title;
                this.poiService.create(poi).subscribe((/**
                 * @param {?} newPoi
                 * @return {?}
                 */
                newPoi => {
                    /** @type {?} */
                    const translate = this.languageService.translate;
                    /** @type {?} */
                    const titleD = translate.instant('igo.context.poiButton.dialog.createTitle');
                    /** @type {?} */
                    const message = translate.instant('igo.context.poiButton.dialog.createMsg', {
                        value: poi.title
                    });
                    this.messageService.success(message, titleD);
                    poi.id = newPoi.id;
                    this.pois.push(poi);
                }), (/**
                 * @param {?} err
                 * @return {?}
                 */
                err => {
                    err.error.title = 'POST Pois';
                    this.messageService.showError(err);
                }));
            }
        }));
    }
    /**
     * @param {?} id
     * @return {?}
     */
    zoomOnPoi(id) {
        /** @type {?} */
        const poi = this.pois.find((/**
         * @param {?} p
         * @return {?}
         */
        p => p.id === id));
        /** @type {?} */
        const center = fromLonLat([Number(poi.x), Number(poi.y)], this.map.projection);
        this.map.ol.getView().animate({
            center,
            zoom: poi.zoom,
            duration: 500,
            easing: easeOut
        });
    }
}
PoiButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-poi-button',
                template: "<mat-select [placeholder]=\"'igo.context.poiButton.placeholder' |\u00A0translate\"\r\n           floatPlaceholder=\"never\">\r\n\r\n  <mat-option (click)=\"createPoi()\">\r\n    <div class=\"titlePoi\">{{ 'igo.context.poiButton.create' |\u00A0translate }}</div>\r\n    <button igoStopPropagation class=\"addPoi buttonPoi\"\r\n      mat-icon-button\r\n      color=\"primary\"\r\n      (click)=\"createPoi()\">\r\n      <mat-icon svgIcon=\"plus-circle\"></mat-icon>\r\n    </button>\r\n  </mat-option>\r\n  <mat-option *ngFor=\"let poi of pois\" [value]=\"poi.id\" (click)=\"zoomOnPoi(poi.id)\">\r\n    <div class=\"titlePoi\">{{ poi.title }}</div>\r\n    <button igoStopPropagation class=\"deletePoi buttonPoi\"\r\n      mat-icon-button\r\n      color=\"warn\"\r\n      (click)=\"deletePoi(poi)\">\r\n      <mat-icon svgIcon=\"delete\"></mat-icon>\r\n    </button>\r\n  </mat-option>\r\n</mat-select>\r\n",
                styles: ["mat-select{width:150px;background-color:#fff;height:40px;padding-top:0}mat-select>>>.mat-select-trigger{height:40px}mat-select>>>.mat-select-placeholder,mat-select>>>.mat-select-value-text{padding:5px;top:12px;position:relative}.mat-option{text-overflow:inherit}.titlePoi{max-width:135px;overflow:hidden;text-overflow:ellipsis;float:left}.buttonPoi{float:right;margin:4px -10px 4px 0}.buttonPoi>>>.mat-icon{margin:0 8px}"]
            }] }
];
/** @nocollapse */
PoiButtonComponent.ctorParameters = () => [
    { type: MatDialog },
    { type: AuthService },
    { type: PoiService },
    { type: MessageService },
    { type: LanguageService },
    { type: ConfirmDialogService }
];
PoiButtonComponent.propDecorators = {
    map: [{ type: Input }],
    color: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class UserDialogComponent {
    /**
     * @param {?} dialogRef
     * @param {?} auth
     */
    constructor(dialogRef, auth) {
        this.dialogRef = dialogRef;
        this.auth = auth;
        /** @type {?} */
        const decodeToken = this.auth.decodeToken();
        this.user = decodeToken.user;
        this.exp = new Date(decodeToken.exp * 1000).toLocaleString();
    }
}
UserDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-user-dialog',
                template: "<h1 mat-dialog-title>{{'igo.context.userButton.infoTitle' | translate}}</h1>\r\n<div mat-dialog-content>\r\n  <p>{{'igo.context.userButton.dialog.user' | translate}}: {{user.sourceId}}</p>\r\n  <p>{{'igo.context.userButton.dialog.email' | translate}}: {{user.email}}</p>\r\n  <p>{{'igo.context.userButton.dialog.expiration' | translate}}: {{exp}}</p>\r\n</div>\r\n<div mat-dialog-actions style=\"justify-content: center\">\r\n  <button mat-button color=\"primary\"\r\n         (click)=\"dialogRef.close(false)\">\r\n    OK\r\n  </button>\r\n</div>\r\n"
            }] }
];
/** @nocollapse */
UserDialogComponent.ctorParameters = () => [
    { type: MatDialogRef },
    { type: AuthService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function userButtonSlideInOut() {
    return trigger('userButtonState', [
        state('collapse', style({
            width: '0',
            overflow: 'hidden',
            display: 'none'
        })),
        state('expand', style({
            overflow: 'hidden',
            display: 'display'
        })),
        transition('collapse => expand', animate('200ms')),
        transition('expand => collapse', animate('200ms'))
    ]);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class UserButtonComponent {
    /**
     * @param {?} dialog
     * @param {?} config
     * @param {?} auth
     */
    constructor(dialog, config, auth) {
        this.dialog = dialog;
        this.config = config;
        this.auth = auth;
        this.expand = false;
        this.visible = false;
        this.visible = this.config.getConfig('auth') ? true : false;
    }
    /**
     * @return {?}
     */
    get map() {
        return this._map;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set map(value) {
        this._map = value;
    }
    /**
     * @return {?}
     */
    get color() {
        return this._color;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set color(value) {
        this._color = value;
    }
    /**
     * @return {?}
     */
    accountClick() {
        if (this.auth.authenticated) {
            this.expand = !this.expand;
        }
        else {
            this.auth.logout();
        }
    }
    /**
     * @return {?}
     */
    logout() {
        this.expand = false;
        this.auth.logout();
    }
    /**
     * @return {?}
     */
    infoUser() {
        this.dialog.open(UserDialogComponent, { disableClose: false });
    }
}
UserButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-user-button',
                template: "<div *ngIf=\"visible\" class=\"igo-user-button-container\">\r\n  <div class=\"igo-user-button-more-container\" [@userButtonState]=\"expand ? 'expand' : 'collapse'\">\r\n\r\n    <igo-poi-button [color]=\"color\" [map]=\"map\"></igo-poi-button>\r\n    <igo-bookmark-button [color]=\"color\" [map]=\"map\"></igo-bookmark-button>\r\n\r\n    <button\r\n      mat-icon-button\r\n      [matTooltip]=\"'igo.context.userButton.infoTitle' | translate\"\r\n      matTooltipPosition=\"above\"\r\n      [color]=\"color\"\r\n      (click)=\"infoUser()\">\r\n      <mat-icon svgIcon=\"information-outline\"></mat-icon>\r\n    </button>\r\n\r\n    <button\r\n      mat-icon-button\r\n      [matTooltip]=\"'igo.context.userButton.logout' |\u00A0translate\"\r\n      matTooltipPosition=\"above\"\r\n      [color]=\"color\"\r\n      (click)=\"logout()\">\r\n      <mat-icon svgIcon=\"power\"></mat-icon>\r\n    </button>\r\n\r\n  </div>\r\n\r\n  <button\r\n    mat-icon-button\r\n    [color]=\"auth.authenticated ? color : 'warn'\"\r\n    (click)=\"accountClick()\">\r\n    <mat-icon svgIcon=\"account-box\"></mat-icon>\r\n  </button>\r\n</div>\r\n",
                animations: [userButtonSlideInOut()],
                styles: [".igo-user-button-container button{background-color:#fff}.igo-user-button-container button:hover{background-color:#efefef}.igo-user-button-more-container{float:left;height:40px}.igo-user-button-more-container>*{margin-right:2px;float:left}@media only screen and (max-width:450px),only screen and (max-height:450px){.igo-user-button-container>button{position:absolute;bottom:0}.igo-user-button-more-container{height:80px;width:150px;position:relative;left:24px}}:host>>>button .mat-button-ripple-round,button{border-radius:0}"]
            }] }
];
/** @nocollapse */
UserButtonComponent.ctorParameters = () => [
    { type: MatDialog },
    { type: ConfigService },
    { type: AuthService }
];
UserButtonComponent.propDecorators = {
    map: [{ type: Input }],
    color: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoContextMapButtonModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoContextMapButtonModule
        };
    }
}
IgoContextMapButtonModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    IgoLanguageModule,
                    IgoConfirmDialogModule,
                    IgoStopPropagationModule,
                    IgoAuthModule,
                    FormsModule,
                    MatIconModule,
                    MatButtonModule,
                    MatSelectModule,
                    MatOptionModule,
                    MatTooltipModule,
                    MatFormFieldModule,
                    MatDialogModule,
                    MatInputModule
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ShareMapService {
    /**
     * @param {?} config
     * @param {?} contextService
     * @param {?} messageService
     * @param {?} routingFormService
     * @param {?} route
     */
    constructor(config, contextService, messageService, routingFormService, route) {
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
    getUrl(map$$1, formValues, publicShareOption) {
        if (this.apiUrl) {
            return this.getUrlWithApi(map$$1, formValues);
        }
        return this.getUrlWithoutApi(map$$1, publicShareOption);
    }
    /**
     * @param {?} map
     * @param {?} formValues
     * @return {?}
     */
    getUrlWithApi(map$$1, formValues) {
        /** @type {?} */
        const context = this.contextService.getContextFromMap(map$$1);
        context.scope = 'public';
        context.title = formValues.title;
        context.uri = formValues.uri;
        this.contextService.create(context).subscribe((/**
         * @param {?} rep
         * @return {?}
         */
        rep => { }), (/**
         * @param {?} err
         * @return {?}
         */
        err => {
            err.error.title = 'Share Map';
            this.messageService.showError(err);
        }));
        return `${location.origin + location.pathname}?context=${formValues.uri}`;
    }
    /**
     * @param {?} map
     * @param {?} publicShareOption
     * @return {?}
     */
    getUrlWithoutApi(map$$1, publicShareOption) {
        if (!this.route ||
            !this.route.options.visibleOnLayersKey ||
            !this.route.options.visibleOffLayersKey ||
            !map$$1.viewController.getZoom()) {
            return;
        }
        /** @type {?} */
        const llc = publicShareOption.layerlistControls.querystring;
        /** @type {?} */
        let visibleKey = this.route.options.visibleOnLayersKey;
        /** @type {?} */
        let invisibleKey = this.route.options.visibleOffLayersKey;
        /** @type {?} */
        const layers = map$$1.layers;
        /** @type {?} */
        const routingKey = this.route.options.routingCoordKey;
        /** @type {?} */
        const stopsCoordinates = [];
        if (this.routingFormService &&
            this.routingFormService.getStopsCoordinates() &&
            this.routingFormService.getStopsCoordinates().length !== 0) {
            this.routingFormService.getStopsCoordinates().forEach((/**
             * @param {?} coord
             * @return {?}
             */
            coord => {
                stopsCoordinates.push(coord);
            }));
        }
        /** @type {?} */
        let routingUrl = '';
        if (stopsCoordinates.length >= 2) {
            routingUrl = `${routingKey}=${stopsCoordinates.join(';')}`;
        }
        /** @type {?} */
        const visibleLayers = layers.filter((/**
         * @param {?} lay
         * @return {?}
         */
        lay => lay.visible));
        /** @type {?} */
        const invisibleLayers = layers.filter((/**
         * @param {?} lay
         * @return {?}
         */
        lay => !lay.visible));
        if (visibleLayers.length === 0) {
            visibleKey = '';
        }
        if (invisibleLayers.length === 0) {
            invisibleKey = '';
        }
        /** @type {?} */
        let layersUrl = '';
        /** @type {?} */
        let layersToLoop = [];
        if (visibleLayers.length > invisibleLayers.length) {
            layersUrl = `${visibleKey}=*&${invisibleKey}=`;
            layersToLoop = invisibleLayers;
        }
        else {
            layersUrl = `${invisibleKey}=*&${visibleKey}=`;
            layersToLoop = visibleLayers;
        }
        for (const layer of layersToLoop) {
            if (layer.id) {
                layersUrl += layer.id + ',';
            }
        }
        layersUrl = layersUrl.substr(0, layersUrl.length - 1);
        /** @type {?} */
        let zoom = 'zoom=' + map$$1.viewController.getZoom();
        /** @type {?} */
        const arrayCenter = map$$1.viewController.getCenter('EPSG:4326') || [];
        /** @type {?} */
        const long = arrayCenter[0].toFixed(5).replace(/\.([^0]+)0+$/, '.$1');
        /** @type {?} */
        const lat = arrayCenter[1].toFixed(5).replace(/\.([^0]+)0+$/, '.$1');
        /** @type {?} */
        const center = `center=${long},${lat}`.replace(/.00000/g, '');
        /** @type {?} */
        let context = '';
        if (this.contextService.context$.value) {
            if (this.contextService.context$.value.uri !== '_default') {
                context = 'context=' + this.contextService.context$.value.uri;
            }
            if (this.contextService.context$.value.map.view.zoom) {
                zoom =
                    this.contextService.context$.value.map.view.zoom ===
                        map$$1.viewController.getZoom()
                        ? ''
                        : 'zoom=' + map$$1.viewController.getZoom();
            }
        }
        /** @type {?} */
        let url = `${location.origin}${location.pathname}?${context}&${zoom}&${center}&${layersUrl}&${llc}&${routingUrl}`;
        for (let i = 0; i < 5; i++) {
            url = url.replace(/&&/g, '&');
            url = url.endsWith('&') ? url.slice(0, -1) : url;
        }
        url = url.endsWith('&') ? url.slice(0, -1) : url;
        url = url.replace('?&', '?');
        return url;
    }
}
ShareMapService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ShareMapService.ctorParameters = () => [
    { type: ConfigService },
    { type: ContextService },
    { type: MessageService },
    { type: RoutingFormService, decorators: [{ type: Optional }] },
    { type: RouteService, decorators: [{ type: Optional }] }
];
/** @nocollapse */ ShareMapService.ngInjectableDef = defineInjectable({ factory: function ShareMapService_Factory() { return new ShareMapService(inject(ConfigService), inject(ContextService), inject(MessageService), inject(RoutingFormService, 8), inject(RouteService, 8)); }, token: ShareMapService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ShareMapComponent {
    /**
     * @param {?} config
     * @param {?} languageService
     * @param {?} messageService
     * @param {?} auth
     * @param {?} shareMapService
     * @param {?} formBuilder
     * @param {?} layerListService
     */
    constructor(config, languageService, messageService, auth, shareMapService, formBuilder, layerListService) {
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
    /**
     * @return {?}
     */
    get map() {
        return this._map;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set map(value) {
        this._map = value;
    }
    /**
     * @return {?}
     */
    get hasShareMapButton() {
        return this._hasShareMapButton;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set hasShareMapButton(value) {
        this._hasShareMapButton = value;
    }
    /**
     * @return {?}
     */
    get hasCopyLinkButton() {
        return this._hasCopyLinkButton;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set hasCopyLinkButton(value) {
        this._hasCopyLinkButton = value;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.auth.authenticate$.subscribe((/**
         * @param {?} auth
         * @return {?}
         */
        auth => {
            /** @type {?} */
            const decodeToken = this.auth.decodeToken();
            this.userId = decodeToken.user ? decodeToken.user.id : undefined;
            this.url = undefined;
            this.buildForm();
        }));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (!this.hasApi) {
            this.resetUrl();
        }
    }
    /**
     * @return {?}
     */
    hasLayerListControls() {
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
    }
    /**
     * @param {?=} values
     * @return {?}
     */
    resetUrl(values = {}) {
        this.hasLayerListControls();
        /** @type {?} */
        const inputs = Object.assign({}, values);
        inputs.uri = this.userId ? `${this.userId}-${values.uri}` : values.uri;
        this.url = this.shareMapService.getUrl(this.map, inputs, this.publicShareOption);
    }
    /**
     * @param {?} textArea
     * @return {?}
     */
    copyTextToClipboard(textArea) {
        /** @type {?} */
        const successful = Clipboard.copy(textArea);
        if (successful) {
            /** @type {?} */
            const translate = this.languageService.translate;
            /** @type {?} */
            const title = translate.instant('igo.context.shareMap.dialog.copyTitle');
            /** @type {?} */
            const msg = translate.instant('igo.context.shareMap.dialog.copyMsg');
            this.messageService.success(msg, title);
        }
    }
    /**
     * @private
     * @return {?}
     */
    buildForm() {
        /** @type {?} */
        const id = uuid();
        /** @type {?} */
        let title = 'Partage ';
        title += this.userId ? `(${this.userId}-${id})` : `(${id})`;
        this.form = this.formBuilder.group({
            title: [title],
            uri: [id]
        });
    }
}
ShareMapComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-share-map',
                template: "<form class=\"igo-form\" [formGroup]=\"form\"\r\n  (ngSubmit)=\"resetUrl(form.value)\">\r\n\r\n  <div *ngIf=\"hasApi\" class=\"igo-input-container\">\r\n    <mat-form-field>\r\n      <input matInput required\r\n             [placeholder]=\"'igo.context.contextManager.form.title' | translate\"\r\n             formControlName=\"title\">\r\n     <mat-error>\r\n      {{ 'igo.context.contextManager.form.titleRequired' | translate }}\r\n     </mat-error>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div *ngIf=\"hasApi\" id=\"uriInput\" class=\"igo-input-container\">\r\n    <mat-form-field>\r\n      <span *ngIf=\"userId\" class=\"prefix\">{{userId}}-</span>\r\n      <span class=\"fieldWrapper\">\r\n        <input matInput required\r\n             [readonly]=\"!userId\"\r\n             [placeholder]=\"'igo.context.contextManager.form.uri' | translate\"\r\n             formControlName=\"uri\">\r\n       </span>\r\n     <mat-error>\r\n      {{ 'igo.context.contextManager.form.uriRequired' | translate }}\r\n     </mat-error>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div *ngIf=\"hasShareMapButton\" class=\"igo-form-button-group\">\r\n    <button\r\n      mat-raised-button\r\n      type=\"submit\"\r\n      [disabled]=\"!form.valid\">\r\n      {{ 'igo.context.shareMap.button' | translate }}\r\n    </button>\r\n  </div>\r\n\r\n</form>\r\n\r\n<div *ngIf=\"url\" class=\"igo-input-container linkToShare\">\r\n  <mat-form-field>\r\n    <textarea #textArea matInput readonly rows=\"1\"\r\n      [placeholder]=\"'igo.context.shareMap.placeholderLink' | translate\"\r\n      [value]=\"url\"></textarea>\r\n    <button\r\n      mat-icon-button\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.context.shareMap.copy' | translate\"\r\n      color=\"primary\"\r\n      (click)=\"copyTextToClipboard(textArea)\">\r\n      <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n    </button>\r\n  </mat-form-field>\r\n\r\n  <div *ngIf=\"hasCopyLinkButton\" class=\"igo-form-button-group\">\r\n    <button\r\n      mat-raised-button\r\n      (click)=\"copyTextToClipboard(textArea)\">\r\n      <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n      {{ 'igo.context.shareMap.copy' | translate }}\r\n    </button>\r\n  </div>\r\n\r\n</div>\r\n",
                styles: ["@charset \"UTF-8\";mat-form-field{width:100%}#uriInput .fieldWrapper{display:block;overflow:hidden}#uriInput .prefix{float:left}.linkToShare{padding:25px 5px 5px}.linkToShare textarea{resize:none;width:calc(100% - 60px);line-height:1.3;height:40px;overflow-y:hidden;word-wrap:normal;word-break:break-all}.linkToShare mat-form-field>button{float:right;margin:-10px 0}.igo-form{padding:20px 5px 5px}.igo-form-button-group{text-align:center;padding-top:10px}"]
            }] }
];
/** @nocollapse */
ShareMapComponent.ctorParameters = () => [
    { type: ConfigService },
    { type: LanguageService },
    { type: MessageService },
    { type: AuthService },
    { type: ShareMapService },
    { type: FormBuilder },
    { type: LayerListService }
];
ShareMapComponent.propDecorators = {
    map: [{ type: Input }],
    hasShareMapButton: [{ type: Input }],
    hasCopyLinkButton: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ShareMapBindingDirective {
    /**
     * @param {?} component
     * @param {?} layerListService
     * @param {?} route
     */
    constructor(component, layerListService, route) {
        this.layerListService = layerListService;
        this.route = route;
        this.component = component;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initRoutes();
    }
    /**
     * @private
     * @return {?}
     */
    initRoutes() {
        if (this.route &&
            (this.route.options.llcKKey || this.route.options.llcAKey ||
                this.route.options.llcVKey || this.route.options.llcVKey)) {
            this.route.queryParams.subscribe((/**
             * @param {?} params
             * @return {?}
             */
            params => {
                /** @type {?} */
                const keywordFromUrl = params[(/** @type {?} */ (this.route.options.llcKKey))];
                /** @type {?} */
                const sortedAplhaFromUrl = params[(/** @type {?} */ (this.route.options.llcAKey))];
                /** @type {?} */
                const onlyVisibleFromUrl = params[(/** @type {?} */ (this.route.options.llcVKey))];
                /** @type {?} */
                const onlyInRangeFromUrl = params[(/** @type {?} */ (this.route.options.llcRKey))];
                if (keywordFromUrl && !this.layerListService.keywordInitialized) {
                    this.layerListService.keyword = keywordFromUrl;
                    this.layerListService.keywordInitialized = true;
                }
                if (sortedAplhaFromUrl && !this.layerListService.sortedAlphaInitialized) {
                    this.layerListService.sortedAlpha = sortedAplhaFromUrl === '1' ? true : false;
                    this.layerListService.sortedAlphaInitialized = true;
                }
                if (onlyVisibleFromUrl && !this.layerListService.onlyVisibleInitialized) {
                    this.layerListService.onlyVisible = onlyVisibleFromUrl === '1' ? true : false;
                    this.layerListService.onlyVisibleInitialized = true;
                }
                if (onlyInRangeFromUrl && !this.layerListService.onlyInRangeInitialized) {
                    this.layerListService.onlyInRange = onlyInRangeFromUrl === '1' ? true : false;
                    this.layerListService.onlyInRangeInitialized = true;
                }
                if (!this.component.hasApi) {
                    this.component.resetUrl();
                }
            }));
        }
    }
}
ShareMapBindingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoShareMapBinding]'
            },] }
];
/** @nocollapse */
ShareMapBindingDirective.ctorParameters = () => [
    { type: ShareMapComponent, decorators: [{ type: Self }] },
    { type: LayerListService },
    { type: RouteService, decorators: [{ type: Optional }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoShareMapModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoShareMapModule
        };
    }
}
IgoShareMapModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    MatIconModule,
                    MatTooltipModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatButtonModule,
                    IgoLanguageModule
                ],
                exports: [ShareMapComponent, ShareMapBindingDirective],
                declarations: [ShareMapComponent, ShareMapBindingDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SidenavComponent {
    /**
     * @param {?} titleService
     */
    constructor(titleService) {
        this.titleService = titleService;
        this.format = new olFormatGeoJSON();
        this._title = this.titleService.getTitle();
        this.topPanelState = 'initial';
    }
    /**
     * @return {?}
     */
    get map() {
        return this._map;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set map(value) {
        this._map = value;
    }
    /**
     * @return {?}
     */
    get opened() {
        return this._opened;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set opened(value) {
        this._opened = value;
    }
    /**
     * @return {?}
     */
    get feature() {
        return this._feature;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set feature(value) {
        this._feature = value;
    }
    /**
     * @return {?}
     */
    get tool() {
        return this._tool;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set tool(value) {
        this._tool = value;
    }
    /**
     * @return {?}
     */
    get media() {
        return this._media;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set media(value) {
        this._media = value;
    }
    /**
     * @return {?}
     */
    get title() {
        return this._title;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set title(value) {
        if (value) {
            this._title = value;
        }
    }
    /**
     * @return {?}
     */
    get featureTitle() {
        return this.feature ? getEntityTitle(this.feature) : undefined;
    }
    /**
     * @return {?}
     */
    zoomToFeatureExtent() {
        if (this.feature.geometry) {
            /** @type {?} */
            const olFeature = this.format.readFeature(this.feature, {
                dataProjection: this.feature.projection,
                featureProjection: this.map.projection
            });
            moveToOlFeatures(this.map, [olFeature], FeatureMotion.Zoom);
        }
    }
    /**
     * @return {?}
     */
    toggleTopPanel() {
        if (this.topPanelState === 'initial') {
            this.topPanelState = 'expanded';
        }
        else {
            this.topPanelState = 'initial';
        }
    }
}
SidenavComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-sidenav',
                template: "<mat-sidenav\r\n  #sidenav\r\n  igoSidenavShim\r\n  mode=\"side\"\r\n  [opened]=\"opened\">\r\n\r\n  <div class=\"igo-sidenav-content\">\r\n\r\n    <igo-flexible\r\n      #topPanel\r\n      initial=\"50%\" initialMobile=\"100%\"\r\n      expanded=\"calc(100% - 58px)\"\r\n      [state]=\"topPanelState\">\r\n\r\n      <div class=\"igo-content\">\r\n        <igo-panel [title]=\"tool ? (tool.title | translate) : title\">\r\n          <button\r\n            mat-icon-button\r\n            panelLeftButton\r\n            tooltip-position=\"below\"\r\n            matTooltipShowDelay=\"500\"\r\n            [matTooltip]=\"'igo.context.sidenav.goBack' | translate\"\r\n            *ngIf=\"tool\">\r\n            <mat-icon svgIcon=\"arrow-back\"></mat-icon>\r\n          </button>\r\n\r\n          <button\r\n            mat-icon-button\r\n            panelRightButton\r\n            tooltip-position=\"below\"\r\n            matTooltipShowDelay=\"500\"\r\n            [matTooltip]=\"'igo.context.sidenav.mainMenu' | translate\"\r\n            *ngIf=\"tool\">\r\n            <mat-icon svgIcon=\"menu\"></mat-icon>\r\n          </button>\r\n\r\n          <!--igo-toolbar\r\n            igoToolContext igoToolbarBinding\r\n            [withTitle]=\"tool ? false : true\">\r\n          </igo-toolbar>\r\n\r\n          <div class=\"igo-toolbox-container\" [ngClass]=\"{'shown': tool ? true : false}\">\r\n            <igo-toolbox [animate]=\"true\"></igo-toolbox>\r\n          </div-->\r\n        </igo-panel>\r\n      </div>\r\n\r\n      <div igoFlexibleFill class=\"igo-content\">\r\n        <igo-panel\r\n          [title]=\"featureTitle\"\r\n          *ngIf=\"feature && media !== 'mobile'\">\r\n\r\n          <button\r\n            mat-icon-button\r\n            panelLeftButton\r\n            class=\"igo-icon-button\"\r\n            (click)=\"toggleTopPanel()\">\r\n            <mat-icon [svgIcon]=\"['collapsed', 'initial'].indexOf(topPanel.state) >= 0 ? 'arrow_downward' : 'arrow_upward'\"></mat-icon>\r\n          </button>\r\n\r\n          <button\r\n            mat-icon-button\r\n            panelRightButton\r\n            class=\"igo-icon-button\"\r\n            (click)=\"zoomToFeatureExtent()\"\r\n            *ngIf=\"feature.geometry\">\r\n            <mat-icon svgIcon=\"zoom-in\"></mat-icon>\r\n          </button>\r\n\r\n          <igo-feature-details\r\n            [feature]=\"feature\"\r\n            *ngIf=\"['collapsed', 'initial'].indexOf(topPanel.state) >= 0\">\r\n          </igo-feature-details>\r\n        </igo-panel>\r\n      </div>\r\n\r\n    </igo-flexible>\r\n\r\n  </div>\r\n</mat-sidenav>\r\n",
                styles: [".igo-sidenav-content .igo-flexible-fill .igo-container,:host ::ng-deep .igo-flexible-fill .igo-container{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;border-top:1px solid rgba(0,0,0,.2)}igo-toolbar:not(.with-title),mat-sidenav{-o-box-shadow:2px 0 2px 0 #ddd;box-shadow:2px 0 2px 0 #ddd}:host{background-color:#fff}:host ::ng-deep mat-sidenav{z-index:3!important}mat-sidenav{width:400px}@media only screen and (max-width:450px),only screen and (max-height:450px){mat-sidenav{width:calc(100% - 40px - 5px)}}.igo-sidenav-content{margin-top:50px;height:calc(100% - 50px)}igo-toolbar{position:absolute;top:51px;left:0;bottom:0}igo-toolbar.with-title{right:0;overflow:auto}igo-toolbar:not(.with-title){overflow:hidden}igo-toolbar ::ng-deep igo-list{overflow:inherit}.igo-toolbox-container{position:absolute;top:51px;bottom:0;right:0;overflow:auto}.igo-toolbox-container.shown{left:48px}igo-feature-details ::ng-deep table{width:100%}"]
            }] }
];
/** @nocollapse */
SidenavComponent.ctorParameters = () => [
    { type: Title }
];
SidenavComponent.propDecorators = {
    map: [{ type: Input }],
    opened: [{ type: Input }],
    feature: [{ type: Input }],
    tool: [{ type: Input }],
    media: [{ type: Input }],
    title: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoSidenavModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoSidenavModule
        };
    }
}
IgoSidenavModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatIconModule,
                    MatButtonModule,
                    MatSidenavModule,
                    MatTooltipModule,
                    IgoLanguageModule,
                    IgoPanelModule,
                    IgoFlexibleModule,
                    IgoFeatureModule,
                    IgoContextManagerModule
                ],
                exports: [SidenavComponent],
                declarations: [SidenavComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoContextModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoContextModule,
            providers: []
        };
    }
}
IgoContextModule.decorators = [
    { type: NgModule, args: [{
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

export { IgoContextModule, IgoContextManagerModule, IgoContextMapButtonModule, IgoShareMapModule, IgoSidenavModule, ContextService, TypePermission, Scope, LayerContextDirective, MapContextDirective, ContextListComponent, ContextListBindingDirective, ContextItemComponent, ContextFormComponent, ContextEditComponent, ContextEditBindingDirective, ContextPermissionsComponent, ContextPermissionsBindingDirective, BookmarkButtonComponent, BookmarkDialogComponent, PoiButtonComponent, PoiDialogComponent, PoiService, UserButtonComponent, UserDialogComponent, ShareMapService, ShareMapComponent, ShareMapBindingDirective, SidenavComponent, ContextEditBindingDirective as ɵg, ContextEditComponent as ɵf, ContextFormComponent as ɵe, ContextItemComponent as ɵd, ContextListBindingDirective as ɵb, ContextListComponent as ɵa, ContextPermissionsBindingDirective as ɵi, ContextPermissionsComponent as ɵh, ContextService as ɵc, LayerContextDirective as ɵk, MapContextDirective as ɵj, BookmarkButtonComponent as ɵl, BookmarkDialogComponent as ɵq, PoiButtonComponent as ɵm, PoiDialogComponent as ɵr, PoiService as ɵn, userButtonSlideInOut as ɵp, UserButtonComponent as ɵo, UserDialogComponent as ɵs, ShareMapBindingDirective as ɵv, ShareMapComponent as ɵt, ShareMapService as ɵu, SidenavComponent as ɵw };

//# sourceMappingURL=igo2-context.js.map