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
        else if (response.message) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NoYXJlZC9zZWFyY2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUkxRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU5RCxPQUFPLEVBQUUsZUFBZSxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7Ozs7O0FBU3pFO0lBS0UsdUJBQW9CLG1CQUF3QyxFQUFVLFVBQXNCO1FBQXhFLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQUcsQ0FBQztJQUVoRzs7OztPQUlHOzs7Ozs7O0lBQ0gsOEJBQU07Ozs7OztJQUFOLFVBQU8sSUFBWSxFQUFFLE9BQTJCO1FBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzNCLE9BQU8sRUFBRSxDQUFDO1NBQ1g7O1lBRUssUUFBUSxHQUFHLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUM7UUFDMUUsSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ25CLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDNUM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDL0I7O1lBRUssT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxpQkFBaUIsRUFBRTthQUN6RCxNQUFNLENBQUMsZUFBZSxDQUFDO1FBQzFCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNILHFDQUFhOzs7Ozs7SUFBYixVQUFjLE1BQXdCLEVBQUUsT0FBOEI7O1lBQzlELE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsaUJBQWlCLEVBQUU7YUFDekQsTUFBTSxDQUFDLHNCQUFzQixDQUFDO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRDs7Ozs7T0FLRzs7Ozs7Ozs7O0lBQ0sscUNBQWE7Ozs7Ozs7O0lBQXJCLFVBQXNCLE9BQXVCLEVBQUUsSUFBWSxFQUFFLE9BQTBCO1FBQ3JGLE9BQU8sT0FBTyxDQUFDLEdBQUc7Ozs7UUFBQyxVQUFDLE1BQW9CO1lBQ3RDLE9BQU87Z0JBQ0wsT0FBTyxFQUFFLENBQUMsbUJBQUEsbUJBQUEsTUFBTSxFQUFPLEVBQWMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDO2dCQUM1RCxPQUFPLEVBQUUsS0FBSztnQkFDZCxNQUFNLFFBQUE7YUFDUCxDQUFDO1FBQ0osQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7OztJQUNLLDRDQUFvQjs7Ozs7Ozs7SUFBNUIsVUFDRSxPQUF1QixFQUN2QixNQUF3QixFQUN4QixPQUE2QjtRQUU3QixPQUFPLE9BQU8sQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQyxNQUFvQjtZQUN0QyxPQUFPO2dCQUNMLE9BQU8sRUFBRSxDQUFDLG1CQUFBLG1CQUFBLE1BQU0sRUFBTyxFQUFpQixDQUFDLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUM7Z0JBQ3hFLE9BQU8sRUFBRSxJQUFJO2dCQUNiLE1BQU0sUUFBQTthQUNQLENBQUM7UUFDSixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0ssbUNBQVc7Ozs7OztJQUFuQixVQUFvQixJQUFZO1FBQzlCLE9BQU8sT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksS0FBSyxFQUFFLENBQUM7SUFDakQsQ0FBQzs7Z0JBbkZGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBYlEsbUJBQW1CO2dCQUpuQixVQUFVOzs7d0JBSG5CO0NBc0dDLEFBcEZELElBb0ZDO1NBakZZLGFBQWE7Ozs7OztJQUVaLDRDQUFnRDs7Ozs7SUFBRSxtQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBzdHJpbmdUb0xvbkxhdCB9IGZyb20gJy4uLy4uL21hcCc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL21hcC5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZSwgVGV4dFNlYXJjaCwgUmV2ZXJzZVNlYXJjaCB9IGZyb20gJy4vc291cmNlcy9zb3VyY2UnO1xyXG5pbXBvcnQgeyBUZXh0U2VhcmNoT3B0aW9ucywgUmV2ZXJzZVNlYXJjaE9wdGlvbnMgfSBmcm9tICcuL3NvdXJjZXMvc291cmNlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2VTZXJ2aWNlIH0gZnJvbSAnLi9zZWFyY2gtc291cmNlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBSZXNlYXJjaCB9IGZyb20gJy4vc2VhcmNoLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBzb3VyY2VDYW5TZWFyY2gsIHNvdXJjZUNhblJldmVyc2VTZWFyY2ggfSBmcm9tICcuL3NlYXJjaC51dGlscyc7XHJcblxyXG4vKipcclxuICogVGhpcyBzZXJ2aWNlIHBlcmZvcm0gcmVzZWFyY2hlcyBpbiBhbGwgdGhlIHNlYXJjaCBzb3VyY2VzIGVuYWJsZWQuXHJcbiAqIEl0IHJldHVybnMgUmVzZWFyY2ggb2JqZWN0cyB3aG8ncyAncmVxdWVzdCcgcHJvcGVydHkgbmVlZHMgdG8gYmVcclxuICogc3Vic2NyaWJlZCB0byBpbiBvcmRlciB0byB0cmlnZ2VyIHRoZSByZXNlYXJjaC4gVGhpcyBzZXJ2aWNlcyBoYXNcclxuICoga2VlcHMgaW50ZXJuYWwgc3RhdGUgb2YgdGhlIHJlc2VhcmNoZXMgaXQgcGVyZm9ybWVkXHJcbiAqIGFuZCB0aGUgcmVzdWx0cyB0aGV5IHlpZWxkZWQuXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hTZXJ2aWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZWFyY2hTb3VyY2VTZXJ2aWNlOiBTZWFyY2hTb3VyY2VTZXJ2aWNlLCBwcml2YXRlIG1hcFNlcnZpY2U6IE1hcFNlcnZpY2UpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBlcmZvcm0gYSByZXNlYXJjaCBieSB0ZXh0XHJcbiAgICogQHBhcmFtIHRlcm0gQW55IHRleHRcclxuICAgKiBAcmV0dXJucyBSZXNlYXJjaGVzXHJcbiAgICovXHJcbiAgc2VhcmNoKHRlcm06IHN0cmluZywgb3B0aW9ucz86IFRleHRTZWFyY2hPcHRpb25zKTogUmVzZWFyY2hbXSB7XHJcbiAgICBpZiAoIXRoaXMudGVybUlzVmFsaWQodGVybSkpIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlc3BvbnNlID0gc3RyaW5nVG9Mb25MYXQodGVybSwgdGhpcy5tYXBTZXJ2aWNlLmdldE1hcCgpLnByb2plY3Rpb24pO1xyXG4gICAgaWYgKHJlc3BvbnNlLmxvbkxhdCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5yZXZlcnNlU2VhcmNoKHJlc3BvbnNlLmxvbkxhdCk7XHJcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLm1lc3NhZ2UpIHtcclxuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UubWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc291cmNlcyA9IHRoaXMuc2VhcmNoU291cmNlU2VydmljZS5nZXRFbmFibGVkU291cmNlcygpXHJcbiAgICAgIC5maWx0ZXIoc291cmNlQ2FuU2VhcmNoKTtcclxuICAgIHJldHVybiB0aGlzLnNlYXJjaFNvdXJjZXMoc291cmNlcywgdGVybSwgb3B0aW9ucyB8fCB7fSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQZXJmb3JtIGEgcmVzZWFyY2ggYnkgbG9uL2xhdFxyXG4gICAqIEBwYXJhbSBsb25MYXQgQW55IGxvbi9sYXQgY29vcmRpbmF0ZXNcclxuICAgKiBAcmV0dXJucyBSZXNlYXJjaGVzXHJcbiAgICovXHJcbiAgcmV2ZXJzZVNlYXJjaChsb25MYXQ6IFtudW1iZXIsIG51bWJlcl0sIG9wdGlvbnM/OiBSZXZlcnNlU2VhcmNoT3B0aW9ucykge1xyXG4gICAgY29uc3Qgc291cmNlcyA9IHRoaXMuc2VhcmNoU291cmNlU2VydmljZS5nZXRFbmFibGVkU291cmNlcygpXHJcbiAgICAgIC5maWx0ZXIoc291cmNlQ2FuUmV2ZXJzZVNlYXJjaCk7XHJcbiAgICByZXR1cm4gdGhpcy5yZXZlcnNlU2VhcmNoU291cmNlcyhzb3VyY2VzLCBsb25MYXQsIG9wdGlvbnMgfHwge30pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgdGV4dCByZXNlYXJjaCBvdXQgb2YgYWxsIGdpdmVuIHNlYXJjaCBzb3VyY2VzXHJcbiAgICogQHBhcmFtIHNvdXJjZXMgU2VhcmNoIHNvdXJjZXMgdGhhdCBpbXBsZW1lbnQgVGV4dFNlYXJjaFxyXG4gICAqIEBwYXJhbSB0ZXJtIFNlYXJjaCB0ZXJtXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBSZXNlYXJjaGVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZWFyY2hTb3VyY2VzKHNvdXJjZXM6IFNlYXJjaFNvdXJjZVtdLCB0ZXJtOiBzdHJpbmcsIG9wdGlvbnM6IFRleHRTZWFyY2hPcHRpb25zKTogUmVzZWFyY2hbXSB7XHJcbiAgICByZXR1cm4gc291cmNlcy5tYXAoKHNvdXJjZTogU2VhcmNoU291cmNlKSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVxdWVzdDogKHNvdXJjZSBhcyBhbnkgYXMgVGV4dFNlYXJjaCkuc2VhcmNoKHRlcm0sIG9wdGlvbnMpLFxyXG4gICAgICAgIHJldmVyc2U6IGZhbHNlLFxyXG4gICAgICAgIHNvdXJjZVxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYSByZXZlcnNlIHJlc2VhcmNoIG91dCBvZiBhbGwgZ2l2ZW4gc2VhcmNoIHNvdXJjZXNcclxuICAgKiBAcGFyYW0gc291cmNlcyBTZWFyY2ggc291cmNlcyB0aGF0IGltcGxlbWVudCBSZXZlcnNlU2VhcmNoXHJcbiAgICogQHBhcmFtIGxvbkxhdCBBbnkgbG9uL2xhdCBjb29yZGluYXRlc1xyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgUmVzZWFyY2hlc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgcmV2ZXJzZVNlYXJjaFNvdXJjZXMoXHJcbiAgICBzb3VyY2VzOiBTZWFyY2hTb3VyY2VbXSxcclxuICAgIGxvbkxhdDogW251bWJlciwgbnVtYmVyXSxcclxuICAgIG9wdGlvbnM6IFJldmVyc2VTZWFyY2hPcHRpb25zXHJcbiAgKTogUmVzZWFyY2hbXSB7XHJcbiAgICByZXR1cm4gc291cmNlcy5tYXAoKHNvdXJjZTogU2VhcmNoU291cmNlKSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVxdWVzdDogKHNvdXJjZSBhcyBhbnkgYXMgUmV2ZXJzZVNlYXJjaCkucmV2ZXJzZVNlYXJjaChsb25MYXQsIG9wdGlvbnMpLFxyXG4gICAgICAgIHJldmVyc2U6IHRydWUsXHJcbiAgICAgICAgc291cmNlXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFZhbGlkYXRlIHRoYXQgYSBzZWFyY2ggdGVybSBpcyB2YWxpZFxyXG4gICAqIEBwYXJhbSB0ZXJtIFNlYXJjaCB0ZXJtXHJcbiAgICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgc2VhcmNoIHRlcm0gaXMgdmFsaWRcclxuICAgKi9cclxuICBwcml2YXRlIHRlcm1Jc1ZhbGlkKHRlcm06IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB0ZXJtID09PSAnc3RyaW5nJyAmJiB0ZXJtICE9PSAnJztcclxuICB9XHJcbn1cclxuIl19