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
var /**
 * Control to modify geometries
 */
ModifyControl = /** @class */ (function () {
    function ModifyControl(options) {
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
    Object.defineProperty(ModifyControl.prototype, "active", {
        /**
         * Wheter the control is active
         */
        get: /**
         * Wheter the control is active
         * @return {?}
         */
        function () {
            return this.olMap !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModifyControl.prototype, "olOverlaySource", {
        /**
         * OL overlay source
         * @internal
         */
        get: /**
         * OL overlay source
         * \@internal
         * @return {?}
         */
        function () {
            return this.olOverlayLayer.getSource();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModifyControl.prototype, "olLinearRingsSource", {
        /**
         * OL linear rings source
         * @internal
         */
        get: /**
         * OL linear rings source
         * \@internal
         * @return {?}
         */
        function () {
            return this.olLinearRingsLayer.getSource();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Add or remove this control to/from a map.
     * @param map OL Map
     */
    /**
     * Add or remove this control to/from a map.
     * @param {?} olMap
     * @return {?}
     */
    ModifyControl.prototype.setOlMap = /**
     * Add or remove this control to/from a map.
     * @param {?} olMap
     * @return {?}
     */
    function (olMap) {
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
    };
    /**
     * Return the overlay source
     */
    /**
     * Return the overlay source
     * @return {?}
     */
    ModifyControl.prototype.getSource = /**
     * Return the overlay source
     * @return {?}
     */
    function () {
        return this.olOverlaySource;
    };
    /**
     * Add an OL geometry to the overlay and start modifying it
     * @param olGeometry Ol Geometry
     */
    /**
     * Add an OL geometry to the overlay and start modifying it
     * @param {?} olGeometry Ol Geometry
     * @return {?}
     */
    ModifyControl.prototype.setOlGeometry = /**
     * Add an OL geometry to the overlay and start modifying it
     * @param {?} olGeometry Ol Geometry
     * @return {?}
     */
    function (olGeometry) {
        /** @type {?} */
        var olFeature = new OlFeature({ geometry: olGeometry });
        this.olOverlaySource.clear();
        this.olOverlaySource.addFeature(olFeature);
    };
    /**
     * Create an overlay source if none is defined in the options
     */
    /**
     * Create an overlay source if none is defined in the options
     * @private
     * @return {?}
     */
    ModifyControl.prototype.createOlInnerOverlayLayer = /**
     * Create an overlay source if none is defined in the options
     * @private
     * @return {?}
     */
    function () {
        return new OlVectorLayer({
            source: this.options.source ? this.options.source : new OlVectorSource(),
            style: this.options.layerStyle,
            zIndex: 500
        });
    };
    /**
     * Add the overlay layer if it wasn't defined in the options
     */
    /**
     * Add the overlay layer if it wasn't defined in the options
     * @private
     * @return {?}
     */
    ModifyControl.prototype.addOlInnerOverlayLayer = /**
     * Add the overlay layer if it wasn't defined in the options
     * @private
     * @return {?}
     */
    function () {
        if (this.options.layer === undefined) {
            this.olMap.addLayer(this.olOverlayLayer);
        }
    };
    /**
     * Clear the overlay layer if it wasn't defined in the options
     */
    /**
     * Clear the overlay layer if it wasn't defined in the options
     * @private
     * @return {?}
     */
    ModifyControl.prototype.removeOlInnerOverlayLayer = /**
     * Clear the overlay layer if it wasn't defined in the options
     * @private
     * @return {?}
     */
    function () {
        if (this.options.layer === undefined && this.olMap !== undefined) {
            this.olMap.removeLayer(this.olOverlayLayer);
        }
    };
    /**
     * Clear the overlay source if it wasn't defined in the options
     */
    /**
     * Clear the overlay source if it wasn't defined in the options
     * @private
     * @return {?}
     */
    ModifyControl.prototype.clearOlInnerOverlaySource = /**
     * Clear the overlay source if it wasn't defined in the options
     * @private
     * @return {?}
     */
    function () {
        if (this.options.layer === undefined && this.options.source === undefined) {
            this.olOverlaySource.clear();
        }
    };
    /**
     * @private
     * @return {?}
     */
    ModifyControl.prototype.createOlLinearRingsLayer = /**
     * @private
     * @return {?}
     */
    function () {
        return new OlVectorLayer({
            source: new OlVectorSource(),
            style: createDrawHoleInteractionStyle(),
            zIndex: 500
        });
    };
    /**
     * Add the linear rings layer
     */
    /**
     * Add the linear rings layer
     * @private
     * @return {?}
     */
    ModifyControl.prototype.addOlLinearRingsLayer = /**
     * Add the linear rings layer
     * @private
     * @return {?}
     */
    function () {
        this.olMap.addLayer(this.olLinearRingsLayer);
    };
    /**
     * Clear the linear rings layer
     */
    /**
     * Clear the linear rings layer
     * @private
     * @return {?}
     */
    ModifyControl.prototype.removeOlLinearRingsLayer = /**
     * Clear the linear rings layer
     * @private
     * @return {?}
     */
    function () {
        this.olMap.removeLayer(this.olLinearRingsLayer);
    };
    /**
     * Clear the linear rings source
     */
    /**
     * Clear the linear rings source
     * @private
     * @return {?}
     */
    ModifyControl.prototype.clearOlLinearRingsSource = /**
     * Clear the linear rings source
     * @private
     * @return {?}
     */
    function () {
        this.olLinearRingsSource.clear(true);
    };
    /**
     * Add a modify interaction to the map an set up some listeners
     */
    /**
     * Add a modify interaction to the map an set up some listeners
     * @private
     * @return {?}
     */
    ModifyControl.prototype.addOlModifyInteraction = /**
     * Add a modify interaction to the map an set up some listeners
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var olModifyInteraction = new OlModify({
            source: this.olOverlaySource,
            style: this.options.drawStyle
        });
        this.olModifyInteraction = olModifyInteraction;
    };
    /**
     * Remove the modify interaction
     */
    /**
     * Remove the modify interaction
     * @private
     * @return {?}
     */
    ModifyControl.prototype.removeOlModifyInteraction = /**
     * Remove the modify interaction
     * @private
     * @return {?}
     */
    function () {
        if (this.olModifyInteraction === undefined) {
            return;
        }
        this.deactivateModifyInteraction();
        this.olModifyInteraction = undefined;
    };
    /**
     * @private
     * @return {?}
     */
    ModifyControl.prototype.activateModifyInteraction = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.olModifyInteractionIsActive === true) {
            return;
        }
        this.olModifyInteractionIsActive = true;
        this.onModifyStartKey = this.olModifyInteraction
            .on('modifystart', (/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.onModifyStart(event); }));
        this.onModifyEndKey = this.olModifyInteraction
            .on('modifyend', (/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.onModifyEnd(event); }));
        this.olMap.addInteraction(this.olModifyInteraction);
    };
    /**
     * @private
     * @return {?}
     */
    ModifyControl.prototype.deactivateModifyInteraction = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.olModifyInteractionIsActive === false) {
            return;
        }
        this.olModifyInteractionIsActive = false;
        unByKey(this.onModifyStartKey);
        unByKey(this.onModifyEndKey);
        if (this.olMap !== undefined) {
            this.olMap.removeInteraction(this.olModifyInteraction);
        }
    };
    /**
     * When modifying starts, clear the overlay and start watching for changes
     * @param event Modify start event
     */
    /**
     * When modifying starts, clear the overlay and start watching for changes
     * @private
     * @param {?} event Modify start event
     * @return {?}
     */
    ModifyControl.prototype.onModifyStart = /**
     * When modifying starts, clear the overlay and start watching for changes
     * @private
     * @param {?} event Modify start event
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
        var olGeometry = event.features.item(0).getGeometry();
        this.start$.next(olGeometry);
        this.onModifyKey = olGeometry.on('change', (/**
         * @param {?} olGeometryEvent
         * @return {?}
         */
        function (olGeometryEvent) {
            _this.mousePosition = getMousePositionFromOlGeometryEvent(olGeometryEvent);
            _this.changes$.next(olGeometryEvent.target);
        }));
        this.subscribeToKeyDown();
    };
    /**
     * When modifying ends, update the geometry observable and stop watching for changes
     * @param event Modify end event
     */
    /**
     * When modifying ends, update the geometry observable and stop watching for changes
     * @private
     * @param {?} event Modify end event
     * @return {?}
     */
    ModifyControl.prototype.onModifyEnd = /**
     * When modifying ends, update the geometry observable and stop watching for changes
     * @private
     * @param {?} event Modify end event
     * @return {?}
     */
    function (event) {
        if (this.onModifyKey !== undefined) {
            unByKey(this.onModifyKey);
        }
        this.end$.next(event.features.item(0).getGeometry());
        this.unsubscribeToKeyDown();
    };
    /**
     * Subscribe to CTRL key down to activate the draw control
     */
    /**
     * Subscribe to CTRL key down to activate the draw control
     * @private
     * @return {?}
     */
    ModifyControl.prototype.subscribeToKeyDown = /**
     * Subscribe to CTRL key down to activate the draw control
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.keyDown$$ = fromEvent(document, 'keydown').subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event.keyCode === 32) {
                // On space bar, pan to the current mouse position
                _this.olMap.getView().animate({
                    center: _this.mousePosition,
                    duration: 0
                });
                return;
            }
        }));
    };
    /**
     * Unsubscribe to key down
     */
    /**
     * Unsubscribe to key down
     * @private
     * @return {?}
     */
    ModifyControl.prototype.unsubscribeToKeyDown = /**
     * Unsubscribe to key down
     * @private
     * @return {?}
     */
    function () {
        if (this.keyDown$$ !== undefined) {
            this.keyDown$$.unsubscribe();
        }
    };
    /**
     * Add a translate interaction to the map an set up some listeners
     */
    /**
     * Add a translate interaction to the map an set up some listeners
     * @private
     * @return {?}
     */
    ModifyControl.prototype.addOlTranslateInteraction = /**
     * Add a translate interaction to the map an set up some listeners
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var olTranslateInteraction = new OlTranslate({
            layers: [this.olOverlayLayer]
        });
        this.olTranslateInteraction = olTranslateInteraction;
    };
    /**
     * Remove the translate interaction
     */
    /**
     * Remove the translate interaction
     * @private
     * @return {?}
     */
    ModifyControl.prototype.removeOlTranslateInteraction = /**
     * Remove the translate interaction
     * @private
     * @return {?}
     */
    function () {
        if (this.olTranslateInteraction === undefined) {
            return;
        }
        this.deactivateTranslateInteraction();
        this.olTranslateInteraction = undefined;
    };
    /**
     * @private
     * @return {?}
     */
    ModifyControl.prototype.activateTranslateInteraction = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.olTranslateInteractionIsActive === true) {
            return;
        }
        this.olTranslateInteractionIsActive = true;
        this.onTranslateStartKey = this.olTranslateInteraction
            .on('translatestart', (/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.onTranslateStart(event); }));
        this.onTranslateEndKey = this.olTranslateInteraction
            .on('translateend', (/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.onTranslateEnd(event); }));
        this.olMap.addInteraction(this.olTranslateInteraction);
    };
    /**
     * @private
     * @return {?}
     */
    ModifyControl.prototype.deactivateTranslateInteraction = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.olTranslateInteractionIsActive === false) {
            return;
        }
        this.olTranslateInteractionIsActive = false;
        unByKey(this.onTranslateStartKey);
        unByKey(this.onTranslateEndKey);
        if (this.olMap !== undefined) {
            this.olMap.removeInteraction(this.olTranslateInteraction);
        }
    };
    /**
     * When translation starts, clear the overlay and start watching for changes
     * @param event Translate start event
     */
    /**
     * When translation starts, clear the overlay and start watching for changes
     * @private
     * @param {?} event Translate start event
     * @return {?}
     */
    ModifyControl.prototype.onTranslateStart = /**
     * When translation starts, clear the overlay and start watching for changes
     * @private
     * @param {?} event Translate start event
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
        var olGeometry = event.features.item(0).getGeometry();
        this.start$.next(olGeometry);
        this.onTranslateKey = olGeometry.on('change', (/**
         * @param {?} olGeometryEvent
         * @return {?}
         */
        function (olGeometryEvent) {
            _this.changes$.next(olGeometryEvent.target);
        }));
    };
    /**
     * When translation ends, update the geometry observable and stop watchign for changes
     * @param event Translate end event
     */
    /**
     * When translation ends, update the geometry observable and stop watchign for changes
     * @private
     * @param {?} event Translate end event
     * @return {?}
     */
    ModifyControl.prototype.onTranslateEnd = /**
     * When translation ends, update the geometry observable and stop watchign for changes
     * @private
     * @param {?} event Translate end event
     * @return {?}
     */
    function (event) {
        if (this.onTranslateKey !== undefined) {
            unByKey(this.onTranslateKey);
        }
        this.end$.next(event.features.item(0).getGeometry());
    };
    /**
     * Add a draw interaction to the map an set up some listeners
     */
    /**
     * Add a draw interaction to the map an set up some listeners
     * @private
     * @return {?}
     */
    ModifyControl.prototype.addOlDrawInteraction = /**
     * Add a draw interaction to the map an set up some listeners
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var olDrawInteraction = new OlDraw({
            type: 'Polygon',
            source: this.olLinearRingsSource,
            stopClick: true,
            style: createDrawHoleInteractionStyle(),
            condition: (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                /** @type {?} */
                var olOuterGeometry = _this.olOuterGeometry || _this.getOlGeometry();
                return olOuterGeometry.intersectsCoordinate(event.coordinate);
            })
        });
        this.olDrawInteraction = olDrawInteraction;
        this.subscribeToDrawKeyDown();
    };
    /**
     * Subscribe to CTRL key down to activate the draw control
     */
    /**
     * Subscribe to CTRL key down to activate the draw control
     * @private
     * @return {?}
     */
    ModifyControl.prototype.subscribeToDrawKeyDown = /**
     * Subscribe to CTRL key down to activate the draw control
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.drawKeyDown$$ = fromEvent(document, 'keydown').subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event.keyCode !== 17) {
                return;
            }
            _this.unsubscribeToDrawKeyDown();
            /** @type {?} */
            var olGeometry = _this.getOlGeometry();
            if (!olGeometry || !(olGeometry instanceof OlPolygon)) {
                return;
            }
            _this.subscribeToDrawKeyUp();
            _this.deactivateModifyInteraction();
            _this.deactivateTranslateInteraction();
            _this.activateDrawInteraction();
        }));
    };
    /**
     * Subscribe to CTRL key up to deactivate the draw control
     */
    /**
     * Subscribe to CTRL key up to deactivate the draw control
     * @private
     * @return {?}
     */
    ModifyControl.prototype.subscribeToDrawKeyUp = /**
     * Subscribe to CTRL key up to deactivate the draw control
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.drawKeyUp$$ = fromEvent(document, 'keyup')
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event.keyCode !== 17) {
                return;
            }
            _this.unsubscribeToDrawKeyUp();
            _this.unsubscribeToKeyDown();
            _this.deactivateDrawInteraction();
            _this.activateModifyInteraction();
            _this.activateTranslateInteraction();
            _this.subscribeToDrawKeyDown();
            _this.end$.next(_this.getOlGeometry());
        }));
    };
    /**
     * Unsubscribe to draw key down
     */
    /**
     * Unsubscribe to draw key down
     * @private
     * @return {?}
     */
    ModifyControl.prototype.unsubscribeToDrawKeyDown = /**
     * Unsubscribe to draw key down
     * @private
     * @return {?}
     */
    function () {
        if (this.drawKeyDown$$ !== undefined) {
            this.drawKeyDown$$.unsubscribe();
        }
    };
    /**
     * Unsubscribe to key up
     */
    /**
     * Unsubscribe to key up
     * @private
     * @return {?}
     */
    ModifyControl.prototype.unsubscribeToDrawKeyUp = /**
     * Unsubscribe to key up
     * @private
     * @return {?}
     */
    function () {
        if (this.drawKeyUp$$ !== undefined) {
            this.drawKeyUp$$.unsubscribe();
        }
    };
    /**
     * Remove the draw interaction
     */
    /**
     * Remove the draw interaction
     * @private
     * @return {?}
     */
    ModifyControl.prototype.removeOlDrawInteraction = /**
     * Remove the draw interaction
     * @private
     * @return {?}
     */
    function () {
        if (this.olDrawInteraction === undefined) {
            return;
        }
        this.unsubscribeToKeyDown();
        this.unsubscribeToDrawKeyUp();
        this.unsubscribeToDrawKeyDown();
        this.deactivateDrawInteraction();
        this.olDrawInteraction = undefined;
    };
    /**
     * Activate the draw interaction
     */
    /**
     * Activate the draw interaction
     * @private
     * @return {?}
     */
    ModifyControl.prototype.activateDrawInteraction = /**
     * Activate the draw interaction
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.olDrawInteractionIsActive === true) {
            return;
        }
        this.clearOlLinearRingsSource();
        this.addOlLinearRingsLayer();
        this.olMap.getInteractions().forEach((/**
         * @param {?} olInteraction
         * @return {?}
         */
        function (olInteraction) {
            if (olInteraction instanceof OlDragBoxInteraction) {
                _this.olMap.removeInteraction(olInteraction);
                _this.removedOlInteractions.push(olInteraction);
            }
        }));
        this.olDrawInteractionIsActive = true;
        this.onDrawStartKey = this.olDrawInteraction
            .on('drawstart', (/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.onDrawStart(event); }));
        this.onDrawEndKey = this.olDrawInteraction
            .on('drawend', (/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.onDrawEnd(event); }));
        this.olMap.addInteraction(this.olDrawInteraction);
    };
    /**
     * Deactivate the draw interaction
     */
    /**
     * Deactivate the draw interaction
     * @private
     * @return {?}
     */
    ModifyControl.prototype.deactivateDrawInteraction = /**
     * Deactivate the draw interaction
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.olDrawInteractionIsActive === false) {
            return;
        }
        this.removeOlLinearRingsLayer();
        this.removedOlInteractions.forEach((/**
         * @param {?} olInteraction
         * @return {?}
         */
        function (olInteraction) {
            _this.olMap.addInteraction(olInteraction);
        }));
        this.olDrawInteractionIsActive = false;
        unByKey(this.onDrawStartKey);
        unByKey(this.onDrawEndKey);
        if (this.olMap !== undefined) {
            this.olMap.removeInteraction(this.olDrawInteraction);
        }
    };
    /**
     * When draw start, add a new linerar ring to the geometry and start watching for changes
     * @param event Draw start event
     */
    /**
     * When draw start, add a new linerar ring to the geometry and start watching for changes
     * @private
     * @param {?} event Draw start event
     * @return {?}
     */
    ModifyControl.prototype.onDrawStart = /**
     * When draw start, add a new linerar ring to the geometry and start watching for changes
     * @private
     * @param {?} event Draw start event
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
        var olGeometry = event.feature.getGeometry();
        this.olOuterGeometry = this.getOlGeometry().clone();
        /** @type {?} */
        var linearRingCoordinates = olGeometry.getLinearRing().getCoordinates();
        this.addLinearRingToOlGeometry(linearRingCoordinates);
        this.start$.next(this.getOlGeometry());
        this.onDrawKey = olGeometry.on('change', (/**
         * @param {?} olGeometryEvent
         * @return {?}
         */
        function (olGeometryEvent) {
            /** @type {?} */
            var _linearRingCoordinates = olGeometryEvent.target.getLinearRing().getCoordinates();
            _this.updateLinearRingOfOlGeometry(_linearRingCoordinates);
            _this.changes$.next(_this.getOlGeometry());
        }));
        this.subscribeToKeyDown();
    };
    /**
     * When translation ends, update the geometry observable and stop watchign for changes
     * @param event Draw end event
     */
    /**
     * When translation ends, update the geometry observable and stop watchign for changes
     * @private
     * @param {?} event Draw end event
     * @return {?}
     */
    ModifyControl.prototype.onDrawEnd = /**
     * When translation ends, update the geometry observable and stop watchign for changes
     * @private
     * @param {?} event Draw end event
     * @return {?}
     */
    function (event) {
        if (this.onDrawKey !== undefined) {
            unByKey(this.onDrawKey);
        }
        this.olOuterGeometry = undefined;
        /** @type {?} */
        var linearRingCoordinates = event.feature.getGeometry().getLinearRing().getCoordinates();
        this.updateLinearRingOfOlGeometry(linearRingCoordinates);
        this.clearOlLinearRingsSource();
        this.end$.next(this.getOlGeometry());
        this.unsubscribeToKeyDown();
    };
    /**
     * Add a linear ring to the geometry being modified
     * @param coordinates Linear ring coordinates
     */
    /**
     * Add a linear ring to the geometry being modified
     * @private
     * @param {?} coordinates Linear ring coordinates
     * @return {?}
     */
    ModifyControl.prototype.addLinearRingToOlGeometry = /**
     * Add a linear ring to the geometry being modified
     * @private
     * @param {?} coordinates Linear ring coordinates
     * @return {?}
     */
    function (coordinates) {
        /** @type {?} */
        var olGeometry = this.getOlGeometry();
        /** @type {?} */
        var olLinearRing = new OlLinearRing(coordinates);
        addLinearRingToOlPolygon(olGeometry, olLinearRing);
    };
    /**
     * Update the last linear ring of the geometry being modified
     * @param coordinates Linear ring coordinates
     */
    /**
     * Update the last linear ring of the geometry being modified
     * @private
     * @param {?} coordinates Linear ring coordinates
     * @return {?}
     */
    ModifyControl.prototype.updateLinearRingOfOlGeometry = /**
     * Update the last linear ring of the geometry being modified
     * @private
     * @param {?} coordinates Linear ring coordinates
     * @return {?}
     */
    function (coordinates) {
        /** @type {?} */
        var olGeometry = this.getOlGeometry();
        // Remove the last linear ring (the one we are updating)
        /** @type {?} */
        var olLinearRings = olGeometry.getLinearRings().slice(0, -1);
        /** @type {?} */
        var newCoordinates = olLinearRings.map((/**
         * @param {?} olLinearRing
         * @return {?}
         */
        function (olLinearRing) {
            return olLinearRing.getCoordinates();
        }));
        newCoordinates.push(coordinates);
        olGeometry.setCoordinates(newCoordinates);
    };
    /**
     * Get the geometry being modified
     * @returns OL Geometry
     */
    /**
     * Get the geometry being modified
     * @private
     * @return {?} OL Geometry
     */
    ModifyControl.prototype.getOlGeometry = /**
     * Get the geometry being modified
     * @private
     * @return {?} OL Geometry
     */
    function () {
        /** @type {?} */
        var olFeatures = this.olOverlaySource.getFeatures();
        return olFeatures.length > 0 ? olFeatures[0].getGeometry() : undefined;
    };
    return ModifyControl;
}());
/**
 * Control to modify geometries
 */
