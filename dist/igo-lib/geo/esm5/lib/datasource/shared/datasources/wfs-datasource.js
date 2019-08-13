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
import { formatWFSQueryString, defaultFieldNameGeometry, gmlRegex, jsonRegex, checkWfsParams } from './wms-wfs.utils';
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
        if (((/** @type {?} */ (_this.options))).ogcFilters.enabled) {
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
            format: this.getFormatFromOptions(),
            overlaps: false,
            url: (/**
             * @param {?} extent
             * @param {?} resolution
             * @param {?} proj
             * @return {?}
             */
            function (extent, resolution, proj) {
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
        var queryStringValues = formatWFSQueryString(this.options, undefined, proj.getCode());
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
        var outputFormat;
        if (this.options.paramsWFS.outputFormat) {
            outputFormat = this.options.paramsWFS.outputFormat.toLowerCase();
        }
        if (jsonRegex.test(outputFormat)) {
            olFormatCls = OlFormat.GeoJSON;
        }
        if (gmlRegex.test(outputFormat) || !outputFormat) {
            olFormatCls = OlFormat.WFS;
        }
        return new olFormatCls();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ZzLWRhdGFzb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd2ZzLWRhdGFzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLGNBQWMsTUFBTSxrQkFBa0IsQ0FBQztBQUM5QyxPQUFPLEtBQUssaUJBQWlCLE1BQU0sb0JBQW9CLENBQUM7QUFDeEQsT0FBTyxLQUFLLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFFdEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUkxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFcEUsT0FBTyxFQUNMLG9CQUFvQixFQUNwQix3QkFBd0IsRUFDeEIsUUFBUSxFQUNSLFNBQVMsRUFDVCxjQUFjLEVBQ2YsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QjtJQUFtQyx5Q0FBVTtJQUczQyx1QkFDUyxPQUE2QixFQUMxQixVQUFzQjtRQUZsQyxZQUlFLGtCQUFNLGNBQWMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsU0FVdEM7UUFiUSxhQUFPLEdBQVAsT0FBTyxDQUFzQjtRQUMxQixnQkFBVSxHQUFWLFVBQVUsQ0FBWTs7WUFJMUIsVUFBVSxHQUFHLENBQUMsbUJBQUEsS0FBSSxDQUFDLE9BQU8sRUFBa0MsQ0FBQyxDQUFDLFVBQVU7O1lBQ3hFLGlCQUFpQixHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGlCQUFpQixJQUFJLHdCQUF3Qjs7WUFDeEYsZUFBZSxHQUFHLElBQUksZUFBZSxFQUFFO1FBQzdDLENBQUMsbUJBQUEsS0FBSSxDQUFDLE9BQU8sRUFBa0MsQ0FBQyxDQUFDLFVBQVU7WUFDekQsZUFBZSxDQUFDLDhCQUE4QixDQUFDLFVBQVUsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxtQkFBQSxL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SSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2xFO1FBRUQsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ2hDLFdBQVcsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDO1NBQ2hDO1FBQ0QsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2hELFdBQVcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDO1NBQzVCO1FBRUQsT0FBTyxJQUFJLFdBQVcsRUFBRSxDQUFDO0lBQzNCLENBQUM7Ozs7SUFFTSxpQ0FBUzs7O0lBQWhCLGNBQW9CLENBQUM7SUFDdkIsb0JBQUM7QUFBRCxDQUFDLEFBOUVELENBQW1DLFVBQVUsR0E4RTVDOzs7O0lBN0VDLDJCQUEwQjs7SUFHeEIsZ0NBQW9DOzs7OztJQUNwQyxtQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xTb3VyY2VWZWN0b3IgZnJvbSAnb2wvc291cmNlL1ZlY3Rvcic7XHJcbmltcG9ydCAqIGFzIE9sTG9hZGluZ1N0cmF0ZWd5IGZyb20gJ29sL2xvYWRpbmdzdHJhdGVneSc7XHJcbmltcG9ydCAqIGFzIE9sRm9ybWF0IGZyb20gJ29sL2Zvcm1hdCc7XHJcblxyXG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgV0ZTRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuL3dmcy1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFdGU1NlcnZpY2UgfSBmcm9tICcuL3dmcy5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IE9nY0ZpbHRlcldyaXRlciB9IGZyb20gJy4uLy4uLy4uL2ZpbHRlci9zaGFyZWQvb2djLWZpbHRlcic7XHJcbmltcG9ydCB7IE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uL2ZpbHRlci9zaGFyZWQvb2djLWZpbHRlci5pbnRlcmZhY2UnO1xyXG5pbXBvcnQge1xyXG4gIGZvcm1hdFdGU1F1ZXJ5U3RyaW5nLFxyXG4gIGRlZmF1bHRGaWVsZE5hbWVHZW9tZXRyeSxcclxuICBnbWxSZWdleCxcclxuICBqc29uUmVnZXgsXHJcbiAgY2hlY2tXZnNQYXJhbXNcclxufSBmcm9tICcuL3dtcy13ZnMudXRpbHMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdGU0RhdGFTb3VyY2UgZXh0ZW5kcyBEYXRhU291cmNlIHtcclxuICBwdWJsaWMgb2w6IG9sU291cmNlVmVjdG9yO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBvcHRpb25zOiBXRlNEYXRhU291cmNlT3B0aW9ucyxcclxuICAgIHByb3RlY3RlZCB3ZnNTZXJ2aWNlOiBXRlNTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICBzdXBlcihjaGVja1dmc1BhcmFtcyhvcHRpb25zLCAnd2ZzJykpO1xyXG5cclxuICAgIGNvbnN0IG9nY0ZpbHRlcnMgPSAodGhpcy5vcHRpb25zIGFzIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucykub2djRmlsdGVycztcclxuICAgIGNvbnN0IGZpZWxkTmFtZUdlb21ldHJ5ID0gdGhpcy5vcHRpb25zLnBhcmFtc1dGUy5maWVsZE5hbWVHZW9tZXRyeSB8fCBkZWZhdWx0RmllbGROYW1lR2VvbWV0cnk7XHJcbiAgICBjb25zdCBvZ2NGaWx0ZXJXcml0ZXIgPSBuZXcgT2djRmlsdGVyV3JpdGVyKCk7XHJcbiAgICAodGhpcy5vcHRpb25zIGFzIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucykub2djRmlsdGVycyA9XHJcbiAgICAgIG9nY0ZpbHRlcldyaXRlci5kZWZpbmVPZ2NGaWx0ZXJzRGVmYXVsdE9wdGlvbnMob2djRmlsdGVycywgZmllbGROYW1lR2VvbWV0cnkpO1xyXG4gICAgaWYgKCh0aGlzLm9wdGlvbnMgYXMgT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zKS5vZ2NGaWx0ZXJzLmVuYWJsZWQpIHtcclxuICAgICAgdGhpcy53ZnNTZXJ2aWNlLmdldFNvdXJjZUZpZWxkc0Zyb21XRlModGhpcy5vcHRpb25zKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVPbFNvdXJjZSgpOiBvbFNvdXJjZVZlY3RvciB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBvbFNvdXJjZVZlY3Rvcih7XHJcbiAgICAgIGZvcm1hdDogdGhpcy5nZXRGb3JtYXRGcm9tT3B0aW9ucygpLFxyXG4gICAgICBvdmVybGFwczogZmFsc2UsXHJcbiAgICAgIHVybDogKGV4dGVudCwgcmVzb2x1dGlvbiwgcHJvaikgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJ1aWxkVXJsKFxyXG4gICAgICAgICAgZXh0ZW50LFxyXG4gICAgICAgICAgcHJvaixcclxuICAgICAgICAgICh0aGlzLm9wdGlvbnMgYXMgT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zKS5vZ2NGaWx0ZXJzKTtcclxuICAgICAgfSxcclxuICAgICAgc3RyYXRlZ3k6IE9sTG9hZGluZ1N0cmF0ZWd5LmJib3hcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBidWlsZFVybChleHRlbnQsIHByb2osIG9nY0ZpbHRlcnMpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgcGFyYW1zV0ZTID0gdGhpcy5vcHRpb25zLnBhcmFtc1dGUztcclxuICAgIGNvbnN0IHF1ZXJ5U3RyaW5nVmFsdWVzID0gZm9ybWF0V0ZTUXVlcnlTdHJpbmcodGhpcy5vcHRpb25zLCB1bmRlZmluZWQsIHByb2ouZ2V0Q29kZSgpKTtcclxuICAgIGxldCBpZ29GaWx0ZXJzO1xyXG4gICAgaWYgKG9nY0ZpbHRlcnMgJiYgb2djRmlsdGVycy5lbmFibGVkKSB7XHJcbiAgICAgIGlnb0ZpbHRlcnMgPSBvZ2NGaWx0ZXJzLmZpbHRlcnM7XHJcbiAgICB9XHJcbiAgICBjb25zdCBvZ2NGaWx0ZXJXcml0ZXIgPSBuZXcgT2djRmlsdGVyV3JpdGVyKCk7XHJcbiAgICBjb25zdCBmaWx0ZXJPckJveCA9IG9nY0ZpbHRlcldyaXRlci5idWlsZEZpbHRlcihpZ29GaWx0ZXJzLCBleHRlbnQsIHByb2osIG9nY0ZpbHRlcnMuZ2VvbWV0cnlOYW1lKTtcclxuICAgIGxldCBmaWx0ZXJPclB1c2ggPSBvZ2NGaWx0ZXJXcml0ZXIuaGFuZGxlT2djRmlsdGVyc0FwcGxpZWRWYWx1ZSh0aGlzLm9wdGlvbnMsIG9nY0ZpbHRlcnMuZ2VvbWV0cnlOYW1lKTtcclxuXHJcbiAgICBsZXQgcHJlZml4ID0gJ2ZpbHRlcic7XHJcbiAgICBpZiAoIWZpbHRlck9yUHVzaCkge1xyXG4gICAgICBwcmVmaXggPSAnYmJveCc7XHJcbiAgICAgIGZpbHRlck9yUHVzaCA9IGV4dGVudC5qb2luKCcsJykgKyAnLCcgKyBwcm9qLmdldENvZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwYXJhbXNXRlMueG1sRmlsdGVyID0gb2djRmlsdGVycy5hZHZhbmNlZE9nY0ZpbHRlcnMgPyBmaWx0ZXJPckJveCA6IGAke3ByZWZpeH09JHtmaWx0ZXJPclB1c2h9YDtcclxuICAgIGxldCBiYXNlVXJsID0gcXVlcnlTdHJpbmdWYWx1ZXMuZmluZChmID0+IGYubmFtZSA9PT0gJ2dldGZlYXR1cmUnKS52YWx1ZTtcclxuICAgIGNvbnN0IHBhdHRlcm5GaWx0ZXIgPSAvKGZpbHRlcnxiYm94KT0uKi9naTtcclxuICAgIGJhc2VVcmwgPSBwYXR0ZXJuRmlsdGVyLnRlc3QocGFyYW1zV0ZTLnhtbEZpbHRlcikgPyBgJHtiYXNlVXJsfSYke3BhcmFtc1dGUy54bWxGaWx0ZXJ9YCA6IGJhc2VVcmw7XHJcbiAgICB0aGlzLm9wdGlvbnMuZG93bmxvYWQgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLm9wdGlvbnMuZG93bmxvYWQsIHsgZHluYW1pY1VybDogYmFzZVVybCB9KTtcclxuICAgIHJldHVybiBiYXNlVXJsLnJlcGxhY2UoLyYmL2csICcmJyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEZvcm1hdEZyb21PcHRpb25zKCkge1xyXG4gICAgbGV0IG9sRm9ybWF0Q2xzO1xyXG5cclxuICAgIGxldCBvdXRwdXRGb3JtYXQ7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLnBhcmFtc1dGUy5vdXRwdXRGb3JtYXQpIHtcclxuICAgICAgb3V0cHV0Rm9ybWF0ID0gdGhpcy5vcHRpb25zLnBhcmFtc1dGUy5vdXRwdXRGb3JtYXQudG9Mb3dlckNhc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoanNvblJlZ2V4LnRlc3Qob3V0cHV0Rm9ybWF0KSkge1xyXG4gICAgICBvbEZvcm1hdENscyA9IE9sRm9ybWF0Lkdlb0pTT047XHJcbiAgICB9XHJcbiAgICBpZiAoZ21sUmVnZXgudGVzdChvdXRwdXRGb3JtYXQpIHx8ICFvdXRwdXRGb3JtYXQpIHtcclxuICAgICAgb2xGb3JtYXRDbHMgPSBPbEZvcm1hdC5XRlM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBvbEZvcm1hdENscygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uVW53YXRjaCgpIHt9XHJcbn1cclxuIl19