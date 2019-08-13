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
        /** @type {?} */
        var fieldNameGeometry = defaultFieldNameGeometry;
        // ####   START if paramsWFS
        if (options.paramsWFS) {
            /** @type {?} */
            var wfsCheckup = checkWfsParams(options, 'wms');
            ObjectUtils.mergeDeep(options.paramsWFS, wfsCheckup.paramsWFS);
            fieldNameGeometry = options.paramsWFS.fieldNameGeometry || fieldNameGeometry;
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
                sourceField.alias = sourceField.alias ? sourceField.alias : sourceField.name;
                // to allow only a list of sourcefield with names
            }));
        }
        /** @type {?} */
        var initOgcFilters = ((/** @type {?} */ (options))).ogcFilters;
        /** @type {?} */
        var ogcFilterWriter = new OgcFilterWriter();
        if (!initOgcFilters) {
            ((/** @type {?} */ (options))).ogcFilters =
                ogcFilterWriter.defineOgcFiltersDefaultOptions(initOgcFilters, fieldNameGeometry, 'wms');
        }
        else {
            initOgcFilters.advancedOgcFilters = initOgcFilters.pushButtons ? false : true;
        }
        if (sourceParams.layers.split(',').length > 1 && options && initOgcFilters.enabled) {
            console.log('*******************************');
            console.log('BE CAREFULL, YOUR WMS LAYERS (' + sourceParams.layers
                + ') MUST SHARE THE SAME FIELDS TO ALLOW ogcFilters TO WORK !! ');
            console.log('*******************************');
        }
        if (options.paramsWFS && initOgcFilters.enabled) {
            _this.wfsService.getSourceFieldsFromWFS(options);
        }
        /** @type {?} */
        var filterQueryString = ogcFilterWriter.handleOgcFiltersAppliedValue(options, fieldNameGeometry);
        _this.ol.updateParams({ filter: filterQueryString });
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
        function (f) { return f.name === 'getfeature'; })).value;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zLWRhdGFzb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd21zLWRhdGFzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLGdCQUFnQixNQUFNLG9CQUFvQixDQUFDO0FBRWxELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFLMUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRXBFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsb0JBQW9CLEVBQXFCLGNBQWMsRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXBILE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFMUM7SUFBbUMseUNBQVU7SUFtQjNDLHVCQUNTLE9BQTZCLEVBQzFCLFVBQXNCO1FBRmxDLFlBSUUsa0JBQU0sT0FBTyxDQUFDLFNBMEVmO1FBN0VRLGFBQU8sR0FBUCxPQUFPLENBQXNCO1FBQzFCLGdCQUFVLEdBQVYsVUFBVSxDQUFZOzs7Ozs7WUFRMUIsWUFBWSxHQUFRLE9BQU8sQ0FBQyxNQUFNO1FBQ3hDLElBQUksWUFBWSxJQUFJLFlBQVksQ0FBQyxPQUFPLEVBQUU7WUFDeEMsWUFBWSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDO1NBQzdDO1FBRUQsSUFBSSxZQUFZLElBQUksWUFBWSxDQUFDLE9BQU8sRUFBRTtZQUN4QyxJQUFJLFlBQVksQ0FBQyxPQUFPLEtBQUssT0FBTyxFQUFFO2dCQUNwQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUU7b0JBQzFDLE1BQU0sSUFBSSxLQUFLLENBQUMsdUVBQ0osR0FBRyxZQUFZLENBQUMsTUFBTSxHQUFH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QyxDQUFDO1FBRUgsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7OztJQUVNLGlDQUFTOzs7SUFBaEIsY0FBb0IsQ0FBQztJQUN2QixvQkFBQztBQUFELENBQUMsQUFySkQsQ0FBbUMsVUFBVSxHQXFKNUM7Ozs7SUFwSkMsMkJBQTRCOztJQW1CMUIsZ0NBQW9DOzs7OztJQUNwQyxtQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xTb3VyY2VJbWFnZVdNUyBmcm9tICdvbC9zb3VyY2UvSW1hZ2VXTVMnO1xyXG5cclxuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IERhdGFTb3VyY2VMZWdlbmRPcHRpb25zIH0gZnJvbSAnLi9kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFdNU0RhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi93bXMtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBXRlNTZXJ2aWNlIH0gZnJvbSAnLi93ZnMuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJXcml0ZXIgfSBmcm9tICcuLi8uLi8uLi9maWx0ZXIvc2hhcmVkL29nYy1maWx0ZXInO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi9maWx0ZXIvc2hhcmVkL29nYy1maWx0ZXIuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgUXVlcnlIdG1sVGFyZ2V0IH0gZnJvbSAnLi4vLi4vLi4vcXVlcnkvc2hhcmVkL3F1ZXJ5LmVudW1zJztcclxuaW1wb3J0IHsgZm9ybWF0V0ZTUXVlcnlTdHJpbmcsIGRlZmF1bHRXZnNWZXJzaW9uLCBjaGVja1dmc1BhcmFtcywgZGVmYXVsdEZpZWxkTmFtZUdlb21ldHJ5IH0gZnJvbSAnLi93bXMtd2ZzLnV0aWxzJztcclxuXHJcbmltcG9ydCB7IE9iamVjdFV0aWxzIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdNU0RhdGFTb3VyY2UgZXh0ZW5kcyBEYXRhU291cmNlIHtcclxuICBwdWJsaWMgb2w6IG9sU291cmNlSW1hZ2VXTVM7XHJcblxyXG4gIGdldCBwYXJhbXMoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMucGFyYW1zIGFzIGFueTtcclxuICB9XHJcblxyXG4gIGdldCBxdWVyeVRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKHRoaXMub3B0aW9ucyBhcyBhbnkpLnF1ZXJ5VGl0bGVcclxuICAgICAgPyAodGhpcy5vcHRpb25zIGFzIGFueSkucXVlcnlUaXRsZVxyXG4gICAgICA6ICd0aXRsZSc7XHJcbiAgfVxyXG5cclxuICBnZXQgcXVlcnlIdG1sVGFyZ2V0KCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKHRoaXMub3B0aW9ucyBhcyBhbnkpLnF1ZXJ5SHRtbFRhcmdldFxyXG4gICAgICA/ICh0aGlzLm9wdGlvbnMgYXMgYW55KS5xdWVyeUh0bWxUYXJnZXRcclxuICAgICAgOiBRdWVyeUh0bWxUYXJnZXQuQkxBTks7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBvcHRpb25zOiBXTVNEYXRhU291cmNlT3B0aW9ucyxcclxuICAgIHByb3RlY3RlZCB3ZnNTZXJ2aWNlOiBXRlNTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICAgIC8vIEltcG9ydGFudDogVG8gdXNlIHdtcyB2ZXJzaW9ucyBzbWFsbGVyIHRoYW4gMS4zLjAsIFNSU1xyXG4gICAgLy8gbmVlZHMgdG8gYmUgc3VwcGxpZWQgaW4gdGhlIHNvdXJjZSBcInBhcmFtc1wiXHJcblxyXG4gICAgLy8gV2UgbmVlZCB0byBkbyB0aGlzIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0IHZlcnNpb25cclxuICAgIC8vIG9mIG9wZW5sYXllcnMgd2hpY2ggaXMgdXBwZXJjYXNlXHJcbiAgICBjb25zdCBzb3VyY2VQYXJhbXM6IGFueSA9IG9wdGlvbnMucGFyYW1zO1xyXG4gICAgaWYgKHNvdXJjZVBhcmFtcyAmJiBzb3VyY2VQYXJhbXMudmVyc2lvbikge1xyXG4gICAgICBzb3VyY2VQYXJhbXMuVkVSU0lPTiA9IHNvdXJjZVBhcmFtcy52ZXJzaW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzb3VyY2VQYXJhbXMgJiYgc291cmNlUGFyYW1zLlZFUlNJT04pIHtcclxuICAgICAgaWYgKHNvdXJjZVBhcmFtcy52ZXJzaW9uICE9PSAnMS4zLjAnKSB7XHJcbiAgICAgICAgaWYgKCFzb3VyY2VQYXJhbXMuU1JTICYmICFzb3VyY2VQYXJhbXMuc3JzKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFlvdSBtdXN0IHNldCBhIFNSUyAob3Igc3JzKSBwYXJhbSBmb3IgeW91ciBXTVNcclxuICAgICAgICAgICAobGF5ZXIgPSAgYCArIHNvdXJjZVBhcmFtcy5sYXllcnMgKyBgKSBiZWNhdXNlIHlvdXIgd2FudCB0byB1c2UgYSBXTVMgdmVyc2lvbiB1bmRlciAxLjMuMFxyXG4gICAgICAgIEV4OiBcInNyc1wiOiBcIkVQU0c6Mzg1N1wiIGApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChzb3VyY2VQYXJhbXMgJiYgc291cmNlUGFyYW1zLklORk9fRk9STUFUKSB7XHJcbiAgICAgIHNvdXJjZVBhcmFtcy5pbmZvX2Zvcm1hdCA9IHNvdXJjZVBhcmFtcy5JTkZPX0ZPUk1BVDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0aW9ucy5yZWZyZXNoSW50ZXJ2YWxTZWMgJiYgb3B0aW9ucy5yZWZyZXNoSW50ZXJ2YWxTZWMgPiAwKSB7XHJcbiAgICAgIHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgfSwgb3B0aW9ucy5yZWZyZXNoSW50ZXJ2YWxTZWMgKiAxMDAwKTsgLy8gQ29udmVydCBzZWNvbmRzIHRvIE1TXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGZpZWxkTmFtZUdlb21ldHJ5ID0gZGVmYXVsdEZpZWxkTmFtZUdlb21ldHJ5O1xyXG5cclxuICAgIC8vICMjIyMgICBTVEFSVCBpZiBwYXJhbXNXRlNcclxuICAgIGlmIChvcHRpb25zLnBhcmFtc1dGUykge1xyXG4gICAgICBjb25zdCB3ZnNDaGVja3VwID0gY2hlY2tXZnNQYXJhbXMob3B0aW9ucywgJ3dtcycpO1xyXG4gICAgICBPYmplY3RVdGlscy5tZXJnZURlZXAob3B0aW9ucy5wYXJhbXNXRlMsIHdmc0NoZWNrdXAucGFyYW1zV0ZTKTtcclxuXHJcbiAgICAgIGZpZWxkTmFtZUdlb21ldHJ5ID0gb3B0aW9ucy5wYXJhbXNXRlMuZmllbGROYW1lR2VvbWV0cnkgfHwgZmllbGROYW1lR2VvbWV0cnk7XHJcblxyXG4gICAgICBvcHRpb25zLmRvd25sb2FkID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucy5kb3dubG9hZCwge1xyXG4gICAgICAgIGR5bmFtaWNVcmw6IHRoaXMuYnVpbGREeW5hbWljRG93bmxvYWRVcmxGcm9tUGFyYW1zV0ZTKG9wdGlvbnMpXHJcbiAgICAgIH0pO1xyXG4gICAgfSAvLyAgIyMjIyAgIEVORCAgaWYgcGFyYW1zV0ZTXHJcbiAgICBpZiAoIW9wdGlvbnMuc291cmNlRmllbGRzIHx8IG9wdGlvbnMuc291cmNlRmllbGRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBvcHRpb25zLnNvdXJjZUZpZWxkcyA9IFtdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb3B0aW9ucy5zb3VyY2VGaWVsZHMuZm9yRWFjaChzb3VyY2VGaWVsZCA9PiB7XHJcbiAgICAgICAgc291cmNlRmllbGQuYWxpYXMgPSBzb3VyY2VGaWVsZC5hbGlhcyA/IHNvdXJjZUZpZWxkLmFsaWFzIDogc291cmNlRmllbGQubmFtZTtcclxuICAgICAgICAvLyB0byBhbGxvdyBvbmx5IGEgbGlzdCBvZiBzb3VyY2VmaWVsZCB3aXRoIG5hbWVzXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaW5pdE9nY0ZpbHRlcnMgPSAob3B0aW9ucyBhcyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMpLm9nY0ZpbHRlcnM7XHJcbiAgICBjb25zdCBvZ2NGaWx0ZXJXcml0ZXIgPSBuZXcgT2djRmlsdGVyV3JpdGVyKCk7XHJcblxyXG4gICAgaWYgKCFpbml0T2djRmlsdGVycykge1xyXG4gICAgICAob3B0aW9ucyBhcyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMpLm9nY0ZpbHRlcnMgPVxyXG4gICAgICAgIG9nY0ZpbHRlcldyaXRlci5kZWZpbmVPZ2NGaWx0ZXJzRGVmYXVsdE9wdGlvbnMoaW5pdE9nY0ZpbHRlcnMsIGZpZWxkTmFtZUdlb21ldHJ5LCAnd21zJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpbml0T2djRmlsdGVycy5hZHZhbmNlZE9nY0ZpbHRlcnMgPSBpbml0T2djRmlsdGVycy5wdXNoQnV0dG9ucyA/IGZhbHNlIDogdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChzb3VyY2VQYXJhbXMubGF5ZXJzLnNwbGl0KCcsJykubGVuZ3RoID4gMSAmJiBvcHRpb25zICYmIGluaXRPZ2NGaWx0ZXJzLmVuYWJsZWQpIHtcclxuICAgICAgY29uc29sZS5sb2coJyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKionKTtcclxuICAgICAgY29uc29sZS5sb2coJ0JFIENBUkVGVUxMLCBZT1VSIFdNUyBMQVlFUlMgKCcgKyBzb3VyY2VQYXJhbXMubGF5ZXJzXHJcbiAgICAgICsgJykgTVVTVCBTSEFSRSBUSEUgU0FNRSBGSUVMRFMgVE8gQUxMT1cgb2djRmlsdGVycyBUTyBXT1JLICEhICcpO1xyXG4gICAgICBjb25zb2xlLmxvZygnKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKicpO1xyXG4gIH1cclxuXHJcbiAgICBpZiAob3B0aW9ucy5wYXJhbXNXRlMgJiYgaW5pdE9nY0ZpbHRlcnMuZW5hYmxlZCkge1xyXG4gICAgICB0aGlzLndmc1NlcnZpY2UuZ2V0U291cmNlRmllbGRzRnJvbVdGUyhvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmaWx0ZXJRdWVyeVN0cmluZyA9IG9nY0ZpbHRlcldyaXRlci5oYW5kbGVPZ2NGaWx0ZXJzQXBwbGllZFZhbHVlKG9wdGlvbnMsIGZpZWxkTmFtZUdlb21ldHJ5KTtcclxuICAgIHRoaXMub2wudXBkYXRlUGFyYW1zKHsgZmlsdGVyOiBmaWx0ZXJRdWVyeVN0cmluZyB9KTtcclxuICB9XHJcblxyXG4gIHJlZnJlc2goKSB7XHJcbiAgICB0aGlzLm9sLnVwZGF0ZVBhcmFtcyh7IGlnb1JlZnJlc2g6IE1hdGgucmFuZG9tKCkgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGJ1aWxkRHluYW1pY0Rvd25sb2FkVXJsRnJvbVBhcmFtc1dGUyhhc1dGU0RhdGFTb3VyY2VPcHRpb25zKSB7XHJcbiAgICBjb25zdCBxdWVyeVN0cmluZ1ZhbHVlcyA9IGZvcm1hdFdGU1F1ZXJ5U3RyaW5nKGFzV0ZTRGF0YVNvdXJjZU9wdGlvbnMpO1xyXG4gICAgY29uc3QgZG93bmxvYWRVcmwgPSBxdWVyeVN0cmluZ1ZhbHVlcy5maW5kKGYgPT4gZi5uYW1lID09PSAnZ2V0ZmVhdHVyZScpLnZhbHVlO1xyXG4gICAgcmV0dXJuIGRvd25sb2FkVXJsO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZU9sU291cmNlKCk6IG9sU291cmNlSW1hZ2VXTVMge1xyXG4gICAgcmV0dXJuIG5ldyBvbFNvdXJjZUltYWdlV01TKHRoaXMub3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBnZXRMZWdlbmQoc2NhbGU/OiBudW1iZXIpOiBEYXRhU291cmNlTGVnZW5kT3B0aW9uc1tdIHtcclxuICAgIGxldCBsZWdlbmQgPSBzdXBlci5nZXRMZWdlbmQoKTtcclxuICAgIGlmIChsZWdlbmQubGVuZ3RoID4gMCkge1xyXG4gICAgICByZXR1cm4gbGVnZW5kO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNvdXJjZVBhcmFtcyA9IHRoaXMucGFyYW1zO1xyXG5cclxuICAgIGxldCBsYXllcnMgPSBbXTtcclxuICAgIGlmIChzb3VyY2VQYXJhbXMubGF5ZXJzICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgbGF5ZXJzID0gc291cmNlUGFyYW1zLmxheWVycy5zcGxpdCgnLCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJhc2VVcmwgPSB0aGlzLm9wdGlvbnMudXJsLnJlcGxhY2UoL1xcPyQvLCAnJyk7XHJcbiAgICBjb25zdCBwYXJhbXMgPSBbXHJcbiAgICAgICdSRVFVRVNUPUdldExlZ2VuZEdyYXBoaWMnLFxyXG4gICAgICAnU0VSVklDRT13bXMnLFxyXG4gICAgICAnRk9STUFUPWltYWdlL3BuZycsXHJcbiAgICAgICdTTERfVkVSU0lPTj0xLjEuMCcsXHJcbiAgICAgIGBWRVJTSU9OPSR7c291cmNlUGFyYW1zLnZlcnNpb24gfHwgJzEuMy4wJ31gXHJcbiAgICBdO1xyXG4gICAgaWYgKHNjYWxlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcGFyYW1zLnB1c2goYFNDQUxFPSR7c2NhbGV9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVnZW5kID0gbGF5ZXJzLm1hcCgobGF5ZXI6IHN0cmluZykgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHVybDogYCR7YmFzZVVybH0/JHtwYXJhbXMuam9pbignJicpfSZMQVlFUj0ke2xheWVyfWAsXHJcbiAgICAgICAgdGl0bGU6IGxheWVycy5sZW5ndGggPiAxID8gbGF5ZXIgOiB1bmRlZmluZWRcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBsZWdlbmQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25VbndhdGNoKCkge31cclxufVxyXG4iXX0=