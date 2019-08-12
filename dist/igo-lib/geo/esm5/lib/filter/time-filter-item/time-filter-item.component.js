/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { Layer } from '../../layer/shared/layers/layer';
import { TimeFilterService } from '../shared/time-filter.service';
var TimeFilterItemComponent = /** @class */ (function () {
    function TimeFilterItemComponent(timeFilterService) {
        this.timeFilterService = timeFilterService;
    }
    Object.defineProperty(TimeFilterItemComponent.prototype, "layer", {
        get: /**
         * @return {?}
         */
        function () {
            return this._layer;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._layer = value;
        },
        enumerable: true,
        configurable: true
    });
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
    TimeFilterItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-time-filter-item',
                    template: "<mat-list-item>\r\n  <mat-icon\r\n    class=\"igo-chevron\"\r\n    mat-list-avatar\r\n    igoCollapse\r\n    [target]=\"filters\"\r\n    [collapsed]=\"false\"\r\n    svgIcon=\"chevron-up\" >\r\n  </mat-icon>\r\n  <h4 matLine>{{layer.title}}</h4>\r\n</mat-list-item>\r\n\r\n<div #filters class=\"igo-datasource-filters-container\">\r\n  <igo-time-filter-form\r\n    [options]=\"datasource.options.timeFilter\"\r\n    [currentValue]=\"datasource.options.params.time\"\r\n    (change)=\"handleDateChange($event)\"\r\n    (yearChange)=\"handleYearChange($event)\">\r\n  </igo-time-filter-form>\r\n</div>\r\n",
                    styles: [":host{overflow:hidden}.igo-datasource-filters-container{text-align:center;width:100%;display:inline-block}"]
                }] }
    ];
    /** @nocollapse */
    TimeFilterItemComponent.ctorParameters = function () { return [
        { type: TimeFilterService }
    ]; };
    TimeFilterItemComponent.propDecorators = {
        layer: [{ type: Input }]
    };
    return TimeFilterItemComponent;
}());
export { TimeFilterItemComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    TimeFilterItemComponent.prototype._layer;
    /**
     * @type {?}
     * @private
     */
    TimeFilterItemComponent.prototype.timeFilterService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1maWx0ZXItaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL3RpbWUtZmlsdGVyLWl0ZW0vdGltZS1maWx0ZXItaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUV4RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUVsRTtJQWtCRSxpQ0FBb0IsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7SUFBRyxDQUFDO0lBWjVELHNCQUNJLDBDQUFLOzs7O1FBRFQ7WUFFRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQzs7Ozs7UUFDRCxVQUFVLEtBQVk7WUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDdEIsQ0FBQzs7O09BSEE7SUFNRCxzQkFBSSwrQ0FBVTs7OztRQUFkO1lBQ0UsT0FBTyxtQkFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBNEIsQ0FBQztRQUMzRCxDQUFDOzs7T0FBQTs7Ozs7SUFHRCxrREFBZ0I7Ozs7SUFBaEIsVUFBaUIsSUFBK0I7UUFDOUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUM7Ozs7O0lBRUQsa0RBQWdCOzs7O0lBQWhCLFVBQWlCLElBQXlCO1FBQ3hDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3RCxDQUFDOztnQkExQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLHVtQkFBZ0Q7O2lCQUVqRDs7OztnQkFOUSxpQkFBaUI7Ozt3QkFRdkIsS0FBSzs7SUFxQlIsOEJBQUM7Q0FBQSxBQTNCRCxJQTJCQztTQXRCWSx1QkFBdUI7Ozs7OztJQVFsQyx5Q0FBc0I7Ozs7O0lBS1Ysb0RBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2xheWVyJztcclxuaW1wb3J0IHsgVGltZUZpbHRlcmFibGVEYXRhU291cmNlIH0gZnJvbSAnLi4vc2hhcmVkL3RpbWUtZmlsdGVyLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFRpbWVGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3RpbWUtZmlsdGVyLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tdGltZS1maWx0ZXItaXRlbScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3RpbWUtZmlsdGVyLWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3RpbWUtZmlsdGVyLWl0ZW0uY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGltZUZpbHRlckl0ZW1Db21wb25lbnQge1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGxheWVyKCk6IExheWVyIHtcclxuICAgIHJldHVybiB0aGlzLl9sYXllcjtcclxuICB9XHJcbiAgc2V0IGxheWVyKHZhbHVlOiBMYXllcikge1xyXG4gICAgdGhpcy5fbGF5ZXIgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfbGF5ZXI6IExheWVyO1xyXG5cclxuICBnZXQgZGF0YXNvdXJjZSgpOiBUaW1lRmlsdGVyYWJsZURhdGFTb3VyY2Uge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXIuZGF0YVNvdXJjZSBhcyBUaW1lRmlsdGVyYWJsZURhdGFTb3VyY2U7XHJcbiAgfVxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdGltZUZpbHRlclNlcnZpY2U6IFRpbWVGaWx0ZXJTZXJ2aWNlKSB7fVxyXG5cclxuICBoYW5kbGVZZWFyQ2hhbmdlKHllYXI6IHN0cmluZyB8IFtzdHJpbmcsIHN0cmluZ10pIHtcclxuICAgIHRoaXMudGltZUZpbHRlclNlcnZpY2UuZmlsdGVyQnlZZWFyKHRoaXMuZGF0YXNvdXJjZSwgeWVhcik7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVEYXRlQ2hhbmdlKGRhdGU6IERhdGUgfCBbRGF0ZSwgRGF0ZV0pIHtcclxuICAgIHRoaXMudGltZUZpbHRlclNlcnZpY2UuZmlsdGVyQnlEYXRlKHRoaXMuZGF0YXNvdXJjZSwgZGF0ZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==