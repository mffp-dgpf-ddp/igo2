import { BehaviorSubject, of } from 'rxjs';
import { Base64 } from '@igo2/utils';
import jwtDecode from 'jwt-decode';
import { tap, filter, map } from 'rxjs/operators';
import { Router, NavigationStart, RouterModule } from '@angular/router';
import { Injectable, Injector, Component, ChangeDetectionStrategy, ApplicationRef, Output, EventEmitter, Input, Optional, NgModule, Directive, ElementRef, defineInjectable, inject, INJECTOR } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { ConfigService, LanguageService, IgoLanguageModule } from '@igo2/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TokenService {
    /**
     * @param {?} injector
     */
    constructor(injector) {
        this.injector = injector;
    }
    /**
     * @param {?} token
     * @return {?}
     */
    set(token) {
        localStorage.setItem(this.tokenKey, token);
    }
    /**
     * @return {?}
     */
    remove() {
        localStorage.removeItem(this.tokenKey);
    }
    /**
     * @return {?}
     */
    get() {
        return localStorage.getItem(this.tokenKey);
    }
    /**
     * @return {?}
     */
    decode() {
        /** @type {?} */
        const token = this.get();
        if (!token) {
            return;
        }
        return jwtDecode(token);
    }
    /**
     * @return {?}
     */
    isExpired() {
        /** @type {?} */
        const jwt = this.decode();
        /** @type {?} */
        const currentTime = new Date().getTime() / 1000;
        if (jwt && currentTime < jwt.exp) {
            return false;
        }
        return true;
    }
    /**
     * @private
     * @return {?}
     */
    get tokenKey() {
        /** @type {?} */
        const config = this.injector.get(ConfigService);
        this.options = config.getConfig('auth') || {};
        return this.options.tokenKey;
    }
}
TokenService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
TokenService.ctorParameters = () => [
    { type: Injector }
];
/** @nocollapse */ TokenService.ngInjectableDef = defineInjectable({ factory: function TokenService_Factory() { return new TokenService(inject(INJECTOR)); }, token: TokenService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AuthService {
    /**
     * @param {?} http
     * @param {?} tokenService
     * @param {?} config
     * @param {?} languageService
     * @param {?} router
     */
    constructor(http, tokenService, config, languageService, router) {
        this.http = http;
        this.tokenService = tokenService;
        this.config = config;
        this.languageService = languageService;
        this.router = router;
        this.authenticate$ = new BehaviorSubject(undefined);
        this.anonymous = false;
        this.options = this.config.getConfig('auth') || {};
        this.authenticate$.next(this.authenticated);
    }
    /**
     * @param {?} username
     * @param {?} password
     * @return {?}
     */
    login(username, password) {
        /** @type {?} */
        const myHeader = new HttpHeaders();
        myHeader.append('Content-Type', 'application/json');
        /** @type {?} */
        const body = JSON.stringify({
            username,
            password: this.encodePassword(password)
        });
        return this.loginCall(body, myHeader);
    }
    /**
     * @param {?} token
     * @param {?} type
     * @return {?}
     */
    loginWithToken(token, type) {
        /** @type {?} */
        const myHeader = new HttpHeaders();
        myHeader.append('Content-Type', 'application/json');
        /** @type {?} */
        const body = JSON.stringify({
            token,
            typeConnection: type
        });
        return this.loginCall(body, myHeader);
    }
    /**
     * @return {?}
     */
    loginAnonymous() {
        this.anonymous = true;
        return of(true);
    }
    /**
     * @return {?}
     */
    logout() {
        this.anonymous = false;
        this.tokenService.remove();
        this.authenticate$.next(false);
        return of(true);
    }
    /**
     * @return {?}
     */
    isAuthenticated() {
        return !this.tokenService.isExpired();
    }
    /**
     * @return {?}
     */
    getToken() {
        return this.tokenService.get();
    }
    /**
     * @return {?}
     */
    decodeToken() {
        if (this.isAuthenticated()) {
            return this.tokenService.decode();
        }
        return false;
    }
    /**
     * @return {?}
     */
    goToRedirectUrl() {
        if (!this.router) {
            return;
        }
        /** @type {?} */
        const redirectUrl = this.redirectUrl || this.router.url;
        if (redirectUrl === this.options.loginRoute) {
            /** @type {?} */
            const homeRoute = this.options.homeRoute || '/';
            this.router.navigateByUrl(homeRoute);
        }
        else if (redirectUrl) {
            this.router.navigateByUrl(redirectUrl);
        }
    }
    /**
     * @return {?}
     */
    getUserInfo() {
        /** @type {?} */
        const url = this.options.url + '/info';
        return this.http.get(url);
    }
    /**
     * @return {?}
     */
    getProfils() {
        return this.http.get(`${this.options.url}/profils`);
    }
    /**
     * @param {?} user
     * @return {?}
     */
    updateUser(user) {
        /** @type {?} */
        const url = this.options.url;
        return this.http.patch(url, JSON.stringify(user));
    }
    /**
     * @private
     * @param {?} password
     * @return {?}
     */
    encodePassword(password) {
        return Base64.encode(password);
    }
    // authenticated or anonymous
    /**
     * @return {?}
     */
    get logged() {
        return this.authenticated || this.isAnonymous;
    }
    /**
     * @return {?}
     */
    get isAnonymous() {
        return this.anonymous;
    }
    /**
     * @return {?}
     */
    get authenticated() {
        return this.isAuthenticated();
    }
    /**
     * @private
     * @param {?} body
     * @param {?} headers
     * @return {?}
     */
    loginCall(body, headers) {
        return this.http
            .post(`${this.options.url}/login`, body, { headers })
            .pipe(tap((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            this.tokenService.set(data.token);
            /** @type {?} */
            const tokenDecoded = this.decodeToken();
            if (tokenDecoded && tokenDecoded.user && tokenDecoded.user.locale) {
                this.languageService.setLanguage(tokenDecoded.user.locale);
            }
            this.authenticate$.next(true);
        })));
    }
}
AuthService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
AuthService.ctorParameters = () => [
    { type: HttpClient },
    { type: TokenService },
    { type: ConfigService },
    { type: LanguageService },
    { type: Router, decorators: [{ type: Optional }] }
];
/** @nocollapse */ AuthService.ngInjectableDef = defineInjectable({ factory: function AuthService_Factory() { return new AuthService(inject(HttpClient), inject(TokenService), inject(ConfigService), inject(LanguageService), inject(Router, 8)); }, token: AuthService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AuthFormComponent {
    /**
     * @param {?} auth
     * @param {?} config
     * @param {?} router
     */
    constructor(auth, config, router) {
        this.auth = auth;
        this.config = config;
        this.router = router;
        this._backgroundDisable = true;
        this._hasAlreadyConnectedDiv = true;
        this._hasLogoutDiv = true;
        this._showAlreadyConnectedDiv = false;
        this._showLogoutDiv = false;
        this.visible = true;
        this.options = this.config.getConfig('auth') || {};
        this.visible = Object.getOwnPropertyNames(this.options).length !== 0;
    }
    /**
     * @return {?}
     */
    get backgroundDisable() {
        if (this.isLogoutRoute || this.isLogoutRoute) {
            return false;
        }
        return this._backgroundDisable;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set backgroundDisable(value) {
        this._backgroundDisable = value.toString() === 'true';
    }
    /**
     * @return {?}
     */
    get hasAlreadyConnectedDiv() {
        return this._hasAlreadyConnectedDiv;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set hasAlreadyConnectedDiv(value) {
        this._hasAlreadyConnectedDiv = value.toString() === 'true';
    }
    /**
     * @return {?}
     */
    get hasLogoutDiv() {
        return this._hasLogoutDiv;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set hasLogoutDiv(value) {
        this._hasLogoutDiv = value.toString() === 'true';
    }
    /**
     * @return {?}
     */
    get showAlreadyConnectedDiv() {
        if (this.isLogoutRoute) {
            return this.hasAlreadyConnectedDiv;
        }
        return this._showAlreadyConnectedDiv;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showAlreadyConnectedDiv(value) {
        this._showAlreadyConnectedDiv = value.toString() === 'true';
    }
    /**
     * @return {?}
     */
    get showLogoutDiv() {
        if (this.isLogoutRoute) {
            return this.hasLogoutDiv;
        }
        return this._showLogoutDiv;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showLogoutDiv(value) {
        this._showLogoutDiv = value.toString() === 'true';
    }
    /**
     * @return {?}
     */
    get showLoginDiv() {
        if (!this.isLogoutRoute) {
            return true;
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.analyzeRoute();
        this.getName();
    }
    /**
     * @return {?}
     */
    login() {
        this.auth.goToRedirectUrl();
        this.getName();
    }
    /**
     * @return {?}
     */
    logout() {
        this.auth.logout().subscribe((/**
         * @return {?}
         */
        () => {
            this.user = undefined;
            if (this.router) {
                if (this.options.logoutRoute) {
                    this.router.navigate([this.options.logoutRoute]);
                }
                else if (this.options.homeRoute) {
                    this.router.navigate([this.options.homeRoute]);
                }
            }
        }));
    }
    /**
     * @return {?}
     */
    home() {
        if (this.router && this.options.homeRoute) {
            this.router.navigate([this.options.homeRoute]);
        }
    }
    /**
     * @private
     * @return {?}
     */
    getName() {
        if (this.auth.decodeToken()) {
            /** @type {?} */
            const tokenDecoded = this.auth.decodeToken();
            this.user = {
                name: tokenDecoded.user.firstName || tokenDecoded.user.sourceId
            };
        }
    }
    /**
     * @private
     * @return {?}
     */
    analyzeRoute() {
        if (!this.router) {
            return;
        }
        this.router.events
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => event instanceof NavigationStart)))
            .subscribe((/**
         * @param {?} changeEvent
         * @return {?}
         */
        (changeEvent) => {
            if (changeEvent.url) {
                /** @type {?} */
                const currentRoute = changeEvent.url;
                /** @type {?} */
                const logoutRoute = this.options.logoutRoute;
                /** @type {?} */
                const loginRoute = this.options.loginRoute;
                this.isLogoutRoute = currentRoute === logoutRoute;
                this.isLoginRoute = currentRoute === loginRoute;
                if (this.isLogoutRoute) {
                    this.auth.logout();
                }
            }
        }));
    }
}
AuthFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-auth-form',
                template: "<div *ngIf=\"visible\">\r\n  <div *ngIf=\"!auth.logged && backgroundDisable\" class=\"backgroundDisable\"></div>\r\n\r\n  <div *ngIf=\"!auth.logged && showLoginDiv\" class=\"login center-block\">\r\n    <h1>{{'igo.auth.connection' | translate}}</h1>\r\n\r\n    <igo-auth-google\r\n      *ngIf=\"options.google && options.google.enabled !== false\"\r\n      (login)=\"login()\">\r\n    </igo-auth-google>\r\n    <igo-auth-facebook\r\n      *ngIf=\"options.facebook && options.facebook.enabled !== false\"\r\n      (login)=\"login()\">\r\n    </igo-auth-facebook>\r\n    <igo-auth-intern\r\n      *ngIf=\"!options.intern || options.intern.enabled !== false\"\r\n      [allowAnonymous]=\"options.allowAnonymous\"\r\n      (login)=\"login()\">\r\n    </igo-auth-intern>\r\n  </div>\r\n\r\n  <div *ngIf=\"auth.logged && showAlreadyConnectedDiv\" class=\"login center-block\">\r\n    <p>{{'igo.auth.welcome' |\u00A0translate: user}}</p>\r\n    <button mat-raised-button type=\"button\" (click)=\"logout()\">{{'igo.auth.signOut' |\u00A0translate}}</button>\r\n  </div>\r\n\r\n  <div *ngIf=\"showLogoutDiv\" class=\"login center-block\">\r\n    <p>{{'igo.auth.deconnection' |\u00A0translate}}</p>\r\n    <button *ngIf=\"options.homeRoute\" mat-raised-button type=\"button\" (click)=\"home()\">{{'igo.auth.home' |\u00A0translate}}</button>\r\n  </div>\r\n\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.Default,
                styles: [":host{z-index:999}div.login{z-index:200;width:90%;min-width:360px;max-width:600px;padding:25px 50px;border:1px solid #888;background-color:#fff}.center-block{position:fixed;top:20%;left:50%;transform:translate(-50%,0)}.backgroundDisable{position:fixed;top:0;left:0;background:#000;opacity:.8;z-index:100;height:100%;width:100%}"]
            }] }
];
/** @nocollapse */
AuthFormComponent.ctorParameters = () => [
    { type: AuthService },
    { type: ConfigService },
    { type: Router, decorators: [{ type: Optional }] }
];
AuthFormComponent.propDecorators = {
    backgroundDisable: [{ type: Input }],
    hasAlreadyConnectedDiv: [{ type: Input }],
    hasLogoutDiv: [{ type: Input }],
    showAlreadyConnectedDiv: [{ type: Input }],
    showLogoutDiv: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AuthInternComponent {
    /**
     * @param {?} auth
     * @param {?} fb
     */
    constructor(auth, fb) {
        this.auth = auth;
        this._allowAnonymous = true;
        this.error = '';
        this.login = new EventEmitter();
        this.form = fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    /**
     * @return {?}
     */
    get allowAnonymous() {
        return this._allowAnonymous;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set allowAnonymous(value) {
        this._allowAnonymous = value;
    }
    /**
     * @param {?} values
     * @return {?}
     */
    loginUser(values) {
        this.auth.login(values.username, values.password).subscribe((/**
         * @return {?}
         */
        () => {
            this.login.emit(true);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        (error) => {
            this.error = error.error.message;
        }));
        return false;
    }
    /**
     * @return {?}
     */
    loginAnonymous() {
        this.auth.loginAnonymous().subscribe((/**
         * @return {?}
         */
        () => {
            this.login.emit(true);
        }));
    }
}
AuthInternComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-auth-intern',
                template: "<form [formGroup]=\"form\" role=\"form\" (ngSubmit)=\"loginUser(form.value)\">\r\n  <div>\r\n    <mat-form-field class=\"full-width\">\r\n      <input matInput required placeholder=\"{{'igo.auth.user' | translate}}\" formControlName=\"username\">\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div>\r\n    <mat-form-field class=\"full-width\">\r\n      <input matInput required type=\"password\" placeholder=\"{{'igo.auth.password' | translate}}\" formControlName=\"password\">\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <button mat-raised-button type=\"submit\" [disabled]=\"!form.valid\">{{'igo.auth.login' | translate}}</button>\r\n  <button *ngIf=\"allowAnonymous\" mat-raised-button type=\"button\" (click)=\"loginAnonymous()\">{{'igo.auth.accessAnonymous' | translate }}</button>\r\n  <div *ngIf=\"error\">\r\n    <br/>\r\n    <font size=\"3\" color=\"red\">{{error}}</font>\r\n  </div>\r\n</form>\r\n",
                changeDetection: ChangeDetectionStrategy.Default,
                styles: [".full-width{width:100%}"]
            }] }
];
/** @nocollapse */
AuthInternComponent.ctorParameters = () => [
    { type: AuthService },
    { type: FormBuilder }
];
AuthInternComponent.propDecorators = {
    allowAnonymous: [{ type: Input }],
    login: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AuthFacebookComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AuthGoogleComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LoggedGuard {
    /**
     * @param {?} authService
     * @param {?} config
     * @param {?} router
     */
    constructor(authService, config, router) {
        this.authService = authService;
        this.config = config;
        this.router = router;
    }
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    canActivate(route, state) {
        if (this.authService.logged) {
            return true;
        }
        this.authService.redirectUrl = state.url;
        /** @type {?} */
        const authConfig = this.config.getConfig('auth');
        if (authConfig && authConfig.loginRoute) {
            this.router.navigateByUrl(authConfig.loginRoute);
        }
        return false;
    }
}
LoggedGuard.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
LoggedGuard.ctorParameters = () => [
    { type: AuthService },
    { type: ConfigService },
    { type: Router }
];
/** @nocollapse */ LoggedGuard.ngInjectableDef = defineInjectable({ factory: function LoggedGuard_Factory() { return new LoggedGuard(inject(AuthService), inject(ConfigService), inject(Router)); }, token: LoggedGuard, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AuthGuard {
    /**
     * @param {?} authService
     * @param {?} config
     * @param {?} router
     */
    constructor(authService, config, router) {
        this.authService = authService;
        this.config = config;
        this.router = router;
    }
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    canActivate(route, state) {
        if (this.authService.authenticated) {
            return true;
        }
        this.authService.redirectUrl = state.url;
        /** @type {?} */
        const authConfig = this.config.getConfig('auth');
        if (authConfig && authConfig.loginRoute) {
            this.router.navigateByUrl(authConfig.loginRoute);
        }
        return false;
    }
}
AuthGuard.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
AuthGuard.ctorParameters = () => [
    { type: AuthService },
    { type: ConfigService },
    { type: Router }
];
/** @nocollapse */ AuthGuard.ngInjectableDef = defineInjectable({ factory: function AuthGuard_Factory() { return new AuthGuard(inject(AuthService), inject(ConfigService), inject(Router)); }, token: AuthGuard, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AdminGuard {
    /**
     * @param {?} authService
     * @param {?} config
     * @param {?} router
     */
    constructor(authService, config, router) {
        this.authService = authService;
        this.config = config;
        this.router = router;
    }
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    canActivate(route, state) {
        /** @type {?} */
        const token = this.authService.decodeToken();
        if (token && token.user && token.user.isAdmin) {
            return true;
        }
        this.authService.redirectUrl = state.url;
        /** @type {?} */
        const authConfig = this.config.getConfig('auth');
        if (authConfig && authConfig.loginRoute) {
            this.router.navigateByUrl(authConfig.loginRoute);
        }
        return false;
    }
}
AdminGuard.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
AdminGuard.ctorParameters = () => [
    { type: AuthService },
    { type: ConfigService },
    { type: Router }
];
/** @nocollapse */ AdminGuard.ngInjectableDef = defineInjectable({ factory: function AdminGuard_Factory() { return new AdminGuard(inject(AuthService), inject(ConfigService), inject(Router)); }, token: AdminGuard, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ProfilsGuard {
    /**
     * @param {?} authService
     * @param {?} config
     * @param {?} router
     */
    constructor(authService, config, router) {
        this.authService = authService;
        this.config = config;
        this.router = router;
    }
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    canActivate(route, state) {
        return this.authService.getProfils().pipe(map((/**
         * @param {?} profils
         * @return {?}
         */
        (profils) => {
            /** @type {?} */
            const authConfig = this.config.getConfig('auth');
            if (profils &&
                profils.some((/**
                 * @param {?} v
                 * @return {?}
                 */
                v => authConfig.profilsGuard.indexOf(v) !== -1))) {
                return true;
            }
            this.authService.redirectUrl = state.url;
            if (authConfig && authConfig.loginRoute) {
                this.router.navigateByUrl(authConfig.loginRoute);
            }
            return false;
        })));
    }
}
ProfilsGuard.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ProfilsGuard.ctorParameters = () => [
    { type: AuthService },
    { type: ConfigService },
    { type: Router }
];
/** @nocollapse */ ProfilsGuard.ngInjectableDef = defineInjectable({ factory: function ProfilsGuard_Factory() { return new ProfilsGuard(inject(AuthService), inject(ConfigService), inject(Router)); }, token: ProfilsGuard, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AuthInterceptor {
    /**
     * @param {?} config
     * @param {?} tokenService
     */
    constructor(config, tokenService) {
        this.config = config;
        this.tokenService = tokenService;
        this.trustHosts = [];
        this.trustHosts = this.config.getConfig('auth.trustHosts') || [];
        this.trustHosts.push(window.location.hostname);
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    intercept(req, next) {
        /** @type {?} */
        const token = this.tokenService.get();
        /** @type {?} */
        const element = document.createElement('a');
        element.href = req.url;
        if (!token && this.trustHosts.indexOf(element.hostname) === -1) {
            return next.handle(req);
        }
        /** @type {?} */
        const authHeader = `Bearer ${token}`;
        /** @type {?} */
        const authReq = req.clone({
            headers: req.headers.set('Authorization', authHeader)
        });
        return next.handle(authReq);
    }
}
AuthInterceptor.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
AuthInterceptor.ctorParameters = () => [
    { type: ConfigService },
    { type: TokenService }
];
/** @nocollapse */ AuthInterceptor.ngInjectableDef = defineInjectable({ factory: function AuthInterceptor_Factory() { return new AuthInterceptor(inject(ConfigService), inject(TokenService)); }, token: AuthInterceptor, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ProtectedDirective {
    /**
     * @param {?} authentication
     * @param {?} el
     */
    constructor(authentication, el) {
        if (!authentication.isAuthenticated()) {
            el.nativeElement.parentNode.removeChild(el.nativeElement);
        }
    }
}
ProtectedDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoProtected]'
            },] }
];
/** @nocollapse */
ProtectedDirective.ctorParameters = () => [
    { type: AuthService },
    { type: ElementRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const routes = [
    { path: 'login', component: AuthFormComponent },
    { path: 'logout', component: AuthFormComponent }
];
class AuthRoutingModule {
}
AuthRoutingModule.decorators = [
    { type: NgModule, args: [{
                imports: [RouterModule.forChild(routes)],
                exports: [RouterModule],
                providers: []
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoAuthModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoAuthModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true
                }
            ]
        };
    }
}
IgoAuthModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatButtonModule,
                    IgoLanguageModule
                ],
                declarations: [
                    AuthFormComponent,
                    AuthGoogleComponent,
                    AuthInternComponent,
                    AuthFacebookComponent,
                    ProtectedDirective
                ],
                exports: [AuthFormComponent, ProtectedDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AuthFormComponent, AuthService, LoggedGuard, AuthGuard, AdminGuard, ProfilsGuard, AuthInterceptor, ProtectedDirective, TokenService, AuthRoutingModule, IgoAuthModule, AuthFacebookComponent as ɵd, AuthFormComponent as ɵa, AuthGoogleComponent as ɵb, AuthInternComponent as ɵc };

//# sourceMappingURL=igo2-auth.js.map