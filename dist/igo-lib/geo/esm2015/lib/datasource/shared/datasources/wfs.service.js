/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as olformat from 'ol/format';
import { DataService } from './data.service';
import { formatWFSQueryString, gmlRegex, defaultEpsg, defaultMaxFeatures } from './wms-wfs.utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class WFSService extends DataService {
    /**
     * @param {?} http
     */
    constructor(http) {
        super();
        this.http = http;
    }
    /**
     * @return {?}
     */
    getData() {
        console.log('This is defining a data service.');
        return 'This is defining a data service.';
    }
    /**
     * @param {?} datasource
     * @return {?}
     */
    getSourceFieldsFromWFS(datasource) {
        if (!datasource.sourceFields || datasource.sourceFields.length === 0) {
            datasource.sourceFields = [];
            this.defineFieldAndValuefromWFS(datasource).subscribe((/**
             * @param {?} getfeatureSourceField
             * @return {?}
             */
            getfeatureSourceField => {
                datasource.sourceFields = getfeatureSourceField;
            }));
        }
        else {
            this.defineFieldAndValuefromWFS(datasource).subscribe((/**
             * @param {?} getfeatureSourceField
             * @return {?}
             */
            getfeatureSourceField => {
                datasource.sourceFields.forEach((/**
                 * @param {?} sourcefield
                 * @return {?}
                 */
                sourcefield => {
                    if (sourcefield.alias === undefined) {
                        sourcefield.alias = sourcefield.name; // to allow only a list of sourcefield with names
                    }
                    if (sourcefield.values === undefined || sourcefield.values.length === 0) {
                        sourcefield.values = getfeatureSourceField.find((/**
                         * @param {?} sf
                         * @return {?}
                         */
                        sf => sf.name === sourcefield.name)).values;
                    }
                }));
            }));
        }
    }
    /**
     * @private
     * @param {?} wfsDataSourceOptions
     * @param {?=} nb
     * @param {?=} epsgCode
     * @param {?=} propertyName
     * @return {?}
     */
    wfsGetFeature(wfsDataSourceOptions, nb = defaultMaxFeatures, epsgCode = defaultEpsg, propertyName) {
        /** @type {?} */
        const queryStringValues = formatWFSQueryString(wfsDataSourceOptions, nb, epsgCode, propertyName);
        /** @type {?} */
        const baseUrl = queryStringValues.find((/**
         * @param {?} f
         * @return {?}
         */
        f => f.name === 'getfeature')).value;
        /** @type {?} */
        const outputFormat = wfsDataSourceOptions.paramsWFS.outputFormat;
        if (gmlRegex.test(outputFormat) || !outputFormat) {
            return this.http.get(baseUrl, { responseType: 'text' });
        }
        else {
            return this.http.get(baseUrl);
        }
    }
    /**
     * @param {?} wfsDataSourceOptions
     * @return {?}
     */
    defineFieldAndValuefromWFS(wfsDataSourceOptions) {
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        d => {
            /** @type {?} */
            const sourceFields = [];
            /** @type {?} */
            let fieldList;
            /** @type {?} */
            let fieldListWoGeom;
            /** @type {?} */
            let fieldListWoGeomStr;
            /** @type {?} */
            let olFormats;
            /** @type {?} */
            const outputFormat = wfsDataSourceOptions.paramsWFS.outputFormat;
            if (gmlRegex.test(outputFormat) || !outputFormat) {
                olFormats = olformat.WFS;
            }
            else {
                olFormats = olformat.GeoJSON;
            }
            this.wfsGetFeature(wfsDataSourceOptions, 1).subscribe((/**
             * @param {?} oneFeature
             * @return {?}
             */
            oneFeature => {
                /** @type {?} */
                const features = new olFormats().readFeatures(oneFeature);
                fieldList = features[0].getKeys();
                fieldListWoGeom = fieldList.filter((/**
                 * @param {?} field
                 * @return {?}
                 */
                field => field !== features[0].getGeometryName() &&
                    !field.match(/boundedby/gi)));
                fieldListWoGeomStr = fieldListWoGeom.join(',');
                this.wfsGetFeature(wfsDataSourceOptions, wfsDataSourceOptions.paramsWFS.maxFeatures || defaultMaxFeatures, undefined, fieldListWoGeomStr).subscribe((/**
                 * @param {?} manyFeatures
                 * @return {?}
                 */
                manyFeatures => {
                    /** @type {?} */
                    const mfeatures = new olFormats().readFeatures(manyFeatures);
                    this.built_properties_value(mfeatures).forEach((/**
                     * @param {?} element
                     * @return {?}
                     */
                    element => {
                        sourceFields.push(element);
                    }));
                    d.next(sourceFields);
                    d.complete();
                }));
            }));
        }));
    }
    /**
     * @private
     * @param {?} features
     * @return {?}
     */
    built_properties_value(features) {
        /** @type {?} */
        const kv = Object.assign({}, features[0].getProperties());
        delete kv[features[0].getGeometryName()];
        delete kv.boundedBy;
        /** @type {?} */
        const sourceFields = [];
        for (const property in kv) {
            if (kv.hasOwnProperty(property)) {
                /** @type {?} */
                const fieldType = typeof features[0].get(property) === 'object'
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
        (element) => {
            /** @type {?} */
            const featureProperties = element.getProperties();
            for (const key in featureProperties) {
                if (featureProperties.hasOwnProperty(key) && key in kv) {
                    sourceFields.filter((/**
                     * @param {?} f
                     * @return {?}
                     */
                    f => f.name === key)).forEach((/**
                     * @param {?} v
                     * @return {?}
                     */
                    v => {
                        if (v.values.indexOf(featureProperties[key]) === -1) {
                            v.values.push(featureProperties[key]);
                        }
                    }));
                }
            }
            return true;
        }));
        return sourceFields;
    }
}
WFSService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
WFSService.ctorParameters = () => [
    { type: HttpClient }
];
/** @nocollapse */ WFSService.ngInjectableDef = i0.defineInjectable({ factory: function WFSService_Factory() { return new WFSService(i0.inject(i1.HttpClient)); }, token: WFSService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    WFSService.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ZzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd2ZzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHbEMsT0FBTyxLQUFLLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFHdEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixFQUFDLE1BQU0saUJBQWlCLENBQUM7OztBQUtqRyxNQUFNLE9BQU8sVUFBVyxTQUFRLFdBQVc7Ozs7SUFDekMsWUFBb0IsSUFBZ0I7UUFDbEMsS0FBSyxFQUFFLENBQUM7UUFEVSxTQUFJLEdBQUosSUFBSSxDQUFZO0lBRXBDLENBQUM7Ozs7SUFFRCxPQUFPO1FBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1FBQ2hELE9BQU8sa0NBQWtDLENBQUM7SUFDNUMsQ0FBQzs7Ozs7SUFFTSxzQkFBc0IsQ0FBQyxVQUFVO1FBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxJQUFJLFVBQVUsQ0FBQyxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRztZQUNyRSxVQUFVLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMsMEJBQTBCLENBQUMsVUFBVSxDQUFDLENBQUMsU0FBUzs7OztZQUFDLHFCQUFxQixDQUFDLEVBQUU7Z0JBQzVFLFVBQVUsQ0FBQyxZQUFZLEdBQUcscUJBQXFCLENBQUM7WUFDbEQsQ0FBQyxF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bnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgb2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5pbXBvcnQgKiBhcyBvbGZvcm1hdCBmcm9tICdvbC9mb3JtYXQnO1xyXG5cclxuaW1wb3J0IHsgV0ZTRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuL3dmcy1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi9kYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBmb3JtYXRXRlNRdWVyeVN0cmluZywgZ21sUmVnZXgsIGRlZmF1bHRFcHNnLCBkZWZhdWx0TWF4RmVhdHVyZXN9IGZyb20gJy4vd21zLXdmcy51dGlscyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBXRlNTZXJ2aWNlIGV4dGVuZHMgRGF0YVNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIGdldERhdGEoKSB7XHJcbiAgICBjb25zb2xlLmxvZygnVGhpcyBpcyBkZWZpbmluZyBhIGRhdGEgc2VydmljZS4nKTtcclxuICAgIHJldHVybiAnVGhpcyBpcyBkZWZpbmluZyBhIGRhdGEgc2VydmljZS4nO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFNvdXJjZUZpZWxkc0Zyb21XRlMoZGF0YXNvdXJjZSkge1xyXG4gICAgaWYgKCFkYXRhc291cmNlLnNvdXJjZUZpZWxkcyB8fCBkYXRhc291cmNlLnNvdXJjZUZpZWxkcy5sZW5ndGggPT09IDAgKSB7XHJcbiAgICAgIGRhdGFzb3VyY2Uuc291cmNlRmllbGRzID0gW107XHJcbiAgICAgIHRoaXMuZGVmaW5lRmllbGRBbmRWYWx1ZWZyb21XRlMoZGF0YXNvdXJjZSkuc3Vic2NyaWJlKGdldGZlYXR1cmVTb3VyY2VGaWVsZCA9PiB7XHJcbiAgICAgICAgZGF0YXNvdXJjZS5zb3VyY2VGaWVsZHMgPSBnZXRmZWF0dXJlU291cmNlRmllbGQ7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZGVmaW5lRmllbGRBbmRWYWx1ZWZyb21XRlMoZGF0YXNvdXJjZSkuc3Vic2NyaWJlKGdldGZlYXR1cmVTb3VyY2VGaWVsZCA9PiB7XHJcbiAgICAgICAgZGF0YXNvdXJjZS5zb3VyY2VGaWVsZHMuZm9yRWFjaChzb3VyY2VmaWVsZCA9PiB7XHJcbiAgICAgICAgICBpZiAoc291cmNlZmllbGQuYWxpYXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBzb3VyY2VmaWVsZC5hbGlhcyA9IHNvdXJjZWZpZWxkLm5hbWU7IC8vIHRvIGFsbG93IG9ubHkgYSBsaXN0IG9mIHNvdXJjZWZpZWxkIHdpdGggbmFtZXNcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChzb3VyY2VmaWVsZC52YWx1ZXMgPT09IHVuZGVmaW5lZCB8fCBzb3VyY2VmaWVsZC52YWx1ZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHNvdXJjZWZpZWxkLnZhbHVlcyA9IGdldGZlYXR1cmVTb3VyY2VGaWVsZC5maW5kKHNmID0+IHNmLm5hbWUgPT09IHNvdXJjZWZpZWxkLm5hbWUpLnZhbHVlcztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHdmc0dldEZlYXR1cmUoXHJcbiAgICB3ZnNEYXRhU291cmNlT3B0aW9uczogV0ZTRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgICBuYjogbnVtYmVyID0gZGVmYXVsdE1heEZlYXR1cmVzLFxyXG4gICAgZXBzZ0NvZGU6IHN0cmluZyA9IGRlZmF1bHRFcHNnLFxyXG4gICAgcHJvcGVydHlOYW1lPzogc3RyaW5nXHJcbiAgKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IHF1ZXJ5U3RyaW5nVmFsdWVzID0gZm9ybWF0V0ZTUXVlcnlTdHJpbmcod2ZzRGF0YVNvdXJjZU9wdGlvbnMsIG5iLCBlcHNnQ29kZSwgcHJvcGVydHlOYW1lKTtcclxuICAgIGNvbnN0IGJhc2VVcmwgPSBxdWVyeVN0cmluZ1ZhbHVlcy5maW5kKGYgPT4gZi5uYW1lID09PSAnZ2V0ZmVhdHVyZScpLnZhbHVlO1xyXG4gICAgY29uc3Qgb3V0cHV0Rm9ybWF0ID0gd2ZzRGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTLm91dHB1dEZvcm1hdDtcclxuICAgIGlmIChnbWxSZWdleC50ZXN0KG91dHB1dEZvcm1hdCkgfHwgIW91dHB1dEZvcm1hdCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwLmdldChiYXNlVXJsLCB7IHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYmFzZVVybCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkZWZpbmVGaWVsZEFuZFZhbHVlZnJvbVdGUyhcclxuICAgIHdmc0RhdGFTb3VyY2VPcHRpb25zOiBXRlNEYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZCA9PiB7XHJcbiAgICAgIGNvbnN0IHNvdXJjZUZpZWxkcyA9IFtdO1xyXG4gICAgICBsZXQgZmllbGRMaXN0O1xyXG4gICAgICBsZXQgZmllbGRMaXN0V29HZW9tO1xyXG4gICAgICBsZXQgZmllbGRMaXN0V29HZW9tU3RyO1xyXG4gICAgICBsZXQgb2xGb3JtYXRzO1xyXG4gICAgICBjb25zdCBvdXRwdXRGb3JtYXQgPSB3ZnNEYXRhU291cmNlT3B0aW9ucy5wYXJhbXNXRlMub3V0cHV0Rm9ybWF0O1xyXG5cclxuICAgICAgaWYgKGdtbFJlZ2V4LnRlc3Qob3V0cHV0Rm9ybWF0KSB8fCAhb3V0cHV0Rm9ybWF0KSB7XHJcbiAgICAgICAgb2xGb3JtYXRzID0gb2xmb3JtYXQuV0ZTO1xyXG4gICAgIH0gZWxzZSB7XHJcbiAgICAgICAgb2xGb3JtYXRzID0gb2xmb3JtYXQuR2VvSlNPTjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy53ZnNHZXRGZWF0dXJlKHdmc0RhdGFTb3VyY2VPcHRpb25zLCAxKS5zdWJzY3JpYmUob25lRmVhdHVyZSA9PiB7XHJcbiAgICAgICAgY29uc3QgZmVhdHVyZXMgPSBuZXcgb2xGb3JtYXRzKCkucmVhZEZlYXR1cmVzKG9uZUZlYXR1cmUpO1xyXG4gICAgICAgIGZpZWxkTGlzdCA9IGZlYXR1cmVzWzBdLmdldEtleXMoKTtcclxuICAgICAgICBmaWVsZExpc3RXb0dlb20gPSBmaWVsZExpc3QuZmlsdGVyKFxyXG4gICAgICAgICAgZmllbGQgPT5cclxuICAgICAgICAgICAgZmllbGQgIT09IGZlYXR1cmVzWzBdLmdldEdlb21ldHJ5TmFtZSgpICYmXHJcbiAgICAgICAgICAgICFmaWVsZC5tYXRjaCgvYm91bmRlZGJ5L2dpKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgZmllbGRMaXN0V29HZW9tU3RyID0gZmllbGRMaXN0V29HZW9tLmpvaW4oJywnKTtcclxuICAgICAgICB0aGlzLndmc0dldEZlYXR1cmUoXHJcbiAgICAgICAgICB3ZnNEYXRhU291cmNlT3B0aW9ucyxcclxuICAgICAgICAgIHdmc0RhdGFTb3VyY2VPcHRpb25zLnBhcmFtc1dGUy5tYXhGZWF0dXJlcyB8fCBkZWZhdWx0TWF4RmVhdHVyZXMsXHJcbiAgICAgICAgICB1bmRlZmluZWQsXHJcbiAgICAgICAgICBmaWVsZExpc3RXb0dlb21TdHJcclxuICAgICAgICApLnN1YnNjcmliZShtYW55RmVhdHVyZXMgPT4ge1xyXG4gICAgICAgICAgY29uc3QgbWZlYXR1cmVzID0gbmV3IG9sRm9ybWF0cygpLnJlYWRGZWF0dXJlcyhtYW55RmVhdHVyZXMpO1xyXG4gICAgICAgICAgdGhpcy5idWlsdF9wcm9wZXJ0aWVzX3ZhbHVlKG1mZWF0dXJlcykuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgc291cmNlRmllbGRzLnB1c2goZWxlbWVudCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGQubmV4dChzb3VyY2VGaWVsZHMpO1xyXG4gICAgICAgICAgZC5jb21wbGV0ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYnVpbHRfcHJvcGVydGllc192YWx1ZShmZWF0dXJlczogb2xGZWF0dXJlW10pOiBzdHJpbmdbXSB7XHJcbiAgICBjb25zdCBrdiA9IE9iamVjdC5hc3NpZ24oe30sIGZlYXR1cmVzWzBdLmdldFByb3BlcnRpZXMoKSk7XHJcbiAgICBkZWxldGUga3ZbZmVhdHVyZXNbMF0uZ2V0R2VvbWV0cnlOYW1lKCldO1xyXG4gICAgZGVsZXRlIGt2LmJvdW5kZWRCeTtcclxuICAgIGNvbnN0IHNvdXJjZUZpZWxkcyA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBrdikge1xyXG4gICAgICBpZiAoa3YuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XHJcbiAgICAgICAgY29uc3QgZmllbGRUeXBlID1cclxuICAgICAgICAgIHR5cGVvZiBmZWF0dXJlc1swXS5nZXQocHJvcGVydHkpID09PSAnb2JqZWN0J1xyXG4gICAgICAgICAgICA/IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICA6IHR5cGVvZiBmZWF0dXJlc1swXS5nZXQocHJvcGVydHkpO1xyXG4gICAgICAgIHNvdXJjZUZpZWxkcy5wdXNoKHtcclxuICAgICAgICAgIG5hbWU6IHByb3BlcnR5LFxyXG4gICAgICAgICAgYWxpYXM6IHByb3BlcnR5LFxyXG4gICAgICAgICAgdHlwZTogZmllbGRUeXBlLFxyXG4gICAgICAgICAgdmFsdWVzOiBba3ZbcHJvcGVydHldXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmZWF0dXJlcy5ldmVyeSgoZWxlbWVudCkgPT4ge1xyXG4gICAgICBjb25zdCBmZWF0dXJlUHJvcGVydGllcyA9IGVsZW1lbnQuZ2V0UHJvcGVydGllcygpO1xyXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBmZWF0dXJlUHJvcGVydGllcykge1xyXG4gICAgICAgIGlmIChmZWF0dXJlUHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGtleSBpbiBrdikge1xyXG4gICAgICAgICAgc291cmNlRmllbGRzLmZpbHRlcihmID0+IGYubmFtZSA9PT0ga2V5KS5mb3JFYWNoKHYgPT4ge1xyXG4gICAgICAgICAgICBpZiAodi52YWx1ZXMuaW5kZXhPZihmZWF0dXJlUHJvcGVydGllc1trZXldKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICB2LnZhbHVlcy5wdXNoKGZlYXR1cmVQcm9wZXJ0aWVzW2tleV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBzb3VyY2VGaWVsZHM7XHJcbiAgfVxyXG59XHJcbiJdfQ==