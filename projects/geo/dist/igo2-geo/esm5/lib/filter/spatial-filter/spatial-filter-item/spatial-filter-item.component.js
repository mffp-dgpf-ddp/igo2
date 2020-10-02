/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { SpatialFilterQueryType, SpatialFilterType } from '../../shared/spatial-filter.enum';
import { SelectionModel } from '@angular/cdk/collections';
import { IgoMap } from '../../../map';
import { SpatialFilterItemType } from './../../shared/spatial-filter.enum';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import * as olstyle from 'ol/style';
import * as olproj from 'ol/proj';
import { MatTreeNestedDataSource } from '@angular/material';
import { SpatialFilterService } from '../../shared/spatial-filter.service';
import { MeasureLengthUnit } from '../../../measure';
import { EntityStore } from '@igo2/common';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MessageService, LanguageService } from '@igo2/core';
/**
 * Spatial-Filter-Item (search parameters)
 */
var SpatialFilterItemComponent = /** @class */ (function () {
    function SpatialFilterItemComponent(cdRef, spatialFilterService, messageService, languageService) {
        this.cdRef = cdRef;
        this.spatialFilterService = spatialFilterService;
        this.messageService = messageService;
        this.languageService = languageService;
        this.layers = [];
        this.toggleSearch = new EventEmitter();
        this.itemTypeChange = new EventEmitter();
        this.thematicChange = new EventEmitter();
        this.drawZoneEvent = new EventEmitter();
        this.radiusEvent = new EventEmitter();
        this.freehandControl = new EventEmitter();
        this.clearButtonEvent = new EventEmitter();
        this.clearSearchEvent = new EventEmitter();
        this.export = new EventEmitter();
        this.itemType = [SpatialFilterItemType.Address, SpatialFilterItemType.Thematics];
        this.selectedItemType = SpatialFilterItemType.Address;
        this.treeControl = new NestedTreeControl((/**
         * @param {?} node
         * @return {?}
         */
        function (node) { return node.children; }));
        // For thematics and results tables
        this.displayedColumns = ['name', 'select'];
        this.childrens = [];
        this.groups = [];
        this.thematics = [];
        this.dataSource = new MatTreeNestedDataSource();
        this.selectedThematics = new SelectionModel(true, []);
        this.displayedColumnsResults = ['typeResults', 'nameResults'];
        // For geometry form field input
        this.value$ = new BehaviorSubject(undefined);
        this.drawGuide$ = new BehaviorSubject(null);
        this.overlayStyle$ = new BehaviorSubject(undefined);
        this.drawStyle$ = new BehaviorSubject(undefined);
        this.formControl = new FormControl();
        this.geometryTypeField = false;
        this.geometryTypes = ['Point', 'Polygon'];
        this.drawGuideField = false;
        this.drawGuide = null;
        this.drawGuidePlaceholder = '';
        this.measure = false;
        this.drawControlIsActive = true;
        this.freehandDrawIsActive = false;
        this.radiusFormControl = new FormControl();
        this.measureUnit = MeasureLengthUnit.Meters;
    }
    Object.defineProperty(SpatialFilterItemComponent.prototype, "type", {
        get: /**
         * @return {?}
         */
        function () {
            return this._type;
        },
        set: /**
         * @param {?} type
         * @return {?}
         */
        function (type) {
            var _this = this;
            this._type = type;
            /** @type {?} */
            var index = this.geometryTypes.findIndex((/**
             * @param {?} geom
             * @return {?}
             */
            function (geom) { return geom === _this.type; }));
            this.geometryType = this.geometryTypes[index];
            this.formControl.reset();
            this.radius = undefined;
            this.drawGuide$.next(null);
            this.drawStyle$.next(undefined);
            // Necessary to keep reference to the geometry form field input
            if (this.type === SpatialFilterType.Predefined) {
                /** @type {?} */
                var geojson = {
                    type: 'Point',
                    coordinates: ''
                };
                this.formControl.setValue(geojson);
            }
            // Necessary to apply the right style when geometry type is Point
            if (this.type === SpatialFilterType.Point) {
                this.radius = 1000; // Base radius
                this.radiusFormControl.setValue(this.radius);
                this.PointStyle = (/**
                 * @param {?} feature
                 * @param {?} resolution
                 * @return {?}
                 */
                function (feature, resolution) {
                    /** @type {?} */
                    var coordinates = olproj.transform(feature.getGeometry().getCoordinates(), _this.map.projection, 'EPSG:4326');
                    return new olstyle.Style({
                        image: new olstyle.Circle({
                            radius: _this.radius / (Math.cos((Math.PI / 180) * coordinates[1])) / resolution,
                            // Latitude correction
                            stroke: new olstyle.Stroke({
                                width: 2,
                                color: 'rgba(0, 153, 255)'
                            }),
                            fill: new olstyle.Fill({
                                color: 'rgba(0, 153, 255, 0.2)'
                            })
                        })
                    });
                });
                this.overlayStyle = this.PointStyle;
                this.drawStyle$.next(this.overlayStyle);
            }
            else {
                // If geometry types is Polygon
                this.radius = undefined;
                this.PolyStyle = (/**
                 * @param {?} feature
                 * @param {?} resolution
                 * @return {?}
                 */
                function (feature, resolution) {
                    return new olstyle.Style({
                        stroke: new olstyle.Stroke({
                            width: 2,
                            color: 'rgba(0, 153, 255)'
                        }),
                        fill: new olstyle.Fill({
                            color: 'rgba(0, 153, 255, 0.2)'
                        })
                    });
                });
                this.overlayStyle = this.PolyStyle;
            }
            this.overlayStyle$.next(this.overlayStyle);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpatialFilterItemComponent.prototype, "store", {
        get: /**
         * @return {?}
         */
        function () {
            return this._store;
        },
        set: /**
         * @param {?} store
         * @return {?}
         */
        function (store) {
            var _this = this;
            this._store = store;
            this._store.entities$.subscribe((/**
             * @return {?}
             */
            function () { _this.cdRef.detectChanges(); }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpatialFilterItemComponent.prototype, "measureUnits", {
        /**
         * Available measure units for the measure type given
         * @internal
         */
        get: /**
         * Available measure units for the measure type given
         * \@internal
         * @return {?}
         */
        function () {
            return [MeasureLengthUnit.Meters];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SpatialFilterItemComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.spatialFilterService.loadThematicsList()
            .subscribe((/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            var e_1, _a;
            try {
                for (var items_1 = tslib_1.__values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                    var item = items_1_1.value;
                    _this.childrens.push(item);
                    _this.childrens.sort((/**
                     * @param {?} a
                     * @param {?} b
                     * @return {?}
                     */
                    function (a, b) {
                        return a.name.localeCompare(b.name);
                    }));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            _this.childrens.forEach((/**
             * @param {?} child
             * @return {?}
             */
            function (child) {
                if (child.group && (_this.groups.indexOf(child.group) === -1)) {
                    _this.groups.push(child.group);
                    /** @type {?} */
                    var thematic = {
                        name: child.group,
                        children: []
                    };
                    _this.thematics.push(thematic);
                }
                if (!child.group) {
                    /** @type {?} */
                    var thematic = {
                        name: child.name,
                        children: [],
                        source: child.source
                    };
                    _this.thematics.push(thematic);
                }
                _this.thematics.sort((/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                function (a, b) {
                    return a.name.localeCompare(b.name);
                }));
            }));
            _this.thematics.forEach((/**
             * @param {?} thematic
             * @return {?}
             */
            function (thematic) {
                var e_2, _a;
                try {
                    for (var _b = tslib_1.__values(_this.childrens), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var child = _c.value;
                        if (child.group === thematic.name) {
                            thematic.children.push(child);
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }));
        }));
        this.dataSource.data = this.thematics;
        this.drawGuide$.next(null);
        this.value$.next(this.formControl.value ? this.formControl.value : undefined);
        this.value$$ = this.formControl.valueChanges.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            _this.value$.next(value ? value : undefined);
        }));
        this.value$.subscribe((/**
         * @return {?}
         */
        function () {
            _this.getRadius();
            _this.cdRef.detectChanges();
        }));
        this.radiusChanges$$ = this.radiusFormControl.valueChanges.subscribe((/**
         * @return {?}
         */
        function () {
            _this.getRadius();
            _this.cdRef.detectChanges();
        }));
    };
    /**
     * Unsubscribe to the value stream
     * @internal
     */
    /**
     * Unsubscribe to the value stream
     * \@internal
     * @return {?}
     */
    SpatialFilterItemComponent.prototype.ngOnDestroy = /**
     * Unsubscribe to the value stream
     * \@internal
     * @return {?}
     */
    function () {
        this.value$$.unsubscribe();
        this.cdRef.detach();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SpatialFilterItemComponent.prototype.onItemTypeChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.selectedItemType = event.value;
        this.itemTypeChange.emit(this.selectedItemType);
    };
    /**
     * Set the measure unit
     * @internal
     */
    /**
     * Set the measure unit
     * \@internal
     * @param {?} unit
     * @return {?}
     */
    SpatialFilterItemComponent.prototype.onMeasureUnitChange = /**
     * Set the measure unit
     * \@internal
     * @param {?} unit
     * @return {?}
     */
    function (unit) {
        this.measureUnit = unit;
    };
    /**
     * @return {?}
     */
    SpatialFilterItemComponent.prototype.isPredefined = /**
     * @return {?}
     */
    function () {
        return this.type === SpatialFilterType.Predefined;
    };
    /**
     * @return {?}
     */
    SpatialFilterItemComponent.prototype.isPolygon = /**
     * @return {?}
     */
    function () {
        return this.type === SpatialFilterType.Polygon;
    };
    /**
     * @return {?}
     */
    SpatialFilterItemComponent.prototype.isPoint = /**
     * @return {?}
     */
    function () {
        return this.type === SpatialFilterType.Point;
    };
    /**
     * @param {?} _
     * @param {?} node
     * @return {?}
     */
    SpatialFilterItemComponent.prototype.hasChild = /**
     * @param {?} _
     * @param {?} node
     * @return {?}
     */
    function (_, node) {
        if (node.children) {
            return node.children.length;
        }
        return false;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    SpatialFilterItemComponent.prototype.onToggleClick = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        this.treeControl.isExpanded(node) ? this.treeControl.collapse(node) : this.treeControl.expand(node);
    };
    /**
     * @param {?=} node
     * @return {?}
     */
    SpatialFilterItemComponent.prototype.isAllSelected = /**
     * @param {?=} node
     * @return {?}
     */
    function (node) {
        var _this = this;
        /** @type {?} */
        var numSelected;
        /** @type {?} */
        var numNodes = 0;
        if (!node) {
            numSelected = this.selectedThematics.selected.length;
            this.thematics.forEach((/**
             * @param {?} thematic
             * @return {?}
             */
            function (thematic) {
                if (_this.groups.indexOf(thematic.name) === -1) {
                    numNodes++;
                }
            }));
            this.childrens.forEach((/**
             * @param {?} children
             * @return {?}
             */
            function (children) {
                if (!_this.thematics.find((/**
                 * @param {?} thematic
                 * @return {?}
                 */
                function (thematic) { return thematic.source === children.source; }))) {
                    numNodes++;
                }
            }));
        }
        else {
            numSelected = node.children.length;
            node.children.forEach((/**
             * @param {?} children
             * @return {?}
             */
            function (children) {
                if (_this.selectedThematics.selected.find((/**
                 * @param {?} thematic
                 * @return {?}
                 */
                function (thematic) { return thematic === children; }))) {
                    numNodes++;
                }
            }));
        }
        if (numNodes >= 1) {
            return numSelected === numNodes;
        }
        else {
            return false;
        }
    };
    /**
     * @param {?} node
     * @return {?}
     */
    SpatialFilterItemComponent.prototype.hasChildrenSelected = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        var _this = this;
        /** @type {?} */
        var bool = false;
        node.children.forEach((/**
         * @param {?} child
         * @return {?}
         */
        function (child) {
            if (_this.selectedThematics.selected.find((/**
             * @param {?} thematic
             * @return {?}
             */
            function (thematic) { return thematic.source === child.source; }))) {
                bool = true;
            }
        }));
        return bool;
    };
    /**
     * Apply header checkbox
     */
    /**
     * Apply header checkbox
     * @return {?}
     */
    SpatialFilterItemComponent.prototype.masterToggle = /**
     * Apply header checkbox
     * @return {?}
     */
    function () {
        var _this = this;
        var e_3, _a;
        this.isAllSelected() ?
            this.selectedThematics.clear() :
            this.selectAll();
        /** @type {?} */
        var selectedThematicsName = [];
        try {
            for (var _b = tslib_1.__values(this.selectedThematics.selected), _c = _b.next(); !_c.done; _c = _b.next()) {
                var thematic = _c.value;
                selectedThematicsName.push(thematic);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        if (this.isAllSelected()) {
            this.thematics.forEach((/**
             * @param {?} thematic
             * @return {?}
             */
            function (thematic) {
                if (_this.hasChild(0, thematic)) {
                    _this.treeControl.expand(thematic);
                }
            }));
        }
        else {
            this.thematics.forEach((/**
             * @param {?} thematic
             * @return {?}
             */
            function (thematic) {
                if (_this.hasChild(0, thematic)) {
                    _this.treeControl.collapse(thematic);
                }
            }));
        }
        this.thematicChange.emit(selectedThematicsName);
    };
    /**
     * @param {?=} node
     * @return {?}
     */
    SpatialFilterItemComponent.prototype.selectAll = /**
     * @param {?=} node
     * @return {?}
     */
    function (node) {
        var _this = this;
        if (!node) {
            this.thematics.forEach((/**
             * @param {?} thematic
             * @return {?}
             */
            function (thematic) {
                if (_this.groups.indexOf(thematic.name) === -1) {
                    _this.selectedThematics.select(thematic);
                }
            }));
            this.childrens.forEach((/**
             * @param {?} children
             * @return {?}
             */
            function (children) {
                if (!_this.selectedThematics.selected.find((/**
                 * @param {?} thematic
                 * @return {?}
                 */
                function (thematic) { return thematic.source === children.source; }))) {
                    _this.selectedThematics.select(children);
                }
            }));
        }
        else {
            if (this.hasChild(0, node)) {
                node.children.forEach((/**
                 * @param {?} children
                 * @return {?}
                 */
                function (children) { return _this.selectedThematics.select(children); }));
            }
        }
    };
    /**
     * @param {?} node
     * @return {?}
     */
    SpatialFilterItemComponent.prototype.childrensToggle = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        var _this = this;
        var e_4, _a;
        this.isAllSelected(node) ?
            node.children.forEach((/**
             * @param {?} child
             * @return {?}
             */
            function (child) { return _this.selectedThematics.deselect(child); })) :
            this.selectAll(node);
        /** @type {?} */
        var selectedThematicsName = [];
        try {
            for (var _b = tslib_1.__values(this.selectedThematics.selected), _c = _b.next(); !_c.done; _c = _b.next()) {
                var thematic = _c.value;
                selectedThematicsName.push(thematic);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        this.treeControl.expand(node);
        this.thematicChange.emit(selectedThematicsName);
    };
    /**
     * Apply changes to the thematics selected tree and emit event
     */
    /**
     * Apply changes to the thematics selected tree and emit event
     * @param {?} nodeSelected
     * @return {?}
     */
    SpatialFilterItemComponent.prototype.onToggleChange = /**
     * Apply changes to the thematics selected tree and emit event
     * @param {?} nodeSelected
     * @return {?}
     */
    function (nodeSelected) {
        var _this = this;
        var e_5, _a;
        /** @type {?} */
        var selected = false;
        if (this.selectedThematics.selected.find((/**
         * @param {?} thematic
         * @return {?}
         */
        function (thematic) { return thematic.source === nodeSelected.source; })) !== undefined) {
            selected = true;
        }
        this.childrens.forEach((/**
         * @param {?} children
         * @return {?}
         */
        function (children) {
            if (children === nodeSelected && selected === false) {
                _this.selectedThematics.select(children);
            }
            if (children === nodeSelected && selected === true) {
                _this.selectedThematics.deselect(children);
            }
        }));
        this.thematics.forEach((/**
         * @param {?} thematic
         * @return {?}
         */
        function (thematic) {
            if (thematic === nodeSelected && selected === false) {
                _this.selectedThematics.select(thematic);
            }
            if (thematic === nodeSelected && selected === true) {
                _this.selectedThematics.deselect(thematic);
            }
        }));
        /** @type {?} */
        var selectedThematicsName = [];
        try {
            for (var _b = tslib_1.__values(this.selectedThematics.selected), _c = _b.next(); !_c.done; _c = _b.next()) {
                var thematic = _c.value;
                selectedThematicsName.push(thematic);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
        this.thematicChange.emit(selectedThematicsName);
    };
    /**
     * @return {?}
     */
    SpatialFilterItemComponent.prototype.onDrawControlChange = /**
     * @return {?}
     */
    function () {
        this.drawControlIsActive = !this.drawControlIsActive;
    };
    /**
     * @return {?}
     */
    SpatialFilterItemComponent.prototype.onfreehandControlChange = /**
     * @return {?}
     */
    function () {
        this.freehandDrawIsActive = !this.freehandDrawIsActive;
        this.freehandControl.emit(this.freehandDrawIsActive);
    };
    /**
     * Launch search button
     */
    /**
     * Launch search button
     * @return {?}
     */
    SpatialFilterItemComponent.prototype.toggleSearchButton = /**
     * Launch search button
     * @return {?}
     */
    function () {
        if (this.isPolygon() || this.isPoint()) {
            this.drawZone = (/** @type {?} */ (this.formControl.value));
            this.drawZone.meta = {
                id: undefined,
                title: 'Zone'
            };
            this.drawZone.properties = {
                nom: 'Zone'
            };
            this.drawZoneEvent.emit(this.drawZone);
        }
        this.radiusEvent.emit(this.radius);
        this.toggleSearch.emit();
    };
    /**
     * Launch clear button (clear store and map layers)
     */
    /**
     * Launch clear button (clear store and map layers)
     * @return {?}
     */
    SpatialFilterItemComponent.prototype.clearButton = /**
     * Launch clear button (clear store and map layers)
     * @return {?}
     */
    function () {
        this.loading = true;
        this.map.removeLayers(this.layers);
        this.loading = false;
        if (this.store) {
            this.store.clear();
        }
        this.clearButtonEvent.emit([]);
    };
    /**
     * Launch clear search (clear field if type is predefined)
     */
    /**
     * Launch clear search (clear field if type is predefined)
     * @return {?}
     */
    SpatialFilterItemComponent.prototype.clearSearch = /**
     * Launch clear search (clear field if type is predefined)
     * @return {?}
     */
    function () {
        this.selectedThematics.clear();
        this.thematicChange.emit([]);
        this.clearSearchEvent.emit();
    };
    /**
     * Verify conditions of incomplete fields or busy service
     */
    /**
     * Verify conditions of incomplete fields or busy service
     * @return {?}
     */
    SpatialFilterItemComponent.prototype.disableSearchButton = /**
     * Verify conditions of incomplete fields or busy service
     * @return {?}
     */
    function () {
        if (this.type === SpatialFilterType.Predefined) {
            if (this.selectedItemType === SpatialFilterItemType.Address) {
                if (this.queryType !== undefined && this.zone !== undefined) {
                    return this.loading;
                }
            }
            if (this.selectedItemType === SpatialFilterItemType.Thematics) {
                if (this.queryType !== undefined && this.zone !== undefined && this.selectedThematics.selected.length > 0) {
                    return this.loading;
                }
            }
        }
        if (this.type === SpatialFilterType.Polygon || this.type === SpatialFilterType.Point) {
            if (this.selectedItemType === SpatialFilterItemType.Address && this.formControl.value !== null) {
                return this.loading;
            }
            if (this.selectedItemType === SpatialFilterItemType.Thematics) {
                if (this.selectedThematics.selected.length > 0 && this.formControl.value !== null) {
                    return this.loading;
                }
            }
        }
        return true;
    };
    /**
     * Manage radius value at user change
     */
    /**
     * Manage radius value at user change
     * @return {?}
     */
    SpatialFilterItemComponent.prototype.getRadius = /**
     * Manage radius value at user change
     * @return {?}
     */
    function () {
        /** @type {?} */
        var formValue;
        this.formControl.value !== null ? formValue = this.formControl.value.radius : formValue = undefined;
        if (this.type === SpatialFilterType.Point) {
            if (!this.freehandDrawIsActive) {
                if (this.radiusFormControl.value >= 10000 || this.radiusFormControl.value < 0) {
                    this.messageService.alert(this.languageService.translate.instant('igo.geo.spatialFilter.radiusAlert'), this.languageService.translate.instant('igo.geo.spatialFilter.warning'));
                    this.radius = 1000;
                    this.radiusFormControl.setValue(this.radius);
                    this.drawGuide$.next(this.radius);
                    return;
                }
            }
            else {
                if (this.radiusFormControl.value >= 10000 || this.radiusFormControl.value < 0) {
                    this.messageService.alert(this.languageService.translate.instant('igo.geo.spatialFilter.radiusAlert'), this.languageService.translate.instant('igo.geo.spatialFilter.warning'));
                    this.radius = 1000;
                    this.radiusFormControl.setValue(this.radius);
                    this.drawGuide$.next(this.radius);
                    return;
                }
                if (formValue >= 10000) {
                    this.messageService.alert(this.languageService.translate.instant('igo.geo.spatialFilter.radiusAlert'), this.languageService.translate.instant('igo.geo.spatialFilter.warning'));
                    this.formControl.reset();
                    return;
                }
                if (formValue) {
                    if (formValue !== this.radiusFormControl.value) {
                        this.radiusFormControl.setValue(formValue);
                    }
                    this.formControl.value.radius = undefined;
                }
            }
            this.radius = this.radiusFormControl.value;
            this.drawGuide$.next(this.radius);
            this.overlayStyle$.next(this.PointStyle);
            this.drawStyle$.next(this.PointStyle);
        }
    };
    SpatialFilterItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-spatial-filter-item',
                    template: "<igo-geometry-form-field-input\r\n  [formControl]=\"formControl\"\r\n  [map]=\"map\"\r\n  [geometryType]=\"geometryType\"\r\n  [drawGuide]=\"drawGuide$ | async\"\r\n  [measure]=\"measure\"\r\n  [drawControlIsActive]=\"drawControlIsActive\"\r\n  [freehandDrawIsActive]=\"freehandDrawIsActive\"\r\n  [drawStyle]=\"drawStyle$ | async\"\r\n  [overlayStyle]=\"overlayStyle$ | async\"\r\n  [radius]=\"radius\">\r\n</igo-geometry-form-field-input>\r\n\r\n<div class=\"header\">\r\n    <mat-slide-toggle *ngIf=\"!isPredefined()\"\r\n      [checked]=\"drawControlIsActive\"\r\n      [labelPosition]=\"'before'\"\r\n      (change)=\"onDrawControlChange()\">\r\n      {{'igo.geo.spatialFilter.drawControl' | translate}}\r\n    </mat-slide-toggle>\r\n    <mat-slide-toggle *ngIf=\"!isPredefined()\"\r\n      [checked]=\"freehandDrawIsActive\"\r\n      [labelPosition]=\"'before'\"\r\n      (change)=\"onfreehandControlChange()\">\r\n      {{'igo.geo.spatialFilter.freehandControl' | translate}}\r\n    </mat-slide-toggle>\r\n</div>\r\n\r\n  <div class=\"radius-unit\" *ngIf=\"isPoint()\">\r\n    <form class=\"radius-form\">\r\n      <mat-form-field class=\"radius\">\r\n        <input type=\"number\" matInput placeholder=\"{{'igo.geo.spatialFilter.radius' | translate}}\" [formControl]=\"radiusFormControl\"\r\n        [value]=\"1000\" (input)=\"getRadius()\" [readonly]=\"this.freehandDrawIsActive && this.formControl.value === null\">\r\n        <label class=\"unit-field\">\r\n          {{('igo.geo.measure.' + measureUnit) | translate}}\r\n        </label>\r\n      </mat-form-field>\r\n    </form>\r\n  </div>\r\n\r\n  <mat-label class=\"title mat-typography\">{{'igo.geo.spatialFilter.search' | translate}} : </mat-label>\r\n  <mat-radio-group [value]=\"selectedItemType\">\r\n      <mat-radio-button *ngFor=\"let item of itemType\"\r\n        [value]=\"item\"\r\n        (change)=\"onItemTypeChange($event)\">\r\n        {{'igo.geo.spatialFilter.' + item | translate}}\r\n      </mat-radio-button>\r\n  </mat-radio-group>\r\n\r\n<div class=\"thematics\" *ngIf=\"selectedItemType==='Thematics'\">\r\n  <mat-table>\r\n      <!-- Name Column -->\r\n      <ng-container matColumnDef=\"name\">\r\n        <mat-header-cell *matHeaderCellDef class=\"thematics-header\">{{'igo.geo.spatialFilter.Thematics' | translate}}</mat-header-cell>\r\n      </ng-container>\r\n\r\n      <!-- Select Column -->\r\n      <ng-container matColumnDef=\"select\">\r\n        <mat-header-cell *matHeaderCellDef class=\"checks-header\">\r\n          <mat-checkbox (change)=\"$event ? masterToggle() : null\"\r\n                        [checked]=\"isAllSelected()\"\r\n                        [indeterminate]=\"selectedThematics.hasValue() && !isAllSelected()\">\r\n          </mat-checkbox>\r\n        </mat-header-cell>\r\n    </ng-container>\r\n\r\n    <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n    <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n\r\n  </mat-table>\r\n\r\n  <mat-tree [dataSource]=\"dataSource\" [treeControl]=\"treeControl\">\r\n    <!-- This is the tree node template for leaf nodes -->\r\n    <mat-tree-node *matTreeNodeDef=\"let node\" matTreeNodeToggle>\r\n      <li class=\"mat-tree-node\">\r\n        <!-- use a disabled button to provide padding for tree leaf -->\r\n        <button mat-icon-button disabled></button>\r\n        {{node.name}}\r\n        <mat-checkbox class=\"tree-check\" (click)=\"$event.stopPropagation()\"\r\n                      (change)=\"$event ? onToggleChange(node) : null\"\r\n                      [checked]=\"selectedThematics.isSelected(node)\">\r\n        </mat-checkbox>\r\n      </li>\r\n    </mat-tree-node>\r\n\r\n    <!-- This is the tree node template for expandable nodes -->\r\n    <mat-nested-tree-node *matTreeNodeDef=\"let node; when: hasChild\">\r\n        <div class=\"mat-tree-node\">\r\n          <button mat-icon-button\r\n            (click)=\"onToggleClick(node)\">\r\n            <mat-icon [svgIcon]=\"treeControl.isExpanded(node) ? 'chevron-down' : 'chevron-right'\"></mat-icon>\r\n          </button>\r\n          {{node.name}}\r\n          <mat-checkbox class=\"tree-check-2\" (change)=\"$event ? childrensToggle(node) : null\"\r\n                        [checked]=\"isAllSelected(node)\"\r\n                        [indeterminate]=\"hasChildrenSelected(node) && !isAllSelected(node)\">\r\n          </mat-checkbox>\r\n        </div>\r\n        <ul class=\"tree-ul\" [class.example-tree-invisible]=\"!treeControl.isExpanded(node)\">\r\n          <ng-container matTreeNodeOutlet></ng-container>\r\n        </ul>\r\n    </mat-nested-tree-node>\r\n\r\n  </mat-tree>\r\n</div>\r\n\r\n<div class=\"buttons\">\r\n\r\n    <button *ngIf=\"isPredefined()\" mat-raised-button class=\"clear-search-button\" [disabled]=\"!queryType && !zone\"\r\n      (click)=\"clearSearch()\">\r\n        {{'igo.geo.spatialFilter.clearSearch' | translate}}\r\n    </button>\r\n\r\n  <button *ngIf=\"isPolygon() || isPoint()\" mat-raised-button class=\"clear-form-button\" [disabled]=\"this.formControl.value === null\"\r\n    (click)=\"this.formControl.reset()\">\r\n    {{'igo.geo.spatialFilter.clearForm' | translate}}\r\n  </button>\r\n\r\n  <button mat-raised-button class=\"search-button\" [disabled]=\"disableSearchButton()\" color=\"primary\"\r\n    (click)=\"toggleSearchButton()\">\r\n    {{'igo.geo.spatialFilter.goSearch' | translate}}\r\n  </button>\r\n\r\n  <button mat-raised-button class=\"remove-button\" [disabled]=\"!store.entities$.getValue().length\" (click)=\"clearButton()\">\r\n    {{'igo.geo.spatialFilter.removeLayer' | translate}}\r\n  </button>\r\n\r\n  <button mat-raised-button class=\"export-button\" [disabled]=\"!store.entities$.getValue().length\" (click)=\"export.emit()\">\r\n    {{'igo.geo.spatialFilter.exportLayer' | translate}}\r\n  </button>\r\n\r\n</div>\r\n\r\n<div class=\"results\" *ngIf=\"store\">\r\n  <mat-table class=\"results-list\" [dataSource]=\"store.entities$.value\">\r\n\r\n    <!-- Type Column -->\r\n    <ng-container matColumnDef=\"typeResults\">\r\n        <mat-header-cell *matHeaderCellDef>{{'igo.geo.spatialFilter.type' | translate}}</mat-header-cell>\r\n        <mat-cell *matCellDef=\"let result\"> {{result.meta.title}} </mat-cell>\r\n      </ng-container>\r\n\r\n    <!-- Name Column -->\r\n    <ng-container matColumnDef=\"nameResults\">\r\n      <mat-header-cell *matHeaderCellDef>{{'igo.geo.spatialFilter.searchResults' | translate}}</mat-header-cell>\r\n      <mat-cell *matCellDef=\"let result\"> {{result.properties.nom}} </mat-cell>\r\n    </ng-container>\r\n\r\n    <mat-header-row *matHeaderRowDef=\"displayedColumnsResults\"></mat-header-row>\r\n    <mat-row *matRowDef=\"let row; columns: displayedColumnsResults;\"></mat-row>\r\n  </mat-table>\r\n</div>",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".header{margin-top:5px;width:100%}.mat-slide-toggle{padding:5px;margin-bottom:15px;width:98%}.mat-slide-toggle ::ng-deep .mat-slide-toggle-content{width:calc(100% - 20px)}.radius-form,.title{margin-left:5px}.title{font-size:initial}.mat-radio-group{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;padding-top:10px}.mat-radio-button{display:-webkit-inline-box;display:inline-flex;position:relative;margin-left:16px;margin-top:10px}.mat-form-field{margin-top:5px}.mat-column-select{overflow:auto}.buttons{margin-top:10px}.search-button{left:25px;width:150px}.remove-button{margin:12px;width:150px}.clear-form-button,.clear-search-button{left:10px;width:150px}.thematics{max-height:150px;overflow:auto;margin-top:5px;width:98%}.results{overflow:auto;max-height:250px;width:98%}.mat-column-typeResults{max-width:100px;margin-right:5px}.radius{width:90%}.radius ::ng-deep .mat-form-field-infix{display:-webkit-inline-box;display:inline-flex}.unit-field{padding-left:5px;padding-right:5px}.example-tree-invisible{display:none}.tree-ul{margin:0;padding:0 0 0 20px;list-style-type:none}.tree-check,.tree-check-2{position:relative;margin-left:auto;margin-right:5px}.thematics-header{max-width:250px}.checks-header{padding:none;max-width:calc(100% - 316px);overflow:hidden}.mat-checkbox{padding:5px}.mat-tree-node{position:relative;min-height:42px;width:280px}.mat-header-cell{height:56px}"]
                }] }
    ];
    /** @nocollapse */
    SpatialFilterItemComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: SpatialFilterService },
        { type: MessageService },
        { type: LanguageService }
    ]; };
    SpatialFilterItemComponent.propDecorators = {
        map: [{ type: Input }],
        type: [{ type: Input }],
        queryType: [{ type: Input }],
        zone: [{ type: Input }],
        loading: [{ type: Input }],
        store: [{ type: Input }],
        layers: [{ type: Input }],
        toggleSearch: [{ type: Output }],
        itemTypeChange: [{ type: Output }],
        thematicChange: [{ type: Output }],
        drawZoneEvent: [{ type: Output }],
        radiusEvent: [{ type: Output }],
        freehandControl: [{ type: Output }],
        clearButtonEvent: [{ type: Output }],
        clearSearchEvent: [{ type: Output }],
        export: [{ type: Output }]
    };
    return SpatialFilterItemComponent;
}());
export { SpatialFilterItemComponent };
if (false) {
    /** @type {?} */
    SpatialFilterItemComponent.prototype.map;
    /**
     * @type {?}
     * @private
     */
    SpatialFilterItemComponent.prototype._type;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.queryType;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.zone;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.loading;
    /**
     * @type {?}
     * @private
     */
    SpatialFilterItemComponent.prototype._store;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.layers;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.toggleSearch;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.itemTypeChange;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.thematicChange;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.drawZoneEvent;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.radiusEvent;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.freehandControl;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.clearButtonEvent;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.clearSearchEvent;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.export;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.itemType;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.selectedItemType;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.selectedSourceAddress;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.treeControl;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.displayedColumns;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.childrens;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.groups;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.thematics;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.dataSource;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.selectedThematics;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.displayedColumnsResults;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.value$;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.drawGuide$;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.overlayStyle$;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.drawStyle$;
    /**
     * @type {?}
     * @private
     */
    SpatialFilterItemComponent.prototype.value$$;
    /**
     * @type {?}
     * @private
     */
    SpatialFilterItemComponent.prototype.radiusChanges$$;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.formControl;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.geometryType;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.geometryTypeField;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.geometryTypes;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.drawGuideField;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.drawGuide;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.drawGuidePlaceholder;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.measure;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.drawControlIsActive;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.freehandDrawIsActive;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.drawStyle;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.drawZone;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.overlayStyle;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.PointStyle;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.PolyStyle;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.radius;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.radiusFormControl;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.measureUnit;
    /**
     * @type {?}
     * @private
     */
    SpatialFilterItemComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    SpatialFilterItemComponent.prototype.spatialFilterService;
    /**
     * @type {?}
     * @private
     */
    SpatialFilterItemComponent.prototype.messageService;
    /**
     * @type {?}
     * @private
     */
    SpatialFilterItemComponent.prototype.languageService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhdGlhbC1maWx0ZXItaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL3NwYXRpYWwtZmlsdGVyL3NwYXRpYWwtZmlsdGVyLWl0ZW0vc3BhdGlhbC1maWx0ZXItaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLE1BQU0sRUFDTixZQUFZLEVBR2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHNCQUFzQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDN0YsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdEMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFM0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxlQUFlLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBSXJELE9BQU8sS0FBSyxPQUFPLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE9BQU8sS0FBSyxNQUFNLE1BQU0sU0FBUyxDQUFDO0FBRWxDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzVELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFM0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFdEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsTUFBTSxZQUFZLENBQUM7Ozs7QUFLN0Q7SUFpS0Usb0NBQ1UsS0FBd0IsRUFDeEIsb0JBQTBDLEVBQzFDLGNBQThCLEVBQzlCLGVBQWdDO1FBSGhDLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ3hCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQXBFakMsV0FBTSxHQUFZLEVBQUUsQ0FBQztRQUVwQixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbEMsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBeUIsQ0FBQztRQUUzRCxtQkFBYyxHQUFHLElBQUksWUFBWSxFQUEyQixDQUFDO1FBRTdELGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUU1QyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDekMsb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBRTlDLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFFL0MscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV0QyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUUvQixhQUFRLEdBQTRCLENBQUMscUJBQXFCLENBQUMsT0FBTyxFQUFFLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JHLHFCQUFnQixHQUEwQixxQkFBcUIsQ0FBQyxPQUFPLENBQUM7UUFHL0UsZ0JBQVcsR0FBRyxJQUFJLGlCQUFpQjs7OztRQUF3QixVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxRQUFRLEVBQWIsQ0FBYSxFQUFDLENBQUM7O1FBRzNFLHFCQUFnQixHQUFhLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELGNBQVMsR0FBNEIsRUFBRSxDQUFDO1FBQ3hDLFdBQU0sR0FBYSxFQUFFLENBQUM7UUFDdEIsY0FBUyxHQUE0QixFQUFFLENBQUM7UUFDeEMsZUFBVSxHQUFHLElBQUksdUJBQXVCLEVBQXlCLENBQUM7UUFDbEUsc0JBQWlCLEdBQUcsSUFBSSxjQUFjLENBQXdCLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN4RSw0QkFBdUIsR0FBYSxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsQ0FBQzs7UUFHMUUsV0FBTSxHQUFxQyxJQUFJLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxRSxlQUFVLEdBQTRCLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hFLGtCQUFhLEdBQTZCLElBQUksZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pFLGVBQVUsR0FBNkIsSUFBSSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFLL0QsZ0JBQVcsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBRWhDLHNCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMxQixrQkFBYSxHQUFhLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQy9DLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLGNBQVMsR0FBVyxJQUFJLENBQUM7UUFDekIseUJBQW9CLEdBQUcsRUFBRSxDQUFDO1FBQzFCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsd0JBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQzNCLHlCQUFvQixHQUFHLEtBQUssQ0FBQztRQVE3QixzQkFBaUIsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBRXRDLGdCQUFXLEdBQXNCLGlCQUFpQixDQUFDLE1BQU0sQ0FBQztJQU1wQixDQUFDO0lBM0o5QyxzQkFDSSw0Q0FBSTs7OztRQURSO1lBRUUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3BCLENBQUM7Ozs7O1FBQ0QsVUFBUyxJQUF1QjtZQUFoQyxpQkF3REM7WUF2REMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7O2dCQUNaLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVM7Ozs7WUFBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksS0FBSyxLQUFJLENBQUMsSUFBSSxFQUFsQixDQUFrQixFQUFDO1lBQ3RFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRWhDLCtEQUErRDtZQUMvRCxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssaUJBQWlCLENBQUMsVUFBVSxFQUFFOztvQkFDeEMsT0FBTyxHQUFvQjtvQkFDL0IsSUFBSSxFQUFFLE9BQU87b0JBQ2IsV0FBVyxFQUFFLEVBQUU7aUJBQ2hCO2dCQUNELElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3BDO1lBRUQsaUVBQWlFO1lBQ2pFLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsY0FBYztnQkFDbEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzdDLElBQUksQ0FBQyxVQUFVOzs7OztnQkFBRyxVQUFDLE9BQWtCLEVBQUUsVUFBa0I7O3dCQUNqRCxXQUFXLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxFQUFFLEVBQUUsS0FBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDO29CQUM5RyxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBRTt3QkFDeEIsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBRTs0QkFDekIsTUFBTSxFQUFFLEtBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVU7OzRCQUMvRSxNQUFNLEVBQUUsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDO2dDQUN6QixLQUFLLEVBQUUsQ0FBQztnQ0FDUixLQUFLLEVBQUUsbUJBQW1COzZCQUMzQixDQUFDOzRCQUNGLElBQUksRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUM7Z0NBQ3JCLEtBQUssRUFBRSx3QkFBd0I7NkJBQ2hDLENBQUM7eUJBQ0gsQ0FBQztxQkFDSCxDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFBLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDekM7aUJBQU07Z0JBQ0wsK0JBQStCO2dCQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLFNBQVM7Ozs7O2dCQUFHLFVBQUMsT0FBTyxFQUFFLFVBQVU7b0JBQ25DLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFFO3dCQUN4QixNQUFNLEVBQUUsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDOzRCQUN6QixLQUFLLEVBQUUsQ0FBQzs0QkFDUixLQUFLLEVBQUUsbUJBQW1CO3lCQUMzQixDQUFDO3dCQUNGLElBQUksRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUM7NEJBQ3JCLEtBQUssRUFBRSx3QkFBd0I7eUJBQ2hDLENBQUM7cUJBQ0gsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQSxDQUFDO2dCQUNGLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQzthQUNwQztZQUNELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM3QyxDQUFDOzs7T0F6REE7SUFrRUQsc0JBQ0ksNkNBQUs7Ozs7UUFEVDtZQUVFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQixDQUFDOzs7OztRQUNELFVBQVUsS0FBMkI7WUFBckMsaUJBR0M7WUFGQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTOzs7WUFBQyxjQUFRLEtBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQztRQUN6RSxDQUFDOzs7T0FKQTtJQVdELHNCQUFJLG9EQUFZO1FBSmhCOzs7V0FHRzs7Ozs7O1FBQ0g7WUFDRSxPQUFPLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEMsQ0FBQzs7O09BQUE7Ozs7SUF3RUQsNkNBQVE7OztJQUFSO1FBQUEsaUJBd0RDO1FBdkRDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxpQkFBaUIsRUFBRTthQUM1QyxTQUFTOzs7O1FBQUMsVUFBQyxLQUE4Qjs7O2dCQUN4QyxLQUFtQixJQUFBLFVBQUEsaUJBQUEsS0FBSyxDQUFBLDRCQUFBLCtDQUFFO29CQUFyQixJQUFNLElBQUksa0JBQUE7b0JBQ2IsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzFCLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSTs7Ozs7b0JBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQzt3QkFDdkIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3RDLENBQUMsRUFBQyxDQUFDO2lCQUNKOzs7Ozs7Ozs7WUFDRCxLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU87Ozs7WUFBQyxVQUFBLEtBQUs7Z0JBQzFCLElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUM1RCxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7O3dCQUN4QixRQUFRLEdBQTBCO3dCQUN0QyxJQUFJLEVBQUUsS0FBSyxDQUFDLEtBQUs7d0JBQ2pCLFFBQVEsRUFBRSxFQUFFO3FCQUNiO29CQUNELEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUMvQjtnQkFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTs7d0JBQ1YsUUFBUSxHQUEwQjt3QkFDdEMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO3dCQUNoQixRQUFRLEVBQUUsRUFBRTt3QkFDWixNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07cUJBQ3JCO29CQUNELEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUMvQjtnQkFDRCxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUk7Ozs7O2dCQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUM7b0JBQ3ZCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0QyxDQUFDLEVBQUMsQ0FBQztZQUNMLENBQUMsRUFBQyxDQUFDO1lBQ0gsS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPOzs7O1lBQUMsVUFBQSxRQUFROzs7b0JBQzdCLEtBQW9CLElBQUEsS0FBQSxpQkFBQSxLQUFJLENBQUMsU0FBUyxDQUFBLGdCQUFBLDRCQUFFO3dCQUEvQixJQUFNLEtBQUssV0FBQTt3QkFDZCxJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssUUFBUSxDQUFDLElBQUksRUFBRTs0QkFDakMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQy9CO3FCQUNGOzs7Ozs7Ozs7WUFDSCxDQUFDLEVBQUMsQ0FBQztRQUNMLENBQUMsRUFBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUV0QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsU0FBUzs7OztRQUFDLFVBQUMsS0FBc0I7WUFDNUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlDLENBQUMsRUFBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTOzs7UUFBQztZQUNwQixLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsS0FBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUM3QixDQUFDLEVBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxTQUFTOzs7UUFBQztZQUNuRSxLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsS0FBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUM3QixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUNILGdEQUFXOzs7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3RCLENBQUM7Ozs7O0lBRUQscURBQWdCOzs7O0lBQWhCLFVBQWlCLEtBQUs7UUFDcEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDcEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7OztJQUNILHdEQUFtQjs7Ozs7O0lBQW5CLFVBQW9CLElBQXVCO1FBQ3pDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7Ozs7SUFFRCxpREFBWTs7O0lBQVo7UUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssaUJBQWlCLENBQUMsVUFBVSxDQUFDO0lBQ3BELENBQUM7Ozs7SUFFRCw4Q0FBUzs7O0lBQVQ7UUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssaUJBQWlCLENBQUMsT0FBTyxDQUFDO0lBQ2pELENBQUM7Ozs7SUFFRCw0Q0FBTzs7O0lBQVA7UUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssaUJBQWlCLENBQUMsS0FBSyxDQUFDO0lBQy9DLENBQUM7Ozs7OztJQUVELDZDQUFROzs7OztJQUFSLFVBQVMsQ0FBUyxFQUFFLElBQTJCO1FBQzdDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1NBQzdCO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7OztJQUVELGtEQUFhOzs7O0lBQWIsVUFBYyxJQUEyQjtRQUN2QyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RHLENBQUM7Ozs7O0lBRUQsa0RBQWE7Ozs7SUFBYixVQUFjLElBQTRCO1FBQTFDLGlCQTZCQzs7WUE1QkssV0FBVzs7WUFDWCxRQUFRLEdBQUcsQ0FBQztRQUNoQixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQ3JELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTzs7OztZQUFDLFVBQUEsUUFBUTtnQkFDN0IsSUFBSSxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7b0JBQzdDLFFBQVEsRUFBRSxDQUFDO2lCQUNaO1lBQ0gsQ0FBQyxFQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU87Ozs7WUFBQyxVQUFBLFFBQVE7Z0JBQzdCLElBQUksQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUk7Ozs7Z0JBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxNQUFNLEVBQW5DLENBQW1DLEVBQUMsRUFBRTtvQkFDekUsUUFBUSxFQUFFLENBQUM7aUJBQ1o7WUFDSCxDQUFDLEVBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPOzs7O1lBQUMsVUFBQSxRQUFRO2dCQUM1QixJQUFJLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSTs7OztnQkFBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsS0FBSyxRQUFRLEVBQXJCLENBQXFCLEVBQUMsRUFBRTtvQkFDM0UsUUFBUSxFQUFFLENBQUM7aUJBQ1o7WUFDSCxDQUFDLEVBQUMsQ0FBQztTQUNKO1FBRUQsSUFBSSxRQUFRLElBQUksQ0FBQyxFQUFFO1lBQ2pCLE9BQU8sV0FBVyxLQUFLLFFBQVEsQ0FBQztTQUNqQzthQUFNO1lBQ0wsT0FBTyxLQUFLLENBQUM7U0FDZDtJQUNILENBQUM7Ozs7O0lBRUQsd0RBQW1COzs7O0lBQW5CLFVBQW9CLElBQTJCO1FBQS9DLGlCQVFDOztZQVBLLElBQUksR0FBRyxLQUFLO1FBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTzs7OztRQUFDLFVBQUEsS0FBSztZQUN6QixJQUFJLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSTs7OztZQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsTUFBTSxFQUFoQyxDQUFnQyxFQUFDLEVBQUU7Z0JBQ3RGLElBQUksR0FBRyxJQUFJLENBQUM7YUFDYjtRQUNILENBQUMsRUFBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsaURBQVk7Ozs7SUFBWjtRQUFBLGlCQXdCQzs7UUF2QkMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDOztZQUViLHFCQUFxQixHQUE0QixFQUFFOztZQUN6RCxLQUF1QixJQUFBLEtBQUEsaUJBQUEsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQSxnQkFBQSw0QkFBRTtnQkFBbkQsSUFBTSxRQUFRLFdBQUE7Z0JBQ2pCLHFCQUFxQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN0Qzs7Ozs7Ozs7O1FBRUQsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUU7WUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPOzs7O1lBQUMsVUFBQSxRQUFRO2dCQUM3QixJQUFJLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxFQUFFO29CQUM5QixLQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDbkM7WUFDSCxDQUFDLEVBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU87Ozs7WUFBQyxVQUFBLFFBQVE7Z0JBQzdCLElBQUksS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLEVBQUU7b0JBQzlCLEtBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUNyQztZQUNILENBQUMsRUFBQyxDQUFDO1NBQ0o7UUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ2xELENBQUM7Ozs7O0lBRUQsOENBQVM7Ozs7SUFBVCxVQUFVLElBQTRCO1FBQXRDLGlCQWlCQztRQWhCQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPOzs7O1lBQUMsVUFBQSxRQUFRO2dCQUM3QixJQUFJLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtvQkFDN0MsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDekM7WUFDSCxDQUFDLEVBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTzs7OztZQUFDLFVBQUEsUUFBUTtnQkFDN0IsSUFBSSxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSTs7OztnQkFBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxNQUFNLEtBQUssUUFBUSxDQUFDLE1BQU0sRUFBbkMsQ0FBbUMsRUFBQyxFQUFFO29CQUMxRixLQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUN6QztZQUNILENBQUMsRUFBQyxDQUFDO1NBQ0o7YUFBTTtZQUNMLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTzs7OztnQkFBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQXZDLENBQXVDLEVBQUMsQ0FBQzthQUM1RTtTQUNGO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxvREFBZTs7OztJQUFmLFVBQWdCLElBQTJCO1FBQTNDLGlCQVdDOztRQVZDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU87Ozs7WUFBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQXRDLENBQXNDLEVBQUMsQ0FBQyxDQUFDO1lBQ3hFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7O1lBRWYscUJBQXFCLEdBQTRCLEVBQUU7O1lBQ3pELEtBQXVCLElBQUEsS0FBQSxpQkFBQSxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFBLGdCQUFBLDRCQUFFO2dCQUFuRCxJQUFNLFFBQVEsV0FBQTtnQkFDakIscUJBQXFCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3RDOzs7Ozs7Ozs7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gsbURBQWM7Ozs7O0lBQWQsVUFBZSxZQUFtQztRQUFsRCxpQkE0QkM7OztZQTNCSyxRQUFRLEdBQUcsS0FBSztRQUNwQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSTs7OztRQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLE1BQU0sS0FBSyxZQUFZLENBQUMsTUFBTSxFQUF2QyxDQUF1QyxFQUFDLEtBQUssU0FBUyxFQUFFO1lBQzNHLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDakI7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU87Ozs7UUFBQyxVQUFBLFFBQVE7WUFDN0IsSUFBSSxRQUFRLEtBQUssWUFBWSxJQUFJLFFBQVEsS0FBSyxLQUFLLEVBQUU7Z0JBQ25ELEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDekM7WUFDRCxJQUFJLFFBQVEsS0FBSyxZQUFZLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtnQkFDbEQsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUMzQztRQUNILENBQUMsRUFBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQSxRQUFRO1lBQzdCLElBQUksUUFBUSxLQUFLLFlBQVksSUFBSSxRQUFRLEtBQUssS0FBSyxFQUFFO2dCQUNuRCxLQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3pDO1lBQ0QsSUFBSSxRQUFRLEtBQUssWUFBWSxJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7Z0JBQ2xELEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDM0M7UUFDSCxDQUFDLEVBQUMsQ0FBQzs7WUFFRyxxQkFBcUIsR0FBNEIsRUFBRTs7WUFDekQsS0FBdUIsSUFBQSxLQUFBLGlCQUFBLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUEsZ0JBQUEsNEJBQUU7Z0JBQW5ELElBQU0sUUFBUSxXQUFBO2dCQUNqQixxQkFBcUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDdEM7Ozs7Ozs7OztRQUNELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDbEQsQ0FBQzs7OztJQUVELHdEQUFtQjs7O0lBQW5CO1FBQ0UsSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDO0lBQ3ZELENBQUM7Ozs7SUFFRCw0REFBdUI7OztJQUF2QjtRQUNFLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztRQUN2RCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsdURBQWtCOzs7O0lBQWxCO1FBQ0UsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxRQUFRLEdBQUcsbUJBQUEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQVcsQ0FBQztZQUNsRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRztnQkFDbkIsRUFBRSxFQUFFLFNBQVM7Z0JBQ2IsS0FBSyxFQUFFLE1BQU07YUFDZCxDQUFDO1lBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUc7Z0JBQ3pCLEdBQUcsRUFBRSxNQUFNO2FBQ1osQ0FBQztZQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN4QztRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCxnREFBVzs7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDcEI7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCxnREFBVzs7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsd0RBQW1COzs7O0lBQW5CO1FBQ0UsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLGlCQUFpQixDQUFDLFVBQVUsRUFBRTtZQUM5QyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxxQkFBcUIsQ0FBQyxPQUFPLEVBQUU7Z0JBQzNELElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7b0JBQzNELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztpQkFDckI7YUFDRjtZQUNELElBQUksSUFBSSxDQUFDLGdCQUFnQixLQUFLLHFCQUFxQixDQUFDLFNBQVMsRUFBRTtnQkFDN0QsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3pHLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztpQkFDckI7YUFDRjtTQUNGO1FBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLGlCQUFpQixDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLGlCQUFpQixDQUFDLEtBQUssRUFBRTtZQUNwRixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxxQkFBcUIsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFO2dCQUM5RixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDckI7WUFDRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxxQkFBcUIsQ0FBQyxTQUFTLEVBQUU7Z0JBQzdELElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxLQUFLLElBQUksRUFBRTtvQkFDakYsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO2lCQUNyQjthQUNGO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCw4Q0FBUzs7OztJQUFUOztZQUNNLFNBQVM7UUFDYixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDcEcsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLGlCQUFpQixDQUFDLEtBQUssRUFBRTtZQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFO2dCQUM5QixJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFO29CQUM3RSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsbUNBQW1DLENBQUMsRUFDbkcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLCtCQUErQixDQUFDLENBQUMsQ0FBQztvQkFDM0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7b0JBQ25CLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUM3QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2xDLE9BQU87aUJBQ1I7YUFDRjtpQkFBTTtnQkFDTCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFO29CQUM3RSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsbUNBQW1DLENBQUMsRUFDbkcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLCtCQUErQixDQUFDLENBQUMsQ0FBQztvQkFDM0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7b0JBQ25CLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUM3QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2xDLE9BQU87aUJBQ1I7Z0JBQ0QsSUFBSSxTQUFTLElBQUksS0FBSyxFQUFFO29CQUN0QixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsbUNBQW1DLENBQUMsRUFDbkcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLCtCQUErQixDQUFDLENBQUMsQ0FBQztvQkFDM0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDekIsT0FBTztpQkFDUjtnQkFDRCxJQUFJLFNBQVMsRUFBRTtvQkFDYixJQUFJLFNBQVMsS0FBSyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFO3dCQUM5QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3FCQUM1QztvQkFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO2lCQUMzQzthQUNGO1lBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDO1lBQzNDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQzs7Z0JBL2dCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMseXFOQUFtRDtvQkFFbkQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnQkFwQ0MsaUJBQWlCO2dCQW9CVixvQkFBb0I7Z0JBTXBCLGNBQWM7Z0JBQUUsZUFBZTs7O3NCQWFyQyxLQUFLO3VCQUVMLEtBQUs7NEJBK0RMLEtBQUs7dUJBRUwsS0FBSzswQkFFTCxLQUFLO3dCQUVMLEtBQUs7eUJBa0JMLEtBQUs7K0JBRUwsTUFBTTtpQ0FFTixNQUFNO2lDQUVOLE1BQU07Z0NBRU4sTUFBTTs4QkFFTixNQUFNO2tDQUNOLE1BQU07bUNBRU4sTUFBTTttQ0FFTixNQUFNO3lCQUVOLE1BQU07O0lBOFpULGlDQUFDO0NBQUEsQUFoaEJELElBZ2hCQztTQTFnQlksMEJBQTBCOzs7SUFFckMseUNBQXFCOzs7OztJQStEckIsMkNBQWlDOztJQUVqQywrQ0FBMkM7O0lBRTNDLDBDQUF1Qjs7SUFFdkIsNkNBQWlCOzs7OztJQVVqQiw0Q0FBcUM7O0lBVXJDLDRDQUE4Qjs7SUFFOUIsa0RBQTRDOztJQUU1QyxvREFBcUU7O0lBRXJFLG9EQUF1RTs7SUFFdkUsbURBQXNEOztJQUV0RCxpREFBbUQ7O0lBQ25ELHFEQUF3RDs7SUFFeEQsc0RBQXlEOztJQUV6RCxzREFBZ0Q7O0lBRWhELDRDQUFzQzs7SUFFdEMsOENBQTRHOztJQUM1RyxzREFBK0U7O0lBQy9FLDJEQUE2Qjs7SUFFN0IsaURBQWtGOztJQUdsRixzREFBdUQ7O0lBQ3ZELCtDQUErQzs7SUFDL0MsNENBQTZCOztJQUM3QiwrQ0FBK0M7O0lBQy9DLGdEQUF5RTs7SUFDekUsdURBQStFOztJQUMvRSw2REFBMEU7O0lBRzFFLDRDQUEwRTs7SUFDMUUsZ0RBQWdFOztJQUNoRSxtREFBeUU7O0lBQ3pFLGdEQUFzRTs7Ozs7SUFFdEUsNkNBQThCOzs7OztJQUM5QixxREFBc0M7O0lBRXRDLGlEQUF1Qzs7SUFDdkMsa0RBQW9DOztJQUNwQyx1REFBaUM7O0lBQ2pDLG1EQUFzRDs7SUFDdEQsb0RBQThCOztJQUM5QiwrQ0FBZ0M7O0lBQ2hDLDBEQUFpQzs7SUFDakMsNkNBQXVCOztJQUN2Qix5REFBa0M7O0lBQ2xDLDBEQUFvQzs7SUFDcEMsK0NBQTBCOztJQUMxQiw4Q0FBeUI7O0lBQ3pCLGtEQUE2Qjs7SUFDN0IsZ0RBQTJCOztJQUMzQiwrQ0FBMEI7O0lBRTFCLDRDQUFzQjs7SUFDdEIsdURBQTZDOztJQUU3QyxpREFBaUU7Ozs7O0lBRy9ELDJDQUFnQzs7Ozs7SUFDaEMsMERBQWtEOzs7OztJQUNsRCxvREFBc0M7Ozs7O0lBQ3RDLHFEQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTcGF0aWFsRmlsdGVyUXVlcnlUeXBlLCBTcGF0aWFsRmlsdGVyVHlwZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zcGF0aWFsLWZpbHRlci5lbnVtJztcclxuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZWwgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi8uLi9tYXAnO1xyXG5pbXBvcnQgeyBTcGF0aWFsRmlsdGVySXRlbVR5cGUgfSBmcm9tICcuLy4uLy4uL3NoYXJlZC9zcGF0aWFsLWZpbHRlci5lbnVtJztcclxuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4vLi4vLi4vLi4vZmVhdHVyZS9zaGFyZWQvZmVhdHVyZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCBPbEdlb21ldHJ5VHlwZSBmcm9tICdvbC9nZW9tL0dlb21ldHJ5VHlwZSc7XHJcbmltcG9ydCB7IEdlb0pTT05HZW9tZXRyeSB9IGZyb20gJy4uLy4uLy4uL2dlb21ldHJ5L3NoYXJlZC9nZW9tZXRyeS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgU3R5bGUgYXMgT2xTdHlsZSB9IGZyb20gJ29sL3N0eWxlJztcclxuaW1wb3J0ICogYXMgb2xzdHlsZSBmcm9tICdvbC9zdHlsZSc7XHJcbmltcG9ydCAqIGFzIG9scHJvaiBmcm9tICdvbC9wcm9qJztcclxuaW1wb3J0IHsgb2xGZWF0dXJlIH0gZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCB7IE1hdFRyZWVOZXN0ZWREYXRhU291cmNlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBTcGF0aWFsRmlsdGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zcGF0aWFsLWZpbHRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWVhc3VyZUxlbmd0aFVuaXQgfSBmcm9tICcuLi8uLi8uLi9tZWFzdXJlJztcclxuaW1wb3J0IHsgRW50aXR5U3RvcmUgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uLy4uL2xheWVyL3NoYXJlZCc7XHJcbmltcG9ydCB7IE5lc3RlZFRyZWVDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RyZWUnO1xyXG5pbXBvcnQgeyBTcGF0aWFsRmlsdGVyVGhlbWF0aWMgfSBmcm9tICcuLy4uLy4uL3NoYXJlZC9zcGF0aWFsLWZpbHRlci5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSwgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG4vKipcclxuICogU3BhdGlhbC1GaWx0ZXItSXRlbSAoc2VhcmNoIHBhcmFtZXRlcnMpXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1zcGF0aWFsLWZpbHRlci1pdGVtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc3BhdGlhbC1maWx0ZXItaXRlbS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc3BhdGlhbC1maWx0ZXItaXRlbS5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTcGF0aWFsRmlsdGVySXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcclxuXHJcbiAgQElucHV0KCkgbWFwOiBJZ29NYXA7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHR5cGUoKTogU3BhdGlhbEZpbHRlclR5cGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX3R5cGU7XHJcbiAgfVxyXG4gIHNldCB0eXBlKHR5cGU6IFNwYXRpYWxGaWx0ZXJUeXBlKSB7XHJcbiAgICB0aGlzLl90eXBlID0gdHlwZTtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZW9tZXRyeVR5cGVzLmZpbmRJbmRleChnZW9tID0+IGdlb20gPT09IHRoaXMudHlwZSk7XHJcbiAgICB0aGlzLmdlb21ldHJ5VHlwZSA9IHRoaXMuZ2VvbWV0cnlUeXBlc1tpbmRleF07XHJcbiAgICB0aGlzLmZvcm1Db250cm9sLnJlc2V0KCk7XHJcbiAgICB0aGlzLnJhZGl1cyA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuZHJhd0d1aWRlJC5uZXh0KG51bGwpO1xyXG4gICAgdGhpcy5kcmF3U3R5bGUkLm5leHQodW5kZWZpbmVkKTtcclxuXHJcbiAgICAvLyBOZWNlc3NhcnkgdG8ga2VlcCByZWZlcmVuY2UgdG8gdGhlIGdlb21ldHJ5IGZvcm0gZmllbGQgaW5wdXRcclxuICAgIGlmICh0aGlzLnR5cGUgPT09IFNwYXRpYWxGaWx0ZXJUeXBlLlByZWRlZmluZWQpIHtcclxuICAgICAgY29uc3QgZ2VvanNvbjogR2VvSlNPTkdlb21ldHJ5ID0ge1xyXG4gICAgICAgIHR5cGU6ICdQb2ludCcsXHJcbiAgICAgICAgY29vcmRpbmF0ZXM6ICcnXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUoZ2VvanNvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTmVjZXNzYXJ5IHRvIGFwcGx5IHRoZSByaWdodCBzdHlsZSB3aGVuIGdlb21ldHJ5IHR5cGUgaXMgUG9pbnRcclxuICAgIGlmICh0aGlzLnR5cGUgPT09IFNwYXRpYWxGaWx0ZXJUeXBlLlBvaW50KSB7XHJcbiAgICAgIHRoaXMucmFkaXVzID0gMTAwMDsgLy8gQmFzZSByYWRpdXNcclxuICAgICAgdGhpcy5yYWRpdXNGb3JtQ29udHJvbC5zZXRWYWx1ZSh0aGlzLnJhZGl1cyk7XHJcbiAgICAgIHRoaXMuUG9pbnRTdHlsZSA9IChmZWF0dXJlOiBvbEZlYXR1cmUsIHJlc29sdXRpb246IG51bWJlcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gb2xwcm9qLnRyYW5zZm9ybShmZWF0dXJlLmdldEdlb21ldHJ5KCkuZ2V0Q29vcmRpbmF0ZXMoKSwgdGhpcy5tYXAucHJvamVjdGlvbiwgJ0VQU0c6NDMyNicpO1xyXG4gICAgICAgIHJldHVybiBuZXcgb2xzdHlsZS5TdHlsZSAoe1xyXG4gICAgICAgICAgaW1hZ2U6IG5ldyBvbHN0eWxlLkNpcmNsZSAoe1xyXG4gICAgICAgICAgICByYWRpdXM6IHRoaXMucmFkaXVzIC8gKE1hdGguY29zKChNYXRoLlBJIC8gMTgwKSAqIGNvb3JkaW5hdGVzWzFdKSkgLyByZXNvbHV0aW9uLCAvLyBMYXRpdHVkZSBjb3JyZWN0aW9uXHJcbiAgICAgICAgICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHtcclxuICAgICAgICAgICAgICB3aWR0aDogMixcclxuICAgICAgICAgICAgICBjb2xvcjogJ3JnYmEoMCwgMTUzLCAyNTUpJ1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgZmlsbDogbmV3IG9sc3R5bGUuRmlsbCh7XHJcbiAgICAgICAgICAgICAgY29sb3I6ICdyZ2JhKDAsIDE1MywgMjU1LCAwLjIpJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5vdmVybGF5U3R5bGUgPSB0aGlzLlBvaW50U3R5bGU7XHJcbiAgICAgIHRoaXMuZHJhd1N0eWxlJC5uZXh0KHRoaXMub3ZlcmxheVN0eWxlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIElmIGdlb21ldHJ5IHR5cGVzIGlzIFBvbHlnb25cclxuICAgICAgdGhpcy5yYWRpdXMgPSB1bmRlZmluZWQ7XHJcbiAgICAgIHRoaXMuUG9seVN0eWxlID0gKGZlYXR1cmUsIHJlc29sdXRpb24pID0+IHtcclxuICAgICAgICByZXR1cm4gbmV3IG9sc3R5bGUuU3R5bGUgKHtcclxuICAgICAgICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHtcclxuICAgICAgICAgICAgd2lkdGg6IDIsXHJcbiAgICAgICAgICAgIGNvbG9yOiAncmdiYSgwLCAxNTMsIDI1NSknXHJcbiAgICAgICAgICB9KSxcclxuICAgICAgICAgIGZpbGw6IG5ldyBvbHN0eWxlLkZpbGwoe1xyXG4gICAgICAgICAgICBjb2xvcjogJ3JnYmEoMCwgMTUzLCAyNTUsIDAuMiknXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLm92ZXJsYXlTdHlsZSA9IHRoaXMuUG9seVN0eWxlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vdmVybGF5U3R5bGUkLm5leHQodGhpcy5vdmVybGF5U3R5bGUpO1xyXG4gIH1cclxuICBwcml2YXRlIF90eXBlOiBTcGF0aWFsRmlsdGVyVHlwZTtcclxuXHJcbiAgQElucHV0KCkgcXVlcnlUeXBlOiBTcGF0aWFsRmlsdGVyUXVlcnlUeXBlO1xyXG5cclxuICBASW5wdXQoKSB6b25lOiBGZWF0dXJlO1xyXG5cclxuICBASW5wdXQoKSBsb2FkaW5nO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBzdG9yZSgpOiBFbnRpdHlTdG9yZTxGZWF0dXJlPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fc3RvcmU7XHJcbiAgfVxyXG4gIHNldCBzdG9yZShzdG9yZTogRW50aXR5U3RvcmU8RmVhdHVyZT4pIHtcclxuICAgIHRoaXMuX3N0b3JlID0gc3RvcmU7XHJcbiAgICB0aGlzLl9zdG9yZS5lbnRpdGllcyQuc3Vic2NyaWJlKCgpID0+IHsgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7IH0pO1xyXG4gIH1cclxuICBwcml2YXRlIF9zdG9yZTogRW50aXR5U3RvcmU8RmVhdHVyZT47XHJcblxyXG4gIC8qKlxyXG4gICAqIEF2YWlsYWJsZSBtZWFzdXJlIHVuaXRzIGZvciB0aGUgbWVhc3VyZSB0eXBlIGdpdmVuXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IG1lYXN1cmVVbml0cygpOiBzdHJpbmdbXSB7XHJcbiAgICByZXR1cm4gW01lYXN1cmVMZW5ndGhVbml0Lk1ldGVyc107XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBsYXllcnM6IExheWVyW10gPSBbXTtcclxuXHJcbiAgQE91dHB1dCgpIHRvZ2dsZVNlYXJjaCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgQE91dHB1dCgpIGl0ZW1UeXBlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxTcGF0aWFsRmlsdGVySXRlbVR5cGU+KCk7XHJcblxyXG4gIEBPdXRwdXQoKSB0aGVtYXRpY0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8U3BhdGlhbEZpbHRlclRoZW1hdGljW10+KCk7XHJcblxyXG4gIEBPdXRwdXQoKSBkcmF3Wm9uZUV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxGZWF0dXJlPigpO1xyXG5cclxuICBAT3V0cHV0KCkgcmFkaXVzRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcclxuICBAT3V0cHV0KCkgZnJlZWhhbmRDb250cm9sID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICBAT3V0cHV0KCkgY2xlYXJCdXR0b25FdmVudCA9IG5ldyBFdmVudEVtaXR0ZXI8TGF5ZXJbXT4oKTtcclxuXHJcbiAgQE91dHB1dCgpIGNsZWFyU2VhcmNoRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBPdXRwdXQoKSBleHBvcnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIHB1YmxpYyBpdGVtVHlwZTogU3BhdGlhbEZpbHRlckl0ZW1UeXBlW10gPSBbU3BhdGlhbEZpbHRlckl0ZW1UeXBlLkFkZHJlc3MsIFNwYXRpYWxGaWx0ZXJJdGVtVHlwZS5UaGVtYXRpY3NdO1xyXG4gIHB1YmxpYyBzZWxlY3RlZEl0ZW1UeXBlOiBTcGF0aWFsRmlsdGVySXRlbVR5cGUgPSBTcGF0aWFsRmlsdGVySXRlbVR5cGUuQWRkcmVzcztcclxuICBwdWJsaWMgc2VsZWN0ZWRTb3VyY2VBZGRyZXNzO1xyXG5cclxuICB0cmVlQ29udHJvbCA9IG5ldyBOZXN0ZWRUcmVlQ29udHJvbDxTcGF0aWFsRmlsdGVyVGhlbWF0aWM+KG5vZGUgPT4gbm9kZS5jaGlsZHJlbik7XHJcblxyXG4gIC8vIEZvciB0aGVtYXRpY3MgYW5kIHJlc3VsdHMgdGFibGVzXHJcbiAgcHVibGljIGRpc3BsYXllZENvbHVtbnM6IHN0cmluZ1tdID0gWyduYW1lJywgJ3NlbGVjdCddO1xyXG4gIHB1YmxpYyBjaGlsZHJlbnM6IFNwYXRpYWxGaWx0ZXJUaGVtYXRpY1tdID0gW107XHJcbiAgcHVibGljIGdyb3Vwczogc3RyaW5nW10gPSBbXTtcclxuICBwdWJsaWMgdGhlbWF0aWNzOiBTcGF0aWFsRmlsdGVyVGhlbWF0aWNbXSA9IFtdO1xyXG4gIHB1YmxpYyBkYXRhU291cmNlID0gbmV3IE1hdFRyZWVOZXN0ZWREYXRhU291cmNlPFNwYXRpYWxGaWx0ZXJUaGVtYXRpYz4oKTtcclxuICBwdWJsaWMgc2VsZWN0ZWRUaGVtYXRpY3MgPSBuZXcgU2VsZWN0aW9uTW9kZWw8U3BhdGlhbEZpbHRlclRoZW1hdGljPih0cnVlLCBbXSk7XHJcbiAgcHVibGljIGRpc3BsYXllZENvbHVtbnNSZXN1bHRzOiBzdHJpbmdbXSA9IFsndHlwZVJlc3VsdHMnLCAnbmFtZVJlc3VsdHMnXTtcclxuXHJcbiAgLy8gRm9yIGdlb21ldHJ5IGZvcm0gZmllbGQgaW5wdXRcclxuICB2YWx1ZSQ6IEJlaGF2aW9yU3ViamVjdDxHZW9KU09OR2VvbWV0cnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh1bmRlZmluZWQpO1xyXG4gIGRyYXdHdWlkZSQ6IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcclxuICBvdmVybGF5U3R5bGUkOiBCZWhhdmlvclN1YmplY3Q8T2xTdHlsZT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHVuZGVmaW5lZCk7XHJcbiAgZHJhd1N0eWxlJDogQmVoYXZpb3JTdWJqZWN0PE9sU3R5bGU+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh1bmRlZmluZWQpO1xyXG5cclxuICBwcml2YXRlIHZhbHVlJCQ6IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIHJhZGl1c0NoYW5nZXMkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBwdWJsaWMgZm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcclxuICBwdWJsaWMgZ2VvbWV0cnlUeXBlOiBPbEdlb21ldHJ5VHlwZTtcclxuICBwdWJsaWMgZ2VvbWV0cnlUeXBlRmllbGQgPSBmYWxzZTtcclxuICBwdWJsaWMgZ2VvbWV0cnlUeXBlczogc3RyaW5nW10gPSBbJ1BvaW50JywgJ1BvbHlnb24nXTtcclxuICBwdWJsaWMgZHJhd0d1aWRlRmllbGQgPSBmYWxzZTtcclxuICBwdWJsaWMgZHJhd0d1aWRlOiBudW1iZXIgPSBudWxsO1xyXG4gIHB1YmxpYyBkcmF3R3VpZGVQbGFjZWhvbGRlciA9ICcnO1xyXG4gIHB1YmxpYyBtZWFzdXJlID0gZmFsc2U7XHJcbiAgcHVibGljIGRyYXdDb250cm9sSXNBY3RpdmUgPSB0cnVlO1xyXG4gIHB1YmxpYyBmcmVlaGFuZERyYXdJc0FjdGl2ZSA9IGZhbHNlO1xyXG4gIHB1YmxpYyBkcmF3U3R5bGU6IE9sU3R5bGU7XHJcbiAgcHVibGljIGRyYXdab25lOiBGZWF0dXJlO1xyXG4gIHB1YmxpYyBvdmVybGF5U3R5bGU6IE9sU3R5bGU7XHJcbiAgcHVibGljIFBvaW50U3R5bGU6IE9sU3R5bGU7XHJcbiAgcHVibGljIFBvbHlTdHlsZTogT2xTdHlsZTtcclxuXHJcbiAgcHVibGljIHJhZGl1czogbnVtYmVyO1xyXG4gIHB1YmxpYyByYWRpdXNGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xyXG5cclxuICBwdWJsaWMgbWVhc3VyZVVuaXQ6IE1lYXN1cmVMZW5ndGhVbml0ID0gTWVhc3VyZUxlbmd0aFVuaXQuTWV0ZXJzO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgcHJpdmF0ZSBzcGF0aWFsRmlsdGVyU2VydmljZTogU3BhdGlhbEZpbHRlclNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zcGF0aWFsRmlsdGVyU2VydmljZS5sb2FkVGhlbWF0aWNzTGlzdCgpXHJcbiAgICAuc3Vic2NyaWJlKChpdGVtczogU3BhdGlhbEZpbHRlclRoZW1hdGljW10pID0+IHtcclxuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbnMucHVzaChpdGVtKTtcclxuICAgICAgICB0aGlzLmNoaWxkcmVucy5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gYS5uYW1lLmxvY2FsZUNvbXBhcmUoYi5uYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmNoaWxkcmVucy5mb3JFYWNoKGNoaWxkID0+IHtcclxuICAgICAgICBpZiAoY2hpbGQuZ3JvdXAgJiYgKHRoaXMuZ3JvdXBzLmluZGV4T2YoY2hpbGQuZ3JvdXApID09PSAtMSkpIHtcclxuICAgICAgICAgIHRoaXMuZ3JvdXBzLnB1c2goY2hpbGQuZ3JvdXApO1xyXG4gICAgICAgICAgY29uc3QgdGhlbWF0aWM6IFNwYXRpYWxGaWx0ZXJUaGVtYXRpYyA9IHtcclxuICAgICAgICAgICAgbmFtZTogY2hpbGQuZ3JvdXAsXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXVxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHRoaXMudGhlbWF0aWNzLnB1c2godGhlbWF0aWMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWNoaWxkLmdyb3VwKSB7XHJcbiAgICAgICAgICBjb25zdCB0aGVtYXRpYzogU3BhdGlhbEZpbHRlclRoZW1hdGljID0ge1xyXG4gICAgICAgICAgICBuYW1lOiBjaGlsZC5uYW1lLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgICAgIHNvdXJjZTogY2hpbGQuc291cmNlXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgdGhpcy50aGVtYXRpY3MucHVzaCh0aGVtYXRpYyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGhlbWF0aWNzLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgICAgIHJldHVybiBhLm5hbWUubG9jYWxlQ29tcGFyZShiLm5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy50aGVtYXRpY3MuZm9yRWFjaCh0aGVtYXRpYyA9PiB7XHJcbiAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiB0aGlzLmNoaWxkcmVucykge1xyXG4gICAgICAgICAgaWYgKGNoaWxkLmdyb3VwID09PSB0aGVtYXRpYy5uYW1lKSB7XHJcbiAgICAgICAgICAgIHRoZW1hdGljLmNoaWxkcmVuLnB1c2goY2hpbGQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmRhdGFTb3VyY2UuZGF0YSA9IHRoaXMudGhlbWF0aWNzO1xyXG5cclxuICAgIHRoaXMuZHJhd0d1aWRlJC5uZXh0KG51bGwpO1xyXG4gICAgdGhpcy52YWx1ZSQubmV4dCh0aGlzLmZvcm1Db250cm9sLnZhbHVlID8gdGhpcy5mb3JtQ29udHJvbC52YWx1ZSA6IHVuZGVmaW5lZCk7XHJcbiAgICB0aGlzLnZhbHVlJCQgPSB0aGlzLmZvcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbHVlOiBHZW9KU09OR2VvbWV0cnkpID0+IHtcclxuICAgICAgdGhpcy52YWx1ZSQubmV4dCh2YWx1ZSA/IHZhbHVlIDogdW5kZWZpbmVkKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMudmFsdWUkLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuZ2V0UmFkaXVzKCk7XHJcbiAgICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5yYWRpdXNDaGFuZ2VzJCQgPSB0aGlzLnJhZGl1c0Zvcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLmdldFJhZGl1cygpO1xyXG4gICAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5zdWJzY3JpYmUgdG8gdGhlIHZhbHVlIHN0cmVhbVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy52YWx1ZSQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLmNkUmVmLmRldGFjaCgpO1xyXG4gIH1cclxuXHJcbiAgb25JdGVtVHlwZUNoYW5nZShldmVudCkge1xyXG4gICAgdGhpcy5zZWxlY3RlZEl0ZW1UeXBlID0gZXZlbnQudmFsdWU7XHJcbiAgICB0aGlzLml0ZW1UeXBlQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZEl0ZW1UeXBlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgbWVhc3VyZSB1bml0XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25NZWFzdXJlVW5pdENoYW5nZSh1bml0OiBNZWFzdXJlTGVuZ3RoVW5pdCkge1xyXG4gICAgdGhpcy5tZWFzdXJlVW5pdCA9IHVuaXQ7XHJcbiAgfVxyXG5cclxuICBpc1ByZWRlZmluZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50eXBlID09PSBTcGF0aWFsRmlsdGVyVHlwZS5QcmVkZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgaXNQb2x5Z29uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudHlwZSA9PT0gU3BhdGlhbEZpbHRlclR5cGUuUG9seWdvbjtcclxuICB9XHJcblxyXG4gIGlzUG9pbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50eXBlID09PSBTcGF0aWFsRmlsdGVyVHlwZS5Qb2ludDtcclxuICB9XHJcblxyXG4gIGhhc0NoaWxkKF86IG51bWJlciwgbm9kZTogU3BhdGlhbEZpbHRlclRoZW1hdGljKSB7XHJcbiAgICBpZiAobm9kZS5jaGlsZHJlbikge1xyXG4gICAgICByZXR1cm4gbm9kZS5jaGlsZHJlbi5sZW5ndGg7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBvblRvZ2dsZUNsaWNrKG5vZGU6IFNwYXRpYWxGaWx0ZXJUaGVtYXRpYykge1xyXG4gICAgdGhpcy50cmVlQ29udHJvbC5pc0V4cGFuZGVkKG5vZGUpID8gdGhpcy50cmVlQ29udHJvbC5jb2xsYXBzZShub2RlKSA6IHRoaXMudHJlZUNvbnRyb2wuZXhwYW5kKG5vZGUpO1xyXG4gIH1cclxuXHJcbiAgaXNBbGxTZWxlY3RlZChub2RlPzogU3BhdGlhbEZpbHRlclRoZW1hdGljKSB7XHJcbiAgICBsZXQgbnVtU2VsZWN0ZWQ7XHJcbiAgICBsZXQgbnVtTm9kZXMgPSAwO1xyXG4gICAgaWYgKCFub2RlKSB7XHJcbiAgICAgIG51bVNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZFRoZW1hdGljcy5zZWxlY3RlZC5sZW5ndGg7XHJcbiAgICAgIHRoaXMudGhlbWF0aWNzLmZvckVhY2godGhlbWF0aWMgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmdyb3Vwcy5pbmRleE9mKHRoZW1hdGljLm5hbWUpID09PSAtMSkge1xyXG4gICAgICAgICAgbnVtTm9kZXMrKztcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmNoaWxkcmVucy5mb3JFYWNoKGNoaWxkcmVuID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMudGhlbWF0aWNzLmZpbmQodGhlbWF0aWMgPT4gdGhlbWF0aWMuc291cmNlID09PSBjaGlsZHJlbi5zb3VyY2UpKSB7XHJcbiAgICAgICAgICBudW1Ob2RlcysrO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBudW1TZWxlY3RlZCA9IG5vZGUuY2hpbGRyZW4ubGVuZ3RoO1xyXG4gICAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goY2hpbGRyZW4gPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkVGhlbWF0aWNzLnNlbGVjdGVkLmZpbmQodGhlbWF0aWMgPT4gdGhlbWF0aWMgPT09IGNoaWxkcmVuKSkge1xyXG4gICAgICAgICAgbnVtTm9kZXMrKztcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChudW1Ob2RlcyA+PSAxKSB7XHJcbiAgICAgIHJldHVybiBudW1TZWxlY3RlZCA9PT0gbnVtTm9kZXM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoYXNDaGlsZHJlblNlbGVjdGVkKG5vZGU6IFNwYXRpYWxGaWx0ZXJUaGVtYXRpYykge1xyXG4gICAgbGV0IGJvb2wgPSBmYWxzZTtcclxuICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkVGhlbWF0aWNzLnNlbGVjdGVkLmZpbmQodGhlbWF0aWMgPT4gdGhlbWF0aWMuc291cmNlID09PSBjaGlsZC5zb3VyY2UpKSB7XHJcbiAgICAgICAgYm9vbCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGJvb2w7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBcHBseSBoZWFkZXIgY2hlY2tib3hcclxuICAgKi9cclxuICBtYXN0ZXJUb2dnbGUoKSB7XHJcbiAgICB0aGlzLmlzQWxsU2VsZWN0ZWQoKSA/XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRUaGVtYXRpY3MuY2xlYXIoKSA6XHJcbiAgICAgIHRoaXMuc2VsZWN0QWxsKCk7XHJcblxyXG4gICAgY29uc3Qgc2VsZWN0ZWRUaGVtYXRpY3NOYW1lOiBTcGF0aWFsRmlsdGVyVGhlbWF0aWNbXSA9IFtdO1xyXG4gICAgZm9yIChjb25zdCB0aGVtYXRpYyBvZiB0aGlzLnNlbGVjdGVkVGhlbWF0aWNzLnNlbGVjdGVkKSB7XHJcbiAgICAgIHNlbGVjdGVkVGhlbWF0aWNzTmFtZS5wdXNoKHRoZW1hdGljKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5pc0FsbFNlbGVjdGVkKCkpIHtcclxuICAgICAgdGhpcy50aGVtYXRpY3MuZm9yRWFjaCh0aGVtYXRpYyA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzQ2hpbGQoMCwgdGhlbWF0aWMpKSB7XHJcbiAgICAgICAgICB0aGlzLnRyZWVDb250cm9sLmV4cGFuZCh0aGVtYXRpYyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudGhlbWF0aWNzLmZvckVhY2godGhlbWF0aWMgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmhhc0NoaWxkKDAsIHRoZW1hdGljKSkge1xyXG4gICAgICAgICAgdGhpcy50cmVlQ29udHJvbC5jb2xsYXBzZSh0aGVtYXRpYyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHRoaXMudGhlbWF0aWNDaGFuZ2UuZW1pdChzZWxlY3RlZFRoZW1hdGljc05hbWUpO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0QWxsKG5vZGU/OiBTcGF0aWFsRmlsdGVyVGhlbWF0aWMpIHtcclxuICAgIGlmICghbm9kZSkge1xyXG4gICAgICB0aGlzLnRoZW1hdGljcy5mb3JFYWNoKHRoZW1hdGljID0+IHtcclxuICAgICAgICBpZiAodGhpcy5ncm91cHMuaW5kZXhPZih0aGVtYXRpYy5uYW1lKSA9PT0gLTEpIHtcclxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUaGVtYXRpY3Muc2VsZWN0KHRoZW1hdGljKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmNoaWxkcmVucy5mb3JFYWNoKGNoaWxkcmVuID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0ZWRUaGVtYXRpY3Muc2VsZWN0ZWQuZmluZCh0aGVtYXRpYyA9PiB0aGVtYXRpYy5zb3VyY2UgPT09IGNoaWxkcmVuLnNvdXJjZSkpIHtcclxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUaGVtYXRpY3Muc2VsZWN0KGNoaWxkcmVuKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuaGFzQ2hpbGQoMCwgbm9kZSkpIHtcclxuICAgICAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goY2hpbGRyZW4gPT4gdGhpcy5zZWxlY3RlZFRoZW1hdGljcy5zZWxlY3QoY2hpbGRyZW4pKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hpbGRyZW5zVG9nZ2xlKG5vZGU6IFNwYXRpYWxGaWx0ZXJUaGVtYXRpYykge1xyXG4gICAgdGhpcy5pc0FsbFNlbGVjdGVkKG5vZGUpID9cclxuICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB0aGlzLnNlbGVjdGVkVGhlbWF0aWNzLmRlc2VsZWN0KGNoaWxkKSkgOlxyXG4gICAgdGhpcy5zZWxlY3RBbGwobm9kZSk7XHJcblxyXG4gICAgY29uc3Qgc2VsZWN0ZWRUaGVtYXRpY3NOYW1lOiBTcGF0aWFsRmlsdGVyVGhlbWF0aWNbXSA9IFtdO1xyXG4gICAgZm9yIChjb25zdCB0aGVtYXRpYyBvZiB0aGlzLnNlbGVjdGVkVGhlbWF0aWNzLnNlbGVjdGVkKSB7XHJcbiAgICAgIHNlbGVjdGVkVGhlbWF0aWNzTmFtZS5wdXNoKHRoZW1hdGljKTtcclxuICAgIH1cclxuICAgIHRoaXMudHJlZUNvbnRyb2wuZXhwYW5kKG5vZGUpO1xyXG4gICAgdGhpcy50aGVtYXRpY0NoYW5nZS5lbWl0KHNlbGVjdGVkVGhlbWF0aWNzTmFtZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBcHBseSBjaGFuZ2VzIHRvIHRoZSB0aGVtYXRpY3Mgc2VsZWN0ZWQgdHJlZSBhbmQgZW1pdCBldmVudFxyXG4gICAqL1xyXG4gIG9uVG9nZ2xlQ2hhbmdlKG5vZGVTZWxlY3RlZDogU3BhdGlhbEZpbHRlclRoZW1hdGljKSB7XHJcbiAgICBsZXQgc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkVGhlbWF0aWNzLnNlbGVjdGVkLmZpbmQodGhlbWF0aWMgPT4gdGhlbWF0aWMuc291cmNlID09PSBub2RlU2VsZWN0ZWQuc291cmNlKSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHNlbGVjdGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNoaWxkcmVucy5mb3JFYWNoKGNoaWxkcmVuID0+IHtcclxuICAgICAgaWYgKGNoaWxkcmVuID09PSBub2RlU2VsZWN0ZWQgJiYgc2VsZWN0ZWQgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRoZW1hdGljcy5zZWxlY3QoY2hpbGRyZW4pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjaGlsZHJlbiA9PT0gbm9kZVNlbGVjdGVkICYmIHNlbGVjdGVkID09PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRoZW1hdGljcy5kZXNlbGVjdChjaGlsZHJlbik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy50aGVtYXRpY3MuZm9yRWFjaCh0aGVtYXRpYyA9PiB7XHJcbiAgICAgIGlmICh0aGVtYXRpYyA9PT0gbm9kZVNlbGVjdGVkICYmIHNlbGVjdGVkID09PSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUaGVtYXRpY3Muc2VsZWN0KHRoZW1hdGljKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhlbWF0aWMgPT09IG5vZGVTZWxlY3RlZCAmJiBzZWxlY3RlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUaGVtYXRpY3MuZGVzZWxlY3QodGhlbWF0aWMpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBzZWxlY3RlZFRoZW1hdGljc05hbWU6IFNwYXRpYWxGaWx0ZXJUaGVtYXRpY1tdID0gW107XHJcbiAgICBmb3IgKGNvbnN0IHRoZW1hdGljIG9mIHRoaXMuc2VsZWN0ZWRUaGVtYXRpY3Muc2VsZWN0ZWQpIHtcclxuICAgICAgc2VsZWN0ZWRUaGVtYXRpY3NOYW1lLnB1c2godGhlbWF0aWMpO1xyXG4gICAgfVxyXG4gICAgdGhpcy50aGVtYXRpY0NoYW5nZS5lbWl0KHNlbGVjdGVkVGhlbWF0aWNzTmFtZSk7XHJcbiAgfVxyXG5cclxuICBvbkRyYXdDb250cm9sQ2hhbmdlKCkge1xyXG4gICAgdGhpcy5kcmF3Q29udHJvbElzQWN0aXZlID0gIXRoaXMuZHJhd0NvbnRyb2xJc0FjdGl2ZTtcclxuICB9XHJcblxyXG4gIG9uZnJlZWhhbmRDb250cm9sQ2hhbmdlKCkge1xyXG4gICAgdGhpcy5mcmVlaGFuZERyYXdJc0FjdGl2ZSA9ICF0aGlzLmZyZWVoYW5kRHJhd0lzQWN0aXZlO1xyXG4gICAgdGhpcy5mcmVlaGFuZENvbnRyb2wuZW1pdCh0aGlzLmZyZWVoYW5kRHJhd0lzQWN0aXZlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIExhdW5jaCBzZWFyY2ggYnV0dG9uXHJcbiAgICovXHJcbiAgdG9nZ2xlU2VhcmNoQnV0dG9uKCkge1xyXG4gICAgaWYgKHRoaXMuaXNQb2x5Z29uKCkgfHwgdGhpcy5pc1BvaW50KCkpIHtcclxuICAgICAgdGhpcy5kcmF3Wm9uZSA9IHRoaXMuZm9ybUNvbnRyb2wudmFsdWUgYXMgRmVhdHVyZTtcclxuICAgICAgdGhpcy5kcmF3Wm9uZS5tZXRhID0ge1xyXG4gICAgICAgIGlkOiB1bmRlZmluZWQsXHJcbiAgICAgICAgdGl0bGU6ICdab25lJ1xyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLmRyYXdab25lLnByb3BlcnRpZXMgPSB7XHJcbiAgICAgICAgbm9tOiAnWm9uZSdcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5kcmF3Wm9uZUV2ZW50LmVtaXQodGhpcy5kcmF3Wm9uZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJhZGl1c0V2ZW50LmVtaXQodGhpcy5yYWRpdXMpO1xyXG4gICAgdGhpcy50b2dnbGVTZWFyY2guZW1pdCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTGF1bmNoIGNsZWFyIGJ1dHRvbiAoY2xlYXIgc3RvcmUgYW5kIG1hcCBsYXllcnMpXHJcbiAgICovXHJcbiAgY2xlYXJCdXR0b24oKSB7XHJcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgdGhpcy5tYXAucmVtb3ZlTGF5ZXJzKHRoaXMubGF5ZXJzKTtcclxuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgaWYgKHRoaXMuc3RvcmUpIHtcclxuICAgICAgdGhpcy5zdG9yZS5jbGVhcigpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jbGVhckJ1dHRvbkV2ZW50LmVtaXQoW10pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTGF1bmNoIGNsZWFyIHNlYXJjaCAoY2xlYXIgZmllbGQgaWYgdHlwZSBpcyBwcmVkZWZpbmVkKVxyXG4gICAqL1xyXG4gIGNsZWFyU2VhcmNoKCkge1xyXG4gICAgdGhpcy5zZWxlY3RlZFRoZW1hdGljcy5jbGVhcigpO1xyXG4gICAgdGhpcy50aGVtYXRpY0NoYW5nZS5lbWl0KFtdKTtcclxuICAgIHRoaXMuY2xlYXJTZWFyY2hFdmVudC5lbWl0KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBWZXJpZnkgY29uZGl0aW9ucyBvZiBpbmNvbXBsZXRlIGZpZWxkcyBvciBidXN5IHNlcnZpY2VcclxuICAgKi9cclxuICBkaXNhYmxlU2VhcmNoQnV0dG9uKCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHRoaXMudHlwZSA9PT0gU3BhdGlhbEZpbHRlclR5cGUuUHJlZGVmaW5lZCkge1xyXG4gICAgICBpZiAodGhpcy5zZWxlY3RlZEl0ZW1UeXBlID09PSBTcGF0aWFsRmlsdGVySXRlbVR5cGUuQWRkcmVzcykge1xyXG4gICAgICAgIGlmICh0aGlzLnF1ZXJ5VHlwZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuem9uZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkaW5nO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5zZWxlY3RlZEl0ZW1UeXBlID09PSBTcGF0aWFsRmlsdGVySXRlbVR5cGUuVGhlbWF0aWNzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucXVlcnlUeXBlICE9PSB1bmRlZmluZWQgJiYgdGhpcy56b25lICE9PSB1bmRlZmluZWQgJiYgdGhpcy5zZWxlY3RlZFRoZW1hdGljcy5zZWxlY3RlZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkaW5nO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMudHlwZSA9PT0gU3BhdGlhbEZpbHRlclR5cGUuUG9seWdvbiB8fCB0aGlzLnR5cGUgPT09IFNwYXRpYWxGaWx0ZXJUeXBlLlBvaW50KSB7XHJcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkSXRlbVR5cGUgPT09IFNwYXRpYWxGaWx0ZXJJdGVtVHlwZS5BZGRyZXNzICYmIHRoaXMuZm9ybUNvbnRyb2wudmFsdWUgIT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2FkaW5nO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkSXRlbVR5cGUgPT09IFNwYXRpYWxGaWx0ZXJJdGVtVHlwZS5UaGVtYXRpY3MpIHtcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFRoZW1hdGljcy5zZWxlY3RlZC5sZW5ndGggPiAwICYmIHRoaXMuZm9ybUNvbnRyb2wudmFsdWUgIT09IG51bGwpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmxvYWRpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hbmFnZSByYWRpdXMgdmFsdWUgYXQgdXNlciBjaGFuZ2VcclxuICAgKi9cclxuICBnZXRSYWRpdXMoKSB7XHJcbiAgICBsZXQgZm9ybVZhbHVlO1xyXG4gICAgdGhpcy5mb3JtQ29udHJvbC52YWx1ZSAhPT0gbnVsbCA/IGZvcm1WYWx1ZSA9IHRoaXMuZm9ybUNvbnRyb2wudmFsdWUucmFkaXVzIDogZm9ybVZhbHVlID0gdW5kZWZpbmVkO1xyXG4gICAgaWYgKHRoaXMudHlwZSA9PT0gU3BhdGlhbEZpbHRlclR5cGUuUG9pbnQpIHtcclxuICAgICAgaWYgKCF0aGlzLmZyZWVoYW5kRHJhd0lzQWN0aXZlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmFkaXVzRm9ybUNvbnRyb2wudmFsdWUgPj0gMTAwMDAgfHwgdGhpcy5yYWRpdXNGb3JtQ29udHJvbC52YWx1ZSA8IDApIHtcclxuICAgICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuYWxlcnQodGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uc3BhdGlhbEZpbHRlci5yYWRpdXNBbGVydCcpLFxyXG4gICAgICAgICAgICB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5zcGF0aWFsRmlsdGVyLndhcm5pbmcnKSk7XHJcbiAgICAgICAgICB0aGlzLnJhZGl1cyA9IDEwMDA7XHJcbiAgICAgICAgICB0aGlzLnJhZGl1c0Zvcm1Db250cm9sLnNldFZhbHVlKHRoaXMucmFkaXVzKTtcclxuICAgICAgICAgIHRoaXMuZHJhd0d1aWRlJC5uZXh0KHRoaXMucmFkaXVzKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmFkaXVzRm9ybUNvbnRyb2wudmFsdWUgPj0gMTAwMDAgfHwgdGhpcy5yYWRpdXNGb3JtQ29udHJvbC52YWx1ZSA8IDApIHtcclxuICAgICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuYWxlcnQodGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uc3BhdGlhbEZpbHRlci5yYWRpdXNBbGVydCcpLFxyXG4gICAgICAgICAgICB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5zcGF0aWFsRmlsdGVyLndhcm5pbmcnKSk7XHJcbiAgICAgICAgICB0aGlzLnJhZGl1cyA9IDEwMDA7XHJcbiAgICAgICAgICB0aGlzLnJhZGl1c0Zvcm1Db250cm9sLnNldFZhbHVlKHRoaXMucmFkaXVzKTtcclxuICAgICAgICAgIHRoaXMuZHJhd0d1aWRlJC5uZXh0KHRoaXMucmFkaXVzKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGZvcm1WYWx1ZSA+PSAxMDAwMCkge1xyXG4gICAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5hbGVydCh0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5zcGF0aWFsRmlsdGVyLnJhZGl1c0FsZXJ0JyksXHJcbiAgICAgICAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLnNwYXRpYWxGaWx0ZXIud2FybmluZycpKTtcclxuICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wucmVzZXQoKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGZvcm1WYWx1ZSkge1xyXG4gICAgICAgICAgaWYgKGZvcm1WYWx1ZSAhPT0gdGhpcy5yYWRpdXNGb3JtQ29udHJvbC52YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJhZGl1c0Zvcm1Db250cm9sLnNldFZhbHVlKGZvcm1WYWx1ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLnZhbHVlLnJhZGl1cyA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5yYWRpdXMgPSB0aGlzLnJhZGl1c0Zvcm1Db250cm9sLnZhbHVlO1xyXG4gICAgICB0aGlzLmRyYXdHdWlkZSQubmV4dCh0aGlzLnJhZGl1cyk7XHJcbiAgICAgIHRoaXMub3ZlcmxheVN0eWxlJC5uZXh0KHRoaXMuUG9pbnRTdHlsZSk7XHJcbiAgICAgIHRoaXMuZHJhd1N0eWxlJC5uZXh0KHRoaXMuUG9pbnRTdHlsZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==