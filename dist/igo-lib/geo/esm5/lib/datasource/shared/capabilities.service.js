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
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
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
        var version = ((/** @type {?} */ (baseOptions.params))).version;
        return this.getCapabilities('wms', url, version).pipe(map((/**
         * @param {?} capabilities
         * @return {?}
         */
        function (capabilities) {
            return _this.parseWMSOptions(baseOptions, capabilities);
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
            return _this.parseWMTSOptions(baseOptions, capabilities);
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
                service: service,
                version: version || '1.3.0'
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
            /** @type {?} */
            var capabilities = _this.parsers[service].read(res);
            return capabilities;
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
        var layers = ((/** @type {?} */ (baseOptions.params))).layers;
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
                }
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
                type: 'datetime',
                style: 'calendar'
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
                type: 'datetime',
                style: 'calendar'
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
        Cacheable(),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FwYWJpbGl0aWVzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvY2FwYWJpbGl0aWVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzlELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzVELE9BQU8sYUFBYSxNQUFNLHdCQUF3QixDQUFDO0FBRW5ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ25ELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtCQUErQixDQUFDOzs7QUFVbkU7SUFVRSw2QkFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQU41QixzQkFBaUIsR0FBVSxFQUFFLENBQUM7UUFDOUIsWUFBTyxHQUFHO1lBQ2hCLEdBQUcsRUFBRSxJQUFJLGVBQWUsRUFBRTtZQUMxQixJQUFJLEVBQUUsSUFBSSxnQkFBZ0IsRUFBRTtTQUM3QixDQUFDO0lBRXFDLENBQUM7Ozs7O0lBRXhDLDJDQUFhOzs7O0lBQWIsVUFDRSxXQUFpQztRQURuQyxpQkFX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QUFDOztnQkEvVEYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkF2QlEsVUFBVTs7O0lBcUhqQjtRQURDLFNBQVMsRUFBRTs7O2dEQUtULFVBQVU7OERBb0JaOzhCQTlJSDtDQXNWQyxBQWhVRCxJQWdVQztTQTdUWSxtQkFBbUI7Ozs7OztJQUM5QixnREFBc0M7Ozs7O0lBQ3RDLHNDQUdFOzs7OztJQUVVLG1DQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgZm9ya0pvaW4sIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCwgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgQ2FjaGVhYmxlIH0gZnJvbSAnbmd4LWNhY2hlYWJsZSc7XHJcblxyXG5pbXBvcnQgeyBXTVNDYXBhYmlsaXRpZXMsIFdNVFNDYXBhYmlsaXRpZXMgfSBmcm9tICdvbC9mb3JtYXQnO1xyXG5pbXBvcnQgeyBvcHRpb25zRnJvbUNhcGFiaWxpdGllcyB9IGZyb20gJ29sL3NvdXJjZS9XTVRTLmpzJztcclxuaW1wb3J0IG9sQXR0cmlidXRpb24gZnJvbSAnb2wvY29udHJvbC9BdHRyaWJ1dGlvbic7XHJcblxyXG5pbXBvcnQgeyBPYmplY3RVdGlscyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuaW1wb3J0IHsgZ2V0UmVzb2x1dGlvbkZyb21TY2FsZSB9IGZyb20gJy4uLy4uL21hcCc7XHJcbmltcG9ydCB7IEVzcmlTdHlsZUdlbmVyYXRvciB9IGZyb20gJy4uL3V0aWxzL2Vzcmktc3R5bGUtZ2VuZXJhdG9yJztcclxuXHJcbmltcG9ydCB7XHJcbiAgV01UU0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gIFdNU0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gIENhcnRvRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zLFxyXG4gIFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnNcclxufSBmcm9tICcuL2RhdGFzb3VyY2VzJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIENhcGFiaWxpdGllc1NlcnZpY2Uge1xyXG4gIHByaXZhdGUgY2FwYWJpbGl0aWVzU3RvcmU6IGFueVtdID0gW107XHJcbiAgcHJpdmF0ZSBwYXJzZXJzID0ge1xyXG4gICAgd21zOiBuZXcgV01TQ2FwYWJpbGl0aWVzKCksXHJcbiAgICB3bXRzOiBuZXcgV01UU0NhcGFiaWxpdGllcygpXHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7fVxyXG5cclxuICBnZXRXTVNPcHRpb25zKFxyXG4gICAgYmFzZU9wdGlvbnM6IFdNU0RhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxXTVNEYXRhU291cmNlT3B0aW9ucz4ge1xyXG4gICAgY29uc3QgdXJsID0gYmFzZU9wdGlvbnMudXJsO1xyXG4gICAgY29uc3QgdmVyc2lvbiA9IChiYXNlT3B0aW9ucy5wYXJhbXMgYXMgYW55KS52ZXJzaW9uO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmdldENhcGFiaWxpdGllcygnd21zJywgdXJsLCB2ZXJzaW9uKS5waXBlKFxyXG4gICAgICBtYXAoKGNhcGFiaWxpdGllczogYW55KSA9PlxyXG4gICAgICAgIHRoaXMucGFyc2VXTVNPcHRpb25zKGJhc2VPcHRpb25zLCBjYXBhYmlsaXRpZXMpXHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXRXTVRTT3B0aW9ucyhcclxuICAgIGJhc2VPcHRpb25zOiBXTVRTRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFdNVFNEYXRhU291cmNlT3B0aW9ucz4ge1xyXG4gICAgY29uc3QgdXJsID0gYmFzZU9wdGlvbnMudXJsO1xyXG4gICAgY29uc3QgdmVyc2lvbiA9IGJhc2VPcHRpb25zLnZlcnNpb247XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuZ2V0Q2FwYWJpbGl0aWVzKCd3bXRzJywgdXJsLCB2ZXJzaW9uKS5waXBlKFxyXG4gICAgICBtYXAoKGNhcGFiaWxpdGllczogYW55KSA9PlxyXG4gICAgICAgIHRoaXMucGFyc2VXTVRTT3B0aW9ucyhiYXNlT3B0aW9ucywgY2FwYWJpbGl0aWVzKVxyXG4gICAgICApXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiBvcHRpb25zO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2FydG9PcHRpb25zKFxyXG4gICAgYmFzZU9wdGlvbnM6IENhcnRvRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPENhcnRvRGF0YVNvdXJjZU9wdGlvbnM+IHtcclxuICAgIGNvbnN0IGJhc2VVcmwgPVxyXG4gICAgICAnaHR0cHM6Ly8nICtcclxuICAgICAgYmFzZU9wdGlvbnMuYWNjb3VudCArXHJcbiAgICAgICcuY2FydG8uY29tL2FwaS92Mi92aXovJyArXHJcbiAgICAgIGJhc2VPcHRpb25zLm1hcElkICtcclxuICAgICAgJy92aXouanNvbic7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuanNvbnAoYmFzZVVybCwgJ2NhbGxiYWNrJylcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChjYXJ0b09wdGlvbnM6IGFueSkgPT5cclxuICAgICAgICAgIHRoaXMucGFyc2VDYXJ0b09wdGlvbnMoYmFzZU9wdGlvbnMsIGNhcnRvT3B0aW9ucylcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXRBcmNnaXNPcHRpb25zKFxyXG4gICAgYmFzZU9wdGlvbnM6IEFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8QXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zPiB7XHJcbiAgICBjb25zdCBiYXNlVXJsID0gYmFzZU9wdGlvbnMudXJsICsgJy8nICsgYmFzZU9wdGlvbnMubGF5ZXIgKyAnP2Y9anNvbic7XHJcbiAgICBjb25zdCBtb2RpZmllZFVybCA9IGJhc2VPcHRpb25zLnVybC5yZXBsYWNlKCdGZWF0dXJlU2VydmVyJywgJ01hcFNlcnZlcicpO1xyXG4gICAgY29uc3QgbGVnZW5kVXJsID0gbW9kaWZpZWRVcmwgKyAnL2xlZ2VuZD9mPWpzb24nO1xyXG4gICAgY29uc3QgYXJjZ2lzT3B0aW9ucyA9IHRoaXMuaHR0cC5nZXQoYmFzZVVybCk7XHJcbiAgICBjb25zdCBsZWdlbmQgPSB0aGlzLmh0dHAuZ2V0KGxlZ2VuZFVybCkucGlwZShcclxuICAgICAgbWFwKChyZXM6IGFueSkgPT4gcmVzKSxcclxuICAgICAgY2F0Y2hFcnJvcihlcnIgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdObyBsZWdlbmQgYXNzb2NpYXRlZCB3aXRoIHRoaXMgRmVhdHVyZSBTZXJ2aWNlJyk7XHJcbiAgICAgICAgcmV0dXJuIG9mKGVycik7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gICAgcmV0dXJuIGZvcmtKb2luKFthcmNnaXNPcHRpb25zLCBsZWdlbmRdKS5waXBlKFxyXG4gICAgICBtYXAoKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VBcmNnaXNPcHRpb25zKGJhc2VPcHRpb25zLCByZXNbMF0sIHJlc1sxXSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0VGlsZUFyY2dpc09wdGlvbnMoXHJcbiAgICBiYXNlT3B0aW9uczogVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8VGlsZUFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9ucz4ge1xyXG4gICAgY29uc3QgYmFzZVVybCA9IGJhc2VPcHRpb25zLnVybCArICcvJyArIGJhc2VPcHRpb25zLmxheWVyICsgJz9mPWpzb24nO1xyXG4gICAgY29uc3QgbGVnZW5kVXJsID0gYmFzZU9wdGlvbnMudXJsICsgJy9sZWdlbmQ/Zj1qc29uJztcclxuICAgIGNvbnN0IGFyY2dpc09wdGlvbnMgPSB0aGlzLmh0dHAuZ2V0KGJhc2VVcmwpO1xyXG4gICAgY29uc3QgbGVnZW5kSW5mbyA9IHRoaXMuaHR0cC5nZXQobGVnZW5kVXJsKTtcclxuXHJcbiAgICByZXR1cm4gZm9ya0pvaW4oW2FyY2dpc09wdGlvbnMsIGxlZ2VuZEluZm9dKS5waXBlKFxyXG4gICAgICBtYXAoKHJlczogYW55KSA9PlxyXG4gICAgICAgIHRoaXMucGFyc2VUaWxlQXJjZ2lzT3B0aW9ucyhiYXNlT3B0aW9ucywgcmVzWzBdLCByZXNbMV0pXHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBAQ2FjaGVhYmxlKClcclxuICBnZXRDYXBhYmlsaXRpZXMoXHJcbiAgICBzZXJ2aWNlOiAnd21zJyB8ICd3bXRzJyxcclxuICAgIGJhc2VVcmw6IHN0cmluZyxcclxuICAgIHZlcnNpb24/OiBzdHJpbmdcclxuICApOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgY29uc3QgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoe1xyXG4gICAgICBmcm9tT2JqZWN0OiB7XHJcbiAgICAgICAgcmVxdWVzdDogJ0dldENhcGFiaWxpdGllcycsXHJcbiAgICAgICAgc2VydmljZSxcclxuICAgICAgICB2ZXJzaW9uOiB2ZXJzaW9uIHx8ICcxLjMuMCdcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgcmVxdWVzdCA9IHRoaXMuaHR0cC5nZXQoYmFzZVVybCwge1xyXG4gICAgICBwYXJhbXMsXHJcbiAgICAgIHJlc3BvbnNlVHlwZTogJ3RleHQnXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVxdWVzdC5waXBlKFxyXG4gICAgICBtYXAocmVzID0+IHtcclxuICAgICAgICBjb25zdCBjYXBhYmlsaXRpZXMgPSB0aGlzLnBhcnNlcnNbc2VydmljZV0ucmVhZChyZXMpO1xyXG4gICAgICAgIHJldHVybiBjYXBhYmlsaXRpZXM7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwYXJzZVdNU09wdGlvbnMoXHJcbiAgICBiYXNlT3B0aW9uczogV01TRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgICBjYXBhYmlsaXRpZXM6IGFueVxyXG4gICk6IFdNU0RhdGFTb3VyY2VPcHRpb25zIHtcclxuICAgIGNvbnN0IGxheWVycyA9IChiYXNlT3B0aW9ucy5wYXJhbXMgYXMgYW55KS5sYXllcnM7XHJcbiAgICBjb25zdCBsYXllciA9IHRoaXMuZmluZERhdGFTb3VyY2VJbkNhcGFiaWxpdGllcyhcclxuICAgICAgY2FwYWJpbGl0aWVzLkNhcGFiaWxpdHkuTGF5ZXIsXHJcbiAgICAgIGxheWVyc1xyXG4gICAgKTtcclxuXHJcbiAgICBpZiAoIWxheWVyKSB7XHJcbiAgICAgIHJldHVybiBiYXNlT3B0aW9ucztcclxuICAgIH1cclxuICAgIGNvbnN0IG1ldGFkYXRhID0gbGF5ZXIuRGF0YVVSTCA/IGxheWVyLkRhdGFVUkxbMF0gOiB1bmRlZmluZWQ7XHJcbiAgICBjb25zdCBhYnN0cmFjdCA9IGxheWVyLkFic3RyYWN0ID8gbGF5ZXIuQWJzdHJhY3QgOiB1bmRlZmluZWQ7XHJcbiAgICBjb25zdCBrZXl3b3JkTGlzdCA9IGxheWVyLktleXdvcmRMaXN0ID8gbGF5ZXIuS2V5d29yZExpc3QgOiB1bmRlZmluZWQ7XHJcbiAgICBjb25zdCBxdWVyeWFibGUgPSBsYXllci5xdWVyeWFibGU7XHJcbiAgICBjb25zdCB0aW1lRmlsdGVyID0gdGhpcy5nZXRUaW1lRmlsdGVyKGxheWVyKTtcclxuICAgIGNvbnN0IHRpbWVGaWx0ZXJhYmxlID0gdGltZUZpbHRlciAmJiBPYmplY3Qua2V5cyh0aW1lRmlsdGVyKS5sZW5ndGggPiAwO1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnM6IFdNU0RhdGFTb3VyY2VPcHRpb25zID0gT2JqZWN0VXRpbHMucmVtb3ZlVW5kZWZpbmVkKHtcclxuICAgICAgX2xheWVyT3B0aW9uc0Zyb21DYXBhYmlsaXRpZXM6IHtcclxuICAgICAgICB0aXRsZTogbGF5ZXIuVGl0bGUsXHJcbiAgICAgICAgbWF4UmVzb2x1dGlvbjpcclxuICAgICAgICAgIGdldFJlc29sdXRpb25Gcm9tU2NhbGUobGF5ZXIuTWF4U2NhbGVEZW5vbWluYXRvcikgfHwgSW5maW5pdHksXHJcbiAgICAgICAgbWluUmVzb2x1dGlvbjpcclxuICAgICAgICAgIGdldFJlc29sdXRpb25Gcm9tU2NhbGUobGF5ZXIuTWluU2NhbGVEZW5vbWluYXRvcikgfHwgMCxcclxuICAgICAgICBtZXRhZGF0YToge1xyXG4gICAgICAgICAgdXJsOiBtZXRhZGF0YSA/IG1ldGFkYXRhLk9ubGluZVJlc291cmNlIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgZXh0ZXJuOiBtZXRhZGF0YSA/IHRydWUgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICBhYnN0cmFjdCxcclxuICAgICAgICAgIGtleXdvcmRMaXN0XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBxdWVyeWFibGUsXHJcbiAgICAgIHRpbWVGaWx0ZXI6IHRpbWVGaWx0ZXJhYmxlID8gdGltZUZpbHRlciA6IHVuZGVmaW5lZCxcclxuICAgICAgdGltZUZpbHRlcmFibGU6IHRpbWVGaWx0ZXJhYmxlID8gdHJ1ZSA6IHVuZGVmaW5lZFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIE9iamVjdFV0aWxzLm1lcmdlRGVlcChvcHRpb25zLCBiYXNlT3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHBhcnNlV01UU09wdGlvbnMoXHJcbiAgICBiYXNlT3B0aW9uczogV01UU0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gICAgY2FwYWJpbGl0aWVzOiBhbnlcclxuICApOiBXTVRTRGF0YVNvdXJjZU9wdGlvbnMge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IG9wdGlvbnNGcm9tQ2FwYWJpbGl0aWVzKGNhcGFiaWxpdGllcywgYmFzZU9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24ob3B0aW9ucywgYmFzZU9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwYXJzZUNhcnRvT3B0aW9ucyhcclxuICAgIGJhc2VPcHRpb25zOiBDYXJ0b0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gICAgY2FydG9PcHRpb25zOiBhbnlcclxuICApOiBDYXJ0b0RhdGFTb3VyY2VPcHRpb25zIHtcclxuICAgIGNvbnN0IGxheWVycyA9IFtdO1xyXG4gICAgY29uc3QgcGFyYW1zID0gY2FydG9PcHRpb25zLmxheWVyc1sxXS5vcHRpb25zLmxheWVyX2RlZmluaXRpb247XHJcbiAgICBwYXJhbXMubGF5ZXJzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgIGxheWVycy5wdXNoKHtcclxuICAgICAgICB0eXBlOiBlbGVtZW50LnR5cGUudG9Mb3dlckNhc2UoKSxcclxuICAgICAgICBvcHRpb25zOiBlbGVtZW50Lm9wdGlvbnMsXHJcbiAgICAgICAgbGVnZW5kOiBlbGVtZW50LmxlZ2VuZFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IE9iamVjdFV0aWxzLnJlbW92ZVVuZGVmaW5lZCh7XHJcbiAgICAgIGNvbmZpZzoge1xyXG4gICAgICAgIHZlcnNpb246IHBhcmFtcy52ZXJzaW9uLFxyXG4gICAgICAgIGxheWVyc1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBPYmplY3RVdGlscy5tZXJnZURlZXAob3B0aW9ucywgYmFzZU9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwYXJzZUFyY2dpc09wdGlvbnMoXHJcbiAgICBiYXNlT3B0aW9uczogQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zLFxyXG4gICAgYXJjZ2lzT3B0aW9uczogYW55LFxyXG4gICAgbGVnZW5kPzogYW55XHJcbiAgKTogQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zIHtcclxuICAgIGNvbnN0IGxlZ2VuZEluZm8gPSBsZWdlbmQubGF5ZXJzID8gbGVnZW5kIDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3Qgc3R5bGVHZW5lcmF0b3IgPSBuZXcgRXNyaVN0eWxlR2VuZXJhdG9yKCk7XHJcbiAgICBjb25zdCB1bml0cyA9IGFyY2dpc09wdGlvbnMudW5pdHMgPT09ICdlc3JpTWV0ZXJzJyA/ICdtJyA6ICdkZWdyZWVzJztcclxuICAgIGNvbnN0IHN0eWxlID0gc3R5bGVHZW5lcmF0b3IuZ2VuZXJhdGVTdHlsZShhcmNnaXNPcHRpb25zLCB1bml0cyk7XHJcbiAgICBjb25zdCBhdHRyaWJ1dGlvbnMgPSBuZXcgb2xBdHRyaWJ1dGlvbih7XHJcbiAgICAgIGh0bWw6IGFyY2dpc09wdGlvbnMuY29weXJpZ2h0VGV4dFxyXG4gICAgfSk7XHJcbiAgICBsZXQgdGltZUV4dGVudDtcclxuICAgIGxldCB0aW1lRmlsdGVyO1xyXG4gICAgaWYgKGFyY2dpc09wdGlvbnMudGltZUluZm8pIHtcclxuICAgICAgY29uc3QgdGltZSA9IGFyY2dpc09wdGlvbnMudGltZUluZm8udGltZUV4dGVudDtcclxuICAgICAgdGltZUV4dGVudCA9IHRpbWVbMF0gKyAnLCcgKyB0aW1lWzFdO1xyXG4gICAgICBjb25zdCBtaW4gPSBuZXcgRGF0ZSgpO1xyXG4gICAgICBtaW4uc2V0VGltZSh0aW1lWzBdKTtcclxuICAgICAgY29uc3QgbWF4ID0gbmV3IERhdGUoKTtcclxuICAgICAgbWF4LnNldFRpbWUodGltZVsxXSk7XHJcbiAgICAgIHRpbWVGaWx0ZXIgPSB7XHJcbiAgICAgICAgbWluOiBtaW4udG9VVENTdHJpbmcoKSxcclxuICAgICAgICBtYXg6IG1heC50b1VUQ1N0cmluZygpLFxyXG4gICAgICAgIHJhbmdlOiB0cnVlLFxyXG4gICAgICAgIHR5cGU6ICdkYXRldGltZScsXHJcbiAgICAgICAgc3R5bGU6ICdjYWxlbmRhcidcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIGNvbnN0IHBhcmFtcyA9IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgIHt9LFxyXG4gICAgICB7XHJcbiAgICAgICAgbGVnZW5kSW5mbyxcclxuICAgICAgICBzdHlsZSxcclxuICAgICAgICB0aW1lRmlsdGVyLFxyXG4gICAgICAgIHRpbWVFeHRlbnQsXHJcbiAgICAgICAgYXR0cmlidXRpb25zXHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgICBjb25zdCBvcHRpb25zID0gT2JqZWN0VXRpbHMucmVtb3ZlVW5kZWZpbmVkKHtcclxuICAgICAgcGFyYW1zXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBPYmplY3RVdGlscy5tZXJnZURlZXAob3B0aW9ucywgYmFzZU9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwYXJzZVRpbGVBcmNnaXNPcHRpb25zKFxyXG4gICAgYmFzZU9wdGlvbnM6IFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgICBhcmNnaXNPcHRpb25zOiBhbnksXHJcbiAgICBsZWdlbmQ6IGFueVxyXG4gICk6IFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnMge1xyXG4gICAgY29uc3QgbGVnZW5kSW5mbyA9IGxlZ2VuZC5sYXllcnMgPyBsZWdlbmQgOiB1bmRlZmluZWQ7XHJcbiAgICBjb25zdCBhdHRyaWJ1dGlvbnMgPSBuZXcgb2xBdHRyaWJ1dGlvbih7XHJcbiAgICAgIGh0bWw6IGFyY2dpc09wdGlvbnMuY29weXJpZ2h0VGV4dFxyXG4gICAgfSk7XHJcbiAgICBsZXQgdGltZUV4dGVudDtcclxuICAgIGxldCB0aW1lRmlsdGVyO1xyXG4gICAgaWYgKGFyY2dpc09wdGlvbnMudGltZUluZm8pIHtcclxuICAgICAgY29uc3QgdGltZSA9IGFyY2dpc09wdGlvbnMudGltZUluZm8udGltZUV4dGVudDtcclxuICAgICAgdGltZUV4dGVudCA9IHRpbWVbMF0gKyAnLCcgKyB0aW1lWzFdO1xyXG4gICAgICBjb25zdCBtaW4gPSBuZXcgRGF0ZSgpO1xyXG4gICAgICBtaW4uc2V0VGltZSh0aW1lWzBdKTtcclxuICAgICAgY29uc3QgbWF4ID0gbmV3IERhdGUoKTtcclxuICAgICAgbWF4LnNldFRpbWUodGltZVsxXSk7XHJcbiAgICAgIHRpbWVGaWx0ZXIgPSB7XHJcbiAgICAgICAgbWluOiBtaW4udG9VVENTdHJpbmcoKSxcclxuICAgICAgICBtYXg6IG1heC50b1VUQ1N0cmluZygpLFxyXG4gICAgICAgIHJhbmdlOiB0cnVlLFxyXG4gICAgICAgIHR5cGU6ICdkYXRldGltZScsXHJcbiAgICAgICAgc3R5bGU6ICdjYWxlbmRhcidcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIGNvbnN0IHBhcmFtcyA9IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgIHt9LFxyXG4gICAgICB7XHJcbiAgICAgICAgbGF5ZXJzOiAnc2hvdzonICsgYmFzZU9wdGlvbnMubGF5ZXIsXHJcbiAgICAgICAgdGltZTogdGltZUV4dGVudFxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IE9iamVjdFV0aWxzLnJlbW92ZVVuZGVmaW5lZCh7XHJcbiAgICAgIHBhcmFtcyxcclxuICAgICAgbGVnZW5kSW5mbyxcclxuICAgICAgdGltZUZpbHRlcixcclxuICAgICAgYXR0cmlidXRpb25zXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBPYmplY3RVdGlscy5tZXJnZURlZXAob3B0aW9ucywgYmFzZU9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmaW5kRGF0YVNvdXJjZUluQ2FwYWJpbGl0aWVzKGxheWVyQXJyYXksIG5hbWUpOiBhbnkge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkobGF5ZXJBcnJheSkpIHtcclxuICAgICAgbGV0IGxheWVyO1xyXG4gICAgICBsYXllckFycmF5LmZpbmQodmFsdWUgPT4ge1xyXG4gICAgICAgIGxheWVyID0gdGhpcy5maW5kRGF0YVNvdXJjZUluQ2FwYWJpbGl0aWVzKHZhbHVlLCBuYW1lKTtcclxuICAgICAgICByZXR1cm4gbGF5ZXIgIT09IHVuZGVmaW5lZDtcclxuICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgICByZXR1cm4gbGF5ZXI7XHJcbiAgICB9IGVsc2UgaWYgKGxheWVyQXJyYXkuTGF5ZXIpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZmluZERhdGFTb3VyY2VJbkNhcGFiaWxpdGllcyhsYXllckFycmF5LkxheWVyLCBuYW1lKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChsYXllckFycmF5Lk5hbWUgJiYgbGF5ZXJBcnJheS5OYW1lID09PSBuYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIGxheWVyQXJyYXk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFRpbWVGaWx0ZXIobGF5ZXIpIHtcclxuICAgIGxldCBkaW1lbnNpb247XHJcblxyXG4gICAgaWYgKGxheWVyLkRpbWVuc2lvbikge1xyXG4gICAgICBjb25zdCB0aW1lRmlsdGVyOiBhbnkgPSB7fTtcclxuICAgICAgZGltZW5zaW9uID0gbGF5ZXIuRGltZW5zaW9uWzBdO1xyXG5cclxuICAgICAgaWYgKGRpbWVuc2lvbi52YWx1ZXMpIHtcclxuICAgICAgICBjb25zdCBtaW5NYXhEaW0gPSBkaW1lbnNpb24udmFsdWVzLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgdGltZUZpbHRlci5taW4gPSBtaW5NYXhEaW1bMF0gIT09IHVuZGVmaW5lZCA/IG1pbk1heERpbVswXSA6IHVuZGVmaW5lZDtcclxuICAgICAgICB0aW1lRmlsdGVyLm1heCA9IG1pbk1heERpbVsxXSAhPT0gdW5kZWZpbmVkID8gbWluTWF4RGltWzFdIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIHRpbWVGaWx0ZXIuc3RlcCA9IG1pbk1heERpbVsyXSAhPT0gdW5kZWZpbmVkID8gbWluTWF4RGltWzJdIDogdW5kZWZpbmVkO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZGltZW5zaW9uLmRlZmF1bHQpIHtcclxuICAgICAgICB0aW1lRmlsdGVyLnZhbHVlID0gZGltZW5zaW9uLmRlZmF1bHQ7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRpbWVGaWx0ZXI7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==