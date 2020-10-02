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
export class SearchSelectorComponent {
    /**
     * @param {?} searchSourceService
     */
    constructor(searchSourceService) {
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
    /**
     * The search type enabled
     * @param {?} value
     * @return {?}
     */
    set searchType(value) { this.setSearchType(value); }
    /**
     * @return {?}
     */
    get searchType() { return this.searchType$.value; }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.searchType$$ = this.searchType$
            .pipe(distinctUntilChanged())
            .subscribe((/**
         * @param {?} searchType
         * @return {?}
         */
        (searchType) => this.onSetSearchType(searchType)));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.searchType$$.unsubscribe();
    }
    /**
     * Enable the selected search type
     * \@internal
     * @param {?} searchType Search type
     * @return {?}
     */
    onSearchTypeChange(searchType) {
        this.setSearchType(searchType);
    }
    /**
     * Get a search type's title. The title
     * for all availables search typers needs to be defined in the locale
     * files or an error will be thrown.
     * \@internal
     * @param {?} searchType Search type
     * @return {?}
     */
    getSearchTypeTitle(searchType) {
        return `igo.geo.search.${searchType.toLowerCase()}.title`;
    }
    /**
     * Emit an event and enable the search sources of the given type.
     * @private
     * @param {?} searchType Search type
     * @return {?}
     */
    setSearchType(searchType) {
        this.searchType$.next(searchType);
    }
    /**
     * @private
     * @param {?} searchType
     * @return {?}
     */
    onSetSearchType(searchType) {
        if (searchType === undefined || searchType === null) {
            return;
        }
        this.searchSourceService.enableSourcesByType(searchType);
        this.searchTypeChange.emit(searchType);
    }
}
SearchSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-search-selector',
                template: "<div class=\"igo-search-selector\">\r\n  <button\r\n    mat-icon-button\r\n    class=\"igo-search-selector-button\"\r\n    color=\"primary\"\r\n    tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"'igo.geo.search.menu.tooltip' | translate\"\r\n    [matMenuTriggerFor]=\"searchSelectorMenu\">\r\n    <mat-icon svgIcon=\"menu-down\"></mat-icon>\r\n  </button>\r\n\r\n  <mat-menu\r\n    #searchSelectorMenu=\"matMenu\"\r\n    class=\"no-border-radius\"\r\n    xPosition=\"before\"\r\n    yPosition=\"above\">\r\n    <mat-radio-group\r\n      class=\"igo-search-selector-radio-group\"\r\n      [value]=\"searchType$ | async\"\r\n      (change)=\"onSearchTypeChange($event.value)\">\r\n      <mat-radio-button *ngFor=\"let searchType of searchTypes\" [value]=\"searchType\">\r\n        {{getSearchTypeTitle(searchType) | translate}}\r\n      </mat-radio-button>\r\n    </mat-radio-group>\r\n  </mat-menu>\r\n\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".igo-search-selector-button ::ng-deep div.mat-button-ripple-round{border-radius:0}.igo-search-selector-radio-group{display:-webkit-inline-box;display:inline-flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.igo-search-selector-radio-group mat-radio-button{margin:5px}"]
            }] }
];
/** @nocollapse */
SearchSelectorComponent.ctorParameters = () => [
    { type: SearchSourceService }
];
SearchSelectorComponent.propDecorators = {
    searchTypes: [{ type: Input }],
    searchType: [{ type: Input }],
    searchTypeChange: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXNlbGVjdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gvc2VhcmNoLXNlbGVjdG9yL3NlYXJjaC1zZWxlY3Rvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osdUJBQXVCLEVBR3hCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxlQUFlLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7Ozs7O0FBZ0J0RSxNQUFNLE9BQU8sdUJBQXVCOzs7O0lBMEJsQyxZQUFvQixtQkFBd0M7UUFBeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQXhCbkQsZ0JBQVcsR0FBNEIsSUFBSSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7Ozs7UUFVdEUsZ0JBQVcsR0FBYSxZQUFZLENBQUM7Ozs7UUFZcEMscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUVPLENBQUM7Ozs7OztJQVRoRSxJQUNJLFVBQVUsQ0FBQyxLQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7SUFDNUQsSUFBSSxVQUFVLEtBQWEsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Ozs7SUFTM0QsUUFBUTtRQUNOLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVc7YUFDakMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7YUFDNUIsU0FBUzs7OztRQUFDLENBQUMsVUFBa0IsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsRUFBQyxDQUFDO0lBQ3pFLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzs7Ozs7O0lBT0Qsa0JBQWtCLENBQUMsVUFBa0I7UUFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7Ozs7Ozs7SUFTRCxrQkFBa0IsQ0FBQyxVQUFrQjtRQUNuQyxPQUFPLGtCQUFrQixVQUFVLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQztJQUM1RCxDQUFDOzs7Ozs7O0lBTU8sYUFBYSxDQUFDLFVBQThCO1FBQ2xELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7OztJQUVPLGVBQWUsQ0FBQyxVQUFrQjtRQUN4QyxJQUFJLFVBQVUsS0FBSyxTQUFTLElBQUksVUFBVSxLQUFLLElBQUksRUFBRTtZQUNuRCxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6QyxDQUFDOzs7WUEvRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLG84QkFBK0M7Z0JBRS9DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7OztZQWZRLG1CQUFtQjs7OzBCQTRCekIsS0FBSzt5QkFLTCxLQUFLOytCQU9MLE1BQU07Ozs7SUF0QlAsOENBQStFOzs7Ozs7SUFLL0UsK0NBQW1DOzs7OztJQUtuQyw4Q0FBOEM7Ozs7O0lBWTlDLG1EQUF3RDs7Ozs7SUFFNUMsc0RBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IFNFQVJDSF9UWVBFUyB9IGZyb20gJy4uL3NoYXJlZC9zZWFyY2guZW51bXMnO1xyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2VTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlYXJjaC1zb3VyY2Uuc2VydmljZSc7XHJcblxyXG4vKipcclxuICogVGhpcyBjb21wb25lbnQgYWxsb3dzIGEgdXNlciB0byBzZWxlY3QgYSBzZWFyY2ggdHlwZSB5byBlbmFibGUuIEluIGl0J3NcclxuICogY3VycmVudCB2ZXJzaW9uLCBvbmx5IG9uZSBzZWFyY2ggdHlwZSBjYW4gYmUgc2VsZWN0ZWQgYXQgb25jZSAocmFkaW8pLiBJZlxyXG4gKiB0aGlzIGNvbXBvbmVudCB3ZXJlIHRvIHN1cHBvcnQgbW9yZSB0aGFuIG9uZSBzZWFyY2ggc291cmNlIGVuYWJsZWQgKGNoZWNrYm94KSxcclxuICogdGhlIHNlYXJjaGJhciBjb21wb25lbnQgd291bGQgcmVxdWlyZSBhIHNtYWxsIGNoYW5nZSB0byBpdCdzXHJcbiAqIHBsYWNlaG9sZGVyIGdldHRlci4gVGhlIHNlYXJjaCBzb3VyY2Ugc2VydmljZSBhbHJlYWR5IHN1cHBvcnRzIGhhdmluZ1xyXG4gKiBtb3JlIHRoYW4gb25lIHNlYXJjaCBzb3VyY2UgZW5hYmxlZC5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXNlYXJjaC1zZWxlY3RvcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NlYXJjaC1zZWxlY3Rvci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc2VhcmNoLXNlbGVjdG9yLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFNlYXJjaFNlbGVjdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICByZWFkb25seSBzZWFyY2hUeXBlJDogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHVuZGVmaW5lZCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgc2VhcmNoIHR5cGVcclxuICAgKi9cclxuICBwcml2YXRlIHNlYXJjaFR5cGUkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBMaXN0IG9mIGF2YWlsYWJsZSBzZWFyY2ggdHlwZXNcclxuICAgKi9cclxuICBASW5wdXQoKSBzZWFyY2hUeXBlczogc3RyaW5nW10gPSBTRUFSQ0hfVFlQRVM7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzZWFyY2ggdHlwZSBlbmFibGVkXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBzZXQgc2VhcmNoVHlwZSh2YWx1ZTogc3RyaW5nKSB7IHRoaXMuc2V0U2VhcmNoVHlwZSh2YWx1ZSk7IH1cclxuICBnZXQgc2VhcmNoVHlwZSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5zZWFyY2hUeXBlJC52YWx1ZTsgfVxyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGVuYWJsZWQgc2VhcmNoIHR5cGUgY2hhbmdlc1xyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzZWFyY2hUeXBlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VhcmNoU291cmNlU2VydmljZTogU2VhcmNoU291cmNlU2VydmljZSkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnNlYXJjaFR5cGUkJCA9IHRoaXMuc2VhcmNoVHlwZSRcclxuICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSlcclxuICAgICAgLnN1YnNjcmliZSgoc2VhcmNoVHlwZTogc3RyaW5nKSA9PiB0aGlzLm9uU2V0U2VhcmNoVHlwZShzZWFyY2hUeXBlKSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuc2VhcmNoVHlwZSQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbmFibGUgdGhlIHNlbGVjdGVkIHNlYXJjaCB0eXBlXHJcbiAgICogQHBhcmFtIHNlYXJjaFR5cGUgU2VhcmNoIHR5cGVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvblNlYXJjaFR5cGVDaGFuZ2Uoc2VhcmNoVHlwZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnNldFNlYXJjaFR5cGUoc2VhcmNoVHlwZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgYSBzZWFyY2ggdHlwZSdzIHRpdGxlLiBUaGUgdGl0bGVcclxuICAgKiBmb3IgYWxsIGF2YWlsYWJsZXMgc2VhcmNoIHR5cGVycyBuZWVkcyB0byBiZSBkZWZpbmVkIGluIHRoZSBsb2NhbGVcclxuICAgKiBmaWxlcyBvciBhbiBlcnJvciB3aWxsIGJlIHRocm93bi5cclxuICAgKiBAcGFyYW0gc2VhcmNoVHlwZSBTZWFyY2ggdHlwZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldFNlYXJjaFR5cGVUaXRsZShzZWFyY2hUeXBlOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBgaWdvLmdlby5zZWFyY2guJHtzZWFyY2hUeXBlLnRvTG93ZXJDYXNlKCl9LnRpdGxlYDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVtaXQgYW4gZXZlbnQgYW5kIGVuYWJsZSB0aGUgc2VhcmNoIHNvdXJjZXMgb2YgdGhlIGdpdmVuIHR5cGUuXHJcbiAgICogQHBhcmFtIHNlYXJjaFR5cGUgU2VhcmNoIHR5cGVcclxuICAgKi9cclxuICBwcml2YXRlIHNldFNlYXJjaFR5cGUoc2VhcmNoVHlwZTogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XHJcbiAgICB0aGlzLnNlYXJjaFR5cGUkLm5leHQoc2VhcmNoVHlwZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uU2V0U2VhcmNoVHlwZShzZWFyY2hUeXBlOiBzdHJpbmcpIHtcclxuICAgIGlmIChzZWFyY2hUeXBlID09PSB1bmRlZmluZWQgfHwgc2VhcmNoVHlwZSA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZWFyY2hTb3VyY2VTZXJ2aWNlLmVuYWJsZVNvdXJjZXNCeVR5cGUoc2VhcmNoVHlwZSk7XHJcbiAgICB0aGlzLnNlYXJjaFR5cGVDaGFuZ2UuZW1pdChzZWFyY2hUeXBlKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==