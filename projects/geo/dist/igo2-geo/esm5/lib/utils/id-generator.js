/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Md5 } from 'ts-md5';
import { uuid } from '@igo2/utils';
/**
 * Generate a id from it's datasource options.
 * @param {?} options Data source options
 * @return {?} A id
 */
export function generateIdFromSourceOptions(options) {
    /** @type {?} */
    var generators = {
        wms: generateWMSIdFromSourceOptions,
        wmts: generateWMTSIdFromSourceOptions,
        xyz: generateXYZIdFromSourceOptions,
        feature: generateFeatureIdFromSourceOptions,
        osm: (/**
         * @param {?} _options
         * @return {?}
         */
        function (_options) { return 'OSM'; })
    };
    /** @type {?} */
    var generator = generators[options.type] || generateId;
    return generator(options);
}
/**
 * Generate a id from WMS data source options
 * @param {?} options WMS data source options
 * @return {?} A md5 hash of the the url and layers
 */
export function generateWMSIdFromSourceOptions(options) {
    /** @type {?} */
    var layers = options.params.LAYERS;
    /** @type {?} */
    var url = options.url.charAt(0) === '/' ? window.location.origin + options.url : options.url;
    /** @type {?} */
    var chain = 'wms' + url + layers;
    return (/** @type {?} */ (Md5.hashStr(chain)));
}
/**
 * Generate a id from WMTS data source options
 * @param {?} options WMTS data source options
 * @return {?} A md5 hash of the the url and layer
 */
export function generateWMTSIdFromSourceOptions(options) {
    /** @type {?} */
    var layer = options.layer;
    /** @type {?} */
    var chain = 'wmts' + options.url + layer;
    return (/** @type {?} */ (Md5.hashStr(chain)));
}
/**
 * Generate a id from XYZ data source options
 * @param {?} options XYZ data source options
 * @return {?} A md5 hash of the the url and layer
 */
export function generateXYZIdFromSourceOptions(options) {
    /** @type {?} */
    var chain = 'xyz' + options.url;
    return (/** @type {?} */ (Md5.hashStr(chain)));
}
/**
 * Generate a id from feature data source options
 * @param {?} options XYZ data source options
 * @return {?} A md5 hash of the the url and layer
 */
export function generateFeatureIdFromSourceOptions(options) {
    if (!options.url) {
        return generateId(options);
    }
    /** @type {?} */
    var chain = 'feature' + options.url;
    return (/** @type {?} */ (Md5.hashStr(chain)));
}
/**
 * Generate a unique id
 * @param {?} options
 * @return {?} A uuid
 */
