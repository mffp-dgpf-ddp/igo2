/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { SearchSource } from './sources/source';
import { SearchSourceService } from './search-source.service';
/**
 * Search source factory
 * @ignore
 * @param {?} sources
 * @return {?}
 */
export function searchSourceServiceFactory(sources) {
    return new SearchSourceService(sources);
}
/**
 * Function that returns a provider for the SearchSource service
 * @return {?}
 */
export function provideSearchSourceService() {
    return {
        provide: SearchSourceService,
        useFactory: searchSourceServiceFactory,
        deps: [SearchSource]
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXNvdXJjZS1zZXJ2aWNlLnByb3ZpZGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gvc2hhcmVkL3NlYXJjaC1zb3VyY2Utc2VydmljZS5wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7OztBQU05RCxNQUFNLFVBQVUsMEJBQTBCLENBQUMsT0FBdUI7SUFDaEUsT0FBTyxJQUFJLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzFDLENBQUM7Ozs7O0FBS0QsTUFBTSxVQUFVLDBCQUEwQjtJQUN4QyxPQUFPO1FBQ0wsT0FBTyxFQUFFLG1CQUFtQjtRQUM1QixVQUFVLEVBQUUsMEJBQTBCO1FBQ3RDLElBQUksRUFBRSxDQUFDLFlBQVksQ0FBQztLQUNyQixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlYXJjaFNvdXJjZSB9IGZyb20gJy4vc291cmNlcy9zb3VyY2UnO1xyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2VTZXJ2aWNlIH0gZnJvbSAnLi9zZWFyY2gtc291cmNlLnNlcnZpY2UnO1xyXG5cclxuLyoqXHJcbiAqIFNlYXJjaCBzb3VyY2UgZmFjdG9yeVxyXG4gKiBAaWdub3JlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2VhcmNoU291cmNlU2VydmljZUZhY3Rvcnkoc291cmNlczogU2VhcmNoU291cmNlW10pIHtcclxuICByZXR1cm4gbmV3IFNlYXJjaFNvdXJjZVNlcnZpY2Uoc291cmNlcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGdW5jdGlvbiB0aGF0IHJldHVybnMgYSBwcm92aWRlciBmb3IgdGhlIFNlYXJjaFNvdXJjZSBzZXJ2aWNlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZVNlYXJjaFNvdXJjZVNlcnZpY2UoKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHByb3ZpZGU6IFNlYXJjaFNvdXJjZVNlcnZpY2UsXHJcbiAgICB1c2VGYWN0b3J5OiBzZWFyY2hTb3VyY2VTZXJ2aWNlRmFjdG9yeSxcclxuICAgIGRlcHM6IFtTZWFyY2hTb3VyY2VdXHJcbiAgfTtcclxufVxyXG4iXX0=