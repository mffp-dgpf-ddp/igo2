/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
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
     * @return {?}
     */
    getType() {
        return NominatimSearchSource.type;
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
        if (!params.get('q')) {
            return of([]);
        }
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
                q: this.computeTerm(term),
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
    /**
     * @private
     * @param {?} term
     * @return {?}
     */
    computeTerm(term) {
        return this.computeTermTags(term);
    }
    /**
     * Add hashtag from query in Nominatim's format (+[])
     * @private
     * @param {?} term Query with hashtag
     * @return {?}
     */
    computeTermTags(term) {
        /** @type {?} */
        const hashtags = super.getHashtagsValid(term, 'amenity');
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
        tag => {
            term += '+[' + tag + ']';
        }));
        return term;
    }
    /**
     * Add hashtag from settings in Nominatim's format (+[])
     * @private
     * @param {?} term Query
     * @return {?}
     */
    computeTermSettings(term) {
        this.options.settings.forEach((/**
         * @param {?} settings
         * @return {?}
         */
        settings => {
            if (settings.name === 'amenity') {
                settings.values.forEach((/**
                 * @param {?} conf
                 * @return {?}
                 */
                conf => {
                    if (conf.enabled && typeof conf.value === 'string') {
                        /** @type {?} */
                        const splitted = conf.value.split(',');
                        splitted.forEach((/**
                         * @param {?} value
                         * @return {?}
                         */
                        value => {
                            term += '+[' + value + ']';
                        }));
                    }
                }));
            }
        }));
        return term;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9taW5hdGltLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zaGFyZWQvc291cmNlcy9ub21pbmF0aW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFOUQsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLE9BQU8sRUFBNEIsTUFBTSxrQkFBa0IsQ0FBQztBQUdyRSxPQUFPLEVBQUUsWUFBWSxFQUFjLE1BQU0sVUFBVSxDQUFDOzs7O0FBUXBELE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxZQUFZOzs7OztJQUlyRCxZQUNVLElBQWdCLEVBQ0wsT0FBNEI7UUFFL0MsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBSFAsU0FBSSxHQUFKLElBQUksQ0FBWTtJQUkxQixDQUFDOzs7O0lBRUQsS0FBSztRQUNILE9BQU8scUJBQXFCLENBQUMsRUFBRSxDQUFDO0lBQ2xDLENBQUM7Ozs7SUFFRCxPQUFPO1FBQ0wsT0FBTyxxQkFBcUIsQ0FBQyxJQUFJLENBQUM7SUFDcEMsQ0FBQzs7Ozs7Ozs7SUFLUyxpQkFBaUI7UUFDekIsT0FBTztZQUNMLEtBQUssRUFBRSxpQkFBaUI7WUFDeEIsU0FBUyxFQUFFLDRDQUE0QztZQUN2RCxRQUFRLEVBQUU7Z0JBQ1I7b0JBQ0UsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLEtBQUssRUFBRSxjQUFjO29CQUNyQixJQUFJLEVBQUUsU0FBUztvQkFDZixNQUFNLEVBQUU7d0JBQ047NEJBQ0UsS0FBSyxFQUFFLG9DQUFvQzs0QkFDM0MsS0FBSyxFQUNILHFGQUFxRjs0QkFD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QUcsR0FBRyxHQUFHLENBQUM7UUFDM0IsQ0FBQyxFQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7Ozs7SUFNTyxtQkFBbUIsQ0FBQyxJQUFZO1FBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU87Ozs7UUFBQyxRQUFRLENBQUMsRUFBRTtZQUN2QyxJQUFJLFFBQVEsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO2dCQUMvQixRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU87Ozs7Z0JBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQzdCLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFOzs4QkFDNUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzt3QkFDdEMsUUFBUSxDQUFDLE9BQU87Ozs7d0JBQUMsS0FBSyxDQUFDLEVBQUU7NEJBQ3ZCLElBQUksSUFBSSxJQUFJLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQzt3QkFDN0IsQ0FBQyxFQUFDLENBQUM7cUJBQ0o7Z0JBQ0gsQ0FBQyxFQUFDLENBQUM7YUFDSjtRQUNILENBQUMsRUFBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOztBQTdQTSx3QkFBRSxHQUFHLFdBQVcsQ0FBQztBQUNqQiwwQkFBSSxHQUFHLE9BQU8sQ0FBQzs7WUFIdkIsVUFBVTs7OztZQWZGLFVBQVU7NENBc0JkLE1BQU0sU0FBQyxTQUFTOzs7O0lBTG5CLHlCQUF3Qjs7SUFDeEIsMkJBQXNCOzs7OztJQUdwQixxQ0FBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IEZFQVRVUkUsIEZlYXR1cmUsIEZlYXR1cmVHZW9tZXRyeSB9IGZyb20gJy4uLy4uLy4uL2ZlYXR1cmUnO1xyXG5cclxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi4vc2VhcmNoLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2UsIFRleHRTZWFyY2ggfSBmcm9tICcuL3NvdXJjZSc7XHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZU9wdGlvbnMsIFRleHRTZWFyY2hPcHRpb25zIH0gZnJvbSAnLi9zb3VyY2UuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IE5vbWluYXRpbURhdGEgfSBmcm9tICcuL25vbWluYXRpbS5pbnRlcmZhY2VzJztcclxuXHJcbi8qKlxyXG4gKiBOb21pbmF0aW0gc2VhcmNoIHNvdXJjZVxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTm9taW5hdGltU2VhcmNoU291cmNlIGV4dGVuZHMgU2VhcmNoU291cmNlIGltcGxlbWVudHMgVGV4dFNlYXJjaCB7XHJcbiAgc3RhdGljIGlkID0gJ25vbWluYXRpbSc7XHJcbiAgc3RhdGljIHR5cGUgPSBGRUFUVVJFO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIEBJbmplY3QoJ29wdGlvbnMnKSBvcHRpb25zOiBTZWFyY2hTb3VyY2VPcHRpb25zXHJcbiAgKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIGdldElkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gTm9taW5hdGltU2VhcmNoU291cmNlLmlkO1xyXG4gIH1cclxuXHJcbiAgZ2V0VHlwZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIE5vbWluYXRpbVNlYXJjaFNvdXJjZS50eXBlO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBTb3VyY2UgOiBodHRwczovL3dpa2kub3BlbnN0cmVldG1hcC5vcmcvd2lraS9LZXk6YW1lbml0eVxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBnZXREZWZhdWx0T3B0aW9ucygpOiBTZWFyY2hTb3VyY2VPcHRpb25zIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiAnTm9taW5hdGltIChPU00pJyxcclxuICAgICAgc2VhcmNoVXJsOiAnaHR0cHM6Ly9ub21pbmF0aW0ub3BlbnN0cmVldG1hcC5vcmcvc2VhcmNoJyxcclxuICAgICAgc2V0dGluZ3M6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAnY2hlY2tib3gnLFxyXG4gICAgICAgICAgdGl0bGU6ICdyZXN1bHRzIHR5cGUnLFxyXG4gICAgICAgICAgbmFtZTogJ2FtZW5pdHknLFxyXG4gICAgICAgICAgdmFsdWVzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLm5vbWluYXRpbS50eXBlLmZvb2QnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOlxyXG4gICAgICAgICAgICAgICAgJ2JhcixiYnEsYmllcmdhdGVuLGNhZmUsZHJpbmtpbmdfd2F0ZXIsZmFzdF9mb29kLGZvb2RfY291cnQsaWNlX2NyZWFtLHB1YixyZXN0YXVyYW50JyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5ub21pbmF0aW0udHlwZS5oZWFsdGgnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOlxyXG4gICAgICAgICAgICAgICAgJ2JhYnlfaGF0Y2gsY2xpbmljLGRlbnRpc3QsZG9jdG9ycyxob3NwaXRhbCxudXJzaW5nX2hvbWUscGhhcm1hY3ksc29jaWFsX2ZhY2lsaXR5LHZldGVyaW5hcnknLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLm5vbWluYXRpbS50eXBlLmVudGVydGFpbm1lbnQnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOlxyXG4gICAgICAgICAgICAgICAgJ2FydHNfY2VudHJlLGJyb3RoZWwsY2FzaW5vLGNpbmVtYSxjb21tdW5pdHlfY2VudGVyX2ZvdW50YWluLGdhbWJsaW5nLG5pZ2h0Y2x1YixwbGFuZXRhcml1bSBcXFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICxwdWJsaWNfYm9va2Nhc2Usc29jaWFsX2NlbnRyZSxzdHJpcGNsdWIsc3R1ZGlvLHN3aW5nZXJjbHViLHRoZWF0cmUsaW50ZXJuZXRfY2FmZScsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnaWdvLmdlby5zZWFyY2gubm9taW5hdGltLnR5cGUuZmluYW5jZScsXHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdhdG0sYmFuayxidXJlYXVfZGVfY2hhbmdlJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAncmFkaW9idXR0b24nLFxyXG4gICAgICAgICAgdGl0bGU6ICdyZXN1bHRzIGxpbWl0JyxcclxuICAgICAgICAgIG5hbWU6ICdsaW1pdCcsXHJcbiAgICAgICAgICB2YWx1ZXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnMTAnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAxMCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJzIwJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogMjAsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnNTAnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiA1MCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAncmFkaW9idXR0b24nLFxyXG4gICAgICAgICAgdGl0bGU6ICdyZXN0cmljdEV4dGVudCcsXHJcbiAgICAgICAgICBuYW1lOiAnY291bnRyeWNvZGVzJyxcclxuICAgICAgICAgIHZhbHVlczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5ub21pbmF0aW0uY291bnRyeS5jYW5hZGEnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAnQ0EnLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnaWdvLmdlby5zZWFyY2gubm9taW5hdGltLmNvdW50cnkuYWxsJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAncmFkaW9idXR0b24nLFxyXG4gICAgICAgICAgdGl0bGU6ICdtdWx0aXBsZSBvYmplY3QnLFxyXG4gICAgICAgICAgbmFtZTogJ2RlZHVwZScsXHJcbiAgICAgICAgICB2YWx1ZXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnaWdvLmdlby5zZWFyY2guc2VhcmNoU291cmNlcy5zZXR0aW5ncy50cnVlJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogMCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5zZWFyY2hTb3VyY2VzLnNldHRpbmdzLmZhbHNlJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggYSBwbGFjZSBieSBuYW1lXHJcbiAgICogQHBhcmFtIHRlcm0gUGxhY2UgbmFtZVxyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgPFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdXHJcbiAgICovXHJcbiAgc2VhcmNoKFxyXG4gICAgdGVybTogc3RyaW5nIHwgdW5kZWZpbmVkLFxyXG4gICAgb3B0aW9ucz86IFRleHRTZWFyY2hPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxTZWFyY2hSZXN1bHQ8RmVhdHVyZT5bXT4ge1xyXG4gICAgY29uc3QgcGFyYW1zID0gdGhpcy5jb21wdXRlU2VhcmNoUmVxdWVzdFBhcmFtcyh0ZXJtLCBvcHRpb25zIHx8IHt9KTtcclxuICAgIGlmICghcGFyYW1zLmdldCgncScpKSB7XHJcbiAgICAgIHJldHVybiBvZihbXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5nZXQodGhpcy5zZWFyY2hVcmwsIHsgcGFyYW1zIH0pXHJcbiAgICAgIC5waXBlKG1hcCgocmVzcG9uc2U6IE5vbWluYXRpbURhdGFbXSkgPT4gdGhpcy5leHRyYWN0UmVzdWx0cyhyZXNwb25zZSkpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZVNlYXJjaFJlcXVlc3RQYXJhbXMoXHJcbiAgICB0ZXJtOiBzdHJpbmcsXHJcbiAgICBvcHRpb25zOiBUZXh0U2VhcmNoT3B0aW9uc1xyXG4gICk6IEh0dHBQYXJhbXMge1xyXG4gICAgcmV0dXJuIG5ldyBIdHRwUGFyYW1zKHtcclxuICAgICAgZnJvbU9iamVjdDogT2JqZWN0LmFzc2lnbihcclxuICAgICAgICB7XHJcbiAgICAgICAgICBxOiB0aGlzLmNvbXB1dGVUZXJtKHRlcm0pLFxyXG4gICAgICAgICAgZm9ybWF0OiAnanNvbidcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRoaXMucGFyYW1zLFxyXG4gICAgICAgIG9wdGlvbnMucGFyYW1zIHx8IHt9XHJcbiAgICAgIClcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0UmVzdWx0cyhyZXNwb25zZTogTm9taW5hdGltRGF0YVtdKTogU2VhcmNoUmVzdWx0PEZlYXR1cmU+W10ge1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlLm1hcCgoZGF0YTogTm9taW5hdGltRGF0YSkgPT4gdGhpcy5kYXRhVG9SZXN1bHQoZGF0YSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkYXRhVG9SZXN1bHQoZGF0YTogTm9taW5hdGltRGF0YSk6IFNlYXJjaFJlc3VsdDxGZWF0dXJlPiB7XHJcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gdGhpcy5jb21wdXRlUHJvcGVydGllcyhkYXRhKTtcclxuICAgIGNvbnN0IGdlb21ldHJ5ID0gdGhpcy5jb21wdXRlR2VvbWV0cnkoZGF0YSk7XHJcbiAgICBjb25zdCBleHRlbnQgPSB0aGlzLmNvbXB1dGVFeHRlbnQoZGF0YSk7XHJcbiAgICBjb25zdCBpZCA9IFt0aGlzLmdldElkKCksICdwbGFjZScsIGRhdGEucGxhY2VfaWRdLmpvaW4oJy4nKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzb3VyY2U6IHRoaXMsXHJcbiAgICAgIG1ldGE6IHtcclxuICAgICAgICBkYXRhVHlwZTogRkVBVFVSRSxcclxuICAgICAgICBpZCxcclxuICAgICAgICB0aXRsZTogZGF0YS5kaXNwbGF5X25hbWUsXHJcbiAgICAgICAgaWNvbjogJ21hcC1tYXJrZXInXHJcbiAgICAgIH0sXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICB0eXBlOiBGRUFUVVJFLFxyXG4gICAgICAgIHByb2plY3Rpb246ICdFUFNHOjQzMjYnLFxyXG4gICAgICAgIGdlb21ldHJ5LFxyXG4gICAgICAgIGV4dGVudCxcclxuICAgICAgICBwcm9wZXJ0aWVzLFxyXG4gICAgICAgIG1ldGE6IHtcclxuICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgdGl0bGU6IGRhdGEuZGlzcGxheV9uYW1lXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlUHJvcGVydGllcyhkYXRhOiBOb21pbmF0aW1EYXRhKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBkaXNwbGF5X25hbWU6IGRhdGEuZGlzcGxheV9uYW1lLFxyXG4gICAgICBwbGFjZV9pZDogZGF0YS5wbGFjZV9pZCxcclxuICAgICAgb3NtX3R5cGU6IGRhdGEub3NtX3R5cGUsXHJcbiAgICAgIGNsYXNzOiBkYXRhLmNsYXNzLFxyXG4gICAgICB0eXBlOiBkYXRhLnR5cGVcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVHZW9tZXRyeShkYXRhOiBOb21pbmF0aW1EYXRhKTogRmVhdHVyZUdlb21ldHJ5IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHR5cGU6ICdQb2ludCcsXHJcbiAgICAgIGNvb3JkaW5hdGVzOiBbcGFyc2VGbG9hdChkYXRhLmxvbiksIHBhcnNlRmxvYXQoZGF0YS5sYXQpXVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZUV4dGVudChkYXRhOiBOb21pbmF0aW1EYXRhKTogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0ge1xyXG4gICAgcmV0dXJuIFtcclxuICAgICAgcGFyc2VGbG9hdChkYXRhLmJvdW5kaW5nYm94WzJdKSxcclxuICAgICAgcGFyc2VGbG9hdChkYXRhLmJvdW5kaW5nYm94WzBdKSxcclxuICAgICAgcGFyc2VGbG9hdChkYXRhLmJvdW5kaW5nYm94WzNdKSxcclxuICAgICAgcGFyc2VGbG9hdChkYXRhLmJvdW5kaW5nYm94WzFdKVxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZVRlcm0odGVybTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmNvbXB1dGVUZXJtVGFncyh0ZXJtKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBoYXNodGFnIGZyb20gcXVlcnkgaW4gTm9taW5hdGltJ3MgZm9ybWF0ICgrW10pXHJcbiAgICogQHBhcmFtIHRlcm0gUXVlcnkgd2l0aCBoYXNodGFnXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjb21wdXRlVGVybVRhZ3ModGVybTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IGhhc2h0YWdzID0gc3VwZXIuZ2V0SGFzaHRhZ3NWYWxpZCh0ZXJtLCAnYW1lbml0eScpO1xyXG4gICAgaWYgKCFoYXNodGFncykge1xyXG4gICAgICByZXR1cm4gdGhpcy5jb21wdXRlVGVybVNldHRpbmdzKHRlcm0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghaGFzaHRhZ3MubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHRlcm0gPSB0ZXJtLnJlcGxhY2UoLygjW15cXHNdKikvZywgJycpO1xyXG4gICAgaGFzaHRhZ3MuZm9yRWFjaCh0YWcgPT4ge1xyXG4gICAgICB0ZXJtICs9ICcrWycgKyB0YWcgKyAnXSc7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdGVybTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBoYXNodGFnIGZyb20gc2V0dGluZ3MgaW4gTm9taW5hdGltJ3MgZm9ybWF0ICgrW10pXHJcbiAgICogQHBhcmFtIHRlcm0gUXVlcnlcclxuICAgKi9cclxuICBwcml2YXRlIGNvbXB1dGVUZXJtU2V0dGluZ3ModGVybTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHRoaXMub3B0aW9ucy5zZXR0aW5ncy5mb3JFYWNoKHNldHRpbmdzID0+IHtcclxuICAgICAgaWYgKHNldHRpbmdzLm5hbWUgPT09ICdhbWVuaXR5Jykge1xyXG4gICAgICAgIHNldHRpbmdzLnZhbHVlcy5mb3JFYWNoKGNvbmYgPT4ge1xyXG4gICAgICAgICAgaWYgKGNvbmYuZW5hYmxlZCAmJiB0eXBlb2YgY29uZi52YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3BsaXR0ZWQgPSBjb25mLnZhbHVlLnNwbGl0KCcsJyk7XHJcbiAgICAgICAgICAgIHNwbGl0dGVkLmZvckVhY2godmFsdWUgPT4ge1xyXG4gICAgICAgICAgICAgIHRlcm0gKz0gJytbJyArIHZhbHVlICsgJ10nO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdGVybTtcclxuICB9XHJcbn1cclxuIl19