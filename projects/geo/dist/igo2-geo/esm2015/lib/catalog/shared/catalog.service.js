/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, of, zip } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { uuid, ObjectUtils } from '@igo2/utils';
import { LanguageService, ConfigService } from '@igo2/core';
import { CapabilitiesService, TypeCapabilities } from '../../datasource';
import { getResolutionFromScale } from '../../map';
import { CatalogFactory } from './catalog.abstract';
import { CatalogItemType, TypeCatalog } from './catalog.enum';
import { QueryFormat } from '../../query';
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
             * @param {?} _response
             * @return {?}
             */
            (_response) => EMPTY)));
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
                v => (v.address = `${outGroupImpose.address}.${outGroupImpose.id}`)));
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
            items => compositeCatalog[idx].groupImpose
                ? pushImposeGroup(items, idx)
                : items)))));
        }
        else {
            request2$ = request1$;
        }
        // concat Group -----------------------------------------------------
        /** @type {?} */
        const request3$ = zip(...request2$).pipe(map((/**
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
            x => x.id === groupId));
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
                x => x.title === outItem.title && x.type === CatalogItemType.Layer));
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
        output => [].concat(...output))), map((/**
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
     * @return {?}
     */
    prepareCatalogItemLayer(layer, idParent, layersQueryFormat, catalog) {
        /** @type {?} */
        const configuredQueryFormat = this.retriveLayerInfoFormat(layer.Name, layersQueryFormat);
        /** @type {?} */
        const metadata = layer.DataURL ? layer.DataURL[0] : undefined;
        /** @type {?} */
        const legendOptions = catalog.showLegend && layer.Style
            ? this.capabilitiesService.getStyle(layer.Style)
            : undefined;
        /** @type {?} */
        const params = Object.assign({}, catalog.queryParams, (/** @type {?} */ ({
            LAYERS: layer.Name,
            VERSION: catalog.version
        })));
        /** @type {?} */
        const baseSourceOptions = {
            type: 'wms',
            url: catalog.url,
            crossOrigin: catalog.setCrossOriginAnonymous ? 'anonymous' : undefined,
            queryFormat: configuredQueryFormat,
            queryHtmlTarget: configuredQueryFormat === QueryFormat.HTML ||
                configuredQueryFormat === QueryFormat.HTMLGML2
                ? 'iframe'
                : undefined,
            optionsFromCapabilities: true
        };
        /** @type {?} */
        const sourceOptions = (/** @type {?} */ (Object.assign({}, baseSourceOptions, catalog.sourceOptions, { params })));
        /** @type {?} */
        const layerPrepare = {
            id: generateIdFromSourceOptions(sourceOptions),
            type: CatalogItemType.Layer,
            title: layer.Title,
            address: idParent,
            options: {
                maxResolution: getResolutionFromScale(layer.MaxScaleDenominator),
                minResolution: getResolutionFromScale(layer.MinScaleDenominator),
                metadata: {
                    url: metadata ? metadata.OnlineResource : undefined,
                    extern: metadata ? true : undefined
                },
                legendOptions,
                tooltip: { type: catalog.tooltipType },
                sourceOptions
            }
        };
        return ObjectUtils.removeUndefined(layerPrepare);
    }
    /**
     * @private
     * @param {?} itemListIn
     * @param {?} regexes
     * @param {?} idGroup
     * @param {?} layersQueryFormat
     * @param {?} catalog
     * @return {?}
     */
    prepareCatalogItemGroup(itemListIn, regexes, idGroup, layersQueryFormat, catalog) {
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
                    const groupItem = this.prepareCatalogItemGroup(layer, regexes, idGroupItemNextLevel, layersQueryFormat, catalog);
                    items.push(groupItem);
                }
                else {
                    if (this.testLayerRegexes(layer.Name, regexes) === false) {
                        return items;
                    }
                    /** @type {?} */
                    const layerItem = this.prepareCatalogItemLayer(layer, idGroup, layersQueryFormat, catalog);
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
            const layersQueryFormat = this.findCatalogInfoFormat(catalog);
            // group(with layers) and layer(without group) level 1
            if (loopLevel !== 0) {
                // TODO: Slice that into multiple methods
                // Define object of group layer
                /** @type {?} */
                const idGroupItem = `catalog.group.${itemListIn.Name || item.Name}`;
                /** @type {?} */
                const groupItem = this.prepareCatalogItemGroup(itemListIn, regexes, idGroupItem, layersQueryFormat, catalog);
                if (groupItem.items.length !== 0) {
                    itemsPrepare.push(groupItem);
                }
                // Break the group (don't add a group of layer for each of their layer!)
                break;
            }
            else {
                // layer without group
                if (this.testLayerRegexes(item.Name, regexes) !== false) {
                    /** @type {?} */
                    const layerItem = this.prepareCatalogItemLayer(item, catalog.id, layersQueryFormat, catalog);
                    itemsPrepare.push(layerItem);
                }
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
            const params = Object.assign({}, catalog.queryParams, {
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
            const sourceOptions = (/** @type {?} */ (Object.assign({}, baseSourceOptions, catalog.sourceOptions, { params })));
            return ObjectUtils.removeUndefined({
                id: generateIdFromSourceOptions(sourceOptions),
                type: CatalogItemType.Layer,
                title: layer.Title,
                address: catalog.id,
                options: {
                    sourceOptions
                }
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2NhdGFsb2cvc2hhcmVkL2NhdGFsb2cuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFxQixNQUFNLHNCQUFzQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxLQUFLLEVBQWMsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRCxPQUFPLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpELE9BQU8sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzVELE9BQU8sRUFDTCxtQkFBbUIsRUFDbkIsZ0JBQWdCLEVBSWpCLE1BQU0sa0JBQWtCLENBQUM7QUFFMUIsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBT25ELE9BQU8sRUFBVyxjQUFjLEVBQW9CLE1BQU0sb0JBQW9CLENBQUM7QUFDL0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzFDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7Ozs7QUFLMUQsTUFBTSxPQUFPLGNBQWM7Ozs7Ozs7SUFDekIsWUFDVSxJQUFnQixFQUNoQixNQUFxQixFQUNyQixlQUFnQyxFQUNoQyxtQkFBd0M7UUFIeEMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3JCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtR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LENBQUM7SUFDM0IsQ0FBQzs7O1lBN2hCRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUE1QlEsVUFBVTtZQUtPLGFBQWE7WUFBOUIsZUFBZTtZQUV0QixtQkFBbUI7Ozs7Ozs7O0lBd0JqQiw4QkFBd0I7Ozs7O0lBQ3hCLGdDQUE2Qjs7Ozs7SUFDN0IseUNBQXdDOzs7OztJQUN4Qyw2Q0FBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBFTVBUWSwgT2JzZXJ2YWJsZSwgb2YsIHppcCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAsIGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyB1dWlkLCBPYmplY3RVdGlscyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuaW1wb3J0IHsgTGFuZ3VhZ2VTZXJ2aWNlLCBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQ2FwYWJpbGl0aWVzU2VydmljZSxcclxuICBUeXBlQ2FwYWJpbGl0aWVzLFxyXG4gIFdNU0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gIFdNU0RhdGFTb3VyY2VPcHRpb25zUGFyYW1zLFxyXG4gIFdNVFNEYXRhU291cmNlT3B0aW9uc1xyXG59IGZyb20gJy4uLy4uL2RhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBMYXllck9wdGlvbnMsIEltYWdlTGF5ZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vbGF5ZXInO1xyXG5pbXBvcnQgeyBnZXRSZXNvbHV0aW9uRnJvbVNjYWxlIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuXHJcbmltcG9ydCB7XHJcbiAgQ2F0YWxvZ0l0ZW0sXHJcbiAgQ2F0YWxvZ0l0ZW1MYXllcixcclxuICBDYXRhbG9nSXRlbUdyb3VwXHJcbn0gZnJvbSAnLi9jYXRhbG9nLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IENhdGFsb2csIENhdGFsb2dGYWN0b3J5LCBDb21wb3NpdGVDYXRhbG9nIH0gZnJvbSAnLi9jYXRhbG9nLmFic3RyYWN0JztcclxuaW1wb3J0IHsgQ2F0YWxvZ0l0ZW1UeXBlLCBUeXBlQ2F0YWxvZyB9IGZyb20gJy4vY2F0YWxvZy5lbnVtJztcclxuaW1wb3J0IHsgUXVlcnlGb3JtYXQgfSBmcm9tICcuLi8uLi9xdWVyeSc7XHJcbmltcG9ydCB7IGdlbmVyYXRlSWRGcm9tU291cmNlT3B0aW9ucyB9IGZyb20gJy4uLy4uL3V0aWxzJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIENhdGFsb2dTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgY2FwYWJpbGl0aWVzU2VydmljZTogQ2FwYWJpbGl0aWVzU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgbG9hZENhdGFsb2dzKCk6IE9ic2VydmFibGU8Q2F0YWxvZ1tdPiB7XHJcbiAgICBjb25zdCBjb250ZXh0Q29uZmlnID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdjb250ZXh0JykgfHwge307XHJcbiAgICBjb25zdCBjYXRhbG9nQ29uZmlnID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdjYXRhbG9nJykgfHwge307XHJcbiAgICBjb25zdCBhcGlVcmwgPSBjYXRhbG9nQ29uZmlnLnVybCB8fCBjb250ZXh0Q29uZmlnLnVybDtcclxuICAgIGNvbnN0IGNhdGFsb2dzRnJvbUNvbmZpZyA9IGNhdGFsb2dDb25maWcuc291cmNlcyB8fCBbXTtcclxuXHJcbiAgICBjb25zdCBvYnNlcnZhYmxlcyQgPSBbXTtcclxuXHJcbiAgICBpZiAoYXBpVXJsKSB7XHJcbiAgICAgIC8vIEJhc2UgbGF5ZXJzIGNhdGFsb2dcclxuICAgICAgaWYgKGNhdGFsb2dDb25maWcuYmFzZUxheWVycykge1xyXG4gICAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmNhdGFsb2cuYmFzZUxheWVycycpO1xyXG4gICAgICAgIGNvbnN0IGJhc2VMYXllcnNDYXRhbG9nID0gW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBpZDogJ2NhdGFsb2cuYmFzZWxheWVycycsXHJcbiAgICAgICAgICAgIHRpdGxlLFxyXG4gICAgICAgICAgICB1cmw6IGAke2FwaVVybH0vYmFzZWxheWVyc2AsXHJcbiAgICAgICAgICAgIHR5cGU6ICdiYXNlbGF5ZXJzJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgb2JzZXJ2YWJsZXMkLnB1c2gob2YoYmFzZUxheWVyc0NhdGFsb2cpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQ2F0YWxvZ3MgZnJvbSBBUElcclxuICAgICAgY29uc3QgY2F0YWxvZ3NGcm9tQXBpJCA9IHRoaXMuaHR0cFxyXG4gICAgICAgIC5nZXQ8Q2F0YWxvZ1tdPihgJHthcGlVcmx9L2NhdGFsb2dzYClcclxuICAgICAgICAucGlwZShcclxuICAgICAgICAgIG1hcChjYXRhbG9ncyA9PlxyXG4gICAgICAgICAgICBjYXRhbG9ncy5tYXAoKGM6IGFueSkgPT4gT2JqZWN0LmFzc2lnbihjLCBjLm9wdGlvbnMpKVxyXG4gICAgICAgICAgKSxcclxuICAgICAgICAgIGNhdGNoRXJyb3IoKF9yZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2UpID0+IEVNUFRZKVxyXG4gICAgICAgICk7XHJcbiAgICAgIG9ic2VydmFibGVzJC5wdXNoKGNhdGFsb2dzRnJvbUFwaSQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENhdGFsb2dzIGZyb20gY29uZmlnXHJcbiAgICBpZiAoY2F0YWxvZ3NGcm9tQ29uZmlnLmxlbmd0aCA+IDApIHtcclxuICAgICAgb2JzZXJ2YWJsZXMkLnB1c2goXHJcbiAgICAgICAgb2YoY2F0YWxvZ3NGcm9tQ29uZmlnKS5waXBlKFxyXG4gICAgICAgICAgbWFwKChjYXRhbG9nczogQ2F0YWxvZ1tdKSA9PlxyXG4gICAgICAgICAgICBjYXRhbG9ncy5tYXAoYyA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKCFjLmlkKSB7XHJcbiAgICAgICAgICAgICAgICBjLmlkID0gdXVpZCgpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICByZXR1cm4gYztcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIClcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHppcCguLi5vYnNlcnZhYmxlcyQpLnBpcGUoXHJcbiAgICAgIG1hcCgoY2F0YWxvZ3M6IENhdGFsb2dbXVtdKSA9PiBbXS5jb25jYXQuYXBwbHkoW10sIGNhdGFsb2dzKSlcclxuICAgICkgYXMgT2JzZXJ2YWJsZTxDYXRhbG9nW10+O1xyXG4gIH1cclxuXHJcbiAgbG9hZENhdGFsb2dJdGVtcyhjYXRhbG9nOiBDYXRhbG9nKTogT2JzZXJ2YWJsZTxDYXRhbG9nSXRlbVtdPiB7XHJcbiAgICBsZXQgbmV3Q2F0YWxvZzogQ2F0YWxvZztcclxuICAgIG5ld0NhdGFsb2cgPSBDYXRhbG9nRmFjdG9yeS5jcmVhdGVJbnN0YW5jZUNhdGFsb2coY2F0YWxvZywgdGhpcyk7XHJcbiAgICByZXR1cm4gbmV3Q2F0YWxvZy5jb2xsZWN0Q2F0YWxvZ0l0ZW1zKCk7XHJcbiAgfVxyXG5cclxuICBsb2FkQ2F0YWxvZ0Jhc2VMYXllckl0ZW1zKGNhdGFsb2c6IENhdGFsb2cpOiBPYnNlcnZhYmxlPENhdGFsb2dJdGVtR3JvdXBbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2F0YWxvZ0Jhc2VMYXllcnNPcHRpb25zKGNhdGFsb2cpLnBpcGUoXHJcbiAgICAgIG1hcCgobGF5ZXJzT3B0aW9uczogTGF5ZXJPcHRpb25zW10pID0+IHtcclxuICAgICAgICBjb25zdCBpdGVtcyA9IGxheWVyc09wdGlvbnMubWFwKChsYXllck9wdGlvbnM6IExheWVyT3B0aW9ucykgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaWQ6IGdlbmVyYXRlSWRGcm9tU291cmNlT3B0aW9ucyhsYXllck9wdGlvbnMuc291cmNlT3B0aW9ucyksXHJcbiAgICAgICAgICAgIHRpdGxlOiBsYXllck9wdGlvbnMudGl0bGUsXHJcbiAgICAgICAgICAgIHR5cGU6IENhdGFsb2dJdGVtVHlwZS5MYXllcixcclxuICAgICAgICAgICAgb3B0aW9uczogbGF5ZXJPcHRpb25zXHJcbiAgICAgICAgICB9IGFzIENhdGFsb2dJdGVtTGF5ZXI7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6ICdjYXRhbG9nLmdyb3VwLmJhc2VsYXllcnMnLFxyXG4gICAgICAgICAgICB0eXBlOiBDYXRhbG9nSXRlbVR5cGUuR3JvdXAsXHJcbiAgICAgICAgICAgIHRpdGxlOiBjYXRhbG9nLnRpdGxlLFxyXG4gICAgICAgICAgICBpdGVtc1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF07XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRDYXRhbG9nQmFzZUxheWVyc09wdGlvbnMoXHJcbiAgICBjYXRhbG9nOiBDYXRhbG9nXHJcbiAgKTogT2JzZXJ2YWJsZTxMYXllck9wdGlvbnNbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TGF5ZXJPcHRpb25zW10+KGNhdGFsb2cudXJsKTtcclxuICB9XHJcblxyXG4gIGxvYWRDYXRhbG9nV01TTGF5ZXJJdGVtcyhjYXRhbG9nOiBDYXRhbG9nKTogT2JzZXJ2YWJsZTxDYXRhbG9nSXRlbVtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRDYXRhbG9nQ2FwYWJpbGl0aWVzKGNhdGFsb2cpLnBpcGUoXHJcbiAgICAgIG1hcCgoY2FwYWJpbGl0aWVzOiBhbnkpID0+IHtcclxuICAgICAgICBjb25zdCBpdGVtcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuaW5jbHVkZVJlY3Vyc2l2ZUl0ZW1zKFxyXG4gICAgICAgICAgY2F0YWxvZyxcclxuICAgICAgICAgIGNhcGFiaWxpdGllcy5DYXBhYmlsaXR5LkxheWVyLFxyXG4gICAgICAgICAgaXRlbXNcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiBpdGVtcztcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBsb2FkQ2F0YWxvZ1dNVFNMYXllckl0ZW1zKGNhdGFsb2c6IENhdGFsb2cpOiBPYnNlcnZhYmxlPENhdGFsb2dJdGVtW10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldENhdGFsb2dDYXBhYmlsaXRpZXMoY2F0YWxvZykucGlwZShcclxuICAgICAgbWFwKChjYXBhYmlsaXRpZXM6IGFueSkgPT4gdGhpcy5nZXRXTVRTSXRlbXMoY2F0YWxvZywgY2FwYWJpbGl0aWVzKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBsb2FkQ2F0YWxvZ0NvbXBvc2l0ZUxheWVySXRlbXMoY2F0YWxvZzogQ2F0YWxvZyk6IE9ic2VydmFibGU8Q2F0YWxvZ0l0ZW1bXT4ge1xyXG4gICAgY29uc3QgY29tcG9zaXRlQ2F0YWxvZyA9IChjYXRhbG9nIGFzIENvbXBvc2l0ZUNhdGFsb2cpLmNvbXBvc2l0ZTtcclxuXHJcbiAgICBjb25zdCBjYXRhbG9nc0Zyb21JbnN0YW5jZSA9IFtdIGFzIENhdGFsb2dbXTtcclxuICAgIGNvbXBvc2l0ZUNhdGFsb2cubWFwKChjb21wb25lbnQ6IENhdGFsb2cpID0+XHJcbiAgICAgIGNhdGFsb2dzRnJvbUluc3RhbmNlLnB1c2goXHJcbiAgICAgICAgQ2F0YWxvZ0ZhY3RvcnkuY3JlYXRlSW5zdGFuY2VDYXRhbG9nKGNvbXBvbmVudCwgdGhpcylcclxuICAgICAgKVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBnZXQgQ2F0YWxvZ0l0ZW1zIGZvciBlYWNoIG9yaWdpbmFsIENhdGFsb2ctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgY29uc3QgcmVxdWVzdDEkID0gW107XHJcbiAgICBjYXRhbG9nc0Zyb21JbnN0YW5jZS5tYXAoKGNvbXBvbmVudDogQ2F0YWxvZykgPT5cclxuICAgICAgcmVxdWVzdDEkLnB1c2goY29tcG9uZW50LmNvbGxlY3RDYXRhbG9nSXRlbXMoKSlcclxuICAgICk7XHJcblxyXG4gICAgLy8gaW50ZWdyYXRlIGltcG9zZWQgZ3JvdXAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIGxldCByZXF1ZXN0MiQgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBmbGF0RGVlcExheWVyKGFycikge1xyXG4gICAgICByZXR1cm4gYXJyLnJlZHVjZShcclxuICAgICAgICAoYWNjLCB2YWwpID0+XHJcbiAgICAgICAgICBhY2MuY29uY2F0KFxyXG4gICAgICAgICAgICB2YWwudHlwZSA9PT0gQ2F0YWxvZ0l0ZW1UeXBlLkdyb3VwID8gZmxhdERlZXBMYXllcih2YWwuaXRlbXMpIDogdmFsXHJcbiAgICAgICAgICApLFxyXG4gICAgICAgIFtdXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBPYmplY3Qua2V5cyhjb21wb3NpdGVDYXRhbG9nKS5maW5kKGsgPT4gY29tcG9zaXRlQ2F0YWxvZ1trXS5ncm91cEltcG9zZSlcclxuICAgICkge1xyXG4gICAgICBjb25zdCBwdXNoSW1wb3NlR3JvdXAgPSAoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICBjb25zdCBjID0gY2F0YWxvZ3NGcm9tSW5zdGFuY2VbaW5kZXhdO1xyXG4gICAgICAgIGNvbnN0IG91dEdyb3VwSW1wb3NlID0gT2JqZWN0LmFzc2lnbih7fSwgYy5ncm91cEltcG9zZSk7XHJcbiAgICAgICAgb3V0R3JvdXBJbXBvc2UuYWRkcmVzcyA9IGMuaWQ7XHJcbiAgICAgICAgb3V0R3JvdXBJbXBvc2UudHlwZSA9IENhdGFsb2dJdGVtVHlwZS5Hcm91cDtcclxuICAgICAgICBvdXRHcm91cEltcG9zZS5pdGVtcyA9IFtdO1xyXG5cclxuICAgICAgICBjb25zdCBmbGF0TGF5ZXIgPSBmbGF0RGVlcExheWVyKGl0ZW0pO1xyXG4gICAgICAgIGZsYXRMYXllci5tYXAoXHJcbiAgICAgICAgICB2ID0+ICh2LmFkZHJlc3MgPSBgJHtvdXRHcm91cEltcG9zZS5hZGRyZXNzfS4ke291dEdyb3VwSW1wb3NlLmlkfWApXHJcbiAgICAgICAgKTtcclxuICAgICAgICBvdXRHcm91cEltcG9zZS5pdGVtcyA9IGZsYXRMYXllcjtcclxuXHJcbiAgICAgICAgcmV0dXJuIG91dEdyb3VwSW1wb3NlO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgcmVxdWVzdDIkID0gcmVxdWVzdDEkLm1hcCgob2JzLCBpZHgpID0+XHJcbiAgICAgICAgb2JzLnBpcGUoXHJcbiAgICAgICAgICBtYXAoaXRlbXMgPT5cclxuICAgICAgICAgICAgY29tcG9zaXRlQ2F0YWxvZ1tpZHhdLmdyb3VwSW1wb3NlXHJcbiAgICAgICAgICAgICAgPyBwdXNoSW1wb3NlR3JvdXAoaXRlbXMsIGlkeClcclxuICAgICAgICAgICAgICA6IGl0ZW1zXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVxdWVzdDIkID0gcmVxdWVzdDEkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbmNhdCBHcm91cCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgY29uc3QgcmVxdWVzdDMkID0gemlwKC4uLnJlcXVlc3QyJCkucGlwZShcclxuICAgICAgbWFwKFxyXG4gICAgICAgIChvdXRwdXQ6IENhdGFsb2dJdGVtW10pID0+IFtdLmNvbmNhdCguLi5vdXRwdXQpIC8vIFtdLmNvbmNhdC5hcHBseShbXSwgcmVzdWx0MVxyXG4gICAgICApXHJcbiAgICApO1xyXG5cclxuICAgIC8vIG1lcmdlIEdyb3VwIChmaXJzdCBsZXZlbCBvbmx5KSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgY29uc3QgZ3JvdXBCeUdyb3VwSWQgPSAoZGF0YSwga2V5Rm4pID0+XHJcbiAgICAgIGRhdGEucmVkdWNlKChhY2MsIGdyb3VwKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZ3JvdXBJZCA9IGtleUZuKGdyb3VwKTtcclxuICAgICAgICBjb25zdCBpbmQgPSBhY2MuZmluZCh4ID0+IHguaWQgPT09IGdyb3VwSWQpO1xyXG5cclxuICAgICAgICBpZiAoIWluZCkge1xyXG4gICAgICAgICAgYWNjW2FjYy5sZW5ndGhdID0gZ3JvdXA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IGl4ID0gYWNjLmluZGV4T2YoaW5kKTtcclxuICAgICAgICAgIGlmIChhY2NbaXhdLmFkZHJlc3Muc3BsaXQoJ3wnKS5pbmRleE9mKGdyb3VwLmFkZHJlc3MpID09PSAtMSkge1xyXG4gICAgICAgICAgICBhY2NbaXhdLmFkZHJlc3MgPSBgJHthY2NbaXhdLmFkZHJlc3N9fCR7Z3JvdXAuYWRkcmVzc31gO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYWNjW2l4XS5pdGVtcy5wdXNoKC4uLmdyb3VwLml0ZW1zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFjYztcclxuICAgICAgfSwgW10pO1xyXG5cclxuICAgIC8vIG1lcmdlIExheWVyIGZvciBlYWNoIExldmVsIChjYXRhbG9nLCBncm91cChyZWN1cnNpdmUpKVxyXG4gICAgY29uc3QgcmVjdXJzaXZlR3JvdXBCeUxheWVyQWRkcmVzcyA9IChpdGVtcywga2V5Rm4pID0+XHJcbiAgICAgIGl0ZW1zLnJlZHVjZSgoYWNjLCBpdGVtLCBpZHgsIGFycikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxheWVyVGl0bGUgPSBrZXlGbihpdGVtKTtcclxuICAgICAgICBjb25zdCBvdXRJdGVtID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSk7XHJcblxyXG4gICAgICAgIGlmIChpdGVtLnR5cGUgPT09IENhdGFsb2dJdGVtVHlwZS5MYXllcikge1xyXG4gICAgICAgICAgLy8gc2FtZSB0aXRsZSwgc2FtZSBhZGRyZXNzID0+IHJlc3VsdDogb25seSBvbmUgaXRlbSBpcyBrZWVwXHJcblxyXG4gICAgICAgICAgLy8gc2FtZSB0aXRsZSwgYWRkcmVzcyBkaWZmXHJcbiAgICAgICAgICBjb25zdCBpbmRpY2VzTWF0Y2hUaXRsZSA9IFtdO1xyXG4gICAgICAgICAgY29uc3QgZGlmZkFkZHJlc3MgPSBhcnIuZmlsdGVyKCh4LCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBiSW5kID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh4LnRpdGxlID09PSBsYXllclRpdGxlICYmIHgudHlwZSA9PT0gQ2F0YWxvZ0l0ZW1UeXBlLkxheWVyKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGkgIT09IGlkeCAmJiB4LmFkZHJlc3MgIT09IGl0ZW0uYWRkcmVzcykge1xyXG4gICAgICAgICAgICAgICAgYkluZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGluZGljZXNNYXRjaFRpdGxlLnB1c2goaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGJJbmQ7XHJcbiAgICAgICAgICB9KTsgLy8gJCYgaSAhPT0gaWR4XHJcblxyXG4gICAgICAgICAgaWYgKGRpZmZBZGRyZXNzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3QgblBvc2l0aW9uID0gaW5kaWNlc01hdGNoVGl0bGUuZmluZEluZGV4KHggPT4geCA9PT0gaWR4KSArIDE7XHJcbiAgICAgICAgICAgIG91dEl0ZW0udGl0bGUgPSBgJHtpdGVtLnRpdGxlfSAoJHtuUG9zaXRpb259KWA7IC8vIHNvdXJjZTogJHtpdGVtLmFkZHJlc3Muc3BsaXQoJy4nKVswXX1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zdCBleGlzdCA9IGFjYy5maW5kKFxyXG4gICAgICAgICAgICB4ID0+IHgudGl0bGUgPT09IG91dEl0ZW0udGl0bGUgJiYgeC50eXBlID09PSBDYXRhbG9nSXRlbVR5cGUuTGF5ZXJcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBpZiAoIWV4aXN0KSB7XHJcbiAgICAgICAgICAgIGFjY1thY2MubGVuZ3RoXSA9IG91dEl0ZW07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09IENhdGFsb2dJdGVtVHlwZS5Hcm91cCkge1xyXG4gICAgICAgICAgb3V0SXRlbS5pdGVtcyA9IHJlY3Vyc2l2ZUdyb3VwQnlMYXllckFkZHJlc3MoXHJcbiAgICAgICAgICAgIGl0ZW0uaXRlbXMsXHJcbiAgICAgICAgICAgIGxheWVyID0+IGxheWVyLnRpdGxlXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgYWNjW2FjYy5sZW5ndGhdID0gb3V0SXRlbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgIH0sIFtdKTtcclxuXHJcbiAgICBjb25zdCByZXF1ZXN0NCQgPSByZXF1ZXN0MyQucGlwZShcclxuICAgICAgbWFwKG91dHB1dCA9PiBncm91cEJ5R3JvdXBJZChvdXRwdXQsIGdyb3VwID0+IGdyb3VwLmlkKSksXHJcbiAgICAgIG1hcChvdXRwdXQgPT4gW10uY29uY2F0KC4uLm91dHB1dCkpLFxyXG4gICAgICBtYXAoZGF0YSA9PiByZWN1cnNpdmVHcm91cEJ5TGF5ZXJBZGRyZXNzKGRhdGEsIGxheWVyID0+IGxheWVyLnRpdGxlKSlcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIHJlcXVlc3Q0JDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0Q2F0YWxvZ0NhcGFiaWxpdGllcyhjYXRhbG9nOiBDYXRhbG9nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IHNUeXBlOiBzdHJpbmcgPSBUeXBlQ2F0YWxvZ1tjYXRhbG9nLnR5cGUgYXMgc3RyaW5nXTtcclxuICAgIHJldHVybiB0aGlzLmNhcGFiaWxpdGllc1NlcnZpY2UuZ2V0Q2FwYWJpbGl0aWVzKFxyXG4gICAgICBUeXBlQ2FwYWJpbGl0aWVzW3NUeXBlXSxcclxuICAgICAgY2F0YWxvZy51cmwsXHJcbiAgICAgIGNhdGFsb2cudmVyc2lvblxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcHJlcGFyZUNhdGFsb2dJdGVtTGF5ZXIobGF5ZXIsIGlkUGFyZW50LCBsYXllcnNRdWVyeUZvcm1hdCwgY2F0YWxvZykge1xyXG4gICAgY29uc3QgY29uZmlndXJlZFF1ZXJ5Rm9ybWF0ID0gdGhpcy5yZXRyaXZlTGF5ZXJJbmZvRm9ybWF0KFxyXG4gICAgICBsYXllci5OYW1lLFxyXG4gICAgICBsYXllcnNRdWVyeUZvcm1hdFxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBtZXRhZGF0YSA9IGxheWVyLkRhdGFVUkwgPyBsYXllci5EYXRhVVJMWzBdIDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgbGVnZW5kT3B0aW9ucyA9XHJcbiAgICAgIGNhdGFsb2cuc2hvd0xlZ2VuZCAmJiBsYXllci5TdHlsZVxyXG4gICAgICAgID8gdGhpcy5jYXBhYmlsaXRpZXNTZXJ2aWNlLmdldFN0eWxlKGxheWVyLlN0eWxlKVxyXG4gICAgICAgIDogdW5kZWZpbmVkO1xyXG5cclxuICAgIGNvbnN0IHBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIGNhdGFsb2cucXVlcnlQYXJhbXMsIHtcclxuICAgICAgTEFZRVJTOiBsYXllci5OYW1lLFxyXG4gICAgICBWRVJTSU9OOiBjYXRhbG9nLnZlcnNpb25cclxuICAgIH0gYXMgV01TRGF0YVNvdXJjZU9wdGlvbnNQYXJhbXMpO1xyXG5cclxuICAgIGNvbnN0IGJhc2VTb3VyY2VPcHRpb25zID0ge1xyXG4gICAgICB0eXBlOiAnd21zJyxcclxuICAgICAgdXJsOiBjYXRhbG9nLnVybCxcclxuICAgICAgY3Jvc3NPcmlnaW46IGNhdGFsb2cuc2V0Q3Jvc3NPcmlnaW5Bbm9ueW1vdXMgPyAnYW5vbnltb3VzJyA6IHVuZGVmaW5lZCxcclxuICAgICAgcXVlcnlGb3JtYXQ6IGNvbmZpZ3VyZWRRdWVyeUZvcm1hdCxcclxuICAgICAgcXVlcnlIdG1sVGFyZ2V0OlxyXG4gICAgICAgIGNvbmZpZ3VyZWRRdWVyeUZvcm1hdCA9PT0gUXVlcnlGb3JtYXQuSFRNTCB8fFxyXG4gICAgICAgIGNvbmZpZ3VyZWRRdWVyeUZvcm1hdCA9PT0gUXVlcnlGb3JtYXQuSFRNTEdNTDJcclxuICAgICAgICAgID8gJ2lmcmFtZSdcclxuICAgICAgICAgIDogdW5kZWZpbmVkLFxyXG4gICAgICBvcHRpb25zRnJvbUNhcGFiaWxpdGllczogdHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBzb3VyY2VPcHRpb25zID0gT2JqZWN0LmFzc2lnbihcclxuICAgICAge30sXHJcbiAgICAgIGJhc2VTb3VyY2VPcHRpb25zLFxyXG4gICAgICBjYXRhbG9nLnNvdXJjZU9wdGlvbnMsXHJcbiAgICAgIHsgcGFyYW1zIH1cclxuICAgICkgYXMgV01TRGF0YVNvdXJjZU9wdGlvbnM7XHJcblxyXG4gICAgY29uc3QgbGF5ZXJQcmVwYXJlID0ge1xyXG4gICAgICBpZDogZ2VuZXJhdGVJZEZyb21Tb3VyY2VPcHRpb25zKHNvdXJjZU9wdGlvbnMpLFxyXG4gICAgICB0eXBlOiBDYXRhbG9nSXRlbVR5cGUuTGF5ZXIsXHJcbiAgICAgIHRpdGxlOiBsYXllci5UaXRsZSxcclxuICAgICAgYWRkcmVzczogaWRQYXJlbnQsXHJcbiAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICBtYXhSZXNvbHV0aW9uOiBnZXRSZXNvbHV0aW9uRnJvbVNjYWxlKGxheWVyLk1heFNjYWxlRGVub21pbmF0b3IpLFxyXG4gICAgICAgIG1pblJlc29sdXRpb246IGdldFJlc29sdXRpb25Gcm9tU2NhbGUobGF5ZXIuTWluU2NhbGVEZW5vbWluYXRvciksXHJcbiAgICAgICAgbWV0YWRhdGE6IHtcclxuICAgICAgICAgIHVybDogbWV0YWRhdGEgPyBtZXRhZGF0YS5PbmxpbmVSZXNvdXJjZSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgIGV4dGVybjogbWV0YWRhdGEgPyB0cnVlIDogdW5kZWZpbmVkXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsZWdlbmRPcHRpb25zLFxyXG4gICAgICAgIHRvb2x0aXA6IHsgdHlwZTogY2F0YWxvZy50b29sdGlwVHlwZSB9LFxyXG4gICAgICAgIHNvdXJjZU9wdGlvbnNcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gT2JqZWN0VXRpbHMucmVtb3ZlVW5kZWZpbmVkKGxheWVyUHJlcGFyZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHByZXBhcmVDYXRhbG9nSXRlbUdyb3VwKFxyXG4gICAgaXRlbUxpc3RJbixcclxuICAgIHJlZ2V4ZXMsXHJcbiAgICBpZEdyb3VwLFxyXG4gICAgbGF5ZXJzUXVlcnlGb3JtYXQsXHJcbiAgICBjYXRhbG9nXHJcbiAgKSB7XHJcbiAgICBjb25zdCBncm91cFByZXBhcmUgPSB7XHJcbiAgICAgIGlkOiBpZEdyb3VwLFxyXG4gICAgICB0eXBlOiBDYXRhbG9nSXRlbVR5cGUuR3JvdXAsXHJcbiAgICAgIHRpdGxlOiBpdGVtTGlzdEluLlRpdGxlLFxyXG4gICAgICBhZGRyZXNzOiBjYXRhbG9nLmlkLFxyXG4gICAgICBpdGVtczogaXRlbUxpc3RJbi5MYXllci5yZWR1Y2UoKGl0ZW1zOiBDYXRhbG9nSXRlbVtdLCBsYXllcjogYW55KSA9PiB7XHJcbiAgICAgICAgaWYgKGxheWVyLkxheWVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIC8vIHJlY3Vyc2l2ZSwgY2hlY2sgbmV4dCBsZXZlbFxyXG4gICAgICAgICAgY29uc3QgaWRHcm91cEl0ZW1OZXh0TGV2ZWwgPVxyXG4gICAgICAgICAgICBpZEdyb3VwICsgYC5ncm91cC4ke2xheWVyLk5hbWUgfHwgbGF5ZXIuTGF5ZXJbMF0uTmFtZX1gO1xyXG4gICAgICAgICAgY29uc3QgZ3JvdXBJdGVtOiBDYXRhbG9nSXRlbUdyb3VwID0gdGhpcy5wcmVwYXJlQ2F0YWxvZ0l0ZW1Hcm91cChcclxuICAgICAgICAgICAgbGF5ZXIsXHJcbiAgICAgICAgICAgIHJlZ2V4ZXMsXHJcbiAgICAgICAgICAgIGlkR3JvdXBJdGVtTmV4dExldmVsLFxyXG4gICAgICAgICAgICBsYXllcnNRdWVyeUZvcm1hdCxcclxuICAgICAgICAgICAgY2F0YWxvZ1xyXG4gICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICBpdGVtcy5wdXNoKGdyb3VwSXRlbSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlmICh0aGlzLnRlc3RMYXllclJlZ2V4ZXMobGF5ZXIuTmFtZSwgcmVnZXhlcykgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtcztcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zdCBsYXllckl0ZW06IENhdGFsb2dJdGVtTGF5ZXI8XHJcbiAgICAgICAgICAgIEltYWdlTGF5ZXJPcHRpb25zXHJcbiAgICAgICAgICA+ID0gdGhpcy5wcmVwYXJlQ2F0YWxvZ0l0ZW1MYXllcihcclxuICAgICAgICAgICAgbGF5ZXIsXHJcbiAgICAgICAgICAgIGlkR3JvdXAsXHJcbiAgICAgICAgICAgIGxheWVyc1F1ZXJ5Rm9ybWF0LFxyXG4gICAgICAgICAgICBjYXRhbG9nXHJcbiAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgIGl0ZW1zLnB1c2gobGF5ZXJJdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGl0ZW1zO1xyXG4gICAgICB9LCBbXSlcclxuICAgIH07XHJcbiAgICByZXR1cm4gZ3JvdXBQcmVwYXJlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbmNsdWRlUmVjdXJzaXZlSXRlbXMoXHJcbiAgICBjYXRhbG9nOiBDYXRhbG9nLFxyXG4gICAgaXRlbUxpc3RJbjogYW55LFxyXG4gICAgaXRlbXNQcmVwYXJlOiBDYXRhbG9nSXRlbVtdLFxyXG4gICAgbG9vcExldmVsOiBudW1iZXIgPSAwXHJcbiAgKSB7XHJcbiAgICAvLyBEaWcgYWxsIGxldmVscyB1bnRpbCBsYXN0IGxldmVsIChsYXllciBvYmplY3QgYXJlIG5vdCBkZWZpbmVkIG9uIGxhc3QgbGV2ZWwpXHJcbiAgICBjb25zdCByZWdleGVzID0gKGNhdGFsb2cucmVnRmlsdGVycyB8fCBbXSkubWFwKFxyXG4gICAgICAocGF0dGVybjogc3RyaW5nKSA9PiBuZXcgUmVnRXhwKHBhdHRlcm4pXHJcbiAgICApO1xyXG4gICAgaWYgKCFpdGVtTGlzdEluLkxheWVyKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbUxpc3RJbi5MYXllcikge1xyXG4gICAgICBpZiAoaXRlbS5MYXllciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgLy8gcmVjdXJzaXZlLCBjaGVjayBuZXh0IGxldmVsXHJcbiAgICAgICAgdGhpcy5pbmNsdWRlUmVjdXJzaXZlSXRlbXMoY2F0YWxvZywgaXRlbSwgaXRlbXNQcmVwYXJlLCBsb29wTGV2ZWwgKyAxKTtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgbGF5ZXJzUXVlcnlGb3JtYXQgPSB0aGlzLmZpbmRDYXRhbG9nSW5mb0Zvcm1hdChjYXRhbG9nKTtcclxuXHJcbiAgICAgIC8vIGdyb3VwKHdpdGggbGF5ZXJzKSBhbmQgbGF5ZXIod2l0aG91dCBncm91cCkgbGV2ZWwgMVxyXG4gICAgICBpZiAobG9vcExldmVsICE9PSAwKSB7XHJcbiAgICAgICAgLy8gVE9ETzogU2xpY2UgdGhhdCBpbnRvIG11bHRpcGxlIG1ldGhvZHNcclxuICAgICAgICAvLyBEZWZpbmUgb2JqZWN0IG9mIGdyb3VwIGxheWVyXHJcbiAgICAgICAgY29uc3QgaWRHcm91cEl0ZW0gPSBgY2F0YWxvZy5ncm91cC4ke2l0ZW1MaXN0SW4uTmFtZSB8fCBpdGVtLk5hbWV9YDtcclxuICAgICAgICBjb25zdCBncm91cEl0ZW0gPSB0aGlzLnByZXBhcmVDYXRhbG9nSXRlbUdyb3VwKFxyXG4gICAgICAgICAgaXRlbUxpc3RJbixcclxuICAgICAgICAgIHJlZ2V4ZXMsXHJcbiAgICAgICAgICBpZEdyb3VwSXRlbSxcclxuICAgICAgICAgIGxheWVyc1F1ZXJ5Rm9ybWF0LFxyXG4gICAgICAgICAgY2F0YWxvZ1xyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmIChncm91cEl0ZW0uaXRlbXMubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICBpdGVtc1ByZXBhcmUucHVzaChncm91cEl0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQnJlYWsgdGhlIGdyb3VwIChkb24ndCBhZGQgYSBncm91cCBvZiBsYXllciBmb3IgZWFjaCBvZiB0aGVpciBsYXllciEpXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gbGF5ZXIgd2l0aG91dCBncm91cFxyXG4gICAgICAgIGlmICh0aGlzLnRlc3RMYXllclJlZ2V4ZXMoaXRlbS5OYW1lLCByZWdleGVzKSAhPT0gZmFsc2UpIHtcclxuICAgICAgICAgIGNvbnN0IGxheWVySXRlbSA9IHRoaXMucHJlcGFyZUNhdGFsb2dJdGVtTGF5ZXIoXHJcbiAgICAgICAgICAgIGl0ZW0sXHJcbiAgICAgICAgICAgIGNhdGFsb2cuaWQsXHJcbiAgICAgICAgICAgIGxheWVyc1F1ZXJ5Rm9ybWF0LFxyXG4gICAgICAgICAgICBjYXRhbG9nXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgaXRlbXNQcmVwYXJlLnB1c2gobGF5ZXJJdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0V01UU0l0ZW1zKFxyXG4gICAgY2F0YWxvZzogQ2F0YWxvZyxcclxuICAgIGNhcGFiaWxpdGllczogeyBba2V5OiBzdHJpbmddOiBhbnkgfVxyXG4gICk6IENhdGFsb2dJdGVtTGF5ZXJbXSB7XHJcbiAgICBjb25zdCBsYXllcnMgPSBjYXBhYmlsaXRpZXMuQ29udGVudHMuTGF5ZXI7XHJcbiAgICBjb25zdCByZWdleGVzID0gKGNhdGFsb2cucmVnRmlsdGVycyB8fCBbXSkubWFwKFxyXG4gICAgICAocGF0dGVybjogc3RyaW5nKSA9PiBuZXcgUmVnRXhwKHBhdHRlcm4pXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiBsYXllcnNcclxuICAgICAgLm1hcCgobGF5ZXI6IGFueSkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnRlc3RMYXllclJlZ2V4ZXMobGF5ZXIuSWRlbnRpZmllciwgcmVnZXhlcykgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBjYXRhbG9nLnF1ZXJ5UGFyYW1zLCB7XHJcbiAgICAgICAgICB2ZXJzaW9uOiAnMS4wLjAnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgYmFzZVNvdXJjZU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICB0eXBlOiAnd210cycsXHJcbiAgICAgICAgICB1cmw6IGNhdGFsb2cudXJsLFxyXG4gICAgICAgICAgY3Jvc3NPcmlnaW46IGNhdGFsb2cuc2V0Q3Jvc3NPcmlnaW5Bbm9ueW1vdXNcclxuICAgICAgICAgICAgPyAnYW5vbnltb3VzJ1xyXG4gICAgICAgICAgICA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgIGxheWVyOiBsYXllci5JZGVudGlmaWVyLFxyXG4gICAgICAgICAgbWF0cml4U2V0OiBjYXRhbG9nLm1hdHJpeFNldCxcclxuICAgICAgICAgIG9wdGlvbnNGcm9tQ2FwYWJpbGl0aWVzOiB0cnVlLFxyXG4gICAgICAgICAgcmVxdWVzdEVuY29kaW5nOiBjYXRhbG9nLnJlcXVlc3RFbmNvZGluZyB8fCAnS1ZQJyxcclxuICAgICAgICAgIHN0eWxlOiAnZGVmYXVsdCdcclxuICAgICAgICB9IGFzIFdNVFNEYXRhU291cmNlT3B0aW9ucztcclxuICAgICAgICBjb25zdCBzb3VyY2VPcHRpb25zID0gT2JqZWN0LmFzc2lnbihcclxuICAgICAgICAgIHt9LFxyXG4gICAgICAgICAgYmFzZVNvdXJjZU9wdGlvbnMsXHJcbiAgICAgICAgICBjYXRhbG9nLnNvdXJjZU9wdGlvbnMsXHJcbiAgICAgICAgICB7IHBhcmFtcyB9XHJcbiAgICAgICAgKSBhcyBXTVRTRGF0YVNvdXJjZU9wdGlvbnM7XHJcblxyXG4gICAgICAgIHJldHVybiBPYmplY3RVdGlscy5yZW1vdmVVbmRlZmluZWQoe1xyXG4gICAgICAgICAgaWQ6IGdlbmVyYXRlSWRGcm9tU291cmNlT3B0aW9ucyhzb3VyY2VPcHRpb25zKSxcclxuICAgICAgICAgIHR5cGU6IENhdGFsb2dJdGVtVHlwZS5MYXllcixcclxuICAgICAgICAgIHRpdGxlOiBsYXllci5UaXRsZSxcclxuICAgICAgICAgIGFkZHJlc3M6IGNhdGFsb2cuaWQsXHJcbiAgICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgIHNvdXJjZU9wdGlvbnNcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSlcclxuICAgICAgLmZpbHRlcigoaXRlbTogQ2F0YWxvZ0l0ZW1MYXllciB8IHVuZGVmaW5lZCkgPT4gaXRlbSAhPT0gdW5kZWZpbmVkKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdGVzdExheWVyUmVnZXhlcyhsYXllck5hbWU6IHN0cmluZywgcmVnZXhlczogUmVnRXhwW10pOiBib29sZWFuIHtcclxuICAgIGlmIChyZWdleGVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiByZWdleGVzLmZpbmQoKHJlZ2V4OiBSZWdFeHApID0+IHJlZ2V4LnRlc3QobGF5ZXJOYW1lKSkgIT09IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmV0cml2ZUxheWVySW5mb0Zvcm1hdChcclxuICAgIGxheWVyTmFtZUZyb21DYXRhbG9nOiBzdHJpbmcsXHJcbiAgICBsYXllcnNRdWVyeUZvcm1hdDogeyBsYXllcjogc3RyaW5nOyBxdWVyeUZvcm1hdDogUXVlcnlGb3JtYXQgfVtdXHJcbiAgKTogUXVlcnlGb3JtYXQge1xyXG4gICAgY29uc3QgY3VycmVudExheWVySW5mb0Zvcm1hdCA9IGxheWVyc1F1ZXJ5Rm9ybWF0LmZpbmQoXHJcbiAgICAgIGYgPT4gZi5sYXllciA9PT0gbGF5ZXJOYW1lRnJvbUNhdGFsb2dcclxuICAgICk7XHJcbiAgICBjb25zdCBiYXNlSW5mb0Zvcm1hdCA9IGxheWVyc1F1ZXJ5Rm9ybWF0LmZpbmQoZiA9PiBmLmxheWVyID09PSAnKicpO1xyXG4gICAgbGV0IHF1ZXJ5Rm9ybWF0OiBRdWVyeUZvcm1hdDtcclxuICAgIGlmIChjdXJyZW50TGF5ZXJJbmZvRm9ybWF0KSB7XHJcbiAgICAgIHF1ZXJ5Rm9ybWF0ID0gY3VycmVudExheWVySW5mb0Zvcm1hdC5xdWVyeUZvcm1hdDtcclxuICAgIH0gZWxzZSBpZiAoYmFzZUluZm9Gb3JtYXQpIHtcclxuICAgICAgcXVlcnlGb3JtYXQgPSBiYXNlSW5mb0Zvcm1hdC5xdWVyeUZvcm1hdDtcclxuICAgIH1cclxuICAgIHJldHVybiBxdWVyeUZvcm1hdDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZmluZENhdGFsb2dJbmZvRm9ybWF0KFxyXG4gICAgY2F0YWxvZzogQ2F0YWxvZ1xyXG4gICk6IHsgbGF5ZXI6IHN0cmluZzsgcXVlcnlGb3JtYXQ6IFF1ZXJ5Rm9ybWF0IH1bXSB7XHJcbiAgICBjb25zdCBsYXllcnNRdWVyeUZvcm1hdDogeyBsYXllcjogc3RyaW5nOyBxdWVyeUZvcm1hdDogUXVlcnlGb3JtYXQgfVtdID0gW107XHJcbiAgICBpZiAoIWNhdGFsb2cucXVlcnlGb3JtYXQpIHtcclxuICAgICAgcmV0dXJuIGxheWVyc1F1ZXJ5Rm9ybWF0O1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmtleXMoY2F0YWxvZy5xdWVyeUZvcm1hdCkuZm9yRWFjaChjb25maWd1cmVkSW5mb0Zvcm1hdCA9PiB7XHJcbiAgICAgIGlmIChjYXRhbG9nLnF1ZXJ5Rm9ybWF0W2NvbmZpZ3VyZWRJbmZvRm9ybWF0XSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgY2F0YWxvZy5xdWVyeUZvcm1hdFtjb25maWd1cmVkSW5mb0Zvcm1hdF0uZm9yRWFjaChsYXllck5hbWUgPT4ge1xyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAhbGF5ZXJzUXVlcnlGb3JtYXQuZmluZChzcGVjaWZpYyA9PiBzcGVjaWZpYy5sYXllciA9PT0gbGF5ZXJOYW1lKVxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGxheWVyc1F1ZXJ5Rm9ybWF0LnB1c2goe1xyXG4gICAgICAgICAgICAgIGxheWVyOiBsYXllck5hbWUsXHJcbiAgICAgICAgICAgICAgcXVlcnlGb3JtYXQ6IGNvbmZpZ3VyZWRJbmZvRm9ybWF0IGFzIFF1ZXJ5Rm9ybWF0XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICFsYXllcnNRdWVyeUZvcm1hdC5maW5kKFxyXG4gICAgICAgICAgICBzcGVjaWZpYyA9PlxyXG4gICAgICAgICAgICAgIHNwZWNpZmljLmxheWVyID09PSBjYXRhbG9nLnF1ZXJ5Rm9ybWF0W2NvbmZpZ3VyZWRJbmZvRm9ybWF0XVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgbGF5ZXJzUXVlcnlGb3JtYXQucHVzaCh7XHJcbiAgICAgICAgICAgIGxheWVyOiBjYXRhbG9nLnF1ZXJ5Rm9ybWF0W2NvbmZpZ3VyZWRJbmZvRm9ybWF0XSxcclxuICAgICAgICAgICAgcXVlcnlGb3JtYXQ6IGNvbmZpZ3VyZWRJbmZvRm9ybWF0IGFzIFF1ZXJ5Rm9ybWF0XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGxheWVyc1F1ZXJ5Rm9ybWF0O1xyXG4gIH1cclxufVxyXG4iXX0=