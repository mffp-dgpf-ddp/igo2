/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MeasureAreaUnit, MeasureLengthUnit } from '../shared/measure.enum';
export class MeasurerDialogComponent {
    /**
     * @param {?} dialogRef
     * @param {?} data
     */
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.measureAreaUnit = MeasureAreaUnit;
        this.measureLengthUnit = MeasureLengthUnit;
    }
    /**
     * @return {?}
     */
    onNoClick() {
        this.dialogRef.close();
    }
}
MeasurerDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-measurer-dialog',
                template: "<div mat-dialog-content>\r\n  <h3>{{'igo.geo.measure.dialog.title' | translate}}</h3>\r\n\r\n  <table>\r\n    <thead>\r\n      <tr>\r\n        <th colspan=\"2\">{{'igo.geo.measure.dialog.length.title' | translate}}</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr>\r\n        <td>{{'igo.geo.measure.dialog.lengthInMeters' | translate}}</td>\r\n        <td>{{data.length | measureFormat: measureLengthUnit.Meters}}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>{{'igo.geo.measure.dialog.lengthInKilometers' | translate}}</td>\r\n        <td>{{data.length | measureFormat: measureLengthUnit.Kilometers}}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>{{'igo.geo.measure.dialog.lengthInMiles' | translate}}</td>\r\n        <td>{{data.length | measureFormat: measureLengthUnit.Miles}}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>{{'igo.geo.measure.dialog.lengthInFeet' | translate}}</td>\r\n        <td>{{data.length | measureFormat: measureLengthUnit.Feet}}</td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n\r\n  <table>\r\n    <thead>\r\n      <tr>\r\n        <th colspan=\"2\">{{'igo.geo.measure.dialog.area.title' | translate}}</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr>\r\n        <td>{{'igo.geo.measure.dialog.areaInSquareMeters' | translate}}</td>\r\n        <td>{{data.area | measureFormat: measureAreaUnit.SquareMeters}}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>{{'igo.geo.measure.dialog.areaInSquareKilometers' | translate}}</td>\r\n        <td>{{data.area | measureFormat:measureAreaUnit.SquareKilometers}}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>{{'igo.geo.measure.dialog.areaInSquareMiles' | translate}}</td>\r\n        <td>{{data.area | measureFormat: measureAreaUnit.SquareMiles}}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>{{'igo.geo.measure.dialog.areaInAcres' | translate}}</td>\r\n        <td>{{data.area | measureFormat: measureAreaUnit.Acres}}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>{{'igo.geo.measure.dialog.areaInHectares' | translate}}</td>\r\n        <td>{{data.area | measureFormat: measureAreaUnit.Hectares}}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>{{'igo.geo.measure.dialog.perimeterInMeters' | translate}}</td>\r\n        <td>{{data.perimeter | measureFormat: measureLengthUnit.Meters}}</td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</div>\r\n",
                styles: ["h3{text-align:center;margin:0}table{width:100%;padding:10px}table tbody tr td:last-child{padding-left:10px}"]
            }] }
];
/** @nocollapse */
MeasurerDialogComponent.ctorParameters = () => [
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
];
if (false) {
    /** @type {?} */
    MeasurerDialogComponent.prototype.measureAreaUnit;
    /** @type {?} */
    MeasurerDialogComponent.prototype.measureLengthUnit;
    /** @type {?} */
    MeasurerDialogComponent.prototype.dialogRef;
    /** @type {?} */
    MeasurerDialogComponent.prototype.data;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVhc3VyZXItZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9tZWFzdXJlL21lYXN1cmVyL21lYXN1cmVyLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFJbEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBTzNFLE1BQU0sT0FBTyx1QkFBdUI7Ozs7O0lBTWxDLFlBQ1MsU0FBZ0QsRUFDdkIsSUFBd0I7UUFEakQsY0FBUyxHQUFULFNBQVMsQ0FBdUM7UUFDdkIsU0FBSSxHQUFKLElBQUksQ0FBb0I7UUFOMUQsb0JBQWUsR0FBRyxlQUFlLENBQUM7UUFFbEMsc0JBQWlCLEdBQUcsaUJBQWlCLENBQUM7SUFLbkMsQ0FBQzs7OztJQUVKLFNBQVM7UUFDUCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3pCLENBQUM7OztZQWxCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsNDBFQUE2Qzs7YUFFOUM7Ozs7WUFWUSxZQUFZOzRDQW1CaEIsTUFBTSxTQUFDLGVBQWU7Ozs7SUFOekIsa0RBQWtDOztJQUVsQyxvREFBc0M7O0lBR3BDLDRDQUF1RDs7SUFDdkQsdUNBQXdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWF0RGlhbG9nUmVmLCBNQVRfRElBTE9HX0RBVEEgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQgeyBNZWFzdXJlckRpYWxvZ0RhdGEgfSBmcm9tICcuLi9zaGFyZWQvbWVhc3VyZS5pbnRlcmZhY2VzJztcclxuXHJcbmltcG9ydCB7IE1lYXN1cmVBcmVhVW5pdCwgTWVhc3VyZUxlbmd0aFVuaXR9IGZyb20gJy4uL3NoYXJlZC9tZWFzdXJlLmVudW0nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tbWVhc3VyZXItZGlhbG9nJyxcclxuICB0ZW1wbGF0ZVVybDogJ21lYXN1cmVyLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbWVhc3VyZXItZGlhbG9nLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIE1lYXN1cmVyRGlhbG9nQ29tcG9uZW50IHtcclxuXHJcbiAgbWVhc3VyZUFyZWFVbml0ID0gTWVhc3VyZUFyZWFVbml0O1xyXG5cclxuICBtZWFzdXJlTGVuZ3RoVW5pdCA9IE1lYXN1cmVMZW5ndGhVbml0O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxNZWFzdXJlckRpYWxvZ0NvbXBvbmVudD4sXHJcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IE1lYXN1cmVyRGlhbG9nRGF0YVxyXG4gICkge31cclxuXHJcbiAgb25Ob0NsaWNrKCk6IHZvaWQge1xyXG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==