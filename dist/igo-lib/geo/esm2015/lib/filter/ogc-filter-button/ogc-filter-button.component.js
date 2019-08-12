/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Layer } from '../../layer/shared/layers/layer';
import { IgoMap } from '../../map';
export class OgcFilterButtonComponent {
    constructor() {
        this._color = 'primary';
        this.ogcFilterCollapse = false;
        this._ogcFiltersInLayers = false;
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
    get map() {
        return this._map;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set map(value) {
        this._map = value;
    }
    /**
     * @return {?}
     */
    get color() {
        return this._color;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set color(value) {
        this._color = value;
    }
    /**
     * @return {?}
     */
    get ogcFiltersInLayers() {
        return this._ogcFiltersInLayers;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set ogcFiltersInLayers(value) {
        this._ogcFiltersInLayers = value;
    }
    /**
     * @return {?}
     */
    toggleOgcFilter() {
        if (this.layer.isInResolutionsRange) {
            this.ogcFilterCollapse = !this.ogcFilterCollapse;
        }
    }
    /**
     * @return {?}
     */
    get options() {
        if (!this.layer) {
            return;
        }
        return this.layer.dataSource.options;
    }
}
OgcFilterButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-ogc-filter-button',
                template: "<button *ngIf=\"ogcFiltersInLayers && options.ogcFilters && (options.ogcFilters.enabled\r\n&& options.ogcFilters.editable)\"\r\n  mat-icon-button\r\n  collapsibleButton\r\n  tooltip-position=\"below\"\r\n  matTooltipShowDelay=\"500\"\r\n  [matTooltip]=\"'igo.geo.filter.filterBy' | translate\"\r\n  [color]=\"color\"\r\n  (click)=\"toggleOgcFilter()\">\r\n  <mat-icon\r\n    [ngClass]='{disabled: !layer.isInResolutionsRange}'>\r\n    filter_list\r\n  </mat-icon>\r\n</button>\r\n\r\n<div #ogcFilter class=\"igo-layer-actions-container\"\r\n*ngIf=\"options.ogcFilters && (options.ogcFilters.enabled\r\n&& options.ogcFilters.editable)\">\r\n  <igo-ogc-filterable-item\r\n    *ngIf=\"ogcFilterCollapse && options.ogcFilters.enabled\"\r\n    igoListItem\r\n    [ogcFiltersHeaderShown]=\"false\"\r\n    [map]=\"layer.map\"\r\n    [layer]=\"layer\">\r\n  </igo-ogc-filterable-item>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            }] }
];
/** @nocollapse */
OgcFilterButtonComponent.ctorParameters = () => [];
OgcFilterButtonComponent.propDecorators = {
    layer: [{ type: Input }],
    map: [{ type: Input }],
    color: [{ type: Input }],
    ogcFiltersInLayers: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    OgcFilterButtonComponent.prototype._layer;
    /**
     * @type {?}
     * @private
     */
    OgcFilterButtonComponent.prototype._map;
    /**
     * @type {?}
     * @private
     */
    OgcFilterButtonComponent.prototype._color;
    /** @type {?} */
    OgcFilterButtonComponent.prototype.ogcFilterCollapse;
    /**
     * @type {?}
     * @private
     */
    OgcFilterButtonComponent.prototype._ogcFiltersInLayers;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlci1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ZpbHRlci9vZ2MtZmlsdGVyLWJ1dHRvbi9vZ2MtZmlsdGVyLWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN4RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBU25DLE1BQU0sT0FBTyx3QkFBd0I7SUF1Q25DO1FBYlEsV0FBTSxHQUFHLFNBQVMsQ0FBQztRQUVwQixzQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFTekIsd0JBQW1CLEdBQUcsS0FBSyxDQUFDO0lBRXJCLENBQUM7Ozs7SUF0Q2hCLElBQ0ksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDOzs7OztJQUNELElBQUksS0FBSyxDQUFDLEtBQVk7UUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQzs7OztJQUdELElBQ0ksR0FBRztRQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDOzs7OztJQUNELElBQUksR0FBRyxDQUFDLEtBQWE7UUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7SUFDcEIsQ0FBQzs7OztJQUdELElBQ0ksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDOzs7OztJQUNELElBQUksS0FBSyxDQUFDLEtBQWE7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQzs7OztJQUtELElBQ0ksa0JBQWtCO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO0lBQ2xDLENBQUM7Ozs7O0lBQ0QsSUFBSSxrQkFBa0IsQ0FBQyxLQUFjO1FBQ25DLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7SUFDbkMsQ0FBQzs7OztJQUtELGVBQWU7UUFDYixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEVBQUU7WUFDbkMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1NBQ2xEO0lBQ0gsQ0FBQzs7OztJQUVELElBQUksT0FBTztRQUNULElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2YsT0FBTztTQUNSO1FBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7SUFDdkMsQ0FBQzs7O1lBMURGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxzNEJBQWlEO2dCQUVqRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs7O29CQUVFLEtBQUs7a0JBU0wsS0FBSztvQkFTTCxLQUFLO2lDQVdMLEtBQUs7Ozs7Ozs7SUF0Qk4sMENBQXNCOzs7OztJQVN0Qix3Q0FBcUI7Ozs7O0lBU3JCLDBDQUEyQjs7SUFFM0IscURBQWlDOzs7OztJQVNqQyx1REFBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2xheWVyJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuaW1wb3J0IHsgT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vc2hhcmVkL29nYy1maWx0ZXIuaW50ZXJmYWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLW9nYy1maWx0ZXItYnV0dG9uJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vb2djLWZpbHRlci1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL29nYy1maWx0ZXItYnV0dG9uLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIE9nY0ZpbHRlckJ1dHRvbkNvbXBvbmVudCB7XHJcbiAgQElucHV0KClcclxuICBnZXQgbGF5ZXIoKTogTGF5ZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xheWVyO1xyXG4gIH1cclxuICBzZXQgbGF5ZXIodmFsdWU6IExheWVyKSB7XHJcbiAgICB0aGlzLl9sYXllciA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9sYXllcjogTGF5ZXI7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAge1xyXG4gICAgcmV0dXJuIHRoaXMuX21hcDtcclxuICB9XHJcbiAgc2V0IG1hcCh2YWx1ZTogSWdvTWFwKSB7XHJcbiAgICB0aGlzLl9tYXAgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfbWFwOiBJZ29NYXA7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGNvbG9yKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xyXG4gIH1cclxuICBzZXQgY29sb3IodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5fY29sb3IgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfY29sb3IgPSAncHJpbWFyeSc7XHJcblxyXG4gIHB1YmxpYyBvZ2NGaWx0ZXJDb2xsYXBzZSA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBvZ2NGaWx0ZXJzSW5MYXllcnMoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fb2djRmlsdGVyc0luTGF5ZXJzO1xyXG4gIH1cclxuICBzZXQgb2djRmlsdGVyc0luTGF5ZXJzKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9vZ2NGaWx0ZXJzSW5MYXllcnMgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfb2djRmlsdGVyc0luTGF5ZXJzID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgdG9nZ2xlT2djRmlsdGVyKCkge1xyXG4gICAgaWYgKHRoaXMubGF5ZXIuaXNJblJlc29sdXRpb25zUmFuZ2UpIHtcclxuICAgICAgdGhpcy5vZ2NGaWx0ZXJDb2xsYXBzZSA9ICF0aGlzLm9nY0ZpbHRlckNvbGxhcHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IG9wdGlvbnMoKTogT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zIHtcclxuICAgIGlmICghdGhpcy5sYXllcikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5sYXllci5kYXRhU291cmNlLm9wdGlvbnM7XHJcbiAgfVxyXG59XHJcbiJdfQ==