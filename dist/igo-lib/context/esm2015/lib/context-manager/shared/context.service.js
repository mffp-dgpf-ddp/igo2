/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class ContextService {
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
        context.tools = this.tools.map((/**
         * @param {?} tool
         * @return {?}
         */
        tool => String(tool.id)));
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
/** @nocollapse */ ContextService.ngInjectableDef = i0.defineInjectable({ factory: function ContextService_Factory() { return new ContextService(i0.inject(i1.HttpClient), i0.inject(i2.AuthService), i0.inject(i3.LanguageService), i0.inject(i3.ConfigService), i0.inject(i3.RouteService, 8)); }, token: ContextService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29udGV4dC8iLCJzb3VyY2VzIjpbImxpYi9jb250ZXh0LW1hbmFnZXIvc2hhcmVkL2NvbnRleHQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRWxELE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXBFLE9BQU8sT0FBTyxNQUFNLGVBQWUsQ0FBQztBQUdwQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ25DLE9BQU8sRUFDTCxhQUFhLEVBQ2IsWUFBWSxFQUVaLGVBQWUsRUFDaEIsTUFBTSxZQUFZLENBQUM7QUFFcEIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUd6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBYWhELE1BQU0sT0FBTyxjQUFjOzs7Ozs7OztJQWF6QixZQUNVLElBQWdCLEVBQ2hCLFdBQXdCLEVBQ3hCLGVBQWdDLEVBQ2hDLE1BQXFCLEVBQ1QsS0FBbUI7UUFKL0IsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUNULFVBQUssR0FBTCxLQUFLLENBQWM7UUFqQmxDLGFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBa0IsU0FBUyxDQUFDLENBQUM7UUFDM0QsY0FBUyxHQUFHLElBQUksZUFBZSxDQUFlLEVBQUUs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Ozs7O0lBRU8sV0FBVyxDQUFDLE9BQWdCO1FBQ2xDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFO1lBQzNCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7O2NBRUssUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSzs7WUFDakMsS0FBSztRQUNULEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTs7a0JBQ2pDLEtBQUssR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDO1lBQzNCLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSTs7OztZQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxPQUFPLENBQUMsRUFBRSxFQUFDLENBQUM7WUFDN0MsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsTUFBTTthQUNQO1NBQ0Y7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7OztZQTFkRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUEvQlEsVUFBVTtZQWdCVixXQUFXO1lBSGxCLGVBQWU7WUFIZixhQUFhO1lBQ2IsWUFBWSx1QkF1Q1QsUUFBUTs7Ozs7SUFqQlgsa0NBQWtFOztJQUNsRSxtQ0FBbUU7O0lBQ25FLDJDQUFrRTs7SUFDbEUsd0NBQXdFOzs7OztJQUN4RSwwQ0FBOEM7Ozs7O0lBQzlDLGlDQUF1Qzs7Ozs7SUFDdkMsaUNBQXdCOzs7OztJQUl4QiwrQkFBc0I7Ozs7O0lBR3BCLDhCQUF3Qjs7Ozs7SUFDeEIscUNBQWdDOzs7OztJQUNoQyx5Q0FBd0M7Ozs7O0lBQ3hDLGdDQUE2Qjs7Ozs7SUFDN0IsK0JBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAsIHRhcCwgY2F0Y2hFcnJvciwgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IG9sUG9pbnQgZnJvbSAnb2wvZ2VvbS9Qb2ludCc7XHJcblxyXG5pbXBvcnQgeyBUb29sIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuaW1wb3J0IHsgdXVpZCB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuaW1wb3J0IHtcclxuICBDb25maWdTZXJ2aWNlLFxyXG4gIFJvdXRlU2VydmljZSxcclxuICBNZXNzYWdlLFxyXG4gIExhbmd1YWdlU2VydmljZVxyXG59IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICdAaWdvMi9hdXRoJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnQGlnbzIvZ2VvJztcclxuXHJcbmltcG9ydCB7IFR5cGVQZXJtaXNzaW9uIH0gZnJvbSAnLi9jb250ZXh0LmVudW0nO1xyXG5pbXBvcnQge1xyXG4gIENvbnRleHRzTGlzdCxcclxuICBDb250ZXh0U2VydmljZU9wdGlvbnMsXHJcbiAgQ29udGV4dCxcclxuICBEZXRhaWxlZENvbnRleHQsXHJcbiAgQ29udGV4dE1hcFZpZXcsXHJcbiAgQ29udGV4dFBlcm1pc3Npb25cclxufSBmcm9tICcuL2NvbnRleHQuaW50ZXJmYWNlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbnRleHRTZXJ2aWNlIHtcclxuICBwdWJsaWMgY29udGV4dCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERldGFpbGVkQ29udGV4dD4odW5kZWZpbmVkKTtcclxuICBwdWJsaWMgY29udGV4dHMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxDb250ZXh0c0xpc3Q+KHsgb3VyczogW10gfSk7XHJcbiAgcHVibGljIGRlZmF1bHRDb250ZXh0SWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KHVuZGVmaW5lZCk7XHJcbiAgcHVibGljIGVkaXRlZENvbnRleHQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEZXRhaWxlZENvbnRleHQ+KHVuZGVmaW5lZCk7XHJcbiAgcHJpdmF0ZSBtYXBWaWV3RnJvbVJvdXRlOiBDb250ZXh0TWFwVmlldyA9IHt9O1xyXG4gIHByaXZhdGUgb3B0aW9uczogQ29udGV4dFNlcnZpY2VPcHRpb25zO1xyXG4gIHByaXZhdGUgYmFzZVVybDogc3RyaW5nO1xyXG5cclxuICAvLyBVbnRpbCB0aGUgQ29udGV4dFNlcnZpY2UgaXMgY29tcGxldGVseSByZWZhY3RvcmVkLCB0aGlzIGlzIG5lZWRlZFxyXG4gIC8vIHRvIHRyYWNrIHRoZSBjdXJyZW50IHRvb2xzXHJcbiAgcHJpdmF0ZSB0b29sczogVG9vbFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlLFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByb3V0ZTogUm91dGVTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgICB7XHJcbiAgICAgICAgYmFzZVBhdGg6ICdjb250ZXh0cycsXHJcbiAgICAgICAgY29udGV4dExpc3RGaWxlOiAnX2NvbnRleHRzLmpzb24nLFxyXG4gICAgICAgIGRlZmF1bHRDb250ZXh0VXJpOiAnX2RlZmF1bHQnXHJcbiAgICAgIH0sXHJcbiAgICAgIHRoaXMuY29uZmlnLmdldENvbmZpZygnY29udGV4dCcpXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuYmFzZVVybCA9IHRoaXMub3B0aW9ucy51cmw7XHJcblxyXG4gICAgdGhpcy5yZWFkUGFyYW1zRnJvbVJvdXRlKCk7XHJcblxyXG4gICAgdGhpcy5hdXRoU2VydmljZS5hdXRoZW50aWNhdGUkLnN1YnNjcmliZShhdXRoZW50aWNhdGVkID0+IHtcclxuICAgICAgaWYgKGF1dGhlbnRpY2F0ZWQgPT09IG51bGwpIHtcclxuICAgICAgICB0aGlzLmxvYWREZWZhdWx0Q29udGV4dCgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBjb250ZXh0cyQkID0gdGhpcy5jb250ZXh0cyQuc3Vic2NyaWJlKGNvbnRleHRzID0+IHtcclxuICAgICAgICBpZiAoY29udGV4dHMkJCkge1xyXG4gICAgICAgICAgY29udGV4dHMkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgICAgdGhpcy5oYW5kbGVDb250ZXh0c0NoYW5nZShjb250ZXh0cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5sb2FkQ29udGV4dHMoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0KCk6IE9ic2VydmFibGU8Q29udGV4dHNMaXN0PiB7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnL2NvbnRleHRzJztcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PENvbnRleHRzTGlzdD4odXJsKTtcclxuICB9XHJcblxyXG4gIGdldEJ5SWQoaWQ6IHN0cmluZyk6IE9ic2VydmFibGU8Q29udGV4dD4ge1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5iYXNlVXJsICsgJy9jb250ZXh0cy8nICsgaWQ7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxDb250ZXh0Pih1cmwpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGV0YWlscyhpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxEZXRhaWxlZENvbnRleHQ+IHtcclxuICAgIGNvbnN0IHVybCA9IGAke3RoaXMuYmFzZVVybH0vY29udGV4dHMvJHtpZH0vZGV0YWlsc2A7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5nZXQ8RGV0YWlsZWRDb250ZXh0Pih1cmwpXHJcbiAgICAgIC5waXBlKGNhdGNoRXJyb3IocmVzID0+IHRoaXMuaGFuZGxlRXJyb3IocmVzLCBpZCkpKTtcclxuICB9XHJcblxyXG4gIGdldERlZmF1bHQoKTogT2JzZXJ2YWJsZTxEZXRhaWxlZENvbnRleHQ+IHtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuYmFzZVVybCArICcvY29udGV4dHMvZGVmYXVsdCc7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxEZXRhaWxlZENvbnRleHQ+KHVybCkucGlwZShcclxuICAgICAgdGFwKGNvbnRleHQgPT4ge1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdENvbnRleHRJZCQubmV4dChjb250ZXh0LmlkKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBzZXREZWZhdWx0KGlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5iYXNlVXJsICsgJy9jb250ZXh0cy9kZWZhdWx0JztcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIHsgZGVmYXVsdENvbnRleHRJZDogaWQgfSk7XHJcbiAgfVxyXG5cclxuICBkZWxldGUoaWQ6IHN0cmluZyk6IE9ic2VydmFibGU8dm9pZD4ge1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5iYXNlVXJsICsgJy9jb250ZXh0cy8nICsgaWQ7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZTx2b2lkPih1cmwpLnBpcGUoXHJcbiAgICAgIHRhcChyZXMgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbnRleHRzOiBDb250ZXh0c0xpc3QgPSB7IG91cnM6IFtdIH07XHJcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5jb250ZXh0cyQudmFsdWUpLmZvckVhY2goXHJcbiAgICAgICAgICBrZXkgPT5cclxuICAgICAgICAgICAgKGNvbnRleHRzW2tleV0gPSB0aGlzLmNvbnRleHRzJC52YWx1ZVtrZXldLmZpbHRlcihjID0+IGMuaWQgIT09IGlkKSlcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuY29udGV4dHMkLm5leHQoY29udGV4dHMpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZShjb250ZXh0OiBEZXRhaWxlZENvbnRleHQpOiBPYnNlcnZhYmxlPENvbnRleHQ+IHtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuYmFzZVVybCArICcvY29udGV4dHMnO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PENvbnRleHQ+KHVybCwgSlNPTi5zdHJpbmdpZnkoY29udGV4dCkpLnBpcGUoXHJcbiAgICAgIG1hcChjb250ZXh0Q3JlYXRlZCA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuYXV0aFNlcnZpY2UuYXV0aGVudGljYXRlZCkge1xyXG4gICAgICAgICAgY29udGV4dENyZWF0ZWQucGVybWlzc2lvbiA9IFR5cGVQZXJtaXNzaW9uW1R5cGVQZXJtaXNzaW9uLndyaXRlXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29udGV4dENyZWF0ZWQucGVybWlzc2lvbiA9IFR5cGVQZXJtaXNzaW9uW1R5cGVQZXJtaXNzaW9uLnJlYWRdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbnRleHRzJC52YWx1ZS5vdXJzLnB1c2goY29udGV4dENyZWF0ZWQpO1xyXG4gICAgICAgIHRoaXMuY29udGV4dHMkLm5leHQodGhpcy5jb250ZXh0cyQudmFsdWUpO1xyXG4gICAgICAgIHJldHVybiBjb250ZXh0Q3JlYXRlZDtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjbG9uZShpZDogc3RyaW5nLCBwcm9wZXJ0aWVzID0ge30pOiBPYnNlcnZhYmxlPENvbnRleHQ+IHtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuYmFzZVVybCArICcvY29udGV4dHMvJyArIGlkICsgJy9jbG9uZSc7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8Q29udGV4dD4odXJsLCBKU09OLnN0cmluZ2lmeShwcm9wZXJ0aWVzKSkucGlwZShcclxuICAgICAgbWFwKGNvbnRleHRDbG9uZWQgPT4ge1xyXG4gICAgICAgIGNvbnRleHRDbG9uZWQucGVybWlzc2lvbiA9IFR5cGVQZXJtaXNzaW9uW1R5cGVQZXJtaXNzaW9uLndyaXRlXTtcclxuICAgICAgICB0aGlzLmNvbnRleHRzJC52YWx1ZS5vdXJzLnB1c2goY29udGV4dENsb25lZCk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0cyQubmV4dCh0aGlzLmNvbnRleHRzJC52YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRleHRDbG9uZWQ7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKGlkOiBzdHJpbmcsIGNvbnRleHQ6IENvbnRleHQpOiBPYnNlcnZhYmxlPENvbnRleHQ+IHtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuYmFzZVVybCArICcvY29udGV4dHMvJyArIGlkO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wYXRjaDxDb250ZXh0Pih1cmwsIEpTT04uc3RyaW5naWZ5KGNvbnRleHQpKTtcclxuICB9XHJcblxyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gIGFkZFRvb2xBc3NvY2lhdGlvbihjb250ZXh0SWQ6IHN0cmluZywgdG9vbElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcclxuICAgIGNvbnN0IHVybCA9IGAke3RoaXMuYmFzZVVybH0vY29udGV4dHMvJHtjb250ZXh0SWR9L3Rvb2xzYDtcclxuICAgIGNvbnN0IGFzc29jaWF0aW9uID0ge1xyXG4gICAgICB0b29sSWRcclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8dm9pZD4odXJsLCBKU09OLnN0cmluZ2lmeShhc3NvY2lhdGlvbikpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlVG9vbEFzc29jaWF0aW9uKGNvbnRleHRJZDogc3RyaW5nLCB0b29sSWQ6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmJhc2VVcmx9L2NvbnRleHRzLyR7Y29udGV4dElkfS90b29scy8ke3Rvb2xJZH1gO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUodXJsKTtcclxuICB9XHJcblxyXG4gIGdldFBlcm1pc3Npb25zKGlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPENvbnRleHRQZXJtaXNzaW9uW10+IHtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuYmFzZVVybCArICcvY29udGV4dHMvJyArIGlkICsgJy9wZXJtaXNzaW9ucyc7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxDb250ZXh0UGVybWlzc2lvbltdPih1cmwpO1xyXG4gIH1cclxuXHJcbiAgYWRkUGVybWlzc2lvbkFzc29jaWF0aW9uKFxyXG4gICAgY29udGV4dElkOiBzdHJpbmcsXHJcbiAgICBwcm9maWw6IHN0cmluZyxcclxuICAgIHR5cGU6IFR5cGVQZXJtaXNzaW9uXHJcbiAgKTogT2JzZXJ2YWJsZTxDb250ZXh0UGVybWlzc2lvbltdPiB7XHJcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmJhc2VVcmx9L2NvbnRleHRzLyR7Y29udGV4dElkfS9wZXJtaXNzaW9uc2A7XHJcbiAgICBjb25zdCBhc3NvY2lhdGlvbiA9IHtcclxuICAgICAgcHJvZmlsLFxyXG4gICAgICB0eXBlUGVybWlzc2lvbjogdHlwZVxyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxDb250ZXh0UGVybWlzc2lvbltdPihcclxuICAgICAgdXJsLFxyXG4gICAgICBKU09OLnN0cmluZ2lmeShhc3NvY2lhdGlvbilcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVQZXJtaXNzaW9uQXNzb2NpYXRpb24oXHJcbiAgICBjb250ZXh0SWQ6IHN0cmluZyxcclxuICAgIHBlcm1pc3Npb25JZDogc3RyaW5nXHJcbiAgKTogT2JzZXJ2YWJsZTx2b2lkPiB7XHJcbiAgICBjb25zdCB1cmwgPSBgJHtcclxuICAgICAgdGhpcy5iYXNlVXJsXHJcbiAgICB9L2NvbnRleHRzLyR7Y29udGV4dElkfS9wZXJtaXNzaW9ucy8ke3Blcm1pc3Npb25JZH1gO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGU8dm9pZD4odXJsKTtcclxuICB9XHJcblxyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgZ2V0TG9jYWxDb250ZXh0cygpOiBPYnNlcnZhYmxlPENvbnRleHRzTGlzdD4ge1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5nZXRQYXRoKHRoaXMub3B0aW9ucy5jb250ZXh0TGlzdEZpbGUpO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8Q29udGV4dHNMaXN0Pih1cmwpLnBpcGUoXHJcbiAgICAgIG1hcCgocmVzOiBhbnkpID0+IHtcclxuICAgICAgICByZXR1cm4geyBvdXJzOiByZXMgfTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXRMb2NhbENvbnRleHQodXJpKTogT2JzZXJ2YWJsZTxEZXRhaWxlZENvbnRleHQ+IHtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0UGF0aChgJHt1cml9Lmpzb25gKTtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PERldGFpbGVkQ29udGV4dD4odXJsKS5waXBlKFxyXG4gICAgICBjYXRjaEVycm9yKHJlcyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlRXJyb3IocmVzLCB1cmkpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGxvYWRDb250ZXh0cygpIHtcclxuICAgIGxldCByZXF1ZXN0O1xyXG4gICAgaWYgKHRoaXMuYmFzZVVybCkge1xyXG4gICAgICByZXF1ZXN0ID0gdGhpcy5nZXQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlcXVlc3QgPSB0aGlzLmdldExvY2FsQ29udGV4dHMoKTtcclxuICAgIH1cclxuICAgIHJlcXVlc3Quc3Vic2NyaWJlKGNvbnRleHRzID0+IHtcclxuICAgICAgY29uc3QgcHVibGljc0NvbnRleHRzID0gdGhpcy5jb250ZXh0cyQudmFsdWUucHVibGljO1xyXG5cclxuICAgICAgaWYgKHB1YmxpY3NDb250ZXh0cykge1xyXG4gICAgICAgIGNvbnN0IGNvbnRleHRVcmkgPSBwdWJsaWNzQ29udGV4dHMuZmluZChcclxuICAgICAgICAgIGMgPT4gYy51cmkgPT09IHRoaXMub3B0aW9ucy5kZWZhdWx0Q29udGV4dFVyaVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKGNvbnRleHRVcmkpIHtcclxuICAgICAgICAgIGlmICghY29udGV4dHMucHVibGljKSB7XHJcbiAgICAgICAgICAgIGNvbnRleHRzLnB1YmxpYyA9IFtdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29udGV4dHMucHVibGljLnB1c2goY29udGV4dFVyaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY29udGV4dHMkLm5leHQoY29udGV4dHMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBsb2FkRGVmYXVsdENvbnRleHQoKSB7XHJcbiAgICBjb25zdCBsb2FkRmN0ID0gKGRpcmVjdCA9IGZhbHNlKSA9PiB7XHJcbiAgICAgIGlmICghZGlyZWN0ICYmIHRoaXMuYmFzZVVybCAmJiB0aGlzLmF1dGhTZXJ2aWNlLmF1dGhlbnRpY2F0ZWQpIHtcclxuICAgICAgICB0aGlzLmdldERlZmF1bHQoKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAoX2NvbnRleHQ6IERldGFpbGVkQ29udGV4dCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuZGVmYXVsdENvbnRleHRVcmkgPSBfY29udGV4dC51cmk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ29udGV4dFRvTGlzdChfY29udGV4dCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q29udGV4dChfY29udGV4dCk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRDb250ZXh0SWQkLm5leHQodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkQ29udGV4dCh0aGlzLm9wdGlvbnMuZGVmYXVsdENvbnRleHRVcmkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5sb2FkQ29udGV4dCh0aGlzLm9wdGlvbnMuZGVmYXVsdENvbnRleHRVcmkpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGlmICh0aGlzLnJvdXRlICYmIHRoaXMucm91dGUub3B0aW9ucy5jb250ZXh0S2V5KSB7XHJcbiAgICAgIHRoaXMucm91dGUucXVlcnlQYXJhbXMucGlwZShkZWJvdW5jZVRpbWUoMTAwKSkuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XHJcbiAgICAgICAgY29uc3QgY29udGV4dFBhcmFtID0gcGFyYW1zW3RoaXMucm91dGUub3B0aW9ucy5jb250ZXh0S2V5IGFzIHN0cmluZ107XHJcbiAgICAgICAgbGV0IGRpcmVjdCA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChjb250ZXh0UGFyYW0pIHtcclxuICAgICAgICAgIHRoaXMub3B0aW9ucy5kZWZhdWx0Q29udGV4dFVyaSA9IGNvbnRleHRQYXJhbTtcclxuICAgICAgICAgIGRpcmVjdCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxvYWRGY3QoZGlyZWN0KTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsb2FkRmN0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsb2FkQ29udGV4dCh1cmk6IHN0cmluZykge1xyXG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMuY29udGV4dCQudmFsdWU7XHJcbiAgICBpZiAoY29udGV4dCAmJiBjb250ZXh0LnVyaSA9PT0gdXJpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjb250ZXh0cyQkID0gdGhpcy5nZXRDb250ZXh0QnlVcmkodXJpKS5zdWJzY3JpYmUoXHJcbiAgICAgIChfY29udGV4dDogRGV0YWlsZWRDb250ZXh0KSA9PiB7XHJcbiAgICAgICAgY29udGV4dHMkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29udGV4dFRvTGlzdChfY29udGV4dCk7XHJcbiAgICAgICAgdGhpcy5zZXRDb250ZXh0KF9jb250ZXh0KTtcclxuICAgICAgfSxcclxuICAgICAgZXJyID0+IHtcclxuICAgICAgICBjb250ZXh0cyQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBzZXRDb250ZXh0KGNvbnRleHQ6IERldGFpbGVkQ29udGV4dCkge1xyXG4gICAgY29uc3QgY3VycmVudENvbnRleHQgPSB0aGlzLmNvbnRleHQkLnZhbHVlO1xyXG4gICAgaWYgKGN1cnJlbnRDb250ZXh0ICYmIGNvbnRleHQgJiYgY29udGV4dC5pZCA9PT0gY3VycmVudENvbnRleHQuaWQpIHtcclxuICAgICAgaWYgKGNvbnRleHQubWFwLnZpZXcua2VlcEN1cnJlbnRWaWV3ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb250ZXh0Lm1hcC52aWV3LmtlZXBDdXJyZW50VmlldyA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jb250ZXh0JC5uZXh0KGNvbnRleHQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFjb250ZXh0Lm1hcCkge1xyXG4gICAgICBjb250ZXh0Lm1hcCA9IHsgdmlldzoge30gfTtcclxuICAgIH1cclxuXHJcbiAgICBPYmplY3QuYXNzaWduKGNvbnRleHQubWFwLnZpZXcsIHRoaXMubWFwVmlld0Zyb21Sb3V0ZSk7XHJcblxyXG4gICAgdGhpcy5jb250ZXh0JC5uZXh0KGNvbnRleHQpO1xyXG4gIH1cclxuXHJcbiAgbG9hZEVkaXRlZENvbnRleHQodXJpOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuZ2V0Q29udGV4dEJ5VXJpKHVyaSkuc3Vic2NyaWJlKChfY29udGV4dDogRGV0YWlsZWRDb250ZXh0KSA9PiB7XHJcbiAgICAgIHRoaXMuc2V0RWRpdGVkQ29udGV4dChfY29udGV4dCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldEVkaXRlZENvbnRleHQoY29udGV4dDogRGV0YWlsZWRDb250ZXh0KSB7XHJcbiAgICB0aGlzLmVkaXRlZENvbnRleHQkLm5leHQoY29udGV4dCk7XHJcbiAgfVxyXG5cclxuICBnZXRDb250ZXh0RnJvbU1hcChpZ29NYXA6IElnb01hcCk6IERldGFpbGVkQ29udGV4dCB7XHJcbiAgICBjb25zdCB2aWV3ID0gaWdvTWFwLm9sLmdldFZpZXcoKTtcclxuICAgIGNvbnN0IHByb2ogPSB2aWV3LmdldFByb2plY3Rpb24oKS5nZXRDb2RlKCk7XHJcbiAgICBjb25zdCBjZW50ZXI6IGFueSA9IG5ldyBvbFBvaW50KHZpZXcuZ2V0Q2VudGVyKCkpLnRyYW5zZm9ybShcclxuICAgICAgcHJvaixcclxuICAgICAgJ0VQU0c6NDMyNidcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgY29udGV4dCA9IHtcclxuICAgICAgdXJpOiB1dWlkKCksXHJcbiAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgc2NvcGU6ICdwcml2YXRlJyxcclxuICAgICAgbWFwOiB7XHJcbiAgICAgICAgdmlldzoge1xyXG4gICAgICAgICAgY2VudGVyOiBjZW50ZXIuZ2V0Q29vcmRpbmF0ZXMoKSxcclxuICAgICAgICAgIHpvb206IHZpZXcuZ2V0Wm9vbSgpLFxyXG4gICAgICAgICAgcHJvamVjdGlvbjogcHJvalxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgbGF5ZXJzOiBbXSxcclxuICAgICAgdG9vbHM6IFtdXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGxheWVycyA9IGlnb01hcC5sYXllcnMkLmdldFZhbHVlKCk7XHJcblxyXG4gICAgZm9yIChjb25zdCBsIG9mIGxheWVycykge1xyXG4gICAgICBjb25zdCBsYXllcjogYW55ID0gbDtcclxuICAgICAgY29uc3Qgb3B0cyA9IHtcclxuICAgICAgICBpZDogbGF5ZXIub3B0aW9ucy5pZCA/IFN0cmluZyhsYXllci5vcHRpb25zLmlkKSA6IHVuZGVmaW5lZCxcclxuICAgICAgICB0aXRsZTogbGF5ZXIub3B0aW9ucy50aXRsZSxcclxuICAgICAgICB6SW5kZXg6IGxheWVyLnpJbmRleCxcclxuICAgICAgICB2aXNpYmxlOiBsYXllci52aXNpYmxlLFxyXG4gICAgICAgIHNvdXJjZU9wdGlvbnM6IHtcclxuICAgICAgICAgIHR5cGU6IGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucy50eXBlLFxyXG4gICAgICAgICAgcGFyYW1zOiBsYXllci5kYXRhU291cmNlLm9wdGlvbnMucGFyYW1zLFxyXG4gICAgICAgICAgdXJsOiBsYXllci5kYXRhU291cmNlLm9wdGlvbnMudXJsXHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgICBjb250ZXh0LmxheWVycy5wdXNoKG9wdHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnRleHQudG9vbHMgPSB0aGlzLnRvb2xzLm1hcCh0b29sID0+IFN0cmluZyh0b29sLmlkKSk7XHJcblxyXG4gICAgcmV0dXJuIGNvbnRleHQ7XHJcbiAgfVxyXG5cclxuICBzZXRUb29scyh0b29sczogVG9vbFtdKSB7XHJcbiAgICB0aGlzLnRvb2xzID0gdG9vbHM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldENvbnRleHRCeVVyaSh1cmk6IHN0cmluZyk6IE9ic2VydmFibGU8RGV0YWlsZWRDb250ZXh0PiB7XHJcbiAgICBpZiAodGhpcy5iYXNlVXJsKSB7XHJcbiAgICAgIGxldCBjb250ZXh0VG9Mb2FkO1xyXG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyh0aGlzLmNvbnRleHRzJC52YWx1ZSkpIHtcclxuICAgICAgICBjb250ZXh0VG9Mb2FkID0gdGhpcy5jb250ZXh0cyQudmFsdWVba2V5XS5maW5kKGMgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGMudXJpID09PSB1cmk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGNvbnRleHRUb0xvYWQpIHtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gVE9ETyA6IHVzZSBhbHdheXMgaWQgb3IgdXJpXHJcbiAgICAgIGNvbnN0IGlkID0gY29udGV4dFRvTG9hZCA/IGNvbnRleHRUb0xvYWQuaWQgOiB1cmk7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldERldGFpbHMoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmdldExvY2FsQ29udGV4dCh1cmkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZWFkUGFyYW1zRnJvbVJvdXRlKCkge1xyXG4gICAgaWYgKCF0aGlzLnJvdXRlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xyXG4gICAgICBjb25zdCBjZW50ZXJLZXkgPSB0aGlzLnJvdXRlLm9wdGlvbnMuY2VudGVyS2V5O1xyXG4gICAgICBpZiAoY2VudGVyS2V5ICYmIHBhcmFtc1tjZW50ZXJLZXkgYXMgc3RyaW5nXSkge1xyXG4gICAgICAgIGNvbnN0IGNlbnRlclBhcmFtcyA9IHBhcmFtc1tjZW50ZXJLZXkgYXMgc3RyaW5nXTtcclxuICAgICAgICB0aGlzLm1hcFZpZXdGcm9tUm91dGUuY2VudGVyID0gY2VudGVyUGFyYW1zLnNwbGl0KCcsJykubWFwKE51bWJlcik7XHJcbiAgICAgICAgdGhpcy5tYXBWaWV3RnJvbVJvdXRlLmdlb2xvY2F0ZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwcm9qZWN0aW9uS2V5ID0gdGhpcy5yb3V0ZS5vcHRpb25zLnByb2plY3Rpb25LZXk7XHJcbiAgICAgIGlmIChwcm9qZWN0aW9uS2V5ICYmIHBhcmFtc1twcm9qZWN0aW9uS2V5IGFzIHN0cmluZ10pIHtcclxuICAgICAgICBjb25zdCBwcm9qZWN0aW9uUGFyYW0gPSBwYXJhbXNbcHJvamVjdGlvbktleSBhcyBzdHJpbmddO1xyXG4gICAgICAgIHRoaXMubWFwVmlld0Zyb21Sb3V0ZS5wcm9qZWN0aW9uID0gcHJvamVjdGlvblBhcmFtO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCB6b29tS2V5ID0gdGhpcy5yb3V0ZS5vcHRpb25zLnpvb21LZXk7XHJcbiAgICAgIGlmICh6b29tS2V5ICYmIHBhcmFtc1t6b29tS2V5IGFzIHN0cmluZ10pIHtcclxuICAgICAgICBjb25zdCB6b29tUGFyYW0gPSBwYXJhbXNbem9vbUtleSBhcyBzdHJpbmddO1xyXG4gICAgICAgIHRoaXMubWFwVmlld0Zyb21Sb3V0ZS56b29tID0gTnVtYmVyKHpvb21QYXJhbSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRQYXRoKGZpbGU6IHN0cmluZykge1xyXG4gICAgY29uc3QgYmFzZVBhdGggPSB0aGlzLm9wdGlvbnMuYmFzZVBhdGgucmVwbGFjZSgvXFwvJC8sICcnKTtcclxuXHJcbiAgICByZXR1cm4gYCR7YmFzZVBhdGh9LyR7ZmlsZX1gO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVFcnJvcihyZXM6IFJlc3BvbnNlLCB1cmk6IHN0cmluZyk6IE1lc3NhZ2VbXSB7XHJcbiAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jb250ZXh0cyQudmFsdWUub3Vycy5maW5kKG9iaiA9PiBvYmoudXJpID09PSB1cmkpO1xyXG4gICAgY29uc3QgdGl0bGVDb250ZXh0ID0gY29udGV4dCA/IGNvbnRleHQudGl0bGUgOiB1cmk7XHJcbiAgICBjb25zdCB0aXRsZUVycm9yID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5pbnZhbGlkLnRpdGxlJ1xyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCB0ZXh0RXJyb3IgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgJ2lnby5jb250ZXh0LmNvbnRleHRNYW5hZ2VyLmludmFsaWQudGV4dCcsXHJcbiAgICAgIHsgdmFsdWU6IHRpdGxlQ29udGV4dCB9XHJcbiAgICApO1xyXG5cclxuICAgIHRocm93IFt7IHRpdGxlOiB0aXRsZUVycm9yLCB0ZXh0OiB0ZXh0RXJyb3IgfV07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUNvbnRleHRzQ2hhbmdlKFxyXG4gICAgY29udGV4dHM6IENvbnRleHRzTGlzdCxcclxuICAgIGtlZXBDdXJyZW50Q29udGV4dCA9IGZhbHNlXHJcbiAgKSB7XHJcbiAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jb250ZXh0JC52YWx1ZTtcclxuICAgIGNvbnN0IGVkaXRlZENvbnRleHQgPSB0aGlzLmVkaXRlZENvbnRleHQkLnZhbHVlO1xyXG5cclxuICAgIGlmICgha2VlcEN1cnJlbnRDb250ZXh0IHx8ICF0aGlzLmZpbmRDb250ZXh0KGNvbnRleHQpKSB7XHJcbiAgICAgIHRoaXMubG9hZERlZmF1bHRDb250ZXh0KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoY29udGV4dC5tYXAudmlldy5rZWVwQ3VycmVudFZpZXcgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNvbnRleHQubWFwLnZpZXcua2VlcEN1cnJlbnRWaWV3ID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmNvbnRleHQkLm5leHQoY29udGV4dCk7XHJcbiAgICAgIHRoaXMuZ2V0RGVmYXVsdCgpLnN1YnNjcmliZSgoKSA9PiB7fSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBlZGl0ZWRGb3VuZCA9IHRoaXMuZmluZENvbnRleHQoZWRpdGVkQ29udGV4dCk7XHJcbiAgICBpZiAoIWVkaXRlZEZvdW5kIHx8IGVkaXRlZEZvdW5kLnBlcm1pc3Npb24gIT09ICd3cml0ZScpIHtcclxuICAgICAgdGhpcy5zZXRFZGl0ZWRDb250ZXh0KHVuZGVmaW5lZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZENvbnRleHRUb0xpc3QoY29udGV4dDogQ29udGV4dCkge1xyXG4gICAgY29uc3QgY29udGV4dEZvdW5kID0gdGhpcy5maW5kQ29udGV4dChjb250ZXh0KTtcclxuICAgIGlmICghY29udGV4dEZvdW5kKSB7XHJcbiAgICAgIGNvbnN0IGNvbnRleHRTaW1wbGlmaWUgPSB7XHJcbiAgICAgICAgaWQ6IGNvbnRleHQuaWQsXHJcbiAgICAgICAgdXJpOiBjb250ZXh0LnVyaSxcclxuICAgICAgICB0aXRsZTogY29udGV4dC50aXRsZSxcclxuICAgICAgICBzY29wZTogY29udGV4dC5zY29wZSxcclxuICAgICAgICBwZXJtaXNzaW9uOiBUeXBlUGVybWlzc2lvbltUeXBlUGVybWlzc2lvbi5yZWFkXVxyXG4gICAgICB9O1xyXG4gICAgICBpZiAodGhpcy5jb250ZXh0cyQudmFsdWUgJiYgdGhpcy5jb250ZXh0cyQudmFsdWUucHVibGljKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0cyQudmFsdWUucHVibGljLnB1c2goY29udGV4dFNpbXBsaWZpZSk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0cyQubmV4dCh0aGlzLmNvbnRleHRzJC52YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZmluZENvbnRleHQoY29udGV4dDogQ29udGV4dCkge1xyXG4gICAgaWYgKCFjb250ZXh0IHx8ICFjb250ZXh0LmlkKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjb250ZXh0cyA9IHRoaXMuY29udGV4dHMkLnZhbHVlO1xyXG4gICAgbGV0IGZvdW5kO1xyXG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoY29udGV4dHMpKSB7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gY29udGV4dHNba2V5XTtcclxuICAgICAgZm91bmQgPSB2YWx1ZS5maW5kKGMgPT4gYy5pZCA9PT0gY29udGV4dC5pZCk7XHJcbiAgICAgIGlmIChmb3VuZCkge1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZvdW5kO1xyXG4gIH1cclxufVxyXG4iXX0=