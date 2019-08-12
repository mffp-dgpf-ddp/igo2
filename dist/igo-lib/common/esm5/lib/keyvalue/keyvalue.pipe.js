/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
var KeyValuePipe = /** @class */ (function () {
    function KeyValuePipe() {
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    KeyValuePipe.prototype.transform = /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    function (value, args) {
        /** @type {?} */
        var keyValues = [];
        Object.getOwnPropertyNames(value).forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            return keyValues.push({ key: key, value: value[key] });
        }));
        return keyValues;
    };
    KeyValuePipe.decorators = [
        { type: Pipe, args: [{
                    name: 'keyvalue'
                },] }
    ];
    return KeyValuePipe;
}());
export { KeyValuePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5dmFsdWUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9rZXl2YWx1ZS9rZXl2YWx1ZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUVwRDtJQUFBO0lBWUEsQ0FBQzs7Ozs7O0lBUkMsZ0NBQVM7Ozs7O0lBQVQsVUFBVSxLQUFVLEVBQUUsSUFBVTs7WUFDeEIsU0FBUyxHQUFHLEVBQUU7UUFDcEIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU87Ozs7UUFBQyxVQUFDLEdBQVc7WUFDcEQsT0FBQSxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFBLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQTFDLENBQTBDLEVBQzNDLENBQUM7UUFFRixPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDOztnQkFYRixJQUFJLFNBQUM7b0JBQ0osSUFBSSxFQUFFLFVBQVU7aUJBQ2pCOztJQVVELG1CQUFDO0NBQUEsQUFaRCxJQVlDO1NBVFksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBQaXBlKHtcclxuICBuYW1lOiAna2V5dmFsdWUnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBLZXlWYWx1ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgYXJncz86IGFueSk6IGFueSB7XHJcbiAgICBjb25zdCBrZXlWYWx1ZXMgPSBbXTtcclxuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHZhbHVlKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT5cclxuICAgICAga2V5VmFsdWVzLnB1c2goeyBrZXksIHZhbHVlOiB2YWx1ZVtrZXldIH0pXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiBrZXlWYWx1ZXM7XHJcbiAgfVxyXG59XHJcbiJdfQ==