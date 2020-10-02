/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { uuid, Clipboard } from '@igo2/utils';
import { ConfigService, MessageService, LanguageService } from '@igo2/core';
import { AuthService } from '@igo2/auth';
import { IgoMap } from '@igo2/geo';
import { ShareMapService } from '../shared/share-map.service';
var ShareMapComponent = /** @class */ (function () {
    function ShareMapComponent(config, languageService, messageService, auth, shareMapService, formBuilder, cdRef) {
        this.config = config;
        this.languageService = languageService;
        this.messageService = messageService;
        this.auth = auth;
        this.shareMapService = shareMapService;
        this.formBuilder = formBuilder;
        this.cdRef = cdRef;
        this.hasApi = false;
        this.publicShareOption = {
            layerlistControls: { querystring: '' }
        };
        this.hasApi = this.config.getConfig('context.url') ? true : false;
    }
    /**
     * @return {?}
     */
    ShareMapComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.auth.authenticate$.subscribe((/**
         * @param {?} auth
         * @return {?}
         */
        function (auth) {
            /** @type {?} */
            var decodeToken = _this.auth.decodeToken();
            _this.userId = decodeToken.user ? decodeToken.user.id : undefined;
            _this.url = undefined;
            _this.buildForm();
        }));
        this.mapState$$ = this.map.viewController.state$.subscribe((/**
         * @param {?} c
         * @return {?}
         */
        function (c) {
            if (!_this.hasApi) {
                _this.resetUrl();
                _this.cdRef.detectChanges();
            }
        }));
    };
    /**
     * @return {?}
     */
    ShareMapComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (!this.hasApi) {
            this.resetUrl();
        }
    };
    /**
     * @return {?}
     */
    ShareMapComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.mapState$$.unsubscribe();
    };
    /**
     * @param {?=} values
     * @return {?}
     */
    ShareMapComponent.prototype.resetUrl = /**
     * @param {?=} values
     * @return {?}
     */
    function (values) {
        if (values === void 0) { values = {}; }
        /** @type {?} */
        var inputs = Object.assign({}, values);
        inputs.uri = this.userId ? this.userId + "-" + values.uri : values.uri;
        this.url = this.shareMapService.getUrl(this.map, inputs, this.publicShareOption);
    };
    /**
     * @param {?} textArea
     * @return {?}
     */
    ShareMapComponent.prototype.copyTextToClipboard = /**
     * @param {?} textArea
     * @return {?}
     */
    function (textArea) {
        /** @type {?} */
        var successful = Clipboard.copy(textArea);
        if (successful) {
            /** @type {?} */
            var translate = this.languageService.translate;
            /** @type {?} */
            var title = translate.instant('igo.context.shareMap.dialog.copyTitle');
            /** @type {?} */
            var msg = translate.instant('igo.context.shareMap.dialog.copyMsg');
            this.messageService.success(msg, title);
        }
    };
    /**
     * @private
     * @return {?}
     */
    ShareMapComponent.prototype.buildForm = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var id = uuid();
        /** @type {?} */
        var title = 'Partage ';
        title += this.userId ? "(" + this.userId + "-" + id + ")" : "(" + id + ")";
        this.form = this.formBuilder.group({
            title: [title],
            uri: [id]
        });
    };
    ShareMapComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-share-map',
                    template: "<form class=\"igo-form\" [formGroup]=\"form\"\r\n  (ngSubmit)=\"resetUrl(form.value)\">\r\n\r\n  <div *ngIf=\"hasApi\" class=\"igo-input-container\">\r\n    <mat-form-field>\r\n      <input matInput required\r\n             [placeholder]=\"'igo.context.contextManager.form.title' | translate\"\r\n             formControlName=\"title\">\r\n     <mat-error>\r\n      {{ 'igo.context.contextManager.form.titleRequired' | translate }}\r\n     </mat-error>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div *ngIf=\"hasApi\" id=\"uriInput\" class=\"igo-input-container\">\r\n    <mat-form-field>\r\n      <span *ngIf=\"userId\" class=\"prefix\">{{userId}}-</span>\r\n      <span class=\"fieldWrapper\">\r\n        <input matInput required\r\n             [readonly]=\"!userId\"\r\n             [placeholder]=\"'igo.context.contextManager.form.uri' | translate\"\r\n             formControlName=\"uri\">\r\n       </span>\r\n     <mat-error>\r\n      {{ 'igo.context.contextManager.form.uriRequired' | translate }}\r\n     </mat-error>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div *ngIf=\"hasApi\" class=\"igo-form-button-group\">\r\n    <button\r\n      mat-raised-button\r\n      type=\"submit\"\r\n      [disabled]=\"!form.valid\">\r\n      {{ 'igo.context.shareMap.button' | translate }}\r\n    </button>\r\n  </div>\r\n\r\n</form>\r\n\r\n<div *ngIf=\"url\" class=\"igo-input-container linkToShare\">\r\n  <mat-form-field>\r\n    <textarea #textArea matInput readonly rows=\"1\"\r\n      [ngClass]=\"{'textAreaWithButton': hasApi}\"\r\n      [placeholder]=\"'igo.context.shareMap.placeholderLink' | translate\"\r\n      [value]=\"url\"></textarea>\r\n    <button *ngIf=\"hasApi\"\r\n      mat-icon-button\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.context.shareMap.copy' | translate\"\r\n      color=\"primary\"\r\n      (click)=\"copyTextToClipboard(textArea)\">\r\n      <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n    </button>\r\n  </mat-form-field>\r\n\r\n  <div *ngIf=\"!hasApi\" class=\"igo-form-button-group\">\r\n    <button\r\n      mat-raised-button\r\n      (click)=\"copyTextToClipboard(textArea)\">\r\n      <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n      {{ 'igo.context.shareMap.copy' | translate }}\r\n    </button>\r\n  </div>\r\n  <div *ngIf=\"!hasApi\">\r\n    <br/>\r\n    <section class=\"mat-typography\">\r\n        <h4>{{'igo.context.shareMap.included' | translate}}</h4>\r\n        <ul>\r\n          <li>{{'igo.context.shareMap.context' | translate}}</li>\r\n          <li>{{'igo.context.shareMap.center' | translate}}</li>\r\n          <li>{{'igo.context.shareMap.zoom' | translate}}</li>\r\n          <li>{{'igo.context.shareMap.addedLayers' | translate}}</li>\r\n          <li>{{'igo.context.shareMap.visibleInvisible' | translate}}</li>\r\n        </ul>\r\n\r\n      <h4>{{'igo.context.shareMap.excluded' | translate}}</h4>\r\n      <ul>\r\n        <li>{{'igo.context.shareMap.order' | translate}}</li>\r\n        <li>{{'igo.context.shareMap.opacity' | translate}}</li>\r\n        <li>{{'igo.context.shareMap.filterOgc' | translate}}</li>\r\n        <li>{{'igo.context.shareMap.filterTime' | translate}}</li>\r\n      </ul>\r\n    </section>\r\n  </div>\r\n\r\n</div>\r\n",
                    styles: ["@charset \"UTF-8\";mat-form-field{width:100%}#uriInput .fieldWrapper{display:block;overflow:hidden}#uriInput .prefix{float:left}.linkToShare{padding:25px 5px 5px}.linkToShare textarea{resize:none;width:100%;line-height:1.3;height:40px;overflow-y:hidden;word-wrap:normal;word-break:break-all}.linkToShare textarea.textAreaWithButton{width:calc(100% - 60px)}.linkToShare mat-form-field>button{float:right;margin:-10px 0}.igo-form{padding:20px 5px 5px}.igo-form-button-group{text-align:center;padding-top:10px}"]
                }] }
    ];
    /** @nocollapse */
    ShareMapComponent.ctorParameters = function () { return [
        { type: ConfigService },
        { type: LanguageService },
        { type: MessageService },
        { type: AuthService },
        { type: ShareMapService },
        { type: FormBuilder },
        { type: ChangeDetectorRef }
    ]; };
    ShareMapComponent.propDecorators = {
        map: [{ type: Input }]
    };
    return ShareMapComponent;
}());
export { ShareMapComponent };
if (false) {
    /** @type {?} */
    ShareMapComponent.prototype.form;
    /**
     * @type {?}
     * @private
     */
    ShareMapComponent.prototype.mapState$$;
    /** @type {?} */
    ShareMapComponent.prototype.map;
    /** @type {?} */
    ShareMapComponent.prototype.url;
    /** @type {?} */
    ShareMapComponent.prototype.hasApi;
    /** @type {?} */
    ShareMapComponent.prototype.userId;
    /** @type {?} */
    ShareMapComponent.prototype.publicShareOption;
    /**
     * @type {?}
     * @private
     */
    ShareMapComponent.prototype.config;
    /**
     * @type {?}
     * @private
     */
    ShareMapComponent.prototype.languageService;
    /**
     * @type {?}
     * @private
     */
    ShareMapComponent.prototype.messageService;
    /**
     * @type {?}
     * @private
     */
    ShareMapComponent.prototype.auth;
    /**
     * @type {?}
     * @private
     */
    ShareMapComponent.prototype.shareMapService;
    /**
     * @type {?}
     * @private
     */
    ShareMapComponent.prototype.formBuilder;
    /**
     * @type {?}
     * @private
     */
    ShareMapComponent.prototype.cdRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtbWFwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvc2hhcmUtbWFwL3NoYXJlLW1hcC9zaGFyZS1tYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxLQUFLLEVBQVUsaUJBQWlCLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUFFLFdBQVcsRUFBYSxNQUFNLGdCQUFnQixDQUFDO0FBRXhELE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM1RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFbkMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRzlEO0lBa0JFLDJCQUNVLE1BQXFCLEVBQ3JCLGVBQWdDLEVBQ2hDLGNBQThCLEVBQzlCLElBQWlCLEVBQ2pCLGVBQWdDLEVBQ2hDLFdBQXdCLEVBQ3hCLEtBQXdCO1FBTnhCLFdBQU0sR0FBTixNQUFNLENBQWU7UUFDckIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixTQUFJLEdBQUosSUFBSSxDQUFhO1FBQ2pCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQWIzQixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRWYsc0JBQWlCLEdBQUc7WUFDekIsaUJBQWlCLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFO1NBQ3ZDLENBQUM7UUFXQSxJ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QUUsQ0FBQyxLQUFLLENBQUM7WUFDZCxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7U0FDVixDQUFDLENBQUM7SUFDTCxDQUFDOztnQkFqRkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO29CQUN6QiwydEdBQXlDOztpQkFFMUM7Ozs7Z0JBWFEsYUFBYTtnQkFBa0IsZUFBZTtnQkFBL0IsY0FBYztnQkFDN0IsV0FBVztnQkFHWCxlQUFlO2dCQVBmLFdBQVc7Z0JBRDhCLGlCQUFpQjs7O3NCQW9CaEUsS0FBSzs7SUF5RVIsd0JBQUM7Q0FBQSxBQWxGRCxJQWtGQztTQTdFWSxpQkFBaUI7OztJQUM1QixpQ0FBdUI7Ozs7O0lBQ3ZCLHVDQUFpQzs7SUFFakMsZ0NBQXFCOztJQUVyQixnQ0FBbUI7O0lBQ25CLG1DQUFzQjs7SUFDdEIsbUNBQWM7O0lBQ2QsOENBRUU7Ozs7O0lBR0EsbUNBQTZCOzs7OztJQUM3Qiw0Q0FBd0M7Ozs7O0lBQ3hDLDJDQUFzQzs7Ozs7SUFDdEMsaUNBQXlCOzs7OztJQUN6Qiw0Q0FBd0M7Ozs7O0lBQ3hDLHdDQUFnQzs7Ozs7SUFDaEMsa0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBDaGFuZ2VEZXRlY3RvclJlZiwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyB1dWlkLCBDbGlwYm9hcmQgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UsIE1lc3NhZ2VTZXJ2aWNlLCBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICdAaWdvMi9hdXRoJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnQGlnbzIvZ2VvJztcclxuXHJcbmltcG9ydCB7IFNoYXJlTWFwU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zaGFyZS1tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tc2hhcmUtbWFwJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc2hhcmUtbWFwLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zaGFyZS1tYXAuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2hhcmVNYXBDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgcHVibGljIGZvcm06IEZvcm1Hcm91cDtcclxuICBwcml2YXRlIG1hcFN0YXRlJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgQElucHV0KCkgbWFwOiBJZ29NYXA7XHJcblxyXG4gIHB1YmxpYyB1cmw6IHN0cmluZztcclxuICBwdWJsaWMgaGFzQXBpID0gZmFsc2U7XHJcbiAgcHVibGljIHVzZXJJZDtcclxuICBwdWJsaWMgcHVibGljU2hhcmVPcHRpb24gPSB7XHJcbiAgICBsYXllcmxpc3RDb250cm9sczogeyBxdWVyeXN0cmluZzogJycgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGF1dGg6IEF1dGhTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzaGFyZU1hcFNlcnZpY2U6IFNoYXJlTWFwU2VydmljZSxcclxuICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxyXG4gICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcclxuICApIHtcclxuICAgIHRoaXMuaGFzQXBpID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdjb250ZXh0LnVybCcpID8gdHJ1ZSA6IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmF1dGguYXV0aGVudGljYXRlJC5zdWJzY3JpYmUoYXV0aCA9PiB7XHJcbiAgICAgIGNvbnN0IGRlY29kZVRva2VuID0gdGhpcy5hdXRoLmRlY29kZVRva2VuKCk7XHJcbiAgICAgIHRoaXMudXNlcklkID0gZGVjb2RlVG9rZW4udXNlciA/IGRlY29kZVRva2VuLnVzZXIuaWQgOiB1bmRlZmluZWQ7XHJcbiAgICAgIHRoaXMudXJsID0gdW5kZWZpbmVkO1xyXG4gICAgICB0aGlzLmJ1aWxkRm9ybSgpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLm1hcFN0YXRlJCQgPSB0aGlzLm1hcC52aWV3Q29udHJvbGxlci5zdGF0ZSQuc3Vic2NyaWJlKGMgPT4ge1xyXG4gICAgICBpZiAoIXRoaXMuaGFzQXBpKSB7XHJcbiAgICAgICAgdGhpcy5yZXNldFVybCgpO1xyXG4gICAgICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5oYXNBcGkpIHtcclxuICAgICAgdGhpcy5yZXNldFVybCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLm1hcFN0YXRlJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHJlc2V0VXJsKHZhbHVlczogYW55ID0ge30pIHtcclxuICAgIGNvbnN0IGlucHV0cyA9IE9iamVjdC5hc3NpZ24oe30sIHZhbHVlcyk7XHJcbiAgICBpbnB1dHMudXJpID0gdGhpcy51c2VySWQgPyBgJHt0aGlzLnVzZXJJZH0tJHt2YWx1ZXMudXJpfWAgOiB2YWx1ZXMudXJpO1xyXG4gICAgdGhpcy51cmwgPSB0aGlzLnNoYXJlTWFwU2VydmljZS5nZXRVcmwodGhpcy5tYXAsIGlucHV0cywgdGhpcy5wdWJsaWNTaGFyZU9wdGlvbik7XHJcbiAgfVxyXG5cclxuICBjb3B5VGV4dFRvQ2xpcGJvYXJkKHRleHRBcmVhKSB7XHJcbiAgICBjb25zdCBzdWNjZXNzZnVsID0gQ2xpcGJvYXJkLmNvcHkodGV4dEFyZWEpO1xyXG4gICAgaWYgKHN1Y2Nlc3NmdWwpIHtcclxuICAgICAgY29uc3QgdHJhbnNsYXRlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uY29udGV4dC5zaGFyZU1hcC5kaWFsb2cuY29weVRpdGxlJ1xyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBtc2cgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmNvbnRleHQuc2hhcmVNYXAuZGlhbG9nLmNvcHlNc2cnKTtcclxuICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5zdWNjZXNzKG1zZywgdGl0bGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBidWlsZEZvcm0oKTogdm9pZCB7XHJcbiAgICBjb25zdCBpZCA9IHV1aWQoKTtcclxuICAgIGxldCB0aXRsZSA9ICdQYXJ0YWdlICc7XHJcbiAgICB0aXRsZSArPSB0aGlzLnVzZXJJZCA/IGAoJHt0aGlzLnVzZXJJZH0tJHtpZH0pYCA6IGAoJHtpZH0pYDtcclxuICAgIHRoaXMuZm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICB0aXRsZTogW3RpdGxlXSxcclxuICAgICAgdXJpOiBbaWRdXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19