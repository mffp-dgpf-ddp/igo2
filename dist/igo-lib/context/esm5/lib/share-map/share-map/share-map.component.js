/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { uuid, Clipboard } from '@igo2/utils';
import { ConfigService, MessageService, LanguageService } from '@igo2/core';
import { AuthService } from '@igo2/auth';
import { IgoMap, LayerListService } from '@igo2/geo';
import { ShareMapService } from '../shared/share-map.service';
var ShareMapComponent = /** @class */ (function () {
    function ShareMapComponent(config, languageService, messageService, auth, shareMapService, formBuilder, layerListService) {
        this.config = config;
        this.languageService = languageService;
        this.messageService = messageService;
        this.auth = auth;
        this.shareMapService = shareMapService;
        this.formBuilder = formBuilder;
        this.layerListService = layerListService;
        this._hasShareMapButton = true;
        this._hasCopyLinkButton = false;
        this.hasApi = false;
        this.publicShareOption = {
            layerlistControls: { querystring: '' }
        };
        this.hasApi = this.config.getConfig('context.url') ? true : false;
    }
    Object.defineProperty(ShareMapComponent.prototype, "map", {
        get: /**
         * @return {?}
         */
        function () {
            return this._map;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._map = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShareMapComponent.prototype, "hasShareMapButton", {
        get: /**
         * @return {?}
         */
        function () {
            return this._hasShareMapButton;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._hasShareMapButton = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShareMapComponent.prototype, "hasCopyLinkButton", {
        get: /**
         * @return {?}
         */
        function () {
            return this._hasCopyLinkButton;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._hasCopyLinkButton = value;
        },
        enumerable: true,
        configurable: true
    });
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
    ShareMapComponent.prototype.hasLayerListControls = /**
     * @return {?}
     */
    function () {
        if (this.layerListService.keyword || this.layerListService.sortedAlpha ||
            this.layerListService.onlyVisible || this.layerListService.onlyInRange) {
            this.publicShareOption.layerlistControls.querystring = '';
            if (this.layerListService.keyword) {
                this.publicShareOption.layerlistControls.querystring += '&llck=' + this.layerListService.keyword;
            }
            if (this.layerListService.sortedAlpha) {
                this.publicShareOption.layerlistControls.querystring += '&llca=1';
            }
            if (this.layerListService.onlyVisible) {
                this.publicShareOption.layerlistControls.querystring += '&llcv=1';
            }
            if (this.layerListService.onlyInRange) {
                this.publicShareOption.layerlistControls.querystring += '&llcr=1';
            }
            return true;
        }
        return false;
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
        this.hasLayerListControls();
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
                    template: "<form class=\"igo-form\" [formGroup]=\"form\"\r\n  (ngSubmit)=\"resetUrl(form.value)\">\r\n\r\n  <div *ngIf=\"hasApi\" class=\"igo-input-container\">\r\n    <mat-form-field>\r\n      <input matInput required\r\n             [placeholder]=\"'igo.context.contextManager.form.title' | translate\"\r\n             formControlName=\"title\">\r\n     <mat-error>\r\n      {{ 'igo.context.contextManager.form.titleRequired' | translate }}\r\n     </mat-error>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div *ngIf=\"hasApi\" id=\"uriInput\" class=\"igo-input-container\">\r\n    <mat-form-field>\r\n      <span *ngIf=\"userId\" class=\"prefix\">{{userId}}-</span>\r\n      <span class=\"fieldWrapper\">\r\n        <input matInput required\r\n             [readonly]=\"!userId\"\r\n             [placeholder]=\"'igo.context.contextManager.form.uri' | translate\"\r\n             formControlName=\"uri\">\r\n       </span>\r\n     <mat-error>\r\n      {{ 'igo.context.contextManager.form.uriRequired' | translate }}\r\n     </mat-error>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div *ngIf=\"hasShareMapButton\" class=\"igo-form-button-group\">\r\n    <button\r\n      mat-raised-button\r\n      type=\"submit\"\r\n      [disabled]=\"!form.valid\">\r\n      {{ 'igo.context.shareMap.button' | translate }}\r\n    </button>\r\n  </div>\r\n\r\n</form>\r\n\r\n<div *ngIf=\"url\" class=\"igo-input-container linkToShare\">\r\n  <mat-form-field>\r\n    <textarea #textArea matInput readonly rows=\"1\"\r\n      [placeholder]=\"'igo.context.shareMap.placeholderLink' | translate\"\r\n      [value]=\"url\"></textarea>\r\n    <button\r\n      mat-icon-button\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.context.shareMap.copy' | translate\"\r\n      color=\"primary\"\r\n      (click)=\"copyTextToClipboard(textArea)\">\r\n      <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n    </button>\r\n  </mat-form-field>\r\n\r\n  <div *ngIf=\"hasCopyLinkButton\" class=\"igo-form-button-group\">\r\n    <button\r\n      mat-raised-button\r\n      (click)=\"copyTextToClipboard(textArea)\">\r\n      <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n      {{ 'igo.context.shareMap.copy' | translate }}\r\n    </button>\r\n  </div>\r\n\r\n</div>\r\n",
                    styles: ["@charset \"UTF-8\";mat-form-field{width:100%}#uriInput .fieldWrapper{display:block;overflow:hidden}#uriInput .prefix{float:left}.linkToShare{padding:25px 5px 5px}.linkToShare textarea{resize:none;width:calc(100% - 60px);line-height:1.3;height:40px;overflow-y:hidden;word-wrap:normal;word-break:break-all}.linkToShare mat-form-field>button{float:right;margin:-10px 0}.igo-form{padding:20px 5px 5px}.igo-form-button-group{text-align:center;padding-top:10px}"]
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
        { type: LayerListService }
    ]; };
    ShareMapComponent.propDecorators = {
        map: [{ type: Input }],
        hasShareMapButton: [{ type: Input }],
        hasCopyLinkButton: [{ type: Input }]
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
    ShareMapComponent.prototype._map;
    /**
     * @type {?}
     * @private
     */
    ShareMapComponent.prototype._hasShareMapButton;
    /**
     * @type {?}
     * @private
     */
    ShareMapComponent.prototype._hasCopyLinkButton;
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
    ShareMapComponent.prototype.layerListService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtbWFwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvc2hhcmUtbWFwL3NoYXJlLW1hcC9zaGFyZS1tYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFFLFdBQVcsRUFBYSxNQUFNLGdCQUFnQixDQUFDO0FBRXhELE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM1RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFckQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTlEO0lBMENFLDJCQUNVLE1BQXFCLEVBQ3JCLGVBQWdDLEVBQ2hDLGNBQThCLEVBQzlCLElBQWlCLEVBQ2pCLGVBQWdDLEVBQ2hDLFdBQXdCLEVBQ3hCLGdCQUFrQztRQU5sQyxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3JCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUNqQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQXpCcEMsdUJBQWtCLEdBQUcsSUFBSSxDQUFDO1FBUzFCLHVCQUFrQixHQUFHLEtBQUssQ0FBQztRQUc1QixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRWYsc0JBQWlCLEdB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TUFBRyxDQUFDO1FBQzVELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDakMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ2QsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO1NBQ1YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0JBckhGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsOHZFQUF5Qzs7aUJBRTFDOzs7O2dCQVZRLGFBQWE7Z0JBQWtCLGVBQWU7Z0JBQS9CLGNBQWM7Z0JBQzdCLFdBQVc7Z0JBR1gsZUFBZTtnQkFQZixXQUFXO2dCQUtILGdCQUFnQjs7O3NCQVk5QixLQUFLO29DQVNMLEtBQUs7b0NBU0wsS0FBSzs7SUE0RlIsd0JBQUM7Q0FBQSxBQXRIRCxJQXNIQztTQWpIWSxpQkFBaUI7OztJQUM1QixpQ0FBdUI7Ozs7O0lBU3ZCLGlDQUFxQjs7Ozs7SUFTckIsK0NBQWtDOzs7OztJQVNsQywrQ0FBbUM7O0lBRW5DLGdDQUFtQjs7SUFDbkIsbUNBQXNCOztJQUN0QixtQ0FBYzs7SUFDZCw4Q0FFRTs7Ozs7SUFHQSxtQ0FBNkI7Ozs7O0lBQzdCLDRDQUF3Qzs7Ozs7SUFDeEMsMkNBQXNDOzs7OztJQUN0QyxpQ0FBeUI7Ozs7O0lBQ3pCLDRDQUF3Qzs7Ozs7SUFDeEMsd0NBQWdDOzs7OztJQUNoQyw2Q0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IHV1aWQsIENsaXBib2FyZCB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSwgTWVzc2FnZVNlcnZpY2UsIExhbmd1YWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJ0BpZ28yL2F1dGgnO1xyXG5pbXBvcnQgeyBJZ29NYXAsIExheWVyTGlzdFNlcnZpY2UgfSBmcm9tICdAaWdvMi9nZW8nO1xyXG5cclxuaW1wb3J0IHsgU2hhcmVNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NoYXJlLW1hcC5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXNoYXJlLW1hcCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NoYXJlLW1hcC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc2hhcmUtbWFwLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFNoYXJlTWFwQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0IHtcclxuICBwdWJsaWMgZm9ybTogRm9ybUdyb3VwO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBtYXAoKTogSWdvTWFwIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXA7XHJcbiAgfVxyXG4gIHNldCBtYXAodmFsdWU6IElnb01hcCkge1xyXG4gICAgdGhpcy5fbWFwID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX21hcDogSWdvTWFwO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBoYXNTaGFyZU1hcEJ1dHRvbigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9oYXNTaGFyZU1hcEJ1dHRvbjtcclxuICB9XHJcbiAgc2V0IGhhc1NoYXJlTWFwQnV0dG9uKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9oYXNTaGFyZU1hcEJ1dHRvbiA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9oYXNTaGFyZU1hcEJ1dHRvbiA9IHRydWU7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGhhc0NvcHlMaW5rQnV0dG9uKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2hhc0NvcHlMaW5rQnV0dG9uO1xyXG4gIH1cclxuICBzZXQgaGFzQ29weUxpbmtCdXR0b24odmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2hhc0NvcHlMaW5rQnV0dG9uID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2hhc0NvcHlMaW5rQnV0dG9uID0gZmFsc2U7XHJcblxyXG4gIHB1YmxpYyB1cmw6IHN0cmluZztcclxuICBwdWJsaWMgaGFzQXBpID0gZmFsc2U7XHJcbiAgcHVibGljIHVzZXJJZDtcclxuICBwdWJsaWMgcHVibGljU2hhcmVPcHRpb24gPSB7XHJcbiAgICBsYXllcmxpc3RDb250cm9sczogeyBxdWVyeXN0cmluZzogJycgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGF1dGg6IEF1dGhTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzaGFyZU1hcFNlcnZpY2U6IFNoYXJlTWFwU2VydmljZSxcclxuICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxyXG4gICAgcHJpdmF0ZSBsYXllckxpc3RTZXJ2aWNlOiBMYXllckxpc3RTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLmhhc0FwaSA9IHRoaXMuY29uZmlnLmdldENvbmZpZygnY29udGV4dC51cmwnKSA/IHRydWUgOiBmYWxzZTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5hdXRoLmF1dGhlbnRpY2F0ZSQuc3Vic2NyaWJlKGF1dGggPT4ge1xyXG4gICAgICBjb25zdCBkZWNvZGVUb2tlbiA9IHRoaXMuYXV0aC5kZWNvZGVUb2tlbigpO1xyXG4gICAgICB0aGlzLnVzZXJJZCA9IGRlY29kZVRva2VuLnVzZXIgPyBkZWNvZGVUb2tlbi51c2VyLmlkIDogdW5kZWZpbmVkO1xyXG4gICAgICB0aGlzLnVybCA9IHVuZGVmaW5lZDtcclxuICAgICAgdGhpcy5idWlsZEZvcm0oKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmhhc0FwaSkge1xyXG4gICAgICB0aGlzLnJlc2V0VXJsKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGFzTGF5ZXJMaXN0Q29udHJvbHMoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5sYXllckxpc3RTZXJ2aWNlLmtleXdvcmQgfHwgdGhpcy5sYXllckxpc3RTZXJ2aWNlLnNvcnRlZEFscGhhICB8fFxyXG4gICAgICB0aGlzLmxheWVyTGlzdFNlcnZpY2Uub25seVZpc2libGUgfHwgdGhpcy5sYXllckxpc3RTZXJ2aWNlLm9ubHlJblJhbmdlICkge1xyXG4gICAgICAgIHRoaXMucHVibGljU2hhcmVPcHRpb24ubGF5ZXJsaXN0Q29udHJvbHMucXVlcnlzdHJpbmcgPSAnJztcclxuICAgICAgICBpZiAodGhpcy5sYXllckxpc3RTZXJ2aWNlLmtleXdvcmQpIHtcclxuICAgICAgICAgIHRoaXMucHVibGljU2hhcmVPcHRpb24ubGF5ZXJsaXN0Q29udHJvbHMucXVlcnlzdHJpbmcgKz0gJyZsbGNrPScgKyB0aGlzLmxheWVyTGlzdFNlcnZpY2Uua2V5d29yZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubGF5ZXJMaXN0U2VydmljZS5zb3J0ZWRBbHBoYSkge1xyXG4gICAgICAgICAgdGhpcy5wdWJsaWNTaGFyZU9wdGlvbi5sYXllcmxpc3RDb250cm9scy5xdWVyeXN0cmluZyArPSAnJmxsY2E9MSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmxheWVyTGlzdFNlcnZpY2Uub25seVZpc2libGUpIHtcclxuICAgICAgICAgIHRoaXMucHVibGljU2hhcmVPcHRpb24ubGF5ZXJsaXN0Q29udHJvbHMucXVlcnlzdHJpbmcgKz0gJyZsbGN2PTEnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5sYXllckxpc3RTZXJ2aWNlLm9ubHlJblJhbmdlKSB7XHJcbiAgICAgICAgICB0aGlzLnB1YmxpY1NoYXJlT3B0aW9uLmxheWVybGlzdENvbnRyb2xzLnF1ZXJ5c3RyaW5nICs9ICcmbGxjcj0xJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZXNldFVybCh2YWx1ZXM6IGFueSA9IHt9KSB7XHJcbiAgICB0aGlzLmhhc0xheWVyTGlzdENvbnRyb2xzKCk7XHJcbiAgICBjb25zdCBpbnB1dHMgPSBPYmplY3QuYXNzaWduKHt9LCB2YWx1ZXMpO1xyXG4gICAgaW5wdXRzLnVyaSA9IHRoaXMudXNlcklkID8gYCR7dGhpcy51c2VySWR9LSR7dmFsdWVzLnVyaX1gIDogdmFsdWVzLnVyaTtcclxuICAgIHRoaXMudXJsID0gdGhpcy5zaGFyZU1hcFNlcnZpY2UuZ2V0VXJsKHRoaXMubWFwLCBpbnB1dHMsIHRoaXMucHVibGljU2hhcmVPcHRpb24pO1xyXG4gIH1cclxuXHJcbiAgY29weVRleHRUb0NsaXBib2FyZCh0ZXh0QXJlYSkge1xyXG4gICAgY29uc3Qgc3VjY2Vzc2Z1bCA9IENsaXBib2FyZC5jb3B5KHRleHRBcmVhKTtcclxuICAgIGlmIChzdWNjZXNzZnVsKSB7XHJcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmNvbnRleHQuc2hhcmVNYXAuZGlhbG9nLmNvcHlUaXRsZSdcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgbXNnID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5jb250ZXh0LnNoYXJlTWFwLmRpYWxvZy5jb3B5TXNnJyk7XHJcbiAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2Uuc3VjY2Vzcyhtc2csIHRpdGxlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYnVpbGRGb3JtKCk6IHZvaWQge1xyXG4gICAgY29uc3QgaWQgPSB1dWlkKCk7XHJcbiAgICBsZXQgdGl0bGUgPSAnUGFydGFnZSAnO1xyXG4gICAgdGl0bGUgKz0gdGhpcy51c2VySWQgPyBgKCR7dGhpcy51c2VySWR9LSR7aWR9KWAgOiBgKCR7aWR9KWA7XHJcbiAgICB0aGlzLmZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcclxuICAgICAgdGl0bGU6IFt0aXRsZV0sXHJcbiAgICAgIHVyaTogW2lkXVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==