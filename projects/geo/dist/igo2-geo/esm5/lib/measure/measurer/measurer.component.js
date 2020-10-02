/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { skip } from 'rxjs/operators';
import OlStyle from 'ol/style/Style';
import OlGeoJSON from 'ol/format/GeoJSON';
import OlVectorSource from 'ol/source/Vector';
import OlPolygon from 'ol/geom/Polygon';
import { unByKey } from 'ol/Observable';
import { LanguageService } from '@igo2/core';
import { EntityTableComponent } from '@igo2/common';
import { uuid } from '@igo2/utils';
import { FeatureDataSource } from '../../datasource';
import { FEATURE, FeatureStore, FeatureStoreLoadingStrategy, FeatureStoreSelectionStrategy, tryBindStoreLayer, tryAddLoadingStrategy, tryAddSelectionStrategy } from '../../feature';
import { DrawControl, ModifyControl } from '../../geometry';
import { VectorLayer } from '../../layer';
import { IgoMap } from '../../map';
import { MeasureType, MeasureAreaUnit, MeasureLengthUnit, } from '../shared/measure.enum';
import { measureOlGeometry, createMeasureInteractionStyle, createMeasureLayerStyle, updateOlTooltipsAtMidpoints, updateOlTooltipAtCenter, getTooltipsOfOlGeometry, squareMetersToUnit, metersToUnit, formatMeasure } from '../shared/measure.utils';
import { MeasurerDialogComponent } from './measurer-dialog.component';
/**
 * Tool to measure lengths and areas
 */
