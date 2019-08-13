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
/**
 * ILayer search source
 */
export class ILayerSearchSource extends SearchSource {
    /**
     * @param {?} http
     * @param {?} languageService
     * @param {?} options
     */
    constructor(http, languageService, options) {
        super(options);
        this.http = http;
        this.languageService = languageService;
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
            title: 'igo.geo.search.dataSources.name',
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
                id: [this.getId(), data.id].join('.'),
                title: data.source.title,
                titleHtml: data.highlight.title,
                icon: data.source.type === 'Layer' ? 'layers' : 'map'
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
        const url = data.source.url;
        /** @type {?} */
        const queryParams = this.extractQueryParamsFromSourceUrl(url);
        return {
            title: data.source.title,
            sourceOptions: {
                crossOrigin: 'anonymous',
                type: data.source.format,
                url,
                queryable: ((/** @type {?} */ (data.source))).queryable,
                queryFormat: queryParams.format,
                queryHtmlTarget: queryParams.htmlTarget,
                params: {
                    layers: data.source.name
                }
            }
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
        let htmlTarget;
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
            htmlTarget = 'iframe';
        }
        return {
            format: queryFormat,
            htmlTarget
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
    { type: undefined, decorators: [{ type: Inject, args: ['options',] }] }
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zaGFyZWQvc291cmNlcy9pbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFOUQsT0FBTyxFQUFjLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUU3QyxPQUFPLEVBQUUsS0FBSyxFQUFpQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3RFLE9BQU8sRUFBOEIsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHekUsT0FBTyxFQUFFLFlBQVksRUFBYyxNQUFNLFVBQVUsQ0FBQzs7OztBQVFwRCxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsWUFBWTs7Ozs7O0lBV2xELFlBQ1UsSUFBZ0IsRUFDaEIsZUFBZ0MsRUFDckIsT0FBa0M7UUFFckQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBSlAsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFSMUMsV0FBTSxHQUE0QixJQUFJLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztRQVloRSxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDO0lBQ3JHLENBQUM7Ozs7SUFYRCxJQUFJLEtB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QkYsVUFBVTtZQUtWLGVBQWU7NENBNEJuQixNQUFNLFNBQUMsU0FBUzs7OztJQVpuQixzQkFBcUI7O0lBQ3JCLHdCQUFvQjs7SUFFcEIsb0NBQWtFOzs7OztJQU9oRSxrQ0FBd0I7Ozs7O0lBQ3hCLDZDQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IExhbmd1YWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTEFZRVIsIEFueUxheWVyT3B0aW9ucywgTGF5ZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vbGF5ZXInO1xyXG5pbXBvcnQgeyBRdWVyeWFibGVEYXRhU291cmNlT3B0aW9ucywgUXVlcnlGb3JtYXQgfSBmcm9tICcuLi8uLi8uLi9xdWVyeSc7XHJcblxyXG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQgfSBmcm9tICcuLi9zZWFyY2guaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZSwgVGV4dFNlYXJjaCB9IGZyb20gJy4vc291cmNlJztcclxuaW1wb3J0IHsgVGV4dFNlYXJjaE9wdGlvbnMgfSBmcm9tICcuL3NvdXJjZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgSUxheWVyU2VhcmNoU291cmNlT3B0aW9ucywgSUxheWVyRGF0YSwgSUxheWVyUmVzcG9uc2UgfSBmcm9tICcuL2lsYXllci5pbnRlcmZhY2VzJztcclxuXHJcbi8qKlxyXG4gKiBJTGF5ZXIgc2VhcmNoIHNvdXJjZVxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSUxheWVyU2VhcmNoU291cmNlIGV4dGVuZHMgU2VhcmNoU291cmNlIGltcGxlbWVudHMgVGV4dFNlYXJjaCB7XHJcblxyXG4gIHN0YXRpYyBpZCA9ICdpbGF5ZXInO1xyXG4gIHN0YXRpYyB0eXBlID0gTEFZRVI7XHJcblxyXG4gIHRpdGxlJDogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xyXG5cclxuICBnZXQgdGl0bGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLnRpdGxlJC5nZXRWYWx1ZSgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICBwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgQEluamVjdCgnb3B0aW9ucycpIG9wdGlvbnM6IElMYXllclNlYXJjaFNvdXJjZU9wdGlvbnNcclxuICApIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmdldCh0aGlzLm9wdGlvbnMudGl0bGUpLnN1YnNjcmliZSh0aXRsZSA9PiB0aGlzLnRpdGxlJC5uZXh0KHRpdGxlKSk7XHJcbiAgfVxyXG5cclxuICBnZXRJZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIElMYXllclNlYXJjaFNvdXJjZS5pZDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXREZWZhdWx0T3B0aW9ucygpOiBJTGF5ZXJTZWFyY2hTb3VyY2VPcHRpb25zIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiAnaWdvLmdlby5zZWFyY2guZGF0YVNvdXJjZXMubmFtZScsXHJcbiAgICAgIHNlYXJjaFVybDogJ2h0dHBzOi8vZ2VvZWdsLm1zcC5nb3V2LnFjLmNhL2FwaXMvbGF5ZXJzL3NlYXJjaCdcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggYSBsYXllciBieSBuYW1lIG9yIGtleXdvcmRcclxuICAgKiBAcGFyYW0gdGVybSBMYXllciBuYW1lIG9yIGtleXdvcmRcclxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIDxTZWFyY2hSZXN1bHQ8TGF5ZXJPcHRpb25zPltdXHJcbiAgICovXHJcbiAgc2VhcmNoKFxyXG4gICAgdGVybTogc3RyaW5nIHwgdW5kZWZpbmVkLFxyXG4gICAgb3B0aW9ucz86IFRleHRTZWFyY2hPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxTZWFyY2hSZXN1bHQ8TGF5ZXJPcHRpb25zPltdPiB7XHJcbiAgICBjb25zdCBwYXJhbXMgPSB0aGlzLmNvbXB1dGVTZWFyY2hSZXF1ZXN0UGFyYW1zKHRlcm0sIG9wdGlvbnMgfHwge30pO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuZ2V0KHRoaXMuc2VhcmNoVXJsLCB7IHBhcmFtcyB9KVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoKHJlc3BvbnNlOiBJTGF5ZXJSZXNwb25zZSkgPT4gdGhpcy5leHRyYWN0UmVzdWx0cyhyZXNwb25zZSkpXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVTZWFyY2hSZXF1ZXN0UGFyYW1zKHRlcm06IHN0cmluZywgb3B0aW9uczogVGV4dFNlYXJjaE9wdGlvbnMpOiBIdHRwUGFyYW1zIHtcclxuICAgIHJldHVybiBuZXcgSHR0cFBhcmFtcyh7XHJcbiAgICAgIGZyb21PYmplY3Q6IE9iamVjdC5hc3NpZ24oe1xyXG4gICAgICAgIHE6IHRlcm1cclxuICAgICAgfSwgdGhpcy5wYXJhbXMsIG9wdGlvbnMucGFyYW1zIHx8IHt9KVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RSZXN1bHRzKHJlc3BvbnNlOiBJTGF5ZXJSZXNwb25zZSk6IFNlYXJjaFJlc3VsdDxMYXllck9wdGlvbnM+W10ge1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlLml0ZW1zLm1hcCgoZGF0YTogSUxheWVyRGF0YSkgPT4gdGhpcy5kYXRhVG9SZXN1bHQoZGF0YSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkYXRhVG9SZXN1bHQoZGF0YTogSUxheWVyRGF0YSk6IFNlYXJjaFJlc3VsdDxMYXllck9wdGlvbnM+IHtcclxuICAgIGNvbnN0IGxheWVyT3B0aW9ucyA9IHRoaXMuY29tcHV0ZUxheWVyT3B0aW9ucyhkYXRhKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzb3VyY2U6IHRoaXMsXHJcbiAgICAgIG1ldGE6IHtcclxuICAgICAgICBkYXRhVHlwZTogTEFZRVIsXHJcbiAgICAgICAgaWQ6IFt0aGlzLmdldElkKCksIGRhdGEuaWRdLmpvaW4oJy4nKSxcclxuICAgICAgICB0aXRsZTogZGF0YS5zb3VyY2UudGl0bGUsXHJcbiAgICAgICAgdGl0bGVIdG1sOiBkYXRhLmhpZ2hsaWdodC50aXRsZSxcclxuICAgICAgICBpY29uOiBkYXRhLnNvdXJjZS50eXBlID09PSAnTGF5ZXInID8gJ2xheWVycycgOiAnbWFwJ1xyXG4gICAgICB9LFxyXG4gICAgICBkYXRhOiBsYXllck9wdGlvbnNcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVMYXllck9wdGlvbnMoZGF0YTogSUxheWVyRGF0YSk6IEFueUxheWVyT3B0aW9ucyB7XHJcbiAgICBjb25zdCB1cmwgPSBkYXRhLnNvdXJjZS51cmw7XHJcbiAgICBjb25zdCBxdWVyeVBhcmFtczogYW55ID0gdGhpcy5leHRyYWN0UXVlcnlQYXJhbXNGcm9tU291cmNlVXJsKHVybCk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0aXRsZTogZGF0YS5zb3VyY2UudGl0bGUsXHJcbiAgICAgIHNvdXJjZU9wdGlvbnM6IHtcclxuICAgICAgICBjcm9zc09yaWdpbjogJ2Fub255bW91cycsXHJcbiAgICAgICAgdHlwZTogZGF0YS5zb3VyY2UuZm9ybWF0LFxyXG4gICAgICAgIHVybCxcclxuICAgICAgICBxdWVyeWFibGU6IChkYXRhLnNvdXJjZSBhcyBRdWVyeWFibGVEYXRhU291cmNlT3B0aW9ucykucXVlcnlhYmxlLFxyXG4gICAgICAgIHF1ZXJ5Rm9ybWF0OiBxdWVyeVBhcmFtcy5mb3JtYXQsXHJcbiAgICAgICAgcXVlcnlIdG1sVGFyZ2V0OiBxdWVyeVBhcmFtcy5odG1sVGFyZ2V0LFxyXG4gICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgbGF5ZXJzOiBkYXRhLnNvdXJjZS5uYW1lXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0UXVlcnlQYXJhbXNGcm9tU291cmNlVXJsKHVybDogc3RyaW5nKToge2Zvcm1hdDogUXVlcnlGb3JtYXQ7IGh0bWxUYXJnZXQ6IHN0cmluZzsgfSB7XHJcbiAgICBsZXQgcXVlcnlGb3JtYXQgPSBRdWVyeUZvcm1hdC5HTUwyO1xyXG4gICAgbGV0IGh0bWxUYXJnZXQ7XHJcbiAgICBjb25zdCBmb3JtYXRPcHQgPSAodGhpcy5vcHRpb25zIGFzIElMYXllclNlYXJjaFNvdXJjZU9wdGlvbnMpLnF1ZXJ5Rm9ybWF0O1xyXG4gICAgaWYgKGZvcm1hdE9wdCkge1xyXG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhmb3JtYXRPcHQpKSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBmb3JtYXRPcHRba2V5XTtcclxuICAgICAgICBpZiAodmFsdWUgPT09ICcqJykge1xyXG4gICAgICAgICAgcXVlcnlGb3JtYXQgPSBRdWVyeUZvcm1hdFtrZXkudG9VcHBlckNhc2UoKV07XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVybHMgPSAodmFsdWUgYXMgYW55IGFzIHt1cmxzOiBzdHJpbmdbXX0pLnVybHM7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodXJscykpIHtcclxuICAgICAgICAgIHVybHMuZm9yRWFjaCgodXJsT3B0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh1cmwuaW5kZXhPZih1cmxPcHQpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgIHF1ZXJ5Rm9ybWF0ID0gUXVlcnlGb3JtYXRba2V5LnRvVXBwZXJDYXNlKCldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChxdWVyeUZvcm1hdCA9PT0gUXVlcnlGb3JtYXQuSFRNTCkge1xyXG4gICAgICBodG1sVGFyZ2V0ID0gJ2lmcmFtZSc7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZm9ybWF0OiBxdWVyeUZvcm1hdCxcclxuICAgICAgaHRtbFRhcmdldFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19