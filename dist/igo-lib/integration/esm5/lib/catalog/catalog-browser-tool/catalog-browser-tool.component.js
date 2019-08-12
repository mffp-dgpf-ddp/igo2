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
var CatalogBrowserToolComponent = /** @class */ (function () {
    function CatalogBrowserToolComponent(catalogService, catalogState, mapState) {
        this.catalogService = catalogService;
        this.catalogState = catalogState;
        this.mapState = mapState;
        /**
         * Store that contains the catalog items
         * \@internal
         */
        this.store$ = new BehaviorSubject(undefined);
    }
    Object.defineProperty(CatalogBrowserToolComponent.prototype, "map", {
        /**
         * Map to add layers to
         * @internal
         */
        get: /**
         * Map to add layers to
         * \@internal
         * @return {?}
         */
        function () {
            return this.mapState.map;
        },
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
    CatalogBrowserToolComponent.prototype.ngOnInit = /**
     * \@internal
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var catalogStore = this.catalogState.catalogStore;
        this.catalog$$ = catalogStore.stateView
            .firstBy$((/**
         * @param {?} record
         * @return {?}
         */
        function (record) { return record.state.selected === true; }))
            .subscribe((/**
         * @param {?} record
         * @return {?}
         */
        function (record) {
            if (record && record.entity) {
                /** @type {?} */
                var catalog = record.entity;
                _this.catalog = catalog;
                _this.loadCatalogItems(catalog);
            }
        }));
    };
    /**
     * @internal
     */
    /**
     * \@internal
     * @return {?}
     */
    CatalogBrowserToolComponent.prototype.ngOnDestroy = /**
     * \@internal
     * @return {?}
     */
    function () {
        this.catalog$$.unsubscribe();
    };
    /**
     * Get the selected catalog's items from the CatalogService and
     * load them into the store.
     * @param catalog Selected catalog
     */
    /**
     * Get the selected catalog's items from the CatalogService and
     * load them into the store.
     * @private
     * @param {?} catalog Selected catalog
     * @return {?}
     */
    CatalogBrowserToolComponent.prototype.loadCatalogItems = /**
     * Get the selected catalog's items from the CatalogService and
     * load them into the store.
     * @private
     * @param {?} catalog Selected catalog
     * @return {?}
     */
    function (catalog) {
        var _this = this;
        /** @type {?} */
        var store = this.catalogState.getCatalogItemsStore(catalog);
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
        function (items) {
            store.load(items);
            _this.store$.next(store);
        }));
    };
    CatalogBrowserToolComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-catalog-browser-tool',
                    template: "<igo-catalog-browser\r\n  *ngIf=\"store$ | async as store\"\r\n  [catalog]=\"catalog\"\r\n  [store]=\"store\"\r\n  [map]=\"map\">\r\n</igo-catalog-browser>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    CatalogBrowserToolComponent.ctorParameters = function () { return [
        { type: CatalogService },
        { type: CatalogState },
        { type: MapState }
    ]; };
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
    return CatalogBrowserToolComponent;
}());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1icm93c2VyLXRvb2wuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvaW50ZWdyYXRpb24vIiwic291cmNlcyI6WyJsaWIvY2F0YWxvZy9jYXRhbG9nLWJyb3dzZXItdG9vbC9jYXRhbG9nLWJyb3dzZXItdG9vbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUdULHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUVyRCxPQUFPLEVBQWdCLFdBQVcsRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFeEUsT0FBTyxFQUtMLGNBQWMsRUFDZixNQUFNLFdBQVcsQ0FBQztBQUVuQixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7OztJQXNDOUMscUNBQ1UsY0FBOEIsRUFDOUIsWUFBMEIsRUFDMUIsUUFBa0I7UUFGbEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGFBQVEsR0FBUixRQUFRLENBQVU7Ozs7O1FBbEI1QixXQUFNLEdBQUcsSUFBSSxlQUFlLENBQTZDLFNBQVMsQ0FBQyxDQUFDO0lBbUJqRixDQUFDO0lBUkosc0JBQUksNENBQUc7UUFKUDs7O1dBR0c7Ozs7OztRQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUMzQixDQUFDOzs7T0FBQTtJQVFEOztPQUVHOzs7OztJQUNILDhDQUFROzs7O0lBQVI7UUFBQSxpQkFhQzs7WUFaTyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZO1FBQ25ELElBQUksQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLFNBQVM7YUFDcEMsUUFBUTs7OztRQUNQLFVBQUMsTUFBNkIsSUFBSyxPQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLElBQUksRUFBOUIsQ0FBOEIsRUFDbEU7YUFDQSxTQUFTOzs7O1FBQUMsVUFBQyxNQUE2QjtZQUN2QyxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFOztvQkFDckIsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNO2dCQUM3QixLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztnQkFDdkIsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ2hDO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsaURBQVc7Ozs7SUFBWDtRQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7O0lBQ0ssc0RBQWdCOzs7Ozs7O0lBQXhCLFVBQXlCLE9BQWdCO1FBQXpDLGlCQWVDOztZQWRLLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQztRQUMzRCxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEIsT0FBTztTQUNSO1FBRUQsS0FBSyxHQUFHLElBQUksV0FBVyxDQUFjLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxjQUFjO2FBQ2hCLGdCQUFnQixDQUFDLE9BQU8sQ0FBQzthQUN6QixTQUFTOzs7O1FBQUMsVUFBQyxLQUFvQjtZQUM5QixLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xCLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Z0JBL0VGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQywyS0FBb0Q7b0JBQ3BELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs7OztnQkFsQkMsY0FBYztnQkFJUCxZQUFZO2dCQURaLFFBQVE7Ozs7O0lBZ0JKLDJCQUEyQjtRQVZ2QyxhQUFhLENBQUM7WUFDYixJQUFJLEVBQUUsZ0JBQWdCO1lBQ3RCLEtBQUssRUFBRSwrQkFBK0I7WUFDdEMsSUFBSSxFQUFFLGVBQWU7U0FDdEIsQ0FBQztpREE4QjBCLGNBQWM7WUFDaEIsWUFBWTtZQUNoQixRQUFRO09BMUJqQiwyQkFBMkIsQ0EyRXZDO0lBQUQsa0NBQUM7Q0FBQSxJQUFBO1NBM0VZLDJCQUEyQjs7O0lBRXRDLDhDQUFpQjs7Ozs7O0lBTWpCLDZDQUFvRjs7Ozs7O0lBS3BGLGdEQUFnQzs7Ozs7SUFXOUIscURBQXNDOzs7OztJQUN0QyxtREFBa0M7Ozs7O0lBQ2xDLCtDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBFbnRpdHlSZWNvcmQsIEVudGl0eVN0b3JlLCBUb29sQ29tcG9uZW50IH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7XHJcbiAgSWdvTWFwLFxyXG4gIENhdGFsb2csXHJcbiAgQ2F0YWxvZ0l0ZW0sXHJcbiAgQ2F0YWxvZ0l0ZW1TdGF0ZSxcclxuICBDYXRhbG9nU2VydmljZVxyXG59IGZyb20gJ0BpZ28yL2dlbyc7XHJcblxyXG5pbXBvcnQgeyBNYXBTdGF0ZSB9IGZyb20gJy4uLy4uL21hcC9tYXAuc3RhdGUnO1xyXG5pbXBvcnQgeyBDYXRhbG9nU3RhdGUgfSBmcm9tICcuLi9jYXRhbG9nLnN0YXRlJztcclxuXHJcbi8qKlxyXG4gKiBUb29sIHRvIGJyb3dzZSBhIGNhdGFsb2cncyBncm91cHMgYW5kIGxheWVycyBhbmQgZGlzcGxheSB0aGVtIHRvIGEgbWFwLlxyXG4gKi9cclxuQFRvb2xDb21wb25lbnQoe1xyXG4gIG5hbWU6ICdjYXRhbG9nQnJvd3NlcicsXHJcbiAgdGl0bGU6ICdpZ28uaW50ZWdyYXRpb24udG9vbHMuY2F0YWxvZycsXHJcbiAgaWNvbjogJ3Bob3RvLWJyb3dzZXInXHJcbn0pXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWNhdGFsb2ctYnJvd3Nlci10b29sJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY2F0YWxvZy1icm93c2VyLXRvb2wuY29tcG9uZW50Lmh0bWwnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYXRhbG9nQnJvd3NlclRvb2xDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIGNhdGFsb2c6IENhdGFsb2c7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3JlIHRoYXQgY29udGFpbnMgdGhlIGNhdGFsb2cgaXRlbXNcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBzdG9yZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEVudGl0eVN0b3JlPENhdGFsb2dJdGVtLCBDYXRhbG9nSXRlbVN0YXRlPj4odW5kZWZpbmVkKTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvIHRoZSBzZWxlY3RlZCBjYXRhbG9nXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjYXRhbG9nJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogTWFwIHRvIGFkZCBsYXllcnMgdG9cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgbWFwKCk6IElnb01hcCB7XHJcbiAgICByZXR1cm4gdGhpcy5tYXBTdGF0ZS5tYXA7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY2F0YWxvZ1NlcnZpY2U6IENhdGFsb2dTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjYXRhbG9nU3RhdGU6IENhdGFsb2dTdGF0ZSxcclxuICAgIHByaXZhdGUgbWFwU3RhdGU6IE1hcFN0YXRlXHJcbiAgKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGNvbnN0IGNhdGFsb2dTdG9yZSA9IHRoaXMuY2F0YWxvZ1N0YXRlLmNhdGFsb2dTdG9yZTtcclxuICAgIHRoaXMuY2F0YWxvZyQkID0gY2F0YWxvZ1N0b3JlLnN0YXRlVmlld1xyXG4gICAgICAuZmlyc3RCeSQoXHJcbiAgICAgICAgKHJlY29yZDogRW50aXR5UmVjb3JkPENhdGFsb2c+KSA9PiByZWNvcmQuc3RhdGUuc2VsZWN0ZWQgPT09IHRydWVcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKChyZWNvcmQ6IEVudGl0eVJlY29yZDxDYXRhbG9nPikgPT4ge1xyXG4gICAgICAgIGlmIChyZWNvcmQgJiYgcmVjb3JkLmVudGl0eSkge1xyXG4gICAgICAgICAgY29uc3QgY2F0YWxvZyA9IHJlY29yZC5lbnRpdHk7XHJcbiAgICAgICAgICB0aGlzLmNhdGFsb2cgPSBjYXRhbG9nO1xyXG4gICAgICAgICAgdGhpcy5sb2FkQ2F0YWxvZ0l0ZW1zKGNhdGFsb2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuY2F0YWxvZyQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIHNlbGVjdGVkIGNhdGFsb2cncyBpdGVtcyBmcm9tIHRoZSBDYXRhbG9nU2VydmljZSBhbmRcclxuICAgKiBsb2FkIHRoZW0gaW50byB0aGUgc3RvcmUuXHJcbiAgICogQHBhcmFtIGNhdGFsb2cgU2VsZWN0ZWQgY2F0YWxvZ1xyXG4gICAqL1xyXG4gIHByaXZhdGUgbG9hZENhdGFsb2dJdGVtcyhjYXRhbG9nOiBDYXRhbG9nKSB7XHJcbiAgICBsZXQgc3RvcmUgPSB0aGlzLmNhdGFsb2dTdGF0ZS5nZXRDYXRhbG9nSXRlbXNTdG9yZShjYXRhbG9nKTtcclxuICAgIGlmIChzdG9yZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuc3RvcmUkLm5leHQoc3RvcmUpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcmUgPSBuZXcgRW50aXR5U3RvcmU8Q2F0YWxvZ0l0ZW0+KFtdKTtcclxuICAgIHRoaXMuY2F0YWxvZ1N0YXRlLnNldENhdGFsb2dJdGVtc1N0b3JlKGNhdGFsb2csIHN0b3JlKTtcclxuICAgIHRoaXMuY2F0YWxvZ1NlcnZpY2VcclxuICAgICAgLmxvYWRDYXRhbG9nSXRlbXMoY2F0YWxvZylcclxuICAgICAgLnN1YnNjcmliZSgoaXRlbXM6IENhdGFsb2dJdGVtW10pID0+IHtcclxuICAgICAgICBzdG9yZS5sb2FkKGl0ZW1zKTtcclxuICAgICAgICB0aGlzLnN0b3JlJC5uZXh0KHN0b3JlKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==