/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { unByKey } from 'ol/Observable';
/**
 * Base map controller
 */
export class MapController {
    constructor() {
        /**
         * Array of observer keys
         */
        this.observerKeys = [];
    }
    /**
     * Return the OL map this controller is bound to
     * @return {?} OL Map
     */
    getOlMap() {
        return this.olMap;
    }
    /**
     * Add or remove this controller to/from a map.
     * @param {?} olMap
     * @return {?}
     */
    setOlMap(olMap) {
        if (olMap !== undefined && this.getOlMap() !== undefined) {
            throw new Error('This controller is already bound to a map.');
        }
        if (olMap === undefined) {
            this.teardownObservers();
            this.olMap = olMap;
            return;
        }
        this.olMap = olMap;
    }
    /**
     * Teardown any observers
     * @return {?}
     */
    teardownObservers() {
        this.observerKeys.forEach((/**
         * @param {?} key
         * @return {?}
         */
        (key) => unByKey(key)));
        this.observerKeys = [];
    }
}
if (false) {
    /**
     * OL Map
     * @type {?}
     * @protected
     */
    MapController.prototype.olMap;
    /**
     * Array of observer keys
     * @type {?}
     * @protected
     */
    MapController.prototype.observerKeys;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9tYXAvc2hhcmVkL2NvbnRyb2xsZXJzL2NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFLeEMsTUFBTSxPQUFPLGFBQWE7SUFBMUI7Ozs7UUFVWSxpQkFBWSxHQUFhLEVBQUUsQ0FBQztJQW9DeEMsQ0FBQzs7Ozs7SUE5QkMsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDOzs7Ozs7SUFNRCxRQUFRLENBQUMsS0FBd0I7UUFDL0IsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxTQUFTLEVBQUU7WUFDeEQsTUFBTSxJQUFJLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO1NBQy9EO1FBRUQsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBS0QsaUJBQWlCO1FBQ2YsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxHQUFXLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO0lBQ3pCLENBQUM7Q0FFRjs7Ozs7OztJQXpDQyw4QkFBdUI7Ozs7OztJQUt2QixxQ0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgT2xNYXAgZnJvbSAnb2wvTWFwJztcclxuaW1wb3J0IHsgdW5CeUtleSB9IGZyb20gJ29sL09ic2VydmFibGUnO1xyXG5cclxuLyoqXHJcbiAqIEJhc2UgbWFwIGNvbnRyb2xsZXJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNYXBDb250cm9sbGVyIHtcclxuXHJcbiAgLyoqXHJcbiAgICogT0wgTWFwXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIG9sTWFwOiBPbE1hcDtcclxuXHJcbiAgLyoqXHJcbiAgICogQXJyYXkgb2Ygb2JzZXJ2ZXIga2V5c1xyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBvYnNlcnZlcktleXM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiB0aGUgT0wgbWFwIHRoaXMgY29udHJvbGxlciBpcyBib3VuZCB0b1xyXG4gICAqIEByZXR1cm5zIE9MIE1hcFxyXG4gICAqL1xyXG4gIGdldE9sTWFwKCk6IE9sTWFwIHtcclxuICAgIHJldHVybiB0aGlzLm9sTWFwO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIG9yIHJlbW92ZSB0aGlzIGNvbnRyb2xsZXIgdG8vZnJvbSBhIG1hcC5cclxuICAgKiBAcGFyYW0gbWFwIE9MIE1hcFxyXG4gICAqL1xyXG4gIHNldE9sTWFwKG9sTWFwOiBPbE1hcCB8IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKG9sTWFwICE9PSB1bmRlZmluZWQgJiYgdGhpcy5nZXRPbE1hcCgpICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIGNvbnRyb2xsZXIgaXMgYWxyZWFkeSBib3VuZCB0byBhIG1hcC4nKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob2xNYXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnRlYXJkb3duT2JzZXJ2ZXJzKCk7XHJcbiAgICAgIHRoaXMub2xNYXAgPSBvbE1hcDtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub2xNYXAgPSBvbE1hcDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRlYXJkb3duIGFueSBvYnNlcnZlcnNcclxuICAgKi9cclxuICB0ZWFyZG93bk9ic2VydmVycygpIHtcclxuICAgIHRoaXMub2JzZXJ2ZXJLZXlzLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB1bkJ5S2V5KGtleSkpO1xyXG4gICAgdGhpcy5vYnNlcnZlcktleXMgPSBbXTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==