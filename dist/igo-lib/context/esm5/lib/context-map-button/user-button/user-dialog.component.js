/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AuthService } from '@igo2/auth';
var UserDialogComponent = /** @class */ (function () {
    function UserDialogComponent(dialogRef, auth) {
        this.dialogRef = dialogRef;
        this.auth = auth;
        /** @type {?} */
        var decodeToken = this.auth.decodeToken();
        this.user = decodeToken.user;
        this.exp = new Date(decodeToken.exp * 1000).toLocaleString();
    }
    UserDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-user-dialog',
                    template: "<h1 mat-dialog-title>{{'igo.context.userButton.infoTitle' | translate}}</h1>\r\n<div mat-dialog-content>\r\n  <p>{{'igo.context.userButton.dialog.user' | translate}}: {{user.sourceId}}</p>\r\n  <p>{{'igo.context.userButton.dialog.email' | translate}}: {{user.email}}</p>\r\n  <p>{{'igo.context.userButton.dialog.expiration' | translate}}: {{exp}}</p>\r\n</div>\r\n<div mat-dialog-actions style=\"justify-content: center\">\r\n  <button mat-button color=\"primary\"\r\n         (click)=\"dialogRef.close(false)\">\r\n    OK\r\n  </button>\r\n</div>\r\n"
                }] }
    ];
    /** @nocollapse */
    UserDialogComponent.ctorParameters = function () { return [
        { type: MatDialogRef },
        { type: AuthService }
    ]; };
    return UserDialogComponent;
}());
export { UserDialogComponent };
if (false) {
    /** @type {?} */
    UserDialogComponent.prototype.user;
    /** @type {?} */
    UserDialogComponent.prototype.exp;
    /** @type {?} */
    UserDialogComponent.prototype.dialogRef;
    /**
     * @type {?}
     * @private
     */
    UserDialogComponent.prototype.auth;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29udGV4dC8iLCJzb3VyY2VzIjpbImxpYi9jb250ZXh0LW1hcC1idXR0b24vdXNlci1idXR0b24vdXNlci1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVqRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRXpDO0lBUUUsNkJBQ1MsU0FBNEMsRUFDM0MsSUFBaUI7UUFEbEIsY0FBUyxHQUFULFNBQVMsQ0FBbUM7UUFDM0MsU0FBSSxHQUFKLElBQUksQ0FBYTs7WUFFbkIsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1FBQzNDLElBQUksQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztRQUM3QixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDL0QsQ0FBQzs7Z0JBZkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLG1qQkFBMkM7aUJBQzVDOzs7O2dCQVBRLFlBQVk7Z0JBRVosV0FBVzs7SUFrQnBCLDBCQUFDO0NBQUEsQUFoQkQsSUFnQkM7U0FaWSxtQkFBbUI7OztJQUM5QixtQ0FBWTs7SUFDWixrQ0FBVzs7SUFHVCx3Q0FBbUQ7Ozs7O0lBQ25ELG1DQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJ0BpZ28yL2F1dGgnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tdXNlci1kaWFsb2cnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi91c2VyLWRpYWxvZy5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFVzZXJEaWFsb2dDb21wb25lbnQge1xyXG4gIHB1YmxpYyB1c2VyO1xyXG4gIHB1YmxpYyBleHA7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFVzZXJEaWFsb2dDb21wb25lbnQ+LFxyXG4gICAgcHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZVxyXG4gICkge1xyXG4gICAgY29uc3QgZGVjb2RlVG9rZW4gPSB0aGlzLmF1dGguZGVjb2RlVG9rZW4oKTtcclxuICAgIHRoaXMudXNlciA9IGRlY29kZVRva2VuLnVzZXI7XHJcbiAgICB0aGlzLmV4cCA9IG5ldyBEYXRlKGRlY29kZVRva2VuLmV4cCAqIDEwMDApLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==