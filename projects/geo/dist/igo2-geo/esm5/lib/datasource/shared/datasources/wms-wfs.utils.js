/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import * as OlFormat from 'ol/format';
import olFormatGML2 from 'ol/format/GML2';
import olFormatGML3 from 'ol/format/GML3';
import olFormatGML32 from 'ol/format/GML32';
import olFormatOSMXML from 'ol/format/OSMXML';
/** @type {?} */
export var defaultEpsg = 'EPSG:3857';
/** @type {?} */
export var defaultMaxFeatures = 5000;
/** @type {?} */
export var defaultWfsVersion = '2.0.0';
/** @type {?} */
export var defaultFieldNameGeometry = 'geometry';
/** @type {?} */
export var gmlRegex = new RegExp(/(.*)?gml(.*)?/gi);
/** @type {?} */
export var jsonRegex = new RegExp(/(.*)?json(.*)?/gi);
/**
 * This method build/standardize WFS call query params based on the layer property.
 * @param {?} dataSourceOptions
 * @param {?=} count  Number: Used to control the number of feature. Used to bypass whe wfs datasource options interface (maxFeatures)
 * @param {?=} epsg  String: Used to control the EPSG code (es: 'EPSG3857'). Used to bypass whe wfs datasource options interface (srsName)
 * @param {?=} properties  String: Used to control the queried fields  (WFS service).
 * @return {?} An array array of {name: '', value: ''} of predefined query params.
 */
export function formatWFSQueryString(dataSourceOptions, count, epsg, properties) {
    /** @type {?} */
    var versionWfs200 = '2.0.0';
    // not the same usage as defaultWfsVersion.
    /** @type {?} */
    var url = dataSourceOptions.urlWfs;
    /** @type {?} */
    var paramsWFS = dataSourceOptions.paramsWFS;
    /** @type {?} */
    var effectiveCount = count || defaultMaxFeatures;
    /** @type {?} */
    var epsgCode = epsg || defaultEpsg;
    /** @type {?} */
    var outputFormat = paramsWFS.outputFormat
        ? "outputFormat=" + paramsWFS.outputFormat
        : '';
    /** @type {?} */
    var version = paramsWFS.version
        ? "version=" + paramsWFS.version
        : "version=" + defaultWfsVersion;
    /** @type {?} */
    var paramTypename = paramsWFS.version === versionWfs200 ? 'typenames' : 'typename';
    /** @type {?} */
    var featureTypes = paramTypename + "=" + paramsWFS.featureTypes;
    /** @type {?} */
    var paramMaxFeatures = paramsWFS.version === versionWfs200 ? 'count' : 'maxFeatures';
    /** @type {?} */
    var cnt = count
        ? paramMaxFeatures + "=" + effectiveCount
        : paramsWFS.maxFeatures
            ? paramMaxFeatures + "=" + paramsWFS.maxFeatures
            : paramMaxFeatures + "=" + effectiveCount;
    /** @type {?} */
    var srs = epsg
        ? "srsname=" + epsgCode
        : paramsWFS.srsName
            ? 'srsname=' + paramsWFS.srsName
            : "srsname=" + epsgCode;
    /** @type {?} */
    var propertyName = '';
    /** @type {?} */
    var valueReference = '';
    if (properties) {
        propertyName = "propertyName=" + properties;
        valueReference = "valueReference=" + properties;
    }
    /** @type {?} */
    var sourceFields = dataSourceOptions.sourceFields;
    if (!propertyName && sourceFields && sourceFields.length > 0) {
        /** @type {?} */
        var fieldsNames_1 = [];
        dataSourceOptions.sourceFields.forEach((/**
         * @param {?} sourcefield
         * @return {?}
         */
        function (sourcefield) {
            fieldsNames_1.push(sourcefield.name);
        }));
        propertyName = "propertyName=" + fieldsNames_1.join(',') + "," + paramsWFS.fieldNameGeometry;
    }
    /** @type {?} */
    var getCapabilities = url + "?service=WFS&request=GetCapabilities&" + version;
    /** @type {?} */
    var getFeature = url + "?service=WFS&request=GetFeature&" + version + "&" + featureTypes + "&";
    getFeature += outputFormat + "&" + srs + "&" + cnt + "&" + propertyName;
    /** @type {?} */
    var getpropertyvalue = url + "?service=WFS&request=GetPropertyValue&version=" + versionWfs200 + "&" + featureTypes + "&";
    getpropertyvalue += "&" + cnt + "&" + valueReference;
    return [
        { name: 'outputformat', value: outputFormat },
        { name: 'version', value: version },
        { name: 'typename', value: featureTypes },
        { name: 'count', value: cnt },
        { name: 'srsname', value: srs },
        { name: 'propertyname', value: propertyName },
        { name: 'valuereference', value: valueReference },
        { name: 'getcapabilities', value: getCapabilities.replace(/&&/g, '&') },
        { name: 'getfeature', value: getFeature.replace(/&&/g, '&') },
        { name: 'getpropertyvalue', value: getpropertyvalue.replace(/&&/g, '&') }
    ];
}
/**
 * Validate/Modify layer's wfs options based on :
 * 1- an Openlayers's issue with GML provided from WFS. Refer to
 * https://github.com/openlayers/openlayers/pull/6400
 * 2- Set default values for optionals parameters.
 * @param {?} wfsDataSourceOptions  WFSDataSourceOptions The common wfs datasource options interface
 * @param {?=} srcType
 * @return {?} An array array of {name: '', value: ''} of predefined query params.
 */
