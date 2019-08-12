/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ChangeDetectionStrategy, ApplicationRef, Output, EventEmitter } from '@angular/core';
import { ConfigService } from '@igo2/core';
import { AuthService } from '../shared/auth.service';
var AuthFacebookComponent = /** @class */ (function () {
    function AuthFacebookComponent(authService, config, appRef) {
        this.authService = authService;
        this.config = config;
        this.appRef = appRef;
        this.login = new EventEmitter();
        this.options = this.config.getConfig('auth.facebook') || {};
        if (this.options.apiKey) {
            this.loadSDKFacebook();
        }
    }
    /**
     * @private
     * @return {?}
     */
    AuthFacebookComponent.prototype.subscribeEvents = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        ((/** @type {?} */ (window))).FB.Event.subscribe('auth.statusChange', (/**
         * @param {?} rep
         * @return {?}
         */
        function (rep) {
            _this.statusChangeCallback(rep);
        }));
    };
    /**
     * @private
     * @param {?} response
     * @return {?}
     */
    AuthFacebookComponent.prototype.statusChangeCallback = /**
     * @private
     * @param {?} response
     * @return {?}
     */
    function (response) {
        if (response.status === 'connected') {
            /** @type {?} */
            var accessToken = response.authResponse.accessToken;
            this.loginFacebook(accessToken);
        }
    };
    /**
     * @private
     * @param {?} token
     * @return {?}
     */
    AuthFacebookComponent.prototype.loginFacebook = /**
     * @private
     * @param {?} token
     * @return {?}
     */
    function (token) {
        var _this = this;
        this.authService.loginWithToken(token, 'facebook').subscribe((/**
         * @return {?}
         */
        function () {
            _this.appRef.tick();
            _this.login.emit(true);
        }));
    };
    /**
     * @private
     * @return {?}
     */
    AuthFacebookComponent.prototype.loadSDKFacebook = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (document.getElementById('facebook-jssdk')) {
            return;
        }
        /** @type {?} */
        var urlSDK = 'https://connect.facebook.net/fr_CA/sdk.js#xfbml=1&version=v2.9';
        /** @type {?} */
        var fjs = document.getElementsByTagName('script')[0];
        /** @type {?} */
        var js = document.createElement('script');
        js.id = 'facebook-jssdk';
        js.src = urlSDK + "&appId=" + this.options.apiKey;
        js.onload = (/**
         * @return {?}
         */
        function () {
            _this.subscribeEvents();
        });
        fjs.parentNode.insertBefore(js, fjs);
    };
    AuthFacebookComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-auth-facebook',
                    template: "<div scope=\"public_profile,email\"\r\n     class=\"fb-login-button\" data-max-rows=\"1\" data-size=\"large\"\r\n     data-button-type=\"continue_with\" data-show-faces=\"false\"\r\n     data-auto-logout-link=\"false\" data-use-continue-as=\"false\">\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".fb-login-button{padding:10px 0}"]
                }] }
    ];
    /** @nocollapse */
    AuthFacebookComponent.ctorParameters = function () { return [
        { type: AuthService },
        { type: ConfigService },
        { type: ApplicationRef }
    ]; };
    AuthFacebookComponent.propDecorators = {
        login: [{ type: Output }]
    };
    return AuthFacebookComponent;
}());
export { AuthFacebookComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    AuthFacebookComponent.prototype.options;
    /** @type {?} */
    AuthFacebookComponent.prototype.login;
    /**
     * @type {?}
     * @private
     */
    AuthFacebookComponent.prototype.authService;
    /**
     * @type {?}
     * @private
     */
    AuthFacebookComponent.prototype.config;
    /**
     * @type {?}
     * @private
     */
    AuthFacebookComponent.prototype.appRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1mYWNlYm9vay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9hdXRoLyIsInNvdXJjZXMiOlsibGliL2F1dGgtZm9ybS9hdXRoLWZhY2Vib29rLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsY0FBYyxFQUNkLE1BQU0sRUFDTixZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUUzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFckQ7SUFXRSwrQkFDVSxXQUF3QixFQUN4QixNQUFxQixFQUNyQixNQUFzQjtRQUZ0QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBTHRCLFVBQUssR0FBMEIsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQU9uRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUU1RCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUN4QjtJQUNILENBQUM7Ozs7O0lBRU8sK0NBQWU7Ozs7SUFBdkI7UUFBQSxpQkFJQztRQUhDLENBQUMsbUJBQUEsTUFBTSxFQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxtQkFBbUI7Ozs7UUFBRSxVQUFBLEdBQUc7WUFDekQsS0FBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBRU8sb0RBQW9COzs7OztJQUE1QixVQUE2QixRQUFRO1FBQ25DLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxXQUFXLEVBQUU7O2dCQUM3QixXQUFXLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxXQUFXO1lBQ3JELElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDakM7SUFDSCxDQUFDOzs7Ozs7SUFFTyw2Q0FBYTs7Ozs7SUFBckIsVUFBc0IsS0FBSztRQUEzQixpQkFLQztRQUpDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQyxTQUFTOzs7UUFBQztZQUMzRCxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ25CLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFTywrQ0FBZTs7OztJQUF2QjtRQUFBLGlCQWdCQztRQWZDLElBQUksUUFBUSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQzdDLE9BQU87U0FDUjs7WUFFSyxNQUFNLEdBQ1YsZ0VBQWdFOztZQUU1RCxHQUFHLEdBQUcsUUFBUSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFDaEQsRUFBRSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO1FBQzNDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsZ0JBQWdCLENBQUM7UUFDekIsRUFBRSxDQUFDLEdBQUcsR0FBTSxNQUFNLGVBQVUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFRLENBQUM7UUFDbEQsRUFBRSxDQUFDLE1BQU07OztRQUFHO1lBQ1YsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQSxDQUFDO1FBQ0YsR0FBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7O2dCQTNERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0Isb1JBQTZDO29CQUU3QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQVBRLFdBQVc7Z0JBRlgsYUFBYTtnQkFMcEIsY0FBYzs7O3dCQWtCYixNQUFNOztJQW1EVCw0QkFBQztDQUFBLEFBNURELElBNERDO1NBdERZLHFCQUFxQjs7Ozs7O0lBQ2hDLHdDQUFxQzs7SUFFckMsc0NBQXFFOzs7OztJQUduRSw0Q0FBZ0M7Ozs7O0lBQ2hDLHVDQUE2Qjs7Ozs7SUFDN0IsdUNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQXBwbGljYXRpb25SZWYsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBBdXRoRmFjZWJvb2tPcHRpb25zIH0gZnJvbSAnLi4vc2hhcmVkL2F1dGguaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvYXV0aC5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWF1dGgtZmFjZWJvb2snLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hdXRoLWZhY2Vib29rLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hdXRoLWZhY2Vib29rLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEF1dGhGYWNlYm9va0NvbXBvbmVudCB7XHJcbiAgcHJpdmF0ZSBvcHRpb25zOiBBdXRoRmFjZWJvb2tPcHRpb25zO1xyXG5cclxuICBAT3V0cHV0KCkgbG9naW46IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmXHJcbiAgKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmNvbmZpZy5nZXRDb25maWcoJ2F1dGguZmFjZWJvb2snKSB8fCB7fTtcclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmFwaUtleSkge1xyXG4gICAgICB0aGlzLmxvYWRTREtGYWNlYm9vaygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdWJzY3JpYmVFdmVudHMoKSB7XHJcbiAgICAod2luZG93IGFzIGFueSkuRkIuRXZlbnQuc3Vic2NyaWJlKCdhdXRoLnN0YXR1c0NoYW5nZScsIHJlcCA9PiB7XHJcbiAgICAgIHRoaXMuc3RhdHVzQ2hhbmdlQ2FsbGJhY2socmVwKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdGF0dXNDaGFuZ2VDYWxsYmFjayhyZXNwb25zZSkge1xyXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gJ2Nvbm5lY3RlZCcpIHtcclxuICAgICAgY29uc3QgYWNjZXNzVG9rZW4gPSByZXNwb25zZS5hdXRoUmVzcG9uc2UuYWNjZXNzVG9rZW47XHJcbiAgICAgIHRoaXMubG9naW5GYWNlYm9vayhhY2Nlc3NUb2tlbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGxvZ2luRmFjZWJvb2sodG9rZW4pIHtcclxuICAgIHRoaXMuYXV0aFNlcnZpY2UubG9naW5XaXRoVG9rZW4odG9rZW4sICdmYWNlYm9vaycpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuYXBwUmVmLnRpY2soKTtcclxuICAgICAgdGhpcy5sb2dpbi5lbWl0KHRydWUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGxvYWRTREtGYWNlYm9vaygpIHtcclxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmFjZWJvb2stanNzZGsnKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXJsU0RLID1cclxuICAgICAgJ2h0dHBzOi8vY29ubmVjdC5mYWNlYm9vay5uZXQvZnJfQ0Evc2RrLmpzI3hmYm1sPTEmdmVyc2lvbj12Mi45JztcclxuXHJcbiAgICBjb25zdCBmanMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XHJcbiAgICBjb25zdCBqcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAganMuaWQgPSAnZmFjZWJvb2stanNzZGsnO1xyXG4gICAganMuc3JjID0gYCR7dXJsU0RLfSZhcHBJZD0ke3RoaXMub3B0aW9ucy5hcGlLZXl9YDtcclxuICAgIGpzLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgdGhpcy5zdWJzY3JpYmVFdmVudHMoKTtcclxuICAgIH07XHJcbiAgICBmanMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoanMsIGZqcyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==