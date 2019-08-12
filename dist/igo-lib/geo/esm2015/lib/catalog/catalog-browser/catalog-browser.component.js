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
                template: "<igo-list [navigation]=\"false\" [selection]=\"false\">\r\n  <ng-template ngFor let-item [ngForOf]=\"store.view.all$() | async\">\r\n    <ng-container *ngIf=\"isGroup(item)\">\r\n      <igo-catalog-browser-group\r\n        [catalog]=\"catalog\"\r\n        [group]=\"item\"\r\n        [state]=\"store.state\"\r\n        (addedChange)=\"onGroupAddedChange($event)\"\r\n        (layerAddedChange)=\"onLayerAddedChange($event)\">\r\n      </igo-catalog-browser-group>\r\n    </ng-container>\r\n\r\n    <ng-container *ngIf=\"isLayer(item)\">\r\n      <igo-catalog-browser-layer\r\n        igoListItem\r\n        [layer]=\"item\"\r\n        [added]=\"store.state.get(item).added\"\r\n        [disabled]=\"store.state.get(item).added\"\r\n        (addedChange)=\"onLayerAddedChange($event)\">\r\n      </igo-catalog-browser-layer>\r\n    </ng-container>\r\n  </ng-template>\r\n</igo-list>\r\n",
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
    map: [{ type: Input }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1icm93c2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9jYXRhbG9nL2NhdGFsb2ctYnJvd3Nlci9jYXRhbG9nLWJyb3dzZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBR2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0IsT0FBTyxFQUFFLFdBQVcsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUUvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUVuQyxPQUFPLEVBTUwsZUFBZSxFQUNoQixNQUFNLFdBQVcsQ0FBQzs7OztBQVVuQixNQUFNLE9BQU8sdUJBQXVCOzs7OztJQXFCbEMsWUFDVSxZQUEwQixFQUMxQixLQUF3QjtRQUR4QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixVQUFLLEdBQUwsS0FBSyxDQUFtQjtJQUMvQixDQUFDOzs7OztJQUtKLFFBQVE7O2NBQ0EsWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUc7Ozs7UUFBQyxDQUFDLEtBQVksRUFBRSxFQUFFO1lBQ3hELE9BQU87Z0JBQ0wsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUNaLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztnQkFDbEIsSUFBSSxFQUFFLGVBQWUsQ0FBQyxLQUFLO2FBQzVCLENBQUM7UUFDSixDQUFDLEVBQUM7UUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUks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Q0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQztRQUM5QyxDQUFDLEVBQUM7UUFDRixJQUFJLENBQUMsbUJBQW1CLENBQUMsbUJBQUEsTUFBTSxFQUFzQixDQUFDLENBQUM7SUFDekQsQ0FBQzs7O1lBL0pGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixpNEJBQStDO2dCQUMvQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7OztZQW5CUSxZQUFZO1lBVG5CLGlCQUFpQjs7O3NCQXNDaEIsS0FBSztvQkFLTCxLQUFLO2tCQUtMLEtBQUs7Ozs7Ozs7O0lBZk4sMENBQWlEOzs7OztJQUtqRCwwQ0FBMEI7Ozs7O0lBSzFCLHdDQUEyRDs7Ozs7SUFLM0Qsc0NBQXFCOzs7OztJQUduQiwrQ0FBa0M7Ozs7O0lBQ2xDLHdDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IHppcCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgRW50aXR5U3RvcmUsIEVudGl0eVN0b3JlV2F0Y2hlciB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllcic7XHJcbmltcG9ydCB7IExheWVyU2VydmljZSB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuXHJcbmltcG9ydCB7XHJcbiAgQ2F0YWxvZyxcclxuICBDYXRhbG9nSXRlbSxcclxuICBDYXRhbG9nSXRlbUxheWVyLFxyXG4gIENhdGFsb2dJdGVtR3JvdXAsXHJcbiAgQ2F0YWxvZ0l0ZW1TdGF0ZSxcclxuICBDYXRhbG9nSXRlbVR5cGVcclxufSBmcm9tICcuLi9zaGFyZWQnO1xyXG5cclxuLyoqXHJcbiAqIENvbXBvbmVudCB0byBicm93c2UgYSBjYXRhbG9nJ3MgZ3JvdXBzIGFuZCBsYXllcnMgYW5kIGRpc3BsYXkgdGhlbSBvbiBhIG1hcC5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWNhdGFsb2ctYnJvd3NlcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2NhdGFsb2ctYnJvd3Nlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIENhdGFsb2dCcm93c2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIENhdGFsb2cgaXRlbXMgc3RvcmUgd2F0Y2hlclxyXG4gICAqL1xyXG4gIHByaXZhdGUgd2F0Y2hlcjogRW50aXR5U3RvcmVXYXRjaGVyPENhdGFsb2dJdGVtPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2F0YWxvZ1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNhdGFsb2c6IENhdGFsb2c7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3JlIGhvbGRpbmcgdGhlIGNhdGFsb2cncyBpdGVtc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0b3JlOiBFbnRpdHlTdG9yZTxDYXRhbG9nSXRlbSwgQ2F0YWxvZ0l0ZW1TdGF0ZT47XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hcCB0byBhZGQgdGhlIGNhdGFsb2cgaXRlbXMgdG9cclxuICAgKi9cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGxheWVyU2VydmljZTogTGF5ZXJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcclxuICApIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgY29uc3QgY3VycmVudEl0ZW1zID0gdGhpcy5tYXAubGF5ZXJzLm1hcCgobGF5ZXI6IExheWVyKSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgaWQ6IGxheWVyLmlkLFxyXG4gICAgICAgIHRpdGxlOiBsYXllci50aXRsZSxcclxuICAgICAgICB0eXBlOiBDYXRhbG9nSXRlbVR5cGUuTGF5ZXJcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zdG9yZS5zdGF0ZS51cGRhdGVNYW55KGN1cnJlbnRJdGVtcywgeyBhZGRlZDogdHJ1ZSB9LCB0cnVlKTtcclxuICAgIGlmICh0aGlzLmNhdGFsb2cgJiYgdGhpcy5jYXRhbG9nLnNvcnREaXJlY3Rpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnN0b3JlLnZpZXcuc29ydCh7XHJcbiAgICAgICAgZGlyZWN0aW9uOiB0aGlzLmNhdGFsb2cuc29ydERpcmVjdGlvbixcclxuICAgICAgICB2YWx1ZUFjY2Vzc29yOiAoaXRlbTogQ2F0YWxvZ0l0ZW0pID0+IGl0ZW0udGl0bGVcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLndhdGNoZXIgPSBuZXcgRW50aXR5U3RvcmVXYXRjaGVyKHRoaXMuc3RvcmUsIHRoaXMuY2RSZWYpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLndhdGNoZXIuZGVzdHJveSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgaXNHcm91cChpdGVtOiBDYXRhbG9nSXRlbSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGl0ZW0udHlwZSA9PT0gQ2F0YWxvZ0l0ZW1UeXBlLkdyb3VwO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgaXNMYXllcihpdGVtOiBDYXRhbG9nSXRlbSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGl0ZW0udHlwZSA9PT0gQ2F0YWxvZ0l0ZW1UeXBlLkxheWVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBhIGxheWVyIGlzIGFkZGVkIG9yIHJlbW92ZWQsIGFkZCBvciByZW1vdmUgaXQgZnJvbSB0aGUgbWFwXHJcbiAgICogQGludGVybmFsXHJcbiAgICogQHBhcmFtIGV2ZW50IExheWVyIGFkZGVkIGV2ZW50XHJcbiAgICovXHJcbiAgb25MYXllckFkZGVkQ2hhbmdlKGV2ZW50OiB7IGFkZGVkOiBib29sZWFuOyBsYXllcjogQ2F0YWxvZ0l0ZW1MYXllciB9KSB7XHJcbiAgICBjb25zdCBsYXllciA9IGV2ZW50LmxheWVyO1xyXG4gICAgdGhpcy5zdG9yZS5zdGF0ZS51cGRhdGUobGF5ZXIsIHsgYWRkZWQ6IGV2ZW50LmFkZGVkIH0sIGZhbHNlKTtcclxuICAgIGV2ZW50LmFkZGVkID8gdGhpcy5hZGRMYXllclRvTWFwKGxheWVyKSA6IHRoaXMucmVtb3ZlTGF5ZXJGcm9tTWFwKGxheWVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gYSBmcm91cCBpcyBhZGRlZCBvciByZW1vdmVkLCBhZGQgb3IgcmVtb3ZlIGl0IGZyb20gdGhlIG1hcFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqIEBwYXJhbSBldmVudCBHcm91cCBhZGRlZCBldmVudFxyXG4gICAqL1xyXG4gIG9uR3JvdXBBZGRlZENoYW5nZShldmVudDogeyBhZGRlZDogYm9vbGVhbjsgZ3JvdXA6IENhdGFsb2dJdGVtR3JvdXAgfSkge1xyXG4gICAgY29uc3QgZ3JvdXAgPSBldmVudC5ncm91cDtcclxuICAgIHRoaXMuc3RvcmUuc3RhdGUudXBkYXRlKGdyb3VwLCB7IGFkZGVkOiBldmVudC5hZGRlZCB9LCBmYWxzZSk7XHJcbiAgICBldmVudC5hZGRlZCA/IHRoaXMuYWRkR3JvdXBUb01hcChncm91cCkgOiB0aGlzLnJlbW92ZUdyb3VwRnJvbU1hcChncm91cCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgbGF5ZXIgdG8gbWFwXHJcbiAgICogQHBhcmFtIGxheWVyIENhdGFsb2cgbGF5ZXJcclxuICAgKi9cclxuICBwcml2YXRlIGFkZExheWVyVG9NYXAobGF5ZXI6IENhdGFsb2dJdGVtTGF5ZXIpIHtcclxuICAgIHRoaXMuYWRkTGF5ZXJzVG9NYXAoW2xheWVyXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgbGF5ZXIgZnJvbSBtYXBcclxuICAgKiBAcGFyYW0gbGF5ZXIgQ2F0YWxvZyBsYXllclxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlTGF5ZXJGcm9tTWFwKGxheWVyOiBDYXRhbG9nSXRlbUxheWVyKSB7XHJcbiAgICB0aGlzLnJlbW92ZUxheWVyc0Zyb21NYXAoW2xheWVyXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgbXVsdGlwbGUgbGF5ZXJzIHRvIG1hcFxyXG4gICAqIEBwYXJhbSBsYXllcnMgQ2F0YWxvZyBsYXllcnNcclxuICAgKi9cclxuICBwcml2YXRlIGFkZExheWVyc1RvTWFwKGxheWVyczogQ2F0YWxvZ0l0ZW1MYXllcltdKSB7XHJcbiAgICBjb25zdCBsYXllcnMkID0gbGF5ZXJzLm1hcCgobGF5ZXI6IENhdGFsb2dJdGVtTGF5ZXIpID0+IHtcclxuICAgICAgcmV0dXJuIHRoaXMubGF5ZXJTZXJ2aWNlLmNyZWF0ZUFzeW5jTGF5ZXIobGF5ZXIub3B0aW9ucyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB6aXAoLi4ubGF5ZXJzJCkuc3Vic2NyaWJlKChvTGF5ZXJzOiBMYXllcltdKSA9PiB7XHJcbiAgICAgIHRoaXMuc3RvcmUuc3RhdGUudXBkYXRlTWFueShsYXllcnMsIHsgYWRkZWQ6IHRydWUgfSk7XHJcbiAgICAgIHRoaXMubWFwLmFkZExheWVycyhvTGF5ZXJzKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIG11bHRpcGxlIGxheWVycyBmcm9tIG1hcFxyXG4gICAqIEBwYXJhbSBsYXllcnMgQ2F0YWxvZyBsYXllcnNcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZUxheWVyc0Zyb21NYXAobGF5ZXJzOiBDYXRhbG9nSXRlbUxheWVyW10pIHtcclxuICAgIGxheWVycy5mb3JFYWNoKChsYXllcjogQ2F0YWxvZ0l0ZW1MYXllcikgPT4ge1xyXG4gICAgICB0aGlzLnN0b3JlLnN0YXRlLnVwZGF0ZShsYXllciwgeyBhZGRlZDogZmFsc2UgfSk7XHJcbiAgICAgIGNvbnN0IG9MYXllciA9IHRoaXMubWFwLmdldExheWVyQnlJZChsYXllci5pZCk7XHJcbiAgICAgIGlmIChvTGF5ZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMubWFwLnJlbW92ZUxheWVyKG9MYXllcik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGFsbCB0aGUgbGF5ZXJzIG9mIGEgZ3JvdXAgdG8gbWFwXHJcbiAgICogQHBhcmFtIGdyb3VwIENhdGFsb2cgZ3JvdXBcclxuICAgKi9cclxuICBwcml2YXRlIGFkZEdyb3VwVG9NYXAoZ3JvdXA6IENhdGFsb2dJdGVtR3JvdXApIHtcclxuICAgIGNvbnN0IGxheWVycyA9IGdyb3VwLml0ZW1zLmZpbHRlcigoaXRlbTogQ2F0YWxvZ0l0ZW0pID0+IHtcclxuICAgICAgY29uc3QgYWRkZWQgPSB0aGlzLnN0b3JlLnN0YXRlLmdldChpdGVtKS5hZGRlZCB8fCBmYWxzZTtcclxuICAgICAgcmV0dXJuIHRoaXMuaXNMYXllcihpdGVtKSAmJiBhZGRlZCA9PT0gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuYWRkTGF5ZXJzVG9NYXAobGF5ZXJzIGFzIENhdGFsb2dJdGVtTGF5ZXJbXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgYWxsIHRoZSBsYXllcnMgb2YgYSBncm91ZnJvbSBtYXBcclxuICAgKiBAcGFyYW0gZ3JvdXAgQ2F0YWxvZyBncm91cFxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlR3JvdXBGcm9tTWFwKGdyb3VwOiBDYXRhbG9nSXRlbUdyb3VwKSB7XHJcbiAgICBjb25zdCBsYXllcnMgPSBncm91cC5pdGVtcy5maWx0ZXIoKGl0ZW06IENhdGFsb2dJdGVtKSA9PiB7XHJcbiAgICAgIGNvbnN0IGFkZGVkID0gdGhpcy5zdG9yZS5zdGF0ZS5nZXQoaXRlbSkuYWRkZWQgfHwgZmFsc2U7XHJcbiAgICAgIHJldHVybiB0aGlzLmlzTGF5ZXIoaXRlbSkgJiYgYWRkZWQgPT09IHRydWU7XHJcbiAgICB9KTtcclxuICAgIHRoaXMucmVtb3ZlTGF5ZXJzRnJvbU1hcChsYXllcnMgYXMgQ2F0YWxvZ0l0ZW1MYXllcltdKTtcclxuICB9XHJcbn1cclxuIl19