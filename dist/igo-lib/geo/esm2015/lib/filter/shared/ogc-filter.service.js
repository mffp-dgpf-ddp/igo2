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
        const appliedFilter = new OgcFilterWriter().formatProcessedOgcFilter(filterString, wmsDatasource.options.params.layers);
        wmsDatasource.ol.updateParams({ filter: appliedFilter });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ZpbHRlci9zaGFyZWQvb2djLWZpbHRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFJL0MsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQixnQkFBZSxDQUFDOzs7Ozs7SUFFVCxXQUFXLENBQUMsYUFBNEIsRUFBRSxZQUFvQjs7Y0FDN0QsYUFBYSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUMsd0JBQXdCLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUN2SCxhQUFhLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO0lBQzNELENBQUM7Ozs7O0lBRU0sdUJBQXVCLENBQUMsYUFBc0M7O2NBQzdELE9BQU8sR0FBUSxhQUFhLENBQUMsT0FBTzs7Y0FDcEMsZUFBZSxHQUFHLElBQUksZUFBZSxFQUFFO1FBRTdDLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDNUQsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDLHlCQUF5QixDQUNwRSxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFDMUIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFDbkMsSUFBSSxDQUNMLENBQUM7WUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRTtnQkFDM0MsT0FBTyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsR0FBRyxlQUFlLENBQUMsNkJBQTZCLENBQ3BGLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUMxQixPQUFPLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUNwQyxDQUFDO2FBQ0g7U0FDRjtJQUNILENBQUM7Ozs7O0lBRU0sdUJBQXVCLENBQUMsYUFBc0M7O2NBQzdELE9BQU8sR0FBUSxhQUFhLENBQUMsT0FBTzs7Y0FDcEMsZUFBZSxHQUFHLElBQUksZUFBZSxFQUFFO1FBRTdDLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDNUQsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDLHlCQUF5QixDQUNwRSxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFDMUIsT0FBTyxDQUFDLGlCQUFpQixFQUN6QixJQUFJLENBQ0wsQ0FBQztZQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLG1CQUFtQixFQUFFO2dCQUMzQyxPQUFPLENBQUMsVUFBVSxDQUFDLG1CQUFtQixHQUFHLGVBQWUsQ0FBQyw2QkFBNkI7Z0JBQ3BGLHNFQUFzRTtnQkFDdEUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQzFCLE9BQU8sQ0FBQyxpQkFBaUIsQ0FDMUIsQ0FBQzthQUNIO1lBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FDZCxtQkFBQSxhQUFhLEVBQWlCLEVBQzlCLGVBQWUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FDeEQsQ0FBQztZQUNGLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ3pCO2FBQU07WUFDTCxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7WUFDdkMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUM7WUFDNUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7U0FDMUI7SUFDSCxDQUFDOzs7WUF2REYsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFdNU0RhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy93bXMtZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IE9nY0ZpbHRlcldyaXRlciB9IGZyb20gJy4vb2djLWZpbHRlcic7XHJcbmltcG9ydCB7IE9nY0ZpbHRlcmFibGVEYXRhU291cmNlIH0gZnJvbSAnLi9vZ2MtZmlsdGVyLmludGVyZmFjZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBPR0NGaWx0ZXJTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIHB1YmxpYyBmaWx0ZXJCeU9nYyh3bXNEYXRhc291cmNlOiBXTVNEYXRhU291cmNlLCBmaWx0ZXJTdHJpbmc6IHN0cmluZykge1xyXG4gICAgY29uc3QgYXBwbGllZEZpbHRlciA9IG5ldyBPZ2NGaWx0ZXJXcml0ZXIoKS5mb3JtYXRQcm9jZXNzZWRPZ2NGaWx0ZXIoZmlsdGVyU3RyaW5nLCB3bXNEYXRhc291cmNlLm9wdGlvbnMucGFyYW1zLmxheWVycyk7XHJcbiAgICB3bXNEYXRhc291cmNlLm9sLnVwZGF0ZVBhcmFtcyh7IGZpbHRlcjogYXBwbGllZEZpbHRlciB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRPZ2NXRlNGaWx0ZXJzT3B0aW9ucyh3ZnNEYXRhc291cmNlOiBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZSkge1xyXG4gICAgY29uc3Qgb3B0aW9uczogYW55ID0gd2ZzRGF0YXNvdXJjZS5vcHRpb25zO1xyXG4gICAgY29uc3Qgb2djRmlsdGVyV3JpdGVyID0gbmV3IE9nY0ZpbHRlcldyaXRlcigpO1xyXG5cclxuICAgIGlmIChvcHRpb25zLm9nY0ZpbHRlcnMuZW5hYmxlZCAmJiBvcHRpb25zLm9nY0ZpbHRlcnMuZmlsdGVycykge1xyXG4gICAgICBvcHRpb25zLm9nY0ZpbHRlcnMuZmlsdGVycyA9IG9nY0ZpbHRlcldyaXRlci5jaGVja0lnb0ZpbHRlcnNQcm9wZXJ0aWVzKFxyXG4gICAgICAgIG9wdGlvbnMub2djRmlsdGVycy5maWx0ZXJzLFxyXG4gICAgICAgIG9wdGlvbnMucGFyYW1zV0ZTLmZpZWxkTmFtZUdlb21ldHJ5LFxyXG4gICAgICAgIHRydWVcclxuICAgICAgKTtcclxuICAgICAgaWYgKCFvcHRpb25zLm9nY0ZpbHRlcnMuaW50ZXJmYWNlT2djRmlsdGVycykge1xyXG4gICAgICAgIG9wdGlvbnMub2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzID0gb2djRmlsdGVyV3JpdGVyLmRlZmluZUludGVyZmFjZUZpbHRlclNlcXVlbmNlKFxyXG4gICAgICAgICAgb3B0aW9ucy5vZ2NGaWx0ZXJzLmZpbHRlcnMsXHJcbiAgICAgICAgICBvcHRpb25zLnBhcmFtc1dGUy5maWVsZE5hbWVHZW9tZXRyeVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRPZ2NXTVNGaWx0ZXJzT3B0aW9ucyh3bXNEYXRhc291cmNlOiBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZSkge1xyXG4gICAgY29uc3Qgb3B0aW9uczogYW55ID0gd21zRGF0YXNvdXJjZS5vcHRpb25zO1xyXG4gICAgY29uc3Qgb2djRmlsdGVyV3JpdGVyID0gbmV3IE9nY0ZpbHRlcldyaXRlcigpO1xyXG5cclxuICAgIGlmIChvcHRpb25zLm9nY0ZpbHRlcnMuZW5hYmxlZCAmJiBvcHRpb25zLm9nY0ZpbHRlcnMuZmlsdGVycykge1xyXG4gICAgICBvcHRpb25zLm9nY0ZpbHRlcnMuZmlsdGVycyA9IG9nY0ZpbHRlcldyaXRlci5jaGVja0lnb0ZpbHRlcnNQcm9wZXJ0aWVzKFxyXG4gICAgICAgIG9wdGlvbnMub2djRmlsdGVycy5maWx0ZXJzLFxyXG4gICAgICAgIG9wdGlvbnMuZmllbGROYW1lR2VvbWV0cnksXHJcbiAgICAgICAgdHJ1ZVxyXG4gICAgICApO1xyXG4gICAgICBpZiAoIW9wdGlvbnMub2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzKSB7XHJcbiAgICAgICAgb3B0aW9ucy5vZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnMgPSBvZ2NGaWx0ZXJXcml0ZXIuZGVmaW5lSW50ZXJmYWNlRmlsdGVyU2VxdWVuY2UoXHJcbiAgICAgICAgICAvLyBXaXRoIHNvbWUgd21zIHNlcnZlciwgdGhpcyBwYXJhbSBtdXN0IGJlIHNldCB0byBtYWtlIHNwYXRpYWxzIGNhbGwuXHJcbiAgICAgICAgICBvcHRpb25zLm9nY0ZpbHRlcnMuZmlsdGVycyxcclxuICAgICAgICAgIG9wdGlvbnMuZmllbGROYW1lR2VvbWV0cnlcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZmlsdGVyQnlPZ2MoXHJcbiAgICAgICAgd21zRGF0YXNvdXJjZSBhcyBXTVNEYXRhU291cmNlLFxyXG4gICAgICAgIG9nY0ZpbHRlcldyaXRlci5idWlsZEZpbHRlcihvcHRpb25zLm9nY0ZpbHRlcnMuZmlsdGVycylcclxuICAgICAgKTtcclxuICAgICAgb3B0aW9ucy5maWx0ZXJlZCA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvcHRpb25zLm9nY0ZpbHRlcnMuZmlsdGVycyA9IHVuZGVmaW5lZDtcclxuICAgICAgb3B0aW9ucy5vZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnMgPSBbXTtcclxuICAgICAgb3B0aW9ucy5maWx0ZXJlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=