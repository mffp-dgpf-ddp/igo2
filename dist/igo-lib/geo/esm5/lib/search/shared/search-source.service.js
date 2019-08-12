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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXNvdXJjZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zaGFyZWQvc2VhcmNoLXNvdXJjZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFLQTs7OztJQUNFLDZCQUFvQixPQUF1QjtRQUF2QixZQUFPLEdBQVAsT0FBTyxDQUFnQjtJQUFHLENBQUM7SUFFL0M7OztPQUdHOzs7OztJQUNILHdDQUFVOzs7O0lBQVY7UUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7SUFDSCwrQ0FBaUI7Ozs7SUFBakI7UUFDRSxPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNOzs7O1FBQzdCLFVBQUMsTUFBb0IsSUFBSyxPQUFBLE1BQU0sQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUF2QixDQUF1QixFQUNsRCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7OztPQUtHOzs7Ozs7OztJQUNILGlEQUFtQjs7Ozs7OztJQUFuQixVQUFvQixJQUFZO1FBQzlCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQyxNQUFvQjtZQUM3QyxJQUFJLENBQUMsbUJBQUEsTUFBTSxDQUFDLFdBQVcsRUFBdUIsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUU7Z0JBQzdELE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2FBQ3ZCO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQ3hCO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsMEJBQUM7QUFBRCxDQUFDLEFBcENELElBb0NDOzs7Ozs7Ozs7O0lBbkNhLHNDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlYXJjaFNvdXJjZSB9IGZyb20gJy4vc291cmNlcy9zb3VyY2UnO1xyXG5cclxuLyoqXHJcbiAqIFNlcnZpY2Ugd2hlcmUgYWxsIGF2YWlsYWJsZSBzZWFyY2ggc291cmNlcyBhcmUgcmVnaXN0ZXJlZC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hTb3VyY2VTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNvdXJjZXM6IFNlYXJjaFNvdXJjZVtdKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gYXZhaWxhYmxlIHNlYXJjaCBzb3VyY2VzXHJcbiAgICogQHJldHVybnMgU2VhcmNoIHNvdXJjZXNcclxuICAgKi9cclxuICBnZXRTb3VyY2VzKCk6IFNlYXJjaFNvdXJjZVtdIHtcclxuICAgIHJldHVybiB0aGlzLnNvdXJjZXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gZW5hYmxlZCBzZWFyY2ggc291cmNlc1xyXG4gICAqIEByZXR1cm5zIFNlYXJjaCBzb3VyY2VzXHJcbiAgICovXHJcbiAgZ2V0RW5hYmxlZFNvdXJjZXMoKTogU2VhcmNoU291cmNlW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0U291cmNlcygpLmZpbHRlcihcclxuICAgICAgKHNvdXJjZTogU2VhcmNoU291cmNlKSA9PiBzb3VyY2UuZW5hYmxlZCA9PT0gdHJ1ZVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVuYWJsZSBzZWFyY2ggc291cmNlcyBvZiBnaXZlbiB0eXBlXHJcbiAgICogQHBhcmFtIHR5cGUgU2VhcmNoIHR5cGVcclxuICAgKiBAdG9kbyBJdCB3b3VsZCBiZSBiZXR0ZXIgdG8gdHJhY2sgdGhlIGVuYWJsZWQgc2VhcmNoIHNvdXJjZXNcclxuICAgKiAgd2l0aG91dCB1cGRhdGluZyB0aGVpciAnZW5hYmxlZCcgcHJvcGVydHkuXHJcbiAgICovXHJcbiAgZW5hYmxlU291cmNlc0J5VHlwZSh0eXBlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuZ2V0U291cmNlcygpLmZvckVhY2goKHNvdXJjZTogU2VhcmNoU291cmNlKSA9PiB7XHJcbiAgICAgIGlmICgoc291cmNlLmNvbnN0cnVjdG9yIGFzIHR5cGVvZiBTZWFyY2hTb3VyY2UpLnR5cGUgPT09IHR5cGUpIHtcclxuICAgICAgICBzb3VyY2UuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc291cmNlLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==