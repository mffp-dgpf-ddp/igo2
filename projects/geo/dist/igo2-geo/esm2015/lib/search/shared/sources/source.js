/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Base search source class
 */
export class SearchSource {
    /**
     * @param {?} options
     */
    constructor(options) {
        this.options = options;
        this.options = Object.assign({}, this.getDefaultOptions(), options);
        // Set Default Params from Settings
        this.settings.forEach((/**
         * @param {?} setting
         * @return {?}
         */
        setting => {
            this.setParamFromSetting(setting);
        }));
    }
    /**
     * Get search source's id
     * @return {?} Search source's id
     */
    getId() {
        throw new Error('You have to implement the method "getId".');
    }
    /**
     * Get search source's type
     * @return {?} Search source's type
     */
    getType() {
        throw new Error('You have to implement the method "getType".');
    }
    /**
     * Get search source's default options
     * @protected
     * @return {?} Search source default options
     */
    getDefaultOptions() {
        throw new Error('You have to implement the method "getDefaultOptions".');
    }
    /**
     * Search source's title
     * @return {?}
     */
    get title() {
        return this.options.title;
    }
    /**
     * Whether the search source is available
     * @return {?}
     */
    get available() {
        return this.options.available !== false;
    }
    /**
     * Whether the search source is enabled
     * @param {?} value
     * @return {?}
     */
    set enabled(value) {
        this.options.enabled = value;
    }
    /**
     * @return {?}
     */
    get enabled() {
        return this.available && this.options.enabled !== false;
    }
    /**
     * @return {?}
     */
    get showInPointerSummary() {
        /** @type {?} */
        const showInPointerSummary = this.options.showInPointerSummary;
        return showInPointerSummary ? showInPointerSummary : false;
    }
    /**
     * @return {?}
     */
    get showInSettings() {
        /** @type {?} */
        const showInSettings = this.options.showInSettings;
        return showInSettings === undefined ? true : showInSettings;
    }
    /**
     * Search url
     * @return {?}
     */
    get searchUrl() {
        return this.options.searchUrl;
    }
    /**
     * Search query params
     * @return {?}
     */
    get params() {
        return this.options.params === undefined ? {} : this.options.params;
    }
    /**
     * Search settings
     * @return {?}
     */
    get settings() {
        return this.options.settings === undefined ? [] : this.options.settings;
    }
    /**
     * Set params from selected settings
     * @param {?} setting
     * @return {?}
     */
    setParamFromSetting(setting) {
        switch (setting.type) {
            case 'radiobutton':
                setting.values.forEach((/**
                 * @param {?} conf
                 * @return {?}
                 */
                conf => {
                    if (conf.enabled) {
                        this.options.params = Object.assign(this.options.params || {}, {
                            [setting.name]: conf.value
                        });
                    }
                }));
                break;
            case 'checkbox':
                /** @type {?} */
                let confValue = '';
                setting.values
                    .filter((/**
                 * @param {?} s
                 * @return {?}
                 */
                s => s.available !== false))
                    .forEach((/**
                 * @param {?} conf
                 * @return {?}
                 */
                conf => {
                    if (conf.enabled) {
                        confValue += conf.value + ',';
                    }
                }));
                confValue = confValue.slice(0, -1);
                this.options.params = Object.assign(this.options.params || {}, {
                    [setting.name]: confValue
                });
                break;
        }
    }
    /**
     * Search results display order
     * @return {?}
     */
    get displayOrder() {
        return this.options.order === undefined ? 99 : this.options.order;
    }
    /**
     * Get hashtags valid
     * @param {?} term
     * @param {?} settingsName
     * @return {?}
     */
    getHashtagsValid(term, settingsName) {
        /** @type {?} */
        const hashtags = term.match(/(#[^\s]+)/g);
        if (!hashtags) {
            return undefined;
        }
        /** @type {?} */
        const searchSourceSetting = this.getSettingsValues(settingsName);
        /** @type {?} */
        const hashtagsValid = [];
        hashtags.forEach((/**
         * @param {?} hashtag
         * @return {?}
         */
        hashtag => {
            searchSourceSetting.values.forEach((/**
             * @param {?} conf
             * @return {?}
             */
            conf => {
                /** @type {?} */
                const hashtagKey = hashtag.substring(1);
                if (typeof conf.value === 'string') {
                    /** @type {?} */
                    const types = conf.value
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .split(',');
                    /** @type {?} */
                    const index = types.indexOf(hashtagKey
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, ''));
                    if (index !== -1) {
                        hashtagsValid.push(types[index]);
                    }
                }
                if (conf.hashtags && conf.hashtags.indexOf(hashtagKey) !== -1) {
                    hashtagsValid.push(conf.value);
                }
            }));
        }));
        return hashtagsValid.filter((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => hashtagsValid.indexOf(a) === b));
    }
    /**
     * @param {?} search
     * @return {?}
     */
    getSettingsValues(search) {
        return this.getDefaultOptions().settings.find((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            return value.name === search;
        }));
    }
}
/**
 * Search source ID
 * \@internal
 */
