import { CommonModule } from '@angular/common';
import { MatTabsModule, MatIconModule, MatButtonModule } from '@angular/material';
import { map } from 'rxjs/operators';
import olFormatGeoJSON from 'ol/format/GeoJSON';
import { IgoMap, MapService, ProjectionService, CatalogService, LayerListControlsEnum, FeatureStore, IgoMeasurerModule, SearchSourceService, moveToOlFeatures, FeatureMotion, FEATURE, LAYER, LayerService, IgoFilterModule, IgoImportExportModule, IgoLayerModule, IgoMetadataModule, IgoDownloadModule, IgoRoutingModule, IgoPrintModule, IgoCatalogBrowserModule, IgoCatalogLibraryModule, IgoFeatureModule, IgoSearchModule, IgoFeatureDetailsModule } from '@igo2/geo';
import { __decorate, __metadata } from 'tslib';
import { IgoLanguageModule, LanguageService } from '@igo2/core';
import { IgoContextModule, ContextService } from '@igo2/context';
import { BehaviorSubject } from 'rxjs';
import { Component, Injectable, NgModule, CUSTOM_ELEMENTS_SCHEMA, defineInjectable, ChangeDetectionStrategy, inject, Input } from '@angular/core';
import { ToolComponent, Toolbox, ToolService, EntityStore, getEntityTitle, IgoCustomHtmlModule, IgoFlexibleModule, IgoPanelModule, WorkspaceStore } from '@igo2/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let ContextEditorToolComponent = class ContextEditorToolComponent {
};
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Service that holds the state of the search module
 */
class ToolState {
    /**
     * @param {?} toolService
     */
    constructor(toolService) {
        this.toolService = toolService;
        /**
         * Toolbox that holds main tools
         */
        this.toolbox = new Toolbox();
        this.toolbox.setTools(this.toolService.getTools());
    }
}
ToolState.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ToolState.ctorParameters = () => [
    { type: ToolService }
];
/** @nocollapse */ ToolState.ngInjectableDef = defineInjectable({ factory: function ToolState_Factory() { return new ToolState(inject(ToolService)); }, token: ToolState, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let ContextManagerToolComponent = class ContextManagerToolComponent {
    /**
     * @param {?} toolState
     */
    constructor(toolState) {
        this.toolState = toolState;
    }
    /**
     * @return {?}
     */
    editContext() {
        this.toolState.toolbox.activateTool('contextEditor');
    }
    /**
     * @return {?}
     */
    managePermissions() {
        this.toolState.toolbox.activateTool('contextPermissionManager');
    }
};
ContextManagerToolComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-context-manager-tool',
                template: "<igo-context-list\r\n  igoContextListBinding\r\n  (edit)=\"editContext()\"\r\n  (managePermissions)=\"managePermissions()\">\r\n</igo-context-list>\r\n"
            }] }
];
/** @nocollapse */
ContextManagerToolComponent.ctorParameters = () => [
    { type: ToolState }
];
ContextManagerToolComponent = __decorate([
    ToolComponent({
        name: 'contextManager',
        title: 'igo.integration.tools.contexts',
        icon: 'star'
    }),
    __metadata("design:paramtypes", [ToolState])
], ContextManagerToolComponent);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let ContextPermissionManagerToolComponent = class ContextPermissionManagerToolComponent {
};
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Service that holds the state of the map module
 */
