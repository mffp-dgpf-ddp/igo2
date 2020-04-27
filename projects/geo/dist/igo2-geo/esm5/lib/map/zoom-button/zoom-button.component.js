/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { IgoMap } from '../shared/map';
var ZoomButtonComponent = /** @class */ (function () {
    function ZoomButtonComponent() {
    }
    Object.defineProperty(ZoomButtonComponent.prototype, "zoom", {
        get: /**
         * @return {?}
         */
        function () { return this.map.viewController.getZoom(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZoomButtonComponent.prototype, "minZoom", {
        get: /**
         * @return {?}
         */
        function () { return this.map.viewController.olView.getMinZoom() || 1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZoomButtonComponent.prototype, "maxZoom", {
        get: /**
         * @return {?}
         */
        function () { return this.map.viewController.olView.getMaxZoom(); },
        enumerable: true,
        configurable: true
    });
    ZoomButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-zoom-button',
                    template: "<div class=\"igo-zoom-button-container\">\r\n  <button\r\n    mat-icon-button\r\n    [matTooltip]=\"'igo.geo.mapButtons.zoomIn' | translate: {zoom: zoom + 1}\"\r\n    matTooltipPosition=\"left\"\r\n    [color]=\"color\"\r\n    [disabled]=\"zoom >= maxZoom\"\r\n    (click)=\"map.viewController.zoomIn()\">\r\n    <mat-icon svgIcon=\"plus\"></mat-icon>\r\n  </button>\r\n\r\n  <button\r\n    mat-icon-button\r\n    [matTooltip]=\"'igo.geo.mapButtons.zoomOut' | translate: {zoom: zoom - 1}\"\r\n    matTooltipPosition=\"left\"\r\n    [color]=\"color\"\r\n    [disabled]=\"zoom <= minZoom\"\r\n    (click)=\"map.viewController.zoomOut()\">\r\n    <mat-icon svgIcon=\"minus\"></mat-icon>\r\n  </button>\r\n</div>\r\n",
                    styles: [".igo-zoom-button-container{width:40px}.igo-zoom-button-container button{background-color:#fff}.igo-zoom-button-container button:hover{background-color:#efefef}.igo-zoom-button-container button:first-child{margin-bottom:2px}:host>>>button .mat-button-ripple-round,button{border-radius:0}"]
                }] }
    ];
    /** @nocollapse */
    ZoomButtonComponent.ctorParameters = function () { return []; };
    ZoomButtonComponent.propDecorators = {
        map: [{ type: Input }],
        color: [{ type: Input }]
    };
    return ZoomButtonComponent;
}());
export { ZoomButtonComponent };
if (false) {
    /** @type {?} */
    ZoomButtonComponent.prototype.map;
    /** @type {?} */
    ZoomButtonComponent.prototype.color;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9vbS1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL21hcC96b29tLWJ1dHRvbi96b29tLWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkM7SUFpQkU7SUFBZSxDQUFDO0lBTmhCLHNCQUFJLHFDQUFJOzs7O1FBQVIsY0FBcUIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRWhFLHNCQUFJLHdDQUFPOzs7O1FBQVgsY0FBd0IsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFbEYsc0JBQUksd0NBQU87Ozs7UUFBWCxjQUF3QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7OztPQUFBOztnQkFmOUUsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLG90QkFBMkM7O2lCQUU1Qzs7Ozs7c0JBR0UsS0FBSzt3QkFFTCxLQUFLOztJQVNSLDBCQUFDO0NBQUEsQUFsQkQsSUFrQkM7U0FiWSxtQkFBbUI7OztJQUU5QixrQ0FBcUI7O0lBRXJCLG9DQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uL3NoYXJlZC9tYXAnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tem9vbS1idXR0b24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi96b29tLWJ1dHRvbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vem9vbS1idXR0b24uY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgWm9vbUJ1dHRvbkNvbXBvbmVudCB7XHJcblxyXG4gIEBJbnB1dCgpIG1hcDogSWdvTWFwO1xyXG5cclxuICBASW5wdXQoKSBjb2xvcjogc3RyaW5nO1xyXG5cclxuICBnZXQgem9vbSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5tYXAudmlld0NvbnRyb2xsZXIuZ2V0Wm9vbSgpOyB9XHJcblxyXG4gIGdldCBtaW5ab29tKCk6IG51bWJlciB7IHJldHVybiB0aGlzLm1hcC52aWV3Q29udHJvbGxlci5vbFZpZXcuZ2V0TWluWm9vbSgpIHx8IDE7IH1cclxuXHJcbiAgZ2V0IG1heFpvb20oKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMubWFwLnZpZXdDb250cm9sbGVyLm9sVmlldy5nZXRNYXhab29tKCk7IH1cclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG59XHJcbiJdfQ==