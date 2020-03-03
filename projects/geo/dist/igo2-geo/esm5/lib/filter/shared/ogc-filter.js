/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as olfilter from 'ol/format/filter';
import olFormatWKT from 'ol/format/WKT';
import olFormatWFS from 'ol/format/WFS';
import { uuid, ObjectUtils } from '@igo2/utils';
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
            filters = this.checkIgoFiltersProperties(filters, fieldNameGeometry, proj);
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
                featureProjection: wfsSrsName || 'EPSG:3857'
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
     * @param {?} proj
     * @param {?=} active
     * @return {?}
     */
    OgcFilterWriter.prototype.checkIgoFiltersProperties = /**
     * @param {?} filterObject
     * @param {?} fieldNameGeometry
     * @param {?} proj
     * @param {?=} active
     * @return {?}
     */
    function (filterObject, fieldNameGeometry, proj, active) {
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
                filterArray.push(_this.checkIgoFiltersProperties(element, fieldNameGeometry, proj, active));
            }));
            return filterArray;
        }
        else {
            if (filterObject.hasOwnProperty('logical')) {
                return Object.assign({}, {
                    logical: filterObject.logical,
                    filters: this.checkIgoFiltersProperties(filterObject.filters, fieldNameGeometry, proj, active)
                });
            }
            else if (filterObject.hasOwnProperty('operator')) {
                return this.addFilterProperties((/** @type {?} */ (filterObject)), fieldNameGeometry, proj, active);
            }
        }
    };
    /**
     * @private
     * @param {?} igoOgcFilterObject
     * @param {?} fieldNameGeometry
     * @param {?} proj
     * @param {?=} active
     * @return {?}
     */
    OgcFilterWriter.prototype.addFilterProperties = /**
     * @private
     * @param {?} igoOgcFilterObject
     * @param {?} fieldNameGeometry
     * @param {?} proj
     * @param {?=} active
     * @return {?}
     */
    function (igoOgcFilterObject, fieldNameGeometry, proj, active) {
        if (active === void 0) { active = false; }
        /** @type {?} */
        var filterid = igoOgcFilterObject.hasOwnProperty('filterid')
            ? igoOgcFilterObject.filterid
            : uuid();
        /** @type {?} */
        var status = igoOgcFilterObject.hasOwnProperty('active')
            ? igoOgcFilterObject.active
            : active;
        /** @type {?} */
        var srsName = igoOgcFilterObject.hasOwnProperty('srsName')
            ? igoOgcFilterObject.srsName
            : proj ? proj.getCode() : 'EPSG:3857';
        return Object.assign({}, {
            filterid: filterid,
            active: status,
            igoSpatialSelector: 'fixedExtent',
            srsName: srsName
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
     * @private
     * @param {?} pushButtons
     * @return {?}
     */
    OgcFilterWriter.prototype.computeIgoPushButton = /**
     * @private
     * @param {?} pushButtons
     * @return {?}
     */
    function (pushButtons) {
        if (pushButtons.groups.every((/**
         * @param {?} group
         * @return {?}
         */
        function (group) { return group.computedButtons !== undefined; }))) {
            return pushButtons;
        }
        /** @type {?} */
        var pb;
        if (pushButtons.groups && pushButtons.bundles) {
            if (!pushButtons.bundles.every((/**
             * @param {?} bundle
             * @return {?}
             */
            function (bundle) { return bundle.id !== undefined; }))) {
                throw new Error('You must set an id for each of your pushButtons bundles');
            }
            pb = ObjectUtils.copyDeep(pushButtons);
            pb.groups.forEach((/**
             * @param {?} group
             * @return {?}
             */
            function (group) {
                group.title = group.title ? group.title : group.name;
                group.enabled = group.enabled ? group.enabled : false;
                group.computedButtons = ObjectUtils.copyDeep(pb.bundles.filter((/**
                 * @param {?} b
                 * @return {?}
                 */
                function (b) { return group.ids.includes(b.id); })));
            }));
        }
        else if (!pushButtons.groups && pushButtons.bundles) {
            pb = ObjectUtils.copyDeep(pushButtons);
            pb.groups = [(/** @type {?} */ ({ title: 'group1', name: 'group1', computedButtons: ObjectUtils.copyDeep(pb.bundles) }))];
        }
        else {
            pb = {
                bundles: (/** @type {?} */ (pushButtons)),
                groups: [
                    (/** @type {?} */ ({
                        title: 'group1', name: 'group1',
                        computedButtons: (/** @type {?} */ (ObjectUtils.copyDeep(pushButtons)))
                    }))
                ]
            };
        }
        if (!pb.groups.find((/**
         * @param {?} pbGroup
         * @return {?}
         */
        function (pbGroup) { return pbGroup.enabled; }))) {
            pb.groups[0].enabled = true;
        }
        return pb;
    };
    /**
     * @param {?} options
     * @param {?} fieldNameGeometry
     * @param {?=} extent
     * @param {?=} proj
     * @return {?}
     */
    OgcFilterWriter.prototype.handleOgcFiltersAppliedValue = /**
     * @param {?} options
     * @param {?} fieldNameGeometry
     * @param {?=} extent
     * @param {?=} proj
     * @return {?}
     */
    function (options, fieldNameGeometry, extent, proj) {
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
            ogcFilters.pushButtons = this.computeIgoPushButton(ogcFilters.pushButtons);
            /** @type {?} */
            var pushButtonBundle = ogcFilters.pushButtons.groups.find((/**
             * @param {?} g
             * @return {?}
             */
            function (g) { return g.enabled; })).computedButtons;
            /** @type {?} */
            var conditions_1 = [];
            pushButtonBundle.map((/**
             * @param {?} buttonBundle
             * @return {?}
             */
            function (buttonBundle) {
                /** @type {?} */
                var bundleCondition = [];
                buttonBundle.buttons
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
                filterQueryStringPushButton = this.buildFilter(conditions_1.length === 1 ? conditions_1[0] : { logical: 'And', filters: conditions_1 }, extent, proj, ogcFilters.geometryName);
            }
        }
        if (ogcFilters.enabled && ogcFilters.filters) {
            ogcFilters.geometryName = ogcFilters.geometryName || fieldNameGeometry;
            /** @type {?} */
            var igoFilters = ogcFilters.filters;
            filterQueryStringAdvancedFilters = this.buildFilter(igoFilters, extent, proj, ogcFilters.geometryName);
        }
        /** @type {?} */
        var filterQueryString = ogcFilters.advancedOgcFilters ? filterQueryStringAdvancedFilters : filterQueryStringPushButton;
        if (options.type === 'wms') {
            filterQueryString = this.formatProcessedOgcFilter(filterQueryString, ((/** @type {?} */ (options))).params.LAYERS);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXIvc2hhcmVkL29nYy1maWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxRQUFRLE1BQU0sa0JBQWtCLENBQUM7QUFDN0MsT0FBTyxXQUFXLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sV0FBVyxNQUFNLGVBQWUsQ0FBQztBQUt4QyxPQUFPLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQWVoRDtJQUFBO1FBQ1UsbUJBQWMsR0FBZ0MsRUFBRSxDQUFDO1FBQ2xELGNBQVMsR0FBRztZQUNqQixpQkFBaUIsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRTtZQUN4RCxvQkFBb0IsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRTtZQUMzRCxjQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzdELHFCQUFxQixFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNwRSw4QkFBOEIsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDN0Usa0JBQWtCLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2pFLDJCQUEyQixFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUMxRSxpQkFBaUIsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDaEUsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFO1lBQzdDLGNBQWMsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRTtZQUNyRCxVQUFVLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUU7WUFDaEQsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFO1lBQzVDLFFBQVEsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRTtTQUMvQyxDQUFDO0lBdWZKLENBQUM7Ozs7Ozs7SUFyZkMsd0RBQThCOzs7Ozs7SUFBOUIsVUFDRSxpQkFBb0MsRUFDcEMsaUJBQXlCLEVBQ3pCLE9BQWdCOztZQUNaLHNCQUFzQixHQUFHLElBQUk7UUFDakMsSUFBSSxPQUFPLElBQUksT0FBTyxLQUFLLEtBQUssRUFBRTtZQUNoQyxzQkFBc0IsR0FBRyxLQUFLLENBQUM7U0FDaEM7UUFFRCxpQkFBaUIsR0FBRyxpQkFBaUIsSUFBSSxFQUFFLENBQUM7UUFDNUMsaUJBQWlCLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7UUFDekgsaUJBQWlCLENBQUMsUUFBUSxHQUFHLGlCQUFpQixDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUM7UUFDNUgsaUJBQWlCLENBQUMsWUFBWSxHQUFHLGlCQUFpQixDQUFDO1FBRW5ELGlCQUFpQixDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztRQUM1QyxJQUFJLGlCQUFpQixDQUFDLE9BQU8sSUFBSSxpQkFBaUIsQ0FBQyxXQUFXLEVBQUU7WUFDOUQsaUJBQWlCLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1NBQzlDO1FBQ0QsT0FBTyxpQkFBaUIsQ0FBQztJQUMzQixDQUFDOzs7Ozs7OztJQUVNLHFDQUFXOzs7Ozs7O0lBQWxCLFVBQ0UsT0FBNEIsRUFDNUIsTUFBeUMsRUFDekMsSUFBbUIsRUFDbkIsaUJBQTBCOztZQUV0QixhQUFhOztZQUNiLFVBQW1CO1FBQ3ZCLElBQUksOEJBQThCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRTtZQUNoRSxVQUFVLEdBQUcsS0FBSyxDQUFDO1NBQ3BCO2FBQU07WUFDTCxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQ25CO1FBQ0QsSUFBSSxPQUFPLEVBQUU7WUFDWCxpQkFBaUI7Z0JBQ2YsQ0FBQyxtQkFBQSxPQUFPLEVBQU8sQ0FBQyxDQUFDLFlBQVksS0FBSyxTQUFTO29CQUN6QyxDQUFDLENBQUMsQ0FBQyxtQkFBQSxPQUFPLEVBQU8sQ0FBQyxDQUFDLFlBQVk7b0JBQy9CLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQztTQUN6QjtRQUNELElBQUksTUFBTSxJQUFJLE9BQU8sRUFBRTtZQUNyQixhQUFhLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDMUU7O1lBQ0csY0FBeUI7UUFDN0IsSUFBSSxPQUFPLEVBQUU7WUFDWCxPQUFPLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMzRSxJQUFJLE1BQU0sSUFBSSxVQUFVLEVBQUU7Z0JBQ3hCLGNBQWMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUMzQixhQUFhLEVBQ2IsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FDM0IsQ0FBQzthQUNIO2lCQUFNO2dCQUNMLGNBQWMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzdDO1NBQ0Y7YUFBTTtZQUNMLE9BQU8sT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUMxRDs7WUFFSyxVQUFVLEdBQThCO1lBQzVDLE9BQU8sRUFBRSxFQUFFO1lBQ1gsU0FBUyxFQUFFLEVBQUU7WUFDYixhQUFhLEVBQUUsRUFBRTtZQUNqQixZQUFZLEVBQUUsQ0FBQyxjQUFjLENBQUM7WUFDOUIsTUFBTSxFQUFFLGNBQWM7WUFDdEIsWUFBWSxFQUFFLEVBQUU7WUFDaEIsWUFBWSxFQUFFLGlCQUFpQjtTQUNoQzs7WUFFSyxLQUFLLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDOztZQUNyRCxHQUFHLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7O1lBQ2xELE9BQU8sR0FBRywrQ0FBK0M7O1lBQ3pELE9BQU8sR0FBRywyQkFBMkI7UUFFM0MsT0FBTyxTQUFTLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQzs7Ozs7O0lBRU8sc0NBQVk7Ozs7O0lBQXBCLFVBQXFCLFlBQWlCO1FBQXRDLGlCQWlCQztRQWhCQyxJQUFJLFlBQVksWUFBWSxLQUFLLEVBQUU7O2dCQUMzQixjQUFZLEdBQUcsRUFBRTtZQUN2QixZQUFZLENBQUMsT0FBTzs7OztZQUFDLFVBQUEsT0FBTztnQkFDMUIsY0FBWSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEQsQ0FBQyxFQUFDLENBQUM7WUFDSCxPQUFPLGNBQVksQ0FBQztTQUNyQjthQUFNO1lBQ0wsSUFBSSxZQUFZLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUMxQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFFBQVEsRUFBRSxZQUFZLENBQUMsT0FBTztvQkFDOUIsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztpQkFDdEQsQ0FBQyxDQUFDO2FBQ0o7aUJBQU0sSUFBSSxZQUFZLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUNsRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQUEsWUFBWSxFQUEyQixDQUFDLENBQUM7YUFDbkU7U0FDRjtJQUNILENBQUM7Ozs7OztJQUVPLHNDQUFZOzs7OztJQUFwQixVQUFxQixhQUFhOztZQUMxQixRQUFRLEdBQUcsYUFBYSxDQUFDLFFBQVE7O1lBQ2pDLFlBQVksR0FBRyxhQUFhLENBQUMsWUFBWTs7WUFFekMsZUFBZSxHQUFHLGFBQWEsQ0FBQyxZQUFZOztZQUM1QyxVQUFVLEdBQUcsYUFBYSxDQUFDLE9BQU87O1lBQ2xDLFlBQVksR0FBRyxhQUFhLENBQUMsU0FBUztZQUMxQyxDQUFDLENBQUMsYUFBYSxDQUFDLFNBQVM7WUFDekIsQ0FBQyxDQUFDLElBQUk7O1lBQ0YsV0FBVyxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUc7O1lBQ25FLGFBQWEsR0FBRyxhQUFhLENBQUMsVUFBVTtZQUM1QyxDQUFDLENBQUMsYUFBYSxDQUFDLFVBQVU7WUFDMUIsQ0FBQyxDQUFDLEdBQUc7O1lBQ0QsYUFBYSxHQUFHLGFBQWEsQ0FBQyxVQUFVO1lBQzVDLENBQUMsQ0FBQyxhQUFhLENBQUMsVUFBVTtZQUMxQixDQUFDLENBQUMsR0FBRzs7WUFFRCxnQkFBZ0IsR0FBRyxhQUFhLENBQUMsYUFBYTs7WUFDOUMsZ0JBQWdCLEdBQUcsYUFBYSxDQUFDLGFBQWE7O1lBRTlDLGVBQWUsR0FBRyxhQUFhLENBQUMsWUFBWTs7WUFDNUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxNQUFNOztZQUNoQyxjQUFjLEdBQUcsYUFBYSxDQUFDLFlBQVk7O1lBQzNDLFVBQVUsR0FBRyxhQUFhLENBQUMsT0FBTztZQUN0QyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU87WUFDdkIsQ0FBQyxDQUFDLFdBQVc7O1lBRVQsUUFBUSxHQUFHLGFBQWEsQ0FBQyxLQUFLOztZQUM5QixNQUFNLEdBQUcsYUFBYSxDQUFDLEdBQUc7O1lBRTFCLGFBQWEsR0FBRyxhQUFhLENBQUMsVUFBVTs7WUFFMUMsUUFBb0I7UUFDeEIsSUFBSSxjQUFjLEVBQUU7O2dCQUNaLEdBQUcsR0FBRyxJQUFJLFdBQVcsRUFBRTtZQUM3QixRQUFRLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUU7Z0JBQzFDLGNBQWMsRUFBRSxVQUFVO2dCQUMxQixpQkFBaUIsRUFBRSxVQUFVLElBQUksV0FBVzthQUM3QyxDQUFDLENBQUM7U0FDSjtRQUVELFFBQVEsUUFBUSxFQUFFO1lBQ2hCLEtBQUssTUFBTTtnQkFDVCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUMvRCxLQUFLLG1CQUFtQjtnQkFDdEIsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUNyQixlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLGdCQUFnQixDQUNqQixDQUFDO1lBQ0osS0FBSyxVQUFVO2dCQUNiLE9BQU8sUUFBUSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ2xFLEtBQUssUUFBUTtnQkFDWCxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUM1RCxLQUFLLG1CQUFtQjtnQkFDdEIsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUNyQixlQUFlLEVBQ2YsYUFBYSxFQUNiLFlBQVksQ0FDYixDQUFDO1lBQ0osS0FBSyx1QkFBdUI7Z0JBQzFCLE9BQU8sUUFBUSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDOUQsS0FBSyxnQ0FBZ0M7Z0JBQ25DLE9BQU8sUUFBUSxDQUFDLG9CQUFvQixDQUFDLGVBQWUsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUN2RSxLQUFLLFlBQVk7Z0JBQ2YsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDcEUsS0FBSyxnQkFBZ0I7Z0JBQ25CLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMxQyxLQUFLLG9CQUFvQjtnQkFDdkIsT0FBTyxRQUFRLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUMzRCxLQUFLLDZCQUE2QjtnQkFDaEMsT0FBTyxRQUFRLENBQUMsaUJBQWlCLENBQUMsZUFBZSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ3BFLEtBQUssZ0JBQWdCO2dCQUNuQixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQ2xCLGVBQWUsRUFDZixVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsRUFDNUMsV0FBVyxFQUNYLGFBQWEsRUFDYixhQUFhLEVBQ2IsWUFBWSxDQUNiLENBQUM7WUFDSixLQUFLLHNCQUFzQjtnQkFDekIsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUN4QixlQUFlLEVBQ2YsYUFBYSxFQUNiLFlBQVksQ0FDYixDQUFDO1lBQ0osS0FBSyxRQUFRO2dCQUNYLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ2hFLFVBQVU7WUFDVixLQUFLLEtBQUs7Z0JBQ1IsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDaEQsS0FBSyxJQUFJO2dCQUNQLE9BQU8sUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQy9DLEtBQUssS0FBSztnQkFDUixPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztZQUVoRDtnQkFDRSxPQUFPLFNBQVMsQ0FBQztTQUNwQjtJQUNILENBQUM7Ozs7Ozs7O0lBRU0sdURBQTZCOzs7Ozs7O0lBQXBDLFVBQ0UsWUFBaUIsRUFDakIsWUFBWSxFQUNaLE9BQVksRUFDWixLQUFVO1FBSlosaUJBbUNDO1FBaENDLHdCQUFBLEVBQUEsWUFBWTtRQUNaLHNCQUFBLEVBQUEsU0FBUyxDQUFDO1FBRVYsSUFBSSxZQUFZLFlBQVksS0FBSyxFQUFFO1lBQ2pDLFlBQVksQ0FBQyxPQUFPOzs7O1lBQUMsVUFBQSxPQUFPO2dCQUMxQixLQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FDeEIsS0FBSSxDQUFDLDZCQUE2QixDQUNoQyxPQUFPLEVBQ1AsWUFBWSxFQUNaLE9BQU8sRUFDUCxLQUFLLENBQ04sQ0FDRixDQUFDO1lBQ0osQ0FBQyxFQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsSUFBSSxZQUFZLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUMxQyxLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQ3hCLElBQUksQ0FBQyw2QkFBNkIsQ0FDaEMsWUFBWSxDQUFDLE9BQU8sRUFDcEIsWUFBWSxFQUNaLFlBQVksQ0FBQyxPQUFPLEVBQ3BCLEtBQUssQ0FDTixDQUNGLENBQUM7YUFDSDtpQkFBTSxJQUFJLFlBQVksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ2xELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUN0QixJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQ3BFLENBQUM7YUFDSDtTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdCLENBQUM7Ozs7Ozs7O0lBRU0sNENBQWtCOzs7Ozs7O0lBQXpCLFVBQ0Usa0JBQW1CLEVBQ25CLFlBQWEsRUFDYixLQUFTLEVBQ1QsYUFBb0I7UUFEcEIsc0JBQUEsRUFBQSxTQUFTO1FBQ1QsOEJBQUEsRUFBQSxvQkFBb0I7UUFFcEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQ3ZCLGtCQUFrQixHQUFHLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFLENBQUM7U0FDeEQ7O1lBQ0ssQ0FBQyxHQUFHO1lBQ1IsWUFBWSxFQUFFLEVBQUU7WUFDaEIsUUFBUSxFQUFFLEVBQUU7WUFDWixNQUFNLEVBQUUsRUFBRTtZQUNWLFFBQVEsRUFBRSxJQUFJLEVBQUU7WUFDaEIsS0FBSyxFQUFFLEVBQUU7WUFDVCxHQUFHLEVBQUUsRUFBRTtZQUNQLGFBQWEsRUFBRSxFQUFFO1lBQ2pCLGFBQWEsRUFBRSxFQUFFO1lBQ2pCLFVBQVUsRUFBRSxFQUFFO1lBQ2QsT0FBTyxFQUFFLEVBQUU7WUFDWCxRQUFRLEVBQUUsR0FBRztZQUNiLFVBQVUsRUFBRSxHQUFHO1lBQ2YsVUFBVSxFQUFFLEdBQUc7WUFDZixTQUFTLEVBQUUsSUFBSTtZQUNmLGtCQUFrQixFQUFFLEVBQUU7WUFDdEIsWUFBWSxFQUFFLEVBQUU7WUFDaEIsUUFBUSxFQUFFLEVBQUU7WUFDWixZQUFZLEVBQUUsRUFBRTtZQUNoQixNQUFNLEVBQUUsRUFBRTtZQUNWLE9BQU8sRUFBRSxFQUFFO1lBQ1gsYUFBYSxFQUFFLEVBQUU7WUFDakIsS0FBSyxFQUFFLENBQUM7U0FDVDtRQUVELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FDbEIsQ0FBQyxFQUNEO1lBQ0UsYUFBYSxlQUFBO1lBQ2IsS0FBSyxPQUFBO1lBQ0wsWUFBWSxjQUFBO1NBQ2IsRUFDRCxrQkFBa0IsQ0FDbkIsQ0FBQztJQUNKLENBQUM7Ozs7Ozs7O0lBRU0sbURBQXlCOzs7Ozs7O0lBQWhDLFVBQ0UsWUFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLElBQWtCLEVBQ2xCLE1BQWM7UUFKaEIsaUJBcUNDO1FBakNDLHVCQUFBLEVBQUEsY0FBYzs7WUFFUixXQUFXLEdBQUcsRUFBRTtRQUN0QixJQUFJLFlBQVksWUFBWSxLQUFLLEVBQUU7WUFDakMsWUFBWSxDQUFDLE9BQU87Ozs7WUFBQyxVQUFBLE9BQU87Z0JBQzFCLFdBQVcsQ0FBQyxJQUFJLENBQ2QsS0FBSSxDQUFDLHlCQUF5QixDQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQ3pFLENBQUM7WUFDSixDQUFDLEVBQUMsQ0FBQztZQUNILE9BQU8sV0FBVyxDQUFDO1NBQ3BCO2FBQU07WUFDTCxJQUFJLFlBQVksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQzFDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FDbEIsRUFBRSxFQUNGO29CQUNFLE9BQU8sRUFBRSxZQUFZLENBQUMsT0FBTztvQkFDN0IsT0FBTyxFQUFFLElBQUksQ0FBQyx5QkFBeUIsQ0FDckMsWUFBWSxDQUFDLE9BQU8sRUFDcEIsaUJBQWlCLEVBQ2pCLElBQUksRUFDSixNQUFNLENBQ1A7aUJBQ0YsQ0FDRixDQUFDO2FBQ0g7aUJBQU0sSUFBSSxZQUFZLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUNsRCxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FDN0IsbUJBQUEsWUFBWSxFQUE2QixFQUN6QyxpQkFBaUIsRUFDakIsSUFBSSxFQUNKLE1BQU0sQ0FDUCxDQUFDO2FBQ0g7U0FDRjtJQUNILENBQUM7Ozs7Ozs7OztJQUVPLDZDQUFtQjs7Ozs7Ozs7SUFBM0IsVUFDRSxrQkFBNkMsRUFDN0MsaUJBQWlCLEVBQ2pCLElBQWtCLEVBQ2xCLE1BQWM7UUFBZCx1QkFBQSxFQUFBLGNBQWM7O1lBRVIsUUFBUSxHQUFHLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUM7WUFDNUQsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLFFBQVE7WUFDN0IsQ0FBQyxDQUFDLElBQUksRUFBRTs7WUFDSixNQUFNLEdBQUcsa0JBQWtCLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQztZQUN4RCxDQUFDLENBQUMsa0JBQWtCLENBQUMsTUFBTTtZQUMzQixDQUFDLENBQUMsTUFBTTs7WUFFSixPQUFPLEdBQUcsa0JBQWtCLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztZQUMxRCxDQUFDLENBQUMsa0JBQWtCLENBQUMsT0FBTztZQUM1QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVc7UUFFdkMsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUNsQixFQUFFLEVBQ0Y7WUFDRSxRQUFRLFVBQUE7WUFDUixNQUFNLEVBQUUsTUFBTTtZQUNkLGtCQUFrQixFQUFFLGFBQWE7WUFDakMsT0FBTyxTQUFBO1NBQ1IsRUFDRCxrQkFBa0IsRUFDbEIsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsQ0FDcEMsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRU0sK0RBQXFDOzs7O0lBQTVDLFVBQ0UsUUFBcUM7UUFFckMsSUFBSSxRQUFRLFlBQVksS0FBSyxFQUFFO1lBQzdCLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7O29CQUNwQixtQkFBaUIsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYTs7b0JBQzdDLGFBQWdCOztvQkFDaEIsY0FBWSxHQUFHLEVBQUU7O29CQUNqQixxQkFBbUI7Z0JBQ3ZCLFFBQVEsQ0FBQyxPQUFPOzs7O2dCQUFDLFVBQUEsUUFBUTs7d0JBQ2pCLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUM7O3dCQUNyQyxLQUFLLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7b0JBQ3hDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7d0JBQzdDLGFBQVcsR0FBRyxRQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO3FCQUNuQzt5QkFBTTt3QkFDTCxhQUFXLEdBQUcsT0FBTyxDQUFDO3FCQUN2QjtvQkFDRCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUM7b0JBQ3RCLE9BQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQztvQkFDeEIsT0FBTyxPQUFPLENBQUMsYUFBYSxDQUFDO29CQUM3QixjQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUUzQixJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO3dCQUN6QixxQkFBbUIsR0FBRyxPQUFPLENBQUM7cUJBQy9CO3lCQUFNLElBQUksbUJBQWlCLEtBQUssYUFBVyxDQUFDLGFBQWEsRUFBRTt3QkFDMUQsSUFBSSxjQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTs0QkFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FDVCxrQkFBa0I7Z0NBQ2hCLG1DQUFtQztnQ0FDbkMsbUJBQWlCO2dDQUNqQixHQUFHLENBQ04sQ0FBQzt5QkFDSDs2QkFBTTs0QkFDTCxxQkFBbUIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUNqQyxFQUFFLEVBQ0YsRUFBRSxPQUFPLEVBQUUsbUJBQWlCLEVBQUUsT0FBTyxFQUFFLGNBQVksRUFBRSxDQUN0RCxDQUFDOzRCQUNGLGNBQVksR0FBRyxDQUFDLHFCQUFtQixDQUFDLENBQUM7NEJBQ3JDLG1CQUFpQixHQUFHLGFBQVcsQ0FBQyxhQUFhLENBQUM7eUJBQy9DO3FCQUNGO2dCQUNILENBQUMsRUFBQyxDQUFDO2dCQUNILE9BQU8scUJBQW1CLENBQUM7YUFDNUI7aUJBQU07Z0JBQ0wsT0FBTyxTQUFTLENBQUM7YUFDbEI7U0FDRjthQUFNO1lBQ0wsT0FBTyxTQUFTLENBQUM7U0FDbEI7SUFDSCxDQUFDOzs7Ozs7SUFFTyw4Q0FBb0I7Ozs7O0lBQTVCLFVBQTZCLFdBQTBCO1FBQ3JELElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLOzs7O1FBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsZUFBZSxLQUFLLFNBQVMsRUFBbkMsQ0FBbUMsRUFBQyxFQUFFO1lBQzFFLE9BQU8sV0FBVyxDQUFDO1NBQ3BCOztZQUNHLEVBQWlCO1FBQ3JCLElBQUksV0FBVyxDQUFDLE1BQU0sSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFO1lBQzdDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUs7Ozs7WUFBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxFQUFFLEtBQUssU0FBUyxFQUF2QixDQUF1QixFQUFDLEVBQUU7Z0JBQ2pFLE1BQU0sSUFBSSxLQUFLLENBQUMseURBQXlELENBQUMsQ0FBQzthQUM1RTtZQUNELEVBQUUsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3ZDLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTzs7OztZQUFDLFVBQUEsS0FBSztnQkFDckIsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUNyRCxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDdEQsS0FBSyxDQUFDLGVBQWUsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTTs7OztnQkFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBeEIsQ0FBd0IsRUFBQyxDQUFDLENBQUM7WUFDakcsQ0FBQyxFQUFDLENBQUM7U0FDSjthQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxJQUFJLFdBQVcsQ0FBQyxPQUFPLEVBQUU7WUFDckQsRUFBRSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdkMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLG1CQUFBLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFtQixDQUFDLENBQUM7U0FDekg7YUFBTTtZQUNMLEVBQUUsR0FBRztnQkFDSCxPQUFPLEVBQUUsbUJBQUEsV0FBVyxFQUF5QjtnQkFDN0MsTUFBTSxFQUFFO29CQUNOLG1CQUFBO3dCQUNFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVE7d0JBQy9CLGVBQWUsRUFBRSxtQkFBQSxXQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUF5QjtxQkFDNUUsRUFBbUI7aUJBQUM7YUFDeEIsQ0FBQztTQUNIO1FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSTs7OztRQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLE9BQU8sRUFBZixDQUFlLEVBQUMsRUFBRTtZQUMvQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7U0FDN0I7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7Ozs7Ozs7O0lBRU0sc0RBQTRCOzs7Ozs7O0lBQW5DLFVBQ0UsT0FBdUMsRUFDdkMsaUJBQXlCLEVBQ3pCLE1BQXlDLEVBQ3pDLElBQW1COztZQUNiLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVTtRQUNyQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsT0FBTztTQUNSOztZQUNHLDJCQUEyQixHQUFHLEVBQUU7O1lBQ2hDLGdDQUFnQyxHQUFHLEVBQUU7UUFDekMsSUFBSSxVQUFVLENBQUMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxXQUFXLEVBQUU7WUFDaEQsVUFBVSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDOztnQkFDckUsZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSTs7OztZQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE9BQU8sRUFBVCxDQUFTLEVBQUMsQ0FBQyxlQUFlOztnQkFDckYsWUFBVSxHQUFHLEVBQUU7WUFDckIsZ0JBQWdCLENBQUMsR0FBRzs7OztZQUFDLFVBQUEsWUFBWTs7b0JBQ3pCLGVBQWUsR0FBRyxFQUFFO2dCQUMxQixZQUFZLENBQUMsT0FBTztxQkFDakIsTUFBTTs7OztnQkFBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUF0QixDQUFzQixFQUFDO3FCQUN2QyxPQUFPOzs7O2dCQUFDLFVBQUEsU0FBUyxJQUFJLE9BQUEsZUFBZSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQXZDLENBQXVDLEVBQUMsQ0FBQztnQkFDakUsSUFBSSxlQUFlLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDaEMsWUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDckM7cUJBQU0sSUFBSSxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDckMsWUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxZQUFZLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDO2lCQUM5RTtZQUNILENBQUMsRUFBQyxDQUFDO1lBQ0gsSUFBSSxZQUFVLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtnQkFDMUIsMkJBQTJCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FDMUMsWUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxZQUFVLEVBQUUsRUFDakYsTUFBTSxFQUNOLElBQUksRUFDSixVQUFVLENBQUMsWUFBWSxDQUN4QixDQUFDO2FBQ0w7U0FDRjtRQUVELElBQUksVUFBVSxDQUFDLE9BQU8sSUFBSSxVQUFVLENBQUMsT0FBTyxFQUFFO1lBQzVDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDLFlBQVksSUFBSSxpQkFBaUIsQ0FBQzs7Z0JBQ2pFLFVBQVUsR0FBRyxVQUFVLENBQUMsT0FBTztZQUNyQyxnQ0FBZ0MsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUN4Rzs7WUFFRyxpQkFBaUIsR0FBRyxVQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLGdDQUFnQyxDQUFDLENBQUMsQ0FBQywyQkFBMkI7UUFDdEgsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRTtZQUMxQixpQkFBaUIsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxtQkFBQSxPQUFPLEVBQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN0RztRQUNELElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7WUFDMUIsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLGlCQUFpQixFQUFFLENBQUMsbUJBQUEsT0FBTyxFQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDNUc7UUFFRCxPQUFPLGlCQUFpQixDQUFDO0lBRTNCLENBQUM7Ozs7OztJQUVNLGtEQUF3Qjs7Ozs7SUFBL0IsVUFDRSxlQUF1QixFQUN2QixpQkFBeUI7O1lBQ3JCLGFBQWEsR0FBRyxFQUFFO1FBQ3RCLElBQUksZUFBZSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3pFLGFBQWEsR0FBRyxlQUFlLENBQUM7U0FDakM7YUFBTTtZQUNMLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPOzs7O1lBQUMsVUFBQSxnQkFBZ0I7Z0JBQ25ELGFBQWEsR0FBTSxhQUFhLFNBQUksZUFBZSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLE1BQUcsQ0FBQztZQUNoRixDQUFDLEVBQUMsQ0FBQztTQUNKOztZQUNLLFdBQVcsR0FBRyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7UUFDL0YsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQXZnQkQsSUF1Z0JDOzs7Ozs7O0lBdGdCQyx5Q0FBeUQ7O0lBQ3pELG9DQWNFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgb2xmaWx0ZXIgZnJvbSAnb2wvZm9ybWF0L2ZpbHRlcic7XHJcbmltcG9ydCBvbEZvcm1hdFdLVCBmcm9tICdvbC9mb3JtYXQvV0tUJztcclxuaW1wb3J0IG9sRm9ybWF0V0ZTIGZyb20gJ29sL2Zvcm1hdC9XRlMnO1xyXG5pbXBvcnQgb2xHZW9tZXRyeSBmcm9tICdvbC9nZW9tL0dlb21ldHJ5JztcclxuXHJcbmltcG9ydCBvbFByb2plY3Rpb24gZnJvbSAnb2wvcHJvai9Qcm9qZWN0aW9uJztcclxuXHJcbmltcG9ydCB7IHV1aWQsIE9iamVjdFV0aWxzIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5cclxuaW1wb3J0IHtcclxuICBPZ2NGaWx0ZXIsXHJcbiAgSWdvT2djRmlsdGVyT2JqZWN0LFxyXG4gIFdGU1dyaXRlR2V0RmVhdHVyZU9wdGlvbnMsXHJcbiAgQW55QmFzZU9nY0ZpbHRlck9wdGlvbnMsXHJcbiAgT2djSW50ZXJmYWNlRmlsdGVyT3B0aW9ucyxcclxuICBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgT2djRmlsdGVyc09wdGlvbnMsXHJcbiAgSWdvUHVzaEJ1dHRvbixcclxuICBQdXNoQnV0dG9uR3JvdXAsXHJcbiAgT2djUHVzaEJ1dHRvbkJ1bmRsZVxyXG59IGZyb20gJy4vb2djLWZpbHRlci5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE9nY0ZpbHRlcldyaXRlciB7XHJcbiAgcHJpdmF0ZSBmaWx0ZXJTZXF1ZW5jZTogT2djSW50ZXJmYWNlRmlsdGVyT3B0aW9uc1tdID0gW107XHJcbiAgcHVibGljIG9wZXJhdG9ycyA9IHtcclxuICAgIFByb3BlcnR5SXNFcXVhbFRvOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbXSB9LFxyXG4gICAgUHJvcGVydHlJc05vdEVxdWFsVG86IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFtdIH0sXHJcbiAgICBQcm9wZXJ0eUlzTGlrZTogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogWydzdHJpbmcnXSB9LFxyXG4gICAgUHJvcGVydHlJc0dyZWF0ZXJUaGFuOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbJ251bWJlciddIH0sXHJcbiAgICBQcm9wZXJ0eUlzR3JlYXRlclRoYW5PckVxdWFsVG86IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFsnbnVtYmVyJ10gfSxcclxuICAgIFByb3BlcnR5SXNMZXNzVGhhbjogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogWydudW1iZXInXSB9LFxyXG4gICAgUHJvcGVydHlJc0xlc3NUaGFuT3JFcXVhbFRvOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbJ251bWJlciddIH0sXHJcbiAgICBQcm9wZXJ0eUlzQmV0d2VlbjogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogWydudW1iZXInXSB9LFxyXG4gICAgRHVyaW5nOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbXSB9LFxyXG4gICAgUHJvcGVydHlJc051bGw6IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFtdIH0sXHJcbiAgICBJbnRlcnNlY3RzOiB7IHNwYXRpYWw6IHRydWUsIGZpZWxkUmVzdHJpY3Q6IFtdIH0sXHJcbiAgICBXaXRoaW46IHsgc3BhdGlhbDogdHJ1ZSwgZmllbGRSZXN0cmljdDogW10gfSxcclxuICAgIENvbnRhaW5zOiB7IHNwYXRpYWw6IHRydWUsIGZpZWxkUmVzdHJpY3Q6IFtdIH1cclxuICB9O1xyXG5cclxuICBkZWZpbmVPZ2NGaWx0ZXJzRGVmYXVsdE9wdGlvbnMoXHJcbiAgICBvZ2NGaWx0ZXJzT3B0aW9uczogT2djRmlsdGVyc09wdGlvbnMsXHJcbiAgICBmaWVsZE5hbWVHZW9tZXRyeTogc3RyaW5nLFxyXG4gICAgc3JjVHlwZT86IHN0cmluZyk6IE9nY0ZpbHRlcnNPcHRpb25zICB7XHJcbiAgICBsZXQgb2djRmlsdGVyc0RlZmF1bHRWYWx1ZSA9IHRydWU7IC8vIGRlZmF1bHQgdmFsdWVzIGZvciB3ZnMuXHJcbiAgICBpZiAoc3JjVHlwZSAmJiBzcmNUeXBlID09PSAnd21zJykge1xyXG4gICAgICBvZ2NGaWx0ZXJzRGVmYXVsdFZhbHVlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb2djRmlsdGVyc09wdGlvbnMgPSBvZ2NGaWx0ZXJzT3B0aW9ucyB8fCB7fTtcclxuICAgIG9nY0ZpbHRlcnNPcHRpb25zLmVuYWJsZWQgPSBvZ2NGaWx0ZXJzT3B0aW9ucy5lbmFibGVkID09PSB1bmRlZmluZWQgPyBvZ2NGaWx0ZXJzRGVmYXVsdFZhbHVlIDogb2djRmlsdGVyc09wdGlvbnMuZW5hYmxlZDtcclxuICAgIG9nY0ZpbHRlcnNPcHRpb25zLmVkaXRhYmxlID0gb2djRmlsdGVyc09wdGlvbnMuZWRpdGFibGUgPT09IHVuZGVmaW5lZCA/IG9nY0ZpbHRlcnNEZWZhdWx0VmFsdWUgOiBvZ2NGaWx0ZXJzT3B0aW9ucy5lZGl0YWJsZTtcclxuICAgIG9nY0ZpbHRlcnNPcHRpb25zLmdlb21ldHJ5TmFtZSA9IGZpZWxkTmFtZUdlb21ldHJ5O1xyXG5cclxuICAgIG9nY0ZpbHRlcnNPcHRpb25zLmFkdmFuY2VkT2djRmlsdGVycyA9IHRydWU7XHJcbiAgICBpZiAob2djRmlsdGVyc09wdGlvbnMuZW5hYmxlZCAmJiBvZ2NGaWx0ZXJzT3B0aW9ucy5wdXNoQnV0dG9ucykge1xyXG4gICAgICBvZ2NGaWx0ZXJzT3B0aW9ucy5hZHZhbmNlZE9nY0ZpbHRlcnMgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBvZ2NGaWx0ZXJzT3B0aW9ucztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBidWlsZEZpbHRlcihcclxuICAgIGZpbHRlcnM/OiBJZ29PZ2NGaWx0ZXJPYmplY3QsXHJcbiAgICBleHRlbnQ/OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcclxuICAgIHByb2o/OiBvbFByb2plY3Rpb24sXHJcbiAgICBmaWVsZE5hbWVHZW9tZXRyeT86IHN0cmluZ1xyXG4gICk6IHN0cmluZyB7XHJcbiAgICBsZXQgb3VyQmJveEZpbHRlcjtcclxuICAgIGxldCBlbmFibGVCYm94OiBib29sZWFuO1xyXG4gICAgaWYgKC9pbnRlcnNlY3RzfGNvbnRhaW5zfHdpdGhpbi9naS50ZXN0KEpTT04uc3RyaW5naWZ5KGZpbHRlcnMpKSkge1xyXG4gICAgICBlbmFibGVCYm94ID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlbmFibGVCYm94ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChmaWx0ZXJzKSB7XHJcbiAgICAgIGZpZWxkTmFtZUdlb21ldHJ5ID1cclxuICAgICAgICAoZmlsdGVycyBhcyBhbnkpLmdlb21ldHJ5TmFtZSAhPT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICA/IChmaWx0ZXJzIGFzIGFueSkuZ2VvbWV0cnlOYW1lXHJcbiAgICAgICAgICA6IGZpZWxkTmFtZUdlb21ldHJ5O1xyXG4gICAgfVxyXG4gICAgaWYgKGV4dGVudCAmJiBmaWx0ZXJzKSB7XHJcbiAgICAgIG91ckJib3hGaWx0ZXIgPSBvbGZpbHRlci5iYm94KGZpZWxkTmFtZUdlb21ldHJ5LCBleHRlbnQsIHByb2ouZ2V0Q29kZSgpKTtcclxuICAgIH1cclxuICAgIGxldCBmaWx0ZXJBc3NlbWJseTogT2djRmlsdGVyO1xyXG4gICAgaWYgKGZpbHRlcnMpIHtcclxuICAgICAgZmlsdGVycyA9IHRoaXMuY2hlY2tJZ29GaWx0ZXJzUHJvcGVydGllcyhmaWx0ZXJzLCBmaWVsZE5hbWVHZW9tZXRyeSwgcHJvaik7XHJcbiAgICAgIGlmIChleHRlbnQgJiYgZW5hYmxlQmJveCkge1xyXG4gICAgICAgIGZpbHRlckFzc2VtYmx5ID0gb2xmaWx0ZXIuYW5kKFxyXG4gICAgICAgICAgb3VyQmJveEZpbHRlcixcclxuICAgICAgICAgIHRoaXMuYnVuZGxlRmlsdGVyKGZpbHRlcnMpXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmaWx0ZXJBc3NlbWJseSA9IHRoaXMuYnVuZGxlRmlsdGVyKGZpbHRlcnMpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gJ2Jib3g9JyArIGV4dGVudC5qb2luKCcsJykgKyAnLCcgKyBwcm9qLmdldENvZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB3ZnNPcHRpb25zOiBXRlNXcml0ZUdldEZlYXR1cmVPcHRpb25zID0ge1xyXG4gICAgICBzcnNOYW1lOiAnJyxcclxuICAgICAgZmVhdHVyZU5TOiAnJyxcclxuICAgICAgZmVhdHVyZVByZWZpeDogJycsXHJcbiAgICAgIGZlYXR1cmVUeXBlczogWydmZWF0dXJlVHlwZXMnXSxcclxuICAgICAgZmlsdGVyOiBmaWx0ZXJBc3NlbWJseSxcclxuICAgICAgb3V0cHV0Rm9ybWF0OiAnJyxcclxuICAgICAgZ2VvbWV0cnlOYW1lOiBmaWVsZE5hbWVHZW9tZXRyeVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBxdWVyeSA9IG5ldyBvbEZvcm1hdFdGUygpLndyaXRlR2V0RmVhdHVyZSh3ZnNPcHRpb25zKTtcclxuICAgIGNvbnN0IHN0ciA9IG5ldyBYTUxTZXJpYWxpemVyKCkuc2VyaWFsaXplVG9TdHJpbmcocXVlcnkpO1xyXG4gICAgY29uc3QgcmVnZXhwMSA9IC90eXBlbmFtZXMgKj18dHlwZW5hbWUgKj1cXFwiZmVhdHVyZVR5cGVzXFxcIiAqPi9naTtcclxuICAgIGNvbnN0IHJlZ2V4cDIgPSAvPFxcL1F1ZXJ5PjxcXC9HZXRGZWF0dXJlPi9naTtcclxuXHJcbiAgICByZXR1cm4gJ2ZpbHRlcj0nICsgc3RyLnNwbGl0KHJlZ2V4cDEpWzFdLnNwbGl0KHJlZ2V4cDIpWzBdO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBidW5kbGVGaWx0ZXIoZmlsdGVyT2JqZWN0OiBhbnkpIHtcclxuICAgIGlmIChmaWx0ZXJPYmplY3QgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICBjb25zdCBsb2dpY2FsQXJyYXkgPSBbXTtcclxuICAgICAgZmlsdGVyT2JqZWN0LmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgbG9naWNhbEFycmF5LnB1c2godGhpcy5idW5kbGVGaWx0ZXIoZWxlbWVudCkpO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIGxvZ2ljYWxBcnJheTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChmaWx0ZXJPYmplY3QuaGFzT3duUHJvcGVydHkoJ2xvZ2ljYWwnKSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUZpbHRlcih7XHJcbiAgICAgICAgICBvcGVyYXRvcjogZmlsdGVyT2JqZWN0LmxvZ2ljYWwsXHJcbiAgICAgICAgICBsb2dpY2FsQXJyYXk6IHRoaXMuYnVuZGxlRmlsdGVyKGZpbHRlck9iamVjdC5maWx0ZXJzKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2UgaWYgKGZpbHRlck9iamVjdC5oYXNPd25Qcm9wZXJ0eSgnb3BlcmF0b3InKSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUZpbHRlcihmaWx0ZXJPYmplY3QgYXMgQW55QmFzZU9nY0ZpbHRlck9wdGlvbnMpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUZpbHRlcihmaWx0ZXJPcHRpb25zKTogT2djRmlsdGVyIHtcclxuICAgIGNvbnN0IG9wZXJhdG9yID0gZmlsdGVyT3B0aW9ucy5vcGVyYXRvcjtcclxuICAgIGNvbnN0IGxvZ2ljYWxBcnJheSA9IGZpbHRlck9wdGlvbnMubG9naWNhbEFycmF5O1xyXG5cclxuICAgIGNvbnN0IHdmc1Byb3BlcnR5TmFtZSA9IGZpbHRlck9wdGlvbnMucHJvcGVydHlOYW1lO1xyXG4gICAgY29uc3Qgd2ZzUGF0dGVybiA9IGZpbHRlck9wdGlvbnMucGF0dGVybjtcclxuICAgIGNvbnN0IHdmc01hdGNoQ2FzZSA9IGZpbHRlck9wdGlvbnMubWF0Y2hDYXNlXHJcbiAgICAgID8gZmlsdGVyT3B0aW9ucy5tYXRjaENhc2VcclxuICAgICAgOiB0cnVlO1xyXG4gICAgY29uc3Qgd2ZzV2lsZENhcmQgPSBmaWx0ZXJPcHRpb25zLndpbGRDYXJkID8gZmlsdGVyT3B0aW9ucy53aWxkQ2FyZCA6ICcqJztcclxuICAgIGNvbnN0IHdmc1NpbmdsZUNoYXIgPSBmaWx0ZXJPcHRpb25zLnNpbmdsZUNoYXJcclxuICAgICAgPyBmaWx0ZXJPcHRpb25zLnNpbmdsZUNoYXJcclxuICAgICAgOiAnLic7XHJcbiAgICBjb25zdCB3ZnNFc2NhcGVDaGFyID0gZmlsdGVyT3B0aW9ucy5lc2NhcGVDaGFyXHJcbiAgICAgID8gZmlsdGVyT3B0aW9ucy5lc2NhcGVDaGFyXHJcbiAgICAgIDogJyEnO1xyXG5cclxuICAgIGNvbnN0IHdmc0xvd2VyQm91bmRhcnkgPSBmaWx0ZXJPcHRpb25zLmxvd2VyQm91bmRhcnk7XHJcbiAgICBjb25zdCB3ZnNVcHBlckJvdW5kYXJ5ID0gZmlsdGVyT3B0aW9ucy51cHBlckJvdW5kYXJ5O1xyXG5cclxuICAgIGNvbnN0IHdmc0dlb21ldHJ5TmFtZSA9IGZpbHRlck9wdGlvbnMuZ2VvbWV0cnlOYW1lO1xyXG4gICAgY29uc3Qgd2ZzRXh0ZW50ID0gZmlsdGVyT3B0aW9ucy5leHRlbnQ7XHJcbiAgICBjb25zdCB3ZnNXa3RHZW9tZXRyeSA9IGZpbHRlck9wdGlvbnMud2t0X2dlb21ldHJ5O1xyXG4gICAgY29uc3Qgd2ZzU3JzTmFtZSA9IGZpbHRlck9wdGlvbnMuc3JzTmFtZVxyXG4gICAgICA/IGZpbHRlck9wdGlvbnMuc3JzTmFtZVxyXG4gICAgICA6ICdFUFNHOjM4NTcnO1xyXG5cclxuICAgIGNvbnN0IHdmc0JlZ2luID0gZmlsdGVyT3B0aW9ucy5iZWdpbjtcclxuICAgIGNvbnN0IHdmc0VuZCA9IGZpbHRlck9wdGlvbnMuZW5kO1xyXG5cclxuICAgIGNvbnN0IHdmc0V4cHJlc3Npb24gPSBmaWx0ZXJPcHRpb25zLmV4cHJlc3Npb247XHJcblxyXG4gICAgbGV0IGdlb21ldHJ5OiBvbEdlb21ldHJ5O1xyXG4gICAgaWYgKHdmc1drdEdlb21ldHJ5KSB7XHJcbiAgICAgIGNvbnN0IHdrdCA9IG5ldyBvbEZvcm1hdFdLVCgpO1xyXG4gICAgICBnZW9tZXRyeSA9IHdrdC5yZWFkR2VvbWV0cnkod2ZzV2t0R2VvbWV0cnksIHtcclxuICAgICAgICBkYXRhUHJvamVjdGlvbjogd2ZzU3JzTmFtZSxcclxuICAgICAgICBmZWF0dXJlUHJvamVjdGlvbjogd2ZzU3JzTmFtZSB8fCAnRVBTRzozODU3J1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzd2l0Y2ggKG9wZXJhdG9yKSB7XHJcbiAgICAgIGNhc2UgJ0JCT1gnOlxyXG4gICAgICAgIHJldHVybiBvbGZpbHRlci5iYm94KHdmc0dlb21ldHJ5TmFtZSwgd2ZzRXh0ZW50LCB3ZnNTcnNOYW1lKTtcclxuICAgICAgY2FzZSAnUHJvcGVydHlJc0JldHdlZW4nOlxyXG4gICAgICAgIHJldHVybiBvbGZpbHRlci5iZXR3ZWVuKFxyXG4gICAgICAgICAgd2ZzUHJvcGVydHlOYW1lLFxyXG4gICAgICAgICAgd2ZzTG93ZXJCb3VuZGFyeSxcclxuICAgICAgICAgIHdmc1VwcGVyQm91bmRhcnlcclxuICAgICAgICApO1xyXG4gICAgICBjYXNlICdDb250YWlucyc6XHJcbiAgICAgICAgcmV0dXJuIG9sZmlsdGVyLmNvbnRhaW5zKHdmc0dlb21ldHJ5TmFtZSwgZ2VvbWV0cnksIHdmc1Nyc05hbWUpO1xyXG4gICAgICBjYXNlICdEdXJpbmcnOlxyXG4gICAgICAgIHJldHVybiBvbGZpbHRlci5kdXJpbmcod2ZzUHJvcGVydHlOYW1lLCB3ZnNCZWdpbiwgd2ZzRW5kKTtcclxuICAgICAgY2FzZSAnUHJvcGVydHlJc0VxdWFsVG8nOlxyXG4gICAgICAgIHJldHVybiBvbGZpbHRlci5lcXVhbFRvKFxyXG4gICAgICAgICAgd2ZzUHJvcGVydHlOYW1lLFxyXG4gICAgICAgICAgd2ZzRXhwcmVzc2lvbixcclxuICAgICAgICAgIHdmc01hdGNoQ2FzZVxyXG4gICAgICAgICk7XHJcbiAgICAgIGNhc2UgJ1Byb3BlcnR5SXNHcmVhdGVyVGhhbic6XHJcbiAgICAgICAgcmV0dXJuIG9sZmlsdGVyLmdyZWF0ZXJUaGFuKHdmc1Byb3BlcnR5TmFtZSwgd2ZzRXhwcmVzc2lvbik7XHJcbiAgICAgIGNhc2UgJ1Byb3BlcnR5SXNHcmVhdGVyVGhhbk9yRXF1YWxUbyc6XHJcbiAgICAgICAgcmV0dXJuIG9sZmlsdGVyLmdyZWF0ZXJUaGFuT3JFcXVhbFRvKHdmc1Byb3BlcnR5TmFtZSwgd2ZzRXhwcmVzc2lvbik7XHJcbiAgICAgIGNhc2UgJ0ludGVyc2VjdHMnOlxyXG4gICAgICAgIHJldHVybiBvbGZpbHRlci5pbnRlcnNlY3RzKHdmc0dlb21ldHJ5TmFtZSwgZ2VvbWV0cnksIHdmc1Nyc05hbWUpO1xyXG4gICAgICBjYXNlICdQcm9wZXJ0eUlzTnVsbCc6XHJcbiAgICAgICAgcmV0dXJuIG9sZmlsdGVyLmlzTnVsbCh3ZnNQcm9wZXJ0eU5hbWUpO1xyXG4gICAgICBjYXNlICdQcm9wZXJ0eUlzTGVzc1RoYW4nOlxyXG4gICAgICAgIHJldHVybiBvbGZpbHRlci5sZXNzVGhhbih3ZnNQcm9wZXJ0eU5hbWUsIHdmc0V4cHJlc3Npb24pO1xyXG4gICAgICBjYXNlICdQcm9wZXJ0eUlzTGVzc1RoYW5PckVxdWFsVG8nOlxyXG4gICAgICAgIHJldHVybiBvbGZpbHRlci5sZXNzVGhhbk9yRXF1YWxUbyh3ZnNQcm9wZXJ0eU5hbWUsIHdmc0V4cHJlc3Npb24pO1xyXG4gICAgICBjYXNlICdQcm9wZXJ0eUlzTGlrZSc6XHJcbiAgICAgICAgcmV0dXJuIG9sZmlsdGVyLmxpa2UoXHJcbiAgICAgICAgICB3ZnNQcm9wZXJ0eU5hbWUsXHJcbiAgICAgICAgICB3ZnNQYXR0ZXJuLnJlcGxhY2UoL1soKV9dL2dpLCB3ZnNTaW5nbGVDaGFyKSxcclxuICAgICAgICAgIHdmc1dpbGRDYXJkLFxyXG4gICAgICAgICAgd2ZzU2luZ2xlQ2hhcixcclxuICAgICAgICAgIHdmc0VzY2FwZUNoYXIsXHJcbiAgICAgICAgICB3ZnNNYXRjaENhc2VcclxuICAgICAgICApO1xyXG4gICAgICBjYXNlICdQcm9wZXJ0eUlzTm90RXF1YWxUbyc6XHJcbiAgICAgICAgcmV0dXJuIG9sZmlsdGVyLm5vdEVxdWFsVG8oXHJcbiAgICAgICAgICB3ZnNQcm9wZXJ0eU5hbWUsXHJcbiAgICAgICAgICB3ZnNFeHByZXNzaW9uLFxyXG4gICAgICAgICAgd2ZzTWF0Y2hDYXNlXHJcbiAgICAgICAgKTtcclxuICAgICAgY2FzZSAnV2l0aGluJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIud2l0aGluKHdmc0dlb21ldHJ5TmFtZSwgZ2VvbWV0cnksIHdmc1Nyc05hbWUpO1xyXG4gICAgICAvLyBMT0dJQ0FMXHJcbiAgICAgIGNhc2UgJ0FuZCc6XHJcbiAgICAgICAgcmV0dXJuIG9sZmlsdGVyLmFuZC5hcHBseShudWxsLCBsb2dpY2FsQXJyYXkpO1xyXG4gICAgICBjYXNlICdPcic6XHJcbiAgICAgICAgcmV0dXJuIG9sZmlsdGVyLm9yLmFwcGx5KG51bGwsIGxvZ2ljYWxBcnJheSk7XHJcbiAgICAgIGNhc2UgJ05vdCc6XHJcbiAgICAgICAgcmV0dXJuIG9sZmlsdGVyLm5vdC5hcHBseShudWxsLCBsb2dpY2FsQXJyYXkpO1xyXG5cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGRlZmluZUludGVyZmFjZUZpbHRlclNlcXVlbmNlKFxyXG4gICAgZmlsdGVyT2JqZWN0OiBhbnksXHJcbiAgICBnZW9tZXRyeU5hbWUsXHJcbiAgICBsb2dpY2FsID0gJycsXHJcbiAgICBsZXZlbCA9IC0xXHJcbiAgKTogT2djSW50ZXJmYWNlRmlsdGVyT3B0aW9uc1tdIHtcclxuICAgIGlmIChmaWx0ZXJPYmplY3QgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICBmaWx0ZXJPYmplY3QuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICB0aGlzLmZpbHRlclNlcXVlbmNlLmNvbmNhdChcclxuICAgICAgICAgIHRoaXMuZGVmaW5lSW50ZXJmYWNlRmlsdGVyU2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGVsZW1lbnQsXHJcbiAgICAgICAgICAgIGdlb21ldHJ5TmFtZSxcclxuICAgICAgICAgICAgbG9naWNhbCxcclxuICAgICAgICAgICAgbGV2ZWxcclxuICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChmaWx0ZXJPYmplY3QuaGFzT3duUHJvcGVydHkoJ2xvZ2ljYWwnKSkge1xyXG4gICAgICAgIGxldmVsID0gbGV2ZWwgKyAxO1xyXG4gICAgICAgIHRoaXMuZmlsdGVyU2VxdWVuY2UuY29uY2F0KFxyXG4gICAgICAgICAgdGhpcy5kZWZpbmVJbnRlcmZhY2VGaWx0ZXJTZXF1ZW5jZShcclxuICAgICAgICAgICAgZmlsdGVyT2JqZWN0LmZpbHRlcnMsXHJcbiAgICAgICAgICAgIGdlb21ldHJ5TmFtZSxcclxuICAgICAgICAgICAgZmlsdGVyT2JqZWN0LmxvZ2ljYWwsXHJcbiAgICAgICAgICAgIGxldmVsXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIGlmIChmaWx0ZXJPYmplY3QuaGFzT3duUHJvcGVydHkoJ29wZXJhdG9yJykpIHtcclxuICAgICAgICB0aGlzLmZpbHRlclNlcXVlbmNlLnB1c2goXHJcbiAgICAgICAgICB0aGlzLmFkZEludGVyZmFjZUZpbHRlcihmaWx0ZXJPYmplY3QsIGdlb21ldHJ5TmFtZSwgbGV2ZWwsIGxvZ2ljYWwpXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyU2VxdWVuY2U7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkSW50ZXJmYWNlRmlsdGVyKFxyXG4gICAgaWdvT2djRmlsdGVyT2JqZWN0PyxcclxuICAgIGdlb21ldHJ5TmFtZT8sXHJcbiAgICBsZXZlbCA9IDAsXHJcbiAgICBwYXJlbnRMb2dpY2FsID0gJ09yJ1xyXG4gICk6IE9nY0ludGVyZmFjZUZpbHRlck9wdGlvbnMge1xyXG4gICAgaWYgKCFpZ29PZ2NGaWx0ZXJPYmplY3QpIHtcclxuICAgICAgaWdvT2djRmlsdGVyT2JqZWN0ID0geyBvcGVyYXRvcjogJ1Byb3BlcnR5SXNFcXVhbFRvJyB9O1xyXG4gICAgfVxyXG4gICAgY29uc3QgZiA9IHtcclxuICAgICAgcHJvcGVydHlOYW1lOiAnJyxcclxuICAgICAgb3BlcmF0b3I6ICcnLFxyXG4gICAgICBhY3RpdmU6ICcnLFxyXG4gICAgICBmaWx0ZXJpZDogdXVpZCgpLFxyXG4gICAgICBiZWdpbjogJycsXHJcbiAgICAgIGVuZDogJycsXHJcbiAgICAgIGxvd2VyQm91bmRhcnk6ICcnLFxyXG4gICAgICB1cHBlckJvdW5kYXJ5OiAnJyxcclxuICAgICAgZXhwcmVzc2lvbjogJycsXHJcbiAgICAgIHBhdHRlcm46ICcnLFxyXG4gICAgICB3aWxkQ2FyZDogJyonLFxyXG4gICAgICBzaW5nbGVDaGFyOiAnLicsXHJcbiAgICAgIGVzY2FwZUNoYXI6ICchJyxcclxuICAgICAgbWF0Y2hDYXNlOiB0cnVlLFxyXG4gICAgICBpZ29TcGF0aWFsU2VsZWN0b3I6ICcnLFxyXG4gICAgICBnZW9tZXRyeU5hbWU6ICcnLFxyXG4gICAgICBnZW9tZXRyeTogJycsXHJcbiAgICAgIHdrdF9nZW9tZXRyeTogJycsXHJcbiAgICAgIGV4dGVudDogJycsXHJcbiAgICAgIHNyc05hbWU6ICcnLFxyXG4gICAgICBwYXJlbnRMb2dpY2FsOiAnJyxcclxuICAgICAgbGV2ZWw6IDBcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXHJcbiAgICAgIGYsXHJcbiAgICAgIHtcclxuICAgICAgICBwYXJlbnRMb2dpY2FsLFxyXG4gICAgICAgIGxldmVsLFxyXG4gICAgICAgIGdlb21ldHJ5TmFtZVxyXG4gICAgICB9LFxyXG4gICAgICBpZ29PZ2NGaWx0ZXJPYmplY3RcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2hlY2tJZ29GaWx0ZXJzUHJvcGVydGllcyhcclxuICAgIGZpbHRlck9iamVjdDogYW55LFxyXG4gICAgZmllbGROYW1lR2VvbWV0cnksXHJcbiAgICBwcm9qOiBvbFByb2plY3Rpb24sXHJcbiAgICBhY3RpdmUgPSBmYWxzZVxyXG4gICkge1xyXG4gICAgY29uc3QgZmlsdGVyQXJyYXkgPSBbXTtcclxuICAgIGlmIChmaWx0ZXJPYmplY3QgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICBmaWx0ZXJPYmplY3QuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICBmaWx0ZXJBcnJheS5wdXNoKFxyXG4gICAgICAgICAgdGhpcy5jaGVja0lnb0ZpbHRlcnNQcm9wZXJ0aWVzKGVsZW1lbnQsIGZpZWxkTmFtZUdlb21ldHJ5LCBwcm9qLCBhY3RpdmUpXHJcbiAgICAgICAgKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBmaWx0ZXJBcnJheTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChmaWx0ZXJPYmplY3QuaGFzT3duUHJvcGVydHkoJ2xvZ2ljYWwnKSkge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKFxyXG4gICAgICAgICAge30sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxvZ2ljYWw6IGZpbHRlck9iamVjdC5sb2dpY2FsLFxyXG4gICAgICAgICAgICBmaWx0ZXJzOiB0aGlzLmNoZWNrSWdvRmlsdGVyc1Byb3BlcnRpZXMoXHJcbiAgICAgICAgICAgICAgZmlsdGVyT2JqZWN0LmZpbHRlcnMsXHJcbiAgICAgICAgICAgICAgZmllbGROYW1lR2VvbWV0cnksXHJcbiAgICAgICAgICAgICAgcHJvaixcclxuICAgICAgICAgICAgICBhY3RpdmVcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSBpZiAoZmlsdGVyT2JqZWN0Lmhhc093blByb3BlcnR5KCdvcGVyYXRvcicpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkRmlsdGVyUHJvcGVydGllcyhcclxuICAgICAgICAgIGZpbHRlck9iamVjdCBhcyBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zLFxyXG4gICAgICAgICAgZmllbGROYW1lR2VvbWV0cnksXHJcbiAgICAgICAgICBwcm9qLFxyXG4gICAgICAgICAgYWN0aXZlXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRGaWx0ZXJQcm9wZXJ0aWVzKFxyXG4gICAgaWdvT2djRmlsdGVyT2JqZWN0OiBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zLFxyXG4gICAgZmllbGROYW1lR2VvbWV0cnksXHJcbiAgICBwcm9qOiBvbFByb2plY3Rpb24sXHJcbiAgICBhY3RpdmUgPSBmYWxzZVxyXG4gICkge1xyXG4gICAgY29uc3QgZmlsdGVyaWQgPSBpZ29PZ2NGaWx0ZXJPYmplY3QuaGFzT3duUHJvcGVydHkoJ2ZpbHRlcmlkJylcclxuICAgICAgPyBpZ29PZ2NGaWx0ZXJPYmplY3QuZmlsdGVyaWRcclxuICAgICAgOiB1dWlkKCk7XHJcbiAgICBjb25zdCBzdGF0dXMgPSBpZ29PZ2NGaWx0ZXJPYmplY3QuaGFzT3duUHJvcGVydHkoJ2FjdGl2ZScpXHJcbiAgICAgID8gaWdvT2djRmlsdGVyT2JqZWN0LmFjdGl2ZVxyXG4gICAgICA6IGFjdGl2ZTtcclxuXHJcbiAgICBjb25zdCBzcnNOYW1lID0gaWdvT2djRmlsdGVyT2JqZWN0Lmhhc093blByb3BlcnR5KCdzcnNOYW1lJylcclxuICAgICAgPyBpZ29PZ2NGaWx0ZXJPYmplY3Quc3JzTmFtZVxyXG4gICAgICA6IHByb2ogPyBwcm9qLmdldENvZGUoKSA6ICdFUFNHOjM4NTcnO1xyXG5cclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKFxyXG4gICAgICB7fSxcclxuICAgICAge1xyXG4gICAgICAgIGZpbHRlcmlkLFxyXG4gICAgICAgIGFjdGl2ZTogc3RhdHVzLFxyXG4gICAgICAgIGlnb1NwYXRpYWxTZWxlY3RvcjogJ2ZpeGVkRXh0ZW50JyxcclxuICAgICAgICBzcnNOYW1lXHJcbiAgICAgIH0sXHJcbiAgICAgIGlnb09nY0ZpbHRlck9iamVjdCxcclxuICAgICAgeyBnZW9tZXRyeU5hbWU6IGZpZWxkTmFtZUdlb21ldHJ5IH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVidWlsdElnb09nY0ZpbHRlck9iamVjdEZyb21TZXF1ZW5jZShcclxuICAgIHNlcXVlbmNlOiBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zW11cclxuICApOiBJZ29PZ2NGaWx0ZXJPYmplY3Qge1xyXG4gICAgaWYgKHNlcXVlbmNlIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgaWYgKHNlcXVlbmNlLmxlbmd0aCA+PSAxKSB7XHJcbiAgICAgICAgbGV0IGxhc3RQYXJlbnRMb2dpY2FsID0gc2VxdWVuY2VbMF0ucGFyZW50TG9naWNhbDtcclxuICAgICAgICBsZXQgbmV4dEVsZW1lbnQ6IGFueTtcclxuICAgICAgICBsZXQgbG9naWNhbEFycmF5ID0gW107XHJcbiAgICAgICAgbGV0IGxhc3RQcm9jZXNzZWRGaWx0ZXI7XHJcbiAgICAgICAgc2VxdWVuY2UuZm9yRWFjaCh1aUZpbHRlciA9PiB7XHJcbiAgICAgICAgICBjb25zdCBlbGVtZW50ID0gT2JqZWN0LmFzc2lnbih7fSwgdWlGaWx0ZXIpO1xyXG4gICAgICAgICAgY29uc3QgaW5kZXggPSBzZXF1ZW5jZS5pbmRleE9mKHVpRmlsdGVyKTtcclxuICAgICAgICAgIGlmIChpbmRleCA+PSAwICYmIGluZGV4IDwgc2VxdWVuY2UubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICBuZXh0RWxlbWVudCA9IHNlcXVlbmNlW2luZGV4ICsgMV07XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuZXh0RWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBkZWxldGUgZWxlbWVudC5hY3RpdmU7XHJcbiAgICAgICAgICBkZWxldGUgZWxlbWVudC5maWx0ZXJpZDtcclxuICAgICAgICAgIGRlbGV0ZSBlbGVtZW50LnBhcmVudExvZ2ljYWw7XHJcbiAgICAgICAgICBsb2dpY2FsQXJyYXkucHVzaChlbGVtZW50KTtcclxuXHJcbiAgICAgICAgICBpZiAoc2VxdWVuY2UubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgIGxhc3RQcm9jZXNzZWRGaWx0ZXIgPSBlbGVtZW50O1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChsYXN0UGFyZW50TG9naWNhbCAhPT0gbmV4dEVsZW1lbnQucGFyZW50TG9naWNhbCkge1xyXG4gICAgICAgICAgICBpZiAobG9naWNhbEFycmF5Lmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICAgICAgJ1lvdSBtdXN0IHNldCBhdCAnICtcclxuICAgICAgICAgICAgICAgICAgJ2xlYXN0IHR3byBvcGVyYXRvciBpbiBhIGxvZ2ljYWwgKCcgK1xyXG4gICAgICAgICAgICAgICAgICBsYXN0UGFyZW50TG9naWNhbCArXHJcbiAgICAgICAgICAgICAgICAgICcpJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgbGFzdFByb2Nlc3NlZEZpbHRlciA9IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAgICAgICAgICB7fSxcclxuICAgICAgICAgICAgICAgIHsgbG9naWNhbDogbGFzdFBhcmVudExvZ2ljYWwsIGZpbHRlcnM6IGxvZ2ljYWxBcnJheSB9XHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICBsb2dpY2FsQXJyYXkgPSBbbGFzdFByb2Nlc3NlZEZpbHRlcl07XHJcbiAgICAgICAgICAgICAgbGFzdFBhcmVudExvZ2ljYWwgPSBuZXh0RWxlbWVudC5wYXJlbnRMb2dpY2FsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGxhc3RQcm9jZXNzZWRGaWx0ZXI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZUlnb1B1c2hCdXR0b24ocHVzaEJ1dHRvbnM6IElnb1B1c2hCdXR0b24pOiBJZ29QdXNoQnV0dG9uIHtcclxuICAgIGlmIChwdXNoQnV0dG9ucy5ncm91cHMuZXZlcnkoZ3JvdXAgPT4gZ3JvdXAuY29tcHV0ZWRCdXR0b25zICE9PSB1bmRlZmluZWQpKSB7XHJcbiAgICAgIHJldHVybiBwdXNoQnV0dG9ucztcclxuICAgIH1cclxuICAgIGxldCBwYjogSWdvUHVzaEJ1dHRvbjtcclxuICAgIGlmIChwdXNoQnV0dG9ucy5ncm91cHMgJiYgcHVzaEJ1dHRvbnMuYnVuZGxlcykge1xyXG4gICAgICBpZiAoIXB1c2hCdXR0b25zLmJ1bmRsZXMuZXZlcnkoYnVuZGxlID0+IGJ1bmRsZS5pZCAhPT0gdW5kZWZpbmVkKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG11c3Qgc2V0IGFuIGlkIGZvciBlYWNoIG9mIHlvdXIgcHVzaEJ1dHRvbnMgYnVuZGxlcycpO1xyXG4gICAgICB9XHJcbiAgICAgIHBiID0gT2JqZWN0VXRpbHMuY29weURlZXAocHVzaEJ1dHRvbnMpO1xyXG4gICAgICBwYi5ncm91cHMuZm9yRWFjaChncm91cCA9PiB7XHJcbiAgICAgICAgZ3JvdXAudGl0bGUgPSBncm91cC50aXRsZSA/IGdyb3VwLnRpdGxlIDogZ3JvdXAubmFtZTtcclxuICAgICAgICBncm91cC5lbmFibGVkID0gZ3JvdXAuZW5hYmxlZCA/IGdyb3VwLmVuYWJsZWQgOiBmYWxzZTtcclxuICAgICAgICBncm91cC5jb21wdXRlZEJ1dHRvbnMgPSBPYmplY3RVdGlscy5jb3B5RGVlcChwYi5idW5kbGVzLmZpbHRlcihiID0+IGdyb3VwLmlkcy5pbmNsdWRlcyhiLmlkKSkpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAoIXB1c2hCdXR0b25zLmdyb3VwcyAmJiBwdXNoQnV0dG9ucy5idW5kbGVzKSB7XHJcbiAgICAgIHBiID0gT2JqZWN0VXRpbHMuY29weURlZXAocHVzaEJ1dHRvbnMpO1xyXG4gICAgICBwYi5ncm91cHMgPSBbeyB0aXRsZTogJ2dyb3VwMScsIG5hbWU6ICdncm91cDEnLCBjb21wdXRlZEJ1dHRvbnM6IE9iamVjdFV0aWxzLmNvcHlEZWVwKHBiLmJ1bmRsZXMpIH0gYXMgUHVzaEJ1dHRvbkdyb3VwXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBiID0ge1xyXG4gICAgICAgIGJ1bmRsZXM6IHB1c2hCdXR0b25zIGFzIE9nY1B1c2hCdXR0b25CdW5kbGVbXSxcclxuICAgICAgICBncm91cHM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdGl0bGU6ICdncm91cDEnLCBuYW1lOiAnZ3JvdXAxJyxcclxuICAgICAgICAgICAgY29tcHV0ZWRCdXR0b25zOiBPYmplY3RVdGlscy5jb3B5RGVlcChwdXNoQnV0dG9ucykgYXMgT2djUHVzaEJ1dHRvbkJ1bmRsZVtdXHJcbiAgICAgICAgICB9IGFzIFB1c2hCdXR0b25Hcm91cF1cclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIGlmICghcGIuZ3JvdXBzLmZpbmQocGJHcm91cCA9PiBwYkdyb3VwLmVuYWJsZWQpKSB7XHJcbiAgICAgIHBiLmdyb3Vwc1swXS5lbmFibGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoYW5kbGVPZ2NGaWx0ZXJzQXBwbGllZFZhbHVlKFxyXG4gICAgb3B0aW9uczogT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zLFxyXG4gICAgZmllbGROYW1lR2VvbWV0cnk6IHN0cmluZyxcclxuICAgIGV4dGVudD86IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdLFxyXG4gICAgcHJvaj86IG9sUHJvamVjdGlvbik6IHN0cmluZyB7XHJcbiAgICBjb25zdCBvZ2NGaWx0ZXJzID0gb3B0aW9ucy5vZ2NGaWx0ZXJzO1xyXG4gICAgaWYgKCFvZ2NGaWx0ZXJzKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGxldCBmaWx0ZXJRdWVyeVN0cmluZ1B1c2hCdXR0b24gPSAnJztcclxuICAgIGxldCBmaWx0ZXJRdWVyeVN0cmluZ0FkdmFuY2VkRmlsdGVycyA9ICcnO1xyXG4gICAgaWYgKG9nY0ZpbHRlcnMuZW5hYmxlZCAmJiBvZ2NGaWx0ZXJzLnB1c2hCdXR0b25zKSB7XHJcbiAgICAgIG9nY0ZpbHRlcnMucHVzaEJ1dHRvbnMgPSB0aGlzLmNvbXB1dGVJZ29QdXNoQnV0dG9uKG9nY0ZpbHRlcnMucHVzaEJ1dHRvbnMpO1xyXG4gICAgICBjb25zdCBwdXNoQnV0dG9uQnVuZGxlID0gb2djRmlsdGVycy5wdXNoQnV0dG9ucy5ncm91cHMuZmluZChnID0+IGcuZW5hYmxlZCkuY29tcHV0ZWRCdXR0b25zO1xyXG4gICAgICBjb25zdCBjb25kaXRpb25zID0gW107XHJcbiAgICAgIHB1c2hCdXR0b25CdW5kbGUubWFwKGJ1dHRvbkJ1bmRsZSA9PiB7XHJcbiAgICAgICAgY29uc3QgYnVuZGxlQ29uZGl0aW9uID0gW107XHJcbiAgICAgICAgYnV0dG9uQnVuZGxlLmJ1dHRvbnNcclxuICAgICAgICAgIC5maWx0ZXIob2djcGIgPT4gb2djcGIuZW5hYmxlZCA9PT0gdHJ1ZSlcclxuICAgICAgICAgIC5mb3JFYWNoKGVuYWJsZWRQYiA9PiBidW5kbGVDb25kaXRpb24ucHVzaChlbmFibGVkUGIuZmlsdGVycykpO1xyXG4gICAgICAgIGlmIChidW5kbGVDb25kaXRpb24ubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICBjb25kaXRpb25zLnB1c2goYnVuZGxlQ29uZGl0aW9uWzBdKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGJ1bmRsZUNvbmRpdGlvbi5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICBjb25kaXRpb25zLnB1c2goeyBsb2dpY2FsOiBidXR0b25CdW5kbGUubG9naWNhbCwgZmlsdGVyczogYnVuZGxlQ29uZGl0aW9uIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGlmIChjb25kaXRpb25zLmxlbmd0aCA+PSAxKSB7XHJcbiAgICAgICAgZmlsdGVyUXVlcnlTdHJpbmdQdXNoQnV0dG9uID0gdGhpcy5idWlsZEZpbHRlcihcclxuICAgICAgICAgICAgY29uZGl0aW9ucy5sZW5ndGggPT09IDEgPyBjb25kaXRpb25zWzBdIDogeyBsb2dpY2FsOiAnQW5kJywgZmlsdGVyczogY29uZGl0aW9ucyB9LFxyXG4gICAgICAgICAgICBleHRlbnQsXHJcbiAgICAgICAgICAgIHByb2osXHJcbiAgICAgICAgICAgIG9nY0ZpbHRlcnMuZ2VvbWV0cnlOYW1lXHJcbiAgICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9nY0ZpbHRlcnMuZW5hYmxlZCAmJiBvZ2NGaWx0ZXJzLmZpbHRlcnMpIHtcclxuICAgICAgb2djRmlsdGVycy5nZW9tZXRyeU5hbWUgPSBvZ2NGaWx0ZXJzLmdlb21ldHJ5TmFtZSB8fCBmaWVsZE5hbWVHZW9tZXRyeTtcclxuICAgICAgY29uc3QgaWdvRmlsdGVycyA9IG9nY0ZpbHRlcnMuZmlsdGVycztcclxuICAgICAgZmlsdGVyUXVlcnlTdHJpbmdBZHZhbmNlZEZpbHRlcnMgPSB0aGlzLmJ1aWxkRmlsdGVyKGlnb0ZpbHRlcnMsIGV4dGVudCwgcHJvaiwgb2djRmlsdGVycy5nZW9tZXRyeU5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBmaWx0ZXJRdWVyeVN0cmluZyA9IG9nY0ZpbHRlcnMuYWR2YW5jZWRPZ2NGaWx0ZXJzID8gZmlsdGVyUXVlcnlTdHJpbmdBZHZhbmNlZEZpbHRlcnMgOiBmaWx0ZXJRdWVyeVN0cmluZ1B1c2hCdXR0b247XHJcbiAgICBpZiAob3B0aW9ucy50eXBlID09PSAnd21zJykge1xyXG4gICAgICBmaWx0ZXJRdWVyeVN0cmluZyA9IHRoaXMuZm9ybWF0UHJvY2Vzc2VkT2djRmlsdGVyKGZpbHRlclF1ZXJ5U3RyaW5nLCAob3B0aW9ucyBhcyBhbnkpLnBhcmFtcy5MQVlFUlMpO1xyXG4gICAgfVxyXG4gICAgaWYgKG9wdGlvbnMudHlwZSA9PT0gJ3dmcycpIHtcclxuICAgICAgZmlsdGVyUXVlcnlTdHJpbmcgPSB0aGlzLmZvcm1hdFByb2Nlc3NlZE9nY0ZpbHRlcihmaWx0ZXJRdWVyeVN0cmluZywgKG9wdGlvbnMgYXMgYW55KS5wYXJhbXMuZmVhdHVyZVR5cGVzKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmlsdGVyUXVlcnlTdHJpbmc7XHJcblxyXG4gIH1cclxuXHJcbiAgcHVibGljIGZvcm1hdFByb2Nlc3NlZE9nY0ZpbHRlcihcclxuICAgIHByb2Nlc3NlZEZpbHRlcjogc3RyaW5nLFxyXG4gICAgbGF5ZXJzT3JUeXBlbmFtZXM6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBsZXQgYXBwbGllZEZpbHRlciA9ICcnO1xyXG4gICAgaWYgKHByb2Nlc3NlZEZpbHRlci5sZW5ndGggPT09IDAgJiYgbGF5ZXJzT3JUeXBlbmFtZXMuaW5kZXhPZignLCcpID09PSAtMSkge1xyXG4gICAgICBhcHBsaWVkRmlsdGVyID0gcHJvY2Vzc2VkRmlsdGVyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGF5ZXJzT3JUeXBlbmFtZXMuc3BsaXQoJywnKS5mb3JFYWNoKGxheWVyT3JUeXBlbmFtZXMgPT4ge1xyXG4gICAgICAgIGFwcGxpZWRGaWx0ZXIgPSBgJHthcHBsaWVkRmlsdGVyfSgke3Byb2Nlc3NlZEZpbHRlci5yZXBsYWNlKCdmaWx0ZXI9JywgJycpfSlgO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGNvbnN0IGZpbHRlclZhbHVlID0gYXBwbGllZEZpbHRlci5sZW5ndGggPiAwID8gYXBwbGllZEZpbHRlci5yZXBsYWNlKCdmaWx0ZXI9JywgJycpIDogdW5kZWZpbmVkO1xyXG4gICAgcmV0dXJuIGZpbHRlclZhbHVlO1xyXG4gIH1cclxufVxyXG4iXX0=