/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Layer } from '../../layer/shared/layers/layer';
import { IgoMap } from '../../map';
var TimeFilterButtonComponent = /** @class */ (function () {
    function TimeFilterButtonComponent() {
        this.color = 'primary';
        this.header = true;
        this.timeFilterCollapse = false;
    }
    Object.defineProperty(TimeFilterButtonComponent.prototype, "badge", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var filter = (/** @type {?} */ (this.options.timeFilter));
            if (filter && filter.enabled) {
                return 1;
            }
            else {
                return;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeFilterButtonComponent.prototype, "layer", {
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
            if (value) {
                this.options = (/** @type {?} */ (this.layer.dataSource.options));
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TimeFilterButtonComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.options = (/** @type {?} */ (this.layer.dataSource.options));
    };
    TimeFilterButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-time-filter-button',
                    template: "<button *ngIf=\"header && options.timeFilterable && options.timeFilter\"\r\n  mat-icon-button\r\n  collapsibleButton\r\n  tooltip-position=\"below\"\r\n  matTooltipShowDelay=\"500\"\r\n  [matTooltip]=\"'igo.geo.filter.filterBy' | translate\"\r\n  [color]=\"color\">\r\n  <mat-icon [matBadge]=\"badge\" matBadgeColor=\"warn\" matBadgeSize=\"medium\" svgIcon=\"history\"></mat-icon>\r\n</button>\r\n\r\n<div #ogcFilter class=\"igo-layer-actions-container\"\r\n*ngIf=\"header && options.timeFilterable && options.timeFilter\">\r\n  <igo-time-filter-item\r\n    *ngIf=\"timeFilterCollapse && options.timeFilter\"\r\n    igoListItem\r\n    [header]=\"false\"\r\n    [layer]=\"layer\">\r\n  </igo-time-filter-item>\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    TimeFilterButtonComponent.ctorParameters = function () { return []; };
    TimeFilterButtonComponent.propDecorators = {
        layer: [{ type: Input }],
        map: [{ type: Input }],
        color: [{ type: Input }],
        header: [{ type: Input }]
    };
    return TimeFilterButtonComponent;
}());
export { TimeFilterButtonComponent };
if (false) {
    /** @type {?} */
    TimeFilterButtonComponent.prototype.options;
    /**
     * @type {?}
     * @private
     */
    TimeFilterButtonComponent.prototype._layer;
    /** @type {?} */
    TimeFilterButtonComponent.prototype.map;
    /** @type {?} */
    TimeFilterButtonComponent.prototype.color;
    /** @type {?} */
    TimeFilterButtonComponent.prototype.header;
    /** @type {?} */
    TimeFilterButtonComponent.prototype.timeFilterCollapse;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1maWx0ZXItYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXIvdGltZS1maWx0ZXItYnV0dG9uL3RpbWUtZmlsdGVyLWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRWxGLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN4RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBSW5DO0lBdUNFO1FBTlMsVUFBSyxHQUFXLFNBQVMsQ0FBQztRQUUxQixXQUFNLEdBQVksSUFBSSxDQUFDO1FBRXpCLHVCQUFrQixHQUFHLEtBQUssQ0FBQztJQUVuQixDQUFDO0lBN0JoQixzQkFBSSw0Q0FBSzs7OztRQUFUOztnQkFDUSxNQUFNLEdBQUcsbUJBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQU87WUFDN0MsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtnQkFDNUIsT0FBTyxDQUFDLENBQUM7YUFDVjtpQkFBTTtnQkFDTCxPQUFPO2FBQ1I7UUFDSCxDQUFDOzs7T0FBQTtJQUVELHNCQUNJLDRDQUFLOzs7O1FBRFQ7WUFFRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQzs7Ozs7UUFDRCxVQUFVLEtBQVk7WUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLE9BQU8sR0FBRyxtQkFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQXdCLENBQUM7YUFDdEU7UUFDSCxDQUFDOzs7T0FOQTs7OztJQW1CRCw0Q0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLG1CQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBd0IsQ0FBQztJQUN2RSxDQUFDOztnQkEzQ0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx3QkFBd0I7b0JBQ2xDLDh0QkFBa0Q7b0JBRWxELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozs7O3dCQWNFLEtBQUs7c0JBWUwsS0FBSzt3QkFFTCxLQUFLO3lCQUVMLEtBQUs7O0lBU1IsZ0NBQUM7Q0FBQSxBQTVDRCxJQTRDQztTQXRDWSx5QkFBeUI7OztJQUVwQyw0Q0FBZ0Q7Ozs7O0lBcUJoRCwyQ0FBZTs7SUFFZix3Q0FBcUI7O0lBRXJCLDBDQUFtQzs7SUFFbkMsMkNBQWdDOztJQUVoQyx1REFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvbGF5ZXInO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5pbXBvcnQgeyBUaW1lRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vc2hhcmVkL3RpbWUtZmlsdGVyLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFdNU0RhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd21zLWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXRpbWUtZmlsdGVyLWJ1dHRvbicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3RpbWUtZmlsdGVyLWJ1dHRvbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdGltZS1maWx0ZXItYnV0dG9uLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFRpbWVGaWx0ZXJCdXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBwdWJsaWMgb3B0aW9uczogVGltZUZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucztcclxuXHJcbiAgZ2V0IGJhZGdlKCkge1xyXG4gICAgY29uc3QgZmlsdGVyID0gdGhpcy5vcHRpb25zLnRpbWVGaWx0ZXIgYXMgYW55O1xyXG4gICAgaWYgKGZpbHRlciAmJiBmaWx0ZXIuZW5hYmxlZCkge1xyXG4gICAgICByZXR1cm4gMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGxheWVyKCk6IExheWVyIHtcclxuICAgIHJldHVybiB0aGlzLl9sYXllcjtcclxuICB9XHJcbiAgc2V0IGxheWVyKHZhbHVlOiBMYXllcikge1xyXG4gICAgdGhpcy5fbGF5ZXIgPSB2YWx1ZTtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucyBhcyBXTVNEYXRhU291cmNlT3B0aW9ucztcclxuICAgIH1cclxuICB9XHJcbiAgcHJpdmF0ZSBfbGF5ZXI7XHJcblxyXG4gIEBJbnB1dCgpIG1hcDogSWdvTWFwO1xyXG5cclxuICBASW5wdXQoKSBjb2xvcjogc3RyaW5nID0gJ3ByaW1hcnknO1xyXG5cclxuICBASW5wdXQoKSBoZWFkZXI6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBwdWJsaWMgdGltZUZpbHRlckNvbGxhcHNlID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucyBhcyBXTVNEYXRhU291cmNlT3B0aW9ucztcclxuICB9XHJcbn1cclxuIl19