/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const defaultEpsg = 'EPSG:3857';
/** @type {?} */
export const defaultMaxFeatures = 5000;
/** @type {?} */
export const defaultWfsVersion = '2.0.0';
/** @type {?} */
export const defaultFieldNameGeometry = 'geometry';
/** @type {?} */
export const gmlRegex = new RegExp(/.*?gml.*?/gi);
/** @type {?} */
export const jsonRegex = new RegExp(/.*?json.*?/gi);
/**
 * This method build/standardize WFS call query params based on the layer property.
 * @param {?} wfsDataSourceOptions  WFSDataSourceOptions The common wfs datasource options interface
 * @param {?=} count  Number: Used to control the number of feature. Used to bypass whe wfs datasource options interface (maxFeatures)
 * @param {?=} epsg  String: Used to control the EPSG code (es: 'EPSG3857'). Used to bypass whe wfs datasource options interface (srsName)
 * @param {?=} properties  String: Used to control the queried fields  (WFS service).
 * @return {?} An array array of {name: '', value: ''} of predefined query params.
 */
export function formatWFSQueryString(wfsDataSourceOptions, count, epsg, properties) {
    /** @type {?} */
    const versionWfs200 = '2.0.0';
    // not the same usage as defaultWfsVersion.
    /** @type {?} */
    const url = wfsDataSourceOptions.urlWfs;
    /** @type {?} */
    const paramsWFS = wfsDataSourceOptions.paramsWFS;
    /** @type {?} */
    const effectiveCount = count || defaultMaxFeatures;
    /** @type {?} */
    const epsgCode = epsg || defaultEpsg;
    /** @type {?} */
    const outputFormat = paramsWFS.outputFormat ? `outputFormat=${paramsWFS.outputFormat}` : '';
    /** @type {?} */
    const version = paramsWFS.version ? `version=${paramsWFS.version}` : `version=${defaultWfsVersion}`;
    /** @type {?} */
    const paramTypename = paramsWFS.version === versionWfs200 ? 'typenames' : 'typename';
    /** @type {?} */
    const featureTypes = `${paramTypename}=${paramsWFS.featureTypes}`;
    /** @type {?} */
    const paramMaxFeatures = paramsWFS.version === versionWfs200 ? 'count' : 'maxFeatures';
    /** @type {?} */
    const cnt = count ? `${paramMaxFeatures}=${effectiveCount}` :
        paramsWFS.maxFeatures ? `${paramMaxFeatures}=${paramsWFS.maxFeatures}` : `${paramMaxFeatures}=${effectiveCount}`;
    /** @type {?} */
    const srs = epsg ? `srsname=${epsgCode}` : paramsWFS.srsName ? 'srsname=' + paramsWFS.srsName : `srsname=${epsgCode}`;
    /** @type {?} */
    let propertyName = '';
    /** @type {?} */
    let valueReference = '';
    if (properties) {
        propertyName = `propertyName=${properties}`;
        valueReference = `valueReference=${properties}`;
    }
    /** @type {?} */
    const sourceFields = wfsDataSourceOptions.sourceFields;
    if (!propertyName && sourceFields && sourceFields.length > 0) {
        /** @type {?} */
        const fieldsNames = [];
        wfsDataSourceOptions.sourceFields.forEach((/**
         * @param {?} sourcefield
         * @return {?}
         */
        sourcefield => {
            fieldsNames.push(sourcefield.name);
        }));
        propertyName = `propertyName=${fieldsNames.join(',')},${paramsWFS.fieldNameGeometry}`;
    }
    /** @type {?} */
    const getCapabilities = `${url}?service=wfs&request=GetCapabilities&${version}`;
    /** @type {?} */
    let getFeature = `${url}?service=wfs&request=GetFeature&${version}&${featureTypes}&`;
    getFeature += `${outputFormat}&${srs}&${cnt}&${propertyName}`;
    /** @type {?} */
    let getpropertyvalue = `${url}?service=wfs&request=GetPropertyValue&version=${versionWfs200}&${featureTypes}&`;
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
    wfsDataSourceOptions.urlWfs = wfsDataSourceOptions.urlWfs || wfsDataSourceOptions.url;
    paramsWFS.version = paramsWFS.version || defaultWfsVersion;
    paramsWFS.fieldNameGeometry = paramsWFS.fieldNameGeometry || defaultFieldNameGeometry;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zLXdmcy51dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy93bXMtd2ZzLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBSUEsTUFBTSxPQUFPLFdBQVcsR0FBRyxXQUFXOztBQUN0QyxNQUFNLE9BQU8sa0JBQWtCLEdBQUcsSUFBSTs7QUFDdEMsTUFBTSxPQUFPLGlCQUFpQixHQUFHLE9BQU87O0FBQ3hDLE1BQU0sT0FBTyx3QkFBd0IsR0FBRyxVQUFVOztBQUNsRCxNQUFNLE9BQU8sUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQzs7QUFDakQsTUFBTSxPQUFPLFNBQVMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUM7Ozs7Ozs7OztBQVVuRCxNQUFNLFVBQVUsb0JBQW9CLENBQ2hDLG9CQUEwQyxFQUMxQyxLQUFjLEVBQ2QsSUFBYSxFQUNiLFVBQW1COztVQUViLGFBQWEsR0FBRyxPQUFPOzs7VUFDdkIsR0FBRyxHQUFHLG9CQUFvQixDQUFDLE1BQU07O1VBQ2pDLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQyxTQUFTOztVQUMxQyxjQUFjLEdBQUcsS0FBSyxJQUFJLGtCQUFrQjs7VUFDNUMsUUFBUSxHQUFHLElBQUksSUFBSSxXQUFXOztVQUM5QixZQUFZLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTs7VUFDckYsT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFdBQVcsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLGlCQUFpQixFQUFFOztVQUM3RixhQUFhLEdBQUcsU0FBUyxDQUFDLE9BQU8sS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFD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QUFFLGtCQUFrQixFQUFFLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFO0tBQzVFLENBQUM7QUFDTixDQUFDOzs7Ozs7Ozs7O0FBVUQsTUFBTSxVQUFVLGNBQWMsQ0FBQyxvQkFBb0IsRUFBRSxPQUFnQjtJQUVuRSxJQUFJLE9BQU8sSUFBSSxPQUFPLEtBQUssS0FBSyxFQUFFO1FBQ2hDLDZHQUE2RztRQUM3RyxvQkFBb0IsQ0FBQyxTQUFTLEdBQUcsb0JBQW9CLENBQUMsTUFBTSxDQUFDO0tBQzlEOztVQUVLLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQyxTQUFTO0lBQ2hELG9CQUFvQixDQUFDLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxNQUFNLElBQUksb0JBQW9CLENBQUMsR0FBRyxDQUFDO0lBRXRGLFNBQVMsQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sSUFBSSxpQkFBaUIsQ0FBQztJQUMzRCxTQUFTLENBQUMsaUJBQWlCLEdBQUcsU0FBUyxDQUFDLGlCQUFpQixJQUFJLHdCQUF3QixDQUFDO0lBQ3RGLFNBQVMsQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLFdBQVcsSUFBSSxrQkFBa0IsQ0FBQzs7UUFFaEUsWUFBWTtJQUNoQixJQUFJLFNBQVMsQ0FBQyxZQUFZLEVBQUU7UUFDMUIsWUFBWSxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUM7S0FDdkM7SUFFRCxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7UUFDaEQsU0FBUyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7S0FDN0I7SUFDRCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLG9CQUFvQixDQUFFLENBQUM7QUFDbEQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFdGU0RhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi93ZnMtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJXcml0ZXIgfSBmcm9tICcuLi8uLi8uLi9maWx0ZXIvc2hhcmVkL29nYy1maWx0ZXInO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi9maWx0ZXIvc2hhcmVkL29nYy1maWx0ZXIuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjb25zdCBkZWZhdWx0RXBzZyA9ICdFUFNHOjM4NTcnO1xyXG5leHBvcnQgY29uc3QgZGVmYXVsdE1heEZlYXR1cmVzID0gNTAwMDtcclxuZXhwb3J0IGNvbnN0IGRlZmF1bHRXZnNWZXJzaW9uID0gJzIuMC4wJztcclxuZXhwb3J0IGNvbnN0IGRlZmF1bHRGaWVsZE5hbWVHZW9tZXRyeSA9ICdnZW9tZXRyeSc7XHJcbmV4cG9ydCBjb25zdCBnbWxSZWdleCA9IG5ldyBSZWdFeHAoLy4qP2dtbC4qPy9naSk7XHJcbmV4cG9ydCBjb25zdCBqc29uUmVnZXggPSBuZXcgUmVnRXhwKC8uKj9qc29uLio/L2dpKTtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIG1ldGhvZCBidWlsZC9zdGFuZGFyZGl6ZSBXRlMgY2FsbCBxdWVyeSBwYXJhbXMgYmFzZWQgb24gdGhlIGxheWVyIHByb3BlcnR5LlxyXG4gKiBAcGFyYW0gd2ZzRGF0YVNvdXJjZU9wdGlvbnMgIFdGU0RhdGFTb3VyY2VPcHRpb25zIFRoZSBjb21tb24gd2ZzIGRhdGFzb3VyY2Ugb3B0aW9ucyBpbnRlcmZhY2VcclxuICogQHBhcmFtIGNvdW50ICBOdW1iZXI6IFVzZWQgdG8gY29udHJvbCB0aGUgbnVtYmVyIG9mIGZlYXR1cmUuIFVzZWQgdG8gYnlwYXNzIHdoZSB3ZnMgZGF0YXNvdXJjZSBvcHRpb25zIGludGVyZmFjZSAobWF4RmVhdHVyZXMpXHJcbiAqIEBwYXJhbSBlcHNnICBTdHJpbmc6IFVzZWQgdG8gY29udHJvbCB0aGUgRVBTRyBjb2RlIChlczogJ0VQU0czODU3JykuIFVzZWQgdG8gYnlwYXNzIHdoZSB3ZnMgZGF0YXNvdXJjZSBvcHRpb25zIGludGVyZmFjZSAoc3JzTmFtZSlcclxuICogQHBhcmFtIHByb3BlcnRpZXMgIFN0cmluZzogVXNlZCB0byBjb250cm9sIHRoZSBxdWVyaWVkIGZpZWxkcyAgKFdGUyBzZXJ2aWNlKS5cclxuICogQHJldHVybnMgQW4gYXJyYXkgYXJyYXkgb2Yge25hbWU6ICcnLCB2YWx1ZTogJyd9IG9mIHByZWRlZmluZWQgcXVlcnkgcGFyYW1zLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFdGU1F1ZXJ5U3RyaW5nKFxyXG4gICAgd2ZzRGF0YVNvdXJjZU9wdGlvbnM6IFdGU0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gICAgY291bnQ/OiBudW1iZXIsXHJcbiAgICBlcHNnPzogc3RyaW5nLFxyXG4gICAgcHJvcGVydGllcz86IHN0cmluZyk6IHsgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIH1bXSB7XHJcblxyXG4gICAgY29uc3QgdmVyc2lvbldmczIwMCA9ICcyLjAuMCc7IC8vIG5vdCB0aGUgc2FtZSB1c2FnZSBhcyBkZWZhdWx0V2ZzVmVyc2lvbi5cclxuICAgIGNvbnN0IHVybCA9IHdmc0RhdGFTb3VyY2VPcHRpb25zLnVybFdmcztcclxuICAgIGNvbnN0IHBhcmFtc1dGUyA9IHdmc0RhdGFTb3VyY2VPcHRpb25zLnBhcmFtc1dGUztcclxuICAgIGNvbnN0IGVmZmVjdGl2ZUNvdW50ID0gY291bnQgfHwgZGVmYXVsdE1heEZlYXR1cmVzO1xyXG4gICAgY29uc3QgZXBzZ0NvZGUgPSBlcHNnIHx8IGRlZmF1bHRFcHNnO1xyXG4gICAgY29uc3Qgb3V0cHV0Rm9ybWF0ID0gcGFyYW1zV0ZTLm91dHB1dEZvcm1hdCA/IGBvdXRwdXRGb3JtYXQ9JHtwYXJhbXNXRlMub3V0cHV0Rm9ybWF0fWAgOiAnJztcclxuICAgIGNvbnN0IHZlcnNpb24gPSBwYXJhbXNXRlMudmVyc2lvbiA/IGB2ZXJzaW9uPSR7cGFyYW1zV0ZTLnZlcnNpb259YCA6IGB2ZXJzaW9uPSR7ZGVmYXVsdFdmc1ZlcnNpb259YDtcclxuICAgIGNvbnN0IHBhcmFtVHlwZW5hbWUgPSBwYXJhbXNXRlMudmVyc2lvbiA9PT0gdmVyc2lvbldmczIwMCA/ICd0eXBlbmFtZXMnIDogJ3R5cGVuYW1lJztcclxuICAgIGNvbnN0IGZlYXR1cmVUeXBlcyA9IGAke3BhcmFtVHlwZW5hbWV9PSR7cGFyYW1zV0ZTLmZlYXR1cmVUeXBlc31gO1xyXG4gICAgY29uc3QgcGFyYW1NYXhGZWF0dXJlcyA9IHBhcmFtc1dGUy52ZXJzaW9uID09PSB2ZXJzaW9uV2ZzMjAwID8gJ2NvdW50JyA6ICdtYXhGZWF0dXJlcyc7XHJcbiAgICBjb25zdCBjbnQgPSBjb3VudCA/IGAke3BhcmFtTWF4RmVhdHVyZXN9PSR7ZWZmZWN0aXZlQ291bnR9YCA6XHJcbiAgICAgICAgcGFyYW1zV0ZTLm1heEZlYXR1cmVzID8gYCR7cGFyYW1NYXhGZWF0dXJlc309JHtwYXJhbXNXRlMubWF4RmVhdHVyZXN9YCA6IGAke3BhcmFtTWF4RmVhdHVyZXN9PSR7ZWZmZWN0aXZlQ291bnR9YDtcclxuICAgIGNvbnN0IHNycyA9IGVwc2cgPyBgc3JzbmFtZT0ke2Vwc2dDb2RlfWAgOiBwYXJhbXNXRlMuc3JzTmFtZSA/ICdzcnNuYW1lPScgKyBwYXJhbXNXRlMuc3JzTmFtZSA6IGBzcnNuYW1lPSR7ZXBzZ0NvZGV9YDtcclxuXHJcbiAgICBsZXQgcHJvcGVydHlOYW1lID0gJyc7XHJcbiAgICBsZXQgdmFsdWVSZWZlcmVuY2UgPSAnJztcclxuICAgIGlmIChwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgcHJvcGVydHlOYW1lID0gYHByb3BlcnR5TmFtZT0ke3Byb3BlcnRpZXN9YDtcclxuICAgICAgICB2YWx1ZVJlZmVyZW5jZSA9IGB2YWx1ZVJlZmVyZW5jZT0ke3Byb3BlcnRpZXN9YDtcclxuICAgIH1cclxuICAgIGNvbnN0IHNvdXJjZUZpZWxkcyA9IHdmc0RhdGFTb3VyY2VPcHRpb25zLnNvdXJjZUZpZWxkcztcclxuICAgIGlmICghcHJvcGVydHlOYW1lICYmIHNvdXJjZUZpZWxkcyAmJiBzb3VyY2VGaWVsZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGNvbnN0IGZpZWxkc05hbWVzID0gW107XHJcbiAgICAgICAgd2ZzRGF0YVNvdXJjZU9wdGlvbnMuc291cmNlRmllbGRzLmZvckVhY2goc291cmNlZmllbGQgPT4ge1xyXG4gICAgICAgICAgICBmaWVsZHNOYW1lcy5wdXNoKHNvdXJjZWZpZWxkLm5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHByb3BlcnR5TmFtZSA9IGBwcm9wZXJ0eU5hbWU9JHtmaWVsZHNOYW1lcy5qb2luKCcsJyl9LCR7cGFyYW1zV0ZTLmZpZWxkTmFtZUdlb21ldHJ5fWA7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2V0Q2FwYWJpbGl0aWVzID0gYCR7dXJsfT9zZXJ2aWNlPXdmcyZyZXF1ZXN0PUdldENhcGFiaWxpdGllcyYke3ZlcnNpb259YDtcclxuICAgIGxldCBnZXRGZWF0dXJlID0gYCR7dXJsfT9zZXJ2aWNlPXdmcyZyZXF1ZXN0PUdldEZlYXR1cmUmJHt2ZXJzaW9ufSYke2ZlYXR1cmVUeXBlc30mYDtcclxuICAgIGdldEZlYXR1cmUgKz0gYCR7b3V0cHV0Rm9ybWF0fSYke3Nyc30mJHtjbnR9JiR7cHJvcGVydHlOYW1lfWA7XHJcblxyXG4gICAgbGV0IGdldHByb3BlcnR5dmFsdWUgPSBgJHt1cmx9P3NlcnZpY2U9d2ZzJnJlcXVlc3Q9R2V0UHJvcGVydHlWYWx1ZSZ2ZXJzaW9uPSR7dmVyc2lvbldmczIwMH0mJHtmZWF0dXJlVHlwZXN9JmA7XHJcbiAgICBnZXRwcm9wZXJ0eXZhbHVlICs9IGAmJHtjbnR9JiR7dmFsdWVSZWZlcmVuY2V9YDtcclxuXHJcbiAgICByZXR1cm4gW1xyXG4gICAgICAgIHsgbmFtZTogJ291dHB1dGZvcm1hdCcsIHZhbHVlOiBvdXRwdXRGb3JtYXQgfSxcclxuICAgICAgICB7IG5hbWU6ICd2ZXJzaW9uJywgdmFsdWU6IHZlcnNpb24gfSxcclxuICAgICAgICB7IG5hbWU6ICd0eXBlbmFtZScsIHZhbHVlOiBmZWF0dXJlVHlwZXMgfSxcclxuICAgICAgICB7IG5hbWU6ICdjb3VudCcsIHZhbHVlOiBjbnQgfSxcclxuICAgICAgICB7IG5hbWU6ICdzcnNuYW1lJywgdmFsdWU6IHNycyB9LFxyXG4gICAgICAgIHsgbmFtZTogJ3Byb3BlcnR5bmFtZScsIHZhbHVlOiBwcm9wZXJ0eU5hbWUgfSxcclxuICAgICAgICB7IG5hbWU6ICd2YWx1ZXJlZmVyZW5jZScsIHZhbHVlOiB2YWx1ZVJlZmVyZW5jZSB9LFxyXG4gICAgICAgIHsgbmFtZTogJ2dldGNhcGFiaWxpdGllcycsIHZhbHVlOiBnZXRDYXBhYmlsaXRpZXMucmVwbGFjZSgvJiYvZywgJyYnKSB9LFxyXG4gICAgICAgIHsgbmFtZTogJ2dldGZlYXR1cmUnLCB2YWx1ZTogZ2V0RmVhdHVyZS5yZXBsYWNlKC8mJi9nLCAnJicpIH0sXHJcbiAgICAgICAgeyBuYW1lOiAnZ2V0cHJvcGVydHl2YWx1ZScsIHZhbHVlOiBnZXRwcm9wZXJ0eXZhbHVlLnJlcGxhY2UoLyYmL2csICcmJykgfVxyXG4gICAgXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFZhbGlkYXRlL01vZGlmeSBsYXllcidzIHdmcyBvcHRpb25zIGJhc2VkIG9uIDpcclxuICogMS0gYW4gT3BlbmxheWVycydzIGlzc3VlIHdpdGggR01MIHByb3ZpZGVkIGZyb20gV0ZTLiBSZWZlciB0b1xyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vb3BlbmxheWVycy9vcGVubGF5ZXJzL3B1bGwvNjQwMFxyXG4gKiAyLSBTZXQgZGVmYXVsdCB2YWx1ZXMgZm9yIG9wdGlvbmFscyBwYXJhbWV0ZXJzLlxyXG4gKiBAcGFyYW0gd2ZzRGF0YVNvdXJjZU9wdGlvbnMgIFdGU0RhdGFTb3VyY2VPcHRpb25zIFRoZSBjb21tb24gd2ZzIGRhdGFzb3VyY2Ugb3B0aW9ucyBpbnRlcmZhY2VcclxuICogQHJldHVybnMgQW4gYXJyYXkgYXJyYXkgb2Yge25hbWU6ICcnLCB2YWx1ZTogJyd9IG9mIHByZWRlZmluZWQgcXVlcnkgcGFyYW1zLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrV2ZzUGFyYW1zKHdmc0RhdGFTb3VyY2VPcHRpb25zLCBzcmNUeXBlPzogc3RyaW5nKSB7XHJcblxyXG4gIGlmIChzcmNUeXBlICYmIHNyY1R5cGUgPT09ICd3ZnMnKSB7XHJcbiAgICAvLyByZWFzc2lnbmF0aW9uIG9mIHBhcmFtcyB0byBwYXJhbXNXRlMgYW5kIHVybCB0byB1cmxXRlMgdG8gaGF2ZSBhIGNvbW1vbiBpbnRlcmZhY2Ugd2l0aCB3bXMtd2ZzIGRhdGFzb3VyY2VzXHJcbiAgICB3ZnNEYXRhU291cmNlT3B0aW9ucy5wYXJhbXNXRlMgPSB3ZnNEYXRhU291cmNlT3B0aW9ucy5wYXJhbXM7XHJcbiAgfVxyXG5cclxuICBjb25zdCBwYXJhbXNXRlMgPSB3ZnNEYXRhU291cmNlT3B0aW9ucy5wYXJhbXNXRlM7XHJcbiAgd2ZzRGF0YVNvdXJjZU9wdGlvbnMudXJsV2ZzID0gd2ZzRGF0YVNvdXJjZU9wdGlvbnMudXJsV2ZzIHx8IHdmc0RhdGFTb3VyY2VPcHRpb25zLnVybDtcclxuXHJcbiAgcGFyYW1zV0ZTLnZlcnNpb24gPSBwYXJhbXNXRlMudmVyc2lvbiB8fCBkZWZhdWx0V2ZzVmVyc2lvbjtcclxuICBwYXJhbXNXRlMuZmllbGROYW1lR2VvbWV0cnkgPSBwYXJhbXNXRlMuZmllbGROYW1lR2VvbWV0cnkgfHwgZGVmYXVsdEZpZWxkTmFtZUdlb21ldHJ5O1xyXG4gIHBhcmFtc1dGUy5tYXhGZWF0dXJlcyA9IHBhcmFtc1dGUy5tYXhGZWF0dXJlcyB8fCBkZWZhdWx0TWF4RmVhdHVyZXM7XHJcblxyXG4gIGxldCBvdXRwdXRGb3JtYXQ7XHJcbiAgaWYgKHBhcmFtc1dGUy5vdXRwdXRGb3JtYXQpIHtcclxuICAgIG91dHB1dEZvcm1hdCA9IHBhcmFtc1dGUy5vdXRwdXRGb3JtYXQ7XHJcbiAgfVxyXG5cclxuICBpZiAoZ21sUmVnZXgudGVzdChvdXRwdXRGb3JtYXQpIHx8ICFvdXRwdXRGb3JtYXQpIHtcclxuICAgIHBhcmFtc1dGUy52ZXJzaW9uID0gJzEuMS4wJztcclxuICB9XHJcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHdmc0RhdGFTb3VyY2VPcHRpb25zICk7XHJcbn1cclxuIl19