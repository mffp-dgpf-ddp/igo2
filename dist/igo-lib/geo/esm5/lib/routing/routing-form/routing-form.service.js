/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
var RoutingFormService = /** @class */ (function () {
    function RoutingFormService() {
        this.mapWaitingForRoutingClick = false;
    }
    /**
     * @return {?}
     */
    RoutingFormService.prototype.getStopsCoordinates = /**
     * @return {?}
     */
    function () {
        return this.stopsCoordinates;
    };
    /**
     * @param {?} stopsCoordinates
     * @return {?}
     */
    RoutingFormService.prototype.setStopsCoordinates = /**
     * @param {?} stopsCoordinates
     * @return {?}
     */
    function (stopsCoordinates) {
        this.stopsCoordinates = stopsCoordinates;
    };
    /**
     * @return {?}
     */
    RoutingFormService.prototype.isMapWaitingForRoutingClick = /**
     * @return {?}
     */
    function () {
        return this.mapWaitingForRoutingClick;
    };
    /**
     * @return {?}
     */
    RoutingFormService.prototype.setMapWaitingForRoutingClick = /**
     * @return {?}
     */
    function () {
        this.mapWaitingForRoutingClick = true;
    };
    /**
     * @return {?}
     */
    RoutingFormService.prototype.unsetMapWaitingForRoutingClick = /**
     * @return {?}
     */
    function () {
        this.mapWaitingForRoutingClick = false;
    };
    RoutingFormService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    RoutingFormService.ctorParameters = function () { return []; };
    return RoutingFormService;
}());
export { RoutingFormService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    RoutingFormService.prototype.stopsCoordinates;
    /**
     * @type {?}
     * @private
     */
    RoutingFormService.prototype.mapWaitingForRoutingClick;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy1mb3JtLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvcm91dGluZy9yb3V0aW5nLWZvcm0vcm91dGluZy1mb3JtLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0M7SUFLRTtRQUNFLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxLQUFLLENBQUM7SUFDekMsQ0FBQzs7OztJQUVELGdEQUFtQjs7O0lBQW5CO1FBQ0UsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDL0IsQ0FBQzs7Ozs7SUFFRCxnREFBbUI7Ozs7SUFBbkIsVUFBb0IsZ0JBQWdCO1FBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztJQUMzQyxDQUFDOzs7O0lBRUQsd0RBQTJCOzs7SUFBM0I7UUFDRSxPQUFPLElBQUksQ0FBQyx5QkFBeUIsQ0FBQztJQUN4QyxDQUFDOzs7O0lBRUQseURBQTRCOzs7SUFBNUI7UUFDRSxJQUFJLENBQUMseUJBQXlCLEdBQUcsSUFBSSxDQUFDO0lBQ3hDLENBQUM7Ozs7SUFFRCwyREFBOEI7OztJQUE5QjtRQUNFLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxLQUFLLENBQUM7SUFDekMsQ0FBQzs7Z0JBM0JGLFVBQVU7Ozs7SUE0QlgseUJBQUM7Q0FBQSxBQTVCRCxJQTRCQztTQTNCWSxrQkFBa0I7Ozs7OztJQUM3Qiw4Q0FBNkM7Ozs7O0lBQzdDLHVEQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFJvdXRpbmdGb3JtU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBzdG9wc0Nvb3JkaW5hdGVzOiBbbnVtYmVyLCBudW1iZXJdW107XHJcbiAgcHJpdmF0ZSBtYXBXYWl0aW5nRm9yUm91dGluZ0NsaWNrOiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMubWFwV2FpdGluZ0ZvclJvdXRpbmdDbGljayA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3RvcHNDb29yZGluYXRlcygpOiBbbnVtYmVyLCBudW1iZXJdW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RvcHNDb29yZGluYXRlcztcclxuICB9XHJcblxyXG4gIHNldFN0b3BzQ29vcmRpbmF0ZXMoc3RvcHNDb29yZGluYXRlcykge1xyXG4gICAgdGhpcy5zdG9wc0Nvb3JkaW5hdGVzID0gc3RvcHNDb29yZGluYXRlcztcclxuICB9XHJcblxyXG4gIGlzTWFwV2FpdGluZ0ZvclJvdXRpbmdDbGljaygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm1hcFdhaXRpbmdGb3JSb3V0aW5nQ2xpY2s7XHJcbiAgfVxyXG5cclxuICBzZXRNYXBXYWl0aW5nRm9yUm91dGluZ0NsaWNrKCkge1xyXG4gICAgdGhpcy5tYXBXYWl0aW5nRm9yUm91dGluZ0NsaWNrID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHVuc2V0TWFwV2FpdGluZ0ZvclJvdXRpbmdDbGljaygpIHtcclxuICAgIHRoaXMubWFwV2FpdGluZ0ZvclJvdXRpbmdDbGljayA9IGZhbHNlO1xyXG4gIH1cclxufVxyXG4iXX0=