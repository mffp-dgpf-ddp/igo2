/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LanguageService } from '@igo2/core';
import { ObjectUtils } from '@igo2/utils';
import { FEATURE } from '../../../feature';
import { SearchSource } from './source';
export class IChercheSearchResultFormatter {
    /**
     * @param {?} languageService
     */
    constructor(languageService) {
        this.languageService = languageService;
    }
    /**
     * @param {?} result
     * @return {?}
     */
    formatResult(result) {
        return result;
    }
}
IChercheSearchResultFormatter.decorators = [
    { type: Injectable }
];
/** @nocollapse */
IChercheSearchResultFormatter.ctorParameters = () => [
    { type: LanguageService }
];
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
export class IChercheSearchSource extends SearchSource {
    /**
     * @param {?} http
     * @param {?} options
     * @param {?} formatter
     */
    constructor(http, options, formatter) {
        super(options);
        this.http = http;
        this.formatter = formatter;
    }
    /**
     * @return {?}
     */
    getId() {
        return IChercheSearchSource.id;
    }
    /**
     * @protected
     * @return {?}
     */
    getDefaultOptions() {
        return {
            title: 'ICherche Québec',
            searchUrl: 'https://geoegl.msp.gouv.qc.ca/icherche/geocode'
        };
    }
    /**
     * Search a location by name or keyword
     * @param {?} term Location name or keyword
     * @param {?=} options
     * @return {?} Observable of <SearchResult<Feature>[]
     */
    search(term, options) {
        /** @type {?} */
        const params = this.computeRequestParams(term, options || {});
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
    computeRequestParams(term, options) {
        return new HttpParams({
            fromObject: Object.assign({
                q: term,
                geometries: 'geom',
                type: 'adresse,code_postal,route,municipalite,mrc,region_administrative'
            }, this.params, options.params || {})
        });
    }
    /**
     * @private
     * @param {?} response
     * @return {?}
     */
    extractResults(response) {
        return response.features.map((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            return this.formatter.formatResult(this.dataToResult(data));
        }));
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
        const id = [this.getId(), properties.type, data._id].join('.');
        return {
            source: this,
            data: {
                type: FEATURE,
                projection: 'EPSG:4326',
                geometry: data.geometry,
                extent: data.bbox,
                properties,
                meta: {
                    id,
                    title: data.properties.recherche
                }
            },
            meta: {
                dataType: FEATURE,
                id,
                title: data.properties.recherche,
                titleHtml: data.highlight,
                icon: 'map-marker'
            }
        };
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    computeProperties(data) {
        /** @type {?} */
        const properties = ObjectUtils.removeKeys(data.properties, IChercheSearchSource.propertiesBlacklist);
        return Object.assign(properties, { type: data.doc_type });
    }
}
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
IChercheSearchSource.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: ['options',] }] },
    { type: IChercheSearchResultFormatter, decorators: [{ type: Inject, args: [IChercheSearchResultFormatter,] }] }
];
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
export class IChercheReverseSearchSource extends SearchSource {
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
        return IChercheReverseSearchSource.id;
    }
    /**
     * @protected
     * @return {?}
     */
    getDefaultOptions() {
        return {
            title: 'ICherche Québec',
            searchUrl: 'https://geoegl.msp.gouv.qc.ca/icherche/xy'
        };
    }
    /**
     * Search a location by coordinates
     * @param {?} lonLat Location coordinates
     * @param {?=} options
     * @return {?} Observable of <SearchResult<Feature>[]
     */
    reverseSearch(lonLat, options) {
        /** @type {?} */
        const params = this.computeRequestParams(lonLat, options || {});
        return this.http.get(this.searchUrl, { params }).pipe(map((/**
         * @param {?} response
         * @return {?}
         */
        (response) => {
            return this.extractResults(response);
        })));
    }
    /**
     * @private
     * @param {?} lonLat
     * @param {?=} options
     * @return {?}
     */
    computeRequestParams(lonLat, options) {
        /** @type {?} */
        const distance = options.distance;
        return new HttpParams({
            fromObject: Object.assign({
                loc: lonLat.join(','),
                distance: distance ? String(distance) : '',
                geometries: 'geom',
                type: 'adresse,municipalite,mrc,regadmin'
            }, this.params, options.params || {})
        });
    }
    /**
     * @private
     * @param {?} response
     * @return {?}
     */
    extractResults(response) {
        return response.features.map((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            return this.dataToResult(data);
        }));
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
        const extent = this.computeExtent(data);
        /** @type {?} */
        const id = [this.getId(), properties.type, data._id].join('.');
        return {
            source: this,
            data: {
                type: FEATURE,
                projection: 'EPSG:4326',
                geometry: data.geometry,
                extent,
                properties,
                meta: {
                    id,
                    title: data.properties.nom
                }
            },
            meta: {
                dataType: FEATURE,
                id,
                title: data.properties.nom,
                icon: 'map-marker'
            }
        };
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    computeProperties(data) {
        /** @type {?} */
        const properties = ObjectUtils.removeKeys(data.properties, IChercheReverseSearchSource.propertiesBlacklist);
        return Object.assign(properties, { type: data.properties.doc_type });
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    computeExtent(data) {
        return data.bbox
            ? [data.bbox[0], data.bbox[2], data.bbox[1], data.bbox[3]]
            : undefined;
    }
}
IChercheReverseSearchSource.id = 'icherchereverse';
IChercheReverseSearchSource.type = FEATURE;
IChercheReverseSearchSource.propertiesBlacklist = ['doc_type'];
IChercheReverseSearchSource.decorators = [
    { type: Injectable }
];
/** @nocollapse */
IChercheReverseSearchSource.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: ['options',] }] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNoZXJjaGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NoYXJlZC9zb3VyY2VzL2ljaGVyY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRzlELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFMUMsT0FBTyxFQUFFLE9BQU8sRUFBVyxNQUFNLGtCQUFrQixDQUFDO0FBR3BELE9BQU8sRUFBRSxZQUFZLEVBQTZCLE1BQU0sVUFBVSxDQUFDO0FBY25FLE1BQU0sT0FBTyw2QkFBNkI7Ozs7SUFDeEMsWUFBb0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO0lBQUcsQ0FBQzs7Ozs7SUFFeEQsWUFBWSxDQUFDLE1BQTZCO1FBQ3hDLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7OztZQU5GLFVBQVU7Ozs7WUFwQkYsZUFBZTs7Ozs7OztJQXNCVix3REFBd0M7Ozs7O0FBV3RELE1BQU0sT0FBTyxvQkFBcUIsU0FBUSxZQUFZOzs7Ozs7SUFjcEQsWUFDVSxJQUFnQixFQUNMLE9BQTRCLEVBRXZDLFNBQXdDO1FBRWhELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUxQLFNBQUksR0FBSixJQUFJLENBQVk7UUFHaEIsY0FBUyxHQUFULFNBQVMsQ0FBK0I7SUFHbEQsQ0FBQzs7OztJQUVELEtBQUs7UUFDSCxPQUFPLG9CQUFvQixDQUFDLEVBQUUsQ0FBQztJQUNqQyxDQUFDOzs7OztJQUVTLGlCQUFpQjtRQUN6QixPQUFP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UUFBUSxFQUFFLE9BQU87Z0JBQ2pCLEVBQUU7Z0JBQ0YsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRztnQkFDMUIsSUFBSSxFQUFFLFlBQVk7YUFDbkI7U0FDRixDQUFDO0lBQ0osQ0FBQzs7Ozs7O0lBRU8saUJBQWlCLENBQUMsSUFBeUI7O2NBQzNDLFVBQVUsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUN2QyxJQUFJLENBQUMsVUFBVSxFQUNmLDJCQUEyQixDQUFDLG1CQUFtQixDQUNoRDtRQUNELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7Ozs7OztJQUVPLGFBQWEsQ0FBQyxJQUF5QjtRQUM3QyxPQUFPLElBQUksQ0FBQyxJQUFJO1lBQ2QsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxRCxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ2hCLENBQUM7O0FBMUdNLDhCQUFFLEdBQUcsaUJBQWlCLENBQUM7QUFDdkIsZ0NBQUksR0FBRyxPQUFPLENBQUM7QUFDZiwrQ0FBbUIsR0FBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztZQUxyRCxVQUFVOzs7O1lBbEpGLFVBQVU7NENBMkpkLE1BQU0sU0FBQyxTQUFTOzs7O0lBTm5CLCtCQUE4Qjs7SUFDOUIsaUNBQXNCOztJQUN0QixnREFBb0Q7Ozs7O0lBR2xELDJDQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7IE9iamVjdFV0aWxzIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgRkVBVFVSRSwgRmVhdHVyZSB9IGZyb20gJy4uLy4uLy4uL2ZlYXR1cmUnO1xyXG5cclxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi4vc2VhcmNoLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2UsIFRleHRTZWFyY2gsIFJldmVyc2VTZWFyY2ggfSBmcm9tICcuL3NvdXJjZSc7XHJcbmltcG9ydCB7XHJcbiAgU2VhcmNoU291cmNlT3B0aW9ucyxcclxuICBUZXh0U2VhcmNoT3B0aW9ucyxcclxuICBSZXZlcnNlU2VhcmNoT3B0aW9uc1xyXG59IGZyb20gJy4vc291cmNlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQge1xyXG4gIElDaGVyY2hlRGF0YSxcclxuICBJQ2hlcmNoZVJlc3BvbnNlLFxyXG4gIElDaGVyY2hlUmV2ZXJzZURhdGEsXHJcbiAgSUNoZXJjaGVSZXZlcnNlUmVzcG9uc2VcclxufSBmcm9tICcuL2ljaGVyY2hlLmludGVyZmFjZXMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSUNoZXJjaGVTZWFyY2hSZXN1bHRGb3JtYXR0ZXIge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UpIHt9XHJcblxyXG4gIGZvcm1hdFJlc3VsdChyZXN1bHQ6IFNlYXJjaFJlc3VsdDxGZWF0dXJlPik6IFNlYXJjaFJlc3VsdDxGZWF0dXJlPiB7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIElDaGVyY2hlIHNlYXJjaCBzb3VyY2VcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIElDaGVyY2hlU2VhcmNoU291cmNlIGV4dGVuZHMgU2VhcmNoU291cmNlIGltcGxlbWVudHMgVGV4dFNlYXJjaCB7XHJcbiAgc3RhdGljIGlkID0gJ2ljaGVyY2hlJztcclxuICBzdGF0aWMgdHlwZSA9IEZFQVRVUkU7XHJcbiAgc3RhdGljIHByb3BlcnRpZXNCbGFja2xpc3Q6IHN0cmluZ1tdID0gW1xyXG4gICAgJ0B0aW1lc3RhbXAnLFxyXG4gICAgJ0B2ZXJzaW9uJyxcclxuICAgICdyZWNoZXJjaGUnLFxyXG4gICAgJ2lkJyxcclxuICAgICdpZHJ0ZScsXHJcbiAgICAnY290ZScsXHJcbiAgICAnZ2VvbWV0cnknLFxyXG4gICAgJ2Jib3gnXHJcbiAgXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICBASW5qZWN0KCdvcHRpb25zJykgb3B0aW9uczogU2VhcmNoU291cmNlT3B0aW9ucyxcclxuICAgIEBJbmplY3QoSUNoZXJjaGVTZWFyY2hSZXN1bHRGb3JtYXR0ZXIpXHJcbiAgICBwcml2YXRlIGZvcm1hdHRlcjogSUNoZXJjaGVTZWFyY2hSZXN1bHRGb3JtYXR0ZXJcclxuICApIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0SWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBJQ2hlcmNoZVNlYXJjaFNvdXJjZS5pZDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXREZWZhdWx0T3B0aW9ucygpOiBTZWFyY2hTb3VyY2VPcHRpb25zIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiAnSUNoZXJjaGUgUXXDqWJlYycsXHJcbiAgICAgIHNlYXJjaFVybDogJ2h0dHBzOi8vZ2VvZWdsLm1zcC5nb3V2LnFjLmNhL2ljaGVyY2hlL2dlb2NvZGUnXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIGEgbG9jYXRpb24gYnkgbmFtZSBvciBrZXl3b3JkXHJcbiAgICogQHBhcmFtIHRlcm0gTG9jYXRpb24gbmFtZSBvciBrZXl3b3JkXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiA8U2VhcmNoUmVzdWx0PEZlYXR1cmU+W11cclxuICAgKi9cclxuICBzZWFyY2goXHJcbiAgICB0ZXJtOiBzdHJpbmcsXHJcbiAgICBvcHRpb25zPzogVGV4dFNlYXJjaE9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdPiB7XHJcbiAgICBjb25zdCBwYXJhbXMgPSB0aGlzLmNvbXB1dGVSZXF1ZXN0UGFyYW1zKHRlcm0sIG9wdGlvbnMgfHwge30pO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuZ2V0KHRoaXMuc2VhcmNoVXJsLCB7IHBhcmFtcyB9KVxyXG4gICAgICAucGlwZShtYXAoKHJlc3BvbnNlOiBJQ2hlcmNoZVJlc3BvbnNlKSA9PiB0aGlzLmV4dHJhY3RSZXN1bHRzKHJlc3BvbnNlKSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlUmVxdWVzdFBhcmFtcyh0ZXJtOiBzdHJpbmcsIG9wdGlvbnM6IFRleHRTZWFyY2hPcHRpb25zKTogSHR0cFBhcmFtcyB7XHJcbiAgICByZXR1cm4gbmV3IEh0dHBQYXJhbXMoe1xyXG4gICAgICBmcm9tT2JqZWN0OiBPYmplY3QuYXNzaWduKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHE6IHRlcm0sXHJcbiAgICAgICAgICBnZW9tZXRyaWVzOiAnZ2VvbScsXHJcbiAgICAgICAgICB0eXBlOlxyXG4gICAgICAgICAgICAnYWRyZXNzZSxjb2RlX3Bvc3RhbCxyb3V0ZSxtdW5pY2lwYWxpdGUsbXJjLHJlZ2lvbl9hZG1pbmlzdHJhdGl2ZSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRoaXMucGFyYW1zLFxyXG4gICAgICAgIG9wdGlvbnMucGFyYW1zIHx8IHt9XHJcbiAgICAgIClcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0UmVzdWx0cyhyZXNwb25zZTogSUNoZXJjaGVSZXNwb25zZSk6IFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdIHtcclxuICAgIHJldHVybiByZXNwb25zZS5mZWF0dXJlcy5tYXAoKGRhdGE6IElDaGVyY2hlRGF0YSkgPT4ge1xyXG4gICAgICByZXR1cm4gdGhpcy5mb3JtYXR0ZXIuZm9ybWF0UmVzdWx0KHRoaXMuZGF0YVRvUmVzdWx0KGRhdGEpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkYXRhVG9SZXN1bHQoZGF0YTogSUNoZXJjaGVEYXRhKTogU2VhcmNoUmVzdWx0PEZlYXR1cmU+IHtcclxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSB0aGlzLmNvbXB1dGVQcm9wZXJ0aWVzKGRhdGEpO1xyXG4gICAgY29uc3QgaWQgPSBbdGhpcy5nZXRJZCgpLCBwcm9wZXJ0aWVzLnR5cGUsIGRhdGEuX2lkXS5qb2luKCcuJyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzb3VyY2U6IHRoaXMsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICB0eXBlOiBGRUFUVVJFLFxyXG4gICAgICAgIHByb2plY3Rpb246ICdFUFNHOjQzMjYnLFxyXG4gICAgICAgIGdlb21ldHJ5OiBkYXRhLmdlb21ldHJ5LFxyXG4gICAgICAgIGV4dGVudDogZGF0YS5iYm94LFxyXG4gICAgICAgIHByb3BlcnRpZXMsXHJcbiAgICAgICAgbWV0YToge1xyXG4gICAgICAgICAgaWQsXHJcbiAgICAgICAgICB0aXRsZTogZGF0YS5wcm9wZXJ0aWVzLnJlY2hlcmNoZVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgbWV0YToge1xyXG4gICAgICAgIGRhdGFUeXBlOiBGRUFUVVJFLFxyXG4gICAgICAgIGlkLFxyXG4gICAgICAgIHRpdGxlOiBkYXRhLnByb3BlcnRpZXMucmVjaGVyY2hlLFxyXG4gICAgICAgIHRpdGxlSHRtbDogZGF0YS5oaWdobGlnaHQsXHJcbiAgICAgICAgaWNvbjogJ21hcC1tYXJrZXInXHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVQcm9wZXJ0aWVzKGRhdGE6IElDaGVyY2hlRGF0YSk6IHsgW2tleTogc3RyaW5nXTogYW55IH0ge1xyXG4gICAgY29uc3QgcHJvcGVydGllcyA9IE9iamVjdFV0aWxzLnJlbW92ZUtleXMoXHJcbiAgICAgIGRhdGEucHJvcGVydGllcyxcclxuICAgICAgSUNoZXJjaGVTZWFyY2hTb3VyY2UucHJvcGVydGllc0JsYWNrbGlzdFxyXG4gICAgKTtcclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHByb3BlcnRpZXMsIHsgdHlwZTogZGF0YS5kb2NfdHlwZSB9KTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJQ2hlcmNoZVJldmVyc2Ugc2VhcmNoIHNvdXJjZVxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSUNoZXJjaGVSZXZlcnNlU2VhcmNoU291cmNlIGV4dGVuZHMgU2VhcmNoU291cmNlXHJcbiAgaW1wbGVtZW50cyBSZXZlcnNlU2VhcmNoIHtcclxuICBzdGF0aWMgaWQgPSAnaWNoZXJjaGVyZXZlcnNlJztcclxuICBzdGF0aWMgdHlwZSA9IEZFQVRVUkU7XHJcbiAgc3RhdGljIHByb3BlcnRpZXNCbGFja2xpc3Q6IHN0cmluZ1tdID0gWydkb2NfdHlwZSddO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIEBJbmplY3QoJ29wdGlvbnMnKSBvcHRpb25zOiBTZWFyY2hTb3VyY2VPcHRpb25zXHJcbiAgKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIGdldElkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gSUNoZXJjaGVSZXZlcnNlU2VhcmNoU291cmNlLmlkO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldERlZmF1bHRPcHRpb25zKCk6IFNlYXJjaFNvdXJjZU9wdGlvbnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6ICdJQ2hlcmNoZSBRdcOpYmVjJyxcclxuICAgICAgc2VhcmNoVXJsOiAnaHR0cHM6Ly9nZW9lZ2wubXNwLmdvdXYucWMuY2EvaWNoZXJjaGUveHknXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIGEgbG9jYXRpb24gYnkgY29vcmRpbmF0ZXNcclxuICAgKiBAcGFyYW0gbG9uTGF0IExvY2F0aW9uIGNvb3JkaW5hdGVzXHJcbiAgICogQHBhcmFtIGRpc3RhbmNlIFNlYXJjaCByYWlkdXMgYXJvdW5kIGxvbkxhdFxyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgPFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdXHJcbiAgICovXHJcbiAgcmV2ZXJzZVNlYXJjaChcclxuICAgIGxvbkxhdDogW251bWJlciwgbnVtYmVyXSxcclxuICAgIG9wdGlvbnM/OiBSZXZlcnNlU2VhcmNoT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8U2VhcmNoUmVzdWx0PEZlYXR1cmU+W10+IHtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuY29tcHV0ZVJlcXVlc3RQYXJhbXMobG9uTGF0LCBvcHRpb25zIHx8IHt9KTtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuc2VhcmNoVXJsLCB7IHBhcmFtcyB9KS5waXBlKFxyXG4gICAgICBtYXAoKHJlc3BvbnNlOiBJQ2hlcmNoZVJldmVyc2VSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmV4dHJhY3RSZXN1bHRzKHJlc3BvbnNlKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVSZXF1ZXN0UGFyYW1zKFxyXG4gICAgbG9uTGF0OiBbbnVtYmVyLCBudW1iZXJdLFxyXG4gICAgb3B0aW9ucz86IFJldmVyc2VTZWFyY2hPcHRpb25zXHJcbiAgKTogSHR0cFBhcmFtcyB7XHJcbiAgICBjb25zdCBkaXN0YW5jZSA9IG9wdGlvbnMuZGlzdGFuY2U7XHJcbiAgICByZXR1cm4gbmV3IEh0dHBQYXJhbXMoe1xyXG4gICAgICBmcm9tT2JqZWN0OiBPYmplY3QuYXNzaWduKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGxvYzogbG9uTGF0LmpvaW4oJywnKSxcclxuICAgICAgICAgIGRpc3RhbmNlOiBkaXN0YW5jZSA/IFN0cmluZyhkaXN0YW5jZSkgOiAnJyxcclxuICAgICAgICAgIGdlb21ldHJpZXM6ICdnZW9tJyxcclxuICAgICAgICAgIHR5cGU6ICdhZHJlc3NlLG11bmljaXBhbGl0ZSxtcmMscmVnYWRtaW4nXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0aGlzLnBhcmFtcyxcclxuICAgICAgICBvcHRpb25zLnBhcmFtcyB8fCB7fVxyXG4gICAgICApXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdFJlc3VsdHMoXHJcbiAgICByZXNwb25zZTogSUNoZXJjaGVSZXZlcnNlUmVzcG9uc2VcclxuICApOiBTZWFyY2hSZXN1bHQ8RmVhdHVyZT5bXSB7XHJcbiAgICByZXR1cm4gcmVzcG9uc2UuZmVhdHVyZXMubWFwKChkYXRhOiBJQ2hlcmNoZVJldmVyc2VEYXRhKSA9PiB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRhdGFUb1Jlc3VsdChkYXRhKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkYXRhVG9SZXN1bHQoZGF0YTogSUNoZXJjaGVSZXZlcnNlRGF0YSk6IFNlYXJjaFJlc3VsdDxGZWF0dXJlPiB7XHJcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gdGhpcy5jb21wdXRlUHJvcGVydGllcyhkYXRhKTtcclxuICAgIGNvbnN0IGV4dGVudCA9IHRoaXMuY29tcHV0ZUV4dGVudChkYXRhKTtcclxuICAgIGNvbnN0IGlkID0gW3RoaXMuZ2V0SWQoKSwgcHJvcGVydGllcy50eXBlLCBkYXRhLl9pZF0uam9pbignLicpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNvdXJjZTogdGhpcyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHR5cGU6IEZFQVRVUkUsXHJcbiAgICAgICAgcHJvamVjdGlvbjogJ0VQU0c6NDMyNicsXHJcbiAgICAgICAgZ2VvbWV0cnk6IGRhdGEuZ2VvbWV0cnksXHJcbiAgICAgICAgZXh0ZW50LFxyXG4gICAgICAgIHByb3BlcnRpZXMsXHJcbiAgICAgICAgbWV0YToge1xyXG4gICAgICAgICAgaWQsXHJcbiAgICAgICAgICB0aXRsZTogZGF0YS5wcm9wZXJ0aWVzLm5vbVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgbWV0YToge1xyXG4gICAgICAgIGRhdGFUeXBlOiBGRUFUVVJFLFxyXG4gICAgICAgIGlkLFxyXG4gICAgICAgIHRpdGxlOiBkYXRhLnByb3BlcnRpZXMubm9tLFxyXG4gICAgICAgIGljb246ICdtYXAtbWFya2VyJ1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlUHJvcGVydGllcyhkYXRhOiBJQ2hlcmNoZVJldmVyc2VEYXRhKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XHJcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gT2JqZWN0VXRpbHMucmVtb3ZlS2V5cyhcclxuICAgICAgZGF0YS5wcm9wZXJ0aWVzLFxyXG4gICAgICBJQ2hlcmNoZVJldmVyc2VTZWFyY2hTb3VyY2UucHJvcGVydGllc0JsYWNrbGlzdFxyXG4gICAgKTtcclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHByb3BlcnRpZXMsIHsgdHlwZTogZGF0YS5wcm9wZXJ0aWVzLmRvY190eXBlIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlRXh0ZW50KGRhdGE6IElDaGVyY2hlUmV2ZXJzZURhdGEpOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSB8IHVuZGVmaW5lZCB7XHJcbiAgICByZXR1cm4gZGF0YS5iYm94XHJcbiAgICAgID8gW2RhdGEuYmJveFswXSwgZGF0YS5iYm94WzJdLCBkYXRhLmJib3hbMV0sIGRhdGEuYmJveFszXV1cclxuICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==