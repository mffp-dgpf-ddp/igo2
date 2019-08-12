/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
var ClonePipe = /** @class */ (function () {
    function ClonePipe() {
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    ClonePipe.prototype.transform = /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    function (value, args) {
        if (value === undefined) {
            return value;
        }
        if (value instanceof Array) {
            return value.map((/**
             * @param {?} obj
             * @return {?}
             */
            function (obj) { return Object.assign(Object.create(obj), obj); }));
        }
        else {
            return Object.assign(Object.create(value), value);
        }
    };
    ClonePipe.decorators = [
        { type: Pipe, args: [{
                    name: 'clone'
                },] }
    ];
    return ClonePipe;
}());
export { ClonePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvbmUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9jbG9uZS9jbG9uZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUVwRDtJQUFBO0lBZUEsQ0FBQzs7Ozs7O0lBWEMsNkJBQVM7Ozs7O0lBQVQsVUFBVSxLQUFVLEVBQUUsSUFBVTtRQUM5QixJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDdkIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELElBQUksS0FBSyxZQUFZLEtBQUssRUFBRTtZQUMxQixPQUFPLEtBQUssQ0FBQyxHQUFHOzs7O1lBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQXRDLENBQXNDLEVBQUMsQ0FBQztTQUNqRTthQUFNO1lBQ0wsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDbkQ7SUFDSCxDQUFDOztnQkFkRixJQUFJLFNBQUM7b0JBQ0osSUFBSSxFQUFFLE9BQU87aUJBQ2Q7O0lBYUQsZ0JBQUM7Q0FBQSxBQWZELElBZUM7U0FaWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdjbG9uZSdcclxufSlcclxuZXhwb3J0IGNsYXNzIENsb25lUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBhcmdzPzogYW55KTogYW55IHtcclxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICByZXR1cm4gdmFsdWUubWFwKG9iaiA9PiBPYmplY3QuYXNzaWduKE9iamVjdC5jcmVhdGUob2JqKSwgb2JqKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKHZhbHVlKSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=