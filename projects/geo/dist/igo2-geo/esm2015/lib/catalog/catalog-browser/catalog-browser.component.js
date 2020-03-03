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
        this.catalogAllowLegend = this.catalog.showLegend ? this.catalog.showLegend : this.catalogAllowLegend;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1icm93c2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9jYXRhbG9nL2NhdGFsb2ctYnJvd3Nlci9jYXRhbG9nLWJyb3dzZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBR2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxHQUFHLEVBQW1CLE1BQU0sTUFBTSxDQUFDO0FBRTVDLE9BQU8sRUFBRSxXQUFXLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFL0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFbkMsT0FBTyxFQUNMLE9BQU8sRUFLUCxlQUFlLEVBQ2hCLE1BQU0sV0FBVyxDQUFDOzs7O0FBVW5CLE1BQU0sT0FBTyx1QkFBdUI7Ozs7O0lBZ0NsQyxZQUNVLFlBQTBCLEVBQzFCLEtBQXdCO1FBRHhCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBeEJ6Qix1QkFBa0IsR0FBRyxLQUFLLENBQUM7Ozs7UUFvQjNCLHlCQUFvQixHQUFZLElBQUksQ0FBQztJQUszQyxDQUFDOzs7OztJQTNCSixJQUFJLFdBQVcsS0FBOEIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOzs7OztJQWdDMUYsUUFBUTs7Y0FDQSxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRzs7OztRQUFDLENBQUMsS0FBWSxFQUFFLEVBQUU7WUFDeEQsT0FBTztnQkFDTCxFQUFFLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFN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dCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IHppcCwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBFbnRpdHlTdG9yZSwgRW50aXR5U3RvcmVXYXRjaGVyIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2xheWVyJztcclxuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5cclxuaW1wb3J0IHtcclxuICBDYXRhbG9nLFxyXG4gIENhdGFsb2dJdGVtLFxyXG4gIENhdGFsb2dJdGVtTGF5ZXIsXHJcbiAgQ2F0YWxvZ0l0ZW1Hcm91cCxcclxuICBDYXRhbG9nSXRlbVN0YXRlLFxyXG4gIENhdGFsb2dJdGVtVHlwZVxyXG59IGZyb20gJy4uL3NoYXJlZCc7XHJcblxyXG4vKipcclxuICogQ29tcG9uZW50IHRvIGJyb3dzZSBhIGNhdGFsb2cncyBncm91cHMgYW5kIGxheWVycyBhbmQgZGlzcGxheSB0aGVtIG9uIGEgbWFwLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tY2F0YWxvZy1icm93c2VyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY2F0YWxvZy1icm93c2VyLmNvbXBvbmVudC5odG1sJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2F0YWxvZ0Jyb3dzZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgLyoqXHJcbiAgICogQ2F0YWxvZyBpdGVtcyBzdG9yZSB3YXRjaGVyXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB3YXRjaGVyOiBFbnRpdHlTdG9yZVdhdGNoZXI8Q2F0YWxvZ0l0ZW0+O1xyXG5cclxuIC8vIHByaXZhdGUgcmVzb2x1dGlvbiQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGdldCByZXNvbHV0aW9uJCgpOiBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPiB7IHJldHVybiB0aGlzLm1hcC52aWV3Q29udHJvbGxlci5yZXNvbHV0aW9uJDsgfVxyXG5cclxuICBASW5wdXQoKSBjYXRhbG9nQWxsb3dMZWdlbmQgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2F0YWxvZ1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNhdGFsb2c6IENhdGFsb2c7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3JlIGhvbGRpbmcgdGhlIGNhdGFsb2cncyBpdGVtc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0b3JlOiBFbnRpdHlTdG9yZTxDYXRhbG9nSXRlbSwgQ2F0YWxvZ0l0ZW1TdGF0ZT47XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hcCB0byBhZGQgdGhlIGNhdGFsb2cgaXRlbXMgdG9cclxuICAgKi9cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBhIGdyb3VwIGNhbiBiZSB0b2dnbGVkIHdoZW4gaXQncyBjb2xsYXBzZWRcclxuICAgKi9cclxuICBASW5wdXQoKSB0b2dnbGVDb2xsYXBzZWRHcm91cDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBsYXllclNlcnZpY2U6IExheWVyU2VydmljZSxcclxuICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGNvbnN0IGN1cnJlbnRJdGVtcyA9IHRoaXMubWFwLmxheWVycy5tYXAoKGxheWVyOiBMYXllcikgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGlkOiBsYXllci5vcHRpb25zLnNvdXJjZS5pZCxcclxuICAgICAgICB0aXRsZTogbGF5ZXIudGl0bGUsXHJcbiAgICAgICAgdHlwZTogQ2F0YWxvZ0l0ZW1UeXBlLkxheWVyXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc3RvcmUuc3RhdGUudXBkYXRlTWFueShjdXJyZW50SXRlbXMsIHsgYWRkZWQ6IHRydWUgfSwgdHJ1ZSk7XHJcbiAgICBpZiAodGhpcy5jYXRhbG9nICYmIHRoaXMuY2F0YWxvZy5zb3J0RGlyZWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5zdG9yZS52aWV3LnNvcnQoe1xyXG4gICAgICAgIGRpcmVjdGlvbjogdGhpcy5jYXRhbG9nLnNvcnREaXJlY3Rpb24sXHJcbiAgICAgICAgdmFsdWVBY2Nlc3NvcjogKGl0ZW06IENhdGFsb2dJdGVtKSA9PiBpdGVtLnRpdGxlXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2F0YWxvZ0FsbG93TGVnZW5kID0gdGhpcy5jYXRhbG9nLnNob3dMZWdlbmQgPyB0aGlzLmNhdGFsb2cuc2hvd0xlZ2VuZCA6IHRoaXMuY2F0YWxvZ0FsbG93TGVnZW5kO1xyXG5cclxuICAgIHRoaXMud2F0Y2hlciA9IG5ldyBFbnRpdHlTdG9yZVdhdGNoZXIodGhpcy5zdG9yZSwgdGhpcy5jZFJlZik7XHJcblxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLndhdGNoZXIuZGVzdHJveSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgaXNHcm91cChpdGVtOiBDYXRhbG9nSXRlbSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGl0ZW0udHlwZSA9PT0gQ2F0YWxvZ0l0ZW1UeXBlLkdyb3VwO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgaXNMYXllcihpdGVtOiBDYXRhbG9nSXRlbSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGl0ZW0udHlwZSA9PT0gQ2F0YWxvZ0l0ZW1UeXBlLkxheWVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBhIGxheWVyIGlzIGFkZGVkIG9yIHJlbW92ZWQsIGFkZCBvciByZW1vdmUgaXQgZnJvbSB0aGUgbWFwXHJcbiAgICogQGludGVybmFsXHJcbiAgICogQHBhcmFtIGV2ZW50IExheWVyIGFkZGVkIGV2ZW50XHJcbiAgICovXHJcbiAgb25MYXllckFkZGVkQ2hhbmdlKGV2ZW50OiB7IGFkZGVkOiBib29sZWFuOyBsYXllcjogQ2F0YWxvZ0l0ZW1MYXllciB9KSB7XHJcbiAgICBjb25zdCBsYXllciA9IGV2ZW50LmxheWVyO1xyXG4gICAgdGhpcy5zdG9yZS5zdGF0ZS51cGRhdGUobGF5ZXIsIHsgYWRkZWQ6IGV2ZW50LmFkZGVkIH0sIGZhbHNlKTtcclxuICAgIGV2ZW50LmFkZGVkID8gdGhpcy5hZGRMYXllclRvTWFwKGxheWVyKSA6IHRoaXMucmVtb3ZlTGF5ZXJGcm9tTWFwKGxheWVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gYSBmcm91cCBpcyBhZGRlZCBvciByZW1vdmVkLCBhZGQgb3IgcmVtb3ZlIGl0IGZyb20gdGhlIG1hcFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqIEBwYXJhbSBldmVudCBHcm91cCBhZGRlZCBldmVudFxyXG4gICAqL1xyXG4gIG9uR3JvdXBBZGRlZENoYW5nZShldmVudDogeyBhZGRlZDogYm9vbGVhbjsgZ3JvdXA6IENhdGFsb2dJdGVtR3JvdXAgfSkge1xyXG4gICAgY29uc3QgZ3JvdXAgPSBldmVudC5ncm91cDtcclxuICAgIHRoaXMuc3RvcmUuc3RhdGUudXBkYXRlKGdyb3VwLCB7IGFkZGVkOiBldmVudC5hZGRlZCB9LCBmYWxzZSk7XHJcbiAgICBldmVudC5hZGRlZCA/IHRoaXMuYWRkR3JvdXBUb01hcChncm91cCkgOiB0aGlzLnJlbW92ZUdyb3VwRnJvbU1hcChncm91cCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgbGF5ZXIgdG8gbWFwXHJcbiAgICogQHBhcmFtIGxheWVyIENhdGFsb2cgbGF5ZXJcclxuICAgKi9cclxuICBwcml2YXRlIGFkZExheWVyVG9NYXAobGF5ZXI6IENhdGFsb2dJdGVtTGF5ZXIpIHtcclxuICAgIHRoaXMuYWRkTGF5ZXJzVG9NYXAoW2xheWVyXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgbGF5ZXIgZnJvbSBtYXBcclxuICAgKiBAcGFyYW0gbGF5ZXIgQ2F0YWxvZyBsYXllclxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlTGF5ZXJGcm9tTWFwKGxheWVyOiBDYXRhbG9nSXRlbUxheWVyKSB7XHJcbiAgICB0aGlzLnJlbW92ZUxheWVyc0Zyb21NYXAoW2xheWVyXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgbXVsdGlwbGUgbGF5ZXJzIHRvIG1hcFxyXG4gICAqIEBwYXJhbSBsYXllcnMgQ2F0YWxvZyBsYXllcnNcclxuICAgKi9cclxuICBwcml2YXRlIGFkZExheWVyc1RvTWFwKGxheWVyczogQ2F0YWxvZ0l0ZW1MYXllcltdKSB7XHJcbiAgICBjb25zdCBsYXllcnMkID0gbGF5ZXJzLm1hcCgobGF5ZXI6IENhdGFsb2dJdGVtTGF5ZXIpID0+IHtcclxuICAgICAgcmV0dXJuIHRoaXMubGF5ZXJTZXJ2aWNlLmNyZWF0ZUFzeW5jTGF5ZXIobGF5ZXIub3B0aW9ucyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB6aXAoLi4ubGF5ZXJzJCkuc3Vic2NyaWJlKChvTGF5ZXJzOiBMYXllcltdKSA9PiB7XHJcbiAgICAgIHRoaXMuc3RvcmUuc3RhdGUudXBkYXRlTWFueShsYXllcnMsIHsgYWRkZWQ6IHRydWUgfSk7XHJcbiAgICAgIHRoaXMubWFwLmFkZExheWVycyhvTGF5ZXJzKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIG11bHRpcGxlIGxheWVycyBmcm9tIG1hcFxyXG4gICAqIEBwYXJhbSBsYXllcnMgQ2F0YWxvZyBsYXllcnNcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZUxheWVyc0Zyb21NYXAobGF5ZXJzOiBDYXRhbG9nSXRlbUxheWVyW10pIHtcclxuICAgIGxheWVycy5mb3JFYWNoKChsYXllcjogQ2F0YWxvZ0l0ZW1MYXllcikgPT4ge1xyXG4gICAgICB0aGlzLnN0b3JlLnN0YXRlLnVwZGF0ZShsYXllciwgeyBhZGRlZDogZmFsc2UgfSk7XHJcbiAgICAgIGlmIChsYXllci5vcHRpb25zLmJhc2VMYXllciA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIGNvbnN0IG9MYXllciA9IHRoaXMubWFwLmdldExheWVyQnlJZChsYXllci5vcHRpb25zLmlkKTtcclxuICAgICAgICBpZiAob0xheWVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHRoaXMubWFwLnJlbW92ZUxheWVyKG9MYXllcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IG9MYXllciA9IHRoaXMubWFwLmdldExheWVyQnlJZChsYXllci5pZCk7XHJcbiAgICAgICAgaWYgKG9MYXllciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0aGlzLm1hcC5yZW1vdmVMYXllcihvTGF5ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTb3J0IHRoZSBsYXllcnMgYnkgdGl0bGUuIGFzYyBvciBkZXNjLlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc29ydENhdGFsb2dJdGVtc0J5VGl0bGUoaXRlbXM6IENhdGFsb2dJdGVtW10sIGRpcmVjdGlvbikge1xyXG4gICAgY29uc3QgcmV0dXJuSXRlbSA9IGl0ZW1zLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgY29uc3QgdGl0bGVBID0gYS50aXRsZS5ub3JtYWxpemUoJ05GRCcpLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2csICcnKTtcclxuICAgICAgY29uc3QgdGl0bGVCID0gYi50aXRsZS5ub3JtYWxpemUoJ05GRCcpLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2csICcnKTtcclxuXHJcbiAgICAgIGlmICh0aXRsZUEgPCB0aXRsZUIpIHtcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRpdGxlQSA+IHRpdGxlQikge1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfSk7XHJcbiAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xyXG4gICAgICBjYXNlICdhc2MnOlxyXG4gICAgICAgIHJldHVybiByZXR1cm5JdGVtO1xyXG4gICAgICBjYXNlICdkZXNjJzpcclxuICAgICAgICByZXR1cm4gcmV0dXJuSXRlbS5yZXZlcnNlKCk7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIGl0ZW1zO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGFsbCB0aGUgbGF5ZXJzIG9mIGEgZ3JvdXAgdG8gbWFwXHJcbiAgICogQHBhcmFtIGdyb3VwIENhdGFsb2cgZ3JvdXBcclxuICAgKi9cclxuICBwcml2YXRlIGFkZEdyb3VwVG9NYXAoZ3JvdXA6IENhdGFsb2dJdGVtR3JvdXApIHtcclxuICAgIGxldCBsYXllcnMgPSBncm91cC5pdGVtcy5maWx0ZXIoKGl0ZW06IENhdGFsb2dJdGVtKSA9PiB7XHJcbiAgICAgIGNvbnN0IGFkZGVkID0gdGhpcy5zdG9yZS5zdGF0ZS5nZXQoaXRlbSkuYWRkZWQgfHwgZmFsc2U7XHJcbiAgICAgIHJldHVybiB0aGlzLmlzTGF5ZXIoaXRlbSkgJiYgYWRkZWQgPT09IGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgICBpZiAodGhpcy5jYXRhbG9nICYmIHRoaXMuY2F0YWxvZy5zb3J0RGlyZWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgbGF5ZXJzID0gdGhpcy5zb3J0Q2F0YWxvZ0l0ZW1zQnlUaXRsZShsYXllcnMsIHRoaXMuY2F0YWxvZy5zb3J0RGlyZWN0aW9uKTtcclxuICB9XHJcbiAgICB0aGlzLmFkZExheWVyc1RvTWFwKGxheWVycy5yZXZlcnNlKCkgYXMgQ2F0YWxvZ0l0ZW1MYXllcltdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBhbGwgdGhlIGxheWVycyBvZiBhIGdyb3VwIGZyb20gbWFwXHJcbiAgICogQHBhcmFtIGdyb3VwIENhdGFsb2cgZ3JvdXBcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZUdyb3VwRnJvbU1hcChncm91cDogQ2F0YWxvZ0l0ZW1Hcm91cCkge1xyXG4gICAgY29uc3QgbGF5ZXJzID0gZ3JvdXAuaXRlbXMuZmlsdGVyKChpdGVtOiBDYXRhbG9nSXRlbSkgPT4ge1xyXG4gICAgICBjb25zdCBhZGRlZCA9IHRoaXMuc3RvcmUuc3RhdGUuZ2V0KGl0ZW0pLmFkZGVkIHx8IGZhbHNlO1xyXG4gICAgICByZXR1cm4gdGhpcy5pc0xheWVyKGl0ZW0pICYmIGFkZGVkID09PSB0cnVlO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnJlbW92ZUxheWVyc0Zyb21NYXAobGF5ZXJzIGFzIENhdGFsb2dJdGVtTGF5ZXJbXSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==