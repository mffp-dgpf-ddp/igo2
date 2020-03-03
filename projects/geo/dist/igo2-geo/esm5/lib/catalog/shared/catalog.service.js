/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var CatalogService = /** @class */ (function () {
    function CatalogService(http, config, languageService, capabilitiesService) {
        this.http = http;
        this.config = config;
        this.languageService = languageService;
        this.capabilitiesService = capabilitiesService;
    }
    /**
     * @return {?}
     */
    CatalogService.prototype.loadCatalogs = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var contextConfig = this.config.getConfig('context') || {};
        /** @type {?} */
        var catalogConfig = this.config.getConfig('catalog') || {};
        /** @type {?} */
        var apiUrl = catalogConfig.url || contextConfig.url;
        /** @type {?} */
        var catalogsFromConfig = catalogConfig.sources || [];
        /** @type {?} */
        var observables$ = [];
        if (apiUrl) {
            // Base layers catalog
            if (catalogConfig.baseLayers) {
                /** @type {?} */
                var translate = this.languageService.translate;
                /** @type {?} */
                var title = translate.instant('igo.geo.catalog.baseLayers');
                /** @type {?} */
                var baseLayersCatalog = [
                    {
                        id: 'catalog.baselayers',
                        title: title,
                        url: apiUrl + "/baselayers",
                        type: 'baselayers'
                    }
                ];
                observables$.push(of(baseLayersCatalog));
            }
            // Catalogs from API
            /** @type {?} */
            var catalogsFromApi$ = this.http
                .get(apiUrl + "/catalogs")
                .pipe(map((/**
             * @param {?} catalogs
             * @return {?}
             */
            function (catalogs) { return catalogs.map((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return Object.assign(c, c.options); })); })), catchError((/**
             * @param {?} response
             * @return {?}
             */
            function (response) { return EMPTY; })));
            observables$.push(catalogsFromApi$);
        }
        // Catalogs from config
        if (catalogsFromConfig.length > 0) {
            observables$.push(of(catalogsFromConfig).pipe(map((/**
             * @param {?} catalogs
             * @return {?}
             */
            function (catalogs) {
                return catalogs.map((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) {
                    if (!c.id) {
                        c.id = uuid();
                    }
                    return c;
                }));
            }))));
        }
        return (/** @type {?} */ (zip.apply(void 0, tslib_1.__spread(observables$)).pipe(map((/**
         * @param {?} catalogs
         * @return {?}
         */
        function (catalogs) { return [].concat.apply([], catalogs); })))));
    };
    /**
     * @param {?} catalog
     * @return {?}
     */
    CatalogService.prototype.loadCatalogItems = /**
     * @param {?} catalog
     * @return {?}
     */
    function (catalog) {
        /** @type {?} */
        var newCatalog;
        newCatalog = CatalogFactory.createInstanceCatalog(catalog, this);
        return newCatalog.collectCatalogItems();
    };
    /**
     * @param {?} catalog
     * @return {?}
     */
    CatalogService.prototype.loadCatalogBaseLayerItems = /**
     * @param {?} catalog
     * @return {?}
     */
    function (catalog) {
        return this.getCatalogBaseLayersOptions(catalog).pipe(map((/**
         * @param {?} layersOptions
         * @return {?}
         */
        function (layersOptions) {
            /** @type {?} */
            var items = layersOptions.map((/**
             * @param {?} layerOptions
             * @return {?}
             */
            function (layerOptions) {
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
                    items: items
                }
            ];
        })));
    };
    /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    CatalogService.prototype.getCatalogBaseLayersOptions = /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    function (catalog) {
        return this.http.get(catalog.url);
    };
    /**
     * @param {?} catalog
     * @return {?}
     */
    CatalogService.prototype.loadCatalogWMSLayerItems = /**
     * @param {?} catalog
     * @return {?}
     */
    function (catalog) {
        var _this = this;
        return this.getCatalogCapabilities(catalog).pipe(map((/**
         * @param {?} capabilities
         * @return {?}
         */
        function (capabilities) {
            /** @type {?} */
            var items = [];
            _this.includeRecursiveItems(catalog, capabilities.Capability.Layer, items);
            return items;
        })));
    };
    /**
     * @param {?} catalog
     * @return {?}
     */
    CatalogService.prototype.loadCatalogWMTSLayerItems = /**
     * @param {?} catalog
     * @return {?}
     */
    function (catalog) {
        var _this = this;
        return this.getCatalogCapabilities(catalog).pipe(map((/**
         * @param {?} capabilities
         * @return {?}
         */
        function (capabilities) { return _this.getWMTSItems(catalog, capabilities); })));
    };
    /**
     * @param {?} catalog
     * @return {?}
     */
    CatalogService.prototype.loadCatalogCompositeLayerItems = /**
     * @param {?} catalog
     * @return {?}
     */
    function (catalog) {
        var _this = this;
        /** @type {?} */
        var compositeCatalog = ((/** @type {?} */ (catalog))).composite;
        /** @type {?} */
        var catalogsFromInstance = (/** @type {?} */ ([]));
        compositeCatalog.map((/**
         * @param {?} component
         * @return {?}
         */
        function (component) { return catalogsFromInstance.push(CatalogFactory.createInstanceCatalog(component, _this)); }));
        // get CatalogItems for each original Catalog-----------------------------------------------------
        /** @type {?} */
        var request1$ = [];
        catalogsFromInstance.map((/**
         * @param {?} component
         * @return {?}
         */
        function (component) { return request1$.push(component.collectCatalogItems()); }));
        // integrate imposed group -----------------------------------------------------
        /** @type {?} */
        var request2$ = [];
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
            function (acc, val) { return acc.concat(val.type === CatalogItemType.Group ? flatDeepLayer(val.items) : val); }), []);
        }
        if (Object.keys(compositeCatalog).find((/**
         * @param {?} k
         * @return {?}
         */
        function (k) { return compositeCatalog[k].groupImpose; }))) {
            /** @type {?} */
            var pushImposeGroup_1 = (/**
             * @param {?} item
             * @param {?} index
             * @return {?}
             */
            function (item, index) {
                /** @type {?} */
                var c = catalogsFromInstance[index];
                /** @type {?} */
                var outGroupImpose = Object.assign({}, c.groupImpose);
                outGroupImpose.address = c.id;
                outGroupImpose.type = CatalogItemType.Group;
                outGroupImpose.items = [];
                /** @type {?} */
                var flatLayer = flatDeepLayer(item);
                flatLayer.map((/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) { return v.address = outGroupImpose.address + "." + outGroupImpose.id; }));
                outGroupImpose.items = flatLayer;
                return outGroupImpose;
            });
            request2$ = request1$.map((/**
             * @param {?} obs
             * @param {?} idx
             * @return {?}
             */
            function (obs, idx) { return obs.pipe(map((/**
             * @param {?} items
             * @return {?}
             */
            function (items) { return compositeCatalog[idx].groupImpose ? pushImposeGroup_1(items, idx) : items; }))); }));
        }
        else {
            request2$ = request1$;
        }
        // concat Group -----------------------------------------------------
        /** @type {?} */
        var request3$ = zip.apply(void 0, tslib_1.__spread(request2$)).pipe(map((/**
         * @param {?} output
         * @return {?}
         */
        function (output) { return [].concat.apply([], tslib_1.__spread(output)); } // [].concat.apply([], result1
        )));
        // merge Group (first level only) -----------------------------------------------------
        /** @type {?} */
        var groupByGroupId = (/**
         * @param {?} data
         * @param {?} keyFn
         * @return {?}
         */
        function (data, keyFn) { return data.reduce((/**
         * @param {?} acc
         * @param {?} group
         * @return {?}
         */
        function (acc, group) {
            var _a;
            /** @type {?} */
            var groupId = keyFn(group);
            /** @type {?} */
            var ind = acc.find((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return x.id === groupId; }));
            if (!ind) {
                acc[acc.length] = group;
            }
            else {
                /** @type {?} */
                var ix = acc.indexOf(ind);
                if (acc[ix].address.split('|').indexOf(group.address) === -1) {
                    acc[ix].address = acc[ix].address + "|" + group.address;
                }
                (_a = acc[ix].items).push.apply(_a, tslib_1.__spread(group.items));
            }
            return acc;
        }), []); });
        // merge Layer for each Level (catalog, group(recursive))
        /** @type {?} */
        var recursiveGroupByLayerAddress = (/**
         * @param {?} items
         * @param {?} keyFn
         * @return {?}
         */
        function (items, keyFn) { return items.reduce((/**
         * @param {?} acc
         * @param {?} item
         * @param {?} idx
         * @param {?} arr
         * @return {?}
         */
        function (acc, item, idx, arr) {
            /** @type {?} */
            var layerTitle = keyFn(item);
            /** @type {?} */
            var outItem = Object.assign({}, item);
            if (item.type === CatalogItemType.Layer) {
                // same title, same address => result: only one item is keep
                // same title, address diff
                /** @type {?} */
                var indicesMatchTitle_1 = [];
                /** @type {?} */
                var diffAddress = arr.filter((/**
                 * @param {?} x
                 * @param {?} i
                 * @return {?}
                 */
                function (x, i) {
                    /** @type {?} */
                    var bInd = false;
                    if (x.title === layerTitle && x.type === CatalogItemType.Layer) {
                        if (i !== idx && x.address !== item.address) {
                            bInd = true;
                        }
                        indicesMatchTitle_1.push(i);
                    }
                    return bInd;
                }));
                if (diffAddress.length > 0) {
                    /** @type {?} */
                    var nPosition = indicesMatchTitle_1.findIndex((/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return x === idx; })) + 1;
                    outItem.title = item.title + " (" + nPosition + ")"; // source: ${item.address.split('.')[0]}
                }
                /** @type {?} */
                var exist = acc.find((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return x.title === outItem.title && x.type === CatalogItemType.Layer; }));
                if (!exist) {
                    acc[acc.length] = outItem;
                }
            }
            else if (item.type === CatalogItemType.Group) {
                outItem.items = recursiveGroupByLayerAddress(item.items, (/**
                 * @param {?} layer
                 * @return {?}
                 */
                function (layer) { return layer.title; }));
                acc[acc.length] = outItem;
            }
            return acc;
        }), []); });
        /** @type {?} */
        var request4$ = request3$.pipe(map((/**
         * @param {?} output
         * @return {?}
         */
        function (output) { return groupByGroupId(output, (/**
         * @param {?} group
         * @return {?}
         */
        function (group) { return group.id; })); })), map((/**
         * @param {?} output
         * @return {?}
         */
        function (output) { return [].concat.apply([], tslib_1.__spread(output)); })), map((/**
         * @param {?} data
         * @return {?}
         */
        function (data) { return recursiveGroupByLayerAddress(data, (/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) { return layer.title; })); })));
        return request4$;
    };
    /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    CatalogService.prototype.getCatalogCapabilities = /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    function (catalog) {
        /** @type {?} */
        var sType = TypeCatalog[(/** @type {?} */ (catalog.type))];
        return this.capabilitiesService.getCapabilities(TypeCapabilities[sType], catalog.url, catalog.version);
    };
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
    CatalogService.prototype.prepareCatalogItemLayer = /**
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
    function (layer, idParent, layersQueryFormat, catalog, catalogQueryParams, catalogSourceOptions, catalogTooltipType) {
        /** @type {?} */
        var configuredQueryFormat = this.retriveLayerInfoFormat(layer.Name, layersQueryFormat);
        /** @type {?} */
        var metadata = layer.DataURL ? layer.DataURL[0] : undefined;
        /** @type {?} */
        var abstract = layer.Abstract ? layer.Abstract : undefined;
        /** @type {?} */
        var keywordList = layer.KeywordList
            ? layer.KeywordList
            : undefined;
        /** @type {?} */
        var timeFilter = this.capabilitiesService.getTimeFilter(layer);
        /** @type {?} */
        var timeFilterable = timeFilter && Object.keys(timeFilter).length > 0 ? true : false;
        /** @type {?} */
        var legendOptions = layer.Style
            ? this.capabilitiesService.getStyle(layer.Style)
            : undefined;
        /** @type {?} */
        var params = Object.assign({}, catalogQueryParams, (/** @type {?} */ ({
            LAYERS: layer.Name,
            FEATURE_COUNT: catalog.count,
            VERSION: catalog.version || '1.3.0'
        })));
        /** @type {?} */
        var baseSourceOptions = {
            type: 'wms',
            url: catalog.url,
            crossOrigin: catalog.setCrossOriginAnonymous
                ? 'anonymous'
                : undefined,
            timeFilter: tslib_1.__assign({}, timeFilter, catalog.timeFilter),
            timeFilterable: timeFilterable ? true : false,
            queryable: layer.queryable,
            queryFormat: configuredQueryFormat,
            queryHtmlTarget: catalog.queryHtmlTarget || QueryHtmlTarget.IFRAME
        };
        /** @type {?} */
        var sourceOptions = (/** @type {?} */ (Object.assign({}, baseSourceOptions, catalogSourceOptions, { params: params })));
        /** @type {?} */
        var layerPrepare = {
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
                    abstract: abstract,
                    keywordList: keywordList
                },
                legendOptions: legendOptions,
                tooltip: (/** @type {?} */ ({ type: catalogTooltipType })),
                sourceOptions: sourceOptions
            }
        };
        return layerPrepare;
    };
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
    CatalogService.prototype.prepareCatalogItemGroup = /**
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
    function (itemListIn, regexes, idGroup, layersQueryFormat, catalog, catalogQueryParams, catalogSourceOptions, catalogTooltipType) {
        var _this = this;
        /** @type {?} */
        var groupPrepare = {
            id: idGroup,
            type: CatalogItemType.Group,
            title: itemListIn.Title,
            address: catalog.id,
            items: itemListIn.Layer.reduce((/**
             * @param {?} items
             * @param {?} layer
             * @return {?}
             */
            function (items, layer) {
                if (layer.Layer !== undefined) {
                    // recursive, check next level
                    /** @type {?} */
                    var idGroupItemNextLevel = idGroup + (".group." + (layer.Name || layer.Layer[0].Name));
                    /** @type {?} */
                    var groupItem = _this.prepareCatalogItemGroup(layer, regexes, idGroupItemNextLevel, layersQueryFormat, catalog, catalogQueryParams, catalogSourceOptions, catalogTooltipType);
                    items.push(groupItem);
                }
                else {
                    if (_this.testLayerRegexes(layer.Name, regexes) === false) {
                        return items;
                    }
                    /** @type {?} */
                    var layerItem = _this.prepareCatalogItemLayer(layer, idGroup, layersQueryFormat, catalog, catalogQueryParams, catalogSourceOptions, catalogTooltipType);
                    items.push(layerItem);
                }
                return items;
            }), [])
        };
        return groupPrepare;
    };
    /**
     * @private
     * @param {?} catalog
     * @param {?} itemListIn
     * @param {?} itemsPrepare
     * @param {?=} loopLevel
     * @return {?}
     */
    CatalogService.prototype.includeRecursiveItems = /**
     * @private
     * @param {?} catalog
     * @param {?} itemListIn
     * @param {?} itemsPrepare
     * @param {?=} loopLevel
     * @return {?}
     */
    function (catalog, itemListIn, itemsPrepare, loopLevel) {
        if (loopLevel === void 0) { loopLevel = 0; }
        var e_1, _a;
        // Dig all levels until last level (layer object are not defined on last level)
        /** @type {?} */
        var regexes = (catalog.regFilters || []).map((/**
         * @param {?} pattern
         * @return {?}
         */
        function (pattern) { return new RegExp(pattern); }));
        /** @type {?} */
        var catalogQueryParams = catalog.queryParams || {};
        /** @type {?} */
        var catalogSourceOptions = catalog.sourceOptions || {};
        if (!itemListIn.Layer) {
            return;
        }
        try {
            for (var _b = tslib_1.__values(itemListIn.Layer), _c = _b.next(); !_c.done; _c = _b.next()) {
                var item = _c.value;
                if (item.Layer !== undefined) {
                    // recursive, check next level
                    this.includeRecursiveItems(catalog, item, itemsPrepare, loopLevel + 1);
                    continue;
                }
                /** @type {?} */
                var catalogTooltipType = this.retrieveTooltipType(catalog);
                /** @type {?} */
                var layersQueryFormat = this.findCatalogInfoFormat(catalog);
                // group(with layers) and layer(without group) level 1
                if (loopLevel !== 0) {
                    // TODO: Slice that into multiple methods
                    // Define object of group layer
                    /** @type {?} */
                    var idGroupItem = "catalog.group." + (itemListIn.Name || item.Name);
                    /** @type {?} */
                    var groupItem = this.prepareCatalogItemGroup(itemListIn, regexes, idGroupItem, layersQueryFormat, catalog, catalogQueryParams, catalogSourceOptions, catalogTooltipType);
                    if (groupItem.items.length !== 0) {
                        itemsPrepare.push(groupItem);
                    }
                    // Break the group (don't add a group of layer for each of their layer!)
                    break;
                }
                else {
                    // layer without group
                    /** @type {?} */
                    var layerItem = this.prepareCatalogItemLayer(item, catalog.id, layersQueryFormat, catalog, catalogQueryParams, catalogSourceOptions, catalogTooltipType);
                    itemsPrepare.push(layerItem);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * @private
     * @param {?} catalog
     * @param {?} capabilities
     * @return {?}
     */
    CatalogService.prototype.getWMTSItems = /**
     * @private
     * @param {?} catalog
     * @param {?} capabilities
     * @return {?}
     */
    function (catalog, capabilities) {
        var _this = this;
        /** @type {?} */
        var layers = capabilities.Contents.Layer;
        /** @type {?} */
        var regexes = (catalog.regFilters || []).map((/**
         * @param {?} pattern
         * @return {?}
         */
        function (pattern) { return new RegExp(pattern); }));
        /** @type {?} */
        var catalogQueryParams = catalog.queryParams || {};
        /** @type {?} */
        var catalogSourceOptions = catalog.sourceOptions || {};
        return layers
            .map((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) {
            if (_this.testLayerRegexes(layer.Identifier, regexes) === false) {
                return undefined;
            }
            /** @type {?} */
            var params = Object.assign({}, catalogQueryParams, {
                version: '1.0.0'
            });
            /** @type {?} */
            var baseSourceOptions = (/** @type {?} */ ({
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
            var sourceOptions = (/** @type {?} */ (Object.assign({}, baseSourceOptions, catalogSourceOptions, { params: params })));
            return {
                id: generateIdFromSourceOptions(sourceOptions),
                type: CatalogItemType.Layer,
                title: layer.Title,
                address: catalog.id,
                options: {
                    title: layer.Title,
                    sourceOptions: sourceOptions,
                    maxResolution: Infinity,
                    minResolution: 0
                }
            };
        }))
            .filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item !== undefined; }));
    };
    /**
     * @private
     * @param {?} layerName
     * @param {?} regexes
     * @return {?}
     */
    CatalogService.prototype.testLayerRegexes = /**
     * @private
     * @param {?} layerName
     * @param {?} regexes
     * @return {?}
     */
    function (layerName, regexes) {
        if (regexes.length === 0) {
            return true;
        }
        return regexes.find((/**
         * @param {?} regex
         * @return {?}
         */
        function (regex) { return regex.test(layerName); })) !== undefined;
    };
    /**
     * @private
     * @param {?} layerNameFromCatalog
     * @param {?} layersQueryFormat
     * @return {?}
     */
    CatalogService.prototype.retriveLayerInfoFormat = /**
     * @private
     * @param {?} layerNameFromCatalog
     * @param {?} layersQueryFormat
     * @return {?}
     */
    function (layerNameFromCatalog, layersQueryFormat) {
        /** @type {?} */
        var currentLayerInfoFormat = layersQueryFormat.find((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return f.layer === layerNameFromCatalog; }));
        /** @type {?} */
        var baseInfoFormat = layersQueryFormat.find((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return f.layer === '*'; }));
        /** @type {?} */
        var queryFormat;
        if (currentLayerInfoFormat) {
            queryFormat = currentLayerInfoFormat.queryFormat;
        }
        else if (baseInfoFormat) {
            queryFormat = baseInfoFormat.queryFormat;
        }
        return queryFormat;
    };
    /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    CatalogService.prototype.retrieveTooltipType = /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    function (catalog) {
        if (!catalog.tooltipType) {
            return TooltipType.TITLE;
        }
        return catalog.tooltipType;
    };
    /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    CatalogService.prototype.findCatalogInfoFormat = /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    function (catalog) {
        /** @type {?} */
        var layersQueryFormat = [];
        if (!catalog.queryFormat) {
            return layersQueryFormat;
        }
        Object.keys(catalog.queryFormat).forEach((/**
         * @param {?} configuredInfoFormat
         * @return {?}
         */
        function (configuredInfoFormat) {
            if (catalog.queryFormat[configuredInfoFormat] instanceof Array) {
                catalog.queryFormat[configuredInfoFormat].forEach((/**
                 * @param {?} layerName
                 * @return {?}
                 */
                function (layerName) {
                    if (!layersQueryFormat.find((/**
                     * @param {?} specific
                     * @return {?}
                     */
                    function (specific) { return specific.layer === layerName; }))) {
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
                function (specific) {
                    return specific.layer === catalog.queryFormat[configuredInfoFormat];
                }))) {
                    layersQueryFormat.push({
                        layer: catalog.queryFormat[configuredInfoFormat],
                        queryFormat: (/** @type {?} */ (configuredInfoFormat))
                    });
                }
            }
        }));
        return layersQueryFormat;
    };
    CatalogService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    CatalogService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: ConfigService },
        { type: LanguageService },
        { type: CapabilitiesService }
    ]; };
    /** @nocollapse */ CatalogService.ngInjectableDef = i0.defineInjectable({ factory: function CatalogService_Factory() { return new CatalogService(i0.inject(i1.HttpClient), i0.inject(i2.ConfigService), i0.inject(i2.LanguageService), i0.inject(i3.CapabilitiesService)); }, token: CatalogService, providedIn: "root" });
    return CatalogService;
}());
export { CatalogService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2NhdGFsb2cvc2hhcmVkL2NhdGFsb2cuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBcUIsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRSxPQUFPLEVBQUUsS0FBSyxFQUFjLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ25DLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzVELE9BQU8sRUFDTCxtQkFBbUIsRUFDbkIsZ0JBQWdCLEVBSWpCLE1BQU0sa0JBQWtCLENBQUM7QUFDMUIsT0FBTyxFQUlMLFdBQVcsRUFDWixNQUFNLGFBQWEsQ0FBQztBQUNyQixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFPbkQsT0FBTyxFQUVMLGNBQWMsRUFFZixNQUFNLG9CQUFvQixDQUFDO0FBQzVCLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGVBQWUsRUFBZSxNQUFNLGFBQWEsQ0FBQztBQUMzRCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxhQUFhLENBQUM7Ozs7O0FBRTFEO0lBSUUsd0JBQ1UsSUFBZ0IsRUFDaEIsTUFBcUIsRUFDckIsZUFBZ0MsRUFDaEMsbUJBQXdDO1FBSHhDLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUNyQixvQkFBZSxHQUFmLGVB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QUFDLFVBQUEsU0FBUztvQkFDekQsSUFDRSxDQUFDLGlCQUFpQixDQUFDLElBQUk7Ozs7b0JBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBNUIsQ0FBNEIsRUFBQyxFQUNqRTt3QkFDQSxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7NEJBQ3JCLEtBQUssRUFBRSxTQUFTOzRCQUNoQixXQUFXLEVBQUUsbUJBQUEsb0JBQW9CLEVBQWU7eUJBQ2pELENBQUMsQ0FBQztxQkFDSjtnQkFDSCxDQUFDLEVBQUMsQ0FBQzthQUNKO2lCQUFNO2dCQUNMLElBQ0UsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJOzs7O2dCQUNyQixVQUFBLFFBQVE7b0JBQ04sT0FBQSxRQUFRLENBQUMsS0FBSyxLQUFLLE9BQU8sQ0FBQyxXQUFXLENBQUMsb0JBQW9CLENBQUM7Z0JBQTVELENBQTRELEVBQy9ELEVBQ0Q7b0JBQ0EsaUJBQWlCLENBQUMsSUFBSSxDQUFDO3dCQUNyQixLQUFLLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQzt3QkFDaEQsV0FBVyxFQUFFLG1CQUFBLG9CQUFvQixFQUFlO3FCQUNqRCxDQUFDLENBQUM7aUJBQ0o7YUFDRjtRQUNILENBQUMsRUFBQyxDQUFDO1FBQ0gsT0FBTyxpQkFBaUIsQ0FBQztJQUMzQixDQUFDOztnQkE1Z0JGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBckNRLFVBQVU7Z0JBS08sYUFBYTtnQkFBOUIsZUFBZTtnQkFFdEIsbUJBQW1COzs7eUJBUnJCO0NBaWpCQyxBQTdnQkQsSUE2Z0JDO1NBMWdCWSxjQUFjOzs7Ozs7SUFFdkIsOEJBQXdCOzs7OztJQUN4QixnQ0FBNkI7Ozs7O0lBQzdCLHlDQUF3Qzs7Ozs7SUFDeEMsNkNBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgRU1QVFksIE9ic2VydmFibGUsIG9mLCB6aXAgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwLCBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgdXVpZCB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuaW1wb3J0IHsgTGFuZ3VhZ2VTZXJ2aWNlLCBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQ2FwYWJpbGl0aWVzU2VydmljZSxcclxuICBUeXBlQ2FwYWJpbGl0aWVzLFxyXG4gIFdNU0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gIFdNVFNEYXRhU291cmNlT3B0aW9ucyxcclxuICBXTVNEYXRhU291cmNlT3B0aW9uc1BhcmFtc1xyXG59IGZyb20gJy4uLy4uL2RhdGFzb3VyY2UnO1xyXG5pbXBvcnQge1xyXG4gIExheWVyT3B0aW9ucyxcclxuICBJbWFnZUxheWVyT3B0aW9ucyxcclxuICBUb29sdGlwQ29udGVudCxcclxuICBUb29sdGlwVHlwZVxyXG59IGZyb20gJy4uLy4uL2xheWVyJztcclxuaW1wb3J0IHsgZ2V0UmVzb2x1dGlvbkZyb21TY2FsZSB9IGZyb20gJy4uLy4uL21hcCc7XHJcblxyXG5pbXBvcnQge1xyXG4gIENhdGFsb2dJdGVtLFxyXG4gIENhdGFsb2dJdGVtTGF5ZXIsXHJcbiAgQ2F0YWxvZ0l0ZW1Hcm91cFxyXG59IGZyb20gJy4vY2F0YWxvZy5pbnRlcmZhY2UnO1xyXG5pbXBvcnQge1xyXG4gIENhdGFsb2csXHJcbiAgQ2F0YWxvZ0ZhY3RvcnksXHJcbiAgQ29tcG9zaXRlQ2F0YWxvZ1xyXG59IGZyb20gJy4vY2F0YWxvZy5hYnN0cmFjdCc7XHJcbmltcG9ydCB7IENhdGFsb2dJdGVtVHlwZSwgVHlwZUNhdGFsb2cgfSBmcm9tICcuL2NhdGFsb2cuZW51bSc7XHJcbmltcG9ydCB7IFF1ZXJ5SHRtbFRhcmdldCwgUXVlcnlGb3JtYXQgfSBmcm9tICcuLi8uLi9xdWVyeSc7XHJcbmltcG9ydCB7IGdlbmVyYXRlSWRGcm9tU291cmNlT3B0aW9ucyB9IGZyb20gJy4uLy4uL3V0aWxzJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIENhdGFsb2dTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgY2FwYWJpbGl0aWVzU2VydmljZTogQ2FwYWJpbGl0aWVzU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgbG9hZENhdGFsb2dzKCk6IE9ic2VydmFibGU8Q2F0YWxvZ1tdPiB7XHJcbiAgICBjb25zdCBjb250ZXh0Q29uZmlnID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdjb250ZXh0JykgfHwge307XHJcbiAgICBjb25zdCBjYXRhbG9nQ29uZmlnID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdjYXRhbG9nJykgfHwge307XHJcbiAgICBjb25zdCBhcGlVcmwgPSBjYXRhbG9nQ29uZmlnLnVybCB8fCBjb250ZXh0Q29uZmlnLnVybDtcclxuICAgIGNvbnN0IGNhdGFsb2dzRnJvbUNvbmZpZyA9IGNhdGFsb2dDb25maWcuc291cmNlcyB8fCBbXTtcclxuXHJcbiAgICBjb25zdCBvYnNlcnZhYmxlcyQgPSBbXTtcclxuXHJcbiAgICBpZiAoYXBpVXJsKSB7XHJcbiAgICAgIC8vIEJhc2UgbGF5ZXJzIGNhdGFsb2dcclxuICAgICAgaWYgKGNhdGFsb2dDb25maWcuYmFzZUxheWVycykge1xyXG4gICAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmNhdGFsb2cuYmFzZUxheWVycycpO1xyXG4gICAgICAgIGNvbnN0IGJhc2VMYXllcnNDYXRhbG9nID0gW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBpZDogJ2NhdGFsb2cuYmFzZWxheWVycycsXHJcbiAgICAgICAgICAgIHRpdGxlLFxyXG4gICAgICAgICAgICB1cmw6IGAke2FwaVVybH0vYmFzZWxheWVyc2AsXHJcbiAgICAgICAgICAgIHR5cGU6ICdiYXNlbGF5ZXJzJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgb2JzZXJ2YWJsZXMkLnB1c2gob2YoYmFzZUxheWVyc0NhdGFsb2cpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQ2F0YWxvZ3MgZnJvbSBBUElcclxuICAgICAgY29uc3QgY2F0YWxvZ3NGcm9tQXBpJCA9IHRoaXMuaHR0cFxyXG4gICAgICAgIC5nZXQ8Q2F0YWxvZ1tdPihgJHthcGlVcmx9L2NhdGFsb2dzYClcclxuICAgICAgICAucGlwZShcclxuICAgICAgICAgIG1hcChjYXRhbG9ncyA9PiBjYXRhbG9ncy5tYXAoKGM6IGFueSkgPT4gT2JqZWN0LmFzc2lnbihjLCBjLm9wdGlvbnMpKSksXHJcbiAgICAgICAgICBjYXRjaEVycm9yKChyZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2UpID0+IEVNUFRZKVxyXG4gICAgICAgICk7XHJcbiAgICAgIG9ic2VydmFibGVzJC5wdXNoKGNhdGFsb2dzRnJvbUFwaSQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENhdGFsb2dzIGZyb20gY29uZmlnXHJcbiAgICBpZiAoY2F0YWxvZ3NGcm9tQ29uZmlnLmxlbmd0aCA+IDApIHtcclxuICAgICAgb2JzZXJ2YWJsZXMkLnB1c2goXHJcbiAgICAgICAgb2YoY2F0YWxvZ3NGcm9tQ29uZmlnKS5waXBlKFxyXG4gICAgICAgICAgbWFwKChjYXRhbG9nczogQ2F0YWxvZ1tdKSA9PlxyXG4gICAgICAgICAgICBjYXRhbG9ncy5tYXAoYyA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKCFjLmlkKSB7XHJcbiAgICAgICAgICAgICAgICBjLmlkID0gdXVpZCgpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICByZXR1cm4gYztcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIClcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHppcCguLi5vYnNlcnZhYmxlcyQpLnBpcGUoXHJcbiAgICAgIG1hcCgoY2F0YWxvZ3M6IENhdGFsb2dbXVtdKSA9PiBbXS5jb25jYXQuYXBwbHkoW10sIGNhdGFsb2dzKSlcclxuICAgICkgYXMgT2JzZXJ2YWJsZTxDYXRhbG9nW10+O1xyXG4gIH1cclxuXHJcbiAgbG9hZENhdGFsb2dJdGVtcyhjYXRhbG9nOiBDYXRhbG9nKTogT2JzZXJ2YWJsZTxDYXRhbG9nSXRlbVtdPiB7XHJcbiAgICBsZXQgbmV3Q2F0YWxvZzogQ2F0YWxvZztcclxuICAgIG5ld0NhdGFsb2cgPSBDYXRhbG9nRmFjdG9yeS5jcmVhdGVJbnN0YW5jZUNhdGFsb2coY2F0YWxvZywgdGhpcyk7XHJcbiAgICByZXR1cm4gbmV3Q2F0YWxvZy5jb2xsZWN0Q2F0YWxvZ0l0ZW1zKCk7XHJcbiAgfVxyXG5cclxuICBsb2FkQ2F0YWxvZ0Jhc2VMYXllckl0ZW1zKFxyXG4gICAgY2F0YWxvZzogQ2F0YWxvZ1xyXG4gICk6IE9ic2VydmFibGU8Q2F0YWxvZ0l0ZW1Hcm91cFtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRDYXRhbG9nQmFzZUxheWVyc09wdGlvbnMoY2F0YWxvZykucGlwZShcclxuICAgICAgbWFwKChsYXllcnNPcHRpb25zOiBMYXllck9wdGlvbnNbXSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGl0ZW1zID0gbGF5ZXJzT3B0aW9ucy5tYXAoKGxheWVyT3B0aW9uczogTGF5ZXJPcHRpb25zKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpZDogZ2VuZXJhdGVJZEZyb21Tb3VyY2VPcHRpb25zKGxheWVyT3B0aW9ucy5zb3VyY2VPcHRpb25zKSxcclxuICAgICAgICAgICAgdGl0bGU6IGxheWVyT3B0aW9ucy50aXRsZSxcclxuICAgICAgICAgICAgdHlwZTogQ2F0YWxvZ0l0ZW1UeXBlLkxheWVyLFxyXG4gICAgICAgICAgICBvcHRpb25zOiBsYXllck9wdGlvbnNcclxuICAgICAgICAgIH0gYXMgQ2F0YWxvZ0l0ZW1MYXllcjtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBpZDogJ2NhdGFsb2cuZ3JvdXAuYmFzZWxheWVycycsXHJcbiAgICAgICAgICAgIHR5cGU6IENhdGFsb2dJdGVtVHlwZS5Hcm91cCxcclxuICAgICAgICAgICAgdGl0bGU6IGNhdGFsb2cudGl0bGUsXHJcbiAgICAgICAgICAgIGl0ZW1zXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldENhdGFsb2dCYXNlTGF5ZXJzT3B0aW9ucyhcclxuICAgIGNhdGFsb2c6IENhdGFsb2dcclxuICApOiBPYnNlcnZhYmxlPExheWVyT3B0aW9uc1tdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMYXllck9wdGlvbnNbXT4oY2F0YWxvZy51cmwpO1xyXG4gIH1cclxuXHJcbiAgbG9hZENhdGFsb2dXTVNMYXllckl0ZW1zKFxyXG4gICAgY2F0YWxvZzogQ2F0YWxvZ1xyXG4gICk6IE9ic2VydmFibGU8Q2F0YWxvZ0l0ZW1bXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2F0YWxvZ0NhcGFiaWxpdGllcyhjYXRhbG9nKS5waXBlKFxyXG4gICAgICBtYXAoKGNhcGFiaWxpdGllczogYW55KSA9PiB7XHJcbiAgICAgICAgY29uc3QgaXRlbXMgPSBbXTtcclxuICAgICAgICB0aGlzLmluY2x1ZGVSZWN1cnNpdmVJdGVtcyhcclxuICAgICAgICAgIGNhdGFsb2csXHJcbiAgICAgICAgICBjYXBhYmlsaXRpZXMuQ2FwYWJpbGl0eS5MYXllcixcclxuICAgICAgICAgIGl0ZW1zXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gaXRlbXM7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgbG9hZENhdGFsb2dXTVRTTGF5ZXJJdGVtcyhcclxuICAgIGNhdGFsb2c6IENhdGFsb2dcclxuICApOiBPYnNlcnZhYmxlPENhdGFsb2dJdGVtW10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldENhdGFsb2dDYXBhYmlsaXRpZXMoY2F0YWxvZykucGlwZShcclxuICAgICAgbWFwKChjYXBhYmlsaXRpZXM6IGFueSkgPT4gdGhpcy5nZXRXTVRTSXRlbXMoY2F0YWxvZywgY2FwYWJpbGl0aWVzKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBsb2FkQ2F0YWxvZ0NvbXBvc2l0ZUxheWVySXRlbXMoXHJcbiAgICBjYXRhbG9nOiBDYXRhbG9nXHJcbiAgKTogT2JzZXJ2YWJsZTxDYXRhbG9nSXRlbVtdPiB7XHJcblxyXG4gICAgY29uc3QgY29tcG9zaXRlQ2F0YWxvZyA9IChjYXRhbG9nIGFzIENvbXBvc2l0ZUNhdGFsb2cpLmNvbXBvc2l0ZTtcclxuXHJcbiAgICBjb25zdCBjYXRhbG9nc0Zyb21JbnN0YW5jZSA9IFtdIGFzIENhdGFsb2dbXTtcclxuICAgIGNvbXBvc2l0ZUNhdGFsb2cubWFwKChjb21wb25lbnQ6IENhdGFsb2cpID0+IGNhdGFsb2dzRnJvbUluc3RhbmNlLnB1c2goQ2F0YWxvZ0ZhY3RvcnkuY3JlYXRlSW5zdGFuY2VDYXRhbG9nKGNvbXBvbmVudCwgdGhpcykpKTtcclxuXHJcbiAgICAvLyBnZXQgQ2F0YWxvZ0l0ZW1zIGZvciBlYWNoIG9yaWdpbmFsIENhdGFsb2ctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgY29uc3QgcmVxdWVzdDEkID0gW107XHJcbiAgICBjYXRhbG9nc0Zyb21JbnN0YW5jZS5tYXAoKGNvbXBvbmVudDogQ2F0YWxvZykgPT4gcmVxdWVzdDEkLnB1c2goY29tcG9uZW50LmNvbGxlY3RDYXRhbG9nSXRlbXMoKSkpO1xyXG5cclxuICAgIC8vIGludGVncmF0ZSBpbXBvc2VkIGdyb3VwIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBsZXQgcmVxdWVzdDIkID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gZmxhdERlZXBMYXllcihhcnIpIHtcclxuICAgICAgcmV0dXJuIGFyci5yZWR1Y2UoKGFjYywgdmFsKSA9PiBhY2MuY29uY2F0KHZhbC50eXBlID09PSBDYXRhbG9nSXRlbVR5cGUuR3JvdXAgPyBmbGF0RGVlcExheWVyKHZhbC5pdGVtcykgOiB2YWwpLCBbXSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKE9iamVjdC5rZXlzKGNvbXBvc2l0ZUNhdGFsb2cpLmZpbmQoayA9PiBjb21wb3NpdGVDYXRhbG9nW2tdLmdyb3VwSW1wb3NlKSkge1xyXG4gICAgICBjb25zdCBwdXNoSW1wb3NlR3JvdXAgPSAoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICBjb25zdCBjID0gY2F0YWxvZ3NGcm9tSW5zdGFuY2VbaW5kZXhdO1xyXG4gICAgICAgIGNvbnN0IG91dEdyb3VwSW1wb3NlID0gT2JqZWN0LmFzc2lnbih7fSwgYy5ncm91cEltcG9zZSk7XHJcbiAgICAgICAgb3V0R3JvdXBJbXBvc2UuYWRkcmVzcyA9IGMuaWQ7XHJcbiAgICAgICAgb3V0R3JvdXBJbXBvc2UudHlwZSA9IENhdGFsb2dJdGVtVHlwZS5Hcm91cDtcclxuICAgICAgICBvdXRHcm91cEltcG9zZS5pdGVtcyA9IFtdO1xyXG5cclxuICAgICAgICBjb25zdCBmbGF0TGF5ZXIgPSBmbGF0RGVlcExheWVyKGl0ZW0pO1xyXG4gICAgICAgIGZsYXRMYXllci5tYXAoKHYpID0+IHYuYWRkcmVzcyA9IGAke291dEdyb3VwSW1wb3NlLmFkZHJlc3N9LiR7b3V0R3JvdXBJbXBvc2UuaWR9YCk7XHJcbiAgICAgICAgb3V0R3JvdXBJbXBvc2UuaXRlbXMgPSBmbGF0TGF5ZXI7XHJcblxyXG4gICAgICAgIHJldHVybiBvdXRHcm91cEltcG9zZTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHJlcXVlc3QyJCA9IHJlcXVlc3QxJC5tYXAoKG9icywgaWR4KSA9PiBvYnMucGlwZShcclxuICAgICAgICBtYXAoKGl0ZW1zKSA9PiBjb21wb3NpdGVDYXRhbG9nW2lkeF0uZ3JvdXBJbXBvc2UgPyBwdXNoSW1wb3NlR3JvdXAoaXRlbXMsIGlkeCkgOiBpdGVtcyApXHJcbiAgICAgICkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVxdWVzdDIkID0gcmVxdWVzdDEkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbmNhdCBHcm91cCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgY29uc3QgcmVxdWVzdDMkID0gemlwKC4uLnJlcXVlc3QyJClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgICBtYXAoKG91dHB1dDogQ2F0YWxvZ0l0ZW1bXSkgPT4gW10uY29uY2F0KC4uLm91dHB1dCkgLy8gW10uY29uY2F0LmFwcGx5KFtdLCByZXN1bHQxXHJcbiAgICAgICkpO1xyXG5cclxuICAgIC8vIG1lcmdlIEdyb3VwIChmaXJzdCBsZXZlbCBvbmx5KSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgY29uc3QgZ3JvdXBCeUdyb3VwSWQgPSAoZGF0YSwga2V5Rm4pID0+IGRhdGEucmVkdWNlKChhY2MsIGdyb3VwKSA9PiB7XHJcbiAgICAgIGNvbnN0IGdyb3VwSWQgPSBrZXlGbihncm91cCk7XHJcbiAgICAgIGNvbnN0IGluZCA9IGFjYy5maW5kKCh4KSA9PiB4LmlkID09PSBncm91cElkKTtcclxuXHJcbiAgICAgIGlmICghaW5kKSB7XHJcbiAgICAgICAgYWNjW2FjYy5sZW5ndGhdID0gZ3JvdXA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgaXggPSBhY2MuaW5kZXhPZihpbmQpO1xyXG4gICAgICAgIGlmIChhY2NbaXhdLmFkZHJlc3Muc3BsaXQoJ3wnKS5pbmRleE9mKGdyb3VwLmFkZHJlc3MpID09PSAtMSkge1xyXG4gICAgICAgICAgYWNjW2l4XS5hZGRyZXNzID0gYCR7YWNjW2l4XS5hZGRyZXNzfXwke2dyb3VwLmFkZHJlc3N9YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgYWNjW2l4XS5pdGVtcy5wdXNoKC4uLmdyb3VwLml0ZW1zKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSwgW10pO1xyXG5cclxuICAgIC8vIG1lcmdlIExheWVyIGZvciBlYWNoIExldmVsIChjYXRhbG9nLCBncm91cChyZWN1cnNpdmUpKVxyXG4gICAgY29uc3QgcmVjdXJzaXZlR3JvdXBCeUxheWVyQWRkcmVzcyA9IChpdGVtcywga2V5Rm4pID0+IGl0ZW1zLnJlZHVjZSgoYWNjLCBpdGVtLCBpZHgsIGFycikgPT4ge1xyXG5cclxuICAgICAgY29uc3QgbGF5ZXJUaXRsZSA9IGtleUZuKGl0ZW0pO1xyXG4gICAgICBjb25zdCBvdXRJdGVtID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSk7XHJcblxyXG4gICAgICBpZiAoaXRlbS50eXBlID09PSBDYXRhbG9nSXRlbVR5cGUuTGF5ZXIpIHtcclxuICAgICAgICAvLyBzYW1lIHRpdGxlLCBzYW1lIGFkZHJlc3MgPT4gcmVzdWx0OiBvbmx5IG9uZSBpdGVtIGlzIGtlZXBcclxuXHJcbiAgICAgICAgLy8gc2FtZSB0aXRsZSwgYWRkcmVzcyBkaWZmXHJcbiAgICAgICAgY29uc3QgaW5kaWNlc01hdGNoVGl0bGUgPSBbXTtcclxuICAgICAgICBjb25zdCBkaWZmQWRkcmVzcyA9IGFyci5maWx0ZXIoKHgsIGkpID0+IHtcclxuICAgICAgICAgIGxldCBiSW5kID0gZmFsc2U7XHJcbiAgICAgICAgICBpZiAoeC50aXRsZSA9PT0gbGF5ZXJUaXRsZSAmJiB4LnR5cGUgPT09IENhdGFsb2dJdGVtVHlwZS5MYXllcikge1xyXG4gICAgICAgICAgICBpZiAoaSAhPT0gaWR4ICYmIHguYWRkcmVzcyAhPT0gaXRlbS5hZGRyZXNzKSB7XHJcbiAgICAgICAgICAgICAgYkluZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW5kaWNlc01hdGNoVGl0bGUucHVzaChpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBiSW5kO1xyXG4gICAgICAgIH0pOyAvLyAkJiBpICE9PSBpZHhcclxuXHJcbiAgICAgICAgaWYgKGRpZmZBZGRyZXNzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIGNvbnN0IG5Qb3NpdGlvbiA9IGluZGljZXNNYXRjaFRpdGxlLmZpbmRJbmRleCh4ID0+IHggPT09IGlkeCkgKyAxO1xyXG4gICAgICAgICAgb3V0SXRlbS50aXRsZSA9IGAke2l0ZW0udGl0bGV9ICgke25Qb3NpdGlvbn0pYDsgLy8gc291cmNlOiAke2l0ZW0uYWRkcmVzcy5zcGxpdCgnLicpWzBdfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZXhpc3QgPSBhY2MuZmluZCgoeCkgPT4geC50aXRsZSA9PT0gb3V0SXRlbS50aXRsZSAmJiB4LnR5cGUgPT09IENhdGFsb2dJdGVtVHlwZS5MYXllcik7XHJcbiAgICAgICAgaWYgKCFleGlzdCkge1xyXG4gICAgICAgICAgYWNjW2FjYy5sZW5ndGhdID0gb3V0SXRlbTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSBDYXRhbG9nSXRlbVR5cGUuR3JvdXApIHtcclxuICAgICAgICAgIG91dEl0ZW0uaXRlbXMgPSByZWN1cnNpdmVHcm91cEJ5TGF5ZXJBZGRyZXNzKGl0ZW0uaXRlbXMsICBsYXllciA9PiBsYXllci50aXRsZSk7XHJcbiAgICAgICAgICBhY2NbYWNjLmxlbmd0aF0gPSBvdXRJdGVtO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSwgW10pO1xyXG5cclxuICAgIGNvbnN0IHJlcXVlc3Q0JCA9IHJlcXVlc3QzJC5waXBlKFxyXG4gICAgICBtYXAob3V0cHV0ID0+IGdyb3VwQnlHcm91cElkKG91dHB1dCwgZ3JvdXAgPT4gZ3JvdXAuaWQpKSxcclxuICAgICAgbWFwKChvdXRwdXQpID0+IFtdLmNvbmNhdCguLi5vdXRwdXQpKSxcclxuICAgICAgbWFwKGRhdGEgPT4gcmVjdXJzaXZlR3JvdXBCeUxheWVyQWRkcmVzcyhkYXRhLCAgbGF5ZXIgPT4gbGF5ZXIudGl0bGUpKVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gcmVxdWVzdDQkO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRDYXRhbG9nQ2FwYWJpbGl0aWVzKGNhdGFsb2c6IENhdGFsb2cpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgY29uc3Qgc1R5cGU6IHN0cmluZyA9IFR5cGVDYXRhbG9nW2NhdGFsb2cudHlwZSBhcyBzdHJpbmddO1xyXG4gICAgcmV0dXJuIHRoaXMuY2FwYWJpbGl0aWVzU2VydmljZS5nZXRDYXBhYmlsaXRpZXMoXHJcbiAgICAgIFR5cGVDYXBhYmlsaXRpZXNbc1R5cGVdLFxyXG4gICAgICBjYXRhbG9nLnVybCxcclxuICAgICAgY2F0YWxvZy52ZXJzaW9uXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwcmVwYXJlQ2F0YWxvZ0l0ZW1MYXllcihsYXllciwgaWRQYXJlbnQsIGxheWVyc1F1ZXJ5Rm9ybWF0LCBjYXRhbG9nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0YWxvZ1F1ZXJ5UGFyYW1zLCBjYXRhbG9nU291cmNlT3B0aW9ucywgY2F0YWxvZ1Rvb2x0aXBUeXBlKSB7XHJcbiAgICBjb25zdCBjb25maWd1cmVkUXVlcnlGb3JtYXQgPSB0aGlzLnJldHJpdmVMYXllckluZm9Gb3JtYXQoXHJcbiAgICAgIGxheWVyLk5hbWUsXHJcbiAgICAgIGxheWVyc1F1ZXJ5Rm9ybWF0XHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IG1ldGFkYXRhID0gbGF5ZXIuRGF0YVVSTCA/IGxheWVyLkRhdGFVUkxbMF0gOiB1bmRlZmluZWQ7XHJcbiAgICBjb25zdCBhYnN0cmFjdCA9IGxheWVyLkFic3RyYWN0ID8gbGF5ZXIuQWJzdHJhY3QgOiB1bmRlZmluZWQ7XHJcbiAgICBjb25zdCBrZXl3b3JkTGlzdCA9IGxheWVyLktleXdvcmRMaXN0XHJcbiAgICAgID8gbGF5ZXIuS2V5d29yZExpc3RcclxuICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgICBjb25zdCB0aW1lRmlsdGVyID0gdGhpcy5jYXBhYmlsaXRpZXNTZXJ2aWNlLmdldFRpbWVGaWx0ZXIobGF5ZXIpO1xyXG4gICAgY29uc3QgdGltZUZpbHRlcmFibGUgPVxyXG4gICAgICB0aW1lRmlsdGVyICYmIE9iamVjdC5rZXlzKHRpbWVGaWx0ZXIpLmxlbmd0aCA+IDAgPyB0cnVlIDogZmFsc2U7XHJcbiAgICBjb25zdCBsZWdlbmRPcHRpb25zID0gbGF5ZXIuU3R5bGVcclxuICAgICAgPyB0aGlzLmNhcGFiaWxpdGllc1NlcnZpY2UuZ2V0U3R5bGUobGF5ZXIuU3R5bGUpXHJcbiAgICAgIDogdW5kZWZpbmVkO1xyXG5cclxuICAgIGNvbnN0IHBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIGNhdGFsb2dRdWVyeVBhcmFtcywge1xyXG4gICAgICBMQVlFUlM6IGxheWVyLk5hbWUsXHJcbiAgICAgIEZFQVRVUkVfQ09VTlQ6IGNhdGFsb2cuY291bnQsXHJcbiAgICAgIFZFUlNJT046IGNhdGFsb2cudmVyc2lvbiB8fCAnMS4zLjAnXHJcbiAgICB9IGFzIFdNU0RhdGFTb3VyY2VPcHRpb25zUGFyYW1zXHJcbiAgICApO1xyXG4gICAgY29uc3QgYmFzZVNvdXJjZU9wdGlvbnMgPSB7XHJcbiAgICAgIHR5cGU6ICd3bXMnLFxyXG4gICAgICB1cmw6IGNhdGFsb2cudXJsLFxyXG4gICAgICBjcm9zc09yaWdpbjogY2F0YWxvZy5zZXRDcm9zc09yaWdpbkFub255bW91c1xyXG4gICAgICAgID8gJ2Fub255bW91cydcclxuICAgICAgICA6IHVuZGVmaW5lZCxcclxuICAgICAgdGltZUZpbHRlcjogeyAuLi50aW1lRmlsdGVyLCAuLi5jYXRhbG9nLnRpbWVGaWx0ZXIgfSxcclxuICAgICAgdGltZUZpbHRlcmFibGU6IHRpbWVGaWx0ZXJhYmxlID8gdHJ1ZSA6IGZhbHNlLFxyXG4gICAgICBxdWVyeWFibGU6IGxheWVyLnF1ZXJ5YWJsZSxcclxuICAgICAgcXVlcnlGb3JtYXQ6IGNvbmZpZ3VyZWRRdWVyeUZvcm1hdCxcclxuICAgICAgcXVlcnlIdG1sVGFyZ2V0OiBjYXRhbG9nLnF1ZXJ5SHRtbFRhcmdldCB8fCBRdWVyeUh0bWxUYXJnZXQuSUZSQU1FXHJcbiAgICB9O1xyXG4gICAgY29uc3Qgc291cmNlT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgIHt9LFxyXG4gICAgICBiYXNlU291cmNlT3B0aW9ucyxcclxuICAgICAgY2F0YWxvZ1NvdXJjZU9wdGlvbnMsXHJcbiAgICAgIHsgcGFyYW1zIH1cclxuICAgICkgYXMgV01TRGF0YVNvdXJjZU9wdGlvbnM7XHJcblxyXG4gICAgY29uc3QgbGF5ZXJQcmVwYXJlID0ge1xyXG4gICAgICBpZDogZ2VuZXJhdGVJZEZyb21Tb3VyY2VPcHRpb25zKHNvdXJjZU9wdGlvbnMpLFxyXG4gICAgICB0eXBlOiBDYXRhbG9nSXRlbVR5cGUuTGF5ZXIsXHJcbiAgICAgIHRpdGxlOiBsYXllci5UaXRsZSxcclxuICAgICAgYWRkcmVzczogaWRQYXJlbnQsXHJcbiAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICB0aXRsZTogbGF5ZXIuVGl0bGUsXHJcbiAgICAgICAgbWF4UmVzb2x1dGlvbjpcclxuICAgICAgICAgIGdldFJlc29sdXRpb25Gcm9tU2NhbGUobGF5ZXIuTWF4U2NhbGVEZW5vbWluYXRvcikgfHwgSW5maW5pdHksXHJcbiAgICAgICAgbWluUmVzb2x1dGlvbjpcclxuICAgICAgICAgIGdldFJlc29sdXRpb25Gcm9tU2NhbGUobGF5ZXIuTWluU2NhbGVEZW5vbWluYXRvcikgfHwgMCxcclxuICAgICAgICBtZXRhZGF0YToge1xyXG4gICAgICAgICAgdXJsOiBtZXRhZGF0YSA/IG1ldGFkYXRhLk9ubGluZVJlc291cmNlIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgZXh0ZXJuOiBtZXRhZGF0YSA/IHRydWUgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICBhYnN0cmFjdCxcclxuICAgICAgICAgIGtleXdvcmRMaXN0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBsZWdlbmRPcHRpb25zLFxyXG4gICAgICAgIHRvb2x0aXA6IHsgdHlwZTogY2F0YWxvZ1Rvb2x0aXBUeXBlIH0gYXMgVG9vbHRpcENvbnRlbnQsXHJcbiAgICAgICAgc291cmNlT3B0aW9uc1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBsYXllclByZXBhcmU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHByZXBhcmVDYXRhbG9nSXRlbUdyb3VwKGl0ZW1MaXN0SW4sIHJlZ2V4ZXMsIGlkR3JvdXAsIGxheWVyc1F1ZXJ5Rm9ybWF0LCBjYXRhbG9nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0YWxvZ1F1ZXJ5UGFyYW1zLCBjYXRhbG9nU291cmNlT3B0aW9ucywgY2F0YWxvZ1Rvb2x0aXBUeXBlKSB7XHJcbiAgICAgY29uc3QgZ3JvdXBQcmVwYXJlID0ge1xyXG4gICAgICAgIGlkOiBpZEdyb3VwLFxyXG4gICAgICAgIHR5cGU6IENhdGFsb2dJdGVtVHlwZS5Hcm91cCxcclxuICAgICAgICB0aXRsZTogaXRlbUxpc3RJbi5UaXRsZSxcclxuICAgICAgICBhZGRyZXNzOiBjYXRhbG9nLmlkLFxyXG4gICAgICAgIGl0ZW1zOiBpdGVtTGlzdEluLkxheWVyLnJlZHVjZShcclxuICAgICAgICAgIChpdGVtczogQ2F0YWxvZ0l0ZW1bXSwgbGF5ZXI6IGFueSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKGxheWVyLkxheWVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAvLyByZWN1cnNpdmUsIGNoZWNrIG5leHQgbGV2ZWxcclxuICAgICAgICAgICAgICBjb25zdCBpZEdyb3VwSXRlbU5leHRMZXZlbCA9IGlkR3JvdXAgKyBgLmdyb3VwLiR7bGF5ZXIuTmFtZSB8fCBsYXllci5MYXllclswXS5OYW1lfWA7XHJcbiAgICAgICAgICAgICAgY29uc3QgZ3JvdXBJdGVtOiBDYXRhbG9nSXRlbUdyb3VwID0gdGhpcy5wcmVwYXJlQ2F0YWxvZ0l0ZW1Hcm91cChsYXllciwgcmVnZXhlcywgaWRHcm91cEl0ZW1OZXh0TGV2ZWwsXHJcbiAgICAgICAgICAgICAgICBsYXllcnNRdWVyeUZvcm1hdCwgY2F0YWxvZywgY2F0YWxvZ1F1ZXJ5UGFyYW1zLCBjYXRhbG9nU291cmNlT3B0aW9ucywgY2F0YWxvZ1Rvb2x0aXBUeXBlKTtcclxuXHJcbiAgICAgICAgICAgICAgaXRlbXMucHVzaChncm91cEl0ZW0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGlmICh0aGlzLnRlc3RMYXllclJlZ2V4ZXMobGF5ZXIuTmFtZSwgcmVnZXhlcykgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbXM7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBjb25zdCBsYXllckl0ZW06IENhdGFsb2dJdGVtTGF5ZXI8SW1hZ2VMYXllck9wdGlvbnM+ID0gdGhpcy5wcmVwYXJlQ2F0YWxvZ0l0ZW1MYXllcihsYXllciwgaWRHcm91cCwgbGF5ZXJzUXVlcnlGb3JtYXQsXHJcbiAgICAgICAgICAgICAgICBjYXRhbG9nLCBjYXRhbG9nUXVlcnlQYXJhbXMsIGNhdGFsb2dTb3VyY2VPcHRpb25zLCBjYXRhbG9nVG9vbHRpcFR5cGUpO1xyXG5cclxuICAgICAgICAgICAgICBpdGVtcy5wdXNoKGxheWVySXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW1zO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFtdXHJcbiAgICAgICAgKVxyXG4gICAgICB9O1xyXG4gICAgIHJldHVybiBncm91cFByZXBhcmU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluY2x1ZGVSZWN1cnNpdmVJdGVtcyhcclxuICAgIGNhdGFsb2c6IENhdGFsb2csXHJcbiAgICBpdGVtTGlzdEluOiBhbnksXHJcbiAgICBpdGVtc1ByZXBhcmU6IENhdGFsb2dJdGVtW10sXHJcbiAgICBsb29wTGV2ZWw6IG51bWJlciA9IDAsXHJcbiAgKSB7XHJcbiAgICAvLyBEaWcgYWxsIGxldmVscyB1bnRpbCBsYXN0IGxldmVsIChsYXllciBvYmplY3QgYXJlIG5vdCBkZWZpbmVkIG9uIGxhc3QgbGV2ZWwpXHJcbiAgICBjb25zdCByZWdleGVzID0gKGNhdGFsb2cucmVnRmlsdGVycyB8fCBbXSkubWFwKFxyXG4gICAgICAocGF0dGVybjogc3RyaW5nKSA9PiBuZXcgUmVnRXhwKHBhdHRlcm4pXHJcbiAgICApO1xyXG4gICAgY29uc3QgY2F0YWxvZ1F1ZXJ5UGFyYW1zID0gY2F0YWxvZy5xdWVyeVBhcmFtcyB8fCB7fTtcclxuICAgIGNvbnN0IGNhdGFsb2dTb3VyY2VPcHRpb25zID0gY2F0YWxvZy5zb3VyY2VPcHRpb25zIHx8IHt9O1xyXG5cclxuICAgIGlmICghaXRlbUxpc3RJbi5MYXllcikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1MaXN0SW4uTGF5ZXIpIHtcclxuICAgICAgaWYgKGl0ZW0uTGF5ZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIC8vIHJlY3Vyc2l2ZSwgY2hlY2sgbmV4dCBsZXZlbFxyXG4gICAgICAgIHRoaXMuaW5jbHVkZVJlY3Vyc2l2ZUl0ZW1zKGNhdGFsb2csIGl0ZW0sIGl0ZW1zUHJlcGFyZSwgbG9vcExldmVsICsgMSk7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGNhdGFsb2dUb29sdGlwVHlwZSA9IHRoaXMucmV0cmlldmVUb29sdGlwVHlwZShjYXRhbG9nKTtcclxuICAgICAgY29uc3QgbGF5ZXJzUXVlcnlGb3JtYXQgPSB0aGlzLmZpbmRDYXRhbG9nSW5mb0Zvcm1hdChjYXRhbG9nKTtcclxuXHJcbiAgICAgIC8vIGdyb3VwKHdpdGggbGF5ZXJzKSBhbmQgbGF5ZXIod2l0aG91dCBncm91cCkgbGV2ZWwgMVxyXG4gICAgICBpZiAobG9vcExldmVsICE9PSAwKSB7XHJcblxyXG4gICAgICAgIC8vIFRPRE86IFNsaWNlIHRoYXQgaW50byBtdWx0aXBsZSBtZXRob2RzXHJcbiAgICAgICAgLy8gRGVmaW5lIG9iamVjdCBvZiBncm91cCBsYXllclxyXG4gICAgICAgIGNvbnN0IGlkR3JvdXBJdGVtID0gYGNhdGFsb2cuZ3JvdXAuJHtpdGVtTGlzdEluLk5hbWUgfHwgaXRlbS5OYW1lfWA7XHJcbiAgICAgICAgY29uc3QgZ3JvdXBJdGVtID0gdGhpcy5wcmVwYXJlQ2F0YWxvZ0l0ZW1Hcm91cChpdGVtTGlzdEluLCByZWdleGVzLCBpZEdyb3VwSXRlbSwgbGF5ZXJzUXVlcnlGb3JtYXQsIGNhdGFsb2csXHJcbiAgICAgICAgICBjYXRhbG9nUXVlcnlQYXJhbXMsIGNhdGFsb2dTb3VyY2VPcHRpb25zLCBjYXRhbG9nVG9vbHRpcFR5cGUpO1xyXG5cclxuICAgICAgICBpZiAoZ3JvdXBJdGVtLml0ZW1zLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgaXRlbXNQcmVwYXJlLnB1c2goZ3JvdXBJdGVtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEJyZWFrIHRoZSBncm91cCAoZG9uJ3QgYWRkIGEgZ3JvdXAgb2YgbGF5ZXIgZm9yIGVhY2ggb2YgdGhlaXIgbGF5ZXIhKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIGxheWVyIHdpdGhvdXQgZ3JvdXBcclxuICAgICAgICBjb25zdCBsYXllckl0ZW0gPSB0aGlzLnByZXBhcmVDYXRhbG9nSXRlbUxheWVyKGl0ZW0sIGNhdGFsb2cuaWQsIGxheWVyc1F1ZXJ5Rm9ybWF0LFxyXG4gICAgICAgICAgY2F0YWxvZywgY2F0YWxvZ1F1ZXJ5UGFyYW1zLCBjYXRhbG9nU291cmNlT3B0aW9ucywgY2F0YWxvZ1Rvb2x0aXBUeXBlKTtcclxuICAgICAgICBpdGVtc1ByZXBhcmUucHVzaChsYXllckl0ZW0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFdNVFNJdGVtcyhcclxuICAgIGNhdGFsb2c6IENhdGFsb2csXHJcbiAgICBjYXBhYmlsaXRpZXM6IHsgW2tleTogc3RyaW5nXTogYW55IH1cclxuICApOiBDYXRhbG9nSXRlbUxheWVyW10ge1xyXG4gICAgY29uc3QgbGF5ZXJzID0gY2FwYWJpbGl0aWVzLkNvbnRlbnRzLkxheWVyO1xyXG4gICAgY29uc3QgcmVnZXhlcyA9IChjYXRhbG9nLnJlZ0ZpbHRlcnMgfHwgW10pLm1hcChcclxuICAgICAgKHBhdHRlcm46IHN0cmluZykgPT4gbmV3IFJlZ0V4cChwYXR0ZXJuKVxyXG4gICAgKTtcclxuICAgIGNvbnN0IGNhdGFsb2dRdWVyeVBhcmFtcyA9IGNhdGFsb2cucXVlcnlQYXJhbXMgfHwge307XHJcbiAgICBjb25zdCBjYXRhbG9nU291cmNlT3B0aW9ucyA9IGNhdGFsb2cuc291cmNlT3B0aW9ucyB8fCB7fTtcclxuXHJcbiAgICByZXR1cm4gbGF5ZXJzXHJcbiAgICAgIC5tYXAoKGxheWVyOiBhbnkpID0+IHtcclxuICAgICAgICBpZiAodGhpcy50ZXN0TGF5ZXJSZWdleGVzKGxheWVyLklkZW50aWZpZXIsIHJlZ2V4ZXMpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgY2F0YWxvZ1F1ZXJ5UGFyYW1zLCB7XHJcbiAgICAgICAgICB2ZXJzaW9uOiAnMS4wLjAnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgYmFzZVNvdXJjZU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICB0eXBlOiAnd210cycsXHJcbiAgICAgICAgICB1cmw6IGNhdGFsb2cudXJsLFxyXG4gICAgICAgICAgY3Jvc3NPcmlnaW46IGNhdGFsb2cuc2V0Q3Jvc3NPcmlnaW5Bbm9ueW1vdXNcclxuICAgICAgICAgICAgPyAnYW5vbnltb3VzJ1xyXG4gICAgICAgICAgICA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgIGxheWVyOiBsYXllci5JZGVudGlmaWVyLFxyXG4gICAgICAgICAgbWF0cml4U2V0OiBjYXRhbG9nLm1hdHJpeFNldCxcclxuICAgICAgICAgIG9wdGlvbnNGcm9tQ2FwYWJpbGl0aWVzOiB0cnVlLFxyXG4gICAgICAgICAgcmVxdWVzdEVuY29kaW5nOiBjYXRhbG9nLnJlcXVlc3RFbmNvZGluZyB8fCAnS1ZQJyxcclxuICAgICAgICAgIHN0eWxlOiAnZGVmYXVsdCdcclxuICAgICAgICB9IGFzIFdNVFNEYXRhU291cmNlT3B0aW9ucztcclxuICAgICAgICBjb25zdCBzb3VyY2VPcHRpb25zID0gT2JqZWN0LmFzc2lnbihcclxuICAgICAgICAgIHt9LFxyXG4gICAgICAgICAgYmFzZVNvdXJjZU9wdGlvbnMsXHJcbiAgICAgICAgICBjYXRhbG9nU291cmNlT3B0aW9ucyxcclxuICAgICAgICAgIHsgcGFyYW1zIH1cclxuICAgICAgICApIGFzIFdNVFNEYXRhU291cmNlT3B0aW9ucztcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGlkOiBnZW5lcmF0ZUlkRnJvbVNvdXJjZU9wdGlvbnMoc291cmNlT3B0aW9ucyksXHJcbiAgICAgICAgICB0eXBlOiBDYXRhbG9nSXRlbVR5cGUuTGF5ZXIsXHJcbiAgICAgICAgICB0aXRsZTogbGF5ZXIuVGl0bGUsXHJcbiAgICAgICAgICBhZGRyZXNzOiBjYXRhbG9nLmlkLFxyXG4gICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICB0aXRsZTogbGF5ZXIuVGl0bGUsXHJcbiAgICAgICAgICAgIHNvdXJjZU9wdGlvbnMsXHJcbiAgICAgICAgICAgIG1heFJlc29sdXRpb246IEluZmluaXR5LFxyXG4gICAgICAgICAgICBtaW5SZXNvbHV0aW9uOiAwXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgfSlcclxuICAgICAgLmZpbHRlcigoaXRlbTogQ2F0YWxvZ0l0ZW1MYXllciB8IHVuZGVmaW5lZCkgPT4gaXRlbSAhPT0gdW5kZWZpbmVkKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdGVzdExheWVyUmVnZXhlcyhsYXllck5hbWUsIHJlZ2V4ZXMpOiBib29sZWFuIHtcclxuICAgIGlmIChyZWdleGVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiByZWdleGVzLmZpbmQoKHJlZ2V4OiBSZWdFeHApID0+IHJlZ2V4LnRlc3QobGF5ZXJOYW1lKSkgIT09IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmV0cml2ZUxheWVySW5mb0Zvcm1hdChcclxuICAgIGxheWVyTmFtZUZyb21DYXRhbG9nOiBzdHJpbmcsXHJcbiAgICBsYXllcnNRdWVyeUZvcm1hdDogeyBsYXllcjogc3RyaW5nOyBxdWVyeUZvcm1hdDogUXVlcnlGb3JtYXQgfVtdXHJcbiAgKTogUXVlcnlGb3JtYXQge1xyXG4gICAgY29uc3QgY3VycmVudExheWVySW5mb0Zvcm1hdCA9IGxheWVyc1F1ZXJ5Rm9ybWF0LmZpbmQoXHJcbiAgICAgIGYgPT4gZi5sYXllciA9PT0gbGF5ZXJOYW1lRnJvbUNhdGFsb2dcclxuICAgICk7XHJcbiAgICBjb25zdCBiYXNlSW5mb0Zvcm1hdCA9IGxheWVyc1F1ZXJ5Rm9ybWF0LmZpbmQoZiA9PiBmLmxheWVyID09PSAnKicpO1xyXG4gICAgbGV0IHF1ZXJ5Rm9ybWF0OiBRdWVyeUZvcm1hdDtcclxuICAgIGlmIChjdXJyZW50TGF5ZXJJbmZvRm9ybWF0KSB7XHJcbiAgICAgIHF1ZXJ5Rm9ybWF0ID0gY3VycmVudExheWVySW5mb0Zvcm1hdC5xdWVyeUZvcm1hdDtcclxuICAgIH0gZWxzZSBpZiAoYmFzZUluZm9Gb3JtYXQpIHtcclxuICAgICAgcXVlcnlGb3JtYXQgPSBiYXNlSW5mb0Zvcm1hdC5xdWVyeUZvcm1hdDtcclxuICAgIH1cclxuICAgIHJldHVybiBxdWVyeUZvcm1hdDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmV0cmlldmVUb29sdGlwVHlwZShjYXRhbG9nOiBDYXRhbG9nKTogVG9vbHRpcFR5cGUge1xyXG4gICAgaWYgKCFjYXRhbG9nLnRvb2x0aXBUeXBlKSB7XHJcbiAgICAgIHJldHVybiBUb29sdGlwVHlwZS5USVRMRTtcclxuICAgIH1cclxuICAgIHJldHVybiBjYXRhbG9nLnRvb2x0aXBUeXBlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmaW5kQ2F0YWxvZ0luZm9Gb3JtYXQoXHJcbiAgICBjYXRhbG9nOiBDYXRhbG9nXHJcbiAgKTogeyBsYXllcjogc3RyaW5nOyBxdWVyeUZvcm1hdDogUXVlcnlGb3JtYXQgfVtdIHtcclxuICAgIGNvbnN0IGxheWVyc1F1ZXJ5Rm9ybWF0OiB7IGxheWVyOiBzdHJpbmc7IHF1ZXJ5Rm9ybWF0OiBRdWVyeUZvcm1hdCB9W10gPSBbXTtcclxuICAgIGlmICghY2F0YWxvZy5xdWVyeUZvcm1hdCkge1xyXG4gICAgICByZXR1cm4gbGF5ZXJzUXVlcnlGb3JtYXQ7XHJcbiAgICB9XHJcbiAgICBPYmplY3Qua2V5cyhjYXRhbG9nLnF1ZXJ5Rm9ybWF0KS5mb3JFYWNoKGNvbmZpZ3VyZWRJbmZvRm9ybWF0ID0+IHtcclxuICAgICAgaWYgKGNhdGFsb2cucXVlcnlGb3JtYXRbY29uZmlndXJlZEluZm9Gb3JtYXRdIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICBjYXRhbG9nLnF1ZXJ5Rm9ybWF0W2NvbmZpZ3VyZWRJbmZvRm9ybWF0XS5mb3JFYWNoKGxheWVyTmFtZSA9PiB7XHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICFsYXllcnNRdWVyeUZvcm1hdC5maW5kKHNwZWNpZmljID0+IHNwZWNpZmljLmxheWVyID09PSBsYXllck5hbWUpXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgbGF5ZXJzUXVlcnlGb3JtYXQucHVzaCh7XHJcbiAgICAgICAgICAgICAgbGF5ZXI6IGxheWVyTmFtZSxcclxuICAgICAgICAgICAgICBxdWVyeUZvcm1hdDogY29uZmlndXJlZEluZm9Gb3JtYXQgYXMgUXVlcnlGb3JtYXRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgIWxheWVyc1F1ZXJ5Rm9ybWF0LmZpbmQoXHJcbiAgICAgICAgICAgIHNwZWNpZmljID0+XHJcbiAgICAgICAgICAgICAgc3BlY2lmaWMubGF5ZXIgPT09IGNhdGFsb2cucXVlcnlGb3JtYXRbY29uZmlndXJlZEluZm9Gb3JtYXRdXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBsYXllcnNRdWVyeUZvcm1hdC5wdXNoKHtcclxuICAgICAgICAgICAgbGF5ZXI6IGNhdGFsb2cucXVlcnlGb3JtYXRbY29uZmlndXJlZEluZm9Gb3JtYXRdLFxyXG4gICAgICAgICAgICBxdWVyeUZvcm1hdDogY29uZmlndXJlZEluZm9Gb3JtYXQgYXMgUXVlcnlGb3JtYXRcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbGF5ZXJzUXVlcnlGb3JtYXQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==