/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormFieldService } from '../shared/form-field.service';
import { getDefaultErrorMessages } from '../shared';
/**
 * This component renders the proper form input based on
 * the field configuration it receives.
 */
var FormFieldComponent = /** @class */ (function () {
    function FormFieldComponent(formFieldService) {
        this.formFieldService = formFieldService;
    }
    Object.defineProperty(FormFieldComponent.prototype, "fieldOptions", {
        get: /**
         * @return {?}
         */
        function () {
            return this.field.options || {};
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FormFieldComponent.prototype.getFieldComponent = /**
     * @return {?}
     */
    function () {
        return this.formFieldService.getFieldByType(this.field.type || 'text');
    };
    /**
     * @return {?}
     */
    FormFieldComponent.prototype.getFieldInputs = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var errors = this.fieldOptions.errors || {};
        return Object.assign({
            placeholder: this.field.title,
            disableSwitch: this.fieldOptions.disableSwitch || false
        }, Object.assign({}, this.field.inputs || {}), {
            formControl: this.field.control,
            errors: Object.assign({}, getDefaultErrorMessages(), errors)
        });
    };
    /**
     * @return {?}
     */
    FormFieldComponent.prototype.getFieldSubscribers = /**
     * @return {?}
     */
    function () {
        return Object.assign({}, this.field.subscribers || {});
    };
    FormFieldComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-form-field',
                    template: "\r\n\r\n<ng-container *ngIf=\"field !== undefined\">\r\n  <igo-dynamic-outlet\r\n    [component]=\"getFieldComponent()\"\r\n    [inputs]=\"getFieldInputs()\"\r\n    [subscribers]=\"getFieldSubscribers()\">\r\n  </igo-dynamic-outlet>\r\n</ng-container>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["::ng-deep mat-form-field{width:100%}::ng-deep .igo-form-disable-switch{margin-right:8px}"]
                }] }
    ];
    /** @nocollapse */
    FormFieldComponent.ctorParameters = function () { return [
        { type: FormFieldService }
    ]; };
    FormFieldComponent.propDecorators = {
        field: [{ type: Input }]
    };
    return FormFieldComponent;
}());
export { FormFieldComponent };
if (false) {
    /**
     * Field configuration
     * @type {?}
     */
    FormFieldComponent.prototype.field;
    /**
     * @type {?}
     * @private
     */
    FormFieldComponent.prototype.formFieldService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvZm9ybS9mb3JtLWZpZWxkL2Zvcm0tZmllbGQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCx1QkFBdUIsRUFDeEIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sV0FBVyxDQUFDOzs7OztBQU1wRDtJQWlCRSw0QkFBb0IsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7SUFBRyxDQUFDO0lBSjFELHNCQUFJLDRDQUFZOzs7O1FBQWhCO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDbEMsQ0FBQzs7O09BQUE7Ozs7SUFJRCw4Q0FBaUI7OztJQUFqQjtRQUNFLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsQ0FBQztJQUN6RSxDQUFDOzs7O0lBRUQsMkNBQWM7OztJQUFkOztZQUNRLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sSUFBSSxFQUFFO1FBQzdDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FDbEI7WUFDRSxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQzdCLGFBQWEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsSUFBSSxLQUFLO1NBQ3hELEVBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLEVBQzFDO1lBQ0UsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTztZQUMvQixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsdUJBQXVCLEVBQUUsRUFBRSxNQUFNLENBQUM7U0FDN0QsQ0FDRixDQUFDO0lBQ0osQ0FBQzs7OztJQUVELGdEQUFtQjs7O0lBQW5CO1FBQ0UsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN6RCxDQUFDOztnQkF4Q0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLDJRQUEwQztvQkFFMUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnQkFaUSxnQkFBZ0I7Ozt3QkFrQnRCLEtBQUs7O0lBOEJSLHlCQUFDO0NBQUEsQUF6Q0QsSUF5Q0M7U0FuQ1ksa0JBQWtCOzs7Ozs7SUFLN0IsbUNBQTBCOzs7OztJQU1kLDhDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBGb3JtRmllbGQsIEZvcm1GaWVsZElucHV0cywgRm9ybUZpZWxkT3B0aW9ucyB9IGZyb20gJy4uL3NoYXJlZC9mb3JtLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBGb3JtRmllbGRTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2Zvcm0tZmllbGQuc2VydmljZSc7XHJcbmltcG9ydCB7IGdldERlZmF1bHRFcnJvck1lc3NhZ2VzIH0gZnJvbSAnLi4vc2hhcmVkJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNvbXBvbmVudCByZW5kZXJzIHRoZSBwcm9wZXIgZm9ybSBpbnB1dCBiYXNlZCBvblxyXG4gKiB0aGUgZmllbGQgY29uZmlndXJhdGlvbiBpdCByZWNlaXZlcy5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWZvcm0tZmllbGQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9mb3JtLWZpZWxkLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9mb3JtLWZpZWxkLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1GaWVsZENvbXBvbmVudCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpZWxkIGNvbmZpZ3VyYXRpb25cclxuICAgKi9cclxuICBASW5wdXQoKSBmaWVsZDogRm9ybUZpZWxkO1xyXG5cclxuICBnZXQgZmllbGRPcHRpb25zKCk6IEZvcm1GaWVsZE9wdGlvbnMge1xyXG4gICAgcmV0dXJuIHRoaXMuZmllbGQub3B0aW9ucyB8fCB7fTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZm9ybUZpZWxkU2VydmljZTogRm9ybUZpZWxkU2VydmljZSkge31cclxuXHJcbiAgZ2V0RmllbGRDb21wb25lbnQoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLmZvcm1GaWVsZFNlcnZpY2UuZ2V0RmllbGRCeVR5cGUodGhpcy5maWVsZC50eXBlIHx8ICd0ZXh0Jyk7XHJcbiAgfVxyXG5cclxuICBnZXRGaWVsZElucHV0cygpOiBGb3JtRmllbGRJbnB1dHMge1xyXG4gICAgY29uc3QgZXJyb3JzID0gdGhpcy5maWVsZE9wdGlvbnMuZXJyb3JzIHx8IHt9O1xyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXHJcbiAgICAgIHtcclxuICAgICAgICBwbGFjZWhvbGRlcjogdGhpcy5maWVsZC50aXRsZSxcclxuICAgICAgICBkaXNhYmxlU3dpdGNoOiB0aGlzLmZpZWxkT3B0aW9ucy5kaXNhYmxlU3dpdGNoIHx8IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgIE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZmllbGQuaW5wdXRzIHx8IHt9KSxcclxuICAgICAge1xyXG4gICAgICAgIGZvcm1Db250cm9sOiB0aGlzLmZpZWxkLmNvbnRyb2wsXHJcbiAgICAgICAgZXJyb3JzOiBPYmplY3QuYXNzaWduKHt9LCBnZXREZWZhdWx0RXJyb3JNZXNzYWdlcygpLCBlcnJvcnMpXHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXRGaWVsZFN1YnNjcmliZXJzKCk6IHtba2V5OiBzdHJpbmddOiAoe2ZpZWxkOiBGb3JtRmllbGQsIGNvbnRyb2w6IEZvcm1Db250cm9sfSkgPT4gdm9pZCB9IHtcclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmZpZWxkLnN1YnNjcmliZXJzIHx8IHt9KTtcclxuICB9XHJcbn1cclxuIl19