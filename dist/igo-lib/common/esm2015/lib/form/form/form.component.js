/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import t from 'typy';
import { getAllFormFields } from '../shared/form.utils';
/**
 * A configurable form
 */
export class FormComponent {
    constructor() {
        /**
         * Event emitted when the form is submitted
         */
        this.submitForm = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get hasButtons() {
        return this.buttons.nativeElement.children.length !== 0;
    }
    /**
     * Is the entity or the template change, recreate the form or repopulate it.
     * \@internal
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const formData = changes.formData;
        if (formData && formData.currentValue !== formData.previousValue) {
            if (formData.currentValue === undefined) {
                this.clear();
            }
            else {
                this.setData(formData.currentValue);
            }
        }
    }
    /**
     * Transform the form data to a feature and emit an event
     * \@internal
     * @return {?}
     */
    onSubmit() {
        this.submitForm.emit(this.getData());
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    setData(data) {
        this.form.fields.forEach((/**
         * @param {?} field
         * @return {?}
         */
        (field) => {
            field.control.setValue(t(data, field.name).safeObject);
        }));
        this.form.groups.forEach((/**
         * @param {?} group
         * @return {?}
         */
        (group) => {
            group.fields.forEach((/**
             * @param {?} field
             * @return {?}
             */
            (field) => {
                field.control.setValue(t(data, field.name).safeObject);
            }));
        }));
    }
    /**
     * @private
     * @return {?}
     */
    getData() {
        /** @type {?} */
        const data = {};
        getAllFormFields(this.form).forEach((/**
         * @param {?} field
         * @return {?}
         */
        (field) => {
            this.updateDataWithFormField(data, field);
        }));
        return data;
    }
    /**
     * @private
     * @param {?} data
     * @param {?} field
     * @return {?}
     */
    updateDataWithFormField(data, field) {
        /** @type {?} */
        const control = field.control;
        if (!control.disabled) {
            data[field.name] = control.value;
        }
    }
    /**
     * Clear form
     * @private
     * @return {?}
     */
    clear() {
        this.form.control.reset();
    }
}
FormComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-form',
                template: "\r\n<form\r\n  [formGroup]=\"form.control\"\r\n  (ngSubmit)=\"onSubmit()\">\r\n  <div class=\"igo-form-body\" [ngClass]=\"{'igo-form-body-with-buttons': hasButtons}\">\r\n    <div class=\"igo-form-content\">\r\n      <ng-content></ng-content>\r\n    </div>\r\n    <div #buttons class=\"igo-form-buttons\">\r\n      <ng-content select=\"[formButtons]\"></ng-content>\r\n    </div>\r\n  </div>\r\n</form>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block}form{width:100%;height:100%}.igo-form-body,.igo-form-content{height:100%}.igo-form-body-with-buttons .igo-form-content{height:calc(100% - 56px)}.igo-form-content{display:flex}"]
            }] }
];
/** @nocollapse */
FormComponent.ctorParameters = () => [];
FormComponent.propDecorators = {
    form: [{ type: Input }],
    formData: [{ type: Input }],
    submitForm: [{ type: Output }],
    buttons: [{ type: ViewChild, args: ['buttons',] }]
};
if (false) {
    /**
     * Form
     * @type {?}
     */
    FormComponent.prototype.form;
    /**
     * Input data
     * @type {?}
     */
    FormComponent.prototype.formData;
    /**
     * Event emitted when the form is submitted
     * @type {?}
     */
    FormComponent.prototype.submitForm;
    /** @type {?} */
    FormComponent.prototype.buttons;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvZm9ybS9mb3JtL2Zvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUdaLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNYLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sQ0FBQyxNQUFNLE1BQU0sQ0FBQztBQUdyQixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7OztBQVd4RCxNQUFNLE9BQU8sYUFBYTtJQXVCeEI7Ozs7UUFSVSxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQXdCLENBQUM7SUFRakQsQ0FBQzs7OztJQUpoQixJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO0lBQzFELENBQUM7Ozs7Ozs7SUFRRCxXQUFXLENBQUMsT0FBc0I7O2NBQzFCLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUTtRQUNqQyxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsWUFBWSxLQUFLLFFBQVEsQ0FBQyxhQUFhLEVBQUU7WUFDaEUsSUFBSSxRQUFRLENBQUMsWUFBWSxLQUFLLFNBQVMsRUFBRTtnQkFDdkMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2Q7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDckM7U0FDRjtJQUNILENBQUM7Ozs7OztJQU9ELFFBQVE7UUFDTixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7Ozs7SUFFTyxPQUFPLENBQUMsSUFBMEI7UUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTzs7OztRQUFDLENBQUMsS0FBZ0IsRUFBRSxFQUFFO1lBQzVDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pELENBQUMsRUFBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTzs7OztRQUFDLENBQUMsS0FBcUIsRUFBRSxFQUFFO1lBQ2pELEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTzs7OztZQUFDLENBQUMsS0FBZ0IsRUFBRSxFQUFFO2dCQUN4QyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN6RCxDQUFDLEVBQUMsQ0FBQztRQUNMLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFTyxPQUFPOztjQUNQLElBQUksR0FBRyxFQUFFO1FBQ2YsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU87Ozs7UUFBQyxDQUFDLEtBQWdCLEVBQUUsRUFBRTtZQUN2RCxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzVDLENBQUMsRUFBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7Ozs7O0lBRU8sdUJBQXVCLENBQUMsSUFBMkIsRUFBRSxLQUFnQjs7Y0FDckUsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPO1FBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztTQUNsQztJQUNILENBQUM7Ozs7OztJQUtPLEtBQUs7UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs7WUF2RkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxVQUFVO2dCQUNwQixrYUFBb0M7Z0JBRXBDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7Ozs7bUJBTUUsS0FBSzt1QkFLTCxLQUFLO3lCQUtMLE1BQU07c0JBRU4sU0FBUyxTQUFDLFNBQVM7Ozs7Ozs7SUFacEIsNkJBQW9COzs7OztJQUtwQixpQ0FBeUM7Ozs7O0lBS3pDLG1DQUFnRTs7SUFFaEUsZ0NBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPbkNoYW5nZXMsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBWaWV3Q2hpbGQsXHJcbiAgRWxlbWVudFJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHQgZnJvbSAndHlweSc7XHJcblxyXG5pbXBvcnQgeyBGb3JtLCBGb3JtRmllbGQsIEZvcm1GaWVsZEdyb3VwIH0gZnJvbSAnLi4vc2hhcmVkL2Zvcm0uaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IGdldEFsbEZvcm1GaWVsZHMgfSBmcm9tICcuLi9zaGFyZWQvZm9ybS51dGlscyc7XHJcblxyXG4vKipcclxuICogQSBjb25maWd1cmFibGUgZm9ybVxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tZm9ybScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2Zvcm0uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2Zvcm0uY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZvcm1cclxuICAgKi9cclxuICBASW5wdXQoKSBmb3JtOiBGb3JtO1xyXG5cclxuICAvKipcclxuICAgKiBJbnB1dCBkYXRhXHJcbiAgICovXHJcbiAgQElucHV0KCkgZm9ybURhdGE6IHsgW2tleTogc3RyaW5nXTogYW55fTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBmb3JtIGlzIHN1Ym1pdHRlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzdWJtaXRGb3JtID0gbmV3IEV2ZW50RW1pdHRlcjx7W2tleTogc3RyaW5nXTogYW55fT4oKTtcclxuXHJcbiAgQFZpZXdDaGlsZCgnYnV0dG9ucycpIGJ1dHRvbnM6IEVsZW1lbnRSZWY7XHJcblxyXG4gIGdldCBoYXNCdXR0b25zKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuYnV0dG9ucy5uYXRpdmVFbGVtZW50LmNoaWxkcmVuLmxlbmd0aCAhPT0gMDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgLyoqXHJcbiAgICogSXMgdGhlIGVudGl0eSBvciB0aGUgdGVtcGxhdGUgY2hhbmdlLCByZWNyZWF0ZSB0aGUgZm9ybSBvciByZXBvcHVsYXRlIGl0LlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGNvbnN0IGZvcm1EYXRhID0gY2hhbmdlcy5mb3JtRGF0YTtcclxuICAgIGlmIChmb3JtRGF0YSAmJiBmb3JtRGF0YS5jdXJyZW50VmFsdWUgIT09IGZvcm1EYXRhLnByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgaWYgKGZvcm1EYXRhLmN1cnJlbnRWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YShmb3JtRGF0YS5jdXJyZW50VmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUcmFuc2Zvcm0gdGhlIGZvcm0gZGF0YSB0byBhIGZlYXR1cmUgYW5kIGVtaXQgYW4gZXZlbnRcclxuICAgKiBAcGFyYW0gZXZlbnQgRm9ybSBzdWJtaXQgZXZlbnRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvblN1Ym1pdCgpIHtcclxuICAgIHRoaXMuc3VibWl0Rm9ybS5lbWl0KHRoaXMuZ2V0RGF0YSgpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0RGF0YShkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSkge1xyXG4gICAgdGhpcy5mb3JtLmZpZWxkcy5mb3JFYWNoKChmaWVsZDogRm9ybUZpZWxkKSA9PiB7XHJcbiAgICAgIGZpZWxkLmNvbnRyb2wuc2V0VmFsdWUodChkYXRhLCBmaWVsZC5uYW1lKS5zYWZlT2JqZWN0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZm9ybS5ncm91cHMuZm9yRWFjaCgoZ3JvdXA6IEZvcm1GaWVsZEdyb3VwKSA9PiB7XHJcbiAgICAgIGdyb3VwLmZpZWxkcy5mb3JFYWNoKChmaWVsZDogRm9ybUZpZWxkKSA9PiB7XHJcbiAgICAgICAgZmllbGQuY29udHJvbC5zZXRWYWx1ZSh0KGRhdGEsIGZpZWxkLm5hbWUpLnNhZmVPYmplY3QpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXREYXRhKCk6IHsgW2tleTogc3RyaW5nXTogYW55fSB7XHJcbiAgICBjb25zdCBkYXRhID0ge307XHJcbiAgICBnZXRBbGxGb3JtRmllbGRzKHRoaXMuZm9ybSkuZm9yRWFjaCgoZmllbGQ6IEZvcm1GaWVsZCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZURhdGFXaXRoRm9ybUZpZWxkKGRhdGEsIGZpZWxkKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZURhdGFXaXRoRm9ybUZpZWxkKGRhdGE6IHsgW2tleTogc3RyaW5nXTogYW55fSwgZmllbGQ6IEZvcm1GaWVsZCkge1xyXG4gICAgY29uc3QgY29udHJvbCA9IGZpZWxkLmNvbnRyb2w7XHJcbiAgICBpZiAoIWNvbnRyb2wuZGlzYWJsZWQpIHtcclxuICAgICAgZGF0YVtmaWVsZC5uYW1lXSA9IGNvbnRyb2wudmFsdWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciBmb3JtXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjbGVhcigpIHtcclxuICAgIHRoaXMuZm9ybS5jb250cm9sLnJlc2V0KCk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=