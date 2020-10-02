/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Cacheable } from 'ngx-cacheable';
import { WMSCapabilities, WMTSCapabilities } from 'ol/format';
import { optionsFromCapabilities } from 'ol/source/WMTS.js';
import olAttribution from 'ol/control/Attribution';
import { ObjectUtils } from '@igo2/utils';
import { getResolutionFromScale } from '../../map';
import { EsriStyleGenerator } from '../utils/esri-style-generator';
import { QueryFormat, QueryFormatMimeType } from '../../query/shared/query.enums';
import { TimeFilterType, TimeFilterStyle } from '../../filter/shared/time-filter.enum';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
/** @enum {string} */
var TypeCapabilities = {
    wms: 'wms',
    wmts: 'wmts',
};
export { TypeCapabilities };
var CapabilitiesService = /** @class */ (function () {
    function CapabilitiesService(http) {
        this.http = http;
        this.parsers = {
            wms: new WMSCapabilities(),
            wmts: new WMTSCapabilities()
        };
    }
    /**
     * @param {?} baseOptions
     * @return {?}
     */
    CapabilitiesService.prototype.getWMSOptions = /**
     * @param {?} baseOptions
     * @return {?}
     */
    function (baseOptions) {
        var _this = this;
        /** @type {?} */
        var url = baseOptions.url;
        /** @type {?} */
        var version = ((/** @type {?} */ (baseOptions.params))).VERSION;
        return this.getCapabilities('wms', url, version).pipe(map((/**
         * @param {?} capabilities
         * @return {?}
         */
        function (capabilities) {
            return capabilities
                ? _this.parseWMSOptions(baseOptions, capabilities)
                : undefined;
        })));
    };
    /**
     * @param {?} baseOptions
     * @return {?}
     */
    CapabilitiesService.prototype.getWMTSOptions = /**
     * @param {?} baseOptions
     * @return {?}
     */
    function (baseOptions) {
        var _this = this;
        /** @type {?} */
        var url = baseOptions.url;
        /** @type {?} */
        var version = baseOptions.version;
        /** @type {?} */
        var options = this.getCapabilities('wmts', url, version).pipe(map((/**
         * @param {?} capabilities
         * @return {?}
         */
        function (capabilities) {
            return capabilities
                ? _this.parseWMTSOptions(baseOptions, capabilities)
                : undefined;
        })));
        return options;
    };
    /**
     * @param {?} baseOptions
     * @return {?}
     */
    CapabilitiesService.prototype.getCartoOptions = /**
     * @param {?} baseOptions
     * @return {?}
     */
    function (baseOptions) {
        var _this = this;
        /** @type {?} */
        var baseUrl = 'https://' +
            baseOptions.account +
            '.carto.com/api/v2/viz/' +
            baseOptions.mapId +
            '/viz.json';
        return this.http
            .jsonp(baseUrl, 'callback')
            .pipe(map((/**
         * @param {?} cartoOptions
         * @return {?}
         */
        function (cartoOptions) {
            return _this.parseCartoOptions(baseOptions, cartoOptions);
        })));
    };
    /**
     * @param {?} baseOptions
     * @return {?}
     */
    CapabilitiesService.prototype.getArcgisOptions = /**
     * @param {?} baseOptions
     * @return {?}
     */
    function (baseOptions) {
        var _this = this;
        /** @type {?} */
        var baseUrl = baseOptions.url + '/' + baseOptions.layer + '?f=json';
        /** @type {?} */
        var modifiedUrl = baseOptions.url.replace('FeatureServer', 'MapServer');
        /** @type {?} */
        var legendUrl = modifiedUrl + '/legend?f=json';
        /** @type {?} */
        var arcgisOptions = this.http.get(baseUrl);
        /** @type {?} */
        var legend = this.http.get(legendUrl).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res; })), catchError((/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            console.log('No legend associated with this Feature Service');
            return of(err);
        })));
        return forkJoin([arcgisOptions, legend]).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            return _this.parseArcgisOptions(baseOptions, res[0], res[1]);
        })));
    };
    /**
     * @param {?} baseOptions
     * @return {?}
     */
    CapabilitiesService.prototype.getTileArcgisOptions = /**
     * @param {?} baseOptions
     * @return {?}
     */
    function (baseOptions) {
        var _this = this;
        /** @type {?} */
        var baseUrl = baseOptions.url + '/' + baseOptions.layer + '?f=json';
        /** @type {?} */
        var legendUrl = baseOptions.url + '/legend?f=json';
        /** @type {?} */
        var arcgisOptions = this.http.get(baseUrl);
        /** @type {?} */
        var legendInfo = this.http.get(legendUrl);
        return forkJoin([arcgisOptions, legendInfo]).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            return _this.parseTileArcgisOptions(baseOptions, res[0], res[1]);
        })));
    };
    /**
     * @param {?} service
     * @param {?} baseUrl
     * @param {?=} version
     * @return {?}
     */
    CapabilitiesService.prototype.getCapabilities = /**
     * @param {?} service
     * @param {?} baseUrl
     * @param {?=} version
     * @return {?}
     */
    function (service, baseUrl, version) {
        var _this = this;
        /** @type {?} */
        var params = new HttpParams({
            fromObject: {
                request: 'GetCapabilities',
                service: service.toUpperCase(),
                version: version || '1.3.0',
                _i: 'true'
            }
        });
        /** @type {?} */
        var request = this.http.get(baseUrl, {
            params: params,
            responseType: 'text'
        });
        return request.pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            try {
                return _this.parsers[service].read(res);
            }
            catch (e) {
                return undefined;
            }
        })), catchError((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            e.error.caught = true;
            throw e;
        })));
    };
    /**
     * @private
     * @param {?} baseOptions
     * @param {?} capabilities
     * @return {?}
     */
    CapabilitiesService.prototype.parseWMSOptions = /**
     * @private
     * @param {?} baseOptions
     * @param {?} capabilities
     * @return {?}
     */
    function (baseOptions, capabilities) {
        var e_1, _a;
        /** @type {?} */
        var layers = ((/** @type {?} */ (baseOptions.params))).LAYERS;
        /** @type {?} */
        var layer = this.findDataSourceInCapabilities(capabilities.Capability.Layer, layers);
        if (!layer) {
            throw {
                error: {
                    message: 'Layer not found'
                }
            };
        }
        /** @type {?} */
        var metadata = layer.DataURL ? layer.DataURL[0] : undefined;
        /** @type {?} */
        var abstract = layer.Abstract ? layer.Abstract : undefined;
        /** @type {?} */
        var keywordList = layer.KeywordList ? layer.KeywordList : undefined;
        /** @type {?} */
        var queryable = layer.queryable;
        /** @type {?} */
        var timeFilter = this.getTimeFilter(layer);
        /** @type {?} */
        var timeFilterable = timeFilter && Object.keys(timeFilter).length > 0;
        /** @type {?} */
        var legendOptions = layer.Style ? this.getStyle(layer.Style) : undefined;
        /** @type {?} */
        var queryFormat;
        /** @type {?} */
        var queryFormatMimeTypePriority = [
            QueryFormatMimeType.GEOJSON,
            QueryFormatMimeType.GEOJSON2,
            QueryFormatMimeType.GML3,
            QueryFormatMimeType.GML2,
            QueryFormatMimeType.JSON,
            QueryFormatMimeType.HTML
        ];
        var _loop_1 = function (mimeType) {
            if (capabilities.Capability.Request.GetFeatureInfo.Format.indexOf(mimeType) !== -1) {
                /** @type {?} */
                var keyEnum = Object.keys(QueryFormatMimeType).find((/**
                 * @param {?} key
                 * @return {?}
                 */
                function (key) { return QueryFormatMimeType[key] === mimeType; }));
                queryFormat = QueryFormat[keyEnum];
                return "break";
            }
        };
        try {
            for (var queryFormatMimeTypePriority_1 = tslib_1.__values(queryFormatMimeTypePriority), queryFormatMimeTypePriority_1_1 = queryFormatMimeTypePriority_1.next(); !queryFormatMimeTypePriority_1_1.done; queryFormatMimeTypePriority_1_1 = queryFormatMimeTypePriority_1.next()) {
                var mimeType = queryFormatMimeTypePriority_1_1.value;
                var state_1 = _loop_1(mimeType);
                if (state_1 === "break")
                    break;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (queryFormatMimeTypePriority_1_1 && !queryFormatMimeTypePriority_1_1.done && (_a = queryFormatMimeTypePriority_1.return)) _a.call(queryFormatMimeTypePriority_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (!queryFormat) {
            queryable = false;
        }
        /** @type {?} */
        var options = ObjectUtils.removeUndefined({
            _layerOptionsFromSource: {
                title: layer.Title,
                maxResolution: getResolutionFromScale(layer.MaxScaleDenominator),
                minResolution: getResolutionFromScale(layer.MinScaleDenominator),
                metadata: {
                    url: metadata ? metadata.OnlineResource : undefined,
                    extern: metadata ? true : undefined,
                    abstract: abstract,
                    keywordList: keywordList
                },
                legendOptions: legendOptions
            },
            queryable: queryable,
            queryFormat: queryFormat,
            timeFilter: timeFilterable ? timeFilter : undefined,
            timeFilterable: timeFilterable ? true : undefined
        });
        return ObjectUtils.mergeDeep(options, baseOptions);
    };
    /**
     * @private
     * @param {?} baseOptions
     * @param {?} capabilities
     * @return {?}
     */
    CapabilitiesService.prototype.parseWMTSOptions = /**
     * @private
     * @param {?} baseOptions
     * @param {?} capabilities
     * @return {?}
     */
    function (baseOptions, capabilities) {
        // Put Title source in _layerOptionsFromSource. (For source & catalog in _layerOptionsFromSource, if not already on config)
        /** @type {?} */
        var layer = capabilities.Contents.Layer.find((/**
         * @param {?} el
         * @return {?}
         */
        function (el) { return el.Identifier === baseOptions.layer; }));
        /** @type {?} */
        var options = optionsFromCapabilities(capabilities, baseOptions);
        /** @type {?} */
        var ouputOptions = Object.assign(options, baseOptions);
        /** @type {?} */
        var sourceOptions = ObjectUtils.removeUndefined({
            _layerOptionsFromSource: {
                title: layer.Title
            }
        });
        return ObjectUtils.mergeDeep(sourceOptions, ouputOptions);
    };
    /**
     * @private
     * @param {?} baseOptions
     * @param {?} cartoOptions
     * @return {?}
     */
    CapabilitiesService.prototype.parseCartoOptions = /**
     * @private
     * @param {?} baseOptions
     * @param {?} cartoOptions
     * @return {?}
     */
    function (baseOptions, cartoOptions) {
        /** @type {?} */
        var layers = [];
        /** @type {?} */
        var params = cartoOptions.layers[1].options.layer_definition;
        params.layers.forEach((/**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            layers.push({
                type: element.type.toLowerCase(),
                options: element.options,
                legend: element.legend
            });
        }));
        /** @type {?} */
        var options = ObjectUtils.removeUndefined({
            config: {
                version: params.version,
                layers: layers
            }
        });
        return ObjectUtils.mergeDeep(options, baseOptions);
    };
    /**
     * @private
     * @param {?} baseOptions
     * @param {?} arcgisOptions
     * @param {?=} legend
     * @return {?}
     */
    CapabilitiesService.prototype.parseArcgisOptions = /**
     * @private
     * @param {?} baseOptions
     * @param {?} arcgisOptions
     * @param {?=} legend
     * @return {?}
     */
    function (baseOptions, arcgisOptions, legend) {
        /** @type {?} */
        var legendInfo = legend.layers ? legend : undefined;
        /** @type {?} */
        var styleGenerator = new EsriStyleGenerator();
        /** @type {?} */
        var units = arcgisOptions.units === 'esriMeters' ? 'm' : 'degrees';
        /** @type {?} */
        var style = styleGenerator.generateStyle(arcgisOptions, units);
        /** @type {?} */
        var attributions = new olAttribution({
            html: arcgisOptions.copyrightText
        });
        /** @type {?} */
        var timeExtent;
        /** @type {?} */
        var timeFilter;
        if (arcgisOptions.timeInfo) {
            /** @type {?} */
            var time = arcgisOptions.timeInfo.timeExtent;
            timeExtent = time[0] + ',' + time[1];
            /** @type {?} */
            var min = new Date();
            min.setTime(time[0]);
            /** @type {?} */
            var max = new Date();
            max.setTime(time[1]);
            timeFilter = {
                min: min.toUTCString(),
                max: max.toUTCString(),
                range: true,
                type: TimeFilterType.DATETIME,
                style: TimeFilterStyle.CALENDAR
            };
        }
        /** @type {?} */
        var params = Object.assign({}, {
            legendInfo: legendInfo,
            style: style,
            timeFilter: timeFilter,
            timeExtent: timeExtent,
            attributions: attributions
        });
        /** @type {?} */
        var options = ObjectUtils.removeUndefined({
            params: params
        });
        return ObjectUtils.mergeDeep(options, baseOptions);
    };
    /**
     * @private
     * @param {?} baseOptions
     * @param {?} arcgisOptions
     * @param {?} legend
     * @return {?}
     */
    CapabilitiesService.prototype.parseTileArcgisOptions = /**
     * @private
     * @param {?} baseOptions
     * @param {?} arcgisOptions
     * @param {?} legend
     * @return {?}
     */
    function (baseOptions, arcgisOptions, legend) {
        /** @type {?} */
        var legendInfo = legend.layers ? legend : undefined;
        /** @type {?} */
        var attributions = new olAttribution({
            html: arcgisOptions.copyrightText
        });
        /** @type {?} */
        var timeExtent;
        /** @type {?} */
        var timeFilter;
        if (arcgisOptions.timeInfo) {
            /** @type {?} */
            var time = arcgisOptions.timeInfo.timeExtent;
            timeExtent = time[0] + ',' + time[1];
            /** @type {?} */
            var min = new Date();
            min.setTime(time[0]);
            /** @type {?} */
            var max = new Date();
            max.setTime(time[1]);
            timeFilter = {
                min: min.toUTCString(),
                max: max.toUTCString(),
                range: true,
                type: TimeFilterType.DATETIME,
                style: TimeFilterStyle.CALENDAR
            };
        }
        /** @type {?} */
        var params = Object.assign({}, {
            layers: 'show:' + baseOptions.layer,
            time: timeExtent
        });
        /** @type {?} */
        var options = ObjectUtils.removeUndefined({
            params: params,
            legendInfo: legendInfo,
            timeFilter: timeFilter,
            attributions: attributions
        });
        return ObjectUtils.mergeDeep(options, baseOptions);
    };
    /**
     * @private
     * @param {?} layerArray
     * @param {?} name
     * @return {?}
     */
    CapabilitiesService.prototype.findDataSourceInCapabilities = /**
     * @private
     * @param {?} layerArray
     * @param {?} name
     * @return {?}
     */
    function (layerArray, name) {
        var _this = this;
        if (Array.isArray(layerArray)) {
            /** @type {?} */
            var layer_1;
            layerArray.find((/**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                layer_1 = _this.findDataSourceInCapabilities(value, name);
                return layer_1 !== undefined;
            }), this);
            return layer_1;
        }
        else if (layerArray.Layer) {
            return this.findDataSourceInCapabilities(layerArray.Layer, name);
        }
        else {
            if (layerArray.Name && layerArray.Name === name) {
                return layerArray;
            }
            return undefined;
        }
    };
    /**
     * @param {?} layer
     * @return {?}
     */
    CapabilitiesService.prototype.getTimeFilter = /**
     * @param {?} layer
     * @return {?}
     */
    function (layer) {
        /** @type {?} */
        var dimension;
        if (layer.Dimension) {
            /** @type {?} */
            var timeFilter = {};
            dimension = layer.Dimension[0];
            if (dimension.values) {
                /** @type {?} */
                var minMaxDim = dimension.values.split('/');
                timeFilter.min = minMaxDim[0] !== undefined ? minMaxDim[0] : undefined;
                timeFilter.max = minMaxDim[1] !== undefined ? minMaxDim[1] : undefined;
                timeFilter.step = minMaxDim[2] !== undefined ? minMaxDim[2] : undefined;
            }
            if (dimension.default) {
                timeFilter.value = dimension.default;
            }
            return timeFilter;
        }
    };
    /**
     * @param {?} Style
     * @return {?}
     */
    CapabilitiesService.prototype.getStyle = /**
     * @param {?} Style
     * @return {?}
     */
    function (Style) {
        /** @type {?} */
        var styleOptions = Style.map((/**
         * @param {?} style
         * @return {?}
         */
        function (style) {
            return {
                name: style.Name,
                title: style.Title
            };
        }))
            // Handle repeat the style "default" in output  (MapServer or OpenLayer)
            .filter((/**
         * @param {?} item
         * @param {?} index
         * @param {?} self
         * @return {?}
         */
        function (item, index, self) {
            return self.findIndex((/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return i.name === item.name; })) ===
                index;
        }));
        /** @type {?} */
        var legendOptions = (/** @type {?} */ ({
            stylesAvailable: styleOptions
        }));
        return legendOptions;
    };
    CapabilitiesService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    CapabilitiesService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    /** @nocollapse */ CapabilitiesService.ngInjectableDef = i0.defineInjectable({ factory: function CapabilitiesService_Factory() { return new CapabilitiesService(i0.inject(i1.HttpClient)); }, token: CapabilitiesService, providedIn: "root" });
    tslib_1.__decorate([
        Cacheable({
            maxCacheCount: 20
        }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String, String, String]),
        tslib_1.__metadata("design:returntype", Observable)
    ], CapabilitiesService.prototype, "getCapabilities", null);
    return CapabilitiesService;
}());
export { CapabilitiesService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    CapabilitiesService.prototype.parsers;
    /**
     * @type {?}
     * @private
     */
    CapabilitiesService.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FwYWJpbGl0aWVzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvY2FwYWJpbGl0aWVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzlELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzVELE9BQU8sYUFBYSxNQUFNLHdCQUF3QixDQUFDO0FBRW5ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ25ELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ25FLE9BQU8sRUFDTCxXQUFXLEVBQ1gsbUJBQW1CLEVBQ3BCLE1BQU0sZ0NBQWdDLENBQUM7QUFheEMsT0FBTyxFQUNMLGNBQWMsRUFDZCxlQUFlLEVBQ2hCLE1BQU0sc0NBQXNDLENBQUM7Ozs7O0lBRzVDLEtBQU0sS0FBSztJQUNYLE1BQU8sTUFBTTs7O0FBS2Y7SUFTRSw2QkFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUw1QixZQUFPLEdBQUc7WUFDaEIsR0FBRyxFQUFF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QVM7Ozs7WUFBQyxVQUFDLENBQW1CLElBQUssT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQXBCLENBQW9CLEVBQUM7Z0JBQzdELEtBQUs7UUFETCxDQUNLLEVBQ1I7O1lBRUcsYUFBYSxHQUFrQixtQkFBQTtZQUNuQyxlQUFlLEVBQUUsWUFBWTtTQUM5QixFQUFpQjtRQUVsQixPQUFPLGFBQWEsQ0FBQztJQUN2QixDQUFDOztnQkEzWUYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkExQ1EsVUFBVTs7O0lBNklqQjtRQUhDLFNBQVMsQ0FBQztZQUNULGFBQWEsRUFBRSxFQUFFO1NBQ2xCLENBQUM7OztnREFLQyxVQUFVOzhEQTRCWjs4QkE5S0g7Q0FxYkMsQUE1WUQsSUE0WUM7U0F6WVksbUJBQW1COzs7Ozs7SUFDOUIsc0NBR0U7Ozs7O0lBRVUsbUNBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBmb3JrSm9pbiwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwLCBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBDYWNoZWFibGUgfSBmcm9tICduZ3gtY2FjaGVhYmxlJztcclxuXHJcbmltcG9ydCB7IFdNU0NhcGFiaWxpdGllcywgV01UU0NhcGFiaWxpdGllcyB9IGZyb20gJ29sL2Zvcm1hdCc7XHJcbmltcG9ydCB7IG9wdGlvbnNGcm9tQ2FwYWJpbGl0aWVzIH0gZnJvbSAnb2wvc291cmNlL1dNVFMuanMnO1xyXG5pbXBvcnQgb2xBdHRyaWJ1dGlvbiBmcm9tICdvbC9jb250cm9sL0F0dHJpYnV0aW9uJztcclxuXHJcbmltcG9ydCB7IE9iamVjdFV0aWxzIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5pbXBvcnQgeyBnZXRSZXNvbHV0aW9uRnJvbVNjYWxlIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuaW1wb3J0IHsgRXNyaVN0eWxlR2VuZXJhdG9yIH0gZnJvbSAnLi4vdXRpbHMvZXNyaS1zdHlsZS1nZW5lcmF0b3InO1xyXG5pbXBvcnQge1xyXG4gIFF1ZXJ5Rm9ybWF0LFxyXG4gIFF1ZXJ5Rm9ybWF0TWltZVR5cGVcclxufSBmcm9tICcuLi8uLi9xdWVyeS9zaGFyZWQvcXVlcnkuZW51bXMnO1xyXG5cclxuaW1wb3J0IHtcclxuICBXTVRTRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgV01TRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgQ2FydG9EYXRhU291cmNlT3B0aW9ucyxcclxuICBBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9uc1xyXG59IGZyb20gJy4vZGF0YXNvdXJjZXMnO1xyXG5pbXBvcnQge1xyXG4gIExlZ2VuZE9wdGlvbnMsXHJcbiAgSXRlbVN0eWxlT3B0aW9uc1xyXG59IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvbGF5ZXIuaW50ZXJmYWNlJztcclxuaW1wb3J0IHtcclxuICBUaW1lRmlsdGVyVHlwZSxcclxuICBUaW1lRmlsdGVyU3R5bGVcclxufSBmcm9tICcuLi8uLi9maWx0ZXIvc2hhcmVkL3RpbWUtZmlsdGVyLmVudW0nO1xyXG5cclxuZXhwb3J0IGVudW0gVHlwZUNhcGFiaWxpdGllcyB7XHJcbiAgd21zID0gJ3dtcycsXHJcbiAgd210cyA9ICd3bXRzJ1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBUeXBlQ2FwYWJpbGl0aWVzU3RyaW5ncyA9IGtleW9mIHR5cGVvZiBUeXBlQ2FwYWJpbGl0aWVzO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2FwYWJpbGl0aWVzU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBwYXJzZXJzID0ge1xyXG4gICAgd21zOiBuZXcgV01TQ2FwYWJpbGl0aWVzKCksXHJcbiAgICB3bXRzOiBuZXcgV01UU0NhcGFiaWxpdGllcygpXHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7fVxyXG5cclxuICBnZXRXTVNPcHRpb25zKFxyXG4gICAgYmFzZU9wdGlvbnM6IFdNU0RhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxXTVNEYXRhU291cmNlT3B0aW9ucz4ge1xyXG4gICAgY29uc3QgdXJsID0gYmFzZU9wdGlvbnMudXJsO1xyXG4gICAgY29uc3QgdmVyc2lvbiA9IChiYXNlT3B0aW9ucy5wYXJhbXMgYXMgYW55KS5WRVJTSU9OO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmdldENhcGFiaWxpdGllcygnd21zJywgdXJsLCB2ZXJzaW9uKS5waXBlKFxyXG4gICAgICBtYXAoKGNhcGFiaWxpdGllczogYW55KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllc1xyXG4gICAgICAgICAgPyB0aGlzLnBhcnNlV01TT3B0aW9ucyhiYXNlT3B0aW9ucywgY2FwYWJpbGl0aWVzKVxyXG4gICAgICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0V01UU09wdGlvbnMoXHJcbiAgICBiYXNlT3B0aW9uczogV01UU0RhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxXTVRTRGF0YVNvdXJjZU9wdGlvbnM+IHtcclxuICAgIGNvbnN0IHVybCA9IGJhc2VPcHRpb25zLnVybDtcclxuICAgIGNvbnN0IHZlcnNpb24gPSBiYXNlT3B0aW9ucy52ZXJzaW9uO1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmdldENhcGFiaWxpdGllcygnd210cycsIHVybCwgdmVyc2lvbikucGlwZShcclxuICAgICAgbWFwKChjYXBhYmlsaXRpZXM6IGFueSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBjYXBhYmlsaXRpZXNcclxuICAgICAgICAgID8gdGhpcy5wYXJzZVdNVFNPcHRpb25zKGJhc2VPcHRpb25zLCBjYXBhYmlsaXRpZXMpXHJcbiAgICAgICAgICA6IHVuZGVmaW5lZDtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgfVxyXG5cclxuICBnZXRDYXJ0b09wdGlvbnMoXHJcbiAgICBiYXNlT3B0aW9uczogQ2FydG9EYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8Q2FydG9EYXRhU291cmNlT3B0aW9ucz4ge1xyXG4gICAgY29uc3QgYmFzZVVybCA9XHJcbiAgICAgICdodHRwczovLycgK1xyXG4gICAgICBiYXNlT3B0aW9ucy5hY2NvdW50ICtcclxuICAgICAgJy5jYXJ0by5jb20vYXBpL3YyL3Zpei8nICtcclxuICAgICAgYmFzZU9wdGlvbnMubWFwSWQgK1xyXG4gICAgICAnL3Zpei5qc29uJztcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5qc29ucChiYXNlVXJsLCAnY2FsbGJhY2snKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoKGNhcnRvT3B0aW9uczogYW55KSA9PlxyXG4gICAgICAgICAgdGhpcy5wYXJzZUNhcnRvT3B0aW9ucyhiYXNlT3B0aW9ucywgY2FydG9PcHRpb25zKVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIGdldEFyY2dpc09wdGlvbnMoXHJcbiAgICBiYXNlT3B0aW9uczogQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnM+IHtcclxuICAgIGNvbnN0IGJhc2VVcmwgPSBiYXNlT3B0aW9ucy51cmwgKyAnLycgKyBiYXNlT3B0aW9ucy5sYXllciArICc/Zj1qc29uJztcclxuICAgIGNvbnN0IG1vZGlmaWVkVXJsID0gYmFzZU9wdGlvbnMudXJsLnJlcGxhY2UoJ0ZlYXR1cmVTZXJ2ZXInLCAnTWFwU2VydmVyJyk7XHJcbiAgICBjb25zdCBsZWdlbmRVcmwgPSBtb2RpZmllZFVybCArICcvbGVnZW5kP2Y9anNvbic7XHJcbiAgICBjb25zdCBhcmNnaXNPcHRpb25zID0gdGhpcy5odHRwLmdldChiYXNlVXJsKTtcclxuICAgIGNvbnN0IGxlZ2VuZCA9IHRoaXMuaHR0cC5nZXQobGVnZW5kVXJsKS5waXBlKFxyXG4gICAgICBtYXAoKHJlczogYW55KSA9PiByZXMpLFxyXG4gICAgICBjYXRjaEVycm9yKGVyciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ05vIGxlZ2VuZCBhc3NvY2lhdGVkIHdpdGggdGhpcyBGZWF0dXJlIFNlcnZpY2UnKTtcclxuICAgICAgICByZXR1cm4gb2YoZXJyKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgICByZXR1cm4gZm9ya0pvaW4oW2FyY2dpc09wdGlvbnMsIGxlZ2VuZF0pLnBpcGUoXHJcbiAgICAgIG1hcCgocmVzOiBhbnkpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZUFyY2dpc09wdGlvbnMoYmFzZU9wdGlvbnMsIHJlc1swXSwgcmVzWzFdKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXRUaWxlQXJjZ2lzT3B0aW9ucyhcclxuICAgIGJhc2VPcHRpb25zOiBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zPiB7XHJcbiAgICBjb25zdCBiYXNlVXJsID0gYmFzZU9wdGlvbnMudXJsICsgJy8nICsgYmFzZU9wdGlvbnMubGF5ZXIgKyAnP2Y9anNvbic7XHJcbiAgICBjb25zdCBsZWdlbmRVcmwgPSBiYXNlT3B0aW9ucy51cmwgKyAnL2xlZ2VuZD9mPWpzb24nO1xyXG4gICAgY29uc3QgYXJjZ2lzT3B0aW9ucyA9IHRoaXMuaHR0cC5nZXQoYmFzZVVybCk7XHJcbiAgICBjb25zdCBsZWdlbmRJbmZvID0gdGhpcy5odHRwLmdldChsZWdlbmRVcmwpO1xyXG5cclxuICAgIHJldHVybiBmb3JrSm9pbihbYXJjZ2lzT3B0aW9ucywgbGVnZW5kSW5mb10pLnBpcGUoXHJcbiAgICAgIG1hcCgocmVzOiBhbnkpID0+XHJcbiAgICAgICAgdGhpcy5wYXJzZVRpbGVBcmNnaXNPcHRpb25zKGJhc2VPcHRpb25zLCByZXNbMF0sIHJlc1sxXSlcclxuICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIEBDYWNoZWFibGUoe1xyXG4gICAgbWF4Q2FjaGVDb3VudDogMjBcclxuICB9KVxyXG4gIGdldENhcGFiaWxpdGllcyhcclxuICAgIHNlcnZpY2U6IFR5cGVDYXBhYmlsaXRpZXNTdHJpbmdzLFxyXG4gICAgYmFzZVVybDogc3RyaW5nLFxyXG4gICAgdmVyc2lvbj86IHN0cmluZ1xyXG4gICk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBjb25zdCBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcyh7XHJcbiAgICAgIGZyb21PYmplY3Q6IHtcclxuICAgICAgICByZXF1ZXN0OiAnR2V0Q2FwYWJpbGl0aWVzJyxcclxuICAgICAgICBzZXJ2aWNlOiBzZXJ2aWNlLnRvVXBwZXJDYXNlKCksXHJcbiAgICAgICAgdmVyc2lvbjogdmVyc2lvbiB8fCAnMS4zLjAnLFxyXG4gICAgICAgIF9pOiAndHJ1ZSdcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgcmVxdWVzdCA9IHRoaXMuaHR0cC5nZXQoYmFzZVVybCwge1xyXG4gICAgICBwYXJhbXMsXHJcbiAgICAgIHJlc3BvbnNlVHlwZTogJ3RleHQnXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVxdWVzdC5waXBlKFxyXG4gICAgICBtYXAocmVzID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2Vyc1tzZXJ2aWNlXS5yZWFkKHJlcyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgIH0pLFxyXG4gICAgICBjYXRjaEVycm9yKGUgPT4ge1xyXG4gICAgICAgIGUuZXJyb3IuY2F1Z2h0ID0gdHJ1ZTtcclxuICAgICAgICB0aHJvdyBlO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcGFyc2VXTVNPcHRpb25zKFxyXG4gICAgYmFzZU9wdGlvbnM6IFdNU0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gICAgY2FwYWJpbGl0aWVzOiBhbnlcclxuICApOiBXTVNEYXRhU291cmNlT3B0aW9ucyB7XHJcbiAgICBjb25zdCBsYXllcnMgPSAoYmFzZU9wdGlvbnMucGFyYW1zIGFzIGFueSkuTEFZRVJTO1xyXG4gICAgY29uc3QgbGF5ZXIgPSB0aGlzLmZpbmREYXRhU291cmNlSW5DYXBhYmlsaXRpZXMoXHJcbiAgICAgIGNhcGFiaWxpdGllcy5DYXBhYmlsaXR5LkxheWVyLFxyXG4gICAgICBsYXllcnNcclxuICAgICk7XHJcblxyXG4gICAgaWYgKCFsYXllcikge1xyXG4gICAgICB0aHJvdyB7XHJcbiAgICAgICAgZXJyb3I6IHtcclxuICAgICAgICAgIG1lc3NhZ2U6ICdMYXllciBub3QgZm91bmQnXHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgY29uc3QgbWV0YWRhdGEgPSBsYXllci5EYXRhVVJMID8gbGF5ZXIuRGF0YVVSTFswXSA6IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IGFic3RyYWN0ID0gbGF5ZXIuQWJzdHJhY3QgPyBsYXllci5BYnN0cmFjdCA6IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IGtleXdvcmRMaXN0ID0gbGF5ZXIuS2V5d29yZExpc3QgPyBsYXllci5LZXl3b3JkTGlzdCA6IHVuZGVmaW5lZDtcclxuICAgIGxldCBxdWVyeWFibGUgPSBsYXllci5xdWVyeWFibGU7XHJcbiAgICBjb25zdCB0aW1lRmlsdGVyID0gdGhpcy5nZXRUaW1lRmlsdGVyKGxheWVyKTtcclxuICAgIGNvbnN0IHRpbWVGaWx0ZXJhYmxlID0gdGltZUZpbHRlciAmJiBPYmplY3Qua2V5cyh0aW1lRmlsdGVyKS5sZW5ndGggPiAwO1xyXG4gICAgY29uc3QgbGVnZW5kT3B0aW9ucyA9IGxheWVyLlN0eWxlID8gdGhpcy5nZXRTdHlsZShsYXllci5TdHlsZSkgOiB1bmRlZmluZWQ7XHJcblxyXG4gICAgbGV0IHF1ZXJ5Rm9ybWF0OiBRdWVyeUZvcm1hdDtcclxuICAgIGNvbnN0IHF1ZXJ5Rm9ybWF0TWltZVR5cGVQcmlvcml0eSA9IFtcclxuICAgICAgUXVlcnlGb3JtYXRNaW1lVHlwZS5HRU9KU09OLFxyXG4gICAgICBRdWVyeUZvcm1hdE1pbWVUeXBlLkdFT0pTT04yLFxyXG4gICAgICBRdWVyeUZvcm1hdE1pbWVUeXBlLkdNTDMsXHJcbiAgICAgIFF1ZXJ5Rm9ybWF0TWltZVR5cGUuR01MMixcclxuICAgICAgUXVlcnlGb3JtYXRNaW1lVHlwZS5KU09OLFxyXG4gICAgICBRdWVyeUZvcm1hdE1pbWVUeXBlLkhUTUxcclxuICAgIF07XHJcblxyXG4gICAgZm9yIChjb25zdCBtaW1lVHlwZSBvZiBxdWVyeUZvcm1hdE1pbWVUeXBlUHJpb3JpdHkpIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIGNhcGFiaWxpdGllcy5DYXBhYmlsaXR5LlJlcXVlc3QuR2V0RmVhdHVyZUluZm8uRm9ybWF0LmluZGV4T2YoXHJcbiAgICAgICAgICBtaW1lVHlwZVxyXG4gICAgICAgICkgIT09IC0xXHJcbiAgICAgICkge1xyXG4gICAgICAgIGNvbnN0IGtleUVudW0gPSBPYmplY3Qua2V5cyhRdWVyeUZvcm1hdE1pbWVUeXBlKS5maW5kKFxyXG4gICAgICAgICAga2V5ID0+IFF1ZXJ5Rm9ybWF0TWltZVR5cGVba2V5XSA9PT0gbWltZVR5cGVcclxuICAgICAgICApO1xyXG4gICAgICAgIHF1ZXJ5Rm9ybWF0ID0gUXVlcnlGb3JtYXRba2V5RW51bV07XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICghcXVlcnlGb3JtYXQpIHtcclxuICAgICAgcXVlcnlhYmxlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb3B0aW9uczogV01TRGF0YVNvdXJjZU9wdGlvbnMgPSBPYmplY3RVdGlscy5yZW1vdmVVbmRlZmluZWQoe1xyXG4gICAgICBfbGF5ZXJPcHRpb25zRnJvbVNvdXJjZToge1xyXG4gICAgICAgIHRpdGxlOiBsYXllci5UaXRsZSxcclxuICAgICAgICBtYXhSZXNvbHV0aW9uOiBnZXRSZXNvbHV0aW9uRnJvbVNjYWxlKGxheWVyLk1heFNjYWxlRGVub21pbmF0b3IpLFxyXG4gICAgICAgIG1pblJlc29sdXRpb246IGdldFJlc29sdXRpb25Gcm9tU2NhbGUobGF5ZXIuTWluU2NhbGVEZW5vbWluYXRvciksXHJcbiAgICAgICAgbWV0YWRhdGE6IHtcclxuICAgICAgICAgIHVybDogbWV0YWRhdGEgPyBtZXRhZGF0YS5PbmxpbmVSZXNvdXJjZSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgIGV4dGVybjogbWV0YWRhdGEgPyB0cnVlIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgYWJzdHJhY3QsXHJcbiAgICAgICAgICBrZXl3b3JkTGlzdFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGVnZW5kT3B0aW9uc1xyXG4gICAgICB9LFxyXG4gICAgICBxdWVyeWFibGUsXHJcbiAgICAgIHF1ZXJ5Rm9ybWF0LFxyXG4gICAgICB0aW1lRmlsdGVyOiB0aW1lRmlsdGVyYWJsZSA/IHRpbWVGaWx0ZXIgOiB1bmRlZmluZWQsXHJcbiAgICAgIHRpbWVGaWx0ZXJhYmxlOiB0aW1lRmlsdGVyYWJsZSA/IHRydWUgOiB1bmRlZmluZWRcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBPYmplY3RVdGlscy5tZXJnZURlZXAob3B0aW9ucywgYmFzZU9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwYXJzZVdNVFNPcHRpb25zKFxyXG4gICAgYmFzZU9wdGlvbnM6IFdNVFNEYXRhU291cmNlT3B0aW9ucyxcclxuICAgIGNhcGFiaWxpdGllczogYW55XHJcbiAgKTogV01UU0RhdGFTb3VyY2VPcHRpb25zIHtcclxuXHJcbiAgICAvLyBQdXQgVGl0bGUgc291cmNlIGluIF9sYXllck9wdGlvbnNGcm9tU291cmNlLiAoRm9yIHNvdXJjZSAmIGNhdGFsb2cgaW4gX2xheWVyT3B0aW9uc0Zyb21Tb3VyY2UsIGlmIG5vdCBhbHJlYWR5IG9uIGNvbmZpZylcclxuICAgIGNvbnN0IGxheWVyID0gY2FwYWJpbGl0aWVzLkNvbnRlbnRzLkxheWVyLmZpbmQoZWwgPT4gZWwuSWRlbnRpZmllciA9PT0gYmFzZU9wdGlvbnMubGF5ZXIpO1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSBvcHRpb25zRnJvbUNhcGFiaWxpdGllcyhjYXBhYmlsaXRpZXMsIGJhc2VPcHRpb25zKTtcclxuXHJcbiAgICBjb25zdCBvdXB1dE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKG9wdGlvbnMsIGJhc2VPcHRpb25zKTtcclxuICAgIGNvbnN0IHNvdXJjZU9wdGlvbnMgPSBPYmplY3RVdGlscy5yZW1vdmVVbmRlZmluZWQoe1xyXG4gICAgICBfbGF5ZXJPcHRpb25zRnJvbVNvdXJjZToge1xyXG4gICAgICAgIHRpdGxlOiBsYXllci5UaXRsZX19KTtcclxuXHJcbiAgICByZXR1cm4gT2JqZWN0VXRpbHMubWVyZ2VEZWVwKHNvdXJjZU9wdGlvbnMsIG91cHV0T3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHBhcnNlQ2FydG9PcHRpb25zKFxyXG4gICAgYmFzZU9wdGlvbnM6IENhcnRvRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgICBjYXJ0b09wdGlvbnM6IGFueVxyXG4gICk6IENhcnRvRGF0YVNvdXJjZU9wdGlvbnMge1xyXG4gICAgY29uc3QgbGF5ZXJzID0gW107XHJcbiAgICBjb25zdCBwYXJhbXMgPSBjYXJ0b09wdGlvbnMubGF5ZXJzWzFdLm9wdGlvbnMubGF5ZXJfZGVmaW5pdGlvbjtcclxuICAgIHBhcmFtcy5sYXllcnMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgbGF5ZXJzLnB1c2goe1xyXG4gICAgICAgIHR5cGU6IGVsZW1lbnQudHlwZS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICAgIG9wdGlvbnM6IGVsZW1lbnQub3B0aW9ucyxcclxuICAgICAgICBsZWdlbmQ6IGVsZW1lbnQubGVnZW5kXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBjb25zdCBvcHRpb25zID0gT2JqZWN0VXRpbHMucmVtb3ZlVW5kZWZpbmVkKHtcclxuICAgICAgY29uZmlnOiB7XHJcbiAgICAgICAgdmVyc2lvbjogcGFyYW1zLnZlcnNpb24sXHJcbiAgICAgICAgbGF5ZXJzXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIE9iamVjdFV0aWxzLm1lcmdlRGVlcChvcHRpb25zLCBiYXNlT3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHBhcnNlQXJjZ2lzT3B0aW9ucyhcclxuICAgIGJhc2VPcHRpb25zOiBBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgICBhcmNnaXNPcHRpb25zOiBhbnksXHJcbiAgICBsZWdlbmQ/OiBhbnlcclxuICApOiBBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnMge1xyXG4gICAgY29uc3QgbGVnZW5kSW5mbyA9IGxlZ2VuZC5sYXllcnMgPyBsZWdlbmQgOiB1bmRlZmluZWQ7XHJcbiAgICBjb25zdCBzdHlsZUdlbmVyYXRvciA9IG5ldyBFc3JpU3R5bGVHZW5lcmF0b3IoKTtcclxuICAgIGNvbnN0IHVuaXRzID0gYXJjZ2lzT3B0aW9ucy51bml0cyA9PT0gJ2VzcmlNZXRlcnMnID8gJ20nIDogJ2RlZ3JlZXMnO1xyXG4gICAgY29uc3Qgc3R5bGUgPSBzdHlsZUdlbmVyYXRvci5nZW5lcmF0ZVN0eWxlKGFyY2dpc09wdGlvbnMsIHVuaXRzKTtcclxuICAgIGNvbnN0IGF0dHJpYnV0aW9ucyA9IG5ldyBvbEF0dHJpYnV0aW9uKHtcclxuICAgICAgaHRtbDogYXJjZ2lzT3B0aW9ucy5jb3B5cmlnaHRUZXh0XHJcbiAgICB9KTtcclxuICAgIGxldCB0aW1lRXh0ZW50O1xyXG4gICAgbGV0IHRpbWVGaWx0ZXI7XHJcbiAgICBpZiAoYXJjZ2lzT3B0aW9ucy50aW1lSW5mbykge1xyXG4gICAgICBjb25zdCB0aW1lID0gYXJjZ2lzT3B0aW9ucy50aW1lSW5mby50aW1lRXh0ZW50O1xyXG4gICAgICB0aW1lRXh0ZW50ID0gdGltZVswXSArICcsJyArIHRpbWVbMV07XHJcbiAgICAgIGNvbnN0IG1pbiA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIG1pbi5zZXRUaW1lKHRpbWVbMF0pO1xyXG4gICAgICBjb25zdCBtYXggPSBuZXcgRGF0ZSgpO1xyXG4gICAgICBtYXguc2V0VGltZSh0aW1lWzFdKTtcclxuICAgICAgdGltZUZpbHRlciA9IHtcclxuICAgICAgICBtaW46IG1pbi50b1VUQ1N0cmluZygpLFxyXG4gICAgICAgIG1heDogbWF4LnRvVVRDU3RyaW5nKCksXHJcbiAgICAgICAgcmFuZ2U6IHRydWUsXHJcbiAgICAgICAgdHlwZTogVGltZUZpbHRlclR5cGUuREFURVRJTUUsXHJcbiAgICAgICAgc3R5bGU6IFRpbWVGaWx0ZXJTdHlsZS5DQUxFTkRBUlxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmFzc2lnbihcclxuICAgICAge30sXHJcbiAgICAgIHtcclxuICAgICAgICBsZWdlbmRJbmZvLFxyXG4gICAgICAgIHN0eWxlLFxyXG4gICAgICAgIHRpbWVGaWx0ZXIsXHJcbiAgICAgICAgdGltZUV4dGVudCxcclxuICAgICAgICBhdHRyaWJ1dGlvbnNcclxuICAgICAgfVxyXG4gICAgKTtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSBPYmplY3RVdGlscy5yZW1vdmVVbmRlZmluZWQoe1xyXG4gICAgICBwYXJhbXNcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIE9iamVjdFV0aWxzLm1lcmdlRGVlcChvcHRpb25zLCBiYXNlT3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHBhcnNlVGlsZUFyY2dpc09wdGlvbnMoXHJcbiAgICBiYXNlT3B0aW9uczogVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9ucyxcclxuICAgIGFyY2dpc09wdGlvbnM6IGFueSxcclxuICAgIGxlZ2VuZDogYW55XHJcbiAgKTogVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9ucyB7XHJcbiAgICBjb25zdCBsZWdlbmRJbmZvID0gbGVnZW5kLmxheWVycyA/IGxlZ2VuZCA6IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IGF0dHJpYnV0aW9ucyA9IG5ldyBvbEF0dHJpYnV0aW9uKHtcclxuICAgICAgaHRtbDogYXJjZ2lzT3B0aW9ucy5jb3B5cmlnaHRUZXh0XHJcbiAgICB9KTtcclxuICAgIGxldCB0aW1lRXh0ZW50O1xyXG4gICAgbGV0IHRpbWVGaWx0ZXI7XHJcbiAgICBpZiAoYXJjZ2lzT3B0aW9ucy50aW1lSW5mbykge1xyXG4gICAgICBjb25zdCB0aW1lID0gYXJjZ2lzT3B0aW9ucy50aW1lSW5mby50aW1lRXh0ZW50O1xyXG4gICAgICB0aW1lRXh0ZW50ID0gdGltZVswXSArICcsJyArIHRpbWVbMV07XHJcbiAgICAgIGNvbnN0IG1pbiA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIG1pbi5zZXRUaW1lKHRpbWVbMF0pO1xyXG4gICAgICBjb25zdCBtYXggPSBuZXcgRGF0ZSgpO1xyXG4gICAgICBtYXguc2V0VGltZSh0aW1lWzFdKTtcclxuICAgICAgdGltZUZpbHRlciA9IHtcclxuICAgICAgICBtaW46IG1pbi50b1VUQ1N0cmluZygpLFxyXG4gICAgICAgIG1heDogbWF4LnRvVVRDU3RyaW5nKCksXHJcbiAgICAgICAgcmFuZ2U6IHRydWUsXHJcbiAgICAgICAgdHlwZTogVGltZUZpbHRlclR5cGUuREFURVRJTUUsXHJcbiAgICAgICAgc3R5bGU6IFRpbWVGaWx0ZXJTdHlsZS5DQUxFTkRBUlxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmFzc2lnbihcclxuICAgICAge30sXHJcbiAgICAgIHtcclxuICAgICAgICBsYXllcnM6ICdzaG93OicgKyBiYXNlT3B0aW9ucy5sYXllcixcclxuICAgICAgICB0aW1lOiB0aW1lRXh0ZW50XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgICBjb25zdCBvcHRpb25zID0gT2JqZWN0VXRpbHMucmVtb3ZlVW5kZWZpbmVkKHtcclxuICAgICAgcGFyYW1zLFxyXG4gICAgICBsZWdlbmRJbmZvLFxyXG4gICAgICB0aW1lRmlsdGVyLFxyXG4gICAgICBhdHRyaWJ1dGlvbnNcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIE9iamVjdFV0aWxzLm1lcmdlRGVlcChvcHRpb25zLCBiYXNlT3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZpbmREYXRhU291cmNlSW5DYXBhYmlsaXRpZXMobGF5ZXJBcnJheSwgbmFtZSk6IGFueSB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShsYXllckFycmF5KSkge1xyXG4gICAgICBsZXQgbGF5ZXI7XHJcbiAgICAgIGxheWVyQXJyYXkuZmluZCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgbGF5ZXIgPSB0aGlzLmZpbmREYXRhU291cmNlSW5DYXBhYmlsaXRpZXModmFsdWUsIG5hbWUpO1xyXG4gICAgICAgIHJldHVybiBsYXllciAhPT0gdW5kZWZpbmVkO1xyXG4gICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgIHJldHVybiBsYXllcjtcclxuICAgIH0gZWxzZSBpZiAobGF5ZXJBcnJheS5MYXllcikge1xyXG4gICAgICByZXR1cm4gdGhpcy5maW5kRGF0YVNvdXJjZUluQ2FwYWJpbGl0aWVzKGxheWVyQXJyYXkuTGF5ZXIsIG5hbWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGxheWVyQXJyYXkuTmFtZSAmJiBsYXllckFycmF5Lk5hbWUgPT09IG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gbGF5ZXJBcnJheTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0VGltZUZpbHRlcihsYXllcikge1xyXG4gICAgbGV0IGRpbWVuc2lvbjtcclxuXHJcbiAgICBpZiAobGF5ZXIuRGltZW5zaW9uKSB7XHJcbiAgICAgIGNvbnN0IHRpbWVGaWx0ZXI6IGFueSA9IHt9O1xyXG4gICAgICBkaW1lbnNpb24gPSBsYXllci5EaW1lbnNpb25bMF07XHJcblxyXG4gICAgICBpZiAoZGltZW5zaW9uLnZhbHVlcykge1xyXG4gICAgICAgIGNvbnN0IG1pbk1heERpbSA9IGRpbWVuc2lvbi52YWx1ZXMuc3BsaXQoJy8nKTtcclxuICAgICAgICB0aW1lRmlsdGVyLm1pbiA9IG1pbk1heERpbVswXSAhPT0gdW5kZWZpbmVkID8gbWluTWF4RGltWzBdIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIHRpbWVGaWx0ZXIubWF4ID0gbWluTWF4RGltWzFdICE9PSB1bmRlZmluZWQgPyBtaW5NYXhEaW1bMV0gOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGltZUZpbHRlci5zdGVwID0gbWluTWF4RGltWzJdICE9PSB1bmRlZmluZWQgPyBtaW5NYXhEaW1bMl0gOiB1bmRlZmluZWQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkaW1lbnNpb24uZGVmYXVsdCkge1xyXG4gICAgICAgIHRpbWVGaWx0ZXIudmFsdWUgPSBkaW1lbnNpb24uZGVmYXVsdDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGltZUZpbHRlcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFN0eWxlKFN0eWxlKTogTGVnZW5kT3B0aW9ucyB7XHJcbiAgICBjb25zdCBzdHlsZU9wdGlvbnM6IEl0ZW1TdHlsZU9wdGlvbnNbXSA9IFN0eWxlLm1hcChzdHlsZSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogc3R5bGUuTmFtZSxcclxuICAgICAgICB0aXRsZTogc3R5bGUuVGl0bGVcclxuICAgICAgfTtcclxuICAgIH0pXHJcbiAgICAgIC8vIEhhbmRsZSByZXBlYXQgdGhlIHN0eWxlIFwiZGVmYXVsdFwiIGluIG91dHB1dCAgKE1hcFNlcnZlciBvciBPcGVuTGF5ZXIpXHJcbiAgICAgIC5maWx0ZXIoXHJcbiAgICAgICAgKGl0ZW0sIGluZGV4LCBzZWxmKSA9PlxyXG4gICAgICAgICAgc2VsZi5maW5kSW5kZXgoKGk6IEl0ZW1TdHlsZU9wdGlvbnMpID0+IGkubmFtZSA9PT0gaXRlbS5uYW1lKSA9PT1cclxuICAgICAgICAgIGluZGV4XHJcbiAgICAgICk7XHJcblxyXG4gICAgY29uc3QgbGVnZW5kT3B0aW9uczogTGVnZW5kT3B0aW9ucyA9IHtcclxuICAgICAgc3R5bGVzQXZhaWxhYmxlOiBzdHlsZU9wdGlvbnNcclxuICAgIH0gYXMgTGVnZW5kT3B0aW9ucztcclxuXHJcbiAgICByZXR1cm4gbGVnZW5kT3B0aW9ucztcclxuICB9XHJcbn1cclxuIl19