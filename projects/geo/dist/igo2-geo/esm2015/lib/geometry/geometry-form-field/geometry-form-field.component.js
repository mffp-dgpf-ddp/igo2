/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import OlGeometryType from 'ol/geom/GeometryType';
import { Style as OlStyle } from 'ol/style';
import { FormFieldComponent } from '@igo2/common';
import { IgoMap } from '../../map';
/**
 * This input allows a user to draw a new geometry or to edit
 * an existing one on a map.
 */
let GeometryFormFieldComponent = /**
 * This input allows a user to draw a new geometry or to edit
 * an existing one on a map.
 */
class GeometryFormFieldComponent {
    /**
     * @param {?} cdRef
     */
    constructor(cdRef) {
        this.cdRef = cdRef;
        this.value$ = new BehaviorSubject(undefined);
        this.drawControlIsActive = true;
        this.freehandDrawIsActive = false;
        this.geometryType$ = new BehaviorSubject(undefined);
        /**
         * Whether a geometry type toggle should be displayed
         */
        this.geometryTypeField = false;
        /**
         * Available geometry types
         */
        this.geometryTypes = ['Point', 'LineString', 'Polygon'];
        /**
         * Whether a draw guide field should be displayed
         */
        this.drawGuideField = false;
        this.drawGuide$ = new BehaviorSubject(0);
        /**
         * Draw guide placeholder
         */
        this.drawGuidePlaceholder = '';
        /**
         * Whether a measure tooltip should be displayed
         */
        this.measure = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set geometryType(value) { this.geometryType$.next(value); }
    /**
     * @return {?}
     */
    get geometryType() { return this.geometryType$.value; }
    /**
     * The drawGuide around the mouse pointer to help drawing
     * @param {?} value
     * @return {?}
     */
    set drawGuide(value) { this.drawGuide$.next(value); }
    /**
     * @return {?}
     */
    get drawGuide() { return this.drawGuide$.value; }
    /**
     * Set up a value stream
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        this.value$.next(this.formControl.value ? this.formControl.value : undefined);
        this.value$$ = this.formControl.valueChanges.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            this.value$.next(value ? value : undefined);
        }));
    }
    /**
     * Unsubscribe to the value stream
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        this.value$$.unsubscribe();
    }
};
GeometryFormFieldComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-geometry-form-field',
                template: "<igo-geometry-form-field-input\r\n  [formControl]=\"formControl\"\r\n  [map]=\"map\"\r\n  [geometryType]=\"geometryType$ | async\"\r\n  [drawGuide]=\"drawGuide$ | async\"\r\n  [measure]=\"measure\"\r\n  [drawControlIsActive]=\"drawControlIsActive\"\r\n  [freehandDrawIsActive]=\"freehandDrawIsActive\"\r\n  [drawStyle]=\"drawStyle\"\r\n  [overlayStyle]=\"overlayStyle\">\r\n</igo-geometry-form-field-input>\r\n\r\n<div *ngIf=\"geometryTypeField\" class=\"geometry-type-toggle\">\r\n  <mat-button-toggle-group\r\n    [disabled]=\"(value$ | async) !== undefined\"\r\n    [(ngModel)]=\"geometryType\">\r\n    <mat-button-toggle\r\n      value=\"Point\"\r\n      [disabled]=\"geometryTypes.indexOf('Point') < 0\">\r\n      {{'igo.geo.geometry.point' | translate}}\r\n    </mat-button-toggle>\r\n    <mat-button-toggle\r\n      value=\"LineString\"\r\n      [disabled]=\"geometryTypes.indexOf('LineString') < 0\">\r\n      {{'igo.geo.geometry.line' | translate}}\r\n    </mat-button-toggle>\r\n    <mat-button-toggle\r\n      value=\"Polygon\"\r\n      [disabled]=\"geometryTypes.indexOf('Polygon') < 0\">\r\n      {{'igo.geo.geometry.polygon' | translate}}\r\n    </mat-button-toggle>\r\n  </mat-button-toggle-group>\r\n</div>\r\n\r\n<mat-form-field *ngIf=\"drawGuideField\" class=\"draw-guide-field\">\r\n  <input\r\n    matInput\r\n    type=\"number\"\r\n    [placeholder]=\"drawGuidePlaceholder\"\r\n    [(ngModel)]=\"drawGuide\">\r\n  <mat-icon\r\n    matPrefix\r\n    [color]=\"'primary'\"\r\n    svgIcon=\"adjust\">    \r\n  </mat-icon>\r\n  <span matSuffix class=\"draw-guide-units\">{{'igo.geo.measure.meters' | translate}}</span>\r\n</mat-form-field>",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block;width:100%}.draw-guide-field,.geometry-type-toggle{width:100%}.geometry-type-toggle{padding:10px;text-align:center}.draw-guide-field mat-icon{margin:0 10px}.draw-guide-units{padding:10px}"]
            }] }
];
/** @nocollapse */
GeometryFormFieldComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
GeometryFormFieldComponent.propDecorators = {
    formControl: [{ type: Input }],
    map: [{ type: Input }],
    geometryType: [{ type: Input }],
    geometryTypeField: [{ type: Input }],
    geometryTypes: [{ type: Input }],
    drawGuideField: [{ type: Input }],
    drawGuide: [{ type: Input }],
    drawGuidePlaceholder: [{ type: Input }],
    measure: [{ type: Input }],
    drawStyle: [{ type: Input }],
    overlayStyle: [{ type: Input }]
};
/**
 * This input allows a user to draw a new geometry or to edit
 * an existing one on a map.
 */
GeometryFormFieldComponent = tslib_1.__decorate([
    FormFieldComponent('geometry'),
    tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef])
], GeometryFormFieldComponent);
export { GeometryFormFieldComponent };
if (false) {
    /** @type {?} */
    GeometryFormFieldComponent.prototype.value$;
    /**
     * @type {?}
     * @private
     */
    GeometryFormFieldComponent.prototype.value$$;
    /** @type {?} */
    GeometryFormFieldComponent.prototype.drawControlIsActive;
    /** @type {?} */
    GeometryFormFieldComponent.prototype.freehandDrawIsActive;
    /**
     * The field's form control
     * @type {?}
     */
    GeometryFormFieldComponent.prototype.formControl;
    /**
     * The map to draw the geometry on
     * @type {?}
     */
    GeometryFormFieldComponent.prototype.map;
    /** @type {?} */
    GeometryFormFieldComponent.prototype.geometryType$;
    /**
     * Whether a geometry type toggle should be displayed
     * @type {?}
     */
    GeometryFormFieldComponent.prototype.geometryTypeField;
    /**
     * Available geometry types
     * @type {?}
     */
    GeometryFormFieldComponent.prototype.geometryTypes;
    /**
     * Whether a draw guide field should be displayed
     * @type {?}
     */
    GeometryFormFieldComponent.prototype.drawGuideField;
    /** @type {?} */
    GeometryFormFieldComponent.prototype.drawGuide$;
    /**
     * Draw guide placeholder
     * @type {?}
     */
    GeometryFormFieldComponent.prototype.drawGuidePlaceholder;
    /**
     * Whether a measure tooltip should be displayed
     * @type {?}
     */
    GeometryFormFieldComponent.prototype.measure;
    /**
     * Style for the draw control (applies while the geometry is being drawn)
     * @type {?}
     */
    GeometryFormFieldComponent.prototype.drawStyle;
    /**
     * Style for the overlay layer (applies once the geometry is added to the map)
     * If not specified, drawStyle applies
     * @type {?}
     */
    GeometryFormFieldComponent.prototype.overlayStyle;
    /**
     * @type {?}
     * @private
     */
    GeometryFormFieldComponent.prototype.cdRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbWV0cnktZm9ybS1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZ2VvbWV0cnkvZ2VvbWV0cnktZm9ybS1maWVsZC9nZW9tZXRyeS1mb3JtLWZpZWxkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUdMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxlQUFlLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBRXJELE9BQU8sY0FBYyxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxLQUFLLElBQUksT0FBTyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRTVDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUVsRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDOzs7OztJQWN0QiwwQkFBMEI7Ozs7TUFBMUIsMEJBQTBCOzs7O0lBb0VyQyxZQUFvQixLQUF3QjtRQUF4QixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQWxFbkMsV0FBTSxHQUFxQyxJQUFJLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUk1RSx3QkFBbUIsR0FBRyxJQUFJLENBQUM7UUFDM0IseUJBQW9CLEdBQUcsS0FBSyxDQUFDO1FBZTNCLGtCQUFhLEdBQW9DLElBQUksZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7O1FBS2hGLHNCQUFpQixHQUFZLEtBQUssQ0FBQzs7OztRQUtuQyxrQkFBYSxHQUFhLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQzs7OztRQUs3RCxtQkFBYyxHQUFZLEtBQUssQ0FBQztRQVFoQyxlQUFVLEdBQTRCLElBQUksZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7O1FBSzdELHlCQUFvQixHQUFXLEVBQUUsQ0FBQzs7OztRQUtsQyxZQUFPLEdBQVksS0FBSyxDQUFDO0lBYWEsQ0FBQzs7Ozs7SUFqRGhELElBQ0ksWUFBWSxDQUFDLEtBQXFCLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7O0lBQzNFLElBQUksWUFBWSxLQUFxQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7Ozs7O0lBcUJ2RSxJQUNJLFNBQVMsQ0FBQyxLQUFhLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7O0lBQzdELElBQUksU0FBUyxLQUFhLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7Ozs7SUE4QnpELFFBQVE7UUFDTixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsU0FBUzs7OztRQUFDLENBQUMsS0FBc0IsRUFBRSxFQUFFO1lBQ2hGLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QyxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7OztJQU1ELFdBQVc7UUFDVCxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzdCLENBQUM7Q0FDRixDQUFBOztZQTlGQSxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsbW9EQUFtRDtnQkFFbkQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBeEJDLGlCQUFpQjs7OzBCQXFDaEIsS0FBSztrQkFLTCxLQUFLOzJCQUVMLEtBQUs7Z0NBUUwsS0FBSzs0QkFLTCxLQUFLOzZCQUtMLEtBQUs7d0JBS0wsS0FBSzttQ0FRTCxLQUFLO3NCQUtMLEtBQUs7d0JBS0wsS0FBSzsyQkFNTCxLQUFLOzs7Ozs7QUFsRUssMEJBQTBCO0lBUHRDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQzs2Q0EyRUYsaUJBQWlCO0dBcEVqQywwQkFBMEIsQ0F3RnRDO1NBeEZZLDBCQUEwQjs7O0lBRXJDLDRDQUFtRjs7Ozs7SUFFbkYsNkNBQThCOztJQUU5Qix5REFBa0M7O0lBQ2xDLDBEQUFvQzs7Ozs7SUFLcEMsaURBQWtDOzs7OztJQUtsQyx5Q0FBcUI7O0lBS3JCLG1EQUF5Rjs7Ozs7SUFLekYsdURBQTRDOzs7OztJQUs1QyxtREFBc0U7Ozs7O0lBS3RFLG9EQUF5Qzs7SUFRekMsZ0RBQXNFOzs7OztJQUt0RSwwREFBMkM7Ozs7O0lBSzNDLDZDQUFrQzs7Ozs7SUFLbEMsK0NBQTRCOzs7Ozs7SUFNNUIsa0RBQStCOzs7OztJQUVuQiwyQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCBPbEdlb21ldHJ5VHlwZSBmcm9tICdvbC9nZW9tL0dlb21ldHJ5VHlwZSc7XHJcbmltcG9ydCB7IFN0eWxlIGFzIE9sU3R5bGUgfSBmcm9tICdvbC9zdHlsZSc7XHJcblxyXG5pbXBvcnQgeyBGb3JtRmllbGRDb21wb25lbnQgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuaW1wb3J0IHsgR2VvSlNPTkdlb21ldHJ5IH0gZnJvbSAnLi4vc2hhcmVkL2dlb21ldHJ5LmludGVyZmFjZXMnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaW5wdXQgYWxsb3dzIGEgdXNlciB0byBkcmF3IGEgbmV3IGdlb21ldHJ5IG9yIHRvIGVkaXRcclxuICogYW4gZXhpc3Rpbmcgb25lIG9uIGEgbWFwLlxyXG4gKi9cclxuQEZvcm1GaWVsZENvbXBvbmVudCgnZ2VvbWV0cnknKVxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1nZW9tZXRyeS1mb3JtLWZpZWxkJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZ2VvbWV0cnktZm9ybS1maWVsZC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZ2VvbWV0cnktZm9ybS1maWVsZC5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHZW9tZXRyeUZvcm1GaWVsZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgcmVhZG9ubHkgdmFsdWUkOiBCZWhhdmlvclN1YmplY3Q8R2VvSlNPTkdlb21ldHJ5PiA9IG5ldyBCZWhhdmlvclN1YmplY3QodW5kZWZpbmVkKTtcclxuXHJcbiAgcHJpdmF0ZSB2YWx1ZSQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIHB1YmxpYyBkcmF3Q29udHJvbElzQWN0aXZlID0gdHJ1ZTtcclxuICBwdWJsaWMgZnJlZWhhbmREcmF3SXNBY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGZpZWxkJ3MgZm9ybSBjb250cm9sXHJcbiAgICovXHJcbiAgQElucHV0KCkgZm9ybUNvbnRyb2w6IEZvcm1Db250cm9sO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbWFwIHRvIGRyYXcgdGhlIGdlb21ldHJ5IG9uXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWFwOiBJZ29NYXA7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGdlb21ldHJ5VHlwZSh2YWx1ZTogT2xHZW9tZXRyeVR5cGUpIHsgdGhpcy5nZW9tZXRyeVR5cGUkLm5leHQodmFsdWUpOyB9XHJcbiAgZ2V0IGdlb21ldHJ5VHlwZSgpOiBPbEdlb21ldHJ5VHlwZSB7IHJldHVybiB0aGlzLmdlb21ldHJ5VHlwZSQudmFsdWU7IH1cclxuICByZWFkb25seSBnZW9tZXRyeVR5cGUkOiBCZWhhdmlvclN1YmplY3Q8T2xHZW9tZXRyeVR5cGU+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh1bmRlZmluZWQpO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGEgZ2VvbWV0cnkgdHlwZSB0b2dnbGUgc2hvdWxkIGJlIGRpc3BsYXllZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGdlb21ldHJ5VHlwZUZpZWxkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEF2YWlsYWJsZSBnZW9tZXRyeSB0eXBlc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGdlb21ldHJ5VHlwZXM6IHN0cmluZ1tdID0gWydQb2ludCcsICdMaW5lU3RyaW5nJywgJ1BvbHlnb24nXTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBhIGRyYXcgZ3VpZGUgZmllbGQgc2hvdWxkIGJlIGRpc3BsYXllZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRyYXdHdWlkZUZpZWxkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkcmF3R3VpZGUgYXJvdW5kIHRoZSBtb3VzZSBwb2ludGVyIHRvIGhlbHAgZHJhd2luZ1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGRyYXdHdWlkZSh2YWx1ZTogbnVtYmVyKSB7IHRoaXMuZHJhd0d1aWRlJC5uZXh0KHZhbHVlKTsgfVxyXG4gIGdldCBkcmF3R3VpZGUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuZHJhd0d1aWRlJC52YWx1ZTsgfVxyXG4gIHJlYWRvbmx5IGRyYXdHdWlkZSQ6IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCgwKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRHJhdyBndWlkZSBwbGFjZWhvbGRlclxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRyYXdHdWlkZVBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnJztcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBhIG1lYXN1cmUgdG9vbHRpcCBzaG91bGQgYmUgZGlzcGxheWVkXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWVhc3VyZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBTdHlsZSBmb3IgdGhlIGRyYXcgY29udHJvbCAoYXBwbGllcyB3aGlsZSB0aGUgZ2VvbWV0cnkgaXMgYmVpbmcgZHJhd24pXHJcbiAgICovXHJcbiAgQElucHV0KCkgZHJhd1N0eWxlOiBPbFN0eWxlO1xyXG5cclxuICAvKipcclxuICAgKiBTdHlsZSBmb3IgdGhlIG92ZXJsYXkgbGF5ZXIgKGFwcGxpZXMgb25jZSB0aGUgZ2VvbWV0cnkgaXMgYWRkZWQgdG8gdGhlIG1hcClcclxuICAgKiBJZiBub3Qgc3BlY2lmaWVkLCBkcmF3U3R5bGUgYXBwbGllc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG92ZXJsYXlTdHlsZTogT2xTdHlsZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB1cCBhIHZhbHVlIHN0cmVhbVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy52YWx1ZSQubmV4dCh0aGlzLmZvcm1Db250cm9sLnZhbHVlID8gdGhpcy5mb3JtQ29udHJvbC52YWx1ZSA6IHVuZGVmaW5lZCk7XHJcbiAgICB0aGlzLnZhbHVlJCQgPSB0aGlzLmZvcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbHVlOiBHZW9KU09OR2VvbWV0cnkpID0+IHtcclxuICAgICAgdGhpcy52YWx1ZSQubmV4dCh2YWx1ZSA/IHZhbHVlIDogdW5kZWZpbmVkKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5zdWJzY3JpYmUgdG8gdGhlIHZhbHVlIHN0cmVhbVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy52YWx1ZSQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==