export function checkWfsParams(wfsDataSourceOptions, srcType) {
    if (srcType && srcType === 'wfs') {
        // reassignation of params to paramsWFS and url to urlWFS to have a common interface with wms-wfs datasources
        wfsDataSourceOptions.paramsWFS = wfsDataSourceOptions.params;
    }
    /** @type {?} */
    var paramsWFS = wfsDataSourceOptions.paramsWFS;
    wfsDataSourceOptions.urlWfs =
        wfsDataSourceOptions.urlWfs || wfsDataSourceOptions.url;
    paramsWFS.version = paramsWFS.version || defaultWfsVersion;
    paramsWFS.fieldNameGeometry =
        paramsWFS.fieldNameGeometry || defaultFieldNameGeometry;
    paramsWFS.maxFeatures = paramsWFS.maxFeatures || defaultMaxFeatures;
    /** @type {?} */
    var outputFormat;
    if (paramsWFS.outputFormat) {
        outputFormat = paramsWFS.outputFormat;
    }
    if (gmlRegex.test(outputFormat) || !outputFormat) {
        paramsWFS.version = '1.1.0';
    }
    return Object.assign({}, wfsDataSourceOptions);
}
/**
 * @param {?} options
 * @return {?}
 */
export function getFormatFromOptions(options) {
    /** @type {?} */
    var wfsOptions = (/** @type {?} */ (options));
    /** @type {?} */
    var olFormatCls = OlFormat.WFS;
    /** @type {?} */
    var outputFormat = wfsOptions.paramsWFS.outputFormat
        ? wfsOptions.paramsWFS.outputFormat
        : undefined;
    if (!outputFormat) {
        return new olFormatCls(wfsOptions.formatOptions);
    }
    if (OlFormat[outputFormat]) {
        olFormatCls = OlFormat[outputFormat];
        return new olFormatCls(wfsOptions.formatOptions);
    }
    else if (outputFormat.toLowerCase().match('gml2')) {
        olFormatCls = OlFormat.WFS;
        return new olFormatCls(tslib_1.__assign({}, wfsOptions.formatOptions, { gmlFormat: olFormatGML2 }));
    }
    else if (outputFormat.toLowerCase().match('gml32')) {
        olFormatCls = OlFormat.WFS;
        return new olFormatCls(tslib_1.__assign({}, wfsOptions.formatOptions, { gmlFormat: olFormatGML32 }));
    }
    else if (outputFormat.toLowerCase().match('gml3')) {
        olFormatCls = OlFormat.WFS;
        return new olFormatCls(tslib_1.__assign({}, wfsOptions.formatOptions, { gmlFormat: olFormatGML3 }));
    }
    else if (outputFormat.toLowerCase().match('topojson')) {
        olFormatCls = OlFormat.TopoJSON;
        return new olFormatCls(wfsOptions.formatOptions);
    }
    else if (outputFormat.toLowerCase().match('geojson')) {
        olFormatCls = OlFormat.GeoJSON;
        return new olFormatCls(wfsOptions.formatOptions);
    }
    else if (outputFormat.toLowerCase().match('esrijson')) {
        olFormatCls = OlFormat.EsriJSON;
        return new olFormatCls(wfsOptions.formatOptions);
    }
    else if (outputFormat.toLowerCase().match('json')) {
        olFormatCls = OlFormat.GeoJSON;
        return new olFormatCls(wfsOptions.formatOptions);
    }
    else if (outputFormat.toLowerCase().match('gpx')) {
        olFormatCls = OlFormat.GPX;
        return new olFormatCls(wfsOptions.formatOptions);
    }
    else if (outputFormat.toLowerCase().match('WKT')) {
        olFormatCls = OlFormat.WKT;
        return new olFormatCls(wfsOptions.formatOptions);
    }
    else if (outputFormat.toLowerCase().match('osmxml')) {
        olFormatCls = olFormatOSMXML;
        return new olFormatCls(wfsOptions.formatOptions);
    }
    else if (outputFormat.toLowerCase().match('kml')) {
        olFormatCls = OlFormat.KML;
        return new olFormatCls(wfsOptions.formatOptions);
    }
    return new olFormatCls();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zLXdmcy51dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy93bXMtd2ZzLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxLQUFLLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxZQUFZLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUMsT0FBTyxZQUFZLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUMsT0FBTyxhQUFhLE1BQU0saUJBQWlCLENBQUM7QUFDNUMsT0FBTyxjQUFjLE1BQU0sa0JBQWtCLENBQUM7O0FBRTlDLE1BQU0sS0FBTyxXQUFXLEdBQUcsV0FBVzs7QUFDdEMsTUFBTSxLQUFPLGtCQUFrQixHQUFHLElBQUk7O0FBQ3RDLE1BQU0sS0FBTyxpQkFBaUIsR0FBRyxPQUFPOztBQUN4QyxNQUFNLEtBQU8sd0JBQXdCLEdBQUcsVUFBVTs7QUFDbEQsTUFBTSxLQUFPLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQzs7QUFDckQsTUFBTSxLQUFPLFNBQVMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQzs7Ozs7Ozs7O0FBVXZELE1BQU0sVUFBVSxvQkFBb0IsQ0FDbEMsaUJBQThELEVBQzlELEtBQWMsRUFDZCxJQUFhLEVBQ2IsVUFBbUI7O1FBRWIsYUFBYSxHQUFHLE9BQU87OztRQUN2QixHQUFHLEdBQUcsaUJBQWlCLENBQUMsTUFBTTs7UUFDOUIsU0FBUyxHQUFHLGlCQUFpQixDQUFDLFNBQVM7O1FBQ3ZDLGNBQWMsR0FBRyxLQUFLLElBQUksa0JBQWtCOztRQUM1QyxRQUFRLEdBQUcsSUFBSSxJQUFJLFdBQVc7O1FBQzlCLFlBQVksR0FBRyxTQUFTLENBQUMsWUFBWTtRQUN6QyxDQUFDLENBQUMsa0JBQWdCLFNBQVMsQ0FBQyxZQUFjO1FBQzFDLENBQUMsQ0FBQyxFQUFFOztRQUNB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U0FBUyxFQUFFLFlBQVksRUFBRSxFQUFFLENBQUM7S0FDekY7U0FBTSxJQUFJLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDdkQsV0FBVyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFDaEMsT0FBTyxJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDbEQ7U0FBTSxJQUFJLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDdEQsV0FBVyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFDL0IsT0FBTyxJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDbEQ7U0FBTSxJQUFJLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDdkQsV0FBVyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFDaEMsT0FBTyxJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDbEQ7U0FBTSxJQUFJLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDbkQsV0FBVyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFDL0IsT0FBTyxJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDbEQ7U0FBTSxJQUFJLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDbEQsV0FBVyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFDM0IsT0FBTyxJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDbEQ7U0FBTSxJQUFJLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDbEQsV0FBVyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFDM0IsT0FBTyxJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDbEQ7U0FBTSxJQUFJLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDckQsV0FBVyxHQUFHLGNBQWMsQ0FBQztRQUM3QixPQUFPLElBQUksV0FBVyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztLQUNsRDtTQUFNLElBQUksWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNsRCxXQUFXLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUMzQixPQUFPLElBQUksV0FBVyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztLQUNsRDtJQUVELE9BQU8sSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUMzQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV0ZTRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuL3dmcy1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFdNU0RhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi93bXMtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgKiBhcyBPbEZvcm1hdCBmcm9tICdvbC9mb3JtYXQnO1xyXG5pbXBvcnQgb2xGb3JtYXRHTUwyIGZyb20gJ29sL2Zvcm1hdC9HTUwyJztcclxuaW1wb3J0IG9sRm9ybWF0R01MMyBmcm9tICdvbC9mb3JtYXQvR01MMyc7XHJcbmltcG9ydCBvbEZvcm1hdEdNTDMyIGZyb20gJ29sL2Zvcm1hdC9HTUwzMic7XHJcbmltcG9ydCBvbEZvcm1hdE9TTVhNTCBmcm9tICdvbC9mb3JtYXQvT1NNWE1MJztcclxuXHJcbmV4cG9ydCBjb25zdCBkZWZhdWx0RXBzZyA9ICdFUFNHOjM4NTcnO1xyXG5leHBvcnQgY29uc3QgZGVmYXVsdE1heEZlYXR1cmVzID0gNTAwMDtcclxuZXhwb3J0IGNvbnN0IGRlZmF1bHRXZnNWZXJzaW9uID0gJzIuMC4wJztcclxuZXhwb3J0IGNvbnN0IGRlZmF1bHRGaWVsZE5hbWVHZW9tZXRyeSA9ICdnZW9tZXRyeSc7XHJcbmV4cG9ydCBjb25zdCBnbWxSZWdleCA9IG5ldyBSZWdFeHAoLyguKik/Z21sKC4qKT8vZ2kpO1xyXG5leHBvcnQgY29uc3QganNvblJlZ2V4ID0gbmV3IFJlZ0V4cCgvKC4qKT9qc29uKC4qKT8vZ2kpO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgbWV0aG9kIGJ1aWxkL3N0YW5kYXJkaXplIFdGUyBjYWxsIHF1ZXJ5IHBhcmFtcyBiYXNlZCBvbiB0aGUgbGF5ZXIgcHJvcGVydHkuXHJcbiAqIEBwYXJhbSB3ZnNEYXRhU291cmNlT3B0aW9ucyAgV0ZTRGF0YVNvdXJjZU9wdGlvbnMgVGhlIGNvbW1vbiB3ZnMgZGF0YXNvdXJjZSBvcHRpb25zIGludGVyZmFjZVxyXG4gKiBAcGFyYW0gY291bnQgIE51bWJlcjogVXNlZCB0byBjb250cm9sIHRoZSBudW1iZXIgb2YgZmVhdHVyZS4gVXNlZCB0byBieXBhc3Mgd2hlIHdmcyBkYXRhc291cmNlIG9wdGlvbnMgaW50ZXJmYWNlIChtYXhGZWF0dXJlcylcclxuICogQHBhcmFtIGVwc2cgIFN0cmluZzogVXNlZCB0byBjb250cm9sIHRoZSBFUFNHIGNvZGUgKGVzOiAnRVBTRzM4NTcnKS4gVXNlZCB0byBieXBhc3Mgd2hlIHdmcyBkYXRhc291cmNlIG9wdGlvbnMgaW50ZXJmYWNlIChzcnNOYW1lKVxyXG4gKiBAcGFyYW0gcHJvcGVydGllcyAgU3RyaW5nOiBVc2VkIHRvIGNvbnRyb2wgdGhlIHF1ZXJpZWQgZmllbGRzICAoV0ZTIHNlcnZpY2UpLlxyXG4gKiBAcmV0dXJucyBBbiBhcnJheSBhcnJheSBvZiB7bmFtZTogJycsIHZhbHVlOiAnJ30gb2YgcHJlZGVmaW5lZCBxdWVyeSBwYXJhbXMuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0V0ZTUXVlcnlTdHJpbmcoXHJcbiAgZGF0YVNvdXJjZU9wdGlvbnM6IFdGU0RhdGFTb3VyY2VPcHRpb25zIHwgV01TRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgY291bnQ/OiBudW1iZXIsXHJcbiAgZXBzZz86IHN0cmluZyxcclxuICBwcm9wZXJ0aWVzPzogc3RyaW5nXHJcbik6IHsgbmFtZTogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH1bXSB7XHJcbiAgY29uc3QgdmVyc2lvbldmczIwMCA9ICcyLjAuMCc7IC8vIG5vdCB0aGUgc2FtZSB1c2FnZSBhcyBkZWZhdWx0V2ZzVmVyc2lvbi5cclxuICBjb25zdCB1cmwgPSBkYXRhU291cmNlT3B0aW9ucy51cmxXZnM7XHJcbiAgY29uc3QgcGFyYW1zV0ZTID0gZGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTO1xyXG4gIGNvbnN0IGVmZmVjdGl2ZUNvdW50ID0gY291bnQgfHwgZGVmYXVsdE1heEZlYXR1cmVzO1xyXG4gIGNvbnN0IGVwc2dDb2RlID0gZXBzZyB8fCBkZWZhdWx0RXBzZztcclxuICBjb25zdCBvdXRwdXRGb3JtYXQgPSBwYXJhbXNXRlMub3V0cHV0Rm9ybWF0XHJcbiAgICA/IGBvdXRwdXRGb3JtYXQ9JHtwYXJhbXNXRlMub3V0cHV0Rm9ybWF0fWBcclxuICAgIDogJyc7XHJcbiAgY29uc3QgdmVyc2lvbiA9IHBhcmFtc1dGUy52ZXJzaW9uXHJcbiAgICA/IGB2ZXJzaW9uPSR7cGFyYW1zV0ZTLnZlcnNpb259YFxyXG4gICAgOiBgdmVyc2lvbj0ke2RlZmF1bHRXZnNWZXJzaW9ufWA7XHJcbiAgY29uc3QgcGFyYW1UeXBlbmFtZSA9XHJcbiAgICBwYXJhbXNXRlMudmVyc2lvbiA9PT0gdmVyc2lvbldmczIwMCA/ICd0eXBlbmFtZXMnIDogJ3R5cGVuYW1lJztcclxuICBjb25zdCBmZWF0dXJlVHlwZXMgPSBgJHtwYXJhbVR5cGVuYW1lfT0ke3BhcmFtc1dGUy5mZWF0dXJlVHlwZXN9YDtcclxuICBjb25zdCBwYXJhbU1heEZlYXR1cmVzID1cclxuICAgIHBhcmFtc1dGUy52ZXJzaW9uID09PSB2ZXJzaW9uV2ZzMjAwID8gJ2NvdW50JyA6ICdtYXhGZWF0dXJlcyc7XHJcbiAgY29uc3QgY250ID0gY291bnRcclxuICAgID8gYCR7cGFyYW1NYXhGZWF0dXJlc309JHtlZmZlY3RpdmVDb3VudH1gXHJcbiAgICA6IHBhcmFtc1dGUy5tYXhGZWF0dXJlc1xyXG4gICAgPyBgJHtwYXJhbU1heEZlYXR1cmVzfT0ke3BhcmFtc1dGUy5tYXhGZWF0dXJlc31gXHJcbiAgICA6IGAke3BhcmFtTWF4RmVhdHVyZXN9PSR7ZWZmZWN0aXZlQ291bnR9YDtcclxuICBjb25zdCBzcnMgPSBlcHNnXHJcbiAgICA/IGBzcnNuYW1lPSR7ZXBzZ0NvZGV9YFxyXG4gICAgOiBwYXJhbXNXRlMuc3JzTmFtZVxyXG4gICAgPyAnc3JzbmFtZT0nICsgcGFyYW1zV0ZTLnNyc05hbWVcclxuICAgIDogYHNyc25hbWU9JHtlcHNnQ29kZX1gO1xyXG5cclxuICBsZXQgcHJvcGVydHlOYW1lID0gJyc7XHJcbiAgbGV0IHZhbHVlUmVmZXJlbmNlID0gJyc7XHJcbiAgaWYgKHByb3BlcnRpZXMpIHtcclxuICAgIHByb3BlcnR5TmFtZSA9IGBwcm9wZXJ0eU5hbWU9JHtwcm9wZXJ0aWVzfWA7XHJcbiAgICB2YWx1ZVJlZmVyZW5jZSA9IGB2YWx1ZVJlZmVyZW5jZT0ke3Byb3BlcnRpZXN9YDtcclxuICB9XHJcbiAgY29uc3Qgc291cmNlRmllbGRzID0gZGF0YVNvdXJjZU9wdGlvbnMuc291cmNlRmllbGRzO1xyXG4gIGlmICghcHJvcGVydHlOYW1lICYmIHNvdXJjZUZpZWxkcyAmJiBzb3VyY2VGaWVsZHMubGVuZ3RoID4gMCkge1xyXG4gICAgY29uc3QgZmllbGRzTmFtZXMgPSBbXTtcclxuICAgIGRhdGFTb3VyY2VPcHRpb25zLnNvdXJjZUZpZWxkcy5mb3JFYWNoKHNvdXJjZWZpZWxkID0+IHtcclxuICAgICAgZmllbGRzTmFtZXMucHVzaChzb3VyY2VmaWVsZC5uYW1lKTtcclxuICAgIH0pO1xyXG4gICAgcHJvcGVydHlOYW1lID0gYHByb3BlcnR5TmFtZT0ke2ZpZWxkc05hbWVzLmpvaW4oJywnKX0sJHtcclxuICAgICAgcGFyYW1zV0ZTLmZpZWxkTmFtZUdlb21ldHJ5XHJcbiAgICB9YDtcclxuICB9XHJcblxyXG4gIGNvbnN0IGdldENhcGFiaWxpdGllcyA9IGAke3VybH0/c2VydmljZT1XRlMmcmVxdWVzdD1HZXRDYXBhYmlsaXRpZXMmJHt2ZXJzaW9ufWA7XHJcbiAgbGV0IGdldEZlYXR1cmUgPSBgJHt1cmx9P3NlcnZpY2U9V0ZTJnJlcXVlc3Q9R2V0RmVhdHVyZSYke3ZlcnNpb259JiR7ZmVhdHVyZVR5cGVzfSZgO1xyXG4gIGdldEZlYXR1cmUgKz0gYCR7b3V0cHV0Rm9ybWF0fSYke3Nyc30mJHtjbnR9JiR7cHJvcGVydHlOYW1lfWA7XHJcblxyXG4gIGxldCBnZXRwcm9wZXJ0eXZhbHVlID0gYCR7dXJsfT9zZXJ2aWNlPVdGUyZyZXF1ZXN0PUdldFByb3BlcnR5VmFsdWUmdmVyc2lvbj0ke3ZlcnNpb25XZnMyMDB9JiR7ZmVhdHVyZVR5cGVzfSZgO1xyXG4gIGdldHByb3BlcnR5dmFsdWUgKz0gYCYke2NudH0mJHt2YWx1ZVJlZmVyZW5jZX1gO1xyXG5cclxuICByZXR1cm4gW1xyXG4gICAgeyBuYW1lOiAnb3V0cHV0Zm9ybWF0JywgdmFsdWU6IG91dHB1dEZvcm1hdCB9LFxyXG4gICAgeyBuYW1lOiAndmVyc2lvbicsIHZhbHVlOiB2ZXJzaW9uIH0sXHJcbiAgICB7IG5hbWU6ICd0eXBlbmFtZScsIHZhbHVlOiBmZWF0dXJlVHlwZXMgfSxcclxuICAgIHsgbmFtZTogJ2NvdW50JywgdmFsdWU6IGNudCB9LFxyXG4gICAgeyBuYW1lOiAnc3JzbmFtZScsIHZhbHVlOiBzcnMgfSxcclxuICAgIHsgbmFtZTogJ3Byb3BlcnR5bmFtZScsIHZhbHVlOiBwcm9wZXJ0eU5hbWUgfSxcclxuICAgIHsgbmFtZTogJ3ZhbHVlcmVmZXJlbmNlJywgdmFsdWU6IHZhbHVlUmVmZXJlbmNlIH0sXHJcbiAgICB7IG5hbWU6ICdnZXRjYXBhYmlsaXRpZXMnLCB2YWx1ZTogZ2V0Q2FwYWJpbGl0aWVzLnJlcGxhY2UoLyYmL2csICcmJykgfSxcclxuICAgIHsgbmFtZTogJ2dldGZlYXR1cmUnLCB2YWx1ZTogZ2V0RmVhdHVyZS5yZXBsYWNlKC8mJi9nLCAnJicpIH0sXHJcbiAgICB7IG5hbWU6ICdnZXRwcm9wZXJ0eXZhbHVlJywgdmFsdWU6IGdldHByb3BlcnR5dmFsdWUucmVwbGFjZSgvJiYvZywgJyYnKSB9XHJcbiAgXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFZhbGlkYXRlL01vZGlmeSBsYXllcidzIHdmcyBvcHRpb25zIGJhc2VkIG9uIDpcclxuICogMS0gYW4gT3BlbmxheWVycydzIGlzc3VlIHdpdGggR01MIHByb3ZpZGVkIGZyb20gV0ZTLiBSZWZlciB0b1xyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vb3BlbmxheWVycy9vcGVubGF5ZXJzL3B1bGwvNjQwMFxyXG4gKiAyLSBTZXQgZGVmYXVsdCB2YWx1ZXMgZm9yIG9wdGlvbmFscyBwYXJhbWV0ZXJzLlxyXG4gKiBAcGFyYW0gd2ZzRGF0YVNvdXJjZU9wdGlvbnMgIFdGU0RhdGFTb3VyY2VPcHRpb25zIFRoZSBjb21tb24gd2ZzIGRhdGFzb3VyY2Ugb3B0aW9ucyBpbnRlcmZhY2VcclxuICogQHJldHVybnMgQW4gYXJyYXkgYXJyYXkgb2Yge25hbWU6ICcnLCB2YWx1ZTogJyd9IG9mIHByZWRlZmluZWQgcXVlcnkgcGFyYW1zLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrV2ZzUGFyYW1zKHdmc0RhdGFTb3VyY2VPcHRpb25zLCBzcmNUeXBlPzogc3RyaW5nKSB7XHJcbiAgaWYgKHNyY1R5cGUgJiYgc3JjVHlwZSA9PT0gJ3dmcycpIHtcclxuICAgIC8vIHJlYXNzaWduYXRpb24gb2YgcGFyYW1zIHRvIHBhcmFtc1dGUyBhbmQgdXJsIHRvIHVybFdGUyB0byBoYXZlIGEgY29tbW9uIGludGVyZmFjZSB3aXRoIHdtcy13ZnMgZGF0YXNvdXJjZXNcclxuICAgIHdmc0RhdGFTb3VyY2VPcHRpb25zLnBhcmFtc1dGUyA9IHdmc0RhdGFTb3VyY2VPcHRpb25zLnBhcmFtcztcclxuICB9XHJcblxyXG4gIGNvbnN0IHBhcmFtc1dGUyA9IHdmc0RhdGFTb3VyY2VPcHRpb25zLnBhcmFtc1dGUztcclxuICB3ZnNEYXRhU291cmNlT3B0aW9ucy51cmxXZnMgPVxyXG4gICAgd2ZzRGF0YVNvdXJjZU9wdGlvbnMudXJsV2ZzIHx8IHdmc0RhdGFTb3VyY2VPcHRpb25zLnVybDtcclxuXHJcbiAgcGFyYW1zV0ZTLnZlcnNpb24gPSBwYXJhbXNXRlMudmVyc2lvbiB8fCBkZWZhdWx0V2ZzVmVyc2lvbjtcclxuICBwYXJhbXNXRlMuZmllbGROYW1lR2VvbWV0cnkgPVxyXG4gICAgcGFyYW1zV0ZTLmZpZWxkTmFtZUdlb21ldHJ5IHx8IGRlZmF1bHRGaWVsZE5hbWVHZW9tZXRyeTtcclxuICBwYXJhbXNXRlMubWF4RmVhdHVyZXMgPSBwYXJhbXNXRlMubWF4RmVhdHVyZXMgfHwgZGVmYXVsdE1heEZlYXR1cmVzO1xyXG5cclxuICBsZXQgb3V0cHV0Rm9ybWF0O1xyXG4gIGlmIChwYXJhbXNXRlMub3V0cHV0Rm9ybWF0KSB7XHJcbiAgICBvdXRwdXRGb3JtYXQgPSBwYXJhbXNXRlMub3V0cHV0Rm9ybWF0O1xyXG4gIH1cclxuXHJcbiAgaWYgKGdtbFJlZ2V4LnRlc3Qob3V0cHV0Rm9ybWF0KSB8fCAhb3V0cHV0Rm9ybWF0KSB7XHJcbiAgICBwYXJhbXNXRlMudmVyc2lvbiA9ICcxLjEuMCc7XHJcbiAgfVxyXG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB3ZnNEYXRhU291cmNlT3B0aW9ucyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGb3JtYXRGcm9tT3B0aW9ucyhcclxuICBvcHRpb25zOiBXRlNEYXRhU291cmNlT3B0aW9ucyB8IFdNU0RhdGFTb3VyY2VPcHRpb25zXHJcbikge1xyXG4gIGNvbnN0IHdmc09wdGlvbnMgPSBvcHRpb25zIGFzIFdGU0RhdGFTb3VyY2VPcHRpb25zO1xyXG5cclxuICBsZXQgb2xGb3JtYXRDbHMgPSBPbEZvcm1hdC5XRlM7XHJcbiAgY29uc3Qgb3V0cHV0Rm9ybWF0ID0gd2ZzT3B0aW9ucy5wYXJhbXNXRlMub3V0cHV0Rm9ybWF0XHJcbiAgICA/IHdmc09wdGlvbnMucGFyYW1zV0ZTLm91dHB1dEZvcm1hdFxyXG4gICAgOiB1bmRlZmluZWQ7XHJcblxyXG4gIGlmICghb3V0cHV0Rm9ybWF0KSB7XHJcbiAgICByZXR1cm4gbmV3IG9sRm9ybWF0Q2xzKHdmc09wdGlvbnMuZm9ybWF0T3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBpZiAoT2xGb3JtYXRbb3V0cHV0Rm9ybWF0XSkge1xyXG4gICAgb2xGb3JtYXRDbHMgPSBPbEZvcm1hdFtvdXRwdXRGb3JtYXRdO1xyXG4gICAgcmV0dXJuIG5ldyBvbEZvcm1hdENscyh3ZnNPcHRpb25zLmZvcm1hdE9wdGlvbnMpO1xyXG4gIH0gZWxzZSBpZiAob3V0cHV0Rm9ybWF0LnRvTG93ZXJDYXNlKCkubWF0Y2goJ2dtbDInKSkge1xyXG4gICAgb2xGb3JtYXRDbHMgPSBPbEZvcm1hdC5XRlM7XHJcbiAgICByZXR1cm4gbmV3IG9sRm9ybWF0Q2xzKHsgLi4ud2ZzT3B0aW9ucy5mb3JtYXRPcHRpb25zLCAuLi7CoHsgZ21sRm9ybWF0OiBvbEZvcm1hdEdNTDIgfX0pO1xyXG4gIH0gZWxzZSBpZiAob3V0cHV0Rm9ybWF0LnRvTG93ZXJDYXNlKCkubWF0Y2goJ2dtbDMyJykpIHtcclxuICAgIG9sRm9ybWF0Q2xzID0gT2xGb3JtYXQuV0ZTO1xyXG4gICAgcmV0dXJuIG5ldyBvbEZvcm1hdENscyh7IC4uLndmc09wdGlvbnMuZm9ybWF0T3B0aW9ucywgLi4uwqB7IGdtbEZvcm1hdDogb2xGb3JtYXRHTUwzMiB9fSk7XHJcbiAgfSBlbHNlIGlmIChvdXRwdXRGb3JtYXQudG9Mb3dlckNhc2UoKS5tYXRjaCgnZ21sMycpKSB7XHJcbiAgICBvbEZvcm1hdENscyA9IE9sRm9ybWF0LldGUztcclxuICAgIHJldHVybiBuZXcgb2xGb3JtYXRDbHMoeyAuLi53ZnNPcHRpb25zLmZvcm1hdE9wdGlvbnMsIC4uLsKgeyBnbWxGb3JtYXQ6IG9sRm9ybWF0R01MMyB9fSk7XHJcbiAgfSBlbHNlIGlmIChvdXRwdXRGb3JtYXQudG9Mb3dlckNhc2UoKS5tYXRjaCgndG9wb2pzb24nKSkge1xyXG4gICAgb2xGb3JtYXRDbHMgPSBPbEZvcm1hdC5Ub3BvSlNPTjtcclxuICAgIHJldHVybiBuZXcgb2xGb3JtYXRDbHMod2ZzT3B0aW9ucy5mb3JtYXRPcHRpb25zKTtcclxuICB9IGVsc2UgaWYgKG91dHB1dEZvcm1hdC50b0xvd2VyQ2FzZSgpLm1hdGNoKCdnZW9qc29uJykpIHtcclxuICAgIG9sRm9ybWF0Q2xzID0gT2xGb3JtYXQuR2VvSlNPTjtcclxuICAgIHJldHVybiBuZXcgb2xGb3JtYXRDbHMod2ZzT3B0aW9ucy5mb3JtYXRPcHRpb25zKTtcclxuICB9IGVsc2UgaWYgKG91dHB1dEZvcm1hdC50b0xvd2VyQ2FzZSgpLm1hdGNoKCdlc3JpanNvbicpKSB7XHJcbiAgICBvbEZvcm1hdENscyA9IE9sRm9ybWF0LkVzcmlKU09OO1xyXG4gICAgcmV0dXJuIG5ldyBvbEZvcm1hdENscyh3ZnNPcHRpb25zLmZvcm1hdE9wdGlvbnMpO1xyXG4gIH0gZWxzZSBpZiAob3V0cHV0Rm9ybWF0LnRvTG93ZXJDYXNlKCkubWF0Y2goJ2pzb24nKSkge1xyXG4gICAgb2xGb3JtYXRDbHMgPSBPbEZvcm1hdC5HZW9KU09OO1xyXG4gICAgcmV0dXJuIG5ldyBvbEZvcm1hdENscyh3ZnNPcHRpb25zLmZvcm1hdE9wdGlvbnMpO1xyXG4gIH0gZWxzZSBpZiAob3V0cHV0Rm9ybWF0LnRvTG93ZXJDYXNlKCkubWF0Y2goJ2dweCcpKSB7XHJcbiAgICBvbEZvcm1hdENscyA9IE9sRm9ybWF0LkdQWDtcclxuICAgIHJldHVybiBuZXcgb2xGb3JtYXRDbHMod2ZzT3B0aW9ucy5mb3JtYXRPcHRpb25zKTtcclxuICB9IGVsc2UgaWYgKG91dHB1dEZvcm1hdC50b0xvd2VyQ2FzZSgpLm1hdGNoKCdXS1QnKSkge1xyXG4gICAgb2xGb3JtYXRDbHMgPSBPbEZvcm1hdC5XS1Q7XHJcbiAgICByZXR1cm4gbmV3IG9sRm9ybWF0Q2xzKHdmc09wdGlvbnMuZm9ybWF0T3B0aW9ucyk7XHJcbiAgfSBlbHNlIGlmIChvdXRwdXRGb3JtYXQudG9Mb3dlckNhc2UoKS5tYXRjaCgnb3NteG1sJykpIHtcclxuICAgIG9sRm9ybWF0Q2xzID0gb2xGb3JtYXRPU01YTUw7XHJcbiAgICByZXR1cm4gbmV3IG9sRm9ybWF0Q2xzKHdmc09wdGlvbnMuZm9ybWF0T3B0aW9ucyk7XHJcbiAgfSBlbHNlIGlmIChvdXRwdXRGb3JtYXQudG9Mb3dlckNhc2UoKS5tYXRjaCgna21sJykpIHtcclxuICAgIG9sRm9ybWF0Q2xzID0gT2xGb3JtYXQuS01MO1xyXG4gICAgcmV0dXJuIG5ldyBvbEZvcm1hdENscyh3ZnNPcHRpb25zLmZvcm1hdE9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG5ldyBvbEZvcm1hdENscygpO1xyXG59XHJcbiJdfQ==