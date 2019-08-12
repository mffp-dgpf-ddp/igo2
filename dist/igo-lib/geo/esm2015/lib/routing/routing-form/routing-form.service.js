/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
export class RoutingFormService {
    constructor() {
        this.mapWaitingForRoutingClick = false;
    }
    /**
     * @return {?}
     */
    getStopsCoordinates() {
        return this.stopsCoordinates;
    }
    /**
     * @param {?} stopsCoordinates
     * @return {?}
     */
    setStopsCoordinates(stopsCoordinates) {
        this.stopsCoordinates = stopsCoordinates;
    }
    /**
     * @return {?}
     */
    isMapWaitingForRoutingClick() {
        return this.mapWaitingForRoutingClick;
    }
    /**
     * @return {?}
     */
    setMapWaitingForRoutingClick() {
        this.mapWaitingForRoutingClick = true;
    }
    /**
     * @return {?}
     */
    unsetMapWaitingForRoutingClick() {
        this.mapWaitingForRoutingClick = false;
    }
}
RoutingFormService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
RoutingFormService.ctorParameters = () => [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy1mb3JtLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvcm91dGluZy9yb3V0aW5nLWZvcm0vcm91dGluZy1mb3JtLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsTUFBTSxPQUFPLGtCQUFrQjtJQUk3QjtRQUNFLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxLQUFLLENBQUM7SUFDekMsQ0FBQzs7OztJQUVELG1CQUFtQjtRQUNqQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUMvQixDQUFDOzs7OztJQUVELG1CQUFtQixDQUFDLGdCQUFnQjtRQUNsQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7SUFDM0MsQ0FBQzs7OztJQUVELDJCQUEyQjtRQUN6QixPQUFPLElBQUksQ0FBQyx5QkFBeUIsQ0FBQztJQUN4QyxDQUFDOzs7O0lBRUQsNEJBQTRCO1FBQzFCLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLENBQUM7SUFDeEMsQ0FBQzs7OztJQUVELDhCQUE4QjtRQUM1QixJQUFJLENBQUMseUJBQXlCLEdBQUcsS0FBSyxDQUFDO0lBQ3pDLENBQUM7OztZQTNCRixVQUFVOzs7Ozs7Ozs7SUFFVCw4Q0FBNkM7Ozs7O0lBQzdDLHVEQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFJvdXRpbmdGb3JtU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBzdG9wc0Nvb3JkaW5hdGVzOiBbbnVtYmVyLCBudW1iZXJdW107XHJcbiAgcHJpdmF0ZSBtYXBXYWl0aW5nRm9yUm91dGluZ0NsaWNrOiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMubWFwV2FpdGluZ0ZvclJvdXRpbmdDbGljayA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3RvcHNDb29yZGluYXRlcygpOiBbbnVtYmVyLCBudW1iZXJdW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RvcHNDb29yZGluYXRlcztcclxuICB9XHJcblxyXG4gIHNldFN0b3BzQ29vcmRpbmF0ZXMoc3RvcHNDb29yZGluYXRlcykge1xyXG4gICAgdGhpcy5zdG9wc0Nvb3JkaW5hdGVzID0gc3RvcHNDb29yZGluYXRlcztcclxuICB9XHJcblxyXG4gIGlzTWFwV2FpdGluZ0ZvclJvdXRpbmdDbGljaygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm1hcFdhaXRpbmdGb3JSb3V0aW5nQ2xpY2s7XHJcbiAgfVxyXG5cclxuICBzZXRNYXBXYWl0aW5nRm9yUm91dGluZ0NsaWNrKCkge1xyXG4gICAgdGhpcy5tYXBXYWl0aW5nRm9yUm91dGluZ0NsaWNrID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHVuc2V0TWFwV2FpdGluZ0ZvclJvdXRpbmdDbGljaygpIHtcclxuICAgIHRoaXMubWFwV2FpdGluZ0ZvclJvdXRpbmdDbGljayA9IGZhbHNlO1xyXG4gIH1cclxufVxyXG4iXX0=