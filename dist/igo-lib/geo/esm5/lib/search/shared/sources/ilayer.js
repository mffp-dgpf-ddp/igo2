/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var ILayerSearchSource = /** @class */ (function (_super) {
    tslib_1.__extends(ILayerSearchSource, _super);
    function ILayerSearchSource(http, languageService, options) {
        var _this = _super.call(this, options) || this;
        _this.http = http;
        _this.languageService = languageService;
        _this.title$ = new BehaviorSubject('');
        _this.languageService.translate.get(_this.options.title).subscribe((/**
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
     * @protected
     * @return {?}
     */
    ILayerSearchSource.prototype.getDefaultOptions = /**
     * @protected
     * @return {?}
     */
    function () {
        return {
            title: 'igo.geo.search.dataSources.name',
            searchUrl: 'https://geoegl.msp.gouv.qc.ca/apis/layers/search'
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
            fromObject: Object.assign({
                q: term
            }, this.params, options.params || {})
        });
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
        function (data) { return _this.dataToResult(data); }));
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    ILayerSearchSource.prototype.dataToResult = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var layerOptions = this.computeLayerOptions(data);
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
        var url = data.source.url;
        /** @type {?} */
        var queryParams = this.extractQueryParamsFromSourceUrl(url);
        return {
            title: data.source.title,
            sourceOptions: {
                crossOrigin: 'anonymous',
                type: data.source.format,
                url: url,
                queryable: ((/** @type {?} */ (data.source))).queryable,
                queryFormat: queryParams.format,
                queryHtmlTarget: queryParams.htmlTarget,
                params: {
                    layers: data.source.name
                }
            }
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
        var htmlTarget;
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
                var urls = ((/** @type {?} */ ((/** @type {?} */ (value))))).urls;
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
            htmlTarget = 'iframe';
        }
        return {
            format: queryFormat,
            htmlTarget: htmlTarget
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
        { type: undefined, decorators: [{ type: Inject, args: ['options',] }] }
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zaGFyZWQvc291cmNlcy9pbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTlELE9BQU8sRUFBYyxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFN0MsT0FBTyxFQUFFLEtBQUssRUFBaUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RSxPQUFPLEVBQThCLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3pFLE9BQU8sRUFBRSxZQUFZLEVBQWMsTUFBTSxVQUFVLENBQUM7Ozs7QUFPcEQ7SUFDd0MsOENBQVk7SUFXbEQsNEJBQ1UsSUFBZ0IsRUFDaEIsZUFBZ0MsRUFDckIsT0FBa0M7UUFIdkQsWUFLRSxrQkFBTSxPQUFPLENBQUMsU0FFZjtRQU5TLFVBQUksR0FBSixJQUFJLENBQVk7UUFDaEIscUJBQWUsR0FBZixlQUFlLENBQWlCO1FBUjFDLFlBQU0sR0FBNEIsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7UUFZaEUsS0FBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUzs7OztRQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQXZCLENBQXVCLEVBQUMsQ0FBQzs7SUFDckcsQ0FBQztJQVhELHNCQUFJLHFDQUFLOzs7O1FBQVQ7WUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEMsQ0FBQzs7O09BQUE7Ozs7SUFXRCxrQ0FBSzs7O0lBQUw7UUFDRSxPQUFPLGtCQUFrQixDQUFDLEVBQUUsQ0FBQztJQUMvQixDQUFDOzs7OztJQUVTLDhDQUFpQjs7OztJQUEzQjtRQUNFLE9BQU87WUFDTCxLQUFLLEVBQUUsaUNBQWlDO1lBQ3hDLFNBQVMsRUFBRSxrREFBa0Q7U0FDOUQsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gsbUNBQU07Ozs7OztJQUFOLFVBQ0UsSUFBd0IsRUFDeEIsT0FBMkI7UUFGN0IsaUJBVUM7O1lBTk8sTUFBTSxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUNuRSxPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ2IsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLFFBQUEsRUFBRSxDQUFDO2FBQy9CLElBQUksQ0FDSCxHQUFHOzs7O1FBQUMsVUFBQyxRQUF3QixJQUFLLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBN0IsQ0FBNkIsRUFBQyxDQUNqRSxDQUFDO0lBQ04sQ0FBQzs7Ozs7OztJQUVPLHVEQUEwQjs7Ozs7O0lBQWxDLFVBQW1DLElBQVksRUFBRSxPQUEwQjtRQUN6RSxPQUFPLElBQUksVUFBVSxDQUFDO1lBQ3BCLFVBQVUsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUN4QixDQUFDLEVBQUUsSUFBSTthQUNSLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztTQUN0QyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7SUFFTywyQ0FBYzs7Ozs7SUFBdEIsVUFBdUIsUUFBd0I7UUFBL0MsaUJBRUM7UUFEQyxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRzs7OztRQUFDLFVBQUMsSUFBZ0IsSUFBSyxPQUFBLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQXZCLENBQXVCLEVBQUMsQ0FBQztJQUMzRSxDQUFDOzs7Ozs7SUFFTyx5Q0FBWTs7Ozs7SUFBcEIsVUFBcUIsSUFBZ0I7O1lBQzdCLFlBQVksR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDO1FBRW5ELE9BQU87WUFDTCxNQUFNLEVBQUUsSUFBSTtZQUNaLElBQUksRUFBRTtnQkFDSixRQUFRLEVBQUUsS0FBSztnQkFDZixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ3JDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7Z0JBQ3hCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUs7Z0JBQy9CLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSzthQUN0RDtZQUNELElBQUksRUFBRSxZQUFZO1NBQ25CLENBQUM7SUFDSixDQUFDOzs7Ozs7SUFFTyxnREFBbUI7Ozs7O0lBQTNCLFVBQTRCLElBQWdCOztZQUNwQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHOztZQUNyQixXQUFXLEdBQVEsSUFBSSxDQUFDLCtCQUErQixDQUFDLEdBQUcsQ0FBQztRQUNsRSxPQUFPO1lBQ0wsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSztZQUN4QixhQUFhLEVBQUU7Z0JBQ2IsV0FBVyxFQUFFLFdBQVc7Z0JBQ3hCLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07Z0JBQ3hCLEdBQUcsS0FBQTtnQkFDSCxTQUFTLEVBQUUsQ0FBQyxtQkFBQSxJQUFJLENBQUMsTUFBTSxFQUE4QixDQUFDLENBQUMsU0FBUztnQkFDaEUsV0FBVyxFQUFFLFdBQVcsQ0FBQyxNQUFNO2dCQUMvQixlQUFlLEVBQUUsV0FBVyxDQUFDLFVBQVU7Z0JBQ3ZDLE1BQU0sRUFBRTtvQkFDTixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJO2lCQUN6QjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7Ozs7OztJQUVPLDREQUErQjs7Ozs7SUFBdkMsVUFBd0MsR0FBVzs7O1lBQzdDLFdBQVcsR0FBRyxXQUFXLENBQUMsSUFBSTs7WUFDOUIsVUFBVTs7WUFDUixTQUFTLEdBQUcsQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUE2QixDQUFDLENBQUMsV0FBVztRQUN6RSxJQUFJLFNBQVMsRUFBRTtvQ0FDRixHQUFHOztvQkFDTixLQUFLLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQztnQkFDNUIsSUFBSSxLQUFLLEtBQUssR0FBRyxFQUFFO29CQUNqQixXQUFXLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDOztpQkFFOUM7O29CQUVLLElBQUksR0FBRyxDQUFDLG1CQUFBLG1CQUFBLEtBQUssRUFBTyxFQUFvQixDQUFDLENBQUMsSUFBSTtnQkFDcEQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUN2QixJQUFJLENBQUMsT0FBTzs7OztvQkFBQyxVQUFDLE1BQU07d0JBQ2xCLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTs0QkFDOUIsV0FBVyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQzt5QkFDOUM7b0JBQ0gsQ0FBQyxFQUFDLENBQUM7O2lCQUVKOzs7Z0JBZkgsS0FBa0IsSUFBQSxLQUFBLGlCQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUEsZ0JBQUE7b0JBQW5DLElBQU0sR0FBRyxXQUFBOzBDQUFILEdBQUc7OztpQkFnQmI7Ozs7Ozs7OztTQUNGO1FBRUQsSUFBSSxXQUFXLEtBQUssV0FBVyxDQUFDLElBQUksRUFBRTtZQUNwQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1NBQ3ZCO1FBRUQsT0FBTztZQUNMLE1BQU0sRUFBRSxXQUFXO1lBQ25CLFVBQVUsWUFBQTtTQUNYLENBQUM7SUFDSixDQUFDO0lBN0hNLHFCQUFFLEdBQUcsUUFBUSxDQUFDO0lBQ2QsdUJBQUksR0FBRyxLQUFLLENBQUM7O2dCQUpyQixVQUFVOzs7O2dCQWxCRixVQUFVO2dCQUtWLGVBQWU7Z0RBNEJuQixNQUFNLFNBQUMsU0FBUzs7SUFrSHJCLHlCQUFDO0NBQUEsQUFqSUQsQ0FDd0MsWUFBWSxHQWdJbkQ7U0FoSVksa0JBQWtCOzs7SUFFN0Isc0JBQXFCOztJQUNyQix3QkFBb0I7O0lBRXBCLG9DQUFrRTs7Ozs7SUFPaEUsa0NBQXdCOzs7OztJQUN4Qiw2Q0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7IExBWUVSLCBBbnlMYXllck9wdGlvbnMsIExheWVyT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uL2xheWVyJztcclxuaW1wb3J0IHsgUXVlcnlhYmxlRGF0YVNvdXJjZU9wdGlvbnMsIFF1ZXJ5Rm9ybWF0IH0gZnJvbSAnLi4vLi4vLi4vcXVlcnknO1xyXG5cclxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi4vc2VhcmNoLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2UsIFRleHRTZWFyY2ggfSBmcm9tICcuL3NvdXJjZSc7XHJcbmltcG9ydCB7IFRleHRTZWFyY2hPcHRpb25zIH0gZnJvbSAnLi9zb3VyY2UuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IElMYXllclNlYXJjaFNvdXJjZU9wdGlvbnMsIElMYXllckRhdGEsIElMYXllclJlc3BvbnNlIH0gZnJvbSAnLi9pbGF5ZXIuaW50ZXJmYWNlcyc7XHJcblxyXG4vKipcclxuICogSUxheWVyIHNlYXJjaCBzb3VyY2VcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIElMYXllclNlYXJjaFNvdXJjZSBleHRlbmRzIFNlYXJjaFNvdXJjZSBpbXBsZW1lbnRzIFRleHRTZWFyY2gge1xyXG5cclxuICBzdGF0aWMgaWQgPSAnaWxheWVyJztcclxuICBzdGF0aWMgdHlwZSA9IExBWUVSO1xyXG5cclxuICB0aXRsZSQ6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcclxuXHJcbiAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy50aXRsZSQuZ2V0VmFsdWUoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcclxuICAgIEBJbmplY3QoJ29wdGlvbnMnKSBvcHRpb25zOiBJTGF5ZXJTZWFyY2hTb3VyY2VPcHRpb25zXHJcbiAgKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5nZXQodGhpcy5vcHRpb25zLnRpdGxlKS5zdWJzY3JpYmUodGl0bGUgPT4gdGhpcy50aXRsZSQubmV4dCh0aXRsZSkpO1xyXG4gIH1cclxuXHJcbiAgZ2V0SWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBJTGF5ZXJTZWFyY2hTb3VyY2UuaWQ7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0RGVmYXVsdE9wdGlvbnMoKTogSUxheWVyU2VhcmNoU291cmNlT3B0aW9ucyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLmRhdGFTb3VyY2VzLm5hbWUnLFxyXG4gICAgICBzZWFyY2hVcmw6ICdodHRwczovL2dlb2VnbC5tc3AuZ291di5xYy5jYS9hcGlzL2xheWVycy9zZWFyY2gnXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIGEgbGF5ZXIgYnkgbmFtZSBvciBrZXl3b3JkXHJcbiAgICogQHBhcmFtIHRlcm0gTGF5ZXIgbmFtZSBvciBrZXl3b3JkXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiA8U2VhcmNoUmVzdWx0PExheWVyT3B0aW9ucz5bXVxyXG4gICAqL1xyXG4gIHNlYXJjaChcclxuICAgIHRlcm06IHN0cmluZyB8IHVuZGVmaW5lZCxcclxuICAgIG9wdGlvbnM/OiBUZXh0U2VhcmNoT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8U2VhcmNoUmVzdWx0PExheWVyT3B0aW9ucz5bXT4ge1xyXG4gICAgY29uc3QgcGFyYW1zID0gdGhpcy5jb21wdXRlU2VhcmNoUmVxdWVzdFBhcmFtcyh0ZXJtLCBvcHRpb25zIHx8IHt9KTtcclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLmdldCh0aGlzLnNlYXJjaFVybCwgeyBwYXJhbXMgfSlcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChyZXNwb25zZTogSUxheWVyUmVzcG9uc2UpID0+IHRoaXMuZXh0cmFjdFJlc3VsdHMocmVzcG9uc2UpKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlU2VhcmNoUmVxdWVzdFBhcmFtcyh0ZXJtOiBzdHJpbmcsIG9wdGlvbnM6IFRleHRTZWFyY2hPcHRpb25zKTogSHR0cFBhcmFtcyB7XHJcbiAgICByZXR1cm4gbmV3IEh0dHBQYXJhbXMoe1xyXG4gICAgICBmcm9tT2JqZWN0OiBPYmplY3QuYXNzaWduKHtcclxuICAgICAgICBxOiB0ZXJtXHJcbiAgICAgIH0sIHRoaXMucGFyYW1zLCBvcHRpb25zLnBhcmFtcyB8fCB7fSlcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0UmVzdWx0cyhyZXNwb25zZTogSUxheWVyUmVzcG9uc2UpOiBTZWFyY2hSZXN1bHQ8TGF5ZXJPcHRpb25zPltdIHtcclxuICAgIHJldHVybiByZXNwb25zZS5pdGVtcy5tYXAoKGRhdGE6IElMYXllckRhdGEpID0+IHRoaXMuZGF0YVRvUmVzdWx0KGRhdGEpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGF0YVRvUmVzdWx0KGRhdGE6IElMYXllckRhdGEpOiBTZWFyY2hSZXN1bHQ8TGF5ZXJPcHRpb25zPiB7XHJcbiAgICBjb25zdCBsYXllck9wdGlvbnMgPSB0aGlzLmNvbXB1dGVMYXllck9wdGlvbnMoZGF0YSk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc291cmNlOiB0aGlzLFxyXG4gICAgICBtZXRhOiB7XHJcbiAgICAgICAgZGF0YVR5cGU6IExBWUVSLFxyXG4gICAgICAgIGlkOiBbdGhpcy5nZXRJZCgpLCBkYXRhLmlkXS5qb2luKCcuJyksXHJcbiAgICAgICAgdGl0bGU6IGRhdGEuc291cmNlLnRpdGxlLFxyXG4gICAgICAgIHRpdGxlSHRtbDogZGF0YS5oaWdobGlnaHQudGl0bGUsXHJcbiAgICAgICAgaWNvbjogZGF0YS5zb3VyY2UudHlwZSA9PT0gJ0xheWVyJyA/ICdsYXllcnMnIDogJ21hcCdcclxuICAgICAgfSxcclxuICAgICAgZGF0YTogbGF5ZXJPcHRpb25zXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlTGF5ZXJPcHRpb25zKGRhdGE6IElMYXllckRhdGEpOiBBbnlMYXllck9wdGlvbnMge1xyXG4gICAgY29uc3QgdXJsID0gZGF0YS5zb3VyY2UudXJsO1xyXG4gICAgY29uc3QgcXVlcnlQYXJhbXM6IGFueSA9IHRoaXMuZXh0cmFjdFF1ZXJ5UGFyYW1zRnJvbVNvdXJjZVVybCh1cmwpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6IGRhdGEuc291cmNlLnRpdGxlLFxyXG4gICAgICBzb3VyY2VPcHRpb25zOiB7XHJcbiAgICAgICAgY3Jvc3NPcmlnaW46ICdhbm9ueW1vdXMnLFxyXG4gICAgICAgIHR5cGU6IGRhdGEuc291cmNlLmZvcm1hdCxcclxuICAgICAgICB1cmwsXHJcbiAgICAgICAgcXVlcnlhYmxlOiAoZGF0YS5zb3VyY2UgYXMgUXVlcnlhYmxlRGF0YVNvdXJjZU9wdGlvbnMpLnF1ZXJ5YWJsZSxcclxuICAgICAgICBxdWVyeUZvcm1hdDogcXVlcnlQYXJhbXMuZm9ybWF0LFxyXG4gICAgICAgIHF1ZXJ5SHRtbFRhcmdldDogcXVlcnlQYXJhbXMuaHRtbFRhcmdldCxcclxuICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgIGxheWVyczogZGF0YS5zb3VyY2UubmFtZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdFF1ZXJ5UGFyYW1zRnJvbVNvdXJjZVVybCh1cmw6IHN0cmluZyk6IHtmb3JtYXQ6IFF1ZXJ5Rm9ybWF0OyBodG1sVGFyZ2V0OiBzdHJpbmc7IH0ge1xyXG4gICAgbGV0IHF1ZXJ5Rm9ybWF0ID0gUXVlcnlGb3JtYXQuR01MMjtcclxuICAgIGxldCBodG1sVGFyZ2V0O1xyXG4gICAgY29uc3QgZm9ybWF0T3B0ID0gKHRoaXMub3B0aW9ucyBhcyBJTGF5ZXJTZWFyY2hTb3VyY2VPcHRpb25zKS5xdWVyeUZvcm1hdDtcclxuICAgIGlmIChmb3JtYXRPcHQpIHtcclxuICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoZm9ybWF0T3B0KSkge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gZm9ybWF0T3B0W2tleV07XHJcbiAgICAgICAgaWYgKHZhbHVlID09PSAnKicpIHtcclxuICAgICAgICAgIHF1ZXJ5Rm9ybWF0ID0gUXVlcnlGb3JtYXRba2V5LnRvVXBwZXJDYXNlKCldO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1cmxzID0gKHZhbHVlIGFzIGFueSBhcyB7dXJsczogc3RyaW5nW119KS51cmxzO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHVybHMpKSB7XHJcbiAgICAgICAgICB1cmxzLmZvckVhY2goKHVybE9wdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodXJsLmluZGV4T2YodXJsT3B0KSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICBxdWVyeUZvcm1hdCA9IFF1ZXJ5Rm9ybWF0W2tleS50b1VwcGVyQ2FzZSgpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAocXVlcnlGb3JtYXQgPT09IFF1ZXJ5Rm9ybWF0LkhUTUwpIHtcclxuICAgICAgaHRtbFRhcmdldCA9ICdpZnJhbWUnO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGZvcm1hdDogcXVlcnlGb3JtYXQsXHJcbiAgICAgIGh0bWxUYXJnZXRcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==