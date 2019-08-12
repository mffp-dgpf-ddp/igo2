/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Input, Component, ChangeDetectionStrategy, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { formControlIsRequired, getControlErrorMessage } from '../shared/form.utils';
import { FormFieldComponent } from '../shared/form-field-component';
/**
 * This component renders a text field
 */
let FormFieldTextComponent = /**
 * This component renders a text field
 */
class FormFieldTextComponent {
    constructor() {
        this.disabled$ = new BehaviorSubject(false);
        /**
         * Wheter a disable switch should be available
         */
        this.disableSwitch = false;
    }
    /**
     * Whether the field is required
     * @return {?}
     */
    get required() {
        return formControlIsRequired(this.formControl);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.disabled$.next(this.formControl.disabled);
    }
    /**
     * Get error message
     * @return {?}
     */
    getErrorMessage() {
        return getControlErrorMessage(this.formControl, this.errors);
    }
    /**
     * @return {?}
     */
    onDisableSwitchClick() {
        this.toggleDisabled();
    }
    /**
     * @private
     * @return {?}
     */
    toggleDisabled() {
        /** @type {?} */
        const disabled = !this.disabled$.value;
        if (disabled === true) {
            this.formControl.disable();
        }
        else {
            this.formControl.enable();
        }
        this.disabled$.next(disabled);
    }
};
FormFieldTextComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-form-field-text',
                template: "<mat-form-field>\r\n  <input\r\n    matInput\r\n    [required]=\"required\"\r\n    [placeholder]=\"placeholder\"\r\n    [formControl]=\"formControl\">\r\n  <mat-icon\r\n    *ngIf=\"disableSwitch === true\"\r\n    class=\"igo-form-disable-switch\"\r\n    [svgIcon]=\"(disabled$ | async) === true ? 'checkbox-blank-outline' : 'checkbox-marked-outline'\"\r\n    (click)=\"onDisableSwitchClick()\"\r\n    matPrefix>\r\n  </mat-icon>\r\n  <mat-error *ngIf=\"formControl.errors\">{{getErrorMessage() | translate}}</mat-error>\r\n</mat-form-field>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
FormFieldTextComponent.propDecorators = {
    formControl: [{ type: Input }],
    placeholder: [{ type: Input }],
    errors: [{ type: Input }],
    disableSwitch: [{ type: Input }]
};
/**
 * This component renders a text field
 */
