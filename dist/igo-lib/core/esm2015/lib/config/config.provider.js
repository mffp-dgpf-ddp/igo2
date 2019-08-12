/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { APP_INITIALIZER, InjectionToken } from '@angular/core';
import { ConfigService } from './config.service';
/** @type {?} */
export let CONFIG_OPTIONS = new InjectionToken('configOptions');
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
    () => configService.load(options));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9jb25maWcvY29uZmlnLnByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVoRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7O0FBR2pELE1BQU0sS0FBSyxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQWdCLGVBQWUsQ0FBQzs7Ozs7QUFFOUUsTUFBTSxVQUFVLG9CQUFvQixDQUFDLE9BQXNCO0lBQ3pELE9BQU87UUFDTCxPQUFPLEVBQUUsY0FBYztRQUN2QixRQUFRLEVBQUUsT0FBTztLQUNsQixDQUFDO0FBQ0osQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLGFBQWEsQ0FDM0IsYUFBNEIsRUFDNUIsT0FBc0I7SUFFdEI7OztJQUFPLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUM7QUFDM0MsQ0FBQzs7OztBQUVELE1BQU0sVUFBVSxtQkFBbUI7SUFDakMsT0FBTztRQUNMLE9BQU8sRUFBRSxlQUFlO1FBQ3hCLFVBQVUsRUFBRSxhQUFhO1FBQ3pCLEtBQUssRUFBRSxJQUFJO1FBQ1gsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLGNBQWMsQ0FBQztLQUN0QyxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFQUF9JTklUSUFMSVpFUiwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29uZmlnT3B0aW9ucyB9IGZyb20gJy4vY29uZmlnLmludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgbGV0IENPTkZJR19PUFRJT05TID0gbmV3IEluamVjdGlvblRva2VuPENvbmZpZ09wdGlvbnM+KCdjb25maWdPcHRpb25zJyk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZUNvbmZpZ09wdGlvbnMob3B0aW9uczogQ29uZmlnT3B0aW9ucykge1xyXG4gIHJldHVybiB7XHJcbiAgICBwcm92aWRlOiBDT05GSUdfT1BUSU9OUyxcclxuICAgIHVzZVZhbHVlOiBvcHRpb25zXHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ0ZhY3RvcnkoXHJcbiAgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSxcclxuICBvcHRpb25zOiBDb25maWdPcHRpb25zXHJcbikge1xyXG4gIHJldHVybiAoKSA9PiBjb25maWdTZXJ2aWNlLmxvYWQob3B0aW9ucyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlQ29uZmlnTG9hZGVyKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICBwcm92aWRlOiBBUFBfSU5JVElBTElaRVIsXHJcbiAgICB1c2VGYWN0b3J5OiBjb25maWdGYWN0b3J5LFxyXG4gICAgbXVsdGk6IHRydWUsXHJcbiAgICBkZXBzOiBbQ29uZmlnU2VydmljZSwgQ09ORklHX09QVElPTlNdXHJcbiAgfTtcclxufVxyXG4iXX0=