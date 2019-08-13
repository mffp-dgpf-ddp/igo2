/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { zip } from 'rxjs';
import { EntityStore, EntityStoreWatcher } from '@igo2/common';
import { LayerService } from '../../layer/shared/layer.service';
import { IgoMap } from '../../map';
import { CatalogItemType } from '../shared';
/**
 * Component to browse a catalog's groups and layers and display them on a map.
 */
export class CatalogBrowserComponent {
    /**
     * @param {?} layerService
     * @param {?} cdRef
     */
    constructor(layerService, cdRef) {
        this.layerService = layerService;
        this.cdRef = cdRef;
        /**
         * Whether a group can be toggled when it's collapsed
         */
        this.toggleCollapsedGroup = true;
    }
    /**
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const currentItems = this.map.layers.map((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => {
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
                (item) => item.title)
            });
        }
        this.watcher = new EntityStoreWatcher(this.store, this.cdRef);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.watcher.destroy();
    }
    /**
     * \@internal
     * @param {?} item
     * @return {?}
     */
    isGroup(item) {
        return item.type === CatalogItemType.Group;
    }
    /**
     * \@internal
     * @param {?} item
     * @return {?}
     */
    isLayer(item) {
        return item.type === CatalogItemType.Layer;
    }
    /**
     * When a layer is added or removed, add or remove it from the map
     * \@internal
     * @param {?} event Layer added event
     * @return {?}
     */
    onLayerAddedChange(event) {
        /** @type {?} */
        const layer = event.layer;
        this.store.state.update(layer, { added: event.added }, false);
        event.added ? this.addLayerToMap(layer) : this.removeLayerFromMap(layer);
    }
    /**
     * When a froup is added or removed, add or remove it from the map
     * \@internal
     * @param {?} event Group added event
     * @return {?}
     */
    onGroupAddedChange(event) {
        /** @type {?} */
        const group = event.group;
        this.store.state.update(group, { added: event.added }, false);
        event.added ? this.addGroupToMap(group) : this.removeGroupFromMap(group);
    }
    /**
     * Add layer to map
     * @private
     * @param {?} layer Catalog layer
     * @return {?}
     */
    addLayerToMap(layer) {
        this.addLayersToMap([layer]);
    }
    /**
     * Remove layer from map
     * @private
     * @param {?} layer Catalog layer
     * @return {?}
     */
    removeLayerFromMap(layer) {
        this.removeLayersFromMap([layer]);
    }
    /**
     * Add multiple layers to map
     * @private
     * @param {?} layers Catalog layers
     * @return {?}
     */
    addLayersToMap(layers) {
        /** @type {?} */
        const layers$ = layers.map((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => {
            return this.layerService.createAsyncLayer(layer.options);
        }));
        zip(...layers$).subscribe((/**
         * @param {?} oLayers
         * @return {?}
         */
        (oLayers) => {
            this.store.state.updateMany(layers, { added: true });
            this.map.addLayers(oLayers);
        }));
    }
    /**
     * Remove multiple layers from map
     * @private
     * @param {?} layers Catalog layers
     * @return {?}
     */
    removeLayersFromMap(layers) {
        layers.forEach((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => {
            this.store.state.update(layer, { added: false });
            /** @type {?} */
            const oLayer = this.map.getLayerById(layer.id);
            if (oLayer !== undefined) {
                this.map.removeLayer(oLayer);
            }
        }));
    }
    /**
     * Add all the layers of a group to map
     * @private
     * @param {?} group Catalog group
     * @return {?}
     */
    addGroupToMap(group) {
        /** @type {?} */
        const layers = group.items.filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            /** @type {?} */
            const added = this.store.state.get(item).added || false;
            return this.isLayer(item) && added === false;
        }));
        this.addLayersToMap((/** @type {?} */ (layers)));
    }
    /**
     * Remove all the layers of a groufrom map
     * @private
     * @param {?} group Catalog group
     * @return {?}
     */
    removeGroupFromMap(group) {
        /** @type {?} */
        const layers = group.items.filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            /** @type {?} */
            const added = this.store.state.get(item).added || false;
            return this.isLayer(item) && added === true;
        }));
        this.removeLayersFromMap((/** @type {?} */ (layers)));
    }
}
CatalogBrowserComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-catalog-browser',
                template: "<igo-list [navigation]=\"false\" [selection]=\"false\">\r\n  <ng-template ngFor let-item [ngForOf]=\"store.view.all$() | async\">\r\n    <ng-container *ngIf=\"isGroup(item)\">\r\n      <igo-catalog-browser-group\r\n        [catalog]=\"catalog\"\r\n        [group]=\"item\"\r\n        [state]=\"store.state\"\r\n        [toggleCollapsed]=\"toggleCollapsedGroup\"\r\n        (addedChange)=\"onGroupAddedChange($event)\"\r\n        (layerAddedChange)=\"onLayerAddedChange($event)\">\r\n      </igo-catalog-browser-group>\r\n    </ng-container>\r\n\r\n    <ng-container *ngIf=\"isLayer(item)\">\r\n      <igo-catalog-browser-layer\r\n        igoListItem\r\n        [layer]=\"item\"\r\n        [added]=\"store.state.get(item).added\"\r\n        [disabled]=\"store.state.get(item).added\"\r\n        (addedChange)=\"onLayerAddedChange($event)\">\r\n      </igo-catalog-browser-layer>\r\n    </ng-container>\r\n  </ng-template>\r\n</igo-list>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