FormFieldTextComponent = tslib_1.__decorate([
    FormFieldComponent('text')
], FormFieldTextComponent);
export { FormFieldTextComponent };
if (false) {
    /** @type {?} */
    FormFieldTextComponent.prototype.disabled$;
    /**
     * The field's form control
     * @type {?}
     */
    FormFieldTextComponent.prototype.formControl;
    /**
     * Field placeholder
     * @type {?}
     */
    FormFieldTextComponent.prototype.placeholder;
    /**
     * Field placeholder
     * @type {?}
     */
    FormFieldTextComponent.prototype.errors;
    /**
     * Wheter a disable switch should be available
     * @type {?}
     */
    FormFieldTextComponent.prototype.disableSwitch;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC10ZXh0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9mb3JtL2Zvcm0tZmllbGQvZm9ybS1maWVsZC10ZXh0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxLQUFLLEVBQ0wsU0FBUyxFQUNULHVCQUF1QixHQUN4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV2QyxPQUFPLEVBQ0wscUJBQXFCLEVBQ3JCLHNCQUFzQixFQUN2QixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOzs7O0lBV3ZELHNCQUFzQjs7O01BQXRCLHNCQUFzQjtJQU5uQztRQVFFLGNBQVMsR0FBNkIsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7UUFvQnhELGtCQUFhLEdBQVksS0FBSyxDQUFDO0lBa0MxQyxDQUFDOzs7OztJQTdCQyxJQUFJLFFBQVE7UUFDVixPQUFPLHFCQUFxQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakQsQ0FBQzs7Ozs7SUFLRCxlQUFlO1FBQ2IsT0FBTyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvRCxDQUFDOzs7O0lBRUQsb0JBQW9CO1FBQ2xCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7OztJQUVPLGNBQWM7O2NBQ2QsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLO1FBQ3RDLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzVCO2FBQU07WUFDTCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEMsQ0FBQztDQUVGLENBQUE7O1lBN0RBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQiw0aUJBQStDO2dCQUMvQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7OzBCQVFFLEtBQUs7MEJBS0wsS0FBSztxQkFLTCxLQUFLOzRCQUtMLEtBQUs7Ozs7O0FBdEJLLHNCQUFzQjtJQU5sQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUM7R0FNZCxzQkFBc0IsQ0F3RGxDO1NBeERZLHNCQUFzQjs7O0lBRWpDLDJDQUFpRTs7Ozs7SUFLakUsNkNBQWtDOzs7OztJQUtsQyw2Q0FBNkI7Ozs7O0lBSzdCLHdDQUF5Qzs7Ozs7SUFLekMsK0NBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBJbnB1dCxcclxuICBDb21wb25lbnQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gIGZvcm1Db250cm9sSXNSZXF1aXJlZCxcclxuICBnZXRDb250cm9sRXJyb3JNZXNzYWdlXHJcbn0gZnJvbSAnLi4vc2hhcmVkL2Zvcm0udXRpbHMnO1xyXG5pbXBvcnQgeyBGb3JtRmllbGRDb21wb25lbnQgfSBmcm9tICcuLi9zaGFyZWQvZm9ybS1maWVsZC1jb21wb25lbnQnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY29tcG9uZW50IHJlbmRlcnMgYSB0ZXh0IGZpZWxkXHJcbiAqL1xyXG5ARm9ybUZpZWxkQ29tcG9uZW50KCd0ZXh0JylcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tZm9ybS1maWVsZC10ZXh0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZm9ybS1maWVsZC10ZXh0LmNvbXBvbmVudC5odG1sJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybUZpZWxkVGV4dENvbXBvbmVudCB7XHJcblxyXG4gIGRpc2FibGVkJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBmaWVsZCdzIGZvcm0gY29udHJvbFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGZvcm1Db250cm9sOiBGb3JtQ29udHJvbDtcclxuXHJcbiAgLyoqXHJcbiAgICogRmllbGQgcGxhY2Vob2xkZXJcclxuICAgKi9cclxuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBGaWVsZCBwbGFjZWhvbGRlclxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGVycm9yczoge1trZXk6IHN0cmluZ106IHN0cmluZ307XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRlciBhIGRpc2FibGUgc3dpdGNoIHNob3VsZCBiZSBhdmFpbGFibGVcclxuICAgKi9cclxuICBASW5wdXQoKSBkaXNhYmxlU3dpdGNoOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhlIGZpZWxkIGlzIHJlcXVpcmVkXHJcbiAgICovXHJcbiAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGZvcm1Db250cm9sSXNSZXF1aXJlZCh0aGlzLmZvcm1Db250cm9sKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5kaXNhYmxlZCQubmV4dCh0aGlzLmZvcm1Db250cm9sLmRpc2FibGVkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBlcnJvciBtZXNzYWdlXHJcbiAgICovXHJcbiAgZ2V0RXJyb3JNZXNzYWdlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZ2V0Q29udHJvbEVycm9yTWVzc2FnZSh0aGlzLmZvcm1Db250cm9sLCB0aGlzLmVycm9ycyk7XHJcbiAgfVxyXG5cclxuICBvbkRpc2FibGVTd2l0Y2hDbGljaygpIHtcclxuICAgIHRoaXMudG9nZ2xlRGlzYWJsZWQoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdG9nZ2xlRGlzYWJsZWQoKSB7XHJcbiAgICBjb25zdCBkaXNhYmxlZCA9ICF0aGlzLmRpc2FibGVkJC52YWx1ZTtcclxuICAgIGlmIChkaXNhYmxlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmZvcm1Db250cm9sLmRpc2FibGUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wuZW5hYmxlKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmRpc2FibGVkJC5uZXh0KGRpc2FibGVkKTsgIFxyXG4gIH1cclxuXHJcbn1cclxuIl19