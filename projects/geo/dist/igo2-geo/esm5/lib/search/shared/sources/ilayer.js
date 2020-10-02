/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LanguageService } from '@igo2/core';
import { ObjectUtils } from '@igo2/utils';
import { getResolutionFromScale } from '../../../map/shared/map.utils';
import { LAYER } from '../../../layer';
import { QueryFormat } from '../../../query';
import { SearchSource } from './source';
var ILayerSearchResultFormatter = /** @class */ (function () {
    function ILayerSearchResultFormatter(languageService) {
        this.languageService = languageService;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    ILayerSearchResultFormatter.prototype.formatResult = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        /** @type {?} */
        var allowedKey = [
            'title',
            'abstract',
            'groupTitle',
            'metadataUrl',
            'downloadUrl',
            'urlInfo',
            'name'
        ];
        /** @type {?} */
        var property = Object.entries(data.properties)
            .filter((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 1), key = _b[0];
            return allowedKey.indexOf(key) !== -1;
        }))
            .reduce((/**
         * @param {?} out
         * @param {?} entries
         * @return {?}
         */
        function (out, entries) {
            var _a = tslib_1.__read(entries, 2), key = _a[0], value = _a[1];
            /** @type {?} */
            var newKey;
            try {
                newKey = _this.languageService.translate.instant('igo.geo.search.ilayer.properties.' + key);
            }
            catch (e) {
                newKey = key;
            }
            out[newKey] = value ? value : '';
            return out;
        }), {});
        /** @type {?} */
        var dataR = Object.assign({}, data);
        dataR.properties = (/** @type {?} */ (property));
        return dataR;
    };
    ILayerSearchResultFormatter.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ILayerSearchResultFormatter.ctorParameters = function () { return [
        { type: LanguageService }
    ]; };
    return ILayerSearchResultFormatter;
}());
export { ILayerSearchResultFormatter };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ILayerSearchResultFormatter.prototype.languageService;
}
/**
 * ILayer search source
 */
