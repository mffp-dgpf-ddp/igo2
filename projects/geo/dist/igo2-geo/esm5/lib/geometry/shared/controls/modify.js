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
            this.olOverlaySource.clear(true);
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
        unByKey([
            this.onModifyStartKey,
            this.onModifyEndKey,
            this.onModifyKey
        ]);
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
        unByKey(this.onModifyKey);
        this.end$.next(event.features.item(0).getGeometry());
        this.unsubscribeToKeyDown();
    };
    /**
     * Subscribe to space key down to pan the map
     */
    /**
     * Subscribe to space key down to pan the map
     * @private
     * @return {?}
     */
    ModifyControl.prototype.subscribeToKeyDown = /**
     * Subscribe to space key down to pan the map
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
        unByKey([
            this.onTranslateStartKey,
            this.onTranslateEndKey,
            this.onTranslateKey
        ]);
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
        unByKey(this.onTranslateKey);
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
                /** @type {?} */
                var intersects = olOuterGeometry.intersectsCoordinate(event.coordinate);
                return intersects;
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
            if (_this.translate === true) {
                _this.activateTranslateInteraction();
            }
            _this.subscribeToDrawKeyDown();
            _this.olOuterGeometry = undefined;
            _this.clearOlLinearRingsSource();
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
        this.clearOlLinearRingsSource();
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
            _this.mousePosition = getMousePositionFromOlGeometryEvent(olGeometryEvent);
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
        unByKey(this.onDrawKey);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZ5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2dlb21ldHJ5L3NoYXJlZC9jb250cm9scy9tb2RpZnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sU0FBUyxNQUFNLFlBQVksQ0FBQztBQUVuQyxPQUFPLGNBQWMsTUFBTSxrQkFBa0IsQ0FBQztBQUM5QyxPQUFPLGFBQWEsTUFBTSxpQkFBaUIsQ0FBQztBQUM1QyxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLFNBQVMsTUFBTSxpQkFBaUIsQ0FBQztBQUN4QyxPQUFPLFlBQVksTUFBTSxvQkFBb0IsQ0FBQztBQUU5QyxPQUFPLG9CQUFvQixNQUFNLHdCQUF3QixDQUFDO0FBUzFELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFeEMsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXhELE9BQU8sRUFDTCx3QkFBd0IsRUFDeEIsOEJBQThCLEVBQzlCLG1DQUFtQyxFQUNwQyxNQUFNLG1CQUFtQixDQUFDOzs7O0FBRTNCLDBDQU9DOzs7SUFOQyxzQ0FBd0I7O0lBQ3hCLHFDQUFzQjs7SUFDdEIsMENBQTJEOztJQUMzRCx5Q0FBMEQ7O0lBQzFELHNDQUFpQjs7SUFDakIseUNBQW9COzs7OztBQU10Qjs7OztJQWdGRSx1QkFBb0IsT0FBNkI7UUFBN0IsWUFBTyxHQUFQLE9BQU8sQ0FBc0I7Ozs7UUEzRTFDLFdBQU0sR0FBd0IsSUFBSSxPQUFPLEVBQUUsQ0FBQzs7OztRQUs1QyxTQUFJLEdBQXdCLElBQUksT0FBTyxFQUFFLENBQUM7Ozs7UUFLMUMsYUFBUSxHQUF3QixJQUFJLE9BQU8sRUFBRSxDQUFDO1FBUTdDLGdDQUEyQixHQUFZ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RSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDekUsQ0FBQztJQUVILG9CQUFDO0FBQUQsQ0FBQyxBQW5tQkQsSUFtbUJDOzs7Ozs7Ozs7O0lBOWxCQywrQkFBbUQ7Ozs7O0lBS25ELDZCQUFpRDs7Ozs7SUFLakQsaUNBQXFEOzs7OztJQUVyRCw4QkFBcUI7Ozs7O0lBQ3JCLHVDQUFzQzs7SUFDdEMsNENBQXFDOzs7OztJQUNyQyx5Q0FBaUM7Ozs7O0lBQ2pDLHVDQUErQjs7Ozs7SUFDL0Isb0NBQTRCOzs7OztJQUM1QixvREFBcUQ7Ozs7O0lBQ3JELCtDQUE0Qzs7Ozs7SUFDNUMsNENBQW9DOzs7OztJQUNwQywwQ0FBa0M7Ozs7O0lBQ2xDLHVDQUErQjs7Ozs7SUFDL0IsdURBQXdEOzs7OztJQUN4RCwwQ0FBdUM7Ozs7O0lBQ3ZDLHVDQUErQjs7Ozs7SUFDL0IscUNBQTZCOzs7OztJQUM3QixrQ0FBMEI7Ozs7O0lBQzFCLGtEQUFtRDs7Ozs7SUFFbkQsc0NBQXdDOzs7OztJQUV4QyxrQ0FBZ0M7Ozs7O0lBQ2hDLG9DQUFrQzs7Ozs7SUFDbEMsc0NBQW9DOzs7OztJQUVwQyw4Q0FBb0Q7Ozs7O0lBQ3BELDJDQUEwQzs7Ozs7SUFHMUMsd0NBQW9DOzs7Ozs7SUE0QnBDLCtCQUErQjs7Ozs7O0lBSy9CLGtDQUFrQzs7Ozs7SUFFdEIsZ0NBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE9sTWFwIGZyb20gJ29sL01hcCc7XHJcbmltcG9ydCBPbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCBPbFN0eWxlIGZyb20gJ29sL3N0eWxlJztcclxuaW1wb3J0IE9sVmVjdG9yU291cmNlIGZyb20gJ29sL3NvdXJjZS9WZWN0b3InO1xyXG5pbXBvcnQgT2xWZWN0b3JMYXllciBmcm9tICdvbC9sYXllci9WZWN0b3InO1xyXG5pbXBvcnQgT2xNb2RpZnkgZnJvbSAnb2wvaW50ZXJhY3Rpb24vTW9kaWZ5JztcclxuaW1wb3J0IE9sVHJhbnNsYXRlIGZyb20gJ29sL2ludGVyYWN0aW9uL1RyYW5zbGF0ZSc7XHJcbmltcG9ydCBPbERyYXcgZnJvbSAnb2wvaW50ZXJhY3Rpb24vRHJhdyc7XHJcbmltcG9ydCBPbFBvbHlnb24gZnJvbSAnb2wvZ2VvbS9Qb2x5Z29uJztcclxuaW1wb3J0IE9sTGluZWFyUmluZyBmcm9tICdvbC9nZW9tL0xpbmVhclJpbmcnO1xyXG5pbXBvcnQgT2xJbnRlcmFjdGlvbiBmcm9tICdvbC9pbnRlcmFjdGlvbi9JbnRlcmFjdGlvbic7XHJcbmltcG9ydCBPbERyYWdCb3hJbnRlcmFjdGlvbiBmcm9tICdvbC9pbnRlcmFjdGlvbi9EcmFnQm94JztcclxuaW1wb3J0IHsgTWFwQnJvd3NlckV2ZW50IGFzIE9sTWFwQnJvd3NlckV2ZW50IH0gZnJvbSAnb2wvTWFwQnJvd3NlckV2ZW50JztcclxuaW1wb3J0IHtcclxuICBHZW9tZXRyeSBhcyBPbEdlb21ldHJ5LFxyXG4gIEdlb21ldHJ5RXZlbnQgYXMgT2xHZW9tZXRyeUV2ZW50XHJcbn0gZnJvbSAnb2wvZ2VvbS9HZW9tZXRyeSc7XHJcbmltcG9ydCB7IE1vZGlmeUV2ZW50IGFzIE9sTW9kaWZ5RXZlbnQgfSBmcm9tICdvbC9pbnRlcmFjdGlvbi9Nb2RpZnknO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVFdmVudCBhcyBPbFRyYW5zbGF0ZUV2ZW50IH0gZnJvbSAnb2wvaW50ZXJhY3Rpb24vVHJhbnNsYXRlJztcclxuaW1wb3J0IHsgRHJhd0V2ZW50IGFzIE9sRHJhd0V2ZW50IH0gZnJvbSAnb2wvaW50ZXJhY3Rpb24vRHJhdyc7XHJcbmltcG9ydCB7IHVuQnlLZXkgfSBmcm9tICdvbC9PYnNlcnZhYmxlJztcclxuXHJcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiwgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gIGFkZExpbmVhclJpbmdUb09sUG9seWdvbixcclxuICBjcmVhdGVEcmF3SG9sZUludGVyYWN0aW9uU3R5bGUsXHJcbiAgZ2V0TW91c2VQb3NpdGlvbkZyb21PbEdlb21ldHJ5RXZlbnRcclxufSBmcm9tICcuLi9nZW9tZXRyeS51dGlscyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1vZGlmeUNvbnRyb2xPcHRpb25zIHtcclxuICBzb3VyY2U/OiBPbFZlY3RvclNvdXJjZTtcclxuICBsYXllcj86IE9sVmVjdG9yTGF5ZXI7XHJcbiAgbGF5ZXJTdHlsZT86IE9sU3R5bGUgfCAoKG9sZmVhdHVyZTogT2xGZWF0dXJlKSA9PiBPbFN0eWxlKTtcclxuICBkcmF3U3R5bGU/OiBPbFN0eWxlIHwgKChvbGZlYXR1cmU6IE9sRmVhdHVyZSkgPT4gT2xTdHlsZSk7XHJcbiAgbW9kaWZ5PzogYm9vbGVhbjtcclxuICB0cmFuc2xhdGU/OiBib29sZWFuO1xyXG59XHJcblxyXG4vKipcclxuICogQ29udHJvbCB0byBtb2RpZnkgZ2VvbWV0cmllc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1vZGlmeUNvbnRyb2wge1xyXG5cclxuICAvKipcclxuICAgKiBNb2RpZnkgc3RhcnQgb2JzZXJ2YWJsZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGFydCQ6IFN1YmplY3Q8T2xHZW9tZXRyeT4gPSBuZXcgU3ViamVjdCgpO1xyXG5cclxuICAvKipcclxuICAgKiBNb2RpZnkgZW5kIG9ic2VydmFibGVcclxuICAgKi9cclxuICBwdWJsaWMgZW5kJDogU3ViamVjdDxPbEdlb21ldHJ5PiA9IG5ldyBTdWJqZWN0KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEdlb21ldHJ5IGNoYW5nZXMgb2JzZXJ2YWJsZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBjaGFuZ2VzJDogU3ViamVjdDxPbEdlb21ldHJ5PiA9IG5ldyBTdWJqZWN0KCk7XHJcblxyXG4gIHByaXZhdGUgb2xNYXA6IE9sTWFwO1xyXG4gIHByaXZhdGUgb2xPdmVybGF5TGF5ZXI6IE9sVmVjdG9yTGF5ZXI7XHJcbiAgcHVibGljIG9sTW9kaWZ5SW50ZXJhY3Rpb246IE9sTW9kaWZ5O1xyXG4gIHByaXZhdGUgb25Nb2RpZnlTdGFydEtleTogc3RyaW5nO1xyXG4gIHByaXZhdGUgb25Nb2RpZnlFbmRLZXk6IHN0cmluZztcclxuICBwcml2YXRlIG9uTW9kaWZ5S2V5OiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBvbE1vZGlmeUludGVyYWN0aW9uSXNBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwcml2YXRlIG9sVHJhbnNsYXRlSW50ZXJhY3Rpb246IE9sVHJhbnNsYXRlO1xyXG4gIHByaXZhdGUgb25UcmFuc2xhdGVTdGFydEtleTogc3RyaW5nO1xyXG4gIHByaXZhdGUgb25UcmFuc2xhdGVFbmRLZXk6IHN0cmluZztcclxuICBwcml2YXRlIG9uVHJhbnNsYXRlS2V5OiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBvbFRyYW5zbGF0ZUludGVyYWN0aW9uSXNBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwcml2YXRlIG9sRHJhd0ludGVyYWN0aW9uOiBPbFRyYW5zbGF0ZTtcclxuICBwcml2YXRlIG9uRHJhd1N0YXJ0S2V5OiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBvbkRyYXdFbmRLZXk6IHN0cmluZztcclxuICBwcml2YXRlIG9uRHJhd0tleTogc3RyaW5nO1xyXG4gIHByaXZhdGUgb2xEcmF3SW50ZXJhY3Rpb25Jc0FjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBwcml2YXRlIG1vdXNlUG9zaXRpb246IFtudW1iZXIsIG51bWJlcl07XHJcblxyXG4gIHByaXZhdGUga2V5RG93biQkOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBkcmF3S2V5VXAkJDogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgZHJhd0tleURvd24kJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBwcml2YXRlIHJlbW92ZWRPbEludGVyYWN0aW9uczogT2xJbnRlcmFjdGlvbltdID0gW107XHJcbiAgcHJpdmF0ZSBvbExpbmVhclJpbmdzTGF5ZXI6IE9sVmVjdG9yTGF5ZXI7XHJcblxyXG4gIC8vIFRoaXMgaXMgdGhlIGdlb21ldHJ5IHRvIHRlc3QgYWdhaW5zdCB3aGVuIGRyYXdpbmcgaG9sZXNcclxuICBwcml2YXRlIG9sT3V0ZXJHZW9tZXRyeTogT2xHZW9tZXRyeTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGVyIHRoZSBjb250cm9sIGlzIGFjdGl2ZVxyXG4gICAqL1xyXG4gIGdldCBhY3RpdmUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5vbE1hcCAhPT0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT0wgb3ZlcmxheSBzb3VyY2VcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgb2xPdmVybGF5U291cmNlKCk6IE9sVmVjdG9yU291cmNlIHtcclxuICAgIHJldHVybiB0aGlzLm9sT3ZlcmxheUxheWVyLmdldFNvdXJjZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT0wgbGluZWFyIHJpbmdzIHNvdXJjZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBvbExpbmVhclJpbmdzU291cmNlKCk6IE9sVmVjdG9yU291cmNlIHtcclxuICAgIHJldHVybiB0aGlzLm9sTGluZWFyUmluZ3NMYXllci5nZXRTb3VyY2UoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgYSBtb2RpZnkgY29udHJvbCBzaG91bGQgYmUgYXZhaWxhYmxlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBtb2RpZnk6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGEgdHJhbnNsYXRlIGNvbnRyb2wgc2hvdWxkIGJlIGF2YWlsYWJsZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgdHJhbnNsYXRlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBvcHRpb25zOiBNb2RpZnlDb250cm9sT3B0aW9ucykge1xyXG4gICAgaWYgKG9wdGlvbnMubW9kaWZ5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5tb2RpZnkgPSBvcHRpb25zLm1vZGlmeTtcclxuICAgIH1cclxuICAgIGlmIChvcHRpb25zLnRyYW5zbGF0ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMudHJhbnNsYXRlID0gb3B0aW9ucy50cmFuc2xhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9wdGlvbnMubGF5ZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9sT3ZlcmxheUxheWVyID0gb3B0aW9ucy5sYXllcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub2xPdmVybGF5TGF5ZXIgPSB0aGlzLmNyZWF0ZU9sSW5uZXJPdmVybGF5TGF5ZXIoKTtcclxuICAgIH1cclxuICAgIHRoaXMub2xMaW5lYXJSaW5nc0xheWVyID0gdGhpcy5jcmVhdGVPbExpbmVhclJpbmdzTGF5ZXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBvciByZW1vdmUgdGhpcyBjb250cm9sIHRvL2Zyb20gYSBtYXAuXHJcbiAgICogQHBhcmFtIG1hcCBPTCBNYXBcclxuICAgKi9cclxuICBzZXRPbE1hcChvbE1hcDogT2xNYXAgfCB1bmRlZmluZWQpIHtcclxuICAgIGlmIChvbE1hcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuY2xlYXJPbElubmVyT3ZlcmxheVNvdXJjZSgpO1xyXG4gICAgICB0aGlzLnJlbW92ZU9sSW5uZXJPdmVybGF5TGF5ZXIoKTtcclxuICAgICAgdGhpcy5yZW1vdmVPbE1vZGlmeUludGVyYWN0aW9uKCk7XHJcbiAgICAgIHRoaXMucmVtb3ZlT2xUcmFuc2xhdGVJbnRlcmFjdGlvbigpO1xyXG4gICAgICB0aGlzLnJlbW92ZU9sRHJhd0ludGVyYWN0aW9uKCk7XHJcbiAgICAgIHRoaXMub2xNYXAgPSBvbE1hcDtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub2xNYXAgPSBvbE1hcDtcclxuICAgIHRoaXMuYWRkT2xJbm5lck92ZXJsYXlMYXllcigpO1xyXG5cclxuICAgIC8vIFRoZSBvcmRlciBpbiB3aGljaCB0aGVzZSBpbnRlcmFjdGlvbnNcclxuICAgIC8vIGFyZSBhZGRlZCBpcyBpbXBvcnRhbnRcclxuICAgIGlmICh0aGlzLm1vZGlmeSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmFkZE9sRHJhd0ludGVyYWN0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMudHJhbnNsYXRlID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuYWRkT2xUcmFuc2xhdGVJbnRlcmFjdGlvbigpO1xyXG4gICAgICB0aGlzLmFjdGl2YXRlVHJhbnNsYXRlSW50ZXJhY3Rpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5tb2RpZnkgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5hZGRPbE1vZGlmeUludGVyYWN0aW9uKCk7XHJcbiAgICAgIHRoaXMuYWN0aXZhdGVNb2RpZnlJbnRlcmFjdGlvbigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIHRoZSBvdmVybGF5IHNvdXJjZVxyXG4gICAqL1xyXG4gIGdldFNvdXJjZSgpOiBPbFZlY3RvclNvdXJjZSB7XHJcbiAgICByZXR1cm4gdGhpcy5vbE92ZXJsYXlTb3VyY2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYW4gT0wgZ2VvbWV0cnkgdG8gdGhlIG92ZXJsYXkgYW5kIHN0YXJ0IG1vZGlmeWluZyBpdFxyXG4gICAqIEBwYXJhbSBvbEdlb21ldHJ5IE9sIEdlb21ldHJ5XHJcbiAgICovXHJcbiAgc2V0T2xHZW9tZXRyeShvbEdlb21ldHJ5OiBPbEdlb21ldHJ5KSB7XHJcbiAgICBjb25zdCBvbEZlYXR1cmUgPSBuZXcgT2xGZWF0dXJlKHtnZW9tZXRyeTogb2xHZW9tZXRyeX0pO1xyXG4gICAgdGhpcy5vbE92ZXJsYXlTb3VyY2UuY2xlYXIoKTtcclxuICAgIHRoaXMub2xPdmVybGF5U291cmNlLmFkZEZlYXR1cmUob2xGZWF0dXJlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhbiBvdmVybGF5IHNvdXJjZSBpZiBub25lIGlzIGRlZmluZWQgaW4gdGhlIG9wdGlvbnNcclxuICAgKi9cclxuICBwcml2YXRlIGNyZWF0ZU9sSW5uZXJPdmVybGF5TGF5ZXIoKTogT2xWZWN0b3JMYXllciB7XHJcbiAgICByZXR1cm4gbmV3IE9sVmVjdG9yTGF5ZXIoe1xyXG4gICAgICBzb3VyY2U6IHRoaXMub3B0aW9ucy5zb3VyY2UgPyB0aGlzLm9wdGlvbnMuc291cmNlIDogbmV3IE9sVmVjdG9yU291cmNlKCksXHJcbiAgICAgIHN0eWxlOiB0aGlzLm9wdGlvbnMubGF5ZXJTdHlsZSxcclxuICAgICAgekluZGV4OiA1MDBcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIHRoZSBvdmVybGF5IGxheWVyIGlmIGl0IHdhc24ndCBkZWZpbmVkIGluIHRoZSBvcHRpb25zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRPbElubmVyT3ZlcmxheUxheWVyKCk6IE9sVmVjdG9yTGF5ZXIge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5sYXllciA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2xNYXAuYWRkTGF5ZXIodGhpcy5vbE92ZXJsYXlMYXllcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgb3ZlcmxheSBsYXllciBpZiBpdCB3YXNuJ3QgZGVmaW5lZCBpbiB0aGUgb3B0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlT2xJbm5lck92ZXJsYXlMYXllcigpIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMubGF5ZXIgPT09IHVuZGVmaW5lZCAmJiB0aGlzLm9sTWFwICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbE1hcC5yZW1vdmVMYXllcih0aGlzLm9sT3ZlcmxheUxheWVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBvdmVybGF5IHNvdXJjZSBpZiBpdCB3YXNuJ3QgZGVmaW5lZCBpbiB0aGUgb3B0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgY2xlYXJPbElubmVyT3ZlcmxheVNvdXJjZSgpIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMubGF5ZXIgPT09IHVuZGVmaW5lZCAmJiB0aGlzLm9wdGlvbnMuc291cmNlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbE92ZXJsYXlTb3VyY2UuY2xlYXIodHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZU9sTGluZWFyUmluZ3NMYXllcigpOiBPbFZlY3RvckxheWVyIHtcclxuICAgIHJldHVybiBuZXcgT2xWZWN0b3JMYXllcih7XHJcbiAgICAgIHNvdXJjZTogbmV3IE9sVmVjdG9yU291cmNlKCksXHJcbiAgICAgIHN0eWxlOiBjcmVhdGVEcmF3SG9sZUludGVyYWN0aW9uU3R5bGUoKSxcclxuICAgICAgekluZGV4OiA1MDBcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIHRoZSBsaW5lYXIgcmluZ3MgbGF5ZXJcclxuICAgKi9cclxuICBwcml2YXRlIGFkZE9sTGluZWFyUmluZ3NMYXllcigpIHtcclxuICAgIHRoaXMub2xNYXAuYWRkTGF5ZXIodGhpcy5vbExpbmVhclJpbmdzTGF5ZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhlIGxpbmVhciByaW5ncyBsYXllclxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlT2xMaW5lYXJSaW5nc0xheWVyKCkge1xyXG4gICAgdGhpcy5vbE1hcC5yZW1vdmVMYXllcih0aGlzLm9sTGluZWFyUmluZ3NMYXllcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgbGluZWFyIHJpbmdzIHNvdXJjZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgY2xlYXJPbExpbmVhclJpbmdzU291cmNlKCkge1xyXG4gICAgdGhpcy5vbExpbmVhclJpbmdzU291cmNlLmNsZWFyKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGEgbW9kaWZ5IGludGVyYWN0aW9uIHRvIHRoZSBtYXAgYW4gc2V0IHVwIHNvbWUgbGlzdGVuZXJzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRPbE1vZGlmeUludGVyYWN0aW9uKCkge1xyXG4gICAgY29uc3Qgb2xNb2RpZnlJbnRlcmFjdGlvbiA9IG5ldyBPbE1vZGlmeSh7XHJcbiAgICAgIHNvdXJjZTogdGhpcy5vbE92ZXJsYXlTb3VyY2UsXHJcbiAgICAgIHN0eWxlOiB0aGlzLm9wdGlvbnMuZHJhd1N0eWxlXHJcbiAgICB9KTtcclxuICAgIHRoaXMub2xNb2RpZnlJbnRlcmFjdGlvbiA9IG9sTW9kaWZ5SW50ZXJhY3Rpb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgdGhlIG1vZGlmeSBpbnRlcmFjdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlT2xNb2RpZnlJbnRlcmFjdGlvbigpIHtcclxuICAgIGlmICh0aGlzLm9sTW9kaWZ5SW50ZXJhY3Rpb24gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kZWFjdGl2YXRlTW9kaWZ5SW50ZXJhY3Rpb24oKTtcclxuICAgIHRoaXMub2xNb2RpZnlJbnRlcmFjdGlvbiA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWN0aXZhdGVNb2RpZnlJbnRlcmFjdGlvbigpIHtcclxuICAgIGlmICh0aGlzLm9sTW9kaWZ5SW50ZXJhY3Rpb25Jc0FjdGl2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vbE1vZGlmeUludGVyYWN0aW9uSXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5vbk1vZGlmeVN0YXJ0S2V5ID0gdGhpcy5vbE1vZGlmeUludGVyYWN0aW9uXHJcbiAgICAgIC5vbignbW9kaWZ5c3RhcnQnLCAoZXZlbnQ6IE9sTW9kaWZ5RXZlbnQpID0+IHRoaXMub25Nb2RpZnlTdGFydChldmVudCkpO1xyXG4gICAgdGhpcy5vbk1vZGlmeUVuZEtleSA9IHRoaXMub2xNb2RpZnlJbnRlcmFjdGlvblxyXG4gICAgICAub24oJ21vZGlmeWVuZCcsIChldmVudDogT2xNb2RpZnlFdmVudCkgPT4gdGhpcy5vbk1vZGlmeUVuZChldmVudCkpO1xyXG4gICAgdGhpcy5vbE1hcC5hZGRJbnRlcmFjdGlvbih0aGlzLm9sTW9kaWZ5SW50ZXJhY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkZWFjdGl2YXRlTW9kaWZ5SW50ZXJhY3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5vbE1vZGlmeUludGVyYWN0aW9uSXNBY3RpdmUgPT09IGZhbHNlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9sTW9kaWZ5SW50ZXJhY3Rpb25Jc0FjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgIHVuQnlLZXkoW1xyXG4gICAgICB0aGlzLm9uTW9kaWZ5U3RhcnRLZXksXHJcbiAgICAgIHRoaXMub25Nb2RpZnlFbmRLZXksXHJcbiAgICAgIHRoaXMub25Nb2RpZnlLZXlcclxuICAgIF0pO1xyXG4gICAgaWYgKHRoaXMub2xNYXAgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9sTWFwLnJlbW92ZUludGVyYWN0aW9uKHRoaXMub2xNb2RpZnlJbnRlcmFjdGlvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIG1vZGlmeWluZyBzdGFydHMsIGNsZWFyIHRoZSBvdmVybGF5IGFuZCBzdGFydCB3YXRjaGluZyBmb3IgY2hhbmdlc1xyXG4gICAqIEBwYXJhbSBldmVudCBNb2RpZnkgc3RhcnQgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uTW9kaWZ5U3RhcnQoZXZlbnQ6IE9sTW9kaWZ5RXZlbnQpIHtcclxuICAgIGNvbnN0IG9sR2VvbWV0cnkgPSBldmVudC5mZWF0dXJlcy5pdGVtKDApLmdldEdlb21ldHJ5KCk7XHJcbiAgICB0aGlzLnN0YXJ0JC5uZXh0KG9sR2VvbWV0cnkpO1xyXG4gICAgdGhpcy5vbk1vZGlmeUtleSA9IG9sR2VvbWV0cnkub24oJ2NoYW5nZScsIChvbEdlb21ldHJ5RXZlbnQ6IE9sR2VvbWV0cnlFdmVudCkgPT4ge1xyXG4gICAgICB0aGlzLm1vdXNlUG9zaXRpb24gPSBnZXRNb3VzZVBvc2l0aW9uRnJvbU9sR2VvbWV0cnlFdmVudChvbEdlb21ldHJ5RXZlbnQpO1xyXG4gICAgICB0aGlzLmNoYW5nZXMkLm5leHQob2xHZW9tZXRyeUV2ZW50LnRhcmdldCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc3Vic2NyaWJlVG9LZXlEb3duKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIG1vZGlmeWluZyBlbmRzLCB1cGRhdGUgdGhlIGdlb21ldHJ5IG9ic2VydmFibGUgYW5kIHN0b3Agd2F0Y2hpbmcgZm9yIGNoYW5nZXNcclxuICAgKiBAcGFyYW0gZXZlbnQgTW9kaWZ5IGVuZCBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25Nb2RpZnlFbmQoZXZlbnQ6IE9sTW9kaWZ5RXZlbnQpIHtcclxuICAgIHVuQnlLZXkodGhpcy5vbk1vZGlmeUtleSk7XHJcbiAgICB0aGlzLmVuZCQubmV4dChldmVudC5mZWF0dXJlcy5pdGVtKDApLmdldEdlb21ldHJ5KCkpO1xyXG4gICAgdGhpcy51bnN1YnNjcmliZVRvS2V5RG93bigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaWJlIHRvIHNwYWNlIGtleSBkb3duIHRvIHBhbiB0aGUgbWFwXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb0tleURvd24oKSB7XHJcbiAgICB0aGlzLmtleURvd24kJCA9IGZyb21FdmVudChkb2N1bWVudCwgJ2tleWRvd24nKS5zdWJzY3JpYmUoKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzMikge1xyXG4gICAgICAgIC8vIE9uIHNwYWNlIGJhciwgcGFuIHRvIHRoZSBjdXJyZW50IG1vdXNlIHBvc2l0aW9uXHJcbiAgICAgICAgdGhpcy5vbE1hcC5nZXRWaWV3KCkuYW5pbWF0ZSh7XHJcbiAgICAgICAgICBjZW50ZXI6IHRoaXMubW91c2VQb3NpdGlvbixcclxuICAgICAgICAgIGR1cmF0aW9uOiAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuc3Vic2NyaWJlIHRvIGtleSBkb3duXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1bnN1YnNjcmliZVRvS2V5RG93bigpIHtcclxuICAgIGlmICh0aGlzLmtleURvd24kJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMua2V5RG93biQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYSB0cmFuc2xhdGUgaW50ZXJhY3Rpb24gdG8gdGhlIG1hcCBhbiBzZXQgdXAgc29tZSBsaXN0ZW5lcnNcclxuICAgKi9cclxuICBwcml2YXRlIGFkZE9sVHJhbnNsYXRlSW50ZXJhY3Rpb24oKSB7XHJcbiAgICBjb25zdCBvbFRyYW5zbGF0ZUludGVyYWN0aW9uID0gbmV3IE9sVHJhbnNsYXRlKHtcclxuICAgICAgbGF5ZXJzOiBbdGhpcy5vbE92ZXJsYXlMYXllcl1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5vbFRyYW5zbGF0ZUludGVyYWN0aW9uID0gb2xUcmFuc2xhdGVJbnRlcmFjdGlvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSB0aGUgdHJhbnNsYXRlIGludGVyYWN0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZW1vdmVPbFRyYW5zbGF0ZUludGVyYWN0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMub2xUcmFuc2xhdGVJbnRlcmFjdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRlYWN0aXZhdGVUcmFuc2xhdGVJbnRlcmFjdGlvbigpO1xyXG4gICAgdGhpcy5vbFRyYW5zbGF0ZUludGVyYWN0aW9uID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhY3RpdmF0ZVRyYW5zbGF0ZUludGVyYWN0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMub2xUcmFuc2xhdGVJbnRlcmFjdGlvbklzQWN0aXZlID09PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9sVHJhbnNsYXRlSW50ZXJhY3Rpb25Jc0FjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLm9uVHJhbnNsYXRlU3RhcnRLZXkgPSB0aGlzLm9sVHJhbnNsYXRlSW50ZXJhY3Rpb25cclxuICAgICAgLm9uKCd0cmFuc2xhdGVzdGFydCcsIChldmVudDogT2xUcmFuc2xhdGVFdmVudCkgPT4gdGhpcy5vblRyYW5zbGF0ZVN0YXJ0KGV2ZW50KSk7XHJcbiAgICB0aGlzLm9uVHJhbnNsYXRlRW5kS2V5ID0gdGhpcy5vbFRyYW5zbGF0ZUludGVyYWN0aW9uXHJcbiAgICAgIC5vbigndHJhbnNsYXRlZW5kJywgKGV2ZW50OiBPbFRyYW5zbGF0ZUV2ZW50KSA9PiB0aGlzLm9uVHJhbnNsYXRlRW5kKGV2ZW50KSk7XHJcbiAgICB0aGlzLm9sTWFwLmFkZEludGVyYWN0aW9uKHRoaXMub2xUcmFuc2xhdGVJbnRlcmFjdGlvbik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRlYWN0aXZhdGVUcmFuc2xhdGVJbnRlcmFjdGlvbigpIHtcclxuICAgIGlmICh0aGlzLm9sVHJhbnNsYXRlSW50ZXJhY3Rpb25Jc0FjdGl2ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub2xUcmFuc2xhdGVJbnRlcmFjdGlvbklzQWN0aXZlID0gZmFsc2U7XHJcbiAgICB1bkJ5S2V5KFtcclxuICAgICAgdGhpcy5vblRyYW5zbGF0ZVN0YXJ0S2V5LFxyXG4gICAgICB0aGlzLm9uVHJhbnNsYXRlRW5kS2V5LFxyXG4gICAgICB0aGlzLm9uVHJhbnNsYXRlS2V5XHJcbiAgICBdKTtcclxuICAgIGlmICh0aGlzLm9sTWFwICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbE1hcC5yZW1vdmVJbnRlcmFjdGlvbih0aGlzLm9sVHJhbnNsYXRlSW50ZXJhY3Rpb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0cmFuc2xhdGlvbiBzdGFydHMsIGNsZWFyIHRoZSBvdmVybGF5IGFuZCBzdGFydCB3YXRjaGluZyBmb3IgY2hhbmdlc1xyXG4gICAqIEBwYXJhbSBldmVudCBUcmFuc2xhdGUgc3RhcnQgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uVHJhbnNsYXRlU3RhcnQoZXZlbnQ6IE9sVHJhbnNsYXRlRXZlbnQpIHtcclxuICAgIGNvbnN0IG9sR2VvbWV0cnkgPSBldmVudC5mZWF0dXJlcy5pdGVtKDApLmdldEdlb21ldHJ5KCk7XHJcbiAgICB0aGlzLnN0YXJ0JC5uZXh0KG9sR2VvbWV0cnkpO1xyXG4gICAgdGhpcy5vblRyYW5zbGF0ZUtleSA9IG9sR2VvbWV0cnkub24oJ2NoYW5nZScsIChvbEdlb21ldHJ5RXZlbnQ6IE9sR2VvbWV0cnlFdmVudCkgPT4ge1xyXG4gICAgICB0aGlzLmNoYW5nZXMkLm5leHQob2xHZW9tZXRyeUV2ZW50LnRhcmdldCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdHJhbnNsYXRpb24gZW5kcywgdXBkYXRlIHRoZSBnZW9tZXRyeSBvYnNlcnZhYmxlIGFuZCBzdG9wIHdhdGNoaWduIGZvciBjaGFuZ2VzXHJcbiAgICogQHBhcmFtIGV2ZW50IFRyYW5zbGF0ZSBlbmQgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uVHJhbnNsYXRlRW5kKGV2ZW50OiBPbFRyYW5zbGF0ZUV2ZW50KSB7XHJcbiAgICB1bkJ5S2V5KHRoaXMub25UcmFuc2xhdGVLZXkpO1xyXG4gICAgdGhpcy5lbmQkLm5leHQoZXZlbnQuZmVhdHVyZXMuaXRlbSgwKS5nZXRHZW9tZXRyeSgpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhIGRyYXcgaW50ZXJhY3Rpb24gdG8gdGhlIG1hcCBhbiBzZXQgdXAgc29tZSBsaXN0ZW5lcnNcclxuICAgKi9cclxuICBwcml2YXRlIGFkZE9sRHJhd0ludGVyYWN0aW9uKCkge1xyXG4gICAgY29uc3Qgb2xEcmF3SW50ZXJhY3Rpb24gPSBuZXcgT2xEcmF3KHtcclxuICAgICAgdHlwZTogJ1BvbHlnb24nLFxyXG4gICAgICBzb3VyY2U6IHRoaXMub2xMaW5lYXJSaW5nc1NvdXJjZSxcclxuICAgICAgc3RvcENsaWNrOiB0cnVlLFxyXG4gICAgICBzdHlsZTogY3JlYXRlRHJhd0hvbGVJbnRlcmFjdGlvblN0eWxlKCksXHJcbiAgICAgIGNvbmRpdGlvbjogKGV2ZW50OiBPbE1hcEJyb3dzZXJFdmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG9sT3V0ZXJHZW9tZXRyeSA9IHRoaXMub2xPdXRlckdlb21ldHJ5IHx8IHRoaXMuZ2V0T2xHZW9tZXRyeSgpO1xyXG4gICAgICAgIGNvbnN0IGludGVyc2VjdHMgPSBvbE91dGVyR2VvbWV0cnkuaW50ZXJzZWN0c0Nvb3JkaW5hdGUoZXZlbnQuY29vcmRpbmF0ZSk7XHJcbiAgICAgICAgcmV0dXJuIGludGVyc2VjdHM7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMub2xEcmF3SW50ZXJhY3Rpb24gPSBvbERyYXdJbnRlcmFjdGlvbjtcclxuICAgIHRoaXMuc3Vic2NyaWJlVG9EcmF3S2V5RG93bigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaWJlIHRvIENUUkwga2V5IGRvd24gdG8gYWN0aXZhdGUgdGhlIGRyYXcgY29udHJvbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9EcmF3S2V5RG93bigpIHtcclxuICAgIHRoaXMuZHJhd0tleURvd24kJCA9IGZyb21FdmVudChkb2N1bWVudCwgJ2tleWRvd24nKS5zdWJzY3JpYmUoKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChldmVudC5rZXlDb2RlICE9PSAxNykgeyByZXR1cm47IH1cclxuXHJcbiAgICAgIHRoaXMudW5zdWJzY3JpYmVUb0RyYXdLZXlEb3duKCk7XHJcblxyXG4gICAgICBjb25zdCBvbEdlb21ldHJ5ID0gdGhpcy5nZXRPbEdlb21ldHJ5KCk7XHJcbiAgICAgIGlmICghb2xHZW9tZXRyeSB8fCAhKG9sR2VvbWV0cnkgaW5zdGFuY2VvZiBPbFBvbHlnb24pKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgdGhpcy5zdWJzY3JpYmVUb0RyYXdLZXlVcCgpO1xyXG5cclxuICAgICAgdGhpcy5kZWFjdGl2YXRlTW9kaWZ5SW50ZXJhY3Rpb24oKTtcclxuICAgICAgdGhpcy5kZWFjdGl2YXRlVHJhbnNsYXRlSW50ZXJhY3Rpb24oKTtcclxuICAgICAgdGhpcy5hY3RpdmF0ZURyYXdJbnRlcmFjdGlvbigpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpYmUgdG8gQ1RSTCBrZXkgdXAgdG8gZGVhY3RpdmF0ZSB0aGUgZHJhdyBjb250cm9sXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb0RyYXdLZXlVcCgpIHtcclxuICAgIHRoaXMuZHJhd0tleVVwJCQgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdrZXl1cCcpXHJcbiAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgIT09IDE3KSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlVG9EcmF3S2V5VXAoKTtcclxuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlVG9LZXlEb3duKCk7XHJcbiAgICAgICAgdGhpcy5kZWFjdGl2YXRlRHJhd0ludGVyYWN0aW9uKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYWN0aXZhdGVNb2RpZnlJbnRlcmFjdGlvbigpO1xyXG4gICAgICAgIGlmICh0aGlzLnRyYW5zbGF0ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgdGhpcy5hY3RpdmF0ZVRyYW5zbGF0ZUludGVyYWN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlVG9EcmF3S2V5RG93bigpO1xyXG5cclxuICAgICAgICB0aGlzLm9sT3V0ZXJHZW9tZXRyeSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmNsZWFyT2xMaW5lYXJSaW5nc1NvdXJjZSgpO1xyXG4gICAgICAgIHRoaXMuZW5kJC5uZXh0KHRoaXMuZ2V0T2xHZW9tZXRyeSgpKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbnN1YnNjcmliZSB0byBkcmF3IGtleSBkb3duXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1bnN1YnNjcmliZVRvRHJhd0tleURvd24oKSB7XHJcbiAgICBpZiAodGhpcy5kcmF3S2V5RG93biQkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5kcmF3S2V5RG93biQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbnN1YnNjcmliZSB0byBrZXkgdXBcclxuICAgKi9cclxuICBwcml2YXRlIHVuc3Vic2NyaWJlVG9EcmF3S2V5VXAoKSB7XHJcbiAgICBpZiAodGhpcy5kcmF3S2V5VXAkJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuZHJhd0tleVVwJCQudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSB0aGUgZHJhdyBpbnRlcmFjdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlT2xEcmF3SW50ZXJhY3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5vbERyYXdJbnRlcmFjdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVuc3Vic2NyaWJlVG9LZXlEb3duKCk7XHJcbiAgICB0aGlzLnVuc3Vic2NyaWJlVG9EcmF3S2V5VXAoKTtcclxuICAgIHRoaXMudW5zdWJzY3JpYmVUb0RyYXdLZXlEb3duKCk7XHJcbiAgICB0aGlzLmRlYWN0aXZhdGVEcmF3SW50ZXJhY3Rpb24oKTtcclxuICAgIHRoaXMuY2xlYXJPbExpbmVhclJpbmdzU291cmNlKCk7XHJcbiAgICB0aGlzLm9sRHJhd0ludGVyYWN0aW9uID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWN0aXZhdGUgdGhlIGRyYXcgaW50ZXJhY3Rpb25cclxuICAgKi9cclxuICBwcml2YXRlIGFjdGl2YXRlRHJhd0ludGVyYWN0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMub2xEcmF3SW50ZXJhY3Rpb25Jc0FjdGl2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jbGVhck9sTGluZWFyUmluZ3NTb3VyY2UoKTtcclxuICAgIHRoaXMuYWRkT2xMaW5lYXJSaW5nc0xheWVyKCk7XHJcblxyXG4gICAgdGhpcy5vbE1hcC5nZXRJbnRlcmFjdGlvbnMoKS5mb3JFYWNoKChvbEludGVyYWN0aW9uOiBPbEludGVyYWN0aW9uKSA9PiB7XHJcbiAgICAgIGlmIChvbEludGVyYWN0aW9uIGluc3RhbmNlb2YgT2xEcmFnQm94SW50ZXJhY3Rpb24pIHtcclxuICAgICAgICB0aGlzLm9sTWFwLnJlbW92ZUludGVyYWN0aW9uKG9sSW50ZXJhY3Rpb24pO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlZE9sSW50ZXJhY3Rpb25zLnB1c2gob2xJbnRlcmFjdGlvbik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMub2xEcmF3SW50ZXJhY3Rpb25Jc0FjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLm9uRHJhd1N0YXJ0S2V5ID0gdGhpcy5vbERyYXdJbnRlcmFjdGlvblxyXG4gICAgICAub24oJ2RyYXdzdGFydCcsIChldmVudDogT2xEcmF3RXZlbnQpID0+IHRoaXMub25EcmF3U3RhcnQoZXZlbnQpKTtcclxuICAgIHRoaXMub25EcmF3RW5kS2V5ID0gdGhpcy5vbERyYXdJbnRlcmFjdGlvblxyXG4gICAgICAub24oJ2RyYXdlbmQnLCAoZXZlbnQ6IE9sRHJhd0V2ZW50KSA9PiB0aGlzLm9uRHJhd0VuZChldmVudCkpO1xyXG4gICAgdGhpcy5vbE1hcC5hZGRJbnRlcmFjdGlvbih0aGlzLm9sRHJhd0ludGVyYWN0aW9uKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlYWN0aXZhdGUgdGhlIGRyYXcgaW50ZXJhY3Rpb25cclxuICAgKi9cclxuICBwcml2YXRlIGRlYWN0aXZhdGVEcmF3SW50ZXJhY3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5vbERyYXdJbnRlcmFjdGlvbklzQWN0aXZlID09PSBmYWxzZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZW1vdmVPbExpbmVhclJpbmdzTGF5ZXIoKTtcclxuXHJcbiAgICB0aGlzLnJlbW92ZWRPbEludGVyYWN0aW9ucy5mb3JFYWNoKChvbEludGVyYWN0aW9uOiBPbEludGVyYWN0aW9uKSA9PiB7XHJcbiAgICAgIHRoaXMub2xNYXAuYWRkSW50ZXJhY3Rpb24ob2xJbnRlcmFjdGlvbik7XHJcbiAgICB9KTtcclxuICAgIHRoaXMucmVtb3ZlZE9sSW50ZXJhY3Rpb25zID0gW107XHJcblxyXG4gICAgdGhpcy5vbERyYXdJbnRlcmFjdGlvbklzQWN0aXZlID0gZmFsc2U7XHJcbiAgICB1bkJ5S2V5KFtcclxuICAgICAgdGhpcy5vbkRyYXdTdGFydEtleSxcclxuICAgICAgdGhpcy5vbkRyYXdFbmRLZXksXHJcbiAgICAgIHRoaXMub25EcmF3S2V5XHJcbiAgICBdKTtcclxuICAgIGlmICh0aGlzLm9sTWFwICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbE1hcC5yZW1vdmVJbnRlcmFjdGlvbih0aGlzLm9sRHJhd0ludGVyYWN0aW9uKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gZHJhdyBzdGFydCwgYWRkIGEgbmV3IGxpbmVyYXIgcmluZyB0byB0aGUgZ2VvbWV0cnkgYW5kIHN0YXJ0IHdhdGNoaW5nIGZvciBjaGFuZ2VzXHJcbiAgICogQHBhcmFtIGV2ZW50IERyYXcgc3RhcnQgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uRHJhd1N0YXJ0KGV2ZW50OiBPbERyYXdFdmVudCkge1xyXG4gICAgY29uc3Qgb2xHZW9tZXRyeSA9IGV2ZW50LmZlYXR1cmUuZ2V0R2VvbWV0cnkoKTtcclxuICAgIHRoaXMub2xPdXRlckdlb21ldHJ5ID0gdGhpcy5nZXRPbEdlb21ldHJ5KCkuY2xvbmUoKTtcclxuXHJcbiAgICBjb25zdCBsaW5lYXJSaW5nQ29vcmRpbmF0ZXMgPSBvbEdlb21ldHJ5LmdldExpbmVhclJpbmcoKS5nZXRDb29yZGluYXRlcygpO1xyXG4gICAgdGhpcy5hZGRMaW5lYXJSaW5nVG9PbEdlb21ldHJ5KGxpbmVhclJpbmdDb29yZGluYXRlcyk7XHJcbiAgICB0aGlzLnN0YXJ0JC5uZXh0KHRoaXMuZ2V0T2xHZW9tZXRyeSgpKTtcclxuXHJcbiAgICB0aGlzLm9uRHJhd0tleSA9IG9sR2VvbWV0cnkub24oJ2NoYW5nZScsIChvbEdlb21ldHJ5RXZlbnQ6IE9sR2VvbWV0cnlFdmVudCkgPT4ge1xyXG4gICAgICB0aGlzLm1vdXNlUG9zaXRpb24gPSBnZXRNb3VzZVBvc2l0aW9uRnJvbU9sR2VvbWV0cnlFdmVudChvbEdlb21ldHJ5RXZlbnQpO1xyXG4gICAgICBjb25zdCBfbGluZWFyUmluZ0Nvb3JkaW5hdGVzID0gb2xHZW9tZXRyeUV2ZW50LnRhcmdldC5nZXRMaW5lYXJSaW5nKCkuZ2V0Q29vcmRpbmF0ZXMoKTtcclxuICAgICAgdGhpcy51cGRhdGVMaW5lYXJSaW5nT2ZPbEdlb21ldHJ5KF9saW5lYXJSaW5nQ29vcmRpbmF0ZXMpO1xyXG4gICAgICB0aGlzLmNoYW5nZXMkLm5leHQodGhpcy5nZXRPbEdlb21ldHJ5KCkpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnN1YnNjcmliZVRvS2V5RG93bigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0cmFuc2xhdGlvbiBlbmRzLCB1cGRhdGUgdGhlIGdlb21ldHJ5IG9ic2VydmFibGUgYW5kIHN0b3Agd2F0Y2hpZ24gZm9yIGNoYW5nZXNcclxuICAgKiBAcGFyYW0gZXZlbnQgRHJhdyBlbmQgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uRHJhd0VuZChldmVudDogT2xEcmF3RXZlbnQpIHtcclxuICAgIHVuQnlLZXkodGhpcy5vbkRyYXdLZXkpO1xyXG4gICAgdGhpcy5vbE91dGVyR2VvbWV0cnkgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgY29uc3QgbGluZWFyUmluZ0Nvb3JkaW5hdGVzID0gZXZlbnQuZmVhdHVyZS5nZXRHZW9tZXRyeSgpLmdldExpbmVhclJpbmcoKS5nZXRDb29yZGluYXRlcygpO1xyXG4gICAgdGhpcy51cGRhdGVMaW5lYXJSaW5nT2ZPbEdlb21ldHJ5KGxpbmVhclJpbmdDb29yZGluYXRlcyk7XHJcbiAgICB0aGlzLmNsZWFyT2xMaW5lYXJSaW5nc1NvdXJjZSgpO1xyXG4gICAgdGhpcy5lbmQkLm5leHQodGhpcy5nZXRPbEdlb21ldHJ5KCkpO1xyXG4gICAgdGhpcy51bnN1YnNjcmliZVRvS2V5RG93bigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGEgbGluZWFyIHJpbmcgdG8gdGhlIGdlb21ldHJ5IGJlaW5nIG1vZGlmaWVkXHJcbiAgICogQHBhcmFtIGNvb3JkaW5hdGVzIExpbmVhciByaW5nIGNvb3JkaW5hdGVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRMaW5lYXJSaW5nVG9PbEdlb21ldHJ5KGNvb3JkaW5hdGVzOiBudW1iZXJbXSkge1xyXG4gICAgY29uc3Qgb2xHZW9tZXRyeSA9IHRoaXMuZ2V0T2xHZW9tZXRyeSgpO1xyXG4gICAgY29uc3Qgb2xMaW5lYXJSaW5nID0gbmV3IE9sTGluZWFyUmluZyhjb29yZGluYXRlcyk7XHJcbiAgICBhZGRMaW5lYXJSaW5nVG9PbFBvbHlnb24ob2xHZW9tZXRyeSwgb2xMaW5lYXJSaW5nKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSB0aGUgbGFzdCBsaW5lYXIgcmluZyBvZiB0aGUgZ2VvbWV0cnkgYmVpbmcgbW9kaWZpZWRcclxuICAgKiBAcGFyYW0gY29vcmRpbmF0ZXMgTGluZWFyIHJpbmcgY29vcmRpbmF0ZXNcclxuICAgKi9cclxuICBwcml2YXRlIHVwZGF0ZUxpbmVhclJpbmdPZk9sR2VvbWV0cnkoY29vcmRpbmF0ZXM6IG51bWJlcltdKSB7XHJcbiAgICBjb25zdCBvbEdlb21ldHJ5ID0gdGhpcy5nZXRPbEdlb21ldHJ5KCk7XHJcbiAgICAvLyBSZW1vdmUgdGhlIGxhc3QgbGluZWFyIHJpbmcgKHRoZSBvbmUgd2UgYXJlIHVwZGF0aW5nKVxyXG4gICAgY29uc3Qgb2xMaW5lYXJSaW5ncyA9IG9sR2VvbWV0cnkuZ2V0TGluZWFyUmluZ3MoKS5zbGljZSgwLCAtMSk7XHJcbiAgICBjb25zdCBuZXdDb29yZGluYXRlcyA9IG9sTGluZWFyUmluZ3MubWFwKChvbExpbmVhclJpbmc6IE9sTGluZWFyUmluZykgPT4ge1xyXG4gICAgICByZXR1cm4gb2xMaW5lYXJSaW5nLmdldENvb3JkaW5hdGVzKCk7XHJcbiAgICB9KTtcclxuICAgIG5ld0Nvb3JkaW5hdGVzLnB1c2goY29vcmRpbmF0ZXMpO1xyXG4gICAgb2xHZW9tZXRyeS5zZXRDb29yZGluYXRlcyhuZXdDb29yZGluYXRlcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGdlb21ldHJ5IGJlaW5nIG1vZGlmaWVkXHJcbiAgICogQHJldHVybnMgT0wgR2VvbWV0cnlcclxuICAgKi9cclxuICBwcml2YXRlIGdldE9sR2VvbWV0cnkoKTogT2xHZW9tZXRyeSB7XHJcbiAgICBjb25zdCBvbEZlYXR1cmVzID0gdGhpcy5vbE92ZXJsYXlTb3VyY2UuZ2V0RmVhdHVyZXMoKTtcclxuICAgIHJldHVybiBvbEZlYXR1cmVzLmxlbmd0aCA+IDAgPyBvbEZlYXR1cmVzWzBdLmdldEdlb21ldHJ5KCkgOiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=