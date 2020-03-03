/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
export class DirectionsFormService {
    constructor() { }
    /**
     * @return {?}
     */
    getStopsCoordinates() {
        /** @type {?} */
        const stopsCoordinates = [];
        if (this.stops) {
            this.stops.forEach((/**
             * @param {?} stop
             * @return {?}
             */
            stop => {
                stopsCoordinates.push(stop.stopCoordinates);
            }));
        }
        return stopsCoordinates;
    }
    /**
     * @param {?} stops
     * @return {?}
     */
    setStops(stops) {
        this.stops = stops;
    }
    /**
     * @return {?}
     */
    getStops() {
        return this.stops;
    }
}
DirectionsFormService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DirectionsFormService.ctorParameters = () => [];
if (false) {
    /**
     * @type {?}
     * @private
     */
    DirectionsFormService.prototype.stops;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aW9ucy1mb3JtLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aW9ucy9kaXJlY3Rpb25zLWZvcm0vZGlyZWN0aW9ucy1mb3JtLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsTUFBTSxPQUFPLHFCQUFxQjtJQUdoQyxnQkFBZSxDQUFDOzs7O0lBRWhCLG1CQUFtQjs7Y0FDWCxnQkFBZ0IsR0FBRyxFQUFFO1FBQzNCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTzs7OztZQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN4QixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzlDLENBQUMsRUFBQyxDQUFDO1NBQ0o7UUFDRCxPQUFPLGdCQUFnQixDQUFDO0lBQzFCLENBQUM7Ozs7O0lBRUQsUUFBUSxDQUFDLEtBQWE7UUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQzs7O1lBdEJGLFVBQVU7Ozs7Ozs7OztJQUVULHNDQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3RvcCB9IGZyb20gJy4uL3NoYXJlZC9kaXJlY3Rpb25zLmludGVyZmFjZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBEaXJlY3Rpb25zRm9ybVNlcnZpY2Uge1xyXG4gIHByaXZhdGUgc3RvcHM6IFN0b3BbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBnZXRTdG9wc0Nvb3JkaW5hdGVzKCk6IFtudW1iZXIsIG51bWJlcl1bXSB7XHJcbiAgICBjb25zdCBzdG9wc0Nvb3JkaW5hdGVzID0gW107XHJcbiAgICBpZiAodGhpcy5zdG9wcykge1xyXG4gICAgICB0aGlzLnN0b3BzLmZvckVhY2goc3RvcCA9PiB7XHJcbiAgICAgICAgc3RvcHNDb29yZGluYXRlcy5wdXNoKHN0b3Auc3RvcENvb3JkaW5hdGVzKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RvcHNDb29yZGluYXRlcztcclxuICB9XHJcblxyXG4gIHNldFN0b3BzKHN0b3BzOiBTdG9wW10pIHtcclxuICAgIHRoaXMuc3RvcHMgPSBzdG9wcztcclxuICB9XHJcblxyXG4gIGdldFN0b3BzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RvcHM7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=