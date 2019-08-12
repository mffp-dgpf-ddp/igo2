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
        source: source,
        data: feature,
        meta: {
            dataType: FEATURE,
            id: (/** @type {?} */ (feature.meta.id)),
            title: feature.meta.title,
            icon: 'map-marker'
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zaGFyZWQvc2VhcmNoLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7Ozs7OztBQVU3RCxNQUFNLFVBQVUsZUFBZSxDQUFDLE1BQW9CO0lBQ2xELE9BQU8sQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUM7QUFDOUMsQ0FBQzs7Ozs7O0FBT0QsTUFBTSxVQUFVLHNCQUFzQixDQUFDLE1BQW9CO0lBQ3pELE9BQU8sQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLGFBQWEsS0FBSyxTQUFTLENBQUM7QUFDckQsQ0FBQzs7Ozs7Ozs7QUFTRCxNQUFNLFVBQVUscUJBQXFCLENBQ25DLE9BQWdCLEVBQ2hCLE1BQW9CO0lBRXBCLE9BQU87UUFDTCxNQUFNLFFBQUE7UUFDTixJQUFJLEVBQUUsT0FBTztRQUNiLElBQUksRUFBRTtZQUNKLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLEVBQUUsRUFBRSxtQkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBVTtZQUM3QixLQUFLLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLO1lBQ3pCLElBQUksRUFBRSxZQUFZO1NBQ25CO0tBQ0YsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGRUFUVVJFIH0gZnJvbSAnLi4vLi4vZmVhdHVyZS9zaGFyZWQvZmVhdHVyZS5lbnVtcyc7XHJcbmltcG9ydCB7IEZlYXR1cmUgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2UgfSBmcm9tICcuL3NvdXJjZXMvc291cmNlJztcclxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi9zZWFyY2guaW50ZXJmYWNlcyc7XHJcblxyXG4vKipcclxuICogRnVuY3Rpb24gdGhhdCBjaGVja3Mgd2hldGhlciBhIHNlYXJjaCBzb3VyY2UgaW1wbGVtZW50cyBUZXh0U2VhcmNoXHJcbiAqIEBwYXJhbSBzb3VyY2UgU2VhcmNoIHNvdXJjZVxyXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBzZWFyY2ggc291cmNlIGltcGxlbWVudHMgVGV4dFNlYXJjaFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNvdXJjZUNhblNlYXJjaChzb3VyY2U6IFNlYXJjaFNvdXJjZSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiAoc291cmNlIGFzIGFueSkuc2VhcmNoICE9PSB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGdW5jdGlvbiB0aGF0IGNoZWNrcyB3aGV0aGVyIGEgc2VhcmNoIHNvdXJjZSBpbXBsZW1lbnRzIFJldmVyc2VTZWFyY2hcclxuICogQHBhcmFtIHNvdXJjZSBTZWFyY2ggc291cmNlXHJcbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHNlYXJjaCBzb3VyY2UgaW1wbGVtZW50cyBSZXZlcnNlU2VhcmNoXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc291cmNlQ2FuUmV2ZXJzZVNlYXJjaChzb3VyY2U6IFNlYXJjaFNvdXJjZSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiAoc291cmNlIGFzIGFueSkucmV2ZXJzZVNlYXJjaCAhPT0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJuIGEgc2VhcmNoIHJlc3VsdCBvdXQgb2YgYW4gRmVhdHVyZS4gVGhpcyBpcyB1c2VkIHRvIGFkYXB0XHJcbiAqIHRoZSBJR08gcXVlcnkgbW9kdWxlIHRvIHRoZSBuZXcgRmVhdHVyZS9TZWFyY2hSZXN1bHQgaW50ZXJmYWNlc1xyXG4gKiBAcGFyYW0gZmVhdHVyZSBmZWF0dXJlXHJcbiAqIEBwYXJhbSBzb3VyY2UgU2VhcmNoIHNvdXJjZVxyXG4gKiBAcmV0dXJucyBTZWFyY2hSZXN1bHRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmZWF0dXJlVG9TZWFyY2hSZXN1bHQoXHJcbiAgZmVhdHVyZTogRmVhdHVyZSxcclxuICBzb3VyY2U6IFNlYXJjaFNvdXJjZVxyXG4pOiBTZWFyY2hSZXN1bHQ8RmVhdHVyZT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBzb3VyY2UsXHJcbiAgICBkYXRhOiBmZWF0dXJlLFxyXG4gICAgbWV0YToge1xyXG4gICAgICBkYXRhVHlwZTogRkVBVFVSRSxcclxuICAgICAgaWQ6IGZlYXR1cmUubWV0YS5pZCBhcyBzdHJpbmcsXHJcbiAgICAgIHRpdGxlOiBmZWF0dXJlLm1ldGEudGl0bGUsXHJcbiAgICAgIGljb246ICdtYXAtbWFya2VyJ1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuIl19