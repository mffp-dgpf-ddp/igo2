/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
    }
    /**
     * @return {?}
     */
    get title() {
        return this.languageService.translate.instant(this.options.title);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zaGFyZWQvc291cmNlcy9pbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFHOUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFN0MsT0FBTyxFQUFFLEtBQUssRUFBaUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RSxPQUFPLEVBQThCLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3pFLE9BQU8sRUFBRSxZQUFZLEVBQWMsTUFBTSxVQUFVLENBQUM7Ozs7QUFRcEQsTUFBTSxPQUFPLGtCQUFtQixTQUFRLFlBQVk7Ozs7OztJQVNsRCxZQUNVLElBQWdCLEVBQ2hCLGVBQWdDLEVBQ3JCLE9BQWtDO1FBRXJELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUpQLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO0lBSTFDLENBQUM7Ozs7SUFWRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BFLENBQUM7Ozs7SUFVRCxLQUFLO1FBQ0gsT0FBTyxrQkFBa0IsQ0FBQyxFQUFFLENBQUM7SUFDL0IsQ0FBQzs7Ozs7SUFFUyxpQkFBaUI7UUFDekIsT0FBTztZQUNMLEtBQUssRUFBRSxpQ0FBaUM7WUFDeEMsU0FBUyxFQUFFLGtEQUFrRDtTQUM5RCxDQUFDO0lBQ0osQ0FBQzs7Ozs7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OztzQkFDbEMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUM7Z0JBQzVCLElBQUksS0FBSyxLQUFLLEdBQUcsRUFBRTtvQkFDakIsV0FBVyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztvQkFDN0MsTUFBTTtpQkFDUDs7c0JBRUssSUFBSSxHQUFHLENBQUMsbUJBQUEsbUJBQUEsS0FBSyxFQUFPLEVBQW9CLENBQUMsQ0FBQyxJQUFJO2dCQUNwRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ3ZCLElBQUksQ0FBQyxPQUFPOzs7O29CQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7d0JBQ3RCLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTs0QkFDOUIsV0FBVyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQzt5QkFDOUM7b0JBQ0gsQ0FBQyxFQUFDLENBQUM7b0JBQ0gsTUFBTTtpQkFDUDthQUNGO1NBQ0Y7UUFFRCxJQUFJLFdBQVcsS0FBSyxXQUFXLENBQUMsSUFBSSxFQUFFO1lBQ3BDLFVBQVUsR0FBRyxRQUFRLENBQUM7U0FDdkI7UUFFRCxPQUFPO1lBQ0wsTUFBTSxFQUFFLFdBQVc7WUFDbkIsVUFBVTtTQUNYLENBQUM7SUFDSixDQUFDOztBQTFITSxxQkFBRSxHQUFHLFFBQVEsQ0FBQztBQUNkLHVCQUFJLEdBQUcsS0FBSyxDQUFDOztZQUpyQixVQUFVOzs7O1lBbEJGLFVBQVU7WUFLVixlQUFlOzRDQTBCbkIsTUFBTSxTQUFDLFNBQVM7Ozs7SUFWbkIsc0JBQXFCOztJQUNyQix3QkFBb0I7Ozs7O0lBT2xCLGtDQUF3Qjs7Ozs7SUFDeEIsNkNBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IExhbmd1YWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTEFZRVIsIEFueUxheWVyT3B0aW9ucywgTGF5ZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vbGF5ZXInO1xyXG5pbXBvcnQgeyBRdWVyeWFibGVEYXRhU291cmNlT3B0aW9ucywgUXVlcnlGb3JtYXQgfSBmcm9tICcuLi8uLi8uLi9xdWVyeSc7XHJcblxyXG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQgfSBmcm9tICcuLi9zZWFyY2guaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZSwgVGV4dFNlYXJjaCB9IGZyb20gJy4vc291cmNlJztcclxuaW1wb3J0IHsgVGV4dFNlYXJjaE9wdGlvbnMgfSBmcm9tICcuL3NvdXJjZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgSUxheWVyU2VhcmNoU291cmNlT3B0aW9ucywgSUxheWVyRGF0YSwgSUxheWVyUmVzcG9uc2UgfSBmcm9tICcuL2lsYXllci5pbnRlcmZhY2VzJztcclxuXHJcbi8qKlxyXG4gKiBJTGF5ZXIgc2VhcmNoIHNvdXJjZVxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSUxheWVyU2VhcmNoU291cmNlIGV4dGVuZHMgU2VhcmNoU291cmNlIGltcGxlbWVudHMgVGV4dFNlYXJjaCB7XHJcblxyXG4gIHN0YXRpYyBpZCA9ICdpbGF5ZXInO1xyXG4gIHN0YXRpYyB0eXBlID0gTEFZRVI7XHJcblxyXG4gIGdldCB0aXRsZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KHRoaXMub3B0aW9ucy50aXRsZSk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBASW5qZWN0KCdvcHRpb25zJykgb3B0aW9uczogSUxheWVyU2VhcmNoU291cmNlT3B0aW9uc1xyXG4gICkge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBnZXRJZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIElMYXllclNlYXJjaFNvdXJjZS5pZDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXREZWZhdWx0T3B0aW9ucygpOiBJTGF5ZXJTZWFyY2hTb3VyY2VPcHRpb25zIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiAnaWdvLmdlby5zZWFyY2guZGF0YVNvdXJjZXMubmFtZScsXHJcbiAgICAgIHNlYXJjaFVybDogJ2h0dHBzOi8vZ2VvZWdsLm1zcC5nb3V2LnFjLmNhL2FwaXMvbGF5ZXJzL3NlYXJjaCdcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggYSBsYXllciBieSBuYW1lIG9yIGtleXdvcmRcclxuICAgKiBAcGFyYW0gdGVybSBMYXllciBuYW1lIG9yIGtleXdvcmRcclxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIDxTZWFyY2hSZXN1bHQ8TGF5ZXJPcHRpb25zPltdXHJcbiAgICovXHJcbiAgc2VhcmNoKFxyXG4gICAgdGVybTogc3RyaW5nIHwgdW5kZWZpbmVkLFxyXG4gICAgb3B0aW9ucz86IFRleHRTZWFyY2hPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxTZWFyY2hSZXN1bHQ8TGF5ZXJPcHRpb25zPltdPiB7XHJcbiAgICBjb25zdCBwYXJhbXMgPSB0aGlzLmNvbXB1dGVTZWFyY2hSZXF1ZXN0UGFyYW1zKHRlcm0sIG9wdGlvbnMgfHwge30pO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuZ2V0KHRoaXMuc2VhcmNoVXJsLCB7IHBhcmFtcyB9KVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoKHJlc3BvbnNlOiBJTGF5ZXJSZXNwb25zZSkgPT4gdGhpcy5leHRyYWN0UmVzdWx0cyhyZXNwb25zZSkpXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVTZWFyY2hSZXF1ZXN0UGFyYW1zKHRlcm06IHN0cmluZywgb3B0aW9uczogVGV4dFNlYXJjaE9wdGlvbnMpOiBIdHRwUGFyYW1zIHtcclxuICAgIHJldHVybiBuZXcgSHR0cFBhcmFtcyh7XHJcbiAgICAgIGZyb21PYmplY3Q6IE9iamVjdC5hc3NpZ24oe1xyXG4gICAgICAgIHE6IHRlcm1cclxuICAgICAgfSwgdGhpcy5wYXJhbXMsIG9wdGlvbnMucGFyYW1zIHx8IHt9KVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RSZXN1bHRzKHJlc3BvbnNlOiBJTGF5ZXJSZXNwb25zZSk6IFNlYXJjaFJlc3VsdDxMYXllck9wdGlvbnM+W10ge1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlLml0ZW1zLm1hcCgoZGF0YTogSUxheWVyRGF0YSkgPT4gdGhpcy5kYXRhVG9SZXN1bHQoZGF0YSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkYXRhVG9SZXN1bHQoZGF0YTogSUxheWVyRGF0YSk6IFNlYXJjaFJlc3VsdDxMYXllck9wdGlvbnM+IHtcclxuICAgIGNvbnN0IGxheWVyT3B0aW9ucyA9IHRoaXMuY29tcHV0ZUxheWVyT3B0aW9ucyhkYXRhKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzb3VyY2U6IHRoaXMsXHJcbiAgICAgIG1ldGE6IHtcclxuICAgICAgICBkYXRhVHlwZTogTEFZRVIsXHJcbiAgICAgICAgaWQ6IFt0aGlzLmdldElkKCksIGRhdGEuaWRdLmpvaW4oJy4nKSxcclxuICAgICAgICB0aXRsZTogZGF0YS5zb3VyY2UudGl0bGUsXHJcbiAgICAgICAgdGl0bGVIdG1sOiBkYXRhLmhpZ2hsaWdodC50aXRsZSxcclxuICAgICAgICBpY29uOiBkYXRhLnNvdXJjZS50eXBlID09PSAnTGF5ZXInID8gJ2xheWVycycgOiAnbWFwJ1xyXG4gICAgICB9LFxyXG4gICAgICBkYXRhOiBsYXllck9wdGlvbnNcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVMYXllck9wdGlvbnMoZGF0YTogSUxheWVyRGF0YSk6IEFueUxheWVyT3B0aW9ucyB7XHJcbiAgICBjb25zdCB1cmwgPSBkYXRhLnNvdXJjZS51cmw7XHJcbiAgICBjb25zdCBxdWVyeVBhcmFtczogYW55ID0gdGhpcy5leHRyYWN0UXVlcnlQYXJhbXNGcm9tU291cmNlVXJsKHVybCk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0aXRsZTogZGF0YS5zb3VyY2UudGl0bGUsXHJcbiAgICAgIHNvdXJjZU9wdGlvbnM6IHtcclxuICAgICAgICBjcm9zc09yaWdpbjogJ2Fub255bW91cycsXHJcbiAgICAgICAgdHlwZTogZGF0YS5zb3VyY2UuZm9ybWF0LFxyXG4gICAgICAgIHVybCxcclxuICAgICAgICBxdWVyeWFibGU6IChkYXRhLnNvdXJjZSBhcyBRdWVyeWFibGVEYXRhU291cmNlT3B0aW9ucykucXVlcnlhYmxlLFxyXG4gICAgICAgIHF1ZXJ5Rm9ybWF0OiBxdWVyeVBhcmFtcy5mb3JtYXQsXHJcbiAgICAgICAgcXVlcnlIdG1sVGFyZ2V0OiBxdWVyeVBhcmFtcy5odG1sVGFyZ2V0LFxyXG4gICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgbGF5ZXJzOiBkYXRhLnNvdXJjZS5uYW1lXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0UXVlcnlQYXJhbXNGcm9tU291cmNlVXJsKHVybDogc3RyaW5nKToge2Zvcm1hdDogUXVlcnlGb3JtYXQ7IGh0bWxUYXJnZXQ6IHN0cmluZzsgfSB7XHJcbiAgICBsZXQgcXVlcnlGb3JtYXQgPSBRdWVyeUZvcm1hdC5HTUwyO1xyXG4gICAgbGV0IGh0bWxUYXJnZXQ7XHJcbiAgICBjb25zdCBmb3JtYXRPcHQgPSAodGhpcy5vcHRpb25zIGFzIElMYXllclNlYXJjaFNvdXJjZU9wdGlvbnMpLnF1ZXJ5Rm9ybWF0O1xyXG4gICAgaWYgKGZvcm1hdE9wdCkge1xyXG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhmb3JtYXRPcHQpKSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBmb3JtYXRPcHRba2V5XTtcclxuICAgICAgICBpZiAodmFsdWUgPT09ICcqJykge1xyXG4gICAgICAgICAgcXVlcnlGb3JtYXQgPSBRdWVyeUZvcm1hdFtrZXkudG9VcHBlckNhc2UoKV07XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVybHMgPSAodmFsdWUgYXMgYW55IGFzIHt1cmxzOiBzdHJpbmdbXX0pLnVybHM7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodXJscykpIHtcclxuICAgICAgICAgIHVybHMuZm9yRWFjaCgodXJsT3B0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh1cmwuaW5kZXhPZih1cmxPcHQpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgIHF1ZXJ5Rm9ybWF0ID0gUXVlcnlGb3JtYXRba2V5LnRvVXBwZXJDYXNlKCldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChxdWVyeUZvcm1hdCA9PT0gUXVlcnlGb3JtYXQuSFRNTCkge1xyXG4gICAgICBodG1sVGFyZ2V0ID0gJ2lmcmFtZSc7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZm9ybWF0OiBxdWVyeUZvcm1hdCxcclxuICAgICAgaHRtbFRhcmdldFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19