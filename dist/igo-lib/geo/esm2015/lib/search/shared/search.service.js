/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { stringToLonLat } from '../../map';
import { SearchSourceService } from './search-source.service';
import { sourceCanSearch, sourceCanReverseSearch } from './search.utils';
import * as i0 from "@angular/core";
import * as i1 from "./search-source.service";
/**
 * This service perform researches in all the search sources enabled.
 * It returns Research objects who's 'request' property needs to be
 * subscribed to in order to trigger the research. This services has
 * keeps internal state of the researches it performed
 * and the results they yielded.
 */
export class SearchService {
    /**
     * @param {?} searchSourceService
     */
    constructor(searchSourceService) {
        this.searchSourceService = searchSourceService;
    }
    /**
     * Perform a research by text
     * @param {?} term Any text
     * @param {?=} options
     * @return {?} Researches
     */
    search(term, options) {
        if (!this.termIsValid(term)) {
            return [];
        }
        /** @type {?} */
        const lonLat = stringToLonLat(term);
        if (lonLat !== undefined) {
            return this.reverseSearch(lonLat);
        }
        /** @type {?} */
        const sources = this.searchSourceService.getEnabledSources()
            .filter(sourceCanSearch);
        return this.searchSources(sources, term, options || {});
    }
    /**
     * Perform a research by lon/lat
     * @param {?} lonLat Any lon/lat coordinates
     * @param {?=} options
     * @return {?} Researches
     */
    reverseSearch(lonLat, options) {
        /** @type {?} */
        const sources = this.searchSourceService.getEnabledSources()
            .filter(sourceCanReverseSearch);
        return this.reverseSearchSources(sources, lonLat, options || {});
    }
    /**
     * Create a text research out of all given search sources
     * @private
     * @param {?} sources Search sources that implement TextSearch
     * @param {?} term Search term
     * @param {?} options
     * @return {?} Observable of Researches
     */
    searchSources(sources, term, options) {
        return sources.map((/**
         * @param {?} source
         * @return {?}
         */
        (source) => {
            return {
                request: ((/** @type {?} */ ((/** @type {?} */ (source))))).search(term, options),
                reverse: false,
                source
            };
        }));
    }
    /**
     * Create a reverse research out of all given search sources
     * @private
     * @param {?} sources Search sources that implement ReverseSearch
     * @param {?} lonLat Any lon/lat coordinates
     * @param {?} options
     * @return {?} Observable of Researches
     */
    reverseSearchSources(sources, lonLat, options) {
        return sources.map((/**
         * @param {?} source
         * @return {?}
         */
        (source) => {
            return {
                request: ((/** @type {?} */ ((/** @type {?} */ (source))))).reverseSearch(lonLat, options),
                reverse: true,
                source
            };
        }));
    }
    /**
     * Validate that a search term is valid
     * @private
     * @param {?} term Search term
     * @return {?} True if the search term is valid
     */
    termIsValid(term) {
        return typeof term === 'string' && term !== '';
    }
}
SearchService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
SearchService.ctorParameters = () => [
    { type: SearchSourceService }
];
/** @nocollapse */ SearchService.ngInjectableDef = i0.defineInjectable({ factory: function SearchService_Factory() { return new SearchService(i0.inject(i1.SearchSourceService)); }, token: SearchService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    SearchService.prototype.searchSourceService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NoYXJlZC9zZWFyY2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBSTNDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRTlELE9BQU8sRUFBRSxlQUFlLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7OztBQVl6RSxNQUFNLE9BQU8sYUFBYTs7OztJQUV4QixZQUFvQixtQkFBd0M7UUFBeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtJQUFHLENBQUM7Ozs7Ozs7SUFPaEUsTUFBTSxDQUFDLElBQVksRUFBRSxPQUEyQjtRQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMzQixPQUFPLEVBQUUsQ0FBQztTQUNYOztjQUVLLE1BQU0sR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDO1FBQ25DLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUN4QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbkM7O2NBRUssT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxpQkFBaUIsRUFBRTthQUN6RCxNQUFNLENBQUMsZUFBZSxDQUFDO1FBQzFCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQztJQUMxRCxDQUFDOzs7Ozs7O0lBT0QsYUFBYSxDQUFDLE1BQXdCLEVBQUUsT0FBOEI7O2NBQzlELE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsaUJBQWlCLEVBQUU7YUFDekQsTUFBTSxDQUFDLHNCQUFzQixDQUFDO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ25FLENBQUM7Ozs7Ozs7OztJQVFPLGFBQWEsQ0FBQyxPQUF1QixFQUFFLElBQVksRUFBRSxPQUEwQjtRQUNyRixPQUFPLE9BQU8sQ0FBQyxHQUFHOzs7O1FBQUMsQ0FBQyxNQUFvQixFQUFFLEVBQUU7WUFDMUMsT0FBTztnQkFDTCxPQUFPLEVBQUUsQ0FBQyxtQkFBQSxtQkFBQSxNQUFNLEVBQU8sRUFBYyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUM7Z0JBQzVELE9BQU8sRUFBRSxLQUFLO2dCQUNkLE1BQU07YUFDUCxDQUFDO1FBQ0osQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7Ozs7SUFRTyxvQkFBb0IsQ0FDMUIsT0FBdUIsRUFDdkIsTUFBd0IsRUFDeEIsT0FBNkI7UUFFN0IsT0FBTyxPQUFPLENBQUMsR0FBRzs7OztRQUFDLENBQUMsTUFBb0IsRUFBRSxFQUFFO1lBQzFDLE9BQU87Z0JBQ0wsT0FBTyxFQUFFLENBQUMsbUJBQUEsbUJBQUEsTUFBTSxFQUFPLEVBQWlCLENBQUMsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQztnQkFDeEUsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsTUFBTTthQUNQLENBQUM7UUFDSixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7Ozs7SUFPTyxXQUFXLENBQUMsSUFBWTtRQUM5QixPQUFPLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDO0lBQ2pELENBQUM7OztZQWpGRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFiUSxtQkFBbUI7Ozs7Ozs7O0lBZ0JkLDRDQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IHN0cmluZ1RvTG9uTGF0IH0gZnJvbSAnLi4vLi4vbWFwJztcclxuXHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZSwgVGV4dFNlYXJjaCwgUmV2ZXJzZVNlYXJjaCB9IGZyb20gJy4vc291cmNlcy9zb3VyY2UnO1xyXG5pbXBvcnQgeyBUZXh0U2VhcmNoT3B0aW9ucywgUmV2ZXJzZVNlYXJjaE9wdGlvbnMgfSBmcm9tICcuL3NvdXJjZXMvc291cmNlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2VTZXJ2aWNlIH0gZnJvbSAnLi9zZWFyY2gtc291cmNlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBSZXNlYXJjaCB9IGZyb20gJy4vc2VhcmNoLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBzb3VyY2VDYW5TZWFyY2gsIHNvdXJjZUNhblJldmVyc2VTZWFyY2ggfSBmcm9tICcuL3NlYXJjaC51dGlscyc7XHJcblxyXG4vKipcclxuICogVGhpcyBzZXJ2aWNlIHBlcmZvcm0gcmVzZWFyY2hlcyBpbiBhbGwgdGhlIHNlYXJjaCBzb3VyY2VzIGVuYWJsZWQuXHJcbiAqIEl0IHJldHVybnMgUmVzZWFyY2ggb2JqZWN0cyB3aG8ncyAncmVxdWVzdCcgcHJvcGVydHkgbmVlZHMgdG8gYmVcclxuICogc3Vic2NyaWJlZCB0byBpbiBvcmRlciB0byB0cmlnZ2VyIHRoZSByZXNlYXJjaC4gVGhpcyBzZXJ2aWNlcyBoYXNcclxuICoga2VlcHMgaW50ZXJuYWwgc3RhdGUgb2YgdGhlIHJlc2VhcmNoZXMgaXQgcGVyZm9ybWVkXHJcbiAqIGFuZCB0aGUgcmVzdWx0cyB0aGV5IHlpZWxkZWQuXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hTZXJ2aWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZWFyY2hTb3VyY2VTZXJ2aWNlOiBTZWFyY2hTb3VyY2VTZXJ2aWNlKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBQZXJmb3JtIGEgcmVzZWFyY2ggYnkgdGV4dFxyXG4gICAqIEBwYXJhbSB0ZXJtIEFueSB0ZXh0XHJcbiAgICogQHJldHVybnMgUmVzZWFyY2hlc1xyXG4gICAqL1xyXG4gIHNlYXJjaCh0ZXJtOiBzdHJpbmcsIG9wdGlvbnM/OiBUZXh0U2VhcmNoT3B0aW9ucyk6IFJlc2VhcmNoW10ge1xyXG4gICAgaWYgKCF0aGlzLnRlcm1Jc1ZhbGlkKHRlcm0pKSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBsb25MYXQgPSBzdHJpbmdUb0xvbkxhdCh0ZXJtKTtcclxuICAgIGlmIChsb25MYXQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5yZXZlcnNlU2VhcmNoKGxvbkxhdCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc291cmNlcyA9IHRoaXMuc2VhcmNoU291cmNlU2VydmljZS5nZXRFbmFibGVkU291cmNlcygpXHJcbiAgICAgIC5maWx0ZXIoc291cmNlQ2FuU2VhcmNoKTtcclxuICAgIHJldHVybiB0aGlzLnNlYXJjaFNvdXJjZXMoc291cmNlcywgdGVybSwgb3B0aW9ucyB8fCB7fSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQZXJmb3JtIGEgcmVzZWFyY2ggYnkgbG9uL2xhdFxyXG4gICAqIEBwYXJhbSBsb25MYXQgQW55IGxvbi9sYXQgY29vcmRpbmF0ZXNcclxuICAgKiBAcmV0dXJucyBSZXNlYXJjaGVzXHJcbiAgICovXHJcbiAgcmV2ZXJzZVNlYXJjaChsb25MYXQ6IFtudW1iZXIsIG51bWJlcl0sIG9wdGlvbnM/OiBSZXZlcnNlU2VhcmNoT3B0aW9ucykge1xyXG4gICAgY29uc3Qgc291cmNlcyA9IHRoaXMuc2VhcmNoU291cmNlU2VydmljZS5nZXRFbmFibGVkU291cmNlcygpXHJcbiAgICAgIC5maWx0ZXIoc291cmNlQ2FuUmV2ZXJzZVNlYXJjaCk7XHJcbiAgICByZXR1cm4gdGhpcy5yZXZlcnNlU2VhcmNoU291cmNlcyhzb3VyY2VzLCBsb25MYXQsIG9wdGlvbnMgfHwge30pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgdGV4dCByZXNlYXJjaCBvdXQgb2YgYWxsIGdpdmVuIHNlYXJjaCBzb3VyY2VzXHJcbiAgICogQHBhcmFtIHNvdXJjZXMgU2VhcmNoIHNvdXJjZXMgdGhhdCBpbXBsZW1lbnQgVGV4dFNlYXJjaFxyXG4gICAqIEBwYXJhbSB0ZXJtIFNlYXJjaCB0ZXJtXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBSZXNlYXJjaGVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZWFyY2hTb3VyY2VzKHNvdXJjZXM6IFNlYXJjaFNvdXJjZVtdLCB0ZXJtOiBzdHJpbmcsIG9wdGlvbnM6IFRleHRTZWFyY2hPcHRpb25zKTogUmVzZWFyY2hbXSB7XHJcbiAgICByZXR1cm4gc291cmNlcy5tYXAoKHNvdXJjZTogU2VhcmNoU291cmNlKSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVxdWVzdDogKHNvdXJjZSBhcyBhbnkgYXMgVGV4dFNlYXJjaCkuc2VhcmNoKHRlcm0sIG9wdGlvbnMpLFxyXG4gICAgICAgIHJldmVyc2U6IGZhbHNlLFxyXG4gICAgICAgIHNvdXJjZVxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYSByZXZlcnNlIHJlc2VhcmNoIG91dCBvZiBhbGwgZ2l2ZW4gc2VhcmNoIHNvdXJjZXNcclxuICAgKiBAcGFyYW0gc291cmNlcyBTZWFyY2ggc291cmNlcyB0aGF0IGltcGxlbWVudCBSZXZlcnNlU2VhcmNoXHJcbiAgICogQHBhcmFtIGxvbkxhdCBBbnkgbG9uL2xhdCBjb29yZGluYXRlc1xyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgUmVzZWFyY2hlc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgcmV2ZXJzZVNlYXJjaFNvdXJjZXMoXHJcbiAgICBzb3VyY2VzOiBTZWFyY2hTb3VyY2VbXSxcclxuICAgIGxvbkxhdDogW251bWJlciwgbnVtYmVyXSxcclxuICAgIG9wdGlvbnM6IFJldmVyc2VTZWFyY2hPcHRpb25zXHJcbiAgKTogUmVzZWFyY2hbXSB7XHJcbiAgICByZXR1cm4gc291cmNlcy5tYXAoKHNvdXJjZTogU2VhcmNoU291cmNlKSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVxdWVzdDogKHNvdXJjZSBhcyBhbnkgYXMgUmV2ZXJzZVNlYXJjaCkucmV2ZXJzZVNlYXJjaChsb25MYXQsIG9wdGlvbnMpLFxyXG4gICAgICAgIHJldmVyc2U6IHRydWUsXHJcbiAgICAgICAgc291cmNlXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFZhbGlkYXRlIHRoYXQgYSBzZWFyY2ggdGVybSBpcyB2YWxpZFxyXG4gICAqIEBwYXJhbSB0ZXJtIFNlYXJjaCB0ZXJtXHJcbiAgICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgc2VhcmNoIHRlcm0gaXMgdmFsaWRcclxuICAgKi9cclxuICBwcml2YXRlIHRlcm1Jc1ZhbGlkKHRlcm06IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB0ZXJtID09PSAnc3RyaW5nJyAmJiB0ZXJtICE9PSAnJztcclxuICB9XHJcbn1cclxuIl19