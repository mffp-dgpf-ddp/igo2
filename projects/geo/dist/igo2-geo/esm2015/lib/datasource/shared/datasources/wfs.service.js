/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { formatWFSQueryString, gmlRegex, defaultEpsg, defaultMaxFeatures, getFormatFromOptions } from './wms-wfs.utils';
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
     * @param {?} dataSourceOptions
     * @return {?}
     */
    getSourceFieldsFromWFS(dataSourceOptions) {
        if (!dataSourceOptions.sourceFields || dataSourceOptions.sourceFields.length === 0) {
            dataSourceOptions.sourceFields = [];
            this.defineFieldAndValuefromWFS(dataSourceOptions).subscribe((/**
             * @param {?} getfeatureSourceField
             * @return {?}
             */
            getfeatureSourceField => {
                dataSourceOptions.sourceFields = getfeatureSourceField;
            }));
        }
        else {
            this.defineFieldAndValuefromWFS(dataSourceOptions).subscribe((/**
             * @param {?} getfeatureSourceField
             * @return {?}
             */
            getfeatureSourceField => {
                dataSourceOptions.sourceFields.forEach((/**
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
     * @param {?} dataSourceOptions
     * @param {?=} nb
     * @param {?=} epsgCode
     * @param {?=} propertyName
     * @return {?}
     */
    wfsGetFeature(dataSourceOptions, nb = defaultMaxFeatures, epsgCode = defaultEpsg, propertyName) {
        /** @type {?} */
        const queryStringValues = formatWFSQueryString(dataSourceOptions, nb, epsgCode, propertyName);
        /** @type {?} */
        const baseUrl = queryStringValues.find((/**
         * @param {?} f
         * @return {?}
         */
        f => f.name === 'getfeature')).value;
        /** @type {?} */
        const outputFormat = dataSourceOptions.paramsWFS.outputFormat;
        if (gmlRegex.test(outputFormat) || !outputFormat) {
            return this.http.get(baseUrl, { responseType: 'text' });
        }
        else {
            return this.http.get(baseUrl);
        }
    }
    /**
     * @param {?} dataSourceOptions
     * @return {?}
     */
    defineFieldAndValuefromWFS(dataSourceOptions) {
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
            olFormats = getFormatFromOptions(dataSourceOptions);
            this.wfsGetFeature(dataSourceOptions, 1).subscribe((/**
             * @param {?} oneFeature
             * @return {?}
             */
            oneFeature => {
                /** @type {?} */
                const features = olFormats.readFeatures(oneFeature);
                fieldList = features[0].getKeys();
                fieldListWoGeom = fieldList.filter((/**
                 * @param {?} field
                 * @return {?}
                 */
                field => field !== features[0].getGeometryName() &&
                    !field.match(/boundedby/gi)));
                fieldListWoGeomStr = fieldListWoGeom.join(',');
                this.wfsGetFeature(dataSourceOptions, dataSourceOptions.paramsWFS.maxFeatures || defaultMaxFeatures, undefined, fieldListWoGeomStr).subscribe((/**
                 * @param {?} manyFeatures
                 * @return {?}
                 */
                manyFeatures => {
                    /** @type {?} */
                    const mfeatures = olFormats.readFeatures(manyFeatures);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ZzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd2ZzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFLbEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxvQkFBb0IsRUFDbkIsUUFBUSxFQUNSLFdBQVcsRUFDWCxrQkFBa0IsRUFDbEIsb0JBQW9CLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBS3ZELE1BQU0sT0FBTyxVQUFXLFNBQVEsV0FBVzs7OztJQUN6QyxZQUFvQixJQUFnQjtRQUNsQyxLQUFLLEVBQUUsQ0FBQztRQURVLFNBQUksR0FBSixJQUFJLENBQVk7SUFFcEMsQ0FBQzs7OztJQUVELE9BQU87UUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7UUFDaEQsT0FBTyxrQ0FBa0MsQ0FBQztJQUM1QyxDQUFDOzs7OztJQUVNLHNCQUFzQixDQUFDLGlCQUE4RDtRQUMxRixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxJQUFJLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFHO1lBQ25GLGlCQUFpQixDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7WUFDcEMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLGlCQUFpQixDQUFDLENBQUMsU0FBUzs7OztZQUFDLHFCQUFxQixDQUFDLEVBQUU7Z0JBQ25GLGlCQUFpQixDQUFDLFlBQVksR0FBRyxxQkFBcUIsQ0FBQztZQUN6RCxDQUFDLEVBQUMsQ0FBQztT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QyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ3ZCLENBQUMsQ0FBQzthQUNKO1NBQ0Y7UUFDRCxRQUFRLENBQUMsS0FBSzs7OztRQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7O2tCQUNuQixpQkFBaUIsR0FBRyxPQUFPLENBQUMsYUFBYSxFQUFFO1lBQ2pELEtBQUssTUFBTSxHQUFHLElBQUksaUJBQWlCLEVBQUU7Z0JBQ25DLElBQUksaUJBQWlCLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxFQUFFLEVBQUU7b0JBQ3RELFlBQVksQ0FBQyxNQUFNOzs7O29CQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLEVBQUMsQ0FBQyxPQUFPOzs7O29CQUFDLENBQUMsQ0FBQyxFQUFFO3dCQUNuRCxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7NEJBQ25ELENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7eUJBQ3ZDO29CQUNILENBQUMsRUFBQyxDQUFDO2lCQUNKO2FBQ0Y7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsRUFBQyxDQUFDO1FBQ0gsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQzs7O1lBMUhGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQWZRLFVBQVU7Ozs7Ozs7O0lBaUJMLDBCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgb2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5pbXBvcnQgKiBhcyBvbGZvcm1hdCBmcm9tICdvbC9mb3JtYXQnO1xyXG5pbXBvcnQgeyBXRlNEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4vd2ZzLWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgV01TRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuL3dtcy1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi9kYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBmb3JtYXRXRlNRdWVyeVN0cmluZyxcclxuICAgICAgICAgIGdtbFJlZ2V4LFxyXG4gICAgICAgICAgZGVmYXVsdEVwc2csXHJcbiAgICAgICAgICBkZWZhdWx0TWF4RmVhdHVyZXMsXHJcbiAgICAgICAgICBnZXRGb3JtYXRGcm9tT3B0aW9uc30gZnJvbSAnLi93bXMtd2ZzLnV0aWxzJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFdGU1NlcnZpY2UgZXh0ZW5kcyBEYXRhU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGF0YSgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdUaGlzIGlzIGRlZmluaW5nIGEgZGF0YSBzZXJ2aWNlLicpO1xyXG4gICAgcmV0dXJuICdUaGlzIGlzIGRlZmluaW5nIGEgZGF0YSBzZXJ2aWNlLic7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0U291cmNlRmllbGRzRnJvbVdGUyhkYXRhU291cmNlT3B0aW9uczogV0ZTRGF0YVNvdXJjZU9wdGlvbnMgfCBXTVNEYXRhU291cmNlT3B0aW9ucykge1xyXG4gICAgaWYgKCFkYXRhU291cmNlT3B0aW9ucy5zb3VyY2VGaWVsZHMgfHwgZGF0YVNvdXJjZU9wdGlvbnMuc291cmNlRmllbGRzLmxlbmd0aCA9PT0gMCApIHtcclxuICAgICAgZGF0YVNvdXJjZU9wdGlvbnMuc291cmNlRmllbGRzID0gW107XHJcbiAgICAgIHRoaXMuZGVmaW5lRmllbGRBbmRWYWx1ZWZyb21XRlMoZGF0YVNvdXJjZU9wdGlvbnMpLnN1YnNjcmliZShnZXRmZWF0dXJlU291cmNlRmllbGQgPT4ge1xyXG4gICAgICAgIGRhdGFTb3VyY2VPcHRpb25zLnNvdXJjZUZpZWxkcyA9IGdldGZlYXR1cmVTb3VyY2VGaWVsZDtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5kZWZpbmVGaWVsZEFuZFZhbHVlZnJvbVdGUyhkYXRhU291cmNlT3B0aW9ucykuc3Vic2NyaWJlKGdldGZlYXR1cmVTb3VyY2VGaWVsZCA9PiB7XHJcbiAgICAgICAgZGF0YVNvdXJjZU9wdGlvbnMuc291cmNlRmllbGRzLmZvckVhY2goc291cmNlZmllbGQgPT4ge1xyXG4gICAgICAgICAgaWYgKHNvdXJjZWZpZWxkLmFsaWFzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgc291cmNlZmllbGQuYWxpYXMgPSBzb3VyY2VmaWVsZC5uYW1lOyAvLyB0byBhbGxvdyBvbmx5IGEgbGlzdCBvZiBzb3VyY2VmaWVsZCB3aXRoIG5hbWVzXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoc291cmNlZmllbGQudmFsdWVzID09PSB1bmRlZmluZWQgfHwgc291cmNlZmllbGQudmFsdWVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBzb3VyY2VmaWVsZC52YWx1ZXMgPSBnZXRmZWF0dXJlU291cmNlRmllbGQuZmluZChzZiA9PiBzZi5uYW1lID09PSBzb3VyY2VmaWVsZC5uYW1lKS52YWx1ZXM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB3ZnNHZXRGZWF0dXJlKFxyXG4gICAgZGF0YVNvdXJjZU9wdGlvbnM6IFdGU0RhdGFTb3VyY2VPcHRpb25zIHwgV01TRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgICBuYjogbnVtYmVyID0gZGVmYXVsdE1heEZlYXR1cmVzLFxyXG4gICAgZXBzZ0NvZGU6IHN0cmluZyA9IGRlZmF1bHRFcHNnLFxyXG4gICAgcHJvcGVydHlOYW1lPzogc3RyaW5nXHJcbiAgKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IHF1ZXJ5U3RyaW5nVmFsdWVzID0gZm9ybWF0V0ZTUXVlcnlTdHJpbmcoZGF0YVNvdXJjZU9wdGlvbnMsIG5iLCBlcHNnQ29kZSwgcHJvcGVydHlOYW1lKTtcclxuICAgIGNvbnN0IGJhc2VVcmwgPSBxdWVyeVN0cmluZ1ZhbHVlcy5maW5kKGYgPT4gZi5uYW1lID09PSAnZ2V0ZmVhdHVyZScpLnZhbHVlO1xyXG4gICAgY29uc3Qgb3V0cHV0Rm9ybWF0ID0gZGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTLm91dHB1dEZvcm1hdDtcclxuICAgIGlmIChnbWxSZWdleC50ZXN0KG91dHB1dEZvcm1hdCkgfHwgIW91dHB1dEZvcm1hdCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwLmdldChiYXNlVXJsLCB7IHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYmFzZVVybCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkZWZpbmVGaWVsZEFuZFZhbHVlZnJvbVdGUyhcclxuICAgIGRhdGFTb3VyY2VPcHRpb25zOiBXRlNEYXRhU291cmNlT3B0aW9ucyB8IFdNU0RhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkID0+IHtcclxuICAgICAgY29uc3Qgc291cmNlRmllbGRzID0gW107XHJcbiAgICAgIGxldCBmaWVsZExpc3Q7XHJcbiAgICAgIGxldCBmaWVsZExpc3RXb0dlb207XHJcbiAgICAgIGxldCBmaWVsZExpc3RXb0dlb21TdHI7XHJcbiAgICAgIGxldCBvbEZvcm1hdHM7XHJcblxyXG4gICAgICBvbEZvcm1hdHMgPSBnZXRGb3JtYXRGcm9tT3B0aW9ucyhkYXRhU291cmNlT3B0aW9ucyk7XHJcblxyXG4gICAgICB0aGlzLndmc0dldEZlYXR1cmUoZGF0YVNvdXJjZU9wdGlvbnMsIDEpLnN1YnNjcmliZShvbmVGZWF0dXJlID0+IHtcclxuICAgICAgICBjb25zdCBmZWF0dXJlcyA9IG9sRm9ybWF0cy5yZWFkRmVhdHVyZXMob25lRmVhdHVyZSk7XHJcbiAgICAgICAgZmllbGRMaXN0ID0gZmVhdHVyZXNbMF0uZ2V0S2V5cygpO1xyXG4gICAgICAgIGZpZWxkTGlzdFdvR2VvbSA9IGZpZWxkTGlzdC5maWx0ZXIoXHJcbiAgICAgICAgICBmaWVsZCA9PlxyXG4gICAgICAgICAgICBmaWVsZCAhPT0gZmVhdHVyZXNbMF0uZ2V0R2VvbWV0cnlOYW1lKCkgJiZcclxuICAgICAgICAgICAgIWZpZWxkLm1hdGNoKC9ib3VuZGVkYnkvZ2kpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBmaWVsZExpc3RXb0dlb21TdHIgPSBmaWVsZExpc3RXb0dlb20uam9pbignLCcpO1xyXG4gICAgICAgIHRoaXMud2ZzR2V0RmVhdHVyZShcclxuICAgICAgICAgIGRhdGFTb3VyY2VPcHRpb25zLFxyXG4gICAgICAgICAgZGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTLm1heEZlYXR1cmVzIHx8IGRlZmF1bHRNYXhGZWF0dXJlcyxcclxuICAgICAgICAgIHVuZGVmaW5lZCxcclxuICAgICAgICAgIGZpZWxkTGlzdFdvR2VvbVN0clxyXG4gICAgICAgICkuc3Vic2NyaWJlKG1hbnlGZWF0dXJlcyA9PiB7XHJcbiAgICAgICAgICBjb25zdCBtZmVhdHVyZXMgPSBvbEZvcm1hdHMucmVhZEZlYXR1cmVzKG1hbnlGZWF0dXJlcyk7XHJcbiAgICAgICAgICB0aGlzLmJ1aWx0X3Byb3BlcnRpZXNfdmFsdWUobWZlYXR1cmVzKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBzb3VyY2VGaWVsZHMucHVzaChlbGVtZW50KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgZC5uZXh0KHNvdXJjZUZpZWxkcyk7XHJcbiAgICAgICAgICBkLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBidWlsdF9wcm9wZXJ0aWVzX3ZhbHVlKGZlYXR1cmVzOiBvbEZlYXR1cmVbXSk6IHN0cmluZ1tdIHtcclxuICAgIGNvbnN0IGt2ID0gT2JqZWN0LmFzc2lnbih7fSwgZmVhdHVyZXNbMF0uZ2V0UHJvcGVydGllcygpKTtcclxuICAgIGRlbGV0ZSBrdltmZWF0dXJlc1swXS5nZXRHZW9tZXRyeU5hbWUoKV07XHJcbiAgICBkZWxldGUga3YuYm91bmRlZEJ5O1xyXG4gICAgY29uc3Qgc291cmNlRmllbGRzID0gW107XHJcbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIGt2KSB7XHJcbiAgICAgIGlmIChrdi5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcclxuICAgICAgICBjb25zdCBmaWVsZFR5cGUgPVxyXG4gICAgICAgICAgdHlwZW9mIGZlYXR1cmVzWzBdLmdldChwcm9wZXJ0eSkgPT09ICdvYmplY3QnXHJcbiAgICAgICAgICAgID8gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIDogdHlwZW9mIGZlYXR1cmVzWzBdLmdldChwcm9wZXJ0eSk7XHJcbiAgICAgICAgc291cmNlRmllbGRzLnB1c2goe1xyXG4gICAgICAgICAgbmFtZTogcHJvcGVydHksXHJcbiAgICAgICAgICBhbGlhczogcHJvcGVydHksXHJcbiAgICAgICAgICB0eXBlOiBmaWVsZFR5cGUsXHJcbiAgICAgICAgICB2YWx1ZXM6IFtrdltwcm9wZXJ0eV1dXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGZlYXR1cmVzLmV2ZXJ5KChlbGVtZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IGZlYXR1cmVQcm9wZXJ0aWVzID0gZWxlbWVudC5nZXRQcm9wZXJ0aWVzKCk7XHJcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGZlYXR1cmVQcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgaWYgKGZlYXR1cmVQcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KGtleSkgJiYga2V5IGluIGt2KSB7XHJcbiAgICAgICAgICBzb3VyY2VGaWVsZHMuZmlsdGVyKGYgPT4gZi5uYW1lID09PSBrZXkpLmZvckVhY2godiA9PiB7XHJcbiAgICAgICAgICAgIGlmICh2LnZhbHVlcy5pbmRleE9mKGZlYXR1cmVQcm9wZXJ0aWVzW2tleV0pID09PSAtMSkge1xyXG4gICAgICAgICAgICAgIHYudmFsdWVzLnB1c2goZmVhdHVyZVByb3BlcnRpZXNba2V5XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHNvdXJjZUZpZWxkcztcclxuICB9XHJcbn1cclxuIl19