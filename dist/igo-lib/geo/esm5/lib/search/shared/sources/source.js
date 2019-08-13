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
                        _this.options.params = Object.assign((_this.options.params || {}), (_a = {}, _a[setting.name] = conf.value, _a));
                    }
                }));
                break;
            case 'checkbox':
                /** @type {?} */
                var confValue_1 = '';
                setting.values.forEach((/**
                 * @param {?} conf
                 * @return {?}
                 */
                function (conf) {
                    if (conf.enabled) {
                        confValue_1 += conf.value + ',';
                    }
                }));
                confValue_1 = confValue_1.slice(0, -1);
                this.options.params = Object.assign((this.options.params || {}), (_a = {}, _a[setting.name] = confValue_1, _a));
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
     * Check if hashtag is valid
     * @param hashtag hashtag from query
     * @param completeMatch boolean
     */
    /**
     * Check if hashtag is valid
     * @param {?} searchSourceSetting
     * @param {?} hashtag hashtag from query
     * @param {?=} completeMatch boolean
     * @return {?}
     */
    SearchSource.prototype.hashtagValid = /**
     * Check if hashtag is valid
     * @param {?} searchSourceSetting
     * @param {?} hashtag hashtag from query
     * @param {?=} completeMatch boolean
     * @return {?}
     */
    function (searchSourceSetting, hashtag, completeMatch) {
        if (completeMatch === void 0) { completeMatch = false; }
        /** @type {?} */
        var hashtagIsValid = false;
        searchSourceSetting.values.forEach((/**
         * @param {?} conf
         * @return {?}
         */
        function (conf) {
            /** @type {?} */
            var re = new RegExp('' + hashtag.substring(1) + '', 'g');
            if (typeof conf.value === 'string') {
                if ((completeMatch && conf.value === hashtag.substring(1)) ||
                    (!completeMatch && conf.value.match(re))) {
                    hashtagIsValid = true;
                }
            }
        }));
        return hashtagIsValid;
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
     * @param {?=} options
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
     * @param {?=} options
     * @return {?} Observable or search results
     */
    ReverseSearch.prototype.reverseSearch = function (lonLat, options) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zaGFyZWQvc291cmNlcy9zb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQWFBO0lBa0hFLHNCQUFZLE9BQTRCO1FBQXhDLGlCQU9DO1FBTkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUVwRSxtQ0FBbUM7UUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPOzs7O1FBQUUsVUFBQSxPQUFPO1lBQzVCLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwQyxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7SUF0R0Q7OztPQUdHOzs7OztJQUNILDRCQUFLOzs7O0lBQUw7UUFDRSxNQUFNLElBQUksS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ08sd0NBQWlCOzs7OztJQUEzQjtRQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsdURBQXVELENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBS0Qsc0JBQUksK0JBQUs7UUFIVDs7V0FFRzs7Ozs7UUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDNUIsQ0FBQzs7O09BQUE7SUFLRCxzQkFBSSxtQ0FBUztRQUhiOztXQUVHOzs7OztRQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsS0FBSyxLQUFLLENBQUM7UUFDMUMsQ0FBQzs7O09BQUE7SUFLRCxzQkFBSSxpQ0FBTzs7OztRQUdYO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLEtBQUssQ0FBQztRQUMxRCxDQUFDO1FB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QUksQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO2dCQUNuQyxJQUFLLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckQsQ0FBRSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFHO29CQUNoRCxjQUFjLEdBQUcsSUFBSSxDQUFDO2lCQUN2QjthQUNGO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFDSCxPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDOzs7OztJQUVELHdDQUFpQjs7OztJQUFqQixVQUFrQixNQUFjO1FBQzlCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsUUFBUSxDQUFDLElBQUk7Ozs7UUFBRSxVQUFDLEtBQTJCO1lBQ3pFLE9BQU8sS0FBSyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUM7UUFDL0IsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQTdJTSxlQUFFLEdBQUcsRUFBRSxDQUFDOzs7OztJQU1SLGlCQUFJLEdBQUcsRUFBRSxDQUFDO0lBeUluQixtQkFBQztDQUFBLEFBcEpELElBb0pDO1NBcEpZLFlBQVk7Ozs7Ozs7SUFLdkIsZ0JBQWU7Ozs7OztJQU1mLGtCQUFpQjs7Ozs7OztJQU1qQiwrQkFBdUM7Ozs7OztBQXdJekMsZ0NBVUM7Ozs7Ozs7O0lBSkMsMkRBRzhCOzs7Ozs7QUFNaEMsbUNBV0M7Ozs7Ozs7O0lBSkMsdUVBRzhCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi4vc2VhcmNoLmludGVyZmFjZXMnO1xyXG5pbXBvcnQge1xyXG4gIFNlYXJjaFNvdXJjZU9wdGlvbnMsXHJcbiAgVGV4dFNlYXJjaE9wdGlvbnMsXHJcbiAgUmV2ZXJzZVNlYXJjaE9wdGlvbnMsXHJcbiAgU2VhcmNoU291cmNlU2V0dGluZ3NcclxufSBmcm9tICcuL3NvdXJjZS5pbnRlcmZhY2VzJztcclxuXHJcbi8qKlxyXG4gKiBCYXNlIHNlYXJjaCBzb3VyY2UgY2xhc3NcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hTb3VyY2Uge1xyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBzb3VyY2UgSURcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBzdGF0aWMgaWQgPSAnJztcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHNvdXJjZSB0eXBlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgc3RhdGljIHR5cGUgPSAnJztcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHNvdXJjZSBvcHRpb25zXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIG9wdGlvbnM6IFNlYXJjaFNvdXJjZU9wdGlvbnM7XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBzZWFyY2ggc291cmNlJ3MgaWRcclxuICAgKiBAcmV0dXJucyBTZWFyY2ggc291cmNlJ3MgaWRcclxuICAgKi9cclxuICBnZXRJZCgpOiBzdHJpbmcge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgaGF2ZSB0byBpbXBsZW1lbnQgdGhlIG1ldGhvZCBcImdldElkXCIuJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgc2VhcmNoIHNvdXJjZSdzIGRlZmF1bHQgb3B0aW9uc1xyXG4gICAqIEByZXR1cm5zIFNlYXJjaCBzb3VyY2UgZGVmYXVsdCBvcHRpb25zXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGdldERlZmF1bHRPcHRpb25zKCk6IFNlYXJjaFNvdXJjZU9wdGlvbnMge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgaGF2ZSB0byBpbXBsZW1lbnQgdGhlIG1ldGhvZCBcImdldERlZmF1bHRPcHRpb25zXCIuJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggc291cmNlJ3MgdGl0bGVcclxuICAgKi9cclxuICBnZXQgdGl0bGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMudGl0bGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoZSBzZWFyY2ggc291cmNlIGlzIGF2YWlsYWJsZVxyXG4gICAqL1xyXG4gIGdldCBhdmFpbGFibGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmF2YWlsYWJsZSAhPT0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoZSBzZWFyY2ggc291cmNlIGlzIGVuYWJsZWRcclxuICAgKi9cclxuICBzZXQgZW5hYmxlZCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5vcHRpb25zLmVuYWJsZWQgPSB2YWx1ZTtcclxuICB9XHJcbiAgZ2V0IGVuYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5hdmFpbGFibGUgJiYgdGhpcy5vcHRpb25zLmVuYWJsZWQgIT09IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHVybFxyXG4gICAqL1xyXG4gIGdldCBzZWFyY2hVcmwoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc2VhcmNoVXJsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHF1ZXJ5IHBhcmFtc1xyXG4gICAqL1xyXG4gIGdldCBwYXJhbXMoKTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnBhcmFtcyA9PT0gdW5kZWZpbmVkID8ge30gOiB0aGlzLm9wdGlvbnMucGFyYW1zO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHNldHRpbmdzXHJcbiAgICovXHJcbiAgZ2V0IHNldHRpbmdzKCk6IFNlYXJjaFNvdXJjZVNldHRpbmdzW10ge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5zZXR0aW5ncyA9PT0gdW5kZWZpbmVkID8gW10gOiB0aGlzLm9wdGlvbnMuc2V0dGluZ3M7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgcGFyYW1zIGZyb20gc2VsZWN0ZWQgc2V0dGluZ3NcclxuICAgKi9cclxuICBzZXRQYXJhbUZyb21TZXR0aW5nKHNldHRpbmc6IFNlYXJjaFNvdXJjZVNldHRpbmdzKSB7XHJcbiAgICAgIHN3aXRjaCAoc2V0dGluZy50eXBlKSB7XHJcbiAgICAgICAgY2FzZSAncmFkaW9idXR0b24nOlxyXG4gICAgICAgICAgc2V0dGluZy52YWx1ZXMuZm9yRWFjaCggY29uZiA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjb25mLmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMucGFyYW1zID0gT2JqZWN0LmFzc2lnbiggKHRoaXMub3B0aW9ucy5wYXJhbXMgfHwge30pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBbc2V0dGluZy5uYW1lXSA6IGNvbmYudmFsdWUgfSApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2NoZWNrYm94JzpcclxuICAgICAgICAgIGxldCBjb25mVmFsdWUgPSAnJztcclxuICAgICAgICAgIHNldHRpbmcudmFsdWVzLmZvckVhY2goIGNvbmYgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY29uZi5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgY29uZlZhbHVlICs9IGNvbmYudmFsdWUgKyAnLCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgY29uZlZhbHVlID0gY29uZlZhbHVlLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICAgIHRoaXMub3B0aW9ucy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKCAodGhpcy5vcHRpb25zLnBhcmFtcyB8fCB7fSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgW3NldHRpbmcubmFtZV0gOiBjb25mVmFsdWUgfSApO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCByZXN1bHRzIGRpc3BsYXkgb3JkZXJcclxuICAgKi9cclxuICBnZXQgZGlzcGxheU9yZGVyKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLm9yZGVyID09PSB1bmRlZmluZWQgPyA5OSA6IHRoaXMub3B0aW9ucy5vcmRlcjtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFNlYXJjaFNvdXJjZU9wdGlvbnMpIHtcclxuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZ2V0RGVmYXVsdE9wdGlvbnMoKSwgb3B0aW9ucyk7XHJcblxyXG4gICAgLy8gU2V0IERlZmF1bHQgUGFyYW1zIGZyb20gU2V0dGluZ3NcclxuICAgIHRoaXMuc2V0dGluZ3MuZm9yRWFjaCggc2V0dGluZyA9PiB7XHJcbiAgICAgIHRoaXMuc2V0UGFyYW1Gcm9tU2V0dGluZyhzZXR0aW5nKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgaGFzaHRhZyBpcyB2YWxpZFxyXG4gICAqIEBwYXJhbSBoYXNodGFnIGhhc2h0YWcgZnJvbSBxdWVyeVxyXG4gICAqIEBwYXJhbSBjb21wbGV0ZU1hdGNoIGJvb2xlYW5cclxuICAgKi9cclxuICBoYXNodGFnVmFsaWQoc2VhcmNoU291cmNlU2V0dGluZzogU2VhcmNoU291cmNlU2V0dGluZ3MsIGhhc2h0YWc6IHN0cmluZywgY29tcGxldGVNYXRjaCA9IGZhbHNlKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgaGFzaHRhZ0lzVmFsaWQgPSBmYWxzZTtcclxuICAgIHNlYXJjaFNvdXJjZVNldHRpbmcudmFsdWVzLmZvckVhY2goIGNvbmYgPT4ge1xyXG4gICAgICBjb25zdCByZSA9IG5ldyBSZWdFeHAoJycgKyBoYXNodGFnLnN1YnN0cmluZygxKSArICcnLCAnZycpO1xyXG4gICAgICBpZiAoIHR5cGVvZiBjb25mLnZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGlmICggKGNvbXBsZXRlTWF0Y2ggJiYgY29uZi52YWx1ZSA9PT0gaGFzaHRhZy5zdWJzdHJpbmcoMSkpIHx8XHJcbiAgICAgICAgICAgICAgKCAhY29tcGxldGVNYXRjaCAmJiBjb25mLnZhbHVlLm1hdGNoKHJlKSkgKSB7XHJcbiAgICAgICAgICBoYXNodGFnSXNWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBoYXNodGFnSXNWYWxpZDtcclxuICB9XHJcblxyXG4gIGdldFNldHRpbmdzVmFsdWVzKHNlYXJjaDogc3RyaW5nKTogU2VhcmNoU291cmNlU2V0dGluZ3Mge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0RGVmYXVsdE9wdGlvbnMoKS5zZXR0aW5ncy5maW5kKCAodmFsdWU6IFNlYXJjaFNvdXJjZVNldHRpbmdzKSA9PiB7XHJcbiAgICAgIHJldHVybiB2YWx1ZS5uYW1lID09PSBzZWFyY2g7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG59XHJcblxyXG4vKipcclxuICogU2VhcmNoIHNvdXJjZXMgdGhhdCBhbGxvdyBzZWFyY2hpbmcgYnkgdGV4dCBpbXBsZW1lbnQgdGhpcyBjbGFzc1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBUZXh0U2VhcmNoIHtcclxuICAvKipcclxuICAgKiBTZWFyY2ggYnkgdGV4dFxyXG4gICAqIEBwYXJhbSB0ZXJtIFRleHRcclxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9yIHNlYXJjaCByZXN1bHRzXHJcbiAgICovXHJcbiAgc2VhcmNoKFxyXG4gICAgdGVybTogc3RyaW5nIHwgdW5kZWZpbmVkLFxyXG4gICAgb3B0aW9ucz86IFRleHRTZWFyY2hPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxTZWFyY2hSZXN1bHRbXT47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZWFyY2ggc291cmNlcyB0aGF0IGFsbG93IHNlYXJjaGluZyBieSBjb29yZGluYXRlcyBpbXBsZW1lbnQgdGhpcyBjbGFzc1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBSZXZlcnNlU2VhcmNoIHtcclxuICAvKipcclxuICAgKiBTZWFyY2ggYnkgdGV4dFxyXG4gICAqIEBwYXJhbSBsb25MYXQgQ29vcmRpbmF0ZXNcclxuICAgKiBAcGFyYW0gZGlzdGFuY2UgT3B0aW9uYWw6IFNlYXJjaCByYWRpdXMgYXJvdW5mIGxvbkxhdFxyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb3Igc2VhcmNoIHJlc3VsdHNcclxuICAgKi9cclxuICByZXZlcnNlU2VhcmNoKFxyXG4gICAgbG9uTGF0OiBbbnVtYmVyLCBudW1iZXJdLFxyXG4gICAgb3B0aW9ucz86IFJldmVyc2VTZWFyY2hPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxTZWFyY2hSZXN1bHRbXT47XHJcbn1cclxuIl19