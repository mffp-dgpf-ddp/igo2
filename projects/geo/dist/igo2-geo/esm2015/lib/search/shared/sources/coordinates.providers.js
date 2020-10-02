/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ConfigService, LanguageService } from '@igo2/core';
import { SearchSource } from './source';
import { CoordinatesReverseSearchSource, CoordinatesSearchResultFormatter } from './coordinates';
import { ProjectionService } from '../../../map/shared/projection.service';
/**
 * ICherche search result formatter factory
 * @ignore
 * @param {?} languageService
 * @return {?}
 */
export function defaultCoordinatesSearchResultFormatterFactory(languageService) {
    return new CoordinatesSearchResultFormatter(languageService);
}
/**
 * Function that returns a provider for the ICherche search result formatter
 * @return {?}
 */
export function provideDefaultCoordinatesSearchResultFormatter() {
    return {
        provide: CoordinatesSearchResultFormatter,
        useFactory: defaultCoordinatesSearchResultFormatterFactory,
        deps: [LanguageService]
    };
}
/**
 * CoordinatesReverse search source factory
 * @ignore
 * @param {?} config
 * @param {?} languageService
 * @param {?} _projectionService
 * @return {?}
 */
export function CoordinatesReverseSearchSourceFactory(config, languageService, _projectionService) {
    return new CoordinatesReverseSearchSource(config.getConfig(`searchSources.${CoordinatesReverseSearchSource.id}`), languageService, ((/** @type {?} */ (config.getConfig('projections')))) || []);
}
/**
 * Function that returns a provider for the IChercheReverse search source
 * @return {?}
 */
