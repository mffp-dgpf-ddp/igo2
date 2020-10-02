/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
var TimeFilterListComponent = /** @class */ (function () {
    function TimeFilterListComponent(cdRef) {
        this.cdRef = cdRef;
        this._layers = [];
    }
    Object.defineProperty(TimeFilterListComponent.prototype, "layers", {
        get: /**
         * @return {?}
         */
        function () {
            return this._layers;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._layers = value;
            this.cdRef.detectChanges();
        },
        enumerable: true,
        configurable: true
    });
    TimeFilterListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-time-filter-list',
                    template: "<igo-list [navigation]=\"false\" [selection]=\"false\">\r\n  <ng-template ngFor let-layer [ngForOf]=\"layers | filterableDataSource: 'time'\">\r\n    <igo-time-filter-item [header]=\"true\" igoListItem [layer]=\"layer\"></igo-time-filter-item>\r\n  </ng-template>\r\n</igo-list>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    TimeFilterListComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    TimeFilterListComponent.propDecorators = {
        layers: [{ type: Input }]
    };
    return TimeFilterListComponent;
}());
export { TimeFilterListComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    TimeFilterListComponent.prototype._layers;
    /**
     * @type {?}
     * @private
     */
    TimeFilterListComponent.prototype.cdRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1maWx0ZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL3RpbWUtZmlsdGVyLWxpc3QvdGltZS1maWx0ZXItbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFJdkI7SUFnQkUsaUNBQW9CLEtBQXdCO1FBQXhCLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBRnBDLFlBQU8sR0FBWSxFQUFFLENBQUM7SUFFaUIsQ0FBQztJQVZoRCxzQkFDSSwyQ0FBTTs7OztRQURWO1lBRUUsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RCLENBQUM7Ozs7O1FBQ0QsVUFBVyxLQUFjO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDN0IsQ0FBQzs7O09BSkE7O2dCQVRGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxzU0FBZ0Q7b0JBQ2hELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs7OztnQkFUQyxpQkFBaUI7Ozt5QkFXaEIsS0FBSzs7SUFXUiw4QkFBQztDQUFBLEFBakJELElBaUJDO1NBWlksdUJBQXVCOzs7Ozs7SUFTbEMsMENBQThCOzs7OztJQUVsQix3Q0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2xheWVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXRpbWUtZmlsdGVyLWxpc3QnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90aW1lLWZpbHRlci1saXN0LmNvbXBvbmVudC5odG1sJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGltZUZpbHRlckxpc3RDb21wb25lbnQge1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGxheWVycygpOiBMYXllcltdIHtcclxuICAgIHJldHVybiB0aGlzLl9sYXllcnM7XHJcbiAgfVxyXG4gIHNldCBsYXllcnModmFsdWU6IExheWVyW10pIHtcclxuICAgIHRoaXMuX2xheWVycyA9IHZhbHVlO1xyXG4gICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2xheWVyczogTGF5ZXJbXSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cclxufVxyXG4iXX0=