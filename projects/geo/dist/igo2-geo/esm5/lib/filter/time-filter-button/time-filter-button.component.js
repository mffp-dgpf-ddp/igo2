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
    /**
     * @return {?}
     */
    TimeFilterButtonComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.options = (/** @type {?} */ (this.layer.dataSource.options));
    };
    /**
     * @return {?}
     */
    TimeFilterButtonComponent.prototype.toggleTimeFilter = /**
     * @return {?}
     */
    function () {
        this.timeFilterCollapse = !this.timeFilterCollapse;
    };
    TimeFilterButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-time-filter-button',
                    template: "<button *ngIf=\"header && options.timeFilterable && options.timeFilter\"\r\n  mat-icon-button\r\n  collapsibleButton\r\n  tooltip-position=\"below\"\r\n  matTooltipShowDelay=\"500\"\r\n  [matTooltip]=\"'igo.geo.filter.filterBy' | translate\"\r\n  [color]=\"color\"\r\n  (click)=\"toggleTimeFilter()\">\r\n  <mat-icon svgIcon=\"history\"></mat-icon>\r\n</button>\r\n\r\n<div #ogcFilter class=\"igo-layer-actions-container\"\r\n*ngIf=\"header && options.timeFilterable && options.timeFilter\">\r\n  <igo-time-filter-item\r\n    *ngIf=\"timeFilterCollapse && options.timeFilter\"\r\n    igoListItem\r\n    [header]=\"false\"\r\n    [layer]=\"layer\">\r\n  </igo-time-filter-item>\r\n</div>\r\n",
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
    /** @type {?} */
    TimeFilterButtonComponent.prototype.layer;
    /** @type {?} */
    TimeFilterButtonComponent.prototype.map;
    /** @type {?} */
    TimeFilterButtonComponent.prototype.color;
    /** @type {?} */
    TimeFilterButtonComponent.prototype.header;
    /** @type {?} */
    TimeFilterButtonComponent.prototype.timeFilterCollapse;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1maWx0ZXItYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXIvdGltZS1maWx0ZXItYnV0dG9uL3RpbWUtZmlsdGVyLWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRWxGLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN4RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBSW5DO0lBb0JFO1FBTlMsVUFBSyxHQUFXLFNBQVMsQ0FBQztRQUUxQixXQUFNLEdBQVksSUFBSSxDQUFDO1FBRXpCLHVCQUFrQixHQUFHLEtBQUssQ0FBQztJQUVuQixDQUFDOzs7O0lBRWhCLDRDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUF3QixDQUFDO0lBQ3ZFLENBQUM7Ozs7SUFFRCxvREFBZ0I7OztJQUFoQjtRQUNJLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztJQUN2RCxDQUFDOztnQkE1QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx3QkFBd0I7b0JBQ2xDLDhyQkFBa0Q7b0JBRWxELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozs7O3dCQUtFLEtBQUs7c0JBRUwsS0FBSzt3QkFFTCxLQUFLO3lCQUVMLEtBQUs7O0lBYVIsZ0NBQUM7Q0FBQSxBQTdCRCxJQTZCQztTQXZCWSx5QkFBeUI7OztJQUVwQyw0Q0FBZ0Q7O0lBRWhELDBDQUFzQjs7SUFFdEIsd0NBQXFCOztJQUVyQiwwQ0FBbUM7O0lBRW5DLDJDQUFnQzs7SUFFaEMsdURBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2xheWVyJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuaW1wb3J0IHsgVGltZUZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4uL3NoYXJlZC90aW1lLWZpbHRlci5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBXTVNEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL3dtcy1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby10aW1lLWZpbHRlci1idXR0b24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90aW1lLWZpbHRlci1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3RpbWUtZmlsdGVyLWJ1dHRvbi5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUaW1lRmlsdGVyQnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgcHVibGljIG9wdGlvbnM6IFRpbWVGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnM7XHJcblxyXG4gIEBJbnB1dCgpIGxheWVyOiBMYXllcjtcclxuXHJcbiAgQElucHV0KCkgbWFwOiBJZ29NYXA7XHJcblxyXG4gIEBJbnB1dCgpIGNvbG9yOiBzdHJpbmcgPSAncHJpbWFyeSc7XHJcblxyXG4gIEBJbnB1dCgpIGhlYWRlcjogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIHB1YmxpYyB0aW1lRmlsdGVyQ29sbGFwc2UgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMubGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zIGFzIFdNU0RhdGFTb3VyY2VPcHRpb25zO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlVGltZUZpbHRlcigpIHtcclxuICAgICAgdGhpcy50aW1lRmlsdGVyQ29sbGFwc2UgPSAhdGhpcy50aW1lRmlsdGVyQ29sbGFwc2U7XHJcbiAgfVxyXG59XHJcbiJdfQ==