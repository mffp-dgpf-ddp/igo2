/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FEATURE } from '../../feature/shared/feature.enums';
/**
 * Function that checks whether a search source implements TextSearch
 * @param {?} source Search source
 * @return {?} True if the search source implements TextSearch
 */
export function sourceCanSearch(source) {
    return ((/** @type {?} */ (source))).search !== undefined;
}
/**
 * Function that checks whether a search source implements ReverseSearch
 * @param {?} source Search source
 * @return {?} True if the search source implements ReverseSearch
 */
export function sourceCanReverseSearch(source) {
    return ((/** @type {?} */ (source))).reverseSearch !== undefined;
}
/**
 * Return a search result out of an Feature. This is used to adapt
 * the IGO query module to the new Feature/SearchResult interfaces
 * @param {?} feature feature
 * @param {?} source Search source
 * @return {?} SearchResult
 */
export function featureToSearchResult(feature, source) {
    return {
        source,
        data: feature,
        meta: {
            dataType: FEATURE,
            id: (/** @type {?} */ (feature.meta.id)),
            title: feature.meta.title,
            icon: 'map-marker'
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zaGFyZWQvc2VhcmNoLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7Ozs7OztBQVU3RCxNQUFNLFVBQVUsZUFBZSxDQUFDLE1BQW9CO0lBQ2xELE9BQU8sQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUM7QUFDOUMsQ0FBQzs7Ozs7O0FBT0QsTUFBTSxVQUFVLHNCQUFzQixDQUFDLE1BQW9CO0lBQ3pELE9BQU8sQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLGFBQWEsS0FBSyxTQUFTLENBQUM7QUFDckQsQ0FBQzs7Ozs7Ozs7QUFTRCxNQUFNLFVBQVUscUJBQXFCLENBQ25DLE9BQWdCLEVBQ2hCLE1BQW9CO0lBRXBCLE9BQU87UUFDTCxNQUFNO1FBQ04sSUFBSSxFQUFFLE9BQU87UUFDYixJQUFJLEVBQUU7WUFDSixRQUFRLEVBQUUsT0FBTztZQUNqQixFQUFFLEVBQUUsbUJBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQVU7WUFDN0IsS0FBSyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSztZQUN6QixJQUFJLEVBQUUsWUFBWTtTQUNuQjtLQUNGLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRkVBVFVSRSB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUuZW51bXMnO1xyXG5pbXBvcnQgeyBGZWF0dXJlIH0gZnJvbSAnLi4vLi4vZmVhdHVyZS9zaGFyZWQvZmVhdHVyZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgU2VhcmNoU291cmNlIH0gZnJvbSAnLi9zb3VyY2VzL3NvdXJjZSc7XHJcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCB9IGZyb20gJy4vc2VhcmNoLmludGVyZmFjZXMnO1xyXG5cclxuLyoqXHJcbiAqIEZ1bmN0aW9uIHRoYXQgY2hlY2tzIHdoZXRoZXIgYSBzZWFyY2ggc291cmNlIGltcGxlbWVudHMgVGV4dFNlYXJjaFxyXG4gKiBAcGFyYW0gc291cmNlIFNlYXJjaCBzb3VyY2VcclxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgc2VhcmNoIHNvdXJjZSBpbXBsZW1lbnRzIFRleHRTZWFyY2hcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzb3VyY2VDYW5TZWFyY2goc291cmNlOiBTZWFyY2hTb3VyY2UpOiBib29sZWFuIHtcclxuICByZXR1cm4gKHNvdXJjZSBhcyBhbnkpLnNlYXJjaCAhPT0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG4vKipcclxuICogRnVuY3Rpb24gdGhhdCBjaGVja3Mgd2hldGhlciBhIHNlYXJjaCBzb3VyY2UgaW1wbGVtZW50cyBSZXZlcnNlU2VhcmNoXHJcbiAqIEBwYXJhbSBzb3VyY2UgU2VhcmNoIHNvdXJjZVxyXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBzZWFyY2ggc291cmNlIGltcGxlbWVudHMgUmV2ZXJzZVNlYXJjaFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNvdXJjZUNhblJldmVyc2VTZWFyY2goc291cmNlOiBTZWFyY2hTb3VyY2UpOiBib29sZWFuIHtcclxuICByZXR1cm4gKHNvdXJjZSBhcyBhbnkpLnJldmVyc2VTZWFyY2ggIT09IHVuZGVmaW5lZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybiBhIHNlYXJjaCByZXN1bHQgb3V0IG9mIGFuIEZlYXR1cmUuIFRoaXMgaXMgdXNlZCB0byBhZGFwdFxyXG4gKiB0aGUgSUdPIHF1ZXJ5IG1vZHVsZSB0byB0aGUgbmV3IEZlYXR1cmUvU2VhcmNoUmVzdWx0IGludGVyZmFjZXNcclxuICogQHBhcmFtIGZlYXR1cmUgZmVhdHVyZVxyXG4gKiBAcGFyYW0gc291cmNlIFNlYXJjaCBzb3VyY2VcclxuICogQHJldHVybnMgU2VhcmNoUmVzdWx0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmVhdHVyZVRvU2VhcmNoUmVzdWx0KFxyXG4gIGZlYXR1cmU6IEZlYXR1cmUsXHJcbiAgc291cmNlOiBTZWFyY2hTb3VyY2VcclxuKTogU2VhcmNoUmVzdWx0PEZlYXR1cmU+IHtcclxuICByZXR1cm4ge1xyXG4gICAgc291cmNlLFxyXG4gICAgZGF0YTogZmVhdHVyZSxcclxuICAgIG1ldGE6IHtcclxuICAgICAgZGF0YVR5cGU6IEZFQVRVUkUsXHJcbiAgICAgIGlkOiBmZWF0dXJlLm1ldGEuaWQgYXMgc3RyaW5nLFxyXG4gICAgICB0aXRsZTogZmVhdHVyZS5tZXRhLnRpdGxlLFxyXG4gICAgICBpY29uOiAnbWFwLW1hcmtlcidcclxuICAgIH1cclxuICB9O1xyXG59XHJcbiJdfQ==