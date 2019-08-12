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
                    template: "<igo-list [navigation]=\"false\" [selection]=\"false\">\r\n  <ng-template ngFor let-item [ngForOf]=\"store.view.all$() | async\">\r\n    <ng-container *ngIf=\"isGroup(item)\">\r\n      <igo-catalog-browser-group\r\n        [catalog]=\"catalog\"\r\n        [group]=\"item\"\r\n        [state]=\"store.state\"\r\n        (addedChange)=\"onGroupAddedChange($event)\"\r\n        (layerAddedChange)=\"onLayerAddedChange($event)\">\r\n      </igo-catalog-browser-group>\r\n    </ng-container>\r\n\r\n    <ng-container *ngIf=\"isLayer(item)\">\r\n      <igo-catalog-browser-layer\r\n        igoListItem\r\n        [layer]=\"item\"\r\n        [added]=\"store.state.get(item).added\"\r\n        [disabled]=\"store.state.get(item).added\"\r\n        (addedChange)=\"onLayerAddedChange($event)\">\r\n      </igo-catalog-browser-layer>\r\n    </ng-container>\r\n  </ng-template>\r\n</igo-list>\r\n",
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
        map: [{ type: Input }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1icm93c2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9jYXRhbG9nL2NhdGFsb2ctYnJvd3Nlci9jYXRhbG9nLWJyb3dzZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUdsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTNCLE9BQU8sRUFBRSxXQUFXLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFL0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFbkMsT0FBTyxFQU1MLGVBQWUsRUFDaEIsTUFBTSxXQUFXLENBQUM7Ozs7QUFLbkI7SUEwQkUsaUNBQ1UsWUFBMEIsRUFDMUIsS0FBd0I7UUFEeEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7SUFDL0IsQ0FBQztJQUVKOztPQUVHOzs7OztJQUNILDBDQUFROzs7O0lBQVI7O1lBQ1EsWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUc7Ozs7UUFBQyxVQUFDLEtBQVk7WUFDcEQsT0FBTztnQkFDTCxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ1osS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO2dCQUNsQixJQUFJLEVBQUUsZUFBZSxDQUFDLEtBQUs7YUFDNUIsQ0FBQztRQUNKLENBQUMsRUFBQztRQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUs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RUQ7OztPQUdHOzs7Ozs7O0lBQ0ssb0RBQWtCOzs7Ozs7SUFBMUIsVUFBMkIsS0FBdUI7UUFBbEQsaUJBTUM7O1lBTE8sTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTTs7OztRQUFDLFVBQUMsSUFBaUI7O2dCQUM1QyxLQUFLLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLO1lBQ3ZELE9BQU8sS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDO1FBQzlDLENBQUMsRUFBQztRQUNGLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBQSxNQUFNLEVBQXNCLENBQUMsQ0FBQztJQUN6RCxDQUFDOztnQkEvSkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLGk0QkFBK0M7b0JBQy9DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs7OztnQkFuQlEsWUFBWTtnQkFUbkIsaUJBQWlCOzs7MEJBc0NoQixLQUFLO3dCQUtMLEtBQUs7c0JBS0wsS0FBSzs7SUF3SVIsOEJBQUM7Q0FBQSxBQWhLRCxJQWdLQztTQTNKWSx1QkFBdUI7Ozs7Ozs7SUFJbEMsMENBQWlEOzs7OztJQUtqRCwwQ0FBMEI7Ozs7O0lBSzFCLHdDQUEyRDs7Ozs7SUFLM0Qsc0NBQXFCOzs7OztJQUduQiwrQ0FBa0M7Ozs7O0lBQ2xDLHdDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IHppcCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgRW50aXR5U3RvcmUsIEVudGl0eVN0b3JlV2F0Y2hlciB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllcic7XHJcbmltcG9ydCB7IExheWVyU2VydmljZSB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuXHJcbmltcG9ydCB7XHJcbiAgQ2F0YWxvZyxcclxuICBDYXRhbG9nSXRlbSxcclxuICBDYXRhbG9nSXRlbUxheWVyLFxyXG4gIENhdGFsb2dJdGVtR3JvdXAsXHJcbiAgQ2F0YWxvZ0l0ZW1TdGF0ZSxcclxuICBDYXRhbG9nSXRlbVR5cGVcclxufSBmcm9tICcuLi9zaGFyZWQnO1xyXG5cclxuLyoqXHJcbiAqIENvbXBvbmVudCB0byBicm93c2UgYSBjYXRhbG9nJ3MgZ3JvdXBzIGFuZCBsYXllcnMgYW5kIGRpc3BsYXkgdGhlbSBvbiBhIG1hcC5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWNhdGFsb2ctYnJvd3NlcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2NhdGFsb2ctYnJvd3Nlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIENhdGFsb2dCcm93c2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIENhdGFsb2cgaXRlbXMgc3RvcmUgd2F0Y2hlclxyXG4gICAqL1xyXG4gIHByaXZhdGUgd2F0Y2hlcjogRW50aXR5U3RvcmVXYXRjaGVyPENhdGFsb2dJdGVtPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2F0YWxvZ1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNhdGFsb2c6IENhdGFsb2c7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3JlIGhvbGRpbmcgdGhlIGNhdGFsb2cncyBpdGVtc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0b3JlOiBFbnRpdHlTdG9yZTxDYXRhbG9nSXRlbSwgQ2F0YWxvZ0l0ZW1TdGF0ZT47XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hcCB0byBhZGQgdGhlIGNhdGFsb2cgaXRlbXMgdG9cclxuICAgKi9cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGxheWVyU2VydmljZTogTGF5ZXJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcclxuICApIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgY29uc3QgY3VycmVudEl0ZW1zID0gdGhpcy5tYXAubGF5ZXJzLm1hcCgobGF5ZXI6IExheWVyKSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgaWQ6IGxheWVyLmlkLFxyXG4gICAgICAgIHRpdGxlOiBsYXllci50aXRsZSxcclxuICAgICAgICB0eXBlOiBDYXRhbG9nSXRlbVR5cGUuTGF5ZXJcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zdG9yZS5zdGF0ZS51cGRhdGVNYW55KGN1cnJlbnRJdGVtcywgeyBhZGRlZDogdHJ1ZSB9LCB0cnVlKTtcclxuICAgIGlmICh0aGlzLmNhdGFsb2cgJiYgdGhpcy5jYXRhbG9nLnNvcnREaXJlY3Rpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnN0b3JlLnZpZXcuc29ydCh7XHJcbiAgICAgICAgZGlyZWN0aW9uOiB0aGlzLmNhdGFsb2cuc29ydERpcmVjdGlvbixcclxuICAgICAgICB2YWx1ZUFjY2Vzc29yOiAoaXRlbTogQ2F0YWxvZ0l0ZW0pID0+IGl0ZW0udGl0bGVcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLndhdGNoZXIgPSBuZXcgRW50aXR5U3RvcmVXYXRjaGVyKHRoaXMuc3RvcmUsIHRoaXMuY2RSZWYpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLndhdGNoZXIuZGVzdHJveSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgaXNHcm91cChpdGVtOiBDYXRhbG9nSXRlbSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGl0ZW0udHlwZSA9PT0gQ2F0YWxvZ0l0ZW1UeXBlLkdyb3VwO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgaXNMYXllcihpdGVtOiBDYXRhbG9nSXRlbSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGl0ZW0udHlwZSA9PT0gQ2F0YWxvZ0l0ZW1UeXBlLkxheWVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBhIGxheWVyIGlzIGFkZGVkIG9yIHJlbW92ZWQsIGFkZCBvciByZW1vdmUgaXQgZnJvbSB0aGUgbWFwXHJcbiAgICogQGludGVybmFsXHJcbiAgICogQHBhcmFtIGV2ZW50IExheWVyIGFkZGVkIGV2ZW50XHJcbiAgICovXHJcbiAgb25MYXllckFkZGVkQ2hhbmdlKGV2ZW50OiB7IGFkZGVkOiBib29sZWFuOyBsYXllcjogQ2F0YWxvZ0l0ZW1MYXllciB9KSB7XHJcbiAgICBjb25zdCBsYXllciA9IGV2ZW50LmxheWVyO1xyXG4gICAgdGhpcy5zdG9yZS5zdGF0ZS51cGRhdGUobGF5ZXIsIHsgYWRkZWQ6IGV2ZW50LmFkZGVkIH0sIGZhbHNlKTtcclxuICAgIGV2ZW50LmFkZGVkID8gdGhpcy5hZGRMYXllclRvTWFwKGxheWVyKSA6IHRoaXMucmVtb3ZlTGF5ZXJGcm9tTWFwKGxheWVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gYSBmcm91cCBpcyBhZGRlZCBvciByZW1vdmVkLCBhZGQgb3IgcmVtb3ZlIGl0IGZyb20gdGhlIG1hcFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqIEBwYXJhbSBldmVudCBHcm91cCBhZGRlZCBldmVudFxyXG4gICAqL1xyXG4gIG9uR3JvdXBBZGRlZENoYW5nZShldmVudDogeyBhZGRlZDogYm9vbGVhbjsgZ3JvdXA6IENhdGFsb2dJdGVtR3JvdXAgfSkge1xyXG4gICAgY29uc3QgZ3JvdXAgPSBldmVudC5ncm91cDtcclxuICAgIHRoaXMuc3RvcmUuc3RhdGUudXBkYXRlKGdyb3VwLCB7IGFkZGVkOiBldmVudC5hZGRlZCB9LCBmYWxzZSk7XHJcbiAgICBldmVudC5hZGRlZCA/IHRoaXMuYWRkR3JvdXBUb01hcChncm91cCkgOiB0aGlzLnJlbW92ZUdyb3VwRnJvbU1hcChncm91cCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgbGF5ZXIgdG8gbWFwXHJcbiAgICogQHBhcmFtIGxheWVyIENhdGFsb2cgbGF5ZXJcclxuICAgKi9cclxuICBwcml2YXRlIGFkZExheWVyVG9NYXAobGF5ZXI6IENhdGFsb2dJdGVtTGF5ZXIpIHtcclxuICAgIHRoaXMuYWRkTGF5ZXJzVG9NYXAoW2xheWVyXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgbGF5ZXIgZnJvbSBtYXBcclxuICAgKiBAcGFyYW0gbGF5ZXIgQ2F0YWxvZyBsYXllclxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlTGF5ZXJGcm9tTWFwKGxheWVyOiBDYXRhbG9nSXRlbUxheWVyKSB7XHJcbiAgICB0aGlzLnJlbW92ZUxheWVyc0Zyb21NYXAoW2xheWVyXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgbXVsdGlwbGUgbGF5ZXJzIHRvIG1hcFxyXG4gICAqIEBwYXJhbSBsYXllcnMgQ2F0YWxvZyBsYXllcnNcclxuICAgKi9cclxuICBwcml2YXRlIGFkZExheWVyc1RvTWFwKGxheWVyczogQ2F0YWxvZ0l0ZW1MYXllcltdKSB7XHJcbiAgICBjb25zdCBsYXllcnMkID0gbGF5ZXJzLm1hcCgobGF5ZXI6IENhdGFsb2dJdGVtTGF5ZXIpID0+IHtcclxuICAgICAgcmV0dXJuIHRoaXMubGF5ZXJTZXJ2aWNlLmNyZWF0ZUFzeW5jTGF5ZXIobGF5ZXIub3B0aW9ucyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB6aXAoLi4ubGF5ZXJzJCkuc3Vic2NyaWJlKChvTGF5ZXJzOiBMYXllcltdKSA9PiB7XHJcbiAgICAgIHRoaXMuc3RvcmUuc3RhdGUudXBkYXRlTWFueShsYXllcnMsIHsgYWRkZWQ6IHRydWUgfSk7XHJcbiAgICAgIHRoaXMubWFwLmFkZExheWVycyhvTGF5ZXJzKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIG11bHRpcGxlIGxheWVycyBmcm9tIG1hcFxyXG4gICAqIEBwYXJhbSBsYXllcnMgQ2F0YWxvZyBsYXllcnNcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZUxheWVyc0Zyb21NYXAobGF5ZXJzOiBDYXRhbG9nSXRlbUxheWVyW10pIHtcclxuICAgIGxheWVycy5mb3JFYWNoKChsYXllcjogQ2F0YWxvZ0l0ZW1MYXllcikgPT4ge1xyXG4gICAgICB0aGlzLnN0b3JlLnN0YXRlLnVwZGF0ZShsYXllciwgeyBhZGRlZDogZmFsc2UgfSk7XHJcbiAgICAgIGNvbnN0IG9MYXllciA9IHRoaXMubWFwLmdldExheWVyQnlJZChsYXllci5pZCk7XHJcbiAgICAgIGlmIChvTGF5ZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMubWFwLnJlbW92ZUxheWVyKG9MYXllcik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGFsbCB0aGUgbGF5ZXJzIG9mIGEgZ3JvdXAgdG8gbWFwXHJcbiAgICogQHBhcmFtIGdyb3VwIENhdGFsb2cgZ3JvdXBcclxuICAgKi9cclxuICBwcml2YXRlIGFkZEdyb3VwVG9NYXAoZ3JvdXA6IENhdGFsb2dJdGVtR3JvdXApIHtcclxuICAgIGNvbnN0IGxheWVycyA9IGdyb3VwLml0ZW1zLmZpbHRlcigoaXRlbTogQ2F0YWxvZ0l0ZW0pID0+IHtcclxuICAgICAgY29uc3QgYWRkZWQgPSB0aGlzLnN0b3JlLnN0YXRlLmdldChpdGVtKS5hZGRlZCB8fCBmYWxzZTtcclxuICAgICAgcmV0dXJuIHRoaXMuaXNMYXllcihpdGVtKSAmJiBhZGRlZCA9PT0gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuYWRkTGF5ZXJzVG9NYXAobGF5ZXJzIGFzIENhdGFsb2dJdGVtTGF5ZXJbXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgYWxsIHRoZSBsYXllcnMgb2YgYSBncm91ZnJvbSBtYXBcclxuICAgKiBAcGFyYW0gZ3JvdXAgQ2F0YWxvZyBncm91cFxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlR3JvdXBGcm9tTWFwKGdyb3VwOiBDYXRhbG9nSXRlbUdyb3VwKSB7XHJcbiAgICBjb25zdCBsYXllcnMgPSBncm91cC5pdGVtcy5maWx0ZXIoKGl0ZW06IENhdGFsb2dJdGVtKSA9PiB7XHJcbiAgICAgIGNvbnN0IGFkZGVkID0gdGhpcy5zdG9yZS5zdGF0ZS5nZXQoaXRlbSkuYWRkZWQgfHwgZmFsc2U7XHJcbiAgICAgIHJldHVybiB0aGlzLmlzTGF5ZXIoaXRlbSkgJiYgYWRkZWQgPT09IHRydWU7XHJcbiAgICB9KTtcclxuICAgIHRoaXMucmVtb3ZlTGF5ZXJzRnJvbU1hcChsYXllcnMgYXMgQ2F0YWxvZ0l0ZW1MYXllcltdKTtcclxuICB9XHJcbn1cclxuIl19