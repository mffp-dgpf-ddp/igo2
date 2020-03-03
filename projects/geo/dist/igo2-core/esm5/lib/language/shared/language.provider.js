/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { ConfigService } from '../../config/config.service';
import { LanguageLoader } from './language.loader';
/**
 * @param {?} http
 * @param {?=} config
 * @return {?}
 */
export function defaultLanguageLoader(http, config) {
    return new LanguageLoader(http, undefined, undefined, config);
}
/**
 * @param {?=} loader
 * @return {?}
 */
export function provideLanguageLoader(loader) {
    return {
        provide: TranslateLoader,
        useFactory: loader || defaultLanguageLoader,
        deps: [HttpClient]
    };
}
/**
 * @param {?=} loader
 * @return {?}
 */
export function provideDefaultLanguageLoader(loader) {
    return {
        provide: TranslateLoader,
        useFactory: loader || defaultLanguageLoader,
        deps: [HttpClient, ConfigService]
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ3VhZ2UucHJvdmlkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb3JlLyIsInNvdXJjZXMiOlsibGliL2xhbmd1YWdlL3NoYXJlZC9sYW5ndWFnZS5wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7Ozs7QUFFbkQsTUFBTSxVQUFVLHFCQUFxQixDQUNuQyxJQUFnQixFQUNoQixNQUFzQjtJQUV0QixPQUFPLElBQUksY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2hFLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLHFCQUFxQixDQUFDLE1BQU87SUFDM0MsT0FBTztRQUNMLE9BQU8sRUFBRSxlQUFlO1FBQ3hCLFVBQVUsRUFBRSxNQUFNLElBQUkscUJBQXFCO1FBQzNDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQztLQUNuQixDQUFDO0FBQ0osQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsNEJBQTRCLENBQUMsTUFBTztJQUNsRCxPQUFPO1FBQ0wsT0FBTyxFQUFFLGVBQWU7UUFDeEIsVUFBVSxFQUFFLE1BQU0sSUFBSSxxQkFBcUI7UUFDM0MsSUFBSSxFQUFFLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQztLQUNsQyxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZUxvYWRlciB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uL2NvbmZpZy9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IExhbmd1YWdlTG9hZGVyIH0gZnJvbSAnLi9sYW5ndWFnZS5sb2FkZXInO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRMYW5ndWFnZUxvYWRlcihcclxuICBodHRwOiBIdHRwQ2xpZW50LFxyXG4gIGNvbmZpZz86IENvbmZpZ1NlcnZpY2VcclxuKSB7XHJcbiAgcmV0dXJuIG5ldyBMYW5ndWFnZUxvYWRlcihodHRwLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgY29uZmlnKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVMYW5ndWFnZUxvYWRlcihsb2FkZXI/KSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHByb3ZpZGU6IFRyYW5zbGF0ZUxvYWRlcixcclxuICAgIHVzZUZhY3Rvcnk6IGxvYWRlciB8fCBkZWZhdWx0TGFuZ3VhZ2VMb2FkZXIsXHJcbiAgICBkZXBzOiBbSHR0cENsaWVudF1cclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZURlZmF1bHRMYW5ndWFnZUxvYWRlcihsb2FkZXI/KSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHByb3ZpZGU6IFRyYW5zbGF0ZUxvYWRlcixcclxuICAgIHVzZUZhY3Rvcnk6IGxvYWRlciB8fCBkZWZhdWx0TGFuZ3VhZ2VMb2FkZXIsXHJcbiAgICBkZXBzOiBbSHR0cENsaWVudCwgQ29uZmlnU2VydmljZV1cclxuICB9O1xyXG59XHJcbiJdfQ==