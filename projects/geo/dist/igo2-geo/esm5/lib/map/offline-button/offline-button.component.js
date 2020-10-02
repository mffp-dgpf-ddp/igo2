/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { IgoMap } from '../shared/map';
import { ConfigService } from '@igo2/core';
var OfflineButtonComponent = /** @class */ (function () {
    function OfflineButtonComponent(config) {
        this.config = config;
        this.btnStyle = 'baseStyle';
        this.colorOff = 'rgb(255,255,255)';
        this.change = new EventEmitter();
        this.check = false;
        this.visible = false;
        this.visible = this.config.getConfig('offlineButton') ? true : false;
    }
    Object.defineProperty(OfflineButtonComponent.prototype, "map", {
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
    Object.defineProperty(OfflineButtonComponent.prototype, "color", {
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
    Object.defineProperty(OfflineButtonComponent.prototype, "checked", {
        get: /**
         * @return {?}
         */
        function () {
            return this.check;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OfflineButtonComponent.prototype.onToggle = /**
     * @return {?}
     */
    function () {
        this.check = !this.check;
        if (this.check) {
            this.btnStyle = 'toggleStyle';
        }
        else {
            this.btnStyle = 'baseStyle';
        }
    };
    OfflineButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-offline-button',
                    template: "<div *ngIf=\"visible\" class=\"igo-user-button-container\">\r\n  <div>\r\n    <button\r\n      mat-icon-button\r\n      [matTooltip]=\"checked ? ('igo.geo.mapButtons.online' | translate): ('igo.geo.mapButtons.offline' | translate)\"\r\n      matTooltipPosition=\"left\"\r\n      [ngClass]=\"[btnStyle]\"\r\n      [color]=\"checked ? color : [colorOff]\"\r\n      (click)=\"onToggle()\"\r\n      (click)=\"map.onOfflineToggle(check)\">\r\n      <mat-icon svgIcon=\"wifi-strength-off\"></mat-icon>\r\n    </button>\r\n  </div>\r\n</div>",
                    styles: [".baseStyle{width:40px;background-color:#fff}.baseStyle:hover{background-color:#efefef}.toggleStyle{width:40px;background-color:#b9b9b9}:host>>>button .mat-button-ripple-round,button{border-radius:0}"]
                }] }
    ];
    /** @nocollapse */
    OfflineButtonComponent.ctorParameters = function () { return [
        { type: ConfigService }
    ]; };
    OfflineButtonComponent.propDecorators = {
        change: [{ type: Output }],
        map: [{ type: Input }],
        color: [{ type: Input }],
        check: [{ type: Input }]
    };
    return OfflineButtonComponent;
}());
export { OfflineButtonComponent };
if (false) {
    /** @type {?} */
    OfflineButtonComponent.prototype.btnStyle;
    /** @type {?} */
    OfflineButtonComponent.prototype.colorOff;
    /** @type {?} */
    OfflineButtonComponent.prototype.change;
    /**
     * @type {?}
     * @private
     */
    OfflineButtonComponent.prototype._map;
    /**
     * @type {?}
     * @private
     */
    OfflineButtonComponent.prototype._color;
    /** @type {?} */
    OfflineButtonComponent.prototype.check;
    /** @type {?} */
    OfflineButtonComponent.prototype.visible;
    /**
     * @type {?}
     * @private
     */
    OfflineButtonComponent.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmbGluZS1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL21hcC9vZmZsaW5lLWJ1dHRvbi9vZmZsaW5lLWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHdkMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUUzQztJQXVDRSxnQ0FDVSxNQUFxQjtRQUFyQixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBaEMvQixhQUFRLEdBQVcsV0FBVyxDQUFDO1FBQy9CLGFBQVEsR0FBVyxrQkFBa0IsQ0FBQztRQUU1QixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQW9CL0IsVUFBSyxHQUFZLEtBQUssQ0FBQztRQU1oQyxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBS3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ3ZFLENBQUM7SUE5QkQsc0JBQ0ksdUNBQUc7Ozs7UUFEUDtZQUVFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNuQixDQUFDOzs7OztRQUNELFVBQVEsS0FBYTtZQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNwQixDQUFDOzs7T0FIQTtJQU1ELHNCQUNJLHlDQUFLOzs7O1FBRFQ7WUFFRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQzs7Ozs7UUFDRCxVQUFVLEtBQWE7WUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDdEIsQ0FBQzs7O09BSEE7SUFRRCxzQkFBSSwyQ0FBTzs7OztRQUFYO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3BCLENBQUM7OztPQUFBOzs7O0lBVUQseUNBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDekIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUM7U0FDL0I7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDO1NBQzdCO0lBQ0gsQ0FBQzs7Z0JBcERGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixraUJBQThDOztpQkFFL0M7Ozs7Z0JBTlEsYUFBYTs7O3lCQWFuQixNQUFNO3NCQUVOLEtBQUs7d0JBU0wsS0FBSzt3QkFTTCxLQUFLOztJQXNCUiw2QkFBQztDQUFBLEFBckRELElBcURDO1NBL0NZLHNCQUFzQjs7O0lBRWpDLDBDQUErQjs7SUFDL0IsMENBQXNDOztJQUV0Qyx3Q0FBK0M7Ozs7O0lBUy9DLHNDQUFxQjs7Ozs7SUFTckIsd0NBQXVCOztJQUV2Qix1Q0FBdUM7O0lBTXZDLHlDQUF1Qjs7Ozs7SUFHckIsd0NBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vc2hhcmVkL21hcCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uLCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLW9mZmxpbmUtYnV0dG9uJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vb2ZmbGluZS1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL29mZmxpbmUtYnV0dG9uLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBPZmZsaW5lQnV0dG9uQ29tcG9uZW50IHtcclxuXHJcbiAgYnRuU3R5bGU6IHN0cmluZyA9ICdiYXNlU3R5bGUnO1xyXG4gIGNvbG9yT2ZmOiBzdHJpbmcgPSAncmdiKDI1NSwyNTUsMjU1KSc7XHJcblxyXG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAge1xyXG4gICAgcmV0dXJuIHRoaXMuX21hcDtcclxuICB9XHJcbiAgc2V0IG1hcCh2YWx1ZTogSWdvTWFwKSB7XHJcbiAgICB0aGlzLl9tYXAgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfbWFwOiBJZ29NYXA7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGNvbG9yKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29sb3I7XHJcbiAgfVxyXG4gIHNldCBjb2xvcih2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9jb2xvciA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9jb2xvcjogc3RyaW5nO1xyXG5cclxuICBASW5wdXQoKSBwdWJsaWMgY2hlY2s6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgZ2V0IGNoZWNrZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5jaGVjaztcclxuICB9XHJcblxyXG4gIHB1YmxpYyB2aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2VcclxuICAgICkge1xyXG4gICAgdGhpcy52aXNpYmxlID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdvZmZsaW5lQnV0dG9uJykgPyB0cnVlIDogZmFsc2U7XHJcbiAgfVxyXG5cclxuICBvblRvZ2dsZSgpIHtcclxuICAgIHRoaXMuY2hlY2sgPSAhdGhpcy5jaGVjaztcclxuICAgIGlmICh0aGlzLmNoZWNrKSB7XHJcbiAgICAgIHRoaXMuYnRuU3R5bGUgPSAndG9nZ2xlU3R5bGUnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5idG5TdHlsZSA9ICdiYXNlU3R5bGUnO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=