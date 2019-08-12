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
    addInterfaceFilter(igoOgcFilterObject = { operator: 'PropertyIsEqualTo' }, geometryName, level = 0, parentLogical = 'Or') {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXIvc2hhcmVkL29nYy1maWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxRQUFRLE1BQU0sa0JBQWtCLENBQUM7QUFDN0MsT0FBTyxXQUFXLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sV0FBVyxNQUFNLGVBQWUsQ0FBQztBQUd4QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBVW5DLE1BQU0sT0FBTyxlQUFlO0lBQTVCO1FBQ1UsbUJBQWMsR0FBZ0MsRUFBRSxDQUFDO1FBQ2xELGNBQVMsR0FBRztZQUNqQixpQkFBaUIsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRTtZQUN4RCxvQkFBb0IsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRTtZQUMzRCxjQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzdELHFCQUFxQixFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNwRSw4QkFBOEIsRUFBRTtnQkFDOUIsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDO2FBQzFCO1lBQ0Qsa0JBQWtCLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2pFLDJCQUEyQixFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUMxRSxpQkFBaUIsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUMs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aUIsS0FBSyxXQUFXLENBQUMsYUFBYSxFQUFFO3dCQUMxRCxJQUFJLFlBQVksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFOzRCQUM3QixPQUFPLENBQUMsR0FBRyxDQUNULGtCQUFrQjtnQ0FDaEIsbUNBQW1DO2dDQUNuQyxpQkFBaUI7Z0NBQ2pCLEdBQUcsQ0FDTixDQUFDO3lCQUNIOzZCQUFNOzRCQUNMLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQ2pDLEVBQUUsRUFDRixFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLENBQ3RELENBQUM7NEJBQ0YsWUFBWSxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQzs0QkFDckMsaUJBQWlCLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQzt5QkFDL0M7cUJBQ0Y7Z0JBQ0gsQ0FBQyxFQUFDLENBQUM7Z0JBQ0gsT0FBTyxtQkFBbUIsQ0FBQzthQUM1QjtpQkFBTTtnQkFDTCxPQUFPLFNBQVMsQ0FBQzthQUNsQjtTQUNGO2FBQU07WUFDTCxPQUFPLFNBQVMsQ0FBQztTQUNsQjtJQUNILENBQUM7Q0FDRjs7Ozs7O0lBallDLHlDQUF5RDs7SUFDekQsb0NBaUJFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgb2xmaWx0ZXIgZnJvbSAnb2wvZm9ybWF0L2ZpbHRlcic7XHJcbmltcG9ydCBvbEZvcm1hdFdLVCBmcm9tICdvbC9mb3JtYXQvV0tUJztcclxuaW1wb3J0IG9sRm9ybWF0V0ZTIGZyb20gJ29sL2Zvcm1hdC9XRlMnO1xyXG5pbXBvcnQgb2xHZW9tZXRyeSBmcm9tICdvbC9nZW9tL0dlb21ldHJ5JztcclxuXHJcbmltcG9ydCB7IHV1aWQgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQge1xyXG4gIE9nY0ZpbHRlcixcclxuICBJZ29PZ2NGaWx0ZXJPYmplY3QsXHJcbiAgV0ZTV3JpdGVHZXRGZWF0dXJlT3B0aW9ucyxcclxuICBBbnlCYXNlT2djRmlsdGVyT3B0aW9ucyxcclxuICBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zXHJcbn0gZnJvbSAnLi9vZ2MtZmlsdGVyLmludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgT2djRmlsdGVyV3JpdGVyIHtcclxuICBwcml2YXRlIGZpbHRlclNlcXVlbmNlOiBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zW10gPSBbXTtcclxuICBwdWJsaWMgb3BlcmF0b3JzID0ge1xyXG4gICAgUHJvcGVydHlJc0VxdWFsVG86IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFtdIH0sXHJcbiAgICBQcm9wZXJ0eUlzTm90RXF1YWxUbzogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogW10gfSxcclxuICAgIFByb3BlcnR5SXNMaWtlOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbJ3N0cmluZyddIH0sXHJcbiAgICBQcm9wZXJ0eUlzR3JlYXRlclRoYW46IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFsnbnVtYmVyJ10gfSxcclxuICAgIFByb3BlcnR5SXNHcmVhdGVyVGhhbk9yRXF1YWxUbzoge1xyXG4gICAgICBzcGF0aWFsOiBmYWxzZSxcclxuICAgICAgZmllbGRSZXN0cmljdDogWydudW1iZXInXVxyXG4gICAgfSxcclxuICAgIFByb3BlcnR5SXNMZXNzVGhhbjogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogWydudW1iZXInXSB9LFxyXG4gICAgUHJvcGVydHlJc0xlc3NUaGFuT3JFcXVhbFRvOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbJ251bWJlciddIH0sXHJcbiAgICBQcm9wZXJ0eUlzQmV0d2VlbjogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogWydudW1iZXInXSB9LFxyXG4gICAgRHVyaW5nOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbXSB9LFxyXG4gICAgUHJvcGVydHlJc051bGw6IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFtdIH0sXHJcbiAgICBJbnRlcnNlY3RzOiB7IHNwYXRpYWw6IHRydWUsIGZpZWxkUmVzdHJpY3Q6IFtdIH0sXHJcbiAgICBXaXRoaW46IHsgc3BhdGlhbDogdHJ1ZSwgZmllbGRSZXN0cmljdDogW10gfSxcclxuICAgIENvbnRhaW5zOiB7IHNwYXRpYWw6IHRydWUsIGZpZWxkUmVzdHJpY3Q6IFtdIH1cclxuICB9O1xyXG5cclxuICBwdWJsaWMgYnVpbGRGaWx0ZXIoXHJcbiAgICBmaWx0ZXJzOiBJZ29PZ2NGaWx0ZXJPYmplY3QsXHJcbiAgICBleHRlbnQ/OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcclxuICAgIHByb2o/LFxyXG4gICAgZmllbGROYW1lR2VvbWV0cnk/OiBzdHJpbmdcclxuICApOiBzdHJpbmcge1xyXG4gICAgbGV0IG91ckJib3hGaWx0ZXI7XHJcbiAgICBsZXQgZW5hYmxlQmJveDogYm9vbGVhbjtcclxuICAgIGlmICgvaW50ZXJzZWN0c3xjb250YWluc3x3aXRoaW4vZ2kudGVzdChKU09OLnN0cmluZ2lmeShmaWx0ZXJzKSkpIHtcclxuICAgICAgZW5hYmxlQmJveCA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZW5hYmxlQmJveCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAoZmlsdGVycykge1xyXG4gICAgICBmaWVsZE5hbWVHZW9tZXRyeSA9XHJcbiAgICAgICAgKGZpbHRlcnMgYXMgYW55KS5nZW9tZXRyeU5hbWUgIT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgPyAoZmlsdGVycyBhcyBhbnkpLmdlb21ldHJ5TmFtZVxyXG4gICAgICAgICAgOiBmaWVsZE5hbWVHZW9tZXRyeTtcclxuICAgIH1cclxuICAgIGlmIChleHRlbnQgJiYgZmlsdGVycykge1xyXG4gICAgICBvdXJCYm94RmlsdGVyID0gb2xmaWx0ZXIuYmJveChmaWVsZE5hbWVHZW9tZXRyeSwgZXh0ZW50LCBwcm9qLmdldENvZGUoKSk7XHJcbiAgICB9XHJcbiAgICBsZXQgZmlsdGVyQXNzZW1ibHk6IE9nY0ZpbHRlcjtcclxuICAgIGlmIChmaWx0ZXJzKSB7XHJcbiAgICAgIGZpbHRlcnMgPSB0aGlzLmNoZWNrSWdvRmlsdGVyc1Byb3BlcnRpZXMoZmlsdGVycywgZmllbGROYW1lR2VvbWV0cnkpO1xyXG4gICAgICBpZiAoZXh0ZW50ICYmIGVuYWJsZUJib3gpIHtcclxuICAgICAgICBmaWx0ZXJBc3NlbWJseSA9IG9sZmlsdGVyLmFuZChcclxuICAgICAgICAgIG91ckJib3hGaWx0ZXIsXHJcbiAgICAgICAgICB0aGlzLmJ1bmRsZUZpbHRlcihmaWx0ZXJzKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZmlsdGVyQXNzZW1ibHkgPSB0aGlzLmJ1bmRsZUZpbHRlcihmaWx0ZXJzKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuICdiYm94PScgKyBleHRlbnQuam9pbignLCcpICsgJywnICsgcHJvai5nZXRDb2RlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgd2ZzT3B0aW9uczogV0ZTV3JpdGVHZXRGZWF0dXJlT3B0aW9ucyA9IHtcclxuICAgICAgc3JzTmFtZTogJycsXHJcbiAgICAgIGZlYXR1cmVOUzogJycsXHJcbiAgICAgIGZlYXR1cmVQcmVmaXg6ICcnLFxyXG4gICAgICBmZWF0dXJlVHlwZXM6IFsnZmVhdHVyZVR5cGVzJ10sXHJcbiAgICAgIGZpbHRlcjogZmlsdGVyQXNzZW1ibHksXHJcbiAgICAgIG91dHB1dEZvcm1hdDogJycsXHJcbiAgICAgIGdlb21ldHJ5TmFtZTogZmllbGROYW1lR2VvbWV0cnlcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcXVlcnkgPSBuZXcgb2xGb3JtYXRXRlMoKS53cml0ZUdldEZlYXR1cmUod2ZzT3B0aW9ucyk7XHJcbiAgICBjb25zdCBzdHIgPSBuZXcgWE1MU2VyaWFsaXplcigpLnNlcmlhbGl6ZVRvU3RyaW5nKHF1ZXJ5KTtcclxuICAgIGNvbnN0IHJlZ2V4cDEgPSAvdHlwZW5hbWVzICo9fHR5cGVuYW1lICo9XFxcImZlYXR1cmVUeXBlc1xcXCIgKj4vZ2k7XHJcbiAgICBjb25zdCByZWdleHAyID0gLzxcXC9RdWVyeT48XFwvR2V0RmVhdHVyZT4vZ2k7XHJcblxyXG4gICAgcmV0dXJuICdmaWx0ZXI9JyArIHN0ci5zcGxpdChyZWdleHAxKVsxXS5zcGxpdChyZWdleHAyKVswXTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYnVuZGxlRmlsdGVyKGZpbHRlck9iamVjdDogYW55KSB7XHJcbiAgICBpZiAoZmlsdGVyT2JqZWN0IGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgY29uc3QgbG9naWNhbEFycmF5ID0gW107XHJcbiAgICAgIGZpbHRlck9iamVjdC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgIGxvZ2ljYWxBcnJheS5wdXNoKHRoaXMuYnVuZGxlRmlsdGVyKGVsZW1lbnQpKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBsb2dpY2FsQXJyYXk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoZmlsdGVyT2JqZWN0Lmhhc093blByb3BlcnR5KCdsb2dpY2FsJykpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVGaWx0ZXIoe1xyXG4gICAgICAgICAgb3BlcmF0b3I6IGZpbHRlck9iamVjdC5sb2dpY2FsLFxyXG4gICAgICAgICAgbG9naWNhbEFycmF5OiB0aGlzLmJ1bmRsZUZpbHRlcihmaWx0ZXJPYmplY3QuZmlsdGVycylcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIGlmIChmaWx0ZXJPYmplY3QuaGFzT3duUHJvcGVydHkoJ29wZXJhdG9yJykpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVGaWx0ZXIoZmlsdGVyT2JqZWN0IGFzIEFueUJhc2VPZ2NGaWx0ZXJPcHRpb25zKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVGaWx0ZXIoZmlsdGVyT3B0aW9ucyk6IE9nY0ZpbHRlciB7XHJcbiAgICBjb25zdCBvcGVyYXRvciA9IGZpbHRlck9wdGlvbnMub3BlcmF0b3I7XHJcbiAgICBjb25zdCBsb2dpY2FsQXJyYXkgPSBmaWx0ZXJPcHRpb25zLmxvZ2ljYWxBcnJheTtcclxuXHJcbiAgICBjb25zdCB3ZnNQcm9wZXJ0eU5hbWUgPSBmaWx0ZXJPcHRpb25zLnByb3BlcnR5TmFtZTtcclxuICAgIGNvbnN0IHdmc1BhdHRlcm4gPSBmaWx0ZXJPcHRpb25zLnBhdHRlcm47XHJcbiAgICBjb25zdCB3ZnNNYXRjaENhc2UgPSBmaWx0ZXJPcHRpb25zLm1hdGNoQ2FzZVxyXG4gICAgICA/IGZpbHRlck9wdGlvbnMubWF0Y2hDYXNlXHJcbiAgICAgIDogdHJ1ZTtcclxuICAgIGNvbnN0IHdmc1dpbGRDYXJkID0gZmlsdGVyT3B0aW9ucy53aWxkQ2FyZCA/IGZpbHRlck9wdGlvbnMud2lsZENhcmQgOiAnKic7XHJcbiAgICBjb25zdCB3ZnNTaW5nbGVDaGFyID0gZmlsdGVyT3B0aW9ucy5zaW5nbGVDaGFyXHJcbiAgICAgID8gZmlsdGVyT3B0aW9ucy5zaW5nbGVDaGFyXHJcbiAgICAgIDogJy4nO1xyXG4gICAgY29uc3Qgd2ZzRXNjYXBlQ2hhciA9IGZpbHRlck9wdGlvbnMuZXNjYXBlQ2hhclxyXG4gICAgICA/IGZpbHRlck9wdGlvbnMuZXNjYXBlQ2hhclxyXG4gICAgICA6ICchJztcclxuXHJcbiAgICBjb25zdCB3ZnNMb3dlckJvdW5kYXJ5ID0gZmlsdGVyT3B0aW9ucy5sb3dlckJvdW5kYXJ5O1xyXG4gICAgY29uc3Qgd2ZzVXBwZXJCb3VuZGFyeSA9IGZpbHRlck9wdGlvbnMudXBwZXJCb3VuZGFyeTtcclxuXHJcbiAgICBjb25zdCB3ZnNHZW9tZXRyeU5hbWUgPSBmaWx0ZXJPcHRpb25zLmdlb21ldHJ5TmFtZTtcclxuICAgIGNvbnN0IHdmc0V4dGVudCA9IGZpbHRlck9wdGlvbnMuZXh0ZW50O1xyXG4gICAgY29uc3Qgd2ZzV2t0R2VvbWV0cnkgPSBmaWx0ZXJPcHRpb25zLndrdF9nZW9tZXRyeTtcclxuICAgIGNvbnN0IHdmc1Nyc05hbWUgPSBmaWx0ZXJPcHRpb25zLnNyc05hbWVcclxuICAgICAgPyBmaWx0ZXJPcHRpb25zLnNyc05hbWVcclxuICAgICAgOiAnRVBTRzozODU3JztcclxuXHJcbiAgICBjb25zdCB3ZnNCZWdpbiA9IGZpbHRlck9wdGlvbnMuYmVnaW47XHJcbiAgICBjb25zdCB3ZnNFbmQgPSBmaWx0ZXJPcHRpb25zLmVuZDtcclxuXHJcbiAgICBjb25zdCB3ZnNFeHByZXNzaW9uID0gZmlsdGVyT3B0aW9ucy5leHByZXNzaW9uO1xyXG5cclxuICAgIGxldCBnZW9tZXRyeTogb2xHZW9tZXRyeTtcclxuICAgIGlmICh3ZnNXa3RHZW9tZXRyeSkge1xyXG4gICAgICBjb25zdCB3a3QgPSBuZXcgb2xGb3JtYXRXS1QoKTtcclxuICAgICAgZ2VvbWV0cnkgPSB3a3QucmVhZEdlb21ldHJ5KHdmc1drdEdlb21ldHJ5LCB7XHJcbiAgICAgICAgZGF0YVByb2plY3Rpb246IHdmc1Nyc05hbWUsXHJcbiAgICAgICAgZmVhdHVyZVByb2plY3Rpb246ICdFUFNHOjM4NTcnXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaCAob3BlcmF0b3IpIHtcclxuICAgICAgY2FzZSAnQkJPWCc6XHJcbiAgICAgICAgcmV0dXJuIG9sZmlsdGVyLmJib3god2ZzR2VvbWV0cnlOYW1lLCB3ZnNFeHRlbnQsIHdmc1Nyc05hbWUpO1xyXG4gICAgICBjYXNlICdQcm9wZXJ0eUlzQmV0d2Vlbic6XHJcbiAgICAgICAgcmV0dXJuIG9sZmlsdGVyLmJldHdlZW4oXHJcbiAgICAgICAgICB3ZnNQcm9wZXJ0eU5hbWUsXHJcbiAgICAgICAgICB3ZnNMb3dlckJvdW5kYXJ5LFxyXG4gICAgICAgICAgd2ZzVXBwZXJCb3VuZGFyeVxyXG4gICAgICAgICk7XHJcbiAgICAgIGNhc2UgJ0NvbnRhaW5zJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIuY29udGFpbnMod2ZzR2VvbWV0cnlOYW1lLCBnZW9tZXRyeSwgd2ZzU3JzTmFtZSk7XHJcbiAgICAgIGNhc2UgJ0R1cmluZyc6XHJcbiAgICAgICAgcmV0dXJuIG9sZmlsdGVyLmR1cmluZyh3ZnNQcm9wZXJ0eU5hbWUsIHdmc0JlZ2luLCB3ZnNFbmQpO1xyXG4gICAgICBjYXNlICdQcm9wZXJ0eUlzRXF1YWxUbyc6XHJcbiAgICAgICAgcmV0dXJuIG9sZmlsdGVyLmVxdWFsVG8oXHJcbiAgICAgICAgICB3ZnNQcm9wZXJ0eU5hbWUsXHJcbiAgICAgICAgICB3ZnNFeHByZXNzaW9uLFxyXG4gICAgICAgICAgd2ZzTWF0Y2hDYXNlXHJcbiAgICAgICAgKTtcclxuICAgICAgY2FzZSAnUHJvcGVydHlJc0dyZWF0ZXJUaGFuJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIuZ3JlYXRlclRoYW4od2ZzUHJvcGVydHlOYW1lLCB3ZnNFeHByZXNzaW9uKTtcclxuICAgICAgY2FzZSAnUHJvcGVydHlJc0dyZWF0ZXJUaGFuT3JFcXVhbFRvJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIuZ3JlYXRlclRoYW5PckVxdWFsVG8od2ZzUHJvcGVydHlOYW1lLCB3ZnNFeHByZXNzaW9uKTtcclxuICAgICAgY2FzZSAnSW50ZXJzZWN0cyc6XHJcbiAgICAgICAgcmV0dXJuIG9sZmlsdGVyLmludGVyc2VjdHMod2ZzR2VvbWV0cnlOYW1lLCBnZW9tZXRyeSwgd2ZzU3JzTmFtZSk7XHJcbiAgICAgIGNhc2UgJ1Byb3BlcnR5SXNOdWxsJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIuaXNOdWxsKHdmc1Byb3BlcnR5TmFtZSk7XHJcbiAgICAgIGNhc2UgJ1Byb3BlcnR5SXNMZXNzVGhhbic6XHJcbiAgICAgICAgcmV0dXJuIG9sZmlsdGVyLmxlc3NUaGFuKHdmc1Byb3BlcnR5TmFtZSwgd2ZzRXhwcmVzc2lvbik7XHJcbiAgICAgIGNhc2UgJ1Byb3BlcnR5SXNMZXNzVGhhbk9yRXF1YWxUbyc6XHJcbiAgICAgICAgcmV0dXJuIG9sZmlsdGVyLmxlc3NUaGFuT3JFcXVhbFRvKHdmc1Byb3BlcnR5TmFtZSwgd2ZzRXhwcmVzc2lvbik7XHJcbiAgICAgIGNhc2UgJ1Byb3BlcnR5SXNMaWtlJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIubGlrZShcclxuICAgICAgICAgIHdmc1Byb3BlcnR5TmFtZSxcclxuICAgICAgICAgIHdmc1BhdHRlcm4ucmVwbGFjZSgvWygpX10vZ2ksIHdmc1NpbmdsZUNoYXIpLFxyXG4gICAgICAgICAgd2ZzV2lsZENhcmQsXHJcbiAgICAgICAgICB3ZnNTaW5nbGVDaGFyLFxyXG4gICAgICAgICAgd2ZzRXNjYXBlQ2hhcixcclxuICAgICAgICAgIHdmc01hdGNoQ2FzZVxyXG4gICAgICAgICk7XHJcbiAgICAgIGNhc2UgJ1Byb3BlcnR5SXNOb3RFcXVhbFRvJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIubm90RXF1YWxUbyhcclxuICAgICAgICAgIHdmc1Byb3BlcnR5TmFtZSxcclxuICAgICAgICAgIHdmc0V4cHJlc3Npb24sXHJcbiAgICAgICAgICB3ZnNNYXRjaENhc2VcclxuICAgICAgICApO1xyXG4gICAgICBjYXNlICdXaXRoaW4nOlxyXG4gICAgICAgIHJldHVybiBvbGZpbHRlci53aXRoaW4od2ZzR2VvbWV0cnlOYW1lLCBnZW9tZXRyeSwgd2ZzU3JzTmFtZSk7XHJcbiAgICAgIC8vIExPR0lDQUxcclxuICAgICAgY2FzZSAnQW5kJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIuYW5kLmFwcGx5KG51bGwsIGxvZ2ljYWxBcnJheSk7XHJcbiAgICAgIGNhc2UgJ09yJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIub3IuYXBwbHkobnVsbCwgbG9naWNhbEFycmF5KTtcclxuICAgICAgY2FzZSAnTm90JzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIubm90LmFwcGx5KG51bGwsIGxvZ2ljYWxBcnJheSk7XHJcblxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGVmaW5lSW50ZXJmYWNlRmlsdGVyU2VxdWVuY2UoXHJcbiAgICBmaWx0ZXJPYmplY3Q6IGFueSxcclxuICAgIGdlb21ldHJ5TmFtZSxcclxuICAgIGxvZ2ljYWwgPSAnJyxcclxuICAgIGxldmVsID0gLTFcclxuICApOiBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zW10ge1xyXG4gICAgaWYgKGZpbHRlck9iamVjdCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgIGZpbHRlck9iamVjdC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgIHRoaXMuZmlsdGVyU2VxdWVuY2UuY29uY2F0KFxyXG4gICAgICAgICAgdGhpcy5kZWZpbmVJbnRlcmZhY2VGaWx0ZXJTZXF1ZW5jZShcclxuICAgICAgICAgICAgZWxlbWVudCxcclxuICAgICAgICAgICAgZ2VvbWV0cnlOYW1lLFxyXG4gICAgICAgICAgICBsb2dpY2FsLFxyXG4gICAgICAgICAgICBsZXZlbFxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGZpbHRlck9iamVjdC5oYXNPd25Qcm9wZXJ0eSgnbG9naWNhbCcpKSB7XHJcbiAgICAgICAgbGV2ZWwgPSBsZXZlbCArIDE7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJTZXF1ZW5jZS5jb25jYXQoXHJcbiAgICAgICAgICB0aGlzLmRlZmluZUludGVyZmFjZUZpbHRlclNlcXVlbmNlKFxyXG4gICAgICAgICAgICBmaWx0ZXJPYmplY3QuZmlsdGVycyxcclxuICAgICAgICAgICAgZ2VvbWV0cnlOYW1lLFxyXG4gICAgICAgICAgICBmaWx0ZXJPYmplY3QubG9naWNhbCxcclxuICAgICAgICAgICAgbGV2ZWxcclxuICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2UgaWYgKGZpbHRlck9iamVjdC5oYXNPd25Qcm9wZXJ0eSgnb3BlcmF0b3InKSkge1xyXG4gICAgICAgIHRoaXMuZmlsdGVyU2VxdWVuY2UucHVzaChcclxuICAgICAgICAgIHRoaXMuYWRkSW50ZXJmYWNlRmlsdGVyKGZpbHRlck9iamVjdCwgZ2VvbWV0cnlOYW1lLCBsZXZlbCwgbG9naWNhbClcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5maWx0ZXJTZXF1ZW5jZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRJbnRlcmZhY2VGaWx0ZXIoXHJcbiAgICBpZ29PZ2NGaWx0ZXJPYmplY3QgPSB7IG9wZXJhdG9yOiAnUHJvcGVydHlJc0VxdWFsVG8nIH0sXHJcbiAgICBnZW9tZXRyeU5hbWU/LFxyXG4gICAgbGV2ZWwgPSAwLFxyXG4gICAgcGFyZW50TG9naWNhbCA9ICdPcidcclxuICApOiBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zIHtcclxuICAgIGNvbnN0IGYgPSB7XHJcbiAgICAgIHByb3BlcnR5TmFtZTogJycsXHJcbiAgICAgIG9wZXJhdG9yOiAnJyxcclxuICAgICAgYWN0aXZlOiAnJyxcclxuICAgICAgZmlsdGVyaWQ6IHV1aWQoKSxcclxuICAgICAgYmVnaW46ICcnLFxyXG4gICAgICBlbmQ6ICcnLFxyXG4gICAgICBsb3dlckJvdW5kYXJ5OiAnJyxcclxuICAgICAgdXBwZXJCb3VuZGFyeTogJycsXHJcbiAgICAgIGV4cHJlc3Npb246ICcnLFxyXG4gICAgICBwYXR0ZXJuOiAnJyxcclxuICAgICAgd2lsZENhcmQ6ICcqJyxcclxuICAgICAgc2luZ2xlQ2hhcjogJy4nLFxyXG4gICAgICBlc2NhcGVDaGFyOiAnIScsXHJcbiAgICAgIG1hdGNoQ2FzZTogdHJ1ZSxcclxuICAgICAgaWdvU3BhdGlhbFNlbGVjdG9yOiAnJyxcclxuICAgICAgZ2VvbWV0cnlOYW1lOiAnJyxcclxuICAgICAgZ2VvbWV0cnk6ICcnLFxyXG4gICAgICB3a3RfZ2VvbWV0cnk6ICcnLFxyXG4gICAgICBleHRlbnQ6ICcnLFxyXG4gICAgICBzcnNOYW1lOiAnJyxcclxuICAgICAgcGFyZW50TG9naWNhbDogJycsXHJcbiAgICAgIGxldmVsOiAwXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKFxyXG4gICAgICBmLFxyXG4gICAgICB7XHJcbiAgICAgICAgcGFyZW50TG9naWNhbCxcclxuICAgICAgICBsZXZlbCxcclxuICAgICAgICBnZW9tZXRyeU5hbWVcclxuICAgICAgfSxcclxuICAgICAgaWdvT2djRmlsdGVyT2JqZWN0XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNoZWNrSWdvRmlsdGVyc1Byb3BlcnRpZXMoXHJcbiAgICBmaWx0ZXJPYmplY3Q6IGFueSxcclxuICAgIGZpZWxkTmFtZUdlb21ldHJ5LFxyXG4gICAgYWN0aXZlID0gZmFsc2VcclxuICApIHtcclxuICAgIGNvbnN0IGZpbHRlckFycmF5ID0gW107XHJcbiAgICBpZiAoZmlsdGVyT2JqZWN0IGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgZmlsdGVyT2JqZWN0LmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgZmlsdGVyQXJyYXkucHVzaChcclxuICAgICAgICAgIHRoaXMuY2hlY2tJZ29GaWx0ZXJzUHJvcGVydGllcyhlbGVtZW50LCBmaWVsZE5hbWVHZW9tZXRyeSwgYWN0aXZlKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gZmlsdGVyQXJyYXk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoZmlsdGVyT2JqZWN0Lmhhc093blByb3BlcnR5KCdsb2dpY2FsJykpIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihcclxuICAgICAgICAgIHt9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsb2dpY2FsOiBmaWx0ZXJPYmplY3QubG9naWNhbCxcclxuICAgICAgICAgICAgZmlsdGVyczogdGhpcy5jaGVja0lnb0ZpbHRlcnNQcm9wZXJ0aWVzKFxyXG4gICAgICAgICAgICAgIGZpbHRlck9iamVjdC5maWx0ZXJzLFxyXG4gICAgICAgICAgICAgIGZpZWxkTmFtZUdlb21ldHJ5LFxyXG4gICAgICAgICAgICAgIGFjdGl2ZVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIGlmIChmaWx0ZXJPYmplY3QuaGFzT3duUHJvcGVydHkoJ29wZXJhdG9yJykpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hZGRGaWx0ZXJQcm9wZXJ0aWVzKFxyXG4gICAgICAgICAgZmlsdGVyT2JqZWN0IGFzIE9nY0ludGVyZmFjZUZpbHRlck9wdGlvbnMsXHJcbiAgICAgICAgICBmaWVsZE5hbWVHZW9tZXRyeSxcclxuICAgICAgICAgIGFjdGl2ZVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkRmlsdGVyUHJvcGVydGllcyhcclxuICAgIGlnb09nY0ZpbHRlck9iamVjdDogT2djSW50ZXJmYWNlRmlsdGVyT3B0aW9ucyxcclxuICAgIGZpZWxkTmFtZUdlb21ldHJ5LFxyXG4gICAgYWN0aXZlID0gZmFsc2VcclxuICApIHtcclxuICAgIGNvbnN0IGZpbHRlcmlkID0gaWdvT2djRmlsdGVyT2JqZWN0Lmhhc093blByb3BlcnR5KCdmaWx0ZXJpZCcpXHJcbiAgICAgID8gaWdvT2djRmlsdGVyT2JqZWN0LmZpbHRlcmlkXHJcbiAgICAgIDogdXVpZCgpO1xyXG4gICAgY29uc3Qgc3RhdHVzID0gaWdvT2djRmlsdGVyT2JqZWN0Lmhhc093blByb3BlcnR5KCdhY3RpdmUnKVxyXG4gICAgICA/IGlnb09nY0ZpbHRlck9iamVjdC5hY3RpdmVcclxuICAgICAgOiBhY3RpdmU7XHJcblxyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXHJcbiAgICAgIHt9LFxyXG4gICAgICB7XHJcbiAgICAgICAgZmlsdGVyaWQsXHJcbiAgICAgICAgYWN0aXZlOiBzdGF0dXMsXHJcbiAgICAgICAgaWdvU3BhdGlhbFNlbGVjdG9yOiAnZml4ZWRFeHRlbnQnXHJcbiAgICAgIH0sXHJcbiAgICAgIGlnb09nY0ZpbHRlck9iamVjdCxcclxuICAgICAgeyBnZW9tZXRyeU5hbWU6IGZpZWxkTmFtZUdlb21ldHJ5IH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVidWlsdElnb09nY0ZpbHRlck9iamVjdEZyb21TZXF1ZW5jZShcclxuICAgIHNlcXVlbmNlOiBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zW11cclxuICApOiBJZ29PZ2NGaWx0ZXJPYmplY3Qge1xyXG4gICAgaWYgKHNlcXVlbmNlIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgaWYgKHNlcXVlbmNlLmxlbmd0aCA+PSAxKSB7XHJcbiAgICAgICAgbGV0IGxhc3RQYXJlbnRMb2dpY2FsID0gc2VxdWVuY2VbMF0ucGFyZW50TG9naWNhbDtcclxuICAgICAgICBsZXQgbmV4dEVsZW1lbnQ6IGFueTtcclxuICAgICAgICBsZXQgbG9naWNhbEFycmF5ID0gW107XHJcbiAgICAgICAgbGV0IGxhc3RQcm9jZXNzZWRGaWx0ZXI7XHJcbiAgICAgICAgc2VxdWVuY2UuZm9yRWFjaCh1aUZpbHRlciA9PiB7XHJcbiAgICAgICAgICBjb25zdCBlbGVtZW50ID0gT2JqZWN0LmFzc2lnbih7fSwgdWlGaWx0ZXIpO1xyXG4gICAgICAgICAgY29uc3QgaW5kZXggPSBzZXF1ZW5jZS5pbmRleE9mKHVpRmlsdGVyKTtcclxuICAgICAgICAgIGlmIChpbmRleCA+PSAwICYmIGluZGV4IDwgc2VxdWVuY2UubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICBuZXh0RWxlbWVudCA9IHNlcXVlbmNlW2luZGV4ICsgMV07XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuZXh0RWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBkZWxldGUgZWxlbWVudC5hY3RpdmU7XHJcbiAgICAgICAgICBkZWxldGUgZWxlbWVudC5maWx0ZXJpZDtcclxuICAgICAgICAgIGRlbGV0ZSBlbGVtZW50LnBhcmVudExvZ2ljYWw7XHJcbiAgICAgICAgICBsb2dpY2FsQXJyYXkucHVzaChlbGVtZW50KTtcclxuXHJcbiAgICAgICAgICBpZiAoc2VxdWVuY2UubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgIGxhc3RQcm9jZXNzZWRGaWx0ZXIgPSBlbGVtZW50O1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChsYXN0UGFyZW50TG9naWNhbCAhPT0gbmV4dEVsZW1lbnQucGFyZW50TG9naWNhbCkge1xyXG4gICAgICAgICAgICBpZiAobG9naWNhbEFycmF5Lmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICAgICAgJ1lvdSBtdXN0IHNldCBhdCAnICtcclxuICAgICAgICAgICAgICAgICAgJ2xlYXN0IHR3byBvcGVyYXRvciBpbiBhIGxvZ2ljYWwgKCcgK1xyXG4gICAgICAgICAgICAgICAgICBsYXN0UGFyZW50TG9naWNhbCArXHJcbiAgICAgICAgICAgICAgICAgICcpJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgbGFzdFByb2Nlc3NlZEZpbHRlciA9IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAgICAgICAgICB7fSxcclxuICAgICAgICAgICAgICAgIHsgbG9naWNhbDogbGFzdFBhcmVudExvZ2ljYWwsIGZpbHRlcnM6IGxvZ2ljYWxBcnJheSB9XHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICBsb2dpY2FsQXJyYXkgPSBbbGFzdFByb2Nlc3NlZEZpbHRlcl07XHJcbiAgICAgICAgICAgICAgbGFzdFBhcmVudExvZ2ljYWwgPSBuZXh0RWxlbWVudC5wYXJlbnRMb2dpY2FsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGxhc3RQcm9jZXNzZWRGaWx0ZXI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19