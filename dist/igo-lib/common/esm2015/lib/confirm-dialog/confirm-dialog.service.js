/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog.component';
export class ConfirmDialogService {
    /**
     * @param {?} dialog
     */
    constructor(dialog) {
        this.dialog = dialog;
    }
    /**
     * @param {?} message
     * @return {?}
     */
    open(message) {
        /** @type {?} */
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            disableClose: false
        });
        dialogRef.componentInstance.confirmMessage = message;
        return dialogRef.afterClosed();
    }
}
ConfirmDialogService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ConfirmDialogService.ctorParameters = () => [
    { type: MatDialog }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    ConfirmDialogService.prototype.dialog;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS1kaWFsb2cuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9jb25maXJtLWRpYWxvZy9jb25maXJtLWRpYWxvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUk5QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUdwRSxNQUFNLE9BQU8sb0JBQW9COzs7O0lBQy9CLFlBQW9CLE1BQWlCO1FBQWpCLFdBQU0sR0FBTixNQUFNLENBQVc7SUFBRyxDQUFDOzs7OztJQUVsQyxJQUFJLENBQUMsT0FBZTs7Y0FDbkIsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQ3pELFlBQVksRUFBRSxLQUFLO1NBQ3BCLENBQUM7UUFDRixTQUFTLENBQUMsaUJBQWlCLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztRQUVyRCxPQUFPLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNqQyxDQUFDOzs7WUFYRixVQUFVOzs7O1lBTkYsU0FBUzs7Ozs7OztJQVFKLHNDQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlybURpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY29uZmlybS1kaWFsb2cuY29tcG9uZW50JztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENvbmZpcm1EaWFsb2dTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRpYWxvZzogTWF0RGlhbG9nKSB7fVxyXG5cclxuICBwdWJsaWMgb3BlbihtZXNzYWdlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgY29uc3QgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihDb25maXJtRGlhbG9nQ29tcG9uZW50LCB7XHJcbiAgICAgIGRpc2FibGVDbG9zZTogZmFsc2VcclxuICAgIH0pO1xyXG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmNvbmZpcm1NZXNzYWdlID0gbWVzc2FnZTtcclxuXHJcbiAgICByZXR1cm4gZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==