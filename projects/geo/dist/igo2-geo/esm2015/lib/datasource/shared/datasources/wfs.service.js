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
                this.wfsGetFeature(dataSourceOptions, dataSourceOptions.paramsWFS.maxFeatures || defaultMaxFeatures, dataSourceOptions.paramsWFS.srsName, fieldListWoGeomStr).subscribe((/**
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ZzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd2ZzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFLbEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxvQkFBb0IsRUFDbkIsUUFBUSxFQUNSLFdBQVcsRUFDWCxrQkFBa0IsRUFDbEIsb0JBQW9CLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBS3ZELE1BQU0sT0FBTyxVQUFXLFNBQVEsV0FBVzs7OztJQUN6QyxZQUFvQixJQUFnQjtRQUNsQyxLQUFLLEVBQUUsQ0FBQztRQURVLFNBQUksR0FBSixJQUFJLENBQVk7SUFFcEMsQ0FBQzs7OztJQUVELE9BQU87UUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7UUFDaEQsT0FBTyxrQ0FBa0MsQ0FBQztJQUM1QyxDQUFDOzs7OztJQUVNLHNCQUFzQixDQUFDLGlCQUE4RDtRQUMxRixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxJQUFJLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFHO1lBQ25GLGlCQUFpQixDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7WUFDcEMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLGlCQUFpQixDQUFDLENBQUMsU0FBUzs7OztZQUFDLHFCQUFxQixDQUFDLEVBQUU7Z0JBQ25GLGlCQUFpQixDQUFDLFlBQVksR0FBRyxxQkFBcUIsQ0FBQztZQUN6RCxDQUFDLEVBQUMsQ0FBQztT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QUFTO29CQUNmLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDdkIsQ0FBQyxDQUFDO2FBQ0o7U0FDRjtRQUNELFFBQVEsQ0FBQyxLQUFLOzs7O1FBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTs7a0JBQ25CLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxhQUFhLEVBQUU7WUFDakQsS0FBSyxNQUFNLEdBQUcsSUFBSSxpQkFBaUIsRUFBRTtnQkFDbkMsSUFBSSxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLEVBQUUsRUFBRTtvQkFDdEQsWUFBWSxDQUFDLE1BQU07Ozs7b0JBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsRUFBQyxDQUFDLE9BQU87Ozs7b0JBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBQ25ELElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTs0QkFDbkQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt5QkFDdkM7b0JBQ0gsQ0FBQyxFQUFDLENBQUM7aUJBQ0o7YUFDRjtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxFQUFDLENBQUM7UUFDSCxPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDOzs7WUExSEYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBZlEsVUFBVTs7Ozs7Ozs7SUFpQkwsMEJBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCBvbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCAqIGFzIG9sZm9ybWF0IGZyb20gJ29sL2Zvcm1hdCc7XHJcbmltcG9ydCB7IFdGU0RhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi93ZnMtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBXTVNEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4vd21zLWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuL2RhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IGZvcm1hdFdGU1F1ZXJ5U3RyaW5nLFxyXG4gICAgICAgICAgZ21sUmVnZXgsXHJcbiAgICAgICAgICBkZWZhdWx0RXBzZyxcclxuICAgICAgICAgIGRlZmF1bHRNYXhGZWF0dXJlcyxcclxuICAgICAgICAgIGdldEZvcm1hdEZyb21PcHRpb25zfSBmcm9tICcuL3dtcy13ZnMudXRpbHMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgV0ZTU2VydmljZSBleHRlbmRzIERhdGFTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBnZXREYXRhKCkge1xyXG4gICAgY29uc29sZS5sb2coJ1RoaXMgaXMgZGVmaW5pbmcgYSBkYXRhIHNlcnZpY2UuJyk7XHJcbiAgICByZXR1cm4gJ1RoaXMgaXMgZGVmaW5pbmcgYSBkYXRhIHNlcnZpY2UuJztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRTb3VyY2VGaWVsZHNGcm9tV0ZTKGRhdGFTb3VyY2VPcHRpb25zOiBXRlNEYXRhU291cmNlT3B0aW9ucyB8IFdNU0RhdGFTb3VyY2VPcHRpb25zKSB7XHJcbiAgICBpZiAoIWRhdGFTb3VyY2VPcHRpb25zLnNvdXJjZUZpZWxkcyB8fCBkYXRhU291cmNlT3B0aW9ucy5zb3VyY2VGaWVsZHMubGVuZ3RoID09PSAwICkge1xyXG4gICAgICBkYXRhU291cmNlT3B0aW9ucy5zb3VyY2VGaWVsZHMgPSBbXTtcclxuICAgICAgdGhpcy5kZWZpbmVGaWVsZEFuZFZhbHVlZnJvbVdGUyhkYXRhU291cmNlT3B0aW9ucykuc3Vic2NyaWJlKGdldGZlYXR1cmVTb3VyY2VGaWVsZCA9PiB7XHJcbiAgICAgICAgZGF0YVNvdXJjZU9wdGlvbnMuc291cmNlRmllbGRzID0gZ2V0ZmVhdHVyZVNvdXJjZUZpZWxkO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmRlZmluZUZpZWxkQW5kVmFsdWVmcm9tV0ZTKGRhdGFTb3VyY2VPcHRpb25zKS5zdWJzY3JpYmUoZ2V0ZmVhdHVyZVNvdXJjZUZpZWxkID0+IHtcclxuICAgICAgICBkYXRhU291cmNlT3B0aW9ucy5zb3VyY2VGaWVsZHMuZm9yRWFjaChzb3VyY2VmaWVsZCA9PiB7XHJcbiAgICAgICAgICBpZiAoc291cmNlZmllbGQuYWxpYXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBzb3VyY2VmaWVsZC5hbGlhcyA9IHNvdXJjZWZpZWxkLm5hbWU7IC8vIHRvIGFsbG93IG9ubHkgYSBsaXN0IG9mIHNvdXJjZWZpZWxkIHdpdGggbmFtZXNcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChzb3VyY2VmaWVsZC52YWx1ZXMgPT09IHVuZGVmaW5lZCB8fCBzb3VyY2VmaWVsZC52YWx1ZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHNvdXJjZWZpZWxkLnZhbHVlcyA9IGdldGZlYXR1cmVTb3VyY2VGaWVsZC5maW5kKHNmID0+IHNmLm5hbWUgPT09IHNvdXJjZWZpZWxkLm5hbWUpLnZhbHVlcztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHdmc0dldEZlYXR1cmUoXHJcbiAgICBkYXRhU291cmNlT3B0aW9uczogV0ZTRGF0YVNvdXJjZU9wdGlvbnMgfCBXTVNEYXRhU291cmNlT3B0aW9ucyxcclxuICAgIG5iOiBudW1iZXIgPSBkZWZhdWx0TWF4RmVhdHVyZXMsXHJcbiAgICBlcHNnQ29kZTogc3RyaW5nID0gZGVmYXVsdEVwc2csXHJcbiAgICBwcm9wZXJ0eU5hbWU/OiBzdHJpbmdcclxuICApOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgY29uc3QgcXVlcnlTdHJpbmdWYWx1ZXMgPSBmb3JtYXRXRlNRdWVyeVN0cmluZyhkYXRhU291cmNlT3B0aW9ucywgbmIsIGVwc2dDb2RlLCBwcm9wZXJ0eU5hbWUpO1xyXG4gICAgY29uc3QgYmFzZVVybCA9IHF1ZXJ5U3RyaW5nVmFsdWVzLmZpbmQoZiA9PiBmLm5hbWUgPT09ICdnZXRmZWF0dXJlJykudmFsdWU7XHJcbiAgICBjb25zdCBvdXRwdXRGb3JtYXQgPSBkYXRhU291cmNlT3B0aW9ucy5wYXJhbXNXRlMub3V0cHV0Rm9ybWF0O1xyXG4gICAgaWYgKGdtbFJlZ2V4LnRlc3Qob3V0cHV0Rm9ybWF0KSB8fCAhb3V0cHV0Rm9ybWF0KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGJhc2VVcmwsIHsgcmVzcG9uc2VUeXBlOiAndGV4dCcgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwLmdldChiYXNlVXJsKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRlZmluZUZpZWxkQW5kVmFsdWVmcm9tV0ZTKFxyXG4gICAgZGF0YVNvdXJjZU9wdGlvbnM6IFdGU0RhdGFTb3VyY2VPcHRpb25zIHwgV01TRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGQgPT4ge1xyXG4gICAgICBjb25zdCBzb3VyY2VGaWVsZHMgPSBbXTtcclxuICAgICAgbGV0IGZpZWxkTGlzdDtcclxuICAgICAgbGV0IGZpZWxkTGlzdFdvR2VvbTtcclxuICAgICAgbGV0IGZpZWxkTGlzdFdvR2VvbVN0cjtcclxuICAgICAgbGV0IG9sRm9ybWF0cztcclxuXHJcbiAgICAgIG9sRm9ybWF0cyA9IGdldEZvcm1hdEZyb21PcHRpb25zKGRhdGFTb3VyY2VPcHRpb25zKTtcclxuXHJcbiAgICAgIHRoaXMud2ZzR2V0RmVhdHVyZShkYXRhU291cmNlT3B0aW9ucywgMSkuc3Vic2NyaWJlKG9uZUZlYXR1cmUgPT4ge1xyXG4gICAgICAgIGNvbnN0IGZlYXR1cmVzID0gb2xGb3JtYXRzLnJlYWRGZWF0dXJlcyhvbmVGZWF0dXJlKTtcclxuICAgICAgICBmaWVsZExpc3QgPSBmZWF0dXJlc1swXS5nZXRLZXlzKCk7XHJcbiAgICAgICAgZmllbGRMaXN0V29HZW9tID0gZmllbGRMaXN0LmZpbHRlcihcclxuICAgICAgICAgIGZpZWxkID0+XHJcbiAgICAgICAgICAgIGZpZWxkICE9PSBmZWF0dXJlc1swXS5nZXRHZW9tZXRyeU5hbWUoKSAmJlxyXG4gICAgICAgICAgICAhZmllbGQubWF0Y2goL2JvdW5kZWRieS9naSlcclxuICAgICAgICApO1xyXG4gICAgICAgIGZpZWxkTGlzdFdvR2VvbVN0ciA9IGZpZWxkTGlzdFdvR2VvbS5qb2luKCcsJyk7XHJcbiAgICAgICAgdGhpcy53ZnNHZXRGZWF0dXJlKFxyXG4gICAgICAgICAgZGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgICAgICAgICBkYXRhU291cmNlT3B0aW9ucy5wYXJhbXNXRlMubWF4RmVhdHVyZXMgfHwgZGVmYXVsdE1heEZlYXR1cmVzLFxyXG4gICAgICAgICAgZGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTLnNyc05hbWUsXHJcbiAgICAgICAgICBmaWVsZExpc3RXb0dlb21TdHJcclxuICAgICAgICApLnN1YnNjcmliZShtYW55RmVhdHVyZXMgPT4ge1xyXG4gICAgICAgICAgY29uc3QgbWZlYXR1cmVzID0gb2xGb3JtYXRzLnJlYWRGZWF0dXJlcyhtYW55RmVhdHVyZXMpO1xyXG4gICAgICAgICAgdGhpcy5idWlsdF9wcm9wZXJ0aWVzX3ZhbHVlKG1mZWF0dXJlcykuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgc291cmNlRmllbGRzLnB1c2goZWxlbWVudCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGQubmV4dChzb3VyY2VGaWVsZHMpO1xyXG4gICAgICAgICAgZC5jb21wbGV0ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYnVpbHRfcHJvcGVydGllc192YWx1ZShmZWF0dXJlczogb2xGZWF0dXJlW10pOiBzdHJpbmdbXSB7XHJcbiAgICBjb25zdCBrdiA9IE9iamVjdC5hc3NpZ24oe30sIGZlYXR1cmVzWzBdLmdldFByb3BlcnRpZXMoKSk7XHJcbiAgICBkZWxldGUga3ZbZmVhdHVyZXNbMF0uZ2V0R2VvbWV0cnlOYW1lKCldO1xyXG4gICAgZGVsZXRlIGt2LmJvdW5kZWRCeTtcclxuICAgIGNvbnN0IHNvdXJjZUZpZWxkcyA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBrdikge1xyXG4gICAgICBpZiAoa3YuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XHJcbiAgICAgICAgY29uc3QgZmllbGRUeXBlID1cclxuICAgICAgICAgIHR5cGVvZiBmZWF0dXJlc1swXS5nZXQocHJvcGVydHkpID09PSAnb2JqZWN0J1xyXG4gICAgICAgICAgICA/IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICA6IHR5cGVvZiBmZWF0dXJlc1swXS5nZXQocHJvcGVydHkpO1xyXG4gICAgICAgIHNvdXJjZUZpZWxkcy5wdXNoKHtcclxuICAgICAgICAgIG5hbWU6IHByb3BlcnR5LFxyXG4gICAgICAgICAgYWxpYXM6IHByb3BlcnR5LFxyXG4gICAgICAgICAgdHlwZTogZmllbGRUeXBlLFxyXG4gICAgICAgICAgdmFsdWVzOiBba3ZbcHJvcGVydHldXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmZWF0dXJlcy5ldmVyeSgoZWxlbWVudCkgPT4ge1xyXG4gICAgICBjb25zdCBmZWF0dXJlUHJvcGVydGllcyA9IGVsZW1lbnQuZ2V0UHJvcGVydGllcygpO1xyXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBmZWF0dXJlUHJvcGVydGllcykge1xyXG4gICAgICAgIGlmIChmZWF0dXJlUHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGtleSBpbiBrdikge1xyXG4gICAgICAgICAgc291cmNlRmllbGRzLmZpbHRlcihmID0+IGYubmFtZSA9PT0ga2V5KS5mb3JFYWNoKHYgPT4ge1xyXG4gICAgICAgICAgICBpZiAodi52YWx1ZXMuaW5kZXhPZihmZWF0dXJlUHJvcGVydGllc1trZXldKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICB2LnZhbHVlcy5wdXNoKGZlYXR1cmVQcm9wZXJ0aWVzW2tleV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBzb3VyY2VGaWVsZHM7XHJcbiAgfVxyXG59XHJcbiJdfQ==