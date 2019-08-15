/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LanguageService } from '@igo2/core';
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
        this.languageService.translate.get(this.options.title).subscribe((/**
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
     * @protected
     * @return {?}
     */
    getDefaultOptions() {
        return {
            title: 'igo.geo.search.ilayer.name',
            searchUrl: 'https://geoegl.msp.gouv.qc.ca/apis/layers/search'
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
            fromObject: Object.assign({
                q: term
            }, this.params, options.params || {})
        });
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
        (data) => this.dataToResult(data)));
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    dataToResult(data) {
        /** @type {?} */
        const layerOptions = this.computeLayerOptions(data);
        return {
            source: this,
            meta: {
                dataType: LAYER,
                id: [this.getId(), data.properties.id].join('.'),
                title: data.properties.title,
                titleHtml: data.highlight.title,
                icon: data.properties.type === 'Layer' ? 'layers' : 'map'
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
                    layers: data.properties.name
                }
            },
            title: data.properties.title,
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
                const urls = ((/** @type {?} */ ((/** @type {?} */ (value))))).urls;
                if (Array.isArray(urls)) {
                    urls.forEach((/**
                     * @param {?} urlOpt
                     * @return {?}
                     */
                    (urlOpt) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zaGFyZWQvc291cmNlcy9pbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFOUQsT0FBTyxFQUFjLGVBQWUsRUFBRyxNQUFNLE1BQU0sQ0FBQztBQUNwRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUU3QyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsT0FBTyxFQUE4QixXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUl6RSxPQUFPLEVBQUUsWUFBWSxFQUFjLE1BQU0sVUFBVSxDQUFDO0FBS3BELE1BQU0sT0FBTywyQkFBMkI7Ozs7SUFDdEMsWUFBb0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO0lBQUcsQ0FBQzs7Ozs7SUFFeEQsWUFBWSxDQUFDLElBQWdCOztjQUNyQixVQUFVLEdBQUcsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUM7O2NBRS9ELFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDN0MsTUFBTTs7OztRQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQzthQUNqRCxNQUFNOzs7OztRQUFDLENBQUMsR0FBeUIsRUFBRSxPQUFzQixFQUFFLEVBQUU7a0JBQ3RELENBQUMsR0FBRyxFQUFF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RUQsT0FBTztZQUNMLFdBQVc7WUFDWCxlQUFlO1NBQ2hCLENBQUM7SUFDSixDQUFDOztBQWpJTSxxQkFBRSxHQUFHLFFBQVEsQ0FBQztBQUNkLHVCQUFJLEdBQUcsS0FBSyxDQUFDOztZQUpyQixVQUFVOzs7O1lBL0NGLFVBQVU7WUFLVixlQUFlOzRDQXlEbkIsTUFBTSxTQUFDLFNBQVM7WUFFRSwyQkFBMkIsdUJBRDdDLE1BQU0sU0FBQywyQkFBMkI7Ozs7SUFickMsc0JBQXFCOztJQUNyQix3QkFBb0I7O0lBRXBCLG9DQUFrRTs7Ozs7SUFPaEUsa0NBQXdCOzs7OztJQUN4Qiw2Q0FBd0M7Ozs7O0lBRXhDLHVDQUM4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0ICB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7IExBWUVSIH0gZnJvbSAnLi4vLi4vLi4vbGF5ZXInO1xyXG5pbXBvcnQgeyBRdWVyeWFibGVEYXRhU291cmNlT3B0aW9ucywgUXVlcnlGb3JtYXQgfSBmcm9tICcuLi8uLi8uLi9xdWVyeSc7XHJcbmltcG9ydCB7IFF1ZXJ5SHRtbFRhcmdldCB9IGZyb20gJy4vLi4vLi4vLi4vcXVlcnkvc2hhcmVkL3F1ZXJ5LmVudW1zJztcclxuXHJcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCB9IGZyb20gJy4uL3NlYXJjaC5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgU2VhcmNoU291cmNlLCBUZXh0U2VhcmNoIH0gZnJvbSAnLi9zb3VyY2UnO1xyXG5pbXBvcnQgeyBUZXh0U2VhcmNoT3B0aW9ucyB9IGZyb20gJy4vc291cmNlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBJTGF5ZXJTZWFyY2hTb3VyY2VPcHRpb25zLCBJTGF5ZXJEYXRhLCBJTGF5ZXJJdGVtUmVzcG9uc2UsIElMYXllclNlcnZpY2VSZXNwb25zZSwgSUxheWVyRGF0YVNvdXJjZSB9IGZyb20gJy4vaWxheWVyLmludGVyZmFjZXMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSUxheWVyU2VhcmNoUmVzdWx0Rm9ybWF0dGVyIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlKSB7fVxyXG5cclxuICBmb3JtYXRSZXN1bHQoZGF0YTogSUxheWVyRGF0YSk6IElMYXllckRhdGEge1xyXG4gICAgY29uc3QgYWxsb3dlZEtleSA9IFsndGl0bGUnLCAnYWJzdHJhY3QnLCAnZ3JvdXBUaXRsZScsICdtZXRhZGF0YVVybCddO1xyXG5cclxuICAgIGNvbnN0IHByb3BlcnR5ID0gT2JqZWN0LmVudHJpZXMoZGF0YS5wcm9wZXJ0aWVzKVxyXG4gICAgICAuZmlsdGVyKChba2V5XSkgPT4gYWxsb3dlZEtleS5pbmRleE9mKGtleSkgIT09IC0xKVxyXG4gICAgICAucmVkdWNlKChvdXQ6IHtba2V5OiBzdHJpbmddOiBhbnl9LCBlbnRyaWVzOiBbc3RyaW5nLCBhbnldKSA9PiB7XHJcbiAgICAgICAgY29uc3QgW2tleSwgdmFsdWVdID0gZW50cmllcztcclxuICAgICAgICBsZXQgbmV3S2V5O1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBuZXdLZXkgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5zZWFyY2guaWxheWVyLnByb3BlcnRpZXMuJyArIGtleSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgbmV3S2V5ID0ga2V5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBvdXRbbmV3S2V5XSA9IHZhbHVlID8gdmFsdWUgOiAnJztcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgICB9LCB7fSk7XHJcblxyXG4gICAgY29uc3QgZGF0YVIgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhKTtcclxuICAgIGRhdGFSLnByb3BlcnRpZXMgPSBwcm9wZXJ0eSBhcyBJTGF5ZXJEYXRhU291cmNlO1xyXG5cclxuICAgIHJldHVybiBkYXRhUjtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJTGF5ZXIgc2VhcmNoIHNvdXJjZVxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSUxheWVyU2VhcmNoU291cmNlIGV4dGVuZHMgU2VhcmNoU291cmNlIGltcGxlbWVudHMgVGV4dFNlYXJjaCB7XHJcblxyXG4gIHN0YXRpYyBpZCA9ICdpbGF5ZXInO1xyXG4gIHN0YXRpYyB0eXBlID0gTEFZRVI7XHJcblxyXG4gIHRpdGxlJDogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xyXG5cclxuICBnZXQgdGl0bGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLnRpdGxlJC5nZXRWYWx1ZSgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICBwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgQEluamVjdCgnb3B0aW9ucycpIG9wdGlvbnM6IElMYXllclNlYXJjaFNvdXJjZU9wdGlvbnMsXHJcbiAgICBASW5qZWN0KElMYXllclNlYXJjaFJlc3VsdEZvcm1hdHRlcilcclxuICAgIHByaXZhdGUgZm9ybWF0dGVyOiBJTGF5ZXJTZWFyY2hSZXN1bHRGb3JtYXR0ZXJcclxuICApIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmdldCh0aGlzLm9wdGlvbnMudGl0bGUpLnN1YnNjcmliZSh0aXRsZSA9PiB0aGlzLnRpdGxlJC5uZXh0KHRpdGxlKSk7XHJcbiAgfVxyXG5cclxuICBnZXRJZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIElMYXllclNlYXJjaFNvdXJjZS5pZDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXREZWZhdWx0T3B0aW9ucygpOiBJTGF5ZXJTZWFyY2hTb3VyY2VPcHRpb25zIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiAnaWdvLmdlby5zZWFyY2guaWxheWVyLm5hbWUnLFxyXG4gICAgICBzZWFyY2hVcmw6ICdodHRwczovL2dlb2VnbC5tc3AuZ291di5xYy5jYS9hcGlzL2xheWVycy9zZWFyY2gnXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIGEgbGF5ZXIgYnkgbmFtZSBvciBrZXl3b3JkXHJcbiAgICogQHBhcmFtIHRlcm0gTGF5ZXIgbmFtZSBvciBrZXl3b3JkXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiA8U2VhcmNoUmVzdWx0PExheWVyT3B0aW9ucz5bXVxyXG4gICAqL1xyXG4gIHNlYXJjaChcclxuICAgIHRlcm06IHN0cmluZyB8IHVuZGVmaW5lZCxcclxuICAgIG9wdGlvbnM/OiBUZXh0U2VhcmNoT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8U2VhcmNoUmVzdWx0PElMYXllckl0ZW1SZXNwb25zZT5bXT4ge1xyXG4gICAgY29uc3QgcGFyYW1zID0gdGhpcy5jb21wdXRlU2VhcmNoUmVxdWVzdFBhcmFtcyh0ZXJtLCBvcHRpb25zIHx8IHt9KTtcclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLmdldCh0aGlzLnNlYXJjaFVybCwgeyBwYXJhbXMgfSlcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChyZXNwb25zZTogSUxheWVyU2VydmljZVJlc3BvbnNlKSA9PiB0aGlzLmV4dHJhY3RSZXN1bHRzKHJlc3BvbnNlKSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZVNlYXJjaFJlcXVlc3RQYXJhbXModGVybTogc3RyaW5nLCBvcHRpb25zOiBUZXh0U2VhcmNoT3B0aW9ucyk6IEh0dHBQYXJhbXMge1xyXG4gICAgcmV0dXJuIG5ldyBIdHRwUGFyYW1zKHtcclxuICAgICAgZnJvbU9iamVjdDogT2JqZWN0LmFzc2lnbih7XHJcbiAgICAgICAgcTogdGVybVxyXG4gICAgICB9LCB0aGlzLnBhcmFtcywgb3B0aW9ucy5wYXJhbXMgfHwge30pXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdFJlc3VsdHMocmVzcG9uc2U6IElMYXllclNlcnZpY2VSZXNwb25zZSk6IFNlYXJjaFJlc3VsdDxJTGF5ZXJJdGVtUmVzcG9uc2U+W10ge1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlLml0ZW1zLm1hcCgoZGF0YTogSUxheWVyRGF0YSkgPT4gdGhpcy5kYXRhVG9SZXN1bHQoZGF0YSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkYXRhVG9SZXN1bHQoZGF0YTogSUxheWVyRGF0YSk6IFNlYXJjaFJlc3VsdDxJTGF5ZXJJdGVtUmVzcG9uc2U+IHtcclxuICAgIGNvbnN0IGxheWVyT3B0aW9ucyA9IHRoaXMuY29tcHV0ZUxheWVyT3B0aW9ucyhkYXRhKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzb3VyY2U6IHRoaXMsXHJcbiAgICAgIG1ldGE6IHtcclxuICAgICAgICBkYXRhVHlwZTogTEFZRVIsXHJcbiAgICAgICAgaWQ6IFt0aGlzLmdldElkKCksIGRhdGEucHJvcGVydGllcy5pZF0uam9pbignLicpLFxyXG4gICAgICAgIHRpdGxlOiBkYXRhLnByb3BlcnRpZXMudGl0bGUsXHJcbiAgICAgICAgdGl0bGVIdG1sOiBkYXRhLmhpZ2hsaWdodC50aXRsZSxcclxuICAgICAgICBpY29uOiBkYXRhLnByb3BlcnRpZXMudHlwZSA9PT0gJ0xheWVyJyA/ICdsYXllcnMnIDogJ21hcCdcclxuICAgICAgfSxcclxuICAgICAgZGF0YTogbGF5ZXJPcHRpb25zXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlTGF5ZXJPcHRpb25zKGRhdGE6IElMYXllckRhdGEpOiBJTGF5ZXJJdGVtUmVzcG9uc2Uge1xyXG4gICAgY29uc3QgdXJsID0gZGF0YS5wcm9wZXJ0aWVzLnVybDtcclxuICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiBRdWVyeWFibGVEYXRhU291cmNlT3B0aW9ucyA9IHRoaXMuZXh0cmFjdFF1ZXJ5UGFyYW1zRnJvbVNvdXJjZVVybCh1cmwpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc291cmNlT3B0aW9uczoge1xyXG4gICAgICAgIGlkOiBkYXRhLnByb3BlcnRpZXMuaWQsXHJcbiAgICAgICAgY3Jvc3NPcmlnaW46ICdhbm9ueW1vdXMnLFxyXG4gICAgICAgIHR5cGU6IGRhdGEucHJvcGVydGllcy5mb3JtYXQsXHJcbiAgICAgICAgdXJsLFxyXG4gICAgICAgIHF1ZXJ5Rm9ybWF0OiBxdWVyeVBhcmFtcy5xdWVyeUZvcm1hdCxcclxuICAgICAgICBxdWVyeUh0bWxUYXJnZXQ6IHF1ZXJ5UGFyYW1zLnF1ZXJ5SHRtbFRhcmdldCxcclxuICAgICAgICBxdWVyeWFibGU6IGRhdGEucHJvcGVydGllcy5xdWVyeWFibGUsXHJcbiAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICBsYXllcnM6IGRhdGEucHJvcGVydGllcy5uYW1lXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICB0aXRsZTogZGF0YS5wcm9wZXJ0aWVzLnRpdGxlLFxyXG4gICAgICBwcm9wZXJ0aWVzOiB0aGlzLmZvcm1hdHRlci5mb3JtYXRSZXN1bHQoZGF0YSkucHJvcGVydGllc1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdFF1ZXJ5UGFyYW1zRnJvbVNvdXJjZVVybCh1cmw6IHN0cmluZyk6IHtxdWVyeUZvcm1hdDogUXVlcnlGb3JtYXQ7IHF1ZXJ5SHRtbFRhcmdldDogUXVlcnlIdG1sVGFyZ2V0OyB9IHtcclxuICAgIGxldCBxdWVyeUZvcm1hdCA9IFF1ZXJ5Rm9ybWF0LkdNTDI7XHJcbiAgICBsZXQgcXVlcnlIdG1sVGFyZ2V0O1xyXG4gICAgY29uc3QgZm9ybWF0T3B0ID0gKHRoaXMub3B0aW9ucyBhcyBJTGF5ZXJTZWFyY2hTb3VyY2VPcHRpb25zKS5xdWVyeUZvcm1hdDtcclxuICAgIGlmIChmb3JtYXRPcHQpIHtcclxuICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoZm9ybWF0T3B0KSkge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gZm9ybWF0T3B0W2tleV07XHJcbiAgICAgICAgaWYgKHZhbHVlID09PSAnKicpIHtcclxuICAgICAgICAgIHF1ZXJ5Rm9ybWF0ID0gUXVlcnlGb3JtYXRba2V5LnRvVXBwZXJDYXNlKCldO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1cmxzID0gKHZhbHVlIGFzIGFueSBhcyB7dXJsczogc3RyaW5nW119KS51cmxzO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHVybHMpKSB7XHJcbiAgICAgICAgICB1cmxzLmZvckVhY2goKHVybE9wdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodXJsLmluZGV4T2YodXJsT3B0KSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICBxdWVyeUZvcm1hdCA9IFF1ZXJ5Rm9ybWF0W2tleS50b1VwcGVyQ2FzZSgpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAocXVlcnlGb3JtYXQgPT09IFF1ZXJ5Rm9ybWF0LkhUTUwpIHtcclxuICAgICAgcXVlcnlIdG1sVGFyZ2V0ID0gJ2lmcmFtZSc7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcXVlcnlGb3JtYXQsXHJcbiAgICAgIHF1ZXJ5SHRtbFRhcmdldFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19