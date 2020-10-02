/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { MeasureAreaUnit, MeasureLengthUnit } from '../shared/measure.enum';
import { metersToUnit, squareMetersToUnit, formatMeasure } from '../shared/measure.utils';
/**
 * This pipe returns a measure converted from meters (or square meters)
 * to the specified unit. It also keeps a certain number of decimals.
 */
var MeasureFormatPipe = /** @class */ (function () {
    function MeasureFormatPipe() {
    }
    /**
     * @ignore
     */
    /**
     * @ignore
     * @param {?} value
     * @param {?} unit
     * @param {?=} unitAbbr
     * @param {?=} decimal
     * @return {?}
     */
    MeasureFormatPipe.prototype.transform = /**
     * @ignore
     * @param {?} value
     * @param {?} unit
     * @param {?=} unitAbbr
     * @param {?=} decimal
     * @return {?}
     */
    function (value, unit, unitAbbr, decimal) {
        if (unitAbbr === void 0) { unitAbbr = false; }
        if (decimal === void 0) { decimal = 1; }
        /** @type {?} */
        var out;
        if (Object.values(MeasureAreaUnit).indexOf(unit) >= 0) {
            out = squareMetersToUnit(value, (/** @type {?} */ (unit)));
        }
        else if (Object.values(MeasureLengthUnit).indexOf(unit) >= 0) {
            out = metersToUnit(value, (/** @type {?} */ (unit)));
        }
        return out ? formatMeasure(out, {
            decimal: 1,
            unit: unit,
            unitAbbr: unitAbbr,
            locale: 'fr'
        }) : out;
    };
    MeasureFormatPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'measureFormat'
                },] }
    ];
    return MeasureFormatPipe;
}());
export { MeasureFormatPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVhc3VyZS1mb3JtYXQucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9tZWFzdXJlL21lYXN1cmVyL21lYXN1cmUtZm9ybWF0LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXBELE9BQU8sRUFBRSxlQUFlLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RSxPQUFPLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7OztBQU0xRjtJQUFBO0lBMkJBLENBQUM7SUF0QkM7O09BRUc7Ozs7Ozs7OztJQUNILHFDQUFTOzs7Ozs7OztJQUFULFVBQ0UsS0FBYSxFQUFFLElBQXlDLEVBQ3hELFFBQXlCLEVBQ3pCLE9BQW1CO1FBRG5CLHlCQUFBLEVBQUEsZ0JBQXlCO1FBQ3pCLHdCQUFBLEVBQUEsV0FBbUI7O1lBRWYsR0FBRztRQUNQLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3JELEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsbUJBQUEsSUFBSSxFQUFtQixDQUFDLENBQUM7U0FDMUQ7YUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzlELEdBQUcsR0FBRyxZQUFZLENBQUMsS0FBSyxFQUFFLG1CQUFBLElBQUksRUFBcUIsQ0FBQyxDQUFDO1NBQ3REO1FBRUQsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUU7WUFDOUIsT0FBTyxFQUFFLENBQUM7WUFDVixJQUFJLE1BQUE7WUFDSixRQUFRLFVBQUE7WUFDUixNQUFNLEVBQUUsSUFBSTtTQUNiLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ1gsQ0FBQzs7Z0JBMUJGLElBQUksU0FBQztvQkFDSixJQUFJLEVBQUUsZUFBZTtpQkFDdEI7O0lBeUJELHdCQUFDO0NBQUEsQUEzQkQsSUEyQkM7U0F4QlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTWVhc3VyZUFyZWFVbml0LCBNZWFzdXJlTGVuZ3RoVW5pdCB9IGZyb20gJy4uL3NoYXJlZC9tZWFzdXJlLmVudW0nO1xyXG5pbXBvcnQgeyBtZXRlcnNUb1VuaXQsIHNxdWFyZU1ldGVyc1RvVW5pdCwgZm9ybWF0TWVhc3VyZSB9IGZyb20gJy4uL3NoYXJlZC9tZWFzdXJlLnV0aWxzJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIHBpcGUgcmV0dXJucyBhIG1lYXN1cmUgY29udmVydGVkIGZyb20gbWV0ZXJzIChvciBzcXVhcmUgbWV0ZXJzKVxyXG4gKiB0byB0aGUgc3BlY2lmaWVkIHVuaXQuIEl0IGFsc28ga2VlcHMgYSBjZXJ0YWluIG51bWJlciBvZiBkZWNpbWFscy5cclxuICovXHJcbkBQaXBlKHtcclxuICBuYW1lOiAnbWVhc3VyZUZvcm1hdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE1lYXN1cmVGb3JtYXRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpZ25vcmVcclxuICAgKi9cclxuICB0cmFuc2Zvcm0oXHJcbiAgICB2YWx1ZTogbnVtYmVyLCB1bml0OiBNZWFzdXJlQXJlYVVuaXQgfCBNZWFzdXJlTGVuZ3RoVW5pdCxcclxuICAgIHVuaXRBYmJyOiBib29sZWFuID0gZmFsc2UsXHJcbiAgICBkZWNpbWFsOiBudW1iZXIgPSAxXHJcbiAgKTogbnVtYmVyIHtcclxuICAgIGxldCBvdXQ7XHJcbiAgICBpZiAoT2JqZWN0LnZhbHVlcyhNZWFzdXJlQXJlYVVuaXQpLmluZGV4T2YodW5pdCkgPj0gMCkge1xyXG4gICAgICBvdXQgPSBzcXVhcmVNZXRlcnNUb1VuaXQodmFsdWUsIHVuaXQgYXMgTWVhc3VyZUFyZWFVbml0KTtcclxuICAgIH0gZWxzZSBpZiAoT2JqZWN0LnZhbHVlcyhNZWFzdXJlTGVuZ3RoVW5pdCkuaW5kZXhPZih1bml0KSA+PSAwKSB7XHJcbiAgICAgIG91dCA9IG1ldGVyc1RvVW5pdCh2YWx1ZSwgdW5pdCBhcyBNZWFzdXJlTGVuZ3RoVW5pdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG91dCA/IGZvcm1hdE1lYXN1cmUob3V0LCB7XHJcbiAgICAgIGRlY2ltYWw6IDEsXHJcbiAgICAgIHVuaXQsXHJcbiAgICAgIHVuaXRBYmJyLFxyXG4gICAgICBsb2NhbGU6ICdmcidcclxuICAgIH0pIDogb3V0O1xyXG4gIH1cclxufVxyXG4iXX0=