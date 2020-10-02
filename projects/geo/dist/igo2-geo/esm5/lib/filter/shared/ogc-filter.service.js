/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import olProjection from 'ol/proj/Projection';
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
        var appliedFilter = new OgcFilterWriter().formatProcessedOgcFilter(filterString, wmsDatasource.options.params.LAYERS);
        wmsDatasource.ol.updateParams({ FILTER: appliedFilter });
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
            options.ogcFilters.filters = ogcFilterWriter.checkIgoFiltersProperties(options.ogcFilters.filters, options.paramsWFS.fieldNameGeometry, new olProjection({ code: options.paramsWFS.srsName }), true);
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
            options.ogcFilters.filters = ogcFilterWriter.checkIgoFiltersProperties(options.ogcFilters.filters, options.fieldNameGeometry, undefined, true);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ZpbHRlci9zaGFyZWQvb2djLWZpbHRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sWUFBWSxNQUFNLG9CQUFvQixDQUFDO0FBRzlDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHL0M7SUFFRTtJQUFlLENBQUM7Ozs7OztJQUVULHNDQUFXOzs7OztJQUFsQixVQUFtQixhQUE0QixFQUFFLFlBQW9COztZQUM3RCxhQUFhLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ3ZILGFBQWEsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7Ozs7SUFFTSxrREFBdUI7Ozs7SUFBOUIsVUFBK0IsYUFBc0M7O1lBQzdELE9BQU8sR0FBUSxhQUFhLENBQUMsT0FBTzs7WUFDcEMsZUFBZSxHQUFHLElBQUksZUFBZSxFQUFFO1FBRTdDLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDNUQsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDLHlCQUF5QixDQUNwRSxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFDMUIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFDbkMsSUFBSSxZQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUNyRCxJQUFJLENBQ0wsQ0FBQztZQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLG1CQUFtQixFQUFFO2dCQUMzQyxPQUFPLENBQUMsVUFBVSxDQUFDLG1CQUFtQixHQUFHLGVBQWUsQ0FBQyw2QkFBNkIsQ0FDcEYsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQzFCLE9BQU8sQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQ3BDLENBQUM7YUFDSDtTQUNGO0lBQ0gsQ0FBQzs7Ozs7SUFFTSxrREFBdUI7Ozs7SUFBOUIsVUFBK0IsYUFBc0M7O1lBQzdELE9BQU8sR0FBUSxhQUFhLENBQUMsT0FBTzs7WUFDcEMsZUFBZSxHQUFHLElBQUksZUFBZSxFQUFFO1FBRTdDLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDNUQsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDLHlCQUF5QixDQUNwRSxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFDMUIsT0FBTyxDQUFDLGlCQUFpQixFQUN6QixTQUFTLEVBQ1QsSUFBSSxDQUNMLENBQUM7WUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRTtnQkFDM0MsT0FBTyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsR0FBRyxlQUFlLENBQUMsNkJBQTZCO2dCQUNwRixzRUFBc0U7Z0JBQ3RFLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUMxQixPQUFPLENBQUMsaUJBQWlCLENBQzFCLENBQUM7YUFDSDtZQUNELElBQUksQ0FBQyxXQUFXLENBQ2QsbUJBQUEsYUFBYSxFQUFpQixFQUM5QixlQUFlLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQ3hELENBQUM7WUFDRixPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztTQUN6QjthQUFNO1lBQ0wsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1lBQ3ZDLE9BQU8sQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDO1lBQzVDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQzs7Z0JBekRGLFVBQVU7Ozs7SUEwRFgsdUJBQUM7Q0FBQSxBQTFERCxJQTBEQztTQXpEWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgb2xQcm9qZWN0aW9uIGZyb20gJ29sL3Byb2ovUHJvamVjdGlvbic7XHJcblxyXG5pbXBvcnQgeyBXTVNEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd21zLWRhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJXcml0ZXIgfSBmcm9tICcuL29nYy1maWx0ZXInO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZSB9IGZyb20gJy4vb2djLWZpbHRlci5pbnRlcmZhY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgT0dDRmlsdGVyU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBwdWJsaWMgZmlsdGVyQnlPZ2Mod21zRGF0YXNvdXJjZTogV01TRGF0YVNvdXJjZSwgZmlsdGVyU3RyaW5nOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGFwcGxpZWRGaWx0ZXIgPSBuZXcgT2djRmlsdGVyV3JpdGVyKCkuZm9ybWF0UHJvY2Vzc2VkT2djRmlsdGVyKGZpbHRlclN0cmluZywgd21zRGF0YXNvdXJjZS5vcHRpb25zLnBhcmFtcy5MQVlFUlMpO1xyXG4gICAgd21zRGF0YXNvdXJjZS5vbC51cGRhdGVQYXJhbXMoeyBGSUxURVI6IGFwcGxpZWRGaWx0ZXIgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0T2djV0ZTRmlsdGVyc09wdGlvbnMod2ZzRGF0YXNvdXJjZTogT2djRmlsdGVyYWJsZURhdGFTb3VyY2UpIHtcclxuICAgIGNvbnN0IG9wdGlvbnM6IGFueSA9IHdmc0RhdGFzb3VyY2Uub3B0aW9ucztcclxuICAgIGNvbnN0IG9nY0ZpbHRlcldyaXRlciA9IG5ldyBPZ2NGaWx0ZXJXcml0ZXIoKTtcclxuXHJcbiAgICBpZiAob3B0aW9ucy5vZ2NGaWx0ZXJzLmVuYWJsZWQgJiYgb3B0aW9ucy5vZ2NGaWx0ZXJzLmZpbHRlcnMpIHtcclxuICAgICAgb3B0aW9ucy5vZ2NGaWx0ZXJzLmZpbHRlcnMgPSBvZ2NGaWx0ZXJXcml0ZXIuY2hlY2tJZ29GaWx0ZXJzUHJvcGVydGllcyhcclxuICAgICAgICBvcHRpb25zLm9nY0ZpbHRlcnMuZmlsdGVycyxcclxuICAgICAgICBvcHRpb25zLnBhcmFtc1dGUy5maWVsZE5hbWVHZW9tZXRyeSxcclxuICAgICAgICBuZXcgb2xQcm9qZWN0aW9uKHsgY29kZTogb3B0aW9ucy5wYXJhbXNXRlMuc3JzTmFtZSB9KSxcclxuICAgICAgICB0cnVlXHJcbiAgICAgICk7XHJcbiAgICAgIGlmICghb3B0aW9ucy5vZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnMpIHtcclxuICAgICAgICBvcHRpb25zLm9nY0ZpbHRlcnMuaW50ZXJmYWNlT2djRmlsdGVycyA9IG9nY0ZpbHRlcldyaXRlci5kZWZpbmVJbnRlcmZhY2VGaWx0ZXJTZXF1ZW5jZShcclxuICAgICAgICAgIG9wdGlvbnMub2djRmlsdGVycy5maWx0ZXJzLFxyXG4gICAgICAgICAgb3B0aW9ucy5wYXJhbXNXRlMuZmllbGROYW1lR2VvbWV0cnlcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0T2djV01TRmlsdGVyc09wdGlvbnMod21zRGF0YXNvdXJjZTogT2djRmlsdGVyYWJsZURhdGFTb3VyY2UpIHtcclxuICAgIGNvbnN0IG9wdGlvbnM6IGFueSA9IHdtc0RhdGFzb3VyY2Uub3B0aW9ucztcclxuICAgIGNvbnN0IG9nY0ZpbHRlcldyaXRlciA9IG5ldyBPZ2NGaWx0ZXJXcml0ZXIoKTtcclxuXHJcbiAgICBpZiAob3B0aW9ucy5vZ2NGaWx0ZXJzLmVuYWJsZWQgJiYgb3B0aW9ucy5vZ2NGaWx0ZXJzLmZpbHRlcnMpIHtcclxuICAgICAgb3B0aW9ucy5vZ2NGaWx0ZXJzLmZpbHRlcnMgPSBvZ2NGaWx0ZXJXcml0ZXIuY2hlY2tJZ29GaWx0ZXJzUHJvcGVydGllcyhcclxuICAgICAgICBvcHRpb25zLm9nY0ZpbHRlcnMuZmlsdGVycyxcclxuICAgICAgICBvcHRpb25zLmZpZWxkTmFtZUdlb21ldHJ5LFxyXG4gICAgICAgIHVuZGVmaW5lZCxcclxuICAgICAgICB0cnVlXHJcbiAgICAgICk7XHJcbiAgICAgIGlmICghb3B0aW9ucy5vZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnMpIHtcclxuICAgICAgICBvcHRpb25zLm9nY0ZpbHRlcnMuaW50ZXJmYWNlT2djRmlsdGVycyA9IG9nY0ZpbHRlcldyaXRlci5kZWZpbmVJbnRlcmZhY2VGaWx0ZXJTZXF1ZW5jZShcclxuICAgICAgICAgIC8vIFdpdGggc29tZSB3bXMgc2VydmVyLCB0aGlzIHBhcmFtIG11c3QgYmUgc2V0IHRvIG1ha2Ugc3BhdGlhbHMgY2FsbC5cclxuICAgICAgICAgIG9wdGlvbnMub2djRmlsdGVycy5maWx0ZXJzLFxyXG4gICAgICAgICAgb3B0aW9ucy5maWVsZE5hbWVHZW9tZXRyeVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5maWx0ZXJCeU9nYyhcclxuICAgICAgICB3bXNEYXRhc291cmNlIGFzIFdNU0RhdGFTb3VyY2UsXHJcbiAgICAgICAgb2djRmlsdGVyV3JpdGVyLmJ1aWxkRmlsdGVyKG9wdGlvbnMub2djRmlsdGVycy5maWx0ZXJzKVxyXG4gICAgICApO1xyXG4gICAgICBvcHRpb25zLmZpbHRlcmVkID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG9wdGlvbnMub2djRmlsdGVycy5maWx0ZXJzID0gdW5kZWZpbmVkO1xyXG4gICAgICBvcHRpb25zLm9nY0ZpbHRlcnMuaW50ZXJmYWNlT2djRmlsdGVycyA9IFtdO1xyXG4gICAgICBvcHRpb25zLmZpbHRlcmVkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==