/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { APP_INITIALIZER, InjectionToken } from '@angular/core';
import { StyleListService } from './style-list.service';
/** @type {?} */
export let STYLELIST_OPTIONS = new InjectionToken('styleListOptions');
/**
 * @param {?} options
 * @return {?}
 */
export function provideStyleListOptions(options) {
    return {
        provide: STYLELIST_OPTIONS,
        useValue: options
    };
}
/**
 * @param {?} styleListService
 * @param {?} options
 * @return {?}
 */
export function styleListFactory(styleListService, options) {
    return (/**
     * @return {?}
     */
    () => styleListService.load(options));
}
/**
 * @return {?}
 */
export function provideStyleListLoader() {
    return {
        provide: APP_INITIALIZER,
        useFactory: styleListFactory,
        multi: true,
        deps: [StyleListService, STYLELIST_OPTIONS]
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUtbGlzdC5wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9pbXBvcnQtZXhwb3J0L3N0eWxlLWxpc3Qvc3R5bGUtbGlzdC5wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFaEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7O0FBR3hELE1BQU0sS0FBSyxpQkFBaUIsR0FBRyxJQUFJLGNBQWMsQ0FBbUIsa0JBQWtCLENBQUM7Ozs7O0FBRXZGLE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxPQUF5QjtJQUMvRCxPQUFPO1FBQ0wsT0FBTyxFQUFFLGlCQUFpQjtRQUMxQixRQUFRLEVBQUUsT0FBTztLQUNsQixDQUFDO0FBQ0osQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLGdCQUFnQixDQUM5QixnQkFBa0MsRUFDbEMsT0FBeUI7SUFFekI7OztJQUFPLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBQztBQUM5QyxDQUFDOzs7O0FBRUQsTUFBTSxVQUFVLHNCQUFzQjtJQUNwQyxPQUFPO1FBQ0wsT0FBTyxFQUFFLGVBQWU7UUFDeEIsVUFBVSxFQUFFLGdCQUFnQjtRQUM1QixLQUFLLEVBQUUsSUFBSTtRQUNYLElBQUksRUFBRSxDQUFDLGdCQUFnQixFQUFFLGlCQUFpQixDQUFDO0tBQzVDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVBQX0lOSVRJQUxJWkVSLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU3R5bGVMaXN0U2VydmljZSB9IGZyb20gJy4vc3R5bGUtbGlzdC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3R5bGVMaXN0T3B0aW9ucyB9IGZyb20gJy4vc3R5bGUtbGlzdC5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGxldCBTVFlMRUxJU1RfT1BUSU9OUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxTdHlsZUxpc3RPcHRpb25zPignc3R5bGVMaXN0T3B0aW9ucycpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVTdHlsZUxpc3RPcHRpb25zKG9wdGlvbnM6IFN0eWxlTGlzdE9wdGlvbnMpIHtcclxuICByZXR1cm4ge1xyXG4gICAgcHJvdmlkZTogU1RZTEVMSVNUX09QVElPTlMsXHJcbiAgICB1c2VWYWx1ZTogb3B0aW9uc1xyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzdHlsZUxpc3RGYWN0b3J5KFxyXG4gIHN0eWxlTGlzdFNlcnZpY2U6IFN0eWxlTGlzdFNlcnZpY2UsXHJcbiAgb3B0aW9uczogU3R5bGVMaXN0T3B0aW9uc1xyXG4pIHtcclxuICByZXR1cm4gKCkgPT4gc3R5bGVMaXN0U2VydmljZS5sb2FkKG9wdGlvbnMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZVN0eWxlTGlzdExvYWRlcigpIHtcclxuICByZXR1cm4ge1xyXG4gICAgcHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLFxyXG4gICAgdXNlRmFjdG9yeTogc3R5bGVMaXN0RmFjdG9yeSxcclxuICAgIG11bHRpOiB0cnVlLFxyXG4gICAgZGVwczogW1N0eWxlTGlzdFNlcnZpY2UsIFNUWUxFTElTVF9PUFRJT05TXVxyXG4gIH07XHJcbn1cclxuIl19