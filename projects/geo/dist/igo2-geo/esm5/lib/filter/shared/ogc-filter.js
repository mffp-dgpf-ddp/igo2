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
     * @param {?=} fields
     * @param {?=} propertyName
     * @param {?=} defaultOperatorsType
     * @return {?}
     */
    OgcFilterWriter.prototype.computeAllowedOperators = /**
     * @param {?=} fields
     * @param {?=} propertyName
     * @param {?=} defaultOperatorsType
     * @return {?}
     */
    function (fields, propertyName, defaultOperatorsType) {
        /** @type {?} */
        var effectiveOperators = {};
        /** @type {?} */
        var allowedOperators;
        if (fields && propertyName) {
            /** @type {?} */
            var srcField = fields.find((/**
             * @param {?} field
             * @return {?}
             */
            function (field) { return field.name === propertyName; }));
            allowedOperators = srcField && srcField.allowedOperatorsType ?
                srcField.allowedOperatorsType : defaultOperatorsType;
        }
        allowedOperators = allowedOperators ? allowedOperators : 'basicandspatial';
        switch (allowedOperators.toLowerCase()) {
            case 'all':
                effectiveOperators = this.operators;
                break;
            case 'spatial':
                effectiveOperators = {
                    Intersects: { spatial: true, fieldRestrict: [] },
                    Within: { spatial: true, fieldRestrict: [] },
                };
                break;
            case 'basicandspatial':
                effectiveOperators = {
                    PropertyIsEqualTo: { spatial: false, fieldRestrict: [] },
                    PropertyIsNotEqualTo: { spatial: false, fieldRestrict: [] },
                    Intersects: { spatial: true, fieldRestrict: [] },
                    Within: { spatial: true, fieldRestrict: [] },
                };
                break;
            case 'basic':
                effectiveOperators = {
                    PropertyIsEqualTo: { spatial: false, fieldRestrict: [] },
                    PropertyIsNotEqualTo: { spatial: false, fieldRestrict: [] }
                };
                break;
            case 'time':
                effectiveOperators = {
                    During: { spatial: false, fieldRestrict: [] },
                };
                break;
            case 'basicnumeric':
                effectiveOperators = {
                    PropertyIsEqualTo: { spatial: false, fieldRestrict: [] },
                    PropertyIsNotEqualTo: { spatial: false, fieldRestrict: [] },
                    PropertyIsGreaterThan: { spatial: false, fieldRestrict: ['number'] },
                    PropertyIsGreaterThanOrEqualTo: { spatial: false, fieldRestrict: ['number'] },
                    PropertyIsLessThan: { spatial: false, fieldRestrict: ['number'] },
                    PropertyIsLessThanOrEqualTo: { spatial: false, fieldRestrict: ['number'] },
                };
                break;
            default:
                effectiveOperators = {
                    PropertyIsEqualTo: { spatial: false, fieldRestrict: [] },
                    PropertyIsNotEqualTo: { spatial: false, fieldRestrict: [] },
                    Intersects: { spatial: true, fieldRestrict: [] },
                    Within: { spatial: true, fieldRestrict: [] },
                };
        }
        return effectiveOperators;
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
        appliedFilter = appliedFilter.replace(/\(\)/g, '');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXIvc2hhcmVkL29nYy1maWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxRQUFRLE1BQU0sa0JBQWtCLENBQUM7QUFDN0MsT0FBTyxXQUFXLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sV0FBVyxNQUFNLGVBQWUsQ0FBQztBQUt4QyxPQUFPLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQWlCaEQ7SUFBQTtRQUNVLG1CQUFjLEdBQWdDLEVBQUUsQ0FBQztRQUNsRCxjQUFTLEdBQUc7WUFDakIsaUJBQWlCLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUU7WUFDeEQsb0JBQW9CLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUU7WUFDM0QsY0FBYyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM3RCxxQkFBcUIsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDcEUsOEJBQThCLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzdFLGtCQUFrQixFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNqRSwyQkFBMkIsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDMUUsaUJBQWlCLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FB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QU8sRUFBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzVHO1FBRUQsT0FBTyxpQkFBaUIsQ0FBQztJQUUzQixDQUFDOzs7Ozs7SUFFTSxrREFBd0I7Ozs7O0lBQS9CLFVBQ0UsZUFBdUIsRUFDdkIsaUJBQXlCOztZQUNyQixhQUFhLEdBQUcsRUFBRTtRQUN0QixJQUFJLGVBQWUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUN6RSxhQUFhLEdBQUcsZUFBZSxDQUFDO1NBQ2pDO2FBQU07WUFDTCxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTzs7OztZQUFDLFVBQUEsZ0JBQWdCO2dCQUNuRCxhQUFhLEdBQU0sYUFBYSxTQUFJLGVBQWUsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxNQUFHLENBQUM7WUFDaEYsQ0FBQyxFQUFDLENBQUM7U0FDSjtRQUNELGFBQWEsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQzs7WUFDN0MsV0FBVyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztRQUMvRixPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBemtCRCxJQXlrQkM7Ozs7Ozs7SUF4a0JDLHlDQUF5RDs7SUFDekQsb0NBY0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBvbGZpbHRlciBmcm9tICdvbC9mb3JtYXQvZmlsdGVyJztcclxuaW1wb3J0IG9sRm9ybWF0V0tUIGZyb20gJ29sL2Zvcm1hdC9XS1QnO1xyXG5pbXBvcnQgb2xGb3JtYXRXRlMgZnJvbSAnb2wvZm9ybWF0L1dGUyc7XHJcbmltcG9ydCBvbEdlb21ldHJ5IGZyb20gJ29sL2dlb20vR2VvbWV0cnknO1xyXG5cclxuaW1wb3J0IG9sUHJvamVjdGlvbiBmcm9tICdvbC9wcm9qL1Byb2plY3Rpb24nO1xyXG5cclxuaW1wb3J0IHsgdXVpZCwgT2JqZWN0VXRpbHMgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQge1xyXG4gIE9nY0ZpbHRlcixcclxuICBJZ29PZ2NGaWx0ZXJPYmplY3QsXHJcbiAgV0ZTV3JpdGVHZXRGZWF0dXJlT3B0aW9ucyxcclxuICBBbnlCYXNlT2djRmlsdGVyT3B0aW9ucyxcclxuICBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zLFxyXG4gIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucyxcclxuICBPZ2NGaWx0ZXJzT3B0aW9ucyxcclxuICBJZ29QdXNoQnV0dG9uLFxyXG4gIFB1c2hCdXR0b25Hcm91cCxcclxuICBPZ2NQdXNoQnV0dG9uQnVuZGxlXHJcbn0gZnJvbSAnLi9vZ2MtZmlsdGVyLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IE9nY0ZpbHRlck9wZXJhdG9yVHlwZSB9IGZyb20gJy4vb2djLWZpbHRlci5lbnVtJztcclxuaW1wb3J0IHsgU291cmNlRmllbGRzT3B0aW9uc1BhcmFtcyB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2RhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBPZ2NGaWx0ZXJXcml0ZXIge1xyXG4gIHByaXZhdGUgZmlsdGVyU2VxdWVuY2U6IE9nY0ludGVyZmFjZUZpbHRlck9wdGlvbnNbXSA9IFtdO1xyXG4gIHB1YmxpYyBvcGVyYXRvcnMgPSB7XHJcbiAgICBQcm9wZXJ0eUlzRXF1YWxUbzogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogW10gfSxcclxuICAgIFByb3BlcnR5SXNOb3RFcXVhbFRvOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbXSB9LFxyXG4gICAgUHJvcGVydHlJc0xpa2U6IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFsnc3RyaW5nJ10gfSxcclxuICAgIFByb3BlcnR5SXNHcmVhdGVyVGhhbjogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogWydudW1iZXInXSB9LFxyXG4gICAgUHJvcGVydHlJc0dyZWF0ZXJUaGFuT3JFcXVhbFRvOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbJ251bWJlciddIH0sXHJcbiAgICBQcm9wZXJ0eUlzTGVzc1RoYW46IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFsnbnVtYmVyJ10gfSxcclxuICAgIFByb3BlcnR5SXNMZXNzVGhhbk9yRXF1YWxUbzogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogWydudW1iZXInXSB9LFxyXG4gICAgUHJvcGVydHlJc0JldHdlZW46IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFsnbnVtYmVyJ10gfSxcclxuICAgIER1cmluZzogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogW10gfSxcclxuICAgIFByb3BlcnR5SXNOdWxsOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbXSB9LFxyXG4gICAgSW50ZXJzZWN0czogeyBzcGF0aWFsOiB0cnVlLCBmaWVsZFJlc3RyaWN0OiBbXSB9LFxyXG4gICAgV2l0aGluOiB7IHNwYXRpYWw6IHRydWUsIGZpZWxkUmVzdHJpY3Q6IFtdIH0sXHJcbiAgICBDb250YWluczogeyBzcGF0aWFsOiB0cnVlLCBmaWVsZFJlc3RyaWN0OiBbXSB9XHJcbiAgfTtcclxuXHJcbiAgZGVmaW5lT2djRmlsdGVyc0RlZmF1bHRPcHRpb25zKFxyXG4gICAgb2djRmlsdGVyc09wdGlvbnM6IE9nY0ZpbHRlcnNPcHRpb25zLFxyXG4gICAgZmllbGROYW1lR2VvbWV0cnk6IHN0cmluZyxcclxuICAgIHNyY1R5cGU/OiBzdHJpbmcpOiBPZ2NGaWx0ZXJzT3B0aW9ucyAge1xyXG4gICAgbGV0IG9nY0ZpbHRlcnNEZWZhdWx0VmFsdWUgPSB0cnVlOyAvLyBkZWZhdWx0IHZhbHVlcyBmb3Igd2ZzLlxyXG4gICAgaWYgKHNyY1R5cGUgJiYgc3JjVHlwZSA9PT0gJ3dtcycpIHtcclxuICAgICAgb2djRmlsdGVyc0RlZmF1bHRWYWx1ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9nY0ZpbHRlcnNPcHRpb25zID0gb2djRmlsdGVyc09wdGlvbnMgfHwge307XHJcbiAgICBvZ2NGaWx0ZXJzT3B0aW9ucy5lbmFibGVkID0gb2djRmlsdGVyc09wdGlvbnMuZW5hYmxlZCA9PT0gdW5kZWZpbmVkID8gb2djRmlsdGVyc0RlZmF1bHRWYWx1ZSA6IG9nY0ZpbHRlcnNPcHRpb25zLmVuYWJsZWQ7XHJcbiAgICBvZ2NGaWx0ZXJzT3B0aW9ucy5lZGl0YWJsZSA9IG9nY0ZpbHRlcnNPcHRpb25zLmVkaXRhYmxlID09PSB1bmRlZmluZWQgPyBvZ2NGaWx0ZXJzRGVmYXVsdFZhbHVlIDogb2djRmlsdGVyc09wdGlvbnMuZWRpdGFibGU7XHJcbiAgICBvZ2NGaWx0ZXJzT3B0aW9ucy5nZW9tZXRyeU5hbWUgPSBmaWVsZE5hbWVHZW9tZXRyeTtcclxuXHJcbiAgICBvZ2NGaWx0ZXJzT3B0aW9ucy5hZHZhbmNlZE9nY0ZpbHRlcnMgPSB0cnVlO1xyXG4gICAgaWYgKG9nY0ZpbHRlcnNPcHRpb25zLmVuYWJsZWQgJiYgb2djRmlsdGVyc09wdGlvbnMucHVzaEJ1dHRvbnMpIHtcclxuICAgICAgb2djRmlsdGVyc09wdGlvbnMuYWR2YW5jZWRPZ2NGaWx0ZXJzID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2djRmlsdGVyc09wdGlvbnM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYnVpbGRGaWx0ZXIoXHJcbiAgICBmaWx0ZXJzPzogSWdvT2djRmlsdGVyT2JqZWN0LFxyXG4gICAgZXh0ZW50PzogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sXHJcbiAgICBwcm9qPzogb2xQcm9qZWN0aW9uLFxyXG4gICAgZmllbGROYW1lR2VvbWV0cnk/OiBzdHJpbmdcclxuICApOiBzdHJpbmcge1xyXG4gICAgbGV0IG91ckJib3hGaWx0ZXI7XHJcbiAgICBsZXQgZW5hYmxlQmJveDogYm9vbGVhbjtcclxuICAgIGlmICgvaW50ZXJzZWN0c3xjb250YWluc3x3aXRoaW4vZ2kudGVzdChKU09OLnN0cmluZ2lmeShmaWx0ZXJzKSkpIHtcclxuICAgICAgZW5hYmxlQmJveCA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZW5hYmxlQmJveCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAoZmlsdGVycykge1xyXG4gICAgICBmaWVsZE5hbWVHZW9tZXRyeSA9XHJcbiAgICAgICAgKGZpbHRlcnMgYXMgYW55KS5nZW9tZXRyeU5hbWUgIT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgPyAoZmlsdGVycyBhcyBhbnkpLmdlb21ldHJ5TmFtZVxyXG4gICAgICAgICAgOiBmaWVsZE5hbWVHZW9tZXRyeTtcclxuICAgIH1cclxuICAgIGlmIChleHRlbnQgJiYgZmlsdGVycykge1xyXG4gICAgICBvdXJCYm94RmlsdGVyID0gb2xmaWx0ZXIuYmJveChmaWVsZE5hbWVHZW9tZXRyeSwgZXh0ZW50LCBwcm9qLmdldENvZGUoKSk7XHJcbiAgICB9XHJcbiAgICBsZXQgZmlsdGVyQXNzZW1ibHk6IE9nY0ZpbHRlcjtcclxuICAgIGlmIChmaWx0ZXJzKSB7XHJcbiAgICAgIGZpbHRlcnMgPSB0aGlzLmNoZWNrSWdvRmlsdGVyc1Byb3BlcnRpZXMoZmlsdGVycywgZmllbGROYW1lR2VvbWV0cnksIHByb2opO1xyXG4gICAgICBpZiAoZXh0ZW50ICYmIGVuYWJsZUJib3gpIHtcclxuICAgICAgICBmaWx0ZXJBc3NlbWJseSA9IG9sZmlsdGVyLmFuZChcclxuICAgICAgICAgIG91ckJib3hGaWx0ZXIsXHJcbiAgICAgICAgICB0aGlzLmJ1bmRsZUZpbHRlcihmaWx0ZXJzKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZmlsdGVyQXNzZW1ibHkgPSB0aGlzLmJ1bmRsZUZpbHRlcihmaWx0ZXJzKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuICdiYm94PScgKyBleHRlbnQuam9pbignLCcpICsgJywnICsgcHJvai5nZXRDb2RlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgd2ZzT3B0aW9uczogV0ZTV3JpdGVHZXRGZWF0dXJlT3B0aW9ucyA9IHtcclxuICAgICAgc3JzTmFtZTogJycsXHJcbiAgICAgIGZlYXR1cmVOUzogJycsXHJcbiAgICAgIGZlYXR1cmVQcmVmaXg6ICcnLFxyXG4gICAgICBmZWF0dXJlVHlwZXM6IFsnZmVhdHVyZVR5cGVzJ10sXHJcbiAgICAgIGZpbHRlcjogZmlsdGVyQXNzZW1ibHksXHJcbiAgICAgIG91dHB1dEZvcm1hdDogJycsXHJcbiAgICAgIGdlb21ldHJ5TmFtZTogZmllbGROYW1lR2VvbWV0cnlcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcXVlcnkgPSBuZXcgb2xGb3JtYXRXRlMoKS53cml0ZUdldEZlYXR1cmUod2ZzT3B0aW9ucyk7XHJcbiAgICBjb25zdCBzdHIgPSBuZXcgWE1MU2VyaWFsaXplcigpLnNlcmlhbGl6ZVRvU3RyaW5nKHF1ZXJ5KTtcclxuICAgIGNvbnN0IHJlZ2V4cDEgPSAvdHlwZW5hbWVzICo9fHR5cGVuYW1lICo9XFxcImZlYXR1cmVUeXBlc1xcXCIgKj4vZ2k7XHJcbiAgICBjb25zdCByZWdleHAyID0gLzxcXC9RdWVyeT48XFwvR2V0RmVhdHVyZT4vZ2k7XHJcblxyXG4gICAgcmV0dXJuICdmaWx0ZXI9JyArIHN0ci5zcGxpdChyZWdleHAxKVsxXS5zcGxpdChyZWdleHAyKVswXTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYnVuZGxlRmlsdGVyKGZpbHRlck9iamVjdDogYW55KSB7XHJcbiAgICBpZiAoZmlsdGVyT2JqZWN0IGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgY29uc3QgbG9naWNhbEFycmF5ID0gW107XHJcbiAgICAgIGZpbHRlck9iamVjdC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgIGxvZ2ljYWxBcnJheS5wdXNoKHRoaXMuYnVuZGxlRmlsdGVyKGVsZW1lbnQpKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBsb2dpY2FsQXJyYXk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoZmlsdGVyT2JqZWN0Lmhhc093blByb3BlcnR5KCdsb2dpY2FsJykpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVGaWx0ZXIoe1xyXG4gICAgICAgICAgb3BlcmF0b3I6IGZpbHRlck9iamVjdC5sb2dpY2FsLFxyXG4gICAgICAgICAgbG9naWNhbEFycmF5OiB0aGlzLmJ1bmRsZUZpbHRlcihmaWx0ZXJPYmplY3QuZmlsdGVycylcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIGlmIChmaWx0ZXJPYmplY3QuaGFzT3duUHJvcGVydHkoJ29wZXJhdG9yJykpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVGaWx0ZXIoZmlsdGVyT2JqZWN0IGFzIEFueUJhc2VPZ2NGaWx0ZXJPcHRpb25zKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVGaWx0ZXIoZmlsdGVyT3B0aW9ucyk6IE9nY0ZpbHRlciB7XHJcbiAgICBjb25zdCBvcGVyYXRvciA9IGZpbHRlck9wdGlvbnMub3BlcmF0b3I7XHJcbiAgICBjb25zdCBsb2dpY2FsQXJyYXkgPSBmaWx0ZXJPcHRpb25zLmxvZ2ljYWxBcnJheTtcclxuXHJcbiAgICBjb25zdCB3ZnNQcm9wZXJ0eU5hbWUgPSBmaWx0ZXJPcHRpb25zLnByb3BlcnR5TmFtZTtcclxuICAgIGNvbnN0IHdmc1BhdHRlcm4gPSBmaWx0ZXJPcHRpb25zLnBhdHRlcm47XHJcbiAgICBjb25zdCB3ZnNNYXRjaENhc2UgPSBmaWx0ZXJPcHRpb25zLm1hdGNoQ2FzZVxyXG4gICAgICA/IGZpbHRlck9wdGlvbnMubWF0Y2hDYXNlXHJcbiAgICAgIDogdHJ1ZTtcclxuICAgIGNvbnN0IHdmc1dpbGRDYXJkID0gZmlsdGVyT3B0aW9ucy53aWxkQ2FyZCA/IGZpbHRlck9wdGlvbnMud2lsZENhcmQgOiAnKic7XHJcbiAgICBjb25zdCB3ZnNTaW5nbGVDaGFyID0gZmlsdGVyT3B0aW9ucy5zaW5nbGVDaGFyXHJcbiAgICAgID8gZmlsdGVyT3B0aW9ucy5zaW5nbGVDaGFyXHJcbiAgICAgIDogJy4nO1xyXG4gICAgY29uc3Qgd2ZzRXNjYXBlQ2hhciA9IGZpbHRlck9wdGlvbnMuZXNjYXBlQ2hhclxyXG4gICAgICA/IGZpbHRlck9wdGlvbnMuZXNjYXBlQ2hhclxyXG4gICAgICA6ICchJztcclxuXHJcbiAgICBjb25zdCB3ZnNMb3dlckJvdW5kYXJ5ID0gZmlsdGVyT3B0aW9ucy5sb3dlckJvdW5kYXJ5O1xyXG4gICAgY29uc3Qgd2ZzVXBwZXJCb3VuZGFyeSA9IGZpbHRlck9wdGlvbnMudXBwZXJCb3VuZGFyeTtcclxuXHJcbiAgICBjb25zdCB3ZnNHZW9tZXRyeU5hbWUgPSBmaWx0ZXJPcHRpb25zLmdlb21ldHJ5TmFtZTtcclxuICAgIGNvbnN0IHdmc0V4dGVudCA9IGZpbHRlck9wdGlvbnMuZXh0ZW50O1xyXG4gICAgY29uc3Qgd2ZzV2t0R2VvbWV0cnkgPSBmaWx0ZXJPcHRpb25zLndrdF9nZW9tZXRyeTtcclxuICAgIGNvbnN0IHdmc1Nyc05hbWUgPSBmaWx0ZXJPcHRpb25zLnNyc05hbWVcclxuICAgICAgPyBmaWx0ZXJPcHRpb25zLnNyc05hbWVcclxuICAgICAgOiAnRVBTRzozODU3JztcclxuXHJcbiAgICBjb25zdCB3ZnNCZWdpbiA9IGZpbHRlck9wdGlvbnMuYmVnaW47XHJcbiAgICBjb25zdCB3ZnNFbmQgPSBmaWx0ZXJPcHRpb25zLmVuZDtcclxuXHJcbiAgICBjb25zdCB3ZnNFeHByZXNzaW9uID0gZmlsdGVyT3B0aW9ucy5leHByZXNzaW9uO1xyXG5cclxuICAgIGxldCBnZW9tZXRyeTogb2xHZW9tZXRyeTtcclxuICAgIGlmICh3ZnNXa3RHZW9tZXRyeSkge1xyXG4gICAgICBjb25zdCB3a3QgPSBuZXcgb2xGb3JtYXRXS1QoKTtcclxuICAgICAgZ2VvbWV0cnkgPSB3a3QucmVhZEdlb21ldHJ5KHdmc1drdEdlb21ldHJ5LCB7XHJcbiAgICAgICAgZGF0YVByb2plY3Rpb246IHdmc1Nyc05hbWUsXHJcbiAgICAgICAgZmVhdHVyZVByb2plY3Rpb246IHdmc1Nyc05hbWUgfHwgJ0VQU0c6Mzg1NydcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoIChvcGVyYXRvcikge1xyXG4gICAgICBjYXNlICdCQk9YJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIuYmJveCh3ZnNHZW9tZXRyeU5hbWUsIHdmc0V4dGVudCwgd2ZzU3JzTmFtZSk7XHJcbiAgICAgIGNhc2UgJ1Byb3BlcnR5SXNCZXR3ZWVuJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIuYmV0d2VlbihcclxuICAgICAgICAgIHdmc1Byb3BlcnR5TmFtZSxcclxuICAgICAgICAgIHdmc0xvd2VyQm91bmRhcnksXHJcbiAgICAgICAgICB3ZnNVcHBlckJvdW5kYXJ5XHJcbiAgICAgICAgKTtcclxuICAgICAgY2FzZSAnQ29udGFpbnMnOlxyXG4gICAgICAgIHJldHVybiBvbGZpbHRlci5jb250YWlucyh3ZnNHZW9tZXRyeU5hbWUsIGdlb21ldHJ5LCB3ZnNTcnNOYW1lKTtcclxuICAgICAgY2FzZSAnRHVyaW5nJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIuZHVyaW5nKHdmc1Byb3BlcnR5TmFtZSwgd2ZzQmVnaW4sIHdmc0VuZCk7XHJcbiAgICAgIGNhc2UgJ1Byb3BlcnR5SXNFcXVhbFRvJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIuZXF1YWxUbyhcclxuICAgICAgICAgIHdmc1Byb3BlcnR5TmFtZSxcclxuICAgICAgICAgIHdmc0V4cHJlc3Npb24sXHJcbiAgICAgICAgICB3ZnNNYXRjaENhc2VcclxuICAgICAgICApO1xyXG4gICAgICBjYXNlICdQcm9wZXJ0eUlzR3JlYXRlclRoYW4nOlxyXG4gICAgICAgIHJldHVybiBvbGZpbHRlci5ncmVhdGVyVGhhbih3ZnNQcm9wZXJ0eU5hbWUsIHdmc0V4cHJlc3Npb24pO1xyXG4gICAgICBjYXNlICdQcm9wZXJ0eUlzR3JlYXRlclRoYW5PckVxdWFsVG8nOlxyXG4gICAgICAgIHJldHVybiBvbGZpbHRlci5ncmVhdGVyVGhhbk9yRXF1YWxUbyh3ZnNQcm9wZXJ0eU5hbWUsIHdmc0V4cHJlc3Npb24pO1xyXG4gICAgICBjYXNlICdJbnRlcnNlY3RzJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIuaW50ZXJzZWN0cyh3ZnNHZW9tZXRyeU5hbWUsIGdlb21ldHJ5LCB3ZnNTcnNOYW1lKTtcclxuICAgICAgY2FzZSAnUHJvcGVydHlJc051bGwnOlxyXG4gICAgICAgIHJldHVybiBvbGZpbHRlci5pc051bGwod2ZzUHJvcGVydHlOYW1lKTtcclxuICAgICAgY2FzZSAnUHJvcGVydHlJc0xlc3NUaGFuJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIubGVzc1RoYW4od2ZzUHJvcGVydHlOYW1lLCB3ZnNFeHByZXNzaW9uKTtcclxuICAgICAgY2FzZSAnUHJvcGVydHlJc0xlc3NUaGFuT3JFcXVhbFRvJzpcclxuICAgICAgICByZXR1cm4gb2xmaWx0ZXIubGVzc1RoYW5PckVxdWFsVG8od2ZzUHJvcGVydHlOYW1lLCB3ZnNFeHByZXNzaW9uKTtcclxuICAgICAgY2FzZSAnUHJvcGVydHlJc0xpa2UnOlxyXG4gICAgICAgIHJldHVybiBvbGZpbHRlci5saWtlKFxyXG4gICAgICAgICAgd2ZzUHJvcGVydHlOYW1lLFxyXG4gICAgICAgICAgd2ZzUGF0dGVybi5yZXBsYWNlKC9bKClfXS9naSwgd2ZzU2luZ2xlQ2hhciksXHJcbiAgICAgICAgICB3ZnNXaWxkQ2FyZCxcclxuICAgICAgICAgIHdmc1NpbmdsZUNoYXIsXHJcbiAgICAgICAgICB3ZnNFc2NhcGVDaGFyLFxyXG4gICAgICAgICAgd2ZzTWF0Y2hDYXNlXHJcbiAgICAgICAgKTtcclxuICAgICAgY2FzZSAnUHJvcGVydHlJc05vdEVxdWFsVG8nOlxyXG4gICAgICAgIHJldHVybiBvbGZpbHRlci5ub3RFcXVhbFRvKFxyXG4gICAgICAgICAgd2ZzUHJvcGVydHlOYW1lLFxyXG4gICAgICAgICAgd2ZzRXhwcmVzc2lvbixcclxuICAgICAgICAgIHdmc01hdGNoQ2FzZVxyXG4gICAgICAgICk7XHJcbiAgICAgIGNhc2UgJ1dpdGhpbic6XHJcbiAgICAgICAgcmV0dXJuIG9sZmlsdGVyLndpdGhpbih3ZnNHZW9tZXRyeU5hbWUsIGdlb21ldHJ5LCB3ZnNTcnNOYW1lKTtcclxuICAgICAgLy8gTE9HSUNBTFxyXG4gICAgICBjYXNlICdBbmQnOlxyXG4gICAgICAgIHJldHVybiBvbGZpbHRlci5hbmQuYXBwbHkobnVsbCwgbG9naWNhbEFycmF5KTtcclxuICAgICAgY2FzZSAnT3InOlxyXG4gICAgICAgIHJldHVybiBvbGZpbHRlci5vci5hcHBseShudWxsLCBsb2dpY2FsQXJyYXkpO1xyXG4gICAgICBjYXNlICdOb3QnOlxyXG4gICAgICAgIHJldHVybiBvbGZpbHRlci5ub3QuYXBwbHkobnVsbCwgbG9naWNhbEFycmF5KTtcclxuXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBkZWZpbmVJbnRlcmZhY2VGaWx0ZXJTZXF1ZW5jZShcclxuICAgIGZpbHRlck9iamVjdDogYW55LFxyXG4gICAgZ2VvbWV0cnlOYW1lLFxyXG4gICAgbG9naWNhbCA9ICcnLFxyXG4gICAgbGV2ZWwgPSAtMVxyXG4gICk6IE9nY0ludGVyZmFjZUZpbHRlck9wdGlvbnNbXSB7XHJcbiAgICBpZiAoZmlsdGVyT2JqZWN0IGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgZmlsdGVyT2JqZWN0LmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJTZXF1ZW5jZS5jb25jYXQoXHJcbiAgICAgICAgICB0aGlzLmRlZmluZUludGVyZmFjZUZpbHRlclNlcXVlbmNlKFxyXG4gICAgICAgICAgICBlbGVtZW50LFxyXG4gICAgICAgICAgICBnZW9tZXRyeU5hbWUsXHJcbiAgICAgICAgICAgIGxvZ2ljYWwsXHJcbiAgICAgICAgICAgIGxldmVsXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoZmlsdGVyT2JqZWN0Lmhhc093blByb3BlcnR5KCdsb2dpY2FsJykpIHtcclxuICAgICAgICBsZXZlbCA9IGxldmVsICsgMTtcclxuICAgICAgICB0aGlzLmZpbHRlclNlcXVlbmNlLmNvbmNhdChcclxuICAgICAgICAgIHRoaXMuZGVmaW5lSW50ZXJmYWNlRmlsdGVyU2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGZpbHRlck9iamVjdC5maWx0ZXJzLFxyXG4gICAgICAgICAgICBnZW9tZXRyeU5hbWUsXHJcbiAgICAgICAgICAgIGZpbHRlck9iamVjdC5sb2dpY2FsLFxyXG4gICAgICAgICAgICBsZXZlbFxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSBpZiAoZmlsdGVyT2JqZWN0Lmhhc093blByb3BlcnR5KCdvcGVyYXRvcicpKSB7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJTZXF1ZW5jZS5wdXNoKFxyXG4gICAgICAgICAgdGhpcy5hZGRJbnRlcmZhY2VGaWx0ZXIoZmlsdGVyT2JqZWN0LCBnZW9tZXRyeU5hbWUsIGxldmVsLCBsb2dpY2FsKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmZpbHRlclNlcXVlbmNlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNvbXB1dGVBbGxvd2VkT3BlcmF0b3JzKFxyXG4gICAgZmllbGRzPzogU291cmNlRmllbGRzT3B0aW9uc1BhcmFtc1tdLFxyXG4gICAgcHJvcGVydHlOYW1lPzogc3RyaW5nLFxyXG4gICAgZGVmYXVsdE9wZXJhdG9yc1R5cGU/OiBPZ2NGaWx0ZXJPcGVyYXRvclR5cGUgKSB7XHJcbiAgICBsZXQgZWZmZWN0aXZlT3BlcmF0b3JzOiB7fSA9IHt9O1xyXG4gICAgbGV0IGFsbG93ZWRPcGVyYXRvcnM7XHJcbiAgICBpZiAoZmllbGRzICYmIHByb3BlcnR5TmFtZSkge1xyXG4gICAgICBjb25zdCBzcmNGaWVsZCA9IGZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLm5hbWUgPT09IHByb3BlcnR5TmFtZSk7XHJcbiAgICAgIGFsbG93ZWRPcGVyYXRvcnMgPSBzcmNGaWVsZCAmJiBzcmNGaWVsZC5hbGxvd2VkT3BlcmF0b3JzVHlwZSA/XHJcbiAgICAgICAgc3JjRmllbGQuYWxsb3dlZE9wZXJhdG9yc1R5cGUgOiBkZWZhdWx0T3BlcmF0b3JzVHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBhbGxvd2VkT3BlcmF0b3JzID0gYWxsb3dlZE9wZXJhdG9ycyA/IGFsbG93ZWRPcGVyYXRvcnMgOiAnYmFzaWNhbmRzcGF0aWFsJztcclxuXHJcbiAgICBzd2l0Y2ggKGFsbG93ZWRPcGVyYXRvcnMudG9Mb3dlckNhc2UoKSkge1xyXG4gICAgICBjYXNlICdhbGwnOlxyXG4gICAgICAgIGVmZmVjdGl2ZU9wZXJhdG9ycyA9IHRoaXMub3BlcmF0b3JzO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdzcGF0aWFsJzpcclxuICAgICAgICBlZmZlY3RpdmVPcGVyYXRvcnMgPSB7XHJcbiAgICAgICAgICBJbnRlcnNlY3RzOiB7IHNwYXRpYWw6IHRydWUsIGZpZWxkUmVzdHJpY3Q6IFtdIH0sXHJcbiAgICAgICAgICBXaXRoaW46IHsgc3BhdGlhbDogdHJ1ZSwgZmllbGRSZXN0cmljdDogW10gfSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdiYXNpY2FuZHNwYXRpYWwnOlxyXG4gICAgICAgIGVmZmVjdGl2ZU9wZXJhdG9ycyA9IHtcclxuICAgICAgICAgIFByb3BlcnR5SXNFcXVhbFRvOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbXSB9LFxyXG4gICAgICAgICAgUHJvcGVydHlJc05vdEVxdWFsVG86IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFtdIH0sXHJcbiAgICAgICAgICBJbnRlcnNlY3RzOiB7IHNwYXRpYWw6IHRydWUsIGZpZWxkUmVzdHJpY3Q6IFtdIH0sXHJcbiAgICAgICAgICBXaXRoaW46IHsgc3BhdGlhbDogdHJ1ZSwgZmllbGRSZXN0cmljdDogW10gfSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdiYXNpYyc6XHJcbiAgICAgICAgZWZmZWN0aXZlT3BlcmF0b3JzID0ge1xyXG4gICAgICAgICAgUHJvcGVydHlJc0VxdWFsVG86IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFtdIH0sXHJcbiAgICAgICAgICBQcm9wZXJ0eUlzTm90RXF1YWxUbzogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogW10gfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAndGltZSc6XHJcbiAgICAgICAgICBlZmZlY3RpdmVPcGVyYXRvcnMgPSB7XHJcbiAgICAgICAgICAgIER1cmluZzogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogW10gfSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnYmFzaWNudW1lcmljJzpcclxuICAgICAgICBlZmZlY3RpdmVPcGVyYXRvcnMgPSB7XHJcbiAgICAgICAgICBQcm9wZXJ0eUlzRXF1YWxUbzogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogW10gfSxcclxuICAgICAgICAgIFByb3BlcnR5SXNOb3RFcXVhbFRvOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbXSB9LFxyXG4gICAgICAgICAgUHJvcGVydHlJc0dyZWF0ZXJUaGFuOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbJ251bWJlciddIH0sXHJcbiAgICAgICAgICBQcm9wZXJ0eUlzR3JlYXRlclRoYW5PckVxdWFsVG86IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFsnbnVtYmVyJ10gfSxcclxuICAgICAgICAgIFByb3BlcnR5SXNMZXNzVGhhbjogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogWydudW1iZXInXSB9LFxyXG4gICAgICAgICAgUHJvcGVydHlJc0xlc3NUaGFuT3JFcXVhbFRvOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbJ251bWJlciddIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBlZmZlY3RpdmVPcGVyYXRvcnMgPSB7XHJcbiAgICAgICAgICBQcm9wZXJ0eUlzRXF1YWxUbzogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogW10gfSxcclxuICAgICAgICAgIFByb3BlcnR5SXNOb3RFcXVhbFRvOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbXSB9LFxyXG4gICAgICAgICAgSW50ZXJzZWN0czogeyBzcGF0aWFsOiB0cnVlLCBmaWVsZFJlc3RyaWN0OiBbXSB9LFxyXG4gICAgICAgICAgV2l0aGluOiB7IHNwYXRpYWw6IHRydWUsIGZpZWxkUmVzdHJpY3Q6IFtdIH0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZWZmZWN0aXZlT3BlcmF0b3JzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZEludGVyZmFjZUZpbHRlcihcclxuICAgIGlnb09nY0ZpbHRlck9iamVjdD8sXHJcbiAgICBnZW9tZXRyeU5hbWU/LFxyXG4gICAgbGV2ZWwgPSAwLFxyXG4gICAgcGFyZW50TG9naWNhbCA9ICdPcidcclxuICApOiBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zIHtcclxuICAgIGlmICghaWdvT2djRmlsdGVyT2JqZWN0KSB7XHJcbiAgICAgIGlnb09nY0ZpbHRlck9iamVjdCA9IHsgb3BlcmF0b3I6ICdQcm9wZXJ0eUlzRXF1YWxUbycgfTtcclxuICAgIH1cclxuICAgIGNvbnN0IGYgPSB7XHJcbiAgICAgIHByb3BlcnR5TmFtZTogJycsXHJcbiAgICAgIG9wZXJhdG9yOiAnJyxcclxuICAgICAgYWN0aXZlOiAnJyxcclxuICAgICAgZmlsdGVyaWQ6IHV1aWQoKSxcclxuICAgICAgYmVnaW46ICcnLFxyXG4gICAgICBlbmQ6ICcnLFxyXG4gICAgICBsb3dlckJvdW5kYXJ5OiAnJyxcclxuICAgICAgdXBwZXJCb3VuZGFyeTogJycsXHJcbiAgICAgIGV4cHJlc3Npb246ICcnLFxyXG4gICAgICBwYXR0ZXJuOiAnJyxcclxuICAgICAgd2lsZENhcmQ6ICcqJyxcclxuICAgICAgc2luZ2xlQ2hhcjogJy4nLFxyXG4gICAgICBlc2NhcGVDaGFyOiAnIScsXHJcbiAgICAgIG1hdGNoQ2FzZTogdHJ1ZSxcclxuICAgICAgaWdvU3BhdGlhbFNlbGVjdG9yOiAnJyxcclxuICAgICAgZ2VvbWV0cnlOYW1lOiAnJyxcclxuICAgICAgZ2VvbWV0cnk6ICcnLFxyXG4gICAgICB3a3RfZ2VvbWV0cnk6ICcnLFxyXG4gICAgICBleHRlbnQ6ICcnLFxyXG4gICAgICBzcnNOYW1lOiAnJyxcclxuICAgICAgcGFyZW50TG9naWNhbDogJycsXHJcbiAgICAgIGxldmVsOiAwXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKFxyXG4gICAgICBmLFxyXG4gICAgICB7XHJcbiAgICAgICAgcGFyZW50TG9naWNhbCxcclxuICAgICAgICBsZXZlbCxcclxuICAgICAgICBnZW9tZXRyeU5hbWVcclxuICAgICAgfSxcclxuICAgICAgaWdvT2djRmlsdGVyT2JqZWN0XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNoZWNrSWdvRmlsdGVyc1Byb3BlcnRpZXMoXHJcbiAgICBmaWx0ZXJPYmplY3Q6IGFueSxcclxuICAgIGZpZWxkTmFtZUdlb21ldHJ5LFxyXG4gICAgcHJvajogb2xQcm9qZWN0aW9uLFxyXG4gICAgYWN0aXZlID0gZmFsc2VcclxuICApIHtcclxuICAgIGNvbnN0IGZpbHRlckFycmF5ID0gW107XHJcbiAgICBpZiAoZmlsdGVyT2JqZWN0IGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgZmlsdGVyT2JqZWN0LmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgZmlsdGVyQXJyYXkucHVzaChcclxuICAgICAgICAgIHRoaXMuY2hlY2tJZ29GaWx0ZXJzUHJvcGVydGllcyhlbGVtZW50LCBmaWVsZE5hbWVHZW9tZXRyeSwgcHJvaiwgYWN0aXZlKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gZmlsdGVyQXJyYXk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoZmlsdGVyT2JqZWN0Lmhhc093blByb3BlcnR5KCdsb2dpY2FsJykpIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihcclxuICAgICAgICAgIHt9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsb2dpY2FsOiBmaWx0ZXJPYmplY3QubG9naWNhbCxcclxuICAgICAgICAgICAgZmlsdGVyczogdGhpcy5jaGVja0lnb0ZpbHRlcnNQcm9wZXJ0aWVzKFxyXG4gICAgICAgICAgICAgIGZpbHRlck9iamVjdC5maWx0ZXJzLFxyXG4gICAgICAgICAgICAgIGZpZWxkTmFtZUdlb21ldHJ5LFxyXG4gICAgICAgICAgICAgIHByb2osXHJcbiAgICAgICAgICAgICAgYWN0aXZlXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2UgaWYgKGZpbHRlck9iamVjdC5oYXNPd25Qcm9wZXJ0eSgnb3BlcmF0b3InKSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFkZEZpbHRlclByb3BlcnRpZXMoXHJcbiAgICAgICAgICBmaWx0ZXJPYmplY3QgYXMgT2djSW50ZXJmYWNlRmlsdGVyT3B0aW9ucyxcclxuICAgICAgICAgIGZpZWxkTmFtZUdlb21ldHJ5LFxyXG4gICAgICAgICAgcHJvaixcclxuICAgICAgICAgIGFjdGl2ZVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkRmlsdGVyUHJvcGVydGllcyhcclxuICAgIGlnb09nY0ZpbHRlck9iamVjdDogT2djSW50ZXJmYWNlRmlsdGVyT3B0aW9ucyxcclxuICAgIGZpZWxkTmFtZUdlb21ldHJ5LFxyXG4gICAgcHJvajogb2xQcm9qZWN0aW9uLFxyXG4gICAgYWN0aXZlID0gZmFsc2VcclxuICApIHtcclxuICAgIGNvbnN0IGZpbHRlcmlkID0gaWdvT2djRmlsdGVyT2JqZWN0Lmhhc093blByb3BlcnR5KCdmaWx0ZXJpZCcpXHJcbiAgICAgID8gaWdvT2djRmlsdGVyT2JqZWN0LmZpbHRlcmlkXHJcbiAgICAgIDogdXVpZCgpO1xyXG4gICAgY29uc3Qgc3RhdHVzID0gaWdvT2djRmlsdGVyT2JqZWN0Lmhhc093blByb3BlcnR5KCdhY3RpdmUnKVxyXG4gICAgICA/IGlnb09nY0ZpbHRlck9iamVjdC5hY3RpdmVcclxuICAgICAgOiBhY3RpdmU7XHJcblxyXG4gICAgY29uc3Qgc3JzTmFtZSA9IGlnb09nY0ZpbHRlck9iamVjdC5oYXNPd25Qcm9wZXJ0eSgnc3JzTmFtZScpXHJcbiAgICAgID8gaWdvT2djRmlsdGVyT2JqZWN0LnNyc05hbWVcclxuICAgICAgOiBwcm9qID8gcHJvai5nZXRDb2RlKCkgOiAnRVBTRzozODU3JztcclxuXHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihcclxuICAgICAge30sXHJcbiAgICAgIHtcclxuICAgICAgICBmaWx0ZXJpZCxcclxuICAgICAgICBhY3RpdmU6IHN0YXR1cyxcclxuICAgICAgICBpZ29TcGF0aWFsU2VsZWN0b3I6ICdmaXhlZEV4dGVudCcsXHJcbiAgICAgICAgc3JzTmFtZVxyXG4gICAgICB9LFxyXG4gICAgICBpZ29PZ2NGaWx0ZXJPYmplY3QsXHJcbiAgICAgIHsgZ2VvbWV0cnlOYW1lOiBmaWVsZE5hbWVHZW9tZXRyeSB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlYnVpbHRJZ29PZ2NGaWx0ZXJPYmplY3RGcm9tU2VxdWVuY2UoXHJcbiAgICBzZXF1ZW5jZTogT2djSW50ZXJmYWNlRmlsdGVyT3B0aW9uc1tdXHJcbiAgKTogSWdvT2djRmlsdGVyT2JqZWN0IHtcclxuICAgIGlmIChzZXF1ZW5jZSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgIGlmIChzZXF1ZW5jZS5sZW5ndGggPj0gMSkge1xyXG4gICAgICAgIGxldCBsYXN0UGFyZW50TG9naWNhbCA9IHNlcXVlbmNlWzBdLnBhcmVudExvZ2ljYWw7XHJcbiAgICAgICAgbGV0IG5leHRFbGVtZW50OiBhbnk7XHJcbiAgICAgICAgbGV0IGxvZ2ljYWxBcnJheSA9IFtdO1xyXG4gICAgICAgIGxldCBsYXN0UHJvY2Vzc2VkRmlsdGVyO1xyXG4gICAgICAgIHNlcXVlbmNlLmZvckVhY2godWlGaWx0ZXIgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZWxlbWVudCA9IE9iamVjdC5hc3NpZ24oe30sIHVpRmlsdGVyKTtcclxuICAgICAgICAgIGNvbnN0IGluZGV4ID0gc2VxdWVuY2UuaW5kZXhPZih1aUZpbHRlcik7XHJcbiAgICAgICAgICBpZiAoaW5kZXggPj0gMCAmJiBpbmRleCA8IHNlcXVlbmNlLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBzZXF1ZW5jZVtpbmRleCArIDFdO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZGVsZXRlIGVsZW1lbnQuYWN0aXZlO1xyXG4gICAgICAgICAgZGVsZXRlIGVsZW1lbnQuZmlsdGVyaWQ7XHJcbiAgICAgICAgICBkZWxldGUgZWxlbWVudC5wYXJlbnRMb2dpY2FsO1xyXG4gICAgICAgICAgbG9naWNhbEFycmF5LnB1c2goZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgaWYgKHNlcXVlbmNlLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICBsYXN0UHJvY2Vzc2VkRmlsdGVyID0gZWxlbWVudDtcclxuICAgICAgICAgIH0gZWxzZSBpZiAobGFzdFBhcmVudExvZ2ljYWwgIT09IG5leHRFbGVtZW50LnBhcmVudExvZ2ljYWwpIHtcclxuICAgICAgICAgICAgaWYgKGxvZ2ljYWxBcnJheS5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgICdZb3UgbXVzdCBzZXQgYXQgJyArXHJcbiAgICAgICAgICAgICAgICAgICdsZWFzdCB0d28gb3BlcmF0b3IgaW4gYSBsb2dpY2FsICgnICtcclxuICAgICAgICAgICAgICAgICAgbGFzdFBhcmVudExvZ2ljYWwgK1xyXG4gICAgICAgICAgICAgICAgICAnKSdcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGxhc3RQcm9jZXNzZWRGaWx0ZXIgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgICAgICAgICAgICAge30sXHJcbiAgICAgICAgICAgICAgICB7IGxvZ2ljYWw6IGxhc3RQYXJlbnRMb2dpY2FsLCBmaWx0ZXJzOiBsb2dpY2FsQXJyYXkgfVxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgbG9naWNhbEFycmF5ID0gW2xhc3RQcm9jZXNzZWRGaWx0ZXJdO1xyXG4gICAgICAgICAgICAgIGxhc3RQYXJlbnRMb2dpY2FsID0gbmV4dEVsZW1lbnQucGFyZW50TG9naWNhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBsYXN0UHJvY2Vzc2VkRmlsdGVyO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVJZ29QdXNoQnV0dG9uKHB1c2hCdXR0b25zOiBJZ29QdXNoQnV0dG9uKTogSWdvUHVzaEJ1dHRvbiB7XHJcbiAgICBpZiAocHVzaEJ1dHRvbnMuZ3JvdXBzLmV2ZXJ5KGdyb3VwID0+IGdyb3VwLmNvbXB1dGVkQnV0dG9ucyAhPT0gdW5kZWZpbmVkKSkge1xyXG4gICAgICByZXR1cm4gcHVzaEJ1dHRvbnM7XHJcbiAgICB9XHJcbiAgICBsZXQgcGI6IElnb1B1c2hCdXR0b247XHJcbiAgICBpZiAocHVzaEJ1dHRvbnMuZ3JvdXBzICYmIHB1c2hCdXR0b25zLmJ1bmRsZXMpIHtcclxuICAgICAgaWYgKCFwdXNoQnV0dG9ucy5idW5kbGVzLmV2ZXJ5KGJ1bmRsZSA9PiBidW5kbGUuaWQgIT09IHVuZGVmaW5lZCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IHNldCBhbiBpZCBmb3IgZWFjaCBvZiB5b3VyIHB1c2hCdXR0b25zIGJ1bmRsZXMnKTtcclxuICAgICAgfVxyXG4gICAgICBwYiA9IE9iamVjdFV0aWxzLmNvcHlEZWVwKHB1c2hCdXR0b25zKTtcclxuICAgICAgcGIuZ3JvdXBzLmZvckVhY2goZ3JvdXAgPT4ge1xyXG4gICAgICAgIGdyb3VwLnRpdGxlID0gZ3JvdXAudGl0bGUgPyBncm91cC50aXRsZSA6IGdyb3VwLm5hbWU7XHJcbiAgICAgICAgZ3JvdXAuZW5hYmxlZCA9IGdyb3VwLmVuYWJsZWQgPyBncm91cC5lbmFibGVkIDogZmFsc2U7XHJcbiAgICAgICAgZ3JvdXAuY29tcHV0ZWRCdXR0b25zID0gT2JqZWN0VXRpbHMuY29weURlZXAocGIuYnVuZGxlcy5maWx0ZXIoYiA9PiBncm91cC5pZHMuaW5jbHVkZXMoYi5pZCkpKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2UgaWYgKCFwdXNoQnV0dG9ucy5ncm91cHMgJiYgcHVzaEJ1dHRvbnMuYnVuZGxlcykge1xyXG4gICAgICBwYiA9IE9iamVjdFV0aWxzLmNvcHlEZWVwKHB1c2hCdXR0b25zKTtcclxuICAgICAgcGIuZ3JvdXBzID0gW3sgdGl0bGU6ICdncm91cDEnLCBuYW1lOiAnZ3JvdXAxJywgY29tcHV0ZWRCdXR0b25zOiBPYmplY3RVdGlscy5jb3B5RGVlcChwYi5idW5kbGVzKSB9IGFzIFB1c2hCdXR0b25Hcm91cF07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwYiA9IHtcclxuICAgICAgICBidW5kbGVzOiBwdXNoQnV0dG9ucyBhcyBPZ2NQdXNoQnV0dG9uQnVuZGxlW10sXHJcbiAgICAgICAgZ3JvdXBzOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnZ3JvdXAxJywgbmFtZTogJ2dyb3VwMScsXHJcbiAgICAgICAgICAgIGNvbXB1dGVkQnV0dG9uczogT2JqZWN0VXRpbHMuY29weURlZXAocHVzaEJ1dHRvbnMpIGFzIE9nY1B1c2hCdXR0b25CdW5kbGVbXVxyXG4gICAgICAgICAgfSBhcyBQdXNoQnV0dG9uR3JvdXBdXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICBpZiAoIXBiLmdyb3Vwcy5maW5kKHBiR3JvdXAgPT4gcGJHcm91cC5lbmFibGVkKSkge1xyXG4gICAgICBwYi5ncm91cHNbMF0uZW5hYmxlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGI7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGFuZGxlT2djRmlsdGVyc0FwcGxpZWRWYWx1ZShcclxuICAgIG9wdGlvbnM6IE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucyxcclxuICAgIGZpZWxkTmFtZUdlb21ldHJ5OiBzdHJpbmcsXHJcbiAgICBleHRlbnQ/OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcclxuICAgIHByb2o/OiBvbFByb2plY3Rpb24pOiBzdHJpbmcge1xyXG4gICAgY29uc3Qgb2djRmlsdGVycyA9IG9wdGlvbnMub2djRmlsdGVycztcclxuICAgIGlmICghb2djRmlsdGVycykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgZmlsdGVyUXVlcnlTdHJpbmdQdXNoQnV0dG9uID0gJyc7XHJcbiAgICBsZXQgZmlsdGVyUXVlcnlTdHJpbmdBZHZhbmNlZEZpbHRlcnMgPSAnJztcclxuICAgIGlmIChvZ2NGaWx0ZXJzLmVuYWJsZWQgJiYgb2djRmlsdGVycy5wdXNoQnV0dG9ucykge1xyXG4gICAgICBvZ2NGaWx0ZXJzLnB1c2hCdXR0b25zID0gdGhpcy5jb21wdXRlSWdvUHVzaEJ1dHRvbihvZ2NGaWx0ZXJzLnB1c2hCdXR0b25zKTtcclxuICAgICAgY29uc3QgcHVzaEJ1dHRvbkJ1bmRsZSA9IG9nY0ZpbHRlcnMucHVzaEJ1dHRvbnMuZ3JvdXBzLmZpbmQoZyA9PiBnLmVuYWJsZWQpLmNvbXB1dGVkQnV0dG9ucztcclxuICAgICAgY29uc3QgY29uZGl0aW9ucyA9IFtdO1xyXG4gICAgICBwdXNoQnV0dG9uQnVuZGxlLm1hcChidXR0b25CdW5kbGUgPT4ge1xyXG4gICAgICAgIGNvbnN0IGJ1bmRsZUNvbmRpdGlvbiA9IFtdO1xyXG4gICAgICAgIGJ1dHRvbkJ1bmRsZS5idXR0b25zXHJcbiAgICAgICAgICAuZmlsdGVyKG9nY3BiID0+IG9nY3BiLmVuYWJsZWQgPT09IHRydWUpXHJcbiAgICAgICAgICAuZm9yRWFjaChlbmFibGVkUGIgPT4gYnVuZGxlQ29uZGl0aW9uLnB1c2goZW5hYmxlZFBiLmZpbHRlcnMpKTtcclxuICAgICAgICBpZiAoYnVuZGxlQ29uZGl0aW9uLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgY29uZGl0aW9ucy5wdXNoKGJ1bmRsZUNvbmRpdGlvblswXSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChidW5kbGVDb25kaXRpb24ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgY29uZGl0aW9ucy5wdXNoKHsgbG9naWNhbDogYnV0dG9uQnVuZGxlLmxvZ2ljYWwsIGZpbHRlcnM6IGJ1bmRsZUNvbmRpdGlvbiB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoY29uZGl0aW9ucy5sZW5ndGggPj0gMSkge1xyXG4gICAgICAgIGZpbHRlclF1ZXJ5U3RyaW5nUHVzaEJ1dHRvbiA9IHRoaXMuYnVpbGRGaWx0ZXIoXHJcbiAgICAgICAgICAgIGNvbmRpdGlvbnMubGVuZ3RoID09PSAxID8gY29uZGl0aW9uc1swXSA6IHsgbG9naWNhbDogJ0FuZCcsIGZpbHRlcnM6IGNvbmRpdGlvbnMgfSxcclxuICAgICAgICAgICAgZXh0ZW50LFxyXG4gICAgICAgICAgICBwcm9qLFxyXG4gICAgICAgICAgICBvZ2NGaWx0ZXJzLmdlb21ldHJ5TmFtZVxyXG4gICAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChvZ2NGaWx0ZXJzLmVuYWJsZWQgJiYgb2djRmlsdGVycy5maWx0ZXJzKSB7XHJcbiAgICAgIG9nY0ZpbHRlcnMuZ2VvbWV0cnlOYW1lID0gb2djRmlsdGVycy5nZW9tZXRyeU5hbWUgfHwgZmllbGROYW1lR2VvbWV0cnk7XHJcbiAgICAgIGNvbnN0IGlnb0ZpbHRlcnMgPSBvZ2NGaWx0ZXJzLmZpbHRlcnM7XHJcbiAgICAgIGZpbHRlclF1ZXJ5U3RyaW5nQWR2YW5jZWRGaWx0ZXJzID0gdGhpcy5idWlsZEZpbHRlcihpZ29GaWx0ZXJzLCBleHRlbnQsIHByb2osIG9nY0ZpbHRlcnMuZ2VvbWV0cnlOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgZmlsdGVyUXVlcnlTdHJpbmcgPSBvZ2NGaWx0ZXJzLmFkdmFuY2VkT2djRmlsdGVycyA/IGZpbHRlclF1ZXJ5U3RyaW5nQWR2YW5jZWRGaWx0ZXJzIDogZmlsdGVyUXVlcnlTdHJpbmdQdXNoQnV0dG9uO1xyXG4gICAgaWYgKG9wdGlvbnMudHlwZSA9PT0gJ3dtcycpIHtcclxuICAgICAgZmlsdGVyUXVlcnlTdHJpbmcgPSB0aGlzLmZvcm1hdFByb2Nlc3NlZE9nY0ZpbHRlcihmaWx0ZXJRdWVyeVN0cmluZywgKG9wdGlvbnMgYXMgYW55KS5wYXJhbXMuTEFZRVJTKTtcclxuICAgIH1cclxuICAgIGlmIChvcHRpb25zLnR5cGUgPT09ICd3ZnMnKSB7XHJcbiAgICAgIGZpbHRlclF1ZXJ5U3RyaW5nID0gdGhpcy5mb3JtYXRQcm9jZXNzZWRPZ2NGaWx0ZXIoZmlsdGVyUXVlcnlTdHJpbmcsIChvcHRpb25zIGFzIGFueSkucGFyYW1zLmZlYXR1cmVUeXBlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZpbHRlclF1ZXJ5U3RyaW5nO1xyXG5cclxuICB9XHJcblxyXG4gIHB1YmxpYyBmb3JtYXRQcm9jZXNzZWRPZ2NGaWx0ZXIoXHJcbiAgICBwcm9jZXNzZWRGaWx0ZXI6IHN0cmluZyxcclxuICAgIGxheWVyc09yVHlwZW5hbWVzOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgbGV0IGFwcGxpZWRGaWx0ZXIgPSAnJztcclxuICAgIGlmIChwcm9jZXNzZWRGaWx0ZXIubGVuZ3RoID09PSAwICYmIGxheWVyc09yVHlwZW5hbWVzLmluZGV4T2YoJywnKSA9PT0gLTEpIHtcclxuICAgICAgYXBwbGllZEZpbHRlciA9IHByb2Nlc3NlZEZpbHRlcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxheWVyc09yVHlwZW5hbWVzLnNwbGl0KCcsJykuZm9yRWFjaChsYXllck9yVHlwZW5hbWVzID0+IHtcclxuICAgICAgICBhcHBsaWVkRmlsdGVyID0gYCR7YXBwbGllZEZpbHRlcn0oJHtwcm9jZXNzZWRGaWx0ZXIucmVwbGFjZSgnZmlsdGVyPScsICcnKX0pYDtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBhcHBsaWVkRmlsdGVyID0gYXBwbGllZEZpbHRlci5yZXBsYWNlKC9cXChcXCkvZywgJycpO1xyXG4gICAgY29uc3QgZmlsdGVyVmFsdWUgPSBhcHBsaWVkRmlsdGVyLmxlbmd0aCA+IDAgPyBhcHBsaWVkRmlsdGVyLnJlcGxhY2UoJ2ZpbHRlcj0nLCAnJykgOiB1bmRlZmluZWQ7XHJcbiAgICByZXR1cm4gZmlsdGVyVmFsdWU7XHJcbiAgfVxyXG59XHJcbiJdfQ==