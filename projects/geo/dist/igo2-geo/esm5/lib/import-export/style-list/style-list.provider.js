/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { APP_INITIALIZER, InjectionToken } from '@angular/core';
import { StyleListService } from './style-list.service';
/** @type {?} */
export var STYLELIST_OPTIONS = new InjectionToken('styleListOptions');
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
    function () { return styleListService.load(options); });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUtbGlzdC5wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9pbXBvcnQtZXhwb3J0L3N0eWxlLWxpc3Qvc3R5bGUtbGlzdC5wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFaEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7O0FBR3hELE1BQU0sS0FBSyxpQkFBaUIsR0FBRyxJQUFJLGNBQWMsQ0FBbUIsa0JBQWtCLENBQUM7Ozs7O0FBRXZGLE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxPQUF5QjtJQUMvRCxPQUFPO1FBQ0wsT0FBTyxFQUFFLGlCQUFpQjtRQUMxQixRQUFRLEVBQUUsT0FBTztLQUNsQixDQUFDO0FBQ0osQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLGdCQUFnQixDQUM5QixnQkFBa0MsRUFDbEMsT0FBeUI7SUFFekI7OztJQUFPLGNBQU0sT0FBQSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQTlCLENBQThCLEVBQUM7QUFDOUMsQ0FBQzs7OztBQUVELE1BQU0sVUFBVSxzQkFBc0I7SUFDcEMsT0FBTztRQUNMLE9BQU8sRUFBRSxlQUFlO1FBQ3hCLFVBQVUsRUFBRSxnQkFBZ0I7UUFDNUIsS0FBSyxFQUFFLElBQUk7UUFDWCxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxpQkFBaUIsQ0FBQztLQUM1QyxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFQUF9JTklUSUFMSVpFUiwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFN0eWxlTGlzdFNlcnZpY2UgfSBmcm9tICcuL3N0eWxlLWxpc3Quc2VydmljZSc7XHJcbmltcG9ydCB7IFN0eWxlTGlzdE9wdGlvbnMgfSBmcm9tICcuL3N0eWxlLWxpc3QuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBsZXQgU1RZTEVMSVNUX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48U3R5bGVMaXN0T3B0aW9ucz4oJ3N0eWxlTGlzdE9wdGlvbnMnKTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlU3R5bGVMaXN0T3B0aW9ucyhvcHRpb25zOiBTdHlsZUxpc3RPcHRpb25zKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHByb3ZpZGU6IFNUWUxFTElTVF9PUFRJT05TLFxyXG4gICAgdXNlVmFsdWU6IG9wdGlvbnNcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3R5bGVMaXN0RmFjdG9yeShcclxuICBzdHlsZUxpc3RTZXJ2aWNlOiBTdHlsZUxpc3RTZXJ2aWNlLFxyXG4gIG9wdGlvbnM6IFN0eWxlTGlzdE9wdGlvbnNcclxuKSB7XHJcbiAgcmV0dXJuICgpID0+IHN0eWxlTGlzdFNlcnZpY2UubG9hZChvcHRpb25zKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVTdHlsZUxpc3RMb2FkZXIoKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHByb3ZpZGU6IEFQUF9JTklUSUFMSVpFUixcclxuICAgIHVzZUZhY3Rvcnk6IHN0eWxlTGlzdEZhY3RvcnksXHJcbiAgICBtdWx0aTogdHJ1ZSxcclxuICAgIGRlcHM6IFtTdHlsZUxpc3RTZXJ2aWNlLCBTVFlMRUxJU1RfT1BUSU9OU11cclxuICB9O1xyXG59XHJcbiJdfQ==