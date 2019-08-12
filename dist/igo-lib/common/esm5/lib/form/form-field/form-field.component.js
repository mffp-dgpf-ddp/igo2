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
        var errors = this.field.options.errors || {};
        return Object.assign({
            placeholder: this.field.title,
            disableSwitch: this.field.options.disableSwitch || false
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvZm9ybS9mb3JtLWZpZWxkL2Zvcm0tZmllbGQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCx1QkFBdUIsRUFDeEIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sV0FBVyxDQUFDOzs7OztBQU1wRDtJQWFFLDRCQUFvQixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUFHLENBQUM7Ozs7SUFFMUQsOENBQWlCOzs7SUFBakI7UUFDRSxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLENBQUM7SUFDekUsQ0FBQzs7OztJQUVELDJDQUFjOzs7SUFBZDs7WUFDUSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLEVBQUU7UUFDOUMsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUNsQjtZQUNFLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7WUFDN0IsYUFBYSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsSUFBSSxLQUFLO1NBQ3pELEVBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLEVBQzFDO1lBQ0UsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTztZQUMvQixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsdUJBQXVCLEVBQUUsRUFBRSxNQUFNLENBQUM7U0FDN0QsQ0FDRixDQUFDO0lBQ0osQ0FBQzs7OztJQUVELGdEQUFtQjs7O0lBQW5CO1FBQ0UsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN6RCxDQUFDOztnQkFwQ0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLDJRQUEwQztvQkFFMUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnQkFaUSxnQkFBZ0I7Ozt3QkFrQnRCLEtBQUs7O0lBMEJSLHlCQUFDO0NBQUEsQUFyQ0QsSUFxQ0M7U0EvQlksa0JBQWtCOzs7Ozs7SUFLN0IsbUNBQTBCOzs7OztJQUVkLDhDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBGb3JtRmllbGQsIEZvcm1GaWVsZElucHV0cyB9IGZyb20gJy4uL3NoYXJlZC9mb3JtLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBGb3JtRmllbGRTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2Zvcm0tZmllbGQuc2VydmljZSc7XHJcbmltcG9ydCB7IGdldERlZmF1bHRFcnJvck1lc3NhZ2VzIH0gZnJvbSAnLi4vc2hhcmVkJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNvbXBvbmVudCByZW5kZXJzIHRoZSBwcm9wZXIgZm9ybSBpbnB1dCBiYXNlZCBvblxyXG4gKiB0aGUgZmllbGQgY29uZmlndXJhdGlvbiBpdCByZWNlaXZlcy5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWZvcm0tZmllbGQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9mb3JtLWZpZWxkLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9mb3JtLWZpZWxkLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1GaWVsZENvbXBvbmVudCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpZWxkIGNvbmZpZ3VyYXRpb25cclxuICAgKi9cclxuICBASW5wdXQoKSBmaWVsZDogRm9ybUZpZWxkO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZvcm1GaWVsZFNlcnZpY2U6IEZvcm1GaWVsZFNlcnZpY2UpIHt9XHJcblxyXG4gIGdldEZpZWxkQ29tcG9uZW50KCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5mb3JtRmllbGRTZXJ2aWNlLmdldEZpZWxkQnlUeXBlKHRoaXMuZmllbGQudHlwZSB8fCAndGV4dCcpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RmllbGRJbnB1dHMoKTogRm9ybUZpZWxkSW5wdXRzIHtcclxuICAgIGNvbnN0IGVycm9ycyA9IHRoaXMuZmllbGQub3B0aW9ucy5lcnJvcnMgfHwge307XHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihcclxuICAgICAge1xyXG4gICAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLmZpZWxkLnRpdGxlLFxyXG4gICAgICAgIGRpc2FibGVTd2l0Y2g6IHRoaXMuZmllbGQub3B0aW9ucy5kaXNhYmxlU3dpdGNoIHx8IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgIE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZmllbGQuaW5wdXRzIHx8IHt9KSxcclxuICAgICAge1xyXG4gICAgICAgIGZvcm1Db250cm9sOiB0aGlzLmZpZWxkLmNvbnRyb2wsXHJcbiAgICAgICAgZXJyb3JzOiBPYmplY3QuYXNzaWduKHt9LCBnZXREZWZhdWx0RXJyb3JNZXNzYWdlcygpLCBlcnJvcnMpXHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXRGaWVsZFN1YnNjcmliZXJzKCk6IHtba2V5OiBzdHJpbmddOiAoe2ZpZWxkOiBGb3JtRmllbGQsIGNvbnRyb2w6IEZvcm1Db250cm9sfSkgPT4gdm9pZCB9IHtcclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmZpZWxkLnN1YnNjcmliZXJzIHx8IHt9KTtcclxuICB9XHJcbn1cclxuIl19