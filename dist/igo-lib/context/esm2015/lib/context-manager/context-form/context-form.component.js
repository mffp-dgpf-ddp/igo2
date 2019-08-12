/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ObjectUtils } from '@igo2/utils';
export class ContextFormComponent {
    /**
     * @param {?} formBuilder
     */
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this._disabled = false;
        // TODO: replace any by ContextOptions or Context
        this.submitForm = new EventEmitter();
        this.clone = new EventEmitter();
        this.delete = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get btnSubmitText() {
        return this._btnSubmitText;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set btnSubmitText(value) {
        this._btnSubmitText = value;
    }
    /**
     * @return {?}
     */
    get context() {
        return this._context;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set context(value) {
        this._context = value;
        this.buildForm();
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = value;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.buildForm();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    handleFormSubmit(value) {
        /** @type {?} */
        let inputs = Object.assign({}, value);
        inputs = ObjectUtils.removeNull(inputs);
        inputs.uri = inputs.uri.replace(' ', '');
        if (inputs.uri) {
            inputs.uri = this.prefix + '-' + inputs.uri;
        }
        else {
            inputs.uri = this.prefix;
        }
        this.submitForm.emit(inputs);
    }
    /**
     * @private
     * @return {?}
     */
    buildForm() {
        /** @type {?} */
        const context = this.context || {};
        /** @type {?} */
        const uriSplit = context.uri.split('-');
        this.prefix = uriSplit.shift();
        /** @type {?} */
        const uri = uriSplit.join('-');
        this.form = this.formBuilder.group({
            title: [context.title],
            uri: [uri || ' ']
        });
    }
}
ContextFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-context-form',
                template: "<form class=\"igo-form\" [formGroup]=\"form\"\r\n  (ngSubmit)=\"handleFormSubmit(form.value)\">\r\n\r\n  <mat-form-field class=\"full-width\">\r\n    <input matInput required\r\n           [placeholder]=\"'igo.context.contextManager.form.title' | translate\"\r\n           formControlName=\"title\">\r\n   <mat-error>\r\n    {{ 'igo.context.contextManager.form.titleRequired' | translate }}\r\n   </mat-error>\r\n  </mat-form-field>\r\n\r\n  <mat-form-field id=\"uriInput\" class=\"full-width\">\r\n    <span *ngIf=\"prefix\" class=\"prefix\">{{prefix}}-</span>\r\n    <span class=\"fieldWrapper\">\r\n      <input matInput\r\n           [placeholder]=\"'igo.context.contextManager.form.uri' | translate\"\r\n           formControlName=\"uri\">\r\n    </span>\r\n  </mat-form-field>\r\n\r\n  <div class=\"igo-form-button-group\">\r\n    <button\r\n      mat-raised-button\r\n      type=\"submit\"\r\n      [disabled]=\"!form.valid || disabled\">\r\n      {{ 'igo.context.contextManager.form.edit' | translate }}\r\n    </button>\r\n  </div>\r\n\r\n</form>\r\n",
                styles: [".full-width{width:100%}#uriInput .fieldWrapper{display:block;overflow:hidden}#uriInput .prefix{float:left}"]
            }] }
];
/** @nocollapse */
ContextFormComponent.ctorParameters = () => [
    { type: FormBuilder }
];
ContextFormComponent.propDecorators = {
    btnSubmitText: [{ type: Input }],
    context: [{ type: Input }],
    disabled: [{ type: Input }],
    submitForm: [{ type: Output }],
    clone: [{ type: Output }],
    delete: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    ContextFormComponent.prototype.form;
    /** @type {?} */
    ContextFormComponent.prototype.prefix;
    /**
     * @type {?}
     * @private
     */
    ContextFormComponent.prototype._btnSubmitText;
    /**
     * @type {?}
     * @private
     */
    ContextFormComponent.prototype._context;
    /**
     * @type {?}
     * @private
     */
    ContextFormComponent.prototype._disabled;
    /** @type {?} */
    ContextFormComponent.prototype.submitForm;
    /** @type {?} */
    ContextFormComponent.prototype.clone;
    /** @type {?} */
    ContextFormComponent.prototype.delete;
    /**
     * @type {?}
     * @private
     */
    ContextFormComponent.prototype.formBuilder;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tYW5hZ2VyL2NvbnRleHQtZm9ybS9jb250ZXh0LWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxXQUFXLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBUTFDLE1BQU0sT0FBTyxvQkFBb0I7Ozs7SUFxQy9CLFlBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBUHBDLGNBQVMsR0FBRyxLQUFLLENBQUM7O1FBR2hCLGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNuRCxVQUFLLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUMsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBRVYsQ0FBQzs7OztJQWpDaEQsSUFDSSxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBQ0QsSUFBSSxhQUFhLENBQUMsS0FBYTtRQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDOzs7O0lBR0QsSUFDSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBQ0QsSUFBSSxPQUFPLENBQUMsS0FBYztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQzs7OztJQUdELElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOzs7OztJQUNELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQzs7OztJQVVELFFBQVE7UUFDTixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQzs7Ozs7SUFFTSxnQkFBZ0IsQ0FBQyxLQUFLOztZQUN2QixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDO1FBQ3JDLE1BQU0sR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUNkLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUM3QzthQUFNO1lBQ0wsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQzFCO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7Ozs7SUFFTyxTQUFTOztjQUNULE9BQU8sR0FBUSxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUU7O2NBRWpDLFFBQVEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7O2NBQ3pCLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUU5QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQ2pDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDdEIsR0FBRyxFQUFFLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQztTQUNsQixDQUFDLENBQUM7SUFDTCxDQUFDOzs7WUF2RUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLCtpQ0FBNEM7O2FBRTdDOzs7O1lBVFEsV0FBVzs7OzRCQWNqQixLQUFLO3NCQVNMLEtBQUs7dUJBVUwsS0FBSzt5QkFVTCxNQUFNO29CQUNOLE1BQU07cUJBQ04sTUFBTTs7OztJQWxDUCxvQ0FBdUI7O0lBQ3ZCLHNDQUFzQjs7Ozs7SUFTdEIsOENBQStCOzs7OztJQVUvQix3Q0FBMEI7Ozs7O0lBUzFCLHlDQUEwQjs7SUFHMUIsMENBQTZEOztJQUM3RCxxQ0FBd0Q7O0lBQ3hELHNDQUF5RDs7Ozs7SUFFN0MsMkNBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgT2JqZWN0VXRpbHMgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tICcuLi9zaGFyZWQvY29udGV4dC5pbnRlcmZhY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tY29udGV4dC1mb3JtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY29udGV4dC1mb3JtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9jb250ZXh0LWZvcm0uY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29udGV4dEZvcm1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIHB1YmxpYyBmb3JtOiBGb3JtR3JvdXA7XHJcbiAgcHVibGljIHByZWZpeDogc3RyaW5nO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBidG5TdWJtaXRUZXh0KCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fYnRuU3VibWl0VGV4dDtcclxuICB9XHJcbiAgc2V0IGJ0blN1Ym1pdFRleHQodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5fYnRuU3VibWl0VGV4dCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9idG5TdWJtaXRUZXh0OiBzdHJpbmc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGNvbnRleHQoKTogQ29udGV4dCB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcclxuICB9XHJcbiAgc2V0IGNvbnRleHQodmFsdWU6IENvbnRleHQpIHtcclxuICAgIHRoaXMuX2NvbnRleHQgPSB2YWx1ZTtcclxuICAgIHRoaXMuYnVpbGRGb3JtKCk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2NvbnRleHQ6IENvbnRleHQ7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xyXG4gIH1cclxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2Rpc2FibGVkID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gIC8vIFRPRE86IHJlcGxhY2UgYW55IGJ5IENvbnRleHRPcHRpb25zIG9yIENvbnRleHRcclxuICBAT3V0cHV0KCkgc3VibWl0Rm9ybTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGNsb25lOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgZGVsZXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIpIHt9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5idWlsZEZvcm0oKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoYW5kbGVGb3JtU3VibWl0KHZhbHVlKSB7XHJcbiAgICBsZXQgaW5wdXRzID0gT2JqZWN0LmFzc2lnbih7fSwgdmFsdWUpO1xyXG4gICAgaW5wdXRzID0gT2JqZWN0VXRpbHMucmVtb3ZlTnVsbChpbnB1dHMpO1xyXG4gICAgaW5wdXRzLnVyaSA9IGlucHV0cy51cmkucmVwbGFjZSgnICcsICcnKTtcclxuICAgIGlmIChpbnB1dHMudXJpKSB7XHJcbiAgICAgIGlucHV0cy51cmkgPSB0aGlzLnByZWZpeCArICctJyArIGlucHV0cy51cmk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpbnB1dHMudXJpID0gdGhpcy5wcmVmaXg7XHJcbiAgICB9XHJcbiAgICB0aGlzLnN1Ym1pdEZvcm0uZW1pdChpbnB1dHMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBidWlsZEZvcm0oKTogdm9pZCB7XHJcbiAgICBjb25zdCBjb250ZXh0OiBhbnkgPSB0aGlzLmNvbnRleHQgfHwge307XHJcblxyXG4gICAgY29uc3QgdXJpU3BsaXQgPSBjb250ZXh0LnVyaS5zcGxpdCgnLScpO1xyXG4gICAgdGhpcy5wcmVmaXggPSB1cmlTcGxpdC5zaGlmdCgpO1xyXG4gICAgY29uc3QgdXJpID0gdXJpU3BsaXQuam9pbignLScpO1xyXG5cclxuICAgIHRoaXMuZm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICB0aXRsZTogW2NvbnRleHQudGl0bGVdLFxyXG4gICAgICB1cmk6IFt1cmkgfHwgJyAnXVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==