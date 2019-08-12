/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import olSourceImageWMS from 'ol/source/ImageWMS';
import { DataSource } from './datasource';
import { OgcFilterWriter } from '../../../filter/shared/ogc-filter';
import { QueryHtmlTarget } from '../../../query/shared/query.enums';
var WMSDataSource = /** @class */ (function (_super) {
    tslib_1.__extends(WMSDataSource, _super);
    function WMSDataSource(options, networkService, wfsService) {
        var _this = _super.call(this, options, networkService) || this;
        _this.options = options;
        _this.networkService = networkService;
        _this.wfsService = wfsService;
        // Important: To use wms versions smaller than 1.3.0, SRS
        // needs to be supplied in the source "params"
        // We need to do this to override the default version
        // of openlayers which is uppercase
        /** @type {?} */
        var sourceParams = options.params;
        if (sourceParams && sourceParams.version) {
            sourceParams.VERSION = sourceParams.version;
        }
        if (sourceParams && sourceParams.VERSION) {
            if (sourceParams.version !== '1.3.0') {
                if (!sourceParams.SRS && !sourceParams.srs) {
                    throw new Error("You must set a SRS (or srs) param for your WMS\n           (layer =  " + sourceParams.layers + ") because your want to use a WMS version under 1.3.0\n        Ex: \"srs\": \"EPSG:3857\" ");
                }
            }
        }
        if (sourceParams && sourceParams.INFO_FORMAT) {
            sourceParams.info_format = sourceParams.INFO_FORMAT;
        }
        if (options.refreshIntervalSec && options.refreshIntervalSec > 0) {
            setInterval((/**
             * @return {?}
             */
            function () {
                _this.refresh();
            }), options.refreshIntervalSec * 1000); // Convert seconds to MS
        }
        // ####   START if paramsWFS
        if (options.paramsWFS) {
            /** @type {?} */
            var wfsCheckup = _this.wfsService.checkWfsOptions(options);
            options.paramsWFS.version = wfsCheckup.paramsWFS.version;
            options.paramsWFS.wfsCapabilities = wfsCheckup.params.wfsCapabilities;
            _this.wfsService.getSourceFieldsFromWFS(options);
            _this.options.download = Object.assign({}, _this.options.download, {
                dynamicUrl: _this.buildDynamicDownloadUrlFromParamsWFS(_this.options)
            });
        } //  ####   END  if paramsWFS
        _this.ogcFilterWriter = new OgcFilterWriter();
        if (!options.sourceFields || options.sourceFields.length === 0) {
            options.sourceFields = [];
        }
        /** @type {?} */
        var initOgcFilters = ((/** @type {?} */ (_this.options))).ogcFilters;
        if (sourceParams.layers.split(',').length > 1 && _this.options && initOgcFilters && initOgcFilters.enabled) {
            console.log('*******************************');
            console.log('BE CAREFULL, YOUR WMS LAYERS (' + sourceParams.layers
                + ') MUST SHARE THE SAME FIELDS TO ALLOW ogcFilters TO WORK !! ');
            console.log('*******************************');
        }
        if (_this.options && initOgcFilters && initOgcFilters.enabled && initOgcFilters.filters) {
            /** @type {?} */
            var filters = initOgcFilters.filters;
            /** @type {?} */
            var rebuildFilter = _this.ogcFilterWriter.buildFilter(filters);
            /** @type {?} */
            var appliedFilter = _this.formatProcessedOgcFilter(rebuildFilter, sourceParams.layers);
            /** @type {?} */
            var wmsFilterValue = appliedFilter.length > 0
                ? appliedFilter.replace('filter=', '')
                : undefined;
            _this.ol.updateParams({ filter: wmsFilterValue });
        }
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
     * @param {?} processedFilter
     * @param {?} layers
     * @return {?}
     */
    WMSDataSource.prototype.formatProcessedOgcFilter = /**
     * @param {?} processedFilter
     * @param {?} layers
     * @return {?}
     */
    function (processedFilter, layers) {
        /** @type {?} */
        var appliedFilter = '';
        if (processedFilter.length === 0 && layers.indexOf(',') === -1) {
            appliedFilter = processedFilter;
        }
        else {
            layers.split(',').forEach((/**
             * @param {?} layerName
             * @return {?}
             */
            function (layerName) {
                appliedFilter = appliedFilter + "(" + processedFilter.replace('filter=', '') + ")";
            }));
        }
        return "filter=" + appliedFilter;
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
        var outputFormat = asWFSDataSourceOptions.paramsWFS.outputFormat !== undefined
            ? 'outputFormat=' + asWFSDataSourceOptions.paramsWFS.outputFormat
            : '';
        /** @type {?} */
        var paramMaxFeatures = 'maxFeatures';
        if (asWFSDataSourceOptions.paramsWFS.version === '2.0.0' ||
            !asWFSDataSourceOptions.paramsWFS.version) {
            paramMaxFeatures = 'count';
        }
        /** @type {?} */
        var maxFeatures = asWFSDataSourceOptions.paramsWFS.maxFeatures
            ? paramMaxFeatures + '=' + asWFSDataSourceOptions.paramsWFS.maxFeatures
            : paramMaxFeatures + '=5000';
        /** @type {?} */
        var srsname = asWFSDataSourceOptions.paramsWFS.srsName
            ? 'srsname=' + asWFSDataSourceOptions.paramsWFS.srsName
            : 'srsname=EPSG:3857';
        /** @type {?} */
        var baseWfsQuery = this.wfsService.buildBaseWfsUrl(asWFSDataSourceOptions, 'GetFeature');
        return baseWfsQuery + "&" + outputFormat + "&" + srsname + "&" + maxFeatures;
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
        if (this.options.paramsWFS) {
            this.options.urlWfs = this.options.urlWfs
                ? this.options.urlWfs
                : this.options.url;
            this.options.paramsWFS.version = this.options.paramsWFS.version
                ? this.options.paramsWFS.version
                : '2.0.0';
        }
        /** @type {?} */
        var initOgcFilters = ((/** @type {?} */ (this.options))).ogcFilters;
        /** @type {?} */
        var ogcFiltersDefaultValue = false;
        initOgcFilters = initOgcFilters === undefined ? {} : initOgcFilters;
        initOgcFilters.enabled = initOgcFilters.enabled === undefined ? ogcFiltersDefaultValue : initOgcFilters.enabled;
        initOgcFilters.editable = initOgcFilters.editable === undefined ? ogcFiltersDefaultValue : initOgcFilters.editable;
        return new olSourceImageWMS(this.options);
    };
    /**
     * @param {?=} scale
     * @return {?}
     */
    WMSDataSource.prototype.getLegend = /**
     * @param {?=} scale
     * @return {?}
     */
    function (scale) {
        /** @type {?} */
        var legend = _super.prototype.getLegend.call(this);
        if (legend.length > 0) {
            return legend;
        }
        /** @type {?} */
        var sourceParams = this.params;
        /** @type {?} */
        var layers = [];
        if (sourceParams.layers !== undefined) {
            layers = sourceParams.layers.split(',');
        }
        /** @type {?} */
        var baseUrl = this.options.url.replace(/\?$/, '');
        /** @type {?} */
        var params = [
            'REQUEST=GetLegendGraphic',
            'SERVICE=wms',
            'FORMAT=image/png',
            'LEGEND_OPTIONS=forceLabels:on',
            'SLD_VERSION=1.1.0',
            "VERSION=" + (sourceParams.version || '1.3.0')
        ];
        if (scale !== undefined) {
            params.push("SCALE=" + scale);
        }
        legend = layers.map((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) {
            return {
                url: baseUrl + "?" + params.join('&') + "&LAYER=" + layer,
                title: layers.length > 1 ? layer : undefined
            };
        }));
        return legend;
    };
    return WMSDataSource;
}(DataSource));
export { WMSDataSource };
if (false) {
    /** @type {?} */
    WMSDataSource.prototype.ol;
    /** @type {?} */
    WMSDataSource.prototype.ogcFilterWriter;
    /** @type {?} */
    WMSDataSource.prototype.options;
    /** @type {?} */
    WMSDataSource.prototype.networkService;
    /**
     * @type {?}
     * @protected
     */
    WMSDataSource.prototype.wfsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zLWRhdGFzb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd21zLWRhdGFzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLGdCQUFnQixNQUFNLG9CQUFvQixDQUFDO0FBRWxELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFLMUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRXBFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUlwRTtJQUFtQyx5Q0FBVTtJQW9CM0MsdUJBQ1MsT0FBNkIsRUFDN0IsY0FBOEIsRUFDM0IsVUFBc0I7UUFIbEMsWUFLRSxrQkFBTSxPQUFPLEVBQUUsY0FBYyxDQUFDLFNBaUUvQjtRQXJFUSxhQUFPLEdBQVAsT0FBTyxDQUFzQjtRQUM3QixvQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDM0IsZ0JBQVUsR0FBVixVQUFVLENBQVk7Ozs7OztZQVExQixZQUFZLEdBQVEsT0FBTyxDQUFDLE1BQU07UUFDeEMsSUFBSSxZQUFZLElBQUksWUFBWSxDQUFDLE9BQU8sRUFBRTtZQUN4QyxZQUFZLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUM7U0FDN0M7UUFFRCxJQUFJLFlBQVksSUFBSSxZQUFZLENBQUMsT0FBTyxFQUFFO1lBQ3hDLElBQUksWUFBWSxDQUFDLE9BQU8sS0FBSyxPQUFPLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRTtvQkFDMUMsTUFBTSxJQUFJLEtBQUssQ0FBQyx1RUFDSixHQUFHLFlBQVksQ0FBQyxNQUFNLEdBQUcsMkZBQ2YsQ0FBQyxDQUFDO2lCQUN6QjthQUNGO1NBQ0Y7UUFFRCxJQUFJLFlBQVksSUFBSSxZQUFZ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QyxHQUFHLENBQUMsQ0FBQztTQUN6Qzs7WUFFSyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7O1lBQzdDLE1BQU0sR0FBRztZQUNiLDBCQUEwQjtZQUMxQixhQUFhO1lBQ2Isa0JBQWtCO1lBQ2xCLCtCQUErQjtZQUMvQixtQkFBbUI7WUFDbkIsY0FBVyxZQUFZLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBRTtTQUM3QztRQUNELElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVMsS0FBTyxDQUFDLENBQUM7U0FDL0I7UUFFRCxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUc7Ozs7UUFBQyxVQUFDLEtBQWE7WUFDaEMsT0FBTztnQkFDTCxHQUFHLEVBQUssT0FBTyxTQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQVUsS0FBTztnQkFDcEQsS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVM7YUFDN0MsQ0FBQztRQUNKLENBQUMsRUFBQyxDQUFDO1FBRUgsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQTFMRCxDQUFtQyxVQUFVLEdBMEw1Qzs7OztJQXpMQywyQkFBNEI7O0lBQzVCLHdDQUF3Qzs7SUFtQnRDLGdDQUFvQzs7SUFDcEMsdUNBQXFDOzs7OztJQUNyQyxtQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xTb3VyY2VJbWFnZVdNUyBmcm9tICdvbC9zb3VyY2UvSW1hZ2VXTVMnO1xyXG5cclxuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IERhdGFTb3VyY2VMZWdlbmRPcHRpb25zIH0gZnJvbSAnLi9kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFdNU0RhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi93bXMtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBXRlNTZXJ2aWNlIH0gZnJvbSAnLi93ZnMuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJXcml0ZXIgfSBmcm9tICcuLi8uLi8uLi9maWx0ZXIvc2hhcmVkL29nYy1maWx0ZXInO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi9maWx0ZXIvc2hhcmVkL29nYy1maWx0ZXIuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgUXVlcnlIdG1sVGFyZ2V0IH0gZnJvbSAnLi4vLi4vLi4vcXVlcnkvc2hhcmVkL3F1ZXJ5LmVudW1zJztcclxuXHJcbmltcG9ydCB7IE5ldHdvcmtTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgV01TRGF0YVNvdXJjZSBleHRlbmRzIERhdGFTb3VyY2Uge1xyXG4gIHB1YmxpYyBvbDogb2xTb3VyY2VJbWFnZVdNUztcclxuICBwdWJsaWMgb2djRmlsdGVyV3JpdGVyOiBPZ2NGaWx0ZXJXcml0ZXI7XHJcblxyXG4gIGdldCBwYXJhbXMoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMucGFyYW1zIGFzIGFueTtcclxuICB9XHJcblxyXG4gIGdldCBxdWVyeVRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKHRoaXMub3B0aW9ucyBhcyBhbnkpLnF1ZXJ5VGl0bGVcclxuICAgICAgPyAodGhpcy5vcHRpb25zIGFzIGFueSkucXVlcnlUaXRsZVxyXG4gICAgICA6ICd0aXRsZSc7XHJcbiAgfVxyXG5cclxuICBnZXQgcXVlcnlIdG1sVGFyZ2V0KCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKHRoaXMub3B0aW9ucyBhcyBhbnkpLnF1ZXJ5SHRtbFRhcmdldFxyXG4gICAgICA/ICh0aGlzLm9wdGlvbnMgYXMgYW55KS5xdWVyeUh0bWxUYXJnZXRcclxuICAgICAgOiBRdWVyeUh0bWxUYXJnZXQuQkxBTks7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBvcHRpb25zOiBXTVNEYXRhU291cmNlT3B0aW9ucyxcclxuICAgIHB1YmxpYyBuZXR3b3JrU2VydmljZTogTmV0d29ya1NlcnZpY2UsXHJcbiAgICBwcm90ZWN0ZWQgd2ZzU2VydmljZTogV0ZTU2VydmljZVxyXG4gICkge1xyXG4gICAgc3VwZXIob3B0aW9ucywgbmV0d29ya1NlcnZpY2UpO1xyXG4gICAgLy8gSW1wb3J0YW50OiBUbyB1c2Ugd21zIHZlcnNpb25zIHNtYWxsZXIgdGhhbiAxLjMuMCwgU1JTXHJcbiAgICAvLyBuZWVkcyB0byBiZSBzdXBwbGllZCBpbiB0aGUgc291cmNlIFwicGFyYW1zXCJcclxuXHJcbiAgICAvLyBXZSBuZWVkIHRvIGRvIHRoaXMgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgdmVyc2lvblxyXG4gICAgLy8gb2Ygb3BlbmxheWVycyB3aGljaCBpcyB1cHBlcmNhc2VcclxuICAgIGNvbnN0IHNvdXJjZVBhcmFtczogYW55ID0gb3B0aW9ucy5wYXJhbXM7XHJcbiAgICBpZiAoc291cmNlUGFyYW1zICYmIHNvdXJjZVBhcmFtcy52ZXJzaW9uKSB7XHJcbiAgICAgIHNvdXJjZVBhcmFtcy5WRVJTSU9OID0gc291cmNlUGFyYW1zLnZlcnNpb247XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNvdXJjZVBhcmFtcyAmJiBzb3VyY2VQYXJhbXMuVkVSU0lPTikge1xyXG4gICAgICBpZiAoc291cmNlUGFyYW1zLnZlcnNpb24gIT09ICcxLjMuMCcpIHtcclxuICAgICAgICBpZiAoIXNvdXJjZVBhcmFtcy5TUlMgJiYgIXNvdXJjZVBhcmFtcy5zcnMpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgWW91IG11c3Qgc2V0IGEgU1JTIChvciBzcnMpIHBhcmFtIGZvciB5b3VyIFdNU1xyXG4gICAgICAgICAgIChsYXllciA9ICBgICsgc291cmNlUGFyYW1zLmxheWVycyArIGApIGJlY2F1c2UgeW91ciB3YW50IHRvIHVzZSBhIFdNUyB2ZXJzaW9uIHVuZGVyIDEuMy4wXHJcbiAgICAgICAgRXg6IFwic3JzXCI6IFwiRVBTRzozODU3XCIgYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNvdXJjZVBhcmFtcyAmJiBzb3VyY2VQYXJhbXMuSU5GT19GT1JNQVQpIHtcclxuICAgICAgc291cmNlUGFyYW1zLmluZm9fZm9ybWF0ID0gc291cmNlUGFyYW1zLklORk9fRk9STUFUO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRpb25zLnJlZnJlc2hJbnRlcnZhbFNlYyAmJiBvcHRpb25zLnJlZnJlc2hJbnRlcnZhbFNlYyA+IDApIHtcclxuICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICB9LCBvcHRpb25zLnJlZnJlc2hJbnRlcnZhbFNlYyAqIDEwMDApOyAvLyBDb252ZXJ0IHNlY29uZHMgdG8gTVNcclxuICAgIH1cclxuXHJcbiAgICAvLyAjIyMjICAgU1RBUlQgaWYgcGFyYW1zV0ZTXHJcbiAgICBpZiAob3B0aW9ucy5wYXJhbXNXRlMpIHtcclxuICAgICAgY29uc3Qgd2ZzQ2hlY2t1cCA9IHRoaXMud2ZzU2VydmljZS5jaGVja1dmc09wdGlvbnMob3B0aW9ucyk7XHJcbiAgICAgIG9wdGlvbnMucGFyYW1zV0ZTLnZlcnNpb24gPSB3ZnNDaGVja3VwLnBhcmFtc1dGUy52ZXJzaW9uO1xyXG4gICAgICBvcHRpb25zLnBhcmFtc1dGUy53ZnNDYXBhYmlsaXRpZXMgPSB3ZnNDaGVja3VwLnBhcmFtcy53ZnNDYXBhYmlsaXRpZXM7XHJcblxyXG4gICAgICB0aGlzLndmc1NlcnZpY2UuZ2V0U291cmNlRmllbGRzRnJvbVdGUyhvcHRpb25zKTtcclxuXHJcbiAgICAgIHRoaXMub3B0aW9ucy5kb3dubG9hZCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMub3B0aW9ucy5kb3dubG9hZCwge1xyXG4gICAgICAgIGR5bmFtaWNVcmw6IHRoaXMuYnVpbGREeW5hbWljRG93bmxvYWRVcmxGcm9tUGFyYW1zV0ZTKHRoaXMub3B0aW9ucylcclxuICAgICAgfSk7XHJcbiAgICB9IC8vICAjIyMjICAgRU5EICBpZiBwYXJhbXNXRlNcclxuICAgIHRoaXMub2djRmlsdGVyV3JpdGVyID0gbmV3IE9nY0ZpbHRlcldyaXRlcigpO1xyXG4gICAgaWYgKCFvcHRpb25zLnNvdXJjZUZpZWxkcyB8fCBvcHRpb25zLnNvdXJjZUZpZWxkcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgb3B0aW9ucy5zb3VyY2VGaWVsZHMgPSBbXTtcclxuICAgIH1cclxuICAgIGNvbnN0IGluaXRPZ2NGaWx0ZXJzID0gKHRoaXMub3B0aW9ucyBhcyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMpLm9nY0ZpbHRlcnM7XHJcbiAgICBpZiAoc291cmNlUGFyYW1zLmxheWVycy5zcGxpdCgnLCcpLmxlbmd0aCA+IDEgJiYgdGhpcy5vcHRpb25zICYmIGluaXRPZ2NGaWx0ZXJzICYmIGluaXRPZ2NGaWx0ZXJzLmVuYWJsZWQpIHtcclxuICAgICAgY29uc29sZS5sb2coJyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKionKTtcclxuICAgICAgY29uc29sZS5sb2coJ0JFIENBUkVGVUxMLCBZT1VSIFdNUyBMQVlFUlMgKCcgKyBzb3VyY2VQYXJhbXMubGF5ZXJzXHJcbiAgICAgICsgJykgTVVTVCBTSEFSRSBUSEUgU0FNRSBGSUVMRFMgVE8gQUxMT1cgb2djRmlsdGVycyBUTyBXT1JLICEhICcpO1xyXG4gICAgICBjb25zb2xlLmxvZygnKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKicpO1xyXG4gIH1cclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zICYmIGluaXRPZ2NGaWx0ZXJzICYmIGluaXRPZ2NGaWx0ZXJzLmVuYWJsZWQgJiYgaW5pdE9nY0ZpbHRlcnMuZmlsdGVycykge1xyXG4gICAgICAgIGNvbnN0IGZpbHRlcnMgPSBpbml0T2djRmlsdGVycy5maWx0ZXJzO1xyXG4gICAgICAgIGNvbnN0IHJlYnVpbGRGaWx0ZXIgPSB0aGlzLm9nY0ZpbHRlcldyaXRlci5idWlsZEZpbHRlcihmaWx0ZXJzKTtcclxuICAgICAgICBjb25zdCBhcHBsaWVkRmlsdGVyID0gdGhpcy5mb3JtYXRQcm9jZXNzZWRPZ2NGaWx0ZXIocmVidWlsZEZpbHRlciwgc291cmNlUGFyYW1zLmxheWVycyk7XHJcbiAgICAgICAgY29uc3Qgd21zRmlsdGVyVmFsdWUgPSBhcHBsaWVkRmlsdGVyLmxlbmd0aCA+IDBcclxuICAgICAgICA/IGFwcGxpZWRGaWx0ZXIucmVwbGFjZSgnZmlsdGVyPScsICcnKVxyXG4gICAgICAgIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMub2wudXBkYXRlUGFyYW1zKHsgZmlsdGVyOiB3bXNGaWx0ZXJWYWx1ZSB9KTtcclxuICAgICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHJlZnJlc2goKSB7XHJcbiAgICB0aGlzLm9sLnVwZGF0ZVBhcmFtcyh7IGlnb1JlZnJlc2g6IE1hdGgucmFuZG9tKCkgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZm9ybWF0UHJvY2Vzc2VkT2djRmlsdGVyKHByb2Nlc3NlZEZpbHRlciwgbGF5ZXJzKTogc3RyaW5nIHtcclxuICAgIGxldCBhcHBsaWVkRmlsdGVyID0gJyc7XHJcbiAgICBpZiAocHJvY2Vzc2VkRmlsdGVyLmxlbmd0aCA9PT0gMCAmJiBsYXllcnMuaW5kZXhPZignLCcpID09PSAtMSkge1xyXG4gICAgICBhcHBsaWVkRmlsdGVyID0gcHJvY2Vzc2VkRmlsdGVyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGF5ZXJzLnNwbGl0KCcsJykuZm9yRWFjaChsYXllck5hbWUgPT4ge1xyXG4gICAgICAgIGFwcGxpZWRGaWx0ZXIgPSBgJHthcHBsaWVkRmlsdGVyfSgke3Byb2Nlc3NlZEZpbHRlci5yZXBsYWNlKCdmaWx0ZXI9JywgJycpfSlgO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBgZmlsdGVyPSR7YXBwbGllZEZpbHRlcn1gO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBidWlsZER5bmFtaWNEb3dubG9hZFVybEZyb21QYXJhbXNXRlMoYXNXRlNEYXRhU291cmNlT3B0aW9ucykge1xyXG4gICAgY29uc3Qgb3V0cHV0Rm9ybWF0ID1cclxuICAgICAgYXNXRlNEYXRhU291cmNlT3B0aW9ucy5wYXJhbXNXRlMub3V0cHV0Rm9ybWF0ICE9PSB1bmRlZmluZWRcclxuICAgICAgICA/ICdvdXRwdXRGb3JtYXQ9JyArIGFzV0ZTRGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTLm91dHB1dEZvcm1hdFxyXG4gICAgICAgIDogJyc7XHJcblxyXG4gICAgbGV0IHBhcmFtTWF4RmVhdHVyZXMgPSAnbWF4RmVhdHVyZXMnO1xyXG4gICAgaWYgKFxyXG4gICAgICBhc1dGU0RhdGFTb3VyY2VPcHRpb25zLnBhcmFtc1dGUy52ZXJzaW9uID09PSAnMi4wLjAnIHx8XHJcbiAgICAgICFhc1dGU0RhdGFTb3VyY2VPcHRpb25zLnBhcmFtc1dGUy52ZXJzaW9uXHJcbiAgICApIHtcclxuICAgICAgcGFyYW1NYXhGZWF0dXJlcyA9ICdjb3VudCc7XHJcbiAgICB9XHJcbiAgICBjb25zdCBtYXhGZWF0dXJlcyA9IGFzV0ZTRGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTLm1heEZlYXR1cmVzXHJcbiAgICAgID8gcGFyYW1NYXhGZWF0dXJlcyArICc9JyArIGFzV0ZTRGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTLm1heEZlYXR1cmVzXHJcbiAgICAgIDogcGFyYW1NYXhGZWF0dXJlcyArICc9NTAwMCc7XHJcbiAgICBjb25zdCBzcnNuYW1lID0gYXNXRlNEYXRhU291cmNlT3B0aW9ucy5wYXJhbXNXRlMuc3JzTmFtZVxyXG4gICAgICA/ICdzcnNuYW1lPScgKyBhc1dGU0RhdGFTb3VyY2VPcHRpb25zLnBhcmFtc1dGUy5zcnNOYW1lXHJcbiAgICAgIDogJ3Nyc25hbWU9RVBTRzozODU3JztcclxuICAgIGNvbnN0IGJhc2VXZnNRdWVyeSA9IHRoaXMud2ZzU2VydmljZS5idWlsZEJhc2VXZnNVcmwoXHJcbiAgICAgIGFzV0ZTRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgICAgICdHZXRGZWF0dXJlJ1xyXG4gICAgKTtcclxuICAgIHJldHVybiBgJHtiYXNlV2ZzUXVlcnl9JiR7b3V0cHV0Rm9ybWF0fSYke3Nyc25hbWV9JiR7bWF4RmVhdHVyZXN9YDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVPbFNvdXJjZSgpOiBvbFNvdXJjZUltYWdlV01TIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMucGFyYW1zV0ZTKSB7XHJcbiAgICAgIHRoaXMub3B0aW9ucy51cmxXZnMgPSB0aGlzLm9wdGlvbnMudXJsV2ZzXHJcbiAgICAgICAgPyB0aGlzLm9wdGlvbnMudXJsV2ZzXHJcbiAgICAgICAgOiB0aGlzLm9wdGlvbnMudXJsO1xyXG4gICAgICB0aGlzLm9wdGlvbnMucGFyYW1zV0ZTLnZlcnNpb24gPSB0aGlzLm9wdGlvbnMucGFyYW1zV0ZTLnZlcnNpb25cclxuICAgICAgICA/IHRoaXMub3B0aW9ucy5wYXJhbXNXRlMudmVyc2lvblxyXG4gICAgICAgIDogJzIuMC4wJztcclxuICAgIH1cclxuICAgIGxldCBpbml0T2djRmlsdGVycyA9ICh0aGlzLm9wdGlvbnMgYXMgT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zKS5vZ2NGaWx0ZXJzO1xyXG4gICAgY29uc3Qgb2djRmlsdGVyc0RlZmF1bHRWYWx1ZSA9IGZhbHNlOyAvLyBkZWZhdWx0IHZhbHVlcyBmb3Igd21zLlxyXG4gICAgaW5pdE9nY0ZpbHRlcnMgPSBpbml0T2djRmlsdGVycyA9PT0gdW5kZWZpbmVkID8ge30gOiBpbml0T2djRmlsdGVycztcclxuICAgIGluaXRPZ2NGaWx0ZXJzLmVuYWJsZWQgPSBpbml0T2djRmlsdGVycy5lbmFibGVkID09PSB1bmRlZmluZWQgPyBvZ2NGaWx0ZXJzRGVmYXVsdFZhbHVlIDogaW5pdE9nY0ZpbHRlcnMuZW5hYmxlZDtcclxuICAgIGluaXRPZ2NGaWx0ZXJzLmVkaXRhYmxlID0gaW5pdE9nY0ZpbHRlcnMuZWRpdGFibGUgPT09IHVuZGVmaW5lZCA/IG9nY0ZpbHRlcnNEZWZhdWx0VmFsdWUgOiBpbml0T2djRmlsdGVycy5lZGl0YWJsZTtcclxuICAgIHJldHVybiBuZXcgb2xTb3VyY2VJbWFnZVdNUyh0aGlzLm9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGVnZW5kKHNjYWxlPzogbnVtYmVyKTogRGF0YVNvdXJjZUxlZ2VuZE9wdGlvbnNbXSB7XHJcbiAgICBsZXQgbGVnZW5kID0gc3VwZXIuZ2V0TGVnZW5kKCk7XHJcbiAgICBpZiAobGVnZW5kLmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuIGxlZ2VuZDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzb3VyY2VQYXJhbXMgPSB0aGlzLnBhcmFtcztcclxuXHJcbiAgICBsZXQgbGF5ZXJzID0gW107XHJcbiAgICBpZiAoc291cmNlUGFyYW1zLmxheWVycyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGxheWVycyA9IHNvdXJjZVBhcmFtcy5sYXllcnMuc3BsaXQoJywnKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBiYXNlVXJsID0gdGhpcy5vcHRpb25zLnVybC5yZXBsYWNlKC9cXD8kLywgJycpO1xyXG4gICAgY29uc3QgcGFyYW1zID0gW1xyXG4gICAgICAnUkVRVUVTVD1HZXRMZWdlbmRHcmFwaGljJyxcclxuICAgICAgJ1NFUlZJQ0U9d21zJyxcclxuICAgICAgJ0ZPUk1BVD1pbWFnZS9wbmcnLFxyXG4gICAgICAnTEVHRU5EX09QVElPTlM9Zm9yY2VMYWJlbHM6b24nLFxyXG4gICAgICAnU0xEX1ZFUlNJT049MS4xLjAnLFxyXG4gICAgICBgVkVSU0lPTj0ke3NvdXJjZVBhcmFtcy52ZXJzaW9uIHx8ICcxLjMuMCd9YFxyXG4gICAgXTtcclxuICAgIGlmIChzY2FsZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHBhcmFtcy5wdXNoKGBTQ0FMRT0ke3NjYWxlfWApO1xyXG4gICAgfVxyXG5cclxuICAgIGxlZ2VuZCA9IGxheWVycy5tYXAoKGxheWVyOiBzdHJpbmcpID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB1cmw6IGAke2Jhc2VVcmx9PyR7cGFyYW1zLmpvaW4oJyYnKX0mTEFZRVI9JHtsYXllcn1gLFxyXG4gICAgICAgIHRpdGxlOiBsYXllcnMubGVuZ3RoID4gMSA/IGxheWVyIDogdW5kZWZpbmVkXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbGVnZW5kO1xyXG4gIH1cclxufVxyXG4iXX0=