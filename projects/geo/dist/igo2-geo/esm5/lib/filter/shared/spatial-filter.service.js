/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService, LanguageService } from '@igo2/core';
import { map } from 'rxjs/operators';
import { SpatialFilterItemType } from './spatial-filter.enum';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@igo2/core";
var SpatialFilterService = /** @class */ (function () {
    function SpatialFilterService(http, languageService, configService) {
        this.http = http;
        this.languageService = languageService;
        this.configService = configService;
        this.baseUrl = 'https://geoegl.msp.gouv.qc.ca/apis/terrapi/';
        /*
           * Type association with URL
           */
        this.urlFilterList = {
            AdmRegion: 'regadmin',
            Arrond: 'arrondissements',
            CircFed: 'circ-fed',
            CircProv: 'circ-prov',
            DirReg: 'dir-reg',
            MRC: 'mrc',
            Mun: 'municipalites',
            RegTour: 'tourisme',
            bornes: 'bornes-sumi',
            hydro: 'hydro',
            routes: 'routes'
        };
        this.baseUrl =
            this.configService.getConfig('spatialFilter.url') || this.baseUrl;
    }
    /**
     * @param {?} object
     * @param {?} value
     * @return {?}
     */
    SpatialFilterService.prototype.getKeyByValue = /**
     * @param {?} object
     * @param {?} value
     * @return {?}
     */
    function (object, value) {
        return Object.keys(object).find((/**
         * @param {?} key
         * @return {?}
         */
        function (key) { return object[key] === value; }));
    };
    /*
     * Loading data for spatial filter list component (NO GEOMETRY)
     */
    /*
       * Loading data for spatial filter list component (NO GEOMETRY)
       */
    /**
     * @param {?} type
     * @return {?}
     */
    SpatialFilterService.prototype.loadFilterList = /*
       * Loading data for spatial filter list component (NO GEOMETRY)
       */
    /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        /** @type {?} */
        var urlPath = (/** @type {?} */ (type));
        if (urlPath) {
            return this.http
                .get(this.baseUrl + this.urlFilterList[urlPath])
                .pipe(map((/**
             * @param {?} featureCollection
             * @return {?}
             */
            function (featureCollection) {
                return featureCollection.features.map((/**
                 * @param {?} f
                 * @return {?}
                 */
                function (f) {
                    f.meta = {
                        id: f.properties.code
                    };
                    return f;
                }));
            })));
        }
    };
    /*
     * Loading item list (STRING)
     */
    /*
       * Loading item list (STRING)
       */
    /**
     * @return {?}
     */
    SpatialFilterService.prototype.loadThematicsList = /*
       * Loading item list (STRING)
       */
    /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var url = 'types';
        /** @type {?} */
        var items = [];
        return this.http.get(this.baseUrl + url).pipe(map((/**
         * @param {?} types
         * @return {?}
         */
        function (types) {
            types.forEach((/**
             * @param {?} type
             * @return {?}
             */
            function (type) {
                if (type.startsWith('lieux')) {
                    /** @type {?} */
                    var item = {
                        name: undefined,
                        source: type
                    };
                    /** @type {?} */
                    var substr = type.substring(6, type.length);
                    /** @type {?} */
                    var name_1 = substr;
                    if (substr.includes('.')) {
                        /** @type {?} */
                        var index = substr.indexOf('.');
                        name_1 = substr.substring(index + 1, substr.length);
                        substr = substr.substring(0, index);
                    }
                    try {
                        item.name = _this.languageService.translate.instant('igo.geo.terrapi.' + name_1);
                    }
                    catch (e) {
                        item.name = name_1.substring(0, 1).toUpperCase() + name_1.substring(1, name_1.length - 1);
                    }
                    try {
                        item.group = _this.languageService.translate.instant('igo.geo.spatialFilter.group.' + substr);
                    }
                    catch (e) {
                        item.group = substr.substring(0, 1).toUpperCase() + substr.substring(1, name_1.length - 1);
                    }
                    items.push(item);
                }
                else {
                    if (_this.getKeyByValue(_this.urlFilterList, type)) {
                        /** @type {?} */
                        var item = {
                            name: undefined,
                            source: type
                        };
                        /** @type {?} */
                        var name_2 = _this.getKeyByValue(_this.urlFilterList, type);
                        try {
                            item.name = _this.languageService.translate.instant('igo.geo.terrapi.' + name_2);
                        }
                        catch (e) {
                            item.name = name_2.substring(0, 1).toUpperCase() + name_2.substring(1, name_2.length - 1);
                        }
                        item.source = type;
                        items.push(item);
                    }
                }
            }));
            return items;
        })));
    };
    /*
     * Loading data for spatial filter item component (Address or Thematics) depends on predefined zone or draw zone (feature)
     */
    /*
       * Loading data for spatial filter item component (Address or Thematics) depends on predefined zone or draw zone (feature)
       */
    /**
     * @param {?} feature
     * @param {?} itemType
     * @param {?=} type
     * @param {?=} thematic
     * @param {?=} buffer
     * @return {?}
     */
    SpatialFilterService.prototype.loadFilterItem = /*
       * Loading data for spatial filter item component (Address or Thematics) depends on predefined zone or draw zone (feature)
       */
    /**
     * @param {?} feature
     * @param {?} itemType
     * @param {?=} type
     * @param {?=} thematic
     * @param {?=} buffer
     * @return {?}
     */
    function (feature, itemType, type, thematic, buffer) {
        var _this = this;
        if (type) {
            // Predefined type
            /** @type {?} */
            var urlType = (/** @type {?} */ (type));
            /** @type {?} */
            var url = this.baseUrl + this.urlFilterList[urlType];
            /** @type {?} */
            var urlItem = '';
            if (itemType === SpatialFilterItemType.Address) {
                urlItem = 'adresses';
                return this.http
                    .get(url + '/' + feature.properties.code + '/' + urlItem, {
                    params: {
                        geometry: 'true',
                        icon: 'true'
                    }
                })
                    .pipe(map((/**
                 * @param {?} featureCollection
                 * @return {?}
                 */
                function (featureCollection) {
                    return featureCollection.features.map((/**
                     * @param {?} f
                     * @return {?}
                     */
                    function (f) {
                        f.meta = {
                            id: f.properties.code,
                            title: _this.languageService.translate.instant('igo.geo.spatialFilter.Address'),
                            icon: ((/** @type {?} */ (f))).icon
                        };
                        return f;
                    }));
                })));
            }
            else {
                // If thematics search
                urlItem = thematic.source;
                return this.http
                    .get(url + '/' + feature.properties.code + '/' + urlItem, {
                    params: {
                        geometry: 'true',
                        icon: 'true'
                    }
                })
                    .pipe(map((/**
                 * @param {?} featureCollection
                 * @return {?}
                 */
                function (featureCollection) {
                    return featureCollection.features.map((/**
                     * @param {?} f
                     * @return {?}
                     */
                    function (f) {
                        f.meta = {
                            id: f.properties.code,
                            title: thematic.name,
                            icon: ((/** @type {?} */ (f))).icon
                        };
                        return f;
                    }));
                })));
            }
        }
        else {
            // Draw type
            /** @type {?} */
            var url = this.baseUrl + 'locate';
            if (itemType === SpatialFilterItemType.Address) {
                /** @type {?} */
                var urlItem = '?type=adresses';
                return this.http
                    .post(url + urlItem, {
                    geometry: 'true',
                    icon: 'true',
                    buffer: buffer,
                    loc: JSON.stringify(feature)
                })
                    .pipe(map((/**
                 * @param {?} featureCollection
                 * @return {?}
                 */
                function (featureCollection) {
                    return featureCollection.features.map((/**
                     * @param {?} f
                     * @return {?}
                     */
                    function (f) {
                        f.meta = {
                            id: f.properties.code,
                            title: _this.languageService.translate.instant('igo.geo.spatialFilter.Address'),
                            icon: ((/** @type {?} */ (f))).icon
                        };
                        return f;
                    }));
                })));
            }
            else {
                // If thematics search
                /** @type {?} */
                var urlItem = '?type=' + thematic.source;
                return this.http
                    .post(url + urlItem, {
                    geometry: 'true',
                    icon: 'true',
                    buffer: buffer,
                    loc: JSON.stringify(feature)
                })
                    .pipe(map((/**
                 * @param {?} featureCollection
                 * @return {?}
                 */
                function (featureCollection) {
                    return featureCollection.features.map((/**
                     * @param {?} f
                     * @return {?}
                     */
                    function (f) {
                        f.meta = {
                            id: f.properties.code,
                            title: thematic.name,
                            icon: ((/** @type {?} */ (f))).icon
                        };
                        return f;
                    }));
                })));
            }
        }
    };
    /*
     * Get one territory by id (WITH GEOMETRY)
     */
    /*
       * Get one territory by id (WITH GEOMETRY)
       */
    /**
     * @param {?} feature
     * @param {?} type
     * @return {?}
     */
    SpatialFilterService.prototype.loadItemById = /*
       * Get one territory by id (WITH GEOMETRY)
       */
    /**
     * @param {?} feature
     * @param {?} type
     * @return {?}
     */
    function (feature, type) {
        /** @type {?} */
        var featureType = this.urlFilterList[type];
        /** @type {?} */
        var featureCode = '/' + feature.properties.code;
        if (featureType && featureCode) {
            return this.http
                .get(this.baseUrl + featureType + featureCode, {
                params: {
                    geometry: 'true'
                }
            })
                .pipe(map((/**
             * @param {?} f
             * @return {?}
             */
            function (f) {
                f.meta = {
                    id: f.properties.code,
                    alias: f.properties.nom,
                    title: f.properties.nom
                };
                return f;
            })));
        }
    };
    SpatialFilterService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    SpatialFilterService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: LanguageService },
        { type: ConfigService }
    ]; };
    /** @nocollapse */ SpatialFilterService.ngInjectableDef = i0.defineInjectable({ factory: function SpatialFilterService_Factory() { return new SpatialFilterService(i0.inject(i1.HttpClient), i0.inject(i2.LanguageService), i0.inject(i2.ConfigService)); }, token: SpatialFilterService, providedIn: "root" });
    return SpatialFilterService;
}());
export { SpatialFilterService };
if (false) {
    /** @type {?} */
    SpatialFilterService.prototype.baseUrl;
    /** @type {?} */
    SpatialFilterService.prototype.urlFilterList;
    /**
     * @type {?}
     * @private
     */
    SpatialFilterService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    SpatialFilterService.prototype.languageService;
    /**
     * @type {?}
     * @private
     */
    SpatialFilterService.prototype.configService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhdGlhbC1maWx0ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXIvc2hhcmVkL3NwYXRpYWwtZmlsdGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzVELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUdyQyxPQUFPLEVBRUwscUJBQXFCLEVBQ3RCLE1BQU0sdUJBQXVCLENBQUM7Ozs7QUFHL0I7SUF1QkUsOEJBQ1UsSUFBZ0IsRUFDaEIsZUFBZ0MsRUFDaEMsYUFBNEI7UUFGNUIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUF0Qi9CLFlBQU8sR0FBVyw2Q0FBNkMsQ0FBQzs7OztRQUtoRSxrQkFBYSxHQUFHO1lBQ3JCLFNBQVMsRUFBRSxVQUFVO1lBQ3JCLE1BQU0sRUFBRSxpQkFBaUI7WUFDekIsT0FBTyxFQUFFLFVBQVU7WUFDbkIsUUFBUSxFQUFFLFdBQVc7WUFDckIsTUFBTSxFQUFFLFNBQVM7WUFDakIsR0FBRyxFQUFFLEtBQUs7WUFDVixHQUFHLEVBQUUsZUFBZTtZQUNwQixPQUFPLEVBQUUsVUFBVTtZQUNuQixNQUFNLEVBQUUsYUFBYTtZQUNyQixLQUFLLEVBQUUsT0FBTztZQUNkLE1BQU0sRUFBRSxRQUFRO1NBQ2pCLENBQUM7UUFPQSxJQUFJLENBQUMsT0FBTztZQUNWLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FB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Q0FBWTs7Ozs7Ozs7SUFBWixVQUNFLE9BQWdCLEVBQ2hCLElBQTRCOztZQUV0QixXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7O1lBQ3RDLFdBQVcsR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJO1FBQ2pELElBQUksV0FBVyxJQUFJLFdBQVcsRUFBRTtZQUM5QixPQUFPLElBQUksQ0FBQyxJQUFJO2lCQUNiLEdBQUcsQ0FBVSxJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsR0FBRyxXQUFXLEVBQUU7Z0JBQ3RELE1BQU0sRUFBRTtvQkFDTixRQUFRLEVBQUUsTUFBTTtpQkFDakI7YUFDRixDQUFDO2lCQUNELElBQUksQ0FDSCxHQUFHOzs7O1lBQUMsVUFBQSxDQUFDO2dCQUNILENBQUMsQ0FBQyxJQUFJLEdBQUc7b0JBQ1AsRUFBRSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSTtvQkFDckIsS0FBSyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRztvQkFDdkIsS0FBSyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRztpQkFDeEIsQ0FBQztnQkFDRixPQUFPLENBQUMsQ0FBQztZQUNYLENBQUMsRUFBQyxDQUNILENBQUM7U0FDTDtJQUNILENBQUM7O2dCQTVRRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQWJRLFVBQVU7Z0JBQ0ssZUFBZTtnQkFBOUIsYUFBYTs7OytCQUh0QjtDQTBSQyxBQTdRRCxJQTZRQztTQTFRWSxvQkFBb0I7OztJQUMvQix1Q0FBdUU7O0lBS3ZFLDZDQVlFOzs7OztJQUdBLG9DQUF3Qjs7Ozs7SUFDeEIsK0NBQXdDOzs7OztJQUN4Qyw2Q0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlLCBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEZlYXR1cmUgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZCc7XHJcbmltcG9ydCB7XHJcbiAgU3BhdGlhbEZpbHRlclF1ZXJ5VHlwZSxcclxuICBTcGF0aWFsRmlsdGVySXRlbVR5cGVcclxufSBmcm9tICcuL3NwYXRpYWwtZmlsdGVyLmVudW0nO1xyXG5pbXBvcnQgeyBTcGF0aWFsRmlsdGVyVGhlbWF0aWMgfSBmcm9tICcuL3NwYXRpYWwtZmlsdGVyLmludGVyZmFjZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTcGF0aWFsRmlsdGVyU2VydmljZSB7XHJcbiAgcHVibGljIGJhc2VVcmw6IHN0cmluZyA9ICdodHRwczovL2dlb2VnbC5tc3AuZ291di5xYy5jYS9hcGlzL3RlcnJhcGkvJztcclxuXHJcbiAgLypcclxuICAgKiBUeXBlIGFzc29jaWF0aW9uIHdpdGggVVJMXHJcbiAgICovXHJcbiAgcHVibGljIHVybEZpbHRlckxpc3QgPSB7XHJcbiAgICBBZG1SZWdpb246ICdyZWdhZG1pbicsXHJcbiAgICBBcnJvbmQ6ICdhcnJvbmRpc3NlbWVudHMnLFxyXG4gICAgQ2lyY0ZlZDogJ2NpcmMtZmVkJyxcclxuICAgIENpcmNQcm92OiAnY2lyYy1wcm92JyxcclxuICAgIERpclJlZzogJ2Rpci1yZWcnLFxyXG4gICAgTVJDOiAnbXJjJyxcclxuICAgIE11bjogJ211bmljaXBhbGl0ZXMnLFxyXG4gICAgUmVnVG91cjogJ3RvdXJpc21lJyxcclxuICAgIGJvcm5lczogJ2Jvcm5lcy1zdW1pJyxcclxuICAgIGh5ZHJvOiAnaHlkcm8nLFxyXG4gICAgcm91dGVzOiAncm91dGVzJ1xyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5iYXNlVXJsID1cclxuICAgICAgdGhpcy5jb25maWdTZXJ2aWNlLmdldENvbmZpZygnc3BhdGlhbEZpbHRlci51cmwnKSB8fCB0aGlzLmJhc2VVcmw7XHJcbiAgfVxyXG5cclxuICBnZXRLZXlCeVZhbHVlKG9iamVjdCwgdmFsdWUpIHtcclxuICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmplY3QpLmZpbmQoa2V5ID0+IG9iamVjdFtrZXldID09PSB2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIExvYWRpbmcgZGF0YSBmb3Igc3BhdGlhbCBmaWx0ZXIgbGlzdCBjb21wb25lbnQgKE5PIEdFT01FVFJZKVxyXG4gICAqL1xyXG4gIGxvYWRGaWx0ZXJMaXN0KHR5cGU6IFNwYXRpYWxGaWx0ZXJRdWVyeVR5cGUpOiBPYnNlcnZhYmxlPEZlYXR1cmVbXT4ge1xyXG4gICAgY29uc3QgdXJsUGF0aCA9IHR5cGUgYXMgc3RyaW5nO1xyXG4gICAgaWYgKHVybFBhdGgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAgIC5nZXQ8eyBmZWF0dXJlczogRmVhdHVyZVtdIH0+KFxyXG4gICAgICAgICAgdGhpcy5iYXNlVXJsICsgdGhpcy51cmxGaWx0ZXJMaXN0W3VybFBhdGhdXHJcbiAgICAgICAgKVxyXG4gICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgbWFwKGZlYXR1cmVDb2xsZWN0aW9uID0+XHJcbiAgICAgICAgICAgIGZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzLm1hcChmID0+IHtcclxuICAgICAgICAgICAgICBmLm1ldGEgPSB7XHJcbiAgICAgICAgICAgICAgICBpZDogZi5wcm9wZXJ0aWVzLmNvZGVcclxuICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgIHJldHVybiBmO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIExvYWRpbmcgaXRlbSBsaXN0IChTVFJJTkcpXHJcbiAgICovXHJcbiAgbG9hZFRoZW1hdGljc0xpc3QoKSB7XHJcbiAgICBjb25zdCB1cmwgPSAndHlwZXMnO1xyXG4gICAgY29uc3QgaXRlbXM6IFNwYXRpYWxGaWx0ZXJUaGVtYXRpY1tdID0gW107XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmJhc2VVcmwgKyB1cmwpLnBpcGUoXHJcbiAgICAgIG1hcCgodHlwZXM6IHN0cmluZ1tdKSA9PiB7XHJcbiAgICAgICAgdHlwZXMuZm9yRWFjaCh0eXBlID0+IHtcclxuICAgICAgICAgIGlmICh0eXBlLnN0YXJ0c1dpdGgoJ2xpZXV4JykpIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbTogU3BhdGlhbEZpbHRlclRoZW1hdGljID0ge1xyXG4gICAgICAgICAgICAgIG5hbWU6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICBzb3VyY2U6IHR5cGVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgbGV0IHN1YnN0ciA9IHR5cGUuc3Vic3RyaW5nKDYsIHR5cGUubGVuZ3RoKTtcclxuICAgICAgICAgICAgbGV0IG5hbWUgPSBzdWJzdHI7XHJcbiAgICAgICAgICAgIGlmIChzdWJzdHIuaW5jbHVkZXMoJy4nKSkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gc3Vic3RyLmluZGV4T2YoJy4nKTtcclxuICAgICAgICAgICAgICBuYW1lID0gc3Vic3RyLnN1YnN0cmluZyhpbmRleCArIDEsIHN1YnN0ci5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgIHN1YnN0ciA9IHN1YnN0ci5zdWJzdHJpbmcoMCwgaW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgaXRlbS5uYW1lID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAgICAgICAnaWdvLmdlby50ZXJyYXBpLicgKyBuYW1lXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgIGl0ZW0ubmFtZSA9IG5hbWUuc3Vic3RyaW5nKDAsIDEpLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnN1YnN0cmluZygxLCBuYW1lLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgIGl0ZW0uZ3JvdXAgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICAgICAgICdpZ28uZ2VvLnNwYXRpYWxGaWx0ZXIuZ3JvdXAuJyArIHN1YnN0clxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICBpdGVtLmdyb3VwID0gc3Vic3RyLnN1YnN0cmluZygwLCAxKS50b1VwcGVyQ2FzZSgpICsgc3Vic3RyLnN1YnN0cmluZygxLCBuYW1lLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpdGVtcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0S2V5QnlWYWx1ZSh0aGlzLnVybEZpbHRlckxpc3QsIHR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgaXRlbTogU3BhdGlhbEZpbHRlclRoZW1hdGljID0ge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgc291cmNlOiB0eXBlXHJcbiAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXRLZXlCeVZhbHVlKHRoaXMudXJsRmlsdGVyTGlzdCwgdHlwZSk7XHJcbiAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGl0ZW0ubmFtZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgICAgICAgICAnaWdvLmdlby50ZXJyYXBpLicgKyBuYW1lXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0ubmFtZSA9IG5hbWUuc3Vic3RyaW5nKDAsIDEpLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnN1YnN0cmluZygxLCBuYW1lLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpdGVtLnNvdXJjZSA9IHR5cGU7XHJcblxyXG4gICAgICAgICAgICAgIGl0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gaXRlbXM7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBMb2FkaW5nIGRhdGEgZm9yIHNwYXRpYWwgZmlsdGVyIGl0ZW0gY29tcG9uZW50IChBZGRyZXNzIG9yIFRoZW1hdGljcykgZGVwZW5kcyBvbiBwcmVkZWZpbmVkIHpvbmUgb3IgZHJhdyB6b25lIChmZWF0dXJlKVxyXG4gICAqL1xyXG4gIGxvYWRGaWx0ZXJJdGVtKFxyXG4gICAgZmVhdHVyZSxcclxuICAgIGl0ZW1UeXBlOiBTcGF0aWFsRmlsdGVySXRlbVR5cGUsXHJcbiAgICB0eXBlPzogU3BhdGlhbEZpbHRlclF1ZXJ5VHlwZSxcclxuICAgIHRoZW1hdGljPzogU3BhdGlhbEZpbHRlclRoZW1hdGljLFxyXG4gICAgYnVmZmVyPzogbnVtYmVyXHJcbiAgKSB7XHJcbiAgICBpZiAodHlwZSkge1xyXG4gICAgICAvLyBQcmVkZWZpbmVkIHR5cGVcclxuICAgICAgY29uc3QgdXJsVHlwZSA9IHR5cGUgYXMgc3RyaW5nO1xyXG4gICAgICBjb25zdCB1cmwgPSB0aGlzLmJhc2VVcmwgKyB0aGlzLnVybEZpbHRlckxpc3RbdXJsVHlwZV07XHJcbiAgICAgIGxldCB1cmxJdGVtID0gJyc7XHJcbiAgICAgIGlmIChpdGVtVHlwZSA9PT0gU3BhdGlhbEZpbHRlckl0ZW1UeXBlLkFkZHJlc3MpIHtcclxuICAgICAgICB1cmxJdGVtID0gJ2FkcmVzc2VzJztcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgICAgICAuZ2V0PHsgZmVhdHVyZXM6IEZlYXR1cmVbXSB9PihcclxuICAgICAgICAgICAgdXJsICsgJy8nICsgZmVhdHVyZS5wcm9wZXJ0aWVzLmNvZGUgKyAnLycgKyB1cmxJdGVtLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBnZW9tZXRyeTogJ3RydWUnLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogJ3RydWUnXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICApXHJcbiAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgbWFwKGZlYXR1cmVDb2xsZWN0aW9uID0+XHJcbiAgICAgICAgICAgICAgZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXMubWFwKGYgPT4ge1xyXG4gICAgICAgICAgICAgICAgZi5tZXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICBpZDogZi5wcm9wZXJ0aWVzLmNvZGUsXHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICAgICAgICAgICAnaWdvLmdlby5zcGF0aWFsRmlsdGVyLkFkZHJlc3MnXHJcbiAgICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICAgIGljb246IChmIGFzIGFueSkuaWNvblxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gSWYgdGhlbWF0aWNzIHNlYXJjaFxyXG4gICAgICAgIHVybEl0ZW0gPSB0aGVtYXRpYy5zb3VyY2U7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAgICAgLmdldDx7IGZlYXR1cmVzOiBGZWF0dXJlW10gfT4oXHJcbiAgICAgICAgICAgIHVybCArICcvJyArIGZlYXR1cmUucHJvcGVydGllcy5jb2RlICsgJy8nICsgdXJsSXRlbSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgZ2VvbWV0cnk6ICd0cnVlJyxcclxuICAgICAgICAgICAgICAgIGljb246ICd0cnVlJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgIG1hcChmZWF0dXJlQ29sbGVjdGlvbiA9PlxyXG4gICAgICAgICAgICAgIGZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzLm1hcChmID0+IHtcclxuICAgICAgICAgICAgICAgIGYubWV0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgaWQ6IGYucHJvcGVydGllcy5jb2RlLFxyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogdGhlbWF0aWMubmFtZSxcclxuICAgICAgICAgICAgICAgICAgaWNvbjogKGYgYXMgYW55KS5pY29uXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGY7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gRHJhdyB0eXBlXHJcbiAgICAgIGNvbnN0IHVybCA9IHRoaXMuYmFzZVVybCArICdsb2NhdGUnO1xyXG4gICAgICBpZiAoaXRlbVR5cGUgPT09IFNwYXRpYWxGaWx0ZXJJdGVtVHlwZS5BZGRyZXNzKSB7XHJcbiAgICAgICAgY29uc3QgdXJsSXRlbSA9ICc/dHlwZT1hZHJlc3Nlcyc7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAgICAgLnBvc3Q8eyBmZWF0dXJlczogRmVhdHVyZVtdIH0+KHVybCArIHVybEl0ZW0sIHtcclxuICAgICAgICAgICAgZ2VvbWV0cnk6ICd0cnVlJyxcclxuICAgICAgICAgICAgaWNvbjogJ3RydWUnLFxyXG4gICAgICAgICAgICBidWZmZXIsXHJcbiAgICAgICAgICAgIGxvYzogSlNPTi5zdHJpbmdpZnkoZmVhdHVyZSlcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgbWFwKGZlYXR1cmVDb2xsZWN0aW9uID0+XHJcbiAgICAgICAgICAgICAgZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXMubWFwKGYgPT4ge1xyXG4gICAgICAgICAgICAgICAgZi5tZXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICBpZDogZi5wcm9wZXJ0aWVzLmNvZGUsXHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICAgICAgICAgICAnaWdvLmdlby5zcGF0aWFsRmlsdGVyLkFkZHJlc3MnXHJcbiAgICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICAgIGljb246IChmIGFzIGFueSkuaWNvblxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gSWYgdGhlbWF0aWNzIHNlYXJjaFxyXG4gICAgICAgIGNvbnN0IHVybEl0ZW0gPSAnP3R5cGU9JyArIHRoZW1hdGljLnNvdXJjZTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgICAgICAucG9zdDx7IGZlYXR1cmVzOiBGZWF0dXJlW10gfT4odXJsICsgdXJsSXRlbSwge1xyXG4gICAgICAgICAgICBnZW9tZXRyeTogJ3RydWUnLFxyXG4gICAgICAgICAgICBpY29uOiAndHJ1ZScsXHJcbiAgICAgICAgICAgIGJ1ZmZlcixcclxuICAgICAgICAgICAgbG9jOiBKU09OLnN0cmluZ2lmeShmZWF0dXJlKVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICBtYXAoZmVhdHVyZUNvbGxlY3Rpb24gPT5cclxuICAgICAgICAgICAgICBmZWF0dXJlQ29sbGVjdGlvbi5mZWF0dXJlcy5tYXAoZiA9PiB7XHJcbiAgICAgICAgICAgICAgICBmLm1ldGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgIGlkOiBmLnByb3BlcnRpZXMuY29kZSxcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoZW1hdGljLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgIGljb246IChmIGFzIGFueSkuaWNvblxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogR2V0IG9uZSB0ZXJyaXRvcnkgYnkgaWQgKFdJVEggR0VPTUVUUlkpXHJcbiAgICovXHJcbiAgbG9hZEl0ZW1CeUlkKFxyXG4gICAgZmVhdHVyZTogRmVhdHVyZSxcclxuICAgIHR5cGU6IFNwYXRpYWxGaWx0ZXJRdWVyeVR5cGVcclxuICApOiBPYnNlcnZhYmxlPEZlYXR1cmU+IHtcclxuICAgIGNvbnN0IGZlYXR1cmVUeXBlID0gdGhpcy51cmxGaWx0ZXJMaXN0W3R5cGVdO1xyXG4gICAgY29uc3QgZmVhdHVyZUNvZGUgPSAnLycgKyBmZWF0dXJlLnByb3BlcnRpZXMuY29kZTtcclxuICAgIGlmIChmZWF0dXJlVHlwZSAmJiBmZWF0dXJlQ29kZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgICAgLmdldDxGZWF0dXJlPih0aGlzLmJhc2VVcmwgKyBmZWF0dXJlVHlwZSArIGZlYXR1cmVDb2RlLCB7XHJcbiAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgZ2VvbWV0cnk6ICd0cnVlJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICBtYXAoZiA9PiB7XHJcbiAgICAgICAgICAgIGYubWV0YSA9IHtcclxuICAgICAgICAgICAgICBpZDogZi5wcm9wZXJ0aWVzLmNvZGUsXHJcbiAgICAgICAgICAgICAgYWxpYXM6IGYucHJvcGVydGllcy5ub20sXHJcbiAgICAgICAgICAgICAgdGl0bGU6IGYucHJvcGVydGllcy5ub21cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmV0dXJuIGY7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==