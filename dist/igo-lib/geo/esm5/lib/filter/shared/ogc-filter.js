/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as olfilter from 'ol/format/filter';
import olFormatWKT from 'ol/format/WKT';
import olFormatWFS from 'ol/format/WFS';
import { uuid } from '@igo2/utils';
var OgcFilterWriter = /** @class */ (function () {
    function OgcFilterWriter() {
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
    OgcFilterWriter.prototype.defineOgcFiltersDefaultOptions = /**
     * @param {?} ogcFiltersOptions
     * @param {?} fieldNameGeometry
     * @param {?=} srcType
     * @return {?}
     */
    function (ogcFiltersOptions, fieldNameGeometry, srcType) {
        /** @type {?} */
        var ogcFiltersDefaultValue = true;
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
    };
    /**
     * @param {?=} filters
     * @param {?=} extent
     * @param {?=} proj
     * @param {?=} fieldNameGeometry
     * @return {?}
     */
    OgcFilterWriter.prototype.buildFilter = /**
     * @param {?=} filters
     * @param {?=} extent
     * @param {?=} proj
     * @param {?=} fieldNameGeometry
     * @return {?}
     */
    function (filters, extent, proj, fieldNameGeometry) {
        /** @type {?} */
        var ourBboxFilter;
        /** @type {?} */
        var enableBbox;
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
        var filterAssembly;
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
        var wfsOptions = {
            srsName: '',
            featureNS: '',
            featurePrefix: '',
            featureTypes: ['featureTypes'],
            filter: filterAssembly,
            outputFormat: '',
            geometryName: fieldNameGeometry
        };
        /** @type {?} */
        var query = new olFormatWFS().writeGetFeature(wfsOptions);
        /** @type {?} */
        var str = new XMLSerializer().serializeToString(query);
        /** @type {?} */
        var regexp1 = /typenames *=|typename *=\"featureTypes\" *>/gi;
        /** @type {?} */
        var regexp2 = /<\/Query><\/GetFeature>/gi;
        return 'filter=' + str.split(regexp1)[1].split(regexp2)[0];
    };
    /**
     * @private
     * @param {?} filterObject
     * @return {?}
     */
    OgcFilterWriter.prototype.bundleFilter = /**
     * @private
     * @param {?} filterObject
     * @return {?}
     */
    function (filterObject) {
        var _this = this;
        if (filterObject instanceof Array) {
            /** @type {?} */
            var logicalArray_1 = [];
            filterObject.forEach((/**
             * @param {?} element
             * @return {?}
             */
            function (element) {
                logicalArray_1.push(_this.bundleFilter(element));
            }));
            return logicalArray_1;
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
    };
    /**
     * @private
     * @param {?} filterOptions
     * @return {?}
     */
    OgcFilterWriter.prototype.createFilter = /**
     * @private
     * @param {?} filterOptions
     * @return {?}
     */
    function (filterOptions) {
        /** @type {?} */
        var operator = filterOptions.operator;
        /** @type {?} */
        var logicalArray = filterOptions.logicalArray;
        /** @type {?} */
        var wfsPropertyName = filterOptions.propertyName;
        /** @type {?} */
        var wfsPattern = filterOptions.pattern;
        /** @type {?} */
        var wfsMatchCase = filterOptions.matchCase
            ? filterOptions.matchCase
            : true;
        /** @type {?} */
        var wfsWildCard = filterOptions.wildCard ? filterOptions.wildCard : '*';
        /** @type {?} */
        var wfsSingleChar = filterOptions.singleChar
            ? filterOptions.singleChar
            : '.';
        /** @type {?} */
        var wfsEscapeChar = filterOptions.escapeChar
            ? filterOptions.escapeChar
            : '!';
        /** @type {?} */
        var wfsLowerBoundary = filterOptions.lowerBoundary;
        /** @type {?} */
        var wfsUpperBoundary = filterOptions.upperBoundary;
        /** @type {?} */
        var wfsGeometryName = filterOptions.geometryName;
        /** @type {?} */
        var wfsExtent = filterOptions.extent;
        /** @type {?} */
        var wfsWktGeometry = filterOptions.wkt_geometry;
        /** @type {?} */
        var wfsSrsName = filterOptions.srsName
            ? filterOptions.srsName
            : 'EPSG:3857';
        /** @type {?} */
        var wfsBegin = filterOptions.begin;
        /** @type {?} */
        var wfsEnd = filterOptions.end;
        /** @type {?} */
        var wfsExpression = filterOptions.expression;
        /** @type {?} */
        var geometry;
        if (wfsWktGeometry) {
            /** @type {?} */
            var wkt = new olFormatWKT();
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
    };
    /**
     * @param {?} filterObject
     * @param {?} geometryName
     * @param {?=} logical
     * @param {?=} level
     * @return {?}
     */
    OgcFilterWriter.prototype.defineInterfaceFilterSequence = /**
     * @param {?} filterObject
     * @param {?} geometryName
     * @param {?=} logical
     * @param {?=} level
     * @return {?}
     */
    function (filterObject, geometryName, logical, level) {
        var _this = this;
        if (logical === void 0) { logical = ''; }
        if (level === void 0) { level = -1; }
        if (filterObject instanceof Array) {
            filterObject.forEach((/**
             * @param {?} element
             * @return {?}
             */
            function (element) {
                _this.filterSequence.concat(_this.defineInterfaceFilterSequence(element, geometryName, logical, level));
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
    };
    /**
     * @param {?=} igoOgcFilterObject
     * @param {?=} geometryName
     * @param {?=} level
     * @param {?=} parentLogical
     * @return {?}
     */
    OgcFilterWriter.prototype.addInterfaceFilter = /**
     * @param {?=} igoOgcFilterObject
     * @param {?=} geometryName
     * @param {?=} level
     * @param {?=} parentLogical
     * @return {?}
     */
    function (igoOgcFilterObject, geometryName, level, parentLogical) {
        if (level === void 0) { level = 0; }
        if (parentLogical === void 0) { parentLogical = 'Or'; }
        if (!igoOgcFilterObject) {
            igoOgcFilterObject = { operator: 'PropertyIsEqualTo' };
        }
        /** @type {?} */
        var f = {
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
            parentLogical: parentLogical,
            level: level,
            geometryName: geometryName
        }, igoOgcFilterObject);
    };
    /**
     * @param {?} filterObject
     * @param {?} fieldNameGeometry
     * @param {?=} active
     * @return {?}
     */
    OgcFilterWriter.prototype.checkIgoFiltersProperties = /**
     * @param {?} filterObject
     * @param {?} fieldNameGeometry
     * @param {?=} active
     * @return {?}
     */
    function (filterObject, fieldNameGeometry, active) {
        var _this = this;
        if (active === void 0) { active = false; }
        /** @type {?} */
        var filterArray = [];
        if (filterObject instanceof Array) {
            filterObject.forEach((/**
             * @param {?} element
             * @return {?}
             */
            function (element) {
                filterArray.push(_this.checkIgoFiltersProperties(element, fieldNameGeometry, active));
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
    };
    /**
     * @private
     * @param {?} igoOgcFilterObject
     * @param {?} fieldNameGeometry
     * @param {?=} active
     * @return {?}
     */
    OgcFilterWriter.prototype.addFilterProperties = /**
     * @private
     * @param {?} igoOgcFilterObject
     * @param {?} fieldNameGeometry
     * @param {?=} active
     * @return {?}
     */
    function (igoOgcFilterObject, fieldNameGeometry, active) {
        if (active === void 0) { active = false; }
        /** @type {?} */
        var filterid = igoOgcFilterObject.hasOwnProperty('filterid')
            ? igoOgcFilterObject.filterid
            : uuid();
        /** @type {?} */
        var status = igoOgcFilterObject.hasOwnProperty('active')
            ? igoOgcFilterObject.active
            : active;
        return Object.assign({}, {
            filterid: filterid,
            active: status,
            igoSpatialSelector: 'fixedExtent'
        }, igoOgcFilterObject, { geometryName: fieldNameGeometry });
    };
    /**
     * @param {?} sequence
     * @return {?}
     */
    OgcFilterWriter.prototype.rebuiltIgoOgcFilterObjectFromSequence = /**
     * @param {?} sequence
     * @return {?}
     */
    function (sequence) {
        if (sequence instanceof Array) {
            if (sequence.length >= 1) {
                /** @type {?} */
                var lastParentLogical_1 = sequence[0].parentLogical;
                /** @type {?} */
                var nextElement_1;
                /** @type {?} */
                var logicalArray_2 = [];
                /** @type {?} */
                var lastProcessedFilter_1;
                sequence.forEach((/**
                 * @param {?} uiFilter
                 * @return {?}
                 */
                function (uiFilter) {
                    /** @type {?} */
                    var element = Object.assign({}, uiFilter);
                    /** @type {?} */
                    var index = sequence.indexOf(uiFilter);
                    if (index >= 0 && index < sequence.length - 1) {
                        nextElement_1 = sequence[index + 1];
                    }
                    else {
                        nextElement_1 = element;
                    }
                    delete element.active;
                    delete element.filterid;
                    delete element.parentLogical;
                    logicalArray_2.push(element);
                    if (sequence.length === 1) {
                        lastProcessedFilter_1 = element;
                    }
                    else if (lastParentLogical_1 !== nextElement_1.parentLogical) {
                        if (logicalArray_2.length === 1) {
                            console.log('You must set at ' +
                                'least two operator in a logical (' +
                                lastParentLogical_1 +
                                ')');
                        }
                        else {
                            lastProcessedFilter_1 = Object.assign({}, { logical: lastParentLogical_1, filters: logicalArray_2 });
                            logicalArray_2 = [lastProcessedFilter_1];
                            lastParentLogical_1 = nextElement_1.parentLogical;
                        }
                    }
                }));
                return lastProcessedFilter_1;
            }
            else {
                return undefined;
            }
        }
        else {
            return undefined;
        }
    };
    /**
     * @param {?} options
     * @param {?} fieldNameGeometry
     * @return {?}
     */
    OgcFilterWriter.prototype.handleOgcFiltersAppliedValue = /**
     * @param {?} options
     * @param {?} fieldNameGeometry
     * @return {?}
     */
    function (options, fieldNameGeometry) {
        /** @type {?} */
        var ogcFilters = options.ogcFilters;
        if (!ogcFilters) {
            return;
        }
        /** @type {?} */
        var filterQueryStringPushButton = '';
        /** @type {?} */
        var filterQueryStringAdvancedFilters = '';
        if (ogcFilters.enabled && ogcFilters.pushButtons) {
            /** @type {?} */
            var pushButtonBundle = ogcFilters.pushButtons;
            /** @type {?} */
            var conditions_1 = [];
            pushButtonBundle.map((/**
             * @param {?} buttonBundle
             * @return {?}
             */
            function (buttonBundle) {
                /** @type {?} */
                var bundleCondition = [];
                buttonBundle.ogcPushButtons
                    .filter((/**
                 * @param {?} ogcpb
                 * @return {?}
                 */
                function (ogcpb) { return ogcpb.enabled === true; }))
                    .forEach((/**
                 * @param {?} enabledPb
                 * @return {?}
                 */
                function (enabledPb) { return bundleCondition.push(enabledPb.filters); }));
                if (bundleCondition.length === 1) {
                    conditions_1.push(bundleCondition[0]);
                }
                else if (bundleCondition.length > 1) {
                    conditions_1.push({ logical: buttonBundle.logical, filters: bundleCondition });
                }
            }));
            if (conditions_1.length >= 1) {
                filterQueryStringPushButton = this.buildFilter(conditions_1.length === 1 ? conditions_1[0] : { logical: 'And', filters: conditions_1 });
            }
        }
        if (ogcFilters.enabled && ogcFilters.filters) {
            ogcFilters.geometryName = ogcFilters.geometryName || fieldNameGeometry;
            /** @type {?} */
            var igoFilters = ogcFilters.filters;
            filterQueryStringAdvancedFilters = this.buildFilter(igoFilters);
        }
        /** @type {?} */
        var filterQueryString = ogcFilters.advancedOgcFilters ? filterQueryStringAdvancedFilters : filterQueryStringPushButton;
        if (options.type === 'wms') {
            filterQueryString = this.formatProcessedOgcFilter(filterQueryString, ((/** @type {?} */ (options))).params.layers);
        }
        if (options.type === 'wfs') {
            filterQueryString = this.formatProcessedOgcFilter(filterQueryString, ((/** @type {?} */ (options))).params.featureTypes);
        }
        return filterQueryString;
    };
    /**
     * @param {?} processedFilter
     * @param {?} layersOrTypenames
     * @return {?}
     */
    OgcFilterWriter.prototype.formatProcessedOgcFilter = /**
     * @param {?} processedFilter
     * @param {?} layersOrTypenames
     * @return {?}
     */
    function (processedFilter, layersOrTypenames) {
        /** @type {?} */
        var appliedFilter = '';
        if (processedFilter.length === 0 && layersOrTypenames.indexOf(',') === -1) {
            appliedFilter = processedFilter;
        }
        else {
            layersOrTypenames.split(',').forEach((/**
             * @param {?} layerOrTypenames
             * @return {?}
             */
            function (layerOrTypenames) {
                appliedFilter = appliedFilter + "(" + processedFilter.replace('filter=', '') + ")";
            }));
        }
        /** @type {?} */
        var filterValue = appliedFilter.length > 0 ? appliedFilter.replace('filter=', '') : undefined;
        return filterValue;
    };
    return OgcFilterWriter;
}());
export { OgcFilterWriter };
if (false) {
    /**
     * @type {?}
     * @private
     */
    OgcFilterWriter.prototype.filterSequence;
    /** @type {?} */
    OgcFilterWriter.prototype.operators;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXIvc2hhcmVkL29nYy1maWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxRQUFRLE1BQU0sa0JBQWtCLENBQUM7QUFDN0MsT0FBTyxXQUFXLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sV0FBVyxNQUFNLGVBQWUsQ0FBQztBQUd4QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBWW5DO0lBQUE7UUFDVSxtQkFBYyxHQUFnQyxFQUFFLENBQUM7UUFDbEQsY0FBUyxHQUFHO1lBQ2pCLGlCQUFpQixFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFO1lBQ3hELG9CQUFvQixFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFO1lBQzNELGNBQWMsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDN0QscUJBQXFCLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3BFLDhCQUE4QixFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM3RSxrQkFBa0IsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDakUsMkJBQTJCLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzFFLGlCQUFpQixFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNo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O0lBQ3pELG9DQWNFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgb2xmaWx0ZXIgZnJvbSAnb2wvZm9ybWF0L2ZpbHRlcic7XHJcbmltcG9ydCBvbEZvcm1hdFdLVCBmcm9tICdvbC9mb3JtYXQvV0tUJztcclxuaW1wb3J0IG9sRm9ybWF0V0ZTIGZyb20gJ29sL2Zvcm1hdC9XRlMnO1xyXG5pbXBvcnQgb2xHZW9tZXRyeSBmcm9tICdvbC9nZW9tL0dlb21ldHJ5JztcclxuXHJcbmltcG9ydCB7IHV1aWQgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQge1xyXG4gIE9nY0ZpbHRlcixcclxuICBJZ29PZ2NGaWx0ZXJPYmplY3QsXHJcbiAgV0ZTV3JpdGVHZXRGZWF0dXJlT3B0aW9ucyxcclxuICBBbnlCYXNlT2djRmlsdGVyT3B0aW9ucyxcclxuICBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zLFxyXG4gIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucyxcclxuICBPZ2NGaWx0ZXJzT3B0aW9uc1xyXG59IGZyb20gJy4vb2djLWZpbHRlci5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE9nY0ZpbHRlcldyaXRlciB7XHJcbiAgcHJpdmF0ZSBmaWx0ZXJTZXF1ZW5jZTogT2djSW50ZXJmYWNlRmlsdGVyT3B0aW9uc1tdID0gW107XHJcbiAgcHVibGljIG9wZXJhdG9ycyA9IHtcclxuICAgIFByb3BlcnR5SXNFcXVhbFRvOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbXSB9LFxyXG4gICAgUHJvcGVydHlJc05vdEVxdWFsVG86IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFtdIH0sXHJcbiAgICBQcm9wZXJ0eUlzTGlrZTogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogWydzdHJpbmcnXSB9LFxyXG4gICAgUHJvcGVydHlJc0dyZWF0ZXJUaGFuOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbJ251bWJlciddIH0sXHJcbiAgICBQcm9wZXJ0eUlzR3JlYXRlclRoYW5PckVxdWFsVG86IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFsnbnVtYmVyJ10gfSxcclxuICAgIFByb3BlcnR5SXNMZXNzVGhhbjogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogWydudW1iZXInXSB9LFxyXG4gICAgUHJvcGVydHlJc0xlc3NUaGFuT3JFcXVhbFRvOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbJ251bWJlciddIH0sXHJcbiAgICBQcm9wZXJ0eUlzQmV0d2VlbjogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogWydudW1iZXInXSB9LFxyXG4gICAgRHVyaW5nOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbXSB9LFxyXG4gICAgUHJvcGVydHlJc051bGw6IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFtdIH0sXHJcbiAgICBJbnRlcnNlY3RzOiB7IHNwYXRpYWw6IHRydWUsIGZpZWxkUmVzdHJpY3Q6IFtdIH0sXHJcbiAgICBXaXRoaW46IHsgc3BhdGlhbDogdHJ1ZSwgZmllbGRSZXN0cmljdDogW10gfSxcclxuICAgIENvbnRhaW5zOiB7IHNwYXRpYWw6IHRydWUsIGZpZWxkUmVzdHJpY3Q6IFtdIH1cclxuICB9O1xyXG5cclxuICBkZWZpbmVPZ2NGaWx0ZXJzRGVmYXVsdE9wdGlvbnMoXHJcbiAgICBvZ2NGaWx0ZXJzT3B0aW9uczogT2djRmlsdGVyc09wdGlvbnMsXHJcbiAgICBmaWVsZE5hbWVHZW9tZXRyeTogc3RyaW5nLFxyXG4gICAgc3JjVHlwZT86IHN0cmluZyk6IE9nY0ZpbHRlcnNPcHRpb25zICB7XHJcbiAgICBsZXQgb2djRmlsdGVyc0RlZmF1bHRWYWx1ZSA9IHRydWU7IC8vIGRlZmF1bHQgdmFsdWVzIGZvciB3ZnMuXHJcbiAgICBpZiAoc3JjVHlwZSAmJiBzcmNUeXBlID09PSAnd21zJykge1xyXG4gICAgICBvZ2NGaWx0ZXJzRGVmYXVsdFZhbHVlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb2djRmlsdGVyc09wdGlvbnMgPSBvZ2NGaWx0ZXJzT3B0aW9ucyB8fCB7fTtcclxuICAgIG9nY0ZpbHRlcnNPcHRpb25zLmVuYWJsZWQgPSBvZ2NGaWx0ZXJzT3B0aW9ucy5lbmFibGVkID09PSB1bmRlZmluZWQgPyBvZ2NGaWx0ZXJzRGVmYXVsdFZhbHVlIDogb2djRmlsdGVyc09wdGlvbnMuZW5hYmxlZDtcclxuICAgIG9nY0ZpbHRlcnNPcHRpb25zLmVkaXRhYmxlID0gb2djRmlsdGVyc09wdGlvbnMuZWRpdGFibGUgPT09IHVuZGVmaW5lZCA/IG9nY0ZpbHRlcnNEZWZhdWx0VmFsdWUgOiBvZ2NGaWx0ZXJzT3B0aW9ucy5lZGl0YWJsZTtcclxuICAgIG9nY0ZpbHRlcnNPcHRpb25zLmdlb21ldHJ5TmFtZSA9IGZpZWxkTmFtZUdlb21ldHJ5O1xyXG5cclxuICAgIG9nY0ZpbHRlcnNPcHRpb25zLmFkdmFuY2VkT2djRmlsdGVycyA9IHRydWU7XHJcbiAgICBpZiAob2djRmlsdGVyc09wdGlvbnMuZW5hYmxlZCAmJiBvZ2NGaWx0ZXJzT3B0aW9ucy5wdXNoQnV0dG9ucykge1xyXG4gICAgICBvZ2NGaWx0ZXJzT3B0aW9ucy5hZHZhbmNlZE9nY0ZpbHRlcnMgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBvZ2NGaWx0ZXJzT3B0aW9ucztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBidWlsZEZpbHRlcihcclxuICAgIGZpbHRlcnM/OiBJZ29PZ2NGaWx0ZXJPYmplY3QsXHJcbiAgICBleHRlbnQ/OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcclxuICAgIHByb2o/LFxyXG4gICAgZmllbGROYW1lR2VvbWV0cnk/OiBzdHJpbmdcclxuICApOiBzdHJpbmcge1xyXG4gICAgbGV0IG91ckJib3hGaWx0ZXI7XHJcbiAgICBsZXQgZW5hYmxlQmJveDogYm9vbGVhbjtcclxuICAgIGlmICgvaW50ZXJzZWN0c3xjb250YWluc3x3aXRoaW4vZ2kudGVzdChKU09OLnN0cmluZ2lmeShmaWx0ZXJzKSkpIHtcclxuICAgICAgZW5hYmxlQmJveCA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZW5hYmxlQmJveCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAoZmlsdGVycykge1xyXG4gICAgICBmaWVsZE5hbWVHZW9tZXRyeSA9XHJcbiAgICAgICAgKGZpbHRlcnMgYXMgYW55KS5nZW9tZXRyeU5hbWUgIT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgPyAoZmlsdGVycyBhcyBhbnkpLmdlb21ldHJ5TmFtZVxyXG4gICAgICAgICAgOiBmaWVsZE5hbWVHZW9tZXRyeTtcclxuICAgIH1cclxuICAgIGlmIChleHRlbnQgJiYgZmlsdGVycykge1xyXG4gICAgICBvdXJCYm94RmlsdGVyID0gb2xmaWx0ZXIuYmJveChmaWVsZE5hbWVHZW9tZXRyeSwgZXh0ZW50LCBwcm9qLmdldENvZGUoKSk7XHJcbiAgICB9XHJcbiAgICBsZXQgZmlsdGVyQXNzZW1ibHk6IE9nY0ZpbHRlcjtcclxuICAgIGlmIChmaWx0ZXJzKSB7XHJcbiAgICAgIGZpbHRlcnMgPSB0aGlzLmNoZWNrSWdvRmlsdGVyc1Byb3BlcnRpZXMoZmlsdGVycywgZmllbGROYW1lR2VvbWV0cnkpO1xyXG4gICAgICBpZiAoZXh0ZW50ICYmIGVuYWJsZUJib3gpIHtcclxuICAgICAgICBmaWx0ZXJBc3NlbWJseSA9IG9sZmlsdGVyLmFuZChcclxuICAgICAgICAgIG91ckJib3hGaWx0ZXIsXHJcbiAgICAgICAgICB0aGlzLmJ1bmRsZUZpbHRlcihmaWx0ZXJzKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZmlsdGVyQXNzZW1ibHkgPSB0aGlzLmJ1bmRsZUZpbHRlcihmaWx0ZXJzKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuICdiYm94PScgKyBleHRlbnQuam9pbignLCcpICsgJywnICsgcHJvai5nZXRDb2RlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgd2ZzT3B0aW9uczogV0ZTV3JpdGVHZXRGZWF0dXJlT3B0aW9ucyA9IHtcclxuICAgICAgc3JzTmFtZTogJycsXHJcbiAgICAgIGZlYXR1cmVOUzogJycsXHJcbiAgICAgIGZlYXR1cmVQcmVmaXg6ICcnLFxyXG4gICAgICBmZWF0dXJlVHlwZXM6IFsnZmVhdHVyZVR5cGVzJ10sXHJcbiAgICAgIGZpbHRlcjogZmlsdGVyQXNzZW1ibHksXHJcbiAgICAgIG91dHB1dEZvcm1hdDogJycsXHJcbiAgICAgIGdlb21ldHJ5TmFtZTogZmllbGROYW1lR2VvbWV0cnlcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcXVlcnkgPSBuZXcgb2xGb3JtYXRXRlMoKS53cml0ZUdldEZlYXR1cmUod2ZzT3B0aW9ucyk7XHJcbiAgICBjb25zdCBzdHIgPSBuZXcgWE1MU2VyaWFsaXplcigpLnNlcmlhbGl6ZVRvU3RyaW5nKHF1ZXJ5KTtcclxuICAgIGNvbnN0IHJlZ2V4cDEgPSAvdHlwZW5hbWVzICo9fHR5cGVuYW1lICo9XFxcImZlYXR1cmVUeXBlc1xcXCIgKj4vZ2k7XHJcbiAgICBjb25zdCByZWdleHAyID0gLzxcXC9RdWVyeT48XFwvR2V0RmVhdHVyZT4vZ2k7XHJcblxyXG4gICAgcmV0dXJuICdmaWx0ZXI9JyArIHN0ci5zcGxpdChyZWdleHAxKVsxXS5zcGxpdChyZWdleHAyKVswXTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYnVuZGxlRmlsdGVyKGZpbHRlck9iamVjdDogYW55KSB7XHJcbiAgICBpZiAoZmlsdGVyT2JqZWN0IGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgY29uc3QgbG9naWNhbEFycmF5ID0gW107XHJcbiAgICAgIGZpbHRlck9iamVjdC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgIGxvZ2ljYWxBcnJheS5wdXNoKHRoaXMuYnVuZGxlRmlsdGVyKGVsZW1lbnQpKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBsb2dpY2FsQXJyYXk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoZmlsdGVyT2JqZWN0Lmhhc093blByb3BlcnR5KCdsb2dpY2FsJykpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVGaWx0ZXIoe1xyXG4gICAgICAgICAgb3BlcmF0b3I6IGZpbHRlck9iamVjdC5sb2dpY2FsLFxyXG4gICAgICAgICAgbG9naWNhbEFycmF5OiB0aGlzLmJ1bmRsZUZpbHRlcihmaWx0ZXJPYmplY3QuZmlsdGVycylcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIGlmIChmaWx0ZXJPYmplY3QuaGFzT3duUHJvcGVydHkoJ29wZXJhdG9yJykpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVGaWx0ZXIoZmlsdGVyT2JqZWN0IGFzIEFueUJhc2VPZ2NGaWx0ZXJPcHRpb25zKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVGaWx0ZXIoZmlsdGVyT3B0aW9ucyk6IE9nY0ZpbHRlciB7XHJcbiAgICBjb25zdCBvcGVyYXRvciA9IGZpbHRlck9wdGlvbnMub3BlcmF0b3I7XHJcbiAgICBjb25zdCBsb2dpY2FsQXJyYXkgPSBmaWx0ZXJPcHRpb25zLmxvZ2ljYWxBcnJheTtcclxuXHJcbiAgICBjb25zdCB3ZnNQcm9wZXJ0eU5hbWUgPSBmaWx0ZXJPcHRpb25zLnByb3BlcnR5TmFtZTtcclxuICAgIGNvbnN0IHdmc1BhdHRlcm4gPSBmaWx0ZXJPcHRpb25zLnBhdHRlcm47XHJcbiAgICBjb25zdCB3ZnNNYXRjaENhc2UgPSBmaWx0ZXJPcHRpb25zLm1hdGNoQ2FzZVxyXG4gICAgICA/IGZpbHRlck9wdGlvbnMubWF0Y2hDYXNlXHJcbiAgICAgIDogdHJ1ZTtcclxuICAgIGNvbnN0IHdmc1dpbGRDYXJkID0gZmlsdGVyT3B0aW9ucy53aWxkQ2FyZCA/IGZpbHRlck9wdGlvbnMud2lsZENhcmQgOiAnKic7XHJcbiAgICBjb25zdCB3ZnNTaW5nbGVDaGFyID0gZmlsdGVyT3B0aW9ucy5zaW5nbGVDaGFyXHJcbiAgICAgID8gZmlsdGVyT3B0aW9ucy5zaW5nbGVDaGFyXHJcbiAgICAgIDogJy4nO1xyXG4gICAgY29uc3Qgd2ZzRXNjYXBlQ2hhciA9IGZpbHRlck9wdGlvbnMuZXNjYXBlQ2hhclxyXG4gICAgICA/IGZpbHRlck9wdGlvbnMuZXNjYXBlQ2hhclxyXG4gICAgICA6ICchJztcclxuXHJcbiAgICBjb25zdCB3ZnNMb3dlckJvdW5kYXJ5ID0gZmlsdGVyT3B0aW9ucy5sb3dlckJvdW5kYXJ5O1xyXG4gICAgY29uc3Qgd2ZzVXBwZXJCb3VuZGFyeSA9IGZpbHRlck9wdGlvbnMudXBwZXJCb3VuZGFyeTtcclxuXHJcbiAgICBjb25zdCB3ZnNHZW9tZXRyeU5hbWUgPSBmaWx0ZXJPcHRpb25zLmdlb21ldHJ5TmFtZTtcclxuICAgIGNvbnN0IHdmc0V4dGVudCA9IGZpbHRlck9wdGlvbnMuZXh0ZW50O1xyXG4gICAgY29uc3Qgd2ZzV2t0R2VvbWV0cnkgPSBmaWx0ZXJPcHRpb25zLndrdF9nZW9tZXRyeTtcclxuICAgIGNvbnN0IHdmc1Nyc05hbWUgPSBmaWx0ZXJPcHRpb25zLnNyc05hbWVcclxuICAgICAgPyBmaWx0ZXJPcHRpb25zLnNyc05hbWVcclxuICAgICAgOiAnRVBTRzozODU3JztcclxuXHJcbiAgICBjb25zdCB3ZnNCZWdpbiA9IGZpbHRlck9wdGlvbnMuYmVnaW47XHJcbiAgICBjb25zdCB3ZnNFbmQgPSBmaWx0ZXJPcHRpb25zLmVuZDtcclxuXHJcbiAgICBjb25zdCB3ZnNFeHByZXNzaW9uID0gZmlsdGVyT3B0aW9ucy5leHByZXNzaW9uO1xyXG5cclxuICAgIGxldCBnZW9tZXRyeTogb2xHZW9tZXRyeTtcclxuICAgIGlmICh3ZnNXa3RHZW9tZXRyeSkge1xyXG4gICAgICBjb25zdCB3a3QgPSBuZXcgb2xGb3JtYXRXS1QoKTtcclxuICAgICAgZ2VvbWV0cnkgPSB3a3QucmVhZEdlb21ldHJ5KHdmc1drdEdlb21ldHJ5LCB7XHJcbiAgICAgICAgZGF0YVByb2plY3Rpb246IHdmc1Nyc05hbWUsXHJcbiAgICAgICAgZmVhdHVyZVByb2plY3Rpb246ICdFUFNHOjM4NTcnXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaCAob3BlcmF0b3IpIHtcclxuICAgICAgY2FzZSAnQkJPWCc6XHJcbiAgICAgICAgcmV0dXJuIG9sZmlsdGVyLmJib3god2ZzR2VvbWV0cnlOYW1lLCB3ZnNFeHRlbnQsIHdmc1Nyc05hbWUpO1xyXG4gICAgICBjYXNlICdQcm9wZXJ0eUlzQmV0d2Vlbic6XHJcbiAgICAgICAgcmV0dXJuIG9sZmlsdGVyLmJldHdlZW4oXHJcbiAgICAgICAgICB3ZnNQcm9wZXJ0eU5hbWUsXHJcbiAgICAgICAgICB3ZnNMb3dlckJvdW5kYXJ5LFxyXG4gICAgICAgICAgd2ZzVXBwZXJCb3VuZGFyeVxyXG4gICAgICAgICk7XHJcbiAgICAgIGNhc2UgJ0NvbnRhaW5zJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIuY29udGFpbnMod2ZzR2VvbWV0cnlOYW1lLCBnZW9tZXRyeSwgd2ZzU3JzTmFtZSk7XHJcbiAgICAgIGNhc2UgJ0R1cmluZyc6XHJcbiAgICAgICAgcmV0dXJuIG9sZmlsdGVyLmR1cmluZyh3ZnNQcm9wZXJ0eU5hbWUsIHdmc0JlZ2luLCB3ZnNFbmQpO1xyXG4gICAgICBjYXNlICdQcm9wZXJ0eUlzRXF1YWxUbyc6XHJcbiAgICAgICAgcmV0dXJuIG9sZmlsdGVyLmVxdWFsVG8oXHJcbiAgICAgICAgICB3ZnNQcm9wZXJ0eU5hbWUsXHJcbiAgICAgICAgICB3ZnNFeHByZXNzaW9uLFxyXG4gICAgICAgICAgd2ZzTWF0Y2hDYXNlXHJcbiAgICAgICAgKTtcclxuICAgICAgY2FzZSAnUHJvcGVydHlJc0dyZWF0ZXJUaGFuJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIuZ3JlYXRlclRoYW4od2ZzUHJvcGVydHlOYW1lLCB3ZnNFeHByZXNzaW9uKTtcclxuICAgICAgY2FzZSAnUHJvcGVydHlJc0dyZWF0ZXJUaGFuT3JFcXVhbFRvJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIuZ3JlYXRlclRoYW5PckVxdWFsVG8od2ZzUHJvcGVydHlOYW1lLCB3ZnNFeHByZXNzaW9uKTtcclxuICAgICAgY2FzZSAnSW50ZXJzZWN0cyc6XHJcbiAgICAgICAgcmV0dXJuIG9sZmlsdGVyLmludGVyc2VjdHMod2ZzR2VvbWV0cnlOYW1lLCBnZW9tZXRyeSwgd2ZzU3JzTmFtZSk7XHJcbiAgICAgIGNhc2UgJ1Byb3BlcnR5SXNOdWxsJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIuaXNOdWxsKHdmc1Byb3BlcnR5TmFtZSk7XHJcbiAgICAgIGNhc2UgJ1Byb3BlcnR5SXNMZXNzVGhhbic6XHJcbiAgICAgICAgcmV0dXJuIG9sZmlsdGVyLmxlc3NUaGFuKHdmc1Byb3BlcnR5TmFtZSwgd2ZzRXhwcmVzc2lvbik7XHJcbiAgICAgIGNhc2UgJ1Byb3BlcnR5SXNMZXNzVGhhbk9yRXF1YWxUbyc6XHJcbiAgICAgICAgcmV0dXJuIG9sZmlsdGVyLmxlc3NUaGFuT3JFcXVhbFRvKHdmc1Byb3BlcnR5TmFtZSwgd2ZzRXhwcmVzc2lvbik7XHJcbiAgICAgIGNhc2UgJ1Byb3BlcnR5SXNMaWtlJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIubGlrZShcclxuICAgICAgICAgIHdmc1Byb3BlcnR5TmFtZSxcclxuICAgICAgICAgIHdmc1BhdHRlcm4ucmVwbGFjZSgvWygpX10vZ2ksIHdmc1NpbmdsZUNoYXIpLFxyXG4gICAgICAgICAgd2ZzV2lsZENhcmQsXHJcbiAgICAgICAgICB3ZnNTaW5nbGVDaGFyLFxyXG4gICAgICAgICAgd2ZzRXNjYXBlQ2hhcixcclxuICAgICAgICAgIHdmc01hdGNoQ2FzZVxyXG4gICAgICAgICk7XHJcbiAgICAgIGNhc2UgJ1Byb3BlcnR5SXNOb3RFcXVhbFRvJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIubm90RXF1YWxUbyhcclxuICAgICAgICAgIHdmc1Byb3BlcnR5TmFtZSxcclxuICAgICAgICAgIHdmc0V4cHJlc3Npb24sXHJcbiAgICAgICAgICB3ZnNNYXRjaENhc2VcclxuICAgICAgICApO1xyXG4gICAgICBjYXNlICdXaXRoaW4nOlxyXG4gICAgICAgIHJldHVybiBvbGZpbHRlci53aXRoaW4od2ZzR2VvbWV0cnlOYW1lLCBnZW9tZXRyeSwgd2ZzU3JzTmFtZSk7XHJcbiAgICAgIC8vIExPR0lDQUxcclxuICAgICAgY2FzZSAnQW5kJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIuYW5kLmFwcGx5KG51bGwsIGxvZ2ljYWxBcnJheSk7XHJcbiAgICAgIGNhc2UgJ09yJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIub3IuYXBwbHkobnVsbCwgbG9naWNhbEFycmF5KTtcclxuICAgICAgY2FzZSAnTm90JzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIubm90LmFwcGx5KG51bGwsIGxvZ2ljYWxBcnJheSk7XHJcblxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGVmaW5lSW50ZXJmYWNlRmlsdGVyU2VxdWVuY2UoXHJcbiAgICBmaWx0ZXJPYmplY3Q6IGFueSxcclxuICAgIGdlb21ldHJ5TmFtZSxcclxuICAgIGxvZ2ljYWwgPSAnJyxcclxuICAgIGxldmVsID0gLTFcclxuICApOiBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zW10ge1xyXG4gICAgaWYgKGZpbHRlck9iamVjdCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgIGZpbHRlck9iamVjdC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgIHRoaXMuZmlsdGVyU2VxdWVuY2UuY29uY2F0KFxyXG4gICAgICAgICAgdGhpcy5kZWZpbmVJbnRlcmZhY2VGaWx0ZXJTZXF1ZW5jZShcclxuICAgICAgICAgICAgZWxlbWVudCxcclxuICAgICAgICAgICAgZ2VvbWV0cnlOYW1lLFxyXG4gICAgICAgICAgICBsb2dpY2FsLFxyXG4gICAgICAgICAgICBsZXZlbFxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGZpbHRlck9iamVjdC5oYXNPd25Qcm9wZXJ0eSgnbG9naWNhbCcpKSB7XHJcbiAgICAgICAgbGV2ZWwgPSBsZXZlbCArIDE7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJTZXF1ZW5jZS5jb25jYXQoXHJcbiAgICAgICAgICB0aGlzLmRlZmluZUludGVyZmFjZUZpbHRlclNlcXVlbmNlKFxyXG4gICAgICAgICAgICBmaWx0ZXJPYmplY3QuZmlsdGVycyxcclxuICAgICAgICAgICAgZ2VvbWV0cnlOYW1lLFxyXG4gICAgICAgICAgICBmaWx0ZXJPYmplY3QubG9naWNhbCxcclxuICAgICAgICAgICAgbGV2ZWxcclxuICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2UgaWYgKGZpbHRlck9iamVjdC5oYXNPd25Qcm9wZXJ0eSgnb3BlcmF0b3InKSkge1xyXG4gICAgICAgIHRoaXMuZmlsdGVyU2VxdWVuY2UucHVzaChcclxuICAgICAgICAgIHRoaXMuYWRkSW50ZXJmYWNlRmlsdGVyKGZpbHRlck9iamVjdCwgZ2VvbWV0cnlOYW1lLCBsZXZlbCwgbG9naWNhbClcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5maWx0ZXJTZXF1ZW5jZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRJbnRlcmZhY2VGaWx0ZXIoXHJcbiAgICBpZ29PZ2NGaWx0ZXJPYmplY3Q/LFxyXG4gICAgZ2VvbWV0cnlOYW1lPyxcclxuICAgIGxldmVsID0gMCxcclxuICAgIHBhcmVudExvZ2ljYWwgPSAnT3InXHJcbiAgKTogT2djSW50ZXJmYWNlRmlsdGVyT3B0aW9ucyB7XHJcbiAgICBpZiAoIWlnb09nY0ZpbHRlck9iamVjdCkge1xyXG4gICAgICBpZ29PZ2NGaWx0ZXJPYmplY3QgPSB7IG9wZXJhdG9yOiAnUHJvcGVydHlJc0VxdWFsVG8nIH07XHJcbiAgICB9XHJcbiAgICBjb25zdCBmID0ge1xyXG4gICAgICBwcm9wZXJ0eU5hbWU6ICcnLFxyXG4gICAgICBvcGVyYXRvcjogJycsXHJcbiAgICAgIGFjdGl2ZTogJycsXHJcbiAgICAgIGZpbHRlcmlkOiB1dWlkKCksXHJcbiAgICAgIGJlZ2luOiAnJyxcclxuICAgICAgZW5kOiAnJyxcclxuICAgICAgbG93ZXJCb3VuZGFyeTogJycsXHJcbiAgICAgIHVwcGVyQm91bmRhcnk6ICcnLFxyXG4gICAgICBleHByZXNzaW9uOiAnJyxcclxuICAgICAgcGF0dGVybjogJycsXHJcbiAgICAgIHdpbGRDYXJkOiAnKicsXHJcbiAgICAgIHNpbmdsZUNoYXI6ICcuJyxcclxuICAgICAgZXNjYXBlQ2hhcjogJyEnLFxyXG4gICAgICBtYXRjaENhc2U6IHRydWUsXHJcbiAgICAgIGlnb1NwYXRpYWxTZWxlY3RvcjogJycsXHJcbiAgICAgIGdlb21ldHJ5TmFtZTogJycsXHJcbiAgICAgIGdlb21ldHJ5OiAnJyxcclxuICAgICAgd2t0X2dlb21ldHJ5OiAnJyxcclxuICAgICAgZXh0ZW50OiAnJyxcclxuICAgICAgc3JzTmFtZTogJycsXHJcbiAgICAgIHBhcmVudExvZ2ljYWw6ICcnLFxyXG4gICAgICBsZXZlbDogMFxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihcclxuICAgICAgZixcclxuICAgICAge1xyXG4gICAgICAgIHBhcmVudExvZ2ljYWwsXHJcbiAgICAgICAgbGV2ZWwsXHJcbiAgICAgICAgZ2VvbWV0cnlOYW1lXHJcbiAgICAgIH0sXHJcbiAgICAgIGlnb09nY0ZpbHRlck9iamVjdFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjaGVja0lnb0ZpbHRlcnNQcm9wZXJ0aWVzKFxyXG4gICAgZmlsdGVyT2JqZWN0OiBhbnksXHJcbiAgICBmaWVsZE5hbWVHZW9tZXRyeSxcclxuICAgIGFjdGl2ZSA9IGZhbHNlXHJcbiAgKSB7XHJcbiAgICBjb25zdCBmaWx0ZXJBcnJheSA9IFtdO1xyXG4gICAgaWYgKGZpbHRlck9iamVjdCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgIGZpbHRlck9iamVjdC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgIGZpbHRlckFycmF5LnB1c2goXHJcbiAgICAgICAgICB0aGlzLmNoZWNrSWdvRmlsdGVyc1Byb3BlcnRpZXMoZWxlbWVudCwgZmllbGROYW1lR2VvbWV0cnksIGFjdGl2ZSlcclxuICAgICAgICApO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIGZpbHRlckFycmF5O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGZpbHRlck9iamVjdC5oYXNPd25Qcm9wZXJ0eSgnbG9naWNhbCcpKSB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAgICB7fSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbG9naWNhbDogZmlsdGVyT2JqZWN0LmxvZ2ljYWwsXHJcbiAgICAgICAgICAgIGZpbHRlcnM6IHRoaXMuY2hlY2tJZ29GaWx0ZXJzUHJvcGVydGllcyhcclxuICAgICAgICAgICAgICBmaWx0ZXJPYmplY3QuZmlsdGVycyxcclxuICAgICAgICAgICAgICBmaWVsZE5hbWVHZW9tZXRyeSxcclxuICAgICAgICAgICAgICBhY3RpdmVcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSBpZiAoZmlsdGVyT2JqZWN0Lmhhc093blByb3BlcnR5KCdvcGVyYXRvcicpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkRmlsdGVyUHJvcGVydGllcyhcclxuICAgICAgICAgIGZpbHRlck9iamVjdCBhcyBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zLFxyXG4gICAgICAgICAgZmllbGROYW1lR2VvbWV0cnksXHJcbiAgICAgICAgICBhY3RpdmVcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZEZpbHRlclByb3BlcnRpZXMoXHJcbiAgICBpZ29PZ2NGaWx0ZXJPYmplY3Q6IE9nY0ludGVyZmFjZUZpbHRlck9wdGlvbnMsXHJcbiAgICBmaWVsZE5hbWVHZW9tZXRyeSxcclxuICAgIGFjdGl2ZSA9IGZhbHNlXHJcbiAgKSB7XHJcbiAgICBjb25zdCBmaWx0ZXJpZCA9IGlnb09nY0ZpbHRlck9iamVjdC5oYXNPd25Qcm9wZXJ0eSgnZmlsdGVyaWQnKVxyXG4gICAgICA/IGlnb09nY0ZpbHRlck9iamVjdC5maWx0ZXJpZFxyXG4gICAgICA6IHV1aWQoKTtcclxuICAgIGNvbnN0IHN0YXR1cyA9IGlnb09nY0ZpbHRlck9iamVjdC5oYXNPd25Qcm9wZXJ0eSgnYWN0aXZlJylcclxuICAgICAgPyBpZ29PZ2NGaWx0ZXJPYmplY3QuYWN0aXZlXHJcbiAgICAgIDogYWN0aXZlO1xyXG5cclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKFxyXG4gICAgICB7fSxcclxuICAgICAge1xyXG4gICAgICAgIGZpbHRlcmlkLFxyXG4gICAgICAgIGFjdGl2ZTogc3RhdHVzLFxyXG4gICAgICAgIGlnb1NwYXRpYWxTZWxlY3RvcjogJ2ZpeGVkRXh0ZW50J1xyXG4gICAgICB9LFxyXG4gICAgICBpZ29PZ2NGaWx0ZXJPYmplY3QsXHJcbiAgICAgIHsgZ2VvbWV0cnlOYW1lOiBmaWVsZE5hbWVHZW9tZXRyeSB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlYnVpbHRJZ29PZ2NGaWx0ZXJPYmplY3RGcm9tU2VxdWVuY2UoXHJcbiAgICBzZXF1ZW5jZTogT2djSW50ZXJmYWNlRmlsdGVyT3B0aW9uc1tdXHJcbiAgKTogSWdvT2djRmlsdGVyT2JqZWN0IHtcclxuICAgIGlmIChzZXF1ZW5jZSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgIGlmIChzZXF1ZW5jZS5sZW5ndGggPj0gMSkge1xyXG4gICAgICAgIGxldCBsYXN0UGFyZW50TG9naWNhbCA9IHNlcXVlbmNlWzBdLnBhcmVudExvZ2ljYWw7XHJcbiAgICAgICAgbGV0IG5leHRFbGVtZW50OiBhbnk7XHJcbiAgICAgICAgbGV0IGxvZ2ljYWxBcnJheSA9IFtdO1xyXG4gICAgICAgIGxldCBsYXN0UHJvY2Vzc2VkRmlsdGVyO1xyXG4gICAgICAgIHNlcXVlbmNlLmZvckVhY2godWlGaWx0ZXIgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZWxlbWVudCA9IE9iamVjdC5hc3NpZ24oe30sIHVpRmlsdGVyKTtcclxuICAgICAgICAgIGNvbnN0IGluZGV4ID0gc2VxdWVuY2UuaW5kZXhPZih1aUZpbHRlcik7XHJcbiAgICAgICAgICBpZiAoaW5kZXggPj0gMCAmJiBpbmRleCA8IHNlcXVlbmNlLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBzZXF1ZW5jZVtpbmRleCArIDFdO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZGVsZXRlIGVsZW1lbnQuYWN0aXZlO1xyXG4gICAgICAgICAgZGVsZXRlIGVsZW1lbnQuZmlsdGVyaWQ7XHJcbiAgICAgICAgICBkZWxldGUgZWxlbWVudC5wYXJlbnRMb2dpY2FsO1xyXG4gICAgICAgICAgbG9naWNhbEFycmF5LnB1c2goZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgaWYgKHNlcXVlbmNlLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICBsYXN0UHJvY2Vzc2VkRmlsdGVyID0gZWxlbWVudDtcclxuICAgICAgICAgIH0gZWxzZSBpZiAobGFzdFBhcmVudExvZ2ljYWwgIT09IG5leHRFbGVtZW50LnBhcmVudExvZ2ljYWwpIHtcclxuICAgICAgICAgICAgaWYgKGxvZ2ljYWxBcnJheS5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgICdZb3UgbXVzdCBzZXQgYXQgJyArXHJcbiAgICAgICAgICAgICAgICAgICdsZWFzdCB0d28gb3BlcmF0b3IgaW4gYSBsb2dpY2FsICgnICtcclxuICAgICAgICAgICAgICAgICAgbGFzdFBhcmVudExvZ2ljYWwgK1xyXG4gICAgICAgICAgICAgICAgICAnKSdcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGxhc3RQcm9jZXNzZWRGaWx0ZXIgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgICAgICAgICAgICAge30sXHJcbiAgICAgICAgICAgICAgICB7IGxvZ2ljYWw6IGxhc3RQYXJlbnRMb2dpY2FsLCBmaWx0ZXJzOiBsb2dpY2FsQXJyYXkgfVxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgbG9naWNhbEFycmF5ID0gW2xhc3RQcm9jZXNzZWRGaWx0ZXJdO1xyXG4gICAgICAgICAgICAgIGxhc3RQYXJlbnRMb2dpY2FsID0gbmV4dEVsZW1lbnQucGFyZW50TG9naWNhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBsYXN0UHJvY2Vzc2VkRmlsdGVyO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGFuZGxlT2djRmlsdGVyc0FwcGxpZWRWYWx1ZShvcHRpb25zOiBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMsIGZpZWxkTmFtZUdlb21ldHJ5OiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IG9nY0ZpbHRlcnMgPSBvcHRpb25zLm9nY0ZpbHRlcnM7XHJcbiAgICBpZiAoIW9nY0ZpbHRlcnMpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbGV0IGZpbHRlclF1ZXJ5U3RyaW5nUHVzaEJ1dHRvbiA9ICcnO1xyXG4gICAgbGV0IGZpbHRlclF1ZXJ5U3RyaW5nQWR2YW5jZWRGaWx0ZXJzID0gJyc7XHJcbiAgICBpZiAob2djRmlsdGVycy5lbmFibGVkICYmIG9nY0ZpbHRlcnMucHVzaEJ1dHRvbnMpIHtcclxuICAgICAgY29uc3QgcHVzaEJ1dHRvbkJ1bmRsZSA9IG9nY0ZpbHRlcnMucHVzaEJ1dHRvbnM7XHJcbiAgICAgIGNvbnN0IGNvbmRpdGlvbnMgPSBbXTtcclxuICAgICAgcHVzaEJ1dHRvbkJ1bmRsZS5tYXAoYnV0dG9uQnVuZGxlID0+IHtcclxuICAgICAgICBjb25zdCBidW5kbGVDb25kaXRpb24gPSBbXTtcclxuICAgICAgICBidXR0b25CdW5kbGUub2djUHVzaEJ1dHRvbnNcclxuICAgICAgICAgIC5maWx0ZXIob2djcGIgPT4gb2djcGIuZW5hYmxlZCA9PT0gdHJ1ZSlcclxuICAgICAgICAgIC5mb3JFYWNoKGVuYWJsZWRQYiA9PiBidW5kbGVDb25kaXRpb24ucHVzaChlbmFibGVkUGIuZmlsdGVycykpO1xyXG4gICAgICAgIGlmIChidW5kbGVDb25kaXRpb24ubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICBjb25kaXRpb25zLnB1c2goYnVuZGxlQ29uZGl0aW9uWzBdKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGJ1bmRsZUNvbmRpdGlvbi5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICBjb25kaXRpb25zLnB1c2goeyBsb2dpY2FsOiBidXR0b25CdW5kbGUubG9naWNhbCwgZmlsdGVyczogYnVuZGxlQ29uZGl0aW9uIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGlmIChjb25kaXRpb25zLmxlbmd0aCA+PSAxKSB7XHJcbiAgICAgICAgZmlsdGVyUXVlcnlTdHJpbmdQdXNoQnV0dG9uID0gdGhpcy5idWlsZEZpbHRlcihcclxuICAgICAgICAgICAgY29uZGl0aW9ucy5sZW5ndGggPT09IDEgPyBjb25kaXRpb25zWzBdIDogeyBsb2dpY2FsOiAnQW5kJywgZmlsdGVyczogY29uZGl0aW9ucyB9XHJcbiAgICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9nY0ZpbHRlcnMuZW5hYmxlZCAmJiBvZ2NGaWx0ZXJzLmZpbHRlcnMpIHtcclxuICAgICAgb2djRmlsdGVycy5nZW9tZXRyeU5hbWUgPSBvZ2NGaWx0ZXJzLmdlb21ldHJ5TmFtZSB8fCBmaWVsZE5hbWVHZW9tZXRyeTtcclxuICAgICAgY29uc3QgaWdvRmlsdGVycyA9IG9nY0ZpbHRlcnMuZmlsdGVycztcclxuICAgICAgZmlsdGVyUXVlcnlTdHJpbmdBZHZhbmNlZEZpbHRlcnMgPSB0aGlzLmJ1aWxkRmlsdGVyKGlnb0ZpbHRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBmaWx0ZXJRdWVyeVN0cmluZyA9IG9nY0ZpbHRlcnMuYWR2YW5jZWRPZ2NGaWx0ZXJzID8gZmlsdGVyUXVlcnlTdHJpbmdBZHZhbmNlZEZpbHRlcnMgOiBmaWx0ZXJRdWVyeVN0cmluZ1B1c2hCdXR0b247XHJcbiAgICBpZiAob3B0aW9ucy50eXBlID09PSAnd21zJykge1xyXG4gICAgICBmaWx0ZXJRdWVyeVN0cmluZyA9IHRoaXMuZm9ybWF0UHJvY2Vzc2VkT2djRmlsdGVyKGZpbHRlclF1ZXJ5U3RyaW5nLCAob3B0aW9ucyBhcyBhbnkpLnBhcmFtcy5sYXllcnMpO1xyXG4gICAgfVxyXG4gICAgaWYgKG9wdGlvbnMudHlwZSA9PT0gJ3dmcycpIHtcclxuICAgICAgZmlsdGVyUXVlcnlTdHJpbmcgPSB0aGlzLmZvcm1hdFByb2Nlc3NlZE9nY0ZpbHRlcihmaWx0ZXJRdWVyeVN0cmluZywgKG9wdGlvbnMgYXMgYW55KS5wYXJhbXMuZmVhdHVyZVR5cGVzKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmlsdGVyUXVlcnlTdHJpbmc7XHJcblxyXG4gIH1cclxuXHJcbiAgcHVibGljIGZvcm1hdFByb2Nlc3NlZE9nY0ZpbHRlcihcclxuICAgIHByb2Nlc3NlZEZpbHRlcjogc3RyaW5nLFxyXG4gICAgbGF5ZXJzT3JUeXBlbmFtZXM6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBsZXQgYXBwbGllZEZpbHRlciA9ICcnO1xyXG4gICAgaWYgKHByb2Nlc3NlZEZpbHRlci5sZW5ndGggPT09IDAgJiYgbGF5ZXJzT3JUeXBlbmFtZXMuaW5kZXhPZignLCcpID09PSAtMSkge1xyXG4gICAgICBhcHBsaWVkRmlsdGVyID0gcHJvY2Vzc2VkRmlsdGVyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGF5ZXJzT3JUeXBlbmFtZXMuc3BsaXQoJywnKS5mb3JFYWNoKGxheWVyT3JUeXBlbmFtZXMgPT4ge1xyXG4gICAgICAgIGFwcGxpZWRGaWx0ZXIgPSBgJHthcHBsaWVkRmlsdGVyfSgke3Byb2Nlc3NlZEZpbHRlci5yZXBsYWNlKCdmaWx0ZXI9JywgJycpfSlgO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGNvbnN0IGZpbHRlclZhbHVlID0gYXBwbGllZEZpbHRlci5sZW5ndGggPiAwID8gYXBwbGllZEZpbHRlci5yZXBsYWNlKCdmaWx0ZXI9JywgJycpIDogdW5kZWZpbmVkO1xyXG4gICAgcmV0dXJuIGZpbHRlclZhbHVlO1xyXG4gIH1cclxufVxyXG4iXX0=