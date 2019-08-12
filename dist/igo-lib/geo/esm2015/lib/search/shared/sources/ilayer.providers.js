/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { HttpClient } from '@angular/common/http';
import { ConfigService, LanguageService } from '@igo2/core';
import { SearchSource } from './source';
import { ILayerSearchSource } from './ilayer';
/**
 * ILayer search source factory
 * @ignore
 * @param {?} http
 * @param {?} languageService
 * @param {?} config
 * @return {?}
 */
export function ilayerSearchSourceFactory(http, languageService, config) {
    return new ILayerSearchSource(http, languageService, config.getConfig(`searchSources.${ILayerSearchSource.id}`));
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
        deps: [HttpClient, LanguageService, ConfigService]
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWxheWVyLnByb3ZpZGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gvc2hhcmVkL3NvdXJjZXMvaWxheWVyLnByb3ZpZGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRWxELE9BQU8sRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTVELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDeEMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sVUFBVSxDQUFDOzs7Ozs7Ozs7QUFNOUMsTUFBTSxVQUFVLHlCQUF5QixDQUN2QyxJQUFnQixFQUNoQixlQUFnQyxFQUNoQyxNQUFxQjtJQUVyQixPQUFPLElBQUksa0JBQWtCLENBQzNCLElBQUksRUFDSixlQUFlLEVBQ2YsTUFBTSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsa0JBQWtCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FDM0QsQ0FBQztBQUNKLENBQUM7Ozs7O0FBS0QsTUFBTSxVQUFVLHlCQUF5QjtJQUN2QyxPQUFPO1FBQ0wsT0FBTyxFQUFFLFlBQVk7UUFDckIsVUFBVSxFQUFFLHlCQUF5QjtRQUNyQyxLQUFLLEVBQUUsSUFBSTtRQUNYLElBQUksRUFBRSxDQUFDLFVBQVUsRUFBRSxlQUFlLEVBQUUsYUFBYSxDQUFDO0tBQ25ELENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UsIExhbmd1YWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU2VhcmNoU291cmNlIH0gZnJvbSAnLi9zb3VyY2UnO1xyXG5pbXBvcnQgeyBJTGF5ZXJTZWFyY2hTb3VyY2UgfSBmcm9tICcuL2lsYXllcic7XHJcblxyXG4vKipcclxuICogSUxheWVyIHNlYXJjaCBzb3VyY2UgZmFjdG9yeVxyXG4gKiBAaWdub3JlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaWxheWVyU2VhcmNoU291cmNlRmFjdG9yeShcclxuICBodHRwOiBIdHRwQ2xpZW50LFxyXG4gIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gIGNvbmZpZzogQ29uZmlnU2VydmljZVxyXG4pIHtcclxuICByZXR1cm4gbmV3IElMYXllclNlYXJjaFNvdXJjZShcclxuICAgIGh0dHAsXHJcbiAgICBsYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBjb25maWcuZ2V0Q29uZmlnKGBzZWFyY2hTb3VyY2VzLiR7SUxheWVyU2VhcmNoU291cmNlLmlkfWApXHJcbiAgKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHByb3ZpZGVyIGZvciB0aGUgSUxheWVyIHNlYXJjaCBzb3VyY2VcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlSUxheWVyU2VhcmNoU291cmNlKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICBwcm92aWRlOiBTZWFyY2hTb3VyY2UsXHJcbiAgICB1c2VGYWN0b3J5OiBpbGF5ZXJTZWFyY2hTb3VyY2VGYWN0b3J5LFxyXG4gICAgbXVsdGk6IHRydWUsXHJcbiAgICBkZXBzOiBbSHR0cENsaWVudCwgTGFuZ3VhZ2VTZXJ2aWNlLCBDb25maWdTZXJ2aWNlXVxyXG4gIH07XHJcbn1cclxuIl19