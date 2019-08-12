/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import OlVectorSource from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';
import OlDraw from 'ol/interaction/Draw';
import { unByKey } from 'ol/Observable';
import { Subject, fromEvent } from 'rxjs';
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
     * @private
     * @return {?}
     */
    DrawControl.prototype.addOlDrawInteraction = /**
     * Add a draw interaction to the map an set up some listeners
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var olDrawInteraction = new OlDraw({
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
    DrawControl.prototype.keyDown$$;
    /**
     * @type {?}
     * @private
     */
    DrawControl.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhdy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9nZW9tZXRyeS9zaGFyZWQvY29udHJvbHMvZHJhdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBSUEsT0FBTyxjQUFjLE1BQU0sa0JBQWtCLENBQUM7QUFDOUMsT0FBTyxhQUFhLE1BQU0saUJBQWlCLENBQUM7QUFDNUMsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFNekMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUl4QyxPQUFPLEVBQUUsT0FBTyxFQUFnQixTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7QUFFeEQsd0NBT0M7OztJQU5DLDBDQUE2Qjs7SUFDN0Isb0NBQXdCOztJQUN4QixtQ0FBc0I7O0lBQ3RCLHdDQUEyRDs7SUFDM0QsdUNBQTBEOztJQUMxRCx1Q0FBbUI7Ozs7O0FBTXJCOzs7O0lBaURFLHFCQUFvQixPQUEyQjtRQUEzQixZQUFPLEdBQVAsT0FBTyxDQUFvQjs7OztRQTVDeEMsV0FBTSxHQUF3QixJQUFJLE9BQU8sRUFBRSxDQUFDOzs7O1FBSzVDLFNBQUksR0FBd0IsSUFBSSxPQUFPLEVBQUUsQ0FBQzs7OztRQUsxQyxhQUFRLEdBQXdCLElBQUksT0FBTyxFQUFFLENBQUM7UUFtQ25ELElBQUksT0FBTyxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1NBQ3JDO2FBQU07WUFDTCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1NBQ3hEO0lBQ0gsQ0FBQztJQTFCRCxzQkFBSSwrQkFBTTtRQUhWOztXQUVHOzs7OztRQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQztRQUNsQyxDQUFDOzs7T0FBQTtJQU1ELHNCQUFJLHFDQUFZO1FBSmhCOzs7V0FH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QUM7QUFBRCxDQUFDLEFBL01ELElBK01DOzs7Ozs7Ozs7O0lBMU1DLDZCQUFtRDs7Ozs7SUFLbkQsMkJBQWlEOzs7OztJQUtqRCwrQkFBcUQ7Ozs7O0lBRXJELDRCQUFxQjs7Ozs7SUFDckIscUNBQXNDOzs7OztJQUN0Qyx3Q0FBa0M7Ozs7O0lBQ2xDLHFDQUErQjs7Ozs7SUFDL0IsbUNBQTZCOzs7OztJQUM3QixtQ0FBNkI7Ozs7O0lBRTdCLGdDQUFnQzs7Ozs7SUF5QnBCLDhCQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBPbE1hcCBmcm9tICdvbC9NYXAnO1xyXG5pbXBvcnQgT2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5pbXBvcnQgT2xTdHlsZSBmcm9tICdvbC9zdHlsZSc7XHJcbmltcG9ydCBPbEdlb21ldHJ5VHlwZSBmcm9tICdvbC9nZW9tL0dlb21ldHJ5VHlwZSc7XHJcbmltcG9ydCBPbFZlY3RvclNvdXJjZSBmcm9tICdvbC9zb3VyY2UvVmVjdG9yJztcclxuaW1wb3J0IE9sVmVjdG9yTGF5ZXIgZnJvbSAnb2wvbGF5ZXIvVmVjdG9yJztcclxuaW1wb3J0IE9sRHJhdyBmcm9tICdvbC9pbnRlcmFjdGlvbi9EcmF3JztcclxuaW1wb3J0IHtcclxuICBHZW9tZXRyeSBhcyBPbEdlb21ldHJ5LFxyXG4gIEdlb21ldHJ5RXZlbnQgYXMgT2xHZW9tZXRyeUV2ZW50XHJcbn0gZnJvbSAnb2wvZ2VvbS9HZW9tZXRyeSc7XHJcbmltcG9ydCB7IERyYXdFdmVudCBhcyBPbERyYXdFdmVudCB9IGZyb20gJ29sL2ludGVyYWN0aW9uL0RyYXcnO1xyXG5pbXBvcnQgeyB1bkJ5S2V5IH0gZnJvbSAnb2wvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7IE1hcEJyb3dzZXJFdmVudCBhcyBPbE1hcEJyb3dzZXJFdmVudCB9IGZyb20gJ29sL01hcEJyb3dzZXJFdmVudCc7XHJcbmltcG9ydCB7IHNoaWZ0S2V5T25seSB9IGZyb20gJ29sL2V2ZW50cy9jb25kaXRpb24nO1xyXG5cclxuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uLCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRHJhd0NvbnRyb2xPcHRpb25zIHtcclxuICBnZW9tZXRyeVR5cGU6IE9sR2VvbWV0cnlUeXBlO1xyXG4gIHNvdXJjZT86IE9sVmVjdG9yU291cmNlO1xyXG4gIGxheWVyPzogT2xWZWN0b3JMYXllcjtcclxuICBsYXllclN0eWxlPzogT2xTdHlsZSB8ICgob2xmZWF0dXJlOiBPbEZlYXR1cmUpID0+IE9sU3R5bGUpO1xyXG4gIGRyYXdTdHlsZT86IE9sU3R5bGUgfCAoKG9sZmVhdHVyZTogT2xGZWF0dXJlKSA9PiBPbFN0eWxlKTtcclxuICBtYXhQb2ludHM/OiBudW1iZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb250cm9sIHRvIGRyYXcgZ2VvbWV0cmllc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERyYXdDb250cm9sIHtcclxuXHJcbiAgLyoqXHJcbiAgICogRHJhdyBzdGFydCBvYnNlcnZhYmxlXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXJ0JDogU3ViamVjdDxPbEdlb21ldHJ5PiA9IG5ldyBTdWJqZWN0KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIERyYXcgZW5kIG9ic2VydmFibGVcclxuICAgKi9cclxuICBwdWJsaWMgZW5kJDogU3ViamVjdDxPbEdlb21ldHJ5PiA9IG5ldyBTdWJqZWN0KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEdlb21ldHJ5IGNoYW5nZXMgb2JzZXJ2YWJsZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBjaGFuZ2VzJDogU3ViamVjdDxPbEdlb21ldHJ5PiA9IG5ldyBTdWJqZWN0KCk7XHJcblxyXG4gIHByaXZhdGUgb2xNYXA6IE9sTWFwO1xyXG4gIHByaXZhdGUgb2xPdmVybGF5TGF5ZXI6IE9sVmVjdG9yTGF5ZXI7XHJcbiAgcHJpdmF0ZSBvbERyYXdJbnRlcmFjdGlvbjogT2xEcmF3O1xyXG4gIHByaXZhdGUgb25EcmF3U3RhcnRLZXk6IHN0cmluZztcclxuICBwcml2YXRlIG9uRHJhd0VuZEtleTogc3RyaW5nO1xyXG4gIHByaXZhdGUgb25DaGFuZ2VzS2V5OiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUga2V5RG93biQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRlciB0aGUgY29udHJvbCBpcyBhY3RpdmVcclxuICAgKi9cclxuICBnZXQgYWN0aXZlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMub2xNYXAgIT09IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdlb21ldHJ5IHR5cGVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgZ2VvbWV0cnlUeXBlKCk6IE9sR2VvbWV0cnlUeXBlIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZ2VvbWV0cnlUeXBlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT0wgb3ZlcmxheSBzb3VyY2VcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgb2xPdmVybGF5U291cmNlKCk6IE9sVmVjdG9yU291cmNlIHtcclxuICAgIHJldHVybiB0aGlzLm9sT3ZlcmxheUxheWVyLmdldFNvdXJjZSgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBvcHRpb25zOiBEcmF3Q29udHJvbE9wdGlvbnMpIHtcclxuICAgIGlmIChvcHRpb25zLmxheWVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbE92ZXJsYXlMYXllciA9IG9wdGlvbnMubGF5ZXI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm9sT3ZlcmxheUxheWVyID0gdGhpcy5jcmVhdGVPbElubmVyT3ZlcmxheUxheWVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgb3IgcmVtb3ZlIHRoaXMgY29udHJvbCB0by9mcm9tIGEgbWFwLlxyXG4gICAqIEBwYXJhbSBtYXAgT0wgTWFwXHJcbiAgICovXHJcbiAgc2V0T2xNYXAob2xNYXA6IE9sTWFwIHwgdW5kZWZpbmVkKSB7XHJcbiAgICBpZiAob2xNYXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmNsZWFyT2xJbm5lck92ZXJsYXlTb3VyY2UoKTtcclxuICAgICAgdGhpcy5yZW1vdmVPbElubmVyT3ZlcmxheUxheWVyKCk7XHJcbiAgICAgIHRoaXMucmVtb3ZlT2xEcmF3SW50ZXJhY3Rpb24oKTtcclxuICAgICAgdGhpcy5vbE1hcCA9IG9sTWFwO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vbE1hcCA9IG9sTWFwO1xyXG4gICAgdGhpcy5hZGRPbElubmVyT3ZlcmxheUxheWVyKCk7XHJcbiAgICB0aGlzLmFkZE9sRHJhd0ludGVyYWN0aW9uKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gdGhlIG92ZXJsYXkgc291cmNlXHJcbiAgICovXHJcbiAgZ2V0U291cmNlKCk6IE9sVmVjdG9yU291cmNlIHtcclxuICAgIHJldHVybiB0aGlzLm9sT3ZlcmxheVNvdXJjZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhbiBvdmVybGF5IHNvdXJjZSBpZiBub25lIGlzIGRlZmluZWQgaW4gdGhlIG9wdGlvbnNcclxuICAgKi9cclxuICBwcml2YXRlIGNyZWF0ZU9sSW5uZXJPdmVybGF5TGF5ZXIoKTogT2xWZWN0b3JMYXllciB7XHJcbiAgICByZXR1cm4gbmV3IE9sVmVjdG9yTGF5ZXIoe1xyXG4gICAgICBzb3VyY2U6IHRoaXMub3B0aW9ucy5zb3VyY2UgPyB0aGlzLm9wdGlvbnMuc291cmNlIDogbmV3IE9sVmVjdG9yU291cmNlKCksXHJcbiAgICAgIHN0eWxlOiB0aGlzLm9wdGlvbnMubGF5ZXJTdHlsZSxcclxuICAgICAgekluZGV4OiA1MDBcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhlIG92ZXJsYXkgbGF5ZXIgaWYgaXQgd2Fzbid0IGRlZmluZWQgaW4gdGhlIG9wdGlvbnNcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZU9sSW5uZXJPdmVybGF5TGF5ZXIoKSB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmxheWVyID09PSB1bmRlZmluZWQgJiYgdGhpcy5vbE1hcCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2xNYXAucmVtb3ZlTGF5ZXIodGhpcy5vbE92ZXJsYXlMYXllcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgdGhlIG92ZXJsYXkgbGF5ZXIgaWYgaXQgd2Fzbid0IGRlZmluZWQgaW4gdGhlIG9wdGlvbnNcclxuICAgKi9cclxuICBwcml2YXRlIGFkZE9sSW5uZXJPdmVybGF5TGF5ZXIoKTogT2xWZWN0b3JMYXllciB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmxheWVyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbE1hcC5hZGRMYXllcih0aGlzLm9sT3ZlcmxheUxheWVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBvdmVybGF5IHNvdXJjZSBpZiBpdCB3YXNuJ3QgZGVmaW5lZCBpbiB0aGUgb3B0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgY2xlYXJPbElubmVyT3ZlcmxheVNvdXJjZSgpIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMubGF5ZXIgPT09IHVuZGVmaW5lZCAmJiB0aGlzLm9wdGlvbnMuc291cmNlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbE92ZXJsYXlTb3VyY2UuY2xlYXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhIGRyYXcgaW50ZXJhY3Rpb24gdG8gdGhlIG1hcCBhbiBzZXQgdXAgc29tZSBsaXN0ZW5lcnNcclxuICAgKi9cclxuICBwcml2YXRlIGFkZE9sRHJhd0ludGVyYWN0aW9uKCkge1xyXG4gICAgY29uc3Qgb2xEcmF3SW50ZXJhY3Rpb24gPSBuZXcgT2xEcmF3KHtcclxuICAgICAgdHlwZTogdGhpcy5nZW9tZXRyeVR5cGUsXHJcbiAgICAgIHNvdXJjZTogdGhpcy5nZXRTb3VyY2UoKSxcclxuICAgICAgc3RvcENsaWNrOiB0cnVlLFxyXG4gICAgICBzdHlsZTogdGhpcy5vcHRpb25zLmRyYXdTdHlsZSxcclxuICAgICAgbWF4UG9pbnRzOiB0aGlzLm9wdGlvbnMubWF4UG9pbnRzLFxyXG4gICAgICBmcmVlaGFuZDogZmFsc2UsXHJcbiAgICAgIGZyZWVoYW5kQ29uZGl0aW9uOiAoKSA9PiBmYWxzZVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5vbkRyYXdTdGFydEtleSA9IG9sRHJhd0ludGVyYWN0aW9uXHJcbiAgICAgIC5vbignZHJhd3N0YXJ0JywgKGV2ZW50OiBPbERyYXdFdmVudCkgPT4gdGhpcy5vbkRyYXdTdGFydChldmVudCkpO1xyXG4gICAgdGhpcy5vbkRyYXdFbmRLZXkgPSBvbERyYXdJbnRlcmFjdGlvblxyXG4gICAgICAub24oJ2RyYXdlbmQnLCAoZXZlbnQ6IE9sRHJhd0V2ZW50KSA9PiB0aGlzLm9uRHJhd0VuZChldmVudCkpO1xyXG4gICAgdGhpcy5vbE1hcC5hZGRJbnRlcmFjdGlvbihvbERyYXdJbnRlcmFjdGlvbik7XHJcbiAgICB0aGlzLm9sRHJhd0ludGVyYWN0aW9uID0gb2xEcmF3SW50ZXJhY3Rpb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgdGhlIGRyYXcgaW50ZXJhY3Rpb25cclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZU9sRHJhd0ludGVyYWN0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMub2xEcmF3SW50ZXJhY3Rpb24gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy51bnN1YnNjcmliZVRvS2V5RG93bigpO1xyXG4gICAgdW5CeUtleSh0aGlzLm9uRHJhd1N0YXJ0S2V5KTtcclxuICAgIHVuQnlLZXkodGhpcy5vbkRyYXdFbmRLZXkpO1xyXG4gICAgaWYgKHRoaXMub2xNYXAgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9sTWFwLnJlbW92ZUludGVyYWN0aW9uKHRoaXMub2xEcmF3SW50ZXJhY3Rpb24pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vbERyYXdJbnRlcmFjdGlvbiA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gZHJhd2luZyBzdGFydHMsIGNsZWFyIHRoZSBvdmVybGF5IGFuZCBzdGFydCB3YXRjaGluZyBmcm9tIGNoYW5nZXNcclxuICAgKiBAcGFyYW0gZXZlbnQgRHJhdyBzdGFydCBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25EcmF3U3RhcnQoZXZlbnQ6IE9sRHJhd0V2ZW50KSB7XHJcbiAgICBjb25zdCBvbEdlb21ldHJ5ID0gZXZlbnQuZmVhdHVyZS5nZXRHZW9tZXRyeSgpO1xyXG4gICAgdGhpcy5zdGFydCQubmV4dChvbEdlb21ldHJ5KTtcclxuICAgIHRoaXMuY2xlYXJPbElubmVyT3ZlcmxheVNvdXJjZSgpO1xyXG4gICAgdGhpcy5vbkNoYW5nZXNLZXkgPSBvbEdlb21ldHJ5Lm9uKCdjaGFuZ2UnLCAob2xHZW9tZXRyeUV2ZW50OiBPbEdlb21ldHJ5RXZlbnQpID0+IHtcclxuICAgICAgdGhpcy5jaGFuZ2VzJC5uZXh0KG9sR2VvbWV0cnlFdmVudC50YXJnZXQpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnN1YnNjcmliZVRvS2V5RG93bigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBkcmF3aW5nIGVuZHMsIHVwZGF0ZSB0aGUgZ2VvbWV0cnkgb2JzZXJ2YWJsZSBhbmQgc3RhcnQgd2F0Y2hpbmcgZnJvbSBjaGFuZ2VzXHJcbiAgICogQHBhcmFtIGV2ZW50IERyYXcgZW5kIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkRyYXdFbmQoZXZlbnQ6IE9sRHJhd0V2ZW50KSB7XHJcbiAgICB0aGlzLnVuc3Vic2NyaWJlVG9LZXlEb3duKCk7XHJcbiAgICBpZiAodGhpcy5vbkNoYW5nZXNLZXkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB1bkJ5S2V5KHRoaXMub25DaGFuZ2VzS2V5KTtcclxuICAgIH1cclxuICAgIHRoaXMuZW5kJC5uZXh0KGV2ZW50LmZlYXR1cmUuZ2V0R2VvbWV0cnkoKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpYmUgdG8gQ1RSTCBrZXkgZG93biB0byBhY3RpdmF0ZSB0aGUgZHJhdyBjb250cm9sXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb0tleURvd24oKSB7XHJcbiAgICB0aGlzLnVuc3Vic2NyaWJlVG9LZXlEb3duKCk7XHJcbiAgICB0aGlzLmtleURvd24kJCA9IGZyb21FdmVudChkb2N1bWVudCwgJ2tleWRvd24nKS5zdWJzY3JpYmUoKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XHJcbiAgICAgIC8vIE9uIEVTQyBrZXkgZG93biwgcmVtb3ZlIHRoZSBsYXN0IHZlcnRleFxyXG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcpIHtcclxuICAgICAgICB0aGlzLm9sRHJhd0ludGVyYWN0aW9uLnJlbW92ZUxhc3RQb2ludCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuc3Vic2NyaWJlIHRvIGtleSBkb3duXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1bnN1YnNjcmliZVRvS2V5RG93bigpIHtcclxuICAgIGlmICh0aGlzLmtleURvd24kJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMua2V5RG93biQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIHRoaXMua2V5RG93biQkID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=