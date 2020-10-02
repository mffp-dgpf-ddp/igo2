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
        const allowedKey = [
            'title',
            'abstract',
            'groupTitle',
            'metadataUrl',
            'downloadUrl',
            'urlInfo',
            'name'
        ];
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
                nextPage: response.items.length % +this.options.params.limit === 0 &&
                    +this.options.params.page < 10
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
        return ObjectUtils.removeUndefined({
            sourceOptions: {
                id: data.properties.id,
                type: data.properties.format,
                url,
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
    }
    /**
     * @private
     * @param {?} url
     * @return {?}
     */
    extractQueryParamsFromSourceUrl(url) {
        /** @type {?} */
        let queryFormat;
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
            if (queryFormat === QueryFormat.HTML ||
                queryFormat === QueryFormat.HTMLGML2) {
                queryHtmlTarget = 'iframe';
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zaGFyZWQvc291cmNlcy9pbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFOUQsT0FBTyxFQUFjLGVBQWUsRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDN0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUUxQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN2RSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsT0FBTyxFQUE4QixXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUl6RSxPQUFPLEVBQUUsWUFBWSxFQUFjLE1BQU0sVUFBVSxDQUFDO0FBV3BELE1BQU0sT0FBTywyQkFBMkI7Ozs7SUFDdEMsWUFBb0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO0lBQUcsQ0FBQzs7Ozs7SUFFeEQsWUFBWSxDQUFDLElBQWdCOztjQUNyQixVQUFVLEdBQUc7WUFDakIsT0FBTztZQUNQLFVBQVU7WUFDVixZQUFZO1lBQ1osYUFBYTtZQUNiLGFBQWE7WUFDYixTQUFTO1lBQ1QsTUFBTTtTQUNQOztjQUVLLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDN0MsTUFBTTs7OztRQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENB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QWUsR0FBRyxRQUFRLENBQUM7YUFDNUI7U0FDRjtRQUVELE9BQU87WUFDTCxXQUFXO1lBQ1gsZUFBZTtTQUNoQixDQUFDO0lBQ0osQ0FBQzs7QUE3UU0scUJBQUUsR0FBRyxRQUFRLENBQUM7QUFDZCx1QkFBSSxHQUFHLEtBQUssQ0FBQzs7WUFIckIsVUFBVTs7OztZQWpFRixVQUFVO1lBS1YsZUFBZTs0Q0EwRW5CLE1BQU0sU0FBQyxTQUFTO1lBRUUsMkJBQTJCLHVCQUQ3QyxNQUFNLFNBQUMsMkJBQTJCOzs7O0lBYnJDLHNCQUFxQjs7SUFDckIsd0JBQW9COztJQUVwQixvQ0FBa0U7Ozs7O0lBT2hFLGtDQUF3Qjs7Ozs7SUFDeEIsNkNBQXdDOzs7OztJQUV4Qyx1Q0FDOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IE9iamVjdFV0aWxzIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgZ2V0UmVzb2x1dGlvbkZyb21TY2FsZSB9IGZyb20gJy4uLy4uLy4uL21hcC9zaGFyZWQvbWFwLnV0aWxzJztcclxuaW1wb3J0IHsgTEFZRVIgfSBmcm9tICcuLi8uLi8uLi9sYXllcic7XHJcbmltcG9ydCB7IFF1ZXJ5YWJsZURhdGFTb3VyY2VPcHRpb25zLCBRdWVyeUZvcm1hdCB9IGZyb20gJy4uLy4uLy4uL3F1ZXJ5JztcclxuaW1wb3J0IHsgUXVlcnlIdG1sVGFyZ2V0IH0gZnJvbSAnLi8uLi8uLi8uLi9xdWVyeS9zaGFyZWQvcXVlcnkuZW51bXMnO1xyXG5cclxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi4vc2VhcmNoLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2UsIFRleHRTZWFyY2ggfSBmcm9tICcuL3NvdXJjZSc7XHJcbmltcG9ydCB7IFRleHRTZWFyY2hPcHRpb25zIH0gZnJvbSAnLi9zb3VyY2UuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7XHJcbiAgSUxheWVyU2VhcmNoU291cmNlT3B0aW9ucyxcclxuICBJTGF5ZXJEYXRhLFxyXG4gIElMYXllckl0ZW1SZXNwb25zZSxcclxuICBJTGF5ZXJTZXJ2aWNlUmVzcG9uc2UsXHJcbiAgSUxheWVyRGF0YVNvdXJjZVxyXG59IGZyb20gJy4vaWxheWVyLmludGVyZmFjZXMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSUxheWVyU2VhcmNoUmVzdWx0Rm9ybWF0dGVyIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlKSB7fVxyXG5cclxuICBmb3JtYXRSZXN1bHQoZGF0YTogSUxheWVyRGF0YSk6IElMYXllckRhdGEge1xyXG4gICAgY29uc3QgYWxsb3dlZEtleSA9IFtcclxuICAgICAgJ3RpdGxlJyxcclxuICAgICAgJ2Fic3RyYWN0JyxcclxuICAgICAgJ2dyb3VwVGl0bGUnLFxyXG4gICAgICAnbWV0YWRhdGFVcmwnLFxyXG4gICAgICAnZG93bmxvYWRVcmwnLFxyXG4gICAgICAndXJsSW5mbycsXHJcbiAgICAgICduYW1lJ1xyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdCBwcm9wZXJ0eSA9IE9iamVjdC5lbnRyaWVzKGRhdGEucHJvcGVydGllcylcclxuICAgICAgLmZpbHRlcigoW2tleV0pID0+IGFsbG93ZWRLZXkuaW5kZXhPZihrZXkpICE9PSAtMSlcclxuICAgICAgLnJlZHVjZSgob3V0OiB7IFtrZXk6IHN0cmluZ106IGFueSB9LCBlbnRyaWVzOiBbc3RyaW5nLCBhbnldKSA9PiB7XHJcbiAgICAgICAgY29uc3QgW2tleSwgdmFsdWVdID0gZW50cmllcztcclxuICAgICAgICBsZXQgbmV3S2V5O1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBuZXdLZXkgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICAgJ2lnby5nZW8uc2VhcmNoLmlsYXllci5wcm9wZXJ0aWVzLicgKyBrZXlcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgbmV3S2V5ID0ga2V5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBvdXRbbmV3S2V5XSA9IHZhbHVlID8gdmFsdWUgOiAnJztcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgICB9LCB7fSk7XHJcblxyXG4gICAgY29uc3QgZGF0YVIgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhKTtcclxuICAgIGRhdGFSLnByb3BlcnRpZXMgPSBwcm9wZXJ0eSBhcyBJTGF5ZXJEYXRhU291cmNlO1xyXG5cclxuICAgIHJldHVybiBkYXRhUjtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJTGF5ZXIgc2VhcmNoIHNvdXJjZVxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSUxheWVyU2VhcmNoU291cmNlIGV4dGVuZHMgU2VhcmNoU291cmNlIGltcGxlbWVudHMgVGV4dFNlYXJjaCB7XHJcbiAgc3RhdGljIGlkID0gJ2lsYXllcic7XHJcbiAgc3RhdGljIHR5cGUgPSBMQVlFUjtcclxuXHJcbiAgdGl0bGUkOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XHJcblxyXG4gIGdldCB0aXRsZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMudGl0bGUkLmdldFZhbHVlKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBASW5qZWN0KCdvcHRpb25zJykgb3B0aW9uczogSUxheWVyU2VhcmNoU291cmNlT3B0aW9ucyxcclxuICAgIEBJbmplY3QoSUxheWVyU2VhcmNoUmVzdWx0Rm9ybWF0dGVyKVxyXG4gICAgcHJpdmF0ZSBmb3JtYXR0ZXI6IElMYXllclNlYXJjaFJlc3VsdEZvcm1hdHRlclxyXG4gICkge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGVcclxuICAgICAgLmdldCh0aGlzLm9wdGlvbnMudGl0bGUpXHJcbiAgICAgIC5zdWJzY3JpYmUodGl0bGUgPT4gdGhpcy50aXRsZSQubmV4dCh0aXRsZSkpO1xyXG4gIH1cclxuXHJcbiAgZ2V0SWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBJTGF5ZXJTZWFyY2hTb3VyY2UuaWQ7XHJcbiAgfVxyXG5cclxuICBnZXRUeXBlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gSUxheWVyU2VhcmNoU291cmNlLnR5cGU7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0RGVmYXVsdE9wdGlvbnMoKTogSUxheWVyU2VhcmNoU291cmNlT3B0aW9ucyB7XHJcbiAgICBjb25zdCBsaW1pdCA9XHJcbiAgICAgIHRoaXMub3B0aW9ucy5wYXJhbXMgJiYgdGhpcy5vcHRpb25zLnBhcmFtcy5saW1pdFxyXG4gICAgICAgID8gTnVtYmVyKHRoaXMub3B0aW9ucy5wYXJhbXMubGltaXQpXHJcbiAgICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLmlsYXllci5uYW1lJyxcclxuICAgICAgc2VhcmNoVXJsOiAnaHR0cHM6Ly9nZW9lZ2wubXNwLmdvdXYucWMuY2EvYXBpcy9sYXllcnMvc2VhcmNoJyxcclxuICAgICAgc2V0dGluZ3M6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAnY2hlY2tib3gnLFxyXG4gICAgICAgICAgdGl0bGU6ICdyZXN1bHRzIHR5cGUnLFxyXG4gICAgICAgICAgbmFtZTogJ3R5cGUnLFxyXG4gICAgICAgICAgdmFsdWVzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLmlsYXllci50eXBlLmxheWVyJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ2xheWVyJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgIGhhc2h0YWdzOiBbJ2xheWVyJywgJ2xheWVycycsICdjb3VjaGUnLCAnY291Y2hlcyddXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLmlsYXllci50eXBlLmdyb3VwTGF5ZXInLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAnZ3JvdXAnLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIGhhc2h0YWdzOiBbJ2dyLWxheWVyJywgJ2dyLWxheWVycycsICdnci1jb3VjaGUnLCAnZ3ItY291Y2hlcyddXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdyYWRpb2J1dHRvbicsXHJcbiAgICAgICAgICB0aXRsZTogJ3Jlc3VsdHMgbGltaXQnLFxyXG4gICAgICAgICAgbmFtZTogJ2xpbWl0JyxcclxuICAgICAgICAgIHZhbHVlczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICcxJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBsaW1pdCA9PT0gMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICc1JyxcclxuICAgICAgICAgICAgICB2YWx1ZTogNSxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBsaW1pdCA9PT0gNSB8fCAhbGltaXRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnMTAnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAxMCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBsaW1pdCA9PT0gMTBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnMjUnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAyNSxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBsaW1pdCA9PT0gMjVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnNTAnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiA1MCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBsaW1pdCA9PT0gNTBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBhIGxheWVyIGJ5IG5hbWUgb3Iga2V5d29yZFxyXG4gICAqIEBwYXJhbSB0ZXJtIExheWVyIG5hbWUgb3Iga2V5d29yZFxyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgPFNlYXJjaFJlc3VsdDxMYXllck9wdGlvbnM+W11cclxuICAgKi9cclxuICBzZWFyY2goXHJcbiAgICB0ZXJtOiBzdHJpbmcgfCB1bmRlZmluZWQsXHJcbiAgICBvcHRpb25zPzogVGV4dFNlYXJjaE9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFNlYXJjaFJlc3VsdDxJTGF5ZXJJdGVtUmVzcG9uc2U+W10+IHtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuY29tcHV0ZVNlYXJjaFJlcXVlc3RQYXJhbXModGVybSwgb3B0aW9ucyB8fCB7fSk7XHJcbiAgICBpZiAoIXBhcmFtcy5nZXQoJ3EnKSB8fCAhcGFyYW1zLmdldCgndHlwZScpKSB7XHJcbiAgICAgIHJldHVybiBvZihbXSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9wdGlvbnMucGFyYW1zLnBhZ2UgPSBwYXJhbXMuZ2V0KCdwYWdlJykgfHwgJzEnO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLmdldCh0aGlzLnNlYXJjaFVybCwgeyBwYXJhbXMgfSlcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChyZXNwb25zZTogSUxheWVyU2VydmljZVJlc3BvbnNlKSA9PiB0aGlzLmV4dHJhY3RSZXN1bHRzKHJlc3BvbnNlKSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZVNlYXJjaFJlcXVlc3RQYXJhbXMoXHJcbiAgICB0ZXJtOiBzdHJpbmcsXHJcbiAgICBvcHRpb25zOiBUZXh0U2VhcmNoT3B0aW9uc1xyXG4gICk6IEh0dHBQYXJhbXMge1xyXG4gICAgcmV0dXJuIG5ldyBIdHRwUGFyYW1zKHtcclxuICAgICAgZnJvbU9iamVjdDogT2JqZWN0VXRpbHMucmVtb3ZlVW5kZWZpbmVkKFxyXG4gICAgICAgIE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHE6IHRoaXMuY29tcHV0ZVRlcm0odGVybSlcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB0aGlzLnBhcmFtcyxcclxuICAgICAgICAgIHRoaXMuY29tcHV0ZU9wdGlvbnNQYXJhbSh0ZXJtLCBvcHRpb25zIHx8IHt9KS5wYXJhbXMsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHBhZ2U6IG9wdGlvbnMucGFnZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgICAgKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgaGFzaHRhZyBmcm9tIHF1ZXJ5XHJcbiAgICogQHBhcmFtIHRlcm0gUXVlcnkgd2l0aCBoYXNodGFnXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjb21wdXRlVGVybSh0ZXJtOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRlcm0ucmVwbGFjZSgvKCNbXlxcc10qKS9nLCAnJykucmVwbGFjZSgvW15cXHfDgC3DvyAhXFwtXFwoXFwpLCcjXSsvZywgJycpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGhhc2h0YWcgdG8gcGFyYW0gaWYgdmFsaWRcclxuICAgKiBAcGFyYW0gdGVybSBRdWVyeSB3aXRoIGhhc2h0YWdcclxuICAgKiBAcGFyYW0gb3B0aW9ucyBUZXh0U2VhcmNoT3B0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgY29tcHV0ZU9wdGlvbnNQYXJhbShcclxuICAgIHRlcm06IHN0cmluZyxcclxuICAgIG9wdGlvbnM6IFRleHRTZWFyY2hPcHRpb25zXHJcbiAgKTogVGV4dFNlYXJjaE9wdGlvbnMge1xyXG4gICAgY29uc3QgaGFzaHRhZ3MgPSBzdXBlci5nZXRIYXNodGFnc1ZhbGlkKHRlcm0sICd0eXBlJyk7XHJcbiAgICBpZiAoaGFzaHRhZ3MpIHtcclxuICAgICAgb3B0aW9ucy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKG9wdGlvbnMucGFyYW1zIHx8IHt9LCB7XHJcbiAgICAgICAgdHlwZTogaGFzaHRhZ3Muam9pbignLCcpXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvcHRpb25zO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0UmVzdWx0cyhcclxuICAgIHJlc3BvbnNlOiBJTGF5ZXJTZXJ2aWNlUmVzcG9uc2VcclxuICApOiBTZWFyY2hSZXN1bHQ8SUxheWVySXRlbVJlc3BvbnNlPltdIHtcclxuICAgIHJldHVybiByZXNwb25zZS5pdGVtcy5tYXAoKGRhdGE6IElMYXllckRhdGEpID0+XHJcbiAgICAgIHRoaXMuZGF0YVRvUmVzdWx0KGRhdGEsIHJlc3BvbnNlKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGF0YVRvUmVzdWx0KFxyXG4gICAgZGF0YTogSUxheWVyRGF0YSxcclxuICAgIHJlc3BvbnNlPzogSUxheWVyU2VydmljZVJlc3BvbnNlXHJcbiAgKTogU2VhcmNoUmVzdWx0PElMYXllckl0ZW1SZXNwb25zZT4ge1xyXG4gICAgY29uc3QgbGF5ZXJPcHRpb25zID0gdGhpcy5jb21wdXRlTGF5ZXJPcHRpb25zKGRhdGEpO1xyXG5cclxuICAgIGNvbnN0IHRpdGxlSHRtbCA9IGRhdGEuaGlnaGxpZ2h0LnRpdGxlIHx8IGRhdGEucHJvcGVydGllcy50aXRsZTtcclxuICAgIGNvbnN0IGdyb3VwVGl0bGUgPSBkYXRhLmhpZ2hsaWdodC5ncm91cFRpdGxlIHx8IGRhdGEucHJvcGVydGllcy5ncm91cFRpdGxlO1xyXG4gICAgY29uc3Qgc3VidGl0bGVIdG1sID0gZ3JvdXBUaXRsZVxyXG4gICAgICA/ICcgPHNtYWxsIHN0eWxlPVwiY29sb3I6ICM2ZjY5NjlcIj4gJyArIGdyb3VwVGl0bGUgKyAnPC9zbWFsbD4nXHJcbiAgICAgIDogJyc7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc291cmNlOiB0aGlzLFxyXG4gICAgICBtZXRhOiB7XHJcbiAgICAgICAgZGF0YVR5cGU6IExBWUVSLFxyXG4gICAgICAgIGlkOiBbdGhpcy5nZXRJZCgpLCBkYXRhLnByb3BlcnRpZXMuaWRdLmpvaW4oJy4nKSxcclxuICAgICAgICB0aXRsZTogZGF0YS5wcm9wZXJ0aWVzLnRpdGxlLFxyXG4gICAgICAgIHRpdGxlSHRtbDogdGl0bGVIdG1sICsgc3VidGl0bGVIdG1sLFxyXG4gICAgICAgIGljb246IGRhdGEucHJvcGVydGllcy50eXBlID09PSAnTGF5ZXInID8gJ2xheWVycycgOiAnbWFwJyxcclxuICAgICAgICBuZXh0UGFnZTpcclxuICAgICAgICAgIHJlc3BvbnNlLml0ZW1zLmxlbmd0aCAlICt0aGlzLm9wdGlvbnMucGFyYW1zLmxpbWl0ID09PSAwICYmXHJcbiAgICAgICAgICArdGhpcy5vcHRpb25zLnBhcmFtcy5wYWdlIDwgMTBcclxuICAgICAgfSxcclxuICAgICAgZGF0YTogbGF5ZXJPcHRpb25zXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlTGF5ZXJPcHRpb25zKGRhdGE6IElMYXllckRhdGEpOiBJTGF5ZXJJdGVtUmVzcG9uc2Uge1xyXG4gICAgY29uc3QgdXJsID0gZGF0YS5wcm9wZXJ0aWVzLnVybDtcclxuICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiBRdWVyeWFibGVEYXRhU291cmNlT3B0aW9ucyA9IHRoaXMuZXh0cmFjdFF1ZXJ5UGFyYW1zRnJvbVNvdXJjZVVybChcclxuICAgICAgdXJsXHJcbiAgICApO1xyXG4gICAgcmV0dXJuIE9iamVjdFV0aWxzLnJlbW92ZVVuZGVmaW5lZCh7XHJcbiAgICAgIHNvdXJjZU9wdGlvbnM6IHtcclxuICAgICAgICBpZDogZGF0YS5wcm9wZXJ0aWVzLmlkLFxyXG4gICAgICAgIHR5cGU6IGRhdGEucHJvcGVydGllcy5mb3JtYXQsXHJcbiAgICAgICAgdXJsLFxyXG4gICAgICAgIHF1ZXJ5Rm9ybWF0OiBxdWVyeVBhcmFtcy5xdWVyeUZvcm1hdCxcclxuICAgICAgICBxdWVyeUh0bWxUYXJnZXQ6IHF1ZXJ5UGFyYW1zLnF1ZXJ5SHRtbFRhcmdldCxcclxuICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgIExBWUVSUzogZGF0YS5wcm9wZXJ0aWVzLm5hbWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9wdGlvbnNGcm9tQ2FwYWJpbGl0aWVzOiB0cnVlLFxyXG4gICAgICAgIGNyb3NzT3JpZ2luOiAnYW5vbnltb3VzJ1xyXG4gICAgICB9LFxyXG4gICAgICB0aXRsZTogZGF0YS5wcm9wZXJ0aWVzLnRpdGxlLFxyXG4gICAgICBtYXhSZXNvbHV0aW9uOiBnZXRSZXNvbHV0aW9uRnJvbVNjYWxlKFxyXG4gICAgICAgIE51bWJlcihkYXRhLnByb3BlcnRpZXMubWF4U2NhbGVEZW5vbSlcclxuICAgICAgKSxcclxuICAgICAgbWluUmVzb2x1dGlvbjogZ2V0UmVzb2x1dGlvbkZyb21TY2FsZShcclxuICAgICAgICBOdW1iZXIoZGF0YS5wcm9wZXJ0aWVzLm1pblNjYWxlRGVub20pXHJcbiAgICAgICksXHJcbiAgICAgIG1ldGFkYXRhOiB7XHJcbiAgICAgICAgdXJsOiBkYXRhLnByb3BlcnRpZXMubWV0YWRhdGFVcmwsXHJcbiAgICAgICAgZXh0ZXJuOiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgIHByb3BlcnRpZXM6IHRoaXMuZm9ybWF0dGVyLmZvcm1hdFJlc3VsdChkYXRhKS5wcm9wZXJ0aWVzXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdFF1ZXJ5UGFyYW1zRnJvbVNvdXJjZVVybChcclxuICAgIHVybDogc3RyaW5nXHJcbiAgKTogeyBxdWVyeUZvcm1hdDogUXVlcnlGb3JtYXQ7IHF1ZXJ5SHRtbFRhcmdldDogUXVlcnlIdG1sVGFyZ2V0IH0ge1xyXG4gICAgbGV0IHF1ZXJ5Rm9ybWF0O1xyXG4gICAgbGV0IHF1ZXJ5SHRtbFRhcmdldDtcclxuICAgIGNvbnN0IGZvcm1hdE9wdCA9ICh0aGlzLm9wdGlvbnMgYXMgSUxheWVyU2VhcmNoU291cmNlT3B0aW9ucykucXVlcnlGb3JtYXQ7XHJcbiAgICBpZiAoZm9ybWF0T3B0KSB7XHJcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGZvcm1hdE9wdCkpIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IGZvcm1hdE9wdFtrZXldO1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gJyonKSB7XHJcbiAgICAgICAgICBxdWVyeUZvcm1hdCA9IFF1ZXJ5Rm9ybWF0W2tleS50b1VwcGVyQ2FzZSgpXTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdXJscyA9ICgodmFsdWUgYXMgYW55KSBhcyB7IHVybHM6IHN0cmluZ1tdIH0pLnVybHM7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodXJscykpIHtcclxuICAgICAgICAgIHVybHMuZm9yRWFjaCh1cmxPcHQgPT4ge1xyXG4gICAgICAgICAgICBpZiAodXJsLmluZGV4T2YodXJsT3B0KSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICBxdWVyeUZvcm1hdCA9IFF1ZXJ5Rm9ybWF0W2tleS50b1VwcGVyQ2FzZSgpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChcclxuICAgICAgICBxdWVyeUZvcm1hdCA9PT0gUXVlcnlGb3JtYXQuSFRNTCB8fFxyXG4gICAgICAgIHF1ZXJ5Rm9ybWF0ID09PSBRdWVyeUZvcm1hdC5IVE1MR01MMlxyXG4gICAgICApIHtcclxuICAgICAgICBxdWVyeUh0bWxUYXJnZXQgPSAnaWZyYW1lJztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHF1ZXJ5Rm9ybWF0LFxyXG4gICAgICBxdWVyeUh0bWxUYXJnZXRcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==