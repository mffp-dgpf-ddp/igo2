/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import * as olproj from 'ol/proj';
import { MAC } from 'ol/has';
/**
 * This method extracts a [lon, lat] tuple from a string.
 * \@todo Reproject coordinates
 * @param {?} str Any string
 * @return {?} A [lon, lat] tuple if one is found in the string
 */
export function stringToLonLat(str) {
    var _a;
    /** @type {?} */
    var coordPattern = '[-+]?[\\d]{1,8}(\\.)?(\\d+)?';
    /** @type {?} */
    var projectionPattern = '(;[\\d]{4,5})';
    /** @type {?} */
    var lonLatPattern = "^" + coordPattern + ",(\\s)*" + coordPattern + projectionPattern + "?";
    /** @type {?} */
    var lonLatRegex = new RegExp(lonLatPattern, 'g');
    if (!lonLatRegex.test(str)) {
        return undefined;
    }
    /** @type {?} */
    var lonLatStr = str;
    /** @type {?} */
    var projectionStr;
    /** @type {?} */
    var projectionRegex = new RegExp(projectionPattern, 'g');
    if (projectionRegex.test(str)) {
        _a = tslib_1.__read(str.split(';'), 2), lonLatStr = _a[0], projectionStr = _a[1];
    }
    var _b = tslib_1.__read(lonLatStr.split(','), 2), lonStr = _b[0], latStr = _b[1];
    /** @type {?} */
    var lonLat = (/** @type {?} */ ([parseFloat(lonStr), parseFloat(latStr)]));
    if (projectionStr !== undefined) {
        // TODO Reproject coordinates
    }
    return lonLat;
}
/**
 * Return true of two view states are equal.
 * @param {?} state1 View state
 * @param {?} state2 View state
 * @return {?} True if the view states are equal
 */
export function viewStatesAreEqual(state1, state2) {
    if (state1 === undefined || state2 === undefined) {
        return false;
    }
    /** @type {?} */
    var tolerance = 1 / 10000;
    return state1.zoom === state2.zoom &&
        Math.trunc(state1.center[0] / tolerance) === Math.trunc(state2.center[0] / tolerance) &&
        Math.trunc(state1.center[1] / tolerance) === Math.trunc(state2.center[1] / tolerance);
}
/**
 * Format the scale to a human readable text
 * @param {?} scale
 * @return {?} Human readable scale text
 */
export function formatScale(scale) {
    scale = Math.round(scale);
    if (scale < 10000) {
        return scale + '';
    }
    scale = Math.round(scale / 1000);
    if (scale < 1000) {
        return scale + 'K';
    }
    scale = Math.round(scale / 1000);
    return scale + 'M';
}
/**
 * Return the resolution from a scale denom
 * @param {?} scale Scale denom
 * @param {?=} dpi DPI
 * @return {?} Resolution
 */
export function getResolutionFromScale(scale, dpi) {
    if (dpi === void 0) { dpi = 72; }
    return scale / (39.37 * dpi);
}
/**
 * Return the resolution from a scale denom
 * @param {?} resolution
 * @param {?=} unit
 * @param {?=} dpi
 * @return {?} Resolution
 */
export function getScaleFromResolution(resolution, unit, dpi) {
    if (unit === void 0) { unit = 'm'; }
    if (dpi === void 0) { dpi = 72; }
    return resolution * olproj.METERS_PER_UNIT[unit] * 39.37 * dpi;
}
/**
 * Returns true if the CTRL key is pushed during an Ol MapBrowserPointerEvent
 * @param {?} event OL MapBrowserPointerEvent
 * @return {?} Whether the CTRL key is pushed
 */
