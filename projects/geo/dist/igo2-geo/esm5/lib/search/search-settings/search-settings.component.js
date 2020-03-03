/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var SearchSettingsComponent = /** @class */ (function () {
    function SearchSettingsComponent(searchSourceService, mediaService) {
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
    Object.defineProperty(SearchSettingsComponent.prototype, "isTouchScreen", {
        get: /**
         * @return {?}
         */
        function () {
            return this.mediaService.isTouchScreen();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    SearchSettingsComponent.prototype.handleKeyboardEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.keyCode === 113) {
            this.pointerSummaryEnabled = !this.pointerSummaryEnabled;
            this.pointerSummaryStatus.emit(this.pointerSummaryEnabled);
        }
    };
    /**
     * @return {?}
     */
    SearchSettingsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.hasPointerReverseSearchSource = this.hasReverseSearchSourcesForPointerSummary();
    };
    /**
     * Get all search sources
     * @internal
     */
    /**
     * Get all search sources
     * \@internal
     * @return {?}
     */
    SearchSettingsComponent.prototype.getSearchSources = /**
     * Get all search sources
     * \@internal
     * @return {?}
     */
    function () {
        /** @type {?} */
        var textSearchSources = this.searchSourceService
            .getSources()
            .filter(sourceCanSearch)
            .filter((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s.available && s.getId() !== 'map' && s.showInSettings; }));
        /** @type {?} */
        var reverseSearchSources = this.searchSourceService
            .getSources()
            .filter(sourceCanReverseSearch)
            .filter((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s.available && s.getId() !== 'map' && s.showInSettings; }));
        return textSearchSources.concat(reverseSearchSources);
    };
    /**
     * Get all search sources usable for pointer summary
     * @internal
     */
    /**
     * Get all search sources usable for pointer summary
     * \@internal
     * @return {?}
     */
    SearchSettingsComponent.prototype.hasReverseSearchSourcesForPointerSummary = /**
     * Get all search sources usable for pointer summary
     * \@internal
     * @return {?}
     */
    function () {
        if (this.searchSourceService.getEnabledSources().filter(sourceCanReverseSearchAsSummary).length) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Triggered when a setting is checked (checkbox style)
     * @internal
     */
    /**
     * Triggered when a setting is checked (checkbox style)
     * \@internal
     * @param {?} event
     * @param {?} source
     * @param {?} setting
     * @param {?} settingValue
     * @return {?}
     */
    SearchSettingsComponent.prototype.settingsValueCheckedCheckbox = /**
     * Triggered when a setting is checked (checkbox style)
     * \@internal
     * @param {?} event
     * @param {?} source
     * @param {?} setting
     * @param {?} settingValue
     * @return {?}
     */
    function (event, source, setting, settingValue) {
        settingValue.enabled = event.checked;
        source.setParamFromSetting(setting);
        this.searchSourceChange.emit(source);
    };
    /**
     * Defining the action to do for check/uncheck checkboxes
     * return true if all checkbox must be checked
     * return false if all checkbox must be unchecked
     * @internal
     */
    /**
     * Defining the action to do for check/uncheck checkboxes
     * return true if all checkbox must be checked
     * return false if all checkbox must be unchecked
     * \@internal
     * @param {?} setting
     * @return {?}
     */
    SearchSettingsComponent.prototype.computeCheckAllBehavior = /**
     * Defining the action to do for check/uncheck checkboxes
     * return true if all checkbox must be checked
     * return false if all checkbox must be unchecked
     * \@internal
     * @param {?} setting
     * @return {?}
     */
    function (setting) {
        if (setting.allEnabled === undefined) {
            if (setting.values.find((/**
             * @param {?} settingValue
             * @return {?}
             */
            function (settingValue) { return settingValue.enabled; }))) {
                setting.allEnabled = false;
            }
            else {
                setting.allEnabled = true;
            }
        }
        else {
            setting.allEnabled = !setting.allEnabled;
        }
    };
    /**
     * Triggered when the check all / uncheck all type is clicked,
     * @internal
     */
    /**
     * Triggered when the check all / uncheck all type is clicked,
     * \@internal
     * @param {?} event
     * @param {?} source
     * @param {?} setting
     * @return {?}
     */
    SearchSettingsComponent.prototype.checkUncheckAll = /**
     * Triggered when the check all / uncheck all type is clicked,
     * \@internal
     * @param {?} event
     * @param {?} source
     * @param {?} setting
     * @return {?}
     */
    function (event, source, setting) {
        event.stopPropagation();
        this.computeCheckAllBehavior(setting);
        setting.values.forEach((/**
         * @param {?} settingValue
         * @return {?}
         */
        function (settingValue) {
            settingValue.enabled = setting.allEnabled;
        }));
        source.setParamFromSetting(setting);
        this.searchSourceChange.emit(source);
    };
    /**
     * Triggered when a setting is checked (radiobutton style)
     * @internal
     */
    /**
     * Triggered when a setting is checked (radiobutton style)
     * \@internal
     * @param {?} event
     * @param {?} source
     * @param {?} setting
     * @param {?} settingValue
     * @return {?}
     */
    SearchSettingsComponent.prototype.settingsValueCheckedRadioButton = /**
     * Triggered when a setting is checked (radiobutton style)
     * \@internal
     * @param {?} event
     * @param {?} source
     * @param {?} setting
     * @param {?} settingValue
     * @return {?}
     */
    function (event, source, setting, settingValue) {
        setting.values.forEach((/**
         * @param {?} conf
         * @return {?}
         */
        function (conf) {
            if (conf.value !== settingValue.value) {
                conf.enabled = !event.source.checked;
            }
            else {
                conf.enabled = event.source.checked;
            }
        }));
        source.setParamFromSetting(setting);
        this.searchSourceChange.emit(source);
    };
    /**
     * @param {?} event
     * @param {?} source
     * @return {?}
     */
    SearchSettingsComponent.prototype.onCheckSearchSource = /**
     * @param {?} event
     * @param {?} source
     * @return {?}
     */
    function (event, source) {
        source.enabled = event.checked;
        this.searchSourceChange.emit(source);
    };
    /**
     * @param {?} setting
     * @return {?}
     */
    SearchSettingsComponent.prototype.getAvailableValues = /**
     * @param {?} setting
     * @return {?}
     */
    function (setting) {
        return setting.values.filter((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s.available !== false; }));
    };
    /**
     * @param {?} setting
     * @return {?}
     */
    SearchSettingsComponent.prototype.getAvailableHashtagsValues = /**
     * @param {?} setting
     * @return {?}
     */
    function (setting) {
        var e_1, _a;
        if (setting.hashtags) {
            /** @type {?} */
            var output = [];
            try {
                for (var _b = tslib_1.__values(setting.hashtags), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var value = _c.value;
                    value = '#' + value;
                    output.push(value);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return output;
        }
        return;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SearchSettingsComponent.prototype.stopPropagation = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
    };
    /**
     * @param {?} event
     * @param {?=} fromTitleButton
     * @return {?}
     */
    SearchSettingsComponent.prototype.changePointerReverseSearch = /**
     * @param {?} event
     * @param {?=} fromTitleButton
     * @return {?}
     */
    function (event, fromTitleButton) {
        if (fromTitleButton) {
            event.stopPropagation();
            this.pointerSummaryEnabled = !this.pointerSummaryEnabled;
        }
        else {
            this.pointerSummaryEnabled = event.checked;
        }
        this.pointerSummaryStatus.emit(this.pointerSummaryEnabled);
    };
    SearchSettingsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-search-settings',
                    template: "<div class=\"igo-search-settings\">\r\n\r\n  <button\r\n    mat-icon-button\r\n    class=\"igo-search-settings-button\"\r\n    color=\"primary\"\r\n    tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"'igo.geo.search.menu.tooltip' | translate\"\r\n    [matMenuTriggerFor]=\"searchSettingsMenu\">\r\n    <mat-icon svgIcon=\"chevron-down\"></mat-icon>\r\n  </button>\r\n  <mat-menu\r\n    #searchSettingsMenu=\"matMenu\"\r\n    class=\"no-border-radius\">\r\n      <ng-container *ngFor=\"let source of getSearchSources()\">\r\n        <span class=\"igo-search-settings-search-source\">\r\n          <mat-checkbox\r\n            class=\"igo-search-settings-checkbox\"\r\n            [checked]=\"source.enabled\"\r\n            [value]=\"source\"\r\n            (click)=\"$event.stopPropagation()\"\r\n            (change)=\"onCheckSearchSource($event, source)\">\r\n          </mat-checkbox>\r\n          <button *ngIf=\"source.settings.length\u00A0>\u00A00\"\r\n            [matMenuTriggerFor]=\"sub_menu\"\r\n            mat-menu-item>{{source.title}}\r\n          </button>\r\n          <button\r\n            mat-menu-item\r\n            *ngIf=\"source.settings.length\u00A0===\u00A00\">\r\n            {{source.title}}\r\n          </button>\r\n        </span>\r\n          <mat-menu #sub_menu=\"matMenu\">\r\n            <ng-container *ngFor=\"let setting of source.settings\">\r\n              <button\r\n                  mat-menu-item\r\n                  [matMenuTriggerFor]=\"test_sub_menu\">\r\n                {{'igo.geo.search.searchSources.settings.'+ setting.title | translate}}\r\n              </button>\r\n              <mat-menu #test_sub_menu=\"matMenu\"\r\n                [ngSwitch]=\"setting.type\"\r\n                yPosition=\"above\">\r\n                <span *ngSwitchCase=\"'radiobutton'\">\r\n                  <mat-radio-group\r\n                    class=\"igo-search-settings-radio-group\"\r\n                    [value]=\"setting\">\r\n                    <mat-radio-button *ngFor=\"let settingValue of setting.values\"\r\n                      class=\"mat-typography\"\r\n                      [value]=\"settingValue\"\r\n                      [checked]=\"settingValue.enabled\"\r\n                      (click)=\"$event.stopPropagation()\"\r\n                      (change)=\"settingsValueCheckedRadioButton($event, source, setting, settingValue)\">\r\n                      {{settingValue.title | translate}}\r\n                    </mat-radio-button>\r\n                  </mat-radio-group>\r\n                </span>\r\n                <span *ngSwitchCase=\"'checkbox'\">\r\n                  <div class=\"checkAllButton\" *ngIf=\"setting.values.length\u00A0>\u00A03\">\r\n                    <button mat-raised-button\r\n                      (click)=\"checkUncheckAll($event, source, setting)\">{{setting.allEnabled || setting.allEnabled === undefined  ? ('igo.geo.search.searchSources.settings.unselectAll' | translate): ('igo.geo.search.searchSources.settings.selectAll' | translate)}}</button>\r\n                  </div>\r\n                  <mat-checkbox *ngFor=\"let settingValue of getAvailableValues(setting)\"\r\n                    class=\"mat-menu-item\"\r\n                    [checked]=\"settingValue.enabled\"\r\n                    [value]=\"setting\"\r\n                    [matTooltip]=\"getAvailableHashtagsValues(settingValue)\"\r\n                    (click)=\"$event.stopPropagation()\"\r\n                    (change)=\"settingsValueCheckedCheckbox($event, source, setting, settingValue)\">\r\n                    {{settingValue.title | translate}}\r\n                  </mat-checkbox>\r\n                </span>\r\n              </mat-menu>\r\n            </ng-container>\r\n          </mat-menu>\r\n      </ng-container>\r\n      <span *ngIf=\"hasPointerReverseSearchSource && !isTouchScreen\">\r\n        <mat-divider></mat-divider>\r\n        <span class=\"pointer-summary-slide-toggle-container mat-typography\">\r\n          <mat-slide-toggle class=\"pointer-summary-option\" (change)=\"changePointerReverseSearch($event)\" tooltip-position=\"below\"\r\n            matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.search.pointerSearchSummary.tooltip' | translate\"\r\n            (click)=\"$event.stopPropagation()\" [checked]=\"pointerSummaryEnabled\" [labelPosition]=\"'after'\">\r\n            {{'igo.geo.search.pointerSearchSummary.title' | translate}}\r\n          </mat-slide-toggle>\r\n        </span>\r\n      </span>\r\n  </mat-menu>\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".checkAllButton{text-align:center;padding:0 5px}.igo-search-settings-button ::ng-deep div.mat-button-ripple-round{border-radius:0}.igo-search-settings-radio-group{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.igo-search-settings-radio-group mat-radio-button{margin:5px}.igo-search-settings-checkbox mat-radio-button{display:-webkit-box;display:flex}.igo-search-settings-search-source{display:-webkit-box;display:flex;width:100%}.igo-search-settings-search-source mat-checkbox{display:-webkit-box;display:flex;margin-left:5px;margin-right:5px}.pointer-summary-option{display:block;margin-right:10px;margin-bottom:15px}.pointer-summary-slide-toggle-container{overflow-x:hidden}.pointer-summary-slide-toggle-container mat-slide-toggle{margin:10px}"]
                }] }
    ];
    /** @nocollapse */
    SearchSettingsComponent.ctorParameters = function () { return [
        { type: SearchSourceService },
        { type: MediaService }
    ]; };
    SearchSettingsComponent.propDecorators = {
        pointerSummaryEnabled: [{ type: Input }],
        searchSourceChange: [{ type: Output }],
        pointerSummaryStatus: [{ type: Output }],
        handleKeyboardEvent: [{ type: HostListener, args: ['document:keydown', ['$event'],] }]
    };
    return SearchSettingsComponent;
}());
export { SearchSettingsComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXNldHRpbmdzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gvc2VhcmNoLXNldHRpbmdzL3NlYXJjaC1zZXR0aW5ncy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEVBQ0wsU0FBUyxFQUNULE1BQU0sRUFDTixZQUFZLEVBQ1osdUJBQXVCLEVBRXZCLFlBQVksRUFDWixLQUFLLEVBQ04sTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFNdEUsT0FBTyxFQUFFLCtCQUErQixFQUFFLGVBQWUsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2xILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxZQUFZLENBQUM7Ozs7Ozs7OztBQVUxQztJQXNDRSxpQ0FDVSxtQkFBd0MsRUFDeEMsWUFBMEI7UUFEMUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQWhDN0Isa0NBQTZCLEdBQVksS0FBSyxDQUFDO1FBRS9DLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixnQkFBVyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQU12QiwwQkFBcUIsR0FBWSxLQUFLLENBQUM7Ozs7UUFLdEMsdUJBQWtCLEdBQUcsSUFBSSxZQUFZLEVBQWdCLENBQUM7Ozs7UUFLdEQseUJBQW9CLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztJQWN4RCxDQUFDO0lBNUJOLHNCQUFJLGtEQUFhOzs7O1FBQWpCO1lBQ0UsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzNDLENBQUM7OztPQUFBOzs7OztJQWVELHFEQUFtQjs7OztJQURuQixVQUNvQixLQUFvQjtRQUV0QyxJQUFJLEtBQUssQ0FBQyxPQUFP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QUM7Q0FBQSxBQW5MRCxJQW1MQztTQTdLWSx1QkFBdUI7OztJQUVsQyxnRUFBc0Q7O0lBRXRELHlDQUFtQjs7SUFDbkIsOENBQWdDOztJQU1oQyx3REFBZ0Q7Ozs7O0lBS2hELHFEQUFnRTs7Ozs7SUFLaEUsdURBQTZEOzs7OztJQVkzRCxzREFBZ0Q7Ozs7O0lBQ2hELCtDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hdENoZWNrYm94Q2hhbmdlLCBNYXRSYWRpb0NoYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgT25Jbml0LFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBJbnB1dFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU2VhcmNoU291cmNlU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZWFyY2gtc291cmNlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2UgfSBmcm9tICcuLi9zaGFyZWQvc291cmNlcy9zb3VyY2UnO1xyXG5pbXBvcnQge1xyXG4gIFNlYXJjaFNvdXJjZVNldHRpbmdzLFxyXG4gIFNldHRpbmdPcHRpb25zXHJcbn0gZnJvbSAnLi4vc2hhcmVkL3NvdXJjZXMvc291cmNlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBzb3VyY2VDYW5SZXZlcnNlU2VhcmNoQXNTdW1tYXJ5LCBzb3VyY2VDYW5TZWFyY2gsIHNvdXJjZUNhblJldmVyc2VTZWFyY2ggfSBmcm9tICcuLi9zaGFyZWQvc2VhcmNoLnV0aWxzJztcclxuaW1wb3J0IHsgTWVkaWFTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG4vKipcclxuICogVGhpcyBjb21wb25lbnQgYWxsb3dzIGEgdXNlciB0byBzZWxlY3QgYSBzZWFyY2ggdHlwZSB5byBlbmFibGUuIEluIGl0J3NcclxuICogY3VycmVudCB2ZXJzaW9uLCBvbmx5IG9uZSBzZWFyY2ggdHlwZSBjYW4gYmUgc2VsZWN0ZWQgYXQgb25jZSAocmFkaW8pLiBJZlxyXG4gKiB0aGlzIGNvbXBvbmVudCB3ZXJlIHRvIHN1cHBvcnQgbW9yZSB0aGFuIG9uZSBzZWFyY2ggc291cmNlIGVuYWJsZWQgKGNoZWNrYm94KSxcclxuICogdGhlIHNlYXJjaGJhciBjb21wb25lbnQgd291bGQgcmVxdWlyZSBhIHNtYWxsIGNoYW5nZSB0byBpdCdzXHJcbiAqIHBsYWNlaG9sZGVyIGdldHRlci4gVGhlIHNlYXJjaCBzb3VyY2Ugc2VydmljZSBhbHJlYWR5IHN1cHBvcnRzIGhhdmluZ1xyXG4gKiBtb3JlIHRoYW4gb25lIHNlYXJjaCBzb3VyY2UgZW5hYmxlZC5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXNlYXJjaC1zZXR0aW5ncycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NlYXJjaC1zZXR0aW5ncy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc2VhcmNoLXNldHRpbmdzLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFNlYXJjaFNldHRpbmdzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgcHVibGljIGhhc1BvaW50ZXJSZXZlcnNlU2VhcmNoU291cmNlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIHB1YmxpYyBidWZmZXIgPSBbXTtcclxuICBwdWJsaWMgbGFzdEtleVRpbWUgPSBEYXRlLm5vdygpO1xyXG5cclxuICBnZXQgaXNUb3VjaFNjcmVlbigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm1lZGlhU2VydmljZS5pc1RvdWNoU2NyZWVuKCk7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBwb2ludGVyU3VtbWFyeUVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBlbmFibGVkIHNlYXJjaCBzb3VyY2UgY2hhbmdlc1xyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzZWFyY2hTb3VyY2VDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFNlYXJjaFNvdXJjZT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBwb2ludGVyIHN1bW1hcnkgaXMgYWN0aXZhdGVkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHBvaW50ZXJTdW1tYXJ5U3RhdHVzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlkb3duJywgWyckZXZlbnQnXSlcclxuICBoYW5kbGVLZXlib2FyZEV2ZW50KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcblxyXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDExMykge1xyXG4gICAgICB0aGlzLnBvaW50ZXJTdW1tYXJ5RW5hYmxlZCA9ICF0aGlzLnBvaW50ZXJTdW1tYXJ5RW5hYmxlZDtcclxuICAgICAgdGhpcy5wb2ludGVyU3VtbWFyeVN0YXR1cy5lbWl0KHRoaXMucG9pbnRlclN1bW1hcnlFbmFibGVkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBzZWFyY2hTb3VyY2VTZXJ2aWNlOiBTZWFyY2hTb3VyY2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBtZWRpYVNlcnZpY2U6IE1lZGlhU2VydmljZVxyXG4gICAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuaGFzUG9pbnRlclJldmVyc2VTZWFyY2hTb3VyY2UgPSB0aGlzLmhhc1JldmVyc2VTZWFyY2hTb3VyY2VzRm9yUG9pbnRlclN1bW1hcnkoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBhbGwgc2VhcmNoIHNvdXJjZXNcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXRTZWFyY2hTb3VyY2VzKCk6IFNlYXJjaFNvdXJjZVtdIHtcclxuICAgIGNvbnN0IHRleHRTZWFyY2hTb3VyY2VzID0gdGhpcy5zZWFyY2hTb3VyY2VTZXJ2aWNlXHJcbiAgICAgIC5nZXRTb3VyY2VzKClcclxuICAgICAgLmZpbHRlcihzb3VyY2VDYW5TZWFyY2gpXHJcbiAgICAgIC5maWx0ZXIocyA9PiBzLmF2YWlsYWJsZSAmJiBzLmdldElkKCkgIT09ICdtYXAnICYmIHMuc2hvd0luU2V0dGluZ3MpO1xyXG5cclxuICAgIGNvbnN0IHJldmVyc2VTZWFyY2hTb3VyY2VzID0gdGhpcy5zZWFyY2hTb3VyY2VTZXJ2aWNlXHJcbiAgICAgIC5nZXRTb3VyY2VzKClcclxuICAgICAgLmZpbHRlcihzb3VyY2VDYW5SZXZlcnNlU2VhcmNoKVxyXG4gICAgICAuZmlsdGVyKHMgPT4gcy5hdmFpbGFibGUgJiYgcy5nZXRJZCgpICE9PSAnbWFwJyAmJiBzLnNob3dJblNldHRpbmdzKTtcclxuICAgIHJldHVybiB0ZXh0U2VhcmNoU291cmNlcy5jb25jYXQocmV2ZXJzZVNlYXJjaFNvdXJjZXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGFsbCBzZWFyY2ggc291cmNlcyB1c2FibGUgZm9yIHBvaW50ZXIgc3VtbWFyeVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGhhc1JldmVyc2VTZWFyY2hTb3VyY2VzRm9yUG9pbnRlclN1bW1hcnkoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5zZWFyY2hTb3VyY2VTZXJ2aWNlLmdldEVuYWJsZWRTb3VyY2VzKCkuZmlsdGVyKHNvdXJjZUNhblJldmVyc2VTZWFyY2hBc1N1bW1hcnkpLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyaWdnZXJlZCB3aGVuIGEgc2V0dGluZyBpcyBjaGVja2VkIChjaGVja2JveCBzdHlsZSlcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBzZXR0aW5nc1ZhbHVlQ2hlY2tlZENoZWNrYm94KFxyXG4gICAgZXZlbnQ6IE1hdENoZWNrYm94Q2hhbmdlLFxyXG4gICAgc291cmNlOiBTZWFyY2hTb3VyY2UsXHJcbiAgICBzZXR0aW5nOiBTZWFyY2hTb3VyY2VTZXR0aW5ncyxcclxuICAgIHNldHRpbmdWYWx1ZTogU2V0dGluZ09wdGlvbnNcclxuICApIHtcclxuICAgIHNldHRpbmdWYWx1ZS5lbmFibGVkID0gZXZlbnQuY2hlY2tlZDtcclxuICAgIHNvdXJjZS5zZXRQYXJhbUZyb21TZXR0aW5nKHNldHRpbmcpO1xyXG4gICAgdGhpcy5zZWFyY2hTb3VyY2VDaGFuZ2UuZW1pdChzb3VyY2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5pbmcgdGhlIGFjdGlvbiB0byBkbyBmb3IgY2hlY2svdW5jaGVjayBjaGVja2JveGVzXHJcbiAgICogcmV0dXJuIHRydWUgaWYgYWxsIGNoZWNrYm94IG11c3QgYmUgY2hlY2tlZFxyXG4gICAqIHJldHVybiBmYWxzZSBpZiBhbGwgY2hlY2tib3ggbXVzdCBiZSB1bmNoZWNrZWRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBjb21wdXRlQ2hlY2tBbGxCZWhhdmlvcihzZXR0aW5nOiBTZWFyY2hTb3VyY2VTZXR0aW5ncykge1xyXG4gICAgaWYgKHNldHRpbmcuYWxsRW5hYmxlZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGlmIChzZXR0aW5nLnZhbHVlcy5maW5kKHNldHRpbmdWYWx1ZSA9PiBzZXR0aW5nVmFsdWUuZW5hYmxlZCkpIHtcclxuICAgICAgICBzZXR0aW5nLmFsbEVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZXR0aW5nLmFsbEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZXR0aW5nLmFsbEVuYWJsZWQgPSAhc2V0dGluZy5hbGxFbmFibGVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHJpZ2dlcmVkIHdoZW4gdGhlIGNoZWNrIGFsbCAvIHVuY2hlY2sgYWxsIHR5cGUgaXMgY2xpY2tlZCxcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBjaGVja1VuY2hlY2tBbGwoZXZlbnQsIHNvdXJjZTogU2VhcmNoU291cmNlLCBzZXR0aW5nOiBTZWFyY2hTb3VyY2VTZXR0aW5ncykge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB0aGlzLmNvbXB1dGVDaGVja0FsbEJlaGF2aW9yKHNldHRpbmcpO1xyXG4gICAgc2V0dGluZy52YWx1ZXMuZm9yRWFjaChzZXR0aW5nVmFsdWUgPT4ge1xyXG4gICAgICBzZXR0aW5nVmFsdWUuZW5hYmxlZCA9IHNldHRpbmcuYWxsRW5hYmxlZDtcclxuICAgIH0pO1xyXG4gICAgc291cmNlLnNldFBhcmFtRnJvbVNldHRpbmcoc2V0dGluZyk7XHJcbiAgICB0aGlzLnNlYXJjaFNvdXJjZUNoYW5nZS5lbWl0KHNvdXJjZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUcmlnZ2VyZWQgd2hlbiBhIHNldHRpbmcgaXMgY2hlY2tlZCAocmFkaW9idXR0b24gc3R5bGUpXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgc2V0dGluZ3NWYWx1ZUNoZWNrZWRSYWRpb0J1dHRvbihcclxuICAgIGV2ZW50OiBNYXRSYWRpb0NoYW5nZSxcclxuICAgIHNvdXJjZTogU2VhcmNoU291cmNlLFxyXG4gICAgc2V0dGluZzogU2VhcmNoU291cmNlU2V0dGluZ3MsXHJcbiAgICBzZXR0aW5nVmFsdWU6IFNldHRpbmdPcHRpb25zXHJcbiAgKSB7XHJcbiAgICBzZXR0aW5nLnZhbHVlcy5mb3JFYWNoKGNvbmYgPT4ge1xyXG4gICAgICBpZiAoY29uZi52YWx1ZSAhPT0gc2V0dGluZ1ZhbHVlLnZhbHVlKSB7XHJcbiAgICAgICAgY29uZi5lbmFibGVkID0gIWV2ZW50LnNvdXJjZS5jaGVja2VkO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbmYuZW5hYmxlZCA9IGV2ZW50LnNvdXJjZS5jaGVja2VkO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHNvdXJjZS5zZXRQYXJhbUZyb21TZXR0aW5nKHNldHRpbmcpO1xyXG4gICAgdGhpcy5zZWFyY2hTb3VyY2VDaGFuZ2UuZW1pdChzb3VyY2UpO1xyXG4gIH1cclxuXHJcbiAgb25DaGVja1NlYXJjaFNvdXJjZShldmVudDogTWF0Q2hlY2tib3hDaGFuZ2UsIHNvdXJjZTogU2VhcmNoU291cmNlKSB7XHJcbiAgICBzb3VyY2UuZW5hYmxlZCA9IGV2ZW50LmNoZWNrZWQ7XHJcbiAgICB0aGlzLnNlYXJjaFNvdXJjZUNoYW5nZS5lbWl0KHNvdXJjZSk7XHJcbiAgfVxyXG5cclxuICBnZXRBdmFpbGFibGVWYWx1ZXMoc2V0dGluZzogU2VhcmNoU291cmNlU2V0dGluZ3MpIHtcclxuICAgIHJldHVybiBzZXR0aW5nLnZhbHVlcy5maWx0ZXIocyA9PiBzLmF2YWlsYWJsZSAhPT0gZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgZ2V0QXZhaWxhYmxlSGFzaHRhZ3NWYWx1ZXMoc2V0dGluZzogU2V0dGluZ09wdGlvbnMpIHtcclxuICAgIGlmIChzZXR0aW5nLmhhc2h0YWdzKSB7XHJcbiAgICAgIGNvbnN0IG91dHB1dDogc3RyaW5nW10gPSBbXTtcclxuICAgICAgZm9yIChsZXQgdmFsdWUgb2Ygc2V0dGluZy5oYXNodGFncykge1xyXG4gICAgICAgIHZhbHVlID0gJyMnICsgdmFsdWU7XHJcbiAgICAgICAgb3V0cHV0LnB1c2godmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBzdG9wUHJvcGFnYXRpb24oZXZlbnQpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlUG9pbnRlclJldmVyc2VTZWFyY2goZXZlbnQsIGZyb21UaXRsZUJ1dHRvbj86IGJvb2xlYW4pIHtcclxuICAgIGlmIChmcm9tVGl0bGVCdXR0b24pIHtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHRoaXMucG9pbnRlclN1bW1hcnlFbmFibGVkID0gIXRoaXMucG9pbnRlclN1bW1hcnlFbmFibGVkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wb2ludGVyU3VtbWFyeUVuYWJsZWQgPSBldmVudC5jaGVja2VkO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucG9pbnRlclN1bW1hcnlTdGF0dXMuZW1pdCh0aGlzLnBvaW50ZXJTdW1tYXJ5RW5hYmxlZCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==