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
import { addLinearRingToOlPolygon, createDrawHoleInteractionStyle } from '../geometry.utils';
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
            this.changes$.next(olGeometryEvent.target);
        }));
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
            // On ESC key down, remove the last vertex
            if (event.keyCode === 27 && this.olDrawInteractionIsActive === true) {
                this.olDrawInteraction.removeLastPoint();
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
                return this.getOlGeometry().intersectsCoordinate(event.coordinate);
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
        this.drawKeyUp$$ = fromEvent(document, 'keyup').subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (event.keyCode !== 17) {
                return;
            }
            this.unsubscribeToDrawKeyUp();
            this.subscribeToDrawKeyDown();
            this.deactivateDrawInteraction();
            this.activateModifyInteraction();
            this.activateTranslateInteraction();
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
     * When draw start, add a new linerar ring to the geometrty and start watching for changes
     * @private
     * @param {?} event Draw start event
     * @return {?}
     */
    onDrawStart(event) {
        /** @type {?} */
        const olGeometry = event.feature.getGeometry();
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
    /**
     * @type {?}
     * @private
     */
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
    ModifyControl.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZ5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2dlb21ldHJ5L3NoYXJlZC9jb250cm9scy9tb2RpZnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sU0FBUyxNQUFNLFlBQVksQ0FBQztBQUVuQyxPQUFPLGNBQWMsTUFBTSxrQkFBa0IsQ0FBQztBQUM5QyxPQUFPLGFBQWEsTUFBTSxpQkFBaUIsQ0FBQztBQUM1QyxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLFNBQVMsTUFBTSxpQkFBaUIsQ0FBQztBQUN4QyxPQUFPLFlBQVksTUFBTSxvQkFBb0IsQ0FBQztBQUU5QyxPQUFPLG9CQUFvQixNQUFNLHdCQUF3QixDQUFDO0FBUzFELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFeEMsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXhELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSw4QkFBOEIsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7O0FBRTdGLDBDQUtDOzs7SUFKQyxzQ0FBd0I7O0lBQ3hCLHFDQUFzQjs7SUFDdEIsMENBQTJEOztJQUMzRCx5Q0FBMEQ7Ozs7O0FBTTVELE1BQU0sT0FBTyxhQUFhOzs7O0lBaUV4QixZQUFvQixPQUE2QjtRQUE3QixZQUFPLEdBQVAsT0FBTyxDQUFzQjs7OztRQTVEMUMsV0FBTSxHQUF3QixJQUFJLE9BQU8sRUFBRSxDQUFDOzs7O1FBSzVDLFNBQUksR0FBd0IsSUFBSSxPQUFPLEVBQUUsQ0FBQzs7OztRQUsxQyxhQUFRLEdBQXdCLElBQUksT0FBTyxFQUFFLENBQUM7UUFRN0MsZ0NBQTJCLEdBQVksS0FBSyxDQUFDO1FBSzdDLG1DQUE4QixHQUFZ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Ozs7OztJQUNyQix1Q0FBc0M7Ozs7O0lBQ3RDLDRDQUFzQzs7Ozs7SUFDdEMseUNBQWlDOzs7OztJQUNqQyx1Q0FBK0I7Ozs7O0lBQy9CLG9DQUE0Qjs7Ozs7SUFDNUIsb0RBQXFEOzs7OztJQUNyRCwrQ0FBNEM7Ozs7O0lBQzVDLDRDQUFvQzs7Ozs7SUFDcEMsMENBQWtDOzs7OztJQUNsQyx1Q0FBK0I7Ozs7O0lBQy9CLHVEQUF3RDs7Ozs7SUFDeEQsMENBQXVDOzs7OztJQUN2Qyx1Q0FBK0I7Ozs7O0lBQy9CLHFDQUE2Qjs7Ozs7SUFDN0Isa0NBQTBCOzs7OztJQUMxQixrREFBbUQ7Ozs7O0lBRW5ELGtDQUFnQzs7Ozs7SUFDaEMsb0NBQWtDOzs7OztJQUNsQyxzQ0FBb0M7Ozs7O0lBRXBDLDhDQUFvRDs7Ozs7SUFDcEQsMkNBQTBDOzs7OztJQXlCOUIsZ0NBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE9sTWFwIGZyb20gJ29sL01hcCc7XHJcbmltcG9ydCBPbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCBPbFN0eWxlIGZyb20gJ29sL3N0eWxlJztcclxuaW1wb3J0IE9sVmVjdG9yU291cmNlIGZyb20gJ29sL3NvdXJjZS9WZWN0b3InO1xyXG5pbXBvcnQgT2xWZWN0b3JMYXllciBmcm9tICdvbC9sYXllci9WZWN0b3InO1xyXG5pbXBvcnQgT2xNb2RpZnkgZnJvbSAnb2wvaW50ZXJhY3Rpb24vTW9kaWZ5JztcclxuaW1wb3J0IE9sVHJhbnNsYXRlIGZyb20gJ29sL2ludGVyYWN0aW9uL1RyYW5zbGF0ZSc7XHJcbmltcG9ydCBPbERyYXcgZnJvbSAnb2wvaW50ZXJhY3Rpb24vRHJhdyc7XHJcbmltcG9ydCBPbFBvbHlnb24gZnJvbSAnb2wvZ2VvbS9Qb2x5Z29uJztcclxuaW1wb3J0IE9sTGluZWFyUmluZyBmcm9tICdvbC9nZW9tL0xpbmVhclJpbmcnO1xyXG5pbXBvcnQgT2xJbnRlcmFjdGlvbiBmcm9tICdvbC9pbnRlcmFjdGlvbi9JbnRlcmFjdGlvbic7XHJcbmltcG9ydCBPbERyYWdCb3hJbnRlcmFjdGlvbiBmcm9tICdvbC9pbnRlcmFjdGlvbi9EcmFnQm94JztcclxuaW1wb3J0IHsgTWFwQnJvd3NlckV2ZW50IGFzIE9sTWFwQnJvd3NlckV2ZW50IH0gZnJvbSAnb2wvTWFwQnJvd3NlckV2ZW50JztcclxuaW1wb3J0IHtcclxuICBHZW9tZXRyeSBhcyBPbEdlb21ldHJ5LFxyXG4gIEdlb21ldHJ5RXZlbnQgYXMgT2xHZW9tZXRyeUV2ZW50XHJcbn0gZnJvbSAnb2wvZ2VvbS9HZW9tZXRyeSc7XHJcbmltcG9ydCB7IE1vZGlmeUV2ZW50IGFzIE9sTW9kaWZ5RXZlbnQgfSBmcm9tICdvbC9pbnRlcmFjdGlvbi9Nb2RpZnknO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVFdmVudCBhcyBPbFRyYW5zbGF0ZUV2ZW50IH0gZnJvbSAnb2wvaW50ZXJhY3Rpb24vVHJhbnNsYXRlJztcclxuaW1wb3J0IHsgRHJhd0V2ZW50IGFzIE9sRHJhd0V2ZW50IH0gZnJvbSAnb2wvaW50ZXJhY3Rpb24vRHJhdyc7XHJcbmltcG9ydCB7IHVuQnlLZXkgfSBmcm9tICdvbC9PYnNlcnZhYmxlJztcclxuXHJcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiwgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBhZGRMaW5lYXJSaW5nVG9PbFBvbHlnb24sIGNyZWF0ZURyYXdIb2xlSW50ZXJhY3Rpb25TdHlsZSB9IGZyb20gJy4uL2dlb21ldHJ5LnV0aWxzJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTW9kaWZ5Q29udHJvbE9wdGlvbnMge1xyXG4gIHNvdXJjZT86IE9sVmVjdG9yU291cmNlO1xyXG4gIGxheWVyPzogT2xWZWN0b3JMYXllcjtcclxuICBsYXllclN0eWxlPzogT2xTdHlsZSB8ICgob2xmZWF0dXJlOiBPbEZlYXR1cmUpID0+IE9sU3R5bGUpO1xyXG4gIGRyYXdTdHlsZT86IE9sU3R5bGUgfCAoKG9sZmVhdHVyZTogT2xGZWF0dXJlKSA9PiBPbFN0eWxlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnRyb2wgdG8gbW9kaWZ5IGdlb21ldHJpZXNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNb2RpZnlDb250cm9sIHtcclxuXHJcbiAgLyoqXHJcbiAgICogTW9kaWZ5IHN0YXJ0IG9ic2VydmFibGVcclxuICAgKi9cclxuICBwdWJsaWMgc3RhcnQkOiBTdWJqZWN0PE9sR2VvbWV0cnk+ID0gbmV3IFN1YmplY3QoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogTW9kaWZ5IGVuZCBvYnNlcnZhYmxlXHJcbiAgICovXHJcbiAgcHVibGljIGVuZCQ6IFN1YmplY3Q8T2xHZW9tZXRyeT4gPSBuZXcgU3ViamVjdCgpO1xyXG5cclxuICAvKipcclxuICAgKiBHZW9tZXRyeSBjaGFuZ2VzIG9ic2VydmFibGVcclxuICAgKi9cclxuICBwdWJsaWMgY2hhbmdlcyQ6IFN1YmplY3Q8T2xHZW9tZXRyeT4gPSBuZXcgU3ViamVjdCgpO1xyXG5cclxuICBwcml2YXRlIG9sTWFwOiBPbE1hcDtcclxuICBwcml2YXRlIG9sT3ZlcmxheUxheWVyOiBPbFZlY3RvckxheWVyO1xyXG4gIHByaXZhdGUgb2xNb2RpZnlJbnRlcmFjdGlvbjogT2xNb2RpZnk7XHJcbiAgcHJpdmF0ZSBvbk1vZGlmeVN0YXJ0S2V5OiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBvbk1vZGlmeUVuZEtleTogc3RyaW5nO1xyXG4gIHByaXZhdGUgb25Nb2RpZnlLZXk6IHN0cmluZztcclxuICBwcml2YXRlIG9sTW9kaWZ5SW50ZXJhY3Rpb25Jc0FjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHByaXZhdGUgb2xUcmFuc2xhdGVJbnRlcmFjdGlvbjogT2xUcmFuc2xhdGU7XHJcbiAgcHJpdmF0ZSBvblRyYW5zbGF0ZVN0YXJ0S2V5OiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBvblRyYW5zbGF0ZUVuZEtleTogc3RyaW5nO1xyXG4gIHByaXZhdGUgb25UcmFuc2xhdGVLZXk6IHN0cmluZztcclxuICBwcml2YXRlIG9sVHJhbnNsYXRlSW50ZXJhY3Rpb25Jc0FjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHByaXZhdGUgb2xEcmF3SW50ZXJhY3Rpb246IE9sVHJhbnNsYXRlO1xyXG4gIHByaXZhdGUgb25EcmF3U3RhcnRLZXk6IHN0cmluZztcclxuICBwcml2YXRlIG9uRHJhd0VuZEtleTogc3RyaW5nO1xyXG4gIHByaXZhdGUgb25EcmF3S2V5OiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBvbERyYXdJbnRlcmFjdGlvbklzQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIHByaXZhdGUga2V5RG93biQkOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBkcmF3S2V5VXAkJDogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgZHJhd0tleURvd24kJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBwcml2YXRlIHJlbW92ZWRPbEludGVyYWN0aW9uczogT2xJbnRlcmFjdGlvbltdID0gW107XHJcbiAgcHJpdmF0ZSBvbExpbmVhclJpbmdzTGF5ZXI6IE9sVmVjdG9yTGF5ZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRlciB0aGUgY29udHJvbCBpcyBhY3RpdmVcclxuICAgKi9cclxuICBnZXQgYWN0aXZlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMub2xNYXAgIT09IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9MIG92ZXJsYXkgc291cmNlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IG9sT3ZlcmxheVNvdXJjZSgpOiBPbFZlY3RvclNvdXJjZSB7XHJcbiAgICByZXR1cm4gdGhpcy5vbE92ZXJsYXlMYXllci5nZXRTb3VyY2UoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9MIGxpbmVhciByaW5ncyBzb3VyY2VcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgb2xMaW5lYXJSaW5nc1NvdXJjZSgpOiBPbFZlY3RvclNvdXJjZSB7XHJcbiAgICByZXR1cm4gdGhpcy5vbExpbmVhclJpbmdzTGF5ZXIuZ2V0U291cmNlKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG9wdGlvbnM6IE1vZGlmeUNvbnRyb2xPcHRpb25zKSB7XHJcbiAgICBpZiAob3B0aW9ucy5sYXllciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2xPdmVybGF5TGF5ZXIgPSBvcHRpb25zLmxheWVyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5vbE92ZXJsYXlMYXllciA9IHRoaXMuY3JlYXRlT2xJbm5lck92ZXJsYXlMYXllcigpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vbExpbmVhclJpbmdzTGF5ZXIgPSB0aGlzLmNyZWF0ZU9sTGluZWFyUmluZ3NMYXllcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIG9yIHJlbW92ZSB0aGlzIGNvbnRyb2wgdG8vZnJvbSBhIG1hcC5cclxuICAgKiBAcGFyYW0gbWFwIE9MIE1hcFxyXG4gICAqL1xyXG4gIHNldE9sTWFwKG9sTWFwOiBPbE1hcCB8IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKG9sTWFwID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5jbGVhck9sSW5uZXJPdmVybGF5U291cmNlKCk7XHJcbiAgICAgIHRoaXMucmVtb3ZlT2xJbm5lck92ZXJsYXlMYXllcigpO1xyXG4gICAgICB0aGlzLnJlbW92ZU9sTW9kaWZ5SW50ZXJhY3Rpb24oKTtcclxuICAgICAgdGhpcy5yZW1vdmVPbFRyYW5zbGF0ZUludGVyYWN0aW9uKCk7XHJcbiAgICAgIHRoaXMucmVtb3ZlT2xEcmF3SW50ZXJhY3Rpb24oKTtcclxuICAgICAgdGhpcy5vbE1hcCA9IG9sTWFwO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vbE1hcCA9IG9sTWFwO1xyXG4gICAgdGhpcy5hZGRPbElubmVyT3ZlcmxheUxheWVyKCk7XHJcbiAgICB0aGlzLmFkZE9sRHJhd0ludGVyYWN0aW9uKCk7XHJcbiAgICB0aGlzLmFkZE9sVHJhbnNsYXRlSW50ZXJhY3Rpb24oKTtcclxuICAgIHRoaXMuYWN0aXZhdGVUcmFuc2xhdGVJbnRlcmFjdGlvbigpO1xyXG4gICAgdGhpcy5hZGRPbE1vZGlmeUludGVyYWN0aW9uKCk7XHJcbiAgICB0aGlzLmFjdGl2YXRlTW9kaWZ5SW50ZXJhY3Rpb24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiB0aGUgb3ZlcmxheSBzb3VyY2VcclxuICAgKi9cclxuICBnZXRTb3VyY2UoKTogT2xWZWN0b3JTb3VyY2Uge1xyXG4gICAgcmV0dXJuIHRoaXMub2xPdmVybGF5U291cmNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGFuIE9MIGdlb21ldHJ5IHRvIHRoZSBvdmVybGF5IGFuZCBzdGFydCBtb2RpZnlpbmcgaXRcclxuICAgKiBAcGFyYW0gb2xHZW9tZXRyeSBPbCBHZW9tZXRyeVxyXG4gICAqL1xyXG4gIHNldE9sR2VvbWV0cnkob2xHZW9tZXRyeTogT2xHZW9tZXRyeSkge1xyXG4gICAgY29uc3Qgb2xGZWF0dXJlID0gbmV3IE9sRmVhdHVyZSh7Z2VvbWV0cnk6IG9sR2VvbWV0cnl9KTtcclxuICAgIHRoaXMub2xPdmVybGF5U291cmNlLmNsZWFyKCk7XHJcbiAgICB0aGlzLm9sT3ZlcmxheVNvdXJjZS5hZGRGZWF0dXJlKG9sRmVhdHVyZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYW4gb3ZlcmxheSBzb3VyY2UgaWYgbm9uZSBpcyBkZWZpbmVkIGluIHRoZSBvcHRpb25zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjcmVhdGVPbElubmVyT3ZlcmxheUxheWVyKCk6IE9sVmVjdG9yTGF5ZXIge1xyXG4gICAgcmV0dXJuIG5ldyBPbFZlY3RvckxheWVyKHtcclxuICAgICAgc291cmNlOiB0aGlzLm9wdGlvbnMuc291cmNlID8gdGhpcy5vcHRpb25zLnNvdXJjZSA6IG5ldyBPbFZlY3RvclNvdXJjZSgpLFxyXG4gICAgICBzdHlsZTogdGhpcy5vcHRpb25zLmxheWVyU3R5bGUsXHJcbiAgICAgIHpJbmRleDogNTAwXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCB0aGUgb3ZlcmxheSBsYXllciBpZiBpdCB3YXNuJ3QgZGVmaW5lZCBpbiB0aGUgb3B0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkT2xJbm5lck92ZXJsYXlMYXllcigpOiBPbFZlY3RvckxheWVyIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMubGF5ZXIgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9sTWFwLmFkZExheWVyKHRoaXMub2xPdmVybGF5TGF5ZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhlIG92ZXJsYXkgbGF5ZXIgaWYgaXQgd2Fzbid0IGRlZmluZWQgaW4gdGhlIG9wdGlvbnNcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZU9sSW5uZXJPdmVybGF5TGF5ZXIoKSB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmxheWVyID09PSB1bmRlZmluZWQgJiYgdGhpcy5vbE1hcCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2xNYXAucmVtb3ZlTGF5ZXIodGhpcy5vbE92ZXJsYXlMYXllcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgb3ZlcmxheSBzb3VyY2UgaWYgaXQgd2Fzbid0IGRlZmluZWQgaW4gdGhlIG9wdGlvbnNcclxuICAgKi9cclxuICBwcml2YXRlIGNsZWFyT2xJbm5lck92ZXJsYXlTb3VyY2UoKSB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmxheWVyID09PSB1bmRlZmluZWQgJiYgdGhpcy5vcHRpb25zLnNvdXJjZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2xPdmVybGF5U291cmNlLmNsZWFyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZU9sTGluZWFyUmluZ3NMYXllcigpOiBPbFZlY3RvckxheWVyIHtcclxuICAgIHJldHVybiBuZXcgT2xWZWN0b3JMYXllcih7XHJcbiAgICAgIHNvdXJjZTogbmV3IE9sVmVjdG9yU291cmNlKCksXHJcbiAgICAgIHN0eWxlOiBjcmVhdGVEcmF3SG9sZUludGVyYWN0aW9uU3R5bGUoKSxcclxuICAgICAgekluZGV4OiA1MDBcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIHRoZSBsaW5lYXIgcmluZ3MgbGF5ZXJcclxuICAgKi9cclxuICBwcml2YXRlIGFkZE9sTGluZWFyUmluZ3NMYXllcigpIHtcclxuICAgIHRoaXMub2xNYXAuYWRkTGF5ZXIodGhpcy5vbExpbmVhclJpbmdzTGF5ZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhlIGxpbmVhciByaW5ncyBsYXllclxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlT2xMaW5lYXJSaW5nc0xheWVyKCkge1xyXG4gICAgdGhpcy5vbE1hcC5yZW1vdmVMYXllcih0aGlzLm9sTGluZWFyUmluZ3NMYXllcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgbGluZWFyIHJpbmdzIHNvdXJjZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgY2xlYXJPbExpbmVhclJpbmdzU291cmNlKCkge1xyXG4gICAgdGhpcy5vbExpbmVhclJpbmdzU291cmNlLmNsZWFyKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGEgbW9kaWZ5IGludGVyYWN0aW9uIHRvIHRoZSBtYXAgYW4gc2V0IHVwIHNvbWUgbGlzdGVuZXJzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRPbE1vZGlmeUludGVyYWN0aW9uKCkge1xyXG4gICAgY29uc3Qgb2xNb2RpZnlJbnRlcmFjdGlvbiA9IG5ldyBPbE1vZGlmeSh7XHJcbiAgICAgIHNvdXJjZTogdGhpcy5vbE92ZXJsYXlTb3VyY2UsXHJcbiAgICAgIHN0eWxlOiB0aGlzLm9wdGlvbnMuZHJhd1N0eWxlXHJcbiAgICB9KTtcclxuICAgIHRoaXMub2xNb2RpZnlJbnRlcmFjdGlvbiA9IG9sTW9kaWZ5SW50ZXJhY3Rpb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgdGhlIG1vZGlmeSBpbnRlcmFjdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlT2xNb2RpZnlJbnRlcmFjdGlvbigpIHtcclxuICAgIGlmICh0aGlzLm9sTW9kaWZ5SW50ZXJhY3Rpb24gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kZWFjdGl2YXRlTW9kaWZ5SW50ZXJhY3Rpb24oKTtcclxuICAgIHRoaXMub2xNb2RpZnlJbnRlcmFjdGlvbiA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWN0aXZhdGVNb2RpZnlJbnRlcmFjdGlvbigpIHtcclxuICAgIGlmICh0aGlzLm9sTW9kaWZ5SW50ZXJhY3Rpb25Jc0FjdGl2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vbE1vZGlmeUludGVyYWN0aW9uSXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5vbk1vZGlmeVN0YXJ0S2V5ID0gdGhpcy5vbE1vZGlmeUludGVyYWN0aW9uXHJcbiAgICAgIC5vbignbW9kaWZ5c3RhcnQnLCAoZXZlbnQ6IE9sTW9kaWZ5RXZlbnQpID0+IHRoaXMub25Nb2RpZnlTdGFydChldmVudCkpO1xyXG4gICAgdGhpcy5vbk1vZGlmeUVuZEtleSA9IHRoaXMub2xNb2RpZnlJbnRlcmFjdGlvblxyXG4gICAgICAub24oJ21vZGlmeWVuZCcsIChldmVudDogT2xNb2RpZnlFdmVudCkgPT4gdGhpcy5vbk1vZGlmeUVuZChldmVudCkpO1xyXG4gICAgdGhpcy5vbE1hcC5hZGRJbnRlcmFjdGlvbih0aGlzLm9sTW9kaWZ5SW50ZXJhY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkZWFjdGl2YXRlTW9kaWZ5SW50ZXJhY3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5vbE1vZGlmeUludGVyYWN0aW9uSXNBY3RpdmUgPT09IGZhbHNlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9sTW9kaWZ5SW50ZXJhY3Rpb25Jc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdW5CeUtleSh0aGlzLm9uTW9kaWZ5U3RhcnRLZXkpO1xyXG4gICAgdW5CeUtleSh0aGlzLm9uTW9kaWZ5RW5kS2V5KTtcclxuICAgIGlmICh0aGlzLm9sTWFwICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbE1hcC5yZW1vdmVJbnRlcmFjdGlvbih0aGlzLm9sTW9kaWZ5SW50ZXJhY3Rpb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBtb2RpZnlpbmcgc3RhcnRzLCBjbGVhciB0aGUgb3ZlcmxheSBhbmQgc3RhcnQgd2F0Y2hpbmcgZm9yIGNoYW5nZXNcclxuICAgKiBAcGFyYW0gZXZlbnQgTW9kaWZ5IHN0YXJ0IGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbk1vZGlmeVN0YXJ0KGV2ZW50OiBPbE1vZGlmeUV2ZW50KSB7XHJcbiAgICBjb25zdCBvbEdlb21ldHJ5ID0gZXZlbnQuZmVhdHVyZXMuaXRlbSgwKS5nZXRHZW9tZXRyeSgpO1xyXG4gICAgdGhpcy5zdGFydCQubmV4dChvbEdlb21ldHJ5KTtcclxuICAgIHRoaXMub25Nb2RpZnlLZXkgPSBvbEdlb21ldHJ5Lm9uKCdjaGFuZ2UnLCAob2xHZW9tZXRyeUV2ZW50OiBPbEdlb21ldHJ5RXZlbnQpID0+IHtcclxuICAgICAgdGhpcy5jaGFuZ2VzJC5uZXh0KG9sR2VvbWV0cnlFdmVudC50YXJnZXQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIG1vZGlmeWluZyBlbmRzLCB1cGRhdGUgdGhlIGdlb21ldHJ5IG9ic2VydmFibGUgYW5kIHN0b3Agd2F0Y2hpbmcgZm9yIGNoYW5nZXNcclxuICAgKiBAcGFyYW0gZXZlbnQgTW9kaWZ5IGVuZCBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25Nb2RpZnlFbmQoZXZlbnQ6IE9sTW9kaWZ5RXZlbnQpIHtcclxuICAgIGlmICh0aGlzLm9uTW9kaWZ5S2V5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdW5CeUtleSh0aGlzLm9uTW9kaWZ5S2V5KTtcclxuICAgIH1cclxuICAgIHRoaXMuZW5kJC5uZXh0KGV2ZW50LmZlYXR1cmVzLml0ZW0oMCkuZ2V0R2VvbWV0cnkoKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpYmUgdG8gQ1RSTCBrZXkgZG93biB0byBhY3RpdmF0ZSB0aGUgZHJhdyBjb250cm9sXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb0tleURvd24oKSB7XHJcbiAgICB0aGlzLmtleURvd24kJCA9IGZyb21FdmVudChkb2N1bWVudCwgJ2tleWRvd24nKS5zdWJzY3JpYmUoKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XHJcbiAgICAgIC8vIE9uIEVTQyBrZXkgZG93biwgcmVtb3ZlIHRoZSBsYXN0IHZlcnRleFxyXG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcgJiYgdGhpcy5vbERyYXdJbnRlcmFjdGlvbklzQWN0aXZlID09PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5vbERyYXdJbnRlcmFjdGlvbi5yZW1vdmVMYXN0UG9pbnQoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbnN1YnNjcmliZSB0byBrZXkgZG93blxyXG4gICAqL1xyXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVUb0tleURvd24oKSB7XHJcbiAgICBpZiAodGhpcy5rZXlEb3duJCQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmtleURvd24kJC51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGEgdHJhbnNsYXRlIGludGVyYWN0aW9uIHRvIHRoZSBtYXAgYW4gc2V0IHVwIHNvbWUgbGlzdGVuZXJzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRPbFRyYW5zbGF0ZUludGVyYWN0aW9uKCkge1xyXG4gICAgY29uc3Qgb2xUcmFuc2xhdGVJbnRlcmFjdGlvbiA9IG5ldyBPbFRyYW5zbGF0ZSh7XHJcbiAgICAgIGxheWVyczogW3RoaXMub2xPdmVybGF5TGF5ZXJdXHJcbiAgICB9KTtcclxuICAgIHRoaXMub2xUcmFuc2xhdGVJbnRlcmFjdGlvbiA9IG9sVHJhbnNsYXRlSW50ZXJhY3Rpb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgdGhlIHRyYW5zbGF0ZSBpbnRlcmFjdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlT2xUcmFuc2xhdGVJbnRlcmFjdGlvbigpIHtcclxuICAgIGlmICh0aGlzLm9sVHJhbnNsYXRlSW50ZXJhY3Rpb24gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kZWFjdGl2YXRlVHJhbnNsYXRlSW50ZXJhY3Rpb24oKTtcclxuICAgIHRoaXMub2xUcmFuc2xhdGVJbnRlcmFjdGlvbiA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWN0aXZhdGVUcmFuc2xhdGVJbnRlcmFjdGlvbigpIHtcclxuICAgIGlmICh0aGlzLm9sVHJhbnNsYXRlSW50ZXJhY3Rpb25Jc0FjdGl2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vbFRyYW5zbGF0ZUludGVyYWN0aW9uSXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5vblRyYW5zbGF0ZVN0YXJ0S2V5ID0gdGhpcy5vbFRyYW5zbGF0ZUludGVyYWN0aW9uXHJcbiAgICAgIC5vbigndHJhbnNsYXRlc3RhcnQnLCAoZXZlbnQ6IE9sVHJhbnNsYXRlRXZlbnQpID0+IHRoaXMub25UcmFuc2xhdGVTdGFydChldmVudCkpO1xyXG4gICAgdGhpcy5vblRyYW5zbGF0ZUVuZEtleSA9IHRoaXMub2xUcmFuc2xhdGVJbnRlcmFjdGlvblxyXG4gICAgICAub24oJ3RyYW5zbGF0ZWVuZCcsIChldmVudDogT2xUcmFuc2xhdGVFdmVudCkgPT4gdGhpcy5vblRyYW5zbGF0ZUVuZChldmVudCkpO1xyXG4gICAgdGhpcy5vbE1hcC5hZGRJbnRlcmFjdGlvbih0aGlzLm9sVHJhbnNsYXRlSW50ZXJhY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkZWFjdGl2YXRlVHJhbnNsYXRlSW50ZXJhY3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5vbFRyYW5zbGF0ZUludGVyYWN0aW9uSXNBY3RpdmUgPT09IGZhbHNlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9sVHJhbnNsYXRlSW50ZXJhY3Rpb25Jc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdW5CeUtleSh0aGlzLm9uVHJhbnNsYXRlU3RhcnRLZXkpO1xyXG4gICAgdW5CeUtleSh0aGlzLm9uVHJhbnNsYXRlRW5kS2V5KTtcclxuICAgIGlmICh0aGlzLm9sTWFwICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbE1hcC5yZW1vdmVJbnRlcmFjdGlvbih0aGlzLm9sVHJhbnNsYXRlSW50ZXJhY3Rpb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0cmFuc2xhdGlvbiBzdGFydHMsIGNsZWFyIHRoZSBvdmVybGF5IGFuZCBzdGFydCB3YXRjaGluZyBmb3IgY2hhbmdlc1xyXG4gICAqIEBwYXJhbSBldmVudCBUcmFuc2xhdGUgc3RhcnQgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uVHJhbnNsYXRlU3RhcnQoZXZlbnQ6IE9sVHJhbnNsYXRlRXZlbnQpIHtcclxuICAgIGNvbnN0IG9sR2VvbWV0cnkgPSBldmVudC5mZWF0dXJlcy5pdGVtKDApLmdldEdlb21ldHJ5KCk7XHJcbiAgICB0aGlzLnN0YXJ0JC5uZXh0KG9sR2VvbWV0cnkpO1xyXG4gICAgdGhpcy5vblRyYW5zbGF0ZUtleSA9IG9sR2VvbWV0cnkub24oJ2NoYW5nZScsIChvbEdlb21ldHJ5RXZlbnQ6IE9sR2VvbWV0cnlFdmVudCkgPT4ge1xyXG4gICAgICB0aGlzLmNoYW5nZXMkLm5leHQob2xHZW9tZXRyeUV2ZW50LnRhcmdldCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdHJhbnNsYXRpb24gZW5kcywgdXBkYXRlIHRoZSBnZW9tZXRyeSBvYnNlcnZhYmxlIGFuZCBzdG9wIHdhdGNoaWduIGZvciBjaGFuZ2VzXHJcbiAgICogQHBhcmFtIGV2ZW50IFRyYW5zbGF0ZSBlbmQgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uVHJhbnNsYXRlRW5kKGV2ZW50OiBPbFRyYW5zbGF0ZUV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5vblRyYW5zbGF0ZUtleSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHVuQnlLZXkodGhpcy5vblRyYW5zbGF0ZUtleSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmVuZCQubmV4dChldmVudC5mZWF0dXJlcy5pdGVtKDApLmdldEdlb21ldHJ5KCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGEgZHJhdyBpbnRlcmFjdGlvbiB0byB0aGUgbWFwIGFuIHNldCB1cCBzb21lIGxpc3RlbmVyc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkT2xEcmF3SW50ZXJhY3Rpb24oKSB7XHJcbiAgICBjb25zdCBvbERyYXdJbnRlcmFjdGlvbiA9IG5ldyBPbERyYXcoe1xyXG4gICAgICB0eXBlOiAnUG9seWdvbicsXHJcbiAgICAgIHNvdXJjZTogdGhpcy5vbExpbmVhclJpbmdzU291cmNlLFxyXG4gICAgICBzdG9wQ2xpY2s6IHRydWUsXHJcbiAgICAgIHN0eWxlOiBjcmVhdGVEcmF3SG9sZUludGVyYWN0aW9uU3R5bGUoKSxcclxuICAgICAgY29uZGl0aW9uOiAoZXZlbnQ6IE9sTWFwQnJvd3NlckV2ZW50KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T2xHZW9tZXRyeSgpLmludGVyc2VjdHNDb29yZGluYXRlKGV2ZW50LmNvb3JkaW5hdGUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm9sRHJhd0ludGVyYWN0aW9uID0gb2xEcmF3SW50ZXJhY3Rpb247XHJcbiAgICB0aGlzLnN1YnNjcmliZVRvRHJhd0tleURvd24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmliZSB0byBDVFJMIGtleSBkb3duIHRvIGFjdGl2YXRlIHRoZSBkcmF3IGNvbnRyb2xcclxuICAgKi9cclxuICBwcml2YXRlIHN1YnNjcmliZVRvRHJhd0tleURvd24oKSB7XHJcbiAgICB0aGlzLmRyYXdLZXlEb3duJCQgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdrZXlkb3duJykuc3Vic2NyaWJlKChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSAhPT0gMTcpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICB0aGlzLnVuc3Vic2NyaWJlVG9EcmF3S2V5RG93bigpO1xyXG5cclxuICAgICAgY29uc3Qgb2xHZW9tZXRyeSA9IHRoaXMuZ2V0T2xHZW9tZXRyeSgpO1xyXG4gICAgICBpZiAoIW9sR2VvbWV0cnkgfHwgIShvbEdlb21ldHJ5IGluc3RhbmNlb2YgT2xQb2x5Z29uKSkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgIHRoaXMuc3Vic2NyaWJlVG9EcmF3S2V5VXAoKTtcclxuXHJcbiAgICAgIHRoaXMuZGVhY3RpdmF0ZU1vZGlmeUludGVyYWN0aW9uKCk7XHJcbiAgICAgIHRoaXMuZGVhY3RpdmF0ZVRyYW5zbGF0ZUludGVyYWN0aW9uKCk7XHJcbiAgICAgIHRoaXMuYWN0aXZhdGVEcmF3SW50ZXJhY3Rpb24oKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaWJlIHRvIENUUkwga2V5IHVwIHRvIGRlYWN0aXZhdGUgdGhlIGRyYXcgY29udHJvbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9EcmF3S2V5VXAoKSB7XHJcbiAgICB0aGlzLmRyYXdLZXlVcCQkID0gZnJvbUV2ZW50KGRvY3VtZW50LCAna2V5dXAnKS5zdWJzY3JpYmUoKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChldmVudC5rZXlDb2RlICE9PSAxNykgeyByZXR1cm47IH1cclxuXHJcbiAgICAgIHRoaXMudW5zdWJzY3JpYmVUb0RyYXdLZXlVcCgpO1xyXG4gICAgICB0aGlzLnN1YnNjcmliZVRvRHJhd0tleURvd24oKTtcclxuXHJcbiAgICAgIHRoaXMuZGVhY3RpdmF0ZURyYXdJbnRlcmFjdGlvbigpO1xyXG4gICAgICB0aGlzLmFjdGl2YXRlTW9kaWZ5SW50ZXJhY3Rpb24oKTtcclxuICAgICAgdGhpcy5hY3RpdmF0ZVRyYW5zbGF0ZUludGVyYWN0aW9uKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuc3Vic2NyaWJlIHRvIGRyYXcga2V5IGRvd25cclxuICAgKi9cclxuICBwcml2YXRlIHVuc3Vic2NyaWJlVG9EcmF3S2V5RG93bigpIHtcclxuICAgIGlmICh0aGlzLmRyYXdLZXlEb3duJCQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmRyYXdLZXlEb3duJCQudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuc3Vic2NyaWJlIHRvIGtleSB1cFxyXG4gICAqL1xyXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVUb0RyYXdLZXlVcCgpIHtcclxuICAgIGlmICh0aGlzLmRyYXdLZXlVcCQkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5kcmF3S2V5VXAkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIHRoZSBkcmF3IGludGVyYWN0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZW1vdmVPbERyYXdJbnRlcmFjdGlvbigpIHtcclxuICAgIGlmICh0aGlzLm9sRHJhd0ludGVyYWN0aW9uID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudW5zdWJzY3JpYmVUb0tleURvd24oKTtcclxuICAgIHRoaXMudW5zdWJzY3JpYmVUb0RyYXdLZXlVcCgpO1xyXG4gICAgdGhpcy51bnN1YnNjcmliZVRvRHJhd0tleURvd24oKTtcclxuICAgIHRoaXMuZGVhY3RpdmF0ZURyYXdJbnRlcmFjdGlvbigpO1xyXG4gICAgdGhpcy5vbERyYXdJbnRlcmFjdGlvbiA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjdGl2YXRlIHRoZSBkcmF3IGludGVyYWN0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhY3RpdmF0ZURyYXdJbnRlcmFjdGlvbigpIHtcclxuICAgIGlmICh0aGlzLm9sRHJhd0ludGVyYWN0aW9uSXNBY3RpdmUgPT09IHRydWUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2xlYXJPbExpbmVhclJpbmdzU291cmNlKCk7XHJcbiAgICB0aGlzLmFkZE9sTGluZWFyUmluZ3NMYXllcigpO1xyXG5cclxuICAgIHRoaXMub2xNYXAuZ2V0SW50ZXJhY3Rpb25zKCkuZm9yRWFjaCgob2xJbnRlcmFjdGlvbjogT2xJbnRlcmFjdGlvbikgPT4ge1xyXG4gICAgICBpZiAob2xJbnRlcmFjdGlvbiBpbnN0YW5jZW9mIE9sRHJhZ0JveEludGVyYWN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5vbE1hcC5yZW1vdmVJbnRlcmFjdGlvbihvbEludGVyYWN0aW9uKTtcclxuICAgICAgICB0aGlzLnJlbW92ZWRPbEludGVyYWN0aW9ucy5wdXNoKG9sSW50ZXJhY3Rpb24pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm9sRHJhd0ludGVyYWN0aW9uSXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5vbkRyYXdTdGFydEtleSA9IHRoaXMub2xEcmF3SW50ZXJhY3Rpb25cclxuICAgICAgLm9uKCdkcmF3c3RhcnQnLCAoZXZlbnQ6IE9sRHJhd0V2ZW50KSA9PiB0aGlzLm9uRHJhd1N0YXJ0KGV2ZW50KSk7XHJcbiAgICB0aGlzLm9uRHJhd0VuZEtleSA9IHRoaXMub2xEcmF3SW50ZXJhY3Rpb25cclxuICAgICAgLm9uKCdkcmF3ZW5kJywgKGV2ZW50OiBPbERyYXdFdmVudCkgPT4gdGhpcy5vbkRyYXdFbmQoZXZlbnQpKTtcclxuICAgIHRoaXMub2xNYXAuYWRkSW50ZXJhY3Rpb24odGhpcy5vbERyYXdJbnRlcmFjdGlvbik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWFjdGl2YXRlIHRoZSBkcmF3IGludGVyYWN0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkZWFjdGl2YXRlRHJhd0ludGVyYWN0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMub2xEcmF3SW50ZXJhY3Rpb25Jc0FjdGl2ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVtb3ZlT2xMaW5lYXJSaW5nc0xheWVyKCk7XHJcblxyXG4gICAgdGhpcy5yZW1vdmVkT2xJbnRlcmFjdGlvbnMuZm9yRWFjaCgob2xJbnRlcmFjdGlvbjogT2xJbnRlcmFjdGlvbikgPT4ge1xyXG4gICAgICB0aGlzLm9sTWFwLmFkZEludGVyYWN0aW9uKG9sSW50ZXJhY3Rpb24pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5vbERyYXdJbnRlcmFjdGlvbklzQWN0aXZlID0gZmFsc2U7XHJcbiAgICB1bkJ5S2V5KHRoaXMub25EcmF3U3RhcnRLZXkpO1xyXG4gICAgdW5CeUtleSh0aGlzLm9uRHJhd0VuZEtleSk7XHJcbiAgICBpZiAodGhpcy5vbE1hcCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2xNYXAucmVtb3ZlSW50ZXJhY3Rpb24odGhpcy5vbERyYXdJbnRlcmFjdGlvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGRyYXcgc3RhcnQsIGFkZCBhIG5ldyBsaW5lcmFyIHJpbmcgdG8gdGhlIGdlb21ldHJ0eSBhbmQgc3RhcnQgd2F0Y2hpbmcgZm9yIGNoYW5nZXNcclxuICAgKiBAcGFyYW0gZXZlbnQgRHJhdyBzdGFydCBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25EcmF3U3RhcnQoZXZlbnQ6IE9sRHJhd0V2ZW50KSB7XHJcbiAgICBjb25zdCBvbEdlb21ldHJ5ID0gZXZlbnQuZmVhdHVyZS5nZXRHZW9tZXRyeSgpO1xyXG4gICAgY29uc3QgbGluZWFyUmluZ0Nvb3JkaW5hdGVzID0gb2xHZW9tZXRyeS5nZXRMaW5lYXJSaW5nKCkuZ2V0Q29vcmRpbmF0ZXMoKTtcclxuICAgIHRoaXMuYWRkTGluZWFyUmluZ1RvT2xHZW9tZXRyeShsaW5lYXJSaW5nQ29vcmRpbmF0ZXMpO1xyXG4gICAgdGhpcy5zdGFydCQubmV4dCh0aGlzLmdldE9sR2VvbWV0cnkoKSk7XHJcblxyXG4gICAgdGhpcy5vbkRyYXdLZXkgPSBvbEdlb21ldHJ5Lm9uKCdjaGFuZ2UnLCAob2xHZW9tZXRyeUV2ZW50OiBPbEdlb21ldHJ5RXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgX2xpbmVhclJpbmdDb29yZGluYXRlcyA9IG9sR2VvbWV0cnlFdmVudC50YXJnZXQuZ2V0TGluZWFyUmluZygpLmdldENvb3JkaW5hdGVzKCk7XHJcbiAgICAgIHRoaXMudXBkYXRlTGluZWFyUmluZ09mT2xHZW9tZXRyeShfbGluZWFyUmluZ0Nvb3JkaW5hdGVzKTtcclxuICAgICAgdGhpcy5jaGFuZ2VzJC5uZXh0KHRoaXMuZ2V0T2xHZW9tZXRyeSgpKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zdWJzY3JpYmVUb0tleURvd24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdHJhbnNsYXRpb24gZW5kcywgdXBkYXRlIHRoZSBnZW9tZXRyeSBvYnNlcnZhYmxlIGFuZCBzdG9wIHdhdGNoaWduIGZvciBjaGFuZ2VzXHJcbiAgICogQHBhcmFtIGV2ZW50IERyYXcgZW5kIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkRyYXdFbmQoZXZlbnQ6IE9sRHJhd0V2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5vbkRyYXdLZXkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB1bkJ5S2V5KHRoaXMub25EcmF3S2V5KTtcclxuICAgIH1cclxuICAgIGNvbnN0IGxpbmVhclJpbmdDb29yZGluYXRlcyA9IGV2ZW50LmZlYXR1cmUuZ2V0R2VvbWV0cnkoKS5nZXRMaW5lYXJSaW5nKCkuZ2V0Q29vcmRpbmF0ZXMoKTtcclxuICAgIHRoaXMudXBkYXRlTGluZWFyUmluZ09mT2xHZW9tZXRyeShsaW5lYXJSaW5nQ29vcmRpbmF0ZXMpO1xyXG4gICAgdGhpcy5jbGVhck9sTGluZWFyUmluZ3NTb3VyY2UoKTtcclxuICAgIHRoaXMuZW5kJC5uZXh0KHRoaXMuZ2V0T2xHZW9tZXRyeSgpKTtcclxuICAgIHRoaXMudW5zdWJzY3JpYmVUb0tleURvd24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhIGxpbmVhciByaW5nIHRvIHRoZSBnZW9tZXRyeSBiZWluZyBtb2RpZmllZFxyXG4gICAqIEBwYXJhbSBjb29yZGluYXRlcyBMaW5lYXIgcmluZyBjb29yZGluYXRlc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkTGluZWFyUmluZ1RvT2xHZW9tZXRyeShjb29yZGluYXRlczogbnVtYmVyW10pIHtcclxuICAgIGNvbnN0IG9sR2VvbWV0cnkgPSB0aGlzLmdldE9sR2VvbWV0cnkoKTtcclxuICAgIGNvbnN0IG9sTGluZWFyUmluZyA9IG5ldyBPbExpbmVhclJpbmcoY29vcmRpbmF0ZXMpO1xyXG4gICAgYWRkTGluZWFyUmluZ1RvT2xQb2x5Z29uKG9sR2VvbWV0cnksIG9sTGluZWFyUmluZyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgdGhlIGxhc3QgbGluZWFyIHJpbmcgb2YgdGhlIGdlb21ldHJ5IGJlaW5nIG1vZGlmaWVkXHJcbiAgICogQHBhcmFtIGNvb3JkaW5hdGVzIExpbmVhciByaW5nIGNvb3JkaW5hdGVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1cGRhdGVMaW5lYXJSaW5nT2ZPbEdlb21ldHJ5KGNvb3JkaW5hdGVzOiBudW1iZXJbXSkge1xyXG4gICAgY29uc3Qgb2xHZW9tZXRyeSA9IHRoaXMuZ2V0T2xHZW9tZXRyeSgpO1xyXG4gICAgLy8gUmVtb3ZlIHRoZSBsYXN0IGxpbmVhciByaW5nICh0aGUgb25lIHdlIGFyZSB1cGRhdGluZylcclxuICAgIGNvbnN0IG9sTGluZWFyUmluZ3MgPSBvbEdlb21ldHJ5LmdldExpbmVhclJpbmdzKCkuc2xpY2UoMCwgLTEpO1xyXG4gICAgY29uc3QgbmV3Q29vcmRpbmF0ZXMgPSBvbExpbmVhclJpbmdzLm1hcCgob2xMaW5lYXJSaW5nOiBPbExpbmVhclJpbmcpID0+IHtcclxuICAgICAgcmV0dXJuIG9sTGluZWFyUmluZy5nZXRDb29yZGluYXRlcygpO1xyXG4gICAgfSk7XHJcbiAgICBuZXdDb29yZGluYXRlcy5wdXNoKGNvb3JkaW5hdGVzKTtcclxuICAgIG9sR2VvbWV0cnkuc2V0Q29vcmRpbmF0ZXMobmV3Q29vcmRpbmF0ZXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBnZW9tZXRyeSBiZWluZyBtb2RpZmllZFxyXG4gICAqIEByZXR1cm5zIE9MIEdlb21ldHJ5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRPbEdlb21ldHJ5KCk6IE9sR2VvbWV0cnkge1xyXG4gICAgY29uc3Qgb2xGZWF0dXJlcyA9IHRoaXMub2xPdmVybGF5U291cmNlLmdldEZlYXR1cmVzKCk7XHJcbiAgICByZXR1cm4gb2xGZWF0dXJlcy5sZW5ndGggPiAwID8gb2xGZWF0dXJlc1swXS5nZXRHZW9tZXRyeSgpIDogdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbn1cclxuIl19