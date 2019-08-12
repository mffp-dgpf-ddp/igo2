/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Self, Optional, ChangeDetectorRef } from '@angular/core';
import { RouteService } from '@igo2/core';
import { SearchBarComponent } from './search-bar.component';
export class SearchUrlParamDirective {
    /**
     * @param {?} component
     * @param {?} ref
     * @param {?} route
     */
    constructor(component, ref, route) {
        this.component = component;
        this.ref = ref;
        this.route = route;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.route && this.route.options.searchKey) {
            this.route.queryParams.subscribe((/**
             * @param {?} params
             * @return {?}
             */
            params => {
                /** @type {?} */
                const searchParams = params[(/** @type {?} */ (this.route.options.searchKey))];
                if (searchParams) {
                    this.component.setTerm(searchParams);
                    this.ref.detectChanges();
                }
            }));
        }
    }
}
SearchUrlParamDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoSearchUrlParam]'
            },] }
];
/** @nocollapse */
SearchUrlParamDirective.ctorParameters = () => [
    { type: SearchBarComponent, decorators: [{ type: Self }] },
    { type: ChangeDetectorRef },
    { type: RouteService, decorators: [{ type: Optional }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    SearchUrlParamDirective.prototype.component;
    /**
     * @type {?}
     * @private
     */
    SearchUrlParamDirective.prototype.ref;
    /**
     * @type {?}
     * @private
     */
    SearchUrlParamDirective.prototype.route;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXVybC1wYXJhbS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NlYXJjaC1iYXIvc2VhcmNoLXVybC1wYXJhbS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsSUFBSSxFQUVKLFFBQVEsRUFDUixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFlBQVksQ0FBQztBQUUxQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUs1RCxNQUFNLE9BQU8sdUJBQXVCOzs7Ozs7SUFDbEMsWUFDa0IsU0FBNkIsRUFDckMsR0FBc0IsRUFDVixLQUFtQjtRQUZ2QixjQUFTLEdBQVQsU0FBUyxDQUFvQjtRQUNyQyxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUNWLFVBQUssR0FBTCxLQUFLLENBQWM7SUFDdEMsQ0FBQzs7OztJQUVKLFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFO1lBQzlDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVM7Ozs7WUFBQyxNQUFNLENBQUMsRUFBRTs7c0JBQ2xDLFlBQVksR0FBRyxNQUFNLENBQUMsbUJBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFVLENBQUM7Z0JBQ25FLElBQUksWUFBWSxFQUFFO29CQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztpQkFDMUI7WUFDSCxDQUFDLEVBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7O1lBcEJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2FBQ2hDOzs7O1lBSlEsa0JBQWtCLHVCQU90QixJQUFJO1lBWlAsaUJBQWlCO1lBR1YsWUFBWSx1QkFXaEIsUUFBUTs7Ozs7OztJQUZULDRDQUE2Qzs7Ozs7SUFDN0Msc0NBQThCOzs7OztJQUM5Qix3Q0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBTZWxmLFxyXG4gIE9uSW5pdCxcclxuICBPcHRpb25hbCxcclxuICBDaGFuZ2VEZXRlY3RvclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgUm91dGVTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTZWFyY2hCYXJDb21wb25lbnQgfSBmcm9tICcuL3NlYXJjaC1iYXIuY29tcG9uZW50JztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2lnb1NlYXJjaFVybFBhcmFtXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFNlYXJjaFVybFBhcmFtRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBTZWxmKCkgcHJpdmF0ZSBjb21wb25lbnQ6IFNlYXJjaEJhckNvbXBvbmVudCxcclxuICAgIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcm91dGU6IFJvdXRlU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5yb3V0ZSAmJiB0aGlzLnJvdXRlLm9wdGlvbnMuc2VhcmNoS2V5KSB7XHJcbiAgICAgIHRoaXMucm91dGUucXVlcnlQYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gcGFyYW1zW3RoaXMucm91dGUub3B0aW9ucy5zZWFyY2hLZXkgYXMgc3RyaW5nXTtcclxuICAgICAgICBpZiAoc2VhcmNoUGFyYW1zKSB7XHJcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRUZXJtKHNlYXJjaFBhcmFtcyk7XHJcbiAgICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19