/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConfigService, LanguageService } from '@igo2/core';
import { Base64 } from '@igo2/utils';
import { TokenService } from './token.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./token.service";
import * as i3 from "@igo2/core";
import * as i4 from "@angular/router";
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
    /** @nocollapse */ AuthService.ngInjectableDef = i0.defineInjectable({ factory: function AuthService_Factory() { return new AuthService(i0.inject(i1.HttpClient), i0.inject(i2.TokenService), i0.inject(i3.ConfigService), i0.inject(i3.LanguageService), i0.inject(i4.Router, 8)); }, token: AuthService, providedIn: "root" });
    return AuthService;
}());
export { AuthService };
if (false) {
    /** @type {?} */
    AuthService.prototype.authenticate$;
    /** @type {?} */
    AuthService.prototype.redirectUrl;
    /**
     * @type {?}
     * @private
     */
    AuthService.prototype.options;
    /**
     * @type {?}
     * @private
     */
    AuthService.prototype.anonymous;
    /**
     * @type {?}
     * @private
     */
    AuthService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    AuthService.prototype.tokenService;
    /**
     * @type {?}
     * @private
     */
    AuthService.prototype.config;
    /**
     * @type {?}
     * @private
     */
    AuthService.prototype.languageService;
    /**
     * @type {?}
     * @private
     */
    AuthService.prototype.router;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvYXV0aC8iLCJzb3VyY2VzIjpbImxpYi9zaGFyZWQvYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QyxPQUFPLEVBQWMsZUFBZSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2RCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDNUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUdyQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7OztBQUUvQztJQVNFLHFCQUNVLElBQWdCLEVBQ2hCLFlBQTBCLEVBQzFCLE1BQXFCLEVBQ3JCLGVBQWdDLEVBQ3BCLE1BQWM7UUFKMUIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3JCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNwQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBVjdCLGtCQUFhLEdBQUcsSUFBSSxlQUFlLENBQVUsU0FBUyxDQUFDLENBQUM7UUFHdkQsY0FBUyxHQUFHLEtBQUssQ0FBQztRQVN4QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuRCxJQUFJLENBQUMsYUFBYSxDQUFD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WUFDdkMsSUFBSSxZQUFZLElBQUksWUFBWSxDQUFDLElBQUksSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDakUsS0FBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM1RDtZQUNELEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLENBQUMsRUFBQyxDQUNILENBQUM7SUFDTixDQUFDOztnQkFqSUYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFkUSxVQUFVO2dCQVVWLFlBQVk7Z0JBSlosYUFBYTtnQkFBRSxlQUFlO2dCQUw5QixNQUFNLHVCQXlCVixRQUFROzs7c0JBM0JiO0NBK0lDLEFBbElELElBa0lDO1NBL0hZLFdBQVc7OztJQUN0QixvQ0FBK0Q7O0lBQy9ELGtDQUEyQjs7Ozs7SUFDM0IsOEJBQTZCOzs7OztJQUM3QixnQ0FBMEI7Ozs7O0lBR3hCLDJCQUF3Qjs7Ozs7SUFDeEIsbUNBQWtDOzs7OztJQUNsQyw2QkFBNkI7Ozs7O0lBQzdCLHNDQUF3Qzs7Ozs7SUFDeEMsNkJBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QsIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UsIExhbmd1YWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBCYXNlNjQgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQgeyBBdXRoT3B0aW9ucywgVXNlciB9IGZyb20gJy4vYXV0aC5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBUb2tlblNlcnZpY2UgfSBmcm9tICcuL3Rva2VuLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2Uge1xyXG4gIHB1YmxpYyBhdXRoZW50aWNhdGUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih1bmRlZmluZWQpO1xyXG4gIHB1YmxpYyByZWRpcmVjdFVybDogc3RyaW5nO1xyXG4gIHByaXZhdGUgb3B0aW9uczogQXV0aE9wdGlvbnM7XHJcbiAgcHJpdmF0ZSBhbm9ueW1vdXMgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICBwcml2YXRlIHRva2VuU2VydmljZTogVG9rZW5TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlclxyXG4gICkge1xyXG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdhdXRoJykgfHwge307XHJcbiAgICB0aGlzLmF1dGhlbnRpY2F0ZSQubmV4dCh0aGlzLmF1dGhlbnRpY2F0ZWQpO1xyXG4gIH1cclxuXHJcbiAgbG9naW4odXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyk6IGFueSB7XHJcbiAgICBjb25zdCBteUhlYWRlciA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4gICAgbXlIZWFkZXIuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG5cclxuICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgIHVzZXJuYW1lLFxyXG4gICAgICBwYXNzd29yZDogdGhpcy5lbmNvZGVQYXNzd29yZChwYXNzd29yZClcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmxvZ2luQ2FsbChib2R5LCBteUhlYWRlcik7XHJcbiAgfVxyXG5cclxuICBsb2dpbldpdGhUb2tlbih0b2tlbjogc3RyaW5nLCB0eXBlOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgY29uc3QgbXlIZWFkZXIgPSBuZXcgSHR0cEhlYWRlcnMoKTtcclxuICAgIG15SGVhZGVyLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuXHJcbiAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICB0b2tlbixcclxuICAgICAgdHlwZUNvbm5lY3Rpb246IHR5cGVcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmxvZ2luQ2FsbChib2R5LCBteUhlYWRlcik7XHJcbiAgfVxyXG5cclxuICBsb2dpbkFub255bW91cygpIHtcclxuICAgIHRoaXMuYW5vbnltb3VzID0gdHJ1ZTtcclxuICAgIHJldHVybiBvZih0cnVlKTtcclxuICB9XHJcblxyXG4gIGxvZ291dCgpIHtcclxuICAgIHRoaXMuYW5vbnltb3VzID0gZmFsc2U7XHJcbiAgICB0aGlzLnRva2VuU2VydmljZS5yZW1vdmUoKTtcclxuICAgIHRoaXMuYXV0aGVudGljYXRlJC5uZXh0KGZhbHNlKTtcclxuICAgIHJldHVybiBvZih0cnVlKTtcclxuICB9XHJcblxyXG4gIGlzQXV0aGVudGljYXRlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAhdGhpcy50b2tlblNlcnZpY2UuaXNFeHBpcmVkKCk7XHJcbiAgfVxyXG5cclxuICBnZXRUb2tlbigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMudG9rZW5TZXJ2aWNlLmdldCgpO1xyXG4gIH1cclxuXHJcbiAgZGVjb2RlVG9rZW4oKSB7XHJcbiAgICBpZiAodGhpcy5pc0F1dGhlbnRpY2F0ZWQoKSkge1xyXG4gICAgICByZXR1cm4gdGhpcy50b2tlblNlcnZpY2UuZGVjb2RlKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBnb1RvUmVkaXJlY3RVcmwoKSB7XHJcbiAgICBpZiAoIXRoaXMucm91dGVyKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHJlZGlyZWN0VXJsID0gdGhpcy5yZWRpcmVjdFVybCB8fCB0aGlzLnJvdXRlci51cmw7XHJcblxyXG4gICAgaWYgKHJlZGlyZWN0VXJsID09PSB0aGlzLm9wdGlvbnMubG9naW5Sb3V0ZSkge1xyXG4gICAgICBjb25zdCBob21lUm91dGUgPSB0aGlzLm9wdGlvbnMuaG9tZVJvdXRlIHx8ICcvJztcclxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybChob21lUm91dGUpO1xyXG4gICAgfSBlbHNlIGlmIChyZWRpcmVjdFVybCkge1xyXG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKHJlZGlyZWN0VXJsKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFVzZXJJbmZvKCk6IE9ic2VydmFibGU8VXNlcj4ge1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5vcHRpb25zLnVybCArICcvaW5mbyc7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxVc2VyPih1cmwpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UHJvZmlscygpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke3RoaXMub3B0aW9ucy51cmx9L3Byb2ZpbHNgKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVVzZXIodXNlcjogVXNlcik6IE9ic2VydmFibGU8VXNlcj4ge1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5vcHRpb25zLnVybDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucGF0Y2g8VXNlcj4odXJsLCBKU09OLnN0cmluZ2lmeSh1c2VyKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGVuY29kZVBhc3N3b3JkKHBhc3N3b3JkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBCYXNlNjQuZW5jb2RlKHBhc3N3b3JkKTtcclxuICB9XHJcblxyXG4gIC8vIGF1dGhlbnRpY2F0ZWQgb3IgYW5vbnltb3VzXHJcbiAgZ2V0IGxvZ2dlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmF1dGhlbnRpY2F0ZWQgfHwgdGhpcy5pc0Fub255bW91cztcclxuICB9XHJcblxyXG4gIGdldCBpc0Fub255bW91cygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmFub255bW91cztcclxuICB9XHJcblxyXG4gIGdldCBhdXRoZW50aWNhdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaXNBdXRoZW50aWNhdGVkKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGxvZ2luQ2FsbChib2R5LCBoZWFkZXJzKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5wb3N0KGAke3RoaXMub3B0aW9ucy51cmx9L2xvZ2luYCwgYm9keSwgeyBoZWFkZXJzIH0pXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIHRhcCgoZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnRva2VuU2VydmljZS5zZXQoZGF0YS50b2tlbik7XHJcbiAgICAgICAgICBjb25zdCB0b2tlbkRlY29kZWQgPSB0aGlzLmRlY29kZVRva2VuKCk7XHJcbiAgICAgICAgICBpZiAodG9rZW5EZWNvZGVkICYmIHRva2VuRGVjb2RlZC51c2VyICYmIHRva2VuRGVjb2RlZC51c2VyLmxvY2FsZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxhbmd1YWdlU2VydmljZS5zZXRMYW5ndWFnZSh0b2tlbkRlY29kZWQudXNlci5sb2NhbGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5hdXRoZW50aWNhdGUkLm5leHQodHJ1ZSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICB9XHJcbn1cclxuIl19