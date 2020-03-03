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
        this.catalogAllowLegend = this.catalog.showLegend ? this.catalog.showLegend : this.catalogAllowLegend;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1icm93c2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9jYXRhbG9nL2NhdGFsb2ctYnJvd3Nlci9jYXRhbG9nLWJyb3dzZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUdsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsR0FBRyxFQUFtQixNQUFNLE1BQU0sQ0FBQztBQUU1QyxPQUFPLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRS9ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRW5DLE9BQU8sRUFDTCxPQUFPLEVBS1AsZUFBZSxFQUNoQixNQUFNLFdBQVcsQ0FBQzs7OztBQUtuQjtJQXFDRSxpQ0FDVSxZQUEwQixFQUMxQixLQUF3QjtRQUR4QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQXhCekIsdUJBQWtCLEdBQUcsS0FBSyxDQUFDOzs7O1FBb0IzQix5QkFBb0IsR0FBWSxJQUFJLENBQUM7SUFLM0MsQ0FBQztJQTNCSixzQkFBSSxnREFBVztRQUZoQixzQ0FBc0M7Ozs7OztRQUVyQyxjQUE2QyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBNkIxRjs7T0FFRzs7Ozs7SUFDSCwwQ0FBUTs7OztJQUFSOztZQUNRLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQyxLQUFZO1lBQ3BELE9BQU87Z0JBQ0wsRUFBRSxFQUFFLEtBQUss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RSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs7OztnQkFuQlEsWUFBWTtnQkFUbkIsaUJBQWlCOzs7cUNBdUNoQixLQUFLOzBCQUtMLEtBQUs7d0JBS0wsS0FBSztzQkFLTCxLQUFLO3VDQUtMLEtBQUs7O0lBaUxSLDhCQUFDO0NBQUEsQUFwTkQsSUFvTkM7U0EvTVksdUJBQXVCOzs7Ozs7O0lBSWxDLDBDQUFpRDs7SUFNakQscURBQW9DOzs7OztJQUtwQywwQ0FBMEI7Ozs7O0lBSzFCLHdDQUEyRDs7Ozs7SUFLM0Qsc0NBQXFCOzs7OztJQUtyQix1REFBOEM7Ozs7O0lBRzVDLCtDQUFrQzs7Ozs7SUFDbEMsd0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgemlwLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEVudGl0eVN0b3JlLCBFbnRpdHlTdG9yZVdhdGNoZXIgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvbGF5ZXInO1xyXG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcCc7XHJcblxyXG5pbXBvcnQge1xyXG4gIENhdGFsb2csXHJcbiAgQ2F0YWxvZ0l0ZW0sXHJcbiAgQ2F0YWxvZ0l0ZW1MYXllcixcclxuICBDYXRhbG9nSXRlbUdyb3VwLFxyXG4gIENhdGFsb2dJdGVtU3RhdGUsXHJcbiAgQ2F0YWxvZ0l0ZW1UeXBlXHJcbn0gZnJvbSAnLi4vc2hhcmVkJztcclxuXHJcbi8qKlxyXG4gKiBDb21wb25lbnQgdG8gYnJvd3NlIGEgY2F0YWxvZydzIGdyb3VwcyBhbmQgbGF5ZXJzIGFuZCBkaXNwbGF5IHRoZW0gb24gYSBtYXAuXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1jYXRhbG9nLWJyb3dzZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXRhbG9nLWJyb3dzZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYXRhbG9nQnJvd3NlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAvKipcclxuICAgKiBDYXRhbG9nIGl0ZW1zIHN0b3JlIHdhdGNoZXJcclxuICAgKi9cclxuICBwcml2YXRlIHdhdGNoZXI6IEVudGl0eVN0b3JlV2F0Y2hlcjxDYXRhbG9nSXRlbT47XHJcblxyXG4gLy8gcHJpdmF0ZSByZXNvbHV0aW9uJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgZ2V0IHJlc29sdXRpb24kKCk6IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+IHsgcmV0dXJuIHRoaXMubWFwLnZpZXdDb250cm9sbGVyLnJlc29sdXRpb24kOyB9XHJcblxyXG4gIEBJbnB1dCgpIGNhdGFsb2dBbGxvd0xlZ2VuZCA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBDYXRhbG9nXHJcbiAgICovXHJcbiAgQElucHV0KCkgY2F0YWxvZzogQ2F0YWxvZztcclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcmUgaG9sZGluZyB0aGUgY2F0YWxvZydzIGl0ZW1zXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3RvcmU6IEVudGl0eVN0b3JlPENhdGFsb2dJdGVtLCBDYXRhbG9nSXRlbVN0YXRlPjtcclxuXHJcbiAgLyoqXHJcbiAgICogTWFwIHRvIGFkZCB0aGUgY2F0YWxvZyBpdGVtcyB0b1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1hcDogSWdvTWFwO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGEgZ3JvdXAgY2FuIGJlIHRvZ2dsZWQgd2hlbiBpdCdzIGNvbGxhcHNlZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHRvZ2dsZUNvbGxhcHNlZEdyb3VwOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGxheWVyU2VydmljZTogTGF5ZXJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcclxuICApIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgY29uc3QgY3VycmVudEl0ZW1zID0gdGhpcy5tYXAubGF5ZXJzLm1hcCgobGF5ZXI6IExheWVyKSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgaWQ6IGxheWVyLm9wdGlvbnMuc291cmNlLmlkLFxyXG4gICAgICAgIHRpdGxlOiBsYXllci50aXRsZSxcclxuICAgICAgICB0eXBlOiBDYXRhbG9nSXRlbVR5cGUuTGF5ZXJcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zdG9yZS5zdGF0ZS51cGRhdGVNYW55KGN1cnJlbnRJdGVtcywgeyBhZGRlZDogdHJ1ZSB9LCB0cnVlKTtcclxuICAgIGlmICh0aGlzLmNhdGFsb2cgJiYgdGhpcy5jYXRhbG9nLnNvcnREaXJlY3Rpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnN0b3JlLnZpZXcuc29ydCh7XHJcbiAgICAgICAgZGlyZWN0aW9uOiB0aGlzLmNhdGFsb2cuc29ydERpcmVjdGlvbixcclxuICAgICAgICB2YWx1ZUFjY2Vzc29yOiAoaXRlbTogQ2F0YWxvZ0l0ZW0pID0+IGl0ZW0udGl0bGVcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jYXRhbG9nQWxsb3dMZWdlbmQgPSB0aGlzLmNhdGFsb2cuc2hvd0xlZ2VuZCA/IHRoaXMuY2F0YWxvZy5zaG93TGVnZW5kIDogdGhpcy5jYXRhbG9nQWxsb3dMZWdlbmQ7XHJcblxyXG4gICAgdGhpcy53YXRjaGVyID0gbmV3IEVudGl0eVN0b3JlV2F0Y2hlcih0aGlzLnN0b3JlLCB0aGlzLmNkUmVmKTtcclxuXHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMud2F0Y2hlci5kZXN0cm95KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBpc0dyb3VwKGl0ZW06IENhdGFsb2dJdGVtKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gaXRlbS50eXBlID09PSBDYXRhbG9nSXRlbVR5cGUuR3JvdXA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBpc0xheWVyKGl0ZW06IENhdGFsb2dJdGVtKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gaXRlbS50eXBlID09PSBDYXRhbG9nSXRlbVR5cGUuTGF5ZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGEgbGF5ZXIgaXMgYWRkZWQgb3IgcmVtb3ZlZCwgYWRkIG9yIHJlbW92ZSBpdCBmcm9tIHRoZSBtYXBcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKiBAcGFyYW0gZXZlbnQgTGF5ZXIgYWRkZWQgZXZlbnRcclxuICAgKi9cclxuICBvbkxheWVyQWRkZWRDaGFuZ2UoZXZlbnQ6IHsgYWRkZWQ6IGJvb2xlYW47IGxheWVyOiBDYXRhbG9nSXRlbUxheWVyIH0pIHtcclxuICAgIGNvbnN0IGxheWVyID0gZXZlbnQubGF5ZXI7XHJcbiAgICB0aGlzLnN0b3JlLnN0YXRlLnVwZGF0ZShsYXllciwgeyBhZGRlZDogZXZlbnQuYWRkZWQgfSwgZmFsc2UpO1xyXG4gICAgZXZlbnQuYWRkZWQgPyB0aGlzLmFkZExheWVyVG9NYXAobGF5ZXIpIDogdGhpcy5yZW1vdmVMYXllckZyb21NYXAobGF5ZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBhIGZyb3VwIGlzIGFkZGVkIG9yIHJlbW92ZWQsIGFkZCBvciByZW1vdmUgaXQgZnJvbSB0aGUgbWFwXHJcbiAgICogQGludGVybmFsXHJcbiAgICogQHBhcmFtIGV2ZW50IEdyb3VwIGFkZGVkIGV2ZW50XHJcbiAgICovXHJcbiAgb25Hcm91cEFkZGVkQ2hhbmdlKGV2ZW50OiB7IGFkZGVkOiBib29sZWFuOyBncm91cDogQ2F0YWxvZ0l0ZW1Hcm91cCB9KSB7XHJcbiAgICBjb25zdCBncm91cCA9IGV2ZW50Lmdyb3VwO1xyXG4gICAgdGhpcy5zdG9yZS5zdGF0ZS51cGRhdGUoZ3JvdXAsIHsgYWRkZWQ6IGV2ZW50LmFkZGVkIH0sIGZhbHNlKTtcclxuICAgIGV2ZW50LmFkZGVkID8gdGhpcy5hZGRHcm91cFRvTWFwKGdyb3VwKSA6IHRoaXMucmVtb3ZlR3JvdXBGcm9tTWFwKGdyb3VwKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBsYXllciB0byBtYXBcclxuICAgKiBAcGFyYW0gbGF5ZXIgQ2F0YWxvZyBsYXllclxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkTGF5ZXJUb01hcChsYXllcjogQ2F0YWxvZ0l0ZW1MYXllcikge1xyXG4gICAgdGhpcy5hZGRMYXllcnNUb01hcChbbGF5ZXJdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBsYXllciBmcm9tIG1hcFxyXG4gICAqIEBwYXJhbSBsYXllciBDYXRhbG9nIGxheWVyXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZW1vdmVMYXllckZyb21NYXAobGF5ZXI6IENhdGFsb2dJdGVtTGF5ZXIpIHtcclxuICAgIHRoaXMucmVtb3ZlTGF5ZXJzRnJvbU1hcChbbGF5ZXJdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBtdWx0aXBsZSBsYXllcnMgdG8gbWFwXHJcbiAgICogQHBhcmFtIGxheWVycyBDYXRhbG9nIGxheWVyc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkTGF5ZXJzVG9NYXAobGF5ZXJzOiBDYXRhbG9nSXRlbUxheWVyW10pIHtcclxuICAgIGNvbnN0IGxheWVycyQgPSBsYXllcnMubWFwKChsYXllcjogQ2F0YWxvZ0l0ZW1MYXllcikgPT4ge1xyXG4gICAgICByZXR1cm4gdGhpcy5sYXllclNlcnZpY2UuY3JlYXRlQXN5bmNMYXllcihsYXllci5vcHRpb25zKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHppcCguLi5sYXllcnMkKS5zdWJzY3JpYmUoKG9MYXllcnM6IExheWVyW10pID0+IHtcclxuICAgICAgdGhpcy5zdG9yZS5zdGF0ZS51cGRhdGVNYW55KGxheWVycywgeyBhZGRlZDogdHJ1ZSB9KTtcclxuICAgICAgdGhpcy5tYXAuYWRkTGF5ZXJzKG9MYXllcnMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgbXVsdGlwbGUgbGF5ZXJzIGZyb20gbWFwXHJcbiAgICogQHBhcmFtIGxheWVycyBDYXRhbG9nIGxheWVyc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlTGF5ZXJzRnJvbU1hcChsYXllcnM6IENhdGFsb2dJdGVtTGF5ZXJbXSkge1xyXG4gICAgbGF5ZXJzLmZvckVhY2goKGxheWVyOiBDYXRhbG9nSXRlbUxheWVyKSA9PiB7XHJcbiAgICAgIHRoaXMuc3RvcmUuc3RhdGUudXBkYXRlKGxheWVyLCB7IGFkZGVkOiBmYWxzZSB9KTtcclxuICAgICAgaWYgKGxheWVyLm9wdGlvbnMuYmFzZUxheWVyID09PSB0cnVlKSB7XHJcbiAgICAgICAgY29uc3Qgb0xheWVyID0gdGhpcy5tYXAuZ2V0TGF5ZXJCeUlkKGxheWVyLm9wdGlvbnMuaWQpO1xyXG4gICAgICAgIGlmIChvTGF5ZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhpcy5tYXAucmVtb3ZlTGF5ZXIob0xheWVyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3Qgb0xheWVyID0gdGhpcy5tYXAuZ2V0TGF5ZXJCeUlkKGxheWVyLmlkKTtcclxuICAgICAgICBpZiAob0xheWVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHRoaXMubWFwLnJlbW92ZUxheWVyKG9MYXllcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNvcnQgdGhlIGxheWVycyBieSB0aXRsZS4gYXNjIG9yIGRlc2MuXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzb3J0Q2F0YWxvZ0l0ZW1zQnlUaXRsZShpdGVtczogQ2F0YWxvZ0l0ZW1bXSwgZGlyZWN0aW9uKSB7XHJcbiAgICBjb25zdCByZXR1cm5JdGVtID0gaXRlbXMuc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICBjb25zdCB0aXRsZUEgPSBhLnRpdGxlLm5vcm1hbGl6ZSgnTkZEJykucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgJycpO1xyXG4gICAgICBjb25zdCB0aXRsZUIgPSBiLnRpdGxlLm5vcm1hbGl6ZSgnTkZEJykucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgJycpO1xyXG5cclxuICAgICAgaWYgKHRpdGxlQSA8IHRpdGxlQikge1xyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGl0bGVBID4gdGl0bGVCKSB7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9KTtcclxuICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XHJcbiAgICAgIGNhc2UgJ2FzYyc6XHJcbiAgICAgICAgcmV0dXJuIHJldHVybkl0ZW07XHJcbiAgICAgIGNhc2UgJ2Rlc2MnOlxyXG4gICAgICAgIHJldHVybiByZXR1cm5JdGVtLnJldmVyc2UoKTtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gaXRlbXM7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYWxsIHRoZSBsYXllcnMgb2YgYSBncm91cCB0byBtYXBcclxuICAgKiBAcGFyYW0gZ3JvdXAgQ2F0YWxvZyBncm91cFxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkR3JvdXBUb01hcChncm91cDogQ2F0YWxvZ0l0ZW1Hcm91cCkge1xyXG4gICAgbGV0IGxheWVycyA9IGdyb3VwLml0ZW1zLmZpbHRlcigoaXRlbTogQ2F0YWxvZ0l0ZW0pID0+IHtcclxuICAgICAgY29uc3QgYWRkZWQgPSB0aGlzLnN0b3JlLnN0YXRlLmdldChpdGVtKS5hZGRlZCB8fCBmYWxzZTtcclxuICAgICAgcmV0dXJuIHRoaXMuaXNMYXllcihpdGVtKSAmJiBhZGRlZCA9PT0gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgIGlmICh0aGlzLmNhdGFsb2cgJiYgdGhpcy5jYXRhbG9nLnNvcnREaXJlY3Rpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBsYXllcnMgPSB0aGlzLnNvcnRDYXRhbG9nSXRlbXNCeVRpdGxlKGxheWVycywgdGhpcy5jYXRhbG9nLnNvcnREaXJlY3Rpb24pO1xyXG4gIH1cclxuICAgIHRoaXMuYWRkTGF5ZXJzVG9NYXAobGF5ZXJzLnJldmVyc2UoKSBhcyBDYXRhbG9nSXRlbUxheWVyW10pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIGFsbCB0aGUgbGF5ZXJzIG9mIGEgZ3JvdXAgZnJvbSBtYXBcclxuICAgKiBAcGFyYW0gZ3JvdXAgQ2F0YWxvZyBncm91cFxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlR3JvdXBGcm9tTWFwKGdyb3VwOiBDYXRhbG9nSXRlbUdyb3VwKSB7XHJcbiAgICBjb25zdCBsYXllcnMgPSBncm91cC5pdGVtcy5maWx0ZXIoKGl0ZW06IENhdGFsb2dJdGVtKSA9PiB7XHJcbiAgICAgIGNvbnN0IGFkZGVkID0gdGhpcy5zdG9yZS5zdGF0ZS5nZXQoaXRlbSkuYWRkZWQgfHwgZmFsc2U7XHJcbiAgICAgIHJldHVybiB0aGlzLmlzTGF5ZXIoaXRlbSkgJiYgYWRkZWQgPT09IHRydWU7XHJcbiAgICB9KTtcclxuICAgIHRoaXMucmVtb3ZlTGF5ZXJzRnJvbU1hcChsYXllcnMgYXMgQ2F0YWxvZ0l0ZW1MYXllcltdKTtcclxuICB9XHJcbn1cclxuIl19