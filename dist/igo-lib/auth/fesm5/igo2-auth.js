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
var TokenService = /** @class */ (function () {
    function TokenService(injector) {
        this.injector = injector;
    }
    /**
     * @param {?} token
     * @return {?}
     */
    TokenService.prototype.set = /**
     * @param {?} token
     * @return {?}
     */
    function (token) {
        localStorage.setItem(this.tokenKey, token);
    };
    /**
     * @return {?}
     */
    TokenService.prototype.remove = /**
     * @return {?}
     */
    function () {
        localStorage.removeItem(this.tokenKey);
    };
    /**
     * @return {?}
     */
    TokenService.prototype.get = /**
     * @return {?}
     */
    function () {
        return localStorage.getItem(this.tokenKey);
    };
    /**
     * @return {?}
     */
    TokenService.prototype.decode = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var token = this.get();
        if (!token) {
            return;
        }
        return jwtDecode(token);
    };
    /**
     * @return {?}
     */
    TokenService.prototype.isExpired = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var jwt = this.decode();
        /** @type {?} */
        var currentTime = new Date().getTime() / 1000;
        if (jwt && currentTime < jwt.exp) {
            return false;
        }
        return true;
    };
    Object.defineProperty(TokenService.prototype, "tokenKey", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var config = this.injector.get(ConfigService);
            this.options = config.getConfig('auth') || {};
            return this.options.tokenKey;
        },
        enumerable: true,
        configurable: true
    });
    TokenService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    TokenService.ctorParameters = function () { return [
        { type: Injector }
    ]; };
    /** @nocollapse */ TokenService.ngInjectableDef = defineInjectable({ factory: function TokenService_Factory() { return new TokenService(inject(INJECTOR)); }, token: TokenService, providedIn: "root" });
    return TokenService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AuthService = /** @class */ (function () {
    function AuthService(http, tokenService, config, languageService, router) {
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
    AuthService.prototype.login = /**
     * @param {?} username
     * @param {?} password
     * @return {?}
     */
    function (username, password) {
        /** @type {?} */
        var myHeader = new HttpHeaders();
        myHeader.append('Content-Type', 'application/json');
        /** @type {?} */
        var body = JSON.stringify({
            username: username,
            password: this.encodePassword(password)
        });
        return this.loginCall(body, myHeader);
    };
    /**
     * @param {?} token
     * @param {?} type
     * @return {?}
     */
    AuthService.prototype.loginWithToken = /**
     * @param {?} token
     * @param {?} type
     * @return {?}
     */
    function (token, type) {
        /** @type {?} */
        var myHeader = new HttpHeaders();
        myHeader.append('Content-Type', 'application/json');
        /** @type {?} */
        var body = JSON.stringify({
            token: token,
            typeConnection: type
        });
        return this.loginCall(body, myHeader);
    };
    /**
     * @return {?}
     */
    AuthService.prototype.loginAnonymous = /**
     * @return {?}
     */
    function () {
        this.anonymous = true;
        return of(true);
    };
    /**
     * @return {?}
     */
    AuthService.prototype.logout = /**
     * @return {?}
     */
    function () {
        this.anonymous = false;
        this.tokenService.remove();
        this.authenticate$.next(false);
        return of(true);
    };
    /**
     * @return {?}
     */
    AuthService.prototype.isAuthenticated = /**
     * @return {?}
     */
    function () {
        return !this.tokenService.isExpired();
    };
    /**
     * @return {?}
     */
    AuthService.prototype.getToken = /**
     * @return {?}
     */
    function () {
        return this.tokenService.get();
    };
    /**
     * @return {?}
     */
    AuthService.prototype.decodeToken = /**
     * @return {?}
     */
    function () {
        if (this.isAuthenticated()) {
            return this.tokenService.decode();
        }
        return false;
    };
    /**
     * @return {?}
     */
    AuthService.prototype.goToRedirectUrl = /**
     * @return {?}
     */
    function () {
        if (!this.router) {
            return;
        }
        /** @type {?} */
        var redirectUrl = this.redirectUrl || this.router.url;
        if (redirectUrl === this.options.loginRoute) {
            /** @type {?} */
            var homeRoute = this.options.homeRoute || '/';
            this.router.navigateByUrl(homeRoute);
        }
        else if (redirectUrl) {
            this.router.navigateByUrl(redirectUrl);
        }
    };
    /**
     * @return {?}
     */
    AuthService.prototype.getUserInfo = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var url = this.options.url + '/info';
        return this.http.get(url);
    };
    /**
     * @return {?}
     */
    AuthService.prototype.getProfils = /**
     * @return {?}
     */
    function () {
        return this.http.get(this.options.url + "/profils");
    };
    /**
     * @param {?} user
     * @return {?}
     */
    AuthService.prototype.updateUser = /**
     * @param {?} user
     * @return {?}
     */
    function (user) {
        /** @type {?} */
        var url = this.options.url;
        return this.http.patch(url, JSON.stringify(user));
    };
    /**
     * @private
     * @param {?} password
     * @return {?}
     */
    AuthService.prototype.encodePassword = /**
     * @private
     * @param {?} password
     * @return {?}
     */
    function (password) {
        return Base64.encode(password);
    };
    Object.defineProperty(AuthService.prototype, "logged", {
        // authenticated or anonymous
        get: 
        // authenticated or anonymous
        /**
         * @return {?}
         */
        function () {
            return this.authenticated || this.isAnonymous;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "isAnonymous", {
        get: /**
         * @return {?}
         */
        function () {
            return this.anonymous;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "authenticated", {
        get: /**
         * @return {?}
         */
        function () {
            return this.isAuthenticated();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} body
     * @param {?} headers
     * @return {?}
     */
    AuthService.prototype.loginCall = /**
     * @private
     * @param {?} body
     * @param {?} headers
     * @return {?}
     */
    function (body, headers) {
        var _this = this;
        return this.http
            .post(this.options.url + "/login", body, { headers: headers })
            .pipe(tap((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            _this.tokenService.set(data.token);
            /** @type {?} */
            var tokenDecoded = _this.decodeToken();
            if (tokenDecoded && tokenDecoded.user && tokenDecoded.user.locale) {
                _this.languageService.setLanguage(tokenDecoded.user.locale);
            }
            _this.authenticate$.next(true);
        })));
    };
    AuthService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    AuthService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: TokenService },
        { type: ConfigService },
        { type: LanguageService },
        { type: Router, decorators: [{ type: Optional }] }
    ]; };
    /** @nocollapse */ AuthService.ngInjectableDef = defineInjectable({ factory: function AuthService_Factory() { return new AuthService(inject(HttpClient), inject(TokenService), inject(ConfigService), inject(LanguageService), inject(Router, 8)); }, token: AuthService, providedIn: "root" });
    return AuthService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AuthFormComponent = /** @class */ (function () {
    function AuthFormComponent(auth, config, router) {
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
    Object.defineProperty(AuthFormComponent.prototype, "backgroundDisable", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.isLogoutRoute || this.isLogoutRoute) {
                return false;
            }
            return this._backgroundDisable;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._backgroundDisable = value.toString() === 'true';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthFormComponent.prototype, "hasAlreadyConnectedDiv", {
        get: /**
         * @return {?}
         */
        function () {
            return this._hasAlreadyConnectedDiv;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._hasAlreadyConnectedDiv = value.toString() === 'true';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthFormComponent.prototype, "hasLogoutDiv", {
        get: /**
         * @return {?}
         */
        function () {
            return this._hasLogoutDiv;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._hasLogoutDiv = value.toString() === 'true';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthFormComponent.prototype, "showAlreadyConnectedDiv", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.isLogoutRoute) {
                return this.hasAlreadyConnectedDiv;
            }
            return this._showAlreadyConnectedDiv;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._showAlreadyConnectedDiv = value.toString() === 'true';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthFormComponent.prototype, "showLogoutDiv", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.isLogoutRoute) {
                return this.hasLogoutDiv;
            }
            return this._showLogoutDiv;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._showLogoutDiv = value.toString() === 'true';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthFormComponent.prototype, "showLoginDiv", {
        get: /**
         * @return {?}
         */
        function () {
            if (!this.isLogoutRoute) {
                return true;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AuthFormComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.analyzeRoute();
        this.getName();
    };
    /**
     * @return {?}
     */
    AuthFormComponent.prototype.login = /**
     * @return {?}
     */
    function () {
        this.auth.goToRedirectUrl();
        this.getName();
    };
    /**
     * @return {?}
     */
    AuthFormComponent.prototype.logout = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.auth.logout().subscribe((/**
         * @return {?}
         */
        function () {
            _this.user = undefined;
            if (_this.router) {
                if (_this.options.logoutRoute) {
                    _this.router.navigate([_this.options.logoutRoute]);
                }
                else if (_this.options.homeRoute) {
                    _this.router.navigate([_this.options.homeRoute]);
                }
            }
        }));
    };
    /**
     * @return {?}
     */
    AuthFormComponent.prototype.home = /**
     * @return {?}
     */
    function () {
        if (this.router && this.options.homeRoute) {
            this.router.navigate([this.options.homeRoute]);
        }
    };
    /**
     * @private
     * @return {?}
     */
    AuthFormComponent.prototype.getName = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.auth.decodeToken()) {
            /** @type {?} */
            var tokenDecoded = this.auth.decodeToken();
            this.user = {
                name: tokenDecoded.user.firstName || tokenDecoded.user.sourceId
            };
        }
    };
    /**
     * @private
     * @return {?}
     */
    AuthFormComponent.prototype.analyzeRoute = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.router) {
            return;
        }
        this.router.events
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event instanceof NavigationStart; })))
            .subscribe((/**
         * @param {?} changeEvent
         * @return {?}
         */
        function (changeEvent) {
            if (changeEvent.url) {
                /** @type {?} */
                var currentRoute = changeEvent.url;
                /** @type {?} */
                var logoutRoute = _this.options.logoutRoute;
                /** @type {?} */
                var loginRoute = _this.options.loginRoute;
                _this.isLogoutRoute = currentRoute === logoutRoute;
                _this.isLoginRoute = currentRoute === loginRoute;
                if (_this.isLogoutRoute) {
                    _this.auth.logout();
                }
            }
        }));
    };
    AuthFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-auth-form',
                    template: "<div *ngIf=\"visible\">\r\n  <div *ngIf=\"!auth.logged && backgroundDisable\" class=\"backgroundDisable\"></div>\r\n\r\n  <div *ngIf=\"!auth.logged && showLoginDiv\" class=\"login center-block\">\r\n    <h1>{{'igo.auth.connection' | translate}}</h1>\r\n\r\n    <igo-auth-google\r\n      *ngIf=\"options.google && options.google.enabled !== false\"\r\n      (login)=\"login()\">\r\n    </igo-auth-google>\r\n    <igo-auth-facebook\r\n      *ngIf=\"options.facebook && options.facebook.enabled !== false\"\r\n      (login)=\"login()\">\r\n    </igo-auth-facebook>\r\n    <igo-auth-intern\r\n      *ngIf=\"!options.intern || options.intern.enabled !== false\"\r\n      [allowAnonymous]=\"options.allowAnonymous\"\r\n      (login)=\"login()\">\r\n    </igo-auth-intern>\r\n  </div>\r\n\r\n  <div *ngIf=\"auth.logged && showAlreadyConnectedDiv\" class=\"login center-block\">\r\n    <p>{{'igo.auth.welcome' |\u00A0translate: user}}</p>\r\n    <button mat-raised-button type=\"button\" (click)=\"logout()\">{{'igo.auth.signOut' |\u00A0translate}}</button>\r\n  </div>\r\n\r\n  <div *ngIf=\"showLogoutDiv\" class=\"login center-block\">\r\n    <p>{{'igo.auth.deconnection' |\u00A0translate}}</p>\r\n    <button *ngIf=\"options.homeRoute\" mat-raised-button type=\"button\" (click)=\"home()\">{{'igo.auth.home' |\u00A0translate}}</button>\r\n  </div>\r\n\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.Default,
                    styles: [":host{z-index:999}div.login{z-index:200;width:90%;min-width:360px;max-width:600px;padding:25px 50px;border:1px solid #888;background-color:#fff}.center-block{position:fixed;top:20%;left:50%;-webkit-transform:translate(-50%,0);transform:translate(-50%,0)}.backgroundDisable{position:fixed;top:0;left:0;background:#000;opacity:.8;z-index:100;height:100%;width:100%}"]
                }] }
    ];
    /** @nocollapse */
    AuthFormComponent.ctorParameters = function () { return [
        { type: AuthService },
        { type: ConfigService },
        { type: Router, decorators: [{ type: Optional }] }
    ]; };
    AuthFormComponent.propDecorators = {
        backgroundDisable: [{ type: Input }],
        hasAlreadyConnectedDiv: [{ type: Input }],
        hasLogoutDiv: [{ type: Input }],
        showAlreadyConnectedDiv: [{ type: Input }],
        showLogoutDiv: [{ type: Input }]
    };
    return AuthFormComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AuthInternComponent = /** @class */ (function () {
    function AuthInternComponent(auth, fb) {
        this.auth = auth;
        this._allowAnonymous = true;
        this.error = '';
        this.login = new EventEmitter();
        this.form = fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    Object.defineProperty(AuthInternComponent.prototype, "allowAnonymous", {
        get: /**
         * @return {?}
         */
        function () {
            return this._allowAnonymous;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._allowAnonymous = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} values
     * @return {?}
     */
    AuthInternComponent.prototype.loginUser = /**
     * @param {?} values
     * @return {?}
     */
    function (values) {
        var _this = this;
        this.auth.login(values.username, values.password).subscribe((/**
         * @return {?}
         */
        function () {
            _this.login.emit(true);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            _this.error = error.error.message;
        }));
        return false;
    };
    /**
     * @return {?}
     */
    AuthInternComponent.prototype.loginAnonymous = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.auth.loginAnonymous().subscribe((/**
         * @return {?}
         */
        function () {
            _this.login.emit(true);
        }));
    };
    AuthInternComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-auth-intern',
                    template: "<form [formGroup]=\"form\" role=\"form\" (ngSubmit)=\"loginUser(form.value)\">\r\n  <div>\r\n    <mat-form-field class=\"full-width\">\r\n      <input matInput required placeholder=\"{{'igo.auth.user' | translate}}\" formControlName=\"username\">\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div>\r\n    <mat-form-field class=\"full-width\">\r\n      <input matInput required type=\"password\" placeholder=\"{{'igo.auth.password' | translate}}\" formControlName=\"password\">\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <button mat-raised-button type=\"submit\" [disabled]=\"!form.valid\">{{'igo.auth.login' | translate}}</button>\r\n  <button *ngIf=\"allowAnonymous\" mat-raised-button type=\"button\" (click)=\"loginAnonymous()\">{{'igo.auth.accessAnonymous' | translate }}</button>\r\n  <div *ngIf=\"error\">\r\n    <br/>\r\n    <font size=\"3\" color=\"red\">{{error}}</font>\r\n  </div>\r\n</form>\r\n",
                    changeDetection: ChangeDetectionStrategy.Default,
                    styles: [".full-width{width:100%}"]
                }] }
    ];
    /** @nocollapse */
    AuthInternComponent.ctorParameters = function () { return [
        { type: AuthService },
        { type: FormBuilder }
    ]; };
    AuthInternComponent.propDecorators = {
        allowAnonymous: [{ type: Input }],
        login: [{ type: Output }]
    };
    return AuthInternComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LoggedGuard = /** @class */ (function () {
    function LoggedGuard(authService, config, router) {
        this.authService = authService;
        this.config = config;
        this.router = router;
    }
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    LoggedGuard.prototype.canActivate = /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    function (route, state) {
        if (this.authService.logged) {
            return true;
        }
        this.authService.redirectUrl = state.url;
        /** @type {?} */
        var authConfig = this.config.getConfig('auth');
        if (authConfig && authConfig.loginRoute) {
            this.router.navigateByUrl(authConfig.loginRoute);
        }
        return false;
    };
    LoggedGuard.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    LoggedGuard.ctorParameters = function () { return [
        { type: AuthService },
        { type: ConfigService },
        { type: Router }
    ]; };
    /** @nocollapse */ LoggedGuard.ngInjectableDef = defineInjectable({ factory: function LoggedGuard_Factory() { return new LoggedGuard(inject(AuthService), inject(ConfigService), inject(Router)); }, token: LoggedGuard, providedIn: "root" });
    return LoggedGuard;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AuthGuard = /** @class */ (function () {
    function AuthGuard(authService, config, router) {
        this.authService = authService;
        this.config = config;
        this.router = router;
    }
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    AuthGuard.prototype.canActivate = /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    function (route, state) {
        if (this.authService.authenticated) {
            return true;
        }
        this.authService.redirectUrl = state.url;
        /** @type {?} */
        var authConfig = this.config.getConfig('auth');
        if (authConfig && authConfig.loginRoute) {
            this.router.navigateByUrl(authConfig.loginRoute);
        }
        return false;
    };
    AuthGuard.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    AuthGuard.ctorParameters = function () { return [
        { type: AuthService },
        { type: ConfigService },
        { type: Router }
    ]; };
    /** @nocollapse */ AuthGuard.ngInjectableDef = defineInjectable({ factory: function AuthGuard_Factory() { return new AuthGuard(inject(AuthService), inject(ConfigService), inject(Router)); }, token: AuthGuard, providedIn: "root" });
    return AuthGuard;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AdminGuard = /** @class */ (function () {
    function AdminGuard(authService, config, router) {
        this.authService = authService;
        this.config = config;
        this.router = router;
    }
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    AdminGuard.prototype.canActivate = /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    function (route, state) {
        /** @type {?} */
        var token = this.authService.decodeToken();
        if (token && token.user && token.user.isAdmin) {
            return true;
        }
        this.authService.redirectUrl = state.url;
        /** @type {?} */
        var authConfig = this.config.getConfig('auth');
        if (authConfig && authConfig.loginRoute) {
            this.router.navigateByUrl(authConfig.loginRoute);
        }
        return false;
    };
    AdminGuard.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    AdminGuard.ctorParameters = function () { return [
        { type: AuthService },
        { type: ConfigService },
        { type: Router }
    ]; };
    /** @nocollapse */ AdminGuard.ngInjectableDef = defineInjectable({ factory: function AdminGuard_Factory() { return new AdminGuard(inject(AuthService), inject(ConfigService), inject(Router)); }, token: AdminGuard, providedIn: "root" });
    return AdminGuard;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ProfilsGuard = /** @class */ (function () {
    function ProfilsGuard(authService, config, router) {
        this.authService = authService;
        this.config = config;
        this.router = router;
    }
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    ProfilsGuard.prototype.canActivate = /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    function (route, state) {
        var _this = this;
        return this.authService.getProfils().pipe(map((/**
         * @param {?} profils
         * @return {?}
         */
        function (profils) {
            /** @type {?} */
            var authConfig = _this.config.getConfig('auth');
            if (profils &&
                profils.some((/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) { return authConfig.profilsGuard.indexOf(v) !== -1; }))) {
                return true;
            }
            _this.authService.redirectUrl = state.url;
            if (authConfig && authConfig.loginRoute) {
                _this.router.navigateByUrl(authConfig.loginRoute);
            }
            return false;
        })));
    };
    ProfilsGuard.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ProfilsGuard.ctorParameters = function () { return [
        { type: AuthService },
        { type: ConfigService },
        { type: Router }
    ]; };
    /** @nocollapse */ ProfilsGuard.ngInjectableDef = defineInjectable({ factory: function ProfilsGuard_Factory() { return new ProfilsGuard(inject(AuthService), inject(ConfigService), inject(Router)); }, token: ProfilsGuard, providedIn: "root" });
    return ProfilsGuard;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AuthInterceptor = /** @class */ (function () {
    function AuthInterceptor(config, tokenService) {
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
    AuthInterceptor.prototype.intercept = /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    function (req, next) {
        /** @type {?} */
        var token = this.tokenService.get();
        /** @type {?} */
        var element = document.createElement('a');
        element.href = req.url;
        if (!token && this.trustHosts.indexOf(element.hostname) === -1) {
            return next.handle(req);
        }
        /** @type {?} */
        var authHeader = "Bearer " + token;
        /** @type {?} */
        var authReq = req.clone({
            headers: req.headers.set('Authorization', authHeader)
        });
        return next.handle(authReq);
    };
    AuthInterceptor.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    AuthInterceptor.ctorParameters = function () { return [
        { type: ConfigService },
        { type: TokenService }
    ]; };
    /** @nocollapse */ AuthInterceptor.ngInjectableDef = defineInjectable({ factory: function AuthInterceptor_Factory() { return new AuthInterceptor(inject(ConfigService), inject(TokenService)); }, token: AuthInterceptor, providedIn: "root" });
    return AuthInterceptor;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ProtectedDirective = /** @class */ (function () {
    function ProtectedDirective(authentication, el) {
        if (!authentication.isAuthenticated()) {
            el.nativeElement.parentNode.removeChild(el.nativeElement);
        }
    }
    ProtectedDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoProtected]'
                },] }
    ];
    /** @nocollapse */
    ProtectedDirective.ctorParameters = function () { return [
        { type: AuthService },
        { type: ElementRef }
    ]; };
    return ProtectedDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var routes = [
    { path: 'login', component: AuthFormComponent },
    { path: 'logout', component: AuthFormComponent }
];
var AuthRoutingModule = /** @class */ (function () {
    function AuthRoutingModule() {
    }
    AuthRoutingModule.decorators = [
        { type: NgModule, args: [{
                    imports: [RouterModule.forChild(routes)],
                    exports: [RouterModule],
                    providers: []
                },] }
    ];
    return AuthRoutingModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IgoAuthModule = /** @class */ (function () {
    function IgoAuthModule() {
    }
    /**
     * @return {?}
     */
    IgoAuthModule.forRoot = /**
     * @return {?}
     */
    function () {
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
    };
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
    return IgoAuthModule;
}());

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