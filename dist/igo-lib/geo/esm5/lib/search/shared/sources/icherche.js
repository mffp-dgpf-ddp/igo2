/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LanguageService } from '@igo2/core';
import { ObjectUtils } from '@igo2/utils';
import { FEATURE } from '../../../feature';
import { SearchSource } from './source';
var IChercheSearchResultFormatter = /** @class */ (function () {
    function IChercheSearchResultFormatter(languageService) {
        this.languageService = languageService;
    }
    /**
     * @param {?} result
     * @return {?}
     */
    IChercheSearchResultFormatter.prototype.formatResult = /**
     * @param {?} result
     * @return {?}
     */
    function (result) {
        return result;
    };
    IChercheSearchResultFormatter.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    IChercheSearchResultFormatter.ctorParameters = function () { return [
        { type: LanguageService }
    ]; };
    return IChercheSearchResultFormatter;
}());
export { IChercheSearchResultFormatter };
if (false) {
    /**
     * @type {?}
     * @private
     */
    IChercheSearchResultFormatter.prototype.languageService;
}
/**
 * ICherche search source
 */
var IChercheSearchSource = /** @class */ (function (_super) {
    tslib_1.__extends(IChercheSearchSource, _super);
    function IChercheSearchSource(http, options, formatter) {
        var _this = _super.call(this, options) || this;
        _this.http = http;
        _this.formatter = formatter;
        return _this;
    }
    /**
     * @return {?}
     */
    IChercheSearchSource.prototype.getId = /**
     * @return {?}
     */
    function () {
        return IChercheSearchSource.id;
    };
    /**
     * @protected
     * @return {?}
     */
    IChercheSearchSource.prototype.getDefaultOptions = /**
     * @protected
     * @return {?}
     */
    function () {
        return {
            title: 'ICherche Québec',
            searchUrl: 'https://geoegl.msp.gouv.qc.ca/icherche/geocode'
        };
    };
    /**
     * Search a location by name or keyword
     * @param term Location name or keyword
     * @returns Observable of <SearchResult<Feature>[]
     */
    /**
     * Search a location by name or keyword
     * @param {?} term Location name or keyword
     * @param {?=} options
     * @return {?} Observable of <SearchResult<Feature>[]
     */
    IChercheSearchSource.prototype.search = /**
     * Search a location by name or keyword
     * @param {?} term Location name or keyword
     * @param {?=} options
     * @return {?} Observable of <SearchResult<Feature>[]
     */
    function (term, options) {
        var _this = this;
        /** @type {?} */
        var params = this.computeRequestParams(term, options || {});
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
    IChercheSearchSource.prototype.computeRequestParams = /**
     * @private
     * @param {?} term
     * @param {?} options
     * @return {?}
     */
    function (term, options) {
        return new HttpParams({
            fromObject: Object.assign({
                q: term,
                geometries: 'geom',
                type: 'adresse,code_postal,route,municipalite,mrc,region_administrative'
            }, this.params, options.params || {})
        });
    };
    /**
     * @private
     * @param {?} response
     * @return {?}
     */
    IChercheSearchSource.prototype.extractResults = /**
     * @private
     * @param {?} response
     * @return {?}
     */
    function (response) {
        var _this = this;
        return response.features.map((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            return _this.formatter.formatResult(_this.dataToResult(data));
        }));
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    IChercheSearchSource.prototype.dataToResult = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var properties = this.computeProperties(data);
        /** @type {?} */
        var id = [this.getId(), properties.type, data._id].join('.');
        return {
            source: this,
            data: {
                type: FEATURE,
                projection: 'EPSG:4326',
                geometry: data.geometry,
                extent: data.bbox,
                properties: properties,
                meta: {
                    id: id,
                    title: data.properties.recherche
                }
            },
            meta: {
                dataType: FEATURE,
                id: id,
                title: data.properties.recherche,
                titleHtml: data.highlight,
                icon: 'map-marker'
            }
        };
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    IChercheSearchSource.prototype.computeProperties = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var properties = ObjectUtils.removeKeys(data.properties, IChercheSearchSource.propertiesBlacklist);
        return Object.assign(properties, { type: data.doc_type });
    };
    IChercheSearchSource.id = 'icherche';
    IChercheSearchSource.type = FEATURE;
    IChercheSearchSource.propertiesBlacklist = [
        '@timestamp',
        '@version',
        'recherche',
        'id',
        'idrte',
        'cote',
        'geometry',
        'bbox'
    ];
    IChercheSearchSource.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    IChercheSearchSource.ctorParameters = function () { return [
        { type: HttpClient },
        { type: undefined, decorators: [{ type: Inject, args: ['options',] }] },
        { type: IChercheSearchResultFormatter, decorators: [{ type: Inject, args: [IChercheSearchResultFormatter,] }] }
    ]; };
    return IChercheSearchSource;
}(SearchSource));
export { IChercheSearchSource };
if (false) {
    /** @type {?} */
    IChercheSearchSource.id;
    /** @type {?} */
    IChercheSearchSource.type;
    /** @type {?} */
    IChercheSearchSource.propertiesBlacklist;
    /**
     * @type {?}
     * @private
     */
    IChercheSearchSource.prototype.http;
    /**
     * @type {?}
     * @private
     */
    IChercheSearchSource.prototype.formatter;
}
/**
 * IChercheReverse search source
 */
