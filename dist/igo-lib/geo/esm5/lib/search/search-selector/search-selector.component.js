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
                    template: "<div class=\"igo-search-selector\">\r\n  <button\r\n    mat-icon-button\r\n    class=\"igo-search-selector-button\"\r\n    color=\"primary\"\r\n    tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"'igo.geo.search.menu.tooltip' | translate\"\r\n    [matMenuTriggerFor]=\"searchSelectorMenu\">\r\n    <mat-icon svgIcon=\"menu-down\"></mat-icon>\r\n  </button>\r\n\r\n  <mat-menu\r\n    #searchSelectorMenu=\"matMenu\"\r\n    class=\"no-border-radius\"\r\n    xPosition=\"before\"\r\n    yPosition=\"above\">\r\n    <mat-radio-group\r\n      class=\"igo-search-selector-radio-group\"\r\n      [value]=\"enabled\"\r\n      (change)=\"onSearchTypeChange($event.value)\">\r\n      <mat-radio-button *ngFor=\"let searchType of searchTypes\" [value]=\"searchType\">\r\n        {{getSearchTypeTitle(searchType) | translate}}\r\n      </mat-radio-button>\r\n    </mat-radio-group>\r\n  </mat-menu>\r\n\r\n</div>\r\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXNlbGVjdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gvc2VhcmNoLXNlbGVjdG9yL3NlYXJjaC1zZWxlY3Rvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBRVosdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7Ozs7O0FBWXRFO0lBdUJFLGlDQUFvQixtQkFBd0M7UUFBeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjs7OztRQVpuRCxnQkFBVyxHQUFhLFlBQVksQ0FBQzs7OztRQVVwQyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUVpQixDQUFDO0lBRWhFOzs7T0FHRzs7Ozs7O0lBQ0gsMENBQVE7Ozs7O0lBQVI7O1lBQ1EsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gsb0RBQWtCOzs7Ozs7SUFBbEIsVUFBbUIsVUFBa0I7UUFDbkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7Ozs7O09BTUc7Ozs7Ozs7OztJQUNILG9EQUFrQjs7Ozs7Ozs7SUFBbEIsVUFBbUIsVUFBa0I7UUFDbkMsT0FBTyxZQUFVLFVBQVUsQ0FBQyxXQUFXLEVBQUUsV0FBUSxDQUFDO0lBQ3BELENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7SUFDSyxrREFBZ0I7Ozs7OztJQUF4QixVQUF5QixVQUFrQjtRQUN6QyxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztRQUMxQixJQUFJLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7Z0JBOURGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQix3N0JBQStDO29CQUUvQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQWpCUSxtQkFBbUI7Ozs4QkF1QnpCLEtBQUs7MEJBS0wsS0FBSzt5QkFLTCxNQUFNOztJQTJDVCw4QkFBQztDQUFBLEFBaEVELElBZ0VDO1NBMURZLHVCQUF1Qjs7Ozs7O0lBS2xDLDhDQUE4Qzs7Ozs7SUFLOUMsMENBQXlCOzs7OztJQUt6Qix5Q0FBOEM7Ozs7O0lBRWxDLHNEQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TWF0Q2hlY2tib3hDaGFuZ2UsIE1hdFJhZGlvQ2hhbmdlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPbkluaXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFNFQVJDSF9UWVBFUyB9IGZyb20gJy4uL3NoYXJlZC9zZWFyY2guZW51bXMnO1xyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2VTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlYXJjaC1zb3VyY2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZSB9IGZyb20gJy4uL3NoYXJlZC9zb3VyY2VzL3NvdXJjZSc7XHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZVNldHRpbmdzLCBTZXR0aW5nT3B0aW9ucyB9IGZyb20gJy4uL3NoYXJlZC9zb3VyY2VzL3NvdXJjZS5pbnRlcmZhY2VzJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNvbXBvbmVudCBhbGxvd3MgYSB1c2VyIHRvIHNlbGVjdCBhIHNlYXJjaCB0eXBlIHlvIGVuYWJsZS4gSW4gaXQnc1xyXG4gKiBjdXJyZW50IHZlcnNpb24sIG9ubHkgb25lIHNlYXJjaCB0eXBlIGNhbiBiZSBzZWxlY3RlZCBhdCBvbmNlIChyYWRpbykuIElmXHJcbiAqIHRoaXMgY29tcG9uZW50IHdlcmUgdG8gc3VwcG9ydCBtb3JlIHRoYW4gb25lIHNlYXJjaCBzb3VyY2UgZW5hYmxlZCAoY2hlY2tib3gpLFxyXG4gKiB0aGUgc2VhcmNoYmFyIGNvbXBvbmVudCB3b3VsZCByZXF1aXJlIGEgc21hbGwgY2hhbmdlIHRvIGl0J3NcclxuICogcGxhY2Vob2xkZXIgZ2V0dGVyLiBUaGUgc2VhcmNoIHNvdXJjZSBzZXJ2aWNlIGFscmVhZHkgc3VwcG9ydHMgaGF2aW5nXHJcbiAqIG1vcmUgdGhhbiBvbmUgc2VhcmNoIHNvdXJjZSBlbmFibGVkLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tc2VhcmNoLXNlbGVjdG9yJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc2VhcmNoLXNlbGVjdG9yLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zZWFyY2gtc2VsZWN0b3IuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VhcmNoU2VsZWN0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAvKipcclxuICAgKiBMaXN0IG9mIGF2YWlsYWJsZSBzZWFyY2ggdHlwZXNcclxuICAgKi9cclxuICBASW5wdXQoKSBzZWFyY2hUeXBlczogc3RyaW5nW10gPSBTRUFSQ0hfVFlQRVM7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzZWFyY2ggdHlwZSBlbmFibGVkXHJcbiAgICovXHJcbiAgQElucHV0KCkgZW5hYmxlZDogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGVuYWJsZWQgc2VhcmNoIHR5cGUgY2hhbmdlc1xyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZWFyY2hTb3VyY2VTZXJ2aWNlOiBTZWFyY2hTb3VyY2VTZXJ2aWNlKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBFbmFibGUgdGhlIGZpcnN0IHNlYXJjaCB0eXBlIGlmIHRoZSBlbmFibGVkIGlucHV0IGlzIG5vdCBkZWZpbmVkXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBjb25zdCBpbml0aWFsID0gdGhpcy5lbmFibGVkIHx8IHRoaXMuc2VhcmNoVHlwZXNbMF07XHJcbiAgICB0aGlzLmVuYWJsZVNlYXJjaFR5cGUoaW5pdGlhbCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbmFibGUgdGhlIHNlbGVjdGVkIHNlYXJjaCB0eXBlXHJcbiAgICogQHBhcmFtIHNlYXJjaFR5cGUgU2VhcmNoIHR5cGVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvblNlYXJjaFR5cGVDaGFuZ2Uoc2VhcmNoVHlwZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmVuYWJsZVNlYXJjaFR5cGUoc2VhcmNoVHlwZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgYSBzZWFyY2ggdHlwZSdzIHRpdGxlLiBUaGUgdGl0bGVcclxuICAgKiBmb3IgYWxsIGF2YWlsYWJsZXMgc2VhcmNoIHR5cGVycyBuZWVkcyB0byBiZSBkZWZpbmVkIGluIHRoZSBsb2NhbGVcclxuICAgKiBmaWxlcyBvciBhbiBlcnJvciB3aWxsIGJlIHRocm93bi5cclxuICAgKiBAcGFyYW0gc2VhcmNoVHlwZSBTZWFyY2ggdHlwZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldFNlYXJjaFR5cGVUaXRsZShzZWFyY2hUeXBlOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBgc2VhcmNoLiR7c2VhcmNoVHlwZS50b0xvd2VyQ2FzZSgpfS50aXRsZWA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbWl0IGFuIGV2ZW50IGFuZCBlbmFibGUgdGhlIHNlYXJjaCBzb3VyY2VzIG9mIHRoZSBnaXZlbiB0eXBlLlxyXG4gICAqIEBwYXJhbSBzZWFyY2hUeXBlIFNlYXJjaCB0eXBlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBlbmFibGVTZWFyY2hUeXBlKHNlYXJjaFR5cGU6IHN0cmluZykge1xyXG4gICAgdGhpcy5lbmFibGVkID0gc2VhcmNoVHlwZTtcclxuICAgIHRoaXMuc2VhcmNoU291cmNlU2VydmljZS5lbmFibGVTb3VyY2VzQnlUeXBlKHNlYXJjaFR5cGUpO1xyXG4gICAgdGhpcy5jaGFuZ2UuZW1pdChzZWFyY2hUeXBlKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==