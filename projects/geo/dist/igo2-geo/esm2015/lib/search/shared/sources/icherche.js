/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject, Injector } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '@igo2/auth';
import { LanguageService } from '@igo2/core';
import { ObjectUtils } from '@igo2/utils';
import pointOnFeature from '@turf/point-on-feature';
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
     * @param {?} languageService
     * @param {?} options
     * @param {?} formatter
     * @param {?} injector
     */
    constructor(http, languageService, options, formatter, injector) {
        super(options);
        this.http = http;
        this.languageService = languageService;
        this.formatter = formatter;
        this.title$ = new BehaviorSubject('');
        this.hashtagsLieuxToKeep = [];
        this.languageService.translate
            .get(this.options.title)
            .subscribe((/**
         * @param {?} title
         * @return {?}
         */
        title => this.title$.next(title)));
        /** @type {?} */
        const authService = injector.get(AuthService);
        if (this.settings.length) {
            if (!authService) {
                this.getAllowedTypes();
            }
            else {
                authService.authenticate$.subscribe((/**
                 * @return {?}
                 */
                () => {
                    this.getAllowedTypes();
                }));
            }
        }
    }
    /**
     * @return {?}
     */
    get title() {
        return this.title$.getValue();
    }
    /**
     * @return {?}
     */
    getId() {
        return IChercheSearchSource.id;
    }
    /**
     * @return {?}
     */
    getType() {
        return IChercheSearchSource.type;
    }
    /**
     * @protected
     * @return {?}
     */
    getDefaultOptions() {
        /** @type {?} */
        const limit = this.options.params && this.options.params.limit
            ? Number(this.options.params.limit)
            : undefined;
        /** @type {?} */
        const ecmax = this.options.params && this.options.params.ecmax
            ? Number(this.options.params.ecmax)
            : undefined;
        /** @type {?} */
        const types = this.options.params && this.options.params.type
            ? this.options.params.type
                .replace(/\s/g, '')
                .toLowerCase()
                .split(',')
            : [
                'adresses',
                'codes-postaux',
                'routes',
                'municipalites',
                'mrc',
                'regadmin',
                'lieux'
            ];
        return {
            title: 'igo.geo.search.icherche.name',
            searchUrl: 'https://geoegl.msp.gouv.qc.ca/apis/icherche',
            settings: [
                {
                    type: 'checkbox',
                    title: 'results type',
                    name: 'type',
                    values: [
                        {
                            title: 'igo.geo.search.icherche.type.address',
                            value: 'adresses',
                            enabled: types.indexOf('adresses') !== -1,
                            hashtags: ['adresse']
                        },
                        {
                            title: 'igo.geo.search.icherche.type.oldAddress',
                            value: 'anciennes-adresses',
                            enabled: types.indexOf('anciennes-adresses') !== -1,
                            hashtags: ['anciennes-adresses']
                        },
                        {
                            title: 'igo.geo.search.icherche.type.postalCode',
                            value: 'codes-postaux',
                            enabled: types.indexOf('codes-postaux') !== -1,
                            hashtags: ['code-postal']
                        },
                        {
                            title: 'igo.geo.search.icherche.type.road',
                            value: 'routes',
                            enabled: types.indexOf('routes') !== -1,
                            hashtags: ['route']
                        },
                        {
                            title: 'igo.geo.search.icherche.type.city',
                            value: 'municipalites',
                            enabled: types.indexOf('municipalites') !== -1,
                            hashtags: ['municipalité', 'mun']
                        },
                        {
                            title: 'igo.geo.search.icherche.type.oldCity',
                            value: 'anciennes-municipalites',
                            enabled: types.indexOf('anciennes-municipalites') !== -1,
                            hashtags: ['anciennes-municipalites']
                        },
                        {
                            title: 'igo.geo.search.icherche.type.mrc',
                            value: 'mrc',
                            enabled: types.indexOf('mrc') !== -1,
                            hashtags: ['mrc']
                        },
                        {
                            title: 'igo.geo.search.icherche.type.regadmin',
                            value: 'regadmin',
                            enabled: types.indexOf('regadmin') !== -1,
                            hashtags: ['région-administrative', 'regadmin']
                        },
                        {
                            title: 'igo.geo.search.icherche.type.entreprise',
                            value: 'entreprises',
                            enabled: types.indexOf('entreprises') !== -1,
                            available: false,
                            hashtags: ['entreprise']
                        },
                        {
                            title: 'igo.geo.search.icherche.type.place',
                            value: 'lieux',
                            enabled: types.indexOf('lieux') !== -1,
                            hashtags: ['lieu']
                        },
                        {
                            title: 'igo.geo.search.icherche.type.sumi',
                            value: 'bornes-sumi',
                            enabled: types.indexOf('bornes-sumi') !== -1,
                            hashtags: ['borne', 'bornes', 'sumi']
                        },
                        {
                            title: 'igo.geo.search.icherche.type.km',
                            value: 'bornes-km',
                            enabled: false,
                            hashtags: ['borne', 'bornes', 'repère', 'km']
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
                            enabled: limit === 1
                        },
                        {
                            title: '5',
                            value: 5,
                            enabled: limit === 5 || !limit
                        },
                        {
                            title: '10',
                            value: 10,
                            enabled: limit === 10
                        },
                        {
                            title: '25',
                            value: 25,
                            enabled: limit === 25
                        },
                        {
                            title: '50',
                            value: 50,
                            enabled: limit === 50
                        }
                    ]
                },
                {
                    type: 'radiobutton',
                    title: 'ecmax',
                    name: 'ecmax',
                    values: [
                        {
                            title: '10 %',
                            value: 10,
                            enabled: ecmax === 10
                        },
                        {
                            title: '30 %',
                            value: 30,
                            enabled: ecmax === 30 || !ecmax
                        },
                        {
                            title: '50 %',
                            value: 50,
                            enabled: ecmax === 50
                        },
                        {
                            title: '75 %',
                            value: 75,
                            enabled: ecmax === 75
                        },
                        {
                            title: '100 %',
                            value: 100,
                            enabled: ecmax === 100
                        }
                    ]
                },
                {
                    type: 'radiobutton',
                    title: 'restrictExtent',
                    name: 'loc',
                    values: [
                        {
                            title: 'igo.geo.search.icherche.restrictExtent.map',
                            value: 'true',
                            enabled: false
                        },
                        {
                            title: 'igo.geo.search.icherche.restrictExtent.quebec',
                            value: 'false',
                            enabled: true
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
        if (!params.get('type').length) {
            return of([]);
        }
        this.options.params.page = params.get('page') || '1';
        return this.http.get(`${this.searchUrl}/geocode`, { params }).pipe(map((/**
         * @param {?} response
         * @return {?}
         */
        (response) => this.extractResults(response))), catchError((/**
         * @param {?} err
         * @return {?}
         */
        err => {
            err.error.toDisplay = true;
            err.error.title = this.languageService.translate.instant(this.getDefaultOptions().title);
            throw err;
        })));
    }
    /**
     * @private
     * @return {?}
     */
    getAllowedTypes() {
        return this.http
            .get(`${this.searchUrl}/types`)
            .subscribe((/**
         * @param {?} types
         * @return {?}
         */
        (types) => {
            /** @type {?} */
            const typeSetting = this.settings.find((/**
             * @param {?} s
             * @return {?}
             */
            s => s.name === 'type'));
            typeSetting.values.forEach((/**
             * @param {?} v
             * @return {?}
             */
            v => {
                /** @type {?} */
                const regex = new RegExp(`^${v.value}(\\.|$)`);
                /** @type {?} */
                const typesMatched = types.filter((/**
                 * @param {?} value
                 * @return {?}
                 */
                value => regex.test(value)));
                v.available = typesMatched.length > 0;
                if (v.value === 'lieux') {
                    this.hashtagsLieuxToKeep = [
                        ...((/** @type {?} */ (new Set(typesMatched
                            .map((/**
                         * @param {?} t
                         * @return {?}
                         */
                        t => t.split('.')))
                            .reduce((/**
                         * @param {?} a
                         * @param {?} b
                         * @return {?}
                         */
                        (a, b) => a.concat(b)))
                            .filter((/**
                         * @param {?} t
                         * @return {?}
                         */
                        t => t !== 'lieux'))))))
                    ];
                }
            }));
        }));
    }
    /**
     * @private
     * @param {?} term
     * @param {?} options
     * @return {?}
     */
    computeRequestParams(term, options) {
        /** @type {?} */
        const queryParams = Object.assign({
            geometry: true,
            bbox: true,
            icon: true,
            type: 'adresses,codes-postaux,municipalites,mrc,regadmin,lieux,entreprises,bornes-sumi'
        }, this.params, this.computeOptionsParam(term, options || {}).params, {
            q: this.computeTerm(term),
            page: options.page
        });
        if (queryParams.loc === 'true') {
            const [xMin, yMin, xMax, yMax] = options.extent;
            queryParams.loc = `${xMin},${yMin};${xMax},${yMin};${xMax},${yMax};${xMin},${yMax};${xMin},${yMin}`;
        }
        else if (queryParams.loc === 'false') {
            delete queryParams.loc;
        }
        if (queryParams.q.indexOf('#') !== -1) {
            queryParams.type = 'lieux';
        }
        return new HttpParams({ fromObject: ObjectUtils.removeUndefined(queryParams) });
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
            return this.formatter.formatResult(this.dataToResult(data, response));
        }));
    }
    /**
     * @private
     * @param {?} data
     * @param {?=} response
     * @return {?}
     */
    dataToResult(data, response) {
        /** @type {?} */
        const properties = this.computeProperties(data);
        /** @type {?} */
        const id = [this.getId(), properties.type, properties.code].join('.');
        /** @type {?} */
        const titleHtml = data.highlight.title || data.properties.nom;
        /** @type {?} */
        const subtitleHtml = data.highlight.title2
            ? ' <small> ' + data.highlight.title2 + '</small>'
            : '';
        /** @type {?} */
        const subtitleHtml2 = data.highlight.title3
            ? '<br><small> ' + data.highlight.title3 + '</small>'
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
                titleHtml: titleHtml + subtitleHtml + subtitleHtml2,
                icon: data.icon || 'map-marker',
                nextPage: response.features.length % +this.options.params.limit === 0 && +this.options.params.page < 10
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
        if (data.geometry === undefined) {
            return Object.assign({ type: data.index }, properties);
        }
        /** @type {?} */
        const googleLinksProperties = {
            GoogleMaps: ''
        };
        /** @type {?} */
        let googleMaps;
        if (data.geometry.type === 'Point') {
            googleMaps = GoogleLinks.getGoogleMapsCoordLink(data.geometry.coordinates[0], data.geometry.coordinates[1]);
        }
        else {
            /** @type {?} */
            const point = pointOnFeature(data.geometry);
            googleMaps = GoogleLinks.getGoogleMapsCoordLink(point.geometry.coordinates[0], point.geometry.coordinates[1]);
        }
        /** @type {?} */
        let googleMapsNom;
        if (data.index === 'routes') {
            googleMapsNom = GoogleLinks.getGoogleMapsNameLink(data.properties.nom + ', ' + data.properties.municipalite);
        }
        else if (data.index === 'municipalites') {
            googleMapsNom = GoogleLinks.getGoogleMapsNameLink(data.properties.nom + ', ' + data.properties.regAdmin);
        }
        else {
            googleMapsNom = GoogleLinks.getGoogleMapsNameLink(data.properties.nom || data.highlight.title);
        }
        googleLinksProperties.GoogleMaps = '<a href=' + googleMaps + ' target="_blank">' +
            this.languageService.translate.instant('igo.geo.searchByCoord') + '</a> <br /> <a href=' + googleMapsNom +
            ' target="_blank">' + this.languageService.translate.instant('igo.geo.searchByName') + '</a>';
        if (data.geometry.type === 'Point') {
            googleLinksProperties.GoogleStreetView = GoogleLinks.getGoogleStreetViewLink(data.geometry.coordinates[0], data.geometry.coordinates[1]);
        }
        return Object.assign({ type: data.index }, properties, googleLinksProperties);
    }
    /**
     * Remove hashtag from query
     * @private
     * @param {?} term Query with hashtag
     * @return {?}
     */
    computeTerm(term) {
        // Keep hashtags for "lieux"
        /** @type {?} */
        const hashtags = term.match(/(#[^\s]+)/g) || [];
        /** @type {?} */
        let keep = false;
        keep = hashtags.some((/**
         * @param {?} hashtag
         * @return {?}
         */
        hashtag => {
            /** @type {?} */
            const hashtagKey = hashtag.substring(1);
            return this.hashtagsLieuxToKeep.some((/**
             * @param {?} h
             * @return {?}
             */
            h => h
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '') ===
                hashtagKey
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')));
        }));
        if (!keep) {
            term = term.replace(/(#[^\s]*)/g, '');
        }
        return term.replace(/[^\wÀ-ÿ !\-\(\),'#]+/g, '');
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
        const hashtags = super.getHashtagsValid(term, 'type');
        if (hashtags) {
            options.params = Object.assign(options.params || {}, {
                type: hashtags.join(',')
            });
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
    { type: LanguageService },
    { type: undefined, decorators: [{ type: Inject, args: ['options',] }] },
    { type: IChercheSearchResultFormatter, decorators: [{ type: Inject, args: [IChercheSearchResultFormatter,] }] },
    { type: Injector }
];
if (false) {
    /** @type {?} */
    IChercheSearchSource.id;
    /** @type {?} */
    IChercheSearchSource.type;
    /** @type {?} */
    IChercheSearchSource.propertiesBlacklist;
    /** @type {?} */
    IChercheSearchSource.prototype.title$;
    /**
     * @type {?}
     * @private
     */
    IChercheSearchSource.prototype.hashtagsLieuxToKeep;
    /**
     * @type {?}
     * @private
     */
    IChercheSearchSource.prototype.http;
    /**
     * @type {?}
     * @private
     */
    IChercheSearchSource.prototype.languageService;
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
     * @param {?} languageService
     * @param {?} options
     * @param {?} injector
     */
    constructor(http, languageService, options, injector) {
        super(options);
        this.http = http;
        this.languageService = languageService;
        this.title$ = new BehaviorSubject('');
        this.languageService.translate
            .get(this.options.title)
            .subscribe((/**
         * @param {?} title
         * @return {?}
         */
        title => this.title$.next(title)));
        /** @type {?} */
        const authService = injector.get(AuthService);
        if (this.settings.length) {
            if (!authService) {
                this.getAllowedTypes();
            }
            else {
                authService.authenticate$.subscribe((/**
                 * @return {?}
                 */
                () => {
                    this.getAllowedTypes();
                }));
            }
        }
    }
    /**
     * @return {?}
     */
    get title() {
        return this.title$.getValue();
    }
    /**
     * @return {?}
     */
    getId() {
        return IChercheReverseSearchSource.id;
    }
    /**
     * @return {?}
     */
    getType() {
        return IChercheReverseSearchSource.type;
    }
    /**
     * @protected
     * @return {?}
     */
    getDefaultOptions() {
        /** @type {?} */
        const types = this.options.params && this.options.params.type
            ? this.options.params.type
                .replace(/\s/g, '')
                .toLowerCase()
                .split(',')
            : ['adresses', 'municipalites', 'mrc', 'regadmin'];
        return {
            title: 'igo.geo.search.ichercheReverse.name',
            searchUrl: 'https://geoegl.msp.gouv.qc.ca/apis/terrapi',
            settings: [
                {
                    type: 'checkbox',
                    title: 'results type',
                    name: 'type',
                    values: [
                        {
                            title: 'igo.geo.search.icherche.type.address',
                            value: 'adresses',
                            enabled: types.indexOf('adresses') !== -1
                        },
                        {
                            title: 'igo.geo.search.icherche.type.road',
                            value: 'routes',
                            enabled: types.indexOf('routes') !== -1,
                            available: false
                        },
                        {
                            title: 'igo.geo.search.icherche.type.district',
                            value: 'arrondissements',
                            enabled: types.indexOf('arrondissements') !== -1
                        },
                        {
                            title: 'igo.geo.search.icherche.type.city',
                            value: 'municipalites',
                            enabled: types.indexOf('municipalites') !== -1
                        },
                        {
                            title: 'igo.geo.search.icherche.type.mrc',
                            value: 'mrc',
                            enabled: types.indexOf('mrc') !== -1
                        },
                        {
                            title: 'igo.geo.search.icherche.type.regadmin',
                            value: 'regadmin',
                            enabled: types.indexOf('regadmin') !== -1
                        }
                    ]
                },
                {
                    type: 'radiobutton',
                    title: 'radius',
                    name: 'buffer',
                    values: [
                        {
                            title: '100 m',
                            value: 100,
                            enabled: !this.options.distance || this.options.distance === 100
                        },
                        {
                            title: '500 m',
                            value: 500,
                            enabled: this.options.distance === 500
                        },
                        {
                            title: '1 km',
                            value: 1000,
                            enabled: this.options.distance === 1000
                        },
                        {
                            title: '2 km',
                            value: 2000,
                            enabled: this.options.distance === 2000
                        },
                        {
                            title: '5 km',
                            value: 5000,
                            enabled: this.options.distance === 5000
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
        if (!params.get('type').length) {
            return of([]);
        }
        return this.http.get(`${this.searchUrl}/locate`, { params }).pipe(map((/**
         * @param {?} response
         * @return {?}
         */
        (response) => {
            return this.extractResults(response);
        })));
    }
    /**
     * @private
     * @return {?}
     */
    getAllowedTypes() {
        return this.http
            .get(`${this.searchUrl}/types`)
            .subscribe((/**
         * @param {?} types
         * @return {?}
         */
        (types) => {
            /** @type {?} */
            const typeSetting = this.settings.find((/**
             * @param {?} s
             * @return {?}
             */
            s => s.name === 'type'));
            typeSetting.values.forEach((/**
             * @param {?} v
             * @return {?}
             */
            v => {
                v.available = types.indexOf((/** @type {?} */ (v.value))) > -1;
            }));
        }));
    }
    /**
     * @private
     * @param {?} lonLat
     * @param {?=} options
     * @return {?}
     */
    computeRequestParams(lonLat, options) {
        if (options.distance || this.options.distance) {
            options.params = Object.assign(options.params || {}, {
                buffer: options.distance || this.options.distance
            });
        }
        return new HttpParams({
            fromObject: Object.assign({
                loc: lonLat.join(','),
                sort: 'distance',
                geometry: true,
                icon: true
            }, options.params || {}, this.params)
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
    getSubtitle(data) {
        if (!this.settings.length) {
            return '';
        }
        /** @type {?} */
        let subtitle = '';
        switch (data.properties.type) {
            case 'arrondissements':
                subtitle = data.properties.municipalite + ' (Arrondissement)';
                break;
            default:
                /** @type {?} */
                const typeSetting = this.settings.find((/**
                 * @param {?} s
                 * @return {?}
                 */
                s => s.name === 'type'));
                /** @type {?} */
                const type = typeSetting.values.find((/**
                 * @param {?} t
                 * @return {?}
                 */
                t => t.value === data.properties.type));
                if (type) {
                    subtitle = this.languageService.translate.instant(type.title);
                }
        }
        return subtitle;
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
        /** @type {?} */
        const titleHtml = data.properties.nom;
        /** @type {?} */
        const subtitleHtml = ' <small> ' + this.getSubtitle(data) + '</small>';
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
                titleHtml: titleHtml + subtitleHtml,
                icon: data.icon || 'map-marker'
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
IChercheReverseSearchSource.propertiesBlacklist = [];
IChercheReverseSearchSource.decorators = [
    { type: Injectable }
];
/** @nocollapse */
IChercheReverseSearchSource.ctorParameters = () => [
    { type: HttpClient },
    { type: LanguageService },
    { type: undefined, decorators: [{ type: Inject, args: ['options',] }] },
    { type: Injector }
];
if (false) {
    /** @type {?} */
    IChercheReverseSearchSource.id;
    /** @type {?} */
    IChercheReverseSearchSource.type;
    /** @type {?} */
    IChercheReverseSearchSource.propertiesBlacklist;
    /** @type {?} */
    IChercheReverseSearchSource.prototype.title$;
    /**
     * @type {?}
     * @private
     */
    IChercheReverseSearchSource.prototype.http;
    /**
     * @type {?}
     * @private
     */
    IChercheReverseSearchSource.prototype.languageService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNoZXJjaGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NoYXJlZC9zb3VyY2VzL2ljaGVyY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUU5RCxPQUFPLEVBQWMsRUFBRSxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2RCxPQUFPLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRTFDLE9BQU8sY0FBYyxNQUFNLHdCQUF3QixDQUFDO0FBRXBELE9BQU8sRUFBRSxPQUFPLEVBQVcsTUFBTSxrQkFBa0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFHM0QsT0FBTyxFQUFFLFlBQVksRUFBNkIsTUFBTSxVQUFVLENBQUM7QUFjbkUsTUFBTSxPQUFPLDZCQUE2Qjs7OztJQUN4QyxZQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFBRyxDQUFDOzs7OztJQUV4RCxZQUFZLENBQUMsTUFBNkI7UUFDeEMsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7O1lBTkYsVUFBVTs7OztZQXRCRixlQUFlOzs7Ozs7O0lBd0JWLHdEQUF3Qzs7Ozs7QUFXdEQsTUFBTSxPQUFPLG9CQUFxQixTQUFRLFlBQVk7Ozs7Ozs7O0lBWXBELFlBQ1UsSUFBZ0IsRUFDaEIsZUFB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MEM7O0lBRTFDLDZDQUFrRTs7Ozs7SUFPaEUsMkNBQXdCOzs7OztJQUN4QixzREFBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCwgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvYXV0aCc7XHJcbmltcG9ydCB7IExhbmd1YWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBPYmplY3RVdGlscyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCBwb2ludE9uRmVhdHVyZSBmcm9tICdAdHVyZi9wb2ludC1vbi1mZWF0dXJlJztcclxuXHJcbmltcG9ydCB7IEZFQVRVUkUsIEZlYXR1cmUgfSBmcm9tICcuLi8uLi8uLi9mZWF0dXJlJztcclxuaW1wb3J0IHsgR29vZ2xlTGlua3MgfSBmcm9tICcuLy4uLy4uLy4uL3V0aWxzL2dvb2dsZUxpbmtzJztcclxuXHJcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCB9IGZyb20gJy4uL3NlYXJjaC5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgU2VhcmNoU291cmNlLCBUZXh0U2VhcmNoLCBSZXZlcnNlU2VhcmNoIH0gZnJvbSAnLi9zb3VyY2UnO1xyXG5pbXBvcnQge1xyXG4gIFNlYXJjaFNvdXJjZU9wdGlvbnMsXHJcbiAgVGV4dFNlYXJjaE9wdGlvbnMsXHJcbiAgUmV2ZXJzZVNlYXJjaE9wdGlvbnNcclxufSBmcm9tICcuL3NvdXJjZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHtcclxuICBJQ2hlcmNoZURhdGEsXHJcbiAgSUNoZXJjaGVSZXNwb25zZSxcclxuICBJQ2hlcmNoZVJldmVyc2VEYXRhLFxyXG4gIElDaGVyY2hlUmV2ZXJzZVJlc3BvbnNlXHJcbn0gZnJvbSAnLi9pY2hlcmNoZS5pbnRlcmZhY2VzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIElDaGVyY2hlU2VhcmNoUmVzdWx0Rm9ybWF0dGVyIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlKSB7fVxyXG5cclxuICBmb3JtYXRSZXN1bHQocmVzdWx0OiBTZWFyY2hSZXN1bHQ8RmVhdHVyZT4pOiBTZWFyY2hSZXN1bHQ8RmVhdHVyZT4ge1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJQ2hlcmNoZSBzZWFyY2ggc291cmNlXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBJQ2hlcmNoZVNlYXJjaFNvdXJjZSBleHRlbmRzIFNlYXJjaFNvdXJjZSBpbXBsZW1lbnRzIFRleHRTZWFyY2gge1xyXG4gIHN0YXRpYyBpZCA9ICdpY2hlcmNoZSc7XHJcbiAgc3RhdGljIHR5cGUgPSBGRUFUVVJFO1xyXG4gIHN0YXRpYyBwcm9wZXJ0aWVzQmxhY2tsaXN0OiBzdHJpbmdbXSA9IFtdO1xyXG4gIHRpdGxlJDogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xyXG5cclxuICBwcml2YXRlIGhhc2h0YWdzTGlldXhUb0tlZXAgPSBbXTtcclxuXHJcbiAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy50aXRsZSQuZ2V0VmFsdWUoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcclxuICAgIEBJbmplY3QoJ29wdGlvbnMnKSBvcHRpb25zOiBTZWFyY2hTb3VyY2VPcHRpb25zLFxyXG4gICAgQEluamVjdChJQ2hlcmNoZVNlYXJjaFJlc3VsdEZvcm1hdHRlcilcclxuICAgIHByaXZhdGUgZm9ybWF0dGVyOiBJQ2hlcmNoZVNlYXJjaFJlc3VsdEZvcm1hdHRlcixcclxuICAgIGluamVjdG9yOiBJbmplY3RvclxyXG4gICkge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcblxyXG4gICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlXHJcbiAgICAgIC5nZXQodGhpcy5vcHRpb25zLnRpdGxlKVxyXG4gICAgICAuc3Vic2NyaWJlKHRpdGxlID0+IHRoaXMudGl0bGUkLm5leHQodGl0bGUpKTtcclxuXHJcbiAgICBjb25zdCBhdXRoU2VydmljZSA9IGluamVjdG9yLmdldChBdXRoU2VydmljZSk7XHJcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5sZW5ndGgpIHtcclxuICAgICAgaWYgKCFhdXRoU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMuZ2V0QWxsb3dlZFR5cGVzKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYXV0aFNlcnZpY2UuYXV0aGVudGljYXRlJC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5nZXRBbGxvd2VkVHlwZXMoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0SWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBJQ2hlcmNoZVNlYXJjaFNvdXJjZS5pZDtcclxuICB9XHJcblxyXG4gIGdldFR5cGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBJQ2hlcmNoZVNlYXJjaFNvdXJjZS50eXBlO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldERlZmF1bHRPcHRpb25zKCk6IFNlYXJjaFNvdXJjZU9wdGlvbnMge1xyXG4gICAgY29uc3QgbGltaXQgPVxyXG4gICAgICB0aGlzLm9wdGlvbnMucGFyYW1zICYmIHRoaXMub3B0aW9ucy5wYXJhbXMubGltaXRcclxuICAgICAgICA/IE51bWJlcih0aGlzLm9wdGlvbnMucGFyYW1zLmxpbWl0KVxyXG4gICAgICAgIDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgZWNtYXggPVxyXG4gICAgICB0aGlzLm9wdGlvbnMucGFyYW1zICYmIHRoaXMub3B0aW9ucy5wYXJhbXMuZWNtYXhcclxuICAgICAgICA/IE51bWJlcih0aGlzLm9wdGlvbnMucGFyYW1zLmVjbWF4KVxyXG4gICAgICAgIDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgdHlwZXMgPVxyXG4gICAgICB0aGlzLm9wdGlvbnMucGFyYW1zICYmIHRoaXMub3B0aW9ucy5wYXJhbXMudHlwZVxyXG4gICAgICAgID8gdGhpcy5vcHRpb25zLnBhcmFtcy50eXBlXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXHMvZywgJycpXHJcbiAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICAgICAgIC5zcGxpdCgnLCcpXHJcbiAgICAgICAgOiBbXHJcbiAgICAgICAgICAgICdhZHJlc3NlcycsXHJcbiAgICAgICAgICAgICdjb2Rlcy1wb3N0YXV4JyxcclxuICAgICAgICAgICAgJ3JvdXRlcycsXHJcbiAgICAgICAgICAgICdtdW5pY2lwYWxpdGVzJyxcclxuICAgICAgICAgICAgJ21yYycsXHJcbiAgICAgICAgICAgICdyZWdhZG1pbicsXHJcbiAgICAgICAgICAgICdsaWV1eCdcclxuICAgICAgICAgIF07XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLmljaGVyY2hlLm5hbWUnLFxyXG4gICAgICBzZWFyY2hVcmw6ICdodHRwczovL2dlb2VnbC5tc3AuZ291di5xYy5jYS9hcGlzL2ljaGVyY2hlJyxcclxuICAgICAgc2V0dGluZ3M6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAnY2hlY2tib3gnLFxyXG4gICAgICAgICAgdGl0bGU6ICdyZXN1bHRzIHR5cGUnLFxyXG4gICAgICAgICAgbmFtZTogJ3R5cGUnLFxyXG4gICAgICAgICAgdmFsdWVzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLmljaGVyY2hlLnR5cGUuYWRkcmVzcycsXHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdhZHJlc3NlcycsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogdHlwZXMuaW5kZXhPZignYWRyZXNzZXMnKSAhPT0gLTEsXHJcbiAgICAgICAgICAgICAgaGFzaHRhZ3M6IFsnYWRyZXNzZSddXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLmljaGVyY2hlLnR5cGUub2xkQWRkcmVzcycsXHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdhbmNpZW5uZXMtYWRyZXNzZXMnLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHR5cGVzLmluZGV4T2YoJ2FuY2llbm5lcy1hZHJlc3NlcycpICE9PSAtMSxcclxuICAgICAgICAgICAgICBoYXNodGFnczogWydhbmNpZW5uZXMtYWRyZXNzZXMnXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5pY2hlcmNoZS50eXBlLnBvc3RhbENvZGUnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAnY29kZXMtcG9zdGF1eCcsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogdHlwZXMuaW5kZXhPZignY29kZXMtcG9zdGF1eCcpICE9PSAtMSxcclxuICAgICAgICAgICAgICBoYXNodGFnczogWydjb2RlLXBvc3RhbCddXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLmljaGVyY2hlLnR5cGUucm9hZCcsXHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdyb3V0ZXMnLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHR5cGVzLmluZGV4T2YoJ3JvdXRlcycpICE9PSAtMSxcclxuICAgICAgICAgICAgICBoYXNodGFnczogWydyb3V0ZSddXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLmljaGVyY2hlLnR5cGUuY2l0eScsXHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdtdW5pY2lwYWxpdGVzJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0eXBlcy5pbmRleE9mKCdtdW5pY2lwYWxpdGVzJykgIT09IC0xLFxyXG4gICAgICAgICAgICAgIGhhc2h0YWdzOiBbJ211bmljaXBhbGl0w6knLCAnbXVuJ11cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnaWdvLmdlby5zZWFyY2guaWNoZXJjaGUudHlwZS5vbGRDaXR5JyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ2FuY2llbm5lcy1tdW5pY2lwYWxpdGVzJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0eXBlcy5pbmRleE9mKCdhbmNpZW5uZXMtbXVuaWNpcGFsaXRlcycpICE9PSAtMSxcclxuICAgICAgICAgICAgICBoYXNodGFnczogWydhbmNpZW5uZXMtbXVuaWNpcGFsaXRlcyddXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLmljaGVyY2hlLnR5cGUubXJjJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ21yYycsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogdHlwZXMuaW5kZXhPZignbXJjJykgIT09IC0xLFxyXG4gICAgICAgICAgICAgIGhhc2h0YWdzOiBbJ21yYyddXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLmljaGVyY2hlLnR5cGUucmVnYWRtaW4nLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAncmVnYWRtaW4nLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHR5cGVzLmluZGV4T2YoJ3JlZ2FkbWluJykgIT09IC0xLFxyXG4gICAgICAgICAgICAgIGhhc2h0YWdzOiBbJ3LDqWdpb24tYWRtaW5pc3RyYXRpdmUnLCAncmVnYWRtaW4nXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5pY2hlcmNoZS50eXBlLmVudHJlcHJpc2UnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAnZW50cmVwcmlzZXMnLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHR5cGVzLmluZGV4T2YoJ2VudHJlcHJpc2VzJykgIT09IC0xLFxyXG4gICAgICAgICAgICAgIGF2YWlsYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgaGFzaHRhZ3M6IFsnZW50cmVwcmlzZSddXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLmljaGVyY2hlLnR5cGUucGxhY2UnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAnbGlldXgnLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHR5cGVzLmluZGV4T2YoJ2xpZXV4JykgIT09IC0xLFxyXG4gICAgICAgICAgICAgIGhhc2h0YWdzOiBbJ2xpZXUnXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5pY2hlcmNoZS50eXBlLnN1bWknLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAnYm9ybmVzLXN1bWknLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHR5cGVzLmluZGV4T2YoJ2Jvcm5lcy1zdW1pJykgIT09IC0xLFxyXG4gICAgICAgICAgICAgIGhhc2h0YWdzOiBbJ2Jvcm5lJywgJ2Jvcm5lcycsICdzdW1pJ11cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnaWdvLmdlby5zZWFyY2guaWNoZXJjaGUudHlwZS5rbScsXHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdib3JuZXMta20nLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIGhhc2h0YWdzOiBbJ2Jvcm5lJywgJ2Jvcm5lcycsICdyZXDDqHJlJywgJ2ttJ11cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdHlwZTogJ3JhZGlvYnV0dG9uJyxcclxuICAgICAgICAgIHRpdGxlOiAncmVzdWx0cyBsaW1pdCcsXHJcbiAgICAgICAgICBuYW1lOiAnbGltaXQnLFxyXG4gICAgICAgICAgdmFsdWVzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJzEnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAxLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGxpbWl0ID09PSAxXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJzUnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiA1LFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGxpbWl0ID09PSA1IHx8ICFsaW1pdFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICcxMCcsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IDEwLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGxpbWl0ID09PSAxMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICcyNScsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IDI1LFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGxpbWl0ID09PSAyNVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICc1MCcsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IDUwLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGxpbWl0ID09PSA1MFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAncmFkaW9idXR0b24nLFxyXG4gICAgICAgICAgdGl0bGU6ICdlY21heCcsXHJcbiAgICAgICAgICBuYW1lOiAnZWNtYXgnLFxyXG4gICAgICAgICAgdmFsdWVzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJzEwICUnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAxMCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBlY21heCA9PT0gMTBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnMzAgJScsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IDMwLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGVjbWF4ID09PSAzMCB8fCAhZWNtYXhcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnNTAgJScsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IDUwLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGVjbWF4ID09PSA1MFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICc3NSAlJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogNzUsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogZWNtYXggPT09IDc1XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJzEwMCAlJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogMTAwLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGVjbWF4ID09PSAxMDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdHlwZTogJ3JhZGlvYnV0dG9uJyxcclxuICAgICAgICAgIHRpdGxlOiAncmVzdHJpY3RFeHRlbnQnLFxyXG4gICAgICAgICAgbmFtZTogJ2xvYycsXHJcbiAgICAgICAgICB2YWx1ZXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnaWdvLmdlby5zZWFyY2guaWNoZXJjaGUucmVzdHJpY3RFeHRlbnQubWFwJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ3RydWUnLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLmljaGVyY2hlLnJlc3RyaWN0RXh0ZW50LnF1ZWJlYycsXHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdmYWxzZScsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIGEgbG9jYXRpb24gYnkgbmFtZSBvciBrZXl3b3JkXHJcbiAgICogQHBhcmFtIHRlcm0gTG9jYXRpb24gbmFtZSBvciBrZXl3b3JkXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiA8U2VhcmNoUmVzdWx0PEZlYXR1cmU+W11cclxuICAgKi9cclxuICBzZWFyY2goXHJcbiAgICB0ZXJtOiBzdHJpbmcsXHJcbiAgICBvcHRpb25zPzogVGV4dFNlYXJjaE9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdPiB7XHJcbiAgICBjb25zdCBwYXJhbXMgPSB0aGlzLmNvbXB1dGVSZXF1ZXN0UGFyYW1zKHRlcm0sIG9wdGlvbnMgfHwge30pO1xyXG4gICAgaWYgKCFwYXJhbXMuZ2V0KCd0eXBlJykubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiBvZihbXSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9wdGlvbnMucGFyYW1zLnBhZ2UgPSBwYXJhbXMuZ2V0KCdwYWdlJykgfHwgJzEnO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke3RoaXMuc2VhcmNoVXJsfS9nZW9jb2RlYCwgeyBwYXJhbXMgfSkucGlwZShcclxuICAgICAgbWFwKChyZXNwb25zZTogSUNoZXJjaGVSZXNwb25zZSkgPT4gdGhpcy5leHRyYWN0UmVzdWx0cyhyZXNwb25zZSkpLFxyXG4gICAgICBjYXRjaEVycm9yKGVyciA9PiB7XHJcbiAgICAgICAgZXJyLmVycm9yLnRvRGlzcGxheSA9IHRydWU7XHJcbiAgICAgICAgZXJyLmVycm9yLnRpdGxlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICB0aGlzLmdldERlZmF1bHRPcHRpb25zKCkudGl0bGVcclxuICAgICAgICApO1xyXG4gICAgICAgIHRocm93IGVycjtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEFsbG93ZWRUeXBlcygpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLmdldChgJHt0aGlzLnNlYXJjaFVybH0vdHlwZXNgKVxyXG4gICAgICAuc3Vic2NyaWJlKCh0eXBlczogc3RyaW5nW10pID0+IHtcclxuICAgICAgICBjb25zdCB0eXBlU2V0dGluZyA9IHRoaXMuc2V0dGluZ3MuZmluZChzID0+IHMubmFtZSA9PT0gJ3R5cGUnKTtcclxuICAgICAgICB0eXBlU2V0dGluZy52YWx1ZXMuZm9yRWFjaCh2ID0+IHtcclxuICAgICAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChgXiR7di52YWx1ZX0oXFxcXC58JClgKTtcclxuICAgICAgICAgIGNvbnN0IHR5cGVzTWF0Y2hlZCA9IHR5cGVzLmZpbHRlcih2YWx1ZSA9PiByZWdleC50ZXN0KHZhbHVlKSk7XHJcbiAgICAgICAgICB2LmF2YWlsYWJsZSA9IHR5cGVzTWF0Y2hlZC5sZW5ndGggPiAwO1xyXG4gICAgICAgICAgaWYgKHYudmFsdWUgPT09ICdsaWV1eCcpIHtcclxuICAgICAgICAgICAgdGhpcy5oYXNodGFnc0xpZXV4VG9LZWVwID0gW1xyXG4gICAgICAgICAgICAgIC4uLihuZXcgU2V0KFxyXG4gICAgICAgICAgICAgICAgdHlwZXNNYXRjaGVkXHJcbiAgICAgICAgICAgICAgICAgIC5tYXAodCA9PiB0LnNwbGl0KCcuJykpXHJcbiAgICAgICAgICAgICAgICAgIC5yZWR1Y2UoKGEsIGIpID0+IGEuY29uY2F0KGIpKVxyXG4gICAgICAgICAgICAgICAgICAuZmlsdGVyKHQgPT4gdCAhPT0gJ2xpZXV4JylcclxuICAgICAgICAgICAgICApIGFzIGFueSlcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVSZXF1ZXN0UGFyYW1zKFxyXG4gICAgdGVybTogc3RyaW5nLFxyXG4gICAgb3B0aW9uczogVGV4dFNlYXJjaE9wdGlvbnNcclxuICApOiBIdHRwUGFyYW1zIHtcclxuICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiBhbnkgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgICB7XHJcbiAgICAgICAgZ2VvbWV0cnk6IHRydWUsXHJcbiAgICAgICAgYmJveDogdHJ1ZSxcclxuICAgICAgICBpY29uOiB0cnVlLFxyXG4gICAgICAgIHR5cGU6XHJcbiAgICAgICAgICAnYWRyZXNzZXMsY29kZXMtcG9zdGF1eCxtdW5pY2lwYWxpdGVzLG1yYyxyZWdhZG1pbixsaWV1eCxlbnRyZXByaXNlcyxib3JuZXMtc3VtaSdcclxuICAgICAgfSxcclxuICAgICAgdGhpcy5wYXJhbXMsXHJcbiAgICAgIHRoaXMuY29tcHV0ZU9wdGlvbnNQYXJhbSh0ZXJtLCBvcHRpb25zIHx8IHt9KS5wYXJhbXMsXHJcbiAgICAgIHtcclxuICAgICAgICBxOiB0aGlzLmNvbXB1dGVUZXJtKHRlcm0pLFxyXG4gICAgICAgIHBhZ2U6IG9wdGlvbnMucGFnZVxyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIGlmIChxdWVyeVBhcmFtcy5sb2MgPT09ICd0cnVlJykge1xyXG4gICAgICBjb25zdCBbeE1pbiwgeU1pbiwgeE1heCwgeU1heF0gPSBvcHRpb25zLmV4dGVudDtcclxuICAgICAgcXVlcnlQYXJhbXMubG9jID0gYCR7eE1pbn0sJHt5TWlufTske3hNYXh9LCR7eU1pbn07JHt4TWF4fSwke3lNYXh9OyR7eE1pbn0sJHt5TWF4fTske3hNaW59LCR7eU1pbn1gO1xyXG4gICAgfSBlbHNlIGlmIChxdWVyeVBhcmFtcy5sb2MgPT09ICdmYWxzZScpIHtcclxuICAgICAgZGVsZXRlIHF1ZXJ5UGFyYW1zLmxvYztcclxuICAgIH1cclxuXHJcbiAgICBpZiAocXVlcnlQYXJhbXMucS5pbmRleE9mKCcjJykgIT09IC0xKSB7XHJcbiAgICAgIHF1ZXJ5UGFyYW1zLnR5cGUgPSAnbGlldXgnO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgSHR0cFBhcmFtcyh7IGZyb21PYmplY3Q6IE9iamVjdFV0aWxzLnJlbW92ZVVuZGVmaW5lZChxdWVyeVBhcmFtcykgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RSZXN1bHRzKHJlc3BvbnNlOiBJQ2hlcmNoZVJlc3BvbnNlKTogU2VhcmNoUmVzdWx0PEZlYXR1cmU+W10ge1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlLmZlYXR1cmVzLm1hcCgoZGF0YTogSUNoZXJjaGVEYXRhKSA9PiB7XHJcbiAgICAgIHJldHVybiB0aGlzLmZvcm1hdHRlci5mb3JtYXRSZXN1bHQodGhpcy5kYXRhVG9SZXN1bHQoZGF0YSwgcmVzcG9uc2UpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkYXRhVG9SZXN1bHQoZGF0YTogSUNoZXJjaGVEYXRhLCByZXNwb25zZT86IElDaGVyY2hlUmVzcG9uc2UpOiBTZWFyY2hSZXN1bHQ8RmVhdHVyZT4ge1xyXG4gICAgY29uc3QgcHJvcGVydGllcyA9IHRoaXMuY29tcHV0ZVByb3BlcnRpZXMoZGF0YSk7XHJcbiAgICBjb25zdCBpZCA9IFt0aGlzLmdldElkKCksIHByb3BlcnRpZXMudHlwZSwgcHJvcGVydGllcy5jb2RlXS5qb2luKCcuJyk7XHJcblxyXG4gICAgY29uc3QgdGl0bGVIdG1sID0gZGF0YS5oaWdobGlnaHQudGl0bGUgfHwgZGF0YS5wcm9wZXJ0aWVzLm5vbTtcclxuICAgIGNvbnN0IHN1YnRpdGxlSHRtbCA9IGRhdGEuaGlnaGxpZ2h0LnRpdGxlMlxyXG4gICAgICA/ICcgPHNtYWxsPiAnICsgZGF0YS5oaWdobGlnaHQudGl0bGUyICsgJzwvc21hbGw+J1xyXG4gICAgICA6ICcnO1xyXG4gICAgY29uc3Qgc3VidGl0bGVIdG1sMiA9IGRhdGEuaGlnaGxpZ2h0LnRpdGxlM1xyXG4gICAgICA/ICc8YnI+PHNtYWxsPiAnICsgZGF0YS5oaWdobGlnaHQudGl0bGUzICsgJzwvc21hbGw+J1xyXG4gICAgICA6ICcnO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNvdXJjZTogdGhpcyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHR5cGU6IEZFQVRVUkUsXHJcbiAgICAgICAgcHJvamVjdGlvbjogJ0VQU0c6NDMyNicsXHJcbiAgICAgICAgZ2VvbWV0cnk6IGRhdGEuZ2VvbWV0cnksXHJcbiAgICAgICAgZXh0ZW50OiBkYXRhLmJib3gsXHJcbiAgICAgICAgcHJvcGVydGllcyxcclxuICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICBpZCxcclxuICAgICAgICAgIHRpdGxlOiBkYXRhLnByb3BlcnRpZXMubm9tXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBtZXRhOiB7XHJcbiAgICAgICAgZGF0YVR5cGU6IEZFQVRVUkUsXHJcbiAgICAgICAgaWQsXHJcbiAgICAgICAgdGl0bGU6IGRhdGEucHJvcGVydGllcy5ub20sXHJcbiAgICAgICAgdGl0bGVIdG1sOiB0aXRsZUh0bWwgKyBzdWJ0aXRsZUh0bWwgKyBzdWJ0aXRsZUh0bWwyLFxyXG4gICAgICAgIGljb246IGRhdGEuaWNvbiB8fCAnbWFwLW1hcmtlcicsXHJcbiAgICAgICAgbmV4dFBhZ2U6IHJlc3BvbnNlLmZlYXR1cmVzLmxlbmd0aCAlICt0aGlzLm9wdGlvbnMucGFyYW1zLmxpbWl0ID09PSAwICYmICt0aGlzLm9wdGlvbnMucGFyYW1zLnBhZ2UgPCAxMFxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlUHJvcGVydGllcyhkYXRhOiBJQ2hlcmNoZURhdGEpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHtcclxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSBPYmplY3RVdGlscy5yZW1vdmVLZXlzKFxyXG4gICAgICBkYXRhLnByb3BlcnRpZXMsXHJcbiAgICAgIElDaGVyY2hlU2VhcmNoU291cmNlLnByb3BlcnRpZXNCbGFja2xpc3RcclxuICAgICk7XHJcblxyXG4gICAgaWYgKGRhdGEuZ2VvbWV0cnkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7IHR5cGU6IGRhdGEuaW5kZXggfSwgcHJvcGVydGllcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ29vZ2xlTGlua3NQcm9wZXJ0aWVzOiB7XHJcbiAgICAgIEdvb2dsZU1hcHM6IHN0cmluZztcclxuICAgICAgR29vZ2xlU3RyZWV0Vmlldz86IHN0cmluZztcclxuICAgIH0gPSB7XHJcbiAgICAgIEdvb2dsZU1hcHM6ICcnXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBnb29nbGVNYXBzO1xyXG4gICAgaWYgKGRhdGEuZ2VvbWV0cnkudHlwZSA9PT0gJ1BvaW50Jykge1xyXG4gICAgICBnb29nbGVNYXBzID0gR29vZ2xlTGlua3MuZ2V0R29vZ2xlTWFwc0Nvb3JkTGluayhcclxuICAgICAgICBkYXRhLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzBdLFxyXG4gICAgICAgIGRhdGEuZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMV1cclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHBvaW50ID0gcG9pbnRPbkZlYXR1cmUoZGF0YS5nZW9tZXRyeSk7XHJcbiAgICAgIGdvb2dsZU1hcHMgPSBHb29nbGVMaW5rcy5nZXRHb29nbGVNYXBzQ29vcmRMaW5rKHBvaW50Lmdlb21ldHJ5LmNvb3JkaW5hdGVzWzBdLCBwb2ludC5nZW9tZXRyeS5jb29yZGluYXRlc1sxXSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGdvb2dsZU1hcHNOb207XHJcbiAgICBpZiAoZGF0YS5pbmRleCA9PT0gJ3JvdXRlcycpIHtcclxuICAgICAgZ29vZ2xlTWFwc05vbSA9IEdvb2dsZUxpbmtzLmdldEdvb2dsZU1hcHNOYW1lTGluayhkYXRhLnByb3BlcnRpZXMubm9tICsgJywgJyArIGRhdGEucHJvcGVydGllcy5tdW5pY2lwYWxpdGUpO1xyXG4gICAgfSBlbHNlIGlmIChkYXRhLmluZGV4ID09PSAnbXVuaWNpcGFsaXRlcycpIHtcclxuICAgICAgZ29vZ2xlTWFwc05vbSA9IEdvb2dsZUxpbmtzLmdldEdvb2dsZU1hcHNOYW1lTGluayhkYXRhLnByb3BlcnRpZXMubm9tICsgJywgJyArIGRhdGEucHJvcGVydGllcy5yZWdBZG1pbik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBnb29nbGVNYXBzTm9tID0gR29vZ2xlTGlua3MuZ2V0R29vZ2xlTWFwc05hbWVMaW5rKGRhdGEucHJvcGVydGllcy5ub20gfHwgZGF0YS5oaWdobGlnaHQudGl0bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdvb2dsZUxpbmtzUHJvcGVydGllcy5Hb29nbGVNYXBzID0gJzxhIGhyZWY9JyArIGdvb2dsZU1hcHMgKyAnIHRhcmdldD1cIl9ibGFua1wiPicgK1xyXG4gICAgICB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5zZWFyY2hCeUNvb3JkJykgKyAnPC9hPiA8YnIgLz4gPGEgaHJlZj0nICsgZ29vZ2xlTWFwc05vbSArXHJcbiAgICAgICAgJyB0YXJnZXQ9XCJfYmxhbmtcIj4nICsgdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uc2VhcmNoQnlOYW1lJykgKyAnPC9hPic7XHJcblxyXG4gICAgaWYgKGRhdGEuZ2VvbWV0cnkudHlwZSA9PT0gJ1BvaW50Jykge1xyXG4gICAgICBnb29nbGVMaW5rc1Byb3BlcnRpZXMuR29vZ2xlU3RyZWV0VmlldyA9IEdvb2dsZUxpbmtzLmdldEdvb2dsZVN0cmVldFZpZXdMaW5rKFxyXG4gICAgICAgIGRhdGEuZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMF0sXHJcbiAgICAgICAgZGF0YS5nZW9tZXRyeS5jb29yZGluYXRlc1sxXVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKFxyXG4gICAgICB7IHR5cGU6IGRhdGEuaW5kZXggfSxcclxuICAgICAgcHJvcGVydGllcyxcclxuICAgICAgZ29vZ2xlTGlua3NQcm9wZXJ0aWVzXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIGhhc2h0YWcgZnJvbSBxdWVyeVxyXG4gICAqIEBwYXJhbSB0ZXJtIFF1ZXJ5IHdpdGggaGFzaHRhZ1xyXG4gICAqL1xyXG4gIHByaXZhdGUgY29tcHV0ZVRlcm0odGVybTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIC8vIEtlZXAgaGFzaHRhZ3MgZm9yIFwibGlldXhcIlxyXG4gICAgY29uc3QgaGFzaHRhZ3MgPSB0ZXJtLm1hdGNoKC8oI1teXFxzXSspL2cpIHx8IFtdO1xyXG4gICAgbGV0IGtlZXAgPSBmYWxzZTtcclxuICAgIGtlZXAgPSBoYXNodGFncy5zb21lKGhhc2h0YWcgPT4ge1xyXG4gICAgICBjb25zdCBoYXNodGFnS2V5ID0gaGFzaHRhZy5zdWJzdHJpbmcoMSk7XHJcbiAgICAgIHJldHVybiB0aGlzLmhhc2h0YWdzTGlldXhUb0tlZXAuc29tZShcclxuICAgICAgICBoID0+XHJcbiAgICAgICAgICBoXHJcbiAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICAgICAgIC5ub3JtYWxpemUoJ05GRCcpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXS9nLCAnJykgPT09XHJcbiAgICAgICAgICBoYXNodGFnS2V5XHJcbiAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICAgICAgIC5ub3JtYWxpemUoJ05GRCcpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXS9nLCAnJylcclxuICAgICAgKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICgha2VlcCkge1xyXG4gICAgICB0ZXJtID0gdGVybS5yZXBsYWNlKC8oI1teXFxzXSopL2csICcnKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGVybS5yZXBsYWNlKC9bXlxcd8OALcO/ICFcXC1cXChcXCksJyNdKy9nLCAnJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgaGFzaHRhZyB0byBwYXJhbSBpZiB2YWxpZFxyXG4gICAqIEBwYXJhbSB0ZXJtIFF1ZXJ5IHdpdGggaGFzaHRhZ1xyXG4gICAqIEBwYXJhbSBvcHRpb25zIFRleHRTZWFyY2hPcHRpb25zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjb21wdXRlT3B0aW9uc1BhcmFtKFxyXG4gICAgdGVybTogc3RyaW5nLFxyXG4gICAgb3B0aW9uczogVGV4dFNlYXJjaE9wdGlvbnNcclxuICApOiBUZXh0U2VhcmNoT3B0aW9ucyB7XHJcbiAgICBjb25zdCBoYXNodGFncyA9IHN1cGVyLmdldEhhc2h0YWdzVmFsaWQodGVybSwgJ3R5cGUnKTtcclxuICAgIGlmIChoYXNodGFncykge1xyXG4gICAgICBvcHRpb25zLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24ob3B0aW9ucy5wYXJhbXMgfHwge30sIHtcclxuICAgICAgICB0eXBlOiBoYXNodGFncy5qb2luKCcsJylcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogSUNoZXJjaGVSZXZlcnNlIHNlYXJjaCBzb3VyY2VcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIElDaGVyY2hlUmV2ZXJzZVNlYXJjaFNvdXJjZSBleHRlbmRzIFNlYXJjaFNvdXJjZVxyXG4gIGltcGxlbWVudHMgUmV2ZXJzZVNlYXJjaCB7XHJcbiAgc3RhdGljIGlkID0gJ2ljaGVyY2hlcmV2ZXJzZSc7XHJcbiAgc3RhdGljIHR5cGUgPSBGRUFUVVJFO1xyXG4gIHN0YXRpYyBwcm9wZXJ0aWVzQmxhY2tsaXN0OiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICB0aXRsZSQ6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcclxuXHJcbiAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy50aXRsZSQuZ2V0VmFsdWUoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcclxuICAgIEBJbmplY3QoJ29wdGlvbnMnKSBvcHRpb25zOiBTZWFyY2hTb3VyY2VPcHRpb25zLFxyXG4gICAgaW5qZWN0b3I6IEluamVjdG9yXHJcbiAgKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuXHJcbiAgICB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGVcclxuICAgICAgLmdldCh0aGlzLm9wdGlvbnMudGl0bGUpXHJcbiAgICAgIC5zdWJzY3JpYmUodGl0bGUgPT4gdGhpcy50aXRsZSQubmV4dCh0aXRsZSkpO1xyXG5cclxuICAgIGNvbnN0IGF1dGhTZXJ2aWNlID0gaW5qZWN0b3IuZ2V0KEF1dGhTZXJ2aWNlKTtcclxuICAgIGlmICh0aGlzLnNldHRpbmdzLmxlbmd0aCkge1xyXG4gICAgICBpZiAoIWF1dGhTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5nZXRBbGxvd2VkVHlwZXMoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhdXRoU2VydmljZS5hdXRoZW50aWNhdGUkLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmdldEFsbG93ZWRUeXBlcygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRJZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIElDaGVyY2hlUmV2ZXJzZVNlYXJjaFNvdXJjZS5pZDtcclxuICB9XHJcblxyXG4gIGdldFR5cGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBJQ2hlcmNoZVJldmVyc2VTZWFyY2hTb3VyY2UudHlwZTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXREZWZhdWx0T3B0aW9ucygpOiBTZWFyY2hTb3VyY2VPcHRpb25zIHtcclxuICAgIGNvbnN0IHR5cGVzID1cclxuICAgICAgdGhpcy5vcHRpb25zLnBhcmFtcyAmJiB0aGlzLm9wdGlvbnMucGFyYW1zLnR5cGVcclxuICAgICAgICA/IHRoaXMub3B0aW9ucy5wYXJhbXMudHlwZVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxzL2csICcnKVxyXG4gICAgICAgICAgICAudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgICAgICAuc3BsaXQoJywnKVxyXG4gICAgICAgIDogWydhZHJlc3NlcycsICdtdW5pY2lwYWxpdGVzJywgJ21yYycsICdyZWdhZG1pbiddO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiAnaWdvLmdlby5zZWFyY2guaWNoZXJjaGVSZXZlcnNlLm5hbWUnLFxyXG4gICAgICBzZWFyY2hVcmw6ICdodHRwczovL2dlb2VnbC5tc3AuZ291di5xYy5jYS9hcGlzL3RlcnJhcGknLFxyXG4gICAgICBzZXR0aW5nczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdjaGVja2JveCcsXHJcbiAgICAgICAgICB0aXRsZTogJ3Jlc3VsdHMgdHlwZScsXHJcbiAgICAgICAgICBuYW1lOiAndHlwZScsXHJcbiAgICAgICAgICB2YWx1ZXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnaWdvLmdlby5zZWFyY2guaWNoZXJjaGUudHlwZS5hZGRyZXNzJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ2FkcmVzc2VzJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0eXBlcy5pbmRleE9mKCdhZHJlc3NlcycpICE9PSAtMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5pY2hlcmNoZS50eXBlLnJvYWQnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAncm91dGVzJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0eXBlcy5pbmRleE9mKCdyb3V0ZXMnKSAhPT0gLTEsXHJcbiAgICAgICAgICAgICAgYXZhaWxhYmxlOiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5pY2hlcmNoZS50eXBlLmRpc3RyaWN0JyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ2Fycm9uZGlzc2VtZW50cycsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogdHlwZXMuaW5kZXhPZignYXJyb25kaXNzZW1lbnRzJykgIT09IC0xXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLmljaGVyY2hlLnR5cGUuY2l0eScsXHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdtdW5pY2lwYWxpdGVzJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0eXBlcy5pbmRleE9mKCdtdW5pY2lwYWxpdGVzJykgIT09IC0xXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLmljaGVyY2hlLnR5cGUubXJjJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ21yYycsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogdHlwZXMuaW5kZXhPZignbXJjJykgIT09IC0xXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLmljaGVyY2hlLnR5cGUucmVnYWRtaW4nLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAncmVnYWRtaW4nLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHR5cGVzLmluZGV4T2YoJ3JlZ2FkbWluJykgIT09IC0xXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdyYWRpb2J1dHRvbicsXHJcbiAgICAgICAgICB0aXRsZTogJ3JhZGl1cycsXHJcbiAgICAgICAgICBuYW1lOiAnYnVmZmVyJyxcclxuICAgICAgICAgIHZhbHVlczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICcxMDAgbScsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IDEwMCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiAhdGhpcy5vcHRpb25zLmRpc3RhbmNlIHx8IHRoaXMub3B0aW9ucy5kaXN0YW5jZSA9PT0gMTAwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJzUwMCBtJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogNTAwLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHRoaXMub3B0aW9ucy5kaXN0YW5jZSA9PT0gNTAwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJzEga20nLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAxMDAwLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHRoaXMub3B0aW9ucy5kaXN0YW5jZSA9PT0gMTAwMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICcyIGttJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogMjAwMCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0aGlzLm9wdGlvbnMuZGlzdGFuY2UgPT09IDIwMDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnNSBrbScsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IDUwMDAsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogdGhpcy5vcHRpb25zLmRpc3RhbmNlID09PSA1MDAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggYSBsb2NhdGlvbiBieSBjb29yZGluYXRlc1xyXG4gICAqIEBwYXJhbSBsb25MYXQgTG9jYXRpb24gY29vcmRpbmF0ZXNcclxuICAgKiBAcGFyYW0gZGlzdGFuY2UgU2VhcmNoIHJhaWR1cyBhcm91bmQgbG9uTGF0XHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiA8U2VhcmNoUmVzdWx0PEZlYXR1cmU+W11cclxuICAgKi9cclxuICByZXZlcnNlU2VhcmNoKFxyXG4gICAgbG9uTGF0OiBbbnVtYmVyLCBudW1iZXJdLFxyXG4gICAgb3B0aW9ucz86IFJldmVyc2VTZWFyY2hPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxTZWFyY2hSZXN1bHQ8RmVhdHVyZT5bXT4ge1xyXG4gICAgY29uc3QgcGFyYW1zID0gdGhpcy5jb21wdXRlUmVxdWVzdFBhcmFtcyhsb25MYXQsIG9wdGlvbnMgfHwge30pO1xyXG4gICAgaWYgKCFwYXJhbXMuZ2V0KCd0eXBlJykubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiBvZihbXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHt0aGlzLnNlYXJjaFVybH0vbG9jYXRlYCwgeyBwYXJhbXMgfSkucGlwZShcclxuICAgICAgbWFwKChyZXNwb25zZTogSUNoZXJjaGVSZXZlcnNlUmVzcG9uc2UpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5leHRyYWN0UmVzdWx0cyhyZXNwb25zZSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRBbGxvd2VkVHlwZXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5nZXQoYCR7dGhpcy5zZWFyY2hVcmx9L3R5cGVzYClcclxuICAgICAgLnN1YnNjcmliZSgodHlwZXM6IHN0cmluZ1tdKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdHlwZVNldHRpbmcgPSB0aGlzLnNldHRpbmdzLmZpbmQocyA9PiBzLm5hbWUgPT09ICd0eXBlJyk7XHJcbiAgICAgICAgdHlwZVNldHRpbmcudmFsdWVzLmZvckVhY2godiA9PiB7XHJcbiAgICAgICAgICB2LmF2YWlsYWJsZSA9IHR5cGVzLmluZGV4T2Yodi52YWx1ZSBhcyBzdHJpbmcpID4gLTE7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlUmVxdWVzdFBhcmFtcyhcclxuICAgIGxvbkxhdDogW251bWJlciwgbnVtYmVyXSxcclxuICAgIG9wdGlvbnM/OiBSZXZlcnNlU2VhcmNoT3B0aW9uc1xyXG4gICk6IEh0dHBQYXJhbXMge1xyXG4gICAgaWYgKG9wdGlvbnMuZGlzdGFuY2UgfHwgdGhpcy5vcHRpb25zLmRpc3RhbmNlKSB7XHJcbiAgICAgIG9wdGlvbnMucGFyYW1zID0gT2JqZWN0LmFzc2lnbihvcHRpb25zLnBhcmFtcyB8fCB7fSwge1xyXG4gICAgICAgIGJ1ZmZlcjogb3B0aW9ucy5kaXN0YW5jZSB8fCB0aGlzLm9wdGlvbnMuZGlzdGFuY2VcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBIdHRwUGFyYW1zKHtcclxuICAgICAgZnJvbU9iamVjdDogT2JqZWN0LmFzc2lnbihcclxuICAgICAgICB7XHJcbiAgICAgICAgICBsb2M6IGxvbkxhdC5qb2luKCcsJyksXHJcbiAgICAgICAgICBzb3J0OiAnZGlzdGFuY2UnLFxyXG4gICAgICAgICAgZ2VvbWV0cnk6IHRydWUsXHJcbiAgICAgICAgICBpY29uOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvcHRpb25zLnBhcmFtcyB8fCB7fSxcclxuICAgICAgICB0aGlzLnBhcmFtc1xyXG4gICAgICApXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdFJlc3VsdHMoXHJcbiAgICByZXNwb25zZTogSUNoZXJjaGVSZXZlcnNlUmVzcG9uc2VcclxuICApOiBTZWFyY2hSZXN1bHQ8RmVhdHVyZT5bXSB7XHJcbiAgICByZXR1cm4gcmVzcG9uc2UuZmVhdHVyZXMubWFwKChkYXRhOiBJQ2hlcmNoZVJldmVyc2VEYXRhKSA9PiB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRhdGFUb1Jlc3VsdChkYXRhKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRTdWJ0aXRsZShkYXRhOiBJQ2hlcmNoZVJldmVyc2VEYXRhKSB7XHJcbiAgICBpZiAoIXRoaXMuc2V0dGluZ3MubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIGxldCBzdWJ0aXRsZSA9ICcnO1xyXG4gICAgc3dpdGNoIChkYXRhLnByb3BlcnRpZXMudHlwZSkge1xyXG4gICAgICBjYXNlICdhcnJvbmRpc3NlbWVudHMnOlxyXG4gICAgICAgIHN1YnRpdGxlID0gZGF0YS5wcm9wZXJ0aWVzLm11bmljaXBhbGl0ZSArICcgKEFycm9uZGlzc2VtZW50KSc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29uc3QgdHlwZVNldHRpbmcgPSB0aGlzLnNldHRpbmdzLmZpbmQocyA9PiBzLm5hbWUgPT09ICd0eXBlJyk7XHJcbiAgICAgICAgY29uc3QgdHlwZSA9IHR5cGVTZXR0aW5nLnZhbHVlcy5maW5kKFxyXG4gICAgICAgICAgdCA9PiB0LnZhbHVlID09PSBkYXRhLnByb3BlcnRpZXMudHlwZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKHR5cGUpIHtcclxuICAgICAgICAgIHN1YnRpdGxlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQodHlwZS50aXRsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1YnRpdGxlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkYXRhVG9SZXN1bHQoZGF0YTogSUNoZXJjaGVSZXZlcnNlRGF0YSk6IFNlYXJjaFJlc3VsdDxGZWF0dXJlPiB7XHJcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gdGhpcy5jb21wdXRlUHJvcGVydGllcyhkYXRhKTtcclxuICAgIGNvbnN0IGV4dGVudCA9IHRoaXMuY29tcHV0ZUV4dGVudChkYXRhKTtcclxuICAgIGNvbnN0IGlkID0gW3RoaXMuZ2V0SWQoKSwgcHJvcGVydGllcy50eXBlLCBwcm9wZXJ0aWVzLmNvZGVdLmpvaW4oJy4nKTtcclxuXHJcbiAgICBjb25zdCB0aXRsZUh0bWwgPSBkYXRhLnByb3BlcnRpZXMubm9tO1xyXG4gICAgY29uc3Qgc3VidGl0bGVIdG1sID0gJyA8c21hbGw+ICcgKyB0aGlzLmdldFN1YnRpdGxlKGRhdGEpICsgJzwvc21hbGw+JztcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzb3VyY2U6IHRoaXMsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICB0eXBlOiBGRUFUVVJFLFxyXG4gICAgICAgIHByb2plY3Rpb246ICdFUFNHOjQzMjYnLFxyXG4gICAgICAgIGdlb21ldHJ5OiBkYXRhLmdlb21ldHJ5LFxyXG4gICAgICAgIGV4dGVudCxcclxuICAgICAgICBwcm9wZXJ0aWVzLFxyXG4gICAgICAgIG1ldGE6IHtcclxuICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgdGl0bGU6IGRhdGEucHJvcGVydGllcy5ub21cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG1ldGE6IHtcclxuICAgICAgICBkYXRhVHlwZTogRkVBVFVSRSxcclxuICAgICAgICBpZCxcclxuICAgICAgICB0aXRsZTogZGF0YS5wcm9wZXJ0aWVzLm5vbSxcclxuICAgICAgICB0aXRsZUh0bWw6IHRpdGxlSHRtbCArIHN1YnRpdGxlSHRtbCxcclxuICAgICAgICBpY29uOiBkYXRhLmljb24gfHwgJ21hcC1tYXJrZXInXHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVQcm9wZXJ0aWVzKGRhdGE6IElDaGVyY2hlUmV2ZXJzZURhdGEpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHtcclxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSBPYmplY3RVdGlscy5yZW1vdmVLZXlzKFxyXG4gICAgICBkYXRhLnByb3BlcnRpZXMsXHJcbiAgICAgIElDaGVyY2hlUmV2ZXJzZVNlYXJjaFNvdXJjZS5wcm9wZXJ0aWVzQmxhY2tsaXN0XHJcbiAgICApO1xyXG4gICAgcmV0dXJuIHByb3BlcnRpZXM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVFeHRlbnQoXHJcbiAgICBkYXRhOiBJQ2hlcmNoZVJldmVyc2VEYXRhXHJcbiAgKTogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0gfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIGRhdGEuYmJveFxyXG4gICAgICA/IFtkYXRhLmJib3hbMF0sIGRhdGEuYmJveFsyXSwgZGF0YS5iYm94WzFdLCBkYXRhLmJib3hbM11dXHJcbiAgICAgIDogdW5kZWZpbmVkO1xyXG4gIH1cclxufVxyXG4iXX0=