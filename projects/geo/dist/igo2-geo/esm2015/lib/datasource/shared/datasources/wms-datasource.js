/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import olSourceImageWMS from 'ol/source/ImageWMS';
import { DataSource } from './datasource';
import { OgcFilterWriter } from '../../../filter/shared/ogc-filter';
import { QueryHtmlTarget } from '../../../query/shared/query.enums';
import { formatWFSQueryString, checkWfsParams, defaultFieldNameGeometry } from './wms-wfs.utils';
import { ObjectUtils } from '@igo2/utils';
export class WMSDataSource extends DataSource {
    /**
     * @param {?} options
     * @param {?} wfsService
     */
    constructor(options, wfsService) {
        super(options);
        this.options = options;
        this.wfsService = wfsService;
        /** @type {?} */
        const sourceParams = options.params;
        /** @type {?} */
        const dpi = sourceParams.DPI || 96;
        sourceParams.DPI = dpi;
        sourceParams.MAP_RESOLUTION = dpi;
        sourceParams.FORMAT_OPTIONS = 'dpi:' + dpi;
        if (options.refreshIntervalSec && options.refreshIntervalSec > 0) {
            setInterval((/**
             * @return {?}
             */
            () => {
                this.refresh();
            }), options.refreshIntervalSec * 1000); // Convert seconds to MS
        }
        /** @type {?} */
        let fieldNameGeometry = defaultFieldNameGeometry;
        // ####   START if paramsWFS
        if (options.paramsWFS) {
            /** @type {?} */
            const wfsCheckup = checkWfsParams(options, 'wms');
            ObjectUtils.mergeDeep(options.paramsWFS, wfsCheckup.paramsWFS);
            fieldNameGeometry =
                options.paramsWFS.fieldNameGeometry || fieldNameGeometry;
            options.download = Object.assign({}, options.download, {
                dynamicUrl: this.buildDynamicDownloadUrlFromParamsWFS(options)
            });
        } //  ####   END  if paramsWFS
        if (!options.sourceFields || options.sourceFields.length === 0) {
            options.sourceFields = [];
        }
        else {
            options.sourceFields.forEach((/**
             * @param {?} sourceField
             * @return {?}
             */
            sourceField => {
                sourceField.alias = sourceField.alias
                    ? sourceField.alias
                    : sourceField.name;
                // to allow only a list of sourcefield with names
            }));
        }
        /** @type {?} */
        const initOgcFilters = ((/** @type {?} */ (options)))
            .ogcFilters;
        /** @type {?} */
        const ogcFilterWriter = new OgcFilterWriter();
        if (!initOgcFilters) {
            ((/** @type {?} */ (options))).ogcFilters = ogcFilterWriter.defineOgcFiltersDefaultOptions(initOgcFilters, fieldNameGeometry, 'wms');
        }
        else {
            initOgcFilters.advancedOgcFilters = initOgcFilters.pushButtons
                ? false
                : true;
        }
        if (sourceParams.LAYERS.split(',').length > 1 &&
            initOgcFilters &&
            initOgcFilters.enabled) {
            console.log('*******************************');
            console.log('BE CAREFULL, YOUR WMS LAYERS (' +
                sourceParams.LAYERS +
                ') MUST SHARE THE SAME FIELDS TO ALLOW ogcFilters TO WORK !! ');
            console.log('*******************************');
        }
        if (options.paramsWFS && initOgcFilters && initOgcFilters.enabled && initOgcFilters.editable) {
            this.wfsService.getSourceFieldsFromWFS(options);
        }
        /** @type {?} */
        const filterQueryString = ogcFilterWriter.handleOgcFiltersAppliedValue(options, fieldNameGeometry);
        sourceParams.FILTER = filterQueryString;
    }
    /**
     * @return {?}
     */
    get params() {
        return (/** @type {?} */ (this.options.params));
    }
    /**
     * @return {?}
     */
    get queryTitle() {
        return ((/** @type {?} */ (this.options))).queryTitle
            ? ((/** @type {?} */ (this.options))).queryTitle
            : 'title';
    }
    /**
     * @return {?}
     */
    get mapLabel() {
        return ((/** @type {?} */ (this.options))).mapLabel;
    }
    /**
     * @return {?}
     */
    get queryHtmlTarget() {
        return ((/** @type {?} */ (this.options))).queryHtmlTarget
            ? ((/** @type {?} */ (this.options))).queryHtmlTarget
            : QueryHtmlTarget.BLANK;
    }
    /**
     * @return {?}
     */
    refresh() {
        this.ol.updateParams({ igoRefresh: Math.random() });
    }
    /**
     * @private
     * @param {?} asWFSDataSourceOptions
     * @return {?}
     */
    buildDynamicDownloadUrlFromParamsWFS(asWFSDataSourceOptions) {
        /** @type {?} */
        const queryStringValues = formatWFSQueryString(asWFSDataSourceOptions);
        /** @type {?} */
        const downloadUrl = queryStringValues.find((/**
         * @param {?} f
         * @return {?}
         */
        f => f.name === 'getfeature'))
            .value;
        return downloadUrl;
    }
    /**
     * @protected
     * @return {?}
     */
    createOlSource() {
        return new olSourceImageWMS(this.options);
    }
    /**
     * @param {?=} style
     * @param {?=} scale
     * @return {?}
     */
    getLegend(style, scale) {
        /** @type {?} */
        let legend = super.getLegend();
        if (legend.length > 0 && (style === undefined && !scale)) {
            return legend;
        }
        /** @type {?} */
        const sourceParams = this.params;
        /** @type {?} */
        let layers = [];
        if (sourceParams.LAYERS !== undefined) {
            layers = sourceParams.LAYERS.split(',');
        }
        /** @type {?} */
        const baseUrl = this.options.url.replace(/\?$/, '');
        /** @type {?} */
        const params = [
            'REQUEST=GetLegendGraphic',
            'SERVICE=WMS',
            'FORMAT=image/png',
            'SLD_VERSION=1.1.0',
            `VERSION=${sourceParams.VERSION || '1.3.0'}`
        ];
        if (style !== undefined) {
            params.push(`STYLE=${style}`);
        }
        if (scale !== undefined) {
            params.push(`SCALE=${scale}`);
        }
        legend = layers.map((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => {
            /** @type {?} */
            const separator = baseUrl.match(/\?/) ? '&' : '?';
            return {
                url: `${baseUrl}${separator}${params.join('&')}&LAYER=${layer}`,
                title: layers.length > 1 ? layer : undefined,
                currentStyle: style === undefined ? undefined : (/** @type {?} */ (style))
            };
        }));
        return legend;
    }
    /**
     * @return {?}
     */
    onUnwatch() { }
}
if (false) {
    /** @type {?} */
    WMSDataSource.prototype.ol;
    /** @type {?} */
    WMSDataSource.prototype.options;
    /**
     * @type {?}
     * @protected
     */
    WMSDataSource.prototype.wfsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zLWRhdGFzb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd21zLWRhdGFzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sZ0JBQWdCLE1BQU0sb0JBQW9CLENBQUM7QUFFbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUsxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFcEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3BFLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsY0FBYyxFQUNkLHdCQUF3QixFQUN6QixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFMUMsTUFBTSxPQUFPLGFBQWMsU0FBUSxVQUFVOzs7OztJQXVCM0MsWUFDUyxPQUE2QixFQUMxQixVQUFzQjtRQUVoQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFIUixZQUFPLEdBQVAsT0FBTyxDQUFzQjtRQUMxQixlQUFVLEdBQVYsVUFBVSxDQUFZOztjQUcxQixZQUFZLEdBQVEsT0FBTyxDQUFDLE1BQU07O2NBRWxDLEdBQUcsR0FBRyxZQUFZLENBQUMsR0FBRyxJQUFJLEVBQUU7UUFDbEMsWUFBWSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDdkIsWUFBWSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUM7UUFDbEMsWUFBWSxDQUFDLGNBQWMsR0FBRyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBRTNDLElBQUksT0FBTyxDQUFDLGtCQUFrQixJQUFJLE9BQU8sQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLEVBQUU7WUFDaEUsV0FBVzs7O1lBQUMsR0FBRyxFQUFFO2dCQUNmLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZ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Q0FBQyxTQUFTO2dCQUM1QyxZQUFZLEVBQUUsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxtQkFBQSxLQUFLLEVBQVU7YUFDaEUsQ0FBQztRQUNKLENBQUMsRUFBQyxDQUFDO1FBRUgsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7OztJQUVNLFNBQVMsS0FBSSxDQUFDO0NBQ3RCOzs7SUFsS0MsMkJBQTRCOztJQXVCMUIsZ0NBQW9DOzs7OztJQUNwQyxtQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xTb3VyY2VJbWFnZVdNUyBmcm9tICdvbC9zb3VyY2UvSW1hZ2VXTVMnO1xyXG5cclxuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IExlZ2VuZCB9IGZyb20gJy4vZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBXTVNEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4vd21zLWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgV0ZTU2VydmljZSB9IGZyb20gJy4vd2ZzLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgT2djRmlsdGVyV3JpdGVyIH0gZnJvbSAnLi4vLi4vLi4vZmlsdGVyL3NoYXJlZC9vZ2MtZmlsdGVyJztcclxuaW1wb3J0IHsgT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vZmlsdGVyL3NoYXJlZC9vZ2MtZmlsdGVyLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFF1ZXJ5SHRtbFRhcmdldCB9IGZyb20gJy4uLy4uLy4uL3F1ZXJ5L3NoYXJlZC9xdWVyeS5lbnVtcyc7XHJcbmltcG9ydCB7XHJcbiAgZm9ybWF0V0ZTUXVlcnlTdHJpbmcsXHJcbiAgY2hlY2tXZnNQYXJhbXMsXHJcbiAgZGVmYXVsdEZpZWxkTmFtZUdlb21ldHJ5XHJcbn0gZnJvbSAnLi93bXMtd2ZzLnV0aWxzJztcclxuXHJcbmltcG9ydCB7IE9iamVjdFV0aWxzIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdNU0RhdGFTb3VyY2UgZXh0ZW5kcyBEYXRhU291cmNlIHtcclxuICBwdWJsaWMgb2w6IG9sU291cmNlSW1hZ2VXTVM7XHJcblxyXG4gIGdldCBwYXJhbXMoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMucGFyYW1zIGFzIGFueTtcclxuICB9XHJcblxyXG4gIGdldCBxdWVyeVRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKHRoaXMub3B0aW9ucyBhcyBhbnkpLnF1ZXJ5VGl0bGVcclxuICAgICAgPyAodGhpcy5vcHRpb25zIGFzIGFueSkucXVlcnlUaXRsZVxyXG4gICAgICA6ICd0aXRsZSc7XHJcbiAgfVxyXG5cclxuICBnZXQgbWFwTGFiZWwoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAodGhpcy5vcHRpb25zIGFzIGFueSkubWFwTGFiZWw7XHJcbiAgfVxyXG5cclxuICBnZXQgcXVlcnlIdG1sVGFyZ2V0KCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKHRoaXMub3B0aW9ucyBhcyBhbnkpLnF1ZXJ5SHRtbFRhcmdldFxyXG4gICAgICA/ICh0aGlzLm9wdGlvbnMgYXMgYW55KS5xdWVyeUh0bWxUYXJnZXRcclxuICAgICAgOiBRdWVyeUh0bWxUYXJnZXQuQkxBTks7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBvcHRpb25zOiBXTVNEYXRhU291cmNlT3B0aW9ucyxcclxuICAgIHByb3RlY3RlZCB3ZnNTZXJ2aWNlOiBXRlNTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICAgIGNvbnN0IHNvdXJjZVBhcmFtczogYW55ID0gb3B0aW9ucy5wYXJhbXM7XHJcblxyXG4gICAgY29uc3QgZHBpID0gc291cmNlUGFyYW1zLkRQSSB8fCA5NjtcclxuICAgIHNvdXJjZVBhcmFtcy5EUEkgPSBkcGk7XHJcbiAgICBzb3VyY2VQYXJhbXMuTUFQX1JFU09MVVRJT04gPSBkcGk7XHJcbiAgICBzb3VyY2VQYXJhbXMuRk9STUFUX09QVElPTlMgPSAnZHBpOicgKyBkcGk7XHJcblxyXG4gICAgaWYgKG9wdGlvbnMucmVmcmVzaEludGVydmFsU2VjICYmIG9wdGlvbnMucmVmcmVzaEludGVydmFsU2VjID4gMCkge1xyXG4gICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgIH0sIG9wdGlvbnMucmVmcmVzaEludGVydmFsU2VjICogMTAwMCk7IC8vIENvbnZlcnQgc2Vjb25kcyB0byBNU1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBmaWVsZE5hbWVHZW9tZXRyeSA9IGRlZmF1bHRGaWVsZE5hbWVHZW9tZXRyeTtcclxuXHJcbiAgICAvLyAjIyMjICAgU1RBUlQgaWYgcGFyYW1zV0ZTXHJcbiAgICBpZiAob3B0aW9ucy5wYXJhbXNXRlMpIHtcclxuICAgICAgY29uc3Qgd2ZzQ2hlY2t1cCA9IGNoZWNrV2ZzUGFyYW1zKG9wdGlvbnMsICd3bXMnKTtcclxuICAgICAgT2JqZWN0VXRpbHMubWVyZ2VEZWVwKG9wdGlvbnMucGFyYW1zV0ZTLCB3ZnNDaGVja3VwLnBhcmFtc1dGUyk7XHJcblxyXG4gICAgICBmaWVsZE5hbWVHZW9tZXRyeSA9XHJcbiAgICAgICAgb3B0aW9ucy5wYXJhbXNXRlMuZmllbGROYW1lR2VvbWV0cnkgfHwgZmllbGROYW1lR2VvbWV0cnk7XHJcblxyXG4gICAgICBvcHRpb25zLmRvd25sb2FkID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucy5kb3dubG9hZCwge1xyXG4gICAgICAgIGR5bmFtaWNVcmw6IHRoaXMuYnVpbGREeW5hbWljRG93bmxvYWRVcmxGcm9tUGFyYW1zV0ZTKG9wdGlvbnMpXHJcbiAgICAgIH0pO1xyXG4gICAgfSAvLyAgIyMjIyAgIEVORCAgaWYgcGFyYW1zV0ZTXHJcblxyXG4gICAgaWYgKCFvcHRpb25zLnNvdXJjZUZpZWxkcyB8fCBvcHRpb25zLnNvdXJjZUZpZWxkcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgb3B0aW9ucy5zb3VyY2VGaWVsZHMgPSBbXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG9wdGlvbnMuc291cmNlRmllbGRzLmZvckVhY2goc291cmNlRmllbGQgPT4ge1xyXG4gICAgICAgIHNvdXJjZUZpZWxkLmFsaWFzID0gc291cmNlRmllbGQuYWxpYXNcclxuICAgICAgICAgID8gc291cmNlRmllbGQuYWxpYXNcclxuICAgICAgICAgIDogc291cmNlRmllbGQubmFtZTtcclxuICAgICAgICAvLyB0byBhbGxvdyBvbmx5IGEgbGlzdCBvZiBzb3VyY2VmaWVsZCB3aXRoIG5hbWVzXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaW5pdE9nY0ZpbHRlcnMgPSAob3B0aW9ucyBhcyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMpXHJcbiAgICAgIC5vZ2NGaWx0ZXJzO1xyXG4gICAgY29uc3Qgb2djRmlsdGVyV3JpdGVyID0gbmV3IE9nY0ZpbHRlcldyaXRlcigpO1xyXG5cclxuICAgIGlmICghaW5pdE9nY0ZpbHRlcnMpIHtcclxuICAgICAgKG9wdGlvbnMgYXMgT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zKS5vZ2NGaWx0ZXJzID0gb2djRmlsdGVyV3JpdGVyLmRlZmluZU9nY0ZpbHRlcnNEZWZhdWx0T3B0aW9ucyhcclxuICAgICAgICBpbml0T2djRmlsdGVycyxcclxuICAgICAgICBmaWVsZE5hbWVHZW9tZXRyeSxcclxuICAgICAgICAnd21zJ1xyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaW5pdE9nY0ZpbHRlcnMuYWR2YW5jZWRPZ2NGaWx0ZXJzID0gaW5pdE9nY0ZpbHRlcnMucHVzaEJ1dHRvbnNcclxuICAgICAgICA/IGZhbHNlXHJcbiAgICAgICAgOiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChcclxuICAgICAgc291cmNlUGFyYW1zLkxBWUVSUy5zcGxpdCgnLCcpLmxlbmd0aCA+IDEgJiZcclxuICAgICAgaW5pdE9nY0ZpbHRlcnMgJiZcclxuICAgICAgaW5pdE9nY0ZpbHRlcnMuZW5hYmxlZFxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCcqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqJyk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICdCRSBDQVJFRlVMTCwgWU9VUiBXTVMgTEFZRVJTICgnICtcclxuICAgICAgICAgIHNvdXJjZVBhcmFtcy5MQVlFUlMgK1xyXG4gICAgICAgICAgJykgTVVTVCBTSEFSRSBUSEUgU0FNRSBGSUVMRFMgVE8gQUxMT1cgb2djRmlsdGVycyBUTyBXT1JLICEhICdcclxuICAgICAgKTtcclxuICAgICAgY29uc29sZS5sb2coJyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKionKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0aW9ucy5wYXJhbXNXRlMgJiYgaW5pdE9nY0ZpbHRlcnMgJiYgaW5pdE9nY0ZpbHRlcnMuZW5hYmxlZCAmJiBpbml0T2djRmlsdGVycy5lZGl0YWJsZSkge1xyXG4gICAgICB0aGlzLndmc1NlcnZpY2UuZ2V0U291cmNlRmllbGRzRnJvbVdGUyhvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmaWx0ZXJRdWVyeVN0cmluZyA9IG9nY0ZpbHRlcldyaXRlci5oYW5kbGVPZ2NGaWx0ZXJzQXBwbGllZFZhbHVlKFxyXG4gICAgICBvcHRpb25zLFxyXG4gICAgICBmaWVsZE5hbWVHZW9tZXRyeVxyXG4gICAgKTtcclxuICAgIHNvdXJjZVBhcmFtcy5GSUxURVIgPSBmaWx0ZXJRdWVyeVN0cmluZztcclxuICB9XHJcblxyXG4gIHJlZnJlc2goKSB7XHJcbiAgICB0aGlzLm9sLnVwZGF0ZVBhcmFtcyh7IGlnb1JlZnJlc2g6IE1hdGgucmFuZG9tKCkgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGJ1aWxkRHluYW1pY0Rvd25sb2FkVXJsRnJvbVBhcmFtc1dGUyhhc1dGU0RhdGFTb3VyY2VPcHRpb25zKSB7XHJcbiAgICBjb25zdCBxdWVyeVN0cmluZ1ZhbHVlcyA9IGZvcm1hdFdGU1F1ZXJ5U3RyaW5nKGFzV0ZTRGF0YVNvdXJjZU9wdGlvbnMpO1xyXG4gICAgY29uc3QgZG93bmxvYWRVcmwgPSBxdWVyeVN0cmluZ1ZhbHVlcy5maW5kKGYgPT4gZi5uYW1lID09PSAnZ2V0ZmVhdHVyZScpXHJcbiAgICAgIC52YWx1ZTtcclxuICAgIHJldHVybiBkb3dubG9hZFVybDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVPbFNvdXJjZSgpOiBvbFNvdXJjZUltYWdlV01TIHtcclxuICAgIHJldHVybiBuZXcgb2xTb3VyY2VJbWFnZVdNUyh0aGlzLm9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGVnZW5kKHN0eWxlPzogc3RyaW5nLCBzY2FsZT86IG51bWJlcik6IExlZ2VuZFtdIHtcclxuICAgIGxldCBsZWdlbmQgPSBzdXBlci5nZXRMZWdlbmQoKTtcclxuICAgIGlmIChsZWdlbmQubGVuZ3RoID4gMCAmJiAoc3R5bGUgPT09IHVuZGVmaW5lZCAmJiAhc2NhbGUpKSB7XHJcbiAgICAgIHJldHVybiBsZWdlbmQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc291cmNlUGFyYW1zID0gdGhpcy5wYXJhbXM7XHJcblxyXG4gICAgbGV0IGxheWVycyA9IFtdO1xyXG4gICAgaWYgKHNvdXJjZVBhcmFtcy5MQVlFUlMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBsYXllcnMgPSBzb3VyY2VQYXJhbXMuTEFZRVJTLnNwbGl0KCcsJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYmFzZVVybCA9IHRoaXMub3B0aW9ucy51cmwucmVwbGFjZSgvXFw/JC8sICcnKTtcclxuICAgIGNvbnN0IHBhcmFtcyA9IFtcclxuICAgICAgJ1JFUVVFU1Q9R2V0TGVnZW5kR3JhcGhpYycsXHJcbiAgICAgICdTRVJWSUNFPVdNUycsXHJcbiAgICAgICdGT1JNQVQ9aW1hZ2UvcG5nJyxcclxuICAgICAgJ1NMRF9WRVJTSU9OPTEuMS4wJyxcclxuICAgICAgYFZFUlNJT049JHtzb3VyY2VQYXJhbXMuVkVSU0lPTiB8fCAnMS4zLjAnfWBcclxuICAgIF07XHJcbiAgICBpZiAoc3R5bGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBwYXJhbXMucHVzaChgU1RZTEU9JHtzdHlsZX1gKTtcclxuICAgIH1cclxuICAgIGlmIChzY2FsZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHBhcmFtcy5wdXNoKGBTQ0FMRT0ke3NjYWxlfWApO1xyXG4gICAgfVxyXG5cclxuICAgIGxlZ2VuZCA9IGxheWVycy5tYXAoKGxheWVyOiBzdHJpbmcpID0+IHtcclxuICAgICAgY29uc3Qgc2VwYXJhdG9yID0gYmFzZVVybC5tYXRjaCgvXFw/LykgPyAnJicgOiAnPyc7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdXJsOiBgJHtiYXNlVXJsfSR7c2VwYXJhdG9yfSR7cGFyYW1zLmpvaW4oJyYnKX0mTEFZRVI9JHtsYXllcn1gLFxyXG4gICAgICAgIHRpdGxlOiBsYXllcnMubGVuZ3RoID4gMSA/IGxheWVyIDogdW5kZWZpbmVkLFxyXG4gICAgICAgIGN1cnJlbnRTdHlsZTogc3R5bGUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHN0eWxlIGFzIHN0cmluZ1xyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGxlZ2VuZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvblVud2F0Y2goKSB7fVxyXG59XHJcbiJdfQ==