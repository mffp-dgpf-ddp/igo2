/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import t from 'typy';
/**
 * Get an entity's named property. Nested properties are supported
 * with the dotted notation. (i.e 'author.name')
 *
 * Note: this method is a 'best attempt' at getting an entity's property.
 * It fits the most common cases but you might need to explicitely define
 * a property getter when using an EntityStore, for example.
 * @param {?} entity Entity
 * @param {?} property Property name
 * @return {?} Property value
 */
export function getEntityProperty(entity, property) {
    return t(entity, property).safeObject;
}
/**
 * Get an entity's id. An entity's id can be one of:
 * 'entity.meta.id', 'entity.meta.idProperty' or 'entity.id'.
 *
 * Note: See the note in the 'getEntityProperty' documentation.
 * @param {?} entity Entity
 * @return {?} Entity id
 */
export function getEntityId(entity) {
    /** @type {?} */
    var meta = ((/** @type {?} */ (entity))).meta || {};
    return meta.id ? meta.id : getEntityProperty(entity, meta.idProperty || 'id');
}
/**
 * Get an entity's title. An entity's title can be one of:
 * 'entity.meta.title', 'entity.meta.titleProperty' or 'entity.title'.
 * @param {?} entity Entity
 * @return {?} Entity title
 */
export function getEntityTitle(entity) {
    /** @type {?} */
    var meta = ((/** @type {?} */ (entity))).meta || {};
    return meta.title ? meta.title : getEntityProperty(entity, meta.titleProperty || 'title');
}
/**
 * Get an entity's HTML title. An entity's HTML title can be one of:
 * 'entity.meta.titleHtml', 'entity.meta.titleHtmlProperty' or 'entity.titleHtml'.
 * @param {?} entity Entity
 * @return {?} Entity HTML title
 */
export function getEntityTitleHtml(entity) {
    /** @type {?} */
    var meta = ((/** @type {?} */ (entity))).meta || {};
    return meta.titleHtml ? meta.titleHtml : getEntityProperty(entity, meta.titleHtmlProperty || 'titleHtml');
}
/**
 * Get an entity's icon. An entity's icon can be one of:
 * 'entity.meta.icon', 'entity.meta.iconProperty' or 'entity.icon'.
 * @param {?} entity Entity
 * @return {?} Entity icon
 */
export function getEntityIcon(entity) {
    /** @type {?} */
    var meta = ((/** @type {?} */ (entity))).meta || {};
    return meta.icon ? meta.icon : getEntityProperty(entity, meta.iconProperty || 'icon');
}
/**
 * Get an entity's revision.
 * @param {?} entity Entity
 * @return {?} Entity revision
 */
