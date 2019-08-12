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
                    template: "<div class=\"igo-rotation-button-container\">\r\n  <button\r\n    *ngIf=\"map.viewController.getRotation() !== 0\" \r\n    mat-icon-button \r\n    [matTooltip]=\"'igo.geo.mapButtons.resetRotation' | translate\"\r\n    matTooltipPosition=\"left\" \r\n    [color]=\"color\" \r\n    (click)=\"map.viewController.resetRotation()\">\r\n    <mat-icon [ngStyle]=\"rotationStyle(map.viewController.getRotation())\" svgIcon=\"navigation\">\r\n    </mat-icon>\r\n  </button>\r\n</div>",
                    styles: [".igo-rotation-button-container{width:40px;background-color:#fff}.igo-rotation-button-container:hover{background-color:#efefef}:host>>>button .mat-button-ripple-round,button{border-radius:0}"]
                }] }
    ];
    /** @nocollapse */
    RotationButtonComponent.ctorParameters = function () { return []; };
    RotationButtonComponent.propDecorators = {
        map: [{ type: Input }],
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
    RotationButtonComponent.prototype._color;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm90YXRpb24tYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9tYXAvcm90YXRpb24tYnV0dG9uL3JvdGF0aW9uLWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkM7SUF3QkU7SUFBZSxDQUFDO0lBbEJoQixzQkFDSSx3Q0FBRzs7OztRQURQO1lBRUUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ25CLENBQUM7Ozs7O1FBQ0QsVUFBUSxLQUFhO1lBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLENBQUM7OztPQUhBO0lBTUQsc0JBQ0ksMENBQUs7Ozs7UUFEVDtZQUVFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQixDQUFDOzs7OztRQUNELFVBQVUsS0FBYTtZQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FIQTs7Ozs7SUFRRCwrQ0FBYTs7OztJQUFiLFVBQWMsT0FBTzs7WUFDYixRQUFRLEdBQUcsU0FBUyxHQUFHLE9BQU8sR0FBRyxNQUFNO1FBQzdDLE9BQU87WUFDTCxTQUFTLEVBQUUsUUFBUTtTQUNwQixDQUFDO0lBQ0osQ0FBQzs7Z0JBL0JGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixzZUFBK0M7O2lCQUVoRDs7Ozs7c0JBRUUsS0FBSzt3QkFTTCxLQUFLOztJQWlCUiw4QkFBQztDQUFBLEFBaENELElBZ0NDO1NBM0JZLHVCQUF1Qjs7Ozs7O0lBUWxDLHVDQUFxQjs7Ozs7SUFTckIseUNBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vc2hhcmVkL21hcCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1yb3RhdGlvbi1idXR0b24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9yb3RhdGlvbi1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3JvdGF0aW9uLWJ1dHRvbi5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSb3RhdGlvbkJ1dHRvbkNvbXBvbmVudCB7XHJcbiAgQElucHV0KClcclxuICBnZXQgbWFwKCk6IElnb01hcCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWFwO1xyXG4gIH1cclxuICBzZXQgbWFwKHZhbHVlOiBJZ29NYXApIHtcclxuICAgIHRoaXMuX21hcCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9tYXA6IElnb01hcDtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgY29sb3IoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9jb2xvcjtcclxuICB9XHJcbiAgc2V0IGNvbG9yKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2NvbG9yID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2NvbG9yOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgcm90YXRpb25TdHlsZShyYWRpYW5zKToge30ge1xyXG4gICAgY29uc3Qgcm90YXRpb24gPSAncm90YXRlKCcgKyByYWRpYW5zICsgJ3JhZCknO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGlvblxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19