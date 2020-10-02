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
            this.olOverlaySource.clear(true);
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
        unByKey([
            this.onDrawStartKey,
            this.onDrawEndKey,
            this.onDrawKey
        ]);
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
        this.onDrawKey = olGeometry.on('change', (/**
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
        unByKey(this.onDrawKey);
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
    DrawControl.prototype.onDrawKey;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhdy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9nZW9tZXRyeS9zaGFyZWQvY29udHJvbHMvZHJhdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBSUEsT0FBTyxjQUFjLE1BQU0sa0JBQWtCLENBQUM7QUFDOUMsT0FBTyxhQUFhLE1BQU0saUJBQWlCLENBQUM7QUFDNUMsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFNekMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV4QyxPQUFPLEVBQUUsT0FBTyxFQUFnQixTQUFTLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXpFLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7O0FBRXhFLHdDQU9DOzs7SUFOQywwQ0FBNkI7O0lBQzdCLG9DQUF3Qjs7SUFDeEIsbUNBQXNCOztJQUN0Qix3Q0FBMkQ7O0lBQzNELHVDQUEwRDs7SUFDMUQsdUNBQW1COzs7OztBQU1yQixNQUFNLE9BQU8sV0FBVzs7OztJQXFEdEIsWUFBb0IsT0FBMkI7UUFBM0IsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7Ozs7UUFoRHhDLFdBQU0sR0FBd0IsSUFBSSxPQUFPLEVBQUUsQ0FBQzs7OztRQUs1QyxTQUFJLEdBQXdCLElBQUksT0FBTyxFQUFFLENBQUM7Ozs7UUFLMUMsYUFBUSxHQUF3QixJQUFJLE9BQU8sRUFBRSxDQUFDO1FBYXJELGNBQVMsR0FBNkIsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUEwQi9ELElBQUksT0FBTyxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1NBQ3JDO2FBQU07WUFDTCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1NBQ3hEO0lBQ0gsQ0FBQzs7Ozs7SUEx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QUEwQztZQUMxQyxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssRUFBRSxFQUFFO2dCQUN4QixJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3pDLE9BQU87YUFDUjtZQUVELGtEQUFrRDtZQUNsRCxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssRUFBRSxFQUFFO2dCQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQztvQkFDM0IsTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhO29CQUMxQixRQUFRLEVBQUUsQ0FBQztpQkFDWixDQUFDLENBQUM7Z0JBQ0gsT0FBTzthQUNSO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7SUFLTyxvQkFBb0I7UUFDMUIsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtZQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztDQUNGOzs7Ozs7SUE3T0MsNkJBQW1EOzs7OztJQUtuRCwyQkFBaUQ7Ozs7O0lBS2pELCtCQUFxRDs7Ozs7SUFFckQsNEJBQXFCOzs7OztJQUNyQixxQ0FBc0M7Ozs7O0lBQ3RDLHdDQUFrQzs7Ozs7SUFDbEMscUNBQStCOzs7OztJQUMvQixtQ0FBNkI7Ozs7O0lBQzdCLGdDQUEwQjs7Ozs7SUFFMUIsb0NBQXdDOzs7OztJQUV4QyxnQ0FBZ0M7O0lBRWhDLGdDQUFpRTs7Ozs7SUF5QnJELDhCQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBPbE1hcCBmcm9tICdvbC9NYXAnO1xyXG5pbXBvcnQgT2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5pbXBvcnQgT2xTdHlsZSBmcm9tICdvbC9zdHlsZSc7XHJcbmltcG9ydCBPbEdlb21ldHJ5VHlwZSBmcm9tICdvbC9nZW9tL0dlb21ldHJ5VHlwZSc7XHJcbmltcG9ydCBPbFZlY3RvclNvdXJjZSBmcm9tICdvbC9zb3VyY2UvVmVjdG9yJztcclxuaW1wb3J0IE9sVmVjdG9yTGF5ZXIgZnJvbSAnb2wvbGF5ZXIvVmVjdG9yJztcclxuaW1wb3J0IE9sRHJhdyBmcm9tICdvbC9pbnRlcmFjdGlvbi9EcmF3JztcclxuaW1wb3J0IHtcclxuICBHZW9tZXRyeSBhcyBPbEdlb21ldHJ5LFxyXG4gIEdlb21ldHJ5RXZlbnQgYXMgT2xHZW9tZXRyeUV2ZW50XHJcbn0gZnJvbSAnb2wvZ2VvbS9HZW9tZXRyeSc7XHJcbmltcG9ydCB7IERyYXdFdmVudCBhcyBPbERyYXdFdmVudCB9IGZyb20gJ29sL2ludGVyYWN0aW9uL0RyYXcnO1xyXG5pbXBvcnQgeyB1bkJ5S2V5IH0gZnJvbSAnb2wvT2JzZXJ2YWJsZSc7XHJcblxyXG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24sIGZyb21FdmVudCwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBnZXRNb3VzZVBvc2l0aW9uRnJvbU9sR2VvbWV0cnlFdmVudCB9IGZyb20gJy4uL2dlb21ldHJ5LnV0aWxzJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRHJhd0NvbnRyb2xPcHRpb25zIHtcclxuICBnZW9tZXRyeVR5cGU6IE9sR2VvbWV0cnlUeXBlO1xyXG4gIHNvdXJjZT86IE9sVmVjdG9yU291cmNlO1xyXG4gIGxheWVyPzogT2xWZWN0b3JMYXllcjtcclxuICBsYXllclN0eWxlPzogT2xTdHlsZSB8ICgob2xmZWF0dXJlOiBPbEZlYXR1cmUpID0+IE9sU3R5bGUpO1xyXG4gIGRyYXdTdHlsZT86IE9sU3R5bGUgfCAoKG9sZmVhdHVyZTogT2xGZWF0dXJlKSA9PiBPbFN0eWxlKTtcclxuICBtYXhQb2ludHM/OiBudW1iZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb250cm9sIHRvIGRyYXcgZ2VvbWV0cmllc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERyYXdDb250cm9sIHtcclxuXHJcbiAgLyoqXHJcbiAgICogRHJhdyBzdGFydCBvYnNlcnZhYmxlXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXJ0JDogU3ViamVjdDxPbEdlb21ldHJ5PiA9IG5ldyBTdWJqZWN0KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIERyYXcgZW5kIG9ic2VydmFibGVcclxuICAgKi9cclxuICBwdWJsaWMgZW5kJDogU3ViamVjdDxPbEdlb21ldHJ5PiA9IG5ldyBTdWJqZWN0KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEdlb21ldHJ5IGNoYW5nZXMgb2JzZXJ2YWJsZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBjaGFuZ2VzJDogU3ViamVjdDxPbEdlb21ldHJ5PiA9IG5ldyBTdWJqZWN0KCk7XHJcblxyXG4gIHByaXZhdGUgb2xNYXA6IE9sTWFwO1xyXG4gIHByaXZhdGUgb2xPdmVybGF5TGF5ZXI6IE9sVmVjdG9yTGF5ZXI7XHJcbiAgcHJpdmF0ZSBvbERyYXdJbnRlcmFjdGlvbjogT2xEcmF3O1xyXG4gIHByaXZhdGUgb25EcmF3U3RhcnRLZXk6IHN0cmluZztcclxuICBwcml2YXRlIG9uRHJhd0VuZEtleTogc3RyaW5nO1xyXG4gIHByaXZhdGUgb25EcmF3S2V5OiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgbW91c2VQb3NpdGlvbjogW251bWJlciwgbnVtYmVyXTtcclxuXHJcbiAgcHJpdmF0ZSBrZXlEb3duJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgZnJlZWhhbmQkOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGVyIHRoZSBjb250cm9sIGlzIGFjdGl2ZVxyXG4gICAqL1xyXG4gIGdldCBhY3RpdmUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5vbE1hcCAhPT0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2VvbWV0cnkgdHlwZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBnZW9tZXRyeVR5cGUoKTogT2xHZW9tZXRyeVR5cGUge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5nZW9tZXRyeVR5cGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPTCBvdmVybGF5IHNvdXJjZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBvbE92ZXJsYXlTb3VyY2UoKTogT2xWZWN0b3JTb3VyY2Uge1xyXG4gICAgcmV0dXJuIHRoaXMub2xPdmVybGF5TGF5ZXIuZ2V0U291cmNlKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG9wdGlvbnM6IERyYXdDb250cm9sT3B0aW9ucykge1xyXG4gICAgaWYgKG9wdGlvbnMubGF5ZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9sT3ZlcmxheUxheWVyID0gb3B0aW9ucy5sYXllcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub2xPdmVybGF5TGF5ZXIgPSB0aGlzLmNyZWF0ZU9sSW5uZXJPdmVybGF5TGF5ZXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBvciByZW1vdmUgdGhpcyBjb250cm9sIHRvL2Zyb20gYSBtYXAuXHJcbiAgICogQHBhcmFtIG1hcCBPTCBNYXBcclxuICAgKi9cclxuICBzZXRPbE1hcChvbE1hcDogT2xNYXAgfCB1bmRlZmluZWQpIHtcclxuICAgIGlmIChvbE1hcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuY2xlYXJPbElubmVyT3ZlcmxheVNvdXJjZSgpO1xyXG4gICAgICB0aGlzLnJlbW92ZU9sSW5uZXJPdmVybGF5TGF5ZXIoKTtcclxuICAgICAgdGhpcy5yZW1vdmVPbERyYXdJbnRlcmFjdGlvbigpO1xyXG4gICAgICB0aGlzLm9sTWFwID0gb2xNYXA7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9sTWFwID0gb2xNYXA7XHJcbiAgICB0aGlzLmFkZE9sSW5uZXJPdmVybGF5TGF5ZXIoKTtcclxuICAgIHRoaXMuYWRkT2xEcmF3SW50ZXJhY3Rpb24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiB0aGUgb3ZlcmxheSBzb3VyY2VcclxuICAgKi9cclxuICBnZXRTb3VyY2UoKTogT2xWZWN0b3JTb3VyY2Uge1xyXG4gICAgcmV0dXJuIHRoaXMub2xPdmVybGF5U291cmNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGFuIG92ZXJsYXkgc291cmNlIGlmIG5vbmUgaXMgZGVmaW5lZCBpbiB0aGUgb3B0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgY3JlYXRlT2xJbm5lck92ZXJsYXlMYXllcigpOiBPbFZlY3RvckxheWVyIHtcclxuICAgIHJldHVybiBuZXcgT2xWZWN0b3JMYXllcih7XHJcbiAgICAgIHNvdXJjZTogdGhpcy5vcHRpb25zLnNvdXJjZSA/IHRoaXMub3B0aW9ucy5zb3VyY2UgOiBuZXcgT2xWZWN0b3JTb3VyY2UoKSxcclxuICAgICAgc3R5bGU6IHRoaXMub3B0aW9ucy5sYXllclN0eWxlLFxyXG4gICAgICB6SW5kZXg6IDUwMFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgb3ZlcmxheSBsYXllciBpZiBpdCB3YXNuJ3QgZGVmaW5lZCBpbiB0aGUgb3B0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlT2xJbm5lck92ZXJsYXlMYXllcigpIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMubGF5ZXIgPT09IHVuZGVmaW5lZCAmJiB0aGlzLm9sTWFwICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbE1hcC5yZW1vdmVMYXllcih0aGlzLm9sT3ZlcmxheUxheWVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCB0aGUgb3ZlcmxheSBsYXllciBpZiBpdCB3YXNuJ3QgZGVmaW5lZCBpbiB0aGUgb3B0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkT2xJbm5lck92ZXJsYXlMYXllcigpOiBPbFZlY3RvckxheWVyIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMubGF5ZXIgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9sTWFwLmFkZExheWVyKHRoaXMub2xPdmVybGF5TGF5ZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhlIG92ZXJsYXkgc291cmNlIGlmIGl0IHdhc24ndCBkZWZpbmVkIGluIHRoZSBvcHRpb25zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjbGVhck9sSW5uZXJPdmVybGF5U291cmNlKCkge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5sYXllciA9PT0gdW5kZWZpbmVkICYmIHRoaXMub3B0aW9ucy5zb3VyY2UgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9sT3ZlcmxheVNvdXJjZS5jbGVhcih0cnVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhIGRyYXcgaW50ZXJhY3Rpb24gdG8gdGhlIG1hcCBhbiBzZXQgdXAgc29tZSBsaXN0ZW5lcnNcclxuICAgKi9cclxuICBhZGRPbERyYXdJbnRlcmFjdGlvbigpIHtcclxuICAgIGxldCBvbERyYXdJbnRlcmFjdGlvbjtcclxuICAgIGlmICh0aGlzLmZyZWVoYW5kJC5nZXRWYWx1ZSgpID09PSBmYWxzZSkge1xyXG4gICAgICBvbERyYXdJbnRlcmFjdGlvbiA9IG5ldyBPbERyYXcoe1xyXG4gICAgICAgIHR5cGU6IHRoaXMuZ2VvbWV0cnlUeXBlLFxyXG4gICAgICAgIHNvdXJjZTogdGhpcy5nZXRTb3VyY2UoKSxcclxuICAgICAgICBzdG9wQ2xpY2s6IHRydWUsXHJcbiAgICAgICAgc3R5bGU6IHRoaXMub3B0aW9ucy5kcmF3U3R5bGUsXHJcbiAgICAgICAgbWF4UG9pbnRzOiB0aGlzLm9wdGlvbnMubWF4UG9pbnRzLFxyXG4gICAgICAgIGZyZWVoYW5kOiBmYWxzZSxcclxuICAgICAgICBmcmVlaGFuZENvbmRpdGlvbjogKCkgPT4gZmFsc2VcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5nZW9tZXRyeVR5cGUgPT09ICdQb2ludCcpIHtcclxuICAgICAgICBvbERyYXdJbnRlcmFjdGlvbiA9IG5ldyBPbERyYXcoe1xyXG4gICAgICAgICAgdHlwZTogJ0NpcmNsZScsXHJcbiAgICAgICAgICBzb3VyY2U6IHRoaXMuZ2V0U291cmNlKCksXHJcbiAgICAgICAgICBtYXhQb2ludHM6IHRoaXMub3B0aW9ucy5tYXhQb2ludHMsXHJcbiAgICAgICAgICBmcmVlaGFuZDogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG9sRHJhd0ludGVyYWN0aW9uID0gbmV3IE9sRHJhdyh7XHJcbiAgICAgICAgICB0eXBlOiB0aGlzLmdlb21ldHJ5VHlwZSxcclxuICAgICAgICAgIHNvdXJjZTogdGhpcy5nZXRTb3VyY2UoKSxcclxuICAgICAgICAgIG1heFBvaW50czogdGhpcy5vcHRpb25zLm1heFBvaW50cyxcclxuICAgICAgICAgIGZyZWVoYW5kOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9uRHJhd1N0YXJ0S2V5ID0gb2xEcmF3SW50ZXJhY3Rpb25cclxuICAgICAgLm9uKCdkcmF3c3RhcnQnLCAoZXZlbnQ6IE9sRHJhd0V2ZW50KSA9PiB0aGlzLm9uRHJhd1N0YXJ0KGV2ZW50KSk7XHJcbiAgICB0aGlzLm9uRHJhd0VuZEtleSA9IG9sRHJhd0ludGVyYWN0aW9uXHJcbiAgICAgIC5vbignZHJhd2VuZCcsIChldmVudDogT2xEcmF3RXZlbnQpID0+IHRoaXMub25EcmF3RW5kKGV2ZW50KSk7XHJcbiAgICB0aGlzLm9sTWFwLmFkZEludGVyYWN0aW9uKG9sRHJhd0ludGVyYWN0aW9uKTtcclxuICAgIHRoaXMub2xEcmF3SW50ZXJhY3Rpb24gPSBvbERyYXdJbnRlcmFjdGlvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSB0aGUgZHJhdyBpbnRlcmFjdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlT2xEcmF3SW50ZXJhY3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5vbERyYXdJbnRlcmFjdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVuc3Vic2NyaWJlVG9LZXlEb3duKCk7XHJcbiAgICB1bkJ5S2V5KFtcclxuICAgICAgdGhpcy5vbkRyYXdTdGFydEtleSxcclxuICAgICAgdGhpcy5vbkRyYXdFbmRLZXksXHJcbiAgICAgIHRoaXMub25EcmF3S2V5XHJcbiAgICBdKTtcclxuICAgIGlmICh0aGlzLm9sTWFwICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbE1hcC5yZW1vdmVJbnRlcmFjdGlvbih0aGlzLm9sRHJhd0ludGVyYWN0aW9uKTtcclxuICAgIH1cclxuICAgIHRoaXMub2xEcmF3SW50ZXJhY3Rpb24gPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGRyYXdpbmcgc3RhcnRzLCBjbGVhciB0aGUgb3ZlcmxheSBhbmQgc3RhcnQgd2F0Y2hpbmcgZnJvbSBjaGFuZ2VzXHJcbiAgICogQHBhcmFtIGV2ZW50IERyYXcgc3RhcnQgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uRHJhd1N0YXJ0KGV2ZW50OiBPbERyYXdFdmVudCkge1xyXG4gICAgY29uc3Qgb2xHZW9tZXRyeSA9IGV2ZW50LmZlYXR1cmUuZ2V0R2VvbWV0cnkoKTtcclxuICAgIHRoaXMuc3RhcnQkLm5leHQob2xHZW9tZXRyeSk7XHJcbiAgICB0aGlzLmNsZWFyT2xJbm5lck92ZXJsYXlTb3VyY2UoKTtcclxuICAgIHRoaXMub25EcmF3S2V5ID0gb2xHZW9tZXRyeS5vbignY2hhbmdlJywgKG9sR2VvbWV0cnlFdmVudDogT2xHZW9tZXRyeUV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMubW91c2VQb3NpdGlvbiA9IGdldE1vdXNlUG9zaXRpb25Gcm9tT2xHZW9tZXRyeUV2ZW50KG9sR2VvbWV0cnlFdmVudCk7XHJcbiAgICAgIHRoaXMuY2hhbmdlcyQubmV4dChvbEdlb21ldHJ5RXZlbnQudGFyZ2V0KTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zdWJzY3JpYmVUb0tleURvd24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gZHJhd2luZyBlbmRzLCB1cGRhdGUgdGhlIGdlb21ldHJ5IG9ic2VydmFibGUgYW5kIHN0YXJ0IHdhdGNoaW5nIGZyb20gY2hhbmdlc1xyXG4gICAqIEBwYXJhbSBldmVudCBEcmF3IGVuZCBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25EcmF3RW5kKGV2ZW50OiBPbERyYXdFdmVudCkge1xyXG4gICAgdGhpcy51bnN1YnNjcmliZVRvS2V5RG93bigpO1xyXG4gICAgdW5CeUtleSh0aGlzLm9uRHJhd0tleSk7XHJcbiAgICB0aGlzLmVuZCQubmV4dChldmVudC5mZWF0dXJlLmdldEdlb21ldHJ5KCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaWJlIHRvIENUUkwga2V5IGRvd24gdG8gYWN0aXZhdGUgdGhlIGRyYXcgY29udHJvbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9LZXlEb3duKCkge1xyXG4gICAgdGhpcy51bnN1YnNjcmliZVRvS2V5RG93bigpO1xyXG4gICAgdGhpcy5rZXlEb3duJCQgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdrZXlkb3duJykuc3Vic2NyaWJlKChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICAvLyBPbiBFU0Mga2V5IGRvd24sIHJlbW92ZSB0aGUgbGFzdCB2ZXJ0ZXhcclxuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDI3KSB7XHJcbiAgICAgICAgdGhpcy5vbERyYXdJbnRlcmFjdGlvbi5yZW1vdmVMYXN0UG9pbnQoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIE9uIHNwYWNlIGJhciwgcGFuIHRvIHRoZSBjdXJyZW50IG1vdXNlIHBvc2l0aW9uXHJcbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzMikge1xyXG4gICAgICAgIHRoaXMub2xNYXAuZ2V0VmlldygpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgY2VudGVyOiB0aGlzLm1vdXNlUG9zaXRpb24sXHJcbiAgICAgICAgICBkdXJhdGlvbjogMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbnN1YnNjcmliZSB0byBrZXkgZG93blxyXG4gICAqL1xyXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVUb0tleURvd24oKSB7XHJcbiAgICBpZiAodGhpcy5rZXlEb3duJCQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmtleURvd24kJC51bnN1YnNjcmliZSgpO1xyXG4gICAgICB0aGlzLmtleURvd24kJCA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19