/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var ILayerSearchSource = /** @class */ (function (_super) {
    tslib_1.__extends(ILayerSearchSource, _super);
    function ILayerSearchSource(http, languageService, options) {
        var _this = _super.call(this, options) || this;
        _this.http = http;
        _this.languageService = languageService;
        return _this;
    }
    Object.defineProperty(ILayerSearchSource.prototype, "title", {
        get: /**
         * @return {?}
         */
        function () {
            return this.languageService.translate.instant(this.options.title);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zaGFyZWQvc291cmNlcy9pbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRzlELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTdDLE9BQU8sRUFBRSxLQUFLLEVBQWlDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEUsT0FBTyxFQUE4QixXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUd6RSxPQUFPLEVBQUUsWUFBWSxFQUFjLE1BQU0sVUFBVSxDQUFDOzs7O0FBT3BEO0lBQ3dDLDhDQUFZO0lBU2xELDRCQUNVLElBQWdCLEVBQ2hCLGVBQWdDLEVBQ3JCLE9BQWtDO1FBSHZELFlBS0Usa0JBQU0sT0FBTyxDQUFDLFNBQ2Y7UUFMUyxVQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLHFCQUFlLEdBQWYsZUFBZSxDQUFpQjs7SUFJMUMsQ0FBQztJQVZELHNCQUFJLHFDQUFLOzs7O1FBQVQ7WUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLENBQUM7OztPQUFBOzs7O0lBVUQsa0NBQUs7OztJQUFMO1FBQ0UsT0FBTyxrQkFBa0IsQ0FBQyxFQUFFLENBQUM7SUFDL0IsQ0FBQzs7Ozs7SUFFUyw4Q0FBaUI7Ozs7SUFBM0I7UUFDRSxPQUFPO1lBQ0wsS0FBSyxFQUFFLGlDQUFpQztZQUN4QyxTQUFTLEVBQUUsa0RBQWtEO1NBQzlELENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNILG1DQUFNOzs7Ozs7SUFBTixVQUNFLElBQXdCLEVBQ3hCLE9BQTJCO1FBRjdCLGlCQVVDOztZQU5PLE1BQU0sR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxFQUFFLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDbkUsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxRQUFBLEVBQUUsQ0FBQzthQUMvQixJQUFJLENBQ0gsR0FBRzs7OztRQUFDLFVBQUMsUUFBd0IsSUFBSyxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQTdCLENBQTZCLEVBQUMsQ0FDakUsQ0FBQztJQUNOLENBQUM7Ozs7Ozs7SUFFTyx1REFBMEI7Ozs7OztJQUFsQyxVQUFtQyxJQUFZLEVBQUUsT0FBMEI7UUFDekUsT0FBTyxJQUFJLFVBQVUsQ0FBQztZQUNwQixVQUFVLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDeEIsQ0FBQyxFQUFFLElBQUk7YUFDUixFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7U0FDdEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBRU8sMkNBQWM7Ozs7O0lBQXRCLFVBQXVCLFFBQXdCO1FBQS9DLGlCQUVDO1FBREMsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUc7Ozs7UUFBQyxVQUFDLElBQWdCLElBQUssT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUF2QixDQUF1QixFQUFDLENBQUM7SUFDM0UsQ0FBQzs7Ozs7O0lBRU8seUNBQVk7Ozs7O0lBQXBCLFVBQXFCLElBQWdCOztZQUM3QixZQUFZLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQztRQUVuRCxPQUFPO1lBQ0wsTUFBTSxFQUFFLElBQUk7WUFDWixJQUFJLEVBQUU7Z0JBQ0osUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUNyQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLO2dCQUN4QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLO2dCQUMvQixJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUs7YUFDdEQ7WUFDRCxJQUFJLEVBQUUsWUFBWTtTQUNuQixDQUFDO0lBQ0osQ0FBQzs7Ozs7O0lBRU8sZ0RBQW1COzs7OztJQUEzQixVQUE0QixJQUFnQjs7WUFDcEMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRzs7WUFDckIsV0FBVyxHQUFRLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxHQUFHLENBQUM7UUFDbEUsT0FBTztZQUNMLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7WUFDeEIsYUFBYSxFQUFFO2dCQUNiLFdBQVcsRUFBRSxXQUFXO2dCQUN4QixJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO2dCQUN4QixHQUFHLEtBQUE7Z0JBQ0gsU0FBUyxFQUFFLENBQUMsbUJBQUEsSUFBSSxDQUFDLE1BQU0sRUFBOEIsQ0FBQyxDQUFDLFNBQVM7Z0JBQ2hFLFdBQVcsRUFBRSxXQUFXLENBQUMsTUFBTTtnQkFDL0IsZUFBZSxFQUFFLFdBQVcsQ0FBQyxVQUFVO2dCQUN2QyxNQUFNLEVBQUU7b0JBQ04sTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSTtpQkFDekI7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOzs7Ozs7SUFFTyw0REFBK0I7Ozs7O0lBQXZDLFVBQXdDLEdBQVc7OztZQUM3QyxXQUFXLEdBQUcsV0FBVyxDQUFDLElBQUk7O1lBQzlCLFVBQVU7O1lBQ1IsU0FBUyxHQUFHLENBQUMsbUJBQUEsSUFBSSxDQUFDLE9BQU8sRUFBNkIsQ0FBQyxDQUFDLFdBQVc7UUFDekUsSUFBSSxTQUFTLEVBQUU7b0NBQ0YsR0FBRzs7b0JBQ04sS0FBSyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUM7Z0JBQzVCLElBQUksS0FBSyxLQUFLLEdBQUcsRUFBRTtvQkFDakIsV0FBVyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQzs7aUJBRTlDOztvQkFFSyxJQUFJLEdBQUcsQ0FBQyxtQkFBQSxtQkFBQSxLQUFLLEVBQU8sRUFBb0IsQ0FBQyxDQUFDLElBQUk7Z0JBQ3BELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDdkIsSUFBSSxDQUFDLE9BQU87Ozs7b0JBQUMsVUFBQyxNQUFNO3dCQUNsQixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7NEJBQzlCLFdBQVcsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7eUJBQzlDO29CQUNILENBQUMsRUFBQyxDQUFDOztpQkFFSjs7O2dCQWZILEtBQWtCLElBQUEsS0FBQSxpQkFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBLGdCQUFBO29CQUFuQyxJQUFNLEdBQUcsV0FBQTswQ0FBSCxHQUFHOzs7aUJBZ0JiOzs7Ozs7Ozs7U0FDRjtRQUVELElBQUksV0FBVyxLQUFLLFdBQVcsQ0FBQyxJQUFJLEVBQUU7WUFDcEMsVUFBVSxHQUFHLFFBQVEsQ0FBQztTQUN2QjtRQUVELE9BQU87WUFDTCxNQUFNLEVBQUUsV0FBVztZQUNuQixVQUFVLFlBQUE7U0FDWCxDQUFDO0lBQ0osQ0FBQztJQTFITSxxQkFBRSxHQUFHLFFBQVEsQ0FBQztJQUNkLHVCQUFJLEdBQUcsS0FBSyxDQUFDOztnQkFKckIsVUFBVTs7OztnQkFsQkYsVUFBVTtnQkFLVixlQUFlO2dEQTBCbkIsTUFBTSxTQUFDLFNBQVM7O0lBaUhyQix5QkFBQztDQUFBLEFBOUhELENBQ3dDLFlBQVksR0E2SG5EO1NBN0hZLGtCQUFrQjs7O0lBRTdCLHNCQUFxQjs7SUFDckIsd0JBQW9COzs7OztJQU9sQixrQ0FBd0I7Ozs7O0lBQ3hCLDZDQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7IExBWUVSLCBBbnlMYXllck9wdGlvbnMsIExheWVyT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uL2xheWVyJztcclxuaW1wb3J0IHsgUXVlcnlhYmxlRGF0YVNvdXJjZU9wdGlvbnMsIFF1ZXJ5Rm9ybWF0IH0gZnJvbSAnLi4vLi4vLi4vcXVlcnknO1xyXG5cclxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi4vc2VhcmNoLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2UsIFRleHRTZWFyY2ggfSBmcm9tICcuL3NvdXJjZSc7XHJcbmltcG9ydCB7IFRleHRTZWFyY2hPcHRpb25zIH0gZnJvbSAnLi9zb3VyY2UuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IElMYXllclNlYXJjaFNvdXJjZU9wdGlvbnMsIElMYXllckRhdGEsIElMYXllclJlc3BvbnNlIH0gZnJvbSAnLi9pbGF5ZXIuaW50ZXJmYWNlcyc7XHJcblxyXG4vKipcclxuICogSUxheWVyIHNlYXJjaCBzb3VyY2VcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIElMYXllclNlYXJjaFNvdXJjZSBleHRlbmRzIFNlYXJjaFNvdXJjZSBpbXBsZW1lbnRzIFRleHRTZWFyY2gge1xyXG5cclxuICBzdGF0aWMgaWQgPSAnaWxheWVyJztcclxuICBzdGF0aWMgdHlwZSA9IExBWUVSO1xyXG5cclxuICBnZXQgdGl0bGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudCh0aGlzLm9wdGlvbnMudGl0bGUpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICBwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgQEluamVjdCgnb3B0aW9ucycpIG9wdGlvbnM6IElMYXllclNlYXJjaFNvdXJjZU9wdGlvbnNcclxuICApIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0SWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBJTGF5ZXJTZWFyY2hTb3VyY2UuaWQ7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0RGVmYXVsdE9wdGlvbnMoKTogSUxheWVyU2VhcmNoU291cmNlT3B0aW9ucyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLmRhdGFTb3VyY2VzLm5hbWUnLFxyXG4gICAgICBzZWFyY2hVcmw6ICdodHRwczovL2dlb2VnbC5tc3AuZ291di5xYy5jYS9hcGlzL2xheWVycy9zZWFyY2gnXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIGEgbGF5ZXIgYnkgbmFtZSBvciBrZXl3b3JkXHJcbiAgICogQHBhcmFtIHRlcm0gTGF5ZXIgbmFtZSBvciBrZXl3b3JkXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiA8U2VhcmNoUmVzdWx0PExheWVyT3B0aW9ucz5bXVxyXG4gICAqL1xyXG4gIHNlYXJjaChcclxuICAgIHRlcm06IHN0cmluZyB8IHVuZGVmaW5lZCxcclxuICAgIG9wdGlvbnM/OiBUZXh0U2VhcmNoT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8U2VhcmNoUmVzdWx0PExheWVyT3B0aW9ucz5bXT4ge1xyXG4gICAgY29uc3QgcGFyYW1zID0gdGhpcy5jb21wdXRlU2VhcmNoUmVxdWVzdFBhcmFtcyh0ZXJtLCBvcHRpb25zIHx8IHt9KTtcclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLmdldCh0aGlzLnNlYXJjaFVybCwgeyBwYXJhbXMgfSlcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChyZXNwb25zZTogSUxheWVyUmVzcG9uc2UpID0+IHRoaXMuZXh0cmFjdFJlc3VsdHMocmVzcG9uc2UpKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlU2VhcmNoUmVxdWVzdFBhcmFtcyh0ZXJtOiBzdHJpbmcsIG9wdGlvbnM6IFRleHRTZWFyY2hPcHRpb25zKTogSHR0cFBhcmFtcyB7XHJcbiAgICByZXR1cm4gbmV3IEh0dHBQYXJhbXMoe1xyXG4gICAgICBmcm9tT2JqZWN0OiBPYmplY3QuYXNzaWduKHtcclxuICAgICAgICBxOiB0ZXJtXHJcbiAgICAgIH0sIHRoaXMucGFyYW1zLCBvcHRpb25zLnBhcmFtcyB8fCB7fSlcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0UmVzdWx0cyhyZXNwb25zZTogSUxheWVyUmVzcG9uc2UpOiBTZWFyY2hSZXN1bHQ8TGF5ZXJPcHRpb25zPltdIHtcclxuICAgIHJldHVybiByZXNwb25zZS5pdGVtcy5tYXAoKGRhdGE6IElMYXllckRhdGEpID0+IHRoaXMuZGF0YVRvUmVzdWx0KGRhdGEpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGF0YVRvUmVzdWx0KGRhdGE6IElMYXllckRhdGEpOiBTZWFyY2hSZXN1bHQ8TGF5ZXJPcHRpb25zPiB7XHJcbiAgICBjb25zdCBsYXllck9wdGlvbnMgPSB0aGlzLmNvbXB1dGVMYXllck9wdGlvbnMoZGF0YSk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc291cmNlOiB0aGlzLFxyXG4gICAgICBtZXRhOiB7XHJcbiAgICAgICAgZGF0YVR5cGU6IExBWUVSLFxyXG4gICAgICAgIGlkOiBbdGhpcy5nZXRJZCgpLCBkYXRhLmlkXS5qb2luKCcuJyksXHJcbiAgICAgICAgdGl0bGU6IGRhdGEuc291cmNlLnRpdGxlLFxyXG4gICAgICAgIHRpdGxlSHRtbDogZGF0YS5oaWdobGlnaHQudGl0bGUsXHJcbiAgICAgICAgaWNvbjogZGF0YS5zb3VyY2UudHlwZSA9PT0gJ0xheWVyJyA/ICdsYXllcnMnIDogJ21hcCdcclxuICAgICAgfSxcclxuICAgICAgZGF0YTogbGF5ZXJPcHRpb25zXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlTGF5ZXJPcHRpb25zKGRhdGE6IElMYXllckRhdGEpOiBBbnlMYXllck9wdGlvbnMge1xyXG4gICAgY29uc3QgdXJsID0gZGF0YS5zb3VyY2UudXJsO1xyXG4gICAgY29uc3QgcXVlcnlQYXJhbXM6IGFueSA9IHRoaXMuZXh0cmFjdFF1ZXJ5UGFyYW1zRnJvbVNvdXJjZVVybCh1cmwpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6IGRhdGEuc291cmNlLnRpdGxlLFxyXG4gICAgICBzb3VyY2VPcHRpb25zOiB7XHJcbiAgICAgICAgY3Jvc3NPcmlnaW46ICdhbm9ueW1vdXMnLFxyXG4gICAgICAgIHR5cGU6IGRhdGEuc291cmNlLmZvcm1hdCxcclxuICAgICAgICB1cmwsXHJcbiAgICAgICAgcXVlcnlhYmxlOiAoZGF0YS5zb3VyY2UgYXMgUXVlcnlhYmxlRGF0YVNvdXJjZU9wdGlvbnMpLnF1ZXJ5YWJsZSxcclxuICAgICAgICBxdWVyeUZvcm1hdDogcXVlcnlQYXJhbXMuZm9ybWF0LFxyXG4gICAgICAgIHF1ZXJ5SHRtbFRhcmdldDogcXVlcnlQYXJhbXMuaHRtbFRhcmdldCxcclxuICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgIGxheWVyczogZGF0YS5zb3VyY2UubmFtZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdFF1ZXJ5UGFyYW1zRnJvbVNvdXJjZVVybCh1cmw6IHN0cmluZyk6IHtmb3JtYXQ6IFF1ZXJ5Rm9ybWF0OyBodG1sVGFyZ2V0OiBzdHJpbmc7IH0ge1xyXG4gICAgbGV0IHF1ZXJ5Rm9ybWF0ID0gUXVlcnlGb3JtYXQuR01MMjtcclxuICAgIGxldCBodG1sVGFyZ2V0O1xyXG4gICAgY29uc3QgZm9ybWF0T3B0ID0gKHRoaXMub3B0aW9ucyBhcyBJTGF5ZXJTZWFyY2hTb3VyY2VPcHRpb25zKS5xdWVyeUZvcm1hdDtcclxuICAgIGlmIChmb3JtYXRPcHQpIHtcclxuICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoZm9ybWF0T3B0KSkge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gZm9ybWF0T3B0W2tleV07XHJcbiAgICAgICAgaWYgKHZhbHVlID09PSAnKicpIHtcclxuICAgICAgICAgIHF1ZXJ5Rm9ybWF0ID0gUXVlcnlGb3JtYXRba2V5LnRvVXBwZXJDYXNlKCldO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1cmxzID0gKHZhbHVlIGFzIGFueSBhcyB7dXJsczogc3RyaW5nW119KS51cmxzO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHVybHMpKSB7XHJcbiAgICAgICAgICB1cmxzLmZvckVhY2goKHVybE9wdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodXJsLmluZGV4T2YodXJsT3B0KSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICBxdWVyeUZvcm1hdCA9IFF1ZXJ5Rm9ybWF0W2tleS50b1VwcGVyQ2FzZSgpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAocXVlcnlGb3JtYXQgPT09IFF1ZXJ5Rm9ybWF0LkhUTUwpIHtcclxuICAgICAgaHRtbFRhcmdldCA9ICdpZnJhbWUnO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGZvcm1hdDogcXVlcnlGb3JtYXQsXHJcbiAgICAgIGh0bWxUYXJnZXRcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==