class MapState {
    /**
     * @param {?} mapService
     * @param {?} projectionService
     */
    constructor(mapService, projectionService // Don't remove this or it'll never be injected
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
    /**
     * Active map
     * @return {?}
     */
    get map() { return this._map; }
}
MapState.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
MapState.ctorParameters = () => [
    { type: MapService },
    { type: ProjectionService }
];
/** @nocollapse */ MapState.ngInjectableDef = defineInjectable({ factory: function MapState_Factory() { return new MapState(inject(MapService), inject(ProjectionService)); }, token: MapState, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let ContextShareToolComponent = class ContextShareToolComponent {
    /**
     * @param {?} mapState
     */
    constructor(mapState) {
        this.mapState = mapState;
        this.hasCopyLinkButton = false;
        this.hasShareMapButton = true;
    }
    /**
     * @return {?}
     */
    get map() { return this.mapState.map; }
};
ContextShareToolComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-context-share-tool',
                template: "<igo-share-map\r\n  igoShareMapBinding\r\n  [map]=\"map\"\r\n  [hasCopyLinkButton]=\"hasCopyLinkButton\"\r\n  [hasShareMapButton]=\"hasShareMapButton\"\r\n></igo-share-map>\r\n"
            }] }
];
/** @nocollapse */
ContextShareToolComponent.ctorParameters = () => [
    { type: MapState }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoAppContextModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Service that holds the state of the catalog module
 */
class CatalogState {
    constructor() {
        /**
         * Catalog -> Catalog items store mapping
         */
        this.catalogItemsStores = new Map();
        this._catalogStore = new EntityStore([]);
    }
    /**
     * Store that contains all the catalogs
     * @return {?}
     */
    get catalogStore() { return this._catalogStore; }
    /**
     * Get a catalog's items store
     * @param {?} catalog Catalog
     * @return {?} Store that contains the catalog items
     */
    getCatalogItemsStore(catalog) {
        return this.catalogItemsStores.get((/** @type {?} */ (catalog.id)));
    }
    /**
     * Bind a catalog items store to a catalog
     * @param {?} catalog Catalog
     * @param {?} store Catalog items store
     * @return {?}
     */
    setCatalogItemsStore(catalog, store) {
        this.catalogItemsStores.set((/** @type {?} */ (catalog.id)), store);
    }
}
CatalogState.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
CatalogState.ctorParameters = () => [];
/** @nocollapse */ CatalogState.ngInjectableDef = defineInjectable({ factory: function CatalogState_Factory() { return new CatalogState(); }, token: CatalogState, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Tool to browse the list of available catalogs.
 */
let CatalogLibraryToolComponent = /**
 * Tool to browse the list of available catalogs.
 */
class CatalogLibraryToolComponent {
    /**
     * @param {?} catalogService
     * @param {?} catalogState
     * @param {?} toolState
     */
    constructor(catalogService, catalogState, toolState) {
        this.catalogService = catalogService;
        this.catalogState = catalogState;
        this.toolState = toolState;
    }
    /**
     * Store that contains the catalogs
     * \@internal
     * @return {?}
     */
    get store() {
        return this.catalogState.catalogStore;
    }
    /**
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        if (this.store.entities$.value.length === 0) {
            this.loadCatalogs();
        }
    }
    /**
     * When the selected catalog changes, toggle the the CatalogBrowser tool.
     * \@internal
     * @param {?} event Select event
     * @return {?}
     */
    onCatalogSelectChange(event) {
        if (event.selected === false) {
            return;
        }
        this.toolState.toolbox.activateTool('catalogBrowser');
    }
    /**
     * Get all the available catalogs from the CatalogService and
     * load them into the store.
     * @private
     * @return {?}
     */
    loadCatalogs() {
        this.catalogService.loadCatalogs().subscribe((/**
         * @param {?} catalogs
         * @return {?}
         */
        (catalogs) => {
            this.store.clear();
            this.store.load(catalogs);
        }));
    }
};
CatalogLibraryToolComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-catalog-library-tool',
                template: "<igo-catalog-library\r\n  [store]=\"store\"\r\n  (catalogSelectChange)=\"onCatalogSelectChange($event)\">\r\n</igo-catalog-library>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
CatalogLibraryToolComponent.ctorParameters = () => [
    { type: CatalogService },
    { type: CatalogState },
    { type: ToolState }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
class IgoAppCatalogLibraryToolModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Tool to browse a catalog's groups and layers and display them to a map.
 */
let CatalogBrowserToolComponent = /**
 * Tool to browse a catalog's groups and layers and display them to a map.
 */
class CatalogBrowserToolComponent {
    /**
     * @param {?} catalogService
     * @param {?} catalogState
     * @param {?} mapState
     */
    constructor(catalogService, catalogState, mapState) {
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
    /**
     * Map to add layers to
     * \@internal
     * @return {?}
     */
    get map() {
        return this.mapState.map;
    }
    /**
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const catalogStore = this.catalogState.catalogStore;
        this.catalog$$ = catalogStore.stateView
            .firstBy$((/**
         * @param {?} record
         * @return {?}
         */
        (record) => record.state.selected === true))
            .subscribe((/**
         * @param {?} record
         * @return {?}
         */
        (record) => {
            if (record && record.entity) {
                /** @type {?} */
                const catalog = record.entity;
                this.catalog = catalog;
                this.loadCatalogItems(catalog);
            }
        }));
    }
    /**
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        this.catalog$$.unsubscribe();
    }
    /**
     * Get the selected catalog's items from the CatalogService and
     * load them into the store.
     * @private
     * @param {?} catalog Selected catalog
     * @return {?}
     */
    loadCatalogItems(catalog) {
        /** @type {?} */
        let store = this.catalogState.getCatalogItemsStore(catalog);
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
        (items) => {
            store.load(items);
            this.store$.next(store);
        }));
    }
};
CatalogBrowserToolComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-catalog-browser-tool',
                template: "<igo-catalog-browser\r\n  *ngIf=\"store$ | async as store\"\r\n  [catalog]=\"catalog\"\r\n  [store]=\"store\"\r\n  [map]=\"map\"\r\n  [toggleCollapsedGroup]=\"toggleCollapsedGroup\">\r\n</igo-catalog-browser>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
