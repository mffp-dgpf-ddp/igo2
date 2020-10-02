/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { Layer } from '../../layer/shared/layers/layer';
import { TimeFilterService } from '../shared/time-filter.service';
import { BehaviorSubject } from 'rxjs';
var TimeFilterItemComponent = /** @class */ (function () {
    function TimeFilterItemComponent(timeFilterService) {
        this.timeFilterService = timeFilterService;
        this.color = 'primary';
        this.showLegend$ = new BehaviorSubject(false);
        this.filtersCollapsed = false;
        this.header = true;
    }
    Object.defineProperty(TimeFilterItemComponent.prototype, "datasource", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this.layer.dataSource));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} year
     * @return {?}
     */
    TimeFilterItemComponent.prototype.handleYearChange = /**
     * @param {?} year
     * @return {?}
     */
    function (year) {
        this.timeFilterService.filterByYear(this.datasource, year);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    TimeFilterItemComponent.prototype.handleDateChange = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        this.timeFilterService.filterByDate(this.datasource, date);
    };
    /**
     * @private
     * @param {?} collapsed
     * @return {?}
     */
    TimeFilterItemComponent.prototype.toggleLegend = /**
     * @private
     * @param {?} collapsed
     * @return {?}
     */
    function (collapsed) {
        this.layer.legendCollapsed = collapsed;
        this.showLegend$.next(!collapsed);
    };
    /**
     * @return {?}
     */
    TimeFilterItemComponent.prototype.toggleLegendOnClick = /**
     * @return {?}
     */
    function () {
        if (!this.filtersCollapsed) {
            this.toggleLegend(this.showLegend$.value);
        }
    };
    /**
     * @return {?}
     */
    TimeFilterItemComponent.prototype.setVisible = /**
     * @return {?}
     */
    function () {
        this.layer.visible = true;
    };
    /**
     * @return {?}
     */
    TimeFilterItemComponent.prototype.toggleFiltersCollapsed = /**
     * @return {?}
     */
    function () {
        this.filtersCollapsed = !this.filtersCollapsed;
    };
    TimeFilterItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-time-filter-item',
                    template: "<mat-list-item *ngIf=\"header\">\r\n  <mat-icon\r\n    class=\"igo-chevron\"\r\n    mat-list-avatar\r\n    igoCollapse\r\n    [target]=\"filters\"\r\n    [collapsed]=\"filtersCollapsed\"\r\n    (click)=\"toggleFiltersCollapsed()\"\r\n    svgIcon=\"chevron-up\" >\r\n  </mat-icon>\r\n  <h4 (click)=\"toggleLegendOnClick()\" [ngStyle]=\"{'cursor': filtersCollapsed ? 'default' : 'pointer'}\"  matLine>{{layer.title}}</h4>\r\n  \r\n  <button *ngIf=\"!layer.visible\" mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"'igo.geo.layer.showLayer' | translate\" color=\"color\" (click)=\"setVisible()\">\r\n    <mat-icon svgIcon=\"eye-off\"></mat-icon>\r\n  </button>\r\n\r\n</mat-list-item>\r\n\r\n<div #filters class=\"igo-datasource-filters-container\">\r\n  <div #legend class=\"igo-layer-legend-container\">\r\n    <igo-layer-legend *ngIf=\"showLegend$ | async\" [layer]=\"layer\">\r\n    </igo-layer-legend>\r\n  </div>\r\n  <igo-time-filter-form\r\n    [layer]= \"layer\"\r\n    [options]=\"datasource.options.timeFilter\"\r\n    [currentValue]=\"datasource.options.params.TIME\"\r\n    (change)=\"handleDateChange($event)\"\r\n    (yearChange)=\"handleYearChange($event)\">\r\n  </igo-time-filter-form>\r\n</div>\r\n",
                    styles: [":host{overflow:hidden}.igo-datasource-filters-container{text-align:center;width:100%;display:inline-block;padding-top:5px}.igo-layer-legend-container{padding-left:1.125em;width:calc(100% - 18px)}"]
                }] }
    ];
    /** @nocollapse */
    TimeFilterItemComponent.ctorParameters = function () { return [
        { type: TimeFilterService }
    ]; };
    TimeFilterItemComponent.propDecorators = {
        header: [{ type: Input }],
        layer: [{ type: Input }]
    };
    return TimeFilterItemComponent;
}());
export { TimeFilterItemComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1maWx0ZXItaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL3RpbWUtZmlsdGVyLWl0ZW0vdGltZS1maWx0ZXItaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUV4RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXZDO0lBa0JFLGlDQUFvQixpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQVpqRCxVQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ3pCLGdCQUFXLEdBQTZCLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRW5FLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUV6QixXQUFNLEdBQVksSUFBSSxDQUFDO0lBTzJCLENBQUM7SUFINUQsc0JBQUksK0NBQVU7Ozs7UUFBZDtZQUNFLE9BQU8sbUJBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQTRCLENBQUM7UUFDM0QsQ0FBQzs7O09BQUE7Ozs7O0lBR0Qsa0RBQWdCOzs7O0lBQWhCLFVBQWlCLElBQStCO1FBQzlDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3RCxDQUFDOzs7OztJQUVELGtEQUFnQjs7OztJQUFoQixVQUFpQixJQUF5QjtRQUN4QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0QsQ0FBQzs7Ozs7O0lBRU8sOENBQVk7Ozs7O0lBQXBCLFVBQXFCLFNBQWtCO1FBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztRQUN2QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7SUFFRCxxREFBbUI7OztJQUFuQjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNDO0lBQ0gsQ0FBQzs7OztJQUVNLDRDQUFVOzs7SUFBakI7UUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQzs7OztJQUVELHdEQUFzQjs7O0lBQXRCO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO0lBQ2pELENBQUM7O2dCQTdDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsdXZDQUFnRDs7aUJBRWpEOzs7O2dCQVBRLGlCQUFpQjs7O3lCQWN2QixLQUFLO3dCQUVMLEtBQUs7O0lBaUNSLDhCQUFDO0NBQUEsQUE5Q0QsSUE4Q0M7U0F6Q1ksdUJBQXVCOzs7SUFDbEMsd0NBQXlCOztJQUN6Qiw4Q0FBbUU7O0lBRW5FLG1EQUFrQzs7SUFFbEMseUNBQWdDOztJQUVoQyx3Q0FBc0I7Ozs7O0lBS1Ysb0RBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2xheWVyJztcclxuaW1wb3J0IHsgVGltZUZpbHRlcmFibGVEYXRhU291cmNlIH0gZnJvbSAnLi4vc2hhcmVkL3RpbWUtZmlsdGVyLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFRpbWVGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3RpbWUtZmlsdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXRpbWUtZmlsdGVyLWl0ZW0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90aW1lLWZpbHRlci1pdGVtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi90aW1lLWZpbHRlci1pdGVtLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFRpbWVGaWx0ZXJJdGVtQ29tcG9uZW50IHtcclxuICBwdWJsaWMgY29sb3IgPSAncHJpbWFyeSc7XHJcbiAgc2hvd0xlZ2VuZCQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xyXG5cclxuICBmaWx0ZXJzQ29sbGFwc2VkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIGhlYWRlcjogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBJbnB1dCgpIGxheWVyOiBMYXllcjtcclxuXHJcbiAgZ2V0IGRhdGFzb3VyY2UoKTogVGltZUZpbHRlcmFibGVEYXRhU291cmNlIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVyLmRhdGFTb3VyY2UgYXMgVGltZUZpbHRlcmFibGVEYXRhU291cmNlO1xyXG4gIH1cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRpbWVGaWx0ZXJTZXJ2aWNlOiBUaW1lRmlsdGVyU2VydmljZSkge31cclxuXHJcbiAgaGFuZGxlWWVhckNoYW5nZSh5ZWFyOiBzdHJpbmcgfCBbc3RyaW5nLCBzdHJpbmddKSB7XHJcbiAgICB0aGlzLnRpbWVGaWx0ZXJTZXJ2aWNlLmZpbHRlckJ5WWVhcih0aGlzLmRhdGFzb3VyY2UsIHllYXIpO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlRGF0ZUNoYW5nZShkYXRlOiBEYXRlIHwgW0RhdGUsIERhdGVdKSB7XHJcbiAgICB0aGlzLnRpbWVGaWx0ZXJTZXJ2aWNlLmZpbHRlckJ5RGF0ZSh0aGlzLmRhdGFzb3VyY2UsIGRhdGUpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0b2dnbGVMZWdlbmQoY29sbGFwc2VkOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmxheWVyLmxlZ2VuZENvbGxhcHNlZCA9IGNvbGxhcHNlZDtcclxuICAgIHRoaXMuc2hvd0xlZ2VuZCQubmV4dCghY29sbGFwc2VkKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUxlZ2VuZE9uQ2xpY2soKSB7XHJcbiAgICBpZiAoIXRoaXMuZmlsdGVyc0NvbGxhcHNlZCkge1xyXG4gICAgICB0aGlzLnRvZ2dsZUxlZ2VuZCh0aGlzLnNob3dMZWdlbmQkLnZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRWaXNpYmxlKCkge1xyXG4gICAgdGhpcy5sYXllci52aXNpYmxlID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUZpbHRlcnNDb2xsYXBzZWQoKSB7XHJcbiAgICB0aGlzLmZpbHRlcnNDb2xsYXBzZWQgPSAhdGhpcy5maWx0ZXJzQ29sbGFwc2VkO1xyXG4gIH1cclxufVxyXG4iXX0=