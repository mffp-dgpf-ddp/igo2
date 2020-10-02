import { Stroke, Fill, Style, Circle } from 'ol/style';
import Cluster from 'ol/source/Cluster';
import { map, tap, catchError, debounceTime, flatMap, filter, buffer, debounce } from 'rxjs/operators';
import { fromLonLat } from 'ol/proj';
import { easeOut } from 'ol/easing';
import olPoint from 'ol/geom/Point';
import { HttpClient } from '@angular/common/http';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthService, IgoAuthModule } from '@igo2/auth';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatDividerModule, MatTabsModule, MatSelectModule, MatOptionModule, MatTooltipModule, MatCheckboxModule, MatButtonToggleModule, MatDialogRef, MatDialog, MatIconModule, MatDialogModule, MatListModule, MatRadioModule, MatMenuModule, MatAutocompleteModule, MatSidenavModule } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { IgoSpinnerModule, ActionStore, ActionbarMode, ConfirmDialogService, IgoConfirmDialogModule, IgoStopPropagationModule, IgoListModule, IgoKeyValueModule, IgoCollapsibleModule, IgoActionbarModule, getEntityTitle, IgoPanelModule, IgoFlexibleModule } from '@igo2/common';
import { FeatureDataSource, VectorLayer, ClusterDataSource, MapBrowserComponent, LayerService, StyleListService, StyleService, MapService, FeatureMotion, moveToOlFeatures, IgoFeatureModule } from '@igo2/geo';
import GeoJSON from 'ol/format/GeoJSON';
import { Injectable, Optional, Component, Input, Output, EventEmitter, ChangeDetectorRef, Directive, ChangeDetectionStrategy, Self, HostListener, NgModule, defineInjectable, inject } from '@angular/core';
import { ConfigService, RouteService, MessageService, LanguageService, StorageService, IgoLanguageModule } from '@igo2/core';
import { uuid, ObjectUtils, downloadContent, Clipboard } from '@igo2/utils';
import { BehaviorSubject, of, Observable, merge, ReplaySubject, EMPTY, timer } from 'rxjs';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileOpener as FileOpener$1 } from '@ionic-native/file-opener/ngx/index';
import { File as File$1 } from '@ionic-native/file/ngx/index';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ExportError extends Error {
}
class ExportInvalidFileError extends ExportError {
    constructor() {
        super('Invalid context');
        Object.setPrototypeOf(this, ExportInvalidFileError.prototype);
    }
}
class ExportNothingToExportError extends ExportError {
    constructor() {
        super('Nothing to export');
        Object.setPrototypeOf(this, ExportNothingToExportError.prototype);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} error
 * @param {?} messageService
 * @param {?} languageService
 * @return {?}
 */
function handleFileExportError(error, messageService, languageService) {
    if (error instanceof ExportNothingToExportError) {
        this.handleNothingToExportError(messageService, languageService);
        return;
    }
    /** @type {?} */
    const translate = languageService.translate;
    /** @type {?} */
    const title = translate.instant('igo.context.contextImportExport.export.failed.title');
    /** @type {?} */
    const message = translate.instant('igo.context.contextImportExport.export.failed.text');
    messageService.error(message, title);
}
/**
 * @param {?} messageService
 * @param {?} languageService
 * @return {?}
 */
function handleFileExportSuccess(messageService, languageService) {
    /** @type {?} */
    const translate = languageService.translate;
    /** @type {?} */
    const title = translate.instant('igo.context.contextImportExport.export.success.title');
    /** @type {?} */
    const message = translate.instant('igo.context.contextImportExport.export.success.text');
    messageService.success(message, title);
}
/**
 * @param {?} messageService
 * @param {?} languageService
 * @return {?}
 */
function handleNothingToExportError(messageService, languageService) {
    /** @type {?} */
    const translate = languageService.translate;
    /** @type {?} */
    const title = translate.instant('igo.context.contextImportExport.export.nothing.title');
    /** @type {?} */
    const message = translate.instant('igo.context.contextImportExport.export.nothing.text');
    messageService.error(message, title);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} file
 * @param {?} context
 * @param {?} messageService
 * @param {?} languageService
 * @param {?} contextService
 * @return {?}
 */
function handleFileImportSuccess(file, context, messageService, languageService, contextService) {
    if (Object.keys(context).length <= 0) {
        handleNothingToImportError(file, messageService, languageService);
        return;
    }
    /** @type {?} */
    const contextTitle = computeLayerTitleFromFile(file);
    addContextToContextList(context, contextTitle, contextService);
    /** @type {?} */
    const translate = languageService.translate;
    /** @type {?} */
    const messageTitle = translate.instant('igo.context.contextImportExport.import.success.title');
    /** @type {?} */
    const message = translate.instant('igo.context.contextImportExport.import.success.text', {
        value: contextTitle
    });
    messageService.success(message, messageTitle);
}
/**
 * @param {?} file
 * @param {?} error
 * @param {?} messageService
 * @param {?} languageService
 * @param {?=} sizeMb
 * @return {?}
 */
function handleFileImportError(file, error, messageService, languageService, sizeMb) {
    sizeMb = sizeMb ? sizeMb : 30;
    /** @type {?} */
    const errMapping = {
        'Invalid file': handleInvalidFileImportError,
        'File is too large': handleSizeFileImportError,
        'Failed to read file': handleUnreadbleFileImportError
    };
    errMapping[error.message](file, error, messageService, languageService, sizeMb);
}
/**
 * @param {?} file
 * @param {?} error
 * @param {?} messageService
 * @param {?} languageService
 * @return {?}
 */
function handleInvalidFileImportError(file, error, messageService, languageService) {
    /** @type {?} */
    const translate = languageService.translate;
    /** @type {?} */
    const title = translate.instant('igo.context.contextImportExport.import.invalid.title');
    /** @type {?} */
    const message = translate.instant('igo.context.contextImportExport.import.invalid.text', {
        value: file.name,
        mimeType: file.type
    });
    messageService.error(message, title);
}
/**
 * @param {?} file
 * @param {?} error
 * @param {?} messageService
 * @param {?} languageService
 * @param {?} sizeMb
 * @return {?}
 */
function handleSizeFileImportError(file, error, messageService, languageService, sizeMb) {
    /** @type {?} */
    const translate = languageService.translate;
    /** @type {?} */
    const title = translate.instant('igo.context.contextImportExport.import.tooLarge.title');
    /** @type {?} */
    const message = translate.instant('igo.context.contextImportExport.import.tooLarge.text', {
        value: file.name,
        size: sizeMb
    });
    messageService.error(message, title);
}
/**
 * @param {?} file
 * @param {?} error
 * @param {?} messageService
 * @param {?} languageService
 * @return {?}
 */
function handleUnreadbleFileImportError(file, error, messageService, languageService) {
    /** @type {?} */
    const translate = languageService.translate;
    /** @type {?} */
    const title = translate.instant('igo.context.contextImportExport.import.unreadable.title');
    /** @type {?} */
    const message = translate.instant('igo.context.contextImportExport.import.unreadable.text', {
        value: file.name
    });
    messageService.error(message, title);
}
/**
 * @param {?} file
 * @param {?} messageService
 * @param {?} languageService
 * @return {?}
 */
function handleNothingToImportError(file, messageService, languageService) {
    /** @type {?} */
    const translate = languageService.translate;
    /** @type {?} */
    const title = translate.instant('igo.context.contextImportExport.import.empty.title');
    /** @type {?} */
    const message = translate.instant('igo.context.contextImportExport.import.empty.text', {
        value: file.name
    });
    messageService.error(message, title);
}
/**
 * @param {?} context
 * @param {?} contextTitle
 * @param {?} contextService
 * @return {?}
 */
function addContextToContextList(context, contextTitle, contextService) {
    context.title = contextTitle;
    context.imported = true;
    contextService.contexts$.value.ours.unshift(context);
    contextService.contexts$.next(contextService.contexts$.value);
    contextService.importedContext.unshift(context);
    contextService.loadContext(context.uri);
}
/**
 * @param {?} file
 * @return {?}
 */
function getFileExtension(file) {
    return file.name.split('.').pop().toLowerCase();
}
/**
 * @param {?} file
 * @return {?}
 */
function computeLayerTitleFromFile(file) {
    return file.name.substr(0, file.name.lastIndexOf('.'));
}
/**
 * @param {?} olFeatures
 * @param {?} map
 * @param {?} layerTitle
 * @return {?}
 */
function addImportedFeaturesToMap(olFeatures, map$$1, layerTitle) {
    /** @type {?} */
    const r = Math.floor(Math.random() * 255);
    /** @type {?} */
    const g = Math.floor(Math.random() * 255);
    /** @type {?} */
    const b = Math.floor(Math.random() * 255);
    /** @type {?} */
    const stroke = new Stroke({
        color: [r, g, b, 1],
        width: 2
    });
    /** @type {?} */
    const fill = new Fill({
        color: [r, g, b, 0.4]
    });
    /** @type {?} */
    const sourceOptions = {
        type: 'vector',
        queryable: true
    };
    /** @type {?} */
    const source = new FeatureDataSource(sourceOptions);
    source.ol.addFeatures(olFeatures);
    /** @type {?} */
    const layer = new VectorLayer({
        title: layerTitle,
        source,
        style: new Style({
            stroke,
            fill,
            image: new Circle({
                radius: 5,
                stroke,
                fill
            })
        })
    });
    map$$1.addLayer(layer);
    return layer;
}
/**
 * @param {?} olFeatures
 * @param {?} map
 * @param {?} layerTitle
 * @param {?} styleListService
 * @param {?} styleService
 * @return {?}
 */
function addImportedFeaturesStyledToMap(olFeatures, map$$1, layerTitle, styleListService, styleService) {
    /** @type {?} */
    let style$$1;
    /** @type {?} */
    let distance;
    if (styleListService.getStyleList(layerTitle.toString() + '.styleByAttribute')) {
        /** @type {?} */
        const styleByAttribute = styleListService.getStyleList(layerTitle.toString() + '.styleByAttribute');
        style$$1 = (/**
         * @param {?} feature
         * @return {?}
         */
        (feature) => {
            return styleService.createStyleByAttribute(feature, styleByAttribute);
        });
    }
    else if (styleListService.getStyleList(layerTitle.toString() + '.clusterStyle')) {
        /** @type {?} */
        const clusterParam = styleListService.getStyleList(layerTitle.toString() + '.clusterParam');
        distance = styleListService.getStyleList(layerTitle.toString() + '.distance');
        /** @type {?} */
        const baseStyle = styleService.createStyle(styleListService.getStyleList(layerTitle.toString() + '.clusterStyle'));
        style$$1 = (/**
         * @param {?} feature
         * @return {?}
         */
        (feature) => {
            return styleService.createClusterStyle(feature, clusterParam, baseStyle);
        });
    }
    else if (styleListService.getStyleList(layerTitle.toString() + '.style')) {
        style$$1 = styleService.createStyle(styleListService.getStyleList(layerTitle.toString() + '.style'));
    }
    else {
        style$$1 = styleService.createStyle(styleListService.getStyleList('default.style'));
    }
    /** @type {?} */
    let source;
    if (styleListService.getStyleList(layerTitle.toString() + '.clusterStyle')) {
        /** @type {?} */
        const sourceOptions = {
            distance,
            type: 'cluster',
            queryable: true
        };
        source = new ClusterDataSource(sourceOptions);
        source.ol.source.addFeatures(olFeatures);
    }
    else {
        /** @type {?} */
        const sourceOptions = {
            type: 'vector',
            queryable: true
        };
        source = new FeatureDataSource(sourceOptions);
        source.ol.addFeatures(olFeatures);
    }
    /** @type {?} */
    const layer = new VectorLayer({
        title: layerTitle,
        source,
        style: style$$1
    });
    map$$1.addLayer(layer);
    return layer;
}

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
/** @nocollapse */ ContextService.ngInjectableDef = defineInjectable({ factory: function ContextService_Factory() { return new ContextService(inject(HttpClient), inject(AuthService), inject(LanguageService), inject(ConfigService), inject(MessageService), inject(RouteService, 8)); }, token: ContextService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ImportError extends Error {
}
class ImportInvalidFileError extends ImportError {
    constructor() {
        super('Invalid file');
        Object.setPrototypeOf(this, ImportInvalidFileError.prototype);
    }
}
class ImportUnreadableFileError extends ImportError {
    constructor() {
        super('Failed to read file');
        Object.setPrototypeOf(this, ImportUnreadableFileError.prototype);
    }
}
class ImportNothingToImportError extends ImportError {
    constructor() {
        super('Nothing to import');
        Object.setPrototypeOf(this, ImportNothingToImportError.prototype);
    }
}
class ImportSizeError extends ImportError {
    constructor() {
        super('File is too large');
        Object.setPrototypeOf(this, ImportNothingToImportError.prototype);
    }
}
class ImportSRSError extends ImportError {
    constructor() {
        super('Invalid SRS definition');
        Object.setPrototypeOf(this, ImportNothingToImportError.prototype);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ContextImportService {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.config = config;
        /** @type {?} */
        const configFileSizeMb = this.config.getConfig('importExport.clientSideFileSizeMaxMb');
        this.clientSideFileSizeMax =
            (configFileSizeMb ? configFileSizeMb : 30) * Math.pow(1024, 2);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    import(file) {
        return this.importAsync(file);
    }
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    getFileImporter(file) {
        /** @type {?} */
        const extension = getFileExtension(file);
        /** @type {?} */
        const mimeType = file.type;
        /** @type {?} */
        const allowedMimeTypes = [...ContextImportService.allowedMimeTypes];
        /** @type {?} */
        const allowedExtensions = ContextImportService.allowedExtensions;
        if (allowedMimeTypes.indexOf(mimeType) < 0 &&
            allowedExtensions.indexOf(extension) < 0) {
            return undefined;
        }
        else if (mimeType === 'application/json' ||
            extension === ContextImportService.allowedExtensions) {
            return this.importFile;
        }
        return undefined;
    }
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    importAsync(file) {
        /** @type {?} */
        const doImport = (/**
         * @param {?} observer
         * @return {?}
         */
        (observer) => {
            if (file.size >= this.clientSideFileSizeMax) {
                observer.error(new ImportSizeError());
                return;
            }
            /** @type {?} */
            const importer = this.getFileImporter(file);
            if (importer === undefined) {
                observer.error(new ImportInvalidFileError());
                return;
            }
            importer.call(this, file, observer);
        });
        return new Observable(doImport);
    }
    /**
     * @private
     * @param {?} file
     * @param {?} observer
     * @return {?}
     */
    importFile(file, observer) {
        /** @type {?} */
        const reader = new FileReader();
        reader.onload = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            try {
                /** @type {?} */
                const context = this.parseContextFromFile(file, event.target.result);
                observer.next(context);
            }
            catch (e) {
                observer.error(new ImportUnreadableFileError());
            }
            observer.complete();
        });
        reader.onerror = (/**
         * @param {?} evt
         * @return {?}
         */
        (evt) => {
            observer.error(new ImportUnreadableFileError());
        });
        reader.readAsText(file, 'UTF-8');
    }
    /**
     * @private
     * @param {?} file
     * @param {?} data
     * @return {?}
     */
    parseContextFromFile(file, data) {
        /** @type {?} */
        const context = JSON.parse(data);
        return context;
    }
}
ContextImportService.allowedMimeTypes = ['application/json'];
ContextImportService.allowedExtensions = 'json';
ContextImportService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ContextImportService.ctorParameters = () => [
    { type: ConfigService }
];
/** @nocollapse */ ContextImportService.ngInjectableDef = defineInjectable({ factory: function ContextImportService_Factory() { return new ContextImportService(inject(ConfigService)); }, token: ContextImportService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ContextExportService {
    /**
     * @param {?} res
     * @return {?}
     */
    export(res) {
        return this.exportAsync(res);
    }
    /**
     * @protected
     * @param {?} res
     * @return {?}
     */
    exportAsync(res) {
        /** @type {?} */
        const doExport = (/**
         * @param {?} observer
         * @return {?}
         */
        (observer) => {
            /** @type {?} */
            const nothingToExport = this.nothingToExport(res);
            if (nothingToExport === true) {
                observer.error(new ExportNothingToExportError());
                return;
            }
            /** @type {?} */
            const contextJSON = JSON.stringify(res);
            downloadContent(contextJSON, 'text/json;charset=utf-8', `${res.uri}.json`);
            observer.complete();
        });
        return new Observable(doExport);
    }
    /**
     * @protected
     * @param {?} res
     * @return {?}
     */
    nothingToExport(res) {
        if (res.map === undefined) {
            return true;
        }
        return false;
    }
}
ContextExportService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */ ContextExportService.ngInjectableDef = defineInjectable({ factory: function ContextExportService_Factory() { return new ContextExportService(); }, token: ContextExportService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ContextImportExportComponent {
    /**
     * @param {?} contextImportService
     * @param {?} contextExportService
     * @param {?} languageService
     * @param {?} messageService
     * @param {?} formBuilder
     * @param {?} config
     * @param {?} contextService
     */
    constructor(contextImportService, contextExportService, languageService, messageService, formBuilder, config, contextService) {
        this.contextImportService = contextImportService;
        this.contextExportService = contextExportService;
        this.languageService = languageService;
        this.messageService = messageService;
        this.formBuilder = formBuilder;
        this.config = config;
        this.contextService = contextService;
        this.inputProj = 'EPSG:4326';
        this.loading$ = new BehaviorSubject(false);
        this.forceNaming = false;
        this.activeImportExport = 'import';
        this.buildForm();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const configFileSizeMb = this.config.getConfig('importExport.clientSideFileSizeMaxMb');
        this.clientSideFileSizeMax =
            (configFileSizeMb ? configFileSizeMb : 30) * Math.pow(1024, 2);
        this.fileSizeMb = this.clientSideFileSizeMax / Math.pow(1024, 2);
        this.layerList = this.contextService.getContextLayers(this.map);
    }
    /**
     * @param {?} files
     * @return {?}
     */
    importFiles(files) {
        this.loading$.next(true);
        for (const file of files) {
            this.contextImportService.import(file).subscribe((/**
             * @param {?} context
             * @return {?}
             */
            (context) => this.onFileImportSuccess(file, context)), (/**
             * @param {?} error
             * @return {?}
             */
            (error) => this.onFileImportError(file, error)), (/**
             * @return {?}
             */
            () => {
                this.loading$.next(false);
            }));
        }
    }
    /**
     * @param {?} contextOptions
     * @return {?}
     */
    handleExportFormSubmit(contextOptions) {
        this.loading$.next(true);
        this.res = this.contextService.getContextFromLayers(this.map, contextOptions.layers, contextOptions.name);
        this.res.imported = true;
        this.contextExportService
            .export(this.res)
            .subscribe((/**
         * @return {?}
         */
        () => { }), (/**
         * @param {?} error
         * @return {?}
         */
        (error) => this.onFileExportError(error)), (/**
         * @return {?}
         */
        () => {
            this.onFileExportSuccess();
            this.loading$.next(false);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    buildForm() {
        this.form = this.formBuilder.group({
            layers: ['', [Validators.required]],
            name: ['', [Validators.required]]
        });
    }
    /**
     * @private
     * @param {?} file
     * @param {?} context
     * @return {?}
     */
    onFileImportSuccess(file, context) {
        handleFileImportSuccess(file, context, this.messageService, this.languageService, this.contextService);
    }
    /**
     * @private
     * @param {?} file
     * @param {?} error
     * @return {?}
     */
    onFileImportError(file, error) {
        this.loading$.next(false);
        handleFileImportError(file, error, this.messageService, this.languageService, this.fileSizeMb);
    }
    /**
     * @private
     * @param {?} error
     * @return {?}
     */
    onFileExportError(error) {
        this.loading$.next(false);
        handleFileExportError(error, this.messageService, this.languageService);
    }
    /**
     * @private
     * @return {?}
     */
    onFileExportSuccess() {
        handleFileExportSuccess(this.messageService, this.languageService);
    }
    /**
     * @param {?} e
     * @return {?}
     */
    selectAll(e) {
        if (e._selected) {
            this.form.controls.layers.setValue(this.layerList);
            e._selected = true;
        }
        if (e._selected === false) {
            this.form.controls.layers.setValue([]);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onImportExportChange(event) {
        this.activeImportExport = event.value;
    }
}
ContextImportExportComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-context-import-export',
                template: "<div class=\"import-export-toggle mat-typography\">\r\n    <mat-button-toggle-group\r\n          [value]=\"activeImportExport\"\r\n          (change)=\"onImportExportChange($event)\">\r\n          <mat-button-toggle [value]=\"'import'\">\r\n            {{'igo.geo.importExportForm.importTabTitle' | translate}}\r\n          </mat-button-toggle>\r\n          <mat-button-toggle [value]=\"'export'\">\r\n            {{'igo.geo.importExportForm.exportTabTitle' | translate}}\r\n          </mat-button-toggle>\r\n    </mat-button-toggle-group>\r\n</div>\r\n\r\n<div *ngIf=\"activeImportExport === 'import'\">\r\n    <form class=\"igo-form\">\r\n        <div class=\"igo-form-button-group\">\r\n            <button mat-raised-button type=\"button\" (click)=\"fileInput.click()\" [disabled]=\"loading$ | async\">\r\n                {{'igo.geo.importExportForm.importButton' | translate}}\r\n            </button>\r\n            <igo-spinner [shown]=\"loading$ | async\"></igo-spinner>\r\n            <input\r\n                #fileInput\r\n                type=\"file\"\r\n                [style.display]=\"'none'\"\r\n                (click)=\"fileInput.value = null\"\r\n                (change)=\"importFiles($event.target.files)\">\r\n        </div>\r\n    </form>\r\n    <section class=\"mat-typography\">\r\n        <h4>{{'igo.geo.importExportForm.importClarifications' | translate}}</h4>\r\n            <ul>\r\n                <li>{{'igo.geo.importExportForm.importSizeMax' | translate: {size: fileSizeMb} }}</li>\r\n            </ul>\r\n    </section>\r\n</div>\r\n\r\n\r\n<form class=\"igo-form\" *ngIf=\"activeImportExport === 'export'\" [formGroup]=\"form\">\r\n    <div class=\"igo-input-container\">\r\n        <mat-form-field class=\"example-full-width\">\r\n            <mat-label>{{'igo.context.contextImportExport.export.exportContextName' | translate}}</mat-label>\r\n            <input formControlName=\"name\" matInput [value]=\"\">\r\n        </mat-form-field>\r\n    </div>\r\n    <div class=\"igo-input-container\">\r\n        <mat-form-field>\r\n            <mat-label>{{'igo.context.contextImportExport.export.exportPlaceHolder' | translate}}</mat-label>\r\n            <mat-select formControlName=\"layers\" multiple>\r\n                <mat-option [value]=\"1\" (click)=\"selectAll(e)\" #e>\r\n                    {{'igo.context.contextImportExport.export.exportSelectAll' | translate}}\r\n                </mat-option>\r\n                <mat-divider></mat-divider>\r\n                <mat-option *ngFor=\"let layer of layerList\" [value]=\"layer\">{{layer.title}}</mat-option>\r\n            </mat-select>\r\n        </mat-form-field>\r\n    </div>\r\n    <div class=\"igo-form-button-group\">\r\n        <button\r\n            mat-raised-button\r\n            type=\"button\"\r\n            [disabled]=\"!form.valid || (loading$ | async)\"\r\n            (click)=\"handleExportFormSubmit(form.value)\">\r\n            {{'igo.geo.importExportForm.exportButton' | translate}}\r\n        </button>\r\n        <igo-spinner [shown]=\"loading$ | async\"></igo-spinner>\r\n    </div>\r\n</form>\r\n",
                styles: [".import-export-toggle{padding:10px;text-align:center}.import-export-toggle mat-button-toggle-group{width:100%}.import-export-toggle mat-button-toggle-group mat-button-toggle{width:50%}.igo-input-container{padding:10px}.igo-input-container mat-form-field{width:100%}h4{padding:0 5px}.igo-form{padding:15px 5px}.igo-form-button-group{text-align:center;padding-top:10px}igo-spinner{position:absolute;padding-left:10px}"]
            }] }
];
/** @nocollapse */
ContextImportExportComponent.ctorParameters = () => [
    { type: ContextImportService },
    { type: ContextExportService },
    { type: LanguageService },
    { type: MessageService },
    { type: FormBuilder },
    { type: ConfigService },
    { type: ContextService }
];
ContextImportExportComponent.propDecorators = {
    map: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoContextImportExportModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoContextImportExportModule
        };
    }
}
IgoContextImportExportModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    FormsModule,
                    ReactiveFormsModule,
                    CommonModule,
                    MatButtonModule,
                    MatButtonToggleModule,
                    MatDividerModule,
                    MatTabsModule,
                    MatSelectModule,
                    MatOptionModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatCheckboxModule,
                    IgoLanguageModule,
                    IgoSpinnerModule,
                    MatTooltipModule,
                ],
                exports: [
                    ContextImportExportComponent
                ],
                declarations: [
                    ContextImportExportComponent
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
                template: "<h1 mat-dialog-title class=\"mat-typography\">{{ 'igo.context.bookmarkButton.dialog.title' |\u00A0translate }}</h1>\r\n<div mat-dialog-content class=\"mat-typography\">\r\n  <mat-form-field>\r\n    <input matInput required autocomplete=\"off\"\r\n      maxlength=\"128\"\r\n      [placeholder]=\"'igo.context.bookmarkButton.dialog.placeholder' |\u00A0translate\"\r\n      [(ngModel)]=\"title\">\r\n  </mat-form-field>\r\n</div>\r\n<div mat-dialog-actions>\r\n  <button mat-button color=\"primary\"\r\n         [disabled]=\"!title\"\r\n         (click)=\"dialogRef.close(title)\">\r\n    {{'igo.common.confirmDialog.confirmBtn' | translate}}\r\n  </button>\r\n  <button mat-button\r\n          (click)=\"dialogRef.close(false)\">\r\n    {{'igo.common.confirmDialog.cancelBtn' |\u00A0translate}}\r\n  </button>\r\n</div>\r\n"
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
        if (!this.component.view || viewContext.keepCurrentView !== true) {
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
     * @param {?} configService
     * @param {?} styleListService
     * @param {?} styleService
     * @param {?} route
     */
    constructor(component, contextService, layerService, configService, styleListService, styleService, route) {
        this.component = component;
        this.contextService = contextService;
        this.layerService = layerService;
        this.configService = configService;
        this.styleListService = styleListService;
        this.styleService = styleService;
        this.route = route;
        this.contextLayers = [];
        this.removeLayersOnContextChange = true;
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
        (context) => context !== undefined)))
            .subscribe((/**
         * @param {?} context
         * @return {?}
         */
        (context) => this.handleContextChange(context)));
        if (this.route &&
            this.route.options.visibleOnLayersKey &&
            this.route.options.visibleOffLayersKey &&
            this.route.options.contextKey) {
            /** @type {?} */
            const queryParams$$ = this.route.queryParams.subscribe((/**
             * @param {?} params
             * @return {?}
             */
            (params) => {
                if (Object.keys(params).length > 0) {
                    this.queryParams = params;
                    queryParams$$.unsubscribe();
                }
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
        if (this.removeLayersOnContextChange === true) {
            this.map.removeAllLayers();
        }
        else {
            this.map.removeLayers(this.contextLayers);
        }
        this.contextLayers = [];
        /** @type {?} */
        const layersAndIndex$ = merge(...context.layers.map((/**
         * @param {?} layerOptions
         * @param {?} index
         * @return {?}
         */
        (layerOptions, index) => {
            return this.layerService.createAsyncLayer(layerOptions);
        })));
        layersAndIndex$
            .pipe(buffer(layersAndIndex$.pipe(debounceTime(500))))
            .subscribe((/**
         * @param {?} layers
         * @return {?}
         */
        (layers) => {
            layers = layers
                .filter((/**
             * @param {?} layer
             * @return {?}
             */
            (layer) => layer !== undefined))
                .map((/**
             * @param {?} layer
             * @return {?}
             */
            (layer) => {
                layer.visible = this.computeLayerVisibilityFromUrl(layer);
                layer.zIndex = layer.zIndex;
                return layer;
            }));
            this.contextLayers.concat(layers);
            this.map.addLayers(layers);
            if (context.extraFeatures) {
                context.extraFeatures.forEach((/**
                 * @param {?} featureCollection
                 * @return {?}
                 */
                (featureCollection) => {
                    /** @type {?} */
                    const format = new GeoJSON();
                    /** @type {?} */
                    const title = featureCollection.name;
                    featureCollection = JSON.stringify(featureCollection);
                    featureCollection = format.readFeatures(featureCollection, {
                        dataProjection: 'EPSG:4326',
                        featureProjection: 'EPSG:3857'
                    });
                    if (!this.configService.getConfig('importWithStyle')) {
                        addImportedFeaturesToMap(featureCollection, this.map, title);
                    }
                    else {
                        addImportedFeaturesStyledToMap(featureCollection, this.map, title, this.styleListService, this.styleService);
                    }
                }));
            }
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
    { type: ConfigService },
    { type: StyleListService },
    { type: StyleService },
    { type: RouteService, decorators: [{ type: Optional }] }
];
LayerContextDirective.propDecorators = {
    removeLayersOnContextChange: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const ContextListControlsEnum = {
    always: 'always',
    never: 'never',
    default: 'default',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ContextListComponent {
    /**
     * @param {?} cdRef
     * @param {?} contextService
     * @param {?} auth
     * @param {?} dialog
     * @param {?} languageService
     * @param {?} storageService
     */
    constructor(cdRef, contextService, auth, dialog, languageService, storageService) {
        this.cdRef = cdRef;
        this.contextService = contextService;
        this.auth = auth;
        this.dialog = dialog;
        this.languageService = languageService;
        this.storageService = storageService;
        this.contextsInitial = { ours: [] };
        this.contexts$ = new BehaviorSubject(this.contextsInitial);
        this.change$ = new ReplaySubject(1);
        this._contexts = { ours: [] };
        this.collapsed = [];
        this.select = new EventEmitter();
        this.unselect = new EventEmitter();
        this.edit = new EventEmitter();
        this.delete = new EventEmitter();
        this.save = new EventEmitter();
        this.clone = new EventEmitter();
        this.create = new EventEmitter();
        this.hide = new EventEmitter();
        this.show = new EventEmitter();
        this.showHiddenContexts = new EventEmitter();
        this.favorite = new EventEmitter();
        this.managePermissions = new EventEmitter();
        this.manageTools = new EventEmitter();
        this.filterPermissionsChanged = new EventEmitter();
        this.titleMapping = {
            ours: 'igo.context.contextManager.ourContexts',
            shared: 'igo.context.contextManager.sharedContexts',
            public: 'igo.context.contextManager.publicContexts'
        };
        this.permissions = [];
        this.actionStore = new ActionStore([]);
        this.actionbarMode = ActionbarMode.Overlay;
        this.color = 'primary';
        this.showHidden = false;
        this._term = '';
        this._sortedAlpha = undefined;
        this.showContextFilter = ContextListControlsEnum.always;
        this.thresholdToFilter = 5;
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
        this.cdRef.detectChanges();
        this.next();
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
    /**
     * Context filter term
     * @param {?} value
     * @return {?}
     */
    set term(value) {
        this._term = value;
        this.next();
    }
    /**
     * @return {?}
     */
    get term() {
        return this._term;
    }
    /**
     * @return {?}
     */
    get sortedAlpha() {
        return this._sortedAlpha;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set sortedAlpha(value) {
        this._sortedAlpha = value;
        this.next();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.change$$ = this.change$
            .pipe(debounce((/**
         * @return {?}
         */
        () => {
            return this.contexts.ours.length === 0 ? EMPTY : timer(50);
        })))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.contexts$.next(this.filterContextsList(this.contexts));
        }));
        this.actionStore.load([
            {
                id: 'emptyContext',
                title: this.languageService.translate.instant('igo.context.contextManager.emptyContext'),
                icon: 'map-outline',
                tooltip: this.languageService.translate.instant('igo.context.contextManager.emptyContextTooltip'),
                handler: (/**
                 * @return {?}
                 */
                () => {
                    this.createContext(true);
                })
            },
            {
                id: 'contextFromMap',
                title: this.languageService.translate.instant('igo.context.contextManager.contextMap'),
                icon: 'map-check',
                tooltip: this.languageService.translate.instant('igo.context.contextManager.contextMapTooltip'),
                handler: (/**
                 * @return {?}
                 */
                () => {
                    this.createContext(false);
                })
            }
        ]);
    }
    /**
     * @private
     * @return {?}
     */
    next() {
        this.change$.next();
    }
    /**
     * @private
     * @param {?} contexts
     * @return {?}
     */
    filterContextsList(contexts) {
        if (this.term === '') {
            if (this.sortedAlpha) {
                contexts = this.sortContextsList(contexts);
            }
            return contexts;
        }
        else {
            /** @type {?} */
            const ours = contexts.ours.filter((/**
             * @param {?} context
             * @return {?}
             */
            (context) => {
                /** @type {?} */
                const filterNormalized = this.term
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '');
                /** @type {?} */
                const contextTitleNormalized = context.title
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '');
                return contextTitleNormalized.includes(filterNormalized);
            }));
            /** @type {?} */
            let updateContexts = {
                ours
            };
            if (this.contexts.public) {
                /** @type {?} */
                const publics = contexts.public.filter((/**
                 * @param {?} context
                 * @return {?}
                 */
                (context) => {
                    /** @type {?} */
                    const filterNormalized = this.term
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '');
                    /** @type {?} */
                    const contextTitleNormalized = context.title
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '');
                    return contextTitleNormalized.includes(filterNormalized);
                }));
                updateContexts.public = publics;
            }
            if (this.contexts.shared) {
                /** @type {?} */
                const shared = contexts.shared.filter((/**
                 * @param {?} context
                 * @return {?}
                 */
                (context) => {
                    /** @type {?} */
                    const filterNormalized = this.term
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '');
                    /** @type {?} */
                    const contextTitleNormalized = context.title
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '');
                    return contextTitleNormalized.includes(filterNormalized);
                }));
                updateContexts.shared = shared;
            }
            if (this.sortedAlpha) {
                updateContexts = this.sortContextsList(updateContexts);
            }
            return updateContexts;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.change$$.unsubscribe();
    }
    /**
     * @return {?}
     */
    showFilter() {
        switch (this.showContextFilter) {
            case ContextListControlsEnum.always:
                return true;
            case ContextListControlsEnum.never:
                return false;
            default:
                /** @type {?} */
                let totalLength = this.contexts.ours.length;
                this.contexts.public
                    ? (totalLength += this.contexts.public.length)
                    : (totalLength += 0);
                this.contexts.shared
                    ? (totalLength += this.contexts.shared.length)
                    : (totalLength += 0);
                if (totalLength >= this.thresholdToFilter) {
                    return true;
                }
                return false;
        }
    }
    /**
     * @param {?} contexts
     * @return {?}
     */
    sortContextsList(contexts) {
        if (contexts) {
            /** @type {?} */
            const contextsList = JSON.parse(JSON.stringify(contexts));
            contextsList.ours.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            (a, b) => {
                if (this.normalize(a.title) < this.normalize(b.title)) {
                    return -1;
                }
                if (this.normalize(a.title) > this.normalize(b.title)) {
                    return 1;
                }
                return 0;
            }));
            if (contextsList.shared) {
                contextsList.shared.sort((/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                (a, b) => {
                    if (this.normalize(a.title) < this.normalize(b.title)) {
                        return -1;
                    }
                    if (this.normalize(a.title) > this.normalize(b.title)) {
                        return 1;
                    }
                    return 0;
                }));
            }
            else if (contextsList.public) {
                contextsList.public.sort((/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                (a, b) => {
                    if (this.normalize(a.title) < this.normalize(b.title)) {
                        return -1;
                    }
                    if (this.normalize(a.title) > this.normalize(b.title)) {
                        return 1;
                    }
                    return 0;
                }));
            }
            return contextsList;
        }
    }
    /**
     * @param {?} str
     * @return {?}
     */
    normalize(str) {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
    }
    /**
     * @param {?} sortAlpha
     * @return {?}
     */
    toggleSort(sortAlpha) {
        this.sortedAlpha = sortAlpha;
    }
    /**
     * @return {?}
     */
    clearFilter() {
        this.term = '';
    }
    /**
     * @param {?=} empty
     * @return {?}
     */
    createContext(empty) {
        this.dialog
            .open(BookmarkDialogComponent, { disableClose: false })
            .afterClosed()
            .subscribe((/**
         * @param {?} title
         * @return {?}
         */
        (title) => {
            if (title) {
                this.create.emit({ title, empty });
            }
        }));
    }
    /**
     * @param {?=} user
     * @return {?}
     */
    getPermission(user) {
        if (user) {
            /** @type {?} */
            const permission = this.permissions.find((/**
             * @param {?} p
             * @return {?}
             */
            (p) => p.name === user.name));
            return permission;
        }
    }
    /**
     * @param {?} user
     * @param {?=} parent
     * @return {?}
     */
    userSelection(user, parent) {
        /** @type {?} */
        const permission = this.getPermission(user);
        if (permission) {
            permission.checked = !permission.checked;
            this.storageService.set('contexts.permissions.' + permission.name, permission.checked);
            permission.indeterminate = false;
        }
        if (parent) {
            /** @type {?} */
            let indeterminate = false;
            for (const c of parent.childs) {
                /** @type {?} */
                const cPermission = this.getPermission(c);
                if (cPermission.checked !== permission.checked) {
                    indeterminate = true;
                    break;
                }
            }
            /** @type {?} */
            const parentPermission = this.getPermission(parent);
            if (parentPermission) {
                parentPermission.checked = permission.checked;
                this.storageService.set('contexts.permissions.' + parentPermission.name, permission.checked);
                parentPermission.indeterminate = indeterminate;
            }
        }
        if (user.childs) {
            for (const c of user.childs) {
                /** @type {?} */
                const childrenPermission = this.getPermission(c);
                if (childrenPermission &&
                    childrenPermission.checked !== permission.checked) {
                    childrenPermission.checked = permission.checked;
                    this.storageService.set('contexts.permissions.' + childrenPermission.name, permission.checked);
                }
            }
        }
        this.filterPermissionsChanged.emit(this.permissions);
    }
    /**
     * @param {?} context
     * @return {?}
     */
    hideContext(context) {
        context.hidden = true;
        if (!this.showHidden) {
            /** @type {?} */
            const contexts = { ours: [], shared: [], public: [] };
            contexts.ours = this.contexts.ours.filter((/**
             * @param {?} c
             * @return {?}
             */
            (c) => c.id !== context.id));
            contexts.shared = this.contexts.shared.filter((/**
             * @param {?} c
             * @return {?}
             */
            (c) => c.id !== context.id));
            contexts.public = this.contexts.public.filter((/**
             * @param {?} c
             * @return {?}
             */
            (c) => c.id !== context.id));
            this.contexts = contexts;
        }
        this.hide.emit(context);
    }
    /**
     * @param {?} context
     * @return {?}
     */
    showContext(context) {
        context.hidden = false;
        this.show.emit(context);
    }
}
ContextListComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-context-list',
                template: "<igo-list [navigation]=\"true\">\r\n  <mat-form-field *ngIf=\"showFilter()\" [ngClass]=\"auth.authenticated ? 'context-filter-min-width' : 'context-filter-max-width'\">\r\n    <input\r\n      matInput\r\n      type=\"text\"\r\n      [placeholder]=\"'igo.context.contextManager.filterPlaceHolder' | translate\"\r\n      [(ngModel)]=\"term\">\r\n    <button\r\n      mat-button\r\n      mat-icon-button\r\n      matSuffix\r\n      class=\"clear-button\"\r\n      *ngIf=\"term.length\"\r\n      aria-label=\"Clear\"\r\n      color=\"warn\"\r\n      (click)=\"clearFilter()\">\r\n      <mat-icon svgIcon=\"close\"></mat-icon>\r\n    </button>\r\n  </mat-form-field>\r\n\r\n  <button\r\n  *ngIf=\"!sortedAlpha\"\r\n  mat-icon-button\r\n  [matTooltip]=\"'igo.context.contextManager.sortAlphabetically' | translate\"\r\n  matTooltipShowDelay=\"500\"\r\n  (click)=\"toggleSort(true)\">\r\n  <mat-icon color=\"primary\" svgIcon=\"sort-alphabetical\"></mat-icon>\r\n  </button>\r\n  <button\r\n    *ngIf=\"sortedAlpha\"\r\n    mat-icon-button\r\n    [matTooltip]=\"'igo.context.contextManager.sortContextOrder' | translate\"\r\n    matTooltipShowDelay=\"500\"\r\n    (click)=\"toggleSort(false)\">\r\n    <mat-icon color=\"warn\" svgIcon=\"sort-variant-remove\"></mat-icon>\r\n  </button>\r\n\r\n  <igo-actionbar *ngIf=\"auth.authenticated\"\r\n    class=\"add-context-button\"\r\n    [iconColor]=\"color\"\r\n    [store]=\"actionStore\"\r\n    [withIcon]=\"true\"\r\n    icon=\"plus\"\r\n    [withTitle]=\"actionbarMode === 'overlay'\"\r\n    [horizontal]=\"false\"\r\n    [mode]=\"actionbarMode\">\r\n  </igo-actionbar>\r\n\r\n  <button *ngIf=\"auth.authenticated && users && users.length\"\r\n    mat-icon-button\r\n    [matTooltip]=\"'igo.context.contextManager.filterUser' | translate\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matMenuTriggerFor]=\"accountMenu\">\r\n    <mat-icon color=\"primary\" svgIcon=\"filter-menu\"></mat-icon>\r\n  </button>\r\n\r\n  <mat-menu #accountMenu=\"matMenu\">\r\n    <ng-container *ngFor=\"let user of users\">\r\n      <span class=\"profilsMenu\">\r\n        <mat-checkbox\r\n          class=\"mat-menu-item\"\r\n          [checked]=\"getPermission(user).checked\"\r\n          [indeterminate]=\"getPermission(user).indeterminate\"\r\n          (click)=\"$event.stopPropagation()\"\r\n          (change)=\"userSelection(user)\">\r\n        </mat-checkbox>\r\n        <button *ngIf=\"user.childs\"\r\n          [matMenuTriggerFor]=\"subAccountMenu\"\r\n          mat-menu-item>\r\n          {{user.title}}\r\n        </button>\r\n        <button\r\n          mat-menu-item\r\n          *ngIf=\"!user.childs\">\r\n          {{user.title}}\r\n        </button>\r\n      </span>\r\n\r\n      <mat-menu #subAccountMenu=\"matMenu\">\r\n        <mat-checkbox *ngFor=\"let child of user.childs\"\r\n          class=\"mat-menu-item\"\r\n          [checked]=\"getPermission(child).checked\"\r\n          (click)=\"$event.stopPropagation()\"\r\n          (change)=\"userSelection(child, user)\">\r\n          {{child.title}}\r\n        </mat-checkbox>\r\n      </mat-menu>\r\n    </ng-container>\r\n\r\n    <span class=\"profilsMenu\">\r\n      <mat-checkbox\r\n        class=\"mat-menu-item\"\r\n        [checked]=\"showHidden\"\r\n        (click)=\"$event.stopPropagation()\"\r\n        (change)=\"showHiddenContexts.emit()\">\r\n      </mat-checkbox>\r\n      <button mat-menu-item>\r\n        {{ 'igo.context.contextManager.showHidden' | translate }}\r\n      </button>\r\n    </span>\r\n  </mat-menu>\r\n\r\n  <ng-template ngFor let-groupContexts [ngForOf]=\"contexts$ | async | keyvalue\">\r\n\r\n    <igo-collapsible *ngIf=\"groupContexts.value.length && auth.authenticated\" [title]=\"titleMapping[groupContexts.key] | translate\"\r\n      [collapsed]=\"collapsed[titleMapping[groupContexts.key]]\" (toggle)=\"collapsed[titleMapping[groupContexts.key]] = $event\">\r\n\r\n      <ng-template ngFor let-context [ngForOf]=\"groupContexts.value\">\r\n        <igo-context-item\r\n          igoListItem\r\n          color=\"accent\"\r\n          [selected]=\"selectedContext && selectedContext.uri === context.uri\"\r\n          [context]=\"context\"\r\n          [default]=\"context.id && this.defaultContextId && this.defaultContextId === context.id\"\r\n          (edit)=\"edit.emit(context)\"\r\n          (delete)=\"delete.emit(context)\"\r\n          (clone)=\"clone.emit(context)\"\r\n          (save)=\"save.emit(context)\"\r\n          (hide)=\"hideContext(context)\"\r\n          (show)=\"showContext(context)\"\r\n          (favorite)=\"favorite.emit(context)\"\r\n          (manageTools)=\"manageTools.emit(context)\"\r\n          (managePermissions)=\"managePermissions.emit(context)\"\r\n          (select)=\"select.emit(context)\"\r\n          (unselect)=\"unselect.emit(context)\">\r\n        </igo-context-item>\r\n      </ng-template>\r\n\r\n    </igo-collapsible>\r\n\r\n    <ng-template *ngIf=\"groupContexts.value.length && !auth.authenticated\" ngFor let-context [ngForOf]=\"groupContexts.value\">\r\n      <igo-context-item\r\n        igoListItem\r\n        color=\"accent\"\r\n        [selected]=\"selectedContext && selectedContext.uri === context.uri\"\r\n        [context]=\"context\"\r\n        [default]=\"this.defaultContextId === context.id\"\r\n        (select)=\"select.emit(context)\"\r\n        (unselect)=\"unselect.emit(context)\">\r\n      </igo-context-item>\r\n    </ng-template>\r\n\r\n  </ng-template>\r\n</igo-list>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".context-filter-max-width{width:calc(100% - 100px);margin:5px;padding-left:6px}.context-filter-min-width{width:calc(100% - 135px);margin:5px;padding-left:6px}.clear-button{padding-right:5px}mat-form-field{height:40px}.profilsMenu{display:-webkit-box;display:flex}.profilsMenu>mat-checkbox{width:8px}.add-context-button{margin:0;width:40px;display:-webkit-inline-box;display:inline-flex}"]
            }] }
];
/** @nocollapse */
ContextListComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ContextService },
    { type: AuthService },
    { type: MatDialog },
    { type: LanguageService },
    { type: StorageService }
];
ContextListComponent.propDecorators = {
    contexts: [{ type: Input }],
    selectedContext: [{ type: Input }],
    map: [{ type: Input }],
    defaultContextId: [{ type: Input }],
    select: [{ type: Output }],
    unselect: [{ type: Output }],
    edit: [{ type: Output }],
    delete: [{ type: Output }],
    save: [{ type: Output }],
    clone: [{ type: Output }],
    create: [{ type: Output }],
    hide: [{ type: Output }],
    show: [{ type: Output }],
    showHiddenContexts: [{ type: Output }],
    favorite: [{ type: Output }],
    managePermissions: [{ type: Output }],
    manageTools: [{ type: Output }],
    filterPermissionsChanged: [{ type: Output }],
    term: [{ type: Input }]
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
     * @param {?} auth
     * @param {?} storageService
     */
    constructor(component, contextService, mapService, languageService, confirmDialogService, messageService, auth, storageService) {
        this.contextService = contextService;
        this.mapService = mapService;
        this.languageService = languageService;
        this.confirmDialogService = confirmDialogService;
        this.messageService = messageService;
        this.auth = auth;
        this.storageService = storageService;
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
        const msgSuccess = (/**
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
        });
        if (context.imported) {
            contextFromMap.title = context.title;
            this.contextService.delete(context.id, true);
            this.contextService.create(contextFromMap).subscribe((/**
             * @param {?} contextCreated
             * @return {?}
             */
            (contextCreated) => {
                this.contextService.loadContext(contextCreated.uri);
                msgSuccess();
            }));
            return;
        }
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
            msgSuccess();
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
        (confirm) => {
            if (confirm) {
                this.contextService
                    .delete(context.id, context.imported)
                    .subscribe((/**
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
     * @param {?} opts
     * @return {?}
     */
    onCreate(opts) {
        const { title, empty } = opts;
        /** @type {?} */
        const context = this.contextService.getContextFromMap(this.component.map, empty);
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
            this.contextService.loadContext(context.uri);
        }));
    }
    /**
     * @return {?}
     */
    loadContexts() {
        /** @type {?} */
        const permissions = ['none'];
        for (const p of this.component.permissions) {
            if (p.checked === true || p.indeterminate === true) {
                permissions.push(p.name);
            }
        }
        this.component.showHidden
            ? this.contextService.loadContexts(permissions, true)
            : this.contextService.loadContexts(permissions, false);
    }
    /**
     * @return {?}
     */
    showHiddenContexts() {
        this.component.showHidden = !this.component.showHidden;
        this.storageService.set('contexts.showHidden', this.component.showHidden);
        this.loadContexts();
    }
    /**
     * @param {?} context
     * @return {?}
     */
    onShowContext(context) {
        this.contextService.showContext(context.id).subscribe();
    }
    /**
     * @param {?} context
     * @return {?}
     */
    onHideContext(context) {
        this.contextService.hideContext(context.id).subscribe();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Override input contexts
        this.component.contexts = { ours: [] };
        this.component.showHidden = (/** @type {?} */ (this.storageService.get('contexts.showHidden')));
        this.contexts$$ = this.contextService.contexts$.subscribe((/**
         * @param {?} contexts
         * @return {?}
         */
        (contexts) => this.handleContextsChange(contexts)));
        this.defaultContextId$$ = this.contextService.defaultContextId$.subscribe((/**
         * @param {?} id
         * @return {?}
         */
        (id) => {
            this.component.defaultContextId = id;
        }));
        // See feature-list.component for an explanation about the debounce time
        this.selectedContext$$ = this.contextService.context$
            .pipe(debounceTime(100))
            .subscribe((/**
         * @param {?} context
         * @return {?}
         */
        (context) => (this.component.selectedContext = context)));
        this.auth.authenticate$.subscribe((/**
         * @param {?} authenticate
         * @return {?}
         */
        (authenticate) => {
            if (authenticate) {
                this.contextService.getProfilByUser().subscribe((/**
                 * @param {?} profils
                 * @return {?}
                 */
                (profils) => {
                    this.component.users = profils;
                    this.component.permissions = [];
                    /** @type {?} */
                    const profilsAcc = this.component.users.reduce((/**
                     * @param {?} acc
                     * @param {?} cur
                     * @return {?}
                     */
                    (acc, cur) => {
                        acc = acc.concat(cur);
                        acc = cur.childs ? acc.concat(cur.childs) : acc;
                        return acc;
                    }), []);
                    for (const user of profilsAcc) {
                        /** @type {?} */
                        const permission = {
                            name: user.name,
                            checked: (/** @type {?} */ (this.storageService.get('contexts.permissions.' + user.name)))
                        };
                        this.component.permissions.push(permission);
                    }
                    /** @type {?} */
                    const permissions = ['none'];
                    for (const p of this.component.permissions) {
                        if (p.checked === true || p.indeterminate === true) {
                            permissions.push(p.name);
                        }
                    }
                    this.component.showHidden
                        ? this.contextService.loadContexts(permissions, true)
                        : this.contextService.loadContexts(permissions, false);
                }));
            }
        }));
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
    { type: MessageService },
    { type: AuthService },
    { type: StorageService }
];
ContextListBindingDirective.propDecorators = {
    onSelect: [{ type: HostListener, args: ['select', ['$event'],] }],
    onEdit: [{ type: HostListener, args: ['edit', ['$event'],] }],
    onSave: [{ type: HostListener, args: ['save', ['$event'],] }],
    onFavorite: [{ type: HostListener, args: ['favorite', ['$event'],] }],
    onManageTools: [{ type: HostListener, args: ['manageTools', ['$event'],] }],
    onManagePermissions: [{ type: HostListener, args: ['managePermissions', ['$event'],] }],
    onDelete: [{ type: HostListener, args: ['delete', ['$event'],] }],
    onClone: [{ type: HostListener, args: ['clone', ['$event'],] }],
    onCreate: [{ type: HostListener, args: ['create', ['$event'],] }],
    loadContexts: [{ type: HostListener, args: ['filterPermissionsChanged',] }],
    showHiddenContexts: [{ type: HostListener, args: ['showHiddenContexts',] }],
    onShowContext: [{ type: HostListener, args: ['show', ['$event'],] }],
    onHideContext: [{ type: HostListener, args: ['hide', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ContextItemComponent {
    /**
     * @param {?} auth
     * @param {?} storageService
     */
    constructor(auth, storageService) {
        this.auth = auth;
        this.storageService = storageService;
        this.typePermission = TypePermission;
        this.color = 'primary';
        this.collapsed = true;
        this._default = false;
        this.edit = new EventEmitter();
        this.delete = new EventEmitter();
        this.save = new EventEmitter();
        this.clone = new EventEmitter();
        this.hide = new EventEmitter();
        this.show = new EventEmitter();
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
     * @return {?}
     */
    get hidden() {
        return this.context.hidden;
    }
    /**
     * @return {?}
     */
    get canShare() {
        return this.storageService.get('canShare') === true;
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
                template: "<mat-list-item\r\n  class=\"mat-list-item\"\r\n  [ngClass]=\"{'mat-list-item-light': hidden}\">\r\n  <button mat-list-avatar\r\n    *ngIf=\"auth.authenticated\"\r\n    mat-icon-button\r\n    igoStopPropagation\r\n    [matTooltip]=\"auth.authenticated ? ('igo.context.contextManager.favorite' | translate) : ''\"\r\n    matTooltipShowDelay=\"500\"\r\n    [color]=\"default ? 'primary' : 'default'\"\r\n    (click)=\"favoriteClick(context)\">\r\n    <mat-icon *ngIf=\"!context.iconImage\" svgIcon=\"{{context.icon ? context.icon : context.scope === 'public' ? 'earth' : 'star'}}\"></mat-icon>\r\n    <img *ngIf=\"context.iconImage\" [src]=\"context.iconImage\">\r\n  </button>\r\n  <h4 matLine>{{context.title}}</h4>\r\n\r\n  <div *ngIf=\"auth.authenticated\"\r\n       igoStopPropagation\r\n       class=\"igo-actions-container\">\r\n\r\n     <button *ngIf=\"collapsed && selected && (context.permission === typePermission[typePermission.write] || context.imported)\"\r\n       mat-icon-button\r\n       [matTooltip]=\"'igo.context.contextManager.save' | translate\"\r\n       matTooltipShowDelay=\"500\"\r\n       [color]=\"color\"\r\n       (click)=\"save.emit(context)\">\r\n       <mat-icon svgIcon=\"content-save\"></mat-icon>\r\n     </button>\r\n\r\n    <div #actions class=\"igo-actions-expand-container\">\r\n\r\n      <button *ngIf=\"canShare && !context.imported\"\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.context.contextManager.managePermissions' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        [color]=\"color\"\r\n        (click)=\"managePermissions.emit(context)\">\r\n        <mat-icon svgIcon=\"account-arrow-right\"></mat-icon>\r\n      </button>\r\n\r\n      <!--button\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.context.contextManager.manageTools' | translate\"\r\n        [color]=\"color\"\r\n        (click)=\"manageTools.emit(context)\">\r\n        <mat-icon svgIcon=\"widgets\"></mat-icon>\r\n      </button-->\r\n\r\n      <button *ngIf=\"!context.imported\"\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.context.contextManager.clone' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        [color]=\"color\"\r\n        (click)=\"clone.emit(context)\">\r\n        <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n      </button>\r\n\r\n      <button *ngIf=\"context.permission === typePermission[typePermission.write] && !context.imported\"\r\n        mat-icon-button\r\n        [color]=\"color\"\r\n        [matTooltip]=\"'igo.context.contextManager.edit' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"edit.emit(context)\">\r\n        <mat-icon svgIcon=\"pencil\"></mat-icon>\r\n      </button>\r\n\r\n      <button *ngIf=\"!context.hidden && !context.imported\"\r\n        mat-icon-button\r\n        [color]=\"color\"\r\n        [matTooltip]=\"'igo.context.contextManager.hide' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"hide.emit(context)\">\r\n        <mat-icon svgIcon=\"eye\"></mat-icon>\r\n      </button>\r\n\r\n      <button *ngIf=\"context.hidden && !context.imported\"\r\n        mat-icon-button\r\n        [color]=\"color\"\r\n        [matTooltip]=\"'igo.context.contextManager.show' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"show.emit(context)\">\r\n        <mat-icon svgIcon=\"eye-off\"></mat-icon>\r\n      </button>\r\n\r\n      <button *ngIf=\"context.permission === typePermission[typePermission.write] || context.imported\"\r\n        mat-icon-button\r\n        color=\"warn\"\r\n        [matTooltip]=\"'igo.context.contextManager.delete' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"delete.emit(context)\">\r\n        <mat-icon svgIcon=\"delete\"></mat-icon>\r\n      </button>\r\n    </div>\r\n\r\n    <button\r\n      mat-icon-button\r\n      igoCollapse\r\n      [color]=\"color\"\r\n      [target]=\"actions\"\r\n      [collapsed]=collapsed\r\n      (click)=\"collapsed = !collapsed\">\r\n      <mat-icon svgIcon=\"dots-horizontal\"></mat-icon>\r\n    </button>\r\n\r\n  </div>\r\n\r\n</mat-list-item>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{overflow:hidden}.igo-actions-container{flex-shrink:0}.igo-actions-expand-container{display:-webkit-inline-box;display:inline-flex}mat-list-item>>>.mat-list-item-content .mat-list-text{padding:0}mat-icon.disabled{color:rgba(0,0,0,.38)}mat-list-item.mat-list-item-light>>>.mat-list-item-content{color:#969696}"]
            }] }
];
/** @nocollapse */
ContextItemComponent.ctorParameters = () => [
    { type: AuthService },
    { type: StorageService }
];
ContextItemComponent.propDecorators = {
    context: [{ type: Input }],
    default: [{ type: Input }],
    selected: [{ type: Input }],
    edit: [{ type: Output }],
    delete: [{ type: Output }],
    save: [{ type: Output }],
    clone: [{ type: Output }],
    hide: [{ type: Output }],
    show: [{ type: Output }],
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
     * @param {?} languageService
     * @param {?} messageService
     */
    constructor(formBuilder, languageService, messageService) {
        this.formBuilder = formBuilder;
        this.languageService = languageService;
        this.messageService = messageService;
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
     * @return {?}
     */
    copyTextToClipboard() {
        /** @type {?} */
        const text = this.prefix + '-' + this.form.value.uri.replace(' ', '');
        /** @type {?} */
        const successful = Clipboard.copy(text);
        if (successful) {
            /** @type {?} */
            const translate = this.languageService.translate;
            /** @type {?} */
            const title = translate.instant('igo.context.contextManager.dialog.copyTitle');
            /** @type {?} */
            const msg = translate.instant('igo.context.contextManager.dialog.copyMsg');
            this.messageService.success(msg, title);
        }
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
                template: "<form class=\"igo-form\" [formGroup]=\"form\"\r\n  (ngSubmit)=\"handleFormSubmit(form.value)\">\r\n\r\n  <mat-form-field class=\"full-width\">\r\n    <input matInput required\r\n           maxlength=\"128\"\r\n           [placeholder]=\"'igo.context.contextManager.form.title' | translate\"\r\n           formControlName=\"title\">\r\n   <mat-error>\r\n    {{ 'igo.context.contextManager.form.titleRequired' | translate }}\r\n   </mat-error>\r\n  </mat-form-field>\r\n\r\n  <mat-form-field id=\"uriInput\" class=\"full-width\">\r\n    <span *ngIf=\"prefix\" class=\"prefix\">{{prefix}}-</span>\r\n    <span class=\"fieldWrapper\">\r\n      <input matInput\r\n           maxlength=\"64\"\r\n           floatLabel = \"always\"\r\n           [placeholder]=\"'igo.context.contextManager.form.uri' | translate\"\r\n           formControlName=\"uri\">\r\n    </span>\r\n  </mat-form-field>\r\n\r\n  <button\r\n    id=\"copyButton\"\r\n    type=\"button\"\r\n    mat-icon-button\r\n    tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"'igo.context.contextManager.form.copy' | translate\"\r\n    color=\"primary\"\r\n    (click)=\"copyTextToClipboard()\">\r\n    <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n  </button>\r\n\r\n  <div class=\"igo-form-button-group\">\r\n    <button\r\n      mat-raised-button\r\n      type=\"submit\"\r\n      [disabled]=\"!form.valid || disabled\">\r\n      {{ 'igo.context.contextManager.form.edit' | translate }}\r\n    </button>\r\n  </div>\r\n\r\n</form>\r\n",
                styles: ["form{margin:10px}.full-width{width:100%}#uriInput .fieldWrapper{display:block;overflow:hidden}#uriInput .prefix{float:left}#copyButton{width:24px;float:right;position:relative;top:-58px;left:5px}"]
            }] }
];
/** @nocollapse */
ContextFormComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: LanguageService },
    { type: MessageService }
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
        this.submitSuccessed = new EventEmitter();
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
            this.contextService.setEditedContext(undefined);
            this.submitSuccessed.emit(context);
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
    submitSuccessed: [{ type: Output }],
    onEdit: [{ type: HostListener, args: ['submitForm', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ContextPermissionsComponent {
    /**
     * @param {?} formBuilder
     * @param {?} cd
     * @param {?} http
     * @param {?} authService
     */
    constructor(formBuilder, cd, http, authService) {
        this.formBuilder = formBuilder;
        this.cd = cd;
        this.http = http;
        this.authService = authService;
        this._profils = [];
        this.baseUrlProfils = '/apis/igo2/profils-users?';
        this.formControl = new FormControl();
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
        this.cd.detectChanges();
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
        this.cd.detectChanges();
    }
    /**
     * @return {?}
     */
    get profils() {
        return this._profils;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set profils(value) {
        this._profils = value;
        this.cd.detectChanges();
    }
    /**
     * @return {?}
     */
    get canWrite() {
        return this.context.permission === TypePermission[TypePermission.write];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.buildForm();
        this.formValueChanges$$ = this.formControl.valueChanges.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            if (value.length) {
                this.http.get(this.baseUrlProfils + 'q=' + value).subscribe((/**
                 * @param {?} profils
                 * @return {?}
                 */
                profils => {
                    this.profils = (/** @type {?} */ (profils));
                }));
                this.profils.filter((/**
                 * @param {?} profil
                 * @return {?}
                 */
                (profil) => {
                    /** @type {?} */
                    const filterNormalized = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    /** @type {?} */
                    const profilTitleNormalized = profil.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    /** @type {?} */
                    const profilNameNormalized = profil.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    /** @type {?} */
                    const profilNormalized = profilNameNormalized + profilTitleNormalized;
                    return profilNormalized.includes(filterNormalized);
                }));
            }
            else {
                this.profils = [];
            }
        }));
    }
    /**
     * @param {?=} profil
     * @return {?}
     */
    displayFn(profil) {
        return profil ? profil.title : undefined;
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
    /**
     * @param {?} value
     * @return {?}
     */
    onProfilSelected(value) {
        this.form.setValue({
            profil: value.name,
            typePermission: this.form.value.typePermission
        });
    }
}
ContextPermissionsComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-context-permissions',
                template: "<div *ngIf=\"context\">\r\n\r\n  <div *ngIf=\"!canWrite\" class=\"scopeForm\">\r\n    <h4>{{ 'igo.context.permission.readOnlyTitle' | translate }}</h4>\r\n    <p>{{ 'igo.context.permission.readOnlyMsg' | translate }}</p>\r\n  </div>\r\n\r\n  <div *ngIf=\"canWrite\" class=\"scopeForm\">\r\n    <mat-radio-group [(ngModel)]=\"context.scope\"\r\n                    (change)=\"scopeChanged.emit(context)\">\r\n      <mat-radio-button value=\"private\">\r\n        {{ 'igo.context.permission.scope.private' | translate }}\r\n      </mat-radio-button>\r\n      <mat-radio-button value=\"protected\">\r\n        {{ 'igo.context.permission.scope.shared' | translate }}\r\n      </mat-radio-button>\r\n      <mat-radio-button *ngIf=\"authService.isAdmin\" value=\"public\">\r\n        {{ 'igo.context.permission.scope.public' | translate }}\r\n      </mat-radio-button>\r\n    </mat-radio-group>\r\n  </div>\r\n\r\n  <form *ngIf=\"context.scope !== 'private' && canWrite\" [formGroup]=\"form\"\r\n    (ngSubmit)=\"handleFormSubmit(form.value)\">\r\n\r\n    <mat-form-field class=\"full-width\">\r\n      <input matInput required\r\n             [placeholder]=\"'igo.context.permission.user' | translate\"\r\n             [formControl]=\"formControl\"\r\n             [matAutocomplete]=\"auto\">\r\n      <mat-autocomplete #auto=\"matAutocomplete\" (optionSelected)=\"onProfilSelected($event.option.value)\"\r\n        [displayWith]=\"displayFn\">\r\n          <mat-option *ngFor=\"let profil of this.profils\" [value]=\"profil\">\r\n              {{profil.title}}<br>\r\n              <small class=\"mat-typography\">{{profil.name}}</small>\r\n          </mat-option>\r\n      </mat-autocomplete>\r\n     <mat-error>\r\n       {{ 'igo.context.permission.profilRequired' | translate }}\r\n     </mat-error>\r\n    </mat-form-field>\r\n\r\n\r\n    <mat-radio-group formControlName=\"typePermission\">\r\n      <mat-radio-button value=\"read\">\r\n        {{ 'igo.context.permission.read' | translate }}\r\n      </mat-radio-button>\r\n      <mat-radio-button value=\"write\">\r\n        {{ 'igo.context.permission.write' | translate }}\r\n      </mat-radio-button>\r\n    </mat-radio-group>\r\n\r\n\r\n    <div class=\"igo-form-button-group\">\r\n      <button\r\n        mat-raised-button\r\n        type=\"submit\"\r\n        [disabled]=\"!form.valid\">\r\n        {{ 'igo.context.permission.addBtn' | translate }}\r\n      </button>\r\n    </div>\r\n\r\n  </form>\r\n\r\n  <igo-list *ngIf=\"permissions && context.scope !== 'private'\">\r\n    <ng-template ngFor let-groupPermissions [ngForOf]=\"permissions | keyvalue\">\r\n      <igo-collapsible\r\n        *ngIf=\"groupPermissions.value.length\"\r\n        [title]=\"'igo.context.permission.' + groupPermissions.key | translate\">\r\n\r\n        <ng-template ngFor let-permission [ngForOf]=\"groupPermissions.value\">\r\n          <mat-list-item>\r\n            <mat-icon mat-list-avatar svgIcon=\"account-outline\"></mat-icon>\r\n            <h4 mat-line>{{permission.profilTitle}} <small class=\"mat-typography\">{{permission.profil}}</small></h4>\r\n\r\n            <div igoStopPropagation\r\n                 class=\"igo-actions-container\">\r\n\r\n               <button *ngIf=\"canWrite || permission.profil === authService.decodeToken().user.sourceId\"\r\n                 mat-icon-button\r\n                 [matTooltip]=\"'igo.context.permission.delete' | translate\"\r\n                 matTooltipShowDelay=\"500\"\r\n                 color=\"warn\"\r\n                 (click)=\"removePermission.emit(permission)\">\r\n                 <mat-icon svgIcon=\"delete\"></mat-icon>\r\n               </button>\r\n            </div>\r\n\r\n          </mat-list-item>\r\n        </ng-template>\r\n      </igo-collapsible>\r\n    </ng-template>\r\n  </igo-list>\r\n\r\n</div>\r\n",
                styles: [":host{margin:10px}.full-width{width:100%}mat-radio-button{padding:14px 14px 14px 0}.scopeForm,form{padding:5px}mat-option ::ng-deep .mat-option-text{line-height:initial}"]
            }] }
];
/** @nocollapse */
ContextPermissionsComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: ChangeDetectorRef },
    { type: HttpClient },
    { type: AuthService }
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
     * @param {?} cd
     */
    constructor(component, contextService, languageService, messageService, cd) {
        this.contextService = contextService;
        this.languageService = languageService;
        this.messageService = messageService;
        this.cd = cd;
        this.component = component;
    }
    /**
     * @param {?} permission
     * @return {?}
     */
    onAddPermission(permission) {
        /** @type {?} */
        const translate = this.languageService.translate;
        if (!permission.profil) {
            /** @type {?} */
            const message = translate.instant('igo.context.contextManager.errors.addPermissionEmpty');
            /** @type {?} */
            const title = translate.instant('igo.context.contextManager.errors.addPermissionTitle');
            this.messageService.error(message, title);
            return;
        }
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
            const message = translate.instant('igo.context.permission.dialog.addMsg', {
                value: profil
            });
            /** @type {?} */
            const title = translate.instant('igo.context.permission.dialog.addTitle');
            this.messageService.success(message, title);
            this.cd.detectChanges();
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
            this.cd.detectChanges();
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
        this.contextService.editedContext$.next(undefined);
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
    { type: MessageService },
    { type: ChangeDetectorRef }
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
                    this.contextService.loadContext(context.uri);
                }));
            }
        }));
    }
}
BookmarkButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-bookmark-button',
                template: "<div class=\"igo-bookmark-button-container\">\r\n  <button\r\n    mat-icon-button\r\n    [matTooltip]=\"'igo.context.bookmarkButton.create' | translate\"\r\n    matTooltipPosition=\"above\"\r\n    [color]=\"color\"\r\n    (click)=\"createContext()\">\r\n    <mat-icon svgIcon=\"star\"></mat-icon>\r\n  </button>\r\n</div>\r\n",
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
                template: "<h1 mat-dialog-title class=\"mat-typography\">{{ 'igo.context.poiButton.dialog.title' | translate }}</h1>\r\n<div mat-dialog-content>\r\n  <mat-form-field>\r\n    <input matInput required autocomplete=\"off\"\r\n      [placeholder]=\"'igo.context.poiButton.dialog.placeholder' | translate\"\r\n      [(ngModel)]=\"title\">\r\n  </mat-form-field>\r\n</div>\r\n<div mat-dialog-actions>\r\n  <button mat-button color=\"primary\"\r\n         [disabled]=\"!title\"\r\n         (click)=\"dialogRef.close(title)\">\r\n    {{'igo.common.confirmDialog.confirmBtn' | translate}}\r\n  </button>\r\n  <button mat-button\r\n          (click)=\"dialogRef.close(false)\">\r\n    {{'igo.common.confirmDialog.cancelBtn' |\u00A0translate}}\r\n  </button>\r\n</div>\r\n"
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
                template: "<h1 mat-dialog-title class=\"mat-typography\">{{'igo.context.userButton.infoTitle' | translate}}</h1>\r\n<div mat-dialog-content class=\"mat-typography\">\r\n  <p>{{'igo.context.userButton.dialog.user' | translate}}: {{user.sourceId}}</p>\r\n  <p>{{'igo.context.userButton.dialog.email' | translate}}: {{user.email}}</p>\r\n  <p>{{'igo.context.userButton.dialog.expiration' | translate}}: {{exp}}</p>\r\n</div>\r\n<div mat-dialog-actions style=\"justify-content: center\">\r\n  <button mat-button color=\"primary\"\r\n         (click)=\"dialogRef.close(false)\">\r\n    OK\r\n  </button>\r\n</div>\r\n"
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
        this.hasApi = false;
        this.visible = this.config.getConfig('auth') ? true : false;
        this.hasApi = this.config.getConfig('context.url') !== undefined;
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
                template: "<div *ngIf=\"visible\" class=\"igo-user-button-container\">\r\n  <div class=\"igo-user-button-more-container\" [@userButtonState]=\"expand ? 'expand' : 'collapse'\">\r\n\r\n    <igo-poi-button *ngIf=\"hasApi\" [color]=\"color\" [map]=\"map\"></igo-poi-button>\r\n    <igo-bookmark-button *ngIf=\"hasApi\" [color]=\"color\" [map]=\"map\"></igo-bookmark-button>\r\n\r\n    <button\r\n      mat-icon-button\r\n      [matTooltip]=\"'igo.context.userButton.infoTitle' | translate\"\r\n      matTooltipPosition=\"above\"\r\n      [color]=\"color\"\r\n      (click)=\"infoUser()\">\r\n      <mat-icon svgIcon=\"information-outline\"></mat-icon>\r\n    </button>\r\n\r\n    <button\r\n      mat-icon-button\r\n      [matTooltip]=\"'igo.context.userButton.logout' |\u00A0translate\"\r\n      matTooltipPosition=\"above\"\r\n      [color]=\"color\"\r\n      (click)=\"logout()\">\r\n      <mat-icon svgIcon=\"power\"></mat-icon>\r\n    </button>\r\n\r\n  </div>\r\n\r\n  <button\r\n    mat-icon-button\r\n    [color]=\"auth.authenticated ? color : 'warn'\"\r\n    (click)=\"accountClick()\">\r\n    <mat-icon svgIcon=\"account-box\"></mat-icon>\r\n  </button>\r\n</div>\r\n",
                animations: [userButtonSlideInOut()],
                styles: [".igo-user-button-container button{background-color:#fff}.igo-user-button-container button:hover{background-color:#efefef}.igo-user-button-more-container{float:left;height:40px}.igo-user-button-more-container>*{margin-right:2px;float:left}@media only screen and (orientation:portrait) and (max-width:599px),only screen and (orientation:landscape) and (max-width:959px){.igo-user-button-container>button{position:absolute;bottom:0}.igo-user-button-more-container{height:80px;width:150px;position:relative;left:24px}}:host>>>button .mat-button-ripple-round,button{border-radius:0}"]
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
                exports: [BookmarkButtonComponent, PoiButtonComponent, UserButtonComponent, BookmarkDialogComponent],
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
                    MatDialogModule,
                    MatMenuModule,
                    MatOptionModule,
                    MatAutocompleteModule,
                    IgoAuthModule,
                    IgoListModule,
                    IgoKeyValueModule,
                    IgoCollapsibleModule,
                    IgoStopPropagationModule,
                    IgoLanguageModule,
                    IgoContextImportExportModule,
                    IgoContextMapButtonModule,
                    IgoActionbarModule
                ],
                entryComponents: [
                    BookmarkDialogComponent
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
class ShareMapService {
    /**
     * @param {?} config
     * @param {?} contextService
     * @param {?} messageService
     * @param {?} route
     */
    constructor(config, contextService, messageService, route) {
        this.config = config;
        this.contextService = contextService;
        this.messageService = messageService;
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
        const visibleLayers = layers.filter((/**
         * @param {?} lay
         * @return {?}
         */
        lay => lay.visible && lay.id !== 'searchPointerSummaryId'));
        /** @type {?} */
        const invisibleLayers = layers.filter((/**
         * @param {?} lay
         * @return {?}
         */
        lay => !lay.visible && lay.id !== 'searchPointerSummaryId'));
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
        /** @type {?} */
        const contextLayersID = [];
        /** @type {?} */
        const contextLayers = this.contextService.context$.value.layers;
        for (const contextLayer of contextLayers) {
            contextLayersID.push(contextLayer.id || contextLayer.source.id);
        }
        /** @type {?} */
        const addedLayersQueryParamsWms = this.makeLayersByService(layers, contextLayersID, 'wms');
        /** @type {?} */
        const addedLayersQueryParamsWmts = this.makeLayersByService(layers, contextLayersID, 'wmts');
        layersUrl = layersUrl.substr(0, layersUrl.length - 1);
        /** @type {?} */
        const zoomKey = this.route.options.zoomKey;
        /** @type {?} */
        const centerKey = this.route.options.centerKey;
        /** @type {?} */
        const contextKey = this.route.options.contextKey;
        /** @type {?} */
        const zoom = `${zoomKey}=${map$$1.viewController.getZoom()}`;
        /** @type {?} */
        const arrayCenter = map$$1.viewController.getCenter('EPSG:4326') || [];
        /** @type {?} */
        const long = arrayCenter[0].toFixed(5).replace(/\.([^0]+)0+$/, '.$1');
        /** @type {?} */
        const lat = arrayCenter[1].toFixed(5).replace(/\.([^0]+)0+$/, '.$1');
        /** @type {?} */
        const center = `${centerKey}=${long},${lat}`.replace(/.00000/g, '');
        /** @type {?} */
        let context = '';
        if (this.contextService.context$.value) {
            context = `${contextKey}=${this.contextService.context$.value.uri}`;
        }
        /** @type {?} */
        let url = `${location.origin}${location.pathname}?${context}&${zoom}&${center}&${layersUrl}&${llc}&${addedLayersQueryParamsWms}&${llc}&${addedLayersQueryParamsWmts}`;
        for (let i = 0; i < 5; i++) {
            url = url.replace(/&&/g, '&');
            url = url.endsWith('&') ? url.slice(0, -1) : url;
        }
        url = url.endsWith('&') ? url.slice(0, -1) : url;
        url = url.replace('?&wm', '&wm');
        url = url.replace('?&', '?');
        return url;
    }
    /**
     * @private
     * @param {?} layers
     * @param {?} contextLayersID
     * @param {?} typeService
     * @return {?}
     */
    makeLayersByService(layers, contextLayersID, typeService) {
        /** @type {?} */
        const addedLayersByService = [];
        for (const layer of layers.filter((/**
         * @param {?} l
         * @return {?}
         */
        l => l.dataSource.options && (l.dataSource.options.type === typeService)))) {
            if (contextLayersID.indexOf(layer.id) === -1) {
                /** @type {?} */
                const linkUrl = ((/** @type {?} */ (layer.dataSource.options))).url;
                /** @type {?} */
                let addedLayer = '';
                if (layer.dataSource.options.type === 'wms') {
                    addedLayer = encodeURIComponent(((/** @type {?} */ (layer.dataSource.options))).params.LAYERS);
                }
                else if (layer.dataSource.options.type === 'wmts') {
                    addedLayer = encodeURIComponent(((/** @type {?} */ (layer.dataSource.options))).layer);
                }
                /** @type {?} */
                const addedLayerPosition = `${addedLayer}:igoz${layer.zIndex}`;
                if (!addedLayersByService.find((/**
                 * @param {?} definedUrl
                 * @return {?}
                 */
                definedUrl => definedUrl.url === linkUrl))) {
                    addedLayersByService.push({
                        url: linkUrl,
                        layers: [addedLayerPosition]
                    });
                }
                else {
                    addedLayersByService.forEach((/**
                     * @param {?} service
                     * @return {?}
                     */
                    service => {
                        if (service.url === linkUrl) {
                            service.layers.push(addedLayerPosition);
                        }
                    }));
                }
            }
        }
        /** @type {?} */
        let addedLayersQueryParams = '';
        if (addedLayersByService.length >= 1) {
            /** @type {?} */
            const linkUrlKey = (typeService === 'wms') ? this.route.options.wmsUrlKey :
                (typeService === 'wmts') ? this.route.options.wmtsUrlKey : '';
            /** @type {?} */
            const layersKey = (typeService === 'wms') ? this.route.options.wmsLayersKey :
                (typeService === 'wmts') ? this.route.options.wmtsLayersKey : '';
            /** @type {?} */
            let linkUrlQueryParams = '';
            /** @type {?} */
            let layersQueryParams = '';
            addedLayersByService.forEach((/**
             * @param {?} service
             * @return {?}
             */
            service => {
                linkUrlQueryParams += `${service.url},`;
                layersQueryParams += `(${service.layers.join(',')}),`;
            }));
            linkUrlQueryParams = linkUrlQueryParams.endsWith(',')
                ? linkUrlQueryParams.slice(0, -1)
                : linkUrlQueryParams;
            layersQueryParams = layersQueryParams.endsWith(',')
                ? layersQueryParams.slice(0, -1)
                : layersQueryParams;
            addedLayersQueryParams = `${linkUrlKey}=${linkUrlQueryParams}&${layersKey}=${layersQueryParams}`;
        }
        return addedLayersQueryParams;
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
    { type: RouteService, decorators: [{ type: Optional }] }
];
/** @nocollapse */ ShareMapService.ngInjectableDef = defineInjectable({ factory: function ShareMapService_Factory() { return new ShareMapService(inject(ConfigService), inject(ContextService), inject(MessageService), inject(RouteService, 8)); }, token: ShareMapService, providedIn: "root" });

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
     * @param {?} cdRef
     */
    constructor(config, languageService, messageService, auth, shareMapService, formBuilder, cdRef) {
        this.config = config;
        this.languageService = languageService;
        this.messageService = messageService;
        this.auth = auth;
        this.shareMapService = shareMapService;
        this.formBuilder = formBuilder;
        this.cdRef = cdRef;
        this.hasApi = false;
        this.publicShareOption = {
            layerlistControls: { querystring: '' }
        };
        this.hasApi = this.config.getConfig('context.url') ? true : false;
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
        this.mapState$$ = this.map.viewController.state$.subscribe((/**
         * @param {?} c
         * @return {?}
         */
        c => {
            if (!this.hasApi) {
                this.resetUrl();
                this.cdRef.detectChanges();
            }
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
    ngOnDestroy() {
        this.mapState$$.unsubscribe();
    }
    /**
     * @param {?=} values
     * @return {?}
     */
    resetUrl(values = {}) {
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
                template: "<form class=\"igo-form\" [formGroup]=\"form\"\r\n  (ngSubmit)=\"resetUrl(form.value)\">\r\n\r\n  <div *ngIf=\"hasApi\" class=\"igo-input-container\">\r\n    <mat-form-field>\r\n      <input matInput required\r\n             [placeholder]=\"'igo.context.contextManager.form.title' | translate\"\r\n             formControlName=\"title\">\r\n     <mat-error>\r\n      {{ 'igo.context.contextManager.form.titleRequired' | translate }}\r\n     </mat-error>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div *ngIf=\"hasApi\" id=\"uriInput\" class=\"igo-input-container\">\r\n    <mat-form-field>\r\n      <span *ngIf=\"userId\" class=\"prefix\">{{userId}}-</span>\r\n      <span class=\"fieldWrapper\">\r\n        <input matInput required\r\n             [readonly]=\"!userId\"\r\n             [placeholder]=\"'igo.context.contextManager.form.uri' | translate\"\r\n             formControlName=\"uri\">\r\n       </span>\r\n     <mat-error>\r\n      {{ 'igo.context.contextManager.form.uriRequired' | translate }}\r\n     </mat-error>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div *ngIf=\"hasApi\" class=\"igo-form-button-group\">\r\n    <button\r\n      mat-raised-button\r\n      type=\"submit\"\r\n      [disabled]=\"!form.valid\">\r\n      {{ 'igo.context.shareMap.button' | translate }}\r\n    </button>\r\n  </div>\r\n\r\n</form>\r\n\r\n<div *ngIf=\"url\" class=\"igo-input-container linkToShare\">\r\n  <mat-form-field>\r\n    <textarea #textArea matInput readonly rows=\"1\"\r\n      [ngClass]=\"{'textAreaWithButton': hasApi}\"\r\n      [placeholder]=\"'igo.context.shareMap.placeholderLink' | translate\"\r\n      [value]=\"url\"></textarea>\r\n    <button *ngIf=\"hasApi\"\r\n      mat-icon-button\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.context.shareMap.copy' | translate\"\r\n      color=\"primary\"\r\n      (click)=\"copyTextToClipboard(textArea)\">\r\n      <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n    </button>\r\n  </mat-form-field>\r\n\r\n  <div *ngIf=\"!hasApi\" class=\"igo-form-button-group\">\r\n    <button\r\n      mat-raised-button\r\n      (click)=\"copyTextToClipboard(textArea)\">\r\n      <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n      {{ 'igo.context.shareMap.copy' | translate }}\r\n    </button>\r\n  </div>\r\n  <div *ngIf=\"!hasApi\">\r\n    <br/>\r\n    <section class=\"mat-typography\">\r\n        <h4>{{'igo.context.shareMap.included' | translate}}</h4>\r\n        <ul>\r\n          <li>{{'igo.context.shareMap.context' | translate}}</li>\r\n          <li>{{'igo.context.shareMap.center' | translate}}</li>\r\n          <li>{{'igo.context.shareMap.zoom' | translate}}</li>\r\n          <li>{{'igo.context.shareMap.addedLayers' | translate}}</li>\r\n          <li>{{'igo.context.shareMap.visibleInvisible' | translate}}</li>\r\n        </ul>\r\n\r\n      <h4>{{'igo.context.shareMap.excluded' | translate}}</h4>\r\n      <ul>\r\n        <li>{{'igo.context.shareMap.order' | translate}}</li>\r\n        <li>{{'igo.context.shareMap.opacity' | translate}}</li>\r\n        <li>{{'igo.context.shareMap.filterOgc' | translate}}</li>\r\n        <li>{{'igo.context.shareMap.filterTime' | translate}}</li>\r\n      </ul>\r\n    </section>\r\n  </div>\r\n\r\n</div>\r\n",
                styles: ["@charset \"UTF-8\";mat-form-field{width:100%}#uriInput .fieldWrapper{display:block;overflow:hidden}#uriInput .prefix{float:left}.linkToShare{padding:25px 5px 5px}.linkToShare textarea{resize:none;width:100%;line-height:1.3;height:40px;overflow-y:hidden;word-wrap:normal;word-break:break-all}.linkToShare textarea.textAreaWithButton{width:calc(100% - 60px)}.linkToShare mat-form-field>button{float:right;margin:-10px 0}.igo-form{padding:20px 5px 5px}.igo-form-button-group{text-align:center;padding-top:10px}"]
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
    { type: ChangeDetectorRef }
];
ShareMapComponent.propDecorators = {
    map: [{ type: Input }]
};

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
                exports: [ShareMapComponent],
                declarations: [ShareMapComponent]
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
        this.format = new GeoJSON();
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
                template: "<mat-sidenav\r\n  #sidenav\r\n  igoSidenavShim\r\n  mode=\"side\"\r\n  [opened]=\"opened\">\r\n\r\n  <div class=\"igo-sidenav-content\">\r\n\r\n    <igo-flexible\r\n      #topPanel\r\n      initial=\"50%\" initialMobile=\"100%\"\r\n      expanded=\"calc(100% - 58px)\"\r\n      [state]=\"topPanelState\">\r\n\r\n      <div class=\"igo-content\">\r\n        <igo-panel [title]=\"tool ? (tool.title | translate) : title\">\r\n          <button\r\n            mat-icon-button\r\n            panelLeftButton\r\n            tooltip-position=\"below\"\r\n            matTooltipShowDelay=\"500\"\r\n            [matTooltip]=\"'igo.context.sidenav.goBack' | translate\"\r\n            *ngIf=\"tool\">\r\n            <mat-icon svgIcon=\"arrow-back\"></mat-icon>\r\n          </button>\r\n\r\n          <button\r\n            mat-icon-button\r\n            panelRightButton\r\n            tooltip-position=\"below\"\r\n            matTooltipShowDelay=\"500\"\r\n            [matTooltip]=\"'igo.context.sidenav.mainMenu' | translate\"\r\n            *ngIf=\"tool\">\r\n            <mat-icon svgIcon=\"menu\"></mat-icon>\r\n          </button>\r\n\r\n        </igo-panel>\r\n      </div>\r\n\r\n      <div igoFlexibleFill class=\"igo-content\">\r\n        <igo-panel\r\n          [title]=\"featureTitle\"\r\n          *ngIf=\"feature && media !== 'mobile'\">\r\n\r\n          <button\r\n            mat-icon-button\r\n            panelLeftButton\r\n            class=\"igo-icon-button\"\r\n            (click)=\"toggleTopPanel()\">\r\n            <mat-icon [svgIcon]=\"['collapsed', 'initial'].indexOf(topPanel.state) >= 0 ? 'arrow_downward' : 'arrow_upward'\"></mat-icon>\r\n          </button>\r\n\r\n          <button\r\n            mat-icon-button\r\n            panelRightButton\r\n            class=\"igo-icon-button\"\r\n            (click)=\"zoomToFeatureExtent()\"\r\n            *ngIf=\"feature.geometry\">\r\n            <mat-icon svgIcon=\"zoom-in\"></mat-icon>\r\n          </button>\r\n\r\n          <igo-feature-details\r\n            [feature]=\"feature\"\r\n            *ngIf=\"['collapsed', 'initial'].indexOf(topPanel.state) >= 0\">\r\n          </igo-feature-details>\r\n        </igo-panel>\r\n      </div>\r\n\r\n    </igo-flexible>\r\n\r\n  </div>\r\n</mat-sidenav>\r\n",
                styles: [".igo-sidenav-content .igo-flexible-fill .igo-container,:host ::ng-deep .igo-flexible-fill .igo-container{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;border-top:1px solid rgba(0,0,0,.2)}mat-sidenav{-o-box-shadow:2px 0 2px 0 #ddd;box-shadow:2px 0 2px 0 #ddd;width:400px}:host{background-color:#fff}:host ::ng-deep mat-sidenav{z-index:3!important}@media only screen and (orientation:portrait) and (max-width:599px),only screen and (orientation:landscape) and (max-width:959px){mat-sidenav{width:calc(100% - 40px - 5px)}}.igo-sidenav-content{margin-top:50px;height:calc(100% - 50px)}igo-feature-details ::ng-deep table{width:100%}"]
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
                imports: [MatInputModule, MatFormFieldModule, MatMenuModule],
                declarations: [],
                exports: [
                    IgoContextImportExportModule,
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
class ContextExportIonicService extends ContextExportService {
    /**
     * @param {?} config
     * @param {?} platform
     * @param {?} fileOpener
     * @param {?} file
     */
    constructor(config, platform, fileOpener, file) {
        super();
        this.config = config;
        this.platform = platform;
        this.fileOpener = fileOpener;
        this.file = file;
    }
    /**
     * @protected
     * @param {?} res
     * @return {?}
     */
    exportAsync(res) {
        /** @type {?} */
        const doExport = (/**
         * @param {?} observer
         * @return {?}
         */
        (observer) => {
            /** @type {?} */
            const nothingToExport = super.nothingToExport(res);
            if (nothingToExport === true) {
                observer.error(new ExportNothingToExportError());
                return;
            }
            /** @type {?} */
            const contextJSON = JSON.stringify(res);
            if (this.platform.is('cordova')) {
                /** @type {?} */
                const directory = this.config.getConfig('ExportDirectory');
                this.file.writeFile(directory, `${res.uri}.json`, contextJSON, { replace: true }).then((/**
                 * @param {?} success
                 * @return {?}
                 */
                (success) => this.fileOpener.open(directory + '/' + `${res.uri}.json`, 'text/plain')));
                observer.complete();
            }
            else {
                downloadContent(contextJSON, 'text/json;charset=utf-8', `${res.uri}.json`);
                observer.complete();
            }
        });
        return new Observable(doExport);
    }
}
ContextExportIonicService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ContextExportIonicService.ctorParameters = () => [
    { type: ConfigService },
    { type: Platform },
    { type: FileOpener },
    { type: File }
];
/** @nocollapse */ ContextExportIonicService.ngInjectableDef = defineInjectable({ factory: function ContextExportIonicService_Factory() { return new ContextExportIonicService(inject(ConfigService), inject(Platform), inject(FileOpener$1), inject(File$1)); }, token: ContextExportIonicService, providedIn: "root" });

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

export { IgoContextModule, IgoContextImportExportModule, IgoContextManagerModule, IgoContextMapButtonModule, IgoShareMapModule, IgoSidenavModule, ExportError, ExportInvalidFileError, ExportNothingToExportError, ImportError, ImportInvalidFileError, ImportUnreadableFileError, ImportNothingToImportError, ImportSizeError, ImportSRSError, ContextExportService, ContextExportIonicService, ContextImportService, handleFileImportSuccess, handleFileImportError, handleInvalidFileImportError, handleSizeFileImportError, handleUnreadbleFileImportError, handleNothingToImportError, addContextToContextList, getFileExtension, computeLayerTitleFromFile, addImportedFeaturesToMap, addImportedFeaturesStyledToMap, handleFileExportError, handleFileExportSuccess, handleNothingToExportError, ContextImportExportComponent, ContextService, TypePermission, Scope, LayerContextDirective, MapContextDirective, ContextListComponent, ContextListBindingDirective, ContextItemComponent, ContextFormComponent, ContextEditComponent, ContextEditBindingDirective, ContextPermissionsComponent, ContextPermissionsBindingDirective, BookmarkButtonComponent, BookmarkDialogComponent, PoiButtonComponent, PoiDialogComponent, PoiService, UserButtonComponent, UserDialogComponent, ShareMapService, ShareMapComponent, SidenavComponent, ContextImportExportComponent as ɵa, ContextExportService as ɵc, ContextImportService as ɵb, ContextEditBindingDirective as ɵr, ContextEditComponent as ɵq, ContextFormComponent as ɵp, ContextItemComponent as ɵo, ContextListBindingDirective as ɵn, ContextListComponent as ɵm, ContextPermissionsBindingDirective as ɵt, ContextPermissionsComponent as ɵs, ContextService as ɵd, LayerContextDirective as ɵv, MapContextDirective as ɵu, BookmarkButtonComponent as ɵe, BookmarkDialogComponent as ɵj, PoiButtonComponent as ɵf, PoiDialogComponent as ɵk, PoiService as ɵg, userButtonSlideInOut as ɵi, UserButtonComponent as ɵh, UserDialogComponent as ɵl, ShareMapComponent as ɵw, ShareMapService as ɵx, SidenavComponent as ɵy };

//# sourceMappingURL=igo2-context.js.map