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
                    template: "<mat-list-item *ngIf=\"header\">\r\n  <mat-icon\r\n    class=\"igo-chevron\"\r\n    mat-list-avatar\r\n    igoCollapse\r\n    [target]=\"filters\"\r\n    [collapsed]=\"filtersCollapsed\"\r\n    (click)=\"toggleFiltersCollapsed()\"\r\n    svgIcon=\"chevron-up\" >\r\n  </mat-icon>\r\n  <h4 (click)=\"toggleLegendOnClick()\" [ngStyle]=\"{'cursor': filtersCollapsed ? 'default' : 'pointer'}\"  matLine>{{layer.title}}</h4>\r\n  \r\n  <button *ngIf=\"!layer.visible\" mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"'igo.geo.layer.showLayer' | translate\" color=\"warn\" (click)=\"setVisible()\">\r\n    <mat-icon svgIcon=\"alert-circle-outline\"></mat-icon>\r\n  </button>\r\n\r\n</mat-list-item>\r\n\r\n<div #filters class=\"igo-datasource-filters-container\">\r\n  <div #legend class=\"igo-layer-legend-container\">\r\n    <igo-layer-legend *ngIf=\"showLegend$ | async\" [layer]=\"layer\">\r\n    </igo-layer-legend>\r\n  </div>\r\n  <igo-time-filter-form\r\n    [layer]= \"layer\"\r\n    [options]=\"datasource.options.timeFilter\"\r\n    [currentValue]=\"datasource.options.params.TIME\"\r\n    (change)=\"handleDateChange($event)\"\r\n    (yearChange)=\"handleYearChange($event)\">\r\n  </igo-time-filter-form>\r\n</div>\r\n",
                    styles: [":host{overflow:hidden}.igo-datasource-filters-container{text-align:center;width:100%;display:inline-block}.igo-layer-legend-container{padding-left:1.125em;width:calc(100% - 18px)}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1maWx0ZXItaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL3RpbWUtZmlsdGVyLWl0ZW0vdGltZS1maWx0ZXItaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUV4RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXZDO0lBa0JFLGlDQUFvQixpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQVh4RCxnQkFBVyxHQUE2QixJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVuRSxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFFekIsV0FBTSxHQUFZLElBQUksQ0FBQztJQU8yQixDQUFDO0lBSDVELHNCQUFJLCtDQUFVOzs7O1FBQWQ7WUFDRSxPQUFPLG1CQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUE0QixDQUFDO1FBQzNELENBQUM7OztPQUFBOzs7OztJQUdELGtEQUFnQjs7OztJQUFoQixVQUFpQixJQUErQjtRQUM5QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0QsQ0FBQzs7Ozs7SUFFRCxrREFBZ0I7Ozs7SUFBaEIsVUFBaUIsSUFBeUI7UUFDeEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUM7Ozs7OztJQUVPLDhDQUFZOzs7OztJQUFwQixVQUFxQixTQUFrQjtRQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7UUFDdkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7O0lBRUQscURBQW1COzs7SUFBbkI7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQzFCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzQztJQUNILENBQUM7Ozs7SUFFTSw0Q0FBVTs7O0lBQWpCO1FBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQzVCLENBQUM7Ozs7SUFFRCx3REFBc0I7OztJQUF0QjtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUNqRCxDQUFDOztnQkE3Q0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLG13Q0FBZ0Q7O2lCQUVqRDs7OztnQkFQUSxpQkFBaUI7Ozt5QkFjdkIsS0FBSzt3QkFFTCxLQUFLOztJQWlDUiw4QkFBQztDQUFBLEFBOUNELElBOENDO1NBekNZLHVCQUF1Qjs7O0lBRWxDLDhDQUFtRTs7SUFFbkUsbURBQWtDOztJQUVsQyx5Q0FBZ0M7O0lBRWhDLHdDQUFzQjs7Ozs7SUFLVixvREFBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvbGF5ZXInO1xyXG5pbXBvcnQgeyBUaW1lRmlsdGVyYWJsZURhdGFTb3VyY2UgfSBmcm9tICcuLi9zaGFyZWQvdGltZS1maWx0ZXIuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgVGltZUZpbHRlclNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvdGltZS1maWx0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tdGltZS1maWx0ZXItaXRlbScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3RpbWUtZmlsdGVyLWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3RpbWUtZmlsdGVyLWl0ZW0uY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGltZUZpbHRlckl0ZW1Db21wb25lbnQge1xyXG5cclxuICBzaG93TGVnZW5kJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XHJcblxyXG4gIGZpbHRlcnNDb2xsYXBzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgaGVhZGVyOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQElucHV0KCkgbGF5ZXI6IExheWVyO1xyXG5cclxuICBnZXQgZGF0YXNvdXJjZSgpOiBUaW1lRmlsdGVyYWJsZURhdGFTb3VyY2Uge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXIuZGF0YVNvdXJjZSBhcyBUaW1lRmlsdGVyYWJsZURhdGFTb3VyY2U7XHJcbiAgfVxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdGltZUZpbHRlclNlcnZpY2U6IFRpbWVGaWx0ZXJTZXJ2aWNlKSB7fVxyXG5cclxuICBoYW5kbGVZZWFyQ2hhbmdlKHllYXI6IHN0cmluZyB8IFtzdHJpbmcsIHN0cmluZ10pIHtcclxuICAgIHRoaXMudGltZUZpbHRlclNlcnZpY2UuZmlsdGVyQnlZZWFyKHRoaXMuZGF0YXNvdXJjZSwgeWVhcik7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVEYXRlQ2hhbmdlKGRhdGU6IERhdGUgfCBbRGF0ZSwgRGF0ZV0pIHtcclxuICAgIHRoaXMudGltZUZpbHRlclNlcnZpY2UuZmlsdGVyQnlEYXRlKHRoaXMuZGF0YXNvdXJjZSwgZGF0ZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRvZ2dsZUxlZ2VuZChjb2xsYXBzZWQ6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMubGF5ZXIubGVnZW5kQ29sbGFwc2VkID0gY29sbGFwc2VkO1xyXG4gICAgdGhpcy5zaG93TGVnZW5kJC5uZXh0KCFjb2xsYXBzZWQpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlTGVnZW5kT25DbGljaygpIHtcclxuICAgIGlmICghdGhpcy5maWx0ZXJzQ29sbGFwc2VkKSB7XHJcbiAgICAgIHRoaXMudG9nZ2xlTGVnZW5kKHRoaXMuc2hvd0xlZ2VuZCQudmFsdWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldFZpc2libGUoKSB7XHJcbiAgICB0aGlzLmxheWVyLnZpc2libGUgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlRmlsdGVyc0NvbGxhcHNlZCgpIHtcclxuICAgIHRoaXMuZmlsdGVyc0NvbGxhcHNlZCA9ICF0aGlzLmZpbHRlcnNDb2xsYXBzZWQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==