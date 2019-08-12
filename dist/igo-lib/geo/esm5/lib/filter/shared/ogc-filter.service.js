/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { OgcFilterWriter } from './ogc-filter';
var OGCFilterService = /** @class */ (function () {
    function OGCFilterService() {
    }
    /**
     * @param {?} wmsDatasource
     * @param {?} filterString
     * @return {?}
     */
    OGCFilterService.prototype.filterByOgc = /**
     * @param {?} wmsDatasource
     * @param {?} filterString
     * @return {?}
     */
    function (wmsDatasource, filterString) {
        /** @type {?} */
        var appliedFilter = wmsDatasource.formatProcessedOgcFilter(filterString, wmsDatasource.options.params.layers);
        /** @type {?} */
        var wmsFilterValue = appliedFilter.length > 0
            ? appliedFilter.replace('filter=', '')
            : undefined;
        wmsDatasource.ol.updateParams({ filter: wmsFilterValue });
    };
    /**
     * @param {?} wfsDatasource
     * @return {?}
     */
    OGCFilterService.prototype.setOgcWFSFiltersOptions = /**
     * @param {?} wfsDatasource
     * @return {?}
     */
    function (wfsDatasource) {
        /** @type {?} */
        var options = wfsDatasource.options;
        /** @type {?} */
        var ogcFilterWriter = new OgcFilterWriter();
        if (options.ogcFilters.enabled && options.ogcFilters.filters) {
            options.ogcFilters.filters = ogcFilterWriter.checkIgoFiltersProperties(options.ogcFilters.filters, options.paramsWFS.fieldNameGeometry, true);
            if (!options.ogcFilters.interfaceOgcFilters) {
                options.ogcFilters.interfaceOgcFilters = ogcFilterWriter.defineInterfaceFilterSequence(options.ogcFilters.filters, options.paramsWFS.fieldNameGeometry);
            }
        }
    };
    /**
     * @param {?} wmsDatasource
     * @return {?}
     */
    OGCFilterService.prototype.setOgcWMSFiltersOptions = /**
     * @param {?} wmsDatasource
     * @return {?}
     */
    function (wmsDatasource) {
        /** @type {?} */
        var options = wmsDatasource.options;
        /** @type {?} */
        var ogcFilterWriter = new OgcFilterWriter();
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
    };
    OGCFilterService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    OGCFilterService.ctorParameters = function () { return []; };
    return OGCFilterService;
}());
export { OGCFilterService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ZpbHRlci9zaGFyZWQvb2djLWZpbHRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHL0M7SUFFRTtJQUFlLENBQUM7Ozs7OztJQUVULHNDQUFXOzs7OztJQUFsQixVQUFtQixhQUE0QixFQUFFLFlBQW9COztZQUM3RCxhQUFhLEdBQUcsYUFBYSxDQUFDLHdCQUF3QixDQUFDLFlBQVksRUFBRSxhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7O1lBQ3pHLGNBQWMsR0FBRyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUM7WUFDM0MsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQztZQUN0QyxDQUFDLENBQUMsU0FBUztRQUNmLGFBQWEsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7SUFDNUQsQ0FBQzs7Ozs7SUFFTSxrREFBdUI7Ozs7SUFBOUIsVUFBK0IsYUFBc0M7O1lBQzdELE9BQU8sR0FBUSxhQUFhLENBQUMsT0FBTzs7WUFDcEMsZUFBZSxHQUFHLElBQUksZUFBZSxFQUFFO1FBRTdDLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDNUQsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDLHlCQUF5QixDQUNwRSxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFDMUIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFDbkMsSUFBSSxDQUNMLENBQUM7WUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRTtnQkFDM0MsT0FBTyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsR0FBRyxlQUFlLENBQUMsNkJBQTZCLENBQ3BGLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUMxQixPQUFPLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUNwQyxDQUFDO2FBQ0g7U0FDRjtJQUNILENBQUM7Ozs7O0lBRU0sa0RBQXVCOzs7O0lBQTlCLFVBQStCLGFBQXNDOztZQUM3RCxPQUFPLEdBQVEsYUFBYSxDQUFDLE9BQU87O1lBQ3BDLGVBQWUsR0FBRyxJQUFJLGVBQWUsRUFBRTtRQUU3QyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFO1lBQzVELE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQyx5QkFBeUIsQ0FDcEUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQzFCLE9BQU8sQ0FBQyxpQkFBaUIsRUFDekIsSUFBSSxDQUNMLENBQUM7WUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRTtnQkFDM0MsT0FBTyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsR0FBRyxlQUFlLENBQUMsNkJBQTZCO2dCQUNwRixzRUFBc0U7Z0JBQ3RFLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUMxQixPQUFPLENBQUMsaUJBQWlCLENBQzFCLENBQUM7YUFDSDtZQUNELElBQUksQ0FBQyxXQUFXLENBQ2QsbUJBQUEsYUFBYSxFQUFpQixFQUM5QixlQUFlLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQ3hELENBQUM7WUFDRixPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztTQUN6QjthQUFNO1lBQ0wsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1lBQ3ZDLE9BQU8sQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDO1lBQzVDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQzs7Z0JBMURGLFVBQVU7Ozs7SUEyRFgsdUJBQUM7Q0FBQSxBQTNERCxJQTJEQztTQTFEWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgV01TRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL3dtcy1kYXRhc291cmNlJztcclxuaW1wb3J0IHsgV0ZTRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy93ZnMtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJXcml0ZXIgfSBmcm9tICcuL29nYy1maWx0ZXInO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZSB9IGZyb20gJy4vb2djLWZpbHRlci5pbnRlcmZhY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgT0dDRmlsdGVyU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBwdWJsaWMgZmlsdGVyQnlPZ2Mod21zRGF0YXNvdXJjZTogV01TRGF0YVNvdXJjZSwgZmlsdGVyU3RyaW5nOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGFwcGxpZWRGaWx0ZXIgPSB3bXNEYXRhc291cmNlLmZvcm1hdFByb2Nlc3NlZE9nY0ZpbHRlcihmaWx0ZXJTdHJpbmcsIHdtc0RhdGFzb3VyY2Uub3B0aW9ucy5wYXJhbXMubGF5ZXJzKTtcclxuICAgIGNvbnN0IHdtc0ZpbHRlclZhbHVlID0gYXBwbGllZEZpbHRlci5sZW5ndGggPiAwXHJcbiAgICAgICAgPyBhcHBsaWVkRmlsdGVyLnJlcGxhY2UoJ2ZpbHRlcj0nLCAnJylcclxuICAgICAgICA6IHVuZGVmaW5lZDtcclxuICAgIHdtc0RhdGFzb3VyY2Uub2wudXBkYXRlUGFyYW1zKHsgZmlsdGVyOiB3bXNGaWx0ZXJWYWx1ZSB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRPZ2NXRlNGaWx0ZXJzT3B0aW9ucyh3ZnNEYXRhc291cmNlOiBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZSkge1xyXG4gICAgY29uc3Qgb3B0aW9uczogYW55ID0gd2ZzRGF0YXNvdXJjZS5vcHRpb25zO1xyXG4gICAgY29uc3Qgb2djRmlsdGVyV3JpdGVyID0gbmV3IE9nY0ZpbHRlcldyaXRlcigpO1xyXG5cclxuICAgIGlmIChvcHRpb25zLm9nY0ZpbHRlcnMuZW5hYmxlZCAmJiBvcHRpb25zLm9nY0ZpbHRlcnMuZmlsdGVycykge1xyXG4gICAgICBvcHRpb25zLm9nY0ZpbHRlcnMuZmlsdGVycyA9IG9nY0ZpbHRlcldyaXRlci5jaGVja0lnb0ZpbHRlcnNQcm9wZXJ0aWVzKFxyXG4gICAgICAgIG9wdGlvbnMub2djRmlsdGVycy5maWx0ZXJzLFxyXG4gICAgICAgIG9wdGlvbnMucGFyYW1zV0ZTLmZpZWxkTmFtZUdlb21ldHJ5LFxyXG4gICAgICAgIHRydWVcclxuICAgICAgKTtcclxuICAgICAgaWYgKCFvcHRpb25zLm9nY0ZpbHRlcnMuaW50ZXJmYWNlT2djRmlsdGVycykge1xyXG4gICAgICAgIG9wdGlvbnMub2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzID0gb2djRmlsdGVyV3JpdGVyLmRlZmluZUludGVyZmFjZUZpbHRlclNlcXVlbmNlKFxyXG4gICAgICAgICAgb3B0aW9ucy5vZ2NGaWx0ZXJzLmZpbHRlcnMsXHJcbiAgICAgICAgICBvcHRpb25zLnBhcmFtc1dGUy5maWVsZE5hbWVHZW9tZXRyeVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRPZ2NXTVNGaWx0ZXJzT3B0aW9ucyh3bXNEYXRhc291cmNlOiBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZSkge1xyXG4gICAgY29uc3Qgb3B0aW9uczogYW55ID0gd21zRGF0YXNvdXJjZS5vcHRpb25zO1xyXG4gICAgY29uc3Qgb2djRmlsdGVyV3JpdGVyID0gbmV3IE9nY0ZpbHRlcldyaXRlcigpO1xyXG5cclxuICAgIGlmIChvcHRpb25zLm9nY0ZpbHRlcnMuZW5hYmxlZCAmJiBvcHRpb25zLm9nY0ZpbHRlcnMuZmlsdGVycykge1xyXG4gICAgICBvcHRpb25zLm9nY0ZpbHRlcnMuZmlsdGVycyA9IG9nY0ZpbHRlcldyaXRlci5jaGVja0lnb0ZpbHRlcnNQcm9wZXJ0aWVzKFxyXG4gICAgICAgIG9wdGlvbnMub2djRmlsdGVycy5maWx0ZXJzLFxyXG4gICAgICAgIG9wdGlvbnMuZmllbGROYW1lR2VvbWV0cnksXHJcbiAgICAgICAgdHJ1ZVxyXG4gICAgICApO1xyXG4gICAgICBpZiAoIW9wdGlvbnMub2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzKSB7XHJcbiAgICAgICAgb3B0aW9ucy5vZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnMgPSBvZ2NGaWx0ZXJXcml0ZXIuZGVmaW5lSW50ZXJmYWNlRmlsdGVyU2VxdWVuY2UoXHJcbiAgICAgICAgICAvLyBXaXRoIHNvbWUgd21zIHNlcnZlciwgdGhpcyBwYXJhbSBtdXN0IGJlIHNldCB0byBtYWtlIHNwYXRpYWxzIGNhbGwuXHJcbiAgICAgICAgICBvcHRpb25zLm9nY0ZpbHRlcnMuZmlsdGVycyxcclxuICAgICAgICAgIG9wdGlvbnMuZmllbGROYW1lR2VvbWV0cnlcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZmlsdGVyQnlPZ2MoXHJcbiAgICAgICAgd21zRGF0YXNvdXJjZSBhcyBXTVNEYXRhU291cmNlLFxyXG4gICAgICAgIG9nY0ZpbHRlcldyaXRlci5idWlsZEZpbHRlcihvcHRpb25zLm9nY0ZpbHRlcnMuZmlsdGVycylcclxuICAgICAgKTtcclxuICAgICAgb3B0aW9ucy5maWx0ZXJlZCA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvcHRpb25zLm9nY0ZpbHRlcnMuZmlsdGVycyA9IHVuZGVmaW5lZDtcclxuICAgICAgb3B0aW9ucy5vZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnMgPSBbXTtcclxuICAgICAgb3B0aW9ucy5maWx0ZXJlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=