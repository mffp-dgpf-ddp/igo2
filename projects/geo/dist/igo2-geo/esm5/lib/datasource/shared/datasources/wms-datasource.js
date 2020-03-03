/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import olSourceImageWMS from 'ol/source/ImageWMS';
import { DataSource } from './datasource';
import { OgcFilterWriter } from '../../../filter/shared/ogc-filter';
import { QueryHtmlTarget } from '../../../query/shared/query.enums';
import { formatWFSQueryString, checkWfsParams, defaultFieldNameGeometry } from './wms-wfs.utils';
import { ObjectUtils } from '@igo2/utils';
var WMSDataSource = /** @class */ (function (_super) {
    tslib_1.__extends(WMSDataSource, _super);
    function WMSDataSource(options, wfsService) {
        var _this = _super.call(this, options) || this;
        _this.options = options;
        _this.wfsService = wfsService;
        /** @type {?} */
        var sourceParams = options.params;
        /** @type {?} */
        var dpi = sourceParams.DPI || 96;
        sourceParams.DPI = dpi;
        sourceParams.MAP_RESOLUTION = dpi;
        sourceParams.FORMAT_OPTIONS = 'dpi:' + dpi;
        if (options.refreshIntervalSec && options.refreshIntervalSec > 0) {
            setInterval((/**
             * @return {?}
             */
            function () {
                _this.refresh();
            }), options.refreshIntervalSec * 1000); // Convert seconds to MS
        }
        /** @type {?} */
        var fieldNameGeometry = defaultFieldNameGeometry;
        // ####   START if paramsWFS
        if (options.paramsWFS) {
            /** @type {?} */
            var wfsCheckup = checkWfsParams(options, 'wms');
            ObjectUtils.mergeDeep(options.paramsWFS, wfsCheckup.paramsWFS);
            fieldNameGeometry =
                options.paramsWFS.fieldNameGeometry || fieldNameGeometry;
            options.download = Object.assign({}, options.download, {
                dynamicUrl: _this.buildDynamicDownloadUrlFromParamsWFS(options)
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
            function (sourceField) {
                sourceField.alias = sourceField.alias
                    ? sourceField.alias
                    : sourceField.name;
                // to allow only a list of sourcefield with names
            }));
        }
        /** @type {?} */
        var initOgcFilters = ((/** @type {?} */ (options)))
            .ogcFilters;
        /** @type {?} */
        var ogcFilterWriter = new OgcFilterWriter();
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
            _this.wfsService.getSourceFieldsFromWFS(options);
        }
        /** @type {?} */
        var filterQueryString = ogcFilterWriter.handleOgcFiltersAppliedValue(options, fieldNameGeometry);
        sourceParams.FILTER = filterQueryString;
        return _this;
    }
    Object.defineProperty(WMSDataSource.prototype, "params", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this.options.params));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WMSDataSource.prototype, "queryTitle", {
        get: /**
         * @return {?}
         */
        function () {
            return ((/** @type {?} */ (this.options))).queryTitle
                ? ((/** @type {?} */ (this.options))).queryTitle
                : 'title';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WMSDataSource.prototype, "mapLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return ((/** @type {?} */ (this.options))).mapLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WMSDataSource.prototype, "queryHtmlTarget", {
        get: /**
         * @return {?}
         */
        function () {
            return ((/** @type {?} */ (this.options))).queryHtmlTarget
                ? ((/** @type {?} */ (this.options))).queryHtmlTarget
                : QueryHtmlTarget.BLANK;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    WMSDataSource.prototype.refresh = /**
     * @return {?}
     */
    function () {
        this.ol.updateParams({ igoRefresh: Math.random() });
    };
    /**
     * @private
     * @param {?} asWFSDataSourceOptions
     * @return {?}
     */
    WMSDataSource.prototype.buildDynamicDownloadUrlFromParamsWFS = /**
     * @private
     * @param {?} asWFSDataSourceOptions
     * @return {?}
     */
    function (asWFSDataSourceOptions) {
        /** @type {?} */
        var queryStringValues = formatWFSQueryString(asWFSDataSourceOptions);
        /** @type {?} */
        var downloadUrl = queryStringValues.find((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return f.name === 'getfeature'; }))
            .value;
        return downloadUrl;
    };
    /**
     * @protected
     * @return {?}
     */
    WMSDataSource.prototype.createOlSource = /**
     * @protected
     * @return {?}
     */
    function () {
        return new olSourceImageWMS(this.options);
    };
    /**
     * @param {?=} style
     * @param {?=} scale
     * @return {?}
     */
    WMSDataSource.prototype.getLegend = /**
     * @param {?=} style
     * @param {?=} scale
     * @return {?}
     */
    function (style, scale) {
        /** @type {?} */
        var legend = _super.prototype.getLegend.call(this);
        if (legend.length > 0 && (style === undefined && !scale)) {
            return legend;
        }
        /** @type {?} */
        var sourceParams = this.params;
        /** @type {?} */
        var layers = [];
        if (sourceParams.LAYERS !== undefined) {
            layers = sourceParams.LAYERS.split(',');
        }
        /** @type {?} */
        var baseUrl = this.options.url.replace(/\?$/, '');
        /** @type {?} */
        var params = [
            'REQUEST=GetLegendGraphic',
            'SERVICE=WMS',
            'FORMAT=image/png',
            'SLD_VERSION=1.1.0',
            "VERSION=" + (sourceParams.VERSION || '1.3.0')
        ];
        if (style !== undefined) {
            params.push("STYLE=" + style);
        }
        if (scale !== undefined) {
            params.push("SCALE=" + scale);
        }
        legend = layers.map((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) {
            /** @type {?} */
            var separator = baseUrl.match(/\?/) ? '&' : '?';
            return {
                url: "" + baseUrl + separator + params.join('&') + "&LAYER=" + layer,
                title: layers.length > 1 ? layer : undefined,
                currentStyle: style === undefined ? undefined : (/** @type {?} */ (style))
            };
        }));
        return legend;
    };
    /**
     * @return {?}
     */
    WMSDataSource.prototype.onUnwatch = /**
     * @return {?}
     */
    function () { };
    return WMSDataSource;
}(DataSource));
export { WMSDataSource };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zLWRhdGFzb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd21zLWRhdGFzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLGdCQUFnQixNQUFNLG9CQUFvQixDQUFDO0FBRWxELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFLMUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRXBFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNwRSxPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLGNBQWMsRUFDZCx3QkFBd0IsRUFDekIsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRTFDO0lBQW1DLHlDQUFVO0lBdUIzQyx1QkFDUyxPQUE2QixFQUMxQixVQUFzQjtRQUZsQyxZQUlFLGtCQUFNLE9BQU8sQ0FBQyxTQThFZjtRQWpGUSxhQUFPLEdBQVAsT0FBTyxDQUFzQjtRQUMxQixnQkFBVSxHQUFWLFVBQVUsQ0FBWTs7WUFHMUIsWUFBWSxHQUFRLE9BQU8sQ0FBQyxNQUFNOztZQUVsQyxHQUFHLEdBQUcsWUFBWSxDQUFDLEdBQUcsSUFBSSxFQUFFO1FBQ2xDLFlBQVksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ3ZCLFlBQVksQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLFlBQVksQ0FBQyxjQUFjLEdBQUcsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUUzQyxJQUFJLE9BQU8sQ0FBQyxrQkFBa0IsSUFBSSxPQUFPLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxFQUFFO1lBQ2hFLFdBQVc7OztZQUFDO2dCQUNWLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNqQixDQUFDLEdBQUUsT0FBTyxD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LE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVM7Z0JBQzVDLFlBQVksRUFBRSxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLG1CQUFBLEtBQUssRUFBVTthQUNoRSxDQUFDO1FBQ0osQ0FBQyxFQUFDLENBQUM7UUFFSCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOzs7O0lBRU0saUNBQVM7OztJQUFoQixjQUFvQixDQUFDO0lBQ3ZCLG9CQUFDO0FBQUQsQ0FBQyxBQW5LRCxDQUFtQyxVQUFVLEdBbUs1Qzs7OztJQWxLQywyQkFBNEI7O0lBdUIxQixnQ0FBb0M7Ozs7O0lBQ3BDLG1DQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvbFNvdXJjZUltYWdlV01TIGZyb20gJ29sL3NvdXJjZS9JbWFnZVdNUyc7XHJcblxyXG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgTGVnZW5kIH0gZnJvbSAnLi9kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFdNU0RhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi93bXMtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBXRlNTZXJ2aWNlIH0gZnJvbSAnLi93ZnMuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJXcml0ZXIgfSBmcm9tICcuLi8uLi8uLi9maWx0ZXIvc2hhcmVkL29nYy1maWx0ZXInO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi9maWx0ZXIvc2hhcmVkL29nYy1maWx0ZXIuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgUXVlcnlIdG1sVGFyZ2V0IH0gZnJvbSAnLi4vLi4vLi4vcXVlcnkvc2hhcmVkL3F1ZXJ5LmVudW1zJztcclxuaW1wb3J0IHtcclxuICBmb3JtYXRXRlNRdWVyeVN0cmluZyxcclxuICBjaGVja1dmc1BhcmFtcyxcclxuICBkZWZhdWx0RmllbGROYW1lR2VvbWV0cnlcclxufSBmcm9tICcuL3dtcy13ZnMudXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgT2JqZWN0VXRpbHMgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5leHBvcnQgY2xhc3MgV01TRGF0YVNvdXJjZSBleHRlbmRzIERhdGFTb3VyY2Uge1xyXG4gIHB1YmxpYyBvbDogb2xTb3VyY2VJbWFnZVdNUztcclxuXHJcbiAgZ2V0IHBhcmFtcygpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5wYXJhbXMgYXMgYW55O1xyXG4gIH1cclxuXHJcbiAgZ2V0IHF1ZXJ5VGl0bGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAodGhpcy5vcHRpb25zIGFzIGFueSkucXVlcnlUaXRsZVxyXG4gICAgICA/ICh0aGlzLm9wdGlvbnMgYXMgYW55KS5xdWVyeVRpdGxlXHJcbiAgICAgIDogJ3RpdGxlJztcclxuICB9XHJcblxyXG4gIGdldCBtYXBMYWJlbCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuICh0aGlzLm9wdGlvbnMgYXMgYW55KS5tYXBMYWJlbDtcclxuICB9XHJcblxyXG4gIGdldCBxdWVyeUh0bWxUYXJnZXQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAodGhpcy5vcHRpb25zIGFzIGFueSkucXVlcnlIdG1sVGFyZ2V0XHJcbiAgICAgID8gKHRoaXMub3B0aW9ucyBhcyBhbnkpLnF1ZXJ5SHRtbFRhcmdldFxyXG4gICAgICA6IFF1ZXJ5SHRtbFRhcmdldC5CTEFOSztcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIG9wdGlvbnM6IFdNU0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gICAgcHJvdGVjdGVkIHdmc1NlcnZpY2U6IFdGU1NlcnZpY2VcclxuICApIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgY29uc3Qgc291cmNlUGFyYW1zOiBhbnkgPSBvcHRpb25zLnBhcmFtcztcclxuXHJcbiAgICBjb25zdCBkcGkgPSBzb3VyY2VQYXJhbXMuRFBJIHx8IDk2O1xyXG4gICAgc291cmNlUGFyYW1zLkRQSSA9IGRwaTtcclxuICAgIHNvdXJjZVBhcmFtcy5NQVBfUkVTT0xVVElPTiA9IGRwaTtcclxuICAgIHNvdXJjZVBhcmFtcy5GT1JNQVRfT1BUSU9OUyA9ICdkcGk6JyArIGRwaTtcclxuXHJcbiAgICBpZiAob3B0aW9ucy5yZWZyZXNoSW50ZXJ2YWxTZWMgJiYgb3B0aW9ucy5yZWZyZXNoSW50ZXJ2YWxTZWMgPiAwKSB7XHJcbiAgICAgIHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgfSwgb3B0aW9ucy5yZWZyZXNoSW50ZXJ2YWxTZWMgKiAxMDAwKTsgLy8gQ29udmVydCBzZWNvbmRzIHRvIE1TXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGZpZWxkTmFtZUdlb21ldHJ5ID0gZGVmYXVsdEZpZWxkTmFtZUdlb21ldHJ5O1xyXG5cclxuICAgIC8vICMjIyMgICBTVEFSVCBpZiBwYXJhbXNXRlNcclxuICAgIGlmIChvcHRpb25zLnBhcmFtc1dGUykge1xyXG4gICAgICBjb25zdCB3ZnNDaGVja3VwID0gY2hlY2tXZnNQYXJhbXMob3B0aW9ucywgJ3dtcycpO1xyXG4gICAgICBPYmplY3RVdGlscy5tZXJnZURlZXAob3B0aW9ucy5wYXJhbXNXRlMsIHdmc0NoZWNrdXAucGFyYW1zV0ZTKTtcclxuXHJcbiAgICAgIGZpZWxkTmFtZUdlb21ldHJ5ID1cclxuICAgICAgICBvcHRpb25zLnBhcmFtc1dGUy5maWVsZE5hbWVHZW9tZXRyeSB8fCBmaWVsZE5hbWVHZW9tZXRyeTtcclxuXHJcbiAgICAgIG9wdGlvbnMuZG93bmxvYWQgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLmRvd25sb2FkLCB7XHJcbiAgICAgICAgZHluYW1pY1VybDogdGhpcy5idWlsZER5bmFtaWNEb3dubG9hZFVybEZyb21QYXJhbXNXRlMob3B0aW9ucylcclxuICAgICAgfSk7XHJcbiAgICB9IC8vICAjIyMjICAgRU5EICBpZiBwYXJhbXNXRlNcclxuXHJcbiAgICBpZiAoIW9wdGlvbnMuc291cmNlRmllbGRzIHx8IG9wdGlvbnMuc291cmNlRmllbGRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBvcHRpb25zLnNvdXJjZUZpZWxkcyA9IFtdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb3B0aW9ucy5zb3VyY2VGaWVsZHMuZm9yRWFjaChzb3VyY2VGaWVsZCA9PiB7XHJcbiAgICAgICAgc291cmNlRmllbGQuYWxpYXMgPSBzb3VyY2VGaWVsZC5hbGlhc1xyXG4gICAgICAgICAgPyBzb3VyY2VGaWVsZC5hbGlhc1xyXG4gICAgICAgICAgOiBzb3VyY2VGaWVsZC5uYW1lO1xyXG4gICAgICAgIC8vIHRvIGFsbG93IG9ubHkgYSBsaXN0IG9mIHNvdXJjZWZpZWxkIHdpdGggbmFtZXNcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBpbml0T2djRmlsdGVycyA9IChvcHRpb25zIGFzIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucylcclxuICAgICAgLm9nY0ZpbHRlcnM7XHJcbiAgICBjb25zdCBvZ2NGaWx0ZXJXcml0ZXIgPSBuZXcgT2djRmlsdGVyV3JpdGVyKCk7XHJcblxyXG4gICAgaWYgKCFpbml0T2djRmlsdGVycykge1xyXG4gICAgICAob3B0aW9ucyBhcyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMpLm9nY0ZpbHRlcnMgPSBvZ2NGaWx0ZXJXcml0ZXIuZGVmaW5lT2djRmlsdGVyc0RlZmF1bHRPcHRpb25zKFxyXG4gICAgICAgIGluaXRPZ2NGaWx0ZXJzLFxyXG4gICAgICAgIGZpZWxkTmFtZUdlb21ldHJ5LFxyXG4gICAgICAgICd3bXMnXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpbml0T2djRmlsdGVycy5hZHZhbmNlZE9nY0ZpbHRlcnMgPSBpbml0T2djRmlsdGVycy5wdXNoQnV0dG9uc1xyXG4gICAgICAgID8gZmFsc2VcclxuICAgICAgICA6IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBzb3VyY2VQYXJhbXMuTEFZRVJTLnNwbGl0KCcsJykubGVuZ3RoID4gMSAmJlxyXG4gICAgICBpbml0T2djRmlsdGVycyAmJlxyXG4gICAgICBpbml0T2djRmlsdGVycy5lbmFibGVkXHJcbiAgICApIHtcclxuICAgICAgY29uc29sZS5sb2coJyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKionKTtcclxuICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgJ0JFIENBUkVGVUxMLCBZT1VSIFdNUyBMQVlFUlMgKCcgK1xyXG4gICAgICAgICAgc291cmNlUGFyYW1zLkxBWUVSUyArXHJcbiAgICAgICAgICAnKSBNVVNUIFNIQVJFIFRIRSBTQU1FIEZJRUxEUyBUTyBBTExPVyBvZ2NGaWx0ZXJzIFRPIFdPUksgISEgJ1xyXG4gICAgICApO1xyXG4gICAgICBjb25zb2xlLmxvZygnKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRpb25zLnBhcmFtc1dGUyAmJiBpbml0T2djRmlsdGVycyAmJiBpbml0T2djRmlsdGVycy5lbmFibGVkICYmIGluaXRPZ2NGaWx0ZXJzLmVkaXRhYmxlKSB7XHJcbiAgICAgIHRoaXMud2ZzU2VydmljZS5nZXRTb3VyY2VGaWVsZHNGcm9tV0ZTKG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZpbHRlclF1ZXJ5U3RyaW5nID0gb2djRmlsdGVyV3JpdGVyLmhhbmRsZU9nY0ZpbHRlcnNBcHBsaWVkVmFsdWUoXHJcbiAgICAgIG9wdGlvbnMsXHJcbiAgICAgIGZpZWxkTmFtZUdlb21ldHJ5XHJcbiAgICApO1xyXG4gICAgc291cmNlUGFyYW1zLkZJTFRFUiA9IGZpbHRlclF1ZXJ5U3RyaW5nO1xyXG4gIH1cclxuXHJcbiAgcmVmcmVzaCgpIHtcclxuICAgIHRoaXMub2wudXBkYXRlUGFyYW1zKHsgaWdvUmVmcmVzaDogTWF0aC5yYW5kb20oKSB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYnVpbGREeW5hbWljRG93bmxvYWRVcmxGcm9tUGFyYW1zV0ZTKGFzV0ZTRGF0YVNvdXJjZU9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHF1ZXJ5U3RyaW5nVmFsdWVzID0gZm9ybWF0V0ZTUXVlcnlTdHJpbmcoYXNXRlNEYXRhU291cmNlT3B0aW9ucyk7XHJcbiAgICBjb25zdCBkb3dubG9hZFVybCA9IHF1ZXJ5U3RyaW5nVmFsdWVzLmZpbmQoZiA9PiBmLm5hbWUgPT09ICdnZXRmZWF0dXJlJylcclxuICAgICAgLnZhbHVlO1xyXG4gICAgcmV0dXJuIGRvd25sb2FkVXJsO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZU9sU291cmNlKCk6IG9sU291cmNlSW1hZ2VXTVMge1xyXG4gICAgcmV0dXJuIG5ldyBvbFNvdXJjZUltYWdlV01TKHRoaXMub3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBnZXRMZWdlbmQoc3R5bGU/OiBzdHJpbmcsIHNjYWxlPzogbnVtYmVyKTogTGVnZW5kW10ge1xyXG4gICAgbGV0IGxlZ2VuZCA9IHN1cGVyLmdldExlZ2VuZCgpO1xyXG4gICAgaWYgKGxlZ2VuZC5sZW5ndGggPiAwICYmIChzdHlsZSA9PT0gdW5kZWZpbmVkICYmICFzY2FsZSkpIHtcclxuICAgICAgcmV0dXJuIGxlZ2VuZDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzb3VyY2VQYXJhbXMgPSB0aGlzLnBhcmFtcztcclxuXHJcbiAgICBsZXQgbGF5ZXJzID0gW107XHJcbiAgICBpZiAoc291cmNlUGFyYW1zLkxBWUVSUyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGxheWVycyA9IHNvdXJjZVBhcmFtcy5MQVlFUlMuc3BsaXQoJywnKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBiYXNlVXJsID0gdGhpcy5vcHRpb25zLnVybC5yZXBsYWNlKC9cXD8kLywgJycpO1xyXG4gICAgY29uc3QgcGFyYW1zID0gW1xyXG4gICAgICAnUkVRVUVTVD1HZXRMZWdlbmRHcmFwaGljJyxcclxuICAgICAgJ1NFUlZJQ0U9V01TJyxcclxuICAgICAgJ0ZPUk1BVD1pbWFnZS9wbmcnLFxyXG4gICAgICAnU0xEX1ZFUlNJT049MS4xLjAnLFxyXG4gICAgICBgVkVSU0lPTj0ke3NvdXJjZVBhcmFtcy5WRVJTSU9OIHx8ICcxLjMuMCd9YFxyXG4gICAgXTtcclxuICAgIGlmIChzdHlsZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHBhcmFtcy5wdXNoKGBTVFlMRT0ke3N0eWxlfWApO1xyXG4gICAgfVxyXG4gICAgaWYgKHNjYWxlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcGFyYW1zLnB1c2goYFNDQUxFPSR7c2NhbGV9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVnZW5kID0gbGF5ZXJzLm1hcCgobGF5ZXI6IHN0cmluZykgPT4ge1xyXG4gICAgICBjb25zdCBzZXBhcmF0b3IgPSBiYXNlVXJsLm1hdGNoKC9cXD8vKSA/ICcmJyA6ICc/JztcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB1cmw6IGAke2Jhc2VVcmx9JHtzZXBhcmF0b3J9JHtwYXJhbXMuam9pbignJicpfSZMQVlFUj0ke2xheWVyfWAsXHJcbiAgICAgICAgdGl0bGU6IGxheWVycy5sZW5ndGggPiAxID8gbGF5ZXIgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgY3VycmVudFN0eWxlOiBzdHlsZSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogc3R5bGUgYXMgc3RyaW5nXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbGVnZW5kO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uVW53YXRjaCgpIHt9XHJcbn1cclxuIl19