/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, Output, EventEmitter, Self } from '@angular/core';
import { MapBrowserComponent } from '../../map/map-browser/map-browser.component';
import { transform } from 'ol/proj';
import { MediaService } from '@igo2/core';
/**
 * This directive return the pointer coordinate (on click or pointermove)
 * in [longitude, latitude], delayed by in input (pointerMoveDelay)
 * to avoid too many emitted values.
 */
var PointerPositionDirective = /** @class */ (function () {
    function PointerPositionDirective(component, mediaService) {
        this.component = component;
        this.mediaService = mediaService;
        /**
         * Delay before emitting an event
         */
        this.pointerPositionDelay = 1000;
        /**
         * Event emitted when the pointer move, delayed by pointerMoveDelay
         */
        this.pointerPositionCoord = new EventEmitter();
    }
    Object.defineProperty(PointerPositionDirective.prototype, "map", {
        /**
         * IGO map
         * @internal
         */
        get: /**
         * IGO map
         * \@internal
         * @return {?}
         */
        function () {
            return this.component.map;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointerPositionDirective.prototype, "mapProjection", {
        get: /**
         * @return {?}
         */
        function () {
            return ((/** @type {?} */ (this.component.map))).projection;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Start listening to pointermove
     * @internal
     */
    /**
     * Start listening to pointermove
     * \@internal
     * @return {?}
     */
    PointerPositionDirective.prototype.ngOnInit = /**
     * Start listening to pointermove
     * \@internal
     * @return {?}
     */
    function () {
        this.listenToMapPointerMove();
        this.listenToMapClick();
    };
    /**
     * Stop listening to pointermove
     * @internal
     */
    /**
     * Stop listening to pointermove
     * \@internal
     * @return {?}
     */
    PointerPositionDirective.prototype.ngOnDestroy = /**
     * Stop listening to pointermove
     * \@internal
     * @return {?}
     */
    function () {
        this.unlistenToMapPointerMove();
        this.unlistenToMapClick();
    };
    /**
     * On map pointermove
     */
    /**
     * On map pointermove
     * @private
     * @return {?}
     */
    PointerPositionDirective.prototype.listenToMapPointerMove = /**
     * On map pointermove
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.pointerMoveListener = this.map.ol.on('pointermove', (/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.onPointerEvent(event, _this.pointerPositionDelay); }));
    };
    /**
     * On map click
     */
    /**
     * On map click
     * @private
     * @return {?}
     */
    PointerPositionDirective.prototype.listenToMapClick = /**
     * On map click
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.mapClickListener = this.map.ol.on('singleclick', (/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.onPointerEvent(event, 0); }));
    };
    /**
     * Stop listening for map pointermove
     */
    /**
     * Stop listening for map pointermove
     * @private
     * @return {?}
     */
    PointerPositionDirective.prototype.unlistenToMapPointerMove = /**
     * Stop listening for map pointermove
     * @private
     * @return {?}
     */
    function () {
        this.map.ol.un(this.pointerMoveListener.type, this.pointerMoveListener.listener);
        this.pointerMoveListener = undefined;
    };
    /**
     * Stop listening for map clicks
     */
    /**
     * Stop listening for map clicks
     * @private
     * @return {?}
     */
    PointerPositionDirective.prototype.unlistenToMapClick = /**
     * Stop listening for map clicks
     * @private
     * @return {?}
     */
    function () {
        this.map.ol.un(this.mapClickListener.type, this.mapClickListener.listener);
        this.mapClickListener = undefined;
    };
    /**
     * emit delayed coordinate (longitude, latitude array) based on pointerMoveDelay or on click
     * @param event OL map browser pointer event
     */
    /**
     * emit delayed coordinate (longitude, latitude array) based on pointerMoveDelay or on click
     * @private
     * @param {?} event OL map browser pointer event
     * @param {?} delay
     * @return {?}
     */
    PointerPositionDirective.prototype.onPointerEvent = /**
     * emit delayed coordinate (longitude, latitude array) based on pointerMoveDelay or on click
     * @private
     * @param {?} event OL map browser pointer event
     * @param {?} delay
     * @return {?}
     */
    function (event, delay) {
        var _this = this;
        if (event.dragging || this.mediaService.isTouchScreen()) {
            return;
        }
        if (typeof this.lastTimeoutRequest !== 'undefined') { // cancel timeout when the mouse moves
            clearTimeout(this.lastTimeoutRequest);
        }
        /** @type {?} */
        var lonlat = transform(event.coordinate, this.mapProjection, 'EPSG:4326');
        this.lastTimeoutRequest = setTimeout((/**
         * @return {?}
         */
        function () {
            _this.pointerPositionCoord.emit(lonlat);
        }), delay);
    };
    PointerPositionDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoPointerPosition]'
                },] }
    ];
    /** @nocollapse */
    PointerPositionDirective.ctorParameters = function () { return [
        { type: MapBrowserComponent, decorators: [{ type: Self }] },
        { type: MediaService }
    ]; };
    PointerPositionDirective.propDecorators = {
        pointerPositionDelay: [{ type: Input }],
        pointerPositionCoord: [{ type: Output }]
    };
    return PointerPositionDirective;
}());
export { PointerPositionDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PointerPositionDirective.prototype.lastTimeoutRequest;
    /**
     * Listener to the pointer move event
     * @type {?}
     * @private
     */
    PointerPositionDirective.prototype.pointerMoveListener;
    /**
     * Listener to the map click event
     * @type {?}
     * @private
     */
    PointerPositionDirective.prototype.mapClickListener;
    /**
     * Delay before emitting an event
     * @type {?}
     */
    PointerPositionDirective.prototype.pointerPositionDelay;
    /**
     * Event emitted when the pointer move, delayed by pointerMoveDelay
     * @type {?}
     */
    PointerPositionDirective.prototype.pointerPositionCoord;
    /**
     * @type {?}
     * @private
     */
    PointerPositionDirective.prototype.component;
    /**
     * @type {?}
     * @private
     */
    PointerPositionDirective.prototype.mediaService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXBvaW50ZXItcG9zaXRpb24uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL21hcC9zaGFyZWQvbWFwLXBvaW50ZXItcG9zaXRpb24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUVaLElBQUksRUFFTCxNQUFNLGVBQWUsQ0FBQztBQU12QixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUVsRixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxZQUFZLENBQUM7Ozs7OztBQU0xQztJQXVDRSxrQ0FDa0IsU0FBOEIsRUFDdEMsWUFBMEI7UUFEbEIsY0FBUyxHQUFULFNBQVMsQ0FBcUI7UUFDdEMsaUJBQVksR0FBWixZQUFZLENBQWM7Ozs7UUFyQjNCLHlCQUFvQixHQUFXLElBQUksQ0FBQzs7OztRQUtuQyx5QkFBb0IsR0FBRyxJQUFJLFlBQVksRUFBb0IsQ0FBQztJQWlCbEUsQ0FBQztJQVhMLHNCQUFJLHlDQUFHO1FBSlA7OztXQUdHOzs7Ozs7UUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7UUFDNUIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxtREFBYTs7OztRQUFqQjtZQUNFLE9BQU8sQ0FBQyxtQkFBQSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDO1FBQ25ELENBQUM7OztPQUFBO0lBT0Q7OztPQUdHOzs7Ozs7SUFDSCwyQ0FBUTs7Ozs7SUFBUjtRQUNFLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUNILDhDQUFXOzs7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSyx5REFBc0I7Ozs7O0lBQTlCO1FBQUEsaUJBS0M7UUFKQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUN2QyxhQUFhOzs7O1FBQ2IsVUFBQyxLQUErQixJQUFLLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsS0FBSSxDQUFDLG9CQUFvQixDQUFDLEVBQXJELENBQXFELEVBQzNGLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7Ozs7OztJQUNLLG1EQUFnQjs7Ozs7SUFBeEI7UUFBQSxpQkFLQztRQUpDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQ3BDLGFBQWE7Ozs7UUFDYixVQUFDLEtBQStCLElBQUssT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBN0IsQ0FBNkIsRUFDbkUsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0ssMkRBQXdCOzs7OztJQUFoQztRQUNFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsbUJBQW1CLEdBQUcsU0FBUyxDQUFDO0lBQ3ZDLENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0sscURBQWtCOzs7OztJQUExQjtRQUNFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7O0lBQ0ssaURBQWM7Ozs7Ozs7SUFBdEIsVUFBdUIsS0FBK0IsRUFBRSxLQUFhO1FBQXJFLGlCQVVDO1FBVEMsSUFBSSxLQUFLLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLEVBQUU7WUFBQyxPQUFPO1NBQUU7UUFDbkUsSUFBSSxPQUFPLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxXQUFXLEVBQUUsRUFBRSxzQ0FBc0M7WUFDMUYsWUFBWSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQ3ZDOztZQUVLLE1BQU0sR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQztRQUMzRSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsVUFBVTs7O1FBQUM7WUFDbkMsS0FBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxDQUFDLEdBQUUsS0FBSyxDQUFDLENBQUM7SUFDWixDQUFDOztnQkFoSEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7aUJBQ2pDOzs7O2dCQVhRLG1CQUFtQix1QkFpRHZCLElBQUk7Z0JBOUNBLFlBQVk7Ozt1Q0EwQmxCLEtBQUs7dUNBS0wsTUFBTTs7SUF3RlQsK0JBQUM7Q0FBQSxBQWpIRCxJQWlIQztTQTlHWSx3QkFBd0I7Ozs7OztJQUVuQyxzREFBMkI7Ozs7OztJQUszQix1REFBOEM7Ozs7OztJQUs5QyxvREFBMkM7Ozs7O0lBSzNDLHdEQUE2Qzs7Ozs7SUFLN0Msd0RBQXNFOzs7OztJQWVwRSw2Q0FBOEM7Ozs7O0lBQzlDLGdEQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT25EZXN0cm95LFxyXG4gIFNlbGYsXHJcbiAgT25Jbml0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBNYXBCcm93c2VyUG9pbnRlckV2ZW50IGFzIE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCB9IGZyb20gJ29sL01hcEJyb3dzZXJFdmVudCc7XHJcbmltcG9ydCB7IExpc3RlbmVyRnVuY3Rpb24gfSBmcm9tICdvbC9ldmVudHMnO1xyXG5cclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwL3NoYXJlZC9tYXAnO1xyXG5pbXBvcnQgeyBNYXBCcm93c2VyQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vbWFwL21hcC1icm93c2VyL21hcC1icm93c2VyLmNvbXBvbmVudCc7XHJcblxyXG5pbXBvcnQgeyB0cmFuc2Zvcm0gfSBmcm9tICdvbC9wcm9qJztcclxuaW1wb3J0IHsgTWVkaWFTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbi8qKlxyXG4gKiBUaGlzIGRpcmVjdGl2ZSByZXR1cm4gdGhlIHBvaW50ZXIgY29vcmRpbmF0ZSAob24gY2xpY2sgb3IgcG9pbnRlcm1vdmUpXHJcbiAqIGluIFtsb25naXR1ZGUsIGxhdGl0dWRlXSwgZGVsYXllZCBieSBpbiBpbnB1dCAocG9pbnRlck1vdmVEZWxheSlcclxuICogdG8gYXZvaWQgdG9vIG1hbnkgZW1pdHRlZCB2YWx1ZXMuXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tpZ29Qb2ludGVyUG9zaXRpb25dJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUG9pbnRlclBvc2l0aW9uRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICBwcml2YXRlIGxhc3RUaW1lb3V0UmVxdWVzdDtcclxuXHJcbiAgLyoqXHJcbiAgICogTGlzdGVuZXIgdG8gdGhlIHBvaW50ZXIgbW92ZSBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgcG9pbnRlck1vdmVMaXN0ZW5lcjogTGlzdGVuZXJGdW5jdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogTGlzdGVuZXIgdG8gdGhlIG1hcCBjbGljayBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgbWFwQ2xpY2tMaXN0ZW5lcjogTGlzdGVuZXJGdW5jdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogRGVsYXkgYmVmb3JlIGVtaXR0aW5nIGFuIGV2ZW50XHJcbiAgICovXHJcbiAgQElucHV0KCkgcG9pbnRlclBvc2l0aW9uRGVsYXk6IG51bWJlciA9IDEwMDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgcG9pbnRlciBtb3ZlLCBkZWxheWVkIGJ5IHBvaW50ZXJNb3ZlRGVsYXlcclxuICAgKi9cclxuICBAT3V0cHV0KCkgcG9pbnRlclBvc2l0aW9uQ29vcmQgPSBuZXcgRXZlbnRFbWl0dGVyPFtudW1iZXIsIG51bWJlcl0+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIElHTyBtYXBcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgbWFwKCk6IElnb01hcCB7XHJcbiAgICByZXR1cm4gdGhpcy5jb21wb25lbnQubWFwO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG1hcFByb2plY3Rpb24oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAodGhpcy5jb21wb25lbnQubWFwIGFzIElnb01hcCkucHJvamVjdGlvbjtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQFNlbGYoKSBwcml2YXRlIGNvbXBvbmVudDogTWFwQnJvd3NlckNvbXBvbmVudCxcclxuICAgIHByaXZhdGUgbWVkaWFTZXJ2aWNlOiBNZWRpYVNlcnZpY2VcclxuICApIHsgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydCBsaXN0ZW5pbmcgdG8gcG9pbnRlcm1vdmVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMubGlzdGVuVG9NYXBQb2ludGVyTW92ZSgpO1xyXG4gICAgdGhpcy5saXN0ZW5Ub01hcENsaWNrKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdG9wIGxpc3RlbmluZyB0byBwb2ludGVybW92ZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy51bmxpc3RlblRvTWFwUG9pbnRlck1vdmUoKTtcclxuICAgIHRoaXMudW5saXN0ZW5Ub01hcENsaWNrKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPbiBtYXAgcG9pbnRlcm1vdmVcclxuICAgKi9cclxuICBwcml2YXRlIGxpc3RlblRvTWFwUG9pbnRlck1vdmUoKSB7XHJcbiAgICB0aGlzLnBvaW50ZXJNb3ZlTGlzdGVuZXIgPSB0aGlzLm1hcC5vbC5vbihcclxuICAgICAgJ3BvaW50ZXJtb3ZlJyxcclxuICAgICAgKGV2ZW50OiBPbE1hcEJyb3dzZXJQb2ludGVyRXZlbnQpID0+IHRoaXMub25Qb2ludGVyRXZlbnQoZXZlbnQsIHRoaXMucG9pbnRlclBvc2l0aW9uRGVsYXkpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gbWFwIGNsaWNrXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBsaXN0ZW5Ub01hcENsaWNrKCkge1xyXG4gICAgdGhpcy5tYXBDbGlja0xpc3RlbmVyID0gdGhpcy5tYXAub2wub24oXHJcbiAgICAgICdzaW5nbGVjbGljaycsXHJcbiAgICAgIChldmVudDogT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50KSA9PiB0aGlzLm9uUG9pbnRlckV2ZW50KGV2ZW50LCAwKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3AgbGlzdGVuaW5nIGZvciBtYXAgcG9pbnRlcm1vdmVcclxuICAgKi9cclxuICBwcml2YXRlIHVubGlzdGVuVG9NYXBQb2ludGVyTW92ZSgpIHtcclxuICAgIHRoaXMubWFwLm9sLnVuKHRoaXMucG9pbnRlck1vdmVMaXN0ZW5lci50eXBlLCB0aGlzLnBvaW50ZXJNb3ZlTGlzdGVuZXIubGlzdGVuZXIpO1xyXG4gICAgdGhpcy5wb2ludGVyTW92ZUxpc3RlbmVyID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCBsaXN0ZW5pbmcgZm9yIG1hcCBjbGlja3NcclxuICAgKi9cclxuICBwcml2YXRlIHVubGlzdGVuVG9NYXBDbGljaygpIHtcclxuICAgIHRoaXMubWFwLm9sLnVuKHRoaXMubWFwQ2xpY2tMaXN0ZW5lci50eXBlLCB0aGlzLm1hcENsaWNrTGlzdGVuZXIubGlzdGVuZXIpO1xyXG4gICAgdGhpcy5tYXBDbGlja0xpc3RlbmVyID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZW1pdCBkZWxheWVkIGNvb3JkaW5hdGUgKGxvbmdpdHVkZSwgbGF0aXR1ZGUgYXJyYXkpIGJhc2VkIG9uIHBvaW50ZXJNb3ZlRGVsYXkgb3Igb24gY2xpY2tcclxuICAgKiBAcGFyYW0gZXZlbnQgT0wgbWFwIGJyb3dzZXIgcG9pbnRlciBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25Qb2ludGVyRXZlbnQoZXZlbnQ6IE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCwgZGVsYXk6IG51bWJlcikge1xyXG4gICAgaWYgKGV2ZW50LmRyYWdnaW5nIHx8IHRoaXMubWVkaWFTZXJ2aWNlLmlzVG91Y2hTY3JlZW4oKSkge3JldHVybjsgfVxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmxhc3RUaW1lb3V0UmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHsgLy8gY2FuY2VsIHRpbWVvdXQgd2hlbiB0aGUgbW91c2UgbW92ZXNcclxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMubGFzdFRpbWVvdXRSZXF1ZXN0KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBsb25sYXQgPSB0cmFuc2Zvcm0oZXZlbnQuY29vcmRpbmF0ZSwgdGhpcy5tYXBQcm9qZWN0aW9uLCAnRVBTRzo0MzI2Jyk7XHJcbiAgICB0aGlzLmxhc3RUaW1lb3V0UmVxdWVzdCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLnBvaW50ZXJQb3NpdGlvbkNvb3JkLmVtaXQobG9ubGF0KTtcclxuICAgIH0sIGRlbGF5KTtcclxuICB9XHJcbn1cclxuIl19