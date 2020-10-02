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
        /** @type {?} */
        var sources = textSearchSources.concat(reverseSearchSources);
        this.computeSourcesCheckAllBehavior(sources);
        return sources;
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
     * Defining the action to do for check/uncheck checkboxes (settings)
     * return true if all checkbox must be checked
     * return false if all checkbox must be unchecked
     * @internal
     */
    /**
     * Defining the action to do for check/uncheck checkboxes (settings)
     * return true if all checkbox must be checked
     * return false if all checkbox must be unchecked
     * \@internal
     * @param {?} setting
     * @return {?}
     */
    SearchSettingsComponent.prototype.computeSettingCheckAllBehavior = /**
     * Defining the action to do for check/uncheck checkboxes (settings)
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
     * Defining the action to do for check/uncheck checkboxes (sources)
     * return true if all checkbox must be checked
     * return false if all checkbox must be unchecked
     * @internal
     */
    /**
     * Defining the action to do for check/uncheck checkboxes (sources)
     * return true if all checkbox must be checked
     * return false if all checkbox must be unchecked
     * \@internal
     * @param {?} sources
     * @return {?}
     */
    SearchSettingsComponent.prototype.computeSourcesCheckAllBehavior = /**
     * Defining the action to do for check/uncheck checkboxes (sources)
     * return true if all checkbox must be checked
     * return false if all checkbox must be unchecked
     * \@internal
     * @param {?} sources
     * @return {?}
     */
    function (sources) {
        /** @type {?} */
        var enabledSourcesCnt = sources.filter((/**
         * @param {?} source
         * @return {?}
         */
        function (source) { return source.enabled; })).length;
        /** @type {?} */
        var disabledSourcesCnt = sources.filter((/**
         * @param {?} source
         * @return {?}
         */
        function (source) { return !source.enabled; })).length;
        this.searchSourcesAllEnabled = enabledSourcesCnt >= disabledSourcesCnt ? false : true;
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
        this.computeSettingCheckAllBehavior(setting);
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
     * Triggered when the check all / uncheck all type is clicked,
     * @internal
     */
    /**
     * Triggered when the check all / uncheck all type is clicked,
     * \@internal
     * @param {?} event
     * @return {?}
     */
    SearchSettingsComponent.prototype.checkUncheckAllSources = /**
     * Triggered when the check all / uncheck all type is clicked,
     * \@internal
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        event.stopPropagation();
        this.getSearchSources().map((/**
         * @param {?} source
         * @return {?}
         */
        function (source) {
            source.enabled = _this.searchSourcesAllEnabled;
            _this.searchSourceChange.emit(source);
        }));
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
                    template: "<div class=\"igo-search-settings\">\r\n\r\n  <button\r\n    mat-icon-button\r\n    class=\"igo-search-settings-button\"\r\n    color=\"primary\"\r\n    tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"'igo.geo.search.menu.tooltip' | translate\"\r\n    [matMenuTriggerFor]=\"searchSettingsMenu\">\r\n    <mat-icon svgIcon=\"chevron-down\"></mat-icon>\r\n  </button>\r\n  <mat-menu\r\n    #searchSettingsMenu=\"matMenu\"\r\n    class=\"no-border-radius\">\r\n    <div class=\"checkAllButton\" *ngIf=\"getSearchSources().length>4\">\r\n      <button mat-raised-button\r\n        (click)=\"checkUncheckAllSources($event)\">{{!searchSourcesAllEnabled  ? ('igo.geo.search.searchSources.unselectAll' | translate): ('igo.geo.search.searchSources.selectAll' | translate)}}</button>\r\n    </div>\r\n      <ng-container *ngFor=\"let source of getSearchSources()\">\r\n        <span class=\"igo-search-settings-search-source\">\r\n          <mat-checkbox\r\n            class=\"igo-search-settings-checkbox\"\r\n            [checked]=\"source.enabled\"\r\n            [value]=\"source\"\r\n            (click)=\"$event.stopPropagation()\"\r\n            (change)=\"onCheckSearchSource($event, source)\">\r\n          </mat-checkbox>\r\n          <button *ngIf=\"source.settings.length\u00A0>\u00A00\"\r\n            [matMenuTriggerFor]=\"sub_menu\"\r\n            mat-menu-item>{{source.title}}\r\n          </button>\r\n          <button\r\n            mat-menu-item\r\n            *ngIf=\"source.settings.length\u00A0===\u00A00\">\r\n            {{source.title}}\r\n          </button>\r\n        </span>\r\n          <mat-menu #sub_menu=\"matMenu\">\r\n            <ng-container *ngFor=\"let setting of source.settings\">\r\n              <button\r\n                  mat-menu-item\r\n                  [matMenuTriggerFor]=\"test_sub_menu\">\r\n                {{'igo.geo.search.searchSources.settings.'+ setting.title | translate}}\r\n              </button>\r\n              <mat-menu #test_sub_menu=\"matMenu\"\r\n                [ngSwitch]=\"setting.type\"\r\n                yPosition=\"above\">\r\n                <span *ngSwitchCase=\"'radiobutton'\">\r\n                  <mat-radio-group\r\n                    class=\"igo-search-settings-radio-group\"\r\n                    [value]=\"setting\">\r\n                    <mat-radio-button *ngFor=\"let settingValue of setting.values\"\r\n                      class=\"mat-typography\"\r\n                      [value]=\"settingValue\"\r\n                      [checked]=\"settingValue.enabled\"\r\n                      (click)=\"$event.stopPropagation()\"\r\n                      (change)=\"settingsValueCheckedRadioButton($event, source, setting, settingValue)\">\r\n                      {{settingValue.title | translate}}\r\n                    </mat-radio-button>\r\n                  </mat-radio-group>\r\n                </span>\r\n                <span *ngSwitchCase=\"'checkbox'\">\r\n                  <div class=\"checkAllButton\" *ngIf=\"setting.values.length\u00A0>\u00A03\">\r\n                    <button mat-raised-button\r\n                      (click)=\"checkUncheckAll($event, source, setting)\">{{setting.allEnabled || setting.allEnabled === undefined  ? ('igo.geo.search.searchSources.settings.unselectAll' | translate): ('igo.geo.search.searchSources.settings.selectAll' | translate)}}</button>\r\n                  </div>\r\n                  <mat-checkbox *ngFor=\"let settingValue of getAvailableValues(setting)\"\r\n                    class=\"mat-menu-item\"\r\n                    [checked]=\"settingValue.enabled\"\r\n                    [value]=\"setting\"\r\n                    [matTooltip]=\"getAvailableHashtagsValues(settingValue)\"\r\n                    (click)=\"$event.stopPropagation()\"\r\n                    (change)=\"settingsValueCheckedCheckbox($event, source, setting, settingValue)\">\r\n                    {{settingValue.title | translate}}\r\n                  </mat-checkbox>\r\n                </span>\r\n              </mat-menu>\r\n            </ng-container>\r\n          </mat-menu>\r\n      </ng-container>\r\n      <span *ngIf=\"hasPointerReverseSearchSource && !isTouchScreen\">\r\n        <mat-divider></mat-divider>\r\n        <span class=\"pointer-summary-slide-toggle-container mat-typography\">\r\n          <mat-slide-toggle class=\"pointer-summary-option\" (change)=\"changePointerReverseSearch($event)\" tooltip-position=\"below\"\r\n            matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.search.pointerSearchSummary.tooltip' | translate\"\r\n            (click)=\"$event.stopPropagation()\" [checked]=\"pointerSummaryEnabled\" [labelPosition]=\"'after'\">\r\n            {{'igo.geo.search.pointerSearchSummary.title' | translate}}\r\n          </mat-slide-toggle>\r\n        </span>\r\n      </span>\r\n  </mat-menu>\r\n</div>\r\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXNldHRpbmdzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gvc2VhcmNoLXNldHRpbmdzL3NlYXJjaC1zZXR0aW5ncy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEVBQ0wsU0FBUyxFQUNULE1BQU0sRUFDTixZQUFZLEVBQ1osdUJBQXVCLEVBRXZCLFlBQVksRUFDWixLQUFLLEVBQ04sTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFNdEUsT0FBTyxFQUFFLCtCQUErQixFQUFFLGVBQWUsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2xILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxZQUFZLENBQUM7Ozs7Ozs7OztBQVUxQztJQXVDRSxpQ0FDVSxtQkFBd0MsRUFDeEMsWUFBMEI7UUFEMUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQWpDN0Isa0NBQTZCLEdBQVksS0FBSyxDQUFDO1FBQy9DLDRCQUF1QixHQUFZLEtBQUssQ0FBQztRQUV6QyxXQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ1osZ0JBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFNdkIsMEJBQXFCLEdBQVksS0FBSyxDQUFDOzs7O1FBS3RDLHVCQUFrQixHQUFHLElBQUksWUFBWSxFQUFnQixDQUFDOzs7O1FBS3RELHlCQUFvQixHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7SUFjeEQsQ0FBQztJQTVCTixzQkFBSSxrREFBYTs7OztRQUFqQjtZQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMzQyxDQUFDOzs7T0FBQTs7Ozs7SUFlRCxxREFBbUI7Ozs7SUFEbkIsVUFDb0IsS0FB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Ozs7OztJQUNoRCwrQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXRDaGVja2JveENoYW5nZSwgTWF0UmFkaW9DaGFuZ2UgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIE9uSW5pdCxcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgSW5wdXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZVNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VhcmNoLXNvdXJjZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU2VhcmNoU291cmNlIH0gZnJvbSAnLi4vc2hhcmVkL3NvdXJjZXMvc291cmNlJztcclxuaW1wb3J0IHtcclxuICBTZWFyY2hTb3VyY2VTZXR0aW5ncyxcclxuICBTZXR0aW5nT3B0aW9uc1xyXG59IGZyb20gJy4uL3NoYXJlZC9zb3VyY2VzL3NvdXJjZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgc291cmNlQ2FuUmV2ZXJzZVNlYXJjaEFzU3VtbWFyeSwgc291cmNlQ2FuU2VhcmNoLCBzb3VyY2VDYW5SZXZlcnNlU2VhcmNoIH0gZnJvbSAnLi4vc2hhcmVkL3NlYXJjaC51dGlscyc7XHJcbmltcG9ydCB7IE1lZGlhU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY29tcG9uZW50IGFsbG93cyBhIHVzZXIgdG8gc2VsZWN0IGEgc2VhcmNoIHR5cGUgeW8gZW5hYmxlLiBJbiBpdCdzXHJcbiAqIGN1cnJlbnQgdmVyc2lvbiwgb25seSBvbmUgc2VhcmNoIHR5cGUgY2FuIGJlIHNlbGVjdGVkIGF0IG9uY2UgKHJhZGlvKS4gSWZcclxuICogdGhpcyBjb21wb25lbnQgd2VyZSB0byBzdXBwb3J0IG1vcmUgdGhhbiBvbmUgc2VhcmNoIHNvdXJjZSBlbmFibGVkIChjaGVja2JveCksXHJcbiAqIHRoZSBzZWFyY2hiYXIgY29tcG9uZW50IHdvdWxkIHJlcXVpcmUgYSBzbWFsbCBjaGFuZ2UgdG8gaXQnc1xyXG4gKiBwbGFjZWhvbGRlciBnZXR0ZXIuIFRoZSBzZWFyY2ggc291cmNlIHNlcnZpY2UgYWxyZWFkeSBzdXBwb3J0cyBoYXZpbmdcclxuICogbW9yZSB0aGFuIG9uZSBzZWFyY2ggc291cmNlIGVuYWJsZWQuXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1zZWFyY2gtc2V0dGluZ3MnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWFyY2gtc2V0dGluZ3MuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3NlYXJjaC1zZXR0aW5ncy5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hTZXR0aW5nc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIHB1YmxpYyBoYXNQb2ludGVyUmV2ZXJzZVNlYXJjaFNvdXJjZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyBzZWFyY2hTb3VyY2VzQWxsRW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBwdWJsaWMgYnVmZmVyID0gW107XHJcbiAgcHVibGljIGxhc3RLZXlUaW1lID0gRGF0ZS5ub3coKTtcclxuXHJcbiAgZ2V0IGlzVG91Y2hTY3JlZW4oKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5tZWRpYVNlcnZpY2UuaXNUb3VjaFNjcmVlbigpO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgcG9pbnRlclN1bW1hcnlFbmFibGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZW5hYmxlZCBzZWFyY2ggc291cmNlIGNoYW5nZXNcclxuICAgKi9cclxuICBAT3V0cHV0KCkgc2VhcmNoU291cmNlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxTZWFyY2hTb3VyY2U+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgcG9pbnRlciBzdW1tYXJ5IGlzIGFjdGl2YXRlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBwb2ludGVyU3VtbWFyeVN0YXR1cyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5ZG93bicsIFsnJGV2ZW50J10pXHJcbiAgaGFuZGxlS2V5Ym9hcmRFdmVudChldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG5cclxuICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMTMpIHtcclxuICAgICAgdGhpcy5wb2ludGVyU3VtbWFyeUVuYWJsZWQgPSAhdGhpcy5wb2ludGVyU3VtbWFyeUVuYWJsZWQ7XHJcbiAgICAgIHRoaXMucG9pbnRlclN1bW1hcnlTdGF0dXMuZW1pdCh0aGlzLnBvaW50ZXJTdW1tYXJ5RW5hYmxlZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgc2VhcmNoU291cmNlU2VydmljZTogU2VhcmNoU291cmNlU2VydmljZSxcclxuICAgIHByaXZhdGUgbWVkaWFTZXJ2aWNlOiBNZWRpYVNlcnZpY2VcclxuICAgICkge31cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmhhc1BvaW50ZXJSZXZlcnNlU2VhcmNoU291cmNlID0gdGhpcy5oYXNSZXZlcnNlU2VhcmNoU291cmNlc0ZvclBvaW50ZXJTdW1tYXJ5KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgYWxsIHNlYXJjaCBzb3VyY2VzXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0U2VhcmNoU291cmNlcygpOiBTZWFyY2hTb3VyY2VbXSB7XHJcbiAgICBjb25zdCB0ZXh0U2VhcmNoU291cmNlcyA9IHRoaXMuc2VhcmNoU291cmNlU2VydmljZVxyXG4gICAgICAuZ2V0U291cmNlcygpXHJcbiAgICAgIC5maWx0ZXIoc291cmNlQ2FuU2VhcmNoKVxyXG4gICAgICAuZmlsdGVyKHMgPT4gcy5hdmFpbGFibGUgJiYgcy5nZXRJZCgpICE9PSAnbWFwJyAmJiBzLnNob3dJblNldHRpbmdzKTtcclxuXHJcbiAgICBjb25zdCByZXZlcnNlU2VhcmNoU291cmNlcyA9IHRoaXMuc2VhcmNoU291cmNlU2VydmljZVxyXG4gICAgICAuZ2V0U291cmNlcygpXHJcbiAgICAgIC5maWx0ZXIoc291cmNlQ2FuUmV2ZXJzZVNlYXJjaClcclxuICAgICAgLmZpbHRlcihzID0+IHMuYXZhaWxhYmxlICYmIHMuZ2V0SWQoKSAhPT0gJ21hcCcgJiYgcy5zaG93SW5TZXR0aW5ncyk7XHJcbiAgICBjb25zdCBzb3VyY2VzID0gdGV4dFNlYXJjaFNvdXJjZXMuY29uY2F0KHJldmVyc2VTZWFyY2hTb3VyY2VzKTtcclxuICAgIHRoaXMuY29tcHV0ZVNvdXJjZXNDaGVja0FsbEJlaGF2aW9yKHNvdXJjZXMpO1xyXG4gICAgcmV0dXJuIHNvdXJjZXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgYWxsIHNlYXJjaCBzb3VyY2VzIHVzYWJsZSBmb3IgcG9pbnRlciBzdW1tYXJ5XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgaGFzUmV2ZXJzZVNlYXJjaFNvdXJjZXNGb3JQb2ludGVyU3VtbWFyeSgpOiBib29sZWFuIHtcclxuICAgIGlmICh0aGlzLnNlYXJjaFNvdXJjZVNlcnZpY2UuZ2V0RW5hYmxlZFNvdXJjZXMoKS5maWx0ZXIoc291cmNlQ2FuUmV2ZXJzZVNlYXJjaEFzU3VtbWFyeSkubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHJpZ2dlcmVkIHdoZW4gYSBzZXR0aW5nIGlzIGNoZWNrZWQgKGNoZWNrYm94IHN0eWxlKVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHNldHRpbmdzVmFsdWVDaGVja2VkQ2hlY2tib3goXHJcbiAgICBldmVudDogTWF0Q2hlY2tib3hDaGFuZ2UsXHJcbiAgICBzb3VyY2U6IFNlYXJjaFNvdXJjZSxcclxuICAgIHNldHRpbmc6IFNlYXJjaFNvdXJjZVNldHRpbmdzLFxyXG4gICAgc2V0dGluZ1ZhbHVlOiBTZXR0aW5nT3B0aW9uc1xyXG4gICkge1xyXG4gICAgc2V0dGluZ1ZhbHVlLmVuYWJsZWQgPSBldmVudC5jaGVja2VkO1xyXG4gICAgc291cmNlLnNldFBhcmFtRnJvbVNldHRpbmcoc2V0dGluZyk7XHJcbiAgICB0aGlzLnNlYXJjaFNvdXJjZUNoYW5nZS5lbWl0KHNvdXJjZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmluZyB0aGUgYWN0aW9uIHRvIGRvIGZvciBjaGVjay91bmNoZWNrIGNoZWNrYm94ZXMgKHNldHRpbmdzKVxyXG4gICAqIHJldHVybiB0cnVlIGlmIGFsbCBjaGVja2JveCBtdXN0IGJlIGNoZWNrZWRcclxuICAgKiByZXR1cm4gZmFsc2UgaWYgYWxsIGNoZWNrYm94IG11c3QgYmUgdW5jaGVja2VkXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgY29tcHV0ZVNldHRpbmdDaGVja0FsbEJlaGF2aW9yKHNldHRpbmc6IFNlYXJjaFNvdXJjZVNldHRpbmdzKSB7XHJcbiAgICBpZiAoc2V0dGluZy5hbGxFbmFibGVkID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgaWYgKHNldHRpbmcudmFsdWVzLmZpbmQoc2V0dGluZ1ZhbHVlID0+IHNldHRpbmdWYWx1ZS5lbmFibGVkKSkge1xyXG4gICAgICAgIHNldHRpbmcuYWxsRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldHRpbmcuYWxsRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNldHRpbmcuYWxsRW5hYmxlZCA9ICFzZXR0aW5nLmFsbEVuYWJsZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmluZyB0aGUgYWN0aW9uIHRvIGRvIGZvciBjaGVjay91bmNoZWNrIGNoZWNrYm94ZXMgKHNvdXJjZXMpXHJcbiAgICogcmV0dXJuIHRydWUgaWYgYWxsIGNoZWNrYm94IG11c3QgYmUgY2hlY2tlZFxyXG4gICAqIHJldHVybiBmYWxzZSBpZiBhbGwgY2hlY2tib3ggbXVzdCBiZSB1bmNoZWNrZWRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBjb21wdXRlU291cmNlc0NoZWNrQWxsQmVoYXZpb3Ioc291cmNlczogU2VhcmNoU291cmNlW10pIHtcclxuICAgIGNvbnN0IGVuYWJsZWRTb3VyY2VzQ250ID0gc291cmNlcy5maWx0ZXIoc291cmNlID0+IHNvdXJjZS5lbmFibGVkKS5sZW5ndGg7XHJcbiAgICBjb25zdCBkaXNhYmxlZFNvdXJjZXNDbnQgPSBzb3VyY2VzLmZpbHRlcihzb3VyY2UgPT4gIXNvdXJjZS5lbmFibGVkKS5sZW5ndGg7XHJcbiAgICB0aGlzLnNlYXJjaFNvdXJjZXNBbGxFbmFibGVkID0gIGVuYWJsZWRTb3VyY2VzQ250ID49IGRpc2FibGVkU291cmNlc0NudCA/IGZhbHNlIDogdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyaWdnZXJlZCB3aGVuIHRoZSBjaGVjayBhbGwgLyB1bmNoZWNrIGFsbCB0eXBlIGlzIGNsaWNrZWQsXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgY2hlY2tVbmNoZWNrQWxsKGV2ZW50LCBzb3VyY2U6IFNlYXJjaFNvdXJjZSwgc2V0dGluZzogU2VhcmNoU291cmNlU2V0dGluZ3MpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgdGhpcy5jb21wdXRlU2V0dGluZ0NoZWNrQWxsQmVoYXZpb3Ioc2V0dGluZyk7XHJcbiAgICBzZXR0aW5nLnZhbHVlcy5mb3JFYWNoKHNldHRpbmdWYWx1ZSA9PiB7XHJcbiAgICAgIHNldHRpbmdWYWx1ZS5lbmFibGVkID0gc2V0dGluZy5hbGxFbmFibGVkO1xyXG4gICAgfSk7XHJcbiAgICBzb3VyY2Uuc2V0UGFyYW1Gcm9tU2V0dGluZyhzZXR0aW5nKTtcclxuICAgIHRoaXMuc2VhcmNoU291cmNlQ2hhbmdlLmVtaXQoc291cmNlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyaWdnZXJlZCB3aGVuIHRoZSBjaGVjayBhbGwgLyB1bmNoZWNrIGFsbCB0eXBlIGlzIGNsaWNrZWQsXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgY2hlY2tVbmNoZWNrQWxsU291cmNlcyhldmVudCkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB0aGlzLmdldFNlYXJjaFNvdXJjZXMoKS5tYXAoc291cmNlID0+IHtcclxuICAgICAgc291cmNlLmVuYWJsZWQgPSB0aGlzLnNlYXJjaFNvdXJjZXNBbGxFbmFibGVkO1xyXG4gICAgICB0aGlzLnNlYXJjaFNvdXJjZUNoYW5nZS5lbWl0KHNvdXJjZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyaWdnZXJlZCB3aGVuIGEgc2V0dGluZyBpcyBjaGVja2VkIChyYWRpb2J1dHRvbiBzdHlsZSlcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBzZXR0aW5nc1ZhbHVlQ2hlY2tlZFJhZGlvQnV0dG9uKFxyXG4gICAgZXZlbnQ6IE1hdFJhZGlvQ2hhbmdlLFxyXG4gICAgc291cmNlOiBTZWFyY2hTb3VyY2UsXHJcbiAgICBzZXR0aW5nOiBTZWFyY2hTb3VyY2VTZXR0aW5ncyxcclxuICAgIHNldHRpbmdWYWx1ZTogU2V0dGluZ09wdGlvbnNcclxuICApIHtcclxuICAgIHNldHRpbmcudmFsdWVzLmZvckVhY2goY29uZiA9PiB7XHJcbiAgICAgIGlmIChjb25mLnZhbHVlICE9PSBzZXR0aW5nVmFsdWUudmFsdWUpIHtcclxuICAgICAgICBjb25mLmVuYWJsZWQgPSAhZXZlbnQuc291cmNlLmNoZWNrZWQ7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uZi5lbmFibGVkID0gZXZlbnQuc291cmNlLmNoZWNrZWQ7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgc291cmNlLnNldFBhcmFtRnJvbVNldHRpbmcoc2V0dGluZyk7XHJcbiAgICB0aGlzLnNlYXJjaFNvdXJjZUNoYW5nZS5lbWl0KHNvdXJjZSk7XHJcbiAgfVxyXG5cclxuICBvbkNoZWNrU2VhcmNoU291cmNlKGV2ZW50OiBNYXRDaGVja2JveENoYW5nZSwgc291cmNlOiBTZWFyY2hTb3VyY2UpIHtcclxuICAgIHNvdXJjZS5lbmFibGVkID0gZXZlbnQuY2hlY2tlZDtcclxuICAgIHRoaXMuc2VhcmNoU291cmNlQ2hhbmdlLmVtaXQoc291cmNlKTtcclxuICB9XHJcblxyXG4gIGdldEF2YWlsYWJsZVZhbHVlcyhzZXR0aW5nOiBTZWFyY2hTb3VyY2VTZXR0aW5ncykge1xyXG4gICAgcmV0dXJuIHNldHRpbmcudmFsdWVzLmZpbHRlcihzID0+IHMuYXZhaWxhYmxlICE9PSBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBnZXRBdmFpbGFibGVIYXNodGFnc1ZhbHVlcyhzZXR0aW5nOiBTZXR0aW5nT3B0aW9ucykge1xyXG4gICAgaWYgKHNldHRpbmcuaGFzaHRhZ3MpIHtcclxuICAgICAgY29uc3Qgb3V0cHV0OiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICBmb3IgKGxldCB2YWx1ZSBvZiBzZXR0aW5nLmhhc2h0YWdzKSB7XHJcbiAgICAgICAgdmFsdWUgPSAnIycgKyB2YWx1ZTtcclxuICAgICAgICBvdXRwdXQucHVzaCh2YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgIH1cclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIHN0b3BQcm9wYWdhdGlvbihldmVudCkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VQb2ludGVyUmV2ZXJzZVNlYXJjaChldmVudCwgZnJvbVRpdGxlQnV0dG9uPzogYm9vbGVhbikge1xyXG4gICAgaWYgKGZyb21UaXRsZUJ1dHRvbikge1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgdGhpcy5wb2ludGVyU3VtbWFyeUVuYWJsZWQgPSAhdGhpcy5wb2ludGVyU3VtbWFyeUVuYWJsZWQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBvaW50ZXJTdW1tYXJ5RW5hYmxlZCA9IGV2ZW50LmNoZWNrZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wb2ludGVyU3VtbWFyeVN0YXR1cy5lbWl0KHRoaXMucG9pbnRlclN1bW1hcnlFbmFibGVkKTtcclxuICB9XHJcbn1cclxuIl19