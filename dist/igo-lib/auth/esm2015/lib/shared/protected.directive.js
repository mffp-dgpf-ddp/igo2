/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef } from '@angular/core';
import { AuthService } from './auth.service';
export class ProtectedDirective {
    /**
     * @param {?} authentication
     * @param {?} el
     */
    constructor(authentication, el) {
        if (!authentication.isAuthenticated()) {
            el.nativeElement.parentNode.removeChild(el.nativeElement);
        }
    }
}
ProtectedDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoProtected]'
            },] }
];
/** @nocollapse */
ProtectedDirective.ctorParameters = () => [
    { type: AuthService },
    { type: ElementRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdGVjdGVkLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2F1dGgvIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL3Byb3RlY3RlZC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUs3QyxNQUFNLE9BQU8sa0JBQWtCOzs7OztJQUM3QixZQUFZLGNBQTJCLEVBQUUsRUFBYztRQUNyRCxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsRUFBRSxFQUFFO1lBQ3JDLEVBQUUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDM0Q7SUFDSCxDQUFDOzs7WUFSRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjthQUMzQjs7OztZQUpRLFdBQVc7WUFEQSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoLnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaWdvUHJvdGVjdGVkXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFByb3RlY3RlZERpcmVjdGl2ZSB7XHJcbiAgY29uc3RydWN0b3IoYXV0aGVudGljYXRpb246IEF1dGhTZXJ2aWNlLCBlbDogRWxlbWVudFJlZikge1xyXG4gICAgaWYgKCFhdXRoZW50aWNhdGlvbi5pc0F1dGhlbnRpY2F0ZWQoKSkge1xyXG4gICAgICBlbC5uYXRpdmVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwubmF0aXZlRWxlbWVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==