export { ModifyControl };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZ5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2dlb21ldHJ5L3NoYXJlZC9jb250cm9scy9tb2RpZnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sU0FBUyxNQUFNLFlBQVksQ0FBQztBQUVuQyxPQUFPLGNBQWMsTUFBTSxrQkFBa0IsQ0FBQztBQUM5QyxPQUFPLGFBQWEsTUFBTSxpQkFBaUIsQ0FBQztBQUM1QyxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLFNBQVMsTUFBTSxpQkFBaUIsQ0FBQztBQUN4QyxPQUFPLFlBQVksTUFBTSxvQkFBb0IsQ0FBQztBQUU5QyxPQUFPLG9CQUFvQixNQUFNLHdCQUF3QixDQUFDO0FBUzFELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFeEMsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXhELE9BQU8sRUFDTCx3QkFBd0IsRUFDeEIsOEJBQThCLEVBQzlCLG1DQUFtQyxFQUNwQyxNQUFNLG1CQUFtQixDQUFDOzs7O0FBRTNCLDBDQUtDOzs7SUFKQyxzQ0FBd0I7O0lBQ3hCLHFDQUFzQjs7SUFDdEIsMENBQTJEOztJQUMzRCx5Q0FBMEQ7Ozs7O0FBTTVEOzs7O0lBc0VFLHVCQUFvQixPQUE2QjtRQUE3QixZQUFPLEdBQVAsT0FBTyxDQUFzQjs7OztRQWpFMUMsV0FBTSxHQUF3QixJQUFJLE9BQU8sRUFBRSxDQUFDOzs7O1FBSzVDLFNBQUksR0FBd0IsSUFBSSxPQUFPLEVBQUUsQ0FBQzs7OztRQUsxQyxhQUFRLEdBQXdCLElBQUksT0FBTyxFQUFFLENBQUM7UUFRN0MsZ0NBQTJCLEdBQVksS0FBSyxDQUFDO1FBSzdDLG1DQUE4QixHQUFZ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XG5pbXBvcnQgT2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5pbXBvcnQgT2xTdHlsZSBmcm9tICdvbC9zdHlsZSc7XHJcbmltcG9ydCBPbFZlY3RvclNvdXJjZSBmcm9tICdvbC9zb3VyY2UvVmVjdG9yJztcclxuaW1wb3J0IE9sVmVjdG9yTGF5ZXIgZnJvbSAnb2wvbGF5ZXIvVmVjdG9yJztcclxuaW1wb3J0IE9sTW9kaWZ5IGZyb20gJ29sL2ludGVyYWN0aW9uL01vZGlmeSc7XHJcbmltcG9ydCBPbFRyYW5zbGF0ZSBmcm9tICdvbC9pbnRlcmFjdGlvbi9UcmFuc2xhdGUnO1xyXG5pbXBvcnQgT2xEcmF3IGZyb20gJ29sL2ludGVyYWN0aW9uL0RyYXcnO1xyXG5pbXBvcnQgT2xQb2x5Z29uIGZyb20gJ29sL2dlb20vUG9seWdvbic7XHJcbmltcG9ydCBPbExpbmVhclJpbmcgZnJvbSAnb2wvZ2VvbS9MaW5lYXJSaW5nJztcclxuaW1wb3J0IE9sSW50ZXJhY3Rpb24gZnJvbSAnb2wvaW50ZXJhY3Rpb24vSW50ZXJhY3Rpb24nO1xyXG5pbXBvcnQgT2xEcmFnQm94SW50ZXJhY3Rpb24gZnJvbSAnb2wvaW50ZXJhY3Rpb24vRHJhZ0JveCc7XHJcbmltcG9ydCB7IE1hcEJyb3dzZXJFdmVudCBhcyBPbE1hcEJyb3dzZXJFdmVudCB9IGZyb20gJ29sL01hcEJyb3dzZXJFdmVudCc7XHJcbmltcG9ydCB7XHJcbiAgR2VvbWV0cnkgYXMgT2xHZW9tZXRyeSxcclxuICBHZW9tZXRyeUV2ZW50IGFzIE9sR2VvbWV0cnlFdmVudFxyXG59IGZyb20gJ29sL2dlb20vR2VvbWV0cnknO1xyXG5pbXBvcnQgeyBNb2RpZnlFdmVudCBhcyBPbE1vZGlmeUV2ZW50IH0gZnJvbSAnb2wvaW50ZXJhY3Rpb24vTW9kaWZ5JztcclxuaW1wb3J0IHsgVHJhbnNsYXRlRXZlbnQgYXMgT2xUcmFuc2xhdGVFdmVudCB9IGZyb20gJ29sL2ludGVyYWN0aW9uL1RyYW5zbGF0ZSc7XHJcbmltcG9ydCB7IERyYXdFdmVudCBhcyBPbERyYXdFdmVudCB9IGZyb20gJ29sL2ludGVyYWN0aW9uL0RyYXcnO1xyXG5pbXBvcnQgeyB1bkJ5S2V5IH0gZnJvbSAnb2wvT2JzZXJ2YWJsZSc7XHJcblxyXG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24sIGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHtcclxuICBhZGRMaW5lYXJSaW5nVG9PbFBvbHlnb24sXHJcbiAgY3JlYXRlRHJhd0hvbGVJbnRlcmFjdGlvblN0eWxlLFxyXG4gIGdldE1vdXNlUG9zaXRpb25Gcm9tT2xHZW9tZXRyeUV2ZW50XHJcbn0gZnJvbSAnLi4vZ2VvbWV0cnkudXRpbHMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNb2RpZnlDb250cm9sT3B0aW9ucyB7XHJcbiAgc291cmNlPzogT2xWZWN0b3JTb3VyY2U7XHJcbiAgbGF5ZXI/OiBPbFZlY3RvckxheWVyO1xyXG4gIGxheWVyU3R5bGU/OiBPbFN0eWxlIHwgKChvbGZlYXR1cmU6IE9sRmVhdHVyZSkgPT4gT2xTdHlsZSk7XHJcbiAgZHJhd1N0eWxlPzogT2xTdHlsZSB8ICgob2xmZWF0dXJlOiBPbEZlYXR1cmUpID0+IE9sU3R5bGUpO1xyXG59XHJcblxyXG4vKipcclxuICogQ29udHJvbCB0byBtb2RpZnkgZ2VvbWV0cmllc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1vZGlmeUNvbnRyb2wge1xyXG5cclxuICAvKipcclxuICAgKiBNb2RpZnkgc3RhcnQgb2JzZXJ2YWJsZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGFydCQ6IFN1YmplY3Q8T2xHZW9tZXRyeT4gPSBuZXcgU3ViamVjdCgpO1xyXG5cclxuICAvKipcclxuICAgKiBNb2RpZnkgZW5kIG9ic2VydmFibGVcclxuICAgKi9cclxuICBwdWJsaWMgZW5kJDogU3ViamVjdDxPbEdlb21ldHJ5PiA9IG5ldyBTdWJqZWN0KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEdlb21ldHJ5IGNoYW5nZXMgb2JzZXJ2YWJsZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBjaGFuZ2VzJDogU3ViamVjdDxPbEdlb21ldHJ5PiA9IG5ldyBTdWJqZWN0KCk7XHJcblxyXG4gIHByaXZhdGUgb2xNYXA6IE9sTWFwO1xyXG4gIHByaXZhdGUgb2xPdmVybGF5TGF5ZXI6IE9sVmVjdG9yTGF5ZXI7XHJcbiAgcHVibGljIG9sTW9kaWZ5SW50ZXJhY3Rpb246IE9sTW9kaWZ5O1xyXG4gIHByaXZhdGUgb25Nb2RpZnlTdGFydEtleTogc3RyaW5nO1xyXG4gIHByaXZhdGUgb25Nb2RpZnlFbmRLZXk6IHN0cmluZztcclxuICBwcml2YXRlIG9uTW9kaWZ5S2V5OiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBvbE1vZGlmeUludGVyYWN0aW9uSXNBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwcml2YXRlIG9sVHJhbnNsYXRlSW50ZXJhY3Rpb246IE9sVHJhbnNsYXRlO1xyXG4gIHByaXZhdGUgb25UcmFuc2xhdGVTdGFydEtleTogc3RyaW5nO1xyXG4gIHByaXZhdGUgb25UcmFuc2xhdGVFbmRLZXk6IHN0cmluZztcclxuICBwcml2YXRlIG9uVHJhbnNsYXRlS2V5OiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBvbFRyYW5zbGF0ZUludGVyYWN0aW9uSXNBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwcml2YXRlIG9sRHJhd0ludGVyYWN0aW9uOiBPbFRyYW5zbGF0ZTtcclxuICBwcml2YXRlIG9uRHJhd1N0YXJ0S2V5OiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBvbkRyYXdFbmRLZXk6IHN0cmluZztcclxuICBwcml2YXRlIG9uRHJhd0tleTogc3RyaW5nO1xyXG4gIHByaXZhdGUgb2xEcmF3SW50ZXJhY3Rpb25Jc0FjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBwcml2YXRlIG1vdXNlUG9zaXRpb246IFtudW1iZXIsIG51bWJlcl07XHJcblxyXG4gIHByaXZhdGUga2V5RG93biQkOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBkcmF3S2V5VXAkJDogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgZHJhd0tleURvd24kJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBwcml2YXRlIHJlbW92ZWRPbEludGVyYWN0aW9uczogT2xJbnRlcmFjdGlvbltdID0gW107XHJcbiAgcHJpdmF0ZSBvbExpbmVhclJpbmdzTGF5ZXI6IE9sVmVjdG9yTGF5ZXI7XHJcblxyXG4gIC8vIFRoaXMgaXMgdGhlIGdlb21ldHJ5IHRvIHRlc3QgYWdhaW5zdCB3aGVuIGRyYXdpbmcgaG9sZXNcclxuICBwcml2YXRlIG9sT3V0ZXJHZW9tZXRyeTogT2xHZW9tZXRyeTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGVyIHRoZSBjb250cm9sIGlzIGFjdGl2ZVxyXG4gICAqL1xyXG4gIGdldCBhY3RpdmUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5vbE1hcCAhPT0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT0wgb3ZlcmxheSBzb3VyY2VcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgb2xPdmVybGF5U291cmNlKCk6IE9sVmVjdG9yU291cmNlIHtcclxuICAgIHJldHVybiB0aGlzLm9sT3ZlcmxheUxheWVyLmdldFNvdXJjZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT0wgbGluZWFyIHJpbmdzIHNvdXJjZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBvbExpbmVhclJpbmdzU291cmNlKCk6IE9sVmVjdG9yU291cmNlIHtcclxuICAgIHJldHVybiB0aGlzLm9sTGluZWFyUmluZ3NMYXllci5nZXRTb3VyY2UoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgb3B0aW9uczogTW9kaWZ5Q29udHJvbE9wdGlvbnMpIHtcclxuICAgIGlmIChvcHRpb25zLmxheWVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbE92ZXJsYXlMYXllciA9IG9wdGlvbnMubGF5ZXI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm9sT3ZlcmxheUxheWVyID0gdGhpcy5jcmVhdGVPbElubmVyT3ZlcmxheUxheWVyKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9sTGluZWFyUmluZ3NMYXllciA9IHRoaXMuY3JlYXRlT2xMaW5lYXJSaW5nc0xheWVyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgb3IgcmVtb3ZlIHRoaXMgY29udHJvbCB0by9mcm9tIGEgbWFwLlxyXG4gICAqIEBwYXJhbSBtYXAgT0wgTWFwXHJcbiAgICovXHJcbiAgc2V0T2xNYXAob2xNYXA6IE9sTWFwIHwgdW5kZWZpbmVkKSB7XHJcbiAgICBpZiAob2xNYXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmNsZWFyT2xJbm5lck92ZXJsYXlTb3VyY2UoKTtcclxuICAgICAgdGhpcy5yZW1vdmVPbElubmVyT3ZlcmxheUxheWVyKCk7XHJcbiAgICAgIHRoaXMucmVtb3ZlT2xNb2RpZnlJbnRlcmFjdGlvbigpO1xyXG4gICAgICB0aGlzLnJlbW92ZU9sVHJhbnNsYXRlSW50ZXJhY3Rpb24oKTtcclxuICAgICAgdGhpcy5yZW1vdmVPbERyYXdJbnRlcmFjdGlvbigpO1xyXG4gICAgICB0aGlzLm9sTWFwID0gb2xNYXA7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9sTWFwID0gb2xNYXA7XHJcbiAgICB0aGlzLmFkZE9sSW5uZXJPdmVybGF5TGF5ZXIoKTtcclxuICAgIHRoaXMuYWRkT2xEcmF3SW50ZXJhY3Rpb24oKTtcclxuICAgIHRoaXMuYWRkT2xUcmFuc2xhdGVJbnRlcmFjdGlvbigpO1xyXG4gICAgdGhpcy5hY3RpdmF0ZVRyYW5zbGF0ZUludGVyYWN0aW9uKCk7XHJcbiAgICB0aGlzLmFkZE9sTW9kaWZ5SW50ZXJhY3Rpb24oKTtcclxuICAgIHRoaXMuYWN0aXZhdGVNb2RpZnlJbnRlcmFjdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIHRoZSBvdmVybGF5IHNvdXJjZVxyXG4gICAqL1xyXG4gIGdldFNvdXJjZSgpOiBPbFZlY3RvclNvdXJjZSB7XHJcbiAgICByZXR1cm4gdGhpcy5vbE92ZXJsYXlTb3VyY2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYW4gT0wgZ2VvbWV0cnkgdG8gdGhlIG92ZXJsYXkgYW5kIHN0YXJ0IG1vZGlmeWluZyBpdFxyXG4gICAqIEBwYXJhbSBvbEdlb21ldHJ5IE9sIEdlb21ldHJ5XHJcbiAgICovXHJcbiAgc2V0T2xHZW9tZXRyeShvbEdlb21ldHJ5OiBPbEdlb21ldHJ5KSB7XHJcbiAgICBjb25zdCBvbEZlYXR1cmUgPSBuZXcgT2xGZWF0dXJlKHtnZW9tZXRyeTogb2xHZW9tZXRyeX0pO1xyXG4gICAgdGhpcy5vbE92ZXJsYXlTb3VyY2UuY2xlYXIoKTtcclxuICAgIHRoaXMub2xPdmVybGF5U291cmNlLmFkZEZlYXR1cmUob2xGZWF0dXJlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhbiBvdmVybGF5IHNvdXJjZSBpZiBub25lIGlzIGRlZmluZWQgaW4gdGhlIG9wdGlvbnNcclxuICAgKi9cclxuICBwcml2YXRlIGNyZWF0ZU9sSW5uZXJPdmVybGF5TGF5ZXIoKTogT2xWZWN0b3JMYXllciB7XHJcbiAgICByZXR1cm4gbmV3IE9sVmVjdG9yTGF5ZXIoe1xyXG4gICAgICBzb3VyY2U6IHRoaXMub3B0aW9ucy5zb3VyY2UgPyB0aGlzLm9wdGlvbnMuc291cmNlIDogbmV3IE9sVmVjdG9yU291cmNlKCksXHJcbiAgICAgIHN0eWxlOiB0aGlzLm9wdGlvbnMubGF5ZXJTdHlsZSxcclxuICAgICAgekluZGV4OiA1MDBcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIHRoZSBvdmVybGF5IGxheWVyIGlmIGl0IHdhc24ndCBkZWZpbmVkIGluIHRoZSBvcHRpb25zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRPbElubmVyT3ZlcmxheUxheWVyKCk6IE9sVmVjdG9yTGF5ZXIge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5sYXllciA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2xNYXAuYWRkTGF5ZXIodGhpcy5vbE92ZXJsYXlMYXllcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgb3ZlcmxheSBsYXllciBpZiBpdCB3YXNuJ3QgZGVmaW5lZCBpbiB0aGUgb3B0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlT2xJbm5lck92ZXJsYXlMYXllcigpIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMubGF5ZXIgPT09IHVuZGVmaW5lZCAmJiB0aGlzLm9sTWFwICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbE1hcC5yZW1vdmVMYXllcih0aGlzLm9sT3ZlcmxheUxheWVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBvdmVybGF5IHNvdXJjZSBpZiBpdCB3YXNuJ3QgZGVmaW5lZCBpbiB0aGUgb3B0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgY2xlYXJPbElubmVyT3ZlcmxheVNvdXJjZSgpIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMubGF5ZXIgPT09IHVuZGVmaW5lZCAmJiB0aGlzLm9wdGlvbnMuc291cmNlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbE92ZXJsYXlTb3VyY2UuY2xlYXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlT2xMaW5lYXJSaW5nc0xheWVyKCk6IE9sVmVjdG9yTGF5ZXIge1xyXG4gICAgcmV0dXJuIG5ldyBPbFZlY3RvckxheWVyKHtcclxuICAgICAgc291cmNlOiBuZXcgT2xWZWN0b3JTb3VyY2UoKSxcclxuICAgICAgc3R5bGU6IGNyZWF0ZURyYXdIb2xlSW50ZXJhY3Rpb25TdHlsZSgpLFxyXG4gICAgICB6SW5kZXg6IDUwMFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgdGhlIGxpbmVhciByaW5ncyBsYXllclxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkT2xMaW5lYXJSaW5nc0xheWVyKCkge1xyXG4gICAgdGhpcy5vbE1hcC5hZGRMYXllcih0aGlzLm9sTGluZWFyUmluZ3NMYXllcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgbGluZWFyIHJpbmdzIGxheWVyXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZW1vdmVPbExpbmVhclJpbmdzTGF5ZXIoKSB7XHJcbiAgICB0aGlzLm9sTWFwLnJlbW92ZUxheWVyKHRoaXMub2xMaW5lYXJSaW5nc0xheWVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBsaW5lYXIgcmluZ3Mgc291cmNlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjbGVhck9sTGluZWFyUmluZ3NTb3VyY2UoKSB7XHJcbiAgICB0aGlzLm9sTGluZWFyUmluZ3NTb3VyY2UuY2xlYXIodHJ1ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYSBtb2RpZnkgaW50ZXJhY3Rpb24gdG8gdGhlIG1hcCBhbiBzZXQgdXAgc29tZSBsaXN0ZW5lcnNcclxuICAgKi9cclxuICBwcml2YXRlIGFkZE9sTW9kaWZ5SW50ZXJhY3Rpb24oKSB7XHJcbiAgICBjb25zdCBvbE1vZGlmeUludGVyYWN0aW9uID0gbmV3IE9sTW9kaWZ5KHtcclxuICAgICAgc291cmNlOiB0aGlzLm9sT3ZlcmxheVNvdXJjZSxcclxuICAgICAgc3R5bGU6IHRoaXMub3B0aW9ucy5kcmF3U3R5bGVcclxuICAgIH0pO1xyXG4gICAgdGhpcy5vbE1vZGlmeUludGVyYWN0aW9uID0gb2xNb2RpZnlJbnRlcmFjdGlvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSB0aGUgbW9kaWZ5IGludGVyYWN0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZW1vdmVPbE1vZGlmeUludGVyYWN0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMub2xNb2RpZnlJbnRlcmFjdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRlYWN0aXZhdGVNb2RpZnlJbnRlcmFjdGlvbigpO1xyXG4gICAgdGhpcy5vbE1vZGlmeUludGVyYWN0aW9uID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhY3RpdmF0ZU1vZGlmeUludGVyYWN0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMub2xNb2RpZnlJbnRlcmFjdGlvbklzQWN0aXZlID09PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9sTW9kaWZ5SW50ZXJhY3Rpb25Jc0FjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLm9uTW9kaWZ5U3RhcnRLZXkgPSB0aGlzLm9sTW9kaWZ5SW50ZXJhY3Rpb25cclxuICAgICAgLm9uKCdtb2RpZnlzdGFydCcsIChldmVudDogT2xNb2RpZnlFdmVudCkgPT4gdGhpcy5vbk1vZGlmeVN0YXJ0KGV2ZW50KSk7XHJcbiAgICB0aGlzLm9uTW9kaWZ5RW5kS2V5ID0gdGhpcy5vbE1vZGlmeUludGVyYWN0aW9uXHJcbiAgICAgIC5vbignbW9kaWZ5ZW5kJywgKGV2ZW50OiBPbE1vZGlmeUV2ZW50KSA9PiB0aGlzLm9uTW9kaWZ5RW5kKGV2ZW50KSk7XHJcbiAgICB0aGlzLm9sTWFwLmFkZEludGVyYWN0aW9uKHRoaXMub2xNb2RpZnlJbnRlcmFjdGlvbik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRlYWN0aXZhdGVNb2RpZnlJbnRlcmFjdGlvbigpIHtcclxuICAgIGlmICh0aGlzLm9sTW9kaWZ5SW50ZXJhY3Rpb25Jc0FjdGl2ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub2xNb2RpZnlJbnRlcmFjdGlvbklzQWN0aXZlID0gZmFsc2U7XHJcbiAgICB1bkJ5S2V5KHRoaXMub25Nb2RpZnlTdGFydEtleSk7XHJcbiAgICB1bkJ5S2V5KHRoaXMub25Nb2RpZnlFbmRLZXkpO1xyXG4gICAgaWYgKHRoaXMub2xNYXAgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9sTWFwLnJlbW92ZUludGVyYWN0aW9uKHRoaXMub2xNb2RpZnlJbnRlcmFjdGlvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIG1vZGlmeWluZyBzdGFydHMsIGNsZWFyIHRoZSBvdmVybGF5IGFuZCBzdGFydCB3YXRjaGluZyBmb3IgY2hhbmdlc1xyXG4gICAqIEBwYXJhbSBldmVudCBNb2RpZnkgc3RhcnQgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uTW9kaWZ5U3RhcnQoZXZlbnQ6IE9sTW9kaWZ5RXZlbnQpIHtcclxuICAgIGNvbnN0IG9sR2VvbWV0cnkgPSBldmVudC5mZWF0dXJlcy5pdGVtKDApLmdldEdlb21ldHJ5KCk7XHJcbiAgICB0aGlzLnN0YXJ0JC5uZXh0KG9sR2VvbWV0cnkpO1xyXG4gICAgdGhpcy5vbk1vZGlmeUtleSA9IG9sR2VvbWV0cnkub24oJ2NoYW5nZScsIChvbEdlb21ldHJ5RXZlbnQ6IE9sR2VvbWV0cnlFdmVudCkgPT4ge1xyXG4gICAgICB0aGlzLm1vdXNlUG9zaXRpb24gPSBnZXRNb3VzZVBvc2l0aW9uRnJvbU9sR2VvbWV0cnlFdmVudChvbEdlb21ldHJ5RXZlbnQpO1xyXG4gICAgICB0aGlzLmNoYW5nZXMkLm5leHQob2xHZW9tZXRyeUV2ZW50LnRhcmdldCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc3Vic2NyaWJlVG9LZXlEb3duKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIG1vZGlmeWluZyBlbmRzLCB1cGRhdGUgdGhlIGdlb21ldHJ5IG9ic2VydmFibGUgYW5kIHN0b3Agd2F0Y2hpbmcgZm9yIGNoYW5nZXNcclxuICAgKiBAcGFyYW0gZXZlbnQgTW9kaWZ5IGVuZCBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25Nb2RpZnlFbmQoZXZlbnQ6IE9sTW9kaWZ5RXZlbnQpIHtcclxuICAgIGlmICh0aGlzLm9uTW9kaWZ5S2V5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdW5CeUtleSh0aGlzLm9uTW9kaWZ5S2V5KTtcclxuICAgIH1cclxuICAgIHRoaXMuZW5kJC5uZXh0KGV2ZW50LmZlYXR1cmVzLml0ZW0oMCkuZ2V0R2VvbWV0cnkoKSk7XHJcbiAgICB0aGlzLnVuc3Vic2NyaWJlVG9LZXlEb3duKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpYmUgdG8gQ1RSTCBrZXkgZG93biB0byBhY3RpdmF0ZSB0aGUgZHJhdyBjb250cm9sXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb0tleURvd24oKSB7XHJcbiAgICB0aGlzLmtleURvd24kJCA9IGZyb21FdmVudChkb2N1bWVudCwgJ2tleWRvd24nKS5zdWJzY3JpYmUoKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzMikge1xyXG4gICAgICAgIC8vIE9uIHNwYWNlIGJhciwgcGFuIHRvIHRoZSBjdXJyZW50IG1vdXNlIHBvc2l0aW9uXHJcbiAgICAgICAgdGhpcy5vbE1hcC5nZXRWaWV3KCkuYW5pbWF0ZSh7XHJcbiAgICAgICAgICBjZW50ZXI6IHRoaXMubW91c2VQb3NpdGlvbixcclxuICAgICAgICAgIGR1cmF0aW9uOiAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuc3Vic2NyaWJlIHRvIGtleSBkb3duXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1bnN1YnNjcmliZVRvS2V5RG93bigpIHtcclxuICAgIGlmICh0aGlzLmtleURvd24kJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMua2V5RG93biQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYSB0cmFuc2xhdGUgaW50ZXJhY3Rpb24gdG8gdGhlIG1hcCBhbiBzZXQgdXAgc29tZSBsaXN0ZW5lcnNcclxuICAgKi9cclxuICBwcml2YXRlIGFkZE9sVHJhbnNsYXRlSW50ZXJhY3Rpb24oKSB7XHJcbiAgICBjb25zdCBvbFRyYW5zbGF0ZUludGVyYWN0aW9uID0gbmV3IE9sVHJhbnNsYXRlKHtcclxuICAgICAgbGF5ZXJzOiBbdGhpcy5vbE92ZXJsYXlMYXllcl1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5vbFRyYW5zbGF0ZUludGVyYWN0aW9uID0gb2xUcmFuc2xhdGVJbnRlcmFjdGlvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSB0aGUgdHJhbnNsYXRlIGludGVyYWN0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZW1vdmVPbFRyYW5zbGF0ZUludGVyYWN0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMub2xUcmFuc2xhdGVJbnRlcmFjdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRlYWN0aXZhdGVUcmFuc2xhdGVJbnRlcmFjdGlvbigpO1xyXG4gICAgdGhpcy5vbFRyYW5zbGF0ZUludGVyYWN0aW9uID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhY3RpdmF0ZVRyYW5zbGF0ZUludGVyYWN0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMub2xUcmFuc2xhdGVJbnRlcmFjdGlvbklzQWN0aXZlID09PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9sVHJhbnNsYXRlSW50ZXJhY3Rpb25Jc0FjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLm9uVHJhbnNsYXRlU3RhcnRLZXkgPSB0aGlzLm9sVHJhbnNsYXRlSW50ZXJhY3Rpb25cclxuICAgICAgLm9uKCd0cmFuc2xhdGVzdGFydCcsIChldmVudDogT2xUcmFuc2xhdGVFdmVudCkgPT4gdGhpcy5vblRyYW5zbGF0ZVN0YXJ0KGV2ZW50KSk7XHJcbiAgICB0aGlzLm9uVHJhbnNsYXRlRW5kS2V5ID0gdGhpcy5vbFRyYW5zbGF0ZUludGVyYWN0aW9uXHJcbiAgICAgIC5vbigndHJhbnNsYXRlZW5kJywgKGV2ZW50OiBPbFRyYW5zbGF0ZUV2ZW50KSA9PiB0aGlzLm9uVHJhbnNsYXRlRW5kKGV2ZW50KSk7XHJcbiAgICB0aGlzLm9sTWFwLmFkZEludGVyYWN0aW9uKHRoaXMub2xUcmFuc2xhdGVJbnRlcmFjdGlvbik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRlYWN0aXZhdGVUcmFuc2xhdGVJbnRlcmFjdGlvbigpIHtcclxuICAgIGlmICh0aGlzLm9sVHJhbnNsYXRlSW50ZXJhY3Rpb25Jc0FjdGl2ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub2xUcmFuc2xhdGVJbnRlcmFjdGlvbklzQWN0aXZlID0gZmFsc2U7XHJcbiAgICB1bkJ5S2V5KHRoaXMub25UcmFuc2xhdGVTdGFydEtleSk7XHJcbiAgICB1bkJ5S2V5KHRoaXMub25UcmFuc2xhdGVFbmRLZXkpO1xyXG4gICAgaWYgKHRoaXMub2xNYXAgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9sTWFwLnJlbW92ZUludGVyYWN0aW9uKHRoaXMub2xUcmFuc2xhdGVJbnRlcmFjdGlvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHRyYW5zbGF0aW9uIHN0YXJ0cywgY2xlYXIgdGhlIG92ZXJsYXkgYW5kIHN0YXJ0IHdhdGNoaW5nIGZvciBjaGFuZ2VzXHJcbiAgICogQHBhcmFtIGV2ZW50IFRyYW5zbGF0ZSBzdGFydCBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25UcmFuc2xhdGVTdGFydChldmVudDogT2xUcmFuc2xhdGVFdmVudCkge1xyXG4gICAgY29uc3Qgb2xHZW9tZXRyeSA9IGV2ZW50LmZlYXR1cmVzLml0ZW0oMCkuZ2V0R2VvbWV0cnkoKTtcclxuICAgIHRoaXMuc3RhcnQkLm5leHQob2xHZW9tZXRyeSk7XHJcbiAgICB0aGlzLm9uVHJhbnNsYXRlS2V5ID0gb2xHZW9tZXRyeS5vbignY2hhbmdlJywgKG9sR2VvbWV0cnlFdmVudDogT2xHZW9tZXRyeUV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMuY2hhbmdlcyQubmV4dChvbEdlb21ldHJ5RXZlbnQudGFyZ2V0KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0cmFuc2xhdGlvbiBlbmRzLCB1cGRhdGUgdGhlIGdlb21ldHJ5IG9ic2VydmFibGUgYW5kIHN0b3Agd2F0Y2hpZ24gZm9yIGNoYW5nZXNcclxuICAgKiBAcGFyYW0gZXZlbnQgVHJhbnNsYXRlIGVuZCBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25UcmFuc2xhdGVFbmQoZXZlbnQ6IE9sVHJhbnNsYXRlRXZlbnQpIHtcclxuICAgIGlmICh0aGlzLm9uVHJhbnNsYXRlS2V5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdW5CeUtleSh0aGlzLm9uVHJhbnNsYXRlS2V5KTtcclxuICAgIH1cclxuICAgIHRoaXMuZW5kJC5uZXh0KGV2ZW50LmZlYXR1cmVzLml0ZW0oMCkuZ2V0R2VvbWV0cnkoKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYSBkcmF3IGludGVyYWN0aW9uIHRvIHRoZSBtYXAgYW4gc2V0IHVwIHNvbWUgbGlzdGVuZXJzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRPbERyYXdJbnRlcmFjdGlvbigpIHtcclxuICAgIGNvbnN0IG9sRHJhd0ludGVyYWN0aW9uID0gbmV3IE9sRHJhdyh7XHJcbiAgICAgIHR5cGU6ICdQb2x5Z29uJyxcclxuICAgICAgc291cmNlOiB0aGlzLm9sTGluZWFyUmluZ3NTb3VyY2UsXHJcbiAgICAgIHN0b3BDbGljazogdHJ1ZSxcclxuICAgICAgc3R5bGU6IGNyZWF0ZURyYXdIb2xlSW50ZXJhY3Rpb25TdHlsZSgpLFxyXG4gICAgICBjb25kaXRpb246IChldmVudDogT2xNYXBCcm93c2VyRXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCBvbE91dGVyR2VvbWV0cnkgPSB0aGlzLm9sT3V0ZXJHZW9tZXRyeSB8fCB0aGlzLmdldE9sR2VvbWV0cnkoKTtcclxuICAgICAgICByZXR1cm4gb2xPdXRlckdlb21ldHJ5LmludGVyc2VjdHNDb29yZGluYXRlKGV2ZW50LmNvb3JkaW5hdGUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm9sRHJhd0ludGVyYWN0aW9uID0gb2xEcmF3SW50ZXJhY3Rpb247XHJcbiAgICB0aGlzLnN1YnNjcmliZVRvRHJhd0tleURvd24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmliZSB0byBDVFJMIGtleSBkb3duIHRvIGFjdGl2YXRlIHRoZSBkcmF3IGNvbnRyb2xcclxuICAgKi9cclxuICBwcml2YXRlIHN1YnNjcmliZVRvRHJhd0tleURvd24oKSB7XHJcbiAgICB0aGlzLmRyYXdLZXlEb3duJCQgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdrZXlkb3duJykuc3Vic2NyaWJlKChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSAhPT0gMTcpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICB0aGlzLnVuc3Vic2NyaWJlVG9EcmF3S2V5RG93bigpO1xyXG5cclxuICAgICAgY29uc3Qgb2xHZW9tZXRyeSA9IHRoaXMuZ2V0T2xHZW9tZXRyeSgpO1xyXG4gICAgICBpZiAoIW9sR2VvbWV0cnkgfHwgIShvbEdlb21ldHJ5IGluc3RhbmNlb2YgT2xQb2x5Z29uKSkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgIHRoaXMuc3Vic2NyaWJlVG9EcmF3S2V5VXAoKTtcclxuXHJcbiAgICAgIHRoaXMuZGVhY3RpdmF0ZU1vZGlmeUludGVyYWN0aW9uKCk7XHJcbiAgICAgIHRoaXMuZGVhY3RpdmF0ZVRyYW5zbGF0ZUludGVyYWN0aW9uKCk7XHJcbiAgICAgIHRoaXMuYWN0aXZhdGVEcmF3SW50ZXJhY3Rpb24oKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaWJlIHRvIENUUkwga2V5IHVwIHRvIGRlYWN0aXZhdGUgdGhlIGRyYXcgY29udHJvbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9EcmF3S2V5VXAoKSB7XHJcbiAgICB0aGlzLmRyYXdLZXlVcCQkID0gZnJvbUV2ZW50KGRvY3VtZW50LCAna2V5dXAnKVxyXG4gICAgICAuc3Vic2NyaWJlKChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlICE9PSAxNykge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZVRvRHJhd0tleVVwKCk7XHJcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZVRvS2V5RG93bigpO1xyXG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZURyYXdJbnRlcmFjdGlvbigpO1xyXG5cclxuICAgICAgICB0aGlzLmFjdGl2YXRlTW9kaWZ5SW50ZXJhY3Rpb24oKTtcclxuICAgICAgICB0aGlzLmFjdGl2YXRlVHJhbnNsYXRlSW50ZXJhY3Rpb24oKTtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZVRvRHJhd0tleURvd24oKTtcclxuXHJcbiAgICAgICAgdGhpcy5lbmQkLm5leHQodGhpcy5nZXRPbEdlb21ldHJ5KCkpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuc3Vic2NyaWJlIHRvIGRyYXcga2V5IGRvd25cclxuICAgKi9cclxuICBwcml2YXRlIHVuc3Vic2NyaWJlVG9EcmF3S2V5RG93bigpIHtcclxuICAgIGlmICh0aGlzLmRyYXdLZXlEb3duJCQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmRyYXdLZXlEb3duJCQudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuc3Vic2NyaWJlIHRvIGtleSB1cFxyXG4gICAqL1xyXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVUb0RyYXdLZXlVcCgpIHtcclxuICAgIGlmICh0aGlzLmRyYXdLZXlVcCQkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5kcmF3S2V5VXAkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIHRoZSBkcmF3IGludGVyYWN0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZW1vdmVPbERyYXdJbnRlcmFjdGlvbigpIHtcclxuICAgIGlmICh0aGlzLm9sRHJhd0ludGVyYWN0aW9uID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudW5zdWJzY3JpYmVUb0tleURvd24oKTtcclxuICAgIHRoaXMudW5zdWJzY3JpYmVUb0RyYXdLZXlVcCgpO1xyXG4gICAgdGhpcy51bnN1YnNjcmliZVRvRHJhd0tleURvd24oKTtcclxuICAgIHRoaXMuZGVhY3RpdmF0ZURyYXdJbnRlcmFjdGlvbigpO1xyXG4gICAgdGhpcy5vbERyYXdJbnRlcmFjdGlvbiA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjdGl2YXRlIHRoZSBkcmF3IGludGVyYWN0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhY3RpdmF0ZURyYXdJbnRlcmFjdGlvbigpIHtcclxuICAgIGlmICh0aGlzLm9sRHJhd0ludGVyYWN0aW9uSXNBY3RpdmUgPT09IHRydWUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2xlYXJPbExpbmVhclJpbmdzU291cmNlKCk7XHJcbiAgICB0aGlzLmFkZE9sTGluZWFyUmluZ3NMYXllcigpO1xyXG5cclxuICAgIHRoaXMub2xNYXAuZ2V0SW50ZXJhY3Rpb25zKCkuZm9yRWFjaCgob2xJbnRlcmFjdGlvbjogT2xJbnRlcmFjdGlvbikgPT4ge1xyXG4gICAgICBpZiAob2xJbnRlcmFjdGlvbiBpbnN0YW5jZW9mIE9sRHJhZ0JveEludGVyYWN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5vbE1hcC5yZW1vdmVJbnRlcmFjdGlvbihvbEludGVyYWN0aW9uKTtcclxuICAgICAgICB0aGlzLnJlbW92ZWRPbEludGVyYWN0aW9ucy5wdXNoKG9sSW50ZXJhY3Rpb24pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm9sRHJhd0ludGVyYWN0aW9uSXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5vbkRyYXdTdGFydEtleSA9IHRoaXMub2xEcmF3SW50ZXJhY3Rpb25cclxuICAgICAgLm9uKCdkcmF3c3RhcnQnLCAoZXZlbnQ6IE9sRHJhd0V2ZW50KSA9PiB0aGlzLm9uRHJhd1N0YXJ0KGV2ZW50KSk7XHJcbiAgICB0aGlzLm9uRHJhd0VuZEtleSA9IHRoaXMub2xEcmF3SW50ZXJhY3Rpb25cclxuICAgICAgLm9uKCdkcmF3ZW5kJywgKGV2ZW50OiBPbERyYXdFdmVudCkgPT4gdGhpcy5vbkRyYXdFbmQoZXZlbnQpKTtcclxuICAgIHRoaXMub2xNYXAuYWRkSW50ZXJhY3Rpb24odGhpcy5vbERyYXdJbnRlcmFjdGlvbik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWFjdGl2YXRlIHRoZSBkcmF3IGludGVyYWN0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkZWFjdGl2YXRlRHJhd0ludGVyYWN0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMub2xEcmF3SW50ZXJhY3Rpb25Jc0FjdGl2ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVtb3ZlT2xMaW5lYXJSaW5nc0xheWVyKCk7XHJcblxyXG4gICAgdGhpcy5yZW1vdmVkT2xJbnRlcmFjdGlvbnMuZm9yRWFjaCgob2xJbnRlcmFjdGlvbjogT2xJbnRlcmFjdGlvbikgPT4ge1xyXG4gICAgICB0aGlzLm9sTWFwLmFkZEludGVyYWN0aW9uKG9sSW50ZXJhY3Rpb24pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5vbERyYXdJbnRlcmFjdGlvbklzQWN0aXZlID0gZmFsc2U7XHJcbiAgICB1bkJ5S2V5KHRoaXMub25EcmF3U3RhcnRLZXkpO1xyXG4gICAgdW5CeUtleSh0aGlzLm9uRHJhd0VuZEtleSk7XHJcbiAgICBpZiAodGhpcy5vbE1hcCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2xNYXAucmVtb3ZlSW50ZXJhY3Rpb24odGhpcy5vbERyYXdJbnRlcmFjdGlvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGRyYXcgc3RhcnQsIGFkZCBhIG5ldyBsaW5lcmFyIHJpbmcgdG8gdGhlIGdlb21ldHJ5IGFuZCBzdGFydCB3YXRjaGluZyBmb3IgY2hhbmdlc1xyXG4gICAqIEBwYXJhbSBldmVudCBEcmF3IHN0YXJ0IGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkRyYXdTdGFydChldmVudDogT2xEcmF3RXZlbnQpIHtcclxuICAgIGNvbnN0IG9sR2VvbWV0cnkgPSBldmVudC5mZWF0dXJlLmdldEdlb21ldHJ5KCk7XHJcbiAgICB0aGlzLm9sT3V0ZXJHZW9tZXRyeSA9IHRoaXMuZ2V0T2xHZW9tZXRyeSgpLmNsb25lKCk7XHJcblxyXG4gICAgY29uc3QgbGluZWFyUmluZ0Nvb3JkaW5hdGVzID0gb2xHZW9tZXRyeS5nZXRMaW5lYXJSaW5nKCkuZ2V0Q29vcmRpbmF0ZXMoKTtcclxuICAgIHRoaXMuYWRkTGluZWFyUmluZ1RvT2xHZW9tZXRyeShsaW5lYXJSaW5nQ29vcmRpbmF0ZXMpO1xyXG4gICAgdGhpcy5zdGFydCQubmV4dCh0aGlzLmdldE9sR2VvbWV0cnkoKSk7XHJcblxyXG4gICAgdGhpcy5vbkRyYXdLZXkgPSBvbEdlb21ldHJ5Lm9uKCdjaGFuZ2UnLCAob2xHZW9tZXRyeUV2ZW50OiBPbEdlb21ldHJ5RXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgX2xpbmVhclJpbmdDb29yZGluYXRlcyA9IG9sR2VvbWV0cnlFdmVudC50YXJnZXQuZ2V0TGluZWFyUmluZygpLmdldENvb3JkaW5hdGVzKCk7XHJcbiAgICAgIHRoaXMudXBkYXRlTGluZWFyUmluZ09mT2xHZW9tZXRyeShfbGluZWFyUmluZ0Nvb3JkaW5hdGVzKTtcclxuICAgICAgdGhpcy5jaGFuZ2VzJC5uZXh0KHRoaXMuZ2V0T2xHZW9tZXRyeSgpKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zdWJzY3JpYmVUb0tleURvd24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdHJhbnNsYXRpb24gZW5kcywgdXBkYXRlIHRoZSBnZW9tZXRyeSBvYnNlcnZhYmxlIGFuZCBzdG9wIHdhdGNoaWduIGZvciBjaGFuZ2VzXHJcbiAgICogQHBhcmFtIGV2ZW50IERyYXcgZW5kIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkRyYXdFbmQoZXZlbnQ6IE9sRHJhd0V2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5vbkRyYXdLZXkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB1bkJ5S2V5KHRoaXMub25EcmF3S2V5KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9sT3V0ZXJHZW9tZXRyeSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICBjb25zdCBsaW5lYXJSaW5nQ29vcmRpbmF0ZXMgPSBldmVudC5mZWF0dXJlLmdldEdlb21ldHJ5KCkuZ2V0TGluZWFyUmluZygpLmdldENvb3JkaW5hdGVzKCk7XHJcbiAgICB0aGlzLnVwZGF0ZUxpbmVhclJpbmdPZk9sR2VvbWV0cnkobGluZWFyUmluZ0Nvb3JkaW5hdGVzKTtcclxuICAgIHRoaXMuY2xlYXJPbExpbmVhclJpbmdzU291cmNlKCk7XHJcbiAgICB0aGlzLmVuZCQubmV4dCh0aGlzLmdldE9sR2VvbWV0cnkoKSk7XHJcbiAgICB0aGlzLnVuc3Vic2NyaWJlVG9LZXlEb3duKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYSBsaW5lYXIgcmluZyB0byB0aGUgZ2VvbWV0cnkgYmVpbmcgbW9kaWZpZWRcclxuICAgKiBAcGFyYW0gY29vcmRpbmF0ZXMgTGluZWFyIHJpbmcgY29vcmRpbmF0ZXNcclxuICAgKi9cclxuICBwcml2YXRlIGFkZExpbmVhclJpbmdUb09sR2VvbWV0cnkoY29vcmRpbmF0ZXM6IG51bWJlcltdKSB7XHJcbiAgICBjb25zdCBvbEdlb21ldHJ5ID0gdGhpcy5nZXRPbEdlb21ldHJ5KCk7XHJcbiAgICBjb25zdCBvbExpbmVhclJpbmcgPSBuZXcgT2xMaW5lYXJSaW5nKGNvb3JkaW5hdGVzKTtcclxuICAgIGFkZExpbmVhclJpbmdUb09sUG9seWdvbihvbEdlb21ldHJ5LCBvbExpbmVhclJpbmcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHRoZSBsYXN0IGxpbmVhciByaW5nIG9mIHRoZSBnZW9tZXRyeSBiZWluZyBtb2RpZmllZFxyXG4gICAqIEBwYXJhbSBjb29yZGluYXRlcyBMaW5lYXIgcmluZyBjb29yZGluYXRlc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgdXBkYXRlTGluZWFyUmluZ09mT2xHZW9tZXRyeShjb29yZGluYXRlczogbnVtYmVyW10pIHtcclxuICAgIGNvbnN0IG9sR2VvbWV0cnkgPSB0aGlzLmdldE9sR2VvbWV0cnkoKTtcclxuICAgIC8vIFJlbW92ZSB0aGUgbGFzdCBsaW5lYXIgcmluZyAodGhlIG9uZSB3ZSBhcmUgdXBkYXRpbmcpXHJcbiAgICBjb25zdCBvbExpbmVhclJpbmdzID0gb2xHZW9tZXRyeS5nZXRMaW5lYXJSaW5ncygpLnNsaWNlKDAsIC0xKTtcclxuICAgIGNvbnN0IG5ld0Nvb3JkaW5hdGVzID0gb2xMaW5lYXJSaW5ncy5tYXAoKG9sTGluZWFyUmluZzogT2xMaW5lYXJSaW5nKSA9PiB7XHJcbiAgICAgIHJldHVybiBvbExpbmVhclJpbmcuZ2V0Q29vcmRpbmF0ZXMoKTtcclxuICAgIH0pO1xyXG4gICAgbmV3Q29vcmRpbmF0ZXMucHVzaChjb29yZGluYXRlcyk7XHJcbiAgICBvbEdlb21ldHJ5LnNldENvb3JkaW5hdGVzKG5ld0Nvb3JkaW5hdGVzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgZ2VvbWV0cnkgYmVpbmcgbW9kaWZpZWRcclxuICAgKiBAcmV0dXJucyBPTCBHZW9tZXRyeVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0T2xHZW9tZXRyeSgpOiBPbEdlb21ldHJ5IHtcclxuICAgIGNvbnN0IG9sRmVhdHVyZXMgPSB0aGlzLm9sT3ZlcmxheVNvdXJjZS5nZXRGZWF0dXJlcygpO1xyXG4gICAgcmV0dXJuIG9sRmVhdHVyZXMubGVuZ3RoID4gMCA/IG9sRmVhdHVyZXNbMF0uZ2V0R2VvbWV0cnkoKSA6IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==