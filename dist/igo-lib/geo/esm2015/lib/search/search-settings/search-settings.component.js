/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { SearchSourceService } from '../shared/search-source.service';
/**
 * This component allows a user to select a search type yo enable. In it's
 * current version, only one search type can be selected at once (radio). If
 * this component were to support more than one search source enabled (checkbox),
 * the searchbar component would require a small change to it's
 * placeholder getter. The search source service already supports having
 * more than one search source enabled.
 */
export class SearchSettingsComponent {
    /**
     * @param {?} searchSourceService
     */
    constructor(searchSourceService) {
        this.searchSourceService = searchSourceService;
        /**
         * Event emitted when the enabled search type changes
         */
        this.change = new EventEmitter();
    }
    /**
     * Get all search sources
     * \@internal
     * @return {?}
     */
    getSearchSources() {
        return this.searchSourceService.getSources();
    }
    /**
     * Triggered when a setting is checked (checkbox style)
     * \@internal
     * @param {?} event
     * @param {?} source
     * @param {?} setting
     * @param {?} settingValue
     * @return {?}
     */
    settingsValueCheckedCheckbox(event, source, setting, settingValue) {
        settingValue.enabled = event.checked;
        source.setParamFromSetting(setting);
    }
    /**
     * Triggered when a setting is checked (radiobutton style)
     * \@internal
     * @param {?} event
     * @param {?} source
     * @param {?} setting
     * @param {?} settingValue
     * @return {?}
     */
    settingsValueCheckedRadioButton(event, source, setting, settingValue) {
        setting.values.forEach((/**
         * @param {?} conf
         * @return {?}
         */
        conf => {
            if (conf.value !== settingValue.value) {
                conf.enabled = !event.source.checked;
            }
            else {
                conf.enabled = event.source.checked;
            }
        }));
        source.setParamFromSetting(setting);
    }
    /**
     * @param {?} event
     * @param {?} source
     * @return {?}
     */
    onCheckSearchSource(event, source) {
        source.enabled = event.checked;
    }
}
SearchSettingsComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-search-settings',
                template: "<div class=\"igo-search-settings\">\r\n\r\n  <button\r\n    mat-icon-button\r\n    class=\"igo-search-settings-button\"\r\n    color=\"primary\"\r\n    tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"'igo.geo.search.menu.tooltip' | translate\"\r\n    [matMenuTriggerFor]=\"searchSettingsMenu\">\r\n    <mat-icon svgIcon=\"settings\"></mat-icon>\r\n  </button>\r\n  <mat-menu\r\n    #searchSettingsMenu=\"matMenu\"\r\n    class=\"no-border-radius\">\r\n      <ng-container *ngFor=\"let source of getSearchSources()\">\r\n        <span class=\"igo-search-settings-search-source\">\r\n          <mat-checkbox\r\n            class=\"igo-search-settings-checkbox\"\r\n            [checked]=\"source.enabled\"\r\n            [value]=\"source\"\r\n            (click)=\"$event.stopPropagation()\"\r\n            (change)=\"onCheckSearchSource($event, source)\">\r\n          </mat-checkbox>\r\n          <button *ngIf=\"source.settings.length\u00A0>\u00A00\"\r\n            [matMenuTriggerFor]=\"sub_menu\"\r\n            mat-menu-item>{{source.title}}\r\n          </button>\r\n          <button\r\n            mat-menu-item\r\n            *ngIf=\"source.settings.length\u00A0===\u00A00\">\r\n            {{source.title}}\r\n          </button>\r\n        </span>\r\n          <mat-menu #sub_menu=\"matMenu\">\r\n            <ng-container *ngFor=\"let setting of source.settings\">\r\n              <button\r\n                  mat-menu-item\r\n                  [matMenuTriggerFor]=\"test_sub_menu\">\r\n                {{'igo.geo.search.searchSources.settings.'+ setting.title | translate}}\r\n              </button>\r\n              <mat-menu #test_sub_menu=\"matMenu\"\r\n                [ngSwitch]=\"setting.type\"\r\n                yPosition=\"above\">\r\n                <span *ngSwitchCase=\"'radiobutton'\">\r\n                  <mat-radio-group\r\n                    class=\"igo-search-settings-radio-group\"\r\n                    [value]=\"setting\">\r\n                    <mat-radio-button *ngFor=\"let settingValue of setting.values\"\r\n                      [value]=\"settingValue\"\r\n                      [checked]=\"settingValue.enabled\"\r\n                      (click)=\"$event.stopPropagation()\"\r\n                      (change)=\"settingsValueCheckedRadioButton($event, source, setting, settingValue)\">\r\n                      {{settingValue.title}}\r\n                    </mat-radio-button>\r\n                  </mat-radio-group>\r\n                </span>\r\n                <span *ngSwitchCase=\"'checkbox'\">\r\n                  <mat-checkbox class=\"igo-search-settings-radio-group\"\r\n                    class=\"mat-menu-item\"\r\n                    [checked]=\"settingValue.enabled\"\r\n                    [value]=\"setting\"\r\n                    (click)=\"$event.stopPropagation()\"\r\n                    (change)=\"settingsValueCheckedCheckbox($event, source, setting, settingValue)\"\r\n                    *ngFor=\"let settingValue of setting.values\">{{settingValue.title}}\r\n                  </mat-checkbox>\r\n                </span>\r\n              </mat-menu>\r\n            </ng-container>\r\n          </mat-menu>\r\n      </ng-container>\r\n  </mat-menu>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".igo-search-settings-button ::ng-deep div.mat-button-ripple-round{border-radius:0}.igo-search-settings-radio-group{display:inline-flex;flex-direction:column}.igo-search-settings-radio-group mat-radio-button{margin:5px}.igo-search-settings-checkbox mat-radio-button{display:inline-flex}.igo-search-settings-search-source{display:inline-flex;width:100%}.igo-search-settings-search-source mat-checkbox{display:inline-flex;margin-left:5px;margin-right:5px}"]
            }] }
];
/** @nocollapse */
SearchSettingsComponent.ctorParameters = () => [
    { type: SearchSourceService }
];
SearchSettingsComponent.propDecorators = {
    change: [{ type: Output }]
};
if (false) {
    /**
     * Event emitted when the enabled search type changes
     * @type {?}
     */
    SearchSettingsComponent.prototype.change;
    /**
     * @type {?}
     * @private
     */
    SearchSettingsComponent.prototype.searchSourceService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXNldHRpbmdzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gvc2VhcmNoLXNldHRpbmdzL3NlYXJjaC1zZXR0aW5ncy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFDTCxTQUFTLEVBRVQsTUFBTSxFQUNOLFlBQVksRUFDWix1QkFBdUIsRUFDeEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUNBQWlDLENBQUM7Ozs7Ozs7OztBQW1CdEUsTUFBTSxPQUFPLHVCQUF1Qjs7OztJQU9sQyxZQUFvQixtQkFBd0M7UUFBeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjs7OztRQUZsRCxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUVpQixDQUFDOzs7Ozs7SUFNaEUsZ0JBQWdCO1FBQ2QsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDL0MsQ0FBQzs7Ozs7Ozs7OztJQU1ELDRCQUE0QixDQUMxQixLQUF3QixFQUN4QixNQUFvQixFQUNwQixPQUE2QixFQUM3QixZQUE0QjtRQUU1QixZQUFZLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDckMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7Ozs7Ozs7Ozs7SUFNRCwrQkFBK0IsQ0FDN0IsS0FBcUIsRUFDckIsTUFBb0IsRUFDcEIsT0FBNkIsRUFDN0IsWUFBNEI7UUFFNUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPOzs7O1FBQUUsSUFBSSxDQUFDLEVBQUU7WUFDN0IsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFlBQVksQ0FBQyxLQUFLLEVBQUU7Z0JBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQzthQUN0QztpQkFBTTtnQkFDTCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO2FBQ3JDO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7Ozs7O0lBRUQsbUJBQW1CLENBQUMsS0FBd0IsRUFBRSxNQUFvQjtRQUNoRSxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7SUFDakMsQ0FBQzs7O1lBNURGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQiwyc0dBQStDO2dCQUUvQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs7WUFqQlEsbUJBQW1COzs7cUJBd0J6QixNQUFNOzs7Ozs7O0lBQVAseUNBQThDOzs7OztJQUVsQyxzREFBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01hdENoZWNrYm94Q2hhbmdlLCBNYXRSYWRpb0NoYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZVNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VhcmNoLXNvdXJjZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU2VhcmNoU291cmNlIH0gZnJvbSAnLi4vc2hhcmVkL3NvdXJjZXMvc291cmNlJztcclxuaW1wb3J0IHsgU2VhcmNoU291cmNlU2V0dGluZ3MsIFNldHRpbmdPcHRpb25zIH0gZnJvbSAnLi4vc2hhcmVkL3NvdXJjZXMvc291cmNlLmludGVyZmFjZXMnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY29tcG9uZW50IGFsbG93cyBhIHVzZXIgdG8gc2VsZWN0IGEgc2VhcmNoIHR5cGUgeW8gZW5hYmxlLiBJbiBpdCdzXHJcbiAqIGN1cnJlbnQgdmVyc2lvbiwgb25seSBvbmUgc2VhcmNoIHR5cGUgY2FuIGJlIHNlbGVjdGVkIGF0IG9uY2UgKHJhZGlvKS4gSWZcclxuICogdGhpcyBjb21wb25lbnQgd2VyZSB0byBzdXBwb3J0IG1vcmUgdGhhbiBvbmUgc2VhcmNoIHNvdXJjZSBlbmFibGVkIChjaGVja2JveCksXHJcbiAqIHRoZSBzZWFyY2hiYXIgY29tcG9uZW50IHdvdWxkIHJlcXVpcmUgYSBzbWFsbCBjaGFuZ2UgdG8gaXQnc1xyXG4gKiBwbGFjZWhvbGRlciBnZXR0ZXIuIFRoZSBzZWFyY2ggc291cmNlIHNlcnZpY2UgYWxyZWFkeSBzdXBwb3J0cyBoYXZpbmdcclxuICogbW9yZSB0aGFuIG9uZSBzZWFyY2ggc291cmNlIGVuYWJsZWQuXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1zZWFyY2gtc2V0dGluZ3MnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWFyY2gtc2V0dGluZ3MuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3NlYXJjaC1zZXR0aW5ncy5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU2VhcmNoU2V0dGluZ3NDb21wb25lbnQge1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGVuYWJsZWQgc2VhcmNoIHR5cGUgY2hhbmdlc1xyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZWFyY2hTb3VyY2VTZXJ2aWNlOiBTZWFyY2hTb3VyY2VTZXJ2aWNlKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgYWxsIHNlYXJjaCBzb3VyY2VzXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0U2VhcmNoU291cmNlcygpOiBTZWFyY2hTb3VyY2VbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWFyY2hTb3VyY2VTZXJ2aWNlLmdldFNvdXJjZXMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyaWdnZXJlZCB3aGVuIGEgc2V0dGluZyBpcyBjaGVja2VkIChjaGVja2JveCBzdHlsZSlcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBzZXR0aW5nc1ZhbHVlQ2hlY2tlZENoZWNrYm94KFxyXG4gICAgZXZlbnQ6IE1hdENoZWNrYm94Q2hhbmdlLFxyXG4gICAgc291cmNlOiBTZWFyY2hTb3VyY2UsXHJcbiAgICBzZXR0aW5nOiBTZWFyY2hTb3VyY2VTZXR0aW5ncyxcclxuICAgIHNldHRpbmdWYWx1ZTogU2V0dGluZ09wdGlvbnNcclxuICApIHtcclxuICAgIHNldHRpbmdWYWx1ZS5lbmFibGVkID0gZXZlbnQuY2hlY2tlZDtcclxuICAgIHNvdXJjZS5zZXRQYXJhbUZyb21TZXR0aW5nKHNldHRpbmcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHJpZ2dlcmVkIHdoZW4gYSBzZXR0aW5nIGlzIGNoZWNrZWQgKHJhZGlvYnV0dG9uIHN0eWxlKVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHNldHRpbmdzVmFsdWVDaGVja2VkUmFkaW9CdXR0b24oXHJcbiAgICBldmVudDogTWF0UmFkaW9DaGFuZ2UsXHJcbiAgICBzb3VyY2U6IFNlYXJjaFNvdXJjZSxcclxuICAgIHNldHRpbmc6IFNlYXJjaFNvdXJjZVNldHRpbmdzLFxyXG4gICAgc2V0dGluZ1ZhbHVlOiBTZXR0aW5nT3B0aW9uc1xyXG4gICkge1xyXG4gICAgc2V0dGluZy52YWx1ZXMuZm9yRWFjaCggY29uZiA9PiB7XHJcbiAgICAgIGlmIChjb25mLnZhbHVlICE9PSBzZXR0aW5nVmFsdWUudmFsdWUpIHtcclxuICAgICAgICBjb25mLmVuYWJsZWQgPSAhZXZlbnQuc291cmNlLmNoZWNrZWQ7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uZi5lbmFibGVkID0gZXZlbnQuc291cmNlLmNoZWNrZWQ7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgc291cmNlLnNldFBhcmFtRnJvbVNldHRpbmcoc2V0dGluZyk7XHJcbiAgfVxyXG5cclxuICBvbkNoZWNrU2VhcmNoU291cmNlKGV2ZW50OiBNYXRDaGVja2JveENoYW5nZSwgc291cmNlOiBTZWFyY2hTb3VyY2UpIHtcclxuICAgIHNvdXJjZS5lbmFibGVkID0gZXZlbnQuY2hlY2tlZDtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==