export function generateId(options) {
    return uuid();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWQtZ2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3V0aWxzL2lkLWdlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUU3QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7Ozs7QUFZbkMsTUFBTSxVQUFVLDJCQUEyQixDQUFDLE9BQTBCOztRQUM5RCxVQUFVLEdBQUc7UUFDakIsR0FBRyxFQUFFLDhCQUE4QjtRQUNuQyxJQUFJLEVBQUUsK0JBQStCO1FBQ3JDLEdBQUcsRUFBRSw4QkFBOEI7UUFDbkMsT0FBTyxFQUFFLGtDQUFrQztRQUMzQyxHQUFHOzs7O1FBQUUsVUFBQyxRQUE4QixJQUFLLE9BQUEsS0FBSyxFQUFMLENBQUssQ0FBQTtLQUMvQzs7UUFDSyxTQUFTLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVO0lBQ3hELE9BQU8sU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzVCLENBQUM7Ozs7OztBQU9ELE1BQU0sVUFBVSw4QkFBOEIsQ0FBQyxPQUE2Qjs7UUFDcEUsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTTs7UUFDOUIsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUc7O1FBQ3hGLEtBQUssR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLE1BQU07SUFDbEMsT0FBTyxtQkFBQSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFVLENBQUM7QUFDdEMsQ0FBQzs7Ozs7O0FBT0QsTUFBTSxVQUFVLCtCQUErQixDQUFDLE9BQThCOztRQUN0RSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUs7O1FBQ3JCLEtBQUssR0FBRyxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsR0FBRyxLQUFLO0lBQzFDLE9BQU8sbUJBQUEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBVSxDQUFDO0FBQ3RDLENBQUM7Ozs7OztBQU9ELE1BQU0sVUFBVSw4QkFBOEIsQ0FBQyxPQUE4Qjs7UUFDckUsS0FBSyxHQUFHLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRztJQUNqQyxPQUFPLG1CQUFBLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQVUsQ0FBQztBQUN0QyxDQUFDOzs7Ozs7QUFPRCxNQUFNLFVBQVUsa0NBQWtDLENBQUMsT0FBOEI7SUFDL0UsSUFBSSxDQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUU7UUFBRSxPQUFPLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUFFOztRQUM1QyxLQUFLLEdBQUcsU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHO0lBQ3JDLE9BQU8sbUJBQUEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBVSxDQUFDO0FBQ3RDLENBQUM7Ozs7OztBQU1ELE1BQU0sVUFBVSxVQUFVLENBQUMsT0FBNkI7SUFDdEQsT0FBTyxJQUFJLEVBQUUsQ0FBQztBQUNoQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWQ1IH0gZnJvbSAndHMtbWQ1JztcclxuXHJcbmltcG9ydCB7IHV1aWQgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQgeyBBbnlEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2FueS1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IERhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBXTVNEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL3dtcy1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFdNVFNEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL3dtdHMtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlIGEgaWQgZnJvbSBpdCdzIGRhdGFzb3VyY2Ugb3B0aW9ucy5cclxuICogQHBhcmFtIG9wdGlvbnMgRGF0YSBzb3VyY2Ugb3B0aW9uc1xyXG4gKiBAcmV0dXJucyBBIGlkXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVJZEZyb21Tb3VyY2VPcHRpb25zKG9wdGlvbnM6IERhdGFTb3VyY2VPcHRpb25zKTogc3RyaW5nIHtcclxuICBjb25zdCBnZW5lcmF0b3JzID0ge1xyXG4gICAgd21zOiBnZW5lcmF0ZVdNU0lkRnJvbVNvdXJjZU9wdGlvbnMsXHJcbiAgICB3bXRzOiBnZW5lcmF0ZVdNVFNJZEZyb21Tb3VyY2VPcHRpb25zLFxyXG4gICAgeHl6OiBnZW5lcmF0ZVhZWklkRnJvbVNvdXJjZU9wdGlvbnMsXHJcbiAgICBmZWF0dXJlOiBnZW5lcmF0ZUZlYXR1cmVJZEZyb21Tb3VyY2VPcHRpb25zLFxyXG4gICAgb3NtOiAoX29wdGlvbnM6IEFueURhdGFTb3VyY2VPcHRpb25zKSA9PiAnT1NNJ1xyXG4gIH07XHJcbiAgY29uc3QgZ2VuZXJhdG9yID0gZ2VuZXJhdG9yc1tvcHRpb25zLnR5cGVdIHx8IGdlbmVyYXRlSWQ7XHJcbiAgcmV0dXJuIGdlbmVyYXRvcihvcHRpb25zKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlIGEgaWQgZnJvbSBXTVMgZGF0YSBzb3VyY2Ugb3B0aW9uc1xyXG4gKiBAcGFyYW0gb3B0aW9ucyBXTVMgZGF0YSBzb3VyY2Ugb3B0aW9uc1xyXG4gKiBAcmV0dXJucyBBIG1kNSBoYXNoIG9mIHRoZSB0aGUgdXJsIGFuZCBsYXllcnNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVdNU0lkRnJvbVNvdXJjZU9wdGlvbnMob3B0aW9uczogV01TRGF0YVNvdXJjZU9wdGlvbnMpIHtcclxuICBjb25zdCBsYXllcnMgPSBvcHRpb25zLnBhcmFtcy5MQVlFUlM7XHJcbiAgY29uc3QgdXJsID0gb3B0aW9ucy51cmwuY2hhckF0KDApID09PSAnLycgPyB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgb3B0aW9ucy51cmwgOiBvcHRpb25zLnVybDtcclxuICBjb25zdCBjaGFpbiA9ICd3bXMnICsgdXJsICsgbGF5ZXJzO1xyXG4gIHJldHVybiBNZDUuaGFzaFN0cihjaGFpbikgYXMgc3RyaW5nO1xyXG59XHJcblxyXG4vKipcclxuICogR2VuZXJhdGUgYSBpZCBmcm9tIFdNVFMgZGF0YSBzb3VyY2Ugb3B0aW9uc1xyXG4gKiBAcGFyYW0gb3B0aW9ucyBXTVRTIGRhdGEgc291cmNlIG9wdGlvbnNcclxuICogQHJldHVybnMgQSBtZDUgaGFzaCBvZiB0aGUgdGhlIHVybCBhbmQgbGF5ZXJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVdNVFNJZEZyb21Tb3VyY2VPcHRpb25zKG9wdGlvbnM6IFdNVFNEYXRhU291cmNlT3B0aW9ucykge1xyXG4gIGNvbnN0IGxheWVyID0gb3B0aW9ucy5sYXllcjtcclxuICBjb25zdCBjaGFpbiA9ICd3bXRzJyArIG9wdGlvbnMudXJsICsgbGF5ZXI7XHJcbiAgcmV0dXJuIE1kNS5oYXNoU3RyKGNoYWluKSBhcyBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZSBhIGlkIGZyb20gWFlaIGRhdGEgc291cmNlIG9wdGlvbnNcclxuICogQHBhcmFtIG9wdGlvbnMgWFlaIGRhdGEgc291cmNlIG9wdGlvbnNcclxuICogQHJldHVybnMgQSBtZDUgaGFzaCBvZiB0aGUgdGhlIHVybCBhbmQgbGF5ZXJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVhZWklkRnJvbVNvdXJjZU9wdGlvbnMob3B0aW9uczogV01UU0RhdGFTb3VyY2VPcHRpb25zKSB7XHJcbiAgY29uc3QgY2hhaW4gPSAneHl6JyArIG9wdGlvbnMudXJsO1xyXG4gIHJldHVybiBNZDUuaGFzaFN0cihjaGFpbikgYXMgc3RyaW5nO1xyXG59XHJcblxyXG4vKipcclxuICogR2VuZXJhdGUgYSBpZCBmcm9tIGZlYXR1cmUgZGF0YSBzb3VyY2Ugb3B0aW9uc1xyXG4gKiBAcGFyYW0gb3B0aW9ucyBYWVogZGF0YSBzb3VyY2Ugb3B0aW9uc1xyXG4gKiBAcmV0dXJucyBBIG1kNSBoYXNoIG9mIHRoZSB0aGUgdXJsIGFuZCBsYXllclxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlRmVhdHVyZUlkRnJvbVNvdXJjZU9wdGlvbnMob3B0aW9uczogV01UU0RhdGFTb3VyY2VPcHRpb25zKSB7XHJcbiAgaWYgKCEgb3B0aW9ucy51cmwpIHsgcmV0dXJuIGdlbmVyYXRlSWQob3B0aW9ucyk7IH1cclxuICBjb25zdCBjaGFpbiA9ICdmZWF0dXJlJyArIG9wdGlvbnMudXJsO1xyXG4gIHJldHVybiBNZDUuaGFzaFN0cihjaGFpbikgYXMgc3RyaW5nO1xyXG59XHJcblxyXG4vKipcclxuICogR2VuZXJhdGUgYSB1bmlxdWUgaWRcclxuICogQHJldHVybnMgQSB1dWlkXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVJZChvcHRpb25zOiBBbnlEYXRhU291cmNlT3B0aW9ucykge1xyXG4gIHJldHVybiB1dWlkKCk7XHJcbn1cclxuIl19