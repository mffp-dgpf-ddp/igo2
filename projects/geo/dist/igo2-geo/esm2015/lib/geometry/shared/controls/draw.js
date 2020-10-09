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
export class DrawControl {
    /**
     * @param {?} options
     */
    constructor(options) {
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
    /**
     * Wheter the control is active
     * @return {?}
     */
    get active() {
        return this.olMap !== undefined;
    }
    /**
     * Geometry type
     * \@internal
     * @return {?}
     */
    get geometryType() {
        return this.options.geometryType;
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
     * Add or remove this control to/from a map.
     * @param {?} olMap
     * @return {?}
     */
    setOlMap(olMap) {
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
    }
    /**
     * Return the overlay source
     * @return {?}
     */
    getSource() {
        return this.olOverlaySource;
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
     * Add a draw interaction to the map an set up some listeners
     * @return {?}
     */
    addOlDrawInteraction() {
        /** @type {?} */
        let olDrawInteraction;
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
                () => false)
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
        (event) => this.onDrawStart(event)));
        this.onDrawEndKey = olDrawInteraction
            .on('drawend', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => this.onDrawEnd(event)));
        this.olMap.addInteraction(olDrawInteraction);
        this.olDrawInteraction = olDrawInteraction;
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
        unByKey(this.onDrawStartKey);
        unByKey(this.onDrawEndKey);
        if (this.olMap !== undefined) {
            this.olMap.removeInteraction(this.olDrawInteraction);
        }
        this.olDrawInteraction = undefined;
    }
    /**
     * When drawing starts, clear the overlay and start watching from changes
     * @private
     * @param {?} event Draw start event
     * @return {?}
     */
    onDrawStart(event) {
        /** @type {?} */
        const olGeometry = event.feature.getGeometry();
        this.start$.next(olGeometry);
        this.clearOlInnerOverlaySource();
        this.onChangesKey = olGeometry.on('change', (/**
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
     * When drawing ends, update the geometry observable and start watching from changes
     * @private
     * @param {?} event Draw end event
     * @return {?}
     */
    onDrawEnd(event) {
        this.unsubscribeToKeyDown();
        if (this.onChangesKey !== undefined) {
            unByKey(this.onChangesKey);
        }
        this.end$.next(event.feature.getGeometry());
    }
    /**
     * Subscribe to CTRL key down to activate the draw control
     * @private
     * @return {?}
     */
    subscribeToKeyDown() {
        this.unsubscribeToKeyDown();
        this.keyDown$$ = fromEvent(document, 'keydown').subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            // On ESC key down, remove the last vertex
            if (event.keyCode === 27) {
                this.olDrawInteraction.removeLastPoint();
                return;
            }
            // On space bar, pan to the current mouse position
            if (event.keyCode === 32) {
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
            this.keyDown$$ = undefined;
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhdy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9nZW9tZXRyeS9zaGFyZWQvY29udHJvbHMvZHJhdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBSUEsT0FBTyxjQUFjLE1BQU0sa0JBQWtCLENBQUM7QUFDOUMsT0FBTyxhQUFhLE1BQU0saUJBQWlCLENBQUM7QUFDNUMsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFNekMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV4QyxPQUFPLEVBQUUsT0FBTyxFQUFnQixTQUFTLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXpFLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7O0FBRXhFLHdDQU9DOzs7SUFOQywwQ0FBNkI7O0lBQzdCLG9DQUF3Qjs7SUFDeEIsbUNBQXNCOztJQUN0Qix3Q0FBMkQ7O0lBQzNELHVDQUEwRDs7SUFDMUQsdUNBQW1COzs7OztBQU1yQixNQUFNLE9BQU8sV0FBVzs7OztJQXFEdEIsWUFBb0IsT0FBMkI7UUFBM0IsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7Ozs7UUFoRHhDLFdBQU0sR0FBd0IsSUFBSSxPQUFPLEVBQUUsQ0FBQzs7OztRQUs1QyxTQUFJLEdBQXdCLElBQUksT0FBTyxFQUFFLENBQUM7Ozs7UUFLMUMsYUFBUSxHQUF3QixJQUFJLE9BQU8sRUFBRSxDQUFDO1FBYXJELGNBQVMsR0FBNkIsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUEwQi9ELElBQUksT0FBTyxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1NBQ3JDO2FBQU07WUFDTCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1NBQ3hEO0lBQ0gsQ0FBQzs7Ozs7SUEx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QyxLQUFvQixFQUFFLEVBQUU7WUFDakYsMENBQTBDO1lBQzFDLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxFQUFFLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDekMsT0FBTzthQUNSO1lBRUQsa0RBQWtEO1lBQ2xELElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxFQUFFLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO29CQUMzQixNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWE7b0JBQzFCLFFBQVEsRUFBRSxDQUFDO2lCQUNaLENBQUMsQ0FBQztnQkFDSCxPQUFPO2FBQ1I7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7OztJQUtPLG9CQUFvQjtRQUMxQixJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7U0FDNUI7SUFDSCxDQUFDO0NBQ0Y7Ozs7OztJQTVPQyw2QkFBbUQ7Ozs7O0lBS25ELDJCQUFpRDs7Ozs7SUFLakQsK0JBQXFEOzs7OztJQUVyRCw0QkFBcUI7Ozs7O0lBQ3JCLHFDQUFzQzs7Ozs7SUFDdEMsd0NBQWtDOzs7OztJQUNsQyxxQ0FBK0I7Ozs7O0lBQy9CLG1DQUE2Qjs7Ozs7SUFDN0IsbUNBQTZCOzs7OztJQUU3QixvQ0FBd0M7Ozs7O0lBRXhDLGdDQUFnQzs7SUFFaEMsZ0NBQWlFOzs7OztJQXlCckQsOEJBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE9sTWFwIGZyb20gJ29sL01hcCc7XHJcbmltcG9ydCBPbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCBPbFN0eWxlIGZyb20gJ29sL3N0eWxlJztcclxuaW1wb3J0IE9sR2VvbWV0cnlUeXBlIGZyb20gJ29sL2dlb20vR2VvbWV0cnlUeXBlJztcclxuaW1wb3J0IE9sVmVjdG9yU291cmNlIGZyb20gJ29sL3NvdXJjZS9WZWN0b3InO1xyXG5pbXBvcnQgT2xWZWN0b3JMYXllciBmcm9tICdvbC9sYXllci9WZWN0b3InO1xyXG5pbXBvcnQgT2xEcmF3IGZyb20gJ29sL2ludGVyYWN0aW9uL0RyYXcnO1xyXG5pbXBvcnQge1xyXG4gIEdlb21ldHJ5IGFzIE9sR2VvbWV0cnksXHJcbiAgR2VvbWV0cnlFdmVudCBhcyBPbEdlb21ldHJ5RXZlbnRcclxufSBmcm9tICdvbC9nZW9tL0dlb21ldHJ5JztcclxuaW1wb3J0IHsgRHJhd0V2ZW50IGFzIE9sRHJhd0V2ZW50IH0gZnJvbSAnb2wvaW50ZXJhY3Rpb24vRHJhdyc7XHJcbmltcG9ydCB7IHVuQnlLZXkgfSBmcm9tICdvbC9PYnNlcnZhYmxlJztcclxuXHJcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiwgZnJvbUV2ZW50LCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IGdldE1vdXNlUG9zaXRpb25Gcm9tT2xHZW9tZXRyeUV2ZW50IH0gZnJvbSAnLi4vZ2VvbWV0cnkudXRpbHMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEcmF3Q29udHJvbE9wdGlvbnMge1xyXG4gIGdlb21ldHJ5VHlwZTogT2xHZW9tZXRyeVR5cGU7XHJcbiAgc291cmNlPzogT2xWZWN0b3JTb3VyY2U7XHJcbiAgbGF5ZXI/OiBPbFZlY3RvckxheWVyO1xyXG4gIGxheWVyU3R5bGU/OiBPbFN0eWxlIHwgKChvbGZlYXR1cmU6IE9sRmVhdHVyZSkgPT4gT2xTdHlsZSk7XHJcbiAgZHJhd1N0eWxlPzogT2xTdHlsZSB8ICgob2xmZWF0dXJlOiBPbEZlYXR1cmUpID0+IE9sU3R5bGUpO1xyXG4gIG1heFBvaW50cz86IG51bWJlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnRyb2wgdG8gZHJhdyBnZW9tZXRyaWVzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRHJhd0NvbnRyb2wge1xyXG5cclxuICAvKipcclxuICAgKiBEcmF3IHN0YXJ0IG9ic2VydmFibGVcclxuICAgKi9cclxuICBwdWJsaWMgc3RhcnQkOiBTdWJqZWN0PE9sR2VvbWV0cnk+ID0gbmV3IFN1YmplY3QoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRHJhdyBlbmQgb2JzZXJ2YWJsZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBlbmQkOiBTdWJqZWN0PE9sR2VvbWV0cnk+ID0gbmV3IFN1YmplY3QoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogR2VvbWV0cnkgY2hhbmdlcyBvYnNlcnZhYmxlXHJcbiAgICovXHJcbiAgcHVibGljIGNoYW5nZXMkOiBTdWJqZWN0PE9sR2VvbWV0cnk+ID0gbmV3IFN1YmplY3QoKTtcclxuXHJcbiAgcHJpdmF0ZSBvbE1hcDogT2xNYXA7XHJcbiAgcHJpdmF0ZSBvbE92ZXJsYXlMYXllcjogT2xWZWN0b3JMYXllcjtcclxuICBwcml2YXRlIG9sRHJhd0ludGVyYWN0aW9uOiBPbERyYXc7XHJcbiAgcHJpdmF0ZSBvbkRyYXdTdGFydEtleTogc3RyaW5nO1xyXG4gIHByaXZhdGUgb25EcmF3RW5kS2V5OiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBvbkNoYW5nZXNLZXk6IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSBtb3VzZVBvc2l0aW9uOiBbbnVtYmVyLCBudW1iZXJdO1xyXG5cclxuICBwcml2YXRlIGtleURvd24kJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBmcmVlaGFuZCQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0ZXIgdGhlIGNvbnRyb2wgaXMgYWN0aXZlXHJcbiAgICovXHJcbiAgZ2V0IGFjdGl2ZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm9sTWFwICE9PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZW9tZXRyeSB0eXBlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IGdlb21ldHJ5VHlwZSgpOiBPbEdlb21ldHJ5VHlwZSB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmdlb21ldHJ5VHlwZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9MIG92ZXJsYXkgc291cmNlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IG9sT3ZlcmxheVNvdXJjZSgpOiBPbFZlY3RvclNvdXJjZSB7XHJcbiAgICByZXR1cm4gdGhpcy5vbE92ZXJsYXlMYXllci5nZXRTb3VyY2UoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgb3B0aW9uczogRHJhd0NvbnRyb2xPcHRpb25zKSB7XHJcbiAgICBpZiAob3B0aW9ucy5sYXllciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2xPdmVybGF5TGF5ZXIgPSBvcHRpb25zLmxheWVyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5vbE92ZXJsYXlMYXllciA9IHRoaXMuY3JlYXRlT2xJbm5lck92ZXJsYXlMYXllcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIG9yIHJlbW92ZSB0aGlzIGNvbnRyb2wgdG8vZnJvbSBhIG1hcC5cclxuICAgKiBAcGFyYW0gbWFwIE9MIE1hcFxyXG4gICAqL1xyXG4gIHNldE9sTWFwKG9sTWFwOiBPbE1hcCB8IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKG9sTWFwID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5jbGVhck9sSW5uZXJPdmVybGF5U291cmNlKCk7XHJcbiAgICAgIHRoaXMucmVtb3ZlT2xJbm5lck92ZXJsYXlMYXllcigpO1xyXG4gICAgICB0aGlzLnJlbW92ZU9sRHJhd0ludGVyYWN0aW9uKCk7XHJcbiAgICAgIHRoaXMub2xNYXAgPSBvbE1hcDtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub2xNYXAgPSBvbE1hcDtcclxuICAgIHRoaXMuYWRkT2xJbm5lck92ZXJsYXlMYXllcigpO1xyXG4gICAgdGhpcy5hZGRPbERyYXdJbnRlcmFjdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIHRoZSBvdmVybGF5IHNvdXJjZVxyXG4gICAqL1xyXG4gIGdldFNvdXJjZSgpOiBPbFZlY3RvclNvdXJjZSB7XHJcbiAgICByZXR1cm4gdGhpcy5vbE92ZXJsYXlTb3VyY2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYW4gb3ZlcmxheSBzb3VyY2UgaWYgbm9uZSBpcyBkZWZpbmVkIGluIHRoZSBvcHRpb25zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjcmVhdGVPbElubmVyT3ZlcmxheUxheWVyKCk6IE9sVmVjdG9yTGF5ZXIge1xyXG4gICAgcmV0dXJuIG5ldyBPbFZlY3RvckxheWVyKHtcclxuICAgICAgc291cmNlOiB0aGlzLm9wdGlvbnMuc291cmNlID8gdGhpcy5vcHRpb25zLnNvdXJjZSA6IG5ldyBPbFZlY3RvclNvdXJjZSgpLFxyXG4gICAgICBzdHlsZTogdGhpcy5vcHRpb25zLmxheWVyU3R5bGUsXHJcbiAgICAgIHpJbmRleDogNTAwXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBvdmVybGF5IGxheWVyIGlmIGl0IHdhc24ndCBkZWZpbmVkIGluIHRoZSBvcHRpb25zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZW1vdmVPbElubmVyT3ZlcmxheUxheWVyKCkge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5sYXllciA9PT0gdW5kZWZpbmVkICYmIHRoaXMub2xNYXAgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9sTWFwLnJlbW92ZUxheWVyKHRoaXMub2xPdmVybGF5TGF5ZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIHRoZSBvdmVybGF5IGxheWVyIGlmIGl0IHdhc24ndCBkZWZpbmVkIGluIHRoZSBvcHRpb25zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRPbElubmVyT3ZlcmxheUxheWVyKCk6IE9sVmVjdG9yTGF5ZXIge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5sYXllciA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2xNYXAuYWRkTGF5ZXIodGhpcy5vbE92ZXJsYXlMYXllcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgb3ZlcmxheSBzb3VyY2UgaWYgaXQgd2Fzbid0IGRlZmluZWQgaW4gdGhlIG9wdGlvbnNcclxuICAgKi9cclxuICBwcml2YXRlIGNsZWFyT2xJbm5lck92ZXJsYXlTb3VyY2UoKSB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmxheWVyID09PSB1bmRlZmluZWQgJiYgdGhpcy5vcHRpb25zLnNvdXJjZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2xPdmVybGF5U291cmNlLmNsZWFyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYSBkcmF3IGludGVyYWN0aW9uIHRvIHRoZSBtYXAgYW4gc2V0IHVwIHNvbWUgbGlzdGVuZXJzXHJcbiAgICovXHJcbiAgYWRkT2xEcmF3SW50ZXJhY3Rpb24oKSB7XHJcbiAgICBsZXQgb2xEcmF3SW50ZXJhY3Rpb247XHJcbiAgICBpZiAodGhpcy5mcmVlaGFuZCQuZ2V0VmFsdWUoKSA9PT0gZmFsc2UpIHtcclxuICAgICAgb2xEcmF3SW50ZXJhY3Rpb24gPSBuZXcgT2xEcmF3KHtcclxuICAgICAgICB0eXBlOiB0aGlzLmdlb21ldHJ5VHlwZSxcclxuICAgICAgICBzb3VyY2U6IHRoaXMuZ2V0U291cmNlKCksXHJcbiAgICAgICAgc3RvcENsaWNrOiB0cnVlLFxyXG4gICAgICAgIHN0eWxlOiB0aGlzLm9wdGlvbnMuZHJhd1N0eWxlLFxyXG4gICAgICAgIG1heFBvaW50czogdGhpcy5vcHRpb25zLm1heFBvaW50cyxcclxuICAgICAgICBmcmVlaGFuZDogZmFsc2UsXHJcbiAgICAgICAgZnJlZWhhbmRDb25kaXRpb246ICgpID0+IGZhbHNlXHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuZ2VvbWV0cnlUeXBlID09PSAnUG9pbnQnKSB7XHJcbiAgICAgICAgb2xEcmF3SW50ZXJhY3Rpb24gPSBuZXcgT2xEcmF3KHtcclxuICAgICAgICAgIHR5cGU6ICdDaXJjbGUnLFxyXG4gICAgICAgICAgc291cmNlOiB0aGlzLmdldFNvdXJjZSgpLFxyXG4gICAgICAgICAgbWF4UG9pbnRzOiB0aGlzLm9wdGlvbnMubWF4UG9pbnRzLFxyXG4gICAgICAgICAgZnJlZWhhbmQ6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBvbERyYXdJbnRlcmFjdGlvbiA9IG5ldyBPbERyYXcoe1xyXG4gICAgICAgICAgdHlwZTogdGhpcy5nZW9tZXRyeVR5cGUsXHJcbiAgICAgICAgICBzb3VyY2U6IHRoaXMuZ2V0U291cmNlKCksXHJcbiAgICAgICAgICBtYXhQb2ludHM6IHRoaXMub3B0aW9ucy5tYXhQb2ludHMsXHJcbiAgICAgICAgICBmcmVlaGFuZDogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vbkRyYXdTdGFydEtleSA9IG9sRHJhd0ludGVyYWN0aW9uXHJcbiAgICAgIC5vbignZHJhd3N0YXJ0JywgKGV2ZW50OiBPbERyYXdFdmVudCkgPT4gdGhpcy5vbkRyYXdTdGFydChldmVudCkpO1xyXG4gICAgdGhpcy5vbkRyYXdFbmRLZXkgPSBvbERyYXdJbnRlcmFjdGlvblxyXG4gICAgICAub24oJ2RyYXdlbmQnLCAoZXZlbnQ6IE9sRHJhd0V2ZW50KSA9PiB0aGlzLm9uRHJhd0VuZChldmVudCkpO1xyXG4gICAgdGhpcy5vbE1hcC5hZGRJbnRlcmFjdGlvbihvbERyYXdJbnRlcmFjdGlvbik7XHJcbiAgICB0aGlzLm9sRHJhd0ludGVyYWN0aW9uID0gb2xEcmF3SW50ZXJhY3Rpb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgdGhlIGRyYXcgaW50ZXJhY3Rpb25cclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZU9sRHJhd0ludGVyYWN0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMub2xEcmF3SW50ZXJhY3Rpb24gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy51bnN1YnNjcmliZVRvS2V5RG93bigpO1xyXG4gICAgdW5CeUtleSh0aGlzLm9uRHJhd1N0YXJ0S2V5KTtcclxuICAgIHVuQnlLZXkodGhpcy5vbkRyYXdFbmRLZXkpO1xyXG4gICAgaWYgKHRoaXMub2xNYXAgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9sTWFwLnJlbW92ZUludGVyYWN0aW9uKHRoaXMub2xEcmF3SW50ZXJhY3Rpb24pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vbERyYXdJbnRlcmFjdGlvbiA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gZHJhd2luZyBzdGFydHMsIGNsZWFyIHRoZSBvdmVybGF5IGFuZCBzdGFydCB3YXRjaGluZyBmcm9tIGNoYW5nZXNcclxuICAgKiBAcGFyYW0gZXZlbnQgRHJhdyBzdGFydCBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25EcmF3U3RhcnQoZXZlbnQ6IE9sRHJhd0V2ZW50KSB7XHJcbiAgICBjb25zdCBvbEdlb21ldHJ5ID0gZXZlbnQuZmVhdHVyZS5nZXRHZW9tZXRyeSgpO1xyXG4gICAgdGhpcy5zdGFydCQubmV4dChvbEdlb21ldHJ5KTtcclxuICAgIHRoaXMuY2xlYXJPbElubmVyT3ZlcmxheVNvdXJjZSgpO1xyXG4gICAgdGhpcy5vbkNoYW5nZXNLZXkgPSBvbEdlb21ldHJ5Lm9uKCdjaGFuZ2UnLCAob2xHZW9tZXRyeUV2ZW50OiBPbEdlb21ldHJ5RXZlbnQpID0+IHtcclxuICAgICAgdGhpcy5tb3VzZVBvc2l0aW9uID0gZ2V0TW91c2VQb3NpdGlvbkZyb21PbEdlb21ldHJ5RXZlbnQob2xHZW9tZXRyeUV2ZW50KTtcclxuICAgICAgdGhpcy5jaGFuZ2VzJC5uZXh0KG9sR2VvbWV0cnlFdmVudC50YXJnZXQpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnN1YnNjcmliZVRvS2V5RG93bigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBkcmF3aW5nIGVuZHMsIHVwZGF0ZSB0aGUgZ2VvbWV0cnkgb2JzZXJ2YWJsZSBhbmQgc3RhcnQgd2F0Y2hpbmcgZnJvbSBjaGFuZ2VzXHJcbiAgICogQHBhcmFtIGV2ZW50IERyYXcgZW5kIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkRyYXdFbmQoZXZlbnQ6IE9sRHJhd0V2ZW50KSB7XHJcbiAgICB0aGlzLnVuc3Vic2NyaWJlVG9LZXlEb3duKCk7XHJcbiAgICBpZiAodGhpcy5vbkNoYW5nZXNLZXkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB1bkJ5S2V5KHRoaXMub25DaGFuZ2VzS2V5KTtcclxuICAgIH1cclxuICAgIHRoaXMuZW5kJC5uZXh0KGV2ZW50LmZlYXR1cmUuZ2V0R2VvbWV0cnkoKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpYmUgdG8gQ1RSTCBrZXkgZG93biB0byBhY3RpdmF0ZSB0aGUgZHJhdyBjb250cm9sXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb0tleURvd24oKSB7XHJcbiAgICB0aGlzLnVuc3Vic2NyaWJlVG9LZXlEb3duKCk7XHJcbiAgICB0aGlzLmtleURvd24kJCA9IGZyb21FdmVudChkb2N1bWVudCwgJ2tleWRvd24nKS5zdWJzY3JpYmUoKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XHJcbiAgICAgIC8vIE9uIEVTQyBrZXkgZG93biwgcmVtb3ZlIHRoZSBsYXN0IHZlcnRleFxyXG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcpIHtcclxuICAgICAgICB0aGlzLm9sRHJhd0ludGVyYWN0aW9uLnJlbW92ZUxhc3RQb2ludCgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gT24gc3BhY2UgYmFyLCBwYW4gdG8gdGhlIGN1cnJlbnQgbW91c2UgcG9zaXRpb25cclxuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDMyKSB7XHJcbiAgICAgICAgdGhpcy5vbE1hcC5nZXRWaWV3KCkuYW5pbWF0ZSh7XHJcbiAgICAgICAgICBjZW50ZXI6IHRoaXMubW91c2VQb3NpdGlvbixcclxuICAgICAgICAgIGR1cmF0aW9uOiAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuc3Vic2NyaWJlIHRvIGtleSBkb3duXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1bnN1YnNjcmliZVRvS2V5RG93bigpIHtcclxuICAgIGlmICh0aGlzLmtleURvd24kJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMua2V5RG93biQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIHRoaXMua2V5RG93biQkID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=