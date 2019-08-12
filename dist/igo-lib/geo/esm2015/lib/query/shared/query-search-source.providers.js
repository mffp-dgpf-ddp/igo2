/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ConfigService } from '@igo2/core';
import { SearchSource } from '../../search/shared/sources/source';
import { QuerySearchSource } from './query-search-source';
/**
 * Map search source factory
 * @ignore
 * @param {?} config
 * @return {?}
 */
export function querySearchSourceFactory(config) {
    return new QuerySearchSource(config.getConfig(`searchSources.${QuerySearchSource.id}`) || {});
}
/**
 * Function that returns a provider for the map search source
 * @return {?}
 */
export function provideQuerySearchSource() {
    return {
        provide: SearchSource,
        useFactory: querySearchSourceFactory,
        multi: true,
        deps: [ConfigService]
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktc2VhcmNoLXNvdXJjZS5wcm92aWRlcnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvcXVlcnkvc2hhcmVkL3F1ZXJ5LXNlYXJjaC1zb3VyY2UucHJvdmlkZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUVsRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7OztBQU0xRCxNQUFNLFVBQVUsd0JBQXdCLENBQUMsTUFBcUI7SUFDNUQsT0FBTyxJQUFJLGlCQUFpQixDQUMxQixNQUFNLENBQUMsU0FBUyxDQUFDLGlCQUFpQixpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FDaEUsQ0FBQztBQUNKLENBQUM7Ozs7O0FBS0QsTUFBTSxVQUFVLHdCQUF3QjtJQUN0QyxPQUFPO1FBQ0wsT0FBTyxFQUFFLFlBQVk7UUFDckIsVUFBVSxFQUFFLHdCQUF3QjtRQUNwQyxLQUFLLEVBQUUsSUFBSTtRQUNYLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQztLQUN0QixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZSB9IGZyb20gJy4uLy4uL3NlYXJjaC9zaGFyZWQvc291cmNlcy9zb3VyY2UnO1xyXG5cclxuaW1wb3J0IHsgUXVlcnlTZWFyY2hTb3VyY2UgfSBmcm9tICcuL3F1ZXJ5LXNlYXJjaC1zb3VyY2UnO1xyXG5cclxuLyoqXHJcbiAqIE1hcCBzZWFyY2ggc291cmNlIGZhY3RvcnlcclxuICogQGlnbm9yZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHF1ZXJ5U2VhcmNoU291cmNlRmFjdG9yeShjb25maWc6IENvbmZpZ1NlcnZpY2UpIHtcclxuICByZXR1cm4gbmV3IFF1ZXJ5U2VhcmNoU291cmNlKFxyXG4gICAgY29uZmlnLmdldENvbmZpZyhgc2VhcmNoU291cmNlcy4ke1F1ZXJ5U2VhcmNoU291cmNlLmlkfWApIHx8IHt9XHJcbiAgKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHByb3ZpZGVyIGZvciB0aGUgbWFwIHNlYXJjaCBzb3VyY2VcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlUXVlcnlTZWFyY2hTb3VyY2UoKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHByb3ZpZGU6IFNlYXJjaFNvdXJjZSxcclxuICAgIHVzZUZhY3Rvcnk6IHF1ZXJ5U2VhcmNoU291cmNlRmFjdG9yeSxcclxuICAgIG11bHRpOiB0cnVlLFxyXG4gICAgZGVwczogW0NvbmZpZ1NlcnZpY2VdXHJcbiAgfTtcclxufVxyXG4iXX0=