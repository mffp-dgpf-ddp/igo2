/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
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
        this.searchType$ = new BehaviorSubject(undefined);
        /**
         * List of available search types
         */
        this.searchTypes = SEARCH_TYPES;
        /**
         * Event emitted when the enabled search type changes
         */
        this.searchTypeChange = new EventEmitter();
    }
    Object.defineProperty(SearchSelectorComponent.prototype, "searchType", {
        get: /**
         * @return {?}
         */
        function () { return this.searchType$.value; },
        /**
         * The search type enabled
         */
        set: /**
         * The search type enabled
         * @param {?} value
         * @return {?}
         */
        function (value) { this.setSearchType(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SearchSelectorComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.searchType$$ = this.searchType$
            .pipe(distinctUntilChanged())
            .subscribe((/**
         * @param {?} searchType
         * @return {?}
         */
        function (searchType) { return _this.onSetSearchType(searchType); }));
    };
    /**
     * @return {?}
     */
    SearchSelectorComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.searchType$$.unsubscribe();
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
        this.setSearchType(searchType);
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
        return "igo.geo.search." + searchType.toLowerCase() + ".title";
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
    SearchSelectorComponent.prototype.setSearchType = /**
     * Emit an event and enable the search sources of the given type.
     * @private
     * @param {?} searchType Search type
     * @return {?}
     */
    function (searchType) {
        this.searchType$.next(searchType);
    };
    /**
     * @private
     * @param {?} searchType
     * @return {?}
     */
    SearchSelectorComponent.prototype.onSetSearchType = /**
     * @private
     * @param {?} searchType
     * @return {?}
     */
    function (searchType) {
        if (searchType === undefined || searchType === null) {
            return;
        }
        this.searchSourceService.enableSourcesByType(searchType);
        this.searchTypeChange.emit(searchType);
    };
    SearchSelectorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-search-selector',
                    template: "<div class=\"igo-search-selector\">\r\n  <button\r\n    mat-icon-button\r\n    class=\"igo-search-selector-button\"\r\n    color=\"primary\"\r\n    tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"'igo.geo.search.menu.tooltip' | translate\"\r\n    [matMenuTriggerFor]=\"searchSelectorMenu\">\r\n    <mat-icon svgIcon=\"menu-down\"></mat-icon>\r\n  </button>\r\n\r\n  <mat-menu\r\n    #searchSelectorMenu=\"matMenu\"\r\n    class=\"no-border-radius\"\r\n    xPosition=\"before\"\r\n    yPosition=\"above\">\r\n    <mat-radio-group\r\n      class=\"igo-search-selector-radio-group\"\r\n      [value]=\"searchType$ | async\"\r\n      (change)=\"onSearchTypeChange($event.value)\">\r\n      <mat-radio-button *ngFor=\"let searchType of searchTypes\" [value]=\"searchType\">\r\n        {{getSearchTypeTitle(searchType) | translate}}\r\n      </mat-radio-button>\r\n    </mat-radio-group>\r\n  </mat-menu>\r\n\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".igo-search-selector-button ::ng-deep div.mat-button-ripple-round{border-radius:0}.igo-search-selector-radio-group{display:-webkit-inline-box;display:inline-flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.igo-search-selector-radio-group mat-radio-button{margin:5px}"]
                }] }
    ];
    /** @nocollapse */
    SearchSelectorComponent.ctorParameters = function () { return [
        { type: SearchSourceService }
    ]; };
    SearchSelectorComponent.propDecorators = {
        searchTypes: [{ type: Input }],
        searchType: [{ type: Input }],
        searchTypeChange: [{ type: Output }]
    };
    return SearchSelectorComponent;
}());
export { SearchSelectorComponent };
if (false) {
    /** @type {?} */
    SearchSelectorComponent.prototype.searchType$;
    /**
     * Subscription to the search type
     * @type {?}
     * @private
     */
    SearchSelectorComponent.prototype.searchType$$;
    /**
     * List of available search types
     * @type {?}
     */
    SearchSelectorComponent.prototype.searchTypes;
    /**
     * Event emitted when the enabled search type changes
     * @type {?}
     */
    SearchSelectorComponent.prototype.searchTypeChange;
    /**
     * @type {?}
     * @private
     */
    SearchSelectorComponent.prototype.searchSourceService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXNlbGVjdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gvc2VhcmNoLXNlbGVjdG9yL3NlYXJjaC1zZWxlY3Rvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osdUJBQXVCLEVBR3hCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxlQUFlLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7Ozs7O0FBVXRFO0lBZ0NFLGlDQUFvQixtQkFBd0M7UUFBeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQXhCbkQsZ0JBQVcsR0FBNEIsSUFBSSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7Ozs7UUFVdEUsZ0JBQVcsR0FBYSxZQUFZLENBQUM7Ozs7UUFZcEMscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUVPLENBQUM7SUFUaEUsc0JBQ0ksK0NBQVU7Ozs7UUFDZCxjQUEyQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUwzRDs7V0FFRzs7Ozs7O1FBQ0gsVUFDZSxLQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7OztPQUFBOzs7O0lBVTVELDBDQUFROzs7SUFBUjtRQUFBLGlCQUlDO1FBSEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVzthQUNqQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQzthQUM1QixTQUFTOzs7O1FBQUMsVUFBQyxVQUFrQixJQUFLLE9BQUEsS0FBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsRUFBaEMsQ0FBZ0MsRUFBQyxDQUFDO0lBQ3pFLENBQUM7Ozs7SUFFRCw2Q0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gsb0RBQWtCOzs7Ozs7SUFBbEIsVUFBbUIsVUFBa0I7UUFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7OztPQU1HOzs7Ozs7Ozs7SUFDSCxvREFBa0I7Ozs7Ozs7O0lBQWxCLFVBQW1CLFVBQWtCO1FBQ25DLE9BQU8sb0JBQWtCLFVBQVUsQ0FBQyxXQUFXLEVBQUUsV0FBUSxDQUFDO0lBQzVELENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7SUFDSywrQ0FBYTs7Ozs7O0lBQXJCLFVBQXNCLFVBQThCO1FBQ2xELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7OztJQUVPLGlEQUFlOzs7OztJQUF2QixVQUF3QixVQUFrQjtRQUN4QyxJQUFJLFVBQVUsS0FBSyxTQUFTLElBQUksVUFBVSxLQUFLLElBQUksRUFBRTtZQUNuRCxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6QyxDQUFDOztnQkEvRUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLG84QkFBK0M7b0JBRS9DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozs7Z0JBZlEsbUJBQW1COzs7OEJBNEJ6QixLQUFLOzZCQUtMLEtBQUs7bUNBT0wsTUFBTTs7SUFtRFQsOEJBQUM7Q0FBQSxBQWpGRCxJQWlGQztTQTNFWSx1QkFBdUI7OztJQUVsQyw4Q0FBK0U7Ozs7OztJQUsvRSwrQ0FBbUM7Ozs7O0lBS25DLDhDQUE4Qzs7Ozs7SUFZOUMsbURBQXdEOzs7OztJQUU1QyxzREFBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgU0VBUkNIX1RZUEVTIH0gZnJvbSAnLi4vc2hhcmVkL3NlYXJjaC5lbnVtcyc7XHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZVNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VhcmNoLXNvdXJjZS5zZXJ2aWNlJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNvbXBvbmVudCBhbGxvd3MgYSB1c2VyIHRvIHNlbGVjdCBhIHNlYXJjaCB0eXBlIHlvIGVuYWJsZS4gSW4gaXQnc1xyXG4gKiBjdXJyZW50IHZlcnNpb24sIG9ubHkgb25lIHNlYXJjaCB0eXBlIGNhbiBiZSBzZWxlY3RlZCBhdCBvbmNlIChyYWRpbykuIElmXHJcbiAqIHRoaXMgY29tcG9uZW50IHdlcmUgdG8gc3VwcG9ydCBtb3JlIHRoYW4gb25lIHNlYXJjaCBzb3VyY2UgZW5hYmxlZCAoY2hlY2tib3gpLFxyXG4gKiB0aGUgc2VhcmNoYmFyIGNvbXBvbmVudCB3b3VsZCByZXF1aXJlIGEgc21hbGwgY2hhbmdlIHRvIGl0J3NcclxuICogcGxhY2Vob2xkZXIgZ2V0dGVyLiBUaGUgc2VhcmNoIHNvdXJjZSBzZXJ2aWNlIGFscmVhZHkgc3VwcG9ydHMgaGF2aW5nXHJcbiAqIG1vcmUgdGhhbiBvbmUgc2VhcmNoIHNvdXJjZSBlbmFibGVkLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tc2VhcmNoLXNlbGVjdG9yJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc2VhcmNoLXNlbGVjdG9yLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zZWFyY2gtc2VsZWN0b3IuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VhcmNoU2VsZWN0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIHJlYWRvbmx5IHNlYXJjaFR5cGUkOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3QodW5kZWZpbmVkKTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvIHRoZSBzZWFyY2ggdHlwZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2VhcmNoVHlwZSQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIExpc3Qgb2YgYXZhaWxhYmxlIHNlYXJjaCB0eXBlc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNlYXJjaFR5cGVzOiBzdHJpbmdbXSA9IFNFQVJDSF9UWVBFUztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHNlYXJjaCB0eXBlIGVuYWJsZWRcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCBzZWFyY2hUeXBlKHZhbHVlOiBzdHJpbmcpIHsgdGhpcy5zZXRTZWFyY2hUeXBlKHZhbHVlKTsgfVxyXG4gIGdldCBzZWFyY2hUeXBlKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLnNlYXJjaFR5cGUkLnZhbHVlOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZW5hYmxlZCBzZWFyY2ggdHlwZSBjaGFuZ2VzXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHNlYXJjaFR5cGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZWFyY2hTb3VyY2VTZXJ2aWNlOiBTZWFyY2hTb3VyY2VTZXJ2aWNlKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc2VhcmNoVHlwZSQkID0gdGhpcy5zZWFyY2hUeXBlJFxyXG4gICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKVxyXG4gICAgICAuc3Vic2NyaWJlKChzZWFyY2hUeXBlOiBzdHJpbmcpID0+IHRoaXMub25TZXRTZWFyY2hUeXBlKHNlYXJjaFR5cGUpKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5zZWFyY2hUeXBlJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVuYWJsZSB0aGUgc2VsZWN0ZWQgc2VhcmNoIHR5cGVcclxuICAgKiBAcGFyYW0gc2VhcmNoVHlwZSBTZWFyY2ggdHlwZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uU2VhcmNoVHlwZUNoYW5nZShzZWFyY2hUeXBlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuc2V0U2VhcmNoVHlwZShzZWFyY2hUeXBlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBhIHNlYXJjaCB0eXBlJ3MgdGl0bGUuIFRoZSB0aXRsZVxyXG4gICAqIGZvciBhbGwgYXZhaWxhYmxlcyBzZWFyY2ggdHlwZXJzIG5lZWRzIHRvIGJlIGRlZmluZWQgaW4gdGhlIGxvY2FsZVxyXG4gICAqIGZpbGVzIG9yIGFuIGVycm9yIHdpbGwgYmUgdGhyb3duLlxyXG4gICAqIEBwYXJhbSBzZWFyY2hUeXBlIFNlYXJjaCB0eXBlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0U2VhcmNoVHlwZVRpdGxlKHNlYXJjaFR5cGU6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIGBpZ28uZ2VvLnNlYXJjaC4ke3NlYXJjaFR5cGUudG9Mb3dlckNhc2UoKX0udGl0bGVgO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRW1pdCBhbiBldmVudCBhbmQgZW5hYmxlIHRoZSBzZWFyY2ggc291cmNlcyBvZiB0aGUgZ2l2ZW4gdHlwZS5cclxuICAgKiBAcGFyYW0gc2VhcmNoVHlwZSBTZWFyY2ggdHlwZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2V0U2VhcmNoVHlwZShzZWFyY2hUeXBlOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcclxuICAgIHRoaXMuc2VhcmNoVHlwZSQubmV4dChzZWFyY2hUeXBlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25TZXRTZWFyY2hUeXBlKHNlYXJjaFR5cGU6IHN0cmluZykge1xyXG4gICAgaWYgKHNlYXJjaFR5cGUgPT09IHVuZGVmaW5lZCB8fCBzZWFyY2hUeXBlID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNlYXJjaFNvdXJjZVNlcnZpY2UuZW5hYmxlU291cmNlc0J5VHlwZShzZWFyY2hUeXBlKTtcclxuICAgIHRoaXMuc2VhcmNoVHlwZUNoYW5nZS5lbWl0KHNlYXJjaFR5cGUpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19