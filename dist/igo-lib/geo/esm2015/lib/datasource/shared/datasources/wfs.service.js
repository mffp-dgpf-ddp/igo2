/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as olformat from 'ol/format';
import { DataService } from './data.service';
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
        if (datasource.sourceFields === undefined ||
            Object.keys(datasource.sourceFields).length === 0) {
            datasource.sourceFields = [];
            this.wfsGetCapabilities(datasource).subscribe((/**
             * @param {?} wfsCapabilities
             * @return {?}
             */
            wfsCapabilities => {
                datasource.paramsWFS.wfsCapabilities = {
                    xmlBody: wfsCapabilities.body,
                    GetPropertyValue: /GetPropertyValue/gi.test(wfsCapabilities.body)
                        ? true
                        : false
                };
                this.defineFieldAndValuefromWFS(datasource).subscribe((/**
                 * @param {?} sourceFields
                 * @return {?}
                 */
                sourceFields => {
                    datasource.sourceFields = sourceFields;
                }));
            }));
        }
        else {
            datasource.sourceFields.forEach((/**
             * @param {?} sourcefield
             * @return {?}
             */
            sourcefield => {
                if (sourcefield.alias === undefined) {
                    sourcefield.alias = sourcefield.name; // to allow only a list of sourcefield with names
                }
            }));
            datasource.sourceFields
                .filter((/**
             * @param {?} field
             * @return {?}
             */
            field => field.values === undefined || field.values.length === 0))
                .forEach((/**
             * @param {?} f
             * @return {?}
             */
            f => {
                this.getValueFromWfsGetPropertyValues(datasource, f.name, 200, 0, 0).subscribe((/**
                 * @param {?} rep
                 * @return {?}
                 */
                rep => (f.values = rep)));
            }));
        }
    }
    /**
     * @param {?} wfsDataSourceOptions
     * @return {?}
     */
    checkWfsOptions(wfsDataSourceOptions) {
        // Look at https://github.com/openlayers/openlayers/pull/6400
        /** @type {?} */
        const patternGml = new RegExp(/.*?gml.*?/gi);
        if (patternGml.test(wfsDataSourceOptions.paramsWFS.outputFormat)) {
            wfsDataSourceOptions.paramsWFS.version = '1.1.0';
        }
        return Object.assign({}, wfsDataSourceOptions, {
            wfsCapabilities: { xmlBody: '', GetPropertyValue: false }
        });
    }
    /**
     * @param {?} wfsDataSourceOptions
     * @param {?} wfsQuery
     * @return {?}
     */
    buildBaseWfsUrl(wfsDataSourceOptions, wfsQuery) {
        /** @type {?} */
        let paramTypename = 'typename';
        if (wfsDataSourceOptions.paramsWFS.version === '2.0.0' ||
            !wfsDataSourceOptions.paramsWFS.version) {
            paramTypename = 'typenames';
        }
        /** @type {?} */
        const baseWfsQuery = 'service=wfs&request=' + wfsQuery;
        /** @type {?} */
        const wfsTypeName = paramTypename + '=' + wfsDataSourceOptions.paramsWFS.featureTypes;
        /** @type {?} */
        const wfsVersion = wfsDataSourceOptions.paramsWFS.version
            ? 'version=' + wfsDataSourceOptions.paramsWFS.version
            : 'version=' + '2.0.0';
        return `${wfsDataSourceOptions.urlWfs}?${baseWfsQuery}&${wfsVersion}&${wfsTypeName}`;
    }
    /**
     * @param {?} wfsDataSourceOptions
     * @param {?=} nb
     * @param {?=} epsgCode
     * @param {?=} propertyname
     * @return {?}
     */
    wfsGetFeature(wfsDataSourceOptions, nb = 5000, epsgCode = 3857, propertyname = '') {
        /** @type {?} */
        const baseUrl = this.buildBaseWfsUrl(wfsDataSourceOptions, 'GetFeature');
        /** @type {?} */
        const outputFormat = wfsDataSourceOptions.paramsWFS.outputFormat
            ? 'outputFormat=' + wfsDataSourceOptions.paramsWFS.outputFormat
            : '';
        /** @type {?} */
        const srsname = wfsDataSourceOptions.paramsWFS.srsName
            ? 'srsname=' + wfsDataSourceOptions.paramsWFS.srsName
            : 'srsname=EPSG:' + epsgCode;
        /** @type {?} */
        const wfspropertyname = propertyname === '' ? propertyname : '&propertyname=' + propertyname;
        /** @type {?} */
        let paramMaxFeatures = 'maxFeatures';
        if (wfsDataSourceOptions.paramsWFS.version === '2.0.0' ||
            !wfsDataSourceOptions.paramsWFS.version) {
            paramMaxFeatures = 'count';
        }
        /** @type {?} */
        let maxFeatures;
        if (nb !== 5000) {
            maxFeatures = paramMaxFeatures + '=' + nb;
        }
        else {
            maxFeatures = wfsDataSourceOptions.paramsWFS.maxFeatures
                ? paramMaxFeatures + '=' + wfsDataSourceOptions.paramsWFS.maxFeatures
                : paramMaxFeatures + '=' + nb;
        }
        /** @type {?} */
        const urlWfs = `${baseUrl}&${outputFormat}&${srsname}&${maxFeatures}${wfspropertyname}`;
        /** @type {?} */
        const patternGml = new RegExp('.*?gml.*?');
        if (patternGml.test(wfsDataSourceOptions.paramsWFS.outputFormat.toLowerCase())) {
            return this.http.get(urlWfs, { responseType: 'text' });
        }
        else {
            return this.http.get(urlWfs);
        }
    }
    /**
     * @param {?} wfsDataSourceOptions
     * @param {?} field
     * @param {?=} maxFeatures
     * @param {?=} startIndex
     * @param {?=} retry
     * @return {?}
     */
    getValueFromWfsGetPropertyValues(wfsDataSourceOptions, field, maxFeatures = 30, startIndex = 0, retry = 0) {
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        d => {
            /** @type {?} */
            const nbRetry = 2;
            /** @type {?} */
            const valueList = [];
            this.wfsGetPropertyValue(wfsDataSourceOptions, field, maxFeatures, startIndex).subscribe((/**
             * @param {?} str
             * @return {?}
             */
            str => {
                str = str.replace(/&#39;/gi, "'"); // tslint:disable-line
                // tslint:disable-line
                /** @type {?} */
                const regexExcp = /exception/gi;
                if (regexExcp.test(str)) {
                    retry++;
                    if (retry < nbRetry) {
                        this.getValueFromWfsGetPropertyValues(wfsDataSourceOptions, field, maxFeatures, startIndex, retry).subscribe((/**
                         * @param {?} rep
                         * @return {?}
                         */
                        rep => d.next(rep)));
                    }
                }
                else {
                    /** @type {?} */
                    const valueReferenceRegex = new RegExp('<(.+?)' + field + '>(.+?)</(.+?)' + field + '>', 'gi');
                    /** @type {?} */
                    let n = valueReferenceRegex.exec(str);
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
            err => {
                if (retry < nbRetry) {
                    retry++;
                    this.getValueFromWfsGetPropertyValues(wfsDataSourceOptions, field, maxFeatures, startIndex, retry).subscribe((/**
                     * @param {?} rep
                     * @return {?}
                     */
                    rep => d.next(rep)));
                }
            }));
        }));
    }
    /**
     * @param {?} options
     * @return {?}
     */
    wfsGetCapabilities(options) {
        /** @type {?} */
        const baseWfsQuery = 'service=wfs&request=GetCapabilities';
        /** @type {?} */
        const wfsVersion = options.version
            ? 'version=' + options.version
            : 'version=' + '2.0.0';
        /** @type {?} */
        const wfsGcUrl = `${options.urlWfs}?${baseWfsQuery}&${wfsVersion}`;
        return this.http.get(wfsGcUrl, {
            observe: 'response',
            responseType: 'text'
        });
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
            const patternGml3 = /gml/gi;
            if (wfsDataSourceOptions.paramsWFS.outputFormat.match(patternGml3)) {
                olFormats = olformat.WFS;
            }
            else {
                olFormats = olformat.GeoJSON;
            }
            if (wfsDataSourceOptions.paramsWFS.wfsCapabilities.GetPropertyValue) {
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
                    fieldListWoGeom.forEach((/**
                     * @param {?} element
                     * @return {?}
                     */
                    element => {
                        /** @type {?} */
                        const fieldType = typeof features[0].get(element) === 'object'
                            ? undefined
                            : typeof features[0].get(element);
                        this.getValueFromWfsGetPropertyValues(wfsDataSourceOptions, element, 200).subscribe((/**
                         * @param {?} valueList
                         * @return {?}
                         */
                        valueList => {
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
                    this.wfsGetFeature(wfsDataSourceOptions, 200, 3857, fieldListWoGeomStr).subscribe((/**
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
            }
        }));
    }
    /**
     * @param {?} wfsDataSourceOptions
     * @param {?} field
     * @param {?=} maxFeatures
     * @param {?=} startIndex
     * @return {?}
     */
    wfsGetPropertyValue(wfsDataSourceOptions, field, maxFeatures = 30, startIndex = 0) {
        /** @type {?} */
        const baseWfsQuery = 'service=wfs&request=GetPropertyValue&count=' + maxFeatures;
        /** @type {?} */
        const wfsTypeName = 'typenames=' + wfsDataSourceOptions.paramsWFS.featureTypes;
        /** @type {?} */
        const wfsValueReference = 'valueReference=' + field;
        /** @type {?} */
        const wfsVersion = 'version=' + '2.0.0';
        /** @type {?} */
        const gfvUrl = `${wfsDataSourceOptions.urlWfs}?${baseWfsQuery}&${wfsVersion}&${wfsTypeName}&${wfsValueReference}`;
        return this.http.get(gfvUrl, { responseType: 'text' });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ZzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd2ZzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHbEMsT0FBTyxLQUFLLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFHdEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFLN0MsTUFBTSxPQUFPLFVBQVcsU0FBUSxXQUFXOzs7O0lBQ3pDLFlBQW9CLElBQWdCO1FBQ2xDLEtBQUssRUFBRSxDQUFDO1FBRFUsU0FBSSxHQUFKLElBQUksQ0FBWTtJQUVwQyxDQUFDOzs7O0lBRUQsT0FBTztRQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLENBQUMsQ0FBQztRQUNoRCxPQUFPLGtDQUFrQyxDQUFDO0lBQzVDLENBQUM7Ozs7O0lBRU0sc0JBQXNCLENBQUMsVUFBVTtRQUN0QyxJQUNFLFVBQVUsQ0FBQyxZQUFZLEtBQUssU0FBUztZQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUNqRDtZQUNBLFVBQVUsQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxTQUFTOzs7O1lBQUMsZUFBZSxDQUFDLEVBQUU7Z0JBQzlELFVBQVUsQ0FBQyxTQUFTLENBQUMsZUFBZSxHQUFHO29CQUNyQyxPQUFPLEVBQUUsZUFBZSxDQUFDLElBQUk7b0JBQzdCLGdCQUFnQixFQUFFLG9CQUFvQixDQUFD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S0FBSyxNQUFNLEdBQUcsSUFBSSxpQkFBaUIsRUFBRTtnQkFDbkMsSUFBSSxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLEVBQUUsRUFBRTtvQkFDdEQsWUFBWSxDQUFDLE1BQU07Ozs7b0JBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsRUFBQyxDQUFDLE9BQU87Ozs7b0JBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBQ25ELElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTs0QkFDbkQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt5QkFDdkM7b0JBQ0gsQ0FBQyxFQUFDLENBQUM7aUJBQ0o7YUFDRjtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxFQUFDLENBQUM7UUFDSCxPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDOzs7WUE3VUYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBWFEsVUFBVTs7Ozs7Ozs7SUFhTCwwQkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCBvbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCAqIGFzIG9sZm9ybWF0IGZyb20gJ29sL2Zvcm1hdCc7XHJcblxyXG5pbXBvcnQgeyBXRlNEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4vd2ZzLWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuL2RhdGEuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBXRlNTZXJ2aWNlIGV4dGVuZHMgRGF0YVNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIGdldERhdGEoKSB7XHJcbiAgICBjb25zb2xlLmxvZygnVGhpcyBpcyBkZWZpbmluZyBhIGRhdGEgc2VydmljZS4nKTtcclxuICAgIHJldHVybiAnVGhpcyBpcyBkZWZpbmluZyBhIGRhdGEgc2VydmljZS4nO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFNvdXJjZUZpZWxkc0Zyb21XRlMoZGF0YXNvdXJjZSkge1xyXG4gICAgaWYgKFxyXG4gICAgICBkYXRhc291cmNlLnNvdXJjZUZpZWxkcyA9PT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgIE9iamVjdC5rZXlzKGRhdGFzb3VyY2Uuc291cmNlRmllbGRzKS5sZW5ndGggPT09IDBcclxuICAgICkge1xyXG4gICAgICBkYXRhc291cmNlLnNvdXJjZUZpZWxkcyA9IFtdO1xyXG4gICAgICB0aGlzLndmc0dldENhcGFiaWxpdGllcyhkYXRhc291cmNlKS5zdWJzY3JpYmUod2ZzQ2FwYWJpbGl0aWVzID0+IHtcclxuICAgICAgICBkYXRhc291cmNlLnBhcmFtc1dGUy53ZnNDYXBhYmlsaXRpZXMgPSB7XHJcbiAgICAgICAgICB4bWxCb2R5OiB3ZnNDYXBhYmlsaXRpZXMuYm9keSxcclxuICAgICAgICAgIEdldFByb3BlcnR5VmFsdWU6IC9HZXRQcm9wZXJ0eVZhbHVlL2dpLnRlc3Qod2ZzQ2FwYWJpbGl0aWVzLmJvZHkpXHJcbiAgICAgICAgICAgID8gdHJ1ZVxyXG4gICAgICAgICAgICA6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5kZWZpbmVGaWVsZEFuZFZhbHVlZnJvbVdGUyhkYXRhc291cmNlKS5zdWJzY3JpYmUoc291cmNlRmllbGRzID0+IHtcclxuICAgICAgICAgIGRhdGFzb3VyY2Uuc291cmNlRmllbGRzID0gc291cmNlRmllbGRzO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRhdGFzb3VyY2Uuc291cmNlRmllbGRzLmZvckVhY2goc291cmNlZmllbGQgPT4ge1xyXG4gICAgICAgIGlmIChzb3VyY2VmaWVsZC5hbGlhcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBzb3VyY2VmaWVsZC5hbGlhcyA9IHNvdXJjZWZpZWxkLm5hbWU7IC8vIHRvIGFsbG93IG9ubHkgYSBsaXN0IG9mIHNvdXJjZWZpZWxkIHdpdGggbmFtZXNcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgZGF0YXNvdXJjZS5zb3VyY2VGaWVsZHNcclxuICAgICAgICAuZmlsdGVyKFxyXG4gICAgICAgICAgZmllbGQgPT4gZmllbGQudmFsdWVzID09PSB1bmRlZmluZWQgfHwgZmllbGQudmFsdWVzLmxlbmd0aCA9PT0gMFxyXG4gICAgICAgIClcclxuICAgICAgICAuZm9yRWFjaChmID0+IHtcclxuICAgICAgICAgIHRoaXMuZ2V0VmFsdWVGcm9tV2ZzR2V0UHJvcGVydHlWYWx1ZXMoXHJcbiAgICAgICAgICAgIGRhdGFzb3VyY2UsXHJcbiAgICAgICAgICAgIGYubmFtZSxcclxuICAgICAgICAgICAgMjAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwXHJcbiAgICAgICAgICApLnN1YnNjcmliZShyZXAgPT4gKGYudmFsdWVzID0gcmVwKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2hlY2tXZnNPcHRpb25zKHdmc0RhdGFTb3VyY2VPcHRpb25zKSB7XHJcbiAgICAvLyBMb29rIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9vcGVubGF5ZXJzL29wZW5sYXllcnMvcHVsbC82NDAwXHJcbiAgICBjb25zdCBwYXR0ZXJuR21sID0gbmV3IFJlZ0V4cCgvLio/Z21sLio/L2dpKTtcclxuXHJcbiAgICBpZiAocGF0dGVybkdtbC50ZXN0KHdmc0RhdGFTb3VyY2VPcHRpb25zLnBhcmFtc1dGUy5vdXRwdXRGb3JtYXQpKSB7XHJcbiAgICAgIHdmc0RhdGFTb3VyY2VPcHRpb25zLnBhcmFtc1dGUy52ZXJzaW9uID0gJzEuMS4wJztcclxuICAgIH1cclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB3ZnNEYXRhU291cmNlT3B0aW9ucywge1xyXG4gICAgICB3ZnNDYXBhYmlsaXRpZXM6IHsgeG1sQm9keTogJycsIEdldFByb3BlcnR5VmFsdWU6IGZhbHNlIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGJ1aWxkQmFzZVdmc1VybChcclxuICAgIHdmc0RhdGFTb3VyY2VPcHRpb25zOiBXRlNEYXRhU291cmNlT3B0aW9ucyxcclxuICAgIHdmc1F1ZXJ5OiBzdHJpbmdcclxuICApOiBzdHJpbmcge1xyXG4gICAgbGV0IHBhcmFtVHlwZW5hbWUgPSAndHlwZW5hbWUnO1xyXG4gICAgaWYgKFxyXG4gICAgICB3ZnNEYXRhU291cmNlT3B0aW9ucy5wYXJhbXNXRlMudmVyc2lvbiA9PT0gJzIuMC4wJyB8fFxyXG4gICAgICAhd2ZzRGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTLnZlcnNpb25cclxuICAgICkge1xyXG4gICAgICBwYXJhbVR5cGVuYW1lID0gJ3R5cGVuYW1lcyc7XHJcbiAgICB9XHJcbiAgICBjb25zdCBiYXNlV2ZzUXVlcnkgPSAnc2VydmljZT13ZnMmcmVxdWVzdD0nICsgd2ZzUXVlcnk7XHJcbiAgICBjb25zdCB3ZnNUeXBlTmFtZSA9XHJcbiAgICAgIHBhcmFtVHlwZW5hbWUgKyAnPScgKyB3ZnNEYXRhU291cmNlT3B0aW9ucy5wYXJhbXNXRlMuZmVhdHVyZVR5cGVzO1xyXG4gICAgY29uc3Qgd2ZzVmVyc2lvbiA9IHdmc0RhdGFTb3VyY2VPcHRpb25zLnBhcmFtc1dGUy52ZXJzaW9uXHJcbiAgICAgID8gJ3ZlcnNpb249JyArIHdmc0RhdGFTb3VyY2VPcHRpb25zLnBhcmFtc1dGUy52ZXJzaW9uXHJcbiAgICAgIDogJ3ZlcnNpb249JyArICcyLjAuMCc7XHJcblxyXG4gICAgcmV0dXJuIGAke1xyXG4gICAgICB3ZnNEYXRhU291cmNlT3B0aW9ucy51cmxXZnNcclxuICAgIH0/JHtiYXNlV2ZzUXVlcnl9JiR7d2ZzVmVyc2lvbn0mJHt3ZnNUeXBlTmFtZX1gO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHdmc0dldEZlYXR1cmUoXHJcbiAgICB3ZnNEYXRhU291cmNlT3B0aW9uczogV0ZTRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgICBuYiA9IDUwMDAsXHJcbiAgICBlcHNnQ29kZSA9IDM4NTcsXHJcbiAgICBwcm9wZXJ0eW5hbWUgPSAnJ1xyXG4gICk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBjb25zdCBiYXNlVXJsID0gdGhpcy5idWlsZEJhc2VXZnNVcmwod2ZzRGF0YVNvdXJjZU9wdGlvbnMsICdHZXRGZWF0dXJlJyk7XHJcbiAgICBjb25zdCBvdXRwdXRGb3JtYXQgPSB3ZnNEYXRhU291cmNlT3B0aW9ucy5wYXJhbXNXRlMub3V0cHV0Rm9ybWF0XHJcbiAgICAgID8gJ291dHB1dEZvcm1hdD0nICsgd2ZzRGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTLm91dHB1dEZvcm1hdFxyXG4gICAgICA6ICcnO1xyXG4gICAgY29uc3Qgc3JzbmFtZSA9IHdmc0RhdGFTb3VyY2VPcHRpb25zLnBhcmFtc1dGUy5zcnNOYW1lXHJcbiAgICAgID8gJ3Nyc25hbWU9JyArIHdmc0RhdGFTb3VyY2VPcHRpb25zLnBhcmFtc1dGUy5zcnNOYW1lXHJcbiAgICAgIDogJ3Nyc25hbWU9RVBTRzonICsgZXBzZ0NvZGU7XHJcbiAgICBjb25zdCB3ZnNwcm9wZXJ0eW5hbWUgPVxyXG4gICAgICBwcm9wZXJ0eW5hbWUgPT09ICcnID8gcHJvcGVydHluYW1lIDogJyZwcm9wZXJ0eW5hbWU9JyArIHByb3BlcnR5bmFtZTtcclxuICAgIGxldCBwYXJhbU1heEZlYXR1cmVzID0gJ21heEZlYXR1cmVzJztcclxuICAgIGlmIChcclxuICAgICAgd2ZzRGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTLnZlcnNpb24gPT09ICcyLjAuMCcgfHxcclxuICAgICAgIXdmc0RhdGFTb3VyY2VPcHRpb25zLnBhcmFtc1dGUy52ZXJzaW9uXHJcbiAgICApIHtcclxuICAgICAgcGFyYW1NYXhGZWF0dXJlcyA9ICdjb3VudCc7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG1heEZlYXR1cmVzO1xyXG4gICAgaWYgKG5iICE9PSA1MDAwKSB7XHJcbiAgICAgIG1heEZlYXR1cmVzID0gcGFyYW1NYXhGZWF0dXJlcyArICc9JyArIG5iO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbWF4RmVhdHVyZXMgPSB3ZnNEYXRhU291cmNlT3B0aW9ucy5wYXJhbXNXRlMubWF4RmVhdHVyZXNcclxuICAgICAgICA/IHBhcmFtTWF4RmVhdHVyZXMgKyAnPScgKyB3ZnNEYXRhU291cmNlT3B0aW9ucy5wYXJhbXNXRlMubWF4RmVhdHVyZXNcclxuICAgICAgICA6IHBhcmFtTWF4RmVhdHVyZXMgKyAnPScgKyBuYjtcclxuICAgIH1cclxuICAgIGNvbnN0IHVybFdmcyA9IGAke2Jhc2VVcmx9JiR7b3V0cHV0Rm9ybWF0fSYke3Nyc25hbWV9JiR7bWF4RmVhdHVyZXN9JHt3ZnNwcm9wZXJ0eW5hbWV9YDtcclxuICAgIGNvbnN0IHBhdHRlcm5HbWwgPSBuZXcgUmVnRXhwKCcuKj9nbWwuKj8nKTtcclxuICAgIGlmIChcclxuICAgICAgcGF0dGVybkdtbC50ZXN0KHdmc0RhdGFTb3VyY2VPcHRpb25zLnBhcmFtc1dGUy5vdXRwdXRGb3JtYXQudG9Mb3dlckNhc2UoKSlcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmxXZnMsIHsgcmVzcG9uc2VUeXBlOiAndGV4dCcgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmxXZnMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFZhbHVlRnJvbVdmc0dldFByb3BlcnR5VmFsdWVzKFxyXG4gICAgd2ZzRGF0YVNvdXJjZU9wdGlvbnM6IFdGU0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gICAgZmllbGQsXHJcbiAgICBtYXhGZWF0dXJlcyA9IDMwLFxyXG4gICAgc3RhcnRJbmRleCA9IDAsXHJcbiAgICByZXRyeSA9IDBcclxuICApOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGQgPT4ge1xyXG4gICAgICBjb25zdCBuYlJldHJ5ID0gMjtcclxuICAgICAgY29uc3QgdmFsdWVMaXN0ID0gW107XHJcblxyXG4gICAgICB0aGlzLndmc0dldFByb3BlcnR5VmFsdWUoXHJcbiAgICAgICAgd2ZzRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgICAgICAgZmllbGQsXHJcbiAgICAgICAgbWF4RmVhdHVyZXMsXHJcbiAgICAgICAgc3RhcnRJbmRleFxyXG4gICAgICApLnN1YnNjcmliZShcclxuICAgICAgICBzdHIgPT4ge1xyXG4gICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoLyYjMzk7L2dpLCBcIidcIik7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxuICAgICAgICAgIGNvbnN0IHJlZ2V4RXhjcCA9IC9leGNlcHRpb24vZ2k7XHJcbiAgICAgICAgICBpZiAocmVnZXhFeGNwLnRlc3Qoc3RyKSkge1xyXG4gICAgICAgICAgICByZXRyeSsrO1xyXG4gICAgICAgICAgICBpZiAocmV0cnkgPCBuYlJldHJ5KSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5nZXRWYWx1ZUZyb21XZnNHZXRQcm9wZXJ0eVZhbHVlcyhcclxuICAgICAgICAgICAgICAgIHdmc0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgZmllbGQsXHJcbiAgICAgICAgICAgICAgICBtYXhGZWF0dXJlcyxcclxuICAgICAgICAgICAgICAgIHN0YXJ0SW5kZXgsXHJcbiAgICAgICAgICAgICAgICByZXRyeVxyXG4gICAgICAgICAgICAgICkuc3Vic2NyaWJlKHJlcCA9PiBkLm5leHQocmVwKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlUmVmZXJlbmNlUmVnZXggPSBuZXcgUmVnRXhwKFxyXG4gICAgICAgICAgICAgICc8KC4rPyknICsgZmllbGQgKyAnPiguKz8pPC8oLis/KScgKyBmaWVsZCArICc+JyxcclxuICAgICAgICAgICAgICAnZ2knXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGxldCBuID0gdmFsdWVSZWZlcmVuY2VSZWdleC5leGVjKHN0cik7XHJcbiAgICAgICAgICAgIHdoaWxlIChuICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgaWYgKG4uaW5kZXggPT09IHZhbHVlUmVmZXJlbmNlUmVnZXgubGFzdEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZVJlZmVyZW5jZVJlZ2V4Lmxhc3RJbmRleCsrO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZiAodmFsdWVMaXN0LmluZGV4T2YoblsyXSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZUxpc3QucHVzaChuWzJdKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgbiA9IHZhbHVlUmVmZXJlbmNlUmVnZXguZXhlYyhzdHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGQubmV4dCh2YWx1ZUxpc3QpO1xyXG4gICAgICAgICAgICBkLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgaWYgKHJldHJ5IDwgbmJSZXRyeSkge1xyXG4gICAgICAgICAgICByZXRyeSsrO1xyXG4gICAgICAgICAgICB0aGlzLmdldFZhbHVlRnJvbVdmc0dldFByb3BlcnR5VmFsdWVzKFxyXG4gICAgICAgICAgICAgIHdmc0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gICAgICAgICAgICAgIGZpZWxkLFxyXG4gICAgICAgICAgICAgIG1heEZlYXR1cmVzLFxyXG4gICAgICAgICAgICAgIHN0YXJ0SW5kZXgsXHJcbiAgICAgICAgICAgICAgcmV0cnlcclxuICAgICAgICAgICAgKS5zdWJzY3JpYmUocmVwID0+IGQubmV4dChyZXApKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHdmc0dldENhcGFiaWxpdGllcyhvcHRpb25zKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IGJhc2VXZnNRdWVyeSA9ICdzZXJ2aWNlPXdmcyZyZXF1ZXN0PUdldENhcGFiaWxpdGllcyc7XHJcbiAgICBjb25zdCB3ZnNWZXJzaW9uID0gb3B0aW9ucy52ZXJzaW9uXHJcbiAgICAgID8gJ3ZlcnNpb249JyArIG9wdGlvbnMudmVyc2lvblxyXG4gICAgICA6ICd2ZXJzaW9uPScgKyAnMi4wLjAnO1xyXG4gICAgY29uc3Qgd2ZzR2NVcmwgPSBgJHtvcHRpb25zLnVybFdmc30/JHtiYXNlV2ZzUXVlcnl9JiR7d2ZzVmVyc2lvbn1gO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQod2ZzR2NVcmwsIHtcclxuICAgICAgb2JzZXJ2ZTogJ3Jlc3BvbnNlJyxcclxuICAgICAgcmVzcG9uc2VUeXBlOiAndGV4dCdcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZGVmaW5lRmllbGRBbmRWYWx1ZWZyb21XRlMoXHJcbiAgICB3ZnNEYXRhU291cmNlT3B0aW9uczogV0ZTRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGQgPT4ge1xyXG4gICAgICBjb25zdCBzb3VyY2VGaWVsZHMgPSBbXTtcclxuICAgICAgbGV0IGZpZWxkTGlzdDtcclxuICAgICAgbGV0IGZpZWxkTGlzdFdvR2VvbTtcclxuICAgICAgbGV0IGZpZWxkTGlzdFdvR2VvbVN0cjtcclxuICAgICAgbGV0IG9sRm9ybWF0cztcclxuICAgICAgY29uc3QgcGF0dGVybkdtbDMgPSAvZ21sL2dpO1xyXG4gICAgICBpZiAod2ZzRGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTLm91dHB1dEZvcm1hdC5tYXRjaChwYXR0ZXJuR21sMykpIHtcclxuICAgICAgICBvbEZvcm1hdHMgPSBvbGZvcm1hdC5XRlM7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgb2xGb3JtYXRzID0gb2xmb3JtYXQuR2VvSlNPTjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHdmc0RhdGFTb3VyY2VPcHRpb25zLnBhcmFtc1dGUy53ZnNDYXBhYmlsaXRpZXMuR2V0UHJvcGVydHlWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMud2ZzR2V0RmVhdHVyZSh3ZnNEYXRhU291cmNlT3B0aW9ucywgMSkuc3Vic2NyaWJlKG9uZUZlYXR1cmUgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZmVhdHVyZXMgPSBuZXcgb2xGb3JtYXRzKCkucmVhZEZlYXR1cmVzKG9uZUZlYXR1cmUpO1xyXG4gICAgICAgICAgZmllbGRMaXN0ID0gZmVhdHVyZXNbMF0uZ2V0S2V5cygpO1xyXG4gICAgICAgICAgZmllbGRMaXN0V29HZW9tID0gZmllbGRMaXN0LmZpbHRlcihcclxuICAgICAgICAgICAgZmllbGQgPT5cclxuICAgICAgICAgICAgICBmaWVsZCAhPT0gZmVhdHVyZXNbMF0uZ2V0R2VvbWV0cnlOYW1lKCkgJiZcclxuICAgICAgICAgICAgICAhZmllbGQubWF0Y2goL2JvdW5kZWRieS9naSlcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBmaWVsZExpc3RXb0dlb21TdHIgPSBmaWVsZExpc3RXb0dlb20uam9pbignLCcpO1xyXG4gICAgICAgICAgZmllbGRMaXN0V29HZW9tLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkVHlwZSA9XHJcbiAgICAgICAgICAgICAgdHlwZW9mIGZlYXR1cmVzWzBdLmdldChlbGVtZW50KSA9PT0gJ29iamVjdCdcclxuICAgICAgICAgICAgICAgID8gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICA6IHR5cGVvZiBmZWF0dXJlc1swXS5nZXQoZWxlbWVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0VmFsdWVGcm9tV2ZzR2V0UHJvcGVydHlWYWx1ZXMoXHJcbiAgICAgICAgICAgICAgd2ZzRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgZWxlbWVudCxcclxuICAgICAgICAgICAgICAyMDBcclxuICAgICAgICAgICAgKS5zdWJzY3JpYmUodmFsdWVMaXN0ID0+IHtcclxuICAgICAgICAgICAgICBzb3VyY2VGaWVsZHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBlbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgYWxpYXM6IGVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZXM6IHZhbHVlTGlzdFxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIGQubmV4dChzb3VyY2VGaWVsZHMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMud2ZzR2V0RmVhdHVyZSh3ZnNEYXRhU291cmNlT3B0aW9ucywgMSkuc3Vic2NyaWJlKG9uZUZlYXR1cmUgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZmVhdHVyZXMgPSBuZXcgb2xGb3JtYXRzKCkucmVhZEZlYXR1cmVzKG9uZUZlYXR1cmUpO1xyXG4gICAgICAgICAgZmllbGRMaXN0ID0gZmVhdHVyZXNbMF0uZ2V0S2V5cygpO1xyXG4gICAgICAgICAgZmllbGRMaXN0V29HZW9tID0gZmllbGRMaXN0LmZpbHRlcihcclxuICAgICAgICAgICAgZmllbGQgPT5cclxuICAgICAgICAgICAgICBmaWVsZCAhPT0gZmVhdHVyZXNbMF0uZ2V0R2VvbWV0cnlOYW1lKCkgJiZcclxuICAgICAgICAgICAgICAhZmllbGQubWF0Y2goL2JvdW5kZWRieS9naSlcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBmaWVsZExpc3RXb0dlb21TdHIgPSBmaWVsZExpc3RXb0dlb20uam9pbignLCcpO1xyXG4gICAgICAgICAgdGhpcy53ZnNHZXRGZWF0dXJlKFxyXG4gICAgICAgICAgICB3ZnNEYXRhU291cmNlT3B0aW9ucyxcclxuICAgICAgICAgICAgMjAwLFxyXG4gICAgICAgICAgICAzODU3LFxyXG4gICAgICAgICAgICBmaWVsZExpc3RXb0dlb21TdHJcclxuICAgICAgICAgICkuc3Vic2NyaWJlKG1hbnlGZWF0dXJlcyA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1mZWF0dXJlcyA9IG5ldyBvbEZvcm1hdHMoKS5yZWFkRmVhdHVyZXMobWFueUZlYXR1cmVzKTtcclxuICAgICAgICAgICAgdGhpcy5idWlsdF9wcm9wZXJ0aWVzX3ZhbHVlKG1mZWF0dXJlcykuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICBzb3VyY2VGaWVsZHMucHVzaChlbGVtZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGQubmV4dChzb3VyY2VGaWVsZHMpO1xyXG4gICAgICAgICAgICBkLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgd2ZzR2V0UHJvcGVydHlWYWx1ZShcclxuICAgIHdmc0RhdGFTb3VyY2VPcHRpb25zOiBXRlNEYXRhU291cmNlT3B0aW9ucyxcclxuICAgIGZpZWxkLFxyXG4gICAgbWF4RmVhdHVyZXMgPSAzMCxcclxuICAgIHN0YXJ0SW5kZXggPSAwXHJcbiAgKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IGJhc2VXZnNRdWVyeSA9XHJcbiAgICAgICdzZXJ2aWNlPXdmcyZyZXF1ZXN0PUdldFByb3BlcnR5VmFsdWUmY291bnQ9JyArIG1heEZlYXR1cmVzO1xyXG4gICAgY29uc3Qgd2ZzVHlwZU5hbWUgPVxyXG4gICAgICAndHlwZW5hbWVzPScgKyB3ZnNEYXRhU291cmNlT3B0aW9ucy5wYXJhbXNXRlMuZmVhdHVyZVR5cGVzO1xyXG4gICAgY29uc3Qgd2ZzVmFsdWVSZWZlcmVuY2UgPSAndmFsdWVSZWZlcmVuY2U9JyArIGZpZWxkO1xyXG4gICAgY29uc3Qgd2ZzVmVyc2lvbiA9ICd2ZXJzaW9uPScgKyAnMi4wLjAnO1xyXG4gICAgY29uc3QgZ2Z2VXJsID0gYCR7XHJcbiAgICAgIHdmc0RhdGFTb3VyY2VPcHRpb25zLnVybFdmc1xyXG4gICAgfT8ke2Jhc2VXZnNRdWVyeX0mJHt3ZnNWZXJzaW9ufSYke3dmc1R5cGVOYW1lfSYke3dmc1ZhbHVlUmVmZXJlbmNlfWA7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChnZnZVcmwsIHsgcmVzcG9uc2VUeXBlOiAndGV4dCcgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGJ1aWx0X3Byb3BlcnRpZXNfdmFsdWUoZmVhdHVyZXM6IG9sRmVhdHVyZVtdKTogc3RyaW5nW10ge1xyXG4gICAgY29uc3Qga3YgPSBPYmplY3QuYXNzaWduKHt9LCBmZWF0dXJlc1swXS5nZXRQcm9wZXJ0aWVzKCkpO1xyXG4gICAgZGVsZXRlIGt2W2ZlYXR1cmVzWzBdLmdldEdlb21ldHJ5TmFtZSgpXTtcclxuICAgIGRlbGV0ZSBrdi5ib3VuZGVkQnk7XHJcbiAgICBjb25zdCBzb3VyY2VGaWVsZHMgPSBbXTtcclxuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4ga3YpIHtcclxuICAgICAgaWYgKGt2Lmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xyXG4gICAgICAgIGNvbnN0IGZpZWxkVHlwZSA9XHJcbiAgICAgICAgICB0eXBlb2YgZmVhdHVyZXNbMF0uZ2V0KHByb3BlcnR5KSA9PT0gJ29iamVjdCdcclxuICAgICAgICAgICAgPyB1bmRlZmluZWRcclxuICAgICAgICAgICAgOiB0eXBlb2YgZmVhdHVyZXNbMF0uZ2V0KHByb3BlcnR5KTtcclxuICAgICAgICBzb3VyY2VGaWVsZHMucHVzaCh7XHJcbiAgICAgICAgICBuYW1lOiBwcm9wZXJ0eSxcclxuICAgICAgICAgIGFsaWFzOiBwcm9wZXJ0eSxcclxuICAgICAgICAgIHR5cGU6IGZpZWxkVHlwZSxcclxuICAgICAgICAgIHZhbHVlczogW2t2W3Byb3BlcnR5XV1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZmVhdHVyZXMuZXZlcnkoKGVsZW1lbnQpID0+IHtcclxuICAgICAgY29uc3QgZmVhdHVyZVByb3BlcnRpZXMgPSBlbGVtZW50LmdldFByb3BlcnRpZXMoKTtcclxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gZmVhdHVyZVByb3BlcnRpZXMpIHtcclxuICAgICAgICBpZiAoZmVhdHVyZVByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBrZXkgaW4ga3YpIHtcclxuICAgICAgICAgIHNvdXJjZUZpZWxkcy5maWx0ZXIoZiA9PiBmLm5hbWUgPT09IGtleSkuZm9yRWFjaCh2ID0+IHtcclxuICAgICAgICAgICAgaWYgKHYudmFsdWVzLmluZGV4T2YoZmVhdHVyZVByb3BlcnRpZXNba2V5XSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgdi52YWx1ZXMucHVzaChmZWF0dXJlUHJvcGVydGllc1trZXldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gc291cmNlRmllbGRzO1xyXG4gIH1cclxufVxyXG4iXX0=