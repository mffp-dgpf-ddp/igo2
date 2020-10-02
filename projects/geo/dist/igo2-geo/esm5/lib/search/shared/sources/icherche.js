/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var IChercheSearchResultFormatter = /** @class */ (function () {
    function IChercheSearchResultFormatter(languageService) {
        this.languageService = languageService;
    }
    /**
     * @param {?} result
     * @return {?}
     */
    IChercheSearchResultFormatter.prototype.formatResult = /**
     * @param {?} result
     * @return {?}
     */
    function (result) {
        return result;
    };
    IChercheSearchResultFormatter.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    IChercheSearchResultFormatter.ctorParameters = function () { return [
        { type: LanguageService }
    ]; };
    return IChercheSearchResultFormatter;
}());
export { IChercheSearchResultFormatter };
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
var IChercheSearchSource = /** @class */ (function (_super) {
    tslib_1.__extends(IChercheSearchSource, _super);
    function IChercheSearchSource(http, languageService, options, formatter, injector) {
        var _this = _super.call(this, options) || this;
        _this.http = http;
        _this.languageService = languageService;
        _this.formatter = formatter;
        _this.title$ = new BehaviorSubject('');
        _this.hashtagsLieuxToKeep = [];
        _this.languageService.translate
            .get(_this.options.title)
            .subscribe((/**
         * @param {?} title
         * @return {?}
         */
        function (title) { return _this.title$.next(title); }));
        /** @type {?} */
        var authService = injector.get(AuthService);
        if (_this.settings.length) {
            if (!authService) {
                _this.getAllowedTypes();
            }
            else {
                authService.authenticate$.subscribe((/**
                 * @return {?}
                 */
                function () {
                    _this.getAllowedTypes();
                }));
            }
        }
        return _this;
    }
    Object.defineProperty(IChercheSearchSource.prototype, "title", {
        get: /**
         * @return {?}
         */
        function () {
            return this.title$.getValue();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    IChercheSearchSource.prototype.getId = /**
     * @return {?}
     */
    function () {
        return IChercheSearchSource.id;
    };
    /**
     * @return {?}
     */
    IChercheSearchSource.prototype.getType = /**
     * @return {?}
     */
    function () {
        return IChercheSearchSource.type;
    };
    /**
     * @protected
     * @return {?}
     */
    IChercheSearchSource.prototype.getDefaultOptions = /**
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var limit = this.options.params && this.options.params.limit
            ? Number(this.options.params.limit)
            : undefined;
        /** @type {?} */
        var ecmax = this.options.params && this.options.params.ecmax
            ? Number(this.options.params.ecmax)
            : undefined;
        /** @type {?} */
        var types = this.options.params && this.options.params.type
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
    };
    /**
     * Search a location by name or keyword
     * @param term Location name or keyword
     * @returns Observable of <SearchResult<Feature>[]
     */
    /**
     * Search a location by name or keyword
     * @param {?} term Location name or keyword
     * @param {?=} options
     * @return {?} Observable of <SearchResult<Feature>[]
     */
    IChercheSearchSource.prototype.search = /**
     * Search a location by name or keyword
     * @param {?} term Location name or keyword
     * @param {?=} options
     * @return {?} Observable of <SearchResult<Feature>[]
     */
    function (term, options) {
        var _this = this;
        /** @type {?} */
        var params = this.computeRequestParams(term, options || {});
        if (!params.get('type').length) {
            return of([]);
        }
        this.options.params.page = params.get('page') || '1';
        return this.http.get(this.searchUrl + "/geocode", { params: params }).pipe(map((/**
         * @param {?} response
         * @return {?}
         */
        function (response) { return _this.extractResults(response); })), catchError((/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            err.error.toDisplay = true;
            err.error.title = _this.languageService.translate.instant(_this.getDefaultOptions().title);
            throw err;
        })));
    };
    /**
     * @private
     * @return {?}
     */
    IChercheSearchSource.prototype.getAllowedTypes = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return this.http
            .get(this.searchUrl + "/types")
            .subscribe((/**
         * @param {?} types
         * @return {?}
         */
        function (types) {
            /** @type {?} */
            var typeSetting = _this.settings.find((/**
             * @param {?} s
             * @return {?}
             */
            function (s) { return s.name === 'type'; }));
            typeSetting.values.forEach((/**
             * @param {?} v
             * @return {?}
             */
            function (v) {
                /** @type {?} */
                var regex = new RegExp("^" + v.value + "(\\.|$)");
                /** @type {?} */
                var typesMatched = types.filter((/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) { return regex.test(value); }));
                v.available = typesMatched.length > 0;
                if (v.value === 'lieux') {
                    _this.hashtagsLieuxToKeep = tslib_1.__spread(((/** @type {?} */ (new Set(typesMatched
                        .map((/**
                     * @param {?} t
                     * @return {?}
                     */
                    function (t) { return t.split('.'); }))
                        .reduce((/**
                     * @param {?} a
                     * @param {?} b
                     * @return {?}
                     */
                    function (a, b) { return a.concat(b); }))
                        .filter((/**
                     * @param {?} t
                     * @return {?}
                     */
                    function (t) { return t !== 'lieux'; })))))));
                }
            }));
        }));
    };
    /**
     * @private
     * @param {?} term
     * @param {?} options
     * @return {?}
     */
    IChercheSearchSource.prototype.computeRequestParams = /**
     * @private
     * @param {?} term
     * @param {?} options
     * @return {?}
     */
    function (term, options) {
        /** @type {?} */
        var queryParams = Object.assign({
            geometry: true,
            bbox: true,
            icon: true,
            type: 'adresses,codes-postaux,municipalites,mrc,regadmin,lieux,entreprises,bornes-sumi'
        }, this.params, this.computeOptionsParam(term, options || {}).params, {
            q: this.computeTerm(term),
            page: options.page
        });
        if (queryParams.loc === 'true') {
            var _a = tslib_1.__read(options.extent, 4), xMin = _a[0], yMin = _a[1], xMax = _a[2], yMax = _a[3];
            queryParams.loc = xMin + "," + yMin + ";" + xMax + "," + yMin + ";" + xMax + "," + yMax + ";" + xMin + "," + yMax + ";" + xMin + "," + yMin;
        }
        else if (queryParams.loc === 'false') {
            delete queryParams.loc;
        }
        if (queryParams.q.indexOf('#') !== -1) {
            queryParams.type = 'lieux';
        }
        return new HttpParams({ fromObject: ObjectUtils.removeUndefined(queryParams) });
    };
    /**
     * @private
     * @param {?} response
     * @return {?}
     */
    IChercheSearchSource.prototype.extractResults = /**
     * @private
     * @param {?} response
     * @return {?}
     */
    function (response) {
        var _this = this;
        return response.features.map((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            return _this.formatter.formatResult(_this.dataToResult(data, response));
        }));
    };
    /**
     * @private
     * @param {?} data
     * @param {?=} response
     * @return {?}
     */
    IChercheSearchSource.prototype.dataToResult = /**
     * @private
     * @param {?} data
     * @param {?=} response
     * @return {?}
     */
    function (data, response) {
        /** @type {?} */
        var properties = this.computeProperties(data);
        /** @type {?} */
        var id = [this.getId(), properties.type, properties.code].join('.');
        /** @type {?} */
        var titleHtml = data.highlight.title || data.properties.nom;
        /** @type {?} */
        var subtitleHtml = data.highlight.title2
            ? ' <small> ' + data.highlight.title2 + '</small>'
            : '';
        /** @type {?} */
        var subtitleHtml2 = data.highlight.title3
            ? '<br><small> ' + data.highlight.title3 + '</small>'
            : '';
        return {
            source: this,
            data: {
                type: FEATURE,
                projection: 'EPSG:4326',
                geometry: data.geometry,
                extent: data.bbox,
                properties: properties,
                meta: {
                    id: id,
                    title: data.properties.nom
                }
            },
            meta: {
                dataType: FEATURE,
                id: id,
                title: data.properties.nom,
                titleHtml: titleHtml + subtitleHtml + subtitleHtml2,
                icon: data.icon || 'map-marker',
                nextPage: response.features.length % +this.options.params.limit === 0 && +this.options.params.page < 10
            }
        };
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    IChercheSearchSource.prototype.computeProperties = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var properties = ObjectUtils.removeKeys(data.properties, IChercheSearchSource.propertiesBlacklist);
        if (data.geometry === undefined) {
            return Object.assign({ type: data.index }, properties);
        }
        /** @type {?} */
        var googleLinksProperties = {
            GoogleMaps: ''
        };
        /** @type {?} */
        var googleMaps;
        if (data.geometry.type === 'Point') {
            googleMaps = GoogleLinks.getGoogleMapsCoordLink(data.geometry.coordinates[0], data.geometry.coordinates[1]);
        }
        else {
            /** @type {?} */
            var point = pointOnFeature(data.geometry);
            googleMaps = GoogleLinks.getGoogleMapsCoordLink(point.geometry.coordinates[0], point.geometry.coordinates[1]);
        }
        /** @type {?} */
        var googleMapsNom;
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
    };
    /**
     * Remove hashtag from query
     * @param term Query with hashtag
     */
    /**
     * Remove hashtag from query
     * @private
     * @param {?} term Query with hashtag
     * @return {?}
     */
    IChercheSearchSource.prototype.computeTerm = /**
     * Remove hashtag from query
     * @private
     * @param {?} term Query with hashtag
     * @return {?}
     */
    function (term) {
        var _this = this;
        // Keep hashtags for "lieux"
        /** @type {?} */
        var hashtags = term.match(/(#[^\s]+)/g) || [];
        /** @type {?} */
        var keep = false;
        keep = hashtags.some((/**
         * @param {?} hashtag
         * @return {?}
         */
        function (hashtag) {
            /** @type {?} */
            var hashtagKey = hashtag.substring(1);
            return _this.hashtagsLieuxToKeep.some((/**
             * @param {?} h
             * @return {?}
             */
            function (h) {
                return h
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '') ===
                    hashtagKey
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '');
            }));
        }));
        if (!keep) {
            term = term.replace(/(#[^\s]*)/g, '');
        }
        return term.replace(/[^\wÀ-ÿ !\-\(\),'#]+/g, '');
    };
    /**
     * Add hashtag to param if valid
     * @param term Query with hashtag
     * @param options TextSearchOptions
     */
    /**
     * Add hashtag to param if valid
     * @private
     * @param {?} term Query with hashtag
     * @param {?} options TextSearchOptions
     * @return {?}
     */
    IChercheSearchSource.prototype.computeOptionsParam = /**
     * Add hashtag to param if valid
     * @private
     * @param {?} term Query with hashtag
     * @param {?} options TextSearchOptions
     * @return {?}
     */
    function (term, options) {
        /** @type {?} */
        var hashtags = _super.prototype.getHashtagsValid.call(this, term, 'type');
        if (hashtags) {
            options.params = Object.assign(options.params || {}, {
                type: hashtags.join(',')
            });
        }
        return options;
    };
    IChercheSearchSource.id = 'icherche';
    IChercheSearchSource.type = FEATURE;
    IChercheSearchSource.propertiesBlacklist = [];
    IChercheSearchSource.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    IChercheSearchSource.ctorParameters = function () { return [
        { type: HttpClient },
        { type: LanguageService },
        { type: undefined, decorators: [{ type: Inject, args: ['options',] }] },
        { type: IChercheSearchResultFormatter, decorators: [{ type: Inject, args: [IChercheSearchResultFormatter,] }] },
        { type: Injector }
    ]; };
    return IChercheSearchSource;
}(SearchSource));
export { IChercheSearchSource };
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
var IChercheReverseSearchSource = /** @class */ (function (_super) {
    tslib_1.__extends(IChercheReverseSearchSource, _super);
    function IChercheReverseSearchSource(http, languageService, options, injector) {
        var _this = _super.call(this, options) || this;
        _this.http = http;
        _this.languageService = languageService;
        _this.title$ = new BehaviorSubject('');
        _this.languageService.translate
            .get(_this.options.title)
            .subscribe((/**
         * @param {?} title
         * @return {?}
         */
        function (title) { return _this.title$.next(title); }));
        /** @type {?} */
        var authService = injector.get(AuthService);
        if (_this.settings.length) {
            if (!authService) {
                _this.getAllowedTypes();
            }
            else {
                authService.authenticate$.subscribe((/**
                 * @return {?}
                 */
                function () {
                    _this.getAllowedTypes();
                }));
            }
        }
        return _this;
    }
    Object.defineProperty(IChercheReverseSearchSource.prototype, "title", {
        get: /**
         * @return {?}
         */
        function () {
            return this.title$.getValue();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    IChercheReverseSearchSource.prototype.getId = /**
     * @return {?}
     */
    function () {
        return IChercheReverseSearchSource.id;
    };
    /**
     * @return {?}
     */
    IChercheReverseSearchSource.prototype.getType = /**
     * @return {?}
     */
    function () {
        return IChercheReverseSearchSource.type;
    };
    /**
     * @protected
     * @return {?}
     */
    IChercheReverseSearchSource.prototype.getDefaultOptions = /**
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var types = this.options.params && this.options.params.type
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
    };
    /**
     * Search a location by coordinates
     * @param lonLat Location coordinates
     * @param distance Search raidus around lonLat
     * @returns Observable of <SearchResult<Feature>[]
     */
    /**
     * Search a location by coordinates
     * @param {?} lonLat Location coordinates
     * @param {?=} options
     * @return {?} Observable of <SearchResult<Feature>[]
     */
    IChercheReverseSearchSource.prototype.reverseSearch = /**
     * Search a location by coordinates
     * @param {?} lonLat Location coordinates
     * @param {?=} options
     * @return {?} Observable of <SearchResult<Feature>[]
     */
    function (lonLat, options) {
        var _this = this;
        /** @type {?} */
        var params = this.computeRequestParams(lonLat, options || {});
        if (!params.get('type').length) {
            return of([]);
        }
        return this.http.get(this.searchUrl + "/locate", { params: params }).pipe(map((/**
         * @param {?} response
         * @return {?}
         */
        function (response) {
            return _this.extractResults(response);
        })));
    };
    /**
     * @private
     * @return {?}
     */
    IChercheReverseSearchSource.prototype.getAllowedTypes = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return this.http
            .get(this.searchUrl + "/types")
            .subscribe((/**
         * @param {?} types
         * @return {?}
         */
        function (types) {
            /** @type {?} */
            var typeSetting = _this.settings.find((/**
             * @param {?} s
             * @return {?}
             */
            function (s) { return s.name === 'type'; }));
            typeSetting.values.forEach((/**
             * @param {?} v
             * @return {?}
             */
            function (v) {
                v.available = types.indexOf((/** @type {?} */ (v.value))) > -1;
            }));
        }));
    };
    /**
     * @private
     * @param {?} lonLat
     * @param {?=} options
     * @return {?}
     */
    IChercheReverseSearchSource.prototype.computeRequestParams = /**
     * @private
     * @param {?} lonLat
     * @param {?=} options
     * @return {?}
     */
    function (lonLat, options) {
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
    };
    /**
     * @private
     * @param {?} response
     * @return {?}
     */
    IChercheReverseSearchSource.prototype.extractResults = /**
     * @private
     * @param {?} response
     * @return {?}
     */
    function (response) {
        var _this = this;
        return response.features.map((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            return _this.dataToResult(data);
        }));
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    IChercheReverseSearchSource.prototype.getSubtitle = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        if (!this.settings.length) {
            return '';
        }
        /** @type {?} */
        var subtitle = '';
        switch (data.properties.type) {
            case 'arrondissements':
                subtitle = data.properties.municipalite + ' (Arrondissement)';
                break;
            default:
                /** @type {?} */
                var typeSetting = this.settings.find((/**
                 * @param {?} s
                 * @return {?}
                 */
                function (s) { return s.name === 'type'; }));
                /** @type {?} */
                var type = typeSetting.values.find((/**
                 * @param {?} t
                 * @return {?}
                 */
                function (t) { return t.value === data.properties.type; }));
                if (type) {
                    subtitle = this.languageService.translate.instant(type.title);
                }
        }
        return subtitle;
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    IChercheReverseSearchSource.prototype.dataToResult = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var properties = this.computeProperties(data);
        /** @type {?} */
        var extent = this.computeExtent(data);
        /** @type {?} */
        var id = [this.getId(), properties.type, properties.code].join('.');
        /** @type {?} */
        var titleHtml = data.properties.nom;
        /** @type {?} */
        var subtitleHtml = ' <small> ' + this.getSubtitle(data) + '</small>';
        return {
            source: this,
            data: {
                type: FEATURE,
                projection: 'EPSG:4326',
                geometry: data.geometry,
                extent: extent,
                properties: properties,
                meta: {
                    id: id,
                    title: data.properties.nom
                }
            },
            meta: {
                dataType: FEATURE,
                id: id,
                title: data.properties.nom,
                titleHtml: titleHtml + subtitleHtml,
                icon: data.icon || 'map-marker'
            }
        };
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    IChercheReverseSearchSource.prototype.computeProperties = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var properties = ObjectUtils.removeKeys(data.properties, IChercheReverseSearchSource.propertiesBlacklist);
        return properties;
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    IChercheReverseSearchSource.prototype.computeExtent = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return data.bbox
            ? [data.bbox[0], data.bbox[2], data.bbox[1], data.bbox[3]]
            : undefined;
    };
    IChercheReverseSearchSource.id = 'icherchereverse';
    IChercheReverseSearchSource.type = FEATURE;
    IChercheReverseSearchSource.propertiesBlacklist = [];
    IChercheReverseSearchSource.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    IChercheReverseSearchSource.ctorParameters = function () { return [
        { type: HttpClient },
        { type: LanguageService },
        { type: undefined, decorators: [{ type: Inject, args: ['options',] }] },
        { type: Injector }
    ]; };
    return IChercheReverseSearchSource;
}(SearchSource));
export { IChercheReverseSearchSource };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNoZXJjaGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NoYXJlZC9zb3VyY2VzL2ljaGVyY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFOUQsT0FBTyxFQUFjLEVBQUUsRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDN0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUUxQyxPQUFPLGNBQWMsTUFBTSx3QkFBd0IsQ0FBQztBQUVwRCxPQUFPLEVBQUUsT0FBTyxFQUFXLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRzNELE9BQU8sRUFBRSxZQUFZLEVBQTZCLE1BQU0sVUFBVSxDQUFDO0FBYW5FO0lBRUUsdUNBQW9CLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUFHLENBQUM7Ozs7O0lBRXhELG9EQUFZOzs7O0lBQVosVUFBYSxNQUE2QjtRQUN4QyxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOztnQkFORixVQUFVOzs7O2dCQXRCRixlQUFlOztJQTZCeEIsb0NBQUM7Q0FBQSxBQVBELElBT0M7U0FOWSw2QkFBNkI7Ozs7OztJQUM1Qix3REFBd0M7Ozs7O0FBVXREO0lBQzBDLGdEQUFZO0lBWXBELDhCQUNVLElBQWdC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Q3BCLENBQUM7Ozs7OztJQUVPLG1EQUFhOzs7OztJQUFyQixVQUNFLElBQXlCO1FBRXpCLE9BQU8sSUFBSSxDQUFDLElBQUk7WUFDZCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFELENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDaEIsQ0FBQztJQW5RTSw4QkFBRSxHQUFHLGlCQUFpQixDQUFDO0lBQ3ZCLGdDQUFJLEdBQUcsT0FBTyxDQUFDO0lBQ2YsK0NBQW1CLEdBQWEsRUFBRSxDQUFDOztnQkFMM0MsVUFBVTs7OztnQkFsZ0JGLFVBQVU7Z0JBTVYsZUFBZTtnREE0Z0JuQixNQUFNLFNBQUMsU0FBUztnQkFuaEJRLFFBQVE7O0lBMHdCckMsa0NBQUM7Q0FBQSxBQXZRRCxDQUNpRCxZQUFZLEdBc1E1RDtTQXRRWSwyQkFBMkI7OztJQUV0QywrQkFBOEI7O0lBQzlCLGlDQUFzQjs7SUFDdEIsZ0RBQTBDOztJQUUxQyw2Q0FBa0U7Ozs7O0lBT2hFLDJDQUF3Qjs7Ozs7SUFDeEIsc0RBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAsIGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJ0BpZ28yL2F1dGgnO1xyXG5pbXBvcnQgeyBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgT2JqZWN0VXRpbHMgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQgcG9pbnRPbkZlYXR1cmUgZnJvbSAnQHR1cmYvcG9pbnQtb24tZmVhdHVyZSc7XHJcblxyXG5pbXBvcnQgeyBGRUFUVVJFLCBGZWF0dXJlIH0gZnJvbSAnLi4vLi4vLi4vZmVhdHVyZSc7XHJcbmltcG9ydCB7IEdvb2dsZUxpbmtzIH0gZnJvbSAnLi8uLi8uLi8uLi91dGlscy9nb29nbGVMaW5rcyc7XHJcblxyXG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQgfSBmcm9tICcuLi9zZWFyY2guaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZSwgVGV4dFNlYXJjaCwgUmV2ZXJzZVNlYXJjaCB9IGZyb20gJy4vc291cmNlJztcclxuaW1wb3J0IHtcclxuICBTZWFyY2hTb3VyY2VPcHRpb25zLFxyXG4gIFRleHRTZWFyY2hPcHRpb25zLFxyXG4gIFJldmVyc2VTZWFyY2hPcHRpb25zXHJcbn0gZnJvbSAnLi9zb3VyY2UuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7XHJcbiAgSUNoZXJjaGVEYXRhLFxyXG4gIElDaGVyY2hlUmVzcG9uc2UsXHJcbiAgSUNoZXJjaGVSZXZlcnNlRGF0YSxcclxuICBJQ2hlcmNoZVJldmVyc2VSZXNwb25zZVxyXG59IGZyb20gJy4vaWNoZXJjaGUuaW50ZXJmYWNlcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBJQ2hlcmNoZVNlYXJjaFJlc3VsdEZvcm1hdHRlciB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSkge31cclxuXHJcbiAgZm9ybWF0UmVzdWx0KHJlc3VsdDogU2VhcmNoUmVzdWx0PEZlYXR1cmU+KTogU2VhcmNoUmVzdWx0PEZlYXR1cmU+IHtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogSUNoZXJjaGUgc2VhcmNoIHNvdXJjZVxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSUNoZXJjaGVTZWFyY2hTb3VyY2UgZXh0ZW5kcyBTZWFyY2hTb3VyY2UgaW1wbGVtZW50cyBUZXh0U2VhcmNoIHtcclxuICBzdGF0aWMgaWQgPSAnaWNoZXJjaGUnO1xyXG4gIHN0YXRpYyB0eXBlID0gRkVBVFVSRTtcclxuICBzdGF0aWMgcHJvcGVydGllc0JsYWNrbGlzdDogc3RyaW5nW10gPSBbXTtcclxuICB0aXRsZSQ6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcclxuXHJcbiAgcHJpdmF0ZSBoYXNodGFnc0xpZXV4VG9LZWVwID0gW107XHJcblxyXG4gIGdldCB0aXRsZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMudGl0bGUkLmdldFZhbHVlKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBASW5qZWN0KCdvcHRpb25zJykgb3B0aW9uczogU2VhcmNoU291cmNlT3B0aW9ucyxcclxuICAgIEBJbmplY3QoSUNoZXJjaGVTZWFyY2hSZXN1bHRGb3JtYXR0ZXIpXHJcbiAgICBwcml2YXRlIGZvcm1hdHRlcjogSUNoZXJjaGVTZWFyY2hSZXN1bHRGb3JtYXR0ZXIsXHJcbiAgICBpbmplY3RvcjogSW5qZWN0b3JcclxuICApIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG5cclxuICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZVxyXG4gICAgICAuZ2V0KHRoaXMub3B0aW9ucy50aXRsZSlcclxuICAgICAgLnN1YnNjcmliZSh0aXRsZSA9PiB0aGlzLnRpdGxlJC5uZXh0KHRpdGxlKSk7XHJcblxyXG4gICAgY29uc3QgYXV0aFNlcnZpY2UgPSBpbmplY3Rvci5nZXQoQXV0aFNlcnZpY2UpO1xyXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MubGVuZ3RoKSB7XHJcbiAgICAgIGlmICghYXV0aFNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLmdldEFsbG93ZWRUeXBlcygpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGF1dGhTZXJ2aWNlLmF1dGhlbnRpY2F0ZSQuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuZ2V0QWxsb3dlZFR5cGVzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldElkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gSUNoZXJjaGVTZWFyY2hTb3VyY2UuaWQ7XHJcbiAgfVxyXG5cclxuICBnZXRUeXBlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gSUNoZXJjaGVTZWFyY2hTb3VyY2UudHlwZTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXREZWZhdWx0T3B0aW9ucygpOiBTZWFyY2hTb3VyY2VPcHRpb25zIHtcclxuICAgIGNvbnN0IGxpbWl0ID1cclxuICAgICAgdGhpcy5vcHRpb25zLnBhcmFtcyAmJiB0aGlzLm9wdGlvbnMucGFyYW1zLmxpbWl0XHJcbiAgICAgICAgPyBOdW1iZXIodGhpcy5vcHRpb25zLnBhcmFtcy5saW1pdClcclxuICAgICAgICA6IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IGVjbWF4ID1cclxuICAgICAgdGhpcy5vcHRpb25zLnBhcmFtcyAmJiB0aGlzLm9wdGlvbnMucGFyYW1zLmVjbWF4XHJcbiAgICAgICAgPyBOdW1iZXIodGhpcy5vcHRpb25zLnBhcmFtcy5lY21heClcclxuICAgICAgICA6IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IHR5cGVzID1cclxuICAgICAgdGhpcy5vcHRpb25zLnBhcmFtcyAmJiB0aGlzLm9wdGlvbnMucGFyYW1zLnR5cGVcclxuICAgICAgICA/IHRoaXMub3B0aW9ucy5wYXJhbXMudHlwZVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxzL2csICcnKVxyXG4gICAgICAgICAgICAudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgICAgICAuc3BsaXQoJywnKVxyXG4gICAgICAgIDogW1xyXG4gICAgICAgICAgICAnYWRyZXNzZXMnLFxyXG4gICAgICAgICAgICAnY29kZXMtcG9zdGF1eCcsXHJcbiAgICAgICAgICAgICdyb3V0ZXMnLFxyXG4gICAgICAgICAgICAnbXVuaWNpcGFsaXRlcycsXHJcbiAgICAgICAgICAgICdtcmMnLFxyXG4gICAgICAgICAgICAncmVnYWRtaW4nLFxyXG4gICAgICAgICAgICAnbGlldXgnXHJcbiAgICAgICAgICBdO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5pY2hlcmNoZS5uYW1lJyxcclxuICAgICAgc2VhcmNoVXJsOiAnaHR0cHM6Ly9nZW9lZ2wubXNwLmdvdXYucWMuY2EvYXBpcy9pY2hlcmNoZScsXHJcbiAgICAgIHNldHRpbmdzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdHlwZTogJ2NoZWNrYm94JyxcclxuICAgICAgICAgIHRpdGxlOiAncmVzdWx0cyB0eXBlJyxcclxuICAgICAgICAgIG5hbWU6ICd0eXBlJyxcclxuICAgICAgICAgIHZhbHVlczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5pY2hlcmNoZS50eXBlLmFkZHJlc3MnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAnYWRyZXNzZXMnLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHR5cGVzLmluZGV4T2YoJ2FkcmVzc2VzJykgIT09IC0xLFxyXG4gICAgICAgICAgICAgIGhhc2h0YWdzOiBbJ2FkcmVzc2UnXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5pY2hlcmNoZS50eXBlLm9sZEFkZHJlc3MnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAnYW5jaWVubmVzLWFkcmVzc2VzJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0eXBlcy5pbmRleE9mKCdhbmNpZW5uZXMtYWRyZXNzZXMnKSAhPT0gLTEsXHJcbiAgICAgICAgICAgICAgaGFzaHRhZ3M6IFsnYW5jaWVubmVzLWFkcmVzc2VzJ11cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnaWdvLmdlby5zZWFyY2guaWNoZXJjaGUudHlwZS5wb3N0YWxDb2RlJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ2NvZGVzLXBvc3RhdXgnLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHR5cGVzLmluZGV4T2YoJ2NvZGVzLXBvc3RhdXgnKSAhPT0gLTEsXHJcbiAgICAgICAgICAgICAgaGFzaHRhZ3M6IFsnY29kZS1wb3N0YWwnXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5pY2hlcmNoZS50eXBlLnJvYWQnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAncm91dGVzJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0eXBlcy5pbmRleE9mKCdyb3V0ZXMnKSAhPT0gLTEsXHJcbiAgICAgICAgICAgICAgaGFzaHRhZ3M6IFsncm91dGUnXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5pY2hlcmNoZS50eXBlLmNpdHknLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAnbXVuaWNpcGFsaXRlcycsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogdHlwZXMuaW5kZXhPZignbXVuaWNpcGFsaXRlcycpICE9PSAtMSxcclxuICAgICAgICAgICAgICBoYXNodGFnczogWydtdW5pY2lwYWxpdMOpJywgJ211biddXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLmljaGVyY2hlLnR5cGUub2xkQ2l0eScsXHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdhbmNpZW5uZXMtbXVuaWNpcGFsaXRlcycsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogdHlwZXMuaW5kZXhPZignYW5jaWVubmVzLW11bmljaXBhbGl0ZXMnKSAhPT0gLTEsXHJcbiAgICAgICAgICAgICAgaGFzaHRhZ3M6IFsnYW5jaWVubmVzLW11bmljaXBhbGl0ZXMnXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5pY2hlcmNoZS50eXBlLm1yYycsXHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdtcmMnLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHR5cGVzLmluZGV4T2YoJ21yYycpICE9PSAtMSxcclxuICAgICAgICAgICAgICBoYXNodGFnczogWydtcmMnXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5pY2hlcmNoZS50eXBlLnJlZ2FkbWluJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ3JlZ2FkbWluJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0eXBlcy5pbmRleE9mKCdyZWdhZG1pbicpICE9PSAtMSxcclxuICAgICAgICAgICAgICBoYXNodGFnczogWydyw6lnaW9uLWFkbWluaXN0cmF0aXZlJywgJ3JlZ2FkbWluJ11cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnaWdvLmdlby5zZWFyY2guaWNoZXJjaGUudHlwZS5lbnRyZXByaXNlJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ2VudHJlcHJpc2VzJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0eXBlcy5pbmRleE9mKCdlbnRyZXByaXNlcycpICE9PSAtMSxcclxuICAgICAgICAgICAgICBhdmFpbGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIGhhc2h0YWdzOiBbJ2VudHJlcHJpc2UnXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5pY2hlcmNoZS50eXBlLnBsYWNlJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ2xpZXV4JyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0eXBlcy5pbmRleE9mKCdsaWV1eCcpICE9PSAtMSxcclxuICAgICAgICAgICAgICBoYXNodGFnczogWydsaWV1J11cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnaWdvLmdlby5zZWFyY2guaWNoZXJjaGUudHlwZS5zdW1pJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ2Jvcm5lcy1zdW1pJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0eXBlcy5pbmRleE9mKCdib3JuZXMtc3VtaScpICE9PSAtMSxcclxuICAgICAgICAgICAgICBoYXNodGFnczogWydib3JuZScsICdib3JuZXMnLCAnc3VtaSddXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLmljaGVyY2hlLnR5cGUua20nLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAnYm9ybmVzLWttJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICBoYXNodGFnczogWydib3JuZScsICdib3JuZXMnLCAncmVww6hyZScsICdrbSddXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdyYWRpb2J1dHRvbicsXHJcbiAgICAgICAgICB0aXRsZTogJ3Jlc3VsdHMgbGltaXQnLFxyXG4gICAgICAgICAgbmFtZTogJ2xpbWl0JyxcclxuICAgICAgICAgIHZhbHVlczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICcxJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBsaW1pdCA9PT0gMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICc1JyxcclxuICAgICAgICAgICAgICB2YWx1ZTogNSxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBsaW1pdCA9PT0gNSB8fCAhbGltaXRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnMTAnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAxMCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBsaW1pdCA9PT0gMTBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnMjUnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAyNSxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBsaW1pdCA9PT0gMjVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnNTAnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiA1MCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBsaW1pdCA9PT0gNTBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdHlwZTogJ3JhZGlvYnV0dG9uJyxcclxuICAgICAgICAgIHRpdGxlOiAnZWNtYXgnLFxyXG4gICAgICAgICAgbmFtZTogJ2VjbWF4JyxcclxuICAgICAgICAgIHZhbHVlczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICcxMCAlJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogMTAsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogZWNtYXggPT09IDEwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJzMwICUnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAzMCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBlY21heCA9PT0gMzAgfHwgIWVjbWF4XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJzUwICUnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiA1MCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBlY21heCA9PT0gNTBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnNzUgJScsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IDc1LFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGVjbWF4ID09PSA3NVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICcxMDAgJScsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IDEwMCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBlY21heCA9PT0gMTAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdyYWRpb2J1dHRvbicsXHJcbiAgICAgICAgICB0aXRsZTogJ3Jlc3RyaWN0RXh0ZW50JyxcclxuICAgICAgICAgIG5hbWU6ICdsb2MnLFxyXG4gICAgICAgICAgdmFsdWVzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLmljaGVyY2hlLnJlc3RyaWN0RXh0ZW50Lm1hcCcsXHJcbiAgICAgICAgICAgICAgdmFsdWU6ICd0cnVlJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5pY2hlcmNoZS5yZXN0cmljdEV4dGVudC5xdWViZWMnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAnZmFsc2UnLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBhIGxvY2F0aW9uIGJ5IG5hbWUgb3Iga2V5d29yZFxyXG4gICAqIEBwYXJhbSB0ZXJtIExvY2F0aW9uIG5hbWUgb3Iga2V5d29yZFxyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgPFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdXHJcbiAgICovXHJcbiAgc2VhcmNoKFxyXG4gICAgdGVybTogc3RyaW5nLFxyXG4gICAgb3B0aW9ucz86IFRleHRTZWFyY2hPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxTZWFyY2hSZXN1bHQ8RmVhdHVyZT5bXT4ge1xyXG4gICAgY29uc3QgcGFyYW1zID0gdGhpcy5jb21wdXRlUmVxdWVzdFBhcmFtcyh0ZXJtLCBvcHRpb25zIHx8IHt9KTtcclxuICAgIGlmICghcGFyYW1zLmdldCgndHlwZScpLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gb2YoW10pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vcHRpb25zLnBhcmFtcy5wYWdlID0gcGFyYW1zLmdldCgncGFnZScpIHx8ICcxJztcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHt0aGlzLnNlYXJjaFVybH0vZ2VvY29kZWAsIHsgcGFyYW1zIH0pLnBpcGUoXHJcbiAgICAgIG1hcCgocmVzcG9uc2U6IElDaGVyY2hlUmVzcG9uc2UpID0+IHRoaXMuZXh0cmFjdFJlc3VsdHMocmVzcG9uc2UpKSxcclxuICAgICAgY2F0Y2hFcnJvcihlcnIgPT4ge1xyXG4gICAgICAgIGVyci5lcnJvci50b0Rpc3BsYXkgPSB0cnVlO1xyXG4gICAgICAgIGVyci5lcnJvci50aXRsZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgdGhpcy5nZXREZWZhdWx0T3B0aW9ucygpLnRpdGxlXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aHJvdyBlcnI7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRBbGxvd2VkVHlwZXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5nZXQoYCR7dGhpcy5zZWFyY2hVcmx9L3R5cGVzYClcclxuICAgICAgLnN1YnNjcmliZSgodHlwZXM6IHN0cmluZ1tdKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdHlwZVNldHRpbmcgPSB0aGlzLnNldHRpbmdzLmZpbmQocyA9PiBzLm5hbWUgPT09ICd0eXBlJyk7XHJcbiAgICAgICAgdHlwZVNldHRpbmcudmFsdWVzLmZvckVhY2godiA9PiB7XHJcbiAgICAgICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoYF4ke3YudmFsdWV9KFxcXFwufCQpYCk7XHJcbiAgICAgICAgICBjb25zdCB0eXBlc01hdGNoZWQgPSB0eXBlcy5maWx0ZXIodmFsdWUgPT4gcmVnZXgudGVzdCh2YWx1ZSkpO1xyXG4gICAgICAgICAgdi5hdmFpbGFibGUgPSB0eXBlc01hdGNoZWQubGVuZ3RoID4gMDtcclxuICAgICAgICAgIGlmICh2LnZhbHVlID09PSAnbGlldXgnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFzaHRhZ3NMaWV1eFRvS2VlcCA9IFtcclxuICAgICAgICAgICAgICAuLi4obmV3IFNldChcclxuICAgICAgICAgICAgICAgIHR5cGVzTWF0Y2hlZFxyXG4gICAgICAgICAgICAgICAgICAubWFwKHQgPT4gdC5zcGxpdCgnLicpKVxyXG4gICAgICAgICAgICAgICAgICAucmVkdWNlKChhLCBiKSA9PiBhLmNvbmNhdChiKSlcclxuICAgICAgICAgICAgICAgICAgLmZpbHRlcih0ID0+IHQgIT09ICdsaWV1eCcpXHJcbiAgICAgICAgICAgICAgKSBhcyBhbnkpXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlUmVxdWVzdFBhcmFtcyhcclxuICAgIHRlcm06IHN0cmluZyxcclxuICAgIG9wdGlvbnM6IFRleHRTZWFyY2hPcHRpb25zXHJcbiAgKTogSHR0cFBhcmFtcyB7XHJcbiAgICBjb25zdCBxdWVyeVBhcmFtczogYW55ID0gT2JqZWN0LmFzc2lnbihcclxuICAgICAge1xyXG4gICAgICAgIGdlb21ldHJ5OiB0cnVlLFxyXG4gICAgICAgIGJib3g6IHRydWUsXHJcbiAgICAgICAgaWNvbjogdHJ1ZSxcclxuICAgICAgICB0eXBlOlxyXG4gICAgICAgICAgJ2FkcmVzc2VzLGNvZGVzLXBvc3RhdXgsbXVuaWNpcGFsaXRlcyxtcmMscmVnYWRtaW4sbGlldXgsZW50cmVwcmlzZXMsYm9ybmVzLXN1bWknXHJcbiAgICAgIH0sXHJcbiAgICAgIHRoaXMucGFyYW1zLFxyXG4gICAgICB0aGlzLmNvbXB1dGVPcHRpb25zUGFyYW0odGVybSwgb3B0aW9ucyB8fCB7fSkucGFyYW1zLFxyXG4gICAgICB7XHJcbiAgICAgICAgcTogdGhpcy5jb21wdXRlVGVybSh0ZXJtKSxcclxuICAgICAgICBwYWdlOiBvcHRpb25zLnBhZ2VcclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAocXVlcnlQYXJhbXMubG9jID09PSAndHJ1ZScpIHtcclxuICAgICAgY29uc3QgW3hNaW4sIHlNaW4sIHhNYXgsIHlNYXhdID0gb3B0aW9ucy5leHRlbnQ7XHJcbiAgICAgIHF1ZXJ5UGFyYW1zLmxvYyA9IGAke3hNaW59LCR7eU1pbn07JHt4TWF4fSwke3lNaW59OyR7eE1heH0sJHt5TWF4fTske3hNaW59LCR7eU1heH07JHt4TWlufSwke3lNaW59YDtcclxuICAgIH0gZWxzZSBpZiAocXVlcnlQYXJhbXMubG9jID09PSAnZmFsc2UnKSB7XHJcbiAgICAgIGRlbGV0ZSBxdWVyeVBhcmFtcy5sb2M7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHF1ZXJ5UGFyYW1zLnEuaW5kZXhPZignIycpICE9PSAtMSkge1xyXG4gICAgICBxdWVyeVBhcmFtcy50eXBlID0gJ2xpZXV4JztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IEh0dHBQYXJhbXMoeyBmcm9tT2JqZWN0OiBPYmplY3RVdGlscy5yZW1vdmVVbmRlZmluZWQocXVlcnlQYXJhbXMpIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0UmVzdWx0cyhyZXNwb25zZTogSUNoZXJjaGVSZXNwb25zZSk6IFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdIHtcclxuICAgIHJldHVybiByZXNwb25zZS5mZWF0dXJlcy5tYXAoKGRhdGE6IElDaGVyY2hlRGF0YSkgPT4ge1xyXG4gICAgICByZXR1cm4gdGhpcy5mb3JtYXR0ZXIuZm9ybWF0UmVzdWx0KHRoaXMuZGF0YVRvUmVzdWx0KGRhdGEsIHJlc3BvbnNlKSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGF0YVRvUmVzdWx0KGRhdGE6IElDaGVyY2hlRGF0YSwgcmVzcG9uc2U/OiBJQ2hlcmNoZVJlc3BvbnNlKTogU2VhcmNoUmVzdWx0PEZlYXR1cmU+IHtcclxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSB0aGlzLmNvbXB1dGVQcm9wZXJ0aWVzKGRhdGEpO1xyXG4gICAgY29uc3QgaWQgPSBbdGhpcy5nZXRJZCgpLCBwcm9wZXJ0aWVzLnR5cGUsIHByb3BlcnRpZXMuY29kZV0uam9pbignLicpO1xyXG5cclxuICAgIGNvbnN0IHRpdGxlSHRtbCA9IGRhdGEuaGlnaGxpZ2h0LnRpdGxlIHx8IGRhdGEucHJvcGVydGllcy5ub207XHJcbiAgICBjb25zdCBzdWJ0aXRsZUh0bWwgPSBkYXRhLmhpZ2hsaWdodC50aXRsZTJcclxuICAgICAgPyAnIDxzbWFsbD4gJyArIGRhdGEuaGlnaGxpZ2h0LnRpdGxlMiArICc8L3NtYWxsPidcclxuICAgICAgOiAnJztcclxuICAgIGNvbnN0IHN1YnRpdGxlSHRtbDIgPSBkYXRhLmhpZ2hsaWdodC50aXRsZTNcclxuICAgICAgPyAnPGJyPjxzbWFsbD4gJyArIGRhdGEuaGlnaGxpZ2h0LnRpdGxlMyArICc8L3NtYWxsPidcclxuICAgICAgOiAnJztcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzb3VyY2U6IHRoaXMsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICB0eXBlOiBGRUFUVVJFLFxyXG4gICAgICAgIHByb2plY3Rpb246ICdFUFNHOjQzMjYnLFxyXG4gICAgICAgIGdlb21ldHJ5OiBkYXRhLmdlb21ldHJ5LFxyXG4gICAgICAgIGV4dGVudDogZGF0YS5iYm94LFxyXG4gICAgICAgIHByb3BlcnRpZXMsXHJcbiAgICAgICAgbWV0YToge1xyXG4gICAgICAgICAgaWQsXHJcbiAgICAgICAgICB0aXRsZTogZGF0YS5wcm9wZXJ0aWVzLm5vbVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgbWV0YToge1xyXG4gICAgICAgIGRhdGFUeXBlOiBGRUFUVVJFLFxyXG4gICAgICAgIGlkLFxyXG4gICAgICAgIHRpdGxlOiBkYXRhLnByb3BlcnRpZXMubm9tLFxyXG4gICAgICAgIHRpdGxlSHRtbDogdGl0bGVIdG1sICsgc3VidGl0bGVIdG1sICsgc3VidGl0bGVIdG1sMixcclxuICAgICAgICBpY29uOiBkYXRhLmljb24gfHwgJ21hcC1tYXJrZXInLFxyXG4gICAgICAgIG5leHRQYWdlOiByZXNwb25zZS5mZWF0dXJlcy5sZW5ndGggJSArdGhpcy5vcHRpb25zLnBhcmFtcy5saW1pdCA9PT0gMCAmJiArdGhpcy5vcHRpb25zLnBhcmFtcy5wYWdlIDwgMTBcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZVByb3BlcnRpZXMoZGF0YTogSUNoZXJjaGVEYXRhKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XHJcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gT2JqZWN0VXRpbHMucmVtb3ZlS2V5cyhcclxuICAgICAgZGF0YS5wcm9wZXJ0aWVzLFxyXG4gICAgICBJQ2hlcmNoZVNlYXJjaFNvdXJjZS5wcm9wZXJ0aWVzQmxhY2tsaXN0XHJcbiAgICApO1xyXG5cclxuICAgIGlmIChkYXRhLmdlb21ldHJ5ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oeyB0eXBlOiBkYXRhLmluZGV4IH0sIHByb3BlcnRpZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdvb2dsZUxpbmtzUHJvcGVydGllczoge1xyXG4gICAgICBHb29nbGVNYXBzOiBzdHJpbmc7XHJcbiAgICAgIEdvb2dsZVN0cmVldFZpZXc/OiBzdHJpbmc7XHJcbiAgICB9ID0ge1xyXG4gICAgICBHb29nbGVNYXBzOiAnJ1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgZ29vZ2xlTWFwcztcclxuICAgIGlmIChkYXRhLmdlb21ldHJ5LnR5cGUgPT09ICdQb2ludCcpIHtcclxuICAgICAgZ29vZ2xlTWFwcyA9IEdvb2dsZUxpbmtzLmdldEdvb2dsZU1hcHNDb29yZExpbmsoXHJcbiAgICAgICAgZGF0YS5nZW9tZXRyeS5jb29yZGluYXRlc1swXSxcclxuICAgICAgICBkYXRhLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzFdXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBwb2ludCA9IHBvaW50T25GZWF0dXJlKGRhdGEuZ2VvbWV0cnkpO1xyXG4gICAgICBnb29nbGVNYXBzID0gR29vZ2xlTGlua3MuZ2V0R29vZ2xlTWFwc0Nvb3JkTGluayhwb2ludC5nZW9tZXRyeS5jb29yZGluYXRlc1swXSwgcG9pbnQuZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMV0pO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBnb29nbGVNYXBzTm9tO1xyXG4gICAgaWYgKGRhdGEuaW5kZXggPT09ICdyb3V0ZXMnKSB7XHJcbiAgICAgIGdvb2dsZU1hcHNOb20gPSBHb29nbGVMaW5rcy5nZXRHb29nbGVNYXBzTmFtZUxpbmsoZGF0YS5wcm9wZXJ0aWVzLm5vbSArICcsICcgKyBkYXRhLnByb3BlcnRpZXMubXVuaWNpcGFsaXRlKTtcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5pbmRleCA9PT0gJ211bmljaXBhbGl0ZXMnKSB7XHJcbiAgICAgIGdvb2dsZU1hcHNOb20gPSBHb29nbGVMaW5rcy5nZXRHb29nbGVNYXBzTmFtZUxpbmsoZGF0YS5wcm9wZXJ0aWVzLm5vbSArICcsICcgKyBkYXRhLnByb3BlcnRpZXMucmVnQWRtaW4pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZ29vZ2xlTWFwc05vbSA9IEdvb2dsZUxpbmtzLmdldEdvb2dsZU1hcHNOYW1lTGluayhkYXRhLnByb3BlcnRpZXMubm9tIHx8IGRhdGEuaGlnaGxpZ2h0LnRpdGxlKTtcclxuICAgIH1cclxuXHJcbiAgICBnb29nbGVMaW5rc1Byb3BlcnRpZXMuR29vZ2xlTWFwcyA9ICc8YSBocmVmPScgKyBnb29nbGVNYXBzICsgJyB0YXJnZXQ9XCJfYmxhbmtcIj4nICtcclxuICAgICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uc2VhcmNoQnlDb29yZCcpICsgJzwvYT4gPGJyIC8+IDxhIGhyZWY9JyArIGdvb2dsZU1hcHNOb20gK1xyXG4gICAgICAgICcgdGFyZ2V0PVwiX2JsYW5rXCI+JyArIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLnNlYXJjaEJ5TmFtZScpICsgJzwvYT4nO1xyXG5cclxuICAgIGlmIChkYXRhLmdlb21ldHJ5LnR5cGUgPT09ICdQb2ludCcpIHtcclxuICAgICAgZ29vZ2xlTGlua3NQcm9wZXJ0aWVzLkdvb2dsZVN0cmVldFZpZXcgPSBHb29nbGVMaW5rcy5nZXRHb29nbGVTdHJlZXRWaWV3TGluayhcclxuICAgICAgICBkYXRhLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzBdLFxyXG4gICAgICAgIGRhdGEuZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMV1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihcclxuICAgICAgeyB0eXBlOiBkYXRhLmluZGV4IH0sXHJcbiAgICAgIHByb3BlcnRpZXMsXHJcbiAgICAgIGdvb2dsZUxpbmtzUHJvcGVydGllc1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBoYXNodGFnIGZyb20gcXVlcnlcclxuICAgKiBAcGFyYW0gdGVybSBRdWVyeSB3aXRoIGhhc2h0YWdcclxuICAgKi9cclxuICBwcml2YXRlIGNvbXB1dGVUZXJtKHRlcm06IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAvLyBLZWVwIGhhc2h0YWdzIGZvciBcImxpZXV4XCJcclxuICAgIGNvbnN0IGhhc2h0YWdzID0gdGVybS5tYXRjaCgvKCNbXlxcc10rKS9nKSB8fCBbXTtcclxuICAgIGxldCBrZWVwID0gZmFsc2U7XHJcbiAgICBrZWVwID0gaGFzaHRhZ3Muc29tZShoYXNodGFnID0+IHtcclxuICAgICAgY29uc3QgaGFzaHRhZ0tleSA9IGhhc2h0YWcuc3Vic3RyaW5nKDEpO1xyXG4gICAgICByZXR1cm4gdGhpcy5oYXNodGFnc0xpZXV4VG9LZWVwLnNvbWUoXHJcbiAgICAgICAgaCA9PlxyXG4gICAgICAgICAgaFxyXG4gICAgICAgICAgICAudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgICAgICAubm9ybWFsaXplKCdORkQnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgJycpID09PVxyXG4gICAgICAgICAgaGFzaHRhZ0tleVxyXG4gICAgICAgICAgICAudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgICAgICAubm9ybWFsaXplKCdORkQnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgJycpXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIWtlZXApIHtcclxuICAgICAgdGVybSA9IHRlcm0ucmVwbGFjZSgvKCNbXlxcc10qKS9nLCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRlcm0ucmVwbGFjZSgvW15cXHfDgC3DvyAhXFwtXFwoXFwpLCcjXSsvZywgJycpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGhhc2h0YWcgdG8gcGFyYW0gaWYgdmFsaWRcclxuICAgKiBAcGFyYW0gdGVybSBRdWVyeSB3aXRoIGhhc2h0YWdcclxuICAgKiBAcGFyYW0gb3B0aW9ucyBUZXh0U2VhcmNoT3B0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgY29tcHV0ZU9wdGlvbnNQYXJhbShcclxuICAgIHRlcm06IHN0cmluZyxcclxuICAgIG9wdGlvbnM6IFRleHRTZWFyY2hPcHRpb25zXHJcbiAgKTogVGV4dFNlYXJjaE9wdGlvbnMge1xyXG4gICAgY29uc3QgaGFzaHRhZ3MgPSBzdXBlci5nZXRIYXNodGFnc1ZhbGlkKHRlcm0sICd0eXBlJyk7XHJcbiAgICBpZiAoaGFzaHRhZ3MpIHtcclxuICAgICAgb3B0aW9ucy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKG9wdGlvbnMucGFyYW1zIHx8IHt9LCB7XHJcbiAgICAgICAgdHlwZTogaGFzaHRhZ3Muam9pbignLCcpXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvcHRpb25zO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIElDaGVyY2hlUmV2ZXJzZSBzZWFyY2ggc291cmNlXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBJQ2hlcmNoZVJldmVyc2VTZWFyY2hTb3VyY2UgZXh0ZW5kcyBTZWFyY2hTb3VyY2VcclxuICBpbXBsZW1lbnRzIFJldmVyc2VTZWFyY2gge1xyXG4gIHN0YXRpYyBpZCA9ICdpY2hlcmNoZXJldmVyc2UnO1xyXG4gIHN0YXRpYyB0eXBlID0gRkVBVFVSRTtcclxuICBzdGF0aWMgcHJvcGVydGllc0JsYWNrbGlzdDogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgdGl0bGUkOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XHJcblxyXG4gIGdldCB0aXRsZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMudGl0bGUkLmdldFZhbHVlKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBASW5qZWN0KCdvcHRpb25zJykgb3B0aW9uczogU2VhcmNoU291cmNlT3B0aW9ucyxcclxuICAgIGluamVjdG9yOiBJbmplY3RvclxyXG4gICkge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcblxyXG4gICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlXHJcbiAgICAgIC5nZXQodGhpcy5vcHRpb25zLnRpdGxlKVxyXG4gICAgICAuc3Vic2NyaWJlKHRpdGxlID0+IHRoaXMudGl0bGUkLm5leHQodGl0bGUpKTtcclxuXHJcbiAgICBjb25zdCBhdXRoU2VydmljZSA9IGluamVjdG9yLmdldChBdXRoU2VydmljZSk7XHJcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5sZW5ndGgpIHtcclxuICAgICAgaWYgKCFhdXRoU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMuZ2V0QWxsb3dlZFR5cGVzKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYXV0aFNlcnZpY2UuYXV0aGVudGljYXRlJC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5nZXRBbGxvd2VkVHlwZXMoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0SWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBJQ2hlcmNoZVJldmVyc2VTZWFyY2hTb3VyY2UuaWQ7XHJcbiAgfVxyXG5cclxuICBnZXRUeXBlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gSUNoZXJjaGVSZXZlcnNlU2VhcmNoU291cmNlLnR5cGU7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0RGVmYXVsdE9wdGlvbnMoKTogU2VhcmNoU291cmNlT3B0aW9ucyB7XHJcbiAgICBjb25zdCB0eXBlcyA9XHJcbiAgICAgIHRoaXMub3B0aW9ucy5wYXJhbXMgJiYgdGhpcy5vcHRpb25zLnBhcmFtcy50eXBlXHJcbiAgICAgICAgPyB0aGlzLm9wdGlvbnMucGFyYW1zLnR5cGVcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xccy9nLCAnJylcclxuICAgICAgICAgICAgLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAgICAgLnNwbGl0KCcsJylcclxuICAgICAgICA6IFsnYWRyZXNzZXMnLCAnbXVuaWNpcGFsaXRlcycsICdtcmMnLCAncmVnYWRtaW4nXTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLmljaGVyY2hlUmV2ZXJzZS5uYW1lJyxcclxuICAgICAgc2VhcmNoVXJsOiAnaHR0cHM6Ly9nZW9lZ2wubXNwLmdvdXYucWMuY2EvYXBpcy90ZXJyYXBpJyxcclxuICAgICAgc2V0dGluZ3M6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAnY2hlY2tib3gnLFxyXG4gICAgICAgICAgdGl0bGU6ICdyZXN1bHRzIHR5cGUnLFxyXG4gICAgICAgICAgbmFtZTogJ3R5cGUnLFxyXG4gICAgICAgICAgdmFsdWVzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ2lnby5nZW8uc2VhcmNoLmljaGVyY2hlLnR5cGUuYWRkcmVzcycsXHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdhZHJlc3NlcycsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogdHlwZXMuaW5kZXhPZignYWRyZXNzZXMnKSAhPT0gLTFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnaWdvLmdlby5zZWFyY2guaWNoZXJjaGUudHlwZS5yb2FkJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ3JvdXRlcycsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogdHlwZXMuaW5kZXhPZigncm91dGVzJykgIT09IC0xLFxyXG4gICAgICAgICAgICAgIGF2YWlsYWJsZTogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnaWdvLmdlby5zZWFyY2guaWNoZXJjaGUudHlwZS5kaXN0cmljdCcsXHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdhcnJvbmRpc3NlbWVudHMnLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHR5cGVzLmluZGV4T2YoJ2Fycm9uZGlzc2VtZW50cycpICE9PSAtMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5pY2hlcmNoZS50eXBlLmNpdHknLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAnbXVuaWNpcGFsaXRlcycsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogdHlwZXMuaW5kZXhPZignbXVuaWNpcGFsaXRlcycpICE9PSAtMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5pY2hlcmNoZS50eXBlLm1yYycsXHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdtcmMnLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHR5cGVzLmluZGV4T2YoJ21yYycpICE9PSAtMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5pY2hlcmNoZS50eXBlLnJlZ2FkbWluJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ3JlZ2FkbWluJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0eXBlcy5pbmRleE9mKCdyZWdhZG1pbicpICE9PSAtMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAncmFkaW9idXR0b24nLFxyXG4gICAgICAgICAgdGl0bGU6ICdyYWRpdXMnLFxyXG4gICAgICAgICAgbmFtZTogJ2J1ZmZlcicsXHJcbiAgICAgICAgICB2YWx1ZXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnMTAwIG0nLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAxMDAsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogIXRoaXMub3B0aW9ucy5kaXN0YW5jZSB8fCB0aGlzLm9wdGlvbnMuZGlzdGFuY2UgPT09IDEwMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICc1MDAgbScsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IDUwMCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0aGlzLm9wdGlvbnMuZGlzdGFuY2UgPT09IDUwMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICcxIGttJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogMTAwMCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0aGlzLm9wdGlvbnMuZGlzdGFuY2UgPT09IDEwMDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnMiBrbScsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IDIwMDAsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogdGhpcy5vcHRpb25zLmRpc3RhbmNlID09PSAyMDAwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJzUga20nLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiA1MDAwLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHRoaXMub3B0aW9ucy5kaXN0YW5jZSA9PT0gNTAwMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIGEgbG9jYXRpb24gYnkgY29vcmRpbmF0ZXNcclxuICAgKiBAcGFyYW0gbG9uTGF0IExvY2F0aW9uIGNvb3JkaW5hdGVzXHJcbiAgICogQHBhcmFtIGRpc3RhbmNlIFNlYXJjaCByYWlkdXMgYXJvdW5kIGxvbkxhdFxyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgPFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdXHJcbiAgICovXHJcbiAgcmV2ZXJzZVNlYXJjaChcclxuICAgIGxvbkxhdDogW251bWJlciwgbnVtYmVyXSxcclxuICAgIG9wdGlvbnM/OiBSZXZlcnNlU2VhcmNoT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8U2VhcmNoUmVzdWx0PEZlYXR1cmU+W10+IHtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuY29tcHV0ZVJlcXVlc3RQYXJhbXMobG9uTGF0LCBvcHRpb25zIHx8IHt9KTtcclxuICAgIGlmICghcGFyYW1zLmdldCgndHlwZScpLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gb2YoW10pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy5zZWFyY2hVcmx9L2xvY2F0ZWAsIHsgcGFyYW1zIH0pLnBpcGUoXHJcbiAgICAgIG1hcCgocmVzcG9uc2U6IElDaGVyY2hlUmV2ZXJzZVJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXh0cmFjdFJlc3VsdHMocmVzcG9uc2UpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0QWxsb3dlZFR5cGVzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuZ2V0KGAke3RoaXMuc2VhcmNoVXJsfS90eXBlc2ApXHJcbiAgICAgIC5zdWJzY3JpYmUoKHR5cGVzOiBzdHJpbmdbXSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHR5cGVTZXR0aW5nID0gdGhpcy5zZXR0aW5ncy5maW5kKHMgPT4gcy5uYW1lID09PSAndHlwZScpO1xyXG4gICAgICAgIHR5cGVTZXR0aW5nLnZhbHVlcy5mb3JFYWNoKHYgPT4ge1xyXG4gICAgICAgICAgdi5hdmFpbGFibGUgPSB0eXBlcy5pbmRleE9mKHYudmFsdWUgYXMgc3RyaW5nKSA+IC0xO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZVJlcXVlc3RQYXJhbXMoXHJcbiAgICBsb25MYXQ6IFtudW1iZXIsIG51bWJlcl0sXHJcbiAgICBvcHRpb25zPzogUmV2ZXJzZVNlYXJjaE9wdGlvbnNcclxuICApOiBIdHRwUGFyYW1zIHtcclxuICAgIGlmIChvcHRpb25zLmRpc3RhbmNlIHx8IHRoaXMub3B0aW9ucy5kaXN0YW5jZSkge1xyXG4gICAgICBvcHRpb25zLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24ob3B0aW9ucy5wYXJhbXMgfHwge30sIHtcclxuICAgICAgICBidWZmZXI6IG9wdGlvbnMuZGlzdGFuY2UgfHwgdGhpcy5vcHRpb25zLmRpc3RhbmNlXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgSHR0cFBhcmFtcyh7XHJcbiAgICAgIGZyb21PYmplY3Q6IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbG9jOiBsb25MYXQuam9pbignLCcpLFxyXG4gICAgICAgICAgc29ydDogJ2Rpc3RhbmNlJyxcclxuICAgICAgICAgIGdlb21ldHJ5OiB0cnVlLFxyXG4gICAgICAgICAgaWNvbjogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3B0aW9ucy5wYXJhbXMgfHwge30sXHJcbiAgICAgICAgdGhpcy5wYXJhbXNcclxuICAgICAgKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RSZXN1bHRzKFxyXG4gICAgcmVzcG9uc2U6IElDaGVyY2hlUmV2ZXJzZVJlc3BvbnNlXHJcbiAgKTogU2VhcmNoUmVzdWx0PEZlYXR1cmU+W10ge1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlLmZlYXR1cmVzLm1hcCgoZGF0YTogSUNoZXJjaGVSZXZlcnNlRGF0YSkgPT4ge1xyXG4gICAgICByZXR1cm4gdGhpcy5kYXRhVG9SZXN1bHQoZGF0YSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0U3VidGl0bGUoZGF0YTogSUNoZXJjaGVSZXZlcnNlRGF0YSkge1xyXG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICBsZXQgc3VidGl0bGUgPSAnJztcclxuICAgIHN3aXRjaCAoZGF0YS5wcm9wZXJ0aWVzLnR5cGUpIHtcclxuICAgICAgY2FzZSAnYXJyb25kaXNzZW1lbnRzJzpcclxuICAgICAgICBzdWJ0aXRsZSA9IGRhdGEucHJvcGVydGllcy5tdW5pY2lwYWxpdGUgKyAnIChBcnJvbmRpc3NlbWVudCknO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbnN0IHR5cGVTZXR0aW5nID0gdGhpcy5zZXR0aW5ncy5maW5kKHMgPT4gcy5uYW1lID09PSAndHlwZScpO1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSB0eXBlU2V0dGluZy52YWx1ZXMuZmluZChcclxuICAgICAgICAgIHQgPT4gdC52YWx1ZSA9PT0gZGF0YS5wcm9wZXJ0aWVzLnR5cGVcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmICh0eXBlKSB7XHJcbiAgICAgICAgICBzdWJ0aXRsZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KHR5cGUudGl0bGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBzdWJ0aXRsZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGF0YVRvUmVzdWx0KGRhdGE6IElDaGVyY2hlUmV2ZXJzZURhdGEpOiBTZWFyY2hSZXN1bHQ8RmVhdHVyZT4ge1xyXG4gICAgY29uc3QgcHJvcGVydGllcyA9IHRoaXMuY29tcHV0ZVByb3BlcnRpZXMoZGF0YSk7XHJcbiAgICBjb25zdCBleHRlbnQgPSB0aGlzLmNvbXB1dGVFeHRlbnQoZGF0YSk7XHJcbiAgICBjb25zdCBpZCA9IFt0aGlzLmdldElkKCksIHByb3BlcnRpZXMudHlwZSwgcHJvcGVydGllcy5jb2RlXS5qb2luKCcuJyk7XHJcblxyXG4gICAgY29uc3QgdGl0bGVIdG1sID0gZGF0YS5wcm9wZXJ0aWVzLm5vbTtcclxuICAgIGNvbnN0IHN1YnRpdGxlSHRtbCA9ICcgPHNtYWxsPiAnICsgdGhpcy5nZXRTdWJ0aXRsZShkYXRhKSArICc8L3NtYWxsPic7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc291cmNlOiB0aGlzLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgdHlwZTogRkVBVFVSRSxcclxuICAgICAgICBwcm9qZWN0aW9uOiAnRVBTRzo0MzI2JyxcclxuICAgICAgICBnZW9tZXRyeTogZGF0YS5nZW9tZXRyeSxcclxuICAgICAgICBleHRlbnQsXHJcbiAgICAgICAgcHJvcGVydGllcyxcclxuICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICBpZCxcclxuICAgICAgICAgIHRpdGxlOiBkYXRhLnByb3BlcnRpZXMubm9tXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBtZXRhOiB7XHJcbiAgICAgICAgZGF0YVR5cGU6IEZFQVRVUkUsXHJcbiAgICAgICAgaWQsXHJcbiAgICAgICAgdGl0bGU6IGRhdGEucHJvcGVydGllcy5ub20sXHJcbiAgICAgICAgdGl0bGVIdG1sOiB0aXRsZUh0bWwgKyBzdWJ0aXRsZUh0bWwsXHJcbiAgICAgICAgaWNvbjogZGF0YS5pY29uIHx8ICdtYXAtbWFya2VyJ1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlUHJvcGVydGllcyhkYXRhOiBJQ2hlcmNoZVJldmVyc2VEYXRhKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XHJcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gT2JqZWN0VXRpbHMucmVtb3ZlS2V5cyhcclxuICAgICAgZGF0YS5wcm9wZXJ0aWVzLFxyXG4gICAgICBJQ2hlcmNoZVJldmVyc2VTZWFyY2hTb3VyY2UucHJvcGVydGllc0JsYWNrbGlzdFxyXG4gICAgKTtcclxuICAgIHJldHVybiBwcm9wZXJ0aWVzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlRXh0ZW50KFxyXG4gICAgZGF0YTogSUNoZXJjaGVSZXZlcnNlRGF0YVxyXG4gICk6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdIHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiBkYXRhLmJib3hcclxuICAgICAgPyBbZGF0YS5iYm94WzBdLCBkYXRhLmJib3hbMl0sIGRhdGEuYmJveFsxXSwgZGF0YS5iYm94WzNdXVxyXG4gICAgICA6IHVuZGVmaW5lZDtcclxuICB9XHJcbn1cclxuIl19