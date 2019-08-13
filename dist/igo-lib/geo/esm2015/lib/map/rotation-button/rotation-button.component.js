/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { IgoMap } from '../shared/map';
export class RotationButtonComponent {
    constructor() { }
    /**
     * @return {?}
     */
    get map() {
        return this._map;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set map(value) {
        this._map = value;
    }
    /**
     * @return {?}
     */
    get showIfNoRotation() {
        return this._showIfNoRotation;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showIfNoRotation(value) {
        this._showIfNoRotation = value;
    }
    /**
     * @return {?}
     */
    get color() {
        return this._color;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set color(value) {
        this._color = value;
    }
    /**
     * @return {?}
     */
    get rotated() {
        return this.map.viewController.getRotation() !== 0;
    }
    /**
     * @param {?} radians
     * @return {?}
     */
    rotationStyle(radians) {
        /** @type {?} */
        const rotation = 'rotate(' + radians + 'rad)';
        return {
            transform: rotation
        };
    }
}
RotationButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-rotation-button',
                template: "<div *ngIf=\"rotated && !showIfNoRotation\" class=\"igo-rotation-button-container\"\r\n  [matTooltip]=\"rotated ? ('igo.geo.mapButtons.resetRotation' | translate): ('igo.geo.mapButtons.tipRotation' | translate)\"\r\n  matTooltipPosition=\"left\">\r\n  <button mat-icon-button matTooltipPosition=\"left\" [color]=\"color\" [disabled]=\"!rotated\"\r\n    (click)=\"map.viewController.resetRotation()\">\r\n    <mat-icon [ngStyle]=\"rotationStyle(map.viewController.getRotation())\" svgIcon=\"navigation\">\r\n    </mat-icon>\r\n  </button>\r\n</div>\r\n\r\n<div *ngIf=\"showIfNoRotation\" class=\"igo-rotation-button-container\"\r\n  [matTooltip]=\"rotated ? ('igo.geo.mapButtons.resetRotation' | translate): ('igo.geo.mapButtons.tipRotation' | translate)\"\r\n  matTooltipPosition=\"left\">\r\n  <button mat-icon-button matTooltipPosition=\"left\" [color]=\"color\" [disabled]=\"!rotated\"\r\n    (click)=\"map.viewController.resetRotation()\">\r\n    <mat-icon [ngStyle]=\"rotationStyle(map.viewController.getRotation())\" svgIcon=\"navigation\">\r\n    </mat-icon>\r\n  </button>\r\n</div>",
                styles: [".igo-rotation-button-container{width:40px;background-color:#fff}.igo-rotation-button-container:hover{background-color:#efefef}:host>>>button .mat-button-ripple-round,button{border-radius:0}@media only screen and (max-width:450px),only screen and (max-height:450px){:host>>>button .mat-button-ripple-round:disabled,button:disabled{display:none}}"]
            }] }
];
/** @nocollapse */
RotationButtonComponent.ctorParameters = () => [];
RotationButtonComponent.propDecorators = {
    map: [{ type: Input }],
    showIfNoRotation: [{ type: Input }],
    color: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm90YXRpb24tYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9tYXAvcm90YXRpb24tYnV0dG9uL3JvdGF0aW9uLWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPdkMsTUFBTSxPQUFPLHVCQUF1QjtJQWdDbEMsZ0JBQWUsQ0FBQzs7OztJQS9CaEIsSUFDSSxHQUFHO1FBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7Ozs7O0lBQ0QsSUFBSSxHQUFHLENBQUMsS0FBYTtRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUNwQixDQUFDOzs7O0lBR0QsSUFDSSxnQkFBZ0I7UUFDbEIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDaEMsQ0FBQzs7Ozs7SUFDRCxJQUFJLGdCQUFnQixDQUFDLEtBQWM7UUFDakMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNqQyxDQUFDOzs7O0lBR0QsSUFDSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBQ0QsSUFBSSxLQUFLLENBQUMsS0FBYTtRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDOzs7O0lBR0QsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDckQsQ0FBQzs7Ozs7SUFJRCxhQUFhLENBQUMsT0FBTzs7Y0FDYixRQUFRLEdBQUcsU0FBUyxHQUFHLE9BQU8sR0FBRyxNQUFNO1FBQzdDLE9BQU87WUFDTCxTQUFTLEVBQUUsUUFBUTtTQUNwQixDQUFDO0lBQ0osQ0FBQzs7O1lBNUNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQiw4a0NBQStDOzthQUVoRDs7Ozs7a0JBRUUsS0FBSzsrQkFTTCxLQUFLO29CQVNMLEtBQUs7Ozs7Ozs7SUFYTix1Q0FBcUI7Ozs7O0lBU3JCLG9EQUFtQzs7Ozs7SUFTbkMseUNBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vc2hhcmVkL21hcCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1yb3RhdGlvbi1idXR0b24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9yb3RhdGlvbi1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3JvdGF0aW9uLWJ1dHRvbi5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSb3RhdGlvbkJ1dHRvbkNvbXBvbmVudCB7XHJcbiAgQElucHV0KClcclxuICBnZXQgbWFwKCk6IElnb01hcCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWFwO1xyXG4gIH1cclxuICBzZXQgbWFwKHZhbHVlOiBJZ29NYXApIHtcclxuICAgIHRoaXMuX21hcCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9tYXA6IElnb01hcDtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgc2hvd0lmTm9Sb3RhdGlvbigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9zaG93SWZOb1JvdGF0aW9uO1xyXG4gIH1cclxuICBzZXQgc2hvd0lmTm9Sb3RhdGlvbih2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fc2hvd0lmTm9Sb3RhdGlvbiA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9zaG93SWZOb1JvdGF0aW9uOiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBjb2xvcigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xyXG4gIH1cclxuICBzZXQgY29sb3IodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5fY29sb3IgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfY29sb3I6IHN0cmluZztcclxuXHJcbiAgZ2V0IHJvdGF0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5tYXAudmlld0NvbnRyb2xsZXIuZ2V0Um90YXRpb24oKSAhPT0gMDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgcm90YXRpb25TdHlsZShyYWRpYW5zKToge30ge1xyXG4gICAgY29uc3Qgcm90YXRpb24gPSAncm90YXRlKCcgKyByYWRpYW5zICsgJ3JhZCknO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGlvblxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19