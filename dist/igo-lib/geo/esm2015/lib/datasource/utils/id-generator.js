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
    const layers = options.params.layers;
    /** @type {?} */
    const chain = 'wms' + options.url + layers;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWQtZ2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2RhdGFzb3VyY2UvdXRpbHMvaWQtZ2VuZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRTdCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxhQUFhLENBQUM7Ozs7OztBQVluQyxNQUFNLFVBQVUsMkJBQTJCLENBQUMsT0FBMEI7O1VBQzlELFVBQVUsR0FBRztRQUNqQixHQUFHLEVBQUUsOEJBQThCO1FBQ25DLElBQUksRUFBRSwrQkFBK0I7UUFDckMsR0FBRyxFQUFFLDhCQUE4QjtRQUNuQyxPQUFPLEVBQUUsa0NBQWtDO1FBQzNDLEdBQUc7Ozs7UUFBRSxDQUFDLFFBQThCLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQTtLQUMvQzs7VUFDSyxTQUFTLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVO0lBQ3hELE9BQU8sU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzVCLENBQUM7Ozs7OztBQU9ELE1BQU0sVUFBVSw4QkFBOEIsQ0FBQyxPQUE2Qjs7VUFDcEUsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTTs7VUFDOUIsS0FBSyxHQUFHLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxHQUFHLE1BQU07SUFDMUMsT0FBTyxtQkFBQSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFVLENBQUM7QUFDdEMsQ0FBQzs7Ozs7O0FBT0QsTUFBTSxVQUFVLCtCQUErQixDQUFDLE9BQThCOztVQUN0RSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUs7O1VBQ3JCLEtBQUssR0FBRyxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsR0FBRyxLQUFLO0lBQzFDLE9BQU8sbUJBQUEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBVSxDQUFDO0FBQ3RDLENBQUM7Ozs7OztBQU9ELE1BQU0sVUFBVSw4QkFBOEIsQ0FBQyxPQUE4Qjs7VUFDckUsS0FBSyxHQUFHLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRztJQUNqQyxPQUFPLG1CQUFBLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQVUsQ0FBQztBQUN0QyxDQUFDOzs7Ozs7QUFPRCxNQUFNLFVBQVUsa0NBQWtDLENBQUMsT0FBOEI7SUFDL0UsSUFBSSxDQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUU7UUFBRSxPQUFPLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUFFOztVQUM1QyxLQUFLLEdBQUcsU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHO0lBQ3JDLE9BQU8sbUJBQUEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBVSxDQUFDO0FBQ3RDLENBQUM7Ozs7OztBQU1ELE1BQU0sVUFBVSxVQUFVLENBQUMsT0FBNkI7SUFDdEQsT0FBTyxJQUFJLEVBQUUsQ0FBQztBQUNoQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWQ1IH0gZnJvbSAndHMtbWQ1JztcclxuXHJcbmltcG9ydCB7IHV1aWQgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQgeyBBbnlEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4uL3NoYXJlZC9kYXRhc291cmNlcy9hbnktZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4uL3NoYXJlZC9kYXRhc291cmNlcy9kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFdNU0RhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vc2hhcmVkL2RhdGFzb3VyY2VzL3dtcy1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFdNVFNEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4uL3NoYXJlZC9kYXRhc291cmNlcy93bXRzLWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZSBhIGlkIGZyb20gaXQncyBkYXRhc291cmNlIG9wdGlvbnMuXHJcbiAqIEBwYXJhbSBvcHRpb25zIERhdGEgc291cmNlIG9wdGlvbnNcclxuICogQHJldHVybnMgQSBpZFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlSWRGcm9tU291cmNlT3B0aW9ucyhvcHRpb25zOiBEYXRhU291cmNlT3B0aW9ucyk6IHN0cmluZyB7XHJcbiAgY29uc3QgZ2VuZXJhdG9ycyA9IHtcclxuICAgIHdtczogZ2VuZXJhdGVXTVNJZEZyb21Tb3VyY2VPcHRpb25zLFxyXG4gICAgd210czogZ2VuZXJhdGVXTVRTSWRGcm9tU291cmNlT3B0aW9ucyxcclxuICAgIHh5ejogZ2VuZXJhdGVYWVpJZEZyb21Tb3VyY2VPcHRpb25zLFxyXG4gICAgZmVhdHVyZTogZ2VuZXJhdGVGZWF0dXJlSWRGcm9tU291cmNlT3B0aW9ucyxcclxuICAgIG9zbTogKF9vcHRpb25zOiBBbnlEYXRhU291cmNlT3B0aW9ucykgPT4gJ09TTSdcclxuICB9O1xyXG4gIGNvbnN0IGdlbmVyYXRvciA9IGdlbmVyYXRvcnNbb3B0aW9ucy50eXBlXSB8fCBnZW5lcmF0ZUlkO1xyXG4gIHJldHVybiBnZW5lcmF0b3Iob3B0aW9ucyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZSBhIGlkIGZyb20gV01TIGRhdGEgc291cmNlIG9wdGlvbnNcclxuICogQHBhcmFtIG9wdGlvbnMgV01TIGRhdGEgc291cmNlIG9wdGlvbnNcclxuICogQHJldHVybnMgQSBtZDUgaGFzaCBvZiB0aGUgdGhlIHVybCBhbmQgbGF5ZXJzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVXTVNJZEZyb21Tb3VyY2VPcHRpb25zKG9wdGlvbnM6IFdNU0RhdGFTb3VyY2VPcHRpb25zKSB7XHJcbiAgY29uc3QgbGF5ZXJzID0gb3B0aW9ucy5wYXJhbXMubGF5ZXJzO1xyXG4gIGNvbnN0IGNoYWluID0gJ3dtcycgKyBvcHRpb25zLnVybCArIGxheWVycztcclxuICByZXR1cm4gTWQ1Lmhhc2hTdHIoY2hhaW4pIGFzIHN0cmluZztcclxufVxyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlIGEgaWQgZnJvbSBXTVRTIGRhdGEgc291cmNlIG9wdGlvbnNcclxuICogQHBhcmFtIG9wdGlvbnMgV01UUyBkYXRhIHNvdXJjZSBvcHRpb25zXHJcbiAqIEByZXR1cm5zIEEgbWQ1IGhhc2ggb2YgdGhlIHRoZSB1cmwgYW5kIGxheWVyXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVXTVRTSWRGcm9tU291cmNlT3B0aW9ucyhvcHRpb25zOiBXTVRTRGF0YVNvdXJjZU9wdGlvbnMpIHtcclxuICBjb25zdCBsYXllciA9IG9wdGlvbnMubGF5ZXI7XHJcbiAgY29uc3QgY2hhaW4gPSAnd210cycgKyBvcHRpb25zLnVybCArIGxheWVyO1xyXG4gIHJldHVybiBNZDUuaGFzaFN0cihjaGFpbikgYXMgc3RyaW5nO1xyXG59XHJcblxyXG4vKipcclxuICogR2VuZXJhdGUgYSBpZCBmcm9tIFhZWiBkYXRhIHNvdXJjZSBvcHRpb25zXHJcbiAqIEBwYXJhbSBvcHRpb25zIFhZWiBkYXRhIHNvdXJjZSBvcHRpb25zXHJcbiAqIEByZXR1cm5zIEEgbWQ1IGhhc2ggb2YgdGhlIHRoZSB1cmwgYW5kIGxheWVyXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVYWVpJZEZyb21Tb3VyY2VPcHRpb25zKG9wdGlvbnM6IFdNVFNEYXRhU291cmNlT3B0aW9ucykge1xyXG4gIGNvbnN0IGNoYWluID0gJ3h5eicgKyBvcHRpb25zLnVybDtcclxuICByZXR1cm4gTWQ1Lmhhc2hTdHIoY2hhaW4pIGFzIHN0cmluZztcclxufVxyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlIGEgaWQgZnJvbSBmZWF0dXJlIGRhdGEgc291cmNlIG9wdGlvbnNcclxuICogQHBhcmFtIG9wdGlvbnMgWFlaIGRhdGEgc291cmNlIG9wdGlvbnNcclxuICogQHJldHVybnMgQSBtZDUgaGFzaCBvZiB0aGUgdGhlIHVybCBhbmQgbGF5ZXJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUZlYXR1cmVJZEZyb21Tb3VyY2VPcHRpb25zKG9wdGlvbnM6IFdNVFNEYXRhU291cmNlT3B0aW9ucykge1xyXG4gIGlmICghIG9wdGlvbnMudXJsKSB7IHJldHVybiBnZW5lcmF0ZUlkKG9wdGlvbnMpOyB9XHJcbiAgY29uc3QgY2hhaW4gPSAnZmVhdHVyZScgKyBvcHRpb25zLnVybDtcclxuICByZXR1cm4gTWQ1Lmhhc2hTdHIoY2hhaW4pIGFzIHN0cmluZztcclxufVxyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlIGEgdW5pcXVlIGlkXHJcbiAqIEByZXR1cm5zIEEgdXVpZFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlSWQob3B0aW9uczogQW55RGF0YVNvdXJjZU9wdGlvbnMpIHtcclxuICByZXR1cm4gdXVpZCgpO1xyXG59XHJcbiJdfQ==