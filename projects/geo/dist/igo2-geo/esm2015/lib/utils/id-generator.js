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
    const generators = {
        wms: generateWMSIdFromSourceOptions,
        wmts: generateWMTSIdFromSourceOptions,
        xyz: generateXYZIdFromSourceOptions,
        feature: generateFeatureIdFromSourceOptions,
        osm: (/**
         * @param {?} _options
         * @return {?}
         */
        (_options) => 'OSM')
    };
    /** @type {?} */
    const generator = generators[options.type] || generateId;
    return generator(options);
}
/**
 * Generate a id from WMS data source options
 * @param {?} options WMS data source options
 * @return {?} A md5 hash of the the url and layers
 */
export function generateWMSIdFromSourceOptions(options) {
    /** @type {?} */
    const layers = options.params.LAYERS;
    /** @type {?} */
    const url = options.url.charAt(0) === '/' ? window.location.origin + options.url : options.url;
    /** @type {?} */
    const chain = 'wms' + url + layers;
    return (/** @type {?} */ (Md5.hashStr(chain)));
}
/**
 * Generate a id from WMTS data source options
 * @param {?} options WMTS data source options
 * @return {?} A md5 hash of the the url and layer
 */
export function generateWMTSIdFromSourceOptions(options) {
    /** @type {?} */
    const layer = options.layer;
    /** @type {?} */
    const chain = 'wmts' + options.url + layer;
    return (/** @type {?} */ (Md5.hashStr(chain)));
}
/**
 * Generate a id from XYZ data source options
 * @param {?} options XYZ data source options
 * @return {?} A md5 hash of the the url and layer
 */
