/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LanguageService } from '@igo2/core';
import { ObjectUtils } from '@igo2/utils';
import { FEATURE } from '../../../feature';
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
    function IChercheSearchSource(http, options, formatter) {
        var _this = _super.call(this, options) || this;
        _this.http = http;
        _this.formatter = formatter;
        return _this;
    }
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
     * @protected
     * @return {?}
     */
    IChercheSearchSource.prototype.getDefaultOptions = /**
     * @protected
     * @return {?}
     */
    function () {
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
    IChercheSearchSource.prototype.computeRequestParams = /**
     * @private
     * @param {?} term
     * @param {?} options
     * @return {?}
     */
    function (term, options) {
        return new HttpParams({
            fromObject: Object.assign({
                q: this.computeTerm(term),
                geometry: true,
                type: 'adresses,codes-postaux,municipalites,mrc,regadmin,lieux,entreprises,bornes'
            }, this.params, this.computeOptionsParam(term, options || {}).params)
        });
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
            return _this.formatter.formatResult(_this.dataToResult(data));
        }));
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    IChercheSearchSource.prototype.dataToResult = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var properties = this.computeProperties(data);
        /** @type {?} */
        var id = [this.getId(), properties.type, properties.code].join('.');
        /** @type {?} */
        var subtitleHtml = data.highlight.title2
            ? ' <small> ' + data.highlight.title2 + '</small>'
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
                titleHtml: data.highlight.title + subtitleHtml,
                icon: 'map-marker'
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
        return Object.assign(properties, { type: data.index });
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
        return term.replace(/(#[^\s]*)/g, '');
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
        var _this = this;
        /** @type {?} */
        var tags = term.match(/(#[^\s]+)/g);
        if (tags) {
            /** @type {?} */
            var typeValue_1 = '';
            /** @type {?} */
            var hashtagToAdd_1 = false;
            tags.forEach((/**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (_super.prototype.hashtagValid.call(_this, _super.prototype.getSettingsValues.call(_this, 'type'), value, true)) {
                    typeValue_1 += value.substring(1) + ',';
                    hashtagToAdd_1 = true;
                }
            }));
            if (hashtagToAdd_1) {
                options.params = Object.assign(options.params || {}, {
                    type: typeValue_1.slice(0, -1)
                });
            }
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
        { type: undefined, decorators: [{ type: Inject, args: ['options',] }] },
        { type: IChercheSearchResultFormatter, decorators: [{ type: Inject, args: [IChercheSearchResultFormatter,] }] }
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
var IChercheReverseSearchSource = /** @class */ (function (_super) {
    tslib_1.__extends(IChercheReverseSearchSource, _super);
    function IChercheReverseSearchSource(http, options) {
        var _this = _super.call(this, options) || this;
        _this.http = http;
        return _this;
    }
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
     * @protected
     * @return {?}
     */
    IChercheReverseSearchSource.prototype.getDefaultOptions = /**
     * @protected
     * @return {?}
     */
    function () {
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
        return this.http.get(this.searchUrl, { params: params }).pipe(map((/**
         * @param {?} response
         * @return {?}
         */
        function (response) {
            return _this.extractResults(response);
        })));
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
        /** @type {?} */
        var distance = options.distance;
        return new HttpParams({
            fromObject: Object.assign({
                loc: lonLat.join(','),
                buffer: distance ? String(distance) : '100',
                geometry: true
            }, this.params, options.params || {})
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
                icon: 'map-marker'
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
    IChercheReverseSearchSource.propertiesBlacklist = ['doc_type'];
    IChercheReverseSearchSource.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    IChercheReverseSearchSource.ctorParameters = function () { return [
        { type: HttpClient },
        { type: undefined, decorators: [{ type: Inject, args: ['options',] }] }
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
    /**
     * @type {?}
     * @private
     */
    IChercheReverseSearchSource.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNoZXJjaGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NoYXJlZC9zb3VyY2VzL2ljaGVyY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUc5RCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUU3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRTFDLE9BQU8sRUFBRSxPQUFPLEVBQVcsTUFBTSxrQkFBa0IsQ0FBQztBQUdwRCxPQUFPLEVBQUUsWUFBWSxFQUE2QixNQUFNLFVBQVUsQ0FBQztBQWFuRTtJQUVFLHVDQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFBRyxDQUFDOzs7OztJQUV4RCxvREFBWTs7OztJQUFaLFVBQWEsTUFBNkI7UUFDeEMsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7Z0JBTkYsVUFBVTs7OztnQkFwQkYsZUFBZTs7SUEyQnhCLG9DQUFDO0NBQUEsQUFQRCxJQU9DO1NBTlksNkJBQTZCOzs7Ozs7SUFDNUIsd0RBQXdDOzs7OztBQVV0RDtJQUMwQyxnREFBWTtJQUtwRCw4QkFDVSxJQUFnQixFQUNMLE9BQTRCLEVBRXZDLFNBQXdDO1FBSmxELFlBTUUsa0JBQU0sT0FBTyxDQUFDLFNBQ2Y7UUFOUyxVQUFJLEdBQUosSUFBSSxDQUFZO1FBR2hCLGVBQVMsR0FBVCxTQUFTLENBQStCOztJQUdsRCxDQUFDOzs7O0lBRUQsb0NBQUs7OztJQUFMO1FBQ0UsT0FBTyxvQkFBb0IsQ0FBQyxFQUFFLENBQUM7SUFDakMsQ0FBQzs7Ozs7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O2dCQUNKLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixFQUFFLElBQUE7Z0JBQ0YsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRztnQkFDMUIsSUFBSSxFQUFFLFlBQVk7YUFDbkI7U0FDRixDQUFDO0lBQ0osQ0FBQzs7Ozs7O0lBRU8sdURBQWlCOzs7OztJQUF6QixVQUEwQixJQUF5Qjs7WUFDM0MsVUFBVSxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQ3ZDLElBQUksQ0FBQyxVQUFVLEVBQ2YsMkJBQTJCLENBQUMsbUJBQW1CLENBQ2hEO1FBQ0QsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQzs7Ozs7O0lBRU8sbURBQWE7Ozs7O0lBQXJCLFVBQ0UsSUFBeUI7UUFFekIsT0FBTyxJQUFJLENBQUMsSUFBSTtZQUNkLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUQsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUNoQixDQUFDO0lBbkpNLDhCQUFFLEdBQUcsaUJBQWlCLENBQUM7SUFDdkIsZ0NBQUksR0FBRyxPQUFPLENBQUM7SUFDZiwrQ0FBbUIsR0FBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztnQkFMckQsVUFBVTs7OztnQkFyVEYsVUFBVTtnREE4VGQsTUFBTSxTQUFDLFNBQVM7O0lBOElyQixrQ0FBQztDQUFBLEFBdkpELENBQ2lELFlBQVksR0FzSjVEO1NBdEpZLDJCQUEyQjs7O0lBRXRDLCtCQUE4Qjs7SUFDOUIsaUNBQXNCOztJQUN0QixnREFBb0Q7Ozs7O0lBR2xELDJDQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7IE9iamVjdFV0aWxzIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgRkVBVFVSRSwgRmVhdHVyZSB9IGZyb20gJy4uLy4uLy4uL2ZlYXR1cmUnO1xyXG5cclxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi4vc2VhcmNoLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2UsIFRleHRTZWFyY2gsIFJldmVyc2VTZWFyY2ggfSBmcm9tICcuL3NvdXJjZSc7XHJcbmltcG9ydCB7XHJcbiAgU2VhcmNoU291cmNlT3B0aW9ucyxcclxuICBUZXh0U2VhcmNoT3B0aW9ucyxcclxuICBSZXZlcnNlU2VhcmNoT3B0aW9uc1xyXG59IGZyb20gJy4vc291cmNlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQge1xyXG4gIElDaGVyY2hlRGF0YSxcclxuICBJQ2hlcmNoZVJlc3BvbnNlLFxyXG4gIElDaGVyY2hlUmV2ZXJzZURhdGEsXHJcbiAgSUNoZXJjaGVSZXZlcnNlUmVzcG9uc2VcclxufSBmcm9tICcuL2ljaGVyY2hlLmludGVyZmFjZXMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSUNoZXJjaGVTZWFyY2hSZXN1bHRGb3JtYXR0ZXIge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UpIHt9XHJcblxyXG4gIGZvcm1hdFJlc3VsdChyZXN1bHQ6IFNlYXJjaFJlc3VsdDxGZWF0dXJlPik6IFNlYXJjaFJlc3VsdDxGZWF0dXJlPiB7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIElDaGVyY2hlIHNlYXJjaCBzb3VyY2VcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIElDaGVyY2hlU2VhcmNoU291cmNlIGV4dGVuZHMgU2VhcmNoU291cmNlIGltcGxlbWVudHMgVGV4dFNlYXJjaCB7XHJcbiAgc3RhdGljIGlkID0gJ2ljaGVyY2hlJztcclxuICBzdGF0aWMgdHlwZSA9IEZFQVRVUkU7XHJcbiAgc3RhdGljIHByb3BlcnRpZXNCbGFja2xpc3Q6IHN0cmluZ1tdID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgQEluamVjdCgnb3B0aW9ucycpIG9wdGlvbnM6IFNlYXJjaFNvdXJjZU9wdGlvbnMsXHJcbiAgICBASW5qZWN0KElDaGVyY2hlU2VhcmNoUmVzdWx0Rm9ybWF0dGVyKVxyXG4gICAgcHJpdmF0ZSBmb3JtYXR0ZXI6IElDaGVyY2hlU2VhcmNoUmVzdWx0Rm9ybWF0dGVyXHJcbiAgKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIGdldElkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gSUNoZXJjaGVTZWFyY2hTb3VyY2UuaWQ7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0RGVmYXVsdE9wdGlvbnMoKTogU2VhcmNoU291cmNlT3B0aW9ucyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0aXRsZTogJ0lDaGVyY2hlIFF1w6liZWMnLFxyXG4gICAgICBzZWFyY2hVcmw6ICdodHRwczovL2dlb2VnbC5tc3AuZ291di5xYy5jYS9hcGlzL2ljaGVyY2hlL2dlb2NvZGUnLFxyXG4gICAgICBzZXR0aW5nczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdjaGVja2JveCcsXHJcbiAgICAgICAgICB0aXRsZTogJ3Jlc3VsdHMgdHlwZScsXHJcbiAgICAgICAgICBuYW1lOiAndHlwZScsXHJcbiAgICAgICAgICB2YWx1ZXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnQWRyZXNzZScsXHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdhZHJlc3NlcycsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyB7XHJcbiAgICAgICAgICAgIC8vICAgdGl0bGU6ICdBbmNpZW5uZSBhZHJlc3NlJyxcclxuICAgICAgICAgICAgLy8gICB2YWx1ZTogJ2FuY2llbm5lX2FkcmVzc2UnLFxyXG4gICAgICAgICAgICAvLyAgIGVuYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgLy8gfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnQ29kZSBQb3N0YWwnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAnY29kZXMtcG9zdGF1eCcsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdSb3V0ZScsXHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdyb3V0ZXMnLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ011bmljaXBhbGl0w6knLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAnbXVuaWNpcGFsaXRlcycsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyB7XHJcbiAgICAgICAgICAgIC8vICAgdGl0bGU6ICdBbmNpZW5uZSBtdW5pY2lwYWxpdMOpJyxcclxuICAgICAgICAgICAgLy8gICB2YWx1ZTogJ2FuY2llbm5lX211bmljaXBhbGl0ZScsXHJcbiAgICAgICAgICAgIC8vICAgZW5hYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAvLyB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdtcmMnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAnbXJjJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ1LDqWdpb24gYWRtaW5pc3RyYXRpdmUnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAncmVnYWRtaW4nLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnTGlldScsXHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdsaWV1eCcsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdCb3JuZScsXHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdib3JuZXMnLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ0VudHJlcHJpc2UnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAnZW50cmVwcmlzZXMnLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdyYWRpb2J1dHRvbicsXHJcbiAgICAgICAgICB0aXRsZTogJ3Jlc3VsdHMgbGltaXQnLFxyXG4gICAgICAgICAgbmFtZTogJ2xpbWl0JyxcclxuICAgICAgICAgIHZhbHVlczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICcxJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICc1JyxcclxuICAgICAgICAgICAgICB2YWx1ZTogNSxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJzEwJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogMTAsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnMjUnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAyNSxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICc1MCcsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IDUwLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdyYWRpb2J1dHRvbicsXHJcbiAgICAgICAgICB0aXRsZTogJ3RydXN0IGxldmVsJyxcclxuICAgICAgICAgIG5hbWU6ICdlY21heCcsXHJcbiAgICAgICAgICB2YWx1ZXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnMTAnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAxMCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICczMCcsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IDMwLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnNTAnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiA1MCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICc3NScsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IDc1LFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJzEwMCcsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IDEwMCxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIGEgbG9jYXRpb24gYnkgbmFtZSBvciBrZXl3b3JkXHJcbiAgICogQHBhcmFtIHRlcm0gTG9jYXRpb24gbmFtZSBvciBrZXl3b3JkXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiA8U2VhcmNoUmVzdWx0PEZlYXR1cmU+W11cclxuICAgKi9cclxuICBzZWFyY2goXHJcbiAgICB0ZXJtOiBzdHJpbmcsXHJcbiAgICBvcHRpb25zPzogVGV4dFNlYXJjaE9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdPiB7XHJcbiAgICBjb25zdCBwYXJhbXMgPSB0aGlzLmNvbXB1dGVSZXF1ZXN0UGFyYW1zKHRlcm0sIG9wdGlvbnMgfHwge30pO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuZ2V0KHRoaXMuc2VhcmNoVXJsLCB7IHBhcmFtcyB9KVxyXG4gICAgICAucGlwZShtYXAoKHJlc3BvbnNlOiBJQ2hlcmNoZVJlc3BvbnNlKSA9PiB0aGlzLmV4dHJhY3RSZXN1bHRzKHJlc3BvbnNlKSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlUmVxdWVzdFBhcmFtcyhcclxuICAgIHRlcm06IHN0cmluZyxcclxuICAgIG9wdGlvbnM6IFRleHRTZWFyY2hPcHRpb25zXHJcbiAgKTogSHR0cFBhcmFtcyB7XHJcbiAgICByZXR1cm4gbmV3IEh0dHBQYXJhbXMoe1xyXG4gICAgICBmcm9tT2JqZWN0OiBPYmplY3QuYXNzaWduKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHE6IHRoaXMuY29tcHV0ZVRlcm0odGVybSksXHJcbiAgICAgICAgICBnZW9tZXRyeTogdHJ1ZSxcclxuICAgICAgICAgIHR5cGU6XHJcbiAgICAgICAgICAgICdhZHJlc3Nlcyxjb2Rlcy1wb3N0YXV4LG11bmljaXBhbGl0ZXMsbXJjLHJlZ2FkbWluLGxpZXV4LGVudHJlcHJpc2VzLGJvcm5lcydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRoaXMucGFyYW1zLFxyXG4gICAgICAgIHRoaXMuY29tcHV0ZU9wdGlvbnNQYXJhbSh0ZXJtLCBvcHRpb25zIHx8IHt9KS5wYXJhbXNcclxuICAgICAgKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RSZXN1bHRzKHJlc3BvbnNlOiBJQ2hlcmNoZVJlc3BvbnNlKTogU2VhcmNoUmVzdWx0PEZlYXR1cmU+W10ge1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlLmZlYXR1cmVzLm1hcCgoZGF0YTogSUNoZXJjaGVEYXRhKSA9PiB7XHJcbiAgICAgIHJldHVybiB0aGlzLmZvcm1hdHRlci5mb3JtYXRSZXN1bHQodGhpcy5kYXRhVG9SZXN1bHQoZGF0YSkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRhdGFUb1Jlc3VsdChkYXRhOiBJQ2hlcmNoZURhdGEpOiBTZWFyY2hSZXN1bHQ8RmVhdHVyZT4ge1xyXG4gICAgY29uc3QgcHJvcGVydGllcyA9IHRoaXMuY29tcHV0ZVByb3BlcnRpZXMoZGF0YSk7XHJcbiAgICBjb25zdCBpZCA9IFt0aGlzLmdldElkKCksIHByb3BlcnRpZXMudHlwZSwgcHJvcGVydGllcy5jb2RlXS5qb2luKCcuJyk7XHJcblxyXG4gICAgY29uc3Qgc3VidGl0bGVIdG1sID0gZGF0YS5oaWdobGlnaHQudGl0bGUyXHJcbiAgICAgID8gJyA8c21hbGw+ICcgKyBkYXRhLmhpZ2hsaWdodC50aXRsZTIgKyAnPC9zbWFsbD4nXHJcbiAgICAgIDogJyc7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc291cmNlOiB0aGlzLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgdHlwZTogRkVBVFVSRSxcclxuICAgICAgICBwcm9qZWN0aW9uOiAnRVBTRzo0MzI2JyxcclxuICAgICAgICBnZW9tZXRyeTogZGF0YS5nZW9tZXRyeSxcclxuICAgICAgICBleHRlbnQ6IGRhdGEuYmJveCxcclxuICAgICAgICBwcm9wZXJ0aWVzLFxyXG4gICAgICAgIG1ldGE6IHtcclxuICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgdGl0bGU6IGRhdGEucHJvcGVydGllcy5ub21cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG1ldGE6IHtcclxuICAgICAgICBkYXRhVHlwZTogRkVBVFVSRSxcclxuICAgICAgICBpZCxcclxuICAgICAgICB0aXRsZTogZGF0YS5wcm9wZXJ0aWVzLm5vbSxcclxuICAgICAgICB0aXRsZUh0bWw6IGRhdGEuaGlnaGxpZ2h0LnRpdGxlICsgc3VidGl0bGVIdG1sLFxyXG4gICAgICAgIGljb246ICdtYXAtbWFya2VyJ1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlUHJvcGVydGllcyhkYXRhOiBJQ2hlcmNoZURhdGEpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHtcclxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSBPYmplY3RVdGlscy5yZW1vdmVLZXlzKFxyXG4gICAgICBkYXRhLnByb3BlcnRpZXMsXHJcbiAgICAgIElDaGVyY2hlU2VhcmNoU291cmNlLnByb3BlcnRpZXNCbGFja2xpc3RcclxuICAgICk7XHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihwcm9wZXJ0aWVzLCB7IHR5cGU6IGRhdGEuaW5kZXggfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgaGFzaHRhZyBmcm9tIHF1ZXJ5XHJcbiAgICogQHBhcmFtIHRlcm0gUXVlcnkgd2l0aCBoYXNodGFnXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjb21wdXRlVGVybSh0ZXJtOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRlcm0ucmVwbGFjZSgvKCNbXlxcc10qKS9nLCAnJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgaGFzaHRhZyB0byBwYXJhbSBpZiB2YWxpZFxyXG4gICAqIEBwYXJhbSB0ZXJtIFF1ZXJ5IHdpdGggaGFzaHRhZ1xyXG4gICAqIEBwYXJhbSBvcHRpb25zIFRleHRTZWFyY2hPcHRpb25zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjb21wdXRlT3B0aW9uc1BhcmFtKFxyXG4gICAgdGVybTogc3RyaW5nLFxyXG4gICAgb3B0aW9uczogVGV4dFNlYXJjaE9wdGlvbnNcclxuICApOiBUZXh0U2VhcmNoT3B0aW9ucyB7XHJcbiAgICBjb25zdCB0YWdzID0gdGVybS5tYXRjaCgvKCNbXlxcc10rKS9nKTtcclxuICAgIGlmICh0YWdzKSB7XHJcbiAgICAgIGxldCB0eXBlVmFsdWUgPSAnJztcclxuICAgICAgbGV0IGhhc2h0YWdUb0FkZCA9IGZhbHNlO1xyXG4gICAgICB0YWdzLmZvckVhY2godmFsdWUgPT4ge1xyXG4gICAgICAgIGlmIChzdXBlci5oYXNodGFnVmFsaWQoc3VwZXIuZ2V0U2V0dGluZ3NWYWx1ZXMoJ3R5cGUnKSwgdmFsdWUsIHRydWUpKSB7XHJcbiAgICAgICAgICB0eXBlVmFsdWUgKz0gdmFsdWUuc3Vic3RyaW5nKDEpICsgJywnO1xyXG4gICAgICAgICAgaGFzaHRhZ1RvQWRkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoaGFzaHRhZ1RvQWRkKSB7XHJcbiAgICAgICAgb3B0aW9ucy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKG9wdGlvbnMucGFyYW1zIHx8IHt9LCB7XHJcbiAgICAgICAgICB0eXBlOiB0eXBlVmFsdWUuc2xpY2UoMCwgLTEpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvcHRpb25zO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIElDaGVyY2hlUmV2ZXJzZSBzZWFyY2ggc291cmNlXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBJQ2hlcmNoZVJldmVyc2VTZWFyY2hTb3VyY2UgZXh0ZW5kcyBTZWFyY2hTb3VyY2VcclxuICBpbXBsZW1lbnRzIFJldmVyc2VTZWFyY2gge1xyXG4gIHN0YXRpYyBpZCA9ICdpY2hlcmNoZXJldmVyc2UnO1xyXG4gIHN0YXRpYyB0eXBlID0gRkVBVFVSRTtcclxuICBzdGF0aWMgcHJvcGVydGllc0JsYWNrbGlzdDogc3RyaW5nW10gPSBbJ2RvY190eXBlJ107XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgQEluamVjdCgnb3B0aW9ucycpIG9wdGlvbnM6IFNlYXJjaFNvdXJjZU9wdGlvbnNcclxuICApIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0SWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBJQ2hlcmNoZVJldmVyc2VTZWFyY2hTb3VyY2UuaWQ7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0RGVmYXVsdE9wdGlvbnMoKTogU2VhcmNoU291cmNlT3B0aW9ucyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0aXRsZTogJ1RlcnJpdG9pcmUgKEfDqW9jb2RhZ2UgaW52ZXJzw6kpJyxcclxuICAgICAgc2VhcmNoVXJsOiAnaHR0cHM6Ly9nZW9lZ2wubXNwLmdvdXYucWMuY2EvYXBpcy90ZXJyaXRvaXJlcy9sb2NhdGUnLFxyXG5cclxuICAgICAgc2V0dGluZ3M6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAnY2hlY2tib3gnLFxyXG4gICAgICAgICAgdGl0bGU6ICdyZXN1bHRzIHR5cGUnLFxyXG4gICAgICAgICAgbmFtZTogJ3R5cGUnLFxyXG4gICAgICAgICAgdmFsdWVzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ0FkcmVzc2UnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAnYWRyZXNzZXMnLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnUm91dGUnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAncm91dGVzJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdBcnJvbmRpc3NlbWVudCcsXHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdhcnJvbmRpc3NlbWVudHMnLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ011bmljaXBhbGl0w6knLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAnbXVuaWNpcGFsaXRlcycsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdtcmMnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAnbXJjJyxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ1LDqWdpb24gYWRtaW5pc3RyYXRpdmUnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAncmVnYWRtaW4nLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBhIGxvY2F0aW9uIGJ5IGNvb3JkaW5hdGVzXHJcbiAgICogQHBhcmFtIGxvbkxhdCBMb2NhdGlvbiBjb29yZGluYXRlc1xyXG4gICAqIEBwYXJhbSBkaXN0YW5jZSBTZWFyY2ggcmFpZHVzIGFyb3VuZCBsb25MYXRcclxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIDxTZWFyY2hSZXN1bHQ8RmVhdHVyZT5bXVxyXG4gICAqL1xyXG4gIHJldmVyc2VTZWFyY2goXHJcbiAgICBsb25MYXQ6IFtudW1iZXIsIG51bWJlcl0sXHJcbiAgICBvcHRpb25zPzogUmV2ZXJzZVNlYXJjaE9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdPiB7XHJcbiAgICBjb25zdCBwYXJhbXMgPSB0aGlzLmNvbXB1dGVSZXF1ZXN0UGFyYW1zKGxvbkxhdCwgb3B0aW9ucyB8fCB7fSk7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLnNlYXJjaFVybCwgeyBwYXJhbXMgfSkucGlwZShcclxuICAgICAgbWFwKChyZXNwb25zZTogSUNoZXJjaGVSZXZlcnNlUmVzcG9uc2UpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5leHRyYWN0UmVzdWx0cyhyZXNwb25zZSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlUmVxdWVzdFBhcmFtcyhcclxuICAgIGxvbkxhdDogW251bWJlciwgbnVtYmVyXSxcclxuICAgIG9wdGlvbnM/OiBSZXZlcnNlU2VhcmNoT3B0aW9uc1xyXG4gICk6IEh0dHBQYXJhbXMge1xyXG4gICAgY29uc3QgZGlzdGFuY2UgPSBvcHRpb25zLmRpc3RhbmNlO1xyXG4gICAgcmV0dXJuIG5ldyBIdHRwUGFyYW1zKHtcclxuICAgICAgZnJvbU9iamVjdDogT2JqZWN0LmFzc2lnbihcclxuICAgICAgICB7XHJcbiAgICAgICAgICBsb2M6IGxvbkxhdC5qb2luKCcsJyksXHJcbiAgICAgICAgICBidWZmZXI6IGRpc3RhbmNlID8gU3RyaW5nKGRpc3RhbmNlKSA6ICcxMDAnLFxyXG4gICAgICAgICAgZ2VvbWV0cnk6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRoaXMucGFyYW1zLFxyXG4gICAgICAgIG9wdGlvbnMucGFyYW1zIHx8IHt9XHJcbiAgICAgIClcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0UmVzdWx0cyhcclxuICAgIHJlc3BvbnNlOiBJQ2hlcmNoZVJldmVyc2VSZXNwb25zZVxyXG4gICk6IFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdIHtcclxuICAgIHJldHVybiByZXNwb25zZS5mZWF0dXJlcy5tYXAoKGRhdGE6IElDaGVyY2hlUmV2ZXJzZURhdGEpID0+IHtcclxuICAgICAgcmV0dXJuIHRoaXMuZGF0YVRvUmVzdWx0KGRhdGEpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRhdGFUb1Jlc3VsdChkYXRhOiBJQ2hlcmNoZVJldmVyc2VEYXRhKTogU2VhcmNoUmVzdWx0PEZlYXR1cmU+IHtcclxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSB0aGlzLmNvbXB1dGVQcm9wZXJ0aWVzKGRhdGEpO1xyXG4gICAgY29uc3QgZXh0ZW50ID0gdGhpcy5jb21wdXRlRXh0ZW50KGRhdGEpO1xyXG4gICAgY29uc3QgaWQgPSBbdGhpcy5nZXRJZCgpLCBwcm9wZXJ0aWVzLnR5cGUsIHByb3BlcnRpZXMuY29kZV0uam9pbignLicpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNvdXJjZTogdGhpcyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHR5cGU6IEZFQVRVUkUsXHJcbiAgICAgICAgcHJvamVjdGlvbjogJ0VQU0c6NDMyNicsXHJcbiAgICAgICAgZ2VvbWV0cnk6IGRhdGEuZ2VvbWV0cnksXHJcbiAgICAgICAgZXh0ZW50LFxyXG4gICAgICAgIHByb3BlcnRpZXMsXHJcbiAgICAgICAgbWV0YToge1xyXG4gICAgICAgICAgaWQsXHJcbiAgICAgICAgICB0aXRsZTogZGF0YS5wcm9wZXJ0aWVzLm5vbVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgbWV0YToge1xyXG4gICAgICAgIGRhdGFUeXBlOiBGRUFUVVJFLFxyXG4gICAgICAgIGlkLFxyXG4gICAgICAgIHRpdGxlOiBkYXRhLnByb3BlcnRpZXMubm9tLFxyXG4gICAgICAgIGljb246ICdtYXAtbWFya2VyJ1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlUHJvcGVydGllcyhkYXRhOiBJQ2hlcmNoZVJldmVyc2VEYXRhKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XHJcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gT2JqZWN0VXRpbHMucmVtb3ZlS2V5cyhcclxuICAgICAgZGF0YS5wcm9wZXJ0aWVzLFxyXG4gICAgICBJQ2hlcmNoZVJldmVyc2VTZWFyY2hTb3VyY2UucHJvcGVydGllc0JsYWNrbGlzdFxyXG4gICAgKTtcclxuICAgIHJldHVybiBwcm9wZXJ0aWVzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlRXh0ZW50KFxyXG4gICAgZGF0YTogSUNoZXJjaGVSZXZlcnNlRGF0YVxyXG4gICk6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdIHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiBkYXRhLmJib3hcclxuICAgICAgPyBbZGF0YS5iYm94WzBdLCBkYXRhLmJib3hbMl0sIGRhdGEuYmJveFsxXSwgZGF0YS5iYm94WzNdXVxyXG4gICAgICA6IHVuZGVmaW5lZDtcclxuICB9XHJcbn1cclxuIl19