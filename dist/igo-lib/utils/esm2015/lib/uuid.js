/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
export function S4() {
    // tslint:disable-next-line: no-bitwise
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
/**
 * @return {?}
 */
export function uuid() {
    /** @type {?} */
    const id = `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
    return id.toLowerCase();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXVpZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL3V0aWxzLyIsInNvdXJjZXMiOlsibGliL3V1aWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLE1BQU0sVUFBVSxFQUFFO0lBQ2hCLHVDQUF1QztJQUN2QyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pFLENBQUM7Ozs7QUFFRCxNQUFNLFVBQVUsSUFBSTs7VUFDWixFQUFFLEdBQUcsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUN6RSxPQUFPLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUMxQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIFM0KCkge1xyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYml0d2lzZVxyXG4gIHJldHVybiAoKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKSB8IDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1dWlkKCkge1xyXG4gIGNvbnN0IGlkID0gYCR7UzQoKX0ke1M0KCl9LSR7UzQoKX0tJHtTNCgpfS0ke1M0KCl9LSR7UzQoKX0ke1M0KCl9JHtTNCgpfWA7XHJcbiAgcmV0dXJuIGlkLnRvTG93ZXJDYXNlKCk7XHJcbn1cclxuIl19