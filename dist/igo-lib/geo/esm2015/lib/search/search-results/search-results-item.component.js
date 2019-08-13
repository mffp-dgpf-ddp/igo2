/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { getEntityTitle, getEntityTitleHtml, getEntityIcon } from '@igo2/common';
/**
 * Search results list item
 */
export class SearchResultsItemComponent {
    constructor() { }
    /**
     * Search result title
     * \@internal
     * @return {?}
     */
    get title() {
        return getEntityTitle(this.result);
    }
    /**
     * Search result HTML title
     * \@internal
     * @return {?}
     */
    get titleHtml() {
        return getEntityTitleHtml(this.result);
    }
    /**
     * Search result icon
     * \@internal
     * @return {?}
     */
    get icon() {
        return getEntityIcon(this.result);
    }
}
SearchResultsItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-search-results-item',
                template: "<mat-list-item>\r\n  <mat-icon *ngIf=\"icon\" mat-list-avatar svgIcon=\"{{icon}}\"></mat-icon>\r\n  <h4 matLine *ngIf=\"titleHtml\" [innerHtml]=\"titleHtml\"></h4>\r\n  <h4 matLine *ngIf=\"!titleHtml\">{{title}}</h4>\r\n</mat-list-item>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["h4 :ng-deep small{color:\"#8C8C8C\"}"]
            }] }
];
/** @nocollapse */
SearchResultsItemComponent.ctorParameters = () => [];
SearchResultsItemComponent.propDecorators = {
    result: [{ type: Input }]
};
if (false) {
    /**
     * Search result
     * @type {?}
     */
    SearchResultsItemComponent.prototype.result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NlYXJjaC1yZXN1bHRzL3NlYXJjaC1yZXN1bHRzLWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxRSxPQUFPLEVBQ0wsY0FBYyxFQUNkLGtCQUFrQixFQUNsQixhQUFhLEVBQ2QsTUFBTSxjQUFjLENBQUM7Ozs7QUFhdEIsTUFBTSxPQUFPLDBCQUEwQjtJQThCckMsZ0JBQWUsQ0FBQzs7Ozs7O0lBcEJoQixJQUFJLEtBQUs7UUFDUCxPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckMsQ0FBQzs7Ozs7O0lBTUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekMsQ0FBQzs7Ozs7O0lBTUQsSUFBSSxJQUFJO1FBQ04sT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7OztZQWxDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsNFBBQW1EO2dCQUVuRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs7O3FCQUtFLEtBQUs7Ozs7Ozs7SUFBTiw0Q0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtcclxuICBnZXRFbnRpdHlUaXRsZSxcclxuICBnZXRFbnRpdHlUaXRsZUh0bWwsXHJcbiAgZ2V0RW50aXR5SWNvblxyXG59IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQgfSBmcm9tICcuLi9zaGFyZWQvc2VhcmNoLmludGVyZmFjZXMnO1xyXG5cclxuLyoqXHJcbiAqIFNlYXJjaCByZXN1bHRzIGxpc3QgaXRlbVxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tc2VhcmNoLXJlc3VsdHMtaXRlbScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NlYXJjaC1yZXN1bHRzLWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3NlYXJjaC1yZXN1bHRzLWl0ZW0uY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VhcmNoUmVzdWx0c0l0ZW1Db21wb25lbnQge1xyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCByZXN1bHRcclxuICAgKi9cclxuICBASW5wdXQoKSByZXN1bHQ6IFNlYXJjaFJlc3VsdDtcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHJlc3VsdCB0aXRsZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCB0aXRsZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGdldEVudGl0eVRpdGxlKHRoaXMucmVzdWx0KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCByZXN1bHQgSFRNTCB0aXRsZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCB0aXRsZUh0bWwoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBnZXRFbnRpdHlUaXRsZUh0bWwodGhpcy5yZXN1bHQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHJlc3VsdCBpY29uXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IGljb24oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBnZXRFbnRpdHlJY29uKHRoaXMucmVzdWx0KTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG4iXX0=