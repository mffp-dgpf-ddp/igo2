/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { IgoMap } from '../shared/map';
var GeolocateButtonComponent = /** @class */ (function () {
    function GeolocateButtonComponent() {
    }
    Object.defineProperty(GeolocateButtonComponent.prototype, "map", {
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
    Object.defineProperty(GeolocateButtonComponent.prototype, "color", {
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
    GeolocateButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-geolocate-button',
                    template: "<div class=\"igo-geolocate-button-container\">\r\n  <button\r\n    mat-icon-button\r\n    [matTooltip]=\"'igo.geo.mapButtons.geolocate' | translate\"\r\n    matTooltipPosition=\"left\"\r\n    [color]=\"color\"\r\n    (click)=\"map.geolocate()\">\r\n    <mat-icon svgIcon=\"crosshairs-gps\"></mat-icon>\r\n  </button>\r\n</div>\r\n",
                    styles: [".igo-geolocate-button-container{width:40px;background-color:#fff}.igo-geolocate-button-container:hover{background-color:#efefef}:host>>>button .mat-button-ripple-round,button{border-radius:0}"]
                }] }
    ];
    /** @nocollapse */
    GeolocateButtonComponent.ctorParameters = function () { return []; };
    GeolocateButtonComponent.propDecorators = {
        map: [{ type: Input }],
        color: [{ type: Input }]
    };
    return GeolocateButtonComponent;
}());
export { GeolocateButtonComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    GeolocateButtonComponent.prototype._map;
    /**
     * @type {?}
     * @private
     */
    GeolocateButtonComponent.prototype._color;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbG9jYXRlLWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbWFwL2dlb2xvY2F0ZS1idXR0b24vZ2VvbG9jYXRlLWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkM7SUF3QkU7SUFBZSxDQUFDO0lBbEJoQixzQkFDSSx5Q0FBRzs7OztRQURQO1lBRUUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ25CLENBQUM7Ozs7O1FBQ0QsVUFBUSxLQUFhO1lBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLENBQUM7OztPQUhBO0lBTUQsc0JBQ0ksMkNBQUs7Ozs7UUFEVDtZQUVFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQixDQUFDOzs7OztRQUNELFVBQVUsS0FBYTtZQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FIQTs7Z0JBbEJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxzVkFBZ0Q7O2lCQUVqRDs7Ozs7c0JBRUUsS0FBSzt3QkFTTCxLQUFLOztJQVVSLCtCQUFDO0NBQUEsQUF6QkQsSUF5QkM7U0FwQlksd0JBQXdCOzs7Ozs7SUFRbkMsd0NBQXFCOzs7OztJQVNyQiwwQ0FBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi9zaGFyZWQvbWFwJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWdlb2xvY2F0ZS1idXR0b24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9nZW9sb2NhdGUtYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9nZW9sb2NhdGUtYnV0dG9uLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEdlb2xvY2F0ZUJ1dHRvbkNvbXBvbmVudCB7XHJcbiAgQElucHV0KClcclxuICBnZXQgbWFwKCk6IElnb01hcCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWFwO1xyXG4gIH1cclxuICBzZXQgbWFwKHZhbHVlOiBJZ29NYXApIHtcclxuICAgIHRoaXMuX21hcCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9tYXA6IElnb01hcDtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgY29sb3IoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9jb2xvcjtcclxuICB9XHJcbiAgc2V0IGNvbG9yKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2NvbG9yID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2NvbG9yOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG4iXX0=