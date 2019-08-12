/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import olSourceVector from 'ol/source/Vector';
import * as OlLoadingStrategy from 'ol/loadingstrategy';
import * as OlFormat from 'ol/format';
import { DataSource } from './datasource';
import { OgcFilterWriter } from '../../../filter/shared/ogc-filter';
var WFSDataSource = /** @class */ (function (_super) {
    tslib_1.__extends(WFSDataSource, _super);
    function WFSDataSource(options, networkService, wfsService) {
        var _this = _super.call(this, options, networkService) || this;
        _this.options = options;
        _this.networkService = networkService;
        _this.wfsService = wfsService;
        _this.options = _this.wfsService.checkWfsOptions(options);
        _this.ogcFilterWriter = new OgcFilterWriter();
        _this.wfsService.getSourceFieldsFromWFS(_this.options);
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
        // reassignation of params to paramsWFS and url to urlWFS to have a common interface with wms-wfs datasources
        this.options.paramsWFS = this.options.params;
        this.options.urlWfs = this.options.url;
        // default wfs version
        this.options.paramsWFS.version = this.options.paramsWFS.version
            ? this.options.paramsWFS.version
            : '2.0.0';
        /** @type {?} */
        var ogcFiltersDefaultValue = true;
        ((/** @type {?} */ (this.options))).ogcFilters =
            ((/** @type {?} */ (this.options))).ogcFilters === undefined
                ? {}
                : ((/** @type {?} */ (this.options))).ogcFilters;
        ((/** @type {?} */ (this.options))).ogcFilters.enabled =
            ((/** @type {?} */ (this.options))).ogcFilters.enabled ===
                undefined
                ? ogcFiltersDefaultValue
                : ((/** @type {?} */ (this.options))).ogcFilters.enabled;
        ((/** @type {?} */ (this.options))).ogcFilters.editable =
            ((/** @type {?} */ (this.options))).ogcFilters.editable ===
                undefined
                ? ogcFiltersDefaultValue
                : ((/** @type {?} */ (this.options))).ogcFilters.editable;
        /** @type {?} */
        var baseWfsQuery = 'service=WFS&request=GetFeature';
        // Mandatory
        /** @type {?} */
        var url = this.options.urlWfs;
        // Optional
        /** @type {?} */
        var outputFormat = this.options.paramsWFS.outputFormat
            ? 'outputFormat=' + this.options.paramsWFS.outputFormat
            : '';
        /** @type {?} */
        var wfsVersion = this.options.paramsWFS.version
            ? 'version=' + this.options.paramsWFS.version
            : 'version=' + '2.0.0';
        /** @type {?} */
        var paramTypename = 'typename';
        /** @type {?} */
        var paramMaxFeatures = 'maxFeatures';
        if (this.options.paramsWFS.version === '2.0.0' ||
            !this.options.paramsWFS.version) {
            paramTypename = 'typenames';
            paramMaxFeatures = 'count';
        }
        /** @type {?} */
        var featureTypes = paramTypename + '=' + this.options.paramsWFS.featureTypes;
        /** @type {?} */
        var maxFeatures = this.options.paramsWFS.maxFeatures
            ? paramMaxFeatures + '=' + this.options.paramsWFS.maxFeatures
            : paramMaxFeatures + '=5000';
        /** @type {?} */
        var downloadBaseUrl = url + "?" + baseWfsQuery + "&" + wfsVersion + "&" + featureTypes + "&";
        downloadBaseUrl += outputFormat + "&" + maxFeatures;
        this.options.download = Object.assign({}, this.options.download, {
            dynamicUrl: downloadBaseUrl
        });
        return new olSourceVector({
            format: this.getFormatFromOptions(),
            overlaps: false,
            url: (/**
             * @param {?} extent
             * @param {?} resolution
             * @param {?} proj
             * @return {?}
             */
            function (extent, resolution, proj) {
                /** @type {?} */
                var srsname = _this.options.paramsWFS.srsName
                    ? 'srsname=' + _this.options.paramsWFS.srsName
                    : 'srsname=' + proj.getCode();
                /** @type {?} */
                var filters;
                if (((/** @type {?} */ (_this.options))).ogcFilters &&
                    ((/** @type {?} */ (_this.options))).ogcFilters.enabled) {
                    filters = ((/** @type {?} */ (_this.options))).ogcFilters.filters;
                }
                _this.options.paramsWFS.xmlFilter = _this.ogcFilterWriter.buildFilter(filters, extent, proj, _this.options.paramsWFS.fieldNameGeometry);
                /** @type {?} */
                var baseUrl = url + "?" + baseWfsQuery + "&" + wfsVersion + "&" + featureTypes + "&";
                baseUrl += outputFormat + "&" + srsname + "&" + maxFeatures;
                /** @type {?} */
                var patternFilter = /(filter|bbox)=.*/gi;
                if (patternFilter.test(_this.options.paramsWFS.xmlFilter)) {
                    baseUrl += "&" + _this.options.paramsWFS.xmlFilter;
                }
                _this.options.download = Object.assign({}, _this.options.download, {
                    dynamicUrl: baseUrl
                });
                return baseUrl;
            }),
            strategy: OlLoadingStrategy.bbox
        });
    };
    /**
     * @private
     * @return {?}
     */
    WFSDataSource.prototype.getFormatFromOptions = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var olFormatCls;
        /** @type {?} */
        var outputFormat = this.options.paramsWFS.outputFormat.toLowerCase();
        /** @type {?} */
        var patternGml3 = new RegExp('.*?gml.*?');
        /** @type {?} */
        var patternGeojson = new RegExp('.*?json.*?');
        if (patternGeojson.test(outputFormat)) {
            olFormatCls = OlFormat.GeoJSON;
        }
        if (patternGml3.test(outputFormat)) {
            olFormatCls = OlFormat.WFS;
        }
        return new olFormatCls();
    };
    return WFSDataSource;
}(DataSource));
export { WFSDataSource };
if (false) {
    /** @type {?} */
    WFSDataSource.prototype.ol;
    /** @type {?} */
    WFSDataSource.prototype.ogcFilterWriter;
    /** @type {?} */
    WFSDataSource.prototype.options;
    /** @type {?} */
    WFSDataSource.prototype.networkService;
    /**
     * @type {?}
     * @protected
     */
    WFSDataSource.prototype.wfsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ZzLWRhdGFzb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd2ZzLWRhdGFzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLGNBQWMsTUFBTSxrQkFBa0IsQ0FBQztBQUM5QyxPQUFPLEtBQUssaUJBQWlCLE1BQU0sb0JBQW9CLENBQUM7QUFDeEQsT0FBTyxLQUFLLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFJdEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUkxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFLcEU7SUFBbUMseUNBQVU7SUFJM0MsdUJBQ1MsT0FBNkIsRUFDN0IsY0FBOEIsRUFDM0IsVUFBc0I7UUFIbEMsWUFLRSxrQkFBTSxPQUFPLEVBQUUsY0FBYyxDQUFDLFNBSS9CO1FBUlEsYUFBTyxHQUFQLE9BQU8sQ0FBc0I7UUFDN0Isb0JBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzNCLGdCQUFVLEdBQVYsVUFBVSxDQUFZO1FBR2hDLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEQsS0FBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1FBQzdDLEtBQUksQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztJQUN2RCxDQUFDOzs7OztJQUVTLHNDQUFjOzs7O0lBQXhCO1FBQUEsaUJBaUdDO1FBaEdDLDZHQUE2RztRQUM3RyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM3QyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxD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QUNyQyxtQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xTb3VyY2VWZWN0b3IgZnJvbSAnb2wvc291cmNlL1ZlY3Rvcic7XHJcbmltcG9ydCAqIGFzIE9sTG9hZGluZ1N0cmF0ZWd5IGZyb20gJ29sL2xvYWRpbmdzdHJhdGVneSc7XHJcbmltcG9ydCAqIGFzIE9sRm9ybWF0IGZyb20gJ29sL2Zvcm1hdCc7XHJcblxyXG5pbXBvcnQgeyB1dWlkIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IFdGU0RhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi93ZnMtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBXRlNTZXJ2aWNlIH0gZnJvbSAnLi93ZnMuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJXcml0ZXIgfSBmcm9tICcuLi8uLi8uLi9maWx0ZXIvc2hhcmVkL29nYy1maWx0ZXInO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi9maWx0ZXIvc2hhcmVkL29nYy1maWx0ZXIuaW50ZXJmYWNlJztcclxuXHJcbmltcG9ydCB7IE5ldHdvcmtTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgV0ZTRGF0YVNvdXJjZSBleHRlbmRzIERhdGFTb3VyY2Uge1xyXG4gIHB1YmxpYyBvbDogb2xTb3VyY2VWZWN0b3I7XHJcbiAgcHVibGljIG9nY0ZpbHRlcldyaXRlcjogT2djRmlsdGVyV3JpdGVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBvcHRpb25zOiBXRlNEYXRhU291cmNlT3B0aW9ucyxcclxuICAgIHB1YmxpYyBuZXR3b3JrU2VydmljZTogTmV0d29ya1NlcnZpY2UsXHJcbiAgICBwcm90ZWN0ZWQgd2ZzU2VydmljZTogV0ZTU2VydmljZVxyXG4gICkge1xyXG4gICAgc3VwZXIob3B0aW9ucywgbmV0d29ya1NlcnZpY2UpO1xyXG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy53ZnNTZXJ2aWNlLmNoZWNrV2ZzT3B0aW9ucyhvcHRpb25zKTtcclxuICAgIHRoaXMub2djRmlsdGVyV3JpdGVyID0gbmV3IE9nY0ZpbHRlcldyaXRlcigpO1xyXG4gICAgdGhpcy53ZnNTZXJ2aWNlLmdldFNvdXJjZUZpZWxkc0Zyb21XRlModGhpcy5vcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVPbFNvdXJjZSgpOiBvbFNvdXJjZVZlY3RvciB7XHJcbiAgICAvLyByZWFzc2lnbmF0aW9uIG9mIHBhcmFtcyB0byBwYXJhbXNXRlMgYW5kIHVybCB0byB1cmxXRlMgdG8gaGF2ZSBhIGNvbW1vbiBpbnRlcmZhY2Ugd2l0aCB3bXMtd2ZzIGRhdGFzb3VyY2VzXHJcbiAgICB0aGlzLm9wdGlvbnMucGFyYW1zV0ZTID0gdGhpcy5vcHRpb25zLnBhcmFtcztcclxuICAgIHRoaXMub3B0aW9ucy51cmxXZnMgPSB0aGlzLm9wdGlvbnMudXJsO1xyXG4gICAgLy8gZGVmYXVsdCB3ZnMgdmVyc2lvblxyXG4gICAgdGhpcy5vcHRpb25zLnBhcmFtc1dGUy52ZXJzaW9uID0gdGhpcy5vcHRpb25zLnBhcmFtc1dGUy52ZXJzaW9uXHJcbiAgICAgID8gdGhpcy5vcHRpb25zLnBhcmFtc1dGUy52ZXJzaW9uXHJcbiAgICAgIDogJzIuMC4wJztcclxuICAgIGNvbnN0IG9nY0ZpbHRlcnNEZWZhdWx0VmFsdWUgPSB0cnVlOyAvLyBkZWZhdWx0IHZhbHVlcyBmb3Igd2ZzLlxyXG4gICAgKHRoaXMub3B0aW9ucyBhcyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMpLm9nY0ZpbHRlcnMgPVxyXG4gICAgICAodGhpcy5vcHRpb25zIGFzIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucykub2djRmlsdGVycyA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICAgPyB7fVxyXG4gICAgICAgIDogKHRoaXMub3B0aW9ucyBhcyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMpLm9nY0ZpbHRlcnM7XHJcbiAgICAodGhpcy5vcHRpb25zIGFzIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucykub2djRmlsdGVycy5lbmFibGVkID1cclxuICAgICAgKHRoaXMub3B0aW9ucyBhcyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMpLm9nY0ZpbHRlcnMuZW5hYmxlZCA9PT1cclxuICAgICAgdW5kZWZpbmVkXHJcbiAgICAgICAgPyBvZ2NGaWx0ZXJzRGVmYXVsdFZhbHVlXHJcbiAgICAgICAgOiAodGhpcy5vcHRpb25zIGFzIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucykub2djRmlsdGVycy5lbmFibGVkO1xyXG4gICAgKHRoaXMub3B0aW9ucyBhcyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMpLm9nY0ZpbHRlcnMuZWRpdGFibGUgPVxyXG4gICAgICAodGhpcy5vcHRpb25zIGFzIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucykub2djRmlsdGVycy5lZGl0YWJsZSA9PT1cclxuICAgICAgdW5kZWZpbmVkXHJcbiAgICAgICAgPyBvZ2NGaWx0ZXJzRGVmYXVsdFZhbHVlXHJcbiAgICAgICAgOiAodGhpcy5vcHRpb25zIGFzIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucykub2djRmlsdGVycy5lZGl0YWJsZTtcclxuXHJcbiAgICBjb25zdCBiYXNlV2ZzUXVlcnkgPSAnc2VydmljZT1XRlMmcmVxdWVzdD1HZXRGZWF0dXJlJztcclxuICAgIC8vIE1hbmRhdG9yeVxyXG4gICAgY29uc3QgdXJsID0gdGhpcy5vcHRpb25zLnVybFdmcztcclxuICAgIC8vIE9wdGlvbmFsXHJcbiAgICBjb25zdCBvdXRwdXRGb3JtYXQgPSB0aGlzLm9wdGlvbnMucGFyYW1zV0ZTLm91dHB1dEZvcm1hdFxyXG4gICAgICA/ICdvdXRwdXRGb3JtYXQ9JyArIHRoaXMub3B0aW9ucy5wYXJhbXNXRlMub3V0cHV0Rm9ybWF0XHJcbiAgICAgIDogJyc7XHJcbiAgICBjb25zdCB3ZnNWZXJzaW9uID0gdGhpcy5vcHRpb25zLnBhcmFtc1dGUy52ZXJzaW9uXHJcbiAgICAgID8gJ3ZlcnNpb249JyArIHRoaXMub3B0aW9ucy5wYXJhbXNXRlMudmVyc2lvblxyXG4gICAgICA6ICd2ZXJzaW9uPScgKyAnMi4wLjAnO1xyXG5cclxuICAgIGxldCBwYXJhbVR5cGVuYW1lID0gJ3R5cGVuYW1lJztcclxuICAgIGxldCBwYXJhbU1heEZlYXR1cmVzID0gJ21heEZlYXR1cmVzJztcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5vcHRpb25zLnBhcmFtc1dGUy52ZXJzaW9uID09PSAnMi4wLjAnIHx8XHJcbiAgICAgICF0aGlzLm9wdGlvbnMucGFyYW1zV0ZTLnZlcnNpb25cclxuICAgICkge1xyXG4gICAgICBwYXJhbVR5cGVuYW1lID0gJ3R5cGVuYW1lcyc7XHJcbiAgICAgIHBhcmFtTWF4RmVhdHVyZXMgPSAnY291bnQnO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZlYXR1cmVUeXBlcyA9XHJcbiAgICAgIHBhcmFtVHlwZW5hbWUgKyAnPScgKyB0aGlzLm9wdGlvbnMucGFyYW1zV0ZTLmZlYXR1cmVUeXBlcztcclxuXHJcbiAgICBjb25zdCBtYXhGZWF0dXJlcyA9IHRoaXMub3B0aW9ucy5wYXJhbXNXRlMubWF4RmVhdHVyZXNcclxuICAgICAgPyBwYXJhbU1heEZlYXR1cmVzICsgJz0nICsgdGhpcy5vcHRpb25zLnBhcmFtc1dGUy5tYXhGZWF0dXJlc1xyXG4gICAgICA6IHBhcmFtTWF4RmVhdHVyZXMgKyAnPTUwMDAnO1xyXG5cclxuICAgIGxldCBkb3dubG9hZEJhc2VVcmwgPSBgJHt1cmx9PyR7YmFzZVdmc1F1ZXJ5fSYke3dmc1ZlcnNpb259JiR7ZmVhdHVyZVR5cGVzfSZgO1xyXG4gICAgZG93bmxvYWRCYXNlVXJsICs9IGAke291dHB1dEZvcm1hdH0mJHttYXhGZWF0dXJlc31gO1xyXG5cclxuICAgIHRoaXMub3B0aW9ucy5kb3dubG9hZCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMub3B0aW9ucy5kb3dubG9hZCwge1xyXG4gICAgICBkeW5hbWljVXJsOiBkb3dubG9hZEJhc2VVcmxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBuZXcgb2xTb3VyY2VWZWN0b3Ioe1xyXG4gICAgICBmb3JtYXQ6IHRoaXMuZ2V0Rm9ybWF0RnJvbU9wdGlvbnMoKSxcclxuICAgICAgb3ZlcmxhcHM6IGZhbHNlLFxyXG4gICAgICB1cmw6IChleHRlbnQsIHJlc29sdXRpb24sIHByb2opID0+IHtcclxuICAgICAgICBjb25zdCBzcnNuYW1lID0gdGhpcy5vcHRpb25zLnBhcmFtc1dGUy5zcnNOYW1lXHJcbiAgICAgICAgICA/ICdzcnNuYW1lPScgKyB0aGlzLm9wdGlvbnMucGFyYW1zV0ZTLnNyc05hbWVcclxuICAgICAgICAgIDogJ3Nyc25hbWU9JyArIHByb2ouZ2V0Q29kZSgpO1xyXG5cclxuICAgICAgICBsZXQgZmlsdGVycztcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAodGhpcy5vcHRpb25zIGFzIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucykub2djRmlsdGVycyAmJlxyXG4gICAgICAgICAgKHRoaXMub3B0aW9ucyBhcyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMpLm9nY0ZpbHRlcnMuZW5hYmxlZFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgZmlsdGVycyA9ICh0aGlzLm9wdGlvbnMgYXMgT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zKS5vZ2NGaWx0ZXJzLmZpbHRlcnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub3B0aW9ucy5wYXJhbXNXRlMueG1sRmlsdGVyID0gdGhpcy5vZ2NGaWx0ZXJXcml0ZXIuYnVpbGRGaWx0ZXIoXHJcbiAgICAgICAgICBmaWx0ZXJzLFxyXG4gICAgICAgICAgZXh0ZW50LFxyXG4gICAgICAgICAgcHJvaixcclxuICAgICAgICAgIHRoaXMub3B0aW9ucy5wYXJhbXNXRlMuZmllbGROYW1lR2VvbWV0cnlcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBsZXQgYmFzZVVybCA9IGAke3VybH0/JHtiYXNlV2ZzUXVlcnl9JiR7d2ZzVmVyc2lvbn0mJHtmZWF0dXJlVHlwZXN9JmA7XHJcbiAgICAgICAgYmFzZVVybCArPSBgJHtvdXRwdXRGb3JtYXR9JiR7c3JzbmFtZX0mJHttYXhGZWF0dXJlc31gO1xyXG5cclxuICAgICAgICBjb25zdCBwYXR0ZXJuRmlsdGVyID0gLyhmaWx0ZXJ8YmJveCk9LiovZ2k7XHJcbiAgICAgICAgaWYgKHBhdHRlcm5GaWx0ZXIudGVzdCh0aGlzLm9wdGlvbnMucGFyYW1zV0ZTLnhtbEZpbHRlcikpIHtcclxuICAgICAgICAgIGJhc2VVcmwgKz0gYCYke3RoaXMub3B0aW9ucy5wYXJhbXNXRlMueG1sRmlsdGVyfWA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm9wdGlvbnMuZG93bmxvYWQgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLm9wdGlvbnMuZG93bmxvYWQsIHtcclxuICAgICAgICAgIGR5bmFtaWNVcmw6IGJhc2VVcmxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGJhc2VVcmw7XHJcbiAgICAgIH0sXHJcbiAgICAgIHN0cmF0ZWd5OiBPbExvYWRpbmdTdHJhdGVneS5iYm94XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0Rm9ybWF0RnJvbU9wdGlvbnMoKSB7XHJcbiAgICBsZXQgb2xGb3JtYXRDbHM7XHJcblxyXG4gICAgY29uc3Qgb3V0cHV0Rm9ybWF0ID0gdGhpcy5vcHRpb25zLnBhcmFtc1dGUy5vdXRwdXRGb3JtYXQudG9Mb3dlckNhc2UoKTtcclxuICAgIGNvbnN0IHBhdHRlcm5HbWwzID0gbmV3IFJlZ0V4cCgnLio/Z21sLio/Jyk7XHJcbiAgICBjb25zdCBwYXR0ZXJuR2VvanNvbiA9IG5ldyBSZWdFeHAoJy4qP2pzb24uKj8nKTtcclxuXHJcbiAgICBpZiAocGF0dGVybkdlb2pzb24udGVzdChvdXRwdXRGb3JtYXQpKSB7XHJcbiAgICAgIG9sRm9ybWF0Q2xzID0gT2xGb3JtYXQuR2VvSlNPTjtcclxuICAgIH1cclxuICAgIGlmIChwYXR0ZXJuR21sMy50ZXN0KG91dHB1dEZvcm1hdCkpIHtcclxuICAgICAgb2xGb3JtYXRDbHMgPSBPbEZvcm1hdC5XRlM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBvbEZvcm1hdENscygpO1xyXG4gIH1cclxufVxyXG4iXX0=