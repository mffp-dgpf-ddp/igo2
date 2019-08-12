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
        const version = ((/** @type {?} */ (baseOptions.params))).version;
        return this.getCapabilities('wms', url, version).pipe(map((/**
         * @param {?} capabilities
         * @return {?}
         */
        (capabilities) => this.parseWMSOptions(baseOptions, capabilities))));
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
        (capabilities) => this.parseWMTSOptions(baseOptions, capabilities))));
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
                service,
                version: version || '1.3.0'
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
            /** @type {?} */
            const capabilities = this.parsers[service].read(res);
            return capabilities;
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
        const layers = ((/** @type {?} */ (baseOptions.params))).layers;
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
                }
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
                type: 'datetime',
                style: 'calendar'
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
                type: 'datetime',
                style: 'calendar'
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
    Cacheable(),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FwYWJpbGl0aWVzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvY2FwYWJpbGl0aWVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzlELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzVELE9BQU8sYUFBYSxNQUFNLHdCQUF3QixDQUFDO0FBRW5ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ25ELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtCQUErQixDQUFDOzs7QUFhbkUsTUFBTSxPQUFPLG1CQUFtQjs7OztJQU85QixZQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBTjVCLHNCQUFpQixHQUFVLEVBQUUsQ0FBQztRQUM5QixZQUFPLEdBQUc7WUFDaEIsR0FBRyxFQUFFLElBQUksZUFBZSxFQUFFO1lBQzFCLElBQUksRUFBRSxJQUFJLGdCQUFnQixFQUFFO1NBQzdCLENBQUM7SUFFcUMsQ0FBQzs7Ozs7SUFFeEMsYUFBYSxDQUNYLFdBQWlD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VSxHQUFRLEVBQUU7WUFDMUIsU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFL0IsSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFOztzQkFDZCxTQUFTLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUM3QyxVQUFVLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUN2RSxVQUFVLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUN2RSxVQUFVLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO2FBQ3pFO1lBRUQsSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFO2dCQUNyQixVQUFVLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUM7YUFDdEM7WUFDRCxPQUFPLFVBQVUsQ0FBQztTQUNuQjtJQUNILENBQUM7OztZQS9URixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUF2QlEsVUFBVTs7O0FBcUhqQjtJQURDLFNBQVMsRUFBRTs7OzRDQUtULFVBQVU7MERBb0JaOzs7Ozs7SUFwSEQsZ0RBQXNDOzs7OztJQUN0QyxzQ0FHRTs7Ozs7SUFFVSxtQ0FBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIGZvcmtKb2luLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAsIGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IENhY2hlYWJsZSB9IGZyb20gJ25neC1jYWNoZWFibGUnO1xyXG5cclxuaW1wb3J0IHsgV01TQ2FwYWJpbGl0aWVzLCBXTVRTQ2FwYWJpbGl0aWVzIH0gZnJvbSAnb2wvZm9ybWF0JztcclxuaW1wb3J0IHsgb3B0aW9uc0Zyb21DYXBhYmlsaXRpZXMgfSBmcm9tICdvbC9zb3VyY2UvV01UUy5qcyc7XHJcbmltcG9ydCBvbEF0dHJpYnV0aW9uIGZyb20gJ29sL2NvbnRyb2wvQXR0cmlidXRpb24nO1xyXG5cclxuaW1wb3J0IHsgT2JqZWN0VXRpbHMgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcbmltcG9ydCB7IGdldFJlc29sdXRpb25Gcm9tU2NhbGUgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5pbXBvcnQgeyBFc3JpU3R5bGVHZW5lcmF0b3IgfSBmcm9tICcuLi91dGlscy9lc3JpLXN0eWxlLWdlbmVyYXRvcic7XHJcblxyXG5pbXBvcnQge1xyXG4gIFdNVFNEYXRhU291cmNlT3B0aW9ucyxcclxuICBXTVNEYXRhU291cmNlT3B0aW9ucyxcclxuICBDYXJ0b0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gIEFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9ucyxcclxuICBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zXHJcbn0gZnJvbSAnLi9kYXRhc291cmNlcyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYXBhYmlsaXRpZXNTZXJ2aWNlIHtcclxuICBwcml2YXRlIGNhcGFiaWxpdGllc1N0b3JlOiBhbnlbXSA9IFtdO1xyXG4gIHByaXZhdGUgcGFyc2VycyA9IHtcclxuICAgIHdtczogbmV3IFdNU0NhcGFiaWxpdGllcygpLFxyXG4gICAgd210czogbmV3IFdNVFNDYXBhYmlsaXRpZXMoKVxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge31cclxuXHJcbiAgZ2V0V01TT3B0aW9ucyhcclxuICAgIGJhc2VPcHRpb25zOiBXTVNEYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8V01TRGF0YVNvdXJjZU9wdGlvbnM+IHtcclxuICAgIGNvbnN0IHVybCA9IGJhc2VPcHRpb25zLnVybDtcclxuICAgIGNvbnN0IHZlcnNpb24gPSAoYmFzZU9wdGlvbnMucGFyYW1zIGFzIGFueSkudmVyc2lvbjtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5nZXRDYXBhYmlsaXRpZXMoJ3dtcycsIHVybCwgdmVyc2lvbikucGlwZShcclxuICAgICAgbWFwKChjYXBhYmlsaXRpZXM6IGFueSkgPT5cclxuICAgICAgICB0aGlzLnBhcnNlV01TT3B0aW9ucyhiYXNlT3B0aW9ucywgY2FwYWJpbGl0aWVzKVxyXG4gICAgICApXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0V01UU09wdGlvbnMoXHJcbiAgICBiYXNlT3B0aW9uczogV01UU0RhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxXTVRTRGF0YVNvdXJjZU9wdGlvbnM+IHtcclxuICAgIGNvbnN0IHVybCA9IGJhc2VPcHRpb25zLnVybDtcclxuICAgIGNvbnN0IHZlcnNpb24gPSBiYXNlT3B0aW9ucy52ZXJzaW9uO1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmdldENhcGFiaWxpdGllcygnd210cycsIHVybCwgdmVyc2lvbikucGlwZShcclxuICAgICAgbWFwKChjYXBhYmlsaXRpZXM6IGFueSkgPT5cclxuICAgICAgICB0aGlzLnBhcnNlV01UU09wdGlvbnMoYmFzZU9wdGlvbnMsIGNhcGFiaWxpdGllcylcclxuICAgICAgKVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gb3B0aW9ucztcclxuICB9XHJcblxyXG4gIGdldENhcnRvT3B0aW9ucyhcclxuICAgIGJhc2VPcHRpb25zOiBDYXJ0b0RhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxDYXJ0b0RhdGFTb3VyY2VPcHRpb25zPiB7XHJcbiAgICBjb25zdCBiYXNlVXJsID1cclxuICAgICAgJ2h0dHBzOi8vJyArXHJcbiAgICAgIGJhc2VPcHRpb25zLmFjY291bnQgK1xyXG4gICAgICAnLmNhcnRvLmNvbS9hcGkvdjIvdml6LycgK1xyXG4gICAgICBiYXNlT3B0aW9ucy5tYXBJZCArXHJcbiAgICAgICcvdml6Lmpzb24nO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLmpzb25wKGJhc2VVcmwsICdjYWxsYmFjaycpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcCgoY2FydG9PcHRpb25zOiBhbnkpID0+XHJcbiAgICAgICAgICB0aGlzLnBhcnNlQ2FydG9PcHRpb25zKGJhc2VPcHRpb25zLCBjYXJ0b09wdGlvbnMpXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0QXJjZ2lzT3B0aW9ucyhcclxuICAgIGJhc2VPcHRpb25zOiBBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPEFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9ucz4ge1xyXG4gICAgY29uc3QgYmFzZVVybCA9IGJhc2VPcHRpb25zLnVybCArICcvJyArIGJhc2VPcHRpb25zLmxheWVyICsgJz9mPWpzb24nO1xyXG4gICAgY29uc3QgbW9kaWZpZWRVcmwgPSBiYXNlT3B0aW9ucy51cmwucmVwbGFjZSgnRmVhdHVyZVNlcnZlcicsICdNYXBTZXJ2ZXInKTtcclxuICAgIGNvbnN0IGxlZ2VuZFVybCA9IG1vZGlmaWVkVXJsICsgJy9sZWdlbmQ/Zj1qc29uJztcclxuICAgIGNvbnN0IGFyY2dpc09wdGlvbnMgPSB0aGlzLmh0dHAuZ2V0KGJhc2VVcmwpO1xyXG4gICAgY29uc3QgbGVnZW5kID0gdGhpcy5odHRwLmdldChsZWdlbmRVcmwpLnBpcGUoXHJcbiAgICAgIG1hcCgocmVzOiBhbnkpID0+IHJlcyksXHJcbiAgICAgIGNhdGNoRXJyb3IoZXJyID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygnTm8gbGVnZW5kIGFzc29jaWF0ZWQgd2l0aCB0aGlzIEZlYXR1cmUgU2VydmljZScpO1xyXG4gICAgICAgIHJldHVybiBvZihlcnIpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICAgIHJldHVybiBmb3JrSm9pbihbYXJjZ2lzT3B0aW9ucywgbGVnZW5kXSkucGlwZShcclxuICAgICAgbWFwKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlQXJjZ2lzT3B0aW9ucyhiYXNlT3B0aW9ucywgcmVzWzBdLCByZXNbMV0pO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdldFRpbGVBcmNnaXNPcHRpb25zKFxyXG4gICAgYmFzZU9wdGlvbnM6IFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnM+IHtcclxuICAgIGNvbnN0IGJhc2VVcmwgPSBiYXNlT3B0aW9ucy51cmwgKyAnLycgKyBiYXNlT3B0aW9ucy5sYXllciArICc/Zj1qc29uJztcclxuICAgIGNvbnN0IGxlZ2VuZFVybCA9IGJhc2VPcHRpb25zLnVybCArICcvbGVnZW5kP2Y9anNvbic7XHJcbiAgICBjb25zdCBhcmNnaXNPcHRpb25zID0gdGhpcy5odHRwLmdldChiYXNlVXJsKTtcclxuICAgIGNvbnN0IGxlZ2VuZEluZm8gPSB0aGlzLmh0dHAuZ2V0KGxlZ2VuZFVybCk7XHJcblxyXG4gICAgcmV0dXJuIGZvcmtKb2luKFthcmNnaXNPcHRpb25zLCBsZWdlbmRJbmZvXSkucGlwZShcclxuICAgICAgbWFwKChyZXM6IGFueSkgPT5cclxuICAgICAgICB0aGlzLnBhcnNlVGlsZUFyY2dpc09wdGlvbnMoYmFzZU9wdGlvbnMsIHJlc1swXSwgcmVzWzFdKVxyXG4gICAgICApXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgQENhY2hlYWJsZSgpXHJcbiAgZ2V0Q2FwYWJpbGl0aWVzKFxyXG4gICAgc2VydmljZTogJ3dtcycgfCAnd210cycsXHJcbiAgICBiYXNlVXJsOiBzdHJpbmcsXHJcbiAgICB2ZXJzaW9uPzogc3RyaW5nXHJcbiAgKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKHtcclxuICAgICAgZnJvbU9iamVjdDoge1xyXG4gICAgICAgIHJlcXVlc3Q6ICdHZXRDYXBhYmlsaXRpZXMnLFxyXG4gICAgICAgIHNlcnZpY2UsXHJcbiAgICAgICAgdmVyc2lvbjogdmVyc2lvbiB8fCAnMS4zLjAnXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHJlcXVlc3QgPSB0aGlzLmh0dHAuZ2V0KGJhc2VVcmwsIHtcclxuICAgICAgcGFyYW1zLFxyXG4gICAgICByZXNwb25zZVR5cGU6ICd0ZXh0J1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlcXVlc3QucGlwZShcclxuICAgICAgbWFwKHJlcyA9PiB7XHJcbiAgICAgICAgY29uc3QgY2FwYWJpbGl0aWVzID0gdGhpcy5wYXJzZXJzW3NlcnZpY2VdLnJlYWQocmVzKTtcclxuICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcGFyc2VXTVNPcHRpb25zKFxyXG4gICAgYmFzZU9wdGlvbnM6IFdNU0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gICAgY2FwYWJpbGl0aWVzOiBhbnlcclxuICApOiBXTVNEYXRhU291cmNlT3B0aW9ucyB7XHJcbiAgICBjb25zdCBsYXllcnMgPSAoYmFzZU9wdGlvbnMucGFyYW1zIGFzIGFueSkubGF5ZXJzO1xyXG4gICAgY29uc3QgbGF5ZXIgPSB0aGlzLmZpbmREYXRhU291cmNlSW5DYXBhYmlsaXRpZXMoXHJcbiAgICAgIGNhcGFiaWxpdGllcy5DYXBhYmlsaXR5LkxheWVyLFxyXG4gICAgICBsYXllcnNcclxuICAgICk7XHJcblxyXG4gICAgaWYgKCFsYXllcikge1xyXG4gICAgICByZXR1cm4gYmFzZU9wdGlvbnM7XHJcbiAgICB9XHJcbiAgICBjb25zdCBtZXRhZGF0YSA9IGxheWVyLkRhdGFVUkwgPyBsYXllci5EYXRhVVJMWzBdIDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgYWJzdHJhY3QgPSBsYXllci5BYnN0cmFjdCA/IGxheWVyLkFic3RyYWN0IDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3Qga2V5d29yZExpc3QgPSBsYXllci5LZXl3b3JkTGlzdCA/IGxheWVyLktleXdvcmRMaXN0IDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgcXVlcnlhYmxlID0gbGF5ZXIucXVlcnlhYmxlO1xyXG4gICAgY29uc3QgdGltZUZpbHRlciA9IHRoaXMuZ2V0VGltZUZpbHRlcihsYXllcik7XHJcbiAgICBjb25zdCB0aW1lRmlsdGVyYWJsZSA9IHRpbWVGaWx0ZXIgJiYgT2JqZWN0LmtleXModGltZUZpbHRlcikubGVuZ3RoID4gMDtcclxuXHJcbiAgICBjb25zdCBvcHRpb25zOiBXTVNEYXRhU291cmNlT3B0aW9ucyA9IE9iamVjdFV0aWxzLnJlbW92ZVVuZGVmaW5lZCh7XHJcbiAgICAgIF9sYXllck9wdGlvbnNGcm9tQ2FwYWJpbGl0aWVzOiB7XHJcbiAgICAgICAgdGl0bGU6IGxheWVyLlRpdGxlLFxyXG4gICAgICAgIG1heFJlc29sdXRpb246XHJcbiAgICAgICAgICBnZXRSZXNvbHV0aW9uRnJvbVNjYWxlKGxheWVyLk1heFNjYWxlRGVub21pbmF0b3IpIHx8IEluZmluaXR5LFxyXG4gICAgICAgIG1pblJlc29sdXRpb246XHJcbiAgICAgICAgICBnZXRSZXNvbHV0aW9uRnJvbVNjYWxlKGxheWVyLk1pblNjYWxlRGVub21pbmF0b3IpIHx8IDAsXHJcbiAgICAgICAgbWV0YWRhdGE6IHtcclxuICAgICAgICAgIHVybDogbWV0YWRhdGEgPyBtZXRhZGF0YS5PbmxpbmVSZXNvdXJjZSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgIGV4dGVybjogbWV0YWRhdGEgPyB0cnVlIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgYWJzdHJhY3QsXHJcbiAgICAgICAgICBrZXl3b3JkTGlzdFxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgcXVlcnlhYmxlLFxyXG4gICAgICB0aW1lRmlsdGVyOiB0aW1lRmlsdGVyYWJsZSA/IHRpbWVGaWx0ZXIgOiB1bmRlZmluZWQsXHJcbiAgICAgIHRpbWVGaWx0ZXJhYmxlOiB0aW1lRmlsdGVyYWJsZSA/IHRydWUgOiB1bmRlZmluZWRcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBPYmplY3RVdGlscy5tZXJnZURlZXAob3B0aW9ucywgYmFzZU9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwYXJzZVdNVFNPcHRpb25zKFxyXG4gICAgYmFzZU9wdGlvbnM6IFdNVFNEYXRhU291cmNlT3B0aW9ucyxcclxuICAgIGNhcGFiaWxpdGllczogYW55XHJcbiAgKTogV01UU0RhdGFTb3VyY2VPcHRpb25zIHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSBvcHRpb25zRnJvbUNhcGFiaWxpdGllcyhjYXBhYmlsaXRpZXMsIGJhc2VPcHRpb25zKTtcclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKG9wdGlvbnMsIGJhc2VPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcGFyc2VDYXJ0b09wdGlvbnMoXHJcbiAgICBiYXNlT3B0aW9uczogQ2FydG9EYXRhU291cmNlT3B0aW9ucyxcclxuICAgIGNhcnRvT3B0aW9uczogYW55XHJcbiAgKTogQ2FydG9EYXRhU291cmNlT3B0aW9ucyB7XHJcbiAgICBjb25zdCBsYXllcnMgPSBbXTtcclxuICAgIGNvbnN0IHBhcmFtcyA9IGNhcnRvT3B0aW9ucy5sYXllcnNbMV0ub3B0aW9ucy5sYXllcl9kZWZpbml0aW9uO1xyXG4gICAgcGFyYW1zLmxheWVycy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICBsYXllcnMucHVzaCh7XHJcbiAgICAgICAgdHlwZTogZWxlbWVudC50eXBlLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgb3B0aW9uczogZWxlbWVudC5vcHRpb25zLFxyXG4gICAgICAgIGxlZ2VuZDogZWxlbWVudC5sZWdlbmRcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSBPYmplY3RVdGlscy5yZW1vdmVVbmRlZmluZWQoe1xyXG4gICAgICBjb25maWc6IHtcclxuICAgICAgICB2ZXJzaW9uOiBwYXJhbXMudmVyc2lvbixcclxuICAgICAgICBsYXllcnNcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gT2JqZWN0VXRpbHMubWVyZ2VEZWVwKG9wdGlvbnMsIGJhc2VPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcGFyc2VBcmNnaXNPcHRpb25zKFxyXG4gICAgYmFzZU9wdGlvbnM6IEFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9ucyxcclxuICAgIGFyY2dpc09wdGlvbnM6IGFueSxcclxuICAgIGxlZ2VuZD86IGFueVxyXG4gICk6IEFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9ucyB7XHJcbiAgICBjb25zdCBsZWdlbmRJbmZvID0gbGVnZW5kLmxheWVycyA/IGxlZ2VuZCA6IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IHN0eWxlR2VuZXJhdG9yID0gbmV3IEVzcmlTdHlsZUdlbmVyYXRvcigpO1xyXG4gICAgY29uc3QgdW5pdHMgPSBhcmNnaXNPcHRpb25zLnVuaXRzID09PSAnZXNyaU1ldGVycycgPyAnbScgOiAnZGVncmVlcyc7XHJcbiAgICBjb25zdCBzdHlsZSA9IHN0eWxlR2VuZXJhdG9yLmdlbmVyYXRlU3R5bGUoYXJjZ2lzT3B0aW9ucywgdW5pdHMpO1xyXG4gICAgY29uc3QgYXR0cmlidXRpb25zID0gbmV3IG9sQXR0cmlidXRpb24oe1xyXG4gICAgICBodG1sOiBhcmNnaXNPcHRpb25zLmNvcHlyaWdodFRleHRcclxuICAgIH0pO1xyXG4gICAgbGV0IHRpbWVFeHRlbnQ7XHJcbiAgICBsZXQgdGltZUZpbHRlcjtcclxuICAgIGlmIChhcmNnaXNPcHRpb25zLnRpbWVJbmZvKSB7XHJcbiAgICAgIGNvbnN0IHRpbWUgPSBhcmNnaXNPcHRpb25zLnRpbWVJbmZvLnRpbWVFeHRlbnQ7XHJcbiAgICAgIHRpbWVFeHRlbnQgPSB0aW1lWzBdICsgJywnICsgdGltZVsxXTtcclxuICAgICAgY29uc3QgbWluID0gbmV3IERhdGUoKTtcclxuICAgICAgbWluLnNldFRpbWUodGltZVswXSk7XHJcbiAgICAgIGNvbnN0IG1heCA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIG1heC5zZXRUaW1lKHRpbWVbMV0pO1xyXG4gICAgICB0aW1lRmlsdGVyID0ge1xyXG4gICAgICAgIG1pbjogbWluLnRvVVRDU3RyaW5nKCksXHJcbiAgICAgICAgbWF4OiBtYXgudG9VVENTdHJpbmcoKSxcclxuICAgICAgICByYW5nZTogdHJ1ZSxcclxuICAgICAgICB0eXBlOiAnZGF0ZXRpbWUnLFxyXG4gICAgICAgIHN0eWxlOiAnY2FsZW5kYXInXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjb25zdCBwYXJhbXMgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgICB7fSxcclxuICAgICAge1xyXG4gICAgICAgIGxlZ2VuZEluZm8sXHJcbiAgICAgICAgc3R5bGUsXHJcbiAgICAgICAgdGltZUZpbHRlcixcclxuICAgICAgICB0aW1lRXh0ZW50LFxyXG4gICAgICAgIGF0dHJpYnV0aW9uc1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IE9iamVjdFV0aWxzLnJlbW92ZVVuZGVmaW5lZCh7XHJcbiAgICAgIHBhcmFtc1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gT2JqZWN0VXRpbHMubWVyZ2VEZWVwKG9wdGlvbnMsIGJhc2VPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcGFyc2VUaWxlQXJjZ2lzT3B0aW9ucyhcclxuICAgIGJhc2VPcHRpb25zOiBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zLFxyXG4gICAgYXJjZ2lzT3B0aW9uczogYW55LFxyXG4gICAgbGVnZW5kOiBhbnlcclxuICApOiBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zIHtcclxuICAgIGNvbnN0IGxlZ2VuZEluZm8gPSBsZWdlbmQubGF5ZXJzID8gbGVnZW5kIDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgYXR0cmlidXRpb25zID0gbmV3IG9sQXR0cmlidXRpb24oe1xyXG4gICAgICBodG1sOiBhcmNnaXNPcHRpb25zLmNvcHlyaWdodFRleHRcclxuICAgIH0pO1xyXG4gICAgbGV0IHRpbWVFeHRlbnQ7XHJcbiAgICBsZXQgdGltZUZpbHRlcjtcclxuICAgIGlmIChhcmNnaXNPcHRpb25zLnRpbWVJbmZvKSB7XHJcbiAgICAgIGNvbnN0IHRpbWUgPSBhcmNnaXNPcHRpb25zLnRpbWVJbmZvLnRpbWVFeHRlbnQ7XHJcbiAgICAgIHRpbWVFeHRlbnQgPSB0aW1lWzBdICsgJywnICsgdGltZVsxXTtcclxuICAgICAgY29uc3QgbWluID0gbmV3IERhdGUoKTtcclxuICAgICAgbWluLnNldFRpbWUodGltZVswXSk7XHJcbiAgICAgIGNvbnN0IG1heCA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIG1heC5zZXRUaW1lKHRpbWVbMV0pO1xyXG4gICAgICB0aW1lRmlsdGVyID0ge1xyXG4gICAgICAgIG1pbjogbWluLnRvVVRDU3RyaW5nKCksXHJcbiAgICAgICAgbWF4OiBtYXgudG9VVENTdHJpbmcoKSxcclxuICAgICAgICByYW5nZTogdHJ1ZSxcclxuICAgICAgICB0eXBlOiAnZGF0ZXRpbWUnLFxyXG4gICAgICAgIHN0eWxlOiAnY2FsZW5kYXInXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjb25zdCBwYXJhbXMgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgICB7fSxcclxuICAgICAge1xyXG4gICAgICAgIGxheWVyczogJ3Nob3c6JyArIGJhc2VPcHRpb25zLmxheWVyLFxyXG4gICAgICAgIHRpbWU6IHRpbWVFeHRlbnRcclxuICAgICAgfVxyXG4gICAgKTtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSBPYmplY3RVdGlscy5yZW1vdmVVbmRlZmluZWQoe1xyXG4gICAgICBwYXJhbXMsXHJcbiAgICAgIGxlZ2VuZEluZm8sXHJcbiAgICAgIHRpbWVGaWx0ZXIsXHJcbiAgICAgIGF0dHJpYnV0aW9uc1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gT2JqZWN0VXRpbHMubWVyZ2VEZWVwKG9wdGlvbnMsIGJhc2VPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZmluZERhdGFTb3VyY2VJbkNhcGFiaWxpdGllcyhsYXllckFycmF5LCBuYW1lKTogYW55IHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGxheWVyQXJyYXkpKSB7XHJcbiAgICAgIGxldCBsYXllcjtcclxuICAgICAgbGF5ZXJBcnJheS5maW5kKHZhbHVlID0+IHtcclxuICAgICAgICBsYXllciA9IHRoaXMuZmluZERhdGFTb3VyY2VJbkNhcGFiaWxpdGllcyh2YWx1ZSwgbmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIGxheWVyICE9PSB1bmRlZmluZWQ7XHJcbiAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgcmV0dXJuIGxheWVyO1xyXG4gICAgfSBlbHNlIGlmIChsYXllckFycmF5LkxheWVyKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmZpbmREYXRhU291cmNlSW5DYXBhYmlsaXRpZXMobGF5ZXJBcnJheS5MYXllciwgbmFtZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAobGF5ZXJBcnJheS5OYW1lICYmIGxheWVyQXJyYXkuTmFtZSA9PT0gbmFtZSkge1xyXG4gICAgICAgIHJldHVybiBsYXllckFycmF5O1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRUaW1lRmlsdGVyKGxheWVyKSB7XHJcbiAgICBsZXQgZGltZW5zaW9uO1xyXG5cclxuICAgIGlmIChsYXllci5EaW1lbnNpb24pIHtcclxuICAgICAgY29uc3QgdGltZUZpbHRlcjogYW55ID0ge307XHJcbiAgICAgIGRpbWVuc2lvbiA9IGxheWVyLkRpbWVuc2lvblswXTtcclxuXHJcbiAgICAgIGlmIChkaW1lbnNpb24udmFsdWVzKSB7XHJcbiAgICAgICAgY29uc3QgbWluTWF4RGltID0gZGltZW5zaW9uLnZhbHVlcy5zcGxpdCgnLycpO1xyXG4gICAgICAgIHRpbWVGaWx0ZXIubWluID0gbWluTWF4RGltWzBdICE9PSB1bmRlZmluZWQgPyBtaW5NYXhEaW1bMF0gOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGltZUZpbHRlci5tYXggPSBtaW5NYXhEaW1bMV0gIT09IHVuZGVmaW5lZCA/IG1pbk1heERpbVsxXSA6IHVuZGVmaW5lZDtcclxuICAgICAgICB0aW1lRmlsdGVyLnN0ZXAgPSBtaW5NYXhEaW1bMl0gIT09IHVuZGVmaW5lZCA/IG1pbk1heERpbVsyXSA6IHVuZGVmaW5lZDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRpbWVuc2lvbi5kZWZhdWx0KSB7XHJcbiAgICAgICAgdGltZUZpbHRlci52YWx1ZSA9IGRpbWVuc2lvbi5kZWZhdWx0O1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aW1lRmlsdGVyO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=