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
export class UserButtonComponent {
    /**
     * @param {?} dialog
     * @param {?} config
     * @param {?} auth
     */
    constructor(dialog, config, auth) {
        this.dialog = dialog;
        this.config = config;
        this.auth = auth;
        this.expand = false;
        this.visible = false;
        this.hasApi = false;
        this.visible = this.config.getConfig('auth') ? true : false;
        this.hasApi = this.config.getConfig('context.url') !== undefined;
    }
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
     * @return {?}
     */
    accountClick() {
        if (this.auth.authenticated) {
            this.expand = !this.expand;
        }
        else {
            this.auth.logout();
        }
    }
    /**
     * @return {?}
     */
    logout() {
        this.expand = false;
        this.auth.logout();
    }
    /**
     * @return {?}
     */
    infoUser() {
        this.dialog.open(UserDialogComponent, { disableClose: false });
    }
}
UserButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-user-button',
                template: "<div *ngIf=\"visible\" class=\"igo-user-button-container\">\r\n  <div class=\"igo-user-button-more-container\" [@userButtonState]=\"expand ? 'expand' : 'collapse'\">\r\n\r\n    <igo-poi-button *ngIf=\"hasApi\" [color]=\"color\" [map]=\"map\"></igo-poi-button>\r\n    <igo-bookmark-button *ngIf=\"hasApi\" [color]=\"color\" [map]=\"map\"></igo-bookmark-button>\r\n\r\n    <button\r\n      mat-icon-button\r\n      [matTooltip]=\"'igo.context.userButton.infoTitle' | translate\"\r\n      matTooltipPosition=\"above\"\r\n      [color]=\"color\"\r\n      (click)=\"infoUser()\">\r\n      <mat-icon svgIcon=\"information-outline\"></mat-icon>\r\n    </button>\r\n\r\n    <button\r\n      mat-icon-button\r\n      [matTooltip]=\"'igo.context.userButton.logout' |\u00A0translate\"\r\n      matTooltipPosition=\"above\"\r\n      [color]=\"color\"\r\n      (click)=\"logout()\">\r\n      <mat-icon svgIcon=\"power\"></mat-icon>\r\n    </button>\r\n\r\n  </div>\r\n\r\n  <button\r\n    mat-icon-button\r\n    [color]=\"auth.authenticated ? color : 'warn'\"\r\n    (click)=\"accountClick()\">\r\n    <mat-icon svgIcon=\"account-box\"></mat-icon>\r\n  </button>\r\n</div>\r\n",
                animations: [userButtonSlideInOut()],
                styles: [".igo-user-button-container button{background-color:#fff}.igo-user-button-container button:hover{background-color:#efefef}.igo-user-button-more-container{float:left;height:40px}.igo-user-button-more-container>*{margin-right:2px;float:left}@media only screen and (orientation:portrait) and (max-width:599px),only screen and (orientation:landscape) and (max-width:959px){.igo-user-button-container>button{position:absolute;bottom:0}.igo-user-button-more-container{height:80px;width:150px;position:relative;left:24px}}:host>>>button .mat-button-ripple-round,button{border-radius:0}"]
            }] }
];
/** @nocollapse */
UserButtonComponent.ctorParameters = () => [
    { type: MatDialog },
    { type: ConfigService },
    { type: AuthService }
];
UserButtonComponent.propDecorators = {
    map: [{ type: Input }],
    color: [{ type: Input }]
};
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
    /** @type {?} */
    UserButtonComponent.prototype.hasApi;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29udGV4dC8iLCJzb3VyY2VzIjpbImxpYi9jb250ZXh0LW1hcC1idXR0b24vdXNlci1idXR0b24vdXNlci1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFOUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFbkMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFRL0QsTUFBTSxPQUFPLG1CQUFtQjs7Ozs7O0lBdUI5QixZQUNVLE1BQWlCLEVBQ2pCLE1BQXFCLEVBQ3RCLElBQWlCO1FBRmhCLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDakIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUN0QixTQUFJLEdBQUosSUFBSSxDQUFhO1FBUG5CLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFPcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDNUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxTQUFTLENBQUM7SUFDbkUsQ0FBQzs7OztJQTdCRCxJQUNJLEdBQUc7UUFDTCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbkIsQ0FBQzs7Ozs7SUFDRCxJQUFJLEdBQUcsQ0FBQyxLQUFhO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLENBQUM7Ozs7SUFHRCxJQUNJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFhO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7Ozs7SUFnQkQsWUFBWTtRQUNWLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDNUI7YUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDcEI7SUFDSCxDQUFDOzs7O0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDckIsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7OztZQXJERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsdXBDQUEyQztnQkFFM0MsVUFBVSxFQUFFLENBQUMsb0JBQW9CLEVBQUUsQ0FBQzs7YUFDckM7Ozs7WUFkUSxTQUFTO1lBRVQsYUFBYTtZQUNiLFdBQVc7OztrQkFhakIsS0FBSztvQkFTTCxLQUFLOzs7Ozs7O0lBRk4sbUNBQXFCOzs7OztJQVNyQixxQ0FBdUI7O0lBRXZCLHFDQUFzQjs7SUFDdEIsc0NBQXVCOztJQUN2QixxQ0FBc0I7Ozs7O0lBR3BCLHFDQUF5Qjs7Ozs7SUFDekIscUNBQTZCOztJQUM3QixtQ0FBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICdAaWdvMi9hdXRoJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnQGlnbzIvZ2VvJztcclxuXHJcbmltcG9ydCB7IFVzZXJEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL3VzZXItZGlhbG9nLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IHVzZXJCdXR0b25TbGlkZUluT3V0IH0gZnJvbSAnLi91c2VyLWJ1dHRvbi5hbmltYXRpb24nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tdXNlci1idXR0b24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi91c2VyLWJ1dHRvbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdXNlci1idXR0b24uY29tcG9uZW50LnNjc3MnXSxcclxuICBhbmltYXRpb25zOiBbdXNlckJ1dHRvblNsaWRlSW5PdXQoKV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFVzZXJCdXR0b25Db21wb25lbnQge1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAge1xyXG4gICAgcmV0dXJuIHRoaXMuX21hcDtcclxuICB9XHJcbiAgc2V0IG1hcCh2YWx1ZTogSWdvTWFwKSB7XHJcbiAgICB0aGlzLl9tYXAgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfbWFwOiBJZ29NYXA7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGNvbG9yKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29sb3I7XHJcbiAgfVxyXG4gIHNldCBjb2xvcih2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9jb2xvciA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9jb2xvcjogc3RyaW5nO1xyXG5cclxuICBwdWJsaWMgZXhwYW5kID0gZmFsc2U7XHJcbiAgcHVibGljIHZpc2libGUgPSBmYWxzZTtcclxuICBwdWJsaWMgaGFzQXBpID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZyxcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlLFxyXG4gICAgcHVibGljIGF1dGg6IEF1dGhTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLnZpc2libGUgPSB0aGlzLmNvbmZpZy5nZXRDb25maWcoJ2F1dGgnKSA/IHRydWUgOiBmYWxzZTtcclxuICAgIHRoaXMuaGFzQXBpID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdjb250ZXh0LnVybCcpICE9PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBhY2NvdW50Q2xpY2soKSB7XHJcbiAgICBpZiAodGhpcy5hdXRoLmF1dGhlbnRpY2F0ZWQpIHtcclxuICAgICAgdGhpcy5leHBhbmQgPSAhdGhpcy5leHBhbmQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmF1dGgubG9nb3V0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsb2dvdXQoKSB7XHJcbiAgICB0aGlzLmV4cGFuZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5hdXRoLmxvZ291dCgpO1xyXG4gIH1cclxuXHJcbiAgaW5mb1VzZXIoKSB7XHJcbiAgICB0aGlzLmRpYWxvZy5vcGVuKFVzZXJEaWFsb2dDb21wb25lbnQsIHsgZGlzYWJsZUNsb3NlOiBmYWxzZSB9KTtcclxuICB9XHJcbn1cclxuIl19