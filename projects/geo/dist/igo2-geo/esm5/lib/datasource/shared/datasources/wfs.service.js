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
                _this.wfsGetFeature(dataSourceOptions, dataSourceOptions.paramsWFS.maxFeatures || defaultMaxFeatures, dataSourceOptions.paramsWFS.srsName, fieldListWoGeomStr).subscribe((/**
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ZzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd2ZzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBS2xDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsb0JBQW9CLEVBQ25CLFFBQVEsRUFDUixXQUFXLEVBQ1gsa0JBQWtCLEVBQ2xCLG9CQUFvQixFQUFDLE1BQU0saUJBQWlCLENBQUM7OztBQUV2RDtJQUdnQyxzQ0FBVztJQUN6QyxvQkFBb0IsSUFBZ0I7UUFBcEMsWUFDRSxpQkFBTyxTQUNSO1FBRm1CLFVBQUksR0FBSixJQUFJLENBQVk7O0lBRXBDLENBQUM7Ozs7SUFFRCw0QkFBTzs7O0lBQVA7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7UUFDaEQsT0FBTyxrQ0FBa0MsQ0FBQztJQUM1QyxDQUFDOzs7OztJQUVNLDJDQUFzQjs7OztJQUE3QixVQUE4QixpQkFBOEQ7UUFDMUYsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksSUFBSSxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRztZQUNuRixpQkFBaUIsQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQ3BDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFNBQVM7Ozs7WUFBQyxVQUFBLHFCQUFxQjtnQkFDaEYsaUJBQWlCLENBQUMsWUFBWSxHQUFHLHFCQUFxQixDQUFDO1lBQ3pELENBQUMsRUFBQyxDQUFD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bnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCBvbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCAqIGFzIG9sZm9ybWF0IGZyb20gJ29sL2Zvcm1hdCc7XHJcbmltcG9ydCB7IFdGU0RhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi93ZnMtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBXTVNEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4vd21zLWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuL2RhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IGZvcm1hdFdGU1F1ZXJ5U3RyaW5nLFxyXG4gICAgICAgICAgZ21sUmVnZXgsXHJcbiAgICAgICAgICBkZWZhdWx0RXBzZyxcclxuICAgICAgICAgIGRlZmF1bHRNYXhGZWF0dXJlcyxcclxuICAgICAgICAgIGdldEZvcm1hdEZyb21PcHRpb25zfSBmcm9tICcuL3dtcy13ZnMudXRpbHMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgV0ZTU2VydmljZSBleHRlbmRzIERhdGFTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBnZXREYXRhKCkge1xyXG4gICAgY29uc29sZS5sb2coJ1RoaXMgaXMgZGVmaW5pbmcgYSBkYXRhIHNlcnZpY2UuJyk7XHJcbiAgICByZXR1cm4gJ1RoaXMgaXMgZGVmaW5pbmcgYSBkYXRhIHNlcnZpY2UuJztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRTb3VyY2VGaWVsZHNGcm9tV0ZTKGRhdGFTb3VyY2VPcHRpb25zOiBXRlNEYXRhU291cmNlT3B0aW9ucyB8IFdNU0RhdGFTb3VyY2VPcHRpb25zKSB7XHJcbiAgICBpZiAoIWRhdGFTb3VyY2VPcHRpb25zLnNvdXJjZUZpZWxkcyB8fCBkYXRhU291cmNlT3B0aW9ucy5zb3VyY2VGaWVsZHMubGVuZ3RoID09PSAwICkge1xyXG4gICAgICBkYXRhU291cmNlT3B0aW9ucy5zb3VyY2VGaWVsZHMgPSBbXTtcclxuICAgICAgdGhpcy5kZWZpbmVGaWVsZEFuZFZhbHVlZnJvbVdGUyhkYXRhU291cmNlT3B0aW9ucykuc3Vic2NyaWJlKGdldGZlYXR1cmVTb3VyY2VGaWVsZCA9PiB7XHJcbiAgICAgICAgZGF0YVNvdXJjZU9wdGlvbnMuc291cmNlRmllbGRzID0gZ2V0ZmVhdHVyZVNvdXJjZUZpZWxkO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmRlZmluZUZpZWxkQW5kVmFsdWVmcm9tV0ZTKGRhdGFTb3VyY2VPcHRpb25zKS5zdWJzY3JpYmUoZ2V0ZmVhdHVyZVNvdXJjZUZpZWxkID0+IHtcclxuICAgICAgICBkYXRhU291cmNlT3B0aW9ucy5zb3VyY2VGaWVsZHMuZm9yRWFjaChzb3VyY2VmaWVsZCA9PiB7XHJcbiAgICAgICAgICBpZiAoc291cmNlZmllbGQuYWxpYXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBzb3VyY2VmaWVsZC5hbGlhcyA9IHNvdXJjZWZpZWxkLm5hbWU7IC8vIHRvIGFsbG93IG9ubHkgYSBsaXN0IG9mIHNvdXJjZWZpZWxkIHdpdGggbmFtZXNcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChzb3VyY2VmaWVsZC52YWx1ZXMgPT09IHVuZGVmaW5lZCB8fCBzb3VyY2VmaWVsZC52YWx1ZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHNvdXJjZWZpZWxkLnZhbHVlcyA9IGdldGZlYXR1cmVTb3VyY2VGaWVsZC5maW5kKHNmID0+IHNmLm5hbWUgPT09IHNvdXJjZWZpZWxkLm5hbWUpLnZhbHVlcztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHdmc0dldEZlYXR1cmUoXHJcbiAgICBkYXRhU291cmNlT3B0aW9uczogV0ZTRGF0YVNvdXJjZU9wdGlvbnMgfCBXTVNEYXRhU291cmNlT3B0aW9ucyxcclxuICAgIG5iOiBudW1iZXIgPSBkZWZhdWx0TWF4RmVhdHVyZXMsXHJcbiAgICBlcHNnQ29kZTogc3RyaW5nID0gZGVmYXVsdEVwc2csXHJcbiAgICBwcm9wZXJ0eU5hbWU/OiBzdHJpbmdcclxuICApOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgY29uc3QgcXVlcnlTdHJpbmdWYWx1ZXMgPSBmb3JtYXRXRlNRdWVyeVN0cmluZyhkYXRhU291cmNlT3B0aW9ucywgbmIsIGVwc2dDb2RlLCBwcm9wZXJ0eU5hbWUpO1xyXG4gICAgY29uc3QgYmFzZVVybCA9IHF1ZXJ5U3RyaW5nVmFsdWVzLmZpbmQoZiA9PiBmLm5hbWUgPT09ICdnZXRmZWF0dXJlJykudmFsdWU7XHJcbiAgICBjb25zdCBvdXRwdXRGb3JtYXQgPSBkYXRhU291cmNlT3B0aW9ucy5wYXJhbXNXRlMub3V0cHV0Rm9ybWF0O1xyXG4gICAgaWYgKGdtbFJlZ2V4LnRlc3Qob3V0cHV0Rm9ybWF0KSB8fCAhb3V0cHV0Rm9ybWF0KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGJhc2VVcmwsIHsgcmVzcG9uc2VUeXBlOiAndGV4dCcgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwLmdldChiYXNlVXJsKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRlZmluZUZpZWxkQW5kVmFsdWVmcm9tV0ZTKFxyXG4gICAgZGF0YVNvdXJjZU9wdGlvbnM6IFdGU0RhdGFTb3VyY2VPcHRpb25zIHwgV01TRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGQgPT4ge1xyXG4gICAgICBjb25zdCBzb3VyY2VGaWVsZHMgPSBbXTtcclxuICAgICAgbGV0IGZpZWxkTGlzdDtcclxuICAgICAgbGV0IGZpZWxkTGlzdFdvR2VvbTtcclxuICAgICAgbGV0IGZpZWxkTGlzdFdvR2VvbVN0cjtcclxuICAgICAgbGV0IG9sRm9ybWF0cztcclxuXHJcbiAgICAgIG9sRm9ybWF0cyA9IGdldEZvcm1hdEZyb21PcHRpb25zKGRhdGFTb3VyY2VPcHRpb25zKTtcclxuXHJcbiAgICAgIHRoaXMud2ZzR2V0RmVhdHVyZShkYXRhU291cmNlT3B0aW9ucywgMSkuc3Vic2NyaWJlKG9uZUZlYXR1cmUgPT4ge1xyXG4gICAgICAgIGNvbnN0IGZlYXR1cmVzID0gb2xGb3JtYXRzLnJlYWRGZWF0dXJlcyhvbmVGZWF0dXJlKTtcclxuICAgICAgICBmaWVsZExpc3QgPSBmZWF0dXJlc1swXS5nZXRLZXlzKCk7XHJcbiAgICAgICAgZmllbGRMaXN0V29HZW9tID0gZmllbGRMaXN0LmZpbHRlcihcclxuICAgICAgICAgIGZpZWxkID0+XHJcbiAgICAgICAgICAgIGZpZWxkICE9PSBmZWF0dXJlc1swXS5nZXRHZW9tZXRyeU5hbWUoKSAmJlxyXG4gICAgICAgICAgICAhZmllbGQubWF0Y2goL2JvdW5kZWRieS9naSlcclxuICAgICAgICApO1xyXG4gICAgICAgIGZpZWxkTGlzdFdvR2VvbVN0ciA9IGZpZWxkTGlzdFdvR2VvbS5qb2luKCcsJyk7XHJcbiAgICAgICAgdGhpcy53ZnNHZXRGZWF0dXJlKFxyXG4gICAgICAgICAgZGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgICAgICAgICBkYXRhU291cmNlT3B0aW9ucy5wYXJhbXNXRlMubWF4RmVhdHVyZXMgfHwgZGVmYXVsdE1heEZlYXR1cmVzLFxyXG4gICAgICAgICAgZGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTLnNyc05hbWUsXHJcbiAgICAgICAgICBmaWVsZExpc3RXb0dlb21TdHJcclxuICAgICAgICApLnN1YnNjcmliZShtYW55RmVhdHVyZXMgPT4ge1xyXG4gICAgICAgICAgY29uc3QgbWZlYXR1cmVzID0gb2xGb3JtYXRzLnJlYWRGZWF0dXJlcyhtYW55RmVhdHVyZXMpO1xyXG4gICAgICAgICAgdGhpcy5idWlsdF9wcm9wZXJ0aWVzX3ZhbHVlKG1mZWF0dXJlcykuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgc291cmNlRmllbGRzLnB1c2goZWxlbWVudCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGQubmV4dChzb3VyY2VGaWVsZHMpO1xyXG4gICAgICAgICAgZC5jb21wbGV0ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYnVpbHRfcHJvcGVydGllc192YWx1ZShmZWF0dXJlczogb2xGZWF0dXJlW10pOiBzdHJpbmdbXSB7XHJcbiAgICBjb25zdCBrdiA9IE9iamVjdC5hc3NpZ24oe30sIGZlYXR1cmVzWzBdLmdldFByb3BlcnRpZXMoKSk7XHJcbiAgICBkZWxldGUga3ZbZmVhdHVyZXNbMF0uZ2V0R2VvbWV0cnlOYW1lKCldO1xyXG4gICAgZGVsZXRlIGt2LmJvdW5kZWRCeTtcclxuICAgIGNvbnN0IHNvdXJjZUZpZWxkcyA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBrdikge1xyXG4gICAgICBpZiAoa3YuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XHJcbiAgICAgICAgY29uc3QgZmllbGRUeXBlID1cclxuICAgICAgICAgIHR5cGVvZiBmZWF0dXJlc1swXS5nZXQocHJvcGVydHkpID09PSAnb2JqZWN0J1xyXG4gICAgICAgICAgICA/IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICA6IHR5cGVvZiBmZWF0dXJlc1swXS5nZXQocHJvcGVydHkpO1xyXG4gICAgICAgIHNvdXJjZUZpZWxkcy5wdXNoKHtcclxuICAgICAgICAgIG5hbWU6IHByb3BlcnR5LFxyXG4gICAgICAgICAgYWxpYXM6IHByb3BlcnR5LFxyXG4gICAgICAgICAgdHlwZTogZmllbGRUeXBlLFxyXG4gICAgICAgICAgdmFsdWVzOiBba3ZbcHJvcGVydHldXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmZWF0dXJlcy5ldmVyeSgoZWxlbWVudCkgPT4ge1xyXG4gICAgICBjb25zdCBmZWF0dXJlUHJvcGVydGllcyA9IGVsZW1lbnQuZ2V0UHJvcGVydGllcygpO1xyXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBmZWF0dXJlUHJvcGVydGllcykge1xyXG4gICAgICAgIGlmIChmZWF0dXJlUHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGtleSBpbiBrdikge1xyXG4gICAgICAgICAgc291cmNlRmllbGRzLmZpbHRlcihmID0+IGYubmFtZSA9PT0ga2V5KS5mb3JFYWNoKHYgPT4ge1xyXG4gICAgICAgICAgICBpZiAodi52YWx1ZXMuaW5kZXhPZihmZWF0dXJlUHJvcGVydGllc1trZXldKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICB2LnZhbHVlcy5wdXNoKGZlYXR1cmVQcm9wZXJ0aWVzW2tleV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBzb3VyY2VGaWVsZHM7XHJcbiAgfVxyXG59XHJcbiJdfQ==