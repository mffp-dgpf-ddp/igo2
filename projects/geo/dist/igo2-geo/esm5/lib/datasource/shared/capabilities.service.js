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
import { TimeFilterType, TimeFilterStyle } from '../../filter/shared/time-filter.enum';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
/** @enum {string} */
var TypeCapabilities = {
    wms: 'wms', wmts: 'wmts',
};
export { TypeCapabilities };
var CapabilitiesService = /** @class */ (function () {
    function CapabilitiesService(http) {
        this.http = http;
        this.capabilitiesStore = [];
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
        /** @type {?} */
        var layers = ((/** @type {?} */ (baseOptions.params))).LAYERS;
        /** @type {?} */
        var layer = this.findDataSourceInCapabilities(capabilities.Capability.Layer, layers);
        if (!layer) {
            return baseOptions;
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
        var options = ObjectUtils.removeUndefined({
            _layerOptionsFromCapabilities: {
                title: layer.Title,
                maxResolution: getResolutionFromScale(layer.MaxScaleDenominator) || Infinity,
                minResolution: getResolutionFromScale(layer.MinScaleDenominator) || 0,
                metadata: {
                    url: metadata ? metadata.OnlineResource : undefined,
                    extern: metadata ? true : undefined,
                    abstract: abstract,
                    keywordList: keywordList
                },
                legendOptions: legendOptions
            },
            queryable: queryable,
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
        /** @type {?} */
        var options = optionsFromCapabilities(capabilities, baseOptions);
        return Object.assign(options, baseOptions);
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
    CapabilitiesService.prototype.capabilitiesStore;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FwYWJpbGl0aWVzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvY2FwYWJpbGl0aWVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzlELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzVELE9BQU8sYUFBYSxNQUFNLHdCQUF3QixDQUFDO0FBRW5ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ25ELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBYW5FLE9BQU8sRUFDTCxjQUFjLEVBQ2QsZUFBZSxFQUNoQixNQUFNLHNDQUFzQyxDQUFDOzs7OztJQUc1QyxLQUFNLEtBQUssRUFBRSxNQUFPLE1BQU07OztBQUs1QjtJQVVFLDZCQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBTjVCLHNCQUFpQixHQUFVLEVBQUUsQ0FBQztRQUM5QixZQUFPLEdBQUc7WUFDaEIsR0FBRyxFQUFFLElBQUksZUFBZSxFQUFFO1lBQzFCLElBQUks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O2dCQWhXRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQXJDUSxVQUFVOzs7SUF5SWpCO1FBSEMsU0FBUyxDQUFDO1lBQ1QsYUFBYSxFQUFFLEVBQUU7U0FDbEIsQ0FBQzs7O2dEQUtDLFVBQVU7OERBd0JaOzhCQXRLSDtDQXFZQyxBQWpXRCxJQWlXQztTQTlWWSxtQkFBbUI7Ozs7OztJQUM5QixnREFBc0M7Ozs7O0lBQ3RDLHNDQUdFOzs7OztJQUVVLG1DQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgZm9ya0pvaW4sIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCwgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgQ2FjaGVhYmxlIH0gZnJvbSAnbmd4LWNhY2hlYWJsZSc7XHJcblxyXG5pbXBvcnQgeyBXTVNDYXBhYmlsaXRpZXMsIFdNVFNDYXBhYmlsaXRpZXMgfSBmcm9tICdvbC9mb3JtYXQnO1xyXG5pbXBvcnQgeyBvcHRpb25zRnJvbUNhcGFiaWxpdGllcyB9IGZyb20gJ29sL3NvdXJjZS9XTVRTLmpzJztcclxuaW1wb3J0IG9sQXR0cmlidXRpb24gZnJvbSAnb2wvY29udHJvbC9BdHRyaWJ1dGlvbic7XHJcblxyXG5pbXBvcnQgeyBPYmplY3RVdGlscyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuaW1wb3J0IHsgZ2V0UmVzb2x1dGlvbkZyb21TY2FsZSB9IGZyb20gJy4uLy4uL21hcCc7XHJcbmltcG9ydCB7IEVzcmlTdHlsZUdlbmVyYXRvciB9IGZyb20gJy4uL3V0aWxzL2Vzcmktc3R5bGUtZ2VuZXJhdG9yJztcclxuXHJcbmltcG9ydCB7XHJcbiAgV01UU0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gIFdNU0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gIENhcnRvRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zLFxyXG4gIFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnNcclxufSBmcm9tICcuL2RhdGFzb3VyY2VzJztcclxuaW1wb3J0IHtcclxuICBMZWdlbmRPcHRpb25zLFxyXG4gIEl0ZW1TdHlsZU9wdGlvbnNcclxufSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2xheWVyLmludGVyZmFjZSc7XHJcbmltcG9ydCB7XHJcbiAgVGltZUZpbHRlclR5cGUsXHJcbiAgVGltZUZpbHRlclN0eWxlXHJcbn0gZnJvbSAnLi4vLi4vZmlsdGVyL3NoYXJlZC90aW1lLWZpbHRlci5lbnVtJztcclxuXHJcbmV4cG9ydCBlbnVtIFR5cGVDYXBhYmlsaXRpZXMge1xyXG4gIHdtcyA9ICd3bXMnLCB3bXRzID0gJ3dtdHMnXHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFR5cGVDYXBhYmlsaXRpZXNTdHJpbmdzID0ga2V5b2YgdHlwZW9mIFR5cGVDYXBhYmlsaXRpZXM7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYXBhYmlsaXRpZXNTZXJ2aWNlIHtcclxuICBwcml2YXRlIGNhcGFiaWxpdGllc1N0b3JlOiBhbnlbXSA9IFtdO1xyXG4gIHByaXZhdGUgcGFyc2VycyA9IHtcclxuICAgIHdtczogbmV3IFdNU0NhcGFiaWxpdGllcygpLFxyXG4gICAgd210czogbmV3IFdNVFNDYXBhYmlsaXRpZXMoKVxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge31cclxuXHJcbiAgZ2V0V01TT3B0aW9ucyhcclxuICAgIGJhc2VPcHRpb25zOiBXTVNEYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8V01TRGF0YVNvdXJjZU9wdGlvbnM+IHtcclxuICAgIGNvbnN0IHVybCA9IGJhc2VPcHRpb25zLnVybDtcclxuICAgIGNvbnN0IHZlcnNpb24gPSAoYmFzZU9wdGlvbnMucGFyYW1zIGFzIGFueSkuVkVSU0lPTjtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5nZXRDYXBhYmlsaXRpZXMoJ3dtcycsIHVybCwgdmVyc2lvbikucGlwZShcclxuICAgICAgbWFwKChjYXBhYmlsaXRpZXM6IGFueSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBjYXBhYmlsaXRpZXNcclxuICAgICAgICAgID8gdGhpcy5wYXJzZVdNU09wdGlvbnMoYmFzZU9wdGlvbnMsIGNhcGFiaWxpdGllcylcclxuICAgICAgICAgIDogdW5kZWZpbmVkO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdldFdNVFNPcHRpb25zKFxyXG4gICAgYmFzZU9wdGlvbnM6IFdNVFNEYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8V01UU0RhdGFTb3VyY2VPcHRpb25zPiB7XHJcbiAgICBjb25zdCB1cmwgPSBiYXNlT3B0aW9ucy51cmw7XHJcbiAgICBjb25zdCB2ZXJzaW9uID0gYmFzZU9wdGlvbnMudmVyc2lvbjtcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5nZXRDYXBhYmlsaXRpZXMoJ3dtdHMnLCB1cmwsIHZlcnNpb24pLnBpcGUoXHJcbiAgICAgIG1hcCgoY2FwYWJpbGl0aWVzOiBhbnkpID0+IHtcclxuICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzXHJcbiAgICAgICAgICA/IHRoaXMucGFyc2VXTVRTT3B0aW9ucyhiYXNlT3B0aW9ucywgY2FwYWJpbGl0aWVzKVxyXG4gICAgICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiBvcHRpb25zO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2FydG9PcHRpb25zKFxyXG4gICAgYmFzZU9wdGlvbnM6IENhcnRvRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPENhcnRvRGF0YVNvdXJjZU9wdGlvbnM+IHtcclxuICAgIGNvbnN0IGJhc2VVcmwgPVxyXG4gICAgICAnaHR0cHM6Ly8nICtcclxuICAgICAgYmFzZU9wdGlvbnMuYWNjb3VudCArXHJcbiAgICAgICcuY2FydG8uY29tL2FwaS92Mi92aXovJyArXHJcbiAgICAgIGJhc2VPcHRpb25zLm1hcElkICtcclxuICAgICAgJy92aXouanNvbic7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuanNvbnAoYmFzZVVybCwgJ2NhbGxiYWNrJylcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChjYXJ0b09wdGlvbnM6IGFueSkgPT5cclxuICAgICAgICAgIHRoaXMucGFyc2VDYXJ0b09wdGlvbnMoYmFzZU9wdGlvbnMsIGNhcnRvT3B0aW9ucylcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXRBcmNnaXNPcHRpb25zKFxyXG4gICAgYmFzZU9wdGlvbnM6IEFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8QXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zPiB7XHJcbiAgICBjb25zdCBiYXNlVXJsID0gYmFzZU9wdGlvbnMudXJsICsgJy8nICsgYmFzZU9wdGlvbnMubGF5ZXIgKyAnP2Y9anNvbic7XHJcbiAgICBjb25zdCBtb2RpZmllZFVybCA9IGJhc2VPcHRpb25zLnVybC5yZXBsYWNlKCdGZWF0dXJlU2VydmVyJywgJ01hcFNlcnZlcicpO1xyXG4gICAgY29uc3QgbGVnZW5kVXJsID0gbW9kaWZpZWRVcmwgKyAnL2xlZ2VuZD9mPWpzb24nO1xyXG4gICAgY29uc3QgYXJjZ2lzT3B0aW9ucyA9IHRoaXMuaHR0cC5nZXQoYmFzZVVybCk7XHJcbiAgICBjb25zdCBsZWdlbmQgPSB0aGlzLmh0dHAuZ2V0KGxlZ2VuZFVybCkucGlwZShcclxuICAgICAgbWFwKChyZXM6IGFueSkgPT4gcmVzKSxcclxuICAgICAgY2F0Y2hFcnJvcihlcnIgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdObyBsZWdlbmQgYXNzb2NpYXRlZCB3aXRoIHRoaXMgRmVhdHVyZSBTZXJ2aWNlJyk7XHJcbiAgICAgICAgcmV0dXJuIG9mKGVycik7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gICAgcmV0dXJuIGZvcmtKb2luKFthcmNnaXNPcHRpb25zLCBsZWdlbmRdKS5waXBlKFxyXG4gICAgICBtYXAoKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VBcmNnaXNPcHRpb25zKGJhc2VPcHRpb25zLCByZXNbMF0sIHJlc1sxXSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0VGlsZUFyY2dpc09wdGlvbnMoXHJcbiAgICBiYXNlT3B0aW9uczogVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8VGlsZUFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9ucz4ge1xyXG4gICAgY29uc3QgYmFzZVVybCA9IGJhc2VPcHRpb25zLnVybCArICcvJyArIGJhc2VPcHRpb25zLmxheWVyICsgJz9mPWpzb24nO1xyXG4gICAgY29uc3QgbGVnZW5kVXJsID0gYmFzZU9wdGlvbnMudXJsICsgJy9sZWdlbmQ/Zj1qc29uJztcclxuICAgIGNvbnN0IGFyY2dpc09wdGlvbnMgPSB0aGlzLmh0dHAuZ2V0KGJhc2VVcmwpO1xyXG4gICAgY29uc3QgbGVnZW5kSW5mbyA9IHRoaXMuaHR0cC5nZXQobGVnZW5kVXJsKTtcclxuXHJcbiAgICByZXR1cm4gZm9ya0pvaW4oW2FyY2dpc09wdGlvbnMsIGxlZ2VuZEluZm9dKS5waXBlKFxyXG4gICAgICBtYXAoKHJlczogYW55KSA9PlxyXG4gICAgICAgIHRoaXMucGFyc2VUaWxlQXJjZ2lzT3B0aW9ucyhiYXNlT3B0aW9ucywgcmVzWzBdLCByZXNbMV0pXHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBAQ2FjaGVhYmxlKHtcclxuICAgIG1heENhY2hlQ291bnQ6IDIwXHJcbiAgfSlcclxuICBnZXRDYXBhYmlsaXRpZXMoXHJcbiAgICBzZXJ2aWNlOiBUeXBlQ2FwYWJpbGl0aWVzU3RyaW5ncyxcclxuICAgIGJhc2VVcmw6IHN0cmluZyxcclxuICAgIHZlcnNpb24/OiBzdHJpbmdcclxuICApOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgY29uc3QgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoe1xyXG4gICAgICBmcm9tT2JqZWN0OiB7XHJcbiAgICAgICAgcmVxdWVzdDogJ0dldENhcGFiaWxpdGllcycsXHJcbiAgICAgICAgc2VydmljZTogc2VydmljZS50b1VwcGVyQ2FzZSgpLFxyXG4gICAgICAgIHZlcnNpb246IHZlcnNpb24gfHwgJzEuMy4wJyxcclxuICAgICAgICBfaTogJ3RydWUnXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHJlcXVlc3QgPSB0aGlzLmh0dHAuZ2V0KGJhc2VVcmwsIHtcclxuICAgICAgcGFyYW1zLFxyXG4gICAgICByZXNwb25zZVR5cGU6ICd0ZXh0J1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlcXVlc3QucGlwZShcclxuICAgICAgbWFwKHJlcyA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlcnNbc2VydmljZV0ucmVhZChyZXMpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcGFyc2VXTVNPcHRpb25zKFxyXG4gICAgYmFzZU9wdGlvbnM6IFdNU0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gICAgY2FwYWJpbGl0aWVzOiBhbnlcclxuICApOiBXTVNEYXRhU291cmNlT3B0aW9ucyB7XHJcbiAgICBjb25zdCBsYXllcnMgPSAoYmFzZU9wdGlvbnMucGFyYW1zIGFzIGFueSkuTEFZRVJTO1xyXG4gICAgY29uc3QgbGF5ZXIgPSB0aGlzLmZpbmREYXRhU291cmNlSW5DYXBhYmlsaXRpZXMoXHJcbiAgICAgIGNhcGFiaWxpdGllcy5DYXBhYmlsaXR5LkxheWVyLFxyXG4gICAgICBsYXllcnNcclxuICAgICk7XHJcblxyXG4gICAgaWYgKCFsYXllcikge1xyXG4gICAgICByZXR1cm4gYmFzZU9wdGlvbnM7XHJcbiAgICB9XHJcbiAgICBjb25zdCBtZXRhZGF0YSA9IGxheWVyLkRhdGFVUkwgPyBsYXllci5EYXRhVVJMWzBdIDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgYWJzdHJhY3QgPSBsYXllci5BYnN0cmFjdCA/IGxheWVyLkFic3RyYWN0IDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3Qga2V5d29yZExpc3QgPSBsYXllci5LZXl3b3JkTGlzdCA/IGxheWVyLktleXdvcmRMaXN0IDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgcXVlcnlhYmxlID0gbGF5ZXIucXVlcnlhYmxlO1xyXG4gICAgY29uc3QgdGltZUZpbHRlciA9IHRoaXMuZ2V0VGltZUZpbHRlcihsYXllcik7XHJcbiAgICBjb25zdCB0aW1lRmlsdGVyYWJsZSA9IHRpbWVGaWx0ZXIgJiYgT2JqZWN0LmtleXModGltZUZpbHRlcikubGVuZ3RoID4gMDtcclxuICAgIGNvbnN0IGxlZ2VuZE9wdGlvbnMgPSBsYXllci5TdHlsZSA/IHRoaXMuZ2V0U3R5bGUobGF5ZXIuU3R5bGUpIDogdW5kZWZpbmVkO1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnM6IFdNU0RhdGFTb3VyY2VPcHRpb25zID0gT2JqZWN0VXRpbHMucmVtb3ZlVW5kZWZpbmVkKHtcclxuICAgICAgX2xheWVyT3B0aW9uc0Zyb21DYXBhYmlsaXRpZXM6IHtcclxuICAgICAgICB0aXRsZTogbGF5ZXIuVGl0bGUsXHJcbiAgICAgICAgbWF4UmVzb2x1dGlvbjpcclxuICAgICAgICAgIGdldFJlc29sdXRpb25Gcm9tU2NhbGUobGF5ZXIuTWF4U2NhbGVEZW5vbWluYXRvcikgfHwgSW5maW5pdHksXHJcbiAgICAgICAgbWluUmVzb2x1dGlvbjogZ2V0UmVzb2x1dGlvbkZyb21TY2FsZShsYXllci5NaW5TY2FsZURlbm9taW5hdG9yKSB8fCAwLFxyXG4gICAgICAgIG1ldGFkYXRhOiB7XHJcbiAgICAgICAgICB1cmw6IG1ldGFkYXRhID8gbWV0YWRhdGEuT25saW5lUmVzb3VyY2UgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICBleHRlcm46IG1ldGFkYXRhID8gdHJ1ZSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgIGFic3RyYWN0LFxyXG4gICAgICAgICAga2V5d29yZExpc3RcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxlZ2VuZE9wdGlvbnNcclxuICAgICAgfSxcclxuICAgICAgcXVlcnlhYmxlLFxyXG4gICAgICB0aW1lRmlsdGVyOiB0aW1lRmlsdGVyYWJsZSA/IHRpbWVGaWx0ZXIgOiB1bmRlZmluZWQsXHJcbiAgICAgIHRpbWVGaWx0ZXJhYmxlOiB0aW1lRmlsdGVyYWJsZSA/IHRydWUgOiB1bmRlZmluZWRcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBPYmplY3RVdGlscy5tZXJnZURlZXAob3B0aW9ucywgYmFzZU9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwYXJzZVdNVFNPcHRpb25zKFxyXG4gICAgYmFzZU9wdGlvbnM6IFdNVFNEYXRhU291cmNlT3B0aW9ucyxcclxuICAgIGNhcGFiaWxpdGllczogYW55XHJcbiAgKTogV01UU0RhdGFTb3VyY2VPcHRpb25zIHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSBvcHRpb25zRnJvbUNhcGFiaWxpdGllcyhjYXBhYmlsaXRpZXMsIGJhc2VPcHRpb25zKTtcclxuXHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihvcHRpb25zLCBiYXNlT3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHBhcnNlQ2FydG9PcHRpb25zKFxyXG4gICAgYmFzZU9wdGlvbnM6IENhcnRvRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgICBjYXJ0b09wdGlvbnM6IGFueVxyXG4gICk6IENhcnRvRGF0YVNvdXJjZU9wdGlvbnMge1xyXG4gICAgY29uc3QgbGF5ZXJzID0gW107XHJcbiAgICBjb25zdCBwYXJhbXMgPSBjYXJ0b09wdGlvbnMubGF5ZXJzWzFdLm9wdGlvbnMubGF5ZXJfZGVmaW5pdGlvbjtcclxuICAgIHBhcmFtcy5sYXllcnMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgbGF5ZXJzLnB1c2goe1xyXG4gICAgICAgIHR5cGU6IGVsZW1lbnQudHlwZS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICAgIG9wdGlvbnM6IGVsZW1lbnQub3B0aW9ucyxcclxuICAgICAgICBsZWdlbmQ6IGVsZW1lbnQubGVnZW5kXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBjb25zdCBvcHRpb25zID0gT2JqZWN0VXRpbHMucmVtb3ZlVW5kZWZpbmVkKHtcclxuICAgICAgY29uZmlnOiB7XHJcbiAgICAgICAgdmVyc2lvbjogcGFyYW1zLnZlcnNpb24sXHJcbiAgICAgICAgbGF5ZXJzXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIE9iamVjdFV0aWxzLm1lcmdlRGVlcChvcHRpb25zLCBiYXNlT3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHBhcnNlQXJjZ2lzT3B0aW9ucyhcclxuICAgIGJhc2VPcHRpb25zOiBBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgICBhcmNnaXNPcHRpb25zOiBhbnksXHJcbiAgICBsZWdlbmQ/OiBhbnlcclxuICApOiBBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnMge1xyXG4gICAgY29uc3QgbGVnZW5kSW5mbyA9IGxlZ2VuZC5sYXllcnMgPyBsZWdlbmQgOiB1bmRlZmluZWQ7XHJcbiAgICBjb25zdCBzdHlsZUdlbmVyYXRvciA9IG5ldyBFc3JpU3R5bGVHZW5lcmF0b3IoKTtcclxuICAgIGNvbnN0IHVuaXRzID0gYXJjZ2lzT3B0aW9ucy51bml0cyA9PT0gJ2VzcmlNZXRlcnMnID8gJ20nIDogJ2RlZ3JlZXMnO1xyXG4gICAgY29uc3Qgc3R5bGUgPSBzdHlsZUdlbmVyYXRvci5nZW5lcmF0ZVN0eWxlKGFyY2dpc09wdGlvbnMsIHVuaXRzKTtcclxuICAgIGNvbnN0IGF0dHJpYnV0aW9ucyA9IG5ldyBvbEF0dHJpYnV0aW9uKHtcclxuICAgICAgaHRtbDogYXJjZ2lzT3B0aW9ucy5jb3B5cmlnaHRUZXh0XHJcbiAgICB9KTtcclxuICAgIGxldCB0aW1lRXh0ZW50O1xyXG4gICAgbGV0IHRpbWVGaWx0ZXI7XHJcbiAgICBpZiAoYXJjZ2lzT3B0aW9ucy50aW1lSW5mbykge1xyXG4gICAgICBjb25zdCB0aW1lID0gYXJjZ2lzT3B0aW9ucy50aW1lSW5mby50aW1lRXh0ZW50O1xyXG4gICAgICB0aW1lRXh0ZW50ID0gdGltZVswXSArICcsJyArIHRpbWVbMV07XHJcbiAgICAgIGNvbnN0IG1pbiA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIG1pbi5zZXRUaW1lKHRpbWVbMF0pO1xyXG4gICAgICBjb25zdCBtYXggPSBuZXcgRGF0ZSgpO1xyXG4gICAgICBtYXguc2V0VGltZSh0aW1lWzFdKTtcclxuICAgICAgdGltZUZpbHRlciA9IHtcclxuICAgICAgICBtaW46IG1pbi50b1VUQ1N0cmluZygpLFxyXG4gICAgICAgIG1heDogbWF4LnRvVVRDU3RyaW5nKCksXHJcbiAgICAgICAgcmFuZ2U6IHRydWUsXHJcbiAgICAgICAgdHlwZTogVGltZUZpbHRlclR5cGUuREFURVRJTUUsXHJcbiAgICAgICAgc3R5bGU6IFRpbWVGaWx0ZXJTdHlsZS5DQUxFTkRBUlxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmFzc2lnbihcclxuICAgICAge30sXHJcbiAgICAgIHtcclxuICAgICAgICBsZWdlbmRJbmZvLFxyXG4gICAgICAgIHN0eWxlLFxyXG4gICAgICAgIHRpbWVGaWx0ZXIsXHJcbiAgICAgICAgdGltZUV4dGVudCxcclxuICAgICAgICBhdHRyaWJ1dGlvbnNcclxuICAgICAgfVxyXG4gICAgKTtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSBPYmplY3RVdGlscy5yZW1vdmVVbmRlZmluZWQoe1xyXG4gICAgICBwYXJhbXNcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIE9iamVjdFV0aWxzLm1lcmdlRGVlcChvcHRpb25zLCBiYXNlT3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHBhcnNlVGlsZUFyY2dpc09wdGlvbnMoXHJcbiAgICBiYXNlT3B0aW9uczogVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9ucyxcclxuICAgIGFyY2dpc09wdGlvbnM6IGFueSxcclxuICAgIGxlZ2VuZDogYW55XHJcbiAgKTogVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9ucyB7XHJcbiAgICBjb25zdCBsZWdlbmRJbmZvID0gbGVnZW5kLmxheWVycyA/IGxlZ2VuZCA6IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IGF0dHJpYnV0aW9ucyA9IG5ldyBvbEF0dHJpYnV0aW9uKHtcclxuICAgICAgaHRtbDogYXJjZ2lzT3B0aW9ucy5jb3B5cmlnaHRUZXh0XHJcbiAgICB9KTtcclxuICAgIGxldCB0aW1lRXh0ZW50O1xyXG4gICAgbGV0IHRpbWVGaWx0ZXI7XHJcbiAgICBpZiAoYXJjZ2lzT3B0aW9ucy50aW1lSW5mbykge1xyXG4gICAgICBjb25zdCB0aW1lID0gYXJjZ2lzT3B0aW9ucy50aW1lSW5mby50aW1lRXh0ZW50O1xyXG4gICAgICB0aW1lRXh0ZW50ID0gdGltZVswXSArICcsJyArIHRpbWVbMV07XHJcbiAgICAgIGNvbnN0IG1pbiA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIG1pbi5zZXRUaW1lKHRpbWVbMF0pO1xyXG4gICAgICBjb25zdCBtYXggPSBuZXcgRGF0ZSgpO1xyXG4gICAgICBtYXguc2V0VGltZSh0aW1lWzFdKTtcclxuICAgICAgdGltZUZpbHRlciA9IHtcclxuICAgICAgICBtaW46IG1pbi50b1VUQ1N0cmluZygpLFxyXG4gICAgICAgIG1heDogbWF4LnRvVVRDU3RyaW5nKCksXHJcbiAgICAgICAgcmFuZ2U6IHRydWUsXHJcbiAgICAgICAgdHlwZTogVGltZUZpbHRlclR5cGUuREFURVRJTUUsXHJcbiAgICAgICAgc3R5bGU6IFRpbWVGaWx0ZXJTdHlsZS5DQUxFTkRBUlxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmFzc2lnbihcclxuICAgICAge30sXHJcbiAgICAgIHtcclxuICAgICAgICBsYXllcnM6ICdzaG93OicgKyBiYXNlT3B0aW9ucy5sYXllcixcclxuICAgICAgICB0aW1lOiB0aW1lRXh0ZW50XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgICBjb25zdCBvcHRpb25zID0gT2JqZWN0VXRpbHMucmVtb3ZlVW5kZWZpbmVkKHtcclxuICAgICAgcGFyYW1zLFxyXG4gICAgICBsZWdlbmRJbmZvLFxyXG4gICAgICB0aW1lRmlsdGVyLFxyXG4gICAgICBhdHRyaWJ1dGlvbnNcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIE9iamVjdFV0aWxzLm1lcmdlRGVlcChvcHRpb25zLCBiYXNlT3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZpbmREYXRhU291cmNlSW5DYXBhYmlsaXRpZXMobGF5ZXJBcnJheSwgbmFtZSk6IGFueSB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShsYXllckFycmF5KSkge1xyXG4gICAgICBsZXQgbGF5ZXI7XHJcbiAgICAgIGxheWVyQXJyYXkuZmluZCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgbGF5ZXIgPSB0aGlzLmZpbmREYXRhU291cmNlSW5DYXBhYmlsaXRpZXModmFsdWUsIG5hbWUpO1xyXG4gICAgICAgIHJldHVybiBsYXllciAhPT0gdW5kZWZpbmVkO1xyXG4gICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgIHJldHVybiBsYXllcjtcclxuICAgIH0gZWxzZSBpZiAobGF5ZXJBcnJheS5MYXllcikge1xyXG4gICAgICByZXR1cm4gdGhpcy5maW5kRGF0YVNvdXJjZUluQ2FwYWJpbGl0aWVzKGxheWVyQXJyYXkuTGF5ZXIsIG5hbWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGxheWVyQXJyYXkuTmFtZSAmJiBsYXllckFycmF5Lk5hbWUgPT09IG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gbGF5ZXJBcnJheTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0VGltZUZpbHRlcihsYXllcikge1xyXG4gICAgbGV0IGRpbWVuc2lvbjtcclxuXHJcbiAgICBpZiAobGF5ZXIuRGltZW5zaW9uKSB7XHJcbiAgICAgIGNvbnN0IHRpbWVGaWx0ZXI6IGFueSA9IHt9O1xyXG4gICAgICBkaW1lbnNpb24gPSBsYXllci5EaW1lbnNpb25bMF07XHJcblxyXG4gICAgICBpZiAoZGltZW5zaW9uLnZhbHVlcykge1xyXG4gICAgICAgIGNvbnN0IG1pbk1heERpbSA9IGRpbWVuc2lvbi52YWx1ZXMuc3BsaXQoJy8nKTtcclxuICAgICAgICB0aW1lRmlsdGVyLm1pbiA9IG1pbk1heERpbVswXSAhPT0gdW5kZWZpbmVkID8gbWluTWF4RGltWzBdIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIHRpbWVGaWx0ZXIubWF4ID0gbWluTWF4RGltWzFdICE9PSB1bmRlZmluZWQgPyBtaW5NYXhEaW1bMV0gOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGltZUZpbHRlci5zdGVwID0gbWluTWF4RGltWzJdICE9PSB1bmRlZmluZWQgPyBtaW5NYXhEaW1bMl0gOiB1bmRlZmluZWQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkaW1lbnNpb24uZGVmYXVsdCkge1xyXG4gICAgICAgIHRpbWVGaWx0ZXIudmFsdWUgPSBkaW1lbnNpb24uZGVmYXVsdDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGltZUZpbHRlcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFN0eWxlKFN0eWxlKTogTGVnZW5kT3B0aW9ucyB7XHJcbiAgICBjb25zdCBzdHlsZU9wdGlvbnM6IEl0ZW1TdHlsZU9wdGlvbnNbXSA9IFN0eWxlLm1hcChzdHlsZSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogc3R5bGUuTmFtZSxcclxuICAgICAgICB0aXRsZTogc3R5bGUuVGl0bGVcclxuICAgICAgfTtcclxuICAgIH0pXHJcbiAgICAgIC8vIEhhbmRsZSByZXBlYXQgdGhlIHN0eWxlIFwiZGVmYXVsdFwiIGluIG91dHB1dCAgKE1hcFNlcnZlciBvciBPcGVuTGF5ZXIpXHJcbiAgICAgIC5maWx0ZXIoXHJcbiAgICAgICAgKGl0ZW0sIGluZGV4LCBzZWxmKSA9PlxyXG4gICAgICAgICAgc2VsZi5maW5kSW5kZXgoKGk6IEl0ZW1TdHlsZU9wdGlvbnMpID0+IGkubmFtZSA9PT0gaXRlbS5uYW1lKSA9PT1cclxuICAgICAgICAgIGluZGV4XHJcbiAgICAgICk7XHJcblxyXG4gICAgY29uc3QgbGVnZW5kT3B0aW9uczogTGVnZW5kT3B0aW9ucyA9IHtcclxuICAgICAgc3R5bGVzQXZhaWxhYmxlOiBzdHlsZU9wdGlvbnNcclxuICAgIH0gYXMgTGVnZW5kT3B0aW9ucztcclxuXHJcbiAgICByZXR1cm4gbGVnZW5kT3B0aW9ucztcclxuICB9XHJcbn1cclxuIl19