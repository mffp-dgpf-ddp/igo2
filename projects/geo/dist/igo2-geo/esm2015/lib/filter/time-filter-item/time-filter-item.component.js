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
                template: "<mat-list-item *ngIf=\"header\">\r\n  <mat-icon\r\n    class=\"igo-chevron\"\r\n    mat-list-avatar\r\n    igoCollapse\r\n    [target]=\"filters\"\r\n    [collapsed]=\"filtersCollapsed\"\r\n    (click)=\"toggleFiltersCollapsed()\"\r\n    svgIcon=\"chevron-up\" >\r\n  </mat-icon>\r\n  <h4 (click)=\"toggleLegendOnClick()\" [ngStyle]=\"{'cursor': filtersCollapsed ? 'default' : 'pointer'}\"  matLine>{{layer.title}}</h4>\r\n  \r\n  <button *ngIf=\"!layer.visible\" mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"'igo.geo.layer.showLayer' | translate\" color=\"warn\" (click)=\"setVisible()\">\r\n    <mat-icon svgIcon=\"alert-circle-outline\"></mat-icon>\r\n  </button>\r\n\r\n</mat-list-item>\r\n\r\n<div #filters class=\"igo-datasource-filters-container\">\r\n  <div #legend class=\"igo-layer-legend-container\">\r\n    <igo-layer-legend *ngIf=\"showLegend$ | async\" [layer]=\"layer\">\r\n    </igo-layer-legend>\r\n  </div>\r\n  <igo-time-filter-form\r\n    [layer]= \"layer\"\r\n    [options]=\"datasource.options.timeFilter\"\r\n    [currentValue]=\"datasource.options.params.TIME\"\r\n    (change)=\"handleDateChange($event)\"\r\n    (yearChange)=\"handleYearChange($event)\">\r\n  </igo-time-filter-form>\r\n</div>\r\n",
                styles: [":host{overflow:hidden}.igo-datasource-filters-container{text-align:center;width:100%;display:inline-block}.igo-layer-legend-container{padding-left:1.125em;width:calc(100% - 18px)}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1maWx0ZXItaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL3RpbWUtZmlsdGVyLWl0ZW0vdGltZS1maWx0ZXItaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUV4RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBT3ZDLE1BQU0sT0FBTyx1QkFBdUI7Ozs7SUFhbEMsWUFBb0IsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFYeEQsZ0JBQVcsR0FBNkIsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFbkUscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBRXpCLFdBQU0sR0FBWSxJQUFJLENBQUM7SUFPMkIsQ0FBQzs7OztJQUg1RCxJQUFJLFVBQVU7UUFDWixPQUFPLG1CQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUE0QixDQUFDO0lBQzNELENBQUM7Ozs7O0lBR0QsZ0JBQWdCLENBQUMsSUFBK0I7UUFDOUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUM7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsSUFBeUI7UUFDeEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUM7Ozs7OztJQUVPLFlBQVksQ0FBQyxTQUFrQjtRQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7UUFDdkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7O0lBRUQsbUJBQW1CO1FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNDO0lBQ0gsQ0FBQzs7OztJQUVNLFVBQVU7UUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQzs7OztJQUVELHNCQUFzQjtRQUNwQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDakQsQ0FBQzs7O1lBN0NGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxtd0NBQWdEOzthQUVqRDs7OztZQVBRLGlCQUFpQjs7O3FCQWN2QixLQUFLO29CQUVMLEtBQUs7Ozs7SUFOTiw4Q0FBbUU7O0lBRW5FLG1EQUFrQzs7SUFFbEMseUNBQWdDOztJQUVoQyx3Q0FBc0I7Ozs7O0lBS1Ysb0RBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2xheWVyJztcclxuaW1wb3J0IHsgVGltZUZpbHRlcmFibGVEYXRhU291cmNlIH0gZnJvbSAnLi4vc2hhcmVkL3RpbWUtZmlsdGVyLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFRpbWVGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3RpbWUtZmlsdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXRpbWUtZmlsdGVyLWl0ZW0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90aW1lLWZpbHRlci1pdGVtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi90aW1lLWZpbHRlci1pdGVtLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFRpbWVGaWx0ZXJJdGVtQ29tcG9uZW50IHtcclxuXHJcbiAgc2hvd0xlZ2VuZCQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xyXG5cclxuICBmaWx0ZXJzQ29sbGFwc2VkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIGhlYWRlcjogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBJbnB1dCgpIGxheWVyOiBMYXllcjtcclxuXHJcbiAgZ2V0IGRhdGFzb3VyY2UoKTogVGltZUZpbHRlcmFibGVEYXRhU291cmNlIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVyLmRhdGFTb3VyY2UgYXMgVGltZUZpbHRlcmFibGVEYXRhU291cmNlO1xyXG4gIH1cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRpbWVGaWx0ZXJTZXJ2aWNlOiBUaW1lRmlsdGVyU2VydmljZSkge31cclxuXHJcbiAgaGFuZGxlWWVhckNoYW5nZSh5ZWFyOiBzdHJpbmcgfCBbc3RyaW5nLCBzdHJpbmddKSB7XHJcbiAgICB0aGlzLnRpbWVGaWx0ZXJTZXJ2aWNlLmZpbHRlckJ5WWVhcih0aGlzLmRhdGFzb3VyY2UsIHllYXIpO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlRGF0ZUNoYW5nZShkYXRlOiBEYXRlIHwgW0RhdGUsIERhdGVdKSB7XHJcbiAgICB0aGlzLnRpbWVGaWx0ZXJTZXJ2aWNlLmZpbHRlckJ5RGF0ZSh0aGlzLmRhdGFzb3VyY2UsIGRhdGUpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0b2dnbGVMZWdlbmQoY29sbGFwc2VkOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmxheWVyLmxlZ2VuZENvbGxhcHNlZCA9IGNvbGxhcHNlZDtcclxuICAgIHRoaXMuc2hvd0xlZ2VuZCQubmV4dCghY29sbGFwc2VkKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUxlZ2VuZE9uQ2xpY2soKSB7XHJcbiAgICBpZiAoIXRoaXMuZmlsdGVyc0NvbGxhcHNlZCkge1xyXG4gICAgICB0aGlzLnRvZ2dsZUxlZ2VuZCh0aGlzLnNob3dMZWdlbmQkLnZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRWaXNpYmxlKCkge1xyXG4gICAgdGhpcy5sYXllci52aXNpYmxlID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUZpbHRlcnNDb2xsYXBzZWQoKSB7XHJcbiAgICB0aGlzLmZpbHRlcnNDb2xsYXBzZWQgPSAhdGhpcy5maWx0ZXJzQ29sbGFwc2VkO1xyXG4gIH1cclxufVxyXG4iXX0=