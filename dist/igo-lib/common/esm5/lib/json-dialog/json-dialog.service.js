/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { JsonDialogComponent } from './json-dialog.component';
var JsonDialogService = /** @class */ (function () {
    function JsonDialogService(dialog) {
        this.dialog = dialog;
    }
    /**
     * @param {?} title
     * @param {?} data
     * @param {?=} ignoreKeys
     * @return {?}
     */
    JsonDialogService.prototype.open = /**
     * @param {?} title
     * @param {?} data
     * @param {?=} ignoreKeys
     * @return {?}
     */
    function (title, data, ignoreKeys) {
        /** @type {?} */
        var dialogRef = this.dialog.open(JsonDialogComponent, {
            disableClose: false
        });
        dialogRef.componentInstance.data = data;
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.ignoreKeys = ignoreKeys;
        return dialogRef.afterClosed();
    };
    JsonDialogService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    JsonDialogService.ctorParameters = function () { return [
        { type: MatDialog }
    ]; };
    return JsonDialogService;
}());
export { JsonDialogService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    JsonDialogService.prototype.dialog;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1kaWFsb2cuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9qc29uLWRpYWxvZy9qc29uLWRpYWxvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUk5QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU5RDtJQUVFLDJCQUFvQixNQUFpQjtRQUFqQixXQUFNLEdBQU4sTUFBTSxDQUFXO0lBQUcsQ0FBQzs7Ozs7OztJQUVsQyxnQ0FBSTs7Ozs7O0lBQVgsVUFBWSxLQUFVLEVBQUUsSUFBSSxFQUFFLFVBQXFCOztZQUMzQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDdEQsWUFBWSxFQUFFLEtBQUs7U0FDcEIsQ0FBQztRQUNGLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3hDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQzFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBRXBELE9BQU8sU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2pDLENBQUM7O2dCQWJGLFVBQVU7Ozs7Z0JBTkYsU0FBUzs7SUFvQmxCLHdCQUFDO0NBQUEsQUFkRCxJQWNDO1NBYlksaUJBQWlCOzs7Ozs7SUFDaEIsbUNBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBKc29uRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9qc29uLWRpYWxvZy5jb21wb25lbnQnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSnNvbkRpYWxvZ1NlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2cpIHt9XHJcblxyXG4gIHB1YmxpYyBvcGVuKHRpdGxlOiBhbnksIGRhdGEsIGlnbm9yZUtleXM/OiBzdHJpbmdbXSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBjb25zdCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKEpzb25EaWFsb2dDb21wb25lbnQsIHtcclxuICAgICAgZGlzYWJsZUNsb3NlOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuZGF0YSA9IGRhdGE7XHJcbiAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UudGl0bGUgPSB0aXRsZTtcclxuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5pZ25vcmVLZXlzID0gaWdub3JlS2V5cztcclxuXHJcbiAgICByZXR1cm4gZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==