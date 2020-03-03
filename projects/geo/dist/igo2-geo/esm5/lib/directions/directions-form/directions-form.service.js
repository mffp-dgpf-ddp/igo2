/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
var DirectionsFormService = /** @class */ (function () {
    function DirectionsFormService() {
    }
    /**
     * @return {?}
     */
    DirectionsFormService.prototype.getStopsCoordinates = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var stopsCoordinates = [];
        if (this.stops) {
            this.stops.forEach((/**
             * @param {?} stop
             * @return {?}
             */
            function (stop) {
                stopsCoordinates.push(stop.stopCoordinates);
            }));
        }
        return stopsCoordinates;
    };
    /**
     * @param {?} stops
     * @return {?}
     */
    DirectionsFormService.prototype.setStops = /**
     * @param {?} stops
     * @return {?}
     */
    function (stops) {
        this.stops = stops;
    };
    /**
     * @return {?}
     */
    DirectionsFormService.prototype.getStops = /**
     * @return {?}
     */
    function () {
        return this.stops;
    };
    DirectionsFormService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DirectionsFormService.ctorParameters = function () { return []; };
    return DirectionsFormService;
}());
export { DirectionsFormService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DirectionsFormService.prototype.stops;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aW9ucy1mb3JtLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aW9ucy9kaXJlY3Rpb25zLWZvcm0vZGlyZWN0aW9ucy1mb3JtLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0M7SUFJRTtJQUFlLENBQUM7Ozs7SUFFaEIsbURBQW1COzs7SUFBbkI7O1lBQ1EsZ0JBQWdCLEdBQUcsRUFBRTtRQUMzQixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87Ozs7WUFBQyxVQUFBLElBQUk7Z0JBQ3JCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDOUMsQ0FBQyxFQUFDLENBQUM7U0FDSjtRQUNELE9BQU8sZ0JBQWdCLENBQUM7SUFDMUIsQ0FBQzs7Ozs7SUFFRCx3Q0FBUTs7OztJQUFSLFVBQVMsS0FBYTtRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDOzs7O0lBRUQsd0NBQVE7OztJQUFSO1FBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7O2dCQXRCRixVQUFVOzs7O0lBd0JYLDRCQUFDO0NBQUEsQUF4QkQsSUF3QkM7U0F2QlkscUJBQXFCOzs7Ozs7SUFDaEMsc0NBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdG9wIH0gZnJvbSAnLi4vc2hhcmVkL2RpcmVjdGlvbnMuaW50ZXJmYWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERpcmVjdGlvbnNGb3JtU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBzdG9wczogU3RvcFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIGdldFN0b3BzQ29vcmRpbmF0ZXMoKTogW251bWJlciwgbnVtYmVyXVtdIHtcclxuICAgIGNvbnN0IHN0b3BzQ29vcmRpbmF0ZXMgPSBbXTtcclxuICAgIGlmICh0aGlzLnN0b3BzKSB7XHJcbiAgICAgIHRoaXMuc3RvcHMuZm9yRWFjaChzdG9wID0+IHtcclxuICAgICAgICBzdG9wc0Nvb3JkaW5hdGVzLnB1c2goc3RvcC5zdG9wQ29vcmRpbmF0ZXMpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdG9wc0Nvb3JkaW5hdGVzO1xyXG4gIH1cclxuXHJcbiAgc2V0U3RvcHMoc3RvcHM6IFN0b3BbXSkge1xyXG4gICAgdGhpcy5zdG9wcyA9IHN0b3BzO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3RvcHMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zdG9wcztcclxuICB9XHJcblxyXG59XHJcbiJdfQ==