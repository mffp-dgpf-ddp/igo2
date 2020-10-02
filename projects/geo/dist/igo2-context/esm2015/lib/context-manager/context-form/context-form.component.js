/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ObjectUtils, Clipboard } from '@igo2/utils';
import { MessageService, LanguageService } from '@igo2/core';
export class ContextFormComponent {
    /**
     * @param {?} formBuilder
     * @param {?} languageService
     * @param {?} messageService
     */
    constructor(formBuilder, languageService, messageService) {
        this.formBuilder = formBuilder;
        this.languageService = languageService;
        this.messageService = messageService;
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
     * @return {?}
     */
    copyTextToClipboard() {
        /** @type {?} */
        const text = this.prefix + '-' + this.form.value.uri.replace(' ', '');
        /** @type {?} */
        const successful = Clipboard.copy(text);
        if (successful) {
            /** @type {?} */
            const translate = this.languageService.translate;
            /** @type {?} */
            const title = translate.instant('igo.context.contextManager.dialog.copyTitle');
            /** @type {?} */
            const msg = translate.instant('igo.context.contextManager.dialog.copyMsg');
            this.messageService.success(msg, title);
        }
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
                template: "<form class=\"igo-form\" [formGroup]=\"form\"\r\n  (ngSubmit)=\"handleFormSubmit(form.value)\">\r\n\r\n  <mat-form-field class=\"full-width\">\r\n    <input matInput required\r\n           maxlength=\"128\"\r\n           [placeholder]=\"'igo.context.contextManager.form.title' | translate\"\r\n           formControlName=\"title\">\r\n   <mat-error>\r\n    {{ 'igo.context.contextManager.form.titleRequired' | translate }}\r\n   </mat-error>\r\n  </mat-form-field>\r\n\r\n  <mat-form-field id=\"uriInput\" class=\"full-width\">\r\n    <span *ngIf=\"prefix\" class=\"prefix\">{{prefix}}-</span>\r\n    <span class=\"fieldWrapper\">\r\n      <input matInput\r\n           maxlength=\"64\"\r\n           floatLabel = \"always\"\r\n           [placeholder]=\"'igo.context.contextManager.form.uri' | translate\"\r\n           formControlName=\"uri\">\r\n    </span>\r\n  </mat-form-field>\r\n\r\n  <button\r\n    id=\"copyButton\"\r\n    type=\"button\"\r\n    mat-icon-button\r\n    tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"'igo.context.contextManager.form.copy' | translate\"\r\n    color=\"primary\"\r\n    (click)=\"copyTextToClipboard()\">\r\n    <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n  </button>\r\n\r\n  <div class=\"igo-form-button-group\">\r\n    <button\r\n      mat-raised-button\r\n      type=\"submit\"\r\n      [disabled]=\"!form.valid || disabled\">\r\n      {{ 'igo.context.contextManager.form.edit' | translate }}\r\n    </button>\r\n  </div>\r\n\r\n</form>\r\n",
                styles: ["form{margin:10px}.full-width{width:100%}#uriInput .fieldWrapper{display:block;overflow:hidden}#uriInput .prefix{float:left}#copyButton{width:24px;float:right;position:relative;top:-58px;left:5px}"]
            }] }
];
/** @nocollapse */
ContextFormComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: LanguageService },
    { type: MessageService }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tYW5hZ2VyL2NvbnRleHQtZm9ybS9jb250ZXh0LWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxXQUFXLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQVE3RCxNQUFNLE9BQU8sb0JBQW9COzs7Ozs7SUFxQy9CLFlBQ1UsV0FBd0IsRUFDeEIsZUFBZ0MsRUFDaEMsY0FBOEI7UUFGOUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVZoQyxjQUFTLEdBQUcsS0FBSyxDQUFDOztRQUdoQixlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbkQsVUFBSyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlDLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQU10RCxDQUFDOzs7O0lBckNKLElBQ0ksYUFBYTtRQUNmLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUM3QixDQUFDOzs7OztJQUNELElBQUksYUFBYSxDQUFDLEtBQWE7UUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDOUIsQ0FBQzs7OztJQUdELElBQ0ksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDOzs7OztJ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QUF3RDs7SUFDeEQsc0NBQXlEOzs7OztJQUd2RCwyQ0FBZ0M7Ozs7O0lBQ2hDLCtDQUF3Qzs7Ozs7SUFDeEMsOENBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgT2JqZWN0VXRpbHMsIENsaXBib2FyZCB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UsIExhbmd1YWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSAnLi4vc2hhcmVkL2NvbnRleHQuaW50ZXJmYWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWNvbnRleHQtZm9ybScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbnRleHQtZm9ybS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vY29udGV4dC1mb3JtLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIENvbnRleHRGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBwdWJsaWMgZm9ybTogRm9ybUdyb3VwO1xyXG4gIHB1YmxpYyBwcmVmaXg6IHN0cmluZztcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgYnRuU3VibWl0VGV4dCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2J0blN1Ym1pdFRleHQ7XHJcbiAgfVxyXG4gIHNldCBidG5TdWJtaXRUZXh0KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2J0blN1Ym1pdFRleHQgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfYnRuU3VibWl0VGV4dDogc3RyaW5nO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBjb250ZXh0KCk6IENvbnRleHQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQ7XHJcbiAgfVxyXG4gIHNldCBjb250ZXh0KHZhbHVlOiBDb250ZXh0KSB7XHJcbiAgICB0aGlzLl9jb250ZXh0ID0gdmFsdWU7XHJcbiAgICB0aGlzLmJ1aWxkRm9ybSgpO1xyXG4gIH1cclxuICBwcml2YXRlIF9jb250ZXh0OiBDb250ZXh0O1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcclxuICB9XHJcbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9kaXNhYmxlZCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICAvLyBUT0RPOiByZXBsYWNlIGFueSBieSBDb250ZXh0T3B0aW9ucyBvciBDb250ZXh0XHJcbiAgQE91dHB1dCgpIHN1Ym1pdEZvcm06IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBjbG9uZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGRlbGV0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXHJcbiAgICBwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5idWlsZEZvcm0oKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoYW5kbGVGb3JtU3VibWl0KHZhbHVlKSB7XHJcbiAgICBsZXQgaW5wdXRzID0gT2JqZWN0LmFzc2lnbih7fSwgdmFsdWUpO1xyXG4gICAgaW5wdXRzID0gT2JqZWN0VXRpbHMucmVtb3ZlTnVsbChpbnB1dHMpO1xyXG4gICAgaW5wdXRzLnVyaSA9IGlucHV0cy51cmkucmVwbGFjZSgnICcsICcnKTtcclxuICAgIGlmIChpbnB1dHMudXJpKSB7XHJcbiAgICAgIGlucHV0cy51cmkgPSB0aGlzLnByZWZpeCArICctJyArIGlucHV0cy51cmk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpbnB1dHMudXJpID0gdGhpcy5wcmVmaXg7XHJcbiAgICB9XHJcbiAgICB0aGlzLnN1Ym1pdEZvcm0uZW1pdChpbnB1dHMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNvcHlUZXh0VG9DbGlwYm9hcmQoKSB7XHJcbiAgICBjb25zdCB0ZXh0ID0gdGhpcy5wcmVmaXggKyAnLScgKyB0aGlzLmZvcm0udmFsdWUudXJpLnJlcGxhY2UoJyAnLCAnJyk7XHJcbiAgICBjb25zdCBzdWNjZXNzZnVsID0gQ2xpcGJvYXJkLmNvcHkodGV4dCk7XHJcbiAgICBpZiAoc3VjY2Vzc2Z1bCkge1xyXG4gICAgICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgICAgIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgJ2lnby5jb250ZXh0LmNvbnRleHRNYW5hZ2VyLmRpYWxvZy5jb3B5VGl0bGUnXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IG1zZyA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5kaWFsb2cuY29weU1zZydcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5zdWNjZXNzKG1zZywgdGl0bGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBidWlsZEZvcm0oKTogdm9pZCB7XHJcbiAgICBjb25zdCBjb250ZXh0OiBhbnkgPSB0aGlzLmNvbnRleHQgfHwge307XHJcblxyXG4gICAgY29uc3QgdXJpU3BsaXQgPSBjb250ZXh0LnVyaS5zcGxpdCgnLScpO1xyXG4gICAgdGhpcy5wcmVmaXggPSB1cmlTcGxpdC5zaGlmdCgpO1xyXG4gICAgY29uc3QgdXJpID0gdXJpU3BsaXQuam9pbignLScpO1xyXG5cclxuICAgIHRoaXMuZm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICB0aXRsZTogW2NvbnRleHQudGl0bGVdLFxyXG4gICAgICB1cmk6IFt1cmkgfHwgJyAnXVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==