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
        this.searchSourcesAllEnabled = false;
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
        /** @type {?} */
        const sources = textSearchSources.concat(reverseSearchSources);
        this.computeSourcesCheckAllBehavior(sources);
        return sources;
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
     * Defining the action to do for check/uncheck checkboxes (settings)
     * return true if all checkbox must be checked
     * return false if all checkbox must be unchecked
     * \@internal
     * @param {?} setting
     * @return {?}
     */
    computeSettingCheckAllBehavior(setting) {
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
     * Defining the action to do for check/uncheck checkboxes (sources)
     * return true if all checkbox must be checked
     * return false if all checkbox must be unchecked
     * \@internal
     * @param {?} sources
     * @return {?}
     */
    computeSourcesCheckAllBehavior(sources) {
        /** @type {?} */
        const enabledSourcesCnt = sources.filter((/**
         * @param {?} source
         * @return {?}
         */
        source => source.enabled)).length;
        /** @type {?} */
        const disabledSourcesCnt = sources.filter((/**
         * @param {?} source
         * @return {?}
         */
        source => !source.enabled)).length;
        this.searchSourcesAllEnabled = enabledSourcesCnt >= disabledSourcesCnt ? false : true;
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
        this.computeSettingCheckAllBehavior(setting);
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
     * Triggered when the check all / uncheck all type is clicked,
     * \@internal
     * @param {?} event
     * @return {?}
     */
    checkUncheckAllSources(event) {
        event.stopPropagation();
        this.getSearchSources().map((/**
         * @param {?} source
         * @return {?}
         */
        source => {
            source.enabled = this.searchSourcesAllEnabled;
            this.searchSourceChange.emit(source);
        }));
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
                template: "<div class=\"igo-search-settings\">\r\n\r\n  <button\r\n    mat-icon-button\r\n    class=\"igo-search-settings-button\"\r\n    color=\"primary\"\r\n    tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"'igo.geo.search.menu.tooltip' | translate\"\r\n    [matMenuTriggerFor]=\"searchSettingsMenu\">\r\n    <mat-icon svgIcon=\"chevron-down\"></mat-icon>\r\n  </button>\r\n  <mat-menu\r\n    #searchSettingsMenu=\"matMenu\"\r\n    class=\"no-border-radius\">\r\n    <div class=\"checkAllButton\" *ngIf=\"getSearchSources().length>4\">\r\n      <button mat-raised-button\r\n        (click)=\"checkUncheckAllSources($event)\">{{!searchSourcesAllEnabled  ? ('igo.geo.search.searchSources.unselectAll' | translate): ('igo.geo.search.searchSources.selectAll' | translate)}}</button>\r\n    </div>\r\n      <ng-container *ngFor=\"let source of getSearchSources()\">\r\n        <span class=\"igo-search-settings-search-source\">\r\n          <mat-checkbox\r\n            class=\"igo-search-settings-checkbox\"\r\n            [checked]=\"source.enabled\"\r\n            [value]=\"source\"\r\n            (click)=\"$event.stopPropagation()\"\r\n            (change)=\"onCheckSearchSource($event, source)\">\r\n          </mat-checkbox>\r\n          <button *ngIf=\"source.settings.length\u00A0>\u00A00\"\r\n            [matMenuTriggerFor]=\"sub_menu\"\r\n            mat-menu-item>{{source.title}}\r\n          </button>\r\n          <button\r\n            mat-menu-item\r\n            *ngIf=\"source.settings.length\u00A0===\u00A00\">\r\n            {{source.title}}\r\n          </button>\r\n        </span>\r\n          <mat-menu #sub_menu=\"matMenu\">\r\n            <ng-container *ngFor=\"let setting of source.settings\">\r\n              <button\r\n                  mat-menu-item\r\n                  [matMenuTriggerFor]=\"test_sub_menu\">\r\n                {{'igo.geo.search.searchSources.settings.'+ setting.title | translate}}\r\n              </button>\r\n              <mat-menu #test_sub_menu=\"matMenu\"\r\n                [ngSwitch]=\"setting.type\"\r\n                yPosition=\"above\">\r\n                <span *ngSwitchCase=\"'radiobutton'\">\r\n                  <mat-radio-group\r\n                    class=\"igo-search-settings-radio-group\"\r\n                    [value]=\"setting\">\r\n                    <mat-radio-button *ngFor=\"let settingValue of setting.values\"\r\n                      class=\"mat-typography\"\r\n                      [value]=\"settingValue\"\r\n                      [checked]=\"settingValue.enabled\"\r\n                      (click)=\"$event.stopPropagation()\"\r\n                      (change)=\"settingsValueCheckedRadioButton($event, source, setting, settingValue)\">\r\n                      {{settingValue.title | translate}}\r\n                    </mat-radio-button>\r\n                  </mat-radio-group>\r\n                </span>\r\n                <span *ngSwitchCase=\"'checkbox'\">\r\n                  <div class=\"checkAllButton\" *ngIf=\"setting.values.length\u00A0>\u00A03\">\r\n                    <button mat-raised-button\r\n                      (click)=\"checkUncheckAll($event, source, setting)\">{{setting.allEnabled || setting.allEnabled === undefined  ? ('igo.geo.search.searchSources.settings.unselectAll' | translate): ('igo.geo.search.searchSources.settings.selectAll' | translate)}}</button>\r\n                  </div>\r\n                  <mat-checkbox *ngFor=\"let settingValue of getAvailableValues(setting)\"\r\n                    class=\"mat-menu-item\"\r\n                    [checked]=\"settingValue.enabled\"\r\n                    [value]=\"setting\"\r\n                    [matTooltip]=\"getAvailableHashtagsValues(settingValue)\"\r\n                    (click)=\"$event.stopPropagation()\"\r\n                    (change)=\"settingsValueCheckedCheckbox($event, source, setting, settingValue)\">\r\n                    {{settingValue.title | translate}}\r\n                  </mat-checkbox>\r\n                </span>\r\n              </mat-menu>\r\n            </ng-container>\r\n          </mat-menu>\r\n      </ng-container>\r\n      <span *ngIf=\"hasPointerReverseSearchSource && !isTouchScreen\">\r\n        <mat-divider></mat-divider>\r\n        <span class=\"pointer-summary-slide-toggle-container mat-typography\">\r\n          <mat-slide-toggle class=\"pointer-summary-option\" (change)=\"changePointerReverseSearch($event)\" tooltip-position=\"below\"\r\n            matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.search.pointerSearchSummary.tooltip' | translate\"\r\n            (click)=\"$event.stopPropagation()\" [checked]=\"pointerSummaryEnabled\" [labelPosition]=\"'after'\">\r\n            {{'igo.geo.search.pointerSearchSummary.title' | translate}}\r\n          </mat-slide-toggle>\r\n        </span>\r\n      </span>\r\n  </mat-menu>\r\n</div>\r\n",
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
    SearchSettingsComponent.prototype.searchSourcesAllEnabled;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXNldHRpbmdzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gvc2VhcmNoLXNldHRpbmdzL3NlYXJjaC1zZXR0aW5ncy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUNOLFlBQVksRUFDWix1QkFBdUIsRUFFdkIsWUFBWSxFQUNaLEtBQUssRUFDTixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQU10RSxPQUFPLEVBQUUsK0JBQStCLEVBQUUsZUFBZSxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbEgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFlBQVksQ0FBQzs7Ozs7Ozs7O0FBZ0IxQyxNQUFNLE9BQU8sdUJBQXVCOzs7OztJQWlDbEMsWUFDVSxtQkFBd0MsRUFDeEMsWUFBMEI7UUFEMUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQWpDN0Isa0NBQTZCLEdBQVksS0FBSyxDQUFDO1FBQy9DLDRCQUF1QixHQUFZLEtBQUssQ0FBQztRQUV6QyxXQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ1osZ0JBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFNdkIsMEJBQXFCLEdBQVksS0FBSyxDQUFDOzs7O1FBS3RDLHVCQUFrQixHQUFHLElBQUksWUFBWSxFQUFnQixDQUFDOzs7O1FBS3RELHlCQUFvQixHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7SUFjeEQsQ0FBQzs7OztJQTVCTixJQUFJLGFBQWE7UUFDZixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDM0MsQ0FBQzs7Ozs7SUFlRCxtQkFBbUIsQ0FBQyxLQUFvQjtRQUV0QyxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssR0FBRyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztZQUN6RCxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1NBQzVEO0lBQ0gsQ0FBQzs7OztJQU9ELFFBQVE7UUFDTixJQUFJLENBQUMsNkJBQTZCLEdBQUcsSUFBSSxDQUFDLHdDQUF3QyxFQUFFLENBQUM7SUFDdkYsQ0FBQzs7Ozs7O0lBTUQsZ0JBQWdCOztjQUNSLGlCQUFpQixHQUFHLElBQUksQ0FBQyxtQkFBbUI7YUFDL0MsVUFBVSxFQUFFO2FBQ1osTUFBTSxDQUFDLGVBQWUsQ0FBQzthQUN2QixNQUFNOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLGNBQWMsRUFBQzs7Y0FFaEUsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLG1CQUFtQjthQUNsRCxVQUFVLEVBQUU7YUFDWixNQUFNLENBQUMsc0JBQXNCLENBQUM7YUFDOUIsTUFBTTs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxjQUFjLEVBQUM7O2NBQ2hFLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUM7UUFDOUQsSUFBSSxDQUFDLDhCQUE4QixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Ozs7OztJQU1ELHdDQUF3QztRQUN0QyxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLE1BQU0sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLE1BQU0sRUFBRTtZQUMvRixPQUFPLElBQUksQ0FBQztTQUNiO2FBQU07WUFDTCxPQUFPLEtBQUssQ0FBQztTQUNkO0lBQ0gsQ0FBQzs7Ozs7Ozs7OztJQU1ELDRCQUE0QixDQUMxQixLQUF3QixFQUN4QixNQUFvQixFQUNwQixPQUE2QixFQUM3QixZQUE0QjtRQUU1QixZQUFZLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDckMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7Ozs7Ozs7O0lBUUQsOEJBQThCLENBQUMsT0FBNkI7UUFDMUQsSUFBSSxPQUFPLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBRTtZQUNwQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSTs7OztZQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBQyxFQUFFO2dCQUM3RCxPQUFPLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQzthQUM1QjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQzthQUMzQjtTQUNGO2FBQU07WUFDTCxPQUFPLENBQUMsVUFBVSxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztTQUMxQztJQUNILENBQUM7Ozs7Ozs7OztJQVFELDhCQUE4QixDQUFDLE9BQXVCOztjQUM5QyxpQkFBaUIsR0FBRyxPQUFPLENBQUMsTUFBTTs7OztRQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBQyxDQUFDLE1BQU07O2NBQ25FLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxNQUFNOzs7O1FBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUMsQ0FBQyxNQUFNO1FBQzNFLElBQUksQ0FBQyx1QkFBdUIsR0FBSSxpQkFBaUIsSUFBSSxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDekYsQ0FBQzs7Ozs7Ozs7O0lBTUQsZUFBZSxDQUFDLEtBQUssRUFBRSxNQUFvQixFQUFFLE9BQTZCO1FBQ3hFLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsOEJBQThCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0MsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPOzs7O1FBQUMsWUFBWSxDQUFDLEVBQUU7WUFDcEMsWUFBWSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQzVDLENBQUMsRUFBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7Ozs7OztJQU1ELHNCQUFzQixDQUFDLEtBQUs7UUFDMUIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEdBQUc7Ozs7UUFBQyxNQUFNLENBQUMsRUFBRTtZQUNuQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQztZQUM5QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7Ozs7OztJQU1ELCtCQUErQixDQUM3QixLQUFxQixFQUNyQixNQUFvQixFQUNwQixPQUE2QixFQUM3QixZQUE0QjtRQUU1QixPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU87Ozs7UUFBQyxJQUFJLENBQUMsRUFBRTtZQUM1QixJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssWUFBWSxDQUFDLEtBQUssRUFBRTtnQkFDckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO2FBQ3RDO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7YUFDckM7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Ozs7OztJQUVELG1CQUFtQixDQUFDLEtBQXdCLEVBQUUsTUFBb0I7UUFDaEUsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQy9CLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7Ozs7SUFFRCxrQkFBa0IsQ0FBQyxPQUE2QjtRQUM5QyxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTTs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsS0FBSyxLQUFLLEVBQUMsQ0FBQztJQUMzRCxDQUFDOzs7OztJQUVELDBCQUEwQixDQUFDLE9BQXVCO1FBQ2hELElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTs7a0JBQ2QsTUFBTSxHQUFhLEVBQUU7WUFDM0IsS0FBSyxJQUFJLEtBQUssSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFO2dCQUNsQyxLQUFLLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQztnQkFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNwQjtZQUNELE9BQU8sTUFBTSxDQUFDO1NBQ2Y7UUFDRCxPQUFPO0lBQ1QsQ0FBQzs7Ozs7SUFFRCxlQUFlLENBQUMsS0FBSztRQUNuQixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7Ozs7O0lBRUQsMEJBQTBCLENBQUMsS0FBSyxFQUFFLGVBQXlCO1FBQ3pELElBQUksZUFBZSxFQUFFO1lBQ25CLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMscUJBQXFCLEdBQUcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUM7U0FDMUQ7YUFBTTtZQUNMLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQzVDO1FBRUQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUM3RCxDQUFDOzs7WUE3TUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLDJ5SkFBK0M7Z0JBRS9DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7OztZQXRCUSxtQkFBbUI7WUFPbkIsWUFBWTs7O29DQTRCbEIsS0FBSztpQ0FLTCxNQUFNO21DQUtOLE1BQU07a0NBRU4sWUFBWSxTQUFDLGtCQUFrQixFQUFFLENBQUMsUUFBUSxDQUFDOzs7O0lBdEI1QyxnRUFBc0Q7O0lBQ3RELDBEQUFnRDs7SUFFaEQseUNBQW1COztJQUNuQiw4Q0FBZ0M7O0lBTWhDLHdEQUFnRDs7Ozs7SUFLaEQscURBQWdFOzs7OztJQUtoRSx1REFBNkQ7Ozs7O0lBWTNELHNEQUFnRDs7Ozs7SUFDaEQsK0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWF0Q2hlY2tib3hDaGFuZ2UsIE1hdFJhZGlvQ2hhbmdlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBPbkluaXQsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIElucHV0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2VTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlYXJjaC1zb3VyY2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZSB9IGZyb20gJy4uL3NoYXJlZC9zb3VyY2VzL3NvdXJjZSc7XHJcbmltcG9ydCB7XHJcbiAgU2VhcmNoU291cmNlU2V0dGluZ3MsXHJcbiAgU2V0dGluZ09wdGlvbnNcclxufSBmcm9tICcuLi9zaGFyZWQvc291cmNlcy9zb3VyY2UuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IHNvdXJjZUNhblJldmVyc2VTZWFyY2hBc1N1bW1hcnksIHNvdXJjZUNhblNlYXJjaCwgc291cmNlQ2FuUmV2ZXJzZVNlYXJjaCB9IGZyb20gJy4uL3NoYXJlZC9zZWFyY2gudXRpbHMnO1xyXG5pbXBvcnQgeyBNZWRpYVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNvbXBvbmVudCBhbGxvd3MgYSB1c2VyIHRvIHNlbGVjdCBhIHNlYXJjaCB0eXBlIHlvIGVuYWJsZS4gSW4gaXQnc1xyXG4gKiBjdXJyZW50IHZlcnNpb24sIG9ubHkgb25lIHNlYXJjaCB0eXBlIGNhbiBiZSBzZWxlY3RlZCBhdCBvbmNlIChyYWRpbykuIElmXHJcbiAqIHRoaXMgY29tcG9uZW50IHdlcmUgdG8gc3VwcG9ydCBtb3JlIHRoYW4gb25lIHNlYXJjaCBzb3VyY2UgZW5hYmxlZCAoY2hlY2tib3gpLFxyXG4gKiB0aGUgc2VhcmNoYmFyIGNvbXBvbmVudCB3b3VsZCByZXF1aXJlIGEgc21hbGwgY2hhbmdlIHRvIGl0J3NcclxuICogcGxhY2Vob2xkZXIgZ2V0dGVyLiBUaGUgc2VhcmNoIHNvdXJjZSBzZXJ2aWNlIGFscmVhZHkgc3VwcG9ydHMgaGF2aW5nXHJcbiAqIG1vcmUgdGhhbiBvbmUgc2VhcmNoIHNvdXJjZSBlbmFibGVkLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tc2VhcmNoLXNldHRpbmdzJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc2VhcmNoLXNldHRpbmdzLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zZWFyY2gtc2V0dGluZ3MuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VhcmNoU2V0dGluZ3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBwdWJsaWMgaGFzUG9pbnRlclJldmVyc2VTZWFyY2hTb3VyY2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwdWJsaWMgc2VhcmNoU291cmNlc0FsbEVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgcHVibGljIGJ1ZmZlciA9IFtdO1xyXG4gIHB1YmxpYyBsYXN0S2V5VGltZSA9IERhdGUubm93KCk7XHJcblxyXG4gIGdldCBpc1RvdWNoU2NyZWVuKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubWVkaWFTZXJ2aWNlLmlzVG91Y2hTY3JlZW4oKTtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpIHBvaW50ZXJTdW1tYXJ5RW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGVuYWJsZWQgc2VhcmNoIHNvdXJjZSBjaGFuZ2VzXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHNlYXJjaFNvdXJjZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8U2VhcmNoU291cmNlPigpO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHBvaW50ZXIgc3VtbWFyeSBpcyBhY3RpdmF0ZWRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgcG9pbnRlclN1bW1hcnlTdGF0dXMgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleWRvd24nLCBbJyRldmVudCddKVxyXG4gIGhhbmRsZUtleWJvYXJkRXZlbnQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuXHJcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTEzKSB7XHJcbiAgICAgIHRoaXMucG9pbnRlclN1bW1hcnlFbmFibGVkID0gIXRoaXMucG9pbnRlclN1bW1hcnlFbmFibGVkO1xyXG4gICAgICB0aGlzLnBvaW50ZXJTdW1tYXJ5U3RhdHVzLmVtaXQodGhpcy5wb2ludGVyU3VtbWFyeUVuYWJsZWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHNlYXJjaFNvdXJjZVNlcnZpY2U6IFNlYXJjaFNvdXJjZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG1lZGlhU2VydmljZTogTWVkaWFTZXJ2aWNlXHJcbiAgICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5oYXNQb2ludGVyUmV2ZXJzZVNlYXJjaFNvdXJjZSA9IHRoaXMuaGFzUmV2ZXJzZVNlYXJjaFNvdXJjZXNGb3JQb2ludGVyU3VtbWFyeSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGFsbCBzZWFyY2ggc291cmNlc1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldFNlYXJjaFNvdXJjZXMoKTogU2VhcmNoU291cmNlW10ge1xyXG4gICAgY29uc3QgdGV4dFNlYXJjaFNvdXJjZXMgPSB0aGlzLnNlYXJjaFNvdXJjZVNlcnZpY2VcclxuICAgICAgLmdldFNvdXJjZXMoKVxyXG4gICAgICAuZmlsdGVyKHNvdXJjZUNhblNlYXJjaClcclxuICAgICAgLmZpbHRlcihzID0+IHMuYXZhaWxhYmxlICYmIHMuZ2V0SWQoKSAhPT0gJ21hcCcgJiYgcy5zaG93SW5TZXR0aW5ncyk7XHJcblxyXG4gICAgY29uc3QgcmV2ZXJzZVNlYXJjaFNvdXJjZXMgPSB0aGlzLnNlYXJjaFNvdXJjZVNlcnZpY2VcclxuICAgICAgLmdldFNvdXJjZXMoKVxyXG4gICAgICAuZmlsdGVyKHNvdXJjZUNhblJldmVyc2VTZWFyY2gpXHJcbiAgICAgIC5maWx0ZXIocyA9PiBzLmF2YWlsYWJsZSAmJiBzLmdldElkKCkgIT09ICdtYXAnICYmIHMuc2hvd0luU2V0dGluZ3MpO1xyXG4gICAgY29uc3Qgc291cmNlcyA9IHRleHRTZWFyY2hTb3VyY2VzLmNvbmNhdChyZXZlcnNlU2VhcmNoU291cmNlcyk7XHJcbiAgICB0aGlzLmNvbXB1dGVTb3VyY2VzQ2hlY2tBbGxCZWhhdmlvcihzb3VyY2VzKTtcclxuICAgIHJldHVybiBzb3VyY2VzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGFsbCBzZWFyY2ggc291cmNlcyB1c2FibGUgZm9yIHBvaW50ZXIgc3VtbWFyeVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGhhc1JldmVyc2VTZWFyY2hTb3VyY2VzRm9yUG9pbnRlclN1bW1hcnkoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5zZWFyY2hTb3VyY2VTZXJ2aWNlLmdldEVuYWJsZWRTb3VyY2VzKCkuZmlsdGVyKHNvdXJjZUNhblJldmVyc2VTZWFyY2hBc1N1bW1hcnkpLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyaWdnZXJlZCB3aGVuIGEgc2V0dGluZyBpcyBjaGVja2VkIChjaGVja2JveCBzdHlsZSlcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBzZXR0aW5nc1ZhbHVlQ2hlY2tlZENoZWNrYm94KFxyXG4gICAgZXZlbnQ6IE1hdENoZWNrYm94Q2hhbmdlLFxyXG4gICAgc291cmNlOiBTZWFyY2hTb3VyY2UsXHJcbiAgICBzZXR0aW5nOiBTZWFyY2hTb3VyY2VTZXR0aW5ncyxcclxuICAgIHNldHRpbmdWYWx1ZTogU2V0dGluZ09wdGlvbnNcclxuICApIHtcclxuICAgIHNldHRpbmdWYWx1ZS5lbmFibGVkID0gZXZlbnQuY2hlY2tlZDtcclxuICAgIHNvdXJjZS5zZXRQYXJhbUZyb21TZXR0aW5nKHNldHRpbmcpO1xyXG4gICAgdGhpcy5zZWFyY2hTb3VyY2VDaGFuZ2UuZW1pdChzb3VyY2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5pbmcgdGhlIGFjdGlvbiB0byBkbyBmb3IgY2hlY2svdW5jaGVjayBjaGVja2JveGVzIChzZXR0aW5ncylcclxuICAgKiByZXR1cm4gdHJ1ZSBpZiBhbGwgY2hlY2tib3ggbXVzdCBiZSBjaGVja2VkXHJcbiAgICogcmV0dXJuIGZhbHNlIGlmIGFsbCBjaGVja2JveCBtdXN0IGJlIHVuY2hlY2tlZFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGNvbXB1dGVTZXR0aW5nQ2hlY2tBbGxCZWhhdmlvcihzZXR0aW5nOiBTZWFyY2hTb3VyY2VTZXR0aW5ncykge1xyXG4gICAgaWYgKHNldHRpbmcuYWxsRW5hYmxlZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGlmIChzZXR0aW5nLnZhbHVlcy5maW5kKHNldHRpbmdWYWx1ZSA9PiBzZXR0aW5nVmFsdWUuZW5hYmxlZCkpIHtcclxuICAgICAgICBzZXR0aW5nLmFsbEVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZXR0aW5nLmFsbEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZXR0aW5nLmFsbEVuYWJsZWQgPSAhc2V0dGluZy5hbGxFbmFibGVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5pbmcgdGhlIGFjdGlvbiB0byBkbyBmb3IgY2hlY2svdW5jaGVjayBjaGVja2JveGVzIChzb3VyY2VzKVxyXG4gICAqIHJldHVybiB0cnVlIGlmIGFsbCBjaGVja2JveCBtdXN0IGJlIGNoZWNrZWRcclxuICAgKiByZXR1cm4gZmFsc2UgaWYgYWxsIGNoZWNrYm94IG11c3QgYmUgdW5jaGVja2VkXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgY29tcHV0ZVNvdXJjZXNDaGVja0FsbEJlaGF2aW9yKHNvdXJjZXM6IFNlYXJjaFNvdXJjZVtdKSB7XHJcbiAgICBjb25zdCBlbmFibGVkU291cmNlc0NudCA9IHNvdXJjZXMuZmlsdGVyKHNvdXJjZSA9PiBzb3VyY2UuZW5hYmxlZCkubGVuZ3RoO1xyXG4gICAgY29uc3QgZGlzYWJsZWRTb3VyY2VzQ250ID0gc291cmNlcy5maWx0ZXIoc291cmNlID0+ICFzb3VyY2UuZW5hYmxlZCkubGVuZ3RoO1xyXG4gICAgdGhpcy5zZWFyY2hTb3VyY2VzQWxsRW5hYmxlZCA9ICBlbmFibGVkU291cmNlc0NudCA+PSBkaXNhYmxlZFNvdXJjZXNDbnQgPyBmYWxzZSA6IHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUcmlnZ2VyZWQgd2hlbiB0aGUgY2hlY2sgYWxsIC8gdW5jaGVjayBhbGwgdHlwZSBpcyBjbGlja2VkLFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGNoZWNrVW5jaGVja0FsbChldmVudCwgc291cmNlOiBTZWFyY2hTb3VyY2UsIHNldHRpbmc6IFNlYXJjaFNvdXJjZVNldHRpbmdzKSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIHRoaXMuY29tcHV0ZVNldHRpbmdDaGVja0FsbEJlaGF2aW9yKHNldHRpbmcpO1xyXG4gICAgc2V0dGluZy52YWx1ZXMuZm9yRWFjaChzZXR0aW5nVmFsdWUgPT4ge1xyXG4gICAgICBzZXR0aW5nVmFsdWUuZW5hYmxlZCA9IHNldHRpbmcuYWxsRW5hYmxlZDtcclxuICAgIH0pO1xyXG4gICAgc291cmNlLnNldFBhcmFtRnJvbVNldHRpbmcoc2V0dGluZyk7XHJcbiAgICB0aGlzLnNlYXJjaFNvdXJjZUNoYW5nZS5lbWl0KHNvdXJjZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUcmlnZ2VyZWQgd2hlbiB0aGUgY2hlY2sgYWxsIC8gdW5jaGVjayBhbGwgdHlwZSBpcyBjbGlja2VkLFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGNoZWNrVW5jaGVja0FsbFNvdXJjZXMoZXZlbnQpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgdGhpcy5nZXRTZWFyY2hTb3VyY2VzKCkubWFwKHNvdXJjZSA9PiB7XHJcbiAgICAgIHNvdXJjZS5lbmFibGVkID0gdGhpcy5zZWFyY2hTb3VyY2VzQWxsRW5hYmxlZDtcclxuICAgICAgdGhpcy5zZWFyY2hTb3VyY2VDaGFuZ2UuZW1pdChzb3VyY2UpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUcmlnZ2VyZWQgd2hlbiBhIHNldHRpbmcgaXMgY2hlY2tlZCAocmFkaW9idXR0b24gc3R5bGUpXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgc2V0dGluZ3NWYWx1ZUNoZWNrZWRSYWRpb0J1dHRvbihcclxuICAgIGV2ZW50OiBNYXRSYWRpb0NoYW5nZSxcclxuICAgIHNvdXJjZTogU2VhcmNoU291cmNlLFxyXG4gICAgc2V0dGluZzogU2VhcmNoU291cmNlU2V0dGluZ3MsXHJcbiAgICBzZXR0aW5nVmFsdWU6IFNldHRpbmdPcHRpb25zXHJcbiAgKSB7XHJcbiAgICBzZXR0aW5nLnZhbHVlcy5mb3JFYWNoKGNvbmYgPT4ge1xyXG4gICAgICBpZiAoY29uZi52YWx1ZSAhPT0gc2V0dGluZ1ZhbHVlLnZhbHVlKSB7XHJcbiAgICAgICAgY29uZi5lbmFibGVkID0gIWV2ZW50LnNvdXJjZS5jaGVja2VkO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbmYuZW5hYmxlZCA9IGV2ZW50LnNvdXJjZS5jaGVja2VkO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHNvdXJjZS5zZXRQYXJhbUZyb21TZXR0aW5nKHNldHRpbmcpO1xyXG4gICAgdGhpcy5zZWFyY2hTb3VyY2VDaGFuZ2UuZW1pdChzb3VyY2UpO1xyXG4gIH1cclxuXHJcbiAgb25DaGVja1NlYXJjaFNvdXJjZShldmVudDogTWF0Q2hlY2tib3hDaGFuZ2UsIHNvdXJjZTogU2VhcmNoU291cmNlKSB7XHJcbiAgICBzb3VyY2UuZW5hYmxlZCA9IGV2ZW50LmNoZWNrZWQ7XHJcbiAgICB0aGlzLnNlYXJjaFNvdXJjZUNoYW5nZS5lbWl0KHNvdXJjZSk7XHJcbiAgfVxyXG5cclxuICBnZXRBdmFpbGFibGVWYWx1ZXMoc2V0dGluZzogU2VhcmNoU291cmNlU2V0dGluZ3MpIHtcclxuICAgIHJldHVybiBzZXR0aW5nLnZhbHVlcy5maWx0ZXIocyA9PiBzLmF2YWlsYWJsZSAhPT0gZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgZ2V0QXZhaWxhYmxlSGFzaHRhZ3NWYWx1ZXMoc2V0dGluZzogU2V0dGluZ09wdGlvbnMpIHtcclxuICAgIGlmIChzZXR0aW5nLmhhc2h0YWdzKSB7XHJcbiAgICAgIGNvbnN0IG91dHB1dDogc3RyaW5nW10gPSBbXTtcclxuICAgICAgZm9yIChsZXQgdmFsdWUgb2Ygc2V0dGluZy5oYXNodGFncykge1xyXG4gICAgICAgIHZhbHVlID0gJyMnICsgdmFsdWU7XHJcbiAgICAgICAgb3V0cHV0LnB1c2godmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBzdG9wUHJvcGFnYXRpb24oZXZlbnQpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlUG9pbnRlclJldmVyc2VTZWFyY2goZXZlbnQsIGZyb21UaXRsZUJ1dHRvbj86IGJvb2xlYW4pIHtcclxuICAgIGlmIChmcm9tVGl0bGVCdXR0b24pIHtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHRoaXMucG9pbnRlclN1bW1hcnlFbmFibGVkID0gIXRoaXMucG9pbnRlclN1bW1hcnlFbmFibGVkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wb2ludGVyU3VtbWFyeUVuYWJsZWQgPSBldmVudC5jaGVja2VkO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucG9pbnRlclN1bW1hcnlTdGF0dXMuZW1pdCh0aGlzLnBvaW50ZXJTdW1tYXJ5RW5hYmxlZCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==