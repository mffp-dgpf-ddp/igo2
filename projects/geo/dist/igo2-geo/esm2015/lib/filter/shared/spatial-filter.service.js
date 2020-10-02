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
export class SpatialFilterService {
    /**
     * @param {?} http
     * @param {?} languageService
     * @param {?} configService
     */
    constructor(http, languageService, configService) {
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
    getKeyByValue(object, value) {
        return Object.keys(object).find((/**
         * @param {?} key
         * @return {?}
         */
        key => object[key] === value));
    }
    /*
       * Loading data for spatial filter list component (NO GEOMETRY)
       */
    /**
     * @param {?} type
     * @return {?}
     */
    loadFilterList(type) {
        /** @type {?} */
        const urlPath = (/** @type {?} */ (type));
        if (urlPath) {
            return this.http
                .get(this.baseUrl + this.urlFilterList[urlPath])
                .pipe(map((/**
             * @param {?} featureCollection
             * @return {?}
             */
            featureCollection => featureCollection.features.map((/**
             * @param {?} f
             * @return {?}
             */
            f => {
                f.meta = {
                    id: f.properties.code
                };
                return f;
            })))));
        }
    }
    /*
       * Loading item list (STRING)
       */
    /**
     * @return {?}
     */
    loadThematicsList() {
        /** @type {?} */
        const url = 'types';
        /** @type {?} */
        const items = [];
        return this.http.get(this.baseUrl + url).pipe(map((/**
         * @param {?} types
         * @return {?}
         */
        (types) => {
            types.forEach((/**
             * @param {?} type
             * @return {?}
             */
            type => {
                if (type.startsWith('lieux')) {
                    /** @type {?} */
                    const item = {
                        name: undefined,
                        source: type
                    };
                    /** @type {?} */
                    let substr = type.substring(6, type.length);
                    /** @type {?} */
                    let name = substr;
                    if (substr.includes('.')) {
                        /** @type {?} */
                        const index = substr.indexOf('.');
                        name = substr.substring(index + 1, substr.length);
                        substr = substr.substring(0, index);
                    }
                    try {
                        item.name = this.languageService.translate.instant('igo.geo.terrapi.' + name);
                    }
                    catch (e) {
                        item.name = name.substring(0, 1).toUpperCase() + name.substring(1, name.length - 1);
                    }
                    try {
                        item.group = this.languageService.translate.instant('igo.geo.spatialFilter.group.' + substr);
                    }
                    catch (e) {
                        item.group = substr.substring(0, 1).toUpperCase() + substr.substring(1, name.length - 1);
                    }
                    items.push(item);
                }
                else {
                    if (this.getKeyByValue(this.urlFilterList, type)) {
                        /** @type {?} */
                        const item = {
                            name: undefined,
                            source: type
                        };
                        /** @type {?} */
                        const name = this.getKeyByValue(this.urlFilterList, type);
                        try {
                            item.name = this.languageService.translate.instant('igo.geo.terrapi.' + name);
                        }
                        catch (e) {
                            item.name = name.substring(0, 1).toUpperCase() + name.substring(1, name.length - 1);
                        }
                        item.source = type;
                        items.push(item);
                    }
                }
            }));
            return items;
        })));
    }
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
    loadFilterItem(feature, itemType, type, thematic, buffer) {
        if (type) {
            // Predefined type
            /** @type {?} */
            const urlType = (/** @type {?} */ (type));
            /** @type {?} */
            const url = this.baseUrl + this.urlFilterList[urlType];
            /** @type {?} */
            let urlItem = '';
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
                featureCollection => featureCollection.features.map((/**
                 * @param {?} f
                 * @return {?}
                 */
                f => {
                    f.meta = {
                        id: f.properties.code,
                        title: this.languageService.translate.instant('igo.geo.spatialFilter.Address'),
                        icon: ((/** @type {?} */ (f))).icon
                    };
                    return f;
                })))));
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
                featureCollection => featureCollection.features.map((/**
                 * @param {?} f
                 * @return {?}
                 */
                f => {
                    f.meta = {
                        id: f.properties.code,
                        title: thematic.name,
                        icon: ((/** @type {?} */ (f))).icon
                    };
                    return f;
                })))));
            }
        }
        else {
            // Draw type
            /** @type {?} */
            const url = this.baseUrl + 'locate';
            if (itemType === SpatialFilterItemType.Address) {
                /** @type {?} */
                const urlItem = '?type=adresses';
                return this.http
                    .post(url + urlItem, {
                    geometry: 'true',
                    icon: 'true',
                    buffer,
                    loc: JSON.stringify(feature)
                })
                    .pipe(map((/**
                 * @param {?} featureCollection
                 * @return {?}
                 */
                featureCollection => featureCollection.features.map((/**
                 * @param {?} f
                 * @return {?}
                 */
                f => {
                    f.meta = {
                        id: f.properties.code,
                        title: this.languageService.translate.instant('igo.geo.spatialFilter.Address'),
                        icon: ((/** @type {?} */ (f))).icon
                    };
                    return f;
                })))));
            }
            else {
                // If thematics search
                /** @type {?} */
                const urlItem = '?type=' + thematic.source;
                return this.http
                    .post(url + urlItem, {
                    geometry: 'true',
                    icon: 'true',
                    buffer,
                    loc: JSON.stringify(feature)
                })
                    .pipe(map((/**
                 * @param {?} featureCollection
                 * @return {?}
                 */
                featureCollection => featureCollection.features.map((/**
                 * @param {?} f
                 * @return {?}
                 */
                f => {
                    f.meta = {
                        id: f.properties.code,
                        title: thematic.name,
                        icon: ((/** @type {?} */ (f))).icon
                    };
                    return f;
                })))));
            }
        }
    }
    /*
       * Get one territory by id (WITH GEOMETRY)
       */
    /**
     * @param {?} feature
     * @param {?} type
     * @return {?}
     */
    loadItemById(feature, type) {
        /** @type {?} */
        const featureType = this.urlFilterList[type];
        /** @type {?} */
        const featureCode = '/' + feature.properties.code;
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
            f => {
                f.meta = {
                    id: f.properties.code,
                    alias: f.properties.nom,
                    title: f.properties.nom
                };
                return f;
            })));
        }
    }
}
SpatialFilterService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
SpatialFilterService.ctorParameters = () => [
    { type: HttpClient },
    { type: LanguageService },
    { type: ConfigService }
];
/** @nocollapse */ SpatialFilterService.ngInjectableDef = i0.defineInjectable({ factory: function SpatialFilterService_Factory() { return new SpatialFilterService(i0.inject(i1.HttpClient), i0.inject(i2.LanguageService), i0.inject(i2.ConfigService)); }, token: SpatialFilterService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhdGlhbC1maWx0ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXIvc2hhcmVkL3NwYXRpYWwtZmlsdGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzVELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUdyQyxPQUFPLEVBRUwscUJBQXFCLEVBQ3RCLE1BQU0sdUJBQXVCLENBQUM7Ozs7QUFNL0IsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7O0lBb0IvQixZQUNVLElBQWdCLEVBQ2hCLGVBQWdDLEVBQ2hDLGFBQTRCO1FBRjVCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBdEIvQixZQUFPLEdBQVcsNkNBQTZDLENBQUM7Ozs7UUFLaEUsa0JBQWEsR0FBRztZQUNyQixTQUFTLEVBQUUsVUFBVTtZQUNyQixNQUFNLEVBQUUsaUJBQWlCO1lBQ3pCLE9BQU8sRUFBRSxVQUFVO1lBQ25CLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLEdBQUcsRUFBRSxLQUFLO1lBQ1YsR0FBRyxFQUFFLGVBQWU7WUFDcEIsT0FBTyxFQUFFLFVBQVU7WUFDbkIsTUFBTSxFQUFFLGFBQWE7WUFDckIsS0FBSyxFQUFFLE9BQU87WUFDZCxNQUFNLEVBQUUsUUFBUTtTQUNqQixDQUFDO1FBT0EsSUFBSSxDQUFDLE9BQU87WUFDVixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxJ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LElBQUksV0FBVyxFQUFFO1lBQzlCLE9BQU8sSUFBSSxDQUFDLElBQUk7aUJBQ2IsR0FBRyxDQUFVLElBQUksQ0FBQyxPQUFPLEdBQUcsV0FBVyxHQUFHLFdBQVcsRUFBRTtnQkFDdEQsTUFBTSxFQUFFO29CQUNOLFFBQVEsRUFBRSxNQUFNO2lCQUNqQjthQUNGLENBQUM7aUJBQ0QsSUFBSSxDQUNILEdBQUc7Ozs7WUFBQyxDQUFDLENBQUMsRUFBRTtnQkFDTixDQUFDLENBQUMsSUFBSSxHQUFHO29CQUNQLEVBQUUsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUk7b0JBQ3JCLEtBQUssRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUc7b0JBQ3ZCLEtBQUssRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUc7aUJBQ3hCLENBQUM7Z0JBQ0YsT0FBTyxDQUFDLENBQUM7WUFDWCxDQUFDLEVBQUMsQ0FDSCxDQUFDO1NBQ0w7SUFDSCxDQUFDOzs7WUE1UUYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBYlEsVUFBVTtZQUNLLGVBQWU7WUFBOUIsYUFBYTs7Ozs7SUFjcEIsdUNBQXVFOztJQUt2RSw2Q0FZRTs7Ozs7SUFHQSxvQ0FBd0I7Ozs7O0lBQ3hCLCtDQUF3Qzs7Ozs7SUFDeEMsNkNBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSwgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBGZWF0dXJlIH0gZnJvbSAnLi4vLi4vZmVhdHVyZS9zaGFyZWQnO1xyXG5pbXBvcnQge1xyXG4gIFNwYXRpYWxGaWx0ZXJRdWVyeVR5cGUsXHJcbiAgU3BhdGlhbEZpbHRlckl0ZW1UeXBlXHJcbn0gZnJvbSAnLi9zcGF0aWFsLWZpbHRlci5lbnVtJztcclxuaW1wb3J0IHsgU3BhdGlhbEZpbHRlclRoZW1hdGljIH0gZnJvbSAnLi9zcGF0aWFsLWZpbHRlci5pbnRlcmZhY2UnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU3BhdGlhbEZpbHRlclNlcnZpY2Uge1xyXG4gIHB1YmxpYyBiYXNlVXJsOiBzdHJpbmcgPSAnaHR0cHM6Ly9nZW9lZ2wubXNwLmdvdXYucWMuY2EvYXBpcy90ZXJyYXBpLyc7XHJcblxyXG4gIC8qXHJcbiAgICogVHlwZSBhc3NvY2lhdGlvbiB3aXRoIFVSTFxyXG4gICAqL1xyXG4gIHB1YmxpYyB1cmxGaWx0ZXJMaXN0ID0ge1xyXG4gICAgQWRtUmVnaW9uOiAncmVnYWRtaW4nLFxyXG4gICAgQXJyb25kOiAnYXJyb25kaXNzZW1lbnRzJyxcclxuICAgIENpcmNGZWQ6ICdjaXJjLWZlZCcsXHJcbiAgICBDaXJjUHJvdjogJ2NpcmMtcHJvdicsXHJcbiAgICBEaXJSZWc6ICdkaXItcmVnJyxcclxuICAgIE1SQzogJ21yYycsXHJcbiAgICBNdW46ICdtdW5pY2lwYWxpdGVzJyxcclxuICAgIFJlZ1RvdXI6ICd0b3VyaXNtZScsXHJcbiAgICBib3JuZXM6ICdib3JuZXMtc3VtaScsXHJcbiAgICBoeWRybzogJ2h5ZHJvJyxcclxuICAgIHJvdXRlczogJ3JvdXRlcydcclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMuYmFzZVVybCA9XHJcbiAgICAgIHRoaXMuY29uZmlnU2VydmljZS5nZXRDb25maWcoJ3NwYXRpYWxGaWx0ZXIudXJsJykgfHwgdGhpcy5iYXNlVXJsO1xyXG4gIH1cclxuXHJcbiAgZ2V0S2V5QnlWYWx1ZShvYmplY3QsIHZhbHVlKSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqZWN0KS5maW5kKGtleSA9PiBvYmplY3Rba2V5XSA9PT0gdmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBMb2FkaW5nIGRhdGEgZm9yIHNwYXRpYWwgZmlsdGVyIGxpc3QgY29tcG9uZW50IChOTyBHRU9NRVRSWSlcclxuICAgKi9cclxuICBsb2FkRmlsdGVyTGlzdCh0eXBlOiBTcGF0aWFsRmlsdGVyUXVlcnlUeXBlKTogT2JzZXJ2YWJsZTxGZWF0dXJlW10+IHtcclxuICAgIGNvbnN0IHVybFBhdGggPSB0eXBlIGFzIHN0cmluZztcclxuICAgIGlmICh1cmxQYXRoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgICAuZ2V0PHsgZmVhdHVyZXM6IEZlYXR1cmVbXSB9PihcclxuICAgICAgICAgIHRoaXMuYmFzZVVybCArIHRoaXMudXJsRmlsdGVyTGlzdFt1cmxQYXRoXVxyXG4gICAgICAgIClcclxuICAgICAgICAucGlwZShcclxuICAgICAgICAgIG1hcChmZWF0dXJlQ29sbGVjdGlvbiA9PlxyXG4gICAgICAgICAgICBmZWF0dXJlQ29sbGVjdGlvbi5mZWF0dXJlcy5tYXAoZiA9PiB7XHJcbiAgICAgICAgICAgICAgZi5tZXRhID0ge1xyXG4gICAgICAgICAgICAgICAgaWQ6IGYucHJvcGVydGllcy5jb2RlXHJcbiAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICByZXR1cm4gZjtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBMb2FkaW5nIGl0ZW0gbGlzdCAoU1RSSU5HKVxyXG4gICAqL1xyXG4gIGxvYWRUaGVtYXRpY3NMaXN0KCkge1xyXG4gICAgY29uc3QgdXJsID0gJ3R5cGVzJztcclxuICAgIGNvbnN0IGl0ZW1zOiBTcGF0aWFsRmlsdGVyVGhlbWF0aWNbXSA9IFtdO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5iYXNlVXJsICsgdXJsKS5waXBlKFxyXG4gICAgICBtYXAoKHR5cGVzOiBzdHJpbmdbXSkgPT4ge1xyXG4gICAgICAgIHR5cGVzLmZvckVhY2godHlwZSA9PiB7XHJcbiAgICAgICAgICBpZiAodHlwZS5zdGFydHNXaXRoKCdsaWV1eCcpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW06IFNwYXRpYWxGaWx0ZXJUaGVtYXRpYyA9IHtcclxuICAgICAgICAgICAgICBuYW1lOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgc291cmNlOiB0eXBlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGxldCBzdWJzdHIgPSB0eXBlLnN1YnN0cmluZyg2LCB0eXBlLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gc3Vic3RyO1xyXG4gICAgICAgICAgICBpZiAoc3Vic3RyLmluY2x1ZGVzKCcuJykpIHtcclxuICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHN1YnN0ci5pbmRleE9mKCcuJyk7XHJcbiAgICAgICAgICAgICAgbmFtZSA9IHN1YnN0ci5zdWJzdHJpbmcoaW5kZXggKyAxLCBzdWJzdHIubGVuZ3RoKTtcclxuICAgICAgICAgICAgICBzdWJzdHIgPSBzdWJzdHIuc3Vic3RyaW5nKDAsIGluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgIGl0ZW0ubmFtZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgICAgICAgJ2lnby5nZW8udGVycmFwaS4nICsgbmFtZVxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICBpdGVtLm5hbWUgPSBuYW1lLnN1YnN0cmluZygwLCAxKS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zdWJzdHJpbmcoMSwgbmFtZS5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICBpdGVtLmdyb3VwID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAgICAgICAnaWdvLmdlby5zcGF0aWFsRmlsdGVyLmdyb3VwLicgKyBzdWJzdHJcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgaXRlbS5ncm91cCA9IHN1YnN0ci5zdWJzdHJpbmcoMCwgMSkudG9VcHBlckNhc2UoKSArIHN1YnN0ci5zdWJzdHJpbmcoMSwgbmFtZS5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdldEtleUJ5VmFsdWUodGhpcy51cmxGaWx0ZXJMaXN0LCB0eXBlKSkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGl0ZW06IFNwYXRpYWxGaWx0ZXJUaGVtYXRpYyA9IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIHNvdXJjZTogdHlwZVxyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0S2V5QnlWYWx1ZSh0aGlzLnVybEZpbHRlckxpc3QsIHR5cGUpO1xyXG4gICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLm5hbWUgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICAgICAgICAgJ2lnby5nZW8udGVycmFwaS4nICsgbmFtZVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLm5hbWUgPSBuYW1lLnN1YnN0cmluZygwLCAxKS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zdWJzdHJpbmcoMSwgbmFtZS5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaXRlbS5zb3VyY2UgPSB0eXBlO1xyXG5cclxuICAgICAgICAgICAgICBpdGVtcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW1zO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogTG9hZGluZyBkYXRhIGZvciBzcGF0aWFsIGZpbHRlciBpdGVtIGNvbXBvbmVudCAoQWRkcmVzcyBvciBUaGVtYXRpY3MpIGRlcGVuZHMgb24gcHJlZGVmaW5lZCB6b25lIG9yIGRyYXcgem9uZSAoZmVhdHVyZSlcclxuICAgKi9cclxuICBsb2FkRmlsdGVySXRlbShcclxuICAgIGZlYXR1cmUsXHJcbiAgICBpdGVtVHlwZTogU3BhdGlhbEZpbHRlckl0ZW1UeXBlLFxyXG4gICAgdHlwZT86IFNwYXRpYWxGaWx0ZXJRdWVyeVR5cGUsXHJcbiAgICB0aGVtYXRpYz86IFNwYXRpYWxGaWx0ZXJUaGVtYXRpYyxcclxuICAgIGJ1ZmZlcj86IG51bWJlclxyXG4gICkge1xyXG4gICAgaWYgKHR5cGUpIHtcclxuICAgICAgLy8gUHJlZGVmaW5lZCB0eXBlXHJcbiAgICAgIGNvbnN0IHVybFR5cGUgPSB0eXBlIGFzIHN0cmluZztcclxuICAgICAgY29uc3QgdXJsID0gdGhpcy5iYXNlVXJsICsgdGhpcy51cmxGaWx0ZXJMaXN0W3VybFR5cGVdO1xyXG4gICAgICBsZXQgdXJsSXRlbSA9ICcnO1xyXG4gICAgICBpZiAoaXRlbVR5cGUgPT09IFNwYXRpYWxGaWx0ZXJJdGVtVHlwZS5BZGRyZXNzKSB7XHJcbiAgICAgICAgdXJsSXRlbSA9ICdhZHJlc3Nlcyc7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAgICAgLmdldDx7IGZlYXR1cmVzOiBGZWF0dXJlW10gfT4oXHJcbiAgICAgICAgICAgIHVybCArICcvJyArIGZlYXR1cmUucHJvcGVydGllcy5jb2RlICsgJy8nICsgdXJsSXRlbSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgZ2VvbWV0cnk6ICd0cnVlJyxcclxuICAgICAgICAgICAgICAgIGljb246ICd0cnVlJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgIG1hcChmZWF0dXJlQ29sbGVjdGlvbiA9PlxyXG4gICAgICAgICAgICAgIGZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzLm1hcChmID0+IHtcclxuICAgICAgICAgICAgICAgIGYubWV0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgaWQ6IGYucHJvcGVydGllcy5jb2RlLFxyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAgICAgICAgICAgJ2lnby5nZW8uc3BhdGlhbEZpbHRlci5BZGRyZXNzJ1xyXG4gICAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgICBpY29uOiAoZiBhcyBhbnkpLmljb25cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZjtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIElmIHRoZW1hdGljcyBzZWFyY2hcclxuICAgICAgICB1cmxJdGVtID0gdGhlbWF0aWMuc291cmNlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgICAgIC5nZXQ8eyBmZWF0dXJlczogRmVhdHVyZVtdIH0+KFxyXG4gICAgICAgICAgICB1cmwgKyAnLycgKyBmZWF0dXJlLnByb3BlcnRpZXMuY29kZSArICcvJyArIHVybEl0ZW0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIGdlb21ldHJ5OiAndHJ1ZScsXHJcbiAgICAgICAgICAgICAgICBpY29uOiAndHJ1ZSdcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIClcclxuICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICBtYXAoZmVhdHVyZUNvbGxlY3Rpb24gPT5cclxuICAgICAgICAgICAgICBmZWF0dXJlQ29sbGVjdGlvbi5mZWF0dXJlcy5tYXAoZiA9PiB7XHJcbiAgICAgICAgICAgICAgICBmLm1ldGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgIGlkOiBmLnByb3BlcnRpZXMuY29kZSxcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoZW1hdGljLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgIGljb246IChmIGFzIGFueSkuaWNvblxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIERyYXcgdHlwZVxyXG4gICAgICBjb25zdCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnbG9jYXRlJztcclxuICAgICAgaWYgKGl0ZW1UeXBlID09PSBTcGF0aWFsRmlsdGVySXRlbVR5cGUuQWRkcmVzcykge1xyXG4gICAgICAgIGNvbnN0IHVybEl0ZW0gPSAnP3R5cGU9YWRyZXNzZXMnO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgICAgIC5wb3N0PHsgZmVhdHVyZXM6IEZlYXR1cmVbXSB9Pih1cmwgKyB1cmxJdGVtLCB7XHJcbiAgICAgICAgICAgIGdlb21ldHJ5OiAndHJ1ZScsXHJcbiAgICAgICAgICAgIGljb246ICd0cnVlJyxcclxuICAgICAgICAgICAgYnVmZmVyLFxyXG4gICAgICAgICAgICBsb2M6IEpTT04uc3RyaW5naWZ5KGZlYXR1cmUpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgIG1hcChmZWF0dXJlQ29sbGVjdGlvbiA9PlxyXG4gICAgICAgICAgICAgIGZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzLm1hcChmID0+IHtcclxuICAgICAgICAgICAgICAgIGYubWV0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgaWQ6IGYucHJvcGVydGllcy5jb2RlLFxyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAgICAgICAgICAgJ2lnby5nZW8uc3BhdGlhbEZpbHRlci5BZGRyZXNzJ1xyXG4gICAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgICBpY29uOiAoZiBhcyBhbnkpLmljb25cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZjtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIElmIHRoZW1hdGljcyBzZWFyY2hcclxuICAgICAgICBjb25zdCB1cmxJdGVtID0gJz90eXBlPScgKyB0aGVtYXRpYy5zb3VyY2U7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAgICAgLnBvc3Q8eyBmZWF0dXJlczogRmVhdHVyZVtdIH0+KHVybCArIHVybEl0ZW0sIHtcclxuICAgICAgICAgICAgZ2VvbWV0cnk6ICd0cnVlJyxcclxuICAgICAgICAgICAgaWNvbjogJ3RydWUnLFxyXG4gICAgICAgICAgICBidWZmZXIsXHJcbiAgICAgICAgICAgIGxvYzogSlNPTi5zdHJpbmdpZnkoZmVhdHVyZSlcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgbWFwKGZlYXR1cmVDb2xsZWN0aW9uID0+XHJcbiAgICAgICAgICAgICAgZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXMubWFwKGYgPT4ge1xyXG4gICAgICAgICAgICAgICAgZi5tZXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICBpZDogZi5wcm9wZXJ0aWVzLmNvZGUsXHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGVtYXRpYy5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICBpY29uOiAoZiBhcyBhbnkpLmljb25cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZjtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIEdldCBvbmUgdGVycml0b3J5IGJ5IGlkIChXSVRIIEdFT01FVFJZKVxyXG4gICAqL1xyXG4gIGxvYWRJdGVtQnlJZChcclxuICAgIGZlYXR1cmU6IEZlYXR1cmUsXHJcbiAgICB0eXBlOiBTcGF0aWFsRmlsdGVyUXVlcnlUeXBlXHJcbiAgKTogT2JzZXJ2YWJsZTxGZWF0dXJlPiB7XHJcbiAgICBjb25zdCBmZWF0dXJlVHlwZSA9IHRoaXMudXJsRmlsdGVyTGlzdFt0eXBlXTtcclxuICAgIGNvbnN0IGZlYXR1cmVDb2RlID0gJy8nICsgZmVhdHVyZS5wcm9wZXJ0aWVzLmNvZGU7XHJcbiAgICBpZiAoZmVhdHVyZVR5cGUgJiYgZmVhdHVyZUNvZGUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAgIC5nZXQ8RmVhdHVyZT4odGhpcy5iYXNlVXJsICsgZmVhdHVyZVR5cGUgKyBmZWF0dXJlQ29kZSwge1xyXG4gICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgIGdlb21ldHJ5OiAndHJ1ZSdcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgbWFwKGYgPT4ge1xyXG4gICAgICAgICAgICBmLm1ldGEgPSB7XHJcbiAgICAgICAgICAgICAgaWQ6IGYucHJvcGVydGllcy5jb2RlLFxyXG4gICAgICAgICAgICAgIGFsaWFzOiBmLnByb3BlcnRpZXMubm9tLFxyXG4gICAgICAgICAgICAgIHRpdGxlOiBmLnByb3BlcnRpZXMubm9tXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiBmO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=