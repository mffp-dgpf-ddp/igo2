/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { SEARCH_TYPES } from '../shared/search.enums';
import { SearchSourceService } from '../shared/search-source.service';
/**
 * This component allows a user to select a search type yo enable. In it's
 * current version, only one search type can be selected at once (radio). If
 * this component were to support more than one search source enabled (checkbox),
 * the searchbar component would require a small change to it's
 * placeholder getter. The search source service already supports having
 * more than one search source enabled.
 */
var SearchSelectorComponent = /** @class */ (function () {
    function SearchSelectorComponent(searchSourceService) {
        this.searchSourceService = searchSourceService;
        /**
         * List of available search types
         */
        this.searchTypes = SEARCH_TYPES;
        /**
         * Event emitted when the enabled search type changes
         */
        this.change = new EventEmitter();
    }
    /**
     * Enable the first search type if the enabled input is not defined
     * @internal
     */
    /**
     * Enable the first search type if the enabled input is not defined
     * \@internal
     * @return {?}
     */
    SearchSelectorComponent.prototype.ngOnInit = /**
     * Enable the first search type if the enabled input is not defined
     * \@internal
     * @return {?}
     */
    function () {
        /** @type {?} */
        var initial = this.enabled || this.searchTypes[0];
        this.enableSearchType(initial);
    };
    /**
     * Enable the selected search type
     * @param searchType Search type
     * @internal
     */
    /**
     * Enable the selected search type
     * \@internal
     * @param {?} searchType Search type
     * @return {?}
     */
    SearchSelectorComponent.prototype.onSearchTypeChange = /**
     * Enable the selected search type
     * \@internal
     * @param {?} searchType Search type
     * @return {?}
     */
    function (searchType) {
        this.enableSearchType(searchType);
    };
    /**
     * Get a search type's title. The title
     * for all availables search typers needs to be defined in the locale
     * files or an error will be thrown.
     * @param searchType Search type
     * @internal
     */
    /**
     * Get a search type's title. The title
     * for all availables search typers needs to be defined in the locale
     * files or an error will be thrown.
     * \@internal
     * @param {?} searchType Search type
     * @return {?}
     */
    SearchSelectorComponent.prototype.getSearchTypeTitle = /**
     * Get a search type's title. The title
     * for all availables search typers needs to be defined in the locale
     * files or an error will be thrown.
     * \@internal
     * @param {?} searchType Search type
     * @return {?}
     */
    function (searchType) {
        return "search." + searchType.toLowerCase() + ".title";
    };
    /**
     * Emit an event and enable the search sources of the given type.
     * @param searchType Search type
     */
    /**
     * Emit an event and enable the search sources of the given type.
     * @private
     * @param {?} searchType Search type
     * @return {?}
     */
    SearchSelectorComponent.prototype.enableSearchType = /**
     * Emit an event and enable the search sources of the given type.
     * @private
     * @param {?} searchType Search type
     * @return {?}
     */
    function (searchType) {
        this.enabled = searchType;
        this.searchSourceService.enableSourcesByType(searchType);
        this.change.emit(searchType);
    };
    SearchSelectorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-search-selector',
                    template: "<div class=\"igo-search-selector\">\r\n  <button\r\n    mat-icon-button\r\n    class=\"igo-search-selector-button\"\r\n    color=\"primary\"\r\n    tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"'igo.geo.search.menu.tooltip' | translate\"\r\n    [matMenuTriggerFor]=\"searchSelectorMenu\">\r\n    <mat-icon svgIcon=\"menu-down\"></mat-icon>\r\n  </button>\r\n\r\n  <mat-menu\r\n    #searchSelectorMenu=\"matMenu\"\r\n    class=\"no-border-radius\"\r\n    overlapTrigger=\"false\"\r\n    xPosition=\"before\"\r\n    yPosition=\"above\">\r\n    <mat-radio-group\r\n      class=\"igo-search-selector-radio-group\"\r\n      [value]=\"enabled\"\r\n      (change)=\"onSearchTypeChange($event.value)\">\r\n      <mat-radio-button *ngFor=\"let searchType of searchTypes\" [value]=\"searchType\">\r\n        {{getSearchTypeTitle(searchType) | translate}}\r\n      </mat-radio-button>\r\n    </mat-radio-group>\r\n  </mat-menu>\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".igo-search-selector-button ::ng-deep div.mat-button-ripple-round{border-radius:0}.igo-search-selector-radio-group{display:inline-flex;flex-direction:column}.igo-search-selector-radio-group mat-radio-button{margin:5px}"]
                }] }
    ];
    /** @nocollapse */
    SearchSelectorComponent.ctorParameters = function () { return [
        { type: SearchSourceService }
    ]; };
    SearchSelectorComponent.propDecorators = {
        searchTypes: [{ type: Input }],
        enabled: [{ type: Input }],
        change: [{ type: Output }]
    };
    return SearchSelectorComponent;
}());
export { SearchSelectorComponent };
if (false) {
    /**
     * List of available search types
     * @type {?}
     */
    SearchSelectorComponent.prototype.searchTypes;
    /**
     * The search type enabled
     * @type {?}
     */
    SearchSelectorComponent.prototype.enabled;
    /**
     * Event emitted when the enabled search type changes
     * @type {?}
     */
    SearchSelectorComponent.prototype.change;
    /**
     * @type {?}
     * @private
     */
    SearchSelectorComponent.prototype.searchSourceService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXNlbGVjdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gvc2VhcmNoLXNlbGVjdG9yL3NlYXJjaC1zZWxlY3Rvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBRVosdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7Ozs7O0FBVXRFO0lBdUJFLGlDQUFvQixtQkFBd0M7UUFBeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjs7OztRQVpuRCxnQkFBVyxHQUFhLFlBQVksQ0FBQzs7OztRQVVwQyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUVpQixDQUFDO0lBRWhFOzs7T0FHRzs7Ozs7O0lBQ0gsMENBQVE7Ozs7O0lBQVI7O1lBQ1EsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gsb0RBQWtCOzs7Ozs7SUFBbEIsVUFBbUIsVUFBa0I7UUFDbkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7Ozs7O09BTUc7Ozs7Ozs7OztJQUNILG9EQUFrQjs7Ozs7Ozs7SUFBbEIsVUFBbUIsVUFBa0I7UUFDbkMsT0FBTyxZQUFVLFVBQVUsQ0FBQyxXQUFXLEVBQUUsV0FBUSxDQUFDO0lBQ3BELENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7SUFDSyxrREFBZ0I7Ozs7OztJQUF4QixVQUF5QixVQUFrQjtRQUN6QyxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztRQUMxQixJQUFJLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7Z0JBOURGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixvOUJBQStDO29CQUUvQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQWZRLG1CQUFtQjs7OzhCQXFCekIsS0FBSzswQkFLTCxLQUFLO3lCQUtMLE1BQU07O0lBMkNULDhCQUFDO0NBQUEsQUFoRUQsSUFnRUM7U0ExRFksdUJBQXVCOzs7Ozs7SUFLbEMsOENBQThDOzs7OztJQUs5QywwQ0FBeUI7Ozs7O0lBS3pCLHlDQUE4Qzs7Ozs7SUFFbEMsc0RBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPbkluaXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFNFQVJDSF9UWVBFUyB9IGZyb20gJy4uL3NoYXJlZC9zZWFyY2guZW51bXMnO1xyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2VTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlYXJjaC1zb3VyY2Uuc2VydmljZSc7XHJcblxyXG4vKipcclxuICogVGhpcyBjb21wb25lbnQgYWxsb3dzIGEgdXNlciB0byBzZWxlY3QgYSBzZWFyY2ggdHlwZSB5byBlbmFibGUuIEluIGl0J3NcclxuICogY3VycmVudCB2ZXJzaW9uLCBvbmx5IG9uZSBzZWFyY2ggdHlwZSBjYW4gYmUgc2VsZWN0ZWQgYXQgb25jZSAocmFkaW8pLiBJZlxyXG4gKiB0aGlzIGNvbXBvbmVudCB3ZXJlIHRvIHN1cHBvcnQgbW9yZSB0aGFuIG9uZSBzZWFyY2ggc291cmNlIGVuYWJsZWQgKGNoZWNrYm94KSxcclxuICogdGhlIHNlYXJjaGJhciBjb21wb25lbnQgd291bGQgcmVxdWlyZSBhIHNtYWxsIGNoYW5nZSB0byBpdCdzXHJcbiAqIHBsYWNlaG9sZGVyIGdldHRlci4gVGhlIHNlYXJjaCBzb3VyY2Ugc2VydmljZSBhbHJlYWR5IHN1cHBvcnRzIGhhdmluZ1xyXG4gKiBtb3JlIHRoYW4gb25lIHNlYXJjaCBzb3VyY2UgZW5hYmxlZC5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXNlYXJjaC1zZWxlY3RvcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NlYXJjaC1zZWxlY3Rvci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc2VhcmNoLXNlbGVjdG9yLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFNlYXJjaFNlbGVjdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgLyoqXHJcbiAgICogTGlzdCBvZiBhdmFpbGFibGUgc2VhcmNoIHR5cGVzXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2VhcmNoVHlwZXM6IHN0cmluZ1tdID0gU0VBUkNIX1RZUEVTO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc2VhcmNoIHR5cGUgZW5hYmxlZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGVuYWJsZWQ6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBlbmFibGVkIHNlYXJjaCB0eXBlIGNoYW5nZXNcclxuICAgKi9cclxuICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VhcmNoU291cmNlU2VydmljZTogU2VhcmNoU291cmNlU2VydmljZSkge31cclxuXHJcbiAgLyoqXHJcbiAgICogRW5hYmxlIHRoZSBmaXJzdCBzZWFyY2ggdHlwZSBpZiB0aGUgZW5hYmxlZCBpbnB1dCBpcyBub3QgZGVmaW5lZFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgY29uc3QgaW5pdGlhbCA9IHRoaXMuZW5hYmxlZCB8fCB0aGlzLnNlYXJjaFR5cGVzWzBdO1xyXG4gICAgdGhpcy5lbmFibGVTZWFyY2hUeXBlKGluaXRpYWwpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRW5hYmxlIHRoZSBzZWxlY3RlZCBzZWFyY2ggdHlwZVxyXG4gICAqIEBwYXJhbSBzZWFyY2hUeXBlIFNlYXJjaCB0eXBlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25TZWFyY2hUeXBlQ2hhbmdlKHNlYXJjaFR5cGU6IHN0cmluZykge1xyXG4gICAgdGhpcy5lbmFibGVTZWFyY2hUeXBlKHNlYXJjaFR5cGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGEgc2VhcmNoIHR5cGUncyB0aXRsZS4gVGhlIHRpdGxlXHJcbiAgICogZm9yIGFsbCBhdmFpbGFibGVzIHNlYXJjaCB0eXBlcnMgbmVlZHMgdG8gYmUgZGVmaW5lZCBpbiB0aGUgbG9jYWxlXHJcbiAgICogZmlsZXMgb3IgYW4gZXJyb3Igd2lsbCBiZSB0aHJvd24uXHJcbiAgICogQHBhcmFtIHNlYXJjaFR5cGUgU2VhcmNoIHR5cGVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXRTZWFyY2hUeXBlVGl0bGUoc2VhcmNoVHlwZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gYHNlYXJjaC4ke3NlYXJjaFR5cGUudG9Mb3dlckNhc2UoKX0udGl0bGVgO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRW1pdCBhbiBldmVudCBhbmQgZW5hYmxlIHRoZSBzZWFyY2ggc291cmNlcyBvZiB0aGUgZ2l2ZW4gdHlwZS5cclxuICAgKiBAcGFyYW0gc2VhcmNoVHlwZSBTZWFyY2ggdHlwZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZW5hYmxlU2VhcmNoVHlwZShzZWFyY2hUeXBlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuZW5hYmxlZCA9IHNlYXJjaFR5cGU7XHJcbiAgICB0aGlzLnNlYXJjaFNvdXJjZVNlcnZpY2UuZW5hYmxlU291cmNlc0J5VHlwZShzZWFyY2hUeXBlKTtcclxuICAgIHRoaXMuY2hhbmdlLmVtaXQoc2VhcmNoVHlwZSk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=