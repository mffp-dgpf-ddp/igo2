/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { VectorLayer } from '../shared/layers';
var TrackFeatureButtonComponent = /** @class */ (function () {
    function TrackFeatureButtonComponent() {
        this.trackFeature = false;
        this.color = 'primary';
    }
    Object.defineProperty(TrackFeatureButtonComponent.prototype, "options", {
        get: /**
         * @return {?}
         */
        function () {
            if (!this.layer) {
                return;
            }
            return this.layer.options;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TrackFeatureButtonComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.color = this.trackFeature ? 'primary' : 'basic';
    };
    /**
     * @return {?}
     */
    TrackFeatureButtonComponent.prototype.toggleTrackFeature = /**
     * @return {?}
     */
    function () {
        if (this.trackFeature) {
            this.layer.disableTrackFeature(this.layer.options.trackFeature);
            this.color = 'basic';
        }
        else {
            this.layer.enableTrackFeature(this.layer.options.trackFeature);
            this.color = 'primary';
        }
        this.trackFeature = !this.trackFeature;
    };
    TrackFeatureButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-track-feature-button',
                    template: "<button *ngIf=\"options.trackFeature\"\r\n  mat-icon-button\r\n  collapsibleButton\r\n  tooltip-position=\"below\"\r\n  matTooltipShowDelay=\"500\"\r\n  [matTooltip]=\"'igo.geo.layer.trackFeature' | translate\"\r\n  [color]=\"color\"\r\n  (click)=\"toggleTrackFeature()\">\r\n  <mat-icon svgIcon=\"crosshairs-gps\"></mat-icon>\r\n</button>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    TrackFeatureButtonComponent.ctorParameters = function () { return []; };
    TrackFeatureButtonComponent.propDecorators = {
        layer: [{ type: Input }],
        trackFeature: [{ type: Input }]
    };
    return TrackFeatureButtonComponent;
}());
export { TrackFeatureButtonComponent };
if (false) {
    /** @type {?} */
    TrackFeatureButtonComponent.prototype.layer;
    /** @type {?} */
    TrackFeatureButtonComponent.prototype.trackFeature;
    /** @type {?} */
    TrackFeatureButtonComponent.prototype.color;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2stZmVhdHVyZS1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2xheWVyL3RyYWNrLWZlYXR1cmUtYnV0dG9uL3RyYWNrLWZlYXR1cmUtYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFFbEYsT0FBTyxFQUFTLFdBQVcsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBR3REO0lBcUJFO1FBWFMsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFTdkIsVUFBSyxHQUFXLFNBQVMsQ0FBQztJQUVsQixDQUFDO0lBVGhCLHNCQUFJLGdEQUFPOzs7O1FBQVg7WUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDZixPQUFPO2FBQ1I7WUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQzVCLENBQUM7OztPQUFBOzs7O0lBTUQsOENBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUN2RCxDQUFDOzs7O0lBRUQsd0RBQWtCOzs7SUFBbEI7UUFDRSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNoRSxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztTQUN0QjthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMvRCxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztTQUN4QjtRQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQ3pDLENBQUM7O2dCQXBDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtvQkFDcEMsbVdBQW9EO29CQUVwRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7Ozt3QkFHRSxLQUFLOytCQUVMLEtBQUs7O0lBMkJSLGtDQUFDO0NBQUEsQUFyQ0QsSUFxQ0M7U0EvQlksMkJBQTJCOzs7SUFFdEMsNENBQTRCOztJQUU1QixtREFBOEI7O0lBUzlCLDRDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IExheWVyLCBWZWN0b3JMYXllciB9IGZyb20gJy4uL3NoYXJlZC9sYXllcnMnO1xyXG5pbXBvcnQgeyBWZWN0b3JMYXllck9wdGlvbnMgfSBmcm9tICcuLi9zaGFyZWQvbGF5ZXJzL3ZlY3Rvci1sYXllci5pbnRlcmZhY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tdHJhY2stZmVhdHVyZS1idXR0b24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90cmFjay1mZWF0dXJlLWJ1dHRvbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdHJhY2stZmVhdHVyZS1idXR0b24uY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVHJhY2tGZWF0dXJlQnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgQElucHV0KCkgbGF5ZXI6IFZlY3RvckxheWVyO1xyXG5cclxuICBASW5wdXQoKSB0cmFja0ZlYXR1cmUgPSBmYWxzZTtcclxuXHJcbiAgZ2V0IG9wdGlvbnMoKTogVmVjdG9yTGF5ZXJPcHRpb25zIHtcclxuICAgIGlmICghdGhpcy5sYXllcikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5sYXllci5vcHRpb25zO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNvbG9yOiBzdHJpbmcgPSAncHJpbWFyeSc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmNvbG9yID0gdGhpcy50cmFja0ZlYXR1cmUgPyAncHJpbWFyeScgOiAnYmFzaWMnO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlVHJhY2tGZWF0dXJlKCkge1xyXG4gICAgaWYgKHRoaXMudHJhY2tGZWF0dXJlKSB7XHJcbiAgICAgIHRoaXMubGF5ZXIuZGlzYWJsZVRyYWNrRmVhdHVyZSh0aGlzLmxheWVyLm9wdGlvbnMudHJhY2tGZWF0dXJlKTtcclxuICAgICAgdGhpcy5jb2xvciA9ICdiYXNpYyc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmxheWVyLmVuYWJsZVRyYWNrRmVhdHVyZSh0aGlzLmxheWVyLm9wdGlvbnMudHJhY2tGZWF0dXJlKTtcclxuICAgICAgdGhpcy5jb2xvciA9ICdwcmltYXJ5JztcclxuICAgIH1cclxuICAgIHRoaXMudHJhY2tGZWF0dXJlID0gIXRoaXMudHJhY2tGZWF0dXJlO1xyXG4gIH1cclxufVxyXG4iXX0=