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
        this.addOlDrawInteraction();
        this.addOlTranslateInteraction();
        this.activateTranslateInteraction();
        this.addOlModifyInteraction();
        this.activateModifyInteraction();
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
            this.olOverlaySource.clear();
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
        unByKey(this.onModifyStartKey);
        unByKey(this.onModifyEndKey);
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
        if (this.onModifyKey !== undefined) {
            unByKey(this.onModifyKey);
        }
        this.end$.next(event.features.item(0).getGeometry());
        this.unsubscribeToKeyDown();
    }
    /**
     * Subscribe to CTRL key down to activate the draw control
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
        unByKey(this.onTranslateStartKey);
        unByKey(this.onTranslateEndKey);
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
        if (this.onTranslateKey !== undefined) {
            unByKey(this.onTranslateKey);
        }
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
                return olOuterGeometry.intersectsCoordinate(event.coordinate);
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
            this.activateTranslateInteraction();
            this.subscribeToDrawKeyDown();
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
        this.olDrawInteractionIsActive = false;
        unByKey(this.onDrawStartKey);
        unByKey(this.onDrawEndKey);
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
        if (this.onDrawKey !== undefined) {
            unByKey(this.onDrawKey);
        }
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
     * @type {?}
     * @private
     */
    ModifyControl.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZ5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2dlb21ldHJ5L3NoYXJlZC9jb250cm9scy9tb2RpZnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sU0FBUyxNQUFNLFlBQVksQ0FBQztBQUVuQyxPQUFPLGNBQWMsTUFBTSxrQkFBa0IsQ0FBQztBQUM5QyxPQUFPLGFBQWEsTUFBTSxpQkFBaUIsQ0FBQztBQUM1QyxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLFNBQVMsTUFBTSxpQkFBaUIsQ0FBQztBQUN4QyxPQUFPLFlBQVksTUFBTSxvQkFBb0IsQ0FBQztBQUU5QyxPQUFPLG9CQUFvQixNQUFNLHdCQUF3QixDQUFDO0FBUzFELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFeEMsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXhELE9BQU8sRUFDTCx3QkFBd0IsRUFDeEIsOEJBQThCLEVBQzlCLG1DQUFtQyxFQUNwQyxNQUFNLG1CQUFtQixDQUFDOzs7O0FBRTNCLDBDQUtDOzs7SUFKQyxzQ0FBd0I7O0lBQ3hCLHFDQUFzQjs7SUFDdEIsMENBQTJEOztJQUMzRCx5Q0FBMEQ7Ozs7O0FBTTVELE1BQU0sT0FBTyxhQUFhOzs7O0lBc0V4QixZQUFvQixPQUE2QjtRQUE3QixZQUFPLEdBQVAsT0FBTyxDQUFzQjs7OztRQWpFMUMsV0FBTSxHQUF3QixJQUFJLE9BQU8sRUFBRSxDQUFDOzs7O1FBSzVDLFNBQUksR0FBd0IsSUFBSSxPQUFPLEVBQUUsQ0FBQzs7OztRQUsxQyxhQUFRLEdBQXdCLElBQUksT0FBTyxFQUFFLENBQUM7UUFRN0MsZ0NBQTJCLEdBQVksS0FBSyxDQUFDO1FB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IE9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuaW1wb3J0IE9sU3R5bGUgZnJvbSAnb2wvc3R5bGUnO1xyXG5pbXBvcnQgT2xWZWN0b3JTb3VyY2UgZnJvbSAnb2wvc291cmNlL1ZlY3Rvcic7XHJcbmltcG9ydCBPbFZlY3RvckxheWVyIGZyb20gJ29sL2xheWVyL1ZlY3Rvcic7XHJcbmltcG9ydCBPbE1vZGlmeSBmcm9tICdvbC9pbnRlcmFjdGlvbi9Nb2RpZnknO1xyXG5pbXBvcnQgT2xUcmFuc2xhdGUgZnJvbSAnb2wvaW50ZXJhY3Rpb24vVHJhbnNsYXRlJztcclxuaW1wb3J0IE9sRHJhdyBmcm9tICdvbC9pbnRlcmFjdGlvbi9EcmF3JztcclxuaW1wb3J0IE9sUG9seWdvbiBmcm9tICdvbC9nZW9tL1BvbHlnb24nO1xyXG5pbXBvcnQgT2xMaW5lYXJSaW5nIGZyb20gJ29sL2dlb20vTGluZWFyUmluZyc7XHJcbmltcG9ydCBPbEludGVyYWN0aW9uIGZyb20gJ29sL2ludGVyYWN0aW9uL0ludGVyYWN0aW9uJztcclxuaW1wb3J0IE9sRHJhZ0JveEludGVyYWN0aW9uIGZyb20gJ29sL2ludGVyYWN0aW9uL0RyYWdCb3gnO1xyXG5pbXBvcnQgeyBNYXBCcm93c2VyRXZlbnQgYXMgT2xNYXBCcm93c2VyRXZlbnQgfSBmcm9tICdvbC9NYXBCcm93c2VyRXZlbnQnO1xyXG5pbXBvcnQge1xyXG4gIEdlb21ldHJ5IGFzIE9sR2VvbWV0cnksXHJcbiAgR2VvbWV0cnlFdmVudCBhcyBPbEdlb21ldHJ5RXZlbnRcclxufSBmcm9tICdvbC9nZW9tL0dlb21ldHJ5JztcclxuaW1wb3J0IHsgTW9kaWZ5RXZlbnQgYXMgT2xNb2RpZnlFdmVudCB9IGZyb20gJ29sL2ludGVyYWN0aW9uL01vZGlmeSc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZUV2ZW50IGFzIE9sVHJhbnNsYXRlRXZlbnQgfSBmcm9tICdvbC9pbnRlcmFjdGlvbi9UcmFuc2xhdGUnO1xyXG5pbXBvcnQgeyBEcmF3RXZlbnQgYXMgT2xEcmF3RXZlbnQgfSBmcm9tICdvbC9pbnRlcmFjdGlvbi9EcmF3JztcclxuaW1wb3J0IHsgdW5CeUtleSB9IGZyb20gJ29sL09ic2VydmFibGUnO1xyXG5cclxuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uLCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgYWRkTGluZWFyUmluZ1RvT2xQb2x5Z29uLFxyXG4gIGNyZWF0ZURyYXdIb2xlSW50ZXJhY3Rpb25TdHlsZSxcclxuICBnZXRNb3VzZVBvc2l0aW9uRnJvbU9sR2VvbWV0cnlFdmVudFxyXG59IGZyb20gJy4uL2dlb21ldHJ5LnV0aWxzJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTW9kaWZ5Q29udHJvbE9wdGlvbnMge1xyXG4gIHNvdXJjZT86IE9sVmVjdG9yU291cmNlO1xyXG4gIGxheWVyPzogT2xWZWN0b3JMYXllcjtcclxuICBsYXllclN0eWxlPzogT2xTdHlsZSB8ICgob2xmZWF0dXJlOiBPbEZlYXR1cmUpID0+IE9sU3R5bGUpO1xyXG4gIGRyYXdTdHlsZT86IE9sU3R5bGUgfCAoKG9sZmVhdHVyZTogT2xGZWF0dXJlKSA9PiBPbFN0eWxlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnRyb2wgdG8gbW9kaWZ5IGdlb21ldHJpZXNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNb2RpZnlDb250cm9sIHtcclxuXHJcbiAgLyoqXHJcbiAgICogTW9kaWZ5IHN0YXJ0IG9ic2VydmFibGVcclxuICAgKi9cclxuICBwdWJsaWMgc3RhcnQkOiBTdWJqZWN0PE9sR2VvbWV0cnk+ID0gbmV3IFN1YmplY3QoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogTW9kaWZ5IGVuZCBvYnNlcnZhYmxlXHJcbiAgICovXHJcbiAgcHVibGljIGVuZCQ6IFN1YmplY3Q8T2xHZW9tZXRyeT4gPSBuZXcgU3ViamVjdCgpO1xyXG5cclxuICAvKipcclxuICAgKiBHZW9tZXRyeSBjaGFuZ2VzIG9ic2VydmFibGVcclxuICAgKi9cclxuICBwdWJsaWMgY2hhbmdlcyQ6IFN1YmplY3Q8T2xHZW9tZXRyeT4gPSBuZXcgU3ViamVjdCgpO1xyXG5cclxuICBwcml2YXRlIG9sTWFwOiBPbE1hcDtcclxuICBwcml2YXRlIG9sT3ZlcmxheUxheWVyOiBPbFZlY3RvckxheWVyO1xyXG4gIHB1YmxpYyBvbE1vZGlmeUludGVyYWN0aW9uOiBPbE1vZGlmeTtcclxuICBwcml2YXRlIG9uTW9kaWZ5U3RhcnRLZXk6IHN0cmluZztcclxuICBwcml2YXRlIG9uTW9kaWZ5RW5kS2V5OiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBvbk1vZGlmeUtleTogc3RyaW5nO1xyXG4gIHByaXZhdGUgb2xNb2RpZnlJbnRlcmFjdGlvbklzQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBvbFRyYW5zbGF0ZUludGVyYWN0aW9uOiBPbFRyYW5zbGF0ZTtcclxuICBwcml2YXRlIG9uVHJhbnNsYXRlU3RhcnRLZXk6IHN0cmluZztcclxuICBwcml2YXRlIG9uVHJhbnNsYXRlRW5kS2V5OiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBvblRyYW5zbGF0ZUtleTogc3RyaW5nO1xyXG4gIHByaXZhdGUgb2xUcmFuc2xhdGVJbnRlcmFjdGlvbklzQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBvbERyYXdJbnRlcmFjdGlvbjogT2xUcmFuc2xhdGU7XHJcbiAgcHJpdmF0ZSBvbkRyYXdTdGFydEtleTogc3RyaW5nO1xyXG4gIHByaXZhdGUgb25EcmF3RW5kS2V5OiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBvbkRyYXdLZXk6IHN0cmluZztcclxuICBwcml2YXRlIG9sRHJhd0ludGVyYWN0aW9uSXNBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgcHJpdmF0ZSBtb3VzZVBvc2l0aW9uOiBbbnVtYmVyLCBudW1iZXJdO1xyXG5cclxuICBwcml2YXRlIGtleURvd24kJDogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgZHJhd0tleVVwJCQ6IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIGRyYXdLZXlEb3duJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgcHJpdmF0ZSByZW1vdmVkT2xJbnRlcmFjdGlvbnM6IE9sSW50ZXJhY3Rpb25bXSA9IFtdO1xyXG4gIHByaXZhdGUgb2xMaW5lYXJSaW5nc0xheWVyOiBPbFZlY3RvckxheWVyO1xyXG5cclxuICAvLyBUaGlzIGlzIHRoZSBnZW9tZXRyeSB0byB0ZXN0IGFnYWluc3Qgd2hlbiBkcmF3aW5nIGhvbGVzXHJcbiAgcHJpdmF0ZSBvbE91dGVyR2VvbWV0cnk6IE9sR2VvbWV0cnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRlciB0aGUgY29udHJvbCBpcyBhY3RpdmVcclxuICAgKi9cclxuICBnZXQgYWN0aXZlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMub2xNYXAgIT09IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9MIG92ZXJsYXkgc291cmNlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IG9sT3ZlcmxheVNvdXJjZSgpOiBPbFZlY3RvclNvdXJjZSB7XHJcbiAgICByZXR1cm4gdGhpcy5vbE92ZXJsYXlMYXllci5nZXRTb3VyY2UoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9MIGxpbmVhciByaW5ncyBzb3VyY2VcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgb2xMaW5lYXJSaW5nc1NvdXJjZSgpOiBPbFZlY3RvclNvdXJjZSB7XHJcbiAgICByZXR1cm4gdGhpcy5vbExpbmVhclJpbmdzTGF5ZXIuZ2V0U291cmNlKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG9wdGlvbnM6IE1vZGlmeUNvbnRyb2xPcHRpb25zKSB7XHJcbiAgICBpZiAob3B0aW9ucy5sYXllciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2xPdmVybGF5TGF5ZXIgPSBvcHRpb25zLmxheWVyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5vbE92ZXJsYXlMYXllciA9IHRoaXMuY3JlYXRlT2xJbm5lck92ZXJsYXlMYXllcigpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vbExpbmVhclJpbmdzTGF5ZXIgPSB0aGlzLmNyZWF0ZU9sTGluZWFyUmluZ3NMYXllcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIG9yIHJlbW92ZSB0aGlzIGNvbnRyb2wgdG8vZnJvbSBhIG1hcC5cclxuICAgKiBAcGFyYW0gbWFwIE9MIE1hcFxyXG4gICAqL1xyXG4gIHNldE9sTWFwKG9sTWFwOiBPbE1hcCB8IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKG9sTWFwID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5jbGVhck9sSW5uZXJPdmVybGF5U291cmNlKCk7XHJcbiAgICAgIHRoaXMucmVtb3ZlT2xJbm5lck92ZXJsYXlMYXllcigpO1xyXG4gICAgICB0aGlzLnJlbW92ZU9sTW9kaWZ5SW50ZXJhY3Rpb24oKTtcclxuICAgICAgdGhpcy5yZW1vdmVPbFRyYW5zbGF0ZUludGVyYWN0aW9uKCk7XHJcbiAgICAgIHRoaXMucmVtb3ZlT2xEcmF3SW50ZXJhY3Rpb24oKTtcclxuICAgICAgdGhpcy5vbE1hcCA9IG9sTWFwO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vbE1hcCA9IG9sTWFwO1xyXG4gICAgdGhpcy5hZGRPbElubmVyT3ZlcmxheUxheWVyKCk7XHJcbiAgICB0aGlzLmFkZE9sRHJhd0ludGVyYWN0aW9uKCk7XHJcbiAgICB0aGlzLmFkZE9sVHJhbnNsYXRlSW50ZXJhY3Rpb24oKTtcclxuICAgIHRoaXMuYWN0aXZhdGVUcmFuc2xhdGVJbnRlcmFjdGlvbigpO1xyXG4gICAgdGhpcy5hZGRPbE1vZGlmeUludGVyYWN0aW9uKCk7XHJcbiAgICB0aGlzLmFjdGl2YXRlTW9kaWZ5SW50ZXJhY3Rpb24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiB0aGUgb3ZlcmxheSBzb3VyY2VcclxuICAgKi9cclxuICBnZXRTb3VyY2UoKTogT2xWZWN0b3JTb3VyY2Uge1xyXG4gICAgcmV0dXJuIHRoaXMub2xPdmVybGF5U291cmNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGFuIE9MIGdlb21ldHJ5IHRvIHRoZSBvdmVybGF5IGFuZCBzdGFydCBtb2RpZnlpbmcgaXRcclxuICAgKiBAcGFyYW0gb2xHZW9tZXRyeSBPbCBHZW9tZXRyeVxyXG4gICAqL1xyXG4gIHNldE9sR2VvbWV0cnkob2xHZW9tZXRyeTogT2xHZW9tZXRyeSkge1xyXG4gICAgY29uc3Qgb2xGZWF0dXJlID0gbmV3IE9sRmVhdHVyZSh7Z2VvbWV0cnk6IG9sR2VvbWV0cnl9KTtcclxuICAgIHRoaXMub2xPdmVybGF5U291cmNlLmNsZWFyKCk7XHJcbiAgICB0aGlzLm9sT3ZlcmxheVNvdXJjZS5hZGRGZWF0dXJlKG9sRmVhdHVyZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYW4gb3ZlcmxheSBzb3VyY2UgaWYgbm9uZSBpcyBkZWZpbmVkIGluIHRoZSBvcHRpb25zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjcmVhdGVPbElubmVyT3ZlcmxheUxheWVyKCk6IE9sVmVjdG9yTGF5ZXIge1xyXG4gICAgcmV0dXJuIG5ldyBPbFZlY3RvckxheWVyKHtcclxuICAgICAgc291cmNlOiB0aGlzLm9wdGlvbnMuc291cmNlID8gdGhpcy5vcHRpb25zLnNvdXJjZSA6IG5ldyBPbFZlY3RvclNvdXJjZSgpLFxyXG4gICAgICBzdHlsZTogdGhpcy5vcHRpb25zLmxheWVyU3R5bGUsXHJcbiAgICAgIHpJbmRleDogNTAwXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCB0aGUgb3ZlcmxheSBsYXllciBpZiBpdCB3YXNuJ3QgZGVmaW5lZCBpbiB0aGUgb3B0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkT2xJbm5lck92ZXJsYXlMYXllcigpOiBPbFZlY3RvckxheWVyIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMubGF5ZXIgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9sTWFwLmFkZExheWVyKHRoaXMub2xPdmVybGF5TGF5ZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhlIG92ZXJsYXkgbGF5ZXIgaWYgaXQgd2Fzbid0IGRlZmluZWQgaW4gdGhlIG9wdGlvbnNcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZU9sSW5uZXJPdmVybGF5TGF5ZXIoKSB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmxheWVyID09PSB1bmRlZmluZWQgJiYgdGhpcy5vbE1hcCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2xNYXAucmVtb3ZlTGF5ZXIodGhpcy5vbE92ZXJsYXlMYXllcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgb3ZlcmxheSBzb3VyY2UgaWYgaXQgd2Fzbid0IGRlZmluZWQgaW4gdGhlIG9wdGlvbnNcclxuICAgKi9cclxuICBwcml2YXRlIGNsZWFyT2xJbm5lck92ZXJsYXlTb3VyY2UoKSB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmxheWVyID09PSB1bmRlZmluZWQgJiYgdGhpcy5vcHRpb25zLnNvdXJjZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2xPdmVybGF5U291cmNlLmNsZWFyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZU9sTGluZWFyUmluZ3NMYXllcigpOiBPbFZlY3RvckxheWVyIHtcclxuICAgIHJldHVybiBuZXcgT2xWZWN0b3JMYXllcih7XHJcbiAgICAgIHNvdXJjZTogbmV3IE9sVmVjdG9yU291cmNlKCksXHJcbiAgICAgIHN0eWxlOiBjcmVhdGVEcmF3SG9sZUludGVyYWN0aW9uU3R5bGUoKSxcclxuICAgICAgekluZGV4OiA1MDBcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIHRoZSBsaW5lYXIgcmluZ3MgbGF5ZXJcclxuICAgKi9cclxuICBwcml2YXRlIGFkZE9sTGluZWFyUmluZ3NMYXllcigpIHtcclxuICAgIHRoaXMub2xNYXAuYWRkTGF5ZXIodGhpcy5vbExpbmVhclJpbmdzTGF5ZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhlIGxpbmVhciByaW5ncyBsYXllclxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlT2xMaW5lYXJSaW5nc0xheWVyKCkge1xyXG4gICAgdGhpcy5vbE1hcC5yZW1vdmVMYXllcih0aGlzLm9sTGluZWFyUmluZ3NMYXllcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgbGluZWFyIHJpbmdzIHNvdXJjZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgY2xlYXJPbExpbmVhclJpbmdzU291cmNlKCkge1xyXG4gICAgdGhpcy5vbExpbmVhclJpbmdzU291cmNlLmNsZWFyKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGEgbW9kaWZ5IGludGVyYWN0aW9uIHRvIHRoZSBtYXAgYW4gc2V0IHVwIHNvbWUgbGlzdGVuZXJzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRPbE1vZGlmeUludGVyYWN0aW9uKCkge1xyXG4gICAgY29uc3Qgb2xNb2RpZnlJbnRlcmFjdGlvbiA9IG5ldyBPbE1vZGlmeSh7XHJcbiAgICAgIHNvdXJjZTogdGhpcy5vbE92ZXJsYXlTb3VyY2UsXHJcbiAgICAgIHN0eWxlOiB0aGlzLm9wdGlvbnMuZHJhd1N0eWxlXHJcbiAgICB9KTtcclxuICAgIHRoaXMub2xNb2RpZnlJbnRlcmFjdGlvbiA9IG9sTW9kaWZ5SW50ZXJhY3Rpb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgdGhlIG1vZGlmeSBpbnRlcmFjdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlT2xNb2RpZnlJbnRlcmFjdGlvbigpIHtcclxuICAgIGlmICh0aGlzLm9sTW9kaWZ5SW50ZXJhY3Rpb24gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kZWFjdGl2YXRlTW9kaWZ5SW50ZXJhY3Rpb24oKTtcclxuICAgIHRoaXMub2xNb2RpZnlJbnRlcmFjdGlvbiA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWN0aXZhdGVNb2RpZnlJbnRlcmFjdGlvbigpIHtcclxuICAgIGlmICh0aGlzLm9sTW9kaWZ5SW50ZXJhY3Rpb25Jc0FjdGl2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vbE1vZGlmeUludGVyYWN0aW9uSXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5vbk1vZGlmeVN0YXJ0S2V5ID0gdGhpcy5vbE1vZGlmeUludGVyYWN0aW9uXHJcbiAgICAgIC5vbignbW9kaWZ5c3RhcnQnLCAoZXZlbnQ6IE9sTW9kaWZ5RXZlbnQpID0+IHRoaXMub25Nb2RpZnlTdGFydChldmVudCkpO1xyXG4gICAgdGhpcy5vbk1vZGlmeUVuZEtleSA9IHRoaXMub2xNb2RpZnlJbnRlcmFjdGlvblxyXG4gICAgICAub24oJ21vZGlmeWVuZCcsIChldmVudDogT2xNb2RpZnlFdmVudCkgPT4gdGhpcy5vbk1vZGlmeUVuZChldmVudCkpO1xyXG4gICAgdGhpcy5vbE1hcC5hZGRJbnRlcmFjdGlvbih0aGlzLm9sTW9kaWZ5SW50ZXJhY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkZWFjdGl2YXRlTW9kaWZ5SW50ZXJhY3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5vbE1vZGlmeUludGVyYWN0aW9uSXNBY3RpdmUgPT09IGZhbHNlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9sTW9kaWZ5SW50ZXJhY3Rpb25Jc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdW5CeUtleSh0aGlzLm9uTW9kaWZ5U3RhcnRLZXkpO1xyXG4gICAgdW5CeUtleSh0aGlzLm9uTW9kaWZ5RW5kS2V5KTtcclxuICAgIGlmICh0aGlzLm9sTWFwICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbE1hcC5yZW1vdmVJbnRlcmFjdGlvbih0aGlzLm9sTW9kaWZ5SW50ZXJhY3Rpb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBtb2RpZnlpbmcgc3RhcnRzLCBjbGVhciB0aGUgb3ZlcmxheSBhbmQgc3RhcnQgd2F0Y2hpbmcgZm9yIGNoYW5nZXNcclxuICAgKiBAcGFyYW0gZXZlbnQgTW9kaWZ5IHN0YXJ0IGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbk1vZGlmeVN0YXJ0KGV2ZW50OiBPbE1vZGlmeUV2ZW50KSB7XHJcbiAgICBjb25zdCBvbEdlb21ldHJ5ID0gZXZlbnQuZmVhdHVyZXMuaXRlbSgwKS5nZXRHZW9tZXRyeSgpO1xyXG4gICAgdGhpcy5zdGFydCQubmV4dChvbEdlb21ldHJ5KTtcclxuICAgIHRoaXMub25Nb2RpZnlLZXkgPSBvbEdlb21ldHJ5Lm9uKCdjaGFuZ2UnLCAob2xHZW9tZXRyeUV2ZW50OiBPbEdlb21ldHJ5RXZlbnQpID0+IHtcclxuICAgICAgdGhpcy5tb3VzZVBvc2l0aW9uID0gZ2V0TW91c2VQb3NpdGlvbkZyb21PbEdlb21ldHJ5RXZlbnQob2xHZW9tZXRyeUV2ZW50KTtcclxuICAgICAgdGhpcy5jaGFuZ2VzJC5uZXh0KG9sR2VvbWV0cnlFdmVudC50YXJnZXQpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnN1YnNjcmliZVRvS2V5RG93bigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBtb2RpZnlpbmcgZW5kcywgdXBkYXRlIHRoZSBnZW9tZXRyeSBvYnNlcnZhYmxlIGFuZCBzdG9wIHdhdGNoaW5nIGZvciBjaGFuZ2VzXHJcbiAgICogQHBhcmFtIGV2ZW50IE1vZGlmeSBlbmQgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uTW9kaWZ5RW5kKGV2ZW50OiBPbE1vZGlmeUV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5vbk1vZGlmeUtleSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHVuQnlLZXkodGhpcy5vbk1vZGlmeUtleSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmVuZCQubmV4dChldmVudC5mZWF0dXJlcy5pdGVtKDApLmdldEdlb21ldHJ5KCkpO1xyXG4gICAgdGhpcy51bnN1YnNjcmliZVRvS2V5RG93bigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaWJlIHRvIENUUkwga2V5IGRvd24gdG8gYWN0aXZhdGUgdGhlIGRyYXcgY29udHJvbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9LZXlEb3duKCkge1xyXG4gICAgdGhpcy5rZXlEb3duJCQgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdrZXlkb3duJykuc3Vic2NyaWJlKChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzIpIHtcclxuICAgICAgICAvLyBPbiBzcGFjZSBiYXIsIHBhbiB0byB0aGUgY3VycmVudCBtb3VzZSBwb3NpdGlvblxyXG4gICAgICAgIHRoaXMub2xNYXAuZ2V0VmlldygpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgY2VudGVyOiB0aGlzLm1vdXNlUG9zaXRpb24sXHJcbiAgICAgICAgICBkdXJhdGlvbjogMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbnN1YnNjcmliZSB0byBrZXkgZG93blxyXG4gICAqL1xyXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVUb0tleURvd24oKSB7XHJcbiAgICBpZiAodGhpcy5rZXlEb3duJCQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmtleURvd24kJC51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGEgdHJhbnNsYXRlIGludGVyYWN0aW9uIHRvIHRoZSBtYXAgYW4gc2V0IHVwIHNvbWUgbGlzdGVuZXJzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRPbFRyYW5zbGF0ZUludGVyYWN0aW9uKCkge1xyXG4gICAgY29uc3Qgb2xUcmFuc2xhdGVJbnRlcmFjdGlvbiA9IG5ldyBPbFRyYW5zbGF0ZSh7XHJcbiAgICAgIGxheWVyczogW3RoaXMub2xPdmVybGF5TGF5ZXJdXHJcbiAgICB9KTtcclxuICAgIHRoaXMub2xUcmFuc2xhdGVJbnRlcmFjdGlvbiA9IG9sVHJhbnNsYXRlSW50ZXJhY3Rpb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgdGhlIHRyYW5zbGF0ZSBpbnRlcmFjdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlT2xUcmFuc2xhdGVJbnRlcmFjdGlvbigpIHtcclxuICAgIGlmICh0aGlzLm9sVHJhbnNsYXRlSW50ZXJhY3Rpb24gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kZWFjdGl2YXRlVHJhbnNsYXRlSW50ZXJhY3Rpb24oKTtcclxuICAgIHRoaXMub2xUcmFuc2xhdGVJbnRlcmFjdGlvbiA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWN0aXZhdGVUcmFuc2xhdGVJbnRlcmFjdGlvbigpIHtcclxuICAgIGlmICh0aGlzLm9sVHJhbnNsYXRlSW50ZXJhY3Rpb25Jc0FjdGl2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vbFRyYW5zbGF0ZUludGVyYWN0aW9uSXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5vblRyYW5zbGF0ZVN0YXJ0S2V5ID0gdGhpcy5vbFRyYW5zbGF0ZUludGVyYWN0aW9uXHJcbiAgICAgIC5vbigndHJhbnNsYXRlc3RhcnQnLCAoZXZlbnQ6IE9sVHJhbnNsYXRlRXZlbnQpID0+IHRoaXMub25UcmFuc2xhdGVTdGFydChldmVudCkpO1xyXG4gICAgdGhpcy5vblRyYW5zbGF0ZUVuZEtleSA9IHRoaXMub2xUcmFuc2xhdGVJbnRlcmFjdGlvblxyXG4gICAgICAub24oJ3RyYW5zbGF0ZWVuZCcsIChldmVudDogT2xUcmFuc2xhdGVFdmVudCkgPT4gdGhpcy5vblRyYW5zbGF0ZUVuZChldmVudCkpO1xyXG4gICAgdGhpcy5vbE1hcC5hZGRJbnRlcmFjdGlvbih0aGlzLm9sVHJhbnNsYXRlSW50ZXJhY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkZWFjdGl2YXRlVHJhbnNsYXRlSW50ZXJhY3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5vbFRyYW5zbGF0ZUludGVyYWN0aW9uSXNBY3RpdmUgPT09IGZhbHNlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9sVHJhbnNsYXRlSW50ZXJhY3Rpb25Jc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdW5CeUtleSh0aGlzLm9uVHJhbnNsYXRlU3RhcnRLZXkpO1xyXG4gICAgdW5CeUtleSh0aGlzLm9uVHJhbnNsYXRlRW5kS2V5KTtcclxuICAgIGlmICh0aGlzLm9sTWFwICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbE1hcC5yZW1vdmVJbnRlcmFjdGlvbih0aGlzLm9sVHJhbnNsYXRlSW50ZXJhY3Rpb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0cmFuc2xhdGlvbiBzdGFydHMsIGNsZWFyIHRoZSBvdmVybGF5IGFuZCBzdGFydCB3YXRjaGluZyBmb3IgY2hhbmdlc1xyXG4gICAqIEBwYXJhbSBldmVudCBUcmFuc2xhdGUgc3RhcnQgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uVHJhbnNsYXRlU3RhcnQoZXZlbnQ6IE9sVHJhbnNsYXRlRXZlbnQpIHtcclxuICAgIGNvbnN0IG9sR2VvbWV0cnkgPSBldmVudC5mZWF0dXJlcy5pdGVtKDApLmdldEdlb21ldHJ5KCk7XHJcbiAgICB0aGlzLnN0YXJ0JC5uZXh0KG9sR2VvbWV0cnkpO1xyXG4gICAgdGhpcy5vblRyYW5zbGF0ZUtleSA9IG9sR2VvbWV0cnkub24oJ2NoYW5nZScsIChvbEdlb21ldHJ5RXZlbnQ6IE9sR2VvbWV0cnlFdmVudCkgPT4ge1xyXG4gICAgICB0aGlzLmNoYW5nZXMkLm5leHQob2xHZW9tZXRyeUV2ZW50LnRhcmdldCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdHJhbnNsYXRpb24gZW5kcywgdXBkYXRlIHRoZSBnZW9tZXRyeSBvYnNlcnZhYmxlIGFuZCBzdG9wIHdhdGNoaWduIGZvciBjaGFuZ2VzXHJcbiAgICogQHBhcmFtIGV2ZW50IFRyYW5zbGF0ZSBlbmQgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uVHJhbnNsYXRlRW5kKGV2ZW50OiBPbFRyYW5zbGF0ZUV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5vblRyYW5zbGF0ZUtleSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHVuQnlLZXkodGhpcy5vblRyYW5zbGF0ZUtleSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmVuZCQubmV4dChldmVudC5mZWF0dXJlcy5pdGVtKDApLmdldEdlb21ldHJ5KCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGEgZHJhdyBpbnRlcmFjdGlvbiB0byB0aGUgbWFwIGFuIHNldCB1cCBzb21lIGxpc3RlbmVyc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkT2xEcmF3SW50ZXJhY3Rpb24oKSB7XHJcbiAgICBjb25zdCBvbERyYXdJbnRlcmFjdGlvbiA9IG5ldyBPbERyYXcoe1xyXG4gICAgICB0eXBlOiAnUG9seWdvbicsXHJcbiAgICAgIHNvdXJjZTogdGhpcy5vbExpbmVhclJpbmdzU291cmNlLFxyXG4gICAgICBzdG9wQ2xpY2s6IHRydWUsXHJcbiAgICAgIHN0eWxlOiBjcmVhdGVEcmF3SG9sZUludGVyYWN0aW9uU3R5bGUoKSxcclxuICAgICAgY29uZGl0aW9uOiAoZXZlbnQ6IE9sTWFwQnJvd3NlckV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3Qgb2xPdXRlckdlb21ldHJ5ID0gdGhpcy5vbE91dGVyR2VvbWV0cnkgfHwgdGhpcy5nZXRPbEdlb21ldHJ5KCk7XHJcbiAgICAgICAgcmV0dXJuIG9sT3V0ZXJHZW9tZXRyeS5pbnRlcnNlY3RzQ29vcmRpbmF0ZShldmVudC5jb29yZGluYXRlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5vbERyYXdJbnRlcmFjdGlvbiA9IG9sRHJhd0ludGVyYWN0aW9uO1xyXG4gICAgdGhpcy5zdWJzY3JpYmVUb0RyYXdLZXlEb3duKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpYmUgdG8gQ1RSTCBrZXkgZG93biB0byBhY3RpdmF0ZSB0aGUgZHJhdyBjb250cm9sXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb0RyYXdLZXlEb3duKCkge1xyXG4gICAgdGhpcy5kcmF3S2V5RG93biQkID0gZnJvbUV2ZW50KGRvY3VtZW50LCAna2V5ZG93bicpLnN1YnNjcmliZSgoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcclxuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgIT09IDE3KSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgdGhpcy51bnN1YnNjcmliZVRvRHJhd0tleURvd24oKTtcclxuXHJcbiAgICAgIGNvbnN0IG9sR2VvbWV0cnkgPSB0aGlzLmdldE9sR2VvbWV0cnkoKTtcclxuICAgICAgaWYgKCFvbEdlb21ldHJ5IHx8ICEob2xHZW9tZXRyeSBpbnN0YW5jZW9mIE9sUG9seWdvbikpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICB0aGlzLnN1YnNjcmliZVRvRHJhd0tleVVwKCk7XHJcblxyXG4gICAgICB0aGlzLmRlYWN0aXZhdGVNb2RpZnlJbnRlcmFjdGlvbigpO1xyXG4gICAgICB0aGlzLmRlYWN0aXZhdGVUcmFuc2xhdGVJbnRlcmFjdGlvbigpO1xyXG4gICAgICB0aGlzLmFjdGl2YXRlRHJhd0ludGVyYWN0aW9uKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmliZSB0byBDVFJMIGtleSB1cCB0byBkZWFjdGl2YXRlIHRoZSBkcmF3IGNvbnRyb2xcclxuICAgKi9cclxuICBwcml2YXRlIHN1YnNjcmliZVRvRHJhd0tleVVwKCkge1xyXG4gICAgdGhpcy5kcmF3S2V5VXAkJCA9IGZyb21FdmVudChkb2N1bWVudCwgJ2tleXVwJylcclxuICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcclxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSAhPT0gMTcpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmVUb0RyYXdLZXlVcCgpO1xyXG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmVUb0tleURvd24oKTtcclxuICAgICAgICB0aGlzLmRlYWN0aXZhdGVEcmF3SW50ZXJhY3Rpb24oKTtcclxuXHJcbiAgICAgICAgdGhpcy5hY3RpdmF0ZU1vZGlmeUludGVyYWN0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmF0ZVRyYW5zbGF0ZUludGVyYWN0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVUb0RyYXdLZXlEb3duKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZW5kJC5uZXh0KHRoaXMuZ2V0T2xHZW9tZXRyeSgpKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbnN1YnNjcmliZSB0byBkcmF3IGtleSBkb3duXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1bnN1YnNjcmliZVRvRHJhd0tleURvd24oKSB7XHJcbiAgICBpZiAodGhpcy5kcmF3S2V5RG93biQkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5kcmF3S2V5RG93biQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbnN1YnNjcmliZSB0byBrZXkgdXBcclxuICAgKi9cclxuICBwcml2YXRlIHVuc3Vic2NyaWJlVG9EcmF3S2V5VXAoKSB7XHJcbiAgICBpZiAodGhpcy5kcmF3S2V5VXAkJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuZHJhd0tleVVwJCQudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSB0aGUgZHJhdyBpbnRlcmFjdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlT2xEcmF3SW50ZXJhY3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5vbERyYXdJbnRlcmFjdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVuc3Vic2NyaWJlVG9LZXlEb3duKCk7XHJcbiAgICB0aGlzLnVuc3Vic2NyaWJlVG9EcmF3S2V5VXAoKTtcclxuICAgIHRoaXMudW5zdWJzY3JpYmVUb0RyYXdLZXlEb3duKCk7XHJcbiAgICB0aGlzLmRlYWN0aXZhdGVEcmF3SW50ZXJhY3Rpb24oKTtcclxuICAgIHRoaXMub2xEcmF3SW50ZXJhY3Rpb24gPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBY3RpdmF0ZSB0aGUgZHJhdyBpbnRlcmFjdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWN0aXZhdGVEcmF3SW50ZXJhY3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5vbERyYXdJbnRlcmFjdGlvbklzQWN0aXZlID09PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNsZWFyT2xMaW5lYXJSaW5nc1NvdXJjZSgpO1xyXG4gICAgdGhpcy5hZGRPbExpbmVhclJpbmdzTGF5ZXIoKTtcclxuXHJcbiAgICB0aGlzLm9sTWFwLmdldEludGVyYWN0aW9ucygpLmZvckVhY2goKG9sSW50ZXJhY3Rpb246IE9sSW50ZXJhY3Rpb24pID0+IHtcclxuICAgICAgaWYgKG9sSW50ZXJhY3Rpb24gaW5zdGFuY2VvZiBPbERyYWdCb3hJbnRlcmFjdGlvbikge1xyXG4gICAgICAgIHRoaXMub2xNYXAucmVtb3ZlSW50ZXJhY3Rpb24ob2xJbnRlcmFjdGlvbik7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVkT2xJbnRlcmFjdGlvbnMucHVzaChvbEludGVyYWN0aW9uKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5vbERyYXdJbnRlcmFjdGlvbklzQWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMub25EcmF3U3RhcnRLZXkgPSB0aGlzLm9sRHJhd0ludGVyYWN0aW9uXHJcbiAgICAgIC5vbignZHJhd3N0YXJ0JywgKGV2ZW50OiBPbERyYXdFdmVudCkgPT4gdGhpcy5vbkRyYXdTdGFydChldmVudCkpO1xyXG4gICAgdGhpcy5vbkRyYXdFbmRLZXkgPSB0aGlzLm9sRHJhd0ludGVyYWN0aW9uXHJcbiAgICAgIC5vbignZHJhd2VuZCcsIChldmVudDogT2xEcmF3RXZlbnQpID0+IHRoaXMub25EcmF3RW5kKGV2ZW50KSk7XHJcbiAgICB0aGlzLm9sTWFwLmFkZEludGVyYWN0aW9uKHRoaXMub2xEcmF3SW50ZXJhY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVhY3RpdmF0ZSB0aGUgZHJhdyBpbnRlcmFjdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgZGVhY3RpdmF0ZURyYXdJbnRlcmFjdGlvbigpIHtcclxuICAgIGlmICh0aGlzLm9sRHJhd0ludGVyYWN0aW9uSXNBY3RpdmUgPT09IGZhbHNlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlbW92ZU9sTGluZWFyUmluZ3NMYXllcigpO1xyXG5cclxuICAgIHRoaXMucmVtb3ZlZE9sSW50ZXJhY3Rpb25zLmZvckVhY2goKG9sSW50ZXJhY3Rpb246IE9sSW50ZXJhY3Rpb24pID0+IHtcclxuICAgICAgdGhpcy5vbE1hcC5hZGRJbnRlcmFjdGlvbihvbEludGVyYWN0aW9uKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMub2xEcmF3SW50ZXJhY3Rpb25Jc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdW5CeUtleSh0aGlzLm9uRHJhd1N0YXJ0S2V5KTtcclxuICAgIHVuQnlLZXkodGhpcy5vbkRyYXdFbmRLZXkpO1xyXG4gICAgaWYgKHRoaXMub2xNYXAgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9sTWFwLnJlbW92ZUludGVyYWN0aW9uKHRoaXMub2xEcmF3SW50ZXJhY3Rpb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBkcmF3IHN0YXJ0LCBhZGQgYSBuZXcgbGluZXJhciByaW5nIHRvIHRoZSBnZW9tZXRyeSBhbmQgc3RhcnQgd2F0Y2hpbmcgZm9yIGNoYW5nZXNcclxuICAgKiBAcGFyYW0gZXZlbnQgRHJhdyBzdGFydCBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25EcmF3U3RhcnQoZXZlbnQ6IE9sRHJhd0V2ZW50KSB7XHJcbiAgICBjb25zdCBvbEdlb21ldHJ5ID0gZXZlbnQuZmVhdHVyZS5nZXRHZW9tZXRyeSgpO1xyXG4gICAgdGhpcy5vbE91dGVyR2VvbWV0cnkgPSB0aGlzLmdldE9sR2VvbWV0cnkoKS5jbG9uZSgpO1xyXG5cclxuICAgIGNvbnN0IGxpbmVhclJpbmdDb29yZGluYXRlcyA9IG9sR2VvbWV0cnkuZ2V0TGluZWFyUmluZygpLmdldENvb3JkaW5hdGVzKCk7XHJcbiAgICB0aGlzLmFkZExpbmVhclJpbmdUb09sR2VvbWV0cnkobGluZWFyUmluZ0Nvb3JkaW5hdGVzKTtcclxuICAgIHRoaXMuc3RhcnQkLm5leHQodGhpcy5nZXRPbEdlb21ldHJ5KCkpO1xyXG5cclxuICAgIHRoaXMub25EcmF3S2V5ID0gb2xHZW9tZXRyeS5vbignY2hhbmdlJywgKG9sR2VvbWV0cnlFdmVudDogT2xHZW9tZXRyeUV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IF9saW5lYXJSaW5nQ29vcmRpbmF0ZXMgPSBvbEdlb21ldHJ5RXZlbnQudGFyZ2V0LmdldExpbmVhclJpbmcoKS5nZXRDb29yZGluYXRlcygpO1xyXG4gICAgICB0aGlzLnVwZGF0ZUxpbmVhclJpbmdPZk9sR2VvbWV0cnkoX2xpbmVhclJpbmdDb29yZGluYXRlcyk7XHJcbiAgICAgIHRoaXMuY2hhbmdlcyQubmV4dCh0aGlzLmdldE9sR2VvbWV0cnkoKSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc3Vic2NyaWJlVG9LZXlEb3duKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHRyYW5zbGF0aW9uIGVuZHMsIHVwZGF0ZSB0aGUgZ2VvbWV0cnkgb2JzZXJ2YWJsZSBhbmQgc3RvcCB3YXRjaGlnbiBmb3IgY2hhbmdlc1xyXG4gICAqIEBwYXJhbSBldmVudCBEcmF3IGVuZCBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25EcmF3RW5kKGV2ZW50OiBPbERyYXdFdmVudCkge1xyXG4gICAgaWYgKHRoaXMub25EcmF3S2V5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdW5CeUtleSh0aGlzLm9uRHJhd0tleSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vbE91dGVyR2VvbWV0cnkgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgY29uc3QgbGluZWFyUmluZ0Nvb3JkaW5hdGVzID0gZXZlbnQuZmVhdHVyZS5nZXRHZW9tZXRyeSgpLmdldExpbmVhclJpbmcoKS5nZXRDb29yZGluYXRlcygpO1xyXG4gICAgdGhpcy51cGRhdGVMaW5lYXJSaW5nT2ZPbEdlb21ldHJ5KGxpbmVhclJpbmdDb29yZGluYXRlcyk7XHJcbiAgICB0aGlzLmNsZWFyT2xMaW5lYXJSaW5nc1NvdXJjZSgpO1xyXG4gICAgdGhpcy5lbmQkLm5leHQodGhpcy5nZXRPbEdlb21ldHJ5KCkpO1xyXG4gICAgdGhpcy51bnN1YnNjcmliZVRvS2V5RG93bigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGEgbGluZWFyIHJpbmcgdG8gdGhlIGdlb21ldHJ5IGJlaW5nIG1vZGlmaWVkXHJcbiAgICogQHBhcmFtIGNvb3JkaW5hdGVzIExpbmVhciByaW5nIGNvb3JkaW5hdGVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRMaW5lYXJSaW5nVG9PbEdlb21ldHJ5KGNvb3JkaW5hdGVzOiBudW1iZXJbXSkge1xyXG4gICAgY29uc3Qgb2xHZW9tZXRyeSA9IHRoaXMuZ2V0T2xHZW9tZXRyeSgpO1xyXG4gICAgY29uc3Qgb2xMaW5lYXJSaW5nID0gbmV3IE9sTGluZWFyUmluZyhjb29yZGluYXRlcyk7XHJcbiAgICBhZGRMaW5lYXJSaW5nVG9PbFBvbHlnb24ob2xHZW9tZXRyeSwgb2xMaW5lYXJSaW5nKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSB0aGUgbGFzdCBsaW5lYXIgcmluZyBvZiB0aGUgZ2VvbWV0cnkgYmVpbmcgbW9kaWZpZWRcclxuICAgKiBAcGFyYW0gY29vcmRpbmF0ZXMgTGluZWFyIHJpbmcgY29vcmRpbmF0ZXNcclxuICAgKi9cclxuICBwcml2YXRlIHVwZGF0ZUxpbmVhclJpbmdPZk9sR2VvbWV0cnkoY29vcmRpbmF0ZXM6IG51bWJlcltdKSB7XHJcbiAgICBjb25zdCBvbEdlb21ldHJ5ID0gdGhpcy5nZXRPbEdlb21ldHJ5KCk7XHJcbiAgICAvLyBSZW1vdmUgdGhlIGxhc3QgbGluZWFyIHJpbmcgKHRoZSBvbmUgd2UgYXJlIHVwZGF0aW5nKVxyXG4gICAgY29uc3Qgb2xMaW5lYXJSaW5ncyA9IG9sR2VvbWV0cnkuZ2V0TGluZWFyUmluZ3MoKS5zbGljZSgwLCAtMSk7XHJcbiAgICBjb25zdCBuZXdDb29yZGluYXRlcyA9IG9sTGluZWFyUmluZ3MubWFwKChvbExpbmVhclJpbmc6IE9sTGluZWFyUmluZykgPT4ge1xyXG4gICAgICByZXR1cm4gb2xMaW5lYXJSaW5nLmdldENvb3JkaW5hdGVzKCk7XHJcbiAgICB9KTtcclxuICAgIG5ld0Nvb3JkaW5hdGVzLnB1c2goY29vcmRpbmF0ZXMpO1xyXG4gICAgb2xHZW9tZXRyeS5zZXRDb29yZGluYXRlcyhuZXdDb29yZGluYXRlcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGdlb21ldHJ5IGJlaW5nIG1vZGlmaWVkXHJcbiAgICogQHJldHVybnMgT0wgR2VvbWV0cnlcclxuICAgKi9cclxuICBwcml2YXRlIGdldE9sR2VvbWV0cnkoKTogT2xHZW9tZXRyeSB7XHJcbiAgICBjb25zdCBvbEZlYXR1cmVzID0gdGhpcy5vbE92ZXJsYXlTb3VyY2UuZ2V0RmVhdHVyZXMoKTtcclxuICAgIHJldHVybiBvbEZlYXR1cmVzLmxlbmd0aCA+IDAgPyBvbEZlYXR1cmVzWzBdLmdldEdlb21ldHJ5KCkgOiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=