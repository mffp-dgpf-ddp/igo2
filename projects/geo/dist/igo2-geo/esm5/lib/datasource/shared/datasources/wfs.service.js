/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { formatWFSQueryString, gmlRegex, defaultEpsg, defaultMaxFeatures, getFormatFromOptions } from './wms-wfs.utils';
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
     * @param {?} dataSourceOptions
     * @return {?}
     */
    WFSService.prototype.getSourceFieldsFromWFS = /**
     * @param {?} dataSourceOptions
     * @return {?}
     */
    function (dataSourceOptions) {
        if (!dataSourceOptions.sourceFields || dataSourceOptions.sourceFields.length === 0) {
            dataSourceOptions.sourceFields = [];
            this.defineFieldAndValuefromWFS(dataSourceOptions).subscribe((/**
             * @param {?} getfeatureSourceField
             * @return {?}
             */
            function (getfeatureSourceField) {
                dataSourceOptions.sourceFields = getfeatureSourceField;
            }));
        }
        else {
            this.defineFieldAndValuefromWFS(dataSourceOptions).subscribe((/**
             * @param {?} getfeatureSourceField
             * @return {?}
             */
            function (getfeatureSourceField) {
                dataSourceOptions.sourceFields.forEach((/**
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
     * @param {?} dataSourceOptions
     * @param {?=} nb
     * @param {?=} epsgCode
     * @param {?=} propertyName
     * @return {?}
     */
    WFSService.prototype.wfsGetFeature = /**
     * @private
     * @param {?} dataSourceOptions
     * @param {?=} nb
     * @param {?=} epsgCode
     * @param {?=} propertyName
     * @return {?}
     */
    function (dataSourceOptions, nb, epsgCode, propertyName) {
        if (nb === void 0) { nb = defaultMaxFeatures; }
        if (epsgCode === void 0) { epsgCode = defaultEpsg; }
        /** @type {?} */
        var queryStringValues = formatWFSQueryString(dataSourceOptions, nb, epsgCode, propertyName);
        /** @type {?} */
        var baseUrl = queryStringValues.find((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return f.name === 'getfeature'; })).value;
        /** @type {?} */
        var outputFormat = dataSourceOptions.paramsWFS.outputFormat;
        if (gmlRegex.test(outputFormat) || !outputFormat) {
            return this.http.get(baseUrl, { responseType: 'text' });
        }
        else {
            return this.http.get(baseUrl);
        }
    };
    /**
     * @param {?} dataSourceOptions
     * @return {?}
     */
    WFSService.prototype.defineFieldAndValuefromWFS = /**
     * @param {?} dataSourceOptions
     * @return {?}
     */
    function (dataSourceOptions) {
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
            olFormats = getFormatFromOptions(dataSourceOptions);
            _this.wfsGetFeature(dataSourceOptions, 1).subscribe((/**
             * @param {?} oneFeature
             * @return {?}
             */
            function (oneFeature) {
                /** @type {?} */
                var features = olFormats.readFeatures(oneFeature);
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
                _this.wfsGetFeature(dataSourceOptions, dataSourceOptions.paramsWFS.maxFeatures || defaultMaxFeatures, undefined, fieldListWoGeomStr).subscribe((/**
                 * @param {?} manyFeatures
                 * @return {?}
                 */
                function (manyFeatures) {
                    /** @type {?} */
                    var mfeatures = olFormats.readFeatures(manyFeatures);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ZzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd2ZzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBS2xDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsb0JBQW9CLEVBQ25CLFFBQVEsRUFDUixXQUFXLEVBQ1gsa0JBQWtCLEVBQ2xCLG9CQUFvQixFQUFDLE1BQU0saUJBQWlCLENBQUM7OztBQUV2RDtJQUdnQyxzQ0FBVztJQUN6QyxvQkFBb0IsSUFBZ0I7UUFBcEMsWUFDRSxpQkFBTyxTQUNSO1FBRm1CLFVBQUksR0FBSixJQUFJLENBQVk7O0lBRXBDLENBQUM7Ozs7SUFFRCw0QkFBTzs7O0lBQVA7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7UUFDaEQsT0FBTyxrQ0FBa0MsQ0FBQztJQUM1QyxDQUFDOzs7OztJQUVNLDJDQUFzQjs7OztJQUE3QixVQUE4QixpQkFBOEQ7UUFDMUYsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksSUFBSSxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRztZQUNuRixpQkFBaUIsQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQ3BDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFNBQVM7Ozs7WUFBQyxVQUFBLHFCQUFxQjtnQkFDaEYsaUJBQWlCLENBQUMsWUFBWSxHQUFHLHFCQUFxQixDQUFDO1lBQ3pELENBQUMsRUFBQyxDQUFD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bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgb2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5pbXBvcnQgKiBhcyBvbGZvcm1hdCBmcm9tICdvbC9mb3JtYXQnO1xyXG5pbXBvcnQgeyBXRlNEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4vd2ZzLWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgV01TRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuL3dtcy1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi9kYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBmb3JtYXRXRlNRdWVyeVN0cmluZyxcclxuICAgICAgICAgIGdtbFJlZ2V4LFxyXG4gICAgICAgICAgZGVmYXVsdEVwc2csXHJcbiAgICAgICAgICBkZWZhdWx0TWF4RmVhdHVyZXMsXHJcbiAgICAgICAgICBnZXRGb3JtYXRGcm9tT3B0aW9uc30gZnJvbSAnLi93bXMtd2ZzLnV0aWxzJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFdGU1NlcnZpY2UgZXh0ZW5kcyBEYXRhU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGF0YSgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdUaGlzIGlzIGRlZmluaW5nIGEgZGF0YSBzZXJ2aWNlLicpO1xyXG4gICAgcmV0dXJuICdUaGlzIGlzIGRlZmluaW5nIGEgZGF0YSBzZXJ2aWNlLic7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0U291cmNlRmllbGRzRnJvbVdGUyhkYXRhU291cmNlT3B0aW9uczogV0ZTRGF0YVNvdXJjZU9wdGlvbnMgfCBXTVNEYXRhU291cmNlT3B0aW9ucykge1xyXG4gICAgaWYgKCFkYXRhU291cmNlT3B0aW9ucy5zb3VyY2VGaWVsZHMgfHwgZGF0YVNvdXJjZU9wdGlvbnMuc291cmNlRmllbGRzLmxlbmd0aCA9PT0gMCApIHtcclxuICAgICAgZGF0YVNvdXJjZU9wdGlvbnMuc291cmNlRmllbGRzID0gW107XHJcbiAgICAgIHRoaXMuZGVmaW5lRmllbGRBbmRWYWx1ZWZyb21XRlMoZGF0YVNvdXJjZU9wdGlvbnMpLnN1YnNjcmliZShnZXRmZWF0dXJlU291cmNlRmllbGQgPT4ge1xyXG4gICAgICAgIGRhdGFTb3VyY2VPcHRpb25zLnNvdXJjZUZpZWxkcyA9IGdldGZlYXR1cmVTb3VyY2VGaWVsZDtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5kZWZpbmVGaWVsZEFuZFZhbHVlZnJvbVdGUyhkYXRhU291cmNlT3B0aW9ucykuc3Vic2NyaWJlKGdldGZlYXR1cmVTb3VyY2VGaWVsZCA9PiB7XHJcbiAgICAgICAgZGF0YVNvdXJjZU9wdGlvbnMuc291cmNlRmllbGRzLmZvckVhY2goc291cmNlZmllbGQgPT4ge1xyXG4gICAgICAgICAgaWYgKHNvdXJjZWZpZWxkLmFsaWFzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgc291cmNlZmllbGQuYWxpYXMgPSBzb3VyY2VmaWVsZC5uYW1lOyAvLyB0byBhbGxvdyBvbmx5IGEgbGlzdCBvZiBzb3VyY2VmaWVsZCB3aXRoIG5hbWVzXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoc291cmNlZmllbGQudmFsdWVzID09PSB1bmRlZmluZWQgfHwgc291cmNlZmllbGQudmFsdWVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBzb3VyY2VmaWVsZC52YWx1ZXMgPSBnZXRmZWF0dXJlU291cmNlRmllbGQuZmluZChzZiA9PiBzZi5uYW1lID09PSBzb3VyY2VmaWVsZC5uYW1lKS52YWx1ZXM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB3ZnNHZXRGZWF0dXJlKFxyXG4gICAgZGF0YVNvdXJjZU9wdGlvbnM6IFdGU0RhdGFTb3VyY2VPcHRpb25zIHwgV01TRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgICBuYjogbnVtYmVyID0gZGVmYXVsdE1heEZlYXR1cmVzLFxyXG4gICAgZXBzZ0NvZGU6IHN0cmluZyA9IGRlZmF1bHRFcHNnLFxyXG4gICAgcHJvcGVydHlOYW1lPzogc3RyaW5nXHJcbiAgKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IHF1ZXJ5U3RyaW5nVmFsdWVzID0gZm9ybWF0V0ZTUXVlcnlTdHJpbmcoZGF0YVNvdXJjZU9wdGlvbnMsIG5iLCBlcHNnQ29kZSwgcHJvcGVydHlOYW1lKTtcclxuICAgIGNvbnN0IGJhc2VVcmwgPSBxdWVyeVN0cmluZ1ZhbHVlcy5maW5kKGYgPT4gZi5uYW1lID09PSAnZ2V0ZmVhdHVyZScpLnZhbHVlO1xyXG4gICAgY29uc3Qgb3V0cHV0Rm9ybWF0ID0gZGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTLm91dHB1dEZvcm1hdDtcclxuICAgIGlmIChnbWxSZWdleC50ZXN0KG91dHB1dEZvcm1hdCkgfHwgIW91dHB1dEZvcm1hdCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwLmdldChiYXNlVXJsLCB7IHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYmFzZVVybCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkZWZpbmVGaWVsZEFuZFZhbHVlZnJvbVdGUyhcclxuICAgIGRhdGFTb3VyY2VPcHRpb25zOiBXRlNEYXRhU291cmNlT3B0aW9ucyB8IFdNU0RhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkID0+IHtcclxuICAgICAgY29uc3Qgc291cmNlRmllbGRzID0gW107XHJcbiAgICAgIGxldCBmaWVsZExpc3Q7XHJcbiAgICAgIGxldCBmaWVsZExpc3RXb0dlb207XHJcbiAgICAgIGxldCBmaWVsZExpc3RXb0dlb21TdHI7XHJcbiAgICAgIGxldCBvbEZvcm1hdHM7XHJcblxyXG4gICAgICBvbEZvcm1hdHMgPSBnZXRGb3JtYXRGcm9tT3B0aW9ucyhkYXRhU291cmNlT3B0aW9ucyk7XHJcblxyXG4gICAgICB0aGlzLndmc0dldEZlYXR1cmUoZGF0YVNvdXJjZU9wdGlvbnMsIDEpLnN1YnNjcmliZShvbmVGZWF0dXJlID0+IHtcclxuICAgICAgICBjb25zdCBmZWF0dXJlcyA9IG9sRm9ybWF0cy5yZWFkRmVhdHVyZXMob25lRmVhdHVyZSk7XHJcbiAgICAgICAgZmllbGRMaXN0ID0gZmVhdHVyZXNbMF0uZ2V0S2V5cygpO1xyXG4gICAgICAgIGZpZWxkTGlzdFdvR2VvbSA9IGZpZWxkTGlzdC5maWx0ZXIoXHJcbiAgICAgICAgICBmaWVsZCA9PlxyXG4gICAgICAgICAgICBmaWVsZCAhPT0gZmVhdHVyZXNbMF0uZ2V0R2VvbWV0cnlOYW1lKCkgJiZcclxuICAgICAgICAgICAgIWZpZWxkLm1hdGNoKC9ib3VuZGVkYnkvZ2kpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBmaWVsZExpc3RXb0dlb21TdHIgPSBmaWVsZExpc3RXb0dlb20uam9pbignLCcpO1xyXG4gICAgICAgIHRoaXMud2ZzR2V0RmVhdHVyZShcclxuICAgICAgICAgIGRhdGFTb3VyY2VPcHRpb25zLFxyXG4gICAgICAgICAgZGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTLm1heEZlYXR1cmVzIHx8IGRlZmF1bHRNYXhGZWF0dXJlcyxcclxuICAgICAgICAgIHVuZGVmaW5lZCxcclxuICAgICAgICAgIGZpZWxkTGlzdFdvR2VvbVN0clxyXG4gICAgICAgICkuc3Vic2NyaWJlKG1hbnlGZWF0dXJlcyA9PiB7XHJcbiAgICAgICAgICBjb25zdCBtZmVhdHVyZXMgPSBvbEZvcm1hdHMucmVhZEZlYXR1cmVzKG1hbnlGZWF0dXJlcyk7XHJcbiAgICAgICAgICB0aGlzLmJ1aWx0X3Byb3BlcnRpZXNfdmFsdWUobWZlYXR1cmVzKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBzb3VyY2VGaWVsZHMucHVzaChlbGVtZW50KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgZC5uZXh0KHNvdXJjZUZpZWxkcyk7XHJcbiAgICAgICAgICBkLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBidWlsdF9wcm9wZXJ0aWVzX3ZhbHVlKGZlYXR1cmVzOiBvbEZlYXR1cmVbXSk6IHN0cmluZ1tdIHtcclxuICAgIGNvbnN0IGt2ID0gT2JqZWN0LmFzc2lnbih7fSwgZmVhdHVyZXNbMF0uZ2V0UHJvcGVydGllcygpKTtcclxuICAgIGRlbGV0ZSBrdltmZWF0dXJlc1swXS5nZXRHZW9tZXRyeU5hbWUoKV07XHJcbiAgICBkZWxldGUga3YuYm91bmRlZEJ5O1xyXG4gICAgY29uc3Qgc291cmNlRmllbGRzID0gW107XHJcbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIGt2KSB7XHJcbiAgICAgIGlmIChrdi5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcclxuICAgICAgICBjb25zdCBmaWVsZFR5cGUgPVxyXG4gICAgICAgICAgdHlwZW9mIGZlYXR1cmVzWzBdLmdldChwcm9wZXJ0eSkgPT09ICdvYmplY3QnXHJcbiAgICAgICAgICAgID8gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIDogdHlwZW9mIGZlYXR1cmVzWzBdLmdldChwcm9wZXJ0eSk7XHJcbiAgICAgICAgc291cmNlRmllbGRzLnB1c2goe1xyXG4gICAgICAgICAgbmFtZTogcHJvcGVydHksXHJcbiAgICAgICAgICBhbGlhczogcHJvcGVydHksXHJcbiAgICAgICAgICB0eXBlOiBmaWVsZFR5cGUsXHJcbiAgICAgICAgICB2YWx1ZXM6IFtrdltwcm9wZXJ0eV1dXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGZlYXR1cmVzLmV2ZXJ5KChlbGVtZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IGZlYXR1cmVQcm9wZXJ0aWVzID0gZWxlbWVudC5nZXRQcm9wZXJ0aWVzKCk7XHJcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGZlYXR1cmVQcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgaWYgKGZlYXR1cmVQcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KGtleSkgJiYga2V5IGluIGt2KSB7XHJcbiAgICAgICAgICBzb3VyY2VGaWVsZHMuZmlsdGVyKGYgPT4gZi5uYW1lID09PSBrZXkpLmZvckVhY2godiA9PiB7XHJcbiAgICAgICAgICAgIGlmICh2LnZhbHVlcy5pbmRleE9mKGZlYXR1cmVQcm9wZXJ0aWVzW2tleV0pID09PSAtMSkge1xyXG4gICAgICAgICAgICAgIHYudmFsdWVzLnB1c2goZmVhdHVyZVByb3BlcnRpZXNba2V5XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHNvdXJjZUZpZWxkcztcclxuICB9XHJcbn1cclxuIl19