export function getEntityRevision(entity) {
    /** @type {?} */
    var meta = ((/** @type {?} */ (entity))).meta || {};
    return meta.revision || 0;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LnV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2VudGl0eS9zaGFyZWQvZW50aXR5LnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLENBQUMsTUFBTSxNQUFNLENBQUM7Ozs7Ozs7Ozs7OztBQWVyQixNQUFNLFVBQVUsaUJBQWlCLENBQUMsTUFBYyxFQUFFLFFBQWdCO0lBQ2hFLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxVQUFVLENBQUM7QUFDeEMsQ0FBQzs7Ozs7Ozs7O0FBVUQsTUFBTSxVQUFVLFdBQVcsQ0FBQyxNQUFjOztRQUNsQyxJQUFJLEdBQUcsQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFO0lBQ3ZDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLENBQUM7QUFDaEYsQ0FBQzs7Ozs7OztBQVFELE1BQU0sVUFBVSxjQUFjLENBQUMsTUFBYzs7UUFDckMsSUFBSSxHQUFHLENBQUMsbUJBQUEsTUFBTSxFQUFPLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRTtJQUN2QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsYUFBYSxJQUFJLE9BQU8sQ0FBQyxDQUFDO0FBQzVGLENBQUM7Ozs7Ozs7QUFRRCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsTUFBYzs7UUFDekMsSUFBSSxHQUFHLENBQUMsbUJBQUEsTUFBTSxFQUFPLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRTtJQUN2QyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsaUJBQWlCLElBQUksV0FBVyxDQUFDLENBQUM7QUFDNUcsQ0FBQzs7Ozs7OztBQVFELE1BQU0sVUFBVSxhQUFhLENBQUMsTUFBYzs7UUFDcEMsSUFBSSxHQUFHLENBQUMsbUJBQUEsTUFBTSxFQUFPLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRTtJQUN2QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxJQUFJLE1BQU0sQ0FBQyxDQUFDO0FBQ3hGLENBQUM7Ozs7OztBQU9ELE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxNQUFjOztRQUN4QyxJQUFJLEdBQUcsQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFO0lBQ3ZDLE9BQU8sSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUM7QUFDNUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0IGZyb20gJ3R5cHknO1xyXG5cclxuaW1wb3J0IHsgRW50aXR5S2V5IH0gZnJvbSAnLi9lbnRpdHkuaW50ZXJmYWNlcyc7XHJcblxyXG4vKipcclxuICogR2V0IGFuIGVudGl0eSdzIG5hbWVkIHByb3BlcnR5LiBOZXN0ZWQgcHJvcGVydGllcyBhcmUgc3VwcG9ydGVkXHJcbiAqIHdpdGggdGhlIGRvdHRlZCBub3RhdGlvbi4gKGkuZSAnYXV0aG9yLm5hbWUnKVxyXG4gKlxyXG4gKiBOb3RlOiB0aGlzIG1ldGhvZCBpcyBhICdiZXN0IGF0dGVtcHQnIGF0IGdldHRpbmcgYW4gZW50aXR5J3MgcHJvcGVydHkuXHJcbiAqIEl0IGZpdHMgdGhlIG1vc3QgY29tbW9uIGNhc2VzIGJ1dCB5b3UgbWlnaHQgbmVlZCB0byBleHBsaWNpdGVseSBkZWZpbmVcclxuICogYSBwcm9wZXJ0eSBnZXR0ZXIgd2hlbiB1c2luZyBhbiBFbnRpdHlTdG9yZSwgZm9yIGV4YW1wbGUuXHJcbiAqIEBwYXJhbSBlbnRpdHkgRW50aXR5XHJcbiAqIEBwYXJhbSBwcm9wZXJ0eSBQcm9wZXJ0eSBuYW1lXHJcbiAqIEByZXR1cm5zIFByb3BlcnR5IHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW50aXR5UHJvcGVydHkoZW50aXR5OiBvYmplY3QsIHByb3BlcnR5OiBzdHJpbmcpOiBhbnkge1xyXG4gIHJldHVybiB0KGVudGl0eSwgcHJvcGVydHkpLnNhZmVPYmplY3Q7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgYW4gZW50aXR5J3MgaWQuIEFuIGVudGl0eSdzIGlkIGNhbiBiZSBvbmUgb2Y6XHJcbiAqICdlbnRpdHkubWV0YS5pZCcsICdlbnRpdHkubWV0YS5pZFByb3BlcnR5JyBvciAnZW50aXR5LmlkJy5cclxuICpcclxuICogTm90ZTogU2VlIHRoZSBub3RlIGluIHRoZSAnZ2V0RW50aXR5UHJvcGVydHknIGRvY3VtZW50YXRpb24uXHJcbiAqIEBwYXJhbSBlbnRpdHkgRW50aXR5XHJcbiAqIEByZXR1cm5zIEVudGl0eSBpZFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEVudGl0eUlkKGVudGl0eTogb2JqZWN0KTogRW50aXR5S2V5IHtcclxuICBjb25zdCBtZXRhID0gKGVudGl0eSBhcyBhbnkpLm1ldGEgfHwge307XHJcbiAgcmV0dXJuIG1ldGEuaWQgPyBtZXRhLmlkIDogZ2V0RW50aXR5UHJvcGVydHkoZW50aXR5LCBtZXRhLmlkUHJvcGVydHkgfHwgJ2lkJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgYW4gZW50aXR5J3MgdGl0bGUuIEFuIGVudGl0eSdzIHRpdGxlIGNhbiBiZSBvbmUgb2Y6XHJcbiAqICdlbnRpdHkubWV0YS50aXRsZScsICdlbnRpdHkubWV0YS50aXRsZVByb3BlcnR5JyBvciAnZW50aXR5LnRpdGxlJy5cclxuICogQHBhcmFtIGVudGl0eSBFbnRpdHlcclxuICogQHJldHVybnMgRW50aXR5IHRpdGxlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW50aXR5VGl0bGUoZW50aXR5OiBvYmplY3QpOiBzdHJpbmcge1xyXG4gIGNvbnN0IG1ldGEgPSAoZW50aXR5IGFzIGFueSkubWV0YSB8fCB7fTtcclxuICByZXR1cm4gbWV0YS50aXRsZSA/IG1ldGEudGl0bGUgOiBnZXRFbnRpdHlQcm9wZXJ0eShlbnRpdHksIG1ldGEudGl0bGVQcm9wZXJ0eSB8fCAndGl0bGUnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCBhbiBlbnRpdHkncyBIVE1MIHRpdGxlLiBBbiBlbnRpdHkncyBIVE1MIHRpdGxlIGNhbiBiZSBvbmUgb2Y6XHJcbiAqICdlbnRpdHkubWV0YS50aXRsZUh0bWwnLCAnZW50aXR5Lm1ldGEudGl0bGVIdG1sUHJvcGVydHknIG9yICdlbnRpdHkudGl0bGVIdG1sJy5cclxuICogQHBhcmFtIGVudGl0eSBFbnRpdHlcclxuICogQHJldHVybnMgRW50aXR5IEhUTUwgdGl0bGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRFbnRpdHlUaXRsZUh0bWwoZW50aXR5OiBvYmplY3QpOiBzdHJpbmcge1xyXG4gIGNvbnN0IG1ldGEgPSAoZW50aXR5IGFzIGFueSkubWV0YSB8fCB7fTtcclxuICByZXR1cm4gbWV0YS50aXRsZUh0bWwgPyBtZXRhLnRpdGxlSHRtbCA6IGdldEVudGl0eVByb3BlcnR5KGVudGl0eSwgbWV0YS50aXRsZUh0bWxQcm9wZXJ0eSB8fCAndGl0bGVIdG1sJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgYW4gZW50aXR5J3MgaWNvbi4gQW4gZW50aXR5J3MgaWNvbiBjYW4gYmUgb25lIG9mOlxyXG4gKiAnZW50aXR5Lm1ldGEuaWNvbicsICdlbnRpdHkubWV0YS5pY29uUHJvcGVydHknIG9yICdlbnRpdHkuaWNvbicuXHJcbiAqIEBwYXJhbSBlbnRpdHkgRW50aXR5XHJcbiAqIEByZXR1cm5zIEVudGl0eSBpY29uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW50aXR5SWNvbihlbnRpdHk6IG9iamVjdCk6IHN0cmluZyB7XHJcbiAgY29uc3QgbWV0YSA9IChlbnRpdHkgYXMgYW55KS5tZXRhIHx8IHt9O1xyXG4gIHJldHVybiBtZXRhLmljb24gPyBtZXRhLmljb24gOiBnZXRFbnRpdHlQcm9wZXJ0eShlbnRpdHksIG1ldGEuaWNvblByb3BlcnR5IHx8ICdpY29uJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgYW4gZW50aXR5J3MgcmV2aXNpb24uXHJcbiAqIEBwYXJhbSBlbnRpdHkgRW50aXR5XHJcbiAqIEByZXR1cm5zIEVudGl0eSByZXZpc2lvblxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEVudGl0eVJldmlzaW9uKGVudGl0eTogb2JqZWN0KTogbnVtYmVyIHtcclxuICBjb25zdCBtZXRhID0gKGVudGl0eSBhcyBhbnkpLm1ldGEgfHwge307XHJcbiAgcmV0dXJuIG1ldGEucmV2aXNpb24gfHwgMDtcclxufVxyXG4iXX0=