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
        function () { return getEntityTitle(this.result); },
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
        function () { return getEntityTitleHtml(this.result); },
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
        function () { return getEntityIcon(this.result); },
        enumerable: true,
        configurable: true
    });
    SearchResultsItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-search-results-item',
                    template: "<mat-list-item>\r\n  <mat-icon *ngIf=\"icon\" mat-list-avatar svgIcon=\"{{icon}}\"></mat-icon>\r\n  <h4 matLine *ngIf=\"titleHtml\" [innerHtml]=\"titleHtml\"></h4>\r\n  <h4 matLine *ngIf=\"!titleHtml\">{{title}}</h4>\r\n</mat-list-item>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NlYXJjaC1yZXN1bHRzL3NlYXJjaC1yZXN1bHRzLWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxRSxPQUFPLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7OztBQU9qRjtJQThCRTtJQUFlLENBQUM7SUFkaEIsc0JBQUksNkNBQUs7UUFKVDs7O1dBR0c7Ozs7OztRQUNILGNBQXNCLE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBTTNELHNCQUFJLGlEQUFTO1FBSmI7OztXQUdHOzs7Ozs7UUFDSCxjQUEwQixPQUFPLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBTW5FLHNCQUFJLDRDQUFJO1FBSlI7OztXQUdHOzs7Ozs7UUFDSCxjQUFxQixPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTs7Z0JBNUIxRCxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsNFBBQW1EO29CQUNuRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7Ozs7O3lCQU1FLEtBQUs7O0lBcUJSLGlDQUFDO0NBQUEsQUEvQkQsSUErQkM7U0ExQlksMEJBQTBCOzs7Ozs7SUFLckMsNENBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IGdldEVudGl0eVRpdGxlLCBnZXRFbnRpdHlUaXRsZUh0bWwsIGdldEVudGl0eUljb24gfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi4vc2hhcmVkL3NlYXJjaC5pbnRlcmZhY2VzJztcclxuXHJcbi8qKlxyXG4gKiBTZWFyY2ggcmVzdWx0cyBsaXN0IGl0ZW1cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXNlYXJjaC1yZXN1bHRzLWl0ZW0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWFyY2gtcmVzdWx0cy1pdGVtLmNvbXBvbmVudC5odG1sJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VhcmNoUmVzdWx0c0l0ZW1Db21wb25lbnQge1xyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggcmVzdWx0XHJcbiAgICovXHJcbiAgQElucHV0KCkgcmVzdWx0OiBTZWFyY2hSZXN1bHQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCByZXN1bHQgdGl0bGVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgdGl0bGUoKTogc3RyaW5nIHsgcmV0dXJuIGdldEVudGl0eVRpdGxlKHRoaXMucmVzdWx0KTsgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggcmVzdWx0IEhUTUwgdGl0bGVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgdGl0bGVIdG1sKCk6IHN0cmluZyB7IHJldHVybiBnZXRFbnRpdHlUaXRsZUh0bWwodGhpcy5yZXN1bHQpOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCByZXN1bHQgaWNvblxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBpY29uKCk6IHN0cmluZyB7IHJldHVybiBnZXRFbnRpdHlJY29uKHRoaXMucmVzdWx0KTsgfVxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcbn1cclxuIl19