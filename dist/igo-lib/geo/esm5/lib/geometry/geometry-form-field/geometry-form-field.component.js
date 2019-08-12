/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import OlGeometryType from 'ol/geom/GeometryType';
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
        this.drawGuide = 0;
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
                    template: "<igo-geometry-form-field-input\r\n  [formControl]=\"formControl\"\r\n  [map]=\"map\"\r\n  [geometryType]=\"geometryType$ | async\"\r\n  [drawGuide]=\"drawGuide$ | async\"\r\n  [measure]=\"measure\">\r\n</igo-geometry-form-field-input>\r\n\r\n<div *ngIf=\"geometryTypeField\" class=\"geometry-type-toggle\">\r\n  <mat-button-toggle-group\r\n    [disabled]=\"(value$ | async) !== undefined\"\r\n    [ngModel]=\"geometryTypeModel\"\r\n    (ngModelChange)=\"onGeometryTypeChange($event)\">\r\n    <mat-button-toggle\r\n      value=\"Point\"\r\n      [disabled]=\"geometryTypes.indexOf('Point') < 0\">\r\n      {{'igo.geo.geometry.point' | translate}}\r\n    </mat-button-toggle>\r\n    <mat-button-toggle\r\n      value=\"LineString\"\r\n      [disabled]=\"geometryTypes.indexOf('LineString') < 0\">\r\n      {{'igo.geo.geometry.line' | translate}}\r\n    </mat-button-toggle>\r\n    <mat-button-toggle\r\n      value=\"Polygon\"\r\n      [disabled]=\"geometryTypes.indexOf('Polygon') < 0\">\r\n      {{'igo.geo.geometry.polygon' | translate}}\r\n    </mat-button-toggle>\r\n  </mat-button-toggle-group>\r\n</div>\r\n\r\n<mat-form-field *ngIf=\"drawGuideField\" class=\"draw-guide-field\">\r\n  <input\r\n    matInput\r\n    type=\"number\"\r\n    [placeholder]=\"drawGuidePlaceholder\"\r\n    [ngModel]=\"drawGuideModel\"\r\n    (ngModelChange)=\"onDrawGuideChange($event)\">\r\n  <mat-icon\r\n    matPrefix\r\n    [color]=\"'primary'\"\r\n    svgIcon=\"adjust\">    \r\n  </mat-icon>\r\n  <span matSuffix class=\"draw-guide-units\">{{'igo.geo.measure.meters' | translate}}</span>\r\n</mat-form-field>",
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
        measure: [{ type: Input }]
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
     * @type {?}
     * @private
     */
    GeometryFormFieldComponent.prototype.cdRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbWV0cnktZm9ybS1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZ2VvbWV0cnkvZ2VvbWV0cnktZm9ybS1maWVsZC9nZW9tZXRyeS1mb3JtLWZpZWxkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUdMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxlQUFlLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBRXJELE9BQU8sY0FBYyxNQUFNLHNCQUFzQixDQUFDO0FBRWxELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUVsRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDOzs7Ozs7SUErRWpDLG9DQUFvQixLQUF3QjtRQUF4QixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQS9ENUMsa0JBQWEsR0FBb0MsSUFBSSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEYsZUFBVSxHQUE0QixJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3RCxXQUFNLEdBQXFDLElBQUksZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7O1FBc0JqRSxzQkFBaUIsR0FBWSxLQUFLLENBQUM7Ozs7UUFLbkMsa0JBQWEsR0FBYSxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7Ozs7UUFLN0QsbUJBQWMsR0FBWSxLQUFLLENBQUM7Ozs7UUFLaEMsY0FBUyxHQUFXLENBQUMsQ0FBQzs7OztRQUt0Qix5QkFBb0IsR0FBVyxFQUFFLENBQUM7Ozs7UUFLbEMsWUFBTyxHQUFZLEtBQUssQ0FBQztJQWNhLENBQUM7SUFUaEQsc0JBQUks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cG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IE9sR2VvbWV0cnlUeXBlIGZyb20gJ29sL2dlb20vR2VvbWV0cnlUeXBlJztcclxuXHJcbmltcG9ydCB7IEZvcm1GaWVsZENvbXBvbmVudCB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5pbXBvcnQgeyBHZW9KU09OR2VvbWV0cnkgfSBmcm9tICcuLi9zaGFyZWQvZ2VvbWV0cnkuaW50ZXJmYWNlcyc7XHJcblxyXG4vKipcclxuICogVGhpcyBpbnB1dCBhbGxvd3MgYSB1c2VyIHRvIGRyYXcgYSBuZXcgZ2VvbWV0cnkgb3IgdG8gZWRpdFxyXG4gKiBhbiBleGlzdGluZyBvbmUgb24gYSBtYXAuXHJcbiAqL1xyXG5ARm9ybUZpZWxkQ29tcG9uZW50KCdnZW9tZXRyeScpXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWdlb21ldHJ5LWZvcm0tZmllbGQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9nZW9tZXRyeS1mb3JtLWZpZWxkLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9nZW9tZXRyeS1mb3JtLWZpZWxkLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEdlb21ldHJ5Rm9ybUZpZWxkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICBnZW9tZXRyeVR5cGUkOiBCZWhhdmlvclN1YmplY3Q8T2xHZW9tZXRyeVR5cGU+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh1bmRlZmluZWQpO1xyXG4gIGRyYXdHdWlkZSQ6IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCgwKTtcclxuICB2YWx1ZSQ6IEJlaGF2aW9yU3ViamVjdDxHZW9KU09OR2VvbWV0cnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh1bmRlZmluZWQpO1xyXG5cclxuICBwcml2YXRlIHZhbHVlJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGZpZWxkJ3MgZm9ybSBjb250cm9sXHJcbiAgICovXHJcbiAgQElucHV0KCkgZm9ybUNvbnRyb2w6IEZvcm1Db250cm9sO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbWFwIHRvIGRyYXcgdGhlIGdlb21ldHJ5IG9uXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWFwOiBJZ29NYXA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBnZW9tZXRyeSB0eXBlXHJcbiAgICovXHJcbiAgQElucHV0KCkgZ2VvbWV0cnlUeXBlOiBPbEdlb21ldHJ5VHlwZTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBhIGdlb21ldHJ5IHR5cGUgdG9nZ2xlIHNob3VsZCBiZSBkaXNwbGF5ZWRcclxuICAgKi9cclxuICBASW5wdXQoKSBnZW9tZXRyeVR5cGVGaWVsZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBBdmFpbGFibGUgZ2VvbWV0cnkgdHlwZXNcclxuICAgKi9cclxuICBASW5wdXQoKSBnZW9tZXRyeVR5cGVzOiBzdHJpbmdbXSA9IFsnUG9pbnQnLCAnTGluZVN0cmluZycsICdQb2x5Z29uJ107XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgYSBkcmF3IGd1aWRlIGZpZWxkIHNob3VsZCBiZSBkaXNwbGF5ZWRcclxuICAgKi9cclxuICBASW5wdXQoKSBkcmF3R3VpZGVGaWVsZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZHJhd0d1aWRlIGFyb3VuZCB0aGUgbW91c2UgcG9pbnRlciB0byBoZWxwIGRyYXdpbmdcclxuICAgKi9cclxuICBASW5wdXQoKSBkcmF3R3VpZGU6IG51bWJlciA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIERyYXcgZ3VpZGUgcGxhY2Vob2xkZXJcclxuICAgKi9cclxuICBASW5wdXQoKSBkcmF3R3VpZGVQbGFjZWhvbGRlcjogc3RyaW5nID0gJyc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgYSBtZWFzdXJlIHRvb2x0aXAgc2hvdWxkIGJlIGRpc3BsYXllZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1lYXN1cmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGdlb21ldHJ5IHR5cGUgbW9kZWxcclxuICAgKi9cclxuICBzZXQgZ2VvbWV0cnlUeXBlTW9kZWwodmFsdWU6IE9sR2VvbWV0cnlUeXBlKSB7dGhpcy5nZW9tZXRyeVR5cGUkLm5leHQodmFsdWUpOyB9XHJcbiAgZ2V0IGdlb21ldHJ5VHlwZU1vZGVsKCk6IE9sR2VvbWV0cnlUeXBlIHsgcmV0dXJuIHRoaXMuZ2VvbWV0cnlUeXBlJC52YWx1ZTsgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgZHJhdyBndWlkZSBtb2RlbFxyXG4gICAqL1xyXG4gIHNldCBkcmF3R3VpZGVNb2RlbCh2YWx1ZTogbnVtYmVyKSB7dGhpcy5kcmF3R3VpZGUkLm5leHQodmFsdWUpOyB9XHJcbiAgZ2V0IGRyYXdHdWlkZU1vZGVsKCk6IG51bWJlciB7IHJldHVybiB0aGlzLmRyYXdHdWlkZSQudmFsdWU7IH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB1cCBhIHZhbHVlIHN0cmVhbVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5nZW9tZXRyeVR5cGUkLm5leHQodGhpcy5nZW9tZXRyeVR5cGUpO1xyXG4gICAgdGhpcy5kcmF3R3VpZGUkLm5leHQodGhpcy5kcmF3R3VpZGUpO1xyXG4gICAgdGhpcy52YWx1ZSQubmV4dCh0aGlzLmZvcm1Db250cm9sLnZhbHVlID8gdGhpcy5mb3JtQ29udHJvbC52YWx1ZSA6IHVuZGVmaW5lZCk7XHJcbiAgICB0aGlzLnZhbHVlJCQgPSB0aGlzLmZvcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbHVlOiBHZW9KU09OR2VvbWV0cnkpID0+IHtcclxuICAgICAgdGhpcy52YWx1ZSQubmV4dCh2YWx1ZSA/IHZhbHVlIDogdW5kZWZpbmVkKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5zdWJzY3JpYmUgdG8gdGhlIHZhbHVlIHN0cmVhbVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy52YWx1ZSQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBvbkdlb21ldHJ5VHlwZUNoYW5nZShnZW9tZXRyeVR5cGU6IE9sR2VvbWV0cnlUeXBlKSB7XHJcbiAgICBpZiAodGhpcy52YWx1ZSQudmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLmdlb21ldHJ5VHlwZSQubmV4dChnZW9tZXRyeVR5cGUpO1xyXG4gIH1cclxuXHJcbiAgb25EcmF3R3VpZGVDaGFuZ2UodmFsdWU6IG51bWJlcikge1xyXG4gICAgdGhpcy5kcmF3R3VpZGUkLm5leHQodmFsdWUpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19