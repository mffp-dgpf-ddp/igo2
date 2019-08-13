/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
        if (apiUrl === undefined) {
            return of(catalogsFromConfig);
        }
        /** @type {?} */
        var observables$ = [];
        // Base layers catalog
        if (catalogConfig.baseLayers) {
            /** @type {?} */
            var translate = this.languageService.translate;
            /** @type {?} */
            var title = translate.instant('igo.geo.catalog.baseLayers');
            /** @type {?} */
            var baseLayersCatalog = {
                id: 'catalog.baselayers',
                title: title,
                url: apiUrl + "/baselayers",
                type: 'baselayers'
            };
            observables$.push(of(baseLayersCatalog));
        }
        // Catalogs from API
        /** @type {?} */
        var catalogsFromApi$ = this.http
            .get(apiUrl + "/catalogs")
            .pipe(catchError((/**
         * @param {?} response
         * @return {?}
         */
        function (response) { return EMPTY; })));
        observables$.push(catalogsFromApi$);
        // Catalogs from config
        if (catalogsFromConfig.length > 0) {
            observables$.push(of(catalogsFromConfig));
        }
        return (/** @type {?} */ (concat.apply(void 0, tslib_1.__spread(observables$))));
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
        if (catalog.type === 'baselayers') {
            return this.loadCatalogBaseLayerItems(catalog);
        }
        else if (catalog.type === 'wmts') {
            return this.loadCatalogWMTSLayerItems(catalog);
        }
        return this.loadCatalogWMSLayerItems(catalog);
    };
    /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    CatalogService.prototype.loadCatalogBaseLayerItems = /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    function (catalog) {
        // TODO: I'm not sure this works
        return this.getCatalogBaseLayersOptions(catalog)
            .pipe(map((/**
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
            return [{
                    id: 'catalog.group.baselayers',
                    type: CatalogItemType.Group,
                    title: catalog.title,
                    items: items
                }];
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
     * @private
     * @param {?} catalog
     * @return {?}
     */
    CatalogService.prototype.loadCatalogWMSLayerItems = /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    function (catalog) {
        var _this = this;
        return this.getCatalogWMSCapabilities(catalog)
            .pipe(map((/**
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
     * @private
     * @param {?} catalog
     * @return {?}
     */
    CatalogService.prototype.loadCatalogWMTSLayerItems = /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    function (catalog) {
        var _this = this;
        return this.getCatalogWMTSCapabilities(catalog)
            .pipe(map((/**
         * @param {?} capabilities
         * @return {?}
         */
        function (capabilities) { return _this.getWMTSItems(catalog, capabilities); })));
    };
    /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    CatalogService.prototype.getCatalogWMSCapabilities = /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    function (catalog) {
        return this.capabilitiesService.getCapabilities('wms', catalog.url, catalog.version);
    };
    /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    CatalogService.prototype.getCatalogWMTSCapabilities = /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    function (catalog) {
        return this.capabilitiesService.getCapabilities('wmts', catalog.url, catalog.version);
    };
    /**
     * @private
     * @param {?} catalog
     * @param {?} layerList
     * @param {?} items
     * @return {?}
     */
    CatalogService.prototype.includeRecursiveItems = /**
     * @private
     * @param {?} catalog
     * @param {?} layerList
     * @param {?} items
     * @return {?}
     */
    function (catalog, layerList, items) {
        var _this = this;
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
        var _loop_1 = function (group) {
            if (group.Layer !== undefined) {
                // recursive, check next level
                this_1.includeRecursiveItems(catalog, group, items);
                return "continue";
            }
            /** @type {?} */
            var catalogTooltipType = this_1.retrieveTooltipType(catalog);
            /** @type {?} */
            var layersQueryFormat = this_1.findCatalogInfoFormat(catalog);
            // TODO: Slice that into multiple methods
            // Define object of group layer
            /** @type {?} */
            var groupItem = {
                id: "catalog.group." + layerList.Name,
                type: CatalogItemType.Group,
                title: layerList.Title,
                items: layerList.Layer.reduce((/**
                 * @param {?} layers
                 * @param {?} layer
                 * @return {?}
                 */
                function (layers, layer) {
                    /** @type {?} */
                    var configuredQueryFormat = _this.retriveLayerInfoFormat(layer.Name, layersQueryFormat);
                    if (_this.testLayerRegexes(layer.Name, regexes) === false) {
                        return layers;
                    }
                    /** @type {?} */
                    var metadata = layer.DataURL ? layer.DataURL[0] : undefined;
                    /** @type {?} */
                    var abstract = layer.Abstract ? layer.Abstract : undefined;
                    /** @type {?} */
                    var keywordList = layer.KeywordList ? layer.KeywordList : undefined;
                    /** @type {?} */
                    var timeFilter = _this.capabilitiesService.getTimeFilter(layer);
                    /** @type {?} */
                    var timeFilterable = timeFilter && Object.keys(timeFilter).length > 0 ? true : false;
                    /** @type {?} */
                    var params = Object.assign({}, catalogQueryParams, {
                        layers: layer.Name,
                        feature_count: catalog.count
                    });
                    /** @type {?} */
                    var baseSourceOptions = {
                        type: 'wms',
                        url: catalog.url,
                        crossOrigin: catalog.setCrossOriginAnonymous ? 'anonymous' : undefined,
                        timeFilter: tslib_1.__assign({}, timeFilter, catalog.timeFilter),
                        timeFilterable: timeFilterable ? true : false,
                        queryable: layer.queryable,
                        queryFormat: configuredQueryFormat,
                        queryHtmlTarget: catalog.queryHtmlTarget || QueryHtmlTarget.IFRAME
                    };
                    /** @type {?} */
                    var sourceOptions = (/** @type {?} */ (Object.assign({}, baseSourceOptions, catalogSourceOptions, { params: params })));
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
                                abstract: abstract,
                                keywordList: keywordList
                            },
                            tooltip: (/** @type {?} */ ({ type: catalogTooltipType })),
                            sourceOptions: sourceOptions
                        }
                    });
                    return layers;
                }), [])
            };
            if (groupItem.items.length !== 0) {
                items.push(groupItem);
            }
            return "break";
        };
        var this_1 = this;
        try {
            for (var _b = tslib_1.__values(layerList.Layer), _c = _b.next(); !_c.done; _c = _b.next()) {
                var group = _c.value;
                var state_1 = _loop_1(group);
                if (state_1 === "break")
                    break;
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
        return layers.map((/**
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
                crossOrigin: catalog.setCrossOriginAnonymous ? 'anonymous' : undefined,
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
                options: {
                    title: layer.Title,
                    sourceOptions: sourceOptions
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
                        layersQueryFormat.push({ layer: layerName, queryFormat: (/** @type {?} */ (configuredInfoFormat)) });
                    }
                }));
            }
            else {
                if (!layersQueryFormat.find((/**
                 * @param {?} specific
                 * @return {?}
                 */
                function (specific) { return specific.layer === catalog.queryFormat[configuredInfoFormat]; }))) {
                    layersQueryFormat.push({ layer: catalog.queryFormat[configuredInfoFormat], queryFormat: (/** @type {?} */ (configuredInfoFormat)) });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2NhdGFsb2cvc2hhcmVkL2NhdGFsb2cuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBcUIsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRSxPQUFPLEVBQUUsS0FBSyxFQUFjLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDckQsT0FBTyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRCxPQUFPLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM1RCxPQUFPLEVBQ0wsbUJBQW1CLEVBR25CLDJCQUEyQixFQUM1QixNQUFNLGtCQUFrQixDQUFDO0FBQzFCLE9BQU8sRUFBbUQsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzNGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQVFuRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBZSxNQUFNLGFBQWEsQ0FBQzs7Ozs7QUFFM0Q7SUFLRSx3QkFDVSxJQUFnQixFQUNoQixNQUFxQixFQUNyQixlQUFnQyxFQUNoQyxtQkFBd0M7UUFIeEMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3JCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO0lBQy9DLENBQUM7Ozs7SUFFSixxQ0FBWTs7O0lBQVo7O1lBQ1EsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVB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QUFLLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxtQkFBQSxvQkFBb0IsRUFBZSxFQUFFLENBQUMsQ0FBQztxQkFDaEc7Z0JBQ0gsQ0FBQyxFQUFDLENBQUM7YUFDSjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSTs7OztnQkFBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxLQUFLLEtBQUssT0FBTyxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxFQUE1RCxDQUE0RCxFQUFDLEVBQUU7b0JBQ3JHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLG9CQUFvQixDQUFDLEVBQUUsV0FBVyxFQUFFLG1CQUFBLG9CQUFvQixFQUFlLEVBQUUsQ0FBQyxDQUFDO2lCQUNoSTthQUNGO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFDSCxPQUFPLGlCQUFpQixDQUFDO0lBQzNCLENBQUM7O2dCQXhTRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQXpCUSxVQUFVO2dCQUlPLGFBQWE7Z0JBQTlCLGVBQWU7Z0JBRXRCLG1CQUFtQjs7O3lCQVByQjtDQWlVQyxBQXpTRCxJQXlTQztTQXRTWSxjQUFjOzs7Ozs7SUFHdkIsOEJBQXdCOzs7OztJQUN4QixnQ0FBNkI7Ozs7O0lBQzdCLHlDQUF3Qzs7Ozs7SUFDeEMsNkNBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgRU1QVFksIE9ic2VydmFibGUsIG9mLCBjb25jYXQgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwLCBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgTGFuZ3VhZ2VTZXJ2aWNlLCBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQ2FwYWJpbGl0aWVzU2VydmljZSxcclxuICBXTVNEYXRhU291cmNlT3B0aW9ucyxcclxuICBXTVRTRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgZ2VuZXJhdGVJZEZyb21Tb3VyY2VPcHRpb25zXHJcbn0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IExheWVyT3B0aW9ucywgSW1hZ2VMYXllck9wdGlvbnMsIFRvb2x0aXBDb250ZW50LCBUb29sdGlwVHlwZSB9IGZyb20gJy4uLy4uL2xheWVyJztcclxuaW1wb3J0IHsgZ2V0UmVzb2x1dGlvbkZyb21TY2FsZSB9IGZyb20gJy4uLy4uL21hcCc7XHJcblxyXG5pbXBvcnQge1xyXG4gIENhdGFsb2csXHJcbiAgQ2F0YWxvZ0l0ZW0sXHJcbiAgQ2F0YWxvZ0l0ZW1MYXllcixcclxuICBDYXRhbG9nSXRlbUdyb3VwXHJcbn0gZnJvbSAnLi9jYXRhbG9nLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IENhdGFsb2dJdGVtVHlwZSB9IGZyb20gJy4vY2F0YWxvZy5lbnVtJztcclxuaW1wb3J0IHsgUXVlcnlIdG1sVGFyZ2V0LCBRdWVyeUZvcm1hdCB9IGZyb20gJy4uLy4uL3F1ZXJ5JztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIENhdGFsb2dTZXJ2aWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNhcGFiaWxpdGllc1NlcnZpY2U6IENhcGFiaWxpdGllc1NlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIGxvYWRDYXRhbG9ncygpOiBPYnNlcnZhYmxlPENhdGFsb2dbXT4ge1xyXG4gICAgY29uc3QgY29udGV4dENvbmZpZyA9IHRoaXMuY29uZmlnLmdldENvbmZpZygnY29udGV4dCcpIHx8IHt9O1xyXG4gICAgY29uc3QgY2F0YWxvZ0NvbmZpZyA9IHRoaXMuY29uZmlnLmdldENvbmZpZygnY2F0YWxvZycpIHx8IHt9O1xyXG4gICAgY29uc3QgYXBpVXJsID0gY2F0YWxvZ0NvbmZpZy51cmwgfHwgY29udGV4dENvbmZpZy51cmw7XHJcbiAgICBjb25zdCBjYXRhbG9nc0Zyb21Db25maWcgPSBjYXRhbG9nQ29uZmlnLnNvdXJjZXMgfHwgW107XHJcblxyXG4gICAgaWYgKGFwaVVybCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiBvZihjYXRhbG9nc0Zyb21Db25maWcpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9ic2VydmFibGVzJCA9IFtdO1xyXG5cclxuICAgIC8vIEJhc2UgbGF5ZXJzIGNhdGFsb2dcclxuICAgIGlmIChjYXRhbG9nQ29uZmlnLmJhc2VMYXllcnMpIHtcclxuICAgICAgY29uc3QgdHJhbnNsYXRlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmNhdGFsb2cuYmFzZUxheWVycycpO1xyXG4gICAgICBjb25zdCBiYXNlTGF5ZXJzQ2F0YWxvZyA9IHtcclxuICAgICAgICBpZDogJ2NhdGFsb2cuYmFzZWxheWVycycsXHJcbiAgICAgICAgdGl0bGUsXHJcbiAgICAgICAgdXJsOiBgJHthcGlVcmx9L2Jhc2VsYXllcnNgLFxyXG4gICAgICAgIHR5cGU6ICdiYXNlbGF5ZXJzJ1xyXG4gICAgICB9O1xyXG4gICAgICBvYnNlcnZhYmxlcyQucHVzaChvZihiYXNlTGF5ZXJzQ2F0YWxvZykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENhdGFsb2dzIGZyb20gQVBJXHJcbiAgICBjb25zdCBjYXRhbG9nc0Zyb21BcGkkID0gdGhpcy5odHRwXHJcbiAgICAgIC5nZXQ8Q2F0YWxvZ1tdPihgJHthcGlVcmx9L2NhdGFsb2dzYClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgY2F0Y2hFcnJvcigocmVzcG9uc2U6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiBFTVBUWSlcclxuICAgICAgKTtcclxuICAgIG9ic2VydmFibGVzJC5wdXNoKGNhdGFsb2dzRnJvbUFwaSQpO1xyXG5cclxuICAgIC8vIENhdGFsb2dzIGZyb20gY29uZmlnXHJcbiAgICBpZiAoY2F0YWxvZ3NGcm9tQ29uZmlnLmxlbmd0aCA+IDApIHtcclxuICAgICAgb2JzZXJ2YWJsZXMkLnB1c2gob2YoY2F0YWxvZ3NGcm9tQ29uZmlnKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNvbmNhdCguLi5vYnNlcnZhYmxlcyQpIGFzIE9ic2VydmFibGU8Q2F0YWxvZ1tdPjtcclxuICB9XHJcblxyXG4gIGxvYWRDYXRhbG9nSXRlbXMoY2F0YWxvZzogQ2F0YWxvZyk6IE9ic2VydmFibGU8Q2F0YWxvZ0l0ZW1bXT4ge1xyXG4gICAgaWYgKGNhdGFsb2cudHlwZSA9PT0gJ2Jhc2VsYXllcnMnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxvYWRDYXRhbG9nQmFzZUxheWVySXRlbXMoY2F0YWxvZyk7XHJcbiAgICB9IGVsc2UgaWYgKGNhdGFsb2cudHlwZSA9PT0gJ3dtdHMnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxvYWRDYXRhbG9nV01UU0xheWVySXRlbXMoY2F0YWxvZyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5sb2FkQ2F0YWxvZ1dNU0xheWVySXRlbXMoY2F0YWxvZyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGxvYWRDYXRhbG9nQmFzZUxheWVySXRlbXMoY2F0YWxvZzogQ2F0YWxvZyk6IE9ic2VydmFibGU8Q2F0YWxvZ0l0ZW1Hcm91cFtdPiB7XHJcbiAgICAvLyBUT0RPOiBJJ20gbm90IHN1cmUgdGhpcyB3b3Jrc1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2F0YWxvZ0Jhc2VMYXllcnNPcHRpb25zKGNhdGFsb2cpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcCgobGF5ZXJzT3B0aW9uczogTGF5ZXJPcHRpb25zW10pID0+IHtcclxuICAgICAgICAgIGNvbnN0IGl0ZW1zID0gbGF5ZXJzT3B0aW9ucy5tYXAoKGxheWVyT3B0aW9uczogTGF5ZXJPcHRpb25zKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgaWQ6IGdlbmVyYXRlSWRGcm9tU291cmNlT3B0aW9ucyhsYXllck9wdGlvbnMuc291cmNlT3B0aW9ucyksXHJcbiAgICAgICAgICAgICAgdGl0bGU6IGxheWVyT3B0aW9ucy50aXRsZSxcclxuICAgICAgICAgICAgICB0eXBlOiBDYXRhbG9nSXRlbVR5cGUuTGF5ZXIsXHJcbiAgICAgICAgICAgICAgb3B0aW9uczogbGF5ZXJPcHRpb25zXHJcbiAgICAgICAgICAgIH0gYXMgQ2F0YWxvZ0l0ZW1MYXllcjtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmV0dXJuIFt7XHJcbiAgICAgICAgICAgIGlkOiAnY2F0YWxvZy5ncm91cC5iYXNlbGF5ZXJzJyxcclxuICAgICAgICAgICAgdHlwZTogQ2F0YWxvZ0l0ZW1UeXBlLkdyb3VwLFxyXG4gICAgICAgICAgICB0aXRsZTogY2F0YWxvZy50aXRsZSxcclxuICAgICAgICAgICAgaXRlbXNcclxuICAgICAgICAgIH1dO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldENhdGFsb2dCYXNlTGF5ZXJzT3B0aW9ucyhjYXRhbG9nOiBDYXRhbG9nKTogT2JzZXJ2YWJsZTxMYXllck9wdGlvbnNbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TGF5ZXJPcHRpb25zW10+KGNhdGFsb2cudXJsKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbG9hZENhdGFsb2dXTVNMYXllckl0ZW1zKGNhdGFsb2c6IENhdGFsb2cpOiBPYnNlcnZhYmxlPENhdGFsb2dJdGVtW10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldENhdGFsb2dXTVNDYXBhYmlsaXRpZXMoY2F0YWxvZylcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChjYXBhYmlsaXRpZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgaXRlbXMgPSBbXTtcclxuICAgICAgICAgIHRoaXMuaW5jbHVkZVJlY3Vyc2l2ZUl0ZW1zKGNhdGFsb2csIGNhcGFiaWxpdGllcy5DYXBhYmlsaXR5LkxheWVyLCBpdGVtcyk7XHJcbiAgICAgICAgICByZXR1cm4gaXRlbXM7XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbG9hZENhdGFsb2dXTVRTTGF5ZXJJdGVtcyhjYXRhbG9nOiBDYXRhbG9nKTogT2JzZXJ2YWJsZTxDYXRhbG9nSXRlbVtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRDYXRhbG9nV01UU0NhcGFiaWxpdGllcyhjYXRhbG9nKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoKGNhcGFiaWxpdGllczogYW55KSA9PiB0aGlzLmdldFdNVFNJdGVtcyhjYXRhbG9nLCBjYXBhYmlsaXRpZXMpKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRDYXRhbG9nV01TQ2FwYWJpbGl0aWVzKGNhdGFsb2c6IENhdGFsb2cpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FwYWJpbGl0aWVzU2VydmljZS5nZXRDYXBhYmlsaXRpZXMoJ3dtcycsIGNhdGFsb2cudXJsLCBjYXRhbG9nLnZlcnNpb24pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRDYXRhbG9nV01UU0NhcGFiaWxpdGllcyhjYXRhbG9nOiBDYXRhbG9nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmNhcGFiaWxpdGllc1NlcnZpY2UuZ2V0Q2FwYWJpbGl0aWVzKCd3bXRzJywgY2F0YWxvZy51cmwsIGNhdGFsb2cudmVyc2lvbik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluY2x1ZGVSZWN1cnNpdmVJdGVtcyhjYXRhbG9nOiBDYXRhbG9nLCBsYXllckxpc3Q6IGFueSwgaXRlbXM6IENhdGFsb2dJdGVtW10pIHtcclxuICAgIC8vIERpZyBhbGwgbGV2ZWxzIHVudGlsIGxhc3QgbGV2ZWwgKGxheWVyIG9iamVjdCBhcmUgbm90IGRlZmluZWQgb24gbGFzdCBsZXZlbClcclxuICAgIGNvbnN0IHJlZ2V4ZXMgPSAoY2F0YWxvZy5yZWdGaWx0ZXJzIHx8IFtdKS5tYXAoKHBhdHRlcm46IHN0cmluZykgPT4gbmV3IFJlZ0V4cChwYXR0ZXJuKSk7XHJcbiAgICBjb25zdCBjYXRhbG9nUXVlcnlQYXJhbXMgPSBjYXRhbG9nLnF1ZXJ5UGFyYW1zIHx8IHt9O1xyXG4gICAgY29uc3QgY2F0YWxvZ1NvdXJjZU9wdGlvbnMgPSBjYXRhbG9nLnNvdXJjZU9wdGlvbnMgfHwge307XHJcblxyXG4gICAgZm9yIChjb25zdCBncm91cCBvZiBsYXllckxpc3QuTGF5ZXIpIHtcclxuICAgICAgaWYgKGdyb3VwLkxheWVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAvLyByZWN1cnNpdmUsIGNoZWNrIG5leHQgbGV2ZWxcclxuICAgICAgICB0aGlzLmluY2x1ZGVSZWN1cnNpdmVJdGVtcyhjYXRhbG9nLCBncm91cCwgaXRlbXMpO1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGNhdGFsb2dUb29sdGlwVHlwZSA9IHRoaXMucmV0cmlldmVUb29sdGlwVHlwZShjYXRhbG9nKTtcclxuICAgICAgY29uc3QgbGF5ZXJzUXVlcnlGb3JtYXQgPSB0aGlzLmZpbmRDYXRhbG9nSW5mb0Zvcm1hdChjYXRhbG9nKTtcclxuICAgICAgLy8gVE9ETzogU2xpY2UgdGhhdCBpbnRvIG11bHRpcGxlIG1ldGhvZHNcclxuICAgICAgLy8gRGVmaW5lIG9iamVjdCBvZiBncm91cCBsYXllclxyXG4gICAgICBjb25zdCBncm91cEl0ZW0gPSB7XHJcbiAgICAgICAgaWQ6IGBjYXRhbG9nLmdyb3VwLiR7bGF5ZXJMaXN0Lk5hbWV9YCxcclxuICAgICAgICB0eXBlOiBDYXRhbG9nSXRlbVR5cGUuR3JvdXAsXHJcbiAgICAgICAgdGl0bGU6IGxheWVyTGlzdC5UaXRsZSxcclxuICAgICAgICBpdGVtczogbGF5ZXJMaXN0LkxheWVyLnJlZHVjZSgobGF5ZXJzOiBDYXRhbG9nSXRlbUxheWVyPEltYWdlTGF5ZXJPcHRpb25zPltdLCBsYXllcjogYW55KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBjb25maWd1cmVkUXVlcnlGb3JtYXQgPSB0aGlzLnJldHJpdmVMYXllckluZm9Gb3JtYXQobGF5ZXIuTmFtZSwgbGF5ZXJzUXVlcnlGb3JtYXQpO1xyXG5cclxuICAgICAgICAgIGlmICh0aGlzLnRlc3RMYXllclJlZ2V4ZXMobGF5ZXIuTmFtZSwgcmVnZXhlcykgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsYXllcnM7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3QgbWV0YWRhdGEgPSBsYXllci5EYXRhVVJMID8gbGF5ZXIuRGF0YVVSTFswXSA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgIGNvbnN0IGFic3RyYWN0ID0gbGF5ZXIuQWJzdHJhY3QgPyBsYXllci5BYnN0cmFjdCA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgIGNvbnN0IGtleXdvcmRMaXN0ID0gbGF5ZXIuS2V5d29yZExpc3QgPyBsYXllci5LZXl3b3JkTGlzdCA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgIGNvbnN0IHRpbWVGaWx0ZXIgPSB0aGlzLmNhcGFiaWxpdGllc1NlcnZpY2UuZ2V0VGltZUZpbHRlcihsYXllcik7XHJcbiAgICAgICAgICBjb25zdCB0aW1lRmlsdGVyYWJsZSA9IHRpbWVGaWx0ZXIgJiYgT2JqZWN0LmtleXModGltZUZpbHRlcikubGVuZ3RoID4gMCA/IHRydWUgOiBmYWxzZTtcclxuXHJcbiAgICAgICAgICBjb25zdCBwYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBjYXRhbG9nUXVlcnlQYXJhbXMsIHtcclxuICAgICAgICAgICAgbGF5ZXJzOiBsYXllci5OYW1lLFxyXG4gICAgICAgICAgICBmZWF0dXJlX2NvdW50OiAgY2F0YWxvZy5jb3VudFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBjb25zdCBiYXNlU291cmNlT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgdHlwZTogJ3dtcycsXHJcbiAgICAgICAgICAgIHVybDogY2F0YWxvZy51cmwsXHJcbiAgICAgICAgICAgIGNyb3NzT3JpZ2luOiBjYXRhbG9nLnNldENyb3NzT3JpZ2luQW5vbnltb3VzID8gJ2Fub255bW91cycgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHRpbWVGaWx0ZXI6IHsgLi4udGltZUZpbHRlciwgLi4uY2F0YWxvZy50aW1lRmlsdGVyIH0sXHJcbiAgICAgICAgICAgIHRpbWVGaWx0ZXJhYmxlOiB0aW1lRmlsdGVyYWJsZSA/IHRydWUgOiBmYWxzZSxcclxuICAgICAgICAgICAgcXVlcnlhYmxlOiBsYXllci5xdWVyeWFibGUsXHJcbiAgICAgICAgICAgIHF1ZXJ5Rm9ybWF0OiBjb25maWd1cmVkUXVlcnlGb3JtYXQsXHJcbiAgICAgICAgICAgIHF1ZXJ5SHRtbFRhcmdldDogY2F0YWxvZy5xdWVyeUh0bWxUYXJnZXQgfHwgUXVlcnlIdG1sVGFyZ2V0LklGUkFNRVxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIGNvbnN0IHNvdXJjZU9wdGlvbnMgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgICAgICAgICB7fSxcclxuICAgICAgICAgICAgYmFzZVNvdXJjZU9wdGlvbnMsXHJcbiAgICAgICAgICAgIGNhdGFsb2dTb3VyY2VPcHRpb25zLFxyXG4gICAgICAgICAgICB7cGFyYW1zfVxyXG4gICAgICAgICAgKSBhcyBXTVNEYXRhU291cmNlT3B0aW9ucztcclxuXHJcbiAgICAgICAgICBsYXllcnMucHVzaCh7XHJcbiAgICAgICAgICAgIGlkOiBnZW5lcmF0ZUlkRnJvbVNvdXJjZU9wdGlvbnMoc291cmNlT3B0aW9ucyksXHJcbiAgICAgICAgICAgIHR5cGU6IENhdGFsb2dJdGVtVHlwZS5MYXllcixcclxuICAgICAgICAgICAgdGl0bGU6IGxheWVyLlRpdGxlLFxyXG4gICAgICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6IGxheWVyLlRpdGxlLFxyXG4gICAgICAgICAgICAgIG1heFJlc29sdXRpb246XHJcbiAgICAgICAgICAgICAgICBnZXRSZXNvbHV0aW9uRnJvbVNjYWxlKGxheWVyLk1heFNjYWxlRGVub21pbmF0b3IpIHx8IEluZmluaXR5LFxyXG4gICAgICAgICAgICAgIG1pblJlc29sdXRpb246XHJcbiAgICAgICAgICAgICAgICBnZXRSZXNvbHV0aW9uRnJvbVNjYWxlKGxheWVyLk1pblNjYWxlRGVub21pbmF0b3IpIHx8IDAsXHJcbiAgICAgICAgICAgICAgbWV0YWRhdGE6IHtcclxuICAgICAgICAgICAgICAgIHVybDogbWV0YWRhdGEgPyBtZXRhZGF0YS5PbmxpbmVSZXNvdXJjZSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIGV4dGVybjogbWV0YWRhdGEgPyB0cnVlIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgYWJzdHJhY3QsXHJcbiAgICAgICAgICAgICAgICBrZXl3b3JkTGlzdFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgdG9vbHRpcDogeyB0eXBlOiBjYXRhbG9nVG9vbHRpcFR5cGUgfSBhcyBUb29sdGlwQ29udGVudCxcclxuICAgICAgICAgICAgICBzb3VyY2VPcHRpb25zXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmV0dXJuIGxheWVycztcclxuXHJcbiAgICAgICAgfSwgW10pXHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKGdyb3VwSXRlbS5pdGVtcy5sZW5ndGggIT09IDApIHtcclxuICAgICAgICBpdGVtcy5wdXNoKGdyb3VwSXRlbSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEJyZWFrIHRoZSBncm91cCAoZG9uJ3QgYWRkIGEgZ3JvdXAgb2YgbGF5ZXIgZm9yIGVhY2ggb2YgdGhlaXIgbGF5ZXIhKVxyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0V01UU0l0ZW1zKGNhdGFsb2c6IENhdGFsb2csIGNhcGFiaWxpdGllczoge1trZXk6IHN0cmluZ106IGFueX0pOiBDYXRhbG9nSXRlbUxheWVyW10ge1xyXG4gICAgY29uc3QgbGF5ZXJzID0gY2FwYWJpbGl0aWVzLkNvbnRlbnRzLkxheWVyO1xyXG4gICAgY29uc3QgcmVnZXhlcyA9IChjYXRhbG9nLnJlZ0ZpbHRlcnMgfHwgW10pLm1hcCgocGF0dGVybjogc3RyaW5nKSA9PiBuZXcgUmVnRXhwKHBhdHRlcm4pKTtcclxuICAgIGNvbnN0IGNhdGFsb2dRdWVyeVBhcmFtcyA9IGNhdGFsb2cucXVlcnlQYXJhbXMgfHwge307XHJcbiAgICBjb25zdCBjYXRhbG9nU291cmNlT3B0aW9ucyA9IGNhdGFsb2cuc291cmNlT3B0aW9ucyB8fCB7fTtcclxuXHJcbiAgICByZXR1cm4gbGF5ZXJzLm1hcCgobGF5ZXI6IGFueSkgPT4ge1xyXG4gICAgICBpZiAodGhpcy50ZXN0TGF5ZXJSZWdleGVzKGxheWVyLklkZW50aWZpZXIsIHJlZ2V4ZXMpID09PSBmYWxzZSkge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgY2F0YWxvZ1F1ZXJ5UGFyYW1zLCB7XHJcbiAgICAgICAgdmVyc2lvbjogJzEuMC4wJ1xyXG4gICAgICB9KTtcclxuICAgICAgY29uc3QgYmFzZVNvdXJjZU9wdGlvbnMgPSB7XHJcbiAgICAgICAgdHlwZTogJ3dtdHMnLFxyXG4gICAgICAgIHVybDogY2F0YWxvZy51cmwsXHJcbiAgICAgICAgY3Jvc3NPcmlnaW46IGNhdGFsb2cuc2V0Q3Jvc3NPcmlnaW5Bbm9ueW1vdXMgPyAnYW5vbnltb3VzJyA6IHVuZGVmaW5lZCxcclxuICAgICAgICBsYXllcjogbGF5ZXIuSWRlbnRpZmllcixcclxuICAgICAgICBtYXRyaXhTZXQ6IGNhdGFsb2cubWF0cml4U2V0LFxyXG4gICAgICAgIG9wdGlvbnNGcm9tQ2FwYWJpbGl0aWVzOiB0cnVlLFxyXG4gICAgICAgIHJlcXVlc3RFbmNvZGluZzogY2F0YWxvZy5yZXF1ZXN0RW5jb2RpbmcgfHwgJ0tWUCcsXHJcbiAgICAgICAgc3R5bGU6ICdkZWZhdWx0J1xyXG4gICAgICB9IGFzIFdNVFNEYXRhU291cmNlT3B0aW9ucztcclxuICAgICAgY29uc3Qgc291cmNlT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAge30sXHJcbiAgICAgICAgYmFzZVNvdXJjZU9wdGlvbnMsXHJcbiAgICAgICAgY2F0YWxvZ1NvdXJjZU9wdGlvbnMsXHJcbiAgICAgICAge3BhcmFtc31cclxuICAgICAgKSBhcyBXTVRTRGF0YVNvdXJjZU9wdGlvbnM7XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGlkOiBnZW5lcmF0ZUlkRnJvbVNvdXJjZU9wdGlvbnMoc291cmNlT3B0aW9ucyksXHJcbiAgICAgICAgdHlwZTogQ2F0YWxvZ0l0ZW1UeXBlLkxheWVyLFxyXG4gICAgICAgIHRpdGxlOiBsYXllci5UaXRsZSxcclxuICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICB0aXRsZTogbGF5ZXIuVGl0bGUsXHJcbiAgICAgICAgICBzb3VyY2VPcHRpb25zXHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgfSlcclxuICAgIC5maWx0ZXIoKGl0ZW06IENhdGFsb2dJdGVtTGF5ZXIgfCB1bmRlZmluZWQpID0+IGl0ZW0gIT09IHVuZGVmaW5lZCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRlc3RMYXllclJlZ2V4ZXMobGF5ZXJOYW1lLCByZWdleGVzKTogYm9vbGVhbiB7XHJcbiAgICBpZiAocmVnZXhlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVnZXhlcy5maW5kKChyZWdleDogUmVnRXhwKSA9PiByZWdleC50ZXN0KGxheWVyTmFtZSkpICE9PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJldHJpdmVMYXllckluZm9Gb3JtYXQoXHJcbiAgICBsYXllck5hbWVGcm9tQ2F0YWxvZzogc3RyaW5nLFxyXG4gICAgbGF5ZXJzUXVlcnlGb3JtYXQ6IHsgbGF5ZXI6IHN0cmluZywgcXVlcnlGb3JtYXQ6IFF1ZXJ5Rm9ybWF0IH1bXVxyXG4gICk6IFF1ZXJ5Rm9ybWF0IHtcclxuXHJcbiAgICBjb25zdCBjdXJyZW50TGF5ZXJJbmZvRm9ybWF0ID0gbGF5ZXJzUXVlcnlGb3JtYXQuZmluZChmID0+IGYubGF5ZXIgPT09IGxheWVyTmFtZUZyb21DYXRhbG9nKTtcclxuICAgIGNvbnN0IGJhc2VJbmZvRm9ybWF0ID0gbGF5ZXJzUXVlcnlGb3JtYXQuZmluZChmID0+IGYubGF5ZXIgPT09ICcqJyk7XHJcbiAgICBsZXQgcXVlcnlGb3JtYXQ6IFF1ZXJ5Rm9ybWF0O1xyXG4gICAgaWYgKGN1cnJlbnRMYXllckluZm9Gb3JtYXQpIHtcclxuICAgICAgcXVlcnlGb3JtYXQgPSBjdXJyZW50TGF5ZXJJbmZvRm9ybWF0LnF1ZXJ5Rm9ybWF0O1xyXG4gICAgfSBlbHNlIGlmIChiYXNlSW5mb0Zvcm1hdCkge1xyXG4gICAgICBxdWVyeUZvcm1hdCA9IGJhc2VJbmZvRm9ybWF0LnF1ZXJ5Rm9ybWF0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHF1ZXJ5Rm9ybWF0O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZXRyaWV2ZVRvb2x0aXBUeXBlKGNhdGFsb2c6IENhdGFsb2cpOiBUb29sdGlwVHlwZSB7XHJcbiAgICBpZiAoIWNhdGFsb2cudG9vbHRpcFR5cGUpIHtcclxuICAgICAgcmV0dXJuIFRvb2x0aXBUeXBlLlRJVExFO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNhdGFsb2cudG9vbHRpcFR5cGU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZpbmRDYXRhbG9nSW5mb0Zvcm1hdChjYXRhbG9nOiBDYXRhbG9nKToge2xheWVyOiBzdHJpbmcsIHF1ZXJ5Rm9ybWF0OiBRdWVyeUZvcm1hdH1bXSB7XHJcbiAgICBjb25zdCBsYXllcnNRdWVyeUZvcm1hdDoge2xheWVyOiBzdHJpbmcsIHF1ZXJ5Rm9ybWF0OiBRdWVyeUZvcm1hdH1bXSA9IFtdO1xyXG4gICAgaWYgKCFjYXRhbG9nLnF1ZXJ5Rm9ybWF0KSB7XHJcbiAgICAgIHJldHVybiBsYXllcnNRdWVyeUZvcm1hdDtcclxuICAgIH1cclxuICAgIE9iamVjdC5rZXlzKGNhdGFsb2cucXVlcnlGb3JtYXQpLmZvckVhY2goY29uZmlndXJlZEluZm9Gb3JtYXQgPT4ge1xyXG4gICAgICBpZiAoY2F0YWxvZy5xdWVyeUZvcm1hdFtjb25maWd1cmVkSW5mb0Zvcm1hdF0gaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgIGNhdGFsb2cucXVlcnlGb3JtYXRbY29uZmlndXJlZEluZm9Gb3JtYXRdLmZvckVhY2gobGF5ZXJOYW1lID0+IHtcclxuICAgICAgICAgIGlmICghbGF5ZXJzUXVlcnlGb3JtYXQuZmluZChzcGVjaWZpYyA9PiBzcGVjaWZpYy5sYXllciA9PT0gbGF5ZXJOYW1lKSkge1xyXG4gICAgICAgICAgICBsYXllcnNRdWVyeUZvcm1hdC5wdXNoKHsgbGF5ZXI6IGxheWVyTmFtZSwgcXVlcnlGb3JtYXQ6IGNvbmZpZ3VyZWRJbmZvRm9ybWF0IGFzIFF1ZXJ5Rm9ybWF0IH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICghbGF5ZXJzUXVlcnlGb3JtYXQuZmluZChzcGVjaWZpYyA9PiBzcGVjaWZpYy5sYXllciA9PT0gY2F0YWxvZy5xdWVyeUZvcm1hdFtjb25maWd1cmVkSW5mb0Zvcm1hdF0pKSB7XHJcbiAgICAgICAgICBsYXllcnNRdWVyeUZvcm1hdC5wdXNoKHsgbGF5ZXI6IGNhdGFsb2cucXVlcnlGb3JtYXRbY29uZmlndXJlZEluZm9Gb3JtYXRdLCBxdWVyeUZvcm1hdDogY29uZmlndXJlZEluZm9Gb3JtYXQgYXMgUXVlcnlGb3JtYXQgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBsYXllcnNRdWVyeUZvcm1hdDtcclxuICB9XHJcbn1cclxuIl19