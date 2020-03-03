/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import olSourceVector from 'ol/source/Vector';
import * as OlLoadingStrategy from 'ol/loadingstrategy';
import { DataSource } from './datasource';
import { OgcFilterWriter } from '../../../filter/shared/ogc-filter';
import { formatWFSQueryString, defaultFieldNameGeometry, checkWfsParams, getFormatFromOptions } from './wms-wfs.utils';
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
        if (((/** @type {?} */ (this.options))).ogcFilters.enabled &&
            ((/** @type {?} */ (this.options))).ogcFilters.editable) {
            this.wfsService.getSourceFieldsFromWFS(this.options);
        }
    }
    /**
     * @protected
     * @return {?}
     */
    createOlSource() {
        return new olSourceVector({
            format: getFormatFromOptions(this.options),
            overlaps: false,
            url: (/**
             * @param {?} extent
             * @param {?} resolution
             * @param {?} proj
             * @return {?}
             */
            (extent, resolution, proj) => {
                this.options.paramsWFS.srsName = this.options.paramsWFS.srsName || proj.getCode();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ZzLWRhdGFzb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd2ZzLWRhdGFzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLGtCQUFrQixDQUFDO0FBQzlDLE9BQU8sS0FBSyxpQkFBaUIsTUFBTSxvQkFBb0IsQ0FBQztBQUd4RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBSTFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVwRSxPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLHdCQUF3QixFQUN4QixjQUFjLEVBQ2Qsb0JBQW9CLEVBQ3JCLE1BQU0saUJBQWlCLENBQUM7QUFFekIsTUFBTSxPQUFPLGFBQWMsU0FBUSxVQUFVOzs7OztJQUczQyxZQUNTLE9BQTZCLEVBQzFCLFVBQXNCO1FBRWhDLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFIL0IsWUFBTyxHQUFQLE9BQU8sQ0FBc0I7UUFDMUIsZUFBVSxHQUFWLFVBQVUsQ0FBWTs7Y0FJMUIsVUFBVSxHQUFHLENBQUMsbUJBQUEsSUFBSSxDQUFDLE9BQU8sRUFBa0MsQ0FBQyxDQUFDLFVBQVU7O2NBQ3hFLGlCQUFpQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGlCQUFpQixJQUFJLHdCQUF3Qjs7Y0FDeEYsZUFBZSxHQUFHLElBQUksZUFBZSxFQUFFO1FBQzdDLENBQUMsbUJBQUEsSUFBSSxDQUFDLE9BQU8sRUFBa0MsQ0FBQyxDQUFDLFVBQVU7WUFDekQsZUFBZSxDQUFDLDhCQUE4QixDQUFDLFVBQVUsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2hGLElBQ0UsQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFrQyxDQUFDLENBQUMs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QUcsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7SUFFTSxTQUFTLEtBQUksQ0FBQztDQUN0Qjs7O0lBL0RDLDJCQUEwQjs7SUFHeEIsZ0NBQW9DOzs7OztJQUNwQyxtQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xTb3VyY2VWZWN0b3IgZnJvbSAnb2wvc291cmNlL1ZlY3Rvcic7XHJcbmltcG9ydCAqIGFzIE9sTG9hZGluZ1N0cmF0ZWd5IGZyb20gJ29sL2xvYWRpbmdzdHJhdGVneSc7XHJcbmltcG9ydCBvbFByb2plY3Rpb24gZnJvbSAnb2wvcHJvai9Qcm9qZWN0aW9uJztcclxuXHJcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuL2RhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBXRlNEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4vd2ZzLWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgV0ZTU2VydmljZSB9IGZyb20gJy4vd2ZzLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgT2djRmlsdGVyV3JpdGVyIH0gZnJvbSAnLi4vLi4vLi4vZmlsdGVyL3NoYXJlZC9vZ2MtZmlsdGVyJztcclxuaW1wb3J0IHsgT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zLCBPZ2NGaWx0ZXJzT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uL2ZpbHRlci9zaGFyZWQvb2djLWZpbHRlci5pbnRlcmZhY2UnO1xyXG5pbXBvcnQge1xyXG4gIGZvcm1hdFdGU1F1ZXJ5U3RyaW5nLFxyXG4gIGRlZmF1bHRGaWVsZE5hbWVHZW9tZXRyeSxcclxuICBjaGVja1dmc1BhcmFtcyxcclxuICBnZXRGb3JtYXRGcm9tT3B0aW9uc1xyXG59IGZyb20gJy4vd21zLXdmcy51dGlscyc7XHJcblxyXG5leHBvcnQgY2xhc3MgV0ZTRGF0YVNvdXJjZSBleHRlbmRzIERhdGFTb3VyY2Uge1xyXG4gIHB1YmxpYyBvbDogb2xTb3VyY2VWZWN0b3I7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIG9wdGlvbnM6IFdGU0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gICAgcHJvdGVjdGVkIHdmc1NlcnZpY2U6IFdGU1NlcnZpY2VcclxuICApIHtcclxuICAgIHN1cGVyKGNoZWNrV2ZzUGFyYW1zKG9wdGlvbnMsICd3ZnMnKSk7XHJcblxyXG4gICAgY29uc3Qgb2djRmlsdGVycyA9ICh0aGlzLm9wdGlvbnMgYXMgT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zKS5vZ2NGaWx0ZXJzO1xyXG4gICAgY29uc3QgZmllbGROYW1lR2VvbWV0cnkgPSB0aGlzLm9wdGlvbnMucGFyYW1zV0ZTLmZpZWxkTmFtZUdlb21ldHJ5IHx8IGRlZmF1bHRGaWVsZE5hbWVHZW9tZXRyeTtcclxuICAgIGNvbnN0IG9nY0ZpbHRlcldyaXRlciA9IG5ldyBPZ2NGaWx0ZXJXcml0ZXIoKTtcclxuICAgICh0aGlzLm9wdGlvbnMgYXMgT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zKS5vZ2NGaWx0ZXJzID1cclxuICAgICAgb2djRmlsdGVyV3JpdGVyLmRlZmluZU9nY0ZpbHRlcnNEZWZhdWx0T3B0aW9ucyhvZ2NGaWx0ZXJzLCBmaWVsZE5hbWVHZW9tZXRyeSk7XHJcbiAgICBpZiAoXHJcbiAgICAgICh0aGlzLm9wdGlvbnMgYXMgT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zKS5vZ2NGaWx0ZXJzLmVuYWJsZWQgJiZcclxuICAgICAgKHRoaXMub3B0aW9ucyBhcyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMpLm9nY0ZpbHRlcnMuZWRpdGFibGVcclxuICAgICkge1xyXG4gICAgICB0aGlzLndmc1NlcnZpY2UuZ2V0U291cmNlRmllbGRzRnJvbVdGUyh0aGlzLm9wdGlvbnMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZU9sU291cmNlKCk6IG9sU291cmNlVmVjdG9yIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IG9sU291cmNlVmVjdG9yKHtcclxuICAgICAgZm9ybWF0OiBnZXRGb3JtYXRGcm9tT3B0aW9ucyh0aGlzLm9wdGlvbnMpLFxyXG4gICAgICBvdmVybGFwczogZmFsc2UsXHJcbiAgICAgIHVybDogKGV4dGVudCwgcmVzb2x1dGlvbiwgcHJvajogb2xQcm9qZWN0aW9uKSA9PiB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLnBhcmFtc1dGUy5zcnNOYW1lID0gdGhpcy5vcHRpb25zLnBhcmFtc1dGUy5zcnNOYW1lIHx8IHByb2ouZ2V0Q29kZSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJ1aWxkVXJsKFxyXG4gICAgICAgICAgZXh0ZW50LFxyXG4gICAgICAgICAgcHJvaixcclxuICAgICAgICAgICh0aGlzLm9wdGlvbnMgYXMgT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zKS5vZ2NGaWx0ZXJzKTtcclxuICAgICAgfSxcclxuICAgICAgc3RyYXRlZ3k6IE9sTG9hZGluZ1N0cmF0ZWd5LmJib3hcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBidWlsZFVybChleHRlbnQsIHByb2o6IG9sUHJvamVjdGlvbiwgb2djRmlsdGVyczogT2djRmlsdGVyc09wdGlvbnMpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgcGFyYW1zV0ZTID0gdGhpcy5vcHRpb25zLnBhcmFtc1dGUztcclxuICAgIGNvbnN0IHF1ZXJ5U3RyaW5nVmFsdWVzID0gZm9ybWF0V0ZTUXVlcnlTdHJpbmcodGhpcy5vcHRpb25zLCB1bmRlZmluZWQsIHByb2ouZ2V0Q29kZSgpKTtcclxuICAgIGxldCBpZ29GaWx0ZXJzO1xyXG4gICAgaWYgKG9nY0ZpbHRlcnMgJiYgb2djRmlsdGVycy5lbmFibGVkKSB7XHJcbiAgICAgIGlnb0ZpbHRlcnMgPSBvZ2NGaWx0ZXJzLmZpbHRlcnM7XHJcbiAgICB9XHJcbiAgICBjb25zdCBvZ2NGaWx0ZXJXcml0ZXIgPSBuZXcgT2djRmlsdGVyV3JpdGVyKCk7XHJcbiAgICBjb25zdCBmaWx0ZXJPckJveCA9IG9nY0ZpbHRlcldyaXRlci5idWlsZEZpbHRlcihpZ29GaWx0ZXJzLCBleHRlbnQsIHByb2osIG9nY0ZpbHRlcnMuZ2VvbWV0cnlOYW1lKTtcclxuICAgIGxldCBmaWx0ZXJPclB1c2ggPSBvZ2NGaWx0ZXJXcml0ZXIuaGFuZGxlT2djRmlsdGVyc0FwcGxpZWRWYWx1ZSh0aGlzLm9wdGlvbnMsIG9nY0ZpbHRlcnMuZ2VvbWV0cnlOYW1lKTtcclxuXHJcbiAgICBsZXQgcHJlZml4ID0gJ2ZpbHRlcic7XHJcbiAgICBpZiAoIWZpbHRlck9yUHVzaCkge1xyXG4gICAgICBwcmVmaXggPSAnYmJveCc7XHJcbiAgICAgIGZpbHRlck9yUHVzaCA9IGV4dGVudC5qb2luKCcsJykgKyAnLCcgKyBwcm9qLmdldENvZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwYXJhbXNXRlMueG1sRmlsdGVyID0gb2djRmlsdGVycy5hZHZhbmNlZE9nY0ZpbHRlcnMgPyBmaWx0ZXJPckJveCA6IGAke3ByZWZpeH09JHtmaWx0ZXJPclB1c2h9YDtcclxuICAgIGxldCBiYXNlVXJsID0gcXVlcnlTdHJpbmdWYWx1ZXMuZmluZChmID0+IGYubmFtZSA9PT0gJ2dldGZlYXR1cmUnKS52YWx1ZTtcclxuICAgIGNvbnN0IHBhdHRlcm5GaWx0ZXIgPSAvKGZpbHRlcnxiYm94KT0uKi9naTtcclxuICAgIGJhc2VVcmwgPSBwYXR0ZXJuRmlsdGVyLnRlc3QocGFyYW1zV0ZTLnhtbEZpbHRlcikgPyBgJHtiYXNlVXJsfSYke3BhcmFtc1dGUy54bWxGaWx0ZXJ9YCA6IGJhc2VVcmw7XHJcbiAgICB0aGlzLm9wdGlvbnMuZG93bmxvYWQgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLm9wdGlvbnMuZG93bmxvYWQsIHsgZHluYW1pY1VybDogYmFzZVVybCB9KTtcclxuICAgIHJldHVybiBiYXNlVXJsLnJlcGxhY2UoLyYmL2csICcmJyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25VbndhdGNoKCkge31cclxufVxyXG4iXX0=