CatalogBrowserToolComponent.ctorParameters = () => [
    { type: CatalogService },
    { type: CatalogState },
    { type: MapState }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
class IgoAppCatalogBrowserToolModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoAppCatalogModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let DirectionsToolComponent = class DirectionsToolComponent {
    /**
     * @param {?} mapState
     */
    constructor(mapState) {
        this.mapState = mapState;
    }
    /**
     * @return {?}
     */
    get map() {
        return this.mapState.map;
    }
};
DirectionsToolComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-directions-tool',
                template: "<igo-routing-form igoRoutingFormBinding></igo-routing-form>\r\n"
            }] }
];
/** @nocollapse */
DirectionsToolComponent.ctorParameters = () => [
    { type: MapState }
];
DirectionsToolComponent = __decorate([
    ToolComponent({
        name: 'directions',
        title: 'igo.integration.tools.directions',
        icon: 'directions'
    }),
    __metadata("design:paramtypes", [MapState])
], DirectionsToolComponent);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoAppDirectionsModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoAppDirectionsModule,
            providers: []
        };
    }
}
IgoAppDirectionsModule.decorators = [
    { type: NgModule, args: [{
                imports: [IgoRoutingModule],
                declarations: [DirectionsToolComponent],
                exports: [DirectionsToolComponent],
                entryComponents: [DirectionsToolComponent],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoAppWorkspaceModule {
}
IgoAppWorkspaceModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [],
                exports: []
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let ImportExportToolComponent = class ImportExportToolComponent {
    /**
     * @param {?} mapState
     */
    constructor(mapState) {
        this.mapState = mapState;
    }
    /**
     * Map to measure on
     * \@internal
     * @return {?}
     */
    get map() { return this.mapState.map; }
};
ImportExportToolComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-import-export-tool',
                template: "<igo-import-export [map]=\"map\"></igo-import-export>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
ImportExportToolComponent.ctorParameters = () => [
    { type: MapState }
];
ImportExportToolComponent = __decorate([
    ToolComponent({
        name: 'importExport',
        title: 'igo.integration.tools.importExport',
        icon: 'file-move'
    }),
    __metadata("design:paramtypes", [MapState])
], ImportExportToolComponent);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoAppImportExportModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoAppImportExportModule,
            providers: []
        };
    }
}
IgoAppImportExportModule.decorators = [
    { type: NgModule, args: [{
                imports: [IgoImportExportModule],
                declarations: [ImportExportToolComponent],
                exports: [ImportExportToolComponent],
                entryComponents: [ImportExportToolComponent],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let MapDetailsToolComponent = class MapDetailsToolComponent {
    constructor() {
        this.toggleLegendOnVisibilityChange = false;
        this.expandLegendOfVisibleLayers = false;
        this.updateLegendOnResolutionChange = false;
        this.ogcFiltersInLayers = true;
        this.layerListControls = {};
        this.queryBadge = false;
    }
    /**
     * @return {?}
     */
    get excludeBaseLayers() {
        return this.layerListControls.excludeBaseLayers || false;
    }
    /**
     * @return {?}
     */
    get layerFilterAndSortOptions() {
        /** @type {?} */
        const filterSortOptions = Object.assign({
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
    }
};
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Tool to browse a map's layers or to choose a different map
 */
let MapToolComponent = /**
 * Tool to browse a map's layers or to choose a different map
 */
class MapToolComponent {
    constructor() {
        this.toggleLegendOnVisibilityChange = false;
        this.expandLegendOfVisibleLayers = false;
        this.updateLegendOnResolutionChange = false;
        this.ogcFiltersInLayers = true;
        this.layerListControls = {};
        this.queryBadge = false;
    }
    /**
     * @return {?}
     */
    get excludeBaseLayers() {
        return this.layerListControls.excludeBaseLayers || false;
    }
    /**
     * @return {?}
     */
    get layerFilterAndSortOptions() {
        /** @type {?} */
        const filterSortOptions = Object.assign({
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
    }
};
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoAppMapModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoAppMapModule,
            providers: []
        };
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Service that holds the state of the measure module
 */
class MeasureState {
    /**
     * @param {?} mapState
     */
    constructor(mapState) {
        this.mapState = mapState;
        /**
         * Store that holds the measures
         */
        this.store = new FeatureStore([], {
            map: this.mapState.map
        });
    }
}
MeasureState.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
MeasureState.ctorParameters = () => [
    { type: MapState }
];
/** @nocollapse */ MeasureState.ngInjectableDef = defineInjectable({ factory: function MeasureState_Factory() { return new MeasureState(inject(MapState)); }, token: MeasureState, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Tool to measure lengths and areas
 */
let MeasurerToolComponent = /**
 * Tool to measure lengths and areas
 */
class MeasurerToolComponent {
    /**
     * @param {?} measureState
     * @param {?} mapState
     */
    constructor(measureState, mapState) {
        this.measureState = measureState;
        this.mapState = mapState;
    }
    /**
     * Map to measure on
     * \@internal
     * @return {?}
     */
    get store() { return this.measureState.store; }
    /**
     * Map to measure on
     * \@internal
     * @return {?}
     */
    get map() { return this.mapState.map; }
};
MeasurerToolComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-measurer-tool',
                template: "<igo-measurer [store]=\"store\" [map]=\"map\"></igo-measurer>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
MeasurerToolComponent.ctorParameters = () => [
    { type: MeasureState },
    { type: MapState }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
class IgoAppMeasurerToolModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoAppMeasureModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let PrintToolComponent = class PrintToolComponent {
    /**
     * @param {?} mapState
     */
    constructor(mapState) {
        this.mapState = mapState;
    }
    /**
     * @return {?}
     */
    get map() {
        return this.mapState.map;
    }
};
PrintToolComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-print-tool',
                template: "<igo-print [map]=\"map\"></igo-print>\r\n"
            }] }
];
/** @nocollapse */
PrintToolComponent.ctorParameters = () => [
    { type: MapState }
];
PrintToolComponent = __decorate([
    ToolComponent({
        name: 'print',
        title: 'igo.integration.tools.print',
        icon: 'printer'
    }),
    __metadata("design:paramtypes", [MapState])
], PrintToolComponent);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoAppPrintModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoAppPrintModule,
            providers: []
        };
    }
}
IgoAppPrintModule.decorators = [
    { type: NgModule, args: [{
                imports: [IgoPrintModule],
                declarations: [PrintToolComponent],
                exports: [PrintToolComponent],
                entryComponents: [PrintToolComponent],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Service that holds the state of the search module
 */
class SearchState {
    /**
     * @param {?} searchSourceService
     */
    constructor(searchSourceService) {
        this.searchSourceService = searchSourceService;
        /**
         * Store that holds the search results
         */
        this.store = new EntityStore([]);
    }
    /**
     * Search types currently enabled in the search source service
     * @return {?}
     */
    get searchTypes() {
        return this.searchSourceService
            .getEnabledSources()
            .map((/**
         * @param {?} source
         * @return {?}
         */
        (source) => ((/** @type {?} */ (source.constructor))).type));
    }
}
SearchState.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
SearchState.ctorParameters = () => [
    { type: SearchSourceService }
];
/** @nocollapse */ SearchState.ngInjectableDef = defineInjectable({ factory: function SearchState_Factory() { return new SearchState(inject(SearchSourceService)); }, token: SearchState, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Tool to browse the search results
 */
let SearchResultsToolComponent = /**
 * Tool to browse the search results
 */
class SearchResultsToolComponent {
    /**
     * @param {?} mapState
     * @param {?} layerService
     * @param {?} searchState
     */
    constructor(mapState, layerService, searchState // private cdRef: ChangeDetectorRef
    ) {
        this.mapState = mapState;
        this.layerService = layerService;
        this.searchState = searchState;
        this.topPanelState = 'initial';
        this.format = new olFormatGeoJSON();
    }
    /**
     * Store holding the search results
     * \@internal
     * @return {?}
     */
    get store() {
        return this.searchState.store;
    }
    /**
     * Map to display the results on
     * \@internal
     * @return {?}
     */
    get map() {
        return this.mapState.map;
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
    get feature$() {
        return this.store.stateView
            .firstBy$((/**
         * @param {?} e
         * @return {?}
         */
        e => e.state.focused))
            .pipe(map((/**
         * @param {?} element
         * @return {?}
         */
        element => {
            this.feature = element ? ((/** @type {?} */ (element.entity.data))) : undefined;
            return this.feature;
        })));
    }
    /**
     * Try to add a feature to the map when it's being focused
     * \@internal
     * @param {?} result A search result that could be a feature
     * @return {?}
     */
    onResultFocus(result) {
        if (this.topPanelState === 'initial') {
            this.toggleTopPanel();
        }
        this.tryAddFeatureToMap(result);
    }
    /**
     * Try to add a feature or a layer to the map when it's being selected
     * \@internal
     * @param {?} result A search result that could be a feature or some layer options
     * @return {?}
     */
    onResultSelect(result) {
        if (this.topPanelState === 'initial') {
            this.toggleTopPanel();
        }
        this.tryAddFeatureToMap(result);
        this.tryAddLayerToMap(result);
    }
    /**
     * @return {?}
     */
    toggleTopPanel() {
        if (this.topPanelState === 'collapsed') {
            this.topPanelState = 'expanded';
        }
        else {
            this.topPanelState = 'collapsed';
        }
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
     * Try to add a feature to the map overlay
     * @private
     * @param {?} result A search result that could be a feature
     * @return {?}
     */
    tryAddFeatureToMap(result) {
        if (result.meta.dataType !== FEATURE) {
            return undefined;
        }
        /** @type {?} */
        const feature = ((/** @type {?} */ (result))).data;
        // Somethimes features have no geometry. It happens with some GetFeatureInfo
        if (feature.geometry === undefined) {
            return;
        }
        this.map.overlay.setFeatures([feature], FeatureMotion.Default);
    }
    /**
     * Try to add a layer to the map
     * @private
     * @param {?} result A search result that could be some layer options
     * @return {?}
     */
    tryAddLayerToMap(result) {
        if (this.map === undefined) {
            return;
        }
        if (result.meta.dataType !== LAYER) {
            return undefined;
        }
        /** @type {?} */
        const layerOptions = ((/** @type {?} */ (result))).data;
        this.layerService
            .createAsyncLayer(layerOptions)
            .subscribe((/**
         * @param {?} layer
         * @return {?}
         */
        layer => this.map.addLayer(layer)));
    }
};
SearchResultsToolComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-search-results-tool',
                template: "<igo-flexible\r\n  #topPanel\r\n  initial=\"100%\"\r\n  initialMobile=\"100%\"\r\n  collapsed=\"60%\"\r\n  expanded=\"calc(100% - 58px)\"\r\n  [state]=\"topPanelState\">\r\n\r\n  <div class=\"igo-content\">\r\n    <igo-search-results\r\n      [store]=\"store\"\r\n      (resultFocus)=\"onResultFocus($event)\"\r\n      (resultSelect)=\"onResultSelect($event)\">\r\n    </igo-search-results>\r\n  </div>\r\n\r\n  <div igoFlexibleFill class=\"igo-content\">\r\n    <igo-panel [title]=\"featureTitle\" *ngIf=\"feature$ |\u00A0async\">\r\n\r\n      <button\r\n        mat-icon-button\r\n        panelLeftButton\r\n        class=\"igo-icon-button\"\r\n        (click)=\"toggleTopPanel()\">\r\n        <mat-icon [svgIcon]=\"topPanel.state === 'collapsed'? 'arrow-down' : 'arrow-up'\"></mat-icon>\r\n      </button>\r\n\r\n      <button\r\n        mat-icon-button\r\n        panelRightButton\r\n        class=\"igo-icon-button\"\r\n        (click)=\"zoomToFeatureExtent()\"\r\n        *ngIf=\"feature.geometry\">\r\n        <mat-icon svgIcon=\"magnify-plus-outline\"></mat-icon>\r\n      </button>\r\n\r\n      <igo-feature-details\r\n        [feature]=\"feature$ | async\">\r\n      </igo-feature-details>\r\n    </igo-panel>\r\n  </div>\r\n\r\n</igo-flexible>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
SearchResultsToolComponent.ctorParameters = () => [
    { type: MapState },
    { type: LayerService },
    { type: SearchState }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoAppSearchModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let OgcFilterToolComponent = class OgcFilterToolComponent {
    constructor() { }
};
OgcFilterToolComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-ogc-filter-tool',
                template: "<igo-ogc-filterable-list igoOgcFilterableListBinding></igo-ogc-filterable-list>\r\n\r\n\r\n"
            }] }
];
/** @nocollapse */
OgcFilterToolComponent.ctorParameters = () => [];
OgcFilterToolComponent = __decorate([
    ToolComponent({
        name: 'ogcFilter',
        title: 'igo.integration.tools.ogcFilter',
        icon: 'filter'
    }),
    __metadata("design:paramtypes", [])
], OgcFilterToolComponent);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let TimeAnalysisToolComponent = class TimeAnalysisToolComponent {
    constructor() { }
};
TimeAnalysisToolComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-time-analysis-tool',
                template: "<igo-time-filter-list igoTimeFilterListBinding></igo-time-filter-list>\r\n"
            }] }
];
/** @nocollapse */
TimeAnalysisToolComponent.ctorParameters = () => [];
TimeAnalysisToolComponent = __decorate([
    ToolComponent({
        name: 'timeAnalysis',
        title: 'igo.integration.tools.timeAnalysis',
        icon: 'history'
    }),
    __metadata("design:paramtypes", [])
], TimeAnalysisToolComponent);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoAppFilterModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoAppFilterModule,
            providers: []
        };
    }
}
IgoAppFilterModule.decorators = [
    { type: NgModule, args: [{
                imports: [IgoFilterModule],
                declarations: [OgcFilterToolComponent, TimeAnalysisToolComponent],
                exports: [OgcFilterToolComponent, TimeAnalysisToolComponent],
                entryComponents: [OgcFilterToolComponent, TimeAnalysisToolComponent],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let AboutToolComponent = class AboutToolComponent {
    constructor() {
        this.html = `
    <h1>About IGO</h1>
    <p>IGO (for Open GIS Infrastructure) is a Free Open Source Software
    for Geospatial (FOSS4G) developed by organisations in the government
    of Quebec in Canada. The objective is to make it open, common,
    modular, based on open governance model supported by multiple
    organisations. IGO is a Web GIS software with a client & server
    component to manage and publish massive amount of Geospatial data.
    </p>
    </hr>
    <a href='mailto:info@igouverte.org' target='_top'>info[@]igouverte.org</a>
    </br>
    <a href='http://www.igouverte.org' target='_blank'>www.igouverte.org</A>`;
    }
};
AboutToolComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-about-tool',
                template: "<igo-custom-html\r\n[html]=\"html\">\r\n</igo-custom-html>\r\n"
            }] }
];
/** @nocollapse */
AboutToolComponent.ctorParameters = () => [];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoAppAboutModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoAppAboutModule,
            providers: []
        };
    }
}
IgoAppAboutModule.decorators = [
    { type: NgModule, args: [{
                imports: [IgoCustomHtmlModule],
                declarations: [AboutToolComponent],
                exports: [AboutToolComponent],
                entryComponents: [AboutToolComponent],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoIntegrationModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoAppToolModule {
}
IgoAppToolModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [],
                exports: []
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
 * Service that holds the state of the context module
 */
class ContextState {
    /**
     * @param {?} contextService
     * @param {?} toolService
     * @param {?} toolState
     * @param {?} languageService
     */
    constructor(contextService, toolService, toolState, languageService) {
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
        (context) => {
            this.onContextChange(context);
        }));
    }
    /**
     * Set the active context
     * @private
     * @param {?} context Detailed context
     * @return {?}
     */
    setContext(context) {
        this.updateTools(context);
        this.context$.next(context);
    }
    /**
     * Update the tool state with the context's tools
     * @private
     * @param {?} context Detailed context
     * @return {?}
     */
    updateTools(context) {
        /** @type {?} */
        const toolbox = this.toolState.toolbox;
        /** @type {?} */
        const tools = [];
        /** @type {?} */
        const contextTools = context.tools || [];
        contextTools.forEach((/**
         * @param {?} contextTool
         * @return {?}
         */
        (contextTool) => {
            /** @type {?} */
            const baseTool = this.toolService.getTool(contextTool.name);
            if (baseTool === undefined) {
                return;
            }
            /** @type {?} */
            const options = Object.assign({}, baseTool.options || {}, contextTool.options || {});
            /** @type {?} */
            const tool = Object.assign({}, baseTool, contextTool, { options });
            tools.push(tool);
        }));
        toolbox.setTools(tools);
        toolbox.setToolbar(context.toolbar || []);
        // TODO: This is a patch so the context service can work without
        // injecting the ToolState or without being completely refactored
        this.contextService.setTools([].concat(tools));
    }
    /**
     * Set a new context and update the tool state
     * @private
     * @param {?} context Detailed context
     * @return {?}
     */
    onContextChange(context) {
        if (context === undefined) {
            return;
        }
        this.setContext(context);
    }
}
ContextState.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ContextState.ctorParameters = () => [
    { type: ContextService },
    { type: ToolService },
    { type: ToolState },
    { type: LanguageService }
];
/** @nocollapse */ ContextState.ngInjectableDef = defineInjectable({ factory: function ContextState_Factory() { return new ContextState(inject(ContextService), inject(ToolService), inject(ToolState), inject(LanguageService)); }, token: ContextState, providedIn: "root" });

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
class WorkspaceState {
    constructor() {
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
        (record) => record.state.active === true))
            .subscribe((/**
         * @param {?} record
         * @return {?}
         */
        (record) => {
            /** @type {?} */
            const workspace = record ? record.entity : undefined;
            this.workspace$.next(workspace);
        }));
    }
    /**
     * Store that holds all the available workspaces
     * @return {?}
     */
    get store() { return this._store; }
}
WorkspaceState.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
WorkspaceState.ctorParameters = () => [];
/** @nocollapse */ WorkspaceState.ngInjectableDef = defineInjectable({ factory: function WorkspaceState_Factory() { return new WorkspaceState(); }, token: WorkspaceState, providedIn: "root" });

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
class QueryState {
    constructor() {
        /**
         * Store that holds the query results
         */
        this.store = new EntityStore([]);
    }
}
QueryState.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
QueryState.ctorParameters = () => [];
/** @nocollapse */ QueryState.ngInjectableDef = defineInjectable({ factory: function QueryState_Factory() { return new QueryState(); }, token: QueryState, providedIn: "root" });

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