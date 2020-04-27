/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService, LanguageService } from '@igo2/core';
import { SearchSource } from './source';
import { IChercheSearchSource, IChercheSearchResultFormatter, IChercheReverseSearchSource } from './icherche';
/**
 * ICherche search result formatter factory
 * @ignore
 * @param {?} languageService
 * @return {?}
 */
export function defaultIChercheSearchResultFormatterFactory(languageService) {
    return new IChercheSearchResultFormatter(languageService);
}
/**
 * Function that returns a provider for the ICherche search result formatter
 * @return {?}
 */
export function provideDefaultIChercheSearchResultFormatter() {
    return {
        provide: IChercheSearchResultFormatter,
        useFactory: defaultIChercheSearchResultFormatterFactory,
        deps: [LanguageService]
    };
}
/**
 * ICherche search source factory
 * @ignore
 * @param {?} http
 * @param {?} languageService
 * @param {?} config
 * @param {?} formatter
 * @param {?} injector
 * @return {?}
 */
export function ichercheSearchSourceFactory(http, languageService, config, formatter, injector) {
    return new IChercheSearchSource(http, languageService, config.getConfig("searchSources." + IChercheSearchSource.id), formatter, injector);
}
/**
 * Function that returns a provider for the ICherche search source
 * @return {?}
 */
export function provideIChercheSearchSource() {
    return {
        provide: SearchSource,
        useFactory: ichercheSearchSourceFactory,
        multi: true,
        deps: [
            HttpClient,
            LanguageService,
            ConfigService,
            IChercheSearchResultFormatter,
            Injector
        ]
    };
}
/**
 * IChercheReverse search source factory
 * @ignore
 * @param {?} http
 * @param {?} languageService
 * @param {?} config
 * @param {?} injector
 * @return {?}
 */
export function ichercheReverseSearchSourceFactory(http, languageService, config, injector) {
    return new IChercheReverseSearchSource(http, languageService, config.getConfig("searchSources." + IChercheReverseSearchSource.id), injector);
}
/**
 * Function that returns a provider for the IChercheReverse search source
 * @return {?}
 */