SearchSource.id = '';
/**
 * Search source type
 * \@internal
 */
SearchSource.type = '';
if (false) {
    /**
     * Search source ID
     * \@internal
     * @type {?}
     */
    SearchSource.id;
    /**
     * Search source type
     * \@internal
     * @type {?}
     */
    SearchSource.type;
    /**
     * Search source options
     * \@internal
     * @type {?}
     * @protected
     */
    SearchSource.prototype.options;
}
/**
 * Search sources that allow searching by text implement this class
 * @record
 */
export function TextSearch() { }
if (false) {
    /**
     * Search by text
     * @param {?} term Text
     * @param {?=} options Optional: TextSearchOptions
     * @return {?} Observable or search results
     */
    TextSearch.prototype.search = function (term, options) { };
}
/**
 * Search sources that allow searching by coordinates implement this class
 * @record
 */
export function ReverseSearch() { }
if (false) {
    /**
     * Search by text
     * @param {?} lonLat Coordinates
     * @param {?=} options Optional: ReverseSearchOptions
     * @return {?} Observable or search results
     */
    ReverseSearch.prototype.reverseSearch = function (lonLat, options) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zaGFyZWQvc291cmNlcy9zb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQWFBLE1BQU0sT0FBTyxZQUFZOzs7O0lBdUl2QixZQUFZLE9BQTRCO1FBQ3RDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFcEUsbUNBQW1DO1FBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTzs7OztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzlCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwQyxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBeEhELEtBQUs7UUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7SUFDL0QsQ0FBQzs7Ozs7SUFLRCxPQUFPO1FBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7Ozs7OztJQU1TLGlCQUFpQjtRQUN6QixNQUFNLElBQUksS0FBSyxDQUFDLHVEQUF1RCxDQUFDLENBQUM7SUFDM0UsQ0FBQzs7Ozs7SUFLRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0lBQzVCLENBQUM7Ozs7O0lBS0QsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsS0FBSyxLQUFLLENBQUM7SUFDMUMsQ0FBQzs7Ozs7O0lBS0QsSUFBSSxPQUFPLENBQUMsS0FBYztRQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDL0IsQ0FB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QUFDLEVBQUMsQ0FBQztRQUNMLENBQUMsRUFBQyxDQUFDO1FBRUgsT0FBTyxhQUFhLENBQUMsTUFBTTs7Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUM7SUFDeEUsQ0FBQzs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxNQUFjO1FBQzlCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsUUFBUSxDQUFDLElBQUk7Ozs7UUFDM0MsQ0FBQyxLQUEyQixFQUFFLEVBQUU7WUFDOUIsT0FBTyxLQUFLLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQztRQUMvQixDQUFDLEVBQ0YsQ0FBQztJQUNKLENBQUM7Ozs7OztBQTFMTSxlQUFFLEdBQUcsRUFBRSxDQUFDOzs7OztBQU1SLGlCQUFJLEdBQUcsRUFBRSxDQUFDOzs7Ozs7O0lBTmpCLGdCQUFlOzs7Ozs7SUFNZixrQkFBaUI7Ozs7Ozs7SUFNakIsK0JBQXVDOzs7Ozs7QUFvTHpDLGdDQVdDOzs7Ozs7OztJQUpDLDJEQUc4Qjs7Ozs7O0FBTWhDLG1DQVdDOzs7Ozs7OztJQUpDLHVFQUc4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCB9IGZyb20gJy4uL3NlYXJjaC5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHtcclxuICBTZWFyY2hTb3VyY2VPcHRpb25zLFxyXG4gIFRleHRTZWFyY2hPcHRpb25zLFxyXG4gIFJldmVyc2VTZWFyY2hPcHRpb25zLFxyXG4gIFNlYXJjaFNvdXJjZVNldHRpbmdzXHJcbn0gZnJvbSAnLi9zb3VyY2UuaW50ZXJmYWNlcyc7XHJcblxyXG4vKipcclxuICogQmFzZSBzZWFyY2ggc291cmNlIGNsYXNzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2VhcmNoU291cmNlIHtcclxuICAvKipcclxuICAgKiBTZWFyY2ggc291cmNlIElEXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgc3RhdGljIGlkID0gJyc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBzb3VyY2UgdHlwZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHN0YXRpYyB0eXBlID0gJyc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBzb3VyY2Ugb3B0aW9uc1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBvcHRpb25zOiBTZWFyY2hTb3VyY2VPcHRpb25zO1xyXG5cclxuICAvKipcclxuICAgKiBHZXQgc2VhcmNoIHNvdXJjZSdzIGlkXHJcbiAgICogQHJldHVybnMgU2VhcmNoIHNvdXJjZSdzIGlkXHJcbiAgICovXHJcbiAgZ2V0SWQoKTogc3RyaW5nIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignWW91IGhhdmUgdG8gaW1wbGVtZW50IHRoZSBtZXRob2QgXCJnZXRJZFwiLicpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBHZXQgc2VhcmNoIHNvdXJjZSdzIHR5cGVcclxuICAgKiBAcmV0dXJucyBTZWFyY2ggc291cmNlJ3MgdHlwZVxyXG4gICAqL1xyXG4gIGdldFR5cGUoKTogc3RyaW5nIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignWW91IGhhdmUgdG8gaW1wbGVtZW50IHRoZSBtZXRob2QgXCJnZXRUeXBlXCIuJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgc2VhcmNoIHNvdXJjZSdzIGRlZmF1bHQgb3B0aW9uc1xyXG4gICAqIEByZXR1cm5zIFNlYXJjaCBzb3VyY2UgZGVmYXVsdCBvcHRpb25zXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGdldERlZmF1bHRPcHRpb25zKCk6IFNlYXJjaFNvdXJjZU9wdGlvbnMge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgaGF2ZSB0byBpbXBsZW1lbnQgdGhlIG1ldGhvZCBcImdldERlZmF1bHRPcHRpb25zXCIuJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggc291cmNlJ3MgdGl0bGVcclxuICAgKi9cclxuICBnZXQgdGl0bGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMudGl0bGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoZSBzZWFyY2ggc291cmNlIGlzIGF2YWlsYWJsZVxyXG4gICAqL1xyXG4gIGdldCBhdmFpbGFibGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmF2YWlsYWJsZSAhPT0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoZSBzZWFyY2ggc291cmNlIGlzIGVuYWJsZWRcclxuICAgKi9cclxuICBzZXQgZW5hYmxlZCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5vcHRpb25zLmVuYWJsZWQgPSB2YWx1ZTtcclxuICB9XHJcbiAgZ2V0IGVuYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5hdmFpbGFibGUgJiYgdGhpcy5vcHRpb25zLmVuYWJsZWQgIT09IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHNob3dJblBvaW50ZXJTdW1tYXJ5KCk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3Qgc2hvd0luUG9pbnRlclN1bW1hcnkgPSB0aGlzLm9wdGlvbnMuc2hvd0luUG9pbnRlclN1bW1hcnk7XHJcbiAgICByZXR1cm4gc2hvd0luUG9pbnRlclN1bW1hcnkgPyBzaG93SW5Qb2ludGVyU3VtbWFyeSA6IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHNob3dJblNldHRpbmdzKCk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3Qgc2hvd0luU2V0dGluZ3MgPSB0aGlzLm9wdGlvbnMuc2hvd0luU2V0dGluZ3M7XHJcbiAgICByZXR1cm4gc2hvd0luU2V0dGluZ3MgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBzaG93SW5TZXR0aW5ncztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCB1cmxcclxuICAgKi9cclxuICBnZXQgc2VhcmNoVXJsKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnNlYXJjaFVybDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBxdWVyeSBwYXJhbXNcclxuICAgKi9cclxuICBnZXQgcGFyYW1zKCk6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0ge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5wYXJhbXMgPT09IHVuZGVmaW5lZCA/IHt9IDogdGhpcy5vcHRpb25zLnBhcmFtcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBzZXR0aW5nc1xyXG4gICAqL1xyXG4gIGdldCBzZXR0aW5ncygpOiBTZWFyY2hTb3VyY2VTZXR0aW5nc1tdIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc2V0dGluZ3MgPT09IHVuZGVmaW5lZCA/IFtdIDogdGhpcy5vcHRpb25zLnNldHRpbmdzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHBhcmFtcyBmcm9tIHNlbGVjdGVkIHNldHRpbmdzXHJcbiAgICovXHJcbiAgc2V0UGFyYW1Gcm9tU2V0dGluZyhzZXR0aW5nOiBTZWFyY2hTb3VyY2VTZXR0aW5ncykge1xyXG4gICAgc3dpdGNoIChzZXR0aW5nLnR5cGUpIHtcclxuICAgICAgY2FzZSAncmFkaW9idXR0b24nOlxyXG4gICAgICAgIHNldHRpbmcudmFsdWVzLmZvckVhY2goY29uZiA9PiB7XHJcbiAgICAgICAgICBpZiAoY29uZi5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHRoaXMub3B0aW9ucy5wYXJhbXMgfHwge30sIHtcclxuICAgICAgICAgICAgICBbc2V0dGluZy5uYW1lXTogY29uZi52YWx1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnY2hlY2tib3gnOlxyXG4gICAgICAgIGxldCBjb25mVmFsdWUgPSAnJztcclxuICAgICAgICBzZXR0aW5nLnZhbHVlc1xyXG4gICAgICAgICAgLmZpbHRlcihzID0+IHMuYXZhaWxhYmxlICE9PSBmYWxzZSlcclxuICAgICAgICAgIC5mb3JFYWNoKGNvbmYgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY29uZi5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgY29uZlZhbHVlICs9IGNvbmYudmFsdWUgKyAnLCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIGNvbmZWYWx1ZSA9IGNvbmZWYWx1ZS5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24odGhpcy5vcHRpb25zLnBhcmFtcyB8fCB7fSwge1xyXG4gICAgICAgICAgW3NldHRpbmcubmFtZV06IGNvbmZWYWx1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHJlc3VsdHMgZGlzcGxheSBvcmRlclxyXG4gICAqL1xyXG4gIGdldCBkaXNwbGF5T3JkZXIoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMub3JkZXIgPT09IHVuZGVmaW5lZCA/IDk5IDogdGhpcy5vcHRpb25zLm9yZGVyO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3Iob3B0aW9uczogU2VhcmNoU291cmNlT3B0aW9ucykge1xyXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZ2V0RGVmYXVsdE9wdGlvbnMoKSwgb3B0aW9ucyk7XHJcblxyXG4gICAgLy8gU2V0IERlZmF1bHQgUGFyYW1zIGZyb20gU2V0dGluZ3NcclxuICAgIHRoaXMuc2V0dGluZ3MuZm9yRWFjaChzZXR0aW5nID0+IHtcclxuICAgICAgdGhpcy5zZXRQYXJhbUZyb21TZXR0aW5nKHNldHRpbmcpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgaGFzaHRhZ3MgdmFsaWRcclxuICAgKiBAcGFyYW0gaGFzaHRhZyBoYXNodGFnIGZyb20gcXVlcnlcclxuICAgKi9cclxuICBnZXRIYXNodGFnc1ZhbGlkKHRlcm06IHN0cmluZywgc2V0dGluZ3NOYW1lOiBzdHJpbmcpOiBzdHJpbmdbXSB7XHJcbiAgICBjb25zdCBoYXNodGFncyA9IHRlcm0ubWF0Y2goLygjW15cXHNdKykvZyk7XHJcbiAgICBpZiAoIWhhc2h0YWdzKSB7XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VhcmNoU291cmNlU2V0dGluZyA9IHRoaXMuZ2V0U2V0dGluZ3NWYWx1ZXMoc2V0dGluZ3NOYW1lKTtcclxuICAgIGNvbnN0IGhhc2h0YWdzVmFsaWQgPSBbXTtcclxuICAgIGhhc2h0YWdzLmZvckVhY2goaGFzaHRhZyA9PiB7XHJcbiAgICAgIHNlYXJjaFNvdXJjZVNldHRpbmcudmFsdWVzLmZvckVhY2goY29uZiA9PiB7XHJcbiAgICAgICAgY29uc3QgaGFzaHRhZ0tleSA9IGhhc2h0YWcuc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgY29uZi52YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgIGNvbnN0IHR5cGVzID0gY29uZi52YWx1ZVxyXG4gICAgICAgICAgICAudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgICAgICAubm9ybWFsaXplKCdORkQnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgJycpXHJcbiAgICAgICAgICAgIC5zcGxpdCgnLCcpO1xyXG4gICAgICAgICAgY29uc3QgaW5kZXggPSB0eXBlcy5pbmRleE9mKFxyXG4gICAgICAgICAgICBoYXNodGFnS2V5XHJcbiAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAgICAgICAubm9ybWFsaXplKCdORkQnKVxyXG4gICAgICAgICAgICAgIC5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXS9nLCAnJylcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgICAgIGhhc2h0YWdzVmFsaWQucHVzaCh0eXBlc1tpbmRleF0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29uZi5oYXNodGFncyAmJiBjb25mLmhhc2h0YWdzLmluZGV4T2YoaGFzaHRhZ0tleSkgIT09IC0xKSB7XHJcbiAgICAgICAgICBoYXNodGFnc1ZhbGlkLnB1c2goY29uZi52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBoYXNodGFnc1ZhbGlkLmZpbHRlcigoYSwgYikgPT4gaGFzaHRhZ3NWYWxpZC5pbmRleE9mKGEpID09PSBiKTtcclxuICB9XHJcblxyXG4gIGdldFNldHRpbmdzVmFsdWVzKHNlYXJjaDogc3RyaW5nKTogU2VhcmNoU291cmNlU2V0dGluZ3Mge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0RGVmYXVsdE9wdGlvbnMoKS5zZXR0aW5ncy5maW5kKFxyXG4gICAgICAodmFsdWU6IFNlYXJjaFNvdXJjZVNldHRpbmdzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlLm5hbWUgPT09IHNlYXJjaDtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZWFyY2ggc291cmNlcyB0aGF0IGFsbG93IHNlYXJjaGluZyBieSB0ZXh0IGltcGxlbWVudCB0aGlzIGNsYXNzXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFRleHRTZWFyY2gge1xyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBieSB0ZXh0XHJcbiAgICogQHBhcmFtIHRlcm0gVGV4dFxyXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbmFsOiBUZXh0U2VhcmNoT3B0aW9uc1xyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb3Igc2VhcmNoIHJlc3VsdHNcclxuICAgKi9cclxuICBzZWFyY2goXHJcbiAgICB0ZXJtOiBzdHJpbmcgfCB1bmRlZmluZWQsXHJcbiAgICBvcHRpb25zPzogVGV4dFNlYXJjaE9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFNlYXJjaFJlc3VsdFtdPjtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNlYXJjaCBzb3VyY2VzIHRoYXQgYWxsb3cgc2VhcmNoaW5nIGJ5IGNvb3JkaW5hdGVzIGltcGxlbWVudCB0aGlzIGNsYXNzXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFJldmVyc2VTZWFyY2gge1xyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBieSB0ZXh0XHJcbiAgICogQHBhcmFtIGxvbkxhdCBDb29yZGluYXRlc1xyXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbmFsOiBSZXZlcnNlU2VhcmNoT3B0aW9uc1xyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb3Igc2VhcmNoIHJlc3VsdHNcclxuICAgKi9cclxuICByZXZlcnNlU2VhcmNoKFxyXG4gICAgbG9uTGF0OiBbbnVtYmVyLCBudW1iZXJdLFxyXG4gICAgb3B0aW9ucz86IFJldmVyc2VTZWFyY2hPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxTZWFyY2hSZXN1bHRbXT47XHJcbn1cclxuIl19