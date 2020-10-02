/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
            function (catalogs) {
                return catalogs.map((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return Object.assign(c, c.options); }));
            })), catchError((/**
             * @param {?} _response
             * @return {?}
             */
            function (_response) { return EMPTY; })));
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
        function (component) {
            return catalogsFromInstance.push(CatalogFactory.createInstanceCatalog(component, _this));
        }));
        // get CatalogItems for each original Catalog-----------------------------------------------------
        /** @type {?} */
        var request1$ = [];
        catalogsFromInstance.map((/**
         * @param {?} component
         * @return {?}
         */
        function (component) {
            return request1$.push(component.collectCatalogItems());
        }));
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
            function (acc, val) {
                return acc.concat(val.type === CatalogItemType.Group ? flatDeepLayer(val.items) : val);
            }), []);
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
                function (v) { return (v.address = outGroupImpose.address + "." + outGroupImpose.id); }));
                outGroupImpose.items = flatLayer;
                return outGroupImpose;
            });
            request2$ = request1$.map((/**
             * @param {?} obs
             * @param {?} idx
             * @return {?}
             */
            function (obs, idx) {
                return obs.pipe(map((/**
                 * @param {?} items
                 * @return {?}
                 */
                function (items) {
                    return compositeCatalog[idx].groupImpose
                        ? pushImposeGroup_1(items, idx)
                        : items;
                })));
            }));
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
        function (data, keyFn) {
            return data.reduce((/**
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
            }), []);
        });
        // merge Layer for each Level (catalog, group(recursive))
        /** @type {?} */
        var recursiveGroupByLayerAddress = (/**
         * @param {?} items
         * @param {?} keyFn
         * @return {?}
         */
        function (items, keyFn) {
            return items.reduce((/**
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
            }), []);
        });
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
     * @return {?}
     */
    CatalogService.prototype.prepareCatalogItemLayer = /**
     * @private
     * @param {?} layer
     * @param {?} idParent
     * @param {?} layersQueryFormat
     * @param {?} catalog
     * @return {?}
     */
    function (layer, idParent, layersQueryFormat, catalog) {
        /** @type {?} */
        var configuredQueryFormat = this.retriveLayerInfoFormat(layer.Name, layersQueryFormat);
        /** @type {?} */
        var metadata = layer.DataURL ? layer.DataURL[0] : undefined;
        /** @type {?} */
        var legendOptions = catalog.showLegend && layer.Style
            ? this.capabilitiesService.getStyle(layer.Style)
            : undefined;
        /** @type {?} */
        var params = Object.assign({}, catalog.queryParams, (/** @type {?} */ ({
            LAYERS: layer.Name,
            VERSION: catalog.version
        })));
        /** @type {?} */
        var baseSourceOptions = {
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
        var sourceOptions = (/** @type {?} */ (Object.assign({}, baseSourceOptions, catalog.sourceOptions, { params: params })));
        /** @type {?} */
        var layerPrepare = {
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
                legendOptions: legendOptions,
                tooltip: { type: catalog.tooltipType },
                sourceOptions: sourceOptions
            }
        };
        return ObjectUtils.removeUndefined(layerPrepare);
    };
    /**
     * @private
     * @param {?} itemListIn
     * @param {?} regexes
     * @param {?} idGroup
     * @param {?} layersQueryFormat
     * @param {?} catalog
     * @return {?}
     */
    CatalogService.prototype.prepareCatalogItemGroup = /**
     * @private
     * @param {?} itemListIn
     * @param {?} regexes
     * @param {?} idGroup
     * @param {?} layersQueryFormat
     * @param {?} catalog
     * @return {?}
     */
    function (itemListIn, regexes, idGroup, layersQueryFormat, catalog) {
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
                    var groupItem = _this.prepareCatalogItemGroup(layer, regexes, idGroupItemNextLevel, layersQueryFormat, catalog);
                    items.push(groupItem);
                }
                else {
                    if (_this.testLayerRegexes(layer.Name, regexes) === false) {
                        return items;
                    }
                    /** @type {?} */
                    var layerItem = _this.prepareCatalogItemLayer(layer, idGroup, layersQueryFormat, catalog);
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
                var layersQueryFormat = this.findCatalogInfoFormat(catalog);
                // group(with layers) and layer(without group) level 1
                if (loopLevel !== 0) {
                    // TODO: Slice that into multiple methods
                    // Define object of group layer
                    /** @type {?} */
                    var idGroupItem = "catalog.group." + (itemListIn.Name || item.Name);
                    /** @type {?} */
                    var groupItem = this.prepareCatalogItemGroup(itemListIn, regexes, idGroupItem, layersQueryFormat, catalog);
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
                        var layerItem = this.prepareCatalogItemLayer(item, catalog.id, layersQueryFormat, catalog);
                        itemsPrepare.push(layerItem);
                    }
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
            var params = Object.assign({}, catalog.queryParams, {
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
            var sourceOptions = (/** @type {?} */ (Object.assign({}, baseSourceOptions, catalog.sourceOptions, { params: params })));
            return ObjectUtils.removeUndefined({
                id: generateIdFromSourceOptions(sourceOptions),
                type: CatalogItemType.Layer,
                title: layer.Title,
                address: catalog.id,
                options: {
                    sourceOptions: sourceOptions
                }
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2NhdGFsb2cvc2hhcmVkL2NhdGFsb2cuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBcUIsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRSxPQUFPLEVBQUUsS0FBSyxFQUFjLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRCxPQUFPLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNoRCxPQUFPLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM1RCxPQUFPLEVBQ0wsbUJBQW1CLEVBQ25CLGdCQUFnQixFQUlqQixNQUFNLGtCQUFrQixDQUFDO0FBRTFCLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQU9uRCxPQUFPLEVBQVcsY0FBYyxFQUFvQixNQUFNLG9CQUFvQixDQUFDO0FBQy9FLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxQyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxhQUFhLENBQUM7Ozs7O0FBRTFEO0lBSUUsd0JBQ1UsSUFBZ0IsRUFDaEIsTUFBcUIsRUFDckIsZUFBZ0MsRUFDaEMsbUJBQXdDO1FBSHhDLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUNyQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsd0JBQW1CLEdBQW5CLG1C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Q0FBNEIsRUFBQyxFQUNqRTt3QkFDQSxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7NEJBQ3JCLEtBQUssRUFBRSxTQUFTOzRCQUNoQixXQUFXLEVBQUUsbUJBQUEsb0JBQW9CLEVBQWU7eUJBQ2pELENBQUMsQ0FBQztxQkFDSjtnQkFDSCxDQUFDLEVBQUMsQ0FBQzthQUNKO2lCQUFNO2dCQUNMLElBQ0UsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJOzs7O2dCQUNyQixVQUFBLFFBQVE7b0JBQ04sT0FBQSxRQUFRLENBQUMsS0FBSyxLQUFLLE9BQU8sQ0FBQyxXQUFXLENBQUMsb0JBQW9CLENBQUM7Z0JBQTVELENBQTRELEVBQy9ELEVBQ0Q7b0JBQ0EsaUJBQWlCLENBQUMsSUFBSSxDQUFDO3dCQUNyQixLQUFLLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQzt3QkFDaEQsV0FBVyxFQUFFLG1CQUFBLG9CQUFvQixFQUFlO3FCQUNqRCxDQUFDLENBQUM7aUJBQ0o7YUFDRjtRQUNILENBQUMsRUFBQyxDQUFDO1FBQ0gsT0FBTyxpQkFBaUIsQ0FBQztJQUMzQixDQUFDOztnQkE3aEJGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBNUJRLFVBQVU7Z0JBS08sYUFBYTtnQkFBOUIsZUFBZTtnQkFFdEIsbUJBQW1COzs7eUJBUnJCO0NBeWpCQyxBQTloQkQsSUE4aEJDO1NBM2hCWSxjQUFjOzs7Ozs7SUFFdkIsOEJBQXdCOzs7OztJQUN4QixnQ0FBNkI7Ozs7O0lBQzdCLHlDQUF3Qzs7Ozs7SUFDeEMsNkNBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgRU1QVFksIE9ic2VydmFibGUsIG9mLCB6aXAgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwLCBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgdXVpZCwgT2JqZWN0VXRpbHMgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcbmltcG9ydCB7IExhbmd1YWdlU2VydmljZSwgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIENhcGFiaWxpdGllc1NlcnZpY2UsXHJcbiAgVHlwZUNhcGFiaWxpdGllcyxcclxuICBXTVNEYXRhU291cmNlT3B0aW9ucyxcclxuICBXTVNEYXRhU291cmNlT3B0aW9uc1BhcmFtcyxcclxuICBXTVRTRGF0YVNvdXJjZU9wdGlvbnNcclxufSBmcm9tICcuLi8uLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgTGF5ZXJPcHRpb25zLCBJbWFnZUxheWVyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2xheWVyJztcclxuaW1wb3J0IHsgZ2V0UmVzb2x1dGlvbkZyb21TY2FsZSB9IGZyb20gJy4uLy4uL21hcCc7XHJcblxyXG5pbXBvcnQge1xyXG4gIENhdGFsb2dJdGVtLFxyXG4gIENhdGFsb2dJdGVtTGF5ZXIsXHJcbiAgQ2F0YWxvZ0l0ZW1Hcm91cFxyXG59IGZyb20gJy4vY2F0YWxvZy5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBDYXRhbG9nLCBDYXRhbG9nRmFjdG9yeSwgQ29tcG9zaXRlQ2F0YWxvZyB9IGZyb20gJy4vY2F0YWxvZy5hYnN0cmFjdCc7XHJcbmltcG9ydCB7IENhdGFsb2dJdGVtVHlwZSwgVHlwZUNhdGFsb2cgfSBmcm9tICcuL2NhdGFsb2cuZW51bSc7XHJcbmltcG9ydCB7IFF1ZXJ5Rm9ybWF0IH0gZnJvbSAnLi4vLi4vcXVlcnknO1xyXG5pbXBvcnQgeyBnZW5lcmF0ZUlkRnJvbVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi8uLi91dGlscyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYXRhbG9nU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNhcGFiaWxpdGllc1NlcnZpY2U6IENhcGFiaWxpdGllc1NlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIGxvYWRDYXRhbG9ncygpOiBPYnNlcnZhYmxlPENhdGFsb2dbXT4ge1xyXG4gICAgY29uc3QgY29udGV4dENvbmZpZyA9IHRoaXMuY29uZmlnLmdldENvbmZpZygnY29udGV4dCcpIHx8IHt9O1xyXG4gICAgY29uc3QgY2F0YWxvZ0NvbmZpZyA9IHRoaXMuY29uZmlnLmdldENvbmZpZygnY2F0YWxvZycpIHx8IHt9O1xyXG4gICAgY29uc3QgYXBpVXJsID0gY2F0YWxvZ0NvbmZpZy51cmwgfHwgY29udGV4dENvbmZpZy51cmw7XHJcbiAgICBjb25zdCBjYXRhbG9nc0Zyb21Db25maWcgPSBjYXRhbG9nQ29uZmlnLnNvdXJjZXMgfHwgW107XHJcblxyXG4gICAgY29uc3Qgb2JzZXJ2YWJsZXMkID0gW107XHJcblxyXG4gICAgaWYgKGFwaVVybCkge1xyXG4gICAgICAvLyBCYXNlIGxheWVycyBjYXRhbG9nXHJcbiAgICAgIGlmIChjYXRhbG9nQ29uZmlnLmJhc2VMYXllcnMpIHtcclxuICAgICAgICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5jYXRhbG9nLmJhc2VMYXllcnMnKTtcclxuICAgICAgICBjb25zdCBiYXNlTGF5ZXJzQ2F0YWxvZyA9IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6ICdjYXRhbG9nLmJhc2VsYXllcnMnLFxyXG4gICAgICAgICAgICB0aXRsZSxcclxuICAgICAgICAgICAgdXJsOiBgJHthcGlVcmx9L2Jhc2VsYXllcnNgLFxyXG4gICAgICAgICAgICB0eXBlOiAnYmFzZWxheWVycydcclxuICAgICAgICAgIH1cclxuICAgICAgICBdO1xyXG4gICAgICAgIG9ic2VydmFibGVzJC5wdXNoKG9mKGJhc2VMYXllcnNDYXRhbG9nKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIENhdGFsb2dzIGZyb20gQVBJXHJcbiAgICAgIGNvbnN0IGNhdGFsb2dzRnJvbUFwaSQgPSB0aGlzLmh0dHBcclxuICAgICAgICAuZ2V0PENhdGFsb2dbXT4oYCR7YXBpVXJsfS9jYXRhbG9nc2ApXHJcbiAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICBtYXAoY2F0YWxvZ3MgPT5cclxuICAgICAgICAgICAgY2F0YWxvZ3MubWFwKChjOiBhbnkpID0+IE9iamVjdC5hc3NpZ24oYywgYy5vcHRpb25zKSlcclxuICAgICAgICAgICksXHJcbiAgICAgICAgICBjYXRjaEVycm9yKChfcmVzcG9uc2U6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiBFTVBUWSlcclxuICAgICAgICApO1xyXG4gICAgICBvYnNlcnZhYmxlcyQucHVzaChjYXRhbG9nc0Zyb21BcGkkKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDYXRhbG9ncyBmcm9tIGNvbmZpZ1xyXG4gICAgaWYgKGNhdGFsb2dzRnJvbUNvbmZpZy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIG9ic2VydmFibGVzJC5wdXNoKFxyXG4gICAgICAgIG9mKGNhdGFsb2dzRnJvbUNvbmZpZykucGlwZShcclxuICAgICAgICAgIG1hcCgoY2F0YWxvZ3M6IENhdGFsb2dbXSkgPT5cclxuICAgICAgICAgICAgY2F0YWxvZ3MubWFwKGMgPT4ge1xyXG4gICAgICAgICAgICAgIGlmICghYy5pZCkge1xyXG4gICAgICAgICAgICAgICAgYy5pZCA9IHV1aWQoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGM7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB6aXAoLi4ub2JzZXJ2YWJsZXMkKS5waXBlKFxyXG4gICAgICBtYXAoKGNhdGFsb2dzOiBDYXRhbG9nW11bXSkgPT4gW10uY29uY2F0LmFwcGx5KFtdLCBjYXRhbG9ncykpXHJcbiAgICApIGFzIE9ic2VydmFibGU8Q2F0YWxvZ1tdPjtcclxuICB9XHJcblxyXG4gIGxvYWRDYXRhbG9nSXRlbXMoY2F0YWxvZzogQ2F0YWxvZyk6IE9ic2VydmFibGU8Q2F0YWxvZ0l0ZW1bXT4ge1xyXG4gICAgbGV0IG5ld0NhdGFsb2c6IENhdGFsb2c7XHJcbiAgICBuZXdDYXRhbG9nID0gQ2F0YWxvZ0ZhY3RvcnkuY3JlYXRlSW5zdGFuY2VDYXRhbG9nKGNhdGFsb2csIHRoaXMpO1xyXG4gICAgcmV0dXJuIG5ld0NhdGFsb2cuY29sbGVjdENhdGFsb2dJdGVtcygpO1xyXG4gIH1cclxuXHJcbiAgbG9hZENhdGFsb2dCYXNlTGF5ZXJJdGVtcyhjYXRhbG9nOiBDYXRhbG9nKTogT2JzZXJ2YWJsZTxDYXRhbG9nSXRlbUdyb3VwW10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldENhdGFsb2dCYXNlTGF5ZXJzT3B0aW9ucyhjYXRhbG9nKS5waXBlKFxyXG4gICAgICBtYXAoKGxheWVyc09wdGlvbnM6IExheWVyT3B0aW9uc1tdKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaXRlbXMgPSBsYXllcnNPcHRpb25zLm1hcCgobGF5ZXJPcHRpb25zOiBMYXllck9wdGlvbnMpID0+IHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGlkOiBnZW5lcmF0ZUlkRnJvbVNvdXJjZU9wdGlvbnMobGF5ZXJPcHRpb25zLnNvdXJjZU9wdGlvbnMpLFxyXG4gICAgICAgICAgICB0aXRsZTogbGF5ZXJPcHRpb25zLnRpdGxlLFxyXG4gICAgICAgICAgICB0eXBlOiBDYXRhbG9nSXRlbVR5cGUuTGF5ZXIsXHJcbiAgICAgICAgICAgIG9wdGlvbnM6IGxheWVyT3B0aW9uc1xyXG4gICAgICAgICAgfSBhcyBDYXRhbG9nSXRlbUxheWVyO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAnY2F0YWxvZy5ncm91cC5iYXNlbGF5ZXJzJyxcclxuICAgICAgICAgICAgdHlwZTogQ2F0YWxvZ0l0ZW1UeXBlLkdyb3VwLFxyXG4gICAgICAgICAgICB0aXRsZTogY2F0YWxvZy50aXRsZSxcclxuICAgICAgICAgICAgaXRlbXNcclxuICAgICAgICAgIH1cclxuICAgICAgICBdO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0Q2F0YWxvZ0Jhc2VMYXllcnNPcHRpb25zKFxyXG4gICAgY2F0YWxvZzogQ2F0YWxvZ1xyXG4gICk6IE9ic2VydmFibGU8TGF5ZXJPcHRpb25zW10+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExheWVyT3B0aW9uc1tdPihjYXRhbG9nLnVybCk7XHJcbiAgfVxyXG5cclxuICBsb2FkQ2F0YWxvZ1dNU0xheWVySXRlbXMoY2F0YWxvZzogQ2F0YWxvZyk6IE9ic2VydmFibGU8Q2F0YWxvZ0l0ZW1bXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2F0YWxvZ0NhcGFiaWxpdGllcyhjYXRhbG9nKS5waXBlKFxyXG4gICAgICBtYXAoKGNhcGFiaWxpdGllczogYW55KSA9PiB7XHJcbiAgICAgICAgY29uc3QgaXRlbXMgPSBbXTtcclxuICAgICAgICB0aGlzLmluY2x1ZGVSZWN1cnNpdmVJdGVtcyhcclxuICAgICAgICAgIGNhdGFsb2csXHJcbiAgICAgICAgICBjYXBhYmlsaXRpZXMuQ2FwYWJpbGl0eS5MYXllcixcclxuICAgICAgICAgIGl0ZW1zXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gaXRlbXM7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgbG9hZENhdGFsb2dXTVRTTGF5ZXJJdGVtcyhjYXRhbG9nOiBDYXRhbG9nKTogT2JzZXJ2YWJsZTxDYXRhbG9nSXRlbVtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRDYXRhbG9nQ2FwYWJpbGl0aWVzKGNhdGFsb2cpLnBpcGUoXHJcbiAgICAgIG1hcCgoY2FwYWJpbGl0aWVzOiBhbnkpID0+IHRoaXMuZ2V0V01UU0l0ZW1zKGNhdGFsb2csIGNhcGFiaWxpdGllcykpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgbG9hZENhdGFsb2dDb21wb3NpdGVMYXllckl0ZW1zKGNhdGFsb2c6IENhdGFsb2cpOiBPYnNlcnZhYmxlPENhdGFsb2dJdGVtW10+IHtcclxuICAgIGNvbnN0IGNvbXBvc2l0ZUNhdGFsb2cgPSAoY2F0YWxvZyBhcyBDb21wb3NpdGVDYXRhbG9nKS5jb21wb3NpdGU7XHJcblxyXG4gICAgY29uc3QgY2F0YWxvZ3NGcm9tSW5zdGFuY2UgPSBbXSBhcyBDYXRhbG9nW107XHJcbiAgICBjb21wb3NpdGVDYXRhbG9nLm1hcCgoY29tcG9uZW50OiBDYXRhbG9nKSA9PlxyXG4gICAgICBjYXRhbG9nc0Zyb21JbnN0YW5jZS5wdXNoKFxyXG4gICAgICAgIENhdGFsb2dGYWN0b3J5LmNyZWF0ZUluc3RhbmNlQ2F0YWxvZyhjb21wb25lbnQsIHRoaXMpXHJcbiAgICAgIClcclxuICAgICk7XHJcblxyXG4gICAgLy8gZ2V0IENhdGFsb2dJdGVtcyBmb3IgZWFjaCBvcmlnaW5hbCBDYXRhbG9nLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIGNvbnN0IHJlcXVlc3QxJCA9IFtdO1xyXG4gICAgY2F0YWxvZ3NGcm9tSW5zdGFuY2UubWFwKChjb21wb25lbnQ6IENhdGFsb2cpID0+XHJcbiAgICAgIHJlcXVlc3QxJC5wdXNoKGNvbXBvbmVudC5jb2xsZWN0Q2F0YWxvZ0l0ZW1zKCkpXHJcbiAgICApO1xyXG5cclxuICAgIC8vIGludGVncmF0ZSBpbXBvc2VkIGdyb3VwIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBsZXQgcmVxdWVzdDIkID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gZmxhdERlZXBMYXllcihhcnIpIHtcclxuICAgICAgcmV0dXJuIGFyci5yZWR1Y2UoXHJcbiAgICAgICAgKGFjYywgdmFsKSA9PlxyXG4gICAgICAgICAgYWNjLmNvbmNhdChcclxuICAgICAgICAgICAgdmFsLnR5cGUgPT09IENhdGFsb2dJdGVtVHlwZS5Hcm91cCA/IGZsYXREZWVwTGF5ZXIodmFsLml0ZW1zKSA6IHZhbFxyXG4gICAgICAgICAgKSxcclxuICAgICAgICBbXVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChcclxuICAgICAgT2JqZWN0LmtleXMoY29tcG9zaXRlQ2F0YWxvZykuZmluZChrID0+IGNvbXBvc2l0ZUNhdGFsb2dba10uZ3JvdXBJbXBvc2UpXHJcbiAgICApIHtcclxuICAgICAgY29uc3QgcHVzaEltcG9zZUdyb3VwID0gKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgY29uc3QgYyA9IGNhdGFsb2dzRnJvbUluc3RhbmNlW2luZGV4XTtcclxuICAgICAgICBjb25zdCBvdXRHcm91cEltcG9zZSA9IE9iamVjdC5hc3NpZ24oe30sIGMuZ3JvdXBJbXBvc2UpO1xyXG4gICAgICAgIG91dEdyb3VwSW1wb3NlLmFkZHJlc3MgPSBjLmlkO1xyXG4gICAgICAgIG91dEdyb3VwSW1wb3NlLnR5cGUgPSBDYXRhbG9nSXRlbVR5cGUuR3JvdXA7XHJcbiAgICAgICAgb3V0R3JvdXBJbXBvc2UuaXRlbXMgPSBbXTtcclxuXHJcbiAgICAgICAgY29uc3QgZmxhdExheWVyID0gZmxhdERlZXBMYXllcihpdGVtKTtcclxuICAgICAgICBmbGF0TGF5ZXIubWFwKFxyXG4gICAgICAgICAgdiA9PiAodi5hZGRyZXNzID0gYCR7b3V0R3JvdXBJbXBvc2UuYWRkcmVzc30uJHtvdXRHcm91cEltcG9zZS5pZH1gKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgb3V0R3JvdXBJbXBvc2UuaXRlbXMgPSBmbGF0TGF5ZXI7XHJcblxyXG4gICAgICAgIHJldHVybiBvdXRHcm91cEltcG9zZTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHJlcXVlc3QyJCA9IHJlcXVlc3QxJC5tYXAoKG9icywgaWR4KSA9PlxyXG4gICAgICAgIG9icy5waXBlKFxyXG4gICAgICAgICAgbWFwKGl0ZW1zID0+XHJcbiAgICAgICAgICAgIGNvbXBvc2l0ZUNhdGFsb2dbaWR4XS5ncm91cEltcG9zZVxyXG4gICAgICAgICAgICAgID8gcHVzaEltcG9zZUdyb3VwKGl0ZW1zLCBpZHgpXHJcbiAgICAgICAgICAgICAgOiBpdGVtc1xyXG4gICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlcXVlc3QyJCA9IHJlcXVlc3QxJDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjb25jYXQgR3JvdXAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIGNvbnN0IHJlcXVlc3QzJCA9IHppcCguLi5yZXF1ZXN0MiQpLnBpcGUoXHJcbiAgICAgIG1hcChcclxuICAgICAgICAob3V0cHV0OiBDYXRhbG9nSXRlbVtdKSA9PiBbXS5jb25jYXQoLi4ub3V0cHV0KSAvLyBbXS5jb25jYXQuYXBwbHkoW10sIHJlc3VsdDFcclxuICAgICAgKVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBtZXJnZSBHcm91cCAoZmlyc3QgbGV2ZWwgb25seSkgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIGNvbnN0IGdyb3VwQnlHcm91cElkID0gKGRhdGEsIGtleUZuKSA9PlxyXG4gICAgICBkYXRhLnJlZHVjZSgoYWNjLCBncm91cCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGdyb3VwSWQgPSBrZXlGbihncm91cCk7XHJcbiAgICAgICAgY29uc3QgaW5kID0gYWNjLmZpbmQoeCA9PiB4LmlkID09PSBncm91cElkKTtcclxuXHJcbiAgICAgICAgaWYgKCFpbmQpIHtcclxuICAgICAgICAgIGFjY1thY2MubGVuZ3RoXSA9IGdyb3VwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zdCBpeCA9IGFjYy5pbmRleE9mKGluZCk7XHJcbiAgICAgICAgICBpZiAoYWNjW2l4XS5hZGRyZXNzLnNwbGl0KCd8JykuaW5kZXhPZihncm91cC5hZGRyZXNzKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgYWNjW2l4XS5hZGRyZXNzID0gYCR7YWNjW2l4XS5hZGRyZXNzfXwke2dyb3VwLmFkZHJlc3N9YDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGFjY1tpeF0uaXRlbXMucHVzaCguLi5ncm91cC5pdGVtcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgIH0sIFtdKTtcclxuXHJcbiAgICAvLyBtZXJnZSBMYXllciBmb3IgZWFjaCBMZXZlbCAoY2F0YWxvZywgZ3JvdXAocmVjdXJzaXZlKSlcclxuICAgIGNvbnN0IHJlY3Vyc2l2ZUdyb3VwQnlMYXllckFkZHJlc3MgPSAoaXRlbXMsIGtleUZuKSA9PlxyXG4gICAgICBpdGVtcy5yZWR1Y2UoKGFjYywgaXRlbSwgaWR4LCBhcnIpID0+IHtcclxuICAgICAgICBjb25zdCBsYXllclRpdGxlID0ga2V5Rm4oaXRlbSk7XHJcbiAgICAgICAgY29uc3Qgb3V0SXRlbSA9IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pO1xyXG5cclxuICAgICAgICBpZiAoaXRlbS50eXBlID09PSBDYXRhbG9nSXRlbVR5cGUuTGF5ZXIpIHtcclxuICAgICAgICAgIC8vIHNhbWUgdGl0bGUsIHNhbWUgYWRkcmVzcyA9PiByZXN1bHQ6IG9ubHkgb25lIGl0ZW0gaXMga2VlcFxyXG5cclxuICAgICAgICAgIC8vIHNhbWUgdGl0bGUsIGFkZHJlc3MgZGlmZlxyXG4gICAgICAgICAgY29uc3QgaW5kaWNlc01hdGNoVGl0bGUgPSBbXTtcclxuICAgICAgICAgIGNvbnN0IGRpZmZBZGRyZXNzID0gYXJyLmZpbHRlcigoeCwgaSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgYkluZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoeC50aXRsZSA9PT0gbGF5ZXJUaXRsZSAmJiB4LnR5cGUgPT09IENhdGFsb2dJdGVtVHlwZS5MYXllcikge1xyXG4gICAgICAgICAgICAgIGlmIChpICE9PSBpZHggJiYgeC5hZGRyZXNzICE9PSBpdGVtLmFkZHJlc3MpIHtcclxuICAgICAgICAgICAgICAgIGJJbmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpbmRpY2VzTWF0Y2hUaXRsZS5wdXNoKGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBiSW5kO1xyXG4gICAgICAgICAgfSk7IC8vICQmIGkgIT09IGlkeFxyXG5cclxuICAgICAgICAgIGlmIChkaWZmQWRkcmVzcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5Qb3NpdGlvbiA9IGluZGljZXNNYXRjaFRpdGxlLmZpbmRJbmRleCh4ID0+IHggPT09IGlkeCkgKyAxO1xyXG4gICAgICAgICAgICBvdXRJdGVtLnRpdGxlID0gYCR7aXRlbS50aXRsZX0gKCR7blBvc2l0aW9ufSlgOyAvLyBzb3VyY2U6ICR7aXRlbS5hZGRyZXNzLnNwbGl0KCcuJylbMF19XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3QgZXhpc3QgPSBhY2MuZmluZChcclxuICAgICAgICAgICAgeCA9PiB4LnRpdGxlID09PSBvdXRJdGVtLnRpdGxlICYmIHgudHlwZSA9PT0gQ2F0YWxvZ0l0ZW1UeXBlLkxheWVyXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgaWYgKCFleGlzdCkge1xyXG4gICAgICAgICAgICBhY2NbYWNjLmxlbmd0aF0gPSBvdXRJdGVtO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSBDYXRhbG9nSXRlbVR5cGUuR3JvdXApIHtcclxuICAgICAgICAgIG91dEl0ZW0uaXRlbXMgPSByZWN1cnNpdmVHcm91cEJ5TGF5ZXJBZGRyZXNzKFxyXG4gICAgICAgICAgICBpdGVtLml0ZW1zLFxyXG4gICAgICAgICAgICBsYXllciA9PiBsYXllci50aXRsZVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGFjY1thY2MubGVuZ3RoXSA9IG91dEl0ZW07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICB9LCBbXSk7XHJcblxyXG4gICAgY29uc3QgcmVxdWVzdDQkID0gcmVxdWVzdDMkLnBpcGUoXHJcbiAgICAgIG1hcChvdXRwdXQgPT4gZ3JvdXBCeUdyb3VwSWQob3V0cHV0LCBncm91cCA9PiBncm91cC5pZCkpLFxyXG4gICAgICBtYXAob3V0cHV0ID0+IFtdLmNvbmNhdCguLi5vdXRwdXQpKSxcclxuICAgICAgbWFwKGRhdGEgPT4gcmVjdXJzaXZlR3JvdXBCeUxheWVyQWRkcmVzcyhkYXRhLCBsYXllciA9PiBsYXllci50aXRsZSkpXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiByZXF1ZXN0NCQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldENhdGFsb2dDYXBhYmlsaXRpZXMoY2F0YWxvZzogQ2F0YWxvZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBjb25zdCBzVHlwZTogc3RyaW5nID0gVHlwZUNhdGFsb2dbY2F0YWxvZy50eXBlIGFzIHN0cmluZ107XHJcbiAgICByZXR1cm4gdGhpcy5jYXBhYmlsaXRpZXNTZXJ2aWNlLmdldENhcGFiaWxpdGllcyhcclxuICAgICAgVHlwZUNhcGFiaWxpdGllc1tzVHlwZV0sXHJcbiAgICAgIGNhdGFsb2cudXJsLFxyXG4gICAgICBjYXRhbG9nLnZlcnNpb25cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHByZXBhcmVDYXRhbG9nSXRlbUxheWVyKGxheWVyLCBpZFBhcmVudCwgbGF5ZXJzUXVlcnlGb3JtYXQsIGNhdGFsb2cpIHtcclxuICAgIGNvbnN0IGNvbmZpZ3VyZWRRdWVyeUZvcm1hdCA9IHRoaXMucmV0cml2ZUxheWVySW5mb0Zvcm1hdChcclxuICAgICAgbGF5ZXIuTmFtZSxcclxuICAgICAgbGF5ZXJzUXVlcnlGb3JtYXRcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgbWV0YWRhdGEgPSBsYXllci5EYXRhVVJMID8gbGF5ZXIuRGF0YVVSTFswXSA6IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IGxlZ2VuZE9wdGlvbnMgPVxyXG4gICAgICBjYXRhbG9nLnNob3dMZWdlbmQgJiYgbGF5ZXIuU3R5bGVcclxuICAgICAgICA/IHRoaXMuY2FwYWJpbGl0aWVzU2VydmljZS5nZXRTdHlsZShsYXllci5TdHlsZSlcclxuICAgICAgICA6IHVuZGVmaW5lZDtcclxuXHJcbiAgICBjb25zdCBwYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBjYXRhbG9nLnF1ZXJ5UGFyYW1zLCB7XHJcbiAgICAgIExBWUVSUzogbGF5ZXIuTmFtZSxcclxuICAgICAgVkVSU0lPTjogY2F0YWxvZy52ZXJzaW9uXHJcbiAgICB9IGFzIFdNU0RhdGFTb3VyY2VPcHRpb25zUGFyYW1zKTtcclxuXHJcbiAgICBjb25zdCBiYXNlU291cmNlT3B0aW9ucyA9IHtcclxuICAgICAgdHlwZTogJ3dtcycsXHJcbiAgICAgIHVybDogY2F0YWxvZy51cmwsXHJcbiAgICAgIGNyb3NzT3JpZ2luOiBjYXRhbG9nLnNldENyb3NzT3JpZ2luQW5vbnltb3VzID8gJ2Fub255bW91cycgOiB1bmRlZmluZWQsXHJcbiAgICAgIHF1ZXJ5Rm9ybWF0OiBjb25maWd1cmVkUXVlcnlGb3JtYXQsXHJcbiAgICAgIHF1ZXJ5SHRtbFRhcmdldDpcclxuICAgICAgICBjb25maWd1cmVkUXVlcnlGb3JtYXQgPT09IFF1ZXJ5Rm9ybWF0LkhUTUwgfHxcclxuICAgICAgICBjb25maWd1cmVkUXVlcnlGb3JtYXQgPT09IFF1ZXJ5Rm9ybWF0LkhUTUxHTUwyXHJcbiAgICAgICAgICA/ICdpZnJhbWUnXHJcbiAgICAgICAgICA6IHVuZGVmaW5lZCxcclxuICAgICAgb3B0aW9uc0Zyb21DYXBhYmlsaXRpZXM6IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgc291cmNlT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgIHt9LFxyXG4gICAgICBiYXNlU291cmNlT3B0aW9ucyxcclxuICAgICAgY2F0YWxvZy5zb3VyY2VPcHRpb25zLFxyXG4gICAgICB7IHBhcmFtcyB9XHJcbiAgICApIGFzIFdNU0RhdGFTb3VyY2VPcHRpb25zO1xyXG5cclxuICAgIGNvbnN0IGxheWVyUHJlcGFyZSA9IHtcclxuICAgICAgaWQ6IGdlbmVyYXRlSWRGcm9tU291cmNlT3B0aW9ucyhzb3VyY2VPcHRpb25zKSxcclxuICAgICAgdHlwZTogQ2F0YWxvZ0l0ZW1UeXBlLkxheWVyLFxyXG4gICAgICB0aXRsZTogbGF5ZXIuVGl0bGUsXHJcbiAgICAgIGFkZHJlc3M6IGlkUGFyZW50LFxyXG4gICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgbWF4UmVzb2x1dGlvbjogZ2V0UmVzb2x1dGlvbkZyb21TY2FsZShsYXllci5NYXhTY2FsZURlbm9taW5hdG9yKSxcclxuICAgICAgICBtaW5SZXNvbHV0aW9uOiBnZXRSZXNvbHV0aW9uRnJvbVNjYWxlKGxheWVyLk1pblNjYWxlRGVub21pbmF0b3IpLFxyXG4gICAgICAgIG1ldGFkYXRhOiB7XHJcbiAgICAgICAgICB1cmw6IG1ldGFkYXRhID8gbWV0YWRhdGEuT25saW5lUmVzb3VyY2UgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICBleHRlcm46IG1ldGFkYXRhID8gdHJ1ZSA6IHVuZGVmaW5lZFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGVnZW5kT3B0aW9ucyxcclxuICAgICAgICB0b29sdGlwOiB7IHR5cGU6IGNhdGFsb2cudG9vbHRpcFR5cGUgfSxcclxuICAgICAgICBzb3VyY2VPcHRpb25zXHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIE9iamVjdFV0aWxzLnJlbW92ZVVuZGVmaW5lZChsYXllclByZXBhcmUpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwcmVwYXJlQ2F0YWxvZ0l0ZW1Hcm91cChcclxuICAgIGl0ZW1MaXN0SW4sXHJcbiAgICByZWdleGVzLFxyXG4gICAgaWRHcm91cCxcclxuICAgIGxheWVyc1F1ZXJ5Rm9ybWF0LFxyXG4gICAgY2F0YWxvZ1xyXG4gICkge1xyXG4gICAgY29uc3QgZ3JvdXBQcmVwYXJlID0ge1xyXG4gICAgICBpZDogaWRHcm91cCxcclxuICAgICAgdHlwZTogQ2F0YWxvZ0l0ZW1UeXBlLkdyb3VwLFxyXG4gICAgICB0aXRsZTogaXRlbUxpc3RJbi5UaXRsZSxcclxuICAgICAgYWRkcmVzczogY2F0YWxvZy5pZCxcclxuICAgICAgaXRlbXM6IGl0ZW1MaXN0SW4uTGF5ZXIucmVkdWNlKChpdGVtczogQ2F0YWxvZ0l0ZW1bXSwgbGF5ZXI6IGFueSkgPT4ge1xyXG4gICAgICAgIGlmIChsYXllci5MYXllciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAvLyByZWN1cnNpdmUsIGNoZWNrIG5leHQgbGV2ZWxcclxuICAgICAgICAgIGNvbnN0IGlkR3JvdXBJdGVtTmV4dExldmVsID1cclxuICAgICAgICAgICAgaWRHcm91cCArIGAuZ3JvdXAuJHtsYXllci5OYW1lIHx8IGxheWVyLkxheWVyWzBdLk5hbWV9YDtcclxuICAgICAgICAgIGNvbnN0IGdyb3VwSXRlbTogQ2F0YWxvZ0l0ZW1Hcm91cCA9IHRoaXMucHJlcGFyZUNhdGFsb2dJdGVtR3JvdXAoXHJcbiAgICAgICAgICAgIGxheWVyLFxyXG4gICAgICAgICAgICByZWdleGVzLFxyXG4gICAgICAgICAgICBpZEdyb3VwSXRlbU5leHRMZXZlbCxcclxuICAgICAgICAgICAgbGF5ZXJzUXVlcnlGb3JtYXQsXHJcbiAgICAgICAgICAgIGNhdGFsb2dcclxuICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgaXRlbXMucHVzaChncm91cEl0ZW0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAodGhpcy50ZXN0TGF5ZXJSZWdleGVzKGxheWVyLk5hbWUsIHJlZ2V4ZXMpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaXRlbXM7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3QgbGF5ZXJJdGVtOiBDYXRhbG9nSXRlbUxheWVyPFxyXG4gICAgICAgICAgICBJbWFnZUxheWVyT3B0aW9uc1xyXG4gICAgICAgICAgPiA9IHRoaXMucHJlcGFyZUNhdGFsb2dJdGVtTGF5ZXIoXHJcbiAgICAgICAgICAgIGxheWVyLFxyXG4gICAgICAgICAgICBpZEdyb3VwLFxyXG4gICAgICAgICAgICBsYXllcnNRdWVyeUZvcm1hdCxcclxuICAgICAgICAgICAgY2F0YWxvZ1xyXG4gICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICBpdGVtcy5wdXNoKGxheWVySXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpdGVtcztcclxuICAgICAgfSwgW10pXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGdyb3VwUHJlcGFyZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5jbHVkZVJlY3Vyc2l2ZUl0ZW1zKFxyXG4gICAgY2F0YWxvZzogQ2F0YWxvZyxcclxuICAgIGl0ZW1MaXN0SW46IGFueSxcclxuICAgIGl0ZW1zUHJlcGFyZTogQ2F0YWxvZ0l0ZW1bXSxcclxuICAgIGxvb3BMZXZlbDogbnVtYmVyID0gMFxyXG4gICkge1xyXG4gICAgLy8gRGlnIGFsbCBsZXZlbHMgdW50aWwgbGFzdCBsZXZlbCAobGF5ZXIgb2JqZWN0IGFyZSBub3QgZGVmaW5lZCBvbiBsYXN0IGxldmVsKVxyXG4gICAgY29uc3QgcmVnZXhlcyA9IChjYXRhbG9nLnJlZ0ZpbHRlcnMgfHwgW10pLm1hcChcclxuICAgICAgKHBhdHRlcm46IHN0cmluZykgPT4gbmV3IFJlZ0V4cChwYXR0ZXJuKVxyXG4gICAgKTtcclxuICAgIGlmICghaXRlbUxpc3RJbi5MYXllcikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1MaXN0SW4uTGF5ZXIpIHtcclxuICAgICAgaWYgKGl0ZW0uTGF5ZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIC8vIHJlY3Vyc2l2ZSwgY2hlY2sgbmV4dCBsZXZlbFxyXG4gICAgICAgIHRoaXMuaW5jbHVkZVJlY3Vyc2l2ZUl0ZW1zKGNhdGFsb2csIGl0ZW0sIGl0ZW1zUHJlcGFyZSwgbG9vcExldmVsICsgMSk7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGxheWVyc1F1ZXJ5Rm9ybWF0ID0gdGhpcy5maW5kQ2F0YWxvZ0luZm9Gb3JtYXQoY2F0YWxvZyk7XHJcblxyXG4gICAgICAvLyBncm91cCh3aXRoIGxheWVycykgYW5kIGxheWVyKHdpdGhvdXQgZ3JvdXApIGxldmVsIDFcclxuICAgICAgaWYgKGxvb3BMZXZlbCAhPT0gMCkge1xyXG4gICAgICAgIC8vIFRPRE86IFNsaWNlIHRoYXQgaW50byBtdWx0aXBsZSBtZXRob2RzXHJcbiAgICAgICAgLy8gRGVmaW5lIG9iamVjdCBvZiBncm91cCBsYXllclxyXG4gICAgICAgIGNvbnN0IGlkR3JvdXBJdGVtID0gYGNhdGFsb2cuZ3JvdXAuJHtpdGVtTGlzdEluLk5hbWUgfHwgaXRlbS5OYW1lfWA7XHJcbiAgICAgICAgY29uc3QgZ3JvdXBJdGVtID0gdGhpcy5wcmVwYXJlQ2F0YWxvZ0l0ZW1Hcm91cChcclxuICAgICAgICAgIGl0ZW1MaXN0SW4sXHJcbiAgICAgICAgICByZWdleGVzLFxyXG4gICAgICAgICAgaWRHcm91cEl0ZW0sXHJcbiAgICAgICAgICBsYXllcnNRdWVyeUZvcm1hdCxcclxuICAgICAgICAgIGNhdGFsb2dcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBpZiAoZ3JvdXBJdGVtLml0ZW1zLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgaXRlbXNQcmVwYXJlLnB1c2goZ3JvdXBJdGVtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEJyZWFrIHRoZSBncm91cCAoZG9uJ3QgYWRkIGEgZ3JvdXAgb2YgbGF5ZXIgZm9yIGVhY2ggb2YgdGhlaXIgbGF5ZXIhKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIGxheWVyIHdpdGhvdXQgZ3JvdXBcclxuICAgICAgICBpZiAodGhpcy50ZXN0TGF5ZXJSZWdleGVzKGl0ZW0uTmFtZSwgcmVnZXhlcykgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICBjb25zdCBsYXllckl0ZW0gPSB0aGlzLnByZXBhcmVDYXRhbG9nSXRlbUxheWVyKFxyXG4gICAgICAgICAgICBpdGVtLFxyXG4gICAgICAgICAgICBjYXRhbG9nLmlkLFxyXG4gICAgICAgICAgICBsYXllcnNRdWVyeUZvcm1hdCxcclxuICAgICAgICAgICAgY2F0YWxvZ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGl0ZW1zUHJlcGFyZS5wdXNoKGxheWVySXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFdNVFNJdGVtcyhcclxuICAgIGNhdGFsb2c6IENhdGFsb2csXHJcbiAgICBjYXBhYmlsaXRpZXM6IHsgW2tleTogc3RyaW5nXTogYW55IH1cclxuICApOiBDYXRhbG9nSXRlbUxheWVyW10ge1xyXG4gICAgY29uc3QgbGF5ZXJzID0gY2FwYWJpbGl0aWVzLkNvbnRlbnRzLkxheWVyO1xyXG4gICAgY29uc3QgcmVnZXhlcyA9IChjYXRhbG9nLnJlZ0ZpbHRlcnMgfHwgW10pLm1hcChcclxuICAgICAgKHBhdHRlcm46IHN0cmluZykgPT4gbmV3IFJlZ0V4cChwYXR0ZXJuKVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gbGF5ZXJzXHJcbiAgICAgIC5tYXAoKGxheWVyOiBhbnkpID0+IHtcclxuICAgICAgICBpZiAodGhpcy50ZXN0TGF5ZXJSZWdleGVzKGxheWVyLklkZW50aWZpZXIsIHJlZ2V4ZXMpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgY2F0YWxvZy5xdWVyeVBhcmFtcywge1xyXG4gICAgICAgICAgdmVyc2lvbjogJzEuMC4wJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IGJhc2VTb3VyY2VPcHRpb25zID0ge1xyXG4gICAgICAgICAgdHlwZTogJ3dtdHMnLFxyXG4gICAgICAgICAgdXJsOiBjYXRhbG9nLnVybCxcclxuICAgICAgICAgIGNyb3NzT3JpZ2luOiBjYXRhbG9nLnNldENyb3NzT3JpZ2luQW5vbnltb3VzXHJcbiAgICAgICAgICAgID8gJ2Fub255bW91cydcclxuICAgICAgICAgICAgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICBsYXllcjogbGF5ZXIuSWRlbnRpZmllcixcclxuICAgICAgICAgIG1hdHJpeFNldDogY2F0YWxvZy5tYXRyaXhTZXQsXHJcbiAgICAgICAgICBvcHRpb25zRnJvbUNhcGFiaWxpdGllczogdHJ1ZSxcclxuICAgICAgICAgIHJlcXVlc3RFbmNvZGluZzogY2F0YWxvZy5yZXF1ZXN0RW5jb2RpbmcgfHwgJ0tWUCcsXHJcbiAgICAgICAgICBzdHlsZTogJ2RlZmF1bHQnXHJcbiAgICAgICAgfSBhcyBXTVRTRGF0YVNvdXJjZU9wdGlvbnM7XHJcbiAgICAgICAgY29uc3Qgc291cmNlT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAgICB7fSxcclxuICAgICAgICAgIGJhc2VTb3VyY2VPcHRpb25zLFxyXG4gICAgICAgICAgY2F0YWxvZy5zb3VyY2VPcHRpb25zLFxyXG4gICAgICAgICAgeyBwYXJhbXMgfVxyXG4gICAgICAgICkgYXMgV01UU0RhdGFTb3VyY2VPcHRpb25zO1xyXG5cclxuICAgICAgICByZXR1cm4gT2JqZWN0VXRpbHMucmVtb3ZlVW5kZWZpbmVkKHtcclxuICAgICAgICAgIGlkOiBnZW5lcmF0ZUlkRnJvbVNvdXJjZU9wdGlvbnMoc291cmNlT3B0aW9ucyksXHJcbiAgICAgICAgICB0eXBlOiBDYXRhbG9nSXRlbVR5cGUuTGF5ZXIsXHJcbiAgICAgICAgICB0aXRsZTogbGF5ZXIuVGl0bGUsXHJcbiAgICAgICAgICBhZGRyZXNzOiBjYXRhbG9nLmlkLFxyXG4gICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICBzb3VyY2VPcHRpb25zXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5maWx0ZXIoKGl0ZW06IENhdGFsb2dJdGVtTGF5ZXIgfCB1bmRlZmluZWQpID0+IGl0ZW0gIT09IHVuZGVmaW5lZCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRlc3RMYXllclJlZ2V4ZXMobGF5ZXJOYW1lOiBzdHJpbmcsIHJlZ2V4ZXM6IFJlZ0V4cFtdKTogYm9vbGVhbiB7XHJcbiAgICBpZiAocmVnZXhlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVnZXhlcy5maW5kKChyZWdleDogUmVnRXhwKSA9PiByZWdleC50ZXN0KGxheWVyTmFtZSkpICE9PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJldHJpdmVMYXllckluZm9Gb3JtYXQoXHJcbiAgICBsYXllck5hbWVGcm9tQ2F0YWxvZzogc3RyaW5nLFxyXG4gICAgbGF5ZXJzUXVlcnlGb3JtYXQ6IHsgbGF5ZXI6IHN0cmluZzsgcXVlcnlGb3JtYXQ6IFF1ZXJ5Rm9ybWF0IH1bXVxyXG4gICk6IFF1ZXJ5Rm9ybWF0IHtcclxuICAgIGNvbnN0IGN1cnJlbnRMYXllckluZm9Gb3JtYXQgPSBsYXllcnNRdWVyeUZvcm1hdC5maW5kKFxyXG4gICAgICBmID0+IGYubGF5ZXIgPT09IGxheWVyTmFtZUZyb21DYXRhbG9nXHJcbiAgICApO1xyXG4gICAgY29uc3QgYmFzZUluZm9Gb3JtYXQgPSBsYXllcnNRdWVyeUZvcm1hdC5maW5kKGYgPT4gZi5sYXllciA9PT0gJyonKTtcclxuICAgIGxldCBxdWVyeUZvcm1hdDogUXVlcnlGb3JtYXQ7XHJcbiAgICBpZiAoY3VycmVudExheWVySW5mb0Zvcm1hdCkge1xyXG4gICAgICBxdWVyeUZvcm1hdCA9IGN1cnJlbnRMYXllckluZm9Gb3JtYXQucXVlcnlGb3JtYXQ7XHJcbiAgICB9IGVsc2UgaWYgKGJhc2VJbmZvRm9ybWF0KSB7XHJcbiAgICAgIHF1ZXJ5Rm9ybWF0ID0gYmFzZUluZm9Gb3JtYXQucXVlcnlGb3JtYXQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcXVlcnlGb3JtYXQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZpbmRDYXRhbG9nSW5mb0Zvcm1hdChcclxuICAgIGNhdGFsb2c6IENhdGFsb2dcclxuICApOiB7IGxheWVyOiBzdHJpbmc7IHF1ZXJ5Rm9ybWF0OiBRdWVyeUZvcm1hdCB9W10ge1xyXG4gICAgY29uc3QgbGF5ZXJzUXVlcnlGb3JtYXQ6IHsgbGF5ZXI6IHN0cmluZzsgcXVlcnlGb3JtYXQ6IFF1ZXJ5Rm9ybWF0IH1bXSA9IFtdO1xyXG4gICAgaWYgKCFjYXRhbG9nLnF1ZXJ5Rm9ybWF0KSB7XHJcbiAgICAgIHJldHVybiBsYXllcnNRdWVyeUZvcm1hdDtcclxuICAgIH1cclxuICAgIE9iamVjdC5rZXlzKGNhdGFsb2cucXVlcnlGb3JtYXQpLmZvckVhY2goY29uZmlndXJlZEluZm9Gb3JtYXQgPT4ge1xyXG4gICAgICBpZiAoY2F0YWxvZy5xdWVyeUZvcm1hdFtjb25maWd1cmVkSW5mb0Zvcm1hdF0gaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgIGNhdGFsb2cucXVlcnlGb3JtYXRbY29uZmlndXJlZEluZm9Gb3JtYXRdLmZvckVhY2gobGF5ZXJOYW1lID0+IHtcclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgIWxheWVyc1F1ZXJ5Rm9ybWF0LmZpbmQoc3BlY2lmaWMgPT4gc3BlY2lmaWMubGF5ZXIgPT09IGxheWVyTmFtZSlcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICBsYXllcnNRdWVyeUZvcm1hdC5wdXNoKHtcclxuICAgICAgICAgICAgICBsYXllcjogbGF5ZXJOYW1lLFxyXG4gICAgICAgICAgICAgIHF1ZXJ5Rm9ybWF0OiBjb25maWd1cmVkSW5mb0Zvcm1hdCBhcyBRdWVyeUZvcm1hdFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAhbGF5ZXJzUXVlcnlGb3JtYXQuZmluZChcclxuICAgICAgICAgICAgc3BlY2lmaWMgPT5cclxuICAgICAgICAgICAgICBzcGVjaWZpYy5sYXllciA9PT0gY2F0YWxvZy5xdWVyeUZvcm1hdFtjb25maWd1cmVkSW5mb0Zvcm1hdF1cclxuICAgICAgICAgIClcclxuICAgICAgICApIHtcclxuICAgICAgICAgIGxheWVyc1F1ZXJ5Rm9ybWF0LnB1c2goe1xyXG4gICAgICAgICAgICBsYXllcjogY2F0YWxvZy5xdWVyeUZvcm1hdFtjb25maWd1cmVkSW5mb0Zvcm1hdF0sXHJcbiAgICAgICAgICAgIHF1ZXJ5Rm9ybWF0OiBjb25maWd1cmVkSW5mb0Zvcm1hdCBhcyBRdWVyeUZvcm1hdFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBsYXllcnNRdWVyeUZvcm1hdDtcclxuICB9XHJcbn1cclxuIl19