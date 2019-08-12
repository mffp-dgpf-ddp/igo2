/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
var JsonDialogComponent = /** @class */ (function () {
    function JsonDialogComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    JsonDialogComponent.prototype.isObject = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        return typeof val === 'object' && !Array.isArray(val);
    };
    /**
     * @param {?} baseKey
     * @param {?} key
     * @return {?}
     */
    JsonDialogComponent.prototype.getKey = /**
     * @param {?} baseKey
     * @param {?} key
     * @return {?}
     */
    function (baseKey, key) {
        return (baseKey ? baseKey + '.' : '') + key;
    };
    JsonDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-json-dialog',
                    template: "<h1 mat-dialog-title>{{ title }}</h1>\r\n\r\n<div mat-dialog-content>\r\n  <ng-container *ngTemplateOutlet=\"loopObject;context:{ obj: data }\"></ng-container>\r\n\r\n  <ng-template #loopObject let-obj='obj' let-baseKey='baseKey'>\r\n    <ng-container *ngFor=\"let property of obj | keyvalue\">\r\n      <ng-container *ngIf=\"ignoreKeys.indexOf(getKey(baseKey, property.key)) === -1\">\r\n\r\n        <ng-container *ngIf=\"isObject(property.value); else notObject\">\r\n          <ng-container *ngTemplateOutlet=\"loopObject;context:{ obj: property.value, baseKey: getKey(baseKey, property.key) }\"></ng-container>\r\n        </ng-container>\r\n\r\n        <ng-template #notObject>\r\n          <p><span><b>{{getKey(baseKey, property.key)}}</b> : </span><span class=\"propertyValue\" [innerHtml]=\"property.value\"></span></p>\r\n        </ng-template>\r\n\r\n      </ng-container>\r\n    </ng-container>\r\n  </ng-template>\r\n</div>\r\n\r\n<div mat-dialog-actions>\r\n  <button mat-button color=\"primary\"\r\n          (click)=\"dialogRef.close(false)\">\r\n    OK\r\n  </button>\r\n</div>\r\n"
                }] }
    ];
    /** @nocollapse */
    JsonDialogComponent.ctorParameters = function () { return [
        { type: MatDialogRef }
    ]; };
    return JsonDialogComponent;
}());
export { JsonDialogComponent };
if (false) {
    /** @type {?} */
    JsonDialogComponent.prototype.title;
    /** @type {?} */
    JsonDialogComponent.prototype.data;
    /** @type {?} */
    JsonDialogComponent.prototype.ignoreKeys;
    /** @type {?} */
    JsonDialogComponent.prototype.dialogRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2pzb24tZGlhbG9nL2pzb24tZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFakQ7SUFTRSw2QkFBbUIsU0FBNEM7UUFBNUMsY0FBUyxHQUFULFNBQVMsQ0FBbUM7SUFBRyxDQUFDOzs7OztJQUVuRSxzQ0FBUTs7OztJQUFSLFVBQVMsR0FBRztRQUNWLE9BQU8sT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4RCxDQUFDOzs7Ozs7SUFFRCxvQ0FBTTs7Ozs7SUFBTixVQUFPLE9BQU8sRUFBRSxHQUFHO1FBQ2pCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUM5QyxDQUFDOztnQkFqQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLG9sQ0FBMkM7aUJBQzVDOzs7O2dCQUxRLFlBQVk7O0lBb0JyQiwwQkFBQztDQUFBLEFBbEJELElBa0JDO1NBZFksbUJBQW1COzs7SUFDOUIsb0NBQXFCOztJQUNyQixtQ0FBaUI7O0lBQ2pCLHlDQUE0Qjs7SUFFaEIsd0NBQW1EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWpzb24tZGlhbG9nJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vanNvbi1kaWFsb2cuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBKc29uRGlhbG9nQ29tcG9uZW50IHtcclxuICBwdWJsaWMgdGl0bGU6IHN0cmluZztcclxuICBwdWJsaWMgZGF0YTogYW55O1xyXG4gIHB1YmxpYyBpZ25vcmVLZXlzOiBzdHJpbmdbXTtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPEpzb25EaWFsb2dDb21wb25lbnQ+KSB7fVxyXG5cclxuICBpc09iamVjdCh2YWwpIHtcclxuICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheSh2YWwpO1xyXG4gIH1cclxuXHJcbiAgZ2V0S2V5KGJhc2VLZXksIGtleSkge1xyXG4gICAgcmV0dXJuIChiYXNlS2V5ID8gYmFzZUtleSArICcuJyA6ICcnKSArIGtleTtcclxuICB9XHJcbn1cclxuIl19