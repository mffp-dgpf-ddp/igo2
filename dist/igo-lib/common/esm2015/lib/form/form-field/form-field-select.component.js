/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Input, Component, ChangeDetectionStrategy, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { formControlIsRequired, getControlErrorMessage } from '../shared/form.utils';
import { FormFieldComponent } from '../shared/form-field-component';
/**
 * This component renders a select field
 */
let FormFieldSelectComponent = /**
 * This component renders a select field
 */
class FormFieldSelectComponent {
    constructor() {
        this.disabled$ = new BehaviorSubject(false);
        /**
         * Wheter a disable switch should be available
         */
        this.disableSwitch = false;
    }
    /**
     * Select input choices
     * @param {?} value
     * @return {?}
     */
    set choices(value) {
        if (value instanceof Observable) {
            this.choices$ = value;
        }
        else {
            this.choices$ = of(value);
        }
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
FormFieldSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-form-field-select',
                template: "<mat-form-field>\r\n  <mat-select\r\n    [required]=\"required\"\r\n    [placeholder]=\"placeholder\"\r\n    [formControl]=\"formControl\">\r\n    <mat-option *ngFor=\"let choice of choices$ | async\" [value]=\"choice.value\">\r\n      {{choice.title}}\r\n    </mat-option>\r\n  </mat-select>\r\n  <mat-icon\r\n    *ngIf=\"disableSwitch === true\"\r\n    class=\"igo-form-disable-switch\"\r\n    [svgIcon]=\"(disabled$ | async) === true ? 'checkbox-blank-outline' : 'checkbox-marked-outline'\"\r\n    (click)=\"onDisableSwitchClick()\"\r\n    matPrefix>\r\n  </mat-icon>\r\n  <mat-error *ngIf=\"formControl.errors\">{{getErrorMessage() | translate}}</mat-error>\r\n</mat-form-field>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
FormFieldSelectComponent.propDecorators = {
    formControl: [{ type: Input }],
    placeholder: [{ type: Input }],
    choices: [{ type: Input }],
    errors: [{ type: Input }],
    disableSwitch: [{ type: Input }]
};
/**
 * This component renders a select field
 */
FormFieldSelectComponent = tslib_1.__decorate([
    FormFieldComponent('select')
], FormFieldSelectComponent);
export { FormFieldSelectComponent };
if (false) {
    /** @type {?} */
    FormFieldSelectComponent.prototype.choices$;
    /** @type {?} */
    FormFieldSelectComponent.prototype.disabled$;
    /**
     * The field's form control
     * @type {?}
     */
    FormFieldSelectComponent.prototype.formControl;
    /**
     * Field placeholder
     * @type {?}
     */
    FormFieldSelectComponent.prototype.placeholder;
    /**
     * Field placeholder
     * @type {?}
     */
    FormFieldSelectComponent.prototype.errors;
    /**
     * Wheter a disable switch should be available
     * @type {?}
     */
    FormFieldSelectComponent.prototype.disableSwitch;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC1zZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2Zvcm0vZm9ybS1maWVsZC9mb3JtLWZpZWxkLXNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsS0FBSyxFQUNMLFNBQVMsRUFDVCx1QkFBdUIsR0FDeEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV2RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVyRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7OztJQVd2RCx3QkFBd0I7OztNQUF4Qix3QkFBd0I7SUFOckM7UUFVRSxjQUFTLEdBQTZCLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7O1FBZ0N4RCxrQkFBYSxHQUFZLEtBQUssQ0FBQztJQWtDMUMsQ0FBQzs7Ozs7O0lBbkRDLElBQ0ksT0FBTyxDQUFDLEtBQW9FO1FBQzlFLElBQUksS0FBSyxZQUFZLFVBQVUsRUFBRTtZQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztTQUN2QjthQUFNO1lBQ0wsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0I7SUFDSCxDQUFDOzs7OztJQWVELElBQUksUUFBUTtRQUNWLE9BQU8scUJBQXFCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pELENBQUM7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7OztJQUtELGVBQWU7UUFDYixPQUFPLHNCQUFzQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9ELENBQUM7Ozs7SUFFRCxvQkFBb0I7UUFDbEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7Ozs7O0lBRU8sY0FBYzs7Y0FDZCxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUs7UUFDdEMsSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDNUI7YUFBTTtZQUNMLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDM0I7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoQyxDQUFDO0NBRUYsQ0FBQTs7WUEzRUEsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLDByQkFBaUQ7Z0JBQ2pELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7MEJBVUUsS0FBSzswQkFLTCxLQUFLO3NCQUtMLEtBQUs7cUJBWUwsS0FBSzs0QkFLTCxLQUFLOzs7OztBQXBDSyx3QkFBd0I7SUFOcEMsa0JBQWtCLENBQUMsUUFBUSxDQUFDO0dBTWhCLHdCQUF3QixDQXNFcEM7U0F0RVksd0JBQXdCOzs7SUFFbkMsNENBQThDOztJQUU5Qyw2Q0FBaUU7Ozs7O0lBS2pFLCtDQUFrQzs7Ozs7SUFLbEMsK0NBQTZCOzs7OztJQWlCN0IsMENBQXlDOzs7OztJQUt6QyxpREFBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIElucHV0LFxyXG4gIENvbXBvbmVudCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBmb3JtQ29udHJvbElzUmVxdWlyZWQsIGdldENvbnRyb2xFcnJvck1lc3NhZ2UgfSBmcm9tICcuLi9zaGFyZWQvZm9ybS51dGlscyc7XHJcbmltcG9ydCB7IEZvcm1GaWVsZFNlbGVjdENob2ljZSB9IGZyb20gJy4uL3NoYXJlZC9mb3JtLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBGb3JtRmllbGRDb21wb25lbnQgfSBmcm9tICcuLi9zaGFyZWQvZm9ybS1maWVsZC1jb21wb25lbnQnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY29tcG9uZW50IHJlbmRlcnMgYSBzZWxlY3QgZmllbGRcclxuICovXHJcbkBGb3JtRmllbGRDb21wb25lbnQoJ3NlbGVjdCcpXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWZvcm0tZmllbGQtc2VsZWN0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZm9ybS1maWVsZC1zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtRmllbGRTZWxlY3RDb21wb25lbnQge1xyXG5cclxuICBjaG9pY2VzJDogT2JzZXJ2YWJsZTxGb3JtRmllbGRTZWxlY3RDaG9pY2VbXT47XHJcblxyXG4gIGRpc2FibGVkJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBmaWVsZCdzIGZvcm0gY29udHJvbFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGZvcm1Db250cm9sOiBGb3JtQ29udHJvbDtcclxuXHJcbiAgLyoqXHJcbiAgICogRmllbGQgcGxhY2Vob2xkZXJcclxuICAgKi9cclxuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBTZWxlY3QgaW5wdXQgY2hvaWNlc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGNob2ljZXModmFsdWU6IE9ic2VydmFibGU8Rm9ybUZpZWxkU2VsZWN0Q2hvaWNlW10+IHwgRm9ybUZpZWxkU2VsZWN0Q2hvaWNlW10pIHtcclxuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcclxuICAgICAgdGhpcy5jaG9pY2VzJCA9IHZhbHVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jaG9pY2VzJCA9IG9mKHZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpZWxkIHBsYWNlaG9sZGVyXHJcbiAgICovXHJcbiAgQElucHV0KCkgZXJyb3JzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGVyIGEgZGlzYWJsZSBzd2l0Y2ggc2hvdWxkIGJlIGF2YWlsYWJsZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRpc2FibGVTd2l0Y2g6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgZmllbGQgaXMgcmVxdWlyZWRcclxuICAgKi9cclxuICBnZXQgcmVxdWlyZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gZm9ybUNvbnRyb2xJc1JlcXVpcmVkKHRoaXMuZm9ybUNvbnRyb2wpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmRpc2FibGVkJC5uZXh0KHRoaXMuZm9ybUNvbnRyb2wuZGlzYWJsZWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGVycm9yIG1lc3NhZ2VcclxuICAgKi9cclxuICBnZXRFcnJvck1lc3NhZ2UoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBnZXRDb250cm9sRXJyb3JNZXNzYWdlKHRoaXMuZm9ybUNvbnRyb2wsIHRoaXMuZXJyb3JzKTtcclxuICB9XHJcblxyXG4gIG9uRGlzYWJsZVN3aXRjaENsaWNrKCkge1xyXG4gICAgdGhpcy50b2dnbGVEaXNhYmxlZCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0b2dnbGVEaXNhYmxlZCgpIHtcclxuICAgIGNvbnN0IGRpc2FibGVkID0gIXRoaXMuZGlzYWJsZWQkLnZhbHVlO1xyXG4gICAgaWYgKGRpc2FibGVkID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wuZGlzYWJsZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5mb3JtQ29udHJvbC5lbmFibGUoKTtcclxuICAgIH1cclxuICAgIHRoaXMuZGlzYWJsZWQkLm5leHQoZGlzYWJsZWQpOyAgXHJcbiAgfVxyXG5cclxufVxyXG4iXX0=