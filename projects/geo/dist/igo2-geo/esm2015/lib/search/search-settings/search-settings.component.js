/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter, ChangeDetectionStrategy, HostListener, Input } from '@angular/core';
import { SearchSourceService } from '../shared/search-source.service';
import { sourceCanReverseSearchAsSummary, sourceCanSearch, sourceCanReverseSearch } from '../shared/search.utils';
import { MediaService } from '@igo2/core';
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
     * @param {?} mediaService
     */
    constructor(searchSourceService, mediaService) {
        this.searchSourceService = searchSourceService;
        this.mediaService = mediaService;
        this.hasPointerReverseSearchSource = false;
        this.buffer = [];
        this.lastKeyTime = Date.now();
        this.pointerSummaryEnabled = false;
        /**
         * Event emitted when the enabled search source changes
         */
        this.searchSourceChange = new EventEmitter();
        /**
         * Event emitted when the pointer summary is activated
         */
        this.pointerSummaryStatus = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get isTouchScreen() {
        return this.mediaService.isTouchScreen();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleKeyboardEvent(event) {
        if (event.keyCode === 113) {
            this.pointerSummaryEnabled = !this.pointerSummaryEnabled;
            this.pointerSummaryStatus.emit(this.pointerSummaryEnabled);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.hasPointerReverseSearchSource = this.hasReverseSearchSourcesForPointerSummary();
    }
    /**
     * Get all search sources
     * \@internal
     * @return {?}
     */
    getSearchSources() {
        /** @type {?} */
        const textSearchSources = this.searchSourceService
            .getSources()
            .filter(sourceCanSearch)
            .filter((/**
         * @param {?} s
         * @return {?}
         */
        s => s.available && s.getId() !== 'map' && s.showInSettings));
        /** @type {?} */
        const reverseSearchSources = this.searchSourceService
            .getSources()
            .filter(sourceCanReverseSearch)
            .filter((/**
         * @param {?} s
         * @return {?}
         */
        s => s.available && s.getId() !== 'map' && s.showInSettings));
        return textSearchSources.concat(reverseSearchSources);
    }
    /**
     * Get all search sources usable for pointer summary
     * \@internal
     * @return {?}
     */
    hasReverseSearchSourcesForPointerSummary() {
        if (this.searchSourceService.getEnabledSources().filter(sourceCanReverseSearchAsSummary).length) {
            return true;
        }
        else {
            return false;
        }
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
        this.searchSourceChange.emit(source);
    }
    /**
     * Defining the action to do for check/uncheck checkboxes
     * return true if all checkbox must be checked
     * return false if all checkbox must be unchecked
     * \@internal
     * @param {?} setting
     * @return {?}
     */
    computeCheckAllBehavior(setting) {
        if (setting.allEnabled === undefined) {
            if (setting.values.find((/**
             * @param {?} settingValue
             * @return {?}
             */
            settingValue => settingValue.enabled))) {
                setting.allEnabled = false;
            }
            else {
                setting.allEnabled = true;
            }
        }
        else {
            setting.allEnabled = !setting.allEnabled;
        }
    }
    /**
     * Triggered when the check all / uncheck all type is clicked,
     * \@internal
     * @param {?} event
     * @param {?} source
     * @param {?} setting
     * @return {?}
     */
    checkUncheckAll(event, source, setting) {
        event.stopPropagation();
        this.computeCheckAllBehavior(setting);
        setting.values.forEach((/**
         * @param {?} settingValue
         * @return {?}
         */
        settingValue => {
            settingValue.enabled = setting.allEnabled;
        }));
        source.setParamFromSetting(setting);
        this.searchSourceChange.emit(source);
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
        this.searchSourceChange.emit(source);
    }
    /**
     * @param {?} event
     * @param {?} source
     * @return {?}
     */
    onCheckSearchSource(event, source) {
        source.enabled = event.checked;
        this.searchSourceChange.emit(source);
    }
    /**
     * @param {?} setting
     * @return {?}
     */
    getAvailableValues(setting) {
        return setting.values.filter((/**
         * @param {?} s
         * @return {?}
         */
        s => s.available !== false));
    }
    /**
     * @param {?} setting
     * @return {?}
     */
    getAvailableHashtagsValues(setting) {
        if (setting.hashtags) {
            /** @type {?} */
            const output = [];
            for (let value of setting.hashtags) {
                value = '#' + value;
                output.push(value);
            }
            return output;
        }
        return;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    stopPropagation(event) {
        event.stopPropagation();
    }
    /**
     * @param {?} event
     * @param {?=} fromTitleButton
     * @return {?}
     */
    changePointerReverseSearch(event, fromTitleButton) {
        if (fromTitleButton) {
            event.stopPropagation();
            this.pointerSummaryEnabled = !this.pointerSummaryEnabled;
        }
        else {
            this.pointerSummaryEnabled = event.checked;
        }
        this.pointerSummaryStatus.emit(this.pointerSummaryEnabled);
    }
}
SearchSettingsComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-search-settings',
                template: "<div class=\"igo-search-settings\">\r\n\r\n  <button\r\n    mat-icon-button\r\n    class=\"igo-search-settings-button\"\r\n    color=\"primary\"\r\n    tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"'igo.geo.search.menu.tooltip' | translate\"\r\n    [matMenuTriggerFor]=\"searchSettingsMenu\">\r\n    <mat-icon svgIcon=\"chevron-down\"></mat-icon>\r\n  </button>\r\n  <mat-menu\r\n    #searchSettingsMenu=\"matMenu\"\r\n    class=\"no-border-radius\">\r\n      <ng-container *ngFor=\"let source of getSearchSources()\">\r\n        <span class=\"igo-search-settings-search-source\">\r\n          <mat-checkbox\r\n            class=\"igo-search-settings-checkbox\"\r\n            [checked]=\"source.enabled\"\r\n            [value]=\"source\"\r\n            (click)=\"$event.stopPropagation()\"\r\n            (change)=\"onCheckSearchSource($event, source)\">\r\n          </mat-checkbox>\r\n          <button *ngIf=\"source.settings.length\u00A0>\u00A00\"\r\n            [matMenuTriggerFor]=\"sub_menu\"\r\n            mat-menu-item>{{source.title}}\r\n          </button>\r\n          <button\r\n            mat-menu-item\r\n            *ngIf=\"source.settings.length\u00A0===\u00A00\">\r\n            {{source.title}}\r\n          </button>\r\n        </span>\r\n          <mat-menu #sub_menu=\"matMenu\">\r\n            <ng-container *ngFor=\"let setting of source.settings\">\r\n              <button\r\n                  mat-menu-item\r\n                  [matMenuTriggerFor]=\"test_sub_menu\">\r\n                {{'igo.geo.search.searchSources.settings.'+ setting.title | translate}}\r\n              </button>\r\n              <mat-menu #test_sub_menu=\"matMenu\"\r\n                [ngSwitch]=\"setting.type\"\r\n                yPosition=\"above\">\r\n                <span *ngSwitchCase=\"'radiobutton'\">\r\n                  <mat-radio-group\r\n                    class=\"igo-search-settings-radio-group\"\r\n                    [value]=\"setting\">\r\n                    <mat-radio-button *ngFor=\"let settingValue of setting.values\"\r\n                      class=\"mat-typography\"\r\n                      [value]=\"settingValue\"\r\n                      [checked]=\"settingValue.enabled\"\r\n                      (click)=\"$event.stopPropagation()\"\r\n                      (change)=\"settingsValueCheckedRadioButton($event, source, setting, settingValue)\">\r\n                      {{settingValue.title | translate}}\r\n                    </mat-radio-button>\r\n                  </mat-radio-group>\r\n                </span>\r\n                <span *ngSwitchCase=\"'checkbox'\">\r\n                  <div class=\"checkAllButton\" *ngIf=\"setting.values.length\u00A0>\u00A03\">\r\n                    <button mat-raised-button\r\n                      (click)=\"checkUncheckAll($event, source, setting)\">{{setting.allEnabled || setting.allEnabled === undefined  ? ('igo.geo.search.searchSources.settings.unselectAll' | translate): ('igo.geo.search.searchSources.settings.selectAll' | translate)}}</button>\r\n                  </div>\r\n                  <mat-checkbox *ngFor=\"let settingValue of getAvailableValues(setting)\"\r\n                    class=\"mat-menu-item\"\r\n                    [checked]=\"settingValue.enabled\"\r\n                    [value]=\"setting\"\r\n                    [matTooltip]=\"getAvailableHashtagsValues(settingValue)\"\r\n                    (click)=\"$event.stopPropagation()\"\r\n                    (change)=\"settingsValueCheckedCheckbox($event, source, setting, settingValue)\">\r\n                    {{settingValue.title | translate}}\r\n                  </mat-checkbox>\r\n                </span>\r\n              </mat-menu>\r\n            </ng-container>\r\n          </mat-menu>\r\n      </ng-container>\r\n      <span *ngIf=\"hasPointerReverseSearchSource && !isTouchScreen\">\r\n        <mat-divider></mat-divider>\r\n        <span class=\"pointer-summary-slide-toggle-container mat-typography\">\r\n          <mat-slide-toggle class=\"pointer-summary-option\" (change)=\"changePointerReverseSearch($event)\" tooltip-position=\"below\"\r\n            matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.search.pointerSearchSummary.tooltip' | translate\"\r\n            (click)=\"$event.stopPropagation()\" [checked]=\"pointerSummaryEnabled\" [labelPosition]=\"'after'\">\r\n            {{'igo.geo.search.pointerSearchSummary.title' | translate}}\r\n          </mat-slide-toggle>\r\n        </span>\r\n      </span>\r\n  </mat-menu>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".checkAllButton{text-align:center;padding:0 5px}.igo-search-settings-button ::ng-deep div.mat-button-ripple-round{border-radius:0}.igo-search-settings-radio-group{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.igo-search-settings-radio-group mat-radio-button{margin:5px}.igo-search-settings-checkbox mat-radio-button{display:-webkit-box;display:flex}.igo-search-settings-search-source{display:-webkit-box;display:flex;width:100%}.igo-search-settings-search-source mat-checkbox{display:-webkit-box;display:flex;margin-left:5px;margin-right:5px}.pointer-summary-option{display:block;margin-right:10px;margin-bottom:15px}.pointer-summary-slide-toggle-container{overflow-x:hidden}.pointer-summary-slide-toggle-container mat-slide-toggle{margin:10px}"]
            }] }
];
/** @nocollapse */
SearchSettingsComponent.ctorParameters = () => [
    { type: SearchSourceService },
    { type: MediaService }
];
SearchSettingsComponent.propDecorators = {
    pointerSummaryEnabled: [{ type: Input }],
    searchSourceChange: [{ type: Output }],
    pointerSummaryStatus: [{ type: Output }],
    handleKeyboardEvent: [{ type: HostListener, args: ['document:keydown', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    SearchSettingsComponent.prototype.hasPointerReverseSearchSource;
    /** @type {?} */
    SearchSettingsComponent.prototype.buffer;
    /** @type {?} */
    SearchSettingsComponent.prototype.lastKeyTime;
    /** @type {?} */
    SearchSettingsComponent.prototype.pointerSummaryEnabled;
    /**
     * Event emitted when the enabled search source changes
     * @type {?}
     */
    SearchSettingsComponent.prototype.searchSourceChange;
    /**
     * Event emitted when the pointer summary is activated
     * @type {?}
     */
    SearchSettingsComponent.prototype.pointerSummaryStatus;
    /**
     * @type {?}
     * @private
     */
    SearchSettingsComponent.prototype.searchSourceService;
    /**
     * @type {?}
     * @private
     */
    SearchSettingsComponent.prototype.mediaService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXNldHRpbmdzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gvc2VhcmNoLXNldHRpbmdzL3NlYXJjaC1zZXR0aW5ncy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUNOLFlBQVksRUFDWix1QkFBdUIsRUFFdkIsWUFBWSxFQUNaLEtBQUssRUFDTixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQU10RSxPQUFPLEVBQUUsK0JBQStCLEVBQUUsZUFBZSxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbEgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFlBQVksQ0FBQzs7Ozs7Ozs7O0FBZ0IxQyxNQUFNLE9BQU8sdUJBQXVCOzs7OztJQWdDbEMsWUFDVSxtQkFBd0MsRUFDeEMsWUFBMEI7UUFEMUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQWhDN0Isa0NBQTZCLEdBQVksS0FBSyxDQUFDO1FBRS9DLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixnQkFBVyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQU12QiwwQkFBcUIsR0FBWSxLQUFLLENBQUM7Ozs7UUFLdEMsdUJBQWtCLEdBQUcsSUFBSSxZQUFZLEVBQWdCLENBQUM7Ozs7UUFLdEQseUJBQW9CLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztJQWN4RCxDQUFDOzs7O0lBNUJOLElBQUksYUFBYTtRQUNmLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQyxDQUFDOzs7OztJQWVELG1CQUFtQixDQUFDLEtBQW9CO1FBRXRDLElBQUksS0FBSyxDQUFDLE9BQU8sS0FB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LE1BQU0sQ0FBQztTQUNmO1FBQ0QsT0FBTztJQUNULENBQUM7Ozs7O0lBRUQsZUFBZSxDQUFDLEtBQUs7UUFDbkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzFCLENBQUM7Ozs7OztJQUVELDBCQUEwQixDQUFDLEtBQUssRUFBRSxlQUF5QjtRQUN6RCxJQUFJLGVBQWUsRUFBRTtZQUNuQixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1NBQzFEO2FBQU07WUFDTCxJQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztTQUM1QztRQUVELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDN0QsQ0FBQzs7O1lBbExGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQiw4OUlBQStDO2dCQUUvQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs7WUF0QlEsbUJBQW1CO1lBT25CLFlBQVk7OztvQ0EyQmxCLEtBQUs7aUNBS0wsTUFBTTttQ0FLTixNQUFNO2tDQUVOLFlBQVksU0FBQyxrQkFBa0IsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7OztJQXJCNUMsZ0VBQXNEOztJQUV0RCx5Q0FBbUI7O0lBQ25CLDhDQUFnQzs7SUFNaEMsd0RBQWdEOzs7OztJQUtoRCxxREFBZ0U7Ozs7O0lBS2hFLHVEQUE2RDs7Ozs7SUFZM0Qsc0RBQWdEOzs7OztJQUNoRCwrQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXRDaGVja2JveENoYW5nZSwgTWF0UmFkaW9DaGFuZ2UgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIE9uSW5pdCxcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgSW5wdXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZVNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VhcmNoLXNvdXJjZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU2VhcmNoU291cmNlIH0gZnJvbSAnLi4vc2hhcmVkL3NvdXJjZXMvc291cmNlJztcclxuaW1wb3J0IHtcclxuICBTZWFyY2hTb3VyY2VTZXR0aW5ncyxcclxuICBTZXR0aW5nT3B0aW9uc1xyXG59IGZyb20gJy4uL3NoYXJlZC9zb3VyY2VzL3NvdXJjZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgc291cmNlQ2FuUmV2ZXJzZVNlYXJjaEFzU3VtbWFyeSwgc291cmNlQ2FuU2VhcmNoLCBzb3VyY2VDYW5SZXZlcnNlU2VhcmNoIH0gZnJvbSAnLi4vc2hhcmVkL3NlYXJjaC51dGlscyc7XHJcbmltcG9ydCB7IE1lZGlhU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY29tcG9uZW50IGFsbG93cyBhIHVzZXIgdG8gc2VsZWN0IGEgc2VhcmNoIHR5cGUgeW8gZW5hYmxlLiBJbiBpdCdzXHJcbiAqIGN1cnJlbnQgdmVyc2lvbiwgb25seSBvbmUgc2VhcmNoIHR5cGUgY2FuIGJlIHNlbGVjdGVkIGF0IG9uY2UgKHJhZGlvKS4gSWZcclxuICogdGhpcyBjb21wb25lbnQgd2VyZSB0byBzdXBwb3J0IG1vcmUgdGhhbiBvbmUgc2VhcmNoIHNvdXJjZSBlbmFibGVkIChjaGVja2JveCksXHJcbiAqIHRoZSBzZWFyY2hiYXIgY29tcG9uZW50IHdvdWxkIHJlcXVpcmUgYSBzbWFsbCBjaGFuZ2UgdG8gaXQnc1xyXG4gKiBwbGFjZWhvbGRlciBnZXR0ZXIuIFRoZSBzZWFyY2ggc291cmNlIHNlcnZpY2UgYWxyZWFkeSBzdXBwb3J0cyBoYXZpbmdcclxuICogbW9yZSB0aGFuIG9uZSBzZWFyY2ggc291cmNlIGVuYWJsZWQuXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1zZWFyY2gtc2V0dGluZ3MnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWFyY2gtc2V0dGluZ3MuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3NlYXJjaC1zZXR0aW5ncy5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hTZXR0aW5nc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIHB1YmxpYyBoYXNQb2ludGVyUmV2ZXJzZVNlYXJjaFNvdXJjZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBwdWJsaWMgYnVmZmVyID0gW107XHJcbiAgcHVibGljIGxhc3RLZXlUaW1lID0gRGF0ZS5ub3coKTtcclxuXHJcbiAgZ2V0IGlzVG91Y2hTY3JlZW4oKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5tZWRpYVNlcnZpY2UuaXNUb3VjaFNjcmVlbigpO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgcG9pbnRlclN1bW1hcnlFbmFibGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZW5hYmxlZCBzZWFyY2ggc291cmNlIGNoYW5nZXNcclxuICAgKi9cclxuICBAT3V0cHV0KCkgc2VhcmNoU291cmNlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxTZWFyY2hTb3VyY2U+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgcG9pbnRlciBzdW1tYXJ5IGlzIGFjdGl2YXRlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBwb2ludGVyU3VtbWFyeVN0YXR1cyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5ZG93bicsIFsnJGV2ZW50J10pXHJcbiAgaGFuZGxlS2V5Ym9hcmRFdmVudChldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG5cclxuICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMTMpIHtcclxuICAgICAgdGhpcy5wb2ludGVyU3VtbWFyeUVuYWJsZWQgPSAhdGhpcy5wb2ludGVyU3VtbWFyeUVuYWJsZWQ7XHJcbiAgICAgIHRoaXMucG9pbnRlclN1bW1hcnlTdGF0dXMuZW1pdCh0aGlzLnBvaW50ZXJTdW1tYXJ5RW5hYmxlZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgc2VhcmNoU291cmNlU2VydmljZTogU2VhcmNoU291cmNlU2VydmljZSxcclxuICAgIHByaXZhdGUgbWVkaWFTZXJ2aWNlOiBNZWRpYVNlcnZpY2VcclxuICAgICkge31cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmhhc1BvaW50ZXJSZXZlcnNlU2VhcmNoU291cmNlID0gdGhpcy5oYXNSZXZlcnNlU2VhcmNoU291cmNlc0ZvclBvaW50ZXJTdW1tYXJ5KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgYWxsIHNlYXJjaCBzb3VyY2VzXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0U2VhcmNoU291cmNlcygpOiBTZWFyY2hTb3VyY2VbXSB7XHJcbiAgICBjb25zdCB0ZXh0U2VhcmNoU291cmNlcyA9IHRoaXMuc2VhcmNoU291cmNlU2VydmljZVxyXG4gICAgICAuZ2V0U291cmNlcygpXHJcbiAgICAgIC5maWx0ZXIoc291cmNlQ2FuU2VhcmNoKVxyXG4gICAgICAuZmlsdGVyKHMgPT4gcy5hdmFpbGFibGUgJiYgcy5nZXRJZCgpICE9PSAnbWFwJyAmJiBzLnNob3dJblNldHRpbmdzKTtcclxuXHJcbiAgICBjb25zdCByZXZlcnNlU2VhcmNoU291cmNlcyA9IHRoaXMuc2VhcmNoU291cmNlU2VydmljZVxyXG4gICAgICAuZ2V0U291cmNlcygpXHJcbiAgICAgIC5maWx0ZXIoc291cmNlQ2FuUmV2ZXJzZVNlYXJjaClcclxuICAgICAgLmZpbHRlcihzID0+IHMuYXZhaWxhYmxlICYmIHMuZ2V0SWQoKSAhPT0gJ21hcCcgJiYgcy5zaG93SW5TZXR0aW5ncyk7XHJcbiAgICByZXR1cm4gdGV4dFNlYXJjaFNvdXJjZXMuY29uY2F0KHJldmVyc2VTZWFyY2hTb3VyY2VzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBhbGwgc2VhcmNoIHNvdXJjZXMgdXNhYmxlIGZvciBwb2ludGVyIHN1bW1hcnlcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBoYXNSZXZlcnNlU2VhcmNoU291cmNlc0ZvclBvaW50ZXJTdW1tYXJ5KCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHRoaXMuc2VhcmNoU291cmNlU2VydmljZS5nZXRFbmFibGVkU291cmNlcygpLmZpbHRlcihzb3VyY2VDYW5SZXZlcnNlU2VhcmNoQXNTdW1tYXJ5KS5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUcmlnZ2VyZWQgd2hlbiBhIHNldHRpbmcgaXMgY2hlY2tlZCAoY2hlY2tib3ggc3R5bGUpXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgc2V0dGluZ3NWYWx1ZUNoZWNrZWRDaGVja2JveChcclxuICAgIGV2ZW50OiBNYXRDaGVja2JveENoYW5nZSxcclxuICAgIHNvdXJjZTogU2VhcmNoU291cmNlLFxyXG4gICAgc2V0dGluZzogU2VhcmNoU291cmNlU2V0dGluZ3MsXHJcbiAgICBzZXR0aW5nVmFsdWU6IFNldHRpbmdPcHRpb25zXHJcbiAgKSB7XHJcbiAgICBzZXR0aW5nVmFsdWUuZW5hYmxlZCA9IGV2ZW50LmNoZWNrZWQ7XHJcbiAgICBzb3VyY2Uuc2V0UGFyYW1Gcm9tU2V0dGluZyhzZXR0aW5nKTtcclxuICAgIHRoaXMuc2VhcmNoU291cmNlQ2hhbmdlLmVtaXQoc291cmNlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlZmluaW5nIHRoZSBhY3Rpb24gdG8gZG8gZm9yIGNoZWNrL3VuY2hlY2sgY2hlY2tib3hlc1xyXG4gICAqIHJldHVybiB0cnVlIGlmIGFsbCBjaGVja2JveCBtdXN0IGJlIGNoZWNrZWRcclxuICAgKiByZXR1cm4gZmFsc2UgaWYgYWxsIGNoZWNrYm94IG11c3QgYmUgdW5jaGVja2VkXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgY29tcHV0ZUNoZWNrQWxsQmVoYXZpb3Ioc2V0dGluZzogU2VhcmNoU291cmNlU2V0dGluZ3MpIHtcclxuICAgIGlmIChzZXR0aW5nLmFsbEVuYWJsZWQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBpZiAoc2V0dGluZy52YWx1ZXMuZmluZChzZXR0aW5nVmFsdWUgPT4gc2V0dGluZ1ZhbHVlLmVuYWJsZWQpKSB7XHJcbiAgICAgICAgc2V0dGluZy5hbGxFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2V0dGluZy5hbGxFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2V0dGluZy5hbGxFbmFibGVkID0gIXNldHRpbmcuYWxsRW5hYmxlZDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyaWdnZXJlZCB3aGVuIHRoZSBjaGVjayBhbGwgLyB1bmNoZWNrIGFsbCB0eXBlIGlzIGNsaWNrZWQsXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgY2hlY2tVbmNoZWNrQWxsKGV2ZW50LCBzb3VyY2U6IFNlYXJjaFNvdXJjZSwgc2V0dGluZzogU2VhcmNoU291cmNlU2V0dGluZ3MpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgdGhpcy5jb21wdXRlQ2hlY2tBbGxCZWhhdmlvcihzZXR0aW5nKTtcclxuICAgIHNldHRpbmcudmFsdWVzLmZvckVhY2goc2V0dGluZ1ZhbHVlID0+IHtcclxuICAgICAgc2V0dGluZ1ZhbHVlLmVuYWJsZWQgPSBzZXR0aW5nLmFsbEVuYWJsZWQ7XHJcbiAgICB9KTtcclxuICAgIHNvdXJjZS5zZXRQYXJhbUZyb21TZXR0aW5nKHNldHRpbmcpO1xyXG4gICAgdGhpcy5zZWFyY2hTb3VyY2VDaGFuZ2UuZW1pdChzb3VyY2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHJpZ2dlcmVkIHdoZW4gYSBzZXR0aW5nIGlzIGNoZWNrZWQgKHJhZGlvYnV0dG9uIHN0eWxlKVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHNldHRpbmdzVmFsdWVDaGVja2VkUmFkaW9CdXR0b24oXHJcbiAgICBldmVudDogTWF0UmFkaW9DaGFuZ2UsXHJcbiAgICBzb3VyY2U6IFNlYXJjaFNvdXJjZSxcclxuICAgIHNldHRpbmc6IFNlYXJjaFNvdXJjZVNldHRpbmdzLFxyXG4gICAgc2V0dGluZ1ZhbHVlOiBTZXR0aW5nT3B0aW9uc1xyXG4gICkge1xyXG4gICAgc2V0dGluZy52YWx1ZXMuZm9yRWFjaChjb25mID0+IHtcclxuICAgICAgaWYgKGNvbmYudmFsdWUgIT09IHNldHRpbmdWYWx1ZS52YWx1ZSkge1xyXG4gICAgICAgIGNvbmYuZW5hYmxlZCA9ICFldmVudC5zb3VyY2UuY2hlY2tlZDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25mLmVuYWJsZWQgPSBldmVudC5zb3VyY2UuY2hlY2tlZDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBzb3VyY2Uuc2V0UGFyYW1Gcm9tU2V0dGluZyhzZXR0aW5nKTtcclxuICAgIHRoaXMuc2VhcmNoU291cmNlQ2hhbmdlLmVtaXQoc291cmNlKTtcclxuICB9XHJcblxyXG4gIG9uQ2hlY2tTZWFyY2hTb3VyY2UoZXZlbnQ6IE1hdENoZWNrYm94Q2hhbmdlLCBzb3VyY2U6IFNlYXJjaFNvdXJjZSkge1xyXG4gICAgc291cmNlLmVuYWJsZWQgPSBldmVudC5jaGVja2VkO1xyXG4gICAgdGhpcy5zZWFyY2hTb3VyY2VDaGFuZ2UuZW1pdChzb3VyY2UpO1xyXG4gIH1cclxuXHJcbiAgZ2V0QXZhaWxhYmxlVmFsdWVzKHNldHRpbmc6IFNlYXJjaFNvdXJjZVNldHRpbmdzKSB7XHJcbiAgICByZXR1cm4gc2V0dGluZy52YWx1ZXMuZmlsdGVyKHMgPT4gcy5hdmFpbGFibGUgIT09IGZhbHNlKTtcclxuICB9XHJcblxyXG4gIGdldEF2YWlsYWJsZUhhc2h0YWdzVmFsdWVzKHNldHRpbmc6IFNldHRpbmdPcHRpb25zKSB7XHJcbiAgICBpZiAoc2V0dGluZy5oYXNodGFncykge1xyXG4gICAgICBjb25zdCBvdXRwdXQ6IHN0cmluZ1tdID0gW107XHJcbiAgICAgIGZvciAobGV0IHZhbHVlIG9mIHNldHRpbmcuaGFzaHRhZ3MpIHtcclxuICAgICAgICB2YWx1ZSA9ICcjJyArIHZhbHVlO1xyXG4gICAgICAgIG91dHB1dC5wdXNoKHZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gb3V0cHV0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgc3RvcFByb3BhZ2F0aW9uKGV2ZW50KSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZVBvaW50ZXJSZXZlcnNlU2VhcmNoKGV2ZW50LCBmcm9tVGl0bGVCdXR0b24/OiBib29sZWFuKSB7XHJcbiAgICBpZiAoZnJvbVRpdGxlQnV0dG9uKSB7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICB0aGlzLnBvaW50ZXJTdW1tYXJ5RW5hYmxlZCA9ICF0aGlzLnBvaW50ZXJTdW1tYXJ5RW5hYmxlZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucG9pbnRlclN1bW1hcnlFbmFibGVkID0gZXZlbnQuY2hlY2tlZDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnBvaW50ZXJTdW1tYXJ5U3RhdHVzLmVtaXQodGhpcy5wb2ludGVyU3VtbWFyeUVuYWJsZWQpO1xyXG4gIH1cclxufVxyXG4iXX0=