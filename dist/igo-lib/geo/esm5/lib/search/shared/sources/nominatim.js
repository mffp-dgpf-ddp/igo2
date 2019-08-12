/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FEATURE } from '../../../feature';
import { SearchSource } from './source';
/**
 * Nominatim search source
 */
var NominatimSearchSource = /** @class */ (function (_super) {
    tslib_1.__extends(NominatimSearchSource, _super);
    function NominatimSearchSource(http, options) {
        var _this = _super.call(this, options) || this;
        _this.http = http;
        return _this;
    }
    /**
     * @return {?}
     */
    NominatimSearchSource.prototype.getId = /**
     * @return {?}
     */
    function () {
        return NominatimSearchSource.id;
    };
    /**
     * @protected
     * @return {?}
     */
    NominatimSearchSource.prototype.getDefaultOptions = /**
     * @protected
     * @return {?}
     */
    function () {
        return {
            title: 'Nominatim (OSM)',
            searchUrl: 'https://nominatim.openstreetmap.org/search'
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
    NominatimSearchSource.prototype.search = /**
     * Search a place by name
     * @param {?} term Place name
     * @param {?=} options
     * @return {?} Observable of <SearchResult<Feature>[]
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
    NominatimSearchSource.prototype.computeSearchRequestParams = /**
     * @private
     * @param {?} term
     * @param {?} options
     * @return {?}
     */
    function (term, options) {
        return new HttpParams({
            fromObject: Object.assign({
                q: term,
                format: 'json'
            }, this.params, options.params || {})
        });
    };
    /**
     * @private
     * @param {?} response
     * @return {?}
     */
    NominatimSearchSource.prototype.extractResults = /**
     * @private
     * @param {?} response
     * @return {?}
     */
    function (response) {
        var _this = this;
        return response.map((/**
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
    NominatimSearchSource.prototype.dataToResult = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var properties = this.computeProperties(data);
        /** @type {?} */
        var geometry = this.computeGeometry(data);
        /** @type {?} */
        var extent = this.computeExtent(data);
        /** @type {?} */
        var id = [this.getId(), 'place', data.place_id].join('.');
        return {
            source: this,
            meta: {
                dataType: FEATURE,
                id: id,
                title: data.display_name,
                icon: 'map-marker'
            },
            data: {
                type: FEATURE,
                projection: 'EPSG:4326',
                geometry: geometry,
                extent: extent,
                properties: properties,
                meta: {
                    id: id,
                    title: data.display_name
                }
            }
        };
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    NominatimSearchSource.prototype.computeProperties = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return {
            display_name: data.display_name,
            place_id: data.place_id,
            osm_type: data.osm_type,
            class: data.class,
            type: data.type
        };
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    NominatimSearchSource.prototype.computeGeometry = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return {
            type: 'Point',
            coordinates: [parseFloat(data.lon), parseFloat(data.lat)]
        };
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    NominatimSearchSource.prototype.computeExtent = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return [
            parseFloat(data.boundingbox[2]),
            parseFloat(data.boundingbox[0]),
            parseFloat(data.boundingbox[3]),
            parseFloat(data.boundingbox[1])
        ];
    };
    NominatimSearchSource.id = 'nominatim';
    NominatimSearchSource.type = FEATURE;
    NominatimSearchSource.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NominatimSearchSource.ctorParameters = function () { return [
        { type: HttpClient },
        { type: undefined, decorators: [{ type: Inject, args: ['options',] }] }
    ]; };
    return NominatimSearchSource;
}(SearchSource));
export { NominatimSearchSource };
if (false) {
    /** @type {?} */
    NominatimSearchSource.id;
    /** @type {?} */
    NominatimSearchSource.type;
    /**
     * @type {?}
     * @private
     */
    NominatimSearchSource.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9taW5hdGltLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zaGFyZWQvc291cmNlcy9ub21pbmF0aW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRzlELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsT0FBTyxFQUE0QixNQUFNLGtCQUFrQixDQUFDO0FBR3JFLE9BQU8sRUFBRSxZQUFZLEVBQWMsTUFBTSxVQUFVLENBQUM7Ozs7QUFPcEQ7SUFDMkMsaURBQVk7SUFJckQsK0JBQ1UsSUFBZ0IsRUFDTCxPQUE0QjtRQUZqRCxZQUlFLGtCQUFNLE9BQU8sQ0FBQyxTQUNmO1FBSlMsVUFBSSxHQUFKLElBQUksQ0FBWTs7SUFJMUIsQ0FBQzs7OztJQUVELHFDQUFLOzs7SUFBTDtRQUNFLE9BQU8scUJBQXFCLENBQUMsRUFBRSxDQUFDO0lBQ2xDLENBQUM7Ozs7O0lBRVMsaURBQWlCOzs7O0lBQTNCO1FBQ0UsT0FBTztZQUNMLEtBQUssRUFBRSxpQkFBaUI7WUFDeEIsU0FBUyxFQUFFLDRDQUE0QztTQUN4RCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCxzQ0FBTTs7Ozs7O0lBQU4sVUFDRSxJQUF3QixFQUN4QixPQUEyQjtRQUY3QixpQkFRQzs7WUFKTyxNQUFNLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksRUFBRSxPQUFPLElBQUksRUFBRSxDQUFDO1FBQ25FLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sUUFBQSxFQUFFLENBQUM7YUFDL0IsSUFB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O1NBQ2hDLENBQUM7SUFDSixDQUFDO0lBNUdNLHdCQUFFLEdBQUcsV0FBVyxDQUFDO0lBQ2pCLDBCQUFJLEdBQUcsT0FBTyxDQUFDOztnQkFIdkIsVUFBVTs7OztnQkFmRixVQUFVO2dEQXNCZCxNQUFNLFNBQUMsU0FBUzs7SUF3R3JCLDRCQUFDO0NBQUEsQUEvR0QsQ0FDMkMsWUFBWSxHQThHdEQ7U0E5R1kscUJBQXFCOzs7SUFDaEMseUJBQXdCOztJQUN4QiwyQkFBc0I7Ozs7O0lBR3BCLHFDQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBGRUFUVVJFLCBGZWF0dXJlLCBGZWF0dXJlR2VvbWV0cnkgfSBmcm9tICcuLi8uLi8uLi9mZWF0dXJlJztcclxuXHJcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCB9IGZyb20gJy4uL3NlYXJjaC5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgU2VhcmNoU291cmNlLCBUZXh0U2VhcmNoIH0gZnJvbSAnLi9zb3VyY2UnO1xyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2VPcHRpb25zLCBUZXh0U2VhcmNoT3B0aW9ucyB9IGZyb20gJy4vc291cmNlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBOb21pbmF0aW1EYXRhIH0gZnJvbSAnLi9ub21pbmF0aW0uaW50ZXJmYWNlcyc7XHJcblxyXG4vKipcclxuICogTm9taW5hdGltIHNlYXJjaCBzb3VyY2VcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5vbWluYXRpbVNlYXJjaFNvdXJjZSBleHRlbmRzIFNlYXJjaFNvdXJjZSBpbXBsZW1lbnRzIFRleHRTZWFyY2gge1xyXG4gIHN0YXRpYyBpZCA9ICdub21pbmF0aW0nO1xyXG4gIHN0YXRpYyB0eXBlID0gRkVBVFVSRTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICBASW5qZWN0KCdvcHRpb25zJykgb3B0aW9uczogU2VhcmNoU291cmNlT3B0aW9uc1xyXG4gICkge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBnZXRJZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIE5vbWluYXRpbVNlYXJjaFNvdXJjZS5pZDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXREZWZhdWx0T3B0aW9ucygpOiBTZWFyY2hTb3VyY2VPcHRpb25zIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiAnTm9taW5hdGltIChPU00pJyxcclxuICAgICAgc2VhcmNoVXJsOiAnaHR0cHM6Ly9ub21pbmF0aW0ub3BlbnN0cmVldG1hcC5vcmcvc2VhcmNoJ1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBhIHBsYWNlIGJ5IG5hbWVcclxuICAgKiBAcGFyYW0gdGVybSBQbGFjZSBuYW1lXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiA8U2VhcmNoUmVzdWx0PEZlYXR1cmU+W11cclxuICAgKi9cclxuICBzZWFyY2goXHJcbiAgICB0ZXJtOiBzdHJpbmcgfCB1bmRlZmluZWQsXHJcbiAgICBvcHRpb25zPzogVGV4dFNlYXJjaE9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdPiB7XHJcbiAgICBjb25zdCBwYXJhbXMgPSB0aGlzLmNvbXB1dGVTZWFyY2hSZXF1ZXN0UGFyYW1zKHRlcm0sIG9wdGlvbnMgfHwge30pO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuZ2V0KHRoaXMuc2VhcmNoVXJsLCB7IHBhcmFtcyB9KVxyXG4gICAgICAucGlwZShtYXAoKHJlc3BvbnNlOiBOb21pbmF0aW1EYXRhW10pID0+IHRoaXMuZXh0cmFjdFJlc3VsdHMocmVzcG9uc2UpKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVTZWFyY2hSZXF1ZXN0UGFyYW1zKFxyXG4gICAgdGVybTogc3RyaW5nLFxyXG4gICAgb3B0aW9uczogVGV4dFNlYXJjaE9wdGlvbnNcclxuICApOiBIdHRwUGFyYW1zIHtcclxuICAgIHJldHVybiBuZXcgSHR0cFBhcmFtcyh7XHJcbiAgICAgIGZyb21PYmplY3Q6IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcTogdGVybSxcclxuICAgICAgICAgIGZvcm1hdDogJ2pzb24nXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0aGlzLnBhcmFtcyxcclxuICAgICAgICBvcHRpb25zLnBhcmFtcyB8fCB7fVxyXG4gICAgICApXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdFJlc3VsdHMocmVzcG9uc2U6IE5vbWluYXRpbURhdGFbXSk6IFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdIHtcclxuICAgIHJldHVybiByZXNwb25zZS5tYXAoKGRhdGE6IE5vbWluYXRpbURhdGEpID0+IHRoaXMuZGF0YVRvUmVzdWx0KGRhdGEpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGF0YVRvUmVzdWx0KGRhdGE6IE5vbWluYXRpbURhdGEpOiBTZWFyY2hSZXN1bHQ8RmVhdHVyZT4ge1xyXG4gICAgY29uc3QgcHJvcGVydGllcyA9IHRoaXMuY29tcHV0ZVByb3BlcnRpZXMoZGF0YSk7XHJcbiAgICBjb25zdCBnZW9tZXRyeSA9IHRoaXMuY29tcHV0ZUdlb21ldHJ5KGRhdGEpO1xyXG4gICAgY29uc3QgZXh0ZW50ID0gdGhpcy5jb21wdXRlRXh0ZW50KGRhdGEpO1xyXG4gICAgY29uc3QgaWQgPSBbdGhpcy5nZXRJZCgpLCAncGxhY2UnLCBkYXRhLnBsYWNlX2lkXS5qb2luKCcuJyk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc291cmNlOiB0aGlzLFxyXG4gICAgICBtZXRhOiB7XHJcbiAgICAgICAgZGF0YVR5cGU6IEZFQVRVUkUsXHJcbiAgICAgICAgaWQsXHJcbiAgICAgICAgdGl0bGU6IGRhdGEuZGlzcGxheV9uYW1lLFxyXG4gICAgICAgIGljb246ICdtYXAtbWFya2VyJ1xyXG4gICAgICB9LFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgdHlwZTogRkVBVFVSRSxcclxuICAgICAgICBwcm9qZWN0aW9uOiAnRVBTRzo0MzI2JyxcclxuICAgICAgICBnZW9tZXRyeSxcclxuICAgICAgICBleHRlbnQsXHJcbiAgICAgICAgcHJvcGVydGllcyxcclxuICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICBpZCxcclxuICAgICAgICAgIHRpdGxlOiBkYXRhLmRpc3BsYXlfbmFtZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZVByb3BlcnRpZXMoZGF0YTogTm9taW5hdGltRGF0YSk6IHsgW2tleTogc3RyaW5nXTogYW55IH0ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZGlzcGxheV9uYW1lOiBkYXRhLmRpc3BsYXlfbmFtZSxcclxuICAgICAgcGxhY2VfaWQ6IGRhdGEucGxhY2VfaWQsXHJcbiAgICAgIG9zbV90eXBlOiBkYXRhLm9zbV90eXBlLFxyXG4gICAgICBjbGFzczogZGF0YS5jbGFzcyxcclxuICAgICAgdHlwZTogZGF0YS50eXBlXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlR2VvbWV0cnkoZGF0YTogTm9taW5hdGltRGF0YSk6IEZlYXR1cmVHZW9tZXRyeSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0eXBlOiAnUG9pbnQnLFxyXG4gICAgICBjb29yZGluYXRlczogW3BhcnNlRmxvYXQoZGF0YS5sb24pLCBwYXJzZUZsb2F0KGRhdGEubGF0KV1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVFeHRlbnQoZGF0YTogTm9taW5hdGltRGF0YSk6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdIHtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIHBhcnNlRmxvYXQoZGF0YS5ib3VuZGluZ2JveFsyXSksXHJcbiAgICAgIHBhcnNlRmxvYXQoZGF0YS5ib3VuZGluZ2JveFswXSksXHJcbiAgICAgIHBhcnNlRmxvYXQoZGF0YS5ib3VuZGluZ2JveFszXSksXHJcbiAgICAgIHBhcnNlRmxvYXQoZGF0YS5ib3VuZGluZ2JveFsxXSlcclxuICAgIF07XHJcbiAgfVxyXG59XHJcbiJdfQ==