var IChercheReverseSearchSource = /** @class */ (function (_super) {
    tslib_1.__extends(IChercheReverseSearchSource, _super);
    function IChercheReverseSearchSource(http, options) {
        var _this = _super.call(this, options) || this;
        _this.http = http;
        return _this;
    }
    /**
     * @return {?}
     */
    IChercheReverseSearchSource.prototype.getId = /**
     * @return {?}
     */
    function () {
        return IChercheReverseSearchSource.id;
    };
    /**
     * @protected
     * @return {?}
     */
    IChercheReverseSearchSource.prototype.getDefaultOptions = /**
     * @protected
     * @return {?}
     */
    function () {
        return {
            title: 'ICherche Québec',
            searchUrl: 'https://geoegl.msp.gouv.qc.ca/icherche/xy'
        };
    };
    /**
     * Search a location by coordinates
     * @param lonLat Location coordinates
     * @param distance Search raidus around lonLat
     * @returns Observable of <SearchResult<Feature>[]
     */
    /**
     * Search a location by coordinates
     * @param {?} lonLat Location coordinates
     * @param {?=} options
     * @return {?} Observable of <SearchResult<Feature>[]
     */
    IChercheReverseSearchSource.prototype.reverseSearch = /**
     * Search a location by coordinates
     * @param {?} lonLat Location coordinates
     * @param {?=} options
     * @return {?} Observable of <SearchResult<Feature>[]
     */
    function (lonLat, options) {
        var _this = this;
        /** @type {?} */
        var params = this.computeRequestParams(lonLat, options || {});
        return this.http.get(this.searchUrl, { params: params }).pipe(map((/**
         * @param {?} response
         * @return {?}
         */
        function (response) {
            return _this.extractResults(response);
        })));
    };
    /**
     * @private
     * @param {?} lonLat
     * @param {?=} options
     * @return {?}
     */
    IChercheReverseSearchSource.prototype.computeRequestParams = /**
     * @private
     * @param {?} lonLat
     * @param {?=} options
     * @return {?}
     */
    function (lonLat, options) {
        /** @type {?} */
        var distance = options.distance;
        return new HttpParams({
            fromObject: Object.assign({
                loc: lonLat.join(','),
                distance: distance ? String(distance) : '',
                geometries: 'geom',
                type: 'adresse,municipalite,mrc,regadmin'
            }, this.params, options.params || {})
        });
    };
    /**
     * @private
     * @param {?} response
     * @return {?}
     */
    IChercheReverseSearchSource.prototype.extractResults = /**
     * @private
     * @param {?} response
     * @return {?}
     */
    function (response) {
        var _this = this;
        return response.features.map((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            return _this.dataToResult(data);
        }));
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    IChercheReverseSearchSource.prototype.dataToResult = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var properties = this.computeProperties(data);
        /** @type {?} */
        var extent = this.computeExtent(data);
        /** @type {?} */
        var id = [this.getId(), properties.type, data._id].join('.');
        return {
            source: this,
            data: {
                type: FEATURE,
                projection: 'EPSG:4326',
                geometry: data.geometry,
                extent: extent,
                properties: properties,
                meta: {
                    id: id,
                    title: data.properties.nom
                }
            },
            meta: {
                dataType: FEATURE,
                id: id,
                title: data.properties.nom,
                icon: 'map-marker'
            }
        };
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    IChercheReverseSearchSource.prototype.computeProperties = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var properties = ObjectUtils.removeKeys(data.properties, IChercheReverseSearchSource.propertiesBlacklist);
        return Object.assign(properties, { type: data.properties.doc_type });
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    IChercheReverseSearchSource.prototype.computeExtent = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return data.bbox
            ? [data.bbox[0], data.bbox[2], data.bbox[1], data.bbox[3]]
            : undefined;
    };
    IChercheReverseSearchSource.id = 'icherchereverse';
    IChercheReverseSearchSource.type = FEATURE;
    IChercheReverseSearchSource.propertiesBlacklist = ['doc_type'];
    IChercheReverseSearchSource.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    IChercheReverseSearchSource.ctorParameters = function () { return [
        { type: HttpClient },
        { type: undefined, decorators: [{ type: Inject, args: ['options',] }] }
    ]; };
    return IChercheReverseSearchSource;
}(SearchSource));
export { IChercheReverseSearchSource };
if (false) {
    /** @type {?} */
    IChercheReverseSearchSource.id;
    /** @type {?} */
    IChercheReverseSearchSource.type;
    /** @type {?} */
    IChercheReverseSearchSource.propertiesBlacklist;
    /**
     * @type {?}
     * @private
     */
    IChercheReverseSearchSource.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNoZXJjaGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NoYXJlZC9zb3VyY2VzL2ljaGVyY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUc5RCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUU3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRTFDLE9BQU8sRUFBRSxPQUFPLEVBQVcsTUFBTSxrQkFBa0IsQ0FBQztBQUdwRCxPQUFPLEVBQUUsWUFBWSxFQUE2QixNQUFNLFVBQVUsQ0FBQztBQWFuRTtJQUVFLHVDQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFBRyxDQUFDOzs7OztJQUV4RCxvREFBWTs7OztJQUFaLFVBQWEsTUFBNkI7UUFDeEMsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7Z0JBTkYsVUFBVTs7OztnQkFwQkYsZUFBZTs7SUEyQnhCLG9DQUFDO0NBQUEsQUFQRCxJQU9DO1NBTlksNkJBQTZCOzs7Ozs7SUFDNUIsd0RBQXdDOzs7OztBQVV0RDtJQUMwQyxnREFBWTtJQWNwRCw4QkFDVSxJQUFnQixFQUNMLE9BQTRCLEVBRXZDLFNBQXdDO1FBSmxELFlBTUUsa0JBQU0sT0FBTyxDQUFDLFNBQ2Y7UUFOUyxVQUFJLEdBQUosSUFBSSxDQUFZO1FBR2hCLGVBQVMsR0FBVCxTQUFTLENBQStCOztJQUdsRCxDQUFDOzs7O0lBRUQsb0NBQUs7OztJQUFMO1FBQ0UsT0FBTyxvQkFBb0IsQ0FBQyxFQUFFLENBQUM7SUFDakMsQ0FBQzs7Ozs7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RyxpQkFBaUIsQ0FBQztJQUN2QixnQ0FBSSxHQUFHLE9BQU8sQ0FBQztJQUNmLCtDQUFtQixHQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7O2dCQUxyRCxVQUFVOzs7O2dCQWxKRixVQUFVO2dEQTJKZCxNQUFNLFNBQUMsU0FBUzs7SUFxR3JCLGtDQUFDO0NBQUEsQUE5R0QsQ0FDaUQsWUFBWSxHQTZHNUQ7U0E3R1ksMkJBQTJCOzs7SUFFdEMsK0JBQThCOztJQUM5QixpQ0FBc0I7O0lBQ3RCLGdEQUFvRDs7Ozs7SUFHbEQsMkNBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IExhbmd1YWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgT2JqZWN0VXRpbHMgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQgeyBGRUFUVVJFLCBGZWF0dXJlIH0gZnJvbSAnLi4vLi4vLi4vZmVhdHVyZSc7XHJcblxyXG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQgfSBmcm9tICcuLi9zZWFyY2guaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZSwgVGV4dFNlYXJjaCwgUmV2ZXJzZVNlYXJjaCB9IGZyb20gJy4vc291cmNlJztcclxuaW1wb3J0IHtcclxuICBTZWFyY2hTb3VyY2VPcHRpb25zLFxyXG4gIFRleHRTZWFyY2hPcHRpb25zLFxyXG4gIFJldmVyc2VTZWFyY2hPcHRpb25zXHJcbn0gZnJvbSAnLi9zb3VyY2UuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7XHJcbiAgSUNoZXJjaGVEYXRhLFxyXG4gIElDaGVyY2hlUmVzcG9uc2UsXHJcbiAgSUNoZXJjaGVSZXZlcnNlRGF0YSxcclxuICBJQ2hlcmNoZVJldmVyc2VSZXNwb25zZVxyXG59IGZyb20gJy4vaWNoZXJjaGUuaW50ZXJmYWNlcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBJQ2hlcmNoZVNlYXJjaFJlc3VsdEZvcm1hdHRlciB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSkge31cclxuXHJcbiAgZm9ybWF0UmVzdWx0KHJlc3VsdDogU2VhcmNoUmVzdWx0PEZlYXR1cmU+KTogU2VhcmNoUmVzdWx0PEZlYXR1cmU+IHtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogSUNoZXJjaGUgc2VhcmNoIHNvdXJjZVxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSUNoZXJjaGVTZWFyY2hTb3VyY2UgZXh0ZW5kcyBTZWFyY2hTb3VyY2UgaW1wbGVtZW50cyBUZXh0U2VhcmNoIHtcclxuICBzdGF0aWMgaWQgPSAnaWNoZXJjaGUnO1xyXG4gIHN0YXRpYyB0eXBlID0gRkVBVFVSRTtcclxuICBzdGF0aWMgcHJvcGVydGllc0JsYWNrbGlzdDogc3RyaW5nW10gPSBbXHJcbiAgICAnQHRpbWVzdGFtcCcsXHJcbiAgICAnQHZlcnNpb24nLFxyXG4gICAgJ3JlY2hlcmNoZScsXHJcbiAgICAnaWQnLFxyXG4gICAgJ2lkcnRlJyxcclxuICAgICdjb3RlJyxcclxuICAgICdnZW9tZXRyeScsXHJcbiAgICAnYmJveCdcclxuICBdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIEBJbmplY3QoJ29wdGlvbnMnKSBvcHRpb25zOiBTZWFyY2hTb3VyY2VPcHRpb25zLFxyXG4gICAgQEluamVjdChJQ2hlcmNoZVNlYXJjaFJlc3VsdEZvcm1hdHRlcilcclxuICAgIHByaXZhdGUgZm9ybWF0dGVyOiBJQ2hlcmNoZVNlYXJjaFJlc3VsdEZvcm1hdHRlclxyXG4gICkge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBnZXRJZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIElDaGVyY2hlU2VhcmNoU291cmNlLmlkO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldERlZmF1bHRPcHRpb25zKCk6IFNlYXJjaFNvdXJjZU9wdGlvbnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6ICdJQ2hlcmNoZSBRdcOpYmVjJyxcclxuICAgICAgc2VhcmNoVXJsOiAnaHR0cHM6Ly9nZW9lZ2wubXNwLmdvdXYucWMuY2EvaWNoZXJjaGUvZ2VvY29kZSdcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggYSBsb2NhdGlvbiBieSBuYW1lIG9yIGtleXdvcmRcclxuICAgKiBAcGFyYW0gdGVybSBMb2NhdGlvbiBuYW1lIG9yIGtleXdvcmRcclxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIDxTZWFyY2hSZXN1bHQ8RmVhdHVyZT5bXVxyXG4gICAqL1xyXG4gIHNlYXJjaChcclxuICAgIHRlcm06IHN0cmluZyxcclxuICAgIG9wdGlvbnM/OiBUZXh0U2VhcmNoT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8U2VhcmNoUmVzdWx0PEZlYXR1cmU+W10+IHtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuY29tcHV0ZVJlcXVlc3RQYXJhbXModGVybSwgb3B0aW9ucyB8fCB7fSk7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5nZXQodGhpcy5zZWFyY2hVcmwsIHsgcGFyYW1zIH0pXHJcbiAgICAgIC5waXBlKG1hcCgocmVzcG9uc2U6IElDaGVyY2hlUmVzcG9uc2UpID0+IHRoaXMuZXh0cmFjdFJlc3VsdHMocmVzcG9uc2UpKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVSZXF1ZXN0UGFyYW1zKHRlcm06IHN0cmluZywgb3B0aW9uczogVGV4dFNlYXJjaE9wdGlvbnMpOiBIdHRwUGFyYW1zIHtcclxuICAgIHJldHVybiBuZXcgSHR0cFBhcmFtcyh7XHJcbiAgICAgIGZyb21PYmplY3Q6IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcTogdGVybSxcclxuICAgICAgICAgIGdlb21ldHJpZXM6ICdnZW9tJyxcclxuICAgICAgICAgIHR5cGU6XHJcbiAgICAgICAgICAgICdhZHJlc3NlLGNvZGVfcG9zdGFsLHJvdXRlLG11bmljaXBhbGl0ZSxtcmMscmVnaW9uX2FkbWluaXN0cmF0aXZlJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGhpcy5wYXJhbXMsXHJcbiAgICAgICAgb3B0aW9ucy5wYXJhbXMgfHwge31cclxuICAgICAgKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RSZXN1bHRzKHJlc3BvbnNlOiBJQ2hlcmNoZVJlc3BvbnNlKTogU2VhcmNoUmVzdWx0PEZlYXR1cmU+W10ge1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlLmZlYXR1cmVzLm1hcCgoZGF0YTogSUNoZXJjaGVEYXRhKSA9PiB7XHJcbiAgICAgIHJldHVybiB0aGlzLmZvcm1hdHRlci5mb3JtYXRSZXN1bHQodGhpcy5kYXRhVG9SZXN1bHQoZGF0YSkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRhdGFUb1Jlc3VsdChkYXRhOiBJQ2hlcmNoZURhdGEpOiBTZWFyY2hSZXN1bHQ8RmVhdHVyZT4ge1xyXG4gICAgY29uc3QgcHJvcGVydGllcyA9IHRoaXMuY29tcHV0ZVByb3BlcnRpZXMoZGF0YSk7XHJcbiAgICBjb25zdCBpZCA9IFt0aGlzLmdldElkKCksIHByb3BlcnRpZXMudHlwZSwgZGF0YS5faWRdLmpvaW4oJy4nKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNvdXJjZTogdGhpcyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHR5cGU6IEZFQVRVUkUsXHJcbiAgICAgICAgcHJvamVjdGlvbjogJ0VQU0c6NDMyNicsXHJcbiAgICAgICAgZ2VvbWV0cnk6IGRhdGEuZ2VvbWV0cnksXHJcbiAgICAgICAgZXh0ZW50OiBkYXRhLmJib3gsXHJcbiAgICAgICAgcHJvcGVydGllcyxcclxuICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICBpZCxcclxuICAgICAgICAgIHRpdGxlOiBkYXRhLnByb3BlcnRpZXMucmVjaGVyY2hlXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBtZXRhOiB7XHJcbiAgICAgICAgZGF0YVR5cGU6IEZFQVRVUkUsXHJcbiAgICAgICAgaWQsXHJcbiAgICAgICAgdGl0bGU6IGRhdGEucHJvcGVydGllcy5yZWNoZXJjaGUsXHJcbiAgICAgICAgdGl0bGVIdG1sOiBkYXRhLmhpZ2hsaWdodCxcclxuICAgICAgICBpY29uOiAnbWFwLW1hcmtlcidcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZVByb3BlcnRpZXMoZGF0YTogSUNoZXJjaGVEYXRhKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XHJcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gT2JqZWN0VXRpbHMucmVtb3ZlS2V5cyhcclxuICAgICAgZGF0YS5wcm9wZXJ0aWVzLFxyXG4gICAgICBJQ2hlcmNoZVNlYXJjaFNvdXJjZS5wcm9wZXJ0aWVzQmxhY2tsaXN0XHJcbiAgICApO1xyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24ocHJvcGVydGllcywgeyB0eXBlOiBkYXRhLmRvY190eXBlIH0pO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIElDaGVyY2hlUmV2ZXJzZSBzZWFyY2ggc291cmNlXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBJQ2hlcmNoZVJldmVyc2VTZWFyY2hTb3VyY2UgZXh0ZW5kcyBTZWFyY2hTb3VyY2VcclxuICBpbXBsZW1lbnRzIFJldmVyc2VTZWFyY2gge1xyXG4gIHN0YXRpYyBpZCA9ICdpY2hlcmNoZXJldmVyc2UnO1xyXG4gIHN0YXRpYyB0eXBlID0gRkVBVFVSRTtcclxuICBzdGF0aWMgcHJvcGVydGllc0JsYWNrbGlzdDogc3RyaW5nW10gPSBbJ2RvY190eXBlJ107XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgQEluamVjdCgnb3B0aW9ucycpIG9wdGlvbnM6IFNlYXJjaFNvdXJjZU9wdGlvbnNcclxuICApIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0SWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBJQ2hlcmNoZVJldmVyc2VTZWFyY2hTb3VyY2UuaWQ7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0RGVmYXVsdE9wdGlvbnMoKTogU2VhcmNoU291cmNlT3B0aW9ucyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0aXRsZTogJ0lDaGVyY2hlIFF1w6liZWMnLFxyXG4gICAgICBzZWFyY2hVcmw6ICdodHRwczovL2dlb2VnbC5tc3AuZ291di5xYy5jYS9pY2hlcmNoZS94eSdcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggYSBsb2NhdGlvbiBieSBjb29yZGluYXRlc1xyXG4gICAqIEBwYXJhbSBsb25MYXQgTG9jYXRpb24gY29vcmRpbmF0ZXNcclxuICAgKiBAcGFyYW0gZGlzdGFuY2UgU2VhcmNoIHJhaWR1cyBhcm91bmQgbG9uTGF0XHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiA8U2VhcmNoUmVzdWx0PEZlYXR1cmU+W11cclxuICAgKi9cclxuICByZXZlcnNlU2VhcmNoKFxyXG4gICAgbG9uTGF0OiBbbnVtYmVyLCBudW1iZXJdLFxyXG4gICAgb3B0aW9ucz86IFJldmVyc2VTZWFyY2hPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxTZWFyY2hSZXN1bHQ8RmVhdHVyZT5bXT4ge1xyXG4gICAgY29uc3QgcGFyYW1zID0gdGhpcy5jb21wdXRlUmVxdWVzdFBhcmFtcyhsb25MYXQsIG9wdGlvbnMgfHwge30pO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5zZWFyY2hVcmwsIHsgcGFyYW1zIH0pLnBpcGUoXHJcbiAgICAgIG1hcCgocmVzcG9uc2U6IElDaGVyY2hlUmV2ZXJzZVJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXh0cmFjdFJlc3VsdHMocmVzcG9uc2UpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZVJlcXVlc3RQYXJhbXMoXHJcbiAgICBsb25MYXQ6IFtudW1iZXIsIG51bWJlcl0sXHJcbiAgICBvcHRpb25zPzogUmV2ZXJzZVNlYXJjaE9wdGlvbnNcclxuICApOiBIdHRwUGFyYW1zIHtcclxuICAgIGNvbnN0IGRpc3RhbmNlID0gb3B0aW9ucy5kaXN0YW5jZTtcclxuICAgIHJldHVybiBuZXcgSHR0cFBhcmFtcyh7XHJcbiAgICAgIGZyb21PYmplY3Q6IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbG9jOiBsb25MYXQuam9pbignLCcpLFxyXG4gICAgICAgICAgZGlzdGFuY2U6IGRpc3RhbmNlID8gU3RyaW5nKGRpc3RhbmNlKSA6ICcnLFxyXG4gICAgICAgICAgZ2VvbWV0cmllczogJ2dlb20nLFxyXG4gICAgICAgICAgdHlwZTogJ2FkcmVzc2UsbXVuaWNpcGFsaXRlLG1yYyxyZWdhZG1pbidcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRoaXMucGFyYW1zLFxyXG4gICAgICAgIG9wdGlvbnMucGFyYW1zIHx8IHt9XHJcbiAgICAgIClcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0UmVzdWx0cyhcclxuICAgIHJlc3BvbnNlOiBJQ2hlcmNoZVJldmVyc2VSZXNwb25zZVxyXG4gICk6IFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdIHtcclxuICAgIHJldHVybiByZXNwb25zZS5mZWF0dXJlcy5tYXAoKGRhdGE6IElDaGVyY2hlUmV2ZXJzZURhdGEpID0+IHtcclxuICAgICAgcmV0dXJuIHRoaXMuZGF0YVRvUmVzdWx0KGRhdGEpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRhdGFUb1Jlc3VsdChkYXRhOiBJQ2hlcmNoZVJldmVyc2VEYXRhKTogU2VhcmNoUmVzdWx0PEZlYXR1cmU+IHtcclxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSB0aGlzLmNvbXB1dGVQcm9wZXJ0aWVzKGRhdGEpO1xyXG4gICAgY29uc3QgZXh0ZW50ID0gdGhpcy5jb21wdXRlRXh0ZW50KGRhdGEpO1xyXG4gICAgY29uc3QgaWQgPSBbdGhpcy5nZXRJZCgpLCBwcm9wZXJ0aWVzLnR5cGUsIGRhdGEuX2lkXS5qb2luKCcuJyk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc291cmNlOiB0aGlzLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgdHlwZTogRkVBVFVSRSxcclxuICAgICAgICBwcm9qZWN0aW9uOiAnRVBTRzo0MzI2JyxcclxuICAgICAgICBnZW9tZXRyeTogZGF0YS5nZW9tZXRyeSxcclxuICAgICAgICBleHRlbnQsXHJcbiAgICAgICAgcHJvcGVydGllcyxcclxuICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICBpZCxcclxuICAgICAgICAgIHRpdGxlOiBkYXRhLnByb3BlcnRpZXMubm9tXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBtZXRhOiB7XHJcbiAgICAgICAgZGF0YVR5cGU6IEZFQVRVUkUsXHJcbiAgICAgICAgaWQsXHJcbiAgICAgICAgdGl0bGU6IGRhdGEucHJvcGVydGllcy5ub20sXHJcbiAgICAgICAgaWNvbjogJ21hcC1tYXJrZXInXHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVQcm9wZXJ0aWVzKGRhdGE6IElDaGVyY2hlUmV2ZXJzZURhdGEpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHtcclxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSBPYmplY3RVdGlscy5yZW1vdmVLZXlzKFxyXG4gICAgICBkYXRhLnByb3BlcnRpZXMsXHJcbiAgICAgIElDaGVyY2hlUmV2ZXJzZVNlYXJjaFNvdXJjZS5wcm9wZXJ0aWVzQmxhY2tsaXN0XHJcbiAgICApO1xyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24ocHJvcGVydGllcywgeyB0eXBlOiBkYXRhLnByb3BlcnRpZXMuZG9jX3R5cGUgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVFeHRlbnQoZGF0YTogSUNoZXJjaGVSZXZlcnNlRGF0YSk6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdIHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiBkYXRhLmJib3hcclxuICAgICAgPyBbZGF0YS5iYm94WzBdLCBkYXRhLmJib3hbMl0sIGRhdGEuYmJveFsxXSwgZGF0YS5iYm94WzNdXVxyXG4gICAgICA6IHVuZGVmaW5lZDtcclxuICB9XHJcbn1cclxuIl19