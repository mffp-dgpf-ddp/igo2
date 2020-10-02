/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import olWKT from 'ol/format/WKT';
import { FEATURE } from '../../../feature';
import { SearchSource } from './source';
/**
 * Cadastre search source
 */
var CadastreSearchSource = /** @class */ (function (_super) {
    tslib_1.__extends(CadastreSearchSource, _super);
    function CadastreSearchSource(http, options) {
        var _this = _super.call(this, options) || this;
        _this.http = http;
        return _this;
    }
    /**
     * @return {?}
     */
    CadastreSearchSource.prototype.getId = /**
     * @return {?}
     */
    function () {
        return CadastreSearchSource.id;
    };
    /**
     * @return {?}
     */
    CadastreSearchSource.prototype.getType = /**
     * @return {?}
     */
    function () {
        return CadastreSearchSource.type;
    };
    /*
     * Source : https://wiki.openstreetmap.org/wiki/Key:amenity
     */
    /*
       * Source : https://wiki.openstreetmap.org/wiki/Key:amenity
       */
    /**
     * @protected
     * @return {?}
     */
    CadastreSearchSource.prototype.getDefaultOptions = /*
       * Source : https://wiki.openstreetmap.org/wiki/Key:amenity
       */
    /**
     * @protected
     * @return {?}
     */
    function () {
        return {
            title: 'Cadastre (Québec)',
            searchUrl: 'https://carto.cptaq.gouv.qc.ca/php/find_lot_v1.php?'
        };
    };
    /**
     * Search a place by name
     * @param term Place name
     * @returns Observable of <SearchResult<Feature>[]
     */
    /**
     * Search a place by name
     * @param {?} term Place name
     * @param {?=} options
     * @return {?} Observable of <SearchResult<Feature>[]
     */
    CadastreSearchSource.prototype.search = /**
     * Search a place by name
     * @param {?} term Place name
     * @param {?=} options
     * @return {?} Observable of <SearchResult<Feature>[]
     */
    function (term, options) {
        var _this = this;
        term = term.endsWith(',') ? term.slice(0, -1) : term;
        term = term.startsWith(',') ? term.substr(1) : term;
        term = term.replace(/ /g, '');
        /** @type {?} */
        var params = this.computeSearchRequestParams(term, options || {});
        if (!params.get('numero') || !params.get('numero').match(/^[0-9,]+$/g)) {
            return of([]);
        }
        return this.http
            .get(this.searchUrl, { params: params, responseType: 'text' })
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
    CadastreSearchSource.prototype.computeSearchRequestParams = /**
     * @private
     * @param {?} term
     * @param {?} options
     * @return {?}
     */
    function (term, options) {
        return new HttpParams({
            fromObject: Object.assign({
                numero: term,
                epsg: '4326'
            }, this.params, options.params || {})
        });
    };
    /**
     * @private
     * @param {?} response
     * @return {?}
     */
    CadastreSearchSource.prototype.extractResults = /**
     * @private
     * @param {?} response
     * @return {?}
     */
    function (response) {
        var _this = this;
        return response
            .split('<br />')
            .filter((/**
         * @param {?} lot
         * @return {?}
         */
        function (lot) { return lot.length > 0; }))
            .map((/**
         * @param {?} lot
         * @return {?}
         */
        function (lot) { return _this.dataToResult(lot); }));
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    CadastreSearchSource.prototype.dataToResult = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var lot = data.split(';');
        /** @type {?} */
        var numero = lot[0];
        /** @type {?} */
        var wkt = lot[7];
        /** @type {?} */
        var geometry = this.computeGeometry(wkt);
        /** @type {?} */
        var properties = { NoLot: numero };
        /** @type {?} */
        var id = [this.getId(), 'cadastre', numero].join('.');
        return {
            source: this,
            meta: {
                dataType: FEATURE,
                id: id,
                title: numero,
                icon: 'map-marker'
            },
            data: {
                type: FEATURE,
                projection: 'EPSG:4326',
                geometry: geometry,
                properties: properties,
                meta: {
                    id: id,
                    title: numero
                }
            }
        };
    };
    /**
     * @private
     * @param {?} wkt
     * @return {?}
     */
    CadastreSearchSource.prototype.computeGeometry = /**
     * @private
     * @param {?} wkt
     * @return {?}
     */
    function (wkt) {
        /** @type {?} */
        var feature = new olWKT().readFeature(wkt, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:4326'
        });
        return {
            type: feature.getGeometry().getType(),
            coordinates: feature.getGeometry().getCoordinates()
        };
    };
    CadastreSearchSource.id = 'cadastre';
    CadastreSearchSource.type = FEATURE;
    CadastreSearchSource.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    CadastreSearchSource.ctorParameters = function () { return [
        { type: HttpClient },
        { type: undefined, decorators: [{ type: Inject, args: ['options',] }] }
    ]; };
    return CadastreSearchSource;
}(SearchSource));
export { CadastreSearchSource };
if (false) {
    /** @type {?} */
    CadastreSearchSource.id;
    /** @type {?} */
    CadastreSearchSource.type;
    /**
     * @type {?}
     * @private
     */
    CadastreSearchSource.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FkYXN0cmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NoYXJlZC9zb3VyY2VzL2NhZGFzdHJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUU5RCxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEtBQUssTUFBTSxlQUFlLENBQUM7QUFFbEMsT0FBTyxFQUFFLE9BQU8sRUFBNEIsTUFBTSxrQkFBa0IsQ0FBQztBQUdyRSxPQUFPLEVBQUUsWUFBWSxFQUFjLE1BQU0sVUFBVSxDQUFDOzs7O0FBTXBEO0lBQzBDLGdEQUFZO0lBSXBELDhCQUNVLElBQWdCLEVBQ0wsT0FBNEI7UUFGakQsWUFJRSxrQkFBTSxPQUFPLENBQUMsU0FDZjtRQUpTLFVBQUksR0FBSixJQUFJLENBQVk7O0lBSTFCLENBQUM7Ozs7SUFFRCxvQ0FBSzs7O0lBQUw7UUFDRSxPQUFPLG9CQUFvQixDQUFDLEVBQUUsQ0FBQztJQUNqQyxDQUFDOzs7O0lBRUQsc0NBQU87OztJQUFQO1FBQ0UsT0FBTyxvQkFBb0IsQ0FBQyxJQUFJLENBQUM7SUFDbkMsQ0FBQztJQUVEOztPQUVHOzs7Ozs7OztJQUNPLGdEQUFpQjs7Ozs7OztJQUEzQjtRQUNFLE9BQU87WUFDTCxLQUFLLEVBQUUsbUJBQW1CO1lBQzFCLFNBQVMsRUFBRSxxREFBcUQ7U0FDakUsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gscUNBQU07Ozs7OztJQUFOLFVBQ0UsSUFBd0IsRUFDeEIsT0FBMkI7UUFGN0IsaUJBZUM7UUFYQyxJQUFJLEdB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QUNSLFVBQVUsWUFBQTtnQkFDVixJQUFJLEVBQUU7b0JBQ0osRUFBRSxJQUFBO29CQUNGLEtBQUssRUFBRSxNQUFNO2lCQUNkO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQzs7Ozs7O0lBRU8sOENBQWU7Ozs7O0lBQXZCLFVBQXdCLEdBQVc7O1lBQzNCLE9BQU8sR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUU7WUFDM0MsY0FBYyxFQUFFLFdBQVc7WUFDM0IsaUJBQWlCLEVBQUUsV0FBVztTQUMvQixDQUFDO1FBQ0YsT0FBTztZQUNMLElBQUksRUFBRSxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxFQUFFO1lBQ3JDLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxFQUFFO1NBQ3BELENBQUM7SUFDSixDQUFDO0lBL0dNLHVCQUFFLEdBQUcsVUFBVSxDQUFDO0lBQ2hCLHlCQUFJLEdBQUcsT0FBTyxDQUFDOztnQkFIdkIsVUFBVTs7OztnQkFoQkYsVUFBVTtnREF1QmQsTUFBTSxTQUFDLFNBQVM7O0lBMkdyQiwyQkFBQztDQUFBLEFBbEhELENBQzBDLFlBQVksR0FpSHJEO1NBakhZLG9CQUFvQjs7O0lBQy9CLHdCQUF1Qjs7SUFDdkIsMEJBQXNCOzs7OztJQUdwQixvQ0FBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCBvbFdLVCBmcm9tICdvbC9mb3JtYXQvV0tUJztcclxuXHJcbmltcG9ydCB7IEZFQVRVUkUsIEZlYXR1cmUsIEZlYXR1cmVHZW9tZXRyeSB9IGZyb20gJy4uLy4uLy4uL2ZlYXR1cmUnO1xyXG5cclxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi4vc2VhcmNoLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2UsIFRleHRTZWFyY2ggfSBmcm9tICcuL3NvdXJjZSc7XHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZU9wdGlvbnMsIFRleHRTZWFyY2hPcHRpb25zIH0gZnJvbSAnLi9zb3VyY2UuaW50ZXJmYWNlcyc7XHJcblxyXG4vKipcclxuICogQ2FkYXN0cmUgc2VhcmNoIHNvdXJjZVxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ2FkYXN0cmVTZWFyY2hTb3VyY2UgZXh0ZW5kcyBTZWFyY2hTb3VyY2UgaW1wbGVtZW50cyBUZXh0U2VhcmNoIHtcclxuICBzdGF0aWMgaWQgPSAnY2FkYXN0cmUnO1xyXG4gIHN0YXRpYyB0eXBlID0gRkVBVFVSRTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICBASW5qZWN0KCdvcHRpb25zJykgb3B0aW9uczogU2VhcmNoU291cmNlT3B0aW9uc1xyXG4gICkge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBnZXRJZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIENhZGFzdHJlU2VhcmNoU291cmNlLmlkO1xyXG4gIH1cclxuXHJcbiAgZ2V0VHlwZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIENhZGFzdHJlU2VhcmNoU291cmNlLnR5cGU7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIFNvdXJjZSA6IGh0dHBzOi8vd2lraS5vcGVuc3RyZWV0bWFwLm9yZy93aWtpL0tleTphbWVuaXR5XHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGdldERlZmF1bHRPcHRpb25zKCk6IFNlYXJjaFNvdXJjZU9wdGlvbnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6ICdDYWRhc3RyZSAoUXXDqWJlYyknLFxyXG4gICAgICBzZWFyY2hVcmw6ICdodHRwczovL2NhcnRvLmNwdGFxLmdvdXYucWMuY2EvcGhwL2ZpbmRfbG90X3YxLnBocD8nXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIGEgcGxhY2UgYnkgbmFtZVxyXG4gICAqIEBwYXJhbSB0ZXJtIFBsYWNlIG5hbWVcclxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIDxTZWFyY2hSZXN1bHQ8RmVhdHVyZT5bXVxyXG4gICAqL1xyXG4gIHNlYXJjaChcclxuICAgIHRlcm06IHN0cmluZyB8IHVuZGVmaW5lZCxcclxuICAgIG9wdGlvbnM/OiBUZXh0U2VhcmNoT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8U2VhcmNoUmVzdWx0PEZlYXR1cmU+W10+IHtcclxuICAgIHRlcm0gPSB0ZXJtLmVuZHNXaXRoKCcsJykgPyB0ZXJtLnNsaWNlKDAsIC0xKSA6IHRlcm07XHJcbiAgICB0ZXJtID0gdGVybS5zdGFydHNXaXRoKCcsJykgPyB0ZXJtLnN1YnN0cigxKSA6IHRlcm07XHJcbiAgICB0ZXJtID0gdGVybS5yZXBsYWNlKC8gL2csICcnKTtcclxuXHJcbiAgICBjb25zdCBwYXJhbXMgPSB0aGlzLmNvbXB1dGVTZWFyY2hSZXF1ZXN0UGFyYW1zKHRlcm0sIG9wdGlvbnMgfHwge30pO1xyXG4gICAgaWYgKCFwYXJhbXMuZ2V0KCdudW1lcm8nKSB8fCAhcGFyYW1zLmdldCgnbnVtZXJvJykubWF0Y2goL15bMC05LF0rJC9nKSkge1xyXG4gICAgICByZXR1cm4gb2YoW10pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuZ2V0KHRoaXMuc2VhcmNoVXJsLCB7IHBhcmFtcywgcmVzcG9uc2VUeXBlOiAndGV4dCcgfSlcclxuICAgICAgLnBpcGUobWFwKChyZXNwb25zZTogc3RyaW5nKSA9PiB0aGlzLmV4dHJhY3RSZXN1bHRzKHJlc3BvbnNlKSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlU2VhcmNoUmVxdWVzdFBhcmFtcyhcclxuICAgIHRlcm06IHN0cmluZyxcclxuICAgIG9wdGlvbnM6IFRleHRTZWFyY2hPcHRpb25zXHJcbiAgKTogSHR0cFBhcmFtcyB7XHJcbiAgICByZXR1cm4gbmV3IEh0dHBQYXJhbXMoe1xyXG4gICAgICBmcm9tT2JqZWN0OiBPYmplY3QuYXNzaWduKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIG51bWVybzogdGVybSxcclxuICAgICAgICAgIGVwc2c6ICc0MzI2J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGhpcy5wYXJhbXMsXHJcbiAgICAgICAgb3B0aW9ucy5wYXJhbXMgfHwge31cclxuICAgICAgKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RSZXN1bHRzKHJlc3BvbnNlOiBzdHJpbmcpOiBTZWFyY2hSZXN1bHQ8RmVhdHVyZT5bXSB7XHJcbiAgICByZXR1cm4gcmVzcG9uc2VcclxuICAgICAgLnNwbGl0KCc8YnIgLz4nKVxyXG4gICAgICAuZmlsdGVyKChsb3Q6IHN0cmluZykgPT4gbG90Lmxlbmd0aCA+IDApXHJcbiAgICAgIC5tYXAoKGxvdDogc3RyaW5nKSA9PiB0aGlzLmRhdGFUb1Jlc3VsdChsb3QpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGF0YVRvUmVzdWx0KGRhdGE6IHN0cmluZyk6IFNlYXJjaFJlc3VsdDxGZWF0dXJlPiB7XHJcbiAgICBjb25zdCBsb3QgPSBkYXRhLnNwbGl0KCc7Jyk7XHJcbiAgICBjb25zdCBudW1lcm8gPSBsb3RbMF07XHJcbiAgICBjb25zdCB3a3QgPSBsb3RbN107XHJcbiAgICBjb25zdCBnZW9tZXRyeSA9IHRoaXMuY29tcHV0ZUdlb21ldHJ5KHdrdCk7XHJcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0geyBOb0xvdDogbnVtZXJvIH07XHJcbiAgICBjb25zdCBpZCA9IFt0aGlzLmdldElkKCksICdjYWRhc3RyZScsIG51bWVyb10uam9pbignLicpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNvdXJjZTogdGhpcyxcclxuICAgICAgbWV0YToge1xyXG4gICAgICAgIGRhdGFUeXBlOiBGRUFUVVJFLFxyXG4gICAgICAgIGlkLFxyXG4gICAgICAgIHRpdGxlOiBudW1lcm8sXHJcbiAgICAgICAgaWNvbjogJ21hcC1tYXJrZXInXHJcbiAgICAgIH0sXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICB0eXBlOiBGRUFUVVJFLFxyXG4gICAgICAgIHByb2plY3Rpb246ICdFUFNHOjQzMjYnLFxyXG4gICAgICAgIGdlb21ldHJ5LFxyXG4gICAgICAgIHByb3BlcnRpZXMsXHJcbiAgICAgICAgbWV0YToge1xyXG4gICAgICAgICAgaWQsXHJcbiAgICAgICAgICB0aXRsZTogbnVtZXJvXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlR2VvbWV0cnkod2t0OiBzdHJpbmcpOiBGZWF0dXJlR2VvbWV0cnkge1xyXG4gICAgY29uc3QgZmVhdHVyZSA9IG5ldyBvbFdLVCgpLnJlYWRGZWF0dXJlKHdrdCwge1xyXG4gICAgICBkYXRhUHJvamVjdGlvbjogJ0VQU0c6NDMyNicsXHJcbiAgICAgIGZlYXR1cmVQcm9qZWN0aW9uOiAnRVBTRzo0MzI2J1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0eXBlOiBmZWF0dXJlLmdldEdlb21ldHJ5KCkuZ2V0VHlwZSgpLFxyXG4gICAgICBjb29yZGluYXRlczogZmVhdHVyZS5nZXRHZW9tZXRyeSgpLmdldENvb3JkaW5hdGVzKClcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==