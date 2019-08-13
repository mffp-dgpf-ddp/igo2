/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as olfilter from 'ol/format/filter';
import olFormatWKT from 'ol/format/WKT';
import olFormatWFS from 'ol/format/WFS';
import { uuid } from '@igo2/utils';
export class OgcFilterWriter {
    constructor() {
        this.filterSequence = [];
        this.operators = {
            PropertyIsEqualTo: { spatial: false, fieldRestrict: [] },
            PropertyIsNotEqualTo: { spatial: false, fieldRestrict: [] },
            PropertyIsLike: { spatial: false, fieldRestrict: ['string'] },
            PropertyIsGreaterThan: { spatial: false, fieldRestrict: ['number'] },
            PropertyIsGreaterThanOrEqualTo: { spatial: false, fieldRestrict: ['number'] },
            PropertyIsLessThan: { spatial: false, fieldRestrict: ['number'] },
            PropertyIsLessThanOrEqualTo: { spatial: false, fieldRestrict: ['number'] },
            PropertyIsBetween: { spatial: false, fieldRestrict: ['number'] },
            During: { spatial: false, fieldRestrict: [] },
            PropertyIsNull: { spatial: false, fieldRestrict: [] },
            Intersects: { spatial: true, fieldRestrict: [] },
            Within: { spatial: true, fieldRestrict: [] },
            Contains: { spatial: true, fieldRestrict: [] }
        };
    }
    /**
     * @param {?} ogcFiltersOptions
     * @param {?} fieldNameGeometry
     * @param {?=} srcType
     * @return {?}
     */
    defineOgcFiltersDefaultOptions(ogcFiltersOptions, fieldNameGeometry, srcType) {
        /** @type {?} */
        let ogcFiltersDefaultValue = true;
        if (srcType && srcType === 'wms') {
            ogcFiltersDefaultValue = false;
        }
        ogcFiltersOptions = ogcFiltersOptions || {};
        ogcFiltersOptions.enabled = ogcFiltersOptions.enabled === undefined ? ogcFiltersDefaultValue : ogcFiltersOptions.enabled;
        ogcFiltersOptions.editable = ogcFiltersOptions.editable === undefined ? ogcFiltersDefaultValue : ogcFiltersOptions.editable;
        ogcFiltersOptions.geometryName = fieldNameGeometry;
        ogcFiltersOptions.advancedOgcFilters = true;
        if (ogcFiltersOptions.enabled && ogcFiltersOptions.pushButtons) {
            ogcFiltersOptions.advancedOgcFilters = false;
        }
        return ogcFiltersOptions;
    }
    /**
     * @param {?=} filters
     * @param {?=} extent
     * @param {?=} proj
     * @param {?=} fieldNameGeometry
     * @return {?}
     */
    buildFilter(filters, extent, proj, fieldNameGeometry) {
        /** @type {?} */
        let ourBboxFilter;
        /** @type {?} */
        let enableBbox;
        if (/intersects|contains|within/gi.test(JSON.stringify(filters))) {
            enableBbox = false;
        }
        else {
            enableBbox = true;
        }
        if (filters) {
            fieldNameGeometry =
                ((/** @type {?} */ (filters))).geometryName !== undefined
                    ? ((/** @type {?} */ (filters))).geometryName
                    : fieldNameGeometry;
        }
        if (extent && filters) {
            ourBboxFilter = olfilter.bbox(fieldNameGeometry, extent, proj.getCode());
        }
        /** @type {?} */
        let filterAssembly;
        if (filters) {
            filters = this.checkIgoFiltersProperties(filters, fieldNameGeometry);
            if (extent && enableBbox) {
                filterAssembly = olfilter.and(ourBboxFilter, this.bundleFilter(filters));
            }
            else {
                filterAssembly = this.bundleFilter(filters);
            }
        }
        else {
            return 'bbox=' + extent.join(',') + ',' + proj.getCode();
        }
        /** @type {?} */
        const wfsOptions = {
            srsName: '',
            featureNS: '',
            featurePrefix: '',
            featureTypes: ['featureTypes'],
            filter: filterAssembly,
            outputFormat: '',
            geometryName: fieldNameGeometry
        };
        /** @type {?} */
        const query = new olFormatWFS().writeGetFeature(wfsOptions);
        /** @type {?} */
        const str = new XMLSerializer().serializeToString(query);
        /** @type {?} */
        const regexp1 = /typenames *=|typename *=\"featureTypes\" *>/gi;
        /** @type {?} */
        const regexp2 = /<\/Query><\/GetFeature>/gi;
        return 'filter=' + str.split(regexp1)[1].split(regexp2)[0];
    }
    /**
     * @private
     * @param {?} filterObject
     * @return {?}
     */
    bundleFilter(filterObject) {
        if (filterObject instanceof Array) {
            /** @type {?} */
            const logicalArray = [];
            filterObject.forEach((/**
             * @param {?} element
             * @return {?}
             */
            element => {
                logicalArray.push(this.bundleFilter(element));
            }));
            return logicalArray;
        }
        else {
            if (filterObject.hasOwnProperty('logical')) {
                return this.createFilter({
                    operator: filterObject.logical,
                    logicalArray: this.bundleFilter(filterObject.filters)
                });
            }
            else if (filterObject.hasOwnProperty('operator')) {
                return this.createFilter((/** @type {?} */ (filterObject)));
            }
        }
    }
    /**
     * @private
     * @param {?} filterOptions
     * @return {?}
     */
    createFilter(filterOptions) {
        /** @type {?} */
        const operator = filterOptions.operator;
        /** @type {?} */
        const logicalArray = filterOptions.logicalArray;
        /** @type {?} */
        const wfsPropertyName = filterOptions.propertyName;
        /** @type {?} */
        const wfsPattern = filterOptions.pattern;
        /** @type {?} */
        const wfsMatchCase = filterOptions.matchCase
            ? filterOptions.matchCase
            : true;
        /** @type {?} */
        const wfsWildCard = filterOptions.wildCard ? filterOptions.wildCard : '*';
        /** @type {?} */
        const wfsSingleChar = filterOptions.singleChar
            ? filterOptions.singleChar
            : '.';
        /** @type {?} */
        const wfsEscapeChar = filterOptions.escapeChar
            ? filterOptions.escapeChar
            : '!';
        /** @type {?} */
        const wfsLowerBoundary = filterOptions.lowerBoundary;
        /** @type {?} */
        const wfsUpperBoundary = filterOptions.upperBoundary;
        /** @type {?} */
        const wfsGeometryName = filterOptions.geometryName;
        /** @type {?} */
        const wfsExtent = filterOptions.extent;
        /** @type {?} */
        const wfsWktGeometry = filterOptions.wkt_geometry;
        /** @type {?} */
        const wfsSrsName = filterOptions.srsName
            ? filterOptions.srsName
            : 'EPSG:3857';
        /** @type {?} */
        const wfsBegin = filterOptions.begin;
        /** @type {?} */
        const wfsEnd = filterOptions.end;
        /** @type {?} */
        const wfsExpression = filterOptions.expression;
        /** @type {?} */
        let geometry;
        if (wfsWktGeometry) {
            /** @type {?} */
            const wkt = new olFormatWKT();
            geometry = wkt.readGeometry(wfsWktGeometry, {
                dataProjection: wfsSrsName,
                featureProjection: 'EPSG:3857'
            });
        }
        switch (operator) {
            case 'BBOX':
                return olfilter.bbox(wfsGeometryName, wfsExtent, wfsSrsName);
            case 'PropertyIsBetween':
                return olfilter.between(wfsPropertyName, wfsLowerBoundary, wfsUpperBoundary);
            case 'Contains':
                return olfilter.contains(wfsGeometryName, geometry, wfsSrsName);
            case 'During':
                return olfilter.during(wfsPropertyName, wfsBegin, wfsEnd);
            case 'PropertyIsEqualTo':
                return olfilter.equalTo(wfsPropertyName, wfsExpression, wfsMatchCase);
            case 'PropertyIsGreaterThan':
                return olfilter.greaterThan(wfsPropertyName, wfsExpression);
            case 'PropertyIsGreaterThanOrEqualTo':
                return olfilter.greaterThanOrEqualTo(wfsPropertyName, wfsExpression);
            case 'Intersects':
                return olfilter.intersects(wfsGeometryName, geometry, wfsSrsName);
            case 'PropertyIsNull':
                return olfilter.isNull(wfsPropertyName);
            case 'PropertyIsLessThan':
                return olfilter.lessThan(wfsPropertyName, wfsExpression);
            case 'PropertyIsLessThanOrEqualTo':
                return olfilter.lessThanOrEqualTo(wfsPropertyName, wfsExpression);
            case 'PropertyIsLike':
                return olfilter.like(wfsPropertyName, wfsPattern.replace(/[()_]/gi, wfsSingleChar), wfsWildCard, wfsSingleChar, wfsEscapeChar, wfsMatchCase);
            case 'PropertyIsNotEqualTo':
                return olfilter.notEqualTo(wfsPropertyName, wfsExpression, wfsMatchCase);
            case 'Within':
                return olfilter.within(wfsGeometryName, geometry, wfsSrsName);
            // LOGICAL
            case 'And':
                return olfilter.and.apply(null, logicalArray);
            case 'Or':
                return olfilter.or.apply(null, logicalArray);
            case 'Not':
                return olfilter.not.apply(null, logicalArray);
            default:
                return undefined;
        }
    }
    /**
     * @param {?} filterObject
     * @param {?} geometryName
     * @param {?=} logical
     * @param {?=} level
     * @return {?}
     */
    defineInterfaceFilterSequence(filterObject, geometryName, logical = '', level = -1) {
        if (filterObject instanceof Array) {
            filterObject.forEach((/**
             * @param {?} element
             * @return {?}
             */
            element => {
                this.filterSequence.concat(this.defineInterfaceFilterSequence(element, geometryName, logical, level));
            }));
        }
        else {
            if (filterObject.hasOwnProperty('logical')) {
                level = level + 1;
                this.filterSequence.concat(this.defineInterfaceFilterSequence(filterObject.filters, geometryName, filterObject.logical, level));
            }
            else if (filterObject.hasOwnProperty('operator')) {
                this.filterSequence.push(this.addInterfaceFilter(filterObject, geometryName, level, logical));
            }
        }
        return this.filterSequence;
    }
    /**
     * @param {?=} igoOgcFilterObject
     * @param {?=} geometryName
     * @param {?=} level
     * @param {?=} parentLogical
     * @return {?}
     */
    addInterfaceFilter(igoOgcFilterObject, geometryName, level = 0, parentLogical = 'Or') {
        if (!igoOgcFilterObject) {
            igoOgcFilterObject = { operator: 'PropertyIsEqualTo' };
        }
        /** @type {?} */
        const f = {
            propertyName: '',
            operator: '',
            active: '',
            filterid: uuid(),
            begin: '',
            end: '',
            lowerBoundary: '',
            upperBoundary: '',
            expression: '',
            pattern: '',
            wildCard: '*',
            singleChar: '.',
            escapeChar: '!',
            matchCase: true,
            igoSpatialSelector: '',
            geometryName: '',
            geometry: '',
            wkt_geometry: '',
            extent: '',
            srsName: '',
            parentLogical: '',
            level: 0
        };
        return Object.assign(f, {
            parentLogical,
            level,
            geometryName
        }, igoOgcFilterObject);
    }
    /**
     * @param {?} filterObject
     * @param {?} fieldNameGeometry
     * @param {?=} active
     * @return {?}
     */
    checkIgoFiltersProperties(filterObject, fieldNameGeometry, active = false) {
        /** @type {?} */
        const filterArray = [];
        if (filterObject instanceof Array) {
            filterObject.forEach((/**
             * @param {?} element
             * @return {?}
             */
            element => {
                filterArray.push(this.checkIgoFiltersProperties(element, fieldNameGeometry, active));
            }));
            return filterArray;
        }
        else {
            if (filterObject.hasOwnProperty('logical')) {
                return Object.assign({}, {
                    logical: filterObject.logical,
                    filters: this.checkIgoFiltersProperties(filterObject.filters, fieldNameGeometry, active)
                });
            }
            else if (filterObject.hasOwnProperty('operator')) {
                return this.addFilterProperties((/** @type {?} */ (filterObject)), fieldNameGeometry, active);
            }
        }
    }
    /**
     * @private
     * @param {?} igoOgcFilterObject
     * @param {?} fieldNameGeometry
     * @param {?=} active
     * @return {?}
     */
    addFilterProperties(igoOgcFilterObject, fieldNameGeometry, active = false) {
        /** @type {?} */
        const filterid = igoOgcFilterObject.hasOwnProperty('filterid')
            ? igoOgcFilterObject.filterid
            : uuid();
        /** @type {?} */
        const status = igoOgcFilterObject.hasOwnProperty('active')
            ? igoOgcFilterObject.active
            : active;
        return Object.assign({}, {
            filterid,
            active: status,
            igoSpatialSelector: 'fixedExtent'
        }, igoOgcFilterObject, { geometryName: fieldNameGeometry });
    }
    /**
     * @param {?} sequence
     * @return {?}
     */
    rebuiltIgoOgcFilterObjectFromSequence(sequence) {
        if (sequence instanceof Array) {
            if (sequence.length >= 1) {
                /** @type {?} */
                let lastParentLogical = sequence[0].parentLogical;
                /** @type {?} */
                let nextElement;
                /** @type {?} */
                let logicalArray = [];
                /** @type {?} */
                let lastProcessedFilter;
                sequence.forEach((/**
                 * @param {?} uiFilter
                 * @return {?}
                 */
                uiFilter => {
                    /** @type {?} */
                    const element = Object.assign({}, uiFilter);
                    /** @type {?} */
                    const index = sequence.indexOf(uiFilter);
                    if (index >= 0 && index < sequence.length - 1) {
                        nextElement = sequence[index + 1];
                    }
                    else {
                        nextElement = element;
                    }
                    delete element.active;
                    delete element.filterid;
                    delete element.parentLogical;
                    logicalArray.push(element);
                    if (sequence.length === 1) {
                        lastProcessedFilter = element;
                    }
                    else if (lastParentLogical !== nextElement.parentLogical) {
                        if (logicalArray.length === 1) {
                            console.log('You must set at ' +
                                'least two operator in a logical (' +
                                lastParentLogical +
                                ')');
                        }
                        else {
                            lastProcessedFilter = Object.assign({}, { logical: lastParentLogical, filters: logicalArray });
                            logicalArray = [lastProcessedFilter];
                            lastParentLogical = nextElement.parentLogical;
                        }
                    }
                }));
                return lastProcessedFilter;
            }
            else {
                return undefined;
            }
        }
        else {
            return undefined;
        }
    }
    /**
     * @param {?} options
     * @param {?} fieldNameGeometry
     * @return {?}
     */
    handleOgcFiltersAppliedValue(options, fieldNameGeometry) {
        /** @type {?} */
        const ogcFilters = options.ogcFilters;
        if (!ogcFilters) {
            return;
        }
        /** @type {?} */
        let filterQueryStringPushButton = '';
        /** @type {?} */
        let filterQueryStringAdvancedFilters = '';
        if (ogcFilters.enabled && ogcFilters.pushButtons) {
            /** @type {?} */
            const pushButtonBundle = ogcFilters.pushButtons;
            /** @type {?} */
            const conditions = [];
            pushButtonBundle.map((/**
             * @param {?} buttonBundle
             * @return {?}
             */
            buttonBundle => {
                /** @type {?} */
                const bundleCondition = [];
                buttonBundle.ogcPushButtons
                    .filter((/**
                 * @param {?} ogcpb
                 * @return {?}
                 */
                ogcpb => ogcpb.enabled === true))
                    .forEach((/**
                 * @param {?} enabledPb
                 * @return {?}
                 */
                enabledPb => bundleCondition.push(enabledPb.filters)));
                if (bundleCondition.length === 1) {
                    conditions.push(bundleCondition[0]);
                }
                else if (bundleCondition.length > 1) {
                    conditions.push({ logical: buttonBundle.logical, filters: bundleCondition });
                }
            }));
            if (conditions.length >= 1) {
                filterQueryStringPushButton = this.buildFilter(conditions.length === 1 ? conditions[0] : { logical: 'And', filters: conditions });
            }
        }
        if (ogcFilters.enabled && ogcFilters.filters) {
            ogcFilters.geometryName = ogcFilters.geometryName || fieldNameGeometry;
            /** @type {?} */
            const igoFilters = ogcFilters.filters;
            filterQueryStringAdvancedFilters = this.buildFilter(igoFilters);
        }
        /** @type {?} */
        let filterQueryString = ogcFilters.advancedOgcFilters ? filterQueryStringAdvancedFilters : filterQueryStringPushButton;
        if (options.type === 'wms') {
            filterQueryString = this.formatProcessedOgcFilter(filterQueryString, ((/** @type {?} */ (options))).params.layers);
        }
        if (options.type === 'wfs') {
            filterQueryString = this.formatProcessedOgcFilter(filterQueryString, ((/** @type {?} */ (options))).params.featureTypes);
        }
        return filterQueryString;
    }
    /**
     * @param {?} processedFilter
     * @param {?} layersOrTypenames
     * @return {?}
     */
    formatProcessedOgcFilter(processedFilter, layersOrTypenames) {
        /** @type {?} */
        let appliedFilter = '';
        if (processedFilter.length === 0 && layersOrTypenames.indexOf(',') === -1) {
            appliedFilter = processedFilter;
        }
        else {
            layersOrTypenames.split(',').forEach((/**
             * @param {?} layerOrTypenames
             * @return {?}
             */
            layerOrTypenames => {
                appliedFilter = `${appliedFilter}(${processedFilter.replace('filter=', '')})`;
            }));
        }
        /** @type {?} */
        const filterValue = appliedFilter.length > 0 ? appliedFilter.replace('filter=', '') : undefined;
        return filterValue;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    OgcFilterWriter.prototype.filterSequence;
    /** @type {?} */
    OgcFilterWriter.prototype.operators;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXIvc2hhcmVkL29nYy1maWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxRQUFRLE1BQU0sa0JBQWtCLENBQUM7QUFDN0MsT0FBTyxXQUFXLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sV0FBVyxNQUFNLGVBQWUsQ0FBQztBQUd4QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBWW5DLE1BQU0sT0FBTyxlQUFlO0lBQTVCO1FBQ1UsbUJBQWMsR0FBZ0MsRUFBRSxDQUFDO1FBQ2xELGNBQVMsR0FBRztZQUNqQixpQkFBaUIsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRTtZQUN4RCxvQkFBb0IsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRTtZQUMzRCxjQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzdELHFCQUFxQixFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNwRSw4QkFBOEIsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDN0Usa0JBQWtCLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2pFLDJCQUEyQixFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUMxRSxpQkFBaUIsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUMsUUFB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QkFBaUIsRUFBRSxDQUFDLG1CQUFBLE9BQU8sRUFBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzVHO1FBRUQsT0FBTyxpQkFBaUIsQ0FBQztJQUUzQixDQUFDOzs7Ozs7SUFFTSx3QkFBd0IsQ0FDN0IsZUFBdUIsRUFDdkIsaUJBQXlCOztZQUNyQixhQUFhLEdBQUcsRUFBRTtRQUN0QixJQUFJLGVBQWUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUN6RSxhQUFhLEdBQUcsZUFBZSxDQUFDO1NBQ2pDO2FBQU07WUFDTCxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTzs7OztZQUFDLGdCQUFnQixDQUFDLEVBQUU7Z0JBQ3RELGFBQWEsR0FBRyxHQUFHLGFBQWEsSUFBSSxlQUFlLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDO1lBQ2hGLENBQUMsRUFBQyxDQUFDO1NBQ0o7O2NBQ0ssV0FBVyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztRQUMvRixPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0NBQ0Y7Ozs7OztJQW5kQyx5Q0FBeUQ7O0lBQ3pELG9DQWNFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgb2xmaWx0ZXIgZnJvbSAnb2wvZm9ybWF0L2ZpbHRlcic7XHJcbmltcG9ydCBvbEZvcm1hdFdLVCBmcm9tICdvbC9mb3JtYXQvV0tUJztcclxuaW1wb3J0IG9sRm9ybWF0V0ZTIGZyb20gJ29sL2Zvcm1hdC9XRlMnO1xyXG5pbXBvcnQgb2xHZW9tZXRyeSBmcm9tICdvbC9nZW9tL0dlb21ldHJ5JztcclxuXHJcbmltcG9ydCB7IHV1aWQgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQge1xyXG4gIE9nY0ZpbHRlcixcclxuICBJZ29PZ2NGaWx0ZXJPYmplY3QsXHJcbiAgV0ZTV3JpdGVHZXRGZWF0dXJlT3B0aW9ucyxcclxuICBBbnlCYXNlT2djRmlsdGVyT3B0aW9ucyxcclxuICBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zLFxyXG4gIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucyxcclxuICBPZ2NGaWx0ZXJzT3B0aW9uc1xyXG59IGZyb20gJy4vb2djLWZpbHRlci5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE9nY0ZpbHRlcldyaXRlciB7XHJcbiAgcHJpdmF0ZSBmaWx0ZXJTZXF1ZW5jZTogT2djSW50ZXJmYWNlRmlsdGVyT3B0aW9uc1tdID0gW107XHJcbiAgcHVibGljIG9wZXJhdG9ycyA9IHtcclxuICAgIFByb3BlcnR5SXNFcXVhbFRvOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbXSB9LFxyXG4gICAgUHJvcGVydHlJc05vdEVxdWFsVG86IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFtdIH0sXHJcbiAgICBQcm9wZXJ0eUlzTGlrZTogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogWydzdHJpbmcnXSB9LFxyXG4gICAgUHJvcGVydHlJc0dyZWF0ZXJUaGFuOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbJ251bWJlciddIH0sXHJcbiAgICBQcm9wZXJ0eUlzR3JlYXRlclRoYW5PckVxdWFsVG86IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFsnbnVtYmVyJ10gfSxcclxuICAgIFByb3BlcnR5SXNMZXNzVGhhbjogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogWydudW1iZXInXSB9LFxyXG4gICAgUHJvcGVydHlJc0xlc3NUaGFuT3JFcXVhbFRvOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbJ251bWJlciddIH0sXHJcbiAgICBQcm9wZXJ0eUlzQmV0d2VlbjogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogWydudW1iZXInXSB9LFxyXG4gICAgRHVyaW5nOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbXSB9LFxyXG4gICAgUHJvcGVydHlJc051bGw6IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFtdIH0sXHJcbiAgICBJbnRlcnNlY3RzOiB7IHNwYXRpYWw6IHRydWUsIGZpZWxkUmVzdHJpY3Q6IFtdIH0sXHJcbiAgICBXaXRoaW46IHsgc3BhdGlhbDogdHJ1ZSwgZmllbGRSZXN0cmljdDogW10gfSxcclxuICAgIENvbnRhaW5zOiB7IHNwYXRpYWw6IHRydWUsIGZpZWxkUmVzdHJpY3Q6IFtdIH1cclxuICB9O1xyXG5cclxuICBkZWZpbmVPZ2NGaWx0ZXJzRGVmYXVsdE9wdGlvbnMoXHJcbiAgICBvZ2NGaWx0ZXJzT3B0aW9uczogT2djRmlsdGVyc09wdGlvbnMsXHJcbiAgICBmaWVsZE5hbWVHZW9tZXRyeTogc3RyaW5nLFxyXG4gICAgc3JjVHlwZT86IHN0cmluZyk6IE9nY0ZpbHRlcnNPcHRpb25zICB7XHJcbiAgICBsZXQgb2djRmlsdGVyc0RlZmF1bHRWYWx1ZSA9IHRydWU7IC8vIGRlZmF1bHQgdmFsdWVzIGZvciB3ZnMuXHJcbiAgICBpZiAoc3JjVHlwZSAmJiBzcmNUeXBlID09PSAnd21zJykge1xyXG4gICAgICBvZ2NGaWx0ZXJzRGVmYXVsdFZhbHVlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb2djRmlsdGVyc09wdGlvbnMgPSBvZ2NGaWx0ZXJzT3B0aW9ucyB8fCB7fTtcclxuICAgIG9nY0ZpbHRlcnNPcHRpb25zLmVuYWJsZWQgPSBvZ2NGaWx0ZXJzT3B0aW9ucy5lbmFibGVkID09PSB1bmRlZmluZWQgPyBvZ2NGaWx0ZXJzRGVmYXVsdFZhbHVlIDogb2djRmlsdGVyc09wdGlvbnMuZW5hYmxlZDtcclxuICAgIG9nY0ZpbHRlcnNPcHRpb25zLmVkaXRhYmxlID0gb2djRmlsdGVyc09wdGlvbnMuZWRpdGFibGUgPT09IHVuZGVmaW5lZCA/IG9nY0ZpbHRlcnNEZWZhdWx0VmFsdWUgOiBvZ2NGaWx0ZXJzT3B0aW9ucy5lZGl0YWJsZTtcclxuICAgIG9nY0ZpbHRlcnNPcHRpb25zLmdlb21ldHJ5TmFtZSA9IGZpZWxkTmFtZUdlb21ldHJ5O1xyXG5cclxuICAgIG9nY0ZpbHRlcnNPcHRpb25zLmFkdmFuY2VkT2djRmlsdGVycyA9IHRydWU7XHJcbiAgICBpZiAob2djRmlsdGVyc09wdGlvbnMuZW5hYmxlZCAmJiBvZ2NGaWx0ZXJzT3B0aW9ucy5wdXNoQnV0dG9ucykge1xyXG4gICAgICBvZ2NGaWx0ZXJzT3B0aW9ucy5hZHZhbmNlZE9nY0ZpbHRlcnMgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBvZ2NGaWx0ZXJzT3B0aW9ucztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBidWlsZEZpbHRlcihcclxuICAgIGZpbHRlcnM/OiBJZ29PZ2NGaWx0ZXJPYmplY3QsXHJcbiAgICBleHRlbnQ/OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcclxuICAgIHByb2o/LFxyXG4gICAgZmllbGROYW1lR2VvbWV0cnk/OiBzdHJpbmdcclxuICApOiBzdHJpbmcge1xyXG4gICAgbGV0IG91ckJib3hGaWx0ZXI7XHJcbiAgICBsZXQgZW5hYmxlQmJveDogYm9vbGVhbjtcclxuICAgIGlmICgvaW50ZXJzZWN0c3xjb250YWluc3x3aXRoaW4vZ2kudGVzdChKU09OLnN0cmluZ2lmeShmaWx0ZXJzKSkpIHtcclxuICAgICAgZW5hYmxlQmJveCA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZW5hYmxlQmJveCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAoZmlsdGVycykge1xyXG4gICAgICBmaWVsZE5hbWVHZW9tZXRyeSA9XHJcbiAgICAgICAgKGZpbHRlcnMgYXMgYW55KS5nZW9tZXRyeU5hbWUgIT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgPyAoZmlsdGVycyBhcyBhbnkpLmdlb21ldHJ5TmFtZVxyXG4gICAgICAgICAgOiBmaWVsZE5hbWVHZW9tZXRyeTtcclxuICAgIH1cclxuICAgIGlmIChleHRlbnQgJiYgZmlsdGVycykge1xyXG4gICAgICBvdXJCYm94RmlsdGVyID0gb2xmaWx0ZXIuYmJveChmaWVsZE5hbWVHZW9tZXRyeSwgZXh0ZW50LCBwcm9qLmdldENvZGUoKSk7XHJcbiAgICB9XHJcbiAgICBsZXQgZmlsdGVyQXNzZW1ibHk6IE9nY0ZpbHRlcjtcclxuICAgIGlmIChmaWx0ZXJzKSB7XHJcbiAgICAgIGZpbHRlcnMgPSB0aGlzLmNoZWNrSWdvRmlsdGVyc1Byb3BlcnRpZXMoZmlsdGVycywgZmllbGROYW1lR2VvbWV0cnkpO1xyXG4gICAgICBpZiAoZXh0ZW50ICYmIGVuYWJsZUJib3gpIHtcclxuICAgICAgICBmaWx0ZXJBc3NlbWJseSA9IG9sZmlsdGVyLmFuZChcclxuICAgICAgICAgIG91ckJib3hGaWx0ZXIsXHJcbiAgICAgICAgICB0aGlzLmJ1bmRsZUZpbHRlcihmaWx0ZXJzKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZmlsdGVyQXNzZW1ibHkgPSB0aGlzLmJ1bmRsZUZpbHRlcihmaWx0ZXJzKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuICdiYm94PScgKyBleHRlbnQuam9pbignLCcpICsgJywnICsgcHJvai5nZXRDb2RlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgd2ZzT3B0aW9uczogV0ZTV3JpdGVHZXRGZWF0dXJlT3B0aW9ucyA9IHtcclxuICAgICAgc3JzTmFtZTogJycsXHJcbiAgICAgIGZlYXR1cmVOUzogJycsXHJcbiAgICAgIGZlYXR1cmVQcmVmaXg6ICcnLFxyXG4gICAgICBmZWF0dXJlVHlwZXM6IFsnZmVhdHVyZVR5cGVzJ10sXHJcbiAgICAgIGZpbHRlcjogZmlsdGVyQXNzZW1ibHksXHJcbiAgICAgIG91dHB1dEZvcm1hdDogJycsXHJcbiAgICAgIGdlb21ldHJ5TmFtZTogZmllbGROYW1lR2VvbWV0cnlcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcXVlcnkgPSBuZXcgb2xGb3JtYXRXRlMoKS53cml0ZUdldEZlYXR1cmUod2ZzT3B0aW9ucyk7XHJcbiAgICBjb25zdCBzdHIgPSBuZXcgWE1MU2VyaWFsaXplcigpLnNlcmlhbGl6ZVRvU3RyaW5nKHF1ZXJ5KTtcclxuICAgIGNvbnN0IHJlZ2V4cDEgPSAvdHlwZW5hbWVzICo9fHR5cGVuYW1lICo9XFxcImZlYXR1cmVUeXBlc1xcXCIgKj4vZ2k7XHJcbiAgICBjb25zdCByZWdleHAyID0gLzxcXC9RdWVyeT48XFwvR2V0RmVhdHVyZT4vZ2k7XHJcblxyXG4gICAgcmV0dXJuICdmaWx0ZXI9JyArIHN0ci5zcGxpdChyZWdleHAxKVsxXS5zcGxpdChyZWdleHAyKVswXTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYnVuZGxlRmlsdGVyKGZpbHRlck9iamVjdDogYW55KSB7XHJcbiAgICBpZiAoZmlsdGVyT2JqZWN0IGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgY29uc3QgbG9naWNhbEFycmF5ID0gW107XHJcbiAgICAgIGZpbHRlck9iamVjdC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgIGxvZ2ljYWxBcnJheS5wdXNoKHRoaXMuYnVuZGxlRmlsdGVyKGVsZW1lbnQpKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBsb2dpY2FsQXJyYXk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoZmlsdGVyT2JqZWN0Lmhhc093blByb3BlcnR5KCdsb2dpY2FsJykpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVGaWx0ZXIoe1xyXG4gICAgICAgICAgb3BlcmF0b3I6IGZpbHRlck9iamVjdC5sb2dpY2FsLFxyXG4gICAgICAgICAgbG9naWNhbEFycmF5OiB0aGlzLmJ1bmRsZUZpbHRlcihmaWx0ZXJPYmplY3QuZmlsdGVycylcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIGlmIChmaWx0ZXJPYmplY3QuaGFzT3duUHJvcGVydHkoJ29wZXJhdG9yJykpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVGaWx0ZXIoZmlsdGVyT2JqZWN0IGFzIEFueUJhc2VPZ2NGaWx0ZXJPcHRpb25zKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVGaWx0ZXIoZmlsdGVyT3B0aW9ucyk6IE9nY0ZpbHRlciB7XHJcbiAgICBjb25zdCBvcGVyYXRvciA9IGZpbHRlck9wdGlvbnMub3BlcmF0b3I7XHJcbiAgICBjb25zdCBsb2dpY2FsQXJyYXkgPSBmaWx0ZXJPcHRpb25zLmxvZ2ljYWxBcnJheTtcclxuXHJcbiAgICBjb25zdCB3ZnNQcm9wZXJ0eU5hbWUgPSBmaWx0ZXJPcHRpb25zLnByb3BlcnR5TmFtZTtcclxuICAgIGNvbnN0IHdmc1BhdHRlcm4gPSBmaWx0ZXJPcHRpb25zLnBhdHRlcm47XHJcbiAgICBjb25zdCB3ZnNNYXRjaENhc2UgPSBmaWx0ZXJPcHRpb25zLm1hdGNoQ2FzZVxyXG4gICAgICA/IGZpbHRlck9wdGlvbnMubWF0Y2hDYXNlXHJcbiAgICAgIDogdHJ1ZTtcclxuICAgIGNvbnN0IHdmc1dpbGRDYXJkID0gZmlsdGVyT3B0aW9ucy53aWxkQ2FyZCA/IGZpbHRlck9wdGlvbnMud2lsZENhcmQgOiAnKic7XHJcbiAgICBjb25zdCB3ZnNTaW5nbGVDaGFyID0gZmlsdGVyT3B0aW9ucy5zaW5nbGVDaGFyXHJcbiAgICAgID8gZmlsdGVyT3B0aW9ucy5zaW5nbGVDaGFyXHJcbiAgICAgIDogJy4nO1xyXG4gICAgY29uc3Qgd2ZzRXNjYXBlQ2hhciA9IGZpbHRlck9wdGlvbnMuZXNjYXBlQ2hhclxyXG4gICAgICA/IGZpbHRlck9wdGlvbnMuZXNjYXBlQ2hhclxyXG4gICAgICA6ICchJztcclxuXHJcbiAgICBjb25zdCB3ZnNMb3dlckJvdW5kYXJ5ID0gZmlsdGVyT3B0aW9ucy5sb3dlckJvdW5kYXJ5O1xyXG4gICAgY29uc3Qgd2ZzVXBwZXJCb3VuZGFyeSA9IGZpbHRlck9wdGlvbnMudXBwZXJCb3VuZGFyeTtcclxuXHJcbiAgICBjb25zdCB3ZnNHZW9tZXRyeU5hbWUgPSBmaWx0ZXJPcHRpb25zLmdlb21ldHJ5TmFtZTtcclxuICAgIGNvbnN0IHdmc0V4dGVudCA9IGZpbHRlck9wdGlvbnMuZXh0ZW50O1xyXG4gICAgY29uc3Qgd2ZzV2t0R2VvbWV0cnkgPSBmaWx0ZXJPcHRpb25zLndrdF9nZW9tZXRyeTtcclxuICAgIGNvbnN0IHdmc1Nyc05hbWUgPSBmaWx0ZXJPcHRpb25zLnNyc05hbWVcclxuICAgICAgPyBmaWx0ZXJPcHRpb25zLnNyc05hbWVcclxuICAgICAgOiAnRVBTRzozODU3JztcclxuXHJcbiAgICBjb25zdCB3ZnNCZWdpbiA9IGZpbHRlck9wdGlvbnMuYmVnaW47XHJcbiAgICBjb25zdCB3ZnNFbmQgPSBmaWx0ZXJPcHRpb25zLmVuZDtcclxuXHJcbiAgICBjb25zdCB3ZnNFeHByZXNzaW9uID0gZmlsdGVyT3B0aW9ucy5leHByZXNzaW9uO1xyXG5cclxuICAgIGxldCBnZW9tZXRyeTogb2xHZW9tZXRyeTtcclxuICAgIGlmICh3ZnNXa3RHZW9tZXRyeSkge1xyXG4gICAgICBjb25zdCB3a3QgPSBuZXcgb2xGb3JtYXRXS1QoKTtcclxuICAgICAgZ2VvbWV0cnkgPSB3a3QucmVhZEdlb21ldHJ5KHdmc1drdEdlb21ldHJ5LCB7XHJcbiAgICAgICAgZGF0YVByb2plY3Rpb246IHdmc1Nyc05hbWUsXHJcbiAgICAgICAgZmVhdHVyZVByb2plY3Rpb246ICdFUFNHOjM4NTcnXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaCAob3BlcmF0b3IpIHtcclxuICAgICAgY2FzZSAnQkJPWCc6XHJcbiAgICAgICAgcmV0dXJuIG9sZmlsdGVyLmJib3god2ZzR2VvbWV0cnlOYW1lLCB3ZnNFeHRlbnQsIHdmc1Nyc05hbWUpO1xyXG4gICAgICBjYXNlICdQcm9wZXJ0eUlzQmV0d2Vlbic6XHJcbiAgICAgICAgcmV0dXJuIG9sZmlsdGVyLmJldHdlZW4oXHJcbiAgICAgICAgICB3ZnNQcm9wZXJ0eU5hbWUsXHJcbiAgICAgICAgICB3ZnNMb3dlckJvdW5kYXJ5LFxyXG4gICAgICAgICAgd2ZzVXBwZXJCb3VuZGFyeVxyXG4gICAgICAgICk7XHJcbiAgICAgIGNhc2UgJ0NvbnRhaW5zJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIuY29udGFpbnMod2ZzR2VvbWV0cnlOYW1lLCBnZW9tZXRyeSwgd2ZzU3JzTmFtZSk7XHJcbiAgICAgIGNhc2UgJ0R1cmluZyc6XHJcbiAgICAgICAgcmV0dXJuIG9sZmlsdGVyLmR1cmluZyh3ZnNQcm9wZXJ0eU5hbWUsIHdmc0JlZ2luLCB3ZnNFbmQpO1xyXG4gICAgICBjYXNlICdQcm9wZXJ0eUlzRXF1YWxUbyc6XHJcbiAgICAgICAgcmV0dXJuIG9sZmlsdGVyLmVxdWFsVG8oXHJcbiAgICAgICAgICB3ZnNQcm9wZXJ0eU5hbWUsXHJcbiAgICAgICAgICB3ZnNFeHByZXNzaW9uLFxyXG4gICAgICAgICAgd2ZzTWF0Y2hDYXNlXHJcbiAgICAgICAgKTtcclxuICAgICAgY2FzZSAnUHJvcGVydHlJc0dyZWF0ZXJUaGFuJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIuZ3JlYXRlclRoYW4od2ZzUHJvcGVydHlOYW1lLCB3ZnNFeHByZXNzaW9uKTtcclxuICAgICAgY2FzZSAnUHJvcGVydHlJc0dyZWF0ZXJUaGFuT3JFcXVhbFRvJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIuZ3JlYXRlclRoYW5PckVxdWFsVG8od2ZzUHJvcGVydHlOYW1lLCB3ZnNFeHByZXNzaW9uKTtcclxuICAgICAgY2FzZSAnSW50ZXJzZWN0cyc6XHJcbiAgICAgICAgcmV0dXJuIG9sZmlsdGVyLmludGVyc2VjdHMod2ZzR2VvbWV0cnlOYW1lLCBnZW9tZXRyeSwgd2ZzU3JzTmFtZSk7XHJcbiAgICAgIGNhc2UgJ1Byb3BlcnR5SXNOdWxsJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIuaXNOdWxsKHdmc1Byb3BlcnR5TmFtZSk7XHJcbiAgICAgIGNhc2UgJ1Byb3BlcnR5SXNMZXNzVGhhbic6XHJcbiAgICAgICAgcmV0dXJuIG9sZmlsdGVyLmxlc3NUaGFuKHdmc1Byb3BlcnR5TmFtZSwgd2ZzRXhwcmVzc2lvbik7XHJcbiAgICAgIGNhc2UgJ1Byb3BlcnR5SXNMZXNzVGhhbk9yRXF1YWxUbyc6XHJcbiAgICAgICAgcmV0dXJuIG9sZmlsdGVyLmxlc3NUaGFuT3JFcXVhbFRvKHdmc1Byb3BlcnR5TmFtZSwgd2ZzRXhwcmVzc2lvbik7XHJcbiAgICAgIGNhc2UgJ1Byb3BlcnR5SXNMaWtlJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIubGlrZShcclxuICAgICAgICAgIHdmc1Byb3BlcnR5TmFtZSxcclxuICAgICAgICAgIHdmc1BhdHRlcm4ucmVwbGFjZSgvWygpX10vZ2ksIHdmc1NpbmdsZUNoYXIpLFxyXG4gICAgICAgICAgd2ZzV2lsZENhcmQsXHJcbiAgICAgICAgICB3ZnNTaW5nbGVDaGFyLFxyXG4gICAgICAgICAgd2ZzRXNjYXBlQ2hhcixcclxuICAgICAgICAgIHdmc01hdGNoQ2FzZVxyXG4gICAgICAgICk7XHJcbiAgICAgIGNhc2UgJ1Byb3BlcnR5SXNOb3RFcXVhbFRvJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIubm90RXF1YWxUbyhcclxuICAgICAgICAgIHdmc1Byb3BlcnR5TmFtZSxcclxuICAgICAgICAgIHdmc0V4cHJlc3Npb24sXHJcbiAgICAgICAgICB3ZnNNYXRjaENhc2VcclxuICAgICAgICApO1xyXG4gICAgICBjYXNlICdXaXRoaW4nOlxyXG4gICAgICAgIHJldHVybiBvbGZpbHRlci53aXRoaW4od2ZzR2VvbWV0cnlOYW1lLCBnZW9tZXRyeSwgd2ZzU3JzTmFtZSk7XHJcbiAgICAgIC8vIExPR0lDQUxcclxuICAgICAgY2FzZSAnQW5kJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIuYW5kLmFwcGx5KG51bGwsIGxvZ2ljYWxBcnJheSk7XHJcbiAgICAgIGNhc2UgJ09yJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIub3IuYXBwbHkobnVsbCwgbG9naWNhbEFycmF5KTtcclxuICAgICAgY2FzZSAnTm90JzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIubm90LmFwcGx5KG51bGwsIGxvZ2ljYWxBcnJheSk7XHJcblxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGVmaW5lSW50ZXJmYWNlRmlsdGVyU2VxdWVuY2UoXHJcbiAgICBmaWx0ZXJPYmplY3Q6IGFueSxcclxuICAgIGdlb21ldHJ5TmFtZSxcclxuICAgIGxvZ2ljYWwgPSAnJyxcclxuICAgIGxldmVsID0gLTFcclxuICApOiBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zW10ge1xyXG4gICAgaWYgKGZpbHRlck9iamVjdCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgIGZpbHRlck9iamVjdC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgIHRoaXMuZmlsdGVyU2VxdWVuY2UuY29uY2F0KFxyXG4gICAgICAgICAgdGhpcy5kZWZpbmVJbnRlcmZhY2VGaWx0ZXJTZXF1ZW5jZShcclxuICAgICAgICAgICAgZWxlbWVudCxcclxuICAgICAgICAgICAgZ2VvbWV0cnlOYW1lLFxyXG4gICAgICAgICAgICBsb2dpY2FsLFxyXG4gICAgICAgICAgICBsZXZlbFxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGZpbHRlck9iamVjdC5oYXNPd25Qcm9wZXJ0eSgnbG9naWNhbCcpKSB7XHJcbiAgICAgICAgbGV2ZWwgPSBsZXZlbCArIDE7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJTZXF1ZW5jZS5jb25jYXQoXHJcbiAgICAgICAgICB0aGlzLmRlZmluZUludGVyZmFjZUZpbHRlclNlcXVlbmNlKFxyXG4gICAgICAgICAgICBmaWx0ZXJPYmplY3QuZmlsdGVycyxcclxuICAgICAgICAgICAgZ2VvbWV0cnlOYW1lLFxyXG4gICAgICAgICAgICBmaWx0ZXJPYmplY3QubG9naWNhbCxcclxuICAgICAgICAgICAgbGV2ZWxcclxuICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2UgaWYgKGZpbHRlck9iamVjdC5oYXNPd25Qcm9wZXJ0eSgnb3BlcmF0b3InKSkge1xyXG4gICAgICAgIHRoaXMuZmlsdGVyU2VxdWVuY2UucHVzaChcclxuICAgICAgICAgIHRoaXMuYWRkSW50ZXJmYWNlRmlsdGVyKGZpbHRlck9iamVjdCwgZ2VvbWV0cnlOYW1lLCBsZXZlbCwgbG9naWNhbClcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5maWx0ZXJTZXF1ZW5jZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRJbnRlcmZhY2VGaWx0ZXIoXHJcbiAgICBpZ29PZ2NGaWx0ZXJPYmplY3Q/LFxyXG4gICAgZ2VvbWV0cnlOYW1lPyxcclxuICAgIGxldmVsID0gMCxcclxuICAgIHBhcmVudExvZ2ljYWwgPSAnT3InXHJcbiAgKTogT2djSW50ZXJmYWNlRmlsdGVyT3B0aW9ucyB7XHJcbiAgICBpZiAoIWlnb09nY0ZpbHRlck9iamVjdCkge1xyXG4gICAgICBpZ29PZ2NGaWx0ZXJPYmplY3QgPSB7IG9wZXJhdG9yOiAnUHJvcGVydHlJc0VxdWFsVG8nIH07XHJcbiAgICB9XHJcbiAgICBjb25zdCBmID0ge1xyXG4gICAgICBwcm9wZXJ0eU5hbWU6ICcnLFxyXG4gICAgICBvcGVyYXRvcjogJycsXHJcbiAgICAgIGFjdGl2ZTogJycsXHJcbiAgICAgIGZpbHRlcmlkOiB1dWlkKCksXHJcbiAgICAgIGJlZ2luOiAnJyxcclxuICAgICAgZW5kOiAnJyxcclxuICAgICAgbG93ZXJCb3VuZGFyeTogJycsXHJcbiAgICAgIHVwcGVyQm91bmRhcnk6ICcnLFxyXG4gICAgICBleHByZXNzaW9uOiAnJyxcclxuICAgICAgcGF0dGVybjogJycsXHJcbiAgICAgIHdpbGRDYXJkOiAnKicsXHJcbiAgICAgIHNpbmdsZUNoYXI6ICcuJyxcclxuICAgICAgZXNjYXBlQ2hhcjogJyEnLFxyXG4gICAgICBtYXRjaENhc2U6IHRydWUsXHJcbiAgICAgIGlnb1NwYXRpYWxTZWxlY3RvcjogJycsXHJcbiAgICAgIGdlb21ldHJ5TmFtZTogJycsXHJcbiAgICAgIGdlb21ldHJ5OiAnJyxcclxuICAgICAgd2t0X2dlb21ldHJ5OiAnJyxcclxuICAgICAgZXh0ZW50OiAnJyxcclxuICAgICAgc3JzTmFtZTogJycsXHJcbiAgICAgIHBhcmVudExvZ2ljYWw6ICcnLFxyXG4gICAgICBsZXZlbDogMFxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihcclxuICAgICAgZixcclxuICAgICAge1xyXG4gICAgICAgIHBhcmVudExvZ2ljYWwsXHJcbiAgICAgICAgbGV2ZWwsXHJcbiAgICAgICAgZ2VvbWV0cnlOYW1lXHJcbiAgICAgIH0sXHJcbiAgICAgIGlnb09nY0ZpbHRlck9iamVjdFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjaGVja0lnb0ZpbHRlcnNQcm9wZXJ0aWVzKFxyXG4gICAgZmlsdGVyT2JqZWN0OiBhbnksXHJcbiAgICBmaWVsZE5hbWVHZW9tZXRyeSxcclxuICAgIGFjdGl2ZSA9IGZhbHNlXHJcbiAgKSB7XHJcbiAgICBjb25zdCBmaWx0ZXJBcnJheSA9IFtdO1xyXG4gICAgaWYgKGZpbHRlck9iamVjdCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgIGZpbHRlck9iamVjdC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgIGZpbHRlckFycmF5LnB1c2goXHJcbiAgICAgICAgICB0aGlzLmNoZWNrSWdvRmlsdGVyc1Byb3BlcnRpZXMoZWxlbWVudCwgZmllbGROYW1lR2VvbWV0cnksIGFjdGl2ZSlcclxuICAgICAgICApO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIGZpbHRlckFycmF5O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGZpbHRlck9iamVjdC5oYXNPd25Qcm9wZXJ0eSgnbG9naWNhbCcpKSB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAgICB7fSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbG9naWNhbDogZmlsdGVyT2JqZWN0LmxvZ2ljYWwsXHJcbiAgICAgICAgICAgIGZpbHRlcnM6IHRoaXMuY2hlY2tJZ29GaWx0ZXJzUHJvcGVydGllcyhcclxuICAgICAgICAgICAgICBmaWx0ZXJPYmplY3QuZmlsdGVycyxcclxuICAgICAgICAgICAgICBmaWVsZE5hbWVHZW9tZXRyeSxcclxuICAgICAgICAgICAgICBhY3RpdmVcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSBpZiAoZmlsdGVyT2JqZWN0Lmhhc093blByb3BlcnR5KCdvcGVyYXRvcicpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkRmlsdGVyUHJvcGVydGllcyhcclxuICAgICAgICAgIGZpbHRlck9iamVjdCBhcyBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zLFxyXG4gICAgICAgICAgZmllbGROYW1lR2VvbWV0cnksXHJcbiAgICAgICAgICBhY3RpdmVcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZEZpbHRlclByb3BlcnRpZXMoXHJcbiAgICBpZ29PZ2NGaWx0ZXJPYmplY3Q6IE9nY0ludGVyZmFjZUZpbHRlck9wdGlvbnMsXHJcbiAgICBmaWVsZE5hbWVHZW9tZXRyeSxcclxuICAgIGFjdGl2ZSA9IGZhbHNlXHJcbiAgKSB7XHJcbiAgICBjb25zdCBmaWx0ZXJpZCA9IGlnb09nY0ZpbHRlck9iamVjdC5oYXNPd25Qcm9wZXJ0eSgnZmlsdGVyaWQnKVxyXG4gICAgICA/IGlnb09nY0ZpbHRlck9iamVjdC5maWx0ZXJpZFxyXG4gICAgICA6IHV1aWQoKTtcclxuICAgIGNvbnN0IHN0YXR1cyA9IGlnb09nY0ZpbHRlck9iamVjdC5oYXNPd25Qcm9wZXJ0eSgnYWN0aXZlJylcclxuICAgICAgPyBpZ29PZ2NGaWx0ZXJPYmplY3QuYWN0aXZlXHJcbiAgICAgIDogYWN0aXZlO1xyXG5cclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKFxyXG4gICAgICB7fSxcclxuICAgICAge1xyXG4gICAgICAgIGZpbHRlcmlkLFxyXG4gICAgICAgIGFjdGl2ZTogc3RhdHVzLFxyXG4gICAgICAgIGlnb1NwYXRpYWxTZWxlY3RvcjogJ2ZpeGVkRXh0ZW50J1xyXG4gICAgICB9LFxyXG4gICAgICBpZ29PZ2NGaWx0ZXJPYmplY3QsXHJcbiAgICAgIHsgZ2VvbWV0cnlOYW1lOiBmaWVsZE5hbWVHZW9tZXRyeSB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlYnVpbHRJZ29PZ2NGaWx0ZXJPYmplY3RGcm9tU2VxdWVuY2UoXHJcbiAgICBzZXF1ZW5jZTogT2djSW50ZXJmYWNlRmlsdGVyT3B0aW9uc1tdXHJcbiAgKTogSWdvT2djRmlsdGVyT2JqZWN0IHtcclxuICAgIGlmIChzZXF1ZW5jZSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgIGlmIChzZXF1ZW5jZS5sZW5ndGggPj0gMSkge1xyXG4gICAgICAgIGxldCBsYXN0UGFyZW50TG9naWNhbCA9IHNlcXVlbmNlWzBdLnBhcmVudExvZ2ljYWw7XHJcbiAgICAgICAgbGV0IG5leHRFbGVtZW50OiBhbnk7XHJcbiAgICAgICAgbGV0IGxvZ2ljYWxBcnJheSA9IFtdO1xyXG4gICAgICAgIGxldCBsYXN0UHJvY2Vzc2VkRmlsdGVyO1xyXG4gICAgICAgIHNlcXVlbmNlLmZvckVhY2godWlGaWx0ZXIgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZWxlbWVudCA9IE9iamVjdC5hc3NpZ24oe30sIHVpRmlsdGVyKTtcclxuICAgICAgICAgIGNvbnN0IGluZGV4ID0gc2VxdWVuY2UuaW5kZXhPZih1aUZpbHRlcik7XHJcbiAgICAgICAgICBpZiAoaW5kZXggPj0gMCAmJiBpbmRleCA8IHNlcXVlbmNlLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBzZXF1ZW5jZVtpbmRleCArIDFdO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZGVsZXRlIGVsZW1lbnQuYWN0aXZlO1xyXG4gICAgICAgICAgZGVsZXRlIGVsZW1lbnQuZmlsdGVyaWQ7XHJcbiAgICAgICAgICBkZWxldGUgZWxlbWVudC5wYXJlbnRMb2dpY2FsO1xyXG4gICAgICAgICAgbG9naWNhbEFycmF5LnB1c2goZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgaWYgKHNlcXVlbmNlLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICBsYXN0UHJvY2Vzc2VkRmlsdGVyID0gZWxlbWVudDtcclxuICAgICAgICAgIH0gZWxzZSBpZiAobGFzdFBhcmVudExvZ2ljYWwgIT09IG5leHRFbGVtZW50LnBhcmVudExvZ2ljYWwpIHtcclxuICAgICAgICAgICAgaWYgKGxvZ2ljYWxBcnJheS5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgICdZb3UgbXVzdCBzZXQgYXQgJyArXHJcbiAgICAgICAgICAgICAgICAgICdsZWFzdCB0d28gb3BlcmF0b3IgaW4gYSBsb2dpY2FsICgnICtcclxuICAgICAgICAgICAgICAgICAgbGFzdFBhcmVudExvZ2ljYWwgK1xyXG4gICAgICAgICAgICAgICAgICAnKSdcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGxhc3RQcm9jZXNzZWRGaWx0ZXIgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgICAgICAgICAgICAge30sXHJcbiAgICAgICAgICAgICAgICB7IGxvZ2ljYWw6IGxhc3RQYXJlbnRMb2dpY2FsLCBmaWx0ZXJzOiBsb2dpY2FsQXJyYXkgfVxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgbG9naWNhbEFycmF5ID0gW2xhc3RQcm9jZXNzZWRGaWx0ZXJdO1xyXG4gICAgICAgICAgICAgIGxhc3RQYXJlbnRMb2dpY2FsID0gbmV4dEVsZW1lbnQucGFyZW50TG9naWNhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBsYXN0UHJvY2Vzc2VkRmlsdGVyO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGFuZGxlT2djRmlsdGVyc0FwcGxpZWRWYWx1ZShvcHRpb25zOiBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMsIGZpZWxkTmFtZUdlb21ldHJ5OiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IG9nY0ZpbHRlcnMgPSBvcHRpb25zLm9nY0ZpbHRlcnM7XHJcbiAgICBpZiAoIW9nY0ZpbHRlcnMpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbGV0IGZpbHRlclF1ZXJ5U3RyaW5nUHVzaEJ1dHRvbiA9ICcnO1xyXG4gICAgbGV0IGZpbHRlclF1ZXJ5U3RyaW5nQWR2YW5jZWRGaWx0ZXJzID0gJyc7XHJcbiAgICBpZiAob2djRmlsdGVycy5lbmFibGVkICYmIG9nY0ZpbHRlcnMucHVzaEJ1dHRvbnMpIHtcclxuICAgICAgY29uc3QgcHVzaEJ1dHRvbkJ1bmRsZSA9IG9nY0ZpbHRlcnMucHVzaEJ1dHRvbnM7XHJcbiAgICAgIGNvbnN0IGNvbmRpdGlvbnMgPSBbXTtcclxuICAgICAgcHVzaEJ1dHRvbkJ1bmRsZS5tYXAoYnV0dG9uQnVuZGxlID0+IHtcclxuICAgICAgICBjb25zdCBidW5kbGVDb25kaXRpb24gPSBbXTtcclxuICAgICAgICBidXR0b25CdW5kbGUub2djUHVzaEJ1dHRvbnNcclxuICAgICAgICAgIC5maWx0ZXIob2djcGIgPT4gb2djcGIuZW5hYmxlZCA9PT0gdHJ1ZSlcclxuICAgICAgICAgIC5mb3JFYWNoKGVuYWJsZWRQYiA9PiBidW5kbGVDb25kaXRpb24ucHVzaChlbmFibGVkUGIuZmlsdGVycykpO1xyXG4gICAgICAgIGlmIChidW5kbGVDb25kaXRpb24ubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICBjb25kaXRpb25zLnB1c2goYnVuZGxlQ29uZGl0aW9uWzBdKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGJ1bmRsZUNvbmRpdGlvbi5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICBjb25kaXRpb25zLnB1c2goeyBsb2dpY2FsOiBidXR0b25CdW5kbGUubG9naWNhbCwgZmlsdGVyczogYnVuZGxlQ29uZGl0aW9uIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGlmIChjb25kaXRpb25zLmxlbmd0aCA+PSAxKSB7XHJcbiAgICAgICAgZmlsdGVyUXVlcnlTdHJpbmdQdXNoQnV0dG9uID0gdGhpcy5idWlsZEZpbHRlcihcclxuICAgICAgICAgICAgY29uZGl0aW9ucy5sZW5ndGggPT09IDEgPyBjb25kaXRpb25zWzBdIDogeyBsb2dpY2FsOiAnQW5kJywgZmlsdGVyczogY29uZGl0aW9ucyB9XHJcbiAgICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9nY0ZpbHRlcnMuZW5hYmxlZCAmJiBvZ2NGaWx0ZXJzLmZpbHRlcnMpIHtcclxuICAgICAgb2djRmlsdGVycy5nZW9tZXRyeU5hbWUgPSBvZ2NGaWx0ZXJzLmdlb21ldHJ5TmFtZSB8fCBmaWVsZE5hbWVHZW9tZXRyeTtcclxuICAgICAgY29uc3QgaWdvRmlsdGVycyA9IG9nY0ZpbHRlcnMuZmlsdGVycztcclxuICAgICAgZmlsdGVyUXVlcnlTdHJpbmdBZHZhbmNlZEZpbHRlcnMgPSB0aGlzLmJ1aWxkRmlsdGVyKGlnb0ZpbHRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBmaWx0ZXJRdWVyeVN0cmluZyA9IG9nY0ZpbHRlcnMuYWR2YW5jZWRPZ2NGaWx0ZXJzID8gZmlsdGVyUXVlcnlTdHJpbmdBZHZhbmNlZEZpbHRlcnMgOiBmaWx0ZXJRdWVyeVN0cmluZ1B1c2hCdXR0b247XHJcbiAgICBpZiAob3B0aW9ucy50eXBlID09PSAnd21zJykge1xyXG4gICAgICBmaWx0ZXJRdWVyeVN0cmluZyA9IHRoaXMuZm9ybWF0UHJvY2Vzc2VkT2djRmlsdGVyKGZpbHRlclF1ZXJ5U3RyaW5nLCAob3B0aW9ucyBhcyBhbnkpLnBhcmFtcy5sYXllcnMpO1xyXG4gICAgfVxyXG4gICAgaWYgKG9wdGlvbnMudHlwZSA9PT0gJ3dmcycpIHtcclxuICAgICAgZmlsdGVyUXVlcnlTdHJpbmcgPSB0aGlzLmZvcm1hdFByb2Nlc3NlZE9nY0ZpbHRlcihmaWx0ZXJRdWVyeVN0cmluZywgKG9wdGlvbnMgYXMgYW55KS5wYXJhbXMuZmVhdHVyZVR5cGVzKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmlsdGVyUXVlcnlTdHJpbmc7XHJcblxyXG4gIH1cclxuXHJcbiAgcHVibGljIGZvcm1hdFByb2Nlc3NlZE9nY0ZpbHRlcihcclxuICAgIHByb2Nlc3NlZEZpbHRlcjogc3RyaW5nLFxyXG4gICAgbGF5ZXJzT3JUeXBlbmFtZXM6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBsZXQgYXBwbGllZEZpbHRlciA9ICcnO1xyXG4gICAgaWYgKHByb2Nlc3NlZEZpbHRlci5sZW5ndGggPT09IDAgJiYgbGF5ZXJzT3JUeXBlbmFtZXMuaW5kZXhPZignLCcpID09PSAtMSkge1xyXG4gICAgICBhcHBsaWVkRmlsdGVyID0gcHJvY2Vzc2VkRmlsdGVyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGF5ZXJzT3JUeXBlbmFtZXMuc3BsaXQoJywnKS5mb3JFYWNoKGxheWVyT3JUeXBlbmFtZXMgPT4ge1xyXG4gICAgICAgIGFwcGxpZWRGaWx0ZXIgPSBgJHthcHBsaWVkRmlsdGVyfSgke3Byb2Nlc3NlZEZpbHRlci5yZXBsYWNlKCdmaWx0ZXI9JywgJycpfSlgO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGNvbnN0IGZpbHRlclZhbHVlID0gYXBwbGllZEZpbHRlci5sZW5ndGggPiAwID8gYXBwbGllZEZpbHRlci5yZXBsYWNlKCdmaWx0ZXI9JywgJycpIDogdW5kZWZpbmVkO1xyXG4gICAgcmV0dXJuIGZpbHRlclZhbHVlO1xyXG4gIH1cclxufVxyXG4iXX0=