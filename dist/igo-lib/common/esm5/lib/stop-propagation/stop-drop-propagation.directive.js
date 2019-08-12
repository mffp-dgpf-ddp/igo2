/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, HostListener } from '@angular/core';
var StopDropPropagationDirective = /** @class */ (function () {
    function StopDropPropagationDirective() {
    }
    /**
     * @param {?} event
     * @return {?}
     */
    StopDropPropagationDirective.prototype.onDrop = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    StopDropPropagationDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoStopDropPropagation]'
                },] }
    ];
    StopDropPropagationDirective.propDecorators = {
        onDrop: [{ type: HostListener, args: ['drop', ['$event'],] }]
    };
    return StopDropPropagationDirective;
}());
export { StopDropPropagationDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcC1kcm9wLXByb3BhZ2F0aW9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9zdG9wLXByb3BhZ2F0aW9uL3N0b3AtZHJvcC1wcm9wYWdhdGlvbi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXhEO0lBQUE7SUFTQSxDQUFDOzs7OztJQUpRLDZDQUFNOzs7O0lBRGIsVUFDYyxLQUFVO1FBQ3RCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7Z0JBUkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSwwQkFBMEI7aUJBQ3JDOzs7eUJBRUUsWUFBWSxTQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQzs7SUFLbEMsbUNBQUM7Q0FBQSxBQVRELElBU0M7U0FOWSw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaWdvU3RvcERyb3BQcm9wYWdhdGlvbl0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdG9wRHJvcFByb3BhZ2F0aW9uRGlyZWN0aXZlIHtcclxuICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSlcclxuICBwdWJsaWMgb25Ecm9wKGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICB9XHJcbn1cclxuIl19