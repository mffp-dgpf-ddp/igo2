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
        /**
         * Whether a group can be toggled when it's collapsed
         */
        this.toggleCollapsedGroup = true;
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
                    template: "<igo-catalog-browser\r\n  *ngIf=\"store$ | async as store\"\r\n  [catalog]=\"catalog\"\r\n  [store]=\"store\"\r\n  [map]=\"map\"\r\n  [toggleCollapsedGroup]=\"toggleCollapsedGroup\">\r\n</igo-catalog-browser>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    CatalogBrowserToolComponent.ctorParameters = function () { return [
        { type: CatalogService },
        { type: CatalogState },
        { type: MapState }
    ]; };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1icm93c2VyLXRvb2wuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvaW50ZWdyYXRpb24vIiwic291cmNlcyI6WyJsaWIvY2F0YWxvZy9jYXRhbG9nLWJyb3dzZXItdG9vbC9jYXRhbG9nLWJyb3dzZXItdG9vbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFHTCx1QkFBdUIsRUFDeEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGVBQWUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFFckQsT0FBTyxFQUFnQixXQUFXLEVBQUUsYUFBYSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXhFLE9BQU8sRUFLTCxjQUFjLEVBQ2YsTUFBTSxXQUFXLENBQUM7QUFFbkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7SUEyQzlDLHFDQUNVLGNBQThCLEVBQzlCLFlBQTBCLEVBQzFCLFFBQWtCO1FBRmxCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixhQUFRLEdBQVIsUUFBUSxDQUFVOzs7OztRQXZCNUIsV0FBTSxHQUFHLElBQUksZUFBZSxDQUE2QyxTQUFTLENBQUMsQ0FBQzs7OztRQVUzRSx5QkFBb0IsR0FBWSxJQUFJLENBQUM7SUFjM0MsQ0FBQztJQVJKLHNCQUFJLDRDQUFHO1FBSlA7OztXQUdHOzs7Ozs7UUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7SUFRRDs7T0FFRzs7Ozs7SUFDSCw4Q0FBUTs7OztJQUFSO1FBQUEsaUJBYUM7O1lBWk8sWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWTtRQUNuRCxJQUFJLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxTQUFTO2FBQ3BDLFFBQVE7Ozs7UUFDUCxVQUFDLE1BQTZCLElBQUssT0FBQSxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQTlCLENBQThCLEVBQ2xFO2FBQ0EsU0FBUzs7OztRQUFDLFVBQUMsTUFBNkI7WUFDdkMsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTs7b0JBQ3JCLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTTtnQkFDN0IsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7Z0JBQ3ZCLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNoQztRQUNILENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNILGlEQUFXOzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7OztJQUNLLHNEQUFnQjs7Ozs7OztJQUF4QixVQUF5QixPQUFnQjtRQUF6QyxpQkFlQzs7WUFkSyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUM7UUFDM0QsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hCLE9BQU87U0FDUjtRQUVELEtBQUssR0FBRyxJQUFJLFdBQVcsQ0FBYyxFQUFFLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsY0FBYzthQUNoQixnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7YUFDekIsU0FBUzs7OztRQUFDLFVBQUMsS0FBb0I7WUFDOUIsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsQixLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7O2dCQXBGRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtvQkFDcEMsZ09BQW9EO29CQUNwRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7Ozs7Z0JBbEJDLGNBQWM7Z0JBSVAsWUFBWTtnQkFEWixRQUFROzs7dUNBa0NkLEtBQUs7Ozs7O0lBbEJLLDJCQUEyQjtRQVZ2QyxhQUFhLENBQUM7WUFDYixJQUFJLEVBQUUsZ0JBQWdCO1lBQ3RCLEtBQUssRUFBRSwrQkFBK0I7WUFDdEMsSUFBSSxFQUFFLGVBQWU7U0FDdEIsQ0FBQztpREFtQzBCLGNBQWM7WUFDaEIsWUFBWTtZQUNoQixRQUFRO09BL0JqQiwyQkFBMkIsQ0FnRnZDO0lBQUQsa0NBQUM7Q0FBQSxJQUFBO1NBaEZZLDJCQUEyQjs7O0lBRXRDLDhDQUFpQjs7Ozs7O0lBTWpCLDZDQUFvRjs7Ozs7O0lBS3BGLGdEQUFnQzs7Ozs7SUFLaEMsMkRBQThDOzs7OztJQVc1QyxxREFBc0M7Ozs7O0lBQ3RDLG1EQUFrQzs7Ozs7SUFDbEMsK0NBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEVudGl0eVJlY29yZCwgRW50aXR5U3RvcmUsIFRvb2xDb21wb25lbnQgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHtcclxuICBJZ29NYXAsXHJcbiAgQ2F0YWxvZyxcclxuICBDYXRhbG9nSXRlbSxcclxuICBDYXRhbG9nSXRlbVN0YXRlLFxyXG4gIENhdGFsb2dTZXJ2aWNlXHJcbn0gZnJvbSAnQGlnbzIvZ2VvJztcclxuXHJcbmltcG9ydCB7IE1hcFN0YXRlIH0gZnJvbSAnLi4vLi4vbWFwL21hcC5zdGF0ZSc7XHJcbmltcG9ydCB7IENhdGFsb2dTdGF0ZSB9IGZyb20gJy4uL2NhdGFsb2cuc3RhdGUnO1xyXG5cclxuLyoqXHJcbiAqIFRvb2wgdG8gYnJvd3NlIGEgY2F0YWxvZydzIGdyb3VwcyBhbmQgbGF5ZXJzIGFuZCBkaXNwbGF5IHRoZW0gdG8gYSBtYXAuXHJcbiAqL1xyXG5AVG9vbENvbXBvbmVudCh7XHJcbiAgbmFtZTogJ2NhdGFsb2dCcm93c2VyJyxcclxuICB0aXRsZTogJ2lnby5pbnRlZ3JhdGlvbi50b29scy5jYXRhbG9nJyxcclxuICBpY29uOiAncGhvdG8tYnJvd3NlcidcclxufSlcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tY2F0YWxvZy1icm93c2VyLXRvb2wnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXRhbG9nLWJyb3dzZXItdG9vbC5jb21wb25lbnQuaHRtbCcsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIENhdGFsb2dCcm93c2VyVG9vbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgY2F0YWxvZzogQ2F0YWxvZztcclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcmUgdGhhdCBjb250YWlucyB0aGUgY2F0YWxvZyBpdGVtc1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHN0b3JlJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RW50aXR5U3RvcmU8Q2F0YWxvZ0l0ZW0sIENhdGFsb2dJdGVtU3RhdGU+Pih1bmRlZmluZWQpO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIHNlbGVjdGVkIGNhdGFsb2dcclxuICAgKi9cclxuICBwcml2YXRlIGNhdGFsb2ckJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGEgZ3JvdXAgY2FuIGJlIHRvZ2dsZWQgd2hlbiBpdCdzIGNvbGxhcHNlZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHRvZ2dsZUNvbGxhcHNlZEdyb3VwOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogTWFwIHRvIGFkZCBsYXllcnMgdG9cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgbWFwKCk6IElnb01hcCB7XHJcbiAgICByZXR1cm4gdGhpcy5tYXBTdGF0ZS5tYXA7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY2F0YWxvZ1NlcnZpY2U6IENhdGFsb2dTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjYXRhbG9nU3RhdGU6IENhdGFsb2dTdGF0ZSxcclxuICAgIHByaXZhdGUgbWFwU3RhdGU6IE1hcFN0YXRlXHJcbiAgKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGNvbnN0IGNhdGFsb2dTdG9yZSA9IHRoaXMuY2F0YWxvZ1N0YXRlLmNhdGFsb2dTdG9yZTtcclxuICAgIHRoaXMuY2F0YWxvZyQkID0gY2F0YWxvZ1N0b3JlLnN0YXRlVmlld1xyXG4gICAgICAuZmlyc3RCeSQoXHJcbiAgICAgICAgKHJlY29yZDogRW50aXR5UmVjb3JkPENhdGFsb2c+KSA9PiByZWNvcmQuc3RhdGUuc2VsZWN0ZWQgPT09IHRydWVcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKChyZWNvcmQ6IEVudGl0eVJlY29yZDxDYXRhbG9nPikgPT4ge1xyXG4gICAgICAgIGlmIChyZWNvcmQgJiYgcmVjb3JkLmVudGl0eSkge1xyXG4gICAgICAgICAgY29uc3QgY2F0YWxvZyA9IHJlY29yZC5lbnRpdHk7XHJcbiAgICAgICAgICB0aGlzLmNhdGFsb2cgPSBjYXRhbG9nO1xyXG4gICAgICAgICAgdGhpcy5sb2FkQ2F0YWxvZ0l0ZW1zKGNhdGFsb2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuY2F0YWxvZyQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIHNlbGVjdGVkIGNhdGFsb2cncyBpdGVtcyBmcm9tIHRoZSBDYXRhbG9nU2VydmljZSBhbmRcclxuICAgKiBsb2FkIHRoZW0gaW50byB0aGUgc3RvcmUuXHJcbiAgICogQHBhcmFtIGNhdGFsb2cgU2VsZWN0ZWQgY2F0YWxvZ1xyXG4gICAqL1xyXG4gIHByaXZhdGUgbG9hZENhdGFsb2dJdGVtcyhjYXRhbG9nOiBDYXRhbG9nKSB7XHJcbiAgICBsZXQgc3RvcmUgPSB0aGlzLmNhdGFsb2dTdGF0ZS5nZXRDYXRhbG9nSXRlbXNTdG9yZShjYXRhbG9nKTtcclxuICAgIGlmIChzdG9yZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuc3RvcmUkLm5leHQoc3RvcmUpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcmUgPSBuZXcgRW50aXR5U3RvcmU8Q2F0YWxvZ0l0ZW0+KFtdKTtcclxuICAgIHRoaXMuY2F0YWxvZ1N0YXRlLnNldENhdGFsb2dJdGVtc1N0b3JlKGNhdGFsb2csIHN0b3JlKTtcclxuICAgIHRoaXMuY2F0YWxvZ1NlcnZpY2VcclxuICAgICAgLmxvYWRDYXRhbG9nSXRlbXMoY2F0YWxvZylcclxuICAgICAgLnN1YnNjcmliZSgoaXRlbXM6IENhdGFsb2dJdGVtW10pID0+IHtcclxuICAgICAgICBzdG9yZS5sb2FkKGl0ZW1zKTtcclxuICAgICAgICB0aGlzLnN0b3JlJC5uZXh0KHN0b3JlKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==