/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Base search source class
 */
var SearchSource = /** @class */ (function () {
    function SearchSource(options) {
        this.options = Object.assign({}, this.getDefaultOptions(), options);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zaGFyZWQvc291cmNlcy9zb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVlBO0lBZ0ZFLHNCQUFZLE9BQTRCO1FBQ3RDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQS9ERDs7O09BR0c7Ozs7O0lBQ0gsNEJBQUs7Ozs7SUFBTDtRQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsMkNBQTJDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDTyx3Q0FBaUI7Ozs7O0lBQTNCO1FBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFLRCxzQkFBSSwrQkFBSztRQUhUOztXQUVHOzs7OztRQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUM1QixDQUFDOzs7T0FBQTtJQUtELHNCQUFJLG1DQUFTO1FBSGI7O1dBRUc7Ozs7O1FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLEtBQUssQ0FBQztRQUMxQyxDQUFDOzs7T0FBQTtJQUtELHNCQUFJLGlDQUFPOzs7O1FBR1g7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEtBQUssS0FBSyxDQUFDO1FBQzFELENBQUM7UUFSRDs7V0FFRzs7Ozs7O1FBQ0gsVUFBWSxLQUFjO1lBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUMvQixDQUFDOzs7T0FBQTtJQVFELHNCQUFJLG1DQUFTO1FBSGI7O1dBRUc7Ozs7O1FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQ2hDLENBQUM7OztPQUFBO0lBS0Qsc0JBQUksZ0NBQU07UUFIVjs7V0FFRzs7Ozs7UUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ3RFLENBQUM7OztPQUFBO0lBS0Qsc0JBQUksc0NBQVk7UUFIaEI7O1dBRUc7Ozs7O1FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUNwRSxDQUFDOzs7T0FBQTs7Ozs7SUF6RU0sZUFBRSxHQUFHLEVBQUUsQ0FBQzs7Ozs7SUFNUixpQkFBSSxHQUFHLEVBQUUsQ0FBQztJQXdFbkIsbUJBQUM7Q0FBQSxBQW5GRCxJQW1GQztTQW5GWSxZQUFZOzs7Ozs7O0lBS3ZCLGdCQUFlOzs7Ozs7SUFNZixrQkFBaUI7Ozs7Ozs7SUFNakIsK0JBQXVDOzs7Ozs7QUF1RXpDLGdDQVVDOzs7Ozs7OztJQUpDLDJEQUc4Qjs7Ozs7O0FBTWhDLG1DQVdDOzs7Ozs7OztJQUpDLHVFQUc4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCB9IGZyb20gJy4uL3NlYXJjaC5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHtcclxuICBTZWFyY2hTb3VyY2VPcHRpb25zLFxyXG4gIFRleHRTZWFyY2hPcHRpb25zLFxyXG4gIFJldmVyc2VTZWFyY2hPcHRpb25zXHJcbn0gZnJvbSAnLi9zb3VyY2UuaW50ZXJmYWNlcyc7XHJcblxyXG4vKipcclxuICogQmFzZSBzZWFyY2ggc291cmNlIGNsYXNzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2VhcmNoU291cmNlIHtcclxuICAvKipcclxuICAgKiBTZWFyY2ggc291cmNlIElEXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgc3RhdGljIGlkID0gJyc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBzb3VyY2UgdHlwZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHN0YXRpYyB0eXBlID0gJyc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBzb3VyY2Ugb3B0aW9uc1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBvcHRpb25zOiBTZWFyY2hTb3VyY2VPcHRpb25zO1xyXG5cclxuICAvKipcclxuICAgKiBHZXQgc2VhcmNoIHNvdXJjZSdzIGlkXHJcbiAgICogQHJldHVybnMgU2VhcmNoIHNvdXJjZSdzIGlkXHJcbiAgICovXHJcbiAgZ2V0SWQoKTogc3RyaW5nIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignWW91IGhhdmUgdG8gaW1wbGVtZW50IHRoZSBtZXRob2QgXCJnZXRJZFwiLicpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHNlYXJjaCBzb3VyY2UncyBkZWZhdWx0IG9wdGlvbnNcclxuICAgKiBAcmV0dXJucyBTZWFyY2ggc291cmNlIGRlZmF1bHQgb3B0aW9uc1xyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBnZXREZWZhdWx0T3B0aW9ucygpOiBTZWFyY2hTb3VyY2VPcHRpb25zIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignWW91IGhhdmUgdG8gaW1wbGVtZW50IHRoZSBtZXRob2QgXCJnZXREZWZhdWx0T3B0aW9uc1wiLicpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHNvdXJjZSdzIHRpdGxlXHJcbiAgICovXHJcbiAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnRpdGxlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgc2VhcmNoIHNvdXJjZSBpcyBhdmFpbGFibGVcclxuICAgKi9cclxuICBnZXQgYXZhaWxhYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5hdmFpbGFibGUgIT09IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgc2VhcmNoIHNvdXJjZSBpcyBlbmFibGVkXHJcbiAgICovXHJcbiAgc2V0IGVuYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMub3B0aW9ucy5lbmFibGVkID0gdmFsdWU7XHJcbiAgfVxyXG4gIGdldCBlbmFibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuYXZhaWxhYmxlICYmIHRoaXMub3B0aW9ucy5lbmFibGVkICE9PSBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCB1cmxcclxuICAgKi9cclxuICBnZXQgc2VhcmNoVXJsKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnNlYXJjaFVybDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBxdWVyeSBwYXJhbXNcclxuICAgKi9cclxuICBnZXQgcGFyYW1zKCk6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0ge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5wYXJhbXMgPT09IHVuZGVmaW5lZCA/IHt9IDogdGhpcy5vcHRpb25zLnBhcmFtcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCByZXN1bHRzIGRpc3BsYXkgb3JkZXJcclxuICAgKi9cclxuICBnZXQgZGlzcGxheU9yZGVyKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLm9yZGVyID09PSB1bmRlZmluZWQgPyA5OSA6IHRoaXMub3B0aW9ucy5vcmRlcjtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFNlYXJjaFNvdXJjZU9wdGlvbnMpIHtcclxuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZ2V0RGVmYXVsdE9wdGlvbnMoKSwgb3B0aW9ucyk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogU2VhcmNoIHNvdXJjZXMgdGhhdCBhbGxvdyBzZWFyY2hpbmcgYnkgdGV4dCBpbXBsZW1lbnQgdGhpcyBjbGFzc1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBUZXh0U2VhcmNoIHtcclxuICAvKipcclxuICAgKiBTZWFyY2ggYnkgdGV4dFxyXG4gICAqIEBwYXJhbSB0ZXJtIFRleHRcclxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9yIHNlYXJjaCByZXN1bHRzXHJcbiAgICovXHJcbiAgc2VhcmNoKFxyXG4gICAgdGVybTogc3RyaW5nIHwgdW5kZWZpbmVkLFxyXG4gICAgb3B0aW9ucz86IFRleHRTZWFyY2hPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxTZWFyY2hSZXN1bHRbXT47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZWFyY2ggc291cmNlcyB0aGF0IGFsbG93IHNlYXJjaGluZyBieSBjb29yZGluYXRlcyBpbXBsZW1lbnQgdGhpcyBjbGFzc1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBSZXZlcnNlU2VhcmNoIHtcclxuICAvKipcclxuICAgKiBTZWFyY2ggYnkgdGV4dFxyXG4gICAqIEBwYXJhbSBsb25MYXQgQ29vcmRpbmF0ZXNcclxuICAgKiBAcGFyYW0gZGlzdGFuY2UgT3B0aW9uYWw6IFNlYXJjaCByYWRpdXMgYXJvdW5mIGxvbkxhdFxyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb3Igc2VhcmNoIHJlc3VsdHNcclxuICAgKi9cclxuICByZXZlcnNlU2VhcmNoKFxyXG4gICAgbG9uTGF0OiBbbnVtYmVyLCBudW1iZXJdLFxyXG4gICAgb3B0aW9ucz86IFJldmVyc2VTZWFyY2hPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxTZWFyY2hSZXN1bHRbXT47XHJcbn1cclxuIl19