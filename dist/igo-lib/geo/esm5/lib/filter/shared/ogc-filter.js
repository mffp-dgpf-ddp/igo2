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
            PropertyIsGreaterThanOrEqualTo: {
                spatial: false,
                fieldRestrict: ['number']
            },
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
     * @param {?} filters
     * @param {?=} extent
     * @param {?=} proj
     * @param {?=} fieldNameGeometry
     * @return {?}
     */
    OgcFilterWriter.prototype.buildFilter = /**
     * @param {?} filters
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
        if (igoOgcFilterObject === void 0) { igoOgcFilterObject = { operator: 'PropertyIsEqualTo' }; }
        if (level === void 0) { level = 0; }
        if (parentLogical === void 0) { parentLogical = 'Or'; }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXIvc2hhcmVkL29nYy1maWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxRQUFRLE1BQU0sa0JBQWtCLENBQUM7QUFDN0MsT0FBTyxXQUFXLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sV0FBVyxNQUFNLGVBQWUsQ0FBQztBQUd4QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBVW5DO0lBQUE7UUFDVSxtQkFBYyxHQUFnQyxFQUFFLENBQUM7UUFDbEQsY0FBUyxHQUFHO1lBQ2pCLGlCQUFpQixFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFO1lBQ3hELG9CQUFvQixFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFO1lBQzNELGNBQWMsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDN0QscUJBQXFCLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3BFLDhCQUE4QixFQUFFO2dCQUM5QixPQUFPLEVBQUUsS0FBSztnQkFDZCxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUM7YUFDMUI7WUFDRCxrQkFBa0IsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDakUsMkJBQTJCLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzFFLGlCQUFpQixFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZ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dEIsT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDO29CQUN4QixPQUFPLE9BQU8sQ0FBQyxhQUFhLENBQUM7b0JBQzdCLGNBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBRTNCLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7d0JBQ3pCLHFCQUFtQixHQUFHLE9BQU8sQ0FBQztxQkFDL0I7eUJBQU0sSUFBSSxtQkFBaUIsS0FBSyxhQUFXLENBQUMsYUFBYSxFQUFFO3dCQUMxRCxJQUFJLGNBQVksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFOzRCQUM3QixPQUFPLENBQUMsR0FBRyxDQUNULGtCQUFrQjtnQ0FDaEIsbUNBQW1DO2dDQUNuQyxtQkFBaUI7Z0NBQ2pCLEdBQUcsQ0FDTixDQUFDO3lCQUNIOzZCQUFNOzRCQUNMLHFCQUFtQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQ2pDLEVBQUUsRUFDRixFQUFFLE9BQU8sRUFBRSxtQkFBaUIsRUFBRSxPQUFPLEVBQUUsY0FBWSxFQUFFLENBQ3RELENBQUM7NEJBQ0YsY0FBWSxHQUFHLENBQUMscUJBQW1CLENBQUMsQ0FBQzs0QkFDckMsbUJBQWlCLEdBQUcsYUFBVyxDQUFDLGFBQWEsQ0FBQzt5QkFDL0M7cUJBQ0Y7Z0JBQ0gsQ0FBQyxFQUFDLENBQUM7Z0JBQ0gsT0FBTyxxQkFBbUIsQ0FBQzthQUM1QjtpQkFBTTtnQkFDTCxPQUFPLFNBQVMsQ0FBQzthQUNsQjtTQUNGO2FBQU07WUFDTCxPQUFPLFNBQVMsQ0FBQztTQUNsQjtJQUNILENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFsWUQsSUFrWUM7Ozs7Ozs7SUFqWUMseUNBQXlEOztJQUN6RCxvQ0FpQkUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBvbGZpbHRlciBmcm9tICdvbC9mb3JtYXQvZmlsdGVyJztcclxuaW1wb3J0IG9sRm9ybWF0V0tUIGZyb20gJ29sL2Zvcm1hdC9XS1QnO1xyXG5pbXBvcnQgb2xGb3JtYXRXRlMgZnJvbSAnb2wvZm9ybWF0L1dGUyc7XHJcbmltcG9ydCBvbEdlb21ldHJ5IGZyb20gJ29sL2dlb20vR2VvbWV0cnknO1xyXG5cclxuaW1wb3J0IHsgdXVpZCB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgT2djRmlsdGVyLFxyXG4gIElnb09nY0ZpbHRlck9iamVjdCxcclxuICBXRlNXcml0ZUdldEZlYXR1cmVPcHRpb25zLFxyXG4gIEFueUJhc2VPZ2NGaWx0ZXJPcHRpb25zLFxyXG4gIE9nY0ludGVyZmFjZUZpbHRlck9wdGlvbnNcclxufSBmcm9tICcuL29nYy1maWx0ZXIuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBPZ2NGaWx0ZXJXcml0ZXIge1xyXG4gIHByaXZhdGUgZmlsdGVyU2VxdWVuY2U6IE9nY0ludGVyZmFjZUZpbHRlck9wdGlvbnNbXSA9IFtdO1xyXG4gIHB1YmxpYyBvcGVyYXRvcnMgPSB7XHJcbiAgICBQcm9wZXJ0eUlzRXF1YWxUbzogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogW10gfSxcclxuICAgIFByb3BlcnR5SXNOb3RFcXVhbFRvOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbXSB9LFxyXG4gICAgUHJvcGVydHlJc0xpa2U6IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFsnc3RyaW5nJ10gfSxcclxuICAgIFByb3BlcnR5SXNHcmVhdGVyVGhhbjogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogWydudW1iZXInXSB9LFxyXG4gICAgUHJvcGVydHlJc0dyZWF0ZXJUaGFuT3JFcXVhbFRvOiB7XHJcbiAgICAgIHNwYXRpYWw6IGZhbHNlLFxyXG4gICAgICBmaWVsZFJlc3RyaWN0OiBbJ251bWJlciddXHJcbiAgICB9LFxyXG4gICAgUHJvcGVydHlJc0xlc3NUaGFuOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbJ251bWJlciddIH0sXHJcbiAgICBQcm9wZXJ0eUlzTGVzc1RoYW5PckVxdWFsVG86IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFsnbnVtYmVyJ10gfSxcclxuICAgIFByb3BlcnR5SXNCZXR3ZWVuOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbJ251bWJlciddIH0sXHJcbiAgICBEdXJpbmc6IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFtdIH0sXHJcbiAgICBQcm9wZXJ0eUlzTnVsbDogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogW10gfSxcclxuICAgIEludGVyc2VjdHM6IHsgc3BhdGlhbDogdHJ1ZSwgZmllbGRSZXN0cmljdDogW10gfSxcclxuICAgIFdpdGhpbjogeyBzcGF0aWFsOiB0cnVlLCBmaWVsZFJlc3RyaWN0OiBbXSB9LFxyXG4gICAgQ29udGFpbnM6IHsgc3BhdGlhbDogdHJ1ZSwgZmllbGRSZXN0cmljdDogW10gfVxyXG4gIH07XHJcblxyXG4gIHB1YmxpYyBidWlsZEZpbHRlcihcclxuICAgIGZpbHRlcnM6IElnb09nY0ZpbHRlck9iamVjdCxcclxuICAgIGV4dGVudD86IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdLFxyXG4gICAgcHJvaj8sXHJcbiAgICBmaWVsZE5hbWVHZW9tZXRyeT86IHN0cmluZ1xyXG4gICk6IHN0cmluZyB7XHJcbiAgICBsZXQgb3VyQmJveEZpbHRlcjtcclxuICAgIGxldCBlbmFibGVCYm94OiBib29sZWFuO1xyXG4gICAgaWYgKC9pbnRlcnNlY3RzfGNvbnRhaW5zfHdpdGhpbi9naS50ZXN0KEpTT04uc3RyaW5naWZ5KGZpbHRlcnMpKSkge1xyXG4gICAgICBlbmFibGVCYm94ID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlbmFibGVCYm94ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChmaWx0ZXJzKSB7XHJcbiAgICAgIGZpZWxkTmFtZUdlb21ldHJ5ID1cclxuICAgICAgICAoZmlsdGVycyBhcyBhbnkpLmdlb21ldHJ5TmFtZSAhPT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICA/IChmaWx0ZXJzIGFzIGFueSkuZ2VvbWV0cnlOYW1lXHJcbiAgICAgICAgICA6IGZpZWxkTmFtZUdlb21ldHJ5O1xyXG4gICAgfVxyXG4gICAgaWYgKGV4dGVudCAmJiBmaWx0ZXJzKSB7XHJcbiAgICAgIG91ckJib3hGaWx0ZXIgPSBvbGZpbHRlci5iYm94KGZpZWxkTmFtZUdlb21ldHJ5LCBleHRlbnQsIHByb2ouZ2V0Q29kZSgpKTtcclxuICAgIH1cclxuICAgIGxldCBmaWx0ZXJBc3NlbWJseTogT2djRmlsdGVyO1xyXG4gICAgaWYgKGZpbHRlcnMpIHtcclxuICAgICAgZmlsdGVycyA9IHRoaXMuY2hlY2tJZ29GaWx0ZXJzUHJvcGVydGllcyhmaWx0ZXJzLCBmaWVsZE5hbWVHZW9tZXRyeSk7XHJcbiAgICAgIGlmIChleHRlbnQgJiYgZW5hYmxlQmJveCkge1xyXG4gICAgICAgIGZpbHRlckFzc2VtYmx5ID0gb2xmaWx0ZXIuYW5kKFxyXG4gICAgICAgICAgb3VyQmJveEZpbHRlcixcclxuICAgICAgICAgIHRoaXMuYnVuZGxlRmlsdGVyKGZpbHRlcnMpXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmaWx0ZXJBc3NlbWJseSA9IHRoaXMuYnVuZGxlRmlsdGVyKGZpbHRlcnMpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gJ2Jib3g9JyArIGV4dGVudC5qb2luKCcsJykgKyAnLCcgKyBwcm9qLmdldENvZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB3ZnNPcHRpb25zOiBXRlNXcml0ZUdldEZlYXR1cmVPcHRpb25zID0ge1xyXG4gICAgICBzcnNOYW1lOiAnJyxcclxuICAgICAgZmVhdHVyZU5TOiAnJyxcclxuICAgICAgZmVhdHVyZVByZWZpeDogJycsXHJcbiAgICAgIGZlYXR1cmVUeXBlczogWydmZWF0dXJlVHlwZXMnXSxcclxuICAgICAgZmlsdGVyOiBmaWx0ZXJBc3NlbWJseSxcclxuICAgICAgb3V0cHV0Rm9ybWF0OiAnJyxcclxuICAgICAgZ2VvbWV0cnlOYW1lOiBmaWVsZE5hbWVHZW9tZXRyeVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBxdWVyeSA9IG5ldyBvbEZvcm1hdFdGUygpLndyaXRlR2V0RmVhdHVyZSh3ZnNPcHRpb25zKTtcclxuICAgIGNvbnN0IHN0ciA9IG5ldyBYTUxTZXJpYWxpemVyKCkuc2VyaWFsaXplVG9TdHJpbmcocXVlcnkpO1xyXG4gICAgY29uc3QgcmVnZXhwMSA9IC90eXBlbmFtZXMgKj18dHlwZW5hbWUgKj1cXFwiZmVhdHVyZVR5cGVzXFxcIiAqPi9naTtcclxuICAgIGNvbnN0IHJlZ2V4cDIgPSAvPFxcL1F1ZXJ5PjxcXC9HZXRGZWF0dXJlPi9naTtcclxuXHJcbiAgICByZXR1cm4gJ2ZpbHRlcj0nICsgc3RyLnNwbGl0KHJlZ2V4cDEpWzFdLnNwbGl0KHJlZ2V4cDIpWzBdO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBidW5kbGVGaWx0ZXIoZmlsdGVyT2JqZWN0OiBhbnkpIHtcclxuICAgIGlmIChmaWx0ZXJPYmplY3QgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICBjb25zdCBsb2dpY2FsQXJyYXkgPSBbXTtcclxuICAgICAgZmlsdGVyT2JqZWN0LmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgbG9naWNhbEFycmF5LnB1c2godGhpcy5idW5kbGVGaWx0ZXIoZWxlbWVudCkpO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIGxvZ2ljYWxBcnJheTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChmaWx0ZXJPYmplY3QuaGFzT3duUHJvcGVydHkoJ2xvZ2ljYWwnKSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUZpbHRlcih7XHJcbiAgICAgICAgICBvcGVyYXRvcjogZmlsdGVyT2JqZWN0LmxvZ2ljYWwsXHJcbiAgICAgICAgICBsb2dpY2FsQXJyYXk6IHRoaXMuYnVuZGxlRmlsdGVyKGZpbHRlck9iamVjdC5maWx0ZXJzKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2UgaWYgKGZpbHRlck9iamVjdC5oYXNPd25Qcm9wZXJ0eSgnb3BlcmF0b3InKSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUZpbHRlcihmaWx0ZXJPYmplY3QgYXMgQW55QmFzZU9nY0ZpbHRlck9wdGlvbnMpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUZpbHRlcihmaWx0ZXJPcHRpb25zKTogT2djRmlsdGVyIHtcclxuICAgIGNvbnN0IG9wZXJhdG9yID0gZmlsdGVyT3B0aW9ucy5vcGVyYXRvcjtcclxuICAgIGNvbnN0IGxvZ2ljYWxBcnJheSA9IGZpbHRlck9wdGlvbnMubG9naWNhbEFycmF5O1xyXG5cclxuICAgIGNvbnN0IHdmc1Byb3BlcnR5TmFtZSA9IGZpbHRlck9wdGlvbnMucHJvcGVydHlOYW1lO1xyXG4gICAgY29uc3Qgd2ZzUGF0dGVybiA9IGZpbHRlck9wdGlvbnMucGF0dGVybjtcclxuICAgIGNvbnN0IHdmc01hdGNoQ2FzZSA9IGZpbHRlck9wdGlvbnMubWF0Y2hDYXNlXHJcbiAgICAgID8gZmlsdGVyT3B0aW9ucy5tYXRjaENhc2VcclxuICAgICAgOiB0cnVlO1xyXG4gICAgY29uc3Qgd2ZzV2lsZENhcmQgPSBmaWx0ZXJPcHRpb25zLndpbGRDYXJkID8gZmlsdGVyT3B0aW9ucy53aWxkQ2FyZCA6ICcqJztcclxuICAgIGNvbnN0IHdmc1NpbmdsZUNoYXIgPSBmaWx0ZXJPcHRpb25zLnNpbmdsZUNoYXJcclxuICAgICAgPyBmaWx0ZXJPcHRpb25zLnNpbmdsZUNoYXJcclxuICAgICAgOiAnLic7XHJcbiAgICBjb25zdCB3ZnNFc2NhcGVDaGFyID0gZmlsdGVyT3B0aW9ucy5lc2NhcGVDaGFyXHJcbiAgICAgID8gZmlsdGVyT3B0aW9ucy5lc2NhcGVDaGFyXHJcbiAgICAgIDogJyEnO1xyXG5cclxuICAgIGNvbnN0IHdmc0xvd2VyQm91bmRhcnkgPSBmaWx0ZXJPcHRpb25zLmxvd2VyQm91bmRhcnk7XHJcbiAgICBjb25zdCB3ZnNVcHBlckJvdW5kYXJ5ID0gZmlsdGVyT3B0aW9ucy51cHBlckJvdW5kYXJ5O1xyXG5cclxuICAgIGNvbnN0IHdmc0dlb21ldHJ5TmFtZSA9IGZpbHRlck9wdGlvbnMuZ2VvbWV0cnlOYW1lO1xyXG4gICAgY29uc3Qgd2ZzRXh0ZW50ID0gZmlsdGVyT3B0aW9ucy5leHRlbnQ7XHJcbiAgICBjb25zdCB3ZnNXa3RHZW9tZXRyeSA9IGZpbHRlck9wdGlvbnMud2t0X2dlb21ldHJ5O1xyXG4gICAgY29uc3Qgd2ZzU3JzTmFtZSA9IGZpbHRlck9wdGlvbnMuc3JzTmFtZVxyXG4gICAgICA/IGZpbHRlck9wdGlvbnMuc3JzTmFtZVxyXG4gICAgICA6ICdFUFNHOjM4NTcnO1xyXG5cclxuICAgIGNvbnN0IHdmc0JlZ2luID0gZmlsdGVyT3B0aW9ucy5iZWdpbjtcclxuICAgIGNvbnN0IHdmc0VuZCA9IGZpbHRlck9wdGlvbnMuZW5kO1xyXG5cclxuICAgIGNvbnN0IHdmc0V4cHJlc3Npb24gPSBmaWx0ZXJPcHRpb25zLmV4cHJlc3Npb247XHJcblxyXG4gICAgbGV0IGdlb21ldHJ5OiBvbEdlb21ldHJ5O1xyXG4gICAgaWYgKHdmc1drdEdlb21ldHJ5KSB7XHJcbiAgICAgIGNvbnN0IHdrdCA9IG5ldyBvbEZvcm1hdFdLVCgpO1xyXG4gICAgICBnZW9tZXRyeSA9IHdrdC5yZWFkR2VvbWV0cnkod2ZzV2t0R2VvbWV0cnksIHtcclxuICAgICAgICBkYXRhUHJvamVjdGlvbjogd2ZzU3JzTmFtZSxcclxuICAgICAgICBmZWF0dXJlUHJvamVjdGlvbjogJ0VQU0c6Mzg1NydcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoIChvcGVyYXRvcikge1xyXG4gICAgICBjYXNlICdCQk9YJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIuYmJveCh3ZnNHZW9tZXRyeU5hbWUsIHdmc0V4dGVudCwgd2ZzU3JzTmFtZSk7XHJcbiAgICAgIGNhc2UgJ1Byb3BlcnR5SXNCZXR3ZWVuJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIuYmV0d2VlbihcclxuICAgICAgICAgIHdmc1Byb3BlcnR5TmFtZSxcclxuICAgICAgICAgIHdmc0xvd2VyQm91bmRhcnksXHJcbiAgICAgICAgICB3ZnNVcHBlckJvdW5kYXJ5XHJcbiAgICAgICAgKTtcclxuICAgICAgY2FzZSAnQ29udGFpbnMnOlxyXG4gICAgICAgIHJldHVybiBvbGZpbHRlci5jb250YWlucyh3ZnNHZW9tZXRyeU5hbWUsIGdlb21ldHJ5LCB3ZnNTcnNOYW1lKTtcclxuICAgICAgY2FzZSAnRHVyaW5nJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIuZHVyaW5nKHdmc1Byb3BlcnR5TmFtZSwgd2ZzQmVnaW4sIHdmc0VuZCk7XHJcbiAgICAgIGNhc2UgJ1Byb3BlcnR5SXNFcXVhbFRvJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIuZXF1YWxUbyhcclxuICAgICAgICAgIHdmc1Byb3BlcnR5TmFtZSxcclxuICAgICAgICAgIHdmc0V4cHJlc3Npb24sXHJcbiAgICAgICAgICB3ZnNNYXRjaENhc2VcclxuICAgICAgICApO1xyXG4gICAgICBjYXNlICdQcm9wZXJ0eUlzR3JlYXRlclRoYW4nOlxyXG4gICAgICAgIHJldHVybiBvbGZpbHRlci5ncmVhdGVyVGhhbih3ZnNQcm9wZXJ0eU5hbWUsIHdmc0V4cHJlc3Npb24pO1xyXG4gICAgICBjYXNlICdQcm9wZXJ0eUlzR3JlYXRlclRoYW5PckVxdWFsVG8nOlxyXG4gICAgICAgIHJldHVybiBvbGZpbHRlci5ncmVhdGVyVGhhbk9yRXF1YWxUbyh3ZnNQcm9wZXJ0eU5hbWUsIHdmc0V4cHJlc3Npb24pO1xyXG4gICAgICBjYXNlICdJbnRlcnNlY3RzJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIuaW50ZXJzZWN0cyh3ZnNHZW9tZXRyeU5hbWUsIGdlb21ldHJ5LCB3ZnNTcnNOYW1lKTtcclxuICAgICAgY2FzZSAnUHJvcGVydHlJc051bGwnOlxyXG4gICAgICAgIHJldHVybiBvbGZpbHRlci5pc051bGwod2ZzUHJvcGVydHlOYW1lKTtcclxuICAgICAgY2FzZSAnUHJvcGVydHlJc0xlc3NUaGFuJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIubGVzc1RoYW4od2ZzUHJvcGVydHlOYW1lLCB3ZnNFeHByZXNzaW9uKTtcclxuICAgICAgY2FzZSAnUHJvcGVydHlJc0xlc3NUaGFuT3JFcXVhbFRvJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIubGVzc1RoYW5PckVxdWFsVG8od2ZzUHJvcGVydHlOYW1lLCB3ZnNFeHByZXNzaW9uKTtcclxuICAgICAgY2FzZSAnUHJvcGVydHlJc0xpa2UnOlxyXG4gICAgICAgIHJldHVybiBvbGZpbHRlci5saWtlKFxyXG4gICAgICAgICAgd2ZzUHJvcGVydHlOYW1lLFxyXG4gICAgICAgICAgd2ZzUGF0dGVybi5yZXBsYWNlKC9bKClfXS9naSwgd2ZzU2luZ2xlQ2hhciksXHJcbiAgICAgICAgICB3ZnNXaWxkQ2FyZCxcclxuICAgICAgICAgIHdmc1NpbmdsZUNoYXIsXHJcbiAgICAgICAgICB3ZnNFc2NhcGVDaGFyLFxyXG4gICAgICAgICAgd2ZzTWF0Y2hDYXNlXHJcbiAgICAgICAgKTtcclxuICAgICAgY2FzZSAnUHJvcGVydHlJc05vdEVxdWFsVG8nOlxyXG4gICAgICAgIHJldHVybiBvbGZpbHRlci5ub3RFcXVhbFRvKFxyXG4gICAgICAgICAgd2ZzUHJvcGVydHlOYW1lLFxyXG4gICAgICAgICAgd2ZzRXhwcmVzc2lvbixcclxuICAgICAgICAgIHdmc01hdGNoQ2FzZVxyXG4gICAgICAgICk7XHJcbiAgICAgIGNhc2UgJ1dpdGhpbic6XHJcbiAgICAgICAgcmV0dXJuIG9sZmlsdGVyLndpdGhpbih3ZnNHZW9tZXRyeU5hbWUsIGdlb21ldHJ5LCB3ZnNTcnNOYW1lKTtcclxuICAgICAgLy8gTE9HSUNBTFxyXG4gICAgICBjYXNlICdBbmQnOlxyXG4gICAgICAgIHJldHVybiBvbGZpbHRlci5hbmQuYXBwbHkobnVsbCwgbG9naWNhbEFycmF5KTtcclxuICAgICAgY2FzZSAnT3InOlxyXG4gICAgICAgIHJldHVybiBvbGZpbHRlci5vci5hcHBseShudWxsLCBsb2dpY2FsQXJyYXkpO1xyXG4gICAgICBjYXNlICdOb3QnOlxyXG4gICAgICAgIHJldHVybiBvbGZpbHRlci5ub3QuYXBwbHkobnVsbCwgbG9naWNhbEFycmF5KTtcclxuXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBkZWZpbmVJbnRlcmZhY2VGaWx0ZXJTZXF1ZW5jZShcclxuICAgIGZpbHRlck9iamVjdDogYW55LFxyXG4gICAgZ2VvbWV0cnlOYW1lLFxyXG4gICAgbG9naWNhbCA9ICcnLFxyXG4gICAgbGV2ZWwgPSAtMVxyXG4gICk6IE9nY0ludGVyZmFjZUZpbHRlck9wdGlvbnNbXSB7XHJcbiAgICBpZiAoZmlsdGVyT2JqZWN0IGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgZmlsdGVyT2JqZWN0LmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJTZXF1ZW5jZS5jb25jYXQoXHJcbiAgICAgICAgICB0aGlzLmRlZmluZUludGVyZmFjZUZpbHRlclNlcXVlbmNlKFxyXG4gICAgICAgICAgICBlbGVtZW50LFxyXG4gICAgICAgICAgICBnZW9tZXRyeU5hbWUsXHJcbiAgICAgICAgICAgIGxvZ2ljYWwsXHJcbiAgICAgICAgICAgIGxldmVsXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoZmlsdGVyT2JqZWN0Lmhhc093blByb3BlcnR5KCdsb2dpY2FsJykpIHtcclxuICAgICAgICBsZXZlbCA9IGxldmVsICsgMTtcclxuICAgICAgICB0aGlzLmZpbHRlclNlcXVlbmNlLmNvbmNhdChcclxuICAgICAgICAgIHRoaXMuZGVmaW5lSW50ZXJmYWNlRmlsdGVyU2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGZpbHRlck9iamVjdC5maWx0ZXJzLFxyXG4gICAgICAgICAgICBnZW9tZXRyeU5hbWUsXHJcbiAgICAgICAgICAgIGZpbHRlck9iamVjdC5sb2dpY2FsLFxyXG4gICAgICAgICAgICBsZXZlbFxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSBpZiAoZmlsdGVyT2JqZWN0Lmhhc093blByb3BlcnR5KCdvcGVyYXRvcicpKSB7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJTZXF1ZW5jZS5wdXNoKFxyXG4gICAgICAgICAgdGhpcy5hZGRJbnRlcmZhY2VGaWx0ZXIoZmlsdGVyT2JqZWN0LCBnZW9tZXRyeU5hbWUsIGxldmVsLCBsb2dpY2FsKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmZpbHRlclNlcXVlbmNlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZEludGVyZmFjZUZpbHRlcihcclxuICAgIGlnb09nY0ZpbHRlck9iamVjdCA9IHsgb3BlcmF0b3I6ICdQcm9wZXJ0eUlzRXF1YWxUbycgfSxcclxuICAgIGdlb21ldHJ5TmFtZT8sXHJcbiAgICBsZXZlbCA9IDAsXHJcbiAgICBwYXJlbnRMb2dpY2FsID0gJ09yJ1xyXG4gICk6IE9nY0ludGVyZmFjZUZpbHRlck9wdGlvbnMge1xyXG4gICAgY29uc3QgZiA9IHtcclxuICAgICAgcHJvcGVydHlOYW1lOiAnJyxcclxuICAgICAgb3BlcmF0b3I6ICcnLFxyXG4gICAgICBhY3RpdmU6ICcnLFxyXG4gICAgICBmaWx0ZXJpZDogdXVpZCgpLFxyXG4gICAgICBiZWdpbjogJycsXHJcbiAgICAgIGVuZDogJycsXHJcbiAgICAgIGxvd2VyQm91bmRhcnk6ICcnLFxyXG4gICAgICB1cHBlckJvdW5kYXJ5OiAnJyxcclxuICAgICAgZXhwcmVzc2lvbjogJycsXHJcbiAgICAgIHBhdHRlcm46ICcnLFxyXG4gICAgICB3aWxkQ2FyZDogJyonLFxyXG4gICAgICBzaW5nbGVDaGFyOiAnLicsXHJcbiAgICAgIGVzY2FwZUNoYXI6ICchJyxcclxuICAgICAgbWF0Y2hDYXNlOiB0cnVlLFxyXG4gICAgICBpZ29TcGF0aWFsU2VsZWN0b3I6ICcnLFxyXG4gICAgICBnZW9tZXRyeU5hbWU6ICcnLFxyXG4gICAgICBnZW9tZXRyeTogJycsXHJcbiAgICAgIHdrdF9nZW9tZXRyeTogJycsXHJcbiAgICAgIGV4dGVudDogJycsXHJcbiAgICAgIHNyc05hbWU6ICcnLFxyXG4gICAgICBwYXJlbnRMb2dpY2FsOiAnJyxcclxuICAgICAgbGV2ZWw6IDBcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXHJcbiAgICAgIGYsXHJcbiAgICAgIHtcclxuICAgICAgICBwYXJlbnRMb2dpY2FsLFxyXG4gICAgICAgIGxldmVsLFxyXG4gICAgICAgIGdlb21ldHJ5TmFtZVxyXG4gICAgICB9LFxyXG4gICAgICBpZ29PZ2NGaWx0ZXJPYmplY3RcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2hlY2tJZ29GaWx0ZXJzUHJvcGVydGllcyhcclxuICAgIGZpbHRlck9iamVjdDogYW55LFxyXG4gICAgZmllbGROYW1lR2VvbWV0cnksXHJcbiAgICBhY3RpdmUgPSBmYWxzZVxyXG4gICkge1xyXG4gICAgY29uc3QgZmlsdGVyQXJyYXkgPSBbXTtcclxuICAgIGlmIChmaWx0ZXJPYmplY3QgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICBmaWx0ZXJPYmplY3QuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICBmaWx0ZXJBcnJheS5wdXNoKFxyXG4gICAgICAgICAgdGhpcy5jaGVja0lnb0ZpbHRlcnNQcm9wZXJ0aWVzKGVsZW1lbnQsIGZpZWxkTmFtZUdlb21ldHJ5LCBhY3RpdmUpXHJcbiAgICAgICAgKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBmaWx0ZXJBcnJheTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChmaWx0ZXJPYmplY3QuaGFzT3duUHJvcGVydHkoJ2xvZ2ljYWwnKSkge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKFxyXG4gICAgICAgICAge30sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxvZ2ljYWw6IGZpbHRlck9iamVjdC5sb2dpY2FsLFxyXG4gICAgICAgICAgICBmaWx0ZXJzOiB0aGlzLmNoZWNrSWdvRmlsdGVyc1Byb3BlcnRpZXMoXHJcbiAgICAgICAgICAgICAgZmlsdGVyT2JqZWN0LmZpbHRlcnMsXHJcbiAgICAgICAgICAgICAgZmllbGROYW1lR2VvbWV0cnksXHJcbiAgICAgICAgICAgICAgYWN0aXZlXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2UgaWYgKGZpbHRlck9iamVjdC5oYXNPd25Qcm9wZXJ0eSgnb3BlcmF0b3InKSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFkZEZpbHRlclByb3BlcnRpZXMoXHJcbiAgICAgICAgICBmaWx0ZXJPYmplY3QgYXMgT2djSW50ZXJmYWNlRmlsdGVyT3B0aW9ucyxcclxuICAgICAgICAgIGZpZWxkTmFtZUdlb21ldHJ5LFxyXG4gICAgICAgICAgYWN0aXZlXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRGaWx0ZXJQcm9wZXJ0aWVzKFxyXG4gICAgaWdvT2djRmlsdGVyT2JqZWN0OiBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zLFxyXG4gICAgZmllbGROYW1lR2VvbWV0cnksXHJcbiAgICBhY3RpdmUgPSBmYWxzZVxyXG4gICkge1xyXG4gICAgY29uc3QgZmlsdGVyaWQgPSBpZ29PZ2NGaWx0ZXJPYmplY3QuaGFzT3duUHJvcGVydHkoJ2ZpbHRlcmlkJylcclxuICAgICAgPyBpZ29PZ2NGaWx0ZXJPYmplY3QuZmlsdGVyaWRcclxuICAgICAgOiB1dWlkKCk7XHJcbiAgICBjb25zdCBzdGF0dXMgPSBpZ29PZ2NGaWx0ZXJPYmplY3QuaGFzT3duUHJvcGVydHkoJ2FjdGl2ZScpXHJcbiAgICAgID8gaWdvT2djRmlsdGVyT2JqZWN0LmFjdGl2ZVxyXG4gICAgICA6IGFjdGl2ZTtcclxuXHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihcclxuICAgICAge30sXHJcbiAgICAgIHtcclxuICAgICAgICBmaWx0ZXJpZCxcclxuICAgICAgICBhY3RpdmU6IHN0YXR1cyxcclxuICAgICAgICBpZ29TcGF0aWFsU2VsZWN0b3I6ICdmaXhlZEV4dGVudCdcclxuICAgICAgfSxcclxuICAgICAgaWdvT2djRmlsdGVyT2JqZWN0LFxyXG4gICAgICB7IGdlb21ldHJ5TmFtZTogZmllbGROYW1lR2VvbWV0cnkgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWJ1aWx0SWdvT2djRmlsdGVyT2JqZWN0RnJvbVNlcXVlbmNlKFxyXG4gICAgc2VxdWVuY2U6IE9nY0ludGVyZmFjZUZpbHRlck9wdGlvbnNbXVxyXG4gICk6IElnb09nY0ZpbHRlck9iamVjdCB7XHJcbiAgICBpZiAoc2VxdWVuY2UgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICBpZiAoc2VxdWVuY2UubGVuZ3RoID49IDEpIHtcclxuICAgICAgICBsZXQgbGFzdFBhcmVudExvZ2ljYWwgPSBzZXF1ZW5jZVswXS5wYXJlbnRMb2dpY2FsO1xyXG4gICAgICAgIGxldCBuZXh0RWxlbWVudDogYW55O1xyXG4gICAgICAgIGxldCBsb2dpY2FsQXJyYXkgPSBbXTtcclxuICAgICAgICBsZXQgbGFzdFByb2Nlc3NlZEZpbHRlcjtcclxuICAgICAgICBzZXF1ZW5jZS5mb3JFYWNoKHVpRmlsdGVyID0+IHtcclxuICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBPYmplY3QuYXNzaWduKHt9LCB1aUZpbHRlcik7XHJcbiAgICAgICAgICBjb25zdCBpbmRleCA9IHNlcXVlbmNlLmluZGV4T2YodWlGaWx0ZXIpO1xyXG4gICAgICAgICAgaWYgKGluZGV4ID49IDAgJiYgaW5kZXggPCBzZXF1ZW5jZS5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIG5leHRFbGVtZW50ID0gc2VxdWVuY2VbaW5kZXggKyAxXTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5leHRFbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGRlbGV0ZSBlbGVtZW50LmFjdGl2ZTtcclxuICAgICAgICAgIGRlbGV0ZSBlbGVtZW50LmZpbHRlcmlkO1xyXG4gICAgICAgICAgZGVsZXRlIGVsZW1lbnQucGFyZW50TG9naWNhbDtcclxuICAgICAgICAgIGxvZ2ljYWxBcnJheS5wdXNoKGVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgIGlmIChzZXF1ZW5jZS5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgbGFzdFByb2Nlc3NlZEZpbHRlciA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGxhc3RQYXJlbnRMb2dpY2FsICE9PSBuZXh0RWxlbWVudC5wYXJlbnRMb2dpY2FsKSB7XHJcbiAgICAgICAgICAgIGlmIChsb2dpY2FsQXJyYXkubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgICAgICAnWW91IG11c3Qgc2V0IGF0ICcgK1xyXG4gICAgICAgICAgICAgICAgICAnbGVhc3QgdHdvIG9wZXJhdG9yIGluIGEgbG9naWNhbCAoJyArXHJcbiAgICAgICAgICAgICAgICAgIGxhc3RQYXJlbnRMb2dpY2FsICtcclxuICAgICAgICAgICAgICAgICAgJyknXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBsYXN0UHJvY2Vzc2VkRmlsdGVyID0gT2JqZWN0LmFzc2lnbihcclxuICAgICAgICAgICAgICAgIHt9LFxyXG4gICAgICAgICAgICAgICAgeyBsb2dpY2FsOiBsYXN0UGFyZW50TG9naWNhbCwgZmlsdGVyczogbG9naWNhbEFycmF5IH1cclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIGxvZ2ljYWxBcnJheSA9IFtsYXN0UHJvY2Vzc2VkRmlsdGVyXTtcclxuICAgICAgICAgICAgICBsYXN0UGFyZW50TG9naWNhbCA9IG5leHRFbGVtZW50LnBhcmVudExvZ2ljYWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbGFzdFByb2Nlc3NlZEZpbHRlcjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=