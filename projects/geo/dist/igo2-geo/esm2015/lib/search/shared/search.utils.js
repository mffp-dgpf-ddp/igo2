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
    feature.sourceId = source.getId();
    return {
        source,
        data: feature,
        meta: {
            dataType: FEATURE,
            id: (/** @type {?} */ (feature.meta.id)),
            title: feature.meta.title,
            icon: feature.meta.icon || 'map-marker'
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zaGFyZWQvc2VhcmNoLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7Ozs7OztBQVU3RCxNQUFNLFVBQVUsZUFBZSxDQUFDLE1BQW9CO0lBQ2xELE9BQU8sQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUM7QUFDOUMsQ0FBQzs7Ozs7O0FBT0QsTUFBTSxVQUFVLHNCQUFzQixDQUFDLE1BQW9CO0lBQ3pELE9BQU8sQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLGFBQWEsS0FBSyxTQUFTLENBQUM7QUFDckQsQ0FBQzs7Ozs7O0FBT0QsTUFBTSxVQUFVLCtCQUErQixDQUFDLE1BQW9CO0lBQ2xFLE9BQU8sQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLGFBQWEsS0FBSyxTQUFTLElBQUksTUFBTSxDQUFDLG9CQUFvQixLQUFLLElBQUksQ0FBQztBQUM3RixDQUFDOzs7Ozs7OztBQVNELE1BQU0sVUFBVSxxQkFBcUIsQ0FDbkMsT0FBZ0IsRUFDaEIsTUFBb0I7SUFFcEIsT0FBTyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDbEMsT0FBTztRQUNMLE1BQU07UUFDTixJQUFJLEVBQUUsT0FBTztRQUNiLElBQUksRUFBRTtZQUNKLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLEVBQUUsRUFBRSxtQkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBVTtZQUM3QixLQUFLLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLO1lBQ3pCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxZQUFZO1NBQ3hDO0tBQ0YsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGRUFUVVJFIH0gZnJvbSAnLi4vLi4vZmVhdHVyZS9zaGFyZWQvZmVhdHVyZS5lbnVtcyc7XHJcbmltcG9ydCB7IEZlYXR1cmUgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2UgfSBmcm9tICcuL3NvdXJjZXMvc291cmNlJztcclxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi9zZWFyY2guaW50ZXJmYWNlcyc7XHJcblxyXG4vKipcclxuICogRnVuY3Rpb24gdGhhdCBjaGVja3Mgd2hldGhlciBhIHNlYXJjaCBzb3VyY2UgaW1wbGVtZW50cyBUZXh0U2VhcmNoXHJcbiAqIEBwYXJhbSBzb3VyY2UgU2VhcmNoIHNvdXJjZVxyXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBzZWFyY2ggc291cmNlIGltcGxlbWVudHMgVGV4dFNlYXJjaFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNvdXJjZUNhblNlYXJjaChzb3VyY2U6IFNlYXJjaFNvdXJjZSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiAoc291cmNlIGFzIGFueSkuc2VhcmNoICE9PSB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGdW5jdGlvbiB0aGF0IGNoZWNrcyB3aGV0aGVyIGEgc2VhcmNoIHNvdXJjZSBpbXBsZW1lbnRzIFJldmVyc2VTZWFyY2hcclxuICogQHBhcmFtIHNvdXJjZSBTZWFyY2ggc291cmNlXHJcbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHNlYXJjaCBzb3VyY2UgaW1wbGVtZW50cyBSZXZlcnNlU2VhcmNoXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc291cmNlQ2FuUmV2ZXJzZVNlYXJjaChzb3VyY2U6IFNlYXJjaFNvdXJjZSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiAoc291cmNlIGFzIGFueSkucmV2ZXJzZVNlYXJjaCAhPT0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG4vKipcclxuICogRnVuY3Rpb24gdGhhdCBjaGVja3Mgd2hldGhlciBhIHNlYXJjaCBzb3VyY2UgaW1wbGVtZW50cyBSZXZlcnNlU2VhcmNoIEFORCBpcyBzaG93biBpbiB0aGUgcG9pbnRlciBzdW1tYXJ5XHJcbiAqIEBwYXJhbSBzb3VyY2UgU2VhcmNoIHNvdXJjZVxyXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBzZWFyY2ggc291cmNlIGltcGxlbWVudHMgUmV2ZXJzZVNlYXJjaCBBTkQgaXMgc2hvd24gaW4gdGhlIHBvaW50ZXIgc3VtbWFyeVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNvdXJjZUNhblJldmVyc2VTZWFyY2hBc1N1bW1hcnkoc291cmNlOiBTZWFyY2hTb3VyY2UpOiBib29sZWFuIHtcclxuICByZXR1cm4gKHNvdXJjZSBhcyBhbnkpLnJldmVyc2VTZWFyY2ggIT09IHVuZGVmaW5lZCAmJiBzb3VyY2Uuc2hvd0luUG9pbnRlclN1bW1hcnkgPT09IHRydWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gYSBzZWFyY2ggcmVzdWx0IG91dCBvZiBhbiBGZWF0dXJlLiBUaGlzIGlzIHVzZWQgdG8gYWRhcHRcclxuICogdGhlIElHTyBxdWVyeSBtb2R1bGUgdG8gdGhlIG5ldyBGZWF0dXJlL1NlYXJjaFJlc3VsdCBpbnRlcmZhY2VzXHJcbiAqIEBwYXJhbSBmZWF0dXJlIGZlYXR1cmVcclxuICogQHBhcmFtIHNvdXJjZSBTZWFyY2ggc291cmNlXHJcbiAqIEByZXR1cm5zIFNlYXJjaFJlc3VsdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZlYXR1cmVUb1NlYXJjaFJlc3VsdChcclxuICBmZWF0dXJlOiBGZWF0dXJlLFxyXG4gIHNvdXJjZTogU2VhcmNoU291cmNlXHJcbik6IFNlYXJjaFJlc3VsdDxGZWF0dXJlPiB7XHJcbiAgZmVhdHVyZS5zb3VyY2VJZCA9IHNvdXJjZS5nZXRJZCgpO1xyXG4gIHJldHVybiB7XHJcbiAgICBzb3VyY2UsXHJcbiAgICBkYXRhOiBmZWF0dXJlLFxyXG4gICAgbWV0YToge1xyXG4gICAgICBkYXRhVHlwZTogRkVBVFVSRSxcclxuICAgICAgaWQ6IGZlYXR1cmUubWV0YS5pZCBhcyBzdHJpbmcsXHJcbiAgICAgIHRpdGxlOiBmZWF0dXJlLm1ldGEudGl0bGUsXHJcbiAgICAgIGljb246IGZlYXR1cmUubWV0YS5pY29uIHx8ICdtYXAtbWFya2VyJ1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuIl19