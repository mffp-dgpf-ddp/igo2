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
var FormComponent = /** @class */ (function () {
    function FormComponent() {
        /**
         * Event emitted when the form is submitted
         */
        this.submitForm = new EventEmitter();
    }
    Object.defineProperty(FormComponent.prototype, "hasButtons", {
        get: /**
         * @return {?}
         */
        function () {
            return this.buttons.nativeElement.children.length !== 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Is the entity or the template change, recreate the form or repopulate it.
     * @internal
     */
    /**
     * Is the entity or the template change, recreate the form or repopulate it.
     * \@internal
     * @param {?} changes
     * @return {?}
     */
    FormComponent.prototype.ngOnChanges = /**
     * Is the entity or the template change, recreate the form or repopulate it.
     * \@internal
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var formData = changes.formData;
        if (formData && formData.currentValue !== formData.previousValue) {
            if (formData.currentValue === undefined) {
                this.clear();
            }
            else {
                this.setData(formData.currentValue);
            }
        }
    };
    /**
     * Transform the form data to a feature and emit an event
     * @param event Form submit event
     * @internal
     */
    /**
     * Transform the form data to a feature and emit an event
     * \@internal
     * @return {?}
     */
    FormComponent.prototype.onSubmit = /**
     * Transform the form data to a feature and emit an event
     * \@internal
     * @return {?}
     */
    function () {
        this.submitForm.emit(this.getData());
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    FormComponent.prototype.setData = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.form.fields.forEach((/**
         * @param {?} field
         * @return {?}
         */
        function (field) {
            field.control.setValue(t(data, field.name).safeObject);
        }));
        this.form.groups.forEach((/**
         * @param {?} group
         * @return {?}
         */
        function (group) {
            group.fields.forEach((/**
             * @param {?} field
             * @return {?}
             */
            function (field) {
                field.control.setValue(t(data, field.name).safeObject);
            }));
        }));
    };
    /**
     * @private
     * @return {?}
     */
    FormComponent.prototype.getData = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var data = {};
        getAllFormFields(this.form).forEach((/**
         * @param {?} field
         * @return {?}
         */
        function (field) {
            _this.updateDataWithFormField(data, field);
        }));
        return data;
    };
    /**
     * @private
     * @param {?} data
     * @param {?} field
     * @return {?}
     */
    FormComponent.prototype.updateDataWithFormField = /**
     * @private
     * @param {?} data
     * @param {?} field
     * @return {?}
     */
    function (data, field) {
        /** @type {?} */
        var control = field.control;
        if (!control.disabled) {
            data[field.name] = control.value;
        }
    };
    /**
     * Clear form
     */
    /**
     * Clear form
     * @private
     * @return {?}
     */
    FormComponent.prototype.clear = /**
     * Clear form
     * @private
     * @return {?}
     */
    function () {
        this.form.control.reset();
    };
    FormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-form',
                    template: "\r\n<form\r\n  [formGroup]=\"form.control\"\r\n  (ngSubmit)=\"onSubmit()\">\r\n  <div class=\"igo-form-body\" [ngClass]=\"{'igo-form-body-with-buttons': hasButtons}\">\r\n    <div class=\"igo-form-content\">\r\n      <ng-content></ng-content>\r\n    </div>\r\n    <div #buttons class=\"igo-form-buttons\">\r\n      <ng-content select=\"[formButtons]\"></ng-content>\r\n    </div>\r\n  </div>\r\n</form>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:block}form{width:100%;height:100%}.igo-form-body,.igo-form-content{height:100%}.igo-form-body-with-buttons .igo-form-content{height:calc(100% - 56px)}.igo-form-content{display:flex}"]
                }] }
    ];
    /** @nocollapse */
    FormComponent.ctorParameters = function () { return []; };
    FormComponent.propDecorators = {
        form: [{ type: Input }],
        formData: [{ type: Input }],
        submitForm: [{ type: Output }],
        buttons: [{ type: ViewChild, args: ['buttons',] }]
    };
    return FormComponent;
}());
export { FormComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvZm9ybS9mb3JtL2Zvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUdaLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNYLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sQ0FBQyxNQUFNLE1BQU0sQ0FBQztBQUdyQixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7OztBQUt4RDtJQTZCRTs7OztRQVJVLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBd0IsQ0FBQztJQVFqRCxDQUFDO0lBSmhCLHNCQUFJLHFDQUFVOzs7O1FBQWQ7WUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO1FBQzFELENBQUM7OztPQUFBO0lBSUQ7OztPQUdHOzs7Ozs7O0lBQ0gsbUNBQVc7Ozs7OztJQUFYLFVBQVksT0FBc0I7O1lBQzFCLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUTtRQUNqQyxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsWUFBWSxLQUFLLFFBQVEsQ0FBQyxhQUFhLEVBQUU7WUFDaEUsSUFBSSxRQUFRLENBQUMsWUFBWSxLQUFLLFNBQVMsRUFBRTtnQkFDdkMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2Q7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDckM7U0FDRjtJQUNILENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7SUFDSCxnQ0FBUTs7Ozs7SUFBUjtRQUNFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Ozs7OztJQUVPLCtCQUFPOzs7OztJQUFmLFVBQWdCLElBQTBCO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87Ozs7UUFBQyxVQUFDLEtBQWdCO1lBQ3hDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pELENBQUMsRUFBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTzs7OztRQUFDLFVBQUMsS0FBcUI7WUFDN0MsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPOzs7O1lBQUMsVUFBQyxLQUFnQjtnQkFDcEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDekQsQ0FBQyxFQUFDLENBQUM7UUFDTCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRU8sK0JBQU87Ozs7SUFBZjtRQUFBLGlCQU1DOztZQUxPLElBQUksR0FBRyxFQUFFO1FBQ2YsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU87Ozs7UUFBQyxVQUFDLEtBQWdCO1lBQ25ELEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDNUMsQ0FBQyxFQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7Ozs7SUFFTywrQ0FBdUI7Ozs7OztJQUEvQixVQUFnQyxJQUEyQixFQUFFLEtBQWdCOztZQUNyRSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU87UUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSyw2QkFBSzs7Ozs7SUFBYjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzVCLENBQUM7O2dCQXZGRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFVBQVU7b0JBQ3BCLGthQUFvQztvQkFFcEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7Ozs7dUJBTUUsS0FBSzsyQkFLTCxLQUFLOzZCQUtMLE1BQU07MEJBRU4sU0FBUyxTQUFDLFNBQVM7O0lBa0V0QixvQkFBQztDQUFBLEFBekZELElBeUZDO1NBbkZZLGFBQWE7Ozs7OztJQUt4Qiw2QkFBb0I7Ozs7O0lBS3BCLGlDQUF5Qzs7Ozs7SUFLekMsbUNBQWdFOztJQUVoRSxnQ0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE9uQ2hhbmdlcyxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIFZpZXdDaGlsZCxcclxuICBFbGVtZW50UmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgdCBmcm9tICd0eXB5JztcclxuXHJcbmltcG9ydCB7IEZvcm0sIEZvcm1GaWVsZCwgRm9ybUZpZWxkR3JvdXAgfSBmcm9tICcuLi9zaGFyZWQvZm9ybS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgZ2V0QWxsRm9ybUZpZWxkcyB9IGZyb20gJy4uL3NoYXJlZC9mb3JtLnV0aWxzJztcclxuXHJcbi8qKlxyXG4gKiBBIGNvbmZpZ3VyYWJsZSBmb3JtXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1mb3JtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZm9ybS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZm9ybS5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuXHJcbiAgLyoqXHJcbiAgICogRm9ybVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGZvcm06IEZvcm07XHJcblxyXG4gIC8qKlxyXG4gICAqIElucHV0IGRhdGFcclxuICAgKi9cclxuICBASW5wdXQoKSBmb3JtRGF0YTogeyBba2V5OiBzdHJpbmddOiBhbnl9O1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGZvcm0gaXMgc3VibWl0dGVkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHN1Ym1pdEZvcm0gPSBuZXcgRXZlbnRFbWl0dGVyPHtba2V5OiBzdHJpbmddOiBhbnl9PigpO1xyXG5cclxuICBAVmlld0NoaWxkKCdidXR0b25zJykgYnV0dG9uczogRWxlbWVudFJlZjtcclxuXHJcbiAgZ2V0IGhhc0J1dHRvbnMoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5idXR0b25zLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoICE9PSAwO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBJcyB0aGUgZW50aXR5IG9yIHRoZSB0ZW1wbGF0ZSBjaGFuZ2UsIHJlY3JlYXRlIHRoZSBmb3JtIG9yIHJlcG9wdWxhdGUgaXQuXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgY29uc3QgZm9ybURhdGEgPSBjaGFuZ2VzLmZvcm1EYXRhO1xyXG4gICAgaWYgKGZvcm1EYXRhICYmIGZvcm1EYXRhLmN1cnJlbnRWYWx1ZSAhPT0gZm9ybURhdGEucHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICBpZiAoZm9ybURhdGEuY3VycmVudFZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKGZvcm1EYXRhLmN1cnJlbnRWYWx1ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyYW5zZm9ybSB0aGUgZm9ybSBkYXRhIHRvIGEgZmVhdHVyZSBhbmQgZW1pdCBhbiBldmVudFxyXG4gICAqIEBwYXJhbSBldmVudCBGb3JtIHN1Ym1pdCBldmVudFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uU3VibWl0KCkge1xyXG4gICAgdGhpcy5zdWJtaXRGb3JtLmVtaXQodGhpcy5nZXREYXRhKCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXREYXRhKGRhdGE6IHtba2V5OiBzdHJpbmddOiBhbnl9KSB7XHJcbiAgICB0aGlzLmZvcm0uZmllbGRzLmZvckVhY2goKGZpZWxkOiBGb3JtRmllbGQpID0+IHtcclxuICAgICAgZmllbGQuY29udHJvbC5zZXRWYWx1ZSh0KGRhdGEsIGZpZWxkLm5hbWUpLnNhZmVPYmplY3QpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5mb3JtLmdyb3Vwcy5mb3JFYWNoKChncm91cDogRm9ybUZpZWxkR3JvdXApID0+IHtcclxuICAgICAgZ3JvdXAuZmllbGRzLmZvckVhY2goKGZpZWxkOiBGb3JtRmllbGQpID0+IHtcclxuICAgICAgICBmaWVsZC5jb250cm9sLnNldFZhbHVlKHQoZGF0YSwgZmllbGQubmFtZSkuc2FmZU9iamVjdCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldERhdGEoKTogeyBba2V5OiBzdHJpbmddOiBhbnl9IHtcclxuICAgIGNvbnN0IGRhdGEgPSB7fTtcclxuICAgIGdldEFsbEZvcm1GaWVsZHModGhpcy5mb3JtKS5mb3JFYWNoKChmaWVsZDogRm9ybUZpZWxkKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlRGF0YVdpdGhGb3JtRmllbGQoZGF0YSwgZmllbGQpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlRGF0YVdpdGhGb3JtRmllbGQoZGF0YTogeyBba2V5OiBzdHJpbmddOiBhbnl9LCBmaWVsZDogRm9ybUZpZWxkKSB7XHJcbiAgICBjb25zdCBjb250cm9sID0gZmllbGQuY29udHJvbDtcclxuICAgIGlmICghY29udHJvbC5kaXNhYmxlZCkge1xyXG4gICAgICBkYXRhW2ZpZWxkLm5hbWVdID0gY29udHJvbC52YWx1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIGZvcm1cclxuICAgKi9cclxuICBwcml2YXRlIGNsZWFyKCkge1xyXG4gICAgdGhpcy5mb3JtLmNvbnRyb2wucmVzZXQoKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==