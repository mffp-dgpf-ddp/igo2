/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as OlFormat from 'ol/format';
import olFormatGML2 from 'ol/format/GML2';
import olFormatGML3 from 'ol/format/GML3';
import olFormatGML32 from 'ol/format/GML32';
import olFormatOSMXML from 'ol/format/OSMXML';
/** @type {?} */
export const defaultEpsg = 'EPSG:3857';
/** @type {?} */
export const defaultMaxFeatures = 5000;
/** @type {?} */
export const defaultWfsVersion = '2.0.0';
/** @type {?} */
export const defaultFieldNameGeometry = 'geometry';
/** @type {?} */
export const gmlRegex = new RegExp(/(.*)?gml(.*)?/gi);
/** @type {?} */
export const jsonRegex = new RegExp(/(.*)?json(.*)?/gi);
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
    const versionWfs200 = '2.0.0';
    // not the same usage as defaultWfsVersion.
    /** @type {?} */
    const url = dataSourceOptions.urlWfs;
    /** @type {?} */
    const paramsWFS = dataSourceOptions.paramsWFS;
    /** @type {?} */
    const effectiveCount = count || defaultMaxFeatures;
    /** @type {?} */
    const epsgCode = epsg || defaultEpsg;
    /** @type {?} */
    const outputFormat = paramsWFS.outputFormat
        ? `outputFormat=${paramsWFS.outputFormat}`
        : '';
    /** @type {?} */
    const version = paramsWFS.version
        ? `version=${paramsWFS.version}`
        : `version=${defaultWfsVersion}`;
    /** @type {?} */
    const paramTypename = paramsWFS.version === versionWfs200 ? 'typenames' : 'typename';
    /** @type {?} */
    const featureTypes = `${paramTypename}=${paramsWFS.featureTypes}`;
    /** @type {?} */
    const paramMaxFeatures = paramsWFS.version === versionWfs200 ? 'count' : 'maxFeatures';
    /** @type {?} */
    const cnt = count
        ? `${paramMaxFeatures}=${effectiveCount}`
        : paramsWFS.maxFeatures
            ? `${paramMaxFeatures}=${paramsWFS.maxFeatures}`
            : `${paramMaxFeatures}=${effectiveCount}`;
    /** @type {?} */
    const srs = epsg
        ? `srsname=${epsgCode}`
        : paramsWFS.srsName
            ? 'srsname=' + paramsWFS.srsName
            : `srsname=${epsgCode}`;
    /** @type {?} */
    let propertyName = '';
    /** @type {?} */
    let valueReference = '';
    if (properties) {
        propertyName = `propertyName=${properties}`;
        valueReference = `valueReference=${properties}`;
    }
    /** @type {?} */
    const sourceFields = dataSourceOptions.sourceFields;
    if (!propertyName && sourceFields && sourceFields.length > 0) {
        /** @type {?} */
        const fieldsNames = [];
        dataSourceOptions.sourceFields.forEach((/**
         * @param {?} sourcefield
         * @return {?}
         */
        sourcefield => {
            fieldsNames.push(sourcefield.name);
        }));
        propertyName = `propertyName=${fieldsNames.join(',')},${paramsWFS.fieldNameGeometry}`;
    }
    /** @type {?} */
    const getCapabilities = `${url}?service=WFS&request=GetCapabilities&${version}`;
    /** @type {?} */
    let getFeature = `${url}?service=WFS&request=GetFeature&${version}&${featureTypes}&`;
    getFeature += `${outputFormat}&${srs}&${cnt}&${propertyName}`;
    /** @type {?} */
    let getpropertyvalue = `${url}?service=WFS&request=GetPropertyValue&version=${versionWfs200}&${featureTypes}&`;
    getpropertyvalue += `&${cnt}&${valueReference}`;
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
    const paramsWFS = wfsDataSourceOptions.paramsWFS;
    wfsDataSourceOptions.urlWfs =
        wfsDataSourceOptions.urlWfs || wfsDataSourceOptions.url;
    paramsWFS.version = paramsWFS.version || defaultWfsVersion;
    paramsWFS.fieldNameGeometry =
        paramsWFS.fieldNameGeometry || defaultFieldNameGeometry;
    paramsWFS.maxFeatures = paramsWFS.maxFeatures || defaultMaxFeatures;
    /** @type {?} */
    let outputFormat;
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
    const wfsOptions = (/** @type {?} */ (options));
    /** @type {?} */
    let olFormatCls = OlFormat.WFS;
    /** @type {?} */
    const outputFormat = wfsOptions.paramsWFS.outputFormat
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
        return new olFormatCls(Object.assign({}, wfsOptions.formatOptions, { gmlFormat: olFormatGML2 }));
    }
    else if (outputFormat.toLowerCase().match('gml32')) {
        olFormatCls = OlFormat.WFS;
        return new olFormatCls(Object.assign({}, wfsOptions.formatOptions, { gmlFormat: olFormatGML32 }));
    }
    else if (outputFormat.toLowerCase().match('gml3')) {
        olFormatCls = OlFormat.WFS;
        return new olFormatCls(Object.assign({}, wfsOptions.formatOptions, { gmlFormat: olFormatGML3 }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zLXdmcy51dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy93bXMtd2ZzLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUN0QyxPQUFPLFlBQVksTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLFlBQVksTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLGFBQWEsTUFBTSxpQkFBaUIsQ0FBQztBQUM1QyxPQUFPLGNBQWMsTUFBTSxrQkFBa0IsQ0FBQzs7QUFFOUMsTUFBTSxPQUFPLFdBQVcsR0FBRyxXQUFXOztBQUN0QyxNQUFNLE9BQU8sa0JBQWtCLEdBQUcsSUFBSTs7QUFDdEMsTUFBTSxPQUFPLGlCQUFpQixHQUFHLE9BQU87O0FBQ3hDLE1BQU0sT0FBTyx3QkFBd0IsR0FBRyxVQUFVOztBQUNsRCxNQUFNLE9BQU8sUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLGlCQUFpQixDQUFDOztBQUNyRCxNQUFNLE9BQU8sU0FBUyxHQUFHLElBQUksTUFBTSxDQUFDLGtCQUFrQixDQUFDOzs7Ozs7Ozs7QUFVdkQsTUFBTSxVQUFVLG9CQUFvQixDQUNsQyxpQkFBOEQsRUFDOUQsS0FBYyxFQUNkLElBQWEsRUFDYixVQUFtQjs7VUFFYixhQUFhLEdBQUcsT0FBTzs7O1VBQ3ZCLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNOztVQUM5QixTQUFTLEdBQUcsaUJBQWlCLENBQUMsU0FBUzs7VUFDdkMsY0FBYyxHQUFHLEtBQUssSUFBSSxrQkFBa0I7O1VBQzVDLFFBQVEsR0FBRyxJQUFJLElBQUksV0FBVzs7VUFDOUIsWUFBWSxHQUFHLFNBQVMsQ0FBQyxZQUFZO1FBQ3pDLENBQUMsQ0FBQyxnQkFBZ0IsU0FBUyxDQUFDLFlBQVksRUFBRTtRQUMxQyxDQUFDLENBQUMsRUFBRTs7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LENBQUMsQ0FBQztLQUNsRDtTQUFNLElBQUksWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNsRCxXQUFXLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUMzQixPQUFPLElBQUksV0FBVyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztLQUNsRDtTQUFNLElBQUksWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNyRCxXQUFXLEdBQUcsY0FBYyxDQUFDO1FBQzdCLE9BQU8sSUFBSSxXQUFXLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0tBQ2xEO1NBQU0sSUFBSSxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2xELFdBQVcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDO1FBQzNCLE9BQU8sSUFBSSxXQUFXLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0tBQ2xEO0lBRUQsT0FBTyxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQzNCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXRlNEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4vd2ZzLWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgV01TRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuL3dtcy1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCAqIGFzIE9sRm9ybWF0IGZyb20gJ29sL2Zvcm1hdCc7XHJcbmltcG9ydCBvbEZvcm1hdEdNTDIgZnJvbSAnb2wvZm9ybWF0L0dNTDInO1xyXG5pbXBvcnQgb2xGb3JtYXRHTUwzIGZyb20gJ29sL2Zvcm1hdC9HTUwzJztcclxuaW1wb3J0IG9sRm9ybWF0R01MMzIgZnJvbSAnb2wvZm9ybWF0L0dNTDMyJztcclxuaW1wb3J0IG9sRm9ybWF0T1NNWE1MIGZyb20gJ29sL2Zvcm1hdC9PU01YTUwnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGRlZmF1bHRFcHNnID0gJ0VQU0c6Mzg1Nyc7XHJcbmV4cG9ydCBjb25zdCBkZWZhdWx0TWF4RmVhdHVyZXMgPSA1MDAwO1xyXG5leHBvcnQgY29uc3QgZGVmYXVsdFdmc1ZlcnNpb24gPSAnMi4wLjAnO1xyXG5leHBvcnQgY29uc3QgZGVmYXVsdEZpZWxkTmFtZUdlb21ldHJ5ID0gJ2dlb21ldHJ5JztcclxuZXhwb3J0IGNvbnN0IGdtbFJlZ2V4ID0gbmV3IFJlZ0V4cCgvKC4qKT9nbWwoLiopPy9naSk7XHJcbmV4cG9ydCBjb25zdCBqc29uUmVnZXggPSBuZXcgUmVnRXhwKC8oLiopP2pzb24oLiopPy9naSk7XHJcblxyXG4vKipcclxuICogVGhpcyBtZXRob2QgYnVpbGQvc3RhbmRhcmRpemUgV0ZTIGNhbGwgcXVlcnkgcGFyYW1zIGJhc2VkIG9uIHRoZSBsYXllciBwcm9wZXJ0eS5cclxuICogQHBhcmFtIHdmc0RhdGFTb3VyY2VPcHRpb25zICBXRlNEYXRhU291cmNlT3B0aW9ucyBUaGUgY29tbW9uIHdmcyBkYXRhc291cmNlIG9wdGlvbnMgaW50ZXJmYWNlXHJcbiAqIEBwYXJhbSBjb3VudCAgTnVtYmVyOiBVc2VkIHRvIGNvbnRyb2wgdGhlIG51bWJlciBvZiBmZWF0dXJlLiBVc2VkIHRvIGJ5cGFzcyB3aGUgd2ZzIGRhdGFzb3VyY2Ugb3B0aW9ucyBpbnRlcmZhY2UgKG1heEZlYXR1cmVzKVxyXG4gKiBAcGFyYW0gZXBzZyAgU3RyaW5nOiBVc2VkIHRvIGNvbnRyb2wgdGhlIEVQU0cgY29kZSAoZXM6ICdFUFNHMzg1NycpLiBVc2VkIHRvIGJ5cGFzcyB3aGUgd2ZzIGRhdGFzb3VyY2Ugb3B0aW9ucyBpbnRlcmZhY2UgKHNyc05hbWUpXHJcbiAqIEBwYXJhbSBwcm9wZXJ0aWVzICBTdHJpbmc6IFVzZWQgdG8gY29udHJvbCB0aGUgcXVlcmllZCBmaWVsZHMgIChXRlMgc2VydmljZSkuXHJcbiAqIEByZXR1cm5zIEFuIGFycmF5IGFycmF5IG9mIHtuYW1lOiAnJywgdmFsdWU6ICcnfSBvZiBwcmVkZWZpbmVkIHF1ZXJ5IHBhcmFtcy5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRXRlNRdWVyeVN0cmluZyhcclxuICBkYXRhU291cmNlT3B0aW9uczogV0ZTRGF0YVNvdXJjZU9wdGlvbnMgfCBXTVNEYXRhU291cmNlT3B0aW9ucyxcclxuICBjb3VudD86IG51bWJlcixcclxuICBlcHNnPzogc3RyaW5nLFxyXG4gIHByb3BlcnRpZXM/OiBzdHJpbmdcclxuKTogeyBuYW1lOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfVtdIHtcclxuICBjb25zdCB2ZXJzaW9uV2ZzMjAwID0gJzIuMC4wJzsgLy8gbm90IHRoZSBzYW1lIHVzYWdlIGFzIGRlZmF1bHRXZnNWZXJzaW9uLlxyXG4gIGNvbnN0IHVybCA9IGRhdGFTb3VyY2VPcHRpb25zLnVybFdmcztcclxuICBjb25zdCBwYXJhbXNXRlMgPSBkYXRhU291cmNlT3B0aW9ucy5wYXJhbXNXRlM7XHJcbiAgY29uc3QgZWZmZWN0aXZlQ291bnQgPSBjb3VudCB8fCBkZWZhdWx0TWF4RmVhdHVyZXM7XHJcbiAgY29uc3QgZXBzZ0NvZGUgPSBlcHNnIHx8IGRlZmF1bHRFcHNnO1xyXG4gIGNvbnN0IG91dHB1dEZvcm1hdCA9IHBhcmFtc1dGUy5vdXRwdXRGb3JtYXRcclxuICAgID8gYG91dHB1dEZvcm1hdD0ke3BhcmFtc1dGUy5vdXRwdXRGb3JtYXR9YFxyXG4gICAgOiAnJztcclxuICBjb25zdCB2ZXJzaW9uID0gcGFyYW1zV0ZTLnZlcnNpb25cclxuICAgID8gYHZlcnNpb249JHtwYXJhbXNXRlMudmVyc2lvbn1gXHJcbiAgICA6IGB2ZXJzaW9uPSR7ZGVmYXVsdFdmc1ZlcnNpb259YDtcclxuICBjb25zdCBwYXJhbVR5cGVuYW1lID1cclxuICAgIHBhcmFtc1dGUy52ZXJzaW9uID09PSB2ZXJzaW9uV2ZzMjAwID8gJ3R5cGVuYW1lcycgOiAndHlwZW5hbWUnO1xyXG4gIGNvbnN0IGZlYXR1cmVUeXBlcyA9IGAke3BhcmFtVHlwZW5hbWV9PSR7cGFyYW1zV0ZTLmZlYXR1cmVUeXBlc31gO1xyXG4gIGNvbnN0IHBhcmFtTWF4RmVhdHVyZXMgPVxyXG4gICAgcGFyYW1zV0ZTLnZlcnNpb24gPT09IHZlcnNpb25XZnMyMDAgPyAnY291bnQnIDogJ21heEZlYXR1cmVzJztcclxuICBjb25zdCBjbnQgPSBjb3VudFxyXG4gICAgPyBgJHtwYXJhbU1heEZlYXR1cmVzfT0ke2VmZmVjdGl2ZUNvdW50fWBcclxuICAgIDogcGFyYW1zV0ZTLm1heEZlYXR1cmVzXHJcbiAgICA/IGAke3BhcmFtTWF4RmVhdHVyZXN9PSR7cGFyYW1zV0ZTLm1heEZlYXR1cmVzfWBcclxuICAgIDogYCR7cGFyYW1NYXhGZWF0dXJlc309JHtlZmZlY3RpdmVDb3VudH1gO1xyXG4gIGNvbnN0IHNycyA9IGVwc2dcclxuICAgID8gYHNyc25hbWU9JHtlcHNnQ29kZX1gXHJcbiAgICA6IHBhcmFtc1dGUy5zcnNOYW1lXHJcbiAgICA/ICdzcnNuYW1lPScgKyBwYXJhbXNXRlMuc3JzTmFtZVxyXG4gICAgOiBgc3JzbmFtZT0ke2Vwc2dDb2RlfWA7XHJcblxyXG4gIGxldCBwcm9wZXJ0eU5hbWUgPSAnJztcclxuICBsZXQgdmFsdWVSZWZlcmVuY2UgPSAnJztcclxuICBpZiAocHJvcGVydGllcykge1xyXG4gICAgcHJvcGVydHlOYW1lID0gYHByb3BlcnR5TmFtZT0ke3Byb3BlcnRpZXN9YDtcclxuICAgIHZhbHVlUmVmZXJlbmNlID0gYHZhbHVlUmVmZXJlbmNlPSR7cHJvcGVydGllc31gO1xyXG4gIH1cclxuICBjb25zdCBzb3VyY2VGaWVsZHMgPSBkYXRhU291cmNlT3B0aW9ucy5zb3VyY2VGaWVsZHM7XHJcbiAgaWYgKCFwcm9wZXJ0eU5hbWUgJiYgc291cmNlRmllbGRzICYmIHNvdXJjZUZpZWxkcy5sZW5ndGggPiAwKSB7XHJcbiAgICBjb25zdCBmaWVsZHNOYW1lcyA9IFtdO1xyXG4gICAgZGF0YVNvdXJjZU9wdGlvbnMuc291cmNlRmllbGRzLmZvckVhY2goc291cmNlZmllbGQgPT4ge1xyXG4gICAgICBmaWVsZHNOYW1lcy5wdXNoKHNvdXJjZWZpZWxkLm5hbWUpO1xyXG4gICAgfSk7XHJcbiAgICBwcm9wZXJ0eU5hbWUgPSBgcHJvcGVydHlOYW1lPSR7ZmllbGRzTmFtZXMuam9pbignLCcpfSwke1xyXG4gICAgICBwYXJhbXNXRlMuZmllbGROYW1lR2VvbWV0cnlcclxuICAgIH1gO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZ2V0Q2FwYWJpbGl0aWVzID0gYCR7dXJsfT9zZXJ2aWNlPVdGUyZyZXF1ZXN0PUdldENhcGFiaWxpdGllcyYke3ZlcnNpb259YDtcclxuICBsZXQgZ2V0RmVhdHVyZSA9IGAke3VybH0/c2VydmljZT1XRlMmcmVxdWVzdD1HZXRGZWF0dXJlJiR7dmVyc2lvbn0mJHtmZWF0dXJlVHlwZXN9JmA7XHJcbiAgZ2V0RmVhdHVyZSArPSBgJHtvdXRwdXRGb3JtYXR9JiR7c3JzfSYke2NudH0mJHtwcm9wZXJ0eU5hbWV9YDtcclxuXHJcbiAgbGV0IGdldHByb3BlcnR5dmFsdWUgPSBgJHt1cmx9P3NlcnZpY2U9V0ZTJnJlcXVlc3Q9R2V0UHJvcGVydHlWYWx1ZSZ2ZXJzaW9uPSR7dmVyc2lvbldmczIwMH0mJHtmZWF0dXJlVHlwZXN9JmA7XHJcbiAgZ2V0cHJvcGVydHl2YWx1ZSArPSBgJiR7Y250fSYke3ZhbHVlUmVmZXJlbmNlfWA7XHJcblxyXG4gIHJldHVybiBbXHJcbiAgICB7IG5hbWU6ICdvdXRwdXRmb3JtYXQnLCB2YWx1ZTogb3V0cHV0Rm9ybWF0IH0sXHJcbiAgICB7IG5hbWU6ICd2ZXJzaW9uJywgdmFsdWU6IHZlcnNpb24gfSxcclxuICAgIHsgbmFtZTogJ3R5cGVuYW1lJywgdmFsdWU6IGZlYXR1cmVUeXBlcyB9LFxyXG4gICAgeyBuYW1lOiAnY291bnQnLCB2YWx1ZTogY250IH0sXHJcbiAgICB7IG5hbWU6ICdzcnNuYW1lJywgdmFsdWU6IHNycyB9LFxyXG4gICAgeyBuYW1lOiAncHJvcGVydHluYW1lJywgdmFsdWU6IHByb3BlcnR5TmFtZSB9LFxyXG4gICAgeyBuYW1lOiAndmFsdWVyZWZlcmVuY2UnLCB2YWx1ZTogdmFsdWVSZWZlcmVuY2UgfSxcclxuICAgIHsgbmFtZTogJ2dldGNhcGFiaWxpdGllcycsIHZhbHVlOiBnZXRDYXBhYmlsaXRpZXMucmVwbGFjZSgvJiYvZywgJyYnKSB9LFxyXG4gICAgeyBuYW1lOiAnZ2V0ZmVhdHVyZScsIHZhbHVlOiBnZXRGZWF0dXJlLnJlcGxhY2UoLyYmL2csICcmJykgfSxcclxuICAgIHsgbmFtZTogJ2dldHByb3BlcnR5dmFsdWUnLCB2YWx1ZTogZ2V0cHJvcGVydHl2YWx1ZS5yZXBsYWNlKC8mJi9nLCAnJicpIH1cclxuICBdO1xyXG59XHJcblxyXG4vKipcclxuICogVmFsaWRhdGUvTW9kaWZ5IGxheWVyJ3Mgd2ZzIG9wdGlvbnMgYmFzZWQgb24gOlxyXG4gKiAxLSBhbiBPcGVubGF5ZXJzJ3MgaXNzdWUgd2l0aCBHTUwgcHJvdmlkZWQgZnJvbSBXRlMuIFJlZmVyIHRvXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9vcGVubGF5ZXJzL29wZW5sYXllcnMvcHVsbC82NDAwXHJcbiAqIDItIFNldCBkZWZhdWx0IHZhbHVlcyBmb3Igb3B0aW9uYWxzIHBhcmFtZXRlcnMuXHJcbiAqIEBwYXJhbSB3ZnNEYXRhU291cmNlT3B0aW9ucyAgV0ZTRGF0YVNvdXJjZU9wdGlvbnMgVGhlIGNvbW1vbiB3ZnMgZGF0YXNvdXJjZSBvcHRpb25zIGludGVyZmFjZVxyXG4gKiBAcmV0dXJucyBBbiBhcnJheSBhcnJheSBvZiB7bmFtZTogJycsIHZhbHVlOiAnJ30gb2YgcHJlZGVmaW5lZCBxdWVyeSBwYXJhbXMuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tXZnNQYXJhbXMod2ZzRGF0YVNvdXJjZU9wdGlvbnMsIHNyY1R5cGU/OiBzdHJpbmcpIHtcclxuICBpZiAoc3JjVHlwZSAmJiBzcmNUeXBlID09PSAnd2ZzJykge1xyXG4gICAgLy8gcmVhc3NpZ25hdGlvbiBvZiBwYXJhbXMgdG8gcGFyYW1zV0ZTIGFuZCB1cmwgdG8gdXJsV0ZTIHRvIGhhdmUgYSBjb21tb24gaW50ZXJmYWNlIHdpdGggd21zLXdmcyBkYXRhc291cmNlc1xyXG4gICAgd2ZzRGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTID0gd2ZzRGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcGFyYW1zV0ZTID0gd2ZzRGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTO1xyXG4gIHdmc0RhdGFTb3VyY2VPcHRpb25zLnVybFdmcyA9XHJcbiAgICB3ZnNEYXRhU291cmNlT3B0aW9ucy51cmxXZnMgfHwgd2ZzRGF0YVNvdXJjZU9wdGlvbnMudXJsO1xyXG5cclxuICBwYXJhbXNXRlMudmVyc2lvbiA9IHBhcmFtc1dGUy52ZXJzaW9uIHx8IGRlZmF1bHRXZnNWZXJzaW9uO1xyXG4gIHBhcmFtc1dGUy5maWVsZE5hbWVHZW9tZXRyeSA9XHJcbiAgICBwYXJhbXNXRlMuZmllbGROYW1lR2VvbWV0cnkgfHwgZGVmYXVsdEZpZWxkTmFtZUdlb21ldHJ5O1xyXG4gIHBhcmFtc1dGUy5tYXhGZWF0dXJlcyA9IHBhcmFtc1dGUy5tYXhGZWF0dXJlcyB8fCBkZWZhdWx0TWF4RmVhdHVyZXM7XHJcblxyXG4gIGxldCBvdXRwdXRGb3JtYXQ7XHJcbiAgaWYgKHBhcmFtc1dGUy5vdXRwdXRGb3JtYXQpIHtcclxuICAgIG91dHB1dEZvcm1hdCA9IHBhcmFtc1dGUy5vdXRwdXRGb3JtYXQ7XHJcbiAgfVxyXG5cclxuICBpZiAoZ21sUmVnZXgudGVzdChvdXRwdXRGb3JtYXQpIHx8ICFvdXRwdXRGb3JtYXQpIHtcclxuICAgIHBhcmFtc1dGUy52ZXJzaW9uID0gJzEuMS4wJztcclxuICB9XHJcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHdmc0RhdGFTb3VyY2VPcHRpb25zKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEZvcm1hdEZyb21PcHRpb25zKFxyXG4gIG9wdGlvbnM6IFdGU0RhdGFTb3VyY2VPcHRpb25zIHwgV01TRGF0YVNvdXJjZU9wdGlvbnNcclxuKSB7XHJcbiAgY29uc3Qgd2ZzT3B0aW9ucyA9IG9wdGlvbnMgYXMgV0ZTRGF0YVNvdXJjZU9wdGlvbnM7XHJcblxyXG4gIGxldCBvbEZvcm1hdENscyA9IE9sRm9ybWF0LldGUztcclxuICBjb25zdCBvdXRwdXRGb3JtYXQgPSB3ZnNPcHRpb25zLnBhcmFtc1dGUy5vdXRwdXRGb3JtYXRcclxuICAgID8gd2ZzT3B0aW9ucy5wYXJhbXNXRlMub3V0cHV0Rm9ybWF0XHJcbiAgICA6IHVuZGVmaW5lZDtcclxuXHJcbiAgaWYgKCFvdXRwdXRGb3JtYXQpIHtcclxuICAgIHJldHVybiBuZXcgb2xGb3JtYXRDbHMod2ZzT3B0aW9ucy5mb3JtYXRPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIGlmIChPbEZvcm1hdFtvdXRwdXRGb3JtYXRdKSB7XHJcbiAgICBvbEZvcm1hdENscyA9IE9sRm9ybWF0W291dHB1dEZvcm1hdF07XHJcbiAgICByZXR1cm4gbmV3IG9sRm9ybWF0Q2xzKHdmc09wdGlvbnMuZm9ybWF0T3B0aW9ucyk7XHJcbiAgfSBlbHNlIGlmIChvdXRwdXRGb3JtYXQudG9Mb3dlckNhc2UoKS5tYXRjaCgnZ21sMicpKSB7XHJcbiAgICBvbEZvcm1hdENscyA9IE9sRm9ybWF0LldGUztcclxuICAgIHJldHVybiBuZXcgb2xGb3JtYXRDbHMoeyAuLi53ZnNPcHRpb25zLmZvcm1hdE9wdGlvbnMsIC4uLsKgeyBnbWxGb3JtYXQ6IG9sRm9ybWF0R01MMiB9fSk7XHJcbiAgfSBlbHNlIGlmIChvdXRwdXRGb3JtYXQudG9Mb3dlckNhc2UoKS5tYXRjaCgnZ21sMzInKSkge1xyXG4gICAgb2xGb3JtYXRDbHMgPSBPbEZvcm1hdC5XRlM7XHJcbiAgICByZXR1cm4gbmV3IG9sRm9ybWF0Q2xzKHsgLi4ud2ZzT3B0aW9ucy5mb3JtYXRPcHRpb25zLCAuLi7CoHsgZ21sRm9ybWF0OiBvbEZvcm1hdEdNTDMyIH19KTtcclxuICB9IGVsc2UgaWYgKG91dHB1dEZvcm1hdC50b0xvd2VyQ2FzZSgpLm1hdGNoKCdnbWwzJykpIHtcclxuICAgIG9sRm9ybWF0Q2xzID0gT2xGb3JtYXQuV0ZTO1xyXG4gICAgcmV0dXJuIG5ldyBvbEZvcm1hdENscyh7IC4uLndmc09wdGlvbnMuZm9ybWF0T3B0aW9ucywgLi4uwqB7IGdtbEZvcm1hdDogb2xGb3JtYXRHTUwzIH19KTtcclxuICB9IGVsc2UgaWYgKG91dHB1dEZvcm1hdC50b0xvd2VyQ2FzZSgpLm1hdGNoKCd0b3BvanNvbicpKSB7XHJcbiAgICBvbEZvcm1hdENscyA9IE9sRm9ybWF0LlRvcG9KU09OO1xyXG4gICAgcmV0dXJuIG5ldyBvbEZvcm1hdENscyh3ZnNPcHRpb25zLmZvcm1hdE9wdGlvbnMpO1xyXG4gIH0gZWxzZSBpZiAob3V0cHV0Rm9ybWF0LnRvTG93ZXJDYXNlKCkubWF0Y2goJ2dlb2pzb24nKSkge1xyXG4gICAgb2xGb3JtYXRDbHMgPSBPbEZvcm1hdC5HZW9KU09OO1xyXG4gICAgcmV0dXJuIG5ldyBvbEZvcm1hdENscyh3ZnNPcHRpb25zLmZvcm1hdE9wdGlvbnMpO1xyXG4gIH0gZWxzZSBpZiAob3V0cHV0Rm9ybWF0LnRvTG93ZXJDYXNlKCkubWF0Y2goJ2Vzcmlqc29uJykpIHtcclxuICAgIG9sRm9ybWF0Q2xzID0gT2xGb3JtYXQuRXNyaUpTT047XHJcbiAgICByZXR1cm4gbmV3IG9sRm9ybWF0Q2xzKHdmc09wdGlvbnMuZm9ybWF0T3B0aW9ucyk7XHJcbiAgfSBlbHNlIGlmIChvdXRwdXRGb3JtYXQudG9Mb3dlckNhc2UoKS5tYXRjaCgnanNvbicpKSB7XHJcbiAgICBvbEZvcm1hdENscyA9IE9sRm9ybWF0Lkdlb0pTT047XHJcbiAgICByZXR1cm4gbmV3IG9sRm9ybWF0Q2xzKHdmc09wdGlvbnMuZm9ybWF0T3B0aW9ucyk7XHJcbiAgfSBlbHNlIGlmIChvdXRwdXRGb3JtYXQudG9Mb3dlckNhc2UoKS5tYXRjaCgnZ3B4JykpIHtcclxuICAgIG9sRm9ybWF0Q2xzID0gT2xGb3JtYXQuR1BYO1xyXG4gICAgcmV0dXJuIG5ldyBvbEZvcm1hdENscyh3ZnNPcHRpb25zLmZvcm1hdE9wdGlvbnMpO1xyXG4gIH0gZWxzZSBpZiAob3V0cHV0Rm9ybWF0LnRvTG93ZXJDYXNlKCkubWF0Y2goJ1dLVCcpKSB7XHJcbiAgICBvbEZvcm1hdENscyA9IE9sRm9ybWF0LldLVDtcclxuICAgIHJldHVybiBuZXcgb2xGb3JtYXRDbHMod2ZzT3B0aW9ucy5mb3JtYXRPcHRpb25zKTtcclxuICB9IGVsc2UgaWYgKG91dHB1dEZvcm1hdC50b0xvd2VyQ2FzZSgpLm1hdGNoKCdvc214bWwnKSkge1xyXG4gICAgb2xGb3JtYXRDbHMgPSBvbEZvcm1hdE9TTVhNTDtcclxuICAgIHJldHVybiBuZXcgb2xGb3JtYXRDbHMod2ZzT3B0aW9ucy5mb3JtYXRPcHRpb25zKTtcclxuICB9IGVsc2UgaWYgKG91dHB1dEZvcm1hdC50b0xvd2VyQ2FzZSgpLm1hdGNoKCdrbWwnKSkge1xyXG4gICAgb2xGb3JtYXRDbHMgPSBPbEZvcm1hdC5LTUw7XHJcbiAgICByZXR1cm4gbmV3IG9sRm9ybWF0Q2xzKHdmc09wdGlvbnMuZm9ybWF0T3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbmV3IG9sRm9ybWF0Q2xzKCk7XHJcbn1cclxuIl19