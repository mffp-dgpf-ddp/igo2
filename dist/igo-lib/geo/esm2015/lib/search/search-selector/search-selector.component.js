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
export class SearchSelectorComponent {
    /**
     * @param {?} searchSourceService
     */
    constructor(searchSourceService) {
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
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const initial = this.enabled || this.searchTypes[0];
        this.enableSearchType(initial);
    }
    /**
     * Enable the selected search type
     * \@internal
     * @param {?} searchType Search type
     * @return {?}
     */
    onSearchTypeChange(searchType) {
        this.enableSearchType(searchType);
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
        return `search.${searchType.toLowerCase()}.title`;
    }
    /**
     * Emit an event and enable the search sources of the given type.
     * @private
     * @param {?} searchType Search type
     * @return {?}
     */
    enableSearchType(searchType) {
        this.enabled = searchType;
        this.searchSourceService.enableSourcesByType(searchType);
        this.change.emit(searchType);
    }
}
SearchSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-search-selector',
                template: "<div class=\"igo-search-selector\">\r\n  <button\r\n    mat-icon-button\r\n    class=\"igo-search-selector-button\"\r\n    color=\"primary\"\r\n    tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"'igo.geo.search.menu.tooltip' | translate\"\r\n    [matMenuTriggerFor]=\"searchSelectorMenu\">\r\n    <mat-icon svgIcon=\"menu-down\"></mat-icon>\r\n  </button>\r\n\r\n  <mat-menu\r\n    #searchSelectorMenu=\"matMenu\"\r\n    class=\"no-border-radius\"\r\n    xPosition=\"before\"\r\n    yPosition=\"above\">\r\n    <mat-radio-group\r\n      class=\"igo-search-selector-radio-group\"\r\n      [value]=\"enabled\"\r\n      (change)=\"onSearchTypeChange($event.value)\">\r\n      <mat-radio-button *ngFor=\"let searchType of searchTypes\" [value]=\"searchType\">\r\n        {{getSearchTypeTitle(searchType) | translate}}\r\n      </mat-radio-button>\r\n    </mat-radio-group>\r\n  </mat-menu>\r\n\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".igo-search-selector-button ::ng-deep div.mat-button-ripple-round{border-radius:0}.igo-search-selector-radio-group{display:inline-flex;flex-direction:column}.igo-search-selector-radio-group mat-radio-button{margin:5px}"]
            }] }
];
/** @nocollapse */
SearchSelectorComponent.ctorParameters = () => [
    { type: SearchSourceService }
];
SearchSelectorComponent.propDecorators = {
    searchTypes: [{ type: Input }],
    enabled: [{ type: Input }],
    change: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXNlbGVjdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gvc2VhcmNoLXNlbGVjdG9yL3NlYXJjaC1zZWxlY3Rvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBRVosdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7Ozs7O0FBa0J0RSxNQUFNLE9BQU8sdUJBQXVCOzs7O0lBaUJsQyxZQUFvQixtQkFBd0M7UUFBeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjs7OztRQVpuRCxnQkFBVyxHQUFhLFlBQVksQ0FBQzs7OztRQVVwQyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUVpQixDQUFDOzs7Ozs7SUFNaEUsUUFBUTs7Y0FDQSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakMsQ0FBQzs7Ozs7OztJQU9ELGtCQUFrQixDQUFDLFVBQWtCO1FBQ25DLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7Ozs7Ozs7SUFTRCxrQkFBa0IsQ0FBQyxVQUFrQjtRQUNuQyxPQUFPLFVBQVUsVUFBVSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUM7SUFDcEQsQ0FBQzs7Ozs7OztJQU1PLGdCQUFnQixDQUFDLFVBQWtCO1FBQ3pDLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO1FBQzFCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQixDQUFDOzs7WUE5REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLHc3QkFBK0M7Z0JBRS9DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7OztZQWpCUSxtQkFBbUI7OzswQkF1QnpCLEtBQUs7c0JBS0wsS0FBSztxQkFLTCxNQUFNOzs7Ozs7O0lBVlAsOENBQThDOzs7OztJQUs5QywwQ0FBeUI7Ozs7O0lBS3pCLHlDQUE4Qzs7Ozs7SUFFbEMsc0RBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNYXRDaGVja2JveENoYW5nZSwgTWF0UmFkaW9DaGFuZ2UgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE9uSW5pdCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU0VBUkNIX1RZUEVTIH0gZnJvbSAnLi4vc2hhcmVkL3NlYXJjaC5lbnVtcyc7XHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZVNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VhcmNoLXNvdXJjZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU2VhcmNoU291cmNlIH0gZnJvbSAnLi4vc2hhcmVkL3NvdXJjZXMvc291cmNlJztcclxuaW1wb3J0IHsgU2VhcmNoU291cmNlU2V0dGluZ3MsIFNldHRpbmdPcHRpb25zIH0gZnJvbSAnLi4vc2hhcmVkL3NvdXJjZXMvc291cmNlLmludGVyZmFjZXMnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY29tcG9uZW50IGFsbG93cyBhIHVzZXIgdG8gc2VsZWN0IGEgc2VhcmNoIHR5cGUgeW8gZW5hYmxlLiBJbiBpdCdzXHJcbiAqIGN1cnJlbnQgdmVyc2lvbiwgb25seSBvbmUgc2VhcmNoIHR5cGUgY2FuIGJlIHNlbGVjdGVkIGF0IG9uY2UgKHJhZGlvKS4gSWZcclxuICogdGhpcyBjb21wb25lbnQgd2VyZSB0byBzdXBwb3J0IG1vcmUgdGhhbiBvbmUgc2VhcmNoIHNvdXJjZSBlbmFibGVkIChjaGVja2JveCksXHJcbiAqIHRoZSBzZWFyY2hiYXIgY29tcG9uZW50IHdvdWxkIHJlcXVpcmUgYSBzbWFsbCBjaGFuZ2UgdG8gaXQnc1xyXG4gKiBwbGFjZWhvbGRlciBnZXR0ZXIuIFRoZSBzZWFyY2ggc291cmNlIHNlcnZpY2UgYWxyZWFkeSBzdXBwb3J0cyBoYXZpbmdcclxuICogbW9yZSB0aGFuIG9uZSBzZWFyY2ggc291cmNlIGVuYWJsZWQuXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1zZWFyY2gtc2VsZWN0b3InLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWFyY2gtc2VsZWN0b3IuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3NlYXJjaC1zZWxlY3Rvci5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hTZWxlY3RvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIExpc3Qgb2YgYXZhaWxhYmxlIHNlYXJjaCB0eXBlc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNlYXJjaFR5cGVzOiBzdHJpbmdbXSA9IFNFQVJDSF9UWVBFUztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHNlYXJjaCB0eXBlIGVuYWJsZWRcclxuICAgKi9cclxuICBASW5wdXQoKSBlbmFibGVkOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZW5hYmxlZCBzZWFyY2ggdHlwZSBjaGFuZ2VzXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlYXJjaFNvdXJjZVNlcnZpY2U6IFNlYXJjaFNvdXJjZVNlcnZpY2UpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVuYWJsZSB0aGUgZmlyc3Qgc2VhcmNoIHR5cGUgaWYgdGhlIGVuYWJsZWQgaW5wdXQgaXMgbm90IGRlZmluZWRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGNvbnN0IGluaXRpYWwgPSB0aGlzLmVuYWJsZWQgfHwgdGhpcy5zZWFyY2hUeXBlc1swXTtcclxuICAgIHRoaXMuZW5hYmxlU2VhcmNoVHlwZShpbml0aWFsKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVuYWJsZSB0aGUgc2VsZWN0ZWQgc2VhcmNoIHR5cGVcclxuICAgKiBAcGFyYW0gc2VhcmNoVHlwZSBTZWFyY2ggdHlwZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uU2VhcmNoVHlwZUNoYW5nZShzZWFyY2hUeXBlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuZW5hYmxlU2VhcmNoVHlwZShzZWFyY2hUeXBlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBhIHNlYXJjaCB0eXBlJ3MgdGl0bGUuIFRoZSB0aXRsZVxyXG4gICAqIGZvciBhbGwgYXZhaWxhYmxlcyBzZWFyY2ggdHlwZXJzIG5lZWRzIHRvIGJlIGRlZmluZWQgaW4gdGhlIGxvY2FsZVxyXG4gICAqIGZpbGVzIG9yIGFuIGVycm9yIHdpbGwgYmUgdGhyb3duLlxyXG4gICAqIEBwYXJhbSBzZWFyY2hUeXBlIFNlYXJjaCB0eXBlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0U2VhcmNoVHlwZVRpdGxlKHNlYXJjaFR5cGU6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIGBzZWFyY2guJHtzZWFyY2hUeXBlLnRvTG93ZXJDYXNlKCl9LnRpdGxlYDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVtaXQgYW4gZXZlbnQgYW5kIGVuYWJsZSB0aGUgc2VhcmNoIHNvdXJjZXMgb2YgdGhlIGdpdmVuIHR5cGUuXHJcbiAgICogQHBhcmFtIHNlYXJjaFR5cGUgU2VhcmNoIHR5cGVcclxuICAgKi9cclxuICBwcml2YXRlIGVuYWJsZVNlYXJjaFR5cGUoc2VhcmNoVHlwZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmVuYWJsZWQgPSBzZWFyY2hUeXBlO1xyXG4gICAgdGhpcy5zZWFyY2hTb3VyY2VTZXJ2aWNlLmVuYWJsZVNvdXJjZXNCeVR5cGUoc2VhcmNoVHlwZSk7XHJcbiAgICB0aGlzLmNoYW5nZS5lbWl0KHNlYXJjaFR5cGUpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19