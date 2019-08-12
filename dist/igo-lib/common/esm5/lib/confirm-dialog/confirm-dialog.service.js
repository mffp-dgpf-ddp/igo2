/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog.component';
var ConfirmDialogService = /** @class */ (function () {
    function ConfirmDialogService(dialog) {
        this.dialog = dialog;
    }
    /**
     * @param {?} message
     * @return {?}
     */
    ConfirmDialogService.prototype.open = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        /** @type {?} */
        var dialogRef = this.dialog.open(ConfirmDialogComponent, {
            disableClose: false
        });
        dialogRef.componentInstance.confirmMessage = message;
        return dialogRef.afterClosed();
    };
    ConfirmDialogService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ConfirmDialogService.ctorParameters = function () { return [
        { type: MatDialog }
    ]; };
    return ConfirmDialogService;
}());
export { ConfirmDialogService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ConfirmDialogService.prototype.dialog;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS1kaWFsb2cuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9jb25maXJtLWRpYWxvZy9jb25maXJtLWRpYWxvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUk5QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUVwRTtJQUVFLDhCQUFvQixNQUFpQjtRQUFqQixXQUFNLEdBQU4sTUFBTSxDQUFXO0lBQUcsQ0FBQzs7Ozs7SUFFbEMsbUNBQUk7Ozs7SUFBWCxVQUFZLE9BQWU7O1lBQ25CLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtZQUN6RCxZQUFZLEVBQUUsS0FBSztTQUNwQixDQUFDO1FBQ0YsU0FBUyxDQUFDLGlCQUFpQixDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7UUFFckQsT0FBTyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDakMsQ0FBQzs7Z0JBWEYsVUFBVTs7OztnQkFORixTQUFTOztJQWtCbEIsMkJBQUM7Q0FBQSxBQVpELElBWUM7U0FYWSxvQkFBb0I7Ozs7OztJQUNuQixzQ0FBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IENvbmZpcm1EaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2NvbmZpcm0tZGlhbG9nLmNvbXBvbmVudCc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDb25maXJtRGlhbG9nU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZykge31cclxuXHJcbiAgcHVibGljIG9wZW4obWVzc2FnZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oQ29uZmlybURpYWxvZ0NvbXBvbmVudCwge1xyXG4gICAgICBkaXNhYmxlQ2xvc2U6IGZhbHNlXHJcbiAgICB9KTtcclxuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5jb25maXJtTWVzc2FnZSA9IG1lc3NhZ2U7XHJcblxyXG4gICAgcmV0dXJuIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpO1xyXG4gIH1cclxufVxyXG4iXX0=