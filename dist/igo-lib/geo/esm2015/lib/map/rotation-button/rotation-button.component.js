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
                template: "<div class=\"igo-rotation-button-container\">\r\n  <button\r\n    *ngIf=\"map.viewController.getRotation() !== 0\" \r\n    mat-icon-button \r\n    [matTooltip]=\"'igo.geo.mapButtons.resetRotation' | translate\"\r\n    matTooltipPosition=\"left\" \r\n    [color]=\"color\" \r\n    (click)=\"map.viewController.resetRotation()\">\r\n    <mat-icon [ngStyle]=\"rotationStyle(map.viewController.getRotation())\" svgIcon=\"navigation\">\r\n    </mat-icon>\r\n  </button>\r\n</div>",
                styles: [".igo-rotation-button-container{width:40px;background-color:#fff}.igo-rotation-button-container:hover{background-color:#efefef}:host>>>button .mat-button-ripple-round,button{border-radius:0}"]
            }] }
];
/** @nocollapse */
RotationButtonComponent.ctorParameters = () => [];
RotationButtonComponent.propDecorators = {
    map: [{ type: Input }],
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
    RotationButtonComponent.prototype._color;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm90YXRpb24tYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9tYXAvcm90YXRpb24tYnV0dG9uL3JvdGF0aW9uLWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPdkMsTUFBTSxPQUFPLHVCQUF1QjtJQW1CbEMsZ0JBQWUsQ0FBQzs7OztJQWxCaEIsSUFDSSxHQUFHO1FBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7Ozs7O0lBQ0QsSUFBSSxHQUFHLENBQUMsS0FBYTtRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUNwQixDQUFDOzs7O0lBR0QsSUFDSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBQ0QsSUFBSSxLQUFLLENBQUMsS0FBYTtRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDOzs7OztJQUtELGFBQWEsQ0FBQyxPQUFPOztjQUNiLFFBQVEsR0FBRyxTQUFTLEdBQUcsT0FBTyxHQUFHLE1BQU07UUFDN0MsT0FBTztZQUNMLFNBQVMsRUFBRSxRQUFRO1NBQ3BCLENBQUM7SUFDSixDQUFDOzs7WUEvQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLHNlQUErQzs7YUFFaEQ7Ozs7O2tCQUVFLEtBQUs7b0JBU0wsS0FBSzs7Ozs7OztJQUZOLHVDQUFxQjs7Ozs7SUFTckIseUNBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vc2hhcmVkL21hcCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1yb3RhdGlvbi1idXR0b24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9yb3RhdGlvbi1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3JvdGF0aW9uLWJ1dHRvbi5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSb3RhdGlvbkJ1dHRvbkNvbXBvbmVudCB7XHJcbiAgQElucHV0KClcclxuICBnZXQgbWFwKCk6IElnb01hcCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWFwO1xyXG4gIH1cclxuICBzZXQgbWFwKHZhbHVlOiBJZ29NYXApIHtcclxuICAgIHRoaXMuX21hcCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9tYXA6IElnb01hcDtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgY29sb3IoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9jb2xvcjtcclxuICB9XHJcbiAgc2V0IGNvbG9yKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2NvbG9yID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2NvbG9yOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgcm90YXRpb25TdHlsZShyYWRpYW5zKToge30ge1xyXG4gICAgY29uc3Qgcm90YXRpb24gPSAncm90YXRlKCcgKyByYWRpYW5zICsgJ3JhZCknO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGlvblxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19