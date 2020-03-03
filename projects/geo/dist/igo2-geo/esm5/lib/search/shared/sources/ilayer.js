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
        var allowedKey = ['title', 'abstract', 'groupTitle', 'metadataUrl'];
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
        function (data) { return _this.dataToResult(data, response); }));
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
                nextPage: response.items.length % +this.options.params.limit === 0 && +this.options.params.page < 10
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
        return {
            sourceOptions: {
                id: data.properties.id,
                crossOrigin: 'anonymous',
                type: data.properties.format,
                url: url,
                queryFormat: queryParams.queryFormat,
                queryHtmlTarget: queryParams.queryHtmlTarget,
                queryable: data.properties.queryable,
                params: {
                    LAYERS: data.properties.name
                }
            },
            title: data.properties.title,
            maxResolution: getResolutionFromScale(Number(data.properties.maxScaleDenom)) ||
                Infinity,
            minResolution: getResolutionFromScale(Number(data.properties.minScaleDenom)) || 0,
            metadata: {
                url: data.properties.metadataUrl,
                extern: true
            },
            properties: this.formatter.formatResult(data).properties
        };
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
        var queryFormat = QueryFormat.GML2;
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
        }
        if (queryFormat === QueryFormat.HTML) {
            queryHtmlTarget = 'iframe';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zaGFyZWQvc291cmNlcy9pbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTlELE9BQU8sRUFBYyxlQUFlLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFMUMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDdkUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLE9BQU8sRUFBOEIsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJekUsT0FBTyxFQUFFLFlBQVksRUFBYyxNQUFNLFVBQVUsQ0FBQztBQVVwRDtJQUVFLHFDQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFBRyxDQUFDOzs7OztJQUV4RCxrREFBWTs7OztJQUFaLFVBQWEsSUFBZ0I7UUFBN0IsaUJBdUJDOztZQXRCTyxVQUFVLEdBQUcsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUM7O1lBRS9ELFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDN0MsTUFBTTs7OztRQUFDLFVBQUMsRUFBSztnQkFBTCwwQkFBSyxFQUFKLFdBQUc7WUFBTSxPQUFBLFVBQVUsQ0FBQyxPQUFPLENB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QkFDOUIsV0FBVyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQzt5QkFDOUM7b0JBQ0gsQ0FBQyxFQUFDLENBQUM7O2lCQUVKOzs7Z0JBZkgsS0FBa0IsSUFBQSxLQUFBLGlCQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUEsZ0JBQUE7b0JBQW5DLElBQU0sR0FBRyxXQUFBOzBDQUFILEdBQUc7OztpQkFnQmI7Ozs7Ozs7OztTQUNGO1FBRUQsSUFBSSxXQUFXLEtBQUssV0FBVyxDQUFDLElBQUksRUFBRTtZQUNwQyxlQUFlLEdBQUcsUUFBUSxDQUFDO1NBQzVCO1FBRUQsT0FBTztZQUNMLFdBQVcsYUFBQTtZQUNYLGVBQWUsaUJBQUE7U0FDaEIsQ0FBQztJQUNKLENBQUM7SUFoUU0scUJBQUUsR0FBRyxRQUFRLENBQUM7SUFDZCx1QkFBSSxHQUFHLEtBQUssQ0FBQzs7Z0JBSHJCLFVBQVU7Ozs7Z0JBekRGLFVBQVU7Z0JBS1YsZUFBZTtnREFrRW5CLE1BQU0sU0FBQyxTQUFTO2dCQUVFLDJCQUEyQix1QkFEN0MsTUFBTSxTQUFDLDJCQUEyQjs7SUFvUHZDLHlCQUFDO0NBQUEsQUFuUUQsQ0FDd0MsWUFBWSxHQWtRbkQ7U0FsUVksa0JBQWtCOzs7SUFDN0Isc0JBQXFCOztJQUNyQix3QkFBb0I7O0lBRXBCLG9DQUFrRTs7Ozs7SUFPaEUsa0NBQXdCOzs7OztJQUN4Qiw2Q0FBd0M7Ozs7O0lBRXhDLHVDQUM4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0LCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgT2JqZWN0VXRpbHMgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQgeyBnZXRSZXNvbHV0aW9uRnJvbVNjYWxlIH0gZnJvbSAnLi4vLi4vLi4vbWFwL3NoYXJlZC9tYXAudXRpbHMnO1xyXG5pbXBvcnQgeyBMQVlFUiB9IGZyb20gJy4uLy4uLy4uL2xheWVyJztcclxuaW1wb3J0IHsgUXVlcnlhYmxlRGF0YVNvdXJjZU9wdGlvbnMsIFF1ZXJ5Rm9ybWF0IH0gZnJvbSAnLi4vLi4vLi4vcXVlcnknO1xyXG5pbXBvcnQgeyBRdWVyeUh0bWxUYXJnZXQgfSBmcm9tICcuLy4uLy4uLy4uL3F1ZXJ5L3NoYXJlZC9xdWVyeS5lbnVtcyc7XHJcblxyXG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQgfSBmcm9tICcuLi9zZWFyY2guaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZSwgVGV4dFNlYXJjaCB9IGZyb20gJy4vc291cmNlJztcclxuaW1wb3J0IHsgVGV4dFNlYXJjaE9wdGlvbnMgfSBmcm9tICcuL3NvdXJjZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHtcclxuICBJTGF5ZXJTZWFyY2hTb3VyY2VPcHRpb25zLFxyXG4gIElMYXllckRhdGEsXHJcbiAgSUxheWVySXRlbVJlc3BvbnNlLFxyXG4gIElMYXllclNlcnZpY2VSZXNwb25zZSxcclxuICBJTGF5ZXJEYXRhU291cmNlXHJcbn0gZnJvbSAnLi9pbGF5ZXIuaW50ZXJmYWNlcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBJTGF5ZXJTZWFyY2hSZXN1bHRGb3JtYXR0ZXIge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UpIHt9XHJcblxyXG4gIGZvcm1hdFJlc3VsdChkYXRhOiBJTGF5ZXJEYXRhKTogSUxheWVyRGF0YSB7XHJcbiAgICBjb25zdCBhbGxvd2VkS2V5ID0gWyd0aXRsZScsICdhYnN0cmFjdCcsICdncm91cFRpdGxlJywgJ21ldGFkYXRhVXJsJ107XHJcblxyXG4gICAgY29uc3QgcHJvcGVydHkgPSBPYmplY3QuZW50cmllcyhkYXRhLnByb3BlcnRpZXMpXHJcbiAgICAgIC5maWx0ZXIoKFtrZXldKSA9PiBhbGxvd2VkS2V5LmluZGV4T2Yoa2V5KSAhPT0gLTEpXHJcbiAgICAgIC5yZWR1Y2UoKG91dDogeyBba2V5OiBzdHJpbmddOiBhbnkgfSwgZW50cmllczogW3N0cmluZywgYW55XSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IGVudHJpZXM7XHJcbiAgICAgICAgbGV0IG5ld0tleTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgbmV3S2V5ID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAgICdpZ28uZ2VvLnNlYXJjaC5pbGF5ZXIucHJvcGVydGllcy4nICsga2V5XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgIG5ld0tleSA9IGtleTtcclxuICAgICAgICB9XHJcbiAgICAgICAgb3V0W25ld0tleV0gPSB2YWx1ZSA/IHZhbHVlIDogJyc7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgICAgfSwge30pO1xyXG5cclxuICAgIGNvbnN0IGRhdGFSID0gT2JqZWN0LmFzc2lnbih7fSwgZGF0YSk7XHJcbiAgICBkYXRhUi5wcm9wZXJ0aWVzID0gcHJvcGVydHkgYXMgSUxheWVyRGF0YVNvdXJjZTtcclxuXHJcbiAgICByZXR1cm4gZGF0YVI7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogSUxheWVyIHNlYXJjaCBzb3VyY2VcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIElMYXllclNlYXJjaFNvdXJjZSBleHRlbmRzIFNlYXJjaFNvdXJjZSBpbXBsZW1lbnRzIFRleHRTZWFyY2gge1xyXG4gIHN0YXRpYyBpZCA9ICdpbGF5ZXInO1xyXG4gIHN0YXRpYyB0eXBlID0gTEFZRVI7XHJcblxyXG4gIHRpdGxlJDogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xyXG5cclxuICBnZXQgdGl0bGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLnRpdGxlJC5nZXRWYWx1ZSgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICBwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgQEluamVjdCgnb3B0aW9ucycpIG9wdGlvbnM6IElMYXllclNlYXJjaFNvdXJjZU9wdGlvbnMsXHJcbiAgICBASW5qZWN0KElMYXllclNlYXJjaFJlc3VsdEZvcm1hdHRlcilcclxuICAgIHByaXZhdGUgZm9ybWF0dGVyOiBJTGF5ZXJTZWFyY2hSZXN1bHRGb3JtYXR0ZXJcclxuICApIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlXHJcbiAgICAgIC5nZXQodGhpcy5vcHRpb25zLnRpdGxlKVxyXG4gICAgICAuc3Vic2NyaWJlKHRpdGxlID0+IHRoaXMudGl0bGUkLm5leHQodGl0bGUpKTtcclxuICB9XHJcblxyXG4gIGdldElkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gSUxheWVyU2VhcmNoU291cmNlLmlkO1xyXG4gIH1cclxuXHJcbiAgZ2V0VHlwZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIElMYXllclNlYXJjaFNvdXJjZS50eXBlO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldERlZmF1bHRPcHRpb25zKCk6IElMYXllclNlYXJjaFNvdXJjZU9wdGlvbnMge1xyXG4gICAgY29uc3QgbGltaXQgPVxyXG4gICAgICB0aGlzLm9wdGlvbnMucGFyYW1zICYmIHRoaXMub3B0aW9ucy5wYXJhbXMubGltaXRcclxuICAgICAgICA/IE51bWJlcih0aGlzLm9wdGlvbnMucGFyYW1zLmxpbWl0KVxyXG4gICAgICAgIDogdW5kZWZpbmVkO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5pbGF5ZXIubmFtZScsXHJcbiAgICAgIHNlYXJjaFVybDogJ2h0dHBzOi8vZ2VvZWdsLm1zcC5nb3V2LnFjLmNhL2FwaXMvbGF5ZXJzL3NlYXJjaCcsXHJcbiAgICAgIHNldHRpbmdzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdHlwZTogJ2NoZWNrYm94JyxcclxuICAgICAgICAgIHRpdGxlOiAncmVzdWx0cyB0eXBlJyxcclxuICAgICAgICAgIG5hbWU6ICd0eXBlJyxcclxuICAgICAgICAgIHZhbHVlczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5pbGF5ZXIudHlwZS5sYXllcicsXHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdsYXllcicsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICBoYXNodGFnczogWydsYXllcicsICdsYXllcnMnLCAnY291Y2hlJywgJ2NvdWNoZXMnXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5pbGF5ZXIudHlwZS5ncm91cExheWVyJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ2dyb3VwJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICBoYXNodGFnczogWydnci1sYXllcicsICdnci1sYXllcnMnLCAnZ3ItY291Y2hlJywgJ2dyLWNvdWNoZXMnXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAncmFkaW9idXR0b24nLFxyXG4gICAgICAgICAgdGl0bGU6ICdyZXN1bHRzIGxpbWl0JyxcclxuICAgICAgICAgIG5hbWU6ICdsaW1pdCcsXHJcbiAgICAgICAgICB2YWx1ZXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnMScsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IDEsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogbGltaXQgPT09IDFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnNScsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IDUsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogbGltaXQgPT09IDUgfHwgIWxpbWl0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJzEwJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogMTAsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogbGltaXQgPT09IDEwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJzI1JyxcclxuICAgICAgICAgICAgICB2YWx1ZTogMjUsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogbGltaXQgPT09IDI1XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJzUwJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogNTAsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogbGltaXQgPT09IDUwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggYSBsYXllciBieSBuYW1lIG9yIGtleXdvcmRcclxuICAgKiBAcGFyYW0gdGVybSBMYXllciBuYW1lIG9yIGtleXdvcmRcclxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIDxTZWFyY2hSZXN1bHQ8TGF5ZXJPcHRpb25zPltdXHJcbiAgICovXHJcbiAgc2VhcmNoKFxyXG4gICAgdGVybTogc3RyaW5nIHwgdW5kZWZpbmVkLFxyXG4gICAgb3B0aW9ucz86IFRleHRTZWFyY2hPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxTZWFyY2hSZXN1bHQ8SUxheWVySXRlbVJlc3BvbnNlPltdPiB7XHJcbiAgICBjb25zdCBwYXJhbXMgPSB0aGlzLmNvbXB1dGVTZWFyY2hSZXF1ZXN0UGFyYW1zKHRlcm0sIG9wdGlvbnMgfHwge30pO1xyXG4gICAgaWYgKCFwYXJhbXMuZ2V0KCdxJykgfHzCoCFwYXJhbXMuZ2V0KCd0eXBlJykpIHtcclxuICAgICAgcmV0dXJuIG9mKFtdKTtcclxuICAgIH1cclxuICAgIHRoaXMub3B0aW9ucy5wYXJhbXMucGFnZSA9IHBhcmFtcy5nZXQoJ3BhZ2UnKSB8fCAnMSc7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuZ2V0KHRoaXMuc2VhcmNoVXJsLCB7IHBhcmFtcyB9KVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoKHJlc3BvbnNlOiBJTGF5ZXJTZXJ2aWNlUmVzcG9uc2UpID0+IHRoaXMuZXh0cmFjdFJlc3VsdHMocmVzcG9uc2UpKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlU2VhcmNoUmVxdWVzdFBhcmFtcyhcclxuICAgIHRlcm06IHN0cmluZyxcclxuICAgIG9wdGlvbnM6IFRleHRTZWFyY2hPcHRpb25zXHJcbiAgKTogSHR0cFBhcmFtcyB7XHJcbiAgICByZXR1cm4gbmV3IEh0dHBQYXJhbXMoe1xyXG4gICAgICBmcm9tT2JqZWN0OiBPYmplY3RVdGlscy5yZW1vdmVVbmRlZmluZWQoT2JqZWN0LmFzc2lnbihcclxuICAgICAgICB7XHJcbiAgICAgICAgICBxOiB0aGlzLmNvbXB1dGVUZXJtKHRlcm0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0aGlzLnBhcmFtcyxcclxuICAgICAgICB0aGlzLmNvbXB1dGVPcHRpb25zUGFyYW0odGVybSwgb3B0aW9ucyB8fCB7fSkucGFyYW1zLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHBhZ2U6IG9wdGlvbnMucGFnZVxyXG4gICAgICAgIH1cclxuICAgICAgKVxyXG4gICAgKX0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIGhhc2h0YWcgZnJvbSBxdWVyeVxyXG4gICAqIEBwYXJhbSB0ZXJtIFF1ZXJ5IHdpdGggaGFzaHRhZ1xyXG4gICAqL1xyXG4gIHByaXZhdGUgY29tcHV0ZVRlcm0odGVybTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0ZXJtLnJlcGxhY2UoLygjW15cXHNdKikvZywgJycpLnJlcGxhY2UoL1teXFx3w4Atw78gIVxcLVxcKFxcKSwnI10rL2csICcnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBoYXNodGFnIHRvIHBhcmFtIGlmIHZhbGlkXHJcbiAgICogQHBhcmFtIHRlcm0gUXVlcnkgd2l0aCBoYXNodGFnXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgVGV4dFNlYXJjaE9wdGlvbnNcclxuICAgKi9cclxuICBwcml2YXRlIGNvbXB1dGVPcHRpb25zUGFyYW0oXHJcbiAgICB0ZXJtOiBzdHJpbmcsXHJcbiAgICBvcHRpb25zOiBUZXh0U2VhcmNoT3B0aW9uc1xyXG4gICk6IFRleHRTZWFyY2hPcHRpb25zIHtcclxuICAgIGNvbnN0IGhhc2h0YWdzID0gc3VwZXIuZ2V0SGFzaHRhZ3NWYWxpZCh0ZXJtLCAndHlwZScpO1xyXG4gICAgaWYgKGhhc2h0YWdzKSB7XHJcbiAgICAgIG9wdGlvbnMucGFyYW1zID0gT2JqZWN0LmFzc2lnbihvcHRpb25zLnBhcmFtcyB8fCB7fSwge1xyXG4gICAgICAgIHR5cGU6IGhhc2h0YWdzLmpvaW4oJywnKVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb3B0aW9ucztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdFJlc3VsdHMoXHJcbiAgICByZXNwb25zZTogSUxheWVyU2VydmljZVJlc3BvbnNlXHJcbiAgKTogU2VhcmNoUmVzdWx0PElMYXllckl0ZW1SZXNwb25zZT5bXSB7XHJcbiAgICByZXR1cm4gcmVzcG9uc2UuaXRlbXMubWFwKChkYXRhOiBJTGF5ZXJEYXRhKSA9PiB0aGlzLmRhdGFUb1Jlc3VsdChkYXRhLCByZXNwb25zZSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkYXRhVG9SZXN1bHQoZGF0YTogSUxheWVyRGF0YSwgcmVzcG9uc2U/OiBJTGF5ZXJTZXJ2aWNlUmVzcG9uc2UpOiBTZWFyY2hSZXN1bHQ8SUxheWVySXRlbVJlc3BvbnNlPiB7XHJcbiAgICBjb25zdCBsYXllck9wdGlvbnMgPSB0aGlzLmNvbXB1dGVMYXllck9wdGlvbnMoZGF0YSk7XHJcblxyXG4gICAgY29uc3QgdGl0bGVIdG1sID0gZGF0YS5oaWdobGlnaHQudGl0bGUgfHwgZGF0YS5wcm9wZXJ0aWVzLnRpdGxlO1xyXG4gICAgY29uc3QgZ3JvdXBUaXRsZSA9IGRhdGEuaGlnaGxpZ2h0Lmdyb3VwVGl0bGUgfHwgZGF0YS5wcm9wZXJ0aWVzLmdyb3VwVGl0bGU7XHJcbiAgICBjb25zdCBzdWJ0aXRsZUh0bWwgPSBncm91cFRpdGxlXHJcbiAgICAgID8gJyA8c21hbGwgc3R5bGU9XCJjb2xvcjogIzZmNjk2OVwiPiAnICsgZ3JvdXBUaXRsZSArICc8L3NtYWxsPidcclxuICAgICAgOiAnJztcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzb3VyY2U6IHRoaXMsXHJcbiAgICAgIG1ldGE6IHtcclxuICAgICAgICBkYXRhVHlwZTogTEFZRVIsXHJcbiAgICAgICAgaWQ6IFt0aGlzLmdldElkKCksIGRhdGEucHJvcGVydGllcy5pZF0uam9pbignLicpLFxyXG4gICAgICAgIHRpdGxlOiBkYXRhLnByb3BlcnRpZXMudGl0bGUsXHJcbiAgICAgICAgdGl0bGVIdG1sOiB0aXRsZUh0bWwgKyBzdWJ0aXRsZUh0bWwsXHJcbiAgICAgICAgaWNvbjogZGF0YS5wcm9wZXJ0aWVzLnR5cGUgPT09ICdMYXllcicgPyAnbGF5ZXJzJyA6ICdtYXAnLFxyXG4gICAgICAgIG5leHRQYWdlOiByZXNwb25zZS5pdGVtcy5sZW5ndGggJSArdGhpcy5vcHRpb25zLnBhcmFtcy5saW1pdCA9PT0gMCAmJiArdGhpcy5vcHRpb25zLnBhcmFtcy5wYWdlIDwgMTBcclxuICAgICAgfSxcclxuICAgICAgZGF0YTogbGF5ZXJPcHRpb25zXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlTGF5ZXJPcHRpb25zKGRhdGE6IElMYXllckRhdGEpOiBJTGF5ZXJJdGVtUmVzcG9uc2Uge1xyXG4gICAgY29uc3QgdXJsID0gZGF0YS5wcm9wZXJ0aWVzLnVybDtcclxuICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiBRdWVyeWFibGVEYXRhU291cmNlT3B0aW9ucyA9IHRoaXMuZXh0cmFjdFF1ZXJ5UGFyYW1zRnJvbVNvdXJjZVVybChcclxuICAgICAgdXJsXHJcbiAgICApO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc291cmNlT3B0aW9uczoge1xyXG4gICAgICAgIGlkOiBkYXRhLnByb3BlcnRpZXMuaWQsXHJcbiAgICAgICAgY3Jvc3NPcmlnaW46ICdhbm9ueW1vdXMnLFxyXG4gICAgICAgIHR5cGU6IGRhdGEucHJvcGVydGllcy5mb3JtYXQsXHJcbiAgICAgICAgdXJsLFxyXG4gICAgICAgIHF1ZXJ5Rm9ybWF0OiBxdWVyeVBhcmFtcy5xdWVyeUZvcm1hdCxcclxuICAgICAgICBxdWVyeUh0bWxUYXJnZXQ6IHF1ZXJ5UGFyYW1zLnF1ZXJ5SHRtbFRhcmdldCxcclxuICAgICAgICBxdWVyeWFibGU6IGRhdGEucHJvcGVydGllcy5xdWVyeWFibGUsXHJcbiAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICBMQVlFUlM6IGRhdGEucHJvcGVydGllcy5uYW1lXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICB0aXRsZTogZGF0YS5wcm9wZXJ0aWVzLnRpdGxlLFxyXG4gICAgICBtYXhSZXNvbHV0aW9uOlxyXG4gICAgICAgIGdldFJlc29sdXRpb25Gcm9tU2NhbGUoTnVtYmVyKGRhdGEucHJvcGVydGllcy5tYXhTY2FsZURlbm9tKSkgfHxcclxuICAgICAgICBJbmZpbml0eSxcclxuICAgICAgbWluUmVzb2x1dGlvbjpcclxuICAgICAgICBnZXRSZXNvbHV0aW9uRnJvbVNjYWxlKE51bWJlcihkYXRhLnByb3BlcnRpZXMubWluU2NhbGVEZW5vbSkpIHx8IDAsXHJcbiAgICAgIG1ldGFkYXRhOiB7XHJcbiAgICAgICAgdXJsOiBkYXRhLnByb3BlcnRpZXMubWV0YWRhdGFVcmwsXHJcbiAgICAgICAgZXh0ZXJuOiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgIHByb3BlcnRpZXM6IHRoaXMuZm9ybWF0dGVyLmZvcm1hdFJlc3VsdChkYXRhKS5wcm9wZXJ0aWVzXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0UXVlcnlQYXJhbXNGcm9tU291cmNlVXJsKFxyXG4gICAgdXJsOiBzdHJpbmdcclxuICApOiB7IHF1ZXJ5Rm9ybWF0OiBRdWVyeUZvcm1hdDsgcXVlcnlIdG1sVGFyZ2V0OiBRdWVyeUh0bWxUYXJnZXQgfSB7XHJcbiAgICBsZXQgcXVlcnlGb3JtYXQgPSBRdWVyeUZvcm1hdC5HTUwyO1xyXG4gICAgbGV0IHF1ZXJ5SHRtbFRhcmdldDtcclxuICAgIGNvbnN0IGZvcm1hdE9wdCA9ICh0aGlzLm9wdGlvbnMgYXMgSUxheWVyU2VhcmNoU291cmNlT3B0aW9ucykucXVlcnlGb3JtYXQ7XHJcbiAgICBpZiAoZm9ybWF0T3B0KSB7XHJcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGZvcm1hdE9wdCkpIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IGZvcm1hdE9wdFtrZXldO1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gJyonKSB7XHJcbiAgICAgICAgICBxdWVyeUZvcm1hdCA9IFF1ZXJ5Rm9ybWF0W2tleS50b1VwcGVyQ2FzZSgpXTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdXJscyA9ICgodmFsdWUgYXMgYW55KSBhcyB7IHVybHM6IHN0cmluZ1tdIH0pLnVybHM7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodXJscykpIHtcclxuICAgICAgICAgIHVybHMuZm9yRWFjaCh1cmxPcHQgPT4ge1xyXG4gICAgICAgICAgICBpZiAodXJsLmluZGV4T2YodXJsT3B0KSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICBxdWVyeUZvcm1hdCA9IFF1ZXJ5Rm9ybWF0W2tleS50b1VwcGVyQ2FzZSgpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAocXVlcnlGb3JtYXQgPT09IFF1ZXJ5Rm9ybWF0LkhUTUwpIHtcclxuICAgICAgcXVlcnlIdG1sVGFyZ2V0ID0gJ2lmcmFtZSc7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcXVlcnlGb3JtYXQsXHJcbiAgICAgIHF1ZXJ5SHRtbFRhcmdldFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19