/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Layer } from '../../layer/shared/layers/layer';
import { IgoMap } from '../../map';
export class TimeFilterButtonComponent {
    constructor() {
        this.color = 'primary';
        this.header = true;
        this.timeFilterCollapse = false;
    }
    /**
     * @return {?}
     */
    get badge() {
        /** @type {?} */
        const filter = (/** @type {?} */ (this.options.timeFilter));
        if (filter && filter.enabled) {
            return 1;
        }
        else {
            return;
        }
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
        if (value) {
            this.options = (/** @type {?} */ (this.layer.dataSource.options));
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.options = (/** @type {?} */ (this.layer.dataSource.options));
    }
}
TimeFilterButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-time-filter-button',
                template: "<button *ngIf=\"header && options.timeFilterable && options.timeFilter\"\r\n  mat-icon-button\r\n  collapsibleButton\r\n  tooltip-position=\"below\"\r\n  matTooltipShowDelay=\"500\"\r\n  [matTooltip]=\"'igo.geo.filter.filterBy' | translate\"\r\n  [color]=\"color\">\r\n  <mat-icon [matBadge]=\"badge\" matBadgeColor=\"warn\" matBadgeSize=\"medium\" svgIcon=\"history\"></mat-icon>\r\n</button>\r\n\r\n<div #ogcFilter class=\"igo-layer-actions-container\"\r\n*ngIf=\"header && options.timeFilterable && options.timeFilter\">\r\n  <igo-time-filter-item\r\n    *ngIf=\"timeFilterCollapse && options.timeFilter\"\r\n    igoListItem\r\n    [header]=\"false\"\r\n    [layer]=\"layer\">\r\n  </igo-time-filter-item>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            }] }
];
/** @nocollapse */
TimeFilterButtonComponent.ctorParameters = () => [];
TimeFilterButtonComponent.propDecorators = {
    layer: [{ type: Input }],
    map: [{ type: Input }],
    color: [{ type: Input }],
    header: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1maWx0ZXItYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXIvdGltZS1maWx0ZXItYnV0dG9uL3RpbWUtZmlsdGVyLWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRWxGLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN4RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBVW5DLE1BQU0sT0FBTyx5QkFBeUI7SUFpQ3BDO1FBTlMsVUFBSyxHQUFXLFNBQVMsQ0FBQztRQUUxQixXQUFNLEdBQVksSUFBSSxDQUFDO1FBRXpCLHVCQUFrQixHQUFHLEtBQUssQ0FBQztJQUVuQixDQUFDOzs7O0lBN0JoQixJQUFJLEtBQUs7O2NBQ0QsTUFBTSxHQUFHLG1CQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFPO1FBQzdDLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDNUIsT0FBTyxDQUFDLENBQUM7U0FDVjthQUFNO1lBQ0wsT0FBTztTQUNSO0lBQ0gsQ0FBQzs7OztJQUVELElBQ0ksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDOzs7OztJQUNELElBQUksS0FBSyxDQUFDLEtBQVk7UUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsT0FBTyxHQUFHLG1CQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBd0IsQ0FBQztTQUN0RTtJQUNILENBQUM7Ozs7SUFhRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxtQkFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQXdCLENBQUM7SUFDdkUsQ0FBQzs7O1lBM0NGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyw4dEJBQWtEO2dCQUVsRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs7O29CQWNFLEtBQUs7a0JBWUwsS0FBSztvQkFFTCxLQUFLO3FCQUVMLEtBQUs7Ozs7SUEzQk4sNENBQWdEOzs7OztJQXFCaEQsMkNBQWU7O0lBRWYsd0NBQXFCOztJQUVyQiwwQ0FBbUM7O0lBRW5DLDJDQUFnQzs7SUFFaEMsdURBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2xheWVyJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuaW1wb3J0IHsgVGltZUZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4uL3NoYXJlZC90aW1lLWZpbHRlci5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBXTVNEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL3dtcy1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby10aW1lLWZpbHRlci1idXR0b24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90aW1lLWZpbHRlci1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3RpbWUtZmlsdGVyLWJ1dHRvbi5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUaW1lRmlsdGVyQnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgcHVibGljIG9wdGlvbnM6IFRpbWVGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnM7XHJcblxyXG4gIGdldCBiYWRnZSgpIHtcclxuICAgIGNvbnN0IGZpbHRlciA9IHRoaXMub3B0aW9ucy50aW1lRmlsdGVyIGFzIGFueTtcclxuICAgIGlmIChmaWx0ZXIgJiYgZmlsdGVyLmVuYWJsZWQpIHtcclxuICAgICAgcmV0dXJuIDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBsYXllcigpOiBMYXllciB7XHJcbiAgICByZXR1cm4gdGhpcy5fbGF5ZXI7XHJcbiAgfVxyXG4gIHNldCBsYXllcih2YWx1ZTogTGF5ZXIpIHtcclxuICAgIHRoaXMuX2xheWVyID0gdmFsdWU7XHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgdGhpcy5vcHRpb25zID0gdGhpcy5sYXllci5kYXRhU291cmNlLm9wdGlvbnMgYXMgV01TRGF0YVNvdXJjZU9wdGlvbnM7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHByaXZhdGUgX2xheWVyO1xyXG5cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgQElucHV0KCkgY29sb3I6IHN0cmluZyA9ICdwcmltYXJ5JztcclxuXHJcbiAgQElucHV0KCkgaGVhZGVyOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgcHVibGljIHRpbWVGaWx0ZXJDb2xsYXBzZSA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5sYXllci5kYXRhU291cmNlLm9wdGlvbnMgYXMgV01TRGF0YVNvdXJjZU9wdGlvbnM7XHJcbiAgfVxyXG59XHJcbiJdfQ==