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
const TypeCapabilities = {
    wms: 'wms',
    wmts: 'wmts',
};
export { TypeCapabilities };
export class CapabilitiesService {
    /**
     * @param {?} http
     */
    constructor(http) {
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
        })), catchError((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            e.error.caught = true;
            throw e;
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
            throw {
                error: {
                    message: 'Layer not found'
                }
            };
        }
        /** @type {?} */
        const metadata = layer.DataURL ? layer.DataURL[0] : undefined;
        /** @type {?} */
        const abstract = layer.Abstract ? layer.Abstract : undefined;
        /** @type {?} */
        const keywordList = layer.KeywordList ? layer.KeywordList : undefined;
        /** @type {?} */
        let queryable = layer.queryable;
        /** @type {?} */
        const timeFilter = this.getTimeFilter(layer);
        /** @type {?} */
        const timeFilterable = timeFilter && Object.keys(timeFilter).length > 0;
        /** @type {?} */
        const legendOptions = layer.Style ? this.getStyle(layer.Style) : undefined;
        /** @type {?} */
        let queryFormat;
        /** @type {?} */
        const queryFormatMimeTypePriority = [
            QueryFormatMimeType.GEOJSON,
            QueryFormatMimeType.GEOJSON2,
            QueryFormatMimeType.GML3,
            QueryFormatMimeType.GML2,
            QueryFormatMimeType.JSON,
            QueryFormatMimeType.HTML
        ];
        for (const mimeType of queryFormatMimeTypePriority) {
            if (capabilities.Capability.Request.GetFeatureInfo.Format.indexOf(mimeType) !== -1) {
                /** @type {?} */
                const keyEnum = Object.keys(QueryFormatMimeType).find((/**
                 * @param {?} key
                 * @return {?}
                 */
                key => QueryFormatMimeType[key] === mimeType));
                queryFormat = QueryFormat[keyEnum];
                break;
            }
        }
        if (!queryFormat) {
            queryable = false;
        }
        /** @type {?} */
        const options = ObjectUtils.removeUndefined({
            _layerOptionsFromSource: {
                title: layer.Title,
                maxResolution: getResolutionFromScale(layer.MaxScaleDenominator),
                minResolution: getResolutionFromScale(layer.MinScaleDenominator),
                metadata: {
                    url: metadata ? metadata.OnlineResource : undefined,
                    extern: metadata ? true : undefined,
                    abstract,
                    keywordList
                },
                legendOptions
            },
            queryable,
            queryFormat,
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
        // Put Title source in _layerOptionsFromSource. (For source & catalog in _layerOptionsFromSource, if not already on config)
        /** @type {?} */
        const layer = capabilities.Contents.Layer.find((/**
         * @param {?} el
         * @return {?}
         */
        el => el.Identifier === baseOptions.layer));
        /** @type {?} */
        const options = optionsFromCapabilities(capabilities, baseOptions);
        /** @type {?} */
        const ouputOptions = Object.assign(options, baseOptions);
        /** @type {?} */
        const sourceOptions = ObjectUtils.removeUndefined({
            _layerOptionsFromSource: {
                title: layer.Title
            }
        });
        return ObjectUtils.mergeDeep(sourceOptions, ouputOptions);
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
    CapabilitiesService.prototype.parsers;
    /**
     * @type {?}
     * @private
     */
    CapabilitiesService.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FwYWJpbGl0aWVzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvY2FwYWJpbGl0aWVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzlELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzVELE9BQU8sYUFBYSxNQUFNLHdCQUF3QixDQUFDO0FBRW5ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ25ELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ25FLE9BQU8sRUFDTCxXQUFXLEVBQ1gsbUJBQW1CLEVBQ3BCLE1BQU0sZ0NBQWdDLENBQUM7QUFheEMsT0FBTyxFQUNMLGNBQWMsRUFDZCxlQUFlLEVBQ2hCLE1BQU0sc0NBQXNDLENBQUM7Ozs7O0lBRzVDLEtBQU0sS0FBSztJQUNYLE1BQU8sTUFBTTs7O0FBUWYsTUFBTSxPQUFPLG1CQUFtQjs7OztJQU05QixZQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBTDVCLFlBQU8s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RCxzQ0FHRTs7Ozs7SUFFVSxtQ0FBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIGZvcmtKb2luLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAsIGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IENhY2hlYWJsZSB9IGZyb20gJ25neC1jYWNoZWFibGUnO1xyXG5cclxuaW1wb3J0IHsgV01TQ2FwYWJpbGl0aWVzLCBXTVRTQ2FwYWJpbGl0aWVzIH0gZnJvbSAnb2wvZm9ybWF0JztcclxuaW1wb3J0IHsgb3B0aW9uc0Zyb21DYXBhYmlsaXRpZXMgfSBmcm9tICdvbC9zb3VyY2UvV01UUy5qcyc7XHJcbmltcG9ydCBvbEF0dHJpYnV0aW9uIGZyb20gJ29sL2NvbnRyb2wvQXR0cmlidXRpb24nO1xyXG5cclxuaW1wb3J0IHsgT2JqZWN0VXRpbHMgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcbmltcG9ydCB7IGdldFJlc29sdXRpb25Gcm9tU2NhbGUgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5pbXBvcnQgeyBFc3JpU3R5bGVHZW5lcmF0b3IgfSBmcm9tICcuLi91dGlscy9lc3JpLXN0eWxlLWdlbmVyYXRvcic7XHJcbmltcG9ydCB7XHJcbiAgUXVlcnlGb3JtYXQsXHJcbiAgUXVlcnlGb3JtYXRNaW1lVHlwZVxyXG59IGZyb20gJy4uLy4uL3F1ZXJ5L3NoYXJlZC9xdWVyeS5lbnVtcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gIFdNVFNEYXRhU291cmNlT3B0aW9ucyxcclxuICBXTVNEYXRhU291cmNlT3B0aW9ucyxcclxuICBDYXJ0b0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gIEFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9ucyxcclxuICBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zXHJcbn0gZnJvbSAnLi9kYXRhc291cmNlcyc7XHJcbmltcG9ydCB7XHJcbiAgTGVnZW5kT3B0aW9ucyxcclxuICBJdGVtU3R5bGVPcHRpb25zXHJcbn0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllci5pbnRlcmZhY2UnO1xyXG5pbXBvcnQge1xyXG4gIFRpbWVGaWx0ZXJUeXBlLFxyXG4gIFRpbWVGaWx0ZXJTdHlsZVxyXG59IGZyb20gJy4uLy4uL2ZpbHRlci9zaGFyZWQvdGltZS1maWx0ZXIuZW51bSc7XHJcblxyXG5leHBvcnQgZW51bSBUeXBlQ2FwYWJpbGl0aWVzIHtcclxuICB3bXMgPSAnd21zJyxcclxuICB3bXRzID0gJ3dtdHMnXHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFR5cGVDYXBhYmlsaXRpZXNTdHJpbmdzID0ga2V5b2YgdHlwZW9mIFR5cGVDYXBhYmlsaXRpZXM7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYXBhYmlsaXRpZXNTZXJ2aWNlIHtcclxuICBwcml2YXRlIHBhcnNlcnMgPSB7XHJcbiAgICB3bXM6IG5ldyBXTVNDYXBhYmlsaXRpZXMoKSxcclxuICAgIHdtdHM6IG5ldyBXTVRTQ2FwYWJpbGl0aWVzKClcclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHt9XHJcblxyXG4gIGdldFdNU09wdGlvbnMoXHJcbiAgICBiYXNlT3B0aW9uczogV01TRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFdNU0RhdGFTb3VyY2VPcHRpb25zPiB7XHJcbiAgICBjb25zdCB1cmwgPSBiYXNlT3B0aW9ucy51cmw7XHJcbiAgICBjb25zdCB2ZXJzaW9uID0gKGJhc2VPcHRpb25zLnBhcmFtcyBhcyBhbnkpLlZFUlNJT047XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2FwYWJpbGl0aWVzKCd3bXMnLCB1cmwsIHZlcnNpb24pLnBpcGUoXHJcbiAgICAgIG1hcCgoY2FwYWJpbGl0aWVzOiBhbnkpID0+IHtcclxuICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzXHJcbiAgICAgICAgICA/IHRoaXMucGFyc2VXTVNPcHRpb25zKGJhc2VPcHRpb25zLCBjYXBhYmlsaXRpZXMpXHJcbiAgICAgICAgICA6IHVuZGVmaW5lZDtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXRXTVRTT3B0aW9ucyhcclxuICAgIGJhc2VPcHRpb25zOiBXTVRTRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFdNVFNEYXRhU291cmNlT3B0aW9ucz4ge1xyXG4gICAgY29uc3QgdXJsID0gYmFzZU9wdGlvbnMudXJsO1xyXG4gICAgY29uc3QgdmVyc2lvbiA9IGJhc2VPcHRpb25zLnZlcnNpb247XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuZ2V0Q2FwYWJpbGl0aWVzKCd3bXRzJywgdXJsLCB2ZXJzaW9uKS5waXBlKFxyXG4gICAgICBtYXAoKGNhcGFiaWxpdGllczogYW55KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllc1xyXG4gICAgICAgICAgPyB0aGlzLnBhcnNlV01UU09wdGlvbnMoYmFzZU9wdGlvbnMsIGNhcGFiaWxpdGllcylcclxuICAgICAgICAgIDogdW5kZWZpbmVkO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gb3B0aW9ucztcclxuICB9XHJcblxyXG4gIGdldENhcnRvT3B0aW9ucyhcclxuICAgIGJhc2VPcHRpb25zOiBDYXJ0b0RhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxDYXJ0b0RhdGFTb3VyY2VPcHRpb25zPiB7XHJcbiAgICBjb25zdCBiYXNlVXJsID1cclxuICAgICAgJ2h0dHBzOi8vJyArXHJcbiAgICAgIGJhc2VPcHRpb25zLmFjY291bnQgK1xyXG4gICAgICAnLmNhcnRvLmNvbS9hcGkvdjIvdml6LycgK1xyXG4gICAgICBiYXNlT3B0aW9ucy5tYXBJZCArXHJcbiAgICAgICcvdml6Lmpzb24nO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLmpzb25wKGJhc2VVcmwsICdjYWxsYmFjaycpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcCgoY2FydG9PcHRpb25zOiBhbnkpID0+XHJcbiAgICAgICAgICB0aGlzLnBhcnNlQ2FydG9PcHRpb25zKGJhc2VPcHRpb25zLCBjYXJ0b09wdGlvbnMpXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0QXJjZ2lzT3B0aW9ucyhcclxuICAgIGJhc2VPcHRpb25zOiBBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPEFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9ucz4ge1xyXG4gICAgY29uc3QgYmFzZVVybCA9IGJhc2VPcHRpb25zLnVybCArICcvJyArIGJhc2VPcHRpb25zLmxheWVyICsgJz9mPWpzb24nO1xyXG4gICAgY29uc3QgbW9kaWZpZWRVcmwgPSBiYXNlT3B0aW9ucy51cmwucmVwbGFjZSgnRmVhdHVyZVNlcnZlcicsICdNYXBTZXJ2ZXInKTtcclxuICAgIGNvbnN0IGxlZ2VuZFVybCA9IG1vZGlmaWVkVXJsICsgJy9sZWdlbmQ/Zj1qc29uJztcclxuICAgIGNvbnN0IGFyY2dpc09wdGlvbnMgPSB0aGlzLmh0dHAuZ2V0KGJhc2VVcmwpO1xyXG4gICAgY29uc3QgbGVnZW5kID0gdGhpcy5odHRwLmdldChsZWdlbmRVcmwpLnBpcGUoXHJcbiAgICAgIG1hcCgocmVzOiBhbnkpID0+IHJlcyksXHJcbiAgICAgIGNhdGNoRXJyb3IoZXJyID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygnTm8gbGVnZW5kIGFzc29jaWF0ZWQgd2l0aCB0aGlzIEZlYXR1cmUgU2VydmljZScpO1xyXG4gICAgICAgIHJldHVybiBvZihlcnIpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICAgIHJldHVybiBmb3JrSm9pbihbYXJjZ2lzT3B0aW9ucywgbGVnZW5kXSkucGlwZShcclxuICAgICAgbWFwKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlQXJjZ2lzT3B0aW9ucyhiYXNlT3B0aW9ucywgcmVzWzBdLCByZXNbMV0pO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdldFRpbGVBcmNnaXNPcHRpb25zKFxyXG4gICAgYmFzZU9wdGlvbnM6IFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnM+IHtcclxuICAgIGNvbnN0IGJhc2VVcmwgPSBiYXNlT3B0aW9ucy51cmwgKyAnLycgKyBiYXNlT3B0aW9ucy5sYXllciArICc/Zj1qc29uJztcclxuICAgIGNvbnN0IGxlZ2VuZFVybCA9IGJhc2VPcHRpb25zLnVybCArICcvbGVnZW5kP2Y9anNvbic7XHJcbiAgICBjb25zdCBhcmNnaXNPcHRpb25zID0gdGhpcy5odHRwLmdldChiYXNlVXJsKTtcclxuICAgIGNvbnN0IGxlZ2VuZEluZm8gPSB0aGlzLmh0dHAuZ2V0KGxlZ2VuZFVybCk7XHJcblxyXG4gICAgcmV0dXJuIGZvcmtKb2luKFthcmNnaXNPcHRpb25zLCBsZWdlbmRJbmZvXSkucGlwZShcclxuICAgICAgbWFwKChyZXM6IGFueSkgPT5cclxuICAgICAgICB0aGlzLnBhcnNlVGlsZUFyY2dpc09wdGlvbnMoYmFzZU9wdGlvbnMsIHJlc1swXSwgcmVzWzFdKVxyXG4gICAgICApXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgQENhY2hlYWJsZSh7XHJcbiAgICBtYXhDYWNoZUNvdW50OiAyMFxyXG4gIH0pXHJcbiAgZ2V0Q2FwYWJpbGl0aWVzKFxyXG4gICAgc2VydmljZTogVHlwZUNhcGFiaWxpdGllc1N0cmluZ3MsXHJcbiAgICBiYXNlVXJsOiBzdHJpbmcsXHJcbiAgICB2ZXJzaW9uPzogc3RyaW5nXHJcbiAgKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKHtcclxuICAgICAgZnJvbU9iamVjdDoge1xyXG4gICAgICAgIHJlcXVlc3Q6ICdHZXRDYXBhYmlsaXRpZXMnLFxyXG4gICAgICAgIHNlcnZpY2U6IHNlcnZpY2UudG9VcHBlckNhc2UoKSxcclxuICAgICAgICB2ZXJzaW9uOiB2ZXJzaW9uIHx8ICcxLjMuMCcsXHJcbiAgICAgICAgX2k6ICd0cnVlJ1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCByZXF1ZXN0ID0gdGhpcy5odHRwLmdldChiYXNlVXJsLCB7XHJcbiAgICAgIHBhcmFtcyxcclxuICAgICAgcmVzcG9uc2VUeXBlOiAndGV4dCdcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiByZXF1ZXN0LnBpcGUoXHJcbiAgICAgIG1hcChyZXMgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZXJzW3NlcnZpY2VdLnJlYWQocmVzKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgfSksXHJcbiAgICAgIGNhdGNoRXJyb3IoZSA9PiB7XHJcbiAgICAgICAgZS5lcnJvci5jYXVnaHQgPSB0cnVlO1xyXG4gICAgICAgIHRocm93IGU7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwYXJzZVdNU09wdGlvbnMoXHJcbiAgICBiYXNlT3B0aW9uczogV01TRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgICBjYXBhYmlsaXRpZXM6IGFueVxyXG4gICk6IFdNU0RhdGFTb3VyY2VPcHRpb25zIHtcclxuICAgIGNvbnN0IGxheWVycyA9IChiYXNlT3B0aW9ucy5wYXJhbXMgYXMgYW55KS5MQVlFUlM7XHJcbiAgICBjb25zdCBsYXllciA9IHRoaXMuZmluZERhdGFTb3VyY2VJbkNhcGFiaWxpdGllcyhcclxuICAgICAgY2FwYWJpbGl0aWVzLkNhcGFiaWxpdHkuTGF5ZXIsXHJcbiAgICAgIGxheWVyc1xyXG4gICAgKTtcclxuXHJcbiAgICBpZiAoIWxheWVyKSB7XHJcbiAgICAgIHRocm93IHtcclxuICAgICAgICBlcnJvcjoge1xyXG4gICAgICAgICAgbWVzc2FnZTogJ0xheWVyIG5vdCBmb3VuZCdcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjb25zdCBtZXRhZGF0YSA9IGxheWVyLkRhdGFVUkwgPyBsYXllci5EYXRhVVJMWzBdIDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgYWJzdHJhY3QgPSBsYXllci5BYnN0cmFjdCA/IGxheWVyLkFic3RyYWN0IDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3Qga2V5d29yZExpc3QgPSBsYXllci5LZXl3b3JkTGlzdCA/IGxheWVyLktleXdvcmRMaXN0IDogdW5kZWZpbmVkO1xyXG4gICAgbGV0IHF1ZXJ5YWJsZSA9IGxheWVyLnF1ZXJ5YWJsZTtcclxuICAgIGNvbnN0IHRpbWVGaWx0ZXIgPSB0aGlzLmdldFRpbWVGaWx0ZXIobGF5ZXIpO1xyXG4gICAgY29uc3QgdGltZUZpbHRlcmFibGUgPSB0aW1lRmlsdGVyICYmIE9iamVjdC5rZXlzKHRpbWVGaWx0ZXIpLmxlbmd0aCA+IDA7XHJcbiAgICBjb25zdCBsZWdlbmRPcHRpb25zID0gbGF5ZXIuU3R5bGUgPyB0aGlzLmdldFN0eWxlKGxheWVyLlN0eWxlKSA6IHVuZGVmaW5lZDtcclxuXHJcbiAgICBsZXQgcXVlcnlGb3JtYXQ6IFF1ZXJ5Rm9ybWF0O1xyXG4gICAgY29uc3QgcXVlcnlGb3JtYXRNaW1lVHlwZVByaW9yaXR5ID0gW1xyXG4gICAgICBRdWVyeUZvcm1hdE1pbWVUeXBlLkdFT0pTT04sXHJcbiAgICAgIFF1ZXJ5Rm9ybWF0TWltZVR5cGUuR0VPSlNPTjIsXHJcbiAgICAgIFF1ZXJ5Rm9ybWF0TWltZVR5cGUuR01MMyxcclxuICAgICAgUXVlcnlGb3JtYXRNaW1lVHlwZS5HTUwyLFxyXG4gICAgICBRdWVyeUZvcm1hdE1pbWVUeXBlLkpTT04sXHJcbiAgICAgIFF1ZXJ5Rm9ybWF0TWltZVR5cGUuSFRNTFxyXG4gICAgXTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IG1pbWVUeXBlIG9mIHF1ZXJ5Rm9ybWF0TWltZVR5cGVQcmlvcml0eSkge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgY2FwYWJpbGl0aWVzLkNhcGFiaWxpdHkuUmVxdWVzdC5HZXRGZWF0dXJlSW5mby5Gb3JtYXQuaW5kZXhPZihcclxuICAgICAgICAgIG1pbWVUeXBlXHJcbiAgICAgICAgKSAhPT0gLTFcclxuICAgICAgKSB7XHJcbiAgICAgICAgY29uc3Qga2V5RW51bSA9IE9iamVjdC5rZXlzKFF1ZXJ5Rm9ybWF0TWltZVR5cGUpLmZpbmQoXHJcbiAgICAgICAgICBrZXkgPT4gUXVlcnlGb3JtYXRNaW1lVHlwZVtrZXldID09PSBtaW1lVHlwZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcXVlcnlGb3JtYXQgPSBRdWVyeUZvcm1hdFtrZXlFbnVtXTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKCFxdWVyeUZvcm1hdCkge1xyXG4gICAgICBxdWVyeWFibGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvcHRpb25zOiBXTVNEYXRhU291cmNlT3B0aW9ucyA9IE9iamVjdFV0aWxzLnJlbW92ZVVuZGVmaW5lZCh7XHJcbiAgICAgIF9sYXllck9wdGlvbnNGcm9tU291cmNlOiB7XHJcbiAgICAgICAgdGl0bGU6IGxheWVyLlRpdGxlLFxyXG4gICAgICAgIG1heFJlc29sdXRpb246IGdldFJlc29sdXRpb25Gcm9tU2NhbGUobGF5ZXIuTWF4U2NhbGVEZW5vbWluYXRvciksXHJcbiAgICAgICAgbWluUmVzb2x1dGlvbjogZ2V0UmVzb2x1dGlvbkZyb21TY2FsZShsYXllci5NaW5TY2FsZURlbm9taW5hdG9yKSxcclxuICAgICAgICBtZXRhZGF0YToge1xyXG4gICAgICAgICAgdXJsOiBtZXRhZGF0YSA/IG1ldGFkYXRhLk9ubGluZVJlc291cmNlIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgZXh0ZXJuOiBtZXRhZGF0YSA/IHRydWUgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICBhYnN0cmFjdCxcclxuICAgICAgICAgIGtleXdvcmRMaXN0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBsZWdlbmRPcHRpb25zXHJcbiAgICAgIH0sXHJcbiAgICAgIHF1ZXJ5YWJsZSxcclxuICAgICAgcXVlcnlGb3JtYXQsXHJcbiAgICAgIHRpbWVGaWx0ZXI6IHRpbWVGaWx0ZXJhYmxlID8gdGltZUZpbHRlciA6IHVuZGVmaW5lZCxcclxuICAgICAgdGltZUZpbHRlcmFibGU6IHRpbWVGaWx0ZXJhYmxlID8gdHJ1ZSA6IHVuZGVmaW5lZFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIE9iamVjdFV0aWxzLm1lcmdlRGVlcChvcHRpb25zLCBiYXNlT3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHBhcnNlV01UU09wdGlvbnMoXHJcbiAgICBiYXNlT3B0aW9uczogV01UU0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gICAgY2FwYWJpbGl0aWVzOiBhbnlcclxuICApOiBXTVRTRGF0YVNvdXJjZU9wdGlvbnMge1xyXG5cclxuICAgIC8vIFB1dCBUaXRsZSBzb3VyY2UgaW4gX2xheWVyT3B0aW9uc0Zyb21Tb3VyY2UuIChGb3Igc291cmNlICYgY2F0YWxvZyBpbiBfbGF5ZXJPcHRpb25zRnJvbVNvdXJjZSwgaWYgbm90IGFscmVhZHkgb24gY29uZmlnKVxyXG4gICAgY29uc3QgbGF5ZXIgPSBjYXBhYmlsaXRpZXMuQ29udGVudHMuTGF5ZXIuZmluZChlbCA9PiBlbC5JZGVudGlmaWVyID09PSBiYXNlT3B0aW9ucy5sYXllcik7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IG9wdGlvbnNGcm9tQ2FwYWJpbGl0aWVzKGNhcGFiaWxpdGllcywgYmFzZU9wdGlvbnMpO1xyXG5cclxuICAgIGNvbnN0IG91cHV0T3B0aW9ucyA9IE9iamVjdC5hc3NpZ24ob3B0aW9ucywgYmFzZU9wdGlvbnMpO1xyXG4gICAgY29uc3Qgc291cmNlT3B0aW9ucyA9IE9iamVjdFV0aWxzLnJlbW92ZVVuZGVmaW5lZCh7XHJcbiAgICAgIF9sYXllck9wdGlvbnNGcm9tU291cmNlOiB7XHJcbiAgICAgICAgdGl0bGU6IGxheWVyLlRpdGxlfX0pO1xyXG5cclxuICAgIHJldHVybiBPYmplY3RVdGlscy5tZXJnZURlZXAoc291cmNlT3B0aW9ucywgb3VwdXRPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcGFyc2VDYXJ0b09wdGlvbnMoXHJcbiAgICBiYXNlT3B0aW9uczogQ2FydG9EYXRhU291cmNlT3B0aW9ucyxcclxuICAgIGNhcnRvT3B0aW9uczogYW55XHJcbiAgKTogQ2FydG9EYXRhU291cmNlT3B0aW9ucyB7XHJcbiAgICBjb25zdCBsYXllcnMgPSBbXTtcclxuICAgIGNvbnN0IHBhcmFtcyA9IGNhcnRvT3B0aW9ucy5sYXllcnNbMV0ub3B0aW9ucy5sYXllcl9kZWZpbml0aW9uO1xyXG4gICAgcGFyYW1zLmxheWVycy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICBsYXllcnMucHVzaCh7XHJcbiAgICAgICAgdHlwZTogZWxlbWVudC50eXBlLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgb3B0aW9uczogZWxlbWVudC5vcHRpb25zLFxyXG4gICAgICAgIGxlZ2VuZDogZWxlbWVudC5sZWdlbmRcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSBPYmplY3RVdGlscy5yZW1vdmVVbmRlZmluZWQoe1xyXG4gICAgICBjb25maWc6IHtcclxuICAgICAgICB2ZXJzaW9uOiBwYXJhbXMudmVyc2lvbixcclxuICAgICAgICBsYXllcnNcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gT2JqZWN0VXRpbHMubWVyZ2VEZWVwKG9wdGlvbnMsIGJhc2VPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcGFyc2VBcmNnaXNPcHRpb25zKFxyXG4gICAgYmFzZU9wdGlvbnM6IEFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9ucyxcclxuICAgIGFyY2dpc09wdGlvbnM6IGFueSxcclxuICAgIGxlZ2VuZD86IGFueVxyXG4gICk6IEFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9ucyB7XHJcbiAgICBjb25zdCBsZWdlbmRJbmZvID0gbGVnZW5kLmxheWVycyA/IGxlZ2VuZCA6IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IHN0eWxlR2VuZXJhdG9yID0gbmV3IEVzcmlTdHlsZUdlbmVyYXRvcigpO1xyXG4gICAgY29uc3QgdW5pdHMgPSBhcmNnaXNPcHRpb25zLnVuaXRzID09PSAnZXNyaU1ldGVycycgPyAnbScgOiAnZGVncmVlcyc7XHJcbiAgICBjb25zdCBzdHlsZSA9IHN0eWxlR2VuZXJhdG9yLmdlbmVyYXRlU3R5bGUoYXJjZ2lzT3B0aW9ucywgdW5pdHMpO1xyXG4gICAgY29uc3QgYXR0cmlidXRpb25zID0gbmV3IG9sQXR0cmlidXRpb24oe1xyXG4gICAgICBodG1sOiBhcmNnaXNPcHRpb25zLmNvcHlyaWdodFRleHRcclxuICAgIH0pO1xyXG4gICAgbGV0IHRpbWVFeHRlbnQ7XHJcbiAgICBsZXQgdGltZUZpbHRlcjtcclxuICAgIGlmIChhcmNnaXNPcHRpb25zLnRpbWVJbmZvKSB7XHJcbiAgICAgIGNvbnN0IHRpbWUgPSBhcmNnaXNPcHRpb25zLnRpbWVJbmZvLnRpbWVFeHRlbnQ7XHJcbiAgICAgIHRpbWVFeHRlbnQgPSB0aW1lWzBdICsgJywnICsgdGltZVsxXTtcclxuICAgICAgY29uc3QgbWluID0gbmV3IERhdGUoKTtcclxuICAgICAgbWluLnNldFRpbWUodGltZVswXSk7XHJcbiAgICAgIGNvbnN0IG1heCA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIG1heC5zZXRUaW1lKHRpbWVbMV0pO1xyXG4gICAgICB0aW1lRmlsdGVyID0ge1xyXG4gICAgICAgIG1pbjogbWluLnRvVVRDU3RyaW5nKCksXHJcbiAgICAgICAgbWF4OiBtYXgudG9VVENTdHJpbmcoKSxcclxuICAgICAgICByYW5nZTogdHJ1ZSxcclxuICAgICAgICB0eXBlOiBUaW1lRmlsdGVyVHlwZS5EQVRFVElNRSxcclxuICAgICAgICBzdHlsZTogVGltZUZpbHRlclN0eWxlLkNBTEVOREFSXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjb25zdCBwYXJhbXMgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgICB7fSxcclxuICAgICAge1xyXG4gICAgICAgIGxlZ2VuZEluZm8sXHJcbiAgICAgICAgc3R5bGUsXHJcbiAgICAgICAgdGltZUZpbHRlcixcclxuICAgICAgICB0aW1lRXh0ZW50LFxyXG4gICAgICAgIGF0dHJpYnV0aW9uc1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IE9iamVjdFV0aWxzLnJlbW92ZVVuZGVmaW5lZCh7XHJcbiAgICAgIHBhcmFtc1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gT2JqZWN0VXRpbHMubWVyZ2VEZWVwKG9wdGlvbnMsIGJhc2VPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcGFyc2VUaWxlQXJjZ2lzT3B0aW9ucyhcclxuICAgIGJhc2VPcHRpb25zOiBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zLFxyXG4gICAgYXJjZ2lzT3B0aW9uczogYW55LFxyXG4gICAgbGVnZW5kOiBhbnlcclxuICApOiBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zIHtcclxuICAgIGNvbnN0IGxlZ2VuZEluZm8gPSBsZWdlbmQubGF5ZXJzID8gbGVnZW5kIDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgYXR0cmlidXRpb25zID0gbmV3IG9sQXR0cmlidXRpb24oe1xyXG4gICAgICBodG1sOiBhcmNnaXNPcHRpb25zLmNvcHlyaWdodFRleHRcclxuICAgIH0pO1xyXG4gICAgbGV0IHRpbWVFeHRlbnQ7XHJcbiAgICBsZXQgdGltZUZpbHRlcjtcclxuICAgIGlmIChhcmNnaXNPcHRpb25zLnRpbWVJbmZvKSB7XHJcbiAgICAgIGNvbnN0IHRpbWUgPSBhcmNnaXNPcHRpb25zLnRpbWVJbmZvLnRpbWVFeHRlbnQ7XHJcbiAgICAgIHRpbWVFeHRlbnQgPSB0aW1lWzBdICsgJywnICsgdGltZVsxXTtcclxuICAgICAgY29uc3QgbWluID0gbmV3IERhdGUoKTtcclxuICAgICAgbWluLnNldFRpbWUodGltZVswXSk7XHJcbiAgICAgIGNvbnN0IG1heCA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIG1heC5zZXRUaW1lKHRpbWVbMV0pO1xyXG4gICAgICB0aW1lRmlsdGVyID0ge1xyXG4gICAgICAgIG1pbjogbWluLnRvVVRDU3RyaW5nKCksXHJcbiAgICAgICAgbWF4OiBtYXgudG9VVENTdHJpbmcoKSxcclxuICAgICAgICByYW5nZTogdHJ1ZSxcclxuICAgICAgICB0eXBlOiBUaW1lRmlsdGVyVHlwZS5EQVRFVElNRSxcclxuICAgICAgICBzdHlsZTogVGltZUZpbHRlclN0eWxlLkNBTEVOREFSXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjb25zdCBwYXJhbXMgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgICB7fSxcclxuICAgICAge1xyXG4gICAgICAgIGxheWVyczogJ3Nob3c6JyArIGJhc2VPcHRpb25zLmxheWVyLFxyXG4gICAgICAgIHRpbWU6IHRpbWVFeHRlbnRcclxuICAgICAgfVxyXG4gICAgKTtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSBPYmplY3RVdGlscy5yZW1vdmVVbmRlZmluZWQoe1xyXG4gICAgICBwYXJhbXMsXHJcbiAgICAgIGxlZ2VuZEluZm8sXHJcbiAgICAgIHRpbWVGaWx0ZXIsXHJcbiAgICAgIGF0dHJpYnV0aW9uc1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gT2JqZWN0VXRpbHMubWVyZ2VEZWVwKG9wdGlvbnMsIGJhc2VPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZmluZERhdGFTb3VyY2VJbkNhcGFiaWxpdGllcyhsYXllckFycmF5LCBuYW1lKTogYW55IHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGxheWVyQXJyYXkpKSB7XHJcbiAgICAgIGxldCBsYXllcjtcclxuICAgICAgbGF5ZXJBcnJheS5maW5kKHZhbHVlID0+IHtcclxuICAgICAgICBsYXllciA9IHRoaXMuZmluZERhdGFTb3VyY2VJbkNhcGFiaWxpdGllcyh2YWx1ZSwgbmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIGxheWVyICE9PSB1bmRlZmluZWQ7XHJcbiAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgcmV0dXJuIGxheWVyO1xyXG4gICAgfSBlbHNlIGlmIChsYXllckFycmF5LkxheWVyKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmZpbmREYXRhU291cmNlSW5DYXBhYmlsaXRpZXMobGF5ZXJBcnJheS5MYXllciwgbmFtZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAobGF5ZXJBcnJheS5OYW1lICYmIGxheWVyQXJyYXkuTmFtZSA9PT0gbmFtZSkge1xyXG4gICAgICAgIHJldHVybiBsYXllckFycmF5O1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRUaW1lRmlsdGVyKGxheWVyKSB7XHJcbiAgICBsZXQgZGltZW5zaW9uO1xyXG5cclxuICAgIGlmIChsYXllci5EaW1lbnNpb24pIHtcclxuICAgICAgY29uc3QgdGltZUZpbHRlcjogYW55ID0ge307XHJcbiAgICAgIGRpbWVuc2lvbiA9IGxheWVyLkRpbWVuc2lvblswXTtcclxuXHJcbiAgICAgIGlmIChkaW1lbnNpb24udmFsdWVzKSB7XHJcbiAgICAgICAgY29uc3QgbWluTWF4RGltID0gZGltZW5zaW9uLnZhbHVlcy5zcGxpdCgnLycpO1xyXG4gICAgICAgIHRpbWVGaWx0ZXIubWluID0gbWluTWF4RGltWzBdICE9PSB1bmRlZmluZWQgPyBtaW5NYXhEaW1bMF0gOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGltZUZpbHRlci5tYXggPSBtaW5NYXhEaW1bMV0gIT09IHVuZGVmaW5lZCA/IG1pbk1heERpbVsxXSA6IHVuZGVmaW5lZDtcclxuICAgICAgICB0aW1lRmlsdGVyLnN0ZXAgPSBtaW5NYXhEaW1bMl0gIT09IHVuZGVmaW5lZCA/IG1pbk1heERpbVsyXSA6IHVuZGVmaW5lZDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRpbWVuc2lvbi5kZWZhdWx0KSB7XHJcbiAgICAgICAgdGltZUZpbHRlci52YWx1ZSA9IGRpbWVuc2lvbi5kZWZhdWx0O1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aW1lRmlsdGVyO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0U3R5bGUoU3R5bGUpOiBMZWdlbmRPcHRpb25zIHtcclxuICAgIGNvbnN0IHN0eWxlT3B0aW9uczogSXRlbVN0eWxlT3B0aW9uc1tdID0gU3R5bGUubWFwKHN0eWxlID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBuYW1lOiBzdHlsZS5OYW1lLFxyXG4gICAgICAgIHRpdGxlOiBzdHlsZS5UaXRsZVxyXG4gICAgICB9O1xyXG4gICAgfSlcclxuICAgICAgLy8gSGFuZGxlIHJlcGVhdCB0aGUgc3R5bGUgXCJkZWZhdWx0XCIgaW4gb3V0cHV0ICAoTWFwU2VydmVyIG9yIE9wZW5MYXllcilcclxuICAgICAgLmZpbHRlcihcclxuICAgICAgICAoaXRlbSwgaW5kZXgsIHNlbGYpID0+XHJcbiAgICAgICAgICBzZWxmLmZpbmRJbmRleCgoaTogSXRlbVN0eWxlT3B0aW9ucykgPT4gaS5uYW1lID09PSBpdGVtLm5hbWUpID09PVxyXG4gICAgICAgICAgaW5kZXhcclxuICAgICAgKTtcclxuXHJcbiAgICBjb25zdCBsZWdlbmRPcHRpb25zOiBMZWdlbmRPcHRpb25zID0ge1xyXG4gICAgICBzdHlsZXNBdmFpbGFibGU6IHN0eWxlT3B0aW9uc1xyXG4gICAgfSBhcyBMZWdlbmRPcHRpb25zO1xyXG5cclxuICAgIHJldHVybiBsZWdlbmRPcHRpb25zO1xyXG4gIH1cclxufVxyXG4iXX0=