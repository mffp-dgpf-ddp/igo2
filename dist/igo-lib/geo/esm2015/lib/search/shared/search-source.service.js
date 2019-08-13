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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXNvdXJjZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zaGFyZWQvc2VhcmNoLXNvdXJjZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFNQSxNQUFNLE9BQU8sbUJBQW1COzs7O0lBQzlCLFlBQW9CLE9BQXVCO1FBQXZCLFlBQU8sR0FBUCxPQUFPLENBQWdCO0lBQUcsQ0FBQzs7Ozs7SUFNL0MsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDOzs7OztJQU1ELGlCQUFpQjtRQUNmLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU07Ozs7UUFDN0IsQ0FBQyxNQUFvQixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxLQUFLLElBQUksRUFDbEQsQ0FBQztJQUNKLENBQUM7Ozs7Ozs7O0lBUUQsbUJBQW1CLENBQUMsSUFBWTtRQUM5QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsT0FBTzs7OztRQUFDLENBQUMsTUFBb0IsRUFBRSxFQUFFO1lBQ2pELElBQUksQ0FBQyxtQkFBQSxNQUFNLENBQUMsV0FBVyxFQUF1QixDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRTtnQkFDN0QsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7YUFDdkI7aUJBQU07Z0JBQ0wsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7YUFDeEI7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7Ozs7SUFPRCxtQkFBbUIsQ0FBQyxNQUFvQixFQUFFLE9BQTZCO1FBQ3JFLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QyxDQUFDO0NBQ0Y7Ozs7OztJQTVDYSxzQ0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZWFyY2hTb3VyY2UgfSBmcm9tICcuL3NvdXJjZXMvc291cmNlJztcclxuaW1wb3J0IHsgU2VhcmNoU291cmNlU2V0dGluZ3MgfSBmcm9tICcuL3NvdXJjZXMvc291cmNlLmludGVyZmFjZXMnO1xyXG5cclxuLyoqXHJcbiAqIFNlcnZpY2Ugd2hlcmUgYWxsIGF2YWlsYWJsZSBzZWFyY2ggc291cmNlcyBhcmUgcmVnaXN0ZXJlZC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hTb3VyY2VTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNvdXJjZXM6IFNlYXJjaFNvdXJjZVtdKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gYXZhaWxhYmxlIHNlYXJjaCBzb3VyY2VzXHJcbiAgICogQHJldHVybnMgU2VhcmNoIHNvdXJjZXNcclxuICAgKi9cclxuICBnZXRTb3VyY2VzKCk6IFNlYXJjaFNvdXJjZVtdIHtcclxuICAgIHJldHVybiB0aGlzLnNvdXJjZXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gZW5hYmxlZCBzZWFyY2ggc291cmNlc1xyXG4gICAqIEByZXR1cm5zIFNlYXJjaCBzb3VyY2VzXHJcbiAgICovXHJcbiAgZ2V0RW5hYmxlZFNvdXJjZXMoKTogU2VhcmNoU291cmNlW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0U291cmNlcygpLmZpbHRlcihcclxuICAgICAgKHNvdXJjZTogU2VhcmNoU291cmNlKSA9PiBzb3VyY2UuZW5hYmxlZCA9PT0gdHJ1ZVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVuYWJsZSBzZWFyY2ggc291cmNlcyBvZiBnaXZlbiB0eXBlXHJcbiAgICogQHBhcmFtIHR5cGUgU2VhcmNoIHR5cGVcclxuICAgKiBAdG9kbyBJdCB3b3VsZCBiZSBiZXR0ZXIgdG8gdHJhY2sgdGhlIGVuYWJsZWQgc2VhcmNoIHNvdXJjZXNcclxuICAgKiAgd2l0aG91dCB1cGRhdGluZyB0aGVpciAnZW5hYmxlZCcgcHJvcGVydHkuXHJcbiAgICovXHJcbiAgZW5hYmxlU291cmNlc0J5VHlwZSh0eXBlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuZ2V0U291cmNlcygpLmZvckVhY2goKHNvdXJjZTogU2VhcmNoU291cmNlKSA9PiB7XHJcbiAgICAgIGlmICgoc291cmNlLmNvbnN0cnVjdG9yIGFzIHR5cGVvZiBTZWFyY2hTb3VyY2UpLnR5cGUgPT09IHR5cGUpIHtcclxuICAgICAgICBzb3VyY2UuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc291cmNlLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgUGFyYW0gZnJvbSB0aGUgc2VsZWN0ZWQgc2V0dGluZ3NcclxuICAgKiBAcGFyYW0gc291cmNlIHNlYXJjaC1zb3VyY2VcclxuICAgKiBAcGFyYW0gc2V0dGluZyBzZXR0aW5nc1xyXG4gICAqL1xyXG4gIHNldFBhcmFtRnJvbVNldHRpbmcoc291cmNlOiBTZWFyY2hTb3VyY2UsIHNldHRpbmc6IFNlYXJjaFNvdXJjZVNldHRpbmdzKSB7XHJcbiAgICBzb3VyY2Uuc2V0UGFyYW1Gcm9tU2V0dGluZyhzZXR0aW5nKTtcclxuICB9XHJcbn1cclxuIl19