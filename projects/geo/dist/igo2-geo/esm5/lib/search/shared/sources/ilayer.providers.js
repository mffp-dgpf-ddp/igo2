/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { HttpClient } from '@angular/common/http';
import { ConfigService, LanguageService } from '@igo2/core';
import { SearchSource } from './source';
import { ILayerSearchSource, ILayerSearchResultFormatter } from './ilayer';
/**
 * ILayer search result formatter factory
 * @ignore
 * @param {?} languageService
 * @return {?}
 */
export function ilayerSearchResultFormatterFactory(languageService) {
    return new ILayerSearchResultFormatter(languageService);
}
/**
 * Function that returns a provider for the ILayer search result formatter
 * @return {?}
 */
export function provideILayerSearchResultFormatter() {
    return {
        provide: ILayerSearchResultFormatter,
        useFactory: ilayerSearchResultFormatterFactory,
        deps: [LanguageService]
    };
}
/**
 * ILayer search source factory
 * @ignore
 * @param {?} http
 * @param {?} languageService
 * @param {?} config
 * @param {?} formatter
 * @return {?}
 */
export function ilayerSearchSourceFactory(http, languageService, config, formatter) {
    return new ILayerSearchSource(http, languageService, config.getConfig("searchSources." + ILayerSearchSource.id), formatter);
}
/**
 * Function that returns a provider for the ILayer search source
 * @return {?}
 */
export function provideILayerSearchSource() {
    return {
        provide: SearchSource,
        useFactory: ilayerSearchSourceFactory,
        multi: true,
        deps: [HttpClient, LanguageService, ConfigService, ILayerSearchResultFormatter]
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWxheWVyLnByb3ZpZGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gvc2hhcmVkL3NvdXJjZXMvaWxheWVyLnByb3ZpZGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRWxELE9BQU8sRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTVELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDeEMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLDJCQUEyQixFQUFFLE1BQU0sVUFBVSxDQUFDOzs7Ozs7O0FBTTNFLE1BQU0sVUFBVSxrQ0FBa0MsQ0FDaEQsZUFBZ0M7SUFFaEMsT0FBTyxJQUFJLDJCQUEyQixDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQzFELENBQUM7Ozs7O0FBS0QsTUFBTSxVQUFVLGtDQUFrQztJQUNoRCxPQUFPO1FBQ0wsT0FBTyxFQUFFLDJCQUEyQjtRQUNwQyxVQUFVLEVBQUUsa0NBQWtDO1FBQzlDLElBQUksRUFBRSxDQUFDLGVBQWUsQ0FBQztLQUN4QixDQUFDO0FBQ0osQ0FBQzs7Ozs7Ozs7OztBQU1ELE1BQU0sVUFBVSx5QkFBeUIsQ0FDdkMsSUFBZ0IsRUFDaEIsZUFBZ0MsRUFDaEMsTUFBcUIsRUFDckIsU0FBc0M7SUFFdEMsT0FBTyxJQUFJLGtCQUFrQixDQUMzQixJQUFJLEVBQ0osZUFBZSxFQUNmLE1BQU0sQ0FBQyxTQUFTLENBQUMsbUJBQWlCLGtCQUFrQixDQUFDLEVBQUksQ0FBQyxFQUMxRCxTQUFTLENBQ1YsQ0FBQztBQUNKLENBQUM7Ozs7O0FBS0QsTUFBTSxVQUFVLHlCQUF5QjtJQUN2QyxPQUFPO1FBQ0wsT0FBTyxFQUFFLFlBQVk7UUFDckIsVUFBVSxFQUFFLHlCQUF5QjtRQUNyQyxLQUFLLEVBQUUsSUFBSTtRQUNYLElBQUksRUFBRSxDQUFDLFVBQVUsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLDJCQUEyQixDQUFDO0tBQ2hGLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UsIExhbmd1YWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU2VhcmNoU291cmNlIH0gZnJvbSAnLi9zb3VyY2UnO1xyXG5pbXBvcnQgeyBJTGF5ZXJTZWFyY2hTb3VyY2UsIElMYXllclNlYXJjaFJlc3VsdEZvcm1hdHRlciB9IGZyb20gJy4vaWxheWVyJztcclxuXHJcbi8qKlxyXG4gKiBJTGF5ZXIgc2VhcmNoIHJlc3VsdCBmb3JtYXR0ZXIgZmFjdG9yeVxyXG4gKiBAaWdub3JlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaWxheWVyU2VhcmNoUmVzdWx0Rm9ybWF0dGVyRmFjdG9yeShcclxuICBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZVxyXG4pIHtcclxuICByZXR1cm4gbmV3IElMYXllclNlYXJjaFJlc3VsdEZvcm1hdHRlcihsYW5ndWFnZVNlcnZpY2UpO1xyXG59XHJcblxyXG4vKipcclxuICogRnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgcHJvdmlkZXIgZm9yIHRoZSBJTGF5ZXIgc2VhcmNoIHJlc3VsdCBmb3JtYXR0ZXJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlSUxheWVyU2VhcmNoUmVzdWx0Rm9ybWF0dGVyKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICBwcm92aWRlOiBJTGF5ZXJTZWFyY2hSZXN1bHRGb3JtYXR0ZXIsXHJcbiAgICB1c2VGYWN0b3J5OiBpbGF5ZXJTZWFyY2hSZXN1bHRGb3JtYXR0ZXJGYWN0b3J5LFxyXG4gICAgZGVwczogW0xhbmd1YWdlU2VydmljZV1cclxuICB9O1xyXG59XHJcblxyXG4vKipcclxuICogSUxheWVyIHNlYXJjaCBzb3VyY2UgZmFjdG9yeVxyXG4gKiBAaWdub3JlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaWxheWVyU2VhcmNoU291cmNlRmFjdG9yeShcclxuICBodHRwOiBIdHRwQ2xpZW50LFxyXG4gIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gIGNvbmZpZzogQ29uZmlnU2VydmljZSxcclxuICBmb3JtYXR0ZXI6IElMYXllclNlYXJjaFJlc3VsdEZvcm1hdHRlclxyXG4pIHtcclxuICByZXR1cm4gbmV3IElMYXllclNlYXJjaFNvdXJjZShcclxuICAgIGh0dHAsXHJcbiAgICBsYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBjb25maWcuZ2V0Q29uZmlnKGBzZWFyY2hTb3VyY2VzLiR7SUxheWVyU2VhcmNoU291cmNlLmlkfWApLFxyXG4gICAgZm9ybWF0dGVyXHJcbiAgKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHByb3ZpZGVyIGZvciB0aGUgSUxheWVyIHNlYXJjaCBzb3VyY2VcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlSUxheWVyU2VhcmNoU291cmNlKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICBwcm92aWRlOiBTZWFyY2hTb3VyY2UsXHJcbiAgICB1c2VGYWN0b3J5OiBpbGF5ZXJTZWFyY2hTb3VyY2VGYWN0b3J5LFxyXG4gICAgbXVsdGk6IHRydWUsXHJcbiAgICBkZXBzOiBbSHR0cENsaWVudCwgTGFuZ3VhZ2VTZXJ2aWNlLCBDb25maWdTZXJ2aWNlLCBJTGF5ZXJTZWFyY2hSZXN1bHRGb3JtYXR0ZXJdXHJcbiAgfTtcclxufVxyXG4iXX0=