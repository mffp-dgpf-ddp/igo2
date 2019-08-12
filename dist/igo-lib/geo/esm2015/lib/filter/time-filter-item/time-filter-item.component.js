/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { Layer } from '../../layer/shared/layers/layer';
import { TimeFilterService } from '../shared/time-filter.service';
export class TimeFilterItemComponent {
    /**
     * @param {?} timeFilterService
     */
    constructor(timeFilterService) {
        this.timeFilterService = timeFilterService;
    }
    /**
     * @return {?}
     */
    get layer() {
        return this._layer;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set layer(value) {
        this._layer = value;
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
}
TimeFilterItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-time-filter-item',
                template: "<mat-list-item>\r\n  <mat-icon\r\n    class=\"igo-chevron\"\r\n    mat-list-avatar\r\n    igoCollapse\r\n    [target]=\"filters\"\r\n    [collapsed]=\"false\"\r\n    svgIcon=\"chevron-up\" >\r\n  </mat-icon>\r\n  <h4 matLine>{{layer.title}}</h4>\r\n</mat-list-item>\r\n\r\n<div #filters class=\"igo-datasource-filters-container\">\r\n  <igo-time-filter-form\r\n    [options]=\"datasource.options.timeFilter\"\r\n    [currentValue]=\"datasource.options.params.time\"\r\n    (change)=\"handleDateChange($event)\"\r\n    (yearChange)=\"handleYearChange($event)\">\r\n  </igo-time-filter-form>\r\n</div>\r\n",
                styles: [":host{overflow:hidden}.igo-datasource-filters-container{text-align:center;width:100%;display:inline-block}"]
            }] }
];
/** @nocollapse */
TimeFilterItemComponent.ctorParameters = () => [
    { type: TimeFilterService }
];
TimeFilterItemComponent.propDecorators = {
    layer: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1maWx0ZXItaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL3RpbWUtZmlsdGVyLWl0ZW0vdGltZS1maWx0ZXItaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUV4RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQU9sRSxNQUFNLE9BQU8sdUJBQXVCOzs7O0lBYWxDLFlBQW9CLGlCQUFvQztRQUFwQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO0lBQUcsQ0FBQzs7OztJQVo1RCxJQUNJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFZO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7Ozs7SUFHRCxJQUFJLFVBQVU7UUFDWixPQUFPLG1CQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUE0QixDQUFDO0lBQzNELENBQUM7Ozs7O0lBR0QsZ0JBQWdCLENBQUMsSUFBK0I7UUFDOUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUM7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsSUFBeUI7UUFDeEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUM7OztZQTFCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsdW1CQUFnRDs7YUFFakQ7Ozs7WUFOUSxpQkFBaUI7OztvQkFRdkIsS0FBSzs7Ozs7OztJQU9OLHlDQUFzQjs7Ozs7SUFLVixvREFBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvbGF5ZXInO1xyXG5pbXBvcnQgeyBUaW1lRmlsdGVyYWJsZURhdGFTb3VyY2UgfSBmcm9tICcuLi9zaGFyZWQvdGltZS1maWx0ZXIuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgVGltZUZpbHRlclNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvdGltZS1maWx0ZXIuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby10aW1lLWZpbHRlci1pdGVtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vdGltZS1maWx0ZXItaXRlbS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdGltZS1maWx0ZXItaXRlbS5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUaW1lRmlsdGVySXRlbUNvbXBvbmVudCB7XHJcbiAgQElucHV0KClcclxuICBnZXQgbGF5ZXIoKTogTGF5ZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xheWVyO1xyXG4gIH1cclxuICBzZXQgbGF5ZXIodmFsdWU6IExheWVyKSB7XHJcbiAgICB0aGlzLl9sYXllciA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9sYXllcjogTGF5ZXI7XHJcblxyXG4gIGdldCBkYXRhc291cmNlKCk6IFRpbWVGaWx0ZXJhYmxlRGF0YVNvdXJjZSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllci5kYXRhU291cmNlIGFzIFRpbWVGaWx0ZXJhYmxlRGF0YVNvdXJjZTtcclxuICB9XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0aW1lRmlsdGVyU2VydmljZTogVGltZUZpbHRlclNlcnZpY2UpIHt9XHJcblxyXG4gIGhhbmRsZVllYXJDaGFuZ2UoeWVhcjogc3RyaW5nIHwgW3N0cmluZywgc3RyaW5nXSkge1xyXG4gICAgdGhpcy50aW1lRmlsdGVyU2VydmljZS5maWx0ZXJCeVllYXIodGhpcy5kYXRhc291cmNlLCB5ZWFyKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZURhdGVDaGFuZ2UoZGF0ZTogRGF0ZSB8IFtEYXRlLCBEYXRlXSkge1xyXG4gICAgdGhpcy50aW1lRmlsdGVyU2VydmljZS5maWx0ZXJCeURhdGUodGhpcy5kYXRhc291cmNlLCBkYXRlKTtcclxuICB9XHJcbn1cclxuIl19