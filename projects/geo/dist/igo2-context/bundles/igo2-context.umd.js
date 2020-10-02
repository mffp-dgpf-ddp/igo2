(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('ol/style'), require('ol/source/Cluster'), require('rxjs/operators'), require('ol/proj'), require('ol/easing'), require('ol/geom/Point'), require('@angular/common/http'), require('@angular/animations'), require('@angular/forms'), require('@igo2/auth'), require('@angular/common'), require('@angular/material'), require('@angular/platform-browser'), require('@igo2/common'), require('@igo2/geo'), require('ol/format/GeoJSON'), require('@angular/core'), require('@igo2/core'), require('@igo2/utils'), require('rxjs'), require('@ionic/angular'), require('@ionic-native/file/ngx'), require('@ionic-native/file-opener/ngx'), require('@ionic-native/file-opener/ngx/index'), require('@ionic-native/file/ngx/index')) :
    typeof define === 'function' && define.amd ? define('@igo2/context', ['exports', 'ol/style', 'ol/source/Cluster', 'rxjs/operators', 'ol/proj', 'ol/easing', 'ol/geom/Point', '@angular/common/http', '@angular/animations', '@angular/forms', '@igo2/auth', '@angular/common', '@angular/material', '@angular/platform-browser', '@igo2/common', '@igo2/geo', 'ol/format/GeoJSON', '@angular/core', '@igo2/core', '@igo2/utils', 'rxjs', '@ionic/angular', '@ionic-native/file/ngx', '@ionic-native/file-opener/ngx', '@ionic-native/file-opener/ngx/index', '@ionic-native/file/ngx/index'], factory) :
    (factory((global.igo2 = global.igo2 || {}, global.igo2.context = {}),global.olStyle,global.Cluster,global.rxjs.operators,global.olproj,global.oleasing,global.olPoint,global.ng.common.http,global.ng.animations,global.ng.forms,global.auth,global.ng.common,global.ng.material,global.ng.platformBrowser,global.common,global.geo,global.olFormatGeoJSON,global.ng.core,global.core,global.utils,global.rxjs,global.i2$1,global.ngx,global.ngx$1,global.i3,global.i4));
}(this, (function (exports,olStyle,Cluster,operators,olproj,oleasing,olPoint,i1,animations,forms,i2,common,material,platformBrowser,common$1,geo,GeoJSON,i0,i1$1,utils,rxjs,i2$1,ngx,ngx$1,i3,i4) { 'use strict';

    Cluster = Cluster && Cluster.hasOwnProperty('default') ? Cluster['default'] : Cluster;
    olPoint = olPoint && olPoint.hasOwnProperty('default') ? olPoint['default'] : olPoint;
    GeoJSON = GeoJSON && GeoJSON.hasOwnProperty('default') ? GeoJSON['default'] : GeoJSON;

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
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
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
    var ExportError = /** @class */ (function (_super) {
        __extends(ExportError, _super);
        function ExportError() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ExportError;
    }(Error));
    var ExportInvalidFileError = /** @class */ (function (_super) {
        __extends(ExportInvalidFileError, _super);
        function ExportInvalidFileError() {
            var _this = _super.call(this, 'Invalid context') || this;
            Object.setPrototypeOf(_this, ExportInvalidFileError.prototype);
            return _this;
        }
        return ExportInvalidFileError;
    }(ExportError));
    var ExportNothingToExportError = /** @class */ (function (_super) {
        __extends(ExportNothingToExportError, _super);
        function ExportNothingToExportError() {
            var _this = _super.call(this, 'Nothing to export') || this;
            Object.setPrototypeOf(_this, ExportNothingToExportError.prototype);
            return _this;
        }
        return ExportNothingToExportError;
    }(ExportError));

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
        var translate = languageService.translate;
        /** @type {?} */
        var title = translate.instant('igo.context.contextImportExport.export.failed.title');
        /** @type {?} */
        var message = translate.instant('igo.context.contextImportExport.export.failed.text');
        messageService.error(message, title);
    }
    /**
     * @param {?} messageService
     * @param {?} languageService
     * @return {?}
     */
    function handleFileExportSuccess(messageService, languageService) {
        /** @type {?} */
        var translate = languageService.translate;
        /** @type {?} */
        var title = translate.instant('igo.context.contextImportExport.export.success.title');
        /** @type {?} */
        var message = translate.instant('igo.context.contextImportExport.export.success.text');
        messageService.success(message, title);
    }
    /**
     * @param {?} messageService
     * @param {?} languageService
     * @return {?}
     */
    function handleNothingToExportError(messageService, languageService) {
        /** @type {?} */
        var translate = languageService.translate;
        /** @type {?} */
        var title = translate.instant('igo.context.contextImportExport.export.nothing.title');
        /** @type {?} */
        var message = translate.instant('igo.context.contextImportExport.export.nothing.text');
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
        var contextTitle = computeLayerTitleFromFile(file);
        addContextToContextList(context, contextTitle, contextService);
        /** @type {?} */
        var translate = languageService.translate;
        /** @type {?} */
        var messageTitle = translate.instant('igo.context.contextImportExport.import.success.title');
        /** @type {?} */
        var message = translate.instant('igo.context.contextImportExport.import.success.text', {
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
        var errMapping = {
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
        var translate = languageService.translate;
        /** @type {?} */
        var title = translate.instant('igo.context.contextImportExport.import.invalid.title');
        /** @type {?} */
        var message = translate.instant('igo.context.contextImportExport.import.invalid.text', {
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
        var translate = languageService.translate;
        /** @type {?} */
        var title = translate.instant('igo.context.contextImportExport.import.tooLarge.title');
        /** @type {?} */
        var message = translate.instant('igo.context.contextImportExport.import.tooLarge.text', {
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
        var translate = languageService.translate;
        /** @type {?} */
        var title = translate.instant('igo.context.contextImportExport.import.unreadable.title');
        /** @type {?} */
        var message = translate.instant('igo.context.contextImportExport.import.unreadable.text', {
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
        var translate = languageService.translate;
        /** @type {?} */
        var title = translate.instant('igo.context.contextImportExport.import.empty.title');
        /** @type {?} */
        var message = translate.instant('igo.context.contextImportExport.import.empty.text', {
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
    function addImportedFeaturesToMap(olFeatures, map, layerTitle) {
        /** @type {?} */
        var r = Math.floor(Math.random() * 255);
        /** @type {?} */
        var g = Math.floor(Math.random() * 255);
        /** @type {?} */
        var b = Math.floor(Math.random() * 255);
        /** @type {?} */
        var stroke = new olStyle.Stroke({
            color: [r, g, b, 1],
            width: 2
        });
        /** @type {?} */
        var fill = new olStyle.Fill({
            color: [r, g, b, 0.4]
        });
        /** @type {?} */
        var sourceOptions = {
            type: 'vector',
            queryable: true
        };
        /** @type {?} */
        var source = new geo.FeatureDataSource(sourceOptions);
        source.ol.addFeatures(olFeatures);
        /** @type {?} */
        var layer = new geo.VectorLayer({
            title: layerTitle,
            source: source,
            style: new olStyle.Style({
                stroke: stroke,
                fill: fill,
                image: new olStyle.Circle({
                    radius: 5,
                    stroke: stroke,
                    fill: fill
                })
            })
        });
        map.addLayer(layer);
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
    function addImportedFeaturesStyledToMap(olFeatures, map, layerTitle, styleListService, styleService) {
        /** @type {?} */
        var style;
        /** @type {?} */
        var distance;
        if (styleListService.getStyleList(layerTitle.toString() + '.styleByAttribute')) {
            /** @type {?} */
            var styleByAttribute_1 = styleListService.getStyleList(layerTitle.toString() + '.styleByAttribute');
            style = ( /**
             * @param {?} feature
             * @return {?}
             */function (feature) {
                return styleService.createStyleByAttribute(feature, styleByAttribute_1);
            });
        }
        else if (styleListService.getStyleList(layerTitle.toString() + '.clusterStyle')) {
            /** @type {?} */
            var clusterParam_1 = styleListService.getStyleList(layerTitle.toString() + '.clusterParam');
            distance = styleListService.getStyleList(layerTitle.toString() + '.distance');
            /** @type {?} */
            var baseStyle_1 = styleService.createStyle(styleListService.getStyleList(layerTitle.toString() + '.clusterStyle'));
            style = ( /**
             * @param {?} feature
             * @return {?}
             */function (feature) {
                return styleService.createClusterStyle(feature, clusterParam_1, baseStyle_1);
            });
        }
        else if (styleListService.getStyleList(layerTitle.toString() + '.style')) {
            style = styleService.createStyle(styleListService.getStyleList(layerTitle.toString() + '.style'));
        }
        else {
            style = styleService.createStyle(styleListService.getStyleList('default.style'));
        }
        /** @type {?} */
        var source;
        if (styleListService.getStyleList(layerTitle.toString() + '.clusterStyle')) {
            /** @type {?} */
            var sourceOptions = {
                distance: distance,
                type: 'cluster',
                queryable: true
            };
            source = new geo.ClusterDataSource(sourceOptions);
            source.ol.source.addFeatures(olFeatures);
        }
        else {
            /** @type {?} */
            var sourceOptions = {
                type: 'vector',
                queryable: true
            };
            source = new geo.FeatureDataSource(sourceOptions);
            source.ol.addFeatures(olFeatures);
        }
        /** @type {?} */
        var layer = new geo.VectorLayer({
            title: layerTitle,
            source: source,
            style: style
        });
        map.addLayer(layer);
        return layer;
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
        function ContextService(http, authService, languageService, config, messageService, route) {
            var _this = this;
            this.http = http;
            this.authService = authService;
            this.languageService = languageService;
            this.config = config;
            this.messageService = messageService;
            this.route = route;
            this.context$ = new rxjs.BehaviorSubject(undefined);
            this.contexts$ = new rxjs.BehaviorSubject({ ours: [] });
            this.defaultContextId$ = new rxjs.BehaviorSubject(undefined);
            this.editedContext$ = new rxjs.BehaviorSubject(undefined);
            this.importedContext = [];
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
                if (authenticated && _this.baseUrl) {
                    _this.get().subscribe(( /**
                     * @param {?} contexts
                     * @return {?}
                     */function (contexts) {
                        _this.handleContextsChange(contexts);
                    }));
                }
                else {
                    /** @type {?} */
                    var contexts$$_1 = _this.contexts$.subscribe(( /**
                     * @param {?} contexts
                     * @return {?}
                     */function (contexts) {
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
             */ function () {
                return this._defaultContextUri || this.options.defaultContextUri;
            },
            set: /**
             * @param {?} uri
             * @return {?}
             */ function (uri) {
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
                return this.http.get(url).pipe(operators.catchError(( /**
                 * @param {?} res
                 * @return {?}
                 */function (res) {
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
                return this.http.get(url).pipe(operators.tap(( /**
                 * @param {?} context
                 * @return {?}
                 */function (context) {
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
                return rxjs.of([]);
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
                if (imported === void 0) {
                    imported = false;
                }
                /** @type {?} */
                var contexts = { ours: [] };
                Object.keys(this.contexts$.value).forEach(( /**
                 * @param {?} key
                 * @return {?}
                 */function (key) {
                    return (contexts[key] = _this.contexts$.value[key].filter(( /**
                     * @param {?} c
                     * @return {?}
                     */function (c) { return c.id !== id; })));
                }));
                if (imported) {
                    this.importedContext = this.importedContext.filter(( /**
                     * @param {?} c
                     * @return {?}
                     */function (c) { return c.id !== id; }));
                    return rxjs.of(this.contexts$.next(contexts));
                }
                /** @type {?} */
                var url = this.baseUrl + '/contexts/' + id;
                return this.http.delete(url).pipe(operators.tap(( /**
                 * @param {?} res
                 * @return {?}
                 */function (res) {
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
                    .pipe(operators.catchError(( /**
             * @param {?} res
             * @return {?}
             */function (res) {
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
                return this.http.get(url).pipe(operators.flatMap(( /**
                 * @param {?} res
                 * @return {?}
                 */function (res) {
                    if (!res.base) {
                        return rxjs.of(res);
                    }
                    /** @type {?} */
                    var urlBase = _this.getPath(res.base + ".json");
                    return _this.http.get(urlBase).pipe(operators.map(( /**
                     * @param {?} resBase
                     * @return {?}
                     */function (resBase) {
                        /** @type {?} */
                        var resMerge = res;
                        resMerge.map = utils.ObjectUtils.mergeDeep(resBase.map, res.map);
                        resMerge.layers = (resBase.layers || [])
                            .concat(res.layers || [])
                            .reverse()
                            .filter(( /**
                     * @param {?} l
                     * @param {?} index
                     * @param {?} self
                     * @return {?}
                     */function (l, index, self) {
                            return !l.id || self.findIndex(( /**
                             * @param {?} l2
                             * @return {?}
                             */function (l2) { return l2.id === l.id; })) === index;
                        }))
                            .reverse();
                        resMerge.toolbar = res.toolbar || resBase.toolbar;
                        resMerge.tools = (res.tools || [])
                            .concat(resBase.tools || [])
                            .filter(( /**
                     * @param {?} t
                     * @param {?} index
                     * @param {?} self
                     * @return {?}
                     */function (t, index, self) {
                            return self.findIndex(( /**
                             * @param {?} t2
                             * @return {?}
                             */function (t2) { return t2.name === t.name; })) === index;
                        }));
                        return resMerge;
                    })), operators.catchError(( /**
                     * @param {?} err
                     * @return {?}
                     */function (err) {
                        return _this.handleError(err, uri);
                    })));
                })), operators.catchError(( /**
                 * @param {?} err2
                 * @return {?}
                 */function (err2) {
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
                request.subscribe(( /**
                 * @param {?} contexts
                 * @return {?}
                 */function (contexts) {
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
                            _this.defaultContextUri = _context.uri;
                            _this.addContextToList(_context);
                            _this.setContext(_context);
                        }), ( /**
                         * @return {?}
                         */function () {
                            _this.defaultContextId$.next(undefined);
                            _this.loadContext(_this.defaultContextUri);
                        }));
                    }
                    else {
                        _this.loadContext(_this.defaultContextUri);
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
                var contexts$$ = this.getContextByUri(uri).subscribe(( /**
                 * @param {?} _context
                 * @return {?}
                 */function (_context) {
                    if (contexts$$) {
                        contexts$$.unsubscribe();
                    }
                    _this.addContextToList(_context);
                    _this.setContext(_context);
                }), ( /**
                 * @param {?} err
                 * @return {?}
                 */function (err) {
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
                    uri: utils.uuid(),
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
                        .filter(( /**
                 * @param {?} lay
                 * @return {?}
                 */function (lay) {
                        return lay.baseLayer === true ||
                            lay.options.id === 'searchPointerSummaryId';
                    }))
                        .sort(( /**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */function (a, b) { return a.zIndex - b.zIndex; }));
                }
                else {
                    layers = igoMap.layers$.getValue().sort(( /**
                     * @param {?} a
                     * @param {?} b
                     * @return {?}
                     */function (a, b) { return a.zIndex - b.zIndex; }));
                }
                /** @type {?} */
                var i = 0;
                try {
                    for (var layers_1 = __values(layers), layers_1_1 = layers_1.next(); !layers_1_1.done; layers_1_1 = layers_1.next()) {
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
                 */function (tool) {
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
                    .filter(( /**
             * @param {?} l
             * @return {?}
             */function (l) { return l.baseLayer; }))
                    .map(( /**
             * @param {?} l
             * @return {?}
             */function (l) {
                    return {
                        baseLayer: true,
                        sourceOptions: l.options.sourceOptions,
                        title: l.options.title,
                        visible: l.visible
                    };
                }));
                layers.forEach(( /**
                 * @param {?} layer
                 * @return {?}
                 */function (layer) {
                    /** @type {?} */
                    var layerFound = currentContext.layers.find(( /**
                     * @param {?} contextLayer
                     * @return {?}
                     */function (contextLayer) {
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
                    this.messageService.message(( /** @type {?} */(message)));
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
                    if (contextToLoad && contextToLoad.imported) {
                        return rxjs.of(contextToLoad);
                    }
                    // TODO : use always id or uri
                    /** @type {?} */
                    var id = contextToLoad ? contextToLoad.id : uri;
                    return this.getDetails(id);
                }
                /** @type {?} */
                var importedContext = this.contexts$.value.ours.find(( /**
                 * @param {?} currentContext
                 * @return {?}
                 */function (currentContext) {
                    return currentContext.uri === uri && currentContext.imported === true;
                }));
                if (importedContext) {
                    return rxjs.of(importedContext);
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
                mapLayers.forEach(( /**
                 * @param {?} layer
                 * @return {?}
                 */function (layer) {
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
                var context = this.contexts$.value.ours.find(( /**
                 * @param {?} obj
                 * @return {?}
                 */function (obj) { return obj.uri === uri; }));
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
                if (keepCurrentContext === void 0) {
                    keepCurrentContext = true;
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
                    for (var _b = __values(Object.keys(contexts)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var key = _c.value;
                        /** @type {?} */
                        var value = contexts[key];
                        found = value.find(( /**
                         * @param {?} c
                         * @return {?}
                         */function (c) {
                            return (context.id && c.id === context.id) ||
                                (context.uri && c.uri === context.uri);
                        }));
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
                { type: i1$1.MessageService },
                { type: i1$1.RouteService, decorators: [{ type: i0.Optional }] }
            ];
        };
        /** @nocollapse */ ContextService.ngInjectableDef = i0.defineInjectable({ factory: function ContextService_Factory() { return new ContextService(i0.inject(i1.HttpClient), i0.inject(i2.AuthService), i0.inject(i1$1.LanguageService), i0.inject(i1$1.ConfigService), i0.inject(i1$1.MessageService), i0.inject(i1$1.RouteService, 8)); }, token: ContextService, providedIn: "root" });
        return ContextService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ImportError = /** @class */ (function (_super) {
        __extends(ImportError, _super);
        function ImportError() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ImportError;
    }(Error));
    var ImportInvalidFileError = /** @class */ (function (_super) {
        __extends(ImportInvalidFileError, _super);
        function ImportInvalidFileError() {
            var _this = _super.call(this, 'Invalid file') || this;
            Object.setPrototypeOf(_this, ImportInvalidFileError.prototype);
            return _this;
        }
        return ImportInvalidFileError;
    }(ImportError));
    var ImportUnreadableFileError = /** @class */ (function (_super) {
        __extends(ImportUnreadableFileError, _super);
        function ImportUnreadableFileError() {
            var _this = _super.call(this, 'Failed to read file') || this;
            Object.setPrototypeOf(_this, ImportUnreadableFileError.prototype);
            return _this;
        }
        return ImportUnreadableFileError;
    }(ImportError));
    var ImportNothingToImportError = /** @class */ (function (_super) {
        __extends(ImportNothingToImportError, _super);
        function ImportNothingToImportError() {
            var _this = _super.call(this, 'Nothing to import') || this;
            Object.setPrototypeOf(_this, ImportNothingToImportError.prototype);
            return _this;
        }
        return ImportNothingToImportError;
    }(ImportError));
    var ImportSizeError = /** @class */ (function (_super) {
        __extends(ImportSizeError, _super);
        function ImportSizeError() {
            var _this = _super.call(this, 'File is too large') || this;
            Object.setPrototypeOf(_this, ImportNothingToImportError.prototype);
            return _this;
        }
        return ImportSizeError;
    }(ImportError));
    var ImportSRSError = /** @class */ (function (_super) {
        __extends(ImportSRSError, _super);
        function ImportSRSError() {
            var _this = _super.call(this, 'Invalid SRS definition') || this;
            Object.setPrototypeOf(_this, ImportNothingToImportError.prototype);
            return _this;
        }
        return ImportSRSError;
    }(ImportError));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ContextImportService = /** @class */ (function () {
        function ContextImportService(config) {
            this.config = config;
            /** @type {?} */
            var configFileSizeMb = this.config.getConfig('importExport.clientSideFileSizeMaxMb');
            this.clientSideFileSizeMax =
                (configFileSizeMb ? configFileSizeMb : 30) * Math.pow(1024, 2);
        }
        /**
         * @param {?} file
         * @return {?}
         */
        ContextImportService.prototype.import = /**
         * @param {?} file
         * @return {?}
         */
            function (file) {
                return this.importAsync(file);
            };
        /**
         * @private
         * @param {?} file
         * @return {?}
         */
        ContextImportService.prototype.getFileImporter = /**
         * @private
         * @param {?} file
         * @return {?}
         */
            function (file) {
                /** @type {?} */
                var extension = getFileExtension(file);
                /** @type {?} */
                var mimeType = file.type;
                /** @type {?} */
                var allowedMimeTypes = __spread(ContextImportService.allowedMimeTypes);
                /** @type {?} */
                var allowedExtensions = ContextImportService.allowedExtensions;
                if (allowedMimeTypes.indexOf(mimeType) < 0 &&
                    allowedExtensions.indexOf(extension) < 0) {
                    return undefined;
                }
                else if (mimeType === 'application/json' ||
                    extension === ContextImportService.allowedExtensions) {
                    return this.importFile;
                }
                return undefined;
            };
        /**
         * @private
         * @param {?} file
         * @return {?}
         */
        ContextImportService.prototype.importAsync = /**
         * @private
         * @param {?} file
         * @return {?}
         */
            function (file) {
                var _this = this;
                /** @type {?} */
                var doImport = ( /**
                 * @param {?} observer
                 * @return {?}
                 */function (observer) {
                    if (file.size >= _this.clientSideFileSizeMax) {
                        observer.error(new ImportSizeError());
                        return;
                    }
                    /** @type {?} */
                    var importer = _this.getFileImporter(file);
                    if (importer === undefined) {
                        observer.error(new ImportInvalidFileError());
                        return;
                    }
                    importer.call(_this, file, observer);
                });
                return new rxjs.Observable(doImport);
            };
        /**
         * @private
         * @param {?} file
         * @param {?} observer
         * @return {?}
         */
        ContextImportService.prototype.importFile = /**
         * @private
         * @param {?} file
         * @param {?} observer
         * @return {?}
         */
            function (file, observer) {
                var _this = this;
                /** @type {?} */
                var reader = new FileReader();
                reader.onload = ( /**
                 * @param {?} event
                 * @return {?}
                 */function (event) {
                    try {
                        /** @type {?} */
                        var context = _this.parseContextFromFile(file, event.target.result);
                        observer.next(context);
                    }
                    catch (e) {
                        observer.error(new ImportUnreadableFileError());
                    }
                    observer.complete();
                });
                reader.onerror = ( /**
                 * @param {?} evt
                 * @return {?}
                 */function (evt) {
                    observer.error(new ImportUnreadableFileError());
                });
                reader.readAsText(file, 'UTF-8');
            };
        /**
         * @private
         * @param {?} file
         * @param {?} data
         * @return {?}
         */
        ContextImportService.prototype.parseContextFromFile = /**
         * @private
         * @param {?} file
         * @param {?} data
         * @return {?}
         */
            function (file, data) {
                /** @type {?} */
                var context = JSON.parse(data);
                return context;
            };
        ContextImportService.allowedMimeTypes = ['application/json'];
        ContextImportService.allowedExtensions = 'json';
        ContextImportService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        ContextImportService.ctorParameters = function () {
            return [
                { type: i1$1.ConfigService }
            ];
        };
        /** @nocollapse */ ContextImportService.ngInjectableDef = i0.defineInjectable({ factory: function ContextImportService_Factory() { return new ContextImportService(i0.inject(i1$1.ConfigService)); }, token: ContextImportService, providedIn: "root" });
        return ContextImportService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ContextExportService = /** @class */ (function () {
        function ContextExportService() {
        }
        /**
         * @param {?} res
         * @return {?}
         */
        ContextExportService.prototype.export = /**
         * @param {?} res
         * @return {?}
         */
            function (res) {
                return this.exportAsync(res);
            };
        /**
         * @protected
         * @param {?} res
         * @return {?}
         */
        ContextExportService.prototype.exportAsync = /**
         * @protected
         * @param {?} res
         * @return {?}
         */
            function (res) {
                var _this = this;
                /** @type {?} */
                var doExport = ( /**
                 * @param {?} observer
                 * @return {?}
                 */function (observer) {
                    /** @type {?} */
                    var nothingToExport = _this.nothingToExport(res);
                    if (nothingToExport === true) {
                        observer.error(new ExportNothingToExportError());
                        return;
                    }
                    /** @type {?} */
                    var contextJSON = JSON.stringify(res);
                    utils.downloadContent(contextJSON, 'text/json;charset=utf-8', res.uri + ".json");
                    observer.complete();
                });
                return new rxjs.Observable(doExport);
            };
        /**
         * @protected
         * @param {?} res
         * @return {?}
         */
        ContextExportService.prototype.nothingToExport = /**
         * @protected
         * @param {?} res
         * @return {?}
         */
            function (res) {
                if (res.map === undefined) {
                    return true;
                }
                return false;
            };
        ContextExportService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */ ContextExportService.ngInjectableDef = i0.defineInjectable({ factory: function ContextExportService_Factory() { return new ContextExportService(); }, token: ContextExportService, providedIn: "root" });
        return ContextExportService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ContextImportExportComponent = /** @class */ (function () {
        function ContextImportExportComponent(contextImportService, contextExportService, languageService, messageService, formBuilder, config, contextService) {
            this.contextImportService = contextImportService;
            this.contextExportService = contextExportService;
            this.languageService = languageService;
            this.messageService = messageService;
            this.formBuilder = formBuilder;
            this.config = config;
            this.contextService = contextService;
            this.inputProj = 'EPSG:4326';
            this.loading$ = new rxjs.BehaviorSubject(false);
            this.forceNaming = false;
            this.activeImportExport = 'import';
            this.buildForm();
        }
        /**
         * @return {?}
         */
        ContextImportExportComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var configFileSizeMb = this.config.getConfig('importExport.clientSideFileSizeMaxMb');
                this.clientSideFileSizeMax =
                    (configFileSizeMb ? configFileSizeMb : 30) * Math.pow(1024, 2);
                this.fileSizeMb = this.clientSideFileSizeMax / Math.pow(1024, 2);
                this.layerList = this.contextService.getContextLayers(this.map);
            };
        /**
         * @param {?} files
         * @return {?}
         */
        ContextImportExportComponent.prototype.importFiles = /**
         * @param {?} files
         * @return {?}
         */
            function (files) {
                var _this = this;
                var e_1, _a;
                this.loading$.next(true);
                var _loop_1 = function (file) {
                    this_1.contextImportService.import(file).subscribe(( /**
                     * @param {?} context
                     * @return {?}
                     */function (context) { return _this.onFileImportSuccess(file, context); }), ( /**
                     * @param {?} error
                     * @return {?}
                     */function (error) { return _this.onFileImportError(file, error); }), ( /**
                     * @return {?}
                     */function () {
                        _this.loading$.next(false);
                    }));
                };
                var this_1 = this;
                try {
                    for (var files_1 = __values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
                        var file = files_1_1.value;
                        _loop_1(file);
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (files_1_1 && !files_1_1.done && (_a = files_1.return))
                            _a.call(files_1);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
            };
        /**
         * @param {?} contextOptions
         * @return {?}
         */
        ContextImportExportComponent.prototype.handleExportFormSubmit = /**
         * @param {?} contextOptions
         * @return {?}
         */
            function (contextOptions) {
                var _this = this;
                this.loading$.next(true);
                this.res = this.contextService.getContextFromLayers(this.map, contextOptions.layers, contextOptions.name);
                this.res.imported = true;
                this.contextExportService
                    .export(this.res)
                    .subscribe(( /**
             * @return {?}
             */function () { }), ( /**
                 * @param {?} error
                 * @return {?}
                 */function (error) { return _this.onFileExportError(error); }), ( /**
                 * @return {?}
                 */function () {
                    _this.onFileExportSuccess();
                    _this.loading$.next(false);
                }));
            };
        /**
         * @private
         * @return {?}
         */
        ContextImportExportComponent.prototype.buildForm = /**
         * @private
         * @return {?}
         */
            function () {
                this.form = this.formBuilder.group({
                    layers: ['', [forms.Validators.required]],
                    name: ['', [forms.Validators.required]]
                });
            };
        /**
         * @private
         * @param {?} file
         * @param {?} context
         * @return {?}
         */
        ContextImportExportComponent.prototype.onFileImportSuccess = /**
         * @private
         * @param {?} file
         * @param {?} context
         * @return {?}
         */
            function (file, context) {
                handleFileImportSuccess(file, context, this.messageService, this.languageService, this.contextService);
            };
        /**
         * @private
         * @param {?} file
         * @param {?} error
         * @return {?}
         */
        ContextImportExportComponent.prototype.onFileImportError = /**
         * @private
         * @param {?} file
         * @param {?} error
         * @return {?}
         */
            function (file, error) {
                this.loading$.next(false);
                handleFileImportError(file, error, this.messageService, this.languageService, this.fileSizeMb);
            };
        /**
         * @private
         * @param {?} error
         * @return {?}
         */
        ContextImportExportComponent.prototype.onFileExportError = /**
         * @private
         * @param {?} error
         * @return {?}
         */
            function (error) {
                this.loading$.next(false);
                handleFileExportError(error, this.messageService, this.languageService);
            };
        /**
         * @private
         * @return {?}
         */
        ContextImportExportComponent.prototype.onFileExportSuccess = /**
         * @private
         * @return {?}
         */
            function () {
                handleFileExportSuccess(this.messageService, this.languageService);
            };
        /**
         * @param {?} e
         * @return {?}
         */
        ContextImportExportComponent.prototype.selectAll = /**
         * @param {?} e
         * @return {?}
         */
            function (e) {
                if (e._selected) {
                    this.form.controls.layers.setValue(this.layerList);
                    e._selected = true;
                }
                if (e._selected === false) {
                    this.form.controls.layers.setValue([]);
                }
            };
        /**
         * @param {?} event
         * @return {?}
         */
        ContextImportExportComponent.prototype.onImportExportChange = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.activeImportExport = event.value;
            };
        ContextImportExportComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-context-import-export',
                        template: "<div class=\"import-export-toggle mat-typography\">\r\n    <mat-button-toggle-group\r\n          [value]=\"activeImportExport\"\r\n          (change)=\"onImportExportChange($event)\">\r\n          <mat-button-toggle [value]=\"'import'\">\r\n            {{'igo.geo.importExportForm.importTabTitle' | translate}}\r\n          </mat-button-toggle>\r\n          <mat-button-toggle [value]=\"'export'\">\r\n            {{'igo.geo.importExportForm.exportTabTitle' | translate}}\r\n          </mat-button-toggle>\r\n    </mat-button-toggle-group>\r\n</div>\r\n\r\n<div *ngIf=\"activeImportExport === 'import'\">\r\n    <form class=\"igo-form\">\r\n        <div class=\"igo-form-button-group\">\r\n            <button mat-raised-button type=\"button\" (click)=\"fileInput.click()\" [disabled]=\"loading$ | async\">\r\n                {{'igo.geo.importExportForm.importButton' | translate}}\r\n            </button>\r\n            <igo-spinner [shown]=\"loading$ | async\"></igo-spinner>\r\n            <input\r\n                #fileInput\r\n                type=\"file\"\r\n                [style.display]=\"'none'\"\r\n                (click)=\"fileInput.value = null\"\r\n                (change)=\"importFiles($event.target.files)\">\r\n        </div>\r\n    </form>\r\n    <section class=\"mat-typography\">\r\n        <h4>{{'igo.geo.importExportForm.importClarifications' | translate}}</h4>\r\n            <ul>\r\n                <li>{{'igo.geo.importExportForm.importSizeMax' | translate: {size: fileSizeMb} }}</li>\r\n            </ul>\r\n    </section>\r\n</div>\r\n\r\n\r\n<form class=\"igo-form\" *ngIf=\"activeImportExport === 'export'\" [formGroup]=\"form\">\r\n    <div class=\"igo-input-container\">\r\n        <mat-form-field class=\"example-full-width\">\r\n            <mat-label>{{'igo.context.contextImportExport.export.exportContextName' | translate}}</mat-label>\r\n            <input formControlName=\"name\" matInput [value]=\"\">\r\n        </mat-form-field>\r\n    </div>\r\n    <div class=\"igo-input-container\">\r\n        <mat-form-field>\r\n            <mat-label>{{'igo.context.contextImportExport.export.exportPlaceHolder' | translate}}</mat-label>\r\n            <mat-select formControlName=\"layers\" multiple>\r\n                <mat-option [value]=\"1\" (click)=\"selectAll(e)\" #e>\r\n                    {{'igo.context.contextImportExport.export.exportSelectAll' | translate}}\r\n                </mat-option>\r\n                <mat-divider></mat-divider>\r\n                <mat-option *ngFor=\"let layer of layerList\" [value]=\"layer\">{{layer.title}}</mat-option>\r\n            </mat-select>\r\n        </mat-form-field>\r\n    </div>\r\n    <div class=\"igo-form-button-group\">\r\n        <button\r\n            mat-raised-button\r\n            type=\"button\"\r\n            [disabled]=\"!form.valid || (loading$ | async)\"\r\n            (click)=\"handleExportFormSubmit(form.value)\">\r\n            {{'igo.geo.importExportForm.exportButton' | translate}}\r\n        </button>\r\n        <igo-spinner [shown]=\"loading$ | async\"></igo-spinner>\r\n    </div>\r\n</form>\r\n",
                        styles: [".import-export-toggle{padding:10px;text-align:center}.import-export-toggle mat-button-toggle-group{width:100%}.import-export-toggle mat-button-toggle-group mat-button-toggle{width:50%}.igo-input-container{padding:10px}.igo-input-container mat-form-field{width:100%}h4{padding:0 5px}.igo-form{padding:15px 5px}.igo-form-button-group{text-align:center;padding-top:10px}igo-spinner{position:absolute;padding-left:10px}"]
                    }] }
        ];
        /** @nocollapse */
        ContextImportExportComponent.ctorParameters = function () {
            return [
                { type: ContextImportService },
                { type: ContextExportService },
                { type: i1$1.LanguageService },
                { type: i1$1.MessageService },
                { type: forms.FormBuilder },
                { type: i1$1.ConfigService },
                { type: ContextService }
            ];
        };
        ContextImportExportComponent.propDecorators = {
            map: [{ type: i0.Input }]
        };
        return ContextImportExportComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IgoContextImportExportModule = /** @class */ (function () {
        function IgoContextImportExportModule() {
        }
        /**
         * @return {?}
         */
        IgoContextImportExportModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: IgoContextImportExportModule
                };
            };
        IgoContextImportExportModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                            common.CommonModule,
                            material.MatButtonModule,
                            material.MatButtonToggleModule,
                            material.MatDividerModule,
                            material.MatTabsModule,
                            material.MatSelectModule,
                            material.MatOptionModule,
                            material.MatFormFieldModule,
                            material.MatInputModule,
                            material.MatCheckboxModule,
                            i1$1.IgoLanguageModule,
                            common$1.IgoSpinnerModule,
                            material.MatTooltipModule,
                        ],
                        exports: [
                            ContextImportExportComponent
                        ],
                        declarations: [
                            ContextImportExportComponent
                        ]
                    },] }
        ];
        return IgoContextImportExportModule;
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
                        template: "<h1 mat-dialog-title class=\"mat-typography\">{{ 'igo.context.bookmarkButton.dialog.title' |\u00A0translate }}</h1>\r\n<div mat-dialog-content class=\"mat-typography\">\r\n  <mat-form-field>\r\n    <input matInput required autocomplete=\"off\"\r\n      maxlength=\"128\"\r\n      [placeholder]=\"'igo.context.bookmarkButton.dialog.placeholder' |\u00A0translate\"\r\n      [(ngModel)]=\"title\">\r\n  </mat-form-field>\r\n</div>\r\n<div mat-dialog-actions>\r\n  <button mat-button color=\"primary\"\r\n         [disabled]=\"!title\"\r\n         (click)=\"dialogRef.close(title)\">\r\n    {{'igo.common.confirmDialog.confirmBtn' | translate}}\r\n  </button>\r\n  <button mat-button\r\n          (click)=\"dialogRef.close(false)\">\r\n    {{'igo.common.confirmDialog.cancelBtn' |\u00A0translate}}\r\n  </button>\r\n</div>\r\n"
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
                if (!this.component.view || viewContext.keepCurrentView !== true) {
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
                { type: geo.MapBrowserComponent },
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
        function LayerContextDirective(component, contextService, layerService, configService, styleListService, styleService, route) {
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
                    var queryParams$$_1 = this.route.queryParams.subscribe(( /**
                     * @param {?} params
                     * @return {?}
                     */function (params) {
                        if (Object.keys(params).length > 0) {
                            _this.queryParams = params;
                            queryParams$$_1.unsubscribe();
                        }
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
                if (this.removeLayersOnContextChange === true) {
                    this.map.removeAllLayers();
                }
                else {
                    this.map.removeLayers(this.contextLayers);
                }
                this.contextLayers = [];
                /** @type {?} */
                var layersAndIndex$ = rxjs.merge.apply(void 0, __spread(context.layers.map(( /**
                 * @param {?} layerOptions
                 * @param {?} index
                 * @return {?}
                 */function (layerOptions, index) {
                    return _this.layerService.createAsyncLayer(layerOptions);
                }))));
                layersAndIndex$
                    .pipe(operators.buffer(layersAndIndex$.pipe(operators.debounceTime(500))))
                    .subscribe(( /**
             * @param {?} layers
             * @return {?}
             */function (layers) {
                    layers = layers
                        .filter(( /**
                 * @param {?} layer
                 * @return {?}
                 */function (layer) { return layer !== undefined; }))
                        .map(( /**
                 * @param {?} layer
                 * @return {?}
                 */function (layer) {
                        layer.visible = _this.computeLayerVisibilityFromUrl(layer);
                        layer.zIndex = layer.zIndex;
                        return layer;
                    }));
                    _this.contextLayers.concat(layers);
                    _this.map.addLayers(layers);
                    if (context.extraFeatures) {
                        context.extraFeatures.forEach(( /**
                         * @param {?} featureCollection
                         * @return {?}
                         */function (featureCollection) {
                            /** @type {?} */
                            var format = new GeoJSON();
                            /** @type {?} */
                            var title = featureCollection.name;
                            featureCollection = JSON.stringify(featureCollection);
                            featureCollection = format.readFeatures(featureCollection, {
                                dataProjection: 'EPSG:4326',
                                featureProjection: 'EPSG:3857'
                            });
                            if (!_this.configService.getConfig('importWithStyle')) {
                                addImportedFeaturesToMap(featureCollection, _this.map, title);
                            }
                            else {
                                addImportedFeaturesStyledToMap(featureCollection, _this.map, title, _this.styleListService, _this.styleService);
                            }
                        }));
                    }
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
                { type: geo.MapBrowserComponent },
                { type: ContextService },
                { type: geo.LayerService },
                { type: i1$1.ConfigService },
                { type: geo.StyleListService },
                { type: geo.StyleService },
                { type: i1$1.RouteService, decorators: [{ type: i0.Optional }] }
            ];
        };
        LayerContextDirective.propDecorators = {
            removeLayersOnContextChange: [{ type: i0.Input }]
        };
        return LayerContextDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var ContextListControlsEnum = {
        always: 'always',
        never: 'never',
        default: 'default',
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ContextListComponent = /** @class */ (function () {
        function ContextListComponent(cdRef, contextService, auth, dialog, languageService, storageService) {
            this.cdRef = cdRef;
            this.contextService = contextService;
            this.auth = auth;
            this.dialog = dialog;
            this.languageService = languageService;
            this.storageService = storageService;
            this.contextsInitial = { ours: [] };
            this.contexts$ = new rxjs.BehaviorSubject(this.contextsInitial);
            this.change$ = new rxjs.ReplaySubject(1);
            this._contexts = { ours: [] };
            this.collapsed = [];
            this.select = new i0.EventEmitter();
            this.unselect = new i0.EventEmitter();
            this.edit = new i0.EventEmitter();
            this.delete = new i0.EventEmitter();
            this.save = new i0.EventEmitter();
            this.clone = new i0.EventEmitter();
            this.create = new i0.EventEmitter();
            this.hide = new i0.EventEmitter();
            this.show = new i0.EventEmitter();
            this.showHiddenContexts = new i0.EventEmitter();
            this.favorite = new i0.EventEmitter();
            this.managePermissions = new i0.EventEmitter();
            this.manageTools = new i0.EventEmitter();
            this.filterPermissionsChanged = new i0.EventEmitter();
            this.titleMapping = {
                ours: 'igo.context.contextManager.ourContexts',
                shared: 'igo.context.contextManager.sharedContexts',
                public: 'igo.context.contextManager.publicContexts'
            };
            this.permissions = [];
            this.actionStore = new common$1.ActionStore([]);
            this.actionbarMode = common$1.ActionbarMode.Overlay;
            this.color = 'primary';
            this.showHidden = false;
            this._term = '';
            this._sortedAlpha = undefined;
            this.showContextFilter = ContextListControlsEnum.always;
            this.thresholdToFilter = 5;
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
                this.cdRef.detectChanges();
                this.next();
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
        Object.defineProperty(ContextListComponent.prototype, "map", {
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
        Object.defineProperty(ContextListComponent.prototype, "term", {
            get: /**
             * @return {?}
             */ function () {
                return this._term;
            },
            /**
             * Context filter term
             */
            set: /**
             * Context filter term
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._term = value;
                this.next();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContextListComponent.prototype, "sortedAlpha", {
            get: /**
             * @return {?}
             */ function () {
                return this._sortedAlpha;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._sortedAlpha = value;
                this.next();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        ContextListComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.change$$ = this.change$
                    .pipe(operators.debounce(( /**
             * @return {?}
             */function () {
                    return _this.contexts.ours.length === 0 ? rxjs.EMPTY : rxjs.timer(50);
                })))
                    .subscribe(( /**
             * @return {?}
             */function () {
                    _this.contexts$.next(_this.filterContextsList(_this.contexts));
                }));
                this.actionStore.load([
                    {
                        id: 'emptyContext',
                        title: this.languageService.translate.instant('igo.context.contextManager.emptyContext'),
                        icon: 'map-outline',
                        tooltip: this.languageService.translate.instant('igo.context.contextManager.emptyContextTooltip'),
                        handler: ( /**
                         * @return {?}
                         */function () {
                            _this.createContext(true);
                        })
                    },
                    {
                        id: 'contextFromMap',
                        title: this.languageService.translate.instant('igo.context.contextManager.contextMap'),
                        icon: 'map-check',
                        tooltip: this.languageService.translate.instant('igo.context.contextManager.contextMapTooltip'),
                        handler: ( /**
                         * @return {?}
                         */function () {
                            _this.createContext(false);
                        })
                    }
                ]);
            };
        /**
         * @private
         * @return {?}
         */
        ContextListComponent.prototype.next = /**
         * @private
         * @return {?}
         */
            function () {
                this.change$.next();
            };
        /**
         * @private
         * @param {?} contexts
         * @return {?}
         */
        ContextListComponent.prototype.filterContextsList = /**
         * @private
         * @param {?} contexts
         * @return {?}
         */
            function (contexts) {
                var _this = this;
                if (this.term === '') {
                    if (this.sortedAlpha) {
                        contexts = this.sortContextsList(contexts);
                    }
                    return contexts;
                }
                else {
                    /** @type {?} */
                    var ours = contexts.ours.filter(( /**
                     * @param {?} context
                     * @return {?}
                     */function (context) {
                        /** @type {?} */
                        var filterNormalized = _this.term
                            .toLowerCase()
                            .normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, '');
                        /** @type {?} */
                        var contextTitleNormalized = context.title
                            .toLowerCase()
                            .normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, '');
                        return contextTitleNormalized.includes(filterNormalized);
                    }));
                    /** @type {?} */
                    var updateContexts = {
                        ours: ours
                    };
                    if (this.contexts.public) {
                        /** @type {?} */
                        var publics = contexts.public.filter(( /**
                         * @param {?} context
                         * @return {?}
                         */function (context) {
                            /** @type {?} */
                            var filterNormalized = _this.term
                                .toLowerCase()
                                .normalize('NFD')
                                .replace(/[\u0300-\u036f]/g, '');
                            /** @type {?} */
                            var contextTitleNormalized = context.title
                                .toLowerCase()
                                .normalize('NFD')
                                .replace(/[\u0300-\u036f]/g, '');
                            return contextTitleNormalized.includes(filterNormalized);
                        }));
                        updateContexts.public = publics;
                    }
                    if (this.contexts.shared) {
                        /** @type {?} */
                        var shared = contexts.shared.filter(( /**
                         * @param {?} context
                         * @return {?}
                         */function (context) {
                            /** @type {?} */
                            var filterNormalized = _this.term
                                .toLowerCase()
                                .normalize('NFD')
                                .replace(/[\u0300-\u036f]/g, '');
                            /** @type {?} */
                            var contextTitleNormalized = context.title
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
            };
        /**
         * @return {?}
         */
        ContextListComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.change$$.unsubscribe();
            };
        /**
         * @return {?}
         */
        ContextListComponent.prototype.showFilter = /**
         * @return {?}
         */
            function () {
                switch (this.showContextFilter) {
                    case ContextListControlsEnum.always:
                        return true;
                    case ContextListControlsEnum.never:
                        return false;
                    default:
                        /** @type {?} */
                        var totalLength = this.contexts.ours.length;
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
            };
        /**
         * @param {?} contexts
         * @return {?}
         */
        ContextListComponent.prototype.sortContextsList = /**
         * @param {?} contexts
         * @return {?}
         */
            function (contexts) {
                var _this = this;
                if (contexts) {
                    /** @type {?} */
                    var contextsList = JSON.parse(JSON.stringify(contexts));
                    contextsList.ours.sort(( /**
                     * @param {?} a
                     * @param {?} b
                     * @return {?}
                     */function (a, b) {
                        if (_this.normalize(a.title) < _this.normalize(b.title)) {
                            return -1;
                        }
                        if (_this.normalize(a.title) > _this.normalize(b.title)) {
                            return 1;
                        }
                        return 0;
                    }));
                    if (contextsList.shared) {
                        contextsList.shared.sort(( /**
                         * @param {?} a
                         * @param {?} b
                         * @return {?}
                         */function (a, b) {
                            if (_this.normalize(a.title) < _this.normalize(b.title)) {
                                return -1;
                            }
                            if (_this.normalize(a.title) > _this.normalize(b.title)) {
                                return 1;
                            }
                            return 0;
                        }));
                    }
                    else if (contextsList.public) {
                        contextsList.public.sort(( /**
                         * @param {?} a
                         * @param {?} b
                         * @return {?}
                         */function (a, b) {
                            if (_this.normalize(a.title) < _this.normalize(b.title)) {
                                return -1;
                            }
                            if (_this.normalize(a.title) > _this.normalize(b.title)) {
                                return 1;
                            }
                            return 0;
                        }));
                    }
                    return contextsList;
                }
            };
        /**
         * @param {?} str
         * @return {?}
         */
        ContextListComponent.prototype.normalize = /**
         * @param {?} str
         * @return {?}
         */
            function (str) {
                return str
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .toLowerCase();
            };
        /**
         * @param {?} sortAlpha
         * @return {?}
         */
        ContextListComponent.prototype.toggleSort = /**
         * @param {?} sortAlpha
         * @return {?}
         */
            function (sortAlpha) {
                this.sortedAlpha = sortAlpha;
            };
        /**
         * @return {?}
         */
        ContextListComponent.prototype.clearFilter = /**
         * @return {?}
         */
            function () {
                this.term = '';
            };
        /**
         * @param {?=} empty
         * @return {?}
         */
        ContextListComponent.prototype.createContext = /**
         * @param {?=} empty
         * @return {?}
         */
            function (empty) {
                var _this = this;
                this.dialog
                    .open(BookmarkDialogComponent, { disableClose: false })
                    .afterClosed()
                    .subscribe(( /**
             * @param {?} title
             * @return {?}
             */function (title) {
                    if (title) {
                        _this.create.emit({ title: title, empty: empty });
                    }
                }));
            };
        /**
         * @param {?=} user
         * @return {?}
         */
        ContextListComponent.prototype.getPermission = /**
         * @param {?=} user
         * @return {?}
         */
            function (user) {
                if (user) {
                    /** @type {?} */
                    var permission = this.permissions.find(( /**
                     * @param {?} p
                     * @return {?}
                     */function (p) { return p.name === user.name; }));
                    return permission;
                }
            };
        /**
         * @param {?} user
         * @param {?=} parent
         * @return {?}
         */
        ContextListComponent.prototype.userSelection = /**
         * @param {?} user
         * @param {?=} parent
         * @return {?}
         */
            function (user, parent) {
                var e_1, _a, e_2, _b;
                /** @type {?} */
                var permission = this.getPermission(user);
                if (permission) {
                    permission.checked = !permission.checked;
                    this.storageService.set('contexts.permissions.' + permission.name, permission.checked);
                    permission.indeterminate = false;
                }
                if (parent) {
                    /** @type {?} */
                    var indeterminate = false;
                    try {
                        for (var _c = __values(parent.childs), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var c = _d.value;
                            /** @type {?} */
                            var cPermission = this.getPermission(c);
                            if (cPermission.checked !== permission.checked) {
                                indeterminate = true;
                                break;
                            }
                        }
                    }
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (_d && !_d.done && (_a = _c.return))
                                _a.call(_c);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
                    }
                    /** @type {?} */
                    var parentPermission = this.getPermission(parent);
                    if (parentPermission) {
                        parentPermission.checked = permission.checked;
                        this.storageService.set('contexts.permissions.' + parentPermission.name, permission.checked);
                        parentPermission.indeterminate = indeterminate;
                    }
                }
                if (user.childs) {
                    try {
                        for (var _e = __values(user.childs), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var c = _f.value;
                            /** @type {?} */
                            var childrenPermission = this.getPermission(c);
                            if (childrenPermission &&
                                childrenPermission.checked !== permission.checked) {
                                childrenPermission.checked = permission.checked;
                                this.storageService.set('contexts.permissions.' + childrenPermission.name, permission.checked);
                            }
                        }
                    }
                    catch (e_2_1) {
                        e_2 = { error: e_2_1 };
                    }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return))
                                _b.call(_e);
                        }
                        finally {
                            if (e_2)
                                throw e_2.error;
                        }
                    }
                }
                this.filterPermissionsChanged.emit(this.permissions);
            };
        /**
         * @param {?} context
         * @return {?}
         */
        ContextListComponent.prototype.hideContext = /**
         * @param {?} context
         * @return {?}
         */
            function (context) {
                context.hidden = true;
                if (!this.showHidden) {
                    /** @type {?} */
                    var contexts = { ours: [], shared: [], public: [] };
                    contexts.ours = this.contexts.ours.filter(( /**
                     * @param {?} c
                     * @return {?}
                     */function (c) { return c.id !== context.id; }));
                    contexts.shared = this.contexts.shared.filter(( /**
                     * @param {?} c
                     * @return {?}
                     */function (c) { return c.id !== context.id; }));
                    contexts.public = this.contexts.public.filter(( /**
                     * @param {?} c
                     * @return {?}
                     */function (c) { return c.id !== context.id; }));
                    this.contexts = contexts;
                }
                this.hide.emit(context);
            };
        /**
         * @param {?} context
         * @return {?}
         */
        ContextListComponent.prototype.showContext = /**
         * @param {?} context
         * @return {?}
         */
            function (context) {
                context.hidden = false;
                this.show.emit(context);
            };
        ContextListComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-context-list',
                        template: "<igo-list [navigation]=\"true\">\r\n  <mat-form-field *ngIf=\"showFilter()\" [ngClass]=\"auth.authenticated ? 'context-filter-min-width' : 'context-filter-max-width'\">\r\n    <input\r\n      matInput\r\n      type=\"text\"\r\n      [placeholder]=\"'igo.context.contextManager.filterPlaceHolder' | translate\"\r\n      [(ngModel)]=\"term\">\r\n    <button\r\n      mat-button\r\n      mat-icon-button\r\n      matSuffix\r\n      class=\"clear-button\"\r\n      *ngIf=\"term.length\"\r\n      aria-label=\"Clear\"\r\n      color=\"warn\"\r\n      (click)=\"clearFilter()\">\r\n      <mat-icon svgIcon=\"close\"></mat-icon>\r\n    </button>\r\n  </mat-form-field>\r\n\r\n  <button\r\n  *ngIf=\"!sortedAlpha\"\r\n  mat-icon-button\r\n  [matTooltip]=\"'igo.context.contextManager.sortAlphabetically' | translate\"\r\n  matTooltipShowDelay=\"500\"\r\n  (click)=\"toggleSort(true)\">\r\n  <mat-icon color=\"primary\" svgIcon=\"sort-alphabetical\"></mat-icon>\r\n  </button>\r\n  <button\r\n    *ngIf=\"sortedAlpha\"\r\n    mat-icon-button\r\n    [matTooltip]=\"'igo.context.contextManager.sortContextOrder' | translate\"\r\n    matTooltipShowDelay=\"500\"\r\n    (click)=\"toggleSort(false)\">\r\n    <mat-icon color=\"warn\" svgIcon=\"sort-variant-remove\"></mat-icon>\r\n  </button>\r\n\r\n  <igo-actionbar *ngIf=\"auth.authenticated\"\r\n    class=\"add-context-button\"\r\n    [iconColor]=\"color\"\r\n    [store]=\"actionStore\"\r\n    [withIcon]=\"true\"\r\n    icon=\"plus\"\r\n    [withTitle]=\"actionbarMode === 'overlay'\"\r\n    [horizontal]=\"false\"\r\n    [mode]=\"actionbarMode\">\r\n  </igo-actionbar>\r\n\r\n  <button *ngIf=\"auth.authenticated && users && users.length\"\r\n    mat-icon-button\r\n    [matTooltip]=\"'igo.context.contextManager.filterUser' | translate\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matMenuTriggerFor]=\"accountMenu\">\r\n    <mat-icon color=\"primary\" svgIcon=\"filter-menu\"></mat-icon>\r\n  </button>\r\n\r\n  <mat-menu #accountMenu=\"matMenu\">\r\n    <ng-container *ngFor=\"let user of users\">\r\n      <span class=\"profilsMenu\">\r\n        <mat-checkbox\r\n          class=\"mat-menu-item\"\r\n          [checked]=\"getPermission(user).checked\"\r\n          [indeterminate]=\"getPermission(user).indeterminate\"\r\n          (click)=\"$event.stopPropagation()\"\r\n          (change)=\"userSelection(user)\">\r\n        </mat-checkbox>\r\n        <button *ngIf=\"user.childs\"\r\n          [matMenuTriggerFor]=\"subAccountMenu\"\r\n          mat-menu-item>\r\n          {{user.title}}\r\n        </button>\r\n        <button\r\n          mat-menu-item\r\n          *ngIf=\"!user.childs\">\r\n          {{user.title}}\r\n        </button>\r\n      </span>\r\n\r\n      <mat-menu #subAccountMenu=\"matMenu\">\r\n        <mat-checkbox *ngFor=\"let child of user.childs\"\r\n          class=\"mat-menu-item\"\r\n          [checked]=\"getPermission(child).checked\"\r\n          (click)=\"$event.stopPropagation()\"\r\n          (change)=\"userSelection(child, user)\">\r\n          {{child.title}}\r\n        </mat-checkbox>\r\n      </mat-menu>\r\n    </ng-container>\r\n\r\n    <span class=\"profilsMenu\">\r\n      <mat-checkbox\r\n        class=\"mat-menu-item\"\r\n        [checked]=\"showHidden\"\r\n        (click)=\"$event.stopPropagation()\"\r\n        (change)=\"showHiddenContexts.emit()\">\r\n      </mat-checkbox>\r\n      <button mat-menu-item>\r\n        {{ 'igo.context.contextManager.showHidden' | translate }}\r\n      </button>\r\n    </span>\r\n  </mat-menu>\r\n\r\n  <ng-template ngFor let-groupContexts [ngForOf]=\"contexts$ | async | keyvalue\">\r\n\r\n    <igo-collapsible *ngIf=\"groupContexts.value.length && auth.authenticated\" [title]=\"titleMapping[groupContexts.key] | translate\"\r\n      [collapsed]=\"collapsed[titleMapping[groupContexts.key]]\" (toggle)=\"collapsed[titleMapping[groupContexts.key]] = $event\">\r\n\r\n      <ng-template ngFor let-context [ngForOf]=\"groupContexts.value\">\r\n        <igo-context-item\r\n          igoListItem\r\n          color=\"accent\"\r\n          [selected]=\"selectedContext && selectedContext.uri === context.uri\"\r\n          [context]=\"context\"\r\n          [default]=\"context.id && this.defaultContextId && this.defaultContextId === context.id\"\r\n          (edit)=\"edit.emit(context)\"\r\n          (delete)=\"delete.emit(context)\"\r\n          (clone)=\"clone.emit(context)\"\r\n          (save)=\"save.emit(context)\"\r\n          (hide)=\"hideContext(context)\"\r\n          (show)=\"showContext(context)\"\r\n          (favorite)=\"favorite.emit(context)\"\r\n          (manageTools)=\"manageTools.emit(context)\"\r\n          (managePermissions)=\"managePermissions.emit(context)\"\r\n          (select)=\"select.emit(context)\"\r\n          (unselect)=\"unselect.emit(context)\">\r\n        </igo-context-item>\r\n      </ng-template>\r\n\r\n    </igo-collapsible>\r\n\r\n    <ng-template *ngIf=\"groupContexts.value.length && !auth.authenticated\" ngFor let-context [ngForOf]=\"groupContexts.value\">\r\n      <igo-context-item\r\n        igoListItem\r\n        color=\"accent\"\r\n        [selected]=\"selectedContext && selectedContext.uri === context.uri\"\r\n        [context]=\"context\"\r\n        [default]=\"this.defaultContextId === context.id\"\r\n        (select)=\"select.emit(context)\"\r\n        (unselect)=\"unselect.emit(context)\">\r\n      </igo-context-item>\r\n    </ng-template>\r\n\r\n  </ng-template>\r\n</igo-list>\r\n",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        styles: [".context-filter-max-width{width:calc(100% - 100px);margin:5px;padding-left:6px}.context-filter-min-width{width:calc(100% - 135px);margin:5px;padding-left:6px}.clear-button{padding-right:5px}mat-form-field{height:40px}.profilsMenu{display:-webkit-box;display:flex}.profilsMenu>mat-checkbox{width:8px}.add-context-button{margin:0;width:40px;display:-webkit-inline-box;display:inline-flex}"]
                    }] }
        ];
        /** @nocollapse */
        ContextListComponent.ctorParameters = function () {
            return [
                { type: i0.ChangeDetectorRef },
                { type: ContextService },
                { type: i2.AuthService },
                { type: material.MatDialog },
                { type: i1$1.LanguageService },
                { type: i1$1.StorageService }
            ];
        };
        ContextListComponent.propDecorators = {
            contexts: [{ type: i0.Input }],
            selectedContext: [{ type: i0.Input }],
            map: [{ type: i0.Input }],
            defaultContextId: [{ type: i0.Input }],
            select: [{ type: i0.Output }],
            unselect: [{ type: i0.Output }],
            edit: [{ type: i0.Output }],
            delete: [{ type: i0.Output }],
            save: [{ type: i0.Output }],
            clone: [{ type: i0.Output }],
            create: [{ type: i0.Output }],
            hide: [{ type: i0.Output }],
            show: [{ type: i0.Output }],
            showHiddenContexts: [{ type: i0.Output }],
            favorite: [{ type: i0.Output }],
            managePermissions: [{ type: i0.Output }],
            manageTools: [{ type: i0.Output }],
            filterPermissionsChanged: [{ type: i0.Output }],
            term: [{ type: i0.Input }]
        };
        return ContextListComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ContextListBindingDirective = /** @class */ (function () {
        function ContextListBindingDirective(component, contextService, mapService, languageService, confirmDialogService, messageService, auth, storageService) {
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
                var msgSuccess = ( /**
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
                });
                if (context.imported) {
                    contextFromMap.title = context.title;
                    this.contextService.delete(context.id, true);
                    this.contextService.create(contextFromMap).subscribe(( /**
                     * @param {?} contextCreated
                     * @return {?}
                     */function (contextCreated) {
                        _this.contextService.loadContext(contextCreated.uri);
                        msgSuccess();
                    }));
                    return;
                }
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
                    msgSuccess();
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
                        _this.contextService
                            .delete(context.id, context.imported)
                            .subscribe(( /**
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
         * @param {?} opts
         * @return {?}
         */
        ContextListBindingDirective.prototype.onCreate = /**
         * @param {?} opts
         * @return {?}
         */
            function (opts) {
                var _this = this;
                var title = opts.title, empty = opts.empty;
                /** @type {?} */
                var context = this.contextService.getContextFromMap(this.component.map, empty);
                context.title = title;
                this.contextService.create(context).subscribe(( /**
                 * @return {?}
                 */function () {
                    /** @type {?} */
                    var translate = _this.languageService.translate;
                    /** @type {?} */
                    var titleD = translate.instant('igo.context.bookmarkButton.dialog.createTitle');
                    /** @type {?} */
                    var message = translate.instant('igo.context.bookmarkButton.dialog.createMsg', {
                        value: context.title
                    });
                    _this.messageService.success(message, titleD);
                    _this.contextService.loadContext(context.uri);
                }));
            };
        /**
         * @return {?}
         */
        ContextListBindingDirective.prototype.loadContexts = /**
         * @return {?}
         */
            function () {
                var e_1, _a;
                /** @type {?} */
                var permissions = ['none'];
                try {
                    for (var _b = __values(this.component.permissions), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var p = _c.value;
                        if (p.checked === true || p.indeterminate === true) {
                            permissions.push(p.name);
                        }
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return))
                            _a.call(_b);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
                this.component.showHidden
                    ? this.contextService.loadContexts(permissions, true)
                    : this.contextService.loadContexts(permissions, false);
            };
        /**
         * @return {?}
         */
        ContextListBindingDirective.prototype.showHiddenContexts = /**
         * @return {?}
         */
            function () {
                this.component.showHidden = !this.component.showHidden;
                this.storageService.set('contexts.showHidden', this.component.showHidden);
                this.loadContexts();
            };
        /**
         * @param {?} context
         * @return {?}
         */
        ContextListBindingDirective.prototype.onShowContext = /**
         * @param {?} context
         * @return {?}
         */
            function (context) {
                this.contextService.showContext(context.id).subscribe();
            };
        /**
         * @param {?} context
         * @return {?}
         */
        ContextListBindingDirective.prototype.onHideContext = /**
         * @param {?} context
         * @return {?}
         */
            function (context) {
                this.contextService.hideContext(context.id).subscribe();
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
                this.component.showHidden = ( /** @type {?} */(this.storageService.get('contexts.showHidden')));
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
                this.auth.authenticate$.subscribe(( /**
                 * @param {?} authenticate
                 * @return {?}
                 */function (authenticate) {
                    if (authenticate) {
                        _this.contextService.getProfilByUser().subscribe(( /**
                         * @param {?} profils
                         * @return {?}
                         */function (profils) {
                            var e_2, _a, e_3, _b;
                            _this.component.users = profils;
                            _this.component.permissions = [];
                            /** @type {?} */
                            var profilsAcc = _this.component.users.reduce(( /**
                             * @param {?} acc
                             * @param {?} cur
                             * @return {?}
                             */function (acc, cur) {
                                acc = acc.concat(cur);
                                acc = cur.childs ? acc.concat(cur.childs) : acc;
                                return acc;
                            }), []);
                            try {
                                for (var profilsAcc_1 = __values(profilsAcc), profilsAcc_1_1 = profilsAcc_1.next(); !profilsAcc_1_1.done; profilsAcc_1_1 = profilsAcc_1.next()) {
                                    var user = profilsAcc_1_1.value;
                                    /** @type {?} */
                                    var permission = {
                                        name: user.name,
                                        checked: ( /** @type {?} */(_this.storageService.get('contexts.permissions.' + user.name)))
                                    };
                                    _this.component.permissions.push(permission);
                                }
                            }
                            catch (e_2_1) {
                                e_2 = { error: e_2_1 };
                            }
                            finally {
                                try {
                                    if (profilsAcc_1_1 && !profilsAcc_1_1.done && (_a = profilsAcc_1.return))
                                        _a.call(profilsAcc_1);
                                }
                                finally {
                                    if (e_2)
                                        throw e_2.error;
                                }
                            }
                            /** @type {?} */
                            var permissions = ['none'];
                            try {
                                for (var _c = __values(_this.component.permissions), _d = _c.next(); !_d.done; _d = _c.next()) {
                                    var p = _d.value;
                                    if (p.checked === true || p.indeterminate === true) {
                                        permissions.push(p.name);
                                    }
                                }
                            }
                            catch (e_3_1) {
                                e_3 = { error: e_3_1 };
                            }
                            finally {
                                try {
                                    if (_d && !_d.done && (_b = _c.return))
                                        _b.call(_c);
                                }
                                finally {
                                    if (e_3)
                                        throw e_3.error;
                                }
                            }
                            _this.component.showHidden
                                ? _this.contextService.loadContexts(permissions, true)
                                : _this.contextService.loadContexts(permissions, false);
                        }));
                    }
                }));
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
                { type: geo.MapService },
                { type: i1$1.LanguageService },
                { type: common$1.ConfirmDialogService },
                { type: i1$1.MessageService },
                { type: i2.AuthService },
                { type: i1$1.StorageService }
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
            onClone: [{ type: i0.HostListener, args: ['clone', ['$event'],] }],
            onCreate: [{ type: i0.HostListener, args: ['create', ['$event'],] }],
            loadContexts: [{ type: i0.HostListener, args: ['filterPermissionsChanged',] }],
            showHiddenContexts: [{ type: i0.HostListener, args: ['showHiddenContexts',] }],
            onShowContext: [{ type: i0.HostListener, args: ['show', ['$event'],] }],
            onHideContext: [{ type: i0.HostListener, args: ['hide', ['$event'],] }]
        };
        return ContextListBindingDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ContextItemComponent = /** @class */ (function () {
        function ContextItemComponent(auth, storageService) {
            this.auth = auth;
            this.storageService = storageService;
            this.typePermission = TypePermission;
            this.color = 'primary';
            this.collapsed = true;
            this._default = false;
            this.edit = new i0.EventEmitter();
            this.delete = new i0.EventEmitter();
            this.save = new i0.EventEmitter();
            this.clone = new i0.EventEmitter();
            this.hide = new i0.EventEmitter();
            this.show = new i0.EventEmitter();
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
        Object.defineProperty(ContextItemComponent.prototype, "hidden", {
            get: /**
             * @return {?}
             */ function () {
                return this.context.hidden;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContextItemComponent.prototype, "canShare", {
            get: /**
             * @return {?}
             */ function () {
                return this.storageService.get('canShare') === true;
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
                        template: "<mat-list-item\r\n  class=\"mat-list-item\"\r\n  [ngClass]=\"{'mat-list-item-light': hidden}\">\r\n  <button mat-list-avatar\r\n    *ngIf=\"auth.authenticated\"\r\n    mat-icon-button\r\n    igoStopPropagation\r\n    [matTooltip]=\"auth.authenticated ? ('igo.context.contextManager.favorite' | translate) : ''\"\r\n    matTooltipShowDelay=\"500\"\r\n    [color]=\"default ? 'primary' : 'default'\"\r\n    (click)=\"favoriteClick(context)\">\r\n    <mat-icon *ngIf=\"!context.iconImage\" svgIcon=\"{{context.icon ? context.icon : context.scope === 'public' ? 'earth' : 'star'}}\"></mat-icon>\r\n    <img *ngIf=\"context.iconImage\" [src]=\"context.iconImage\">\r\n  </button>\r\n  <h4 matLine>{{context.title}}</h4>\r\n\r\n  <div *ngIf=\"auth.authenticated\"\r\n       igoStopPropagation\r\n       class=\"igo-actions-container\">\r\n\r\n     <button *ngIf=\"collapsed && selected && (context.permission === typePermission[typePermission.write] || context.imported)\"\r\n       mat-icon-button\r\n       [matTooltip]=\"'igo.context.contextManager.save' | translate\"\r\n       matTooltipShowDelay=\"500\"\r\n       [color]=\"color\"\r\n       (click)=\"save.emit(context)\">\r\n       <mat-icon svgIcon=\"content-save\"></mat-icon>\r\n     </button>\r\n\r\n    <div #actions class=\"igo-actions-expand-container\">\r\n\r\n      <button *ngIf=\"canShare && !context.imported\"\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.context.contextManager.managePermissions' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        [color]=\"color\"\r\n        (click)=\"managePermissions.emit(context)\">\r\n        <mat-icon svgIcon=\"account-arrow-right\"></mat-icon>\r\n      </button>\r\n\r\n      <!--button\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.context.contextManager.manageTools' | translate\"\r\n        [color]=\"color\"\r\n        (click)=\"manageTools.emit(context)\">\r\n        <mat-icon svgIcon=\"widgets\"></mat-icon>\r\n      </button-->\r\n\r\n      <button *ngIf=\"!context.imported\"\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.context.contextManager.clone' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        [color]=\"color\"\r\n        (click)=\"clone.emit(context)\">\r\n        <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n      </button>\r\n\r\n      <button *ngIf=\"context.permission === typePermission[typePermission.write] && !context.imported\"\r\n        mat-icon-button\r\n        [color]=\"color\"\r\n        [matTooltip]=\"'igo.context.contextManager.edit' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"edit.emit(context)\">\r\n        <mat-icon svgIcon=\"pencil\"></mat-icon>\r\n      </button>\r\n\r\n      <button *ngIf=\"!context.hidden && !context.imported\"\r\n        mat-icon-button\r\n        [color]=\"color\"\r\n        [matTooltip]=\"'igo.context.contextManager.hide' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"hide.emit(context)\">\r\n        <mat-icon svgIcon=\"eye\"></mat-icon>\r\n      </button>\r\n\r\n      <button *ngIf=\"context.hidden && !context.imported\"\r\n        mat-icon-button\r\n        [color]=\"color\"\r\n        [matTooltip]=\"'igo.context.contextManager.show' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"show.emit(context)\">\r\n        <mat-icon svgIcon=\"eye-off\"></mat-icon>\r\n      </button>\r\n\r\n      <button *ngIf=\"context.permission === typePermission[typePermission.write] || context.imported\"\r\n        mat-icon-button\r\n        color=\"warn\"\r\n        [matTooltip]=\"'igo.context.contextManager.delete' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"delete.emit(context)\">\r\n        <mat-icon svgIcon=\"delete\"></mat-icon>\r\n      </button>\r\n    </div>\r\n\r\n    <button\r\n      mat-icon-button\r\n      igoCollapse\r\n      [color]=\"color\"\r\n      [target]=\"actions\"\r\n      [collapsed]=collapsed\r\n      (click)=\"collapsed = !collapsed\">\r\n      <mat-icon svgIcon=\"dots-horizontal\"></mat-icon>\r\n    </button>\r\n\r\n  </div>\r\n\r\n</mat-list-item>\r\n",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        styles: [":host{overflow:hidden}.igo-actions-container{flex-shrink:0}.igo-actions-expand-container{display:-webkit-inline-box;display:inline-flex}mat-list-item>>>.mat-list-item-content .mat-list-text{padding:0}mat-icon.disabled{color:rgba(0,0,0,.38)}mat-list-item.mat-list-item-light>>>.mat-list-item-content{color:#969696}"]
                    }] }
        ];
        /** @nocollapse */
        ContextItemComponent.ctorParameters = function () {
            return [
                { type: i2.AuthService },
                { type: i1$1.StorageService }
            ];
        };
        ContextItemComponent.propDecorators = {
            context: [{ type: i0.Input }],
            default: [{ type: i0.Input }],
            selected: [{ type: i0.Input }],
            edit: [{ type: i0.Output }],
            delete: [{ type: i0.Output }],
            save: [{ type: i0.Output }],
            clone: [{ type: i0.Output }],
            hide: [{ type: i0.Output }],
            show: [{ type: i0.Output }],
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
        function ContextFormComponent(formBuilder, languageService, messageService) {
            this.formBuilder = formBuilder;
            this.languageService = languageService;
            this.messageService = messageService;
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
         * @return {?}
         */
        ContextFormComponent.prototype.copyTextToClipboard = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var text = this.prefix + '-' + this.form.value.uri.replace(' ', '');
                /** @type {?} */
                var successful = utils.Clipboard.copy(text);
                if (successful) {
                    /** @type {?} */
                    var translate = this.languageService.translate;
                    /** @type {?} */
                    var title = translate.instant('igo.context.contextManager.dialog.copyTitle');
                    /** @type {?} */
                    var msg = translate.instant('igo.context.contextManager.dialog.copyMsg');
                    this.messageService.success(msg, title);
                }
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
                        template: "<form class=\"igo-form\" [formGroup]=\"form\"\r\n  (ngSubmit)=\"handleFormSubmit(form.value)\">\r\n\r\n  <mat-form-field class=\"full-width\">\r\n    <input matInput required\r\n           maxlength=\"128\"\r\n           [placeholder]=\"'igo.context.contextManager.form.title' | translate\"\r\n           formControlName=\"title\">\r\n   <mat-error>\r\n    {{ 'igo.context.contextManager.form.titleRequired' | translate }}\r\n   </mat-error>\r\n  </mat-form-field>\r\n\r\n  <mat-form-field id=\"uriInput\" class=\"full-width\">\r\n    <span *ngIf=\"prefix\" class=\"prefix\">{{prefix}}-</span>\r\n    <span class=\"fieldWrapper\">\r\n      <input matInput\r\n           maxlength=\"64\"\r\n           floatLabel = \"always\"\r\n           [placeholder]=\"'igo.context.contextManager.form.uri' | translate\"\r\n           formControlName=\"uri\">\r\n    </span>\r\n  </mat-form-field>\r\n\r\n  <button\r\n    id=\"copyButton\"\r\n    type=\"button\"\r\n    mat-icon-button\r\n    tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"'igo.context.contextManager.form.copy' | translate\"\r\n    color=\"primary\"\r\n    (click)=\"copyTextToClipboard()\">\r\n    <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n  </button>\r\n\r\n  <div class=\"igo-form-button-group\">\r\n    <button\r\n      mat-raised-button\r\n      type=\"submit\"\r\n      [disabled]=\"!form.valid || disabled\">\r\n      {{ 'igo.context.contextManager.form.edit' | translate }}\r\n    </button>\r\n  </div>\r\n\r\n</form>\r\n",
                        styles: ["form{margin:10px}.full-width{width:100%}#uriInput .fieldWrapper{display:block;overflow:hidden}#uriInput .prefix{float:left}#copyButton{width:24px;float:right;position:relative;top:-58px;left:5px}"]
                    }] }
        ];
        /** @nocollapse */
        ContextFormComponent.ctorParameters = function () {
            return [
                { type: forms.FormBuilder },
                { type: i1$1.LanguageService },
                { type: i1$1.MessageService }
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
        function ContextEditComponent(cd) {
            this.cd = cd;
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
                this.refresh();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        ContextEditComponent.prototype.refresh = /**
         * @return {?}
         */
            function () {
                this.cd.detectChanges();
            };
        ContextEditComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-context-edit',
                        template: "<igo-context-form *ngIf=\"context\"\r\n   [btnSubmitText]=\"'igo.context.contextManager.save' | translate\"\r\n   [context]=\"context\"\r\n   (submitForm)=\"submitForm.emit($event)\">\r\n</igo-context-form>\r\n"
                    }] }
        ];
        /** @nocollapse */
        ContextEditComponent.ctorParameters = function () {
            return [
                { type: i0.ChangeDetectorRef }
            ];
        };
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
            this.submitSuccessed = new i0.EventEmitter();
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
                    _this.contextService.setEditedContext(undefined);
                    _this.submitSuccessed.emit(context);
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
            submitSuccessed: [{ type: i0.Output }],
            onEdit: [{ type: i0.HostListener, args: ['submitForm', ['$event'],] }]
        };
        return ContextEditBindingDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ContextPermissionsComponent = /** @class */ (function () {
        function ContextPermissionsComponent(formBuilder, cd, http, authService) {
            this.formBuilder = formBuilder;
            this.cd = cd;
            this.http = http;
            this.authService = authService;
            this._profils = [];
            this.baseUrlProfils = '/apis/igo2/profils-users?';
            this.formControl = new forms.FormControl();
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
                this.cd.detectChanges();
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
                this.cd.detectChanges();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContextPermissionsComponent.prototype, "profils", {
            get: /**
             * @return {?}
             */ function () {
                return this._profils;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._profils = value;
                this.cd.detectChanges();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContextPermissionsComponent.prototype, "canWrite", {
            get: /**
             * @return {?}
             */ function () {
                return this.context.permission === TypePermission[TypePermission.write];
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
                var _this = this;
                this.buildForm();
                this.formValueChanges$$ = this.formControl.valueChanges.subscribe(( /**
                 * @param {?} value
                 * @return {?}
                 */function (value) {
                    if (value.length) {
                        _this.http.get(_this.baseUrlProfils + 'q=' + value).subscribe(( /**
                         * @param {?} profils
                         * @return {?}
                         */function (profils) {
                            _this.profils = ( /** @type {?} */(profils));
                        }));
                        _this.profils.filter(( /**
                         * @param {?} profil
                         * @return {?}
                         */function (profil) {
                            /** @type {?} */
                            var filterNormalized = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                            /** @type {?} */
                            var profilTitleNormalized = profil.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                            /** @type {?} */
                            var profilNameNormalized = profil.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                            /** @type {?} */
                            var profilNormalized = profilNameNormalized + profilTitleNormalized;
                            return profilNormalized.includes(filterNormalized);
                        }));
                    }
                    else {
                        _this.profils = [];
                    }
                }));
            };
        /**
         * @param {?=} profil
         * @return {?}
         */
        ContextPermissionsComponent.prototype.displayFn = /**
         * @param {?=} profil
         * @return {?}
         */
            function (profil) {
                return profil ? profil.title : undefined;
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
        /**
         * @param {?} value
         * @return {?}
         */
        ContextPermissionsComponent.prototype.onProfilSelected = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                this.form.setValue({
                    profil: value.name,
                    typePermission: this.form.value.typePermission
                });
            };
        ContextPermissionsComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-context-permissions',
                        template: "<div *ngIf=\"context\">\r\n\r\n  <div *ngIf=\"!canWrite\" class=\"scopeForm\">\r\n    <h4>{{ 'igo.context.permission.readOnlyTitle' | translate }}</h4>\r\n    <p>{{ 'igo.context.permission.readOnlyMsg' | translate }}</p>\r\n  </div>\r\n\r\n  <div *ngIf=\"canWrite\" class=\"scopeForm\">\r\n    <mat-radio-group [(ngModel)]=\"context.scope\"\r\n                    (change)=\"scopeChanged.emit(context)\">\r\n      <mat-radio-button value=\"private\">\r\n        {{ 'igo.context.permission.scope.private' | translate }}\r\n      </mat-radio-button>\r\n      <mat-radio-button value=\"protected\">\r\n        {{ 'igo.context.permission.scope.shared' | translate }}\r\n      </mat-radio-button>\r\n      <mat-radio-button *ngIf=\"authService.isAdmin\" value=\"public\">\r\n        {{ 'igo.context.permission.scope.public' | translate }}\r\n      </mat-radio-button>\r\n    </mat-radio-group>\r\n  </div>\r\n\r\n  <form *ngIf=\"context.scope !== 'private' && canWrite\" [formGroup]=\"form\"\r\n    (ngSubmit)=\"handleFormSubmit(form.value)\">\r\n\r\n    <mat-form-field class=\"full-width\">\r\n      <input matInput required\r\n             [placeholder]=\"'igo.context.permission.user' | translate\"\r\n             [formControl]=\"formControl\"\r\n             [matAutocomplete]=\"auto\">\r\n      <mat-autocomplete #auto=\"matAutocomplete\" (optionSelected)=\"onProfilSelected($event.option.value)\"\r\n        [displayWith]=\"displayFn\">\r\n          <mat-option *ngFor=\"let profil of this.profils\" [value]=\"profil\">\r\n              {{profil.title}}<br>\r\n              <small class=\"mat-typography\">{{profil.name}}</small>\r\n          </mat-option>\r\n      </mat-autocomplete>\r\n     <mat-error>\r\n       {{ 'igo.context.permission.profilRequired' | translate }}\r\n     </mat-error>\r\n    </mat-form-field>\r\n\r\n\r\n    <mat-radio-group formControlName=\"typePermission\">\r\n      <mat-radio-button value=\"read\">\r\n        {{ 'igo.context.permission.read' | translate }}\r\n      </mat-radio-button>\r\n      <mat-radio-button value=\"write\">\r\n        {{ 'igo.context.permission.write' | translate }}\r\n      </mat-radio-button>\r\n    </mat-radio-group>\r\n\r\n\r\n    <div class=\"igo-form-button-group\">\r\n      <button\r\n        mat-raised-button\r\n        type=\"submit\"\r\n        [disabled]=\"!form.valid\">\r\n        {{ 'igo.context.permission.addBtn' | translate }}\r\n      </button>\r\n    </div>\r\n\r\n  </form>\r\n\r\n  <igo-list *ngIf=\"permissions && context.scope !== 'private'\">\r\n    <ng-template ngFor let-groupPermissions [ngForOf]=\"permissions | keyvalue\">\r\n      <igo-collapsible\r\n        *ngIf=\"groupPermissions.value.length\"\r\n        [title]=\"'igo.context.permission.' + groupPermissions.key | translate\">\r\n\r\n        <ng-template ngFor let-permission [ngForOf]=\"groupPermissions.value\">\r\n          <mat-list-item>\r\n            <mat-icon mat-list-avatar svgIcon=\"account-outline\"></mat-icon>\r\n            <h4 mat-line>{{permission.profilTitle}} <small class=\"mat-typography\">{{permission.profil}}</small></h4>\r\n\r\n            <div igoStopPropagation\r\n                 class=\"igo-actions-container\">\r\n\r\n               <button *ngIf=\"canWrite || permission.profil === authService.decodeToken().user.sourceId\"\r\n                 mat-icon-button\r\n                 [matTooltip]=\"'igo.context.permission.delete' | translate\"\r\n                 matTooltipShowDelay=\"500\"\r\n                 color=\"warn\"\r\n                 (click)=\"removePermission.emit(permission)\">\r\n                 <mat-icon svgIcon=\"delete\"></mat-icon>\r\n               </button>\r\n            </div>\r\n\r\n          </mat-list-item>\r\n        </ng-template>\r\n      </igo-collapsible>\r\n    </ng-template>\r\n  </igo-list>\r\n\r\n</div>\r\n",
                        styles: [":host{margin:10px}.full-width{width:100%}mat-radio-button{padding:14px 14px 14px 0}.scopeForm,form{padding:5px}mat-option ::ng-deep .mat-option-text{line-height:initial}"]
                    }] }
        ];
        /** @nocollapse */
        ContextPermissionsComponent.ctorParameters = function () {
            return [
                { type: forms.FormBuilder },
                { type: i0.ChangeDetectorRef },
                { type: i1.HttpClient },
                { type: i2.AuthService }
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
        function ContextPermissionsBindingDirective(component, contextService, languageService, messageService, cd) {
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
        ContextPermissionsBindingDirective.prototype.onAddPermission = /**
         * @param {?} permission
         * @return {?}
         */
            function (permission) {
                var _this = this;
                /** @type {?} */
                var translate = this.languageService.translate;
                if (!permission.profil) {
                    /** @type {?} */
                    var message = translate.instant('igo.context.contextManager.errors.addPermissionEmpty');
                    /** @type {?} */
                    var title = translate.instant('igo.context.contextManager.errors.addPermissionTitle');
                    this.messageService.error(message, title);
                    return;
                }
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
                    var message = translate.instant('igo.context.permission.dialog.addMsg', {
                        value: profil
                    });
                    /** @type {?} */
                    var title = translate.instant('igo.context.permission.dialog.addTitle');
                    _this.messageService.success(message, title);
                    _this.cd.detectChanges();
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
                    _this.cd.detectChanges();
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
                this.contextService.editedContext$.next(undefined);
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
                { type: i1$1.MessageService },
                { type: i0.ChangeDetectorRef }
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
                            _this.contextService.loadContext(context_1.uri);
                        }));
                    }
                }));
            };
        BookmarkButtonComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-bookmark-button',
                        template: "<div class=\"igo-bookmark-button-container\">\r\n  <button\r\n    mat-icon-button\r\n    [matTooltip]=\"'igo.context.bookmarkButton.create' | translate\"\r\n    matTooltipPosition=\"above\"\r\n    [color]=\"color\"\r\n    (click)=\"createContext()\">\r\n    <mat-icon svgIcon=\"star\"></mat-icon>\r\n  </button>\r\n</div>\r\n",
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
                        template: "<h1 mat-dialog-title class=\"mat-typography\">{{ 'igo.context.poiButton.dialog.title' | translate }}</h1>\r\n<div mat-dialog-content>\r\n  <mat-form-field>\r\n    <input matInput required autocomplete=\"off\"\r\n      [placeholder]=\"'igo.context.poiButton.dialog.placeholder' | translate\"\r\n      [(ngModel)]=\"title\">\r\n  </mat-form-field>\r\n</div>\r\n<div mat-dialog-actions>\r\n  <button mat-button color=\"primary\"\r\n         [disabled]=\"!title\"\r\n         (click)=\"dialogRef.close(title)\">\r\n    {{'igo.common.confirmDialog.confirmBtn' | translate}}\r\n  </button>\r\n  <button mat-button\r\n          (click)=\"dialogRef.close(false)\">\r\n    {{'igo.common.confirmDialog.cancelBtn' |\u00A0translate}}\r\n  </button>\r\n</div>\r\n"
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
                        template: "<h1 mat-dialog-title class=\"mat-typography\">{{'igo.context.userButton.infoTitle' | translate}}</h1>\r\n<div mat-dialog-content class=\"mat-typography\">\r\n  <p>{{'igo.context.userButton.dialog.user' | translate}}: {{user.sourceId}}</p>\r\n  <p>{{'igo.context.userButton.dialog.email' | translate}}: {{user.email}}</p>\r\n  <p>{{'igo.context.userButton.dialog.expiration' | translate}}: {{exp}}</p>\r\n</div>\r\n<div mat-dialog-actions style=\"justify-content: center\">\r\n  <button mat-button color=\"primary\"\r\n         (click)=\"dialogRef.close(false)\">\r\n    OK\r\n  </button>\r\n</div>\r\n"
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
            this.hasApi = false;
            this.visible = this.config.getConfig('auth') ? true : false;
            this.hasApi = this.config.getConfig('context.url') !== undefined;
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
                        template: "<div *ngIf=\"visible\" class=\"igo-user-button-container\">\r\n  <div class=\"igo-user-button-more-container\" [@userButtonState]=\"expand ? 'expand' : 'collapse'\">\r\n\r\n    <igo-poi-button *ngIf=\"hasApi\" [color]=\"color\" [map]=\"map\"></igo-poi-button>\r\n    <igo-bookmark-button *ngIf=\"hasApi\" [color]=\"color\" [map]=\"map\"></igo-bookmark-button>\r\n\r\n    <button\r\n      mat-icon-button\r\n      [matTooltip]=\"'igo.context.userButton.infoTitle' | translate\"\r\n      matTooltipPosition=\"above\"\r\n      [color]=\"color\"\r\n      (click)=\"infoUser()\">\r\n      <mat-icon svgIcon=\"information-outline\"></mat-icon>\r\n    </button>\r\n\r\n    <button\r\n      mat-icon-button\r\n      [matTooltip]=\"'igo.context.userButton.logout' |\u00A0translate\"\r\n      matTooltipPosition=\"above\"\r\n      [color]=\"color\"\r\n      (click)=\"logout()\">\r\n      <mat-icon svgIcon=\"power\"></mat-icon>\r\n    </button>\r\n\r\n  </div>\r\n\r\n  <button\r\n    mat-icon-button\r\n    [color]=\"auth.authenticated ? color : 'warn'\"\r\n    (click)=\"accountClick()\">\r\n    <mat-icon svgIcon=\"account-box\"></mat-icon>\r\n  </button>\r\n</div>\r\n",
                        animations: [userButtonSlideInOut()],
                        styles: [".igo-user-button-container button{background-color:#fff}.igo-user-button-container button:hover{background-color:#efefef}.igo-user-button-more-container{float:left;height:40px}.igo-user-button-more-container>*{margin-right:2px;float:left}@media only screen and (orientation:portrait) and (max-width:599px),only screen and (orientation:landscape) and (max-width:959px){.igo-user-button-container>button{position:absolute;bottom:0}.igo-user-button-more-container{height:80px;width:150px;position:relative;left:24px}}:host>>>button .mat-button-ripple-round,button{border-radius:0}"]
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
        return IgoContextMapButtonModule;
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
                            material.MatDialogModule,
                            material.MatMenuModule,
                            material.MatOptionModule,
                            material.MatAutocompleteModule,
                            i2.IgoAuthModule,
                            common$1.IgoListModule,
                            common$1.IgoKeyValueModule,
                            common$1.IgoCollapsibleModule,
                            common$1.IgoStopPropagationModule,
                            i1$1.IgoLanguageModule,
                            IgoContextImportExportModule,
                            IgoContextMapButtonModule,
                            common$1.IgoActionbarModule
                        ],
                        entryComponents: [
                            BookmarkDialogComponent
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
    var ShareMapService = /** @class */ (function () {
        function ShareMapService(config, contextService, messageService, route) {
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
                var e_1, _a, e_2, _b;
                if (!this.route ||
                    !this.route.options.visibleOnLayersKey ||
                    !this.route.options.visibleOffLayersKey ||
                    !map.viewController.getZoom()) {
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
                var visibleLayers = layers.filter(( /**
                 * @param {?} lay
                 * @return {?}
                 */function (lay) { return lay.visible && lay.id !== 'searchPointerSummaryId'; }));
                /** @type {?} */
                var invisibleLayers = layers.filter(( /**
                 * @param {?} lay
                 * @return {?}
                 */function (lay) { return !lay.visible && lay.id !== 'searchPointerSummaryId'; }));
                if (visibleLayers.length === 0) {
                    visibleKey = '';
                }
                if (invisibleLayers.length === 0) {
                    invisibleKey = '';
                }
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
                /** @type {?} */
                var contextLayersID = [];
                /** @type {?} */
                var contextLayers = this.contextService.context$.value.layers;
                try {
                    for (var contextLayers_1 = __values(contextLayers), contextLayers_1_1 = contextLayers_1.next(); !contextLayers_1_1.done; contextLayers_1_1 = contextLayers_1.next()) {
                        var contextLayer = contextLayers_1_1.value;
                        contextLayersID.push(contextLayer.id || contextLayer.source.id);
                    }
                }
                catch (e_2_1) {
                    e_2 = { error: e_2_1 };
                }
                finally {
                    try {
                        if (contextLayers_1_1 && !contextLayers_1_1.done && (_b = contextLayers_1.return))
                            _b.call(contextLayers_1);
                    }
                    finally {
                        if (e_2)
                            throw e_2.error;
                    }
                }
                /** @type {?} */
                var addedLayersQueryParamsWms = this.makeLayersByService(layers, contextLayersID, 'wms');
                /** @type {?} */
                var addedLayersQueryParamsWmts = this.makeLayersByService(layers, contextLayersID, 'wmts');
                layersUrl = layersUrl.substr(0, layersUrl.length - 1);
                /** @type {?} */
                var zoomKey = this.route.options.zoomKey;
                /** @type {?} */
                var centerKey = this.route.options.centerKey;
                /** @type {?} */
                var contextKey = this.route.options.contextKey;
                /** @type {?} */
                var zoom = zoomKey + "=" + map.viewController.getZoom();
                /** @type {?} */
                var arrayCenter = map.viewController.getCenter('EPSG:4326') || [];
                /** @type {?} */
                var long = arrayCenter[0].toFixed(5).replace(/\.([^0]+)0+$/, '.$1');
                /** @type {?} */
                var lat = arrayCenter[1].toFixed(5).replace(/\.([^0]+)0+$/, '.$1');
                /** @type {?} */
                var center = (centerKey + "=" + long + "," + lat).replace(/.00000/g, '');
                /** @type {?} */
                var context = '';
                if (this.contextService.context$.value) {
                    context = contextKey + "=" + this.contextService.context$.value.uri;
                }
                /** @type {?} */
                var url = "" + location.origin + location.pathname + "?" + context + "&" + zoom + "&" + center + "&" + layersUrl + "&" + llc + "&" + addedLayersQueryParamsWms + "&" + llc + "&" + addedLayersQueryParamsWmts;
                for (var i = 0; i < 5; i++) {
                    url = url.replace(/&&/g, '&');
                    url = url.endsWith('&') ? url.slice(0, -1) : url;
                }
                url = url.endsWith('&') ? url.slice(0, -1) : url;
                url = url.replace('?&wm', '&wm');
                url = url.replace('?&', '?');
                return url;
            };
        /**
         * @private
         * @param {?} layers
         * @param {?} contextLayersID
         * @param {?} typeService
         * @return {?}
         */
        ShareMapService.prototype.makeLayersByService = /**
         * @private
         * @param {?} layers
         * @param {?} contextLayersID
         * @param {?} typeService
         * @return {?}
         */
            function (layers, contextLayersID, typeService) {
                var e_3, _a;
                /** @type {?} */
                var addedLayersByService = [];
                var _loop_1 = function (layer) {
                    if (contextLayersID.indexOf(layer.id) === -1) {
                        /** @type {?} */
                        var linkUrl_1 = (( /** @type {?} */(layer.dataSource.options))).url;
                        /** @type {?} */
                        var addedLayer = '';
                        if (layer.dataSource.options.type === 'wms') {
                            addedLayer = encodeURIComponent((( /** @type {?} */(layer.dataSource.options))).params.LAYERS);
                        }
                        else if (layer.dataSource.options.type === 'wmts') {
                            addedLayer = encodeURIComponent((( /** @type {?} */(layer.dataSource.options))).layer);
                        }
                        /** @type {?} */
                        var addedLayerPosition_1 = addedLayer + ":igoz" + layer.zIndex;
                        if (!addedLayersByService.find(( /**
                         * @param {?} definedUrl
                         * @return {?}
                         */function (definedUrl) { return definedUrl.url === linkUrl_1; }))) {
                            addedLayersByService.push({
                                url: linkUrl_1,
                                layers: [addedLayerPosition_1]
                            });
                        }
                        else {
                            addedLayersByService.forEach(( /**
                             * @param {?} service
                             * @return {?}
                             */function (service) {
                                if (service.url === linkUrl_1) {
                                    service.layers.push(addedLayerPosition_1);
                                }
                            }));
                        }
                    }
                };
                try {
                    for (var _b = __values(layers.filter(( /**
                     * @param {?} l
                     * @return {?}
                     */function (l) { return l.dataSource.options && (l.dataSource.options.type === typeService); }))), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var layer = _c.value;
                        _loop_1(layer);
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
                /** @type {?} */
                var addedLayersQueryParams = '';
                if (addedLayersByService.length >= 1) {
                    /** @type {?} */
                    var linkUrlKey = (typeService === 'wms') ? this.route.options.wmsUrlKey :
                        (typeService === 'wmts') ? this.route.options.wmtsUrlKey : '';
                    /** @type {?} */
                    var layersKey = (typeService === 'wms') ? this.route.options.wmsLayersKey :
                        (typeService === 'wmts') ? this.route.options.wmtsLayersKey : '';
                    /** @type {?} */
                    var linkUrlQueryParams_1 = '';
                    /** @type {?} */
                    var layersQueryParams_1 = '';
                    addedLayersByService.forEach(( /**
                     * @param {?} service
                     * @return {?}
                     */function (service) {
                        linkUrlQueryParams_1 += service.url + ",";
                        layersQueryParams_1 += "(" + service.layers.join(',') + "),";
                    }));
                    linkUrlQueryParams_1 = linkUrlQueryParams_1.endsWith(',')
                        ? linkUrlQueryParams_1.slice(0, -1)
                        : linkUrlQueryParams_1;
                    layersQueryParams_1 = layersQueryParams_1.endsWith(',')
                        ? layersQueryParams_1.slice(0, -1)
                        : layersQueryParams_1;
                    addedLayersQueryParams = linkUrlKey + "=" + linkUrlQueryParams_1 + "&" + layersKey + "=" + layersQueryParams_1;
                }
                return addedLayersQueryParams;
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
                { type: i1$1.RouteService, decorators: [{ type: i0.Optional }] }
            ];
        };
        /** @nocollapse */ ShareMapService.ngInjectableDef = i0.defineInjectable({ factory: function ShareMapService_Factory() { return new ShareMapService(i0.inject(i1$1.ConfigService), i0.inject(ContextService), i0.inject(i1$1.MessageService), i0.inject(i1$1.RouteService, 8)); }, token: ShareMapService, providedIn: "root" });
        return ShareMapService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ShareMapComponent = /** @class */ (function () {
        function ShareMapComponent(config, languageService, messageService, auth, shareMapService, formBuilder, cdRef) {
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
                this.mapState$$ = this.map.viewController.state$.subscribe(( /**
                 * @param {?} c
                 * @return {?}
                 */function (c) {
                    if (!_this.hasApi) {
                        _this.resetUrl();
                        _this.cdRef.detectChanges();
                    }
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
        ShareMapComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.mapState$$.unsubscribe();
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
                        template: "<form class=\"igo-form\" [formGroup]=\"form\"\r\n  (ngSubmit)=\"resetUrl(form.value)\">\r\n\r\n  <div *ngIf=\"hasApi\" class=\"igo-input-container\">\r\n    <mat-form-field>\r\n      <input matInput required\r\n             [placeholder]=\"'igo.context.contextManager.form.title' | translate\"\r\n             formControlName=\"title\">\r\n     <mat-error>\r\n      {{ 'igo.context.contextManager.form.titleRequired' | translate }}\r\n     </mat-error>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div *ngIf=\"hasApi\" id=\"uriInput\" class=\"igo-input-container\">\r\n    <mat-form-field>\r\n      <span *ngIf=\"userId\" class=\"prefix\">{{userId}}-</span>\r\n      <span class=\"fieldWrapper\">\r\n        <input matInput required\r\n             [readonly]=\"!userId\"\r\n             [placeholder]=\"'igo.context.contextManager.form.uri' | translate\"\r\n             formControlName=\"uri\">\r\n       </span>\r\n     <mat-error>\r\n      {{ 'igo.context.contextManager.form.uriRequired' | translate }}\r\n     </mat-error>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div *ngIf=\"hasApi\" class=\"igo-form-button-group\">\r\n    <button\r\n      mat-raised-button\r\n      type=\"submit\"\r\n      [disabled]=\"!form.valid\">\r\n      {{ 'igo.context.shareMap.button' | translate }}\r\n    </button>\r\n  </div>\r\n\r\n</form>\r\n\r\n<div *ngIf=\"url\" class=\"igo-input-container linkToShare\">\r\n  <mat-form-field>\r\n    <textarea #textArea matInput readonly rows=\"1\"\r\n      [ngClass]=\"{'textAreaWithButton': hasApi}\"\r\n      [placeholder]=\"'igo.context.shareMap.placeholderLink' | translate\"\r\n      [value]=\"url\"></textarea>\r\n    <button *ngIf=\"hasApi\"\r\n      mat-icon-button\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.context.shareMap.copy' | translate\"\r\n      color=\"primary\"\r\n      (click)=\"copyTextToClipboard(textArea)\">\r\n      <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n    </button>\r\n  </mat-form-field>\r\n\r\n  <div *ngIf=\"!hasApi\" class=\"igo-form-button-group\">\r\n    <button\r\n      mat-raised-button\r\n      (click)=\"copyTextToClipboard(textArea)\">\r\n      <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n      {{ 'igo.context.shareMap.copy' | translate }}\r\n    </button>\r\n  </div>\r\n  <div *ngIf=\"!hasApi\">\r\n    <br/>\r\n    <section class=\"mat-typography\">\r\n        <h4>{{'igo.context.shareMap.included' | translate}}</h4>\r\n        <ul>\r\n          <li>{{'igo.context.shareMap.context' | translate}}</li>\r\n          <li>{{'igo.context.shareMap.center' | translate}}</li>\r\n          <li>{{'igo.context.shareMap.zoom' | translate}}</li>\r\n          <li>{{'igo.context.shareMap.addedLayers' | translate}}</li>\r\n          <li>{{'igo.context.shareMap.visibleInvisible' | translate}}</li>\r\n        </ul>\r\n\r\n      <h4>{{'igo.context.shareMap.excluded' | translate}}</h4>\r\n      <ul>\r\n        <li>{{'igo.context.shareMap.order' | translate}}</li>\r\n        <li>{{'igo.context.shareMap.opacity' | translate}}</li>\r\n        <li>{{'igo.context.shareMap.filterOgc' | translate}}</li>\r\n        <li>{{'igo.context.shareMap.filterTime' | translate}}</li>\r\n      </ul>\r\n    </section>\r\n  </div>\r\n\r\n</div>\r\n",
                        styles: ["@charset \"UTF-8\";mat-form-field{width:100%}#uriInput .fieldWrapper{display:block;overflow:hidden}#uriInput .prefix{float:left}.linkToShare{padding:25px 5px 5px}.linkToShare textarea{resize:none;width:100%;line-height:1.3;height:40px;overflow-y:hidden;word-wrap:normal;word-break:break-all}.linkToShare textarea.textAreaWithButton{width:calc(100% - 60px)}.linkToShare mat-form-field>button{float:right;margin:-10px 0}.igo-form{padding:20px 5px 5px}.igo-form-button-group{text-align:center;padding-top:10px}"]
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
                { type: i0.ChangeDetectorRef }
            ];
        };
        ShareMapComponent.propDecorators = {
            map: [{ type: i0.Input }]
        };
        return ShareMapComponent;
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
                        exports: [ShareMapComponent],
                        declarations: [ShareMapComponent]
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
            this.format = new GeoJSON();
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
                    geo.moveToOlFeatures(this.map, [olFeature], geo.FeatureMotion.Zoom);
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
                        template: "<mat-sidenav\r\n  #sidenav\r\n  igoSidenavShim\r\n  mode=\"side\"\r\n  [opened]=\"opened\">\r\n\r\n  <div class=\"igo-sidenav-content\">\r\n\r\n    <igo-flexible\r\n      #topPanel\r\n      initial=\"50%\" initialMobile=\"100%\"\r\n      expanded=\"calc(100% - 58px)\"\r\n      [state]=\"topPanelState\">\r\n\r\n      <div class=\"igo-content\">\r\n        <igo-panel [title]=\"tool ? (tool.title | translate) : title\">\r\n          <button\r\n            mat-icon-button\r\n            panelLeftButton\r\n            tooltip-position=\"below\"\r\n            matTooltipShowDelay=\"500\"\r\n            [matTooltip]=\"'igo.context.sidenav.goBack' | translate\"\r\n            *ngIf=\"tool\">\r\n            <mat-icon svgIcon=\"arrow-back\"></mat-icon>\r\n          </button>\r\n\r\n          <button\r\n            mat-icon-button\r\n            panelRightButton\r\n            tooltip-position=\"below\"\r\n            matTooltipShowDelay=\"500\"\r\n            [matTooltip]=\"'igo.context.sidenav.mainMenu' | translate\"\r\n            *ngIf=\"tool\">\r\n            <mat-icon svgIcon=\"menu\"></mat-icon>\r\n          </button>\r\n\r\n        </igo-panel>\r\n      </div>\r\n\r\n      <div igoFlexibleFill class=\"igo-content\">\r\n        <igo-panel\r\n          [title]=\"featureTitle\"\r\n          *ngIf=\"feature && media !== 'mobile'\">\r\n\r\n          <button\r\n            mat-icon-button\r\n            panelLeftButton\r\n            class=\"igo-icon-button\"\r\n            (click)=\"toggleTopPanel()\">\r\n            <mat-icon [svgIcon]=\"['collapsed', 'initial'].indexOf(topPanel.state) >= 0 ? 'arrow_downward' : 'arrow_upward'\"></mat-icon>\r\n          </button>\r\n\r\n          <button\r\n            mat-icon-button\r\n            panelRightButton\r\n            class=\"igo-icon-button\"\r\n            (click)=\"zoomToFeatureExtent()\"\r\n            *ngIf=\"feature.geometry\">\r\n            <mat-icon svgIcon=\"zoom-in\"></mat-icon>\r\n          </button>\r\n\r\n          <igo-feature-details\r\n            [feature]=\"feature\"\r\n            *ngIf=\"['collapsed', 'initial'].indexOf(topPanel.state) >= 0\">\r\n          </igo-feature-details>\r\n        </igo-panel>\r\n      </div>\r\n\r\n    </igo-flexible>\r\n\r\n  </div>\r\n</mat-sidenav>\r\n",
                        styles: [".igo-sidenav-content .igo-flexible-fill .igo-container,:host ::ng-deep .igo-flexible-fill .igo-container{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;border-top:1px solid rgba(0,0,0,.2)}mat-sidenav{-o-box-shadow:2px 0 2px 0 #ddd;box-shadow:2px 0 2px 0 #ddd;width:400px}:host{background-color:#fff}:host ::ng-deep mat-sidenav{z-index:3!important}@media only screen and (orientation:portrait) and (max-width:599px),only screen and (orientation:landscape) and (max-width:959px){mat-sidenav{width:calc(100% - 40px - 5px)}}.igo-sidenav-content{margin-top:50px;height:calc(100% - 50px)}igo-feature-details ::ng-deep table{width:100%}"]
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
                            geo.IgoFeatureModule,
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
                        imports: [material.MatInputModule, material.MatFormFieldModule, material.MatMenuModule],
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
        return IgoContextModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ContextExportIonicService = /** @class */ (function (_super) {
        __extends(ContextExportIonicService, _super);
        function ContextExportIonicService(config, platform, fileOpener, file) {
            var _this = _super.call(this) || this;
            _this.config = config;
            _this.platform = platform;
            _this.fileOpener = fileOpener;
            _this.file = file;
            return _this;
        }
        /**
         * @protected
         * @param {?} res
         * @return {?}
         */
        ContextExportIonicService.prototype.exportAsync = /**
         * @protected
         * @param {?} res
         * @return {?}
         */
            function (res) {
                var _this = this;
                /** @type {?} */
                var doExport = ( /**
                 * @param {?} observer
                 * @return {?}
                 */function (observer) {
                    /** @type {?} */
                    var nothingToExport = _super.prototype.nothingToExport.call(_this, res);
                    if (nothingToExport === true) {
                        observer.error(new ExportNothingToExportError());
                        return;
                    }
                    /** @type {?} */
                    var contextJSON = JSON.stringify(res);
                    if (_this.platform.is('cordova')) {
                        /** @type {?} */
                        var directory_1 = _this.config.getConfig('ExportDirectory');
                        _this.file.writeFile(directory_1, res.uri + ".json", contextJSON, { replace: true }).then(( /**
                         * @param {?} success
                         * @return {?}
                         */function (success) {
                            return _this.fileOpener.open(directory_1 + '/' + (res.uri + ".json"), 'text/plain');
                        }));
                        observer.complete();
                    }
                    else {
                        utils.downloadContent(contextJSON, 'text/json;charset=utf-8', res.uri + ".json");
                        observer.complete();
                    }
                });
                return new rxjs.Observable(doExport);
            };
        ContextExportIonicService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        ContextExportIonicService.ctorParameters = function () {
            return [
                { type: i1$1.ConfigService },
                { type: i2$1.Platform },
                { type: ngx$1.FileOpener },
                { type: ngx.File }
            ];
        };
        /** @nocollapse */ ContextExportIonicService.ngInjectableDef = i0.defineInjectable({ factory: function ContextExportIonicService_Factory() { return new ContextExportIonicService(i0.inject(i1$1.ConfigService), i0.inject(i2$1.Platform), i0.inject(i3.FileOpener), i0.inject(i4.File)); }, token: ContextExportIonicService, providedIn: "root" });
        return ContextExportIonicService;
    }(ContextExportService));

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

    exports.IgoContextModule = IgoContextModule;
    exports.IgoContextImportExportModule = IgoContextImportExportModule;
    exports.IgoContextManagerModule = IgoContextManagerModule;
    exports.IgoContextMapButtonModule = IgoContextMapButtonModule;
    exports.IgoShareMapModule = IgoShareMapModule;
    exports.IgoSidenavModule = IgoSidenavModule;
    exports.ExportError = ExportError;
    exports.ExportInvalidFileError = ExportInvalidFileError;
    exports.ExportNothingToExportError = ExportNothingToExportError;
    exports.ImportError = ImportError;
    exports.ImportInvalidFileError = ImportInvalidFileError;
    exports.ImportUnreadableFileError = ImportUnreadableFileError;
    exports.ImportNothingToImportError = ImportNothingToImportError;
    exports.ImportSizeError = ImportSizeError;
    exports.ImportSRSError = ImportSRSError;
    exports.ContextExportService = ContextExportService;
    exports.ContextExportIonicService = ContextExportIonicService;
    exports.ContextImportService = ContextImportService;
    exports.handleFileImportSuccess = handleFileImportSuccess;
    exports.handleFileImportError = handleFileImportError;
    exports.handleInvalidFileImportError = handleInvalidFileImportError;
    exports.handleSizeFileImportError = handleSizeFileImportError;
    exports.handleUnreadbleFileImportError = handleUnreadbleFileImportError;
    exports.handleNothingToImportError = handleNothingToImportError;
    exports.addContextToContextList = addContextToContextList;
    exports.getFileExtension = getFileExtension;
    exports.computeLayerTitleFromFile = computeLayerTitleFromFile;
    exports.addImportedFeaturesToMap = addImportedFeaturesToMap;
    exports.addImportedFeaturesStyledToMap = addImportedFeaturesStyledToMap;
    exports.handleFileExportError = handleFileExportError;
    exports.handleFileExportSuccess = handleFileExportSuccess;
    exports.handleNothingToExportError = handleNothingToExportError;
    exports.ContextImportExportComponent = ContextImportExportComponent;
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
    exports.SidenavComponent = SidenavComponent;
    exports.ɵa = ContextImportExportComponent;
    exports.ɵc = ContextExportService;
    exports.ɵb = ContextImportService;
    exports.ɵr = ContextEditBindingDirective;
    exports.ɵq = ContextEditComponent;
    exports.ɵp = ContextFormComponent;
    exports.ɵo = ContextItemComponent;
    exports.ɵn = ContextListBindingDirective;
    exports.ɵm = ContextListComponent;
    exports.ɵt = ContextPermissionsBindingDirective;
    exports.ɵs = ContextPermissionsComponent;
    exports.ɵd = ContextService;
    exports.ɵv = LayerContextDirective;
    exports.ɵu = MapContextDirective;
    exports.ɵe = BookmarkButtonComponent;
    exports.ɵj = BookmarkDialogComponent;
    exports.ɵf = PoiButtonComponent;
    exports.ɵk = PoiDialogComponent;
    exports.ɵg = PoiService;
    exports.ɵi = userButtonSlideInOut;
    exports.ɵh = UserButtonComponent;
    exports.ɵl = UserDialogComponent;
    exports.ɵw = ShareMapComponent;
    exports.ɵx = ShareMapService;
    exports.ɵy = SidenavComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=igo2-context.umd.js.map