export function generateXYZIdFromSourceOptions(options) {
    /** @type {?} */
    const chain = 'xyz' + options.url;
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
    const chain = 'feature' + options.url;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWQtZ2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3V0aWxzL2lkLWdlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUU3QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7Ozs7QUFZbkMsTUFBTSxVQUFVLDJCQUEyQixDQUFDLE9BQTBCOztVQUM5RCxVQUFVLEdBQUc7UUFDakIsR0FBRyxFQUFFLDhCQUE4QjtRQUNuQyxJQUFJLEVBQUUsK0JBQStCO1FBQ3JDLEdBQUcsRUFBRSw4QkFBOEI7UUFDbkMsT0FBTyxFQUFFLGtDQUFrQztRQUMzQyxHQUFHOzs7O1FBQUUsQ0FBQyxRQUE4QixFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUE7S0FDL0M7O1VBQ0ssU0FBUyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVTtJQUN4RCxPQUFPLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM1QixDQUFDOzs7Ozs7QUFPRCxNQUFNLFVBQVUsOEJBQThCLENBQUMsT0FBNkI7O1VBQ3BFLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU07O1VBQzlCLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHOztVQUN4RixLQUFLLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxNQUFNO0lBQ2xDLE9BQU8sbUJBQUEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBVSxDQUFDO0FBQ3RDLENBQUM7Ozs7OztBQU9ELE1BQU0sVUFBVSwrQkFBK0IsQ0FBQyxPQUE4Qjs7VUFDdEUsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLOztVQUNyQixLQUFLLEdBQUcsTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEdBQUcsS0FBSztJQUMxQyxPQUFPLG1CQUFBLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQVUsQ0FBQztBQUN0QyxDQUFDOzs7Ozs7QUFPRCxNQUFNLFVBQVUsOEJBQThCLENBQUMsT0FBOEI7O1VBQ3JFLEtBQUssR0FBRyxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUc7SUFDakMsT0FBTyxtQkFBQSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFVLENBQUM7QUFDdEMsQ0FBQzs7Ozs7O0FBT0QsTUFBTSxVQUFVLGtDQUFrQyxDQUFDLE9BQThCO0lBQy9FLElBQUksQ0FBRSxPQUFPLENBQUMsR0FBRyxFQUFFO1FBQUUsT0FBTyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7S0FBRTs7VUFDNUMsS0FBSyxHQUFHLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRztJQUNyQyxPQUFPLG1CQUFBLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQVUsQ0FBQztBQUN0QyxDQUFDOzs7Ozs7QUFNRCxNQUFNLFVBQVUsVUFBVSxDQUFDLE9BQTZCO0lBQ3RELE9BQU8sSUFBSSxFQUFFLENBQUM7QUFDaEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1kNSB9IGZyb20gJ3RzLW1kNSc7XHJcblxyXG5pbXBvcnQgeyB1dWlkIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgQW55RGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9hbnktZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2RhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgV01TRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy93bXMtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBXTVRTRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy93bXRzLWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZSBhIGlkIGZyb20gaXQncyBkYXRhc291cmNlIG9wdGlvbnMuXHJcbiAqIEBwYXJhbSBvcHRpb25zIERhdGEgc291cmNlIG9wdGlvbnNcclxuICogQHJldHVybnMgQSBpZFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlSWRGcm9tU291cmNlT3B0aW9ucyhvcHRpb25zOiBEYXRhU291cmNlT3B0aW9ucyk6IHN0cmluZyB7XHJcbiAgY29uc3QgZ2VuZXJhdG9ycyA9IHtcclxuICAgIHdtczogZ2VuZXJhdGVXTVNJZEZyb21Tb3VyY2VPcHRpb25zLFxyXG4gICAgd210czogZ2VuZXJhdGVXTVRTSWRGcm9tU291cmNlT3B0aW9ucyxcclxuICAgIHh5ejogZ2VuZXJhdGVYWVpJZEZyb21Tb3VyY2VPcHRpb25zLFxyXG4gICAgZmVhdHVyZTogZ2VuZXJhdGVGZWF0dXJlSWRGcm9tU291cmNlT3B0aW9ucyxcclxuICAgIG9zbTogKF9vcHRpb25zOiBBbnlEYXRhU291cmNlT3B0aW9ucykgPT4gJ09TTSdcclxuICB9O1xyXG4gIGNvbnN0IGdlbmVyYXRvciA9IGdlbmVyYXRvcnNbb3B0aW9ucy50eXBlXSB8fCBnZW5lcmF0ZUlkO1xyXG4gIHJldHVybiBnZW5lcmF0b3Iob3B0aW9ucyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZSBhIGlkIGZyb20gV01TIGRhdGEgc291cmNlIG9wdGlvbnNcclxuICogQHBhcmFtIG9wdGlvbnMgV01TIGRhdGEgc291cmNlIG9wdGlvbnNcclxuICogQHJldHVybnMgQSBtZDUgaGFzaCBvZiB0aGUgdGhlIHVybCBhbmQgbGF5ZXJzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVXTVNJZEZyb21Tb3VyY2VPcHRpb25zKG9wdGlvbnM6IFdNU0RhdGFTb3VyY2VPcHRpb25zKSB7XHJcbiAgY29uc3QgbGF5ZXJzID0gb3B0aW9ucy5wYXJhbXMuTEFZRVJTO1xyXG4gIGNvbnN0IHVybCA9IG9wdGlvbnMudXJsLmNoYXJBdCgwKSA9PT0gJy8nID8gd2luZG93LmxvY2F0aW9uLm9yaWdpbiArIG9wdGlvbnMudXJsIDogb3B0aW9ucy51cmw7XHJcbiAgY29uc3QgY2hhaW4gPSAnd21zJyArIHVybCArIGxheWVycztcclxuICByZXR1cm4gTWQ1Lmhhc2hTdHIoY2hhaW4pIGFzIHN0cmluZztcclxufVxyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlIGEgaWQgZnJvbSBXTVRTIGRhdGEgc291cmNlIG9wdGlvbnNcclxuICogQHBhcmFtIG9wdGlvbnMgV01UUyBkYXRhIHNvdXJjZSBvcHRpb25zXHJcbiAqIEByZXR1cm5zIEEgbWQ1IGhhc2ggb2YgdGhlIHRoZSB1cmwgYW5kIGxheWVyXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVXTVRTSWRGcm9tU291cmNlT3B0aW9ucyhvcHRpb25zOiBXTVRTRGF0YVNvdXJjZU9wdGlvbnMpIHtcclxuICBjb25zdCBsYXllciA9IG9wdGlvbnMubGF5ZXI7XHJcbiAgY29uc3QgY2hhaW4gPSAnd210cycgKyBvcHRpb25zLnVybCArIGxheWVyO1xyXG4gIHJldHVybiBNZDUuaGFzaFN0cihjaGFpbikgYXMgc3RyaW5nO1xyXG59XHJcblxyXG4vKipcclxuICogR2VuZXJhdGUgYSBpZCBmcm9tIFhZWiBkYXRhIHNvdXJjZSBvcHRpb25zXHJcbiAqIEBwYXJhbSBvcHRpb25zIFhZWiBkYXRhIHNvdXJjZSBvcHRpb25zXHJcbiAqIEByZXR1cm5zIEEgbWQ1IGhhc2ggb2YgdGhlIHRoZSB1cmwgYW5kIGxheWVyXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVYWVpJZEZyb21Tb3VyY2VPcHRpb25zKG9wdGlvbnM6IFdNVFNEYXRhU291cmNlT3B0aW9ucykge1xyXG4gIGNvbnN0IGNoYWluID0gJ3h5eicgKyBvcHRpb25zLnVybDtcclxuICByZXR1cm4gTWQ1Lmhhc2hTdHIoY2hhaW4pIGFzIHN0cmluZztcclxufVxyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlIGEgaWQgZnJvbSBmZWF0dXJlIGRhdGEgc291cmNlIG9wdGlvbnNcclxuICogQHBhcmFtIG9wdGlvbnMgWFlaIGRhdGEgc291cmNlIG9wdGlvbnNcclxuICogQHJldHVybnMgQSBtZDUgaGFzaCBvZiB0aGUgdGhlIHVybCBhbmQgbGF5ZXJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUZlYXR1cmVJZEZyb21Tb3VyY2VPcHRpb25zKG9wdGlvbnM6IFdNVFNEYXRhU291cmNlT3B0aW9ucykge1xyXG4gIGlmICghIG9wdGlvbnMudXJsKSB7IHJldHVybiBnZW5lcmF0ZUlkKG9wdGlvbnMpOyB9XHJcbiAgY29uc3QgY2hhaW4gPSAnZmVhdHVyZScgKyBvcHRpb25zLnVybDtcclxuICByZXR1cm4gTWQ1Lmhhc2hTdHIoY2hhaW4pIGFzIHN0cmluZztcclxufVxyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlIGEgdW5pcXVlIGlkXHJcbiAqIEByZXR1cm5zIEEgdXVpZFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlSWQob3B0aW9uczogQW55RGF0YVNvdXJjZU9wdGlvbnMpIHtcclxuICByZXR1cm4gdXVpZCgpO1xyXG59XHJcbiJdfQ==