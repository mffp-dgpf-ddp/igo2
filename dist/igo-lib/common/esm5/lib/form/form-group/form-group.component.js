/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { getControlErrorMessage } from '../shared/form.utils';
/**
 * A configurable form, optionnally bound to an entity
 * (for example in case of un update). Submitting that form
 * emits an event with the form data but no other operation is performed.
 */
var FormGroupComponent = /** @class */ (function () {
    function FormGroupComponent() {
    }
    Object.defineProperty(FormGroupComponent.prototype, "formControl", {
        /**
         * Form group control
         */
        get: /**
         * Form group control
         * @return {?}
         */
        function () { return this.group.control; },
        enumerable: true,
        configurable: true
    });
    /**
     * Return the number of columns a field should occupy.
     * The maximum allowed is 2, even if the field config says more.
     * @param field Field
     * @returns Number of columns
     * @internal
     */
    /**
     * Return the number of columns a field should occupy.
     * The maximum allowed is 2, even if the field config says more.
     * \@internal
     * @param {?} field Field
     * @return {?} Number of columns
     */
    FormGroupComponent.prototype.getFieldColSpan = /**
     * Return the number of columns a field should occupy.
     * The maximum allowed is 2, even if the field config says more.
     * \@internal
     * @param {?} field Field
     * @return {?} Number of columns
     */
    function (field) {
        /** @type {?} */
        var colSpan = 2;
        /** @type {?} */
        var options = field.options || {};
        if (options.cols && options.cols > 0) {
            colSpan = Math.min(options.cols, 2);
        }
        return colSpan;
    };
    /**
     * Return the number of columns a field should occupy.
     * The maximum allowed is 2, even if the field config says more.
     * @param field Field
     * @returns Number of columns
     * @internal
     */
    /**
     * Return the number of columns a field should occupy.
     * The maximum allowed is 2, even if the field config says more.
     * \@internal
     * @param {?} field Field
     * @return {?} Number of columns
     */
    FormGroupComponent.prototype.getFieldNgClass = /**
     * Return the number of columns a field should occupy.
     * The maximum allowed is 2, even if the field config says more.
     * \@internal
     * @param {?} field Field
     * @return {?} Number of columns
     */
    function (field) {
        var _a;
        /** @type {?} */
        var colspan = this.getFieldColSpan(field);
        return _a = {}, _a["igo-form-field-colspan-" + colspan] = true, _a;
    };
    /**
     * Get error message
     */
    /**
     * Get error message
     * @return {?}
     */
    FormGroupComponent.prototype.getErrorMessage = /**
     * Get error message
     * @return {?}
     */
    function () {
        /** @type {?} */
        var options = this.group.options || {};
        return getControlErrorMessage(this.formControl, options.errors || {});
    };
    FormGroupComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-form-group',
                    template: "<div\r\n  *ngIf=\"group && group.fields.length > 0\"\r\n  class=\"igo-form-group-fields\">\r\n  <div\r\n    *ngFor=\"let field of group.fields\"\r\n    class=\"igo-form-field-wrapper\"\r\n    [ngClass]=\"getFieldNgClass(field)\">\r\n    <igo-form-field [field]=\"field\"></igo-form-field>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"igo-form-group-extra-content\">\r\n  <ng-content></ng-content>\r\n</div>\r\n\r\n<mat-error *ngIf=\"formControl.errors\">{{getErrorMessage() | translate}}</mat-error>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host{width:100%;height:100%;display:block;overflow:auto;padding:10px 5px}.igo-form-field-wrapper{display:inline-block;padding:0 5px}.igo-form-field-colspan-2{width:100%}.igo-form-field-colspan-1{width:50%}"]
                }] }
    ];
    /** @nocollapse */
    FormGroupComponent.ctorParameters = function () { return []; };
    FormGroupComponent.propDecorators = {
        group: [{ type: Input }],
        errors: [{ type: Input }]
    };
    return FormGroupComponent;
}());
export { FormGroupComponent };
if (false) {
    /**
     * Form field group
     * @type {?}
     */
    FormGroupComponent.prototype.group;
    /**
     * Field placeholder
     * @type {?}
     */
    FormGroupComponent.prototype.errors;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1ncm91cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvZm9ybS9mb3JtLWdyb3VwL2Zvcm0tZ3JvdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCx1QkFBdUIsRUFDeEIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7OztBQVE5RDtJQXVCRTtJQUFlLENBQUM7SUFGaEIsc0JBQUksMkNBQVc7UUFIZjs7V0FFRzs7Ozs7UUFDSCxjQUErQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFJM0Q7Ozs7OztPQU1HOzs7Ozs7OztJQUNILDRDQUFlOzs7Ozs7O0lBQWYsVUFBZ0IsS0FBZ0I7O1lBQzFCLE9BQU8sR0FBRyxDQUFDOztZQUNULE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxJQUFJLEVBQUU7UUFDbkMsSUFBSSxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFO1lBQ3BDLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDckM7UUFFRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7OztPQU1HOzs7Ozs7OztJQUNILDRDQUFlOzs7Ozs7O0lBQWYsVUFBZ0IsS0FBZ0I7OztZQUN4QixPQUFPLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUM7UUFDM0MsZ0JBQVEsR0FBQyw0QkFBMEIsT0FBUyxJQUFHLElBQUksS0FBRTtJQUN2RCxDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsNENBQWU7Ozs7SUFBZjs7WUFDUSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksRUFBRTtRQUN4QyxPQUFPLHNCQUFzQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN4RSxDQUFDOztnQkE1REYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLGdnQkFBMEM7b0JBRTFDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozs7O3dCQU1FLEtBQUs7eUJBS0wsS0FBSzs7SUE4Q1IseUJBQUM7Q0FBQSxBQTlERCxJQThEQztTQXhEWSxrQkFBa0I7Ozs7OztJQUs3QixtQ0FBK0I7Ozs7O0lBSy9CLG9DQUF5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IGdldENvbnRyb2xFcnJvck1lc3NhZ2UgfSBmcm9tICcuLi9zaGFyZWQvZm9ybS51dGlscyc7XHJcbmltcG9ydCB7IEZvcm1GaWVsZCwgRm9ybUZpZWxkR3JvdXAgfSBmcm9tICcuLi9zaGFyZWQvZm9ybS5pbnRlcmZhY2VzJztcclxuXHJcbi8qKlxyXG4gKiBBIGNvbmZpZ3VyYWJsZSBmb3JtLCBvcHRpb25uYWxseSBib3VuZCB0byBhbiBlbnRpdHlcclxuICogKGZvciBleGFtcGxlIGluIGNhc2Ugb2YgdW4gdXBkYXRlKS4gU3VibWl0dGluZyB0aGF0IGZvcm1cclxuICogZW1pdHMgYW4gZXZlbnQgd2l0aCB0aGUgZm9ybSBkYXRhIGJ1dCBubyBvdGhlciBvcGVyYXRpb24gaXMgcGVyZm9ybWVkLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tZm9ybS1ncm91cCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2Zvcm0tZ3JvdXAuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2Zvcm0tZ3JvdXAuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybUdyb3VwQ29tcG9uZW50IHtcclxuXHJcbiAgLyoqXHJcbiAgICogRm9ybSBmaWVsZCBncm91cFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGdyb3VwOiBGb3JtRmllbGRHcm91cDtcclxuXHJcbiAgLyoqXHJcbiAgICogRmllbGQgcGxhY2Vob2xkZXJcclxuICAgKi9cclxuICBASW5wdXQoKSBlcnJvcnM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xyXG5cclxuICAvKipcclxuICAgKiBGb3JtIGdyb3VwIGNvbnRyb2xcclxuICAgKi9cclxuICBnZXQgZm9ybUNvbnRyb2woKTogRm9ybUdyb3VwIHsgcmV0dXJuIHRoaXMuZ3JvdXAuY29udHJvbDsgfVxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiB0aGUgbnVtYmVyIG9mIGNvbHVtbnMgYSBmaWVsZCBzaG91bGQgb2NjdXB5LlxyXG4gICAqIFRoZSBtYXhpbXVtIGFsbG93ZWQgaXMgMiwgZXZlbiBpZiB0aGUgZmllbGQgY29uZmlnIHNheXMgbW9yZS5cclxuICAgKiBAcGFyYW0gZmllbGQgRmllbGRcclxuICAgKiBAcmV0dXJucyBOdW1iZXIgb2YgY29sdW1uc1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldEZpZWxkQ29sU3BhbihmaWVsZDogRm9ybUZpZWxkKTogbnVtYmVyIHtcclxuICAgIGxldCBjb2xTcGFuID0gMjtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSBmaWVsZC5vcHRpb25zIHx8IHt9O1xyXG4gICAgaWYgKG9wdGlvbnMuY29scyAmJiBvcHRpb25zLmNvbHMgPiAwKSB7XHJcbiAgICAgIGNvbFNwYW4gPSBNYXRoLm1pbihvcHRpb25zLmNvbHMsIDIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjb2xTcGFuO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIHRoZSBudW1iZXIgb2YgY29sdW1ucyBhIGZpZWxkIHNob3VsZCBvY2N1cHkuXHJcbiAgICogVGhlIG1heGltdW0gYWxsb3dlZCBpcyAyLCBldmVuIGlmIHRoZSBmaWVsZCBjb25maWcgc2F5cyBtb3JlLlxyXG4gICAqIEBwYXJhbSBmaWVsZCBGaWVsZFxyXG4gICAqIEByZXR1cm5zIE51bWJlciBvZiBjb2x1bW5zXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0RmllbGROZ0NsYXNzKGZpZWxkOiBGb3JtRmllbGQpOiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn0ge1xyXG4gICAgY29uc3QgY29sc3BhbiA9IHRoaXMuZ2V0RmllbGRDb2xTcGFuKGZpZWxkKTtcclxuICAgIHJldHVybiB7W2BpZ28tZm9ybS1maWVsZC1jb2xzcGFuLSR7Y29sc3Bhbn1gXTogdHJ1ZX07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgZXJyb3IgbWVzc2FnZVxyXG4gICAqL1xyXG4gIGdldEVycm9yTWVzc2FnZSgpOiBzdHJpbmcge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuZ3JvdXAub3B0aW9ucyB8fCB7fTtcclxuICAgIHJldHVybiBnZXRDb250cm9sRXJyb3JNZXNzYWdlKHRoaXMuZm9ybUNvbnRyb2wsIG9wdGlvbnMuZXJyb3JzIHx8IHt9KTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==