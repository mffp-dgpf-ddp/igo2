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
var PointerPositionByKeyDirective = /** @class */ (function () {
    function PointerPositionByKeyDirective(component, mediaService) {
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
    Object.defineProperty(PointerPositionByKeyDirective.prototype, "map", {
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
    Object.defineProperty(PointerPositionByKeyDirective.prototype, "mapProjection", {
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
    PointerPositionByKeyDirective.prototype.ngOnInit = /**
     * Start listening to pointermove
     * \@internal
     * @return {?}
     */
    function () {
        this.listenToMapPointerMove();
        this.listenToMapClick();
        this.subscribeToKeyDown();
        this.subscribeToKeyUp();
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
    PointerPositionByKeyDirective.prototype.ngOnDestroy = /**
     * Stop listening to pointermove
     * \@internal
     * @return {?}
     */
    function () {
        this.unlistenToMapPointerMove();
        this.unlistenToMapClick();
        this.unsubscribeToKeyDown();
        this.unsubscribeToKeyUp();
    };
    /**
     * On map pointermove
     */
    /**
     * On map pointermove
     * @private
     * @return {?}
     */
    PointerPositionByKeyDirective.prototype.listenToMapPointerMove = /**
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
        function (event) { return _this.onPointerEvent(event, _this.pointerPositionByKeyDelay); }));
    };
    /**
     * On map click
     */
    /**
     * On map click
     * @private
     * @return {?}
     */
    PointerPositionByKeyDirective.prototype.listenToMapClick = /**
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
     * Subscribe to user defined key keyDown, hold down to activate the emit
     */
    /**
     * Subscribe to user defined key keyDown, hold down to activate the emit
     * @private
     * @return {?}
     */
    PointerPositionByKeyDirective.prototype.subscribeToKeyDown = /**
     * Subscribe to user defined key keyDown, hold down to activate the emit
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.unsubscribeToKeyDown();
        this.keyDown$$ = fromEvent(document, 'keydown')
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            // On user defined key is down,
            if (event.keyCode === _this.pointerPositionByKeyCode) {
                _this.definedKeyIsDown$.next(true);
                return;
            }
        }));
    };
    /**
     * Subscribe to user defined key keyUp, release to desactivate the emit
     */
    /**
     * Subscribe to user defined key keyUp, release to desactivate the emit
     * @private
     * @return {?}
     */
    PointerPositionByKeyDirective.prototype.subscribeToKeyUp = /**
     * Subscribe to user defined key keyUp, release to desactivate the emit
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.unsubscribeToKeyUp();
        this.keyUp$$ = fromEvent(document, 'keyup')
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            // When user defined key is released,
            if (event.keyCode === _this.pointerPositionByKeyCode) {
                _this.definedKeyIsDown$.next(false);
                return;
            }
        }));
    };
    /**
     * Stop listening for map pointermove
     */
    /**
     * Stop listening for map pointermove
     * @private
     * @return {?}
     */
    PointerPositionByKeyDirective.prototype.unlistenToMapPointerMove = /**
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
    PointerPositionByKeyDirective.prototype.unlistenToMapClick = /**
     * Stop listening for map clicks
     * @private
     * @return {?}
     */
    function () {
        this.map.ol.un(this.mapClickListener.type, this.mapClickListener.listener);
        this.mapClickListener = undefined;
    };
    /**
     * Unsubscribe to key down
     */
    /**
     * Unsubscribe to key down
     * @private
     * @return {?}
     */
    PointerPositionByKeyDirective.prototype.unsubscribeToKeyDown = /**
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
    /**
     * Unsubscribe to key up
     */
    /**
     * Unsubscribe to key up
     * @private
     * @return {?}
     */
    PointerPositionByKeyDirective.prototype.unsubscribeToKeyUp = /**
     * Unsubscribe to key up
     * @private
     * @return {?}
     */
    function () {
        if (this.keyUp$$ !== undefined) {
            this.keyUp$$.unsubscribe();
            this.keyUp$$ = undefined;
        }
    };
    /**
     * emit delayed coordinate (longitude, latitude array) based on pointerMoveDelay or on click
     * User must hold the defined key to allow the emit.
     * @param event OL map browser pointer event
     */
    /**
     * emit delayed coordinate (longitude, latitude array) based on pointerMoveDelay or on click
     * User must hold the defined key to allow the emit.
     * @private
     * @param {?} event OL map browser pointer event
     * @param {?} delay
     * @return {?}
     */
    PointerPositionByKeyDirective.prototype.onPointerEvent = /**
     * emit delayed coordinate (longitude, latitude array) based on pointerMoveDelay or on click
     * User must hold the defined key to allow the emit.
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
        if (this.definedKeyIsDown$.value) {
            /** @type {?} */
            var lonlat_1 = transform(event.coordinate, this.mapProjection, 'EPSG:4326');
            this.lastTimeoutRequest = setTimeout((/**
             * @return {?}
             */
            function () {
                _this.pointerPositionByKeyCoord.emit(lonlat_1);
            }), delay);
        }
    };
    PointerPositionByKeyDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoPointerPositionByKey]'
                },] }
    ];
    /** @nocollapse */
    PointerPositionByKeyDirective.ctorParameters = function () { return [
        { type: MapBrowserComponent, decorators: [{ type: Self }] },
        { type: MediaService }
    ]; };
    PointerPositionByKeyDirective.propDecorators = {
        pointerPositionByKeyDelay: [{ type: Input }],
        pointerPositionByKeyCode: [{ type: Input }],
        pointerPositionByKeyCoord: [{ type: Output }]
    };
    return PointerPositionByKeyDirective;
}());
export { PointerPositionByKeyDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXBvaW50ZXItcG9zaXRpb24tYnkta2V5LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9tYXAvc2hhcmVkL21hcC1wb2ludGVyLXBvc2l0aW9uLWJ5LWtleS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBRVosSUFBSSxFQUVMLE1BQU0sZUFBZSxDQUFDO0FBTXZCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBRWxGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDcEMsT0FBTyxFQUFnQixlQUFlLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxZQUFZLENBQUM7Ozs7Ozs7QUFPMUM7SUFnREUsdUNBQ2tCLFNBQThCLEVBQ3RDLFlBQTBCO1FBRGxCLGNBQVMsR0FBVCxTQUFTLENBQXFCO1FBQ3RDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBM0M1QixzQkFBaUIsR0FBNkIsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7UUFpQnhFLDhCQUF5QixHQUFXLElBQUksQ0FBQzs7OztRQUt6Qyw2QkFBd0IsR0FBVyxFQUFFLENBQUM7Ozs7UUFLckMsOEJBQXlCLEdBQUcsSUFBSSxZQUFZLEVBQW9CLENBQUM7SUFpQnZFLENBQUM7SUFYTCxzQkFBSSw4Q0FBRztRQUpQOzs7V0FHRzs7Ozs7O1FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO1FBQzVCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksd0RBQWE7Ozs7UUFBakI7WUFDRSxPQUFPLENBQUMsbUJBQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQVUsQ0FBQyxDQUFDLFVB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LHlCQUF5QixDQUFDLElBQUksQ0FBQyxRQUFNLENBQUMsQ0FBQztZQUM5QyxDQUFDLEdBQUUsS0FBSyxDQUFDLENBQUM7U0FDWDtJQUNELENBQUM7O2dCQWpMRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtpQkFDdEM7Ozs7Z0JBYlEsbUJBQW1CLHVCQTREdkIsSUFBSTtnQkF4REEsWUFBWTs7OzRDQStCbEIsS0FBSzsyQ0FLTCxLQUFLOzRDQUtMLE1BQU07O0lBZ0pULG9DQUFDO0NBQUEsQUFsTEQsSUFrTEM7U0EvS1ksNkJBQTZCOzs7Ozs7SUFFeEMsa0RBQWdDOzs7OztJQUNoQyxnREFBOEI7Ozs7O0lBQzlCLDBEQUFpRjs7Ozs7SUFFakYsMkRBQTJCOzs7Ozs7SUFLM0IsNERBQThDOzs7Ozs7SUFLOUMseURBQTJDOzs7OztJQUszQyxrRUFBa0Q7Ozs7O0lBS2xELGlFQUErQzs7Ozs7SUFLL0Msa0VBQTJFOzs7OztJQWV6RSxrREFBOEM7Ozs7O0lBQzlDLHFEQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT25EZXN0cm95LFxyXG4gIFNlbGYsXHJcbiAgT25Jbml0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBNYXBCcm93c2VyUG9pbnRlckV2ZW50IGFzIE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCB9IGZyb20gJ29sL01hcEJyb3dzZXJFdmVudCc7XHJcbmltcG9ydCB7IExpc3RlbmVyRnVuY3Rpb24gfSBmcm9tICdvbC9ldmVudHMnO1xyXG5cclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwL3NoYXJlZC9tYXAnO1xyXG5pbXBvcnQgeyBNYXBCcm93c2VyQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vbWFwL21hcC1icm93c2VyL21hcC1icm93c2VyLmNvbXBvbmVudCc7XHJcblxyXG5pbXBvcnQgeyB0cmFuc2Zvcm0gfSBmcm9tICdvbC9wcm9qJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBCZWhhdmlvclN1YmplY3QsIGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBNZWRpYVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuLyoqXHJcbiAqIFRoaXMgZGlyZWN0aXZlIHJldHVybiB0aGUgcG9pbnRlciBjb29yZGluYXRlIChvbiBjbGljayBvciBwb2ludGVybW92ZSlcclxuICogaW4gW2xvbmdpdHVkZSwgbGF0aXR1ZGVdLCBkZWxheWVkIGJ5IGluIGlucHV0IChwb2ludGVyTW92ZURlbGF5KVxyXG4gKiB0byBhdm9pZCB0b28gbWFueSBlbWl0dGVkIHZhbHVlcy5cclxuICogVXNlciBuZWVkcyB0byBob2xkIHRoZSBrZXkgZGVmaW5lZCBieSBwb2ludGVyQnlLZXlFdmVudEtleUNvZGUgdG8gZW1pdCBhIGNvb3JkLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaWdvUG9pbnRlclBvc2l0aW9uQnlLZXldJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUG9pbnRlclBvc2l0aW9uQnlLZXlEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIHByaXZhdGUga2V5RG93biQkOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBrZXlVcCQkOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBkZWZpbmVkS2V5SXNEb3duJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XHJcblxyXG4gIHByaXZhdGUgbGFzdFRpbWVvdXRSZXF1ZXN0O1xyXG5cclxuICAvKipcclxuICAgKiBMaXN0ZW5lciB0byB0aGUgcG9pbnRlciBtb3ZlIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBwb2ludGVyTW92ZUxpc3RlbmVyOiBMaXN0ZW5lckZ1bmN0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBMaXN0ZW5lciB0byB0aGUgbWFwIGNsaWNrIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBtYXBDbGlja0xpc3RlbmVyOiBMaXN0ZW5lckZ1bmN0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBEZWxheSBiZWZvcmUgZW1pdHRpbmcgYW4gZXZlbnRcclxuICAgKi9cclxuICBASW5wdXQoKSBwb2ludGVyUG9zaXRpb25CeUtleURlbGF5OiBudW1iZXIgPSAxMDAwO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUga2V5IHByZXNzZWQgKG11c3QgYmUgaG9sZCkgdG8gdHJpZ2dlciB0aGUgb3V0cHV0XHJcbiAgICovXHJcbiAgQElucHV0KCkgcG9pbnRlclBvc2l0aW9uQnlLZXlDb2RlOiBudW1iZXIgPSAxNztcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBwb2ludGVyIG1vdmUsIGRlbGF5ZWQgYnkgcG9pbnRlck1vdmVEZWxheVxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBwb2ludGVyUG9zaXRpb25CeUtleUNvb3JkID0gbmV3IEV2ZW50RW1pdHRlcjxbbnVtYmVyLCBudW1iZXJdPigpO1xyXG5cclxuICAvKipcclxuICAgKiBJR08gbWFwXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAge1xyXG4gICAgcmV0dXJuIHRoaXMuY29tcG9uZW50Lm1hcDtcclxuICB9XHJcblxyXG4gIGdldCBtYXBQcm9qZWN0aW9uKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKHRoaXMuY29tcG9uZW50Lm1hcCBhcyBJZ29NYXApLnByb2plY3Rpb247XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBTZWxmKCkgcHJpdmF0ZSBjb21wb25lbnQ6IE1hcEJyb3dzZXJDb21wb25lbnQsXHJcbiAgICBwcml2YXRlIG1lZGlhU2VydmljZTogTWVkaWFTZXJ2aWNlXHJcbiAgKSB7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnQgbGlzdGVuaW5nIHRvIHBvaW50ZXJtb3ZlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmxpc3RlblRvTWFwUG9pbnRlck1vdmUoKTtcclxuICAgIHRoaXMubGlzdGVuVG9NYXBDbGljaygpO1xyXG4gICAgdGhpcy5zdWJzY3JpYmVUb0tleURvd24oKTtcclxuICAgIHRoaXMuc3Vic2NyaWJlVG9LZXlVcCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCBsaXN0ZW5pbmcgdG8gcG9pbnRlcm1vdmVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMudW5saXN0ZW5Ub01hcFBvaW50ZXJNb3ZlKCk7XHJcbiAgICB0aGlzLnVubGlzdGVuVG9NYXBDbGljaygpO1xyXG4gICAgdGhpcy51bnN1YnNjcmliZVRvS2V5RG93bigpO1xyXG4gICAgdGhpcy51bnN1YnNjcmliZVRvS2V5VXAoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIG1hcCBwb2ludGVybW92ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgbGlzdGVuVG9NYXBQb2ludGVyTW92ZSgpIHtcclxuICAgIHRoaXMucG9pbnRlck1vdmVMaXN0ZW5lciA9IHRoaXMubWFwLm9sLm9uKFxyXG4gICAgICAncG9pbnRlcm1vdmUnLFxyXG4gICAgICAoZXZlbnQ6IE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCkgPT4gdGhpcy5vblBvaW50ZXJFdmVudChldmVudCwgdGhpcy5wb2ludGVyUG9zaXRpb25CeUtleURlbGF5KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIG1hcCBjbGlja1xyXG4gICAqL1xyXG4gIHByaXZhdGUgbGlzdGVuVG9NYXBDbGljaygpIHtcclxuICAgIHRoaXMubWFwQ2xpY2tMaXN0ZW5lciA9IHRoaXMubWFwLm9sLm9uKFxyXG4gICAgICAnc2luZ2xlY2xpY2snLFxyXG4gICAgICAoZXZlbnQ6IE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCkgPT4gdGhpcy5vblBvaW50ZXJFdmVudChldmVudCwgMClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpYmUgdG8gdXNlciBkZWZpbmVkIGtleSBrZXlEb3duLCBob2xkIGRvd24gdG8gYWN0aXZhdGUgdGhlIGVtaXRcclxuICAgKi9cclxuICBwcml2YXRlIHN1YnNjcmliZVRvS2V5RG93bigpIHtcclxuICAgIHRoaXMudW5zdWJzY3JpYmVUb0tleURvd24oKTtcclxuICAgIHRoaXMua2V5RG93biQkID0gZnJvbUV2ZW50KGRvY3VtZW50LCAna2V5ZG93bicpXHJcbiAgICAuc3Vic2NyaWJlKChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICAvLyBPbiB1c2VyIGRlZmluZWQga2V5IGlzIGRvd24sXHJcbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSB0aGlzLnBvaW50ZXJQb3NpdGlvbkJ5S2V5Q29kZSkge1xyXG4gICAgICAgIHRoaXMuZGVmaW5lZEtleUlzRG93biQubmV4dCh0cnVlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBTdWJzY3JpYmUgdG8gdXNlciBkZWZpbmVkIGtleSBrZXlVcCwgcmVsZWFzZSB0byBkZXNhY3RpdmF0ZSB0aGUgZW1pdFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9LZXlVcCgpIHtcclxuICAgIHRoaXMudW5zdWJzY3JpYmVUb0tleVVwKCk7XHJcbiAgICB0aGlzLmtleVVwJCQgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdrZXl1cCcpXHJcbiAgICAuc3Vic2NyaWJlKChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICAvLyBXaGVuIHVzZXIgZGVmaW5lZCBrZXkgaXMgcmVsZWFzZWQsXHJcbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSB0aGlzLnBvaW50ZXJQb3NpdGlvbkJ5S2V5Q29kZSkge1xyXG4gICAgICAgIHRoaXMuZGVmaW5lZEtleUlzRG93biQubmV4dChmYWxzZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3AgbGlzdGVuaW5nIGZvciBtYXAgcG9pbnRlcm1vdmVcclxuICAgKi9cclxuICBwcml2YXRlIHVubGlzdGVuVG9NYXBQb2ludGVyTW92ZSgpIHtcclxuICAgIHRoaXMubWFwLm9sLnVuKHRoaXMucG9pbnRlck1vdmVMaXN0ZW5lci50eXBlLCB0aGlzLnBvaW50ZXJNb3ZlTGlzdGVuZXIubGlzdGVuZXIpO1xyXG4gICAgdGhpcy5wb2ludGVyTW92ZUxpc3RlbmVyID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCBsaXN0ZW5pbmcgZm9yIG1hcCBjbGlja3NcclxuICAgKi9cclxuICBwcml2YXRlIHVubGlzdGVuVG9NYXBDbGljaygpIHtcclxuICAgIHRoaXMubWFwLm9sLnVuKHRoaXMubWFwQ2xpY2tMaXN0ZW5lci50eXBlLCB0aGlzLm1hcENsaWNrTGlzdGVuZXIubGlzdGVuZXIpO1xyXG4gICAgdGhpcy5tYXBDbGlja0xpc3RlbmVyID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5zdWJzY3JpYmUgdG8ga2V5IGRvd25cclxuICAgKi9cclxuICBwcml2YXRlIHVuc3Vic2NyaWJlVG9LZXlEb3duKCkge1xyXG4gICAgaWYgKHRoaXMua2V5RG93biQkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5rZXlEb3duJCQudW5zdWJzY3JpYmUoKTtcclxuICAgICAgdGhpcy5rZXlEb3duJCQgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbnN1YnNjcmliZSB0byBrZXkgdXBcclxuICAgKi9cclxuICBwcml2YXRlIHVuc3Vic2NyaWJlVG9LZXlVcCgpIHtcclxuICAgIGlmICh0aGlzLmtleVVwJCQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmtleVVwJCQudW5zdWJzY3JpYmUoKTtcclxuICAgICAgdGhpcy5rZXlVcCQkID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZW1pdCBkZWxheWVkIGNvb3JkaW5hdGUgKGxvbmdpdHVkZSwgbGF0aXR1ZGUgYXJyYXkpIGJhc2VkIG9uIHBvaW50ZXJNb3ZlRGVsYXkgb3Igb24gY2xpY2tcclxuICAgKiBVc2VyIG11c3QgaG9sZCB0aGUgZGVmaW5lZCBrZXkgdG8gYWxsb3cgdGhlIGVtaXQuXHJcbiAgICogQHBhcmFtIGV2ZW50IE9MIG1hcCBicm93c2VyIHBvaW50ZXIgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uUG9pbnRlckV2ZW50KGV2ZW50OiBPbE1hcEJyb3dzZXJQb2ludGVyRXZlbnQsIGRlbGF5OiBudW1iZXIpIHtcclxuICAgIGlmIChldmVudC5kcmFnZ2luZyB8fCB0aGlzLm1lZGlhU2VydmljZS5pc1RvdWNoU2NyZWVuKCkpIHtyZXR1cm47IH1cclxuICAgIGlmICh0eXBlb2YgdGhpcy5sYXN0VGltZW91dFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7IC8vIGNhbmNlbCB0aW1lb3V0IHdoZW4gdGhlIG1vdXNlIG1vdmVzXHJcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmxhc3RUaW1lb3V0UmVxdWVzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZGVmaW5lZEtleUlzRG93biQudmFsdWUpIHtcclxuICAgIGNvbnN0IGxvbmxhdCA9IHRyYW5zZm9ybShldmVudC5jb29yZGluYXRlLCB0aGlzLm1hcFByb2plY3Rpb24sICdFUFNHOjQzMjYnKTtcclxuICAgIHRoaXMubGFzdFRpbWVvdXRSZXF1ZXN0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMucG9pbnRlclBvc2l0aW9uQnlLZXlDb29yZC5lbWl0KGxvbmxhdCk7XHJcbiAgICB9LCBkZWxheSk7XHJcbiAgfVxyXG4gIH1cclxufVxyXG4iXX0=