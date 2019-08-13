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
export class FormFieldComponent {
    /**
     * @param {?} formFieldService
     */
    constructor(formFieldService) {
        this.formFieldService = formFieldService;
    }
    /**
     * @return {?}
     */
    get fieldOptions() {
        return this.field.options || {};
    }
    /**
     * @return {?}
     */
    getFieldComponent() {
        return this.formFieldService.getFieldByType(this.field.type || 'text');
    }
    /**
     * @return {?}
     */
    getFieldInputs() {
        /** @type {?} */
        const errors = this.fieldOptions.errors || {};
        return Object.assign({
            placeholder: this.field.title,
            disableSwitch: this.fieldOptions.disableSwitch || false
        }, Object.assign({}, this.field.inputs || {}), {
            formControl: this.field.control,
            errors: Object.assign({}, getDefaultErrorMessages(), errors)
        });
    }
    /**
     * @return {?}
     */
    getFieldSubscribers() {
        return Object.assign({}, this.field.subscribers || {});
    }
}
FormFieldComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-form-field',
                template: "\r\n\r\n<ng-container *ngIf=\"field !== undefined\">\r\n  <igo-dynamic-outlet\r\n    [component]=\"getFieldComponent()\"\r\n    [inputs]=\"getFieldInputs()\"\r\n    [subscribers]=\"getFieldSubscribers()\">\r\n  </igo-dynamic-outlet>\r\n</ng-container>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["::ng-deep mat-form-field{width:100%}::ng-deep .igo-form-disable-switch{margin-right:8px}"]
            }] }
];
/** @nocollapse */
FormFieldComponent.ctorParameters = () => [
    { type: FormFieldService }
];
FormFieldComponent.propDecorators = {
    field: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvZm9ybS9mb3JtLWZpZWxkL2Zvcm0tZmllbGQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCx1QkFBdUIsRUFDeEIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sV0FBVyxDQUFDOzs7OztBQVlwRCxNQUFNLE9BQU8sa0JBQWtCOzs7O0lBVzdCLFlBQW9CLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBQUcsQ0FBQzs7OztJQUoxRCxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzs7O0lBSUQsaUJBQWlCO1FBQ2YsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxDQUFDO0lBQ3pFLENBQUM7Ozs7SUFFRCxjQUFjOztjQUNOLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sSUFBSSxFQUFFO1FBQzdDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FDbEI7WUFDRSxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQzdCLGFBQWEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsSUFBSSxLQUFLO1NBQ3hELEVBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLEVBQzFDO1lBQ0UsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTztZQUMvQixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsdUJBQXVCLEVBQUUsRUFBRSxNQUFNLENBQUM7U0FDN0QsQ0FDRixDQUFDO0lBQ0osQ0FBQzs7OztJQUVELG1CQUFtQjtRQUNqQixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3pELENBQUM7OztZQXhDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsMlFBQTBDO2dCQUUxQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs7WUFaUSxnQkFBZ0I7OztvQkFrQnRCLEtBQUs7Ozs7Ozs7SUFBTixtQ0FBMEI7Ozs7O0lBTWQsOENBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEZvcm1GaWVsZCwgRm9ybUZpZWxkSW5wdXRzLCBGb3JtRmllbGRPcHRpb25zIH0gZnJvbSAnLi4vc2hhcmVkL2Zvcm0uaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IEZvcm1GaWVsZFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvZm9ybS1maWVsZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgZ2V0RGVmYXVsdEVycm9yTWVzc2FnZXMgfSBmcm9tICcuLi9zaGFyZWQnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY29tcG9uZW50IHJlbmRlcnMgdGhlIHByb3BlciBmb3JtIGlucHV0IGJhc2VkIG9uXHJcbiAqIHRoZSBmaWVsZCBjb25maWd1cmF0aW9uIGl0IHJlY2VpdmVzLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tZm9ybS1maWVsZCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2Zvcm0tZmllbGQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2Zvcm0tZmllbGQuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybUZpZWxkQ29tcG9uZW50IHtcclxuXHJcbiAgLyoqXHJcbiAgICogRmllbGQgY29uZmlndXJhdGlvblxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGZpZWxkOiBGb3JtRmllbGQ7XHJcblxyXG4gIGdldCBmaWVsZE9wdGlvbnMoKTogRm9ybUZpZWxkT3B0aW9ucyB7XHJcbiAgICByZXR1cm4gdGhpcy5maWVsZC5vcHRpb25zIHx8IHt9O1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmb3JtRmllbGRTZXJ2aWNlOiBGb3JtRmllbGRTZXJ2aWNlKSB7fVxyXG5cclxuICBnZXRGaWVsZENvbXBvbmVudCgpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuZm9ybUZpZWxkU2VydmljZS5nZXRGaWVsZEJ5VHlwZSh0aGlzLmZpZWxkLnR5cGUgfHwgJ3RleHQnKTtcclxuICB9XHJcblxyXG4gIGdldEZpZWxkSW5wdXRzKCk6IEZvcm1GaWVsZElucHV0cyB7XHJcbiAgICBjb25zdCBlcnJvcnMgPSB0aGlzLmZpZWxkT3B0aW9ucy5lcnJvcnMgfHwge307XHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihcclxuICAgICAge1xyXG4gICAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLmZpZWxkLnRpdGxlLFxyXG4gICAgICAgIGRpc2FibGVTd2l0Y2g6IHRoaXMuZmllbGRPcHRpb25zLmRpc2FibGVTd2l0Y2ggfHwgZmFsc2VcclxuICAgICAgfSxcclxuICAgICAgT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5maWVsZC5pbnB1dHMgfHwge30pLFxyXG4gICAgICB7XHJcbiAgICAgICAgZm9ybUNvbnRyb2w6IHRoaXMuZmllbGQuY29udHJvbCxcclxuICAgICAgICBlcnJvcnM6IE9iamVjdC5hc3NpZ24oe30sIGdldERlZmF1bHRFcnJvck1lc3NhZ2VzKCksIGVycm9ycylcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdldEZpZWxkU3Vic2NyaWJlcnMoKToge1trZXk6IHN0cmluZ106ICh7ZmllbGQ6IEZvcm1GaWVsZCwgY29udHJvbDogRm9ybUNvbnRyb2x9KSA9PiB2b2lkIH0ge1xyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZmllbGQuc3Vic2NyaWJlcnMgfHwge30pO1xyXG4gIH1cclxufVxyXG4iXX0=