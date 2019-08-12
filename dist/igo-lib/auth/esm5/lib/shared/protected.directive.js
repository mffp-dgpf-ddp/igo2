/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef } from '@angular/core';
import { AuthService } from './auth.service';
var ProtectedDirective = /** @class */ (function () {
    function ProtectedDirective(authentication, el) {
        if (!authentication.isAuthenticated()) {
            el.nativeElement.parentNode.removeChild(el.nativeElement);
        }
    }
    ProtectedDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoProtected]'
                },] }
    ];
    /** @nocollapse */
    ProtectedDirective.ctorParameters = function () { return [
        { type: AuthService },
        { type: ElementRef }
    ]; };
    return ProtectedDirective;
}());
export { ProtectedDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdGVjdGVkLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2F1dGgvIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL3Byb3RlY3RlZC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QztJQUlFLDRCQUFZLGNBQTJCLEVBQUUsRUFBYztRQUNyRCxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsRUFBRSxFQUFFO1lBQ3JDLEVBQUUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDM0Q7SUFDSCxDQUFDOztnQkFSRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtpQkFDM0I7Ozs7Z0JBSlEsV0FBVztnQkFEQSxVQUFVOztJQVk5Qix5QkFBQztDQUFBLEFBVEQsSUFTQztTQU5ZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vYXV0aC5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2lnb1Byb3RlY3RlZF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQcm90ZWN0ZWREaXJlY3RpdmUge1xyXG4gIGNvbnN0cnVjdG9yKGF1dGhlbnRpY2F0aW9uOiBBdXRoU2VydmljZSwgZWw6IEVsZW1lbnRSZWYpIHtcclxuICAgIGlmICghYXV0aGVudGljYXRpb24uaXNBdXRoZW50aWNhdGVkKCkpIHtcclxuICAgICAgZWwubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=