/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Service where all available search sources are registered.
 */
export class SearchSourceService {
    /**
     * @param {?} sources
     */
    constructor(sources) {
        this.sources = sources;
    }
    /**
     * Return available search sources
     * @return {?} Search sources
     */
    getSources() {
        return this.sources;
    }
    /**
     * Return enabled search sources
     * @return {?} Search sources
     */
    getEnabledSources() {
        return this.getSources().filter((/**
         * @param {?} source
         * @return {?}
         */
        (source) => source.enabled === true));
    }
    /**
     * Enable search sources of given type
     * \@todo It would be better to track the enabled search sources
     *  without updating their 'enabled' property.
     * @param {?} type Search type
     * @return {?}
     */
    enableSourcesByType(type) {
        this.getSources().forEach((/**
         * @param {?} source
         * @return {?}
         */
        (source) => {
            if (((/** @type {?} */ (source.constructor))).type === type) {
                source.enabled = true;
            }
            else {
                source.enabled = false;
            }
        }));
    }
    /**
     * Set Param from the selected settings
     * @param {?} source search-source
     * @param {?} setting settings
     * @return {?}
     */
    setParamFromSetting(source, setting) {
        source.setParamFromSetting(setting);
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    SearchSourceService.prototype.sources;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXNvdXJjZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zaGFyZWQvc2VhcmNoLXNvdXJjZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFNQSxNQUFNLE9BQU8sbUJBQW1COzs7O0lBRTlCLFlBQW9CLE9BQXVCO1FBQXZCLFlBQU8sR0FBUCxPQUFPLENBQWdCO0lBQUcsQ0FBQzs7Ozs7SUFNL0MsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDOzs7OztJQU1ELGlCQUFpQjtRQUNmLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU07Ozs7UUFDN0IsQ0FBQyxNQUFvQixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxLQUFLLElBQUksRUFDbEQsQ0FBQztJQUNKLENBQUM7Ozs7Ozs7O0lBUUQsbUJBQW1CLENBQUMsSUFBWTtRQUM5QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsT0FBTzs7OztRQUFDLENBQUMsTUFBb0IsRUFBRSxFQUFFO1lBQ2pELElBQUksQ0FBQyxtQkFBQSxNQUFNLENBQUMsV0FBVyxFQUF1QixDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRTtnQkFDN0QsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7YUFDdkI7aUJBQU07Z0JBQ0wsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7YUFDeEI7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7Ozs7SUFPRCxtQkFBbUIsQ0FBQyxNQUFvQixFQUFFLE9BQTZCO1FBQ3JFLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QyxDQUFDO0NBQ0Y7Ozs7OztJQTVDYSxzQ0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZWFyY2hTb3VyY2UgfSBmcm9tICcuL3NvdXJjZXMvc291cmNlJztcclxuaW1wb3J0IHsgU2VhcmNoU291cmNlU2V0dGluZ3MgfSBmcm9tICcuL3NvdXJjZXMvc291cmNlLmludGVyZmFjZXMnO1xyXG5cclxuLyoqXHJcbiAqIFNlcnZpY2Ugd2hlcmUgYWxsIGF2YWlsYWJsZSBzZWFyY2ggc291cmNlcyBhcmUgcmVnaXN0ZXJlZC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hTb3VyY2VTZXJ2aWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzb3VyY2VzOiBTZWFyY2hTb3VyY2VbXSkge31cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIGF2YWlsYWJsZSBzZWFyY2ggc291cmNlc1xyXG4gICAqIEByZXR1cm5zIFNlYXJjaCBzb3VyY2VzXHJcbiAgICovXHJcbiAgZ2V0U291cmNlcygpOiBTZWFyY2hTb3VyY2VbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5zb3VyY2VzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIGVuYWJsZWQgc2VhcmNoIHNvdXJjZXNcclxuICAgKiBAcmV0dXJucyBTZWFyY2ggc291cmNlc1xyXG4gICAqL1xyXG4gIGdldEVuYWJsZWRTb3VyY2VzKCk6IFNlYXJjaFNvdXJjZVtdIHtcclxuICAgIHJldHVybiB0aGlzLmdldFNvdXJjZXMoKS5maWx0ZXIoXHJcbiAgICAgIChzb3VyY2U6IFNlYXJjaFNvdXJjZSkgPT4gc291cmNlLmVuYWJsZWQgPT09IHRydWVcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbmFibGUgc2VhcmNoIHNvdXJjZXMgb2YgZ2l2ZW4gdHlwZVxyXG4gICAqIEBwYXJhbSB0eXBlIFNlYXJjaCB0eXBlXHJcbiAgICogQHRvZG8gSXQgd291bGQgYmUgYmV0dGVyIHRvIHRyYWNrIHRoZSBlbmFibGVkIHNlYXJjaCBzb3VyY2VzXHJcbiAgICogIHdpdGhvdXQgdXBkYXRpbmcgdGhlaXIgJ2VuYWJsZWQnIHByb3BlcnR5LlxyXG4gICAqL1xyXG4gIGVuYWJsZVNvdXJjZXNCeVR5cGUodHlwZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmdldFNvdXJjZXMoKS5mb3JFYWNoKChzb3VyY2U6IFNlYXJjaFNvdXJjZSkgPT4ge1xyXG4gICAgICBpZiAoKHNvdXJjZS5jb25zdHJ1Y3RvciBhcyB0eXBlb2YgU2VhcmNoU291cmNlKS50eXBlID09PSB0eXBlKSB7XHJcbiAgICAgICAgc291cmNlLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNvdXJjZS5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IFBhcmFtIGZyb20gdGhlIHNlbGVjdGVkIHNldHRpbmdzXHJcbiAgICogQHBhcmFtIHNvdXJjZSBzZWFyY2gtc291cmNlXHJcbiAgICogQHBhcmFtIHNldHRpbmcgc2V0dGluZ3NcclxuICAgKi9cclxuICBzZXRQYXJhbUZyb21TZXR0aW5nKHNvdXJjZTogU2VhcmNoU291cmNlLCBzZXR0aW5nOiBTZWFyY2hTb3VyY2VTZXR0aW5ncykge1xyXG4gICAgc291cmNlLnNldFBhcmFtRnJvbVNldHRpbmcoc2V0dGluZyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==