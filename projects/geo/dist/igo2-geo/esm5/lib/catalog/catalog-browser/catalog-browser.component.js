/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { zip } from 'rxjs';
import { EntityStore, EntityStoreWatcher } from '@igo2/common';
import { LayerService } from '../../layer/shared/layer.service';
import { IgoMap } from '../../map';
import { Catalog, CatalogItemType } from '../shared';
/**
 * Component to browse a catalog's groups and layers and display them on a map.
 */
var CatalogBrowserComponent = /** @class */ (function () {
    function CatalogBrowserComponent(layerService, cdRef) {
        this.layerService = layerService;
        this.cdRef = cdRef;
        this.catalogAllowLegend = false;
        /**
         * Whether a group can be toggled when it's collapsed
         */
        this.toggleCollapsedGroup = true;
    }
    Object.defineProperty(CatalogBrowserComponent.prototype, "resolution$", {
        // private resolution$$: Subscription;
        get: 
        // private resolution$$: Subscription;
        /**
         * @return {?}
         */
        function () { return this.map.viewController.resolution$; },
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
    CatalogBrowserComponent.prototype.ngOnInit = /**
     * \@internal
     * @return {?}
     */
    function () {
        /** @type {?} */
        var currentItems = this.map.layers.map((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) {
            return {
                id: layer.options.source.id,
                title: layer.title,
                type: CatalogItemType.Layer
            };
        }));
        this.store.state.updateMany(currentItems, { added: true }, true);
        if (this.catalog && this.catalog.sortDirection !== undefined) {
            this.store.view.sort({
                direction: this.catalog.sortDirection,
                valueAccessor: (/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item.title; })
            });
        }
        /** @type {?} */
        var catalogShowLegend = this.catalog ? this.catalog.showLegend : false;
        this.catalogAllowLegend = catalogShowLegend ? catalogShowLegend : this.catalogAllowLegend;
        this.watcher = new EntityStoreWatcher(this.store, this.cdRef);
    };
    /**
     * @return {?}
     */
    CatalogBrowserComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.watcher.destroy();
    };
    /**
     * @internal
     */
    /**
     * \@internal
     * @param {?} item
     * @return {?}
     */
    CatalogBrowserComponent.prototype.isGroup = /**
     * \@internal
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return item.type === CatalogItemType.Group;
    };
    /**
     * @internal
     */
    /**
     * \@internal
     * @param {?} item
     * @return {?}
     */
    CatalogBrowserComponent.prototype.isLayer = /**
     * \@internal
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return item.type === CatalogItemType.Layer;
    };
    /**
     * When a layer is added or removed, add or remove it from the map
     * @internal
     * @param event Layer added event
     */
    /**
     * When a layer is added or removed, add or remove it from the map
     * \@internal
     * @param {?} event Layer added event
     * @return {?}
     */
    CatalogBrowserComponent.prototype.onLayerAddedChange = /**
     * When a layer is added or removed, add or remove it from the map
     * \@internal
     * @param {?} event Layer added event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var layer = event.layer;
        this.store.state.update(layer, { added: event.added }, false);
        event.added ? this.addLayerToMap(layer) : this.removeLayerFromMap(layer);
    };
    /**
     * When a froup is added or removed, add or remove it from the map
     * @internal
     * @param event Group added event
     */
    /**
     * When a froup is added or removed, add or remove it from the map
     * \@internal
     * @param {?} event Group added event
     * @return {?}
     */
    CatalogBrowserComponent.prototype.onGroupAddedChange = /**
     * When a froup is added or removed, add or remove it from the map
     * \@internal
     * @param {?} event Group added event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var group = event.group;
        this.store.state.update(group, { added: event.added }, false);
        event.added ? this.addGroupToMap(group) : this.removeGroupFromMap(group);
    };
    /**
     * Add layer to map
     * @param layer Catalog layer
     */
    /**
     * Add layer to map
     * @private
     * @param {?} layer Catalog layer
     * @return {?}
     */
    CatalogBrowserComponent.prototype.addLayerToMap = /**
     * Add layer to map
     * @private
     * @param {?} layer Catalog layer
     * @return {?}
     */
    function (layer) {
        this.addLayersToMap([layer]);
    };
    /**
     * Remove layer from map
     * @param layer Catalog layer
     */
    /**
     * Remove layer from map
     * @private
     * @param {?} layer Catalog layer
     * @return {?}
     */
    CatalogBrowserComponent.prototype.removeLayerFromMap = /**
     * Remove layer from map
     * @private
     * @param {?} layer Catalog layer
     * @return {?}
     */
    function (layer) {
        this.removeLayersFromMap([layer]);
    };
    /**
     * Add multiple layers to map
     * @param layers Catalog layers
     */
    /**
     * Add multiple layers to map
     * @private
     * @param {?} layers Catalog layers
     * @return {?}
     */
    CatalogBrowserComponent.prototype.addLayersToMap = /**
     * Add multiple layers to map
     * @private
     * @param {?} layers Catalog layers
     * @return {?}
     */
    function (layers) {
        var _this = this;
        /** @type {?} */
        var layers$ = layers.map((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) {
            if (layer.options.sourceOptions.optionsFromApi === undefined) {
                layer.options.sourceOptions.optionsFromApi = true;
            }
            return _this.layerService.createAsyncLayer(layer.options);
        }));
        zip.apply(void 0, tslib_1.__spread(layers$)).subscribe((/**
         * @param {?} oLayers
         * @return {?}
         */
        function (oLayers) {
            _this.store.state.updateMany(layers, { added: true });
            _this.map.addLayers(oLayers);
        }));
    };
    /**
     * Remove multiple layers from map
     * @param layers Catalog layers
     */
    /**
     * Remove multiple layers from map
     * @private
     * @param {?} layers Catalog layers
     * @return {?}
     */
    CatalogBrowserComponent.prototype.removeLayersFromMap = /**
     * Remove multiple layers from map
     * @private
     * @param {?} layers Catalog layers
     * @return {?}
     */
    function (layers) {
        var _this = this;
        layers.forEach((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) {
            _this.store.state.update(layer, { added: false });
            if (layer.options.baseLayer === true) {
                /** @type {?} */
                var oLayer = _this.map.getLayerById(layer.options.id);
                if (oLayer !== undefined) {
                    _this.map.removeLayer(oLayer);
                }
            }
            else {
                /** @type {?} */
                var oLayer = _this.map.getLayerById(layer.id);
                if (oLayer !== undefined) {
                    _this.map.removeLayer(oLayer);
                }
            }
        }));
    };
    /**
     * Sort the layers by title. asc or desc.
     * @internal
     */
    /**
     * Sort the layers by title. asc or desc.
     * \@internal
     * @private
     * @param {?} items
     * @param {?} direction
     * @return {?}
     */
    CatalogBrowserComponent.prototype.sortCatalogItemsByTitle = /**
     * Sort the layers by title. asc or desc.
     * \@internal
     * @private
     * @param {?} items
     * @param {?} direction
     * @return {?}
     */
    function (items, direction) {
        /** @type {?} */
        var returnItem = items.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) {
            /** @type {?} */
            var titleA = a.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            /** @type {?} */
            var titleB = b.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            if (titleA < titleB) {
                return -1;
            }
            if (titleA > titleB) {
                return 1;
            }
            return 0;
        }));
        switch (direction) {
            case 'asc':
                return returnItem;
            case 'desc':
                return returnItem.reverse();
            default:
                return items;
        }
    };
    /**
     * Add all the layers of a group to map
     * @param group Catalog group
     */
    /**
     * Add all the layers of a group to map
     * @private
     * @param {?} group Catalog group
     * @return {?}
     */
    CatalogBrowserComponent.prototype.addGroupToMap = /**
     * Add all the layers of a group to map
     * @private
     * @param {?} group Catalog group
     * @return {?}
     */
    function (group) {
        var _this = this;
        /** @type {?} */
        var layers = group.items.filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            /** @type {?} */
            var added = _this.store.state.get(item).added || false;
            return _this.isLayer(item) && added === false;
        }));
        if (this.catalog && this.catalog.sortDirection !== undefined) {
            layers = this.sortCatalogItemsByTitle(layers, this.catalog.sortDirection);
        }
        this.addLayersToMap((/** @type {?} */ (layers.reverse())));
    };
    /**
     * Remove all the layers of a group from map
     * @param group Catalog group
     */
    /**
     * Remove all the layers of a group from map
     * @private
     * @param {?} group Catalog group
     * @return {?}
     */
    CatalogBrowserComponent.prototype.removeGroupFromMap = /**
     * Remove all the layers of a group from map
     * @private
     * @param {?} group Catalog group
     * @return {?}
     */
    function (group) {
        var _this = this;
        /** @type {?} */
        var layers = group.items.filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            /** @type {?} */
            var added = _this.store.state.get(item).added || false;
            return _this.isLayer(item) && added === true;
        }));
        this.removeLayersFromMap((/** @type {?} */ (layers)));
    };
    CatalogBrowserComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-catalog-browser',
                    template: "<igo-list [navigation]=\"false\" [selection]=\"false\">\r\n  <ng-template ngFor let-item [ngForOf]=\"store.view.all$() | async\">\r\n    <ng-container *ngIf=\"isGroup(item)\">\r\n      <igo-catalog-browser-group\r\n        [catalog]=\"catalog\"\r\n        [group]=\"item\"\r\n        [state]=\"store.state\"\r\n        [resolution]=\"resolution$ | async\"\r\n        [catalogAllowLegend]=\"catalogAllowLegend\"\r\n        [toggleCollapsed]=\"toggleCollapsedGroup\"\r\n        (addedChange)=\"onGroupAddedChange($event)\"\r\n        (layerAddedChange)=\"onLayerAddedChange($event)\">\r\n      </igo-catalog-browser-group>\r\n    </ng-container>\r\n\r\n    <ng-container *ngIf=\"isLayer(item)\">\r\n      <igo-catalog-browser-layer\r\n        igoListItem\r\n        [layer]=\"item\"\r\n        [resolution]=\"resolution$ | async\"\r\n        [catalogAllowLegend]=\"catalogAllowLegend\"\r\n        [added]=\"store.state.get(item).added\"\r\n        (addedChange)=\"onLayerAddedChange($event)\">\r\n      </igo-catalog-browser-layer>\r\n    </ng-container>\r\n  </ng-template>\r\n</igo-list>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    CatalogBrowserComponent.ctorParameters = function () { return [
        { type: LayerService },
        { type: ChangeDetectorRef }
    ]; };
    CatalogBrowserComponent.propDecorators = {
        catalogAllowLegend: [{ type: Input }],
        catalog: [{ type: Input }],
        store: [{ type: Input }],
        map: [{ type: Input }],
        toggleCollapsedGroup: [{ type: Input }]
    };
    return CatalogBrowserComponent;
}());
export { CatalogBrowserComponent };
if (false) {
    /**
     * Catalog items store watcher
     * @type {?}
     * @private
     */
    CatalogBrowserComponent.prototype.watcher;
    /** @type {?} */
    CatalogBrowserComponent.prototype.catalogAllowLegend;
    /**
     * Catalog
     * @type {?}
     */
    CatalogBrowserComponent.prototype.catalog;
    /**
     * Store holding the catalog's items
     * @type {?}
     */
    CatalogBrowserComponent.prototype.store;
    /**
     * Map to add the catalog items to
     * @type {?}
     */
    CatalogBrowserComponent.prototype.map;
    /**
     * Whether a group can be toggled when it's collapsed
     * @type {?}
     */
    CatalogBrowserComponent.prototype.toggleCollapsedGroup;
    /**
     * @type {?}
     * @private
     */
    CatalogBrowserComponent.prototype.layerService;
    /**
     * @type {?}
     * @private
     */
    CatalogBrowserComponent.prototype.cdRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1icm93c2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9jYXRhbG9nL2NhdGFsb2ctYnJvd3Nlci9jYXRhbG9nLWJyb3dzZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUdsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsR0FBRyxFQUFtQixNQUFNLE1BQU0sQ0FBQztBQUU1QyxPQUFPLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRS9ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRW5DLE9BQU8sRUFDTCxPQUFPLEVBS1AsZUFBZSxFQUNoQixNQUFNLFdBQVcsQ0FBQzs7OztBQUtuQjtJQXFDRSxpQ0FDVSxZQUEwQixFQUMxQixLQUF3QjtRQUR4QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQXhCekIsdUJBQWtCLEdBQUcsS0FBSyxDQUFDOzs7O1FBb0IzQix5QkFBb0IsR0FBWSxJQUFJLENBQUM7SUFLM0MsQ0FBQztJQTNCSixzQkFBSSxnREFBVztRQUZoQixzQ0FBc0M7Ozs7OztRQUVyQyxjQUE2QyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBNkIxRjs7T0FFRzs7Ozs7SUFDSCwwQ0FBUTs7OztJQUFSOztZQUNRLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQyxLQUFZO1lBQ3BELE9BQU87Z0JBQ0wsRUFBRSxFQUFFLEtBQUss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QUFDLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQztRQUM5QyxDQUFDLEVBQUM7UUFDRixJQUFJLENBQUMsbUJBQW1CLENBQUMsbUJBQUEsTUFBTSxFQUFzQixDQUFDLENBQUM7SUFDekQsQ0FBQzs7Z0JBdk5GLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQiwra0NBQStDO29CQUMvQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7Ozs7Z0JBbkJRLFlBQVk7Z0JBVG5CLGlCQUFpQjs7O3FDQXVDaEIsS0FBSzswQkFLTCxLQUFLO3dCQUtMLEtBQUs7c0JBS0wsS0FBSzt1Q0FLTCxLQUFLOztJQXFMUiw4QkFBQztDQUFBLEFBeE5ELElBd05DO1NBbk5ZLHVCQUF1Qjs7Ozs7OztJQUlsQywwQ0FBaUQ7O0lBTWpELHFEQUFvQzs7Ozs7SUFLcEMsMENBQTBCOzs7OztJQUsxQix3Q0FBMkQ7Ozs7O0lBSzNELHNDQUFxQjs7Ozs7SUFLckIsdURBQThDOzs7OztJQUc1QywrQ0FBa0M7Ozs7O0lBQ2xDLHdDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IHppcCwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBFbnRpdHlTdG9yZSwgRW50aXR5U3RvcmVXYXRjaGVyIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2xheWVyJztcclxuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5cclxuaW1wb3J0IHtcclxuICBDYXRhbG9nLFxyXG4gIENhdGFsb2dJdGVtLFxyXG4gIENhdGFsb2dJdGVtTGF5ZXIsXHJcbiAgQ2F0YWxvZ0l0ZW1Hcm91cCxcclxuICBDYXRhbG9nSXRlbVN0YXRlLFxyXG4gIENhdGFsb2dJdGVtVHlwZVxyXG59IGZyb20gJy4uL3NoYXJlZCc7XHJcblxyXG4vKipcclxuICogQ29tcG9uZW50IHRvIGJyb3dzZSBhIGNhdGFsb2cncyBncm91cHMgYW5kIGxheWVycyBhbmQgZGlzcGxheSB0aGVtIG9uIGEgbWFwLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tY2F0YWxvZy1icm93c2VyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY2F0YWxvZy1icm93c2VyLmNvbXBvbmVudC5odG1sJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2F0YWxvZ0Jyb3dzZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgLyoqXHJcbiAgICogQ2F0YWxvZyBpdGVtcyBzdG9yZSB3YXRjaGVyXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB3YXRjaGVyOiBFbnRpdHlTdG9yZVdhdGNoZXI8Q2F0YWxvZ0l0ZW0+O1xyXG5cclxuIC8vIHByaXZhdGUgcmVzb2x1dGlvbiQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGdldCByZXNvbHV0aW9uJCgpOiBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPiB7IHJldHVybiB0aGlzLm1hcC52aWV3Q29udHJvbGxlci5yZXNvbHV0aW9uJDsgfVxyXG5cclxuICBASW5wdXQoKSBjYXRhbG9nQWxsb3dMZWdlbmQgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2F0YWxvZ1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNhdGFsb2c6IENhdGFsb2c7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3JlIGhvbGRpbmcgdGhlIGNhdGFsb2cncyBpdGVtc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0b3JlOiBFbnRpdHlTdG9yZTxDYXRhbG9nSXRlbSwgQ2F0YWxvZ0l0ZW1TdGF0ZT47XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hcCB0byBhZGQgdGhlIGNhdGFsb2cgaXRlbXMgdG9cclxuICAgKi9cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBhIGdyb3VwIGNhbiBiZSB0b2dnbGVkIHdoZW4gaXQncyBjb2xsYXBzZWRcclxuICAgKi9cclxuICBASW5wdXQoKSB0b2dnbGVDb2xsYXBzZWRHcm91cDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBsYXllclNlcnZpY2U6IExheWVyU2VydmljZSxcclxuICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGNvbnN0IGN1cnJlbnRJdGVtcyA9IHRoaXMubWFwLmxheWVycy5tYXAoKGxheWVyOiBMYXllcikgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGlkOiBsYXllci5vcHRpb25zLnNvdXJjZS5pZCxcclxuICAgICAgICB0aXRsZTogbGF5ZXIudGl0bGUsXHJcbiAgICAgICAgdHlwZTogQ2F0YWxvZ0l0ZW1UeXBlLkxheWVyXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc3RvcmUuc3RhdGUudXBkYXRlTWFueShjdXJyZW50SXRlbXMsIHsgYWRkZWQ6IHRydWUgfSwgdHJ1ZSk7XHJcbiAgICBpZiAodGhpcy5jYXRhbG9nICYmIHRoaXMuY2F0YWxvZy5zb3J0RGlyZWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5zdG9yZS52aWV3LnNvcnQoe1xyXG4gICAgICAgIGRpcmVjdGlvbjogdGhpcy5jYXRhbG9nLnNvcnREaXJlY3Rpb24sXHJcbiAgICAgICAgdmFsdWVBY2Nlc3NvcjogKGl0ZW06IENhdGFsb2dJdGVtKSA9PiBpdGVtLnRpdGxlXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNhdGFsb2dTaG93TGVnZW5kID0gdGhpcy5jYXRhbG9nID8gdGhpcy5jYXRhbG9nLnNob3dMZWdlbmQgOiBmYWxzZTtcclxuICAgIHRoaXMuY2F0YWxvZ0FsbG93TGVnZW5kID0gY2F0YWxvZ1Nob3dMZWdlbmQgPyBjYXRhbG9nU2hvd0xlZ2VuZCA6IHRoaXMuY2F0YWxvZ0FsbG93TGVnZW5kO1xyXG5cclxuICAgIHRoaXMud2F0Y2hlciA9IG5ldyBFbnRpdHlTdG9yZVdhdGNoZXIodGhpcy5zdG9yZSwgdGhpcy5jZFJlZik7XHJcblxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLndhdGNoZXIuZGVzdHJveSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgaXNHcm91cChpdGVtOiBDYXRhbG9nSXRlbSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGl0ZW0udHlwZSA9PT0gQ2F0YWxvZ0l0ZW1UeXBlLkdyb3VwO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgaXNMYXllcihpdGVtOiBDYXRhbG9nSXRlbSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGl0ZW0udHlwZSA9PT0gQ2F0YWxvZ0l0ZW1UeXBlLkxheWVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBhIGxheWVyIGlzIGFkZGVkIG9yIHJlbW92ZWQsIGFkZCBvciByZW1vdmUgaXQgZnJvbSB0aGUgbWFwXHJcbiAgICogQGludGVybmFsXHJcbiAgICogQHBhcmFtIGV2ZW50IExheWVyIGFkZGVkIGV2ZW50XHJcbiAgICovXHJcbiAgb25MYXllckFkZGVkQ2hhbmdlKGV2ZW50OiB7IGFkZGVkOiBib29sZWFuOyBsYXllcjogQ2F0YWxvZ0l0ZW1MYXllciB9KSB7XHJcbiAgICBjb25zdCBsYXllciA9IGV2ZW50LmxheWVyO1xyXG4gICAgdGhpcy5zdG9yZS5zdGF0ZS51cGRhdGUobGF5ZXIsIHsgYWRkZWQ6IGV2ZW50LmFkZGVkIH0sIGZhbHNlKTtcclxuICAgIGV2ZW50LmFkZGVkID8gdGhpcy5hZGRMYXllclRvTWFwKGxheWVyKSA6IHRoaXMucmVtb3ZlTGF5ZXJGcm9tTWFwKGxheWVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gYSBmcm91cCBpcyBhZGRlZCBvciByZW1vdmVkLCBhZGQgb3IgcmVtb3ZlIGl0IGZyb20gdGhlIG1hcFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqIEBwYXJhbSBldmVudCBHcm91cCBhZGRlZCBldmVudFxyXG4gICAqL1xyXG4gIG9uR3JvdXBBZGRlZENoYW5nZShldmVudDogeyBhZGRlZDogYm9vbGVhbjsgZ3JvdXA6IENhdGFsb2dJdGVtR3JvdXAgfSkge1xyXG4gICAgY29uc3QgZ3JvdXAgPSBldmVudC5ncm91cDtcclxuICAgIHRoaXMuc3RvcmUuc3RhdGUudXBkYXRlKGdyb3VwLCB7IGFkZGVkOiBldmVudC5hZGRlZCB9LCBmYWxzZSk7XHJcbiAgICBldmVudC5hZGRlZCA/IHRoaXMuYWRkR3JvdXBUb01hcChncm91cCkgOiB0aGlzLnJlbW92ZUdyb3VwRnJvbU1hcChncm91cCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgbGF5ZXIgdG8gbWFwXHJcbiAgICogQHBhcmFtIGxheWVyIENhdGFsb2cgbGF5ZXJcclxuICAgKi9cclxuICBwcml2YXRlIGFkZExheWVyVG9NYXAobGF5ZXI6IENhdGFsb2dJdGVtTGF5ZXIpIHtcclxuICAgIHRoaXMuYWRkTGF5ZXJzVG9NYXAoW2xheWVyXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgbGF5ZXIgZnJvbSBtYXBcclxuICAgKiBAcGFyYW0gbGF5ZXIgQ2F0YWxvZyBsYXllclxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlTGF5ZXJGcm9tTWFwKGxheWVyOiBDYXRhbG9nSXRlbUxheWVyKSB7XHJcbiAgICB0aGlzLnJlbW92ZUxheWVyc0Zyb21NYXAoW2xheWVyXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgbXVsdGlwbGUgbGF5ZXJzIHRvIG1hcFxyXG4gICAqIEBwYXJhbSBsYXllcnMgQ2F0YWxvZyBsYXllcnNcclxuICAgKi9cclxuICBwcml2YXRlIGFkZExheWVyc1RvTWFwKGxheWVyczogQ2F0YWxvZ0l0ZW1MYXllcltdKSB7XHJcbiAgICBjb25zdCBsYXllcnMkID0gbGF5ZXJzLm1hcCgobGF5ZXI6IENhdGFsb2dJdGVtTGF5ZXIpID0+IHtcclxuICAgICAgaWYgKGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucy5vcHRpb25zRnJvbUFwaSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zLm9wdGlvbnNGcm9tQXBpID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcy5sYXllclNlcnZpY2UuY3JlYXRlQXN5bmNMYXllcihsYXllci5vcHRpb25zKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHppcCguLi5sYXllcnMkKS5zdWJzY3JpYmUoKG9MYXllcnM6IExheWVyW10pID0+IHtcclxuICAgICAgdGhpcy5zdG9yZS5zdGF0ZS51cGRhdGVNYW55KGxheWVycywgeyBhZGRlZDogdHJ1ZSB9KTtcclxuICAgICAgdGhpcy5tYXAuYWRkTGF5ZXJzKG9MYXllcnMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgbXVsdGlwbGUgbGF5ZXJzIGZyb20gbWFwXHJcbiAgICogQHBhcmFtIGxheWVycyBDYXRhbG9nIGxheWVyc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlTGF5ZXJzRnJvbU1hcChsYXllcnM6IENhdGFsb2dJdGVtTGF5ZXJbXSkge1xyXG4gICAgbGF5ZXJzLmZvckVhY2goKGxheWVyOiBDYXRhbG9nSXRlbUxheWVyKSA9PiB7XHJcbiAgICAgIHRoaXMuc3RvcmUuc3RhdGUudXBkYXRlKGxheWVyLCB7IGFkZGVkOiBmYWxzZSB9KTtcclxuICAgICAgaWYgKGxheWVyLm9wdGlvbnMuYmFzZUxheWVyID09PSB0cnVlKSB7XHJcbiAgICAgICAgY29uc3Qgb0xheWVyID0gdGhpcy5tYXAuZ2V0TGF5ZXJCeUlkKGxheWVyLm9wdGlvbnMuaWQpO1xyXG4gICAgICAgIGlmIChvTGF5ZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhpcy5tYXAucmVtb3ZlTGF5ZXIob0xheWVyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3Qgb0xheWVyID0gdGhpcy5tYXAuZ2V0TGF5ZXJCeUlkKGxheWVyLmlkKTtcclxuICAgICAgICBpZiAob0xheWVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHRoaXMubWFwLnJlbW92ZUxheWVyKG9MYXllcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNvcnQgdGhlIGxheWVycyBieSB0aXRsZS4gYXNjIG9yIGRlc2MuXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzb3J0Q2F0YWxvZ0l0ZW1zQnlUaXRsZShpdGVtczogQ2F0YWxvZ0l0ZW1bXSwgZGlyZWN0aW9uKSB7XHJcbiAgICBjb25zdCByZXR1cm5JdGVtID0gaXRlbXMuc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICBjb25zdCB0aXRsZUEgPSBhLnRpdGxlLm5vcm1hbGl6ZSgnTkZEJykucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgJycpO1xyXG4gICAgICBjb25zdCB0aXRsZUIgPSBiLnRpdGxlLm5vcm1hbGl6ZSgnTkZEJykucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgJycpO1xyXG5cclxuICAgICAgaWYgKHRpdGxlQSA8IHRpdGxlQikge1xyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGl0bGVBID4gdGl0bGVCKSB7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9KTtcclxuICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XHJcbiAgICAgIGNhc2UgJ2FzYyc6XHJcbiAgICAgICAgcmV0dXJuIHJldHVybkl0ZW07XHJcbiAgICAgIGNhc2UgJ2Rlc2MnOlxyXG4gICAgICAgIHJldHVybiByZXR1cm5JdGVtLnJldmVyc2UoKTtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gaXRlbXM7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYWxsIHRoZSBsYXllcnMgb2YgYSBncm91cCB0byBtYXBcclxuICAgKiBAcGFyYW0gZ3JvdXAgQ2F0YWxvZyBncm91cFxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkR3JvdXBUb01hcChncm91cDogQ2F0YWxvZ0l0ZW1Hcm91cCkge1xyXG4gICAgbGV0IGxheWVycyA9IGdyb3VwLml0ZW1zLmZpbHRlcigoaXRlbTogQ2F0YWxvZ0l0ZW0pID0+IHtcclxuICAgICAgY29uc3QgYWRkZWQgPSB0aGlzLnN0b3JlLnN0YXRlLmdldChpdGVtKS5hZGRlZCB8fCBmYWxzZTtcclxuICAgICAgcmV0dXJuIHRoaXMuaXNMYXllcihpdGVtKSAmJiBhZGRlZCA9PT0gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgIGlmICh0aGlzLmNhdGFsb2cgJiYgdGhpcy5jYXRhbG9nLnNvcnREaXJlY3Rpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBsYXllcnMgPSB0aGlzLnNvcnRDYXRhbG9nSXRlbXNCeVRpdGxlKGxheWVycywgdGhpcy5jYXRhbG9nLnNvcnREaXJlY3Rpb24pO1xyXG4gIH1cclxuICAgIHRoaXMuYWRkTGF5ZXJzVG9NYXAobGF5ZXJzLnJldmVyc2UoKSBhcyBDYXRhbG9nSXRlbUxheWVyW10pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIGFsbCB0aGUgbGF5ZXJzIG9mIGEgZ3JvdXAgZnJvbSBtYXBcclxuICAgKiBAcGFyYW0gZ3JvdXAgQ2F0YWxvZyBncm91cFxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlR3JvdXBGcm9tTWFwKGdyb3VwOiBDYXRhbG9nSXRlbUdyb3VwKSB7XHJcbiAgICBjb25zdCBsYXllcnMgPSBncm91cC5pdGVtcy5maWx0ZXIoKGl0ZW06IENhdGFsb2dJdGVtKSA9PiB7XHJcbiAgICAgIGNvbnN0IGFkZGVkID0gdGhpcy5zdG9yZS5zdGF0ZS5nZXQoaXRlbSkuYWRkZWQgfHwgZmFsc2U7XHJcbiAgICAgIHJldHVybiB0aGlzLmlzTGF5ZXIoaXRlbSkgJiYgYWRkZWQgPT09IHRydWU7XHJcbiAgICB9KTtcclxuICAgIHRoaXMucmVtb3ZlTGF5ZXJzRnJvbU1hcChsYXllcnMgYXMgQ2F0YWxvZ0l0ZW1MYXllcltdKTtcclxuICB9XHJcbn1cclxuIl19