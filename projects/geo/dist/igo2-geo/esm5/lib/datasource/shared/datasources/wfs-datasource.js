/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import olSourceVector from 'ol/source/Vector';
import * as OlLoadingStrategy from 'ol/loadingstrategy';
import { DataSource } from './datasource';
import { OgcFilterWriter } from '../../../filter/shared/ogc-filter';
import { formatWFSQueryString, defaultFieldNameGeometry, checkWfsParams, getFormatFromOptions } from './wms-wfs.utils';
var WFSDataSource = /** @class */ (function (_super) {
    tslib_1.__extends(WFSDataSource, _super);
    function WFSDataSource(options, wfsService) {
        var _this = _super.call(this, checkWfsParams(options, 'wfs')) || this;
        _this.options = options;
        _this.wfsService = wfsService;
        /** @type {?} */
        var ogcFilters = ((/** @type {?} */ (_this.options))).ogcFilters;
        /** @type {?} */
        var fieldNameGeometry = _this.options.paramsWFS.fieldNameGeometry || defaultFieldNameGeometry;
        /** @type {?} */
        var ogcFilterWriter = new OgcFilterWriter();
        ((/** @type {?} */ (_this.options))).ogcFilters =
            ogcFilterWriter.defineOgcFiltersDefaultOptions(ogcFilters, fieldNameGeometry);
        if (((/** @type {?} */ (_this.options))).ogcFilters.enabled &&
            ((/** @type {?} */ (_this.options))).ogcFilters.editable) {
            _this.wfsService.getSourceFieldsFromWFS(_this.options);
        }
        return _this;
    }
    /**
     * @protected
     * @return {?}
     */
    WFSDataSource.prototype.createOlSource = /**
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        return new olSourceVector({
            format: getFormatFromOptions(this.options),
            overlaps: false,
            url: (/**
             * @param {?} extent
             * @param {?} resolution
             * @param {?} proj
             * @return {?}
             */
            function (extent, resolution, proj) {
                _this.options.paramsWFS.srsName = _this.options.paramsWFS.srsName || proj.getCode();
                return _this.buildUrl(extent, proj, ((/** @type {?} */ (_this.options))).ogcFilters);
            }),
            strategy: OlLoadingStrategy.bbox
        });
    };
    /**
     * @private
     * @param {?} extent
     * @param {?} proj
     * @param {?} ogcFilters
     * @return {?}
     */
    WFSDataSource.prototype.buildUrl = /**
     * @private
     * @param {?} extent
     * @param {?} proj
     * @param {?} ogcFilters
     * @return {?}
     */
    function (extent, proj, ogcFilters) {
        /** @type {?} */
        var paramsWFS = this.options.paramsWFS;
        /** @type {?} */
        var queryStringValues = formatWFSQueryString(this.options, undefined, this.options.paramsWFS.srsName);
        /** @type {?} */
        var igoFilters;
        if (ogcFilters && ogcFilters.enabled) {
            igoFilters = ogcFilters.filters;
        }
        /** @type {?} */
        var ogcFilterWriter = new OgcFilterWriter();
        /** @type {?} */
        var filterOrBox = ogcFilterWriter.buildFilter(igoFilters, extent, proj, ogcFilters.geometryName);
        /** @type {?} */
        var filterOrPush = ogcFilterWriter.handleOgcFiltersAppliedValue(this.options, ogcFilters.geometryName);
        /** @type {?} */
        var prefix = 'filter';
        if (!filterOrPush) {
            prefix = 'bbox';
            filterOrPush = extent.join(',') + ',' + proj.getCode();
        }
        paramsWFS.xmlFilter = ogcFilters.advancedOgcFilters ? filterOrBox : prefix + "=" + filterOrPush;
        /** @type {?} */
        var baseUrl = queryStringValues.find((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return f.name === 'getfeature'; })).value;
        /** @type {?} */
        var patternFilter = /(filter|bbox)=.*/gi;
        baseUrl = patternFilter.test(paramsWFS.xmlFilter) ? baseUrl + "&" + paramsWFS.xmlFilter : baseUrl;
        this.options.download = Object.assign({}, this.options.download, { dynamicUrl: baseUrl });
        return baseUrl.replace(/&&/g, '&');
    };
    /**
     * @return {?}
     */
    WFSDataSource.prototype.onUnwatch = /**
     * @return {?}
     */
    function () { };
    return WFSDataSource;
}(DataSource));
export { WFSDataSource };
if (false) {
    /** @type {?} */
    WFSDataSource.prototype.ol;
    /** @type {?} */
    WFSDataSource.prototype.options;
    /**
     * @type {?}
     * @protected
     */
    WFSDataSource.prototype.wfsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ZzLWRhdGFzb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd2ZzLWRhdGFzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLGNBQWMsTUFBTSxrQkFBa0IsQ0FBQztBQUM5QyxPQUFPLEtBQUssaUJBQWlCLE1BQU0sb0JBQW9CLENBQUM7QUFHeEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUkxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFcEUsT0FBTyxFQUNMLG9CQUFvQixFQUNwQix3QkFBd0IsRUFDeEIsY0FBYyxFQUNkLG9CQUFvQixFQUNyQixNQUFNLGlCQUFpQixDQUFDO0FBRXpCO0lBQW1DLHlDQUFVO0lBRzNDLHVCQUNTLE9BQTZCLEVBQzFCLFVBQXNCO1FBRmxDLFlBSUUsa0JBQU0sY0FBYyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxTQWF0QztRQWhCUSxhQUFPLEdBQVAsT0FBTyxDQUFzQjtRQUMxQixnQkFBVSxHQUFWLFVBQVUsQ0FBWTs7WUFJMUIsVUFBVSxHQUFHLENBQUMsbUJBQUEsS0FBSSxDQUFDLE9BQU8sRUFBa0MsQ0FBQyxDQUFDLFVBQVU7O1lBQ3hFLGlCQUFpQixHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGlCQUFpQixJQUFJLHdCQUF3Qjs7WUFDeEYsZUFBZSxHQUFHLElBQUksZUFBZSxFQUFFO1FBQzdDLENBQUMsbUJBQUEsS0FBSSxDQUFDLE9BQU8sRUFBa0MsQ0FBQyxDQUFDLFVBQVU7WUFDekQsZUFBZSxDQUFDLDhCQUE4QixDQUFDLFVBQVUsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2hGLElBQ0UsQ0FBQyxtQkFBQSxLQUFJLENBQUMsT0FBTyxFQUFrQyxDQUFDLENBQUMsVUFBVSxDQUFDLE9B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QU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDckMsQ0FBQzs7OztJQUVNLGlDQUFTOzs7SUFBaEIsY0FBb0IsQ0FBQztJQUN2QixvQkFBQztBQUFELENBQUMsQUFoRUQsQ0FBbUMsVUFBVSxHQWdFNUM7Ozs7SUEvREMsMkJBQTBCOztJQUd4QixnQ0FBb0M7Ozs7O0lBQ3BDLG1DQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvbFNvdXJjZVZlY3RvciBmcm9tICdvbC9zb3VyY2UvVmVjdG9yJztcclxuaW1wb3J0ICogYXMgT2xMb2FkaW5nU3RyYXRlZ3kgZnJvbSAnb2wvbG9hZGluZ3N0cmF0ZWd5JztcclxuaW1wb3J0IG9sUHJvamVjdGlvbiBmcm9tICdvbC9wcm9qL1Byb2plY3Rpb24nO1xyXG5cclxuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IFdGU0RhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi93ZnMtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBXRlNTZXJ2aWNlIH0gZnJvbSAnLi93ZnMuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJXcml0ZXIgfSBmcm9tICcuLi8uLi8uLi9maWx0ZXIvc2hhcmVkL29nYy1maWx0ZXInO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMsIE9nY0ZpbHRlcnNPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vZmlsdGVyL3NoYXJlZC9vZ2MtZmlsdGVyLmludGVyZmFjZSc7XHJcbmltcG9ydCB7XHJcbiAgZm9ybWF0V0ZTUXVlcnlTdHJpbmcsXHJcbiAgZGVmYXVsdEZpZWxkTmFtZUdlb21ldHJ5LFxyXG4gIGNoZWNrV2ZzUGFyYW1zLFxyXG4gIGdldEZvcm1hdEZyb21PcHRpb25zXHJcbn0gZnJvbSAnLi93bXMtd2ZzLnV0aWxzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBXRlNEYXRhU291cmNlIGV4dGVuZHMgRGF0YVNvdXJjZSB7XHJcbiAgcHVibGljIG9sOiBvbFNvdXJjZVZlY3RvcjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgb3B0aW9uczogV0ZTRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgICBwcm90ZWN0ZWQgd2ZzU2VydmljZTogV0ZTU2VydmljZVxyXG4gICkge1xyXG4gICAgc3VwZXIoY2hlY2tXZnNQYXJhbXMob3B0aW9ucywgJ3dmcycpKTtcclxuXHJcbiAgICBjb25zdCBvZ2NGaWx0ZXJzID0gKHRoaXMub3B0aW9ucyBhcyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMpLm9nY0ZpbHRlcnM7XHJcbiAgICBjb25zdCBmaWVsZE5hbWVHZW9tZXRyeSA9IHRoaXMub3B0aW9ucy5wYXJhbXNXRlMuZmllbGROYW1lR2VvbWV0cnkgfHwgZGVmYXVsdEZpZWxkTmFtZUdlb21ldHJ5O1xyXG4gICAgY29uc3Qgb2djRmlsdGVyV3JpdGVyID0gbmV3IE9nY0ZpbHRlcldyaXRlcigpO1xyXG4gICAgKHRoaXMub3B0aW9ucyBhcyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMpLm9nY0ZpbHRlcnMgPVxyXG4gICAgICBvZ2NGaWx0ZXJXcml0ZXIuZGVmaW5lT2djRmlsdGVyc0RlZmF1bHRPcHRpb25zKG9nY0ZpbHRlcnMsIGZpZWxkTmFtZUdlb21ldHJ5KTtcclxuICAgIGlmIChcclxuICAgICAgKHRoaXMub3B0aW9ucyBhcyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMpLm9nY0ZpbHRlcnMuZW5hYmxlZCAmJlxyXG4gICAgICAodGhpcy5vcHRpb25zIGFzIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucykub2djRmlsdGVycy5lZGl0YWJsZVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMud2ZzU2VydmljZS5nZXRTb3VyY2VGaWVsZHNGcm9tV0ZTKHRoaXMub3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgY3JlYXRlT2xTb3VyY2UoKTogb2xTb3VyY2VWZWN0b3Ige1xyXG5cclxuICAgIHJldHVybiBuZXcgb2xTb3VyY2VWZWN0b3Ioe1xyXG4gICAgICBmb3JtYXQ6IGdldEZvcm1hdEZyb21PcHRpb25zKHRoaXMub3B0aW9ucyksXHJcbiAgICAgIG92ZXJsYXBzOiBmYWxzZSxcclxuICAgICAgdXJsOiAoZXh0ZW50LCByZXNvbHV0aW9uLCBwcm9qOiBvbFByb2plY3Rpb24pID0+IHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMucGFyYW1zV0ZTLnNyc05hbWUgPSB0aGlzLm9wdGlvbnMucGFyYW1zV0ZTLnNyc05hbWUgfHwgcHJvai5nZXRDb2RlKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRVcmwoXHJcbiAgICAgICAgICBleHRlbnQsXHJcbiAgICAgICAgICBwcm9qLFxyXG4gICAgICAgICAgKHRoaXMub3B0aW9ucyBhcyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMpLm9nY0ZpbHRlcnMpO1xyXG4gICAgICB9LFxyXG4gICAgICBzdHJhdGVneTogT2xMb2FkaW5nU3RyYXRlZ3kuYmJveFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGJ1aWxkVXJsKGV4dGVudCwgcHJvajogb2xQcm9qZWN0aW9uLCBvZ2NGaWx0ZXJzOiBPZ2NGaWx0ZXJzT3B0aW9ucyk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBwYXJhbXNXRlMgPSB0aGlzLm9wdGlvbnMucGFyYW1zV0ZTO1xyXG4gICAgY29uc3QgcXVlcnlTdHJpbmdWYWx1ZXMgPSBmb3JtYXRXRlNRdWVyeVN0cmluZyh0aGlzLm9wdGlvbnMsIHVuZGVmaW5lZCwgdGhpcy5vcHRpb25zLnBhcmFtc1dGUy5zcnNOYW1lKTtcclxuICAgIGxldCBpZ29GaWx0ZXJzO1xyXG4gICAgaWYgKG9nY0ZpbHRlcnMgJiYgb2djRmlsdGVycy5lbmFibGVkKSB7XHJcbiAgICAgIGlnb0ZpbHRlcnMgPSBvZ2NGaWx0ZXJzLmZpbHRlcnM7XHJcbiAgICB9XHJcbiAgICBjb25zdCBvZ2NGaWx0ZXJXcml0ZXIgPSBuZXcgT2djRmlsdGVyV3JpdGVyKCk7XHJcbiAgICBjb25zdCBmaWx0ZXJPckJveCA9IG9nY0ZpbHRlcldyaXRlci5idWlsZEZpbHRlcihpZ29GaWx0ZXJzLCBleHRlbnQsIHByb2osIG9nY0ZpbHRlcnMuZ2VvbWV0cnlOYW1lKTtcclxuICAgIGxldCBmaWx0ZXJPclB1c2ggPSBvZ2NGaWx0ZXJXcml0ZXIuaGFuZGxlT2djRmlsdGVyc0FwcGxpZWRWYWx1ZSh0aGlzLm9wdGlvbnMsIG9nY0ZpbHRlcnMuZ2VvbWV0cnlOYW1lKTtcclxuXHJcbiAgICBsZXQgcHJlZml4ID0gJ2ZpbHRlcic7XHJcbiAgICBpZiAoIWZpbHRlck9yUHVzaCkge1xyXG4gICAgICBwcmVmaXggPSAnYmJveCc7XHJcbiAgICAgIGZpbHRlck9yUHVzaCA9IGV4dGVudC5qb2luKCcsJykgKyAnLCcgKyBwcm9qLmdldENvZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwYXJhbXNXRlMueG1sRmlsdGVyID0gb2djRmlsdGVycy5hZHZhbmNlZE9nY0ZpbHRlcnMgPyBmaWx0ZXJPckJveCA6IGAke3ByZWZpeH09JHtmaWx0ZXJPclB1c2h9YDtcclxuICAgIGxldCBiYXNlVXJsID0gcXVlcnlTdHJpbmdWYWx1ZXMuZmluZChmID0+IGYubmFtZSA9PT0gJ2dldGZlYXR1cmUnKS52YWx1ZTtcclxuICAgIGNvbnN0IHBhdHRlcm5GaWx0ZXIgPSAvKGZpbHRlcnxiYm94KT0uKi9naTtcclxuICAgIGJhc2VVcmwgPSBwYXR0ZXJuRmlsdGVyLnRlc3QocGFyYW1zV0ZTLnhtbEZpbHRlcikgPyBgJHtiYXNlVXJsfSYke3BhcmFtc1dGUy54bWxGaWx0ZXJ9YCA6IGJhc2VVcmw7XHJcbiAgICB0aGlzLm9wdGlvbnMuZG93bmxvYWQgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLm9wdGlvbnMuZG93bmxvYWQsIHsgZHluYW1pY1VybDogYmFzZVVybCB9KTtcclxuICAgIHJldHVybiBiYXNlVXJsLnJlcGxhY2UoLyYmL2csICcmJyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25VbndhdGNoKCkge31cclxufVxyXG4iXX0=