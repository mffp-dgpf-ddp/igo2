/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import OlFeature from 'ol/Feature';
import OlVectorSource from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';
import OlModify from 'ol/interaction/Modify';
import OlTranslate from 'ol/interaction/Translate';
import OlDraw from 'ol/interaction/Draw';
import OlPolygon from 'ol/geom/Polygon';
import OlLinearRing from 'ol/geom/LinearRing';
import OlDragBoxInteraction from 'ol/interaction/DragBox';
import { unByKey } from 'ol/Observable';
import { Subject, fromEvent } from 'rxjs';
import { addLinearRingToOlPolygon, createDrawHoleInteractionStyle, getMousePositionFromOlGeometryEvent } from '../geometry.utils';
/**
 * @record
 */
export function ModifyControlOptions() { }
if (false) {
    /** @type {?|undefined} */
    ModifyControlOptions.prototype.source;
    /** @type {?|undefined} */
    ModifyControlOptions.prototype.layer;
    /** @type {?|undefined} */
    ModifyControlOptions.prototype.layerStyle;
    /** @type {?|undefined} */
    ModifyControlOptions.prototype.drawStyle;
    /** @type {?|undefined} */
    ModifyControlOptions.prototype.modify;
    /** @type {?|undefined} */
    ModifyControlOptions.prototype.translate;
}
/**
 * Control to modify geometries
 */
