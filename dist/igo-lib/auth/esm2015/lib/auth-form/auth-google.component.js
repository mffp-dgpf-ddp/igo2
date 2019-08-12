/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ChangeDetectionStrategy, ApplicationRef, Output, EventEmitter } from '@angular/core';
import { ConfigService } from '@igo2/core';
import { AuthService } from '../shared/auth.service';
export class AuthGoogleComponent {
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
        this.options = this.config.getConfig('auth.google') || {};
        if (this.options.apiKey && this.options.clientId) {
            this.loadSDKGoogle();
            this.loadPlatform();
        }
    }
    /**
     * @return {?}
     */
    handleSignInClick() {
        ((/** @type {?} */ (window))).gapi.auth2.getAuthInstance().signIn();
    }
    /**
     * @return {?}
     */
    handleSignOutClick() {
        ((/** @type {?} */ (window))).gapi.auth2.getAuthInstance().signOut();
    }
    /**
     * @private
     * @return {?}
     */
    handleClientLoad() {
        ((/** @type {?} */ (window))).gapi.load('client:auth2', (/**
         * @return {?}
         */
        () => this.initClient()));
    }
    /**
     * @private
     * @return {?}
     */
    initClient() {
        ((/** @type {?} */ (window))).gapi.client
            .init({
            apiKey: this.options.apiKey,
            clientId: this.options.clientId,
            discoveryDocs: [
                'https://people.googleapis.com/$discovery/rest?version=v1'
            ],
            scope: 'profile'
        })
            .then((/**
         * @return {?}
         */
        () => {
            this.handleSignOutClick();
            ((/** @type {?} */ (window))).gapi.auth2.getAuthInstance().isSignedIn.listen((/**
             * @param {?} rep
             * @return {?}
             */
            rep => {
                this.updateSigninStatus(rep);
            }));
        }));
    }
    /**
     * @private
     * @param {?} isSignedIn
     * @return {?}
     */
    updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
            this.loginGoogle(((/** @type {?} */ (window))).gapi.client.getToken().access_token);
        }
    }
    /**
     * @private
     * @param {?} token
     * @return {?}
     */
    loginGoogle(token) {
        this.authService.loginWithToken(token, 'google').subscribe((/**
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
    loadSDKGoogle() {
        /** @type {?} */
        const fjs = document.getElementsByTagName('script')[0];
        /** @type {?} */
        const js = document.createElement('script');
        js.id = 'google-jssdk';
        js.src = 'https://apis.google.com/js/api.js';
        js.onload = (/**
         * @return {?}
         */
        () => {
            this.handleClientLoad();
        });
        fjs.parentNode.insertBefore(js, fjs);
    }
    /**
     * @private
     * @return {?}
     */
    loadPlatform() {
        /** @type {?} */
        const fjs = document.getElementsByTagName('script')[0];
        /** @type {?} */
        const js = document.createElement('script');
        js.id = 'google-platform';
        js.src = 'https://apis.google.com/js/platform.js';
        fjs.parentNode.insertBefore(js, fjs);
    }
}
AuthGoogleComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-auth-google',
                template: "<div class=\"g-signin2 google-login-button\" data-height=\"40\" data-width=\"265\" data-longtitle=\"true\">\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".google-login-button{padding:10px 0}"]
            }] }
];
/** @nocollapse */
AuthGoogleComponent.ctorParameters = () => [
    { type: AuthService },
    { type: ConfigService },
    { type: ApplicationRef }
];
AuthGoogleComponent.propDecorators = {
    login: [{ type: Output }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    AuthGoogleComponent.prototype.options;
    /** @type {?} */
    AuthGoogleComponent.prototype.login;
    /**
     * @type {?}
     * @private
     */
    AuthGoogleComponent.prototype.authService;
    /**
     * @type {?}
     * @private
     */
    AuthGoogleComponent.prototype.config;
    /**
     * @type {?}
     * @private
     */
    AuthGoogleComponent.prototype.appRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1nb29nbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvYXV0aC8iLCJzb3VyY2VzIjpbImxpYi9hdXRoLWZvcm0vYXV0aC1nb29nbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULHVCQUF1QixFQUN2QixjQUFjLEVBQ2QsTUFBTSxFQUNOLFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQVFyRCxNQUFNLE9BQU8sbUJBQW1COzs7Ozs7SUFLOUIsWUFDVSxXQUF3QixFQUN4QixNQUFxQixFQUNyQixNQUFzQjtRQUZ0QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBTHRCLFVBQUssR0FBMEIsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQU9uRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUUxRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO1lBQ2hELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDckI7SUFDSCxDQUFDOzs7O0lBRU0saUJBQWlCO1FBQ3RCLENBQUMsbUJBQUEsTUFBTSxFQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3hELENBQUM7Ozs7SUFFTSxrQkFBa0I7UUFDdkIsQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FB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ZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBUFEsV0FBVztZQUZYLGFBQWE7WUFMcEIsY0FBYzs7O29CQWtCYixNQUFNOzs7Ozs7O0lBRlAsc0NBQW1DOztJQUVuQyxvQ0FBcUU7Ozs7O0lBR25FLDBDQUFnQzs7Ozs7SUFDaEMscUNBQTZCOzs7OztJQUM3QixxQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBBcHBsaWNhdGlvblJlZixcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IEF1dGhHb29nbGVPcHRpb25zIH0gZnJvbSAnLi4vc2hhcmVkL2F1dGguaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvYXV0aC5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWF1dGgtZ29vZ2xlJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXV0aC1nb29nbGUuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2F1dGgtZ29vZ2xlLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEF1dGhHb29nbGVDb21wb25lbnQge1xyXG4gIHByaXZhdGUgb3B0aW9uczogQXV0aEdvb2dsZU9wdGlvbnM7XHJcblxyXG4gIEBPdXRwdXQoKSBsb2dpbjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWZcclxuICApIHtcclxuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMuY29uZmlnLmdldENvbmZpZygnYXV0aC5nb29nbGUnKSB8fCB7fTtcclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmFwaUtleSAmJiB0aGlzLm9wdGlvbnMuY2xpZW50SWQpIHtcclxuICAgICAgdGhpcy5sb2FkU0RLR29vZ2xlKCk7XHJcbiAgICAgIHRoaXMubG9hZFBsYXRmb3JtKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGFuZGxlU2lnbkluQ2xpY2soKSB7XHJcbiAgICAod2luZG93IGFzIGFueSkuZ2FwaS5hdXRoMi5nZXRBdXRoSW5zdGFuY2UoKS5zaWduSW4oKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoYW5kbGVTaWduT3V0Q2xpY2soKSB7XHJcbiAgICAod2luZG93IGFzIGFueSkuZ2FwaS5hdXRoMi5nZXRBdXRoSW5zdGFuY2UoKS5zaWduT3V0KCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUNsaWVudExvYWQoKSB7XHJcbiAgICAod2luZG93IGFzIGFueSkuZ2FwaS5sb2FkKCdjbGllbnQ6YXV0aDInLCAoKSA9PiB0aGlzLmluaXRDbGllbnQoKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRDbGllbnQoKSB7XHJcbiAgICAod2luZG93IGFzIGFueSkuZ2FwaS5jbGllbnRcclxuICAgICAgLmluaXQoe1xyXG4gICAgICAgIGFwaUtleTogdGhpcy5vcHRpb25zLmFwaUtleSxcclxuICAgICAgICBjbGllbnRJZDogdGhpcy5vcHRpb25zLmNsaWVudElkLFxyXG4gICAgICAgIGRpc2NvdmVyeURvY3M6IFtcclxuICAgICAgICAgICdodHRwczovL3Blb3BsZS5nb29nbGVhcGlzLmNvbS8kZGlzY292ZXJ5L3Jlc3Q/dmVyc2lvbj12MSdcclxuICAgICAgICBdLFxyXG4gICAgICAgIHNjb3BlOiAncHJvZmlsZSdcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlU2lnbk91dENsaWNrKCk7XHJcbiAgICAgICAgKHdpbmRvdyBhcyBhbnkpLmdhcGkuYXV0aDIuZ2V0QXV0aEluc3RhbmNlKCkuaXNTaWduZWRJbi5saXN0ZW4ocmVwID0+IHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlU2lnbmluU3RhdHVzKHJlcCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVTaWduaW5TdGF0dXMoaXNTaWduZWRJbikge1xyXG4gICAgaWYgKGlzU2lnbmVkSW4pIHtcclxuICAgICAgdGhpcy5sb2dpbkdvb2dsZSgod2luZG93IGFzIGFueSkuZ2FwaS5jbGllbnQuZ2V0VG9rZW4oKS5hY2Nlc3NfdG9rZW4pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBsb2dpbkdvb2dsZSh0b2tlbikge1xyXG4gICAgdGhpcy5hdXRoU2VydmljZS5sb2dpbldpdGhUb2tlbih0b2tlbiwgJ2dvb2dsZScpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuYXBwUmVmLnRpY2soKTtcclxuICAgICAgdGhpcy5sb2dpbi5lbWl0KHRydWUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGxvYWRTREtHb29nbGUoKSB7XHJcbiAgICBjb25zdCBmanMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XHJcbiAgICBjb25zdCBqcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAganMuaWQgPSAnZ29vZ2xlLWpzc2RrJztcclxuICAgIGpzLnNyYyA9ICdodHRwczovL2FwaXMuZ29vZ2xlLmNvbS9qcy9hcGkuanMnO1xyXG4gICAganMub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICB0aGlzLmhhbmRsZUNsaWVudExvYWQoKTtcclxuICAgIH07XHJcbiAgICBmanMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoanMsIGZqcyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGxvYWRQbGF0Zm9ybSgpIHtcclxuICAgIGNvbnN0IGZqcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTtcclxuICAgIGNvbnN0IGpzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICBqcy5pZCA9ICdnb29nbGUtcGxhdGZvcm0nO1xyXG4gICAganMuc3JjID0gJ2h0dHBzOi8vYXBpcy5nb29nbGUuY29tL2pzL3BsYXRmb3JtLmpzJztcclxuICAgIGZqcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShqcywgZmpzKTtcclxuICB9XHJcbn1cclxuIl19