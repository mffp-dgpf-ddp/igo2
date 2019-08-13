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
let FormFieldTextareaComponent = /**
 * This component renders a textarea field
 */
class FormFieldTextareaComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC10ZXh0YXJlYS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvZm9ybS9mb3JtLWZpZWxkL2Zvcm0tZmllbGQtdGV4dGFyZWEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLEtBQUssRUFDTCxTQUFTLEVBQ1QsdUJBQXVCLEVBRXhCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXZDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOzs7O0lBV3ZELDBCQUEwQjs7O01BQTFCLDBCQUEwQjtJQU52QztRQVFFLGNBQVMsR0FBNkIsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7UUFvQnhELGtCQUFhLEdBQVksS0FBSyxDQUFDO0lBa0MxQyxDQUFDOzs7OztJQTdCQyxJQUFJLFFBQVE7UUFDVixPQUFPLHFCQUFxQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakQsQ0FBQzs7Ozs7SUFLRCxlQUFlO1FBQ2IsT0FBTyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvRCxDQUFDOzs7O0lBRUQsb0JBQW9CO1FBQ2xCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7OztJQUVPLGNBQWM7O2NBQ2QsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLO1FBQ3RDLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzVCO2FBQU07WUFDTCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEMsQ0FBQztDQUVGLENBQUE7O1lBN0RBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxna0JBQW1EO2dCQUNuRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7OzBCQVFFLEtBQUs7MEJBS0wsS0FBSztxQkFLTCxLQUFLOzRCQUtMLEtBQUs7Ozs7O0FBdEJLLDBCQUEwQjtJQU50QyxrQkFBa0IsQ0FBQyxVQUFVLENBQUM7R0FNbEIsMEJBQTBCLENBd0R0QztTQXhEWSwwQkFBMEI7OztJQUVyQywrQ0FBaUU7Ozs7O0lBS2pFLGlEQUFrQzs7Ozs7SUFLbEMsaURBQTZCOzs7OztJQUs3Qiw0Q0FBeUM7Ozs7O0lBS3pDLG1EQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgSW5wdXQsXHJcbiAgQ29tcG9uZW50LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIE9uSW5pdFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgZm9ybUNvbnRyb2xJc1JlcXVpcmVkLCBnZXRDb250cm9sRXJyb3JNZXNzYWdlIH0gZnJvbSAnLi4vc2hhcmVkL2Zvcm0udXRpbHMnO1xyXG5pbXBvcnQgeyBGb3JtRmllbGRDb21wb25lbnQgfSBmcm9tICcuLi9zaGFyZWQvZm9ybS1maWVsZC1jb21wb25lbnQnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY29tcG9uZW50IHJlbmRlcnMgYSB0ZXh0YXJlYSBmaWVsZFxyXG4gKi9cclxuQEZvcm1GaWVsZENvbXBvbmVudCgndGV4dGFyZWEnKVxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1mb3JtLWZpZWxkLXRleHRhcmVhJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZm9ybS1maWVsZC10ZXh0YXJlYS5jb21wb25lbnQuaHRtbCcsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1GaWVsZFRleHRhcmVhQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgZGlzYWJsZWQkOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGZpZWxkJ3MgZm9ybSBjb250cm9sXHJcbiAgICovXHJcbiAgQElucHV0KCkgZm9ybUNvbnRyb2w6IEZvcm1Db250cm9sO1xyXG5cclxuICAvKipcclxuICAgKiBGaWVsZCBwbGFjZWhvbGRlclxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpZWxkIHBsYWNlaG9sZGVyXHJcbiAgICovXHJcbiAgQElucHV0KCkgZXJyb3JzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGVyIGEgZGlzYWJsZSBzd2l0Y2ggc2hvdWxkIGJlIGF2YWlsYWJsZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRpc2FibGVTd2l0Y2g6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgZmllbGQgaXMgcmVxdWlyZWRcclxuICAgKi9cclxuICBnZXQgcmVxdWlyZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gZm9ybUNvbnRyb2xJc1JlcXVpcmVkKHRoaXMuZm9ybUNvbnRyb2wpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmRpc2FibGVkJC5uZXh0KHRoaXMuZm9ybUNvbnRyb2wuZGlzYWJsZWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGVycm9yIG1lc3NhZ2VcclxuICAgKi9cclxuICBnZXRFcnJvck1lc3NhZ2UoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBnZXRDb250cm9sRXJyb3JNZXNzYWdlKHRoaXMuZm9ybUNvbnRyb2wsIHRoaXMuZXJyb3JzKTtcclxuICB9XHJcblxyXG4gIG9uRGlzYWJsZVN3aXRjaENsaWNrKCkge1xyXG4gICAgdGhpcy50b2dnbGVEaXNhYmxlZCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0b2dnbGVEaXNhYmxlZCgpIHtcclxuICAgIGNvbnN0IGRpc2FibGVkID0gIXRoaXMuZGlzYWJsZWQkLnZhbHVlO1xyXG4gICAgaWYgKGRpc2FibGVkID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wuZGlzYWJsZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5mb3JtQ29udHJvbC5lbmFibGUoKTtcclxuICAgIH1cclxuICAgIHRoaXMuZGlzYWJsZWQkLm5leHQoZGlzYWJsZWQpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19