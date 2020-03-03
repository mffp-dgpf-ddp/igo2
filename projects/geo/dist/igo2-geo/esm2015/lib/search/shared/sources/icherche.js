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
            GoogleMaps: GoogleLinks.getGoogleMapsLink(data.geometry.coordinates[0], data.geometry.coordinates[1])
        };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNoZXJjaGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NoYXJlZC9zb3VyY2VzL2ljaGVyY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUU5RCxPQUFPLEVBQWMsRUFBRSxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2RCxPQUFPLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRTFDLE9BQU8sRUFBRSxPQUFPLEVBQVcsTUFBTSxrQkFBa0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFHM0QsT0FBTyxFQUFFLFlBQVksRUFBNkIsTUFBTSxVQUFVLENBQUM7QUFjbkUsTUFBTSxPQUFPLDZCQUE2Qjs7OztJQUN4QyxZQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFBRyxDQUFDOzs7OztJQUV4RCxZQUFZLENBQUMsTUFBNkI7UUFDeEMsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7O1lBTkYsVUFBVTs7OztZQXBCRixlQUFlOzs7Ozs7O0lBc0JWLHdEQUF3Qzs7Ozs7QUFXdEQsTUFBTSxPQUFPLG9CQUFxQixTQUFRLFlBQVk7Ozs7Ozs7O0lBWXBELFlBQ1UsSUFBZ0IsRUFDaEIsZUFBZ0MsRUFDckIsT0FBNEIsRUFFdkMsU0FBd0MsRUFDaEQs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ZWN0YWJsZSwgSW5qZWN0LCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAsIGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJ0BpZ28yL2F1dGgnO1xyXG5pbXBvcnQgeyBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgT2JqZWN0VXRpbHMgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQgeyBGRUFUVVJFLCBGZWF0dXJlIH0gZnJvbSAnLi4vLi4vLi4vZmVhdHVyZSc7XHJcbmltcG9ydCB7IEdvb2dsZUxpbmtzIH0gZnJvbSAnLi8uLi8uLi8uLi91dGlscy9nb29nbGVMaW5rcyc7XHJcblxyXG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQgfSBmcm9tICcuLi9zZWFyY2guaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZSwgVGV4dFNlYXJjaCwgUmV2ZXJzZVNlYXJjaCB9IGZyb20gJy4vc291cmNlJztcclxuaW1wb3J0IHtcclxuICBTZWFyY2hTb3VyY2VPcHRpb25zLFxyXG4gIFRleHRTZWFyY2hPcHRpb25zLFxyXG4gIFJldmVyc2VTZWFyY2hPcHRpb25zXHJcbn0gZnJvbSAnLi9zb3VyY2UuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7XHJcbiAgSUNoZXJjaGVEYXRhLFxyXG4gIElDaGVyY2hlUmVzcG9uc2UsXHJcbiAgSUNoZXJjaGVSZXZlcnNlRGF0YSxcclxuICBJQ2hlcmNoZVJldmVyc2VSZXNwb25zZVxyXG59IGZyb20gJy4vaWNoZXJjaGUuaW50ZXJmYWNlcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBJQ2hlcmNoZVNlYXJjaFJlc3VsdEZvcm1hdHRlciB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSkge31cclxuXHJcbiAgZm9ybWF0UmVzdWx0KHJlc3VsdDogU2VhcmNoUmVzdWx0PEZlYXR1cmU+KTogU2VhcmNoUmVzdWx0PEZlYXR1cmU+IHtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogSUNoZXJjaGUgc2VhcmNoIHNvdXJjZVxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSUNoZXJjaGVTZWFyY2hTb3VyY2UgZXh0ZW5kcyBTZWFyY2hTb3VyY2UgaW1wbGVtZW50cyBUZXh0U2VhcmNoIHtcclxuICBzdGF0aWMgaWQgPSAnaWNoZXJjaGUnO1xyXG4gIHN0YXRpYyB0eXBlID0gRkVBVFVSRTtcclxuICBzdGF0aWMgcHJvcGVydGllc0JsYWNrbGlzdDogc3RyaW5nW10gPSBbXTtcclxuICB0aXRsZSQ6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcclxuXHJcbiAgcHJpdmF0ZSBoYXNodGFnc0xpZXV4VG9LZWVwID0gW107XHJcblxyXG4gIGdldCB0aXRsZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMudGl0bGUkLmdldFZhbHVlKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBASW5qZWN0KCdvcHRpb25zJykgb3B0aW9uczogU2VhcmNoU291cmNlT3B0aW9ucyxcclxuICAgIEBJbmplY3QoSUNoZXJjaGVTZWFyY2hSZXN1bHRGb3JtYXR0ZXIpXHJcbiAgICBwcml2YXRlIGZvcm1hdHRlcjogSUNoZXJjaGVTZWFyY2hSZXN1bHRGb3JtYXR0ZXIsXHJcbiAgICBpbmplY3RvcjogSW5qZWN0b3JcclxuICApIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG5cclxuICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZVxyXG4gICAgICAuZ2V0KHRoaXMub3B0aW9ucy50aXRsZSlcclxuICAgICAgLnN1YnNjcmliZSh0aXRsZSA9PiB0aGlzLnRpdGxlJC5uZXh0KHRpdGxlKSk7XHJcblxyXG4gICAgY29uc3QgYXV0aFNlcnZpY2UgPSBpbmplY3Rvci5nZXQoQXV0aFNlcnZpY2UpO1xyXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MubGVuZ3RoKSB7XHJcbiAgICAgIGlmICghYXV0aFNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLmdldEFsbG93ZWRUeXBlcygpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGF1dGhTZXJ2aWNlLmF1dGhlbnRpY2F0ZSQuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuZ2V0QWxsb3dlZFR5cGVzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldElkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gSUNoZXJjaGVTZWFyY2hTb3VyY2UuaWQ7XHJcbiAgfVxyXG5cclxuICBnZXRUeXBlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gSUNoZXJjaGVTZWFyY2hTb3VyY2UudHlwZTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXREZWZhdWx0T3B0aW9ucygpOiBTZWFyY2hTb3VyY2VPcHRpb25zIHtcclxuICAgIGNvbnN0IGxpbWl0ID1cclxuICAgICAgdGhpcy5vcHRpb25zLnBhcmFtcyAmJiB0aGlzLm9wdGlvbnMucGFyYW1zLmxpbWl0XHJcbiAgICAgICAgPyBOdW1iZXIodGhpcy5vcHRpb25zLnBhcmFtcy5saW1pdClcclxuICAgICAgICA6IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IGVjbWF4ID1cclxuICAgICAgdGhpcy5vcHRpb25zLnBhcmFtcyAmJiB0aGlzLm9wdGlvbnMucGFyYW1zLmVjbWF4XHJcbiAgICAgICAgPyBOdW1iZXIodGhpcy5vcHRpb25zLnBhcmFtcy5lY21heClcclxuICAgICAgICA6IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IHR5cGVzID1cclxuICAgICAgdGhpcy5vcHRpb25zLnBhcmFtcyAmJiB0aGlzLm9wdGlvbnMucGFyYW1zLnR5cGVcclxuICAgICAgICA/IHRoaXMub3B0aW9ucy5wYXJhbXMudHlwZVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxzL2csICcnKVxyXG4gICAgICAgICAgICAudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgICAgICAuc3BsaXQoJywnKVxyXG4gICAgICAgIDogW1xyXG4gICAgICAgICAgICAnYWRyZXNzZXMnLFxyXG4gICAgICAgICAgICAnY29kZXMtcG9zdGF1eCcsXHJcbiAgICAgICAgICAgICdyb3V0ZXMnLFxyXG4gICAgICAgICAgICAnbXVuaWNpcGFsaXRlcycsXHJcbiAgICAgICAgICAgICdtcmMnLFxyXG4gICAgICAgICAgICAncmVnYWRtaW4nLFxyXG4gICAgICAgICAgICAnbGlldXgnXHJcbiAgICAgICAgICBdO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5pY2hlcmNoZS5uYW1lJyxcclxuICAgICAgc2VhcmNoVXJsOiAnaHR0cHM6Ly9nZW9lZ2wubXNwLmdvdXYucWMuY2EvYXBpcy9pY2hlcmNoZScsXHJcbiAgICAgIHNldHRpbmdzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdHlwZTogJ2NoZWNrYm94JyxcclxuICAgICAgICAgIHRpdGxlOiAncmVzdWx0cyB0eXBlJyxcclxuICAgICAgICAgIG5hbWU6ICd0eXBlJyxcclxuICAgICAgICAgIHZhbHVlczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5pY2hlcmNoZS50eXBlLmFkZHJlc3MnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAnYWRyZXNzZXMnLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHR5cGVzLmluZGV4T2YoJ2FkcmVzc2VzJykgIT09IC0xLFxyXG4gICAgICAgICAgICAgIGhhc2h0YWdzOiBbJ2FkcmVzc2UnXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5pY2hlcmNoZS50eXBlLm9sZEFkZHJlc3MnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAnYW5jaWVubmVzLWFkcmVzc2VzJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0eXBlcy5pbmRleE9mKCdhbmNpZW5uZXMtYWRyZXNzZXMnKSAhPT0gLTEsXHJcbiAgICAgICAgICAgICAgaGFzaHRhZ3M6IFsnYW5jaWVubmVzLWFkcmVzc2VzJ11cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnaWdvLmdlby5zZWFyY2guaWNoZXJjaGUudHlwZS5wb3N0YWxDb2RlJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ2NvZGVzLXBvc3RhdXgnLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHR5cGVzLmluZGV4T2YoJ2NvZGVzLXBvc3RhdXgnKSAhPT0gLTEsXHJcbiAgICAgICAgICAgICAgaGFzaHRhZ3M6IFsnY29kZS1wb3N0YWwnXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5pY2hlcmNoZS50eXBlLnJvYWQnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAncm91dGVzJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0eXBlcy5pbmRleE9mKCdyb3V0ZXMnKSAhPT0gLTEsXHJcbiAgICAgICAgICAgICAgaGFzaHRhZ3M6IFsncm91dGUnXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5pY2hlcmNoZS50eXBlLmNpdHknLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAnbXVuaWNpcGFsaXRlcycsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogdHlwZXMuaW5kZXhPZignbXVuaWNpcGFsaXRlcycpICE9PSAtMSxcclxuICAgICAgICAgICAgICBoYXNodGFnczogWydtdW5pY2lwYWxpdMOpJywgJ211biddXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLmljaGVyY2hlLnR5cGUub2xkQ2l0eScsXHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdhbmNpZW5uZXMtbXVuaWNpcGFsaXRlcycsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogdHlwZXMuaW5kZXhPZignYW5jaWVubmVzLW11bmljaXBhbGl0ZXMnKSAhPT0gLTEsXHJcbiAgICAgICAgICAgICAgaGFzaHRhZ3M6IFsnYW5jaWVubmVzLW11bmljaXBhbGl0ZXMnXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5pY2hlcmNoZS50eXBlLm1yYycsXHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdtcmMnLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHR5cGVzLmluZGV4T2YoJ21yYycpICE9PSAtMSxcclxuICAgICAgICAgICAgICBoYXNodGFnczogWydtcmMnXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5pY2hlcmNoZS50eXBlLnJlZ2FkbWluJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ3JlZ2FkbWluJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0eXBlcy5pbmRleE9mKCdyZWdhZG1pbicpICE9PSAtMSxcclxuICAgICAgICAgICAgICBoYXNodGFnczogWydyw6lnaW9uLWFkbWluaXN0cmF0aXZlJywgJ3JlZ2FkbWluJ11cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnaWdvLmdlby5zZWFyY2guaWNoZXJjaGUudHlwZS5lbnRyZXByaXNlJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ2VudHJlcHJpc2VzJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0eXBlcy5pbmRleE9mKCdlbnRyZXByaXNlcycpICE9PSAtMSxcclxuICAgICAgICAgICAgICBhdmFpbGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIGhhc2h0YWdzOiBbJ2VudHJlcHJpc2UnXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5pY2hlcmNoZS50eXBlLnBsYWNlJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ2xpZXV4JyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0eXBlcy5pbmRleE9mKCdsaWV1eCcpICE9PSAtMSxcclxuICAgICAgICAgICAgICBoYXNodGFnczogWydsaWV1J11cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnaWdvLmdlby5zZWFyY2guaWNoZXJjaGUudHlwZS5zdW1pJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ2Jvcm5lcy1zdW1pJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0eXBlcy5pbmRleE9mKCdib3JuZXMtc3VtaScpICE9PSAtMSxcclxuICAgICAgICAgICAgICBoYXNodGFnczogWydib3JuZScsICdib3JuZXMnLCAnc3VtaSddXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLmljaGVyY2hlLnR5cGUua20nLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAnYm9ybmVzLWttJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICBoYXNodGFnczogWydib3JuZScsICdib3JuZXMnLCAncmVww6hyZScsICdrbSddXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdyYWRpb2J1dHRvbicsXHJcbiAgICAgICAgICB0aXRsZTogJ3Jlc3VsdHMgbGltaXQnLFxyXG4gICAgICAgICAgbmFtZTogJ2xpbWl0JyxcclxuICAgICAgICAgIHZhbHVlczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICcxJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBsaW1pdCA9PT0gMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICc1JyxcclxuICAgICAgICAgICAgICB2YWx1ZTogNSxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBsaW1pdCA9PT0gNSB8fCAhbGltaXRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnMTAnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAxMCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBsaW1pdCA9PT0gMTBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnMjUnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAyNSxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBsaW1pdCA9PT0gMjVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnNTAnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiA1MCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBsaW1pdCA9PT0gNTBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdHlwZTogJ3JhZGlvYnV0dG9uJyxcclxuICAgICAgICAgIHRpdGxlOiAnZWNtYXgnLFxyXG4gICAgICAgICAgbmFtZTogJ2VjbWF4JyxcclxuICAgICAgICAgIHZhbHVlczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICcxMCAlJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogMTAsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogZWNtYXggPT09IDEwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJzMwICUnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAzMCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBlY21heCA9PT0gMzAgfHwgIWVjbWF4XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJzUwICUnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiA1MCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBlY21heCA9PT0gNTBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnNzUgJScsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IDc1LFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGVjbWF4ID09PSA3NVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICcxMDAgJScsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IDEwMCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBlY21heCA9PT0gMTAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdyYWRpb2J1dHRvbicsXHJcbiAgICAgICAgICB0aXRsZTogJ3Jlc3RyaWN0RXh0ZW50JyxcclxuICAgICAgICAgIG5hbWU6ICdsb2MnLFxyXG4gICAgICAgICAgdmFsdWVzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLmljaGVyY2hlLnJlc3RyaWN0RXh0ZW50Lm1hcCcsXHJcbiAgICAgICAgICAgICAgdmFsdWU6ICd0cnVlJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5pY2hlcmNoZS5yZXN0cmljdEV4dGVudC5xdWViZWMnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAnZmFsc2UnLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBhIGxvY2F0aW9uIGJ5IG5hbWUgb3Iga2V5d29yZFxyXG4gICAqIEBwYXJhbSB0ZXJtIExvY2F0aW9uIG5hbWUgb3Iga2V5d29yZFxyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgPFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdXHJcbiAgICovXHJcbiAgc2VhcmNoKFxyXG4gICAgdGVybTogc3RyaW5nLFxyXG4gICAgb3B0aW9ucz86IFRleHRTZWFyY2hPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxTZWFyY2hSZXN1bHQ8RmVhdHVyZT5bXT4ge1xyXG4gICAgY29uc3QgcGFyYW1zID0gdGhpcy5jb21wdXRlUmVxdWVzdFBhcmFtcyh0ZXJtLCBvcHRpb25zIHx8IHt9KTtcclxuICAgIGlmICghcGFyYW1zLmdldCgndHlwZScpLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gb2YoW10pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vcHRpb25zLnBhcmFtcy5wYWdlID0gcGFyYW1zLmdldCgncGFnZScpIHx8ICcxJztcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHt0aGlzLnNlYXJjaFVybH0vZ2VvY29kZWAsIHsgcGFyYW1zIH0pLnBpcGUoXHJcbiAgICAgIG1hcCgocmVzcG9uc2U6IElDaGVyY2hlUmVzcG9uc2UpID0+IHRoaXMuZXh0cmFjdFJlc3VsdHMocmVzcG9uc2UpKSxcclxuICAgICAgY2F0Y2hFcnJvcihlcnIgPT4ge1xyXG4gICAgICAgIGVyci5lcnJvci50b0Rpc3BsYXkgPSB0cnVlO1xyXG4gICAgICAgIGVyci5lcnJvci50aXRsZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgdGhpcy5nZXREZWZhdWx0T3B0aW9ucygpLnRpdGxlXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aHJvdyBlcnI7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRBbGxvd2VkVHlwZXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5nZXQoYCR7dGhpcy5zZWFyY2hVcmx9L3R5cGVzYClcclxuICAgICAgLnN1YnNjcmliZSgodHlwZXM6IHN0cmluZ1tdKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdHlwZVNldHRpbmcgPSB0aGlzLnNldHRpbmdzLmZpbmQocyA9PiBzLm5hbWUgPT09ICd0eXBlJyk7XHJcbiAgICAgICAgdHlwZVNldHRpbmcudmFsdWVzLmZvckVhY2godiA9PiB7XHJcbiAgICAgICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoYF4ke3YudmFsdWV9KFxcXFwufCQpYCk7XHJcbiAgICAgICAgICBjb25zdCB0eXBlc01hdGNoZWQgPSB0eXBlcy5maWx0ZXIodmFsdWUgPT4gcmVnZXgudGVzdCh2YWx1ZSkpO1xyXG4gICAgICAgICAgdi5hdmFpbGFibGUgPSB0eXBlc01hdGNoZWQubGVuZ3RoID4gMDtcclxuICAgICAgICAgIGlmICh2LnZhbHVlID09PSAnbGlldXgnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFzaHRhZ3NMaWV1eFRvS2VlcCA9IFtcclxuICAgICAgICAgICAgICAuLi4obmV3IFNldChcclxuICAgICAgICAgICAgICAgIHR5cGVzTWF0Y2hlZFxyXG4gICAgICAgICAgICAgICAgICAubWFwKHQgPT4gdC5zcGxpdCgnLicpKVxyXG4gICAgICAgICAgICAgICAgICAucmVkdWNlKChhLCBiKSA9PiBhLmNvbmNhdChiKSlcclxuICAgICAgICAgICAgICAgICAgLmZpbHRlcih0ID0+IHQgIT09ICdsaWV1eCcpXHJcbiAgICAgICAgICAgICAgKSBhcyBhbnkpXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlUmVxdWVzdFBhcmFtcyhcclxuICAgIHRlcm06IHN0cmluZyxcclxuICAgIG9wdGlvbnM6IFRleHRTZWFyY2hPcHRpb25zXHJcbiAgKTogSHR0cFBhcmFtcyB7XHJcbiAgICBjb25zdCBxdWVyeVBhcmFtczogYW55ID0gT2JqZWN0LmFzc2lnbihcclxuICAgICAge1xyXG4gICAgICAgIGdlb21ldHJ5OiB0cnVlLFxyXG4gICAgICAgIGJib3g6IHRydWUsXHJcbiAgICAgICAgaWNvbjogdHJ1ZSxcclxuICAgICAgICB0eXBlOlxyXG4gICAgICAgICAgJ2FkcmVzc2VzLGNvZGVzLXBvc3RhdXgsbXVuaWNpcGFsaXRlcyxtcmMscmVnYWRtaW4sbGlldXgsZW50cmVwcmlzZXMsYm9ybmVzLXN1bWknXHJcbiAgICAgIH0sXHJcbiAgICAgIHRoaXMucGFyYW1zLFxyXG4gICAgICB0aGlzLmNvbXB1dGVPcHRpb25zUGFyYW0odGVybSwgb3B0aW9ucyB8fCB7fSkucGFyYW1zLFxyXG4gICAgICB7XHJcbiAgICAgICAgcTogdGhpcy5jb21wdXRlVGVybSh0ZXJtKSxcclxuICAgICAgICBwYWdlOiBvcHRpb25zLnBhZ2VcclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAocXVlcnlQYXJhbXMubG9jID09PSAndHJ1ZScpIHtcclxuICAgICAgY29uc3QgW3hNaW4sIHlNaW4sIHhNYXgsIHlNYXhdID0gb3B0aW9ucy5leHRlbnQ7XHJcbiAgICAgIHF1ZXJ5UGFyYW1zLmxvYyA9IGAke3hNaW59LCR7eU1pbn07JHt4TWF4fSwke3lNaW59OyR7eE1heH0sJHt5TWF4fTske3hNaW59LCR7eU1heH07JHt4TWlufSwke3lNaW59YDtcclxuICAgIH0gZWxzZSBpZiAocXVlcnlQYXJhbXMubG9jID09PSAnZmFsc2UnKSB7XHJcbiAgICAgIGRlbGV0ZSBxdWVyeVBhcmFtcy5sb2M7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHF1ZXJ5UGFyYW1zLnEuaW5kZXhPZignIycpICE9PSAtMSkge1xyXG4gICAgICBxdWVyeVBhcmFtcy50eXBlID0gJ2xpZXV4JztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IEh0dHBQYXJhbXMoeyBmcm9tT2JqZWN0OiBPYmplY3RVdGlscy5yZW1vdmVVbmRlZmluZWQocXVlcnlQYXJhbXMpIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0UmVzdWx0cyhyZXNwb25zZTogSUNoZXJjaGVSZXNwb25zZSk6IFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdIHtcclxuICAgIHJldHVybiByZXNwb25zZS5mZWF0dXJlcy5tYXAoKGRhdGE6IElDaGVyY2hlRGF0YSkgPT4ge1xyXG4gICAgICByZXR1cm4gdGhpcy5mb3JtYXR0ZXIuZm9ybWF0UmVzdWx0KHRoaXMuZGF0YVRvUmVzdWx0KGRhdGEsIHJlc3BvbnNlKSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGF0YVRvUmVzdWx0KGRhdGE6IElDaGVyY2hlRGF0YSwgcmVzcG9uc2U/OiBJQ2hlcmNoZVJlc3BvbnNlKTogU2VhcmNoUmVzdWx0PEZlYXR1cmU+IHtcclxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSB0aGlzLmNvbXB1dGVQcm9wZXJ0aWVzKGRhdGEpO1xyXG4gICAgY29uc3QgaWQgPSBbdGhpcy5nZXRJZCgpLCBwcm9wZXJ0aWVzLnR5cGUsIHByb3BlcnRpZXMuY29kZV0uam9pbignLicpO1xyXG5cclxuICAgIGNvbnN0IHRpdGxlSHRtbCA9IGRhdGEuaGlnaGxpZ2h0LnRpdGxlIHx8IGRhdGEucHJvcGVydGllcy5ub207XHJcbiAgICBjb25zdCBzdWJ0aXRsZUh0bWwgPSBkYXRhLmhpZ2hsaWdodC50aXRsZTJcclxuICAgICAgPyAnIDxzbWFsbD4gJyArIGRhdGEuaGlnaGxpZ2h0LnRpdGxlMiArICc8L3NtYWxsPidcclxuICAgICAgOiAnJztcclxuICAgIGNvbnN0IHN1YnRpdGxlSHRtbDIgPSBkYXRhLmhpZ2hsaWdodC50aXRsZTNcclxuICAgICAgPyAnPGJyPjxzbWFsbD4gJyArIGRhdGEuaGlnaGxpZ2h0LnRpdGxlMyArICc8L3NtYWxsPidcclxuICAgICAgOiAnJztcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzb3VyY2U6IHRoaXMsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICB0eXBlOiBGRUFUVVJFLFxyXG4gICAgICAgIHByb2plY3Rpb246ICdFUFNHOjQzMjYnLFxyXG4gICAgICAgIGdlb21ldHJ5OiBkYXRhLmdlb21ldHJ5LFxyXG4gICAgICAgIGV4dGVudDogZGF0YS5iYm94LFxyXG4gICAgICAgIHByb3BlcnRpZXMsXHJcbiAgICAgICAgbWV0YToge1xyXG4gICAgICAgICAgaWQsXHJcbiAgICAgICAgICB0aXRsZTogZGF0YS5wcm9wZXJ0aWVzLm5vbVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgbWV0YToge1xyXG4gICAgICAgIGRhdGFUeXBlOiBGRUFUVVJFLFxyXG4gICAgICAgIGlkLFxyXG4gICAgICAgIHRpdGxlOiBkYXRhLnByb3BlcnRpZXMubm9tLFxyXG4gICAgICAgIHRpdGxlSHRtbDogdGl0bGVIdG1sICsgc3VidGl0bGVIdG1sICsgc3VidGl0bGVIdG1sMixcclxuICAgICAgICBpY29uOiBkYXRhLmljb24gfHwgJ21hcC1tYXJrZXInLFxyXG4gICAgICAgIG5leHRQYWdlOiByZXNwb25zZS5mZWF0dXJlcy5sZW5ndGggJSArdGhpcy5vcHRpb25zLnBhcmFtcy5saW1pdCA9PT0gMCAmJiArdGhpcy5vcHRpb25zLnBhcmFtcy5wYWdlIDwgMTBcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZVByb3BlcnRpZXMoZGF0YTogSUNoZXJjaGVEYXRhKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XHJcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gT2JqZWN0VXRpbHMucmVtb3ZlS2V5cyhcclxuICAgICAgZGF0YS5wcm9wZXJ0aWVzLFxyXG4gICAgICBJQ2hlcmNoZVNlYXJjaFNvdXJjZS5wcm9wZXJ0aWVzQmxhY2tsaXN0XHJcbiAgICApO1xyXG5cclxuICAgIGlmIChkYXRhLmdlb21ldHJ5ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oeyB0eXBlOiBkYXRhLmluZGV4IH0sIHByb3BlcnRpZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdvb2dsZUxpbmtzUHJvcGVydGllczoge1xyXG4gICAgICBHb29nbGVNYXBzOiBzdHJpbmc7XHJcbiAgICAgIEdvb2dsZVN0cmVldFZpZXc/OiBzdHJpbmc7XHJcbiAgICB9ID0ge1xyXG4gICAgICBHb29nbGVNYXBzOiBHb29nbGVMaW5rcy5nZXRHb29nbGVNYXBzTGluayhcclxuICAgICAgICBkYXRhLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzBdLFxyXG4gICAgICAgIGRhdGEuZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMV1cclxuICAgICAgKVxyXG4gICAgfTtcclxuICAgIGlmIChkYXRhLmdlb21ldHJ5LnR5cGUgPT09ICdQb2ludCcpIHtcclxuICAgICAgZ29vZ2xlTGlua3NQcm9wZXJ0aWVzLkdvb2dsZVN0cmVldFZpZXcgPSBHb29nbGVMaW5rcy5nZXRHb29nbGVTdHJlZXRWaWV3TGluayhcclxuICAgICAgICBkYXRhLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzBdLFxyXG4gICAgICAgIGRhdGEuZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMV1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihcclxuICAgICAgeyB0eXBlOiBkYXRhLmluZGV4IH0sXHJcbiAgICAgIHByb3BlcnRpZXMsXHJcbiAgICAgIGdvb2dsZUxpbmtzUHJvcGVydGllc1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBoYXNodGFnIGZyb20gcXVlcnlcclxuICAgKiBAcGFyYW0gdGVybSBRdWVyeSB3aXRoIGhhc2h0YWdcclxuICAgKi9cclxuICBwcml2YXRlIGNvbXB1dGVUZXJtKHRlcm06IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAvLyBLZWVwIGhhc2h0YWdzIGZvciBcImxpZXV4XCJcclxuICAgIGNvbnN0IGhhc2h0YWdzID0gdGVybS5tYXRjaCgvKCNbXlxcc10rKS9nKSB8fCBbXTtcclxuICAgIGxldCBrZWVwID0gZmFsc2U7XHJcbiAgICBrZWVwID0gaGFzaHRhZ3Muc29tZShoYXNodGFnID0+IHtcclxuICAgICAgY29uc3QgaGFzaHRhZ0tleSA9IGhhc2h0YWcuc3Vic3RyaW5nKDEpO1xyXG4gICAgICByZXR1cm4gdGhpcy5oYXNodGFnc0xpZXV4VG9LZWVwLnNvbWUoXHJcbiAgICAgICAgaCA9PlxyXG4gICAgICAgICAgaFxyXG4gICAgICAgICAgICAudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgICAgICAubm9ybWFsaXplKCdORkQnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgJycpID09PVxyXG4gICAgICAgICAgaGFzaHRhZ0tleVxyXG4gICAgICAgICAgICAudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgICAgICAubm9ybWFsaXplKCdORkQnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgJycpXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIWtlZXApIHtcclxuICAgICAgdGVybSA9IHRlcm0ucmVwbGFjZSgvKCNbXlxcc10qKS9nLCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRlcm0ucmVwbGFjZSgvW15cXHfDgC3DvyAhXFwtXFwoXFwpLCcjXSsvZywgJycpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGhhc2h0YWcgdG8gcGFyYW0gaWYgdmFsaWRcclxuICAgKiBAcGFyYW0gdGVybSBRdWVyeSB3aXRoIGhhc2h0YWdcclxuICAgKiBAcGFyYW0gb3B0aW9ucyBUZXh0U2VhcmNoT3B0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgY29tcHV0ZU9wdGlvbnNQYXJhbShcclxuICAgIHRlcm06IHN0cmluZyxcclxuICAgIG9wdGlvbnM6IFRleHRTZWFyY2hPcHRpb25zXHJcbiAgKTogVGV4dFNlYXJjaE9wdGlvbnMge1xyXG4gICAgY29uc3QgaGFzaHRhZ3MgPSBzdXBlci5nZXRIYXNodGFnc1ZhbGlkKHRlcm0sICd0eXBlJyk7XHJcbiAgICBpZiAoaGFzaHRhZ3MpIHtcclxuICAgICAgb3B0aW9ucy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKG9wdGlvbnMucGFyYW1zIHx8IHt9LCB7XHJcbiAgICAgICAgdHlwZTogaGFzaHRhZ3Muam9pbignLCcpXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvcHRpb25zO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIElDaGVyY2hlUmV2ZXJzZSBzZWFyY2ggc291cmNlXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBJQ2hlcmNoZVJldmVyc2VTZWFyY2hTb3VyY2UgZXh0ZW5kcyBTZWFyY2hTb3VyY2VcclxuICBpbXBsZW1lbnRzIFJldmVyc2VTZWFyY2gge1xyXG4gIHN0YXRpYyBpZCA9ICdpY2hlcmNoZXJldmVyc2UnO1xyXG4gIHN0YXRpYyB0eXBlID0gRkVBVFVSRTtcclxuICBzdGF0aWMgcHJvcGVydGllc0JsYWNrbGlzdDogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgdGl0bGUkOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XHJcblxyXG4gIGdldCB0aXRsZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMudGl0bGUkLmdldFZhbHVlKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBASW5qZWN0KCdvcHRpb25zJykgb3B0aW9uczogU2VhcmNoU291cmNlT3B0aW9ucyxcclxuICAgIGluamVjdG9yOiBJbmplY3RvclxyXG4gICkge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcblxyXG4gICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlXHJcbiAgICAgIC5nZXQodGhpcy5vcHRpb25zLnRpdGxlKVxyXG4gICAgICAuc3Vic2NyaWJlKHRpdGxlID0+IHRoaXMudGl0bGUkLm5leHQodGl0bGUpKTtcclxuXHJcbiAgICBjb25zdCBhdXRoU2VydmljZSA9IGluamVjdG9yLmdldChBdXRoU2VydmljZSk7XHJcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5sZW5ndGgpIHtcclxuICAgICAgaWYgKCFhdXRoU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMuZ2V0QWxsb3dlZFR5cGVzKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYXV0aFNlcnZpY2UuYXV0aGVudGljYXRlJC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5nZXRBbGxvd2VkVHlwZXMoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0SWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBJQ2hlcmNoZVJldmVyc2VTZWFyY2hTb3VyY2UuaWQ7XHJcbiAgfVxyXG5cclxuICBnZXRUeXBlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gSUNoZXJjaGVSZXZlcnNlU2VhcmNoU291cmNlLnR5cGU7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0RGVmYXVsdE9wdGlvbnMoKTogU2VhcmNoU291cmNlT3B0aW9ucyB7XHJcbiAgICBjb25zdCB0eXBlcyA9XHJcbiAgICAgIHRoaXMub3B0aW9ucy5wYXJhbXMgJiYgdGhpcy5vcHRpb25zLnBhcmFtcy50eXBlXHJcbiAgICAgICAgPyB0aGlzLm9wdGlvbnMucGFyYW1zLnR5cGVcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xccy9nLCAnJylcclxuICAgICAgICAgICAgLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAgICAgLnNwbGl0KCcsJylcclxuICAgICAgICA6IFsnYWRyZXNzZXMnLCAnbXVuaWNpcGFsaXRlcycsICdtcmMnLCAncmVnYWRtaW4nXTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLmljaGVyY2hlUmV2ZXJzZS5uYW1lJyxcclxuICAgICAgc2VhcmNoVXJsOiAnaHR0cHM6Ly9nZW9lZ2wubXNwLmdvdXYucWMuY2EvYXBpcy90ZXJyYXBpJyxcclxuICAgICAgc2V0dGluZ3M6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAnY2hlY2tib3gnLFxyXG4gICAgICAgICAgdGl0bGU6ICdyZXN1bHRzIHR5cGUnLFxyXG4gICAgICAgICAgbmFtZTogJ3R5cGUnLFxyXG4gICAgICAgICAgdmFsdWVzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLmljaGVyY2hlLnR5cGUuYWRkcmVzcycsXHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdhZHJlc3NlcycsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogdHlwZXMuaW5kZXhPZignYWRyZXNzZXMnKSAhPT0gLTFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnaWdvLmdlby5zZWFyY2guaWNoZXJjaGUudHlwZS5yb2FkJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ3JvdXRlcycsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogdHlwZXMuaW5kZXhPZigncm91dGVzJykgIT09IC0xLFxyXG4gICAgICAgICAgICAgIGF2YWlsYWJsZTogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnaWdvLmdlby5zZWFyY2guaWNoZXJjaGUudHlwZS5kaXN0cmljdCcsXHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdhcnJvbmRpc3NlbWVudHMnLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHR5cGVzLmluZGV4T2YoJ2Fycm9uZGlzc2VtZW50cycpICE9PSAtMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5pY2hlcmNoZS50eXBlLmNpdHknLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAnbXVuaWNpcGFsaXRlcycsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogdHlwZXMuaW5kZXhPZignbXVuaWNpcGFsaXRlcycpICE9PSAtMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5pY2hlcmNoZS50eXBlLm1yYycsXHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdtcmMnLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHR5cGVzLmluZGV4T2YoJ21yYycpICE9PSAtMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5pY2hlcmNoZS50eXBlLnJlZ2FkbWluJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ3JlZ2FkbWluJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0eXBlcy5pbmRleE9mKCdyZWdhZG1pbicpICE9PSAtMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAncmFkaW9idXR0b24nLFxyXG4gICAgICAgICAgdGl0bGU6ICdyYWRpdXMnLFxyXG4gICAgICAgICAgbmFtZTogJ2J1ZmZlcicsXHJcbiAgICAgICAgICB2YWx1ZXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnMTAwIG0nLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAxMDAsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogIXRoaXMub3B0aW9ucy5kaXN0YW5jZSB8fCB0aGlzLm9wdGlvbnMuZGlzdGFuY2UgPT09IDEwMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICc1MDAgbScsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IDUwMCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0aGlzLm9wdGlvbnMuZGlzdGFuY2UgPT09IDUwMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICcxIGttJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogMTAwMCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0aGlzLm9wdGlvbnMuZGlzdGFuY2UgPT09IDEwMDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnMiBrbScsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IDIwMDAsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogdGhpcy5vcHRpb25zLmRpc3RhbmNlID09PSAyMDAwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJzUga20nLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiA1MDAwLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHRoaXMub3B0aW9ucy5kaXN0YW5jZSA9PT0gNTAwMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIGEgbG9jYXRpb24gYnkgY29vcmRpbmF0ZXNcclxuICAgKiBAcGFyYW0gbG9uTGF0IExvY2F0aW9uIGNvb3JkaW5hdGVzXHJcbiAgICogQHBhcmFtIGRpc3RhbmNlIFNlYXJjaCByYWlkdXMgYXJvdW5kIGxvbkxhdFxyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgPFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdXHJcbiAgICovXHJcbiAgcmV2ZXJzZVNlYXJjaChcclxuICAgIGxvbkxhdDogW251bWJlciwgbnVtYmVyXSxcclxuICAgIG9wdGlvbnM/OiBSZXZlcnNlU2VhcmNoT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8U2VhcmNoUmVzdWx0PEZlYXR1cmU+W10+IHtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuY29tcHV0ZVJlcXVlc3RQYXJhbXMobG9uTGF0LCBvcHRpb25zIHx8IHt9KTtcclxuICAgIGlmICghcGFyYW1zLmdldCgndHlwZScpLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gb2YoW10pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy5zZWFyY2hVcmx9L2xvY2F0ZWAsIHsgcGFyYW1zIH0pLnBpcGUoXHJcbiAgICAgIG1hcCgocmVzcG9uc2U6IElDaGVyY2hlUmV2ZXJzZVJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXh0cmFjdFJlc3VsdHMocmVzcG9uc2UpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0QWxsb3dlZFR5cGVzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuZ2V0KGAke3RoaXMuc2VhcmNoVXJsfS90eXBlc2ApXHJcbiAgICAgIC5zdWJzY3JpYmUoKHR5cGVzOiBzdHJpbmdbXSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHR5cGVTZXR0aW5nID0gdGhpcy5zZXR0aW5ncy5maW5kKHMgPT4gcy5uYW1lID09PSAndHlwZScpO1xyXG4gICAgICAgIHR5cGVTZXR0aW5nLnZhbHVlcy5mb3JFYWNoKHYgPT4ge1xyXG4gICAgICAgICAgdi5hdmFpbGFibGUgPSB0eXBlcy5pbmRleE9mKHYudmFsdWUgYXMgc3RyaW5nKSA+IC0xO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZVJlcXVlc3RQYXJhbXMoXHJcbiAgICBsb25MYXQ6IFtudW1iZXIsIG51bWJlcl0sXHJcbiAgICBvcHRpb25zPzogUmV2ZXJzZVNlYXJjaE9wdGlvbnNcclxuICApOiBIdHRwUGFyYW1zIHtcclxuICAgIGlmIChvcHRpb25zLmRpc3RhbmNlIHx8IHRoaXMub3B0aW9ucy5kaXN0YW5jZSkge1xyXG4gICAgICBvcHRpb25zLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24ob3B0aW9ucy5wYXJhbXMgfHwge30sIHtcclxuICAgICAgICBidWZmZXI6IG9wdGlvbnMuZGlzdGFuY2UgfHwgdGhpcy5vcHRpb25zLmRpc3RhbmNlXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgSHR0cFBhcmFtcyh7XHJcbiAgICAgIGZyb21PYmplY3Q6IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbG9jOiBsb25MYXQuam9pbignLCcpLFxyXG4gICAgICAgICAgc29ydDogJ2Rpc3RhbmNlJyxcclxuICAgICAgICAgIGdlb21ldHJ5OiB0cnVlLFxyXG4gICAgICAgICAgaWNvbjogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3B0aW9ucy5wYXJhbXMgfHwge30sXHJcbiAgICAgICAgdGhpcy5wYXJhbXNcclxuICAgICAgKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RSZXN1bHRzKFxyXG4gICAgcmVzcG9uc2U6IElDaGVyY2hlUmV2ZXJzZVJlc3BvbnNlXHJcbiAgKTogU2VhcmNoUmVzdWx0PEZlYXR1cmU+W10ge1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlLmZlYXR1cmVzLm1hcCgoZGF0YTogSUNoZXJjaGVSZXZlcnNlRGF0YSkgPT4ge1xyXG4gICAgICByZXR1cm4gdGhpcy5kYXRhVG9SZXN1bHQoZGF0YSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0U3VidGl0bGUoZGF0YTogSUNoZXJjaGVSZXZlcnNlRGF0YSkge1xyXG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICBsZXQgc3VidGl0bGUgPSAnJztcclxuICAgIHN3aXRjaCAoZGF0YS5wcm9wZXJ0aWVzLnR5cGUpIHtcclxuICAgICAgY2FzZSAnYXJyb25kaXNzZW1lbnRzJzpcclxuICAgICAgICBzdWJ0aXRsZSA9IGRhdGEucHJvcGVydGllcy5tdW5pY2lwYWxpdGUgKyAnIChBcnJvbmRpc3NlbWVudCknO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbnN0IHR5cGVTZXR0aW5nID0gdGhpcy5zZXR0aW5ncy5maW5kKHMgPT4gcy5uYW1lID09PSAndHlwZScpO1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSB0eXBlU2V0dGluZy52YWx1ZXMuZmluZChcclxuICAgICAgICAgIHQgPT4gdC52YWx1ZSA9PT0gZGF0YS5wcm9wZXJ0aWVzLnR5cGVcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmICh0eXBlKSB7XHJcbiAgICAgICAgICBzdWJ0aXRsZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KHR5cGUudGl0bGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBzdWJ0aXRsZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGF0YVRvUmVzdWx0KGRhdGE6IElDaGVyY2hlUmV2ZXJzZURhdGEpOiBTZWFyY2hSZXN1bHQ8RmVhdHVyZT4ge1xyXG4gICAgY29uc3QgcHJvcGVydGllcyA9IHRoaXMuY29tcHV0ZVByb3BlcnRpZXMoZGF0YSk7XHJcbiAgICBjb25zdCBleHRlbnQgPSB0aGlzLmNvbXB1dGVFeHRlbnQoZGF0YSk7XHJcbiAgICBjb25zdCBpZCA9IFt0aGlzLmdldElkKCksIHByb3BlcnRpZXMudHlwZSwgcHJvcGVydGllcy5jb2RlXS5qb2luKCcuJyk7XHJcblxyXG4gICAgY29uc3QgdGl0bGVIdG1sID0gZGF0YS5wcm9wZXJ0aWVzLm5vbTtcclxuICAgIGNvbnN0IHN1YnRpdGxlSHRtbCA9ICcgPHNtYWxsPiAnICsgdGhpcy5nZXRTdWJ0aXRsZShkYXRhKSArICc8L3NtYWxsPic7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc291cmNlOiB0aGlzLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgdHlwZTogRkVBVFVSRSxcclxuICAgICAgICBwcm9qZWN0aW9uOiAnRVBTRzo0MzI2JyxcclxuICAgICAgICBnZW9tZXRyeTogZGF0YS5nZW9tZXRyeSxcclxuICAgICAgICBleHRlbnQsXHJcbiAgICAgICAgcHJvcGVydGllcyxcclxuICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICBpZCxcclxuICAgICAgICAgIHRpdGxlOiBkYXRhLnByb3BlcnRpZXMubm9tXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBtZXRhOiB7XHJcbiAgICAgICAgZGF0YVR5cGU6IEZFQVRVUkUsXHJcbiAgICAgICAgaWQsXHJcbiAgICAgICAgdGl0bGU6IGRhdGEucHJvcGVydGllcy5ub20sXHJcbiAgICAgICAgdGl0bGVIdG1sOiB0aXRsZUh0bWwgKyBzdWJ0aXRsZUh0bWwsXHJcbiAgICAgICAgaWNvbjogZGF0YS5pY29uIHx8ICdtYXAtbWFya2VyJ1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlUHJvcGVydGllcyhkYXRhOiBJQ2hlcmNoZVJldmVyc2VEYXRhKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XHJcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gT2JqZWN0VXRpbHMucmVtb3ZlS2V5cyhcclxuICAgICAgZGF0YS5wcm9wZXJ0aWVzLFxyXG4gICAgICBJQ2hlcmNoZVJldmVyc2VTZWFyY2hTb3VyY2UucHJvcGVydGllc0JsYWNrbGlzdFxyXG4gICAgKTtcclxuICAgIHJldHVybiBwcm9wZXJ0aWVzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlRXh0ZW50KFxyXG4gICAgZGF0YTogSUNoZXJjaGVSZXZlcnNlRGF0YVxyXG4gICk6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdIHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiBkYXRhLmJib3hcclxuICAgICAgPyBbZGF0YS5iYm94WzBdLCBkYXRhLmJib3hbMl0sIGRhdGEuYmJveFsxXSwgZGF0YS5iYm94WzNdXVxyXG4gICAgICA6IHVuZGVmaW5lZDtcclxuICB9XHJcbn1cclxuIl19