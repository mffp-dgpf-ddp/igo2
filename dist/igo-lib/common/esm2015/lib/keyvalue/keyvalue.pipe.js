/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
export class KeyValuePipe {
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    transform(value, args) {
        /** @type {?} */
        const keyValues = [];
        Object.getOwnPropertyNames(value).forEach((/**
         * @param {?} key
         * @return {?}
         */
        (key) => keyValues.push({ key, value: value[key] })));
        return keyValues;
    }
}
KeyValuePipe.decorators = [
    { type: Pipe, args: [{
                name: 'keyvalue'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5dmFsdWUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9rZXl2YWx1ZS9rZXl2YWx1ZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUtwRCxNQUFNLE9BQU8sWUFBWTs7Ozs7O0lBQ3ZCLFNBQVMsQ0FBQyxLQUFVLEVBQUUsSUFBVTs7Y0FDeEIsU0FBUyxHQUFHLEVBQUU7UUFDcEIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU87Ozs7UUFBQyxDQUFDLEdBQVcsRUFBRSxFQUFFLENBQ3hELFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQzNDLENBQUM7UUFFRixPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDOzs7WUFYRixJQUFJLFNBQUM7Z0JBQ0osSUFBSSxFQUFFLFVBQVU7YUFDakIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ2tleXZhbHVlJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgS2V5VmFsdWVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGFyZ3M/OiBhbnkpOiBhbnkge1xyXG4gICAgY29uc3Qga2V5VmFsdWVzID0gW107XHJcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh2YWx1ZSkuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+XHJcbiAgICAgIGtleVZhbHVlcy5wdXNoKHsga2V5LCB2YWx1ZTogdmFsdWVba2V5XSB9KVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4ga2V5VmFsdWVzO1xyXG4gIH1cclxufVxyXG4iXX0=