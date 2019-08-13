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
var GeometryFormFieldComponent = /** @class */ (function () {
    function GeometryFormFieldComponent(cdRef) {
        this.cdRef = cdRef;
        this.geometryType$ = new BehaviorSubject(undefined);
        this.drawGuide$ = new BehaviorSubject(0);
        this.value$ = new BehaviorSubject(undefined);
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
        /**
         * The drawGuide around the mouse pointer to help drawing
         */
        this.drawGuide = null;
        /**
         * Draw guide placeholder
         */
        this.drawGuidePlaceholder = '';
        /**
         * Whether a measure tooltip should be displayed
         */
        this.measure = false;
    }
    Object.defineProperty(GeometryFormFieldComponent.prototype, "geometryTypeModel", {
        get: /**
         * @return {?}
         */
        function () { return this.geometryType$.value; },
        /**
         * The geometry type model
         */
        set: /**
         * The geometry type model
         * @param {?} value
         * @return {?}
         */
        function (value) { this.geometryType$.next(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GeometryFormFieldComponent.prototype, "drawGuideModel", {
        get: /**
         * @return {?}
         */
        function () { return this.drawGuide$.value; },
        /**
         * The draw guide model
         */
        set: /**
         * The draw guide model
         * @param {?} value
         * @return {?}
         */
        function (value) { this.drawGuide$.next(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * Set up a value stream
     * @internal
     */
    /**
     * Set up a value stream
     * \@internal
     * @return {?}
     */
    GeometryFormFieldComponent.prototype.ngOnInit = /**
     * Set up a value stream
     * \@internal
     * @return {?}
     */
    function () {
        var _this = this;
        this.geometryType$.next(this.geometryType);
        this.drawGuide$.next(this.drawGuide);
        this.value$.next(this.formControl.value ? this.formControl.value : undefined);
        this.value$$ = this.formControl.valueChanges.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            _this.value$.next(value ? value : undefined);
        }));
    };
    /**
     * Unsubscribe to the value stream
     * @internal
     */
    /**
     * Unsubscribe to the value stream
     * \@internal
     * @return {?}
     */
    GeometryFormFieldComponent.prototype.ngOnDestroy = /**
     * Unsubscribe to the value stream
     * \@internal
     * @return {?}
     */
    function () {
        this.value$$.unsubscribe();
    };
    /**
     * @param {?} geometryType
     * @return {?}
     */
    GeometryFormFieldComponent.prototype.onGeometryTypeChange = /**
     * @param {?} geometryType
     * @return {?}
     */
    function (geometryType) {
        if (this.value$.value !== undefined) {
            return;
        }
        this.geometryType$.next(geometryType);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    GeometryFormFieldComponent.prototype.onDrawGuideChange = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.drawGuide$.next(value);
    };
    GeometryFormFieldComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-geometry-form-field',
                    template: "<igo-geometry-form-field-input\r\n  [formControl]=\"formControl\"\r\n  [map]=\"map\"\r\n  [geometryType]=\"geometryType$ | async\"\r\n  [drawGuide]=\"drawGuide$ | async\"\r\n  [measure]=\"measure\"\r\n  [drawStyle]=\"drawStyle\"\r\n  [overlayStyle]=\"overlayStyle\">\r\n</igo-geometry-form-field-input>\r\n\r\n<div *ngIf=\"geometryTypeField\" class=\"geometry-type-toggle\">\r\n  <mat-button-toggle-group\r\n    [disabled]=\"(value$ | async) !== undefined\"\r\n    [ngModel]=\"geometryTypeModel\"\r\n    (ngModelChange)=\"onGeometryTypeChange($event)\">\r\n    <mat-button-toggle\r\n      value=\"Point\"\r\n      [disabled]=\"geometryTypes.indexOf('Point') < 0\">\r\n      {{'igo.geo.geometry.point' | translate}}\r\n    </mat-button-toggle>\r\n    <mat-button-toggle\r\n      value=\"LineString\"\r\n      [disabled]=\"geometryTypes.indexOf('LineString') < 0\">\r\n      {{'igo.geo.geometry.line' | translate}}\r\n    </mat-button-toggle>\r\n    <mat-button-toggle\r\n      value=\"Polygon\"\r\n      [disabled]=\"geometryTypes.indexOf('Polygon') < 0\">\r\n      {{'igo.geo.geometry.polygon' | translate}}\r\n    </mat-button-toggle>\r\n  </mat-button-toggle-group>\r\n</div>\r\n\r\n<mat-form-field *ngIf=\"drawGuideField\" class=\"draw-guide-field\">\r\n  <input\r\n    matInput\r\n    type=\"number\"\r\n    [placeholder]=\"drawGuidePlaceholder\"\r\n    [ngModel]=\"drawGuideModel\"\r\n    (ngModelChange)=\"onDrawGuideChange($event)\">\r\n  <mat-icon\r\n    matPrefix\r\n    [color]=\"'primary'\"\r\n    svgIcon=\"adjust\">    \r\n  </mat-icon>\r\n  <span matSuffix class=\"draw-guide-units\">{{'igo.geo.measure.meters' | translate}}</span>\r\n</mat-form-field>",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:block;width:100%}.draw-guide-field,.geometry-type-toggle{width:100%}.geometry-type-toggle{padding:10px;text-align:center}.draw-guide-field mat-icon{margin:0 10px}.draw-guide-units{padding:10px}"]
                }] }
    ];
    /** @nocollapse */
    GeometryFormFieldComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
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
    return GeometryFormFieldComponent;
}());
export { GeometryFormFieldComponent };
if (false) {
    /** @type {?} */
    GeometryFormFieldComponent.prototype.geometryType$;
    /** @type {?} */
    GeometryFormFieldComponent.prototype.drawGuide$;
    /** @type {?} */
    GeometryFormFieldComponent.prototype.value$;
    /**
     * @type {?}
     * @private
     */
    GeometryFormFieldComponent.prototype.value$$;
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
    /**
     * The geometry type
     * @type {?}
     */
    GeometryFormFieldComponent.prototype.geometryType;
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
    /**
     * The drawGuide around the mouse pointer to help drawing
     * @type {?}
     */
    GeometryFormFieldComponent.prototype.drawGuide;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbWV0cnktZm9ybS1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZ2VvbWV0cnkvZ2VvbWV0cnktZm9ybS1maWVsZC9nZW9tZXRyeS1mb3JtLWZpZWxkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUdMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxlQUFlLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBRXJELE9BQU8sY0FBYyxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxLQUFLLElBQUksT0FBTyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRTVDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUVsRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDOzs7Ozs7SUEwRmpDLG9DQUFvQixLQUF3QjtRQUF4QixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQTFFNUMsa0JBQWEsR0FBb0MsSUFBSSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEYsZUFBVSxHQUE0QixJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3RCxXQUFNLEdBQXFDLElBQUksZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7O1FBc0JqRSxzQkFBaUIsR0FBWSxLQUFLLENBQUM7Ozs7UUFLbkMsa0JBQWEsR0FBYSxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7Ozs7UUFLN0QsbUJBQWMsR0FBWSxLQUFLLENBQUM7Ozs7UUFLaEMsY0FBUyxHQUFXLElBQUksQ0FBQzs7OztRQUt6Qix5QkFBb0IsR0FBVyxFQUFFLENBQUM7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MkM7Ozs7O0lBSzNDLDZDQUFrQzs7Ozs7SUFLbEMsK0NBQTRCOzs7Ozs7SUFNNUIsa0RBQStCOzs7OztJQWNuQiwyQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCBPbEdlb21ldHJ5VHlwZSBmcm9tICdvbC9nZW9tL0dlb21ldHJ5VHlwZSc7XHJcbmltcG9ydCB7IFN0eWxlIGFzIE9sU3R5bGUgfSBmcm9tICdvbC9zdHlsZSc7XHJcblxyXG5pbXBvcnQgeyBGb3JtRmllbGRDb21wb25lbnQgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuaW1wb3J0IHsgR2VvSlNPTkdlb21ldHJ5IH0gZnJvbSAnLi4vc2hhcmVkL2dlb21ldHJ5LmludGVyZmFjZXMnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaW5wdXQgYWxsb3dzIGEgdXNlciB0byBkcmF3IGEgbmV3IGdlb21ldHJ5IG9yIHRvIGVkaXRcclxuICogYW4gZXhpc3Rpbmcgb25lIG9uIGEgbWFwLlxyXG4gKi9cclxuQEZvcm1GaWVsZENvbXBvbmVudCgnZ2VvbWV0cnknKVxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1nZW9tZXRyeS1mb3JtLWZpZWxkJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZ2VvbWV0cnktZm9ybS1maWVsZC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZ2VvbWV0cnktZm9ybS1maWVsZC5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHZW9tZXRyeUZvcm1GaWVsZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgZ2VvbWV0cnlUeXBlJDogQmVoYXZpb3JTdWJqZWN0PE9sR2VvbWV0cnlUeXBlPiA9IG5ldyBCZWhhdmlvclN1YmplY3QodW5kZWZpbmVkKTtcclxuICBkcmF3R3VpZGUkOiBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoMCk7XHJcbiAgdmFsdWUkOiBCZWhhdmlvclN1YmplY3Q8R2VvSlNPTkdlb21ldHJ5PiA9IG5ldyBCZWhhdmlvclN1YmplY3QodW5kZWZpbmVkKTtcclxuXHJcbiAgcHJpdmF0ZSB2YWx1ZSQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBmaWVsZCdzIGZvcm0gY29udHJvbFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGZvcm1Db250cm9sOiBGb3JtQ29udHJvbDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG1hcCB0byBkcmF3IHRoZSBnZW9tZXRyeSBvblxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1hcDogSWdvTWFwO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZ2VvbWV0cnkgdHlwZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGdlb21ldHJ5VHlwZTogT2xHZW9tZXRyeVR5cGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgYSBnZW9tZXRyeSB0eXBlIHRvZ2dsZSBzaG91bGQgYmUgZGlzcGxheWVkXHJcbiAgICovXHJcbiAgQElucHV0KCkgZ2VvbWV0cnlUeXBlRmllbGQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQXZhaWxhYmxlIGdlb21ldHJ5IHR5cGVzXHJcbiAgICovXHJcbiAgQElucHV0KCkgZ2VvbWV0cnlUeXBlczogc3RyaW5nW10gPSBbJ1BvaW50JywgJ0xpbmVTdHJpbmcnLCAnUG9seWdvbiddO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGEgZHJhdyBndWlkZSBmaWVsZCBzaG91bGQgYmUgZGlzcGxheWVkXHJcbiAgICovXHJcbiAgQElucHV0KCkgZHJhd0d1aWRlRmllbGQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGRyYXdHdWlkZSBhcm91bmQgdGhlIG1vdXNlIHBvaW50ZXIgdG8gaGVscCBkcmF3aW5nXHJcbiAgICovXHJcbiAgQElucHV0KCkgZHJhd0d1aWRlOiBudW1iZXIgPSBudWxsO1xyXG5cclxuICAvKipcclxuICAgKiBEcmF3IGd1aWRlIHBsYWNlaG9sZGVyXHJcbiAgICovXHJcbiAgQElucHV0KCkgZHJhd0d1aWRlUGxhY2Vob2xkZXI6IHN0cmluZyA9ICcnO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGEgbWVhc3VyZSB0b29sdGlwIHNob3VsZCBiZSBkaXNwbGF5ZWRcclxuICAgKi9cclxuICBASW5wdXQoKSBtZWFzdXJlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0eWxlIGZvciB0aGUgZHJhdyBjb250cm9sIChhcHBsaWVzIHdoaWxlIHRoZSBnZW9tZXRyeSBpcyBiZWluZyBkcmF3bilcclxuICAgKi9cclxuICBASW5wdXQoKSBkcmF3U3R5bGU6IE9sU3R5bGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0eWxlIGZvciB0aGUgb3ZlcmxheSBsYXllciAoYXBwbGllcyBvbmNlIHRoZSBnZW9tZXRyeSBpcyBhZGRlZCB0byB0aGUgbWFwKVxyXG4gICAqIElmIG5vdCBzcGVjaWZpZWQsIGRyYXdTdHlsZSBhcHBsaWVzXHJcbiAgICovXHJcbiAgQElucHV0KCkgb3ZlcmxheVN0eWxlOiBPbFN0eWxlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZ2VvbWV0cnkgdHlwZSBtb2RlbFxyXG4gICAqL1xyXG4gIHNldCBnZW9tZXRyeVR5cGVNb2RlbCh2YWx1ZTogT2xHZW9tZXRyeVR5cGUpIHt0aGlzLmdlb21ldHJ5VHlwZSQubmV4dCh2YWx1ZSk7IH1cclxuICBnZXQgZ2VvbWV0cnlUeXBlTW9kZWwoKTogT2xHZW9tZXRyeVR5cGUgeyByZXR1cm4gdGhpcy5nZW9tZXRyeVR5cGUkLnZhbHVlOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkcmF3IGd1aWRlIG1vZGVsXHJcbiAgICovXHJcbiAgc2V0IGRyYXdHdWlkZU1vZGVsKHZhbHVlOiBudW1iZXIpIHt0aGlzLmRyYXdHdWlkZSQubmV4dCh2YWx1ZSk7IH1cclxuICBnZXQgZHJhd0d1aWRlTW9kZWwoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuZHJhd0d1aWRlJC52YWx1ZTsgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHVwIGEgdmFsdWUgc3RyZWFtXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmdlb21ldHJ5VHlwZSQubmV4dCh0aGlzLmdlb21ldHJ5VHlwZSk7XHJcbiAgICB0aGlzLmRyYXdHdWlkZSQubmV4dCh0aGlzLmRyYXdHdWlkZSk7XHJcbiAgICB0aGlzLnZhbHVlJC5uZXh0KHRoaXMuZm9ybUNvbnRyb2wudmFsdWUgPyB0aGlzLmZvcm1Db250cm9sLnZhbHVlIDogdW5kZWZpbmVkKTtcclxuICAgIHRoaXMudmFsdWUkJCA9IHRoaXMuZm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodmFsdWU6IEdlb0pTT05HZW9tZXRyeSkgPT4ge1xyXG4gICAgICB0aGlzLnZhbHVlJC5uZXh0KHZhbHVlID8gdmFsdWUgOiB1bmRlZmluZWQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbnN1YnNjcmliZSB0byB0aGUgdmFsdWUgc3RyZWFtXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnZhbHVlJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIG9uR2VvbWV0cnlUeXBlQ2hhbmdlKGdlb21ldHJ5VHlwZTogT2xHZW9tZXRyeVR5cGUpIHtcclxuICAgIGlmICh0aGlzLnZhbHVlJC52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuZ2VvbWV0cnlUeXBlJC5uZXh0KGdlb21ldHJ5VHlwZSk7XHJcbiAgfVxyXG5cclxuICBvbkRyYXdHdWlkZUNoYW5nZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmRyYXdHdWlkZSQubmV4dCh2YWx1ZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==