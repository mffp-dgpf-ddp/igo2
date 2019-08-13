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
import { formatWFSQueryString, gmlRegex, defaultEpsg, defaultMaxFeatures } from './wms-wfs.utils';
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
        if (!datasource.sourceFields || datasource.sourceFields.length === 0) {
            datasource.sourceFields = [];
            this.defineFieldAndValuefromWFS(datasource).subscribe((/**
             * @param {?} getfeatureSourceField
             * @return {?}
             */
            function (getfeatureSourceField) {
                datasource.sourceFields = getfeatureSourceField;
            }));
        }
        else {
            this.defineFieldAndValuefromWFS(datasource).subscribe((/**
             * @param {?} getfeatureSourceField
             * @return {?}
             */
            function (getfeatureSourceField) {
                datasource.sourceFields.forEach((/**
                 * @param {?} sourcefield
                 * @return {?}
                 */
                function (sourcefield) {
                    if (sourcefield.alias === undefined) {
                        sourcefield.alias = sourcefield.name; // to allow only a list of sourcefield with names
                    }
                    if (sourcefield.values === undefined || sourcefield.values.length === 0) {
                        sourcefield.values = getfeatureSourceField.find((/**
                         * @param {?} sf
                         * @return {?}
                         */
                        function (sf) { return sf.name === sourcefield.name; })).values;
                    }
                }));
            }));
        }
    };
    /**
     * @private
     * @param {?} wfsDataSourceOptions
     * @param {?=} nb
     * @param {?=} epsgCode
     * @param {?=} propertyName
     * @return {?}
     */
    WFSService.prototype.wfsGetFeature = /**
     * @private
     * @param {?} wfsDataSourceOptions
     * @param {?=} nb
     * @param {?=} epsgCode
     * @param {?=} propertyName
     * @return {?}
     */
    function (wfsDataSourceOptions, nb, epsgCode, propertyName) {
        if (nb === void 0) { nb = defaultMaxFeatures; }
        if (epsgCode === void 0) { epsgCode = defaultEpsg; }
        /** @type {?} */
        var queryStringValues = formatWFSQueryString(wfsDataSourceOptions, nb, epsgCode, propertyName);
        /** @type {?} */
        var baseUrl = queryStringValues.find((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return f.name === 'getfeature'; })).value;
        /** @type {?} */
        var outputFormat = wfsDataSourceOptions.paramsWFS.outputFormat;
        if (gmlRegex.test(outputFormat) || !outputFormat) {
            return this.http.get(baseUrl, { responseType: 'text' });
        }
        else {
            return this.http.get(baseUrl);
        }
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
            var outputFormat = wfsDataSourceOptions.paramsWFS.outputFormat;
            if (gmlRegex.test(outputFormat) || !outputFormat) {
                olFormats = olformat.WFS;
            }
            else {
                olFormats = olformat.GeoJSON;
            }
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
                _this.wfsGetFeature(wfsDataSourceOptions, wfsDataSourceOptions.paramsWFS.maxFeatures || defaultMaxFeatures, undefined, fieldListWoGeomStr).subscribe((/**
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
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ZzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd2ZzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBR2xDLE9BQU8sS0FBSyxRQUFRLE1BQU0sV0FBVyxDQUFDO0FBR3RDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7QUFFakc7SUFHZ0Msc0NBQVc7SUFDekMsb0JBQW9CLElBQWdCO1FBQXBDLFlBQ0UsaUJBQU8sU0FDUjtRQUZtQixVQUFJLEdBQUosSUFBSSxDQUFZOztJQUVwQyxDQUFDOzs7O0lBRUQsNEJBQU87OztJQUFQO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1FBQ2hELE9BQU8sa0NBQWtDLENBQUM7SUFDNUMsQ0FBQzs7Ozs7SUFFTSwyQ0FBc0I7Ozs7SUFBN0IsVUFBOEIsVUFBVTtRQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksSUFBSSxVQUFVLENBQUMsWUFBWSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUc7WUFDckUsVUFBVSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFVBQVUsQ0FBQyxDQUFDLFNBQVM7Ozs7WUFBQyxVQUFBLHFCQUFxQjtnQkFDekUsVUFBVSxDQUFDLFlBQVksR0FBRyxxQkFBcUIsQ0FBQztZQUNsRCxDQUFD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QztJQUN0QixDQUFDOztnQkEvSEYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFaUSxVQUFVOzs7cUJBRG5CO0NBMklDLEFBaElELENBR2dDLFdBQVcsR0E2SDFDO1NBN0hZLFVBQVU7Ozs7OztJQUNULDBCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IG9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuaW1wb3J0ICogYXMgb2xmb3JtYXQgZnJvbSAnb2wvZm9ybWF0JztcclxuXHJcbmltcG9ydCB7IFdGU0RhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi93ZnMtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4vZGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgZm9ybWF0V0ZTUXVlcnlTdHJpbmcsIGdtbFJlZ2V4LCBkZWZhdWx0RXBzZywgZGVmYXVsdE1heEZlYXR1cmVzfSBmcm9tICcuL3dtcy13ZnMudXRpbHMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgV0ZTU2VydmljZSBleHRlbmRzIERhdGFTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBnZXREYXRhKCkge1xyXG4gICAgY29uc29sZS5sb2coJ1RoaXMgaXMgZGVmaW5pbmcgYSBkYXRhIHNlcnZpY2UuJyk7XHJcbiAgICByZXR1cm4gJ1RoaXMgaXMgZGVmaW5pbmcgYSBkYXRhIHNlcnZpY2UuJztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRTb3VyY2VGaWVsZHNGcm9tV0ZTKGRhdGFzb3VyY2UpIHtcclxuICAgIGlmICghZGF0YXNvdXJjZS5zb3VyY2VGaWVsZHMgfHwgZGF0YXNvdXJjZS5zb3VyY2VGaWVsZHMubGVuZ3RoID09PSAwICkge1xyXG4gICAgICBkYXRhc291cmNlLnNvdXJjZUZpZWxkcyA9IFtdO1xyXG4gICAgICB0aGlzLmRlZmluZUZpZWxkQW5kVmFsdWVmcm9tV0ZTKGRhdGFzb3VyY2UpLnN1YnNjcmliZShnZXRmZWF0dXJlU291cmNlRmllbGQgPT4ge1xyXG4gICAgICAgIGRhdGFzb3VyY2Uuc291cmNlRmllbGRzID0gZ2V0ZmVhdHVyZVNvdXJjZUZpZWxkO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmRlZmluZUZpZWxkQW5kVmFsdWVmcm9tV0ZTKGRhdGFzb3VyY2UpLnN1YnNjcmliZShnZXRmZWF0dXJlU291cmNlRmllbGQgPT4ge1xyXG4gICAgICAgIGRhdGFzb3VyY2Uuc291cmNlRmllbGRzLmZvckVhY2goc291cmNlZmllbGQgPT4ge1xyXG4gICAgICAgICAgaWYgKHNvdXJjZWZpZWxkLmFsaWFzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgc291cmNlZmllbGQuYWxpYXMgPSBzb3VyY2VmaWVsZC5uYW1lOyAvLyB0byBhbGxvdyBvbmx5IGEgbGlzdCBvZiBzb3VyY2VmaWVsZCB3aXRoIG5hbWVzXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoc291cmNlZmllbGQudmFsdWVzID09PSB1bmRlZmluZWQgfHwgc291cmNlZmllbGQudmFsdWVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBzb3VyY2VmaWVsZC52YWx1ZXMgPSBnZXRmZWF0dXJlU291cmNlRmllbGQuZmluZChzZiA9PiBzZi5uYW1lID09PSBzb3VyY2VmaWVsZC5uYW1lKS52YWx1ZXM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB3ZnNHZXRGZWF0dXJlKFxyXG4gICAgd2ZzRGF0YVNvdXJjZU9wdGlvbnM6IFdGU0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gICAgbmI6IG51bWJlciA9IGRlZmF1bHRNYXhGZWF0dXJlcyxcclxuICAgIGVwc2dDb2RlOiBzdHJpbmcgPSBkZWZhdWx0RXBzZyxcclxuICAgIHByb3BlcnR5TmFtZT86IHN0cmluZ1xyXG4gICk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBjb25zdCBxdWVyeVN0cmluZ1ZhbHVlcyA9IGZvcm1hdFdGU1F1ZXJ5U3RyaW5nKHdmc0RhdGFTb3VyY2VPcHRpb25zLCBuYiwgZXBzZ0NvZGUsIHByb3BlcnR5TmFtZSk7XHJcbiAgICBjb25zdCBiYXNlVXJsID0gcXVlcnlTdHJpbmdWYWx1ZXMuZmluZChmID0+IGYubmFtZSA9PT0gJ2dldGZlYXR1cmUnKS52YWx1ZTtcclxuICAgIGNvbnN0IG91dHB1dEZvcm1hdCA9IHdmc0RhdGFTb3VyY2VPcHRpb25zLnBhcmFtc1dGUy5vdXRwdXRGb3JtYXQ7XHJcbiAgICBpZiAoZ21sUmVnZXgudGVzdChvdXRwdXRGb3JtYXQpIHx8ICFvdXRwdXRGb3JtYXQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYmFzZVVybCwgeyByZXNwb25zZVR5cGU6ICd0ZXh0JyB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGJhc2VVcmwpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGVmaW5lRmllbGRBbmRWYWx1ZWZyb21XRlMoXHJcbiAgICB3ZnNEYXRhU291cmNlT3B0aW9uczogV0ZTRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGQgPT4ge1xyXG4gICAgICBjb25zdCBzb3VyY2VGaWVsZHMgPSBbXTtcclxuICAgICAgbGV0IGZpZWxkTGlzdDtcclxuICAgICAgbGV0IGZpZWxkTGlzdFdvR2VvbTtcclxuICAgICAgbGV0IGZpZWxkTGlzdFdvR2VvbVN0cjtcclxuICAgICAgbGV0IG9sRm9ybWF0cztcclxuICAgICAgY29uc3Qgb3V0cHV0Rm9ybWF0ID0gd2ZzRGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTLm91dHB1dEZvcm1hdDtcclxuXHJcbiAgICAgIGlmIChnbWxSZWdleC50ZXN0KG91dHB1dEZvcm1hdCkgfHwgIW91dHB1dEZvcm1hdCkge1xyXG4gICAgICAgIG9sRm9ybWF0cyA9IG9sZm9ybWF0LldGUztcclxuICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG9sRm9ybWF0cyA9IG9sZm9ybWF0Lkdlb0pTT047XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMud2ZzR2V0RmVhdHVyZSh3ZnNEYXRhU291cmNlT3B0aW9ucywgMSkuc3Vic2NyaWJlKG9uZUZlYXR1cmUgPT4ge1xyXG4gICAgICAgIGNvbnN0IGZlYXR1cmVzID0gbmV3IG9sRm9ybWF0cygpLnJlYWRGZWF0dXJlcyhvbmVGZWF0dXJlKTtcclxuICAgICAgICBmaWVsZExpc3QgPSBmZWF0dXJlc1swXS5nZXRLZXlzKCk7XHJcbiAgICAgICAgZmllbGRMaXN0V29HZW9tID0gZmllbGRMaXN0LmZpbHRlcihcclxuICAgICAgICAgIGZpZWxkID0+XHJcbiAgICAgICAgICAgIGZpZWxkICE9PSBmZWF0dXJlc1swXS5nZXRHZW9tZXRyeU5hbWUoKSAmJlxyXG4gICAgICAgICAgICAhZmllbGQubWF0Y2goL2JvdW5kZWRieS9naSlcclxuICAgICAgICApO1xyXG4gICAgICAgIGZpZWxkTGlzdFdvR2VvbVN0ciA9IGZpZWxkTGlzdFdvR2VvbS5qb2luKCcsJyk7XHJcbiAgICAgICAgdGhpcy53ZnNHZXRGZWF0dXJlKFxyXG4gICAgICAgICAgd2ZzRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgICAgICAgICB3ZnNEYXRhU291cmNlT3B0aW9ucy5wYXJhbXNXRlMubWF4RmVhdHVyZXMgfHwgZGVmYXVsdE1heEZlYXR1cmVzLFxyXG4gICAgICAgICAgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgZmllbGRMaXN0V29HZW9tU3RyXHJcbiAgICAgICAgKS5zdWJzY3JpYmUobWFueUZlYXR1cmVzID0+IHtcclxuICAgICAgICAgIGNvbnN0IG1mZWF0dXJlcyA9IG5ldyBvbEZvcm1hdHMoKS5yZWFkRmVhdHVyZXMobWFueUZlYXR1cmVzKTtcclxuICAgICAgICAgIHRoaXMuYnVpbHRfcHJvcGVydGllc192YWx1ZShtZmVhdHVyZXMpLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIHNvdXJjZUZpZWxkcy5wdXNoKGVsZW1lbnQpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBkLm5leHQoc291cmNlRmllbGRzKTtcclxuICAgICAgICAgIGQuY29tcGxldGUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGJ1aWx0X3Byb3BlcnRpZXNfdmFsdWUoZmVhdHVyZXM6IG9sRmVhdHVyZVtdKTogc3RyaW5nW10ge1xyXG4gICAgY29uc3Qga3YgPSBPYmplY3QuYXNzaWduKHt9LCBmZWF0dXJlc1swXS5nZXRQcm9wZXJ0aWVzKCkpO1xyXG4gICAgZGVsZXRlIGt2W2ZlYXR1cmVzWzBdLmdldEdlb21ldHJ5TmFtZSgpXTtcclxuICAgIGRlbGV0ZSBrdi5ib3VuZGVkQnk7XHJcbiAgICBjb25zdCBzb3VyY2VGaWVsZHMgPSBbXTtcclxuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4ga3YpIHtcclxuICAgICAgaWYgKGt2Lmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xyXG4gICAgICAgIGNvbnN0IGZpZWxkVHlwZSA9XHJcbiAgICAgICAgICB0eXBlb2YgZmVhdHVyZXNbMF0uZ2V0KHByb3BlcnR5KSA9PT0gJ29iamVjdCdcclxuICAgICAgICAgICAgPyB1bmRlZmluZWRcclxuICAgICAgICAgICAgOiB0eXBlb2YgZmVhdHVyZXNbMF0uZ2V0KHByb3BlcnR5KTtcclxuICAgICAgICBzb3VyY2VGaWVsZHMucHVzaCh7XHJcbiAgICAgICAgICBuYW1lOiBwcm9wZXJ0eSxcclxuICAgICAgICAgIGFsaWFzOiBwcm9wZXJ0eSxcclxuICAgICAgICAgIHR5cGU6IGZpZWxkVHlwZSxcclxuICAgICAgICAgIHZhbHVlczogW2t2W3Byb3BlcnR5XV1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZmVhdHVyZXMuZXZlcnkoKGVsZW1lbnQpID0+IHtcclxuICAgICAgY29uc3QgZmVhdHVyZVByb3BlcnRpZXMgPSBlbGVtZW50LmdldFByb3BlcnRpZXMoKTtcclxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gZmVhdHVyZVByb3BlcnRpZXMpIHtcclxuICAgICAgICBpZiAoZmVhdHVyZVByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBrZXkgaW4ga3YpIHtcclxuICAgICAgICAgIHNvdXJjZUZpZWxkcy5maWx0ZXIoZiA9PiBmLm5hbWUgPT09IGtleSkuZm9yRWFjaCh2ID0+IHtcclxuICAgICAgICAgICAgaWYgKHYudmFsdWVzLmluZGV4T2YoZmVhdHVyZVByb3BlcnRpZXNba2V5XSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgdi52YWx1ZXMucHVzaChmZWF0dXJlUHJvcGVydGllc1trZXldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gc291cmNlRmllbGRzO1xyXG4gIH1cclxufVxyXG4iXX0=