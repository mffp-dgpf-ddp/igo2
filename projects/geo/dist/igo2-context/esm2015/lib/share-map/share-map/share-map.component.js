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
export class ShareMapComponent {
    /**
     * @param {?} config
     * @param {?} languageService
     * @param {?} messageService
     * @param {?} auth
     * @param {?} shareMapService
     * @param {?} formBuilder
     * @param {?} cdRef
     */
    constructor(config, languageService, messageService, auth, shareMapService, formBuilder, cdRef) {
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
    ngOnInit() {
        this.auth.authenticate$.subscribe((/**
         * @param {?} auth
         * @return {?}
         */
        auth => {
            /** @type {?} */
            const decodeToken = this.auth.decodeToken();
            this.userId = decodeToken.user ? decodeToken.user.id : undefined;
            this.url = undefined;
            this.buildForm();
        }));
        this.mapState$$ = this.map.viewController.state$.subscribe((/**
         * @param {?} c
         * @return {?}
         */
        c => {
            if (!this.hasApi) {
                this.resetUrl();
                this.cdRef.detectChanges();
            }
        }));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (!this.hasApi) {
            this.resetUrl();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.mapState$$.unsubscribe();
    }
    /**
     * @param {?=} values
     * @return {?}
     */
    resetUrl(values = {}) {
        /** @type {?} */
        const inputs = Object.assign({}, values);
        inputs.uri = this.userId ? `${this.userId}-${values.uri}` : values.uri;
        this.url = this.shareMapService.getUrl(this.map, inputs, this.publicShareOption);
    }
    /**
     * @param {?} textArea
     * @return {?}
     */
    copyTextToClipboard(textArea) {
        /** @type {?} */
        const successful = Clipboard.copy(textArea);
        if (successful) {
            /** @type {?} */
            const translate = this.languageService.translate;
            /** @type {?} */
            const title = translate.instant('igo.context.shareMap.dialog.copyTitle');
            /** @type {?} */
            const msg = translate.instant('igo.context.shareMap.dialog.copyMsg');
            this.messageService.success(msg, title);
        }
    }
    /**
     * @private
     * @return {?}
     */
    buildForm() {
        /** @type {?} */
        const id = uuid();
        /** @type {?} */
        let title = 'Partage ';
        title += this.userId ? `(${this.userId}-${id})` : `(${id})`;
        this.form = this.formBuilder.group({
            title: [title],
            uri: [id]
        });
    }
}
ShareMapComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-share-map',
                template: "<form class=\"igo-form\" [formGroup]=\"form\"\r\n  (ngSubmit)=\"resetUrl(form.value)\">\r\n\r\n  <div *ngIf=\"hasApi\" class=\"igo-input-container\">\r\n    <mat-form-field>\r\n      <input matInput required\r\n             [placeholder]=\"'igo.context.contextManager.form.title' | translate\"\r\n             formControlName=\"title\">\r\n     <mat-error>\r\n      {{ 'igo.context.contextManager.form.titleRequired' | translate }}\r\n     </mat-error>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div *ngIf=\"hasApi\" id=\"uriInput\" class=\"igo-input-container\">\r\n    <mat-form-field>\r\n      <span *ngIf=\"userId\" class=\"prefix\">{{userId}}-</span>\r\n      <span class=\"fieldWrapper\">\r\n        <input matInput required\r\n             [readonly]=\"!userId\"\r\n             [placeholder]=\"'igo.context.contextManager.form.uri' | translate\"\r\n             formControlName=\"uri\">\r\n       </span>\r\n     <mat-error>\r\n      {{ 'igo.context.contextManager.form.uriRequired' | translate }}\r\n     </mat-error>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div *ngIf=\"hasApi\" class=\"igo-form-button-group\">\r\n    <button\r\n      mat-raised-button\r\n      type=\"submit\"\r\n      [disabled]=\"!form.valid\">\r\n      {{ 'igo.context.shareMap.button' | translate }}\r\n    </button>\r\n  </div>\r\n\r\n</form>\r\n\r\n<div *ngIf=\"url\" class=\"igo-input-container linkToShare\">\r\n  <mat-form-field>\r\n    <textarea #textArea matInput readonly rows=\"1\"\r\n      [ngClass]=\"{'textAreaWithButton': hasApi}\"\r\n      [placeholder]=\"'igo.context.shareMap.placeholderLink' | translate\"\r\n      [value]=\"url\"></textarea>\r\n    <button *ngIf=\"hasApi\"\r\n      mat-icon-button\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.context.shareMap.copy' | translate\"\r\n      color=\"primary\"\r\n      (click)=\"copyTextToClipboard(textArea)\">\r\n      <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n    </button>\r\n  </mat-form-field>\r\n\r\n  <div *ngIf=\"!hasApi\" class=\"igo-form-button-group\">\r\n    <button\r\n      mat-raised-button\r\n      (click)=\"copyTextToClipboard(textArea)\">\r\n      <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n      {{ 'igo.context.shareMap.copy' | translate }}\r\n    </button>\r\n  </div>\r\n  <div *ngIf=\"!hasApi\">\r\n    <br/>\r\n    <section class=\"mat-typography\">\r\n        <h4>{{'igo.context.shareMap.included' | translate}}</h4>\r\n        <ul>\r\n          <li>{{'igo.context.shareMap.context' | translate}}</li>\r\n          <li>{{'igo.context.shareMap.center' | translate}}</li>\r\n          <li>{{'igo.context.shareMap.zoom' | translate}}</li>\r\n          <li>{{'igo.context.shareMap.addedLayers' | translate}}</li>\r\n          <li>{{'igo.context.shareMap.visibleInvisible' | translate}}</li>\r\n        </ul>\r\n\r\n      <h4>{{'igo.context.shareMap.excluded' | translate}}</h4>\r\n      <ul>\r\n        <li>{{'igo.context.shareMap.order' | translate}}</li>\r\n        <li>{{'igo.context.shareMap.opacity' | translate}}</li>\r\n        <li>{{'igo.context.shareMap.filterOgc' | translate}}</li>\r\n        <li>{{'igo.context.shareMap.filterTime' | translate}}</li>\r\n      </ul>\r\n    </section>\r\n  </div>\r\n\r\n</div>\r\n",
                styles: ["@charset \"UTF-8\";mat-form-field{width:100%}#uriInput .fieldWrapper{display:block;overflow:hidden}#uriInput .prefix{float:left}.linkToShare{padding:25px 5px 5px}.linkToShare textarea{resize:none;width:100%;line-height:1.3;height:40px;overflow-y:hidden;word-wrap:normal;word-break:break-all}.linkToShare textarea.textAreaWithButton{width:calc(100% - 60px)}.linkToShare mat-form-field>button{float:right;margin:-10px 0}.igo-form{padding:20px 5px 5px}.igo-form-button-group{text-align:center;padding-top:10px}"]
            }] }
];
/** @nocollapse */
ShareMapComponent.ctorParameters = () => [
    { type: ConfigService },
    { type: LanguageService },
    { type: MessageService },
    { type: AuthService },
    { type: ShareMapService },
    { type: FormBuilder },
    { type: ChangeDetectorRef }
];
ShareMapComponent.propDecorators = {
    map: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtbWFwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvc2hhcmUtbWFwL3NoYXJlLW1hcC9zaGFyZS1tYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxLQUFLLEVBQVUsaUJBQWlCLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUFFLFdBQVcsRUFBYSxNQUFNLGdCQUFnQixDQUFDO0FBRXhELE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM1RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFbkMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBUTlELE1BQU0sT0FBTyxpQkFBaUI7Ozs7Ozs7Ozs7SUFhNUIsWUFDVSxNQUFxQixFQUNyQixlQUFnQyxFQUNoQyxjQUE4QixFQUM5QixJQUFpQixFQUNqQixlQUFnQyxFQUNoQyxXQUF3QixFQUN4QixLQUF3QjtRQU54QixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3JCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUNqQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFiM0IsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUVmLHNCQUFpQixHQUFHO1lBQ3pCLGlCQUFpQixFQUFFLEVBQUUsV0FBVyxFQUFFLEVB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RUFBRSxDQUFDO1NBQ1YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBakZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsMnRHQUF5Qzs7YUFFMUM7Ozs7WUFYUSxhQUFhO1lBQWtCLGVBQWU7WUFBL0IsY0FBYztZQUM3QixXQUFXO1lBR1gsZUFBZTtZQVBmLFdBQVc7WUFEOEIsaUJBQWlCOzs7a0JBb0JoRSxLQUFLOzs7O0lBSE4saUNBQXVCOzs7OztJQUN2Qix1Q0FBaUM7O0lBRWpDLGdDQUFxQjs7SUFFckIsZ0NBQW1COztJQUNuQixtQ0FBc0I7O0lBQ3RCLG1DQUFjOztJQUNkLDhDQUVFOzs7OztJQUdBLG1DQUE2Qjs7Ozs7SUFDN0IsNENBQXdDOzs7OztJQUN4QywyQ0FBc0M7Ozs7O0lBQ3RDLGlDQUF5Qjs7Ozs7SUFDekIsNENBQXdDOzs7OztJQUN4Qyx3Q0FBZ0M7Ozs7O0lBQ2hDLGtDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgdXVpZCwgQ2xpcGJvYXJkIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlLCBNZXNzYWdlU2VydmljZSwgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvYXV0aCc7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJ0BpZ28yL2dlbyc7XHJcblxyXG5pbXBvcnQgeyBTaGFyZU1hcFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2hhcmUtbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXNoYXJlLW1hcCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NoYXJlLW1hcC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc2hhcmUtbWFwLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFNoYXJlTWFwQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIHB1YmxpYyBmb3JtOiBGb3JtR3JvdXA7XHJcbiAgcHJpdmF0ZSBtYXBTdGF0ZSQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIEBJbnB1dCgpIG1hcDogSWdvTWFwO1xyXG5cclxuICBwdWJsaWMgdXJsOiBzdHJpbmc7XHJcbiAgcHVibGljIGhhc0FwaSA9IGZhbHNlO1xyXG4gIHB1YmxpYyB1c2VySWQ7XHJcbiAgcHVibGljIHB1YmxpY1NoYXJlT3B0aW9uID0ge1xyXG4gICAgbGF5ZXJsaXN0Q29udHJvbHM6IHsgcXVlcnlzdHJpbmc6ICcnIH1cclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSxcclxuICAgIHByaXZhdGUgc2hhcmVNYXBTZXJ2aWNlOiBTaGFyZU1hcFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcixcclxuICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgKSB7XHJcbiAgICB0aGlzLmhhc0FwaSA9IHRoaXMuY29uZmlnLmdldENvbmZpZygnY29udGV4dC51cmwnKSA/IHRydWUgOiBmYWxzZTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5hdXRoLmF1dGhlbnRpY2F0ZSQuc3Vic2NyaWJlKGF1dGggPT4ge1xyXG4gICAgICBjb25zdCBkZWNvZGVUb2tlbiA9IHRoaXMuYXV0aC5kZWNvZGVUb2tlbigpO1xyXG4gICAgICB0aGlzLnVzZXJJZCA9IGRlY29kZVRva2VuLnVzZXIgPyBkZWNvZGVUb2tlbi51c2VyLmlkIDogdW5kZWZpbmVkO1xyXG4gICAgICB0aGlzLnVybCA9IHVuZGVmaW5lZDtcclxuICAgICAgdGhpcy5idWlsZEZvcm0oKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5tYXBTdGF0ZSQkID0gdGhpcy5tYXAudmlld0NvbnRyb2xsZXIuc3RhdGUkLnN1YnNjcmliZShjID0+IHtcclxuICAgICAgaWYgKCF0aGlzLmhhc0FwaSkge1xyXG4gICAgICAgIHRoaXMucmVzZXRVcmwoKTtcclxuICAgICAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuaGFzQXBpKSB7XHJcbiAgICAgIHRoaXMucmVzZXRVcmwoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5tYXBTdGF0ZSQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICByZXNldFVybCh2YWx1ZXM6IGFueSA9IHt9KSB7XHJcbiAgICBjb25zdCBpbnB1dHMgPSBPYmplY3QuYXNzaWduKHt9LCB2YWx1ZXMpO1xyXG4gICAgaW5wdXRzLnVyaSA9IHRoaXMudXNlcklkID8gYCR7dGhpcy51c2VySWR9LSR7dmFsdWVzLnVyaX1gIDogdmFsdWVzLnVyaTtcclxuICAgIHRoaXMudXJsID0gdGhpcy5zaGFyZU1hcFNlcnZpY2UuZ2V0VXJsKHRoaXMubWFwLCBpbnB1dHMsIHRoaXMucHVibGljU2hhcmVPcHRpb24pO1xyXG4gIH1cclxuXHJcbiAgY29weVRleHRUb0NsaXBib2FyZCh0ZXh0QXJlYSkge1xyXG4gICAgY29uc3Qgc3VjY2Vzc2Z1bCA9IENsaXBib2FyZC5jb3B5KHRleHRBcmVhKTtcclxuICAgIGlmIChzdWNjZXNzZnVsKSB7XHJcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmNvbnRleHQuc2hhcmVNYXAuZGlhbG9nLmNvcHlUaXRsZSdcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgbXNnID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5jb250ZXh0LnNoYXJlTWFwLmRpYWxvZy5jb3B5TXNnJyk7XHJcbiAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2Uuc3VjY2Vzcyhtc2csIHRpdGxlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYnVpbGRGb3JtKCk6IHZvaWQge1xyXG4gICAgY29uc3QgaWQgPSB1dWlkKCk7XHJcbiAgICBsZXQgdGl0bGUgPSAnUGFydGFnZSAnO1xyXG4gICAgdGl0bGUgKz0gdGhpcy51c2VySWQgPyBgKCR7dGhpcy51c2VySWR9LSR7aWR9KWAgOiBgKCR7aWR9KWA7XHJcbiAgICB0aGlzLmZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcclxuICAgICAgdGl0bGU6IFt0aXRsZV0sXHJcbiAgICAgIHVyaTogW2lkXVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==