CatalogBrowserComponent.ctorParameters = () => [
    { type: LayerService },
    { type: ChangeDetectorRef }
];
CatalogBrowserComponent.propDecorators = {
    catalog: [{ type: Input }],
    store: [{ type: Input }],
    map: [{ type: Input }],
    toggleCollapsedGroup: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1icm93c2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9jYXRhbG9nL2NhdGFsb2ctYnJvd3Nlci9jYXRhbG9nLWJyb3dzZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBR2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0IsT0FBTyxFQUFFLFdBQVcsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUUvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUVuQyxPQUFPLEVBTUwsZUFBZSxFQUNoQixNQUFNLFdBQVcsQ0FBQzs7OztBQVVuQixNQUFNLE9BQU8sdUJBQXVCOzs7OztJQTBCbEMsWUFDVSxZQUEwQixFQUMxQixLQUF3QjtRQUR4QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixVQUFLLEdBQUwsS0FBSyxDQUFtQjs7OztRQUp6Qix5QkFBb0IsR0FBWSxJQUFJLENBQUM7SUFLM0MsQ0FBQzs7Ozs7SUFLSixRQUFROztjQUNBLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHOzs7O1FBQUMsQ0FBQyxLQUFZLEVBQUUsRUFBRTtZQUN4RCxPQUFPO2dCQUNMLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDWixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7Z0JBQ2xCLElBQUksRUFBRSxlQUFlLENBQUMsS0FBSzthQUM1QixDQUFDO1FBQ0osQ0FBQyxFQUFDO1FBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFD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S0FBSyxJQUFJLEtBQUs7WUFDdkQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUM7UUFDOUMsQ0FBQyxFQUFDO1FBQ0YsSUFBSSxDQUFDLG1CQUFtQixDQUFDLG1CQUFBLE1BQU0sRUFBc0IsQ0FBQyxDQUFDO0lBQ3pELENBQUM7OztZQXBLRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsdTdCQUErQztnQkFDL0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7Ozs7WUFuQlEsWUFBWTtZQVRuQixpQkFBaUI7OztzQkFzQ2hCLEtBQUs7b0JBS0wsS0FBSztrQkFLTCxLQUFLO21DQUtMLEtBQUs7Ozs7Ozs7O0lBcEJOLDBDQUFpRDs7Ozs7SUFLakQsMENBQTBCOzs7OztJQUsxQix3Q0FBMkQ7Ozs7O0lBSzNELHNDQUFxQjs7Ozs7SUFLckIsdURBQThDOzs7OztJQUc1QywrQ0FBa0M7Ozs7O0lBQ2xDLHdDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IHppcCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgRW50aXR5U3RvcmUsIEVudGl0eVN0b3JlV2F0Y2hlciB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllcic7XHJcbmltcG9ydCB7IExheWVyU2VydmljZSB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuXHJcbmltcG9ydCB7XHJcbiAgQ2F0YWxvZyxcclxuICBDYXRhbG9nSXRlbSxcclxuICBDYXRhbG9nSXRlbUxheWVyLFxyXG4gIENhdGFsb2dJdGVtR3JvdXAsXHJcbiAgQ2F0YWxvZ0l0ZW1TdGF0ZSxcclxuICBDYXRhbG9nSXRlbVR5cGVcclxufSBmcm9tICcuLi9zaGFyZWQnO1xyXG5cclxuLyoqXHJcbiAqIENvbXBvbmVudCB0byBicm93c2UgYSBjYXRhbG9nJ3MgZ3JvdXBzIGFuZCBsYXllcnMgYW5kIGRpc3BsYXkgdGhlbSBvbiBhIG1hcC5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWNhdGFsb2ctYnJvd3NlcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2NhdGFsb2ctYnJvd3Nlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIENhdGFsb2dCcm93c2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIENhdGFsb2cgaXRlbXMgc3RvcmUgd2F0Y2hlclxyXG4gICAqL1xyXG4gIHByaXZhdGUgd2F0Y2hlcjogRW50aXR5U3RvcmVXYXRjaGVyPENhdGFsb2dJdGVtPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2F0YWxvZ1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNhdGFsb2c6IENhdGFsb2c7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3JlIGhvbGRpbmcgdGhlIGNhdGFsb2cncyBpdGVtc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0b3JlOiBFbnRpdHlTdG9yZTxDYXRhbG9nSXRlbSwgQ2F0YWxvZ0l0ZW1TdGF0ZT47XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hcCB0byBhZGQgdGhlIGNhdGFsb2cgaXRlbXMgdG9cclxuICAgKi9cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBhIGdyb3VwIGNhbiBiZSB0b2dnbGVkIHdoZW4gaXQncyBjb2xsYXBzZWRcclxuICAgKi9cclxuICBASW5wdXQoKSB0b2dnbGVDb2xsYXBzZWRHcm91cDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBsYXllclNlcnZpY2U6IExheWVyU2VydmljZSxcclxuICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGNvbnN0IGN1cnJlbnRJdGVtcyA9IHRoaXMubWFwLmxheWVycy5tYXAoKGxheWVyOiBMYXllcikgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGlkOiBsYXllci5pZCxcclxuICAgICAgICB0aXRsZTogbGF5ZXIudGl0bGUsXHJcbiAgICAgICAgdHlwZTogQ2F0YWxvZ0l0ZW1UeXBlLkxheWVyXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc3RvcmUuc3RhdGUudXBkYXRlTWFueShjdXJyZW50SXRlbXMsIHsgYWRkZWQ6IHRydWUgfSwgdHJ1ZSk7XHJcbiAgICBpZiAodGhpcy5jYXRhbG9nICYmIHRoaXMuY2F0YWxvZy5zb3J0RGlyZWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5zdG9yZS52aWV3LnNvcnQoe1xyXG4gICAgICAgIGRpcmVjdGlvbjogdGhpcy5jYXRhbG9nLnNvcnREaXJlY3Rpb24sXHJcbiAgICAgICAgdmFsdWVBY2Nlc3NvcjogKGl0ZW06IENhdGFsb2dJdGVtKSA9PiBpdGVtLnRpdGxlXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy53YXRjaGVyID0gbmV3IEVudGl0eVN0b3JlV2F0Y2hlcih0aGlzLnN0b3JlLCB0aGlzLmNkUmVmKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy53YXRjaGVyLmRlc3Ryb3koKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGlzR3JvdXAoaXRlbTogQ2F0YWxvZ0l0ZW0pOiBib29sZWFuIHtcclxuICAgIHJldHVybiBpdGVtLnR5cGUgPT09IENhdGFsb2dJdGVtVHlwZS5Hcm91cDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGlzTGF5ZXIoaXRlbTogQ2F0YWxvZ0l0ZW0pOiBib29sZWFuIHtcclxuICAgIHJldHVybiBpdGVtLnR5cGUgPT09IENhdGFsb2dJdGVtVHlwZS5MYXllcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gYSBsYXllciBpcyBhZGRlZCBvciByZW1vdmVkLCBhZGQgb3IgcmVtb3ZlIGl0IGZyb20gdGhlIG1hcFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqIEBwYXJhbSBldmVudCBMYXllciBhZGRlZCBldmVudFxyXG4gICAqL1xyXG4gIG9uTGF5ZXJBZGRlZENoYW5nZShldmVudDogeyBhZGRlZDogYm9vbGVhbjsgbGF5ZXI6IENhdGFsb2dJdGVtTGF5ZXIgfSkge1xyXG4gICAgY29uc3QgbGF5ZXIgPSBldmVudC5sYXllcjtcclxuICAgIHRoaXMuc3RvcmUuc3RhdGUudXBkYXRlKGxheWVyLCB7IGFkZGVkOiBldmVudC5hZGRlZCB9LCBmYWxzZSk7XHJcbiAgICBldmVudC5hZGRlZCA/IHRoaXMuYWRkTGF5ZXJUb01hcChsYXllcikgOiB0aGlzLnJlbW92ZUxheWVyRnJvbU1hcChsYXllcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGEgZnJvdXAgaXMgYWRkZWQgb3IgcmVtb3ZlZCwgYWRkIG9yIHJlbW92ZSBpdCBmcm9tIHRoZSBtYXBcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKiBAcGFyYW0gZXZlbnQgR3JvdXAgYWRkZWQgZXZlbnRcclxuICAgKi9cclxuICBvbkdyb3VwQWRkZWRDaGFuZ2UoZXZlbnQ6IHsgYWRkZWQ6IGJvb2xlYW47IGdyb3VwOiBDYXRhbG9nSXRlbUdyb3VwIH0pIHtcclxuICAgIGNvbnN0IGdyb3VwID0gZXZlbnQuZ3JvdXA7XHJcbiAgICB0aGlzLnN0b3JlLnN0YXRlLnVwZGF0ZShncm91cCwgeyBhZGRlZDogZXZlbnQuYWRkZWQgfSwgZmFsc2UpO1xyXG4gICAgZXZlbnQuYWRkZWQgPyB0aGlzLmFkZEdyb3VwVG9NYXAoZ3JvdXApIDogdGhpcy5yZW1vdmVHcm91cEZyb21NYXAoZ3JvdXApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGxheWVyIHRvIG1hcFxyXG4gICAqIEBwYXJhbSBsYXllciBDYXRhbG9nIGxheWVyXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRMYXllclRvTWFwKGxheWVyOiBDYXRhbG9nSXRlbUxheWVyKSB7XHJcbiAgICB0aGlzLmFkZExheWVyc1RvTWFwKFtsYXllcl0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIGxheWVyIGZyb20gbWFwXHJcbiAgICogQHBhcmFtIGxheWVyIENhdGFsb2cgbGF5ZXJcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZUxheWVyRnJvbU1hcChsYXllcjogQ2F0YWxvZ0l0ZW1MYXllcikge1xyXG4gICAgdGhpcy5yZW1vdmVMYXllcnNGcm9tTWFwKFtsYXllcl0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIG11bHRpcGxlIGxheWVycyB0byBtYXBcclxuICAgKiBAcGFyYW0gbGF5ZXJzIENhdGFsb2cgbGF5ZXJzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRMYXllcnNUb01hcChsYXllcnM6IENhdGFsb2dJdGVtTGF5ZXJbXSkge1xyXG4gICAgY29uc3QgbGF5ZXJzJCA9IGxheWVycy5tYXAoKGxheWVyOiBDYXRhbG9nSXRlbUxheWVyKSA9PiB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxheWVyU2VydmljZS5jcmVhdGVBc3luY0xheWVyKGxheWVyLm9wdGlvbnMpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgemlwKC4uLmxheWVycyQpLnN1YnNjcmliZSgob0xheWVyczogTGF5ZXJbXSkgPT4ge1xyXG4gICAgICB0aGlzLnN0b3JlLnN0YXRlLnVwZGF0ZU1hbnkobGF5ZXJzLCB7IGFkZGVkOiB0cnVlIH0pO1xyXG4gICAgICB0aGlzLm1hcC5hZGRMYXllcnMob0xheWVycyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBtdWx0aXBsZSBsYXllcnMgZnJvbSBtYXBcclxuICAgKiBAcGFyYW0gbGF5ZXJzIENhdGFsb2cgbGF5ZXJzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZW1vdmVMYXllcnNGcm9tTWFwKGxheWVyczogQ2F0YWxvZ0l0ZW1MYXllcltdKSB7XHJcbiAgICBsYXllcnMuZm9yRWFjaCgobGF5ZXI6IENhdGFsb2dJdGVtTGF5ZXIpID0+IHtcclxuICAgICAgdGhpcy5zdG9yZS5zdGF0ZS51cGRhdGUobGF5ZXIsIHsgYWRkZWQ6IGZhbHNlIH0pO1xyXG4gICAgICBjb25zdCBvTGF5ZXIgPSB0aGlzLm1hcC5nZXRMYXllckJ5SWQobGF5ZXIuaWQpO1xyXG4gICAgICBpZiAob0xheWVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLm1hcC5yZW1vdmVMYXllcihvTGF5ZXIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhbGwgdGhlIGxheWVycyBvZiBhIGdyb3VwIHRvIG1hcFxyXG4gICAqIEBwYXJhbSBncm91cCBDYXRhbG9nIGdyb3VwXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRHcm91cFRvTWFwKGdyb3VwOiBDYXRhbG9nSXRlbUdyb3VwKSB7XHJcbiAgICBjb25zdCBsYXllcnMgPSBncm91cC5pdGVtcy5maWx0ZXIoKGl0ZW06IENhdGFsb2dJdGVtKSA9PiB7XHJcbiAgICAgIGNvbnN0IGFkZGVkID0gdGhpcy5zdG9yZS5zdGF0ZS5nZXQoaXRlbSkuYWRkZWQgfHwgZmFsc2U7XHJcbiAgICAgIHJldHVybiB0aGlzLmlzTGF5ZXIoaXRlbSkgJiYgYWRkZWQgPT09IGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmFkZExheWVyc1RvTWFwKGxheWVycyBhcyBDYXRhbG9nSXRlbUxheWVyW10pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIGFsbCB0aGUgbGF5ZXJzIG9mIGEgZ3JvdWZyb20gbWFwXHJcbiAgICogQHBhcmFtIGdyb3VwIENhdGFsb2cgZ3JvdXBcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZUdyb3VwRnJvbU1hcChncm91cDogQ2F0YWxvZ0l0ZW1Hcm91cCkge1xyXG4gICAgY29uc3QgbGF5ZXJzID0gZ3JvdXAuaXRlbXMuZmlsdGVyKChpdGVtOiBDYXRhbG9nSXRlbSkgPT4ge1xyXG4gICAgICBjb25zdCBhZGRlZCA9IHRoaXMuc3RvcmUuc3RhdGUuZ2V0KGl0ZW0pLmFkZGVkIHx8IGZhbHNlO1xyXG4gICAgICByZXR1cm4gdGhpcy5pc0xheWVyKGl0ZW0pICYmIGFkZGVkID09PSB0cnVlO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnJlbW92ZUxheWVyc0Zyb21NYXAobGF5ZXJzIGFzIENhdGFsb2dJdGVtTGF5ZXJbXSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==