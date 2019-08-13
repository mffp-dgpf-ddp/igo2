import { CommonModule } from '@angular/common';
import { MatTabsModule, MatIconModule, MatButtonModule } from '@angular/material';
import { map } from 'rxjs/operators';
import olFormatGeoJSON from 'ol/format/GeoJSON';
import { IgoMap, MapService, ProjectionService, IgoMeasurerModule, FeatureStore, SearchSourceService, CatalogService, LayerListControlsEnum, moveToOlFeatures, FeatureMotion, FEATURE, LAYER, LayerService, IgoRoutingModule, IgoImportExportModule, IgoFilterModule, IgoLayerModule, IgoMetadataModule, IgoDownloadModule, IgoPrintModule, IgoCatalogBrowserModule, IgoCatalogLibraryModule, IgoFeatureModule, IgoSearchModule, IgoFeatureDetailsModule } from '@igo2/geo';
import { __decorate, __metadata } from 'tslib';
import { IgoLanguageModule, LanguageService } from '@igo2/core';
import { IgoContextModule, ContextService } from '@igo2/context';
import { BehaviorSubject } from 'rxjs';
import { Component, Injectable, NgModule, CUSTOM_ELEMENTS_SCHEMA, defineInjectable, inject, ChangeDetectionStrategy, Input } from '@angular/core';
import { ToolComponent, Toolbox, ToolService, EntityStore, getEntityTitle, IgoCustomHtmlModule, IgoFlexibleModule, IgoPanelModule, WorkspaceStore } from '@igo2/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ContextEditorToolComponent = /** @class */ (function () {
    function ContextEditorToolComponent() {
    }
    ContextEditorToolComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-context-editor-tool',
                    template: "<igo-context-edit igoContextEditBinding></igo-context-edit>\r\n"
                }] }
    ];
    ContextEditorToolComponent = __decorate([
        ToolComponent({
            name: 'contextEditor',
            title: 'igo.integration.tools.contexts',
            icon: 'star'
        })
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
        this.toolbox = new Toolbox();
        this.toolbox.setTools(this.toolService.getTools());
    }
    ToolState.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ToolState.ctorParameters = function () { return [
        { type: ToolService }
    ]; };
    /** @nocollapse */ ToolState.ngInjectableDef = defineInjectable({ factory: function ToolState_Factory() { return new ToolState(inject(ToolService)); }, token: ToolState, providedIn: "root" });
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
        this.toolState.toolbox.activateTool('contextPermissionManager');
    };
    ContextManagerToolComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-context-manager-tool',
                    template: "<igo-context-list\r\n  igoContextListBinding\r\n  (edit)=\"editContext()\"\r\n  (managePermissions)=\"managePermissions()\">\r\n</igo-context-list>\r\n"
                }] }
    ];
    /** @nocollapse */
    ContextManagerToolComponent.ctorParameters = function () { return [
        { type: ToolState }
    ]; };
    ContextManagerToolComponent = __decorate([
        ToolComponent({
            name: 'contextManager',
            title: 'igo.integration.tools.contexts',
            icon: 'star'
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
        { type: Component, args: [{
                    selector: 'igo-context-permission-manager-tool',
                    template: "<igo-context-permissions igoContextPermissionsBinding></igo-context-permissions>\r\n"
                }] }
    ];
    ContextPermissionManagerToolComponent = __decorate([
        ToolComponent({
            name: 'contextPermissionManager',
            title: 'igo.integration.tools.contexts',
            icon: 'star'
        })
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
        this._map = new IgoMap({
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
         */
        function () { return this._map; },
        enumerable: true,
        configurable: true
    });
    MapState.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    MapState.ctorParameters = function () { return [
        { type: MapService },
        { type: ProjectionService }
    ]; };
    /** @nocollapse */ MapState.ngInjectableDef = defineInjectable({ factory: function MapState_Factory() { return new MapState(inject(MapService), inject(ProjectionService)); }, token: MapState, providedIn: "root" });
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
         */
        function () { return this.mapState.map; },
        enumerable: true,
        configurable: true
    });
    ContextShareToolComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-context-share-tool',
                    template: "<igo-share-map\r\n  igoShareMapBinding\r\n  [map]=\"map\"\r\n  [hasCopyLinkButton]=\"hasCopyLinkButton\"\r\n  [hasShareMapButton]=\"hasShareMapButton\"\r\n></igo-share-map>\r\n"
                }] }
    ];
    /** @nocollapse */
    ContextShareToolComponent.ctorParameters = function () { return [
        { type: MapState }
    ]; };
    ContextShareToolComponent.propDecorators = {
        hasCopyLinkButton: [{ type: Input }],
        hasShareMapButton: [{ type: Input }]
    };
    ContextShareToolComponent = __decorate([
        ToolComponent({
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
        { type: NgModule, args: [{
                    imports: [IgoContextModule],
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
                    schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
        this._catalogStore = new EntityStore([]);
    }
    Object.defineProperty(CatalogState.prototype, "catalogStore", {
        /**
         * Store that contains all the catalogs
         */
        get: /**
         * Store that contains all the catalogs
         * @return {?}
         */
        function () { return this._catalogStore; },
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
        return this.catalogItemsStores.get((/** @type {?} */ (catalog.id)));
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
        this.catalogItemsStores.set((/** @type {?} */ (catalog.id)), store);
    };
    CatalogState.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    CatalogState.ctorParameters = function () { return []; };
    /** @nocollapse */ CatalogState.ngInjectableDef = defineInjectable({ factory: function CatalogState_Factory() { return new CatalogState(); }, token: CatalogState, providedIn: "root" });
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
         */
        function () {
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
        this.catalogService.loadCatalogs().subscribe((/**
         * @param {?} catalogs
         * @return {?}
         */
        function (catalogs) {
            _this.store.clear();
            _this.store.load(catalogs);
        }));
    };
    CatalogLibraryToolComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-catalog-library-tool',
                    template: "<igo-catalog-library\r\n  [store]=\"store\"\r\n  (catalogSelectChange)=\"onCatalogSelectChange($event)\">\r\n</igo-catalog-library>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    CatalogLibraryToolComponent.ctorParameters = function () { return [
        { type: CatalogService },
        { type: CatalogState },
        { type: ToolState }
    ]; };
    /**
     * Tool to browse the list of available catalogs.
     */
    CatalogLibraryToolComponent = __decorate([
        ToolComponent({
            name: 'catalog',
            title: 'igo.integration.tools.catalog',
            icon: 'layers-plus'
        }),
        __metadata("design:paramtypes", [CatalogService,
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
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        IgoCatalogLibraryModule
                    ],
                    declarations: [CatalogLibraryToolComponent],
                    exports: [CatalogLibraryToolComponent],
                    entryComponents: [CatalogLibraryToolComponent],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
        this.store$ = new BehaviorSubject(undefined);
        /**
         * Whether a group can be toggled when it's collapsed
         */
        this.toggleCollapsedGroup = true;
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
         */
        function () {
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
            .firstBy$((/**
         * @param {?} record
         * @return {?}
         */
        function (record) { return record.state.selected === true; }))
            .subscribe((/**
         * @param {?} record
         * @return {?}
         */
        function (record) {
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
        store = new EntityStore([]);
        this.catalogState.setCatalogItemsStore(catalog, store);
        this.catalogService
            .loadCatalogItems(catalog)
            .subscribe((/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            store.load(items);
            _this.store$.next(store);
        }));
    };
    CatalogBrowserToolComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-catalog-browser-tool',
                    template: "<igo-catalog-browser\r\n  *ngIf=\"store$ | async as store\"\r\n  [catalog]=\"catalog\"\r\n  [store]=\"store\"\r\n  [map]=\"map\"\r\n  [toggleCollapsedGroup]=\"toggleCollapsedGroup\">\r\n</igo-catalog-browser>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    CatalogBrowserToolComponent.ctorParameters = function () { return [
        { type: CatalogService },
        { type: CatalogState },
        { type: MapState }
    ]; };
    CatalogBrowserToolComponent.propDecorators = {
        toggleCollapsedGroup: [{ type: Input }]
    };
    /**
     * Tool to browse a catalog's groups and layers and display them to a map.
     */
    CatalogBrowserToolComponent = __decorate([
        ToolComponent({
            name: 'catalogBrowser',
            title: 'igo.integration.tools.catalog',
            icon: 'photo-browser'
        }),
        __metadata("design:paramtypes", [CatalogService,
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
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        IgoCatalogBrowserModule
                    ],
                    declarations: [CatalogBrowserToolComponent],
                    exports: [CatalogBrowserToolComponent],
                    entryComponents: [CatalogBrowserToolComponent],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
        { type: NgModule, args: [{
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
         */
        function () {
            return this.mapState.map;
        },
        enumerable: true,
        configurable: true
    });
    DirectionsToolComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-directions-tool',
                    template: "<igo-routing-form igoRoutingFormBinding></igo-routing-form>\r\n"
                }] }
    ];
    /** @nocollapse */
    DirectionsToolComponent.ctorParameters = function () { return [
        { type: MapState }
    ]; };
    DirectionsToolComponent = __decorate([
        ToolComponent({
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
        { type: NgModule, args: [{
                    imports: [IgoRoutingModule],
                    declarations: [DirectionsToolComponent],
                    exports: [DirectionsToolComponent],
                    entryComponents: [DirectionsToolComponent],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
        { type: NgModule, args: [{
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
         */
        function () { return this.mapState.map; },
        enumerable: true,
        configurable: true
    });
    ImportExportToolComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-import-export-tool',
                    template: "<igo-import-export [map]=\"map\"></igo-import-export>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    ImportExportToolComponent.ctorParameters = function () { return [
        { type: MapState }
    ]; };
    ImportExportToolComponent = __decorate([
        ToolComponent({
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
        { type: NgModule, args: [{
                    imports: [IgoImportExportModule],
                    declarations: [ImportExportToolComponent],
                    exports: [ImportExportToolComponent],
                    entryComponents: [ImportExportToolComponent],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
        this.queryBadge = false;
    }
    Object.defineProperty(MapDetailsToolComponent.prototype, "excludeBaseLayers", {
        get: /**
         * @return {?}
         */
        function () {
            return this.layerListControls.excludeBaseLayers || false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapDetailsToolComponent.prototype, "layerFilterAndSortOptions", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var filterSortOptions = Object.assign({
                showToolbar: LayerListControlsEnum.default
            }, this.layerListControls);
            switch (this.layerListControls.showToolbar) {
                case LayerListControlsEnum.always:
                    filterSortOptions.showToolbar = LayerListControlsEnum.always;
                    filterSortOptions.toolbarThreshold = undefined;
                    break;
                case LayerListControlsEnum.never:
                    filterSortOptions.showToolbar = LayerListControlsEnum.never;
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
        { type: Component, args: [{
                    selector: 'igo-map-details-tool',
                    template: "<igo-layer-list\r\n  igoLayerListBinding\r\n  [excludeBaseLayers]=\"excludeBaseLayers\"\r\n  [layerFilterAndSortOptions]=\"layerFilterAndSortOptions\"\r\n  [expandLegendOfVisibleLayers]=\"expandLegendOfVisibleLayers\"\r\n  [toggleLegendOnVisibilityChange]=\"toggleLegendOnVisibilityChange\"\r\n  [updateLegendOnResolutionChange]=\"updateLegendOnResolutionChange\"\r\n  [queryBadge]=\"queryBadge\">\r\n\r\n  <ng-template #igoLayerItemToolbar let-layer=\"layer\">\r\n    <igo-download-button [layer]=\"layer\"></igo-download-button>\r\n    <igo-metadata-button [layer]=\"layer\"></igo-metadata-button>\r\n    <igo-ogc-filter-button [ogcFiltersInLayers]=\"ogcFiltersInLayers\" [layer]=\"layer\"></igo-ogc-filter-button>\r\n  </ng-template>\r\n\r\n</igo-layer-list>\r\n"
                }] }
    ];
    MapDetailsToolComponent.propDecorators = {
        toggleLegendOnVisibilityChange: [{ type: Input }],
        expandLegendOfVisibleLayers: [{ type: Input }],
        updateLegendOnResolutionChange: [{ type: Input }],
        ogcFiltersInLayers: [{ type: Input }],
        layerListControls: [{ type: Input }],
        queryBadge: [{ type: Input }]
    };
    MapDetailsToolComponent = __decorate([
        ToolComponent({
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
        this.queryBadge = false;
    }
    Object.defineProperty(MapToolComponent.prototype, "excludeBaseLayers", {
        get: /**
         * @return {?}
         */
        function () {
            return this.layerListControls.excludeBaseLayers || false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapToolComponent.prototype, "layerFilterAndSortOptions", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var filterSortOptions = Object.assign({
                showToolbar: LayerListControlsEnum.default
            }, this.layerListControls);
            switch (this.layerListControls.showToolbar) {
                case LayerListControlsEnum.always:
                    filterSortOptions.showToolbar = LayerListControlsEnum.always;
                    filterSortOptions.toolbarThreshold = undefined;
                    break;
                case LayerListControlsEnum.never:
                    filterSortOptions.showToolbar = LayerListControlsEnum.never;
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
        { type: Component, args: [{
                    selector: 'igo-map-tool',
                    template: "<mat-tab-group>\r\n\r\n  <mat-tab [label]=\"'igo.integration.tools.map' |\u00A0translate\">\r\n    <igo-layer-list\r\n      igoLayerListBinding\r\n      [excludeBaseLayers]=\"excludeBaseLayers\"\r\n      [layerFilterAndSortOptions]=\"layerFilterAndSortOptions\"\r\n      [expandLegendOfVisibleLayers]=\"expandLegendOfVisibleLayers\"\r\n      [toggleLegendOnVisibilityChange]=\"toggleLegendOnVisibilityChange\"\r\n      [updateLegendOnResolutionChange]=\"updateLegendOnResolutionChange\"\r\n      [queryBadge]=\"queryBadge\">\r\n\r\n      <ng-template #igoLayerItemToolbar let-layer=\"layer\">\r\n        <igo-download-button [layer]=\"layer\"></igo-download-button>\r\n        <igo-metadata-button [layer]=\"layer\"></igo-metadata-button>\r\n        <igo-ogc-filter-button [ogcFiltersInLayers]=\"ogcFiltersInLayers\" [layer]=\"layer\"></igo-ogc-filter-button>\r\n      </ng-template>\r\n\r\n    </igo-layer-list>\r\n  </mat-tab>\r\n\r\n  <mat-tab [label]=\"'igo.integration.tools.contexts' |\u00A0translate\">\r\n    <igo-context-list igoContextListBinding></igo-context-list>\r\n  </mat-tab>\r\n\r\n</mat-tab-group>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["mat-tab-group,mat-tab-group ::ng-deep .mat-tab-body-wrapper{height:100%}"]
                }] }
    ];
    MapToolComponent.propDecorators = {
        toggleLegendOnVisibilityChange: [{ type: Input }],
        expandLegendOfVisibleLayers: [{ type: Input }],
        updateLegendOnResolutionChange: [{ type: Input }],
        ogcFiltersInLayers: [{ type: Input }],
        layerListControls: [{ type: Input }],
        queryBadge: [{ type: Input }]
    };
    /**
     * Tool to browse a map's layers or to choose a different map
     */
    MapToolComponent = __decorate([
        ToolComponent({
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
        { type: NgModule, args: [{
                    imports: [
                        MatTabsModule,
                        IgoLanguageModule,
                        IgoLayerModule,
                        IgoMetadataModule,
                        IgoDownloadModule,
                        IgoFilterModule,
                        IgoContextModule
                    ],
                    declarations: [MapToolComponent, MapDetailsToolComponent],
                    exports: [MapToolComponent, MapDetailsToolComponent],
                    entryComponents: [MapToolComponent, MapDetailsToolComponent],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
        this.store = new FeatureStore([], {
            map: this.mapState.map
        });
    }
    MeasureState.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    MeasureState.ctorParameters = function () { return [
        { type: MapState }
    ]; };
    /** @nocollapse */ MeasureState.ngInjectableDef = defineInjectable({ factory: function MeasureState_Factory() { return new MeasureState(inject(MapState)); }, token: MeasureState, providedIn: "root" });
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
         */
        function () { return this.measureState.store; },
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
         */
        function () { return this.mapState.map; },
        enumerable: true,
        configurable: true
    });
    MeasurerToolComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-measurer-tool',
                    template: "<igo-measurer [store]=\"store\" [map]=\"map\"></igo-measurer>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    MeasurerToolComponent.ctorParameters = function () { return [
        { type: MeasureState },
        { type: MapState }
    ]; };
    /**
     * Tool to measure lengths and areas
     */
    MeasurerToolComponent = __decorate([
        ToolComponent({
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
        { type: NgModule, args: [{
                    imports: [
                        IgoMeasurerModule
                    ],
                    declarations: [MeasurerToolComponent],
                    exports: [MeasurerToolComponent],
                    entryComponents: [MeasurerToolComponent],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
        { type: NgModule, args: [{
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
         */
        function () {
            return this.mapState.map;
        },
        enumerable: true,
        configurable: true
    });
    PrintToolComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-print-tool',
                    template: "<igo-print [map]=\"map\"></igo-print>\r\n"
                }] }
    ];
    /** @nocollapse */
    PrintToolComponent.ctorParameters = function () { return [
        { type: MapState }
    ]; };
    PrintToolComponent = __decorate([
        ToolComponent({
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
        { type: NgModule, args: [{
                    imports: [IgoPrintModule],
                    declarations: [PrintToolComponent],
                    exports: [PrintToolComponent],
                    entryComponents: [PrintToolComponent],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
        this.store = new EntityStore([]);
    }
    Object.defineProperty(SearchState.prototype, "searchTypes", {
        /**
         * Search types currently enabled in the search source service
         */
        get: /**
         * Search types currently enabled in the search source service
         * @return {?}
         */
        function () {
            return this.searchSourceService
                .getEnabledSources()
                .map((/**
             * @param {?} source
             * @return {?}
             */
            function (source) { return ((/** @type {?} */ (source.constructor))).type; }));
        },
        enumerable: true,
        configurable: true
    });
    SearchState.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    SearchState.ctorParameters = function () { return [
        { type: SearchSourceService }
    ]; };
    /** @nocollapse */ SearchState.ngInjectableDef = defineInjectable({ factory: function SearchState_Factory() { return new SearchState(inject(SearchSourceService)); }, token: SearchState, providedIn: "root" });
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
         */
        function () {
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
         */
        function () {
            return this.mapState.map;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchResultsToolComponent.prototype, "featureTitle", {
        get: /**
         * @return {?}
         */
        function () {
            return this.feature ? getEntityTitle(this.feature) : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchResultsToolComponent.prototype, "feature$", {
        get: /**
         * @return {?}
         */
        function () {
            var _this = this;
            return this.store.stateView
                .firstBy$((/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return e.state.focused; }))
                .pipe(map((/**
             * @param {?} element
             * @return {?}
             */
            function (element) {
                _this.feature = element ? ((/** @type {?} */ (element.entity.data))) : undefined;
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
            moveToOlFeatures(this.map, [olFeature], FeatureMotion.Zoom);
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
        if (result.meta.dataType !== FEATURE) {
            return undefined;
        }
        /** @type {?} */
        var feature = ((/** @type {?} */ (result))).data;
        // Somethimes features have no geometry. It happens with some GetFeatureInfo
        if (feature.geometry === undefined) {
            return;
        }
        this.map.overlay.setFeatures([feature], FeatureMotion.Default);
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
        if (result.meta.dataType !== LAYER) {
            return undefined;
        }
        /** @type {?} */
        var layerOptions = ((/** @type {?} */ (result))).data;
        this.layerService
            .createAsyncLayer(layerOptions)
            .subscribe((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) { return _this.map.addLayer(layer); }));
    };
    SearchResultsToolComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-search-results-tool',
                    template: "<igo-flexible\r\n  #topPanel\r\n  initial=\"100%\"\r\n  initialMobile=\"100%\"\r\n  collapsed=\"60%\"\r\n  expanded=\"calc(100% - 58px)\"\r\n  [state]=\"topPanelState\">\r\n\r\n  <div class=\"igo-content\">\r\n    <igo-search-results\r\n      [store]=\"store\"\r\n      (resultFocus)=\"onResultFocus($event)\"\r\n      (resultSelect)=\"onResultSelect($event)\">\r\n    </igo-search-results>\r\n  </div>\r\n\r\n  <div igoFlexibleFill class=\"igo-content\">\r\n    <igo-panel [title]=\"featureTitle\" *ngIf=\"feature$ |\u00A0async\">\r\n\r\n      <button\r\n        mat-icon-button\r\n        panelLeftButton\r\n        class=\"igo-icon-button\"\r\n        (click)=\"toggleTopPanel()\">\r\n        <mat-icon [svgIcon]=\"topPanel.state === 'collapsed'? 'arrow-down' : 'arrow-up'\"></mat-icon>\r\n      </button>\r\n\r\n      <button\r\n        mat-icon-button\r\n        panelRightButton\r\n        class=\"igo-icon-button\"\r\n        (click)=\"zoomToFeatureExtent()\"\r\n        *ngIf=\"feature.geometry\">\r\n        <mat-icon svgIcon=\"magnify-plus-outline\"></mat-icon>\r\n      </button>\r\n\r\n      <igo-feature-details\r\n        [feature]=\"feature$ | async\">\r\n      </igo-feature-details>\r\n    </igo-panel>\r\n  </div>\r\n\r\n</igo-flexible>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    SearchResultsToolComponent.ctorParameters = function () { return [
        { type: MapState },
        { type: LayerService },
        { type: SearchState }
    ]; };
    /**
     * Tool to browse the search results
     */
    SearchResultsToolComponent = __decorate([
        ToolComponent({
            name: 'searchResults',
            title: 'igo.integration.tools.searchResults',
            icon: 'magnify'
        }),
        __metadata("design:paramtypes", [MapState,
            LayerService,
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
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatIconModule,
                        MatButtonModule,
                        IgoFeatureModule,
                        IgoSearchModule,
                        IgoFlexibleModule,
                        IgoPanelModule,
                        IgoFeatureDetailsModule
                    ],
                    declarations: [SearchResultsToolComponent],
                    exports: [SearchResultsToolComponent],
                    entryComponents: [SearchResultsToolComponent],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
        { type: Component, args: [{
                    selector: 'igo-ogc-filter-tool',
                    template: "<igo-ogc-filterable-list igoOgcFilterableListBinding></igo-ogc-filterable-list>\r\n\r\n\r\n"
                }] }
    ];
    /** @nocollapse */
    OgcFilterToolComponent.ctorParameters = function () { return []; };
    OgcFilterToolComponent = __decorate([
        ToolComponent({
            name: 'ogcFilter',
            title: 'igo.integration.tools.ogcFilter',
            icon: 'filter'
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
        { type: Component, args: [{
                    selector: 'igo-time-analysis-tool',
                    template: "<igo-time-filter-list igoTimeFilterListBinding></igo-time-filter-list>\r\n"
                }] }
    ];
    /** @nocollapse */
    TimeAnalysisToolComponent.ctorParameters = function () { return []; };
    TimeAnalysisToolComponent = __decorate([
        ToolComponent({
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
        { type: NgModule, args: [{
                    imports: [IgoFilterModule],
                    declarations: [OgcFilterToolComponent, TimeAnalysisToolComponent],
                    exports: [OgcFilterToolComponent, TimeAnalysisToolComponent],
                    entryComponents: [OgcFilterToolComponent, TimeAnalysisToolComponent],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
        { type: Component, args: [{
                    selector: 'igo-about-tool',
                    template: "<igo-custom-html\r\n[html]=\"html\">\r\n</igo-custom-html>\r\n"
                }] }
    ];
    /** @nocollapse */
    AboutToolComponent.ctorParameters = function () { return []; };
    AboutToolComponent.propDecorators = {
        html: [{ type: Input }]
    };
    AboutToolComponent = __decorate([
        ToolComponent({
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
        { type: NgModule, args: [{
                    imports: [IgoCustomHtmlModule],
                    declarations: [AboutToolComponent],
                    exports: [AboutToolComponent],
                    entryComponents: [AboutToolComponent],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
        { type: NgModule, args: [{
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
        { type: NgModule, args: [{
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
        this.context$ = new BehaviorSubject(undefined);
        this.contextService.context$.subscribe((/**
         * @param {?} context
         * @return {?}
         */
        function (context) {
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
        contextTools.forEach((/**
         * @param {?} contextTool
         * @return {?}
         */
        function (contextTool) {
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
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ContextState.ctorParameters = function () { return [
        { type: ContextService },
        { type: ToolService },
        { type: ToolState },
        { type: LanguageService }
    ]; };
    /** @nocollapse */ ContextState.ngInjectableDef = defineInjectable({ factory: function ContextState_Factory() { return new ContextState(inject(ContextService), inject(ToolService), inject(ToolState), inject(LanguageService)); }, token: ContextState, providedIn: "root" });
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
        this.workspace$ = new BehaviorSubject(undefined);
        this._store = new WorkspaceStore([]);
        this._store.stateView
            .firstBy$((/**
         * @param {?} record
         * @return {?}
         */
        function (record) { return record.state.active === true; }))
            .subscribe((/**
         * @param {?} record
         * @return {?}
         */
        function (record) {
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
         */
        function () { return this._store; },
        enumerable: true,
        configurable: true
    });
    WorkspaceState.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    WorkspaceState.ctorParameters = function () { return []; };
    /** @nocollapse */ WorkspaceState.ngInjectableDef = defineInjectable({ factory: function WorkspaceState_Factory() { return new WorkspaceState(); }, token: WorkspaceState, providedIn: "root" });
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
        this.store = new EntityStore([]);
    }
    QueryState.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    QueryState.ctorParameters = function () { return []; };
    /** @nocollapse */ QueryState.ngInjectableDef = defineInjectable({ factory: function QueryState_Factory() { return new QueryState(); }, token: QueryState, providedIn: "root" });
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

export { IgoIntegrationModule, IgoAppAboutModule, IgoAppContextModule, IgoAppCatalogModule, IgoAppCatalogBrowserToolModule, IgoAppCatalogLibraryToolModule, IgoAppDirectionsModule, IgoAppWorkspaceModule, IgoAppFilterModule, IgoAppImportExportModule, IgoAppMapModule, IgoAppMeasureModule, IgoAppPrintModule, IgoAppSearchModule, IgoAppToolModule, AboutToolComponent, ContextManagerToolComponent, ContextEditorToolComponent, ContextPermissionManagerToolComponent, ContextShareToolComponent, ContextState, CatalogState, CatalogBrowserToolComponent, CatalogLibraryToolComponent, DirectionsToolComponent, WorkspaceState, OgcFilterToolComponent, TimeAnalysisToolComponent, ImportExportToolComponent, MapDetailsToolComponent, MapToolComponent, MapState, MeasureState, MeasurerToolComponent, PrintToolComponent, QueryState, SearchState, SearchResultsToolComponent, ToolState, AboutToolComponent as ɵv, CatalogBrowserToolComponent as ɵi, CatalogLibraryToolComponent as ɵg, CatalogState as ɵh, ContextEditorToolComponent as ɵa, ContextManagerToolComponent as ɵb, ContextPermissionManagerToolComponent as ɵd, ContextShareToolComponent as ɵe, DirectionsToolComponent as ɵj, OgcFilterToolComponent as ɵt, TimeAnalysisToolComponent as ɵu, ImportExportToolComponent as ɵk, MapDetailsToolComponent as ɵm, MapToolComponent as ɵl, MapState as ɵf, MeasureState as ɵp, MeasurerToolComponent as ɵo, IgoAppMeasurerToolModule as ɵn, PrintToolComponent as ɵq, SearchResultsToolComponent as ɵr, SearchState as ɵs, ToolState as ɵc };

//# sourceMappingURL=igo2-integration.js.map