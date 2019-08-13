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
import { CatalogItemType } from '../shared';
/**
 * Component to browse a catalog's groups and layers and display them on a map.
 */
var CatalogBrowserComponent = /** @class */ (function () {
    function CatalogBrowserComponent(layerService, cdRef) {
        this.layerService = layerService;
        this.cdRef = cdRef;
        /**
         * Whether a group can be toggled when it's collapsed
         */
        this.toggleCollapsedGroup = true;
    }
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
                id: layer.id,
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
            /** @type {?} */
            var oLayer = _this.map.getLayerById(layer.id);
            if (oLayer !== undefined) {
                _this.map.removeLayer(oLayer);
            }
        }));
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
        this.addLayersToMap((/** @type {?} */ (layers)));
    };
    /**
     * Remove all the layers of a groufrom map
     * @param group Catalog group
     */
    /**
     * Remove all the layers of a groufrom map
     * @private
     * @param {?} group Catalog group
     * @return {?}
     */
    CatalogBrowserComponent.prototype.removeGroupFromMap = /**
     * Remove all the layers of a groufrom map
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
                    template: "<igo-list [navigation]=\"false\" [selection]=\"false\">\r\n  <ng-template ngFor let-item [ngForOf]=\"store.view.all$() | async\">\r\n    <ng-container *ngIf=\"isGroup(item)\">\r\n      <igo-catalog-browser-group\r\n        [catalog]=\"catalog\"\r\n        [group]=\"item\"\r\n        [state]=\"store.state\"\r\n        [toggleCollapsed]=\"toggleCollapsedGroup\"\r\n        (addedChange)=\"onGroupAddedChange($event)\"\r\n        (layerAddedChange)=\"onLayerAddedChange($event)\">\r\n      </igo-catalog-browser-group>\r\n    </ng-container>\r\n\r\n    <ng-container *ngIf=\"isLayer(item)\">\r\n      <igo-catalog-browser-layer\r\n        igoListItem\r\n        [layer]=\"item\"\r\n        [added]=\"store.state.get(item).added\"\r\n        [disabled]=\"store.state.get(item).added\"\r\n        (addedChange)=\"onLayerAddedChange($event)\">\r\n      </igo-catalog-browser-layer>\r\n    </ng-container>\r\n  </ng-template>\r\n</igo-list>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    CatalogBrowserComponent.ctorParameters = function () { return [
        { type: LayerService },
        { type: ChangeDetectorRef }
    ]; };
    CatalogBrowserComponent.propDecorators = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1icm93c2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9jYXRhbG9nL2NhdGFsb2ctYnJvd3Nlci9jYXRhbG9nLWJyb3dzZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUdsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTNCLE9BQU8sRUFBRSxXQUFXLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFL0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFbkMsT0FBTyxFQU1MLGVBQWUsRUFDaEIsTUFBTSxXQUFXLENBQUM7Ozs7QUFLbkI7SUErQkUsaUNBQ1UsWUFBMEIsRUFDMUIsS0FBd0I7UUFEeEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7Ozs7UUFKekIseUJBQW9CLEdBQVksSUFBSSxDQUFDO0lBSzNDLENBQUM7SUFFSjs7T0FFRzs7Ozs7SUFDSCwwQ0FBUTs7OztJQUFSOztZQUNRLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQyxLQUFZO1lBQ3BELE9BQU87Z0JBQ0wsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUNaLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztnQkFDbEIsSUFBSSxFQUFFLGVBQWUsQ0FBQyxLQUFLO2FBQzVCLENBQUM7UUFDSixDQUFDLEVBQUM7UUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFF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TSxFQUFzQixDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7OztJQUNLLG9EQUFrQjs7Ozs7O0lBQTFCLFVBQTJCLEtBQXVCO1FBQWxELGlCQU1DOztZQUxPLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU07Ozs7UUFBQyxVQUFDLElBQWlCOztnQkFDNUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSztZQUN2RCxPQUFPLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQztRQUM5QyxDQUFDLEVBQUM7UUFDRixJQUFJLENBQUMsbUJBQW1CLENBQUMsbUJBQUEsTUFBTSxFQUFzQixDQUFDLENBQUM7SUFDekQsQ0FBQzs7Z0JBcEtGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQix1N0JBQStDO29CQUMvQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7Ozs7Z0JBbkJRLFlBQVk7Z0JBVG5CLGlCQUFpQjs7OzBCQXNDaEIsS0FBSzt3QkFLTCxLQUFLO3NCQUtMLEtBQUs7dUNBS0wsS0FBSzs7SUF3SVIsOEJBQUM7Q0FBQSxBQXJLRCxJQXFLQztTQWhLWSx1QkFBdUI7Ozs7Ozs7SUFJbEMsMENBQWlEOzs7OztJQUtqRCwwQ0FBMEI7Ozs7O0lBSzFCLHdDQUEyRDs7Ozs7SUFLM0Qsc0NBQXFCOzs7OztJQUtyQix1REFBOEM7Ozs7O0lBRzVDLCtDQUFrQzs7Ozs7SUFDbEMsd0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgemlwIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBFbnRpdHlTdG9yZSwgRW50aXR5U3RvcmVXYXRjaGVyIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2xheWVyJztcclxuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5cclxuaW1wb3J0IHtcclxuICBDYXRhbG9nLFxyXG4gIENhdGFsb2dJdGVtLFxyXG4gIENhdGFsb2dJdGVtTGF5ZXIsXHJcbiAgQ2F0YWxvZ0l0ZW1Hcm91cCxcclxuICBDYXRhbG9nSXRlbVN0YXRlLFxyXG4gIENhdGFsb2dJdGVtVHlwZVxyXG59IGZyb20gJy4uL3NoYXJlZCc7XHJcblxyXG4vKipcclxuICogQ29tcG9uZW50IHRvIGJyb3dzZSBhIGNhdGFsb2cncyBncm91cHMgYW5kIGxheWVycyBhbmQgZGlzcGxheSB0aGVtIG9uIGEgbWFwLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tY2F0YWxvZy1icm93c2VyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY2F0YWxvZy1icm93c2VyLmNvbXBvbmVudC5odG1sJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2F0YWxvZ0Jyb3dzZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgLyoqXHJcbiAgICogQ2F0YWxvZyBpdGVtcyBzdG9yZSB3YXRjaGVyXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB3YXRjaGVyOiBFbnRpdHlTdG9yZVdhdGNoZXI8Q2F0YWxvZ0l0ZW0+O1xyXG5cclxuICAvKipcclxuICAgKiBDYXRhbG9nXHJcbiAgICovXHJcbiAgQElucHV0KCkgY2F0YWxvZzogQ2F0YWxvZztcclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcmUgaG9sZGluZyB0aGUgY2F0YWxvZydzIGl0ZW1zXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3RvcmU6IEVudGl0eVN0b3JlPENhdGFsb2dJdGVtLCBDYXRhbG9nSXRlbVN0YXRlPjtcclxuXHJcbiAgLyoqXHJcbiAgICogTWFwIHRvIGFkZCB0aGUgY2F0YWxvZyBpdGVtcyB0b1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1hcDogSWdvTWFwO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGEgZ3JvdXAgY2FuIGJlIHRvZ2dsZWQgd2hlbiBpdCdzIGNvbGxhcHNlZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHRvZ2dsZUNvbGxhcHNlZEdyb3VwOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGxheWVyU2VydmljZTogTGF5ZXJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcclxuICApIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgY29uc3QgY3VycmVudEl0ZW1zID0gdGhpcy5tYXAubGF5ZXJzLm1hcCgobGF5ZXI6IExheWVyKSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgaWQ6IGxheWVyLmlkLFxyXG4gICAgICAgIHRpdGxlOiBsYXllci50aXRsZSxcclxuICAgICAgICB0eXBlOiBDYXRhbG9nSXRlbVR5cGUuTGF5ZXJcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zdG9yZS5zdGF0ZS51cGRhdGVNYW55KGN1cnJlbnRJdGVtcywgeyBhZGRlZDogdHJ1ZSB9LCB0cnVlKTtcclxuICAgIGlmICh0aGlzLmNhdGFsb2cgJiYgdGhpcy5jYXRhbG9nLnNvcnREaXJlY3Rpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnN0b3JlLnZpZXcuc29ydCh7XHJcbiAgICAgICAgZGlyZWN0aW9uOiB0aGlzLmNhdGFsb2cuc29ydERpcmVjdGlvbixcclxuICAgICAgICB2YWx1ZUFjY2Vzc29yOiAoaXRlbTogQ2F0YWxvZ0l0ZW0pID0+IGl0ZW0udGl0bGVcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLndhdGNoZXIgPSBuZXcgRW50aXR5U3RvcmVXYXRjaGVyKHRoaXMuc3RvcmUsIHRoaXMuY2RSZWYpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLndhdGNoZXIuZGVzdHJveSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgaXNHcm91cChpdGVtOiBDYXRhbG9nSXRlbSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGl0ZW0udHlwZSA9PT0gQ2F0YWxvZ0l0ZW1UeXBlLkdyb3VwO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgaXNMYXllcihpdGVtOiBDYXRhbG9nSXRlbSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGl0ZW0udHlwZSA9PT0gQ2F0YWxvZ0l0ZW1UeXBlLkxheWVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBhIGxheWVyIGlzIGFkZGVkIG9yIHJlbW92ZWQsIGFkZCBvciByZW1vdmUgaXQgZnJvbSB0aGUgbWFwXHJcbiAgICogQGludGVybmFsXHJcbiAgICogQHBhcmFtIGV2ZW50IExheWVyIGFkZGVkIGV2ZW50XHJcbiAgICovXHJcbiAgb25MYXllckFkZGVkQ2hhbmdlKGV2ZW50OiB7IGFkZGVkOiBib29sZWFuOyBsYXllcjogQ2F0YWxvZ0l0ZW1MYXllciB9KSB7XHJcbiAgICBjb25zdCBsYXllciA9IGV2ZW50LmxheWVyO1xyXG4gICAgdGhpcy5zdG9yZS5zdGF0ZS51cGRhdGUobGF5ZXIsIHsgYWRkZWQ6IGV2ZW50LmFkZGVkIH0sIGZhbHNlKTtcclxuICAgIGV2ZW50LmFkZGVkID8gdGhpcy5hZGRMYXllclRvTWFwKGxheWVyKSA6IHRoaXMucmVtb3ZlTGF5ZXJGcm9tTWFwKGxheWVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gYSBmcm91cCBpcyBhZGRlZCBvciByZW1vdmVkLCBhZGQgb3IgcmVtb3ZlIGl0IGZyb20gdGhlIG1hcFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqIEBwYXJhbSBldmVudCBHcm91cCBhZGRlZCBldmVudFxyXG4gICAqL1xyXG4gIG9uR3JvdXBBZGRlZENoYW5nZShldmVudDogeyBhZGRlZDogYm9vbGVhbjsgZ3JvdXA6IENhdGFsb2dJdGVtR3JvdXAgfSkge1xyXG4gICAgY29uc3QgZ3JvdXAgPSBldmVudC5ncm91cDtcclxuICAgIHRoaXMuc3RvcmUuc3RhdGUudXBkYXRlKGdyb3VwLCB7IGFkZGVkOiBldmVudC5hZGRlZCB9LCBmYWxzZSk7XHJcbiAgICBldmVudC5hZGRlZCA/IHRoaXMuYWRkR3JvdXBUb01hcChncm91cCkgOiB0aGlzLnJlbW92ZUdyb3VwRnJvbU1hcChncm91cCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgbGF5ZXIgdG8gbWFwXHJcbiAgICogQHBhcmFtIGxheWVyIENhdGFsb2cgbGF5ZXJcclxuICAgKi9cclxuICBwcml2YXRlIGFkZExheWVyVG9NYXAobGF5ZXI6IENhdGFsb2dJdGVtTGF5ZXIpIHtcclxuICAgIHRoaXMuYWRkTGF5ZXJzVG9NYXAoW2xheWVyXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgbGF5ZXIgZnJvbSBtYXBcclxuICAgKiBAcGFyYW0gbGF5ZXIgQ2F0YWxvZyBsYXllclxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlTGF5ZXJGcm9tTWFwKGxheWVyOiBDYXRhbG9nSXRlbUxheWVyKSB7XHJcbiAgICB0aGlzLnJlbW92ZUxheWVyc0Zyb21NYXAoW2xheWVyXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgbXVsdGlwbGUgbGF5ZXJzIHRvIG1hcFxyXG4gICAqIEBwYXJhbSBsYXllcnMgQ2F0YWxvZyBsYXllcnNcclxuICAgKi9cclxuICBwcml2YXRlIGFkZExheWVyc1RvTWFwKGxheWVyczogQ2F0YWxvZ0l0ZW1MYXllcltdKSB7XHJcbiAgICBjb25zdCBsYXllcnMkID0gbGF5ZXJzLm1hcCgobGF5ZXI6IENhdGFsb2dJdGVtTGF5ZXIpID0+IHtcclxuICAgICAgcmV0dXJuIHRoaXMubGF5ZXJTZXJ2aWNlLmNyZWF0ZUFzeW5jTGF5ZXIobGF5ZXIub3B0aW9ucyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB6aXAoLi4ubGF5ZXJzJCkuc3Vic2NyaWJlKChvTGF5ZXJzOiBMYXllcltdKSA9PiB7XHJcbiAgICAgIHRoaXMuc3RvcmUuc3RhdGUudXBkYXRlTWFueShsYXllcnMsIHsgYWRkZWQ6IHRydWUgfSk7XHJcbiAgICAgIHRoaXMubWFwLmFkZExheWVycyhvTGF5ZXJzKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIG11bHRpcGxlIGxheWVycyBmcm9tIG1hcFxyXG4gICAqIEBwYXJhbSBsYXllcnMgQ2F0YWxvZyBsYXllcnNcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZUxheWVyc0Zyb21NYXAobGF5ZXJzOiBDYXRhbG9nSXRlbUxheWVyW10pIHtcclxuICAgIGxheWVycy5mb3JFYWNoKChsYXllcjogQ2F0YWxvZ0l0ZW1MYXllcikgPT4ge1xyXG4gICAgICB0aGlzLnN0b3JlLnN0YXRlLnVwZGF0ZShsYXllciwgeyBhZGRlZDogZmFsc2UgfSk7XHJcbiAgICAgIGNvbnN0IG9MYXllciA9IHRoaXMubWFwLmdldExheWVyQnlJZChsYXllci5pZCk7XHJcbiAgICAgIGlmIChvTGF5ZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMubWFwLnJlbW92ZUxheWVyKG9MYXllcik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGFsbCB0aGUgbGF5ZXJzIG9mIGEgZ3JvdXAgdG8gbWFwXHJcbiAgICogQHBhcmFtIGdyb3VwIENhdGFsb2cgZ3JvdXBcclxuICAgKi9cclxuICBwcml2YXRlIGFkZEdyb3VwVG9NYXAoZ3JvdXA6IENhdGFsb2dJdGVtR3JvdXApIHtcclxuICAgIGNvbnN0IGxheWVycyA9IGdyb3VwLml0ZW1zLmZpbHRlcigoaXRlbTogQ2F0YWxvZ0l0ZW0pID0+IHtcclxuICAgICAgY29uc3QgYWRkZWQgPSB0aGlzLnN0b3JlLnN0YXRlLmdldChpdGVtKS5hZGRlZCB8fCBmYWxzZTtcclxuICAgICAgcmV0dXJuIHRoaXMuaXNMYXllcihpdGVtKSAmJiBhZGRlZCA9PT0gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuYWRkTGF5ZXJzVG9NYXAobGF5ZXJzIGFzIENhdGFsb2dJdGVtTGF5ZXJbXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgYWxsIHRoZSBsYXllcnMgb2YgYSBncm91ZnJvbSBtYXBcclxuICAgKiBAcGFyYW0gZ3JvdXAgQ2F0YWxvZyBncm91cFxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlR3JvdXBGcm9tTWFwKGdyb3VwOiBDYXRhbG9nSXRlbUdyb3VwKSB7XHJcbiAgICBjb25zdCBsYXllcnMgPSBncm91cC5pdGVtcy5maWx0ZXIoKGl0ZW06IENhdGFsb2dJdGVtKSA9PiB7XHJcbiAgICAgIGNvbnN0IGFkZGVkID0gdGhpcy5zdG9yZS5zdGF0ZS5nZXQoaXRlbSkuYWRkZWQgfHwgZmFsc2U7XHJcbiAgICAgIHJldHVybiB0aGlzLmlzTGF5ZXIoaXRlbSkgJiYgYWRkZWQgPT09IHRydWU7XHJcbiAgICB9KTtcclxuICAgIHRoaXMucmVtb3ZlTGF5ZXJzRnJvbU1hcChsYXllcnMgYXMgQ2F0YWxvZ0l0ZW1MYXllcltdKTtcclxuICB9XHJcbn1cclxuIl19