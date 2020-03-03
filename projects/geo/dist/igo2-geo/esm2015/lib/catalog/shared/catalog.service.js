/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, of, zip } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { uuid } from '@igo2/utils';
import { LanguageService, ConfigService } from '@igo2/core';
import { CapabilitiesService, TypeCapabilities } from '../../datasource';
import { TooltipType } from '../../layer';
import { getResolutionFromScale } from '../../map';
import { CatalogFactory } from './catalog.abstract';
import { CatalogItemType, TypeCatalog } from './catalog.enum';
import { QueryHtmlTarget } from '../../query';
import { generateIdFromSourceOptions } from '../../utils';
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
        /** @type {?} */
        const observables$ = [];
        if (apiUrl) {
            // Base layers catalog
            if (catalogConfig.baseLayers) {
                /** @type {?} */
                const translate = this.languageService.translate;
                /** @type {?} */
                const title = translate.instant('igo.geo.catalog.baseLayers');
                /** @type {?} */
                const baseLayersCatalog = [
                    {
                        id: 'catalog.baselayers',
                        title,
                        url: `${apiUrl}/baselayers`,
                        type: 'baselayers'
                    }
                ];
                observables$.push(of(baseLayersCatalog));
            }
            // Catalogs from API
            /** @type {?} */
            const catalogsFromApi$ = this.http
                .get(`${apiUrl}/catalogs`)
                .pipe(map((/**
             * @param {?} catalogs
             * @return {?}
             */
            catalogs => catalogs.map((/**
             * @param {?} c
             * @return {?}
             */
            (c) => Object.assign(c, c.options))))), catchError((/**
             * @param {?} response
             * @return {?}
             */
            (response) => EMPTY)));
            observables$.push(catalogsFromApi$);
        }
        // Catalogs from config
        if (catalogsFromConfig.length > 0) {
            observables$.push(of(catalogsFromConfig).pipe(map((/**
             * @param {?} catalogs
             * @return {?}
             */
            (catalogs) => catalogs.map((/**
             * @param {?} c
             * @return {?}
             */
            c => {
                if (!c.id) {
                    c.id = uuid();
                }
                return c;
            }))))));
        }
        return (/** @type {?} */ (zip(...observables$).pipe(map((/**
         * @param {?} catalogs
         * @return {?}
         */
        (catalogs) => [].concat.apply([], catalogs))))));
    }
    /**
     * @param {?} catalog
     * @return {?}
     */
    loadCatalogItems(catalog) {
        /** @type {?} */
        let newCatalog;
        newCatalog = CatalogFactory.createInstanceCatalog(catalog, this);
        return newCatalog.collectCatalogItems();
    }
    /**
     * @param {?} catalog
     * @return {?}
     */
    loadCatalogBaseLayerItems(catalog) {
        return this.getCatalogBaseLayersOptions(catalog).pipe(map((/**
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
            return [
                {
                    id: 'catalog.group.baselayers',
                    type: CatalogItemType.Group,
                    title: catalog.title,
                    items
                }
            ];
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
     * @param {?} catalog
     * @return {?}
     */
    loadCatalogWMSLayerItems(catalog) {
        return this.getCatalogCapabilities(catalog).pipe(map((/**
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
     * @param {?} catalog
     * @return {?}
     */
    loadCatalogWMTSLayerItems(catalog) {
        return this.getCatalogCapabilities(catalog).pipe(map((/**
         * @param {?} capabilities
         * @return {?}
         */
        (capabilities) => this.getWMTSItems(catalog, capabilities))));
    }
    /**
     * @param {?} catalog
     * @return {?}
     */
    loadCatalogCompositeLayerItems(catalog) {
        /** @type {?} */
        const compositeCatalog = ((/** @type {?} */ (catalog))).composite;
        /** @type {?} */
        const catalogsFromInstance = (/** @type {?} */ ([]));
        compositeCatalog.map((/**
         * @param {?} component
         * @return {?}
         */
        (component) => catalogsFromInstance.push(CatalogFactory.createInstanceCatalog(component, this))));
        // get CatalogItems for each original Catalog-----------------------------------------------------
        /** @type {?} */
        const request1$ = [];
        catalogsFromInstance.map((/**
         * @param {?} component
         * @return {?}
         */
        (component) => request1$.push(component.collectCatalogItems())));
        // integrate imposed group -----------------------------------------------------
        /** @type {?} */
        let request2$ = [];
        /**
         * @param {?} arr
         * @return {?}
         */
        function flatDeepLayer(arr) {
            return arr.reduce((/**
             * @param {?} acc
             * @param {?} val
             * @return {?}
             */
            (acc, val) => acc.concat(val.type === CatalogItemType.Group ? flatDeepLayer(val.items) : val)), []);
        }
        if (Object.keys(compositeCatalog).find((/**
         * @param {?} k
         * @return {?}
         */
        k => compositeCatalog[k].groupImpose))) {
            /** @type {?} */
            const pushImposeGroup = (/**
             * @param {?} item
             * @param {?} index
             * @return {?}
             */
            (item, index) => {
                /** @type {?} */
                const c = catalogsFromInstance[index];
                /** @type {?} */
                const outGroupImpose = Object.assign({}, c.groupImpose);
                outGroupImpose.address = c.id;
                outGroupImpose.type = CatalogItemType.Group;
                outGroupImpose.items = [];
                /** @type {?} */
                const flatLayer = flatDeepLayer(item);
                flatLayer.map((/**
                 * @param {?} v
                 * @return {?}
                 */
                (v) => v.address = `${outGroupImpose.address}.${outGroupImpose.id}`));
                outGroupImpose.items = flatLayer;
                return outGroupImpose;
            });
            request2$ = request1$.map((/**
             * @param {?} obs
             * @param {?} idx
             * @return {?}
             */
            (obs, idx) => obs.pipe(map((/**
             * @param {?} items
             * @return {?}
             */
            (items) => compositeCatalog[idx].groupImpose ? pushImposeGroup(items, idx) : items)))));
        }
        else {
            request2$ = request1$;
        }
        // concat Group -----------------------------------------------------
        /** @type {?} */
        const request3$ = zip(...request2$)
            .pipe(map((/**
         * @param {?} output
         * @return {?}
         */
        (output) => [].concat(...output) // [].concat.apply([], result1
        )));
        // merge Group (first level only) -----------------------------------------------------
        /** @type {?} */
        const groupByGroupId = (/**
         * @param {?} data
         * @param {?} keyFn
         * @return {?}
         */
        (data, keyFn) => data.reduce((/**
         * @param {?} acc
         * @param {?} group
         * @return {?}
         */
        (acc, group) => {
            /** @type {?} */
            const groupId = keyFn(group);
            /** @type {?} */
            const ind = acc.find((/**
             * @param {?} x
             * @return {?}
             */
            (x) => x.id === groupId));
            if (!ind) {
                acc[acc.length] = group;
            }
            else {
                /** @type {?} */
                const ix = acc.indexOf(ind);
                if (acc[ix].address.split('|').indexOf(group.address) === -1) {
                    acc[ix].address = `${acc[ix].address}|${group.address}`;
                }
                acc[ix].items.push(...group.items);
            }
            return acc;
        }), []));
        // merge Layer for each Level (catalog, group(recursive))
        /** @type {?} */
        const recursiveGroupByLayerAddress = (/**
         * @param {?} items
         * @param {?} keyFn
         * @return {?}
         */
        (items, keyFn) => items.reduce((/**
         * @param {?} acc
         * @param {?} item
         * @param {?} idx
         * @param {?} arr
         * @return {?}
         */
        (acc, item, idx, arr) => {
            /** @type {?} */
            const layerTitle = keyFn(item);
            /** @type {?} */
            const outItem = Object.assign({}, item);
            if (item.type === CatalogItemType.Layer) {
                // same title, same address => result: only one item is keep
                // same title, address diff
                /** @type {?} */
                const indicesMatchTitle = [];
                /** @type {?} */
                const diffAddress = arr.filter((/**
                 * @param {?} x
                 * @param {?} i
                 * @return {?}
                 */
                (x, i) => {
                    /** @type {?} */
                    let bInd = false;
                    if (x.title === layerTitle && x.type === CatalogItemType.Layer) {
                        if (i !== idx && x.address !== item.address) {
                            bInd = true;
                        }
                        indicesMatchTitle.push(i);
                    }
                    return bInd;
                }));
                if (diffAddress.length > 0) {
                    /** @type {?} */
                    const nPosition = indicesMatchTitle.findIndex((/**
                     * @param {?} x
                     * @return {?}
                     */
                    x => x === idx)) + 1;
                    outItem.title = `${item.title} (${nPosition})`; // source: ${item.address.split('.')[0]}
                }
                /** @type {?} */
                const exist = acc.find((/**
                 * @param {?} x
                 * @return {?}
                 */
                (x) => x.title === outItem.title && x.type === CatalogItemType.Layer));
                if (!exist) {
                    acc[acc.length] = outItem;
                }
            }
            else if (item.type === CatalogItemType.Group) {
                outItem.items = recursiveGroupByLayerAddress(item.items, (/**
                 * @param {?} layer
                 * @return {?}
                 */
                layer => layer.title));
                acc[acc.length] = outItem;
            }
            return acc;
        }), []));
        /** @type {?} */
        const request4$ = request3$.pipe(map((/**
         * @param {?} output
         * @return {?}
         */
        output => groupByGroupId(output, (/**
         * @param {?} group
         * @return {?}
         */
        group => group.id)))), map((/**
         * @param {?} output
         * @return {?}
         */
        (output) => [].concat(...output))), map((/**
         * @param {?} data
         * @return {?}
         */
        data => recursiveGroupByLayerAddress(data, (/**
         * @param {?} layer
         * @return {?}
         */
        layer => layer.title)))));
        return request4$;
    }
    /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    getCatalogCapabilities(catalog) {
        /** @type {?} */
        const sType = TypeCatalog[(/** @type {?} */ (catalog.type))];
        return this.capabilitiesService.getCapabilities(TypeCapabilities[sType], catalog.url, catalog.version);
    }
    /**
     * @private
     * @param {?} layer
     * @param {?} idParent
     * @param {?} layersQueryFormat
     * @param {?} catalog
     * @param {?} catalogQueryParams
     * @param {?} catalogSourceOptions
     * @param {?} catalogTooltipType
     * @return {?}
     */
    prepareCatalogItemLayer(layer, idParent, layersQueryFormat, catalog, catalogQueryParams, catalogSourceOptions, catalogTooltipType) {
        /** @type {?} */
        const configuredQueryFormat = this.retriveLayerInfoFormat(layer.Name, layersQueryFormat);
        /** @type {?} */
        const metadata = layer.DataURL ? layer.DataURL[0] : undefined;
        /** @type {?} */
        const abstract = layer.Abstract ? layer.Abstract : undefined;
        /** @type {?} */
        const keywordList = layer.KeywordList
            ? layer.KeywordList
            : undefined;
        /** @type {?} */
        const timeFilter = this.capabilitiesService.getTimeFilter(layer);
        /** @type {?} */
        const timeFilterable = timeFilter && Object.keys(timeFilter).length > 0 ? true : false;
        /** @type {?} */
        const legendOptions = layer.Style
            ? this.capabilitiesService.getStyle(layer.Style)
            : undefined;
        /** @type {?} */
        const params = Object.assign({}, catalogQueryParams, (/** @type {?} */ ({
            LAYERS: layer.Name,
            FEATURE_COUNT: catalog.count,
            VERSION: catalog.version || '1.3.0'
        })));
        /** @type {?} */
        const baseSourceOptions = {
            type: 'wms',
            url: catalog.url,
            crossOrigin: catalog.setCrossOriginAnonymous
                ? 'anonymous'
                : undefined,
            timeFilter: Object.assign({}, timeFilter, catalog.timeFilter),
            timeFilterable: timeFilterable ? true : false,
            queryable: layer.queryable,
            queryFormat: configuredQueryFormat,
            queryHtmlTarget: catalog.queryHtmlTarget || QueryHtmlTarget.IFRAME
        };
        /** @type {?} */
        const sourceOptions = (/** @type {?} */ (Object.assign({}, baseSourceOptions, catalogSourceOptions, { params })));
        /** @type {?} */
        const layerPrepare = {
            id: generateIdFromSourceOptions(sourceOptions),
            type: CatalogItemType.Layer,
            title: layer.Title,
            address: idParent,
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
                legendOptions,
                tooltip: (/** @type {?} */ ({ type: catalogTooltipType })),
                sourceOptions
            }
        };
        return layerPrepare;
    }
    /**
     * @private
     * @param {?} itemListIn
     * @param {?} regexes
     * @param {?} idGroup
     * @param {?} layersQueryFormat
     * @param {?} catalog
     * @param {?} catalogQueryParams
     * @param {?} catalogSourceOptions
     * @param {?} catalogTooltipType
     * @return {?}
     */
    prepareCatalogItemGroup(itemListIn, regexes, idGroup, layersQueryFormat, catalog, catalogQueryParams, catalogSourceOptions, catalogTooltipType) {
        /** @type {?} */
        const groupPrepare = {
            id: idGroup,
            type: CatalogItemType.Group,
            title: itemListIn.Title,
            address: catalog.id,
            items: itemListIn.Layer.reduce((/**
             * @param {?} items
             * @param {?} layer
             * @return {?}
             */
            (items, layer) => {
                if (layer.Layer !== undefined) {
                    // recursive, check next level
                    /** @type {?} */
                    const idGroupItemNextLevel = idGroup + `.group.${layer.Name || layer.Layer[0].Name}`;
                    /** @type {?} */
                    const groupItem = this.prepareCatalogItemGroup(layer, regexes, idGroupItemNextLevel, layersQueryFormat, catalog, catalogQueryParams, catalogSourceOptions, catalogTooltipType);
                    items.push(groupItem);
                }
                else {
                    if (this.testLayerRegexes(layer.Name, regexes) === false) {
                        return items;
                    }
                    /** @type {?} */
                    const layerItem = this.prepareCatalogItemLayer(layer, idGroup, layersQueryFormat, catalog, catalogQueryParams, catalogSourceOptions, catalogTooltipType);
                    items.push(layerItem);
                }
                return items;
            }), [])
        };
        return groupPrepare;
    }
    /**
     * @private
     * @param {?} catalog
     * @param {?} itemListIn
     * @param {?} itemsPrepare
     * @param {?=} loopLevel
     * @return {?}
     */
    includeRecursiveItems(catalog, itemListIn, itemsPrepare, loopLevel = 0) {
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
        if (!itemListIn.Layer) {
            return;
        }
        for (const item of itemListIn.Layer) {
            if (item.Layer !== undefined) {
                // recursive, check next level
                this.includeRecursiveItems(catalog, item, itemsPrepare, loopLevel + 1);
                continue;
            }
            /** @type {?} */
            const catalogTooltipType = this.retrieveTooltipType(catalog);
            /** @type {?} */
            const layersQueryFormat = this.findCatalogInfoFormat(catalog);
            // group(with layers) and layer(without group) level 1
            if (loopLevel !== 0) {
                // TODO: Slice that into multiple methods
                // Define object of group layer
                /** @type {?} */
                const idGroupItem = `catalog.group.${itemListIn.Name || item.Name}`;
                /** @type {?} */
                const groupItem = this.prepareCatalogItemGroup(itemListIn, regexes, idGroupItem, layersQueryFormat, catalog, catalogQueryParams, catalogSourceOptions, catalogTooltipType);
                if (groupItem.items.length !== 0) {
                    itemsPrepare.push(groupItem);
                }
                // Break the group (don't add a group of layer for each of their layer!)
                break;
            }
            else {
                // layer without group
                /** @type {?} */
                const layerItem = this.prepareCatalogItemLayer(item, catalog.id, layersQueryFormat, catalog, catalogQueryParams, catalogSourceOptions, catalogTooltipType);
                itemsPrepare.push(layerItem);
            }
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
        return layers
            .map((/**
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
                crossOrigin: catalog.setCrossOriginAnonymous
                    ? 'anonymous'
                    : undefined,
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
                address: catalog.id,
                options: {
                    title: layer.Title,
                    sourceOptions,
                    maxResolution: Infinity,
                    minResolution: 0
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
                        layersQueryFormat.push({
                            layer: layerName,
                            queryFormat: (/** @type {?} */ (configuredInfoFormat))
                        });
                    }
                }));
            }
            else {
                if (!layersQueryFormat.find((/**
                 * @param {?} specific
                 * @return {?}
                 */
                specific => specific.layer === catalog.queryFormat[configuredInfoFormat]))) {
                    layersQueryFormat.push({
                        layer: catalog.queryFormat[configuredInfoFormat],
                        queryFormat: (/** @type {?} */ (configuredInfoFormat))
                    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2NhdGFsb2cvc2hhcmVkL2NhdGFsb2cuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFxQixNQUFNLHNCQUFzQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxLQUFLLEVBQWMsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRCxPQUFPLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDbkMsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDNUQsT0FBTyxFQUNMLG1CQUFtQixFQUNuQixnQkFBZ0IsRUFJakIsTUFBTSxrQkFBa0IsQ0FBQztBQUMxQixPQUFPLEVBSUwsV0FBVyxFQUNaLE1BQU0sYUFBYSxDQUFDO0FBQ3JCLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQU9uRCxPQUFPLEVBRUwsY0FBYyxFQUVmLE1BQU0sb0JBQW9CLENBQUM7QUFDNUIsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZUFBZSxFQUFlLE1BQU0sYUFBYSxDQUFDO0FBQzNELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7Ozs7QUFLMUQsTUFBTSxPQUFPLGNBQWM7Ozs7Ozs7SUFDekIsWUFDVSxJQUFnQixFQUNoQixNQUFxQixFQUNyQixlQUFnQyxFQUNoQyxtQkFBd0M7UUFIeEMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixXQUFNLEdBQU4sTUFBTSxDQUFl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QUMsb0JBQW9CLENBQUM7d0JBQ2hELFdBQVcsRUFBRSxtQkFBQSxvQkFBb0IsRUFBZTtxQkFDakQsQ0FBQyxDQUFDO2lCQUNKO2FBQ0Y7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUNILE9BQU8saUJBQWlCLENBQUM7SUFDM0IsQ0FBQzs7O1lBNWdCRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFyQ1EsVUFBVTtZQUtPLGFBQWE7WUFBOUIsZUFBZTtZQUV0QixtQkFBbUI7Ozs7Ozs7O0lBaUNqQiw4QkFBd0I7Ozs7O0lBQ3hCLGdDQUE2Qjs7Ozs7SUFDN0IseUNBQXdDOzs7OztJQUN4Qyw2Q0FBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBFTVBUWSwgT2JzZXJ2YWJsZSwgb2YsIHppcCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAsIGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyB1dWlkIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5pbXBvcnQgeyBMYW5ndWFnZVNlcnZpY2UsIENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHtcclxuICBDYXBhYmlsaXRpZXNTZXJ2aWNlLFxyXG4gIFR5cGVDYXBhYmlsaXRpZXMsXHJcbiAgV01TRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgV01UU0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gIFdNU0RhdGFTb3VyY2VPcHRpb25zUGFyYW1zXHJcbn0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7XHJcbiAgTGF5ZXJPcHRpb25zLFxyXG4gIEltYWdlTGF5ZXJPcHRpb25zLFxyXG4gIFRvb2x0aXBDb250ZW50LFxyXG4gIFRvb2x0aXBUeXBlXHJcbn0gZnJvbSAnLi4vLi4vbGF5ZXInO1xyXG5pbXBvcnQgeyBnZXRSZXNvbHV0aW9uRnJvbVNjYWxlIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuXHJcbmltcG9ydCB7XHJcbiAgQ2F0YWxvZ0l0ZW0sXHJcbiAgQ2F0YWxvZ0l0ZW1MYXllcixcclxuICBDYXRhbG9nSXRlbUdyb3VwXHJcbn0gZnJvbSAnLi9jYXRhbG9nLmludGVyZmFjZSc7XHJcbmltcG9ydCB7XHJcbiAgQ2F0YWxvZyxcclxuICBDYXRhbG9nRmFjdG9yeSxcclxuICBDb21wb3NpdGVDYXRhbG9nXHJcbn0gZnJvbSAnLi9jYXRhbG9nLmFic3RyYWN0JztcclxuaW1wb3J0IHsgQ2F0YWxvZ0l0ZW1UeXBlLCBUeXBlQ2F0YWxvZyB9IGZyb20gJy4vY2F0YWxvZy5lbnVtJztcclxuaW1wb3J0IHsgUXVlcnlIdG1sVGFyZ2V0LCBRdWVyeUZvcm1hdCB9IGZyb20gJy4uLy4uL3F1ZXJ5JztcclxuaW1wb3J0IHsgZ2VuZXJhdGVJZEZyb21Tb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2F0YWxvZ1NlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjYXBhYmlsaXRpZXNTZXJ2aWNlOiBDYXBhYmlsaXRpZXNTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBsb2FkQ2F0YWxvZ3MoKTogT2JzZXJ2YWJsZTxDYXRhbG9nW10+IHtcclxuICAgIGNvbnN0IGNvbnRleHRDb25maWcgPSB0aGlzLmNvbmZpZy5nZXRDb25maWcoJ2NvbnRleHQnKSB8fCB7fTtcclxuICAgIGNvbnN0IGNhdGFsb2dDb25maWcgPSB0aGlzLmNvbmZpZy5nZXRDb25maWcoJ2NhdGFsb2cnKSB8fCB7fTtcclxuICAgIGNvbnN0IGFwaVVybCA9IGNhdGFsb2dDb25maWcudXJsIHx8IGNvbnRleHRDb25maWcudXJsO1xyXG4gICAgY29uc3QgY2F0YWxvZ3NGcm9tQ29uZmlnID0gY2F0YWxvZ0NvbmZpZy5zb3VyY2VzIHx8IFtdO1xyXG5cclxuICAgIGNvbnN0IG9ic2VydmFibGVzJCA9IFtdO1xyXG5cclxuICAgIGlmIChhcGlVcmwpIHtcclxuICAgICAgLy8gQmFzZSBsYXllcnMgY2F0YWxvZ1xyXG4gICAgICBpZiAoY2F0YWxvZ0NvbmZpZy5iYXNlTGF5ZXJzKSB7XHJcbiAgICAgICAgY29uc3QgdHJhbnNsYXRlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gICAgICAgIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uY2F0YWxvZy5iYXNlTGF5ZXJzJyk7XHJcbiAgICAgICAgY29uc3QgYmFzZUxheWVyc0NhdGFsb2cgPSBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAnY2F0YWxvZy5iYXNlbGF5ZXJzJyxcclxuICAgICAgICAgICAgdGl0bGUsXHJcbiAgICAgICAgICAgIHVybDogYCR7YXBpVXJsfS9iYXNlbGF5ZXJzYCxcclxuICAgICAgICAgICAgdHlwZTogJ2Jhc2VsYXllcnMnXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXTtcclxuICAgICAgICBvYnNlcnZhYmxlcyQucHVzaChvZihiYXNlTGF5ZXJzQ2F0YWxvZykpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBDYXRhbG9ncyBmcm9tIEFQSVxyXG4gICAgICBjb25zdCBjYXRhbG9nc0Zyb21BcGkkID0gdGhpcy5odHRwXHJcbiAgICAgICAgLmdldDxDYXRhbG9nW10+KGAke2FwaVVybH0vY2F0YWxvZ3NgKVxyXG4gICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgbWFwKGNhdGFsb2dzID0+IGNhdGFsb2dzLm1hcCgoYzogYW55KSA9PiBPYmplY3QuYXNzaWduKGMsIGMub3B0aW9ucykpKSxcclxuICAgICAgICAgIGNhdGNoRXJyb3IoKHJlc3BvbnNlOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4gRU1QVFkpXHJcbiAgICAgICAgKTtcclxuICAgICAgb2JzZXJ2YWJsZXMkLnB1c2goY2F0YWxvZ3NGcm9tQXBpJCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2F0YWxvZ3MgZnJvbSBjb25maWdcclxuICAgIGlmIChjYXRhbG9nc0Zyb21Db25maWcubGVuZ3RoID4gMCkge1xyXG4gICAgICBvYnNlcnZhYmxlcyQucHVzaChcclxuICAgICAgICBvZihjYXRhbG9nc0Zyb21Db25maWcpLnBpcGUoXHJcbiAgICAgICAgICBtYXAoKGNhdGFsb2dzOiBDYXRhbG9nW10pID0+XHJcbiAgICAgICAgICAgIGNhdGFsb2dzLm1hcChjID0+IHtcclxuICAgICAgICAgICAgICBpZiAoIWMuaWQpIHtcclxuICAgICAgICAgICAgICAgIGMuaWQgPSB1dWlkKCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHJldHVybiBjO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gemlwKC4uLm9ic2VydmFibGVzJCkucGlwZShcclxuICAgICAgbWFwKChjYXRhbG9nczogQ2F0YWxvZ1tdW10pID0+IFtdLmNvbmNhdC5hcHBseShbXSwgY2F0YWxvZ3MpKVxyXG4gICAgKSBhcyBPYnNlcnZhYmxlPENhdGFsb2dbXT47XHJcbiAgfVxyXG5cclxuICBsb2FkQ2F0YWxvZ0l0ZW1zKGNhdGFsb2c6IENhdGFsb2cpOiBPYnNlcnZhYmxlPENhdGFsb2dJdGVtW10+IHtcclxuICAgIGxldCBuZXdDYXRhbG9nOiBDYXRhbG9nO1xyXG4gICAgbmV3Q2F0YWxvZyA9IENhdGFsb2dGYWN0b3J5LmNyZWF0ZUluc3RhbmNlQ2F0YWxvZyhjYXRhbG9nLCB0aGlzKTtcclxuICAgIHJldHVybiBuZXdDYXRhbG9nLmNvbGxlY3RDYXRhbG9nSXRlbXMoKTtcclxuICB9XHJcblxyXG4gIGxvYWRDYXRhbG9nQmFzZUxheWVySXRlbXMoXHJcbiAgICBjYXRhbG9nOiBDYXRhbG9nXHJcbiAgKTogT2JzZXJ2YWJsZTxDYXRhbG9nSXRlbUdyb3VwW10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldENhdGFsb2dCYXNlTGF5ZXJzT3B0aW9ucyhjYXRhbG9nKS5waXBlKFxyXG4gICAgICBtYXAoKGxheWVyc09wdGlvbnM6IExheWVyT3B0aW9uc1tdKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaXRlbXMgPSBsYXllcnNPcHRpb25zLm1hcCgobGF5ZXJPcHRpb25zOiBMYXllck9wdGlvbnMpID0+IHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGlkOiBnZW5lcmF0ZUlkRnJvbVNvdXJjZU9wdGlvbnMobGF5ZXJPcHRpb25zLnNvdXJjZU9wdGlvbnMpLFxyXG4gICAgICAgICAgICB0aXRsZTogbGF5ZXJPcHRpb25zLnRpdGxlLFxyXG4gICAgICAgICAgICB0eXBlOiBDYXRhbG9nSXRlbVR5cGUuTGF5ZXIsXHJcbiAgICAgICAgICAgIG9wdGlvbnM6IGxheWVyT3B0aW9uc1xyXG4gICAgICAgICAgfSBhcyBDYXRhbG9nSXRlbUxheWVyO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAnY2F0YWxvZy5ncm91cC5iYXNlbGF5ZXJzJyxcclxuICAgICAgICAgICAgdHlwZTogQ2F0YWxvZ0l0ZW1UeXBlLkdyb3VwLFxyXG4gICAgICAgICAgICB0aXRsZTogY2F0YWxvZy50aXRsZSxcclxuICAgICAgICAgICAgaXRlbXNcclxuICAgICAgICAgIH1cclxuICAgICAgICBdO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0Q2F0YWxvZ0Jhc2VMYXllcnNPcHRpb25zKFxyXG4gICAgY2F0YWxvZzogQ2F0YWxvZ1xyXG4gICk6IE9ic2VydmFibGU8TGF5ZXJPcHRpb25zW10+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExheWVyT3B0aW9uc1tdPihjYXRhbG9nLnVybCk7XHJcbiAgfVxyXG5cclxuICBsb2FkQ2F0YWxvZ1dNU0xheWVySXRlbXMoXHJcbiAgICBjYXRhbG9nOiBDYXRhbG9nXHJcbiAgKTogT2JzZXJ2YWJsZTxDYXRhbG9nSXRlbVtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRDYXRhbG9nQ2FwYWJpbGl0aWVzKGNhdGFsb2cpLnBpcGUoXHJcbiAgICAgIG1hcCgoY2FwYWJpbGl0aWVzOiBhbnkpID0+IHtcclxuICAgICAgICBjb25zdCBpdGVtcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuaW5jbHVkZVJlY3Vyc2l2ZUl0ZW1zKFxyXG4gICAgICAgICAgY2F0YWxvZyxcclxuICAgICAgICAgIGNhcGFiaWxpdGllcy5DYXBhYmlsaXR5LkxheWVyLFxyXG4gICAgICAgICAgaXRlbXNcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiBpdGVtcztcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBsb2FkQ2F0YWxvZ1dNVFNMYXllckl0ZW1zKFxyXG4gICAgY2F0YWxvZzogQ2F0YWxvZ1xyXG4gICk6IE9ic2VydmFibGU8Q2F0YWxvZ0l0ZW1bXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2F0YWxvZ0NhcGFiaWxpdGllcyhjYXRhbG9nKS5waXBlKFxyXG4gICAgICBtYXAoKGNhcGFiaWxpdGllczogYW55KSA9PiB0aGlzLmdldFdNVFNJdGVtcyhjYXRhbG9nLCBjYXBhYmlsaXRpZXMpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGxvYWRDYXRhbG9nQ29tcG9zaXRlTGF5ZXJJdGVtcyhcclxuICAgIGNhdGFsb2c6IENhdGFsb2dcclxuICApOiBPYnNlcnZhYmxlPENhdGFsb2dJdGVtW10+IHtcclxuXHJcbiAgICBjb25zdCBjb21wb3NpdGVDYXRhbG9nID0gKGNhdGFsb2cgYXMgQ29tcG9zaXRlQ2F0YWxvZykuY29tcG9zaXRlO1xyXG5cclxuICAgIGNvbnN0IGNhdGFsb2dzRnJvbUluc3RhbmNlID0gW10gYXMgQ2F0YWxvZ1tdO1xyXG4gICAgY29tcG9zaXRlQ2F0YWxvZy5tYXAoKGNvbXBvbmVudDogQ2F0YWxvZykgPT4gY2F0YWxvZ3NGcm9tSW5zdGFuY2UucHVzaChDYXRhbG9nRmFjdG9yeS5jcmVhdGVJbnN0YW5jZUNhdGFsb2coY29tcG9uZW50LCB0aGlzKSkpO1xyXG5cclxuICAgIC8vIGdldCBDYXRhbG9nSXRlbXMgZm9yIGVhY2ggb3JpZ2luYWwgQ2F0YWxvZy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBjb25zdCByZXF1ZXN0MSQgPSBbXTtcclxuICAgIGNhdGFsb2dzRnJvbUluc3RhbmNlLm1hcCgoY29tcG9uZW50OiBDYXRhbG9nKSA9PiByZXF1ZXN0MSQucHVzaChjb21wb25lbnQuY29sbGVjdENhdGFsb2dJdGVtcygpKSk7XHJcblxyXG4gICAgLy8gaW50ZWdyYXRlIGltcG9zZWQgZ3JvdXAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIGxldCByZXF1ZXN0MiQgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBmbGF0RGVlcExheWVyKGFycikge1xyXG4gICAgICByZXR1cm4gYXJyLnJlZHVjZSgoYWNjLCB2YWwpID0+IGFjYy5jb25jYXQodmFsLnR5cGUgPT09IENhdGFsb2dJdGVtVHlwZS5Hcm91cCA/IGZsYXREZWVwTGF5ZXIodmFsLml0ZW1zKSA6IHZhbCksIFtdKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoT2JqZWN0LmtleXMoY29tcG9zaXRlQ2F0YWxvZykuZmluZChrID0+IGNvbXBvc2l0ZUNhdGFsb2dba10uZ3JvdXBJbXBvc2UpKSB7XHJcbiAgICAgIGNvbnN0IHB1c2hJbXBvc2VHcm91cCA9IChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGMgPSBjYXRhbG9nc0Zyb21JbnN0YW5jZVtpbmRleF07XHJcbiAgICAgICAgY29uc3Qgb3V0R3JvdXBJbXBvc2UgPSBPYmplY3QuYXNzaWduKHt9LCBjLmdyb3VwSW1wb3NlKTtcclxuICAgICAgICBvdXRHcm91cEltcG9zZS5hZGRyZXNzID0gYy5pZDtcclxuICAgICAgICBvdXRHcm91cEltcG9zZS50eXBlID0gQ2F0YWxvZ0l0ZW1UeXBlLkdyb3VwO1xyXG4gICAgICAgIG91dEdyb3VwSW1wb3NlLml0ZW1zID0gW107XHJcblxyXG4gICAgICAgIGNvbnN0IGZsYXRMYXllciA9IGZsYXREZWVwTGF5ZXIoaXRlbSk7XHJcbiAgICAgICAgZmxhdExheWVyLm1hcCgodikgPT4gdi5hZGRyZXNzID0gYCR7b3V0R3JvdXBJbXBvc2UuYWRkcmVzc30uJHtvdXRHcm91cEltcG9zZS5pZH1gKTtcclxuICAgICAgICBvdXRHcm91cEltcG9zZS5pdGVtcyA9IGZsYXRMYXllcjtcclxuXHJcbiAgICAgICAgcmV0dXJuIG91dEdyb3VwSW1wb3NlO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgcmVxdWVzdDIkID0gcmVxdWVzdDEkLm1hcCgob2JzLCBpZHgpID0+IG9icy5waXBlKFxyXG4gICAgICAgIG1hcCgoaXRlbXMpID0+IGNvbXBvc2l0ZUNhdGFsb2dbaWR4XS5ncm91cEltcG9zZSA/IHB1c2hJbXBvc2VHcm91cChpdGVtcywgaWR4KSA6IGl0ZW1zIClcclxuICAgICAgKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXF1ZXN0MiQgPSByZXF1ZXN0MSQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29uY2F0IEdyb3VwIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBjb25zdCByZXF1ZXN0MyQgPSB6aXAoLi4ucmVxdWVzdDIkKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICAgIG1hcCgob3V0cHV0OiBDYXRhbG9nSXRlbVtdKSA9PiBbXS5jb25jYXQoLi4ub3V0cHV0KSAvLyBbXS5jb25jYXQuYXBwbHkoW10sIHJlc3VsdDFcclxuICAgICAgKSk7XHJcblxyXG4gICAgLy8gbWVyZ2UgR3JvdXAgKGZpcnN0IGxldmVsIG9ubHkpIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBjb25zdCBncm91cEJ5R3JvdXBJZCA9IChkYXRhLCBrZXlGbikgPT4gZGF0YS5yZWR1Y2UoKGFjYywgZ3JvdXApID0+IHtcclxuICAgICAgY29uc3QgZ3JvdXBJZCA9IGtleUZuKGdyb3VwKTtcclxuICAgICAgY29uc3QgaW5kID0gYWNjLmZpbmQoKHgpID0+IHguaWQgPT09IGdyb3VwSWQpO1xyXG5cclxuICAgICAgaWYgKCFpbmQpIHtcclxuICAgICAgICBhY2NbYWNjLmxlbmd0aF0gPSBncm91cDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBpeCA9IGFjYy5pbmRleE9mKGluZCk7XHJcbiAgICAgICAgaWYgKGFjY1tpeF0uYWRkcmVzcy5zcGxpdCgnfCcpLmluZGV4T2YoZ3JvdXAuYWRkcmVzcykgPT09IC0xKSB7XHJcbiAgICAgICAgICBhY2NbaXhdLmFkZHJlc3MgPSBgJHthY2NbaXhdLmFkZHJlc3N9fCR7Z3JvdXAuYWRkcmVzc31gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhY2NbaXhdLml0ZW1zLnB1c2goLi4uZ3JvdXAuaXRlbXMpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBhY2M7XHJcbiAgICB9LCBbXSk7XHJcblxyXG4gICAgLy8gbWVyZ2UgTGF5ZXIgZm9yIGVhY2ggTGV2ZWwgKGNhdGFsb2csIGdyb3VwKHJlY3Vyc2l2ZSkpXHJcbiAgICBjb25zdCByZWN1cnNpdmVHcm91cEJ5TGF5ZXJBZGRyZXNzID0gKGl0ZW1zLCBrZXlGbikgPT4gaXRlbXMucmVkdWNlKChhY2MsIGl0ZW0sIGlkeCwgYXJyKSA9PiB7XHJcblxyXG4gICAgICBjb25zdCBsYXllclRpdGxlID0ga2V5Rm4oaXRlbSk7XHJcbiAgICAgIGNvbnN0IG91dEl0ZW0gPSBPYmplY3QuYXNzaWduKHt9LCBpdGVtKTtcclxuXHJcbiAgICAgIGlmIChpdGVtLnR5cGUgPT09IENhdGFsb2dJdGVtVHlwZS5MYXllcikge1xyXG4gICAgICAgIC8vIHNhbWUgdGl0bGUsIHNhbWUgYWRkcmVzcyA9PiByZXN1bHQ6IG9ubHkgb25lIGl0ZW0gaXMga2VlcFxyXG5cclxuICAgICAgICAvLyBzYW1lIHRpdGxlLCBhZGRyZXNzIGRpZmZcclxuICAgICAgICBjb25zdCBpbmRpY2VzTWF0Y2hUaXRsZSA9IFtdO1xyXG4gICAgICAgIGNvbnN0IGRpZmZBZGRyZXNzID0gYXJyLmZpbHRlcigoeCwgaSkgPT4ge1xyXG4gICAgICAgICAgbGV0IGJJbmQgPSBmYWxzZTtcclxuICAgICAgICAgIGlmICh4LnRpdGxlID09PSBsYXllclRpdGxlICYmIHgudHlwZSA9PT0gQ2F0YWxvZ0l0ZW1UeXBlLkxheWVyKSB7XHJcbiAgICAgICAgICAgIGlmIChpICE9PSBpZHggJiYgeC5hZGRyZXNzICE9PSBpdGVtLmFkZHJlc3MpIHtcclxuICAgICAgICAgICAgICBiSW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbmRpY2VzTWF0Y2hUaXRsZS5wdXNoKGkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGJJbmQ7XHJcbiAgICAgICAgfSk7IC8vICQmIGkgIT09IGlkeFxyXG5cclxuICAgICAgICBpZiAoZGlmZkFkZHJlc3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgY29uc3QgblBvc2l0aW9uID0gaW5kaWNlc01hdGNoVGl0bGUuZmluZEluZGV4KHggPT4geCA9PT0gaWR4KSArIDE7XHJcbiAgICAgICAgICBvdXRJdGVtLnRpdGxlID0gYCR7aXRlbS50aXRsZX0gKCR7blBvc2l0aW9ufSlgOyAvLyBzb3VyY2U6ICR7aXRlbS5hZGRyZXNzLnNwbGl0KCcuJylbMF19XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBleGlzdCA9IGFjYy5maW5kKCh4KSA9PiB4LnRpdGxlID09PSBvdXRJdGVtLnRpdGxlICYmIHgudHlwZSA9PT0gQ2F0YWxvZ0l0ZW1UeXBlLkxheWVyKTtcclxuICAgICAgICBpZiAoIWV4aXN0KSB7XHJcbiAgICAgICAgICBhY2NbYWNjLmxlbmd0aF0gPSBvdXRJdGVtO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09IENhdGFsb2dJdGVtVHlwZS5Hcm91cCkge1xyXG4gICAgICAgICAgb3V0SXRlbS5pdGVtcyA9IHJlY3Vyc2l2ZUdyb3VwQnlMYXllckFkZHJlc3MoaXRlbS5pdGVtcywgIGxheWVyID0+IGxheWVyLnRpdGxlKTtcclxuICAgICAgICAgIGFjY1thY2MubGVuZ3RoXSA9IG91dEl0ZW07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBhY2M7XHJcbiAgICB9LCBbXSk7XHJcblxyXG4gICAgY29uc3QgcmVxdWVzdDQkID0gcmVxdWVzdDMkLnBpcGUoXHJcbiAgICAgIG1hcChvdXRwdXQgPT4gZ3JvdXBCeUdyb3VwSWQob3V0cHV0LCBncm91cCA9PiBncm91cC5pZCkpLFxyXG4gICAgICBtYXAoKG91dHB1dCkgPT4gW10uY29uY2F0KC4uLm91dHB1dCkpLFxyXG4gICAgICBtYXAoZGF0YSA9PiByZWN1cnNpdmVHcm91cEJ5TGF5ZXJBZGRyZXNzKGRhdGEsICBsYXllciA9PiBsYXllci50aXRsZSkpXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiByZXF1ZXN0NCQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldENhdGFsb2dDYXBhYmlsaXRpZXMoY2F0YWxvZzogQ2F0YWxvZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBjb25zdCBzVHlwZTogc3RyaW5nID0gVHlwZUNhdGFsb2dbY2F0YWxvZy50eXBlIGFzIHN0cmluZ107XHJcbiAgICByZXR1cm4gdGhpcy5jYXBhYmlsaXRpZXNTZXJ2aWNlLmdldENhcGFiaWxpdGllcyhcclxuICAgICAgVHlwZUNhcGFiaWxpdGllc1tzVHlwZV0sXHJcbiAgICAgIGNhdGFsb2cudXJsLFxyXG4gICAgICBjYXRhbG9nLnZlcnNpb25cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHByZXBhcmVDYXRhbG9nSXRlbUxheWVyKGxheWVyLCBpZFBhcmVudCwgbGF5ZXJzUXVlcnlGb3JtYXQsIGNhdGFsb2csXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRhbG9nUXVlcnlQYXJhbXMsIGNhdGFsb2dTb3VyY2VPcHRpb25zLCBjYXRhbG9nVG9vbHRpcFR5cGUpIHtcclxuICAgIGNvbnN0IGNvbmZpZ3VyZWRRdWVyeUZvcm1hdCA9IHRoaXMucmV0cml2ZUxheWVySW5mb0Zvcm1hdChcclxuICAgICAgbGF5ZXIuTmFtZSxcclxuICAgICAgbGF5ZXJzUXVlcnlGb3JtYXRcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgbWV0YWRhdGEgPSBsYXllci5EYXRhVVJMID8gbGF5ZXIuRGF0YVVSTFswXSA6IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IGFic3RyYWN0ID0gbGF5ZXIuQWJzdHJhY3QgPyBsYXllci5BYnN0cmFjdCA6IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IGtleXdvcmRMaXN0ID0gbGF5ZXIuS2V5d29yZExpc3RcclxuICAgICAgPyBsYXllci5LZXl3b3JkTGlzdFxyXG4gICAgICA6IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IHRpbWVGaWx0ZXIgPSB0aGlzLmNhcGFiaWxpdGllc1NlcnZpY2UuZ2V0VGltZUZpbHRlcihsYXllcik7XHJcbiAgICBjb25zdCB0aW1lRmlsdGVyYWJsZSA9XHJcbiAgICAgIHRpbWVGaWx0ZXIgJiYgT2JqZWN0LmtleXModGltZUZpbHRlcikubGVuZ3RoID4gMCA/IHRydWUgOiBmYWxzZTtcclxuICAgIGNvbnN0IGxlZ2VuZE9wdGlvbnMgPSBsYXllci5TdHlsZVxyXG4gICAgICA/IHRoaXMuY2FwYWJpbGl0aWVzU2VydmljZS5nZXRTdHlsZShsYXllci5TdHlsZSlcclxuICAgICAgOiB1bmRlZmluZWQ7XHJcblxyXG4gICAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgY2F0YWxvZ1F1ZXJ5UGFyYW1zLCB7XHJcbiAgICAgIExBWUVSUzogbGF5ZXIuTmFtZSxcclxuICAgICAgRkVBVFVSRV9DT1VOVDogY2F0YWxvZy5jb3VudCxcclxuICAgICAgVkVSU0lPTjogY2F0YWxvZy52ZXJzaW9uIHx8ICcxLjMuMCdcclxuICAgIH0gYXMgV01TRGF0YVNvdXJjZU9wdGlvbnNQYXJhbXNcclxuICAgICk7XHJcbiAgICBjb25zdCBiYXNlU291cmNlT3B0aW9ucyA9IHtcclxuICAgICAgdHlwZTogJ3dtcycsXHJcbiAgICAgIHVybDogY2F0YWxvZy51cmwsXHJcbiAgICAgIGNyb3NzT3JpZ2luOiBjYXRhbG9nLnNldENyb3NzT3JpZ2luQW5vbnltb3VzXHJcbiAgICAgICAgPyAnYW5vbnltb3VzJ1xyXG4gICAgICAgIDogdW5kZWZpbmVkLFxyXG4gICAgICB0aW1lRmlsdGVyOiB7IC4uLnRpbWVGaWx0ZXIsIC4uLmNhdGFsb2cudGltZUZpbHRlciB9LFxyXG4gICAgICB0aW1lRmlsdGVyYWJsZTogdGltZUZpbHRlcmFibGUgPyB0cnVlIDogZmFsc2UsXHJcbiAgICAgIHF1ZXJ5YWJsZTogbGF5ZXIucXVlcnlhYmxlLFxyXG4gICAgICBxdWVyeUZvcm1hdDogY29uZmlndXJlZFF1ZXJ5Rm9ybWF0LFxyXG4gICAgICBxdWVyeUh0bWxUYXJnZXQ6IGNhdGFsb2cucXVlcnlIdG1sVGFyZ2V0IHx8IFF1ZXJ5SHRtbFRhcmdldC5JRlJBTUVcclxuICAgIH07XHJcbiAgICBjb25zdCBzb3VyY2VPcHRpb25zID0gT2JqZWN0LmFzc2lnbihcclxuICAgICAge30sXHJcbiAgICAgIGJhc2VTb3VyY2VPcHRpb25zLFxyXG4gICAgICBjYXRhbG9nU291cmNlT3B0aW9ucyxcclxuICAgICAgeyBwYXJhbXMgfVxyXG4gICAgKSBhcyBXTVNEYXRhU291cmNlT3B0aW9ucztcclxuXHJcbiAgICBjb25zdCBsYXllclByZXBhcmUgPSB7XHJcbiAgICAgIGlkOiBnZW5lcmF0ZUlkRnJvbVNvdXJjZU9wdGlvbnMoc291cmNlT3B0aW9ucyksXHJcbiAgICAgIHR5cGU6IENhdGFsb2dJdGVtVHlwZS5MYXllcixcclxuICAgICAgdGl0bGU6IGxheWVyLlRpdGxlLFxyXG4gICAgICBhZGRyZXNzOiBpZFBhcmVudCxcclxuICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgIHRpdGxlOiBsYXllci5UaXRsZSxcclxuICAgICAgICBtYXhSZXNvbHV0aW9uOlxyXG4gICAgICAgICAgZ2V0UmVzb2x1dGlvbkZyb21TY2FsZShsYXllci5NYXhTY2FsZURlbm9taW5hdG9yKSB8fCBJbmZpbml0eSxcclxuICAgICAgICBtaW5SZXNvbHV0aW9uOlxyXG4gICAgICAgICAgZ2V0UmVzb2x1dGlvbkZyb21TY2FsZShsYXllci5NaW5TY2FsZURlbm9taW5hdG9yKSB8fCAwLFxyXG4gICAgICAgIG1ldGFkYXRhOiB7XHJcbiAgICAgICAgICB1cmw6IG1ldGFkYXRhID8gbWV0YWRhdGEuT25saW5lUmVzb3VyY2UgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICBleHRlcm46IG1ldGFkYXRhID8gdHJ1ZSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgIGFic3RyYWN0LFxyXG4gICAgICAgICAga2V5d29yZExpc3RcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxlZ2VuZE9wdGlvbnMsXHJcbiAgICAgICAgdG9vbHRpcDogeyB0eXBlOiBjYXRhbG9nVG9vbHRpcFR5cGUgfSBhcyBUb29sdGlwQ29udGVudCxcclxuICAgICAgICBzb3VyY2VPcHRpb25zXHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIGxheWVyUHJlcGFyZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcHJlcGFyZUNhdGFsb2dJdGVtR3JvdXAoaXRlbUxpc3RJbiwgcmVnZXhlcywgaWRHcm91cCwgbGF5ZXJzUXVlcnlGb3JtYXQsIGNhdGFsb2csXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRhbG9nUXVlcnlQYXJhbXMsIGNhdGFsb2dTb3VyY2VPcHRpb25zLCBjYXRhbG9nVG9vbHRpcFR5cGUpIHtcclxuICAgICBjb25zdCBncm91cFByZXBhcmUgPSB7XHJcbiAgICAgICAgaWQ6IGlkR3JvdXAsXHJcbiAgICAgICAgdHlwZTogQ2F0YWxvZ0l0ZW1UeXBlLkdyb3VwLFxyXG4gICAgICAgIHRpdGxlOiBpdGVtTGlzdEluLlRpdGxlLFxyXG4gICAgICAgIGFkZHJlc3M6IGNhdGFsb2cuaWQsXHJcbiAgICAgICAgaXRlbXM6IGl0ZW1MaXN0SW4uTGF5ZXIucmVkdWNlKFxyXG4gICAgICAgICAgKGl0ZW1zOiBDYXRhbG9nSXRlbVtdLCBsYXllcjogYW55KSA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZiAobGF5ZXIuTGF5ZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgIC8vIHJlY3Vyc2l2ZSwgY2hlY2sgbmV4dCBsZXZlbFxyXG4gICAgICAgICAgICAgIGNvbnN0IGlkR3JvdXBJdGVtTmV4dExldmVsID0gaWRHcm91cCArIGAuZ3JvdXAuJHtsYXllci5OYW1lIHx8IGxheWVyLkxheWVyWzBdLk5hbWV9YDtcclxuICAgICAgICAgICAgICBjb25zdCBncm91cEl0ZW06IENhdGFsb2dJdGVtR3JvdXAgPSB0aGlzLnByZXBhcmVDYXRhbG9nSXRlbUdyb3VwKGxheWVyLCByZWdleGVzLCBpZEdyb3VwSXRlbU5leHRMZXZlbCxcclxuICAgICAgICAgICAgICAgIGxheWVyc1F1ZXJ5Rm9ybWF0LCBjYXRhbG9nLCBjYXRhbG9nUXVlcnlQYXJhbXMsIGNhdGFsb2dTb3VyY2VPcHRpb25zLCBjYXRhbG9nVG9vbHRpcFR5cGUpO1xyXG5cclxuICAgICAgICAgICAgICBpdGVtcy5wdXNoKGdyb3VwSXRlbSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMudGVzdExheWVyUmVnZXhlcyhsYXllci5OYW1lLCByZWdleGVzKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtcztcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIGNvbnN0IGxheWVySXRlbTogQ2F0YWxvZ0l0ZW1MYXllcjxJbWFnZUxheWVyT3B0aW9ucz4gPSB0aGlzLnByZXBhcmVDYXRhbG9nSXRlbUxheWVyKGxheWVyLCBpZEdyb3VwLCBsYXllcnNRdWVyeUZvcm1hdCxcclxuICAgICAgICAgICAgICAgIGNhdGFsb2csIGNhdGFsb2dRdWVyeVBhcmFtcywgY2F0YWxvZ1NvdXJjZU9wdGlvbnMsIGNhdGFsb2dUb29sdGlwVHlwZSk7XHJcblxyXG4gICAgICAgICAgICAgIGl0ZW1zLnB1c2gobGF5ZXJJdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gaXRlbXM7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgW11cclxuICAgICAgICApXHJcbiAgICAgIH07XHJcbiAgICAgcmV0dXJuIGdyb3VwUHJlcGFyZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5jbHVkZVJlY3Vyc2l2ZUl0ZW1zKFxyXG4gICAgY2F0YWxvZzogQ2F0YWxvZyxcclxuICAgIGl0ZW1MaXN0SW46IGFueSxcclxuICAgIGl0ZW1zUHJlcGFyZTogQ2F0YWxvZ0l0ZW1bXSxcclxuICAgIGxvb3BMZXZlbDogbnVtYmVyID0gMCxcclxuICApIHtcclxuICAgIC8vIERpZyBhbGwgbGV2ZWxzIHVudGlsIGxhc3QgbGV2ZWwgKGxheWVyIG9iamVjdCBhcmUgbm90IGRlZmluZWQgb24gbGFzdCBsZXZlbClcclxuICAgIGNvbnN0IHJlZ2V4ZXMgPSAoY2F0YWxvZy5yZWdGaWx0ZXJzIHx8IFtdKS5tYXAoXHJcbiAgICAgIChwYXR0ZXJuOiBzdHJpbmcpID0+IG5ldyBSZWdFeHAocGF0dGVybilcclxuICAgICk7XHJcbiAgICBjb25zdCBjYXRhbG9nUXVlcnlQYXJhbXMgPSBjYXRhbG9nLnF1ZXJ5UGFyYW1zIHx8IHt9O1xyXG4gICAgY29uc3QgY2F0YWxvZ1NvdXJjZU9wdGlvbnMgPSBjYXRhbG9nLnNvdXJjZU9wdGlvbnMgfHwge307XHJcblxyXG4gICAgaWYgKCFpdGVtTGlzdEluLkxheWVyKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbUxpc3RJbi5MYXllcikge1xyXG4gICAgICBpZiAoaXRlbS5MYXllciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgLy8gcmVjdXJzaXZlLCBjaGVjayBuZXh0IGxldmVsXHJcbiAgICAgICAgdGhpcy5pbmNsdWRlUmVjdXJzaXZlSXRlbXMoY2F0YWxvZywgaXRlbSwgaXRlbXNQcmVwYXJlLCBsb29wTGV2ZWwgKyAxKTtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgY2F0YWxvZ1Rvb2x0aXBUeXBlID0gdGhpcy5yZXRyaWV2ZVRvb2x0aXBUeXBlKGNhdGFsb2cpO1xyXG4gICAgICBjb25zdCBsYXllcnNRdWVyeUZvcm1hdCA9IHRoaXMuZmluZENhdGFsb2dJbmZvRm9ybWF0KGNhdGFsb2cpO1xyXG5cclxuICAgICAgLy8gZ3JvdXAod2l0aCBsYXllcnMpIGFuZCBsYXllcih3aXRob3V0IGdyb3VwKSBsZXZlbCAxXHJcbiAgICAgIGlmIChsb29wTGV2ZWwgIT09IDApIHtcclxuXHJcbiAgICAgICAgLy8gVE9ETzogU2xpY2UgdGhhdCBpbnRvIG11bHRpcGxlIG1ldGhvZHNcclxuICAgICAgICAvLyBEZWZpbmUgb2JqZWN0IG9mIGdyb3VwIGxheWVyXHJcbiAgICAgICAgY29uc3QgaWRHcm91cEl0ZW0gPSBgY2F0YWxvZy5ncm91cC4ke2l0ZW1MaXN0SW4uTmFtZSB8fCBpdGVtLk5hbWV9YDtcclxuICAgICAgICBjb25zdCBncm91cEl0ZW0gPSB0aGlzLnByZXBhcmVDYXRhbG9nSXRlbUdyb3VwKGl0ZW1MaXN0SW4sIHJlZ2V4ZXMsIGlkR3JvdXBJdGVtLCBsYXllcnNRdWVyeUZvcm1hdCwgY2F0YWxvZyxcclxuICAgICAgICAgIGNhdGFsb2dRdWVyeVBhcmFtcywgY2F0YWxvZ1NvdXJjZU9wdGlvbnMsIGNhdGFsb2dUb29sdGlwVHlwZSk7XHJcblxyXG4gICAgICAgIGlmIChncm91cEl0ZW0uaXRlbXMubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICBpdGVtc1ByZXBhcmUucHVzaChncm91cEl0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQnJlYWsgdGhlIGdyb3VwIChkb24ndCBhZGQgYSBncm91cCBvZiBsYXllciBmb3IgZWFjaCBvZiB0aGVpciBsYXllciEpXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gbGF5ZXIgd2l0aG91dCBncm91cFxyXG4gICAgICAgIGNvbnN0IGxheWVySXRlbSA9IHRoaXMucHJlcGFyZUNhdGFsb2dJdGVtTGF5ZXIoaXRlbSwgY2F0YWxvZy5pZCwgbGF5ZXJzUXVlcnlGb3JtYXQsXHJcbiAgICAgICAgICBjYXRhbG9nLCBjYXRhbG9nUXVlcnlQYXJhbXMsIGNhdGFsb2dTb3VyY2VPcHRpb25zLCBjYXRhbG9nVG9vbHRpcFR5cGUpO1xyXG4gICAgICAgIGl0ZW1zUHJlcGFyZS5wdXNoKGxheWVySXRlbSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0V01UU0l0ZW1zKFxyXG4gICAgY2F0YWxvZzogQ2F0YWxvZyxcclxuICAgIGNhcGFiaWxpdGllczogeyBba2V5OiBzdHJpbmddOiBhbnkgfVxyXG4gICk6IENhdGFsb2dJdGVtTGF5ZXJbXSB7XHJcbiAgICBjb25zdCBsYXllcnMgPSBjYXBhYmlsaXRpZXMuQ29udGVudHMuTGF5ZXI7XHJcbiAgICBjb25zdCByZWdleGVzID0gKGNhdGFsb2cucmVnRmlsdGVycyB8fCBbXSkubWFwKFxyXG4gICAgICAocGF0dGVybjogc3RyaW5nKSA9PiBuZXcgUmVnRXhwKHBhdHRlcm4pXHJcbiAgICApO1xyXG4gICAgY29uc3QgY2F0YWxvZ1F1ZXJ5UGFyYW1zID0gY2F0YWxvZy5xdWVyeVBhcmFtcyB8fCB7fTtcclxuICAgIGNvbnN0IGNhdGFsb2dTb3VyY2VPcHRpb25zID0gY2F0YWxvZy5zb3VyY2VPcHRpb25zIHx8IHt9O1xyXG5cclxuICAgIHJldHVybiBsYXllcnNcclxuICAgICAgLm1hcCgobGF5ZXI6IGFueSkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnRlc3RMYXllclJlZ2V4ZXMobGF5ZXIuSWRlbnRpZmllciwgcmVnZXhlcykgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBjYXRhbG9nUXVlcnlQYXJhbXMsIHtcclxuICAgICAgICAgIHZlcnNpb246ICcxLjAuMCdcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBiYXNlU291cmNlT3B0aW9ucyA9IHtcclxuICAgICAgICAgIHR5cGU6ICd3bXRzJyxcclxuICAgICAgICAgIHVybDogY2F0YWxvZy51cmwsXHJcbiAgICAgICAgICBjcm9zc09yaWdpbjogY2F0YWxvZy5zZXRDcm9zc09yaWdpbkFub255bW91c1xyXG4gICAgICAgICAgICA/ICdhbm9ueW1vdXMnXHJcbiAgICAgICAgICAgIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgbGF5ZXI6IGxheWVyLklkZW50aWZpZXIsXHJcbiAgICAgICAgICBtYXRyaXhTZXQ6IGNhdGFsb2cubWF0cml4U2V0LFxyXG4gICAgICAgICAgb3B0aW9uc0Zyb21DYXBhYmlsaXRpZXM6IHRydWUsXHJcbiAgICAgICAgICByZXF1ZXN0RW5jb2Rpbmc6IGNhdGFsb2cucmVxdWVzdEVuY29kaW5nIHx8ICdLVlAnLFxyXG4gICAgICAgICAgc3R5bGU6ICdkZWZhdWx0J1xyXG4gICAgICAgIH0gYXMgV01UU0RhdGFTb3VyY2VPcHRpb25zO1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZU9wdGlvbnMgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgICAgICAge30sXHJcbiAgICAgICAgICBiYXNlU291cmNlT3B0aW9ucyxcclxuICAgICAgICAgIGNhdGFsb2dTb3VyY2VPcHRpb25zLFxyXG4gICAgICAgICAgeyBwYXJhbXMgfVxyXG4gICAgICAgICkgYXMgV01UU0RhdGFTb3VyY2VPcHRpb25zO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgaWQ6IGdlbmVyYXRlSWRGcm9tU291cmNlT3B0aW9ucyhzb3VyY2VPcHRpb25zKSxcclxuICAgICAgICAgIHR5cGU6IENhdGFsb2dJdGVtVHlwZS5MYXllcixcclxuICAgICAgICAgIHRpdGxlOiBsYXllci5UaXRsZSxcclxuICAgICAgICAgIGFkZHJlc3M6IGNhdGFsb2cuaWQsXHJcbiAgICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBsYXllci5UaXRsZSxcclxuICAgICAgICAgICAgc291cmNlT3B0aW9ucyxcclxuICAgICAgICAgICAgbWF4UmVzb2x1dGlvbjogSW5maW5pdHksXHJcbiAgICAgICAgICAgIG1pblJlc29sdXRpb246IDBcclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICB9KVxyXG4gICAgICAuZmlsdGVyKChpdGVtOiBDYXRhbG9nSXRlbUxheWVyIHwgdW5kZWZpbmVkKSA9PiBpdGVtICE9PSB1bmRlZmluZWQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0ZXN0TGF5ZXJSZWdleGVzKGxheWVyTmFtZSwgcmVnZXhlcyk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHJlZ2V4ZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlZ2V4ZXMuZmluZCgocmVnZXg6IFJlZ0V4cCkgPT4gcmVnZXgudGVzdChsYXllck5hbWUpKSAhPT0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZXRyaXZlTGF5ZXJJbmZvRm9ybWF0KFxyXG4gICAgbGF5ZXJOYW1lRnJvbUNhdGFsb2c6IHN0cmluZyxcclxuICAgIGxheWVyc1F1ZXJ5Rm9ybWF0OiB7IGxheWVyOiBzdHJpbmc7IHF1ZXJ5Rm9ybWF0OiBRdWVyeUZvcm1hdCB9W11cclxuICApOiBRdWVyeUZvcm1hdCB7XHJcbiAgICBjb25zdCBjdXJyZW50TGF5ZXJJbmZvRm9ybWF0ID0gbGF5ZXJzUXVlcnlGb3JtYXQuZmluZChcclxuICAgICAgZiA9PiBmLmxheWVyID09PSBsYXllck5hbWVGcm9tQ2F0YWxvZ1xyXG4gICAgKTtcclxuICAgIGNvbnN0IGJhc2VJbmZvRm9ybWF0ID0gbGF5ZXJzUXVlcnlGb3JtYXQuZmluZChmID0+IGYubGF5ZXIgPT09ICcqJyk7XHJcbiAgICBsZXQgcXVlcnlGb3JtYXQ6IFF1ZXJ5Rm9ybWF0O1xyXG4gICAgaWYgKGN1cnJlbnRMYXllckluZm9Gb3JtYXQpIHtcclxuICAgICAgcXVlcnlGb3JtYXQgPSBjdXJyZW50TGF5ZXJJbmZvRm9ybWF0LnF1ZXJ5Rm9ybWF0O1xyXG4gICAgfSBlbHNlIGlmIChiYXNlSW5mb0Zvcm1hdCkge1xyXG4gICAgICBxdWVyeUZvcm1hdCA9IGJhc2VJbmZvRm9ybWF0LnF1ZXJ5Rm9ybWF0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHF1ZXJ5Rm9ybWF0O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZXRyaWV2ZVRvb2x0aXBUeXBlKGNhdGFsb2c6IENhdGFsb2cpOiBUb29sdGlwVHlwZSB7XHJcbiAgICBpZiAoIWNhdGFsb2cudG9vbHRpcFR5cGUpIHtcclxuICAgICAgcmV0dXJuIFRvb2x0aXBUeXBlLlRJVExFO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNhdGFsb2cudG9vbHRpcFR5cGU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZpbmRDYXRhbG9nSW5mb0Zvcm1hdChcclxuICAgIGNhdGFsb2c6IENhdGFsb2dcclxuICApOiB7IGxheWVyOiBzdHJpbmc7IHF1ZXJ5Rm9ybWF0OiBRdWVyeUZvcm1hdCB9W10ge1xyXG4gICAgY29uc3QgbGF5ZXJzUXVlcnlGb3JtYXQ6IHsgbGF5ZXI6IHN0cmluZzsgcXVlcnlGb3JtYXQ6IFF1ZXJ5Rm9ybWF0IH1bXSA9IFtdO1xyXG4gICAgaWYgKCFjYXRhbG9nLnF1ZXJ5Rm9ybWF0KSB7XHJcbiAgICAgIHJldHVybiBsYXllcnNRdWVyeUZvcm1hdDtcclxuICAgIH1cclxuICAgIE9iamVjdC5rZXlzKGNhdGFsb2cucXVlcnlGb3JtYXQpLmZvckVhY2goY29uZmlndXJlZEluZm9Gb3JtYXQgPT4ge1xyXG4gICAgICBpZiAoY2F0YWxvZy5xdWVyeUZvcm1hdFtjb25maWd1cmVkSW5mb0Zvcm1hdF0gaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgIGNhdGFsb2cucXVlcnlGb3JtYXRbY29uZmlndXJlZEluZm9Gb3JtYXRdLmZvckVhY2gobGF5ZXJOYW1lID0+IHtcclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgIWxheWVyc1F1ZXJ5Rm9ybWF0LmZpbmQoc3BlY2lmaWMgPT4gc3BlY2lmaWMubGF5ZXIgPT09IGxheWVyTmFtZSlcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICBsYXllcnNRdWVyeUZvcm1hdC5wdXNoKHtcclxuICAgICAgICAgICAgICBsYXllcjogbGF5ZXJOYW1lLFxyXG4gICAgICAgICAgICAgIHF1ZXJ5Rm9ybWF0OiBjb25maWd1cmVkSW5mb0Zvcm1hdCBhcyBRdWVyeUZvcm1hdFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAhbGF5ZXJzUXVlcnlGb3JtYXQuZmluZChcclxuICAgICAgICAgICAgc3BlY2lmaWMgPT5cclxuICAgICAgICAgICAgICBzcGVjaWZpYy5sYXllciA9PT0gY2F0YWxvZy5xdWVyeUZvcm1hdFtjb25maWd1cmVkSW5mb0Zvcm1hdF1cclxuICAgICAgICAgIClcclxuICAgICAgICApIHtcclxuICAgICAgICAgIGxheWVyc1F1ZXJ5Rm9ybWF0LnB1c2goe1xyXG4gICAgICAgICAgICBsYXllcjogY2F0YWxvZy5xdWVyeUZvcm1hdFtjb25maWd1cmVkSW5mb0Zvcm1hdF0sXHJcbiAgICAgICAgICAgIHF1ZXJ5Rm9ybWF0OiBjb25maWd1cmVkSW5mb0Zvcm1hdCBhcyBRdWVyeUZvcm1hdFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBsYXllcnNRdWVyeUZvcm1hdDtcclxuICB9XHJcbn1cclxuIl19