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
    return new QuerySearchSource(config.getConfig("searchSources." + QuerySearchSource.id) || {});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktc2VhcmNoLXNvdXJjZS5wcm92aWRlcnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvcXVlcnkvc2hhcmVkL3F1ZXJ5LXNlYXJjaC1zb3VyY2UucHJvdmlkZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUVsRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7OztBQU0xRCxNQUFNLFVBQVUsd0JBQXdCLENBQUMsTUFBcUI7SUFDNUQsT0FBTyxJQUFJLGlCQUFpQixDQUMxQixNQUFNLENBQUMsU0FBUyxDQUFDLG1CQUFpQixpQkFBaUIsQ0FBQyxFQUFJLENBQUMsSUFBSSxFQUFFLENBQ2hFLENBQUM7QUFDSixDQUFDOzs7OztBQUtELE1BQU0sVUFBVSx3QkFBd0I7SUFDdEMsT0FBTztRQUNMLE9BQU8sRUFBRSxZQUFZO1FBQ3JCLFVBQVUsRUFBRSx3QkFBd0I7UUFDcEMsS0FBSyxFQUFFLElBQUk7UUFDWCxJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUM7S0FDdEIsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2UgfSBmcm9tICcuLi8uLi9zZWFyY2gvc2hhcmVkL3NvdXJjZXMvc291cmNlJztcclxuXHJcbmltcG9ydCB7IFF1ZXJ5U2VhcmNoU291cmNlIH0gZnJvbSAnLi9xdWVyeS1zZWFyY2gtc291cmNlJztcclxuXHJcbi8qKlxyXG4gKiBNYXAgc2VhcmNoIHNvdXJjZSBmYWN0b3J5XHJcbiAqIEBpZ25vcmVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBxdWVyeVNlYXJjaFNvdXJjZUZhY3RvcnkoY29uZmlnOiBDb25maWdTZXJ2aWNlKSB7XHJcbiAgcmV0dXJuIG5ldyBRdWVyeVNlYXJjaFNvdXJjZShcclxuICAgIGNvbmZpZy5nZXRDb25maWcoYHNlYXJjaFNvdXJjZXMuJHtRdWVyeVNlYXJjaFNvdXJjZS5pZH1gKSB8fCB7fVxyXG4gICk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGdW5jdGlvbiB0aGF0IHJldHVybnMgYSBwcm92aWRlciBmb3IgdGhlIG1hcCBzZWFyY2ggc291cmNlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZVF1ZXJ5U2VhcmNoU291cmNlKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICBwcm92aWRlOiBTZWFyY2hTb3VyY2UsXHJcbiAgICB1c2VGYWN0b3J5OiBxdWVyeVNlYXJjaFNvdXJjZUZhY3RvcnksXHJcbiAgICBtdWx0aTogdHJ1ZSxcclxuICAgIGRlcHM6IFtDb25maWdTZXJ2aWNlXVxyXG4gIH07XHJcbn1cclxuIl19