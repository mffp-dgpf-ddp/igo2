/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
var AuthInternComponent = /** @class */ (function () {
    function AuthInternComponent(auth, fb) {
        this.auth = auth;
        this._allowAnonymous = true;
        this.error = '';
        this.login = new EventEmitter();
        this.form = fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    Object.defineProperty(AuthInternComponent.prototype, "allowAnonymous", {
        get: /**
         * @return {?}
         */
        function () {
            return this._allowAnonymous;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._allowAnonymous = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} values
     * @return {?}
     */
    AuthInternComponent.prototype.loginUser = /**
     * @param {?} values
     * @return {?}
     */
    function (values) {
        var _this = this;
        this.auth.login(values.username, values.password).subscribe((/**
         * @return {?}
         */
        function () {
            _this.login.emit(true);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            _this.error = error.error.message;
        }));
        return false;
    };
    /**
     * @return {?}
     */
    AuthInternComponent.prototype.loginAnonymous = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.auth.loginAnonymous().subscribe((/**
         * @return {?}
         */
        function () {
            _this.login.emit(true);
        }));
    };
    AuthInternComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-auth-intern',
                    template: "<form [formGroup]=\"form\" role=\"form\" (ngSubmit)=\"loginUser(form.value)\">\r\n  <div>\r\n    <mat-form-field class=\"full-width\">\r\n      <input matInput required placeholder=\"{{'igo.auth.user' | translate}}\" formControlName=\"username\">\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div>\r\n    <mat-form-field class=\"full-width\">\r\n      <input matInput required type=\"password\" placeholder=\"{{'igo.auth.password' | translate}}\" formControlName=\"password\">\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <button mat-raised-button type=\"submit\" [disabled]=\"!form.valid\">{{'igo.auth.login' | translate}}</button>\r\n  <button *ngIf=\"allowAnonymous\" mat-raised-button type=\"button\" (click)=\"loginAnonymous()\">{{'igo.auth.accessAnonymous' | translate }}</button>\r\n  <div *ngIf=\"error\">\r\n    <br/>\r\n    <font size=\"3\" color=\"red\">{{error}}</font>\r\n  </div>\r\n</form>\r\n",
                    changeDetection: ChangeDetectionStrategy.Default,
                    styles: [".full-width{width:100%}"]
                }] }
    ];
    /** @nocollapse */
    AuthInternComponent.ctorParameters = function () { return [
        { type: AuthService },
        { type: FormBuilder }
    ]; };
    AuthInternComponent.propDecorators = {
        allowAnonymous: [{ type: Input }],
        login: [{ type: Output }]
    };
    return AuthInternComponent;
}());
export { AuthInternComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    AuthInternComponent.prototype._allowAnonymous;
    /** @type {?} */
    AuthInternComponent.prototype.error;
    /** @type {?} */
    AuthInternComponent.prototype.form;
    /** @type {?} */
    AuthInternComponent.prototype.login;
    /** @type {?} */
    AuthInternComponent.prototype.auth;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1pbnRlcm4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvYXV0aC8iLCJzb3VyY2VzIjpbImxpYi9hdXRoLWZvcm0vYXV0aC1pbnRlcm4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULHVCQUF1QixFQUN2QixLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsVUFBVSxFQUFhLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVyRDtJQXFCRSw2QkFBbUIsSUFBaUIsRUFBRSxFQUFlO1FBQWxDLFNBQUksR0FBSixJQUFJLENBQWE7UUFQNUIsb0JBQWUsR0FBRyxJQUFJLENBQUM7UUFFeEIsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUdSLFVBQUssR0FBMEIsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUduRSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDbkIsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDbkMsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7U0FDcEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQW5CRCxzQkFDSSwrQ0FBYzs7OztRQURsQjtZQUVFLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUM5QixDQUFDOzs7OztRQUNELFVBQW1CLEtBQWM7WUFDL0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDL0IsQ0FBQzs7O09BSEE7Ozs7O0lBa0JELHVDQUFTOzs7O0lBQVQsVUFBVSxNQUFXO1FBQXJCLGlCQVVDO1FBVEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUzs7O1FBQ3pEO1lBQ0UsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsQ0FBQzs7OztRQUNELFVBQUMsS0FBVTtZQUNULEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDbkMsQ0FBQyxFQUNGLENBQUM7UUFDRixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Ozs7SUFFRCw0Q0FBYzs7O0lBQWQ7UUFBQSxpQkFJQztRQUhDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsU0FBUzs7O1FBQUM7WUFDbkMsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOztnQkE1Q0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLDA1QkFBMkM7b0JBRTNDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPOztpQkFDakQ7Ozs7Z0JBUFEsV0FBVztnQkFEWSxXQUFXOzs7aUNBVXhDLEtBQUs7d0JBWUwsTUFBTTs7SUEwQlQsMEJBQUM7Q0FBQSxBQTdDRCxJQTZDQztTQXZDWSxtQkFBbUI7Ozs7OztJQVE5Qiw4Q0FBK0I7O0lBRS9CLG9DQUFrQjs7SUFDbEIsbUNBQXVCOztJQUV2QixvQ0FBcUU7O0lBRXpELG1DQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVmFsaWRhdG9ycywgRm9ybUdyb3VwLCBGb3JtQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvYXV0aC5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWF1dGgtaW50ZXJuJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXV0aC1pbnRlcm4uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2F1dGgtaW50ZXJuLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBdXRoSW50ZXJuQ29tcG9uZW50IHtcclxuICBASW5wdXQoKVxyXG4gIGdldCBhbGxvd0Fub255bW91cygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9hbGxvd0Fub255bW91cztcclxuICB9XHJcbiAgc2V0IGFsbG93QW5vbnltb3VzKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9hbGxvd0Fub255bW91cyA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9hbGxvd0Fub255bW91cyA9IHRydWU7XHJcblxyXG4gIHB1YmxpYyBlcnJvciA9ICcnO1xyXG4gIHB1YmxpYyBmb3JtOiBGb3JtR3JvdXA7XHJcblxyXG4gIEBPdXRwdXQoKSBsb2dpbjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgYXV0aDogQXV0aFNlcnZpY2UsIGZiOiBGb3JtQnVpbGRlcikge1xyXG4gICAgdGhpcy5mb3JtID0gZmIuZ3JvdXAoe1xyXG4gICAgICB1c2VybmFtZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcclxuICAgICAgcGFzc3dvcmQ6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbG9naW5Vc2VyKHZhbHVlczogYW55KSB7XHJcbiAgICB0aGlzLmF1dGgubG9naW4odmFsdWVzLnVzZXJuYW1lLCB2YWx1ZXMucGFzc3dvcmQpLnN1YnNjcmliZShcclxuICAgICAgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9naW4uZW1pdCh0cnVlKTtcclxuICAgICAgfSxcclxuICAgICAgKGVycm9yOiBhbnkpID0+IHtcclxuICAgICAgICB0aGlzLmVycm9yID0gZXJyb3IuZXJyb3IubWVzc2FnZTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGxvZ2luQW5vbnltb3VzKCkge1xyXG4gICAgdGhpcy5hdXRoLmxvZ2luQW5vbnltb3VzKCkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5sb2dpbi5lbWl0KHRydWUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==