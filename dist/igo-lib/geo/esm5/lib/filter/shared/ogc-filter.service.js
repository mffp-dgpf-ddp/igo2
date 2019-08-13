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
        var appliedFilter = new OgcFilterWriter().formatProcessedOgcFilter(filterString, wmsDatasource.options.params.layers);
        wmsDatasource.ol.updateParams({ filter: appliedFilter });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ZpbHRlci9zaGFyZWQvb2djLWZpbHRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHL0M7SUFFRTtJQUFlLENBQUM7Ozs7OztJQUVULHNDQUFXOzs7OztJQUFsQixVQUFtQixhQUE0QixFQUFFLFlBQW9COztZQUM3RCxhQUFhLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ3ZILGFBQWEsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7Ozs7SUFFTSxrREFBdUI7Ozs7SUFBOUIsVUFBK0IsYUFBc0M7O1lBQzdELE9BQU8sR0FBUSxhQUFhLENBQUMsT0FBTzs7WUFDcEMsZUFBZSxHQUFHLElBQUksZUFBZSxFQUFFO1FBRTdDLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDNUQsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDLHlCQUF5QixDQUNwRSxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFDMUIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFDbkMsSUFBSSxDQUNMLENBQUM7WUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRTtnQkFDM0MsT0FBTyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsR0FBRyxlQUFlLENBQUMsNkJBQTZCLENBQ3BGLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUMxQixPQUFPLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUNwQyxDQUFDO2FBQ0g7U0FDRjtJQUNILENBQUM7Ozs7O0lBRU0sa0RBQXVCOzs7O0lBQTlCLFVBQStCLGFBQXNDOztZQUM3RCxPQUFPLEdBQVEsYUFBYSxDQUFDLE9BQU87O1lBQ3BDLGVBQWUsR0FBRyxJQUFJLGVBQWUsRUFBRTtRQUU3QyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFO1lBQzVELE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQyx5QkFBeUIsQ0FDcEUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQzFCLE9BQU8sQ0FBQyxpQkFBaUIsRUFDekIsSUFBSSxDQUNMLENBQUM7WUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRTtnQkFDM0MsT0FBTyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsR0FBRyxlQUFlLENBQUMsNkJBQTZCO2dCQUNwRixzRUFBc0U7Z0JBQ3RFLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUMxQixPQUFPLENBQUMsaUJBQWlCLENBQzFCLENBQUM7YUFDSDtZQUNELElBQUksQ0FBQyxXQUFXLENBQ2QsbUJBQUEsYUFBYSxFQUFpQixFQUM5QixlQUFlLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQ3hELENBQUM7WUFDRixPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztTQUN6QjthQUFNO1lBQ0wsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1lBQ3ZDLE9BQU8sQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDO1lBQzVDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQzs7Z0JBdkRGLFVBQVU7Ozs7SUF3RFgsdUJBQUM7Q0FBQSxBQXhERCxJQXdEQztTQXZEWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBXTVNEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd21zLWRhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJXcml0ZXIgfSBmcm9tICcuL29nYy1maWx0ZXInO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZSB9IGZyb20gJy4vb2djLWZpbHRlci5pbnRlcmZhY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgT0dDRmlsdGVyU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBwdWJsaWMgZmlsdGVyQnlPZ2Mod21zRGF0YXNvdXJjZTogV01TRGF0YVNvdXJjZSwgZmlsdGVyU3RyaW5nOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGFwcGxpZWRGaWx0ZXIgPSBuZXcgT2djRmlsdGVyV3JpdGVyKCkuZm9ybWF0UHJvY2Vzc2VkT2djRmlsdGVyKGZpbHRlclN0cmluZywgd21zRGF0YXNvdXJjZS5vcHRpb25zLnBhcmFtcy5sYXllcnMpO1xyXG4gICAgd21zRGF0YXNvdXJjZS5vbC51cGRhdGVQYXJhbXMoeyBmaWx0ZXI6IGFwcGxpZWRGaWx0ZXIgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0T2djV0ZTRmlsdGVyc09wdGlvbnMod2ZzRGF0YXNvdXJjZTogT2djRmlsdGVyYWJsZURhdGFTb3VyY2UpIHtcclxuICAgIGNvbnN0IG9wdGlvbnM6IGFueSA9IHdmc0RhdGFzb3VyY2Uub3B0aW9ucztcclxuICAgIGNvbnN0IG9nY0ZpbHRlcldyaXRlciA9IG5ldyBPZ2NGaWx0ZXJXcml0ZXIoKTtcclxuXHJcbiAgICBpZiAob3B0aW9ucy5vZ2NGaWx0ZXJzLmVuYWJsZWQgJiYgb3B0aW9ucy5vZ2NGaWx0ZXJzLmZpbHRlcnMpIHtcclxuICAgICAgb3B0aW9ucy5vZ2NGaWx0ZXJzLmZpbHRlcnMgPSBvZ2NGaWx0ZXJXcml0ZXIuY2hlY2tJZ29GaWx0ZXJzUHJvcGVydGllcyhcclxuICAgICAgICBvcHRpb25zLm9nY0ZpbHRlcnMuZmlsdGVycyxcclxuICAgICAgICBvcHRpb25zLnBhcmFtc1dGUy5maWVsZE5hbWVHZW9tZXRyeSxcclxuICAgICAgICB0cnVlXHJcbiAgICAgICk7XHJcbiAgICAgIGlmICghb3B0aW9ucy5vZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnMpIHtcclxuICAgICAgICBvcHRpb25zLm9nY0ZpbHRlcnMuaW50ZXJmYWNlT2djRmlsdGVycyA9IG9nY0ZpbHRlcldyaXRlci5kZWZpbmVJbnRlcmZhY2VGaWx0ZXJTZXF1ZW5jZShcclxuICAgICAgICAgIG9wdGlvbnMub2djRmlsdGVycy5maWx0ZXJzLFxyXG4gICAgICAgICAgb3B0aW9ucy5wYXJhbXNXRlMuZmllbGROYW1lR2VvbWV0cnlcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0T2djV01TRmlsdGVyc09wdGlvbnMod21zRGF0YXNvdXJjZTogT2djRmlsdGVyYWJsZURhdGFTb3VyY2UpIHtcclxuICAgIGNvbnN0IG9wdGlvbnM6IGFueSA9IHdtc0RhdGFzb3VyY2Uub3B0aW9ucztcclxuICAgIGNvbnN0IG9nY0ZpbHRlcldyaXRlciA9IG5ldyBPZ2NGaWx0ZXJXcml0ZXIoKTtcclxuXHJcbiAgICBpZiAob3B0aW9ucy5vZ2NGaWx0ZXJzLmVuYWJsZWQgJiYgb3B0aW9ucy5vZ2NGaWx0ZXJzLmZpbHRlcnMpIHtcclxuICAgICAgb3B0aW9ucy5vZ2NGaWx0ZXJzLmZpbHRlcnMgPSBvZ2NGaWx0ZXJXcml0ZXIuY2hlY2tJZ29GaWx0ZXJzUHJvcGVydGllcyhcclxuICAgICAgICBvcHRpb25zLm9nY0ZpbHRlcnMuZmlsdGVycyxcclxuICAgICAgICBvcHRpb25zLmZpZWxkTmFtZUdlb21ldHJ5LFxyXG4gICAgICAgIHRydWVcclxuICAgICAgKTtcclxuICAgICAgaWYgKCFvcHRpb25zLm9nY0ZpbHRlcnMuaW50ZXJmYWNlT2djRmlsdGVycykge1xyXG4gICAgICAgIG9wdGlvbnMub2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzID0gb2djRmlsdGVyV3JpdGVyLmRlZmluZUludGVyZmFjZUZpbHRlclNlcXVlbmNlKFxyXG4gICAgICAgICAgLy8gV2l0aCBzb21lIHdtcyBzZXJ2ZXIsIHRoaXMgcGFyYW0gbXVzdCBiZSBzZXQgdG8gbWFrZSBzcGF0aWFscyBjYWxsLlxyXG4gICAgICAgICAgb3B0aW9ucy5vZ2NGaWx0ZXJzLmZpbHRlcnMsXHJcbiAgICAgICAgICBvcHRpb25zLmZpZWxkTmFtZUdlb21ldHJ5XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmZpbHRlckJ5T2djKFxyXG4gICAgICAgIHdtc0RhdGFzb3VyY2UgYXMgV01TRGF0YVNvdXJjZSxcclxuICAgICAgICBvZ2NGaWx0ZXJXcml0ZXIuYnVpbGRGaWx0ZXIob3B0aW9ucy5vZ2NGaWx0ZXJzLmZpbHRlcnMpXHJcbiAgICAgICk7XHJcbiAgICAgIG9wdGlvbnMuZmlsdGVyZWQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb3B0aW9ucy5vZ2NGaWx0ZXJzLmZpbHRlcnMgPSB1bmRlZmluZWQ7XHJcbiAgICAgIG9wdGlvbnMub2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzID0gW107XHJcbiAgICAgIG9wdGlvbnMuZmlsdGVyZWQgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19