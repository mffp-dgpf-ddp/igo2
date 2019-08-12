/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as olproj from 'ol/proj';
import { MAC } from 'ol/has';
/**
 * This method extracts a [lon, lat] tuple from a string.
 * \@todo Reproject coordinates
 * @param {?} str Any string
 * @return {?} A [lon, lat] tuple if one is found in the string
 */
export function stringToLonLat(str) {
    /** @type {?} */
    const coordPattern = '[-+]?[\\d]{1,8}(\\.)?(\\d+)?';
    /** @type {?} */
    const projectionPattern = '(;[\\d]{4,5})';
    /** @type {?} */
    const lonLatPattern = `^${coordPattern},(\\s)*${coordPattern}${projectionPattern}?`;
    /** @type {?} */
    const lonLatRegex = new RegExp(lonLatPattern, 'g');
    if (!lonLatRegex.test(str)) {
        return undefined;
    }
    /** @type {?} */
    let lonLatStr = str;
    /** @type {?} */
    let projectionStr;
    /** @type {?} */
    const projectionRegex = new RegExp(projectionPattern, 'g');
    if (projectionRegex.test(str)) {
        [lonLatStr, projectionStr] = str.split(';');
    }
    const [lonStr, latStr] = lonLatStr.split(',');
    /** @type {?} */
    const lonLat = (/** @type {?} */ ([parseFloat(lonStr), parseFloat(latStr)]));
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
    const tolerance = 1 / 10000;
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
export function getResolutionFromScale(scale, dpi = 72) {
    return scale / (39.37 * dpi);
}
/**
 * Return the resolution from a scale denom
 * @param {?} resolution
 * @param {?=} unit
 * @param {?=} dpi
 * @return {?} Resolution
 */
export function getScaleFromResolution(resolution, unit = 'm', dpi = 72) {
    return resolution * olproj.METERS_PER_UNIT[unit] * 39.37 * dpi;
}
/**
 * Returns true if the CTRL key is pushed during an Ol MapBrowserPointerEvent
 * @param {?} event OL MapBrowserPointerEvent
 * @return {?} Whether the CTRL key is pushed
 */
export function ctrlKeyDown(event) {
    /** @type {?} */
    const originalEvent = event.originalEvent;
    return (!originalEvent.altKey &&
        (MAC ? originalEvent.metaKey : originalEvent.ctrlKey) &&
        !originalEvent.shiftKey);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLnV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL21hcC9zaGFyZWQvbWFwLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUVsQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sUUFBUSxDQUFDOzs7Ozs7O0FBVTdCLE1BQU0sVUFBVSxjQUFjLENBQUMsR0FBVzs7VUFDbEMsWUFBWSxHQUFJLDhCQUE4Qjs7VUFDOUMsaUJBQWlCLEdBQUcsZUFBZTs7VUFDbkMsYUFBYSxHQUFHLElBQUksWUFBWSxVQUFVLFlBQVksR0FBRyxpQkFBaUIsR0FBRzs7VUFDN0UsV0FBVyxHQUFHLElBQUksTUFBTSxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUM7SUFFbEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDMUIsT0FBTyxTQUFTLENBQUM7S0FDbEI7O1FBRUcsU0FBUyxHQUFHLEdBQUc7O1FBQ2YsYUFBYTs7VUFFWCxlQUFlLEdBQUcsSUFBSSxNQUFNLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxDQUFDO0lBQzFELElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUM3QixDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzdDO1VBRUssQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7O1VBQ3ZDLE1BQU0sR0FBRyxtQkFBQSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBb0I7SUFFM0UsSUFBSSxhQUFhLEtBQUssU0FBUyxFQUFFO1FBQy9CLDZCQUE2QjtLQUM5QjtJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7Ozs7Ozs7QUFRRCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsTUFBb0IsRUFBRSxNQUFvQjtJQUMzRSxJQUFJLE1BQU0sS0FBSyxTQUFTLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtRQUNoRCxPQUFPLEtBQUssQ0FBQztLQUNkOztVQUVLLFNBQVMsR0FBRyxDQUFDLEdBQUcsS0FBSztJQUMzQixPQUFPLE1BQU0sQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLElBQUk7UUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7UUFDckYsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQztBQUMxRixDQUFDOzs7Ozs7QUFPRCxNQUFNLFVBQVUsV0FBVyxDQUFDLEtBQUs7SUFDL0IsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsSUFBSSxLQUFLLEdBQUcsS0FBSyxFQUFFO1FBQUUsT0FBTyxLQUFLLEdBQUcsRUFBRSxDQUFDO0tBQUU7SUFFekMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ2pDLElBQUksS0FBSyxHQUFHLElBQUksRUFBRTtRQUFFLE9BQU8sS0FBSyxHQUFHLEdBQUcsQ0FBQztLQUFFO0lBRXpDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQztJQUNqQyxPQUFPLEtBQUssR0FBRyxHQUFHLENBQUM7QUFDckIsQ0FBQzs7Ozs7OztBQVFELE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxLQUFhLEVBQUUsTUFBYyxFQUFFO0lBQ3BFLE9BQU8sS0FBSyxHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQy9CLENBQUM7Ozs7Ozs7O0FBT0QsTUFBTSxVQUFVLHNCQUFzQixDQUFDLFVBQWtCLEVBQUUsT0FBZSxHQUFHLEVBQUUsTUFBYyxFQUFFO0lBQzdGLE9BQU8sVUFBVSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQztBQUNqRSxDQUFDOzs7Ozs7QUFPRCxNQUFNLFVBQVUsV0FBVyxDQUFDLEtBQStCOztVQUNuRCxhQUFhLEdBQUcsS0FBSyxDQUFDLGFBQWE7SUFDekMsT0FBTyxDQUNMLENBQUMsYUFBYSxDQUFDLE1BQU07UUFDckIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7UUFDckQsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUN4QixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG9scHJvaiBmcm9tICdvbC9wcm9qJztcclxuaW1wb3J0IHsgTWFwQnJvd3NlclBvaW50ZXJFdmVudCBhcyBPbE1hcEJyb3dzZXJQb2ludGVyRXZlbnQgfSBmcm9tICdvbC9NYXBCcm93c2VyRXZlbnQnO1xyXG5pbXBvcnQgeyBNQUMgfSBmcm9tICdvbC9oYXMnO1xyXG5cclxuaW1wb3J0IHsgTWFwVmlld1N0YXRlIH0gZnJvbSAnLi9tYXAuaW50ZXJmYWNlJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIG1ldGhvZCBleHRyYWN0cyBhIFtsb24sIGxhdF0gdHVwbGUgZnJvbSBhIHN0cmluZy5cclxuICogQHBhcmFtIHN0ciBBbnkgc3RyaW5nXHJcbiAqIEByZXR1cm5zIEEgW2xvbiwgbGF0XSB0dXBsZSBpZiBvbmUgaXMgZm91bmQgaW4gdGhlIHN0cmluZ1xyXG4gKiBAdG9kbyBSZXByb2plY3QgY29vcmRpbmF0ZXNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdUb0xvbkxhdChzdHI6IHN0cmluZyk6IFtudW1iZXIsIG51bWJlcl0gfCB1bmRlZmluZWQge1xyXG4gIGNvbnN0IGNvb3JkUGF0dGVybiA9ICAnWy0rXT9bXFxcXGRdezEsOH0oXFxcXC4pPyhcXFxcZCspPyc7XHJcbiAgY29uc3QgcHJvamVjdGlvblBhdHRlcm4gPSAnKDtbXFxcXGRdezQsNX0pJztcclxuICBjb25zdCBsb25MYXRQYXR0ZXJuID0gYF4ke2Nvb3JkUGF0dGVybn0sKFxcXFxzKSoke2Nvb3JkUGF0dGVybn0ke3Byb2plY3Rpb25QYXR0ZXJufT9gO1xyXG4gIGNvbnN0IGxvbkxhdFJlZ2V4ID0gbmV3IFJlZ0V4cChsb25MYXRQYXR0ZXJuLCAnZycpO1xyXG5cclxuICBpZiAoIWxvbkxhdFJlZ2V4LnRlc3Qoc3RyKSkge1xyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGxldCBsb25MYXRTdHIgPSBzdHI7XHJcbiAgbGV0IHByb2plY3Rpb25TdHI7XHJcblxyXG4gIGNvbnN0IHByb2plY3Rpb25SZWdleCA9IG5ldyBSZWdFeHAocHJvamVjdGlvblBhdHRlcm4sICdnJyk7XHJcbiAgaWYgKHByb2plY3Rpb25SZWdleC50ZXN0KHN0cikpIHtcclxuICAgIFtsb25MYXRTdHIsIHByb2plY3Rpb25TdHJdID0gc3RyLnNwbGl0KCc7Jyk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBbbG9uU3RyLCBsYXRTdHJdID0gbG9uTGF0U3RyLnNwbGl0KCcsJyk7XHJcbiAgY29uc3QgbG9uTGF0ID0gW3BhcnNlRmxvYXQobG9uU3RyKSwgcGFyc2VGbG9hdChsYXRTdHIpXSBhcyBbbnVtYmVyLCBudW1iZXJdO1xyXG5cclxuICBpZiAocHJvamVjdGlvblN0ciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAvLyBUT0RPIFJlcHJvamVjdCBjb29yZGluYXRlc1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGxvbkxhdDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybiB0cnVlIG9mIHR3byB2aWV3IHN0YXRlcyBhcmUgZXF1YWwuXHJcbiAqIEBwYXJhbSBzdGF0ZTEgVmlldyBzdGF0ZVxyXG4gKiBAcGFyYW0gc3RhdGUyIFZpZXcgc3RhdGVcclxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmlldyBzdGF0ZXMgYXJlIGVxdWFsXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdmlld1N0YXRlc0FyZUVxdWFsKHN0YXRlMTogTWFwVmlld1N0YXRlLCBzdGF0ZTI6IE1hcFZpZXdTdGF0ZSk6IGJvb2xlYW4ge1xyXG4gIGlmIChzdGF0ZTEgPT09IHVuZGVmaW5lZCB8fCBzdGF0ZTIgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgdG9sZXJhbmNlID0gMSAvIDEwMDAwO1xyXG4gIHJldHVybiBzdGF0ZTEuem9vbSA9PT0gc3RhdGUyLnpvb20gJiZcclxuICAgIE1hdGgudHJ1bmMoc3RhdGUxLmNlbnRlclswXSAvIHRvbGVyYW5jZSkgPT09IE1hdGgudHJ1bmMoc3RhdGUyLmNlbnRlclswXSAvIHRvbGVyYW5jZSkgJiZcclxuICAgIE1hdGgudHJ1bmMoc3RhdGUxLmNlbnRlclsxXSAvIHRvbGVyYW5jZSkgPT09IE1hdGgudHJ1bmMoc3RhdGUyLmNlbnRlclsxXSAvIHRvbGVyYW5jZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGb3JtYXQgdGhlIHNjYWxlIHRvIGEgaHVtYW4gcmVhZGFibGUgdGV4dFxyXG4gKiBAcGFyYW0gU2NhbGUgb2YgdGhlIG1hcFxyXG4gKiBAcmV0dXJucyBIdW1hbiByZWFkYWJsZSBzY2FsZSB0ZXh0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0U2NhbGUoc2NhbGUpIHtcclxuICBzY2FsZSA9IE1hdGgucm91bmQoc2NhbGUpO1xyXG4gIGlmIChzY2FsZSA8IDEwMDAwKSB7IHJldHVybiBzY2FsZSArICcnOyB9XHJcblxyXG4gIHNjYWxlID0gTWF0aC5yb3VuZChzY2FsZSAvIDEwMDApO1xyXG4gIGlmIChzY2FsZSA8IDEwMDApIHsgcmV0dXJuIHNjYWxlICsgJ0snOyB9XHJcblxyXG4gIHNjYWxlID0gTWF0aC5yb3VuZChzY2FsZSAvIDEwMDApO1xyXG4gIHJldHVybiBzY2FsZSArICdNJztcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybiB0aGUgcmVzb2x1dGlvbiBmcm9tIGEgc2NhbGUgZGVub21cclxuICogQHBhcmFtIHNjYWxlIFNjYWxlIGRlbm9tXHJcbiAqIEBwYXJhbSBkcGkgRFBJXHJcbiAqIEByZXR1cm5zIFJlc29sdXRpb25cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRSZXNvbHV0aW9uRnJvbVNjYWxlKHNjYWxlOiBudW1iZXIsIGRwaTogbnVtYmVyID0gNzIpOiBudW1iZXIge1xyXG4gIHJldHVybiBzY2FsZSAvICgzOS4zNyAqIGRwaSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gdGhlIHJlc29sdXRpb24gZnJvbSBhIHNjYWxlIGRlbm9tXHJcbiAqIEBwYXJhbSBTY2FsZSBkZW5vbVxyXG4gKiBAcmV0dXJucyBSZXNvbHV0aW9uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2NhbGVGcm9tUmVzb2x1dGlvbihyZXNvbHV0aW9uOiBudW1iZXIsIHVuaXQ6IHN0cmluZyA9ICdtJywgZHBpOiBudW1iZXIgPSA3Mik6IG51bWJlciB7XHJcbiAgcmV0dXJuIHJlc29sdXRpb24gKiBvbHByb2ouTUVURVJTX1BFUl9VTklUW3VuaXRdICogMzkuMzcgKiBkcGk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIENUUkwga2V5IGlzIHB1c2hlZCBkdXJpbmcgYW4gT2wgTWFwQnJvd3NlclBvaW50ZXJFdmVudFxyXG4gKiBAcGFyYW0gZXZlbnQgT0wgTWFwQnJvd3NlclBvaW50ZXJFdmVudFxyXG4gKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBDVFJMIGtleSBpcyBwdXNoZWRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjdHJsS2V5RG93bihldmVudDogT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50KTogYm9vbGVhbiB7XHJcbiAgY29uc3Qgb3JpZ2luYWxFdmVudCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQ7XHJcbiAgcmV0dXJuIChcclxuICAgICFvcmlnaW5hbEV2ZW50LmFsdEtleSAmJlxyXG4gICAgKE1BQyA/IG9yaWdpbmFsRXZlbnQubWV0YUtleSA6IG9yaWdpbmFsRXZlbnQuY3RybEtleSkgJiZcclxuICAgICFvcmlnaW5hbEV2ZW50LnNoaWZ0S2V5XHJcbiAgKTtcclxufVxyXG4iXX0=