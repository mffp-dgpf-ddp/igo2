/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { trigger, state, style, transition, animate } from '@angular/animations';
/**
 * @return {?}
 */
export function userButtonSlideInOut() {
    return trigger('userButtonState', [
        state('collapse', style({
            width: '0',
            overflow: 'hidden',
            display: 'none'
        })),
        state('expand', style({
            overflow: 'hidden',
            display: 'display'
        })),
        transition('collapse => expand', animate('200ms')),
        transition('expand => collapse', animate('200ms'))
    ]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1idXR0b24uYW5pbWF0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29udGV4dC8iLCJzb3VyY2VzIjpbImxpYi9jb250ZXh0LW1hcC1idXR0b24vdXNlci1idXR0b24vdXNlci1idXR0b24uYW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsT0FBTyxFQUNQLEtBQUssRUFDTCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sRUFFUixNQUFNLHFCQUFxQixDQUFDOzs7O0FBRTdCLE1BQU0sVUFBVSxvQkFBb0I7SUFDbEMsT0FBTyxPQUFPLENBQUMsaUJBQWlCLEVBQUU7UUFDaEMsS0FBSyxDQUNILFVBQVUsRUFDVixLQUFLLENBQUM7WUFDSixLQUFLLEVBQUUsR0FBRztZQUNWLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLE9BQU8sRUFBRSxNQUFNO1NBQ2hCLENBQUMsQ0FDSDtRQUNELEtBQUssQ0FDSCxRQUFRLEVBQ1IsS0FBSyxDQUFDO1lBQ0osUUFBUSxFQUFFLFFBQVE7WUFDbEIsT0FBTyxFQUFFLFNBQVM7U0FDbkIsQ0FBQyxDQUNIO1FBQ0QsVUFBVSxDQUFDLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRCxVQUFVLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ25ELENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIHRyaWdnZXIsXHJcbiAgc3RhdGUsXHJcbiAgc3R5bGUsXHJcbiAgdHJhbnNpdGlvbixcclxuICBhbmltYXRlLFxyXG4gIEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YVxyXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVzZXJCdXR0b25TbGlkZUluT3V0KCk6IEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSB7XHJcbiAgcmV0dXJuIHRyaWdnZXIoJ3VzZXJCdXR0b25TdGF0ZScsIFtcclxuICAgIHN0YXRlKFxyXG4gICAgICAnY29sbGFwc2UnLFxyXG4gICAgICBzdHlsZSh7XHJcbiAgICAgICAgd2lkdGg6ICcwJyxcclxuICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXHJcbiAgICAgICAgZGlzcGxheTogJ25vbmUnXHJcbiAgICAgIH0pXHJcbiAgICApLFxyXG4gICAgc3RhdGUoXHJcbiAgICAgICdleHBhbmQnLFxyXG4gICAgICBzdHlsZSh7XHJcbiAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gICAgICAgIGRpc3BsYXk6ICdkaXNwbGF5J1xyXG4gICAgICB9KVxyXG4gICAgKSxcclxuICAgIHRyYW5zaXRpb24oJ2NvbGxhcHNlID0+IGV4cGFuZCcsIGFuaW1hdGUoJzIwMG1zJykpLFxyXG4gICAgdHJhbnNpdGlvbignZXhwYW5kID0+IGNvbGxhcHNlJywgYW5pbWF0ZSgnMjAwbXMnKSlcclxuICBdKTtcclxufVxyXG4iXX0=