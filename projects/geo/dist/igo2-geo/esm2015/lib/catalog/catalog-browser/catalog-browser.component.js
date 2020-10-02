/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { zip } from 'rxjs';
import { EntityStore, EntityStoreWatcher } from '@igo2/common';
import { LayerService } from '../../layer/shared/layer.service';
import { IgoMap } from '../../map';
import { Catalog, CatalogItemType } from '../shared';
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
        this.catalogAllowLegend = false;
        /**
         * Whether a group can be toggled when it's collapsed
         */
        this.toggleCollapsedGroup = true;
    }
    // private resolution$$: Subscription;
    /**
     * @return {?}
     */
    get resolution$() { return this.map.viewController.resolution$; }
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
                (item) => item.title)
            });
        }
        /** @type {?} */
        const catalogShowLegend = this.catalog ? this.catalog.showLegend : false;
        this.catalogAllowLegend = catalogShowLegend ? catalogShowLegend : this.catalogAllowLegend;
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
            if (layer.options.sourceOptions.optionsFromApi === undefined) {
                layer.options.sourceOptions.optionsFromApi = true;
            }
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
            if (layer.options.baseLayer === true) {
                /** @type {?} */
                const oLayer = this.map.getLayerById(layer.options.id);
                if (oLayer !== undefined) {
                    this.map.removeLayer(oLayer);
                }
            }
            else {
                /** @type {?} */
                const oLayer = this.map.getLayerById(layer.id);
                if (oLayer !== undefined) {
                    this.map.removeLayer(oLayer);
                }
            }
        }));
    }
    /**
     * Sort the layers by title. asc or desc.
     * \@internal
     * @private
     * @param {?} items
     * @param {?} direction
     * @return {?}
     */
    sortCatalogItemsByTitle(items, direction) {
        /** @type {?} */
        const returnItem = items.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => {
            /** @type {?} */
            const titleA = a.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            /** @type {?} */
            const titleB = b.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
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
    }
    /**
     * Add all the layers of a group to map
     * @private
     * @param {?} group Catalog group
     * @return {?}
     */
    addGroupToMap(group) {
        /** @type {?} */
        let layers = group.items.filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            /** @type {?} */
            const added = this.store.state.get(item).added || false;
            return this.isLayer(item) && added === false;
        }));
        if (this.catalog && this.catalog.sortDirection !== undefined) {
            layers = this.sortCatalogItemsByTitle(layers, this.catalog.sortDirection);
        }
        this.addLayersToMap((/** @type {?} */ (layers.reverse())));
    }
    /**
     * Remove all the layers of a group from map
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
                template: "<igo-list [navigation]=\"false\" [selection]=\"false\">\r\n  <ng-template ngFor let-item [ngForOf]=\"store.view.all$() | async\">\r\n    <ng-container *ngIf=\"isGroup(item)\">\r\n      <igo-catalog-browser-group\r\n        [catalog]=\"catalog\"\r\n        [group]=\"item\"\r\n        [state]=\"store.state\"\r\n        [resolution]=\"resolution$ | async\"\r\n        [catalogAllowLegend]=\"catalogAllowLegend\"\r\n        [toggleCollapsed]=\"toggleCollapsedGroup\"\r\n        (addedChange)=\"onGroupAddedChange($event)\"\r\n        (layerAddedChange)=\"onLayerAddedChange($event)\">\r\n      </igo-catalog-browser-group>\r\n    </ng-container>\r\n\r\n    <ng-container *ngIf=\"isLayer(item)\">\r\n      <igo-catalog-browser-layer\r\n        igoListItem\r\n        [layer]=\"item\"\r\n        [resolution]=\"resolution$ | async\"\r\n        [catalogAllowLegend]=\"catalogAllowLegend\"\r\n        [added]=\"store.state.get(item).added\"\r\n        (addedChange)=\"onLayerAddedChange($event)\">\r\n      </igo-catalog-browser-layer>\r\n    </ng-container>\r\n  </ng-template>\r\n</igo-list>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
CatalogBrowserComponent.ctorParameters = () => [
    { type: LayerService },
    { type: ChangeDetectorRef }
];
CatalogBrowserComponent.propDecorators = {
    catalogAllowLegend: [{ type: Input }],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1icm93c2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9jYXRhbG9nL2NhdGFsb2ctYnJvd3Nlci9jYXRhbG9nLWJyb3dzZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBR2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxHQUFHLEVBQW1CLE1BQU0sTUFBTSxDQUFDO0FBRTVDLE9BQU8sRUFBRSxXQUFXLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFL0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFbkMsT0FBTyxFQUNMLE9BQU8sRUFLUCxlQUFlLEVBQ2hCLE1BQU0sV0FBVyxDQUFDOzs7O0FBVW5CLE1BQU0sT0FBTyx1QkFBdUI7Ozs7O0lBZ0NsQyxZQUNVLFlBQTBCLEVBQzFCLEtBQXdCO1FBRHhCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBeEJ6Qix1QkFBa0IsR0FBRyxLQUFLLENBQUM7Ozs7UUFvQjNCLHlCQUFvQixHQUFZLElBQUksQ0FBQztJQUszQyxDQUFDOzs7OztJQTNCSixJQUFJLFdBQVcsS0FBOEIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOzs7OztJQWdDMUYsUUFBUTs7Y0FDQSxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRzs7OztRQUFDLENBQUMsS0FBWSxFQUFFLEVBQUU7WUFDeEQsT0FBTztnQkFDTCxFQUFFLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFN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QUtMLEtBQUs7bUNBS0wsS0FBSzs7Ozs7Ozs7SUExQk4sMENBQWlEOztJQU1qRCxxREFBb0M7Ozs7O0lBS3BDLDBDQUEwQjs7Ozs7SUFLMUIsd0NBQTJEOzs7OztJQUszRCxzQ0FBcUI7Ozs7O0lBS3JCLHVEQUE4Qzs7Ozs7SUFHNUMsK0NBQWtDOzs7OztJQUNsQyx3Q0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyB6aXAsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgRW50aXR5U3RvcmUsIEVudGl0eVN0b3JlV2F0Y2hlciB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllcic7XHJcbmltcG9ydCB7IExheWVyU2VydmljZSB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuXHJcbmltcG9ydCB7XHJcbiAgQ2F0YWxvZyxcclxuICBDYXRhbG9nSXRlbSxcclxuICBDYXRhbG9nSXRlbUxheWVyLFxyXG4gIENhdGFsb2dJdGVtR3JvdXAsXHJcbiAgQ2F0YWxvZ0l0ZW1TdGF0ZSxcclxuICBDYXRhbG9nSXRlbVR5cGVcclxufSBmcm9tICcuLi9zaGFyZWQnO1xyXG5cclxuLyoqXHJcbiAqIENvbXBvbmVudCB0byBicm93c2UgYSBjYXRhbG9nJ3MgZ3JvdXBzIGFuZCBsYXllcnMgYW5kIGRpc3BsYXkgdGhlbSBvbiBhIG1hcC5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWNhdGFsb2ctYnJvd3NlcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2NhdGFsb2ctYnJvd3Nlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIENhdGFsb2dCcm93c2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIENhdGFsb2cgaXRlbXMgc3RvcmUgd2F0Y2hlclxyXG4gICAqL1xyXG4gIHByaXZhdGUgd2F0Y2hlcjogRW50aXR5U3RvcmVXYXRjaGVyPENhdGFsb2dJdGVtPjtcclxuXHJcbiAvLyBwcml2YXRlIHJlc29sdXRpb24kJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBnZXQgcmVzb2x1dGlvbiQoKTogQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4geyByZXR1cm4gdGhpcy5tYXAudmlld0NvbnRyb2xsZXIucmVzb2x1dGlvbiQ7IH1cclxuXHJcbiAgQElucHV0KCkgY2F0YWxvZ0FsbG93TGVnZW5kID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIENhdGFsb2dcclxuICAgKi9cclxuICBASW5wdXQoKSBjYXRhbG9nOiBDYXRhbG9nO1xyXG5cclxuICAvKipcclxuICAgKiBTdG9yZSBob2xkaW5nIHRoZSBjYXRhbG9nJ3MgaXRlbXNcclxuICAgKi9cclxuICBASW5wdXQoKSBzdG9yZTogRW50aXR5U3RvcmU8Q2F0YWxvZ0l0ZW0sIENhdGFsb2dJdGVtU3RhdGU+O1xyXG5cclxuICAvKipcclxuICAgKiBNYXAgdG8gYWRkIHRoZSBjYXRhbG9nIGl0ZW1zIHRvXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWFwOiBJZ29NYXA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgYSBncm91cCBjYW4gYmUgdG9nZ2xlZCB3aGVuIGl0J3MgY29sbGFwc2VkXHJcbiAgICovXHJcbiAgQElucHV0KCkgdG9nZ2xlQ29sbGFwc2VkR3JvdXA6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbGF5ZXJTZXJ2aWNlOiBMYXllclNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxyXG4gICkge31cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBjb25zdCBjdXJyZW50SXRlbXMgPSB0aGlzLm1hcC5sYXllcnMubWFwKChsYXllcjogTGF5ZXIpID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBpZDogbGF5ZXIub3B0aW9ucy5zb3VyY2UuaWQsXHJcbiAgICAgICAgdGl0bGU6IGxheWVyLnRpdGxlLFxyXG4gICAgICAgIHR5cGU6IENhdGFsb2dJdGVtVHlwZS5MYXllclxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnN0b3JlLnN0YXRlLnVwZGF0ZU1hbnkoY3VycmVudEl0ZW1zLCB7IGFkZGVkOiB0cnVlIH0sIHRydWUpO1xyXG4gICAgaWYgKHRoaXMuY2F0YWxvZyAmJiB0aGlzLmNhdGFsb2cuc29ydERpcmVjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuc3RvcmUudmlldy5zb3J0KHtcclxuICAgICAgICBkaXJlY3Rpb246IHRoaXMuY2F0YWxvZy5zb3J0RGlyZWN0aW9uLFxyXG4gICAgICAgIHZhbHVlQWNjZXNzb3I6IChpdGVtOiBDYXRhbG9nSXRlbSkgPT4gaXRlbS50aXRsZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjYXRhbG9nU2hvd0xlZ2VuZCA9IHRoaXMuY2F0YWxvZyA/IHRoaXMuY2F0YWxvZy5zaG93TGVnZW5kIDogZmFsc2U7XHJcbiAgICB0aGlzLmNhdGFsb2dBbGxvd0xlZ2VuZCA9IGNhdGFsb2dTaG93TGVnZW5kID8gY2F0YWxvZ1Nob3dMZWdlbmQgOiB0aGlzLmNhdGFsb2dBbGxvd0xlZ2VuZDtcclxuXHJcbiAgICB0aGlzLndhdGNoZXIgPSBuZXcgRW50aXR5U3RvcmVXYXRjaGVyKHRoaXMuc3RvcmUsIHRoaXMuY2RSZWYpO1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy53YXRjaGVyLmRlc3Ryb3koKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGlzR3JvdXAoaXRlbTogQ2F0YWxvZ0l0ZW0pOiBib29sZWFuIHtcclxuICAgIHJldHVybiBpdGVtLnR5cGUgPT09IENhdGFsb2dJdGVtVHlwZS5Hcm91cDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGlzTGF5ZXIoaXRlbTogQ2F0YWxvZ0l0ZW0pOiBib29sZWFuIHtcclxuICAgIHJldHVybiBpdGVtLnR5cGUgPT09IENhdGFsb2dJdGVtVHlwZS5MYXllcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gYSBsYXllciBpcyBhZGRlZCBvciByZW1vdmVkLCBhZGQgb3IgcmVtb3ZlIGl0IGZyb20gdGhlIG1hcFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqIEBwYXJhbSBldmVudCBMYXllciBhZGRlZCBldmVudFxyXG4gICAqL1xyXG4gIG9uTGF5ZXJBZGRlZENoYW5nZShldmVudDogeyBhZGRlZDogYm9vbGVhbjsgbGF5ZXI6IENhdGFsb2dJdGVtTGF5ZXIgfSkge1xyXG4gICAgY29uc3QgbGF5ZXIgPSBldmVudC5sYXllcjtcclxuICAgIHRoaXMuc3RvcmUuc3RhdGUudXBkYXRlKGxheWVyLCB7IGFkZGVkOiBldmVudC5hZGRlZCB9LCBmYWxzZSk7XHJcbiAgICBldmVudC5hZGRlZCA/IHRoaXMuYWRkTGF5ZXJUb01hcChsYXllcikgOiB0aGlzLnJlbW92ZUxheWVyRnJvbU1hcChsYXllcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGEgZnJvdXAgaXMgYWRkZWQgb3IgcmVtb3ZlZCwgYWRkIG9yIHJlbW92ZSBpdCBmcm9tIHRoZSBtYXBcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKiBAcGFyYW0gZXZlbnQgR3JvdXAgYWRkZWQgZXZlbnRcclxuICAgKi9cclxuICBvbkdyb3VwQWRkZWRDaGFuZ2UoZXZlbnQ6IHsgYWRkZWQ6IGJvb2xlYW47IGdyb3VwOiBDYXRhbG9nSXRlbUdyb3VwIH0pIHtcclxuICAgIGNvbnN0IGdyb3VwID0gZXZlbnQuZ3JvdXA7XHJcbiAgICB0aGlzLnN0b3JlLnN0YXRlLnVwZGF0ZShncm91cCwgeyBhZGRlZDogZXZlbnQuYWRkZWQgfSwgZmFsc2UpO1xyXG4gICAgZXZlbnQuYWRkZWQgPyB0aGlzLmFkZEdyb3VwVG9NYXAoZ3JvdXApIDogdGhpcy5yZW1vdmVHcm91cEZyb21NYXAoZ3JvdXApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGxheWVyIHRvIG1hcFxyXG4gICAqIEBwYXJhbSBsYXllciBDYXRhbG9nIGxheWVyXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRMYXllclRvTWFwKGxheWVyOiBDYXRhbG9nSXRlbUxheWVyKSB7XHJcbiAgICB0aGlzLmFkZExheWVyc1RvTWFwKFtsYXllcl0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIGxheWVyIGZyb20gbWFwXHJcbiAgICogQHBhcmFtIGxheWVyIENhdGFsb2cgbGF5ZXJcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZUxheWVyRnJvbU1hcChsYXllcjogQ2F0YWxvZ0l0ZW1MYXllcikge1xyXG4gICAgdGhpcy5yZW1vdmVMYXllcnNGcm9tTWFwKFtsYXllcl0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIG11bHRpcGxlIGxheWVycyB0byBtYXBcclxuICAgKiBAcGFyYW0gbGF5ZXJzIENhdGFsb2cgbGF5ZXJzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRMYXllcnNUb01hcChsYXllcnM6IENhdGFsb2dJdGVtTGF5ZXJbXSkge1xyXG4gICAgY29uc3QgbGF5ZXJzJCA9IGxheWVycy5tYXAoKGxheWVyOiBDYXRhbG9nSXRlbUxheWVyKSA9PiB7XHJcbiAgICAgIGlmIChsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMub3B0aW9uc0Zyb21BcGkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucy5vcHRpb25zRnJvbUFwaSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXMubGF5ZXJTZXJ2aWNlLmNyZWF0ZUFzeW5jTGF5ZXIobGF5ZXIub3B0aW9ucyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB6aXAoLi4ubGF5ZXJzJCkuc3Vic2NyaWJlKChvTGF5ZXJzOiBMYXllcltdKSA9PiB7XHJcbiAgICAgIHRoaXMuc3RvcmUuc3RhdGUudXBkYXRlTWFueShsYXllcnMsIHsgYWRkZWQ6IHRydWUgfSk7XHJcbiAgICAgIHRoaXMubWFwLmFkZExheWVycyhvTGF5ZXJzKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIG11bHRpcGxlIGxheWVycyBmcm9tIG1hcFxyXG4gICAqIEBwYXJhbSBsYXllcnMgQ2F0YWxvZyBsYXllcnNcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZUxheWVyc0Zyb21NYXAobGF5ZXJzOiBDYXRhbG9nSXRlbUxheWVyW10pIHtcclxuICAgIGxheWVycy5mb3JFYWNoKChsYXllcjogQ2F0YWxvZ0l0ZW1MYXllcikgPT4ge1xyXG4gICAgICB0aGlzLnN0b3JlLnN0YXRlLnVwZGF0ZShsYXllciwgeyBhZGRlZDogZmFsc2UgfSk7XHJcbiAgICAgIGlmIChsYXllci5vcHRpb25zLmJhc2VMYXllciA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIGNvbnN0IG9MYXllciA9IHRoaXMubWFwLmdldExheWVyQnlJZChsYXllci5vcHRpb25zLmlkKTtcclxuICAgICAgICBpZiAob0xheWVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHRoaXMubWFwLnJlbW92ZUxheWVyKG9MYXllcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IG9MYXllciA9IHRoaXMubWFwLmdldExheWVyQnlJZChsYXllci5pZCk7XHJcbiAgICAgICAgaWYgKG9MYXllciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0aGlzLm1hcC5yZW1vdmVMYXllcihvTGF5ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTb3J0IHRoZSBsYXllcnMgYnkgdGl0bGUuIGFzYyBvciBkZXNjLlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc29ydENhdGFsb2dJdGVtc0J5VGl0bGUoaXRlbXM6IENhdGFsb2dJdGVtW10sIGRpcmVjdGlvbikge1xyXG4gICAgY29uc3QgcmV0dXJuSXRlbSA9IGl0ZW1zLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgY29uc3QgdGl0bGVBID0gYS50aXRsZS5ub3JtYWxpemUoJ05GRCcpLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2csICcnKTtcclxuICAgICAgY29uc3QgdGl0bGVCID0gYi50aXRsZS5ub3JtYWxpemUoJ05GRCcpLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2csICcnKTtcclxuXHJcbiAgICAgIGlmICh0aXRsZUEgPCB0aXRsZUIpIHtcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRpdGxlQSA+IHRpdGxlQikge1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfSk7XHJcbiAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xyXG4gICAgICBjYXNlICdhc2MnOlxyXG4gICAgICAgIHJldHVybiByZXR1cm5JdGVtO1xyXG4gICAgICBjYXNlICdkZXNjJzpcclxuICAgICAgICByZXR1cm4gcmV0dXJuSXRlbS5yZXZlcnNlKCk7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIGl0ZW1zO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGFsbCB0aGUgbGF5ZXJzIG9mIGEgZ3JvdXAgdG8gbWFwXHJcbiAgICogQHBhcmFtIGdyb3VwIENhdGFsb2cgZ3JvdXBcclxuICAgKi9cclxuICBwcml2YXRlIGFkZEdyb3VwVG9NYXAoZ3JvdXA6IENhdGFsb2dJdGVtR3JvdXApIHtcclxuICAgIGxldCBsYXllcnMgPSBncm91cC5pdGVtcy5maWx0ZXIoKGl0ZW06IENhdGFsb2dJdGVtKSA9PiB7XHJcbiAgICAgIGNvbnN0IGFkZGVkID0gdGhpcy5zdG9yZS5zdGF0ZS5nZXQoaXRlbSkuYWRkZWQgfHwgZmFsc2U7XHJcbiAgICAgIHJldHVybiB0aGlzLmlzTGF5ZXIoaXRlbSkgJiYgYWRkZWQgPT09IGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgICBpZiAodGhpcy5jYXRhbG9nICYmIHRoaXMuY2F0YWxvZy5zb3J0RGlyZWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgbGF5ZXJzID0gdGhpcy5zb3J0Q2F0YWxvZ0l0ZW1zQnlUaXRsZShsYXllcnMsIHRoaXMuY2F0YWxvZy5zb3J0RGlyZWN0aW9uKTtcclxuICB9XHJcbiAgICB0aGlzLmFkZExheWVyc1RvTWFwKGxheWVycy5yZXZlcnNlKCkgYXMgQ2F0YWxvZ0l0ZW1MYXllcltdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBhbGwgdGhlIGxheWVycyBvZiBhIGdyb3VwIGZyb20gbWFwXHJcbiAgICogQHBhcmFtIGdyb3VwIENhdGFsb2cgZ3JvdXBcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZUdyb3VwRnJvbU1hcChncm91cDogQ2F0YWxvZ0l0ZW1Hcm91cCkge1xyXG4gICAgY29uc3QgbGF5ZXJzID0gZ3JvdXAuaXRlbXMuZmlsdGVyKChpdGVtOiBDYXRhbG9nSXRlbSkgPT4ge1xyXG4gICAgICBjb25zdCBhZGRlZCA9IHRoaXMuc3RvcmUuc3RhdGUuZ2V0KGl0ZW0pLmFkZGVkIHx8IGZhbHNlO1xyXG4gICAgICByZXR1cm4gdGhpcy5pc0xheWVyKGl0ZW0pICYmIGFkZGVkID09PSB0cnVlO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnJlbW92ZUxheWVyc0Zyb21NYXAobGF5ZXJzIGFzIENhdGFsb2dJdGVtTGF5ZXJbXSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==