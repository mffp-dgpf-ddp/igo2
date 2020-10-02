/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Self, Optional, ChangeDetectorRef } from '@angular/core';
import { RouteService } from '@igo2/core';
import { SearchBarComponent } from './search-bar.component';
var SearchUrlParamDirective = /** @class */ (function () {
    function SearchUrlParamDirective(component, ref, route) {
        this.component = component;
        this.ref = ref;
        this.route = route;
    }
    /**
     * @return {?}
     */
    SearchUrlParamDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.route && this.route.options.searchKey) {
            this.route.queryParams.subscribe((/**
             * @param {?} params
             * @return {?}
             */
            function (params) {
                /** @type {?} */
                var searchParams = params[(/** @type {?} */ (_this.route.options.searchKey))];
                if (searchParams) {
                    _this.component.setTerm(searchParams);
                    _this.ref.detectChanges();
                }
            }));
        }
    };
    SearchUrlParamDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoSearchUrlParam]'
                },] }
    ];
    /** @nocollapse */
    SearchUrlParamDirective.ctorParameters = function () { return [
        { type: SearchBarComponent, decorators: [{ type: Self }] },
        { type: ChangeDetectorRef },
        { type: RouteService, decorators: [{ type: Optional }] }
    ]; };
    return SearchUrlParamDirective;
}());
export { SearchUrlParamDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXVybC1wYXJhbS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NlYXJjaC1iYXIvc2VhcmNoLXVybC1wYXJhbS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsSUFBSSxFQUVKLFFBQVEsRUFDUixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFlBQVksQ0FBQztBQUUxQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU1RDtJQUlFLGlDQUNrQixTQUE2QixFQUNyQyxHQUFzQixFQUNWLEtBQW1CO1FBRnZCLGNBQVMsR0FBVCxTQUFTLENBQW9CO1FBQ3JDLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ1YsVUFBSyxHQUFMLEtBQUssQ0FBYztJQUN0QyxDQUFDOzs7O0lBRUosMENBQVE7OztJQUFSO1FBQUEsaUJBVUM7UUFUQyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFO1lBQzlDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVM7Ozs7WUFBQyxVQUFBLE1BQU07O29CQUMvQixZQUFZLEdBQUcsTUFBTSxDQUFDLG1CQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBVSxDQUFDO2dCQUNuRSxJQUFJLFlBQVksRUFBRTtvQkFDaEIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQ3JDLEtBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7aUJBQzFCO1lBQ0gsQ0FBQyxFQUFDLENBQUM7U0FDSjtJQUNILENBQUM7O2dCQXBCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtpQkFDaEM7Ozs7Z0JBSlEsa0JBQWtCLHVCQU90QixJQUFJO2dCQVpQLGlCQUFpQjtnQkFHVixZQUFZLHVCQVdoQixRQUFROztJQWNiLDhCQUFDO0NBQUEsQUFyQkQsSUFxQkM7U0FsQlksdUJBQXVCOzs7Ozs7SUFFaEMsNENBQTZDOzs7OztJQUM3QyxzQ0FBOEI7Ozs7O0lBQzlCLHdDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIFNlbGYsXHJcbiAgT25Jbml0LFxyXG4gIE9wdGlvbmFsLFxyXG4gIENoYW5nZURldGVjdG9yUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBSb3V0ZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7IFNlYXJjaEJhckNvbXBvbmVudCB9IGZyb20gJy4vc2VhcmNoLWJhci5jb21wb25lbnQnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaWdvU2VhcmNoVXJsUGFyYW1dJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VhcmNoVXJsUGFyYW1EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQFNlbGYoKSBwcml2YXRlIGNvbXBvbmVudDogU2VhcmNoQmFyQ29tcG9uZW50LFxyXG4gICAgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByb3V0ZTogUm91dGVTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmICh0aGlzLnJvdXRlICYmIHRoaXMucm91dGUub3B0aW9ucy5zZWFyY2hLZXkpIHtcclxuICAgICAgdGhpcy5yb3V0ZS5xdWVyeVBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuICAgICAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSBwYXJhbXNbdGhpcy5yb3V0ZS5vcHRpb25zLnNlYXJjaEtleSBhcyBzdHJpbmddO1xyXG4gICAgICAgIGlmIChzZWFyY2hQYXJhbXMpIHtcclxuICAgICAgICAgIHRoaXMuY29tcG9uZW50LnNldFRlcm0oc2VhcmNoUGFyYW1zKTtcclxuICAgICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=