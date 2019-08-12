/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ChangeDetectionStrategy, ApplicationRef, Output, EventEmitter } from '@angular/core';
import { ConfigService } from '@igo2/core';
import { AuthService } from '../shared/auth.service';
var AuthGoogleComponent = /** @class */ (function () {
    function AuthGoogleComponent(authService, config, appRef) {
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
    AuthGoogleComponent.prototype.handleSignInClick = /**
     * @return {?}
     */
    function () {
        ((/** @type {?} */ (window))).gapi.auth2.getAuthInstance().signIn();
    };
    /**
     * @return {?}
     */
    AuthGoogleComponent.prototype.handleSignOutClick = /**
     * @return {?}
     */
    function () {
        ((/** @type {?} */ (window))).gapi.auth2.getAuthInstance().signOut();
    };
    /**
     * @private
     * @return {?}
     */
    AuthGoogleComponent.prototype.handleClientLoad = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        ((/** @type {?} */ (window))).gapi.load('client:auth2', (/**
         * @return {?}
         */
        function () { return _this.initClient(); }));
    };
    /**
     * @private
     * @return {?}
     */
    AuthGoogleComponent.prototype.initClient = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
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
        function () {
            _this.handleSignOutClick();
            ((/** @type {?} */ (window))).gapi.auth2.getAuthInstance().isSignedIn.listen((/**
             * @param {?} rep
             * @return {?}
             */
            function (rep) {
                _this.updateSigninStatus(rep);
            }));
        }));
    };
    /**
     * @private
     * @param {?} isSignedIn
     * @return {?}
     */
    AuthGoogleComponent.prototype.updateSigninStatus = /**
     * @private
     * @param {?} isSignedIn
     * @return {?}
     */
    function (isSignedIn) {
        if (isSignedIn) {
            this.loginGoogle(((/** @type {?} */ (window))).gapi.client.getToken().access_token);
        }
    };
    /**
     * @private
     * @param {?} token
     * @return {?}
     */
    AuthGoogleComponent.prototype.loginGoogle = /**
     * @private
     * @param {?} token
     * @return {?}
     */
    function (token) {
        var _this = this;
        this.authService.loginWithToken(token, 'google').subscribe((/**
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
    AuthGoogleComponent.prototype.loadSDKGoogle = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var fjs = document.getElementsByTagName('script')[0];
        /** @type {?} */
        var js = document.createElement('script');
        js.id = 'google-jssdk';
        js.src = 'https://apis.google.com/js/api.js';
        js.onload = (/**
         * @return {?}
         */
        function () {
            _this.handleClientLoad();
        });
        fjs.parentNode.insertBefore(js, fjs);
    };
    /**
     * @private
     * @return {?}
     */
    AuthGoogleComponent.prototype.loadPlatform = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var fjs = document.getElementsByTagName('script')[0];
        /** @type {?} */
        var js = document.createElement('script');
        js.id = 'google-platform';
        js.src = 'https://apis.google.com/js/platform.js';
        fjs.parentNode.insertBefore(js, fjs);
    };
    AuthGoogleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-auth-google',
                    template: "<div class=\"g-signin2 google-login-button\" data-height=\"40\" data-width=\"265\" data-longtitle=\"true\">\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".google-login-button{padding:10px 0}"]
                }] }
    ];
    /** @nocollapse */
    AuthGoogleComponent.ctorParameters = function () { return [
        { type: AuthService },
        { type: ConfigService },
        { type: ApplicationRef }
    ]; };
    AuthGoogleComponent.propDecorators = {
        login: [{ type: Output }]
    };
    return AuthGoogleComponent;
}());
export { AuthGoogleComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1nb29nbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvYXV0aC8iLCJzb3VyY2VzIjpbImxpYi9hdXRoLWZvcm0vYXV0aC1nb29nbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULHVCQUF1QixFQUN2QixjQUFjLEVBQ2QsTUFBTSxFQUNOLFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVyRDtJQVdFLDZCQUNVLFdBQXdCLEVBQ3hCLE1BQXFCLEVBQ3JCLE1BQXNCO1FBRnRCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFdBQU0sR0FBTixNQUFNLENBQWU7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFMdEIsVUFBSyxHQUEwQixJQUFJLFlBQVksRUFBVyxDQUFDO1FBT25FLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRTFELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDaEQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNyQjtJQUNILENBQUM7Ozs7SUFFTSwrQ0FBaUI7OztJQUF4QjtRQUNFLENBQUMsbUJBQUEsTUFBTSxFQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3hELENBQUM7Ozs7SUFFTSxnREFBa0I7OztJQUF6QjtRQUNFLENBQUMsbUJBQUEsTUFBTSxFQUFPLENBQUMsQ0FBQyxJ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QUFDOztnQkFwRkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLDJIQUEyQztvQkFFM0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnQkFQUSxXQUFXO2dCQUZYLGFBQWE7Z0JBTHBCLGNBQWM7Ozt3QkFrQmIsTUFBTTs7SUE0RVQsMEJBQUM7Q0FBQSxBQXJGRCxJQXFGQztTQS9FWSxtQkFBbUI7Ozs7OztJQUM5QixzQ0FBbUM7O0lBRW5DLG9DQUFxRTs7Ozs7SUFHbkUsMENBQWdDOzs7OztJQUNoQyxxQ0FBNkI7Ozs7O0lBQzdCLHFDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIEFwcGxpY2F0aW9uUmVmLFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgQXV0aEdvb2dsZU9wdGlvbnMgfSBmcm9tICcuLi9zaGFyZWQvYXV0aC5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9hdXRoLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tYXV0aC1nb29nbGUnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hdXRoLWdvb2dsZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYXV0aC1nb29nbGUuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXV0aEdvb2dsZUNvbXBvbmVudCB7XHJcbiAgcHJpdmF0ZSBvcHRpb25zOiBBdXRoR29vZ2xlT3B0aW9ucztcclxuXHJcbiAgQE91dHB1dCgpIGxvZ2luOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSxcclxuICAgIHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZlxyXG4gICkge1xyXG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdhdXRoLmdvb2dsZScpIHx8IHt9O1xyXG5cclxuICAgIGlmICh0aGlzLm9wdGlvbnMuYXBpS2V5ICYmIHRoaXMub3B0aW9ucy5jbGllbnRJZCkge1xyXG4gICAgICB0aGlzLmxvYWRTREtHb29nbGUoKTtcclxuICAgICAgdGhpcy5sb2FkUGxhdGZvcm0oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBoYW5kbGVTaWduSW5DbGljaygpIHtcclxuICAgICh3aW5kb3cgYXMgYW55KS5nYXBpLmF1dGgyLmdldEF1dGhJbnN0YW5jZSgpLnNpZ25JbigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGhhbmRsZVNpZ25PdXRDbGljaygpIHtcclxuICAgICh3aW5kb3cgYXMgYW55KS5nYXBpLmF1dGgyLmdldEF1dGhJbnN0YW5jZSgpLnNpZ25PdXQoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlQ2xpZW50TG9hZCgpIHtcclxuICAgICh3aW5kb3cgYXMgYW55KS5nYXBpLmxvYWQoJ2NsaWVudDphdXRoMicsICgpID0+IHRoaXMuaW5pdENsaWVudCgpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdENsaWVudCgpIHtcclxuICAgICh3aW5kb3cgYXMgYW55KS5nYXBpLmNsaWVudFxyXG4gICAgICAuaW5pdCh7XHJcbiAgICAgICAgYXBpS2V5OiB0aGlzLm9wdGlvbnMuYXBpS2V5LFxyXG4gICAgICAgIGNsaWVudElkOiB0aGlzLm9wdGlvbnMuY2xpZW50SWQsXHJcbiAgICAgICAgZGlzY292ZXJ5RG9jczogW1xyXG4gICAgICAgICAgJ2h0dHBzOi8vcGVvcGxlLmdvb2dsZWFwaXMuY29tLyRkaXNjb3ZlcnkvcmVzdD92ZXJzaW9uPXYxJ1xyXG4gICAgICAgIF0sXHJcbiAgICAgICAgc2NvcGU6ICdwcm9maWxlJ1xyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVTaWduT3V0Q2xpY2soKTtcclxuICAgICAgICAod2luZG93IGFzIGFueSkuZ2FwaS5hdXRoMi5nZXRBdXRoSW5zdGFuY2UoKS5pc1NpZ25lZEluLmxpc3RlbihyZXAgPT4ge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVTaWduaW5TdGF0dXMocmVwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZVNpZ25pblN0YXR1cyhpc1NpZ25lZEluKSB7XHJcbiAgICBpZiAoaXNTaWduZWRJbikge1xyXG4gICAgICB0aGlzLmxvZ2luR29vZ2xlKCh3aW5kb3cgYXMgYW55KS5nYXBpLmNsaWVudC5nZXRUb2tlbigpLmFjY2Vzc190b2tlbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGxvZ2luR29vZ2xlKHRva2VuKSB7XHJcbiAgICB0aGlzLmF1dGhTZXJ2aWNlLmxvZ2luV2l0aFRva2VuKHRva2VuLCAnZ29vZ2xlJykuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5hcHBSZWYudGljaygpO1xyXG4gICAgICB0aGlzLmxvZ2luLmVtaXQodHJ1ZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbG9hZFNES0dvb2dsZSgpIHtcclxuICAgIGNvbnN0IGZqcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTtcclxuICAgIGNvbnN0IGpzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICBqcy5pZCA9ICdnb29nbGUtanNzZGsnO1xyXG4gICAganMuc3JjID0gJ2h0dHBzOi8vYXBpcy5nb29nbGUuY29tL2pzL2FwaS5qcyc7XHJcbiAgICBqcy5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgIHRoaXMuaGFuZGxlQ2xpZW50TG9hZCgpO1xyXG4gICAgfTtcclxuICAgIGZqcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShqcywgZmpzKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbG9hZFBsYXRmb3JtKCkge1xyXG4gICAgY29uc3QgZmpzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xyXG4gICAgY29uc3QganMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgIGpzLmlkID0gJ2dvb2dsZS1wbGF0Zm9ybSc7XHJcbiAgICBqcy5zcmMgPSAnaHR0cHM6Ly9hcGlzLmdvb2dsZS5jb20vanMvcGxhdGZvcm0uanMnO1xyXG4gICAgZmpzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGpzLCBmanMpO1xyXG4gIH1cclxufVxyXG4iXX0=