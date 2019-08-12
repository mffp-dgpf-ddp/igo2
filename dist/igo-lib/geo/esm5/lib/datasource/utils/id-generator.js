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
    var layers = options.params.layers;
    /** @type {?} */
    var chain = 'wms' + options.url + layers;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWQtZ2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2RhdGFzb3VyY2UvdXRpbHMvaWQtZ2VuZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRTdCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxhQUFhLENBQUM7Ozs7OztBQVluQyxNQUFNLFVBQVUsMkJBQTJCLENBQUMsT0FBMEI7O1FBQzlELFVBQVUsR0FBRztRQUNqQixHQUFHLEVBQUUsOEJBQThCO1FBQ25DLElBQUksRUFBRSwrQkFBK0I7UUFDckMsR0FBRyxFQUFFLDhCQUE4QjtRQUNuQyxPQUFPLEVBQUUsa0NBQWtDO1FBQzNDLEdBQUc7Ozs7UUFBRSxVQUFDLFFBQThCLElBQUssT0FBQSxLQUFLLEVBQUwsQ0FBSyxDQUFBO0tBQy9DOztRQUNLLFNBQVMsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVU7SUFDeEQsT0FBTyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDNUIsQ0FBQzs7Ozs7O0FBT0QsTUFBTSxVQUFVLDhCQUE4QixDQUFDLE9BQTZCOztRQUNwRSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNOztRQUM5QixLQUFLLEdBQUcsS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEdBQUcsTUFBTTtJQUMxQyxPQUFPLG1CQUFBLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQVUsQ0FBQztBQUN0QyxDQUFDOzs7Ozs7QUFPRCxNQUFNLFVBQVUsK0JBQStCLENBQUMsT0FBOEI7O1FBQ3RFLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSzs7UUFDckIsS0FBSyxHQUFHLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxHQUFHLEtBQUs7SUFDMUMsT0FBTyxtQkFBQSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFVLENBQUM7QUFDdEMsQ0FBQzs7Ozs7O0FBT0QsTUFBTSxVQUFVLDhCQUE4QixDQUFDLE9BQThCOztRQUNyRSxLQUFLLEdBQUcsS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHO0lBQ2pDLE9BQU8sbUJBQUEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBVSxDQUFDO0FBQ3RDLENBQUM7Ozs7OztBQU9ELE1BQU0sVUFBVSxrQ0FBa0MsQ0FBQyxPQUE4QjtJQUMvRSxJQUFJLENBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRTtRQUFFLE9BQU8sVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQUU7O1FBQzVDLEtBQUssR0FBRyxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUc7SUFDckMsT0FBTyxtQkFBQSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFVLENBQUM7QUFDdEMsQ0FBQzs7Ozs7O0FBTUQsTUFBTSxVQUFVLFVBQVUsQ0FBQyxPQUE2QjtJQUN0RCxPQUFPLElBQUksRUFBRSxDQUFDO0FBQ2hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZDUgfSBmcm9tICd0cy1tZDUnO1xyXG5cclxuaW1wb3J0IHsgdXVpZCB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7IEFueURhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vc2hhcmVkL2RhdGFzb3VyY2VzL2FueS1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IERhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vc2hhcmVkL2RhdGFzb3VyY2VzL2RhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgV01TRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi9zaGFyZWQvZGF0YXNvdXJjZXMvd21zLWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgV01UU0RhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vc2hhcmVkL2RhdGFzb3VyY2VzL3dtdHMtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlIGEgaWQgZnJvbSBpdCdzIGRhdGFzb3VyY2Ugb3B0aW9ucy5cclxuICogQHBhcmFtIG9wdGlvbnMgRGF0YSBzb3VyY2Ugb3B0aW9uc1xyXG4gKiBAcmV0dXJucyBBIGlkXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVJZEZyb21Tb3VyY2VPcHRpb25zKG9wdGlvbnM6IERhdGFTb3VyY2VPcHRpb25zKTogc3RyaW5nIHtcclxuICBjb25zdCBnZW5lcmF0b3JzID0ge1xyXG4gICAgd21zOiBnZW5lcmF0ZVdNU0lkRnJvbVNvdXJjZU9wdGlvbnMsXHJcbiAgICB3bXRzOiBnZW5lcmF0ZVdNVFNJZEZyb21Tb3VyY2VPcHRpb25zLFxyXG4gICAgeHl6OiBnZW5lcmF0ZVhZWklkRnJvbVNvdXJjZU9wdGlvbnMsXHJcbiAgICBmZWF0dXJlOiBnZW5lcmF0ZUZlYXR1cmVJZEZyb21Tb3VyY2VPcHRpb25zLFxyXG4gICAgb3NtOiAoX29wdGlvbnM6IEFueURhdGFTb3VyY2VPcHRpb25zKSA9PiAnT1NNJ1xyXG4gIH07XHJcbiAgY29uc3QgZ2VuZXJhdG9yID0gZ2VuZXJhdG9yc1tvcHRpb25zLnR5cGVdIHx8IGdlbmVyYXRlSWQ7XHJcbiAgcmV0dXJuIGdlbmVyYXRvcihvcHRpb25zKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlIGEgaWQgZnJvbSBXTVMgZGF0YSBzb3VyY2Ugb3B0aW9uc1xyXG4gKiBAcGFyYW0gb3B0aW9ucyBXTVMgZGF0YSBzb3VyY2Ugb3B0aW9uc1xyXG4gKiBAcmV0dXJucyBBIG1kNSBoYXNoIG9mIHRoZSB0aGUgdXJsIGFuZCBsYXllcnNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVdNU0lkRnJvbVNvdXJjZU9wdGlvbnMob3B0aW9uczogV01TRGF0YVNvdXJjZU9wdGlvbnMpIHtcclxuICBjb25zdCBsYXllcnMgPSBvcHRpb25zLnBhcmFtcy5sYXllcnM7XHJcbiAgY29uc3QgY2hhaW4gPSAnd21zJyArIG9wdGlvbnMudXJsICsgbGF5ZXJzO1xyXG4gIHJldHVybiBNZDUuaGFzaFN0cihjaGFpbikgYXMgc3RyaW5nO1xyXG59XHJcblxyXG4vKipcclxuICogR2VuZXJhdGUgYSBpZCBmcm9tIFdNVFMgZGF0YSBzb3VyY2Ugb3B0aW9uc1xyXG4gKiBAcGFyYW0gb3B0aW9ucyBXTVRTIGRhdGEgc291cmNlIG9wdGlvbnNcclxuICogQHJldHVybnMgQSBtZDUgaGFzaCBvZiB0aGUgdGhlIHVybCBhbmQgbGF5ZXJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVdNVFNJZEZyb21Tb3VyY2VPcHRpb25zKG9wdGlvbnM6IFdNVFNEYXRhU291cmNlT3B0aW9ucykge1xyXG4gIGNvbnN0IGxheWVyID0gb3B0aW9ucy5sYXllcjtcclxuICBjb25zdCBjaGFpbiA9ICd3bXRzJyArIG9wdGlvbnMudXJsICsgbGF5ZXI7XHJcbiAgcmV0dXJuIE1kNS5oYXNoU3RyKGNoYWluKSBhcyBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZSBhIGlkIGZyb20gWFlaIGRhdGEgc291cmNlIG9wdGlvbnNcclxuICogQHBhcmFtIG9wdGlvbnMgWFlaIGRhdGEgc291cmNlIG9wdGlvbnNcclxuICogQHJldHVybnMgQSBtZDUgaGFzaCBvZiB0aGUgdGhlIHVybCBhbmQgbGF5ZXJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVhZWklkRnJvbVNvdXJjZU9wdGlvbnMob3B0aW9uczogV01UU0RhdGFTb3VyY2VPcHRpb25zKSB7XHJcbiAgY29uc3QgY2hhaW4gPSAneHl6JyArIG9wdGlvbnMudXJsO1xyXG4gIHJldHVybiBNZDUuaGFzaFN0cihjaGFpbikgYXMgc3RyaW5nO1xyXG59XHJcblxyXG4vKipcclxuICogR2VuZXJhdGUgYSBpZCBmcm9tIGZlYXR1cmUgZGF0YSBzb3VyY2Ugb3B0aW9uc1xyXG4gKiBAcGFyYW0gb3B0aW9ucyBYWVogZGF0YSBzb3VyY2Ugb3B0aW9uc1xyXG4gKiBAcmV0dXJucyBBIG1kNSBoYXNoIG9mIHRoZSB0aGUgdXJsIGFuZCBsYXllclxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlRmVhdHVyZUlkRnJvbVNvdXJjZU9wdGlvbnMob3B0aW9uczogV01UU0RhdGFTb3VyY2VPcHRpb25zKSB7XHJcbiAgaWYgKCEgb3B0aW9ucy51cmwpIHsgcmV0dXJuIGdlbmVyYXRlSWQob3B0aW9ucyk7IH1cclxuICBjb25zdCBjaGFpbiA9ICdmZWF0dXJlJyArIG9wdGlvbnMudXJsO1xyXG4gIHJldHVybiBNZDUuaGFzaFN0cihjaGFpbikgYXMgc3RyaW5nO1xyXG59XHJcblxyXG4vKipcclxuICogR2VuZXJhdGUgYSB1bmlxdWUgaWRcclxuICogQHJldHVybnMgQSB1dWlkXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVJZChvcHRpb25zOiBBbnlEYXRhU291cmNlT3B0aW9ucykge1xyXG4gIHJldHVybiB1dWlkKCk7XHJcbn1cclxuIl19