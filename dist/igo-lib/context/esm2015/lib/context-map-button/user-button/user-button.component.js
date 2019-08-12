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
        this.visible = this.config.getConfig('auth') ? true : false;
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
                template: "<div *ngIf=\"visible\" class=\"igo-user-button-container\">\r\n  <div class=\"igo-user-button-more-container\" [@userButtonState]=\"expand ? 'expand' : 'collapse'\">\r\n\r\n    <igo-poi-button [color]=\"color\" [map]=\"map\"></igo-poi-button>\r\n    <igo-bookmark-button [color]=\"color\" [map]=\"map\"></igo-bookmark-button>\r\n\r\n    <button\r\n      mat-icon-button\r\n      [matTooltip]=\"'igo.context.userButton.infoTitle' | translate\"\r\n      matTooltipPosition=\"above\"\r\n      [color]=\"color\"\r\n      (click)=\"infoUser()\">\r\n      <mat-icon svgIcon=\"information-outline\"></mat-icon>\r\n    </button>\r\n\r\n    <button\r\n      mat-icon-button\r\n      [matTooltip]=\"'igo.context.userButton.logout' |\u00A0translate\"\r\n      matTooltipPosition=\"above\"\r\n      [color]=\"color\"\r\n      (click)=\"logout()\">\r\n      <mat-icon svgIcon=\"power\"></mat-icon>\r\n    </button>\r\n\r\n  </div>\r\n\r\n  <button\r\n    mat-icon-button\r\n    [color]=\"auth.authenticated ? color : 'warn'\"\r\n    (click)=\"accountClick()\">\r\n    <mat-icon svgIcon=\"account-box\"></mat-icon>\r\n  </button>\r\n</div>\r\n",
                animations: [userButtonSlideInOut()],
                styles: [".igo-user-button-container button{background-color:#fff}.igo-user-button-container button:hover{background-color:#efefef}.igo-user-button-more-container{float:left;height:40px}.igo-user-button-more-container>*{margin-right:2px;float:left}@media only screen and (max-width:450px),only screen and (max-height:450px){.igo-user-button-container>button{position:absolute;bottom:0}.igo-user-button-more-container{height:80px;width:150px;position:relative;left:24px}}:host>>>button .mat-button-ripple-round,button{border-radius:0}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29udGV4dC8iLCJzb3VyY2VzIjpbImxpYi9jb250ZXh0LW1hcC1idXR0b24vdXNlci1idXR0b24vdXNlci1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFOUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFbkMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFRL0QsTUFBTSxPQUFPLG1CQUFtQjs7Ozs7O0lBc0I5QixZQUNVLE1BQWlCLEVBQ2pCLE1BQXFCLEVBQ3RCLElBQWlCO1FBRmhCLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDakIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUN0QixTQUFJLEdBQUosSUFBSSxDQUFhO1FBTm5CLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBT3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQzlELENBQUM7Ozs7SUEzQkQsSUFDSSxHQUFHO1FBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7Ozs7O0lBQ0QsSUFBSSxHQUFHLENBQUMsS0FBYTtRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUNwQixDQUFDOzs7O0lBR0QsSUFDSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBQ0QsSUFBSSxLQUFLLENBQUMsS0FBYTtRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDOzs7O0lBY0QsWUFBWTtRQUNWLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDNUI7YUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDcEI7SUFDSCxDQUFDOzs7O0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDckIsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7OztZQW5ERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IscW5DQUEyQztnQkFFM0MsVUFBVSxFQUFFLENBQUMsb0JBQW9CLEVBQUUsQ0FBQzs7YUFDckM7Ozs7WUFkUSxTQUFTO1lBRVQsYUFBYTtZQUNiLFdBQVc7OztrQkFhakIsS0FBSztvQkFTTCxLQUFLOzs7Ozs7O0lBRk4sbUNBQXFCOzs7OztJQVNyQixxQ0FBdUI7O0lBRXZCLHFDQUFzQjs7SUFDdEIsc0NBQXVCOzs7OztJQUdyQixxQ0FBeUI7Ozs7O0lBQ3pCLHFDQUE2Qjs7SUFDN0IsbUNBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvYXV0aCc7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJ0BpZ28yL2dlbyc7XHJcblxyXG5pbXBvcnQgeyBVc2VyRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi91c2VyLWRpYWxvZy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyB1c2VyQnV0dG9uU2xpZGVJbk91dCB9IGZyb20gJy4vdXNlci1idXR0b24uYW5pbWF0aW9uJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXVzZXItYnV0dG9uJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vdXNlci1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3VzZXItYnV0dG9uLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgYW5pbWF0aW9uczogW3VzZXJCdXR0b25TbGlkZUluT3V0KCldXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBVc2VyQnV0dG9uQ29tcG9uZW50IHtcclxuICBASW5wdXQoKVxyXG4gIGdldCBtYXAoKTogSWdvTWFwIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXA7XHJcbiAgfVxyXG4gIHNldCBtYXAodmFsdWU6IElnb01hcCkge1xyXG4gICAgdGhpcy5fbWFwID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX21hcDogSWdvTWFwO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBjb2xvcigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xyXG4gIH1cclxuICBzZXQgY29sb3IodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5fY29sb3IgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfY29sb3I6IHN0cmluZztcclxuXHJcbiAgcHVibGljIGV4cGFuZCA9IGZhbHNlO1xyXG4gIHB1YmxpYyB2aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZyxcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlLFxyXG4gICAgcHVibGljIGF1dGg6IEF1dGhTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLnZpc2libGUgPSB0aGlzLmNvbmZpZy5nZXRDb25maWcoJ2F1dGgnKSA/IHRydWUgOiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGFjY291bnRDbGljaygpIHtcclxuICAgIGlmICh0aGlzLmF1dGguYXV0aGVudGljYXRlZCkge1xyXG4gICAgICB0aGlzLmV4cGFuZCA9ICF0aGlzLmV4cGFuZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYXV0aC5sb2dvdXQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxvZ291dCgpIHtcclxuICAgIHRoaXMuZXhwYW5kID0gZmFsc2U7XHJcbiAgICB0aGlzLmF1dGgubG9nb3V0KCk7XHJcbiAgfVxyXG5cclxuICBpbmZvVXNlcigpIHtcclxuICAgIHRoaXMuZGlhbG9nLm9wZW4oVXNlckRpYWxvZ0NvbXBvbmVudCwgeyBkaXNhYmxlQ2xvc2U6IGZhbHNlIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=