/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '@igo2/core';
import { AuthService } from './auth.service';
import * as i0 from "@angular/core";
import * as i1 from "./auth.service";
import * as i2 from "@igo2/core";
import * as i3 from "@angular/router";
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
    /** @nocollapse */ LoggedGuard.ngInjectableDef = i0.defineInjectable({ factory: function LoggedGuard_Factory() { return new LoggedGuard(i0.inject(i1.AuthService), i0.inject(i2.ConfigService), i0.inject(i3.Router)); }, token: LoggedGuard, providedIn: "root" });
    return LoggedGuard;
}());
export { LoggedGuard };
if (false) {
    /**
     * @type {?}
     * @private
     */
    LoggedGuard.prototype.authService;
    /**
     * @type {?}
     * @private
     */
    LoggedGuard.prototype.config;
    /**
     * @type {?}
     * @private
     */
    LoggedGuard.prototype.router;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VkLmd1YXJkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvYXV0aC8iLCJzb3VyY2VzIjpbImxpYi9zaGFyZWQvbG9nZ2VkLmd1YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFFTCxNQUFNLEVBR1AsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFFN0M7SUFJRSxxQkFDVSxXQUF3QixFQUN4QixNQUFxQixFQUNyQixNQUFjO1FBRmQsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUNyQixXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQ3JCLENBQUM7Ozs7OztJQUVKLGlDQUFXOzs7OztJQUFYLFVBQVksS0FBNkIsRUFBRSxLQUEwQjtRQUNuRSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFO1lBQzNCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDOztZQUVuQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQ2hELElBQUksVUFBVSxJQUFJLFVBQVUsQ0FBQyxVQUFVLEVBQUU7WUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ2xEO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOztnQkF2QkYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFKUSxXQUFXO2dCQURYLGFBQWE7Z0JBTHBCLE1BQU07OztzQkFIUjtDQW1DQyxBQXhCRCxJQXdCQztTQXJCWSxXQUFXOzs7Ozs7SUFFcEIsa0NBQWdDOzs7OztJQUNoQyw2QkFBNkI7Ozs7O0lBQzdCLDZCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBDYW5BY3RpdmF0ZSxcclxuICBSb3V0ZXIsXHJcbiAgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCxcclxuICBSb3V0ZXJTdGF0ZVNuYXBzaG90XHJcbn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuL2F1dGguc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMb2dnZWRHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyXHJcbiAgKSB7fVxyXG5cclxuICBjYW5BY3RpdmF0ZShyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpIHtcclxuICAgIGlmICh0aGlzLmF1dGhTZXJ2aWNlLmxvZ2dlZCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmF1dGhTZXJ2aWNlLnJlZGlyZWN0VXJsID0gc3RhdGUudXJsO1xyXG5cclxuICAgIGNvbnN0IGF1dGhDb25maWcgPSB0aGlzLmNvbmZpZy5nZXRDb25maWcoJ2F1dGgnKTtcclxuICAgIGlmIChhdXRoQ29uZmlnICYmIGF1dGhDb25maWcubG9naW5Sb3V0ZSkge1xyXG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKGF1dGhDb25maWcubG9naW5Sb3V0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG4iXX0=