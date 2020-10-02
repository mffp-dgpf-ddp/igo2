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
export class MeasureFormatPipe {
    /**
     * @ignore
     * @param {?} value
     * @param {?} unit
     * @param {?=} unitAbbr
     * @param {?=} decimal
     * @return {?}
     */
    transform(value, unit, unitAbbr = false, decimal = 1) {
        /** @type {?} */
        let out;
        if (Object.values(MeasureAreaUnit).indexOf(unit) >= 0) {
            out = squareMetersToUnit(value, (/** @type {?} */ (unit)));
        }
        else if (Object.values(MeasureLengthUnit).indexOf(unit) >= 0) {
            out = metersToUnit(value, (/** @type {?} */ (unit)));
        }
        return out ? formatMeasure(out, {
            decimal: 1,
            unit,
            unitAbbr,
            locale: 'fr'
        }) : out;
    }
}
MeasureFormatPipe.decorators = [
    { type: Pipe, args: [{
                name: 'measureFormat'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVhc3VyZS1mb3JtYXQucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9tZWFzdXJlL21lYXN1cmVyL21lYXN1cmUtZm9ybWF0LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXBELE9BQU8sRUFBRSxlQUFlLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RSxPQUFPLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7OztBQVMxRixNQUFNLE9BQU8saUJBQWlCOzs7Ozs7Ozs7SUFLNUIsU0FBUyxDQUNQLEtBQWEsRUFBRSxJQUF5QyxFQUN4RCxXQUFvQixLQUFLLEVBQ3pCLFVBQWtCLENBQUM7O1lBRWYsR0FBRztRQUNQLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3JELEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsbUJBQUEsSUFBSSxFQUFtQixDQUFDLENBQUM7U0FDMUQ7YUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzlELEdBQUcsR0FBRyxZQUFZLENBQUMsS0FBSyxFQUFFLG1CQUFBLElBQUksRUFBcUIsQ0FBQyxDQUFDO1NBQ3REO1FBRUQsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUU7WUFDOUIsT0FBTyxFQUFFLENBQUM7WUFDVixJQUFJO1lBQ0osUUFBUTtZQUNSLE1BQU0sRUFBRSxJQUFJO1NBQ2IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDWCxDQUFDOzs7WUExQkYsSUFBSSxTQUFDO2dCQUNKLElBQUksRUFBRSxlQUFlO2FBQ3RCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTWVhc3VyZUFyZWFVbml0LCBNZWFzdXJlTGVuZ3RoVW5pdCB9IGZyb20gJy4uL3NoYXJlZC9tZWFzdXJlLmVudW0nO1xyXG5pbXBvcnQgeyBtZXRlcnNUb1VuaXQsIHNxdWFyZU1ldGVyc1RvVW5pdCwgZm9ybWF0TWVhc3VyZSB9IGZyb20gJy4uL3NoYXJlZC9tZWFzdXJlLnV0aWxzJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIHBpcGUgcmV0dXJucyBhIG1lYXN1cmUgY29udmVydGVkIGZyb20gbWV0ZXJzIChvciBzcXVhcmUgbWV0ZXJzKVxyXG4gKiB0byB0aGUgc3BlY2lmaWVkIHVuaXQuIEl0IGFsc28ga2VlcHMgYSBjZXJ0YWluIG51bWJlciBvZiBkZWNpbWFscy5cclxuICovXHJcbkBQaXBlKHtcclxuICBuYW1lOiAnbWVhc3VyZUZvcm1hdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE1lYXN1cmVGb3JtYXRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpZ25vcmVcclxuICAgKi9cclxuICB0cmFuc2Zvcm0oXHJcbiAgICB2YWx1ZTogbnVtYmVyLCB1bml0OiBNZWFzdXJlQXJlYVVuaXQgfCBNZWFzdXJlTGVuZ3RoVW5pdCxcclxuICAgIHVuaXRBYmJyOiBib29sZWFuID0gZmFsc2UsXHJcbiAgICBkZWNpbWFsOiBudW1iZXIgPSAxXHJcbiAgKTogbnVtYmVyIHtcclxuICAgIGxldCBvdXQ7XHJcbiAgICBpZiAoT2JqZWN0LnZhbHVlcyhNZWFzdXJlQXJlYVVuaXQpLmluZGV4T2YodW5pdCkgPj0gMCkge1xyXG4gICAgICBvdXQgPSBzcXVhcmVNZXRlcnNUb1VuaXQodmFsdWUsIHVuaXQgYXMgTWVhc3VyZUFyZWFVbml0KTtcclxuICAgIH0gZWxzZSBpZiAoT2JqZWN0LnZhbHVlcyhNZWFzdXJlTGVuZ3RoVW5pdCkuaW5kZXhPZih1bml0KSA+PSAwKSB7XHJcbiAgICAgIG91dCA9IG1ldGVyc1RvVW5pdCh2YWx1ZSwgdW5pdCBhcyBNZWFzdXJlTGVuZ3RoVW5pdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG91dCA/IGZvcm1hdE1lYXN1cmUob3V0LCB7XHJcbiAgICAgIGRlY2ltYWw6IDEsXHJcbiAgICAgIHVuaXQsXHJcbiAgICAgIHVuaXRBYmJyLFxyXG4gICAgICBsb2NhbGU6ICdmcidcclxuICAgIH0pIDogb3V0O1xyXG4gIH1cclxufVxyXG4iXX0=