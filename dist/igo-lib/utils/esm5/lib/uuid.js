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
    var id = "" + S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
    return id.toLowerCase();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXVpZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL3V0aWxzLyIsInNvdXJjZXMiOlsibGliL3V1aWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLE1BQU0sVUFBVSxFQUFFO0lBQ2hCLHVDQUF1QztJQUN2QyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pFLENBQUM7Ozs7QUFFRCxNQUFNLFVBQVUsSUFBSTs7UUFDWixFQUFFLEdBQUcsS0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsU0FBSSxFQUFFLEVBQUUsU0FBSSxFQUFFLEVBQUUsU0FBSSxFQUFFLEVBQUUsU0FBSSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUk7SUFDekUsT0FBTyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDMUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBTNCgpIHtcclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWJpdHdpc2VcclxuICByZXR1cm4gKCgoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMCkgfCAwKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDEpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXVpZCgpIHtcclxuICBjb25zdCBpZCA9IGAke1M0KCl9JHtTNCgpfS0ke1M0KCl9LSR7UzQoKX0tJHtTNCgpfS0ke1M0KCl9JHtTNCgpfSR7UzQoKX1gO1xyXG4gIHJldHVybiBpZC50b0xvd2VyQ2FzZSgpO1xyXG59XHJcbiJdfQ==