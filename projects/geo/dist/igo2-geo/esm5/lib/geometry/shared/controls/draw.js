/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import OlVectorSource from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';
import OlDraw from 'ol/interaction/Draw';
import { unByKey } from 'ol/Observable';
import { Subject, fromEvent, BehaviorSubject } from 'rxjs';
import { getMousePositionFromOlGeometryEvent } from '../geometry.utils';
/**
 * @record
 */
export function DrawControlOptions() { }
if (false) {
    /** @type {?} */
    DrawControlOptions.prototype.geometryType;
    /** @type {?|undefined} */
    DrawControlOptions.prototype.source;
    /** @type {?|undefined} */
    DrawControlOptions.prototype.layer;
    /** @type {?|undefined} */
    DrawControlOptions.prototype.layerStyle;
    /** @type {?|undefined} */
    DrawControlOptions.prototype.drawStyle;
    /** @type {?|undefined} */
    DrawControlOptions.prototype.maxPoints;
}
/**
 * Control to draw geometries
 */
var /**
 * Control to draw geometries
 */
DrawControl = /** @class */ (function () {
    function DrawControl(options) {
        this.options = options;
        /**
         * Draw start observable
         */
        this.start$ = new Subject();
        /**
         * Draw end observable
         */
        this.end$ = new Subject();
        /**
         * Geometry changes observable
         */
        this.changes$ = new Subject();
        this.freehand$ = new BehaviorSubject(false);
        if (options.layer !== undefined) {
            this.olOverlayLayer = options.layer;
        }
        else {
            this.olOverlayLayer = this.createOlInnerOverlayLayer();
        }
    }
    Object.defineProperty(DrawControl.prototype, "active", {
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
    Object.defineProperty(DrawControl.prototype, "geometryType", {
        /**
         * Geometry type
         * @internal
         */
        get: /**
         * Geometry type
         * \@internal
         * @return {?}
         */
        function () {
            return this.options.geometryType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawControl.prototype, "olOverlaySource", {
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
    /**
     * Add or remove this control to/from a map.
     * @param map OL Map
     */
    /**
     * Add or remove this control to/from a map.
     * @param {?} olMap
     * @return {?}
     */
    DrawControl.prototype.setOlMap = /**
     * Add or remove this control to/from a map.
     * @param {?} olMap
     * @return {?}
     */
    function (olMap) {
        if (olMap === undefined) {
            this.clearOlInnerOverlaySource();
            this.removeOlInnerOverlayLayer();
            this.removeOlDrawInteraction();
            this.olMap = olMap;
            return;
        }
        this.olMap = olMap;
        this.addOlInnerOverlayLayer();
        this.addOlDrawInteraction();
    };
    /**
     * Return the overlay source
     */
    /**
     * Return the overlay source
     * @return {?}
     */
    DrawControl.prototype.getSource = /**
     * Return the overlay source
     * @return {?}
     */
    function () {
        return this.olOverlaySource;
    };
    /**
     * Create an overlay source if none is defined in the options
     */
    /**
     * Create an overlay source if none is defined in the options
     * @private
     * @return {?}
     */
    DrawControl.prototype.createOlInnerOverlayLayer = /**
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
     * Clear the overlay layer if it wasn't defined in the options
     */
    /**
     * Clear the overlay layer if it wasn't defined in the options
     * @private
     * @return {?}
     */
    DrawControl.prototype.removeOlInnerOverlayLayer = /**
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
     * Add the overlay layer if it wasn't defined in the options
     */
    /**
     * Add the overlay layer if it wasn't defined in the options
     * @private
     * @return {?}
     */
    DrawControl.prototype.addOlInnerOverlayLayer = /**
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
     * Clear the overlay source if it wasn't defined in the options
     */
    /**
     * Clear the overlay source if it wasn't defined in the options
     * @private
     * @return {?}
     */
    DrawControl.prototype.clearOlInnerOverlaySource = /**
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
     * Add a draw interaction to the map an set up some listeners
     */
    /**
     * Add a draw interaction to the map an set up some listeners
     * @return {?}
     */
    DrawControl.prototype.addOlDrawInteraction = /**
     * Add a draw interaction to the map an set up some listeners
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var olDrawInteraction;
        if (this.freehand$.getValue() === false) {
            olDrawInteraction = new OlDraw({
                type: this.geometryType,
                source: this.getSource(),
                stopClick: true,
                style: this.options.drawStyle,
                maxPoints: this.options.maxPoints,
                freehand: false,
                freehandCondition: (/**
                 * @return {?}
                 */
                function () { return false; })
            });
        }
        else {
            if (this.geometryType === 'Point') {
                olDrawInteraction = new OlDraw({
                    type: 'Circle',
                    source: this.getSource(),
                    maxPoints: this.options.maxPoints,
                    freehand: true
                });
            }
            else {
                olDrawInteraction = new OlDraw({
                    type: this.geometryType,
                    source: this.getSource(),
                    maxPoints: this.options.maxPoints,
                    freehand: true
                });
            }
        }
        this.onDrawStartKey = olDrawInteraction
            .on('drawstart', (/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.onDrawStart(event); }));
        this.onDrawEndKey = olDrawInteraction
            .on('drawend', (/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.onDrawEnd(event); }));
        this.olMap.addInteraction(olDrawInteraction);
        this.olDrawInteraction = olDrawInteraction;
    };
    /**
     * Remove the draw interaction
     */
    /**
     * Remove the draw interaction
     * @private
     * @return {?}
     */
    DrawControl.prototype.removeOlDrawInteraction = /**
     * Remove the draw interaction
     * @private
     * @return {?}
     */
    function () {
        if (this.olDrawInteraction === undefined) {
            return;
        }
        this.unsubscribeToKeyDown();
        unByKey(this.onDrawStartKey);
        unByKey(this.onDrawEndKey);
        if (this.olMap !== undefined) {
            this.olMap.removeInteraction(this.olDrawInteraction);
        }
        this.olDrawInteraction = undefined;
    };
    /**
     * When drawing starts, clear the overlay and start watching from changes
     * @param event Draw start event
     */
    /**
     * When drawing starts, clear the overlay and start watching from changes
     * @private
     * @param {?} event Draw start event
     * @return {?}
     */
    DrawControl.prototype.onDrawStart = /**
     * When drawing starts, clear the overlay and start watching from changes
     * @private
     * @param {?} event Draw start event
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
        var olGeometry = event.feature.getGeometry();
        this.start$.next(olGeometry);
        this.clearOlInnerOverlaySource();
        this.onChangesKey = olGeometry.on('change', (/**
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
     * When drawing ends, update the geometry observable and start watching from changes
     * @param event Draw end event
     */
    /**
     * When drawing ends, update the geometry observable and start watching from changes
     * @private
     * @param {?} event Draw end event
     * @return {?}
     */
    DrawControl.prototype.onDrawEnd = /**
     * When drawing ends, update the geometry observable and start watching from changes
     * @private
     * @param {?} event Draw end event
     * @return {?}
     */
    function (event) {
        this.unsubscribeToKeyDown();
        if (this.onChangesKey !== undefined) {
            unByKey(this.onChangesKey);
        }
        this.end$.next(event.feature.getGeometry());
    };
    /**
     * Subscribe to CTRL key down to activate the draw control
     */
    /**
     * Subscribe to CTRL key down to activate the draw control
     * @private
     * @return {?}
     */
    DrawControl.prototype.subscribeToKeyDown = /**
     * Subscribe to CTRL key down to activate the draw control
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.unsubscribeToKeyDown();
        this.keyDown$$ = fromEvent(document, 'keydown').subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            // On ESC key down, remove the last vertex
            if (event.keyCode === 27) {
                _this.olDrawInteraction.removeLastPoint();
                return;
            }
            // On space bar, pan to the current mouse position
            if (event.keyCode === 32) {
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
    DrawControl.prototype.unsubscribeToKeyDown = /**
     * Unsubscribe to key down
     * @private
     * @return {?}
     */
    function () {
        if (this.keyDown$$ !== undefined) {
            this.keyDown$$.unsubscribe();
            this.keyDown$$ = undefined;
        }
    };
    return DrawControl;
}());
/**
 * Control to draw geometries
 */
