/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ConfigService } from '@igo2/core';
import { TokenService } from './token.service';
import * as i0 from "@angular/core";
import * as i1 from "@igo2/core";
import * as i2 from "./token.service";
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
    /** @nocollapse */ AuthInterceptor.ngInjectableDef = i0.defineInjectable({ factory: function AuthInterceptor_Factory() { return new AuthInterceptor(i0.inject(i1.ConfigService), i0.inject(i2.TokenService)); }, token: AuthInterceptor, providedIn: "root" });
    return AuthInterceptor;
}());
export { AuthInterceptor };
if (false) {
    /**
     * @type {?}
     * @private
     */
    AuthInterceptor.prototype.trustHosts;
    /**
     * @type {?}
     * @private
     */
    AuthInterceptor.prototype.config;
    /**
     * @type {?}
     * @private
     */
    AuthInterceptor.prototype.tokenService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2F1dGgvIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL2F1dGguaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFTM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFFL0M7SUFNRSx5QkFDVSxNQUFxQixFQUNyQixZQUEwQjtRQUQxQixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3JCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBSjVCLGVBQVUsR0FBYSxFQUFFLENBQUM7UUFNaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pELENBQUM7Ozs7OztJQUVELG1DQUFTOzs7OztJQUFULFVBQ0UsR0FBcUIsRUFDckIsSUFBaUI7O1lBRVgsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFOztZQUMvQixPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUM7UUFDM0MsT0FBTyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBRXZCLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzlELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN6Qjs7WUFFSyxVQUFVLEdBQUcsWUFBVSxLQUFPOztZQUM5QixPQUFPLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUN4QixPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQztTQUN0RCxDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlCLENBQUM7O2dCQS9CRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQUxRLGFBQWE7Z0JBQ2IsWUFBWTs7OzBCQVZyQjtDQTRDQyxBQWhDRCxJQWdDQztTQTdCWSxlQUFlOzs7Ozs7SUFDMUIscUNBQWtDOzs7OztJQUdoQyxpQ0FBNkI7Ozs7O0lBQzdCLHVDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBIdHRwRXZlbnQsXHJcbiAgSHR0cEludGVyY2VwdG9yLFxyXG4gIEh0dHBIYW5kbGVyLFxyXG4gIEh0dHBSZXF1ZXN0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IFRva2VuU2VydmljZSB9IGZyb20gJy4vdG9rZW4uc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBdXRoSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xyXG4gIHByaXZhdGUgdHJ1c3RIb3N0czogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSxcclxuICAgIHByaXZhdGUgdG9rZW5TZXJ2aWNlOiBUb2tlblNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMudHJ1c3RIb3N0cyA9IHRoaXMuY29uZmlnLmdldENvbmZpZygnYXV0aC50cnVzdEhvc3RzJykgfHwgW107XHJcbiAgICB0aGlzLnRydXN0SG9zdHMucHVzaCh3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgaW50ZXJjZXB0KFxyXG4gICAgcmVxOiBIdHRwUmVxdWVzdDxhbnk+LFxyXG4gICAgbmV4dDogSHR0cEhhbmRsZXJcclxuICApOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XHJcbiAgICBjb25zdCB0b2tlbiA9IHRoaXMudG9rZW5TZXJ2aWNlLmdldCgpO1xyXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgIGVsZW1lbnQuaHJlZiA9IHJlcS51cmw7XHJcblxyXG4gICAgaWYgKCF0b2tlbiAmJiB0aGlzLnRydXN0SG9zdHMuaW5kZXhPZihlbGVtZW50Lmhvc3RuYW1lKSA9PT0gLTEpIHtcclxuICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYXV0aEhlYWRlciA9IGBCZWFyZXIgJHt0b2tlbn1gO1xyXG4gICAgY29uc3QgYXV0aFJlcSA9IHJlcS5jbG9uZSh7XHJcbiAgICAgIGhlYWRlcnM6IHJlcS5oZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsIGF1dGhIZWFkZXIpXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBuZXh0LmhhbmRsZShhdXRoUmVxKTtcclxuICB9XHJcbn1cclxuIl19