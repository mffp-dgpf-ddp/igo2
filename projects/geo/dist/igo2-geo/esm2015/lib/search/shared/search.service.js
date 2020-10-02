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
export class SearchService {
    /**
     * @param {?} searchSourceService
     * @param {?} mapService
     */
    constructor(searchSourceService, mapService) {
        this.searchSourceService = searchSourceService;
        this.mapService = mapService;
    }
    /**
     * Perform a research by text
     * @param {?} term Any text
     * @param {?=} options
     * @return {?} Researches
     */
    search(term, options = {}) {
        if (!this.termIsValid(term)) {
            return [];
        }
        /** @type {?} */
        const response = stringToLonLat(term, this.mapService.getMap().projection, {
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
        let sources;
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
            source => source.getId() === options.sourceId));
        }
        else if (options.searchType) {
            sources = sources.filter((/**
             * @param {?} source
             * @return {?}
             */
            source => source.getType() === options.searchType));
        }
        sources = sources.filter(sourceCanSearch);
        return this.searchSources(sources, term, options);
    }
    /**
     * Perform a research by lon/lat
     * @param {?} lonLat Any lon/lat coordinates
     * @param {?=} options
     * @param {?=} asPointerSummary
     * @return {?} Researches
     */
    reverseSearch(lonLat, options, asPointerSummary = false) {
        /** @type {?} */
        const reverseSourceFonction = asPointerSummary
            ? sourceCanReverseSearchAsSummary
            : sourceCanReverseSearch;
        /** @type {?} */
        const sources = this.searchSourceService
            .getEnabledSources()
            .filter(reverseSourceFonction);
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
                request: ((/** @type {?} */ (((/** @type {?} */ (source)))))).search(term, options),
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
                request: ((/** @type {?} */ (((/** @type {?} */ (source)))))).reverseSearch(lonLat, options),
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
    { type: SearchSourceService },
    { type: MapService }
];
/** @nocollapse */ SearchService.ngInjectableDef = i0.defineInjectable({ factory: function SearchService_Factory() { return new SearchService(i0.inject(i1.SearchSourceService), i0.inject(i2.MapService)); }, token: SearchService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NoYXJlZC9zZWFyY2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQU8xRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU5RCxPQUFPLEVBQ0wsZUFBZSxFQUNmLHNCQUFzQixFQUN0QiwrQkFBK0IsRUFDaEMsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7Ozs7QUFZeEIsTUFBTSxPQUFPLGFBQWE7Ozs7O0lBQ3hCLFlBQ1UsbUJBQXdDLEVBQ3hDLFVBQXNCO1FBRHRCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUM3QixDQUFDOzs7Ozs7O0lBT0osTUFBTSxDQUFDLElBQVksRUFBRSxVQUE2QixFQUFFO1FBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzNCLE9BQU8sRUFBRSxDQUFDO1NBQ1g7O2NBRUssUUFBUSxHQUFHLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUU7WUFDekUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO1NBQ3pCLENBQUM7UUFDRixJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDbkIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDM0U7YUFBTSxJ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TUFBTTthQUNuQjs7OztZQWpCUSxtQkFBbUI7WUFQbkIsVUFBVTs7Ozs7Ozs7SUEyQmYsNENBQWdEOzs7OztJQUNoRCxtQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBzdHJpbmdUb0xvbkxhdCB9IGZyb20gJy4uLy4uL21hcCc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL21hcC5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZSwgVGV4dFNlYXJjaCwgUmV2ZXJzZVNlYXJjaCB9IGZyb20gJy4vc291cmNlcy9zb3VyY2UnO1xyXG5pbXBvcnQge1xyXG4gIFRleHRTZWFyY2hPcHRpb25zLFxyXG4gIFJldmVyc2VTZWFyY2hPcHRpb25zXHJcbn0gZnJvbSAnLi9zb3VyY2VzL3NvdXJjZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgU2VhcmNoU291cmNlU2VydmljZSB9IGZyb20gJy4vc2VhcmNoLXNvdXJjZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUmVzZWFyY2ggfSBmcm9tICcuL3NlYXJjaC5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHtcclxuICBzb3VyY2VDYW5TZWFyY2gsXHJcbiAgc291cmNlQ2FuUmV2ZXJzZVNlYXJjaCxcclxuICBzb3VyY2VDYW5SZXZlcnNlU2VhcmNoQXNTdW1tYXJ5XHJcbn0gZnJvbSAnLi9zZWFyY2gudXRpbHMnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgc2VydmljZSBwZXJmb3JtIHJlc2VhcmNoZXMgaW4gYWxsIHRoZSBzZWFyY2ggc291cmNlcyBlbmFibGVkLlxyXG4gKiBJdCByZXR1cm5zIFJlc2VhcmNoIG9iamVjdHMgd2hvJ3MgJ3JlcXVlc3QnIHByb3BlcnR5IG5lZWRzIHRvIGJlXHJcbiAqIHN1YnNjcmliZWQgdG8gaW4gb3JkZXIgdG8gdHJpZ2dlciB0aGUgcmVzZWFyY2guIFRoaXMgc2VydmljZXMgaGFzXHJcbiAqIGtlZXBzIGludGVybmFsIHN0YXRlIG9mIHRoZSByZXNlYXJjaGVzIGl0IHBlcmZvcm1lZFxyXG4gKiBhbmQgdGhlIHJlc3VsdHMgdGhleSB5aWVsZGVkLlxyXG4gKi9cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VhcmNoU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHNlYXJjaFNvdXJjZVNlcnZpY2U6IFNlYXJjaFNvdXJjZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG1hcFNlcnZpY2U6IE1hcFNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBlcmZvcm0gYSByZXNlYXJjaCBieSB0ZXh0XHJcbiAgICogQHBhcmFtIHRlcm0gQW55IHRleHRcclxuICAgKiBAcmV0dXJucyBSZXNlYXJjaGVzXHJcbiAgICovXHJcbiAgc2VhcmNoKHRlcm06IHN0cmluZywgb3B0aW9uczogVGV4dFNlYXJjaE9wdGlvbnMgPSB7fSk6IFJlc2VhcmNoW10ge1xyXG4gICAgaWYgKCF0aGlzLnRlcm1Jc1ZhbGlkKHRlcm0pKSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXNwb25zZSA9IHN0cmluZ1RvTG9uTGF0KHRlcm0sIHRoaXMubWFwU2VydmljZS5nZXRNYXAoKS5wcm9qZWN0aW9uLCB7XHJcbiAgICAgIGZvcmNlTkE6IG9wdGlvbnMuZm9yY2VOQVxyXG4gICAgfSk7XHJcbiAgICBpZiAocmVzcG9uc2UubG9uTGF0KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnJldmVyc2VTZWFyY2gocmVzcG9uc2UubG9uTGF0LCB7IGRpc3RhbmNlOiByZXNwb25zZS5yYWRpdXMgfSk7XHJcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLm1lc3NhZ2UpIHtcclxuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UubWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb3B0aW9ucy5leHRlbnQgPSB0aGlzLm1hcFNlcnZpY2VcclxuICAgICAgLmdldE1hcCgpXHJcbiAgICAgIC52aWV3Q29udHJvbGxlci5nZXRFeHRlbnQoJ0VQU0c6NDMyNicpO1xyXG5cclxuICAgIGxldCBzb3VyY2VzO1xyXG5cclxuICAgIGlmIChvcHRpb25zLmdldEVuYWJsZWRPbmx5IHx8IG9wdGlvbnMuZ2V0RW5hYmxlZE9ubHkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBzb3VyY2VzID0gdGhpcy5zZWFyY2hTb3VyY2VTZXJ2aWNlLmdldEVuYWJsZWRTb3VyY2VzKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzb3VyY2VzID0gdGhpcy5zZWFyY2hTb3VyY2VTZXJ2aWNlLmdldFNvdXJjZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0aW9ucy5zb3VyY2VJZCkge1xyXG4gICAgICBzb3VyY2VzID0gc291cmNlcy5maWx0ZXIoc291cmNlID0+IHNvdXJjZS5nZXRJZCgpID09PSBvcHRpb25zLnNvdXJjZUlkKTtcclxuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5zZWFyY2hUeXBlKSB7XHJcbiAgICAgIHNvdXJjZXMgPSBzb3VyY2VzLmZpbHRlcihcclxuICAgICAgICBzb3VyY2UgPT4gc291cmNlLmdldFR5cGUoKSA9PT0gb3B0aW9ucy5zZWFyY2hUeXBlXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgc291cmNlcyA9IHNvdXJjZXMuZmlsdGVyKHNvdXJjZUNhblNlYXJjaCk7XHJcbiAgICByZXR1cm4gdGhpcy5zZWFyY2hTb3VyY2VzKHNvdXJjZXMsIHRlcm0sIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGVyZm9ybSBhIHJlc2VhcmNoIGJ5IGxvbi9sYXRcclxuICAgKiBAcGFyYW0gbG9uTGF0IEFueSBsb24vbGF0IGNvb3JkaW5hdGVzXHJcbiAgICogQHJldHVybnMgUmVzZWFyY2hlc1xyXG4gICAqL1xyXG4gIHJldmVyc2VTZWFyY2goXHJcbiAgICBsb25MYXQ6IFtudW1iZXIsIG51bWJlcl0sXHJcbiAgICBvcHRpb25zPzogUmV2ZXJzZVNlYXJjaE9wdGlvbnMsXHJcbiAgICBhc1BvaW50ZXJTdW1tYXJ5OiBib29sZWFuID0gZmFsc2VcclxuICApIHtcclxuICAgIGNvbnN0IHJldmVyc2VTb3VyY2VGb25jdGlvbiA9IGFzUG9pbnRlclN1bW1hcnlcclxuICAgICAgPyBzb3VyY2VDYW5SZXZlcnNlU2VhcmNoQXNTdW1tYXJ5XHJcbiAgICAgIDogc291cmNlQ2FuUmV2ZXJzZVNlYXJjaDtcclxuICAgIGNvbnN0IHNvdXJjZXMgPSB0aGlzLnNlYXJjaFNvdXJjZVNlcnZpY2VcclxuICAgICAgLmdldEVuYWJsZWRTb3VyY2VzKClcclxuICAgICAgLmZpbHRlcihyZXZlcnNlU291cmNlRm9uY3Rpb24pO1xyXG4gICAgcmV0dXJuIHRoaXMucmV2ZXJzZVNlYXJjaFNvdXJjZXMoc291cmNlcywgbG9uTGF0LCBvcHRpb25zIHx8IHt9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIHRleHQgcmVzZWFyY2ggb3V0IG9mIGFsbCBnaXZlbiBzZWFyY2ggc291cmNlc1xyXG4gICAqIEBwYXJhbSBzb3VyY2VzIFNlYXJjaCBzb3VyY2VzIHRoYXQgaW1wbGVtZW50IFRleHRTZWFyY2hcclxuICAgKiBAcGFyYW0gdGVybSBTZWFyY2ggdGVybVxyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgUmVzZWFyY2hlc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgc2VhcmNoU291cmNlcyhcclxuICAgIHNvdXJjZXM6IFNlYXJjaFNvdXJjZVtdLFxyXG4gICAgdGVybTogc3RyaW5nLFxyXG4gICAgb3B0aW9uczogVGV4dFNlYXJjaE9wdGlvbnNcclxuICApOiBSZXNlYXJjaFtdIHtcclxuICAgIHJldHVybiBzb3VyY2VzLm1hcCgoc291cmNlOiBTZWFyY2hTb3VyY2UpID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICByZXF1ZXN0OiAoKHNvdXJjZSBhcyBhbnkpIGFzIFRleHRTZWFyY2gpLnNlYXJjaCh0ZXJtLCBvcHRpb25zKSxcclxuICAgICAgICByZXZlcnNlOiBmYWxzZSxcclxuICAgICAgICBzb3VyY2VcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgcmV2ZXJzZSByZXNlYXJjaCBvdXQgb2YgYWxsIGdpdmVuIHNlYXJjaCBzb3VyY2VzXHJcbiAgICogQHBhcmFtIHNvdXJjZXMgU2VhcmNoIHNvdXJjZXMgdGhhdCBpbXBsZW1lbnQgUmV2ZXJzZVNlYXJjaFxyXG4gICAqIEBwYXJhbSBsb25MYXQgQW55IGxvbi9sYXQgY29vcmRpbmF0ZXNcclxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIFJlc2VhcmNoZXNcclxuICAgKi9cclxuICBwcml2YXRlIHJldmVyc2VTZWFyY2hTb3VyY2VzKFxyXG4gICAgc291cmNlczogU2VhcmNoU291cmNlW10sXHJcbiAgICBsb25MYXQ6IFtudW1iZXIsIG51bWJlcl0sXHJcbiAgICBvcHRpb25zOiBSZXZlcnNlU2VhcmNoT3B0aW9uc1xyXG4gICk6IFJlc2VhcmNoW10ge1xyXG4gICAgcmV0dXJuIHNvdXJjZXMubWFwKChzb3VyY2U6IFNlYXJjaFNvdXJjZSkgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlcXVlc3Q6ICgoc291cmNlIGFzIGFueSkgYXMgUmV2ZXJzZVNlYXJjaCkucmV2ZXJzZVNlYXJjaChcclxuICAgICAgICAgIGxvbkxhdCxcclxuICAgICAgICAgIG9wdGlvbnNcclxuICAgICAgICApLFxyXG4gICAgICAgIHJldmVyc2U6IHRydWUsXHJcbiAgICAgICAgc291cmNlXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFZhbGlkYXRlIHRoYXQgYSBzZWFyY2ggdGVybSBpcyB2YWxpZFxyXG4gICAqIEBwYXJhbSB0ZXJtIFNlYXJjaCB0ZXJtXHJcbiAgICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgc2VhcmNoIHRlcm0gaXMgdmFsaWRcclxuICAgKi9cclxuICBwcml2YXRlIHRlcm1Jc1ZhbGlkKHRlcm06IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB0ZXJtID09PSAnc3RyaW5nJyAmJiB0ZXJtICE9PSAnJztcclxuICB9XHJcbn1cclxuIl19