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
            title: 'igo.geo.search.ilayer.name',
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
                id: [this.getId(), data.properties.id].join('.'),
                title: data.properties.title,
                titleHtml: data.highlight.title,
                icon: data.properties.type === 'Layer' ? 'layers' : 'map'
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
                    layers: data.properties.name
                }
            },
            title: data.properties.title,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zaGFyZWQvc291cmNlcy9pbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTlELE9BQU8sRUFBYyxlQUFlLEVBQUcsTUFBTSxNQUFNLENBQUM7QUFDcEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFN0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLE9BQU8sRUFBOEIsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJekUsT0FBTyxFQUFFLFlBQVksRUFBYyxNQUFNLFVBQVUsQ0FBQztBQUlwRDtJQUVFLHFDQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFBRyxDQUFDOzs7OztJQUV4RCxrREFBWTs7OztJQUFaLFVBQWEsSUFBZ0I7UUFBN0IsaUJBcUJDOztZQXBCTyxVQUFVLEdBQUcsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUM7O1lBRS9ELFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDN0MsTUFBTTs7OztRQUFDLFVBQUMsRUFBSztnQkFBTCwwQkFBSyxFQUFKLFdBQUc7WUFBTSxPQUFBLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQTlCLENBQThCLEVBQUM7YUFDakQsTUFBTTs7Ozs7UUFBQyxVQUFDLEdBQXlCLEVBQUUsT0FBc0I7WUFDbEQsSUFB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QUFDLENBQUM7eUJBQzlDO29CQUNILENBQUMsRUFBQyxDQUFDOztpQkFFSjs7O2dCQWZILEtBQWtCLElBQUEsS0FBQSxpQkFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBLGdCQUFBO29CQUFuQyxJQUFNLEdBQUcsV0FBQTswQ0FBSCxHQUFHOzs7aUJBZ0JiOzs7Ozs7Ozs7U0FDRjtRQUVELElBQUksV0FBVyxLQUFLLFdBQVcsQ0FBQyxJQUFJLEVBQUU7WUFDcEMsZUFBZSxHQUFHLFFBQVEsQ0FBQztTQUM1QjtRQUVELE9BQU87WUFDTCxXQUFXLGFBQUE7WUFDWCxlQUFlLGlCQUFBO1NBQ2hCLENBQUM7SUFDSixDQUFDO0lBaklNLHFCQUFFLEdBQUcsUUFBUSxDQUFDO0lBQ2QsdUJBQUksR0FBRyxLQUFLLENBQUM7O2dCQUpyQixVQUFVOzs7O2dCQS9DRixVQUFVO2dCQUtWLGVBQWU7Z0RBeURuQixNQUFNLFNBQUMsU0FBUztnQkFFRSwyQkFBMkIsdUJBRDdDLE1BQU0sU0FBQywyQkFBMkI7O0lBcUh2Qyx5QkFBQztDQUFBLEFBcklELENBQ3dDLFlBQVksR0FvSW5EO1NBcElZLGtCQUFrQjs7O0lBRTdCLHNCQUFxQjs7SUFDckIsd0JBQW9COztJQUVwQixvQ0FBa0U7Ozs7O0lBT2hFLGtDQUF3Qjs7Ozs7SUFDeEIsNkNBQXdDOzs7OztJQUV4Qyx1Q0FDOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCAgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBMQVlFUiB9IGZyb20gJy4uLy4uLy4uL2xheWVyJztcclxuaW1wb3J0IHsgUXVlcnlhYmxlRGF0YVNvdXJjZU9wdGlvbnMsIFF1ZXJ5Rm9ybWF0IH0gZnJvbSAnLi4vLi4vLi4vcXVlcnknO1xyXG5pbXBvcnQgeyBRdWVyeUh0bWxUYXJnZXQgfSBmcm9tICcuLy4uLy4uLy4uL3F1ZXJ5L3NoYXJlZC9xdWVyeS5lbnVtcyc7XHJcblxyXG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQgfSBmcm9tICcuLi9zZWFyY2guaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZSwgVGV4dFNlYXJjaCB9IGZyb20gJy4vc291cmNlJztcclxuaW1wb3J0IHsgVGV4dFNlYXJjaE9wdGlvbnMgfSBmcm9tICcuL3NvdXJjZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgSUxheWVyU2VhcmNoU291cmNlT3B0aW9ucywgSUxheWVyRGF0YSwgSUxheWVySXRlbVJlc3BvbnNlLCBJTGF5ZXJTZXJ2aWNlUmVzcG9uc2UsIElMYXllckRhdGFTb3VyY2UgfSBmcm9tICcuL2lsYXllci5pbnRlcmZhY2VzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIElMYXllclNlYXJjaFJlc3VsdEZvcm1hdHRlciB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSkge31cclxuXHJcbiAgZm9ybWF0UmVzdWx0KGRhdGE6IElMYXllckRhdGEpOiBJTGF5ZXJEYXRhIHtcclxuICAgIGNvbnN0IGFsbG93ZWRLZXkgPSBbJ3RpdGxlJywgJ2Fic3RyYWN0JywgJ2dyb3VwVGl0bGUnLCAnbWV0YWRhdGFVcmwnXTtcclxuXHJcbiAgICBjb25zdCBwcm9wZXJ0eSA9IE9iamVjdC5lbnRyaWVzKGRhdGEucHJvcGVydGllcylcclxuICAgICAgLmZpbHRlcigoW2tleV0pID0+IGFsbG93ZWRLZXkuaW5kZXhPZihrZXkpICE9PSAtMSlcclxuICAgICAgLnJlZHVjZSgob3V0OiB7W2tleTogc3RyaW5nXTogYW55fSwgZW50cmllczogW3N0cmluZywgYW55XSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IGVudHJpZXM7XHJcbiAgICAgICAgbGV0IG5ld0tleTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgbmV3S2V5ID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uc2VhcmNoLmlsYXllci5wcm9wZXJ0aWVzLicgKyBrZXkpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgIG5ld0tleSA9IGtleTtcclxuICAgICAgICB9XHJcbiAgICAgICAgb3V0W25ld0tleV0gPSB2YWx1ZSA/IHZhbHVlIDogJyc7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgICAgfSwge30pO1xyXG5cclxuICAgIGNvbnN0IGRhdGFSID0gT2JqZWN0LmFzc2lnbih7fSwgZGF0YSk7XHJcbiAgICBkYXRhUi5wcm9wZXJ0aWVzID0gcHJvcGVydHkgYXMgSUxheWVyRGF0YVNvdXJjZTtcclxuXHJcbiAgICByZXR1cm4gZGF0YVI7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogSUxheWVyIHNlYXJjaCBzb3VyY2VcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIElMYXllclNlYXJjaFNvdXJjZSBleHRlbmRzIFNlYXJjaFNvdXJjZSBpbXBsZW1lbnRzIFRleHRTZWFyY2gge1xyXG5cclxuICBzdGF0aWMgaWQgPSAnaWxheWVyJztcclxuICBzdGF0aWMgdHlwZSA9IExBWUVSO1xyXG5cclxuICB0aXRsZSQ6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcclxuXHJcbiAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy50aXRsZSQuZ2V0VmFsdWUoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcclxuICAgIEBJbmplY3QoJ29wdGlvbnMnKSBvcHRpb25zOiBJTGF5ZXJTZWFyY2hTb3VyY2VPcHRpb25zLFxyXG4gICAgQEluamVjdChJTGF5ZXJTZWFyY2hSZXN1bHRGb3JtYXR0ZXIpXHJcbiAgICBwcml2YXRlIGZvcm1hdHRlcjogSUxheWVyU2VhcmNoUmVzdWx0Rm9ybWF0dGVyXHJcbiAgKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5nZXQodGhpcy5vcHRpb25zLnRpdGxlKS5zdWJzY3JpYmUodGl0bGUgPT4gdGhpcy50aXRsZSQubmV4dCh0aXRsZSkpO1xyXG4gIH1cclxuXHJcbiAgZ2V0SWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBJTGF5ZXJTZWFyY2hTb3VyY2UuaWQ7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0RGVmYXVsdE9wdGlvbnMoKTogSUxheWVyU2VhcmNoU291cmNlT3B0aW9ucyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLmlsYXllci5uYW1lJyxcclxuICAgICAgc2VhcmNoVXJsOiAnaHR0cHM6Ly9nZW9lZ2wubXNwLmdvdXYucWMuY2EvYXBpcy9sYXllcnMvc2VhcmNoJ1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBhIGxheWVyIGJ5IG5hbWUgb3Iga2V5d29yZFxyXG4gICAqIEBwYXJhbSB0ZXJtIExheWVyIG5hbWUgb3Iga2V5d29yZFxyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgPFNlYXJjaFJlc3VsdDxMYXllck9wdGlvbnM+W11cclxuICAgKi9cclxuICBzZWFyY2goXHJcbiAgICB0ZXJtOiBzdHJpbmcgfCB1bmRlZmluZWQsXHJcbiAgICBvcHRpb25zPzogVGV4dFNlYXJjaE9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFNlYXJjaFJlc3VsdDxJTGF5ZXJJdGVtUmVzcG9uc2U+W10+IHtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuY29tcHV0ZVNlYXJjaFJlcXVlc3RQYXJhbXModGVybSwgb3B0aW9ucyB8fCB7fSk7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5nZXQodGhpcy5zZWFyY2hVcmwsIHsgcGFyYW1zIH0pXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcCgocmVzcG9uc2U6IElMYXllclNlcnZpY2VSZXNwb25zZSkgPT4gdGhpcy5leHRyYWN0UmVzdWx0cyhyZXNwb25zZSkpXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVTZWFyY2hSZXF1ZXN0UGFyYW1zKHRlcm06IHN0cmluZywgb3B0aW9uczogVGV4dFNlYXJjaE9wdGlvbnMpOiBIdHRwUGFyYW1zIHtcclxuICAgIHJldHVybiBuZXcgSHR0cFBhcmFtcyh7XHJcbiAgICAgIGZyb21PYmplY3Q6IE9iamVjdC5hc3NpZ24oe1xyXG4gICAgICAgIHE6IHRlcm1cclxuICAgICAgfSwgdGhpcy5wYXJhbXMsIG9wdGlvbnMucGFyYW1zIHx8IHt9KVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RSZXN1bHRzKHJlc3BvbnNlOiBJTGF5ZXJTZXJ2aWNlUmVzcG9uc2UpOiBTZWFyY2hSZXN1bHQ8SUxheWVySXRlbVJlc3BvbnNlPltdIHtcclxuICAgIHJldHVybiByZXNwb25zZS5pdGVtcy5tYXAoKGRhdGE6IElMYXllckRhdGEpID0+IHRoaXMuZGF0YVRvUmVzdWx0KGRhdGEpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGF0YVRvUmVzdWx0KGRhdGE6IElMYXllckRhdGEpOiBTZWFyY2hSZXN1bHQ8SUxheWVySXRlbVJlc3BvbnNlPiB7XHJcbiAgICBjb25zdCBsYXllck9wdGlvbnMgPSB0aGlzLmNvbXB1dGVMYXllck9wdGlvbnMoZGF0YSk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc291cmNlOiB0aGlzLFxyXG4gICAgICBtZXRhOiB7XHJcbiAgICAgICAgZGF0YVR5cGU6IExBWUVSLFxyXG4gICAgICAgIGlkOiBbdGhpcy5nZXRJZCgpLCBkYXRhLnByb3BlcnRpZXMuaWRdLmpvaW4oJy4nKSxcclxuICAgICAgICB0aXRsZTogZGF0YS5wcm9wZXJ0aWVzLnRpdGxlLFxyXG4gICAgICAgIHRpdGxlSHRtbDogZGF0YS5oaWdobGlnaHQudGl0bGUsXHJcbiAgICAgICAgaWNvbjogZGF0YS5wcm9wZXJ0aWVzLnR5cGUgPT09ICdMYXllcicgPyAnbGF5ZXJzJyA6ICdtYXAnXHJcbiAgICAgIH0sXHJcbiAgICAgIGRhdGE6IGxheWVyT3B0aW9uc1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZUxheWVyT3B0aW9ucyhkYXRhOiBJTGF5ZXJEYXRhKTogSUxheWVySXRlbVJlc3BvbnNlIHtcclxuICAgIGNvbnN0IHVybCA9IGRhdGEucHJvcGVydGllcy51cmw7XHJcbiAgICBjb25zdCBxdWVyeVBhcmFtczogUXVlcnlhYmxlRGF0YVNvdXJjZU9wdGlvbnMgPSB0aGlzLmV4dHJhY3RRdWVyeVBhcmFtc0Zyb21Tb3VyY2VVcmwodXJsKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNvdXJjZU9wdGlvbnM6IHtcclxuICAgICAgICBpZDogZGF0YS5wcm9wZXJ0aWVzLmlkLFxyXG4gICAgICAgIGNyb3NzT3JpZ2luOiAnYW5vbnltb3VzJyxcclxuICAgICAgICB0eXBlOiBkYXRhLnByb3BlcnRpZXMuZm9ybWF0LFxyXG4gICAgICAgIHVybCxcclxuICAgICAgICBxdWVyeUZvcm1hdDogcXVlcnlQYXJhbXMucXVlcnlGb3JtYXQsXHJcbiAgICAgICAgcXVlcnlIdG1sVGFyZ2V0OiBxdWVyeVBhcmFtcy5xdWVyeUh0bWxUYXJnZXQsXHJcbiAgICAgICAgcXVlcnlhYmxlOiBkYXRhLnByb3BlcnRpZXMucXVlcnlhYmxlLFxyXG4gICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgbGF5ZXJzOiBkYXRhLnByb3BlcnRpZXMubmFtZVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgdGl0bGU6IGRhdGEucHJvcGVydGllcy50aXRsZSxcclxuICAgICAgcHJvcGVydGllczogdGhpcy5mb3JtYXR0ZXIuZm9ybWF0UmVzdWx0KGRhdGEpLnByb3BlcnRpZXNcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RRdWVyeVBhcmFtc0Zyb21Tb3VyY2VVcmwodXJsOiBzdHJpbmcpOiB7cXVlcnlGb3JtYXQ6IFF1ZXJ5Rm9ybWF0OyBxdWVyeUh0bWxUYXJnZXQ6IFF1ZXJ5SHRtbFRhcmdldDsgfSB7XHJcbiAgICBsZXQgcXVlcnlGb3JtYXQgPSBRdWVyeUZvcm1hdC5HTUwyO1xyXG4gICAgbGV0IHF1ZXJ5SHRtbFRhcmdldDtcclxuICAgIGNvbnN0IGZvcm1hdE9wdCA9ICh0aGlzLm9wdGlvbnMgYXMgSUxheWVyU2VhcmNoU291cmNlT3B0aW9ucykucXVlcnlGb3JtYXQ7XHJcbiAgICBpZiAoZm9ybWF0T3B0KSB7XHJcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGZvcm1hdE9wdCkpIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IGZvcm1hdE9wdFtrZXldO1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gJyonKSB7XHJcbiAgICAgICAgICBxdWVyeUZvcm1hdCA9IFF1ZXJ5Rm9ybWF0W2tleS50b1VwcGVyQ2FzZSgpXTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdXJscyA9ICh2YWx1ZSBhcyBhbnkgYXMge3VybHM6IHN0cmluZ1tdfSkudXJscztcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh1cmxzKSkge1xyXG4gICAgICAgICAgdXJscy5mb3JFYWNoKCh1cmxPcHQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHVybC5pbmRleE9mKHVybE9wdCkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgcXVlcnlGb3JtYXQgPSBRdWVyeUZvcm1hdFtrZXkudG9VcHBlckNhc2UoKV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHF1ZXJ5Rm9ybWF0ID09PSBRdWVyeUZvcm1hdC5IVE1MKSB7XHJcbiAgICAgIHF1ZXJ5SHRtbFRhcmdldCA9ICdpZnJhbWUnO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHF1ZXJ5Rm9ybWF0LFxyXG4gICAgICBxdWVyeUh0bWxUYXJnZXRcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==