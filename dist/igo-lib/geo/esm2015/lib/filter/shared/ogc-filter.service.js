/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { OgcFilterWriter } from './ogc-filter';
export class OGCFilterService {
    constructor() { }
    /**
     * @param {?} wmsDatasource
     * @param {?} filterString
     * @return {?}
     */
    filterByOgc(wmsDatasource, filterString) {
        /** @type {?} */
        const appliedFilter = wmsDatasource.formatProcessedOgcFilter(filterString, wmsDatasource.options.params.layers);
        /** @type {?} */
        const wmsFilterValue = appliedFilter.length > 0
            ? appliedFilter.replace('filter=', '')
            : undefined;
        wmsDatasource.ol.updateParams({ filter: wmsFilterValue });
    }
    /**
     * @param {?} wfsDatasource
     * @return {?}
     */
    setOgcWFSFiltersOptions(wfsDatasource) {
        /** @type {?} */
        const options = wfsDatasource.options;
        /** @type {?} */
        const ogcFilterWriter = new OgcFilterWriter();
        if (options.ogcFilters.enabled && options.ogcFilters.filters) {
            options.ogcFilters.filters = ogcFilterWriter.checkIgoFiltersProperties(options.ogcFilters.filters, options.paramsWFS.fieldNameGeometry, true);
            if (!options.ogcFilters.interfaceOgcFilters) {
                options.ogcFilters.interfaceOgcFilters = ogcFilterWriter.defineInterfaceFilterSequence(options.ogcFilters.filters, options.paramsWFS.fieldNameGeometry);
            }
        }
    }
    /**
     * @param {?} wmsDatasource
     * @return {?}
     */
    setOgcWMSFiltersOptions(wmsDatasource) {
        /** @type {?} */
        const options = wmsDatasource.options;
        /** @type {?} */
        const ogcFilterWriter = new OgcFilterWriter();
        if (options.ogcFilters.enabled && options.ogcFilters.filters) {
            options.ogcFilters.filters = ogcFilterWriter.checkIgoFiltersProperties(options.ogcFilters.filters, options.fieldNameGeometry, true);
            if (!options.ogcFilters.interfaceOgcFilters) {
                options.ogcFilters.interfaceOgcFilters = ogcFilterWriter.defineInterfaceFilterSequence(
                // With some wms server, this param must be set to make spatials call.
                options.ogcFilters.filters, options.fieldNameGeometry);
            }
            this.filterByOgc((/** @type {?} */ (wmsDatasource)), ogcFilterWriter.buildFilter(options.ogcFilters.filters));
            options.filtered = true;
        }
        else {
            options.ogcFilters.filters = undefined;
            options.ogcFilters.interfaceOgcFilters = [];
            options.filtered = false;
        }
    }
}
OGCFilterService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
OGCFilterService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ZpbHRlci9zaGFyZWQvb2djLWZpbHRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFJL0MsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQixnQkFBZSxDQUFDOzs7Ozs7SUFFVCxXQUFXLENBQUMsYUFBNEIsRUFBRSxZQUFvQjs7Y0FDN0QsYUFBYSxHQUFHLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDOztjQUN6RyxjQUFjLEdBQUcsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQzNDLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUM7WUFDdEMsQ0FBQyxDQUFDLFNBQVM7UUFDZixhQUFhLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO0lBQzVELENBQUM7Ozs7O0lBRU0sdUJBQXVCLENBQUMsYUFBc0M7O2NBQzdELE9BQU8sR0FBUSxhQUFhLENBQUMsT0FBTzs7Y0FDcEMsZUFBZSxHQUFHLElBQUksZUFBZSxFQUFFO1FBRTdDLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDNUQsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDLHlCQUF5QixDQUNwRSxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFDMUIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFDbkMsSUFBSSxDQUNMLENBQUM7WUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRTtnQkFDM0MsT0FBTyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsR0FBRyxlQUFlLENBQUMsNkJBQTZCLENBQ3BGLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUMxQixPQUFPLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUNwQyxDQUFDO2FBQ0g7U0FDRjtJQUNILENBQUM7Ozs7O0lBRU0sdUJBQXVCLENBQUMsYUFBc0M7O2NBQzdELE9BQU8sR0FBUSxhQUFhLENBQUMsT0FBTzs7Y0FDcEMsZUFBZSxHQUFHLElBQUksZUFBZSxFQUFFO1FBRTdDLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDNUQsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDLHlCQUF5QixDQUNwRSxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFDMUIsT0FBTyxDQUFDLGlCQUFpQixFQUN6QixJQUFJLENBQ0wsQ0FBQztZQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLG1CQUFtQixFQUFFO2dCQUMzQyxPQUFPLENBQUMsVUFBVSxDQUFDLG1CQUFtQixHQUFHLGVBQWUsQ0FBQyw2QkFBNkI7Z0JBQ3BGLHNFQUFzRTtnQkFDdEUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQzFCLE9BQU8sQ0FBQyxpQkFBaUIsQ0FDMUIsQ0FBQzthQUNIO1lBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FDZCxtQkFBQSxhQUFhLEVBQWlCLEVBQzlCLGVBQWUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FDeEQsQ0FBQztZQUNGLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ3pCO2FBQU07WUFDTCxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7WUFDdkMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUM7WUFDNUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7U0FDMUI7SUFDSCxDQUFDOzs7WUExREYsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBXTVNEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd21zLWRhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBXRlNEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL3dmcy1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IE9nY0ZpbHRlcldyaXRlciB9IGZyb20gJy4vb2djLWZpbHRlcic7XHJcbmltcG9ydCB7IE9nY0ZpbHRlcmFibGVEYXRhU291cmNlIH0gZnJvbSAnLi9vZ2MtZmlsdGVyLmludGVyZmFjZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBPR0NGaWx0ZXJTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIHB1YmxpYyBmaWx0ZXJCeU9nYyh3bXNEYXRhc291cmNlOiBXTVNEYXRhU291cmNlLCBmaWx0ZXJTdHJpbmc6IHN0cmluZykge1xyXG4gICAgY29uc3QgYXBwbGllZEZpbHRlciA9IHdtc0RhdGFzb3VyY2UuZm9ybWF0UHJvY2Vzc2VkT2djRmlsdGVyKGZpbHRlclN0cmluZywgd21zRGF0YXNvdXJjZS5vcHRpb25zLnBhcmFtcy5sYXllcnMpO1xyXG4gICAgY29uc3Qgd21zRmlsdGVyVmFsdWUgPSBhcHBsaWVkRmlsdGVyLmxlbmd0aCA+IDBcclxuICAgICAgICA/IGFwcGxpZWRGaWx0ZXIucmVwbGFjZSgnZmlsdGVyPScsICcnKVxyXG4gICAgICAgIDogdW5kZWZpbmVkO1xyXG4gICAgd21zRGF0YXNvdXJjZS5vbC51cGRhdGVQYXJhbXMoeyBmaWx0ZXI6IHdtc0ZpbHRlclZhbHVlIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldE9nY1dGU0ZpbHRlcnNPcHRpb25zKHdmc0RhdGFzb3VyY2U6IE9nY0ZpbHRlcmFibGVEYXRhU291cmNlKSB7XHJcbiAgICBjb25zdCBvcHRpb25zOiBhbnkgPSB3ZnNEYXRhc291cmNlLm9wdGlvbnM7XHJcbiAgICBjb25zdCBvZ2NGaWx0ZXJXcml0ZXIgPSBuZXcgT2djRmlsdGVyV3JpdGVyKCk7XHJcblxyXG4gICAgaWYgKG9wdGlvbnMub2djRmlsdGVycy5lbmFibGVkICYmIG9wdGlvbnMub2djRmlsdGVycy5maWx0ZXJzKSB7XHJcbiAgICAgIG9wdGlvbnMub2djRmlsdGVycy5maWx0ZXJzID0gb2djRmlsdGVyV3JpdGVyLmNoZWNrSWdvRmlsdGVyc1Byb3BlcnRpZXMoXHJcbiAgICAgICAgb3B0aW9ucy5vZ2NGaWx0ZXJzLmZpbHRlcnMsXHJcbiAgICAgICAgb3B0aW9ucy5wYXJhbXNXRlMuZmllbGROYW1lR2VvbWV0cnksXHJcbiAgICAgICAgdHJ1ZVxyXG4gICAgICApO1xyXG4gICAgICBpZiAoIW9wdGlvbnMub2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzKSB7XHJcbiAgICAgICAgb3B0aW9ucy5vZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnMgPSBvZ2NGaWx0ZXJXcml0ZXIuZGVmaW5lSW50ZXJmYWNlRmlsdGVyU2VxdWVuY2UoXHJcbiAgICAgICAgICBvcHRpb25zLm9nY0ZpbHRlcnMuZmlsdGVycyxcclxuICAgICAgICAgIG9wdGlvbnMucGFyYW1zV0ZTLmZpZWxkTmFtZUdlb21ldHJ5XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldE9nY1dNU0ZpbHRlcnNPcHRpb25zKHdtc0RhdGFzb3VyY2U6IE9nY0ZpbHRlcmFibGVEYXRhU291cmNlKSB7XHJcbiAgICBjb25zdCBvcHRpb25zOiBhbnkgPSB3bXNEYXRhc291cmNlLm9wdGlvbnM7XHJcbiAgICBjb25zdCBvZ2NGaWx0ZXJXcml0ZXIgPSBuZXcgT2djRmlsdGVyV3JpdGVyKCk7XHJcblxyXG4gICAgaWYgKG9wdGlvbnMub2djRmlsdGVycy5lbmFibGVkICYmIG9wdGlvbnMub2djRmlsdGVycy5maWx0ZXJzKSB7XHJcbiAgICAgIG9wdGlvbnMub2djRmlsdGVycy5maWx0ZXJzID0gb2djRmlsdGVyV3JpdGVyLmNoZWNrSWdvRmlsdGVyc1Byb3BlcnRpZXMoXHJcbiAgICAgICAgb3B0aW9ucy5vZ2NGaWx0ZXJzLmZpbHRlcnMsXHJcbiAgICAgICAgb3B0aW9ucy5maWVsZE5hbWVHZW9tZXRyeSxcclxuICAgICAgICB0cnVlXHJcbiAgICAgICk7XHJcbiAgICAgIGlmICghb3B0aW9ucy5vZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnMpIHtcclxuICAgICAgICBvcHRpb25zLm9nY0ZpbHRlcnMuaW50ZXJmYWNlT2djRmlsdGVycyA9IG9nY0ZpbHRlcldyaXRlci5kZWZpbmVJbnRlcmZhY2VGaWx0ZXJTZXF1ZW5jZShcclxuICAgICAgICAgIC8vIFdpdGggc29tZSB3bXMgc2VydmVyLCB0aGlzIHBhcmFtIG11c3QgYmUgc2V0IHRvIG1ha2Ugc3BhdGlhbHMgY2FsbC5cclxuICAgICAgICAgIG9wdGlvbnMub2djRmlsdGVycy5maWx0ZXJzLFxyXG4gICAgICAgICAgb3B0aW9ucy5maWVsZE5hbWVHZW9tZXRyeVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5maWx0ZXJCeU9nYyhcclxuICAgICAgICB3bXNEYXRhc291cmNlIGFzIFdNU0RhdGFTb3VyY2UsXHJcbiAgICAgICAgb2djRmlsdGVyV3JpdGVyLmJ1aWxkRmlsdGVyKG9wdGlvbnMub2djRmlsdGVycy5maWx0ZXJzKVxyXG4gICAgICApO1xyXG4gICAgICBvcHRpb25zLmZpbHRlcmVkID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG9wdGlvbnMub2djRmlsdGVycy5maWx0ZXJzID0gdW5kZWZpbmVkO1xyXG4gICAgICBvcHRpb25zLm9nY0ZpbHRlcnMuaW50ZXJmYWNlT2djRmlsdGVycyA9IFtdO1xyXG4gICAgICBvcHRpb25zLmZpbHRlcmVkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==