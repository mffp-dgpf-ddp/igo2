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
import { GoogleLinks } from './../../../utils/googleLinks';
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
            searchUrl: 'https://geoegl.msp.gouv.qc.ca/apis/icherche/geocode',
            settings: [
                {
                    type: 'checkbox',
                    title: 'results type',
                    name: 'type',
                    values: [
                        {
                            title: 'Adresse',
                            value: 'adresses',
                            enabled: true
                        },
                        // {
                        //   title: 'Ancienne adresse',
                        //   value: 'ancienne_adresse',
                        //   enabled: true
                        // },
                        {
                            title: 'Code Postal',
                            value: 'codes-postaux',
                            enabled: true
                        },
                        {
                            title: 'Route',
                            value: 'routes',
                            enabled: false
                        },
                        {
                            title: 'Municipalité',
                            value: 'municipalites',
                            enabled: true
                        },
                        // {
                        //   title: 'Ancienne municipalité',
                        //   value: 'ancienne_municipalite',
                        //   enabled: true
                        // },
                        {
                            title: 'mrc',
                            value: 'mrc',
                            enabled: true
                        },
                        {
                            title: 'Région administrative',
                            value: 'regadmin',
                            enabled: true
                        },
                        {
                            title: 'Lieu',
                            value: 'lieux',
                            enabled: true
                        },
                        {
                            title: 'Borne',
                            value: 'bornes',
                            enabled: false
                        },
                        {
                            title: 'Entreprise',
                            value: 'entreprises',
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
                            title: '1',
                            value: 1,
                            enabled: false
                        },
                        {
                            title: '5',
                            value: 5,
                            enabled: true
                        },
                        {
                            title: '10',
                            value: 10,
                            enabled: false
                        },
                        {
                            title: '25',
                            value: 25,
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
                    title: 'trust level',
                    name: 'ecmax',
                    values: [
                        {
                            title: '10',
                            value: 10,
                            enabled: false
                        },
                        {
                            title: '30',
                            value: 30,
                            enabled: true
                        },
                        {
                            title: '50',
                            value: 50,
                            enabled: false
                        },
                        {
                            title: '75',
                            value: 75,
                            enabled: false
                        },
                        {
                            title: '100',
                            value: 100,
                            enabled: false
                        }
                    ]
                }
            ]
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
                q: this.computeTerm(term),
                geometry: true,
                type: 'adresses,codes-postaux,municipalites,mrc,regadmin,lieux,entreprises,bornes'
            }, this.params, this.computeOptionsParam(term, options || {}).params)
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
        const id = [this.getId(), properties.type, properties.code].join('.');
        /** @type {?} */
        const subtitleHtml = data.highlight.title2
            ? ' <small> ' + data.highlight.title2 + '</small>'
            : '';
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
                    title: data.properties.nom
                }
            },
            meta: {
                dataType: FEATURE,
                id,
                title: data.properties.nom,
                titleHtml: data.highlight.title + subtitleHtml,
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
        /** @type {?} */
        const googleLinksProperties = {
            GoogleMaps: GoogleLinks.getGoogleMapsLink(data.geometry.coordinates[0], data.geometry.coordinates[1])
        };
        if (data.geometry.type === 'Point') {
            googleLinksProperties.GoogleStreetView = GoogleLinks.getGoogleStreetViewLink(data.geometry.coordinates[0], data.geometry.coordinates[1]);
        }
        return Object.assign(properties, { type: data.index }, googleLinksProperties);
    }
    /**
     * Remove hashtag from query
     * @private
     * @param {?} term Query with hashtag
     * @return {?}
     */
    computeTerm(term) {
        return term.replace(/(#[^\s]*)/g, '');
    }
    /**
     * Add hashtag to param if valid
     * @private
     * @param {?} term Query with hashtag
     * @param {?} options TextSearchOptions
     * @return {?}
     */
    computeOptionsParam(term, options) {
        /** @type {?} */
        const tags = term.match(/(#[^\s]+)/g);
        if (tags) {
            /** @type {?} */
            let typeValue = '';
            /** @type {?} */
            let hashtagToAdd = false;
            tags.forEach((/**
             * @param {?} value
             * @return {?}
             */
            value => {
                if (super.hashtagValid(super.getSettingsValues('type'), value, true)) {
                    typeValue += value.substring(1) + ',';
                    hashtagToAdd = true;
                }
            }));
            if (hashtagToAdd) {
                options.params = Object.assign(options.params || {}, {
                    type: typeValue.slice(0, -1)
                });
            }
        }
        return options;
    }
}
IChercheSearchSource.id = 'icherche';
IChercheSearchSource.type = FEATURE;
IChercheSearchSource.propertiesBlacklist = [];
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
            title: 'Territoire (Géocodage inversé)',
            searchUrl: 'https://geoegl.msp.gouv.qc.ca/apis/territoires/locate',
            settings: [
                {
                    type: 'checkbox',
                    title: 'results type',
                    name: 'type',
                    values: [
                        {
                            title: 'Adresse',
                            value: 'adresses',
                            enabled: true
                        },
                        {
                            title: 'Route',
                            value: 'routes',
                            enabled: false
                        },
                        {
                            title: 'Arrondissement',
                            value: 'arrondissements',
                            enabled: false
                        },
                        {
                            title: 'Municipalité',
                            value: 'municipalites',
                            enabled: true
                        },
                        {
                            title: 'mrc',
                            value: 'mrc',
                            enabled: true
                        },
                        {
                            title: 'Région administrative',
                            value: 'regadmin',
                            enabled: true
                        }
                    ]
                }
            ]
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
                buffer: distance ? String(distance) : '100',
                geometry: true
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
        const id = [this.getId(), properties.type, properties.code].join('.');
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
        return properties;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNoZXJjaGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NoYXJlZC9zb3VyY2VzL2ljaGVyY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRzlELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFMUMsT0FBTyxFQUFFLE9BQU8sRUFBVyxNQUFNLGtCQUFrQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUczRCxPQUFPLEVBQUUsWUFBWSxFQUE2QixNQUFNLFVBQVUsQ0FBQztBQWNuRSxNQUFNLE9BQU8sNkJBQTZCOzs7O0lBQ3hDLFlBQW9CLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUFHLENBQUM7Ozs7O0lBRXhELFlBQVksQ0FBQyxNQUE2QjtRQUN4QyxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOzs7WUFORixVQUFVOzs7O1lBckJGLGVBQWU7Ozs7Ozs7SUF1QlYsd0RBQXdDOzs7OztBQVd0RCxNQUFNLE9BQU8sb0JBQXFCLFNBQVEsWUFBWTs7Ozs7O0lBS3BELFlBQ1UsSUFBZ0IsRUFDTCxPQUE0QixFQUV2QyxTQUF3QztRQUVoRCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFMUCxTQUFJLEdBQUosSUFBSSxDQUFZO1FBR2hCLGNBQVMsR0FBVCxTQUFTLENBQStCO0lBR2xELENBQUM7Ozs7SUFFRCxLQUFLO1FBQ0gsT0FBTyxvQkFBb0IsQ0FBQyxFQUFF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LElBQUksRUFBRTtvQkFDSixFQUFFO29CQUNGLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUc7aUJBQzNCO2FBQ0Y7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLEVBQUU7Z0JBQ0YsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRztnQkFDMUIsSUFBSSxFQUFFLFlBQVk7YUFDbkI7U0FDRixDQUFDO0lBQ0osQ0FBQzs7Ozs7O0lBRU8saUJBQWlCLENBQUMsSUFBeUI7O2NBQzNDLFVBQVUsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUN2QyxJQUFJLENBQUMsVUFBVSxFQUNmLDJCQUEyQixDQUFDLG1CQUFtQixDQUNoRDtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Ozs7OztJQUVPLGFBQWEsQ0FDbkIsSUFBeUI7UUFFekIsT0FBTyxJQUFJLENBQUMsSUFBSTtZQUNkLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUQsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUNoQixDQUFDOztBQW5KTSw4QkFBRSxHQUFHLGlCQUFpQixDQUFDO0FBQ3ZCLGdDQUFJLEdBQUcsT0FBTyxDQUFDO0FBQ2YsK0NBQW1CLEdBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7WUFMckQsVUFBVTs7OztZQWhVRixVQUFVOzRDQXlVZCxNQUFNLFNBQUMsU0FBUzs7OztJQU5uQiwrQkFBOEI7O0lBQzlCLGlDQUFzQjs7SUFDdEIsZ0RBQW9EOzs7OztJQUdsRCwyQ0FBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBPYmplY3RVdGlscyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7IEZFQVRVUkUsIEZlYXR1cmUgfSBmcm9tICcuLi8uLi8uLi9mZWF0dXJlJztcclxuaW1wb3J0IHsgR29vZ2xlTGlua3MgfSBmcm9tICcuLy4uLy4uLy4uL3V0aWxzL2dvb2dsZUxpbmtzJztcclxuXHJcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCB9IGZyb20gJy4uL3NlYXJjaC5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgU2VhcmNoU291cmNlLCBUZXh0U2VhcmNoLCBSZXZlcnNlU2VhcmNoIH0gZnJvbSAnLi9zb3VyY2UnO1xyXG5pbXBvcnQge1xyXG4gIFNlYXJjaFNvdXJjZU9wdGlvbnMsXHJcbiAgVGV4dFNlYXJjaE9wdGlvbnMsXHJcbiAgUmV2ZXJzZVNlYXJjaE9wdGlvbnNcclxufSBmcm9tICcuL3NvdXJjZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHtcclxuICBJQ2hlcmNoZURhdGEsXHJcbiAgSUNoZXJjaGVSZXNwb25zZSxcclxuICBJQ2hlcmNoZVJldmVyc2VEYXRhLFxyXG4gIElDaGVyY2hlUmV2ZXJzZVJlc3BvbnNlXHJcbn0gZnJvbSAnLi9pY2hlcmNoZS5pbnRlcmZhY2VzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIElDaGVyY2hlU2VhcmNoUmVzdWx0Rm9ybWF0dGVyIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlKSB7fVxyXG5cclxuICBmb3JtYXRSZXN1bHQocmVzdWx0OiBTZWFyY2hSZXN1bHQ8RmVhdHVyZT4pOiBTZWFyY2hSZXN1bHQ8RmVhdHVyZT4ge1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJQ2hlcmNoZSBzZWFyY2ggc291cmNlXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBJQ2hlcmNoZVNlYXJjaFNvdXJjZSBleHRlbmRzIFNlYXJjaFNvdXJjZSBpbXBsZW1lbnRzIFRleHRTZWFyY2gge1xyXG4gIHN0YXRpYyBpZCA9ICdpY2hlcmNoZSc7XHJcbiAgc3RhdGljIHR5cGUgPSBGRUFUVVJFO1xyXG4gIHN0YXRpYyBwcm9wZXJ0aWVzQmxhY2tsaXN0OiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIEBJbmplY3QoJ29wdGlvbnMnKSBvcHRpb25zOiBTZWFyY2hTb3VyY2VPcHRpb25zLFxyXG4gICAgQEluamVjdChJQ2hlcmNoZVNlYXJjaFJlc3VsdEZvcm1hdHRlcilcclxuICAgIHByaXZhdGUgZm9ybWF0dGVyOiBJQ2hlcmNoZVNlYXJjaFJlc3VsdEZvcm1hdHRlclxyXG4gICkge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBnZXRJZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIElDaGVyY2hlU2VhcmNoU291cmNlLmlkO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldERlZmF1bHRPcHRpb25zKCk6IFNlYXJjaFNvdXJjZU9wdGlvbnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6ICdJQ2hlcmNoZSBRdcOpYmVjJyxcclxuICAgICAgc2VhcmNoVXJsOiAnaHR0cHM6Ly9nZW9lZ2wubXNwLmdvdXYucWMuY2EvYXBpcy9pY2hlcmNoZS9nZW9jb2RlJyxcclxuICAgICAgc2V0dGluZ3M6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAnY2hlY2tib3gnLFxyXG4gICAgICAgICAgdGl0bGU6ICdyZXN1bHRzIHR5cGUnLFxyXG4gICAgICAgICAgbmFtZTogJ3R5cGUnLFxyXG4gICAgICAgICAgdmFsdWVzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ0FkcmVzc2UnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAnYWRyZXNzZXMnLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8ge1xyXG4gICAgICAgICAgICAvLyAgIHRpdGxlOiAnQW5jaWVubmUgYWRyZXNzZScsXHJcbiAgICAgICAgICAgIC8vICAgdmFsdWU6ICdhbmNpZW5uZV9hZHJlc3NlJyxcclxuICAgICAgICAgICAgLy8gICBlbmFibGVkOiB0cnVlXHJcbiAgICAgICAgICAgIC8vIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ0NvZGUgUG9zdGFsJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ2NvZGVzLXBvc3RhdXgnLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnUm91dGUnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAncm91dGVzJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdNdW5pY2lwYWxpdMOpJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ211bmljaXBhbGl0ZXMnLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8ge1xyXG4gICAgICAgICAgICAvLyAgIHRpdGxlOiAnQW5jaWVubmUgbXVuaWNpcGFsaXTDqScsXHJcbiAgICAgICAgICAgIC8vICAgdmFsdWU6ICdhbmNpZW5uZV9tdW5pY2lwYWxpdGUnLFxyXG4gICAgICAgICAgICAvLyAgIGVuYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgLy8gfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnbXJjJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ21yYycsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdSw6lnaW9uIGFkbWluaXN0cmF0aXZlJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ3JlZ2FkbWluJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ0xpZXUnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAnbGlldXgnLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnQm9ybmUnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAnYm9ybmVzJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdFbnRyZXByaXNlJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ2VudHJlcHJpc2VzJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAncmFkaW9idXR0b24nLFxyXG4gICAgICAgICAgdGl0bGU6ICdyZXN1bHRzIGxpbWl0JyxcclxuICAgICAgICAgIG5hbWU6ICdsaW1pdCcsXHJcbiAgICAgICAgICB2YWx1ZXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnMScsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IDEsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnNScsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IDUsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICcxMCcsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IDEwLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJzI1JyxcclxuICAgICAgICAgICAgICB2YWx1ZTogMjUsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnNTAnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiA1MCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAncmFkaW9idXR0b24nLFxyXG4gICAgICAgICAgdGl0bGU6ICd0cnVzdCBsZXZlbCcsXHJcbiAgICAgICAgICBuYW1lOiAnZWNtYXgnLFxyXG4gICAgICAgICAgdmFsdWVzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJzEwJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogMTAsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnMzAnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAzMCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJzUwJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogNTAsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnNzUnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiA3NSxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICcxMDAnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAxMDAsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBhIGxvY2F0aW9uIGJ5IG5hbWUgb3Iga2V5d29yZFxyXG4gICAqIEBwYXJhbSB0ZXJtIExvY2F0aW9uIG5hbWUgb3Iga2V5d29yZFxyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgPFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdXHJcbiAgICovXHJcbiAgc2VhcmNoKFxyXG4gICAgdGVybTogc3RyaW5nLFxyXG4gICAgb3B0aW9ucz86IFRleHRTZWFyY2hPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxTZWFyY2hSZXN1bHQ8RmVhdHVyZT5bXT4ge1xyXG4gICAgY29uc3QgcGFyYW1zID0gdGhpcy5jb21wdXRlUmVxdWVzdFBhcmFtcyh0ZXJtLCBvcHRpb25zIHx8IHt9KTtcclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLmdldCh0aGlzLnNlYXJjaFVybCwgeyBwYXJhbXMgfSlcclxuICAgICAgLnBpcGUobWFwKChyZXNwb25zZTogSUNoZXJjaGVSZXNwb25zZSkgPT4gdGhpcy5leHRyYWN0UmVzdWx0cyhyZXNwb25zZSkpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZVJlcXVlc3RQYXJhbXMoXHJcbiAgICB0ZXJtOiBzdHJpbmcsXHJcbiAgICBvcHRpb25zOiBUZXh0U2VhcmNoT3B0aW9uc1xyXG4gICk6IEh0dHBQYXJhbXMge1xyXG4gICAgcmV0dXJuIG5ldyBIdHRwUGFyYW1zKHtcclxuICAgICAgZnJvbU9iamVjdDogT2JqZWN0LmFzc2lnbihcclxuICAgICAgICB7XHJcbiAgICAgICAgICBxOiB0aGlzLmNvbXB1dGVUZXJtKHRlcm0pLFxyXG4gICAgICAgICAgZ2VvbWV0cnk6IHRydWUsXHJcbiAgICAgICAgICB0eXBlOlxyXG4gICAgICAgICAgICAnYWRyZXNzZXMsY29kZXMtcG9zdGF1eCxtdW5pY2lwYWxpdGVzLG1yYyxyZWdhZG1pbixsaWV1eCxlbnRyZXByaXNlcyxib3JuZXMnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0aGlzLnBhcmFtcyxcclxuICAgICAgICB0aGlzLmNvbXB1dGVPcHRpb25zUGFyYW0odGVybSwgb3B0aW9ucyB8fCB7fSkucGFyYW1zXHJcbiAgICAgIClcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0UmVzdWx0cyhyZXNwb25zZTogSUNoZXJjaGVSZXNwb25zZSk6IFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdIHtcclxuICAgIHJldHVybiByZXNwb25zZS5mZWF0dXJlcy5tYXAoKGRhdGE6IElDaGVyY2hlRGF0YSkgPT4ge1xyXG4gICAgICByZXR1cm4gdGhpcy5mb3JtYXR0ZXIuZm9ybWF0UmVzdWx0KHRoaXMuZGF0YVRvUmVzdWx0KGRhdGEpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkYXRhVG9SZXN1bHQoZGF0YTogSUNoZXJjaGVEYXRhKTogU2VhcmNoUmVzdWx0PEZlYXR1cmU+IHtcclxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSB0aGlzLmNvbXB1dGVQcm9wZXJ0aWVzKGRhdGEpO1xyXG4gICAgY29uc3QgaWQgPSBbdGhpcy5nZXRJZCgpLCBwcm9wZXJ0aWVzLnR5cGUsIHByb3BlcnRpZXMuY29kZV0uam9pbignLicpO1xyXG5cclxuICAgIGNvbnN0IHN1YnRpdGxlSHRtbCA9IGRhdGEuaGlnaGxpZ2h0LnRpdGxlMlxyXG4gICAgICA/ICcgPHNtYWxsPiAnICsgZGF0YS5oaWdobGlnaHQudGl0bGUyICsgJzwvc21hbGw+J1xyXG4gICAgICA6ICcnO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNvdXJjZTogdGhpcyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHR5cGU6IEZFQVRVUkUsXHJcbiAgICAgICAgcHJvamVjdGlvbjogJ0VQU0c6NDMyNicsXHJcbiAgICAgICAgZ2VvbWV0cnk6IGRhdGEuZ2VvbWV0cnksXHJcbiAgICAgICAgZXh0ZW50OiBkYXRhLmJib3gsXHJcbiAgICAgICAgcHJvcGVydGllcyxcclxuICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICBpZCxcclxuICAgICAgICAgIHRpdGxlOiBkYXRhLnByb3BlcnRpZXMubm9tXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBtZXRhOiB7XHJcbiAgICAgICAgZGF0YVR5cGU6IEZFQVRVUkUsXHJcbiAgICAgICAgaWQsXHJcbiAgICAgICAgdGl0bGU6IGRhdGEucHJvcGVydGllcy5ub20sXHJcbiAgICAgICAgdGl0bGVIdG1sOiBkYXRhLmhpZ2hsaWdodC50aXRsZSArIHN1YnRpdGxlSHRtbCxcclxuICAgICAgICBpY29uOiAnbWFwLW1hcmtlcidcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZVByb3BlcnRpZXMoZGF0YTogSUNoZXJjaGVEYXRhKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XHJcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gT2JqZWN0VXRpbHMucmVtb3ZlS2V5cyhcclxuICAgICAgZGF0YS5wcm9wZXJ0aWVzLFxyXG4gICAgICBJQ2hlcmNoZVNlYXJjaFNvdXJjZS5wcm9wZXJ0aWVzQmxhY2tsaXN0XHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGdvb2dsZUxpbmtzUHJvcGVydGllczogeyBHb29nbGVNYXBzOiBzdHJpbmcsIEdvb2dsZVN0cmVldFZpZXc/OiBzdHJpbmcgfSA9IHtcclxuICAgICAgR29vZ2xlTWFwczogR29vZ2xlTGlua3MuZ2V0R29vZ2xlTWFwc0xpbmsoZGF0YS5nZW9tZXRyeS5jb29yZGluYXRlc1swXSwgZGF0YS5nZW9tZXRyeS5jb29yZGluYXRlc1sxXSlcclxuICAgIH07XHJcbiAgICBpZiAoZGF0YS5nZW9tZXRyeS50eXBlID09PSAnUG9pbnQnKSB7XHJcbiAgICAgIGdvb2dsZUxpbmtzUHJvcGVydGllcy5Hb29nbGVTdHJlZXRWaWV3ID0gR29vZ2xlTGlua3MuZ2V0R29vZ2xlU3RyZWV0Vmlld0xpbmsoXHJcbiAgICAgICAgZGF0YS5nZW9tZXRyeS5jb29yZGluYXRlc1swXSwgZGF0YS5nZW9tZXRyeS5jb29yZGluYXRlc1sxXVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHByb3BlcnRpZXMsIHsgdHlwZTogZGF0YS5pbmRleCB9LCBnb29nbGVMaW5rc1Byb3BlcnRpZXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIGhhc2h0YWcgZnJvbSBxdWVyeVxyXG4gICAqIEBwYXJhbSB0ZXJtIFF1ZXJ5IHdpdGggaGFzaHRhZ1xyXG4gICAqL1xyXG4gIHByaXZhdGUgY29tcHV0ZVRlcm0odGVybTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0ZXJtLnJlcGxhY2UoLygjW15cXHNdKikvZywgJycpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGhhc2h0YWcgdG8gcGFyYW0gaWYgdmFsaWRcclxuICAgKiBAcGFyYW0gdGVybSBRdWVyeSB3aXRoIGhhc2h0YWdcclxuICAgKiBAcGFyYW0gb3B0aW9ucyBUZXh0U2VhcmNoT3B0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgY29tcHV0ZU9wdGlvbnNQYXJhbShcclxuICAgIHRlcm06IHN0cmluZyxcclxuICAgIG9wdGlvbnM6IFRleHRTZWFyY2hPcHRpb25zXHJcbiAgKTogVGV4dFNlYXJjaE9wdGlvbnMge1xyXG4gICAgY29uc3QgdGFncyA9IHRlcm0ubWF0Y2goLygjW15cXHNdKykvZyk7XHJcbiAgICBpZiAodGFncykge1xyXG4gICAgICBsZXQgdHlwZVZhbHVlID0gJyc7XHJcbiAgICAgIGxldCBoYXNodGFnVG9BZGQgPSBmYWxzZTtcclxuICAgICAgdGFncy5mb3JFYWNoKHZhbHVlID0+IHtcclxuICAgICAgICBpZiAoc3VwZXIuaGFzaHRhZ1ZhbGlkKHN1cGVyLmdldFNldHRpbmdzVmFsdWVzKCd0eXBlJyksIHZhbHVlLCB0cnVlKSkge1xyXG4gICAgICAgICAgdHlwZVZhbHVlICs9IHZhbHVlLnN1YnN0cmluZygxKSArICcsJztcclxuICAgICAgICAgIGhhc2h0YWdUb0FkZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgaWYgKGhhc2h0YWdUb0FkZCkge1xyXG4gICAgICAgIG9wdGlvbnMucGFyYW1zID0gT2JqZWN0LmFzc2lnbihvcHRpb25zLnBhcmFtcyB8fCB7fSwge1xyXG4gICAgICAgICAgdHlwZTogdHlwZVZhbHVlLnNsaWNlKDAsIC0xKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3B0aW9ucztcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJQ2hlcmNoZVJldmVyc2Ugc2VhcmNoIHNvdXJjZVxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSUNoZXJjaGVSZXZlcnNlU2VhcmNoU291cmNlIGV4dGVuZHMgU2VhcmNoU291cmNlXHJcbiAgaW1wbGVtZW50cyBSZXZlcnNlU2VhcmNoIHtcclxuICBzdGF0aWMgaWQgPSAnaWNoZXJjaGVyZXZlcnNlJztcclxuICBzdGF0aWMgdHlwZSA9IEZFQVRVUkU7XHJcbiAgc3RhdGljIHByb3BlcnRpZXNCbGFja2xpc3Q6IHN0cmluZ1tdID0gWydkb2NfdHlwZSddO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIEBJbmplY3QoJ29wdGlvbnMnKSBvcHRpb25zOiBTZWFyY2hTb3VyY2VPcHRpb25zXHJcbiAgKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIGdldElkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gSUNoZXJjaGVSZXZlcnNlU2VhcmNoU291cmNlLmlkO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldERlZmF1bHRPcHRpb25zKCk6IFNlYXJjaFNvdXJjZU9wdGlvbnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6ICdUZXJyaXRvaXJlIChHw6lvY29kYWdlIGludmVyc8OpKScsXHJcbiAgICAgIHNlYXJjaFVybDogJ2h0dHBzOi8vZ2VvZWdsLm1zcC5nb3V2LnFjLmNhL2FwaXMvdGVycml0b2lyZXMvbG9jYXRlJyxcclxuXHJcbiAgICAgIHNldHRpbmdzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdHlwZTogJ2NoZWNrYm94JyxcclxuICAgICAgICAgIHRpdGxlOiAncmVzdWx0cyB0eXBlJyxcclxuICAgICAgICAgIG5hbWU6ICd0eXBlJyxcclxuICAgICAgICAgIHZhbHVlczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdBZHJlc3NlJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ2FkcmVzc2VzJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ1JvdXRlJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ3JvdXRlcycsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnQXJyb25kaXNzZW1lbnQnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAnYXJyb25kaXNzZW1lbnRzJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdNdW5pY2lwYWxpdMOpJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ211bmljaXBhbGl0ZXMnLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnbXJjJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ21yYycsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdSw6lnaW9uIGFkbWluaXN0cmF0aXZlJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ3JlZ2FkbWluJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggYSBsb2NhdGlvbiBieSBjb29yZGluYXRlc1xyXG4gICAqIEBwYXJhbSBsb25MYXQgTG9jYXRpb24gY29vcmRpbmF0ZXNcclxuICAgKiBAcGFyYW0gZGlzdGFuY2UgU2VhcmNoIHJhaWR1cyBhcm91bmQgbG9uTGF0XHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiA8U2VhcmNoUmVzdWx0PEZlYXR1cmU+W11cclxuICAgKi9cclxuICByZXZlcnNlU2VhcmNoKFxyXG4gICAgbG9uTGF0OiBbbnVtYmVyLCBudW1iZXJdLFxyXG4gICAgb3B0aW9ucz86IFJldmVyc2VTZWFyY2hPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxTZWFyY2hSZXN1bHQ8RmVhdHVyZT5bXT4ge1xyXG4gICAgY29uc3QgcGFyYW1zID0gdGhpcy5jb21wdXRlUmVxdWVzdFBhcmFtcyhsb25MYXQsIG9wdGlvbnMgfHwge30pO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5zZWFyY2hVcmwsIHsgcGFyYW1zIH0pLnBpcGUoXHJcbiAgICAgIG1hcCgocmVzcG9uc2U6IElDaGVyY2hlUmV2ZXJzZVJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXh0cmFjdFJlc3VsdHMocmVzcG9uc2UpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZVJlcXVlc3RQYXJhbXMoXHJcbiAgICBsb25MYXQ6IFtudW1iZXIsIG51bWJlcl0sXHJcbiAgICBvcHRpb25zPzogUmV2ZXJzZVNlYXJjaE9wdGlvbnNcclxuICApOiBIdHRwUGFyYW1zIHtcclxuICAgIGNvbnN0IGRpc3RhbmNlID0gb3B0aW9ucy5kaXN0YW5jZTtcclxuICAgIHJldHVybiBuZXcgSHR0cFBhcmFtcyh7XHJcbiAgICAgIGZyb21PYmplY3Q6IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbG9jOiBsb25MYXQuam9pbignLCcpLFxyXG4gICAgICAgICAgYnVmZmVyOiBkaXN0YW5jZSA/IFN0cmluZyhkaXN0YW5jZSkgOiAnMTAwJyxcclxuICAgICAgICAgIGdlb21ldHJ5OiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0aGlzLnBhcmFtcyxcclxuICAgICAgICBvcHRpb25zLnBhcmFtcyB8fCB7fVxyXG4gICAgICApXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdFJlc3VsdHMoXHJcbiAgICByZXNwb25zZTogSUNoZXJjaGVSZXZlcnNlUmVzcG9uc2VcclxuICApOiBTZWFyY2hSZXN1bHQ8RmVhdHVyZT5bXSB7XHJcbiAgICByZXR1cm4gcmVzcG9uc2UuZmVhdHVyZXMubWFwKChkYXRhOiBJQ2hlcmNoZVJldmVyc2VEYXRhKSA9PiB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRhdGFUb1Jlc3VsdChkYXRhKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkYXRhVG9SZXN1bHQoZGF0YTogSUNoZXJjaGVSZXZlcnNlRGF0YSk6IFNlYXJjaFJlc3VsdDxGZWF0dXJlPiB7XHJcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gdGhpcy5jb21wdXRlUHJvcGVydGllcyhkYXRhKTtcclxuICAgIGNvbnN0IGV4dGVudCA9IHRoaXMuY29tcHV0ZUV4dGVudChkYXRhKTtcclxuICAgIGNvbnN0IGlkID0gW3RoaXMuZ2V0SWQoKSwgcHJvcGVydGllcy50eXBlLCBwcm9wZXJ0aWVzLmNvZGVdLmpvaW4oJy4nKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzb3VyY2U6IHRoaXMsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICB0eXBlOiBGRUFUVVJFLFxyXG4gICAgICAgIHByb2plY3Rpb246ICdFUFNHOjQzMjYnLFxyXG4gICAgICAgIGdlb21ldHJ5OiBkYXRhLmdlb21ldHJ5LFxyXG4gICAgICAgIGV4dGVudCxcclxuICAgICAgICBwcm9wZXJ0aWVzLFxyXG4gICAgICAgIG1ldGE6IHtcclxuICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgdGl0bGU6IGRhdGEucHJvcGVydGllcy5ub21cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG1ldGE6IHtcclxuICAgICAgICBkYXRhVHlwZTogRkVBVFVSRSxcclxuICAgICAgICBpZCxcclxuICAgICAgICB0aXRsZTogZGF0YS5wcm9wZXJ0aWVzLm5vbSxcclxuICAgICAgICBpY29uOiAnbWFwLW1hcmtlcidcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZVByb3BlcnRpZXMoZGF0YTogSUNoZXJjaGVSZXZlcnNlRGF0YSk6IHsgW2tleTogc3RyaW5nXTogYW55IH0ge1xyXG4gICAgY29uc3QgcHJvcGVydGllcyA9IE9iamVjdFV0aWxzLnJlbW92ZUtleXMoXHJcbiAgICAgIGRhdGEucHJvcGVydGllcyxcclxuICAgICAgSUNoZXJjaGVSZXZlcnNlU2VhcmNoU291cmNlLnByb3BlcnRpZXNCbGFja2xpc3RcclxuICAgICk7XHJcbiAgICByZXR1cm4gcHJvcGVydGllcztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZUV4dGVudChcclxuICAgIGRhdGE6IElDaGVyY2hlUmV2ZXJzZURhdGFcclxuICApOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSB8IHVuZGVmaW5lZCB7XHJcbiAgICByZXR1cm4gZGF0YS5iYm94XHJcbiAgICAgID8gW2RhdGEuYmJveFswXSwgZGF0YS5iYm94WzJdLCBkYXRhLmJib3hbMV0sIGRhdGEuYmJveFszXV1cclxuICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==