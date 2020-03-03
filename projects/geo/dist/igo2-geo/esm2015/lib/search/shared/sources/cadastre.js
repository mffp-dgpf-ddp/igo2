/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class CadastreSearchSource extends SearchSource {
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
        return CadastreSearchSource.id;
    }
    /**
     * @return {?}
     */
    getType() {
        return CadastreSearchSource.type;
    }
    /*
       * Source : https://wiki.openstreetmap.org/wiki/Key:amenity
       */
    /**
     * @protected
     * @return {?}
     */
    getDefaultOptions() {
        return {
            title: 'Cadastre (Québec)',
            searchUrl: 'https://carto.cptaq.gouv.qc.ca/php/find_lot_v1.php?'
        };
    }
    /**
     * Search a place by name
     * @param {?} term Place name
     * @param {?=} options
     * @return {?} Observable of <SearchResult<Feature>[]
     */
    search(term, options) {
        term = term.endsWith(',') ? term.slice(0, -1) : term;
        term = term.startsWith(',') ? term.substr(1) : term;
        term = term.replace(/ /g, '');
        /** @type {?} */
        const params = this.computeSearchRequestParams(term, options || {});
        if (!params.get('numero') || !params.get('numero').match(/^[0-9,]+$/g)) {
            return of([]);
        }
        return this.http
            .get(this.searchUrl, { params, responseType: 'text' })
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
                numero: term,
                epsg: '4326'
            }, this.params, options.params || {})
        });
    }
    /**
     * @private
     * @param {?} response
     * @return {?}
     */
    extractResults(response) {
        return response
            .split('<br />')
            .filter((/**
         * @param {?} lot
         * @return {?}
         */
        (lot) => lot.length > 0))
            .map((/**
         * @param {?} lot
         * @return {?}
         */
        (lot) => this.dataToResult(lot)));
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    dataToResult(data) {
        /** @type {?} */
        const lot = data.split(';');
        /** @type {?} */
        const numero = lot[0];
        /** @type {?} */
        const wkt = lot[7];
        /** @type {?} */
        const geometry = this.computeGeometry(wkt);
        /** @type {?} */
        const properties = { NoLot: numero };
        /** @type {?} */
        const id = [this.getId(), 'cadastre', numero].join('.');
        return {
            source: this,
            meta: {
                dataType: FEATURE,
                id,
                title: numero,
                icon: 'map-marker'
            },
            data: {
                type: FEATURE,
                projection: 'EPSG:4326',
                geometry,
                properties,
                meta: {
                    id,
                    title: numero
                }
            }
        };
    }
    /**
     * @private
     * @param {?} wkt
     * @return {?}
     */
    computeGeometry(wkt) {
        /** @type {?} */
        const feature = new olWKT().readFeature(wkt, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:4326'
        });
        return {
            type: feature.getGeometry().getType(),
            coordinates: feature.getGeometry().getCoordinates()
        };
    }
}
CadastreSearchSource.id = 'cadastre';
CadastreSearchSource.type = FEATURE;
CadastreSearchSource.decorators = [
    { type: Injectable }
];
/** @nocollapse */
CadastreSearchSource.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: ['options',] }] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FkYXN0cmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NoYXJlZC9zb3VyY2VzL2NhZGFzdHJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTlELE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sS0FBSyxNQUFNLGVBQWUsQ0FBQztBQUVsQyxPQUFPLEVBQUUsT0FBTyxFQUE0QixNQUFNLGtCQUFrQixDQUFDO0FBR3JFLE9BQU8sRUFBRSxZQUFZLEVBQWMsTUFBTSxVQUFVLENBQUM7Ozs7QUFPcEQsTUFBTSxPQUFPLG9CQUFxQixTQUFRLFlBQVk7Ozs7O0lBSXBELFlBQ1UsSUFBZ0IsRUFDTCxPQUE0QjtRQUUvQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFIUCxTQUFJLEdBQUosSUFBSSxDQUFZO0lBSTFCLENBQUM7Ozs7SUFFRCxLQUFLO1FBQ0gsT0FBTyxvQkFBb0IsQ0FBQyxFQUFFLENBQUM7SUFDakMsQ0FBQzs7OztJQUVELE9BQU87UUFDTCxPQUFPLG9CQUFvQixDQUFDLElBQUksQ0FBQztJQUNuQyxDQUFDOzs7Ozs7OztJQUtTLGlCQUFpQjtRQUN6QixPQUFPO1lBQ0wsS0FBSyxFQUFFLG1CQUFtQjtZQUMxQixTQUFTLEVBQUUscURBQXFEO1NBQ2pFLENBQUM7SUFDSixDQUFDOzs7Ozs7O0lBT0QsTUFBTSxDQUNKLElBQXdCLEVBQ3hCLE9BQTJCO1FBRTNCLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMs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QUssRUFBRSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUU7WUFDM0MsY0FBYyxFQUFFLFdBQVc7WUFDM0IsaUJBQWlCLEVBQUUsV0FBVztTQUMvQixDQUFDO1FBQ0YsT0FBTztZQUNMLElBQUksRUFBRSxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxFQUFFO1lBQ3JDLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxFQUFFO1NBQ3BELENBQUM7SUFDSixDQUFDOztBQS9HTSx1QkFBRSxHQUFHLFVBQVUsQ0FBQztBQUNoQix5QkFBSSxHQUFHLE9BQU8sQ0FBQzs7WUFIdkIsVUFBVTs7OztZQWhCRixVQUFVOzRDQXVCZCxNQUFNLFNBQUMsU0FBUzs7OztJQUxuQix3QkFBdUI7O0lBQ3ZCLDBCQUFzQjs7Ozs7SUFHcEIsb0NBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgb2xXS1QgZnJvbSAnb2wvZm9ybWF0L1dLVCc7XHJcblxyXG5pbXBvcnQgeyBGRUFUVVJFLCBGZWF0dXJlLCBGZWF0dXJlR2VvbWV0cnkgfSBmcm9tICcuLi8uLi8uLi9mZWF0dXJlJztcclxuXHJcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCB9IGZyb20gJy4uL3NlYXJjaC5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgU2VhcmNoU291cmNlLCBUZXh0U2VhcmNoIH0gZnJvbSAnLi9zb3VyY2UnO1xyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2VPcHRpb25zLCBUZXh0U2VhcmNoT3B0aW9ucyB9IGZyb20gJy4vc291cmNlLmludGVyZmFjZXMnO1xyXG5cclxuLyoqXHJcbiAqIENhZGFzdHJlIHNlYXJjaCBzb3VyY2VcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENhZGFzdHJlU2VhcmNoU291cmNlIGV4dGVuZHMgU2VhcmNoU291cmNlIGltcGxlbWVudHMgVGV4dFNlYXJjaCB7XHJcbiAgc3RhdGljIGlkID0gJ2NhZGFzdHJlJztcclxuICBzdGF0aWMgdHlwZSA9IEZFQVRVUkU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgQEluamVjdCgnb3B0aW9ucycpIG9wdGlvbnM6IFNlYXJjaFNvdXJjZU9wdGlvbnNcclxuICApIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0SWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBDYWRhc3RyZVNlYXJjaFNvdXJjZS5pZDtcclxuICB9XHJcblxyXG4gIGdldFR5cGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBDYWRhc3RyZVNlYXJjaFNvdXJjZS50eXBlO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBTb3VyY2UgOiBodHRwczovL3dpa2kub3BlbnN0cmVldG1hcC5vcmcvd2lraS9LZXk6YW1lbml0eVxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBnZXREZWZhdWx0T3B0aW9ucygpOiBTZWFyY2hTb3VyY2VPcHRpb25zIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiAnQ2FkYXN0cmUgKFF1w6liZWMpJyxcclxuICAgICAgc2VhcmNoVXJsOiAnaHR0cHM6Ly9jYXJ0by5jcHRhcS5nb3V2LnFjLmNhL3BocC9maW5kX2xvdF92MS5waHA/J1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBhIHBsYWNlIGJ5IG5hbWVcclxuICAgKiBAcGFyYW0gdGVybSBQbGFjZSBuYW1lXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiA8U2VhcmNoUmVzdWx0PEZlYXR1cmU+W11cclxuICAgKi9cclxuICBzZWFyY2goXHJcbiAgICB0ZXJtOiBzdHJpbmcgfCB1bmRlZmluZWQsXHJcbiAgICBvcHRpb25zPzogVGV4dFNlYXJjaE9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdPiB7XHJcbiAgICB0ZXJtID0gdGVybS5lbmRzV2l0aCgnLCcpID8gdGVybS5zbGljZSgwLCAtMSkgOiB0ZXJtO1xyXG4gICAgdGVybSA9IHRlcm0uc3RhcnRzV2l0aCgnLCcpID8gdGVybS5zdWJzdHIoMSkgOiB0ZXJtO1xyXG4gICAgdGVybSA9IHRlcm0ucmVwbGFjZSgvIC9nLCAnJyk7XHJcblxyXG4gICAgY29uc3QgcGFyYW1zID0gdGhpcy5jb21wdXRlU2VhcmNoUmVxdWVzdFBhcmFtcyh0ZXJtLCBvcHRpb25zIHx8IHt9KTtcclxuICAgIGlmICghcGFyYW1zLmdldCgnbnVtZXJvJykgfHwgIXBhcmFtcy5nZXQoJ251bWVybycpLm1hdGNoKC9eWzAtOSxdKyQvZykpIHtcclxuICAgICAgcmV0dXJuIG9mKFtdKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLmdldCh0aGlzLnNlYXJjaFVybCwgeyBwYXJhbXMsIHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pXHJcbiAgICAgIC5waXBlKG1hcCgocmVzcG9uc2U6IHN0cmluZykgPT4gdGhpcy5leHRyYWN0UmVzdWx0cyhyZXNwb25zZSkpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZVNlYXJjaFJlcXVlc3RQYXJhbXMoXHJcbiAgICB0ZXJtOiBzdHJpbmcsXHJcbiAgICBvcHRpb25zOiBUZXh0U2VhcmNoT3B0aW9uc1xyXG4gICk6IEh0dHBQYXJhbXMge1xyXG4gICAgcmV0dXJuIG5ldyBIdHRwUGFyYW1zKHtcclxuICAgICAgZnJvbU9iamVjdDogT2JqZWN0LmFzc2lnbihcclxuICAgICAgICB7XHJcbiAgICAgICAgICBudW1lcm86IHRlcm0sXHJcbiAgICAgICAgICBlcHNnOiAnNDMyNidcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRoaXMucGFyYW1zLFxyXG4gICAgICAgIG9wdGlvbnMucGFyYW1zIHx8IHt9XHJcbiAgICAgIClcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0UmVzdWx0cyhyZXNwb25zZTogc3RyaW5nKTogU2VhcmNoUmVzdWx0PEZlYXR1cmU+W10ge1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlXHJcbiAgICAgIC5zcGxpdCgnPGJyIC8+JylcclxuICAgICAgLmZpbHRlcigobG90OiBzdHJpbmcpID0+IGxvdC5sZW5ndGggPiAwKVxyXG4gICAgICAubWFwKChsb3Q6IHN0cmluZykgPT4gdGhpcy5kYXRhVG9SZXN1bHQobG90KSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRhdGFUb1Jlc3VsdChkYXRhOiBzdHJpbmcpOiBTZWFyY2hSZXN1bHQ8RmVhdHVyZT4ge1xyXG4gICAgY29uc3QgbG90ID0gZGF0YS5zcGxpdCgnOycpO1xyXG4gICAgY29uc3QgbnVtZXJvID0gbG90WzBdO1xyXG4gICAgY29uc3Qgd2t0ID0gbG90WzddO1xyXG4gICAgY29uc3QgZ2VvbWV0cnkgPSB0aGlzLmNvbXB1dGVHZW9tZXRyeSh3a3QpO1xyXG4gICAgY29uc3QgcHJvcGVydGllcyA9IHsgTm9Mb3Q6IG51bWVybyB9O1xyXG4gICAgY29uc3QgaWQgPSBbdGhpcy5nZXRJZCgpLCAnY2FkYXN0cmUnLCBudW1lcm9dLmpvaW4oJy4nKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzb3VyY2U6IHRoaXMsXHJcbiAgICAgIG1ldGE6IHtcclxuICAgICAgICBkYXRhVHlwZTogRkVBVFVSRSxcclxuICAgICAgICBpZCxcclxuICAgICAgICB0aXRsZTogbnVtZXJvLFxyXG4gICAgICAgIGljb246ICdtYXAtbWFya2VyJ1xyXG4gICAgICB9LFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgdHlwZTogRkVBVFVSRSxcclxuICAgICAgICBwcm9qZWN0aW9uOiAnRVBTRzo0MzI2JyxcclxuICAgICAgICBnZW9tZXRyeSxcclxuICAgICAgICBwcm9wZXJ0aWVzLFxyXG4gICAgICAgIG1ldGE6IHtcclxuICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgdGl0bGU6IG51bWVyb1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZUdlb21ldHJ5KHdrdDogc3RyaW5nKTogRmVhdHVyZUdlb21ldHJ5IHtcclxuICAgIGNvbnN0IGZlYXR1cmUgPSBuZXcgb2xXS1QoKS5yZWFkRmVhdHVyZSh3a3QsIHtcclxuICAgICAgZGF0YVByb2plY3Rpb246ICdFUFNHOjQzMjYnLFxyXG4gICAgICBmZWF0dXJlUHJvamVjdGlvbjogJ0VQU0c6NDMyNidcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdHlwZTogZmVhdHVyZS5nZXRHZW9tZXRyeSgpLmdldFR5cGUoKSxcclxuICAgICAgY29vcmRpbmF0ZXM6IGZlYXR1cmUuZ2V0R2VvbWV0cnkoKS5nZXRDb29yZGluYXRlcygpXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=