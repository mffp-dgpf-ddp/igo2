/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ChangeDetectionStrategy, ApplicationRef, Output, EventEmitter } from '@angular/core';
import { ConfigService } from '@igo2/core';
import { AuthService } from '../shared/auth.service';
export class AuthFacebookComponent {
    /**
     * @param {?} authService
     * @param {?} config
     * @param {?} appRef
     */
    constructor(authService, config, appRef) {
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
    subscribeEvents() {
        ((/** @type {?} */ (window))).FB.Event.subscribe('auth.statusChange', (/**
         * @param {?} rep
         * @return {?}
         */
        rep => {
            this.statusChangeCallback(rep);
        }));
    }
    /**
     * @private
     * @param {?} response
     * @return {?}
     */
    statusChangeCallback(response) {
        if (response.status === 'connected') {
            /** @type {?} */
            const accessToken = response.authResponse.accessToken;
            this.loginFacebook(accessToken);
        }
    }
    /**
     * @private
     * @param {?} token
     * @return {?}
     */
    loginFacebook(token) {
        this.authService.loginWithToken(token, 'facebook').subscribe((/**
         * @return {?}
         */
        () => {
            this.appRef.tick();
            this.login.emit(true);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    loadSDKFacebook() {
        if (document.getElementById('facebook-jssdk')) {
            return;
        }
        /** @type {?} */
        const urlSDK = 'https://connect.facebook.net/fr_CA/sdk.js#xfbml=1&version=v2.9';
        /** @type {?} */
        const fjs = document.getElementsByTagName('script')[0];
        /** @type {?} */
        const js = document.createElement('script');
        js.id = 'facebook-jssdk';
        js.src = `${urlSDK}&appId=${this.options.apiKey}`;
        js.onload = (/**
         * @return {?}
         */
        () => {
            this.subscribeEvents();
        });
        fjs.parentNode.insertBefore(js, fjs);
    }
}
AuthFacebookComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-auth-facebook',
                template: "<div scope=\"public_profile,email\"\r\n     class=\"fb-login-button\" data-max-rows=\"1\" data-size=\"large\"\r\n     data-button-type=\"continue_with\" data-show-faces=\"false\"\r\n     data-auto-logout-link=\"false\" data-use-continue-as=\"false\">\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".fb-login-button{padding:10px 0}"]
            }] }
];
/** @nocollapse */
AuthFacebookComponent.ctorParameters = () => [
    { type: AuthService },
    { type: ConfigService },
    { type: ApplicationRef }
];
AuthFacebookComponent.propDecorators = {
    login: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1mYWNlYm9vay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9hdXRoLyIsInNvdXJjZXMiOlsibGliL2F1dGgtZm9ybS9hdXRoLWZhY2Vib29rLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsY0FBYyxFQUNkLE1BQU0sRUFDTixZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUUzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFRckQsTUFBTSxPQUFPLHFCQUFxQjs7Ozs7O0lBS2hDLFlBQ1UsV0FBd0IsRUFDeEIsTUFBcUIsRUFDckIsTUFBc0I7UUFGdEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUNyQixXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUx0QixVQUFLLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7UUFPbkUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFNUQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUN2QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDeEI7SUFDSCxDQUFDOzs7OztJQUVPLGVBQWU7UUFDckIsQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLG1CQUFtQjs7OztRQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQzVELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQyxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7OztJQUVPLG9CQUFvQixDQUFDLFFBQVE7UUFDbkMsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLFdBQVcsRUFBRTs7a0JBQzdCLFdBQVcsR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLFdBQVc7WUFDckQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNqQztJQUNILENBQUM7Ozs7OztJQUVPLGFBQWEsQ0FBQyxLQUFLO1FBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQyxTQUFTOzs7UUFBQyxHQUFHLEVBQUU7WUFDaEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRU8sZUFBZTtRQUNyQixJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtZQUM3QyxPQUFPO1NBQ1I7O2NBRUssTUFBTSxHQUNWLGdFQUFnRTs7Y0FFNUQsR0FBRyxHQUFHLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7O2NBQ2hELEVBQUUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztRQUMzQyxFQUFFLENBQUMsRUFBRSxHQUFHLGdCQUFnQixDQUFDO1FBQ3pCLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxNQUFNLFVBQVUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsRCxFQUFFLENBQUMsTUFBTTs7O1FBQUcsR0FBRyxFQUFFO1lBQ2YsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQSxDQUFDO1FBQ0YsR0FBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7OztZQTNERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0Isb1JBQTZDO2dCQUU3QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs7WUFQUSxXQUFXO1lBRlgsYUFBYTtZQUxwQixjQUFjOzs7b0JBa0JiLE1BQU07Ozs7Ozs7SUFGUCx3Q0FBcUM7O0lBRXJDLHNDQUFxRTs7Ozs7SUFHbkUsNENBQWdDOzs7OztJQUNoQyx1Q0FBNkI7Ozs7O0lBQzdCLHVDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIEFwcGxpY2F0aW9uUmVmLFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgQXV0aEZhY2Vib29rT3B0aW9ucyB9IGZyb20gJy4uL3NoYXJlZC9hdXRoLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2F1dGguc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1hdXRoLWZhY2Vib29rJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXV0aC1mYWNlYm9vay5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYXV0aC1mYWNlYm9vay5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBdXRoRmFjZWJvb2tDb21wb25lbnQge1xyXG4gIHByaXZhdGUgb3B0aW9uczogQXV0aEZhY2Vib29rT3B0aW9ucztcclxuXHJcbiAgQE91dHB1dCgpIGxvZ2luOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSxcclxuICAgIHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZlxyXG4gICkge1xyXG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdhdXRoLmZhY2Vib29rJykgfHwge307XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hcGlLZXkpIHtcclxuICAgICAgdGhpcy5sb2FkU0RLRmFjZWJvb2soKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3Vic2NyaWJlRXZlbnRzKCkge1xyXG4gICAgKHdpbmRvdyBhcyBhbnkpLkZCLkV2ZW50LnN1YnNjcmliZSgnYXV0aC5zdGF0dXNDaGFuZ2UnLCByZXAgPT4ge1xyXG4gICAgICB0aGlzLnN0YXR1c0NoYW5nZUNhbGxiYWNrKHJlcCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhdHVzQ2hhbmdlQ2FsbGJhY2socmVzcG9uc2UpIHtcclxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09ICdjb25uZWN0ZWQnKSB7XHJcbiAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gcmVzcG9uc2UuYXV0aFJlc3BvbnNlLmFjY2Vzc1Rva2VuO1xyXG4gICAgICB0aGlzLmxvZ2luRmFjZWJvb2soYWNjZXNzVG9rZW4pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBsb2dpbkZhY2Vib29rKHRva2VuKSB7XHJcbiAgICB0aGlzLmF1dGhTZXJ2aWNlLmxvZ2luV2l0aFRva2VuKHRva2VuLCAnZmFjZWJvb2snKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLmFwcFJlZi50aWNrKCk7XHJcbiAgICAgIHRoaXMubG9naW4uZW1pdCh0cnVlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBsb2FkU0RLRmFjZWJvb2soKSB7XHJcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZhY2Vib29rLWpzc2RrJykpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHVybFNESyA9XHJcbiAgICAgICdodHRwczovL2Nvbm5lY3QuZmFjZWJvb2submV0L2ZyX0NBL3Nkay5qcyN4ZmJtbD0xJnZlcnNpb249djIuOSc7XHJcblxyXG4gICAgY29uc3QgZmpzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xyXG4gICAgY29uc3QganMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgIGpzLmlkID0gJ2ZhY2Vib29rLWpzc2RrJztcclxuICAgIGpzLnNyYyA9IGAke3VybFNES30mYXBwSWQ9JHt0aGlzLm9wdGlvbnMuYXBpS2V5fWA7XHJcbiAgICBqcy5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgIHRoaXMuc3Vic2NyaWJlRXZlbnRzKCk7XHJcbiAgICB9O1xyXG4gICAgZmpzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGpzLCBmanMpO1xyXG4gIH1cclxufVxyXG4iXX0=