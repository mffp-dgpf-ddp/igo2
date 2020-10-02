/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, Output, EventEmitter, Self } from '@angular/core';
import { MapBrowserComponent } from '../../map/map-browser/map-browser.component';
import { transform } from 'ol/proj';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { MediaService } from '@igo2/core';
/**
 * This directive return the pointer coordinate (on click or pointermove)
 * in [longitude, latitude], delayed by in input (pointerMoveDelay)
 * to avoid too many emitted values.
 * User needs to hold the key defined by pointerByKeyEventKeyCode to emit a coord.
 */
export class PointerPositionByKeyDirective {
    /**
     * @param {?} component
     * @param {?} mediaService
     */
    constructor(component, mediaService) {
        this.component = component;
        this.mediaService = mediaService;
        this.definedKeyIsDown$ = new BehaviorSubject(false);
        /**
         * Delay before emitting an event
         */
        this.pointerPositionByKeyDelay = 1000;
        /**
         * The key pressed (must be hold) to trigger the output
         */
        this.pointerPositionByKeyCode = 17;
        /**
         * Event emitted when the pointer move, delayed by pointerMoveDelay
         */
        this.pointerPositionByKeyCoord = new EventEmitter();
    }
    /**
     * IGO map
     * \@internal
     * @return {?}
     */
    get map() {
        return this.component.map;
    }
    /**
     * @return {?}
     */
    get mapProjection() {
        return ((/** @type {?} */ (this.component.map))).projection;
    }
    /**
     * Start listening to pointermove
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        this.listenToMapPointerMove();
        this.listenToMapClick();
        this.subscribeToKeyDown();
        this.subscribeToKeyUp();
    }
    /**
     * Stop listening to pointermove
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        this.unlistenToMapPointerMove();
        this.unlistenToMapClick();
        this.unsubscribeToKeyDown();
        this.unsubscribeToKeyUp();
    }
    /**
     * On map pointermove
     * @private
     * @return {?}
     */
    listenToMapPointerMove() {
        this.pointerMoveListener = this.map.ol.on('pointermove', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => this.onPointerEvent(event, this.pointerPositionByKeyDelay)));
    }
    /**
     * On map click
     * @private
     * @return {?}
     */
    listenToMapClick() {
        this.mapClickListener = this.map.ol.on('singleclick', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => this.onPointerEvent(event, 0)));
    }
    /**
     * Subscribe to user defined key keyDown, hold down to activate the emit
     * @private
     * @return {?}
     */
    subscribeToKeyDown() {
        this.unsubscribeToKeyDown();
        this.keyDown$$ = fromEvent(document, 'keydown')
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            // On user defined key is down,
            if (event.keyCode === this.pointerPositionByKeyCode) {
                this.definedKeyIsDown$.next(true);
                return;
            }
        }));
    }
    /**
     * Subscribe to user defined key keyUp, release to desactivate the emit
     * @private
     * @return {?}
     */
    subscribeToKeyUp() {
        this.unsubscribeToKeyUp();
        this.keyUp$$ = fromEvent(document, 'keyup')
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            // When user defined key is released,
            if (event.keyCode === this.pointerPositionByKeyCode) {
                this.definedKeyIsDown$.next(false);
                return;
            }
        }));
    }
    /**
     * Stop listening for map pointermove
     * @private
     * @return {?}
     */
    unlistenToMapPointerMove() {
        this.map.ol.un(this.pointerMoveListener.type, this.pointerMoveListener.listener);
        this.pointerMoveListener = undefined;
    }
    /**
     * Stop listening for map clicks
     * @private
     * @return {?}
     */
    unlistenToMapClick() {
        this.map.ol.un(this.mapClickListener.type, this.mapClickListener.listener);
        this.mapClickListener = undefined;
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
    /**
     * Unsubscribe to key up
     * @private
     * @return {?}
     */
    unsubscribeToKeyUp() {
        if (this.keyUp$$ !== undefined) {
            this.keyUp$$.unsubscribe();
            this.keyUp$$ = undefined;
        }
    }
    /**
     * emit delayed coordinate (longitude, latitude array) based on pointerMoveDelay or on click
     * User must hold the defined key to allow the emit.
     * @private
     * @param {?} event OL map browser pointer event
     * @param {?} delay
     * @return {?}
     */
    onPointerEvent(event, delay) {
        if (event.dragging || this.mediaService.isTouchScreen()) {
            return;
        }
        if (typeof this.lastTimeoutRequest !== 'undefined') { // cancel timeout when the mouse moves
            clearTimeout(this.lastTimeoutRequest);
        }
        if (this.definedKeyIsDown$.value) {
            /** @type {?} */
            const lonlat = transform(event.coordinate, this.mapProjection, 'EPSG:4326');
            this.lastTimeoutRequest = setTimeout((/**
             * @return {?}
             */
            () => {
                this.pointerPositionByKeyCoord.emit(lonlat);
            }), delay);
        }
    }
}
PointerPositionByKeyDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoPointerPositionByKey]'
            },] }
];
/** @nocollapse */
PointerPositionByKeyDirective.ctorParameters = () => [
    { type: MapBrowserComponent, decorators: [{ type: Self }] },
    { type: MediaService }
];
PointerPositionByKeyDirective.propDecorators = {
    pointerPositionByKeyDelay: [{ type: Input }],
    pointerPositionByKeyCode: [{ type: Input }],
    pointerPositionByKeyCoord: [{ type: Output }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    PointerPositionByKeyDirective.prototype.keyDown$$;
    /**
     * @type {?}
     * @private
     */
    PointerPositionByKeyDirective.prototype.keyUp$$;
    /**
     * @type {?}
     * @private
     */
    PointerPositionByKeyDirective.prototype.definedKeyIsDown$;
    /**
     * @type {?}
     * @private
     */
    PointerPositionByKeyDirective.prototype.lastTimeoutRequest;
    /**
     * Listener to the pointer move event
     * @type {?}
     * @private
     */
    PointerPositionByKeyDirective.prototype.pointerMoveListener;
    /**
     * Listener to the map click event
     * @type {?}
     * @private
     */
    PointerPositionByKeyDirective.prototype.mapClickListener;
    /**
     * Delay before emitting an event
     * @type {?}
     */
    PointerPositionByKeyDirective.prototype.pointerPositionByKeyDelay;
    /**
     * The key pressed (must be hold) to trigger the output
     * @type {?}
     */
    PointerPositionByKeyDirective.prototype.pointerPositionByKeyCode;
    /**
     * Event emitted when the pointer move, delayed by pointerMoveDelay
     * @type {?}
     */
    PointerPositionByKeyDirective.prototype.pointerPositionByKeyCoord;
    /**
     * @type {?}
     * @private
     */
    PointerPositionByKeyDirective.prototype.component;
    /**
     * @type {?}
     * @private
     */
    PointerPositionByKeyDirective.prototype.mediaService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXBvaW50ZXItcG9zaXRpb24tYnkta2V5LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9tYXAvc2hhcmVkL21hcC1wb2ludGVyLXBvc2l0aW9uLWJ5LWtleS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBRVosSUFBSSxFQUVMLE1BQU0sZUFBZSxDQUFDO0FBTXZCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBRWxGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDcEMsT0FBTyxFQUFnQixlQUFlLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxZQUFZLENBQUM7Ozs7Ozs7QUFVMUMsTUFBTSxPQUFPLDZCQUE2Qjs7Ozs7SUE2Q3hDLFlBQ2tCLFNBQThCLEVBQ3RDLFlBQTBCO1FBRGxCLGNBQVMsR0FBVCxTQUFTLENBQXFCO1FBQ3RDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBM0M1QixzQkFBaUIsR0FBNkIsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7UUFpQnhFLDhCQUF5QixHQUFXLElBQUksQ0FBQzs7OztRQUt6Qyw2QkFBd0IsR0FBVyxFQUFFLENBQUM7Ozs7UUFLckMsOEJBQXlCLEdBQUcsSUFBSSxZQUFZLEVBQW9CLENBQUM7SUFpQnZFLENBQUM7Ozs7OztJQVhMLElBQUksR0FBRztRQUNMLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7SUFDNUIsQ0FBQzs7OztJQUVELElBQUksYUFBYTtRQUNmLE9BQU8sQ0FBQyxtQkFBQSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDO0lBQ25E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QThDOzs7Ozs7SUFLOUMseURBQTJDOzs7OztJQUszQyxrRUFBa0Q7Ozs7O0lBS2xELGlFQUErQzs7Ozs7SUFLL0Msa0VBQTJFOzs7OztJQWV6RSxrREFBOEM7Ozs7O0lBQzlDLHFEQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT25EZXN0cm95LFxyXG4gIFNlbGYsXHJcbiAgT25Jbml0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBNYXBCcm93c2VyUG9pbnRlckV2ZW50IGFzIE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCB9IGZyb20gJ29sL01hcEJyb3dzZXJFdmVudCc7XHJcbmltcG9ydCB7IExpc3RlbmVyRnVuY3Rpb24gfSBmcm9tICdvbC9ldmVudHMnO1xyXG5cclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwL3NoYXJlZC9tYXAnO1xyXG5pbXBvcnQgeyBNYXBCcm93c2VyQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vbWFwL21hcC1icm93c2VyL21hcC1icm93c2VyLmNvbXBvbmVudCc7XHJcblxyXG5pbXBvcnQgeyB0cmFuc2Zvcm0gfSBmcm9tICdvbC9wcm9qJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBCZWhhdmlvclN1YmplY3QsIGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBNZWRpYVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuLyoqXHJcbiAqIFRoaXMgZGlyZWN0aXZlIHJldHVybiB0aGUgcG9pbnRlciBjb29yZGluYXRlIChvbiBjbGljayBvciBwb2ludGVybW92ZSlcclxuICogaW4gW2xvbmdpdHVkZSwgbGF0aXR1ZGVdLCBkZWxheWVkIGJ5IGluIGlucHV0IChwb2ludGVyTW92ZURlbGF5KVxyXG4gKiB0byBhdm9pZCB0b28gbWFueSBlbWl0dGVkIHZhbHVlcy5cclxuICogVXNlciBuZWVkcyB0byBob2xkIHRoZSBrZXkgZGVmaW5lZCBieSBwb2ludGVyQnlLZXlFdmVudEtleUNvZGUgdG8gZW1pdCBhIGNvb3JkLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaWdvUG9pbnRlclBvc2l0aW9uQnlLZXldJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUG9pbnRlclBvc2l0aW9uQnlLZXlEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIHByaXZhdGUga2V5RG93biQkOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBrZXlVcCQkOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBkZWZpbmVkS2V5SXNEb3duJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XHJcblxyXG4gIHByaXZhdGUgbGFzdFRpbWVvdXRSZXF1ZXN0O1xyXG5cclxuICAvKipcclxuICAgKiBMaXN0ZW5lciB0byB0aGUgcG9pbnRlciBtb3ZlIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBwb2ludGVyTW92ZUxpc3RlbmVyOiBMaXN0ZW5lckZ1bmN0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBMaXN0ZW5lciB0byB0aGUgbWFwIGNsaWNrIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBtYXBDbGlja0xpc3RlbmVyOiBMaXN0ZW5lckZ1bmN0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBEZWxheSBiZWZvcmUgZW1pdHRpbmcgYW4gZXZlbnRcclxuICAgKi9cclxuICBASW5wdXQoKSBwb2ludGVyUG9zaXRpb25CeUtleURlbGF5OiBudW1iZXIgPSAxMDAwO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUga2V5IHByZXNzZWQgKG11c3QgYmUgaG9sZCkgdG8gdHJpZ2dlciB0aGUgb3V0cHV0XHJcbiAgICovXHJcbiAgQElucHV0KCkgcG9pbnRlclBvc2l0aW9uQnlLZXlDb2RlOiBudW1iZXIgPSAxNztcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBwb2ludGVyIG1vdmUsIGRlbGF5ZWQgYnkgcG9pbnRlck1vdmVEZWxheVxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBwb2ludGVyUG9zaXRpb25CeUtleUNvb3JkID0gbmV3IEV2ZW50RW1pdHRlcjxbbnVtYmVyLCBudW1iZXJdPigpO1xyXG5cclxuICAvKipcclxuICAgKiBJR08gbWFwXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAge1xyXG4gICAgcmV0dXJuIHRoaXMuY29tcG9uZW50Lm1hcDtcclxuICB9XHJcblxyXG4gIGdldCBtYXBQcm9qZWN0aW9uKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKHRoaXMuY29tcG9uZW50Lm1hcCBhcyBJZ29NYXApLnByb2plY3Rpb247XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBTZWxmKCkgcHJpdmF0ZSBjb21wb25lbnQ6IE1hcEJyb3dzZXJDb21wb25lbnQsXHJcbiAgICBwcml2YXRlIG1lZGlhU2VydmljZTogTWVkaWFTZXJ2aWNlXHJcbiAgKSB7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnQgbGlzdGVuaW5nIHRvIHBvaW50ZXJtb3ZlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmxpc3RlblRvTWFwUG9pbnRlck1vdmUoKTtcclxuICAgIHRoaXMubGlzdGVuVG9NYXBDbGljaygpO1xyXG4gICAgdGhpcy5zdWJzY3JpYmVUb0tleURvd24oKTtcclxuICAgIHRoaXMuc3Vic2NyaWJlVG9LZXlVcCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCBsaXN0ZW5pbmcgdG8gcG9pbnRlcm1vdmVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMudW5saXN0ZW5Ub01hcFBvaW50ZXJNb3ZlKCk7XHJcbiAgICB0aGlzLnVubGlzdGVuVG9NYXBDbGljaygpO1xyXG4gICAgdGhpcy51bnN1YnNjcmliZVRvS2V5RG93bigpO1xyXG4gICAgdGhpcy51bnN1YnNjcmliZVRvS2V5VXAoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIG1hcCBwb2ludGVybW92ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgbGlzdGVuVG9NYXBQb2ludGVyTW92ZSgpIHtcclxuICAgIHRoaXMucG9pbnRlck1vdmVMaXN0ZW5lciA9IHRoaXMubWFwLm9sLm9uKFxyXG4gICAgICAncG9pbnRlcm1vdmUnLFxyXG4gICAgICAoZXZlbnQ6IE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCkgPT4gdGhpcy5vblBvaW50ZXJFdmVudChldmVudCwgdGhpcy5wb2ludGVyUG9zaXRpb25CeUtleURlbGF5KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIG1hcCBjbGlja1xyXG4gICAqL1xyXG4gIHByaXZhdGUgbGlzdGVuVG9NYXBDbGljaygpIHtcclxuICAgIHRoaXMubWFwQ2xpY2tMaXN0ZW5lciA9IHRoaXMubWFwLm9sLm9uKFxyXG4gICAgICAnc2luZ2xlY2xpY2snLFxyXG4gICAgICAoZXZlbnQ6IE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCkgPT4gdGhpcy5vblBvaW50ZXJFdmVudChldmVudCwgMClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpYmUgdG8gdXNlciBkZWZpbmVkIGtleSBrZXlEb3duLCBob2xkIGRvd24gdG8gYWN0aXZhdGUgdGhlIGVtaXRcclxuICAgKi9cclxuICBwcml2YXRlIHN1YnNjcmliZVRvS2V5RG93bigpIHtcclxuICAgIHRoaXMudW5zdWJzY3JpYmVUb0tleURvd24oKTtcclxuICAgIHRoaXMua2V5RG93biQkID0gZnJvbUV2ZW50KGRvY3VtZW50LCAna2V5ZG93bicpXHJcbiAgICAuc3Vic2NyaWJlKChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICAvLyBPbiB1c2VyIGRlZmluZWQga2V5IGlzIGRvd24sXHJcbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSB0aGlzLnBvaW50ZXJQb3NpdGlvbkJ5S2V5Q29kZSkge1xyXG4gICAgICAgIHRoaXMuZGVmaW5lZEtleUlzRG93biQubmV4dCh0cnVlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBTdWJzY3JpYmUgdG8gdXNlciBkZWZpbmVkIGtleSBrZXlVcCwgcmVsZWFzZSB0byBkZXNhY3RpdmF0ZSB0aGUgZW1pdFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9LZXlVcCgpIHtcclxuICAgIHRoaXMudW5zdWJzY3JpYmVUb0tleVVwKCk7XHJcbiAgICB0aGlzLmtleVVwJCQgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdrZXl1cCcpXHJcbiAgICAuc3Vic2NyaWJlKChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICAvLyBXaGVuIHVzZXIgZGVmaW5lZCBrZXkgaXMgcmVsZWFzZWQsXHJcbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSB0aGlzLnBvaW50ZXJQb3NpdGlvbkJ5S2V5Q29kZSkge1xyXG4gICAgICAgIHRoaXMuZGVmaW5lZEtleUlzRG93biQubmV4dChmYWxzZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3AgbGlzdGVuaW5nIGZvciBtYXAgcG9pbnRlcm1vdmVcclxuICAgKi9cclxuICBwcml2YXRlIHVubGlzdGVuVG9NYXBQb2ludGVyTW92ZSgpIHtcclxuICAgIHRoaXMubWFwLm9sLnVuKHRoaXMucG9pbnRlck1vdmVMaXN0ZW5lci50eXBlLCB0aGlzLnBvaW50ZXJNb3ZlTGlzdGVuZXIubGlzdGVuZXIpO1xyXG4gICAgdGhpcy5wb2ludGVyTW92ZUxpc3RlbmVyID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCBsaXN0ZW5pbmcgZm9yIG1hcCBjbGlja3NcclxuICAgKi9cclxuICBwcml2YXRlIHVubGlzdGVuVG9NYXBDbGljaygpIHtcclxuICAgIHRoaXMubWFwLm9sLnVuKHRoaXMubWFwQ2xpY2tMaXN0ZW5lci50eXBlLCB0aGlzLm1hcENsaWNrTGlzdGVuZXIubGlzdGVuZXIpO1xyXG4gICAgdGhpcy5tYXBDbGlja0xpc3RlbmVyID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5zdWJzY3JpYmUgdG8ga2V5IGRvd25cclxuICAgKi9cclxuICBwcml2YXRlIHVuc3Vic2NyaWJlVG9LZXlEb3duKCkge1xyXG4gICAgaWYgKHRoaXMua2V5RG93biQkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5rZXlEb3duJCQudW5zdWJzY3JpYmUoKTtcclxuICAgICAgdGhpcy5rZXlEb3duJCQgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbnN1YnNjcmliZSB0byBrZXkgdXBcclxuICAgKi9cclxuICBwcml2YXRlIHVuc3Vic2NyaWJlVG9LZXlVcCgpIHtcclxuICAgIGlmICh0aGlzLmtleVVwJCQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmtleVVwJCQudW5zdWJzY3JpYmUoKTtcclxuICAgICAgdGhpcy5rZXlVcCQkID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZW1pdCBkZWxheWVkIGNvb3JkaW5hdGUgKGxvbmdpdHVkZSwgbGF0aXR1ZGUgYXJyYXkpIGJhc2VkIG9uIHBvaW50ZXJNb3ZlRGVsYXkgb3Igb24gY2xpY2tcclxuICAgKiBVc2VyIG11c3QgaG9sZCB0aGUgZGVmaW5lZCBrZXkgdG8gYWxsb3cgdGhlIGVtaXQuXHJcbiAgICogQHBhcmFtIGV2ZW50IE9MIG1hcCBicm93c2VyIHBvaW50ZXIgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uUG9pbnRlckV2ZW50KGV2ZW50OiBPbE1hcEJyb3dzZXJQb2ludGVyRXZlbnQsIGRlbGF5OiBudW1iZXIpIHtcclxuICAgIGlmIChldmVudC5kcmFnZ2luZyB8fCB0aGlzLm1lZGlhU2VydmljZS5pc1RvdWNoU2NyZWVuKCkpIHtyZXR1cm47IH1cclxuICAgIGlmICh0eXBlb2YgdGhpcy5sYXN0VGltZW91dFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7IC8vIGNhbmNlbCB0aW1lb3V0IHdoZW4gdGhlIG1vdXNlIG1vdmVzXHJcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmxhc3RUaW1lb3V0UmVxdWVzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZGVmaW5lZEtleUlzRG93biQudmFsdWUpIHtcclxuICAgIGNvbnN0IGxvbmxhdCA9IHRyYW5zZm9ybShldmVudC5jb29yZGluYXRlLCB0aGlzLm1hcFByb2plY3Rpb24sICdFUFNHOjQzMjYnKTtcclxuICAgIHRoaXMubGFzdFRpbWVvdXRSZXF1ZXN0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMucG9pbnRlclBvc2l0aW9uQnlLZXlDb29yZC5lbWl0KGxvbmxhdCk7XHJcbiAgICB9LCBkZWxheSk7XHJcbiAgfVxyXG4gIH1cclxufVxyXG4iXX0=