/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, of, concat } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LanguageService, ConfigService } from '@igo2/core';
import { CapabilitiesService, generateIdFromSourceOptions } from '../../datasource';
import { TooltipType } from '../../layer';
import { getResolutionFromScale } from '../../map';
import { CatalogItemType } from './catalog.enum';
import { QueryHtmlTarget } from '../../query';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@igo2/core";
import * as i3 from "../../datasource/shared/capabilities.service";
export class CatalogService {
    /**
     * @param {?} http
     * @param {?} config
     * @param {?} languageService
     * @param {?} capabilitiesService
     */
    constructor(http, config, languageService, capabilitiesService) {
        this.http = http;
        this.config = config;
        this.languageService = languageService;
        this.capabilitiesService = capabilitiesService;
    }
    /**
     * @return {?}
     */
    loadCatalogs() {
        /** @type {?} */
        const contextConfig = this.config.getConfig('context') || {};
        /** @type {?} */
        const catalogConfig = this.config.getConfig('catalog') || {};
        /** @type {?} */
        const apiUrl = catalogConfig.url || contextConfig.url;
        /** @type {?} */
        const catalogsFromConfig = catalogConfig.sources || [];
        if (apiUrl === undefined) {
            return of(catalogsFromConfig);
        }
        /** @type {?} */
        const observables$ = [];
        // Base layers catalog
        if (catalogConfig.baseLayers) {
            /** @type {?} */
            const translate = this.languageService.translate;
            /** @type {?} */
            const title = translate.instant('igo.geo.catalog.baseLayers');
            /** @type {?} */
            const baseLayersCatalog = {
                id: 'catalog.baselayers',
                title,
                url: `${apiUrl}/baselayers`,
                type: 'baselayers'
            };
            observables$.push(of(baseLayersCatalog));
        }
        // Catalogs from API
        /** @type {?} */
        const catalogsFromApi$ = this.http
            .get(`${apiUrl}/catalogs`)
            .pipe(catchError((/**
         * @param {?} response
         * @return {?}
         */
        (response) => EMPTY)));
        observables$.push(catalogsFromApi$);
        // Catalogs from config
        if (catalogsFromConfig.length > 0) {
            observables$.push(of(catalogsFromConfig));
        }
        return (/** @type {?} */ (concat(...observables$)));
    }
    /**
     * @param {?} catalog
     * @return {?}
     */
    loadCatalogItems(catalog) {
        if (catalog.type === 'baselayers') {
            return this.loadCatalogBaseLayerItems(catalog);
        }
        else if (catalog.type === 'wmts') {
            return this.loadCatalogWMTSLayerItems(catalog);
        }
        return this.loadCatalogWMSLayerItems(catalog);
    }
    /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    loadCatalogBaseLayerItems(catalog) {
        // TODO: I'm not sure this works
        return this.getCatalogBaseLayersOptions(catalog)
            .pipe(map((/**
         * @param {?} layersOptions
         * @return {?}
         */
        (layersOptions) => {
            /** @type {?} */
            const items = layersOptions.map((/**
             * @param {?} layerOptions
             * @return {?}
             */
            (layerOptions) => {
                return (/** @type {?} */ ({
                    id: generateIdFromSourceOptions(layerOptions.sourceOptions),
                    title: layerOptions.title,
                    type: CatalogItemType.Layer,
                    options: layerOptions
                }));
            }));
            return [{
                    id: 'catalog.group.baselayers',
                    type: CatalogItemType.Group,
                    title: catalog.title,
                    items
                }];
        })));
    }
    /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    getCatalogBaseLayersOptions(catalog) {
        return this.http.get(catalog.url);
    }
    /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    loadCatalogWMSLayerItems(catalog) {
        return this.getCatalogWMSCapabilities(catalog)
            .pipe(map((/**
         * @param {?} capabilities
         * @return {?}
         */
        (capabilities) => {
            /** @type {?} */
            const items = [];
            this.includeRecursiveItems(catalog, capabilities.Capability.Layer, items);
            return items;
        })));
    }
    /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    loadCatalogWMTSLayerItems(catalog) {
        return this.getCatalogWMTSCapabilities(catalog)
            .pipe(map((/**
         * @param {?} capabilities
         * @return {?}
         */
        (capabilities) => this.getWMTSItems(catalog, capabilities))));
    }
    /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    getCatalogWMSCapabilities(catalog) {
        return this.capabilitiesService.getCapabilities('wms', catalog.url, catalog.version);
    }
    /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    getCatalogWMTSCapabilities(catalog) {
        return this.capabilitiesService.getCapabilities('wmts', catalog.url, catalog.version);
    }
    /**
     * @private
     * @param {?} catalog
     * @param {?} layerList
     * @param {?} items
     * @return {?}
     */
    includeRecursiveItems(catalog, layerList, items) {
        // Dig all levels until last level (layer object are not defined on last level)
        /** @type {?} */
        const regexes = (catalog.regFilters || []).map((/**
         * @param {?} pattern
         * @return {?}
         */
        (pattern) => new RegExp(pattern)));
        for (const group of layerList.Layer) {
            if (group.Layer !== undefined) {
                // recursive, check next level
                this.includeRecursiveItems(catalog, group, items);
                continue;
            }
            /** @type {?} */
            const catalogTooltipType = this.retrieveTooltipType(catalog);
            /** @type {?} */
            const layersQueryFormat = this.findCatalogInfoFormat(catalog);
            // TODO: Slice that into multiple methods
            // Define object of group layer
            /** @type {?} */
            const groupItem = {
                id: `catalog.group.${layerList.Name}`,
                type: CatalogItemType.Group,
                title: layerList.Title,
                items: layerList.Layer.reduce((/**
                 * @param {?} layers
                 * @param {?} layer
                 * @return {?}
                 */
                (layers, layer) => {
                    /** @type {?} */
                    const configuredQueryFormat = this.retriveLayerInfoFormat(layer.Name, layersQueryFormat);
                    if (this.testLayerRegexes(layer.Name, regexes) === false) {
                        return layers;
                    }
                    /** @type {?} */
                    const metadata = layer.DataURL ? layer.DataURL[0] : undefined;
                    /** @type {?} */
                    const abstract = layer.Abstract ? layer.Abstract : undefined;
                    /** @type {?} */
                    const keywordList = layer.KeywordList ? layer.KeywordList : undefined;
                    /** @type {?} */
                    const timeFilter = this.capabilitiesService.getTimeFilter(layer);
                    /** @type {?} */
                    const timeFilterable = timeFilter && Object.keys(timeFilter).length > 0 ? true : false;
                    /** @type {?} */
                    const sourceOptions = (/** @type {?} */ ({
                        type: 'wms',
                        url: catalog.url,
                        params: {
                            layers: layer.Name,
                            feature_count: catalog.count
                        },
                        timeFilter: Object.assign({}, timeFilter, catalog.timeFilter),
                        timeFilterable: timeFilterable ? true : false,
                        queryable: layer.queryable,
                        queryFormat: configuredQueryFormat,
                        queryHtmlTarget: catalog.queryHtmlTarget || QueryHtmlTarget.IFRAME
                    }));
                    layers.push({
                        id: generateIdFromSourceOptions(sourceOptions),
                        type: CatalogItemType.Layer,
                        title: layer.Title,
                        options: {
                            title: layer.Title,
                            maxResolution: getResolutionFromScale(layer.MaxScaleDenominator) || Infinity,
                            minResolution: getResolutionFromScale(layer.MinScaleDenominator) || 0,
                            metadata: {
                                url: metadata ? metadata.OnlineResource : undefined,
                                extern: metadata ? true : undefined,
                                abstract,
                                keywordList
                            },
                            tooltip: (/** @type {?} */ ({ type: catalogTooltipType })),
                            sourceOptions
                        }
                    });
                    return layers;
                }), [])
            };
            if (groupItem.items.length !== 0) {
                items.push(groupItem);
            }
            // Break the group (don't add a group of layer for each of their layer!)
            break;
        }
    }
    /**
     * @private
     * @param {?} catalog
     * @param {?} capabilities
     * @return {?}
     */
    getWMTSItems(catalog, capabilities) {
        /** @type {?} */
        const layers = capabilities.Contents.Layer;
        /** @type {?} */
        const regexes = (catalog.regFilters || []).map((/**
         * @param {?} pattern
         * @return {?}
         */
        (pattern) => new RegExp(pattern)));
        return layers.map((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => {
            if (this.testLayerRegexes(layer.Identifier, regexes) === false) {
                return undefined;
            }
            /** @type {?} */
            const sourceOptions = (/** @type {?} */ ({
                type: 'wmts',
                url: catalog.url,
                layer: layer.Identifier,
                matrixSet: catalog.matrixSet,
                optionsFromCapabilities: true,
                requestEncoding: catalog.requestEncoding || 'KVP',
                style: 'default',
                params: {
                    version: '1.0.0'
                }
            }));
            return {
                id: generateIdFromSourceOptions(sourceOptions),
                type: CatalogItemType.Layer,
                title: layer.Title,
                options: {
                    title: layer.Title,
                    sourceOptions
                }
            };
        }))
            .filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => item !== undefined));
    }
    /**
     * @private
     * @param {?} layerName
     * @param {?} regexes
     * @return {?}
     */
    testLayerRegexes(layerName, regexes) {
        if (regexes.length === 0) {
            return true;
        }
        return regexes.find((/**
         * @param {?} regex
         * @return {?}
         */
        (regex) => regex.test(layerName))) !== undefined;
    }
    /**
     * @private
     * @param {?} layerNameFromCatalog
     * @param {?} layersQueryFormat
     * @return {?}
     */
    retriveLayerInfoFormat(layerNameFromCatalog, layersQueryFormat) {
        /** @type {?} */
        const currentLayerInfoFormat = layersQueryFormat.find((/**
         * @param {?} f
         * @return {?}
         */
        f => f.layer === layerNameFromCatalog));
        /** @type {?} */
        const baseInfoFormat = layersQueryFormat.find((/**
         * @param {?} f
         * @return {?}
         */
        f => f.layer === '*'));
        /** @type {?} */
        let queryFormat;
        if (currentLayerInfoFormat) {
            queryFormat = currentLayerInfoFormat.queryFormat;
        }
        else if (baseInfoFormat) {
            queryFormat = baseInfoFormat.queryFormat;
        }
        return queryFormat;
    }
    /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    retrieveTooltipType(catalog) {
        if (!catalog.tooltipType) {
            return TooltipType.TITLE;
        }
        return catalog.tooltipType;
    }
    /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    findCatalogInfoFormat(catalog) {
        /** @type {?} */
        const layersQueryFormat = [];
        if (!catalog.queryFormat) {
            return layersQueryFormat;
        }
        Object.keys(catalog.queryFormat).forEach((/**
         * @param {?} configuredInfoFormat
         * @return {?}
         */
        configuredInfoFormat => {
            if (catalog.queryFormat[configuredInfoFormat] instanceof Array) {
                catalog.queryFormat[configuredInfoFormat].forEach((/**
                 * @param {?} layerName
                 * @return {?}
                 */
                layerName => {
                    if (!layersQueryFormat.find((/**
                     * @param {?} specific
                     * @return {?}
                     */
                    specific => specific.layer === layerName))) {
                        layersQueryFormat.push({ layer: layerName, queryFormat: (/** @type {?} */ (configuredInfoFormat)) });
                    }
                }));
            }
            else {
                if (!layersQueryFormat.find((/**
                 * @param {?} specific
                 * @return {?}
                 */
                specific => specific.layer === catalog.queryFormat[configuredInfoFormat]))) {
                    layersQueryFormat.push({ layer: catalog.queryFormat[configuredInfoFormat], queryFormat: (/** @type {?} */ (configuredInfoFormat)) });
                }
            }
        }));
        return layersQueryFormat;
    }
}
CatalogService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
CatalogService.ctorParameters = () => [
    { type: HttpClient },
    { type: ConfigService },
    { type: LanguageService },
    { type: CapabilitiesService }
];
/** @nocollapse */ CatalogService.ngInjectableDef = i0.defineInjectable({ factory: function CatalogService_Factory() { return new CatalogService(i0.inject(i1.HttpClient), i0.inject(i2.ConfigService), i0.inject(i2.LanguageService), i0.inject(i3.CapabilitiesService)); }, token: CatalogService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    CatalogService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    CatalogService.prototype.config;
    /**
     * @type {?}
     * @private
     */
    CatalogService.prototype.languageService;
    /**
     * @type {?}
     * @private
     */
    CatalogService.prototype.capabilitiesService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2NhdGFsb2cvc2hhcmVkL2NhdGFsb2cuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFxQixNQUFNLHNCQUFzQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxLQUFLLEVBQWMsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpELE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzVELE9BQU8sRUFDTCxtQkFBbUIsRUFHbkIsMkJBQTJCLEVBQzVCLE1BQU0sa0JBQWtCLENBQUM7QUFDMUIsT0FBTyxFQUFtRCxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDM0YsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBUW5ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsZUFBZSxFQUFlLE1BQU0sYUFBYSxDQUFDOzs7OztBQUszRCxNQUFNLE9BQU8sY0FBYzs7Ozs7OztJQUV6QixZQUNVLElBQWdCLEVBQ2hCLE1BQXFCLEVBQ3JCLGVBQWdDLEVBQ2hDLG1CQUF3QztRQUh4QyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLFdBQU0sR0FBTixNQUFNLENBQWU7UUFDckIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7SUFDL0MsQ0FBQzs7OztJQUVKLFlBQVk7O2NBQ0osYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMs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QyxFQUFFO3dCQUNyRSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxtQkFBQSxvQkFBb0IsRUFBZSxFQUFFLENBQUMsQ0FBQztxQkFDaEc7Z0JBQ0gsQ0FBQyxFQUFDLENBQUM7YUFDSjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSTs7OztnQkFBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEtBQUssT0FBTyxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFDLEVBQUU7b0JBQ3JHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLG9CQUFvQixDQUFDLEVBQUUsV0FBVyxFQUFFLG1CQUFBLG9CQUFvQixFQUFlLEVBQUUsQ0FBQyxDQUFDO2lCQUNoSTthQUNGO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFDSCxPQUFPLGlCQUFpQixDQUFDO0lBQzNCLENBQUM7OztZQXZSRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUF6QlEsVUFBVTtZQUlPLGFBQWE7WUFBOUIsZUFBZTtZQUV0QixtQkFBbUI7Ozs7Ozs7O0lBdUJqQiw4QkFBd0I7Ozs7O0lBQ3hCLGdDQUE2Qjs7Ozs7SUFDN0IseUNBQXdDOzs7OztJQUN4Qyw2Q0FBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBFTVBUWSwgT2JzZXJ2YWJsZSwgb2YsIGNvbmNhdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAsIGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBMYW5ndWFnZVNlcnZpY2UsIENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHtcclxuICBDYXBhYmlsaXRpZXNTZXJ2aWNlLFxyXG4gIFdNU0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gIFdNVFNEYXRhU291cmNlT3B0aW9ucyxcclxuICBnZW5lcmF0ZUlkRnJvbVNvdXJjZU9wdGlvbnNcclxufSBmcm9tICcuLi8uLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgTGF5ZXJPcHRpb25zLCBJbWFnZUxheWVyT3B0aW9ucywgVG9vbHRpcENvbnRlbnQsIFRvb2x0aXBUeXBlIH0gZnJvbSAnLi4vLi4vbGF5ZXInO1xyXG5pbXBvcnQgeyBnZXRSZXNvbHV0aW9uRnJvbVNjYWxlIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuXHJcbmltcG9ydCB7XHJcbiAgQ2F0YWxvZyxcclxuICBDYXRhbG9nSXRlbSxcclxuICBDYXRhbG9nSXRlbUxheWVyLFxyXG4gIENhdGFsb2dJdGVtR3JvdXBcclxufSBmcm9tICcuL2NhdGFsb2cuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgQ2F0YWxvZ0l0ZW1UeXBlIH0gZnJvbSAnLi9jYXRhbG9nLmVudW0nO1xyXG5pbXBvcnQgeyBRdWVyeUh0bWxUYXJnZXQsIFF1ZXJ5Rm9ybWF0IH0gZnJvbSAnLi4vLi4vcXVlcnknO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2F0YWxvZ1NlcnZpY2Uge1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgY2FwYWJpbGl0aWVzU2VydmljZTogQ2FwYWJpbGl0aWVzU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgbG9hZENhdGFsb2dzKCk6IE9ic2VydmFibGU8Q2F0YWxvZ1tdPiB7XHJcbiAgICBjb25zdCBjb250ZXh0Q29uZmlnID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdjb250ZXh0JykgfHwge307XHJcbiAgICBjb25zdCBjYXRhbG9nQ29uZmlnID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdjYXRhbG9nJykgfHwge307XHJcbiAgICBjb25zdCBhcGlVcmwgPSBjYXRhbG9nQ29uZmlnLnVybCB8fCBjb250ZXh0Q29uZmlnLnVybDtcclxuICAgIGNvbnN0IGNhdGFsb2dzRnJvbUNvbmZpZyA9IGNhdGFsb2dDb25maWcuc291cmNlcyB8fCBbXTtcclxuXHJcbiAgICBpZiAoYXBpVXJsID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIG9mKGNhdGFsb2dzRnJvbUNvbmZpZyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb2JzZXJ2YWJsZXMkID0gW107XHJcblxyXG4gICAgLy8gQmFzZSBsYXllcnMgY2F0YWxvZ1xyXG4gICAgaWYgKGNhdGFsb2dDb25maWcuYmFzZUxheWVycykge1xyXG4gICAgICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgICAgIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uY2F0YWxvZy5iYXNlTGF5ZXJzJyk7XHJcbiAgICAgIGNvbnN0IGJhc2VMYXllcnNDYXRhbG9nID0ge1xyXG4gICAgICAgIGlkOiAnY2F0YWxvZy5iYXNlbGF5ZXJzJyxcclxuICAgICAgICB0aXRsZSxcclxuICAgICAgICB1cmw6IGAke2FwaVVybH0vYmFzZWxheWVyc2AsXHJcbiAgICAgICAgdHlwZTogJ2Jhc2VsYXllcnMnXHJcbiAgICAgIH07XHJcbiAgICAgIG9ic2VydmFibGVzJC5wdXNoKG9mKGJhc2VMYXllcnNDYXRhbG9nKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2F0YWxvZ3MgZnJvbSBBUElcclxuICAgIGNvbnN0IGNhdGFsb2dzRnJvbUFwaSQgPSB0aGlzLmh0dHBcclxuICAgICAgLmdldDxDYXRhbG9nW10+KGAke2FwaVVybH0vY2F0YWxvZ3NgKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBjYXRjaEVycm9yKChyZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2UpID0+IEVNUFRZKVxyXG4gICAgICApO1xyXG4gICAgb2JzZXJ2YWJsZXMkLnB1c2goY2F0YWxvZ3NGcm9tQXBpJCk7XHJcblxyXG4gICAgLy8gQ2F0YWxvZ3MgZnJvbSBjb25maWdcclxuICAgIGlmIChjYXRhbG9nc0Zyb21Db25maWcubGVuZ3RoID4gMCkge1xyXG4gICAgICBvYnNlcnZhYmxlcyQucHVzaChvZihjYXRhbG9nc0Zyb21Db25maWcpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY29uY2F0KC4uLm9ic2VydmFibGVzJCkgYXMgT2JzZXJ2YWJsZTxDYXRhbG9nW10+O1xyXG4gIH1cclxuXHJcbiAgbG9hZENhdGFsb2dJdGVtcyhjYXRhbG9nOiBDYXRhbG9nKTogT2JzZXJ2YWJsZTxDYXRhbG9nSXRlbVtdPiB7XHJcbiAgICBpZiAoY2F0YWxvZy50eXBlID09PSAnYmFzZWxheWVycycpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubG9hZENhdGFsb2dCYXNlTGF5ZXJJdGVtcyhjYXRhbG9nKTtcclxuICAgIH0gZWxzZSBpZiAoY2F0YWxvZy50eXBlID09PSAnd210cycpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubG9hZENhdGFsb2dXTVRTTGF5ZXJJdGVtcyhjYXRhbG9nKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmxvYWRDYXRhbG9nV01TTGF5ZXJJdGVtcyhjYXRhbG9nKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbG9hZENhdGFsb2dCYXNlTGF5ZXJJdGVtcyhjYXRhbG9nOiBDYXRhbG9nKTogT2JzZXJ2YWJsZTxDYXRhbG9nSXRlbUdyb3VwW10+IHtcclxuICAgIC8vIFRPRE86IEknbSBub3Qgc3VyZSB0aGlzIHdvcmtzXHJcbiAgICByZXR1cm4gdGhpcy5nZXRDYXRhbG9nQmFzZUxheWVyc09wdGlvbnMoY2F0YWxvZylcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChsYXllcnNPcHRpb25zOiBMYXllck9wdGlvbnNbXSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgaXRlbXMgPSBsYXllcnNPcHRpb25zLm1hcCgobGF5ZXJPcHRpb25zOiBMYXllck9wdGlvbnMpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICBpZDogZ2VuZXJhdGVJZEZyb21Tb3VyY2VPcHRpb25zKGxheWVyT3B0aW9ucy5zb3VyY2VPcHRpb25zKSxcclxuICAgICAgICAgICAgICB0aXRsZTogbGF5ZXJPcHRpb25zLnRpdGxlLFxyXG4gICAgICAgICAgICAgIHR5cGU6IENhdGFsb2dJdGVtVHlwZS5MYXllcixcclxuICAgICAgICAgICAgICBvcHRpb25zOiBsYXllck9wdGlvbnNcclxuICAgICAgICAgICAgfSBhcyBDYXRhbG9nSXRlbUxheWVyO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICByZXR1cm4gW3tcclxuICAgICAgICAgICAgaWQ6ICdjYXRhbG9nLmdyb3VwLmJhc2VsYXllcnMnLFxyXG4gICAgICAgICAgICB0eXBlOiBDYXRhbG9nSXRlbVR5cGUuR3JvdXAsXHJcbiAgICAgICAgICAgIHRpdGxlOiBjYXRhbG9nLnRpdGxlLFxyXG4gICAgICAgICAgICBpdGVtc1xyXG4gICAgICAgICAgfV07XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0Q2F0YWxvZ0Jhc2VMYXllcnNPcHRpb25zKGNhdGFsb2c6IENhdGFsb2cpOiBPYnNlcnZhYmxlPExheWVyT3B0aW9uc1tdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMYXllck9wdGlvbnNbXT4oY2F0YWxvZy51cmwpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBsb2FkQ2F0YWxvZ1dNU0xheWVySXRlbXMoY2F0YWxvZzogQ2F0YWxvZyk6IE9ic2VydmFibGU8Q2F0YWxvZ0l0ZW1bXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2F0YWxvZ1dNU0NhcGFiaWxpdGllcyhjYXRhbG9nKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoKGNhcGFiaWxpdGllczogYW55KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBpdGVtcyA9IFtdO1xyXG4gICAgICAgICAgdGhpcy5pbmNsdWRlUmVjdXJzaXZlSXRlbXMoY2F0YWxvZywgY2FwYWJpbGl0aWVzLkNhcGFiaWxpdHkuTGF5ZXIsIGl0ZW1zKTtcclxuICAgICAgICAgIHJldHVybiBpdGVtcztcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBsb2FkQ2F0YWxvZ1dNVFNMYXllckl0ZW1zKGNhdGFsb2c6IENhdGFsb2cpOiBPYnNlcnZhYmxlPENhdGFsb2dJdGVtW10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldENhdGFsb2dXTVRTQ2FwYWJpbGl0aWVzKGNhdGFsb2cpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcCgoY2FwYWJpbGl0aWVzOiBhbnkpID0+IHRoaXMuZ2V0V01UU0l0ZW1zKGNhdGFsb2csIGNhcGFiaWxpdGllcykpXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldENhdGFsb2dXTVNDYXBhYmlsaXRpZXMoY2F0YWxvZzogQ2F0YWxvZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXBhYmlsaXRpZXNTZXJ2aWNlLmdldENhcGFiaWxpdGllcygnd21zJywgY2F0YWxvZy51cmwsIGNhdGFsb2cudmVyc2lvbik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldENhdGFsb2dXTVRTQ2FwYWJpbGl0aWVzKGNhdGFsb2c6IENhdGFsb2cpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FwYWJpbGl0aWVzU2VydmljZS5nZXRDYXBhYmlsaXRpZXMoJ3dtdHMnLCBjYXRhbG9nLnVybCwgY2F0YWxvZy52ZXJzaW9uKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5jbHVkZVJlY3Vyc2l2ZUl0ZW1zKGNhdGFsb2c6IENhdGFsb2csIGxheWVyTGlzdDogYW55LCBpdGVtczogQ2F0YWxvZ0l0ZW1bXSkge1xyXG4gICAgLy8gRGlnIGFsbCBsZXZlbHMgdW50aWwgbGFzdCBsZXZlbCAobGF5ZXIgb2JqZWN0IGFyZSBub3QgZGVmaW5lZCBvbiBsYXN0IGxldmVsKVxyXG4gICAgY29uc3QgcmVnZXhlcyA9IChjYXRhbG9nLnJlZ0ZpbHRlcnMgfHwgW10pLm1hcCgocGF0dGVybjogc3RyaW5nKSA9PiBuZXcgUmVnRXhwKHBhdHRlcm4pKTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIGxheWVyTGlzdC5MYXllcikge1xyXG4gICAgICBpZiAoZ3JvdXAuTGF5ZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIC8vIHJlY3Vyc2l2ZSwgY2hlY2sgbmV4dCBsZXZlbFxyXG4gICAgICAgIHRoaXMuaW5jbHVkZVJlY3Vyc2l2ZUl0ZW1zKGNhdGFsb2csIGdyb3VwLCBpdGVtcyk7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgY2F0YWxvZ1Rvb2x0aXBUeXBlID0gdGhpcy5yZXRyaWV2ZVRvb2x0aXBUeXBlKGNhdGFsb2cpO1xyXG4gICAgICBjb25zdCBsYXllcnNRdWVyeUZvcm1hdCA9IHRoaXMuZmluZENhdGFsb2dJbmZvRm9ybWF0KGNhdGFsb2cpO1xyXG4gICAgICAvLyBUT0RPOiBTbGljZSB0aGF0IGludG8gbXVsdGlwbGUgbWV0aG9kc1xyXG4gICAgICAvLyBEZWZpbmUgb2JqZWN0IG9mIGdyb3VwIGxheWVyXHJcbiAgICAgIGNvbnN0IGdyb3VwSXRlbSA9IHtcclxuICAgICAgICBpZDogYGNhdGFsb2cuZ3JvdXAuJHtsYXllckxpc3QuTmFtZX1gLFxyXG4gICAgICAgIHR5cGU6IENhdGFsb2dJdGVtVHlwZS5Hcm91cCxcclxuICAgICAgICB0aXRsZTogbGF5ZXJMaXN0LlRpdGxlLFxyXG4gICAgICAgIGl0ZW1zOiBsYXllckxpc3QuTGF5ZXIucmVkdWNlKChsYXllcnM6IENhdGFsb2dJdGVtTGF5ZXI8SW1hZ2VMYXllck9wdGlvbnM+W10sIGxheWVyOiBhbnkpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGNvbmZpZ3VyZWRRdWVyeUZvcm1hdCA9IHRoaXMucmV0cml2ZUxheWVySW5mb0Zvcm1hdChsYXllci5OYW1lLCBsYXllcnNRdWVyeUZvcm1hdCk7XHJcblxyXG4gICAgICAgICAgaWYgKHRoaXMudGVzdExheWVyUmVnZXhlcyhsYXllci5OYW1lLCByZWdleGVzKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxheWVycztcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zdCBtZXRhZGF0YSA9IGxheWVyLkRhdGFVUkwgPyBsYXllci5EYXRhVVJMWzBdIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgY29uc3QgYWJzdHJhY3QgPSBsYXllci5BYnN0cmFjdCA/IGxheWVyLkFic3RyYWN0IDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgY29uc3Qga2V5d29yZExpc3QgPSBsYXllci5LZXl3b3JkTGlzdCA/IGxheWVyLktleXdvcmRMaXN0IDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgY29uc3QgdGltZUZpbHRlciA9IHRoaXMuY2FwYWJpbGl0aWVzU2VydmljZS5nZXRUaW1lRmlsdGVyKGxheWVyKTtcclxuICAgICAgICAgIGNvbnN0IHRpbWVGaWx0ZXJhYmxlID0gdGltZUZpbHRlciAmJiBPYmplY3Qua2V5cyh0aW1lRmlsdGVyKS5sZW5ndGggPiAwID8gdHJ1ZSA6IGZhbHNlO1xyXG5cclxuICAgICAgICAgIGNvbnN0IHNvdXJjZU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHR5cGU6ICd3bXMnLFxyXG4gICAgICAgICAgICB1cmw6IGNhdGFsb2cudXJsLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICBsYXllcnM6IGxheWVyLk5hbWUsXHJcbiAgICAgICAgICAgICAgZmVhdHVyZV9jb3VudDogIGNhdGFsb2cuY291bnRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGltZUZpbHRlcjogeyAuLi50aW1lRmlsdGVyLCAuLi5jYXRhbG9nLnRpbWVGaWx0ZXIgfSxcclxuICAgICAgICAgICAgdGltZUZpbHRlcmFibGU6IHRpbWVGaWx0ZXJhYmxlID8gdHJ1ZSA6IGZhbHNlLFxyXG4gICAgICAgICAgICBxdWVyeWFibGU6IGxheWVyLnF1ZXJ5YWJsZSxcclxuICAgICAgICAgICAgcXVlcnlGb3JtYXQ6IGNvbmZpZ3VyZWRRdWVyeUZvcm1hdCxcclxuICAgICAgICAgICAgcXVlcnlIdG1sVGFyZ2V0OiBjYXRhbG9nLnF1ZXJ5SHRtbFRhcmdldCB8fCBRdWVyeUh0bWxUYXJnZXQuSUZSQU1FXHJcbiAgICAgICAgICB9IGFzIFdNU0RhdGFTb3VyY2VPcHRpb25zO1xyXG5cclxuICAgICAgICAgIGxheWVycy5wdXNoKHtcclxuICAgICAgICAgICAgaWQ6IGdlbmVyYXRlSWRGcm9tU291cmNlT3B0aW9ucyhzb3VyY2VPcHRpb25zKSxcclxuICAgICAgICAgICAgdHlwZTogQ2F0YWxvZ0l0ZW1UeXBlLkxheWVyLFxyXG4gICAgICAgICAgICB0aXRsZTogbGF5ZXIuVGl0bGUsXHJcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICB0aXRsZTogbGF5ZXIuVGl0bGUsXHJcbiAgICAgICAgICAgICAgbWF4UmVzb2x1dGlvbjpcclxuICAgICAgICAgICAgICAgIGdldFJlc29sdXRpb25Gcm9tU2NhbGUobGF5ZXIuTWF4U2NhbGVEZW5vbWluYXRvcikgfHwgSW5maW5pdHksXHJcbiAgICAgICAgICAgICAgbWluUmVzb2x1dGlvbjpcclxuICAgICAgICAgICAgICAgIGdldFJlc29sdXRpb25Gcm9tU2NhbGUobGF5ZXIuTWluU2NhbGVEZW5vbWluYXRvcikgfHwgMCxcclxuICAgICAgICAgICAgICBtZXRhZGF0YToge1xyXG4gICAgICAgICAgICAgICAgdXJsOiBtZXRhZGF0YSA/IG1ldGFkYXRhLk9ubGluZVJlc291cmNlIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgZXh0ZXJuOiBtZXRhZGF0YSA/IHRydWUgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICBhYnN0cmFjdCxcclxuICAgICAgICAgICAgICAgIGtleXdvcmRMaXN0XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB0b29sdGlwOiB7IHR5cGU6IGNhdGFsb2dUb29sdGlwVHlwZSB9IGFzIFRvb2x0aXBDb250ZW50LFxyXG4gICAgICAgICAgICAgIHNvdXJjZU9wdGlvbnNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICByZXR1cm4gbGF5ZXJzO1xyXG5cclxuICAgICAgICB9LCBbXSlcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAoZ3JvdXBJdGVtLml0ZW1zLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgIGl0ZW1zLnB1c2goZ3JvdXBJdGVtKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQnJlYWsgdGhlIGdyb3VwIChkb24ndCBhZGQgYSBncm91cCBvZiBsYXllciBmb3IgZWFjaCBvZiB0aGVpciBsYXllciEpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRXTVRTSXRlbXMoY2F0YWxvZzogQ2F0YWxvZywgY2FwYWJpbGl0aWVzOiB7W2tleTogc3RyaW5nXTogYW55fSk6IENhdGFsb2dJdGVtTGF5ZXJbXSB7XHJcbiAgICBjb25zdCBsYXllcnMgPSBjYXBhYmlsaXRpZXMuQ29udGVudHMuTGF5ZXI7XHJcbiAgICBjb25zdCByZWdleGVzID0gKGNhdGFsb2cucmVnRmlsdGVycyB8fCBbXSkubWFwKChwYXR0ZXJuOiBzdHJpbmcpID0+IG5ldyBSZWdFeHAocGF0dGVybikpO1xyXG5cclxuICAgIHJldHVybiBsYXllcnMubWFwKChsYXllcjogYW55KSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnRlc3RMYXllclJlZ2V4ZXMobGF5ZXIuSWRlbnRpZmllciwgcmVnZXhlcykgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3Qgc291cmNlT3B0aW9ucyA9IHtcclxuICAgICAgICB0eXBlOiAnd210cycsXHJcbiAgICAgICAgdXJsOiBjYXRhbG9nLnVybCxcclxuICAgICAgICBsYXllcjogbGF5ZXIuSWRlbnRpZmllcixcclxuICAgICAgICBtYXRyaXhTZXQ6IGNhdGFsb2cubWF0cml4U2V0LFxyXG4gICAgICAgIG9wdGlvbnNGcm9tQ2FwYWJpbGl0aWVzOiB0cnVlLFxyXG4gICAgICAgIHJlcXVlc3RFbmNvZGluZzogY2F0YWxvZy5yZXF1ZXN0RW5jb2RpbmcgfHwgJ0tWUCcsXHJcbiAgICAgICAgc3R5bGU6ICdkZWZhdWx0JyxcclxuICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgIHZlcnNpb246ICcxLjAuMCdcclxuICAgICAgICB9XHJcbiAgICAgIH0gYXMgV01UU0RhdGFTb3VyY2VPcHRpb25zO1xyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBpZDogZ2VuZXJhdGVJZEZyb21Tb3VyY2VPcHRpb25zKHNvdXJjZU9wdGlvbnMpLFxyXG4gICAgICAgIHR5cGU6IENhdGFsb2dJdGVtVHlwZS5MYXllcixcclxuICAgICAgICB0aXRsZTogbGF5ZXIuVGl0bGUsXHJcbiAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgdGl0bGU6IGxheWVyLlRpdGxlLFxyXG4gICAgICAgICAgc291cmNlT3B0aW9uc1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgIH0pXHJcbiAgICAuZmlsdGVyKChpdGVtOiBDYXRhbG9nSXRlbUxheWVyIHwgdW5kZWZpbmVkKSA9PiBpdGVtICE9PSB1bmRlZmluZWQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0ZXN0TGF5ZXJSZWdleGVzKGxheWVyTmFtZSwgcmVnZXhlcyk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHJlZ2V4ZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlZ2V4ZXMuZmluZCgocmVnZXg6IFJlZ0V4cCkgPT4gcmVnZXgudGVzdChsYXllck5hbWUpKSAhPT0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZXRyaXZlTGF5ZXJJbmZvRm9ybWF0KFxyXG4gICAgbGF5ZXJOYW1lRnJvbUNhdGFsb2c6IHN0cmluZyxcclxuICAgIGxheWVyc1F1ZXJ5Rm9ybWF0OiB7IGxheWVyOiBzdHJpbmcsIHF1ZXJ5Rm9ybWF0OiBRdWVyeUZvcm1hdCB9W11cclxuICApOiBRdWVyeUZvcm1hdCB7XHJcblxyXG4gICAgY29uc3QgY3VycmVudExheWVySW5mb0Zvcm1hdCA9IGxheWVyc1F1ZXJ5Rm9ybWF0LmZpbmQoZiA9PiBmLmxheWVyID09PSBsYXllck5hbWVGcm9tQ2F0YWxvZyk7XHJcbiAgICBjb25zdCBiYXNlSW5mb0Zvcm1hdCA9IGxheWVyc1F1ZXJ5Rm9ybWF0LmZpbmQoZiA9PiBmLmxheWVyID09PSAnKicpO1xyXG4gICAgbGV0IHF1ZXJ5Rm9ybWF0OiBRdWVyeUZvcm1hdDtcclxuICAgIGlmIChjdXJyZW50TGF5ZXJJbmZvRm9ybWF0KSB7XHJcbiAgICAgIHF1ZXJ5Rm9ybWF0ID0gY3VycmVudExheWVySW5mb0Zvcm1hdC5xdWVyeUZvcm1hdDtcclxuICAgIH0gZWxzZSBpZiAoYmFzZUluZm9Gb3JtYXQpIHtcclxuICAgICAgcXVlcnlGb3JtYXQgPSBiYXNlSW5mb0Zvcm1hdC5xdWVyeUZvcm1hdDtcclxuICAgIH1cclxuICAgIHJldHVybiBxdWVyeUZvcm1hdDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmV0cmlldmVUb29sdGlwVHlwZShjYXRhbG9nOiBDYXRhbG9nKTogVG9vbHRpcFR5cGUge1xyXG4gICAgaWYgKCFjYXRhbG9nLnRvb2x0aXBUeXBlKSB7XHJcbiAgICAgIHJldHVybiBUb29sdGlwVHlwZS5USVRMRTtcclxuICAgIH1cclxuICAgIHJldHVybiBjYXRhbG9nLnRvb2x0aXBUeXBlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmaW5kQ2F0YWxvZ0luZm9Gb3JtYXQoY2F0YWxvZzogQ2F0YWxvZyk6IHtsYXllcjogc3RyaW5nLCBxdWVyeUZvcm1hdDogUXVlcnlGb3JtYXR9W10ge1xyXG4gICAgY29uc3QgbGF5ZXJzUXVlcnlGb3JtYXQ6IHtsYXllcjogc3RyaW5nLCBxdWVyeUZvcm1hdDogUXVlcnlGb3JtYXR9W10gPSBbXTtcclxuICAgIGlmICghY2F0YWxvZy5xdWVyeUZvcm1hdCkge1xyXG4gICAgICByZXR1cm4gbGF5ZXJzUXVlcnlGb3JtYXQ7XHJcbiAgICB9XHJcbiAgICBPYmplY3Qua2V5cyhjYXRhbG9nLnF1ZXJ5Rm9ybWF0KS5mb3JFYWNoKGNvbmZpZ3VyZWRJbmZvRm9ybWF0ID0+IHtcclxuICAgICAgaWYgKGNhdGFsb2cucXVlcnlGb3JtYXRbY29uZmlndXJlZEluZm9Gb3JtYXRdIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICBjYXRhbG9nLnF1ZXJ5Rm9ybWF0W2NvbmZpZ3VyZWRJbmZvRm9ybWF0XS5mb3JFYWNoKGxheWVyTmFtZSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWxheWVyc1F1ZXJ5Rm9ybWF0LmZpbmQoc3BlY2lmaWMgPT4gc3BlY2lmaWMubGF5ZXIgPT09IGxheWVyTmFtZSkpIHtcclxuICAgICAgICAgICAgbGF5ZXJzUXVlcnlGb3JtYXQucHVzaCh7IGxheWVyOiBsYXllck5hbWUsIHF1ZXJ5Rm9ybWF0OiBjb25maWd1cmVkSW5mb0Zvcm1hdCBhcyBRdWVyeUZvcm1hdCB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoIWxheWVyc1F1ZXJ5Rm9ybWF0LmZpbmQoc3BlY2lmaWMgPT4gc3BlY2lmaWMubGF5ZXIgPT09IGNhdGFsb2cucXVlcnlGb3JtYXRbY29uZmlndXJlZEluZm9Gb3JtYXRdKSkge1xyXG4gICAgICAgICAgbGF5ZXJzUXVlcnlGb3JtYXQucHVzaCh7IGxheWVyOiBjYXRhbG9nLnF1ZXJ5Rm9ybWF0W2NvbmZpZ3VyZWRJbmZvRm9ybWF0XSwgcXVlcnlGb3JtYXQ6IGNvbmZpZ3VyZWRJbmZvRm9ybWF0IGFzIFF1ZXJ5Rm9ybWF0IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbGF5ZXJzUXVlcnlGb3JtYXQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==