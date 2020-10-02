/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { Layer } from '../../layer/shared/layers/layer';
import { TimeFilterService } from '../shared/time-filter.service';
import { BehaviorSubject } from 'rxjs';
export class TimeFilterItemComponent {
    /**
     * @param {?} timeFilterService
     */
    constructor(timeFilterService) {
        this.timeFilterService = timeFilterService;
        this.color = 'primary';
        this.showLegend$ = new BehaviorSubject(false);
        this.filtersCollapsed = false;
        this.header = true;
    }
    /**
     * @return {?}
     */
    get datasource() {
        return (/** @type {?} */ (this.layer.dataSource));
    }
    /**
     * @param {?} year
     * @return {?}
     */
    handleYearChange(year) {
        this.timeFilterService.filterByYear(this.datasource, year);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    handleDateChange(date) {
        this.timeFilterService.filterByDate(this.datasource, date);
    }
    /**
     * @private
     * @param {?} collapsed
     * @return {?}
     */
    toggleLegend(collapsed) {
        this.layer.legendCollapsed = collapsed;
        this.showLegend$.next(!collapsed);
    }
    /**
     * @return {?}
     */
    toggleLegendOnClick() {
        if (!this.filtersCollapsed) {
            this.toggleLegend(this.showLegend$.value);
        }
    }
    /**
     * @return {?}
     */
    setVisible() {
        this.layer.visible = true;
    }
    /**
     * @return {?}
     */
    toggleFiltersCollapsed() {
        this.filtersCollapsed = !this.filtersCollapsed;
    }
}
TimeFilterItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-time-filter-item',
                template: "<mat-list-item *ngIf=\"header\">\r\n  <mat-icon\r\n    class=\"igo-chevron\"\r\n    mat-list-avatar\r\n    igoCollapse\r\n    [target]=\"filters\"\r\n    [collapsed]=\"filtersCollapsed\"\r\n    (click)=\"toggleFiltersCollapsed()\"\r\n    svgIcon=\"chevron-up\" >\r\n  </mat-icon>\r\n  <h4 (click)=\"toggleLegendOnClick()\" [ngStyle]=\"{'cursor': filtersCollapsed ? 'default' : 'pointer'}\"  matLine>{{layer.title}}</h4>\r\n  \r\n  <button *ngIf=\"!layer.visible\" mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"'igo.geo.layer.showLayer' | translate\" color=\"color\" (click)=\"setVisible()\">\r\n    <mat-icon svgIcon=\"eye-off\"></mat-icon>\r\n  </button>\r\n\r\n</mat-list-item>\r\n\r\n<div #filters class=\"igo-datasource-filters-container\">\r\n  <div #legend class=\"igo-layer-legend-container\">\r\n    <igo-layer-legend *ngIf=\"showLegend$ | async\" [layer]=\"layer\">\r\n    </igo-layer-legend>\r\n  </div>\r\n  <igo-time-filter-form\r\n    [layer]= \"layer\"\r\n    [options]=\"datasource.options.timeFilter\"\r\n    [currentValue]=\"datasource.options.params.TIME\"\r\n    (change)=\"handleDateChange($event)\"\r\n    (yearChange)=\"handleYearChange($event)\">\r\n  </igo-time-filter-form>\r\n</div>\r\n",
                styles: [":host{overflow:hidden}.igo-datasource-filters-container{text-align:center;width:100%;display:inline-block;padding-top:5px}.igo-layer-legend-container{padding-left:1.125em;width:calc(100% - 18px)}"]
            }] }
];
/** @nocollapse */
TimeFilterItemComponent.ctorParameters = () => [
    { type: TimeFilterService }
];
TimeFilterItemComponent.propDecorators = {
    header: [{ type: Input }],
    layer: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    TimeFilterItemComponent.prototype.color;
    /** @type {?} */
    TimeFilterItemComponent.prototype.showLegend$;
    /** @type {?} */
    TimeFilterItemComponent.prototype.filtersCollapsed;
    /** @type {?} */
    TimeFilterItemComponent.prototype.header;
    /** @type {?} */
    TimeFilterItemComponent.prototype.layer;
    /**
     * @type {?}
     * @private
     */
    TimeFilterItemComponent.prototype.timeFilterService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1maWx0ZXItaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL3RpbWUtZmlsdGVyLWl0ZW0vdGltZS1maWx0ZXItaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUV4RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBT3ZDLE1BQU0sT0FBTyx1QkFBdUI7Ozs7SUFhbEMsWUFBb0IsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFaakQsVUFBSyxHQUFHLFNBQVMsQ0FBQztRQUN6QixnQkFBVyxHQUE2QixJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVuRSxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFFekIsV0FBTSxHQUFZLElBQUksQ0FBQztJQU8yQixDQUFDOzs7O0lBSDVELElBQUksVUFBVTtRQUNaLE9BQU8sbUJBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQTRCLENBQUM7SUFDM0QsQ0FBQzs7Ozs7SUFHRCxnQkFBZ0IsQ0FBQyxJQUErQjtRQUM5QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0QsQ0FBQzs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxJQUF5QjtRQUN4QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0QsQ0FBQzs7Ozs7O0lBRU8sWUFBWSxDQUFDLFNBQWtCO1FBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztRQUN2QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7SUFFRCxtQkFBbUI7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0M7SUFDSCxDQUFDOzs7O0lBRU0sVUFBVTtRQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDOzs7O0lBRUQsc0JBQXNCO1FBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUNqRCxDQUFDOzs7WUE3Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLHV2Q0FBZ0Q7O2FBRWpEOzs7O1lBUFEsaUJBQWlCOzs7cUJBY3ZCLEtBQUs7b0JBRUwsS0FBSzs7OztJQVBOLHdDQUF5Qjs7SUFDekIsOENBQW1FOztJQUVuRSxtREFBa0M7O0lBRWxDLHlDQUFnQzs7SUFFaEMsd0NBQXNCOzs7OztJQUtWLG9EQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllcic7XHJcbmltcG9ydCB7IFRpbWVGaWx0ZXJhYmxlRGF0YVNvdXJjZSB9IGZyb20gJy4uL3NoYXJlZC90aW1lLWZpbHRlci5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBUaW1lRmlsdGVyU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC90aW1lLWZpbHRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby10aW1lLWZpbHRlci1pdGVtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vdGltZS1maWx0ZXItaXRlbS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdGltZS1maWx0ZXItaXRlbS5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUaW1lRmlsdGVySXRlbUNvbXBvbmVudCB7XHJcbiAgcHVibGljIGNvbG9yID0gJ3ByaW1hcnknO1xyXG4gIHNob3dMZWdlbmQkOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcclxuXHJcbiAgZmlsdGVyc0NvbGxhcHNlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSBoZWFkZXI6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBASW5wdXQoKSBsYXllcjogTGF5ZXI7XHJcblxyXG4gIGdldCBkYXRhc291cmNlKCk6IFRpbWVGaWx0ZXJhYmxlRGF0YVNvdXJjZSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllci5kYXRhU291cmNlIGFzIFRpbWVGaWx0ZXJhYmxlRGF0YVNvdXJjZTtcclxuICB9XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0aW1lRmlsdGVyU2VydmljZTogVGltZUZpbHRlclNlcnZpY2UpIHt9XHJcblxyXG4gIGhhbmRsZVllYXJDaGFuZ2UoeWVhcjogc3RyaW5nIHwgW3N0cmluZywgc3RyaW5nXSkge1xyXG4gICAgdGhpcy50aW1lRmlsdGVyU2VydmljZS5maWx0ZXJCeVllYXIodGhpcy5kYXRhc291cmNlLCB5ZWFyKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZURhdGVDaGFuZ2UoZGF0ZTogRGF0ZSB8IFtEYXRlLCBEYXRlXSkge1xyXG4gICAgdGhpcy50aW1lRmlsdGVyU2VydmljZS5maWx0ZXJCeURhdGUodGhpcy5kYXRhc291cmNlLCBkYXRlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdG9nZ2xlTGVnZW5kKGNvbGxhcHNlZDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5sYXllci5sZWdlbmRDb2xsYXBzZWQgPSBjb2xsYXBzZWQ7XHJcbiAgICB0aGlzLnNob3dMZWdlbmQkLm5leHQoIWNvbGxhcHNlZCk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVMZWdlbmRPbkNsaWNrKCkge1xyXG4gICAgaWYgKCF0aGlzLmZpbHRlcnNDb2xsYXBzZWQpIHtcclxuICAgICAgdGhpcy50b2dnbGVMZWdlbmQodGhpcy5zaG93TGVnZW5kJC52YWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0VmlzaWJsZSgpIHtcclxuICAgIHRoaXMubGF5ZXIudmlzaWJsZSA9IHRydWU7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVGaWx0ZXJzQ29sbGFwc2VkKCkge1xyXG4gICAgdGhpcy5maWx0ZXJzQ29sbGFwc2VkID0gIXRoaXMuZmlsdGVyc0NvbGxhcHNlZDtcclxuICB9XHJcbn1cclxuIl19