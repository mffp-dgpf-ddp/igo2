/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Whether a layer is queryable
 * @param {?} layer Layer
 * @return {?} True if the layer s squeryable
 */
export function layerIsQueryable(layer) {
    /** @type {?} */
    var dataSource = (/** @type {?} */ (layer.dataSource));
    return dataSource.options.queryable === true;
}
/**
 * Whether an OL layer is queryable
 * @param {?} olLayer
 * @return {?} True if the ol layer is queryable
 */
export function olLayerIsQueryable(olLayer) {
    /** @type {?} */
    var layer = olLayer.get('_layer');
    return layer === undefined ? false : layerIsQueryable(layer);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkudXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvcXVlcnkvc2hhcmVkL3F1ZXJ5LnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQVVBLE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxLQUFlOztRQUN4QyxVQUFVLEdBQUcsbUJBQUEsS0FBSyxDQUFDLFVBQVUsRUFBdUI7SUFDMUQsT0FBTyxVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUM7QUFDL0MsQ0FBQzs7Ozs7O0FBT0QsTUFBTSxVQUFVLGtCQUFrQixDQUFDLE9BQWdCOztRQUMzQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7SUFDbkMsT0FBTyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQy9ELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgT2xMYXllciBmcm9tICdvbC9sYXllci9MYXllcic7XHJcblxyXG5pbXBvcnQgeyBBbnlMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvYW55LWxheWVyJztcclxuaW1wb3J0IHsgUXVlcnlhYmxlRGF0YVNvdXJjZSB9IGZyb20gJy4vcXVlcnkuaW50ZXJmYWNlcyc7XHJcblxyXG4vKipcclxuICogV2hldGhlciBhIGxheWVyIGlzIHF1ZXJ5YWJsZVxyXG4gKiBAcGFyYW0gbGF5ZXIgTGF5ZXJcclxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgbGF5ZXIgcyBzcXVlcnlhYmxlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbGF5ZXJJc1F1ZXJ5YWJsZShsYXllcjogQW55TGF5ZXIpOiBib29sZWFuIHtcclxuICBjb25zdCBkYXRhU291cmNlID0gbGF5ZXIuZGF0YVNvdXJjZSBhcyBRdWVyeWFibGVEYXRhU291cmNlO1xyXG4gIHJldHVybiBkYXRhU291cmNlLm9wdGlvbnMucXVlcnlhYmxlID09PSB0cnVlO1xyXG59XHJcblxyXG4vKipcclxuICogV2hldGhlciBhbiBPTCBsYXllciBpcyBxdWVyeWFibGVcclxuICogQHBhcmFtIGxheWVyIExheWVyXHJcbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIG9sIGxheWVyIGlzIHF1ZXJ5YWJsZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG9sTGF5ZXJJc1F1ZXJ5YWJsZShvbExheWVyOiBPbExheWVyKTogYm9vbGVhbiB7XHJcbiAgY29uc3QgbGF5ZXIgPSBvbExheWVyLmdldCgnX2xheWVyJyk7XHJcbiAgcmV0dXJuIGxheWVyID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IGxheWVySXNRdWVyeWFibGUobGF5ZXIpO1xyXG59XHJcbiJdfQ==