/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { IgoMap } from '../shared/map';
var RotationButtonComponent = /** @class */ (function () {
    function RotationButtonComponent() {
    }
    Object.defineProperty(RotationButtonComponent.prototype, "map", {
        get: /**
         * @return {?}
         */
        function () {
            return this._map;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._map = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RotationButtonComponent.prototype, "showIfNoRotation", {
        get: /**
         * @return {?}
         */
        function () {
            return this._showIfNoRotation;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._showIfNoRotation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RotationButtonComponent.prototype, "color", {
        get: /**
         * @return {?}
         */
        function () {
            return this._color;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._color = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RotationButtonComponent.prototype, "rotated", {
        get: /**
         * @return {?}
         */
        function () {
            return this.map.viewController.getRotation() !== 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} radians
     * @return {?}
     */
    RotationButtonComponent.prototype.rotationStyle = /**
     * @param {?} radians
     * @return {?}
     */
    function (radians) {
        /** @type {?} */
        var rotation = 'rotate(' + radians + 'rad)';
        return {
            transform: rotation
        };
    };
    RotationButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-rotation-button',
                    template: "<div *ngIf=\"rotated && !showIfNoRotation\" class=\"igo-rotation-button-container\"\r\n  [matTooltip]=\"rotated ? ('igo.geo.mapButtons.resetRotation' | translate): ('igo.geo.mapButtons.tipRotation' | translate)\"\r\n  matTooltipPosition=\"left\">\r\n  <button mat-icon-button matTooltipPosition=\"left\" [color]=\"color\" [disabled]=\"!rotated\"\r\n    (click)=\"map.viewController.resetRotation()\">\r\n    <mat-icon [ngStyle]=\"rotationStyle(map.viewController.getRotation())\" svgIcon=\"navigation\">\r\n    </mat-icon>\r\n  </button>\r\n</div>\r\n\r\n<div *ngIf=\"showIfNoRotation\" class=\"igo-rotation-button-container\"\r\n  [matTooltip]=\"rotated ? ('igo.geo.mapButtons.resetRotation' | translate): ('igo.geo.mapButtons.tipRotation' | translate)\"\r\n  matTooltipPosition=\"left\">\r\n  <button mat-icon-button matTooltipPosition=\"left\" [color]=\"color\" [disabled]=\"!rotated\"\r\n    (click)=\"map.viewController.resetRotation()\">\r\n    <mat-icon [ngStyle]=\"rotationStyle(map.viewController.getRotation())\" svgIcon=\"navigation\">\r\n    </mat-icon>\r\n  </button>\r\n</div>",
                    styles: [".igo-rotation-button-container{width:40px;background-color:#fff}.igo-rotation-button-container:hover{background-color:#efefef}:host>>>button .mat-button-ripple-round,button{border-radius:0}@media only screen and (max-width:450px),only screen and (max-height:450px){:host>>>button .mat-button-ripple-round:disabled,button:disabled{display:none}}"]
                }] }
    ];
    /** @nocollapse */
    RotationButtonComponent.ctorParameters = function () { return []; };
    RotationButtonComponent.propDecorators = {
        map: [{ type: Input }],
        showIfNoRotation: [{ type: Input }],
        color: [{ type: Input }]
    };
    return RotationButtonComponent;
}());
export { RotationButtonComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    RotationButtonComponent.prototype._map;
    /**
     * @type {?}
     * @private
     */
    RotationButtonComponent.prototype._showIfNoRotation;
    /**
     * @type {?}
     * @private
     */
    RotationButtonComponent.prototype._color;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm90YXRpb24tYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9tYXAvcm90YXRpb24tYnV0dG9uL3JvdGF0aW9uLWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkM7SUFxQ0U7SUFBZSxDQUFDO0lBL0JoQixzQkFDSSx3Q0FBRzs7OztRQURQO1lBRUUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ25CLENBQUM7Ozs7O1FBQ0QsVUFBUSxLQUFhO1lBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLENBQUM7OztPQUhBO0lBTUQsc0JBQ0kscURBQWdCOzs7O1FBRHBCO1lBRUUsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDaEMsQ0FBQzs7Ozs7UUFDRCxVQUFxQixLQUFjO1lBQ2pDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDakMsQ0FBQzs7O09BSEE7SUFNRCxzQkFDSSwwQ0FBSzs7OztRQURUO1lBRUUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JCLENBQUM7Ozs7O1FBQ0QsVUFBVSxLQUFhO1lBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLENBQUM7OztPQUhBO0lBTUQsc0JBQUksNENBQU87Ozs7UUFBWDtZQUNFLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3JELENBQUM7OztPQUFBOzs7OztJQUlELCtDQUFhOzs7O0lBQWIsVUFBYyxPQUFPOztZQUNiLFFBQVEsR0FBRyxTQUFTLEdBQUcsT0FBTyxHQUFHLE1BQU07UUFDN0MsT0FBTztZQUNMLFNBQVMsRUFBRSxRQUFRO1NBQ3BCLENBQUM7SUFDSixDQUFDOztnQkE1Q0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLDhrQ0FBK0M7O2lCQUVoRDs7Ozs7c0JBRUUsS0FBSzttQ0FTTCxLQUFLO3dCQVNMLEtBQUs7O0lBcUJSLDhCQUFDO0NBQUEsQUE3Q0QsSUE2Q0M7U0F4Q1ksdUJBQXVCOzs7Ozs7SUFRbEMsdUNBQXFCOzs7OztJQVNyQixvREFBbUM7Ozs7O0lBU25DLHlDQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uL3NoYXJlZC9tYXAnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tcm90YXRpb24tYnV0dG9uJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vcm90YXRpb24tYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9yb3RhdGlvbi1idXR0b24uY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUm90YXRpb25CdXR0b25Db21wb25lbnQge1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAge1xyXG4gICAgcmV0dXJuIHRoaXMuX21hcDtcclxuICB9XHJcbiAgc2V0IG1hcCh2YWx1ZTogSWdvTWFwKSB7XHJcbiAgICB0aGlzLl9tYXAgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfbWFwOiBJZ29NYXA7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHNob3dJZk5vUm90YXRpb24oKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2hvd0lmTm9Sb3RhdGlvbjtcclxuICB9XHJcbiAgc2V0IHNob3dJZk5vUm90YXRpb24odmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX3Nob3dJZk5vUm90YXRpb24gPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfc2hvd0lmTm9Sb3RhdGlvbjogYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgY29sb3IoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9jb2xvcjtcclxuICB9XHJcbiAgc2V0IGNvbG9yKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2NvbG9yID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2NvbG9yOiBzdHJpbmc7XHJcblxyXG4gIGdldCByb3RhdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubWFwLnZpZXdDb250cm9sbGVyLmdldFJvdGF0aW9uKCkgIT09IDA7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIHJvdGF0aW9uU3R5bGUocmFkaWFucyk6IHt9IHtcclxuICAgIGNvbnN0IHJvdGF0aW9uID0gJ3JvdGF0ZSgnICsgcmFkaWFucyArICdyYWQpJztcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRpb25cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==