/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FEATURE } from '../../../feature';
import { SearchSource } from './source';
/**
 * Nominatim search source
 */
export class NominatimSearchSource extends SearchSource {
    /**
     * @param {?} http
     * @param {?} options
     */
    constructor(http, options) {
        super(options);
        this.http = http;
    }
    /**
     * @return {?}
     */
    getId() {
        return NominatimSearchSource.id;
    }
    /**
     * @protected
     * @return {?}
     */
    getDefaultOptions() {
        return {
            title: 'Nominatim (OSM)',
            searchUrl: 'https://nominatim.openstreetmap.org/search'
        };
    }
    /**
     * Search a place by name
     * @param {?} term Place name
     * @param {?=} options
     * @return {?} Observable of <SearchResult<Feature>[]
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
                q: term,
                format: 'json'
            }, this.params, options.params || {})
        });
    }
    /**
     * @private
     * @param {?} response
     * @return {?}
     */
    extractResults(response) {
        return response.map((/**
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
        const properties = this.computeProperties(data);
        /** @type {?} */
        const geometry = this.computeGeometry(data);
        /** @type {?} */
        const extent = this.computeExtent(data);
        /** @type {?} */
        const id = [this.getId(), 'place', data.place_id].join('.');
        return {
            source: this,
            meta: {
                dataType: FEATURE,
                id,
                title: data.display_name,
                icon: 'map-marker'
            },
            data: {
                type: FEATURE,
                projection: 'EPSG:4326',
                geometry,
                extent,
                properties,
                meta: {
                    id,
                    title: data.display_name
                }
            }
        };
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    computeProperties(data) {
        return {
            display_name: data.display_name,
            place_id: data.place_id,
            osm_type: data.osm_type,
            class: data.class,
            type: data.type
        };
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    computeGeometry(data) {
        return {
            type: 'Point',
            coordinates: [parseFloat(data.lon), parseFloat(data.lat)]
        };
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    computeExtent(data) {
        return [
            parseFloat(data.boundingbox[2]),
            parseFloat(data.boundingbox[0]),
            parseFloat(data.boundingbox[3]),
            parseFloat(data.boundingbox[1])
        ];
    }
}
NominatimSearchSource.id = 'nominatim';
NominatimSearchSource.type = FEATURE;
NominatimSearchSource.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NominatimSearchSource.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: ['options',] }] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9taW5hdGltLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zaGFyZWQvc291cmNlcy9ub21pbmF0aW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFHOUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxPQUFPLEVBQTRCLE1BQU0sa0JBQWtCLENBQUM7QUFHckUsT0FBTyxFQUFFLFlBQVksRUFBYyxNQUFNLFVBQVUsQ0FBQzs7OztBQVFwRCxNQUFNLE9BQU8scUJBQXNCLFNBQVEsWUFBWTs7Ozs7SUFJckQsWUFDVSxJQUFnQixFQUNMLE9BQTRCO1FBRS9DLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUhQLFNBQUksR0FBSixJQUFJLENBQVk7SUFJMUIsQ0FBQzs7OztJQUVELEtBQUs7UUFDSCxPQUFPLHFCQUFxQixDQUFDLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzs7OztJQUVTLGlCQUFpQjtRQUN6QixPQUFPO1lBQ0wsS0FBSyxFQUFFLGlCQUFpQjtZQUN4QixTQUFTLEVBQUUsNENBQTRDO1NBQ3hELENBQUM7SUFDSixDQUFDOzs7Ozs7O0lBT0QsTUFBTSxDQUNKLElBQXdCLEVBQ3hCLE9BQTJCOztjQUVyQixNQUFNLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksRUFBRSxPQUFPLElBQUksRUFBRSxDQUFDO1FBQ25FLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDO2FBQy9CLElBQUksQ0FBQyxHQUFHOzs7O1FBQUMsQ0FBQyxRQUF5QixFQUFFLEVBQUUs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R3BCLHFDQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBGRUFUVVJFLCBGZWF0dXJlLCBGZWF0dXJlR2VvbWV0cnkgfSBmcm9tICcuLi8uLi8uLi9mZWF0dXJlJztcclxuXHJcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCB9IGZyb20gJy4uL3NlYXJjaC5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgU2VhcmNoU291cmNlLCBUZXh0U2VhcmNoIH0gZnJvbSAnLi9zb3VyY2UnO1xyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2VPcHRpb25zLCBUZXh0U2VhcmNoT3B0aW9ucyB9IGZyb20gJy4vc291cmNlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBOb21pbmF0aW1EYXRhIH0gZnJvbSAnLi9ub21pbmF0aW0uaW50ZXJmYWNlcyc7XHJcblxyXG4vKipcclxuICogTm9taW5hdGltIHNlYXJjaCBzb3VyY2VcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5vbWluYXRpbVNlYXJjaFNvdXJjZSBleHRlbmRzIFNlYXJjaFNvdXJjZSBpbXBsZW1lbnRzIFRleHRTZWFyY2gge1xyXG4gIHN0YXRpYyBpZCA9ICdub21pbmF0aW0nO1xyXG4gIHN0YXRpYyB0eXBlID0gRkVBVFVSRTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICBASW5qZWN0KCdvcHRpb25zJykgb3B0aW9uczogU2VhcmNoU291cmNlT3B0aW9uc1xyXG4gICkge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBnZXRJZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIE5vbWluYXRpbVNlYXJjaFNvdXJjZS5pZDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXREZWZhdWx0T3B0aW9ucygpOiBTZWFyY2hTb3VyY2VPcHRpb25zIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiAnTm9taW5hdGltIChPU00pJyxcclxuICAgICAgc2VhcmNoVXJsOiAnaHR0cHM6Ly9ub21pbmF0aW0ub3BlbnN0cmVldG1hcC5vcmcvc2VhcmNoJ1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBhIHBsYWNlIGJ5IG5hbWVcclxuICAgKiBAcGFyYW0gdGVybSBQbGFjZSBuYW1lXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiA8U2VhcmNoUmVzdWx0PEZlYXR1cmU+W11cclxuICAgKi9cclxuICBzZWFyY2goXHJcbiAgICB0ZXJtOiBzdHJpbmcgfCB1bmRlZmluZWQsXHJcbiAgICBvcHRpb25zPzogVGV4dFNlYXJjaE9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdPiB7XHJcbiAgICBjb25zdCBwYXJhbXMgPSB0aGlzLmNvbXB1dGVTZWFyY2hSZXF1ZXN0UGFyYW1zKHRlcm0sIG9wdGlvbnMgfHwge30pO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuZ2V0KHRoaXMuc2VhcmNoVXJsLCB7IHBhcmFtcyB9KVxyXG4gICAgICAucGlwZShtYXAoKHJlc3BvbnNlOiBOb21pbmF0aW1EYXRhW10pID0+IHRoaXMuZXh0cmFjdFJlc3VsdHMocmVzcG9uc2UpKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVTZWFyY2hSZXF1ZXN0UGFyYW1zKFxyXG4gICAgdGVybTogc3RyaW5nLFxyXG4gICAgb3B0aW9uczogVGV4dFNlYXJjaE9wdGlvbnNcclxuICApOiBIdHRwUGFyYW1zIHtcclxuICAgIHJldHVybiBuZXcgSHR0cFBhcmFtcyh7XHJcbiAgICAgIGZyb21PYmplY3Q6IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcTogdGVybSxcclxuICAgICAgICAgIGZvcm1hdDogJ2pzb24nXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0aGlzLnBhcmFtcyxcclxuICAgICAgICBvcHRpb25zLnBhcmFtcyB8fCB7fVxyXG4gICAgICApXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdFJlc3VsdHMocmVzcG9uc2U6IE5vbWluYXRpbURhdGFbXSk6IFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdIHtcclxuICAgIHJldHVybiByZXNwb25zZS5tYXAoKGRhdGE6IE5vbWluYXRpbURhdGEpID0+IHRoaXMuZGF0YVRvUmVzdWx0KGRhdGEpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGF0YVRvUmVzdWx0KGRhdGE6IE5vbWluYXRpbURhdGEpOiBTZWFyY2hSZXN1bHQ8RmVhdHVyZT4ge1xyXG4gICAgY29uc3QgcHJvcGVydGllcyA9IHRoaXMuY29tcHV0ZVByb3BlcnRpZXMoZGF0YSk7XHJcbiAgICBjb25zdCBnZW9tZXRyeSA9IHRoaXMuY29tcHV0ZUdlb21ldHJ5KGRhdGEpO1xyXG4gICAgY29uc3QgZXh0ZW50ID0gdGhpcy5jb21wdXRlRXh0ZW50KGRhdGEpO1xyXG4gICAgY29uc3QgaWQgPSBbdGhpcy5nZXRJZCgpLCAncGxhY2UnLCBkYXRhLnBsYWNlX2lkXS5qb2luKCcuJyk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc291cmNlOiB0aGlzLFxyXG4gICAgICBtZXRhOiB7XHJcbiAgICAgICAgZGF0YVR5cGU6IEZFQVRVUkUsXHJcbiAgICAgICAgaWQsXHJcbiAgICAgICAgdGl0bGU6IGRhdGEuZGlzcGxheV9uYW1lLFxyXG4gICAgICAgIGljb246ICdtYXAtbWFya2VyJ1xyXG4gICAgICB9LFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgdHlwZTogRkVBVFVSRSxcclxuICAgICAgICBwcm9qZWN0aW9uOiAnRVBTRzo0MzI2JyxcclxuICAgICAgICBnZW9tZXRyeSxcclxuICAgICAgICBleHRlbnQsXHJcbiAgICAgICAgcHJvcGVydGllcyxcclxuICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICBpZCxcclxuICAgICAgICAgIHRpdGxlOiBkYXRhLmRpc3BsYXlfbmFtZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZVByb3BlcnRpZXMoZGF0YTogTm9taW5hdGltRGF0YSk6IHsgW2tleTogc3RyaW5nXTogYW55IH0ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZGlzcGxheV9uYW1lOiBkYXRhLmRpc3BsYXlfbmFtZSxcclxuICAgICAgcGxhY2VfaWQ6IGRhdGEucGxhY2VfaWQsXHJcbiAgICAgIG9zbV90eXBlOiBkYXRhLm9zbV90eXBlLFxyXG4gICAgICBjbGFzczogZGF0YS5jbGFzcyxcclxuICAgICAgdHlwZTogZGF0YS50eXBlXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlR2VvbWV0cnkoZGF0YTogTm9taW5hdGltRGF0YSk6IEZlYXR1cmVHZW9tZXRyeSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0eXBlOiAnUG9pbnQnLFxyXG4gICAgICBjb29yZGluYXRlczogW3BhcnNlRmxvYXQoZGF0YS5sb24pLCBwYXJzZUZsb2F0KGRhdGEubGF0KV1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVFeHRlbnQoZGF0YTogTm9taW5hdGltRGF0YSk6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdIHtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIHBhcnNlRmxvYXQoZGF0YS5ib3VuZGluZ2JveFsyXSksXHJcbiAgICAgIHBhcnNlRmxvYXQoZGF0YS5ib3VuZGluZ2JveFswXSksXHJcbiAgICAgIHBhcnNlRmxvYXQoZGF0YS5ib3VuZGluZ2JveFszXSksXHJcbiAgICAgIHBhcnNlRmxvYXQoZGF0YS5ib3VuZGluZ2JveFsxXSlcclxuICAgIF07XHJcbiAgfVxyXG59XHJcbiJdfQ==