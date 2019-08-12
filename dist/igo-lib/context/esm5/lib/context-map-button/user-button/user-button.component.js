/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfigService } from '@igo2/core';
import { AuthService } from '@igo2/auth';
import { IgoMap } from '@igo2/geo';
import { UserDialogComponent } from './user-dialog.component';
import { userButtonSlideInOut } from './user-button.animation';
var UserButtonComponent = /** @class */ (function () {
    function UserButtonComponent(dialog, config, auth) {
        this.dialog = dialog;
        this.config = config;
        this.auth = auth;
        this.expand = false;
        this.visible = false;
        this.visible = this.config.getConfig('auth') ? true : false;
    }
    Object.defineProperty(UserButtonComponent.prototype, "map", {
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
    Object.defineProperty(UserButtonComponent.prototype, "color", {
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
     * @return {?}
     */
    UserButtonComponent.prototype.accountClick = /**
     * @return {?}
     */
    function () {
        if (this.auth.authenticated) {
            this.expand = !this.expand;
        }
        else {
            this.auth.logout();
        }
    };
    /**
     * @return {?}
     */
    UserButtonComponent.prototype.logout = /**
     * @return {?}
     */
    function () {
        this.expand = false;
        this.auth.logout();
    };
    /**
     * @return {?}
     */
    UserButtonComponent.prototype.infoUser = /**
     * @return {?}
     */
    function () {
        this.dialog.open(UserDialogComponent, { disableClose: false });
    };
    UserButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-user-button',
                    template: "<div *ngIf=\"visible\" class=\"igo-user-button-container\">\r\n  <div class=\"igo-user-button-more-container\" [@userButtonState]=\"expand ? 'expand' : 'collapse'\">\r\n\r\n    <igo-poi-button [color]=\"color\" [map]=\"map\"></igo-poi-button>\r\n    <igo-bookmark-button [color]=\"color\" [map]=\"map\"></igo-bookmark-button>\r\n\r\n    <button\r\n      mat-icon-button\r\n      [matTooltip]=\"'igo.context.userButton.infoTitle' | translate\"\r\n      matTooltipPosition=\"above\"\r\n      [color]=\"color\"\r\n      (click)=\"infoUser()\">\r\n      <mat-icon svgIcon=\"information-outline\"></mat-icon>\r\n    </button>\r\n\r\n    <button\r\n      mat-icon-button\r\n      [matTooltip]=\"'igo.context.userButton.logout' |\u00A0translate\"\r\n      matTooltipPosition=\"above\"\r\n      [color]=\"color\"\r\n      (click)=\"logout()\">\r\n      <mat-icon svgIcon=\"power\"></mat-icon>\r\n    </button>\r\n\r\n  </div>\r\n\r\n  <button\r\n    mat-icon-button\r\n    [color]=\"auth.authenticated ? color : 'warn'\"\r\n    (click)=\"accountClick()\">\r\n    <mat-icon svgIcon=\"account-box\"></mat-icon>\r\n  </button>\r\n</div>\r\n",
                    animations: [userButtonSlideInOut()],
                    styles: [".igo-user-button-container button{background-color:#fff}.igo-user-button-container button:hover{background-color:#efefef}.igo-user-button-more-container{float:left;height:40px}.igo-user-button-more-container>*{margin-right:2px;float:left}@media only screen and (max-width:450px),only screen and (max-height:450px){.igo-user-button-container>button{position:absolute;bottom:0}.igo-user-button-more-container{height:80px;width:150px;position:relative;left:24px}}:host>>>button .mat-button-ripple-round,button{border-radius:0}"]
                }] }
    ];
    /** @nocollapse */
    UserButtonComponent.ctorParameters = function () { return [
        { type: MatDialog },
        { type: ConfigService },
        { type: AuthService }
    ]; };
    UserButtonComponent.propDecorators = {
        map: [{ type: Input }],
        color: [{ type: Input }]
    };
    return UserButtonComponent;
}());
export { UserButtonComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    UserButtonComponent.prototype._map;
    /**
     * @type {?}
     * @private
     */
    UserButtonComponent.prototype._color;
    /** @type {?} */
    UserButtonComponent.prototype.expand;
    /** @type {?} */
    UserButtonComponent.prototype.visible;
    /**
     * @type {?}
     * @private
     */
    UserButtonComponent.prototype.dialog;
    /**
     * @type {?}
     * @private
     */
    UserButtonComponent.prototype.config;
    /** @type {?} */
    UserButtonComponent.prototype.auth;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29udGV4dC8iLCJzb3VyY2VzIjpbImxpYi9jb250ZXh0LW1hcC1idXR0b24vdXNlci1idXR0b24vdXNlci1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFOUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFbkMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFL0Q7SUE0QkUsNkJBQ1UsTUFBaUIsRUFDakIsTUFBcUIsRUFDdEIsSUFBaUI7UUFGaEIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3RCLFNBQUksR0FBSixJQUFJLENBQWE7UUFObkIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFPckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDOUQsQ0FBQztJQTNCRCxzQkFDSSxvQ0FBRzs7OztRQURQO1lBRUUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ25CLENBQUM7Ozs7O1FBQ0QsVUFBUSxLQUFhO1lBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLENBQUM7OztPQUhBO0lBTUQsc0JBQ0ksc0NBQUs7Ozs7UUFEVDtZQUVFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQixDQUFDOzs7OztRQUNELFVBQVUsS0FBYTtZQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FIQTs7OztJQWlCRCwwQ0FBWTs7O0lBQVo7UUFDRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQzVCO2FBQU07WUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQzs7OztJQUVELG9DQUFNOzs7SUFBTjtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDckIsQ0FBQzs7OztJQUVELHNDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDakUsQ0FBQzs7Z0JBbkRGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixxbkNBQTJDO29CQUUzQyxVQUFVLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDOztpQkFDckM7Ozs7Z0JBZFEsU0FBUztnQkFFVCxhQUFhO2dCQUNiLFdBQVc7OztzQkFhakIsS0FBSzt3QkFTTCxLQUFLOztJQW9DUiwwQkFBQztDQUFBLEFBcERELElBb0RDO1NBOUNZLG1CQUFtQjs7Ozs7O0lBUTlCLG1DQUFxQjs7Ozs7SUFTckIscUNBQXVCOztJQUV2QixxQ0FBc0I7O0lBQ3RCLHNDQUF1Qjs7Ozs7SUFHckIscUNBQXlCOzs7OztJQUN6QixxQ0FBNkI7O0lBQzdCLG1DQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJ0BpZ28yL2F1dGgnO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICdAaWdvMi9nZW8nO1xyXG5cclxuaW1wb3J0IHsgVXNlckRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vdXNlci1kaWFsb2cuY29tcG9uZW50JztcclxuaW1wb3J0IHsgdXNlckJ1dHRvblNsaWRlSW5PdXQgfSBmcm9tICcuL3VzZXItYnV0dG9uLmFuaW1hdGlvbic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby11c2VyLWJ1dHRvbicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3VzZXItYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi91c2VyLWJ1dHRvbi5jb21wb25lbnQuc2NzcyddLFxyXG4gIGFuaW1hdGlvbnM6IFt1c2VyQnV0dG9uU2xpZGVJbk91dCgpXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVXNlckJ1dHRvbkNvbXBvbmVudCB7XHJcbiAgQElucHV0KClcclxuICBnZXQgbWFwKCk6IElnb01hcCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWFwO1xyXG4gIH1cclxuICBzZXQgbWFwKHZhbHVlOiBJZ29NYXApIHtcclxuICAgIHRoaXMuX21hcCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9tYXA6IElnb01hcDtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgY29sb3IoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9jb2xvcjtcclxuICB9XHJcbiAgc2V0IGNvbG9yKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2NvbG9yID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2NvbG9yOiBzdHJpbmc7XHJcblxyXG4gIHB1YmxpYyBleHBhbmQgPSBmYWxzZTtcclxuICBwdWJsaWMgdmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2csXHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSxcclxuICAgIHB1YmxpYyBhdXRoOiBBdXRoU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy52aXNpYmxlID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdhdXRoJykgPyB0cnVlIDogZmFsc2U7XHJcbiAgfVxyXG5cclxuICBhY2NvdW50Q2xpY2soKSB7XHJcbiAgICBpZiAodGhpcy5hdXRoLmF1dGhlbnRpY2F0ZWQpIHtcclxuICAgICAgdGhpcy5leHBhbmQgPSAhdGhpcy5leHBhbmQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmF1dGgubG9nb3V0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsb2dvdXQoKSB7XHJcbiAgICB0aGlzLmV4cGFuZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5hdXRoLmxvZ291dCgpO1xyXG4gIH1cclxuXHJcbiAgaW5mb1VzZXIoKSB7XHJcbiAgICB0aGlzLmRpYWxvZy5vcGVuKFVzZXJEaWFsb2dDb21wb25lbnQsIHsgZGlzYWJsZUNsb3NlOiBmYWxzZSB9KTtcclxuICB9XHJcbn1cclxuIl19