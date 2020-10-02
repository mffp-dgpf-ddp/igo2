/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { trigger, state, style, transition, animate } from '@angular/animations';
/**
 * @return {?}
 */
export function baseLayersSwitcherSlideInOut() {
    return trigger('baseLayerSwitcherState', [
        state('collapseIcon', style({
            height: '40px',
            width: '40px',
            overflow: 'hidden'
        })),
        state('collapseMap', style({
            height: '85px',
            overflow: 'hidden'
        })),
        state('expand', style({
            overflow: 'hidden'
        })),
        transition('collapse => expand', animate('200ms')),
        transition('expand => collapse', animate('200ms'))
    ]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZWxheWVycy1zd2l0Y2hlci5hbmltYXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbWFwL2Jhc2VsYXllcnMtc3dpdGNoZXIvYmFzZWxheWVycy1zd2l0Y2hlci5hbmltYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxFQUVSLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFFN0IsTUFBTSxVQUFVLDRCQUE0QjtJQUMxQyxPQUFPLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRTtRQUN2QyxLQUFLLENBQ0gsY0FBYyxFQUNkLEtBQUssQ0FBQztZQUNKLE1BQU0sRUFBRSxNQUFNO1lBQ2QsS0FBSyxFQUFFLE1BQU07WUFDYixRQUFRLEVBQUUsUUFBUTtTQUNuQixDQUFDLENBQ0g7UUFDRCxLQUFLLENBQ0gsYUFBYSxFQUNiLEtBQUssQ0FBQztZQUNKLE1BQU0sRUFBRSxNQUFNO1lBQ2QsUUFBUSxFQUFFLFFBQVE7U0FDbkIsQ0FBQyxDQUNIO1FBQ0QsS0FBSyxDQUNILFFBQVEsRUFDUixLQUFLLENBQUM7WUFDSixRQUFRLEVBQUUsUUFBUTtTQUNuQixDQUFDLENBQ0g7UUFDRCxVQUFVLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xELFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDbkQsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgdHJpZ2dlcixcclxuICBzdGF0ZSxcclxuICBzdHlsZSxcclxuICB0cmFuc2l0aW9uLFxyXG4gIGFuaW1hdGUsXHJcbiAgQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhXHJcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYmFzZUxheWVyc1N3aXRjaGVyU2xpZGVJbk91dCgpOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEge1xyXG4gIHJldHVybiB0cmlnZ2VyKCdiYXNlTGF5ZXJTd2l0Y2hlclN0YXRlJywgW1xyXG4gICAgc3RhdGUoXHJcbiAgICAgICdjb2xsYXBzZUljb24nLFxyXG4gICAgICBzdHlsZSh7XHJcbiAgICAgICAgaGVpZ2h0OiAnNDBweCcsXHJcbiAgICAgICAgd2lkdGg6ICc0MHB4JyxcclxuICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbidcclxuICAgICAgfSlcclxuICAgICksXHJcbiAgICBzdGF0ZShcclxuICAgICAgJ2NvbGxhcHNlTWFwJyxcclxuICAgICAgc3R5bGUoe1xyXG4gICAgICAgIGhlaWdodDogJzg1cHgnLFxyXG4gICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJ1xyXG4gICAgICB9KVxyXG4gICAgKSxcclxuICAgIHN0YXRlKFxyXG4gICAgICAnZXhwYW5kJyxcclxuICAgICAgc3R5bGUoe1xyXG4gICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJ1xyXG4gICAgICB9KVxyXG4gICAgKSxcclxuICAgIHRyYW5zaXRpb24oJ2NvbGxhcHNlID0+IGV4cGFuZCcsIGFuaW1hdGUoJzIwMG1zJykpLFxyXG4gICAgdHJhbnNpdGlvbignZXhwYW5kID0+IGNvbGxhcHNlJywgYW5pbWF0ZSgnMjAwbXMnKSlcclxuICBdKTtcclxufVxyXG4iXX0=