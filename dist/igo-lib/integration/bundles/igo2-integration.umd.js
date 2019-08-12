(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/material'), require('rxjs/operators'), require('ol/format/GeoJSON'), require('@igo2/geo'), require('@igo2/core'), require('@igo2/context'), require('rxjs'), require('@angular/core'), require('@igo2/common')) :
    typeof define === 'function' && define.amd ? define('@igo2/integration', ['exports', '@angular/common', '@angular/material', 'rxjs/operators', 'ol/format/GeoJSON', '@igo2/geo', '@igo2/core', '@igo2/context', 'rxjs', '@angular/core', '@igo2/common'], factory) :
    (factory((global.igo2 = global.igo2 || {}, global.igo2.integration = {}),global.ng.common,global.ng.material,global.rxjs.operators,global.olFormatGeoJSON,global.i1,global.i4,global.i1$1,global.rxjs,global.ng.core,global.i1$2));
}(this, (function (exports,common,material,operators,olFormatGeoJSON,i1,i4,i1$1,rxjs,i0,i1$2) { 'use strict';

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
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ContextEditorToolComponent = /** @class */ (function () {
        function ContextEditorToolComponent() {
        }
        ContextEditorToolComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-context-editor-tool',
                        template: "<igo-context-edit igoContextEditBinding></igo-context-edit>\r\n"
                    }] }
        ];
        /** @nocollapse */
        ContextEditorToolComponent.ctorParameters = function () { return []; };
        ContextEditorToolComponent = __decorate([
            i1$2.ToolComponent({
                name: 'contextEditor',
                title: 'igo.integration.tools.contexts',
                icon: 'settings'
            }),
            __metadata("design:paramtypes", [])
        ], ContextEditorToolComponent);
        return ContextEditorToolComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Service that holds the state of the search module
     */
    var ToolState = /** @class */ (function () {
        function ToolState(toolService) {
            this.toolService = toolService;
            /**
             * Toolbox that holds main tools
             */
            this.toolbox = new i1$2.Toolbox();
            this.toolbox.setTools(this.toolService.getTools());
        }
        ToolState.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        ToolState.ctorParameters = function () {
            return [
                { type: i1$2.ToolService }
            ];
        };
        /** @nocollapse */ ToolState.ngInjectableDef = i0.defineInjectable({ factory: function ToolState_Factory() { return new ToolState(i0.inject(i1$2.ToolService)); }, token: ToolState, providedIn: "root" });
        return ToolState;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ContextManagerToolComponent = /** @class */ (function () {
        function ContextManagerToolComponent(toolState) {
            this.toolState = toolState;
        }
        /**
         * @return {?}
         */
        ContextManagerToolComponent.prototype.editContext = /**
         * @return {?}
         */
            function () {
                this.toolState.toolbox.activateTool('contextEditor');
            };
        /**
         * @return {?}
         */
        ContextManagerToolComponent.prototype.managePermissions = /**
         * @return {?}
         */
            function () {
                this.toolState.toolbox.activateTool('permissionsContextManager');
            };
        ContextManagerToolComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-context-manager-tool',
                        template: "<igo-context-list\r\n  igoContextListBinding\r\n  (edit)=\"editContext()\"\r\n  (managePermissions)=\"managePermissions()\">\r\n</igo-context-list>\r\n"
                    }] }
        ];
        /** @nocollapse */
        ContextManagerToolComponent.ctorParameters = function () {
            return [
                { type: ToolState }
            ];
        };
        ContextManagerToolComponent = __decorate([
            i1$2.ToolComponent({
                name: 'contextManager',
                title: 'igo.integration.tools.contexts',
                icon: 'tune'
            }),
            __metadata("design:paramtypes", [ToolState])
        ], ContextManagerToolComponent);
        return ContextManagerToolComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ContextPermissionManagerToolComponent = /** @class */ (function () {
        function ContextPermissionManagerToolComponent() {
        }
        ContextPermissionManagerToolComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-context-permission-manager-tool',
                        template: "<igo-context-permissions igoContextPermissionsBinding></igo-context-permissions>\r\n"
                    }] }
        ];
        /** @nocollapse */
        ContextPermissionManagerToolComponent.ctorParameters = function () { return []; };
        ContextPermissionManagerToolComponent = __decorate([
            i1$2.ToolComponent({
                name: 'contextPermissionManager',
                title: 'igo.integration.tools.contexts',
                icon: 'settings'
            }),
            __metadata("design:paramtypes", [])
        ], ContextPermissionManagerToolComponent);
        return ContextPermissionManagerToolComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Service that holds the state of the map module
     */
    var MapState = /** @class */ (function () {
        function MapState(mapService, projectionService // Don't remove this or it'll never be injected
        ) {
            this.mapService = mapService;
            this.projectionService = projectionService;
            this._map = new i1.IgoMap({
                controls: {
                    scaleLine: true,
                    attribution: {
                        collapsed: false
                    }
                }
            });
            this.mapService.setMap(this.map);
        }
        Object.defineProperty(MapState.prototype, "map", {
            /**
             * Active map
             */
            get: /**
             * Active map
             * @return {?}
             */ function () { return this._map; },
            enumerable: true,
            configurable: true
        });
        MapState.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        MapState.ctorParameters = function () {
            return [
                { type: i1.MapService },
                { type: i1.ProjectionService }
            ];
        };
        /** @nocollapse */ MapState.ngInjectableDef = i0.defineInjectable({ factory: function MapState_Factory() { return new MapState(i0.inject(i1.MapService), i0.inject(i1.ProjectionService)); }, token: MapState, providedIn: "root" });
        return MapState;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ContextShareToolComponent = /** @class */ (function () {
        function ContextShareToolComponent(mapState) {
            this.mapState = mapState;
            this.hasCopyLinkButton = false;
            this.hasShareMapButton = true;
        }
        Object.defineProperty(ContextShareToolComponent.prototype, "map", {
            get: /**
             * @return {?}
             */ function () { return this.mapState.map; },
            enumerable: true,
            configurable: true
        });
        ContextShareToolComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-context-share-tool',
                        template: "<igo-share-map\r\n  igoShareMapBinding\r\n  [map]=\"map\"\r\n  [hasCopyLinkButton]=\"hasCopyLinkButton\"\r\n  [hasShareMapButton]=\"hasShareMapButton\"\r\n></igo-share-map>\r\n"
                    }] }
        ];
        /** @nocollapse */
        ContextShareToolComponent.ctorParameters = function () {
            return [
                { type: MapState }
            ];
        };
        ContextShareToolComponent.propDecorators = {
            hasCopyLinkButton: [{ type: i0.Input }],
            hasShareMapButton: [{ type: i0.Input }]
        };
        ContextShareToolComponent = __decorate([
            i1$2.ToolComponent({
                name: 'shareMap',
                title: 'igo.integration.tools.shareMap',
                icon: 'share-variant'
            }),
            __metadata("design:paramtypes", [MapState])
        ], ContextShareToolComponent);
        return ContextShareToolComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IgoAppContextModule = /** @class */ (function () {
        function IgoAppContextModule() {
        }
        IgoAppContextModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [i1$1.IgoContextModule],
                        declarations: [
                            ContextEditorToolComponent,
                            ContextManagerToolComponent,
                            ContextPermissionManagerToolComponent,
                            ContextShareToolComponent
                        ],
                        exports: [
                            ContextEditorToolComponent,
                            ContextManagerToolComponent,
                            ContextPermissionManagerToolComponent,
                            ContextShareToolComponent
                        ],
                        entryComponents: [
                            ContextEditorToolComponent,
                            ContextManagerToolComponent,
                            ContextPermissionManagerToolComponent,
                            ContextShareToolComponent
                        ],
                        schemas: [i0.CUSTOM_ELEMENTS_SCHEMA]
                    },] }
        ];
        return IgoAppContextModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Service that holds the state of the catalog module
     */
    var CatalogState = /** @class */ (function () {
        function CatalogState() {
            /**
             * Catalog -> Catalog items store mapping
             */
            this.catalogItemsStores = new Map();
            this._catalogStore = new i1$2.EntityStore([]);
        }
        Object.defineProperty(CatalogState.prototype, "catalogStore", {
            /**
             * Store that contains all the catalogs
             */
            get: /**
             * Store that contains all the catalogs
             * @return {?}
             */ function () { return this._catalogStore; },
            enumerable: true,
            configurable: true
        });
        /**
         * Get a catalog's items store
         * @param catalog Catalog
         * @returns Store that contains the catalog items
         */
        /**
         * Get a catalog's items store
         * @param {?} catalog Catalog
         * @return {?} Store that contains the catalog items
         */
        CatalogState.prototype.getCatalogItemsStore = /**
         * Get a catalog's items store
         * @param {?} catalog Catalog
         * @return {?} Store that contains the catalog items
         */
            function (catalog) {
                return this.catalogItemsStores.get(( /** @type {?} */(catalog.id)));
            };
        /**
         * Bind a catalog items store to a catalog
         * @param catalog Catalog
         * @param store Catalog items store
         */
        /**
         * Bind a catalog items store to a catalog
         * @param {?} catalog Catalog
         * @param {?} store Catalog items store
         * @return {?}
         */
        CatalogState.prototype.setCatalogItemsStore = /**
         * Bind a catalog items store to a catalog
         * @param {?} catalog Catalog
         * @param {?} store Catalog items store
         * @return {?}
         */
            function (catalog, store) {
                this.catalogItemsStores.set(( /** @type {?} */(catalog.id)), store);
            };
        CatalogState.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        CatalogState.ctorParameters = function () { return []; };
        /** @nocollapse */ CatalogState.ngInjectableDef = i0.defineInjectable({ factory: function CatalogState_Factory() { return new CatalogState(); }, token: CatalogState, providedIn: "root" });
        return CatalogState;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Tool to browse the list of available catalogs.
     */
    var CatalogLibraryToolComponent = /** @class */ (function () {
        function CatalogLibraryToolComponent(catalogService, catalogState, toolState) {
            this.catalogService = catalogService;
            this.catalogState = catalogState;
            this.toolState = toolState;
        }
        Object.defineProperty(CatalogLibraryToolComponent.prototype, "store", {
            /**
             * Store that contains the catalogs
             * @internal
             */
            get: /**
             * Store that contains the catalogs
             * \@internal
             * @return {?}
             */ function () {
                return this.catalogState.catalogStore;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @internal
         */
        /**
         * \@internal
         * @return {?}
         */
        CatalogLibraryToolComponent.prototype.ngOnInit = /**
         * \@internal
         * @return {?}
         */
            function () {
                if (this.store.entities$.value.length === 0) {
                    this.loadCatalogs();
                }
            };
        /**
         * When the selected catalog changes, toggle the the CatalogBrowser tool.
         * @internal
         * @param event Select event
         */
        /**
         * When the selected catalog changes, toggle the the CatalogBrowser tool.
         * \@internal
         * @param {?} event Select event
         * @return {?}
         */
        CatalogLibraryToolComponent.prototype.onCatalogSelectChange = /**
         * When the selected catalog changes, toggle the the CatalogBrowser tool.
         * \@internal
         * @param {?} event Select event
         * @return {?}
         */
            function (event) {
                if (event.selected === false) {
                    return;
                }
                this.toolState.toolbox.activateTool('catalogBrowser');
            };
        /**
         * Get all the available catalogs from the CatalogService and
         * load them into the store.
         */
        /**
         * Get all the available catalogs from the CatalogService and
         * load them into the store.
         * @private
         * @return {?}
         */
        CatalogLibraryToolComponent.prototype.loadCatalogs = /**
         * Get all the available catalogs from the CatalogService and
         * load them into the store.
         * @private
         * @return {?}
         */
            function () {
                var _this = this;
                this.catalogService.loadCatalogs().subscribe(( /**
                 * @param {?} catalogs
                 * @return {?}
                 */function (catalogs) {
                    _this.store.clear();
                    _this.store.load(catalogs);
                }));
            };
        CatalogLibraryToolComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-catalog-library-tool',
                        template: "<igo-catalog-library\r\n  [store]=\"store\"\r\n  (catalogSelectChange)=\"onCatalogSelectChange($event)\">\r\n</igo-catalog-library>\r\n",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        CatalogLibraryToolComponent.ctorParameters = function () {
            return [
                { type: i1.CatalogService },
                { type: CatalogState },
                { type: ToolState }
            ];
        };
        /**
         * Tool to browse the list of available catalogs.
         */
        CatalogLibraryToolComponent = __decorate([
            i1$2.ToolComponent({
                name: 'catalog',
                title: 'igo.integration.tools.catalog',
                icon: 'layers-plus'
            }),
            __metadata("design:paramtypes", [i1.CatalogService,
                CatalogState,
                ToolState])
        ], CatalogLibraryToolComponent);
        return CatalogLibraryToolComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @ignore
     */
    var IgoAppCatalogLibraryToolModule = /** @class */ (function () {
        function IgoAppCatalogLibraryToolModule() {
        }
        IgoAppCatalogLibraryToolModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            i1.IgoCatalogLibraryModule
                        ],
                        declarations: [CatalogLibraryToolComponent],
                        exports: [CatalogLibraryToolComponent],
                        entryComponents: [CatalogLibraryToolComponent],
                        schemas: [i0.CUSTOM_ELEMENTS_SCHEMA]
                    },] }
        ];
        return IgoAppCatalogLibraryToolModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Tool to browse a catalog's groups and layers and display them to a map.
     */
    var CatalogBrowserToolComponent = /** @class */ (function () {
        function CatalogBrowserToolComponent(catalogService, catalogState, mapState) {
            this.catalogService = catalogService;
            this.catalogState = catalogState;
            this.mapState = mapState;
            /**
             * Store that contains the catalog items
             * \@internal
             */
            this.store$ = new rxjs.BehaviorSubject(undefined);
        }
        Object.defineProperty(CatalogBrowserToolComponent.prototype, "map", {
            /**
             * Map to add layers to
             * @internal
             */
            get: /**
             * Map to add layers to
             * \@internal
             * @return {?}
             */ function () {
                return this.mapState.map;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @internal
         */
        /**
         * \@internal
         * @return {?}
         */
        CatalogBrowserToolComponent.prototype.ngOnInit = /**
         * \@internal
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var catalogStore = this.catalogState.catalogStore;
                this.catalog$$ = catalogStore.stateView
                    .firstBy$(( /**
             * @param {?} record
             * @return {?}
             */function (record) { return record.state.selected === true; }))
                    .subscribe(( /**
             * @param {?} record
             * @return {?}
             */function (record) {
                    if (record && record.entity) {
                        /** @type {?} */
                        var catalog = record.entity;
                        _this.catalog = catalog;
                        _this.loadCatalogItems(catalog);
                    }
                }));
            };
        /**
         * @internal
         */
        /**
         * \@internal
         * @return {?}
         */
        CatalogBrowserToolComponent.prototype.ngOnDestroy = /**
         * \@internal
         * @return {?}
         */
            function () {
                this.catalog$$.unsubscribe();
            };
        /**
         * Get the selected catalog's items from the CatalogService and
         * load them into the store.
         * @param catalog Selected catalog
         */
        /**
         * Get the selected catalog's items from the CatalogService and
         * load them into the store.
         * @private
         * @param {?} catalog Selected catalog
         * @return {?}
         */
        CatalogBrowserToolComponent.prototype.loadCatalogItems = /**
         * Get the selected catalog's items from the CatalogService and
         * load them into the store.
         * @private
         * @param {?} catalog Selected catalog
         * @return {?}
         */
            function (catalog) {
                var _this = this;
                /** @type {?} */
                var store = this.catalogState.getCatalogItemsStore(catalog);
                if (store !== undefined) {
                    this.store$.next(store);
                    return;
                }
                store = new i1$2.EntityStore([]);
                this.catalogState.setCatalogItemsStore(catalog, store);
                this.catalogService
                    .loadCatalogItems(catalog)
                    .subscribe(( /**
             * @param {?} items
             * @return {?}
             */function (items) {
                    store.load(items);
                    _this.store$.next(store);
                }));
            };
        CatalogBrowserToolComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-catalog-browser-tool',
                        template: "<igo-catalog-browser\r\n  *ngIf=\"store$ | async as store\"\r\n  [catalog]=\"catalog\"\r\n  [store]=\"store\"\r\n  [map]=\"map\">\r\n</igo-catalog-browser>\r\n",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        CatalogBrowserToolComponent.ctorParameters = function () {
            return [
                { type: i1.CatalogService },
                { type: CatalogState },
                { type: MapState }
            ];
        };
        /**
         * Tool to browse a catalog's groups and layers and display them to a map.
         */
        CatalogBrowserToolComponent = __decorate([
            i1$2.ToolComponent({
                name: 'catalogBrowser',
                title: 'igo.integration.tools.catalog',
                icon: 'photo-browser'
            }),
            __metadata("design:paramtypes", [i1.CatalogService,
                CatalogState,
                MapState])
        ], CatalogBrowserToolComponent);
        return CatalogBrowserToolComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @ignore
     */
    var IgoAppCatalogBrowserToolModule = /** @class */ (function () {
        function IgoAppCatalogBrowserToolModule() {
        }
        IgoAppCatalogBrowserToolModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            i1.IgoCatalogBrowserModule
                        ],
                        declarations: [CatalogBrowserToolComponent],
                        exports: [CatalogBrowserToolComponent],
                        entryComponents: [CatalogBrowserToolComponent],
                        schemas: [i0.CUSTOM_ELEMENTS_SCHEMA]
                    },] }
        ];
        return IgoAppCatalogBrowserToolModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IgoAppCatalogModule = /** @class */ (function () {
        function IgoAppCatalogModule() {
        }
        IgoAppCatalogModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [],
                        exports: [
                            IgoAppCatalogLibraryToolModule,
                            IgoAppCatalogBrowserToolModule
                        ],
                        declarations: []
                    },] }
        ];
        return IgoAppCatalogModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DirectionsToolComponent = /** @class */ (function () {
        function DirectionsToolComponent(mapState) {
            this.mapState = mapState;
        }
        Object.defineProperty(DirectionsToolComponent.prototype, "map", {
            get: /**
             * @return {?}
             */ function () {
                return this.mapState.map;
            },
            enumerable: true,
            configurable: true
        });
        DirectionsToolComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-directions-tool',
                        template: "<igo-routing-form igoRoutingFormBinding></igo-routing-form>\r\n"
                    }] }
        ];
        /** @nocollapse */
        DirectionsToolComponent.ctorParameters = function () {
            return [
                { type: MapState }
            ];
        };
        DirectionsToolComponent = __decorate([
            i1$2.ToolComponent({
                name: 'directions',
                title: 'igo.integration.tools.directions',
                icon: 'directions'
            }),
            __metadata("design:paramtypes", [MapState])
        ], DirectionsToolComponent);
        return DirectionsToolComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IgoAppDirectionsModule = /** @class */ (function () {
        function IgoAppDirectionsModule() {
        }
        /**
         * @return {?}
         */
        IgoAppDirectionsModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: IgoAppDirectionsModule,
                    providers: []
                };
            };
        IgoAppDirectionsModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [i1.IgoCatalogModule],
                        declarations: [DirectionsToolComponent],
                        exports: [DirectionsToolComponent],
                        entryComponents: [DirectionsToolComponent],
                        schemas: [i0.CUSTOM_ELEMENTS_SCHEMA]
                    },] }
        ];
        return IgoAppDirectionsModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IgoAppWorkspaceModule = /** @class */ (function () {
        function IgoAppWorkspaceModule() {
        }
        IgoAppWorkspaceModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [],
                        declarations: [],
                        exports: []
                    },] }
        ];
        return IgoAppWorkspaceModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ImportExportToolComponent = /** @class */ (function () {
        function ImportExportToolComponent(mapState) {
            this.mapState = mapState;
        }
        Object.defineProperty(ImportExportToolComponent.prototype, "map", {
            /**
             * Map to measure on
             * @internal
             */
            get: /**
             * Map to measure on
             * \@internal
             * @return {?}
             */ function () { return this.mapState.map; },
            enumerable: true,
            configurable: true
        });
        ImportExportToolComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-import-export-tool',
                        template: "<igo-import-export [map]=\"map\"></igo-import-export>\r\n",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        ImportExportToolComponent.ctorParameters = function () {
            return [
                { type: MapState }
            ];
        };
        ImportExportToolComponent = __decorate([
            i1$2.ToolComponent({
                name: 'importExport',
                title: 'igo.integration.tools.importExport',
                icon: 'file-move'
            }),
            __metadata("design:paramtypes", [MapState])
        ], ImportExportToolComponent);
        return ImportExportToolComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IgoAppImportExportModule = /** @class */ (function () {
        function IgoAppImportExportModule() {
        }
        /**
         * @return {?}
         */
        IgoAppImportExportModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: IgoAppImportExportModule,
                    providers: []
                };
            };
        IgoAppImportExportModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [i1.IgoImportExportModule],
                        declarations: [ImportExportToolComponent],
                        exports: [ImportExportToolComponent],
                        entryComponents: [ImportExportToolComponent],
                        schemas: [i0.CUSTOM_ELEMENTS_SCHEMA]
                    },] }
        ];
        return IgoAppImportExportModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MapDetailsToolComponent = /** @class */ (function () {
        function MapDetailsToolComponent() {
            this.toggleLegendOnVisibilityChange = false;
            this.expandLegendOfVisibleLayers = false;
            this.updateLegendOnResolutionChange = false;
            this.ogcFiltersInLayers = true;
            this.layerListControls = {};
        }
        Object.defineProperty(MapDetailsToolComponent.prototype, "excludeBaseLayers", {
            get: /**
             * @return {?}
             */ function () {
                return this.layerListControls.excludeBaseLayers || false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapDetailsToolComponent.prototype, "layerFilterAndSortOptions", {
            get: /**
             * @return {?}
             */ function () {
                /** @type {?} */
                var filterSortOptions = Object.assign({
                    showToolbar: i1.LayerListControlsEnum.default
                }, this.layerListControls);
                switch (this.layerListControls.showToolbar) {
                    case i1.LayerListControlsEnum.always:
                        filterSortOptions.showToolbar = i1.LayerListControlsEnum.always;
                        filterSortOptions.toolbarThreshold = undefined;
                        break;
                    case i1.LayerListControlsEnum.never:
                        filterSortOptions.showToolbar = i1.LayerListControlsEnum.never;
                        filterSortOptions.toolbarThreshold = undefined;
                        break;
                    default:
                        break;
                }
                return filterSortOptions;
            },
            enumerable: true,
            configurable: true
        });
        MapDetailsToolComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-map-details-tool',
                        template: "<igo-layer-list\r\n  igoLayerListBinding\r\n  [excludeBaseLayers]=\"excludeBaseLayers\"\r\n  [layerFilterAndSortOptions]=\"layerFilterAndSortOptions\"\r\n  [expandLegendOfVisibleLayers]=\"expandLegendOfVisibleLayers\"\r\n  [toggleLegendOnVisibilityChange]=\"toggleLegendOnVisibilityChange\"\r\n  [updateLegendOnResolutionChange]=\"updateLegendOnResolutionChange\">\r\n\r\n  <ng-template #igoLayerItemToolbar let-layer=\"layer\">\r\n    <igo-download-button [layer]=\"layer\"></igo-download-button>\r\n    <igo-metadata-button [layer]=\"layer\"></igo-metadata-button>\r\n    <igo-ogc-filter-button [ogcFiltersInLayers]=\"ogcFiltersInLayers\" [layer]=\"layer\"></igo-ogc-filter-button>\r\n  </ng-template>\r\n\r\n</igo-layer-list>\r\n"
                    }] }
        ];
        MapDetailsToolComponent.propDecorators = {
            toggleLegendOnVisibilityChange: [{ type: i0.Input }],
            expandLegendOfVisibleLayers: [{ type: i0.Input }],
            updateLegendOnResolutionChange: [{ type: i0.Input }],
            ogcFiltersInLayers: [{ type: i0.Input }],
            layerListControls: [{ type: i0.Input }]
        };
        MapDetailsToolComponent = __decorate([
            i1$2.ToolComponent({
                name: 'mapDetails',
                title: 'igo.integration.tools.map',
                icon: 'map'
            })
        ], MapDetailsToolComponent);
        return MapDetailsToolComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Tool to browse a map's layers or to choose a different map
     */
    var MapToolComponent = /** @class */ (function () {
        function MapToolComponent() {
            this.toggleLegendOnVisibilityChange = false;
            this.expandLegendOfVisibleLayers = false;
            this.updateLegendOnResolutionChange = false;
            this.ogcFiltersInLayers = true;
            this.layerListControls = {};
        }
        Object.defineProperty(MapToolComponent.prototype, "excludeBaseLayers", {
            get: /**
             * @return {?}
             */ function () {
                return this.layerListControls.excludeBaseLayers || false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapToolComponent.prototype, "layerFilterAndSortOptions", {
            get: /**
             * @return {?}
             */ function () {
                /** @type {?} */
                var filterSortOptions = Object.assign({
                    showToolbar: i1.LayerListControlsEnum.default
                }, this.layerListControls);
                switch (this.layerListControls.showToolbar) {
                    case i1.LayerListControlsEnum.always:
                        filterSortOptions.showToolbar = i1.LayerListControlsEnum.always;
                        filterSortOptions.toolbarThreshold = undefined;
                        break;
                    case i1.LayerListControlsEnum.never:
                        filterSortOptions.showToolbar = i1.LayerListControlsEnum.never;
                        filterSortOptions.toolbarThreshold = undefined;
                        break;
                    default:
                        break;
                }
                return filterSortOptions;
            },
            enumerable: true,
            configurable: true
        });
        MapToolComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-map-tool',
                        template: "<mat-tab-group>\r\n\r\n  <mat-tab [label]=\"'igo.integration.tools.map' |\u00A0translate\">\r\n    <igo-layer-list\r\n      igoLayerListBinding\r\n      [excludeBaseLayers]=\"excludeBaseLayers\"\r\n      [layerFilterAndSortOptions]=\"layerFilterAndSortOptions\"\r\n      [expandLegendOfVisibleLayers]=\"expandLegendOfVisibleLayers\"\r\n      [toggleLegendOnVisibilityChange]=\"toggleLegendOnVisibilityChange\"\r\n      [updateLegendOnResolutionChange]=\"updateLegendOnResolutionChange\">\r\n\r\n      <ng-template #igoLayerItemToolbar let-layer=\"layer\">\r\n        <igo-download-button [layer]=\"layer\"></igo-download-button>\r\n        <igo-metadata-button [layer]=\"layer\"></igo-metadata-button>\r\n        <igo-ogc-filter-button [ogcFiltersInLayers]=\"ogcFiltersInLayers\" [layer]=\"layer\"></igo-ogc-filter-button>\r\n      </ng-template>\r\n\r\n    </igo-layer-list>\r\n  </mat-tab>\r\n\r\n  <mat-tab [label]=\"'igo.integration.tools.contexts' |\u00A0translate\">\r\n    <igo-context-list igoContextListBinding></igo-context-list>\r\n  </mat-tab>\r\n\r\n</mat-tab-group>\r\n",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        styles: ["mat-tab-group,mat-tab-group ::ng-deep .mat-tab-body-wrapper{height:100%}"]
                    }] }
        ];
        MapToolComponent.propDecorators = {
            toggleLegendOnVisibilityChange: [{ type: i0.Input }],
            expandLegendOfVisibleLayers: [{ type: i0.Input }],
            updateLegendOnResolutionChange: [{ type: i0.Input }],
            ogcFiltersInLayers: [{ type: i0.Input }],
            layerListControls: [{ type: i0.Input }]
        };
        /**
         * Tool to browse a map's layers or to choose a different map
         */
        MapToolComponent = __decorate([
            i1$2.ToolComponent({
                name: 'map',
                title: 'igo.integration.tools.map',
                icon: 'map'
            })
        ], MapToolComponent);
        return MapToolComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IgoAppMapModule = /** @class */ (function () {
        function IgoAppMapModule() {
        }
        /**
         * @return {?}
         */
        IgoAppMapModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: IgoAppMapModule,
                    providers: []
                };
            };
        IgoAppMapModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            material.MatTabsModule,
                            i4.IgoLanguageModule,
                            i1.IgoLayerModule,
                            i1.IgoMetadataModule,
                            i1.IgoDownloadModule,
                            i1.IgoFilterModule,
                            i1$1.IgoContextModule
                        ],
                        declarations: [MapToolComponent, MapDetailsToolComponent],
                        exports: [MapToolComponent, MapDetailsToolComponent],
                        entryComponents: [MapToolComponent, MapDetailsToolComponent],
                        schemas: [i0.CUSTOM_ELEMENTS_SCHEMA]
                    },] }
        ];
        return IgoAppMapModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Service that holds the state of the measure module
     */
    var MeasureState = /** @class */ (function () {
        function MeasureState(mapState) {
            this.mapState = mapState;
            /**
             * Store that holds the measures
             */
            this.store = new i1.FeatureStore([], {
                map: this.mapState.map
            });
        }
        MeasureState.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        MeasureState.ctorParameters = function () {
            return [
                { type: MapState }
            ];
        };
        /** @nocollapse */ MeasureState.ngInjectableDef = i0.defineInjectable({ factory: function MeasureState_Factory() { return new MeasureState(i0.inject(MapState)); }, token: MeasureState, providedIn: "root" });
        return MeasureState;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Tool to measure lengths and areas
     */
    var MeasurerToolComponent = /** @class */ (function () {
        function MeasurerToolComponent(measureState, mapState) {
            this.measureState = measureState;
            this.mapState = mapState;
        }
        Object.defineProperty(MeasurerToolComponent.prototype, "store", {
            /**
             * Map to measure on
             * @internal
             */
            get: /**
             * Map to measure on
             * \@internal
             * @return {?}
             */ function () { return this.measureState.store; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MeasurerToolComponent.prototype, "map", {
            /**
             * Map to measure on
             * @internal
             */
            get: /**
             * Map to measure on
             * \@internal
             * @return {?}
             */ function () { return this.mapState.map; },
            enumerable: true,
            configurable: true
        });
        MeasurerToolComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-measurer-tool',
                        template: "<igo-measurer [store]=\"store\" [map]=\"map\"></igo-measurer>\r\n",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        MeasurerToolComponent.ctorParameters = function () {
            return [
                { type: MeasureState },
                { type: MapState }
            ];
        };
        /**
         * Tool to measure lengths and areas
         */
        MeasurerToolComponent = __decorate([
            i1$2.ToolComponent({
                name: 'measurer',
                title: 'igo.integration.tools.measurer',
                icon: 'ruler'
            }),
            __metadata("design:paramtypes", [MeasureState,
                MapState])
        ], MeasurerToolComponent);
        return MeasurerToolComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @ignore
     */
    var IgoAppMeasurerToolModule = /** @class */ (function () {
        function IgoAppMeasurerToolModule() {
        }
        IgoAppMeasurerToolModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            i1.IgoMeasurerModule
                        ],
                        declarations: [MeasurerToolComponent],
                        exports: [MeasurerToolComponent],
                        entryComponents: [MeasurerToolComponent],
                        schemas: [i0.CUSTOM_ELEMENTS_SCHEMA]
                    },] }
        ];
        return IgoAppMeasurerToolModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IgoAppMeasureModule = /** @class */ (function () {
        function IgoAppMeasureModule() {
        }
        IgoAppMeasureModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [],
                        declarations: [],
                        exports: [
                            IgoAppMeasurerToolModule
                        ]
                    },] }
        ];
        return IgoAppMeasureModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PrintToolComponent = /** @class */ (function () {
        function PrintToolComponent(mapState) {
            this.mapState = mapState;
        }
        Object.defineProperty(PrintToolComponent.prototype, "map", {
            get: /**
             * @return {?}
             */ function () {
                return this.mapState.map;
            },
            enumerable: true,
            configurable: true
        });
        PrintToolComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-print-tool',
                        template: "<igo-print [map]=\"map\"></igo-print>\r\n"
                    }] }
        ];
        /** @nocollapse */
        PrintToolComponent.ctorParameters = function () {
            return [
                { type: MapState }
            ];
        };
        PrintToolComponent = __decorate([
            i1$2.ToolComponent({
                name: 'print',
                title: 'igo.integration.tools.print',
                icon: 'printer'
            }),
            __metadata("design:paramtypes", [MapState])
        ], PrintToolComponent);
        return PrintToolComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IgoAppPrintModule = /** @class */ (function () {
        function IgoAppPrintModule() {
        }
        /**
         * @return {?}
         */
        IgoAppPrintModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: IgoAppPrintModule,
                    providers: []
                };
            };
        IgoAppPrintModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [i1.IgoPrintModule],
                        declarations: [PrintToolComponent],
                        exports: [PrintToolComponent],
                        entryComponents: [PrintToolComponent],
                        schemas: [i0.CUSTOM_ELEMENTS_SCHEMA]
                    },] }
        ];
        return IgoAppPrintModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Service that holds the state of the search module
     */
    var SearchState = /** @class */ (function () {
        function SearchState(searchSourceService) {
            this.searchSourceService = searchSourceService;
            /**
             * Store that holds the search results
             */
            this.store = new i1$2.EntityStore([]);
        }
        Object.defineProperty(SearchState.prototype, "searchTypes", {
            /**
             * Search types currently enabled in the search source service
             */
            get: /**
             * Search types currently enabled in the search source service
             * @return {?}
             */ function () {
                return this.searchSourceService
                    .getEnabledSources()
                    .map(( /**
             * @param {?} source
             * @return {?}
             */function (source) { return (( /** @type {?} */(source.constructor))).type; }));
            },
            enumerable: true,
            configurable: true
        });
        SearchState.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        SearchState.ctorParameters = function () {
            return [
                { type: i1.SearchSourceService }
            ];
        };
        /** @nocollapse */ SearchState.ngInjectableDef = i0.defineInjectable({ factory: function SearchState_Factory() { return new SearchState(i0.inject(i1.SearchSourceService)); }, token: SearchState, providedIn: "root" });
        return SearchState;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Tool to browse the search results
     */
    var SearchResultsToolComponent = /** @class */ (function () {
        function SearchResultsToolComponent(mapState, layerService, searchState // private cdRef: ChangeDetectorRef
        ) {
            this.mapState = mapState;
            this.layerService = layerService;
            this.searchState = searchState;
            this.topPanelState = 'initial';
            this.format = new olFormatGeoJSON();
        }
        Object.defineProperty(SearchResultsToolComponent.prototype, "store", {
            /**
             * Store holding the search results
             * @internal
             */
            get: /**
             * Store holding the search results
             * \@internal
             * @return {?}
             */ function () {
                return this.searchState.store;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SearchResultsToolComponent.prototype, "map", {
            /**
             * Map to display the results on
             * @internal
             */
            get: /**
             * Map to display the results on
             * \@internal
             * @return {?}
             */ function () {
                return this.mapState.map;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SearchResultsToolComponent.prototype, "featureTitle", {
            get: /**
             * @return {?}
             */ function () {
                return this.feature ? i1$2.getEntityTitle(this.feature) : undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SearchResultsToolComponent.prototype, "feature$", {
            get: /**
             * @return {?}
             */ function () {
                var _this = this;
                return this.store.stateView
                    .firstBy$(( /**
             * @param {?} e
             * @return {?}
             */function (e) { return e.state.focused; }))
                    .pipe(operators.map(( /**
             * @param {?} element
             * @return {?}
             */function (element) {
                    _this.feature = element ? (( /** @type {?} */(element.entity.data))) : undefined;
                    return _this.feature;
                })));
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Try to add a feature to the map when it's being focused
         * @internal
         * @param result A search result that could be a feature
         */
        /**
         * Try to add a feature to the map when it's being focused
         * \@internal
         * @param {?} result A search result that could be a feature
         * @return {?}
         */
        SearchResultsToolComponent.prototype.onResultFocus = /**
         * Try to add a feature to the map when it's being focused
         * \@internal
         * @param {?} result A search result that could be a feature
         * @return {?}
         */
            function (result) {
                if (this.topPanelState === 'initial') {
                    this.toggleTopPanel();
                }
                this.tryAddFeatureToMap(result);
            };
        /**
         * Try to add a feature or a layer to the map when it's being selected
         * @internal
         * @param result A search result that could be a feature or some layer options
         */
        /**
         * Try to add a feature or a layer to the map when it's being selected
         * \@internal
         * @param {?} result A search result that could be a feature or some layer options
         * @return {?}
         */
        SearchResultsToolComponent.prototype.onResultSelect = /**
         * Try to add a feature or a layer to the map when it's being selected
         * \@internal
         * @param {?} result A search result that could be a feature or some layer options
         * @return {?}
         */
            function (result) {
                if (this.topPanelState === 'initial') {
                    this.toggleTopPanel();
                }
                this.tryAddFeatureToMap(result);
                this.tryAddLayerToMap(result);
            };
        /**
         * @return {?}
         */
        SearchResultsToolComponent.prototype.toggleTopPanel = /**
         * @return {?}
         */
            function () {
                if (this.topPanelState === 'collapsed') {
                    this.topPanelState = 'expanded';
                }
                else {
                    this.topPanelState = 'collapsed';
                }
            };
        /**
         * @return {?}
         */
        SearchResultsToolComponent.prototype.zoomToFeatureExtent = /**
         * @return {?}
         */
            function () {
                if (this.feature.geometry) {
                    /** @type {?} */
                    var olFeature = this.format.readFeature(this.feature, {
                        dataProjection: this.feature.projection,
                        featureProjection: this.map.projection
                    });
                    i1.moveToOlFeatures(this.map, [olFeature], i1.FeatureMotion.Zoom);
                }
            };
        /**
         * Try to add a feature to the map overlay
         * @param result A search result that could be a feature
         */
        /**
         * Try to add a feature to the map overlay
         * @private
         * @param {?} result A search result that could be a feature
         * @return {?}
         */
        SearchResultsToolComponent.prototype.tryAddFeatureToMap = /**
         * Try to add a feature to the map overlay
         * @private
         * @param {?} result A search result that could be a feature
         * @return {?}
         */
            function (result) {
                if (result.meta.dataType !== i1.FEATURE) {
                    return undefined;
                }
                /** @type {?} */
                var feature = (( /** @type {?} */(result))).data;
                // Somethimes features have no geometry. It happens with some GetFeatureInfo
                if (feature.geometry === undefined) {
                    return;
                }
                this.map.overlay.setFeatures([feature], i1.FeatureMotion.Default);
            };
        /**
         * Try to add a layer to the map
         * @param result A search result that could be some layer options
         */
        /**
         * Try to add a layer to the map
         * @private
         * @param {?} result A search result that could be some layer options
         * @return {?}
         */
        SearchResultsToolComponent.prototype.tryAddLayerToMap = /**
         * Try to add a layer to the map
         * @private
         * @param {?} result A search result that could be some layer options
         * @return {?}
         */
            function (result) {
                var _this = this;
                if (this.map === undefined) {
                    return;
                }
                if (result.meta.dataType !== i1.LAYER) {
                    return undefined;
                }
                /** @type {?} */
                var layerOptions = (( /** @type {?} */(result))).data;
                this.layerService
                    .createAsyncLayer(layerOptions)
                    .subscribe(( /**
             * @param {?} layer
             * @return {?}
             */function (layer) { return _this.map.addLayer(layer); }));
            };
        SearchResultsToolComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-search-results-tool',
                        template: "<igo-flexible\r\n  #topPanel\r\n  initial=\"100%\"\r\n  initialMobile=\"100%\"\r\n  collapsed=\"60%\"\r\n  expanded=\"calc(100% - 58px)\"\r\n  [state]=\"topPanelState\">\r\n\r\n  <div class=\"igo-content\">\r\n    <igo-search-results\r\n      [store]=\"store\"\r\n      (resultFocus)=\"onResultFocus($event)\"\r\n      (resultSelect)=\"onResultSelect($event)\">\r\n    </igo-search-results>\r\n  </div>\r\n\r\n  <div igoFlexibleFill class=\"igo-content\">\r\n    <igo-panel [title]=\"featureTitle\" *ngIf=\"feature$ |\u00A0async\">\r\n\r\n      <button\r\n        mat-icon-button\r\n        panelLeftButton\r\n        class=\"igo-icon-button\"\r\n        (click)=\"toggleTopPanel()\">\r\n        <mat-icon [svgIcon]=\"topPanel.state === 'collapsed'? 'arrow-down' : 'arrow-up'\"></mat-icon>\r\n      </button>\r\n\r\n      <button\r\n        mat-icon-button\r\n        panelRightButton\r\n        class=\"igo-icon-button\"\r\n        (click)=\"zoomToFeatureExtent()\"\r\n        *ngIf=\"feature.geometry\">\r\n        <mat-icon svgIcon=\"magnify-plus-outline\"></mat-icon>\r\n      </button>\r\n\r\n      <igo-feature-details\r\n        [feature]=\"feature$ | async\">\r\n      </igo-feature-details>\r\n    </igo-panel>\r\n  </div>\r\n\r\n</igo-flexible>\r\n",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        SearchResultsToolComponent.ctorParameters = function () {
            return [
                { type: MapState },
                { type: i1.LayerService },
                { type: SearchState }
            ];
        };
        /**
         * Tool to browse the search results
         */
        SearchResultsToolComponent = __decorate([
            i1$2.ToolComponent({
                name: 'searchResults',
                title: 'igo.integration.tools.searchResults',
                icon: 'magnify'
            }),
            __metadata("design:paramtypes", [MapState,
                i1.LayerService,
                SearchState // private cdRef: ChangeDetectorRef
            ])
        ], SearchResultsToolComponent);
        return SearchResultsToolComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IgoAppSearchModule = /** @class */ (function () {
        function IgoAppSearchModule() {
        }
        IgoAppSearchModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            material.MatIconModule,
                            material.MatButtonModule,
                            i1.IgoFeatureModule,
                            i1.IgoSearchModule,
                            i1$2.IgoFlexibleModule,
                            i1$2.IgoPanelModule,
                            i1.IgoFeatureDetailsModule
                        ],
                        declarations: [SearchResultsToolComponent],
                        exports: [SearchResultsToolComponent],
                        entryComponents: [SearchResultsToolComponent],
                        schemas: [i0.CUSTOM_ELEMENTS_SCHEMA]
                    },] }
        ];
        return IgoAppSearchModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var OgcFilterToolComponent = /** @class */ (function () {
        function OgcFilterToolComponent() {
        }
        OgcFilterToolComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-ogc-filter-tool',
                        template: "<igo-ogc-filterable-list igoOgcFilterableListBinding></igo-ogc-filterable-list>\r\n\r\n\r\n"
                    }] }
        ];
        /** @nocollapse */
        OgcFilterToolComponent.ctorParameters = function () { return []; };
        OgcFilterToolComponent = __decorate([
            i1$2.ToolComponent({
                name: 'ogcFilter',
                title: 'igo.integration.tools.ogcFilter',
                icon: 'filter-list'
            }),
            __metadata("design:paramtypes", [])
        ], OgcFilterToolComponent);
        return OgcFilterToolComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TimeAnalysisToolComponent = /** @class */ (function () {
        function TimeAnalysisToolComponent() {
        }
        TimeAnalysisToolComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-time-analysis-tool',
                        template: "<igo-time-filter-list igoTimeFilterListBinding></igo-time-filter-list>\r\n"
                    }] }
        ];
        /** @nocollapse */
        TimeAnalysisToolComponent.ctorParameters = function () { return []; };
        TimeAnalysisToolComponent = __decorate([
            i1$2.ToolComponent({
                name: 'timeAnalysis',
                title: 'igo.integration.tools.timeAnalysis',
                icon: 'history'
            }),
            __metadata("design:paramtypes", [])
        ], TimeAnalysisToolComponent);
        return TimeAnalysisToolComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IgoAppFilterModule = /** @class */ (function () {
        function IgoAppFilterModule() {
        }
        /**
         * @return {?}
         */
        IgoAppFilterModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: IgoAppFilterModule,
                    providers: []
                };
            };
        IgoAppFilterModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [i1.IgoFilterModule],
                        declarations: [OgcFilterToolComponent, TimeAnalysisToolComponent],
                        exports: [OgcFilterToolComponent, TimeAnalysisToolComponent],
                        entryComponents: [OgcFilterToolComponent, TimeAnalysisToolComponent],
                        schemas: [i0.CUSTOM_ELEMENTS_SCHEMA]
                    },] }
        ];
        return IgoAppFilterModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AboutToolComponent = /** @class */ (function () {
        function AboutToolComponent() {
            this.html = "\n    <h1>About IGO</h1>\n    <p>IGO (for Open GIS Infrastructure) is a Free Open Source Software\n    for Geospatial (FOSS4G) developed by organisations in the government\n    of Quebec in Canada. The objective is to make it open, common,\n    modular, based on open governance model supported by multiple\n    organisations. IGO is a Web GIS software with a client & server\n    component to manage and publish massive amount of Geospatial data.\n    </p>\n    </hr>\n    <a href='mailto:info@igouverte.org' target='_top'>info[@]igouverte.org</a>\n    </br>\n    <a href='http://www.igouverte.org' target='_blank'>www.igouverte.org</A>";
        }
        AboutToolComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'igo-about-tool',
                        template: "<igo-custom-html\r\n[html]=\"html\">\r\n</igo-custom-html>\r\n"
                    }] }
        ];
        /** @nocollapse */
        AboutToolComponent.ctorParameters = function () { return []; };
        AboutToolComponent.propDecorators = {
            html: [{ type: i0.Input }]
        };
        AboutToolComponent = __decorate([
            i1$2.ToolComponent({
                name: 'about',
                title: 'igo.integration.tools.about',
                icon: 'help-circle'
            }),
            __metadata("design:paramtypes", [])
        ], AboutToolComponent);
        return AboutToolComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IgoAppAboutModule = /** @class */ (function () {
        function IgoAppAboutModule() {
        }
        /**
         * @return {?}
         */
        IgoAppAboutModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: IgoAppAboutModule,
                    providers: []
                };
            };
        IgoAppAboutModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [i1$2.IgoCustomHtmlModule],
                        declarations: [AboutToolComponent],
                        exports: [AboutToolComponent],
                        entryComponents: [AboutToolComponent],
                        schemas: [i0.CUSTOM_ELEMENTS_SCHEMA]
                    },] }
        ];
        return IgoAppAboutModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IgoIntegrationModule = /** @class */ (function () {
        function IgoIntegrationModule() {
        }
        IgoIntegrationModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [],
                        declarations: [],
                        exports: [
                            IgoAppContextModule,
                            IgoAppCatalogModule,
                            IgoAppDirectionsModule,
                            IgoAppWorkspaceModule,
                            IgoAppImportExportModule,
                            IgoAppMapModule,
                            IgoAppMeasureModule,
                            IgoAppPrintModule,
                            IgoAppSearchModule,
                            IgoAppFilterModule,
                            IgoAppAboutModule
                        ]
                    },] }
        ];
        return IgoIntegrationModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IgoAppToolModule = /** @class */ (function () {
        function IgoAppToolModule() {
        }
        IgoAppToolModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [],
                        declarations: [],
                        exports: []
                    },] }
        ];
        return IgoAppToolModule;
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
     * Service that holds the state of the context module
     */
    var ContextState = /** @class */ (function () {
        function ContextState(contextService, toolService, toolState, languageService) {
            var _this = this;
            this.contextService = contextService;
            this.toolService = toolService;
            this.toolState = toolState;
            this.languageService = languageService;
            /**
             * Observable of the active context
             */
            this.context$ = new rxjs.BehaviorSubject(undefined);
            this.contextService.context$.subscribe(( /**
             * @param {?} context
             * @return {?}
             */function (context) {
                _this.onContextChange(context);
            }));
        }
        /**
         * Set the active context
         * @param context Detailed context
         */
        /**
         * Set the active context
         * @private
         * @param {?} context Detailed context
         * @return {?}
         */
        ContextState.prototype.setContext = /**
         * Set the active context
         * @private
         * @param {?} context Detailed context
         * @return {?}
         */
            function (context) {
                this.updateTools(context);
                this.context$.next(context);
            };
        /**
         * Update the tool state with the context's tools
         * @param context Detailed context
         */
        /**
         * Update the tool state with the context's tools
         * @private
         * @param {?} context Detailed context
         * @return {?}
         */
        ContextState.prototype.updateTools = /**
         * Update the tool state with the context's tools
         * @private
         * @param {?} context Detailed context
         * @return {?}
         */
            function (context) {
                var _this = this;
                /** @type {?} */
                var toolbox = this.toolState.toolbox;
                /** @type {?} */
                var tools = [];
                /** @type {?} */
                var contextTools = context.tools || [];
                contextTools.forEach(( /**
                 * @param {?} contextTool
                 * @return {?}
                 */function (contextTool) {
                    /** @type {?} */
                    var baseTool = _this.toolService.getTool(contextTool.name);
                    if (baseTool === undefined) {
                        return;
                    }
                    /** @type {?} */
                    var options = Object.assign({}, baseTool.options || {}, contextTool.options || {});
                    /** @type {?} */
                    var tool = Object.assign({}, baseTool, contextTool, { options: options });
                    tools.push(tool);
                }));
                toolbox.setTools(tools);
                toolbox.setToolbar(context.toolbar || []);
                // TODO: This is a patch so the context service can work without
                // injecting the ToolState or without being completely refactored
                this.contextService.setTools([].concat(tools));
            };
        /**
         * Set a new context and update the tool state
         * @param context Detailed context
         */
        /**
         * Set a new context and update the tool state
         * @private
         * @param {?} context Detailed context
         * @return {?}
         */
        ContextState.prototype.onContextChange = /**
         * Set a new context and update the tool state
         * @private
         * @param {?} context Detailed context
         * @return {?}
         */
            function (context) {
                if (context === undefined) {
                    return;
                }
                this.setContext(context);
            };
        ContextState.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        ContextState.ctorParameters = function () {
            return [
                { type: i1$1.ContextService },
                { type: i1$2.ToolService },
                { type: ToolState },
                { type: i4.LanguageService }
            ];
        };
        /** @nocollapse */ ContextState.ngInjectableDef = i0.defineInjectable({ factory: function ContextState_Factory() { return new ContextState(i0.inject(i1$1.ContextService), i0.inject(i1$2.ToolService), i0.inject(ToolState), i0.inject(i4.LanguageService)); }, token: ContextState, providedIn: "root" });
        return ContextState;
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
     * Service that holds the state of the workspace module
     */
    var WorkspaceState = /** @class */ (function () {
        function WorkspaceState() {
            var _this = this;
            /**
             * Observable of the active workspace
             */
            this.workspace$ = new rxjs.BehaviorSubject(undefined);
            this._store = new i1$2.WorkspaceStore([]);
            this._store.stateView
                .firstBy$(( /**
         * @param {?} record
         * @return {?}
         */function (record) { return record.state.active === true; }))
                .subscribe(( /**
         * @param {?} record
         * @return {?}
         */function (record) {
                /** @type {?} */
                var workspace = record ? record.entity : undefined;
                _this.workspace$.next(workspace);
            }));
        }
        Object.defineProperty(WorkspaceState.prototype, "store", {
            /**
             * Store that holds all the available workspaces
             */
            get: /**
             * Store that holds all the available workspaces
             * @return {?}
             */ function () { return this._store; },
            enumerable: true,
            configurable: true
        });
        WorkspaceState.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        WorkspaceState.ctorParameters = function () { return []; };
        /** @nocollapse */ WorkspaceState.ngInjectableDef = i0.defineInjectable({ factory: function WorkspaceState_Factory() { return new WorkspaceState(); }, token: WorkspaceState, providedIn: "root" });
        return WorkspaceState;
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
     * Service that holds the state of the query module
     */
    var QueryState = /** @class */ (function () {
        function QueryState() {
            /**
             * Store that holds the query results
             */
            this.store = new i1$2.EntityStore([]);
        }
        QueryState.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        QueryState.ctorParameters = function () { return []; };
        /** @nocollapse */ QueryState.ngInjectableDef = i0.defineInjectable({ factory: function QueryState_Factory() { return new QueryState(); }, token: QueryState, providedIn: "root" });
        return QueryState;
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

    exports.IgoIntegrationModule = IgoIntegrationModule;
    exports.IgoAppAboutModule = IgoAppAboutModule;
    exports.IgoAppContextModule = IgoAppContextModule;
    exports.IgoAppCatalogModule = IgoAppCatalogModule;
    exports.IgoAppCatalogBrowserToolModule = IgoAppCatalogBrowserToolModule;
    exports.IgoAppCatalogLibraryToolModule = IgoAppCatalogLibraryToolModule;
    exports.IgoAppDirectionsModule = IgoAppDirectionsModule;
    exports.IgoAppWorkspaceModule = IgoAppWorkspaceModule;
    exports.IgoAppFilterModule = IgoAppFilterModule;
    exports.IgoAppImportExportModule = IgoAppImportExportModule;
    exports.IgoAppMapModule = IgoAppMapModule;
    exports.IgoAppMeasureModule = IgoAppMeasureModule;
    exports.IgoAppPrintModule = IgoAppPrintModule;
    exports.IgoAppSearchModule = IgoAppSearchModule;
    exports.IgoAppToolModule = IgoAppToolModule;
    exports.AboutToolComponent = AboutToolComponent;
    exports.ContextManagerToolComponent = ContextManagerToolComponent;
    exports.ContextEditorToolComponent = ContextEditorToolComponent;
    exports.ContextPermissionManagerToolComponent = ContextPermissionManagerToolComponent;
    exports.ContextShareToolComponent = ContextShareToolComponent;
    exports.ContextState = ContextState;
    exports.CatalogState = CatalogState;
    exports.CatalogBrowserToolComponent = CatalogBrowserToolComponent;
    exports.CatalogLibraryToolComponent = CatalogLibraryToolComponent;
    exports.DirectionsToolComponent = DirectionsToolComponent;
    exports.WorkspaceState = WorkspaceState;
    exports.OgcFilterToolComponent = OgcFilterToolComponent;
    exports.TimeAnalysisToolComponent = TimeAnalysisToolComponent;
    exports.ImportExportToolComponent = ImportExportToolComponent;
    exports.MapDetailsToolComponent = MapDetailsToolComponent;
    exports.MapToolComponent = MapToolComponent;
    exports.MapState = MapState;
    exports.MeasureState = MeasureState;
    exports.MeasurerToolComponent = MeasurerToolComponent;
    exports.PrintToolComponent = PrintToolComponent;
    exports.QueryState = QueryState;
    exports.SearchState = SearchState;
    exports.SearchResultsToolComponent = SearchResultsToolComponent;
    exports.ToolState = ToolState;
    exports.ɵv = AboutToolComponent;
    exports.ɵi = CatalogBrowserToolComponent;
    exports.ɵg = CatalogLibraryToolComponent;
    exports.ɵh = CatalogState;
    exports.ɵa = ContextEditorToolComponent;
    exports.ɵb = ContextManagerToolComponent;
    exports.ɵd = ContextPermissionManagerToolComponent;
    exports.ɵe = ContextShareToolComponent;
    exports.ɵj = DirectionsToolComponent;
    exports.ɵt = OgcFilterToolComponent;
    exports.ɵu = TimeAnalysisToolComponent;
    exports.ɵk = ImportExportToolComponent;
    exports.ɵm = MapDetailsToolComponent;
    exports.ɵl = MapToolComponent;
    exports.ɵf = MapState;
    exports.ɵp = MeasureState;
    exports.ɵo = MeasurerToolComponent;
    exports.ɵn = IgoAppMeasurerToolModule;
    exports.ɵq = PrintToolComponent;
    exports.ɵr = SearchResultsToolComponent;
    exports.ɵs = SearchState;
    exports.ɵc = ToolState;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=igo2-integration.umd.js.map