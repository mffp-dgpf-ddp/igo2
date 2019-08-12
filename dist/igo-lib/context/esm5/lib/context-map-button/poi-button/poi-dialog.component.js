/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
var PoiDialogComponent = /** @class */ (function () {
    function PoiDialogComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    PoiDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-poi-dialog',
                    template: "<h1 mat-dialog-title>{{ 'igo.context.poiButton.dialog.title' | translate }}</h1>\r\n<div mat-dialog-content>\r\n  <mat-form-field>\r\n    <input matInput required autocomplete=\"off\"\r\n      [placeholder]=\"'igo.context.poiButton.dialog.placeholder' | translate\"\r\n      [(ngModel)]=\"title\">\r\n  </mat-form-field>\r\n</div>\r\n<div mat-dialog-actions>\r\n  <button mat-button color=\"primary\"\r\n         [disabled]=\"!title\"\r\n         (click)=\"dialogRef.close(title)\">\r\n    {{'igo.common.confirmDialog.confirmBtn' | translate}}\r\n  </button>\r\n  <button mat-button\r\n          (click)=\"dialogRef.close(false)\">\r\n    {{'igo.common.confirmDialog.cancelBtn' |\u00A0translate}}\r\n  </button>\r\n</div>\r\n"
                }] }
    ];
    /** @nocollapse */
    PoiDialogComponent.ctorParameters = function () { return [
        { type: MatDialogRef }
    ]; };
    return PoiDialogComponent;
}());
export { PoiDialogComponent };
if (false) {
    /** @type {?} */
    PoiDialogComponent.prototype.title;
    /** @type {?} */
    PoiDialogComponent.prototype.dialogRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9pLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb250ZXh0LyIsInNvdXJjZXMiOlsibGliL2NvbnRleHQtbWFwLWJ1dHRvbi9wb2ktYnV0dG9uL3BvaS1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVqRDtJQU9FLDRCQUFtQixTQUEyQztRQUEzQyxjQUFTLEdBQVQsU0FBUyxDQUFrQztJQUFHLENBQUM7O2dCQVBuRSxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsaXVCQUEwQztpQkFDM0M7Ozs7Z0JBTFEsWUFBWTs7SUFVckIseUJBQUM7Q0FBQSxBQVJELElBUUM7U0FKWSxrQkFBa0I7OztJQUM3QixtQ0FBcUI7O0lBRVQsdUNBQWtEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXBvaS1kaWFsb2cnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9wb2ktZGlhbG9nLmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUG9pRGlhbG9nQ29tcG9uZW50IHtcclxuICBwdWJsaWMgdGl0bGU6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFBvaURpYWxvZ0NvbXBvbmVudD4pIHt9XHJcbn1cclxuIl19