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
export function toolSlideInOut(speed, type) {
    if (speed === void 0) { speed = '300ms'; }
    if (type === void 0) { type = 'ease-in-out'; }
    return trigger('toolSlideInOut', [
        state('enter', style({
            transform: 'translate3d(0, 0, 0)'
        })),
        transition('void => enter', animate(speed + ' ' + type))
    ]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJveC5hbmltYXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvdG9vbC90b29sYm94L3Rvb2xib3guYW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsT0FBTyxFQUNQLEtBQUssRUFDTCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sRUFFUixNQUFNLHFCQUFxQixDQUFDOzs7Ozs7QUFFN0IsTUFBTSxVQUFVLGNBQWMsQ0FDNUIsS0FBZSxFQUNmLElBQW9CO0lBRHBCLHNCQUFBLEVBQUEsZUFBZTtJQUNmLHFCQUFBLEVBQUEsb0JBQW9CO0lBRXBCLE9BQU8sT0FBTyxDQUFDLGdCQUFnQixFQUFFO1FBQy9CLEtBQUssQ0FDSCxPQUFPLEVBQ1AsS0FBSyxDQUFDO1lBQ0osU0FBUyxFQUFFLHNCQUFzQjtTQUNsQyxDQUFDLENBQ0g7UUFDRCxVQUFVLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDO0tBQ3pELENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIHRyaWdnZXIsXHJcbiAgc3RhdGUsXHJcbiAgc3R5bGUsXHJcbiAgdHJhbnNpdGlvbixcclxuICBhbmltYXRlLFxyXG4gIEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YVxyXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvb2xTbGlkZUluT3V0KFxyXG4gIHNwZWVkID0gJzMwMG1zJyxcclxuICB0eXBlID0gJ2Vhc2UtaW4tb3V0J1xyXG4pOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEge1xyXG4gIHJldHVybiB0cmlnZ2VyKCd0b29sU2xpZGVJbk91dCcsIFtcclxuICAgIHN0YXRlKFxyXG4gICAgICAnZW50ZXInLFxyXG4gICAgICBzdHlsZSh7XHJcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMCwgMCwgMCknXHJcbiAgICAgIH0pXHJcbiAgICApLFxyXG4gICAgdHJhbnNpdGlvbigndm9pZCA9PiBlbnRlcicsIGFuaW1hdGUoc3BlZWQgKyAnICcgKyB0eXBlKSlcclxuICBdKTtcclxufVxyXG4iXX0=