export { DrawControl };
if (false) {
    /**
     * Draw start observable
     * @type {?}
     */
    DrawControl.prototype.start$;
    /**
     * Draw end observable
     * @type {?}
     */
    DrawControl.prototype.end$;
    /**
     * Geometry changes observable
     * @type {?}
     */
    DrawControl.prototype.changes$;
    /**
     * @type {?}
     * @private
     */
    DrawControl.prototype.olMap;
    /**
     * @type {?}
     * @private
     */
    DrawControl.prototype.olOverlayLayer;
    /**
     * @type {?}
     * @private
     */
    DrawControl.prototype.olDrawInteraction;
    /**
     * @type {?}
     * @private
     */
    DrawControl.prototype.onDrawStartKey;
    /**
     * @type {?}
     * @private
     */
    DrawControl.prototype.onDrawEndKey;
    /**
     * @type {?}
     * @private
     */
    DrawControl.prototype.onChangesKey;
    /**
     * @type {?}
     * @private
     */
    DrawControl.prototype.mousePosition;
    /**
     * @type {?}
     * @private
     */
    DrawControl.prototype.keyDown$$;
    /** @type {?} */
    DrawControl.prototype.freehand$;
    /**
     * @type {?}
     * @private
     */
    DrawControl.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhdy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9nZW9tZXRyeS9zaGFyZWQvY29udHJvbHMvZHJhdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBSUEsT0FBTyxjQUFjLE1BQU0sa0JBQWtCLENBQUM7QUFDOUMsT0FBTyxhQUFhLE1BQU0saUJBQWlCLENBQUM7QUFDNUMsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFNekMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV4QyxPQUFPLEVBQUUsT0FBTyxFQUFnQixTQUFTLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXpFLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7O0FBRXhFLHdDQU9DOzs7SUFOQywwQ0FBNkI7O0lBQzdCLG9DQUF3Qjs7SUFDeEIsbUNBQXNCOztJQUN0Qix3Q0FBMkQ7O0lBQzNELHVDQUEwRDs7SUFDMUQsdUNBQW1COzs7OztBQU1yQjs7OztJQXFERSxxQkFBb0IsT0FBMkI7UUFBM0IsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7Ozs7UUFoRHhDLFdBQU0sR0FBd0IsSUFBSSxPQUFPLEVBQUUsQ0FBQzs7OztRQUs1QyxTQUFJLEdBQXdCLElBQUksT0FBTyxFQUFFLENBQUM7Ozs7UUFLMUMsYUFBUSxHQUF3QixJQUFJLE9BQU8sRUFBRSxDQUFDO1FBYXJELGNBQVMsR0FBNkIsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUEwQi9ELElBQUksT0FBTyxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1NBQ3JDO2FBQU07WUFDTCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1NBQ3hEO0lBQ0gsQ0FBQztJQTFCRCxzQkFBSSwrQkFBTTtRQUhW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NU9DLDZCQUFtRDs7Ozs7SUFLbkQsMkJBQWlEOzs7OztJQUtqRCwrQkFBcUQ7Ozs7O0lBRXJELDRCQUFxQjs7Ozs7SUFDckIscUNBQXNDOzs7OztJQUN0Qyx3Q0FBa0M7Ozs7O0lBQ2xDLHFDQUErQjs7Ozs7SUFDL0IsbUNBQTZCOzs7OztJQUM3QixtQ0FBNkI7Ozs7O0lBRTdCLG9DQUF3Qzs7Ozs7SUFFeEMsZ0NBQWdDOztJQUVoQyxnQ0FBaUU7Ozs7O0lBeUJyRCw4QkFBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgT2xNYXAgZnJvbSAnb2wvTWFwJztcclxuaW1wb3J0IE9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuaW1wb3J0IE9sU3R5bGUgZnJvbSAnb2wvc3R5bGUnO1xyXG5pbXBvcnQgT2xHZW9tZXRyeVR5cGUgZnJvbSAnb2wvZ2VvbS9HZW9tZXRyeVR5cGUnO1xyXG5pbXBvcnQgT2xWZWN0b3JTb3VyY2UgZnJvbSAnb2wvc291cmNlL1ZlY3Rvcic7XHJcbmltcG9ydCBPbFZlY3RvckxheWVyIGZyb20gJ29sL2xheWVyL1ZlY3Rvcic7XHJcbmltcG9ydCBPbERyYXcgZnJvbSAnb2wvaW50ZXJhY3Rpb24vRHJhdyc7XHJcbmltcG9ydCB7XHJcbiAgR2VvbWV0cnkgYXMgT2xHZW9tZXRyeSxcclxuICBHZW9tZXRyeUV2ZW50IGFzIE9sR2VvbWV0cnlFdmVudFxyXG59IGZyb20gJ29sL2dlb20vR2VvbWV0cnknO1xyXG5pbXBvcnQgeyBEcmF3RXZlbnQgYXMgT2xEcmF3RXZlbnQgfSBmcm9tICdvbC9pbnRlcmFjdGlvbi9EcmF3JztcclxuaW1wb3J0IHsgdW5CeUtleSB9IGZyb20gJ29sL09ic2VydmFibGUnO1xyXG5cclxuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uLCBmcm9tRXZlbnQsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgZ2V0TW91c2VQb3NpdGlvbkZyb21PbEdlb21ldHJ5RXZlbnQgfSBmcm9tICcuLi9nZW9tZXRyeS51dGlscyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERyYXdDb250cm9sT3B0aW9ucyB7XHJcbiAgZ2VvbWV0cnlUeXBlOiBPbEdlb21ldHJ5VHlwZTtcclxuICBzb3VyY2U/OiBPbFZlY3RvclNvdXJjZTtcclxuICBsYXllcj86IE9sVmVjdG9yTGF5ZXI7XHJcbiAgbGF5ZXJTdHlsZT86IE9sU3R5bGUgfCAoKG9sZmVhdHVyZTogT2xGZWF0dXJlKSA9PiBPbFN0eWxlKTtcclxuICBkcmF3U3R5bGU/OiBPbFN0eWxlIHwgKChvbGZlYXR1cmU6IE9sRmVhdHVyZSkgPT4gT2xTdHlsZSk7XHJcbiAgbWF4UG9pbnRzPzogbnVtYmVyO1xyXG59XHJcblxyXG4vKipcclxuICogQ29udHJvbCB0byBkcmF3IGdlb21ldHJpZXNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBEcmF3Q29udHJvbCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIERyYXcgc3RhcnQgb2JzZXJ2YWJsZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGFydCQ6IFN1YmplY3Q8T2xHZW9tZXRyeT4gPSBuZXcgU3ViamVjdCgpO1xyXG5cclxuICAvKipcclxuICAgKiBEcmF3IGVuZCBvYnNlcnZhYmxlXHJcbiAgICovXHJcbiAgcHVibGljIGVuZCQ6IFN1YmplY3Q8T2xHZW9tZXRyeT4gPSBuZXcgU3ViamVjdCgpO1xyXG5cclxuICAvKipcclxuICAgKiBHZW9tZXRyeSBjaGFuZ2VzIG9ic2VydmFibGVcclxuICAgKi9cclxuICBwdWJsaWMgY2hhbmdlcyQ6IFN1YmplY3Q8T2xHZW9tZXRyeT4gPSBuZXcgU3ViamVjdCgpO1xyXG5cclxuICBwcml2YXRlIG9sTWFwOiBPbE1hcDtcclxuICBwcml2YXRlIG9sT3ZlcmxheUxheWVyOiBPbFZlY3RvckxheWVyO1xyXG4gIHByaXZhdGUgb2xEcmF3SW50ZXJhY3Rpb246IE9sRHJhdztcclxuICBwcml2YXRlIG9uRHJhd1N0YXJ0S2V5OiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBvbkRyYXdFbmRLZXk6IHN0cmluZztcclxuICBwcml2YXRlIG9uQ2hhbmdlc0tleTogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIG1vdXNlUG9zaXRpb246IFtudW1iZXIsIG51bWJlcl07XHJcblxyXG4gIHByaXZhdGUga2V5RG93biQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGZyZWVoYW5kJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRlciB0aGUgY29udHJvbCBpcyBhY3RpdmVcclxuICAgKi9cclxuICBnZXQgYWN0aXZlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMub2xNYXAgIT09IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdlb21ldHJ5IHR5cGVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgZ2VvbWV0cnlUeXBlKCk6IE9sR2VvbWV0cnlUeXBlIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZ2VvbWV0cnlUeXBlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT0wgb3ZlcmxheSBzb3VyY2VcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgb2xPdmVybGF5U291cmNlKCk6IE9sVmVjdG9yU291cmNlIHtcclxuICAgIHJldHVybiB0aGlzLm9sT3ZlcmxheUxheWVyLmdldFNvdXJjZSgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBvcHRpb25zOiBEcmF3Q29udHJvbE9wdGlvbnMpIHtcclxuICAgIGlmIChvcHRpb25zLmxheWVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbE92ZXJsYXlMYXllciA9IG9wdGlvbnMubGF5ZXI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm9sT3ZlcmxheUxheWVyID0gdGhpcy5jcmVhdGVPbElubmVyT3ZlcmxheUxheWVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgb3IgcmVtb3ZlIHRoaXMgY29udHJvbCB0by9mcm9tIGEgbWFwLlxyXG4gICAqIEBwYXJhbSBtYXAgT0wgTWFwXHJcbiAgICovXHJcbiAgc2V0T2xNYXAob2xNYXA6IE9sTWFwIHwgdW5kZWZpbmVkKSB7XHJcbiAgICBpZiAob2xNYXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmNsZWFyT2xJbm5lck92ZXJsYXlTb3VyY2UoKTtcclxuICAgICAgdGhpcy5yZW1vdmVPbElubmVyT3ZlcmxheUxheWVyKCk7XHJcbiAgICAgIHRoaXMucmVtb3ZlT2xEcmF3SW50ZXJhY3Rpb24oKTtcclxuICAgICAgdGhpcy5vbE1hcCA9IG9sTWFwO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vbE1hcCA9IG9sTWFwO1xyXG4gICAgdGhpcy5hZGRPbElubmVyT3ZlcmxheUxheWVyKCk7XHJcbiAgICB0aGlzLmFkZE9sRHJhd0ludGVyYWN0aW9uKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gdGhlIG92ZXJsYXkgc291cmNlXHJcbiAgICovXHJcbiAgZ2V0U291cmNlKCk6IE9sVmVjdG9yU291cmNlIHtcclxuICAgIHJldHVybiB0aGlzLm9sT3ZlcmxheVNvdXJjZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhbiBvdmVybGF5IHNvdXJjZSBpZiBub25lIGlzIGRlZmluZWQgaW4gdGhlIG9wdGlvbnNcclxuICAgKi9cclxuICBwcml2YXRlIGNyZWF0ZU9sSW5uZXJPdmVybGF5TGF5ZXIoKTogT2xWZWN0b3JMYXllciB7XHJcbiAgICByZXR1cm4gbmV3IE9sVmVjdG9yTGF5ZXIoe1xyXG4gICAgICBzb3VyY2U6IHRoaXMub3B0aW9ucy5zb3VyY2UgPyB0aGlzLm9wdGlvbnMuc291cmNlIDogbmV3IE9sVmVjdG9yU291cmNlKCksXHJcbiAgICAgIHN0eWxlOiB0aGlzLm9wdGlvbnMubGF5ZXJTdHlsZSxcclxuICAgICAgekluZGV4OiA1MDBcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhlIG92ZXJsYXkgbGF5ZXIgaWYgaXQgd2Fzbid0IGRlZmluZWQgaW4gdGhlIG9wdGlvbnNcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZU9sSW5uZXJPdmVybGF5TGF5ZXIoKSB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmxheWVyID09PSB1bmRlZmluZWQgJiYgdGhpcy5vbE1hcCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2xNYXAucmVtb3ZlTGF5ZXIodGhpcy5vbE92ZXJsYXlMYXllcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgdGhlIG92ZXJsYXkgbGF5ZXIgaWYgaXQgd2Fzbid0IGRlZmluZWQgaW4gdGhlIG9wdGlvbnNcclxuICAgKi9cclxuICBwcml2YXRlIGFkZE9sSW5uZXJPdmVybGF5TGF5ZXIoKTogT2xWZWN0b3JMYXllciB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmxheWVyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbE1hcC5hZGRMYXllcih0aGlzLm9sT3ZlcmxheUxheWVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBvdmVybGF5IHNvdXJjZSBpZiBpdCB3YXNuJ3QgZGVmaW5lZCBpbiB0aGUgb3B0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgY2xlYXJPbElubmVyT3ZlcmxheVNvdXJjZSgpIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMubGF5ZXIgPT09IHVuZGVmaW5lZCAmJiB0aGlzLm9wdGlvbnMuc291cmNlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbE92ZXJsYXlTb3VyY2UuY2xlYXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhIGRyYXcgaW50ZXJhY3Rpb24gdG8gdGhlIG1hcCBhbiBzZXQgdXAgc29tZSBsaXN0ZW5lcnNcclxuICAgKi9cclxuICBhZGRPbERyYXdJbnRlcmFjdGlvbigpIHtcclxuICAgIGxldCBvbERyYXdJbnRlcmFjdGlvbjtcclxuICAgIGlmICh0aGlzLmZyZWVoYW5kJC5nZXRWYWx1ZSgpID09PSBmYWxzZSkge1xyXG4gICAgICBvbERyYXdJbnRlcmFjdGlvbiA9IG5ldyBPbERyYXcoe1xyXG4gICAgICAgIHR5cGU6IHRoaXMuZ2VvbWV0cnlUeXBlLFxyXG4gICAgICAgIHNvdXJjZTogdGhpcy5nZXRTb3VyY2UoKSxcclxuICAgICAgICBzdG9wQ2xpY2s6IHRydWUsXHJcbiAgICAgICAgc3R5bGU6IHRoaXMub3B0aW9ucy5kcmF3U3R5bGUsXHJcbiAgICAgICAgbWF4UG9pbnRzOiB0aGlzLm9wdGlvbnMubWF4UG9pbnRzLFxyXG4gICAgICAgIGZyZWVoYW5kOiBmYWxzZSxcclxuICAgICAgICBmcmVlaGFuZENvbmRpdGlvbjogKCkgPT4gZmFsc2VcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5nZW9tZXRyeVR5cGUgPT09ICdQb2ludCcpIHtcclxuICAgICAgICBvbERyYXdJbnRlcmFjdGlvbiA9IG5ldyBPbERyYXcoe1xyXG4gICAgICAgICAgdHlwZTogJ0NpcmNsZScsXHJcbiAgICAgICAgICBzb3VyY2U6IHRoaXMuZ2V0U291cmNlKCksXHJcbiAgICAgICAgICBtYXhQb2ludHM6IHRoaXMub3B0aW9ucy5tYXhQb2ludHMsXHJcbiAgICAgICAgICBmcmVlaGFuZDogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG9sRHJhd0ludGVyYWN0aW9uID0gbmV3IE9sRHJhdyh7XHJcbiAgICAgICAgICB0eXBlOiB0aGlzLmdlb21ldHJ5VHlwZSxcclxuICAgICAgICAgIHNvdXJjZTogdGhpcy5nZXRTb3VyY2UoKSxcclxuICAgICAgICAgIG1heFBvaW50czogdGhpcy5vcHRpb25zLm1heFBvaW50cyxcclxuICAgICAgICAgIGZyZWVoYW5kOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9uRHJhd1N0YXJ0S2V5ID0gb2xEcmF3SW50ZXJhY3Rpb25cclxuICAgICAgLm9uKCdkcmF3c3RhcnQnLCAoZXZlbnQ6IE9sRHJhd0V2ZW50KSA9PiB0aGlzLm9uRHJhd1N0YXJ0KGV2ZW50KSk7XHJcbiAgICB0aGlzLm9uRHJhd0VuZEtleSA9IG9sRHJhd0ludGVyYWN0aW9uXHJcbiAgICAgIC5vbignZHJhd2VuZCcsIChldmVudDogT2xEcmF3RXZlbnQpID0+IHRoaXMub25EcmF3RW5kKGV2ZW50KSk7XHJcbiAgICB0aGlzLm9sTWFwLmFkZEludGVyYWN0aW9uKG9sRHJhd0ludGVyYWN0aW9uKTtcclxuICAgIHRoaXMub2xEcmF3SW50ZXJhY3Rpb24gPSBvbERyYXdJbnRlcmFjdGlvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSB0aGUgZHJhdyBpbnRlcmFjdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlT2xEcmF3SW50ZXJhY3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5vbERyYXdJbnRlcmFjdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVuc3Vic2NyaWJlVG9LZXlEb3duKCk7XHJcbiAgICB1bkJ5S2V5KHRoaXMub25EcmF3U3RhcnRLZXkpO1xyXG4gICAgdW5CeUtleSh0aGlzLm9uRHJhd0VuZEtleSk7XHJcbiAgICBpZiAodGhpcy5vbE1hcCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2xNYXAucmVtb3ZlSW50ZXJhY3Rpb24odGhpcy5vbERyYXdJbnRlcmFjdGlvbik7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9sRHJhd0ludGVyYWN0aW9uID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBkcmF3aW5nIHN0YXJ0cywgY2xlYXIgdGhlIG92ZXJsYXkgYW5kIHN0YXJ0IHdhdGNoaW5nIGZyb20gY2hhbmdlc1xyXG4gICAqIEBwYXJhbSBldmVudCBEcmF3IHN0YXJ0IGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkRyYXdTdGFydChldmVudDogT2xEcmF3RXZlbnQpIHtcclxuICAgIGNvbnN0IG9sR2VvbWV0cnkgPSBldmVudC5mZWF0dXJlLmdldEdlb21ldHJ5KCk7XHJcbiAgICB0aGlzLnN0YXJ0JC5uZXh0KG9sR2VvbWV0cnkpO1xyXG4gICAgdGhpcy5jbGVhck9sSW5uZXJPdmVybGF5U291cmNlKCk7XHJcbiAgICB0aGlzLm9uQ2hhbmdlc0tleSA9IG9sR2VvbWV0cnkub24oJ2NoYW5nZScsIChvbEdlb21ldHJ5RXZlbnQ6IE9sR2VvbWV0cnlFdmVudCkgPT4ge1xyXG4gICAgICB0aGlzLm1vdXNlUG9zaXRpb24gPSBnZXRNb3VzZVBvc2l0aW9uRnJvbU9sR2VvbWV0cnlFdmVudChvbEdlb21ldHJ5RXZlbnQpO1xyXG4gICAgICB0aGlzLmNoYW5nZXMkLm5leHQob2xHZW9tZXRyeUV2ZW50LnRhcmdldCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc3Vic2NyaWJlVG9LZXlEb3duKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGRyYXdpbmcgZW5kcywgdXBkYXRlIHRoZSBnZW9tZXRyeSBvYnNlcnZhYmxlIGFuZCBzdGFydCB3YXRjaGluZyBmcm9tIGNoYW5nZXNcclxuICAgKiBAcGFyYW0gZXZlbnQgRHJhdyBlbmQgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uRHJhd0VuZChldmVudDogT2xEcmF3RXZlbnQpIHtcclxuICAgIHRoaXMudW5zdWJzY3JpYmVUb0tleURvd24oKTtcclxuICAgIGlmICh0aGlzLm9uQ2hhbmdlc0tleSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHVuQnlLZXkodGhpcy5vbkNoYW5nZXNLZXkpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5lbmQkLm5leHQoZXZlbnQuZmVhdHVyZS5nZXRHZW9tZXRyeSgpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmliZSB0byBDVFJMIGtleSBkb3duIHRvIGFjdGl2YXRlIHRoZSBkcmF3IGNvbnRyb2xcclxuICAgKi9cclxuICBwcml2YXRlIHN1YnNjcmliZVRvS2V5RG93bigpIHtcclxuICAgIHRoaXMudW5zdWJzY3JpYmVUb0tleURvd24oKTtcclxuICAgIHRoaXMua2V5RG93biQkID0gZnJvbUV2ZW50KGRvY3VtZW50LCAna2V5ZG93bicpLnN1YnNjcmliZSgoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcclxuICAgICAgLy8gT24gRVNDIGtleSBkb3duLCByZW1vdmUgdGhlIGxhc3QgdmVydGV4XHJcbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAyNykge1xyXG4gICAgICAgIHRoaXMub2xEcmF3SW50ZXJhY3Rpb24ucmVtb3ZlTGFzdFBvaW50KCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBPbiBzcGFjZSBiYXIsIHBhbiB0byB0aGUgY3VycmVudCBtb3VzZSBwb3NpdGlvblxyXG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzIpIHtcclxuICAgICAgICB0aGlzLm9sTWFwLmdldFZpZXcoKS5hbmltYXRlKHtcclxuICAgICAgICAgIGNlbnRlcjogdGhpcy5tb3VzZVBvc2l0aW9uLFxyXG4gICAgICAgICAgZHVyYXRpb246IDBcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5zdWJzY3JpYmUgdG8ga2V5IGRvd25cclxuICAgKi9cclxuICBwcml2YXRlIHVuc3Vic2NyaWJlVG9LZXlEb3duKCkge1xyXG4gICAgaWYgKHRoaXMua2V5RG93biQkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5rZXlEb3duJCQudW5zdWJzY3JpYmUoKTtcclxuICAgICAgdGhpcy5rZXlEb3duJCQgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==