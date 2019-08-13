/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import olSourceVector from 'ol/source/Vector';
import * as OlLoadingStrategy from 'ol/loadingstrategy';
import * as OlFormat from 'ol/format';
import { DataSource } from './datasource';
import { OgcFilterWriter } from '../../../filter/shared/ogc-filter';
import { formatWFSQueryString, defaultFieldNameGeometry, gmlRegex, jsonRegex, checkWfsParams } from './wms-wfs.utils';
export class WFSDataSource extends DataSource {
    /**
     * @param {?} options
     * @param {?} wfsService
     */
    constructor(options, wfsService) {
        super(checkWfsParams(options, 'wfs'));
        this.options = options;
        this.wfsService = wfsService;
        /** @type {?} */
        const ogcFilters = ((/** @type {?} */ (this.options))).ogcFilters;
        /** @type {?} */
        const fieldNameGeometry = this.options.paramsWFS.fieldNameGeometry || defaultFieldNameGeometry;
        /** @type {?} */
        const ogcFilterWriter = new OgcFilterWriter();
        ((/** @type {?} */ (this.options))).ogcFilters =
            ogcFilterWriter.defineOgcFiltersDefaultOptions(ogcFilters, fieldNameGeometry);
        if (((/** @type {?} */ (this.options))).ogcFilters.enabled) {
            this.wfsService.getSourceFieldsFromWFS(this.options);
        }
    }
    /**
     * @protected
     * @return {?}
     */
    createOlSource() {
        return new olSourceVector({
            format: this.getFormatFromOptions(),
            overlaps: false,
            url: (/**
             * @param {?} extent
             * @param {?} resolution
             * @param {?} proj
             * @return {?}
             */
            (extent, resolution, proj) => {
                return this.buildUrl(extent, proj, ((/** @type {?} */ (this.options))).ogcFilters);
            }),
            strategy: OlLoadingStrategy.bbox
        });
    }
    /**
     * @private
     * @param {?} extent
     * @param {?} proj
     * @param {?} ogcFilters
     * @return {?}
     */
    buildUrl(extent, proj, ogcFilters) {
        /** @type {?} */
        const paramsWFS = this.options.paramsWFS;
        /** @type {?} */
        const queryStringValues = formatWFSQueryString(this.options, undefined, proj.getCode());
        /** @type {?} */
        let igoFilters;
        if (ogcFilters && ogcFilters.enabled) {
            igoFilters = ogcFilters.filters;
        }
        /** @type {?} */
        const ogcFilterWriter = new OgcFilterWriter();
        /** @type {?} */
        const filterOrBox = ogcFilterWriter.buildFilter(igoFilters, extent, proj, ogcFilters.geometryName);
        /** @type {?} */
        let filterOrPush = ogcFilterWriter.handleOgcFiltersAppliedValue(this.options, ogcFilters.geometryName);
        /** @type {?} */
        let prefix = 'filter';
        if (!filterOrPush) {
            prefix = 'bbox';
            filterOrPush = extent.join(',') + ',' + proj.getCode();
        }
        paramsWFS.xmlFilter = ogcFilters.advancedOgcFilters ? filterOrBox : `${prefix}=${filterOrPush}`;
        /** @type {?} */
        let baseUrl = queryStringValues.find((/**
         * @param {?} f
         * @return {?}
         */
        f => f.name === 'getfeature')).value;
        /** @type {?} */
        const patternFilter = /(filter|bbox)=.*/gi;
        baseUrl = patternFilter.test(paramsWFS.xmlFilter) ? `${baseUrl}&${paramsWFS.xmlFilter}` : baseUrl;
        this.options.download = Object.assign({}, this.options.download, { dynamicUrl: baseUrl });
        return baseUrl.replace(/&&/g, '&');
    }
    /**
     * @private
     * @return {?}
     */
    getFormatFromOptions() {
        /** @type {?} */
        let olFormatCls;
        /** @type {?} */
        let outputFormat;
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
    }
    /**
     * @return {?}
     */
    onUnwatch() { }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ZzLWRhdGFzb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd2ZzLWRhdGFzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLGtCQUFrQixDQUFDO0FBQzlDLE9BQU8sS0FBSyxpQkFBaUIsTUFBTSxvQkFBb0IsQ0FBQztBQUN4RCxPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUV0QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBSTFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVwRSxPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLHdCQUF3QixFQUN4QixRQUFRLEVBQ1IsU0FBUyxFQUNULGNBQWMsRUFDZixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE1BQU0sT0FBTyxhQUFjLFNBQVEsVUFBVTs7Ozs7SUFHM0MsWUFDUyxPQUE2QixFQUMxQixVQUFzQjtRQUVoQyxLQUFLLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBSC9CLFlBQU8sR0FBUCxPQUFPLENBQXNCO1FBQzFCLGVBQVUsR0FBVixVQUFVLENBQVk7O2NBSTFCLFVBQVUsR0FBRyxDQUFDLG1CQUFBLElBQUksQ0FBQyxPQUFPLEVBQWtDLENBQUMsQ0FBQyxVQUFVOztjQUN4RSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsSUFBSSx3QkFBd0I7O2NBQ3hGLGVBQWUsR0FBRyxJQUFJLGVBQWUsRUFBRTtRQUM3QyxDQUFDLG1CQUFBLElBQUksQ0FBQyxPQUFPLEVBQWtDLENBQUMsQ0FBQyxVQUFVO1lBQ3pELGVBQWUsQ0FBQyw4QkFBOEIsQ0FBQyxVQUFVLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUNoRixJQUFJ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Q0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2xFO1FBRUQsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ2hDLFdBQVcsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDO1NBQ2hDO1FBQ0QsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2hELFdBQVcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDO1NBQzVCO1FBRUQsT0FBTyxJQUFJLFdBQVcsRUFBRSxDQUFDO0lBQzNCLENBQUM7Ozs7SUFFTSxTQUFTLEtBQUksQ0FBQztDQUN0Qjs7O0lBN0VDLDJCQUEwQjs7SUFHeEIsZ0NBQW9DOzs7OztJQUNwQyxtQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xTb3VyY2VWZWN0b3IgZnJvbSAnb2wvc291cmNlL1ZlY3Rvcic7XHJcbmltcG9ydCAqIGFzIE9sTG9hZGluZ1N0cmF0ZWd5IGZyb20gJ29sL2xvYWRpbmdzdHJhdGVneSc7XHJcbmltcG9ydCAqIGFzIE9sRm9ybWF0IGZyb20gJ29sL2Zvcm1hdCc7XHJcblxyXG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgV0ZTRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuL3dmcy1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFdGU1NlcnZpY2UgfSBmcm9tICcuL3dmcy5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IE9nY0ZpbHRlcldyaXRlciB9IGZyb20gJy4uLy4uLy4uL2ZpbHRlci9zaGFyZWQvb2djLWZpbHRlcic7XHJcbmltcG9ydCB7IE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uL2ZpbHRlci9zaGFyZWQvb2djLWZpbHRlci5pbnRlcmZhY2UnO1xyXG5pbXBvcnQge1xyXG4gIGZvcm1hdFdGU1F1ZXJ5U3RyaW5nLFxyXG4gIGRlZmF1bHRGaWVsZE5hbWVHZW9tZXRyeSxcclxuICBnbWxSZWdleCxcclxuICBqc29uUmVnZXgsXHJcbiAgY2hlY2tXZnNQYXJhbXNcclxufSBmcm9tICcuL3dtcy13ZnMudXRpbHMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdGU0RhdGFTb3VyY2UgZXh0ZW5kcyBEYXRhU291cmNlIHtcclxuICBwdWJsaWMgb2w6IG9sU291cmNlVmVjdG9yO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBvcHRpb25zOiBXRlNEYXRhU291cmNlT3B0aW9ucyxcclxuICAgIHByb3RlY3RlZCB3ZnNTZXJ2aWNlOiBXRlNTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICBzdXBlcihjaGVja1dmc1BhcmFtcyhvcHRpb25zLCAnd2ZzJykpO1xyXG5cclxuICAgIGNvbnN0IG9nY0ZpbHRlcnMgPSAodGhpcy5vcHRpb25zIGFzIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucykub2djRmlsdGVycztcclxuICAgIGNvbnN0IGZpZWxkTmFtZUdlb21ldHJ5ID0gdGhpcy5vcHRpb25zLnBhcmFtc1dGUy5maWVsZE5hbWVHZW9tZXRyeSB8fCBkZWZhdWx0RmllbGROYW1lR2VvbWV0cnk7XHJcbiAgICBjb25zdCBvZ2NGaWx0ZXJXcml0ZXIgPSBuZXcgT2djRmlsdGVyV3JpdGVyKCk7XHJcbiAgICAodGhpcy5vcHRpb25zIGFzIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucykub2djRmlsdGVycyA9XHJcbiAgICAgIG9nY0ZpbHRlcldyaXRlci5kZWZpbmVPZ2NGaWx0ZXJzRGVmYXVsdE9wdGlvbnMob2djRmlsdGVycywgZmllbGROYW1lR2VvbWV0cnkpO1xyXG4gICAgaWYgKCh0aGlzLm9wdGlvbnMgYXMgT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zKS5vZ2NGaWx0ZXJzLmVuYWJsZWQpIHtcclxuICAgICAgdGhpcy53ZnNTZXJ2aWNlLmdldFNvdXJjZUZpZWxkc0Zyb21XRlModGhpcy5vcHRpb25zKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVPbFNvdXJjZSgpOiBvbFNvdXJjZVZlY3RvciB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBvbFNvdXJjZVZlY3Rvcih7XHJcbiAgICAgIGZvcm1hdDogdGhpcy5nZXRGb3JtYXRGcm9tT3B0aW9ucygpLFxyXG4gICAgICBvdmVybGFwczogZmFsc2UsXHJcbiAgICAgIHVybDogKGV4dGVudCwgcmVzb2x1dGlvbiwgcHJvaikgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJ1aWxkVXJsKFxyXG4gICAgICAgICAgZXh0ZW50LFxyXG4gICAgICAgICAgcHJvaixcclxuICAgICAgICAgICh0aGlzLm9wdGlvbnMgYXMgT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zKS5vZ2NGaWx0ZXJzKTtcclxuICAgICAgfSxcclxuICAgICAgc3RyYXRlZ3k6IE9sTG9hZGluZ1N0cmF0ZWd5LmJib3hcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBidWlsZFVybChleHRlbnQsIHByb2osIG9nY0ZpbHRlcnMpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgcGFyYW1zV0ZTID0gdGhpcy5vcHRpb25zLnBhcmFtc1dGUztcclxuICAgIGNvbnN0IHF1ZXJ5U3RyaW5nVmFsdWVzID0gZm9ybWF0V0ZTUXVlcnlTdHJpbmcodGhpcy5vcHRpb25zLCB1bmRlZmluZWQsIHByb2ouZ2V0Q29kZSgpKTtcclxuICAgIGxldCBpZ29GaWx0ZXJzO1xyXG4gICAgaWYgKG9nY0ZpbHRlcnMgJiYgb2djRmlsdGVycy5lbmFibGVkKSB7XHJcbiAgICAgIGlnb0ZpbHRlcnMgPSBvZ2NGaWx0ZXJzLmZpbHRlcnM7XHJcbiAgICB9XHJcbiAgICBjb25zdCBvZ2NGaWx0ZXJXcml0ZXIgPSBuZXcgT2djRmlsdGVyV3JpdGVyKCk7XHJcbiAgICBjb25zdCBmaWx0ZXJPckJveCA9IG9nY0ZpbHRlcldyaXRlci5idWlsZEZpbHRlcihpZ29GaWx0ZXJzLCBleHRlbnQsIHByb2osIG9nY0ZpbHRlcnMuZ2VvbWV0cnlOYW1lKTtcclxuICAgIGxldCBmaWx0ZXJPclB1c2ggPSBvZ2NGaWx0ZXJXcml0ZXIuaGFuZGxlT2djRmlsdGVyc0FwcGxpZWRWYWx1ZSh0aGlzLm9wdGlvbnMsIG9nY0ZpbHRlcnMuZ2VvbWV0cnlOYW1lKTtcclxuXHJcbiAgICBsZXQgcHJlZml4ID0gJ2ZpbHRlcic7XHJcbiAgICBpZiAoIWZpbHRlck9yUHVzaCkge1xyXG4gICAgICBwcmVmaXggPSAnYmJveCc7XHJcbiAgICAgIGZpbHRlck9yUHVzaCA9IGV4dGVudC5qb2luKCcsJykgKyAnLCcgKyBwcm9qLmdldENvZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwYXJhbXNXRlMueG1sRmlsdGVyID0gb2djRmlsdGVycy5hZHZhbmNlZE9nY0ZpbHRlcnMgPyBmaWx0ZXJPckJveCA6IGAke3ByZWZpeH09JHtmaWx0ZXJPclB1c2h9YDtcclxuICAgIGxldCBiYXNlVXJsID0gcXVlcnlTdHJpbmdWYWx1ZXMuZmluZChmID0+IGYubmFtZSA9PT0gJ2dldGZlYXR1cmUnKS52YWx1ZTtcclxuICAgIGNvbnN0IHBhdHRlcm5GaWx0ZXIgPSAvKGZpbHRlcnxiYm94KT0uKi9naTtcclxuICAgIGJhc2VVcmwgPSBwYXR0ZXJuRmlsdGVyLnRlc3QocGFyYW1zV0ZTLnhtbEZpbHRlcikgPyBgJHtiYXNlVXJsfSYke3BhcmFtc1dGUy54bWxGaWx0ZXJ9YCA6IGJhc2VVcmw7XHJcbiAgICB0aGlzLm9wdGlvbnMuZG93bmxvYWQgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLm9wdGlvbnMuZG93bmxvYWQsIHsgZHluYW1pY1VybDogYmFzZVVybCB9KTtcclxuICAgIHJldHVybiBiYXNlVXJsLnJlcGxhY2UoLyYmL2csICcmJyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEZvcm1hdEZyb21PcHRpb25zKCkge1xyXG4gICAgbGV0IG9sRm9ybWF0Q2xzO1xyXG5cclxuICAgIGxldCBvdXRwdXRGb3JtYXQ7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLnBhcmFtc1dGUy5vdXRwdXRGb3JtYXQpIHtcclxuICAgICAgb3V0cHV0Rm9ybWF0ID0gdGhpcy5vcHRpb25zLnBhcmFtc1dGUy5vdXRwdXRGb3JtYXQudG9Mb3dlckNhc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoanNvblJlZ2V4LnRlc3Qob3V0cHV0Rm9ybWF0KSkge1xyXG4gICAgICBvbEZvcm1hdENscyA9IE9sRm9ybWF0Lkdlb0pTT047XHJcbiAgICB9XHJcbiAgICBpZiAoZ21sUmVnZXgudGVzdChvdXRwdXRGb3JtYXQpIHx8ICFvdXRwdXRGb3JtYXQpIHtcclxuICAgICAgb2xGb3JtYXRDbHMgPSBPbEZvcm1hdC5XRlM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBvbEZvcm1hdENscygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uVW53YXRjaCgpIHt9XHJcbn1cclxuIl19