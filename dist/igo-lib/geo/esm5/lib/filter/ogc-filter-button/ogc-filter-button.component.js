/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Layer } from '../../layer/shared/layers/layer';
import { IgoMap } from '../../map';
var OgcFilterButtonComponent = /** @class */ (function () {
    function OgcFilterButtonComponent() {
        this.color = 'primary';
        this.ogcFilterCollapse = false;
    }
    Object.defineProperty(OgcFilterButtonComponent.prototype, "options", {
        get: /**
         * @return {?}
         */
        function () {
            if (!this.layer) {
                return;
            }
            return this.layer.dataSource.options;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OgcFilterButtonComponent.prototype.toggleOgcFilter = /**
     * @return {?}
     */
    function () {
        if (this.layer.isInResolutionsRange) {
            this.ogcFilterCollapse = !this.ogcFilterCollapse;
        }
    };
    OgcFilterButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-ogc-filter-button',
                    template: "<button *ngIf=\"ogcFiltersInLayers && options.ogcFilters && (options.ogcFilters.enabled\r\n&& options.ogcFilters.editable)\"\r\n  mat-icon-button\r\n  collapsibleButton\r\n  tooltip-position=\"below\"\r\n  matTooltipShowDelay=\"500\"\r\n  [matTooltip]=\"'igo.geo.filter.filterBy' | translate\"\r\n  [color]=\"color\"\r\n  (click)=\"toggleOgcFilter()\">\r\n  <mat-icon\r\n    [ngClass]='{disabled: !layer.isInResolutionsRange}'svgIcon=\"filter\"></mat-icon>\r\n</button>\r\n\r\n<div #ogcFilter class=\"igo-layer-actions-container\"\r\n*ngIf=\"options.ogcFilters && (options.ogcFilters.enabled\r\n&& options.ogcFilters.editable)\">\r\n  <igo-ogc-filterable-item\r\n    *ngIf=\"ogcFilterCollapse && options.ogcFilters.enabled\"\r\n    igoListItem\r\n    [ogcFiltersHeaderShown]=\"false\"\r\n    [map]=\"layer.map\"\r\n    [layer]=\"layer\">\r\n  </igo-ogc-filterable-item>\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    OgcFilterButtonComponent.ctorParameters = function () { return []; };
    OgcFilterButtonComponent.propDecorators = {
        layer: [{ type: Input }],
        map: [{ type: Input }],
        color: [{ type: Input }],
        ogcFiltersInLayers: [{ type: Input }]
    };
    return OgcFilterButtonComponent;
}());
export { OgcFilterButtonComponent };
if (false) {
    /** @type {?} */
    OgcFilterButtonComponent.prototype.layer;
    /** @type {?} */
    OgcFilterButtonComponent.prototype.map;
    /** @type {?} */
    OgcFilterButtonComponent.prototype.color;
    /** @type {?} */
    OgcFilterButtonComponent.prototype.ogcFiltersInLayers;
    /** @type {?} */
    OgcFilterButtonComponent.prototype.ogcFilterCollapse;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlci1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ZpbHRlci9vZ2MtZmlsdGVyLWJ1dHRvbi9vZ2MtZmlsdGVyLWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN4RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBR25DO0lBeUJFO1FBYlMsVUFBSyxHQUFXLFNBQVMsQ0FBQztRQVc1QixzQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFFbEIsQ0FBQztJQVRoQixzQkFBSSw2Q0FBTzs7OztRQUFYO1lBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ2YsT0FBTzthQUNSO1lBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7UUFDdkMsQ0FBQzs7O09BQUE7Ozs7SUFNRCxrREFBZTs7O0lBQWY7UUFDRSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEVBQUU7WUFDbkMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1NBQ2xEO0lBQ0gsQ0FBQzs7Z0JBL0JGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQywrM0JBQWlEO29CQUVqRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7Ozt3QkFHRSxLQUFLO3NCQUVMLEtBQUs7d0JBRUwsS0FBSztxQ0FFTCxLQUFLOztJQWtCUiwrQkFBQztDQUFBLEFBaENELElBZ0NDO1NBMUJZLHdCQUF3Qjs7O0lBRW5DLHlDQUFzQjs7SUFFdEIsdUNBQXFCOztJQUVyQix5Q0FBbUM7O0lBRW5DLHNEQUFxQzs7SUFTckMscURBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllcic7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcCc7XHJcbmltcG9ydCB7IE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4uL3NoYXJlZC9vZ2MtZmlsdGVyLmludGVyZmFjZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1vZ2MtZmlsdGVyLWJ1dHRvbicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL29nYy1maWx0ZXItYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9vZ2MtZmlsdGVyLWJ1dHRvbi5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPZ2NGaWx0ZXJCdXR0b25Db21wb25lbnQge1xyXG5cclxuICBASW5wdXQoKSBsYXllcjogTGF5ZXI7XHJcblxyXG4gIEBJbnB1dCgpIG1hcDogSWdvTWFwO1xyXG5cclxuICBASW5wdXQoKSBjb2xvcjogc3RyaW5nID0gJ3ByaW1hcnknO1xyXG5cclxuICBASW5wdXQoKSBvZ2NGaWx0ZXJzSW5MYXllcnM6IGJvb2xlYW47XHJcblxyXG4gIGdldCBvcHRpb25zKCk6IE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucyB7XHJcbiAgICBpZiAoIXRoaXMubGF5ZXIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9nY0ZpbHRlckNvbGxhcHNlID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgdG9nZ2xlT2djRmlsdGVyKCkge1xyXG4gICAgaWYgKHRoaXMubGF5ZXIuaXNJblJlc29sdXRpb25zUmFuZ2UpIHtcclxuICAgICAgdGhpcy5vZ2NGaWx0ZXJDb2xsYXBzZSA9ICF0aGlzLm9nY0ZpbHRlckNvbGxhcHNlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=