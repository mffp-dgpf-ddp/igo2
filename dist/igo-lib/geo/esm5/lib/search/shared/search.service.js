/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { stringToLonLat } from '../../map';
import { MapService } from '../../map/shared/map.service';
import { SearchSourceService } from './search-source.service';
import { sourceCanSearch, sourceCanReverseSearch } from './search.utils';
import * as i0 from "@angular/core";
import * as i1 from "./search-source.service";
import * as i2 from "../../map/shared/map.service";
/**
 * This service perform researches in all the search sources enabled.
 * It returns Research objects who's 'request' property needs to be
 * subscribed to in order to trigger the research. This services has
 * keeps internal state of the researches it performed
 * and the results they yielded.
 */
var SearchService = /** @class */ (function () {
    function SearchService(searchSourceService, mapService) {
        this.searchSourceService = searchSourceService;
        this.mapService = mapService;
    }
    /**
     * Perform a research by text
     * @param term Any text
     * @returns Researches
     */
    /**
     * Perform a research by text
     * @param {?} term Any text
     * @param {?=} options
     * @return {?} Researches
     */
    SearchService.prototype.search = /**
     * Perform a research by text
     * @param {?} term Any text
     * @param {?=} options
     * @return {?} Researches
     */
    function (term, options) {
        if (!this.termIsValid(term)) {
            return [];
        }
        /** @type {?} */
        var response = stringToLonLat(term, this.mapService.getMap().projection);
        if (response.lonLat) {
            return this.reverseSearch(response.lonLat);
        }
        else {
            console.log(response.message);
        }
        /** @type {?} */
        var sources = this.searchSourceService.getEnabledSources()
            .filter(sourceCanSearch);
        return this.searchSources(sources, term, options || {});
    };
    /**
     * Perform a research by lon/lat
     * @param lonLat Any lon/lat coordinates
     * @returns Researches
     */
    /**
     * Perform a research by lon/lat
     * @param {?} lonLat Any lon/lat coordinates
     * @param {?=} options
     * @return {?} Researches
     */
    SearchService.prototype.reverseSearch = /**
     * Perform a research by lon/lat
     * @param {?} lonLat Any lon/lat coordinates
     * @param {?=} options
     * @return {?} Researches
     */
    function (lonLat, options) {
        /** @type {?} */
        var sources = this.searchSourceService.getEnabledSources()
            .filter(sourceCanReverseSearch);
        return this.reverseSearchSources(sources, lonLat, options || {});
    };
    /**
     * Create a text research out of all given search sources
     * @param sources Search sources that implement TextSearch
     * @param term Search term
     * @returns Observable of Researches
     */
    /**
     * Create a text research out of all given search sources
     * @private
     * @param {?} sources Search sources that implement TextSearch
     * @param {?} term Search term
     * @param {?} options
     * @return {?} Observable of Researches
     */
    SearchService.prototype.searchSources = /**
     * Create a text research out of all given search sources
     * @private
     * @param {?} sources Search sources that implement TextSearch
     * @param {?} term Search term
     * @param {?} options
     * @return {?} Observable of Researches
     */
    function (sources, term, options) {
        return sources.map((/**
         * @param {?} source
         * @return {?}
         */
        function (source) {
            return {
                request: ((/** @type {?} */ ((/** @type {?} */ (source))))).search(term, options),
                reverse: false,
                source: source
            };
        }));
    };
    /**
     * Create a reverse research out of all given search sources
     * @param sources Search sources that implement ReverseSearch
     * @param lonLat Any lon/lat coordinates
     * @returns Observable of Researches
     */
    /**
     * Create a reverse research out of all given search sources
     * @private
     * @param {?} sources Search sources that implement ReverseSearch
     * @param {?} lonLat Any lon/lat coordinates
     * @param {?} options
     * @return {?} Observable of Researches
     */
    SearchService.prototype.reverseSearchSources = /**
     * Create a reverse research out of all given search sources
     * @private
     * @param {?} sources Search sources that implement ReverseSearch
     * @param {?} lonLat Any lon/lat coordinates
     * @param {?} options
     * @return {?} Observable of Researches
     */
    function (sources, lonLat, options) {
        return sources.map((/**
         * @param {?} source
         * @return {?}
         */
        function (source) {
            return {
                request: ((/** @type {?} */ ((/** @type {?} */ (source))))).reverseSearch(lonLat, options),
                reverse: true,
                source: source
            };
        }));
    };
    /**
     * Validate that a search term is valid
     * @param term Search term
     * @returns True if the search term is valid
     */
    /**
     * Validate that a search term is valid
     * @private
     * @param {?} term Search term
     * @return {?} True if the search term is valid
     */
    SearchService.prototype.termIsValid = /**
     * Validate that a search term is valid
     * @private
     * @param {?} term Search term
     * @return {?} True if the search term is valid
     */
    function (term) {
        return typeof term === 'string' && term !== '';
    };
    SearchService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    SearchService.ctorParameters = function () { return [
        { type: SearchSourceService },
        { type: MapService }
    ]; };
    /** @nocollapse */ SearchService.ngInjectableDef = i0.defineInjectable({ factory: function SearchService_Factory() { return new SearchService(i0.inject(i1.SearchSourceService), i0.inject(i2.MapService)); }, token: SearchService, providedIn: "root" });
    return SearchService;
}());
export { SearchService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    SearchService.prototype.searchSourceService;
    /**
     * @type {?}
     * @private
     */
    SearchService.prototype.mapService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NoYXJlZC9zZWFyY2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUkxRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU5RCxPQUFPLEVBQUUsZUFBZSxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7Ozs7O0FBU3pFO0lBS0UsdUJBQW9CLG1CQUF3QyxFQUFVLFVBQXNCO1FBQXhFLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQUcsQ0FBQztJQUVoRzs7OztPQUlHOzs7Ozs7O0lBQ0gsOEJBQU07Ozs7OztJQUFOLFVBQU8sSUFBWSxFQUFFLE9BQTJCO1FBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzNCLE9BQU8sRUFBRSxDQUFDO1NBQ1g7O1lBRUssUUFBUSxHQUFHLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUM7UUFDMUUsSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ25CLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDNUM7YUFBTTtZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQy9COztZQUVLLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsaUJBQWlCLEVBQUU7YUFDekQsTUFBTSxDQUFDLGVBQWUsQ0FBQztRQUMxQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLElBQUksRUFBRSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCxxQ0FBYTs7Ozs7O0lBQWIsVUFBYyxNQUF3QixFQUFFLE9BQThCOztZQUM5RCxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixFQUFFO2FBQ3pELE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQztRQUNqQyxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7OztJQUNLLHFDQUFhOzs7Ozs7OztJQUFyQixVQUFzQixPQUF1QixFQUFFLElBQVksRUFBRSxPQUEwQjtRQUNyRixPQUFPLE9BQU8sQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQyxNQUFvQjtZQUN0QyxPQUFPO2dCQUNMLE9BQU8sRUFBRSxDQUFDLG1CQUFBLG1CQUFBLE1BQU0sRUFBTyxFQUFjLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQztnQkFDNUQsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsTUFBTSxRQUFBO2FBQ1AsQ0FBQztRQUNKLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7OztPQUtHOzs7Ozs7Ozs7SUFDSyw0Q0FBb0I7Ozs7Ozs7O0lBQTVCLFVBQ0UsT0FBdUIsRUFDdkIsTUFBd0IsRUFDeEIsT0FBNkI7UUFFN0IsT0FBTyxPQUFPLENBQUMsR0FBRzs7OztRQUFDLFVBQUMsTUFBb0I7WUFDdEMsT0FBTztnQkFDTCxPQUFPLEVBQUUsQ0FBQyxtQkFBQSxtQkFBQSxNQUFNLEVBQU8sRUFBaUIsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDO2dCQUN4RSxPQUFPLEVBQUUsSUFBSTtnQkFDYixNQUFNLFFBQUE7YUFDUCxDQUFDO1FBQ0osQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNLLG1DQUFXOzs7Ozs7SUFBbkIsVUFBb0IsSUFBWTtRQUM5QixPQUFPLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDO0lBQ2pELENBQUM7O2dCQW5GRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQWJRLG1CQUFtQjtnQkFKbkIsVUFBVTs7O3dCQUhuQjtDQXNHQyxBQXBGRCxJQW9GQztTQWpGWSxhQUFhOzs7Ozs7SUFFWiw0Q0FBZ0Q7Ozs7O0lBQUUsbUNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgc3RyaW5nVG9Mb25MYXQgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbWFwL3NoYXJlZC9tYXAuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2UsIFRleHRTZWFyY2gsIFJldmVyc2VTZWFyY2ggfSBmcm9tICcuL3NvdXJjZXMvc291cmNlJztcclxuaW1wb3J0IHsgVGV4dFNlYXJjaE9wdGlvbnMsIFJldmVyc2VTZWFyY2hPcHRpb25zIH0gZnJvbSAnLi9zb3VyY2VzL3NvdXJjZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgU2VhcmNoU291cmNlU2VydmljZSB9IGZyb20gJy4vc2VhcmNoLXNvdXJjZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUmVzZWFyY2ggfSBmcm9tICcuL3NlYXJjaC5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgc291cmNlQ2FuU2VhcmNoLCBzb3VyY2VDYW5SZXZlcnNlU2VhcmNoIH0gZnJvbSAnLi9zZWFyY2gudXRpbHMnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgc2VydmljZSBwZXJmb3JtIHJlc2VhcmNoZXMgaW4gYWxsIHRoZSBzZWFyY2ggc291cmNlcyBlbmFibGVkLlxyXG4gKiBJdCByZXR1cm5zIFJlc2VhcmNoIG9iamVjdHMgd2hvJ3MgJ3JlcXVlc3QnIHByb3BlcnR5IG5lZWRzIHRvIGJlXHJcbiAqIHN1YnNjcmliZWQgdG8gaW4gb3JkZXIgdG8gdHJpZ2dlciB0aGUgcmVzZWFyY2guIFRoaXMgc2VydmljZXMgaGFzXHJcbiAqIGtlZXBzIGludGVybmFsIHN0YXRlIG9mIHRoZSByZXNlYXJjaGVzIGl0IHBlcmZvcm1lZFxyXG4gKiBhbmQgdGhlIHJlc3VsdHMgdGhleSB5aWVsZGVkLlxyXG4gKi9cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VhcmNoU2VydmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VhcmNoU291cmNlU2VydmljZTogU2VhcmNoU291cmNlU2VydmljZSwgcHJpdmF0ZSBtYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBQZXJmb3JtIGEgcmVzZWFyY2ggYnkgdGV4dFxyXG4gICAqIEBwYXJhbSB0ZXJtIEFueSB0ZXh0XHJcbiAgICogQHJldHVybnMgUmVzZWFyY2hlc1xyXG4gICAqL1xyXG4gIHNlYXJjaCh0ZXJtOiBzdHJpbmcsIG9wdGlvbnM/OiBUZXh0U2VhcmNoT3B0aW9ucyk6IFJlc2VhcmNoW10ge1xyXG4gICAgaWYgKCF0aGlzLnRlcm1Jc1ZhbGlkKHRlcm0pKSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXNwb25zZSA9IHN0cmluZ1RvTG9uTGF0KHRlcm0sIHRoaXMubWFwU2VydmljZS5nZXRNYXAoKS5wcm9qZWN0aW9uKTtcclxuICAgIGlmIChyZXNwb25zZS5sb25MYXQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucmV2ZXJzZVNlYXJjaChyZXNwb25zZS5sb25MYXQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UubWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc291cmNlcyA9IHRoaXMuc2VhcmNoU291cmNlU2VydmljZS5nZXRFbmFibGVkU291cmNlcygpXHJcbiAgICAgIC5maWx0ZXIoc291cmNlQ2FuU2VhcmNoKTtcclxuICAgIHJldHVybiB0aGlzLnNlYXJjaFNvdXJjZXMoc291cmNlcywgdGVybSwgb3B0aW9ucyB8fCB7fSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQZXJmb3JtIGEgcmVzZWFyY2ggYnkgbG9uL2xhdFxyXG4gICAqIEBwYXJhbSBsb25MYXQgQW55IGxvbi9sYXQgY29vcmRpbmF0ZXNcclxuICAgKiBAcmV0dXJucyBSZXNlYXJjaGVzXHJcbiAgICovXHJcbiAgcmV2ZXJzZVNlYXJjaChsb25MYXQ6IFtudW1iZXIsIG51bWJlcl0sIG9wdGlvbnM/OiBSZXZlcnNlU2VhcmNoT3B0aW9ucykge1xyXG4gICAgY29uc3Qgc291cmNlcyA9IHRoaXMuc2VhcmNoU291cmNlU2VydmljZS5nZXRFbmFibGVkU291cmNlcygpXHJcbiAgICAgIC5maWx0ZXIoc291cmNlQ2FuUmV2ZXJzZVNlYXJjaCk7XHJcbiAgICByZXR1cm4gdGhpcy5yZXZlcnNlU2VhcmNoU291cmNlcyhzb3VyY2VzLCBsb25MYXQsIG9wdGlvbnMgfHwge30pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgdGV4dCByZXNlYXJjaCBvdXQgb2YgYWxsIGdpdmVuIHNlYXJjaCBzb3VyY2VzXHJcbiAgICogQHBhcmFtIHNvdXJjZXMgU2VhcmNoIHNvdXJjZXMgdGhhdCBpbXBsZW1lbnQgVGV4dFNlYXJjaFxyXG4gICAqIEBwYXJhbSB0ZXJtIFNlYXJjaCB0ZXJtXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBSZXNlYXJjaGVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZWFyY2hTb3VyY2VzKHNvdXJjZXM6IFNlYXJjaFNvdXJjZVtdLCB0ZXJtOiBzdHJpbmcsIG9wdGlvbnM6IFRleHRTZWFyY2hPcHRpb25zKTogUmVzZWFyY2hbXSB7XHJcbiAgICByZXR1cm4gc291cmNlcy5tYXAoKHNvdXJjZTogU2VhcmNoU291cmNlKSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVxdWVzdDogKHNvdXJjZSBhcyBhbnkgYXMgVGV4dFNlYXJjaCkuc2VhcmNoKHRlcm0sIG9wdGlvbnMpLFxyXG4gICAgICAgIHJldmVyc2U6IGZhbHNlLFxyXG4gICAgICAgIHNvdXJjZVxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYSByZXZlcnNlIHJlc2VhcmNoIG91dCBvZiBhbGwgZ2l2ZW4gc2VhcmNoIHNvdXJjZXNcclxuICAgKiBAcGFyYW0gc291cmNlcyBTZWFyY2ggc291cmNlcyB0aGF0IGltcGxlbWVudCBSZXZlcnNlU2VhcmNoXHJcbiAgICogQHBhcmFtIGxvbkxhdCBBbnkgbG9uL2xhdCBjb29yZGluYXRlc1xyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgUmVzZWFyY2hlc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgcmV2ZXJzZVNlYXJjaFNvdXJjZXMoXHJcbiAgICBzb3VyY2VzOiBTZWFyY2hTb3VyY2VbXSxcclxuICAgIGxvbkxhdDogW251bWJlciwgbnVtYmVyXSxcclxuICAgIG9wdGlvbnM6IFJldmVyc2VTZWFyY2hPcHRpb25zXHJcbiAgKTogUmVzZWFyY2hbXSB7XHJcbiAgICByZXR1cm4gc291cmNlcy5tYXAoKHNvdXJjZTogU2VhcmNoU291cmNlKSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVxdWVzdDogKHNvdXJjZSBhcyBhbnkgYXMgUmV2ZXJzZVNlYXJjaCkucmV2ZXJzZVNlYXJjaChsb25MYXQsIG9wdGlvbnMpLFxyXG4gICAgICAgIHJldmVyc2U6IHRydWUsXHJcbiAgICAgICAgc291cmNlXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFZhbGlkYXRlIHRoYXQgYSBzZWFyY2ggdGVybSBpcyB2YWxpZFxyXG4gICAqIEBwYXJhbSB0ZXJtIFNlYXJjaCB0ZXJtXHJcbiAgICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgc2VhcmNoIHRlcm0gaXMgdmFsaWRcclxuICAgKi9cclxuICBwcml2YXRlIHRlcm1Jc1ZhbGlkKHRlcm06IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB0ZXJtID09PSAnc3RyaW5nJyAmJiB0ZXJtICE9PSAnJztcclxuICB9XHJcbn1cclxuIl19