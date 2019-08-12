/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EntityStore, ToolComponent } from '@igo2/common';
import { CatalogService } from '@igo2/geo';
import { MapState } from '../../map/map.state';
import { CatalogState } from '../catalog.state';
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
                template: "<igo-catalog-browser\r\n  *ngIf=\"store$ | async as store\"\r\n  [catalog]=\"catalog\"\r\n  [store]=\"store\"\r\n  [map]=\"map\">\r\n</igo-catalog-browser>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
CatalogBrowserToolComponent.ctorParameters = () => [
    { type: CatalogService },
    { type: CatalogState },
    { type: MapState }
];
/**
 * Tool to browse a catalog's groups and layers and display them to a map.
 */
CatalogBrowserToolComponent = tslib_1.__decorate([
    ToolComponent({
        name: 'catalogBrowser',
        title: 'igo.integration.tools.catalog',
        icon: 'photo-browser'
    }),
    tslib_1.__metadata("design:paramtypes", [CatalogService,
        CatalogState,
        MapState])
], CatalogBrowserToolComponent);
export { CatalogBrowserToolComponent };
if (false) {
    /** @type {?} */
    CatalogBrowserToolComponent.prototype.catalog;
    /**
     * Store that contains the catalog items
     * \@internal
     * @type {?}
     */
    CatalogBrowserToolComponent.prototype.store$;
    /**
     * Subscription to the selected catalog
     * @type {?}
     * @private
     */
    CatalogBrowserToolComponent.prototype.catalog$$;
    /**
     * @type {?}
     * @private
     */
    CatalogBrowserToolComponent.prototype.catalogService;
    /**
     * @type {?}
     * @private
     */
    CatalogBrowserToolComponent.prototype.catalogState;
    /**
     * @type {?}
     * @private
     */
    CatalogBrowserToolComponent.prototype.mapState;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1icm93c2VyLXRvb2wuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvaW50ZWdyYXRpb24vIiwic291cmNlcyI6WyJsaWIvY2F0YWxvZy9jYXRhbG9nLWJyb3dzZXItdG9vbC9jYXRhbG9nLWJyb3dzZXItdG9vbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUdULHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUVyRCxPQUFPLEVBQWdCLFdBQVcsRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFeEUsT0FBTyxFQUtMLGNBQWMsRUFDZixNQUFNLFdBQVcsQ0FBQztBQUVuQixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7O0lBZW5DLDJCQUEyQjs7O01BQTNCLDJCQUEyQjs7Ozs7O0lBdUJ0QyxZQUNVLGNBQThCLEVBQzlCLFlBQTBCLEVBQzFCLFFBQWtCO1FBRmxCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixhQUFRLEdBQVIsUUFBUSxDQUFVOzs7OztRQWxCNUIsV0FBTSxHQUFHLElBQUksZUFBZSxDQUE2QyxTQUFTLENBQUMsQ0FBQztJQW1CakYsQ0FBQzs7Ozs7O0lBUkosSUFBSSxHQUFHO1FBQ0wsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztJQUMzQixDQUFDOzs7OztJQVdELFFBQVE7O2NBQ0EsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWTtRQUNuRCxJQUFJLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxTQUFTO2FBQ3BDLFFBQVE7Ozs7UUFDUCxDQUFDLE1BQTZCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLElBQUksRUFDbEU7YUFDQSxTQUFTOzs7O1FBQUMsQ0FBQyxNQUE2QixFQUFFLEVBQUU7WUFDM0MsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTs7c0JBQ3JCLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTTtnQkFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNoQztRQUNILENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFLRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMvQixDQUFDOzs7Ozs7OztJQU9PLGdCQUFnQixDQUFDLE9BQWdCOztZQUNuQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUM7UUFDM0QsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hCLE9BQU87U0FDUjtRQUVELEtBQUssR0FBRyxJQUFJLFdBQVcsQ0FBYyxFQUFFLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsY0FBYzthQUNoQixnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7YUFDekIsU0FBUzs7OztRQUFDLENBQUMsS0FBb0IsRUFBRSxFQUFFO1lBQ2xDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0YsQ0FBQTs7WUFoRkEsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLDJLQUFvRDtnQkFDcEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7Ozs7WUFsQkMsY0FBYztZQUlQLFlBQVk7WUFEWixRQUFROzs7OztBQWdCSiwyQkFBMkI7SUFWdkMsYUFBYSxDQUFDO1FBQ2IsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixLQUFLLEVBQUUsK0JBQStCO1FBQ3RDLElBQUksRUFBRSxlQUFlO0tBQ3RCLENBQUM7NkNBOEIwQixjQUFjO1FBQ2hCLFlBQVk7UUFDaEIsUUFBUTtHQTFCakIsMkJBQTJCLENBMkV2QztTQTNFWSwyQkFBMkI7OztJQUV0Qyw4Q0FBaUI7Ozs7OztJQU1qQiw2Q0FBb0Y7Ozs7OztJQUtwRixnREFBZ0M7Ozs7O0lBVzlCLHFEQUFzQzs7Ozs7SUFDdEMsbURBQWtDOzs7OztJQUNsQywrQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgRW50aXR5UmVjb3JkLCBFbnRpdHlTdG9yZSwgVG9vbENvbXBvbmVudCB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQge1xyXG4gIElnb01hcCxcclxuICBDYXRhbG9nLFxyXG4gIENhdGFsb2dJdGVtLFxyXG4gIENhdGFsb2dJdGVtU3RhdGUsXHJcbiAgQ2F0YWxvZ1NlcnZpY2VcclxufSBmcm9tICdAaWdvMi9nZW8nO1xyXG5cclxuaW1wb3J0IHsgTWFwU3RhdGUgfSBmcm9tICcuLi8uLi9tYXAvbWFwLnN0YXRlJztcclxuaW1wb3J0IHsgQ2F0YWxvZ1N0YXRlIH0gZnJvbSAnLi4vY2F0YWxvZy5zdGF0ZSc7XHJcblxyXG4vKipcclxuICogVG9vbCB0byBicm93c2UgYSBjYXRhbG9nJ3MgZ3JvdXBzIGFuZCBsYXllcnMgYW5kIGRpc3BsYXkgdGhlbSB0byBhIG1hcC5cclxuICovXHJcbkBUb29sQ29tcG9uZW50KHtcclxuICBuYW1lOiAnY2F0YWxvZ0Jyb3dzZXInLFxyXG4gIHRpdGxlOiAnaWdvLmludGVncmF0aW9uLnRvb2xzLmNhdGFsb2cnLFxyXG4gIGljb246ICdwaG90by1icm93c2VyJ1xyXG59KVxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1jYXRhbG9nLWJyb3dzZXItdG9vbCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2NhdGFsb2ctYnJvd3Nlci10b29sLmNvbXBvbmVudC5odG1sJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2F0YWxvZ0Jyb3dzZXJUb29sQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICBjYXRhbG9nOiBDYXRhbG9nO1xyXG5cclxuICAvKipcclxuICAgKiBTdG9yZSB0aGF0IGNvbnRhaW5zIHRoZSBjYXRhbG9nIGl0ZW1zXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgc3RvcmUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxFbnRpdHlTdG9yZTxDYXRhbG9nSXRlbSwgQ2F0YWxvZ0l0ZW1TdGF0ZT4+KHVuZGVmaW5lZCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgc2VsZWN0ZWQgY2F0YWxvZ1xyXG4gICAqL1xyXG4gIHByaXZhdGUgY2F0YWxvZyQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hcCB0byBhZGQgbGF5ZXJzIHRvXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAge1xyXG4gICAgcmV0dXJuIHRoaXMubWFwU3RhdGUubWFwO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGNhdGFsb2dTZXJ2aWNlOiBDYXRhbG9nU2VydmljZSxcclxuICAgIHByaXZhdGUgY2F0YWxvZ1N0YXRlOiBDYXRhbG9nU3RhdGUsXHJcbiAgICBwcml2YXRlIG1hcFN0YXRlOiBNYXBTdGF0ZVxyXG4gICkge31cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBjb25zdCBjYXRhbG9nU3RvcmUgPSB0aGlzLmNhdGFsb2dTdGF0ZS5jYXRhbG9nU3RvcmU7XHJcbiAgICB0aGlzLmNhdGFsb2ckJCA9IGNhdGFsb2dTdG9yZS5zdGF0ZVZpZXdcclxuICAgICAgLmZpcnN0QnkkKFxyXG4gICAgICAgIChyZWNvcmQ6IEVudGl0eVJlY29yZDxDYXRhbG9nPikgPT4gcmVjb3JkLnN0YXRlLnNlbGVjdGVkID09PSB0cnVlXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSgocmVjb3JkOiBFbnRpdHlSZWNvcmQ8Q2F0YWxvZz4pID0+IHtcclxuICAgICAgICBpZiAocmVjb3JkICYmIHJlY29yZC5lbnRpdHkpIHtcclxuICAgICAgICAgIGNvbnN0IGNhdGFsb2cgPSByZWNvcmQuZW50aXR5O1xyXG4gICAgICAgICAgdGhpcy5jYXRhbG9nID0gY2F0YWxvZztcclxuICAgICAgICAgIHRoaXMubG9hZENhdGFsb2dJdGVtcyhjYXRhbG9nKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmNhdGFsb2ckJC51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBzZWxlY3RlZCBjYXRhbG9nJ3MgaXRlbXMgZnJvbSB0aGUgQ2F0YWxvZ1NlcnZpY2UgYW5kXHJcbiAgICogbG9hZCB0aGVtIGludG8gdGhlIHN0b3JlLlxyXG4gICAqIEBwYXJhbSBjYXRhbG9nIFNlbGVjdGVkIGNhdGFsb2dcclxuICAgKi9cclxuICBwcml2YXRlIGxvYWRDYXRhbG9nSXRlbXMoY2F0YWxvZzogQ2F0YWxvZykge1xyXG4gICAgbGV0IHN0b3JlID0gdGhpcy5jYXRhbG9nU3RhdGUuZ2V0Q2F0YWxvZ0l0ZW1zU3RvcmUoY2F0YWxvZyk7XHJcbiAgICBpZiAoc3RvcmUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnN0b3JlJC5uZXh0KHN0b3JlKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHN0b3JlID0gbmV3IEVudGl0eVN0b3JlPENhdGFsb2dJdGVtPihbXSk7XHJcbiAgICB0aGlzLmNhdGFsb2dTdGF0ZS5zZXRDYXRhbG9nSXRlbXNTdG9yZShjYXRhbG9nLCBzdG9yZSk7XHJcbiAgICB0aGlzLmNhdGFsb2dTZXJ2aWNlXHJcbiAgICAgIC5sb2FkQ2F0YWxvZ0l0ZW1zKGNhdGFsb2cpXHJcbiAgICAgIC5zdWJzY3JpYmUoKGl0ZW1zOiBDYXRhbG9nSXRlbVtdKSA9PiB7XHJcbiAgICAgICAgc3RvcmUubG9hZChpdGVtcyk7XHJcbiAgICAgICAgdGhpcy5zdG9yZSQubmV4dChzdG9yZSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=