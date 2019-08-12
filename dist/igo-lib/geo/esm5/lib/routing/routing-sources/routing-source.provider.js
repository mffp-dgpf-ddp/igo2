/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@igo2/core';
import { RoutingSource } from './routing-source';
import { OsrmRoutingSource } from './osrm-routing-source';
/**
 * @param {?} http
 * @param {?} config
 * @return {?}
 */
export function osrmRoutingSourcesFactory(http, config) {
    return new OsrmRoutingSource(http, config);
}
/**
 * @return {?}
 */
export function provideOsrmRoutingSource() {
    return {
        provide: RoutingSource,
        useFactory: osrmRoutingSourcesFactory,
        multi: true,
        deps: [HttpClient, ConfigService]
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy1zb3VyY2UucHJvdmlkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvcm91dGluZy9yb3V0aW5nLXNvdXJjZXMvcm91dGluZy1zb3VyY2UucHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7O0FBRTFELE1BQU0sVUFBVSx5QkFBeUIsQ0FDdkMsSUFBZ0IsRUFDaEIsTUFBcUI7SUFFckIsT0FBTyxJQUFJLGlCQUFpQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztBQUM3QyxDQUFDOzs7O0FBRUQsTUFBTSxVQUFVLHdCQUF3QjtJQUN0QyxPQUFPO1FBQ0wsT0FBTyxFQUFFLGFBQWE7UUFDdEIsVUFBVSxFQUFFLHlCQUF5QjtRQUNyQyxLQUFLLEVBQUUsSUFBSTtRQUNYLElBQUksRUFBRSxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUM7S0FDbEMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgUm91dGluZ1NvdXJjZSB9IGZyb20gJy4vcm91dGluZy1zb3VyY2UnO1xyXG5pbXBvcnQgeyBPc3JtUm91dGluZ1NvdXJjZSB9IGZyb20gJy4vb3NybS1yb3V0aW5nLXNvdXJjZSc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb3NybVJvdXRpbmdTb3VyY2VzRmFjdG9yeShcclxuICBodHRwOiBIdHRwQ2xpZW50LFxyXG4gIGNvbmZpZzogQ29uZmlnU2VydmljZVxyXG4pIHtcclxuICByZXR1cm4gbmV3IE9zcm1Sb3V0aW5nU291cmNlKGh0dHAsIGNvbmZpZyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlT3NybVJvdXRpbmdTb3VyY2UoKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHByb3ZpZGU6IFJvdXRpbmdTb3VyY2UsXHJcbiAgICB1c2VGYWN0b3J5OiBvc3JtUm91dGluZ1NvdXJjZXNGYWN0b3J5LFxyXG4gICAgbXVsdGk6IHRydWUsXHJcbiAgICBkZXBzOiBbSHR0cENsaWVudCwgQ29uZmlnU2VydmljZV1cclxuICB9O1xyXG59XHJcbiJdfQ==