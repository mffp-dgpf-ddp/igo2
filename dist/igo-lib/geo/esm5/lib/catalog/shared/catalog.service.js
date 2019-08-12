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
                    var sourceOptions = (/** @type {?} */ ({
                        type: 'wms',
                        url: catalog.url,
                        params: {
                            layers: layer.Name,
                            feature_count: catalog.count
                        },
                        timeFilter: tslib_1.__assign({}, timeFilter, catalog.timeFilter),
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
        return layers.map((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) {
            if (_this.testLayerRegexes(layer.Identifier, regexes) === false) {
                return undefined;
            }
            /** @type {?} */
            var sourceOptions = (/** @type {?} */ ({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2NhdGFsb2cvc2hhcmVkL2NhdGFsb2cuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBcUIsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRSxPQUFPLEVBQUUsS0FBSyxFQUFjLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDckQsT0FBTyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRCxPQUFPLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM1RCxPQUFPLEVBQ0wsbUJBQW1CLEVBR25CLDJCQUEyQixFQUM1QixNQUFNLGtCQUFrQixDQUFDO0FBQzFCLE9BQU8sRUFBbUQsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzNGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQVFuRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBZSxNQUFNLGFBQWEsQ0FBQzs7Ozs7QUFFM0Q7SUFLRSx3QkFDVSxJQUFnQixFQUNoQixNQUFxQixFQUNyQixlQUFnQyxFQUNoQyxtQkFBd0M7UUFIeEMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3JCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO0lBQy9DLENBQUM7Ozs7SUFFSixxQ0FBWTs7O0lBQVo7O1lBQ1EsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVB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cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgRU1QVFksIE9ic2VydmFibGUsIG9mLCBjb25jYXQgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwLCBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgTGFuZ3VhZ2VTZXJ2aWNlLCBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQ2FwYWJpbGl0aWVzU2VydmljZSxcclxuICBXTVNEYXRhU291cmNlT3B0aW9ucyxcclxuICBXTVRTRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgZ2VuZXJhdGVJZEZyb21Tb3VyY2VPcHRpb25zXHJcbn0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IExheWVyT3B0aW9ucywgSW1hZ2VMYXllck9wdGlvbnMsIFRvb2x0aXBDb250ZW50LCBUb29sdGlwVHlwZSB9IGZyb20gJy4uLy4uL2xheWVyJztcclxuaW1wb3J0IHsgZ2V0UmVzb2x1dGlvbkZyb21TY2FsZSB9IGZyb20gJy4uLy4uL21hcCc7XHJcblxyXG5pbXBvcnQge1xyXG4gIENhdGFsb2csXHJcbiAgQ2F0YWxvZ0l0ZW0sXHJcbiAgQ2F0YWxvZ0l0ZW1MYXllcixcclxuICBDYXRhbG9nSXRlbUdyb3VwXHJcbn0gZnJvbSAnLi9jYXRhbG9nLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IENhdGFsb2dJdGVtVHlwZSB9IGZyb20gJy4vY2F0YWxvZy5lbnVtJztcclxuaW1wb3J0IHsgUXVlcnlIdG1sVGFyZ2V0LCBRdWVyeUZvcm1hdCB9IGZyb20gJy4uLy4uL3F1ZXJ5JztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIENhdGFsb2dTZXJ2aWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNhcGFiaWxpdGllc1NlcnZpY2U6IENhcGFiaWxpdGllc1NlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIGxvYWRDYXRhbG9ncygpOiBPYnNlcnZhYmxlPENhdGFsb2dbXT4ge1xyXG4gICAgY29uc3QgY29udGV4dENvbmZpZyA9IHRoaXMuY29uZmlnLmdldENvbmZpZygnY29udGV4dCcpIHx8IHt9O1xyXG4gICAgY29uc3QgY2F0YWxvZ0NvbmZpZyA9IHRoaXMuY29uZmlnLmdldENvbmZpZygnY2F0YWxvZycpIHx8IHt9O1xyXG4gICAgY29uc3QgYXBpVXJsID0gY2F0YWxvZ0NvbmZpZy51cmwgfHwgY29udGV4dENvbmZpZy51cmw7XHJcbiAgICBjb25zdCBjYXRhbG9nc0Zyb21Db25maWcgPSBjYXRhbG9nQ29uZmlnLnNvdXJjZXMgfHwgW107XHJcblxyXG4gICAgaWYgKGFwaVVybCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiBvZihjYXRhbG9nc0Zyb21Db25maWcpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9ic2VydmFibGVzJCA9IFtdO1xyXG5cclxuICAgIC8vIEJhc2UgbGF5ZXJzIGNhdGFsb2dcclxuICAgIGlmIChjYXRhbG9nQ29uZmlnLmJhc2VMYXllcnMpIHtcclxuICAgICAgY29uc3QgdHJhbnNsYXRlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmNhdGFsb2cuYmFzZUxheWVycycpO1xyXG4gICAgICBjb25zdCBiYXNlTGF5ZXJzQ2F0YWxvZyA9IHtcclxuICAgICAgICBpZDogJ2NhdGFsb2cuYmFzZWxheWVycycsXHJcbiAgICAgICAgdGl0bGUsXHJcbiAgICAgICAgdXJsOiBgJHthcGlVcmx9L2Jhc2VsYXllcnNgLFxyXG4gICAgICAgIHR5cGU6ICdiYXNlbGF5ZXJzJ1xyXG4gICAgICB9O1xyXG4gICAgICBvYnNlcnZhYmxlcyQucHVzaChvZihiYXNlTGF5ZXJzQ2F0YWxvZykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENhdGFsb2dzIGZyb20gQVBJXHJcbiAgICBjb25zdCBjYXRhbG9nc0Zyb21BcGkkID0gdGhpcy5odHRwXHJcbiAgICAgIC5nZXQ8Q2F0YWxvZ1tdPihgJHthcGlVcmx9L2NhdGFsb2dzYClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgY2F0Y2hFcnJvcigocmVzcG9uc2U6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiBFTVBUWSlcclxuICAgICAgKTtcclxuICAgIG9ic2VydmFibGVzJC5wdXNoKGNhdGFsb2dzRnJvbUFwaSQpO1xyXG5cclxuICAgIC8vIENhdGFsb2dzIGZyb20gY29uZmlnXHJcbiAgICBpZiAoY2F0YWxvZ3NGcm9tQ29uZmlnLmxlbmd0aCA+IDApIHtcclxuICAgICAgb2JzZXJ2YWJsZXMkLnB1c2gob2YoY2F0YWxvZ3NGcm9tQ29uZmlnKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNvbmNhdCguLi5vYnNlcnZhYmxlcyQpIGFzIE9ic2VydmFibGU8Q2F0YWxvZ1tdPjtcclxuICB9XHJcblxyXG4gIGxvYWRDYXRhbG9nSXRlbXMoY2F0YWxvZzogQ2F0YWxvZyk6IE9ic2VydmFibGU8Q2F0YWxvZ0l0ZW1bXT4ge1xyXG4gICAgaWYgKGNhdGFsb2cudHlwZSA9PT0gJ2Jhc2VsYXllcnMnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxvYWRDYXRhbG9nQmFzZUxheWVySXRlbXMoY2F0YWxvZyk7XHJcbiAgICB9IGVsc2UgaWYgKGNhdGFsb2cudHlwZSA9PT0gJ3dtdHMnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxvYWRDYXRhbG9nV01UU0xheWVySXRlbXMoY2F0YWxvZyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5sb2FkQ2F0YWxvZ1dNU0xheWVySXRlbXMoY2F0YWxvZyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGxvYWRDYXRhbG9nQmFzZUxheWVySXRlbXMoY2F0YWxvZzogQ2F0YWxvZyk6IE9ic2VydmFibGU8Q2F0YWxvZ0l0ZW1Hcm91cFtdPiB7XHJcbiAgICAvLyBUT0RPOiBJJ20gbm90IHN1cmUgdGhpcyB3b3Jrc1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2F0YWxvZ0Jhc2VMYXllcnNPcHRpb25zKGNhdGFsb2cpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcCgobGF5ZXJzT3B0aW9uczogTGF5ZXJPcHRpb25zW10pID0+IHtcclxuICAgICAgICAgIGNvbnN0IGl0ZW1zID0gbGF5ZXJzT3B0aW9ucy5tYXAoKGxheWVyT3B0aW9uczogTGF5ZXJPcHRpb25zKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgaWQ6IGdlbmVyYXRlSWRGcm9tU291cmNlT3B0aW9ucyhsYXllck9wdGlvbnMuc291cmNlT3B0aW9ucyksXHJcbiAgICAgICAgICAgICAgdGl0bGU6IGxheWVyT3B0aW9ucy50aXRsZSxcclxuICAgICAgICAgICAgICB0eXBlOiBDYXRhbG9nSXRlbVR5cGUuTGF5ZXIsXHJcbiAgICAgICAgICAgICAgb3B0aW9uczogbGF5ZXJPcHRpb25zXHJcbiAgICAgICAgICAgIH0gYXMgQ2F0YWxvZ0l0ZW1MYXllcjtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmV0dXJuIFt7XHJcbiAgICAgICAgICAgIGlkOiAnY2F0YWxvZy5ncm91cC5iYXNlbGF5ZXJzJyxcclxuICAgICAgICAgICAgdHlwZTogQ2F0YWxvZ0l0ZW1UeXBlLkdyb3VwLFxyXG4gICAgICAgICAgICB0aXRsZTogY2F0YWxvZy50aXRsZSxcclxuICAgICAgICAgICAgaXRlbXNcclxuICAgICAgICAgIH1dO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldENhdGFsb2dCYXNlTGF5ZXJzT3B0aW9ucyhjYXRhbG9nOiBDYXRhbG9nKTogT2JzZXJ2YWJsZTxMYXllck9wdGlvbnNbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TGF5ZXJPcHRpb25zW10+KGNhdGFsb2cudXJsKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbG9hZENhdGFsb2dXTVNMYXllckl0ZW1zKGNhdGFsb2c6IENhdGFsb2cpOiBPYnNlcnZhYmxlPENhdGFsb2dJdGVtW10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldENhdGFsb2dXTVNDYXBhYmlsaXRpZXMoY2F0YWxvZylcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChjYXBhYmlsaXRpZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgaXRlbXMgPSBbXTtcclxuICAgICAgICAgIHRoaXMuaW5jbHVkZVJlY3Vyc2l2ZUl0ZW1zKGNhdGFsb2csIGNhcGFiaWxpdGllcy5DYXBhYmlsaXR5LkxheWVyLCBpdGVtcyk7XHJcbiAgICAgICAgICByZXR1cm4gaXRlbXM7XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbG9hZENhdGFsb2dXTVRTTGF5ZXJJdGVtcyhjYXRhbG9nOiBDYXRhbG9nKTogT2JzZXJ2YWJsZTxDYXRhbG9nSXRlbVtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRDYXRhbG9nV01UU0NhcGFiaWxpdGllcyhjYXRhbG9nKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoKGNhcGFiaWxpdGllczogYW55KSA9PiB0aGlzLmdldFdNVFNJdGVtcyhjYXRhbG9nLCBjYXBhYmlsaXRpZXMpKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRDYXRhbG9nV01TQ2FwYWJpbGl0aWVzKGNhdGFsb2c6IENhdGFsb2cpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FwYWJpbGl0aWVzU2VydmljZS5nZXRDYXBhYmlsaXRpZXMoJ3dtcycsIGNhdGFsb2cudXJsLCBjYXRhbG9nLnZlcnNpb24pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRDYXRhbG9nV01UU0NhcGFiaWxpdGllcyhjYXRhbG9nOiBDYXRhbG9nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmNhcGFiaWxpdGllc1NlcnZpY2UuZ2V0Q2FwYWJpbGl0aWVzKCd3bXRzJywgY2F0YWxvZy51cmwsIGNhdGFsb2cudmVyc2lvbik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluY2x1ZGVSZWN1cnNpdmVJdGVtcyhjYXRhbG9nOiBDYXRhbG9nLCBsYXllckxpc3Q6IGFueSwgaXRlbXM6IENhdGFsb2dJdGVtW10pIHtcclxuICAgIC8vIERpZyBhbGwgbGV2ZWxzIHVudGlsIGxhc3QgbGV2ZWwgKGxheWVyIG9iamVjdCBhcmUgbm90IGRlZmluZWQgb24gbGFzdCBsZXZlbClcclxuICAgIGNvbnN0IHJlZ2V4ZXMgPSAoY2F0YWxvZy5yZWdGaWx0ZXJzIHx8IFtdKS5tYXAoKHBhdHRlcm46IHN0cmluZykgPT4gbmV3IFJlZ0V4cChwYXR0ZXJuKSk7XHJcblxyXG4gICAgZm9yIChjb25zdCBncm91cCBvZiBsYXllckxpc3QuTGF5ZXIpIHtcclxuICAgICAgaWYgKGdyb3VwLkxheWVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAvLyByZWN1cnNpdmUsIGNoZWNrIG5leHQgbGV2ZWxcclxuICAgICAgICB0aGlzLmluY2x1ZGVSZWN1cnNpdmVJdGVtcyhjYXRhbG9nLCBncm91cCwgaXRlbXMpO1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGNhdGFsb2dUb29sdGlwVHlwZSA9IHRoaXMucmV0cmlldmVUb29sdGlwVHlwZShjYXRhbG9nKTtcclxuICAgICAgY29uc3QgbGF5ZXJzUXVlcnlGb3JtYXQgPSB0aGlzLmZpbmRDYXRhbG9nSW5mb0Zvcm1hdChjYXRhbG9nKTtcclxuICAgICAgLy8gVE9ETzogU2xpY2UgdGhhdCBpbnRvIG11bHRpcGxlIG1ldGhvZHNcclxuICAgICAgLy8gRGVmaW5lIG9iamVjdCBvZiBncm91cCBsYXllclxyXG4gICAgICBjb25zdCBncm91cEl0ZW0gPSB7XHJcbiAgICAgICAgaWQ6IGBjYXRhbG9nLmdyb3VwLiR7bGF5ZXJMaXN0Lk5hbWV9YCxcclxuICAgICAgICB0eXBlOiBDYXRhbG9nSXRlbVR5cGUuR3JvdXAsXHJcbiAgICAgICAgdGl0bGU6IGxheWVyTGlzdC5UaXRsZSxcclxuICAgICAgICBpdGVtczogbGF5ZXJMaXN0LkxheWVyLnJlZHVjZSgobGF5ZXJzOiBDYXRhbG9nSXRlbUxheWVyPEltYWdlTGF5ZXJPcHRpb25zPltdLCBsYXllcjogYW55KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBjb25maWd1cmVkUXVlcnlGb3JtYXQgPSB0aGlzLnJldHJpdmVMYXllckluZm9Gb3JtYXQobGF5ZXIuTmFtZSwgbGF5ZXJzUXVlcnlGb3JtYXQpO1xyXG5cclxuICAgICAgICAgIGlmICh0aGlzLnRlc3RMYXllclJlZ2V4ZXMobGF5ZXIuTmFtZSwgcmVnZXhlcykgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsYXllcnM7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3QgbWV0YWRhdGEgPSBsYXllci5EYXRhVVJMID8gbGF5ZXIuRGF0YVVSTFswXSA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgIGNvbnN0IGFic3RyYWN0ID0gbGF5ZXIuQWJzdHJhY3QgPyBsYXllci5BYnN0cmFjdCA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgIGNvbnN0IGtleXdvcmRMaXN0ID0gbGF5ZXIuS2V5d29yZExpc3QgPyBsYXllci5LZXl3b3JkTGlzdCA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgIGNvbnN0IHRpbWVGaWx0ZXIgPSB0aGlzLmNhcGFiaWxpdGllc1NlcnZpY2UuZ2V0VGltZUZpbHRlcihsYXllcik7XHJcbiAgICAgICAgICBjb25zdCB0aW1lRmlsdGVyYWJsZSA9IHRpbWVGaWx0ZXIgJiYgT2JqZWN0LmtleXModGltZUZpbHRlcikubGVuZ3RoID4gMCA/IHRydWUgOiBmYWxzZTtcclxuXHJcbiAgICAgICAgICBjb25zdCBzb3VyY2VPcHRpb25zID0ge1xyXG4gICAgICAgICAgICB0eXBlOiAnd21zJyxcclxuICAgICAgICAgICAgdXJsOiBjYXRhbG9nLnVybCxcclxuICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgbGF5ZXJzOiBsYXllci5OYW1lLFxyXG4gICAgICAgICAgICAgIGZlYXR1cmVfY291bnQ6ICBjYXRhbG9nLmNvdW50XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRpbWVGaWx0ZXI6IHsgLi4udGltZUZpbHRlciwgLi4uY2F0YWxvZy50aW1lRmlsdGVyIH0sXHJcbiAgICAgICAgICAgIHRpbWVGaWx0ZXJhYmxlOiB0aW1lRmlsdGVyYWJsZSA/IHRydWUgOiBmYWxzZSxcclxuICAgICAgICAgICAgcXVlcnlhYmxlOiBsYXllci5xdWVyeWFibGUsXHJcbiAgICAgICAgICAgIHF1ZXJ5Rm9ybWF0OiBjb25maWd1cmVkUXVlcnlGb3JtYXQsXHJcbiAgICAgICAgICAgIHF1ZXJ5SHRtbFRhcmdldDogY2F0YWxvZy5xdWVyeUh0bWxUYXJnZXQgfHwgUXVlcnlIdG1sVGFyZ2V0LklGUkFNRVxyXG4gICAgICAgICAgfSBhcyBXTVNEYXRhU291cmNlT3B0aW9ucztcclxuXHJcbiAgICAgICAgICBsYXllcnMucHVzaCh7XHJcbiAgICAgICAgICAgIGlkOiBnZW5lcmF0ZUlkRnJvbVNvdXJjZU9wdGlvbnMoc291cmNlT3B0aW9ucyksXHJcbiAgICAgICAgICAgIHR5cGU6IENhdGFsb2dJdGVtVHlwZS5MYXllcixcclxuICAgICAgICAgICAgdGl0bGU6IGxheWVyLlRpdGxlLFxyXG4gICAgICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6IGxheWVyLlRpdGxlLFxyXG4gICAgICAgICAgICAgIG1heFJlc29sdXRpb246XHJcbiAgICAgICAgICAgICAgICBnZXRSZXNvbHV0aW9uRnJvbVNjYWxlKGxheWVyLk1heFNjYWxlRGVub21pbmF0b3IpIHx8IEluZmluaXR5LFxyXG4gICAgICAgICAgICAgIG1pblJlc29sdXRpb246XHJcbiAgICAgICAgICAgICAgICBnZXRSZXNvbHV0aW9uRnJvbVNjYWxlKGxheWVyLk1pblNjYWxlRGVub21pbmF0b3IpIHx8IDAsXHJcbiAgICAgICAgICAgICAgbWV0YWRhdGE6IHtcclxuICAgICAgICAgICAgICAgIHVybDogbWV0YWRhdGEgPyBtZXRhZGF0YS5PbmxpbmVSZXNvdXJjZSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIGV4dGVybjogbWV0YWRhdGEgPyB0cnVlIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgYWJzdHJhY3QsXHJcbiAgICAgICAgICAgICAgICBrZXl3b3JkTGlzdFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgdG9vbHRpcDogeyB0eXBlOiBjYXRhbG9nVG9vbHRpcFR5cGUgfSBhcyBUb29sdGlwQ29udGVudCxcclxuICAgICAgICAgICAgICBzb3VyY2VPcHRpb25zXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmV0dXJuIGxheWVycztcclxuXHJcbiAgICAgICAgfSwgW10pXHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKGdyb3VwSXRlbS5pdGVtcy5sZW5ndGggIT09IDApIHtcclxuICAgICAgICBpdGVtcy5wdXNoKGdyb3VwSXRlbSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEJyZWFrIHRoZSBncm91cCAoZG9uJ3QgYWRkIGEgZ3JvdXAgb2YgbGF5ZXIgZm9yIGVhY2ggb2YgdGhlaXIgbGF5ZXIhKVxyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0V01UU0l0ZW1zKGNhdGFsb2c6IENhdGFsb2csIGNhcGFiaWxpdGllczoge1trZXk6IHN0cmluZ106IGFueX0pOiBDYXRhbG9nSXRlbUxheWVyW10ge1xyXG4gICAgY29uc3QgbGF5ZXJzID0gY2FwYWJpbGl0aWVzLkNvbnRlbnRzLkxheWVyO1xyXG4gICAgY29uc3QgcmVnZXhlcyA9IChjYXRhbG9nLnJlZ0ZpbHRlcnMgfHwgW10pLm1hcCgocGF0dGVybjogc3RyaW5nKSA9PiBuZXcgUmVnRXhwKHBhdHRlcm4pKTtcclxuXHJcbiAgICByZXR1cm4gbGF5ZXJzLm1hcCgobGF5ZXI6IGFueSkgPT4ge1xyXG4gICAgICBpZiAodGhpcy50ZXN0TGF5ZXJSZWdleGVzKGxheWVyLklkZW50aWZpZXIsIHJlZ2V4ZXMpID09PSBmYWxzZSkge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHNvdXJjZU9wdGlvbnMgPSB7XHJcbiAgICAgICAgdHlwZTogJ3dtdHMnLFxyXG4gICAgICAgIHVybDogY2F0YWxvZy51cmwsXHJcbiAgICAgICAgbGF5ZXI6IGxheWVyLklkZW50aWZpZXIsXHJcbiAgICAgICAgbWF0cml4U2V0OiBjYXRhbG9nLm1hdHJpeFNldCxcclxuICAgICAgICBvcHRpb25zRnJvbUNhcGFiaWxpdGllczogdHJ1ZSxcclxuICAgICAgICByZXF1ZXN0RW5jb2Rpbmc6IGNhdGFsb2cucmVxdWVzdEVuY29kaW5nIHx8ICdLVlAnLFxyXG4gICAgICAgIHN0eWxlOiAnZGVmYXVsdCcsXHJcbiAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICB2ZXJzaW9uOiAnMS4wLjAnXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGFzIFdNVFNEYXRhU291cmNlT3B0aW9ucztcclxuXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgaWQ6IGdlbmVyYXRlSWRGcm9tU291cmNlT3B0aW9ucyhzb3VyY2VPcHRpb25zKSxcclxuICAgICAgICB0eXBlOiBDYXRhbG9nSXRlbVR5cGUuTGF5ZXIsXHJcbiAgICAgICAgdGl0bGU6IGxheWVyLlRpdGxlLFxyXG4gICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgIHRpdGxlOiBsYXllci5UaXRsZSxcclxuICAgICAgICAgIHNvdXJjZU9wdGlvbnNcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9KVxyXG4gICAgLmZpbHRlcigoaXRlbTogQ2F0YWxvZ0l0ZW1MYXllciB8IHVuZGVmaW5lZCkgPT4gaXRlbSAhPT0gdW5kZWZpbmVkKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdGVzdExheWVyUmVnZXhlcyhsYXllck5hbWUsIHJlZ2V4ZXMpOiBib29sZWFuIHtcclxuICAgIGlmIChyZWdleGVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiByZWdleGVzLmZpbmQoKHJlZ2V4OiBSZWdFeHApID0+IHJlZ2V4LnRlc3QobGF5ZXJOYW1lKSkgIT09IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmV0cml2ZUxheWVySW5mb0Zvcm1hdChcclxuICAgIGxheWVyTmFtZUZyb21DYXRhbG9nOiBzdHJpbmcsXHJcbiAgICBsYXllcnNRdWVyeUZvcm1hdDogeyBsYXllcjogc3RyaW5nLCBxdWVyeUZvcm1hdDogUXVlcnlGb3JtYXQgfVtdXHJcbiAgKTogUXVlcnlGb3JtYXQge1xyXG5cclxuICAgIGNvbnN0IGN1cnJlbnRMYXllckluZm9Gb3JtYXQgPSBsYXllcnNRdWVyeUZvcm1hdC5maW5kKGYgPT4gZi5sYXllciA9PT0gbGF5ZXJOYW1lRnJvbUNhdGFsb2cpO1xyXG4gICAgY29uc3QgYmFzZUluZm9Gb3JtYXQgPSBsYXllcnNRdWVyeUZvcm1hdC5maW5kKGYgPT4gZi5sYXllciA9PT0gJyonKTtcclxuICAgIGxldCBxdWVyeUZvcm1hdDogUXVlcnlGb3JtYXQ7XHJcbiAgICBpZiAoY3VycmVudExheWVySW5mb0Zvcm1hdCkge1xyXG4gICAgICBxdWVyeUZvcm1hdCA9IGN1cnJlbnRMYXllckluZm9Gb3JtYXQucXVlcnlGb3JtYXQ7XHJcbiAgICB9IGVsc2UgaWYgKGJhc2VJbmZvRm9ybWF0KSB7XHJcbiAgICAgIHF1ZXJ5Rm9ybWF0ID0gYmFzZUluZm9Gb3JtYXQucXVlcnlGb3JtYXQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcXVlcnlGb3JtYXQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJldHJpZXZlVG9vbHRpcFR5cGUoY2F0YWxvZzogQ2F0YWxvZyk6IFRvb2x0aXBUeXBlIHtcclxuICAgIGlmICghY2F0YWxvZy50b29sdGlwVHlwZSkge1xyXG4gICAgICByZXR1cm4gVG9vbHRpcFR5cGUuVElUTEU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2F0YWxvZy50b29sdGlwVHlwZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZmluZENhdGFsb2dJbmZvRm9ybWF0KGNhdGFsb2c6IENhdGFsb2cpOiB7bGF5ZXI6IHN0cmluZywgcXVlcnlGb3JtYXQ6IFF1ZXJ5Rm9ybWF0fVtdIHtcclxuICAgIGNvbnN0IGxheWVyc1F1ZXJ5Rm9ybWF0OiB7bGF5ZXI6IHN0cmluZywgcXVlcnlGb3JtYXQ6IFF1ZXJ5Rm9ybWF0fVtdID0gW107XHJcbiAgICBpZiAoIWNhdGFsb2cucXVlcnlGb3JtYXQpIHtcclxuICAgICAgcmV0dXJuIGxheWVyc1F1ZXJ5Rm9ybWF0O1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmtleXMoY2F0YWxvZy5xdWVyeUZvcm1hdCkuZm9yRWFjaChjb25maWd1cmVkSW5mb0Zvcm1hdCA9PiB7XHJcbiAgICAgIGlmIChjYXRhbG9nLnF1ZXJ5Rm9ybWF0W2NvbmZpZ3VyZWRJbmZvRm9ybWF0XSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgY2F0YWxvZy5xdWVyeUZvcm1hdFtjb25maWd1cmVkSW5mb0Zvcm1hdF0uZm9yRWFjaChsYXllck5hbWUgPT4ge1xyXG4gICAgICAgICAgaWYgKCFsYXllcnNRdWVyeUZvcm1hdC5maW5kKHNwZWNpZmljID0+IHNwZWNpZmljLmxheWVyID09PSBsYXllck5hbWUpKSB7XHJcbiAgICAgICAgICAgIGxheWVyc1F1ZXJ5Rm9ybWF0LnB1c2goeyBsYXllcjogbGF5ZXJOYW1lLCBxdWVyeUZvcm1hdDogY29uZmlndXJlZEluZm9Gb3JtYXQgYXMgUXVlcnlGb3JtYXQgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKCFsYXllcnNRdWVyeUZvcm1hdC5maW5kKHNwZWNpZmljID0+IHNwZWNpZmljLmxheWVyID09PSBjYXRhbG9nLnF1ZXJ5Rm9ybWF0W2NvbmZpZ3VyZWRJbmZvRm9ybWF0XSkpIHtcclxuICAgICAgICAgIGxheWVyc1F1ZXJ5Rm9ybWF0LnB1c2goeyBsYXllcjogY2F0YWxvZy5xdWVyeUZvcm1hdFtjb25maWd1cmVkSW5mb0Zvcm1hdF0sIHF1ZXJ5Rm9ybWF0OiBjb25maWd1cmVkSW5mb0Zvcm1hdCBhcyBRdWVyeUZvcm1hdCB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGxheWVyc1F1ZXJ5Rm9ybWF0O1xyXG4gIH1cclxufVxyXG4iXX0=