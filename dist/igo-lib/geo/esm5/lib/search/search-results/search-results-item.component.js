/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { getEntityTitle, getEntityTitleHtml, getEntityIcon } from '@igo2/common';
/**
 * Search results list item
 */
var SearchResultsItemComponent = /** @class */ (function () {
    function SearchResultsItemComponent() {
    }
    Object.defineProperty(SearchResultsItemComponent.prototype, "title", {
        /**
         * Search result title
         * @internal
         */
        get: /**
         * Search result title
         * \@internal
         * @return {?}
         */
        function () {
            return getEntityTitle(this.result);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchResultsItemComponent.prototype, "titleHtml", {
        /**
         * Search result HTML title
         * @internal
         */
        get: /**
         * Search result HTML title
         * \@internal
         * @return {?}
         */
        function () {
            return getEntityTitleHtml(this.result);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchResultsItemComponent.prototype, "icon", {
        /**
         * Search result icon
         * @internal
         */
        get: /**
         * Search result icon
         * \@internal
         * @return {?}
         */
        function () {
            return getEntityIcon(this.result);
        },
        enumerable: true,
        configurable: true
    });
    SearchResultsItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-search-results-item',
                    template: "<mat-list-item>\r\n  <mat-icon *ngIf=\"icon\" mat-list-avatar svgIcon=\"{{icon}}\"></mat-icon>\r\n  <h4 matLine *ngIf=\"titleHtml\" [innerHtml]=\"titleHtml\"></h4>\r\n  <h4 matLine *ngIf=\"!titleHtml\">{{title}}</h4>\r\n</mat-list-item>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["h4 :ng-deep small{color:\"#8C8C8C\"}"]
                }] }
    ];
    /** @nocollapse */
    SearchResultsItemComponent.ctorParameters = function () { return []; };
    SearchResultsItemComponent.propDecorators = {
        result: [{ type: Input }]
    };
    return SearchResultsItemComponent;
}());
export { SearchResultsItemComponent };
if (false) {
    /**
     * Search result
     * @type {?}
     */
    SearchResultsItemComponent.prototype.result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NlYXJjaC1yZXN1bHRzL3NlYXJjaC1yZXN1bHRzLWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxRSxPQUFPLEVBQ0wsY0FBYyxFQUNkLGtCQUFrQixFQUNsQixhQUFhLEVBQ2QsTUFBTSxjQUFjLENBQUM7Ozs7QUFPdEI7SUFvQ0U7SUFBZSxDQUFDO0lBcEJoQixzQkFBSSw2Q0FBSztRQUpUOzs7V0FHRzs7Ozs7O1FBQ0g7WUFDRSxPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckMsQ0FBQzs7O09BQUE7SUFNRCxzQkFBSSxpREFBUztRQUpiOzs7V0FHRzs7Ozs7O1FBQ0g7WUFDRSxPQUFPLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxDQUFDOzs7T0FBQTtJQU1ELHNCQUFJLDRDQUFJO1FBSlI7OztXQUdHOzs7Ozs7UUFDSDtZQUNFLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQyxDQUFDOzs7T0FBQTs7Z0JBbENGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUseUJBQXlCO29CQUNuQyw0UEFBbUQ7b0JBRW5ELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozs7O3lCQUtFLEtBQUs7O0lBMkJSLGlDQUFDO0NBQUEsQUFyQ0QsSUFxQ0M7U0EvQlksMEJBQTBCOzs7Ozs7SUFJckMsNENBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7XHJcbiAgZ2V0RW50aXR5VGl0bGUsXHJcbiAgZ2V0RW50aXR5VGl0bGVIdG1sLFxyXG4gIGdldEVudGl0eUljb25cclxufSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi4vc2hhcmVkL3NlYXJjaC5pbnRlcmZhY2VzJztcclxuXHJcbi8qKlxyXG4gKiBTZWFyY2ggcmVzdWx0cyBsaXN0IGl0ZW1cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXNlYXJjaC1yZXN1bHRzLWl0ZW0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWFyY2gtcmVzdWx0cy1pdGVtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zZWFyY2gtcmVzdWx0cy1pdGVtLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFNlYXJjaFJlc3VsdHNJdGVtQ29tcG9uZW50IHtcclxuICAvKipcclxuICAgKiBTZWFyY2ggcmVzdWx0XHJcbiAgICovXHJcbiAgQElucHV0KCkgcmVzdWx0OiBTZWFyY2hSZXN1bHQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCByZXN1bHQgdGl0bGVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgdGl0bGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBnZXRFbnRpdHlUaXRsZSh0aGlzLnJlc3VsdCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggcmVzdWx0IEhUTUwgdGl0bGVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgdGl0bGVIdG1sKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZ2V0RW50aXR5VGl0bGVIdG1sKHRoaXMucmVzdWx0KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCByZXN1bHQgaWNvblxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBpY29uKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZ2V0RW50aXR5SWNvbih0aGlzLnJlc3VsdCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcbn1cclxuIl19