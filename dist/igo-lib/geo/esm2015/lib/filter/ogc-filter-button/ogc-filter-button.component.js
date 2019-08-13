/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Layer } from '../../layer/shared/layers/layer';
import { IgoMap } from '../../map';
export class OgcFilterButtonComponent {
    constructor() {
        this.color = 'primary';
        this.ogcFilterCollapse = false;
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
    /**
     * @return {?}
     */
    toggleOgcFilter() {
        if (this.layer.isInResolutionsRange) {
            this.ogcFilterCollapse = !this.ogcFilterCollapse;
        }
    }
}
OgcFilterButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-ogc-filter-button',
                template: "<button *ngIf=\"ogcFiltersInLayers && options.ogcFilters && (options.ogcFilters.enabled\r\n&& options.ogcFilters.editable)\"\r\n  mat-icon-button\r\n  collapsibleButton\r\n  tooltip-position=\"below\"\r\n  matTooltipShowDelay=\"500\"\r\n  [matTooltip]=\"'igo.geo.filter.filterBy' | translate\"\r\n  [color]=\"color\"\r\n  (click)=\"toggleOgcFilter()\">\r\n  <mat-icon\r\n    [ngClass]='{disabled: !layer.isInResolutionsRange}'svgIcon=\"filter\"></mat-icon>\r\n</button>\r\n\r\n<div #ogcFilter class=\"igo-layer-actions-container\"\r\n*ngIf=\"options.ogcFilters && (options.ogcFilters.enabled\r\n&& options.ogcFilters.editable)\">\r\n  <igo-ogc-filterable-item\r\n    *ngIf=\"ogcFilterCollapse && options.ogcFilters.enabled\"\r\n    igoListItem\r\n    [ogcFiltersHeaderShown]=\"false\"\r\n    [map]=\"layer.map\"\r\n    [layer]=\"layer\">\r\n  </igo-ogc-filterable-item>\r\n</div>\r\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlci1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ZpbHRlci9vZ2MtZmlsdGVyLWJ1dHRvbi9vZ2MtZmlsdGVyLWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN4RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBU25DLE1BQU0sT0FBTyx3QkFBd0I7SUFtQm5DO1FBYlMsVUFBSyxHQUFXLFNBQVMsQ0FBQztRQVc1QixzQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFFbEIsQ0FBQzs7OztJQVRoQixJQUFJLE9BQU87UUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNmLE9BQU87U0FDUjtRQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO0lBQ3ZDLENBQUM7Ozs7SUFNRCxlQUFlO1FBQ2IsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFO1lBQ25DLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztTQUNsRDtJQUNILENBQUM7OztZQS9CRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsKzNCQUFpRDtnQkFFakQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7OztvQkFHRSxLQUFLO2tCQUVMLEtBQUs7b0JBRUwsS0FBSztpQ0FFTCxLQUFLOzs7O0lBTk4seUNBQXNCOztJQUV0Qix1Q0FBcUI7O0lBRXJCLHlDQUFtQzs7SUFFbkMsc0RBQXFDOztJQVNyQyxxREFBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2xheWVyJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuaW1wb3J0IHsgT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vc2hhcmVkL29nYy1maWx0ZXIuaW50ZXJmYWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLW9nYy1maWx0ZXItYnV0dG9uJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vb2djLWZpbHRlci1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL29nYy1maWx0ZXItYnV0dG9uLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIE9nY0ZpbHRlckJ1dHRvbkNvbXBvbmVudCB7XHJcblxyXG4gIEBJbnB1dCgpIGxheWVyOiBMYXllcjtcclxuXHJcbiAgQElucHV0KCkgbWFwOiBJZ29NYXA7XHJcblxyXG4gIEBJbnB1dCgpIGNvbG9yOiBzdHJpbmcgPSAncHJpbWFyeSc7XHJcblxyXG4gIEBJbnB1dCgpIG9nY0ZpbHRlcnNJbkxheWVyczogYm9vbGVhbjtcclxuXHJcbiAgZ2V0IG9wdGlvbnMoKTogT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zIHtcclxuICAgIGlmICghdGhpcy5sYXllcikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5sYXllci5kYXRhU291cmNlLm9wdGlvbnM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb2djRmlsdGVyQ29sbGFwc2UgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICB0b2dnbGVPZ2NGaWx0ZXIoKSB7XHJcbiAgICBpZiAodGhpcy5sYXllci5pc0luUmVzb2x1dGlvbnNSYW5nZSkge1xyXG4gICAgICB0aGlzLm9nY0ZpbHRlckNvbGxhcHNlID0gIXRoaXMub2djRmlsdGVyQ29sbGFwc2U7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==