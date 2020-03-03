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
const TypeCapabilities = {
    wms: 'wms', wmts: 'wmts',
};
export { TypeCapabilities };
export class CapabilitiesService {
    /**
     * @param {?} http
     */
    constructor(http) {
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
    getWMSOptions(baseOptions) {
        /** @type {?} */
        const url = baseOptions.url;
        /** @type {?} */
        const version = ((/** @type {?} */ (baseOptions.params))).VERSION;
        return this.getCapabilities('wms', url, version).pipe(map((/**
         * @param {?} capabilities
         * @return {?}
         */
        (capabilities) => {
            return capabilities
                ? this.parseWMSOptions(baseOptions, capabilities)
                : undefined;
        })));
    }
    /**
     * @param {?} baseOptions
     * @return {?}
     */
    getWMTSOptions(baseOptions) {
        /** @type {?} */
        const url = baseOptions.url;
        /** @type {?} */
        const version = baseOptions.version;
        /** @type {?} */
        const options = this.getCapabilities('wmts', url, version).pipe(map((/**
         * @param {?} capabilities
         * @return {?}
         */
        (capabilities) => {
            return capabilities
                ? this.parseWMTSOptions(baseOptions, capabilities)
                : undefined;
        })));
        return options;
    }
    /**
     * @param {?} baseOptions
     * @return {?}
     */
    getCartoOptions(baseOptions) {
        /** @type {?} */
        const baseUrl = 'https://' +
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
        (cartoOptions) => this.parseCartoOptions(baseOptions, cartoOptions))));
    }
    /**
     * @param {?} baseOptions
     * @return {?}
     */
    getArcgisOptions(baseOptions) {
        /** @type {?} */
        const baseUrl = baseOptions.url + '/' + baseOptions.layer + '?f=json';
        /** @type {?} */
        const modifiedUrl = baseOptions.url.replace('FeatureServer', 'MapServer');
        /** @type {?} */
        const legendUrl = modifiedUrl + '/legend?f=json';
        /** @type {?} */
        const arcgisOptions = this.http.get(baseUrl);
        /** @type {?} */
        const legend = this.http.get(legendUrl).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => res)), catchError((/**
         * @param {?} err
         * @return {?}
         */
        err => {
            console.log('No legend associated with this Feature Service');
            return of(err);
        })));
        return forkJoin([arcgisOptions, legend]).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            return this.parseArcgisOptions(baseOptions, res[0], res[1]);
        })));
    }
    /**
     * @param {?} baseOptions
     * @return {?}
     */
    getTileArcgisOptions(baseOptions) {
        /** @type {?} */
        const baseUrl = baseOptions.url + '/' + baseOptions.layer + '?f=json';
        /** @type {?} */
        const legendUrl = baseOptions.url + '/legend?f=json';
        /** @type {?} */
        const arcgisOptions = this.http.get(baseUrl);
        /** @type {?} */
        const legendInfo = this.http.get(legendUrl);
        return forkJoin([arcgisOptions, legendInfo]).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => this.parseTileArcgisOptions(baseOptions, res[0], res[1]))));
    }
    /**
     * @param {?} service
     * @param {?} baseUrl
     * @param {?=} version
     * @return {?}
     */
    getCapabilities(service, baseUrl, version) {
        /** @type {?} */
        const params = new HttpParams({
            fromObject: {
                request: 'GetCapabilities',
                service: service.toUpperCase(),
                version: version || '1.3.0',
                _i: 'true'
            }
        });
        /** @type {?} */
        const request = this.http.get(baseUrl, {
            params,
            responseType: 'text'
        });
        return request.pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            try {
                return this.parsers[service].read(res);
            }
            catch (e) {
                return undefined;
            }
        })));
    }
    /**
     * @private
     * @param {?} baseOptions
     * @param {?} capabilities
     * @return {?}
     */
    parseWMSOptions(baseOptions, capabilities) {
        /** @type {?} */
        const layers = ((/** @type {?} */ (baseOptions.params))).LAYERS;
        /** @type {?} */
        const layer = this.findDataSourceInCapabilities(capabilities.Capability.Layer, layers);
        if (!layer) {
            return baseOptions;
        }
        /** @type {?} */
        const metadata = layer.DataURL ? layer.DataURL[0] : undefined;
        /** @type {?} */
        const abstract = layer.Abstract ? layer.Abstract : undefined;
        /** @type {?} */
        const keywordList = layer.KeywordList ? layer.KeywordList : undefined;
        /** @type {?} */
        const queryable = layer.queryable;
        /** @type {?} */
        const timeFilter = this.getTimeFilter(layer);
        /** @type {?} */
        const timeFilterable = timeFilter && Object.keys(timeFilter).length > 0;
        /** @type {?} */
        const legendOptions = layer.Style ? this.getStyle(layer.Style) : undefined;
        /** @type {?} */
        const options = ObjectUtils.removeUndefined({
            _layerOptionsFromCapabilities: {
                title: layer.Title,
                maxResolution: getResolutionFromScale(layer.MaxScaleDenominator) || Infinity,
                minResolution: getResolutionFromScale(layer.MinScaleDenominator) || 0,
                metadata: {
                    url: metadata ? metadata.OnlineResource : undefined,
                    extern: metadata ? true : undefined,
                    abstract,
                    keywordList
                },
                legendOptions
            },
            queryable,
            timeFilter: timeFilterable ? timeFilter : undefined,
            timeFilterable: timeFilterable ? true : undefined
        });
        return ObjectUtils.mergeDeep(options, baseOptions);
    }
    /**
     * @private
     * @param {?} baseOptions
     * @param {?} capabilities
     * @return {?}
     */
    parseWMTSOptions(baseOptions, capabilities) {
        /** @type {?} */
        const options = optionsFromCapabilities(capabilities, baseOptions);
        return Object.assign(options, baseOptions);
    }
    /**
     * @private
     * @param {?} baseOptions
     * @param {?} cartoOptions
     * @return {?}
     */
    parseCartoOptions(baseOptions, cartoOptions) {
        /** @type {?} */
        const layers = [];
        /** @type {?} */
        const params = cartoOptions.layers[1].options.layer_definition;
        params.layers.forEach((/**
         * @param {?} element
         * @return {?}
         */
        element => {
            layers.push({
                type: element.type.toLowerCase(),
                options: element.options,
                legend: element.legend
            });
        }));
        /** @type {?} */
        const options = ObjectUtils.removeUndefined({
            config: {
                version: params.version,
                layers
            }
        });
        return ObjectUtils.mergeDeep(options, baseOptions);
    }
    /**
     * @private
     * @param {?} baseOptions
     * @param {?} arcgisOptions
     * @param {?=} legend
     * @return {?}
     */
    parseArcgisOptions(baseOptions, arcgisOptions, legend) {
        /** @type {?} */
        const legendInfo = legend.layers ? legend : undefined;
        /** @type {?} */
        const styleGenerator = new EsriStyleGenerator();
        /** @type {?} */
        const units = arcgisOptions.units === 'esriMeters' ? 'm' : 'degrees';
        /** @type {?} */
        const style = styleGenerator.generateStyle(arcgisOptions, units);
        /** @type {?} */
        const attributions = new olAttribution({
            html: arcgisOptions.copyrightText
        });
        /** @type {?} */
        let timeExtent;
        /** @type {?} */
        let timeFilter;
        if (arcgisOptions.timeInfo) {
            /** @type {?} */
            const time = arcgisOptions.timeInfo.timeExtent;
            timeExtent = time[0] + ',' + time[1];
            /** @type {?} */
            const min = new Date();
            min.setTime(time[0]);
            /** @type {?} */
            const max = new Date();
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
        const params = Object.assign({}, {
            legendInfo,
            style,
            timeFilter,
            timeExtent,
            attributions
        });
        /** @type {?} */
        const options = ObjectUtils.removeUndefined({
            params
        });
        return ObjectUtils.mergeDeep(options, baseOptions);
    }
    /**
     * @private
     * @param {?} baseOptions
     * @param {?} arcgisOptions
     * @param {?} legend
     * @return {?}
     */
    parseTileArcgisOptions(baseOptions, arcgisOptions, legend) {
        /** @type {?} */
        const legendInfo = legend.layers ? legend : undefined;
        /** @type {?} */
        const attributions = new olAttribution({
            html: arcgisOptions.copyrightText
        });
        /** @type {?} */
        let timeExtent;
        /** @type {?} */
        let timeFilter;
        if (arcgisOptions.timeInfo) {
            /** @type {?} */
            const time = arcgisOptions.timeInfo.timeExtent;
            timeExtent = time[0] + ',' + time[1];
            /** @type {?} */
            const min = new Date();
            min.setTime(time[0]);
            /** @type {?} */
            const max = new Date();
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
        const params = Object.assign({}, {
            layers: 'show:' + baseOptions.layer,
            time: timeExtent
        });
        /** @type {?} */
        const options = ObjectUtils.removeUndefined({
            params,
            legendInfo,
            timeFilter,
            attributions
        });
        return ObjectUtils.mergeDeep(options, baseOptions);
    }
    /**
     * @private
     * @param {?} layerArray
     * @param {?} name
     * @return {?}
     */
    findDataSourceInCapabilities(layerArray, name) {
        if (Array.isArray(layerArray)) {
            /** @type {?} */
            let layer;
            layerArray.find((/**
             * @param {?} value
             * @return {?}
             */
            value => {
                layer = this.findDataSourceInCapabilities(value, name);
                return layer !== undefined;
            }), this);
            return layer;
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
    }
    /**
     * @param {?} layer
     * @return {?}
     */
    getTimeFilter(layer) {
        /** @type {?} */
        let dimension;
        if (layer.Dimension) {
            /** @type {?} */
            const timeFilter = {};
            dimension = layer.Dimension[0];
            if (dimension.values) {
                /** @type {?} */
                const minMaxDim = dimension.values.split('/');
                timeFilter.min = minMaxDim[0] !== undefined ? minMaxDim[0] : undefined;
                timeFilter.max = minMaxDim[1] !== undefined ? minMaxDim[1] : undefined;
                timeFilter.step = minMaxDim[2] !== undefined ? minMaxDim[2] : undefined;
            }
            if (dimension.default) {
                timeFilter.value = dimension.default;
            }
            return timeFilter;
        }
    }
    /**
     * @param {?} Style
     * @return {?}
     */
    getStyle(Style) {
        /** @type {?} */
        const styleOptions = Style.map((/**
         * @param {?} style
         * @return {?}
         */
        style => {
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
        (item, index, self) => self.findIndex((/**
         * @param {?} i
         * @return {?}
         */
        (i) => i.name === item.name)) ===
            index));
        /** @type {?} */
        const legendOptions = (/** @type {?} */ ({
            stylesAvailable: styleOptions
        }));
        return legendOptions;
    }
}
CapabilitiesService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
CapabilitiesService.ctorParameters = () => [
    { type: HttpClient }
];
/** @nocollapse */ CapabilitiesService.ngInjectableDef = i0.defineInjectable({ factory: function CapabilitiesService_Factory() { return new CapabilitiesService(i0.inject(i1.HttpClient)); }, token: CapabilitiesService, providedIn: "root" });
tslib_1.__decorate([
    Cacheable({
        maxCacheCount: 20
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String]),
    tslib_1.__metadata("design:returntype", Observable)
], CapabilitiesService.prototype, "getCapabilities", null);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FwYWJpbGl0aWVzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvY2FwYWJpbGl0aWVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzlELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzVELE9BQU8sYUFBYSxNQUFNLHdCQUF3QixDQUFDO0FBRW5ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ25ELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBYW5FLE9BQU8sRUFDTCxjQUFjLEVBQ2QsZUFBZSxFQUNoQixNQUFNLHNDQUFzQyxDQUFDOzs7OztJQUc1QyxLQUFNLEtBQUssRUFBRSxNQUFPLE1BQU07OztBQVE1QixNQUFNLE9BQU8sbUJBQW1COzs7O0lBTzlCLFlBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFONUIsc0JBQWlCLEdBQVUsRUFBRSxDQUFDO1FBQzlCLFlBQU8sR0FBRztZQUNoQixHQUFHLEVBQUUsSUFBSSxl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QUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO2FBQ3pFO1lBRUQsSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFO2dCQUNyQixVQUFVLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUM7YUFDdEM7WUFDRCxPQUFPLFVBQVUsQ0FBQztTQUNuQjtJQUNILENBQUM7Ozs7O0lBRUQsUUFBUSxDQUFDLEtBQUs7O2NBQ04sWUFBWSxHQUF1QixLQUFLLENBQUMsR0FBRzs7OztRQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3pELE9BQU87Z0JBQ0wsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO2dCQUNoQixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7YUFDbkIsQ0FBQztRQUNKLENBQUMsRUFBQztZQUNBLHdFQUF3RTthQUN2RSxNQUFNOzs7Ozs7UUFDTCxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FDcEIsSUFBSSxDQUFDLFNBQVM7Ozs7UUFBQyxDQUFDLENBQW1CLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksRUFBQztZQUM3RCxLQUFLLEVBQ1I7O2NBRUcsYUFBYSxHQUFrQixtQkFBQTtZQUNuQyxlQUFlLEVBQUUsWUFBWTtTQUM5QixFQUFpQjtRQUVsQixPQUFPLGFBQWEsQ0FBQztJQUN2QixDQUFDOzs7WUFoV0YsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBckNRLFVBQVU7OztBQXlJakI7SUFIQyxTQUFTLENBQUM7UUFDVCxhQUFhLEVBQUUsRUFBRTtLQUNsQixDQUFDOzs7NENBS0MsVUFBVTswREF3Qlo7Ozs7OztJQTlIRCxnREFBc0M7Ozs7O0lBQ3RDLHNDQUdFOzs7OztJQUVVLG1DQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgZm9ya0pvaW4sIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCwgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgQ2FjaGVhYmxlIH0gZnJvbSAnbmd4LWNhY2hlYWJsZSc7XHJcblxyXG5pbXBvcnQgeyBXTVNDYXBhYmlsaXRpZXMsIFdNVFNDYXBhYmlsaXRpZXMgfSBmcm9tICdvbC9mb3JtYXQnO1xyXG5pbXBvcnQgeyBvcHRpb25zRnJvbUNhcGFiaWxpdGllcyB9IGZyb20gJ29sL3NvdXJjZS9XTVRTLmpzJztcclxuaW1wb3J0IG9sQXR0cmlidXRpb24gZnJvbSAnb2wvY29udHJvbC9BdHRyaWJ1dGlvbic7XHJcblxyXG5pbXBvcnQgeyBPYmplY3RVdGlscyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuaW1wb3J0IHsgZ2V0UmVzb2x1dGlvbkZyb21TY2FsZSB9IGZyb20gJy4uLy4uL21hcCc7XHJcbmltcG9ydCB7IEVzcmlTdHlsZUdlbmVyYXRvciB9IGZyb20gJy4uL3V0aWxzL2Vzcmktc3R5bGUtZ2VuZXJhdG9yJztcclxuXHJcbmltcG9ydCB7XHJcbiAgV01UU0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gIFdNU0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gIENhcnRvRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zLFxyXG4gIFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnNcclxufSBmcm9tICcuL2RhdGFzb3VyY2VzJztcclxuaW1wb3J0IHtcclxuICBMZWdlbmRPcHRpb25zLFxyXG4gIEl0ZW1TdHlsZU9wdGlvbnNcclxufSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2xheWVyLmludGVyZmFjZSc7XHJcbmltcG9ydCB7XHJcbiAgVGltZUZpbHRlclR5cGUsXHJcbiAgVGltZUZpbHRlclN0eWxlXHJcbn0gZnJvbSAnLi4vLi4vZmlsdGVyL3NoYXJlZC90aW1lLWZpbHRlci5lbnVtJztcclxuXHJcbmV4cG9ydCBlbnVtIFR5cGVDYXBhYmlsaXRpZXMge1xyXG4gIHdtcyA9ICd3bXMnLCB3bXRzID0gJ3dtdHMnXHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFR5cGVDYXBhYmlsaXRpZXNTdHJpbmdzID0ga2V5b2YgdHlwZW9mIFR5cGVDYXBhYmlsaXRpZXM7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYXBhYmlsaXRpZXNTZXJ2aWNlIHtcclxuICBwcml2YXRlIGNhcGFiaWxpdGllc1N0b3JlOiBhbnlbXSA9IFtdO1xyXG4gIHByaXZhdGUgcGFyc2VycyA9IHtcclxuICAgIHdtczogbmV3IFdNU0NhcGFiaWxpdGllcygpLFxyXG4gICAgd210czogbmV3IFdNVFNDYXBhYmlsaXRpZXMoKVxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge31cclxuXHJcbiAgZ2V0V01TT3B0aW9ucyhcclxuICAgIGJhc2VPcHRpb25zOiBXTVNEYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8V01TRGF0YVNvdXJjZU9wdGlvbnM+IHtcclxuICAgIGNvbnN0IHVybCA9IGJhc2VPcHRpb25zLnVybDtcclxuICAgIGNvbnN0IHZlcnNpb24gPSAoYmFzZU9wdGlvbnMucGFyYW1zIGFzIGFueSkuVkVSU0lPTjtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5nZXRDYXBhYmlsaXRpZXMoJ3dtcycsIHVybCwgdmVyc2lvbikucGlwZShcclxuICAgICAgbWFwKChjYXBhYmlsaXRpZXM6IGFueSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBjYXBhYmlsaXRpZXNcclxuICAgICAgICAgID8gdGhpcy5wYXJzZVdNU09wdGlvbnMoYmFzZU9wdGlvbnMsIGNhcGFiaWxpdGllcylcclxuICAgICAgICAgIDogdW5kZWZpbmVkO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdldFdNVFNPcHRpb25zKFxyXG4gICAgYmFzZU9wdGlvbnM6IFdNVFNEYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8V01UU0RhdGFTb3VyY2VPcHRpb25zPiB7XHJcbiAgICBjb25zdCB1cmwgPSBiYXNlT3B0aW9ucy51cmw7XHJcbiAgICBjb25zdCB2ZXJzaW9uID0gYmFzZU9wdGlvbnMudmVyc2lvbjtcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5nZXRDYXBhYmlsaXRpZXMoJ3dtdHMnLCB1cmwsIHZlcnNpb24pLnBpcGUoXHJcbiAgICAgIG1hcCgoY2FwYWJpbGl0aWVzOiBhbnkpID0+IHtcclxuICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzXHJcbiAgICAgICAgICA/IHRoaXMucGFyc2VXTVRTT3B0aW9ucyhiYXNlT3B0aW9ucywgY2FwYWJpbGl0aWVzKVxyXG4gICAgICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiBvcHRpb25zO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2FydG9PcHRpb25zKFxyXG4gICAgYmFzZU9wdGlvbnM6IENhcnRvRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPENhcnRvRGF0YVNvdXJjZU9wdGlvbnM+IHtcclxuICAgIGNvbnN0IGJhc2VVcmwgPVxyXG4gICAgICAnaHR0cHM6Ly8nICtcclxuICAgICAgYmFzZU9wdGlvbnMuYWNjb3VudCArXHJcbiAgICAgICcuY2FydG8uY29tL2FwaS92Mi92aXovJyArXHJcbiAgICAgIGJhc2VPcHRpb25zLm1hcElkICtcclxuICAgICAgJy92aXouanNvbic7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuanNvbnAoYmFzZVVybCwgJ2NhbGxiYWNrJylcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChjYXJ0b09wdGlvbnM6IGFueSkgPT5cclxuICAgICAgICAgIHRoaXMucGFyc2VDYXJ0b09wdGlvbnMoYmFzZU9wdGlvbnMsIGNhcnRvT3B0aW9ucylcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXRBcmNnaXNPcHRpb25zKFxyXG4gICAgYmFzZU9wdGlvbnM6IEFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8QXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zPiB7XHJcbiAgICBjb25zdCBiYXNlVXJsID0gYmFzZU9wdGlvbnMudXJsICsgJy8nICsgYmFzZU9wdGlvbnMubGF5ZXIgKyAnP2Y9anNvbic7XHJcbiAgICBjb25zdCBtb2RpZmllZFVybCA9IGJhc2VPcHRpb25zLnVybC5yZXBsYWNlKCdGZWF0dXJlU2VydmVyJywgJ01hcFNlcnZlcicpO1xyXG4gICAgY29uc3QgbGVnZW5kVXJsID0gbW9kaWZpZWRVcmwgKyAnL2xlZ2VuZD9mPWpzb24nO1xyXG4gICAgY29uc3QgYXJjZ2lzT3B0aW9ucyA9IHRoaXMuaHR0cC5nZXQoYmFzZVVybCk7XHJcbiAgICBjb25zdCBsZWdlbmQgPSB0aGlzLmh0dHAuZ2V0KGxlZ2VuZFVybCkucGlwZShcclxuICAgICAgbWFwKChyZXM6IGFueSkgPT4gcmVzKSxcclxuICAgICAgY2F0Y2hFcnJvcihlcnIgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdObyBsZWdlbmQgYXNzb2NpYXRlZCB3aXRoIHRoaXMgRmVhdHVyZSBTZXJ2aWNlJyk7XHJcbiAgICAgICAgcmV0dXJuIG9mKGVycik7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gICAgcmV0dXJuIGZvcmtKb2luKFthcmNnaXNPcHRpb25zLCBsZWdlbmRdKS5waXBlKFxyXG4gICAgICBtYXAoKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VBcmNnaXNPcHRpb25zKGJhc2VPcHRpb25zLCByZXNbMF0sIHJlc1sxXSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0VGlsZUFyY2dpc09wdGlvbnMoXHJcbiAgICBiYXNlT3B0aW9uczogVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8VGlsZUFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9ucz4ge1xyXG4gICAgY29uc3QgYmFzZVVybCA9IGJhc2VPcHRpb25zLnVybCArICcvJyArIGJhc2VPcHRpb25zLmxheWVyICsgJz9mPWpzb24nO1xyXG4gICAgY29uc3QgbGVnZW5kVXJsID0gYmFzZU9wdGlvbnMudXJsICsgJy9sZWdlbmQ/Zj1qc29uJztcclxuICAgIGNvbnN0IGFyY2dpc09wdGlvbnMgPSB0aGlzLmh0dHAuZ2V0KGJhc2VVcmwpO1xyXG4gICAgY29uc3QgbGVnZW5kSW5mbyA9IHRoaXMuaHR0cC5nZXQobGVnZW5kVXJsKTtcclxuXHJcbiAgICByZXR1cm4gZm9ya0pvaW4oW2FyY2dpc09wdGlvbnMsIGxlZ2VuZEluZm9dKS5waXBlKFxyXG4gICAgICBtYXAoKHJlczogYW55KSA9PlxyXG4gICAgICAgIHRoaXMucGFyc2VUaWxlQXJjZ2lzT3B0aW9ucyhiYXNlT3B0aW9ucywgcmVzWzBdLCByZXNbMV0pXHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBAQ2FjaGVhYmxlKHtcclxuICAgIG1heENhY2hlQ291bnQ6IDIwXHJcbiAgfSlcclxuICBnZXRDYXBhYmlsaXRpZXMoXHJcbiAgICBzZXJ2aWNlOiBUeXBlQ2FwYWJpbGl0aWVzU3RyaW5ncyxcclxuICAgIGJhc2VVcmw6IHN0cmluZyxcclxuICAgIHZlcnNpb24/OiBzdHJpbmdcclxuICApOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgY29uc3QgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoe1xyXG4gICAgICBmcm9tT2JqZWN0OiB7XHJcbiAgICAgICAgcmVxdWVzdDogJ0dldENhcGFiaWxpdGllcycsXHJcbiAgICAgICAgc2VydmljZTogc2VydmljZS50b1VwcGVyQ2FzZSgpLFxyXG4gICAgICAgIHZlcnNpb246IHZlcnNpb24gfHwgJzEuMy4wJyxcclxuICAgICAgICBfaTogJ3RydWUnXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHJlcXVlc3QgPSB0aGlzLmh0dHAuZ2V0KGJhc2VVcmwsIHtcclxuICAgICAgcGFyYW1zLFxyXG4gICAgICByZXNwb25zZVR5cGU6ICd0ZXh0J1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlcXVlc3QucGlwZShcclxuICAgICAgbWFwKHJlcyA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlcnNbc2VydmljZV0ucmVhZChyZXMpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcGFyc2VXTVNPcHRpb25zKFxyXG4gICAgYmFzZU9wdGlvbnM6IFdNU0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gICAgY2FwYWJpbGl0aWVzOiBhbnlcclxuICApOiBXTVNEYXRhU291cmNlT3B0aW9ucyB7XHJcbiAgICBjb25zdCBsYXllcnMgPSAoYmFzZU9wdGlvbnMucGFyYW1zIGFzIGFueSkuTEFZRVJTO1xyXG4gICAgY29uc3QgbGF5ZXIgPSB0aGlzLmZpbmREYXRhU291cmNlSW5DYXBhYmlsaXRpZXMoXHJcbiAgICAgIGNhcGFiaWxpdGllcy5DYXBhYmlsaXR5LkxheWVyLFxyXG4gICAgICBsYXllcnNcclxuICAgICk7XHJcblxyXG4gICAgaWYgKCFsYXllcikge1xyXG4gICAgICByZXR1cm4gYmFzZU9wdGlvbnM7XHJcbiAgICB9XHJcbiAgICBjb25zdCBtZXRhZGF0YSA9IGxheWVyLkRhdGFVUkwgPyBsYXllci5EYXRhVVJMWzBdIDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgYWJzdHJhY3QgPSBsYXllci5BYnN0cmFjdCA/IGxheWVyLkFic3RyYWN0IDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3Qga2V5d29yZExpc3QgPSBsYXllci5LZXl3b3JkTGlzdCA/IGxheWVyLktleXdvcmRMaXN0IDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgcXVlcnlhYmxlID0gbGF5ZXIucXVlcnlhYmxlO1xyXG4gICAgY29uc3QgdGltZUZpbHRlciA9IHRoaXMuZ2V0VGltZUZpbHRlcihsYXllcik7XHJcbiAgICBjb25zdCB0aW1lRmlsdGVyYWJsZSA9IHRpbWVGaWx0ZXIgJiYgT2JqZWN0LmtleXModGltZUZpbHRlcikubGVuZ3RoID4gMDtcclxuICAgIGNvbnN0IGxlZ2VuZE9wdGlvbnMgPSBsYXllci5TdHlsZSA/IHRoaXMuZ2V0U3R5bGUobGF5ZXIuU3R5bGUpIDogdW5kZWZpbmVkO1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnM6IFdNU0RhdGFTb3VyY2VPcHRpb25zID0gT2JqZWN0VXRpbHMucmVtb3ZlVW5kZWZpbmVkKHtcclxuICAgICAgX2xheWVyT3B0aW9uc0Zyb21DYXBhYmlsaXRpZXM6IHtcclxuICAgICAgICB0aXRsZTogbGF5ZXIuVGl0bGUsXHJcbiAgICAgICAgbWF4UmVzb2x1dGlvbjpcclxuICAgICAgICAgIGdldFJlc29sdXRpb25Gcm9tU2NhbGUobGF5ZXIuTWF4U2NhbGVEZW5vbWluYXRvcikgfHwgSW5maW5pdHksXHJcbiAgICAgICAgbWluUmVzb2x1dGlvbjogZ2V0UmVzb2x1dGlvbkZyb21TY2FsZShsYXllci5NaW5TY2FsZURlbm9taW5hdG9yKSB8fCAwLFxyXG4gICAgICAgIG1ldGFkYXRhOiB7XHJcbiAgICAgICAgICB1cmw6IG1ldGFkYXRhID8gbWV0YWRhdGEuT25saW5lUmVzb3VyY2UgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICBleHRlcm46IG1ldGFkYXRhID8gdHJ1ZSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgIGFic3RyYWN0LFxyXG4gICAgICAgICAga2V5d29yZExpc3RcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxlZ2VuZE9wdGlvbnNcclxuICAgICAgfSxcclxuICAgICAgcXVlcnlhYmxlLFxyXG4gICAgICB0aW1lRmlsdGVyOiB0aW1lRmlsdGVyYWJsZSA/IHRpbWVGaWx0ZXIgOiB1bmRlZmluZWQsXHJcbiAgICAgIHRpbWVGaWx0ZXJhYmxlOiB0aW1lRmlsdGVyYWJsZSA/IHRydWUgOiB1bmRlZmluZWRcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBPYmplY3RVdGlscy5tZXJnZURlZXAob3B0aW9ucywgYmFzZU9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwYXJzZVdNVFNPcHRpb25zKFxyXG4gICAgYmFzZU9wdGlvbnM6IFdNVFNEYXRhU291cmNlT3B0aW9ucyxcclxuICAgIGNhcGFiaWxpdGllczogYW55XHJcbiAgKTogV01UU0RhdGFTb3VyY2VPcHRpb25zIHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSBvcHRpb25zRnJvbUNhcGFiaWxpdGllcyhjYXBhYmlsaXRpZXMsIGJhc2VPcHRpb25zKTtcclxuXHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihvcHRpb25zLCBiYXNlT3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHBhcnNlQ2FydG9PcHRpb25zKFxyXG4gICAgYmFzZU9wdGlvbnM6IENhcnRvRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgICBjYXJ0b09wdGlvbnM6IGFueVxyXG4gICk6IENhcnRvRGF0YVNvdXJjZU9wdGlvbnMge1xyXG4gICAgY29uc3QgbGF5ZXJzID0gW107XHJcbiAgICBjb25zdCBwYXJhbXMgPSBjYXJ0b09wdGlvbnMubGF5ZXJzWzFdLm9wdGlvbnMubGF5ZXJfZGVmaW5pdGlvbjtcclxuICAgIHBhcmFtcy5sYXllcnMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgbGF5ZXJzLnB1c2goe1xyXG4gICAgICAgIHR5cGU6IGVsZW1lbnQudHlwZS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICAgIG9wdGlvbnM6IGVsZW1lbnQub3B0aW9ucyxcclxuICAgICAgICBsZWdlbmQ6IGVsZW1lbnQubGVnZW5kXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBjb25zdCBvcHRpb25zID0gT2JqZWN0VXRpbHMucmVtb3ZlVW5kZWZpbmVkKHtcclxuICAgICAgY29uZmlnOiB7XHJcbiAgICAgICAgdmVyc2lvbjogcGFyYW1zLnZlcnNpb24sXHJcbiAgICAgICAgbGF5ZXJzXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIE9iamVjdFV0aWxzLm1lcmdlRGVlcChvcHRpb25zLCBiYXNlT3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHBhcnNlQXJjZ2lzT3B0aW9ucyhcclxuICAgIGJhc2VPcHRpb25zOiBBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgICBhcmNnaXNPcHRpb25zOiBhbnksXHJcbiAgICBsZWdlbmQ/OiBhbnlcclxuICApOiBBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnMge1xyXG4gICAgY29uc3QgbGVnZW5kSW5mbyA9IGxlZ2VuZC5sYXllcnMgPyBsZWdlbmQgOiB1bmRlZmluZWQ7XHJcbiAgICBjb25zdCBzdHlsZUdlbmVyYXRvciA9IG5ldyBFc3JpU3R5bGVHZW5lcmF0b3IoKTtcclxuICAgIGNvbnN0IHVuaXRzID0gYXJjZ2lzT3B0aW9ucy51bml0cyA9PT0gJ2VzcmlNZXRlcnMnID8gJ20nIDogJ2RlZ3JlZXMnO1xyXG4gICAgY29uc3Qgc3R5bGUgPSBzdHlsZUdlbmVyYXRvci5nZW5lcmF0ZVN0eWxlKGFyY2dpc09wdGlvbnMsIHVuaXRzKTtcclxuICAgIGNvbnN0IGF0dHJpYnV0aW9ucyA9IG5ldyBvbEF0dHJpYnV0aW9uKHtcclxuICAgICAgaHRtbDogYXJjZ2lzT3B0aW9ucy5jb3B5cmlnaHRUZXh0XHJcbiAgICB9KTtcclxuICAgIGxldCB0aW1lRXh0ZW50O1xyXG4gICAgbGV0IHRpbWVGaWx0ZXI7XHJcbiAgICBpZiAoYXJjZ2lzT3B0aW9ucy50aW1lSW5mbykge1xyXG4gICAgICBjb25zdCB0aW1lID0gYXJjZ2lzT3B0aW9ucy50aW1lSW5mby50aW1lRXh0ZW50O1xyXG4gICAgICB0aW1lRXh0ZW50ID0gdGltZVswXSArICcsJyArIHRpbWVbMV07XHJcbiAgICAgIGNvbnN0IG1pbiA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIG1pbi5zZXRUaW1lKHRpbWVbMF0pO1xyXG4gICAgICBjb25zdCBtYXggPSBuZXcgRGF0ZSgpO1xyXG4gICAgICBtYXguc2V0VGltZSh0aW1lWzFdKTtcclxuICAgICAgdGltZUZpbHRlciA9IHtcclxuICAgICAgICBtaW46IG1pbi50b1VUQ1N0cmluZygpLFxyXG4gICAgICAgIG1heDogbWF4LnRvVVRDU3RyaW5nKCksXHJcbiAgICAgICAgcmFuZ2U6IHRydWUsXHJcbiAgICAgICAgdHlwZTogVGltZUZpbHRlclR5cGUuREFURVRJTUUsXHJcbiAgICAgICAgc3R5bGU6IFRpbWVGaWx0ZXJTdHlsZS5DQUxFTkRBUlxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmFzc2lnbihcclxuICAgICAge30sXHJcbiAgICAgIHtcclxuICAgICAgICBsZWdlbmRJbmZvLFxyXG4gICAgICAgIHN0eWxlLFxyXG4gICAgICAgIHRpbWVGaWx0ZXIsXHJcbiAgICAgICAgdGltZUV4dGVudCxcclxuICAgICAgICBhdHRyaWJ1dGlvbnNcclxuICAgICAgfVxyXG4gICAgKTtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSBPYmplY3RVdGlscy5yZW1vdmVVbmRlZmluZWQoe1xyXG4gICAgICBwYXJhbXNcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIE9iamVjdFV0aWxzLm1lcmdlRGVlcChvcHRpb25zLCBiYXNlT3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHBhcnNlVGlsZUFyY2dpc09wdGlvbnMoXHJcbiAgICBiYXNlT3B0aW9uczogVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9ucyxcclxuICAgIGFyY2dpc09wdGlvbnM6IGFueSxcclxuICAgIGxlZ2VuZDogYW55XHJcbiAgKTogVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9ucyB7XHJcbiAgICBjb25zdCBsZWdlbmRJbmZvID0gbGVnZW5kLmxheWVycyA/IGxlZ2VuZCA6IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IGF0dHJpYnV0aW9ucyA9IG5ldyBvbEF0dHJpYnV0aW9uKHtcclxuICAgICAgaHRtbDogYXJjZ2lzT3B0aW9ucy5jb3B5cmlnaHRUZXh0XHJcbiAgICB9KTtcclxuICAgIGxldCB0aW1lRXh0ZW50O1xyXG4gICAgbGV0IHRpbWVGaWx0ZXI7XHJcbiAgICBpZiAoYXJjZ2lzT3B0aW9ucy50aW1lSW5mbykge1xyXG4gICAgICBjb25zdCB0aW1lID0gYXJjZ2lzT3B0aW9ucy50aW1lSW5mby50aW1lRXh0ZW50O1xyXG4gICAgICB0aW1lRXh0ZW50ID0gdGltZVswXSArICcsJyArIHRpbWVbMV07XHJcbiAgICAgIGNvbnN0IG1pbiA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIG1pbi5zZXRUaW1lKHRpbWVbMF0pO1xyXG4gICAgICBjb25zdCBtYXggPSBuZXcgRGF0ZSgpO1xyXG4gICAgICBtYXguc2V0VGltZSh0aW1lWzFdKTtcclxuICAgICAgdGltZUZpbHRlciA9IHtcclxuICAgICAgICBtaW46IG1pbi50b1VUQ1N0cmluZygpLFxyXG4gICAgICAgIG1heDogbWF4LnRvVVRDU3RyaW5nKCksXHJcbiAgICAgICAgcmFuZ2U6IHRydWUsXHJcbiAgICAgICAgdHlwZTogVGltZUZpbHRlclR5cGUuREFURVRJTUUsXHJcbiAgICAgICAgc3R5bGU6IFRpbWVGaWx0ZXJTdHlsZS5DQUxFTkRBUlxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmFzc2lnbihcclxuICAgICAge30sXHJcbiAgICAgIHtcclxuICAgICAgICBsYXllcnM6ICdzaG93OicgKyBiYXNlT3B0aW9ucy5sYXllcixcclxuICAgICAgICB0aW1lOiB0aW1lRXh0ZW50XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgICBjb25zdCBvcHRpb25zID0gT2JqZWN0VXRpbHMucmVtb3ZlVW5kZWZpbmVkKHtcclxuICAgICAgcGFyYW1zLFxyXG4gICAgICBsZWdlbmRJbmZvLFxyXG4gICAgICB0aW1lRmlsdGVyLFxyXG4gICAgICBhdHRyaWJ1dGlvbnNcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIE9iamVjdFV0aWxzLm1lcmdlRGVlcChvcHRpb25zLCBiYXNlT3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZpbmREYXRhU291cmNlSW5DYXBhYmlsaXRpZXMobGF5ZXJBcnJheSwgbmFtZSk6IGFueSB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShsYXllckFycmF5KSkge1xyXG4gICAgICBsZXQgbGF5ZXI7XHJcbiAgICAgIGxheWVyQXJyYXkuZmluZCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgbGF5ZXIgPSB0aGlzLmZpbmREYXRhU291cmNlSW5DYXBhYmlsaXRpZXModmFsdWUsIG5hbWUpO1xyXG4gICAgICAgIHJldHVybiBsYXllciAhPT0gdW5kZWZpbmVkO1xyXG4gICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgIHJldHVybiBsYXllcjtcclxuICAgIH0gZWxzZSBpZiAobGF5ZXJBcnJheS5MYXllcikge1xyXG4gICAgICByZXR1cm4gdGhpcy5maW5kRGF0YVNvdXJjZUluQ2FwYWJpbGl0aWVzKGxheWVyQXJyYXkuTGF5ZXIsIG5hbWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGxheWVyQXJyYXkuTmFtZSAmJiBsYXllckFycmF5Lk5hbWUgPT09IG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gbGF5ZXJBcnJheTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0VGltZUZpbHRlcihsYXllcikge1xyXG4gICAgbGV0IGRpbWVuc2lvbjtcclxuXHJcbiAgICBpZiAobGF5ZXIuRGltZW5zaW9uKSB7XHJcbiAgICAgIGNvbnN0IHRpbWVGaWx0ZXI6IGFueSA9IHt9O1xyXG4gICAgICBkaW1lbnNpb24gPSBsYXllci5EaW1lbnNpb25bMF07XHJcblxyXG4gICAgICBpZiAoZGltZW5zaW9uLnZhbHVlcykge1xyXG4gICAgICAgIGNvbnN0IG1pbk1heERpbSA9IGRpbWVuc2lvbi52YWx1ZXMuc3BsaXQoJy8nKTtcclxuICAgICAgICB0aW1lRmlsdGVyLm1pbiA9IG1pbk1heERpbVswXSAhPT0gdW5kZWZpbmVkID8gbWluTWF4RGltWzBdIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIHRpbWVGaWx0ZXIubWF4ID0gbWluTWF4RGltWzFdICE9PSB1bmRlZmluZWQgPyBtaW5NYXhEaW1bMV0gOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGltZUZpbHRlci5zdGVwID0gbWluTWF4RGltWzJdICE9PSB1bmRlZmluZWQgPyBtaW5NYXhEaW1bMl0gOiB1bmRlZmluZWQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkaW1lbnNpb24uZGVmYXVsdCkge1xyXG4gICAgICAgIHRpbWVGaWx0ZXIudmFsdWUgPSBkaW1lbnNpb24uZGVmYXVsdDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGltZUZpbHRlcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFN0eWxlKFN0eWxlKTogTGVnZW5kT3B0aW9ucyB7XHJcbiAgICBjb25zdCBzdHlsZU9wdGlvbnM6IEl0ZW1TdHlsZU9wdGlvbnNbXSA9IFN0eWxlLm1hcChzdHlsZSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogc3R5bGUuTmFtZSxcclxuICAgICAgICB0aXRsZTogc3R5bGUuVGl0bGVcclxuICAgICAgfTtcclxuICAgIH0pXHJcbiAgICAgIC8vIEhhbmRsZSByZXBlYXQgdGhlIHN0eWxlIFwiZGVmYXVsdFwiIGluIG91dHB1dCAgKE1hcFNlcnZlciBvciBPcGVuTGF5ZXIpXHJcbiAgICAgIC5maWx0ZXIoXHJcbiAgICAgICAgKGl0ZW0sIGluZGV4LCBzZWxmKSA9PlxyXG4gICAgICAgICAgc2VsZi5maW5kSW5kZXgoKGk6IEl0ZW1TdHlsZU9wdGlvbnMpID0+IGkubmFtZSA9PT0gaXRlbS5uYW1lKSA9PT1cclxuICAgICAgICAgIGluZGV4XHJcbiAgICAgICk7XHJcblxyXG4gICAgY29uc3QgbGVnZW5kT3B0aW9uczogTGVnZW5kT3B0aW9ucyA9IHtcclxuICAgICAgc3R5bGVzQXZhaWxhYmxlOiBzdHlsZU9wdGlvbnNcclxuICAgIH0gYXMgTGVnZW5kT3B0aW9ucztcclxuXHJcbiAgICByZXR1cm4gbGVnZW5kT3B0aW9ucztcclxuICB9XHJcbn1cclxuIl19