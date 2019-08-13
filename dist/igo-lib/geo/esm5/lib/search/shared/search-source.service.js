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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXNvdXJjZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zaGFyZWQvc2VhcmNoLXNvdXJjZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFNQTs7OztJQUNFLDZCQUFvQixPQUF1QjtRQUF2QixZQUFPLEdBQVAsT0FBTyxDQUFnQjtJQUFHLENBQUM7SUFFL0M7OztPQUdHOzs7OztJQUNILHdDQUFVOzs7O0lBQVY7UUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7SUFDSCwrQ0FBaUI7Ozs7SUFBakI7UUFDRSxPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNOzs7O1FBQzdCLFVBQUMsTUFBb0IsSUFBSyxPQUFBLE1BQU0sQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUF2QixDQUF1QixFQUNsRCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7OztPQUtHOzs7Ozs7OztJQUNILGlEQUFtQjs7Ozs7OztJQUFuQixVQUFvQixJQUFZO1FBQzlCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQyxNQUFvQjtZQUM3QyxJQUFJLENBQUMsbUJBQUEsTUFBTSxDQUFDLFdBQVcsRUFBdUIsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUU7Z0JBQzdELE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2FBQ3ZCO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQ3hCO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNILGlEQUFtQjs7Ozs7O0lBQW5CLFVBQW9CLE1BQW9CLEVBQUUsT0FBNkI7UUFDckUsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDSCwwQkFBQztBQUFELENBQUMsQUE3Q0QsSUE2Q0M7Ozs7Ozs7Ozs7SUE1Q2Esc0NBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VhcmNoU291cmNlIH0gZnJvbSAnLi9zb3VyY2VzL3NvdXJjZSc7XHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZVNldHRpbmdzIH0gZnJvbSAnLi9zb3VyY2VzL3NvdXJjZS5pbnRlcmZhY2VzJztcclxuXHJcbi8qKlxyXG4gKiBTZXJ2aWNlIHdoZXJlIGFsbCBhdmFpbGFibGUgc2VhcmNoIHNvdXJjZXMgYXJlIHJlZ2lzdGVyZWQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2VhcmNoU291cmNlU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzb3VyY2VzOiBTZWFyY2hTb3VyY2VbXSkge31cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIGF2YWlsYWJsZSBzZWFyY2ggc291cmNlc1xyXG4gICAqIEByZXR1cm5zIFNlYXJjaCBzb3VyY2VzXHJcbiAgICovXHJcbiAgZ2V0U291cmNlcygpOiBTZWFyY2hTb3VyY2VbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5zb3VyY2VzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIGVuYWJsZWQgc2VhcmNoIHNvdXJjZXNcclxuICAgKiBAcmV0dXJucyBTZWFyY2ggc291cmNlc1xyXG4gICAqL1xyXG4gIGdldEVuYWJsZWRTb3VyY2VzKCk6IFNlYXJjaFNvdXJjZVtdIHtcclxuICAgIHJldHVybiB0aGlzLmdldFNvdXJjZXMoKS5maWx0ZXIoXHJcbiAgICAgIChzb3VyY2U6IFNlYXJjaFNvdXJjZSkgPT4gc291cmNlLmVuYWJsZWQgPT09IHRydWVcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbmFibGUgc2VhcmNoIHNvdXJjZXMgb2YgZ2l2ZW4gdHlwZVxyXG4gICAqIEBwYXJhbSB0eXBlIFNlYXJjaCB0eXBlXHJcbiAgICogQHRvZG8gSXQgd291bGQgYmUgYmV0dGVyIHRvIHRyYWNrIHRoZSBlbmFibGVkIHNlYXJjaCBzb3VyY2VzXHJcbiAgICogIHdpdGhvdXQgdXBkYXRpbmcgdGhlaXIgJ2VuYWJsZWQnIHByb3BlcnR5LlxyXG4gICAqL1xyXG4gIGVuYWJsZVNvdXJjZXNCeVR5cGUodHlwZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmdldFNvdXJjZXMoKS5mb3JFYWNoKChzb3VyY2U6IFNlYXJjaFNvdXJjZSkgPT4ge1xyXG4gICAgICBpZiAoKHNvdXJjZS5jb25zdHJ1Y3RvciBhcyB0eXBlb2YgU2VhcmNoU291cmNlKS50eXBlID09PSB0eXBlKSB7XHJcbiAgICAgICAgc291cmNlLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNvdXJjZS5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IFBhcmFtIGZyb20gdGhlIHNlbGVjdGVkIHNldHRpbmdzXHJcbiAgICogQHBhcmFtIHNvdXJjZSBzZWFyY2gtc291cmNlXHJcbiAgICogQHBhcmFtIHNldHRpbmcgc2V0dGluZ3NcclxuICAgKi9cclxuICBzZXRQYXJhbUZyb21TZXR0aW5nKHNvdXJjZTogU2VhcmNoU291cmNlLCBzZXR0aW5nOiBTZWFyY2hTb3VyY2VTZXR0aW5ncykge1xyXG4gICAgc291cmNlLnNldFBhcmFtRnJvbVNldHRpbmcoc2V0dGluZyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==