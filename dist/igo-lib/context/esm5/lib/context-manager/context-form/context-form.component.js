/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ObjectUtils } from '@igo2/utils';
var ContextFormComponent = /** @class */ (function () {
    function ContextFormComponent(formBuilder) {
        this.formBuilder = formBuilder;
        this._disabled = false;
        // TODO: replace any by ContextOptions or Context
        this.submitForm = new EventEmitter();
        this.clone = new EventEmitter();
        this.delete = new EventEmitter();
    }
    Object.defineProperty(ContextFormComponent.prototype, "btnSubmitText", {
        get: /**
         * @return {?}
         */
        function () {
            return this._btnSubmitText;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._btnSubmitText = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextFormComponent.prototype, "context", {
        get: /**
         * @return {?}
         */
        function () {
            return this._context;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._context = value;
            this.buildForm();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextFormComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ContextFormComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.buildForm();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ContextFormComponent.prototype.handleFormSubmit = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var inputs = Object.assign({}, value);
        inputs = ObjectUtils.removeNull(inputs);
        inputs.uri = inputs.uri.replace(' ', '');
        if (inputs.uri) {
            inputs.uri = this.prefix + '-' + inputs.uri;
        }
        else {
            inputs.uri = this.prefix;
        }
        this.submitForm.emit(inputs);
    };
    /**
     * @private
     * @return {?}
     */
    ContextFormComponent.prototype.buildForm = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var context = this.context || {};
        /** @type {?} */
        var uriSplit = context.uri.split('-');
        this.prefix = uriSplit.shift();
        /** @type {?} */
        var uri = uriSplit.join('-');
        this.form = this.formBuilder.group({
            title: [context.title],
            uri: [uri || ' ']
        });
    };
    ContextFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-context-form',
                    template: "<form class=\"igo-form\" [formGroup]=\"form\"\r\n  (ngSubmit)=\"handleFormSubmit(form.value)\">\r\n\r\n  <mat-form-field class=\"full-width\">\r\n    <input matInput required\r\n           [placeholder]=\"'igo.context.contextManager.form.title' | translate\"\r\n           formControlName=\"title\">\r\n   <mat-error>\r\n    {{ 'igo.context.contextManager.form.titleRequired' | translate }}\r\n   </mat-error>\r\n  </mat-form-field>\r\n\r\n  <mat-form-field id=\"uriInput\" class=\"full-width\">\r\n    <span *ngIf=\"prefix\" class=\"prefix\">{{prefix}}-</span>\r\n    <span class=\"fieldWrapper\">\r\n      <input matInput\r\n           [placeholder]=\"'igo.context.contextManager.form.uri' | translate\"\r\n           formControlName=\"uri\">\r\n    </span>\r\n  </mat-form-field>\r\n\r\n  <div class=\"igo-form-button-group\">\r\n    <button\r\n      mat-raised-button\r\n      type=\"submit\"\r\n      [disabled]=\"!form.valid || disabled\">\r\n      {{ 'igo.context.contextManager.form.edit' | translate }}\r\n    </button>\r\n  </div>\r\n\r\n</form>\r\n",
                    styles: [".full-width{width:100%}#uriInput .fieldWrapper{display:block;overflow:hidden}#uriInput .prefix{float:left}"]
                }] }
    ];
    /** @nocollapse */
    ContextFormComponent.ctorParameters = function () { return [
        { type: FormBuilder }
    ]; };
    ContextFormComponent.propDecorators = {
        btnSubmitText: [{ type: Input }],
        context: [{ type: Input }],
        disabled: [{ type: Input }],
        submitForm: [{ type: Output }],
        clone: [{ type: Output }],
        delete: [{ type: Output }]
    };
    return ContextFormComponent;
}());
export { ContextFormComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tYW5hZ2VyL2NvbnRleHQtZm9ybS9jb250ZXh0LWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxXQUFXLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRzFDO0lBMENFLDhCQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQVBwQyxjQUFTLEdBQUcsS0FBSyxDQUFDOztRQUdoQixlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbkQsVUFBSyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlDLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUVWLENBQUM7SUFqQ2hELHNCQUNJLCtDQUFhOzs7O1FBRGpCO1lBRUUsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQzdCLENBQUM7Ozs7O1FBQ0QsVUFBa0IsS0FBYTtZQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM5QixDQUFDOzs7T0FIQTtJQU1ELHNCQUNJLHlDQUFPOzs7O1FBRFg7WUFFRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdkIsQ0FBQzs7Ozs7UUFDRCxVQUFZLEtBQWM7WUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ25CLENBQUM7OztPQUpBO0lBT0Qsc0JBQ0ksMENBQVE7Ozs7UUFEWjtZQUVFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4QixDQUFDOzs7OztRQUNELFVBQWEsS0FBYztZQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDOzs7T0FIQTs7OztJQWFELHVDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDOzs7OztJQUVNLCtDQUFnQjs7OztJQUF2QixVQUF3QixLQUFLOztZQUN2QixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDO1FBQ3JDLE1BQU0sR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUNkLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUM3QzthQUFNO1lBQ0wsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQzFCO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7Ozs7SUFFTyx3Q0FBUzs7OztJQUFqQjs7WUFDUSxPQUFPLEdBQVEsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFOztZQUVqQyxRQUFRLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDOztZQUN6QixHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7UUFFOUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUNqQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ3RCLEdBQUcsRUFBRSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUM7U0FDbEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0JBdkVGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QiwraUNBQTRDOztpQkFFN0M7Ozs7Z0JBVFEsV0FBVzs7O2dDQWNqQixLQUFLOzBCQVNMLEtBQUs7MkJBVUwsS0FBSzs2QkFVTCxNQUFNO3dCQUNOLE1BQU07eUJBQ04sTUFBTTs7SUFnQ1QsMkJBQUM7Q0FBQSxBQXhFRCxJQXdFQztTQW5FWSxvQkFBb0I7OztJQUMvQixvQ0FBdUI7O0lBQ3ZCLHNDQUFzQjs7Ozs7SUFTdEIsOENBQStCOzs7OztJQVUvQix3Q0FBMEI7Ozs7O0lBUzFCLHlDQUEwQjs7SUFHMUIsMENBQTZEOztJQUM3RCxxQ0FBd0Q7O0lBQ3hELHNDQUF5RDs7Ozs7SUFFN0MsMkNBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgT2JqZWN0VXRpbHMgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tICcuLi9zaGFyZWQvY29udGV4dC5pbnRlcmZhY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tY29udGV4dC1mb3JtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY29udGV4dC1mb3JtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9jb250ZXh0LWZvcm0uY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29udGV4dEZvcm1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIHB1YmxpYyBmb3JtOiBGb3JtR3JvdXA7XHJcbiAgcHVibGljIHByZWZpeDogc3RyaW5nO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBidG5TdWJtaXRUZXh0KCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fYnRuU3VibWl0VGV4dDtcclxuICB9XHJcbiAgc2V0IGJ0blN1Ym1pdFRleHQodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5fYnRuU3VibWl0VGV4dCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9idG5TdWJtaXRUZXh0OiBzdHJpbmc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGNvbnRleHQoKTogQ29udGV4dCB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcclxuICB9XHJcbiAgc2V0IGNvbnRleHQodmFsdWU6IENvbnRleHQpIHtcclxuICAgIHRoaXMuX2NvbnRleHQgPSB2YWx1ZTtcclxuICAgIHRoaXMuYnVpbGRGb3JtKCk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2NvbnRleHQ6IENvbnRleHQ7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xyXG4gIH1cclxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2Rpc2FibGVkID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gIC8vIFRPRE86IHJlcGxhY2UgYW55IGJ5IENvbnRleHRPcHRpb25zIG9yIENvbnRleHRcclxuICBAT3V0cHV0KCkgc3VibWl0Rm9ybTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGNsb25lOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgZGVsZXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIpIHt9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5idWlsZEZvcm0oKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoYW5kbGVGb3JtU3VibWl0KHZhbHVlKSB7XHJcbiAgICBsZXQgaW5wdXRzID0gT2JqZWN0LmFzc2lnbih7fSwgdmFsdWUpO1xyXG4gICAgaW5wdXRzID0gT2JqZWN0VXRpbHMucmVtb3ZlTnVsbChpbnB1dHMpO1xyXG4gICAgaW5wdXRzLnVyaSA9IGlucHV0cy51cmkucmVwbGFjZSgnICcsICcnKTtcclxuICAgIGlmIChpbnB1dHMudXJpKSB7XHJcbiAgICAgIGlucHV0cy51cmkgPSB0aGlzLnByZWZpeCArICctJyArIGlucHV0cy51cmk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpbnB1dHMudXJpID0gdGhpcy5wcmVmaXg7XHJcbiAgICB9XHJcbiAgICB0aGlzLnN1Ym1pdEZvcm0uZW1pdChpbnB1dHMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBidWlsZEZvcm0oKTogdm9pZCB7XHJcbiAgICBjb25zdCBjb250ZXh0OiBhbnkgPSB0aGlzLmNvbnRleHQgfHwge307XHJcblxyXG4gICAgY29uc3QgdXJpU3BsaXQgPSBjb250ZXh0LnVyaS5zcGxpdCgnLScpO1xyXG4gICAgdGhpcy5wcmVmaXggPSB1cmlTcGxpdC5zaGlmdCgpO1xyXG4gICAgY29uc3QgdXJpID0gdXJpU3BsaXQuam9pbignLScpO1xyXG5cclxuICAgIHRoaXMuZm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICB0aXRsZTogW2NvbnRleHQudGl0bGVdLFxyXG4gICAgICB1cmk6IFt1cmkgfHwgJyAnXVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==