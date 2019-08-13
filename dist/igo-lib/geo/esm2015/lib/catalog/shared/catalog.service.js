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
        /** @type {?} */
        const catalogQueryParams = catalog.queryParams || {};
        /** @type {?} */
        const catalogSourceOptions = catalog.sourceOptions || {};
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
                    const params = Object.assign({}, catalogQueryParams, {
                        layers: layer.Name,
                        feature_count: catalog.count
                    });
                    /** @type {?} */
                    const baseSourceOptions = {
                        type: 'wms',
                        url: catalog.url,
                        crossOrigin: catalog.setCrossOriginAnonymous ? 'anonymous' : undefined,
                        timeFilter: Object.assign({}, timeFilter, catalog.timeFilter),
                        timeFilterable: timeFilterable ? true : false,
                        queryable: layer.queryable,
                        queryFormat: configuredQueryFormat,
                        queryHtmlTarget: catalog.queryHtmlTarget || QueryHtmlTarget.IFRAME
                    };
                    /** @type {?} */
                    const sourceOptions = (/** @type {?} */ (Object.assign({}, baseSourceOptions, catalogSourceOptions, { params })));
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
        /** @type {?} */
        const catalogQueryParams = catalog.queryParams || {};
        /** @type {?} */
        const catalogSourceOptions = catalog.sourceOptions || {};
        return layers.map((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => {
            if (this.testLayerRegexes(layer.Identifier, regexes) === false) {
                return undefined;
            }
            /** @type {?} */
            const params = Object.assign({}, catalogQueryParams, {
                version: '1.0.0'
            });
            /** @type {?} */
            const baseSourceOptions = (/** @type {?} */ ({
                type: 'wmts',
                url: catalog.url,
                crossOrigin: catalog.setCrossOriginAnonymous ? 'anonymous' : undefined,
                layer: layer.Identifier,
                matrixSet: catalog.matrixSet,
                optionsFromCapabilities: true,
                requestEncoding: catalog.requestEncoding || 'KVP',
                style: 'default'
            }));
            /** @type {?} */
            const sourceOptions = (/** @type {?} */ (Object.assign({}, baseSourceOptions, catalogSourceOptions, { params })));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2NhdGFsb2cvc2hhcmVkL2NhdGFsb2cuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFxQixNQUFNLHNCQUFzQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxLQUFLLEVBQWMsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpELE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzVELE9BQU8sRUFDTCxtQkFBbUIsRUFHbkIsMkJBQTJCLEVBQzVCLE1BQU0sa0JBQWtCLENBQUM7QUFDMUIsT0FBTyxFQUFtRCxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDM0YsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBUW5ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsZUFBZSxFQUFlLE1BQU0sYUFBYSxDQUFDOzs7OztBQUszRCxNQUFNLE9BQU8sY0FBYzs7Ozs7OztJQUV6QixZQUNVLElBQWdCLEVBQ2hCLE1BQXFCLEVBQ3JCLGVBQWdDLEVBQ2hDLG1CQUF3QztRQUh4QyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLFdBQU0sR0FBTixNQUFNLENBQWU7UUFDckIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7SUFDL0MsQ0FBQzs7OztJQUVKLFlBQVk7O2NBQ0osYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUU7O2NBQ3RELGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFOztjQUN0RCxNQUFNLEdBQUcsYUFBYSxDQUFDLEdBQUcsSUFBSSxhQUFhLENBQUMsR0FBRzs7Y0FDL0Msa0JBQWtCLEdBQUcsYUFBYSxDQUFDLE9BQU8sSUFBSSxFQUFFO1FBRXRELElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUN4QixPQUFPLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQy9COztjQUVLLFlBQVksR0FBRyxFQUFFO1FBRXZCLHNCQUFzQjtRQUN0QixJQUFJLGFBQWEsQ0FBQyxVQUFVLEVBQUU7O2tCQUN0QixTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTOztrQkFDMUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsNEJBQTRCLENBQUM7O2tCQUN2RCxpQkFBaUIsR0FBRztnQkFDeEIsRUFBRSxFQUFFLG9CQUFvQjtnQkFDeEIsS0FBSztnQkFDTCxHQUFHLEVBQUUsR0FBRyxNQUFNLGFBQWE7Z0JBQzNCLElBQUksRUFBRSxZQUFZO2FBQ25CO1lBQ0QsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1NBQzFDOzs7Y0FHSyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsSUFBSTthQUMvQixHQUFHLENBQVksR0FBRyxNQUFNLFdBQVcsQ0FBQzthQUNwQyxJQUFJLENBQ0gsVUFBVTs7OztRQUFDLENBQUMsUUFBMkIsRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFDLENBQ25EO1FBQ0gsWUFBWSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXBDLHVCQUF1QjtRQUN2QixJQUFJLGtCQUFrQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDakMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1NBQzNDO1FBRUQsT0FBTyxtQkFBQSxNQUFNLENBQUMsR0FBRyxZQUFZLENBQUMsRUFBeUIsQ0FBQztJQUMxRCxDQUFDOzs7OztJQUVELGdCQUFnQixDQUFDLE9BQWdCO1FBQy9CLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxZQUFZLEVBQUU7WUFDakMsT0FBTyxJQUFJLENBQUMseUJBQXlCLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDaEQ7YUFBTSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO1lBQ2xDLE9BQU8sSUFBSSxDQUFDLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2hEO1FBQ0QsT0FBTyxJQUFJLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7Ozs7O0lBRU8seUJBQXlCLENBQUMsT0FBZ0I7UUFDaEQsZ0NBQWdDO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLDJCQUEyQixDQUFDLE9BQU8sQ0FBQzthQUM3QyxJQUFJLENBQ0gsR0FBRzs7OztRQUFDLENBQUMsYUFBNkIsRUFBRSxFQUFFOztrQkFDOUIsS0FBSyxHQUFHLGFBQWEsQ0FBQyxHQUFHOzs7O1lBQUMsQ0FBQyxZQUEwQixFQUFFLEVBQUU7Z0JBQzdELE9BQU8sbUJBQUE7b0JBQ0wsRUFBRSxFQUFFLDJCQUEyQixDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUM7b0JBQzNELEtBQUssRUFBRSxZQUFZLENBQUMsS0FBSztvQkFDekIsSUFBSSxFQUFFLGVBQWUsQ0FBQyxLQUFLO29CQUMzQixPQUFPLEVBQUUsWUFBWTtpQkFDdEIsRUFBb0IsQ0FBQztZQUN4QixDQUFDLEVBQUM7WUFDRixPQUFPLENBQUM7b0JBQ04sRUFBRSxFQUFFLDBCQUEwQjtvQkFDOUIsSUFBSSxFQUFFLGVBQWUsQ0FBQyxLQUFLO29CQUMzQixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7b0JBQ3BCLEtBQUs7aUJBQ04sQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNOLENBQUM7Ozs7OztJQUVPLDJCQUEyQixDQUFDLE9BQWdCO1FBQ2xELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQWlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwRCxDQUFDOzs7Ozs7SUFFTyx3QkFBd0IsQ0FBQyxPQUFnQjtRQUMvQyxPQUFPLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxPQUFPLENBQUM7YUFDM0MsSUFBSSxDQUNILEdBQUc7Ozs7UUFBQyxDQUFDLFlBQWlCLEVBQUUsRUFBRTs7a0JBQ2xCLEtBQUssR0FBRyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDMUUsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ04sQ0FBQzs7Ozs7O0lBRU8seUJBQXlCLENBQUMsT0FBZ0I7UUFDaEQsT0FBTyxJQUFJLENBQUMsMEJBQTBCLENBQUMsT0FBTyxDQUFDO2FBQzVDLElBQUksQ0FDSCxHQUFHOzs7O1FBQUMsQ0FBQyxZQUFpQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsRUFBQyxDQUNyRSxDQUFDO0lBQ04sQ0FBQzs7Ozs7O0lBRU8seUJBQXlCLENBQUMsT0FBZ0I7UUFDaEQsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2RixDQUFDOzs7Ozs7SUFFTywwQkFBMEIsQ0FBQyxPQUFnQjtRQUNqRCxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3hGLENBQUM7Ozs7Ozs7O0lBRU8scUJBQXFCLENBQUMsT0FBZ0IsRUFBRSxTQUFjLEVBQUUsS0FBb0I7OztjQUU1RSxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUc7Ozs7UUFBQyxDQUFDLE9BQWUsRUFBRSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUM7O2NBQ2xGLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxXQUFXLElBQUksRUFBRTs7Y0FDOUMsb0JBQW9CLEdBQUcsT0FBTyxDQUFDLGFBQWEsSUFBSSxFQUFFO1FBRXhELEtBQUssTUFBTSxLQUFLLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRTtZQUNuQyxJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO2dCQUM3Qiw4QkFBOEI7Z0JBQzlCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNsRCxTQUFTO2FBQ1Y7O2tCQUNLLGtCQUFrQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUM7O2tCQUN0RCxpQkFBaUIsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDOzs7O2tCQUd2RCxTQUFTLEdBQUc7Z0JBQ2hCLEVBQUUsRUFBRSxpQkFBaUIsU0FBUyxDQUFDLElBQUksRUFBRTtnQkFDckMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxLQUFLO2dCQUMzQixLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUs7Z0JBQ3RCLEtBQUssRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU07Ozs7O2dCQUFDLENBQUMsTUFBNkMsRUFBRSxLQUFVLEVBQUUsRUFBRTs7MEJBQ3BGLHFCQUFxQixHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLGlCQUFpQixDQUFDO29CQUV4RixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxLQUFLLEtBQUssRUFBRTt3QkFDeEQsT0FBTyxNQUFNLENBQUM7cUJBQ2Y7OzBCQUVLLFFBQVEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTOzswQkFDdkQsUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVM7OzBCQUN0RCxXQUFXLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUzs7MEJBQy9ELFVBQVUsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQzs7MEJBQzFELGNBQWMsR0FBRyxVQUFVLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUs7OzBCQUVoRixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsa0JBQWtCLEVBQUU7d0JBQ25ELE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSTt3QkFDbEIsYUFBYSxFQUFHLE9BQU8sQ0FBQyxLQUFLO3FCQUM5QixDQUFDOzswQkFDSSxpQkFBaUIsR0FBRzt3QkFDeEIsSUFBSSxFQUFFLEtBQUs7d0JBQ1gsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHO3dCQUNoQixXQUFXLEVBQUUsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVM7d0JBQ3RFLFVBQVUsb0JBQU8sVUFBVSxFQUFLLE9BQU8sQ0FBQyxVQUFVLENBQUU7d0JBQ3BELGNBQWMsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSzt3QkFDN0MsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTO3dCQUMxQixXQUFXLEVBQUUscUJBQXFCO3dCQUNsQyxlQUFlLEVBQUUsT0FBTyxDQUFDLGVBQWUsSUFBSSxlQUFlLENBQUMsTUFBTTtxQkFDbkU7OzBCQUNLLGFBQWEsR0FBRyxtQkFBQSxNQUFNLENBQUMsTUFBTSxDQUNqQyxFQUFFLEVBQ0YsaUJBQWlCLEVBQ2pCLG9CQUFvQixFQUNwQixFQUFDLE1BQU0sRUFBQyxDQUNULEVBQXdCO29CQUV6QixNQUFNLENBQUMsSUFBSSxDQUFDO3dCQUNWLEVBQUUsRUFBRSwyQkFBMkIsQ0FBQyxhQUFhLENBQUM7d0JBQzlDLElBQUksRUFBRSxlQUFlLENBQUMsS0FBSzt3QkFDM0IsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO3dCQUNsQixPQUFPLEVBQUU7NEJBQ1AsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLOzRCQUNsQixhQUFhLEVBQ1gsc0JBQXNCLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLElBQUksUUFBUTs0QkFDL0QsYUFBYSxFQUNYLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7NEJBQ3hELFFBQVEsRUFBRTtnQ0FDUixHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxTQUFTO2dDQUNuRCxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVM7Z0NBQ25DLFFBQVE7Z0NBQ1IsV0FBVzs2QkFDWjs0QkFDRCxPQUFPLEVBQUUsbUJBQUEsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsRUFBa0I7NEJBQ3ZELGFBQWE7eUJBQ2Q7cUJBQ0YsQ0FBQyxDQUFDO29CQUNILE9BQU8sTUFBTSxDQUFDO2dCQUVoQixDQUFDLEdBQUUsRUFBRSxDQUFDO2FBRVA7WUFFRCxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDaEMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUN2QjtZQUVELHdFQUF3RTtZQUN4RSxNQUFNO1NBQ1A7SUFDSCxDQUFDOzs7Ozs7O0lBRU8sWUFBWSxDQUFDLE9BQWdCLEVBQUUsWUFBa0M7O2NBQ2pFLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUs7O2NBQ3BDLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRzs7OztRQUFDLENBQUMsT0FBZSxFQUFFLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBQzs7Y0FDbEYsa0JBQWtCLEdBQUcsT0FBTyxDQUFDLFdBQVcsSUFBSSxFQUFFOztjQUM5QyxvQkFBb0IsR0FBRyxPQUFPLENBQUMsYUFBYSxJQUFJLEVBQUU7UUFFeEQsT0FBTyxNQUFNLENBQUMsR0FBRzs7OztRQUFDLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDL0IsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsS0FBSyxLQUFLLEVBQUU7Z0JBQzlELE9BQU8sU0FBUyxDQUFDO2FBQ2xCOztrQkFDSyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsa0JBQWtCLEVBQUU7Z0JBQ25ELE9BQU8sRUFBRSxPQUFPO2FBQ2pCLENBQUM7O2tCQUNJLGlCQUFpQixHQUFHLG1CQUFBO2dCQUN4QixJQUFJLEVBQUUsTUFBTTtnQkFDWixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUc7Z0JBQ2hCLFdBQVcsRUFBRSxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUztnQkFDdEUsS0FBSyxFQUFFLEtBQUssQ0FBQyxVQUFVO2dCQUN2QixTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVM7Z0JBQzVCLHVCQUF1QixFQUFFLElBQUk7Z0JBQzdCLGVBQWUsRUFBRSxPQUFPLENBQUMsZUFBZSxJQUFJLEtBQUs7Z0JBQ2pELEtBQUssRUFBRSxTQUFTO2FBQ2pCLEVBQXlCOztrQkFDcEIsYUFBYSxHQUFHLG1CQUFBLE1BQU0sQ0FBQyxNQUFNLENBQ2pDLEVBQUUsRUFDRixpQkFBaUIsRUFDakIsb0JBQW9CLEVBQ3BCLEVBQUMsTUFBTSxFQUFDLENBQ1QsRUFBeUI7WUFFMUIsT0FBTztnQkFDTCxFQUFFLEVBQUUsMkJBQTJCLENBQUMsYUFBYSxDQUFDO2dCQUM5QyxJQUFJLEVBQUUsZUFBZSxDQUFDLEtBQUs7Z0JBQzNCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztnQkFDbEIsT0FBTyxFQUFFO29CQUNQLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztvQkFDbEIsYUFBYTtpQkFDZDthQUNGLENBQUM7UUFDSixDQUFDLEVBQUM7YUFDRCxNQUFNOzs7O1FBQUMsQ0FBQyxJQUFrQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFDLENBQUM7SUFDdEUsQ0FBQzs7Ozs7OztJQUVPLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxPQUFPO1FBQ3pDLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDeEIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sT0FBTyxDQUFDLElBQUk7Ozs7UUFBQyxDQUFDLEtBQWEsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxLQUFLLFNBQVMsQ0FBQztJQUM5RSxDQUFDOzs7Ozs7O0lBRU8sc0JBQXNCLENBQzVCLG9CQUE0QixFQUM1QixpQkFBZ0U7O2NBRzFELHNCQUFzQixHQUFHLGlCQUFpQixDQUFDLElBQUk7Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssb0JBQW9CLEVBQUM7O2NBQ3RGLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEdBQUcsRUFBQzs7WUFDL0QsV0FBd0I7UUFDNUIsSUFBSSxzQkFBc0IsRUFBRTtZQUMxQixXQUFXLEdBQUcsc0JBQXNCLENBQUMsV0FBVyxDQUFDO1NBQ2xEO2FBQU0sSUFBSSxjQUFjLEVBQUU7WUFDekIsV0FBVyxHQUFHLGNBQWMsQ0FBQyxXQUFXLENBQUM7U0FDMUM7UUFDRCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDOzs7Ozs7SUFFTyxtQkFBbUIsQ0FBQyxPQUFnQjtRQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRTtZQUN4QixPQUFPLFdBQVcsQ0FBQyxLQUFLLENBQUM7U0FDMUI7UUFDRCxPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUM7SUFDN0IsQ0FBQzs7Ozs7O0lBRU8scUJBQXFCLENBQUMsT0FBZ0I7O2NBQ3RDLGlCQUFpQixHQUFnRCxFQUFFO1FBQ3pFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO1lBQ3hCLE9BQU8saUJBQWlCLENBQUM7U0FDMUI7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPOzs7O1FBQUMsb0JBQW9CLENBQUMsRUFBRTtZQUM5RCxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsb0JBQW9CLENBQUMsWUFBWSxLQUFLLEVBQUU7Z0JBQzlELE9BQU8sQ0FBQyxXQUFXLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxPQUFPOzs7O2dCQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUM1RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSTs7OztvQkFBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFDLEVBQUU7d0JBQ3JFLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLG1CQUFBLG9CQUFvQixFQUFlLEVBQUUsQ0FBQyxDQUFDO3FCQUNoRztnQkFDSCxDQUFDLEVBQUMsQ0FBQzthQUNKO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJOzs7O2dCQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxPQUFPLENBQUMsV0FBVyxDQUFDLG9CQUFvQixDQUFDLEVBQUMsRUFBRTtvQkFDckcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsb0JBQW9CLENBQUMsRUFBRSxXQUFXLEVBQUUsbUJBQUEsb0JBQW9CLEVBQWUsRUFBRSxDQUFDLENBQUM7aUJBQ2hJO2FBQ0Y7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUNILE9BQU8saUJBQWlCLENBQUM7SUFDM0IsQ0FBQzs7O1lBeFNGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQXpCUSxVQUFVO1lBSU8sYUFBYTtZQUE5QixlQUFlO1lBRXRCLG1CQUFtQjs7Ozs7Ozs7SUF1QmpCLDhCQUF3Qjs7Ozs7SUFDeEIsZ0NBQTZCOzs7OztJQUM3Qix5Q0FBd0M7Ozs7O0lBQ3hDLDZDQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEVNUFRZLCBPYnNlcnZhYmxlLCBvZiwgY29uY2F0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCwgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IExhbmd1YWdlU2VydmljZSwgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIENhcGFiaWxpdGllc1NlcnZpY2UsXHJcbiAgV01TRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgV01UU0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gIGdlbmVyYXRlSWRGcm9tU291cmNlT3B0aW9uc1xyXG59IGZyb20gJy4uLy4uL2RhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBMYXllck9wdGlvbnMsIEltYWdlTGF5ZXJPcHRpb25zLCBUb29sdGlwQ29udGVudCwgVG9vbHRpcFR5cGUgfSBmcm9tICcuLi8uLi9sYXllcic7XHJcbmltcG9ydCB7IGdldFJlc29sdXRpb25Gcm9tU2NhbGUgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5cclxuaW1wb3J0IHtcclxuICBDYXRhbG9nLFxyXG4gIENhdGFsb2dJdGVtLFxyXG4gIENhdGFsb2dJdGVtTGF5ZXIsXHJcbiAgQ2F0YWxvZ0l0ZW1Hcm91cFxyXG59IGZyb20gJy4vY2F0YWxvZy5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBDYXRhbG9nSXRlbVR5cGUgfSBmcm9tICcuL2NhdGFsb2cuZW51bSc7XHJcbmltcG9ydCB7IFF1ZXJ5SHRtbFRhcmdldCwgUXVlcnlGb3JtYXQgfSBmcm9tICcuLi8uLi9xdWVyeSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYXRhbG9nU2VydmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjYXBhYmlsaXRpZXNTZXJ2aWNlOiBDYXBhYmlsaXRpZXNTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBsb2FkQ2F0YWxvZ3MoKTogT2JzZXJ2YWJsZTxDYXRhbG9nW10+IHtcclxuICAgIGNvbnN0IGNvbnRleHRDb25maWcgPSB0aGlzLmNvbmZpZy5nZXRDb25maWcoJ2NvbnRleHQnKSB8fCB7fTtcclxuICAgIGNvbnN0IGNhdGFsb2dDb25maWcgPSB0aGlzLmNvbmZpZy5nZXRDb25maWcoJ2NhdGFsb2cnKSB8fCB7fTtcclxuICAgIGNvbnN0IGFwaVVybCA9IGNhdGFsb2dDb25maWcudXJsIHx8IGNvbnRleHRDb25maWcudXJsO1xyXG4gICAgY29uc3QgY2F0YWxvZ3NGcm9tQ29uZmlnID0gY2F0YWxvZ0NvbmZpZy5zb3VyY2VzIHx8IFtdO1xyXG5cclxuICAgIGlmIChhcGlVcmwgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gb2YoY2F0YWxvZ3NGcm9tQ29uZmlnKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvYnNlcnZhYmxlcyQgPSBbXTtcclxuXHJcbiAgICAvLyBCYXNlIGxheWVycyBjYXRhbG9nXHJcbiAgICBpZiAoY2F0YWxvZ0NvbmZpZy5iYXNlTGF5ZXJzKSB7XHJcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5jYXRhbG9nLmJhc2VMYXllcnMnKTtcclxuICAgICAgY29uc3QgYmFzZUxheWVyc0NhdGFsb2cgPSB7XHJcbiAgICAgICAgaWQ6ICdjYXRhbG9nLmJhc2VsYXllcnMnLFxyXG4gICAgICAgIHRpdGxlLFxyXG4gICAgICAgIHVybDogYCR7YXBpVXJsfS9iYXNlbGF5ZXJzYCxcclxuICAgICAgICB0eXBlOiAnYmFzZWxheWVycydcclxuICAgICAgfTtcclxuICAgICAgb2JzZXJ2YWJsZXMkLnB1c2gob2YoYmFzZUxheWVyc0NhdGFsb2cpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDYXRhbG9ncyBmcm9tIEFQSVxyXG4gICAgY29uc3QgY2F0YWxvZ3NGcm9tQXBpJCA9IHRoaXMuaHR0cFxyXG4gICAgICAuZ2V0PENhdGFsb2dbXT4oYCR7YXBpVXJsfS9jYXRhbG9nc2ApXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIGNhdGNoRXJyb3IoKHJlc3BvbnNlOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4gRU1QVFkpXHJcbiAgICAgICk7XHJcbiAgICBvYnNlcnZhYmxlcyQucHVzaChjYXRhbG9nc0Zyb21BcGkkKTtcclxuXHJcbiAgICAvLyBDYXRhbG9ncyBmcm9tIGNvbmZpZ1xyXG4gICAgaWYgKGNhdGFsb2dzRnJvbUNvbmZpZy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIG9ic2VydmFibGVzJC5wdXNoKG9mKGNhdGFsb2dzRnJvbUNvbmZpZykpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjb25jYXQoLi4ub2JzZXJ2YWJsZXMkKSBhcyBPYnNlcnZhYmxlPENhdGFsb2dbXT47XHJcbiAgfVxyXG5cclxuICBsb2FkQ2F0YWxvZ0l0ZW1zKGNhdGFsb2c6IENhdGFsb2cpOiBPYnNlcnZhYmxlPENhdGFsb2dJdGVtW10+IHtcclxuICAgIGlmIChjYXRhbG9nLnR5cGUgPT09ICdiYXNlbGF5ZXJzJykge1xyXG4gICAgICByZXR1cm4gdGhpcy5sb2FkQ2F0YWxvZ0Jhc2VMYXllckl0ZW1zKGNhdGFsb2cpO1xyXG4gICAgfSBlbHNlIGlmIChjYXRhbG9nLnR5cGUgPT09ICd3bXRzJykge1xyXG4gICAgICByZXR1cm4gdGhpcy5sb2FkQ2F0YWxvZ1dNVFNMYXllckl0ZW1zKGNhdGFsb2cpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMubG9hZENhdGFsb2dXTVNMYXllckl0ZW1zKGNhdGFsb2cpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBsb2FkQ2F0YWxvZ0Jhc2VMYXllckl0ZW1zKGNhdGFsb2c6IENhdGFsb2cpOiBPYnNlcnZhYmxlPENhdGFsb2dJdGVtR3JvdXBbXT4ge1xyXG4gICAgLy8gVE9ETzogSSdtIG5vdCBzdXJlIHRoaXMgd29ya3NcclxuICAgIHJldHVybiB0aGlzLmdldENhdGFsb2dCYXNlTGF5ZXJzT3B0aW9ucyhjYXRhbG9nKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoKGxheWVyc09wdGlvbnM6IExheWVyT3B0aW9uc1tdKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBpdGVtcyA9IGxheWVyc09wdGlvbnMubWFwKChsYXllck9wdGlvbnM6IExheWVyT3B0aW9ucykgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgIGlkOiBnZW5lcmF0ZUlkRnJvbVNvdXJjZU9wdGlvbnMobGF5ZXJPcHRpb25zLnNvdXJjZU9wdGlvbnMpLFxyXG4gICAgICAgICAgICAgIHRpdGxlOiBsYXllck9wdGlvbnMudGl0bGUsXHJcbiAgICAgICAgICAgICAgdHlwZTogQ2F0YWxvZ0l0ZW1UeXBlLkxheWVyLFxyXG4gICAgICAgICAgICAgIG9wdGlvbnM6IGxheWVyT3B0aW9uc1xyXG4gICAgICAgICAgICB9IGFzIENhdGFsb2dJdGVtTGF5ZXI7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHJldHVybiBbe1xyXG4gICAgICAgICAgICBpZDogJ2NhdGFsb2cuZ3JvdXAuYmFzZWxheWVycycsXHJcbiAgICAgICAgICAgIHR5cGU6IENhdGFsb2dJdGVtVHlwZS5Hcm91cCxcclxuICAgICAgICAgICAgdGl0bGU6IGNhdGFsb2cudGl0bGUsXHJcbiAgICAgICAgICAgIGl0ZW1zXHJcbiAgICAgICAgICB9XTtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRDYXRhbG9nQmFzZUxheWVyc09wdGlvbnMoY2F0YWxvZzogQ2F0YWxvZyk6IE9ic2VydmFibGU8TGF5ZXJPcHRpb25zW10+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExheWVyT3B0aW9uc1tdPihjYXRhbG9nLnVybCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGxvYWRDYXRhbG9nV01TTGF5ZXJJdGVtcyhjYXRhbG9nOiBDYXRhbG9nKTogT2JzZXJ2YWJsZTxDYXRhbG9nSXRlbVtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRDYXRhbG9nV01TQ2FwYWJpbGl0aWVzKGNhdGFsb2cpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcCgoY2FwYWJpbGl0aWVzOiBhbnkpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGl0ZW1zID0gW107XHJcbiAgICAgICAgICB0aGlzLmluY2x1ZGVSZWN1cnNpdmVJdGVtcyhjYXRhbG9nLCBjYXBhYmlsaXRpZXMuQ2FwYWJpbGl0eS5MYXllciwgaXRlbXMpO1xyXG4gICAgICAgICAgcmV0dXJuIGl0ZW1zO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGxvYWRDYXRhbG9nV01UU0xheWVySXRlbXMoY2F0YWxvZzogQ2F0YWxvZyk6IE9ic2VydmFibGU8Q2F0YWxvZ0l0ZW1bXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2F0YWxvZ1dNVFNDYXBhYmlsaXRpZXMoY2F0YWxvZylcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChjYXBhYmlsaXRpZXM6IGFueSkgPT4gdGhpcy5nZXRXTVRTSXRlbXMoY2F0YWxvZywgY2FwYWJpbGl0aWVzKSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0Q2F0YWxvZ1dNU0NhcGFiaWxpdGllcyhjYXRhbG9nOiBDYXRhbG9nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmNhcGFiaWxpdGllc1NlcnZpY2UuZ2V0Q2FwYWJpbGl0aWVzKCd3bXMnLCBjYXRhbG9nLnVybCwgY2F0YWxvZy52ZXJzaW9uKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0Q2F0YWxvZ1dNVFNDYXBhYmlsaXRpZXMoY2F0YWxvZzogQ2F0YWxvZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXBhYmlsaXRpZXNTZXJ2aWNlLmdldENhcGFiaWxpdGllcygnd210cycsIGNhdGFsb2cudXJsLCBjYXRhbG9nLnZlcnNpb24pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbmNsdWRlUmVjdXJzaXZlSXRlbXMoY2F0YWxvZzogQ2F0YWxvZywgbGF5ZXJMaXN0OiBhbnksIGl0ZW1zOiBDYXRhbG9nSXRlbVtdKSB7XHJcbiAgICAvLyBEaWcgYWxsIGxldmVscyB1bnRpbCBsYXN0IGxldmVsIChsYXllciBvYmplY3QgYXJlIG5vdCBkZWZpbmVkIG9uIGxhc3QgbGV2ZWwpXHJcbiAgICBjb25zdCByZWdleGVzID0gKGNhdGFsb2cucmVnRmlsdGVycyB8fCBbXSkubWFwKChwYXR0ZXJuOiBzdHJpbmcpID0+IG5ldyBSZWdFeHAocGF0dGVybikpO1xyXG4gICAgY29uc3QgY2F0YWxvZ1F1ZXJ5UGFyYW1zID0gY2F0YWxvZy5xdWVyeVBhcmFtcyB8fCB7fTtcclxuICAgIGNvbnN0IGNhdGFsb2dTb3VyY2VPcHRpb25zID0gY2F0YWxvZy5zb3VyY2VPcHRpb25zIHx8IHt9O1xyXG5cclxuICAgIGZvciAoY29uc3QgZ3JvdXAgb2YgbGF5ZXJMaXN0LkxheWVyKSB7XHJcbiAgICAgIGlmIChncm91cC5MYXllciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgLy8gcmVjdXJzaXZlLCBjaGVjayBuZXh0IGxldmVsXHJcbiAgICAgICAgdGhpcy5pbmNsdWRlUmVjdXJzaXZlSXRlbXMoY2F0YWxvZywgZ3JvdXAsIGl0ZW1zKTtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBjYXRhbG9nVG9vbHRpcFR5cGUgPSB0aGlzLnJldHJpZXZlVG9vbHRpcFR5cGUoY2F0YWxvZyk7XHJcbiAgICAgIGNvbnN0IGxheWVyc1F1ZXJ5Rm9ybWF0ID0gdGhpcy5maW5kQ2F0YWxvZ0luZm9Gb3JtYXQoY2F0YWxvZyk7XHJcbiAgICAgIC8vIFRPRE86IFNsaWNlIHRoYXQgaW50byBtdWx0aXBsZSBtZXRob2RzXHJcbiAgICAgIC8vIERlZmluZSBvYmplY3Qgb2YgZ3JvdXAgbGF5ZXJcclxuICAgICAgY29uc3QgZ3JvdXBJdGVtID0ge1xyXG4gICAgICAgIGlkOiBgY2F0YWxvZy5ncm91cC4ke2xheWVyTGlzdC5OYW1lfWAsXHJcbiAgICAgICAgdHlwZTogQ2F0YWxvZ0l0ZW1UeXBlLkdyb3VwLFxyXG4gICAgICAgIHRpdGxlOiBsYXllckxpc3QuVGl0bGUsXHJcbiAgICAgICAgaXRlbXM6IGxheWVyTGlzdC5MYXllci5yZWR1Y2UoKGxheWVyczogQ2F0YWxvZ0l0ZW1MYXllcjxJbWFnZUxheWVyT3B0aW9ucz5bXSwgbGF5ZXI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgY29uZmlndXJlZFF1ZXJ5Rm9ybWF0ID0gdGhpcy5yZXRyaXZlTGF5ZXJJbmZvRm9ybWF0KGxheWVyLk5hbWUsIGxheWVyc1F1ZXJ5Rm9ybWF0KTtcclxuXHJcbiAgICAgICAgICBpZiAodGhpcy50ZXN0TGF5ZXJSZWdleGVzKGxheWVyLk5hbWUsIHJlZ2V4ZXMpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGF5ZXJzO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnN0IG1ldGFkYXRhID0gbGF5ZXIuRGF0YVVSTCA/IGxheWVyLkRhdGFVUkxbMF0gOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICBjb25zdCBhYnN0cmFjdCA9IGxheWVyLkFic3RyYWN0ID8gbGF5ZXIuQWJzdHJhY3QgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICBjb25zdCBrZXl3b3JkTGlzdCA9IGxheWVyLktleXdvcmRMaXN0ID8gbGF5ZXIuS2V5d29yZExpc3QgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICBjb25zdCB0aW1lRmlsdGVyID0gdGhpcy5jYXBhYmlsaXRpZXNTZXJ2aWNlLmdldFRpbWVGaWx0ZXIobGF5ZXIpO1xyXG4gICAgICAgICAgY29uc3QgdGltZUZpbHRlcmFibGUgPSB0aW1lRmlsdGVyICYmIE9iamVjdC5rZXlzKHRpbWVGaWx0ZXIpLmxlbmd0aCA+IDAgPyB0cnVlIDogZmFsc2U7XHJcblxyXG4gICAgICAgICAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgY2F0YWxvZ1F1ZXJ5UGFyYW1zLCB7XHJcbiAgICAgICAgICAgIGxheWVyczogbGF5ZXIuTmFtZSxcclxuICAgICAgICAgICAgZmVhdHVyZV9jb3VudDogIGNhdGFsb2cuY291bnRcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgY29uc3QgYmFzZVNvdXJjZU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHR5cGU6ICd3bXMnLFxyXG4gICAgICAgICAgICB1cmw6IGNhdGFsb2cudXJsLFxyXG4gICAgICAgICAgICBjcm9zc09yaWdpbjogY2F0YWxvZy5zZXRDcm9zc09yaWdpbkFub255bW91cyA/ICdhbm9ueW1vdXMnIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICB0aW1lRmlsdGVyOiB7IC4uLnRpbWVGaWx0ZXIsIC4uLmNhdGFsb2cudGltZUZpbHRlciB9LFxyXG4gICAgICAgICAgICB0aW1lRmlsdGVyYWJsZTogdGltZUZpbHRlcmFibGUgPyB0cnVlIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHF1ZXJ5YWJsZTogbGF5ZXIucXVlcnlhYmxlLFxyXG4gICAgICAgICAgICBxdWVyeUZvcm1hdDogY29uZmlndXJlZFF1ZXJ5Rm9ybWF0LFxyXG4gICAgICAgICAgICBxdWVyeUh0bWxUYXJnZXQ6IGNhdGFsb2cucXVlcnlIdG1sVGFyZ2V0IHx8IFF1ZXJ5SHRtbFRhcmdldC5JRlJBTUVcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBjb25zdCBzb3VyY2VPcHRpb25zID0gT2JqZWN0LmFzc2lnbihcclxuICAgICAgICAgICAge30sXHJcbiAgICAgICAgICAgIGJhc2VTb3VyY2VPcHRpb25zLFxyXG4gICAgICAgICAgICBjYXRhbG9nU291cmNlT3B0aW9ucyxcclxuICAgICAgICAgICAge3BhcmFtc31cclxuICAgICAgICAgICkgYXMgV01TRGF0YVNvdXJjZU9wdGlvbnM7XHJcblxyXG4gICAgICAgICAgbGF5ZXJzLnB1c2goe1xyXG4gICAgICAgICAgICBpZDogZ2VuZXJhdGVJZEZyb21Tb3VyY2VPcHRpb25zKHNvdXJjZU9wdGlvbnMpLFxyXG4gICAgICAgICAgICB0eXBlOiBDYXRhbG9nSXRlbVR5cGUuTGF5ZXIsXHJcbiAgICAgICAgICAgIHRpdGxlOiBsYXllci5UaXRsZSxcclxuICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiBsYXllci5UaXRsZSxcclxuICAgICAgICAgICAgICBtYXhSZXNvbHV0aW9uOlxyXG4gICAgICAgICAgICAgICAgZ2V0UmVzb2x1dGlvbkZyb21TY2FsZShsYXllci5NYXhTY2FsZURlbm9taW5hdG9yKSB8fCBJbmZpbml0eSxcclxuICAgICAgICAgICAgICBtaW5SZXNvbHV0aW9uOlxyXG4gICAgICAgICAgICAgICAgZ2V0UmVzb2x1dGlvbkZyb21TY2FsZShsYXllci5NaW5TY2FsZURlbm9taW5hdG9yKSB8fCAwLFxyXG4gICAgICAgICAgICAgIG1ldGFkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICB1cmw6IG1ldGFkYXRhID8gbWV0YWRhdGEuT25saW5lUmVzb3VyY2UgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICBleHRlcm46IG1ldGFkYXRhID8gdHJ1ZSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIGFic3RyYWN0LFxyXG4gICAgICAgICAgICAgICAga2V5d29yZExpc3RcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHRvb2x0aXA6IHsgdHlwZTogY2F0YWxvZ1Rvb2x0aXBUeXBlIH0gYXMgVG9vbHRpcENvbnRlbnQsXHJcbiAgICAgICAgICAgICAgc291cmNlT3B0aW9uc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHJldHVybiBsYXllcnM7XHJcblxyXG4gICAgICAgIH0sIFtdKVxyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmIChncm91cEl0ZW0uaXRlbXMubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgaXRlbXMucHVzaChncm91cEl0ZW0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBCcmVhayB0aGUgZ3JvdXAgKGRvbid0IGFkZCBhIGdyb3VwIG9mIGxheWVyIGZvciBlYWNoIG9mIHRoZWlyIGxheWVyISlcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFdNVFNJdGVtcyhjYXRhbG9nOiBDYXRhbG9nLCBjYXBhYmlsaXRpZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogQ2F0YWxvZ0l0ZW1MYXllcltdIHtcclxuICAgIGNvbnN0IGxheWVycyA9IGNhcGFiaWxpdGllcy5Db250ZW50cy5MYXllcjtcclxuICAgIGNvbnN0IHJlZ2V4ZXMgPSAoY2F0YWxvZy5yZWdGaWx0ZXJzIHx8IFtdKS5tYXAoKHBhdHRlcm46IHN0cmluZykgPT4gbmV3IFJlZ0V4cChwYXR0ZXJuKSk7XHJcbiAgICBjb25zdCBjYXRhbG9nUXVlcnlQYXJhbXMgPSBjYXRhbG9nLnF1ZXJ5UGFyYW1zIHx8IHt9O1xyXG4gICAgY29uc3QgY2F0YWxvZ1NvdXJjZU9wdGlvbnMgPSBjYXRhbG9nLnNvdXJjZU9wdGlvbnMgfHwge307XHJcblxyXG4gICAgcmV0dXJuIGxheWVycy5tYXAoKGxheWVyOiBhbnkpID0+IHtcclxuICAgICAgaWYgKHRoaXMudGVzdExheWVyUmVnZXhlcyhsYXllci5JZGVudGlmaWVyLCByZWdleGVzKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIGNhdGFsb2dRdWVyeVBhcmFtcywge1xyXG4gICAgICAgIHZlcnNpb246ICcxLjAuMCdcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbnN0IGJhc2VTb3VyY2VPcHRpb25zID0ge1xyXG4gICAgICAgIHR5cGU6ICd3bXRzJyxcclxuICAgICAgICB1cmw6IGNhdGFsb2cudXJsLFxyXG4gICAgICAgIGNyb3NzT3JpZ2luOiBjYXRhbG9nLnNldENyb3NzT3JpZ2luQW5vbnltb3VzID8gJ2Fub255bW91cycgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgbGF5ZXI6IGxheWVyLklkZW50aWZpZXIsXHJcbiAgICAgICAgbWF0cml4U2V0OiBjYXRhbG9nLm1hdHJpeFNldCxcclxuICAgICAgICBvcHRpb25zRnJvbUNhcGFiaWxpdGllczogdHJ1ZSxcclxuICAgICAgICByZXF1ZXN0RW5jb2Rpbmc6IGNhdGFsb2cucmVxdWVzdEVuY29kaW5nIHx8ICdLVlAnLFxyXG4gICAgICAgIHN0eWxlOiAnZGVmYXVsdCdcclxuICAgICAgfSBhcyBXTVRTRGF0YVNvdXJjZU9wdGlvbnM7XHJcbiAgICAgIGNvbnN0IHNvdXJjZU9wdGlvbnMgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgICAgIHt9LFxyXG4gICAgICAgIGJhc2VTb3VyY2VPcHRpb25zLFxyXG4gICAgICAgIGNhdGFsb2dTb3VyY2VPcHRpb25zLFxyXG4gICAgICAgIHtwYXJhbXN9XHJcbiAgICAgICkgYXMgV01UU0RhdGFTb3VyY2VPcHRpb25zO1xyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBpZDogZ2VuZXJhdGVJZEZyb21Tb3VyY2VPcHRpb25zKHNvdXJjZU9wdGlvbnMpLFxyXG4gICAgICAgIHR5cGU6IENhdGFsb2dJdGVtVHlwZS5MYXllcixcclxuICAgICAgICB0aXRsZTogbGF5ZXIuVGl0bGUsXHJcbiAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgdGl0bGU6IGxheWVyLlRpdGxlLFxyXG4gICAgICAgICAgc291cmNlT3B0aW9uc1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgIH0pXHJcbiAgICAuZmlsdGVyKChpdGVtOiBDYXRhbG9nSXRlbUxheWVyIHwgdW5kZWZpbmVkKSA9PiBpdGVtICE9PSB1bmRlZmluZWQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0ZXN0TGF5ZXJSZWdleGVzKGxheWVyTmFtZSwgcmVnZXhlcyk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHJlZ2V4ZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlZ2V4ZXMuZmluZCgocmVnZXg6IFJlZ0V4cCkgPT4gcmVnZXgudGVzdChsYXllck5hbWUpKSAhPT0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZXRyaXZlTGF5ZXJJbmZvRm9ybWF0KFxyXG4gICAgbGF5ZXJOYW1lRnJvbUNhdGFsb2c6IHN0cmluZyxcclxuICAgIGxheWVyc1F1ZXJ5Rm9ybWF0OiB7IGxheWVyOiBzdHJpbmcsIHF1ZXJ5Rm9ybWF0OiBRdWVyeUZvcm1hdCB9W11cclxuICApOiBRdWVyeUZvcm1hdCB7XHJcblxyXG4gICAgY29uc3QgY3VycmVudExheWVySW5mb0Zvcm1hdCA9IGxheWVyc1F1ZXJ5Rm9ybWF0LmZpbmQoZiA9PiBmLmxheWVyID09PSBsYXllck5hbWVGcm9tQ2F0YWxvZyk7XHJcbiAgICBjb25zdCBiYXNlSW5mb0Zvcm1hdCA9IGxheWVyc1F1ZXJ5Rm9ybWF0LmZpbmQoZiA9PiBmLmxheWVyID09PSAnKicpO1xyXG4gICAgbGV0IHF1ZXJ5Rm9ybWF0OiBRdWVyeUZvcm1hdDtcclxuICAgIGlmIChjdXJyZW50TGF5ZXJJbmZvRm9ybWF0KSB7XHJcbiAgICAgIHF1ZXJ5Rm9ybWF0ID0gY3VycmVudExheWVySW5mb0Zvcm1hdC5xdWVyeUZvcm1hdDtcclxuICAgIH0gZWxzZSBpZiAoYmFzZUluZm9Gb3JtYXQpIHtcclxuICAgICAgcXVlcnlGb3JtYXQgPSBiYXNlSW5mb0Zvcm1hdC5xdWVyeUZvcm1hdDtcclxuICAgIH1cclxuICAgIHJldHVybiBxdWVyeUZvcm1hdDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmV0cmlldmVUb29sdGlwVHlwZShjYXRhbG9nOiBDYXRhbG9nKTogVG9vbHRpcFR5cGUge1xyXG4gICAgaWYgKCFjYXRhbG9nLnRvb2x0aXBUeXBlKSB7XHJcbiAgICAgIHJldHVybiBUb29sdGlwVHlwZS5USVRMRTtcclxuICAgIH1cclxuICAgIHJldHVybiBjYXRhbG9nLnRvb2x0aXBUeXBlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmaW5kQ2F0YWxvZ0luZm9Gb3JtYXQoY2F0YWxvZzogQ2F0YWxvZyk6IHtsYXllcjogc3RyaW5nLCBxdWVyeUZvcm1hdDogUXVlcnlGb3JtYXR9W10ge1xyXG4gICAgY29uc3QgbGF5ZXJzUXVlcnlGb3JtYXQ6IHtsYXllcjogc3RyaW5nLCBxdWVyeUZvcm1hdDogUXVlcnlGb3JtYXR9W10gPSBbXTtcclxuICAgIGlmICghY2F0YWxvZy5xdWVyeUZvcm1hdCkge1xyXG4gICAgICByZXR1cm4gbGF5ZXJzUXVlcnlGb3JtYXQ7XHJcbiAgICB9XHJcbiAgICBPYmplY3Qua2V5cyhjYXRhbG9nLnF1ZXJ5Rm9ybWF0KS5mb3JFYWNoKGNvbmZpZ3VyZWRJbmZvRm9ybWF0ID0+IHtcclxuICAgICAgaWYgKGNhdGFsb2cucXVlcnlGb3JtYXRbY29uZmlndXJlZEluZm9Gb3JtYXRdIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICBjYXRhbG9nLnF1ZXJ5Rm9ybWF0W2NvbmZpZ3VyZWRJbmZvRm9ybWF0XS5mb3JFYWNoKGxheWVyTmFtZSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWxheWVyc1F1ZXJ5Rm9ybWF0LmZpbmQoc3BlY2lmaWMgPT4gc3BlY2lmaWMubGF5ZXIgPT09IGxheWVyTmFtZSkpIHtcclxuICAgICAgICAgICAgbGF5ZXJzUXVlcnlGb3JtYXQucHVzaCh7IGxheWVyOiBsYXllck5hbWUsIHF1ZXJ5Rm9ybWF0OiBjb25maWd1cmVkSW5mb0Zvcm1hdCBhcyBRdWVyeUZvcm1hdCB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoIWxheWVyc1F1ZXJ5Rm9ybWF0LmZpbmQoc3BlY2lmaWMgPT4gc3BlY2lmaWMubGF5ZXIgPT09IGNhdGFsb2cucXVlcnlGb3JtYXRbY29uZmlndXJlZEluZm9Gb3JtYXRdKSkge1xyXG4gICAgICAgICAgbGF5ZXJzUXVlcnlGb3JtYXQucHVzaCh7IGxheWVyOiBjYXRhbG9nLnF1ZXJ5Rm9ybWF0W2NvbmZpZ3VyZWRJbmZvRm9ybWF0XSwgcXVlcnlGb3JtYXQ6IGNvbmZpZ3VyZWRJbmZvRm9ybWF0IGFzIFF1ZXJ5Rm9ybWF0IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbGF5ZXJzUXVlcnlGb3JtYXQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==