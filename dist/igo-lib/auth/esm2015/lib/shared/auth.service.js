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
export class AuthService {
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
/** @nocollapse */ AuthService.ngInjectableDef = i0.defineInjectable({ factory: function AuthService_Factory() { return new AuthService(i0.inject(i1.HttpClient), i0.inject(i2.TokenService), i0.inject(i3.ConfigService), i0.inject(i3.LanguageService), i0.inject(i4.Router, 8)); }, token: AuthService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvYXV0aC8iLCJzb3VyY2VzIjpbImxpYi9zaGFyZWQvYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QyxPQUFPLEVBQWMsZUFBZSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2RCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDNUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUdyQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7OztBQUsvQyxNQUFNLE9BQU8sV0FBVzs7Ozs7Ozs7SUFNdEIsWUFDVSxJQUFnQixFQUNoQixZQUEwQixFQUMxQixNQUFxQixFQUNyQixlQUFnQyxFQUNwQixNQUFjO1FBSjFCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUNyQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDcEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQVY3QixrQkFBYSxHQUFHLElBQUksZUFBZSxDQUFVLFNBQVMsQ0FBQyxDQUFDO1FBR3ZELGNBQVMsR0FBRyxLQUFLLENBQUM7UUFTeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzlDLENBQUM7Ozs7OztJQUVELEtBQUssQ0FBQyxRQUFnQixFQUFFLFFBQWdCOztjQUNoQyxRQUFRLEdBQUcsSUFBSSxXQUFXLEVBQUU7UUFDbEMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQzs7Y0FFOUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDMUIsUUFBUTtZQUNSLFFBQVEsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQztTQUN4QyxDQUFDO1FBRUYsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN4QyxDQUFDOzs7Ozs7SUFFRCxjQUFjLENBQUMsS0FBYSxFQUFFLElBQVk7O2NBQ2xDLFFBQVEsR0FBRyxJQUFJLFdBQVcsRUFBRTtRQUNsQyxRQUFRLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDOztjQUU5QyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUMxQixLQUFLO1lBQ0wsY0FBYyxFQUFFLElBQUk7U0FDckIsQ0FBQztRQUVGLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7OztJQUVELGNBQWM7UUFDWixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixDQUFDOzs7O0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQzs7OztJQUVELGVBQWU7UUFDYixPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUN4QyxDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNqQyxDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFO1lBQzFCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNuQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7OztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixPQUFPO1NBQ1I7O2NBQ0ssV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHO1FBRXZELElBQUksV0FBVyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFOztrQkFDckMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLEdBQUc7WUFDL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDdEM7YUFBTSxJQUFJLFdBQVcsRUFBRTtZQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN4QztJQUNILENBQUM7Ozs7SUFFRCxXQUFXOztjQUNILEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxPQUFPO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQU8sR0FBRyxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7OztJQUVELFVBQVU7UUFDUixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLElBQVU7O2NBQ2IsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRztRQUM1QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFPLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQzs7Ozs7O0lBRU8sY0FBYyxDQUFDLFFBQWdCO1FBQ3JDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7OztJQUdELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQ2hELENBQUM7Ozs7SUFFRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQzs7OztJQUVELElBQUksYUFBYTtRQUNmLE9BQU8sSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ2hDLENBQUM7Ozs7Ozs7SUFFTyxTQUFTLENBQUMsSUFBSSxFQUFFLE9BQU87UUFDN0IsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUM7YUFDcEQsSUFBSSxDQUNILEdBQUc7Ozs7UUFBQyxDQUFDLElBQVMsRUFBRSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7a0JBQzVCLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3ZDLElBQUksWUFBWSxJQUFJLFlBQVksQ0FBQyxJQUFJLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2pFLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDNUQ7WUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ04sQ0FBQzs7O1lBaklGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQWRRLFVBQVU7WUFVVixZQUFZO1lBSlosYUFBYTtZQUFFLGVBQWU7WUFMOUIsTUFBTSx1QkF5QlYsUUFBUTs7Ozs7SUFWWCxvQ0FBK0Q7O0lBQy9ELGtDQUEyQjs7Ozs7SUFDM0IsOEJBQTZCOzs7OztJQUM3QixnQ0FBMEI7Ozs7O0lBR3hCLDJCQUF3Qjs7Ozs7SUFDeEIsbUNBQWtDOzs7OztJQUNsQyw2QkFBNkI7Ozs7O0lBQzdCLHNDQUF3Qzs7Ozs7SUFDeEMsNkJBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QsIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UsIExhbmd1YWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBCYXNlNjQgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQgeyBBdXRoT3B0aW9ucywgVXNlciB9IGZyb20gJy4vYXV0aC5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBUb2tlblNlcnZpY2UgfSBmcm9tICcuL3Rva2VuLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2Uge1xyXG4gIHB1YmxpYyBhdXRoZW50aWNhdGUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih1bmRlZmluZWQpO1xyXG4gIHB1YmxpYyByZWRpcmVjdFVybDogc3RyaW5nO1xyXG4gIHByaXZhdGUgb3B0aW9uczogQXV0aE9wdGlvbnM7XHJcbiAgcHJpdmF0ZSBhbm9ueW1vdXMgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICBwcml2YXRlIHRva2VuU2VydmljZTogVG9rZW5TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlclxyXG4gICkge1xyXG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdhdXRoJykgfHwge307XHJcbiAgICB0aGlzLmF1dGhlbnRpY2F0ZSQubmV4dCh0aGlzLmF1dGhlbnRpY2F0ZWQpO1xyXG4gIH1cclxuXHJcbiAgbG9naW4odXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyk6IGFueSB7XHJcbiAgICBjb25zdCBteUhlYWRlciA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4gICAgbXlIZWFkZXIuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG5cclxuICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgIHVzZXJuYW1lLFxyXG4gICAgICBwYXNzd29yZDogdGhpcy5lbmNvZGVQYXNzd29yZChwYXNzd29yZClcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmxvZ2luQ2FsbChib2R5LCBteUhlYWRlcik7XHJcbiAgfVxyXG5cclxuICBsb2dpbldpdGhUb2tlbih0b2tlbjogc3RyaW5nLCB0eXBlOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgY29uc3QgbXlIZWFkZXIgPSBuZXcgSHR0cEhlYWRlcnMoKTtcclxuICAgIG15SGVhZGVyLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuXHJcbiAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICB0b2tlbixcclxuICAgICAgdHlwZUNvbm5lY3Rpb246IHR5cGVcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmxvZ2luQ2FsbChib2R5LCBteUhlYWRlcik7XHJcbiAgfVxyXG5cclxuICBsb2dpbkFub255bW91cygpIHtcclxuICAgIHRoaXMuYW5vbnltb3VzID0gdHJ1ZTtcclxuICAgIHJldHVybiBvZih0cnVlKTtcclxuICB9XHJcblxyXG4gIGxvZ291dCgpIHtcclxuICAgIHRoaXMuYW5vbnltb3VzID0gZmFsc2U7XHJcbiAgICB0aGlzLnRva2VuU2VydmljZS5yZW1vdmUoKTtcclxuICAgIHRoaXMuYXV0aGVudGljYXRlJC5uZXh0KGZhbHNlKTtcclxuICAgIHJldHVybiBvZih0cnVlKTtcclxuICB9XHJcblxyXG4gIGlzQXV0aGVudGljYXRlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAhdGhpcy50b2tlblNlcnZpY2UuaXNFeHBpcmVkKCk7XHJcbiAgfVxyXG5cclxuICBnZXRUb2tlbigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMudG9rZW5TZXJ2aWNlLmdldCgpO1xyXG4gIH1cclxuXHJcbiAgZGVjb2RlVG9rZW4oKSB7XHJcbiAgICBpZiAodGhpcy5pc0F1dGhlbnRpY2F0ZWQoKSkge1xyXG4gICAgICByZXR1cm4gdGhpcy50b2tlblNlcnZpY2UuZGVjb2RlKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBnb1RvUmVkaXJlY3RVcmwoKSB7XHJcbiAgICBpZiAoIXRoaXMucm91dGVyKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHJlZGlyZWN0VXJsID0gdGhpcy5yZWRpcmVjdFVybCB8fCB0aGlzLnJvdXRlci51cmw7XHJcblxyXG4gICAgaWYgKHJlZGlyZWN0VXJsID09PSB0aGlzLm9wdGlvbnMubG9naW5Sb3V0ZSkge1xyXG4gICAgICBjb25zdCBob21lUm91dGUgPSB0aGlzLm9wdGlvbnMuaG9tZVJvdXRlIHx8ICcvJztcclxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybChob21lUm91dGUpO1xyXG4gICAgfSBlbHNlIGlmIChyZWRpcmVjdFVybCkge1xyXG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKHJlZGlyZWN0VXJsKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFVzZXJJbmZvKCk6IE9ic2VydmFibGU8VXNlcj4ge1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5vcHRpb25zLnVybCArICcvaW5mbyc7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxVc2VyPih1cmwpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UHJvZmlscygpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke3RoaXMub3B0aW9ucy51cmx9L3Byb2ZpbHNgKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVVzZXIodXNlcjogVXNlcik6IE9ic2VydmFibGU8VXNlcj4ge1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5vcHRpb25zLnVybDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucGF0Y2g8VXNlcj4odXJsLCBKU09OLnN0cmluZ2lmeSh1c2VyKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGVuY29kZVBhc3N3b3JkKHBhc3N3b3JkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBCYXNlNjQuZW5jb2RlKHBhc3N3b3JkKTtcclxuICB9XHJcblxyXG4gIC8vIGF1dGhlbnRpY2F0ZWQgb3IgYW5vbnltb3VzXHJcbiAgZ2V0IGxvZ2dlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmF1dGhlbnRpY2F0ZWQgfHwgdGhpcy5pc0Fub255bW91cztcclxuICB9XHJcblxyXG4gIGdldCBpc0Fub255bW91cygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmFub255bW91cztcclxuICB9XHJcblxyXG4gIGdldCBhdXRoZW50aWNhdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaXNBdXRoZW50aWNhdGVkKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGxvZ2luQ2FsbChib2R5LCBoZWFkZXJzKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5wb3N0KGAke3RoaXMub3B0aW9ucy51cmx9L2xvZ2luYCwgYm9keSwgeyBoZWFkZXJzIH0pXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIHRhcCgoZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnRva2VuU2VydmljZS5zZXQoZGF0YS50b2tlbik7XHJcbiAgICAgICAgICBjb25zdCB0b2tlbkRlY29kZWQgPSB0aGlzLmRlY29kZVRva2VuKCk7XHJcbiAgICAgICAgICBpZiAodG9rZW5EZWNvZGVkICYmIHRva2VuRGVjb2RlZC51c2VyICYmIHRva2VuRGVjb2RlZC51c2VyLmxvY2FsZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxhbmd1YWdlU2VydmljZS5zZXRMYW5ndWFnZSh0b2tlbkRlY29kZWQudXNlci5sb2NhbGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5hdXRoZW50aWNhdGUkLm5leHQodHJ1ZSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICB9XHJcbn1cclxuIl19