export function ctrlKeyDown(event) {
    /** @type {?} */
    var originalEvent = event.originalEvent;
    return (!originalEvent.altKey &&
        (MAC ? originalEvent.metaKey : originalEvent.ctrlKey) &&
        !originalEvent.shiftKey);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLnV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL21hcC9zaGFyZWQvbWFwLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxLQUFLLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFFbEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLFFBQVEsQ0FBQzs7Ozs7OztBQVU3QixNQUFNLFVBQVUsY0FBYyxDQUFDLEdBQVc7OztRQUNsQyxZQUFZLEdBQUksOEJBQThCOztRQUM5QyxpQkFBaUIsR0FBRyxlQUFlOztRQUNuQyxhQUFhLEdBQUcsTUFBSSxZQUFZLGVBQVUsWUFBWSxHQUFHLGlCQUFpQixNQUFHOztRQUM3RSxXQUFXLEdBQUcsSUFBSSxNQUFNLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQztJQUVsRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUMxQixPQUFPLFNBQVMsQ0FBQztLQUNsQjs7UUFFRyxTQUFTLEdBQUcsR0FBRzs7UUFDZixhQUFhOztRQUVYLGVBQWUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUM7SUFDMUQsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQzdCLHNDQUEyQyxFQUExQyxpQkFBUyxFQUFFLHFCQUFhLENBQW1CO0tBQzdDO0lBRUssSUFBQSw0Q0FBdUMsRUFBdEMsY0FBTSxFQUFFLGNBQThCOztRQUN2QyxNQUFNLEdBQUcsbUJBQUEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQW9CO0lBRTNFLElBQUksYUFBYSxLQUFLLFNBQVMsRUFBRTtRQUMvQiw2QkFBNkI7S0FDOUI7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDOzs7Ozs7O0FBUUQsTUFBTSxVQUFVLGtCQUFrQixDQUFDLE1BQW9CLEVBQUUsTUFBb0I7SUFDM0UsSUFBSSxNQUFNLEtBQUssU0FBUyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7UUFDaEQsT0FBTyxLQUFLLENBQUM7S0FDZDs7UUFFSyxTQUFTLEdBQUcsQ0FBQyxHQUFHLEtBQUs7SUFDM0IsT0FBTyxNQUFNLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxJQUFJO1FBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDO1FBQ3JGLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUM7QUFDMUYsQ0FBQzs7Ozs7O0FBT0QsTUFBTSxVQUFVLFdBQVcsQ0FBQyxLQUFLO0lBQy9CLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLElBQUksS0FBSyxHQUFHLEtBQUssRUFBRTtRQUFFLE9BQU8sS0FBSyxHQUFHLEVBQUUsQ0FBQztLQUFFO0lBRXpDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQztJQUNqQyxJQUFJLEtBQUssR0FBRyxJQUFJLEVBQUU7UUFBRSxPQUFPLEtBQUssR0FBRyxHQUFHLENBQUM7S0FBRTtJQUV6QyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDakMsT0FBTyxLQUFLLEdBQUcsR0FBRyxDQUFDO0FBQ3JCLENBQUM7Ozs7Ozs7QUFRRCxNQUFNLFVBQVUsc0JBQXNCLENBQUMsS0FBYSxFQUFFLEdBQWdCO0lBQWhCLG9CQUFBLEVBQUEsUUFBZ0I7SUFDcEUsT0FBTyxLQUFLLEdBQUcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDL0IsQ0FBQzs7Ozs7Ozs7QUFPRCxNQUFNLFVBQVUsc0JBQXNCLENBQUMsVUFBa0IsRUFBRSxJQUFrQixFQUFFLEdBQWdCO0lBQXBDLHFCQUFBLEVBQUEsVUFBa0I7SUFBRSxvQkFBQSxFQUFBLFFBQWdCO0lBQzdGLE9BQU8sVUFBVSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQztBQUNqRSxDQUFDOzs7Ozs7QUFPRCxNQUFNLFVBQVUsV0FBVyxDQUFDLEtBQStCOztRQUNuRCxhQUFhLEdBQUcsS0FBSyxDQUFDLGFBQWE7SUFDekMsT0FBTyxDQUNMLENBQUMsYUFBYSxDQUFDLE1BQU07UUFDckIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7UUFDckQsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUN4QixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG9scHJvaiBmcm9tICdvbC9wcm9qJztcclxuaW1wb3J0IHsgTWFwQnJvd3NlclBvaW50ZXJFdmVudCBhcyBPbE1hcEJyb3dzZXJQb2ludGVyRXZlbnQgfSBmcm9tICdvbC9NYXBCcm93c2VyRXZlbnQnO1xyXG5pbXBvcnQgeyBNQUMgfSBmcm9tICdvbC9oYXMnO1xyXG5cclxuaW1wb3J0IHsgTWFwVmlld1N0YXRlIH0gZnJvbSAnLi9tYXAuaW50ZXJmYWNlJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIG1ldGhvZCBleHRyYWN0cyBhIFtsb24sIGxhdF0gdHVwbGUgZnJvbSBhIHN0cmluZy5cclxuICogQHBhcmFtIHN0ciBBbnkgc3RyaW5nXHJcbiAqIEByZXR1cm5zIEEgW2xvbiwgbGF0XSB0dXBsZSBpZiBvbmUgaXMgZm91bmQgaW4gdGhlIHN0cmluZ1xyXG4gKiBAdG9kbyBSZXByb2plY3QgY29vcmRpbmF0ZXNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdUb0xvbkxhdChzdHI6IHN0cmluZyk6IFtudW1iZXIsIG51bWJlcl0gfCB1bmRlZmluZWQge1xyXG4gIGNvbnN0IGNvb3JkUGF0dGVybiA9ICAnWy0rXT9bXFxcXGRdezEsOH0oXFxcXC4pPyhcXFxcZCspPyc7XHJcbiAgY29uc3QgcHJvamVjdGlvblBhdHRlcm4gPSAnKDtbXFxcXGRdezQsNX0pJztcclxuICBjb25zdCBsb25MYXRQYXR0ZXJuID0gYF4ke2Nvb3JkUGF0dGVybn0sKFxcXFxzKSoke2Nvb3JkUGF0dGVybn0ke3Byb2plY3Rpb25QYXR0ZXJufT9gO1xyXG4gIGNvbnN0IGxvbkxhdFJlZ2V4ID0gbmV3IFJlZ0V4cChsb25MYXRQYXR0ZXJuLCAnZycpO1xyXG5cclxuICBpZiAoIWxvbkxhdFJlZ2V4LnRlc3Qoc3RyKSkge1xyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGxldCBsb25MYXRTdHIgPSBzdHI7XHJcbiAgbGV0IHByb2plY3Rpb25TdHI7XHJcblxyXG4gIGNvbnN0IHByb2plY3Rpb25SZWdleCA9IG5ldyBSZWdFeHAocHJvamVjdGlvblBhdHRlcm4sICdnJyk7XHJcbiAgaWYgKHByb2plY3Rpb25SZWdleC50ZXN0KHN0cikpIHtcclxuICAgIFtsb25MYXRTdHIsIHByb2plY3Rpb25TdHJdID0gc3RyLnNwbGl0KCc7Jyk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBbbG9uU3RyLCBsYXRTdHJdID0gbG9uTGF0U3RyLnNwbGl0KCcsJyk7XHJcbiAgY29uc3QgbG9uTGF0ID0gW3BhcnNlRmxvYXQobG9uU3RyKSwgcGFyc2VGbG9hdChsYXRTdHIpXSBhcyBbbnVtYmVyLCBudW1iZXJdO1xyXG5cclxuICBpZiAocHJvamVjdGlvblN0ciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAvLyBUT0RPIFJlcHJvamVjdCBjb29yZGluYXRlc1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGxvbkxhdDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybiB0cnVlIG9mIHR3byB2aWV3IHN0YXRlcyBhcmUgZXF1YWwuXHJcbiAqIEBwYXJhbSBzdGF0ZTEgVmlldyBzdGF0ZVxyXG4gKiBAcGFyYW0gc3RhdGUyIFZpZXcgc3RhdGVcclxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmlldyBzdGF0ZXMgYXJlIGVxdWFsXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdmlld1N0YXRlc0FyZUVxdWFsKHN0YXRlMTogTWFwVmlld1N0YXRlLCBzdGF0ZTI6IE1hcFZpZXdTdGF0ZSk6IGJvb2xlYW4ge1xyXG4gIGlmIChzdGF0ZTEgPT09IHVuZGVmaW5lZCB8fCBzdGF0ZTIgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgdG9sZXJhbmNlID0gMSAvIDEwMDAwO1xyXG4gIHJldHVybiBzdGF0ZTEuem9vbSA9PT0gc3RhdGUyLnpvb20gJiZcclxuICAgIE1hdGgudHJ1bmMoc3RhdGUxLmNlbnRlclswXSAvIHRvbGVyYW5jZSkgPT09IE1hdGgudHJ1bmMoc3RhdGUyLmNlbnRlclswXSAvIHRvbGVyYW5jZSkgJiZcclxuICAgIE1hdGgudHJ1bmMoc3RhdGUxLmNlbnRlclsxXSAvIHRvbGVyYW5jZSkgPT09IE1hdGgudHJ1bmMoc3RhdGUyLmNlbnRlclsxXSAvIHRvbGVyYW5jZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGb3JtYXQgdGhlIHNjYWxlIHRvIGEgaHVtYW4gcmVhZGFibGUgdGV4dFxyXG4gKiBAcGFyYW0gU2NhbGUgb2YgdGhlIG1hcFxyXG4gKiBAcmV0dXJucyBIdW1hbiByZWFkYWJsZSBzY2FsZSB0ZXh0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0U2NhbGUoc2NhbGUpIHtcclxuICBzY2FsZSA9IE1hdGgucm91bmQoc2NhbGUpO1xyXG4gIGlmIChzY2FsZSA8IDEwMDAwKSB7IHJldHVybiBzY2FsZSArICcnOyB9XHJcblxyXG4gIHNjYWxlID0gTWF0aC5yb3VuZChzY2FsZSAvIDEwMDApO1xyXG4gIGlmIChzY2FsZSA8IDEwMDApIHsgcmV0dXJuIHNjYWxlICsgJ0snOyB9XHJcblxyXG4gIHNjYWxlID0gTWF0aC5yb3VuZChzY2FsZSAvIDEwMDApO1xyXG4gIHJldHVybiBzY2FsZSArICdNJztcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybiB0aGUgcmVzb2x1dGlvbiBmcm9tIGEgc2NhbGUgZGVub21cclxuICogQHBhcmFtIHNjYWxlIFNjYWxlIGRlbm9tXHJcbiAqIEBwYXJhbSBkcGkgRFBJXHJcbiAqIEByZXR1cm5zIFJlc29sdXRpb25cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRSZXNvbHV0aW9uRnJvbVNjYWxlKHNjYWxlOiBudW1iZXIsIGRwaTogbnVtYmVyID0gNzIpOiBudW1iZXIge1xyXG4gIHJldHVybiBzY2FsZSAvICgzOS4zNyAqIGRwaSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gdGhlIHJlc29sdXRpb24gZnJvbSBhIHNjYWxlIGRlbm9tXHJcbiAqIEBwYXJhbSBTY2FsZSBkZW5vbVxyXG4gKiBAcmV0dXJucyBSZXNvbHV0aW9uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2NhbGVGcm9tUmVzb2x1dGlvbihyZXNvbHV0aW9uOiBudW1iZXIsIHVuaXQ6IHN0cmluZyA9ICdtJywgZHBpOiBudW1iZXIgPSA3Mik6IG51bWJlciB7XHJcbiAgcmV0dXJuIHJlc29sdXRpb24gKiBvbHByb2ouTUVURVJTX1BFUl9VTklUW3VuaXRdICogMzkuMzcgKiBkcGk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIENUUkwga2V5IGlzIHB1c2hlZCBkdXJpbmcgYW4gT2wgTWFwQnJvd3NlclBvaW50ZXJFdmVudFxyXG4gKiBAcGFyYW0gZXZlbnQgT0wgTWFwQnJvd3NlclBvaW50ZXJFdmVudFxyXG4gKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBDVFJMIGtleSBpcyBwdXNoZWRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjdHJsS2V5RG93bihldmVudDogT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50KTogYm9vbGVhbiB7XHJcbiAgY29uc3Qgb3JpZ2luYWxFdmVudCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQ7XHJcbiAgcmV0dXJuIChcclxuICAgICFvcmlnaW5hbEV2ZW50LmFsdEtleSAmJlxyXG4gICAgKE1BQyA/IG9yaWdpbmFsRXZlbnQubWV0YUtleSA6IG9yaWdpbmFsRXZlbnQuY3RybEtleSkgJiZcclxuICAgICFvcmlnaW5hbEV2ZW50LnNoaWZ0S2V5XHJcbiAgKTtcclxufVxyXG4iXX0=