export class ModifyControl {
    /**
     * @param {?} options
     */
    constructor(options) {
        this.options = options;
        /**
         * Modify start observable
         */
        this.start$ = new Subject();
        /**
         * Modify end observable
         */
        this.end$ = new Subject();
        /**
         * Geometry changes observable
         */
        this.changes$ = new Subject();
        this.olModifyInteractionIsActive = false;
        this.olTranslateInteractionIsActive = false;
        this.olDrawInteractionIsActive = false;
        this.removedOlInteractions = [];
        /**
         * Whether a modify control should be available
         */
        this.modify = true;
        /**
         * Whether a translate control should be available
         */
        this.translate = true;
        if (options.modify !== undefined) {
            this.modify = options.modify;
        }
        if (options.translate !== undefined) {
            this.translate = options.translate;
        }
        if (options.layer !== undefined) {
            this.olOverlayLayer = options.layer;
        }
        else {
            this.olOverlayLayer = this.createOlInnerOverlayLayer();
        }
        this.olLinearRingsLayer = this.createOlLinearRingsLayer();
    }
    /**
     * Wheter the control is active
     * @return {?}
     */
    get active() {
        return this.olMap !== undefined;
    }
    /**
     * OL overlay source
     * \@internal
     * @return {?}
     */
    get olOverlaySource() {
        return this.olOverlayLayer.getSource();
    }
    /**
     * OL linear rings source
     * \@internal
     * @return {?}
     */
    get olLinearRingsSource() {
        return this.olLinearRingsLayer.getSource();
    }
    /**
     * Add or remove this control to/from a map.
     * @param {?} olMap
     * @return {?}
     */
    setOlMap(olMap) {
        if (olMap === undefined) {
            this.clearOlInnerOverlaySource();
            this.removeOlInnerOverlayLayer();
            this.removeOlModifyInteraction();
            this.removeOlTranslateInteraction();
            this.removeOlDrawInteraction();
            this.olMap = olMap;
            return;
        }
        this.olMap = olMap;
        this.addOlInnerOverlayLayer();
        // The order in which these interactions
        // are added is important
        if (this.modify === true) {
            this.addOlDrawInteraction();
        }
        if (this.translate === true) {
            this.addOlTranslateInteraction();
            this.activateTranslateInteraction();
        }
        if (this.modify === true) {
            this.addOlModifyInteraction();
            this.activateModifyInteraction();
        }
    }
    /**
     * Return the overlay source
     * @return {?}
     */
    getSource() {
        return this.olOverlaySource;
    }
    /**
     * Add an OL geometry to the overlay and start modifying it
     * @param {?} olGeometry Ol Geometry
     * @return {?}
     */
    setOlGeometry(olGeometry) {
        /** @type {?} */
        const olFeature = new OlFeature({ geometry: olGeometry });
        this.olOverlaySource.clear();
        this.olOverlaySource.addFeature(olFeature);
    }
    /**
     * Create an overlay source if none is defined in the options
     * @private
     * @return {?}
     */
    createOlInnerOverlayLayer() {
        return new OlVectorLayer({
            source: this.options.source ? this.options.source : new OlVectorSource(),
            style: this.options.layerStyle,
            zIndex: 500
        });
    }
    /**
     * Add the overlay layer if it wasn't defined in the options
     * @private
     * @return {?}
     */
    addOlInnerOverlayLayer() {
        if (this.options.layer === undefined) {
            this.olMap.addLayer(this.olOverlayLayer);
        }
    }
    /**
     * Clear the overlay layer if it wasn't defined in the options
     * @private
     * @return {?}
     */
    removeOlInnerOverlayLayer() {
        if (this.options.layer === undefined && this.olMap !== undefined) {
            this.olMap.removeLayer(this.olOverlayLayer);
        }
    }
    /**
     * Clear the overlay source if it wasn't defined in the options
     * @private
     * @return {?}
     */
    clearOlInnerOverlaySource() {
        if (this.options.layer === undefined && this.options.source === undefined) {
            this.olOverlaySource.clear(true);
        }
    }
    /**
     * @private
     * @return {?}
     */
    createOlLinearRingsLayer() {
        return new OlVectorLayer({
            source: new OlVectorSource(),
            style: createDrawHoleInteractionStyle(),
            zIndex: 500
        });
    }
    /**
     * Add the linear rings layer
     * @private
     * @return {?}
     */
    addOlLinearRingsLayer() {
        this.olMap.addLayer(this.olLinearRingsLayer);
    }
    /**
     * Clear the linear rings layer
     * @private
     * @return {?}
     */
    removeOlLinearRingsLayer() {
        this.olMap.removeLayer(this.olLinearRingsLayer);
    }
    /**
     * Clear the linear rings source
     * @private
     * @return {?}
     */
    clearOlLinearRingsSource() {
        this.olLinearRingsSource.clear(true);
    }
    /**
     * Add a modify interaction to the map an set up some listeners
     * @private
     * @return {?}
     */
    addOlModifyInteraction() {
        /** @type {?} */
        const olModifyInteraction = new OlModify({
            source: this.olOverlaySource,
            style: this.options.drawStyle
        });
        this.olModifyInteraction = olModifyInteraction;
    }
    /**
     * Remove the modify interaction
     * @private
     * @return {?}
     */
    removeOlModifyInteraction() {
        if (this.olModifyInteraction === undefined) {
            return;
        }
        this.deactivateModifyInteraction();
        this.olModifyInteraction = undefined;
    }
    /**
     * @private
     * @return {?}
     */
    activateModifyInteraction() {
        if (this.olModifyInteractionIsActive === true) {
            return;
        }
        this.olModifyInteractionIsActive = true;
        this.onModifyStartKey = this.olModifyInteraction
            .on('modifystart', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => this.onModifyStart(event)));
        this.onModifyEndKey = this.olModifyInteraction
            .on('modifyend', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => this.onModifyEnd(event)));
        this.olMap.addInteraction(this.olModifyInteraction);
    }
    /**
     * @private
     * @return {?}
     */
    deactivateModifyInteraction() {
        if (this.olModifyInteractionIsActive === false) {
            return;
        }
        this.olModifyInteractionIsActive = false;
        unByKey([
            this.onModifyStartKey,
            this.onModifyEndKey,
            this.onModifyKey
        ]);
        if (this.olMap !== undefined) {
            this.olMap.removeInteraction(this.olModifyInteraction);
        }
    }
    /**
     * When modifying starts, clear the overlay and start watching for changes
     * @private
     * @param {?} event Modify start event
     * @return {?}
     */
    onModifyStart(event) {
        /** @type {?} */
        const olGeometry = event.features.item(0).getGeometry();
        this.start$.next(olGeometry);
        this.onModifyKey = olGeometry.on('change', (/**
         * @param {?} olGeometryEvent
         * @return {?}
         */
        (olGeometryEvent) => {
            this.mousePosition = getMousePositionFromOlGeometryEvent(olGeometryEvent);
            this.changes$.next(olGeometryEvent.target);
        }));
        this.subscribeToKeyDown();
    }
    /**
     * When modifying ends, update the geometry observable and stop watching for changes
     * @private
     * @param {?} event Modify end event
     * @return {?}
     */
    onModifyEnd(event) {
        unByKey(this.onModifyKey);
        this.end$.next(event.features.item(0).getGeometry());
        this.unsubscribeToKeyDown();
    }
    /**
     * Subscribe to space key down to pan the map
     * @private
     * @return {?}
     */
    subscribeToKeyDown() {
        this.keyDown$$ = fromEvent(document, 'keydown').subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (event.keyCode === 32) {
                // On space bar, pan to the current mouse position
                this.olMap.getView().animate({
                    center: this.mousePosition,
                    duration: 0
                });
                return;
            }
        }));
    }
    /**
     * Unsubscribe to key down
     * @private
     * @return {?}
     */
    unsubscribeToKeyDown() {
        if (this.keyDown$$ !== undefined) {
            this.keyDown$$.unsubscribe();
        }
    }
    /**
     * Add a translate interaction to the map an set up some listeners
     * @private
     * @return {?}
     */
    addOlTranslateInteraction() {
        /** @type {?} */
        const olTranslateInteraction = new OlTranslate({
            layers: [this.olOverlayLayer]
        });
        this.olTranslateInteraction = olTranslateInteraction;
    }
    /**
     * Remove the translate interaction
     * @private
     * @return {?}
     */
    removeOlTranslateInteraction() {
        if (this.olTranslateInteraction === undefined) {
            return;
        }
        this.deactivateTranslateInteraction();
        this.olTranslateInteraction = undefined;
    }
    /**
     * @private
     * @return {?}
     */
    activateTranslateInteraction() {
        if (this.olTranslateInteractionIsActive === true) {
            return;
        }
        this.olTranslateInteractionIsActive = true;
        this.onTranslateStartKey = this.olTranslateInteraction
            .on('translatestart', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => this.onTranslateStart(event)));
        this.onTranslateEndKey = this.olTranslateInteraction
            .on('translateend', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => this.onTranslateEnd(event)));
        this.olMap.addInteraction(this.olTranslateInteraction);
    }
    /**
     * @private
     * @return {?}
     */
    deactivateTranslateInteraction() {
        if (this.olTranslateInteractionIsActive === false) {
            return;
        }
        this.olTranslateInteractionIsActive = false;
        unByKey([
            this.onTranslateStartKey,
            this.onTranslateEndKey,
            this.onTranslateKey
        ]);
        if (this.olMap !== undefined) {
            this.olMap.removeInteraction(this.olTranslateInteraction);
        }
    }
    /**
     * When translation starts, clear the overlay and start watching for changes
     * @private
     * @param {?} event Translate start event
     * @return {?}
     */
    onTranslateStart(event) {
        /** @type {?} */
        const olGeometry = event.features.item(0).getGeometry();
        this.start$.next(olGeometry);
        this.onTranslateKey = olGeometry.on('change', (/**
         * @param {?} olGeometryEvent
         * @return {?}
         */
        (olGeometryEvent) => {
            this.changes$.next(olGeometryEvent.target);
        }));
    }
    /**
     * When translation ends, update the geometry observable and stop watchign for changes
     * @private
     * @param {?} event Translate end event
     * @return {?}
     */
    onTranslateEnd(event) {
        unByKey(this.onTranslateKey);
        this.end$.next(event.features.item(0).getGeometry());
    }
    /**
     * Add a draw interaction to the map an set up some listeners
     * @private
     * @return {?}
     */
    addOlDrawInteraction() {
        /** @type {?} */
        const olDrawInteraction = new OlDraw({
            type: 'Polygon',
            source: this.olLinearRingsSource,
            stopClick: true,
            style: createDrawHoleInteractionStyle(),
            condition: (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                /** @type {?} */
                const olOuterGeometry = this.olOuterGeometry || this.getOlGeometry();
                /** @type {?} */
                const intersects = olOuterGeometry.intersectsCoordinate(event.coordinate);
                return intersects;
            })
        });
        this.olDrawInteraction = olDrawInteraction;
        this.subscribeToDrawKeyDown();
    }
    /**
     * Subscribe to CTRL key down to activate the draw control
     * @private
     * @return {?}
     */
    subscribeToDrawKeyDown() {
        this.drawKeyDown$$ = fromEvent(document, 'keydown').subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (event.keyCode !== 17) {
                return;
            }
            this.unsubscribeToDrawKeyDown();
            /** @type {?} */
            const olGeometry = this.getOlGeometry();
            if (!olGeometry || !(olGeometry instanceof OlPolygon)) {
                return;
            }
            this.subscribeToDrawKeyUp();
            this.deactivateModifyInteraction();
            this.deactivateTranslateInteraction();
            this.activateDrawInteraction();
        }));
    }
    /**
     * Subscribe to CTRL key up to deactivate the draw control
     * @private
     * @return {?}
     */
    subscribeToDrawKeyUp() {
        this.drawKeyUp$$ = fromEvent(document, 'keyup')
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (event.keyCode !== 17) {
                return;
            }
            this.unsubscribeToDrawKeyUp();
            this.unsubscribeToKeyDown();
            this.deactivateDrawInteraction();
            this.activateModifyInteraction();
            if (this.translate === true) {
                this.activateTranslateInteraction();
            }
            this.subscribeToDrawKeyDown();
            this.olOuterGeometry = undefined;
            this.clearOlLinearRingsSource();
            this.end$.next(this.getOlGeometry());
        }));
    }
    /**
     * Unsubscribe to draw key down
     * @private
     * @return {?}
     */
    unsubscribeToDrawKeyDown() {
        if (this.drawKeyDown$$ !== undefined) {
            this.drawKeyDown$$.unsubscribe();
        }
    }
    /**
     * Unsubscribe to key up
     * @private
     * @return {?}
     */
    unsubscribeToDrawKeyUp() {
        if (this.drawKeyUp$$ !== undefined) {
            this.drawKeyUp$$.unsubscribe();
        }
    }
    /**
     * Remove the draw interaction
     * @private
     * @return {?}
     */
    removeOlDrawInteraction() {
        if (this.olDrawInteraction === undefined) {
            return;
        }
        this.unsubscribeToKeyDown();
        this.unsubscribeToDrawKeyUp();
        this.unsubscribeToDrawKeyDown();
        this.deactivateDrawInteraction();
        this.clearOlLinearRingsSource();
        this.olDrawInteraction = undefined;
    }
    /**
     * Activate the draw interaction
     * @private
     * @return {?}
     */
    activateDrawInteraction() {
        if (this.olDrawInteractionIsActive === true) {
            return;
        }
        this.clearOlLinearRingsSource();
        this.addOlLinearRingsLayer();
        this.olMap.getInteractions().forEach((/**
         * @param {?} olInteraction
         * @return {?}
         */
        (olInteraction) => {
            if (olInteraction instanceof OlDragBoxInteraction) {
                this.olMap.removeInteraction(olInteraction);
                this.removedOlInteractions.push(olInteraction);
            }
        }));
        this.olDrawInteractionIsActive = true;
        this.onDrawStartKey = this.olDrawInteraction
            .on('drawstart', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => this.onDrawStart(event)));
        this.onDrawEndKey = this.olDrawInteraction
            .on('drawend', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => this.onDrawEnd(event)));
        this.olMap.addInteraction(this.olDrawInteraction);
    }
    /**
     * Deactivate the draw interaction
     * @private
     * @return {?}
     */
    deactivateDrawInteraction() {
        if (this.olDrawInteractionIsActive === false) {
            return;
        }
        this.removeOlLinearRingsLayer();
        this.removedOlInteractions.forEach((/**
         * @param {?} olInteraction
         * @return {?}
         */
        (olInteraction) => {
            this.olMap.addInteraction(olInteraction);
        }));
        this.removedOlInteractions = [];
        this.olDrawInteractionIsActive = false;
        unByKey([
            this.onDrawStartKey,
            this.onDrawEndKey,
            this.onDrawKey
        ]);
        if (this.olMap !== undefined) {
            this.olMap.removeInteraction(this.olDrawInteraction);
        }
    }
    /**
     * When draw start, add a new linerar ring to the geometry and start watching for changes
     * @private
     * @param {?} event Draw start event
     * @return {?}
     */
    onDrawStart(event) {
        /** @type {?} */
        const olGeometry = event.feature.getGeometry();
        this.olOuterGeometry = this.getOlGeometry().clone();
        /** @type {?} */
        const linearRingCoordinates = olGeometry.getLinearRing().getCoordinates();
        this.addLinearRingToOlGeometry(linearRingCoordinates);
        this.start$.next(this.getOlGeometry());
        this.onDrawKey = olGeometry.on('change', (/**
         * @param {?} olGeometryEvent
         * @return {?}
         */
        (olGeometryEvent) => {
            this.mousePosition = getMousePositionFromOlGeometryEvent(olGeometryEvent);
            /** @type {?} */
            const _linearRingCoordinates = olGeometryEvent.target.getLinearRing().getCoordinates();
            this.updateLinearRingOfOlGeometry(_linearRingCoordinates);
            this.changes$.next(this.getOlGeometry());
        }));
        this.subscribeToKeyDown();
    }
    /**
     * When translation ends, update the geometry observable and stop watchign for changes
     * @private
     * @param {?} event Draw end event
     * @return {?}
     */
    onDrawEnd(event) {
        unByKey(this.onDrawKey);
        this.olOuterGeometry = undefined;
        /** @type {?} */
        const linearRingCoordinates = event.feature.getGeometry().getLinearRing().getCoordinates();
        this.updateLinearRingOfOlGeometry(linearRingCoordinates);
        this.clearOlLinearRingsSource();
        this.end$.next(this.getOlGeometry());
        this.unsubscribeToKeyDown();
    }
    /**
     * Add a linear ring to the geometry being modified
     * @private
     * @param {?} coordinates Linear ring coordinates
     * @return {?}
     */
    addLinearRingToOlGeometry(coordinates) {
        /** @type {?} */
        const olGeometry = this.getOlGeometry();
        /** @type {?} */
        const olLinearRing = new OlLinearRing(coordinates);
        addLinearRingToOlPolygon(olGeometry, olLinearRing);
    }
    /**
     * Update the last linear ring of the geometry being modified
     * @private
     * @param {?} coordinates Linear ring coordinates
     * @return {?}
     */
    updateLinearRingOfOlGeometry(coordinates) {
        /** @type {?} */
        const olGeometry = this.getOlGeometry();
        // Remove the last linear ring (the one we are updating)
        /** @type {?} */
        const olLinearRings = olGeometry.getLinearRings().slice(0, -1);
        /** @type {?} */
        const newCoordinates = olLinearRings.map((/**
         * @param {?} olLinearRing
         * @return {?}
         */
        (olLinearRing) => {
            return olLinearRing.getCoordinates();
        }));
        newCoordinates.push(coordinates);
        olGeometry.setCoordinates(newCoordinates);
    }
    /**
     * Get the geometry being modified
     * @private
     * @return {?} OL Geometry
     */
    getOlGeometry() {
        /** @type {?} */
        const olFeatures = this.olOverlaySource.getFeatures();
        return olFeatures.length > 0 ? olFeatures[0].getGeometry() : undefined;
    }
}
if (false) {
    /**
     * Modify start observable
     * @type {?}
     */
    ModifyControl.prototype.start$;
    /**
     * Modify end observable
     * @type {?}
     */
    ModifyControl.prototype.end$;
    /**
     * Geometry changes observable
     * @type {?}
     */
    ModifyControl.prototype.changes$;
    /**
     * @type {?}
     * @private
     */
    ModifyControl.prototype.olMap;
    /**
     * @type {?}
     * @private
     */
    ModifyControl.prototype.olOverlayLayer;
    /** @type {?} */
    ModifyControl.prototype.olModifyInteraction;
    /**
     * @type {?}
     * @private
     */
    ModifyControl.prototype.onModifyStartKey;
    /**
     * @type {?}
     * @private
     */
    ModifyControl.prototype.onModifyEndKey;
    /**
     * @type {?}
     * @private
     */
    ModifyControl.prototype.onModifyKey;
    /**
     * @type {?}
     * @private
     */
    ModifyControl.prototype.olModifyInteractionIsActive;
    /**
     * @type {?}
     * @private
     */
    ModifyControl.prototype.olTranslateInteraction;
    /**
     * @type {?}
     * @private
     */
    ModifyControl.prototype.onTranslateStartKey;
    /**
     * @type {?}
     * @private
     */
    ModifyControl.prototype.onTranslateEndKey;
    /**
     * @type {?}
     * @private
     */
    ModifyControl.prototype.onTranslateKey;
    /**
     * @type {?}
     * @private
     */
    ModifyControl.prototype.olTranslateInteractionIsActive;
    /**
     * @type {?}
     * @private
     */
    ModifyControl.prototype.olDrawInteraction;
    /**
     * @type {?}
     * @private
     */
    ModifyControl.prototype.onDrawStartKey;
    /**
     * @type {?}
     * @private
     */
    ModifyControl.prototype.onDrawEndKey;
    /**
     * @type {?}
     * @private
     */
    ModifyControl.prototype.onDrawKey;
    /**
     * @type {?}
     * @private
     */
    ModifyControl.prototype.olDrawInteractionIsActive;
    /**
     * @type {?}
     * @private
     */
    ModifyControl.prototype.mousePosition;
    /**
     * @type {?}
     * @private
     */
    ModifyControl.prototype.keyDown$$;
    /**
     * @type {?}
     * @private
     */
    ModifyControl.prototype.drawKeyUp$$;
    /**
     * @type {?}
     * @private
     */
    ModifyControl.prototype.drawKeyDown$$;
    /**
     * @type {?}
     * @private
     */
    ModifyControl.prototype.removedOlInteractions;
    /**
     * @type {?}
     * @private
     */
    ModifyControl.prototype.olLinearRingsLayer;
    /**
     * @type {?}
     * @private
     */
    ModifyControl.prototype.olOuterGeometry;
    /**
     * Whether a modify control should be available
     * @type {?}
     * @private
     */
    ModifyControl.prototype.modify;
    /**
     * Whether a translate control should be available
     * @type {?}
     * @private
     */
    ModifyControl.prototype.translate;
    /**
     * @type {?}
     * @private
     */
    ModifyControl.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZ5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2dlb21ldHJ5L3NoYXJlZC9jb250cm9scy9tb2RpZnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sU0FBUyxNQUFNLFlBQVksQ0FBQztBQUVuQyxPQUFPLGNBQWMsTUFBTSxrQkFBa0IsQ0FBQztBQUM5QyxPQUFPLGFBQWEsTUFBTSxpQkFBaUIsQ0FBQztBQUM1QyxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLFNBQVMsTUFBTSxpQkFBaUIsQ0FBQztBQUN4QyxPQUFPLFlBQVksTUFBTSxvQkFBb0IsQ0FBQztBQUU5QyxPQUFPLG9CQUFvQixNQUFNLHdCQUF3QixDQUFDO0FBUzFELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFeEMsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXhELE9BQU8sRUFDTCx3QkFBd0IsRUFDeEIsOEJBQThCLEVBQzlCLG1DQUFtQyxFQUNwQyxNQUFNLG1CQUFtQixDQUFDOzs7O0FBRTNCLDBDQU9DOzs7SUFOQyxzQ0FBd0I7O0lBQ3hCLHFDQUFzQjs7SUFDdEIsMENBQTJEOztJQUMzRCx5Q0FBMEQ7O0lBQzFELHNDQUFpQjs7SUFDakIseUNBQW9COzs7OztBQU10QixNQUFNLE9BQU8sYUFBYTs7OztJQWdGeEIsWUFBb0IsT0FBNkI7UUFBN0IsWUFBTyxHQUFQLE9BQU8sQ0FBc0I7Ozs7UUEzRTFDLFdBQU0sR0FBd0IsSUFBSSxPQUFPLEVBQUUsQ0FBQzs7OztRQUs1QyxTQUFJLEdBQXdCLElBQUksT0FBTyxFQUFFLENBQUM7Ozs7UUFLMUMsYUFBUSxHQUF3QixJQUFJLE9BQU8sRUFBRSxDQUFDO1FB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QUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUN6RSxDQUFDO0NBRUY7Ozs7OztJQTlsQkMsK0JBQW1EOzs7OztJQUtuRCw2QkFBaUQ7Ozs7O0lBS2pELGlDQUFxRDs7Ozs7SUFFckQsOEJBQXFCOzs7OztJQUNyQix1Q0FBc0M7O0lBQ3RDLDRDQUFxQzs7Ozs7SUFDckMseUNBQWlDOzs7OztJQUNqQyx1Q0FBK0I7Ozs7O0lBQy9CLG9DQUE0Qjs7Ozs7SUFDNUIsb0RBQXFEOzs7OztJQUNyRCwrQ0FBNEM7Ozs7O0lBQzVDLDRDQUFvQzs7Ozs7SUFDcEMsMENBQWtDOzs7OztJQUNsQyx1Q0FBK0I7Ozs7O0lBQy9CLHVEQUF3RDs7Ozs7SUFDeEQsMENBQXVDOzs7OztJQUN2Qyx1Q0FBK0I7Ozs7O0lBQy9CLHFDQUE2Qjs7Ozs7SUFDN0Isa0NBQTBCOzs7OztJQUMxQixrREFBbUQ7Ozs7O0lBRW5ELHNDQUF3Qzs7Ozs7SUFFeEMsa0NBQWdDOzs7OztJQUNoQyxvQ0FBa0M7Ozs7O0lBQ2xDLHNDQUFvQzs7Ozs7SUFFcEMsOENBQW9EOzs7OztJQUNwRCwyQ0FBMEM7Ozs7O0lBRzFDLHdDQUFvQzs7Ozs7O0lBNEJwQywrQkFBK0I7Ozs7OztJQUsvQixrQ0FBa0M7Ozs7O0lBRXRCLGdDQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBPbE1hcCBmcm9tICdvbC9NYXAnO1xyXG5pbXBvcnQgT2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5pbXBvcnQgT2xTdHlsZSBmcm9tICdvbC9zdHlsZSc7XHJcbmltcG9ydCBPbFZlY3RvclNvdXJjZSBmcm9tICdvbC9zb3VyY2UvVmVjdG9yJztcclxuaW1wb3J0IE9sVmVjdG9yTGF5ZXIgZnJvbSAnb2wvbGF5ZXIvVmVjdG9yJztcclxuaW1wb3J0IE9sTW9kaWZ5IGZyb20gJ29sL2ludGVyYWN0aW9uL01vZGlmeSc7XHJcbmltcG9ydCBPbFRyYW5zbGF0ZSBmcm9tICdvbC9pbnRlcmFjdGlvbi9UcmFuc2xhdGUnO1xyXG5pbXBvcnQgT2xEcmF3IGZyb20gJ29sL2ludGVyYWN0aW9uL0RyYXcnO1xyXG5pbXBvcnQgT2xQb2x5Z29uIGZyb20gJ29sL2dlb20vUG9seWdvbic7XHJcbmltcG9ydCBPbExpbmVhclJpbmcgZnJvbSAnb2wvZ2VvbS9MaW5lYXJSaW5nJztcclxuaW1wb3J0IE9sSW50ZXJhY3Rpb24gZnJvbSAnb2wvaW50ZXJhY3Rpb24vSW50ZXJhY3Rpb24nO1xyXG5pbXBvcnQgT2xEcmFnQm94SW50ZXJhY3Rpb24gZnJvbSAnb2wvaW50ZXJhY3Rpb24vRHJhZ0JveCc7XHJcbmltcG9ydCB7IE1hcEJyb3dzZXJFdmVudCBhcyBPbE1hcEJyb3dzZXJFdmVudCB9IGZyb20gJ29sL01hcEJyb3dzZXJFdmVudCc7XHJcbmltcG9ydCB7XHJcbiAgR2VvbWV0cnkgYXMgT2xHZW9tZXRyeSxcclxuICBHZW9tZXRyeUV2ZW50IGFzIE9sR2VvbWV0cnlFdmVudFxyXG59IGZyb20gJ29sL2dlb20vR2VvbWV0cnknO1xyXG5pbXBvcnQgeyBNb2RpZnlFdmVudCBhcyBPbE1vZGlmeUV2ZW50IH0gZnJvbSAnb2wvaW50ZXJhY3Rpb24vTW9kaWZ5JztcclxuaW1wb3J0IHsgVHJhbnNsYXRlRXZlbnQgYXMgT2xUcmFuc2xhdGVFdmVudCB9IGZyb20gJ29sL2ludGVyYWN0aW9uL1RyYW5zbGF0ZSc7XHJcbmltcG9ydCB7IERyYXdFdmVudCBhcyBPbERyYXdFdmVudCB9IGZyb20gJ29sL2ludGVyYWN0aW9uL0RyYXcnO1xyXG5pbXBvcnQgeyB1bkJ5S2V5IH0gZnJvbSAnb2wvT2JzZXJ2YWJsZSc7XHJcblxyXG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24sIGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHtcclxuICBhZGRMaW5lYXJSaW5nVG9PbFBvbHlnb24sXHJcbiAgY3JlYXRlRHJhd0hvbGVJbnRlcmFjdGlvblN0eWxlLFxyXG4gIGdldE1vdXNlUG9zaXRpb25Gcm9tT2xHZW9tZXRyeUV2ZW50XHJcbn0gZnJvbSAnLi4vZ2VvbWV0cnkudXRpbHMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNb2RpZnlDb250cm9sT3B0aW9ucyB7XHJcbiAgc291cmNlPzogT2xWZWN0b3JTb3VyY2U7XHJcbiAgbGF5ZXI/OiBPbFZlY3RvckxheWVyO1xyXG4gIGxheWVyU3R5bGU/OiBPbFN0eWxlIHwgKChvbGZlYXR1cmU6IE9sRmVhdHVyZSkgPT4gT2xTdHlsZSk7XHJcbiAgZHJhd1N0eWxlPzogT2xTdHlsZSB8ICgob2xmZWF0dXJlOiBPbEZlYXR1cmUpID0+IE9sU3R5bGUpO1xyXG4gIG1vZGlmeT86IGJvb2xlYW47XHJcbiAgdHJhbnNsYXRlPzogYm9vbGVhbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnRyb2wgdG8gbW9kaWZ5IGdlb21ldHJpZXNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNb2RpZnlDb250cm9sIHtcclxuXHJcbiAgLyoqXHJcbiAgICogTW9kaWZ5IHN0YXJ0IG9ic2VydmFibGVcclxuICAgKi9cclxuICBwdWJsaWMgc3RhcnQkOiBTdWJqZWN0PE9sR2VvbWV0cnk+ID0gbmV3IFN1YmplY3QoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogTW9kaWZ5IGVuZCBvYnNlcnZhYmxlXHJcbiAgICovXHJcbiAgcHVibGljIGVuZCQ6IFN1YmplY3Q8T2xHZW9tZXRyeT4gPSBuZXcgU3ViamVjdCgpO1xyXG5cclxuICAvKipcclxuICAgKiBHZW9tZXRyeSBjaGFuZ2VzIG9ic2VydmFibGVcclxuICAgKi9cclxuICBwdWJsaWMgY2hhbmdlcyQ6IFN1YmplY3Q8T2xHZW9tZXRyeT4gPSBuZXcgU3ViamVjdCgpO1xyXG5cclxuICBwcml2YXRlIG9sTWFwOiBPbE1hcDtcclxuICBwcml2YXRlIG9sT3ZlcmxheUxheWVyOiBPbFZlY3RvckxheWVyO1xyXG4gIHB1YmxpYyBvbE1vZGlmeUludGVyYWN0aW9uOiBPbE1vZGlmeTtcclxuICBwcml2YXRlIG9uTW9kaWZ5U3RhcnRLZXk6IHN0cmluZztcclxuICBwcml2YXRlIG9uTW9kaWZ5RW5kS2V5OiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBvbk1vZGlmeUtleTogc3RyaW5nO1xyXG4gIHByaXZhdGUgb2xNb2RpZnlJbnRlcmFjdGlvbklzQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBvbFRyYW5zbGF0ZUludGVyYWN0aW9uOiBPbFRyYW5zbGF0ZTtcclxuICBwcml2YXRlIG9uVHJhbnNsYXRlU3RhcnRLZXk6IHN0cmluZztcclxuICBwcml2YXRlIG9uVHJhbnNsYXRlRW5kS2V5OiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBvblRyYW5zbGF0ZUtleTogc3RyaW5nO1xyXG4gIHByaXZhdGUgb2xUcmFuc2xhdGVJbnRlcmFjdGlvbklzQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBvbERyYXdJbnRlcmFjdGlvbjogT2xUcmFuc2xhdGU7XHJcbiAgcHJpdmF0ZSBvbkRyYXdTdGFydEtleTogc3RyaW5nO1xyXG4gIHByaXZhdGUgb25EcmF3RW5kS2V5OiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBvbkRyYXdLZXk6IHN0cmluZztcclxuICBwcml2YXRlIG9sRHJhd0ludGVyYWN0aW9uSXNBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgcHJpdmF0ZSBtb3VzZVBvc2l0aW9uOiBbbnVtYmVyLCBudW1iZXJdO1xyXG5cclxuICBwcml2YXRlIGtleURvd24kJDogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgZHJhd0tleVVwJCQ6IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIGRyYXdLZXlEb3duJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgcHJpdmF0ZSByZW1vdmVkT2xJbnRlcmFjdGlvbnM6IE9sSW50ZXJhY3Rpb25bXSA9IFtdO1xyXG4gIHByaXZhdGUgb2xMaW5lYXJSaW5nc0xheWVyOiBPbFZlY3RvckxheWVyO1xyXG5cclxuICAvLyBUaGlzIGlzIHRoZSBnZW9tZXRyeSB0byB0ZXN0IGFnYWluc3Qgd2hlbiBkcmF3aW5nIGhvbGVzXHJcbiAgcHJpdmF0ZSBvbE91dGVyR2VvbWV0cnk6IE9sR2VvbWV0cnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRlciB0aGUgY29udHJvbCBpcyBhY3RpdmVcclxuICAgKi9cclxuICBnZXQgYWN0aXZlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMub2xNYXAgIT09IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9MIG92ZXJsYXkgc291cmNlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IG9sT3ZlcmxheVNvdXJjZSgpOiBPbFZlY3RvclNvdXJjZSB7XHJcbiAgICByZXR1cm4gdGhpcy5vbE92ZXJsYXlMYXllci5nZXRTb3VyY2UoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9MIGxpbmVhciByaW5ncyBzb3VyY2VcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgb2xMaW5lYXJSaW5nc1NvdXJjZSgpOiBPbFZlY3RvclNvdXJjZSB7XHJcbiAgICByZXR1cm4gdGhpcy5vbExpbmVhclJpbmdzTGF5ZXIuZ2V0U291cmNlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGEgbW9kaWZ5IGNvbnRyb2wgc2hvdWxkIGJlIGF2YWlsYWJsZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgbW9kaWZ5OiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBhIHRyYW5zbGF0ZSBjb250cm9sIHNob3VsZCBiZSBhdmFpbGFibGVcclxuICAgKi9cclxuICBwcml2YXRlIHRyYW5zbGF0ZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgb3B0aW9uczogTW9kaWZ5Q29udHJvbE9wdGlvbnMpIHtcclxuICAgIGlmIChvcHRpb25zLm1vZGlmeSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMubW9kaWZ5ID0gb3B0aW9ucy5tb2RpZnk7XHJcbiAgICB9XHJcbiAgICBpZiAob3B0aW9ucy50cmFuc2xhdGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnRyYW5zbGF0ZSA9IG9wdGlvbnMudHJhbnNsYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRpb25zLmxheWVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbE92ZXJsYXlMYXllciA9IG9wdGlvbnMubGF5ZXI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm9sT3ZlcmxheUxheWVyID0gdGhpcy5jcmVhdGVPbElubmVyT3ZlcmxheUxheWVyKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9sTGluZWFyUmluZ3NMYXllciA9IHRoaXMuY3JlYXRlT2xMaW5lYXJSaW5nc0xheWVyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgb3IgcmVtb3ZlIHRoaXMgY29udHJvbCB0by9mcm9tIGEgbWFwLlxyXG4gICAqIEBwYXJhbSBtYXAgT0wgTWFwXHJcbiAgICovXHJcbiAgc2V0T2xNYXAob2xNYXA6IE9sTWFwIHwgdW5kZWZpbmVkKSB7XHJcbiAgICBpZiAob2xNYXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmNsZWFyT2xJbm5lck92ZXJsYXlTb3VyY2UoKTtcclxuICAgICAgdGhpcy5yZW1vdmVPbElubmVyT3ZlcmxheUxheWVyKCk7XHJcbiAgICAgIHRoaXMucmVtb3ZlT2xNb2RpZnlJbnRlcmFjdGlvbigpO1xyXG4gICAgICB0aGlzLnJlbW92ZU9sVHJhbnNsYXRlSW50ZXJhY3Rpb24oKTtcclxuICAgICAgdGhpcy5yZW1vdmVPbERyYXdJbnRlcmFjdGlvbigpO1xyXG4gICAgICB0aGlzLm9sTWFwID0gb2xNYXA7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9sTWFwID0gb2xNYXA7XHJcbiAgICB0aGlzLmFkZE9sSW5uZXJPdmVybGF5TGF5ZXIoKTtcclxuXHJcbiAgICAvLyBUaGUgb3JkZXIgaW4gd2hpY2ggdGhlc2UgaW50ZXJhY3Rpb25zXHJcbiAgICAvLyBhcmUgYWRkZWQgaXMgaW1wb3J0YW50XHJcbiAgICBpZiAodGhpcy5tb2RpZnkgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5hZGRPbERyYXdJbnRlcmFjdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnRyYW5zbGF0ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmFkZE9sVHJhbnNsYXRlSW50ZXJhY3Rpb24oKTtcclxuICAgICAgdGhpcy5hY3RpdmF0ZVRyYW5zbGF0ZUludGVyYWN0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMubW9kaWZ5ID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuYWRkT2xNb2RpZnlJbnRlcmFjdGlvbigpO1xyXG4gICAgICB0aGlzLmFjdGl2YXRlTW9kaWZ5SW50ZXJhY3Rpb24oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiB0aGUgb3ZlcmxheSBzb3VyY2VcclxuICAgKi9cclxuICBnZXRTb3VyY2UoKTogT2xWZWN0b3JTb3VyY2Uge1xyXG4gICAgcmV0dXJuIHRoaXMub2xPdmVybGF5U291cmNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGFuIE9MIGdlb21ldHJ5IHRvIHRoZSBvdmVybGF5IGFuZCBzdGFydCBtb2RpZnlpbmcgaXRcclxuICAgKiBAcGFyYW0gb2xHZW9tZXRyeSBPbCBHZW9tZXRyeVxyXG4gICAqL1xyXG4gIHNldE9sR2VvbWV0cnkob2xHZW9tZXRyeTogT2xHZW9tZXRyeSkge1xyXG4gICAgY29uc3Qgb2xGZWF0dXJlID0gbmV3IE9sRmVhdHVyZSh7Z2VvbWV0cnk6IG9sR2VvbWV0cnl9KTtcclxuICAgIHRoaXMub2xPdmVybGF5U291cmNlLmNsZWFyKCk7XHJcbiAgICB0aGlzLm9sT3ZlcmxheVNvdXJjZS5hZGRGZWF0dXJlKG9sRmVhdHVyZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYW4gb3ZlcmxheSBzb3VyY2UgaWYgbm9uZSBpcyBkZWZpbmVkIGluIHRoZSBvcHRpb25zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjcmVhdGVPbElubmVyT3ZlcmxheUxheWVyKCk6IE9sVmVjdG9yTGF5ZXIge1xyXG4gICAgcmV0dXJuIG5ldyBPbFZlY3RvckxheWVyKHtcclxuICAgICAgc291cmNlOiB0aGlzLm9wdGlvbnMuc291cmNlID8gdGhpcy5vcHRpb25zLnNvdXJjZSA6IG5ldyBPbFZlY3RvclNvdXJjZSgpLFxyXG4gICAgICBzdHlsZTogdGhpcy5vcHRpb25zLmxheWVyU3R5bGUsXHJcbiAgICAgIHpJbmRleDogNTAwXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCB0aGUgb3ZlcmxheSBsYXllciBpZiBpdCB3YXNuJ3QgZGVmaW5lZCBpbiB0aGUgb3B0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkT2xJbm5lck92ZXJsYXlMYXllcigpOiBPbFZlY3RvckxheWVyIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMubGF5ZXIgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9sTWFwLmFkZExheWVyKHRoaXMub2xPdmVybGF5TGF5ZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhlIG92ZXJsYXkgbGF5ZXIgaWYgaXQgd2Fzbid0IGRlZmluZWQgaW4gdGhlIG9wdGlvbnNcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZU9sSW5uZXJPdmVybGF5TGF5ZXIoKSB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmxheWVyID09PSB1bmRlZmluZWQgJiYgdGhpcy5vbE1hcCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2xNYXAucmVtb3ZlTGF5ZXIodGhpcy5vbE92ZXJsYXlMYXllcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgb3ZlcmxheSBzb3VyY2UgaWYgaXQgd2Fzbid0IGRlZmluZWQgaW4gdGhlIG9wdGlvbnNcclxuICAgKi9cclxuICBwcml2YXRlIGNsZWFyT2xJbm5lck92ZXJsYXlTb3VyY2UoKSB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmxheWVyID09PSB1bmRlZmluZWQgJiYgdGhpcy5vcHRpb25zLnNvdXJjZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2xPdmVybGF5U291cmNlLmNsZWFyKHRydWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVPbExpbmVhclJpbmdzTGF5ZXIoKTogT2xWZWN0b3JMYXllciB7XHJcbiAgICByZXR1cm4gbmV3IE9sVmVjdG9yTGF5ZXIoe1xyXG4gICAgICBzb3VyY2U6IG5ldyBPbFZlY3RvclNvdXJjZSgpLFxyXG4gICAgICBzdHlsZTogY3JlYXRlRHJhd0hvbGVJbnRlcmFjdGlvblN0eWxlKCksXHJcbiAgICAgIHpJbmRleDogNTAwXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCB0aGUgbGluZWFyIHJpbmdzIGxheWVyXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRPbExpbmVhclJpbmdzTGF5ZXIoKSB7XHJcbiAgICB0aGlzLm9sTWFwLmFkZExheWVyKHRoaXMub2xMaW5lYXJSaW5nc0xheWVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBsaW5lYXIgcmluZ3MgbGF5ZXJcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZU9sTGluZWFyUmluZ3NMYXllcigpIHtcclxuICAgIHRoaXMub2xNYXAucmVtb3ZlTGF5ZXIodGhpcy5vbExpbmVhclJpbmdzTGF5ZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhlIGxpbmVhciByaW5ncyBzb3VyY2VcclxuICAgKi9cclxuICBwcml2YXRlIGNsZWFyT2xMaW5lYXJSaW5nc1NvdXJjZSgpIHtcclxuICAgIHRoaXMub2xMaW5lYXJSaW5nc1NvdXJjZS5jbGVhcih0cnVlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhIG1vZGlmeSBpbnRlcmFjdGlvbiB0byB0aGUgbWFwIGFuIHNldCB1cCBzb21lIGxpc3RlbmVyc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkT2xNb2RpZnlJbnRlcmFjdGlvbigpIHtcclxuICAgIGNvbnN0IG9sTW9kaWZ5SW50ZXJhY3Rpb24gPSBuZXcgT2xNb2RpZnkoe1xyXG4gICAgICBzb3VyY2U6IHRoaXMub2xPdmVybGF5U291cmNlLFxyXG4gICAgICBzdHlsZTogdGhpcy5vcHRpb25zLmRyYXdTdHlsZVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLm9sTW9kaWZ5SW50ZXJhY3Rpb24gPSBvbE1vZGlmeUludGVyYWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIHRoZSBtb2RpZnkgaW50ZXJhY3Rpb25cclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZU9sTW9kaWZ5SW50ZXJhY3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5vbE1vZGlmeUludGVyYWN0aW9uID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZGVhY3RpdmF0ZU1vZGlmeUludGVyYWN0aW9uKCk7XHJcbiAgICB0aGlzLm9sTW9kaWZ5SW50ZXJhY3Rpb24gPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFjdGl2YXRlTW9kaWZ5SW50ZXJhY3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5vbE1vZGlmeUludGVyYWN0aW9uSXNBY3RpdmUgPT09IHRydWUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub2xNb2RpZnlJbnRlcmFjdGlvbklzQWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMub25Nb2RpZnlTdGFydEtleSA9IHRoaXMub2xNb2RpZnlJbnRlcmFjdGlvblxyXG4gICAgICAub24oJ21vZGlmeXN0YXJ0JywgKGV2ZW50OiBPbE1vZGlmeUV2ZW50KSA9PiB0aGlzLm9uTW9kaWZ5U3RhcnQoZXZlbnQpKTtcclxuICAgIHRoaXMub25Nb2RpZnlFbmRLZXkgPSB0aGlzLm9sTW9kaWZ5SW50ZXJhY3Rpb25cclxuICAgICAgLm9uKCdtb2RpZnllbmQnLCAoZXZlbnQ6IE9sTW9kaWZ5RXZlbnQpID0+IHRoaXMub25Nb2RpZnlFbmQoZXZlbnQpKTtcclxuICAgIHRoaXMub2xNYXAuYWRkSW50ZXJhY3Rpb24odGhpcy5vbE1vZGlmeUludGVyYWN0aW9uKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGVhY3RpdmF0ZU1vZGlmeUludGVyYWN0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMub2xNb2RpZnlJbnRlcmFjdGlvbklzQWN0aXZlID09PSBmYWxzZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vbE1vZGlmeUludGVyYWN0aW9uSXNBY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICB1bkJ5S2V5KFtcclxuICAgICAgdGhpcy5vbk1vZGlmeVN0YXJ0S2V5LFxyXG4gICAgICB0aGlzLm9uTW9kaWZ5RW5kS2V5LFxyXG4gICAgICB0aGlzLm9uTW9kaWZ5S2V5XHJcbiAgICBdKTtcclxuICAgIGlmICh0aGlzLm9sTWFwICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbE1hcC5yZW1vdmVJbnRlcmFjdGlvbih0aGlzLm9sTW9kaWZ5SW50ZXJhY3Rpb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBtb2RpZnlpbmcgc3RhcnRzLCBjbGVhciB0aGUgb3ZlcmxheSBhbmQgc3RhcnQgd2F0Y2hpbmcgZm9yIGNoYW5nZXNcclxuICAgKiBAcGFyYW0gZXZlbnQgTW9kaWZ5IHN0YXJ0IGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbk1vZGlmeVN0YXJ0KGV2ZW50OiBPbE1vZGlmeUV2ZW50KSB7XHJcbiAgICBjb25zdCBvbEdlb21ldHJ5ID0gZXZlbnQuZmVhdHVyZXMuaXRlbSgwKS5nZXRHZW9tZXRyeSgpO1xyXG4gICAgdGhpcy5zdGFydCQubmV4dChvbEdlb21ldHJ5KTtcclxuICAgIHRoaXMub25Nb2RpZnlLZXkgPSBvbEdlb21ldHJ5Lm9uKCdjaGFuZ2UnLCAob2xHZW9tZXRyeUV2ZW50OiBPbEdlb21ldHJ5RXZlbnQpID0+IHtcclxuICAgICAgdGhpcy5tb3VzZVBvc2l0aW9uID0gZ2V0TW91c2VQb3NpdGlvbkZyb21PbEdlb21ldHJ5RXZlbnQob2xHZW9tZXRyeUV2ZW50KTtcclxuICAgICAgdGhpcy5jaGFuZ2VzJC5uZXh0KG9sR2VvbWV0cnlFdmVudC50YXJnZXQpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnN1YnNjcmliZVRvS2V5RG93bigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBtb2RpZnlpbmcgZW5kcywgdXBkYXRlIHRoZSBnZW9tZXRyeSBvYnNlcnZhYmxlIGFuZCBzdG9wIHdhdGNoaW5nIGZvciBjaGFuZ2VzXHJcbiAgICogQHBhcmFtIGV2ZW50IE1vZGlmeSBlbmQgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uTW9kaWZ5RW5kKGV2ZW50OiBPbE1vZGlmeUV2ZW50KSB7XHJcbiAgICB1bkJ5S2V5KHRoaXMub25Nb2RpZnlLZXkpO1xyXG4gICAgdGhpcy5lbmQkLm5leHQoZXZlbnQuZmVhdHVyZXMuaXRlbSgwKS5nZXRHZW9tZXRyeSgpKTtcclxuICAgIHRoaXMudW5zdWJzY3JpYmVUb0tleURvd24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmliZSB0byBzcGFjZSBrZXkgZG93biB0byBwYW4gdGhlIG1hcFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9LZXlEb3duKCkge1xyXG4gICAgdGhpcy5rZXlEb3duJCQgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdrZXlkb3duJykuc3Vic2NyaWJlKChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzIpIHtcclxuICAgICAgICAvLyBPbiBzcGFjZSBiYXIsIHBhbiB0byB0aGUgY3VycmVudCBtb3VzZSBwb3NpdGlvblxyXG4gICAgICAgIHRoaXMub2xNYXAuZ2V0VmlldygpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgY2VudGVyOiB0aGlzLm1vdXNlUG9zaXRpb24sXHJcbiAgICAgICAgICBkdXJhdGlvbjogMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbnN1YnNjcmliZSB0byBrZXkgZG93blxyXG4gICAqL1xyXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVUb0tleURvd24oKSB7XHJcbiAgICBpZiAodGhpcy5rZXlEb3duJCQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmtleURvd24kJC51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGEgdHJhbnNsYXRlIGludGVyYWN0aW9uIHRvIHRoZSBtYXAgYW4gc2V0IHVwIHNvbWUgbGlzdGVuZXJzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRPbFRyYW5zbGF0ZUludGVyYWN0aW9uKCkge1xyXG4gICAgY29uc3Qgb2xUcmFuc2xhdGVJbnRlcmFjdGlvbiA9IG5ldyBPbFRyYW5zbGF0ZSh7XHJcbiAgICAgIGxheWVyczogW3RoaXMub2xPdmVybGF5TGF5ZXJdXHJcbiAgICB9KTtcclxuICAgIHRoaXMub2xUcmFuc2xhdGVJbnRlcmFjdGlvbiA9IG9sVHJhbnNsYXRlSW50ZXJhY3Rpb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgdGhlIHRyYW5zbGF0ZSBpbnRlcmFjdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlT2xUcmFuc2xhdGVJbnRlcmFjdGlvbigpIHtcclxuICAgIGlmICh0aGlzLm9sVHJhbnNsYXRlSW50ZXJhY3Rpb24gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kZWFjdGl2YXRlVHJhbnNsYXRlSW50ZXJhY3Rpb24oKTtcclxuICAgIHRoaXMub2xUcmFuc2xhdGVJbnRlcmFjdGlvbiA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWN0aXZhdGVUcmFuc2xhdGVJbnRlcmFjdGlvbigpIHtcclxuICAgIGlmICh0aGlzLm9sVHJhbnNsYXRlSW50ZXJhY3Rpb25Jc0FjdGl2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vbFRyYW5zbGF0ZUludGVyYWN0aW9uSXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5vblRyYW5zbGF0ZVN0YXJ0S2V5ID0gdGhpcy5vbFRyYW5zbGF0ZUludGVyYWN0aW9uXHJcbiAgICAgIC5vbigndHJhbnNsYXRlc3RhcnQnLCAoZXZlbnQ6IE9sVHJhbnNsYXRlRXZlbnQpID0+IHRoaXMub25UcmFuc2xhdGVTdGFydChldmVudCkpO1xyXG4gICAgdGhpcy5vblRyYW5zbGF0ZUVuZEtleSA9IHRoaXMub2xUcmFuc2xhdGVJbnRlcmFjdGlvblxyXG4gICAgICAub24oJ3RyYW5zbGF0ZWVuZCcsIChldmVudDogT2xUcmFuc2xhdGVFdmVudCkgPT4gdGhpcy5vblRyYW5zbGF0ZUVuZChldmVudCkpO1xyXG4gICAgdGhpcy5vbE1hcC5hZGRJbnRlcmFjdGlvbih0aGlzLm9sVHJhbnNsYXRlSW50ZXJhY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkZWFjdGl2YXRlVHJhbnNsYXRlSW50ZXJhY3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5vbFRyYW5zbGF0ZUludGVyYWN0aW9uSXNBY3RpdmUgPT09IGZhbHNlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9sVHJhbnNsYXRlSW50ZXJhY3Rpb25Jc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdW5CeUtleShbXHJcbiAgICAgIHRoaXMub25UcmFuc2xhdGVTdGFydEtleSxcclxuICAgICAgdGhpcy5vblRyYW5zbGF0ZUVuZEtleSxcclxuICAgICAgdGhpcy5vblRyYW5zbGF0ZUtleVxyXG4gICAgXSk7XHJcbiAgICBpZiAodGhpcy5vbE1hcCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2xNYXAucmVtb3ZlSW50ZXJhY3Rpb24odGhpcy5vbFRyYW5zbGF0ZUludGVyYWN0aW9uKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdHJhbnNsYXRpb24gc3RhcnRzLCBjbGVhciB0aGUgb3ZlcmxheSBhbmQgc3RhcnQgd2F0Y2hpbmcgZm9yIGNoYW5nZXNcclxuICAgKiBAcGFyYW0gZXZlbnQgVHJhbnNsYXRlIHN0YXJ0IGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvblRyYW5zbGF0ZVN0YXJ0KGV2ZW50OiBPbFRyYW5zbGF0ZUV2ZW50KSB7XHJcbiAgICBjb25zdCBvbEdlb21ldHJ5ID0gZXZlbnQuZmVhdHVyZXMuaXRlbSgwKS5nZXRHZW9tZXRyeSgpO1xyXG4gICAgdGhpcy5zdGFydCQubmV4dChvbEdlb21ldHJ5KTtcclxuICAgIHRoaXMub25UcmFuc2xhdGVLZXkgPSBvbEdlb21ldHJ5Lm9uKCdjaGFuZ2UnLCAob2xHZW9tZXRyeUV2ZW50OiBPbEdlb21ldHJ5RXZlbnQpID0+IHtcclxuICAgICAgdGhpcy5jaGFuZ2VzJC5uZXh0KG9sR2VvbWV0cnlFdmVudC50YXJnZXQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHRyYW5zbGF0aW9uIGVuZHMsIHVwZGF0ZSB0aGUgZ2VvbWV0cnkgb2JzZXJ2YWJsZSBhbmQgc3RvcCB3YXRjaGlnbiBmb3IgY2hhbmdlc1xyXG4gICAqIEBwYXJhbSBldmVudCBUcmFuc2xhdGUgZW5kIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvblRyYW5zbGF0ZUVuZChldmVudDogT2xUcmFuc2xhdGVFdmVudCkge1xyXG4gICAgdW5CeUtleSh0aGlzLm9uVHJhbnNsYXRlS2V5KTtcclxuICAgIHRoaXMuZW5kJC5uZXh0KGV2ZW50LmZlYXR1cmVzLml0ZW0oMCkuZ2V0R2VvbWV0cnkoKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYSBkcmF3IGludGVyYWN0aW9uIHRvIHRoZSBtYXAgYW4gc2V0IHVwIHNvbWUgbGlzdGVuZXJzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRPbERyYXdJbnRlcmFjdGlvbigpIHtcclxuICAgIGNvbnN0IG9sRHJhd0ludGVyYWN0aW9uID0gbmV3IE9sRHJhdyh7XHJcbiAgICAgIHR5cGU6ICdQb2x5Z29uJyxcclxuICAgICAgc291cmNlOiB0aGlzLm9sTGluZWFyUmluZ3NTb3VyY2UsXHJcbiAgICAgIHN0b3BDbGljazogdHJ1ZSxcclxuICAgICAgc3R5bGU6IGNyZWF0ZURyYXdIb2xlSW50ZXJhY3Rpb25TdHlsZSgpLFxyXG4gICAgICBjb25kaXRpb246IChldmVudDogT2xNYXBCcm93c2VyRXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCBvbE91dGVyR2VvbWV0cnkgPSB0aGlzLm9sT3V0ZXJHZW9tZXRyeSB8fCB0aGlzLmdldE9sR2VvbWV0cnkoKTtcclxuICAgICAgICBjb25zdCBpbnRlcnNlY3RzID0gb2xPdXRlckdlb21ldHJ5LmludGVyc2VjdHNDb29yZGluYXRlKGV2ZW50LmNvb3JkaW5hdGUpO1xyXG4gICAgICAgIHJldHVybiBpbnRlcnNlY3RzO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm9sRHJhd0ludGVyYWN0aW9uID0gb2xEcmF3SW50ZXJhY3Rpb247XHJcbiAgICB0aGlzLnN1YnNjcmliZVRvRHJhd0tleURvd24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmliZSB0byBDVFJMIGtleSBkb3duIHRvIGFjdGl2YXRlIHRoZSBkcmF3IGNvbnRyb2xcclxuICAgKi9cclxuICBwcml2YXRlIHN1YnNjcmliZVRvRHJhd0tleURvd24oKSB7XHJcbiAgICB0aGlzLmRyYXdLZXlEb3duJCQgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdrZXlkb3duJykuc3Vic2NyaWJlKChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSAhPT0gMTcpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICB0aGlzLnVuc3Vic2NyaWJlVG9EcmF3S2V5RG93bigpO1xyXG5cclxuICAgICAgY29uc3Qgb2xHZW9tZXRyeSA9IHRoaXMuZ2V0T2xHZW9tZXRyeSgpO1xyXG4gICAgICBpZiAoIW9sR2VvbWV0cnkgfHwgIShvbEdlb21ldHJ5IGluc3RhbmNlb2YgT2xQb2x5Z29uKSkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgIHRoaXMuc3Vic2NyaWJlVG9EcmF3S2V5VXAoKTtcclxuXHJcbiAgICAgIHRoaXMuZGVhY3RpdmF0ZU1vZGlmeUludGVyYWN0aW9uKCk7XHJcbiAgICAgIHRoaXMuZGVhY3RpdmF0ZVRyYW5zbGF0ZUludGVyYWN0aW9uKCk7XHJcbiAgICAgIHRoaXMuYWN0aXZhdGVEcmF3SW50ZXJhY3Rpb24oKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaWJlIHRvIENUUkwga2V5IHVwIHRvIGRlYWN0aXZhdGUgdGhlIGRyYXcgY29udHJvbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9EcmF3S2V5VXAoKSB7XHJcbiAgICB0aGlzLmRyYXdLZXlVcCQkID0gZnJvbUV2ZW50KGRvY3VtZW50LCAna2V5dXAnKVxyXG4gICAgICAuc3Vic2NyaWJlKChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlICE9PSAxNykge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZVRvRHJhd0tleVVwKCk7XHJcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZVRvS2V5RG93bigpO1xyXG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZURyYXdJbnRlcmFjdGlvbigpO1xyXG5cclxuICAgICAgICB0aGlzLmFjdGl2YXRlTW9kaWZ5SW50ZXJhY3Rpb24oKTtcclxuICAgICAgICBpZiAodGhpcy50cmFuc2xhdGUgPT09IHRydWUpIHtcclxuICAgICAgICAgIHRoaXMuYWN0aXZhdGVUcmFuc2xhdGVJbnRlcmFjdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN1YnNjcmliZVRvRHJhd0tleURvd24oKTtcclxuXHJcbiAgICAgICAgdGhpcy5vbE91dGVyR2VvbWV0cnkgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5jbGVhck9sTGluZWFyUmluZ3NTb3VyY2UoKTtcclxuICAgICAgICB0aGlzLmVuZCQubmV4dCh0aGlzLmdldE9sR2VvbWV0cnkoKSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5zdWJzY3JpYmUgdG8gZHJhdyBrZXkgZG93blxyXG4gICAqL1xyXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVUb0RyYXdLZXlEb3duKCkge1xyXG4gICAgaWYgKHRoaXMuZHJhd0tleURvd24kJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuZHJhd0tleURvd24kJC51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5zdWJzY3JpYmUgdG8ga2V5IHVwXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1bnN1YnNjcmliZVRvRHJhd0tleVVwKCkge1xyXG4gICAgaWYgKHRoaXMuZHJhd0tleVVwJCQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmRyYXdLZXlVcCQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgdGhlIGRyYXcgaW50ZXJhY3Rpb25cclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZU9sRHJhd0ludGVyYWN0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMub2xEcmF3SW50ZXJhY3Rpb24gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy51bnN1YnNjcmliZVRvS2V5RG93bigpO1xyXG4gICAgdGhpcy51bnN1YnNjcmliZVRvRHJhd0tleVVwKCk7XHJcbiAgICB0aGlzLnVuc3Vic2NyaWJlVG9EcmF3S2V5RG93bigpO1xyXG4gICAgdGhpcy5kZWFjdGl2YXRlRHJhd0ludGVyYWN0aW9uKCk7XHJcbiAgICB0aGlzLmNsZWFyT2xMaW5lYXJSaW5nc1NvdXJjZSgpO1xyXG4gICAgdGhpcy5vbERyYXdJbnRlcmFjdGlvbiA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjdGl2YXRlIHRoZSBkcmF3IGludGVyYWN0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhY3RpdmF0ZURyYXdJbnRlcmFjdGlvbigpIHtcclxuICAgIGlmICh0aGlzLm9sRHJhd0ludGVyYWN0aW9uSXNBY3RpdmUgPT09IHRydWUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2xlYXJPbExpbmVhclJpbmdzU291cmNlKCk7XHJcbiAgICB0aGlzLmFkZE9sTGluZWFyUmluZ3NMYXllcigpO1xyXG5cclxuICAgIHRoaXMub2xNYXAuZ2V0SW50ZXJhY3Rpb25zKCkuZm9yRWFjaCgob2xJbnRlcmFjdGlvbjogT2xJbnRlcmFjdGlvbikgPT4ge1xyXG4gICAgICBpZiAob2xJbnRlcmFjdGlvbiBpbnN0YW5jZW9mIE9sRHJhZ0JveEludGVyYWN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5vbE1hcC5yZW1vdmVJbnRlcmFjdGlvbihvbEludGVyYWN0aW9uKTtcclxuICAgICAgICB0aGlzLnJlbW92ZWRPbEludGVyYWN0aW9ucy5wdXNoKG9sSW50ZXJhY3Rpb24pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm9sRHJhd0ludGVyYWN0aW9uSXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5vbkRyYXdTdGFydEtleSA9IHRoaXMub2xEcmF3SW50ZXJhY3Rpb25cclxuICAgICAgLm9uKCdkcmF3c3RhcnQnLCAoZXZlbnQ6IE9sRHJhd0V2ZW50KSA9PiB0aGlzLm9uRHJhd1N0YXJ0KGV2ZW50KSk7XHJcbiAgICB0aGlzLm9uRHJhd0VuZEtleSA9IHRoaXMub2xEcmF3SW50ZXJhY3Rpb25cclxuICAgICAgLm9uKCdkcmF3ZW5kJywgKGV2ZW50OiBPbERyYXdFdmVudCkgPT4gdGhpcy5vbkRyYXdFbmQoZXZlbnQpKTtcclxuICAgIHRoaXMub2xNYXAuYWRkSW50ZXJhY3Rpb24odGhpcy5vbERyYXdJbnRlcmFjdGlvbik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWFjdGl2YXRlIHRoZSBkcmF3IGludGVyYWN0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkZWFjdGl2YXRlRHJhd0ludGVyYWN0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMub2xEcmF3SW50ZXJhY3Rpb25Jc0FjdGl2ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVtb3ZlT2xMaW5lYXJSaW5nc0xheWVyKCk7XHJcblxyXG4gICAgdGhpcy5yZW1vdmVkT2xJbnRlcmFjdGlvbnMuZm9yRWFjaCgob2xJbnRlcmFjdGlvbjogT2xJbnRlcmFjdGlvbikgPT4ge1xyXG4gICAgICB0aGlzLm9sTWFwLmFkZEludGVyYWN0aW9uKG9sSW50ZXJhY3Rpb24pO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnJlbW92ZWRPbEludGVyYWN0aW9ucyA9IFtdO1xyXG5cclxuICAgIHRoaXMub2xEcmF3SW50ZXJhY3Rpb25Jc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdW5CeUtleShbXHJcbiAgICAgIHRoaXMub25EcmF3U3RhcnRLZXksXHJcbiAgICAgIHRoaXMub25EcmF3RW5kS2V5LFxyXG4gICAgICB0aGlzLm9uRHJhd0tleVxyXG4gICAgXSk7XHJcbiAgICBpZiAodGhpcy5vbE1hcCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2xNYXAucmVtb3ZlSW50ZXJhY3Rpb24odGhpcy5vbERyYXdJbnRlcmFjdGlvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGRyYXcgc3RhcnQsIGFkZCBhIG5ldyBsaW5lcmFyIHJpbmcgdG8gdGhlIGdlb21ldHJ5IGFuZCBzdGFydCB3YXRjaGluZyBmb3IgY2hhbmdlc1xyXG4gICAqIEBwYXJhbSBldmVudCBEcmF3IHN0YXJ0IGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkRyYXdTdGFydChldmVudDogT2xEcmF3RXZlbnQpIHtcclxuICAgIGNvbnN0IG9sR2VvbWV0cnkgPSBldmVudC5mZWF0dXJlLmdldEdlb21ldHJ5KCk7XHJcbiAgICB0aGlzLm9sT3V0ZXJHZW9tZXRyeSA9IHRoaXMuZ2V0T2xHZW9tZXRyeSgpLmNsb25lKCk7XHJcblxyXG4gICAgY29uc3QgbGluZWFyUmluZ0Nvb3JkaW5hdGVzID0gb2xHZW9tZXRyeS5nZXRMaW5lYXJSaW5nKCkuZ2V0Q29vcmRpbmF0ZXMoKTtcclxuICAgIHRoaXMuYWRkTGluZWFyUmluZ1RvT2xHZW9tZXRyeShsaW5lYXJSaW5nQ29vcmRpbmF0ZXMpO1xyXG4gICAgdGhpcy5zdGFydCQubmV4dCh0aGlzLmdldE9sR2VvbWV0cnkoKSk7XHJcblxyXG4gICAgdGhpcy5vbkRyYXdLZXkgPSBvbEdlb21ldHJ5Lm9uKCdjaGFuZ2UnLCAob2xHZW9tZXRyeUV2ZW50OiBPbEdlb21ldHJ5RXZlbnQpID0+IHtcclxuICAgICAgdGhpcy5tb3VzZVBvc2l0aW9uID0gZ2V0TW91c2VQb3NpdGlvbkZyb21PbEdlb21ldHJ5RXZlbnQob2xHZW9tZXRyeUV2ZW50KTtcclxuICAgICAgY29uc3QgX2xpbmVhclJpbmdDb29yZGluYXRlcyA9IG9sR2VvbWV0cnlFdmVudC50YXJnZXQuZ2V0TGluZWFyUmluZygpLmdldENvb3JkaW5hdGVzKCk7XHJcbiAgICAgIHRoaXMudXBkYXRlTGluZWFyUmluZ09mT2xHZW9tZXRyeShfbGluZWFyUmluZ0Nvb3JkaW5hdGVzKTtcclxuICAgICAgdGhpcy5jaGFuZ2VzJC5uZXh0KHRoaXMuZ2V0T2xHZW9tZXRyeSgpKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zdWJzY3JpYmVUb0tleURvd24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdHJhbnNsYXRpb24gZW5kcywgdXBkYXRlIHRoZSBnZW9tZXRyeSBvYnNlcnZhYmxlIGFuZCBzdG9wIHdhdGNoaWduIGZvciBjaGFuZ2VzXHJcbiAgICogQHBhcmFtIGV2ZW50IERyYXcgZW5kIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkRyYXdFbmQoZXZlbnQ6IE9sRHJhd0V2ZW50KSB7XHJcbiAgICB1bkJ5S2V5KHRoaXMub25EcmF3S2V5KTtcclxuICAgIHRoaXMub2xPdXRlckdlb21ldHJ5ID0gdW5kZWZpbmVkO1xyXG5cclxuICAgIGNvbnN0IGxpbmVhclJpbmdDb29yZGluYXRlcyA9IGV2ZW50LmZlYXR1cmUuZ2V0R2VvbWV0cnkoKS5nZXRMaW5lYXJSaW5nKCkuZ2V0Q29vcmRpbmF0ZXMoKTtcclxuICAgIHRoaXMudXBkYXRlTGluZWFyUmluZ09mT2xHZW9tZXRyeShsaW5lYXJSaW5nQ29vcmRpbmF0ZXMpO1xyXG4gICAgdGhpcy5jbGVhck9sTGluZWFyUmluZ3NTb3VyY2UoKTtcclxuICAgIHRoaXMuZW5kJC5uZXh0KHRoaXMuZ2V0T2xHZW9tZXRyeSgpKTtcclxuICAgIHRoaXMudW5zdWJzY3JpYmVUb0tleURvd24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhIGxpbmVhciByaW5nIHRvIHRoZSBnZW9tZXRyeSBiZWluZyBtb2RpZmllZFxyXG4gICAqIEBwYXJhbSBjb29yZGluYXRlcyBMaW5lYXIgcmluZyBjb29yZGluYXRlc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkTGluZWFyUmluZ1RvT2xHZW9tZXRyeShjb29yZGluYXRlczogbnVtYmVyW10pIHtcclxuICAgIGNvbnN0IG9sR2VvbWV0cnkgPSB0aGlzLmdldE9sR2VvbWV0cnkoKTtcclxuICAgIGNvbnN0IG9sTGluZWFyUmluZyA9IG5ldyBPbExpbmVhclJpbmcoY29vcmRpbmF0ZXMpO1xyXG4gICAgYWRkTGluZWFyUmluZ1RvT2xQb2x5Z29uKG9sR2VvbWV0cnksIG9sTGluZWFyUmluZyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgdGhlIGxhc3QgbGluZWFyIHJpbmcgb2YgdGhlIGdlb21ldHJ5IGJlaW5nIG1vZGlmaWVkXHJcbiAgICogQHBhcmFtIGNvb3JkaW5hdGVzIExpbmVhciByaW5nIGNvb3JkaW5hdGVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1cGRhdGVMaW5lYXJSaW5nT2ZPbEdlb21ldHJ5KGNvb3JkaW5hdGVzOiBudW1iZXJbXSkge1xyXG4gICAgY29uc3Qgb2xHZW9tZXRyeSA9IHRoaXMuZ2V0T2xHZW9tZXRyeSgpO1xyXG4gICAgLy8gUmVtb3ZlIHRoZSBsYXN0IGxpbmVhciByaW5nICh0aGUgb25lIHdlIGFyZSB1cGRhdGluZylcclxuICAgIGNvbnN0IG9sTGluZWFyUmluZ3MgPSBvbEdlb21ldHJ5LmdldExpbmVhclJpbmdzKCkuc2xpY2UoMCwgLTEpO1xyXG4gICAgY29uc3QgbmV3Q29vcmRpbmF0ZXMgPSBvbExpbmVhclJpbmdzLm1hcCgob2xMaW5lYXJSaW5nOiBPbExpbmVhclJpbmcpID0+IHtcclxuICAgICAgcmV0dXJuIG9sTGluZWFyUmluZy5nZXRDb29yZGluYXRlcygpO1xyXG4gICAgfSk7XHJcbiAgICBuZXdDb29yZGluYXRlcy5wdXNoKGNvb3JkaW5hdGVzKTtcclxuICAgIG9sR2VvbWV0cnkuc2V0Q29vcmRpbmF0ZXMobmV3Q29vcmRpbmF0ZXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBnZW9tZXRyeSBiZWluZyBtb2RpZmllZFxyXG4gICAqIEByZXR1cm5zIE9MIEdlb21ldHJ5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRPbEdlb21ldHJ5KCk6IE9sR2VvbWV0cnkge1xyXG4gICAgY29uc3Qgb2xGZWF0dXJlcyA9IHRoaXMub2xPdmVybGF5U291cmNlLmdldEZlYXR1cmVzKCk7XHJcbiAgICByZXR1cm4gb2xGZWF0dXJlcy5sZW5ndGggPiAwID8gb2xGZWF0dXJlc1swXS5nZXRHZW9tZXRyeSgpIDogdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbn1cclxuIl19