/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
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
     * Whether a group can be toggled when it's collapsed
     * @type {?}
     */
    CatalogBrowserToolComponent.prototype.toggleCollapsedGroup;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1icm93c2VyLXRvb2wuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvaW50ZWdyYXRpb24vIiwic291cmNlcyI6WyJsaWIvY2F0YWxvZy9jYXRhbG9nLWJyb3dzZXItdG9vbC9jYXRhbG9nLWJyb3dzZXItdG9vbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFHTCx1QkFBdUIsRUFDeEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGVBQWUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFFckQsT0FBTyxFQUFnQixXQUFXLEVBQUUsYUFBYSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXhFLE9BQU8sRUFLTCxjQUFjLEVBQ2YsTUFBTSxXQUFXLENBQUM7QUFFbkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7OztJQWVuQywyQkFBMkI7OztNQUEzQiwyQkFBMkI7Ozs7OztJQTRCdEMsWUFDVSxjQUE4QixFQUM5QixZQUEwQixFQUMxQixRQUFrQjtRQUZsQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsYUFBUSxHQUFSLFFBQVEsQ0FBVTs7Ozs7UUF2QjVCLFdBQU0sR0FBRyxJQUFJLGVBQWUsQ0FBNkMsU0FBUyxDQUFDLENBQUM7Ozs7UUFVM0UseUJBQW9CLEdBQVksSUFBSSxDQUFDO0lBYzNDLENBQUM7Ozs7OztJQVJKLElBQUksR0FBRztRQUNMLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7SUFDM0IsQ0FBQzs7Ozs7SUFXRCxRQUFROztjQUNBLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVk7UUFDbkQsSUFBSSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsU0FBUzthQUNwQyxRQUFROzs7O1FBQ1AsQ0FBQyxNQUE2QixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQ2xFO2FBQ0EsU0FBUzs7OztRQUFDLENBQUMsTUFBNkIsRUFBRSxFQUFFO1lBQzNDLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7O3NCQUNyQixPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU07Z0JBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2dCQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDaEM7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBS0QsV0FBVztRQUNULElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDL0IsQ0FBQzs7Ozs7Ozs7SUFPTyxnQkFBZ0IsQ0FBQyxPQUFnQjs7WUFDbkMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDO1FBQzNELElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QixPQUFPO1NBQ1I7UUFFRCxLQUFLLEdBQUcsSUFBSSxXQUFXLENBQWMsRUFBRSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLGNBQWM7YUFDaEIsZ0JBQWdCLENBQUMsT0FBTyxDQUFDO2FBQ3pCLFNBQVM7Ozs7UUFBQyxDQUFDLEtBQW9CLEVBQUUsRUFBRTtZQUNsQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQztDQUNGLENBQUE7O1lBckZBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQyxnT0FBb0Q7Z0JBQ3BELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7O1lBbEJDLGNBQWM7WUFJUCxZQUFZO1lBRFosUUFBUTs7O21DQWtDZCxLQUFLOzs7OztBQWxCSywyQkFBMkI7SUFWdkMsYUFBYSxDQUFDO1FBQ2IsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixLQUFLLEVBQUUsK0JBQStCO1FBQ3RDLElBQUksRUFBRSxlQUFlO0tBQ3RCLENBQUM7NkNBbUMwQixjQUFjO1FBQ2hCLFlBQVk7UUFDaEIsUUFBUTtHQS9CakIsMkJBQTJCLENBZ0Z2QztTQWhGWSwyQkFBMkI7OztJQUV0Qyw4Q0FBaUI7Ozs7OztJQU1qQiw2Q0FBb0Y7Ozs7OztJQUtwRixnREFBZ0M7Ozs7O0lBS2hDLDJEQUE4Qzs7Ozs7SUFXNUMscURBQXNDOzs7OztJQUN0QyxtREFBa0M7Ozs7O0lBQ2xDLCtDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBFbnRpdHlSZWNvcmQsIEVudGl0eVN0b3JlLCBUb29sQ29tcG9uZW50IH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7XHJcbiAgSWdvTWFwLFxyXG4gIENhdGFsb2csXHJcbiAgQ2F0YWxvZ0l0ZW0sXHJcbiAgQ2F0YWxvZ0l0ZW1TdGF0ZSxcclxuICBDYXRhbG9nU2VydmljZVxyXG59IGZyb20gJ0BpZ28yL2dlbyc7XHJcblxyXG5pbXBvcnQgeyBNYXBTdGF0ZSB9IGZyb20gJy4uLy4uL21hcC9tYXAuc3RhdGUnO1xyXG5pbXBvcnQgeyBDYXRhbG9nU3RhdGUgfSBmcm9tICcuLi9jYXRhbG9nLnN0YXRlJztcclxuXHJcbi8qKlxyXG4gKiBUb29sIHRvIGJyb3dzZSBhIGNhdGFsb2cncyBncm91cHMgYW5kIGxheWVycyBhbmQgZGlzcGxheSB0aGVtIHRvIGEgbWFwLlxyXG4gKi9cclxuQFRvb2xDb21wb25lbnQoe1xyXG4gIG5hbWU6ICdjYXRhbG9nQnJvd3NlcicsXHJcbiAgdGl0bGU6ICdpZ28uaW50ZWdyYXRpb24udG9vbHMuY2F0YWxvZycsXHJcbiAgaWNvbjogJ3Bob3RvLWJyb3dzZXInXHJcbn0pXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWNhdGFsb2ctYnJvd3Nlci10b29sJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY2F0YWxvZy1icm93c2VyLXRvb2wuY29tcG9uZW50Lmh0bWwnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYXRhbG9nQnJvd3NlclRvb2xDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIGNhdGFsb2c6IENhdGFsb2c7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3JlIHRoYXQgY29udGFpbnMgdGhlIGNhdGFsb2cgaXRlbXNcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBzdG9yZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEVudGl0eVN0b3JlPENhdGFsb2dJdGVtLCBDYXRhbG9nSXRlbVN0YXRlPj4odW5kZWZpbmVkKTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvIHRoZSBzZWxlY3RlZCBjYXRhbG9nXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjYXRhbG9nJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBhIGdyb3VwIGNhbiBiZSB0b2dnbGVkIHdoZW4gaXQncyBjb2xsYXBzZWRcclxuICAgKi9cclxuICBASW5wdXQoKSB0b2dnbGVDb2xsYXBzZWRHcm91cDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hcCB0byBhZGQgbGF5ZXJzIHRvXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAge1xyXG4gICAgcmV0dXJuIHRoaXMubWFwU3RhdGUubWFwO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGNhdGFsb2dTZXJ2aWNlOiBDYXRhbG9nU2VydmljZSxcclxuICAgIHByaXZhdGUgY2F0YWxvZ1N0YXRlOiBDYXRhbG9nU3RhdGUsXHJcbiAgICBwcml2YXRlIG1hcFN0YXRlOiBNYXBTdGF0ZVxyXG4gICkge31cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBjb25zdCBjYXRhbG9nU3RvcmUgPSB0aGlzLmNhdGFsb2dTdGF0ZS5jYXRhbG9nU3RvcmU7XHJcbiAgICB0aGlzLmNhdGFsb2ckJCA9IGNhdGFsb2dTdG9yZS5zdGF0ZVZpZXdcclxuICAgICAgLmZpcnN0QnkkKFxyXG4gICAgICAgIChyZWNvcmQ6IEVudGl0eVJlY29yZDxDYXRhbG9nPikgPT4gcmVjb3JkLnN0YXRlLnNlbGVjdGVkID09PSB0cnVlXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSgocmVjb3JkOiBFbnRpdHlSZWNvcmQ8Q2F0YWxvZz4pID0+IHtcclxuICAgICAgICBpZiAocmVjb3JkICYmIHJlY29yZC5lbnRpdHkpIHtcclxuICAgICAgICAgIGNvbnN0IGNhdGFsb2cgPSByZWNvcmQuZW50aXR5O1xyXG4gICAgICAgICAgdGhpcy5jYXRhbG9nID0gY2F0YWxvZztcclxuICAgICAgICAgIHRoaXMubG9hZENhdGFsb2dJdGVtcyhjYXRhbG9nKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmNhdGFsb2ckJC51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBzZWxlY3RlZCBjYXRhbG9nJ3MgaXRlbXMgZnJvbSB0aGUgQ2F0YWxvZ1NlcnZpY2UgYW5kXHJcbiAgICogbG9hZCB0aGVtIGludG8gdGhlIHN0b3JlLlxyXG4gICAqIEBwYXJhbSBjYXRhbG9nIFNlbGVjdGVkIGNhdGFsb2dcclxuICAgKi9cclxuICBwcml2YXRlIGxvYWRDYXRhbG9nSXRlbXMoY2F0YWxvZzogQ2F0YWxvZykge1xyXG4gICAgbGV0IHN0b3JlID0gdGhpcy5jYXRhbG9nU3RhdGUuZ2V0Q2F0YWxvZ0l0ZW1zU3RvcmUoY2F0YWxvZyk7XHJcbiAgICBpZiAoc3RvcmUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnN0b3JlJC5uZXh0KHN0b3JlKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHN0b3JlID0gbmV3IEVudGl0eVN0b3JlPENhdGFsb2dJdGVtPihbXSk7XHJcbiAgICB0aGlzLmNhdGFsb2dTdGF0ZS5zZXRDYXRhbG9nSXRlbXNTdG9yZShjYXRhbG9nLCBzdG9yZSk7XHJcbiAgICB0aGlzLmNhdGFsb2dTZXJ2aWNlXHJcbiAgICAgIC5sb2FkQ2F0YWxvZ0l0ZW1zKGNhdGFsb2cpXHJcbiAgICAgIC5zdWJzY3JpYmUoKGl0ZW1zOiBDYXRhbG9nSXRlbVtdKSA9PiB7XHJcbiAgICAgICAgc3RvcmUubG9hZChpdGVtcyk7XHJcbiAgICAgICAgdGhpcy5zdG9yZSQubmV4dChzdG9yZSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=