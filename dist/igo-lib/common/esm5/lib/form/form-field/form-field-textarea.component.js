/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Input, Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { formControlIsRequired, getControlErrorMessage } from '../shared/form.utils';
import { FormFieldComponent } from '../shared/form-field-component';
/**
 * This component renders a textarea field
 */
var FormFieldTextareaComponent = /** @class */ (function () {
    function FormFieldTextareaComponent() {
        this.disabled$ = new BehaviorSubject(false);
        /**
         * Wheter a disable switch should be available
         */
        this.disableSwitch = false;
    }
    Object.defineProperty(FormFieldTextareaComponent.prototype, "required", {
        /**
         * Whether the field is required
         */
        get: /**
         * Whether the field is required
         * @return {?}
         */
        function () {
            return formControlIsRequired(this.formControl);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FormFieldTextareaComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.disabled$.next(this.formControl.disabled);
    };
    /**
     * Get error message
     */
    /**
     * Get error message
     * @return {?}
     */
    FormFieldTextareaComponent.prototype.getErrorMessage = /**
     * Get error message
     * @return {?}
     */
    function () {
        return getControlErrorMessage(this.formControl, this.errors);
    };
    /**
     * @return {?}
     */
    FormFieldTextareaComponent.prototype.onDisableSwitchClick = /**
     * @return {?}
     */
    function () {
        this.toggleDisabled();
    };
    /**
     * @private
     * @return {?}
     */
    FormFieldTextareaComponent.prototype.toggleDisabled = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var disabled = !this.disabled$.value;
        if (disabled === true) {
            this.formControl.disable();
        }
        else {
            this.formControl.enable();
        }
        this.disabled$.next(disabled);
    };
    FormFieldTextareaComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-form-field-textarea',
                    template: "<mat-form-field>\r\n  <textarea\r\n    matInput\r\n    [required]=\"required\"\r\n    [placeholder]=\"placeholder\"\r\n    [formControl]=\"formControl\">\r\n  </textarea>\r\n  <mat-icon\r\n    *ngIf=\"disableSwitch === true\"\r\n    class=\"igo-form-disable-switch\"\r\n    [svgIcon]=\"(disabled$ | async) === true ? 'checkbox-blank-outline' : 'checkbox-marked-outline'\"\r\n    (click)=\"onDisableSwitchClick()\"\r\n    matPrefix>\r\n  </mat-icon>\r\n  <mat-error *ngIf=\"formControl.errors\">{{getErrorMessage() | translate}}</mat-error>\r\n</mat-form-field>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    FormFieldTextareaComponent.propDecorators = {
        formControl: [{ type: Input }],
        placeholder: [{ type: Input }],
        errors: [{ type: Input }],
        disableSwitch: [{ type: Input }]
    };
    /**
     * This component renders a textarea field
     */
    FormFieldTextareaComponent = tslib_1.__decorate([
        FormFieldComponent('textarea')
    ], FormFieldTextareaComponent);
    return FormFieldTextareaComponent;
}());
export { FormFieldTextareaComponent };
if (false) {
    /** @type {?} */
    FormFieldTextareaComponent.prototype.disabled$;
    /**
     * The field's form control
     * @type {?}
     */
    FormFieldTextareaComponent.prototype.formControl;
    /**
     * Field placeholder
     * @type {?}
     */
    FormFieldTextareaComponent.prototype.placeholder;
    /**
     * Field placeholder
     * @type {?}
     */
    FormFieldTextareaComponent.prototype.errors;
    /**
     * Wheter a disable switch should be available
     * @type {?}
     */
    FormFieldTextareaComponent.prototype.disableSwitch;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC10ZXh0YXJlYS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvZm9ybS9mb3JtLWZpZWxkL2Zvcm0tZmllbGQtdGV4dGFyZWEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLEtBQUssRUFDTCxTQUFTLEVBQ1QsdUJBQXVCLEVBRXhCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXZDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOzs7OztJQUtwRTtRQVFFLGNBQVMsR0FBNkIsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7UUFvQnhELGtCQUFhLEdBQVksS0FBSyxDQUFDO0lBa0MxQyxDQUFDO0lBN0JDLHNCQUFJLGdEQUFRO1FBSFo7O1dBRUc7Ozs7O1FBQ0g7WUFDRSxPQUFPLHFCQUFxQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqRCxDQUFDOzs7T0FBQTs7OztJQUVELDZDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNILG9EQUFlOzs7O0lBQWY7UUFDRSxPQUFPLHNCQUFzQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9ELENBQUM7Ozs7SUFFRCx5REFBb0I7OztJQUFwQjtRQUNFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7OztJQUVPLG1EQUFjOzs7O0lBQXRCOztZQUNRLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSztRQUN0QyxJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUM1QjthQUFNO1lBQ0wsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUMzQjtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7O2dCQTNERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsZ2tCQUFtRDtvQkFDbkQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzs7OEJBUUUsS0FBSzs4QkFLTCxLQUFLO3lCQUtMLEtBQUs7Z0NBS0wsS0FBSzs7Ozs7SUF0QkssMEJBQTBCO1FBTnRDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQztPQU1sQiwwQkFBMEIsQ0F3RHRDO0lBQUQsaUNBQUM7Q0FBQSxJQUFBO1NBeERZLDBCQUEwQjs7O0lBRXJDLCtDQUFpRTs7Ozs7SUFLakUsaURBQWtDOzs7OztJQUtsQyxpREFBNkI7Ozs7O0lBSzdCLDRDQUF5Qzs7Ozs7SUFLekMsbURBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBJbnB1dCxcclxuICBDb21wb25lbnQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgT25Jbml0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBmb3JtQ29udHJvbElzUmVxdWlyZWQsIGdldENvbnRyb2xFcnJvck1lc3NhZ2UgfSBmcm9tICcuLi9zaGFyZWQvZm9ybS51dGlscyc7XHJcbmltcG9ydCB7IEZvcm1GaWVsZENvbXBvbmVudCB9IGZyb20gJy4uL3NoYXJlZC9mb3JtLWZpZWxkLWNvbXBvbmVudCc7XHJcblxyXG4vKipcclxuICogVGhpcyBjb21wb25lbnQgcmVuZGVycyBhIHRleHRhcmVhIGZpZWxkXHJcbiAqL1xyXG5ARm9ybUZpZWxkQ29tcG9uZW50KCd0ZXh0YXJlYScpXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWZvcm0tZmllbGQtdGV4dGFyZWEnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9mb3JtLWZpZWxkLXRleHRhcmVhLmNvbXBvbmVudC5odG1sJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybUZpZWxkVGV4dGFyZWFDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBkaXNhYmxlZCQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZmllbGQncyBmb3JtIGNvbnRyb2xcclxuICAgKi9cclxuICBASW5wdXQoKSBmb3JtQ29udHJvbDogRm9ybUNvbnRyb2w7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpZWxkIHBsYWNlaG9sZGVyXHJcbiAgICovXHJcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogRmllbGQgcGxhY2Vob2xkZXJcclxuICAgKi9cclxuICBASW5wdXQoKSBlcnJvcnM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0ZXIgYSBkaXNhYmxlIHN3aXRjaCBzaG91bGQgYmUgYXZhaWxhYmxlXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGlzYWJsZVN3aXRjaDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoZSBmaWVsZCBpcyByZXF1aXJlZFxyXG4gICAqL1xyXG4gIGdldCByZXF1aXJlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBmb3JtQ29udHJvbElzUmVxdWlyZWQodGhpcy5mb3JtQ29udHJvbCk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuZGlzYWJsZWQkLm5leHQodGhpcy5mb3JtQ29udHJvbC5kaXNhYmxlZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgZXJyb3IgbWVzc2FnZVxyXG4gICAqL1xyXG4gIGdldEVycm9yTWVzc2FnZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGdldENvbnRyb2xFcnJvck1lc3NhZ2UodGhpcy5mb3JtQ29udHJvbCwgdGhpcy5lcnJvcnMpO1xyXG4gIH1cclxuXHJcbiAgb25EaXNhYmxlU3dpdGNoQ2xpY2soKSB7XHJcbiAgICB0aGlzLnRvZ2dsZURpc2FibGVkKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRvZ2dsZURpc2FibGVkKCkge1xyXG4gICAgY29uc3QgZGlzYWJsZWQgPSAhdGhpcy5kaXNhYmxlZCQudmFsdWU7XHJcbiAgICBpZiAoZGlzYWJsZWQgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5mb3JtQ29udHJvbC5kaXNhYmxlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZvcm1Db250cm9sLmVuYWJsZSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5kaXNhYmxlZCQubmV4dChkaXNhYmxlZCk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=