/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as olformat from 'ol/format';
import { DataService } from './data.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
var WFSService = /** @class */ (function (_super) {
    tslib_1.__extends(WFSService, _super);
    function WFSService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        return _this;
    }
    /**
     * @return {?}
     */
    WFSService.prototype.getData = /**
     * @return {?}
     */
    function () {
        console.log('This is defining a data service.');
        return 'This is defining a data service.';
    };
    /**
     * @param {?} datasource
     * @return {?}
     */
    WFSService.prototype.getSourceFieldsFromWFS = /**
     * @param {?} datasource
     * @return {?}
     */
    function (datasource) {
        var _this = this;
        if (datasource.sourceFields === undefined ||
            Object.keys(datasource.sourceFields).length === 0) {
            datasource.sourceFields = [];
            this.wfsGetCapabilities(datasource).subscribe((/**
             * @param {?} wfsCapabilities
             * @return {?}
             */
            function (wfsCapabilities) {
                datasource.paramsWFS.wfsCapabilities = {
                    xmlBody: wfsCapabilities.body,
                    GetPropertyValue: /GetPropertyValue/gi.test(wfsCapabilities.body)
                        ? true
                        : false
                };
                _this.defineFieldAndValuefromWFS(datasource).subscribe((/**
                 * @param {?} sourceFields
                 * @return {?}
                 */
                function (sourceFields) {
                    datasource.sourceFields = sourceFields;
                }));
            }));
        }
        else {
            datasource.sourceFields.forEach((/**
             * @param {?} sourcefield
             * @return {?}
             */
            function (sourcefield) {
                if (sourcefield.alias === undefined) {
                    sourcefield.alias = sourcefield.name; // to allow only a list of sourcefield with names
                }
            }));
            datasource.sourceFields
                .filter((/**
             * @param {?} field
             * @return {?}
             */
            function (field) { return field.values === undefined || field.values.length === 0; }))
                .forEach((/**
             * @param {?} f
             * @return {?}
             */
            function (f) {
                _this.getValueFromWfsGetPropertyValues(datasource, f.name, 200, 0, 0).subscribe((/**
                 * @param {?} rep
                 * @return {?}
                 */
                function (rep) { return (f.values = rep); }));
            }));
        }
    };
    /**
     * @param {?} wfsDataSourceOptions
     * @return {?}
     */
    WFSService.prototype.checkWfsOptions = /**
     * @param {?} wfsDataSourceOptions
     * @return {?}
     */
    function (wfsDataSourceOptions) {
        // Look at https://github.com/openlayers/openlayers/pull/6400
        /** @type {?} */
        var patternGml = new RegExp(/.*?gml.*?/gi);
        if (patternGml.test(wfsDataSourceOptions.paramsWFS.outputFormat)) {
            wfsDataSourceOptions.paramsWFS.version = '1.1.0';
        }
        return Object.assign({}, wfsDataSourceOptions, {
            wfsCapabilities: { xmlBody: '', GetPropertyValue: false }
        });
    };
    /**
     * @param {?} wfsDataSourceOptions
     * @param {?} wfsQuery
     * @return {?}
     */
    WFSService.prototype.buildBaseWfsUrl = /**
     * @param {?} wfsDataSourceOptions
     * @param {?} wfsQuery
     * @return {?}
     */
    function (wfsDataSourceOptions, wfsQuery) {
        /** @type {?} */
        var paramTypename = 'typename';
        if (wfsDataSourceOptions.paramsWFS.version === '2.0.0' ||
            !wfsDataSourceOptions.paramsWFS.version) {
            paramTypename = 'typenames';
        }
        /** @type {?} */
        var baseWfsQuery = 'service=wfs&request=' + wfsQuery;
        /** @type {?} */
        var wfsTypeName = paramTypename + '=' + wfsDataSourceOptions.paramsWFS.featureTypes;
        /** @type {?} */
        var wfsVersion = wfsDataSourceOptions.paramsWFS.version
            ? 'version=' + wfsDataSourceOptions.paramsWFS.version
            : 'version=' + '2.0.0';
        return wfsDataSourceOptions.urlWfs + "?" + baseWfsQuery + "&" + wfsVersion + "&" + wfsTypeName;
    };
    /**
     * @param {?} wfsDataSourceOptions
     * @param {?=} nb
     * @param {?=} epsgCode
     * @param {?=} propertyname
     * @return {?}
     */
    WFSService.prototype.wfsGetFeature = /**
     * @param {?} wfsDataSourceOptions
     * @param {?=} nb
     * @param {?=} epsgCode
     * @param {?=} propertyname
     * @return {?}
     */
    function (wfsDataSourceOptions, nb, epsgCode, propertyname) {
        if (nb === void 0) { nb = 5000; }
        if (epsgCode === void 0) { epsgCode = 3857; }
        if (propertyname === void 0) { propertyname = ''; }
        /** @type {?} */
        var baseUrl = this.buildBaseWfsUrl(wfsDataSourceOptions, 'GetFeature');
        /** @type {?} */
        var outputFormat = wfsDataSourceOptions.paramsWFS.outputFormat
            ? 'outputFormat=' + wfsDataSourceOptions.paramsWFS.outputFormat
            : '';
        /** @type {?} */
        var srsname = wfsDataSourceOptions.paramsWFS.srsName
            ? 'srsname=' + wfsDataSourceOptions.paramsWFS.srsName
            : 'srsname=EPSG:' + epsgCode;
        /** @type {?} */
        var wfspropertyname = propertyname === '' ? propertyname : '&propertyname=' + propertyname;
        /** @type {?} */
        var paramMaxFeatures = 'maxFeatures';
        if (wfsDataSourceOptions.paramsWFS.version === '2.0.0' ||
            !wfsDataSourceOptions.paramsWFS.version) {
            paramMaxFeatures = 'count';
        }
        /** @type {?} */
        var maxFeatures;
        if (nb !== 5000) {
            maxFeatures = paramMaxFeatures + '=' + nb;
        }
        else {
            maxFeatures = wfsDataSourceOptions.paramsWFS.maxFeatures
                ? paramMaxFeatures + '=' + wfsDataSourceOptions.paramsWFS.maxFeatures
                : paramMaxFeatures + '=' + nb;
        }
        /** @type {?} */
        var urlWfs = baseUrl + "&" + outputFormat + "&" + srsname + "&" + maxFeatures + wfspropertyname;
        /** @type {?} */
        var patternGml = new RegExp('.*?gml.*?');
        if (patternGml.test(wfsDataSourceOptions.paramsWFS.outputFormat.toLowerCase())) {
            return this.http.get(urlWfs, { responseType: 'text' });
        }
        else {
            return this.http.get(urlWfs);
        }
    };
    /**
     * @param {?} wfsDataSourceOptions
     * @param {?} field
     * @param {?=} maxFeatures
     * @param {?=} startIndex
     * @param {?=} retry
     * @return {?}
     */
    WFSService.prototype.getValueFromWfsGetPropertyValues = /**
     * @param {?} wfsDataSourceOptions
     * @param {?} field
     * @param {?=} maxFeatures
     * @param {?=} startIndex
     * @param {?=} retry
     * @return {?}
     */
    function (wfsDataSourceOptions, field, maxFeatures, startIndex, retry) {
        var _this = this;
        if (maxFeatures === void 0) { maxFeatures = 30; }
        if (startIndex === void 0) { startIndex = 0; }
        if (retry === void 0) { retry = 0; }
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            /** @type {?} */
            var nbRetry = 2;
            /** @type {?} */
            var valueList = [];
            _this.wfsGetPropertyValue(wfsDataSourceOptions, field, maxFeatures, startIndex).subscribe((/**
             * @param {?} str
             * @return {?}
             */
            function (str) {
                str = str.replace(/&#39;/gi, "'"); // tslint:disable-line
                // tslint:disable-line
                /** @type {?} */
                var regexExcp = /exception/gi;
                if (regexExcp.test(str)) {
                    retry++;
                    if (retry < nbRetry) {
                        _this.getValueFromWfsGetPropertyValues(wfsDataSourceOptions, field, maxFeatures, startIndex, retry).subscribe((/**
                         * @param {?} rep
                         * @return {?}
                         */
                        function (rep) { return d.next(rep); }));
                    }
                }
                else {
                    /** @type {?} */
                    var valueReferenceRegex = new RegExp('<(.+?)' + field + '>(.+?)</(.+?)' + field + '>', 'gi');
                    /** @type {?} */
                    var n = valueReferenceRegex.exec(str);
                    while (n !== null) {
                        if (n.index === valueReferenceRegex.lastIndex) {
                            valueReferenceRegex.lastIndex++;
                        }
                        if (valueList.indexOf(n[2]) === -1) {
                            valueList.push(n[2]);
                        }
                        n = valueReferenceRegex.exec(str);
                    }
                    d.next(valueList);
                    d.complete();
                }
            }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
                if (retry < nbRetry) {
                    retry++;
                    _this.getValueFromWfsGetPropertyValues(wfsDataSourceOptions, field, maxFeatures, startIndex, retry).subscribe((/**
                     * @param {?} rep
                     * @return {?}
                     */
                    function (rep) { return d.next(rep); }));
                }
            }));
        }));
    };
    /**
     * @param {?} options
     * @return {?}
     */
    WFSService.prototype.wfsGetCapabilities = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        /** @type {?} */
        var baseWfsQuery = 'service=wfs&request=GetCapabilities';
        /** @type {?} */
        var wfsVersion = options.version
            ? 'version=' + options.version
            : 'version=' + '2.0.0';
        /** @type {?} */
        var wfsGcUrl = options.urlWfs + "?" + baseWfsQuery + "&" + wfsVersion;
        return this.http.get(wfsGcUrl, {
            observe: 'response',
            responseType: 'text'
        });
    };
    /**
     * @param {?} wfsDataSourceOptions
     * @return {?}
     */
    WFSService.prototype.defineFieldAndValuefromWFS = /**
     * @param {?} wfsDataSourceOptions
     * @return {?}
     */
    function (wfsDataSourceOptions) {
        var _this = this;
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            /** @type {?} */
            var sourceFields = [];
            /** @type {?} */
            var fieldList;
            /** @type {?} */
            var fieldListWoGeom;
            /** @type {?} */
            var fieldListWoGeomStr;
            /** @type {?} */
            var olFormats;
            /** @type {?} */
            var patternGml3 = /gml/gi;
            if (wfsDataSourceOptions.paramsWFS.outputFormat.match(patternGml3)) {
                olFormats = olformat.WFS;
            }
            else {
                olFormats = olformat.GeoJSON;
            }
            if (wfsDataSourceOptions.paramsWFS.wfsCapabilities.GetPropertyValue) {
                _this.wfsGetFeature(wfsDataSourceOptions, 1).subscribe((/**
                 * @param {?} oneFeature
                 * @return {?}
                 */
                function (oneFeature) {
                    /** @type {?} */
                    var features = new olFormats().readFeatures(oneFeature);
                    fieldList = features[0].getKeys();
                    fieldListWoGeom = fieldList.filter((/**
                     * @param {?} field
                     * @return {?}
                     */
                    function (field) {
                        return field !== features[0].getGeometryName() &&
                            !field.match(/boundedby/gi);
                    }));
                    fieldListWoGeomStr = fieldListWoGeom.join(',');
                    fieldListWoGeom.forEach((/**
                     * @param {?} element
                     * @return {?}
                     */
                    function (element) {
                        /** @type {?} */
                        var fieldType = typeof features[0].get(element) === 'object'
                            ? undefined
                            : typeof features[0].get(element);
                        _this.getValueFromWfsGetPropertyValues(wfsDataSourceOptions, element, 200).subscribe((/**
                         * @param {?} valueList
                         * @return {?}
                         */
                        function (valueList) {
                            sourceFields.push({
                                name: element,
                                alias: element,
                                values: valueList
                            });
                            d.next(sourceFields);
                        }));
                    }));
                }));
            }
            else {
                _this.wfsGetFeature(wfsDataSourceOptions, 1).subscribe((/**
                 * @param {?} oneFeature
                 * @return {?}
                 */
                function (oneFeature) {
                    /** @type {?} */
                    var features = new olFormats().readFeatures(oneFeature);
                    fieldList = features[0].getKeys();
                    fieldListWoGeom = fieldList.filter((/**
                     * @param {?} field
                     * @return {?}
                     */
                    function (field) {
                        return field !== features[0].getGeometryName() &&
                            !field.match(/boundedby/gi);
                    }));
                    fieldListWoGeomStr = fieldListWoGeom.join(',');
                    _this.wfsGetFeature(wfsDataSourceOptions, 200, 3857, fieldListWoGeomStr).subscribe((/**
                     * @param {?} manyFeatures
                     * @return {?}
                     */
                    function (manyFeatures) {
                        /** @type {?} */
                        var mfeatures = new olFormats().readFeatures(manyFeatures);
                        _this.built_properties_value(mfeatures).forEach((/**
                         * @param {?} element
                         * @return {?}
                         */
                        function (element) {
                            sourceFields.push(element);
                        }));
                        d.next(sourceFields);
                        d.complete();
                    }));
                }));
            }
        }));
    };
    /**
     * @param {?} wfsDataSourceOptions
     * @param {?} field
     * @param {?=} maxFeatures
     * @param {?=} startIndex
     * @return {?}
     */
    WFSService.prototype.wfsGetPropertyValue = /**
     * @param {?} wfsDataSourceOptions
     * @param {?} field
     * @param {?=} maxFeatures
     * @param {?=} startIndex
     * @return {?}
     */
    function (wfsDataSourceOptions, field, maxFeatures, startIndex) {
        if (maxFeatures === void 0) { maxFeatures = 30; }
        if (startIndex === void 0) { startIndex = 0; }
        /** @type {?} */
        var baseWfsQuery = 'service=wfs&request=GetPropertyValue&count=' + maxFeatures;
        /** @type {?} */
        var wfsTypeName = 'typenames=' + wfsDataSourceOptions.paramsWFS.featureTypes;
        /** @type {?} */
        var wfsValueReference = 'valueReference=' + field;
        /** @type {?} */
        var wfsVersion = 'version=' + '2.0.0';
        /** @type {?} */
        var gfvUrl = wfsDataSourceOptions.urlWfs + "?" + baseWfsQuery + "&" + wfsVersion + "&" + wfsTypeName + "&" + wfsValueReference;
        return this.http.get(gfvUrl, { responseType: 'text' });
    };
    /**
     * @private
     * @param {?} features
     * @return {?}
     */
    WFSService.prototype.built_properties_value = /**
     * @private
     * @param {?} features
     * @return {?}
     */
    function (features) {
        /** @type {?} */
        var kv = Object.assign({}, features[0].getProperties());
        delete kv[features[0].getGeometryName()];
        delete kv.boundedBy;
        /** @type {?} */
        var sourceFields = [];
        for (var property in kv) {
            if (kv.hasOwnProperty(property)) {
                /** @type {?} */
                var fieldType = typeof features[0].get(property) === 'object'
                    ? undefined
                    : typeof features[0].get(property);
                sourceFields.push({
                    name: property,
                    alias: property,
                    type: fieldType,
                    values: [kv[property]]
                });
            }
        }
        features.every((/**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            /** @type {?} */
            var featureProperties = element.getProperties();
            var _loop_1 = function (key) {
                if (featureProperties.hasOwnProperty(key) && key in kv) {
                    sourceFields.filter((/**
                     * @param {?} f
                     * @return {?}
                     */
                    function (f) { return f.name === key; })).forEach((/**
                     * @param {?} v
                     * @return {?}
                     */
                    function (v) {
                        if (v.values.indexOf(featureProperties[key]) === -1) {
                            v.values.push(featureProperties[key]);
                        }
                    }));
                }
            };
            for (var key in featureProperties) {
                _loop_1(key);
            }
            return true;
        }));
        return sourceFields;
    };
    WFSService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    WFSService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    /** @nocollapse */ WFSService.ngInjectableDef = i0.defineInjectable({ factory: function WFSService_Factory() { return new WFSService(i0.inject(i1.HttpClient)); }, token: WFSService, providedIn: "root" });
    return WFSService;
}(DataService));
export { WFSService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    WFSService.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ZzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd2ZzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBR2xDLE9BQU8sS0FBSyxRQUFRLE1BQU0sV0FBVyxDQUFDO0FBR3RDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBRTdDO0lBR2dDLHNDQUFXO0lBQ3pDLG9CQUFvQixJQUFnQjtRQUFwQyxZQUNFLGlCQUFPLFNBQ1I7UUFGbUIsVUFBSSxHQUFKLElBQUksQ0FBWTs7SUFFcEMsQ0FBQzs7OztJQUVELDRCQUFPOzs7SUFBUDtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLENBQUMsQ0FBQztRQUNoRCxPQUFPLGtDQUFrQyxDQUFDO0lBQzVDLENBQUM7Ozs7O0lBRU0sMkNBQXNCOzs7O0lBQTdCLFVBQThCLFVBQVU7UUFBeEMsaUJBdUNDO1FBdENDLElBQ0UsVUFBVSxDQUFDLFlBQVksS0FBSyxTQUFTO1lBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQ2pEO1lBQ0EsVUFBVSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDLFNBQVM7Ozs7WUFBQyxVQUFBLGVBQWU7Z0JBQzNELFVBQVUsQ0FBQyxTQUFTLENBQUMsZUFBZSxHQUFHO29CQUNyQyxPQUFPLEVBQUUsZUFBZSxDQUFDLElBQUk7b0JBQzdCLGdCQUFnQixF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QUFRO29CQUNmLElBQUksRUFBRSxTQUFTO29CQUNmLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDdkIsQ0FBQyxDQUFDO2FBQ0o7U0FDRjtRQUNELFFBQVEsQ0FBQyxLQUFLOzs7O1FBQUMsVUFBQyxPQUFPOztnQkFDZixpQkFBaUIsR0FBRyxPQUFPLENBQUMsYUFBYSxFQUFFO29DQUN0QyxHQUFHO2dCQUNaLElBQUksaUJBQWlCLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxFQUFFLEVBQUU7b0JBQ3RELFlBQVksQ0FBQyxNQUFNOzs7O29CQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLEVBQWQsQ0FBYyxFQUFDLENBQUMsT0FBTzs7OztvQkFBQyxVQUFBLENBQUM7d0JBQ2hELElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTs0QkFDbkQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt5QkFDdkM7b0JBQ0gsQ0FBQyxFQUFDLENBQUM7aUJBQ0o7O1lBUEgsS0FBSyxJQUFNLEdBQUcsSUFBSSxpQkFBaUI7d0JBQXhCLEdBQUc7YUFRYjtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxFQUFDLENBQUM7UUFDSCxPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDOztnQkE3VUYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFYUSxVQUFVOzs7cUJBRG5CO0NBd1ZDLEFBOVVELENBR2dDLFdBQVcsR0EyVTFDO1NBM1VZLFVBQVU7Ozs7OztJQUNULDBCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IG9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuaW1wb3J0ICogYXMgb2xmb3JtYXQgZnJvbSAnb2wvZm9ybWF0JztcclxuXHJcbmltcG9ydCB7IFdGU0RhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi93ZnMtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4vZGF0YS5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFdGU1NlcnZpY2UgZXh0ZW5kcyBEYXRhU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGF0YSgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdUaGlzIGlzIGRlZmluaW5nIGEgZGF0YSBzZXJ2aWNlLicpO1xyXG4gICAgcmV0dXJuICdUaGlzIGlzIGRlZmluaW5nIGEgZGF0YSBzZXJ2aWNlLic7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0U291cmNlRmllbGRzRnJvbVdGUyhkYXRhc291cmNlKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIGRhdGFzb3VyY2Uuc291cmNlRmllbGRzID09PSB1bmRlZmluZWQgfHxcclxuICAgICAgT2JqZWN0LmtleXMoZGF0YXNvdXJjZS5zb3VyY2VGaWVsZHMpLmxlbmd0aCA9PT0gMFxyXG4gICAgKSB7XHJcbiAgICAgIGRhdGFzb3VyY2Uuc291cmNlRmllbGRzID0gW107XHJcbiAgICAgIHRoaXMud2ZzR2V0Q2FwYWJpbGl0aWVzKGRhdGFzb3VyY2UpLnN1YnNjcmliZSh3ZnNDYXBhYmlsaXRpZXMgPT4ge1xyXG4gICAgICAgIGRhdGFzb3VyY2UucGFyYW1zV0ZTLndmc0NhcGFiaWxpdGllcyA9IHtcclxuICAgICAgICAgIHhtbEJvZHk6IHdmc0NhcGFiaWxpdGllcy5ib2R5LFxyXG4gICAgICAgICAgR2V0UHJvcGVydHlWYWx1ZTogL0dldFByb3BlcnR5VmFsdWUvZ2kudGVzdCh3ZnNDYXBhYmlsaXRpZXMuYm9keSlcclxuICAgICAgICAgICAgPyB0cnVlXHJcbiAgICAgICAgICAgIDogZmFsc2VcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmRlZmluZUZpZWxkQW5kVmFsdWVmcm9tV0ZTKGRhdGFzb3VyY2UpLnN1YnNjcmliZShzb3VyY2VGaWVsZHMgPT4ge1xyXG4gICAgICAgICAgZGF0YXNvdXJjZS5zb3VyY2VGaWVsZHMgPSBzb3VyY2VGaWVsZHM7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGF0YXNvdXJjZS5zb3VyY2VGaWVsZHMuZm9yRWFjaChzb3VyY2VmaWVsZCA9PiB7XHJcbiAgICAgICAgaWYgKHNvdXJjZWZpZWxkLmFsaWFzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHNvdXJjZWZpZWxkLmFsaWFzID0gc291cmNlZmllbGQubmFtZTsgLy8gdG8gYWxsb3cgb25seSBhIGxpc3Qgb2Ygc291cmNlZmllbGQgd2l0aCBuYW1lc1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBkYXRhc291cmNlLnNvdXJjZUZpZWxkc1xyXG4gICAgICAgIC5maWx0ZXIoXHJcbiAgICAgICAgICBmaWVsZCA9PiBmaWVsZC52YWx1ZXMgPT09IHVuZGVmaW5lZCB8fCBmaWVsZC52YWx1ZXMubGVuZ3RoID09PSAwXHJcbiAgICAgICAgKVxyXG4gICAgICAgIC5mb3JFYWNoKGYgPT4ge1xyXG4gICAgICAgICAgdGhpcy5nZXRWYWx1ZUZyb21XZnNHZXRQcm9wZXJ0eVZhbHVlcyhcclxuICAgICAgICAgICAgZGF0YXNvdXJjZSxcclxuICAgICAgICAgICAgZi5uYW1lLFxyXG4gICAgICAgICAgICAyMDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDBcclxuICAgICAgICAgICkuc3Vic2NyaWJlKHJlcCA9PiAoZi52YWx1ZXMgPSByZXApKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBjaGVja1dmc09wdGlvbnMod2ZzRGF0YVNvdXJjZU9wdGlvbnMpIHtcclxuICAgIC8vIExvb2sgYXQgaHR0cHM6Ly9naXRodWIuY29tL29wZW5sYXllcnMvb3BlbmxheWVycy9wdWxsLzY0MDBcclxuICAgIGNvbnN0IHBhdHRlcm5HbWwgPSBuZXcgUmVnRXhwKC8uKj9nbWwuKj8vZ2kpO1xyXG5cclxuICAgIGlmIChwYXR0ZXJuR21sLnRlc3Qod2ZzRGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTLm91dHB1dEZvcm1hdCkpIHtcclxuICAgICAgd2ZzRGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTLnZlcnNpb24gPSAnMS4xLjAnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHdmc0RhdGFTb3VyY2VPcHRpb25zLCB7XHJcbiAgICAgIHdmc0NhcGFiaWxpdGllczogeyB4bWxCb2R5OiAnJywgR2V0UHJvcGVydHlWYWx1ZTogZmFsc2UgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYnVpbGRCYXNlV2ZzVXJsKFxyXG4gICAgd2ZzRGF0YVNvdXJjZU9wdGlvbnM6IFdGU0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gICAgd2ZzUXVlcnk6IHN0cmluZ1xyXG4gICk6IHN0cmluZyB7XHJcbiAgICBsZXQgcGFyYW1UeXBlbmFtZSA9ICd0eXBlbmFtZSc7XHJcbiAgICBpZiAoXHJcbiAgICAgIHdmc0RhdGFTb3VyY2VPcHRpb25zLnBhcmFtc1dGUy52ZXJzaW9uID09PSAnMi4wLjAnIHx8XHJcbiAgICAgICF3ZnNEYXRhU291cmNlT3B0aW9ucy5wYXJhbXNXRlMudmVyc2lvblxyXG4gICAgKSB7XHJcbiAgICAgIHBhcmFtVHlwZW5hbWUgPSAndHlwZW5hbWVzJztcclxuICAgIH1cclxuICAgIGNvbnN0IGJhc2VXZnNRdWVyeSA9ICdzZXJ2aWNlPXdmcyZyZXF1ZXN0PScgKyB3ZnNRdWVyeTtcclxuICAgIGNvbnN0IHdmc1R5cGVOYW1lID1cclxuICAgICAgcGFyYW1UeXBlbmFtZSArICc9JyArIHdmc0RhdGFTb3VyY2VPcHRpb25zLnBhcmFtc1dGUy5mZWF0dXJlVHlwZXM7XHJcbiAgICBjb25zdCB3ZnNWZXJzaW9uID0gd2ZzRGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTLnZlcnNpb25cclxuICAgICAgPyAndmVyc2lvbj0nICsgd2ZzRGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTLnZlcnNpb25cclxuICAgICAgOiAndmVyc2lvbj0nICsgJzIuMC4wJztcclxuXHJcbiAgICByZXR1cm4gYCR7XHJcbiAgICAgIHdmc0RhdGFTb3VyY2VPcHRpb25zLnVybFdmc1xyXG4gICAgfT8ke2Jhc2VXZnNRdWVyeX0mJHt3ZnNWZXJzaW9ufSYke3dmc1R5cGVOYW1lfWA7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgd2ZzR2V0RmVhdHVyZShcclxuICAgIHdmc0RhdGFTb3VyY2VPcHRpb25zOiBXRlNEYXRhU291cmNlT3B0aW9ucyxcclxuICAgIG5iID0gNTAwMCxcclxuICAgIGVwc2dDb2RlID0gMzg1NyxcclxuICAgIHByb3BlcnR5bmFtZSA9ICcnXHJcbiAgKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IGJhc2VVcmwgPSB0aGlzLmJ1aWxkQmFzZVdmc1VybCh3ZnNEYXRhU291cmNlT3B0aW9ucywgJ0dldEZlYXR1cmUnKTtcclxuICAgIGNvbnN0IG91dHB1dEZvcm1hdCA9IHdmc0RhdGFTb3VyY2VPcHRpb25zLnBhcmFtc1dGUy5vdXRwdXRGb3JtYXRcclxuICAgICAgPyAnb3V0cHV0Rm9ybWF0PScgKyB3ZnNEYXRhU291cmNlT3B0aW9ucy5wYXJhbXNXRlMub3V0cHV0Rm9ybWF0XHJcbiAgICAgIDogJyc7XHJcbiAgICBjb25zdCBzcnNuYW1lID0gd2ZzRGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTLnNyc05hbWVcclxuICAgICAgPyAnc3JzbmFtZT0nICsgd2ZzRGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTLnNyc05hbWVcclxuICAgICAgOiAnc3JzbmFtZT1FUFNHOicgKyBlcHNnQ29kZTtcclxuICAgIGNvbnN0IHdmc3Byb3BlcnR5bmFtZSA9XHJcbiAgICAgIHByb3BlcnR5bmFtZSA9PT0gJycgPyBwcm9wZXJ0eW5hbWUgOiAnJnByb3BlcnR5bmFtZT0nICsgcHJvcGVydHluYW1lO1xyXG4gICAgbGV0IHBhcmFtTWF4RmVhdHVyZXMgPSAnbWF4RmVhdHVyZXMnO1xyXG4gICAgaWYgKFxyXG4gICAgICB3ZnNEYXRhU291cmNlT3B0aW9ucy5wYXJhbXNXRlMudmVyc2lvbiA9PT0gJzIuMC4wJyB8fFxyXG4gICAgICAhd2ZzRGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTLnZlcnNpb25cclxuICAgICkge1xyXG4gICAgICBwYXJhbU1heEZlYXR1cmVzID0gJ2NvdW50JztcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbWF4RmVhdHVyZXM7XHJcbiAgICBpZiAobmIgIT09IDUwMDApIHtcclxuICAgICAgbWF4RmVhdHVyZXMgPSBwYXJhbU1heEZlYXR1cmVzICsgJz0nICsgbmI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBtYXhGZWF0dXJlcyA9IHdmc0RhdGFTb3VyY2VPcHRpb25zLnBhcmFtc1dGUy5tYXhGZWF0dXJlc1xyXG4gICAgICAgID8gcGFyYW1NYXhGZWF0dXJlcyArICc9JyArIHdmc0RhdGFTb3VyY2VPcHRpb25zLnBhcmFtc1dGUy5tYXhGZWF0dXJlc1xyXG4gICAgICAgIDogcGFyYW1NYXhGZWF0dXJlcyArICc9JyArIG5iO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdXJsV2ZzID0gYCR7YmFzZVVybH0mJHtvdXRwdXRGb3JtYXR9JiR7c3JzbmFtZX0mJHttYXhGZWF0dXJlc30ke3dmc3Byb3BlcnR5bmFtZX1gO1xyXG4gICAgY29uc3QgcGF0dGVybkdtbCA9IG5ldyBSZWdFeHAoJy4qP2dtbC4qPycpO1xyXG4gICAgaWYgKFxyXG4gICAgICBwYXR0ZXJuR21sLnRlc3Qod2ZzRGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTLm91dHB1dEZvcm1hdC50b0xvd2VyQ2FzZSgpKVxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybFdmcywgeyByZXNwb25zZVR5cGU6ICd0ZXh0JyB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybFdmcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0VmFsdWVGcm9tV2ZzR2V0UHJvcGVydHlWYWx1ZXMoXHJcbiAgICB3ZnNEYXRhU291cmNlT3B0aW9uczogV0ZTRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgICBmaWVsZCxcclxuICAgIG1heEZlYXR1cmVzID0gMzAsXHJcbiAgICBzdGFydEluZGV4ID0gMCxcclxuICAgIHJldHJ5ID0gMFxyXG4gICk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZCA9PiB7XHJcbiAgICAgIGNvbnN0IG5iUmV0cnkgPSAyO1xyXG4gICAgICBjb25zdCB2YWx1ZUxpc3QgPSBbXTtcclxuXHJcbiAgICAgIHRoaXMud2ZzR2V0UHJvcGVydHlWYWx1ZShcclxuICAgICAgICB3ZnNEYXRhU291cmNlT3B0aW9ucyxcclxuICAgICAgICBmaWVsZCxcclxuICAgICAgICBtYXhGZWF0dXJlcyxcclxuICAgICAgICBzdGFydEluZGV4XHJcbiAgICAgICkuc3Vic2NyaWJlKFxyXG4gICAgICAgIHN0ciA9PiB7XHJcbiAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvJiMzOTsvZ2ksIFwiJ1wiKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxyXG4gICAgICAgICAgY29uc3QgcmVnZXhFeGNwID0gL2V4Y2VwdGlvbi9naTtcclxuICAgICAgICAgIGlmIChyZWdleEV4Y3AudGVzdChzdHIpKSB7XHJcbiAgICAgICAgICAgIHJldHJ5Kys7XHJcbiAgICAgICAgICAgIGlmIChyZXRyeSA8IG5iUmV0cnkpIHtcclxuICAgICAgICAgICAgICB0aGlzLmdldFZhbHVlRnJvbVdmc0dldFByb3BlcnR5VmFsdWVzKFxyXG4gICAgICAgICAgICAgICAgd2ZzRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICBmaWVsZCxcclxuICAgICAgICAgICAgICAgIG1heEZlYXR1cmVzLFxyXG4gICAgICAgICAgICAgICAgc3RhcnRJbmRleCxcclxuICAgICAgICAgICAgICAgIHJldHJ5XHJcbiAgICAgICAgICAgICAgKS5zdWJzY3JpYmUocmVwID0+IGQubmV4dChyZXApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWVSZWZlcmVuY2VSZWdleCA9IG5ldyBSZWdFeHAoXHJcbiAgICAgICAgICAgICAgJzwoLis/KScgKyBmaWVsZCArICc+KC4rPyk8LyguKz8pJyArIGZpZWxkICsgJz4nLFxyXG4gICAgICAgICAgICAgICdnaSdcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgbGV0IG4gPSB2YWx1ZVJlZmVyZW5jZVJlZ2V4LmV4ZWMoc3RyKTtcclxuICAgICAgICAgICAgd2hpbGUgKG4gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICBpZiAobi5pbmRleCA9PT0gdmFsdWVSZWZlcmVuY2VSZWdleC5sYXN0SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlUmVmZXJlbmNlUmVnZXgubGFzdEluZGV4Kys7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGlmICh2YWx1ZUxpc3QuaW5kZXhPZihuWzJdKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlTGlzdC5wdXNoKG5bMl0pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBuID0gdmFsdWVSZWZlcmVuY2VSZWdleC5leGVjKHN0cik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZC5uZXh0KHZhbHVlTGlzdCk7XHJcbiAgICAgICAgICAgIGQuY29tcGxldGUoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICBpZiAocmV0cnkgPCBuYlJldHJ5KSB7XHJcbiAgICAgICAgICAgIHJldHJ5Kys7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0VmFsdWVGcm9tV2ZzR2V0UHJvcGVydHlWYWx1ZXMoXHJcbiAgICAgICAgICAgICAgd2ZzRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgZmllbGQsXHJcbiAgICAgICAgICAgICAgbWF4RmVhdHVyZXMsXHJcbiAgICAgICAgICAgICAgc3RhcnRJbmRleCxcclxuICAgICAgICAgICAgICByZXRyeVxyXG4gICAgICAgICAgICApLnN1YnNjcmliZShyZXAgPT4gZC5uZXh0KHJlcCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgd2ZzR2V0Q2FwYWJpbGl0aWVzKG9wdGlvbnMpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgY29uc3QgYmFzZVdmc1F1ZXJ5ID0gJ3NlcnZpY2U9d2ZzJnJlcXVlc3Q9R2V0Q2FwYWJpbGl0aWVzJztcclxuICAgIGNvbnN0IHdmc1ZlcnNpb24gPSBvcHRpb25zLnZlcnNpb25cclxuICAgICAgPyAndmVyc2lvbj0nICsgb3B0aW9ucy52ZXJzaW9uXHJcbiAgICAgIDogJ3ZlcnNpb249JyArICcyLjAuMCc7XHJcbiAgICBjb25zdCB3ZnNHY1VybCA9IGAke29wdGlvbnMudXJsV2ZzfT8ke2Jhc2VXZnNRdWVyeX0mJHt3ZnNWZXJzaW9ufWA7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh3ZnNHY1VybCwge1xyXG4gICAgICBvYnNlcnZlOiAncmVzcG9uc2UnLFxyXG4gICAgICByZXNwb25zZVR5cGU6ICd0ZXh0J1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBkZWZpbmVGaWVsZEFuZFZhbHVlZnJvbVdGUyhcclxuICAgIHdmc0RhdGFTb3VyY2VPcHRpb25zOiBXRlNEYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZCA9PiB7XHJcbiAgICAgIGNvbnN0IHNvdXJjZUZpZWxkcyA9IFtdO1xyXG4gICAgICBsZXQgZmllbGRMaXN0O1xyXG4gICAgICBsZXQgZmllbGRMaXN0V29HZW9tO1xyXG4gICAgICBsZXQgZmllbGRMaXN0V29HZW9tU3RyO1xyXG4gICAgICBsZXQgb2xGb3JtYXRzO1xyXG4gICAgICBjb25zdCBwYXR0ZXJuR21sMyA9IC9nbWwvZ2k7XHJcbiAgICAgIGlmICh3ZnNEYXRhU291cmNlT3B0aW9ucy5wYXJhbXNXRlMub3V0cHV0Rm9ybWF0Lm1hdGNoKHBhdHRlcm5HbWwzKSkge1xyXG4gICAgICAgIG9sRm9ybWF0cyA9IG9sZm9ybWF0LldGUztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBvbEZvcm1hdHMgPSBvbGZvcm1hdC5HZW9KU09OO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAod2ZzRGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTLndmc0NhcGFiaWxpdGllcy5HZXRQcm9wZXJ0eVZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy53ZnNHZXRGZWF0dXJlKHdmc0RhdGFTb3VyY2VPcHRpb25zLCAxKS5zdWJzY3JpYmUob25lRmVhdHVyZSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBmZWF0dXJlcyA9IG5ldyBvbEZvcm1hdHMoKS5yZWFkRmVhdHVyZXMob25lRmVhdHVyZSk7XHJcbiAgICAgICAgICBmaWVsZExpc3QgPSBmZWF0dXJlc1swXS5nZXRLZXlzKCk7XHJcbiAgICAgICAgICBmaWVsZExpc3RXb0dlb20gPSBmaWVsZExpc3QuZmlsdGVyKFxyXG4gICAgICAgICAgICBmaWVsZCA9PlxyXG4gICAgICAgICAgICAgIGZpZWxkICE9PSBmZWF0dXJlc1swXS5nZXRHZW9tZXRyeU5hbWUoKSAmJlxyXG4gICAgICAgICAgICAgICFmaWVsZC5tYXRjaCgvYm91bmRlZGJ5L2dpKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGZpZWxkTGlzdFdvR2VvbVN0ciA9IGZpZWxkTGlzdFdvR2VvbS5qb2luKCcsJyk7XHJcbiAgICAgICAgICBmaWVsZExpc3RXb0dlb20uZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmllbGRUeXBlID1cclxuICAgICAgICAgICAgICB0eXBlb2YgZmVhdHVyZXNbMF0uZ2V0KGVsZW1lbnQpID09PSAnb2JqZWN0J1xyXG4gICAgICAgICAgICAgICAgPyB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgIDogdHlwZW9mIGZlYXR1cmVzWzBdLmdldChlbGVtZW50KTtcclxuICAgICAgICAgICAgdGhpcy5nZXRWYWx1ZUZyb21XZnNHZXRQcm9wZXJ0eVZhbHVlcyhcclxuICAgICAgICAgICAgICB3ZnNEYXRhU291cmNlT3B0aW9ucyxcclxuICAgICAgICAgICAgICBlbGVtZW50LFxyXG4gICAgICAgICAgICAgIDIwMFxyXG4gICAgICAgICAgICApLnN1YnNjcmliZSh2YWx1ZUxpc3QgPT4ge1xyXG4gICAgICAgICAgICAgIHNvdXJjZUZpZWxkcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IGVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICBhbGlhczogZWxlbWVudCxcclxuICAgICAgICAgICAgICAgIHZhbHVlczogdmFsdWVMaXN0XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgZC5uZXh0KHNvdXJjZUZpZWxkcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy53ZnNHZXRGZWF0dXJlKHdmc0RhdGFTb3VyY2VPcHRpb25zLCAxKS5zdWJzY3JpYmUob25lRmVhdHVyZSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBmZWF0dXJlcyA9IG5ldyBvbEZvcm1hdHMoKS5yZWFkRmVhdHVyZXMob25lRmVhdHVyZSk7XHJcbiAgICAgICAgICBmaWVsZExpc3QgPSBmZWF0dXJlc1swXS5nZXRLZXlzKCk7XHJcbiAgICAgICAgICBmaWVsZExpc3RXb0dlb20gPSBmaWVsZExpc3QuZmlsdGVyKFxyXG4gICAgICAgICAgICBmaWVsZCA9PlxyXG4gICAgICAgICAgICAgIGZpZWxkICE9PSBmZWF0dXJlc1swXS5nZXRHZW9tZXRyeU5hbWUoKSAmJlxyXG4gICAgICAgICAgICAgICFmaWVsZC5tYXRjaCgvYm91bmRlZGJ5L2dpKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGZpZWxkTGlzdFdvR2VvbVN0ciA9IGZpZWxkTGlzdFdvR2VvbS5qb2luKCcsJyk7XHJcbiAgICAgICAgICB0aGlzLndmc0dldEZlYXR1cmUoXHJcbiAgICAgICAgICAgIHdmc0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gICAgICAgICAgICAyMDAsXHJcbiAgICAgICAgICAgIDM4NTcsXHJcbiAgICAgICAgICAgIGZpZWxkTGlzdFdvR2VvbVN0clxyXG4gICAgICAgICAgKS5zdWJzY3JpYmUobWFueUZlYXR1cmVzID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbWZlYXR1cmVzID0gbmV3IG9sRm9ybWF0cygpLnJlYWRGZWF0dXJlcyhtYW55RmVhdHVyZXMpO1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWx0X3Byb3BlcnRpZXNfdmFsdWUobWZlYXR1cmVzKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICAgIHNvdXJjZUZpZWxkcy5wdXNoKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZC5uZXh0KHNvdXJjZUZpZWxkcyk7XHJcbiAgICAgICAgICAgIGQuY29tcGxldGUoKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB3ZnNHZXRQcm9wZXJ0eVZhbHVlKFxyXG4gICAgd2ZzRGF0YVNvdXJjZU9wdGlvbnM6IFdGU0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gICAgZmllbGQsXHJcbiAgICBtYXhGZWF0dXJlcyA9IDMwLFxyXG4gICAgc3RhcnRJbmRleCA9IDBcclxuICApOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgY29uc3QgYmFzZVdmc1F1ZXJ5ID1cclxuICAgICAgJ3NlcnZpY2U9d2ZzJnJlcXVlc3Q9R2V0UHJvcGVydHlWYWx1ZSZjb3VudD0nICsgbWF4RmVhdHVyZXM7XHJcbiAgICBjb25zdCB3ZnNUeXBlTmFtZSA9XHJcbiAgICAgICd0eXBlbmFtZXM9JyArIHdmc0RhdGFTb3VyY2VPcHRpb25zLnBhcmFtc1dGUy5mZWF0dXJlVHlwZXM7XHJcbiAgICBjb25zdCB3ZnNWYWx1ZVJlZmVyZW5jZSA9ICd2YWx1ZVJlZmVyZW5jZT0nICsgZmllbGQ7XHJcbiAgICBjb25zdCB3ZnNWZXJzaW9uID0gJ3ZlcnNpb249JyArICcyLjAuMCc7XHJcbiAgICBjb25zdCBnZnZVcmwgPSBgJHtcclxuICAgICAgd2ZzRGF0YVNvdXJjZU9wdGlvbnMudXJsV2ZzXHJcbiAgICB9PyR7YmFzZVdmc1F1ZXJ5fSYke3dmc1ZlcnNpb259JiR7d2ZzVHlwZU5hbWV9JiR7d2ZzVmFsdWVSZWZlcmVuY2V9YDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGdmdlVybCwgeyByZXNwb25zZVR5cGU6ICd0ZXh0JyB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYnVpbHRfcHJvcGVydGllc192YWx1ZShmZWF0dXJlczogb2xGZWF0dXJlW10pOiBzdHJpbmdbXSB7XHJcbiAgICBjb25zdCBrdiA9IE9iamVjdC5hc3NpZ24oe30sIGZlYXR1cmVzWzBdLmdldFByb3BlcnRpZXMoKSk7XHJcbiAgICBkZWxldGUga3ZbZmVhdHVyZXNbMF0uZ2V0R2VvbWV0cnlOYW1lKCldO1xyXG4gICAgZGVsZXRlIGt2LmJvdW5kZWRCeTtcclxuICAgIGNvbnN0IHNvdXJjZUZpZWxkcyA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBrdikge1xyXG4gICAgICBpZiAoa3YuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XHJcbiAgICAgICAgY29uc3QgZmllbGRUeXBlID1cclxuICAgICAgICAgIHR5cGVvZiBmZWF0dXJlc1swXS5nZXQocHJvcGVydHkpID09PSAnb2JqZWN0J1xyXG4gICAgICAgICAgICA/IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICA6IHR5cGVvZiBmZWF0dXJlc1swXS5nZXQocHJvcGVydHkpO1xyXG4gICAgICAgIHNvdXJjZUZpZWxkcy5wdXNoKHtcclxuICAgICAgICAgIG5hbWU6IHByb3BlcnR5LFxyXG4gICAgICAgICAgYWxpYXM6IHByb3BlcnR5LFxyXG4gICAgICAgICAgdHlwZTogZmllbGRUeXBlLFxyXG4gICAgICAgICAgdmFsdWVzOiBba3ZbcHJvcGVydHldXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmZWF0dXJlcy5ldmVyeSgoZWxlbWVudCkgPT4ge1xyXG4gICAgICBjb25zdCBmZWF0dXJlUHJvcGVydGllcyA9IGVsZW1lbnQuZ2V0UHJvcGVydGllcygpO1xyXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBmZWF0dXJlUHJvcGVydGllcykge1xyXG4gICAgICAgIGlmIChmZWF0dXJlUHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGtleSBpbiBrdikge1xyXG4gICAgICAgICAgc291cmNlRmllbGRzLmZpbHRlcihmID0+IGYubmFtZSA9PT0ga2V5KS5mb3JFYWNoKHYgPT4ge1xyXG4gICAgICAgICAgICBpZiAodi52YWx1ZXMuaW5kZXhPZihmZWF0dXJlUHJvcGVydGllc1trZXldKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICB2LnZhbHVlcy5wdXNoKGZlYXR1cmVQcm9wZXJ0aWVzW2tleV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBzb3VyY2VGaWVsZHM7XHJcbiAgfVxyXG59XHJcbiJdfQ==