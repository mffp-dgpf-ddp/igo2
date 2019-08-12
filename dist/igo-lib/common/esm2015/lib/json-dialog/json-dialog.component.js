/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
export class JsonDialogComponent {
    /**
     * @param {?} dialogRef
     */
    constructor(dialogRef) {
        this.dialogRef = dialogRef;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    isObject(val) {
        return typeof val === 'object' && !Array.isArray(val);
    }
    /**
     * @param {?} baseKey
     * @param {?} key
     * @return {?}
     */
    getKey(baseKey, key) {
        return (baseKey ? baseKey + '.' : '') + key;
    }
}
JsonDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-json-dialog',
                template: "<h1 mat-dialog-title>{{ title }}</h1>\r\n\r\n<div mat-dialog-content>\r\n  <ng-container *ngTemplateOutlet=\"loopObject;context:{ obj: data }\"></ng-container>\r\n\r\n  <ng-template #loopObject let-obj='obj' let-baseKey='baseKey'>\r\n    <ng-container *ngFor=\"let property of obj | keyvalue\">\r\n      <ng-container *ngIf=\"ignoreKeys.indexOf(getKey(baseKey, property.key)) === -1\">\r\n\r\n        <ng-container *ngIf=\"isObject(property.value); else notObject\">\r\n          <ng-container *ngTemplateOutlet=\"loopObject;context:{ obj: property.value, baseKey: getKey(baseKey, property.key) }\"></ng-container>\r\n        </ng-container>\r\n\r\n        <ng-template #notObject>\r\n          <p><span><b>{{getKey(baseKey, property.key)}}</b> : </span><span class=\"propertyValue\" [innerHtml]=\"property.value\"></span></p>\r\n        </ng-template>\r\n\r\n      </ng-container>\r\n    </ng-container>\r\n  </ng-template>\r\n</div>\r\n\r\n<div mat-dialog-actions>\r\n  <button mat-button color=\"primary\"\r\n          (click)=\"dialogRef.close(false)\">\r\n    OK\r\n  </button>\r\n</div>\r\n"
            }] }
];
/** @nocollapse */
JsonDialogComponent.ctorParameters = () => [
    { type: MatDialogRef }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2pzb24tZGlhbG9nL2pzb24tZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFNakQsTUFBTSxPQUFPLG1CQUFtQjs7OztJQUs5QixZQUFtQixTQUE0QztRQUE1QyxjQUFTLEdBQVQsU0FBUyxDQUFtQztJQUFHLENBQUM7Ozs7O0lBRW5FLFFBQVEsQ0FBQyxHQUFHO1FBQ1YsT0FBTyxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hELENBQUM7Ozs7OztJQUVELE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRztRQUNqQixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDOUMsQ0FBQzs7O1lBakJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixvbENBQTJDO2FBQzVDOzs7O1lBTFEsWUFBWTs7OztJQU9uQixvQ0FBcUI7O0lBQ3JCLG1DQUFpQjs7SUFDakIseUNBQTRCOztJQUVoQix3Q0FBbUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tanNvbi1kaWFsb2cnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9qc29uLWRpYWxvZy5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEpzb25EaWFsb2dDb21wb25lbnQge1xyXG4gIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xyXG4gIHB1YmxpYyBkYXRhOiBhbnk7XHJcbiAgcHVibGljIGlnbm9yZUtleXM6IHN0cmluZ1tdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8SnNvbkRpYWxvZ0NvbXBvbmVudD4pIHt9XHJcblxyXG4gIGlzT2JqZWN0KHZhbCkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHZhbCk7XHJcbiAgfVxyXG5cclxuICBnZXRLZXkoYmFzZUtleSwga2V5KSB7XHJcbiAgICByZXR1cm4gKGJhc2VLZXkgPyBiYXNlS2V5ICsgJy4nIDogJycpICsga2V5O1xyXG4gIH1cclxufVxyXG4iXX0=