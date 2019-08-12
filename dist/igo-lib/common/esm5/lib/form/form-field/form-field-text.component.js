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
var FormFieldTextComponent = /** @class */ (function () {
    function FormFieldTextComponent() {
        this.disabled$ = new BehaviorSubject(false);
        /**
         * Wheter a disable switch should be available
         */
        this.disableSwitch = false;
    }
    Object.defineProperty(FormFieldTextComponent.prototype, "required", {
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
    FormFieldTextComponent.prototype.ngOnInit = /**
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
    FormFieldTextComponent.prototype.getErrorMessage = /**
     * Get error message
     * @return {?}
     */
    function () {
        return getControlErrorMessage(this.formControl, this.errors);
    };
    /**
     * @return {?}
     */
    FormFieldTextComponent.prototype.onDisableSwitchClick = /**
     * @return {?}
     */
    function () {
        this.toggleDisabled();
    };
    /**
     * @private
     * @return {?}
     */
    FormFieldTextComponent.prototype.toggleDisabled = /**
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
    return FormFieldTextComponent;
}());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC10ZXh0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9mb3JtL2Zvcm0tZmllbGQvZm9ybS1maWVsZC10ZXh0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxLQUFLLEVBQ0wsU0FBUyxFQUNULHVCQUF1QixHQUN4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV2QyxPQUFPLEVBQ0wscUJBQXFCLEVBQ3JCLHNCQUFzQixFQUN2QixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOzs7OztJQUtwRTtRQVFFLGNBQVMsR0FBNkIsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7UUFvQnhELGtCQUFhLEdBQVksS0FBSyxDQUFDO0lBa0MxQyxDQUFDO0lBN0JDLHNCQUFJLDRDQUFRO1FBSFo7O1dBRUc7Ozs7O1FBQ0g7WUFDRSxPQUFPLHFCQUFxQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqRCxDQUFDOzs7T0FBQTs7OztJQUVELHlDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNILGdEQUFlOzs7O0lBQWY7UUFDRSxPQUFPLHNCQUFzQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9ELENBQUM7Ozs7SUFFRCxxREFBb0I7OztJQUFwQjtRQUNFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7OztJQUVPLCtDQUFjOzs7O0lBQXRCOztZQUNRLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSztRQUN0QyxJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUM1QjthQUFNO1lBQ0wsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUMzQjtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7O2dCQTNERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsNGlCQUErQztvQkFDL0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzs7OEJBUUUsS0FBSzs4QkFLTCxLQUFLO3lCQUtMLEtBQUs7Z0NBS0wsS0FBSzs7Ozs7SUF0Qkssc0JBQXNCO1FBTmxDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQztPQU1kLHNCQUFzQixDQXdEbEM7SUFBRCw2QkFBQztDQUFBLElBQUE7U0F4RFksc0JBQXNCOzs7SUFFakMsMkNBQWlFOzs7OztJQUtqRSw2Q0FBa0M7Ozs7O0lBS2xDLDZDQUE2Qjs7Ozs7SUFLN0Isd0NBQXlDOzs7OztJQUt6QywrQ0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIElucHV0LFxyXG4gIENvbXBvbmVudCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgZm9ybUNvbnRyb2xJc1JlcXVpcmVkLFxyXG4gIGdldENvbnRyb2xFcnJvck1lc3NhZ2VcclxufSBmcm9tICcuLi9zaGFyZWQvZm9ybS51dGlscyc7XHJcbmltcG9ydCB7IEZvcm1GaWVsZENvbXBvbmVudCB9IGZyb20gJy4uL3NoYXJlZC9mb3JtLWZpZWxkLWNvbXBvbmVudCc7XHJcblxyXG4vKipcclxuICogVGhpcyBjb21wb25lbnQgcmVuZGVycyBhIHRleHQgZmllbGRcclxuICovXHJcbkBGb3JtRmllbGRDb21wb25lbnQoJ3RleHQnKVxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1mb3JtLWZpZWxkLXRleHQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9mb3JtLWZpZWxkLXRleHQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtRmllbGRUZXh0Q29tcG9uZW50IHtcclxuXHJcbiAgZGlzYWJsZWQkOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGZpZWxkJ3MgZm9ybSBjb250cm9sXHJcbiAgICovXHJcbiAgQElucHV0KCkgZm9ybUNvbnRyb2w6IEZvcm1Db250cm9sO1xyXG5cclxuICAvKipcclxuICAgKiBGaWVsZCBwbGFjZWhvbGRlclxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpZWxkIHBsYWNlaG9sZGVyXHJcbiAgICovXHJcbiAgQElucHV0KCkgZXJyb3JzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGVyIGEgZGlzYWJsZSBzd2l0Y2ggc2hvdWxkIGJlIGF2YWlsYWJsZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRpc2FibGVTd2l0Y2g6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgZmllbGQgaXMgcmVxdWlyZWRcclxuICAgKi9cclxuICBnZXQgcmVxdWlyZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gZm9ybUNvbnRyb2xJc1JlcXVpcmVkKHRoaXMuZm9ybUNvbnRyb2wpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmRpc2FibGVkJC5uZXh0KHRoaXMuZm9ybUNvbnRyb2wuZGlzYWJsZWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGVycm9yIG1lc3NhZ2VcclxuICAgKi9cclxuICBnZXRFcnJvck1lc3NhZ2UoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBnZXRDb250cm9sRXJyb3JNZXNzYWdlKHRoaXMuZm9ybUNvbnRyb2wsIHRoaXMuZXJyb3JzKTtcclxuICB9XHJcblxyXG4gIG9uRGlzYWJsZVN3aXRjaENsaWNrKCkge1xyXG4gICAgdGhpcy50b2dnbGVEaXNhYmxlZCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0b2dnbGVEaXNhYmxlZCgpIHtcclxuICAgIGNvbnN0IGRpc2FibGVkID0gIXRoaXMuZGlzYWJsZWQkLnZhbHVlO1xyXG4gICAgaWYgKGRpc2FibGVkID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wuZGlzYWJsZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5mb3JtQ29udHJvbC5lbmFibGUoKTtcclxuICAgIH1cclxuICAgIHRoaXMuZGlzYWJsZWQkLm5leHQoZGlzYWJsZWQpOyAgXHJcbiAgfVxyXG5cclxufVxyXG4iXX0=