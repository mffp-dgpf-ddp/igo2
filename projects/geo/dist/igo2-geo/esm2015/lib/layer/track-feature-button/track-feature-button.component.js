/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { VectorLayer } from '../shared/layers';
export class TrackFeatureButtonComponent {
    constructor() {
        this.trackFeature = false;
        this.color = 'primary';
    }
    /**
     * @return {?}
     */
    get options() {
        if (!this.layer) {
            return;
        }
        return this.layer.options;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.color = this.trackFeature ? 'primary' : 'basic';
    }
    /**
     * @return {?}
     */
    toggleTrackFeature() {
        if (this.trackFeature) {
            this.layer.disableTrackFeature(this.layer.options.trackFeature);
            this.color = 'basic';
        }
        else {
            this.layer.enableTrackFeature(this.layer.options.trackFeature);
            this.color = 'primary';
        }
        this.trackFeature = !this.trackFeature;
    }
}
TrackFeatureButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-track-feature-button',
                template: "<button *ngIf=\"options.trackFeature\"\r\n  mat-icon-button\r\n  collapsibleButton\r\n  tooltip-position=\"below\"\r\n  matTooltipShowDelay=\"500\"\r\n  [matTooltip]=\"'igo.geo.layer.trackFeature' | translate\"\r\n  [color]=\"color\"\r\n  (click)=\"toggleTrackFeature()\">\r\n  <mat-icon svgIcon=\"crosshairs-gps\"></mat-icon>\r\n</button>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            }] }
];
/** @nocollapse */
TrackFeatureButtonComponent.ctorParameters = () => [];
TrackFeatureButtonComponent.propDecorators = {
    layer: [{ type: Input }],
    trackFeature: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    TrackFeatureButtonComponent.prototype.layer;
    /** @type {?} */
    TrackFeatureButtonComponent.prototype.trackFeature;
    /** @type {?} */
    TrackFeatureButtonComponent.prototype.color;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2stZmVhdHVyZS1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2xheWVyL3RyYWNrLWZlYXR1cmUtYnV0dG9uL3RyYWNrLWZlYXR1cmUtYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFFbEYsT0FBTyxFQUFTLFdBQVcsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBU3RELE1BQU0sT0FBTywyQkFBMkI7SUFldEM7UUFYUyxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQVN2QixVQUFLLEdBQVcsU0FBUyxDQUFDO0lBRWxCLENBQUM7Ozs7SUFUaEIsSUFBSSxPQUFPO1FBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZixPQUFPO1NBQ1I7UUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO0lBQzVCLENBQUM7Ozs7SUFNRCxRQUFRO1FBQ04sSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUN2RCxDQUFDOzs7O0lBRUQsa0JBQWtCO1FBQ2hCLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO1NBQ3RCO2FBQU07WUFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1NBQ3hCO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDekMsQ0FBQzs7O1lBcENGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQyxtV0FBb0Q7Z0JBRXBELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7Ozs7b0JBR0UsS0FBSzsyQkFFTCxLQUFLOzs7O0lBRk4sNENBQTRCOztJQUU1QixtREFBOEI7O0lBUzlCLDRDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IExheWVyLCBWZWN0b3JMYXllciB9IGZyb20gJy4uL3NoYXJlZC9sYXllcnMnO1xyXG5pbXBvcnQgeyBWZWN0b3JMYXllck9wdGlvbnMgfSBmcm9tICcuLi9zaGFyZWQvbGF5ZXJzL3ZlY3Rvci1sYXllci5pbnRlcmZhY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tdHJhY2stZmVhdHVyZS1idXR0b24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90cmFjay1mZWF0dXJlLWJ1dHRvbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdHJhY2stZmVhdHVyZS1idXR0b24uY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVHJhY2tGZWF0dXJlQnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgQElucHV0KCkgbGF5ZXI6IFZlY3RvckxheWVyO1xyXG5cclxuICBASW5wdXQoKSB0cmFja0ZlYXR1cmUgPSBmYWxzZTtcclxuXHJcbiAgZ2V0IG9wdGlvbnMoKTogVmVjdG9yTGF5ZXJPcHRpb25zIHtcclxuICAgIGlmICghdGhpcy5sYXllcikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5sYXllci5vcHRpb25zO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNvbG9yOiBzdHJpbmcgPSAncHJpbWFyeSc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmNvbG9yID0gdGhpcy50cmFja0ZlYXR1cmUgPyAncHJpbWFyeScgOiAnYmFzaWMnO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlVHJhY2tGZWF0dXJlKCkge1xyXG4gICAgaWYgKHRoaXMudHJhY2tGZWF0dXJlKSB7XHJcbiAgICAgIHRoaXMubGF5ZXIuZGlzYWJsZVRyYWNrRmVhdHVyZSh0aGlzLmxheWVyLm9wdGlvbnMudHJhY2tGZWF0dXJlKTtcclxuICAgICAgdGhpcy5jb2xvciA9ICdiYXNpYyc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmxheWVyLmVuYWJsZVRyYWNrRmVhdHVyZSh0aGlzLmxheWVyLm9wdGlvbnMudHJhY2tGZWF0dXJlKTtcclxuICAgICAgdGhpcy5jb2xvciA9ICdwcmltYXJ5JztcclxuICAgIH1cclxuICAgIHRoaXMudHJhY2tGZWF0dXJlID0gIXRoaXMudHJhY2tGZWF0dXJlO1xyXG4gIH1cclxufVxyXG4iXX0=