var ILayerSearchSource = /** @class */ (function (_super) {
    tslib_1.__extends(ILayerSearchSource, _super);
    function ILayerSearchSource(http, languageService, options, formatter) {
        var _this = _super.call(this, options) || this;
        _this.http = http;
        _this.languageService = languageService;
        _this.formatter = formatter;
        _this.title$ = new BehaviorSubject('');
        _this.languageService.translate
            .get(_this.options.title)
            .subscribe((/**
         * @param {?} title
         * @return {?}
         */
        function (title) { return _this.title$.next(title); }));
        return _this;
    }
    Object.defineProperty(ILayerSearchSource.prototype, "title", {
        get: /**
         * @return {?}
         */
        function () {
            return this.title$.getValue();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ILayerSearchSource.prototype.getId = /**
     * @return {?}
     */
    function () {
        return ILayerSearchSource.id;
    };
    /**
     * @return {?}
     */
    ILayerSearchSource.prototype.getType = /**
     * @return {?}
     */
    function () {
        return ILayerSearchSource.type;
    };
    /**
     * @protected
     * @return {?}
     */
    ILayerSearchSource.prototype.getDefaultOptions = /**
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var limit = this.options.params && this.options.params.limit
            ? Number(this.options.params.limit)
            : undefined;
        return {
            title: 'igo.geo.search.ilayer.name',
            searchUrl: 'https://geoegl.msp.gouv.qc.ca/apis/layers/search',
            settings: [
                {
                    type: 'checkbox',
                    title: 'results type',
                    name: 'type',
                    values: [
                        {
                            title: 'igo.geo.search.ilayer.type.layer',
                            value: 'layer',
                            enabled: true,
                            hashtags: ['layer', 'layers', 'couche', 'couches']
                        },
                        {
                            title: 'igo.geo.search.ilayer.type.groupLayer',
                            value: 'group',
                            enabled: false,
                            hashtags: ['gr-layer', 'gr-layers', 'gr-couche', 'gr-couches']
                        }
                    ]
                },
                {
                    type: 'radiobutton',
                    title: 'results limit',
                    name: 'limit',
                    values: [
                        {
                            title: '1',
                            value: 1,
                            enabled: limit === 1
                        },
                        {
                            title: '5',
                            value: 5,
                            enabled: limit === 5 || !limit
                        },
                        {
                            title: '10',
                            value: 10,
                            enabled: limit === 10
                        },
                        {
                            title: '25',
                            value: 25,
                            enabled: limit === 25
                        },
                        {
                            title: '50',
                            value: 50,
                            enabled: limit === 50
                        }
                    ]
                }
            ]
        };
    };
    /**
     * Search a layer by name or keyword
     * @param term Layer name or keyword
     * @returns Observable of <SearchResult<LayerOptions>[]
     */
    /**
     * Search a layer by name or keyword
     * @param {?} term Layer name or keyword
     * @param {?=} options
     * @return {?} Observable of <SearchResult<LayerOptions>[]
     */
    ILayerSearchSource.prototype.search = /**
     * Search a layer by name or keyword
     * @param {?} term Layer name or keyword
     * @param {?=} options
     * @return {?} Observable of <SearchResult<LayerOptions>[]
     */
    function (term, options) {
        var _this = this;
        /** @type {?} */
        var params = this.computeSearchRequestParams(term, options || {});
        if (!params.get('q') || !params.get('type')) {
            return of([]);
        }
        this.options.params.page = params.get('page') || '1';
        return this.http
            .get(this.searchUrl, { params: params })
            .pipe(map((/**
         * @param {?} response
         * @return {?}
         */
        function (response) { return _this.extractResults(response); })));
    };
    /**
     * @private
     * @param {?} term
     * @param {?} options
     * @return {?}
     */
    ILayerSearchSource.prototype.computeSearchRequestParams = /**
     * @private
     * @param {?} term
     * @param {?} options
     * @return {?}
     */
    function (term, options) {
        return new HttpParams({
            fromObject: ObjectUtils.removeUndefined(Object.assign({
                q: this.computeTerm(term)
            }, this.params, this.computeOptionsParam(term, options || {}).params, {
                page: options.page
            }))
        });
    };
    /**
     * Remove hashtag from query
     * @param term Query with hashtag
     */
    /**
     * Remove hashtag from query
     * @private
     * @param {?} term Query with hashtag
     * @return {?}
     */
    ILayerSearchSource.prototype.computeTerm = /**
     * Remove hashtag from query
     * @private
     * @param {?} term Query with hashtag
     * @return {?}
     */
    function (term) {
        return term.replace(/(#[^\s]*)/g, '').replace(/[^\wÀ-ÿ !\-\(\),'#]+/g, '');
    };
    /**
     * Add hashtag to param if valid
     * @param term Query with hashtag
     * @param options TextSearchOptions
     */
    /**
     * Add hashtag to param if valid
     * @private
     * @param {?} term Query with hashtag
     * @param {?} options TextSearchOptions
     * @return {?}
     */
    ILayerSearchSource.prototype.computeOptionsParam = /**
     * Add hashtag to param if valid
     * @private
     * @param {?} term Query with hashtag
     * @param {?} options TextSearchOptions
     * @return {?}
     */
    function (term, options) {
        /** @type {?} */
        var hashtags = _super.prototype.getHashtagsValid.call(this, term, 'type');
        if (hashtags) {
            options.params = Object.assign(options.params || {}, {
                type: hashtags.join(',')
            });
        }
        return options;
    };
    /**
     * @private
     * @param {?} response
     * @return {?}
     */
    ILayerSearchSource.prototype.extractResults = /**
     * @private
     * @param {?} response
     * @return {?}
     */
    function (response) {
        var _this = this;
        return response.items.map((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            return _this.dataToResult(data, response);
        }));
    };
    /**
     * @private
     * @param {?} data
     * @param {?=} response
     * @return {?}
     */
    ILayerSearchSource.prototype.dataToResult = /**
     * @private
     * @param {?} data
     * @param {?=} response
     * @return {?}
     */
    function (data, response) {
        /** @type {?} */
        var layerOptions = this.computeLayerOptions(data);
        /** @type {?} */
        var titleHtml = data.highlight.title || data.properties.title;
        /** @type {?} */
        var groupTitle = data.highlight.groupTitle || data.properties.groupTitle;
        /** @type {?} */
        var subtitleHtml = groupTitle
            ? ' <small style="color: #6f6969"> ' + groupTitle + '</small>'
            : '';
        return {
            source: this,
            meta: {
                dataType: LAYER,
                id: [this.getId(), data.properties.id].join('.'),
                title: data.properties.title,
                titleHtml: titleHtml + subtitleHtml,
                icon: data.properties.type === 'Layer' ? 'layers' : 'map',
                nextPage: response.items.length % +this.options.params.limit === 0 &&
                    +this.options.params.page < 10
            },
            data: layerOptions
        };
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    ILayerSearchSource.prototype.computeLayerOptions = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var url = data.properties.url;
        /** @type {?} */
        var queryParams = this.extractQueryParamsFromSourceUrl(url);
        return ObjectUtils.removeUndefined({
            sourceOptions: {
                id: data.properties.id,
                type: data.properties.format,
                url: url,
                queryFormat: queryParams.queryFormat,
                queryHtmlTarget: queryParams.queryHtmlTarget,
                params: {
                    LAYERS: data.properties.name
                },
                optionsFromCapabilities: true,
                crossOrigin: 'anonymous'
            },
            title: data.properties.title,
            maxResolution: getResolutionFromScale(Number(data.properties.maxScaleDenom)),
            minResolution: getResolutionFromScale(Number(data.properties.minScaleDenom)),
            metadata: {
                url: data.properties.metadataUrl,
                extern: true
            },
            properties: this.formatter.formatResult(data).properties
        });
    };
    /**
     * @private
     * @param {?} url
     * @return {?}
     */
    ILayerSearchSource.prototype.extractQueryParamsFromSourceUrl = /**
     * @private
     * @param {?} url
     * @return {?}
     */
    function (url) {
        var e_1, _a;
        /** @type {?} */
        var queryFormat;
        /** @type {?} */
        var queryHtmlTarget;
        /** @type {?} */
        var formatOpt = ((/** @type {?} */ (this.options))).queryFormat;
        if (formatOpt) {
            var _loop_1 = function (key) {
                /** @type {?} */
                var value = formatOpt[key];
                if (value === '*') {
                    queryFormat = QueryFormat[key.toUpperCase()];
                    return "break";
                }
                /** @type {?} */
                var urls = ((/** @type {?} */ (((/** @type {?} */ (value)))))).urls;
                if (Array.isArray(urls)) {
                    urls.forEach((/**
                     * @param {?} urlOpt
                     * @return {?}
                     */
                    function (urlOpt) {
                        if (url.indexOf(urlOpt) !== -1) {
                            queryFormat = QueryFormat[key.toUpperCase()];
                        }
                    }));
                    return "break";
                }
            };
            try {
                for (var _b = tslib_1.__values(Object.keys(formatOpt)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    var state_1 = _loop_1(key);
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
            if (queryFormat === QueryFormat.HTML ||
                queryFormat === QueryFormat.HTMLGML2) {
                queryHtmlTarget = 'iframe';
            }
        }
        return {
            queryFormat: queryFormat,
            queryHtmlTarget: queryHtmlTarget
        };
    };
    ILayerSearchSource.id = 'ilayer';
    ILayerSearchSource.type = LAYER;
    ILayerSearchSource.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ILayerSearchSource.ctorParameters = function () { return [
        { type: HttpClient },
        { type: LanguageService },
        { type: undefined, decorators: [{ type: Inject, args: ['options',] }] },
        { type: ILayerSearchResultFormatter, decorators: [{ type: Inject, args: [ILayerSearchResultFormatter,] }] }
    ]; };
    return ILayerSearchSource;
}(SearchSource));
export { ILayerSearchSource };
if (false) {
    /** @type {?} */
    ILayerSearchSource.id;
    /** @type {?} */
    ILayerSearchSource.type;
    /** @type {?} */
    ILayerSearchSource.prototype.title$;
    /**
     * @type {?}
     * @private
     */
    ILayerSearchSource.prototype.http;
    /**
     * @type {?}
     * @private
     */
    ILayerSearchSource.prototype.languageService;
    /**
     * @type {?}
     * @private
     */
    ILayerSearchSource.prototype.formatter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zaGFyZWQvc291cmNlcy9pbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTlELE9BQU8sRUFBYyxlQUFlLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFMUMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDdkUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLE9BQU8sRUFBOEIsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJekUsT0FBTyxFQUFFLFlBQVksRUFBYyxNQUFNLFVBQVUsQ0FBQztBQVVwRDtJQUVFLHFDQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFBRyxDQUFDOzs7OztJQUV4RCxrREFBWTs7OztJQUFaLFVBQWEsSUFBZ0I7UUFBN0IsaUJBK0JDOztZQTlCTyxVQUFVLEdBQUc7WUFDakIsT0FBTztZQUNQLFVBQVU7WUFDVixZQUFZO1lBQ1osYUFBYTtZQUNiLGFBQWE7WUFDYixTQUFTO1lBQ1QsTUFBTTtTQUNQOztZQUVLLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDN0MsTUFBTTs7OztRQUFDLFVBQUMsRUFBSztnQkFBTCwwQkFBSyxFQUFKLFdBQUc7WUFBTSxPQUFBLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQTlCLENBQThCLEVBQUM7YUFDakQsTUFBTTs7Ozs7UUFBQyxVQUFDLEdBQTJCLEVBQUUsT0FBc0I7WUFDcEQsSUFBQSwrQkFBc0IsRUFBckIsV0FBRyxFQUFFLGFBQWdCOztnQkFDeEIsTUFBTTtZQUNWLElBQUk7Z0JBQ0YsTUFBTSxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FDN0MsbUNBQW1DLEdBQUcsR0FBRyxDQUMxQyxDQUFDO2FBQ0g7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixNQUFNLEdBQUcsR0FBRyxDQUFDO2FBQ2Q7WUFDRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNqQyxPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUMsR0FBRSxFQUFFLENBQUM7O1lBRUYsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQztRQUNyQyxLQUFLLENBQUMsVUFBVSxHQUFHLG1CQUFBLFFBQVEsRUFBb0IsQ0FBQztRQUVoRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7O2dCQW5DRixVQUFVOzs7O2dCQW5CRixlQUFlOztJQXVEeEIsa0NBQUM7Q0FBQSxBQXBDRCxJQW9DQztTQW5DWSwyQkFBMkI7Ozs7OztJQUMxQixzREFBd0M7Ozs7O0FBdUN0RDtJQUN3Qyw4Q0FBWTtJQVVsRCw0QkFDVSxJQUFnQixFQUNoQixlQUFnQyxFQUNyQixPQUFrQyxFQUU3QyxTQUFzQztRQUxoRCxZQU9FLGtCQUFNLE9BQU8sQ0FBQyxTQUlmO1FBVlMsVUFBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixxQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFHaEMsZUFBUyxHQUFULFNBQVMsQ0FBNkI7UUFYaEQsWUFBTSxHQUE0QixJQUFJLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztRQWNoRSxLQUFJLENBQUMsZUFBZSxDQUFDLFNBQVM7YUFDM0IsR0FBRyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO2FBQ3ZCLFNBQVM7Ozs7UUFBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUF2QixDQUF1QixFQUFDLENBQUM7O0lBQ2pELENBQUM7SUFmRCxzQkFBSSxxQ0FBSzs7OztRQUFUO1lBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hDLENBQUM7OztPQUFBOzs7O0lBZUQsa0NBQUs7OztJQUFMO1FBQ0UsT0FBTyxrQkFBa0IsQ0FBQyxFQUFFLENBQUM7SUFDL0IsQ0FBQzs7OztJQUVELG9DQUFPOzs7SUFBUDtRQUNFLE9BQU8sa0JBQWtCLENBQUMsSUFBSSxDQUFDO0lBQ2pDLENBQUM7Ozs7O0lBRVMsOENBQWlCOzs7O0lBQTNCOztZQUNRLEtBQUssR0FDVCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLO1lBQzlDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxTQUFTO1FBQ2YsT0FBTztZQUNMLEtBQUssRUFBRSw0QkFBNEI7WUFDbkMsU0FBUyxFQUFFLGtEQUFrRDtZQUM3RCxRQUFRLEVBQUU7Z0JBQ1I7b0JBQ0UsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLEtBQUssRUFBRSxjQUFjO29CQUNyQixJQUFJLEVBQUUsTUFBTTtvQkFDWixNQUFNLEVBQUU7d0JBQ047NEJBQ0UsS0FBSyxFQUFFLGtDQUFrQzs0QkFDekMsS0FBSyxFQUFFLE9BQU87NEJBQ2QsT0FBTyxFQUFFLElBQUk7NEJBQ2IsUUFBUSxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDO3lCQUNuRDt3QkFDRDs0QkFDRSxLQUFLLEVBQUUsdUNBQXVDOzRCQUM5QyxLQUFLLEVBQUUsT0FBTzs0QkFDZCxPQUFPLEVBQUUsS0FBSzs0QkFDZCxRQUFRLEVBQUUsQ0FBQyxVQUFVLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxZQUFZLENBQUM7eUJBQy9EO3FCQUNGO2lCQUNGO2dCQUNEO29CQUNFLElBQUksRUFBRSxhQUFhO29CQUNuQixLQUFLLEVBQUUsZUFBZTtvQkFDdEIsSUFBSSxFQUFFLE9BQU87b0JBQ2IsTUFBTSxFQUFFO3dCQUNOOzRCQUNFLEtBQUssRUFBRSxHQUFHOzRCQUNWLEtBQUssRUFBRSxDQUFDOzRCQUNSLE9BQU8sRUFBRSxLQUFLLEtBQUssQ0FBQzt5QkFDckI7d0JBQ0Q7NEJBQ0UsS0FBSyxFQUFFLEdBQUc7NEJBQ1YsS0FBSyxFQUFFLENBQUM7NEJBQ1IsT0FBTyxFQUFFLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLO3lCQUMvQjt3QkFDRDs0QkFDRSxLQUFLLEVBQUUsSUFBSTs0QkFDWCxLQUFLLEVBQUUsRUFBRTs0QkFDVCxPQUFPLEVBQUUsS0FBSyxLQUFLLEVBQUU7eUJBQ3RCO3dCQUNEOzRCQUNFLEtBQUssRUFBRSxJQUFJOzRCQUNYLEtBQUssRUFBRSxFQUFFOzRCQUNULE9BQU8sRUFBRSxLQUFLLEtBQUssRUFBRTt5QkFDdEI7d0JBQ0Q7NEJBQ0UsS0FBSyxFQUFFLElBQUk7NEJBQ1gsS0FBSyxFQUFFLEVBQUU7NEJBQ1QsT0FBTyxFQUFFLEtBQUssS0FBSyxFQUFFO3lCQUN0QjtxQkFDRjtpQkFDRjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gsbUNBQU07Ozs7OztJQUFOLFVBQ0UsSUFBd0IsRUFDeEIsT0FBMkI7UUFGN0IsaUJBZUM7O1lBWE8sTUFBTSxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUNuRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDM0MsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDZjtRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQztRQUVyRCxPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ2IsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLFFBQUEsRUFBRSxDQUFDO2FBQy9CLElBQUksQ0FDSCxHQUFHOzs7O1FBQUMsVUFBQyxRQUErQixJQUFLLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBN0IsQ0FBNkIsRUFBQyxDQUN4RSxDQUFDO0lBQ04sQ0FBQzs7Ozs7OztJQUVPLHVEQUEwQjs7Ozs7O0lBQWxDLFVBQ0UsSUFBWSxFQUNaLE9BQTBCO1FBRTFCLE9BQU8sSUFBSSxVQUFVLENBQUM7WUFDcEIsVUFBVSxFQUFFLFdBQVcsQ0FBQyxlQUFlLENBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQ1g7Z0JBQ0UsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO2FBQzFCLEVBQ0QsSUFBSSxDQUFDLE1BQU0sRUFDWCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQ3BEO2dCQUNFLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTthQUNuQixDQUNGLENBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0ssd0NBQVc7Ozs7OztJQUFuQixVQUFvQixJQUFZO1FBQzlCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7OztJQUNLLGdEQUFtQjs7Ozs7OztJQUEzQixVQUNFLElBQVksRUFDWixPQUEwQjs7WUFFcEIsUUFBUSxHQUFHLGlCQUFNLGdCQUFnQixZQUFDLElBQUksRUFBRSxNQUFNLENBQUM7UUFDckQsSUFBSSxRQUFRLEVBQUU7WUFDWixPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxFQUFFLEVBQUU7Z0JBQ25ELElBQUksRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzthQUN6QixDQUFDLENBQUM7U0FDSjtRQUVELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Ozs7OztJQUVPLDJDQUFjOzs7OztJQUF0QixVQUNFLFFBQStCO1FBRGpDLGlCQU1DO1FBSEMsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUc7Ozs7UUFBQyxVQUFDLElBQWdCO1lBQ3pDLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDO1FBQWpDLENBQWlDLEVBQ2xDLENBQUM7SUFDSixDQUFDOzs7Ozs7O0lBRU8seUNBQVk7Ozs7OztJQUFwQixVQUNFLElBQWdCLEVBQ2hCLFFBQWdDOztZQUUxQixZQUFZLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQzs7WUFFN0MsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSzs7WUFDekQsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVTs7WUFDcEUsWUFBWSxHQUFHLFVBQVU7WUFDN0IsQ0FBQyxDQUFDLGtDQUFrQyxHQUFHLFVBQVUsR0FBRyxVQUFVO1lBQzlELENBQUMsQ0FBQyxFQUFFO1FBRU4sT0FBTztZQUNMLE1BQU0sRUFBRSxJQUFJO1lBQ1osSUFBSSxFQUFFO2dCQUNKLFFBQVEsRUFBRSxLQUFLO2dCQUNmLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ2hELEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUs7Z0JBQzVCLFNBQVMsRUFBRSxTQUFTLEdBQUcsWUFBWTtnQkFDbkMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLO2dCQUN6RCxRQUFRLEVBQ04sUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssQ0FBQztvQkFDeEQsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsRUFBRTthQUNqQztZQUNELElBQUksRUFBRSxZQUFZO1NBQ25CLENBQUM7SUFDSixDQUFDOzs7Ozs7SUFFTyxnREFBbUI7Ozs7O0lBQTNCLFVBQTRCLElBQWdCOztZQUNwQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHOztZQUN6QixXQUFXLEdBQStCLElBQUksQ0FBQywrQkFBK0IsQ0FDbEYsR0FBRyxDQUNKO1FBQ0QsT0FBTyxXQUFXLENBQUMsZUFBZSxDQUFDO1lBQ2pDLGFBQWEsRUFBRTtnQkFDYixFQUFFLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUN0QixJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNO2dCQUM1QixHQUFHLEtBQUE7Z0JBQ0gsV0FBVyxFQUFFLFdBQVcsQ0FBQyxXQUFXO2dCQUNwQyxlQUFlLEVBQUUsV0FBVyxDQUFDLGVBQWU7Z0JBQzVDLE1BQU0sRUFBRTtvQkFDTixNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJO2lCQUM3QjtnQkFDRCx1QkFBdUIsRUFBRSxJQUFJO2dCQUM3QixXQUFXLEVBQUUsV0FBVzthQUN6QjtZQUNELEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUs7WUFDNUIsYUFBYSxFQUFFLHNCQUFzQixDQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FDdEM7WUFDRCxhQUFhLEVBQUUsc0JBQXNCLENBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUN0QztZQUNELFFBQVEsRUFBRTtnQkFDUixHQUFHLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXO2dCQUNoQyxNQUFNLEVBQUUsSUFBSTthQUNiO1lBQ0QsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVU7U0FDekQsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBRU8sNERBQStCOzs7OztJQUF2QyxVQUNFLEdBQVc7OztZQUVQLFdBQVc7O1lBQ1gsZUFBZTs7WUFDYixTQUFTLEdBQUcsQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUE2QixDQUFDLENBQUMsV0FBVztRQUN6RSxJQUFJLFNBQVMsRUFBRTtvQ0FDRixHQUFHOztvQkFDTixLQUFLLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQztnQkFDNUIsSUFBSSxLQUFLLEtBQUssR0FBRyxFQUFFO29CQUNqQixXQUFXLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDOztpQkFFOUM7O29CQUVLLElBQUksR0FBRyxDQUFDLG1CQUFBLENBQUMsbUJBQUEsS0FBSyxFQUFPLENBQUMsRUFBc0IsQ0FBQyxDQUFDLElBQUk7Z0JBQ3hELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDdkIsSUFBSSxDQUFDLE9BQU87Ozs7b0JBQUMsVUFBQSxNQUFNO3dCQUNqQixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7NEJBQzlCLFdBQVcsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7eUJBQzlDO29CQUNILENBQUMsRUFBQyxDQUFDOztpQkFFSjs7O2dCQWZILEtBQWtCLElBQUEsS0FBQSxpQkFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBLGdCQUFBO29CQUFuQyxJQUFNLEdBQUcsV0FBQTswQ0FBSCxHQUFHOzs7aUJBZ0JiOzs7Ozs7Ozs7WUFFRCxJQUNFLFdBQVcsS0FBSyxXQUFXLENBQUMsSUFBSTtnQkFDaEMsV0FBVyxLQUFLLFdBQVcsQ0FBQyxRQUFRLEVBQ3BDO2dCQUNBLGVBQWUsR0FBRyxRQUFRLENBQUM7YUFDNUI7U0FDRjtRQUVELE9BQU87WUFDTCxXQUFXLGFBQUE7WUFDWCxlQUFlLGlCQUFBO1NBQ2hCLENBQUM7SUFDSixDQUFDO0lBN1FNLHFCQUFFLEdBQUcsUUFBUSxDQUFDO0lBQ2QsdUJBQUksR0FBRyxLQUFLLENBQUM7O2dCQUhyQixVQUFVOzs7O2dCQWpFRixVQUFVO2dCQUtWLGVBQWU7Z0RBMEVuQixNQUFNLFNBQUMsU0FBUztnQkFFRSwyQkFBMkIsdUJBRDdDLE1BQU0sU0FBQywyQkFBMkI7O0lBaVF2Qyx5QkFBQztDQUFBLEFBaFJELENBQ3dDLFlBQVksR0ErUW5EO1NBL1FZLGtCQUFrQjs7O0lBQzdCLHNCQUFxQjs7SUFDckIsd0JBQW9COztJQUVwQixvQ0FBa0U7Ozs7O0lBT2hFLGtDQUF3Qjs7Ozs7SUFDeEIsNkNBQXdDOzs7OztJQUV4Qyx1Q0FDOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IE9iamVjdFV0aWxzIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgZ2V0UmVzb2x1dGlvbkZyb21TY2FsZSB9IGZyb20gJy4uLy4uLy4uL21hcC9zaGFyZWQvbWFwLnV0aWxzJztcclxuaW1wb3J0IHsgTEFZRVIgfSBmcm9tICcuLi8uLi8uLi9sYXllcic7XHJcbmltcG9ydCB7IFF1ZXJ5YWJsZURhdGFTb3VyY2VPcHRpb25zLCBRdWVyeUZvcm1hdCB9IGZyb20gJy4uLy4uLy4uL3F1ZXJ5JztcclxuaW1wb3J0IHsgUXVlcnlIdG1sVGFyZ2V0IH0gZnJvbSAnLi8uLi8uLi8uLi9xdWVyeS9zaGFyZWQvcXVlcnkuZW51bXMnO1xyXG5cclxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi4vc2VhcmNoLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2UsIFRleHRTZWFyY2ggfSBmcm9tICcuL3NvdXJjZSc7XHJcbmltcG9ydCB7IFRleHRTZWFyY2hPcHRpb25zIH0gZnJvbSAnLi9zb3VyY2UuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7XHJcbiAgSUxheWVyU2VhcmNoU291cmNlT3B0aW9ucyxcclxuICBJTGF5ZXJEYXRhLFxyXG4gIElMYXllckl0ZW1SZXNwb25zZSxcclxuICBJTGF5ZXJTZXJ2aWNlUmVzcG9uc2UsXHJcbiAgSUxheWVyRGF0YVNvdXJjZVxyXG59IGZyb20gJy4vaWxheWVyLmludGVyZmFjZXMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSUxheWVyU2VhcmNoUmVzdWx0Rm9ybWF0dGVyIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlKSB7fVxyXG5cclxuICBmb3JtYXRSZXN1bHQoZGF0YTogSUxheWVyRGF0YSk6IElMYXllckRhdGEge1xyXG4gICAgY29uc3QgYWxsb3dlZEtleSA9IFtcclxuICAgICAgJ3RpdGxlJyxcclxuICAgICAgJ2Fic3RyYWN0JyxcclxuICAgICAgJ2dyb3VwVGl0bGUnLFxyXG4gICAgICAnbWV0YWRhdGFVcmwnLFxyXG4gICAgICAnZG93bmxvYWRVcmwnLFxyXG4gICAgICAndXJsSW5mbycsXHJcbiAgICAgICduYW1lJ1xyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdCBwcm9wZXJ0eSA9IE9iamVjdC5lbnRyaWVzKGRhdGEucHJvcGVydGllcylcclxuICAgICAgLmZpbHRlcigoW2tleV0pID0+IGFsbG93ZWRLZXkuaW5kZXhPZihrZXkpICE9PSAtMSlcclxuICAgICAgLnJlZHVjZSgob3V0OiB7IFtrZXk6IHN0cmluZ106IGFueSB9LCBlbnRyaWVzOiBbc3RyaW5nLCBhbnldKSA9PiB7XHJcbiAgICAgICAgY29uc3QgW2tleSwgdmFsdWVdID0gZW50cmllcztcclxuICAgICAgICBsZXQgbmV3S2V5O1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBuZXdLZXkgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICAgJ2lnby5nZW8uc2VhcmNoLmlsYXllci5wcm9wZXJ0aWVzLicgKyBrZXlcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgbmV3S2V5ID0ga2V5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBvdXRbbmV3S2V5XSA9IHZhbHVlID8gdmFsdWUgOiAnJztcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgICB9LCB7fSk7XHJcblxyXG4gICAgY29uc3QgZGF0YVIgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhKTtcclxuICAgIGRhdGFSLnByb3BlcnRpZXMgPSBwcm9wZXJ0eSBhcyBJTGF5ZXJEYXRhU291cmNlO1xyXG5cclxuICAgIHJldHVybiBkYXRhUjtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJTGF5ZXIgc2VhcmNoIHNvdXJjZVxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSUxheWVyU2VhcmNoU291cmNlIGV4dGVuZHMgU2VhcmNoU291cmNlIGltcGxlbWVudHMgVGV4dFNlYXJjaCB7XHJcbiAgc3RhdGljIGlkID0gJ2lsYXllcic7XHJcbiAgc3RhdGljIHR5cGUgPSBMQVlFUjtcclxuXHJcbiAgdGl0bGUkOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XHJcblxyXG4gIGdldCB0aXRsZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMudGl0bGUkLmdldFZhbHVlKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBASW5qZWN0KCdvcHRpb25zJykgb3B0aW9uczogSUxheWVyU2VhcmNoU291cmNlT3B0aW9ucyxcclxuICAgIEBJbmplY3QoSUxheWVyU2VhcmNoUmVzdWx0Rm9ybWF0dGVyKVxyXG4gICAgcHJpdmF0ZSBmb3JtYXR0ZXI6IElMYXllclNlYXJjaFJlc3VsdEZvcm1hdHRlclxyXG4gICkge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGVcclxuICAgICAgLmdldCh0aGlzLm9wdGlvbnMudGl0bGUpXHJcbiAgICAgIC5zdWJzY3JpYmUodGl0bGUgPT4gdGhpcy50aXRsZSQubmV4dCh0aXRsZSkpO1xyXG4gIH1cclxuXHJcbiAgZ2V0SWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBJTGF5ZXJTZWFyY2hTb3VyY2UuaWQ7XHJcbiAgfVxyXG5cclxuICBnZXRUeXBlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gSUxheWVyU2VhcmNoU291cmNlLnR5cGU7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0RGVmYXVsdE9wdGlvbnMoKTogSUxheWVyU2VhcmNoU291cmNlT3B0aW9ucyB7XHJcbiAgICBjb25zdCBsaW1pdCA9XHJcbiAgICAgIHRoaXMub3B0aW9ucy5wYXJhbXMgJiYgdGhpcy5vcHRpb25zLnBhcmFtcy5saW1pdFxyXG4gICAgICAgID8gTnVtYmVyKHRoaXMub3B0aW9ucy5wYXJhbXMubGltaXQpXHJcbiAgICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLmlsYXllci5uYW1lJyxcclxuICAgICAgc2VhcmNoVXJsOiAnaHR0cHM6Ly9nZW9lZ2wubXNwLmdvdXYucWMuY2EvYXBpcy9sYXllcnMvc2VhcmNoJyxcclxuICAgICAgc2V0dGluZ3M6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAnY2hlY2tib3gnLFxyXG4gICAgICAgICAgdGl0bGU6ICdyZXN1bHRzIHR5cGUnLFxyXG4gICAgICAgICAgbmFtZTogJ3R5cGUnLFxyXG4gICAgICAgICAgdmFsdWVzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLmlsYXllci50eXBlLmxheWVyJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ2xheWVyJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgIGhhc2h0YWdzOiBbJ2xheWVyJywgJ2xheWVycycsICdjb3VjaGUnLCAnY291Y2hlcyddXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLmlsYXllci50eXBlLmdyb3VwTGF5ZXInLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAnZ3JvdXAnLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIGhhc2h0YWdzOiBbJ2dyLWxheWVyJywgJ2dyLWxheWVycycsICdnci1jb3VjaGUnLCAnZ3ItY291Y2hlcyddXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdyYWRpb2J1dHRvbicsXHJcbiAgICAgICAgICB0aXRsZTogJ3Jlc3VsdHMgbGltaXQnLFxyXG4gICAgICAgICAgbmFtZTogJ2xpbWl0JyxcclxuICAgICAgICAgIHZhbHVlczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICcxJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBsaW1pdCA9PT0gMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICc1JyxcclxuICAgICAgICAgICAgICB2YWx1ZTogNSxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBsaW1pdCA9PT0gNSB8fCAhbGltaXRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnMTAnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAxMCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBsaW1pdCA9PT0gMTBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnMjUnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAyNSxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBsaW1pdCA9PT0gMjVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnNTAnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiA1MCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBsaW1pdCA9PT0gNTBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBhIGxheWVyIGJ5IG5hbWUgb3Iga2V5d29yZFxyXG4gICAqIEBwYXJhbSB0ZXJtIExheWVyIG5hbWUgb3Iga2V5d29yZFxyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgPFNlYXJjaFJlc3VsdDxMYXllck9wdGlvbnM+W11cclxuICAgKi9cclxuICBzZWFyY2goXHJcbiAgICB0ZXJtOiBzdHJpbmcgfCB1bmRlZmluZWQsXHJcbiAgICBvcHRpb25zPzogVGV4dFNlYXJjaE9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFNlYXJjaFJlc3VsdDxJTGF5ZXJJdGVtUmVzcG9uc2U+W10+IHtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuY29tcHV0ZVNlYXJjaFJlcXVlc3RQYXJhbXModGVybSwgb3B0aW9ucyB8fCB7fSk7XHJcbiAgICBpZiAoIXBhcmFtcy5nZXQoJ3EnKSB8fCAhcGFyYW1zLmdldCgndHlwZScpKSB7XHJcbiAgICAgIHJldHVybiBvZihbXSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9wdGlvbnMucGFyYW1zLnBhZ2UgPSBwYXJhbXMuZ2V0KCdwYWdlJykgfHwgJzEnO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLmdldCh0aGlzLnNlYXJjaFVybCwgeyBwYXJhbXMgfSlcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChyZXNwb25zZTogSUxheWVyU2VydmljZVJlc3BvbnNlKSA9PiB0aGlzLmV4dHJhY3RSZXN1bHRzKHJlc3BvbnNlKSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZVNlYXJjaFJlcXVlc3RQYXJhbXMoXHJcbiAgICB0ZXJtOiBzdHJpbmcsXHJcbiAgICBvcHRpb25zOiBUZXh0U2VhcmNoT3B0aW9uc1xyXG4gICk6IEh0dHBQYXJhbXMge1xyXG4gICAgcmV0dXJuIG5ldyBIdHRwUGFyYW1zKHtcclxuICAgICAgZnJvbU9iamVjdDogT2JqZWN0VXRpbHMucmVtb3ZlVW5kZWZpbmVkKFxyXG4gICAgICAgIE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHE6IHRoaXMuY29tcHV0ZVRlcm0odGVybSlcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB0aGlzLnBhcmFtcyxcclxuICAgICAgICAgIHRoaXMuY29tcHV0ZU9wdGlvbnNQYXJhbSh0ZXJtLCBvcHRpb25zIHx8IHt9KS5wYXJhbXMsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHBhZ2U6IG9wdGlvbnMucGFnZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgICAgKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgaGFzaHRhZyBmcm9tIHF1ZXJ5XHJcbiAgICogQHBhcmFtIHRlcm0gUXVlcnkgd2l0aCBoYXNodGFnXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjb21wdXRlVGVybSh0ZXJtOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRlcm0ucmVwbGFjZSgvKCNbXlxcc10qKS9nLCAnJykucmVwbGFjZSgvW15cXHfDgC3DvyAhXFwtXFwoXFwpLCcjXSsvZywgJycpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGhhc2h0YWcgdG8gcGFyYW0gaWYgdmFsaWRcclxuICAgKiBAcGFyYW0gdGVybSBRdWVyeSB3aXRoIGhhc2h0YWdcclxuICAgKiBAcGFyYW0gb3B0aW9ucyBUZXh0U2VhcmNoT3B0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgY29tcHV0ZU9wdGlvbnNQYXJhbShcclxuICAgIHRlcm06IHN0cmluZyxcclxuICAgIG9wdGlvbnM6IFRleHRTZWFyY2hPcHRpb25zXHJcbiAgKTogVGV4dFNlYXJjaE9wdGlvbnMge1xyXG4gICAgY29uc3QgaGFzaHRhZ3MgPSBzdXBlci5nZXRIYXNodGFnc1ZhbGlkKHRlcm0sICd0eXBlJyk7XHJcbiAgICBpZiAoaGFzaHRhZ3MpIHtcclxuICAgICAgb3B0aW9ucy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKG9wdGlvbnMucGFyYW1zIHx8IHt9LCB7XHJcbiAgICAgICAgdHlwZTogaGFzaHRhZ3Muam9pbignLCcpXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvcHRpb25zO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0UmVzdWx0cyhcclxuICAgIHJlc3BvbnNlOiBJTGF5ZXJTZXJ2aWNlUmVzcG9uc2VcclxuICApOiBTZWFyY2hSZXN1bHQ8SUxheWVySXRlbVJlc3BvbnNlPltdIHtcclxuICAgIHJldHVybiByZXNwb25zZS5pdGVtcy5tYXAoKGRhdGE6IElMYXllckRhdGEpID0+XHJcbiAgICAgIHRoaXMuZGF0YVRvUmVzdWx0KGRhdGEsIHJlc3BvbnNlKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGF0YVRvUmVzdWx0KFxyXG4gICAgZGF0YTogSUxheWVyRGF0YSxcclxuICAgIHJlc3BvbnNlPzogSUxheWVyU2VydmljZVJlc3BvbnNlXHJcbiAgKTogU2VhcmNoUmVzdWx0PElMYXllckl0ZW1SZXNwb25zZT4ge1xyXG4gICAgY29uc3QgbGF5ZXJPcHRpb25zID0gdGhpcy5jb21wdXRlTGF5ZXJPcHRpb25zKGRhdGEpO1xyXG5cclxuICAgIGNvbnN0IHRpdGxlSHRtbCA9IGRhdGEuaGlnaGxpZ2h0LnRpdGxlIHx8IGRhdGEucHJvcGVydGllcy50aXRsZTtcclxuICAgIGNvbnN0IGdyb3VwVGl0bGUgPSBkYXRhLmhpZ2hsaWdodC5ncm91cFRpdGxlIHx8IGRhdGEucHJvcGVydGllcy5ncm91cFRpdGxlO1xyXG4gICAgY29uc3Qgc3VidGl0bGVIdG1sID0gZ3JvdXBUaXRsZVxyXG4gICAgICA/ICcgPHNtYWxsIHN0eWxlPVwiY29sb3I6ICM2ZjY5NjlcIj4gJyArIGdyb3VwVGl0bGUgKyAnPC9zbWFsbD4nXHJcbiAgICAgIDogJyc7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc291cmNlOiB0aGlzLFxyXG4gICAgICBtZXRhOiB7XHJcbiAgICAgICAgZGF0YVR5cGU6IExBWUVSLFxyXG4gICAgICAgIGlkOiBbdGhpcy5nZXRJZCgpLCBkYXRhLnByb3BlcnRpZXMuaWRdLmpvaW4oJy4nKSxcclxuICAgICAgICB0aXRsZTogZGF0YS5wcm9wZXJ0aWVzLnRpdGxlLFxyXG4gICAgICAgIHRpdGxlSHRtbDogdGl0bGVIdG1sICsgc3VidGl0bGVIdG1sLFxyXG4gICAgICAgIGljb246IGRhdGEucHJvcGVydGllcy50eXBlID09PSAnTGF5ZXInID8gJ2xheWVycycgOiAnbWFwJyxcclxuICAgICAgICBuZXh0UGFnZTpcclxuICAgICAgICAgIHJlc3BvbnNlLml0ZW1zLmxlbmd0aCAlICt0aGlzLm9wdGlvbnMucGFyYW1zLmxpbWl0ID09PSAwICYmXHJcbiAgICAgICAgICArdGhpcy5vcHRpb25zLnBhcmFtcy5wYWdlIDwgMTBcclxuICAgICAgfSxcclxuICAgICAgZGF0YTogbGF5ZXJPcHRpb25zXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlTGF5ZXJPcHRpb25zKGRhdGE6IElMYXllckRhdGEpOiBJTGF5ZXJJdGVtUmVzcG9uc2Uge1xyXG4gICAgY29uc3QgdXJsID0gZGF0YS5wcm9wZXJ0aWVzLnVybDtcclxuICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiBRdWVyeWFibGVEYXRhU291cmNlT3B0aW9ucyA9IHRoaXMuZXh0cmFjdFF1ZXJ5UGFyYW1zRnJvbVNvdXJjZVVybChcclxuICAgICAgdXJsXHJcbiAgICApO1xyXG4gICAgcmV0dXJuIE9iamVjdFV0aWxzLnJlbW92ZVVuZGVmaW5lZCh7XHJcbiAgICAgIHNvdXJjZU9wdGlvbnM6IHtcclxuICAgICAgICBpZDogZGF0YS5wcm9wZXJ0aWVzLmlkLFxyXG4gICAgICAgIHR5cGU6IGRhdGEucHJvcGVydGllcy5mb3JtYXQsXHJcbiAgICAgICAgdXJsLFxyXG4gICAgICAgIHF1ZXJ5Rm9ybWF0OiBxdWVyeVBhcmFtcy5xdWVyeUZvcm1hdCxcclxuICAgICAgICBxdWVyeUh0bWxUYXJnZXQ6IHF1ZXJ5UGFyYW1zLnF1ZXJ5SHRtbFRhcmdldCxcclxuICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgIExBWUVSUzogZGF0YS5wcm9wZXJ0aWVzLm5hbWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9wdGlvbnNGcm9tQ2FwYWJpbGl0aWVzOiB0cnVlLFxyXG4gICAgICAgIGNyb3NzT3JpZ2luOiAnYW5vbnltb3VzJ1xyXG4gICAgICB9LFxyXG4gICAgICB0aXRsZTogZGF0YS5wcm9wZXJ0aWVzLnRpdGxlLFxyXG4gICAgICBtYXhSZXNvbHV0aW9uOiBnZXRSZXNvbHV0aW9uRnJvbVNjYWxlKFxyXG4gICAgICAgIE51bWJlcihkYXRhLnByb3BlcnRpZXMubWF4U2NhbGVEZW5vbSlcclxuICAgICAgKSxcclxuICAgICAgbWluUmVzb2x1dGlvbjogZ2V0UmVzb2x1dGlvbkZyb21TY2FsZShcclxuICAgICAgICBOdW1iZXIoZGF0YS5wcm9wZXJ0aWVzLm1pblNjYWxlRGVub20pXHJcbiAgICAgICksXHJcbiAgICAgIG1ldGFkYXRhOiB7XHJcbiAgICAgICAgdXJsOiBkYXRhLnByb3BlcnRpZXMubWV0YWRhdGFVcmwsXHJcbiAgICAgICAgZXh0ZXJuOiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgIHByb3BlcnRpZXM6IHRoaXMuZm9ybWF0dGVyLmZvcm1hdFJlc3VsdChkYXRhKS5wcm9wZXJ0aWVzXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdFF1ZXJ5UGFyYW1zRnJvbVNvdXJjZVVybChcclxuICAgIHVybDogc3RyaW5nXHJcbiAgKTogeyBxdWVyeUZvcm1hdDogUXVlcnlGb3JtYXQ7IHF1ZXJ5SHRtbFRhcmdldDogUXVlcnlIdG1sVGFyZ2V0IH0ge1xyXG4gICAgbGV0IHF1ZXJ5Rm9ybWF0O1xyXG4gICAgbGV0IHF1ZXJ5SHRtbFRhcmdldDtcclxuICAgIGNvbnN0IGZvcm1hdE9wdCA9ICh0aGlzLm9wdGlvbnMgYXMgSUxheWVyU2VhcmNoU291cmNlT3B0aW9ucykucXVlcnlGb3JtYXQ7XHJcbiAgICBpZiAoZm9ybWF0T3B0KSB7XHJcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGZvcm1hdE9wdCkpIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IGZvcm1hdE9wdFtrZXldO1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gJyonKSB7XHJcbiAgICAgICAgICBxdWVyeUZvcm1hdCA9IFF1ZXJ5Rm9ybWF0W2tleS50b1VwcGVyQ2FzZSgpXTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdXJscyA9ICgodmFsdWUgYXMgYW55KSBhcyB7IHVybHM6IHN0cmluZ1tdIH0pLnVybHM7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodXJscykpIHtcclxuICAgICAgICAgIHVybHMuZm9yRWFjaCh1cmxPcHQgPT4ge1xyXG4gICAgICAgICAgICBpZiAodXJsLmluZGV4T2YodXJsT3B0KSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICBxdWVyeUZvcm1hdCA9IFF1ZXJ5Rm9ybWF0W2tleS50b1VwcGVyQ2FzZSgpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChcclxuICAgICAgICBxdWVyeUZvcm1hdCA9PT0gUXVlcnlGb3JtYXQuSFRNTCB8fFxyXG4gICAgICAgIHF1ZXJ5Rm9ybWF0ID09PSBRdWVyeUZvcm1hdC5IVE1MR01MMlxyXG4gICAgICApIHtcclxuICAgICAgICBxdWVyeUh0bWxUYXJnZXQgPSAnaWZyYW1lJztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHF1ZXJ5Rm9ybWF0LFxyXG4gICAgICBxdWVyeUh0bWxUYXJnZXRcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==