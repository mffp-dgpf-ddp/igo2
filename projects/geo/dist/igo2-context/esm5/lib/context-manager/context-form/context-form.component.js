/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ObjectUtils, Clipboard } from '@igo2/utils';
import { MessageService, LanguageService } from '@igo2/core';
var ContextFormComponent = /** @class */ (function () {
    function ContextFormComponent(formBuilder, languageService, messageService) {
        this.formBuilder = formBuilder;
        this.languageService = languageService;
        this.messageService = messageService;
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
     * @return {?}
     */
    ContextFormComponent.prototype.copyTextToClipboard = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var text = this.prefix + '-' + this.form.value.uri.replace(' ', '');
        /** @type {?} */
        var successful = Clipboard.copy(text);
        if (successful) {
            /** @type {?} */
            var translate = this.languageService.translate;
            /** @type {?} */
            var title = translate.instant('igo.context.contextManager.dialog.copyTitle');
            /** @type {?} */
            var msg = translate.instant('igo.context.contextManager.dialog.copyMsg');
            this.messageService.success(msg, title);
        }
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
                    template: "<form class=\"igo-form\" [formGroup]=\"form\"\r\n  (ngSubmit)=\"handleFormSubmit(form.value)\">\r\n\r\n  <mat-form-field class=\"full-width\">\r\n    <input matInput required\r\n           maxlength=\"128\"\r\n           [placeholder]=\"'igo.context.contextManager.form.title' | translate\"\r\n           formControlName=\"title\">\r\n   <mat-error>\r\n    {{ 'igo.context.contextManager.form.titleRequired' | translate }}\r\n   </mat-error>\r\n  </mat-form-field>\r\n\r\n  <mat-form-field id=\"uriInput\" class=\"full-width\">\r\n    <span *ngIf=\"prefix\" class=\"prefix\">{{prefix}}-</span>\r\n    <span class=\"fieldWrapper\">\r\n      <input matInput\r\n           maxlength=\"64\"\r\n           floatLabel = \"always\"\r\n           [placeholder]=\"'igo.context.contextManager.form.uri' | translate\"\r\n           formControlName=\"uri\">\r\n    </span>\r\n  </mat-form-field>\r\n\r\n  <button\r\n    id=\"copyButton\"\r\n    type=\"button\"\r\n    mat-icon-button\r\n    tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"'igo.context.contextManager.form.copy' | translate\"\r\n    color=\"primary\"\r\n    (click)=\"copyTextToClipboard()\">\r\n    <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n  </button>\r\n\r\n  <div class=\"igo-form-button-group\">\r\n    <button\r\n      mat-raised-button\r\n      type=\"submit\"\r\n      [disabled]=\"!form.valid || disabled\">\r\n      {{ 'igo.context.contextManager.form.edit' | translate }}\r\n    </button>\r\n  </div>\r\n\r\n</form>\r\n",
                    styles: ["form{margin:10px}.full-width{width:100%}#uriInput .fieldWrapper{display:block;overflow:hidden}#uriInput .prefix{float:left}#copyButton{width:24px;float:right;position:relative;top:-58px;left:5px}"]
                }] }
    ];
    /** @nocollapse */
    ContextFormComponent.ctorParameters = function () { return [
        { type: FormBuilder },
        { type: LanguageService },
        { type: MessageService }
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
    /**
     * @type {?}
     * @private
     */
    ContextFormComponent.prototype.languageService;
    /**
     * @type {?}
     * @private
     */
    ContextFormComponent.prototype.messageService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tYW5hZ2VyL2NvbnRleHQtZm9ybS9jb250ZXh0LWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxXQUFXLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUc3RDtJQTBDRSw4QkFDVSxXQUF3QixFQUN4QixlQUFnQyxFQUNoQyxjQUE4QjtRQUY5QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBVmhDLGNBQVMsR0FBRyxLQUFLLENBQUM7O1FBR2hCLGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNuRCxVQUFLLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUMsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBTXRELENBQUM7SUFyQ0osc0JBQ0ksK0NBQWE7Ozs7UUFEakI7WUFFRSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDN0IsQ0FBQzs7Ozs7UUFDRCxVQUFrQixLQUFhO1lBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzlCLENBQUM7OztPQUhBO0lBTUQsc0JBQ0kseUNBQU87Ozs7UUFEWDtZQUVFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN2QixDQUFDOzs7OztRQUNELFVBQVks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Ozs7O0lBU3RCLDhDQUErQjs7Ozs7SUFVL0Isd0NBQTBCOzs7OztJQVMxQix5Q0FBMEI7O0lBRzFCLDBDQUE2RDs7SUFDN0QscUNBQXdEOztJQUN4RCxzQ0FBeUQ7Ozs7O0lBR3ZELDJDQUFnQzs7Ozs7SUFDaEMsK0NBQXdDOzs7OztJQUN4Qyw4Q0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBPYmplY3RVdGlscywgQ2xpcGJvYXJkIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSwgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tICcuLi9zaGFyZWQvY29udGV4dC5pbnRlcmZhY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tY29udGV4dC1mb3JtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY29udGV4dC1mb3JtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9jb250ZXh0LWZvcm0uY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29udGV4dEZvcm1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIHB1YmxpYyBmb3JtOiBGb3JtR3JvdXA7XHJcbiAgcHVibGljIHByZWZpeDogc3RyaW5nO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBidG5TdWJtaXRUZXh0KCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fYnRuU3VibWl0VGV4dDtcclxuICB9XHJcbiAgc2V0IGJ0blN1Ym1pdFRleHQodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5fYnRuU3VibWl0VGV4dCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9idG5TdWJtaXRUZXh0OiBzdHJpbmc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGNvbnRleHQoKTogQ29udGV4dCB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcclxuICB9XHJcbiAgc2V0IGNvbnRleHQodmFsdWU6IENvbnRleHQpIHtcclxuICAgIHRoaXMuX2NvbnRleHQgPSB2YWx1ZTtcclxuICAgIHRoaXMuYnVpbGRGb3JtKCk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2NvbnRleHQ6IENvbnRleHQ7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xyXG4gIH1cclxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2Rpc2FibGVkID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gIC8vIFRPRE86IHJlcGxhY2UgYW55IGJ5IENvbnRleHRPcHRpb25zIG9yIENvbnRleHRcclxuICBAT3V0cHV0KCkgc3VibWl0Rm9ybTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGNsb25lOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgZGVsZXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcixcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmJ1aWxkRm9ybSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGhhbmRsZUZvcm1TdWJtaXQodmFsdWUpIHtcclxuICAgIGxldCBpbnB1dHMgPSBPYmplY3QuYXNzaWduKHt9LCB2YWx1ZSk7XHJcbiAgICBpbnB1dHMgPSBPYmplY3RVdGlscy5yZW1vdmVOdWxsKGlucHV0cyk7XHJcbiAgICBpbnB1dHMudXJpID0gaW5wdXRzLnVyaS5yZXBsYWNlKCcgJywgJycpO1xyXG4gICAgaWYgKGlucHV0cy51cmkpIHtcclxuICAgICAgaW5wdXRzLnVyaSA9IHRoaXMucHJlZml4ICsgJy0nICsgaW5wdXRzLnVyaTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlucHV0cy51cmkgPSB0aGlzLnByZWZpeDtcclxuICAgIH1cclxuICAgIHRoaXMuc3VibWl0Rm9ybS5lbWl0KGlucHV0cyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY29weVRleHRUb0NsaXBib2FyZCgpIHtcclxuICAgIGNvbnN0IHRleHQgPSB0aGlzLnByZWZpeCArICctJyArIHRoaXMuZm9ybS52YWx1ZS51cmkucmVwbGFjZSgnICcsICcnKTtcclxuICAgIGNvbnN0IHN1Y2Nlc3NmdWwgPSBDbGlwYm9hcmQuY29weSh0ZXh0KTtcclxuICAgIGlmIChzdWNjZXNzZnVsKSB7XHJcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmNvbnRleHQuY29udGV4dE1hbmFnZXIuZGlhbG9nLmNvcHlUaXRsZSdcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgbXNnID0gdHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgJ2lnby5jb250ZXh0LmNvbnRleHRNYW5hZ2VyLmRpYWxvZy5jb3B5TXNnJ1xyXG4gICAgICApO1xyXG4gICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnN1Y2Nlc3MobXNnLCB0aXRsZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGJ1aWxkRm9ybSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNvbnRleHQ6IGFueSA9IHRoaXMuY29udGV4dCB8fCB7fTtcclxuXHJcbiAgICBjb25zdCB1cmlTcGxpdCA9IGNvbnRleHQudXJpLnNwbGl0KCctJyk7XHJcbiAgICB0aGlzLnByZWZpeCA9IHVyaVNwbGl0LnNoaWZ0KCk7XHJcbiAgICBjb25zdCB1cmkgPSB1cmlTcGxpdC5qb2luKCctJyk7XHJcblxyXG4gICAgdGhpcy5mb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XHJcbiAgICAgIHRpdGxlOiBbY29udGV4dC50aXRsZV0sXHJcbiAgICAgIHVyaTogW3VyaSB8fCAnICddXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19