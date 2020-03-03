/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { APP_INITIALIZER, InjectionToken } from '@angular/core';
import { ConfigService } from './config.service';
/** @type {?} */
export var CONFIG_OPTIONS = new InjectionToken('configOptions');
/**
 * @param {?} options
 * @return {?}
 */
export function provideConfigOptions(options) {
    return {
        provide: CONFIG_OPTIONS,
        useValue: options
    };
}
/**
 * @param {?} configService
 * @param {?} options
 * @return {?}
 */
export function configFactory(configService, options) {
    return (/**
     * @return {?}
     */
    function () { return configService.load(options); });
}
/**
 * @return {?}
 */
export function provideConfigLoader() {
    return {
        provide: APP_INITIALIZER,
        useFactory: configFactory,
        multi: true,
        deps: [ConfigService, CONFIG_OPTIONS]
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9jb25maWcvY29uZmlnLnByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVoRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7O0FBR2pELE1BQU0sS0FBSyxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQWdCLGVBQWUsQ0FBQzs7Ozs7QUFFOUUsTUFBTSxVQUFVLG9CQUFvQixDQUFDLE9BQXNCO0lBQ3pELE9BQU87UUFDTCxPQUFPLEVBQUUsY0FBYztRQUN2QixRQUFRLEVBQUUsT0FBTztLQUNsQixDQUFDO0FBQ0osQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLGFBQWEsQ0FDM0IsYUFBNEIsRUFDNUIsT0FBc0I7SUFFdEI7OztJQUFPLGNBQU0sT0FBQSxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUEzQixDQUEyQixFQUFDO0FBQzNDLENBQUM7Ozs7QUFFRCxNQUFNLFVBQVUsbUJBQW1CO0lBQ2pDLE9BQU87UUFDTCxPQUFPLEVBQUUsZUFBZTtRQUN4QixVQUFVLEVBQUUsYUFBYTtRQUN6QixLQUFLLEVBQUUsSUFBSTtRQUNYLElBQUksRUFBRSxDQUFDLGFBQWEsRUFBRSxjQUFjLENBQUM7S0FDdEMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBUFBfSU5JVElBTElaRVIsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbmZpZ09wdGlvbnMgfSBmcm9tICcuL2NvbmZpZy5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGxldCBDT05GSUdfT1BUSU9OUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxDb25maWdPcHRpb25zPignY29uZmlnT3B0aW9ucycpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVDb25maWdPcHRpb25zKG9wdGlvbnM6IENvbmZpZ09wdGlvbnMpIHtcclxuICByZXR1cm4ge1xyXG4gICAgcHJvdmlkZTogQ09ORklHX09QVElPTlMsXHJcbiAgICB1c2VWYWx1ZTogb3B0aW9uc1xyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb25maWdGYWN0b3J5KFxyXG4gIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UsXHJcbiAgb3B0aW9uczogQ29uZmlnT3B0aW9uc1xyXG4pIHtcclxuICByZXR1cm4gKCkgPT4gY29uZmlnU2VydmljZS5sb2FkKG9wdGlvbnMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZUNvbmZpZ0xvYWRlcigpIHtcclxuICByZXR1cm4ge1xyXG4gICAgcHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLFxyXG4gICAgdXNlRmFjdG9yeTogY29uZmlnRmFjdG9yeSxcclxuICAgIG11bHRpOiB0cnVlLFxyXG4gICAgZGVwczogW0NvbmZpZ1NlcnZpY2UsIENPTkZJR19PUFRJT05TXVxyXG4gIH07XHJcbn1cclxuIl19