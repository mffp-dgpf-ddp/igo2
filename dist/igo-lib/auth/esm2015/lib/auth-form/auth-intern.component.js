/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
export class AuthInternComponent {
    /**
     * @param {?} auth
     * @param {?} fb
     */
    constructor(auth, fb) {
        this.auth = auth;
        this._allowAnonymous = true;
        this.error = '';
        this.login = new EventEmitter();
        this.form = fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    /**
     * @return {?}
     */
    get allowAnonymous() {
        return this._allowAnonymous;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set allowAnonymous(value) {
        this._allowAnonymous = value;
    }
    /**
     * @param {?} values
     * @return {?}
     */
    loginUser(values) {
        this.auth.login(values.username, values.password).subscribe((/**
         * @return {?}
         */
        () => {
            this.login.emit(true);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        (error) => {
            this.error = error.error.message;
        }));
        return false;
    }
    /**
     * @return {?}
     */
    loginAnonymous() {
        this.auth.loginAnonymous().subscribe((/**
         * @return {?}
         */
        () => {
            this.login.emit(true);
        }));
    }
}
AuthInternComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-auth-intern',
                template: "<form [formGroup]=\"form\" role=\"form\" (ngSubmit)=\"loginUser(form.value)\">\r\n  <div>\r\n    <mat-form-field class=\"full-width\">\r\n      <input matInput required placeholder=\"{{'igo.auth.user' | translate}}\" formControlName=\"username\">\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div>\r\n    <mat-form-field class=\"full-width\">\r\n      <input matInput required type=\"password\" placeholder=\"{{'igo.auth.password' | translate}}\" formControlName=\"password\">\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <button mat-raised-button type=\"submit\" [disabled]=\"!form.valid\">{{'igo.auth.login' | translate}}</button>\r\n  <button *ngIf=\"allowAnonymous\" mat-raised-button type=\"button\" (click)=\"loginAnonymous()\">{{'igo.auth.accessAnonymous' | translate }}</button>\r\n  <div *ngIf=\"error\">\r\n    <br/>\r\n    <font size=\"3\" color=\"red\">{{error}}</font>\r\n  </div>\r\n</form>\r\n",
                changeDetection: ChangeDetectionStrategy.Default,
                styles: [".full-width{width:100%}"]
            }] }
];
/** @nocollapse */
AuthInternComponent.ctorParameters = () => [
    { type: AuthService },
    { type: FormBuilder }
];
AuthInternComponent.propDecorators = {
    allowAnonymous: [{ type: Input }],
    login: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1pbnRlcm4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvYXV0aC8iLCJzb3VyY2VzIjpbImxpYi9hdXRoLWZvcm0vYXV0aC1pbnRlcm4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULHVCQUF1QixFQUN2QixLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsVUFBVSxFQUFhLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQVFyRCxNQUFNLE9BQU8sbUJBQW1COzs7OztJQWU5QixZQUFtQixJQUFpQixFQUFFLEVBQWU7UUFBbEMsU0FBSSxHQUFKLElBQUksQ0FBYTtRQVA1QixvQkFBZSxHQUFHLElBQUksQ0FBQztRQUV4QixVQUFLLEdBQUcsRUFBRSxDQUFDO1FBR1IsVUFBSyxHQUEwQixJQUFJLFlBQVksRUFBVyxDQUFDO1FBR25FLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNuQixRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUNuQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQztTQUNwQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7O0lBbkJELElBQ0ksY0FBYztRQUNoQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQzs7Ozs7SUFDRCxJQUFJLGNBQWMsQ0FBQyxLQUFjO1FBQy9CLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBZUQsU0FBUyxDQUFDLE1BQVc7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUzs7O1FBQ3pELEdBQUcsRUFBRTtZQUNILElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLENBQUM7Ozs7UUFDRCxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUNuQyxDQUFDLEVBQ0YsQ0FBQztRQUNGLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7OztJQUVELGNBQWM7UUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLFNBQVM7OztRQUFDLEdBQUcsRUFBRTtZQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7OztZQTVDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsMDVCQUEyQztnQkFFM0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87O2FBQ2pEOzs7O1lBUFEsV0FBVztZQURZLFdBQVc7Ozs2QkFVeEMsS0FBSztvQkFZTCxNQUFNOzs7Ozs7O0lBTFAsOENBQStCOztJQUUvQixvQ0FBa0I7O0lBQ2xCLG1DQUF1Qjs7SUFFdkIsb0NBQXFFOztJQUV6RCxtQ0FBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFZhbGlkYXRvcnMsIEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2F1dGguc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1hdXRoLWludGVybicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2F1dGgtaW50ZXJuLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hdXRoLWludGVybi5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXV0aEludGVybkNvbXBvbmVudCB7XHJcbiAgQElucHV0KClcclxuICBnZXQgYWxsb3dBbm9ueW1vdXMoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fYWxsb3dBbm9ueW1vdXM7XHJcbiAgfVxyXG4gIHNldCBhbGxvd0Fub255bW91cyh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fYWxsb3dBbm9ueW1vdXMgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfYWxsb3dBbm9ueW1vdXMgPSB0cnVlO1xyXG5cclxuICBwdWJsaWMgZXJyb3IgPSAnJztcclxuICBwdWJsaWMgZm9ybTogRm9ybUdyb3VwO1xyXG5cclxuICBAT3V0cHV0KCkgbG9naW46IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGF1dGg6IEF1dGhTZXJ2aWNlLCBmYjogRm9ybUJ1aWxkZXIpIHtcclxuICAgIHRoaXMuZm9ybSA9IGZiLmdyb3VwKHtcclxuICAgICAgdXNlcm5hbWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXHJcbiAgICAgIHBhc3N3b3JkOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGxvZ2luVXNlcih2YWx1ZXM6IGFueSkge1xyXG4gICAgdGhpcy5hdXRoLmxvZ2luKHZhbHVlcy51c2VybmFtZSwgdmFsdWVzLnBhc3N3b3JkKS5zdWJzY3JpYmUoXHJcbiAgICAgICgpID0+IHtcclxuICAgICAgICB0aGlzLmxvZ2luLmVtaXQodHJ1ZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIChlcnJvcjogYW55KSA9PiB7XHJcbiAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yLmVycm9yLm1lc3NhZ2U7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBsb2dpbkFub255bW91cygpIHtcclxuICAgIHRoaXMuYXV0aC5sb2dpbkFub255bW91cygpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMubG9naW4uZW1pdCh0cnVlKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=