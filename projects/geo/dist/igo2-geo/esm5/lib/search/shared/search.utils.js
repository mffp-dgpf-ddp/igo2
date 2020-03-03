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
 * Function that checks whether a search source implements ReverseSearch AND is shown in the pointer summary
 * @param {?} source Search source
 * @return {?} True if the search source implements ReverseSearch AND is shown in the pointer summary
 */
export function sourceCanReverseSearchAsSummary(source) {
    return ((/** @type {?} */ (source))).reverseSearch !== undefined && source.showInPointerSummary === true;
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
        source: source,
        data: feature,
        meta: {
            dataType: FEATURE,
            id: (/** @type {?} */ (feature.meta.id)),
            title: feature.meta.title,
            icon: feature.meta.icon || 'map-marker'
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zaGFyZWQvc2VhcmNoLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7Ozs7OztBQVU3RCxNQUFNLFVBQVUsZUFBZSxDQUFDLE1BQW9CO0lBQ2xELE9BQU8sQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUM7QUFDOUMsQ0FBQzs7Ozs7O0FBT0QsTUFBTSxVQUFVLHNCQUFzQixDQUFDLE1BQW9CO0lBQ3pELE9BQU8sQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLGFBQWEsS0FBSyxTQUFTLENBQUM7QUFDckQsQ0FBQzs7Ozs7O0FBT0QsTUFBTSxVQUFVLCtCQUErQixDQUFDLE1BQW9CO0lBQ2xFLE9BQU8sQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLGFBQWEsS0FBSyxTQUFTLElBQUksTUFBTSxDQUFDLG9CQUFvQixLQUFLLElBQUksQ0FBQztBQUM3RixDQUFDOzs7Ozs7OztBQVNELE1BQU0sVUFBVSxxQkFBcUIsQ0FDbkMsT0FBZ0IsRUFDaEIsTUFBb0I7SUFFcEIsT0FBTztRQUNMLE1BQU0sUUFBQTtRQUNOLElBQUksRUFBRSxPQUFPO1FBQ2IsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLE9BQU87WUFDakIsRUFBRSxFQUFFLG1CQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFVO1lBQzdCLEtBQUssRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUs7WUFDekIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLFlBQVk7U0FDeEM7S0FDRixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZFQVRVUkUgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLmVudW1zJztcclxuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZSB9IGZyb20gJy4vc291cmNlcy9zb3VyY2UnO1xyXG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQgfSBmcm9tICcuL3NlYXJjaC5pbnRlcmZhY2VzJztcclxuXHJcbi8qKlxyXG4gKiBGdW5jdGlvbiB0aGF0IGNoZWNrcyB3aGV0aGVyIGEgc2VhcmNoIHNvdXJjZSBpbXBsZW1lbnRzIFRleHRTZWFyY2hcclxuICogQHBhcmFtIHNvdXJjZSBTZWFyY2ggc291cmNlXHJcbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHNlYXJjaCBzb3VyY2UgaW1wbGVtZW50cyBUZXh0U2VhcmNoXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc291cmNlQ2FuU2VhcmNoKHNvdXJjZTogU2VhcmNoU291cmNlKTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIChzb3VyY2UgYXMgYW55KS5zZWFyY2ggIT09IHVuZGVmaW5lZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZ1bmN0aW9uIHRoYXQgY2hlY2tzIHdoZXRoZXIgYSBzZWFyY2ggc291cmNlIGltcGxlbWVudHMgUmV2ZXJzZVNlYXJjaFxyXG4gKiBAcGFyYW0gc291cmNlIFNlYXJjaCBzb3VyY2VcclxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgc2VhcmNoIHNvdXJjZSBpbXBsZW1lbnRzIFJldmVyc2VTZWFyY2hcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzb3VyY2VDYW5SZXZlcnNlU2VhcmNoKHNvdXJjZTogU2VhcmNoU291cmNlKTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIChzb3VyY2UgYXMgYW55KS5yZXZlcnNlU2VhcmNoICE9PSB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGdW5jdGlvbiB0aGF0IGNoZWNrcyB3aGV0aGVyIGEgc2VhcmNoIHNvdXJjZSBpbXBsZW1lbnRzIFJldmVyc2VTZWFyY2ggQU5EIGlzIHNob3duIGluIHRoZSBwb2ludGVyIHN1bW1hcnlcclxuICogQHBhcmFtIHNvdXJjZSBTZWFyY2ggc291cmNlXHJcbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHNlYXJjaCBzb3VyY2UgaW1wbGVtZW50cyBSZXZlcnNlU2VhcmNoIEFORCBpcyBzaG93biBpbiB0aGUgcG9pbnRlciBzdW1tYXJ5XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc291cmNlQ2FuUmV2ZXJzZVNlYXJjaEFzU3VtbWFyeShzb3VyY2U6IFNlYXJjaFNvdXJjZSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiAoc291cmNlIGFzIGFueSkucmV2ZXJzZVNlYXJjaCAhPT0gdW5kZWZpbmVkICYmIHNvdXJjZS5zaG93SW5Qb2ludGVyU3VtbWFyeSA9PT0gdHJ1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybiBhIHNlYXJjaCByZXN1bHQgb3V0IG9mIGFuIEZlYXR1cmUuIFRoaXMgaXMgdXNlZCB0byBhZGFwdFxyXG4gKiB0aGUgSUdPIHF1ZXJ5IG1vZHVsZSB0byB0aGUgbmV3IEZlYXR1cmUvU2VhcmNoUmVzdWx0IGludGVyZmFjZXNcclxuICogQHBhcmFtIGZlYXR1cmUgZmVhdHVyZVxyXG4gKiBAcGFyYW0gc291cmNlIFNlYXJjaCBzb3VyY2VcclxuICogQHJldHVybnMgU2VhcmNoUmVzdWx0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmVhdHVyZVRvU2VhcmNoUmVzdWx0KFxyXG4gIGZlYXR1cmU6IEZlYXR1cmUsXHJcbiAgc291cmNlOiBTZWFyY2hTb3VyY2VcclxuKTogU2VhcmNoUmVzdWx0PEZlYXR1cmU+IHtcclxuICByZXR1cm4ge1xyXG4gICAgc291cmNlLFxyXG4gICAgZGF0YTogZmVhdHVyZSxcclxuICAgIG1ldGE6IHtcclxuICAgICAgZGF0YVR5cGU6IEZFQVRVUkUsXHJcbiAgICAgIGlkOiBmZWF0dXJlLm1ldGEuaWQgYXMgc3RyaW5nLFxyXG4gICAgICB0aXRsZTogZmVhdHVyZS5tZXRhLnRpdGxlLFxyXG4gICAgICBpY29uOiBmZWF0dXJlLm1ldGEuaWNvbiB8fCAnbWFwLW1hcmtlcidcclxuICAgIH1cclxuICB9O1xyXG59XHJcbiJdfQ==