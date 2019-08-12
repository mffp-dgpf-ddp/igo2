/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
export class BookmarkDialogComponent {
    /**
     * @param {?} dialogRef
     */
    constructor(dialogRef) {
        this.dialogRef = dialogRef;
    }
}
BookmarkDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-bookmark-dialog',
                template: "<h1 mat-dialog-title>{{ 'igo.context.bookmarkButton.dialog.title' |\u00A0translate }}</h1>\r\n<div mat-dialog-content>\r\n  <mat-form-field>\r\n    <input matInput required autocomplete=\"off\"\r\n      [placeholder]=\"'igo.context.bookmarkButton.dialog.placeholder' |\u00A0translate\"\r\n      [(ngModel)]=\"title\">\r\n  </mat-form-field>\r\n</div>\r\n<div mat-dialog-actions>\r\n  <button mat-button color=\"primary\"\r\n         [disabled]=\"!title\"\r\n         (click)=\"dialogRef.close(title)\">\r\n    {{'igo.common.confirmDialog.confirmBtn' | translate}}\r\n  </button>\r\n  <button mat-button\r\n          (click)=\"dialogRef.close(false)\">\r\n    {{'igo.common.confirmDialog.cancelBtn' |\u00A0translate}}\r\n  </button>\r\n</div>\r\n"
            }] }
];
/** @nocollapse */
BookmarkDialogComponent.ctorParameters = () => [
    { type: MatDialogRef }
];
if (false) {
    /** @type {?} */
    BookmarkDialogComponent.prototype.title;
    /** @type {?} */
    BookmarkDialogComponent.prototype.dialogRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9va21hcmstZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tYXAtYnV0dG9uL2Jvb2ttYXJrLWJ1dHRvbi9ib29rbWFyay1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQU1qRCxNQUFNLE9BQU8sdUJBQXVCOzs7O0lBR2xDLFlBQW1CLFNBQWdEO1FBQWhELGNBQVMsR0FBVCxTQUFTLENBQXVDO0lBQUcsQ0FBQzs7O1lBUHhFLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixxdkJBQStDO2FBQ2hEOzs7O1lBTFEsWUFBWTs7OztJQU9uQix3Q0FBcUI7O0lBRVQsNENBQXVEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWJvb2ttYXJrLWRpYWxvZycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2Jvb2ttYXJrLWRpYWxvZy5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEJvb2ttYXJrRGlhbG9nQ29tcG9uZW50IHtcclxuICBwdWJsaWMgdGl0bGU6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPEJvb2ttYXJrRGlhbG9nQ29tcG9uZW50Pikge31cclxufVxyXG4iXX0=