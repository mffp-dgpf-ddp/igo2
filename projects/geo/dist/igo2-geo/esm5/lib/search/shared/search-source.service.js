/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Service where all available search sources are registered.
 */
var /**
 * Service where all available search sources are registered.
 */
SearchSourceService = /** @class */ (function () {
    function SearchSourceService(sources) {
        this.sources = sources;
    }
    /**
     * Return available search sources
     * @returns Search sources
     */
    /**
     * Return available search sources
     * @return {?} Search sources
     */
    SearchSourceService.prototype.getSources = /**
     * Return available search sources
     * @return {?} Search sources
     */
    function () {
        return this.sources;
    };
    /**
     * Return enabled search sources
     * @returns Search sources
     */
    /**
     * Return enabled search sources
     * @return {?} Search sources
     */
    SearchSourceService.prototype.getEnabledSources = /**
     * Return enabled search sources
     * @return {?} Search sources
     */
    function () {
        return this.getSources().filter((/**
         * @param {?} source
         * @return {?}
         */
        function (source) { return source.enabled === true; }));
    };
    /**
     * Enable search sources of given type
     * @param type Search type
     * @todo It would be better to track the enabled search sources
     *  without updating their 'enabled' property.
     */
    /**
     * Enable search sources of given type
     * \@todo It would be better to track the enabled search sources
     *  without updating their 'enabled' property.
     * @param {?} type Search type
     * @return {?}
     */
    SearchSourceService.prototype.enableSourcesByType = /**
     * Enable search sources of given type
     * \@todo It would be better to track the enabled search sources
     *  without updating their 'enabled' property.
     * @param {?} type Search type
     * @return {?}
     */
    function (type) {
        this.getSources().forEach((/**
         * @param {?} source
         * @return {?}
         */
        function (source) {
            if (((/** @type {?} */ (source.constructor))).type === type) {
                source.enabled = true;
            }
            else {
                source.enabled = false;
            }
        }));
    };
    /**
     * Set Param from the selected settings
     * @param source search-source
     * @param setting settings
     */
    /**
     * Set Param from the selected settings
     * @param {?} source search-source
     * @param {?} setting settings
     * @return {?}
     */
    SearchSourceService.prototype.setParamFromSetting = /**
     * Set Param from the selected settings
     * @param {?} source search-source
     * @param {?} setting settings
     * @return {?}
     */
    function (source, setting) {
        source.setParamFromSetting(setting);
    };
    return SearchSourceService;
}());
/**
 * Service where all available search sources are registered.
 */
export { SearchSourceService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    SearchSourceService.prototype.sources;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXNvdXJjZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zaGFyZWQvc2VhcmNoLXNvdXJjZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFNQTs7OztJQUVFLDZCQUFvQixPQUF1QjtRQUF2QixZQUFPLEdBQVAsT0FBTyxDQUFnQjtJQUFHLENBQUM7SUFFL0M7OztPQUdHOzs7OztJQUNILHdDQUFVOzs7O0lBQVY7UUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7SUFDSCwrQ0FBaUI7Ozs7SUFBakI7UUFDRSxPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNOzs7O1FBQzdCLFVBQUMsTUFBb0IsSUFBSyxPQUFBLE1BQU0sQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUF2QixDQUF1QixFQUNsRCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7OztPQUtHOzs7Ozs7OztJQUNILGlEQUFtQjs7Ozs7OztJQUFuQixVQUFvQixJQUFZO1FBQzlCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQyxNQUFvQjtZQUM3QyxJQUFJLENBQUMsbUJBQUEsTUFBTSxDQUFDLFdBQVcsRUFBdUIsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUU7Z0JBQzdELE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2FBQ3ZCO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQ3hCO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNILGlEQUFtQjs7Ozs7O0lBQW5CLFVBQW9CLE1BQW9CLEVBQUUsT0FBNkI7UUFDckUsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDSCwwQkFBQztBQUFELENBQUMsQUE5Q0QsSUE4Q0M7Ozs7Ozs7Ozs7SUE1Q2Esc0NBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VhcmNoU291cmNlIH0gZnJvbSAnLi9zb3VyY2VzL3NvdXJjZSc7XHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZVNldHRpbmdzIH0gZnJvbSAnLi9zb3VyY2VzL3NvdXJjZS5pbnRlcmZhY2VzJztcclxuXHJcbi8qKlxyXG4gKiBTZXJ2aWNlIHdoZXJlIGFsbCBhdmFpbGFibGUgc2VhcmNoIHNvdXJjZXMgYXJlIHJlZ2lzdGVyZWQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2VhcmNoU291cmNlU2VydmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc291cmNlczogU2VhcmNoU291cmNlW10pIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiBhdmFpbGFibGUgc2VhcmNoIHNvdXJjZXNcclxuICAgKiBAcmV0dXJucyBTZWFyY2ggc291cmNlc1xyXG4gICAqL1xyXG4gIGdldFNvdXJjZXMoKTogU2VhcmNoU291cmNlW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuc291cmNlcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiBlbmFibGVkIHNlYXJjaCBzb3VyY2VzXHJcbiAgICogQHJldHVybnMgU2VhcmNoIHNvdXJjZXNcclxuICAgKi9cclxuICBnZXRFbmFibGVkU291cmNlcygpOiBTZWFyY2hTb3VyY2VbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRTb3VyY2VzKCkuZmlsdGVyKFxyXG4gICAgICAoc291cmNlOiBTZWFyY2hTb3VyY2UpID0+IHNvdXJjZS5lbmFibGVkID09PSB0cnVlXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRW5hYmxlIHNlYXJjaCBzb3VyY2VzIG9mIGdpdmVuIHR5cGVcclxuICAgKiBAcGFyYW0gdHlwZSBTZWFyY2ggdHlwZVxyXG4gICAqIEB0b2RvIEl0IHdvdWxkIGJlIGJldHRlciB0byB0cmFjayB0aGUgZW5hYmxlZCBzZWFyY2ggc291cmNlc1xyXG4gICAqICB3aXRob3V0IHVwZGF0aW5nIHRoZWlyICdlbmFibGVkJyBwcm9wZXJ0eS5cclxuICAgKi9cclxuICBlbmFibGVTb3VyY2VzQnlUeXBlKHR5cGU6IHN0cmluZykge1xyXG4gICAgdGhpcy5nZXRTb3VyY2VzKCkuZm9yRWFjaCgoc291cmNlOiBTZWFyY2hTb3VyY2UpID0+IHtcclxuICAgICAgaWYgKChzb3VyY2UuY29uc3RydWN0b3IgYXMgdHlwZW9mIFNlYXJjaFNvdXJjZSkudHlwZSA9PT0gdHlwZSkge1xyXG4gICAgICAgIHNvdXJjZS5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzb3VyY2UuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCBQYXJhbSBmcm9tIHRoZSBzZWxlY3RlZCBzZXR0aW5nc1xyXG4gICAqIEBwYXJhbSBzb3VyY2Ugc2VhcmNoLXNvdXJjZVxyXG4gICAqIEBwYXJhbSBzZXR0aW5nIHNldHRpbmdzXHJcbiAgICovXHJcbiAgc2V0UGFyYW1Gcm9tU2V0dGluZyhzb3VyY2U6IFNlYXJjaFNvdXJjZSwgc2V0dGluZzogU2VhcmNoU291cmNlU2V0dGluZ3MpIHtcclxuICAgIHNvdXJjZS5zZXRQYXJhbUZyb21TZXR0aW5nKHNldHRpbmcpO1xyXG4gIH1cclxufVxyXG4iXX0=