export function provideCoordinatesReverseSearchSource() {
    return {
        provide: SearchSource,
        useFactory: CoordinatesReverseSearchSourceFactory,
        multi: true,
        deps: [ConfigService, LanguageService, ProjectionService]
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29vcmRpbmF0ZXMucHJvdmlkZXJzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zaGFyZWQvc291cmNlcy9jb29yZGluYXRlcy5wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTVELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDeEMsT0FBTyxFQUNMLDhCQUE4QixFQUM5QixnQ0FBZ0MsRUFDakMsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7Ozs7Ozs7QUFNM0UsTUFBTSxVQUFVLDhDQUE4QyxDQUM1RCxlQUFnQztJQUVoQyxPQUFPLElBQUksZ0NBQWdDLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDL0QsQ0FBQzs7Ozs7QUFLRCxNQUFNLFVBQVUsOENBQThDO0lBQzVELE9BQU87UUFDTCxPQUFPLEVBQUUsZ0NBQWdDO1FBQ3pDLFVBQVUsRUFBRSw4Q0FBOEM7UUFDMUQsSUFBSSxFQUFFLENBQUMsZUFBZSxDQUFDO0tBQ3hCLENBQUM7QUFDSixDQUFDOzs7Ozs7Ozs7QUFNRCxNQUFNLFVBQVUscUNBQXFDLENBQ25ELE1BQXFCLEVBQ3JCLGVBQWdDLEVBQ2hDLGtCQUFxQztJQUVyQyxPQUFPLElBQUksOEJBQThCLENBQ3ZDLE1BQU0sQ0FBQyxTQUFTLENBQUMsaUJBQWlCLDhCQUE4QixDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQ3RFLGVBQWUsRUFDZixDQUFDLG1CQUFBLE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEVBQWdCLENBQUMsSUFBSSxFQUFFLENBQ3hELENBQUM7QUFDSixDQUFDOzs7OztBQUtELE1BQU0sVUFBVSxxQ0FBcUM7SUFDbkQsT0FBTztRQUNMLE9BQU8sRUFBRSxZQUFZO1FBQ3JCLFVBQVUsRUFBRSxxQ0FBcUM7UUFDakQsS0FBSyxFQUFFLElBQUk7UUFDWCxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsZUFBZSxFQUFFLGlCQUFpQixDQUFDO0tBQzFELENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uZmlnU2VydmljZSwgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2UgfSBmcm9tICcuL3NvdXJjZSc7XHJcbmltcG9ydCB7XHJcbiAgQ29vcmRpbmF0ZXNSZXZlcnNlU2VhcmNoU291cmNlLFxyXG4gIENvb3JkaW5hdGVzU2VhcmNoUmVzdWx0Rm9ybWF0dGVyXHJcbn0gZnJvbSAnLi9jb29yZGluYXRlcyc7XHJcbmltcG9ydCB7IFByb2plY3Rpb24gfSBmcm9tICcuLi8uLi8uLi9tYXAvc2hhcmVkL3Byb2plY3Rpb24uaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IFByb2plY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vbWFwL3NoYXJlZC9wcm9qZWN0aW9uLnNlcnZpY2UnO1xyXG5cclxuLyoqXHJcbiAqIElDaGVyY2hlIHNlYXJjaCByZXN1bHQgZm9ybWF0dGVyIGZhY3RvcnlcclxuICogQGlnbm9yZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRDb29yZGluYXRlc1NlYXJjaFJlc3VsdEZvcm1hdHRlckZhY3RvcnkoXHJcbiAgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2VcclxuKSB7XHJcbiAgcmV0dXJuIG5ldyBDb29yZGluYXRlc1NlYXJjaFJlc3VsdEZvcm1hdHRlcihsYW5ndWFnZVNlcnZpY2UpO1xyXG59XHJcblxyXG4vKipcclxuICogRnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgcHJvdmlkZXIgZm9yIHRoZSBJQ2hlcmNoZSBzZWFyY2ggcmVzdWx0IGZvcm1hdHRlclxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVEZWZhdWx0Q29vcmRpbmF0ZXNTZWFyY2hSZXN1bHRGb3JtYXR0ZXIoKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHByb3ZpZGU6IENvb3JkaW5hdGVzU2VhcmNoUmVzdWx0Rm9ybWF0dGVyLFxyXG4gICAgdXNlRmFjdG9yeTogZGVmYXVsdENvb3JkaW5hdGVzU2VhcmNoUmVzdWx0Rm9ybWF0dGVyRmFjdG9yeSxcclxuICAgIGRlcHM6IFtMYW5ndWFnZVNlcnZpY2VdXHJcbiAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvb3JkaW5hdGVzUmV2ZXJzZSBzZWFyY2ggc291cmNlIGZhY3RvcnlcclxuICogQGlnbm9yZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIENvb3JkaW5hdGVzUmV2ZXJzZVNlYXJjaFNvdXJjZUZhY3RvcnkoXHJcbiAgY29uZmlnOiBDb25maWdTZXJ2aWNlLFxyXG4gIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gIF9wcm9qZWN0aW9uU2VydmljZTogUHJvamVjdGlvblNlcnZpY2VcclxuKSB7XHJcbiAgcmV0dXJuIG5ldyBDb29yZGluYXRlc1JldmVyc2VTZWFyY2hTb3VyY2UoXHJcbiAgICBjb25maWcuZ2V0Q29uZmlnKGBzZWFyY2hTb3VyY2VzLiR7Q29vcmRpbmF0ZXNSZXZlcnNlU2VhcmNoU291cmNlLmlkfWApLFxyXG4gICAgbGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgKGNvbmZpZy5nZXRDb25maWcoJ3Byb2plY3Rpb25zJykgYXMgUHJvamVjdGlvbltdKSB8fCBbXVxyXG4gICk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGdW5jdGlvbiB0aGF0IHJldHVybnMgYSBwcm92aWRlciBmb3IgdGhlIElDaGVyY2hlUmV2ZXJzZSBzZWFyY2ggc291cmNlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZUNvb3JkaW5hdGVzUmV2ZXJzZVNlYXJjaFNvdXJjZSgpIHtcclxuICByZXR1cm4ge1xyXG4gICAgcHJvdmlkZTogU2VhcmNoU291cmNlLFxyXG4gICAgdXNlRmFjdG9yeTogQ29vcmRpbmF0ZXNSZXZlcnNlU2VhcmNoU291cmNlRmFjdG9yeSxcclxuICAgIG11bHRpOiB0cnVlLFxyXG4gICAgZGVwczogW0NvbmZpZ1NlcnZpY2UsIExhbmd1YWdlU2VydmljZSwgUHJvamVjdGlvblNlcnZpY2VdXHJcbiAgfTtcclxufVxyXG4iXX0=