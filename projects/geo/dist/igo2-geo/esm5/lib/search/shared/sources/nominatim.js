/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
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
     * @return {?}
     */
    NominatimSearchSource.prototype.getType = /**
     * @return {?}
     */
    function () {
        return NominatimSearchSource.type;
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
    NominatimSearchSource.prototype.getDefaultOptions = /*
       * Source : https://wiki.openstreetmap.org/wiki/Key:amenity
       */
    /**
     * @protected
     * @return {?}
     */
    function () {
        return {
            title: 'Nominatim (OSM)',
            searchUrl: 'https://nominatim.openstreetmap.org/search',
            settings: [
                {
                    type: 'checkbox',
                    title: 'results type',
                    name: 'amenity',
                    values: [
                        {
                            title: 'igo.geo.search.nominatim.type.food',
                            value: 'bar,bbq,biergaten,cafe,drinking_water,fast_food,food_court,ice_cream,pub,restaurant',
                            enabled: false
                        },
                        {
                            title: 'igo.geo.search.nominatim.type.health',
                            value: 'baby_hatch,clinic,dentist,doctors,hospital,nursing_home,pharmacy,social_facility,veterinary',
                            enabled: false
                        },
                        {
                            title: 'igo.geo.search.nominatim.type.entertainment',
                            value: 'arts_centre,brothel,casino,cinema,community_center_fountain,gambling,nightclub,planetarium \
                          ,public_bookcase,social_centre,stripclub,studio,swingerclub,theatre,internet_cafe',
                            enabled: false
                        },
                        {
                            title: 'igo.geo.search.nominatim.type.finance',
                            value: 'atm,bank,bureau_de_change',
                            enabled: false
                        }
                    ]
                },
                {
                    type: 'radiobutton',
                    title: 'results limit',
                    name: 'limit',
                    values: [
                        {
                            title: '10',
                            value: 10,
                            enabled: true
                        },
                        {
                            title: '20',
                            value: 20,
                            enabled: false
                        },
                        {
                            title: '50',
                            value: 50,
                            enabled: false
                        }
                    ]
                },
                {
                    type: 'radiobutton',
                    title: 'restrictExtent',
                    name: 'countrycodes',
                    values: [
                        {
                            title: 'igo.geo.search.nominatim.country.canada',
                            value: 'CA',
                            enabled: true
                        },
                        {
                            title: 'igo.geo.search.nominatim.country.all',
                            value: null,
                            enabled: false
                        }
                    ]
                },
                {
                    type: 'radiobutton',
                    title: 'multiple object',
                    name: 'dedupe',
                    values: [
                        {
                            title: 'igo.geo.search.searchSources.settings.true',
                            value: 0,
                            enabled: false
                        },
                        {
                            title: 'igo.geo.search.searchSources.settings.false',
                            value: 1,
                            enabled: true
                        }
                    ]
                }
            ]
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
        if (!params.get('q')) {
            return of([]);
        }
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
                q: this.computeTerm(term),
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
    /**
     * @private
     * @param {?} term
     * @return {?}
     */
    NominatimSearchSource.prototype.computeTerm = /**
     * @private
     * @param {?} term
     * @return {?}
     */
    function (term) {
        return this.computeTermTags(term);
    };
    /**
     * Add hashtag from query in Nominatim's format (+[])
     * @param term Query with hashtag
     */
    /**
     * Add hashtag from query in Nominatim's format (+[])
     * @private
     * @param {?} term Query with hashtag
     * @return {?}
     */
    NominatimSearchSource.prototype.computeTermTags = /**
     * Add hashtag from query in Nominatim's format (+[])
     * @private
     * @param {?} term Query with hashtag
     * @return {?}
     */
    function (term) {
        /** @type {?} */
        var hashtags = _super.prototype.getHashtagsValid.call(this, term, 'amenity');
        if (!hashtags) {
            return this.computeTermSettings(term);
        }
        if (!hashtags.length) {
            return null;
        }
        term = term.replace(/(#[^\s]*)/g, '');
        hashtags.forEach((/**
         * @param {?} tag
         * @return {?}
         */
        function (tag) {
            term += '+[' + tag + ']';
        }));
        return term;
    };
    /**
     * Add hashtag from settings in Nominatim's format (+[])
     * @param term Query
     */
    /**
     * Add hashtag from settings in Nominatim's format (+[])
     * @private
     * @param {?} term Query
     * @return {?}
     */
    NominatimSearchSource.prototype.computeTermSettings = /**
     * Add hashtag from settings in Nominatim's format (+[])
     * @private
     * @param {?} term Query
     * @return {?}
     */
    function (term) {
        this.options.settings.forEach((/**
         * @param {?} settings
         * @return {?}
         */
        function (settings) {
            if (settings.name === 'amenity') {
                settings.values.forEach((/**
                 * @param {?} conf
                 * @return {?}
                 */
                function (conf) {
                    if (conf.enabled && typeof conf.value === 'string') {
                        /** @type {?} */
                        var splitted = conf.value.split(',');
                        splitted.forEach((/**
                         * @param {?} value
                         * @return {?}
                         */
                        function (value) {
                            term += '+[' + value + ']';
                        }));
                    }
                }));
            }
        }));
        return term;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9taW5hdGltLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zaGFyZWQvc291cmNlcy9ub21pbmF0aW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTlELE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxPQUFPLEVBQTRCLE1BQU0sa0JBQWtCLENBQUM7QUFHckUsT0FBTyxFQUFFLFlBQVksRUFBYyxNQUFNLFVBQVUsQ0FBQzs7OztBQU9wRDtJQUMyQyxpREFBWTtJQUlyRCwrQkFDVSxJQUFnQixFQUNMLE9BQTRCO1FBRmpELFlBSUUsa0JBQU0sT0FBTyxDQUFDLFNBQ2Y7UUFKUyxVQUFJLEdBQUosSUFBSSxDQUFZOztJQUkxQixDQUFDOzs7O0lBRUQscUNBQUs7OztJQUFMO1FBQ0UsT0FBTyxxQkFBcUIsQ0FBQyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7OztJQUVELHVDQUFPOzs7SUFBUDtRQUNFLE9BQU8scUJBQXFCLENBQUMsSUFBSSxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7T0FFRzs7Ozs7Ozs7SUFDTyxpREFBaUI7Ozs7Ozs7SUFBM0I7UUFDRSxPQUFPO1lBQ0wsS0FBSyxFQUFFLGlCQUFpQjtZQUN4QixTQUFTLEVBQUUsNENBQTRDO1lBQ3ZELFFBQVEsRUFBRTtnQkFDUjtvQkFDRSxJQUFJLEVBQUUsVUFBVTtvQkFDaEIsS0FBSyxFQUFFLGNBQWM7b0JBQ3JCLElBQUksRUFBRSxTQUFTO29CQUNmLE1BQU0sRUFBRTt3QkFDTjs0QkFDRSxLQUFLLEVBQUUsb0NBQW9DOzRCQUMz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Uzs7SUF5UHJCLDRCQUFDO0NBQUEsQUFoUUQsQ0FDMkMsWUFBWSxHQStQdEQ7U0EvUFkscUJBQXFCOzs7SUFDaEMseUJBQXdCOztJQUN4QiwyQkFBc0I7Ozs7O0lBR3BCLHFDQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgRkVBVFVSRSwgRmVhdHVyZSwgRmVhdHVyZUdlb21ldHJ5IH0gZnJvbSAnLi4vLi4vLi4vZmVhdHVyZSc7XHJcblxyXG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQgfSBmcm9tICcuLi9zZWFyY2guaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZSwgVGV4dFNlYXJjaCB9IGZyb20gJy4vc291cmNlJztcclxuaW1wb3J0IHsgU2VhcmNoU291cmNlT3B0aW9ucywgVGV4dFNlYXJjaE9wdGlvbnMgfSBmcm9tICcuL3NvdXJjZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgTm9taW5hdGltRGF0YSB9IGZyb20gJy4vbm9taW5hdGltLmludGVyZmFjZXMnO1xyXG5cclxuLyoqXHJcbiAqIE5vbWluYXRpbSBzZWFyY2ggc291cmNlXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOb21pbmF0aW1TZWFyY2hTb3VyY2UgZXh0ZW5kcyBTZWFyY2hTb3VyY2UgaW1wbGVtZW50cyBUZXh0U2VhcmNoIHtcclxuICBzdGF0aWMgaWQgPSAnbm9taW5hdGltJztcclxuICBzdGF0aWMgdHlwZSA9IEZFQVRVUkU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgQEluamVjdCgnb3B0aW9ucycpIG9wdGlvbnM6IFNlYXJjaFNvdXJjZU9wdGlvbnNcclxuICApIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0SWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBOb21pbmF0aW1TZWFyY2hTb3VyY2UuaWQ7XHJcbiAgfVxyXG5cclxuICBnZXRUeXBlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gTm9taW5hdGltU2VhcmNoU291cmNlLnR5cGU7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIFNvdXJjZSA6IGh0dHBzOi8vd2lraS5vcGVuc3RyZWV0bWFwLm9yZy93aWtpL0tleTphbWVuaXR5XHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGdldERlZmF1bHRPcHRpb25zKCk6IFNlYXJjaFNvdXJjZU9wdGlvbnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6ICdOb21pbmF0aW0gKE9TTSknLFxyXG4gICAgICBzZWFyY2hVcmw6ICdodHRwczovL25vbWluYXRpbS5vcGVuc3RyZWV0bWFwLm9yZy9zZWFyY2gnLFxyXG4gICAgICBzZXR0aW5nczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdjaGVja2JveCcsXHJcbiAgICAgICAgICB0aXRsZTogJ3Jlc3VsdHMgdHlwZScsXHJcbiAgICAgICAgICBuYW1lOiAnYW1lbml0eScsXHJcbiAgICAgICAgICB2YWx1ZXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnaWdvLmdlby5zZWFyY2gubm9taW5hdGltLnR5cGUuZm9vZCcsXHJcbiAgICAgICAgICAgICAgdmFsdWU6XHJcbiAgICAgICAgICAgICAgICAnYmFyLGJicSxiaWVyZ2F0ZW4sY2FmZSxkcmlua2luZ193YXRlcixmYXN0X2Zvb2QsZm9vZF9jb3VydCxpY2VfY3JlYW0scHViLHJlc3RhdXJhbnQnLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLm5vbWluYXRpbS50eXBlLmhlYWx0aCcsXHJcbiAgICAgICAgICAgICAgdmFsdWU6XHJcbiAgICAgICAgICAgICAgICAnYmFieV9oYXRjaCxjbGluaWMsZGVudGlzdCxkb2N0b3JzLGhvc3BpdGFsLG51cnNpbmdfaG9tZSxwaGFybWFjeSxzb2NpYWxfZmFjaWxpdHksdmV0ZXJpbmFyeScsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnaWdvLmdlby5zZWFyY2gubm9taW5hdGltLnR5cGUuZW50ZXJ0YWlubWVudCcsXHJcbiAgICAgICAgICAgICAgdmFsdWU6XHJcbiAgICAgICAgICAgICAgICAnYXJ0c19jZW50cmUsYnJvdGhlbCxjYXNpbm8sY2luZW1hLGNvbW11bml0eV9jZW50ZXJfZm91bnRhaW4sZ2FtYmxpbmcsbmlnaHRjbHViLHBsYW5ldGFyaXVtIFxcXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLHB1YmxpY19ib29rY2FzZSxzb2NpYWxfY2VudHJlLHN0cmlwY2x1YixzdHVkaW8sc3dpbmdlcmNsdWIsdGhlYXRyZSxpbnRlcm5ldF9jYWZlJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5ub21pbmF0aW0udHlwZS5maW5hbmNlJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ2F0bSxiYW5rLGJ1cmVhdV9kZV9jaGFuZ2UnLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdyYWRpb2J1dHRvbicsXHJcbiAgICAgICAgICB0aXRsZTogJ3Jlc3VsdHMgbGltaXQnLFxyXG4gICAgICAgICAgbmFtZTogJ2xpbWl0JyxcclxuICAgICAgICAgIHZhbHVlczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICcxMCcsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IDEwLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnMjAnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAyMCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICc1MCcsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IDUwLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdyYWRpb2J1dHRvbicsXHJcbiAgICAgICAgICB0aXRsZTogJ3Jlc3RyaWN0RXh0ZW50JyxcclxuICAgICAgICAgIG5hbWU6ICdjb3VudHJ5Y29kZXMnLFxyXG4gICAgICAgICAgdmFsdWVzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLm5vbWluYXRpbS5jb3VudHJ5LmNhbmFkYScsXHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdDQScsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5ub21pbmF0aW0uY291bnRyeS5hbGwnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBudWxsLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdyYWRpb2J1dHRvbicsXHJcbiAgICAgICAgICB0aXRsZTogJ211bHRpcGxlIG9iamVjdCcsXHJcbiAgICAgICAgICBuYW1lOiAnZGVkdXBlJyxcclxuICAgICAgICAgIHZhbHVlczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5zZWFyY2hTb3VyY2VzLnNldHRpbmdzLnRydWUnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAwLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLnNlYXJjaFNvdXJjZXMuc2V0dGluZ3MuZmFsc2UnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAxLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBhIHBsYWNlIGJ5IG5hbWVcclxuICAgKiBAcGFyYW0gdGVybSBQbGFjZSBuYW1lXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiA8U2VhcmNoUmVzdWx0PEZlYXR1cmU+W11cclxuICAgKi9cclxuICBzZWFyY2goXHJcbiAgICB0ZXJtOiBzdHJpbmcgfCB1bmRlZmluZWQsXHJcbiAgICBvcHRpb25zPzogVGV4dFNlYXJjaE9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdPiB7XHJcbiAgICBjb25zdCBwYXJhbXMgPSB0aGlzLmNvbXB1dGVTZWFyY2hSZXF1ZXN0UGFyYW1zKHRlcm0sIG9wdGlvbnMgfHwge30pO1xyXG4gICAgaWYgKCFwYXJhbXMuZ2V0KCdxJykpIHtcclxuICAgICAgcmV0dXJuIG9mKFtdKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLmdldCh0aGlzLnNlYXJjaFVybCwgeyBwYXJhbXMgfSlcclxuICAgICAgLnBpcGUobWFwKChyZXNwb25zZTogTm9taW5hdGltRGF0YVtdKSA9PiB0aGlzLmV4dHJhY3RSZXN1bHRzKHJlc3BvbnNlKSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlU2VhcmNoUmVxdWVzdFBhcmFtcyhcclxuICAgIHRlcm06IHN0cmluZyxcclxuICAgIG9wdGlvbnM6IFRleHRTZWFyY2hPcHRpb25zXHJcbiAgKTogSHR0cFBhcmFtcyB7XHJcbiAgICByZXR1cm4gbmV3IEh0dHBQYXJhbXMoe1xyXG4gICAgICBmcm9tT2JqZWN0OiBPYmplY3QuYXNzaWduKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHE6IHRoaXMuY29tcHV0ZVRlcm0odGVybSksXHJcbiAgICAgICAgICBmb3JtYXQ6ICdqc29uJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGhpcy5wYXJhbXMsXHJcbiAgICAgICAgb3B0aW9ucy5wYXJhbXMgfHwge31cclxuICAgICAgKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RSZXN1bHRzKHJlc3BvbnNlOiBOb21pbmF0aW1EYXRhW10pOiBTZWFyY2hSZXN1bHQ8RmVhdHVyZT5bXSB7XHJcbiAgICByZXR1cm4gcmVzcG9uc2UubWFwKChkYXRhOiBOb21pbmF0aW1EYXRhKSA9PiB0aGlzLmRhdGFUb1Jlc3VsdChkYXRhKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRhdGFUb1Jlc3VsdChkYXRhOiBOb21pbmF0aW1EYXRhKTogU2VhcmNoUmVzdWx0PEZlYXR1cmU+IHtcclxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSB0aGlzLmNvbXB1dGVQcm9wZXJ0aWVzKGRhdGEpO1xyXG4gICAgY29uc3QgZ2VvbWV0cnkgPSB0aGlzLmNvbXB1dGVHZW9tZXRyeShkYXRhKTtcclxuICAgIGNvbnN0IGV4dGVudCA9IHRoaXMuY29tcHV0ZUV4dGVudChkYXRhKTtcclxuICAgIGNvbnN0IGlkID0gW3RoaXMuZ2V0SWQoKSwgJ3BsYWNlJywgZGF0YS5wbGFjZV9pZF0uam9pbignLicpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNvdXJjZTogdGhpcyxcclxuICAgICAgbWV0YToge1xyXG4gICAgICAgIGRhdGFUeXBlOiBGRUFUVVJFLFxyXG4gICAgICAgIGlkLFxyXG4gICAgICAgIHRpdGxlOiBkYXRhLmRpc3BsYXlfbmFtZSxcclxuICAgICAgICBpY29uOiAnbWFwLW1hcmtlcidcclxuICAgICAgfSxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHR5cGU6IEZFQVRVUkUsXHJcbiAgICAgICAgcHJvamVjdGlvbjogJ0VQU0c6NDMyNicsXHJcbiAgICAgICAgZ2VvbWV0cnksXHJcbiAgICAgICAgZXh0ZW50LFxyXG4gICAgICAgIHByb3BlcnRpZXMsXHJcbiAgICAgICAgbWV0YToge1xyXG4gICAgICAgICAgaWQsXHJcbiAgICAgICAgICB0aXRsZTogZGF0YS5kaXNwbGF5X25hbWVcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVQcm9wZXJ0aWVzKGRhdGE6IE5vbWluYXRpbURhdGEpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGRpc3BsYXlfbmFtZTogZGF0YS5kaXNwbGF5X25hbWUsXHJcbiAgICAgIHBsYWNlX2lkOiBkYXRhLnBsYWNlX2lkLFxyXG4gICAgICBvc21fdHlwZTogZGF0YS5vc21fdHlwZSxcclxuICAgICAgY2xhc3M6IGRhdGEuY2xhc3MsXHJcbiAgICAgIHR5cGU6IGRhdGEudHlwZVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZUdlb21ldHJ5KGRhdGE6IE5vbWluYXRpbURhdGEpOiBGZWF0dXJlR2VvbWV0cnkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdHlwZTogJ1BvaW50JyxcclxuICAgICAgY29vcmRpbmF0ZXM6IFtwYXJzZUZsb2F0KGRhdGEubG9uKSwgcGFyc2VGbG9hdChkYXRhLmxhdCldXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlRXh0ZW50KGRhdGE6IE5vbWluYXRpbURhdGEpOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICBwYXJzZUZsb2F0KGRhdGEuYm91bmRpbmdib3hbMl0pLFxyXG4gICAgICBwYXJzZUZsb2F0KGRhdGEuYm91bmRpbmdib3hbMF0pLFxyXG4gICAgICBwYXJzZUZsb2F0KGRhdGEuYm91bmRpbmdib3hbM10pLFxyXG4gICAgICBwYXJzZUZsb2F0KGRhdGEuYm91bmRpbmdib3hbMV0pXHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlVGVybSh0ZXJtOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuY29tcHV0ZVRlcm1UYWdzKHRlcm0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGhhc2h0YWcgZnJvbSBxdWVyeSBpbiBOb21pbmF0aW0ncyBmb3JtYXQgKCtbXSlcclxuICAgKiBAcGFyYW0gdGVybSBRdWVyeSB3aXRoIGhhc2h0YWdcclxuICAgKi9cclxuICBwcml2YXRlIGNvbXB1dGVUZXJtVGFncyh0ZXJtOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgaGFzaHRhZ3MgPSBzdXBlci5nZXRIYXNodGFnc1ZhbGlkKHRlcm0sICdhbWVuaXR5Jyk7XHJcbiAgICBpZiAoIWhhc2h0YWdzKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvbXB1dGVUZXJtU2V0dGluZ3ModGVybSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFoYXNodGFncy5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgdGVybSA9IHRlcm0ucmVwbGFjZSgvKCNbXlxcc10qKS9nLCAnJyk7XHJcbiAgICBoYXNodGFncy5mb3JFYWNoKHRhZyA9PiB7XHJcbiAgICAgIHRlcm0gKz0gJytbJyArIHRhZyArICddJztcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0ZXJtO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGhhc2h0YWcgZnJvbSBzZXR0aW5ncyBpbiBOb21pbmF0aW0ncyBmb3JtYXQgKCtbXSlcclxuICAgKiBAcGFyYW0gdGVybSBRdWVyeVxyXG4gICAqL1xyXG4gIHByaXZhdGUgY29tcHV0ZVRlcm1TZXR0aW5ncyh0ZXJtOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgdGhpcy5vcHRpb25zLnNldHRpbmdzLmZvckVhY2goc2V0dGluZ3MgPT4ge1xyXG4gICAgICBpZiAoc2V0dGluZ3MubmFtZSA9PT0gJ2FtZW5pdHknKSB7XHJcbiAgICAgICAgc2V0dGluZ3MudmFsdWVzLmZvckVhY2goY29uZiA9PiB7XHJcbiAgICAgICAgICBpZiAoY29uZi5lbmFibGVkICYmIHR5cGVvZiBjb25mLnZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBjb25zdCBzcGxpdHRlZCA9IGNvbmYudmFsdWUuc3BsaXQoJywnKTtcclxuICAgICAgICAgICAgc3BsaXR0ZWQuZm9yRWFjaCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgdGVybSArPSAnK1snICsgdmFsdWUgKyAnXSc7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0ZXJtO1xyXG4gIH1cclxufVxyXG4iXX0=