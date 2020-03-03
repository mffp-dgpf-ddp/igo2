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
    /**
     * @return {?}
     */
    OgcFilterButtonComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.options = (/** @type {?} */ (this.layer.dataSource.options));
    };
    /**
     * @return {?}
     */
    OgcFilterButtonComponent.prototype.toggleOgcFilter = /**
     * @return {?}
     */
    function () {
        this.ogcFilterCollapse = !this.ogcFilterCollapse;
    };
    OgcFilterButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-ogc-filter-button',
                    template: "<button *ngIf=\"header && options.ogcFilters && options.ogcFilters.enabled\"\r\n  mat-icon-button\r\n  collapsibleButton\r\n  tooltip-position=\"below\"\r\n  matTooltipShowDelay=\"500\"\r\n  [matTooltip]=\"'igo.geo.filter.filterBy' | translate\"\r\n  [color]=\"color\"\r\n  (click)=\"toggleOgcFilter()\">\r\n  <mat-icon svgIcon=\"filter\"></mat-icon>\r\n</button>\r\n\r\n<div #ogcFilter class=\"igo-layer-actions-container\"\r\n*ngIf=\"options.ogcFilters && options.ogcFilters.enabled\">\r\n  <igo-ogc-filterable-item\r\n    *ngIf=\"ogcFilterCollapse && options.ogcFilters.enabled\"\r\n    igoListItem\r\n    [header]=\"false\"\r\n    [map]=\"layer.map\"\r\n    [layer]=\"layer\">\r\n  </igo-ogc-filterable-item>\r\n</div>\r\n",
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
        header: [{ type: Input }]
    };
    return OgcFilterButtonComponent;
}());
export { OgcFilterButtonComponent };
if (false) {
    /** @type {?} */
    OgcFilterButtonComponent.prototype.options;
    /** @type {?} */
    OgcFilterButtonComponent.prototype.layer;
    /** @type {?} */
    OgcFilterButtonComponent.prototype.map;
    /** @type {?} */
    OgcFilterButtonComponent.prototype.color;
    /** @type {?} */
    OgcFilterButtonComponent.prototype.header;
    /** @type {?} */
    OgcFilterButtonComponent.prototype.ogcFilterCollapse;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlci1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ZpbHRlci9vZ2MtZmlsdGVyLWJ1dHRvbi9vZ2MtZmlsdGVyLWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRWxGLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN4RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBR25DO0lBb0JFO1FBTlMsVUFBSyxHQUFXLFNBQVMsQ0FBQztRQUk1QixzQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFFbEIsQ0FBQzs7OztJQUVoQiwyQ0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLG1CQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBa0MsQ0FBQztJQUNqRixDQUFDOzs7O0lBRUQsa0RBQWU7OztJQUFmO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ3JELENBQUM7O2dCQTVCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsa3VCQUFpRDtvQkFFakQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7Ozs7d0JBS0UsS0FBSztzQkFFTCxLQUFLO3dCQUVMLEtBQUs7eUJBRUwsS0FBSzs7SUFhUiwrQkFBQztDQUFBLEFBN0JELElBNkJDO1NBdkJZLHdCQUF3Qjs7O0lBRW5DLDJDQUErQzs7SUFFL0MseUNBQXNCOztJQUV0Qix1Q0FBcUI7O0lBRXJCLHlDQUFtQzs7SUFFbkMsMENBQXlCOztJQUV6QixxREFBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvbGF5ZXInO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi9zaGFyZWQvb2djLWZpbHRlci5pbnRlcmZhY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tb2djLWZpbHRlci1idXR0b24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9vZ2MtZmlsdGVyLWJ1dHRvbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vb2djLWZpbHRlci1idXR0b24uY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgT2djRmlsdGVyQnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgcHVibGljIG9wdGlvbnM6IE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucztcclxuXHJcbiAgQElucHV0KCkgbGF5ZXI6IExheWVyO1xyXG5cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgQElucHV0KCkgY29sb3I6IHN0cmluZyA9ICdwcmltYXJ5JztcclxuXHJcbiAgQElucHV0KCkgaGVhZGVyOiBib29sZWFuO1xyXG5cclxuICBwdWJsaWMgb2djRmlsdGVyQ29sbGFwc2UgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMubGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zIGFzIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucztcclxuICB9XHJcblxyXG4gIHRvZ2dsZU9nY0ZpbHRlcigpIHtcclxuICAgICAgdGhpcy5vZ2NGaWx0ZXJDb2xsYXBzZSA9ICF0aGlzLm9nY0ZpbHRlckNvbGxhcHNlO1xyXG4gIH1cclxufVxyXG4iXX0=