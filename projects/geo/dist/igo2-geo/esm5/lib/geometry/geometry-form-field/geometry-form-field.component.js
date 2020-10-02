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
        /**
         * Control options
         */
        this.controlOptions = {};
    }
    Object.defineProperty(GeometryFormFieldComponent.prototype, "geometryType", {
        get: /**
         * @return {?}
         */
        function () { return this.geometryType$.value; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this.geometryType$.next(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GeometryFormFieldComponent.prototype, "drawGuide", {
        get: /**
         * @return {?}
         */
        function () { return this.drawGuide$.value; },
        /**
         * The drawGuide around the mouse pointer to help drawing
         */
        set: /**
         * The drawGuide around the mouse pointer to help drawing
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
    GeometryFormFieldComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-geometry-form-field',
                    template: "<igo-geometry-form-field-input\r\n  [formControl]=\"formControl\"\r\n  [map]=\"map\"\r\n  [geometryType]=\"geometryType$ | async\"\r\n  [drawGuide]=\"drawGuide$ | async\"\r\n  [measure]=\"measure\"\r\n  [drawControlIsActive]=\"drawControlIsActive\"\r\n  [freehandDrawIsActive]=\"freehandDrawIsActive\"\r\n  [controlOptions]=\"controlOptions\"\r\n  [drawStyle]=\"drawStyle\"\r\n  [overlayStyle]=\"overlayStyle\">\r\n</igo-geometry-form-field-input>\r\n\r\n<div *ngIf=\"geometryTypeField\" class=\"geometry-type-toggle\">\r\n  <mat-button-toggle-group\r\n    [disabled]=\"(value$ | async) !== undefined\"\r\n    [(ngModel)]=\"geometryType\">\r\n    <mat-button-toggle\r\n      value=\"Point\"\r\n      [disabled]=\"geometryTypes.indexOf('Point') < 0\">\r\n      {{'igo.geo.geometry.point' | translate}}\r\n    </mat-button-toggle>\r\n    <mat-button-toggle\r\n      value=\"LineString\"\r\n      [disabled]=\"geometryTypes.indexOf('LineString') < 0\">\r\n      {{'igo.geo.geometry.line' | translate}}\r\n    </mat-button-toggle>\r\n    <mat-button-toggle\r\n      value=\"Polygon\"\r\n      [disabled]=\"geometryTypes.indexOf('Polygon') < 0\">\r\n      {{'igo.geo.geometry.polygon' | translate}}\r\n    </mat-button-toggle>\r\n  </mat-button-toggle-group>\r\n</div>\r\n\r\n<mat-form-field *ngIf=\"drawGuideField\" class=\"draw-guide-field\">\r\n  <input\r\n    matInput\r\n    type=\"number\"\r\n    [placeholder]=\"drawGuidePlaceholder\"\r\n    [(ngModel)]=\"drawGuide\">\r\n  <mat-icon\r\n    matPrefix\r\n    [color]=\"'primary'\"\r\n    svgIcon=\"adjust\">    \r\n  </mat-icon>\r\n  <span matSuffix class=\"draw-guide-units\">{{'igo.geo.measure.meters' | translate}}</span>\r\n</mat-form-field>",
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
        controlOptions: [{ type: Input }],
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
     * Control options
     * @type {?}
     */
    GeometryFormFieldComponent.prototype.controlOptions;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbWV0cnktZm9ybS1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZ2VvbWV0cnkvZ2VvbWV0cnktZm9ybS1maWVsZC9nZW9tZXRyeS1mb3JtLWZpZWxkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUdMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxlQUFlLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBRXJELE9BQU8sY0FBYyxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxLQUFLLElBQUksT0FBTyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRTVDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUVsRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDOzs7Ozs7SUF1RmpDLG9DQUFvQixLQUF3QjtRQUF4QixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQXZFbkMsV0FBTSxHQUFxQyxJQUFJLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUk1RSx3QkFBbUIsR0FBRyxJQUFJLENBQUM7UUFDM0IseUJBQW9CLEdBQUcsS0FBSyxDQUFDO1FBZTNCLGtCQUFhLEdBQW9DLElBQUksZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7O1FBS2hGLHNCQUFpQixHQUFZLEtBQUssQ0FBQzs7OztRQUtuQyxrQkFBYSxHQUFhLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQzs7OztRQUs3RCxtQkFBYyxHQUFZLEtBQUssQ0FBQztRQVFoQyxlQUFVLEdBQTRCLElBQUksZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7O1FBSzdELHlCQUFvQixHQUFXLEVBQUUsQ0FBQzs7OztRQUtsQyxZQUFPLEdBQVksS0FBSyxDQUFDOzs7O1FBS3pCLG1CQUFjLEdBQXlCLEVBQUUsQ0FBQztJQWFKLENBQUM7SUF0RGhELHNCQUNJLG9EQUFZOzs7O1FBQ2hCLGNBQXFDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7OztRQUZ2RSxVQUNpQixLQUFxQixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFzQjNFLHNCQUNJLGlEQUFTOzs7O1FBQ2IsY0FBMEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFMekQ7O1dBRUc7Ozs7OztRQUNILFVBQ2MsS0FBYSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFnQzdEOzs7T0FHRzs7Ozs7O0lBQ0gsNkNBQVE7Ozs7O0lBQVI7UUFBQSxpQkFLQztRQUpDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQyxLQUFzQjtZQUM1RSxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUMsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCxnREFBVzs7Ozs7SUFBWDtRQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDN0IsQ0FBQzs7Z0JBbEdGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUseUJBQXlCO29CQUNuQyw0cURBQW1EO29CQUVuRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQXhCQyxpQkFBaUI7Ozs4QkFxQ2hCLEtBQUs7c0JBS0wsS0FBSzsrQkFFTCxLQUFLO29DQVFMLEtBQUs7Z0NBS0wsS0FBSztpQ0FLTCxLQUFLOzRCQUtMLEtBQUs7dUNBUUwsS0FBSzswQkFLTCxLQUFLO2lDQUtMLEtBQUs7NEJBS0wsS0FBSzsrQkFNTCxLQUFLOzs7Ozs7SUF2RUssMEJBQTBCO1FBUHRDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQztpREFnRkYsaUJBQWlCO09BekVqQywwQkFBMEIsQ0E2RnRDO0lBQUQsaUNBQUM7Q0FBQSxJQUFBO1NBN0ZZLDBCQUEwQjs7O0lBRXJDLDRDQUFtRjs7Ozs7SUFFbkYsNkNBQThCOztJQUU5Qix5REFBa0M7O0lBQ2xDLDBEQUFvQzs7Ozs7SUFLcEMsaURBQWtDOzs7OztJQUtsQyx5Q0FBcUI7O0lBS3JCLG1EQUF5Rjs7Ozs7SUFLekYsdURBQTRDOzs7OztJQUs1QyxtREFBc0U7Ozs7O0lBS3RFLG9EQUF5Qzs7SUFRekMsZ0RBQXNFOzs7OztJQUt0RSwwREFBMkM7Ozs7O0lBSzNDLDZDQUFrQzs7Ozs7SUFLbEMsb0RBQW1EOzs7OztJQUtuRCwrQ0FBNEI7Ozs7OztJQU01QixrREFBK0I7Ozs7O0lBRW5CLDJDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IE9sR2VvbWV0cnlUeXBlIGZyb20gJ29sL2dlb20vR2VvbWV0cnlUeXBlJztcclxuaW1wb3J0IHsgU3R5bGUgYXMgT2xTdHlsZSB9IGZyb20gJ29sL3N0eWxlJztcclxuXHJcbmltcG9ydCB7IEZvcm1GaWVsZENvbXBvbmVudCB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5pbXBvcnQgeyBHZW9KU09OR2VvbWV0cnkgfSBmcm9tICcuLi9zaGFyZWQvZ2VvbWV0cnkuaW50ZXJmYWNlcyc7XHJcblxyXG4vKipcclxuICogVGhpcyBpbnB1dCBhbGxvd3MgYSB1c2VyIHRvIGRyYXcgYSBuZXcgZ2VvbWV0cnkgb3IgdG8gZWRpdFxyXG4gKiBhbiBleGlzdGluZyBvbmUgb24gYSBtYXAuXHJcbiAqL1xyXG5ARm9ybUZpZWxkQ29tcG9uZW50KCdnZW9tZXRyeScpXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWdlb21ldHJ5LWZvcm0tZmllbGQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9nZW9tZXRyeS1mb3JtLWZpZWxkLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9nZW9tZXRyeS1mb3JtLWZpZWxkLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEdlb21ldHJ5Rm9ybUZpZWxkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICByZWFkb25seSB2YWx1ZSQ6IEJlaGF2aW9yU3ViamVjdDxHZW9KU09OR2VvbWV0cnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh1bmRlZmluZWQpO1xyXG5cclxuICBwcml2YXRlIHZhbHVlJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgcHVibGljIGRyYXdDb250cm9sSXNBY3RpdmUgPSB0cnVlO1xyXG4gIHB1YmxpYyBmcmVlaGFuZERyYXdJc0FjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZmllbGQncyBmb3JtIGNvbnRyb2xcclxuICAgKi9cclxuICBASW5wdXQoKSBmb3JtQ29udHJvbDogRm9ybUNvbnRyb2w7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBtYXAgdG8gZHJhdyB0aGUgZ2VvbWV0cnkgb25cclxuICAgKi9cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgZ2VvbWV0cnlUeXBlKHZhbHVlOiBPbEdlb21ldHJ5VHlwZSkgeyB0aGlzLmdlb21ldHJ5VHlwZSQubmV4dCh2YWx1ZSk7IH1cclxuICBnZXQgZ2VvbWV0cnlUeXBlKCk6IE9sR2VvbWV0cnlUeXBlIHsgcmV0dXJuIHRoaXMuZ2VvbWV0cnlUeXBlJC52YWx1ZTsgfVxyXG4gIHJlYWRvbmx5IGdlb21ldHJ5VHlwZSQ6IEJlaGF2aW9yU3ViamVjdDxPbEdlb21ldHJ5VHlwZT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHVuZGVmaW5lZCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgYSBnZW9tZXRyeSB0eXBlIHRvZ2dsZSBzaG91bGQgYmUgZGlzcGxheWVkXHJcbiAgICovXHJcbiAgQElucHV0KCkgZ2VvbWV0cnlUeXBlRmllbGQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQXZhaWxhYmxlIGdlb21ldHJ5IHR5cGVzXHJcbiAgICovXHJcbiAgQElucHV0KCkgZ2VvbWV0cnlUeXBlczogc3RyaW5nW10gPSBbJ1BvaW50JywgJ0xpbmVTdHJpbmcnLCAnUG9seWdvbiddO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGEgZHJhdyBndWlkZSBmaWVsZCBzaG91bGQgYmUgZGlzcGxheWVkXHJcbiAgICovXHJcbiAgQElucHV0KCkgZHJhd0d1aWRlRmllbGQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGRyYXdHdWlkZSBhcm91bmQgdGhlIG1vdXNlIHBvaW50ZXIgdG8gaGVscCBkcmF3aW5nXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBzZXQgZHJhd0d1aWRlKHZhbHVlOiBudW1iZXIpIHsgdGhpcy5kcmF3R3VpZGUkLm5leHQodmFsdWUpOyB9XHJcbiAgZ2V0IGRyYXdHdWlkZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5kcmF3R3VpZGUkLnZhbHVlOyB9XHJcbiAgcmVhZG9ubHkgZHJhd0d1aWRlJDogQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KDApO1xyXG5cclxuICAvKipcclxuICAgKiBEcmF3IGd1aWRlIHBsYWNlaG9sZGVyXHJcbiAgICovXHJcbiAgQElucHV0KCkgZHJhd0d1aWRlUGxhY2Vob2xkZXI6IHN0cmluZyA9ICcnO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGEgbWVhc3VyZSB0b29sdGlwIHNob3VsZCBiZSBkaXNwbGF5ZWRcclxuICAgKi9cclxuICBASW5wdXQoKSBtZWFzdXJlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnRyb2wgb3B0aW9uc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNvbnRyb2xPcHRpb25zOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9O1xyXG5cclxuICAvKipcclxuICAgKiBTdHlsZSBmb3IgdGhlIGRyYXcgY29udHJvbCAoYXBwbGllcyB3aGlsZSB0aGUgZ2VvbWV0cnkgaXMgYmVpbmcgZHJhd24pXHJcbiAgICovXHJcbiAgQElucHV0KCkgZHJhd1N0eWxlOiBPbFN0eWxlO1xyXG5cclxuICAvKipcclxuICAgKiBTdHlsZSBmb3IgdGhlIG92ZXJsYXkgbGF5ZXIgKGFwcGxpZXMgb25jZSB0aGUgZ2VvbWV0cnkgaXMgYWRkZWQgdG8gdGhlIG1hcClcclxuICAgKiBJZiBub3Qgc3BlY2lmaWVkLCBkcmF3U3R5bGUgYXBwbGllc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG92ZXJsYXlTdHlsZTogT2xTdHlsZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB1cCBhIHZhbHVlIHN0cmVhbVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy52YWx1ZSQubmV4dCh0aGlzLmZvcm1Db250cm9sLnZhbHVlID8gdGhpcy5mb3JtQ29udHJvbC52YWx1ZSA6IHVuZGVmaW5lZCk7XHJcbiAgICB0aGlzLnZhbHVlJCQgPSB0aGlzLmZvcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbHVlOiBHZW9KU09OR2VvbWV0cnkpID0+IHtcclxuICAgICAgdGhpcy52YWx1ZSQubmV4dCh2YWx1ZSA/IHZhbHVlIDogdW5kZWZpbmVkKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5zdWJzY3JpYmUgdG8gdGhlIHZhbHVlIHN0cmVhbVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy52YWx1ZSQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==