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
export class MeasurerComponent {
    /**
     * @param {?} languageService
     * @param {?} dialog
     */
    constructor(languageService, dialog) {
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
                    (feature) => {
                        /** @type {?} */
                        const unit = this.activeLengthUnit;
                        /** @type {?} */
                        const measure = metersToUnit(feature.properties.measure.length, unit);
                        return formatMeasure(measure, {
                            decimal: 1,
                            unit,
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
                    (feature) => {
                        /** @type {?} */
                        const unit = this.activeAreaUnit;
                        /** @type {?} */
                        const measure = squareMetersToUnit(feature.properties.measure.area, unit);
                        return measure ? formatMeasure(measure, {
                            decimal: 1,
                            unit,
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
    /**
     * Measure type
     * \@internal
     * @param {?} value
     * @return {?}
     */
    set activeMeasureType(value) { this.setActiveMeasureType(value); }
    /**
     * @return {?}
     */
    get activeMeasureType() { return this._activeMeasureType; }
    /**
     * Wheter one of the draw control is active
     * \@internal
     * @return {?}
     */
    get drawControlIsActive() {
        return this.activeDrawControl !== undefined;
    }
    /**
     * @return {?}
     */
    get projection() {
        return this.map.ol.getView().getProjection();
    }
    /**
     * Add draw controls and activate one
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        this.initStore();
        this.createDrawLineControl();
        this.createDrawPolygonControl();
        this.createModifyControl();
        this.toggleDrawControl();
        this.onToggleTooltips(this.showTooltips);
        this.updateTooltipsOfOlSource(this.store.source.ol);
    }
    /**
     * Clear the overlay layer and any interaction added by this component.
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        this.setActiveMeasureType(undefined);
        this.deactivateModifyControl();
        this.freezeStore();
    }
    /**
     * Set the measure type
     * \@internal
     * @param {?} measureType
     * @return {?}
     */
    onMeasureTypeChange(measureType) {
        this.activeMeasureType = measureType;
    }
    /**
     * Activate or deactivate the current draw control
     * \@internal
     * @param {?} toggle
     * @return {?}
     */
    onToggleDrawControl(toggle) {
        if (toggle === true) {
            this.toggleDrawControl();
        }
        else {
            this.deactivateDrawControl();
        }
    }
    /**
     * Activate or deactivate the current draw control
     * \@internal
     * @param {?} toggle
     * @return {?}
     */
    onToggleTooltips(toggle) {
        this.showTooltips = toggle;
        if (toggle === true) {
            this.showTooltipsOfOlSource(this.store.source.ol);
        }
        else {
            this.clearTooltipsOfOlSource(this.store.source.ol);
        }
    }
    /**
     * Activate or deactivate the current draw control
     * \@internal
     * @param {?} toggle
     * @return {?}
     */
    onToggleMeasureUnitsAuto(toggle) {
        this.measureUnitsAuto = toggle;
    }
    /**
     * Set the measure type
     * \@internal
     * @param {?} unit
     * @return {?}
     */
    onLengthUnitChange(unit) {
        this.activeLengthUnit = unit;
        this.table.refresh();
        this.updateTooltipsOfOlSource(this.store.source.ol);
        if (this.activeOlGeometry !== undefined) {
            this.updateTooltipsOfOlGeometry(this.activeOlGeometry);
        }
    }
    /**
     * Set the measure type
     * \@internal
     * @param {?} unit
     * @return {?}
     */
    onAreaUnitChange(unit) {
        this.activeAreaUnit = unit;
        this.table.refresh();
        this.updateTooltipsOfOlSource(this.store.source.ol);
        if (this.activeOlGeometry !== undefined) {
            this.updateTooltipsOfOlGeometry(this.activeOlGeometry);
        }
    }
    /**
     * @return {?}
     */
    onCalculateClick() {
        /** @type {?} */
        const features = this.selectedFeatures$.value;
        /** @type {?} */
        const area = features.reduce((/**
         * @param {?} sum
         * @param {?} feature
         * @return {?}
         */
        (sum, feature) => {
            return sum + feature.properties.measure.area || 0;
        }), 0);
        /** @type {?} */
        const length = features.reduce((/**
         * @param {?} sum
         * @param {?} feature
         * @return {?}
         */
        (sum, feature) => {
            if (feature.geometry.type === 'Polygon') {
                return sum;
            }
            return sum + feature.properties.measure.length || 0;
        }), 0);
        /** @type {?} */
        const perimeter = features.reduce((/**
         * @param {?} sum
         * @param {?} feature
         * @return {?}
         */
        (sum, feature) => {
            if (feature.geometry.type === 'LineString') {
                return sum;
            }
            return sum + feature.properties.measure.length || 0;
        }), 0);
        this.openDialog({
            area,
            length,
            perimeter
        });
    }
    /**
     * @return {?}
     */
    onDeleteClick() {
        this.store.deleteMany(this.selectedFeatures$.value);
    }
    /**
     * @return {?}
     */
    onModifyClick() {
        if (this.selectedFeatures$.value.length !== 1) {
            return;
        }
        if (this.modifyControl.active === true) {
            this.deactivateModifyControl();
            this.toggleDrawControl();
        }
        else {
            /** @type {?} */
            const feature = this.selectedFeatures$.value[0];
            /** @type {?} */
            const olFeatures = this.store.layer.ol.getSource().getFeatures();
            /** @type {?} */
            const olFeature = olFeatures.find((/**
             * @param {?} _olFeature
             * @return {?}
             */
            (_olFeature) => {
                return _olFeature.get('id') === feature.properties.id;
            }));
            if (olFeature !== undefined) {
                this.deactivateDrawControl();
                this.activateModifyControl();
                /** @type {?} */
                const olGeometry = olFeature.getGeometry();
                this.clearTooltipsOfOlGeometry(olGeometry);
                this.modifyControl.setOlGeometry(olGeometry);
            }
        }
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    openDialog(data) {
        this.dialog.open(MeasurerDialogComponent, { data });
    }
    /**
     * Initialize the measure store and set up some listeners
     * \@internal
     * @private
     * @return {?}
     */
    initStore() {
        /** @type {?} */
        const store = this.store;
        /** @type {?} */
        const layer = new VectorLayer({
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
        (event) => {
            /** @type {?} */
            const feature = event.feature;
            /** @type {?} */
            const olGeometry = feature.getGeometry();
            this.updateMeasureOfOlGeometry(olGeometry, feature.get('measure'));
        }));
        this.onFeatureRemovedKey = store.source.ol.on('removefeature', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** @type {?} */
            const olGeometry = event.feature.getGeometry();
            this.clearTooltipsOfOlGeometry(olGeometry);
        }));
        this.selectedFeatures$$ = store.stateView.manyBy$((/**
         * @param {?} record
         * @return {?}
         */
        (record) => {
            return record.state.selected === true;
        })).pipe(skip(1) // Skip initial emission
        )
            .subscribe((/**
         * @param {?} records
         * @return {?}
         */
        (records) => {
            if (this.modifyControl.active === true) {
                this.deactivateModifyControl();
            }
            this.selectedFeatures$.next(records.map((/**
             * @param {?} record
             * @return {?}
             */
            record => record.entity)));
        }));
    }
    /**
     * Freeze any store, meaning the layer is removed, strategies are deactivated
     * and some listener removed
     * \@internal
     * @private
     * @return {?}
     */
    freezeStore() {
        /** @type {?} */
        const store = this.store;
        this.selectedFeatures$$.unsubscribe();
        unByKey(this.onFeatureAddedKey);
        unByKey(this.onFeatureRemovedKey);
        this.clearTooltipsOfOlSource(store.source.ol);
        this.map.removeLayer(store.layer);
        store.deactivateStrategyOfType(FeatureStoreLoadingStrategy);
        store.deactivateStrategyOfType(FeatureStoreSelectionStrategy);
    }
    /**
     * Create a draw line control
     * @private
     * @return {?}
     */
    createDrawLineControl() {
        this.drawLineControl = new DrawControl({
            geometryType: 'LineString',
            source: this.olDrawSource,
            drawStyle: createMeasureInteractionStyle(),
            layerStyle: new OlStyle({})
        });
    }
    /**
     * Create a draw polygon control
     * @private
     * @return {?}
     */
    createDrawPolygonControl() {
        this.drawPolygonControl = new DrawControl({
            geometryType: 'Polygon',
            source: this.olDrawSource,
            drawStyle: createMeasureInteractionStyle(),
            layerStyle: new OlStyle({})
        });
    }
    /**
     * Create a draw polygon control
     * @private
     * @return {?}
     */
    createModifyControl() {
        this.modifyControl = new ModifyControl({
            source: this.olDrawSource,
            drawStyle: createMeasureInteractionStyle(),
            layerStyle: new OlStyle({})
        });
    }
    /**
     * Activate the right control
     * @private
     * @return {?}
     */
    toggleDrawControl() {
        this.deactivateDrawControl();
        // this.deactivateModifyControl();
        if (this.activeMeasureType === MeasureType.Length) {
            this.activateDrawControl(this.drawLineControl);
        }
        else if (this.activeMeasureType === MeasureType.Area) {
            this.activateDrawControl(this.drawPolygonControl);
        }
    }
    /**
     * Activate a given control
     * @private
     * @param {?} drawControl Draw control
     * @return {?}
     */
    activateDrawControl(drawControl) {
        this.activeDrawControl = drawControl;
        this.drawStart$$ = drawControl.start$
            .subscribe((/**
         * @param {?} olGeometry
         * @return {?}
         */
        (olGeometry) => this.onDrawStart(olGeometry)));
        this.drawEnd$$ = drawControl.end$
            .subscribe((/**
         * @param {?} olGeometry
         * @return {?}
         */
        (olGeometry) => this.onDrawEnd(olGeometry)));
        this.drawChanges$$ = drawControl.changes$
            .subscribe((/**
         * @param {?} olGeometry
         * @return {?}
         */
        (olGeometry) => this.onDrawChanges(olGeometry)));
        drawControl.setOlMap(this.map.ol);
    }
    /**
     * Deactivate the active draw control
     * @private
     * @return {?}
     */
    deactivateDrawControl() {
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
    }
    /**
     * @private
     * @param {?} measureType
     * @return {?}
     */
    setActiveMeasureType(measureType) {
        this._activeMeasureType = measureType;
        this.clearMeasures();
        this.toggleDrawControl();
    }
    /**
     * Clear the draw source and track the geometry being drawn
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @return {?}
     */
    onDrawStart(olGeometry) {
        this.activeOlGeometry = olGeometry;
    }
    /**
     * Clear the draw source and track the geometry being draw
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @return {?}
     */
    onDrawEnd(olGeometry) {
        this.activeOlGeometry = undefined;
        this.finalizeMeasureOfOlGeometry(olGeometry);
        this.addFeatureToStore(olGeometry);
        this.clearTooltipsOfOlGeometry(olGeometry);
        this.olDrawSource.clear(true);
    }
    /**
     * Update measures observables and map tooltips
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @return {?}
     */
    onDrawChanges(olGeometry) {
        /** @type {?} */
        const measure = measureOlGeometry(olGeometry, this.projection);
        this.updateMeasureOfOlGeometry(olGeometry, Object.assign({}, measure, {
            area: undefined // We don't want to display an area tooltip while drawing.
        }));
        this.measure$.next(measure);
    }
    /**
     * Activate a given control
     * @private
     * @return {?}
     */
    activateModifyControl() {
        /** @type {?} */
        const selection = (/** @type {?} */ (this.store.getStrategyOfType(FeatureStoreSelectionStrategy)));
        selection.deactivate();
        selection.clear();
        this.modifyStart$$ = this.modifyControl.start$
            .subscribe((/**
         * @param {?} olGeometry
         * @return {?}
         */
        (olGeometry) => this.onModifyStart(olGeometry)));
        this.modifyEnd$$ = this.modifyControl.end$
            .subscribe((/**
         * @param {?} olGeometry
         * @return {?}
         */
        (olGeometry) => this.onModifyEnd(olGeometry)));
        this.modifyChanges$$ = this.modifyControl.changes$
            .subscribe((/**
         * @param {?} olGeometry
         * @return {?}
         */
        (olGeometry) => this.onModifyChanges(olGeometry)));
        this.modifyControl.setOlMap(this.map.ol);
    }
    /**
     * Deactivate the active modify control
     * @private
     * @return {?}
     */
    deactivateModifyControl() {
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
                const feature = this.selectedFeatures$.value[0];
                this.addFeatureToStore(this.activeOlGeometry, feature);
            }
            this.finalizeMeasureOfOlGeometry(this.activeOlGeometry);
        }
        this.olDrawSource.clear();
        this.store.activateStrategyOfType(FeatureStoreSelectionStrategy);
        this.activeOlGeometry = undefined;
        this.modifyControl.setOlMap(undefined);
    }
    /**
     * Clear the draw source and track the geometry being drawn
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @return {?}
     */
    onModifyStart(olGeometry) {
        this.onDrawStart(olGeometry);
    }
    /**
     * Update measures observables and map tooltips
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @return {?}
     */
    onModifyChanges(olGeometry) {
        this.onDrawChanges(olGeometry);
    }
    /**
     * Clear the draw source and track the geometry being draw
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @return {?}
     */
    onModifyEnd(olGeometry) {
        this.finalizeMeasureOfOlGeometry(olGeometry);
    }
    /**
     * @private
     * @param {?} olGeometry
     * @return {?}
     */
    finalizeMeasureOfOlGeometry(olGeometry) {
        /** @type {?} */
        let measure = measureOlGeometry(olGeometry, this.projection);
        if (olGeometry instanceof OlPolygon) {
            measure = Object.assign({}, measure, {
                lengths: [] // We don't want to display an area tooltip while drawing.
            });
        }
        this.updateMeasureOfOlGeometry(olGeometry, measure);
    }
    /**
     * Update measures observables
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @param {?} measure Measure
     * @return {?}
     */
    updateMeasureOfOlGeometry(olGeometry, measure) {
        olGeometry.setProperties({ _measure: measure }, true);
        this.updateTooltipsOfOlGeometry(olGeometry);
    }
    /**
     * Clear the measures observables
     * @private
     * @return {?}
     */
    clearMeasures() {
        this.measure$.next({});
    }
    /**
     * Add a feature with measures to the store. The loading stragegy of the store
     * will trigger and add the feature to the map.
     * \@internal
     * @private
     * @param {?} olGeometry
     * @param {?=} feature
     * @return {?}
     */
    addFeatureToStore(olGeometry, feature) {
        /** @type {?} */
        const featureId = feature ? feature.properties.id : uuid();
        /** @type {?} */
        const projection = this.map.ol.getView().getProjection();
        /** @type {?} */
        const geometry = new OlGeoJSON().writeGeometryObject(olGeometry, {
            featureProjection: projection,
            dataProjection: projection
        });
        this.store.update({
            type: FEATURE,
            geometry,
            projection: projection.getCode(),
            properties: {
                id: featureId,
                measure: olGeometry.get('_measure')
            },
            meta: {
                id: featureId
            }
        });
    }
    /**
     * Update all the tooltips of an OL geometry
     * @private
     * @param {?} olGeometry OL Geometry
     * @return {?}
     */
    updateTooltipsOfOlGeometry(olGeometry) {
        /** @type {?} */
        const measure = olGeometry.get('_measure');
        /** @type {?} */
        const lengths = measure.lengths;
        /** @type {?} */
        const area = measure.area;
        /** @type {?} */
        const olMidpointsTooltips = updateOlTooltipsAtMidpoints(olGeometry);
        if (lengths.length === olMidpointsTooltips.length) {
            for (let i = 0; i < olMidpointsTooltips.length; i++) {
                /** @type {?} */
                const length = lengths[i];
                if (length !== undefined) {
                    this.updateOlTooltip(olMidpointsTooltips[i], metersToUnit(length, this.activeLengthUnit), this.activeLengthUnit, MeasureType.Length);
                }
            }
        }
        if (area !== undefined) {
            this.updateOlTooltip(updateOlTooltipAtCenter(olGeometry), squareMetersToUnit(area, this.activeAreaUnit), this.activeAreaUnit, MeasureType.Area);
        }
    }
    /**
     * Show the map tooltips of a geoemtry
     * @private
     * @param {?} olGeometry
     * @return {?}
     */
    showTooltipsOfOlGeometry(olGeometry) {
        getTooltipsOfOlGeometry(olGeometry).forEach((/**
         * @param {?} olTooltip
         * @return {?}
         */
        (olTooltip) => {
            if (this.shouldShowTooltip(olTooltip)) {
                this.map.ol.addOverlay(olTooltip);
            }
        }));
    }
    /**
     * Clear the tooltips of an OL geometrys
     * @private
     * @param {?} olGeometry OL geometry with tooltips
     * @return {?}
     */
    clearTooltipsOfOlGeometry(olGeometry) {
        getTooltipsOfOlGeometry(olGeometry).forEach((/**
         * @param {?} olTooltip
         * @return {?}
         */
        (olTooltip) => {
            if (olTooltip !== undefined && olTooltip.getMap() !== undefined) {
                this.map.ol.removeOverlay(olTooltip);
            }
        }));
    }
    /**
     * Show the map tooltips of all the geometries of a source
     * @private
     * @param {?} olSource
     * @return {?}
     */
    updateTooltipsOfOlSource(olSource) {
        olSource.forEachFeature((/**
         * @param {?} olFeature
         * @return {?}
         */
        (olFeature) => {
            this.updateTooltipsOfOlGeometry(olFeature.getGeometry());
        }));
    }
    /**
     * Show the map tooltips of all the geometries of a source
     * @private
     * @param {?} olSource
     * @return {?}
     */
    showTooltipsOfOlSource(olSource) {
        olSource.forEachFeature((/**
         * @param {?} olFeature
         * @return {?}
         */
        (olFeature) => {
            this.showTooltipsOfOlGeometry(olFeature.getGeometry());
        }));
    }
    /**
     * Clear the map tooltips
     * @private
     * @param {?} olSource
     * @return {?}
     */
    clearTooltipsOfOlSource(olSource) {
        olSource.forEachFeature((/**
         * @param {?} olFeature
         * @return {?}
         */
        (olFeature) => {
            /** @type {?} */
            const olGeometry = olFeature.getGeometry();
            if (olGeometry !== undefined) {
                this.clearTooltipsOfOlGeometry(olFeature.getGeometry());
            }
        }));
    }
    /**
     * Update an OL tooltip properties and inner HTML and add it to the map if possible
     * @private
     * @param {?} olTooltip OL tooltip
     * @param {?} measure The measure valeu ti display
     * @param {?} unit
     * @param {?} type
     * @return {?}
     */
    updateOlTooltip(olTooltip, measure, unit, type) {
        olTooltip.setProperties({ _measure: measure, _unit: unit, _type: type }, true);
        olTooltip.getElement().innerHTML = this.computeTooltipInnerHTML(olTooltip);
        if (this.shouldShowTooltip(olTooltip)) {
            this.map.ol.addOverlay(olTooltip);
        }
    }
    /**
     * Compute a tooltip's content
     * @private
     * @param {?} olTooltip OL overlay
     * @return {?} Inner HTML
     */
    computeTooltipInnerHTML(olTooltip) {
        /** @type {?} */
        const properties = (/** @type {?} */ (olTooltip.getProperties()));
        return formatMeasure(properties._measure, {
            decimal: 1,
            unit: properties._unit,
            unitAbbr: true,
            locale: 'fr'
        });
    }
    /**
     * Whether a tooltip should be showned based on the length
     * of the segment it is bound to.
     * @private
     * @param {?} olTooltip OL overlay
     * @return {?} True if the tooltip should be shown
     */
    shouldShowTooltip(olTooltip) {
        if (this.showTooltips === false) {
            return false;
        }
        /** @type {?} */
        const properties = (/** @type {?} */ (olTooltip.getProperties()));
        /** @type {?} */
        const measure = properties._measure;
        if (measure === undefined) {
            return false;
        }
        if (properties._unit === MeasureType.Length) {
            /** @type {?} */
            const minSegmentLength = metersToUnit(this.minSegmentLength, properties._unit) || 0;
            return measure > Math.max(minSegmentLength, 0);
        }
        return true;
    }
}
MeasurerComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-measurer',
                template: "<div>\r\n  <div class=\"measure-type-toggle\">\r\n    <mat-button-toggle-group\r\n      [value]=\"activeMeasureType\"\r\n      (change)=\"onMeasureTypeChange($event.value)\">\r\n      <mat-button-toggle [value]=\"measureType.Length\">\r\n        {{('igo.geo.measure.' + measureType.Length) | translate}}\r\n      </mat-button-toggle>\r\n      <mat-button-toggle [value]=\"measureType.Area\">\r\n        {{('igo.geo.measure.' + measureType.Area) | translate}}\r\n      </mat-button-toggle>\r\n    </mat-button-toggle-group>\r\n  </div>\r\n\r\n  <div class=\"measure-options\">\r\n    <mat-slide-toggle\r\n      [checked]=\"drawControlIsActive\"\r\n      [labelPosition]=\"'before'\"\r\n      (change)=\"onToggleDrawControl($event.checked)\">\r\n      {{'igo.geo.measure.toggleMeasure' | translate}}\r\n    </mat-slide-toggle>\r\n\r\n    <mat-slide-toggle\r\n      [checked]=\"showTooltips\"\r\n      [labelPosition]=\"'before'\"\r\n      (change)=\"onToggleTooltips($event.checked)\">\r\n      {{'igo.geo.measure.toggleMapTooltips' | translate}}\r\n    </mat-slide-toggle>\r\n\r\n    <mat-slide-toggle\r\n      [checked]=\"measureUnitsAuto\"\r\n      [labelPosition]=\"'before'\"\r\n      (change)=\"onToggleMeasureUnitsAuto($event.checked)\">\r\n      {{'igo.geo.measure.toggleAutoUnits' | translate}}\r\n    </mat-slide-toggle>\r\n  </div>\r\n\r\n  <ng-container *ngIf=\"measure$ | async as measure\">\r\n    <igo-measurer-item\r\n      [measureType]=\"measureType.Length\"\r\n      [measureUnit]=\"measureLengthUnit.Meters\"\r\n      [measure]=\"measure.length\"\r\n      [auto]=\"measureUnitsAuto\"\r\n      [placeholder]=\"(activeMeasureType === measureType.Area ? 'igo.geo.measure.perimeter' : 'igo.geo.measure.length') | translate\"\r\n      (measureUnitChange)=\"onLengthUnitChange($event)\">\r\n    </igo-measurer-item>\r\n\r\n    <igo-measurer-item\r\n      [measureType]=\"measureType.Area\"\r\n      [measureUnit]=\"measureAreaUnit.SquareMeters\"\r\n      [measure]=\"measure.area\"\r\n      [auto]=\"measureUnitsAuto\"\r\n      [placeholder]=\"'igo.geo.measure.area' | translate\"\r\n      (measureUnitChange)=\"onAreaUnitChange($event)\">\r\n    </igo-measurer-item>\r\n  </ng-container>\r\n\r\n  <div class=\"measure-store-buttons\">\r\n    <button\r\n      mat-icon-button\r\n      [matTooltip]=\"'igo.geo.measure.actionbar.calculate.tooltip' | translate\"\r\n      [disabled]=\"(selectedFeatures$ | async).length === 0\"\r\n      (click)=\"onCalculateClick()\">\r\n      <mat-icon svgIcon=\"calculator\"></mat-icon>\r\n    </button>\r\n\r\n    <button\r\n      mat-icon-button\r\n      [matTooltip]=\"'igo.geo.measure.actionbar.delete.tooltip' | translate\"\r\n      [disabled]=\"(selectedFeatures$ | async).length === 0\"\r\n      (click)=\"onDeleteClick()\">\r\n      <mat-icon svgIcon=\"delete\"></mat-icon>\r\n    </button>\r\n\r\n    <!--button\r\n      mat-icon-button\r\n      [matTooltip]=\"'igo.geo.measure.actionbar.modify.tooltip' | translate\"\r\n      [disabled]=\"(selectedFeatures$ | async).length !== 1\"\r\n      (click)=\"onModifyClick()\">\r\n      <mat-icon svgIcon=\"edit\"></mat-icon>\r\n    </button-->\r\n  </div>\r\n\r\n  <igo-entity-table\r\n    #table\r\n    class=\"table-compact\"\r\n    [store]=\"store\"\r\n    [template]=\"tableTemplate\">\r\n  </igo-entity-table>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".measure-type-toggle{padding:10px;text-align:center}.measure-type-toggle mat-button-toggle-group{width:100%}.measure-type-toggle mat-button-toggle-group mat-button-toggle{width:50%}.measure-options{overflow-x:hidden}.measure-options mat-slide-toggle{width:100%;margin:10px}.measure-options mat-slide-toggle ::ng-deep .mat-slide-toggle-content{width:calc(100% - 60px);font-size:16px}.measure-store-buttons{width:100%;border-top:1px solid #ddd;border-bottom:1px solid #ddd}.measure-store-buttons button:first-of-type{margin-left:14px}"]
            }] }
];
/** @nocollapse */
MeasurerComponent.ctorParameters = () => [
    { type: LanguageService },
    { type: MatDialog }
];
MeasurerComponent.propDecorators = {
    map: [{ type: Input }],
    store: [{ type: Input }],
    activeMeasureType: [{ type: Input }],
    minSegmentLength: [{ type: Input }],
    table: [{ type: ViewChild, args: ['table',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVhc3VyZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL21lYXN1cmUvbWVhc3VyZXIvbWVhc3VyZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFHTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUU5QyxPQUFPLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHdEMsT0FBTyxPQUFPLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxTQUFTLE1BQU0sbUJBQW1CLENBQUM7QUFDMUMsT0FBTyxjQUFjLE1BQU0sa0JBQWtCLENBQUM7QUFHOUMsT0FBTyxTQUFTLE1BQU0saUJBQWlCLENBQUM7QUFHeEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV4QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzdDLE9BQU8sRUFBcUMsb0JBQW9CLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkYsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVuQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNyRCxPQUFPLEVBQ0wsT0FBTyxFQUNQLFlBQVksRUFDWiwyQkFBMkIsRUFDM0IsNkJBQTZCLEVBQzdCLGlCQUFpQixFQUNqQixxQkFBcUIsRUFDckIsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxN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SUFNMUYseUNBQW9DOzs7Ozs7SUFLcEMsNENBQXFDOzs7Ozs7SUFLckMsK0NBQXdDOzs7Ozs7SUFLeEMsMENBQXFDOzs7Ozs7SUFLckMsNkNBQW1EOzs7Ozs7SUFLbkQsNkNBQXVFOzs7Ozs7SUFLdkUsMkNBQXVFOzs7Ozs7SUFLdkUsOENBQWtDOzs7Ozs7SUFLbEMsZ0RBQW9DOzs7Ozs7O0lBTXBDLDhDQUF1Qzs7Ozs7O0lBS3ZDLHdDQUFrQzs7Ozs7O0lBS2xDLHNDQUFnQzs7Ozs7O0lBS2hDLDBDQUFvQzs7Ozs7O0lBS3BDLDBDQUFvQzs7Ozs7O0lBS3BDLHdDQUFrQzs7Ozs7O0lBS2xDLDRDQUFzQzs7Ozs7O0lBS3RDLCtDQUF5Qzs7Ozs7O0lBS3pDLHlDQUE0Qzs7Ozs7SUFLNUMsZ0NBQXFCOzs7OztJQUtyQixrQ0FBaUQ7Ozs7O0lBU2pELCtDQUE2RDs7Ozs7O0lBTTdELDZDQUF1Qzs7SUFFdkMsa0NBQWdEOzs7OztJQWU5Qyw0Q0FBd0M7Ozs7O0lBQ3hDLG1DQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgVmlld0NoaWxkXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHNraXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgT2xQcm9qZWN0aW9uIGZyb20gJ29sL3Byb2ovUHJvamVjdGlvbic7XHJcbmltcG9ydCBPbFN0eWxlIGZyb20gJ29sL3N0eWxlL1N0eWxlJztcclxuaW1wb3J0IE9sR2VvSlNPTiBmcm9tICdvbC9mb3JtYXQvR2VvSlNPTic7XHJcbmltcG9ydCBPbFZlY3RvclNvdXJjZSBmcm9tICdvbC9zb3VyY2UvVmVjdG9yJztcclxuaW1wb3J0IHsgVmVjdG9yU291cmNlRXZlbnQgYXMgT2xWZWN0b3JTb3VyY2VFdmVudCB9IGZyb20gJ29sL3NvdXJjZS9WZWN0b3InO1xyXG5pbXBvcnQgT2xMaW5lU3RyaW5nIGZyb20gJ29sL2dlb20vTGluZVN0cmluZyc7XHJcbmltcG9ydCBPbFBvbHlnb24gZnJvbSAnb2wvZ2VvbS9Qb2x5Z29uJztcclxuaW1wb3J0IE9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuaW1wb3J0IE9sT3ZlcmxheSBmcm9tICdvbC9PdmVybGF5JztcclxuaW1wb3J0IHsgdW5CeUtleSB9IGZyb20gJ29sL09ic2VydmFibGUnO1xyXG5cclxuaW1wb3J0IHsgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IEVudGl0eVJlY29yZCwgRW50aXR5VGFibGVUZW1wbGF0ZSwgRW50aXR5VGFibGVDb21wb25lbnQgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5pbXBvcnQgeyB1dWlkIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHtcclxuICBGRUFUVVJFLFxyXG4gIEZlYXR1cmVTdG9yZSxcclxuICBGZWF0dXJlU3RvcmVMb2FkaW5nU3RyYXRlZ3ksXHJcbiAgRmVhdHVyZVN0b3JlU2VsZWN0aW9uU3RyYXRlZ3ksXHJcbiAgdHJ5QmluZFN0b3JlTGF5ZXIsXHJcbiAgdHJ5QWRkTG9hZGluZ1N0cmF0ZWd5LFxyXG4gIHRyeUFkZFNlbGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnLi4vLi4vZmVhdHVyZSc7XHJcbmltcG9ydCB7IERyYXdDb250cm9sLCBNb2RpZnlDb250cm9sIH0gZnJvbSAnLi4vLi4vZ2VvbWV0cnknO1xyXG5pbXBvcnQgeyBWZWN0b3JMYXllciB9IGZyb20gJy4uLy4uL2xheWVyJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuXHJcbmltcG9ydCB7IE1lYXN1cmUsIE1lYXN1cmVyRGlhbG9nRGF0YSwgRmVhdHVyZVdpdGhNZWFzdXJlIH0gZnJvbSAnLi4vc2hhcmVkL21lYXN1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7XHJcbiAgTWVhc3VyZVR5cGUsXHJcbiAgTWVhc3VyZUFyZWFVbml0LFxyXG4gIE1lYXN1cmVMZW5ndGhVbml0LFxyXG59IGZyb20gJy4uL3NoYXJlZC9tZWFzdXJlLmVudW0nO1xyXG5pbXBvcnQge1xyXG4gIG1lYXN1cmVPbEdlb21ldHJ5LFxyXG4gIGNyZWF0ZU1lYXN1cmVJbnRlcmFjdGlvblN0eWxlLFxyXG4gIGNyZWF0ZU1lYXN1cmVMYXllclN0eWxlLFxyXG4gIHVwZGF0ZU9sVG9vbHRpcHNBdE1pZHBvaW50cyxcclxuICB1cGRhdGVPbFRvb2x0aXBBdENlbnRlcixcclxuICBnZXRUb29sdGlwc09mT2xHZW9tZXRyeSxcclxuICBzcXVhcmVNZXRlcnNUb1VuaXQsXHJcbiAgbWV0ZXJzVG9Vbml0LFxyXG4gIGZvcm1hdE1lYXN1cmVcclxufSBmcm9tICcuLi9zaGFyZWQvbWVhc3VyZS51dGlscyc7XHJcbmltcG9ydCB7IE1lYXN1cmVyRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9tZWFzdXJlci1kaWFsb2cuY29tcG9uZW50JztcclxuXHJcbi8qKlxyXG4gKiBUb29sIHRvIG1lYXN1cmUgbGVuZ3RocyBhbmQgYXJlYXNcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLW1lYXN1cmVyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbWVhc3VyZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL21lYXN1cmVyLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIE1lYXN1cmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICAvKipcclxuICAgKiBUYWJsZSB0ZW1wbGF0ZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHB1YmxpYyB0YWJsZVRlbXBsYXRlOiBFbnRpdHlUYWJsZVRlbXBsYXRlID0ge1xyXG4gICAgc2VsZWN0aW9uOiB0cnVlLFxyXG4gICAgc2VsZWN0TWFueTogdHJ1ZSxcclxuICAgIHNlbGVjdGlvbkNoZWNrYm94OiB0cnVlLFxyXG4gICAgc29ydDogdHJ1ZSxcclxuICAgIGNvbHVtbnM6IFtcclxuICAgICAge1xyXG4gICAgICAgIG5hbWU6ICdsZW5ndGgnLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5tZWFzdXJlLmxlbmd0aEhlYWRlcicpLFxyXG4gICAgICAgIHZhbHVlQWNjZXNzb3I6IChmZWF0dXJlOiBGZWF0dXJlV2l0aE1lYXN1cmUpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHVuaXQgPSB0aGlzLmFjdGl2ZUxlbmd0aFVuaXQ7XHJcbiAgICAgICAgICBjb25zdCBtZWFzdXJlID0gbWV0ZXJzVG9Vbml0KGZlYXR1cmUucHJvcGVydGllcy5tZWFzdXJlLmxlbmd0aCwgdW5pdCk7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0TWVhc3VyZShtZWFzdXJlLCB7XHJcbiAgICAgICAgICAgIGRlY2ltYWw6IDEsXHJcbiAgICAgICAgICAgIHVuaXQsXHJcbiAgICAgICAgICAgIHVuaXRBYmJyOiBmYWxzZSxcclxuICAgICAgICAgICAgbG9jYWxlOiAnZnInXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBuYW1lOiAnYXJlYScsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLm1lYXN1cmUuYXJlYUhlYWRlcicpLFxyXG4gICAgICAgIHZhbHVlQWNjZXNzb3I6IChmZWF0dXJlOiBGZWF0dXJlV2l0aE1lYXN1cmUpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHVuaXQgPSB0aGlzLmFjdGl2ZUFyZWFVbml0O1xyXG4gICAgICAgICAgY29uc3QgbWVhc3VyZSA9IHNxdWFyZU1ldGVyc1RvVW5pdChmZWF0dXJlLnByb3BlcnRpZXMubWVhc3VyZS5hcmVhLCB1bml0KTtcclxuICAgICAgICAgIHJldHVybiBtZWFzdXJlID8gZm9ybWF0TWVhc3VyZShtZWFzdXJlLCB7XHJcbiAgICAgICAgICAgIGRlY2ltYWw6IDEsXHJcbiAgICAgICAgICAgIHVuaXQsXHJcbiAgICAgICAgICAgIHVuaXRBYmJyOiBmYWxzZSxcclxuICAgICAgICAgICAgbG9jYWxlOiAnZnInXHJcbiAgICAgICAgICB9KSA6ICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZmVyZW5jZSB0byB0aGUgTWVhc3VyZVR5cGUgZW51bVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHB1YmxpYyBtZWFzdXJlVHlwZSA9IE1lYXN1cmVUeXBlO1xyXG5cclxuICAvKipcclxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIEFyZWFNZWFzdXJlVW5pdCBlbnVtXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHVibGljIG1lYXN1cmVBcmVhVW5pdCA9IE1lYXN1cmVBcmVhVW5pdDtcclxuXHJcbiAgLyoqXHJcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBMZW5ndGhNZWFzdXJlVW5pdCBlbnVtXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHVibGljIG1lYXN1cmVMZW5ndGhVbml0ID0gTWVhc3VyZUxlbmd0aFVuaXQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgbWVhc3VyZSB1bml0cyBzaG91bGQgYmUgYXV0b21hdGljYWxseSBkZXRlcm1pbmVkXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHVibGljIG1lYXN1cmVVbml0c0F1dG86IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBvZiBhcmVhXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHVibGljIG1lYXN1cmUkOiBCZWhhdmlvclN1YmplY3Q8TWVhc3VyZT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHt9KTtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBvZiBzZWxlY3RlZCBmZWF0dXJlc1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZWxlY3RlZEZlYXR1cmVzJDogQmVoYXZpb3JTdWJqZWN0PEZlYXR1cmVXaXRoTWVhc3VyZVtdPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xyXG5cclxuICAvKipcclxuICAgKiBPTCBkcmF3IHNvdXJjZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHB1YmxpYyBzaG93VG9vbHRpcHM6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBEcmF3IGxpbmUgY29udHJvbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZHJhd0xpbmVDb250cm9sOiBEcmF3Q29udHJvbDtcclxuXHJcbiAgLyoqXHJcbiAgICogRHJhdyBwb2x5Z29uIGNvbnRyb2xcclxuICAgKi9cclxuICBwcml2YXRlIGRyYXdQb2x5Z29uQ29udHJvbDogRHJhd0NvbnRyb2w7XHJcblxyXG4gIC8qKlxyXG4gICAqIE1vZGlmeSBjb250cm9sXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBtb2RpZnlDb250cm9sOiBNb2RpZnlDb250cm9sO1xyXG5cclxuICAvKipcclxuICAgKiBBY3RpdmUgT0wgZ2VvbWV0cnlcclxuICAgKi9cclxuICBwcml2YXRlIGFjdGl2ZU9sR2VvbWV0cnk6IE9sTGluZVN0cmluZyB8IE9sUG9seWdvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQWN0aXZlIG1sZW5ndGggdW5pdFxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWN0aXZlTGVuZ3RoVW5pdDogTWVhc3VyZUxlbmd0aFVuaXQgPSBNZWFzdXJlTGVuZ3RoVW5pdC5NZXRlcnM7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjdGl2ZSBhcmVhIHVuaXRcclxuICAgKi9cclxuICBwcml2YXRlIGFjdGl2ZUFyZWFVbml0OiBNZWFzdXJlQXJlYVVuaXQgPSBNZWFzdXJlQXJlYVVuaXQuU3F1YXJlTWV0ZXJzO1xyXG5cclxuICAvKipcclxuICAgKiBGZWF0dXJlIGFkZGVkIGxpc3RlbmVyIGtleVxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25GZWF0dXJlQWRkZWRLZXk6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogRmVhdHVyZSByZW1vdmVkIGxpc3RlbmVyIGtleVxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25GZWF0dXJlUmVtb3ZlZEtleTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBBY3RpdmUgZHJhdyBjb250cm9sXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhY3RpdmVEcmF3Q29udHJvbDogRHJhd0NvbnRyb2w7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byBkcmF3IHN0YXJ0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkcmF3U3RhcnQkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gZHJhdyBlbmRcclxuICAgKi9cclxuICBwcml2YXRlIGRyYXdFbmQkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gY29udHJvbHMgY2hhbmdlc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgZHJhd0NoYW5nZXMkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gbW9kaWZ5IHN0YXJ0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBtb2RpZnlTdGFydCQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byBtb2RpZnkgZW5kXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBtb2RpZnlFbmQkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gY29udHJvbHMgY2hhbmdlc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgbW9kaWZ5Q2hhbmdlcyQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byBtZWFzdXJlcyBzZWxlY3Rpb25cclxuICAgKi9cclxuICBwcml2YXRlIHNlbGVjdGVkRmVhdHVyZXMkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBPTCBkcmF3IHNvdXJjZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgb2xEcmF3U291cmNlID0gbmV3IE9sVmVjdG9yU291cmNlKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBtYXAgdG8gbWVhc3VyZSBvblxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1hcDogSWdvTWFwO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbWVhc3VyZXMgc3RvcmVcclxuICAgKi9cclxuICBASW5wdXQoKSBzdG9yZTogRmVhdHVyZVN0b3JlPEZlYXR1cmVXaXRoTWVhc3VyZT47XHJcblxyXG4gIC8qKlxyXG4gICAqIE1lYXN1cmUgdHlwZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGFjdGl2ZU1lYXN1cmVUeXBlKHZhbHVlOiBNZWFzdXJlVHlwZSkgeyB0aGlzLnNldEFjdGl2ZU1lYXN1cmVUeXBlKHZhbHVlKTsgfVxyXG4gIGdldCBhY3RpdmVNZWFzdXJlVHlwZSgpOiBNZWFzdXJlVHlwZSB7IHJldHVybiB0aGlzLl9hY3RpdmVNZWFzdXJlVHlwZTsgfVxyXG4gIHByaXZhdGUgX2FjdGl2ZU1lYXN1cmVUeXBlOiBNZWFzdXJlVHlwZSA9IE1lYXN1cmVUeXBlLkxlbmd0aDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG1pbmltdW0gbGVuZ3RoIGEgc2VnbWVudCBtdXN0IGhhdmUgdG8gZGlzcGxheSBhIHRvb2x0aXAuXHJcbiAgICogSXQgYWxzbyBhcHBsaWVzIHRvIGFyZWEgdG9vbHRpcHMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWluU2VnbWVudExlbmd0aDogbnVtYmVyID0gMTA7XHJcblxyXG4gIEBWaWV3Q2hpbGQoJ3RhYmxlJykgdGFibGU6IEVudGl0eVRhYmxlQ29tcG9uZW50O1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0ZXIgb25lIG9mIHRoZSBkcmF3IGNvbnRyb2wgaXMgYWN0aXZlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IGRyYXdDb250cm9sSXNBY3RpdmUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVEcmF3Q29udHJvbCAhPT0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHByb2plY3Rpb24oKTogT2xQcm9qZWN0aW9uIHtcclxuICAgIHJldHVybiB0aGlzLm1hcC5vbC5nZXRWaWV3KCkuZ2V0UHJvamVjdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZ1xyXG4gICkge31cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGRyYXcgY29udHJvbHMgYW5kIGFjdGl2YXRlIG9uZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5pbml0U3RvcmUoKTtcclxuICAgIHRoaXMuY3JlYXRlRHJhd0xpbmVDb250cm9sKCk7XHJcbiAgICB0aGlzLmNyZWF0ZURyYXdQb2x5Z29uQ29udHJvbCgpO1xyXG4gICAgdGhpcy5jcmVhdGVNb2RpZnlDb250cm9sKCk7XHJcbiAgICB0aGlzLnRvZ2dsZURyYXdDb250cm9sKCk7XHJcbiAgICB0aGlzLm9uVG9nZ2xlVG9vbHRpcHModGhpcy5zaG93VG9vbHRpcHMpO1xyXG4gICAgdGhpcy51cGRhdGVUb29sdGlwc09mT2xTb3VyY2UodGhpcy5zdG9yZS5zb3VyY2Uub2wpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhlIG92ZXJsYXkgbGF5ZXIgYW5kIGFueSBpbnRlcmFjdGlvbiBhZGRlZCBieSB0aGlzIGNvbXBvbmVudC5cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuc2V0QWN0aXZlTWVhc3VyZVR5cGUodW5kZWZpbmVkKTtcclxuICAgIHRoaXMuZGVhY3RpdmF0ZU1vZGlmeUNvbnRyb2woKTtcclxuICAgIHRoaXMuZnJlZXplU3RvcmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgbWVhc3VyZSB0eXBlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25NZWFzdXJlVHlwZUNoYW5nZShtZWFzdXJlVHlwZTogTWVhc3VyZVR5cGUpIHtcclxuICAgIHRoaXMuYWN0aXZlTWVhc3VyZVR5cGUgPSBtZWFzdXJlVHlwZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjdGl2YXRlIG9yIGRlYWN0aXZhdGUgdGhlIGN1cnJlbnQgZHJhdyBjb250cm9sXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25Ub2dnbGVEcmF3Q29udHJvbCh0b2dnbGU6IGJvb2xlYW4pIHtcclxuICAgIGlmICh0b2dnbGUgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy50b2dnbGVEcmF3Q29udHJvbCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5kZWFjdGl2YXRlRHJhd0NvbnRyb2woKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjdGl2YXRlIG9yIGRlYWN0aXZhdGUgdGhlIGN1cnJlbnQgZHJhdyBjb250cm9sXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25Ub2dnbGVUb29sdGlwcyh0b2dnbGU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuc2hvd1Rvb2x0aXBzID0gdG9nZ2xlO1xyXG4gICAgaWYgKHRvZ2dsZSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLnNob3dUb29sdGlwc09mT2xTb3VyY2UodGhpcy5zdG9yZS5zb3VyY2Uub2wpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jbGVhclRvb2x0aXBzT2ZPbFNvdXJjZSh0aGlzLnN0b3JlLnNvdXJjZS5vbCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBY3RpdmF0ZSBvciBkZWFjdGl2YXRlIHRoZSBjdXJyZW50IGRyYXcgY29udHJvbFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uVG9nZ2xlTWVhc3VyZVVuaXRzQXV0byh0b2dnbGU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMubWVhc3VyZVVuaXRzQXV0byA9IHRvZ2dsZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgbWVhc3VyZSB0eXBlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25MZW5ndGhVbml0Q2hhbmdlKHVuaXQ6IE1lYXN1cmVMZW5ndGhVbml0KSB7XHJcbiAgICB0aGlzLmFjdGl2ZUxlbmd0aFVuaXQgPSB1bml0O1xyXG4gICAgdGhpcy50YWJsZS5yZWZyZXNoKCk7XHJcbiAgICB0aGlzLnVwZGF0ZVRvb2x0aXBzT2ZPbFNvdXJjZSh0aGlzLnN0b3JlLnNvdXJjZS5vbCk7XHJcbiAgICBpZiAodGhpcy5hY3RpdmVPbEdlb21ldHJ5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy51cGRhdGVUb29sdGlwc09mT2xHZW9tZXRyeSh0aGlzLmFjdGl2ZU9sR2VvbWV0cnkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBtZWFzdXJlIHR5cGVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvbkFyZWFVbml0Q2hhbmdlKHVuaXQ6IE1lYXN1cmVBcmVhVW5pdCkge1xyXG4gICAgdGhpcy5hY3RpdmVBcmVhVW5pdCA9IHVuaXQ7XHJcbiAgICB0aGlzLnRhYmxlLnJlZnJlc2goKTtcclxuICAgIHRoaXMudXBkYXRlVG9vbHRpcHNPZk9sU291cmNlKHRoaXMuc3RvcmUuc291cmNlLm9sKTtcclxuICAgIGlmICh0aGlzLmFjdGl2ZU9sR2VvbWV0cnkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnVwZGF0ZVRvb2x0aXBzT2ZPbEdlb21ldHJ5KHRoaXMuYWN0aXZlT2xHZW9tZXRyeSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkNhbGN1bGF0ZUNsaWNrKCkge1xyXG4gICAgY29uc3QgZmVhdHVyZXMgPSB0aGlzLnNlbGVjdGVkRmVhdHVyZXMkLnZhbHVlO1xyXG4gICAgY29uc3QgYXJlYSA9IGZlYXR1cmVzLnJlZHVjZSgoc3VtOiBudW1iZXIsIGZlYXR1cmU6IEZlYXR1cmVXaXRoTWVhc3VyZSkgPT4ge1xyXG4gICAgICByZXR1cm4gc3VtICsgZmVhdHVyZS5wcm9wZXJ0aWVzLm1lYXN1cmUuYXJlYSB8fCAwO1xyXG4gICAgfSwgMCk7XHJcbiAgICBjb25zdCBsZW5ndGggPSBmZWF0dXJlcy5yZWR1Y2UoKHN1bTogbnVtYmVyLCBmZWF0dXJlOiBGZWF0dXJlV2l0aE1lYXN1cmUpID0+IHtcclxuICAgICAgaWYgKGZlYXR1cmUuZ2VvbWV0cnkudHlwZSA9PT0gJ1BvbHlnb24nKSB7XHJcbiAgICAgICAgcmV0dXJuIHN1bTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc3VtICsgZmVhdHVyZS5wcm9wZXJ0aWVzLm1lYXN1cmUubGVuZ3RoIHx8IDA7XHJcbiAgICB9LCAwKTtcclxuICAgIGNvbnN0IHBlcmltZXRlciA9IGZlYXR1cmVzLnJlZHVjZSgoc3VtOiBudW1iZXIsIGZlYXR1cmU6IEZlYXR1cmVXaXRoTWVhc3VyZSkgPT4ge1xyXG4gICAgICBpZiAoZmVhdHVyZS5nZW9tZXRyeS50eXBlID09PSAnTGluZVN0cmluZycpIHtcclxuICAgICAgICByZXR1cm4gc3VtO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzdW0gKyBmZWF0dXJlLnByb3BlcnRpZXMubWVhc3VyZS5sZW5ndGggfHwgMDtcclxuICAgIH0sIDApO1xyXG5cclxuICAgIHRoaXMub3BlbkRpYWxvZyh7XHJcbiAgICAgIGFyZWEsXHJcbiAgICAgIGxlbmd0aCxcclxuICAgICAgcGVyaW1ldGVyXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uRGVsZXRlQ2xpY2soKSB7XHJcbiAgICB0aGlzLnN0b3JlLmRlbGV0ZU1hbnkodGhpcy5zZWxlY3RlZEZlYXR1cmVzJC52YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBvbk1vZGlmeUNsaWNrKCkge1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRGZWF0dXJlcyQudmFsdWUubGVuZ3RoICE9PSAxKSB7IHJldHVybjsgfVxyXG5cclxuICAgIGlmICh0aGlzLm1vZGlmeUNvbnRyb2wuYWN0aXZlID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuZGVhY3RpdmF0ZU1vZGlmeUNvbnRyb2woKTtcclxuICAgICAgdGhpcy50b2dnbGVEcmF3Q29udHJvbCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgZmVhdHVyZSA9IHRoaXMuc2VsZWN0ZWRGZWF0dXJlcyQudmFsdWVbMF07XHJcbiAgICAgIGNvbnN0IG9sRmVhdHVyZXMgPSB0aGlzLnN0b3JlLmxheWVyLm9sLmdldFNvdXJjZSgpLmdldEZlYXR1cmVzKCk7XHJcbiAgICAgIGNvbnN0IG9sRmVhdHVyZSA9IG9sRmVhdHVyZXMuZmluZCgoX29sRmVhdHVyZTogT2xGZWF0dXJlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIF9vbEZlYXR1cmUuZ2V0KCdpZCcpID09PSBmZWF0dXJlLnByb3BlcnRpZXMuaWQ7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKG9sRmVhdHVyZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5kZWFjdGl2YXRlRHJhd0NvbnRyb2woKTtcclxuICAgICAgICB0aGlzLmFjdGl2YXRlTW9kaWZ5Q29udHJvbCgpO1xyXG5cclxuICAgICAgICBjb25zdCBvbEdlb21ldHJ5ID0gb2xGZWF0dXJlLmdldEdlb21ldHJ5KCk7XHJcbiAgICAgICAgdGhpcy5jbGVhclRvb2x0aXBzT2ZPbEdlb21ldHJ5KG9sR2VvbWV0cnkpO1xyXG4gICAgICAgIHRoaXMubW9kaWZ5Q29udHJvbC5zZXRPbEdlb21ldHJ5KG9sR2VvbWV0cnkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9wZW5EaWFsb2coZGF0YTogTWVhc3VyZXJEaWFsb2dEYXRhKTogdm9pZCB7XHJcbiAgICB0aGlzLmRpYWxvZy5vcGVuKE1lYXN1cmVyRGlhbG9nQ29tcG9uZW50LCB7ZGF0YX0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZSB0aGUgbWVhc3VyZSBzdG9yZSBhbmQgc2V0IHVwIHNvbWUgbGlzdGVuZXJzXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBpbml0U3RvcmUoKSB7XHJcbiAgICBjb25zdCBzdG9yZSA9IHRoaXMuc3RvcmU7XHJcblxyXG4gICAgY29uc3QgbGF5ZXIgPSBuZXcgVmVjdG9yTGF5ZXIoe1xyXG4gICAgICB0aXRsZTogJ01lYXN1cmVzJyxcclxuICAgICAgekluZGV4OiAyMDAsXHJcbiAgICAgIHNvdXJjZTogbmV3IEZlYXR1cmVEYXRhU291cmNlKCksXHJcbiAgICAgIHN0eWxlOiBjcmVhdGVNZWFzdXJlTGF5ZXJTdHlsZSgpLFxyXG4gICAgICBzaG93SW5MYXllckxpc3Q6IGZhbHNlLFxyXG4gICAgICBleHBvcnRhYmxlOiBmYWxzZSxcclxuICAgICAgYnJvd3NhYmxlOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICB0cnlCaW5kU3RvcmVMYXllcihzdG9yZSwgbGF5ZXIpO1xyXG5cclxuICAgIHRyeUFkZExvYWRpbmdTdHJhdGVneShzdG9yZSk7XHJcblxyXG4gICAgdHJ5QWRkU2VsZWN0aW9uU3RyYXRlZ3koc3RvcmUsIG5ldyBGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneSh7XHJcbiAgICAgIG1hcDogdGhpcy5tYXAsXHJcbiAgICAgIG1hbnk6IHRydWVcclxuICAgIH0pKTtcclxuXHJcbiAgICB0aGlzLm9uRmVhdHVyZUFkZGVkS2V5ID0gc3RvcmUuc291cmNlLm9sLm9uKCdhZGRmZWF0dXJlJywgKGV2ZW50OiBPbFZlY3RvclNvdXJjZUV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IGZlYXR1cmUgPSBldmVudC5mZWF0dXJlO1xyXG4gICAgICBjb25zdCBvbEdlb21ldHJ5ID0gZmVhdHVyZS5nZXRHZW9tZXRyeSgpO1xyXG4gICAgICB0aGlzLnVwZGF0ZU1lYXN1cmVPZk9sR2VvbWV0cnkob2xHZW9tZXRyeSwgZmVhdHVyZS5nZXQoJ21lYXN1cmUnKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm9uRmVhdHVyZVJlbW92ZWRLZXkgPSBzdG9yZS5zb3VyY2Uub2wub24oJ3JlbW92ZWZlYXR1cmUnLCAoZXZlbnQ6IE9sVmVjdG9yU291cmNlRXZlbnQpID0+IHtcclxuICAgICAgY29uc3Qgb2xHZW9tZXRyeSA9IGV2ZW50LmZlYXR1cmUuZ2V0R2VvbWV0cnkoKTtcclxuICAgICAgdGhpcy5jbGVhclRvb2x0aXBzT2ZPbEdlb21ldHJ5KG9sR2VvbWV0cnkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5zZWxlY3RlZEZlYXR1cmVzJCQgPSBzdG9yZS5zdGF0ZVZpZXcubWFueUJ5JCgocmVjb3JkOiBFbnRpdHlSZWNvcmQ8RmVhdHVyZVdpdGhNZWFzdXJlPikgPT4ge1xyXG4gICAgICByZXR1cm4gcmVjb3JkLnN0YXRlLnNlbGVjdGVkID09PSB0cnVlO1xyXG4gICAgfSkucGlwZShcclxuICAgICAgc2tpcCgxKSAgLy8gU2tpcCBpbml0aWFsIGVtaXNzaW9uXHJcbiAgICApXHJcbiAgICAuc3Vic2NyaWJlKChyZWNvcmRzOiBFbnRpdHlSZWNvcmQ8RmVhdHVyZVdpdGhNZWFzdXJlPltdKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLm1vZGlmeUNvbnRyb2wuYWN0aXZlID09PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5kZWFjdGl2YXRlTW9kaWZ5Q29udHJvbCgpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRGZWF0dXJlcyQubmV4dChyZWNvcmRzLm1hcChyZWNvcmQgPT4gcmVjb3JkLmVudGl0eSkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGcmVlemUgYW55IHN0b3JlLCBtZWFuaW5nIHRoZSBsYXllciBpcyByZW1vdmVkLCBzdHJhdGVnaWVzIGFyZSBkZWFjdGl2YXRlZFxyXG4gICAqIGFuZCBzb21lIGxpc3RlbmVyIHJlbW92ZWRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcml2YXRlIGZyZWV6ZVN0b3JlKCkge1xyXG4gICAgY29uc3Qgc3RvcmUgPSB0aGlzLnN0b3JlO1xyXG4gICAgdGhpcy5zZWxlY3RlZEZlYXR1cmVzJCQudW5zdWJzY3JpYmUoKTtcclxuICAgIHVuQnlLZXkodGhpcy5vbkZlYXR1cmVBZGRlZEtleSk7XHJcbiAgICB1bkJ5S2V5KHRoaXMub25GZWF0dXJlUmVtb3ZlZEtleSk7XHJcbiAgICB0aGlzLmNsZWFyVG9vbHRpcHNPZk9sU291cmNlKHN0b3JlLnNvdXJjZS5vbCk7XHJcbiAgICB0aGlzLm1hcC5yZW1vdmVMYXllcihzdG9yZS5sYXllcik7XHJcbiAgICBzdG9yZS5kZWFjdGl2YXRlU3RyYXRlZ3lPZlR5cGUoRmVhdHVyZVN0b3JlTG9hZGluZ1N0cmF0ZWd5KTtcclxuICAgIHN0b3JlLmRlYWN0aXZhdGVTdHJhdGVneU9mVHlwZShGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYSBkcmF3IGxpbmUgY29udHJvbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgY3JlYXRlRHJhd0xpbmVDb250cm9sKCkge1xyXG4gICAgdGhpcy5kcmF3TGluZUNvbnRyb2wgPSBuZXcgRHJhd0NvbnRyb2woe1xyXG4gICAgICBnZW9tZXRyeVR5cGU6ICdMaW5lU3RyaW5nJyxcclxuICAgICAgc291cmNlOiB0aGlzLm9sRHJhd1NvdXJjZSxcclxuICAgICAgZHJhd1N0eWxlOiBjcmVhdGVNZWFzdXJlSW50ZXJhY3Rpb25TdHlsZSgpLFxyXG4gICAgICBsYXllclN0eWxlOiBuZXcgT2xTdHlsZSh7fSlcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgZHJhdyBwb2x5Z29uIGNvbnRyb2xcclxuICAgKi9cclxuICBwcml2YXRlIGNyZWF0ZURyYXdQb2x5Z29uQ29udHJvbCgpIHtcclxuICAgIHRoaXMuZHJhd1BvbHlnb25Db250cm9sID0gbmV3IERyYXdDb250cm9sKHtcclxuICAgICAgZ2VvbWV0cnlUeXBlOiAnUG9seWdvbicsXHJcbiAgICAgIHNvdXJjZTogdGhpcy5vbERyYXdTb3VyY2UsXHJcbiAgICAgIGRyYXdTdHlsZTogY3JlYXRlTWVhc3VyZUludGVyYWN0aW9uU3R5bGUoKSxcclxuICAgICAgbGF5ZXJTdHlsZTogbmV3IE9sU3R5bGUoe30pXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIGRyYXcgcG9seWdvbiBjb250cm9sXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjcmVhdGVNb2RpZnlDb250cm9sKCkge1xyXG4gICAgdGhpcy5tb2RpZnlDb250cm9sID0gbmV3IE1vZGlmeUNvbnRyb2woe1xyXG4gICAgICBzb3VyY2U6IHRoaXMub2xEcmF3U291cmNlLFxyXG4gICAgICBkcmF3U3R5bGU6IGNyZWF0ZU1lYXN1cmVJbnRlcmFjdGlvblN0eWxlKCksXHJcbiAgICAgIGxheWVyU3R5bGU6IG5ldyBPbFN0eWxlKHt9KVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBY3RpdmF0ZSB0aGUgcmlnaHQgY29udHJvbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgdG9nZ2xlRHJhd0NvbnRyb2woKSB7XHJcbiAgICB0aGlzLmRlYWN0aXZhdGVEcmF3Q29udHJvbCgpO1xyXG4gICAgLy8gdGhpcy5kZWFjdGl2YXRlTW9kaWZ5Q29udHJvbCgpO1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlTWVhc3VyZVR5cGUgPT09IE1lYXN1cmVUeXBlLkxlbmd0aCkge1xyXG4gICAgICB0aGlzLmFjdGl2YXRlRHJhd0NvbnRyb2wodGhpcy5kcmF3TGluZUNvbnRyb2wpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmFjdGl2ZU1lYXN1cmVUeXBlID09PSBNZWFzdXJlVHlwZS5BcmVhKSB7XHJcbiAgICAgIHRoaXMuYWN0aXZhdGVEcmF3Q29udHJvbCh0aGlzLmRyYXdQb2x5Z29uQ29udHJvbCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBY3RpdmF0ZSBhIGdpdmVuIGNvbnRyb2xcclxuICAgKiBAcGFyYW0gZHJhd0NvbnRyb2wgRHJhdyBjb250cm9sXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhY3RpdmF0ZURyYXdDb250cm9sKGRyYXdDb250cm9sOiBEcmF3Q29udHJvbCkge1xyXG4gICAgdGhpcy5hY3RpdmVEcmF3Q29udHJvbCA9IGRyYXdDb250cm9sO1xyXG4gICAgdGhpcy5kcmF3U3RhcnQkJCA9IGRyYXdDb250cm9sLnN0YXJ0JFxyXG4gICAgICAuc3Vic2NyaWJlKChvbEdlb21ldHJ5OiBPbExpbmVTdHJpbmcgfCBPbFBvbHlnb24pID0+IHRoaXMub25EcmF3U3RhcnQob2xHZW9tZXRyeSkpO1xyXG4gICAgdGhpcy5kcmF3RW5kJCQgPSBkcmF3Q29udHJvbC5lbmQkXHJcbiAgICAgIC5zdWJzY3JpYmUoKG9sR2VvbWV0cnk6IE9sTGluZVN0cmluZyB8IE9sUG9seWdvbikgPT4gdGhpcy5vbkRyYXdFbmQob2xHZW9tZXRyeSkpO1xyXG4gICAgdGhpcy5kcmF3Q2hhbmdlcyQkID0gZHJhd0NvbnRyb2wuY2hhbmdlcyRcclxuICAgICAgLnN1YnNjcmliZSgob2xHZW9tZXRyeTogT2xMaW5lU3RyaW5nIHwgT2xQb2x5Z29uKSA9PiB0aGlzLm9uRHJhd0NoYW5nZXMob2xHZW9tZXRyeSkpO1xyXG5cclxuICAgIGRyYXdDb250cm9sLnNldE9sTWFwKHRoaXMubWFwLm9sKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlYWN0aXZhdGUgdGhlIGFjdGl2ZSBkcmF3IGNvbnRyb2xcclxuICAgKi9cclxuICBwcml2YXRlIGRlYWN0aXZhdGVEcmF3Q29udHJvbCgpIHtcclxuICAgIGlmICh0aGlzLmFjdGl2ZURyYXdDb250cm9sID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub2xEcmF3U291cmNlLmNsZWFyKCk7XHJcbiAgICBpZiAodGhpcy5kcmF3U3RhcnQkJCAhPT0gdW5kZWZpbmVkICkgeyB0aGlzLmRyYXdTdGFydCQkLnVuc3Vic2NyaWJlKCk7IH1cclxuICAgIGlmICh0aGlzLmRyYXdFbmQkJCAhPT0gdW5kZWZpbmVkICkgeyB0aGlzLmRyYXdFbmQkJC51bnN1YnNjcmliZSgpOyB9XHJcbiAgICBpZiAodGhpcy5kcmF3Q2hhbmdlcyQkICE9PSB1bmRlZmluZWQgKSB7IHRoaXMuZHJhd0NoYW5nZXMkJC51bnN1YnNjcmliZSgpOyB9XHJcblxyXG4gICAgdGhpcy5jbGVhclRvb2x0aXBzT2ZPbFNvdXJjZSh0aGlzLm9sRHJhd1NvdXJjZSk7XHJcbiAgICBpZiAodGhpcy5hY3RpdmVPbEdlb21ldHJ5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5jbGVhclRvb2x0aXBzT2ZPbEdlb21ldHJ5KHRoaXMuYWN0aXZlT2xHZW9tZXRyeSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmFjdGl2ZURyYXdDb250cm9sLnNldE9sTWFwKHVuZGVmaW5lZCk7XHJcbiAgICB0aGlzLmFjdGl2ZURyYXdDb250cm9sID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5hY3RpdmVPbEdlb21ldHJ5ID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRBY3RpdmVNZWFzdXJlVHlwZShtZWFzdXJlVHlwZTogTWVhc3VyZVR5cGUpIHtcclxuICAgIHRoaXMuX2FjdGl2ZU1lYXN1cmVUeXBlID0gbWVhc3VyZVR5cGU7XHJcbiAgICB0aGlzLmNsZWFyTWVhc3VyZXMoKTtcclxuICAgIHRoaXMudG9nZ2xlRHJhd0NvbnRyb2woKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBkcmF3IHNvdXJjZSBhbmQgdHJhY2sgdGhlIGdlb21ldHJ5IGJlaW5nIGRyYXduXHJcbiAgICogQHBhcmFtIG9sR2VvbWV0cnkgT2wgbGluZXN0cmluZyBvciBwb2x5Z29uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkRyYXdTdGFydChvbEdlb21ldHJ5OiBPbExpbmVTdHJpbmcgfCBPbFBvbHlnb24pIHtcclxuICAgIHRoaXMuYWN0aXZlT2xHZW9tZXRyeSA9IG9sR2VvbWV0cnk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgZHJhdyBzb3VyY2UgYW5kIHRyYWNrIHRoZSBnZW9tZXRyeSBiZWluZyBkcmF3XHJcbiAgICogQHBhcmFtIG9sR2VvbWV0cnkgT2wgbGluZXN0cmluZyBvciBwb2x5Z29uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkRyYXdFbmQob2xHZW9tZXRyeTogT2xMaW5lU3RyaW5nIHwgT2xQb2x5Z29uKSB7XHJcbiAgICB0aGlzLmFjdGl2ZU9sR2VvbWV0cnkgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLmZpbmFsaXplTWVhc3VyZU9mT2xHZW9tZXRyeShvbEdlb21ldHJ5KTtcclxuICAgIHRoaXMuYWRkRmVhdHVyZVRvU3RvcmUob2xHZW9tZXRyeSk7XHJcbiAgICB0aGlzLmNsZWFyVG9vbHRpcHNPZk9sR2VvbWV0cnkob2xHZW9tZXRyeSk7XHJcbiAgICB0aGlzLm9sRHJhd1NvdXJjZS5jbGVhcih0cnVlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSBtZWFzdXJlcyBvYnNlcnZhYmxlcyBhbmQgbWFwIHRvb2x0aXBzXHJcbiAgICogQHBhcmFtIG9sR2VvbWV0cnkgT2wgbGluZXN0cmluZyBvciBwb2x5Z29uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkRyYXdDaGFuZ2VzKG9sR2VvbWV0cnk6IE9sTGluZVN0cmluZyB8IE9sUG9seWdvbikge1xyXG4gICAgY29uc3QgbWVhc3VyZSA9IG1lYXN1cmVPbEdlb21ldHJ5KG9sR2VvbWV0cnksIHRoaXMucHJvamVjdGlvbik7XHJcbiAgICB0aGlzLnVwZGF0ZU1lYXN1cmVPZk9sR2VvbWV0cnkob2xHZW9tZXRyeSwgT2JqZWN0LmFzc2lnbih7fSwgbWVhc3VyZSwge1xyXG4gICAgICBhcmVhOiB1bmRlZmluZWQgIC8vIFdlIGRvbid0IHdhbnQgdG8gZGlzcGxheSBhbiBhcmVhIHRvb2x0aXAgd2hpbGUgZHJhd2luZy5cclxuICAgIH0pKTtcclxuICAgIHRoaXMubWVhc3VyZSQubmV4dChtZWFzdXJlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjdGl2YXRlIGEgZ2l2ZW4gY29udHJvbFxyXG4gICAqIEBwYXJhbSBtb2RpZnlDb250cm9sIE1vZGlmeSBjb250cm9sXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhY3RpdmF0ZU1vZGlmeUNvbnRyb2woKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLnN0b3JlLmdldFN0cmF0ZWd5T2ZUeXBlKEZlYXR1cmVTdG9yZVNlbGVjdGlvblN0cmF0ZWd5KSBhcyBGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneTtcclxuICAgIHNlbGVjdGlvbi5kZWFjdGl2YXRlKCk7XHJcbiAgICBzZWxlY3Rpb24uY2xlYXIoKTtcclxuXHJcbiAgICB0aGlzLm1vZGlmeVN0YXJ0JCQgPSB0aGlzLm1vZGlmeUNvbnRyb2wuc3RhcnQkXHJcbiAgICAgIC5zdWJzY3JpYmUoKG9sR2VvbWV0cnk6IE9sTGluZVN0cmluZyB8IE9sUG9seWdvbikgPT4gdGhpcy5vbk1vZGlmeVN0YXJ0KG9sR2VvbWV0cnkpKTtcclxuICAgIHRoaXMubW9kaWZ5RW5kJCQgPSB0aGlzLm1vZGlmeUNvbnRyb2wuZW5kJFxyXG4gICAgICAuc3Vic2NyaWJlKChvbEdlb21ldHJ5OiBPbExpbmVTdHJpbmcgfCBPbFBvbHlnb24pID0+IHRoaXMub25Nb2RpZnlFbmQob2xHZW9tZXRyeSkpO1xyXG4gICAgdGhpcy5tb2RpZnlDaGFuZ2VzJCQgPSB0aGlzLm1vZGlmeUNvbnRyb2wuY2hhbmdlcyRcclxuICAgICAgLnN1YnNjcmliZSgob2xHZW9tZXRyeTogT2xMaW5lU3RyaW5nIHwgT2xQb2x5Z29uKSA9PiB0aGlzLm9uTW9kaWZ5Q2hhbmdlcyhvbEdlb21ldHJ5KSk7XHJcbiAgICB0aGlzLm1vZGlmeUNvbnRyb2wuc2V0T2xNYXAodGhpcy5tYXAub2wpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVhY3RpdmF0ZSB0aGUgYWN0aXZlIG1vZGlmeSBjb250cm9sXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkZWFjdGl2YXRlTW9kaWZ5Q29udHJvbCgpIHtcclxuICAgIGlmICh0aGlzLm1vZGlmeVN0YXJ0JCQgIT09IHVuZGVmaW5lZCApIHsgdGhpcy5tb2RpZnlTdGFydCQkLnVuc3Vic2NyaWJlKCk7IH1cclxuICAgIGlmICh0aGlzLm1vZGlmeUVuZCQkICE9PSB1bmRlZmluZWQgKSB7IHRoaXMubW9kaWZ5RW5kJCQudW5zdWJzY3JpYmUoKTsgfVxyXG4gICAgaWYgKHRoaXMubW9kaWZ5Q2hhbmdlcyQkICE9PSB1bmRlZmluZWQgKSB7IHRoaXMubW9kaWZ5Q2hhbmdlcyQkLnVuc3Vic2NyaWJlKCk7IH1cclxuXHJcbiAgICBpZiAodGhpcy5hY3RpdmVPbEdlb21ldHJ5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRGZWF0dXJlcyQudmFsdWUubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgY29uc3QgZmVhdHVyZSA9IHRoaXMuc2VsZWN0ZWRGZWF0dXJlcyQudmFsdWVbMF07XHJcbiAgICAgICAgdGhpcy5hZGRGZWF0dXJlVG9TdG9yZSh0aGlzLmFjdGl2ZU9sR2VvbWV0cnksIGZlYXR1cmUpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZmluYWxpemVNZWFzdXJlT2ZPbEdlb21ldHJ5KHRoaXMuYWN0aXZlT2xHZW9tZXRyeSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vbERyYXdTb3VyY2UuY2xlYXIoKTtcclxuXHJcbiAgICB0aGlzLnN0b3JlLmFjdGl2YXRlU3RyYXRlZ3lPZlR5cGUoRmVhdHVyZVN0b3JlU2VsZWN0aW9uU3RyYXRlZ3kpO1xyXG5cclxuICAgIHRoaXMuYWN0aXZlT2xHZW9tZXRyeSA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMubW9kaWZ5Q29udHJvbC5zZXRPbE1hcCh1bmRlZmluZWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhlIGRyYXcgc291cmNlIGFuZCB0cmFjayB0aGUgZ2VvbWV0cnkgYmVpbmcgZHJhd25cclxuICAgKiBAcGFyYW0gb2xHZW9tZXRyeSBPbCBsaW5lc3RyaW5nIG9yIHBvbHlnb25cclxuICAgKi9cclxuICBwcml2YXRlIG9uTW9kaWZ5U3RhcnQob2xHZW9tZXRyeTogT2xMaW5lU3RyaW5nIHwgT2xQb2x5Z29uKSB7XHJcbiAgICB0aGlzLm9uRHJhd1N0YXJ0KG9sR2VvbWV0cnkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIG1lYXN1cmVzIG9ic2VydmFibGVzIGFuZCBtYXAgdG9vbHRpcHNcclxuICAgKiBAcGFyYW0gb2xHZW9tZXRyeSBPbCBsaW5lc3RyaW5nIG9yIHBvbHlnb25cclxuICAgKi9cclxuICBwcml2YXRlIG9uTW9kaWZ5Q2hhbmdlcyhvbEdlb21ldHJ5OiBPbExpbmVTdHJpbmcgfCBPbFBvbHlnb24pIHtcclxuICAgIHRoaXMub25EcmF3Q2hhbmdlcyhvbEdlb21ldHJ5KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBkcmF3IHNvdXJjZSBhbmQgdHJhY2sgdGhlIGdlb21ldHJ5IGJlaW5nIGRyYXdcclxuICAgKiBAcGFyYW0gb2xHZW9tZXRyeSBPbCBsaW5lc3RyaW5nIG9yIHBvbHlnb25cclxuICAgKi9cclxuICBwcml2YXRlIG9uTW9kaWZ5RW5kKG9sR2VvbWV0cnk6IE9sTGluZVN0cmluZyB8IE9sUG9seWdvbikge1xyXG4gICAgdGhpcy5maW5hbGl6ZU1lYXN1cmVPZk9sR2VvbWV0cnkob2xHZW9tZXRyeSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZpbmFsaXplTWVhc3VyZU9mT2xHZW9tZXRyeShvbEdlb21ldHJ5OiBPbExpbmVTdHJpbmcgfCBPbFBvbHlnb24pIHtcclxuICAgIGxldCBtZWFzdXJlID0gbWVhc3VyZU9sR2VvbWV0cnkob2xHZW9tZXRyeSwgdGhpcy5wcm9qZWN0aW9uKTtcclxuICAgIGlmIChvbEdlb21ldHJ5IGluc3RhbmNlb2YgT2xQb2x5Z29uKSB7XHJcbiAgICAgIG1lYXN1cmUgPSBPYmplY3QuYXNzaWduKHt9LCBtZWFzdXJlLCB7XHJcbiAgICAgICAgbGVuZ3RoczogW10gIC8vIFdlIGRvbid0IHdhbnQgdG8gZGlzcGxheSBhbiBhcmVhIHRvb2x0aXAgd2hpbGUgZHJhd2luZy5cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnVwZGF0ZU1lYXN1cmVPZk9sR2VvbWV0cnkob2xHZW9tZXRyeSwgbWVhc3VyZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgbWVhc3VyZXMgb2JzZXJ2YWJsZXNcclxuICAgKiBAcGFyYW0gb2xHZW9tZXRyeSBPbCBsaW5lc3RyaW5nIG9yIHBvbHlnb25cclxuICAgKiBAcGFyYW0gbWVhc3VyZSBNZWFzdXJlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1cGRhdGVNZWFzdXJlT2ZPbEdlb21ldHJ5KG9sR2VvbWV0cnk6IE9sTGluZVN0cmluZyB8IE9sUG9seWdvbiwgbWVhc3VyZTogTWVhc3VyZSkge1xyXG4gICAgb2xHZW9tZXRyeS5zZXRQcm9wZXJ0aWVzKHtfbWVhc3VyZTogbWVhc3VyZX0sIHRydWUpO1xyXG4gICAgdGhpcy51cGRhdGVUb29sdGlwc09mT2xHZW9tZXRyeShvbEdlb21ldHJ5KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBtZWFzdXJlcyBvYnNlcnZhYmxlc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgY2xlYXJNZWFzdXJlcygpIHtcclxuICAgIHRoaXMubWVhc3VyZSQubmV4dCh7fSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYSBmZWF0dXJlIHdpdGggbWVhc3VyZXMgdG8gdGhlIHN0b3JlLiBUaGUgbG9hZGluZyBzdHJhZ2VneSBvZiB0aGUgc3RvcmVcclxuICAgKiB3aWxsIHRyaWdnZXIgYW5kIGFkZCB0aGUgZmVhdHVyZSB0byB0aGUgbWFwLlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkRmVhdHVyZVRvU3RvcmUob2xHZW9tZXRyeTogT2xMaW5lU3RyaW5nIHwgT2xQb2x5Z29uLCBmZWF0dXJlPzogRmVhdHVyZVdpdGhNZWFzdXJlKSB7XHJcbiAgICBjb25zdCBmZWF0dXJlSWQgPSBmZWF0dXJlID8gZmVhdHVyZS5wcm9wZXJ0aWVzLmlkIDogdXVpZCgpO1xyXG4gICAgY29uc3QgcHJvamVjdGlvbiA9IHRoaXMubWFwLm9sLmdldFZpZXcoKS5nZXRQcm9qZWN0aW9uKCk7XHJcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBPbEdlb0pTT04oKS53cml0ZUdlb21ldHJ5T2JqZWN0KG9sR2VvbWV0cnksIHtcclxuICAgICAgZmVhdHVyZVByb2plY3Rpb246IHByb2plY3Rpb24sXHJcbiAgICAgIGRhdGFQcm9qZWN0aW9uOiBwcm9qZWN0aW9uXHJcbiAgICB9KTtcclxuICAgIHRoaXMuc3RvcmUudXBkYXRlKHtcclxuICAgICAgdHlwZTogRkVBVFVSRSxcclxuICAgICAgZ2VvbWV0cnksXHJcbiAgICAgIHByb2plY3Rpb246IHByb2plY3Rpb24uZ2V0Q29kZSgpLFxyXG4gICAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgaWQ6IGZlYXR1cmVJZCxcclxuICAgICAgICBtZWFzdXJlOiBvbEdlb21ldHJ5LmdldCgnX21lYXN1cmUnKVxyXG4gICAgICB9LFxyXG4gICAgICBtZXRhOiB7XHJcbiAgICAgICAgaWQ6IGZlYXR1cmVJZFxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSBhbGwgdGhlIHRvb2x0aXBzIG9mIGFuIE9MIGdlb21ldHJ5XHJcbiAgICogQHBhcmFtIG9sR2VvbWV0cnkgT0wgR2VvbWV0cnlcclxuICAgKiBAcGFyYW0gbGVuZ3RocyBMZW5ndGhzIG9mIHRoZSBPTCBnZW9tZXRyeSdzIHNlZ21lbnRzXHJcbiAgICogQHBhcmFtIG1lYXN1cmVVbml0IERpc3BsYXkgdG9vbHRpcCBtZWFzdXJlIGluIHRob3NlIHVuaXRzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1cGRhdGVUb29sdGlwc09mT2xHZW9tZXRyeShvbEdlb21ldHJ5OiBPbExpbmVTdHJpbmcgfCBPbFBvbHlnb24pIHtcclxuICAgIGNvbnN0IG1lYXN1cmUgPSBvbEdlb21ldHJ5LmdldCgnX21lYXN1cmUnKTtcclxuICAgIGNvbnN0IGxlbmd0aHMgPSBtZWFzdXJlLmxlbmd0aHM7XHJcbiAgICBjb25zdCBhcmVhID0gbWVhc3VyZS5hcmVhO1xyXG5cclxuICAgIGNvbnN0IG9sTWlkcG9pbnRzVG9vbHRpcHMgPSB1cGRhdGVPbFRvb2x0aXBzQXRNaWRwb2ludHMob2xHZW9tZXRyeSk7XHJcbiAgICBpZiAobGVuZ3Rocy5sZW5ndGggPT09IG9sTWlkcG9pbnRzVG9vbHRpcHMubGVuZ3RoKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2xNaWRwb2ludHNUb29sdGlwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IGxlbmd0aHNbaV07XHJcbiAgICAgICAgaWYgKGxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZU9sVG9vbHRpcChcclxuICAgICAgICAgICAgb2xNaWRwb2ludHNUb29sdGlwc1tpXSxcclxuICAgICAgICAgICAgbWV0ZXJzVG9Vbml0KGxlbmd0aCwgdGhpcy5hY3RpdmVMZW5ndGhVbml0KSxcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVMZW5ndGhVbml0LFxyXG4gICAgICAgICAgICBNZWFzdXJlVHlwZS5MZW5ndGhcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGFyZWEgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnVwZGF0ZU9sVG9vbHRpcChcclxuICAgICAgICB1cGRhdGVPbFRvb2x0aXBBdENlbnRlcihvbEdlb21ldHJ5KSxcclxuICAgICAgICBzcXVhcmVNZXRlcnNUb1VuaXQoYXJlYSwgIHRoaXMuYWN0aXZlQXJlYVVuaXQpLFxyXG4gICAgICAgIHRoaXMuYWN0aXZlQXJlYVVuaXQsXHJcbiAgICAgICAgTWVhc3VyZVR5cGUuQXJlYVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2hvdyB0aGUgbWFwIHRvb2x0aXBzIG9mIGEgZ2VvZW10cnlcclxuICAgKi9cclxuICBwcml2YXRlIHNob3dUb29sdGlwc09mT2xHZW9tZXRyeShvbEdlb21ldHJ5OiBPbExpbmVTdHJpbmcgfCBPbFBvbHlnb24pIHtcclxuICAgIGdldFRvb2x0aXBzT2ZPbEdlb21ldHJ5KG9sR2VvbWV0cnkpLmZvckVhY2goKG9sVG9vbHRpcDogT2xPdmVybGF5IHwgdW5kZWZpbmVkKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnNob3VsZFNob3dUb29sdGlwKG9sVG9vbHRpcCkpIHtcclxuICAgICAgICB0aGlzLm1hcC5vbC5hZGRPdmVybGF5KG9sVG9vbHRpcCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhlIHRvb2x0aXBzIG9mIGFuIE9MIGdlb21ldHJ5c1xyXG4gICAqIEBwYXJhbSBvbEdlb21ldHJ5IE9MIGdlb21ldHJ5IHdpdGggdG9vbHRpcHNcclxuICAgKi9cclxuICBwcml2YXRlIGNsZWFyVG9vbHRpcHNPZk9sR2VvbWV0cnkob2xHZW9tZXRyeTogT2xMaW5lU3RyaW5nIHwgT2xQb2x5Z29uKSB7XHJcbiAgICBnZXRUb29sdGlwc09mT2xHZW9tZXRyeShvbEdlb21ldHJ5KS5mb3JFYWNoKChvbFRvb2x0aXA6IE9sT3ZlcmxheSB8IHVuZGVmaW5lZCkgPT4ge1xyXG4gICAgICBpZiAob2xUb29sdGlwICE9PSB1bmRlZmluZWQgJiYgb2xUb29sdGlwLmdldE1hcCgpICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLm1hcC5vbC5yZW1vdmVPdmVybGF5KG9sVG9vbHRpcCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2hvdyB0aGUgbWFwIHRvb2x0aXBzIG9mIGFsbCB0aGUgZ2VvbWV0cmllcyBvZiBhIHNvdXJjZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgdXBkYXRlVG9vbHRpcHNPZk9sU291cmNlKG9sU291cmNlOiBPbFZlY3RvclNvdXJjZSkge1xyXG4gICAgb2xTb3VyY2UuZm9yRWFjaEZlYXR1cmUoKG9sRmVhdHVyZTogT2xGZWF0dXJlKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlVG9vbHRpcHNPZk9sR2VvbWV0cnkob2xGZWF0dXJlLmdldEdlb21ldHJ5KCkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTaG93IHRoZSBtYXAgdG9vbHRpcHMgb2YgYWxsIHRoZSBnZW9tZXRyaWVzIG9mIGEgc291cmNlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzaG93VG9vbHRpcHNPZk9sU291cmNlKG9sU291cmNlOiBPbFZlY3RvclNvdXJjZSkge1xyXG4gICAgb2xTb3VyY2UuZm9yRWFjaEZlYXR1cmUoKG9sRmVhdHVyZTogT2xGZWF0dXJlKSA9PiB7XHJcbiAgICAgIHRoaXMuc2hvd1Rvb2x0aXBzT2ZPbEdlb21ldHJ5KG9sRmVhdHVyZS5nZXRHZW9tZXRyeSgpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhlIG1hcCB0b29sdGlwc1xyXG4gICAqIEBwYXJhbSBvbERyYXdTb3VyY2UgT0wgdmVjdG9yIHNvdXJjZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgY2xlYXJUb29sdGlwc09mT2xTb3VyY2Uob2xTb3VyY2U6IE9sVmVjdG9yU291cmNlKSB7XHJcbiAgICBvbFNvdXJjZS5mb3JFYWNoRmVhdHVyZSgob2xGZWF0dXJlOiBPbEZlYXR1cmUpID0+IHtcclxuICAgICAgY29uc3Qgb2xHZW9tZXRyeSA9IG9sRmVhdHVyZS5nZXRHZW9tZXRyeSgpO1xyXG4gICAgICBpZiAob2xHZW9tZXRyeSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhclRvb2x0aXBzT2ZPbEdlb21ldHJ5KG9sRmVhdHVyZS5nZXRHZW9tZXRyeSgpKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgYW4gT0wgdG9vbHRpcCBwcm9wZXJ0aWVzIGFuZCBpbm5lciBIVE1MIGFuZCBhZGQgaXQgdG8gdGhlIG1hcCBpZiBwb3NzaWJsZVxyXG4gICAqIEBwYXJhbSBvbFRvb2x0aXAgT0wgdG9vbHRpcFxyXG4gICAqIEBwYXJhbSBtZWFzdXJlIFRoZSBtZWFzdXJlIHZhbGV1IHRpIGRpc3BsYXlcclxuICAgKiBAcGFyYW0gbWVhc3VyZVVuaXQgRGlzcGxheSB0b29sdGlwIG1lYXN1cmUgaW4gdGhvc2UgdW5pdHNcclxuICAgKi9cclxuICBwcml2YXRlIHVwZGF0ZU9sVG9vbHRpcChcclxuICAgIG9sVG9vbHRpcDogT2xPdmVybGF5LFxyXG4gICAgbWVhc3VyZTogbnVtYmVyLFxyXG4gICAgdW5pdDogTWVhc3VyZUFyZWFVbml0IHwgTWVhc3VyZUxlbmd0aFVuaXQsXHJcbiAgICB0eXBlOiBNZWFzdXJlVHlwZVxyXG4gICkge1xyXG4gICAgb2xUb29sdGlwLnNldFByb3BlcnRpZXMoe19tZWFzdXJlOiBtZWFzdXJlLCBfdW5pdDogdW5pdCwgX3R5cGU6IHR5cGV9LCB0cnVlKTtcclxuICAgIG9sVG9vbHRpcC5nZXRFbGVtZW50KCkuaW5uZXJIVE1MID0gdGhpcy5jb21wdXRlVG9vbHRpcElubmVySFRNTChvbFRvb2x0aXApO1xyXG4gICAgaWYgKHRoaXMuc2hvdWxkU2hvd1Rvb2x0aXAob2xUb29sdGlwKSkge1xyXG4gICAgICB0aGlzLm1hcC5vbC5hZGRPdmVybGF5KG9sVG9vbHRpcCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb21wdXRlIGEgdG9vbHRpcCdzIGNvbnRlbnRcclxuICAgKiBAcGFyYW0gb2xUb29sdGlwIE9MIG92ZXJsYXlcclxuICAgKiBAcmV0dXJucyBJbm5lciBIVE1MXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjb21wdXRlVG9vbHRpcElubmVySFRNTChvbFRvb2x0aXA6IE9sT3ZlcmxheSk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gb2xUb29sdGlwLmdldFByb3BlcnRpZXMoKSBhcyBhbnk7XHJcbiAgICByZXR1cm4gZm9ybWF0TWVhc3VyZShwcm9wZXJ0aWVzLl9tZWFzdXJlLCB7XHJcbiAgICAgIGRlY2ltYWw6IDEsXHJcbiAgICAgIHVuaXQ6IHByb3BlcnRpZXMuX3VuaXQsXHJcbiAgICAgIHVuaXRBYmJyOiB0cnVlLFxyXG4gICAgICBsb2NhbGU6ICdmcidcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBhIHRvb2x0aXAgc2hvdWxkIGJlIHNob3duZWQgYmFzZWQgb24gdGhlIGxlbmd0aFxyXG4gICAqIG9mIHRoZSBzZWdtZW50IGl0IGlzIGJvdW5kIHRvLlxyXG4gICAqIEBwYXJhbSBvbFRvb2x0aXAgT0wgb3ZlcmxheVxyXG4gICAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHRvb2x0aXAgc2hvdWxkIGJlIHNob3duXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzaG91bGRTaG93VG9vbHRpcChvbFRvb2x0aXA6IE9sT3ZlcmxheSk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHRoaXMuc2hvd1Rvb2x0aXBzID09PSBmYWxzZSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcHJvcGVydGllcyA9IG9sVG9vbHRpcC5nZXRQcm9wZXJ0aWVzKCkgYXMgYW55O1xyXG4gICAgY29uc3QgbWVhc3VyZSA9IHByb3BlcnRpZXMuX21lYXN1cmU7XHJcbiAgICBpZiAobWVhc3VyZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocHJvcGVydGllcy5fdW5pdCA9PT0gTWVhc3VyZVR5cGUuTGVuZ3RoKSB7XHJcbiAgICAgIGNvbnN0IG1pblNlZ21lbnRMZW5ndGggPSBtZXRlcnNUb1VuaXQodGhpcy5taW5TZWdtZW50TGVuZ3RoLCBwcm9wZXJ0aWVzLl91bml0KSB8fCAwO1xyXG4gICAgICByZXR1cm4gbWVhc3VyZSA+IE1hdGgubWF4KG1pblNlZ21lbnRMZW5ndGgsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufVxyXG4iXX0=