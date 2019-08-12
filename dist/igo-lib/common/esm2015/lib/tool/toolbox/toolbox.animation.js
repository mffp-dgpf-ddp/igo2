/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { trigger, state, style, transition, animate } from '@angular/animations';
/**
 * @param {?=} speed
 * @param {?=} type
 * @return {?}
 */
export function toolSlideInOut(speed = '300ms', type = 'ease-in-out') {
    return trigger('toolSlideInOut', [
        state('enter', style({
            transform: 'translate3d(0, 0, 0)'
        })),
        transition('void => enter', animate(speed + ' ' + type))
    ]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJveC5hbmltYXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvdG9vbC90b29sYm94L3Rvb2xib3guYW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsT0FBTyxFQUNQLEtBQUssRUFDTCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sRUFFUixNQUFNLHFCQUFxQixDQUFDOzs7Ozs7QUFFN0IsTUFBTSxVQUFVLGNBQWMsQ0FDNUIsS0FBSyxHQUFHLE9BQU8sRUFDZixJQUFJLEdBQUcsYUFBYTtJQUVwQixPQUFPLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRTtRQUMvQixLQUFLLENBQ0gsT0FBTyxFQUNQLEtBQUssQ0FBQztZQUNKLFNBQVMsRUFBRSxzQkFBc0I7U0FDbEMsQ0FBQyxDQUNIO1FBQ0QsVUFBVSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUN6RCxDQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICB0cmlnZ2VyLFxyXG4gIHN0YXRlLFxyXG4gIHN0eWxlLFxyXG4gIHRyYW5zaXRpb24sXHJcbiAgYW5pbWF0ZSxcclxuICBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGFcclxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0b29sU2xpZGVJbk91dChcclxuICBzcGVlZCA9ICczMDBtcycsXHJcbiAgdHlwZSA9ICdlYXNlLWluLW91dCdcclxuKTogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhIHtcclxuICByZXR1cm4gdHJpZ2dlcigndG9vbFNsaWRlSW5PdXQnLCBbXHJcbiAgICBzdGF0ZShcclxuICAgICAgJ2VudGVyJyxcclxuICAgICAgc3R5bGUoe1xyXG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDAsIDAsIDApJ1xyXG4gICAgICB9KVxyXG4gICAgKSxcclxuICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gZW50ZXInLCBhbmltYXRlKHNwZWVkICsgJyAnICsgdHlwZSkpXHJcbiAgXSk7XHJcbn1cclxuIl19