/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class ILayerSearchResultFormatter {
    /**
     * @param {?} languageService
     */
    constructor(languageService) {
        this.languageService = languageService;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    formatResult(data) {
        /** @type {?} */
        const allowedKey = ['title', 'abstract', 'groupTitle', 'metadataUrl'];
        /** @type {?} */
        const property = Object.entries(data.properties)
            .filter((/**
         * @param {?} __0
         * @return {?}
         */
        ([key]) => allowedKey.indexOf(key) !== -1))
            .reduce((/**
         * @param {?} out
         * @param {?} entries
         * @return {?}
         */
        (out, entries) => {
            const [key, value] = entries;
            /** @type {?} */
            let newKey;
            try {
                newKey = this.languageService.translate.instant('igo.geo.search.ilayer.properties.' + key);
            }
            catch (e) {
                newKey = key;
            }
            out[newKey] = value ? value : '';
            return out;
        }), {});
        /** @type {?} */
        const dataR = Object.assign({}, data);
        dataR.properties = (/** @type {?} */ (property));
        return dataR;
    }
}
ILayerSearchResultFormatter.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ILayerSearchResultFormatter.ctorParameters = () => [
    { type: LanguageService }
];
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
export class ILayerSearchSource extends SearchSource {
    /**
     * @param {?} http
     * @param {?} languageService
     * @param {?} options
     * @param {?} formatter
     */
    constructor(http, languageService, options, formatter) {
        super(options);
        this.http = http;
        this.languageService = languageService;
        this.formatter = formatter;
        this.title$ = new BehaviorSubject('');
        this.languageService.translate
            .get(this.options.title)
            .subscribe((/**
         * @param {?} title
         * @return {?}
         */
        title => this.title$.next(title)));
    }
    /**
     * @return {?}
     */
    get title() {
        return this.title$.getValue();
    }
    /**
     * @return {?}
     */
    getId() {
        return ILayerSearchSource.id;
    }
    /**
     * @return {?}
     */
    getType() {
        return ILayerSearchSource.type;
    }
    /**
     * @protected
     * @return {?}
     */
    getDefaultOptions() {
        /** @type {?} */
        const limit = this.options.params && this.options.params.limit
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
    }
    /**
     * Search a layer by name or keyword
     * @param {?} term Layer name or keyword
     * @param {?=} options
     * @return {?} Observable of <SearchResult<LayerOptions>[]
     */
    search(term, options) {
        /** @type {?} */
        const params = this.computeSearchRequestParams(term, options || {});
        if (!params.get('q') || !params.get('type')) {
            return of([]);
        }
        this.options.params.page = params.get('page') || '1';
        return this.http
            .get(this.searchUrl, { params })
            .pipe(map((/**
         * @param {?} response
         * @return {?}
         */
        (response) => this.extractResults(response))));
    }
    /**
     * @private
     * @param {?} term
     * @param {?} options
     * @return {?}
     */
    computeSearchRequestParams(term, options) {
        return new HttpParams({
            fromObject: ObjectUtils.removeUndefined(Object.assign({
                q: this.computeTerm(term)
            }, this.params, this.computeOptionsParam(term, options || {}).params, {
                page: options.page
            }))
        });
    }
    /**
     * Remove hashtag from query
     * @private
     * @param {?} term Query with hashtag
     * @return {?}
     */
    computeTerm(term) {
        return term.replace(/(#[^\s]*)/g, '').replace(/[^\wÀ-ÿ !\-\(\),'#]+/g, '');
    }
    /**
     * Add hashtag to param if valid
     * @private
     * @param {?} term Query with hashtag
     * @param {?} options TextSearchOptions
     * @return {?}
     */
    computeOptionsParam(term, options) {
        /** @type {?} */
        const hashtags = super.getHashtagsValid(term, 'type');
        if (hashtags) {
            options.params = Object.assign(options.params || {}, {
                type: hashtags.join(',')
            });
        }
        return options;
    }
    /**
     * @private
     * @param {?} response
     * @return {?}
     */
    extractResults(response) {
        return response.items.map((/**
         * @param {?} data
         * @return {?}
         */
        (data) => this.dataToResult(data, response)));
    }
    /**
     * @private
     * @param {?} data
     * @param {?=} response
     * @return {?}
     */
    dataToResult(data, response) {
        /** @type {?} */
        const layerOptions = this.computeLayerOptions(data);
        /** @type {?} */
        const titleHtml = data.highlight.title || data.properties.title;
        /** @type {?} */
        const groupTitle = data.highlight.groupTitle || data.properties.groupTitle;
        /** @type {?} */
        const subtitleHtml = groupTitle
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
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    computeLayerOptions(data) {
        /** @type {?} */
        const url = data.properties.url;
        /** @type {?} */
        const queryParams = this.extractQueryParamsFromSourceUrl(url);
        return {
            sourceOptions: {
                id: data.properties.id,
                crossOrigin: 'anonymous',
                type: data.properties.format,
                url,
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
    }
    /**
     * @private
     * @param {?} url
     * @return {?}
     */
    extractQueryParamsFromSourceUrl(url) {
        /** @type {?} */
        let queryFormat = QueryFormat.GML2;
        /** @type {?} */
        let queryHtmlTarget;
        /** @type {?} */
        const formatOpt = ((/** @type {?} */ (this.options))).queryFormat;
        if (formatOpt) {
            for (const key of Object.keys(formatOpt)) {
                /** @type {?} */
                const value = formatOpt[key];
                if (value === '*') {
                    queryFormat = QueryFormat[key.toUpperCase()];
                    break;
                }
                /** @type {?} */
                const urls = ((/** @type {?} */ (((/** @type {?} */ (value)))))).urls;
                if (Array.isArray(urls)) {
                    urls.forEach((/**
                     * @param {?} urlOpt
                     * @return {?}
                     */
                    urlOpt => {
                        if (url.indexOf(urlOpt) !== -1) {
                            queryFormat = QueryFormat[key.toUpperCase()];
                        }
                    }));
                    break;
                }
            }
        }
        if (queryFormat === QueryFormat.HTML) {
            queryHtmlTarget = 'iframe';
        }
        return {
            queryFormat,
            queryHtmlTarget
        };
    }
}
ILayerSearchSource.id = 'ilayer';
ILayerSearchSource.type = LAYER;
ILayerSearchSource.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ILayerSearchSource.ctorParameters = () => [
    { type: HttpClient },
    { type: LanguageService },
    { type: undefined, decorators: [{ type: Inject, args: ['options',] }] },
    { type: ILayerSearchResultFormatter, decorators: [{ type: Inject, args: [ILayerSearchResultFormatter,] }] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zaGFyZWQvc291cmNlcy9pbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFOUQsT0FBTyxFQUFjLGVBQWUsRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDN0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUUxQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN2RSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsT0FBTyxFQUE4QixXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUl6RSxPQUFPLEVBQUUsWUFBWSxFQUFjLE1BQU0sVUFBVSxDQUFDO0FBV3BELE1BQU0sT0FBTywyQkFBMkI7Ozs7SUFDdEMsWUFBb0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO0lBQUcsQ0FBQzs7Ozs7SUFFeEQsWUFBWSxDQUFDLElBQWdCOztjQUNyQixVQUFVLEdBQUcsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUM7O2NBRS9ELFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDN0MsTUFBTTs7OztRQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENB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QU87WUFDTCxXQUFXO1lBQ1gsZUFBZTtTQUNoQixDQUFDO0lBQ0osQ0FBQzs7QUFoUU0scUJBQUUsR0FBRyxRQUFRLENBQUM7QUFDZCx1QkFBSSxHQUFHLEtBQUssQ0FBQzs7WUFIckIsVUFBVTs7OztZQXpERixVQUFVO1lBS1YsZUFBZTs0Q0FrRW5CLE1BQU0sU0FBQyxTQUFTO1lBRUUsMkJBQTJCLHVCQUQ3QyxNQUFNLFNBQUMsMkJBQTJCOzs7O0lBYnJDLHNCQUFxQjs7SUFDckIsd0JBQW9COztJQUVwQixvQ0FBa0U7Ozs7O0lBT2hFLGtDQUF3Qjs7Ozs7SUFDeEIsNkNBQXdDOzs7OztJQUV4Qyx1Q0FDOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IE9iamVjdFV0aWxzIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgZ2V0UmVzb2x1dGlvbkZyb21TY2FsZSB9IGZyb20gJy4uLy4uLy4uL21hcC9zaGFyZWQvbWFwLnV0aWxzJztcclxuaW1wb3J0IHsgTEFZRVIgfSBmcm9tICcuLi8uLi8uLi9sYXllcic7XHJcbmltcG9ydCB7IFF1ZXJ5YWJsZURhdGFTb3VyY2VPcHRpb25zLCBRdWVyeUZvcm1hdCB9IGZyb20gJy4uLy4uLy4uL3F1ZXJ5JztcclxuaW1wb3J0IHsgUXVlcnlIdG1sVGFyZ2V0IH0gZnJvbSAnLi8uLi8uLi8uLi9xdWVyeS9zaGFyZWQvcXVlcnkuZW51bXMnO1xyXG5cclxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi4vc2VhcmNoLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2UsIFRleHRTZWFyY2ggfSBmcm9tICcuL3NvdXJjZSc7XHJcbmltcG9ydCB7IFRleHRTZWFyY2hPcHRpb25zIH0gZnJvbSAnLi9zb3VyY2UuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7XHJcbiAgSUxheWVyU2VhcmNoU291cmNlT3B0aW9ucyxcclxuICBJTGF5ZXJEYXRhLFxyXG4gIElMYXllckl0ZW1SZXNwb25zZSxcclxuICBJTGF5ZXJTZXJ2aWNlUmVzcG9uc2UsXHJcbiAgSUxheWVyRGF0YVNvdXJjZVxyXG59IGZyb20gJy4vaWxheWVyLmludGVyZmFjZXMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSUxheWVyU2VhcmNoUmVzdWx0Rm9ybWF0dGVyIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlKSB7fVxyXG5cclxuICBmb3JtYXRSZXN1bHQoZGF0YTogSUxheWVyRGF0YSk6IElMYXllckRhdGEge1xyXG4gICAgY29uc3QgYWxsb3dlZEtleSA9IFsndGl0bGUnLCAnYWJzdHJhY3QnLCAnZ3JvdXBUaXRsZScsICdtZXRhZGF0YVVybCddO1xyXG5cclxuICAgIGNvbnN0IHByb3BlcnR5ID0gT2JqZWN0LmVudHJpZXMoZGF0YS5wcm9wZXJ0aWVzKVxyXG4gICAgICAuZmlsdGVyKChba2V5XSkgPT4gYWxsb3dlZEtleS5pbmRleE9mKGtleSkgIT09IC0xKVxyXG4gICAgICAucmVkdWNlKChvdXQ6IHsgW2tleTogc3RyaW5nXTogYW55IH0sIGVudHJpZXM6IFtzdHJpbmcsIGFueV0pID0+IHtcclxuICAgICAgICBjb25zdCBba2V5LCB2YWx1ZV0gPSBlbnRyaWVzO1xyXG4gICAgICAgIGxldCBuZXdLZXk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIG5ld0tleSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgICAnaWdvLmdlby5zZWFyY2guaWxheWVyLnByb3BlcnRpZXMuJyArIGtleVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICBuZXdLZXkgPSBrZXk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG91dFtuZXdLZXldID0gdmFsdWUgPyB2YWx1ZSA6ICcnO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICAgIH0sIHt9KTtcclxuXHJcbiAgICBjb25zdCBkYXRhUiA9IE9iamVjdC5hc3NpZ24oe30sIGRhdGEpO1xyXG4gICAgZGF0YVIucHJvcGVydGllcyA9IHByb3BlcnR5IGFzIElMYXllckRhdGFTb3VyY2U7XHJcblxyXG4gICAgcmV0dXJuIGRhdGFSO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIElMYXllciBzZWFyY2ggc291cmNlXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBJTGF5ZXJTZWFyY2hTb3VyY2UgZXh0ZW5kcyBTZWFyY2hTb3VyY2UgaW1wbGVtZW50cyBUZXh0U2VhcmNoIHtcclxuICBzdGF0aWMgaWQgPSAnaWxheWVyJztcclxuICBzdGF0aWMgdHlwZSA9IExBWUVSO1xyXG5cclxuICB0aXRsZSQ6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcclxuXHJcbiAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy50aXRsZSQuZ2V0VmFsdWUoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcclxuICAgIEBJbmplY3QoJ29wdGlvbnMnKSBvcHRpb25zOiBJTGF5ZXJTZWFyY2hTb3VyY2VPcHRpb25zLFxyXG4gICAgQEluamVjdChJTGF5ZXJTZWFyY2hSZXN1bHRGb3JtYXR0ZXIpXHJcbiAgICBwcml2YXRlIGZvcm1hdHRlcjogSUxheWVyU2VhcmNoUmVzdWx0Rm9ybWF0dGVyXHJcbiAgKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZVxyXG4gICAgICAuZ2V0KHRoaXMub3B0aW9ucy50aXRsZSlcclxuICAgICAgLnN1YnNjcmliZSh0aXRsZSA9PiB0aGlzLnRpdGxlJC5uZXh0KHRpdGxlKSk7XHJcbiAgfVxyXG5cclxuICBnZXRJZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIElMYXllclNlYXJjaFNvdXJjZS5pZDtcclxuICB9XHJcblxyXG4gIGdldFR5cGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBJTGF5ZXJTZWFyY2hTb3VyY2UudHlwZTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXREZWZhdWx0T3B0aW9ucygpOiBJTGF5ZXJTZWFyY2hTb3VyY2VPcHRpb25zIHtcclxuICAgIGNvbnN0IGxpbWl0ID1cclxuICAgICAgdGhpcy5vcHRpb25zLnBhcmFtcyAmJiB0aGlzLm9wdGlvbnMucGFyYW1zLmxpbWl0XHJcbiAgICAgICAgPyBOdW1iZXIodGhpcy5vcHRpb25zLnBhcmFtcy5saW1pdClcclxuICAgICAgICA6IHVuZGVmaW5lZDtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiAnaWdvLmdlby5zZWFyY2guaWxheWVyLm5hbWUnLFxyXG4gICAgICBzZWFyY2hVcmw6ICdodHRwczovL2dlb2VnbC5tc3AuZ291di5xYy5jYS9hcGlzL2xheWVycy9zZWFyY2gnLFxyXG4gICAgICBzZXR0aW5nczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdjaGVja2JveCcsXHJcbiAgICAgICAgICB0aXRsZTogJ3Jlc3VsdHMgdHlwZScsXHJcbiAgICAgICAgICBuYW1lOiAndHlwZScsXHJcbiAgICAgICAgICB2YWx1ZXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnaWdvLmdlby5zZWFyY2guaWxheWVyLnR5cGUubGF5ZXInLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAnbGF5ZXInLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgaGFzaHRhZ3M6IFsnbGF5ZXInLCAnbGF5ZXJzJywgJ2NvdWNoZScsICdjb3VjaGVzJ11cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnaWdvLmdlby5zZWFyY2guaWxheWVyLnR5cGUuZ3JvdXBMYXllcicsXHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdncm91cCcsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgaGFzaHRhZ3M6IFsnZ3ItbGF5ZXInLCAnZ3ItbGF5ZXJzJywgJ2dyLWNvdWNoZScsICdnci1jb3VjaGVzJ11cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdHlwZTogJ3JhZGlvYnV0dG9uJyxcclxuICAgICAgICAgIHRpdGxlOiAncmVzdWx0cyBsaW1pdCcsXHJcbiAgICAgICAgICBuYW1lOiAnbGltaXQnLFxyXG4gICAgICAgICAgdmFsdWVzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJzEnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAxLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGxpbWl0ID09PSAxXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJzUnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiA1LFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGxpbWl0ID09PSA1IHx8ICFsaW1pdFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICcxMCcsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IDEwLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGxpbWl0ID09PSAxMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICcyNScsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IDI1LFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGxpbWl0ID09PSAyNVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICc1MCcsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IDUwLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGxpbWl0ID09PSA1MFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIGEgbGF5ZXIgYnkgbmFtZSBvciBrZXl3b3JkXHJcbiAgICogQHBhcmFtIHRlcm0gTGF5ZXIgbmFtZSBvciBrZXl3b3JkXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiA8U2VhcmNoUmVzdWx0PExheWVyT3B0aW9ucz5bXVxyXG4gICAqL1xyXG4gIHNlYXJjaChcclxuICAgIHRlcm06IHN0cmluZyB8IHVuZGVmaW5lZCxcclxuICAgIG9wdGlvbnM/OiBUZXh0U2VhcmNoT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8U2VhcmNoUmVzdWx0PElMYXllckl0ZW1SZXNwb25zZT5bXT4ge1xyXG4gICAgY29uc3QgcGFyYW1zID0gdGhpcy5jb21wdXRlU2VhcmNoUmVxdWVzdFBhcmFtcyh0ZXJtLCBvcHRpb25zIHx8IHt9KTtcclxuICAgIGlmICghcGFyYW1zLmdldCgncScpIHx8wqAhcGFyYW1zLmdldCgndHlwZScpKSB7XHJcbiAgICAgIHJldHVybiBvZihbXSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9wdGlvbnMucGFyYW1zLnBhZ2UgPSBwYXJhbXMuZ2V0KCdwYWdlJykgfHwgJzEnO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLmdldCh0aGlzLnNlYXJjaFVybCwgeyBwYXJhbXMgfSlcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChyZXNwb25zZTogSUxheWVyU2VydmljZVJlc3BvbnNlKSA9PiB0aGlzLmV4dHJhY3RSZXN1bHRzKHJlc3BvbnNlKSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZVNlYXJjaFJlcXVlc3RQYXJhbXMoXHJcbiAgICB0ZXJtOiBzdHJpbmcsXHJcbiAgICBvcHRpb25zOiBUZXh0U2VhcmNoT3B0aW9uc1xyXG4gICk6IEh0dHBQYXJhbXMge1xyXG4gICAgcmV0dXJuIG5ldyBIdHRwUGFyYW1zKHtcclxuICAgICAgZnJvbU9iamVjdDogT2JqZWN0VXRpbHMucmVtb3ZlVW5kZWZpbmVkKE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcTogdGhpcy5jb21wdXRlVGVybSh0ZXJtKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGhpcy5wYXJhbXMsXHJcbiAgICAgICAgdGhpcy5jb21wdXRlT3B0aW9uc1BhcmFtKHRlcm0sIG9wdGlvbnMgfHwge30pLnBhcmFtcyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwYWdlOiBvcHRpb25zLnBhZ2VcclxuICAgICAgICB9XHJcbiAgICAgIClcclxuICAgICl9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBoYXNodGFnIGZyb20gcXVlcnlcclxuICAgKiBAcGFyYW0gdGVybSBRdWVyeSB3aXRoIGhhc2h0YWdcclxuICAgKi9cclxuICBwcml2YXRlIGNvbXB1dGVUZXJtKHRlcm06IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGVybS5yZXBsYWNlKC8oI1teXFxzXSopL2csICcnKS5yZXBsYWNlKC9bXlxcd8OALcO/ICFcXC1cXChcXCksJyNdKy9nLCAnJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgaGFzaHRhZyB0byBwYXJhbSBpZiB2YWxpZFxyXG4gICAqIEBwYXJhbSB0ZXJtIFF1ZXJ5IHdpdGggaGFzaHRhZ1xyXG4gICAqIEBwYXJhbSBvcHRpb25zIFRleHRTZWFyY2hPcHRpb25zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjb21wdXRlT3B0aW9uc1BhcmFtKFxyXG4gICAgdGVybTogc3RyaW5nLFxyXG4gICAgb3B0aW9uczogVGV4dFNlYXJjaE9wdGlvbnNcclxuICApOiBUZXh0U2VhcmNoT3B0aW9ucyB7XHJcbiAgICBjb25zdCBoYXNodGFncyA9IHN1cGVyLmdldEhhc2h0YWdzVmFsaWQodGVybSwgJ3R5cGUnKTtcclxuICAgIGlmIChoYXNodGFncykge1xyXG4gICAgICBvcHRpb25zLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24ob3B0aW9ucy5wYXJhbXMgfHwge30sIHtcclxuICAgICAgICB0eXBlOiBoYXNodGFncy5qb2luKCcsJylcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RSZXN1bHRzKFxyXG4gICAgcmVzcG9uc2U6IElMYXllclNlcnZpY2VSZXNwb25zZVxyXG4gICk6IFNlYXJjaFJlc3VsdDxJTGF5ZXJJdGVtUmVzcG9uc2U+W10ge1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlLml0ZW1zLm1hcCgoZGF0YTogSUxheWVyRGF0YSkgPT4gdGhpcy5kYXRhVG9SZXN1bHQoZGF0YSwgcmVzcG9uc2UpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGF0YVRvUmVzdWx0KGRhdGE6IElMYXllckRhdGEsIHJlc3BvbnNlPzogSUxheWVyU2VydmljZVJlc3BvbnNlKTogU2VhcmNoUmVzdWx0PElMYXllckl0ZW1SZXNwb25zZT4ge1xyXG4gICAgY29uc3QgbGF5ZXJPcHRpb25zID0gdGhpcy5jb21wdXRlTGF5ZXJPcHRpb25zKGRhdGEpO1xyXG5cclxuICAgIGNvbnN0IHRpdGxlSHRtbCA9IGRhdGEuaGlnaGxpZ2h0LnRpdGxlIHx8IGRhdGEucHJvcGVydGllcy50aXRsZTtcclxuICAgIGNvbnN0IGdyb3VwVGl0bGUgPSBkYXRhLmhpZ2hsaWdodC5ncm91cFRpdGxlIHx8IGRhdGEucHJvcGVydGllcy5ncm91cFRpdGxlO1xyXG4gICAgY29uc3Qgc3VidGl0bGVIdG1sID0gZ3JvdXBUaXRsZVxyXG4gICAgICA/ICcgPHNtYWxsIHN0eWxlPVwiY29sb3I6ICM2ZjY5NjlcIj4gJyArIGdyb3VwVGl0bGUgKyAnPC9zbWFsbD4nXHJcbiAgICAgIDogJyc7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc291cmNlOiB0aGlzLFxyXG4gICAgICBtZXRhOiB7XHJcbiAgICAgICAgZGF0YVR5cGU6IExBWUVSLFxyXG4gICAgICAgIGlkOiBbdGhpcy5nZXRJZCgpLCBkYXRhLnByb3BlcnRpZXMuaWRdLmpvaW4oJy4nKSxcclxuICAgICAgICB0aXRsZTogZGF0YS5wcm9wZXJ0aWVzLnRpdGxlLFxyXG4gICAgICAgIHRpdGxlSHRtbDogdGl0bGVIdG1sICsgc3VidGl0bGVIdG1sLFxyXG4gICAgICAgIGljb246IGRhdGEucHJvcGVydGllcy50eXBlID09PSAnTGF5ZXInID8gJ2xheWVycycgOiAnbWFwJyxcclxuICAgICAgICBuZXh0UGFnZTogcmVzcG9uc2UuaXRlbXMubGVuZ3RoICUgK3RoaXMub3B0aW9ucy5wYXJhbXMubGltaXQgPT09IDAgJiYgK3RoaXMub3B0aW9ucy5wYXJhbXMucGFnZSA8IDEwXHJcbiAgICAgIH0sXHJcbiAgICAgIGRhdGE6IGxheWVyT3B0aW9uc1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZUxheWVyT3B0aW9ucyhkYXRhOiBJTGF5ZXJEYXRhKTogSUxheWVySXRlbVJlc3BvbnNlIHtcclxuICAgIGNvbnN0IHVybCA9IGRhdGEucHJvcGVydGllcy51cmw7XHJcbiAgICBjb25zdCBxdWVyeVBhcmFtczogUXVlcnlhYmxlRGF0YVNvdXJjZU9wdGlvbnMgPSB0aGlzLmV4dHJhY3RRdWVyeVBhcmFtc0Zyb21Tb3VyY2VVcmwoXHJcbiAgICAgIHVybFxyXG4gICAgKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNvdXJjZU9wdGlvbnM6IHtcclxuICAgICAgICBpZDogZGF0YS5wcm9wZXJ0aWVzLmlkLFxyXG4gICAgICAgIGNyb3NzT3JpZ2luOiAnYW5vbnltb3VzJyxcclxuICAgICAgICB0eXBlOiBkYXRhLnByb3BlcnRpZXMuZm9ybWF0LFxyXG4gICAgICAgIHVybCxcclxuICAgICAgICBxdWVyeUZvcm1hdDogcXVlcnlQYXJhbXMucXVlcnlGb3JtYXQsXHJcbiAgICAgICAgcXVlcnlIdG1sVGFyZ2V0OiBxdWVyeVBhcmFtcy5xdWVyeUh0bWxUYXJnZXQsXHJcbiAgICAgICAgcXVlcnlhYmxlOiBkYXRhLnByb3BlcnRpZXMucXVlcnlhYmxlLFxyXG4gICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgTEFZRVJTOiBkYXRhLnByb3BlcnRpZXMubmFtZVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgdGl0bGU6IGRhdGEucHJvcGVydGllcy50aXRsZSxcclxuICAgICAgbWF4UmVzb2x1dGlvbjpcclxuICAgICAgICBnZXRSZXNvbHV0aW9uRnJvbVNjYWxlKE51bWJlcihkYXRhLnByb3BlcnRpZXMubWF4U2NhbGVEZW5vbSkpIHx8XHJcbiAgICAgICAgSW5maW5pdHksXHJcbiAgICAgIG1pblJlc29sdXRpb246XHJcbiAgICAgICAgZ2V0UmVzb2x1dGlvbkZyb21TY2FsZShOdW1iZXIoZGF0YS5wcm9wZXJ0aWVzLm1pblNjYWxlRGVub20pKSB8fCAwLFxyXG4gICAgICBtZXRhZGF0YToge1xyXG4gICAgICAgIHVybDogZGF0YS5wcm9wZXJ0aWVzLm1ldGFkYXRhVXJsLFxyXG4gICAgICAgIGV4dGVybjogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICBwcm9wZXJ0aWVzOiB0aGlzLmZvcm1hdHRlci5mb3JtYXRSZXN1bHQoZGF0YSkucHJvcGVydGllc1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdFF1ZXJ5UGFyYW1zRnJvbVNvdXJjZVVybChcclxuICAgIHVybDogc3RyaW5nXHJcbiAgKTogeyBxdWVyeUZvcm1hdDogUXVlcnlGb3JtYXQ7IHF1ZXJ5SHRtbFRhcmdldDogUXVlcnlIdG1sVGFyZ2V0IH0ge1xyXG4gICAgbGV0IHF1ZXJ5Rm9ybWF0ID0gUXVlcnlGb3JtYXQuR01MMjtcclxuICAgIGxldCBxdWVyeUh0bWxUYXJnZXQ7XHJcbiAgICBjb25zdCBmb3JtYXRPcHQgPSAodGhpcy5vcHRpb25zIGFzIElMYXllclNlYXJjaFNvdXJjZU9wdGlvbnMpLnF1ZXJ5Rm9ybWF0O1xyXG4gICAgaWYgKGZvcm1hdE9wdCkge1xyXG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhmb3JtYXRPcHQpKSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBmb3JtYXRPcHRba2V5XTtcclxuICAgICAgICBpZiAodmFsdWUgPT09ICcqJykge1xyXG4gICAgICAgICAgcXVlcnlGb3JtYXQgPSBRdWVyeUZvcm1hdFtrZXkudG9VcHBlckNhc2UoKV07XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVybHMgPSAoKHZhbHVlIGFzIGFueSkgYXMgeyB1cmxzOiBzdHJpbmdbXSB9KS51cmxzO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHVybHMpKSB7XHJcbiAgICAgICAgICB1cmxzLmZvckVhY2godXJsT3B0ID0+IHtcclxuICAgICAgICAgICAgaWYgKHVybC5pbmRleE9mKHVybE9wdCkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgcXVlcnlGb3JtYXQgPSBRdWVyeUZvcm1hdFtrZXkudG9VcHBlckNhc2UoKV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHF1ZXJ5Rm9ybWF0ID09PSBRdWVyeUZvcm1hdC5IVE1MKSB7XHJcbiAgICAgIHF1ZXJ5SHRtbFRhcmdldCA9ICdpZnJhbWUnO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHF1ZXJ5Rm9ybWF0LFxyXG4gICAgICBxdWVyeUh0bWxUYXJnZXRcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==