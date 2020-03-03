/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { stringToLonLat } from '../../map';
import { MapService } from '../../map/shared/map.service';
import { SearchSourceService } from './search-source.service';
import { sourceCanSearch, sourceCanReverseSearch, sourceCanReverseSearchAsSummary } from './search.utils';
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
        if (options === void 0) { options = {}; }
        if (!this.termIsValid(term)) {
            return [];
        }
        /** @type {?} */
        var response = stringToLonLat(term, this.mapService.getMap().projection, {
            forceNA: options.forceNA
        });
        if (response.lonLat) {
            return this.reverseSearch(response.lonLat, { distance: response.radius });
        }
        else if (response.message) {
            console.log(response.message);
        }
        options.extent = this.mapService
            .getMap()
            .viewController.getExtent('EPSG:4326');
        /** @type {?} */
        var sources;
        if (options.getEnabledOnly || options.getEnabledOnly === undefined) {
            sources = this.searchSourceService.getEnabledSources();
        }
        else {
            sources = this.searchSourceService.getSources();
        }
        if (options.sourceId) {
            sources = sources.filter((/**
             * @param {?} source
             * @return {?}
             */
            function (source) { return source.getId() === options.sourceId; }));
        }
        else if (options.searchType) {
            sources = sources.filter((/**
             * @param {?} source
             * @return {?}
             */
            function (source) { return source.getType() === options.searchType; }));
        }
        sources = sources.filter(sourceCanSearch);
        return this.searchSources(sources, term, options);
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
     * @param {?=} asPointerSummary
     * @return {?} Researches
     */
    SearchService.prototype.reverseSearch = /**
     * Perform a research by lon/lat
     * @param {?} lonLat Any lon/lat coordinates
     * @param {?=} options
     * @param {?=} asPointerSummary
     * @return {?} Researches
     */
    function (lonLat, options, asPointerSummary) {
        if (asPointerSummary === void 0) { asPointerSummary = false; }
        /** @type {?} */
        var reverseSourceFonction = asPointerSummary
            ? sourceCanReverseSearchAsSummary
            : sourceCanReverseSearch;
        /** @type {?} */
        var sources = this.searchSourceService
            .getEnabledSources()
            .filter(reverseSourceFonction);
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
                request: ((/** @type {?} */ (((/** @type {?} */ (source)))))).search(term, options),
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
                request: ((/** @type {?} */ (((/** @type {?} */ (source)))))).reverseSearch(lonLat, options),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NoYXJlZC9zZWFyY2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQU8xRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU5RCxPQUFPLEVBQ0wsZUFBZSxFQUNmLHNCQUFzQixFQUN0QiwrQkFBK0IsRUFDaEMsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7Ozs7QUFTeEI7SUFJRSx1QkFDVSxtQkFBd0MsRUFDeEMsVUFBc0I7UUFEdEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQzdCLENBQUM7SUFFSjs7OztPQUlHOzs7Ozs7O0lBQ0gsOEJBQU07Ozs7OztJQUFOLFVBQU8sSUFBWSxFQUFFLE9BQStCO1FBQS9CLHdCQUFBLEVBQUEsWUFBK0I7UUFDbEQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDM0IsT0FBTyxFQUFFLENBQUM7U0FDWDs7WUFFSyxRQUFRLEdBQUcsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRTtZQUN6RSxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87U0FDekIsQ0FBQztRQUNGLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUNuQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsTUFBTSxFQUFF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TCxDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNLLG1DQUFXOzs7Ozs7SUFBbkIsVUFBb0IsSUFBWTtRQUM5QixPQUFPLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDO0lBQ2pELENBQUM7O2dCQXpIRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQWpCUSxtQkFBbUI7Z0JBUG5CLFVBQVU7Ozt3QkFIbkI7Q0FtSkMsQUExSEQsSUEwSEM7U0F2SFksYUFBYTs7Ozs7O0lBRXRCLDRDQUFnRDs7Ozs7SUFDaEQsbUNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgc3RyaW5nVG9Mb25MYXQgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbWFwL3NoYXJlZC9tYXAuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2UsIFRleHRTZWFyY2gsIFJldmVyc2VTZWFyY2ggfSBmcm9tICcuL3NvdXJjZXMvc291cmNlJztcclxuaW1wb3J0IHtcclxuICBUZXh0U2VhcmNoT3B0aW9ucyxcclxuICBSZXZlcnNlU2VhcmNoT3B0aW9uc1xyXG59IGZyb20gJy4vc291cmNlcy9zb3VyY2UuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZVNlcnZpY2UgfSBmcm9tICcuL3NlYXJjaC1zb3VyY2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IFJlc2VhcmNoIH0gZnJvbSAnLi9zZWFyY2guaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7XHJcbiAgc291cmNlQ2FuU2VhcmNoLFxyXG4gIHNvdXJjZUNhblJldmVyc2VTZWFyY2gsXHJcbiAgc291cmNlQ2FuUmV2ZXJzZVNlYXJjaEFzU3VtbWFyeVxyXG59IGZyb20gJy4vc2VhcmNoLnV0aWxzJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIHNlcnZpY2UgcGVyZm9ybSByZXNlYXJjaGVzIGluIGFsbCB0aGUgc2VhcmNoIHNvdXJjZXMgZW5hYmxlZC5cclxuICogSXQgcmV0dXJucyBSZXNlYXJjaCBvYmplY3RzIHdobydzICdyZXF1ZXN0JyBwcm9wZXJ0eSBuZWVkcyB0byBiZVxyXG4gKiBzdWJzY3JpYmVkIHRvIGluIG9yZGVyIHRvIHRyaWdnZXIgdGhlIHJlc2VhcmNoLiBUaGlzIHNlcnZpY2VzIGhhc1xyXG4gKiBrZWVwcyBpbnRlcm5hbCBzdGF0ZSBvZiB0aGUgcmVzZWFyY2hlcyBpdCBwZXJmb3JtZWRcclxuICogYW5kIHRoZSByZXN1bHRzIHRoZXkgeWllbGRlZC5cclxuICovXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFNlYXJjaFNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBzZWFyY2hTb3VyY2VTZXJ2aWNlOiBTZWFyY2hTb3VyY2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBtYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBQZXJmb3JtIGEgcmVzZWFyY2ggYnkgdGV4dFxyXG4gICAqIEBwYXJhbSB0ZXJtIEFueSB0ZXh0XHJcbiAgICogQHJldHVybnMgUmVzZWFyY2hlc1xyXG4gICAqL1xyXG4gIHNlYXJjaCh0ZXJtOiBzdHJpbmcsIG9wdGlvbnM6IFRleHRTZWFyY2hPcHRpb25zID0ge30pOiBSZXNlYXJjaFtdIHtcclxuICAgIGlmICghdGhpcy50ZXJtSXNWYWxpZCh0ZXJtKSkge1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBzdHJpbmdUb0xvbkxhdCh0ZXJtLCB0aGlzLm1hcFNlcnZpY2UuZ2V0TWFwKCkucHJvamVjdGlvbiwge1xyXG4gICAgICBmb3JjZU5BOiBvcHRpb25zLmZvcmNlTkFcclxuICAgIH0pO1xyXG4gICAgaWYgKHJlc3BvbnNlLmxvbkxhdCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5yZXZlcnNlU2VhcmNoKHJlc3BvbnNlLmxvbkxhdCwgeyBkaXN0YW5jZTogcmVzcG9uc2UucmFkaXVzIH0pO1xyXG4gICAgfSBlbHNlIGlmIChyZXNwb25zZS5tZXNzYWdlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLm1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIG9wdGlvbnMuZXh0ZW50ID0gdGhpcy5tYXBTZXJ2aWNlXHJcbiAgICAgIC5nZXRNYXAoKVxyXG4gICAgICAudmlld0NvbnRyb2xsZXIuZ2V0RXh0ZW50KCdFUFNHOjQzMjYnKTtcclxuXHJcbiAgICBsZXQgc291cmNlcztcclxuXHJcbiAgICBpZiAob3B0aW9ucy5nZXRFbmFibGVkT25seSB8fCBvcHRpb25zLmdldEVuYWJsZWRPbmx5ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgc291cmNlcyA9IHRoaXMuc2VhcmNoU291cmNlU2VydmljZS5nZXRFbmFibGVkU291cmNlcygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc291cmNlcyA9IHRoaXMuc2VhcmNoU291cmNlU2VydmljZS5nZXRTb3VyY2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9wdGlvbnMuc291cmNlSWQpIHtcclxuICAgICAgc291cmNlcyA9IHNvdXJjZXMuZmlsdGVyKHNvdXJjZSA9PiBzb3VyY2UuZ2V0SWQoKSA9PT0gb3B0aW9ucy5zb3VyY2VJZCk7XHJcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuc2VhcmNoVHlwZSkge1xyXG4gICAgICBzb3VyY2VzID0gc291cmNlcy5maWx0ZXIoXHJcbiAgICAgICAgc291cmNlID0+IHNvdXJjZS5nZXRUeXBlKCkgPT09IG9wdGlvbnMuc2VhcmNoVHlwZVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHNvdXJjZXMgPSBzb3VyY2VzLmZpbHRlcihzb3VyY2VDYW5TZWFyY2gpO1xyXG4gICAgcmV0dXJuIHRoaXMuc2VhcmNoU291cmNlcyhzb3VyY2VzLCB0ZXJtLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBlcmZvcm0gYSByZXNlYXJjaCBieSBsb24vbGF0XHJcbiAgICogQHBhcmFtIGxvbkxhdCBBbnkgbG9uL2xhdCBjb29yZGluYXRlc1xyXG4gICAqIEByZXR1cm5zIFJlc2VhcmNoZXNcclxuICAgKi9cclxuICByZXZlcnNlU2VhcmNoKFxyXG4gICAgbG9uTGF0OiBbbnVtYmVyLCBudW1iZXJdLFxyXG4gICAgb3B0aW9ucz86IFJldmVyc2VTZWFyY2hPcHRpb25zLFxyXG4gICAgYXNQb2ludGVyU3VtbWFyeTogYm9vbGVhbiA9IGZhbHNlXHJcbiAgKSB7XHJcbiAgICBjb25zdCByZXZlcnNlU291cmNlRm9uY3Rpb24gPSBhc1BvaW50ZXJTdW1tYXJ5XHJcbiAgICAgID8gc291cmNlQ2FuUmV2ZXJzZVNlYXJjaEFzU3VtbWFyeVxyXG4gICAgICA6IHNvdXJjZUNhblJldmVyc2VTZWFyY2g7XHJcbiAgICBjb25zdCBzb3VyY2VzID0gdGhpcy5zZWFyY2hTb3VyY2VTZXJ2aWNlXHJcbiAgICAgIC5nZXRFbmFibGVkU291cmNlcygpXHJcbiAgICAgIC5maWx0ZXIocmV2ZXJzZVNvdXJjZUZvbmN0aW9uKTtcclxuICAgIHJldHVybiB0aGlzLnJldmVyc2VTZWFyY2hTb3VyY2VzKHNvdXJjZXMsIGxvbkxhdCwgb3B0aW9ucyB8fCB7fSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYSB0ZXh0IHJlc2VhcmNoIG91dCBvZiBhbGwgZ2l2ZW4gc2VhcmNoIHNvdXJjZXNcclxuICAgKiBAcGFyYW0gc291cmNlcyBTZWFyY2ggc291cmNlcyB0aGF0IGltcGxlbWVudCBUZXh0U2VhcmNoXHJcbiAgICogQHBhcmFtIHRlcm0gU2VhcmNoIHRlcm1cclxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIFJlc2VhcmNoZXNcclxuICAgKi9cclxuICBwcml2YXRlIHNlYXJjaFNvdXJjZXMoXHJcbiAgICBzb3VyY2VzOiBTZWFyY2hTb3VyY2VbXSxcclxuICAgIHRlcm06IHN0cmluZyxcclxuICAgIG9wdGlvbnM6IFRleHRTZWFyY2hPcHRpb25zXHJcbiAgKTogUmVzZWFyY2hbXSB7XHJcbiAgICByZXR1cm4gc291cmNlcy5tYXAoKHNvdXJjZTogU2VhcmNoU291cmNlKSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVxdWVzdDogKChzb3VyY2UgYXMgYW55KSBhcyBUZXh0U2VhcmNoKS5zZWFyY2godGVybSwgb3B0aW9ucyksXHJcbiAgICAgICAgcmV2ZXJzZTogZmFsc2UsXHJcbiAgICAgICAgc291cmNlXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIHJldmVyc2UgcmVzZWFyY2ggb3V0IG9mIGFsbCBnaXZlbiBzZWFyY2ggc291cmNlc1xyXG4gICAqIEBwYXJhbSBzb3VyY2VzIFNlYXJjaCBzb3VyY2VzIHRoYXQgaW1wbGVtZW50IFJldmVyc2VTZWFyY2hcclxuICAgKiBAcGFyYW0gbG9uTGF0IEFueSBsb24vbGF0IGNvb3JkaW5hdGVzXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBSZXNlYXJjaGVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZXZlcnNlU2VhcmNoU291cmNlcyhcclxuICAgIHNvdXJjZXM6IFNlYXJjaFNvdXJjZVtdLFxyXG4gICAgbG9uTGF0OiBbbnVtYmVyLCBudW1iZXJdLFxyXG4gICAgb3B0aW9uczogUmV2ZXJzZVNlYXJjaE9wdGlvbnNcclxuICApOiBSZXNlYXJjaFtdIHtcclxuICAgIHJldHVybiBzb3VyY2VzLm1hcCgoc291cmNlOiBTZWFyY2hTb3VyY2UpID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICByZXF1ZXN0OiAoKHNvdXJjZSBhcyBhbnkpIGFzIFJldmVyc2VTZWFyY2gpLnJldmVyc2VTZWFyY2goXHJcbiAgICAgICAgICBsb25MYXQsXHJcbiAgICAgICAgICBvcHRpb25zXHJcbiAgICAgICAgKSxcclxuICAgICAgICByZXZlcnNlOiB0cnVlLFxyXG4gICAgICAgIHNvdXJjZVxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBWYWxpZGF0ZSB0aGF0IGEgc2VhcmNoIHRlcm0gaXMgdmFsaWRcclxuICAgKiBAcGFyYW0gdGVybSBTZWFyY2ggdGVybVxyXG4gICAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHNlYXJjaCB0ZXJtIGlzIHZhbGlkXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB0ZXJtSXNWYWxpZCh0ZXJtOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0eXBlb2YgdGVybSA9PT0gJ3N0cmluZycgJiYgdGVybSAhPT0gJyc7XHJcbiAgfVxyXG59XHJcbiJdfQ==