var MeasurerComponent = /** @class */ (function () {
    function MeasurerComponent(languageService, dialog) {
        var _this = this;
        this.languageService = languageService;
        this.dialog = dialog;
        /**
         * Table template
         * \@internal
         */
        this.tableTemplate = {
            selection: true,
            selectMany: true,
            selectionCheckbox: true,
            sort: true,
            columns: [
                {
                    name: 'length',
                    title: this.languageService.translate.instant('igo.geo.measure.lengthHeader'),
                    valueAccessor: (/**
                     * @param {?} feature
                     * @return {?}
                     */
                    function (feature) {
                        /** @type {?} */
                        var unit = _this.activeLengthUnit;
                        /** @type {?} */
                        var measure = metersToUnit(feature.properties.measure.length, unit);
                        return formatMeasure(measure, {
                            decimal: 1,
                            unit: unit,
                            unitAbbr: false,
                            locale: 'fr'
                        });
                    })
                },
                {
                    name: 'area',
                    title: this.languageService.translate.instant('igo.geo.measure.areaHeader'),
                    valueAccessor: (/**
                     * @param {?} feature
                     * @return {?}
                     */
                    function (feature) {
                        /** @type {?} */
                        var unit = _this.activeAreaUnit;
                        /** @type {?} */
                        var measure = squareMetersToUnit(feature.properties.measure.area, unit);
                        return measure ? formatMeasure(measure, {
                            decimal: 1,
                            unit: unit,
                            unitAbbr: false,
                            locale: 'fr'
                        }) : '';
                    })
                }
            ]
        };
        /**
         * Reference to the MeasureType enum
         * \@internal
         */
        this.measureType = MeasureType;
        /**
         * Reference to the AreaMeasureUnit enum
         * \@internal
         */
        this.measureAreaUnit = MeasureAreaUnit;
        /**
         * Reference to the LengthMeasureUnit enum
         * \@internal
         */
        this.measureLengthUnit = MeasureLengthUnit;
        /**
         * Whether measure units should be automatically determined
         * \@internal
         */
        this.measureUnitsAuto = false;
        /**
         * Observable of area
         * \@internal
         */
        this.measure$ = new BehaviorSubject({});
        /**
         * Observable of selected features
         * \@internal
         */
        this.selectedFeatures$ = new BehaviorSubject([]);
        /**
         * OL draw source
         * \@internal
         */
        this.showTooltips = true;
        /**
         * Active mlength unit
         */
        this.activeLengthUnit = MeasureLengthUnit.Meters;
        /**
         * Active area unit
         */
        this.activeAreaUnit = MeasureAreaUnit.SquareMeters;
        /**
         * OL draw source
         */
        this.olDrawSource = new OlVectorSource();
        this._activeMeasureType = MeasureType.Length;
        /**
         * The minimum length a segment must have to display a tooltip.
         * It also applies to area tooltips.
         */
        this.minSegmentLength = 10;
    }
    Object.defineProperty(MeasurerComponent.prototype, "activeMeasureType", {
        get: /**
         * @return {?}
         */
        function () { return this._activeMeasureType; },
        /**
         * Measure type
         * @internal
         */
        set: /**
         * Measure type
         * \@internal
         * @param {?} value
         * @return {?}
         */
        function (value) { this.setActiveMeasureType(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MeasurerComponent.prototype, "drawControlIsActive", {
        /**
         * Wheter one of the draw control is active
         * @internal
         */
        get: /**
         * Wheter one of the draw control is active
         * \@internal
         * @return {?}
         */
        function () {
            return this.activeDrawControl !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MeasurerComponent.prototype, "projection", {
        get: /**
         * @return {?}
         */
        function () {
            return this.map.ol.getView().getProjection();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Add draw controls and activate one
     * @internal
     */
    /**
     * Add draw controls and activate one
     * \@internal
     * @return {?}
     */
    MeasurerComponent.prototype.ngOnInit = /**
     * Add draw controls and activate one
     * \@internal
     * @return {?}
     */
    function () {
        this.initStore();
        this.createDrawLineControl();
        this.createDrawPolygonControl();
        this.createModifyControl();
        this.toggleDrawControl();
        this.onToggleTooltips(this.showTooltips);
        this.updateTooltipsOfOlSource(this.store.source.ol);
    };
    /**
     * Clear the overlay layer and any interaction added by this component.
     * @internal
     */
    /**
     * Clear the overlay layer and any interaction added by this component.
     * \@internal
     * @return {?}
     */
    MeasurerComponent.prototype.ngOnDestroy = /**
     * Clear the overlay layer and any interaction added by this component.
     * \@internal
     * @return {?}
     */
    function () {
        this.setActiveMeasureType(undefined);
        this.deactivateModifyControl();
        this.freezeStore();
    };
    /**
     * Set the measure type
     * @internal
     */
    /**
     * Set the measure type
     * \@internal
     * @param {?} measureType
     * @return {?}
     */
    MeasurerComponent.prototype.onMeasureTypeChange = /**
     * Set the measure type
     * \@internal
     * @param {?} measureType
     * @return {?}
     */
    function (measureType) {
        this.activeMeasureType = measureType;
    };
    /**
     * Activate or deactivate the current draw control
     * @internal
     */
    /**
     * Activate or deactivate the current draw control
     * \@internal
     * @param {?} toggle
     * @return {?}
     */
    MeasurerComponent.prototype.onToggleDrawControl = /**
     * Activate or deactivate the current draw control
     * \@internal
     * @param {?} toggle
     * @return {?}
     */
    function (toggle) {
        if (toggle === true) {
            this.toggleDrawControl();
        }
        else {
            this.deactivateDrawControl();
        }
    };
    /**
     * Activate or deactivate the current draw control
     * @internal
     */
    /**
     * Activate or deactivate the current draw control
     * \@internal
     * @param {?} toggle
     * @return {?}
     */
    MeasurerComponent.prototype.onToggleTooltips = /**
     * Activate or deactivate the current draw control
     * \@internal
     * @param {?} toggle
     * @return {?}
     */
    function (toggle) {
        this.showTooltips = toggle;
        if (toggle === true) {
            this.showTooltipsOfOlSource(this.store.source.ol);
        }
        else {
            this.clearTooltipsOfOlSource(this.store.source.ol);
        }
    };
    /**
     * Activate or deactivate the current draw control
     * @internal
     */
    /**
     * Activate or deactivate the current draw control
     * \@internal
     * @param {?} toggle
     * @return {?}
     */
    MeasurerComponent.prototype.onToggleMeasureUnitsAuto = /**
     * Activate or deactivate the current draw control
     * \@internal
     * @param {?} toggle
     * @return {?}
     */
    function (toggle) {
        this.measureUnitsAuto = toggle;
    };
    /**
     * Set the measure type
     * @internal
     */
    /**
     * Set the measure type
     * \@internal
     * @param {?} unit
     * @return {?}
     */
    MeasurerComponent.prototype.onLengthUnitChange = /**
     * Set the measure type
     * \@internal
     * @param {?} unit
     * @return {?}
     */
    function (unit) {
        this.activeLengthUnit = unit;
        this.table.refresh();
        this.updateTooltipsOfOlSource(this.store.source.ol);
        if (this.activeOlGeometry !== undefined) {
            this.updateTooltipsOfOlGeometry(this.activeOlGeometry);
        }
    };
    /**
     * Set the measure type
     * @internal
     */
    /**
     * Set the measure type
     * \@internal
     * @param {?} unit
     * @return {?}
     */
    MeasurerComponent.prototype.onAreaUnitChange = /**
     * Set the measure type
     * \@internal
     * @param {?} unit
     * @return {?}
     */
    function (unit) {
        this.activeAreaUnit = unit;
        this.table.refresh();
        this.updateTooltipsOfOlSource(this.store.source.ol);
        if (this.activeOlGeometry !== undefined) {
            this.updateTooltipsOfOlGeometry(this.activeOlGeometry);
        }
    };
    /**
     * @return {?}
     */
    MeasurerComponent.prototype.onCalculateClick = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var features = this.selectedFeatures$.value;
        /** @type {?} */
        var area = features.reduce((/**
         * @param {?} sum
         * @param {?} feature
         * @return {?}
         */
        function (sum, feature) {
            return sum + feature.properties.measure.area || 0;
        }), 0);
        /** @type {?} */
        var length = features.reduce((/**
         * @param {?} sum
         * @param {?} feature
         * @return {?}
         */
        function (sum, feature) {
            if (feature.geometry.type === 'Polygon') {
                return sum;
            }
            return sum + feature.properties.measure.length || 0;
        }), 0);
        /** @type {?} */
        var perimeter = features.reduce((/**
         * @param {?} sum
         * @param {?} feature
         * @return {?}
         */
        function (sum, feature) {
            if (feature.geometry.type === 'LineString') {
                return sum;
            }
            return sum + feature.properties.measure.length || 0;
        }), 0);
        this.openDialog({
            area: area,
            length: length,
            perimeter: perimeter
        });
    };
    /**
     * @return {?}
     */
    MeasurerComponent.prototype.onDeleteClick = /**
     * @return {?}
     */
    function () {
        this.store.deleteMany(this.selectedFeatures$.value);
    };
    /**
     * @return {?}
     */
    MeasurerComponent.prototype.onModifyClick = /**
     * @return {?}
     */
    function () {
        if (this.selectedFeatures$.value.length !== 1) {
            return;
        }
        if (this.modifyControl.active === true) {
            this.deactivateModifyControl();
            this.toggleDrawControl();
        }
        else {
            /** @type {?} */
            var feature_1 = this.selectedFeatures$.value[0];
            /** @type {?} */
            var olFeatures = this.store.layer.ol.getSource().getFeatures();
            /** @type {?} */
            var olFeature = olFeatures.find((/**
             * @param {?} _olFeature
             * @return {?}
             */
            function (_olFeature) {
                return _olFeature.get('id') === feature_1.properties.id;
            }));
            if (olFeature !== undefined) {
                this.deactivateDrawControl();
                this.activateModifyControl();
                /** @type {?} */
                var olGeometry = olFeature.getGeometry();
                this.clearTooltipsOfOlGeometry(olGeometry);
                this.modifyControl.setOlGeometry(olGeometry);
            }
        }
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    MeasurerComponent.prototype.openDialog = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.dialog.open(MeasurerDialogComponent, { data: data });
    };
    /**
     * Initialize the measure store and set up some listeners
     * @internal
     */
    /**
     * Initialize the measure store and set up some listeners
     * \@internal
     * @private
     * @return {?}
     */
    MeasurerComponent.prototype.initStore = /**
     * Initialize the measure store and set up some listeners
     * \@internal
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var store = this.store;
        /** @type {?} */
        var layer = new VectorLayer({
            title: 'Measures',
            zIndex: 200,
            source: new FeatureDataSource(),
            style: createMeasureLayerStyle(),
            showInLayerList: false,
            exportable: false,
            browsable: false
        });
        tryBindStoreLayer(store, layer);
        tryAddLoadingStrategy(store);
        tryAddSelectionStrategy(store, new FeatureStoreSelectionStrategy({
            map: this.map,
            many: true
        }));
        this.onFeatureAddedKey = store.source.ol.on('addfeature', (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var feature = event.feature;
            /** @type {?} */
            var olGeometry = feature.getGeometry();
            _this.updateMeasureOfOlGeometry(olGeometry, feature.get('measure'));
        }));
        this.onFeatureRemovedKey = store.source.ol.on('removefeature', (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var olGeometry = event.feature.getGeometry();
            _this.clearTooltipsOfOlGeometry(olGeometry);
        }));
        this.selectedFeatures$$ = store.stateView.manyBy$((/**
         * @param {?} record
         * @return {?}
         */
        function (record) {
            return record.state.selected === true;
        })).pipe(skip(1) // Skip initial emission
        )
            .subscribe((/**
         * @param {?} records
         * @return {?}
         */
        function (records) {
            if (_this.modifyControl.active === true) {
                _this.deactivateModifyControl();
            }
            _this.selectedFeatures$.next(records.map((/**
             * @param {?} record
             * @return {?}
             */
            function (record) { return record.entity; })));
        }));
    };
    /**
     * Freeze any store, meaning the layer is removed, strategies are deactivated
     * and some listener removed
     * @internal
     */
    /**
     * Freeze any store, meaning the layer is removed, strategies are deactivated
     * and some listener removed
     * \@internal
     * @private
     * @return {?}
     */
    MeasurerComponent.prototype.freezeStore = /**
     * Freeze any store, meaning the layer is removed, strategies are deactivated
     * and some listener removed
     * \@internal
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var store = this.store;
        this.selectedFeatures$$.unsubscribe();
        unByKey(this.onFeatureAddedKey);
        unByKey(this.onFeatureRemovedKey);
        this.clearTooltipsOfOlSource(store.source.ol);
        this.map.removeLayer(store.layer);
        store.deactivateStrategyOfType(FeatureStoreLoadingStrategy);
        store.deactivateStrategyOfType(FeatureStoreSelectionStrategy);
    };
    /**
     * Create a draw line control
     */
    /**
     * Create a draw line control
     * @private
     * @return {?}
     */
    MeasurerComponent.prototype.createDrawLineControl = /**
     * Create a draw line control
     * @private
     * @return {?}
     */
    function () {
        this.drawLineControl = new DrawControl({
            geometryType: 'LineString',
            source: this.olDrawSource,
            drawStyle: createMeasureInteractionStyle(),
            layerStyle: new OlStyle({})
        });
    };
    /**
     * Create a draw polygon control
     */
    /**
     * Create a draw polygon control
     * @private
     * @return {?}
     */
    MeasurerComponent.prototype.createDrawPolygonControl = /**
     * Create a draw polygon control
     * @private
     * @return {?}
     */
    function () {
        this.drawPolygonControl = new DrawControl({
            geometryType: 'Polygon',
            source: this.olDrawSource,
            drawStyle: createMeasureInteractionStyle(),
            layerStyle: new OlStyle({})
        });
    };
    /**
     * Create a draw polygon control
     */
    /**
     * Create a draw polygon control
     * @private
     * @return {?}
     */
    MeasurerComponent.prototype.createModifyControl = /**
     * Create a draw polygon control
     * @private
     * @return {?}
     */
    function () {
        this.modifyControl = new ModifyControl({
            source: this.olDrawSource,
            drawStyle: createMeasureInteractionStyle(),
            layerStyle: new OlStyle({})
        });
    };
    /**
     * Activate the right control
     */
    /**
     * Activate the right control
     * @private
     * @return {?}
     */
    MeasurerComponent.prototype.toggleDrawControl = /**
     * Activate the right control
     * @private
     * @return {?}
     */
    function () {
        this.deactivateDrawControl();
        // this.deactivateModifyControl();
        if (this.activeMeasureType === MeasureType.Length) {
            this.activateDrawControl(this.drawLineControl);
        }
        else if (this.activeMeasureType === MeasureType.Area) {
            this.activateDrawControl(this.drawPolygonControl);
        }
    };
    /**
     * Activate a given control
     * @param drawControl Draw control
     */
    /**
     * Activate a given control
     * @private
     * @param {?} drawControl Draw control
     * @return {?}
     */
    MeasurerComponent.prototype.activateDrawControl = /**
     * Activate a given control
     * @private
     * @param {?} drawControl Draw control
     * @return {?}
     */
    function (drawControl) {
        var _this = this;
        this.activeDrawControl = drawControl;
        this.drawStart$$ = drawControl.start$
            .subscribe((/**
         * @param {?} olGeometry
         * @return {?}
         */
        function (olGeometry) { return _this.onDrawStart(olGeometry); }));
        this.drawEnd$$ = drawControl.end$
            .subscribe((/**
         * @param {?} olGeometry
         * @return {?}
         */
        function (olGeometry) { return _this.onDrawEnd(olGeometry); }));
        this.drawChanges$$ = drawControl.changes$
            .subscribe((/**
         * @param {?} olGeometry
         * @return {?}
         */
        function (olGeometry) { return _this.onDrawChanges(olGeometry); }));
        drawControl.setOlMap(this.map.ol);
    };
    /**
     * Deactivate the active draw control
     */
    /**
     * Deactivate the active draw control
     * @private
     * @return {?}
     */
    MeasurerComponent.prototype.deactivateDrawControl = /**
     * Deactivate the active draw control
     * @private
     * @return {?}
     */
    function () {
        if (this.activeDrawControl === undefined) {
            return;
        }
        this.olDrawSource.clear();
        if (this.drawStart$$ !== undefined) {
            this.drawStart$$.unsubscribe();
        }
        if (this.drawEnd$$ !== undefined) {
            this.drawEnd$$.unsubscribe();
        }
        if (this.drawChanges$$ !== undefined) {
            this.drawChanges$$.unsubscribe();
        }
        this.clearTooltipsOfOlSource(this.olDrawSource);
        if (this.activeOlGeometry !== undefined) {
            this.clearTooltipsOfOlGeometry(this.activeOlGeometry);
        }
        this.activeDrawControl.setOlMap(undefined);
        this.activeDrawControl = undefined;
        this.activeOlGeometry = undefined;
    };
    /**
     * @private
     * @param {?} measureType
     * @return {?}
     */
    MeasurerComponent.prototype.setActiveMeasureType = /**
     * @private
     * @param {?} measureType
     * @return {?}
     */
    function (measureType) {
        this._activeMeasureType = measureType;
        this.clearMeasures();
        this.toggleDrawControl();
    };
    /**
     * Clear the draw source and track the geometry being drawn
     * @param olGeometry Ol linestring or polygon
     */
    /**
     * Clear the draw source and track the geometry being drawn
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @return {?}
     */
    MeasurerComponent.prototype.onDrawStart = /**
     * Clear the draw source and track the geometry being drawn
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @return {?}
     */
    function (olGeometry) {
        this.activeOlGeometry = olGeometry;
    };
    /**
     * Clear the draw source and track the geometry being draw
     * @param olGeometry Ol linestring or polygon
     */
    /**
     * Clear the draw source and track the geometry being draw
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @return {?}
     */
    MeasurerComponent.prototype.onDrawEnd = /**
     * Clear the draw source and track the geometry being draw
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @return {?}
     */
    function (olGeometry) {
        this.activeOlGeometry = undefined;
        this.finalizeMeasureOfOlGeometry(olGeometry);
        this.addFeatureToStore(olGeometry);
        this.clearTooltipsOfOlGeometry(olGeometry);
        this.olDrawSource.clear(true);
    };
    /**
     * Update measures observables and map tooltips
     * @param olGeometry Ol linestring or polygon
     */
    /**
     * Update measures observables and map tooltips
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @return {?}
     */
    MeasurerComponent.prototype.onDrawChanges = /**
     * Update measures observables and map tooltips
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @return {?}
     */
    function (olGeometry) {
        /** @type {?} */
        var measure = measureOlGeometry(olGeometry, this.projection);
        this.updateMeasureOfOlGeometry(olGeometry, Object.assign({}, measure, {
            area: undefined // We don't want to display an area tooltip while drawing.
        }));
        this.measure$.next(measure);
    };
    /**
     * Activate a given control
     * @param modifyControl Modify control
     */
    /**
     * Activate a given control
     * @private
     * @return {?}
     */
    MeasurerComponent.prototype.activateModifyControl = /**
     * Activate a given control
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var selection = (/** @type {?} */ (this.store.getStrategyOfType(FeatureStoreSelectionStrategy)));
        selection.deactivate();
        selection.clear();
        this.modifyStart$$ = this.modifyControl.start$
            .subscribe((/**
         * @param {?} olGeometry
         * @return {?}
         */
        function (olGeometry) { return _this.onModifyStart(olGeometry); }));
        this.modifyEnd$$ = this.modifyControl.end$
            .subscribe((/**
         * @param {?} olGeometry
         * @return {?}
         */
        function (olGeometry) { return _this.onModifyEnd(olGeometry); }));
        this.modifyChanges$$ = this.modifyControl.changes$
            .subscribe((/**
         * @param {?} olGeometry
         * @return {?}
         */
        function (olGeometry) { return _this.onModifyChanges(olGeometry); }));
        this.modifyControl.setOlMap(this.map.ol);
    };
    /**
     * Deactivate the active modify control
     */
    /**
     * Deactivate the active modify control
     * @private
     * @return {?}
     */
    MeasurerComponent.prototype.deactivateModifyControl = /**
     * Deactivate the active modify control
     * @private
     * @return {?}
     */
    function () {
        if (this.modifyStart$$ !== undefined) {
            this.modifyStart$$.unsubscribe();
        }
        if (this.modifyEnd$$ !== undefined) {
            this.modifyEnd$$.unsubscribe();
        }
        if (this.modifyChanges$$ !== undefined) {
            this.modifyChanges$$.unsubscribe();
        }
        if (this.activeOlGeometry !== undefined) {
            if (this.selectedFeatures$.value.length === 1) {
                /** @type {?} */
                var feature = this.selectedFeatures$.value[0];
                this.addFeatureToStore(this.activeOlGeometry, feature);
            }
            this.finalizeMeasureOfOlGeometry(this.activeOlGeometry);
        }
        this.olDrawSource.clear();
        this.store.activateStrategyOfType(FeatureStoreSelectionStrategy);
        this.activeOlGeometry = undefined;
        this.modifyControl.setOlMap(undefined);
    };
    /**
     * Clear the draw source and track the geometry being drawn
     * @param olGeometry Ol linestring or polygon
     */
    /**
     * Clear the draw source and track the geometry being drawn
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @return {?}
     */
    MeasurerComponent.prototype.onModifyStart = /**
     * Clear the draw source and track the geometry being drawn
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @return {?}
     */
    function (olGeometry) {
        this.onDrawStart(olGeometry);
    };
    /**
     * Update measures observables and map tooltips
     * @param olGeometry Ol linestring or polygon
     */
    /**
     * Update measures observables and map tooltips
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @return {?}
     */
    MeasurerComponent.prototype.onModifyChanges = /**
     * Update measures observables and map tooltips
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @return {?}
     */
    function (olGeometry) {
        this.onDrawChanges(olGeometry);
    };
    /**
     * Clear the draw source and track the geometry being draw
     * @param olGeometry Ol linestring or polygon
     */
    /**
     * Clear the draw source and track the geometry being draw
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @return {?}
     */
    MeasurerComponent.prototype.onModifyEnd = /**
     * Clear the draw source and track the geometry being draw
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @return {?}
     */
    function (olGeometry) {
        this.finalizeMeasureOfOlGeometry(olGeometry);
    };
    /**
     * @private
     * @param {?} olGeometry
     * @return {?}
     */
    MeasurerComponent.prototype.finalizeMeasureOfOlGeometry = /**
     * @private
     * @param {?} olGeometry
     * @return {?}
     */
    function (olGeometry) {
        /** @type {?} */
        var measure = measureOlGeometry(olGeometry, this.projection);
        if (olGeometry instanceof OlPolygon) {
            measure = Object.assign({}, measure, {
                lengths: [] // We don't want to display an area tooltip while drawing.
            });
        }
        this.updateMeasureOfOlGeometry(olGeometry, measure);
    };
    /**
     * Update measures observables
     * @param olGeometry Ol linestring or polygon
     * @param measure Measure
     */
    /**
     * Update measures observables
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @param {?} measure Measure
     * @return {?}
     */
    MeasurerComponent.prototype.updateMeasureOfOlGeometry = /**
     * Update measures observables
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @param {?} measure Measure
     * @return {?}
     */
    function (olGeometry, measure) {
        olGeometry.setProperties({ _measure: measure }, true);
        this.updateTooltipsOfOlGeometry(olGeometry);
    };
    /**
     * Clear the measures observables
     */
    /**
     * Clear the measures observables
     * @private
     * @return {?}
     */
    MeasurerComponent.prototype.clearMeasures = /**
     * Clear the measures observables
     * @private
     * @return {?}
     */
    function () {
        this.measure$.next({});
    };
    /**
     * Add a feature with measures to the store. The loading stragegy of the store
     * will trigger and add the feature to the map.
     * @internal
     */
    /**
     * Add a feature with measures to the store. The loading stragegy of the store
     * will trigger and add the feature to the map.
     * \@internal
     * @private
     * @param {?} olGeometry
     * @param {?=} feature
     * @return {?}
     */
    MeasurerComponent.prototype.addFeatureToStore = /**
     * Add a feature with measures to the store. The loading stragegy of the store
     * will trigger and add the feature to the map.
     * \@internal
     * @private
     * @param {?} olGeometry
     * @param {?=} feature
     * @return {?}
     */
    function (olGeometry, feature) {
        /** @type {?} */
        var featureId = feature ? feature.properties.id : uuid();
        /** @type {?} */
        var projection = this.map.ol.getView().getProjection();
        /** @type {?} */
        var geometry = new OlGeoJSON().writeGeometryObject(olGeometry, {
            featureProjection: projection,
            dataProjection: projection
        });
        this.store.update({
            type: FEATURE,
            geometry: geometry,
            projection: projection.getCode(),
            properties: {
                id: featureId,
                measure: olGeometry.get('_measure')
            },
            meta: {
                id: featureId
            }
        });
    };
    /**
     * Update all the tooltips of an OL geometry
     * @param olGeometry OL Geometry
     * @param lengths Lengths of the OL geometry's segments
     * @param measureUnit Display tooltip measure in those units
     */
    /**
     * Update all the tooltips of an OL geometry
     * @private
     * @param {?} olGeometry OL Geometry
     * @return {?}
     */
    MeasurerComponent.prototype.updateTooltipsOfOlGeometry = /**
     * Update all the tooltips of an OL geometry
     * @private
     * @param {?} olGeometry OL Geometry
     * @return {?}
     */
    function (olGeometry) {
        /** @type {?} */
        var measure = olGeometry.get('_measure');
        /** @type {?} */
        var lengths = measure.lengths;
        /** @type {?} */
        var area = measure.area;
        /** @type {?} */
        var olMidpointsTooltips = updateOlTooltipsAtMidpoints(olGeometry);
        if (lengths.length === olMidpointsTooltips.length) {
            for (var i = 0; i < olMidpointsTooltips.length; i++) {
                /** @type {?} */
                var length_1 = lengths[i];
                if (length_1 !== undefined) {
                    this.updateOlTooltip(olMidpointsTooltips[i], metersToUnit(length_1, this.activeLengthUnit), this.activeLengthUnit, MeasureType.Length);
                }
            }
        }
        if (area !== undefined) {
            this.updateOlTooltip(updateOlTooltipAtCenter(olGeometry), squareMetersToUnit(area, this.activeAreaUnit), this.activeAreaUnit, MeasureType.Area);
        }
    };
    /**
     * Show the map tooltips of a geoemtry
     */
    /**
     * Show the map tooltips of a geoemtry
     * @private
     * @param {?} olGeometry
     * @return {?}
     */
    MeasurerComponent.prototype.showTooltipsOfOlGeometry = /**
     * Show the map tooltips of a geoemtry
     * @private
     * @param {?} olGeometry
     * @return {?}
     */
    function (olGeometry) {
        var _this = this;
        getTooltipsOfOlGeometry(olGeometry).forEach((/**
         * @param {?} olTooltip
         * @return {?}
         */
        function (olTooltip) {
            if (_this.shouldShowTooltip(olTooltip)) {
                _this.map.ol.addOverlay(olTooltip);
            }
        }));
    };
    /**
     * Clear the tooltips of an OL geometrys
     * @param olGeometry OL geometry with tooltips
     */
    /**
     * Clear the tooltips of an OL geometrys
     * @private
     * @param {?} olGeometry OL geometry with tooltips
     * @return {?}
     */
    MeasurerComponent.prototype.clearTooltipsOfOlGeometry = /**
     * Clear the tooltips of an OL geometrys
     * @private
     * @param {?} olGeometry OL geometry with tooltips
     * @return {?}
     */
    function (olGeometry) {
        var _this = this;
        getTooltipsOfOlGeometry(olGeometry).forEach((/**
         * @param {?} olTooltip
         * @return {?}
         */
        function (olTooltip) {
            if (olTooltip !== undefined && olTooltip.getMap() !== undefined) {
                _this.map.ol.removeOverlay(olTooltip);
            }
        }));
    };
    /**
     * Show the map tooltips of all the geometries of a source
     */
    /**
     * Show the map tooltips of all the geometries of a source
     * @private
     * @param {?} olSource
     * @return {?}
     */
    MeasurerComponent.prototype.updateTooltipsOfOlSource = /**
     * Show the map tooltips of all the geometries of a source
     * @private
     * @param {?} olSource
     * @return {?}
     */
    function (olSource) {
        var _this = this;
        olSource.forEachFeature((/**
         * @param {?} olFeature
         * @return {?}
         */
        function (olFeature) {
            _this.updateTooltipsOfOlGeometry(olFeature.getGeometry());
        }));
    };
    /**
     * Show the map tooltips of all the geometries of a source
     */
    /**
     * Show the map tooltips of all the geometries of a source
     * @private
     * @param {?} olSource
     * @return {?}
     */
    MeasurerComponent.prototype.showTooltipsOfOlSource = /**
     * Show the map tooltips of all the geometries of a source
     * @private
     * @param {?} olSource
     * @return {?}
     */
    function (olSource) {
        var _this = this;
        olSource.forEachFeature((/**
         * @param {?} olFeature
         * @return {?}
         */
        function (olFeature) {
            _this.showTooltipsOfOlGeometry(olFeature.getGeometry());
        }));
    };
    /**
     * Clear the map tooltips
     * @param olDrawSource OL vector source
     */
    /**
     * Clear the map tooltips
     * @private
     * @param {?} olSource
     * @return {?}
     */
    MeasurerComponent.prototype.clearTooltipsOfOlSource = /**
     * Clear the map tooltips
     * @private
     * @param {?} olSource
     * @return {?}
     */
    function (olSource) {
        var _this = this;
        olSource.forEachFeature((/**
         * @param {?} olFeature
         * @return {?}
         */
        function (olFeature) {
            /** @type {?} */
            var olGeometry = olFeature.getGeometry();
            if (olGeometry !== undefined) {
                _this.clearTooltipsOfOlGeometry(olFeature.getGeometry());
            }
        }));
    };
    /**
     * Update an OL tooltip properties and inner HTML and add it to the map if possible
     * @param olTooltip OL tooltip
     * @param measure The measure valeu ti display
     * @param measureUnit Display tooltip measure in those units
     */
    /**
     * Update an OL tooltip properties and inner HTML and add it to the map if possible
     * @private
     * @param {?} olTooltip OL tooltip
     * @param {?} measure The measure valeu ti display
     * @param {?} unit
     * @param {?} type
     * @return {?}
     */
    MeasurerComponent.prototype.updateOlTooltip = /**
     * Update an OL tooltip properties and inner HTML and add it to the map if possible
     * @private
     * @param {?} olTooltip OL tooltip
     * @param {?} measure The measure valeu ti display
     * @param {?} unit
     * @param {?} type
     * @return {?}
     */
    function (olTooltip, measure, unit, type) {
        olTooltip.setProperties({ _measure: measure, _unit: unit, _type: type }, true);
        olTooltip.getElement().innerHTML = this.computeTooltipInnerHTML(olTooltip);
        if (this.shouldShowTooltip(olTooltip)) {
            this.map.ol.addOverlay(olTooltip);
        }
    };
    /**
     * Compute a tooltip's content
     * @param olTooltip OL overlay
     * @returns Inner HTML
     */
    /**
     * Compute a tooltip's content
     * @private
     * @param {?} olTooltip OL overlay
     * @return {?} Inner HTML
     */
    MeasurerComponent.prototype.computeTooltipInnerHTML = /**
     * Compute a tooltip's content
     * @private
     * @param {?} olTooltip OL overlay
     * @return {?} Inner HTML
     */
    function (olTooltip) {
        /** @type {?} */
        var properties = (/** @type {?} */ (olTooltip.getProperties()));
        return formatMeasure(properties._measure, {
            decimal: 1,
            unit: properties._unit,
            unitAbbr: true,
            locale: 'fr'
        }, this.languageService);
    };
    /**
     * Whether a tooltip should be showned based on the length
     * of the segment it is bound to.
     * @param olTooltip OL overlay
     * @returns True if the tooltip should be shown
     */
    /**
     * Whether a tooltip should be showned based on the length
     * of the segment it is bound to.
     * @private
     * @param {?} olTooltip OL overlay
     * @return {?} True if the tooltip should be shown
     */
    MeasurerComponent.prototype.shouldShowTooltip = /**
     * Whether a tooltip should be showned based on the length
     * of the segment it is bound to.
     * @private
     * @param {?} olTooltip OL overlay
     * @return {?} True if the tooltip should be shown
     */
    function (olTooltip) {
        if (this.showTooltips === false) {
            return false;
        }
        /** @type {?} */
        var properties = (/** @type {?} */ (olTooltip.getProperties()));
        /** @type {?} */
        var measure = properties._measure;
        if (measure === undefined) {
            return false;
        }
        if (properties._unit === MeasureType.Length) {
            /** @type {?} */
            var minSegmentLength = metersToUnit(this.minSegmentLength, properties._unit) || 0;
            return measure > Math.max(minSegmentLength, 0);
        }
        return true;
    };
    MeasurerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-measurer',
                    template: "<div>\r\n  <div class=\"measure-type-toggle mat-typography\">\r\n    <mat-button-toggle-group\r\n      [value]=\"activeMeasureType\"\r\n      (change)=\"onMeasureTypeChange($event.value)\">\r\n      <mat-button-toggle [value]=\"measureType.Length\">\r\n        {{('igo.geo.measure.' + measureType.Length) | translate}}\r\n      </mat-button-toggle>\r\n      <mat-button-toggle [value]=\"measureType.Area\">\r\n        {{('igo.geo.measure.' + measureType.Area) | translate}}\r\n      </mat-button-toggle>\r\n    </mat-button-toggle-group>\r\n  </div>\r\n\r\n  <div class=\"measure-options mat-typography\">\r\n    <mat-slide-toggle\r\n      [checked]=\"drawControlIsActive\"\r\n      [labelPosition]=\"'before'\"\r\n      (change)=\"onToggleDrawControl($event.checked)\">\r\n      {{'igo.geo.measure.toggleActive' | translate}}\r\n    </mat-slide-toggle>\r\n\r\n    <mat-slide-toggle\r\n      [checked]=\"showTooltips\"\r\n      [labelPosition]=\"'before'\"\r\n      (change)=\"onToggleTooltips($event.checked)\">\r\n      {{'igo.geo.measure.toggleMapTooltips' | translate}}\r\n    </mat-slide-toggle>\r\n\r\n    <mat-slide-toggle\r\n      [checked]=\"measureUnitsAuto\"\r\n      [labelPosition]=\"'before'\"\r\n      (change)=\"onToggleMeasureUnitsAuto($event.checked)\">\r\n      {{'igo.geo.measure.toggleAutoUnits' | translate}}\r\n    </mat-slide-toggle>\r\n  </div>\r\n\r\n  <ng-container *ngIf=\"measure$ | async as measure\">\r\n    <igo-measurer-item\r\n      [measureType]=\"measureType.Length\"\r\n      [measureUnit]=\"measureLengthUnit.Meters\"\r\n      [measure]=\"measure.length\"\r\n      [auto]=\"measureUnitsAuto\"\r\n      [placeholder]=\"(activeMeasureType === measureType.Area ? 'igo.geo.measure.perimeter' : 'igo.geo.measure.length') | translate\"\r\n      (measureUnitChange)=\"onLengthUnitChange($event)\">\r\n    </igo-measurer-item>\r\n\r\n    <igo-measurer-item\r\n      [measureType]=\"measureType.Area\"\r\n      [measureUnit]=\"measureAreaUnit.SquareMeters\"\r\n      [measure]=\"measure.area\"\r\n      [auto]=\"measureUnitsAuto\"\r\n      [placeholder]=\"'igo.geo.measure.area' | translate\"\r\n      (measureUnitChange)=\"onAreaUnitChange($event)\">\r\n    </igo-measurer-item>\r\n  </ng-container>\r\n\r\n  <div class=\"measure-store-buttons\">\r\n    <button\r\n      mat-icon-button\r\n      [matTooltip]=\"'igo.geo.measure.actionbar.calculate.tooltip' | translate\"\r\n      [disabled]=\"(selectedFeatures$ | async).length === 0\"\r\n      (click)=\"onCalculateClick()\">\r\n      <mat-icon svgIcon=\"calculator\"></mat-icon>\r\n    </button>\r\n\r\n    <button\r\n      mat-icon-button\r\n      [matTooltip]=\"'igo.geo.measure.actionbar.delete.tooltip' | translate\"\r\n      [disabled]=\"(selectedFeatures$ | async).length === 0\"\r\n      (click)=\"onDeleteClick()\">\r\n      <mat-icon svgIcon=\"delete\"></mat-icon>\r\n    </button>\r\n\r\n    <!--button\r\n      mat-icon-button\r\n      [matTooltip]=\"'igo.geo.measure.actionbar.modify.tooltip' | translate\"\r\n      [disabled]=\"(selectedFeatures$ | async).length !== 1\"\r\n      (click)=\"onModifyClick()\">\r\n      <mat-icon svgIcon=\"edit\"></mat-icon>\r\n    </button-->\r\n  </div>\r\n\r\n  <igo-entity-table\r\n    #table\r\n    class=\"table-compact\"\r\n    [store]=\"store\"\r\n    [template]=\"tableTemplate\">\r\n  </igo-entity-table>\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".measure-type-toggle{padding:10px;text-align:center}.measure-type-toggle mat-button-toggle-group{width:100%}.measure-type-toggle mat-button-toggle-group mat-button-toggle{width:50%}.measure-options{overflow-x:hidden}.measure-options mat-slide-toggle{width:100%;margin:10px}.measure-options mat-slide-toggle ::ng-deep .mat-slide-toggle-content{width:calc(100% - 60px)}.measure-store-buttons{width:100%;border-top:1px solid #ddd;border-bottom:1px solid #ddd}.measure-store-buttons button:first-of-type{margin-left:14px}.table-compact ::ng-deep .mat-header-cell.mat-column-selectionCheckbox{width:52px}"]
                }] }
    ];
    /** @nocollapse */
    MeasurerComponent.ctorParameters = function () { return [
        { type: LanguageService },
        { type: MatDialog }
    ]; };
    MeasurerComponent.propDecorators = {
        map: [{ type: Input }],
        store: [{ type: Input }],
        activeMeasureType: [{ type: Input }],
        minSegmentLength: [{ type: Input }],
        table: [{ type: ViewChild, args: ['table',] }]
    };
    return MeasurerComponent;
}());
export { MeasurerComponent };
if (false) {
    /**
     * Table template
     * \@internal
     * @type {?}
     */
    MeasurerComponent.prototype.tableTemplate;
    /**
     * Reference to the MeasureType enum
     * \@internal
     * @type {?}
     */
    MeasurerComponent.prototype.measureType;
    /**
     * Reference to the AreaMeasureUnit enum
     * \@internal
     * @type {?}
     */
    MeasurerComponent.prototype.measureAreaUnit;
    /**
     * Reference to the LengthMeasureUnit enum
     * \@internal
     * @type {?}
     */
    MeasurerComponent.prototype.measureLengthUnit;
    /**
     * Whether measure units should be automatically determined
     * \@internal
     * @type {?}
     */
    MeasurerComponent.prototype.measureUnitsAuto;
    /**
     * Observable of area
     * \@internal
     * @type {?}
     */
    MeasurerComponent.prototype.measure$;
    /**
     * Observable of selected features
     * \@internal
     * @type {?}
     */
    MeasurerComponent.prototype.selectedFeatures$;
    /**
     * OL draw source
     * \@internal
     * @type {?}
     */
    MeasurerComponent.prototype.showTooltips;
    /**
     * Draw line control
     * @type {?}
     * @private
     */
    MeasurerComponent.prototype.drawLineControl;
    /**
     * Draw polygon control
     * @type {?}
     * @private
     */
    MeasurerComponent.prototype.drawPolygonControl;
    /**
     * Modify control
     * @type {?}
     * @private
     */
    MeasurerComponent.prototype.modifyControl;
    /**
     * Active OL geometry
     * @type {?}
     * @private
     */
    MeasurerComponent.prototype.activeOlGeometry;
    /**
     * Active mlength unit
     * @type {?}
     * @private
     */
    MeasurerComponent.prototype.activeLengthUnit;
    /**
     * Active area unit
     * @type {?}
     * @private
     */
    MeasurerComponent.prototype.activeAreaUnit;
    /**
     * Feature added listener key
     * @type {?}
     * @private
     */
    MeasurerComponent.prototype.onFeatureAddedKey;
    /**
     * Feature removed listener key
     * @type {?}
     * @private
     */
    MeasurerComponent.prototype.onFeatureRemovedKey;
    /**
     * Active draw control
     * \@internal
     * @type {?}
     * @private
     */
    MeasurerComponent.prototype.activeDrawControl;
    /**
     * Subscription to draw start
     * @type {?}
     * @private
     */
    MeasurerComponent.prototype.drawStart$$;
    /**
     * Subscription to draw end
     * @type {?}
     * @private
     */
    MeasurerComponent.prototype.drawEnd$$;
    /**
     * Subscription to controls changes
     * @type {?}
     * @private
     */
    MeasurerComponent.prototype.drawChanges$$;
    /**
     * Subscription to modify start
     * @type {?}
     * @private
     */
    MeasurerComponent.prototype.modifyStart$$;
    /**
     * Subscription to modify end
     * @type {?}
     * @private
     */
    MeasurerComponent.prototype.modifyEnd$$;
    /**
     * Subscription to controls changes
     * @type {?}
     * @private
     */
    MeasurerComponent.prototype.modifyChanges$$;
    /**
     * Subscription to measures selection
     * @type {?}
     * @private
     */
    MeasurerComponent.prototype.selectedFeatures$$;
    /**
     * OL draw source
     * @type {?}
     * @private
     */
    MeasurerComponent.prototype.olDrawSource;
    /**
     * The map to measure on
     * @type {?}
     */
    MeasurerComponent.prototype.map;
    /**
     * The measures store
     * @type {?}
     */
    MeasurerComponent.prototype.store;
    /**
     * @type {?}
     * @private
     */
    MeasurerComponent.prototype._activeMeasureType;
    /**
     * The minimum length a segment must have to display a tooltip.
     * It also applies to area tooltips.
     * @type {?}
     */
    MeasurerComponent.prototype.minSegmentLength;
    /** @type {?} */
    MeasurerComponent.prototype.table;
    /**
     * @type {?}
     * @private
     */
    MeasurerComponent.prototype.languageService;
    /**
     * @type {?}
     * @private
     */
    MeasurerComponent.prototype.dialog;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVhc3VyZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL21lYXN1cmUvbWVhc3VyZXIvbWVhc3VyZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFHTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUU5QyxPQUFPLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHdEMsT0FBTyxPQUFPLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxTQUFTLE1BQU0sbUJBQW1CLENBQUM7QUFDMUMsT0FBTyxjQUFjLE1BQU0sa0JBQWtCLENBQUM7QUFHOUMsT0FBTyxTQUFTLE1BQU0saUJBQWlCLENBQUM7QUFHeEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV4QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzdDLE9BQU8sRUFBcUMsb0JBQW9CLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkYsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVuQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNyRCxPQUFPLEVBQ0wsT0FBTyxFQUNQLFlBQVksRUFDWiwyQkFBMkIsRUFDM0IsNkJBQTZCLEVBQzdCLGlCQUFpQixFQUNqQixxQkFBcUIsRUFDckIsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxN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QXl6QkM7U0FuekJZLGlCQUFpQjs7Ozs7OztJQU01QiwwQ0FtQ0U7Ozs7OztJQU1GLHdDQUFpQzs7Ozs7O0lBTWpDLDRDQUF5Qzs7Ozs7O0lBTXpDLDhDQUE2Qzs7Ozs7O0lBTTdDLDZDQUF5Qzs7Ozs7O0lBTXpDLHFDQUFvRTs7Ozs7O0lBTXBFLDhDQUEwRjs7Ozs7O0lBTTFGLHlDQUFvQzs7Ozs7O0lBS3BDLDRDQUFxQzs7Ozs7O0lBS3JDLCtDQUF3Qzs7Ozs7O0lBS3hDLDBDQUFxQzs7Ozs7O0lBS3JDLDZDQUFtRDs7Ozs7O0lBS25ELDZDQUF1RTs7Ozs7O0lBS3ZFLDJDQUF1RTs7Ozs7O0lBS3ZFLDhDQUFrQzs7Ozs7O0lBS2xDLGdEQUFvQzs7Ozs7OztJQU1wQyw4Q0FBdUM7Ozs7OztJQUt2Qyx3Q0FBa0M7Ozs7OztJQUtsQyxzQ0FBZ0M7Ozs7OztJQUtoQywwQ0FBb0M7Ozs7OztJQUtwQywwQ0FBb0M7Ozs7OztJQUtwQyx3Q0FBa0M7Ozs7OztJQUtsQyw0Q0FBc0M7Ozs7OztJQUt0QywrQ0FBeUM7Ozs7OztJQUt6Qyx5Q0FBNEM7Ozs7O0lBSzVDLGdDQUFxQjs7Ozs7SUFLckIsa0NBQWlEOzs7OztJQVNqRCwrQ0FBNkQ7Ozs7OztJQU03RCw2Q0FBdUM7O0lBRXZDLGtDQUFnRDs7Ozs7SUFlOUMsNENBQXdDOzs7OztJQUN4QyxtQ0FBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIFZpZXdDaGlsZFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBza2lwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IE9sUHJvamVjdGlvbiBmcm9tICdvbC9wcm9qL1Byb2plY3Rpb24nO1xyXG5pbXBvcnQgT2xTdHlsZSBmcm9tICdvbC9zdHlsZS9TdHlsZSc7XHJcbmltcG9ydCBPbEdlb0pTT04gZnJvbSAnb2wvZm9ybWF0L0dlb0pTT04nO1xyXG5pbXBvcnQgT2xWZWN0b3JTb3VyY2UgZnJvbSAnb2wvc291cmNlL1ZlY3Rvcic7XHJcbmltcG9ydCB7IFZlY3RvclNvdXJjZUV2ZW50IGFzIE9sVmVjdG9yU291cmNlRXZlbnQgfSBmcm9tICdvbC9zb3VyY2UvVmVjdG9yJztcclxuaW1wb3J0IE9sTGluZVN0cmluZyBmcm9tICdvbC9nZW9tL0xpbmVTdHJpbmcnO1xyXG5pbXBvcnQgT2xQb2x5Z29uIGZyb20gJ29sL2dlb20vUG9seWdvbic7XHJcbmltcG9ydCBPbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCBPbE92ZXJsYXkgZnJvbSAnb2wvT3ZlcmxheSc7XHJcbmltcG9ydCB7IHVuQnlLZXkgfSBmcm9tICdvbC9PYnNlcnZhYmxlJztcclxuXHJcbmltcG9ydCB7IExhbmd1YWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBFbnRpdHlSZWNvcmQsIEVudGl0eVRhYmxlVGVtcGxhdGUsIEVudGl0eVRhYmxlQ29tcG9uZW50IH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuaW1wb3J0IHsgdXVpZCB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7IEZlYXR1cmVEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7XHJcbiAgRkVBVFVSRSxcclxuICBGZWF0dXJlU3RvcmUsXHJcbiAgRmVhdHVyZVN0b3JlTG9hZGluZ1N0cmF0ZWd5LFxyXG4gIEZlYXR1cmVTdG9yZVNlbGVjdGlvblN0cmF0ZWd5LFxyXG4gIHRyeUJpbmRTdG9yZUxheWVyLFxyXG4gIHRyeUFkZExvYWRpbmdTdHJhdGVneSxcclxuICB0cnlBZGRTZWxlY3Rpb25TdHJhdGVneVxyXG59IGZyb20gJy4uLy4uL2ZlYXR1cmUnO1xyXG5pbXBvcnQgeyBEcmF3Q29udHJvbCwgTW9kaWZ5Q29udHJvbCB9IGZyb20gJy4uLy4uL2dlb21ldHJ5JztcclxuaW1wb3J0IHsgVmVjdG9yTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllcic7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcCc7XHJcblxyXG5pbXBvcnQgeyBNZWFzdXJlLCBNZWFzdXJlckRpYWxvZ0RhdGEsIEZlYXR1cmVXaXRoTWVhc3VyZSB9IGZyb20gJy4uL3NoYXJlZC9tZWFzdXJlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQge1xyXG4gIE1lYXN1cmVUeXBlLFxyXG4gIE1lYXN1cmVBcmVhVW5pdCxcclxuICBNZWFzdXJlTGVuZ3RoVW5pdCxcclxufSBmcm9tICcuLi9zaGFyZWQvbWVhc3VyZS5lbnVtJztcclxuaW1wb3J0IHtcclxuICBtZWFzdXJlT2xHZW9tZXRyeSxcclxuICBjcmVhdGVNZWFzdXJlSW50ZXJhY3Rpb25TdHlsZSxcclxuICBjcmVhdGVNZWFzdXJlTGF5ZXJTdHlsZSxcclxuICB1cGRhdGVPbFRvb2x0aXBzQXRNaWRwb2ludHMsXHJcbiAgdXBkYXRlT2xUb29sdGlwQXRDZW50ZXIsXHJcbiAgZ2V0VG9vbHRpcHNPZk9sR2VvbWV0cnksXHJcbiAgc3F1YXJlTWV0ZXJzVG9Vbml0LFxyXG4gIG1ldGVyc1RvVW5pdCxcclxuICBmb3JtYXRNZWFzdXJlXHJcbn0gZnJvbSAnLi4vc2hhcmVkL21lYXN1cmUudXRpbHMnO1xyXG5pbXBvcnQgeyBNZWFzdXJlckRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vbWVhc3VyZXItZGlhbG9nLmNvbXBvbmVudCc7XHJcblxyXG4vKipcclxuICogVG9vbCB0byBtZWFzdXJlIGxlbmd0aHMgYW5kIGFyZWFzXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1tZWFzdXJlcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL21lYXN1cmVyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9tZWFzdXJlci5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNZWFzdXJlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgLyoqXHJcbiAgICogVGFibGUgdGVtcGxhdGVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwdWJsaWMgdGFibGVUZW1wbGF0ZTogRW50aXR5VGFibGVUZW1wbGF0ZSA9IHtcclxuICAgIHNlbGVjdGlvbjogdHJ1ZSxcclxuICAgIHNlbGVjdE1hbnk6IHRydWUsXHJcbiAgICBzZWxlY3Rpb25DaGVja2JveDogdHJ1ZSxcclxuICAgIHNvcnQ6IHRydWUsXHJcbiAgICBjb2x1bW5zOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBuYW1lOiAnbGVuZ3RoJyxcclxuICAgICAgICB0aXRsZTogdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8ubWVhc3VyZS5sZW5ndGhIZWFkZXInKSxcclxuICAgICAgICB2YWx1ZUFjY2Vzc29yOiAoZmVhdHVyZTogRmVhdHVyZVdpdGhNZWFzdXJlKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB1bml0ID0gdGhpcy5hY3RpdmVMZW5ndGhVbml0O1xyXG4gICAgICAgICAgY29uc3QgbWVhc3VyZSA9IG1ldGVyc1RvVW5pdChmZWF0dXJlLnByb3BlcnRpZXMubWVhc3VyZS5sZW5ndGgsIHVuaXQpO1xyXG4gICAgICAgICAgcmV0dXJuIGZvcm1hdE1lYXN1cmUobWVhc3VyZSwge1xyXG4gICAgICAgICAgICBkZWNpbWFsOiAxLFxyXG4gICAgICAgICAgICB1bml0LFxyXG4gICAgICAgICAgICB1bml0QWJicjogZmFsc2UsXHJcbiAgICAgICAgICAgIGxvY2FsZTogJ2ZyJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgbmFtZTogJ2FyZWEnLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5tZWFzdXJlLmFyZWFIZWFkZXInKSxcclxuICAgICAgICB2YWx1ZUFjY2Vzc29yOiAoZmVhdHVyZTogRmVhdHVyZVdpdGhNZWFzdXJlKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB1bml0ID0gdGhpcy5hY3RpdmVBcmVhVW5pdDtcclxuICAgICAgICAgIGNvbnN0IG1lYXN1cmUgPSBzcXVhcmVNZXRlcnNUb1VuaXQoZmVhdHVyZS5wcm9wZXJ0aWVzLm1lYXN1cmUuYXJlYSwgdW5pdCk7XHJcbiAgICAgICAgICByZXR1cm4gbWVhc3VyZSA/IGZvcm1hdE1lYXN1cmUobWVhc3VyZSwge1xyXG4gICAgICAgICAgICBkZWNpbWFsOiAxLFxyXG4gICAgICAgICAgICB1bml0LFxyXG4gICAgICAgICAgICB1bml0QWJicjogZmFsc2UsXHJcbiAgICAgICAgICAgIGxvY2FsZTogJ2ZyJ1xyXG4gICAgICAgICAgfSkgOiAnJztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIF1cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIE1lYXN1cmVUeXBlIGVudW1cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwdWJsaWMgbWVhc3VyZVR5cGUgPSBNZWFzdXJlVHlwZTtcclxuXHJcbiAgLyoqXHJcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBBcmVhTWVhc3VyZVVuaXQgZW51bVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHB1YmxpYyBtZWFzdXJlQXJlYVVuaXQgPSBNZWFzdXJlQXJlYVVuaXQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZmVyZW5jZSB0byB0aGUgTGVuZ3RoTWVhc3VyZVVuaXQgZW51bVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHB1YmxpYyBtZWFzdXJlTGVuZ3RoVW5pdCA9IE1lYXN1cmVMZW5ndGhVbml0O1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIG1lYXN1cmUgdW5pdHMgc2hvdWxkIGJlIGF1dG9tYXRpY2FsbHkgZGV0ZXJtaW5lZFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHB1YmxpYyBtZWFzdXJlVW5pdHNBdXRvOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgb2YgYXJlYVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHB1YmxpYyBtZWFzdXJlJDogQmVoYXZpb3JTdWJqZWN0PE1lYXN1cmU+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh7fSk7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgb2Ygc2VsZWN0ZWQgZmVhdHVyZXNcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwdWJsaWMgc2VsZWN0ZWRGZWF0dXJlcyQ6IEJlaGF2aW9yU3ViamVjdDxGZWF0dXJlV2l0aE1lYXN1cmVbXT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcclxuXHJcbiAgLyoqXHJcbiAgICogT0wgZHJhdyBzb3VyY2VcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwdWJsaWMgc2hvd1Rvb2x0aXBzOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogRHJhdyBsaW5lIGNvbnRyb2xcclxuICAgKi9cclxuICBwcml2YXRlIGRyYXdMaW5lQ29udHJvbDogRHJhd0NvbnRyb2w7XHJcblxyXG4gIC8qKlxyXG4gICAqIERyYXcgcG9seWdvbiBjb250cm9sXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkcmF3UG9seWdvbkNvbnRyb2w6IERyYXdDb250cm9sO1xyXG5cclxuICAvKipcclxuICAgKiBNb2RpZnkgY29udHJvbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgbW9kaWZ5Q29udHJvbDogTW9kaWZ5Q29udHJvbDtcclxuXHJcbiAgLyoqXHJcbiAgICogQWN0aXZlIE9MIGdlb21ldHJ5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhY3RpdmVPbEdlb21ldHJ5OiBPbExpbmVTdHJpbmcgfCBPbFBvbHlnb247XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjdGl2ZSBtbGVuZ3RoIHVuaXRcclxuICAgKi9cclxuICBwcml2YXRlIGFjdGl2ZUxlbmd0aFVuaXQ6IE1lYXN1cmVMZW5ndGhVbml0ID0gTWVhc3VyZUxlbmd0aFVuaXQuTWV0ZXJzO1xyXG5cclxuICAvKipcclxuICAgKiBBY3RpdmUgYXJlYSB1bml0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhY3RpdmVBcmVhVW5pdDogTWVhc3VyZUFyZWFVbml0ID0gTWVhc3VyZUFyZWFVbml0LlNxdWFyZU1ldGVycztcclxuXHJcbiAgLyoqXHJcbiAgICogRmVhdHVyZSBhZGRlZCBsaXN0ZW5lciBrZXlcclxuICAgKi9cclxuICBwcml2YXRlIG9uRmVhdHVyZUFkZGVkS2V5OiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZlYXR1cmUgcmVtb3ZlZCBsaXN0ZW5lciBrZXlcclxuICAgKi9cclxuICBwcml2YXRlIG9uRmVhdHVyZVJlbW92ZWRLZXk6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQWN0aXZlIGRyYXcgY29udHJvbFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWN0aXZlRHJhd0NvbnRyb2w6IERyYXdDb250cm9sO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gZHJhdyBzdGFydFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZHJhd1N0YXJ0JCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvIGRyYXcgZW5kXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkcmF3RW5kJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvIGNvbnRyb2xzIGNoYW5nZXNcclxuICAgKi9cclxuICBwcml2YXRlIGRyYXdDaGFuZ2VzJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvIG1vZGlmeSBzdGFydFxyXG4gICAqL1xyXG4gIHByaXZhdGUgbW9kaWZ5U3RhcnQkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gbW9kaWZ5IGVuZFxyXG4gICAqL1xyXG4gIHByaXZhdGUgbW9kaWZ5RW5kJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvIGNvbnRyb2xzIGNoYW5nZXNcclxuICAgKi9cclxuICBwcml2YXRlIG1vZGlmeUNoYW5nZXMkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gbWVhc3VyZXMgc2VsZWN0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZWxlY3RlZEZlYXR1cmVzJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogT0wgZHJhdyBzb3VyY2VcclxuICAgKi9cclxuICBwcml2YXRlIG9sRHJhd1NvdXJjZSA9IG5ldyBPbFZlY3RvclNvdXJjZSgpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbWFwIHRvIG1lYXN1cmUgb25cclxuICAgKi9cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG1lYXN1cmVzIHN0b3JlXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3RvcmU6IEZlYXR1cmVTdG9yZTxGZWF0dXJlV2l0aE1lYXN1cmU+O1xyXG5cclxuICAvKipcclxuICAgKiBNZWFzdXJlIHR5cGVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCBhY3RpdmVNZWFzdXJlVHlwZSh2YWx1ZTogTWVhc3VyZVR5cGUpIHsgdGhpcy5zZXRBY3RpdmVNZWFzdXJlVHlwZSh2YWx1ZSk7IH1cclxuICBnZXQgYWN0aXZlTWVhc3VyZVR5cGUoKTogTWVhc3VyZVR5cGUgeyByZXR1cm4gdGhpcy5fYWN0aXZlTWVhc3VyZVR5cGU7IH1cclxuICBwcml2YXRlIF9hY3RpdmVNZWFzdXJlVHlwZTogTWVhc3VyZVR5cGUgPSBNZWFzdXJlVHlwZS5MZW5ndGg7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBtaW5pbXVtIGxlbmd0aCBhIHNlZ21lbnQgbXVzdCBoYXZlIHRvIGRpc3BsYXkgYSB0b29sdGlwLlxyXG4gICAqIEl0IGFsc28gYXBwbGllcyB0byBhcmVhIHRvb2x0aXBzLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1pblNlZ21lbnRMZW5ndGg6IG51bWJlciA9IDEwO1xyXG5cclxuICBAVmlld0NoaWxkKCd0YWJsZScpIHRhYmxlOiBFbnRpdHlUYWJsZUNvbXBvbmVudDtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGVyIG9uZSBvZiB0aGUgZHJhdyBjb250cm9sIGlzIGFjdGl2ZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBkcmF3Q29udHJvbElzQWN0aXZlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlRHJhd0NvbnRyb2wgIT09IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGdldCBwcm9qZWN0aW9uKCk6IE9sUHJvamVjdGlvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5tYXAub2wuZ2V0VmlldygpLmdldFByb2plY3Rpb24oKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2dcclxuICApIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBkcmF3IGNvbnRyb2xzIGFuZCBhY3RpdmF0ZSBvbmVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuaW5pdFN0b3JlKCk7XHJcbiAgICB0aGlzLmNyZWF0ZURyYXdMaW5lQ29udHJvbCgpO1xyXG4gICAgdGhpcy5jcmVhdGVEcmF3UG9seWdvbkNvbnRyb2woKTtcclxuICAgIHRoaXMuY3JlYXRlTW9kaWZ5Q29udHJvbCgpO1xyXG4gICAgdGhpcy50b2dnbGVEcmF3Q29udHJvbCgpO1xyXG4gICAgdGhpcy5vblRvZ2dsZVRvb2x0aXBzKHRoaXMuc2hvd1Rvb2x0aXBzKTtcclxuICAgIHRoaXMudXBkYXRlVG9vbHRpcHNPZk9sU291cmNlKHRoaXMuc3RvcmUuc291cmNlLm9sKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBvdmVybGF5IGxheWVyIGFuZCBhbnkgaW50ZXJhY3Rpb24gYWRkZWQgYnkgdGhpcyBjb21wb25lbnQuXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnNldEFjdGl2ZU1lYXN1cmVUeXBlKHVuZGVmaW5lZCk7XHJcbiAgICB0aGlzLmRlYWN0aXZhdGVNb2RpZnlDb250cm9sKCk7XHJcbiAgICB0aGlzLmZyZWV6ZVN0b3JlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIG1lYXN1cmUgdHlwZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uTWVhc3VyZVR5cGVDaGFuZ2UobWVhc3VyZVR5cGU6IE1lYXN1cmVUeXBlKSB7XHJcbiAgICB0aGlzLmFjdGl2ZU1lYXN1cmVUeXBlID0gbWVhc3VyZVR5cGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBY3RpdmF0ZSBvciBkZWFjdGl2YXRlIHRoZSBjdXJyZW50IGRyYXcgY29udHJvbFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uVG9nZ2xlRHJhd0NvbnRyb2wodG9nZ2xlOiBib29sZWFuKSB7XHJcbiAgICBpZiAodG9nZ2xlID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMudG9nZ2xlRHJhd0NvbnRyb2woKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZGVhY3RpdmF0ZURyYXdDb250cm9sKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBY3RpdmF0ZSBvciBkZWFjdGl2YXRlIHRoZSBjdXJyZW50IGRyYXcgY29udHJvbFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uVG9nZ2xlVG9vbHRpcHModG9nZ2xlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLnNob3dUb29sdGlwcyA9IHRvZ2dsZTtcclxuICAgIGlmICh0b2dnbGUgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5zaG93VG9vbHRpcHNPZk9sU291cmNlKHRoaXMuc3RvcmUuc291cmNlLm9sKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY2xlYXJUb29sdGlwc09mT2xTb3VyY2UodGhpcy5zdG9yZS5zb3VyY2Uub2wpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWN0aXZhdGUgb3IgZGVhY3RpdmF0ZSB0aGUgY3VycmVudCBkcmF3IGNvbnRyb2xcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvblRvZ2dsZU1lYXN1cmVVbml0c0F1dG8odG9nZ2xlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLm1lYXN1cmVVbml0c0F1dG8gPSB0b2dnbGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIG1lYXN1cmUgdHlwZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uTGVuZ3RoVW5pdENoYW5nZSh1bml0OiBNZWFzdXJlTGVuZ3RoVW5pdCkge1xyXG4gICAgdGhpcy5hY3RpdmVMZW5ndGhVbml0ID0gdW5pdDtcclxuICAgIHRoaXMudGFibGUucmVmcmVzaCgpO1xyXG4gICAgdGhpcy51cGRhdGVUb29sdGlwc09mT2xTb3VyY2UodGhpcy5zdG9yZS5zb3VyY2Uub2wpO1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlT2xHZW9tZXRyeSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlVG9vbHRpcHNPZk9sR2VvbWV0cnkodGhpcy5hY3RpdmVPbEdlb21ldHJ5KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgbWVhc3VyZSB0eXBlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25BcmVhVW5pdENoYW5nZSh1bml0OiBNZWFzdXJlQXJlYVVuaXQpIHtcclxuICAgIHRoaXMuYWN0aXZlQXJlYVVuaXQgPSB1bml0O1xyXG4gICAgdGhpcy50YWJsZS5yZWZyZXNoKCk7XHJcbiAgICB0aGlzLnVwZGF0ZVRvb2x0aXBzT2ZPbFNvdXJjZSh0aGlzLnN0b3JlLnNvdXJjZS5vbCk7XHJcbiAgICBpZiAodGhpcy5hY3RpdmVPbEdlb21ldHJ5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy51cGRhdGVUb29sdGlwc09mT2xHZW9tZXRyeSh0aGlzLmFjdGl2ZU9sR2VvbWV0cnkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25DYWxjdWxhdGVDbGljaygpIHtcclxuICAgIGNvbnN0IGZlYXR1cmVzID0gdGhpcy5zZWxlY3RlZEZlYXR1cmVzJC52YWx1ZTtcclxuICAgIGNvbnN0IGFyZWEgPSBmZWF0dXJlcy5yZWR1Y2UoKHN1bTogbnVtYmVyLCBmZWF0dXJlOiBGZWF0dXJlV2l0aE1lYXN1cmUpID0+IHtcclxuICAgICAgcmV0dXJuIHN1bSArIGZlYXR1cmUucHJvcGVydGllcy5tZWFzdXJlLmFyZWEgfHwgMDtcclxuICAgIH0sIDApO1xyXG4gICAgY29uc3QgbGVuZ3RoID0gZmVhdHVyZXMucmVkdWNlKChzdW06IG51bWJlciwgZmVhdHVyZTogRmVhdHVyZVdpdGhNZWFzdXJlKSA9PiB7XHJcbiAgICAgIGlmIChmZWF0dXJlLmdlb21ldHJ5LnR5cGUgPT09ICdQb2x5Z29uJykge1xyXG4gICAgICAgIHJldHVybiBzdW07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHN1bSArIGZlYXR1cmUucHJvcGVydGllcy5tZWFzdXJlLmxlbmd0aCB8fCAwO1xyXG4gICAgfSwgMCk7XHJcbiAgICBjb25zdCBwZXJpbWV0ZXIgPSBmZWF0dXJlcy5yZWR1Y2UoKHN1bTogbnVtYmVyLCBmZWF0dXJlOiBGZWF0dXJlV2l0aE1lYXN1cmUpID0+IHtcclxuICAgICAgaWYgKGZlYXR1cmUuZ2VvbWV0cnkudHlwZSA9PT0gJ0xpbmVTdHJpbmcnKSB7XHJcbiAgICAgICAgcmV0dXJuIHN1bTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc3VtICsgZmVhdHVyZS5wcm9wZXJ0aWVzLm1lYXN1cmUubGVuZ3RoIHx8IDA7XHJcbiAgICB9LCAwKTtcclxuXHJcbiAgICB0aGlzLm9wZW5EaWFsb2coe1xyXG4gICAgICBhcmVhLFxyXG4gICAgICBsZW5ndGgsXHJcbiAgICAgIHBlcmltZXRlclxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBvbkRlbGV0ZUNsaWNrKCkge1xyXG4gICAgdGhpcy5zdG9yZS5kZWxldGVNYW55KHRoaXMuc2VsZWN0ZWRGZWF0dXJlcyQudmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgb25Nb2RpZnlDbGljaygpIHtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkRmVhdHVyZXMkLnZhbHVlLmxlbmd0aCAhPT0gMSkgeyByZXR1cm47IH1cclxuXHJcbiAgICBpZiAodGhpcy5tb2RpZnlDb250cm9sLmFjdGl2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmRlYWN0aXZhdGVNb2RpZnlDb250cm9sKCk7XHJcbiAgICAgIHRoaXMudG9nZ2xlRHJhd0NvbnRyb2woKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGZlYXR1cmUgPSB0aGlzLnNlbGVjdGVkRmVhdHVyZXMkLnZhbHVlWzBdO1xyXG4gICAgICBjb25zdCBvbEZlYXR1cmVzID0gdGhpcy5zdG9yZS5sYXllci5vbC5nZXRTb3VyY2UoKS5nZXRGZWF0dXJlcygpO1xyXG4gICAgICBjb25zdCBvbEZlYXR1cmUgPSBvbEZlYXR1cmVzLmZpbmQoKF9vbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBfb2xGZWF0dXJlLmdldCgnaWQnKSA9PT0gZmVhdHVyZS5wcm9wZXJ0aWVzLmlkO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChvbEZlYXR1cmUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZURyYXdDb250cm9sKCk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmF0ZU1vZGlmeUNvbnRyb2woKTtcclxuXHJcbiAgICAgICAgY29uc3Qgb2xHZW9tZXRyeSA9IG9sRmVhdHVyZS5nZXRHZW9tZXRyeSgpO1xyXG4gICAgICAgIHRoaXMuY2xlYXJUb29sdGlwc09mT2xHZW9tZXRyeShvbEdlb21ldHJ5KTtcclxuICAgICAgICB0aGlzLm1vZGlmeUNvbnRyb2wuc2V0T2xHZW9tZXRyeShvbEdlb21ldHJ5KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvcGVuRGlhbG9nKGRhdGE6IE1lYXN1cmVyRGlhbG9nRGF0YSk6IHZvaWQge1xyXG4gICAgdGhpcy5kaWFsb2cub3BlbihNZWFzdXJlckRpYWxvZ0NvbXBvbmVudCwge2RhdGF9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgdGhlIG1lYXN1cmUgc3RvcmUgYW5kIHNldCB1cCBzb21lIGxpc3RlbmVyc1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgaW5pdFN0b3JlKCkge1xyXG4gICAgY29uc3Qgc3RvcmUgPSB0aGlzLnN0b3JlO1xyXG5cclxuICAgIGNvbnN0IGxheWVyID0gbmV3IFZlY3RvckxheWVyKHtcclxuICAgICAgdGl0bGU6ICdNZWFzdXJlcycsXHJcbiAgICAgIHpJbmRleDogMjAwLFxyXG4gICAgICBzb3VyY2U6IG5ldyBGZWF0dXJlRGF0YVNvdXJjZSgpLFxyXG4gICAgICBzdHlsZTogY3JlYXRlTWVhc3VyZUxheWVyU3R5bGUoKSxcclxuICAgICAgc2hvd0luTGF5ZXJMaXN0OiBmYWxzZSxcclxuICAgICAgZXhwb3J0YWJsZTogZmFsc2UsXHJcbiAgICAgIGJyb3dzYWJsZTogZmFsc2VcclxuICAgIH0pO1xyXG4gICAgdHJ5QmluZFN0b3JlTGF5ZXIoc3RvcmUsIGxheWVyKTtcclxuXHJcbiAgICB0cnlBZGRMb2FkaW5nU3RyYXRlZ3koc3RvcmUpO1xyXG5cclxuICAgIHRyeUFkZFNlbGVjdGlvblN0cmF0ZWd5KHN0b3JlLCBuZXcgRmVhdHVyZVN0b3JlU2VsZWN0aW9uU3RyYXRlZ3koe1xyXG4gICAgICBtYXA6IHRoaXMubWFwLFxyXG4gICAgICBtYW55OiB0cnVlXHJcbiAgICB9KSk7XHJcblxyXG4gICAgdGhpcy5vbkZlYXR1cmVBZGRlZEtleSA9IHN0b3JlLnNvdXJjZS5vbC5vbignYWRkZmVhdHVyZScsIChldmVudDogT2xWZWN0b3JTb3VyY2VFdmVudCkgPT4ge1xyXG4gICAgICBjb25zdCBmZWF0dXJlID0gZXZlbnQuZmVhdHVyZTtcclxuICAgICAgY29uc3Qgb2xHZW9tZXRyeSA9IGZlYXR1cmUuZ2V0R2VvbWV0cnkoKTtcclxuICAgICAgdGhpcy51cGRhdGVNZWFzdXJlT2ZPbEdlb21ldHJ5KG9sR2VvbWV0cnksIGZlYXR1cmUuZ2V0KCdtZWFzdXJlJykpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5vbkZlYXR1cmVSZW1vdmVkS2V5ID0gc3RvcmUuc291cmNlLm9sLm9uKCdyZW1vdmVmZWF0dXJlJywgKGV2ZW50OiBPbFZlY3RvclNvdXJjZUV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IG9sR2VvbWV0cnkgPSBldmVudC5mZWF0dXJlLmdldEdlb21ldHJ5KCk7XHJcbiAgICAgIHRoaXMuY2xlYXJUb29sdGlwc09mT2xHZW9tZXRyeShvbEdlb21ldHJ5KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuc2VsZWN0ZWRGZWF0dXJlcyQkID0gc3RvcmUuc3RhdGVWaWV3Lm1hbnlCeSQoKHJlY29yZDogRW50aXR5UmVjb3JkPEZlYXR1cmVXaXRoTWVhc3VyZT4pID0+IHtcclxuICAgICAgcmV0dXJuIHJlY29yZC5zdGF0ZS5zZWxlY3RlZCA9PT0gdHJ1ZTtcclxuICAgIH0pLnBpcGUoXHJcbiAgICAgIHNraXAoMSkgIC8vIFNraXAgaW5pdGlhbCBlbWlzc2lvblxyXG4gICAgKVxyXG4gICAgLnN1YnNjcmliZSgocmVjb3JkczogRW50aXR5UmVjb3JkPEZlYXR1cmVXaXRoTWVhc3VyZT5bXSkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5tb2RpZnlDb250cm9sLmFjdGl2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZU1vZGlmeUNvbnRyb2woKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNlbGVjdGVkRmVhdHVyZXMkLm5leHQocmVjb3Jkcy5tYXAocmVjb3JkID0+IHJlY29yZC5lbnRpdHkpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRnJlZXplIGFueSBzdG9yZSwgbWVhbmluZyB0aGUgbGF5ZXIgaXMgcmVtb3ZlZCwgc3RyYXRlZ2llcyBhcmUgZGVhY3RpdmF0ZWRcclxuICAgKiBhbmQgc29tZSBsaXN0ZW5lciByZW1vdmVkXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBmcmVlemVTdG9yZSgpIHtcclxuICAgIGNvbnN0IHN0b3JlID0gdGhpcy5zdG9yZTtcclxuICAgIHRoaXMuc2VsZWN0ZWRGZWF0dXJlcyQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB1bkJ5S2V5KHRoaXMub25GZWF0dXJlQWRkZWRLZXkpO1xyXG4gICAgdW5CeUtleSh0aGlzLm9uRmVhdHVyZVJlbW92ZWRLZXkpO1xyXG4gICAgdGhpcy5jbGVhclRvb2x0aXBzT2ZPbFNvdXJjZShzdG9yZS5zb3VyY2Uub2wpO1xyXG4gICAgdGhpcy5tYXAucmVtb3ZlTGF5ZXIoc3RvcmUubGF5ZXIpO1xyXG4gICAgc3RvcmUuZGVhY3RpdmF0ZVN0cmF0ZWd5T2ZUeXBlKEZlYXR1cmVTdG9yZUxvYWRpbmdTdHJhdGVneSk7XHJcbiAgICBzdG9yZS5kZWFjdGl2YXRlU3RyYXRlZ3lPZlR5cGUoRmVhdHVyZVN0b3JlU2VsZWN0aW9uU3RyYXRlZ3kpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgZHJhdyBsaW5lIGNvbnRyb2xcclxuICAgKi9cclxuICBwcml2YXRlIGNyZWF0ZURyYXdMaW5lQ29udHJvbCgpIHtcclxuICAgIHRoaXMuZHJhd0xpbmVDb250cm9sID0gbmV3IERyYXdDb250cm9sKHtcclxuICAgICAgZ2VvbWV0cnlUeXBlOiAnTGluZVN0cmluZycsXHJcbiAgICAgIHNvdXJjZTogdGhpcy5vbERyYXdTb3VyY2UsXHJcbiAgICAgIGRyYXdTdHlsZTogY3JlYXRlTWVhc3VyZUludGVyYWN0aW9uU3R5bGUoKSxcclxuICAgICAgbGF5ZXJTdHlsZTogbmV3IE9sU3R5bGUoe30pXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIGRyYXcgcG9seWdvbiBjb250cm9sXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjcmVhdGVEcmF3UG9seWdvbkNvbnRyb2woKSB7XHJcbiAgICB0aGlzLmRyYXdQb2x5Z29uQ29udHJvbCA9IG5ldyBEcmF3Q29udHJvbCh7XHJcbiAgICAgIGdlb21ldHJ5VHlwZTogJ1BvbHlnb24nLFxyXG4gICAgICBzb3VyY2U6IHRoaXMub2xEcmF3U291cmNlLFxyXG4gICAgICBkcmF3U3R5bGU6IGNyZWF0ZU1lYXN1cmVJbnRlcmFjdGlvblN0eWxlKCksXHJcbiAgICAgIGxheWVyU3R5bGU6IG5ldyBPbFN0eWxlKHt9KVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYSBkcmF3IHBvbHlnb24gY29udHJvbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgY3JlYXRlTW9kaWZ5Q29udHJvbCgpIHtcclxuICAgIHRoaXMubW9kaWZ5Q29udHJvbCA9IG5ldyBNb2RpZnlDb250cm9sKHtcclxuICAgICAgc291cmNlOiB0aGlzLm9sRHJhd1NvdXJjZSxcclxuICAgICAgZHJhd1N0eWxlOiBjcmVhdGVNZWFzdXJlSW50ZXJhY3Rpb25TdHlsZSgpLFxyXG4gICAgICBsYXllclN0eWxlOiBuZXcgT2xTdHlsZSh7fSlcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWN0aXZhdGUgdGhlIHJpZ2h0IGNvbnRyb2xcclxuICAgKi9cclxuICBwcml2YXRlIHRvZ2dsZURyYXdDb250cm9sKCkge1xyXG4gICAgdGhpcy5kZWFjdGl2YXRlRHJhd0NvbnRyb2woKTtcclxuICAgIC8vIHRoaXMuZGVhY3RpdmF0ZU1vZGlmeUNvbnRyb2woKTtcclxuICAgIGlmICh0aGlzLmFjdGl2ZU1lYXN1cmVUeXBlID09PSBNZWFzdXJlVHlwZS5MZW5ndGgpIHtcclxuICAgICAgdGhpcy5hY3RpdmF0ZURyYXdDb250cm9sKHRoaXMuZHJhd0xpbmVDb250cm9sKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5hY3RpdmVNZWFzdXJlVHlwZSA9PT0gTWVhc3VyZVR5cGUuQXJlYSkge1xyXG4gICAgICB0aGlzLmFjdGl2YXRlRHJhd0NvbnRyb2wodGhpcy5kcmF3UG9seWdvbkNvbnRyb2wpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWN0aXZhdGUgYSBnaXZlbiBjb250cm9sXHJcbiAgICogQHBhcmFtIGRyYXdDb250cm9sIERyYXcgY29udHJvbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWN0aXZhdGVEcmF3Q29udHJvbChkcmF3Q29udHJvbDogRHJhd0NvbnRyb2wpIHtcclxuICAgIHRoaXMuYWN0aXZlRHJhd0NvbnRyb2wgPSBkcmF3Q29udHJvbDtcclxuICAgIHRoaXMuZHJhd1N0YXJ0JCQgPSBkcmF3Q29udHJvbC5zdGFydCRcclxuICAgICAgLnN1YnNjcmliZSgob2xHZW9tZXRyeTogT2xMaW5lU3RyaW5nIHwgT2xQb2x5Z29uKSA9PiB0aGlzLm9uRHJhd1N0YXJ0KG9sR2VvbWV0cnkpKTtcclxuICAgIHRoaXMuZHJhd0VuZCQkID0gZHJhd0NvbnRyb2wuZW5kJFxyXG4gICAgICAuc3Vic2NyaWJlKChvbEdlb21ldHJ5OiBPbExpbmVTdHJpbmcgfCBPbFBvbHlnb24pID0+IHRoaXMub25EcmF3RW5kKG9sR2VvbWV0cnkpKTtcclxuICAgIHRoaXMuZHJhd0NoYW5nZXMkJCA9IGRyYXdDb250cm9sLmNoYW5nZXMkXHJcbiAgICAgIC5zdWJzY3JpYmUoKG9sR2VvbWV0cnk6IE9sTGluZVN0cmluZyB8IE9sUG9seWdvbikgPT4gdGhpcy5vbkRyYXdDaGFuZ2VzKG9sR2VvbWV0cnkpKTtcclxuXHJcbiAgICBkcmF3Q29udHJvbC5zZXRPbE1hcCh0aGlzLm1hcC5vbCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWFjdGl2YXRlIHRoZSBhY3RpdmUgZHJhdyBjb250cm9sXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkZWFjdGl2YXRlRHJhd0NvbnRyb2woKSB7XHJcbiAgICBpZiAodGhpcy5hY3RpdmVEcmF3Q29udHJvbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9sRHJhd1NvdXJjZS5jbGVhcigpO1xyXG4gICAgaWYgKHRoaXMuZHJhd1N0YXJ0JCQgIT09IHVuZGVmaW5lZCApIHsgdGhpcy5kcmF3U3RhcnQkJC51bnN1YnNjcmliZSgpOyB9XHJcbiAgICBpZiAodGhpcy5kcmF3RW5kJCQgIT09IHVuZGVmaW5lZCApIHsgdGhpcy5kcmF3RW5kJCQudW5zdWJzY3JpYmUoKTsgfVxyXG4gICAgaWYgKHRoaXMuZHJhd0NoYW5nZXMkJCAhPT0gdW5kZWZpbmVkICkgeyB0aGlzLmRyYXdDaGFuZ2VzJCQudW5zdWJzY3JpYmUoKTsgfVxyXG5cclxuICAgIHRoaXMuY2xlYXJUb29sdGlwc09mT2xTb3VyY2UodGhpcy5vbERyYXdTb3VyY2UpO1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlT2xHZW9tZXRyeSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuY2xlYXJUb29sdGlwc09mT2xHZW9tZXRyeSh0aGlzLmFjdGl2ZU9sR2VvbWV0cnkpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hY3RpdmVEcmF3Q29udHJvbC5zZXRPbE1hcCh1bmRlZmluZWQpO1xyXG4gICAgdGhpcy5hY3RpdmVEcmF3Q29udHJvbCA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuYWN0aXZlT2xHZW9tZXRyeSA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0QWN0aXZlTWVhc3VyZVR5cGUobWVhc3VyZVR5cGU6IE1lYXN1cmVUeXBlKSB7XHJcbiAgICB0aGlzLl9hY3RpdmVNZWFzdXJlVHlwZSA9IG1lYXN1cmVUeXBlO1xyXG4gICAgdGhpcy5jbGVhck1lYXN1cmVzKCk7XHJcbiAgICB0aGlzLnRvZ2dsZURyYXdDb250cm9sKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgZHJhdyBzb3VyY2UgYW5kIHRyYWNrIHRoZSBnZW9tZXRyeSBiZWluZyBkcmF3blxyXG4gICAqIEBwYXJhbSBvbEdlb21ldHJ5IE9sIGxpbmVzdHJpbmcgb3IgcG9seWdvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25EcmF3U3RhcnQob2xHZW9tZXRyeTogT2xMaW5lU3RyaW5nIHwgT2xQb2x5Z29uKSB7XHJcbiAgICB0aGlzLmFjdGl2ZU9sR2VvbWV0cnkgPSBvbEdlb21ldHJ5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhlIGRyYXcgc291cmNlIGFuZCB0cmFjayB0aGUgZ2VvbWV0cnkgYmVpbmcgZHJhd1xyXG4gICAqIEBwYXJhbSBvbEdlb21ldHJ5IE9sIGxpbmVzdHJpbmcgb3IgcG9seWdvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25EcmF3RW5kKG9sR2VvbWV0cnk6IE9sTGluZVN0cmluZyB8IE9sUG9seWdvbikge1xyXG4gICAgdGhpcy5hY3RpdmVPbEdlb21ldHJ5ID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5maW5hbGl6ZU1lYXN1cmVPZk9sR2VvbWV0cnkob2xHZW9tZXRyeSk7XHJcbiAgICB0aGlzLmFkZEZlYXR1cmVUb1N0b3JlKG9sR2VvbWV0cnkpO1xyXG4gICAgdGhpcy5jbGVhclRvb2x0aXBzT2ZPbEdlb21ldHJ5KG9sR2VvbWV0cnkpO1xyXG4gICAgdGhpcy5vbERyYXdTb3VyY2UuY2xlYXIodHJ1ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgbWVhc3VyZXMgb2JzZXJ2YWJsZXMgYW5kIG1hcCB0b29sdGlwc1xyXG4gICAqIEBwYXJhbSBvbEdlb21ldHJ5IE9sIGxpbmVzdHJpbmcgb3IgcG9seWdvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25EcmF3Q2hhbmdlcyhvbEdlb21ldHJ5OiBPbExpbmVTdHJpbmcgfCBPbFBvbHlnb24pIHtcclxuICAgIGNvbnN0IG1lYXN1cmUgPSBtZWFzdXJlT2xHZW9tZXRyeShvbEdlb21ldHJ5LCB0aGlzLnByb2plY3Rpb24pO1xyXG4gICAgdGhpcy51cGRhdGVNZWFzdXJlT2ZPbEdlb21ldHJ5KG9sR2VvbWV0cnksIE9iamVjdC5hc3NpZ24oe30sIG1lYXN1cmUsIHtcclxuICAgICAgYXJlYTogdW5kZWZpbmVkICAvLyBXZSBkb24ndCB3YW50IHRvIGRpc3BsYXkgYW4gYXJlYSB0b29sdGlwIHdoaWxlIGRyYXdpbmcuXHJcbiAgICB9KSk7XHJcbiAgICB0aGlzLm1lYXN1cmUkLm5leHQobWVhc3VyZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBY3RpdmF0ZSBhIGdpdmVuIGNvbnRyb2xcclxuICAgKiBAcGFyYW0gbW9kaWZ5Q29udHJvbCBNb2RpZnkgY29udHJvbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWN0aXZhdGVNb2RpZnlDb250cm9sKCkge1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5zdG9yZS5nZXRTdHJhdGVneU9mVHlwZShGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneSkgYXMgRmVhdHVyZVN0b3JlU2VsZWN0aW9uU3RyYXRlZ3k7XHJcbiAgICBzZWxlY3Rpb24uZGVhY3RpdmF0ZSgpO1xyXG4gICAgc2VsZWN0aW9uLmNsZWFyKCk7XHJcblxyXG4gICAgdGhpcy5tb2RpZnlTdGFydCQkID0gdGhpcy5tb2RpZnlDb250cm9sLnN0YXJ0JFxyXG4gICAgICAuc3Vic2NyaWJlKChvbEdlb21ldHJ5OiBPbExpbmVTdHJpbmcgfCBPbFBvbHlnb24pID0+IHRoaXMub25Nb2RpZnlTdGFydChvbEdlb21ldHJ5KSk7XHJcbiAgICB0aGlzLm1vZGlmeUVuZCQkID0gdGhpcy5tb2RpZnlDb250cm9sLmVuZCRcclxuICAgICAgLnN1YnNjcmliZSgob2xHZW9tZXRyeTogT2xMaW5lU3RyaW5nIHwgT2xQb2x5Z29uKSA9PiB0aGlzLm9uTW9kaWZ5RW5kKG9sR2VvbWV0cnkpKTtcclxuICAgIHRoaXMubW9kaWZ5Q2hhbmdlcyQkID0gdGhpcy5tb2RpZnlDb250cm9sLmNoYW5nZXMkXHJcbiAgICAgIC5zdWJzY3JpYmUoKG9sR2VvbWV0cnk6IE9sTGluZVN0cmluZyB8IE9sUG9seWdvbikgPT4gdGhpcy5vbk1vZGlmeUNoYW5nZXMob2xHZW9tZXRyeSkpO1xyXG4gICAgdGhpcy5tb2RpZnlDb250cm9sLnNldE9sTWFwKHRoaXMubWFwLm9sKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlYWN0aXZhdGUgdGhlIGFjdGl2ZSBtb2RpZnkgY29udHJvbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZGVhY3RpdmF0ZU1vZGlmeUNvbnRyb2woKSB7XHJcbiAgICBpZiAodGhpcy5tb2RpZnlTdGFydCQkICE9PSB1bmRlZmluZWQgKSB7IHRoaXMubW9kaWZ5U3RhcnQkJC51bnN1YnNjcmliZSgpOyB9XHJcbiAgICBpZiAodGhpcy5tb2RpZnlFbmQkJCAhPT0gdW5kZWZpbmVkICkgeyB0aGlzLm1vZGlmeUVuZCQkLnVuc3Vic2NyaWJlKCk7IH1cclxuICAgIGlmICh0aGlzLm1vZGlmeUNoYW5nZXMkJCAhPT0gdW5kZWZpbmVkICkgeyB0aGlzLm1vZGlmeUNoYW5nZXMkJC51bnN1YnNjcmliZSgpOyB9XHJcblxyXG4gICAgaWYgKHRoaXMuYWN0aXZlT2xHZW9tZXRyeSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkRmVhdHVyZXMkLnZhbHVlLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIGNvbnN0IGZlYXR1cmUgPSB0aGlzLnNlbGVjdGVkRmVhdHVyZXMkLnZhbHVlWzBdO1xyXG4gICAgICAgIHRoaXMuYWRkRmVhdHVyZVRvU3RvcmUodGhpcy5hY3RpdmVPbEdlb21ldHJ5LCBmZWF0dXJlKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmZpbmFsaXplTWVhc3VyZU9mT2xHZW9tZXRyeSh0aGlzLmFjdGl2ZU9sR2VvbWV0cnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub2xEcmF3U291cmNlLmNsZWFyKCk7XHJcblxyXG4gICAgdGhpcy5zdG9yZS5hY3RpdmF0ZVN0cmF0ZWd5T2ZUeXBlKEZlYXR1cmVTdG9yZVNlbGVjdGlvblN0cmF0ZWd5KTtcclxuXHJcbiAgICB0aGlzLmFjdGl2ZU9sR2VvbWV0cnkgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLm1vZGlmeUNvbnRyb2wuc2V0T2xNYXAodW5kZWZpbmVkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBkcmF3IHNvdXJjZSBhbmQgdHJhY2sgdGhlIGdlb21ldHJ5IGJlaW5nIGRyYXduXHJcbiAgICogQHBhcmFtIG9sR2VvbWV0cnkgT2wgbGluZXN0cmluZyBvciBwb2x5Z29uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbk1vZGlmeVN0YXJ0KG9sR2VvbWV0cnk6IE9sTGluZVN0cmluZyB8IE9sUG9seWdvbikge1xyXG4gICAgdGhpcy5vbkRyYXdTdGFydChvbEdlb21ldHJ5KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSBtZWFzdXJlcyBvYnNlcnZhYmxlcyBhbmQgbWFwIHRvb2x0aXBzXHJcbiAgICogQHBhcmFtIG9sR2VvbWV0cnkgT2wgbGluZXN0cmluZyBvciBwb2x5Z29uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbk1vZGlmeUNoYW5nZXMob2xHZW9tZXRyeTogT2xMaW5lU3RyaW5nIHwgT2xQb2x5Z29uKSB7XHJcbiAgICB0aGlzLm9uRHJhd0NoYW5nZXMob2xHZW9tZXRyeSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgZHJhdyBzb3VyY2UgYW5kIHRyYWNrIHRoZSBnZW9tZXRyeSBiZWluZyBkcmF3XHJcbiAgICogQHBhcmFtIG9sR2VvbWV0cnkgT2wgbGluZXN0cmluZyBvciBwb2x5Z29uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbk1vZGlmeUVuZChvbEdlb21ldHJ5OiBPbExpbmVTdHJpbmcgfCBPbFBvbHlnb24pIHtcclxuICAgIHRoaXMuZmluYWxpemVNZWFzdXJlT2ZPbEdlb21ldHJ5KG9sR2VvbWV0cnkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmaW5hbGl6ZU1lYXN1cmVPZk9sR2VvbWV0cnkob2xHZW9tZXRyeTogT2xMaW5lU3RyaW5nIHwgT2xQb2x5Z29uKSB7XHJcbiAgICBsZXQgbWVhc3VyZSA9IG1lYXN1cmVPbEdlb21ldHJ5KG9sR2VvbWV0cnksIHRoaXMucHJvamVjdGlvbik7XHJcbiAgICBpZiAob2xHZW9tZXRyeSBpbnN0YW5jZW9mIE9sUG9seWdvbikge1xyXG4gICAgICBtZWFzdXJlID0gT2JqZWN0LmFzc2lnbih7fSwgbWVhc3VyZSwge1xyXG4gICAgICAgIGxlbmd0aHM6IFtdICAvLyBXZSBkb24ndCB3YW50IHRvIGRpc3BsYXkgYW4gYXJlYSB0b29sdGlwIHdoaWxlIGRyYXdpbmcuXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy51cGRhdGVNZWFzdXJlT2ZPbEdlb21ldHJ5KG9sR2VvbWV0cnksIG1lYXN1cmUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIG1lYXN1cmVzIG9ic2VydmFibGVzXHJcbiAgICogQHBhcmFtIG9sR2VvbWV0cnkgT2wgbGluZXN0cmluZyBvciBwb2x5Z29uXHJcbiAgICogQHBhcmFtIG1lYXN1cmUgTWVhc3VyZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgdXBkYXRlTWVhc3VyZU9mT2xHZW9tZXRyeShvbEdlb21ldHJ5OiBPbExpbmVTdHJpbmcgfCBPbFBvbHlnb24sIG1lYXN1cmU6IE1lYXN1cmUpIHtcclxuICAgIG9sR2VvbWV0cnkuc2V0UHJvcGVydGllcyh7X21lYXN1cmU6IG1lYXN1cmV9LCB0cnVlKTtcclxuICAgIHRoaXMudXBkYXRlVG9vbHRpcHNPZk9sR2VvbWV0cnkob2xHZW9tZXRyeSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgbWVhc3VyZXMgb2JzZXJ2YWJsZXNcclxuICAgKi9cclxuICBwcml2YXRlIGNsZWFyTWVhc3VyZXMoKSB7XHJcbiAgICB0aGlzLm1lYXN1cmUkLm5leHQoe30pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGEgZmVhdHVyZSB3aXRoIG1lYXN1cmVzIHRvIHRoZSBzdG9yZS4gVGhlIGxvYWRpbmcgc3RyYWdlZ3kgb2YgdGhlIHN0b3JlXHJcbiAgICogd2lsbCB0cmlnZ2VyIGFuZCBhZGQgdGhlIGZlYXR1cmUgdG8gdGhlIG1hcC5cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcml2YXRlIGFkZEZlYXR1cmVUb1N0b3JlKG9sR2VvbWV0cnk6IE9sTGluZVN0cmluZyB8IE9sUG9seWdvbiwgZmVhdHVyZT86IEZlYXR1cmVXaXRoTWVhc3VyZSkge1xyXG4gICAgY29uc3QgZmVhdHVyZUlkID0gZmVhdHVyZSA/IGZlYXR1cmUucHJvcGVydGllcy5pZCA6IHV1aWQoKTtcclxuICAgIGNvbnN0IHByb2plY3Rpb24gPSB0aGlzLm1hcC5vbC5nZXRWaWV3KCkuZ2V0UHJvamVjdGlvbigpO1xyXG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgT2xHZW9KU09OKCkud3JpdGVHZW9tZXRyeU9iamVjdChvbEdlb21ldHJ5LCB7XHJcbiAgICAgIGZlYXR1cmVQcm9qZWN0aW9uOiBwcm9qZWN0aW9uLFxyXG4gICAgICBkYXRhUHJvamVjdGlvbjogcHJvamVjdGlvblxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnN0b3JlLnVwZGF0ZSh7XHJcbiAgICAgIHR5cGU6IEZFQVRVUkUsXHJcbiAgICAgIGdlb21ldHJ5LFxyXG4gICAgICBwcm9qZWN0aW9uOiBwcm9qZWN0aW9uLmdldENvZGUoKSxcclxuICAgICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGlkOiBmZWF0dXJlSWQsXHJcbiAgICAgICAgbWVhc3VyZTogb2xHZW9tZXRyeS5nZXQoJ19tZWFzdXJlJylcclxuICAgICAgfSxcclxuICAgICAgbWV0YToge1xyXG4gICAgICAgIGlkOiBmZWF0dXJlSWRcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgYWxsIHRoZSB0b29sdGlwcyBvZiBhbiBPTCBnZW9tZXRyeVxyXG4gICAqIEBwYXJhbSBvbEdlb21ldHJ5IE9MIEdlb21ldHJ5XHJcbiAgICogQHBhcmFtIGxlbmd0aHMgTGVuZ3RocyBvZiB0aGUgT0wgZ2VvbWV0cnkncyBzZWdtZW50c1xyXG4gICAqIEBwYXJhbSBtZWFzdXJlVW5pdCBEaXNwbGF5IHRvb2x0aXAgbWVhc3VyZSBpbiB0aG9zZSB1bml0c1xyXG4gICAqL1xyXG4gIHByaXZhdGUgdXBkYXRlVG9vbHRpcHNPZk9sR2VvbWV0cnkob2xHZW9tZXRyeTogT2xMaW5lU3RyaW5nIHwgT2xQb2x5Z29uKSB7XHJcbiAgICBjb25zdCBtZWFzdXJlID0gb2xHZW9tZXRyeS5nZXQoJ19tZWFzdXJlJyk7XHJcbiAgICBjb25zdCBsZW5ndGhzID0gbWVhc3VyZS5sZW5ndGhzO1xyXG4gICAgY29uc3QgYXJlYSA9IG1lYXN1cmUuYXJlYTtcclxuXHJcbiAgICBjb25zdCBvbE1pZHBvaW50c1Rvb2x0aXBzID0gdXBkYXRlT2xUb29sdGlwc0F0TWlkcG9pbnRzKG9sR2VvbWV0cnkpO1xyXG4gICAgaWYgKGxlbmd0aHMubGVuZ3RoID09PSBvbE1pZHBvaW50c1Rvb2x0aXBzLmxlbmd0aCkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9sTWlkcG9pbnRzVG9vbHRpcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBsZW5ndGggPSBsZW5ndGhzW2ldO1xyXG4gICAgICAgIGlmIChsZW5ndGggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVPbFRvb2x0aXAoXHJcbiAgICAgICAgICAgIG9sTWlkcG9pbnRzVG9vbHRpcHNbaV0sXHJcbiAgICAgICAgICAgIG1ldGVyc1RvVW5pdChsZW5ndGgsIHRoaXMuYWN0aXZlTGVuZ3RoVW5pdCksXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlTGVuZ3RoVW5pdCxcclxuICAgICAgICAgICAgTWVhc3VyZVR5cGUuTGVuZ3RoXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChhcmVhICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy51cGRhdGVPbFRvb2x0aXAoXHJcbiAgICAgICAgdXBkYXRlT2xUb29sdGlwQXRDZW50ZXIob2xHZW9tZXRyeSksXHJcbiAgICAgICAgc3F1YXJlTWV0ZXJzVG9Vbml0KGFyZWEsICB0aGlzLmFjdGl2ZUFyZWFVbml0KSxcclxuICAgICAgICB0aGlzLmFjdGl2ZUFyZWFVbml0LFxyXG4gICAgICAgIE1lYXN1cmVUeXBlLkFyZWFcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3cgdGhlIG1hcCB0b29sdGlwcyBvZiBhIGdlb2VtdHJ5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzaG93VG9vbHRpcHNPZk9sR2VvbWV0cnkob2xHZW9tZXRyeTogT2xMaW5lU3RyaW5nIHwgT2xQb2x5Z29uKSB7XHJcbiAgICBnZXRUb29sdGlwc09mT2xHZW9tZXRyeShvbEdlb21ldHJ5KS5mb3JFYWNoKChvbFRvb2x0aXA6IE9sT3ZlcmxheSB8IHVuZGVmaW5lZCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5zaG91bGRTaG93VG9vbHRpcChvbFRvb2x0aXApKSB7XHJcbiAgICAgICAgdGhpcy5tYXAub2wuYWRkT3ZlcmxheShvbFRvb2x0aXApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSB0b29sdGlwcyBvZiBhbiBPTCBnZW9tZXRyeXNcclxuICAgKiBAcGFyYW0gb2xHZW9tZXRyeSBPTCBnZW9tZXRyeSB3aXRoIHRvb2x0aXBzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjbGVhclRvb2x0aXBzT2ZPbEdlb21ldHJ5KG9sR2VvbWV0cnk6IE9sTGluZVN0cmluZyB8IE9sUG9seWdvbikge1xyXG4gICAgZ2V0VG9vbHRpcHNPZk9sR2VvbWV0cnkob2xHZW9tZXRyeSkuZm9yRWFjaCgob2xUb29sdGlwOiBPbE92ZXJsYXkgfCB1bmRlZmluZWQpID0+IHtcclxuICAgICAgaWYgKG9sVG9vbHRpcCAhPT0gdW5kZWZpbmVkICYmIG9sVG9vbHRpcC5nZXRNYXAoKSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5tYXAub2wucmVtb3ZlT3ZlcmxheShvbFRvb2x0aXApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3cgdGhlIG1hcCB0b29sdGlwcyBvZiBhbGwgdGhlIGdlb21ldHJpZXMgb2YgYSBzb3VyY2VcclxuICAgKi9cclxuICBwcml2YXRlIHVwZGF0ZVRvb2x0aXBzT2ZPbFNvdXJjZShvbFNvdXJjZTogT2xWZWN0b3JTb3VyY2UpIHtcclxuICAgIG9sU291cmNlLmZvckVhY2hGZWF0dXJlKChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVRvb2x0aXBzT2ZPbEdlb21ldHJ5KG9sRmVhdHVyZS5nZXRHZW9tZXRyeSgpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2hvdyB0aGUgbWFwIHRvb2x0aXBzIG9mIGFsbCB0aGUgZ2VvbWV0cmllcyBvZiBhIHNvdXJjZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2hvd1Rvb2x0aXBzT2ZPbFNvdXJjZShvbFNvdXJjZTogT2xWZWN0b3JTb3VyY2UpIHtcclxuICAgIG9sU291cmNlLmZvckVhY2hGZWF0dXJlKChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4ge1xyXG4gICAgICB0aGlzLnNob3dUb29sdGlwc09mT2xHZW9tZXRyeShvbEZlYXR1cmUuZ2V0R2VvbWV0cnkoKSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBtYXAgdG9vbHRpcHNcclxuICAgKiBAcGFyYW0gb2xEcmF3U291cmNlIE9MIHZlY3RvciBzb3VyY2VcclxuICAgKi9cclxuICBwcml2YXRlIGNsZWFyVG9vbHRpcHNPZk9sU291cmNlKG9sU291cmNlOiBPbFZlY3RvclNvdXJjZSkge1xyXG4gICAgb2xTb3VyY2UuZm9yRWFjaEZlYXR1cmUoKG9sRmVhdHVyZTogT2xGZWF0dXJlKSA9PiB7XHJcbiAgICAgIGNvbnN0IG9sR2VvbWV0cnkgPSBvbEZlYXR1cmUuZ2V0R2VvbWV0cnkoKTtcclxuICAgICAgaWYgKG9sR2VvbWV0cnkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuY2xlYXJUb29sdGlwc09mT2xHZW9tZXRyeShvbEZlYXR1cmUuZ2V0R2VvbWV0cnkoKSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIGFuIE9MIHRvb2x0aXAgcHJvcGVydGllcyBhbmQgaW5uZXIgSFRNTCBhbmQgYWRkIGl0IHRvIHRoZSBtYXAgaWYgcG9zc2libGVcclxuICAgKiBAcGFyYW0gb2xUb29sdGlwIE9MIHRvb2x0aXBcclxuICAgKiBAcGFyYW0gbWVhc3VyZSBUaGUgbWVhc3VyZSB2YWxldSB0aSBkaXNwbGF5XHJcbiAgICogQHBhcmFtIG1lYXN1cmVVbml0IERpc3BsYXkgdG9vbHRpcCBtZWFzdXJlIGluIHRob3NlIHVuaXRzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1cGRhdGVPbFRvb2x0aXAoXHJcbiAgICBvbFRvb2x0aXA6IE9sT3ZlcmxheSxcclxuICAgIG1lYXN1cmU6IG51bWJlcixcclxuICAgIHVuaXQ6IE1lYXN1cmVBcmVhVW5pdCB8IE1lYXN1cmVMZW5ndGhVbml0LFxyXG4gICAgdHlwZTogTWVhc3VyZVR5cGVcclxuICApIHtcclxuICAgIG9sVG9vbHRpcC5zZXRQcm9wZXJ0aWVzKHtfbWVhc3VyZTogbWVhc3VyZSwgX3VuaXQ6IHVuaXQsIF90eXBlOiB0eXBlfSwgdHJ1ZSk7XHJcbiAgICBvbFRvb2x0aXAuZ2V0RWxlbWVudCgpLmlubmVySFRNTCA9IHRoaXMuY29tcHV0ZVRvb2x0aXBJbm5lckhUTUwob2xUb29sdGlwKTtcclxuICAgIGlmICh0aGlzLnNob3VsZFNob3dUb29sdGlwKG9sVG9vbHRpcCkpIHtcclxuICAgICAgdGhpcy5tYXAub2wuYWRkT3ZlcmxheShvbFRvb2x0aXApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29tcHV0ZSBhIHRvb2x0aXAncyBjb250ZW50XHJcbiAgICogQHBhcmFtIG9sVG9vbHRpcCBPTCBvdmVybGF5XHJcbiAgICogQHJldHVybnMgSW5uZXIgSFRNTFxyXG4gICAqL1xyXG4gIHByaXZhdGUgY29tcHV0ZVRvb2x0aXBJbm5lckhUTUwob2xUb29sdGlwOiBPbE92ZXJsYXkpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgcHJvcGVydGllcyA9IG9sVG9vbHRpcC5nZXRQcm9wZXJ0aWVzKCkgYXMgYW55O1xyXG4gICAgcmV0dXJuIGZvcm1hdE1lYXN1cmUocHJvcGVydGllcy5fbWVhc3VyZSwge1xyXG4gICAgICBkZWNpbWFsOiAxLFxyXG4gICAgICB1bml0OiBwcm9wZXJ0aWVzLl91bml0LFxyXG4gICAgICB1bml0QWJicjogdHJ1ZSxcclxuICAgICAgbG9jYWxlOiAnZnInXHJcbiAgICB9LCB0aGlzLmxhbmd1YWdlU2VydmljZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGEgdG9vbHRpcCBzaG91bGQgYmUgc2hvd25lZCBiYXNlZCBvbiB0aGUgbGVuZ3RoXHJcbiAgICogb2YgdGhlIHNlZ21lbnQgaXQgaXMgYm91bmQgdG8uXHJcbiAgICogQHBhcmFtIG9sVG9vbHRpcCBPTCBvdmVybGF5XHJcbiAgICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdG9vbHRpcCBzaG91bGQgYmUgc2hvd25cclxuICAgKi9cclxuICBwcml2YXRlIHNob3VsZFNob3dUb29sdGlwKG9sVG9vbHRpcDogT2xPdmVybGF5KTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5zaG93VG9vbHRpcHMgPT09IGZhbHNlKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gb2xUb29sdGlwLmdldFByb3BlcnRpZXMoKSBhcyBhbnk7XHJcbiAgICBjb25zdCBtZWFzdXJlID0gcHJvcGVydGllcy5fbWVhc3VyZTtcclxuICAgIGlmIChtZWFzdXJlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwcm9wZXJ0aWVzLl91bml0ID09PSBNZWFzdXJlVHlwZS5MZW5ndGgpIHtcclxuICAgICAgY29uc3QgbWluU2VnbWVudExlbmd0aCA9IG1ldGVyc1RvVW5pdCh0aGlzLm1pblNlZ21lbnRMZW5ndGgsIHByb3BlcnRpZXMuX3VuaXQpIHx8IDA7XHJcbiAgICAgIHJldHVybiBtZWFzdXJlID4gTWF0aC5tYXgobWluU2VnbWVudExlbmd0aCwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59XHJcbiJdfQ==