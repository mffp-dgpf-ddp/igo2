/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Base search source class
 */
var SearchSource = /** @class */ (function () {
    function SearchSource(options) {
        var _this = this;
        this.options = options;
        this.options = Object.assign({}, this.getDefaultOptions(), options);
        // Set Default Params from Settings
        this.settings.forEach((/**
         * @param {?} setting
         * @return {?}
         */
        function (setting) {
            _this.setParamFromSetting(setting);
        }));
    }
    /**
     * Get search source's id
     * @returns Search source's id
     */
    /**
     * Get search source's id
     * @return {?} Search source's id
     */
    SearchSource.prototype.getId = /**
     * Get search source's id
     * @return {?} Search source's id
     */
    function () {
        throw new Error('You have to implement the method "getId".');
    };
    /**
     * Get search source's type
     * @returns Search source's type
     */
    /**
     * Get search source's type
     * @return {?} Search source's type
     */
    SearchSource.prototype.getType = /**
     * Get search source's type
     * @return {?} Search source's type
     */
    function () {
        throw new Error('You have to implement the method "getType".');
    };
    /**
     * Get search source's default options
     * @returns Search source default options
     */
    /**
     * Get search source's default options
     * @protected
     * @return {?} Search source default options
     */
    SearchSource.prototype.getDefaultOptions = /**
     * Get search source's default options
     * @protected
     * @return {?} Search source default options
     */
    function () {
        throw new Error('You have to implement the method "getDefaultOptions".');
    };
    Object.defineProperty(SearchSource.prototype, "title", {
        /**
         * Search source's title
         */
        get: /**
         * Search source's title
         * @return {?}
         */
        function () {
            return this.options.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSource.prototype, "available", {
        /**
         * Whether the search source is available
         */
        get: /**
         * Whether the search source is available
         * @return {?}
         */
        function () {
            return this.options.available !== false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSource.prototype, "enabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this.available && this.options.enabled !== false;
        },
        /**
         * Whether the search source is enabled
         */
        set: /**
         * Whether the search source is enabled
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.options.enabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSource.prototype, "showInPointerSummary", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var showInPointerSummary = this.options.showInPointerSummary;
            return showInPointerSummary ? showInPointerSummary : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSource.prototype, "showInSettings", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var showInSettings = this.options.showInSettings;
            return showInSettings === undefined ? true : showInSettings;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSource.prototype, "searchUrl", {
        /**
         * Search url
         */
        get: /**
         * Search url
         * @return {?}
         */
        function () {
            return this.options.searchUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSource.prototype, "params", {
        /**
         * Search query params
         */
        get: /**
         * Search query params
         * @return {?}
         */
        function () {
            return this.options.params === undefined ? {} : this.options.params;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSource.prototype, "settings", {
        /**
         * Search settings
         */
        get: /**
         * Search settings
         * @return {?}
         */
        function () {
            return this.options.settings === undefined ? [] : this.options.settings;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Set params from selected settings
     */
    /**
     * Set params from selected settings
     * @param {?} setting
     * @return {?}
     */
    SearchSource.prototype.setParamFromSetting = /**
     * Set params from selected settings
     * @param {?} setting
     * @return {?}
     */
    function (setting) {
        var _this = this;
        var _a;
        switch (setting.type) {
            case 'radiobutton':
                setting.values.forEach((/**
                 * @param {?} conf
                 * @return {?}
                 */
                function (conf) {
                    var _a;
                    if (conf.enabled) {
                        _this.options.params = Object.assign(_this.options.params || {}, (_a = {},
                            _a[setting.name] = conf.value,
                            _a));
                    }
                }));
                break;
            case 'checkbox':
                /** @type {?} */
                var confValue_1 = '';
                setting.values
                    .filter((/**
                 * @param {?} s
                 * @return {?}
                 */
                function (s) { return s.available !== false; }))
                    .forEach((/**
                 * @param {?} conf
                 * @return {?}
                 */
                function (conf) {
                    if (conf.enabled) {
                        confValue_1 += conf.value + ',';
                    }
                }));
                confValue_1 = confValue_1.slice(0, -1);
                this.options.params = Object.assign(this.options.params || {}, (_a = {},
                    _a[setting.name] = confValue_1,
                    _a));
                break;
        }
    };
    Object.defineProperty(SearchSource.prototype, "displayOrder", {
        /**
         * Search results display order
         */
        get: /**
         * Search results display order
         * @return {?}
         */
        function () {
            return this.options.order === undefined ? 99 : this.options.order;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get hashtags valid
     * @param hashtag hashtag from query
     */
    /**
     * Get hashtags valid
     * @param {?} term
     * @param {?} settingsName
     * @return {?}
     */
    SearchSource.prototype.getHashtagsValid = /**
     * Get hashtags valid
     * @param {?} term
     * @param {?} settingsName
     * @return {?}
     */
    function (term, settingsName) {
        /** @type {?} */
        var hashtags = term.match(/(#[^\s]+)/g);
        if (!hashtags) {
            return undefined;
        }
        /** @type {?} */
        var searchSourceSetting = this.getSettingsValues(settingsName);
        /** @type {?} */
        var hashtagsValid = [];
        hashtags.forEach((/**
         * @param {?} hashtag
         * @return {?}
         */
        function (hashtag) {
            searchSourceSetting.values.forEach((/**
             * @param {?} conf
             * @return {?}
             */
            function (conf) {
                /** @type {?} */
                var hashtagKey = hashtag.substring(1);
                if (typeof conf.value === 'string') {
                    /** @type {?} */
                    var types = conf.value
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .split(',');
                    /** @type {?} */
                    var index = types.indexOf(hashtagKey
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
        function (a, b) { return hashtagsValid.indexOf(a) === b; }));
    };
    /**
     * @param {?} search
     * @return {?}
     */
    SearchSource.prototype.getSettingsValues = /**
     * @param {?} search
     * @return {?}
     */
    function (search) {
        return this.getDefaultOptions().settings.find((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return value.name === search;
        }));
    };
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
    return SearchSource;
}());
export { SearchSource };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zaGFyZWQvc291cmNlcy9zb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQWFBO0lBdUlFLHNCQUFZLE9BQTRCO1FBQXhDLGlCQVFDO1FBUEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUVwRSxtQ0FBbUM7UUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQSxPQUFPO1lBQzNCLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwQyxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7SUE1SEQ7OztPQUdHOzs7OztJQUNILDRCQUFLOzs7O0lBQUw7UUFDRSxNQUFNLElBQUksS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUNEOzs7T0FHRzs7Ozs7SUFDSCw4QkFBTzs7OztJQUFQO1FBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUNPLHdDQUFpQjs7Ozs7SUFBM0I7UUFDRSxNQUFNLElBQUksS0FBSyxDQUFDLHVEQUF1RCxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUtELHNCQUFJLCtCQUFLO1FBSFQ7O1dBRUc7Ozs7O1FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQzVCLENBQUM7OztPQUFBO0lBS0Qsc0JBQUksbUNBQVM7UUFIYjs7V0FFRzs7Ozs7UUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEtBQUssS0FBSyxDQUFDO1FB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cyc7XHJcblxyXG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQgfSBmcm9tICcuLi9zZWFyY2guaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7XHJcbiAgU2VhcmNoU291cmNlT3B0aW9ucyxcclxuICBUZXh0U2VhcmNoT3B0aW9ucyxcclxuICBSZXZlcnNlU2VhcmNoT3B0aW9ucyxcclxuICBTZWFyY2hTb3VyY2VTZXR0aW5nc1xyXG59IGZyb20gJy4vc291cmNlLmludGVyZmFjZXMnO1xyXG5cclxuLyoqXHJcbiAqIEJhc2Ugc2VhcmNoIHNvdXJjZSBjbGFzc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNlYXJjaFNvdXJjZSB7XHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHNvdXJjZSBJRFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHN0YXRpYyBpZCA9ICcnO1xyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggc291cmNlIHR5cGVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBzdGF0aWMgdHlwZSA9ICcnO1xyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggc291cmNlIG9wdGlvbnNcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgb3B0aW9uczogU2VhcmNoU291cmNlT3B0aW9ucztcclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHNlYXJjaCBzb3VyY2UncyBpZFxyXG4gICAqIEByZXR1cm5zIFNlYXJjaCBzb3VyY2UncyBpZFxyXG4gICAqL1xyXG4gIGdldElkKCk6IHN0cmluZyB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBoYXZlIHRvIGltcGxlbWVudCB0aGUgbWV0aG9kIFwiZ2V0SWRcIi4nKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogR2V0IHNlYXJjaCBzb3VyY2UncyB0eXBlXHJcbiAgICogQHJldHVybnMgU2VhcmNoIHNvdXJjZSdzIHR5cGVcclxuICAgKi9cclxuICBnZXRUeXBlKCk6IHN0cmluZyB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBoYXZlIHRvIGltcGxlbWVudCB0aGUgbWV0aG9kIFwiZ2V0VHlwZVwiLicpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHNlYXJjaCBzb3VyY2UncyBkZWZhdWx0IG9wdGlvbnNcclxuICAgKiBAcmV0dXJucyBTZWFyY2ggc291cmNlIGRlZmF1bHQgb3B0aW9uc1xyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBnZXREZWZhdWx0T3B0aW9ucygpOiBTZWFyY2hTb3VyY2VPcHRpb25zIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignWW91IGhhdmUgdG8gaW1wbGVtZW50IHRoZSBtZXRob2QgXCJnZXREZWZhdWx0T3B0aW9uc1wiLicpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHNvdXJjZSdzIHRpdGxlXHJcbiAgICovXHJcbiAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnRpdGxlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgc2VhcmNoIHNvdXJjZSBpcyBhdmFpbGFibGVcclxuICAgKi9cclxuICBnZXQgYXZhaWxhYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5hdmFpbGFibGUgIT09IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgc2VhcmNoIHNvdXJjZSBpcyBlbmFibGVkXHJcbiAgICovXHJcbiAgc2V0IGVuYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMub3B0aW9ucy5lbmFibGVkID0gdmFsdWU7XHJcbiAgfVxyXG4gIGdldCBlbmFibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuYXZhaWxhYmxlICYmIHRoaXMub3B0aW9ucy5lbmFibGVkICE9PSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGdldCBzaG93SW5Qb2ludGVyU3VtbWFyeSgpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IHNob3dJblBvaW50ZXJTdW1tYXJ5ID0gdGhpcy5vcHRpb25zLnNob3dJblBvaW50ZXJTdW1tYXJ5O1xyXG4gICAgcmV0dXJuIHNob3dJblBvaW50ZXJTdW1tYXJ5ID8gc2hvd0luUG9pbnRlclN1bW1hcnkgOiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGdldCBzaG93SW5TZXR0aW5ncygpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IHNob3dJblNldHRpbmdzID0gdGhpcy5vcHRpb25zLnNob3dJblNldHRpbmdzO1xyXG4gICAgcmV0dXJuIHNob3dJblNldHRpbmdzID09PSB1bmRlZmluZWQgPyB0cnVlIDogc2hvd0luU2V0dGluZ3M7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggdXJsXHJcbiAgICovXHJcbiAgZ2V0IHNlYXJjaFVybCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5zZWFyY2hVcmw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggcXVlcnkgcGFyYW1zXHJcbiAgICovXHJcbiAgZ2V0IHBhcmFtcygpOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9IHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMucGFyYW1zID09PSB1bmRlZmluZWQgPyB7fSA6IHRoaXMub3B0aW9ucy5wYXJhbXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggc2V0dGluZ3NcclxuICAgKi9cclxuICBnZXQgc2V0dGluZ3MoKTogU2VhcmNoU291cmNlU2V0dGluZ3NbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnNldHRpbmdzID09PSB1bmRlZmluZWQgPyBbXSA6IHRoaXMub3B0aW9ucy5zZXR0aW5ncztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCBwYXJhbXMgZnJvbSBzZWxlY3RlZCBzZXR0aW5nc1xyXG4gICAqL1xyXG4gIHNldFBhcmFtRnJvbVNldHRpbmcoc2V0dGluZzogU2VhcmNoU291cmNlU2V0dGluZ3MpIHtcclxuICAgIHN3aXRjaCAoc2V0dGluZy50eXBlKSB7XHJcbiAgICAgIGNhc2UgJ3JhZGlvYnV0dG9uJzpcclxuICAgICAgICBzZXR0aW5nLnZhbHVlcy5mb3JFYWNoKGNvbmYgPT4ge1xyXG4gICAgICAgICAgaWYgKGNvbmYuZW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih0aGlzLm9wdGlvbnMucGFyYW1zIHx8IHt9LCB7XHJcbiAgICAgICAgICAgICAgW3NldHRpbmcubmFtZV06IGNvbmYudmFsdWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2NoZWNrYm94JzpcclxuICAgICAgICBsZXQgY29uZlZhbHVlID0gJyc7XHJcbiAgICAgICAgc2V0dGluZy52YWx1ZXNcclxuICAgICAgICAgIC5maWx0ZXIocyA9PiBzLmF2YWlsYWJsZSAhPT0gZmFsc2UpXHJcbiAgICAgICAgICAuZm9yRWFjaChjb25mID0+IHtcclxuICAgICAgICAgICAgaWYgKGNvbmYuZW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgIGNvbmZWYWx1ZSArPSBjb25mLnZhbHVlICsgJywnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICBjb25mVmFsdWUgPSBjb25mVmFsdWUuc2xpY2UoMCwgLTEpO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHRoaXMub3B0aW9ucy5wYXJhbXMgfHwge30sIHtcclxuICAgICAgICAgIFtzZXR0aW5nLm5hbWVdOiBjb25mVmFsdWVcclxuICAgICAgICB9KTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCByZXN1bHRzIGRpc3BsYXkgb3JkZXJcclxuICAgKi9cclxuICBnZXQgZGlzcGxheU9yZGVyKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLm9yZGVyID09PSB1bmRlZmluZWQgPyA5OSA6IHRoaXMub3B0aW9ucy5vcmRlcjtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFNlYXJjaFNvdXJjZU9wdGlvbnMpIHtcclxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmdldERlZmF1bHRPcHRpb25zKCksIG9wdGlvbnMpO1xyXG5cclxuICAgIC8vIFNldCBEZWZhdWx0IFBhcmFtcyBmcm9tIFNldHRpbmdzXHJcbiAgICB0aGlzLnNldHRpbmdzLmZvckVhY2goc2V0dGluZyA9PiB7XHJcbiAgICAgIHRoaXMuc2V0UGFyYW1Gcm9tU2V0dGluZyhzZXR0aW5nKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGhhc2h0YWdzIHZhbGlkXHJcbiAgICogQHBhcmFtIGhhc2h0YWcgaGFzaHRhZyBmcm9tIHF1ZXJ5XHJcbiAgICovXHJcbiAgZ2V0SGFzaHRhZ3NWYWxpZCh0ZXJtOiBzdHJpbmcsIHNldHRpbmdzTmFtZTogc3RyaW5nKTogc3RyaW5nW10ge1xyXG4gICAgY29uc3QgaGFzaHRhZ3MgPSB0ZXJtLm1hdGNoKC8oI1teXFxzXSspL2cpO1xyXG4gICAgaWYgKCFoYXNodGFncykge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNlYXJjaFNvdXJjZVNldHRpbmcgPSB0aGlzLmdldFNldHRpbmdzVmFsdWVzKHNldHRpbmdzTmFtZSk7XHJcbiAgICBjb25zdCBoYXNodGFnc1ZhbGlkID0gW107XHJcbiAgICBoYXNodGFncy5mb3JFYWNoKGhhc2h0YWcgPT4ge1xyXG4gICAgICBzZWFyY2hTb3VyY2VTZXR0aW5nLnZhbHVlcy5mb3JFYWNoKGNvbmYgPT4ge1xyXG4gICAgICAgIGNvbnN0IGhhc2h0YWdLZXkgPSBoYXNodGFnLnN1YnN0cmluZygxKTtcclxuICAgICAgICBpZiAodHlwZW9mIGNvbmYudmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICBjb25zdCB0eXBlcyA9IGNvbmYudmFsdWVcclxuICAgICAgICAgICAgLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAgICAgLm5vcm1hbGl6ZSgnTkZEJylcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2csICcnKVxyXG4gICAgICAgICAgICAuc3BsaXQoJywnKTtcclxuICAgICAgICAgIGNvbnN0IGluZGV4ID0gdHlwZXMuaW5kZXhPZihcclxuICAgICAgICAgICAgaGFzaHRhZ0tleVxyXG4gICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICAgICAgICAgLm5vcm1hbGl6ZSgnTkZEJylcclxuICAgICAgICAgICAgICAucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgJycpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICBoYXNodGFnc1ZhbGlkLnB1c2godHlwZXNbaW5kZXhdKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbmYuaGFzaHRhZ3MgJiYgY29uZi5oYXNodGFncy5pbmRleE9mKGhhc2h0YWdLZXkpICE9PSAtMSkge1xyXG4gICAgICAgICAgaGFzaHRhZ3NWYWxpZC5wdXNoKGNvbmYudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gaGFzaHRhZ3NWYWxpZC5maWx0ZXIoKGEsIGIpID0+IGhhc2h0YWdzVmFsaWQuaW5kZXhPZihhKSA9PT0gYik7XHJcbiAgfVxyXG5cclxuICBnZXRTZXR0aW5nc1ZhbHVlcyhzZWFyY2g6IHN0cmluZyk6IFNlYXJjaFNvdXJjZVNldHRpbmdzIHtcclxuICAgIHJldHVybiB0aGlzLmdldERlZmF1bHRPcHRpb25zKCkuc2V0dGluZ3MuZmluZChcclxuICAgICAgKHZhbHVlOiBTZWFyY2hTb3VyY2VTZXR0aW5ncykgPT4ge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZS5uYW1lID09PSBzZWFyY2g7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogU2VhcmNoIHNvdXJjZXMgdGhhdCBhbGxvdyBzZWFyY2hpbmcgYnkgdGV4dCBpbXBsZW1lbnQgdGhpcyBjbGFzc1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBUZXh0U2VhcmNoIHtcclxuICAvKipcclxuICAgKiBTZWFyY2ggYnkgdGV4dFxyXG4gICAqIEBwYXJhbSB0ZXJtIFRleHRcclxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25hbDogVGV4dFNlYXJjaE9wdGlvbnNcclxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9yIHNlYXJjaCByZXN1bHRzXHJcbiAgICovXHJcbiAgc2VhcmNoKFxyXG4gICAgdGVybTogc3RyaW5nIHwgdW5kZWZpbmVkLFxyXG4gICAgb3B0aW9ucz86IFRleHRTZWFyY2hPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxTZWFyY2hSZXN1bHRbXT47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZWFyY2ggc291cmNlcyB0aGF0IGFsbG93IHNlYXJjaGluZyBieSBjb29yZGluYXRlcyBpbXBsZW1lbnQgdGhpcyBjbGFzc1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBSZXZlcnNlU2VhcmNoIHtcclxuICAvKipcclxuICAgKiBTZWFyY2ggYnkgdGV4dFxyXG4gICAqIEBwYXJhbSBsb25MYXQgQ29vcmRpbmF0ZXNcclxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25hbDogUmV2ZXJzZVNlYXJjaE9wdGlvbnNcclxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9yIHNlYXJjaCByZXN1bHRzXHJcbiAgICovXHJcbiAgcmV2ZXJzZVNlYXJjaChcclxuICAgIGxvbkxhdDogW251bWJlciwgbnVtYmVyXSxcclxuICAgIG9wdGlvbnM/OiBSZXZlcnNlU2VhcmNoT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8U2VhcmNoUmVzdWx0W10+O1xyXG59XHJcbiJdfQ==