export function provideIChercheReverseSearchSource() {
    return {
        provide: SearchSource,
        useFactory: ichercheReverseSearchSourceFactory,
        multi: true,
        deps: [HttpClient, LanguageService, ConfigService, Injector]
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNoZXJjaGUucHJvdmlkZXJzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zaGFyZWQvc291cmNlcy9pY2hlcmNoZS5wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRWxELE9BQU8sRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTVELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDeEMsT0FBTyxFQUNMLG9CQUFvQixFQUNwQiw2QkFBNkIsRUFDN0IsMkJBQTJCLEVBQzVCLE1BQU0sWUFBWSxDQUFDOzs7Ozs7O0FBTXBCLE1BQU0sVUFBVSwyQ0FBMkMsQ0FDekQsZUFBZ0M7SUFFaEMsT0FBTyxJQUFJLDZCQUE2QixDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQzVELENBQUM7Ozs7O0FBS0QsTUFBTSxVQUFVLDJDQUEyQztJQUN6RCxPQUFPO1FBQ0wsT0FBTyxFQUFFLDZCQUE2QjtRQUN0QyxVQUFVLEVBQUUsMkNBQTJDO1FBQ3ZELElBQUksRUFBRSxDQUFDLGVBQWUsQ0FBQztLQUN4QixDQUFDO0FBQ0osQ0FBQzs7Ozs7Ozs7Ozs7QUFNRCxNQUFNLFVBQVUsMkJBQTJCLENBQ3pDLElBQWdCLEVBQ2hCLGVBQWdDLEVBQ2hDLE1BQXFCLEVBQ3JCLFNBQXdDLEVBQ3hDLFFBQWtCO0lBRWxCLE9BQU8sSUFBSSxvQkFBb0IsQ0FDN0IsSUFBSSxFQUNKLGVBQWUsRUFDZixNQUFNLENBQUMsU0FBUyxDQUFDLG1CQUFpQixvQkFBb0IsQ0FBQyxFQUFJLENBQUMsRUFDNUQsU0FBUyxFQUNULFFBQVEsQ0FDVCxDQUFDO0FBQ0osQ0FBQzs7Ozs7QUFLRCxNQUFNLFVBQVUsMkJBQTJCO0lBQ3pDLE9BQU87UUFDTCxPQUFPLEVBQUUsWUFBWTtRQUNyQixVQUFVLEVBQUUsMkJBQTJCO1FBQ3ZDLEtBQUssRUFBRSxJQUFJO1FBQ1gsSUFBSSxFQUFFO1lBQ0osVUFBVTtZQUNWLGVBQWU7WUFDZixhQUFhO1lBQ2IsNkJBQTZCO1lBQzdCLFFBQVE7U0FDVDtLQUNGLENBQUM7QUFDSixDQUFDOzs7Ozs7Ozs7O0FBTUQsTUFBTSxVQUFVLGtDQUFrQyxDQUNoRCxJQUFnQixFQUNoQixlQUFnQyxFQUNoQyxNQUFxQixFQUNyQixRQUFrQjtJQUVsQixPQUFPLElBQUksMkJBQTJCLENBQ3BDLElBQUksRUFDSixlQUFlLEVBQ2YsTUFBTSxDQUFDLFNBQVMsQ0FBQyxtQkFBaUIsMkJBQTJCLENBQUMsRUFBSSxDQUFDLEVBQ25FLFFBQVEsQ0FDVCxDQUFDO0FBQ0osQ0FBQzs7Ozs7QUFLRCxNQUFNLFVBQVUsa0NBQWtDO0lBQ2hELE9BQU87UUFDTCxPQUFPLEVBQUUsWUFBWTtRQUNyQixVQUFVLEVBQUUsa0NBQWtDO1FBQzlDLEtBQUssRUFBRSxJQUFJO1FBQ1gsSUFBSSxFQUFFLENBQUMsVUFBVSxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsUUFBUSxDQUFDO0tBQzdELENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UsIExhbmd1YWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU2VhcmNoU291cmNlIH0gZnJvbSAnLi9zb3VyY2UnO1xyXG5pbXBvcnQge1xyXG4gIElDaGVyY2hlU2VhcmNoU291cmNlLFxyXG4gIElDaGVyY2hlU2VhcmNoUmVzdWx0Rm9ybWF0dGVyLFxyXG4gIElDaGVyY2hlUmV2ZXJzZVNlYXJjaFNvdXJjZVxyXG59IGZyb20gJy4vaWNoZXJjaGUnO1xyXG5cclxuLyoqXHJcbiAqIElDaGVyY2hlIHNlYXJjaCByZXN1bHQgZm9ybWF0dGVyIGZhY3RvcnlcclxuICogQGlnbm9yZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRJQ2hlcmNoZVNlYXJjaFJlc3VsdEZvcm1hdHRlckZhY3RvcnkoXHJcbiAgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2VcclxuKSB7XHJcbiAgcmV0dXJuIG5ldyBJQ2hlcmNoZVNlYXJjaFJlc3VsdEZvcm1hdHRlcihsYW5ndWFnZVNlcnZpY2UpO1xyXG59XHJcblxyXG4vKipcclxuICogRnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgcHJvdmlkZXIgZm9yIHRoZSBJQ2hlcmNoZSBzZWFyY2ggcmVzdWx0IGZvcm1hdHRlclxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVEZWZhdWx0SUNoZXJjaGVTZWFyY2hSZXN1bHRGb3JtYXR0ZXIoKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHByb3ZpZGU6IElDaGVyY2hlU2VhcmNoUmVzdWx0Rm9ybWF0dGVyLFxyXG4gICAgdXNlRmFjdG9yeTogZGVmYXVsdElDaGVyY2hlU2VhcmNoUmVzdWx0Rm9ybWF0dGVyRmFjdG9yeSxcclxuICAgIGRlcHM6IFtMYW5ndWFnZVNlcnZpY2VdXHJcbiAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIElDaGVyY2hlIHNlYXJjaCBzb3VyY2UgZmFjdG9yeVxyXG4gKiBAaWdub3JlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaWNoZXJjaGVTZWFyY2hTb3VyY2VGYWN0b3J5KFxyXG4gIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgY29uZmlnOiBDb25maWdTZXJ2aWNlLFxyXG4gIGZvcm1hdHRlcjogSUNoZXJjaGVTZWFyY2hSZXN1bHRGb3JtYXR0ZXIsXHJcbiAgaW5qZWN0b3I6IEluamVjdG9yXHJcbikge1xyXG4gIHJldHVybiBuZXcgSUNoZXJjaGVTZWFyY2hTb3VyY2UoXHJcbiAgICBodHRwLFxyXG4gICAgbGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgY29uZmlnLmdldENvbmZpZyhgc2VhcmNoU291cmNlcy4ke0lDaGVyY2hlU2VhcmNoU291cmNlLmlkfWApLFxyXG4gICAgZm9ybWF0dGVyLFxyXG4gICAgaW5qZWN0b3JcclxuICApO1xyXG59XHJcblxyXG4vKipcclxuICogRnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgcHJvdmlkZXIgZm9yIHRoZSBJQ2hlcmNoZSBzZWFyY2ggc291cmNlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZUlDaGVyY2hlU2VhcmNoU291cmNlKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICBwcm92aWRlOiBTZWFyY2hTb3VyY2UsXHJcbiAgICB1c2VGYWN0b3J5OiBpY2hlcmNoZVNlYXJjaFNvdXJjZUZhY3RvcnksXHJcbiAgICBtdWx0aTogdHJ1ZSxcclxuICAgIGRlcHM6IFtcclxuICAgICAgSHR0cENsaWVudCxcclxuICAgICAgTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgICBDb25maWdTZXJ2aWNlLFxyXG4gICAgICBJQ2hlcmNoZVNlYXJjaFJlc3VsdEZvcm1hdHRlcixcclxuICAgICAgSW5qZWN0b3JcclxuICAgIF1cclxuICB9O1xyXG59XHJcblxyXG4vKipcclxuICogSUNoZXJjaGVSZXZlcnNlIHNlYXJjaCBzb3VyY2UgZmFjdG9yeVxyXG4gKiBAaWdub3JlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaWNoZXJjaGVSZXZlcnNlU2VhcmNoU291cmNlRmFjdG9yeShcclxuICBodHRwOiBIdHRwQ2xpZW50LFxyXG4gIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gIGNvbmZpZzogQ29uZmlnU2VydmljZSxcclxuICBpbmplY3RvcjogSW5qZWN0b3JcclxuKSB7XHJcbiAgcmV0dXJuIG5ldyBJQ2hlcmNoZVJldmVyc2VTZWFyY2hTb3VyY2UoXHJcbiAgICBodHRwLFxyXG4gICAgbGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgY29uZmlnLmdldENvbmZpZyhgc2VhcmNoU291cmNlcy4ke0lDaGVyY2hlUmV2ZXJzZVNlYXJjaFNvdXJjZS5pZH1gKSxcclxuICAgIGluamVjdG9yXHJcbiAgKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHByb3ZpZGVyIGZvciB0aGUgSUNoZXJjaGVSZXZlcnNlIHNlYXJjaCBzb3VyY2VcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlSUNoZXJjaGVSZXZlcnNlU2VhcmNoU291cmNlKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICBwcm92aWRlOiBTZWFyY2hTb3VyY2UsXHJcbiAgICB1c2VGYWN0b3J5OiBpY2hlcmNoZVJldmVyc2VTZWFyY2hTb3VyY2VGYWN0b3J5LFxyXG4gICAgbXVsdGk6IHRydWUsXHJcbiAgICBkZXBzOiBbSHR0cENsaWVudCwgTGFuZ3VhZ2VTZXJ2aWNlLCBDb25maWdTZXJ2aWNlLCBJbmplY3Rvcl1cclxuICB9O1xyXG59XHJcbiJdfQ==