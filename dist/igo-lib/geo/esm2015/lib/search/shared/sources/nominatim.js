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
                            title: 'Restauration',
                            value: 'bar,bbq,biergaten,cafe,drinking_water,fast_food,food_court,ice_cream,pub,restaurant',
                            enabled: false
                        },
                        {
                            title: 'Santé',
                            value: 'baby_hatch,clinic,dentist,doctors,hospital,nursing_home,pharmacy,social_facility,veterinary',
                            enabled: false
                        },
                        {
                            title: 'Divertissement',
                            value: 'arts_centre,brothel,casino,cinema,community_center_fountain,gambling,nightclub,planetarium \
                          ,public_bookcase,social_centre,stripclub,studio,swingerclub,theatre,internet_cafe',
                            enabled: false
                        },
                        {
                            title: 'Finance',
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
                    title: 'country limitation',
                    name: 'countrycodes',
                    values: [
                        {
                            title: 'Canada',
                            value: 'CA',
                            enabled: true
                        },
                        {
                            title: 'Le monde',
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
                            title: 'Oui',
                            value: 0,
                            enabled: false
                        },
                        {
                            title: 'Non',
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
        term = this.computeTermTags(term);
        return term;
    }
    /**
     * Add hashtag from query in Nominatim's format (+[])
     * @private
     * @param {?} term Query with hashtag
     * @return {?}
     */
    computeTermTags(term) {
        /** @type {?} */
        const tags = term.match(/(#[^\s]+)/g);
        /** @type {?} */
        let addTagsFromSettings = true;
        if (tags) {
            tags.forEach((/**
             * @param {?} value
             * @return {?}
             */
            value => {
                term = term.replace(value, '');
                if (super.hashtagValid(super.getSettingsValues('amenity'), value)) {
                    term += '+[' + value.substring(1) + ']';
                    addTagsFromSettings = false;
                }
            }));
            addTagsFromSettings = false;
        }
        if (addTagsFromSettings) {
            term = this.computeTermSettings(term);
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9taW5hdGltLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zaGFyZWQvc291cmNlcy9ub21pbmF0aW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFHOUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxPQUFPLEVBQTRCLE1BQU0sa0JBQWtCLENBQUM7QUFHckUsT0FBTyxFQUFFLFlBQVksRUFBYyxNQUFNLFVBQVUsQ0FBQzs7OztBQVFwRCxNQUFNLE9BQU8scUJBQXNCLFNBQVEsWUFBWTs7Ozs7SUFJckQsWUFDVSxJQUFnQixFQUNMLE9BQTRCO1FBRS9DLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUhQLFNBQUksR0FBSixJQUFJLENBQVk7SUFJMUIsQ0FBQzs7OztJQUVELEtBQUs7UUFDSCxPQUFPLHFCQUFxQixDQUFDLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzs7Ozs7OztJQUtTLGlCQUFpQjtRQUN6QixPQUFPO1lBQ0wsS0FBSyxFQUFFLGlCQUFpQjtZQUN4QixTQUFTLEVBQUUsNENBQTRDO1lBQ3ZELFFBQVEsRUFBRTtnQkFDUjtvQkFDSSxJQUFJLEVBQUUsVUFBVTtvQkFDaEIsS0FBSyxFQUFFLGNBQWM7b0JBQ3JCLElBQUksRUFBRSxTQUFTO29CQUNmLE1BQU0sRUFBRTt3QkFDTjs0QkFDRSxLQUFLLEVBQUUsY0FBYzs0QkFDckIsS0FBSyxFQUFFLHFGQUFxRjs0QkFDNUYsT0FBTyxFQUFFLEtBQUs7eUJBQ2Y7d0JBQ0Q7NEJBQ0UsS0FBSyxFQUFFLE9BQU87NEJBQ2QsS0FBSyxFQUFFLDZGQUE2Rjs0QkFDcEcsT0FBTyxFQUFFLEtBQUs7eUJB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Q0FBQztTQUN2QztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7OztJQU1PLG1CQUFtQixDQUFDLElBQVk7UUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTzs7OztRQUFFLFFBQVEsQ0FBQyxFQUFFO1lBQ3hDLElBQUksUUFBUSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7Z0JBQy9CLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTzs7OztnQkFBRSxJQUFJLENBQUMsRUFBRTtvQkFDOUIsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUU7OzhCQUM1QyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO3dCQUN0QyxRQUFRLENBQUMsT0FBTzs7Ozt3QkFBRSxLQUFLLENBQUMsRUFBRTs0QkFDeEIsSUFBSSxJQUFJLElBQUksR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDO3dCQUM3QixDQUFDLEVBQUMsQ0FBQztxQkFDSjtnQkFDSCxDQUFDLEVBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7O0FBdlBNLHdCQUFFLEdBQUcsV0FBVyxDQUFDO0FBQ2pCLDBCQUFJLEdBQUcsT0FBTyxDQUFDOztZQUh2QixVQUFVOzs7O1lBZkYsVUFBVTs0Q0FzQmQsTUFBTSxTQUFDLFNBQVM7Ozs7SUFMbkIseUJBQXdCOztJQUN4QiwyQkFBc0I7Ozs7O0lBR3BCLHFDQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBGRUFUVVJFLCBGZWF0dXJlLCBGZWF0dXJlR2VvbWV0cnkgfSBmcm9tICcuLi8uLi8uLi9mZWF0dXJlJztcclxuXHJcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCB9IGZyb20gJy4uL3NlYXJjaC5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgU2VhcmNoU291cmNlLCBUZXh0U2VhcmNoIH0gZnJvbSAnLi9zb3VyY2UnO1xyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2VPcHRpb25zLCBUZXh0U2VhcmNoT3B0aW9ucywgU2VhcmNoU291cmNlU2V0dGluZ3MgfSBmcm9tICcuL3NvdXJjZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgTm9taW5hdGltRGF0YSB9IGZyb20gJy4vbm9taW5hdGltLmludGVyZmFjZXMnO1xyXG5cclxuLyoqXHJcbiAqIE5vbWluYXRpbSBzZWFyY2ggc291cmNlXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOb21pbmF0aW1TZWFyY2hTb3VyY2UgZXh0ZW5kcyBTZWFyY2hTb3VyY2UgaW1wbGVtZW50cyBUZXh0U2VhcmNoIHtcclxuICBzdGF0aWMgaWQgPSAnbm9taW5hdGltJztcclxuICBzdGF0aWMgdHlwZSA9IEZFQVRVUkU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgQEluamVjdCgnb3B0aW9ucycpIG9wdGlvbnM6IFNlYXJjaFNvdXJjZU9wdGlvbnNcclxuICApIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0SWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBOb21pbmF0aW1TZWFyY2hTb3VyY2UuaWQ7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIFNvdXJjZSA6IGh0dHBzOi8vd2lraS5vcGVuc3RyZWV0bWFwLm9yZy93aWtpL0tleTphbWVuaXR5XHJcbiAgKi9cclxuICBwcm90ZWN0ZWQgZ2V0RGVmYXVsdE9wdGlvbnMoKTogU2VhcmNoU291cmNlT3B0aW9ucyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0aXRsZTogJ05vbWluYXRpbSAoT1NNKScsXHJcbiAgICAgIHNlYXJjaFVybDogJ2h0dHBzOi8vbm9taW5hdGltLm9wZW5zdHJlZXRtYXAub3JnL3NlYXJjaCcsXHJcbiAgICAgIHNldHRpbmdzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eXBlOiAnY2hlY2tib3gnLFxyXG4gICAgICAgICAgICB0aXRsZTogJ3Jlc3VsdHMgdHlwZScsXHJcbiAgICAgICAgICAgIG5hbWU6ICdhbWVuaXR5JyxcclxuICAgICAgICAgICAgdmFsdWVzOiBbXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICdSZXN0YXVyYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6ICdiYXIsYmJxLGJpZXJnYXRlbixjYWZlLGRyaW5raW5nX3dhdGVyLGZhc3RfZm9vZCxmb29kX2NvdXJ0LGljZV9jcmVhbSxwdWIscmVzdGF1cmFudCcsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICdTYW50w6knLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6ICdiYWJ5X2hhdGNoLGNsaW5pYyxkZW50aXN0LGRvY3RvcnMsaG9zcGl0YWwsbnVyc2luZ19ob21lLHBoYXJtYWN5LHNvY2lhbF9mYWNpbGl0eSx2ZXRlcmluYXJ5JyxcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0RpdmVydGlzc2VtZW50JyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAnYXJ0c19jZW50cmUsYnJvdGhlbCxjYXNpbm8sY2luZW1hLGNvbW11bml0eV9jZW50ZXJfZm91bnRhaW4sZ2FtYmxpbmcsbmlnaHRjbHViLHBsYW5ldGFyaXVtIFxcXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLHB1YmxpY19ib29rY2FzZSxzb2NpYWxfY2VudHJlLHN0cmlwY2x1YixzdHVkaW8sc3dpbmdlcmNsdWIsdGhlYXRyZSxpbnRlcm5ldF9jYWZlJyxcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0ZpbmFuY2UnLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6ICdhdG0sYmFuayxidXJlYXVfZGVfY2hhbmdlJyxcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAncmFkaW9idXR0b24nLFxyXG4gICAgICAgICAgdGl0bGU6ICdyZXN1bHRzIGxpbWl0JyxcclxuICAgICAgICAgIG5hbWU6ICdsaW1pdCcsXHJcbiAgICAgICAgICB2YWx1ZXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnMTAnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAxMCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJzIwJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogMjAsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnNTAnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiA1MCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAncmFkaW9idXR0b24nLFxyXG4gICAgICAgICAgdGl0bGU6ICdjb3VudHJ5IGxpbWl0YXRpb24nLFxyXG4gICAgICAgICAgbmFtZTogJ2NvdW50cnljb2RlcycsXHJcbiAgICAgICAgICB2YWx1ZXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnQ2FuYWRhJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ0NBJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ0xlIG1vbmRlJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAncmFkaW9idXR0b24nLFxyXG4gICAgICAgICAgdGl0bGU6ICdtdWx0aXBsZSBvYmplY3QnLFxyXG4gICAgICAgICAgbmFtZTogJ2RlZHVwZScsXHJcbiAgICAgICAgICB2YWx1ZXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnT3VpJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogMCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdOb24nLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAxLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBhIHBsYWNlIGJ5IG5hbWVcclxuICAgKiBAcGFyYW0gdGVybSBQbGFjZSBuYW1lXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiA8U2VhcmNoUmVzdWx0PEZlYXR1cmU+W11cclxuICAgKi9cclxuICBzZWFyY2goXHJcbiAgICB0ZXJtOiBzdHJpbmcgfCB1bmRlZmluZWQsXHJcbiAgICBvcHRpb25zPzogVGV4dFNlYXJjaE9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdPiB7XHJcbiAgICBjb25zdCBwYXJhbXMgPSB0aGlzLmNvbXB1dGVTZWFyY2hSZXF1ZXN0UGFyYW1zKHRlcm0sIG9wdGlvbnMgfHwge30pO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuZ2V0KHRoaXMuc2VhcmNoVXJsLCB7IHBhcmFtcyB9KVxyXG4gICAgICAucGlwZShtYXAoKHJlc3BvbnNlOiBOb21pbmF0aW1EYXRhW10pID0+IHRoaXMuZXh0cmFjdFJlc3VsdHMocmVzcG9uc2UpKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVTZWFyY2hSZXF1ZXN0UGFyYW1zKFxyXG4gICAgdGVybTogc3RyaW5nLFxyXG4gICAgb3B0aW9uczogVGV4dFNlYXJjaE9wdGlvbnNcclxuICApOiBIdHRwUGFyYW1zIHtcclxuICAgIHJldHVybiBuZXcgSHR0cFBhcmFtcyh7XHJcbiAgICAgIGZyb21PYmplY3Q6IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcTogdGhpcy5jb21wdXRlVGVybSh0ZXJtKSxcclxuICAgICAgICAgIGZvcm1hdDogJ2pzb24nXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0aGlzLnBhcmFtcyxcclxuICAgICAgICBvcHRpb25zLnBhcmFtcyB8fCB7fVxyXG4gICAgICApXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdFJlc3VsdHMocmVzcG9uc2U6IE5vbWluYXRpbURhdGFbXSk6IFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdIHtcclxuICAgIHJldHVybiByZXNwb25zZS5tYXAoKGRhdGE6IE5vbWluYXRpbURhdGEpID0+IHRoaXMuZGF0YVRvUmVzdWx0KGRhdGEpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGF0YVRvUmVzdWx0KGRhdGE6IE5vbWluYXRpbURhdGEpOiBTZWFyY2hSZXN1bHQ8RmVhdHVyZT4ge1xyXG4gICAgY29uc3QgcHJvcGVydGllcyA9IHRoaXMuY29tcHV0ZVByb3BlcnRpZXMoZGF0YSk7XHJcbiAgICBjb25zdCBnZW9tZXRyeSA9IHRoaXMuY29tcHV0ZUdlb21ldHJ5KGRhdGEpO1xyXG4gICAgY29uc3QgZXh0ZW50ID0gdGhpcy5jb21wdXRlRXh0ZW50KGRhdGEpO1xyXG4gICAgY29uc3QgaWQgPSBbdGhpcy5nZXRJZCgpLCAncGxhY2UnLCBkYXRhLnBsYWNlX2lkXS5qb2luKCcuJyk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc291cmNlOiB0aGlzLFxyXG4gICAgICBtZXRhOiB7XHJcbiAgICAgICAgZGF0YVR5cGU6IEZFQVRVUkUsXHJcbiAgICAgICAgaWQsXHJcbiAgICAgICAgdGl0bGU6IGRhdGEuZGlzcGxheV9uYW1lLFxyXG4gICAgICAgIGljb246ICdtYXAtbWFya2VyJ1xyXG4gICAgICB9LFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgdHlwZTogRkVBVFVSRSxcclxuICAgICAgICBwcm9qZWN0aW9uOiAnRVBTRzo0MzI2JyxcclxuICAgICAgICBnZW9tZXRyeSxcclxuICAgICAgICBleHRlbnQsXHJcbiAgICAgICAgcHJvcGVydGllcyxcclxuICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICBpZCxcclxuICAgICAgICAgIHRpdGxlOiBkYXRhLmRpc3BsYXlfbmFtZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZVByb3BlcnRpZXMoZGF0YTogTm9taW5hdGltRGF0YSk6IHsgW2tleTogc3RyaW5nXTogYW55IH0ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZGlzcGxheV9uYW1lOiBkYXRhLmRpc3BsYXlfbmFtZSxcclxuICAgICAgcGxhY2VfaWQ6IGRhdGEucGxhY2VfaWQsXHJcbiAgICAgIG9zbV90eXBlOiBkYXRhLm9zbV90eXBlLFxyXG4gICAgICBjbGFzczogZGF0YS5jbGFzcyxcclxuICAgICAgdHlwZTogZGF0YS50eXBlXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlR2VvbWV0cnkoZGF0YTogTm9taW5hdGltRGF0YSk6IEZlYXR1cmVHZW9tZXRyeSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0eXBlOiAnUG9pbnQnLFxyXG4gICAgICBjb29yZGluYXRlczogW3BhcnNlRmxvYXQoZGF0YS5sb24pLCBwYXJzZUZsb2F0KGRhdGEubGF0KV1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVFeHRlbnQoZGF0YTogTm9taW5hdGltRGF0YSk6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdIHtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIHBhcnNlRmxvYXQoZGF0YS5ib3VuZGluZ2JveFsyXSksXHJcbiAgICAgIHBhcnNlRmxvYXQoZGF0YS5ib3VuZGluZ2JveFswXSksXHJcbiAgICAgIHBhcnNlRmxvYXQoZGF0YS5ib3VuZGluZ2JveFszXSksXHJcbiAgICAgIHBhcnNlRmxvYXQoZGF0YS5ib3VuZGluZ2JveFsxXSlcclxuICAgIF07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVUZXJtKHRlcm06IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICB0ZXJtID0gdGhpcy5jb21wdXRlVGVybVRhZ3ModGVybSk7XHJcbiAgICByZXR1cm4gdGVybTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBoYXNodGFnIGZyb20gcXVlcnkgaW4gTm9taW5hdGltJ3MgZm9ybWF0ICgrW10pXHJcbiAgICogQHBhcmFtIHRlcm0gUXVlcnkgd2l0aCBoYXNodGFnXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjb21wdXRlVGVybVRhZ3ModGVybTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHRhZ3MgPSB0ZXJtLm1hdGNoKC8oI1teXFxzXSspL2cpO1xyXG5cclxuICAgIGxldCBhZGRUYWdzRnJvbVNldHRpbmdzID0gdHJ1ZTtcclxuICAgIGlmICggdGFncyApIHtcclxuICAgICAgdGFncy5mb3JFYWNoKCB2YWx1ZSA9PiB7XHJcbiAgICAgICAgdGVybSA9IHRlcm0ucmVwbGFjZSh2YWx1ZSwgJycpO1xyXG4gICAgICAgIGlmICggc3VwZXIuaGFzaHRhZ1ZhbGlkKHN1cGVyLmdldFNldHRpbmdzVmFsdWVzKCdhbWVuaXR5JyksIHZhbHVlKSApIHtcclxuICAgICAgICAgIHRlcm0gKz0gJytbJyArIHZhbHVlLnN1YnN0cmluZygxKSArICddJztcclxuICAgICAgICAgIGFkZFRhZ3NGcm9tU2V0dGluZ3MgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBhZGRUYWdzRnJvbVNldHRpbmdzID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGFkZFRhZ3NGcm9tU2V0dGluZ3MpIHtcclxuICAgICAgdGVybSA9IHRoaXMuY29tcHV0ZVRlcm1TZXR0aW5ncyh0ZXJtKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0ZXJtO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGhhc2h0YWcgZnJvbSBzZXR0aW5ncyBpbiBOb21pbmF0aW0ncyBmb3JtYXQgKCtbXSlcclxuICAgKiBAcGFyYW0gdGVybSBRdWVyeVxyXG4gICAqL1xyXG4gIHByaXZhdGUgY29tcHV0ZVRlcm1TZXR0aW5ncyh0ZXJtOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgdGhpcy5vcHRpb25zLnNldHRpbmdzLmZvckVhY2goIHNldHRpbmdzID0+IHtcclxuICAgICAgaWYgKHNldHRpbmdzLm5hbWUgPT09ICdhbWVuaXR5JynCoHtcclxuICAgICAgICBzZXR0aW5ncy52YWx1ZXMuZm9yRWFjaCggY29uZiA9PiB7XHJcbiAgICAgICAgICBpZiAoY29uZi5lbmFibGVkICYmIHR5cGVvZiBjb25mLnZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBjb25zdCBzcGxpdHRlZCA9IGNvbmYudmFsdWUuc3BsaXQoJywnKTtcclxuICAgICAgICAgICAgc3BsaXR0ZWQuZm9yRWFjaCggdmFsdWUgPT4ge1xyXG4gICAgICAgICAgICAgIHRlcm0gKz0gJytbJyArIHZhbHVlICsgJ10nO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdGVybTtcclxuICB9XHJcbn1cclxuIl19