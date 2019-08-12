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
    /** @nocollapse */ AdminGuard.ngInjectableDef = i0.defineInjectable({ factory: function AdminGuard_Factory() { return new AdminGuard(i0.inject(i1.AuthService), i0.inject(i2.ConfigService), i0.inject(i3.Router)); }, token: AdminGuard, providedIn: "root" });
    return AdminGuard;
}());
export { AdminGuard };
if (false) {
    /**
     * @type {?}
     * @private
     */
    AdminGuard.prototype.authService;
    /**
     * @type {?}
     * @private
     */
    AdminGuard.prototype.config;
    /**
     * @type {?}
     * @private
     */
    AdminGuard.prototype.router;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW4uZ3VhcmQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9hdXRoLyIsInNvdXJjZXMiOlsibGliL3NoYXJlZC9hZG1pbi5ndWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBRUwsTUFBTSxFQUdQLE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBRTdDO0lBSUUsb0JBQ1UsV0FBd0IsRUFDeEIsTUFBcUIsRUFDckIsTUFBYztRQUZkLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFdBQU0sR0FBTixNQUFNLENBQWU7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUNyQixDQUFDOzs7Ozs7SUFFSixnQ0FBVzs7Ozs7SUFBWCxVQUFZLEtBQTZCLEVBQUUsS0FBMEI7O1lBQzdELEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRTtRQUM1QyxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQzdDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDOztZQUVuQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQ2hELElBQUksVUFBVSxJQUFJLFVBQVUsQ0FBQyxVQUFVLEVBQUU7WUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ2xEO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOztnQkF4QkYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFKUSxXQUFXO2dCQURYLGFBQWE7Z0JBTHBCLE1BQU07OztxQkFIUjtDQW9DQyxBQXpCRCxJQXlCQztTQXRCWSxVQUFVOzs7Ozs7SUFFbkIsaUNBQWdDOzs7OztJQUNoQyw0QkFBNkI7Ozs7O0lBQzdCLDRCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBDYW5BY3RpdmF0ZSxcclxuICBSb3V0ZXIsXHJcbiAgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCxcclxuICBSb3V0ZXJTdGF0ZVNuYXBzaG90XHJcbn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuL2F1dGguc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZG1pbkd1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSxcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcclxuICApIHt9XHJcblxyXG4gIGNhbkFjdGl2YXRlKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCkge1xyXG4gICAgY29uc3QgdG9rZW4gPSB0aGlzLmF1dGhTZXJ2aWNlLmRlY29kZVRva2VuKCk7XHJcbiAgICBpZiAodG9rZW4gJiYgdG9rZW4udXNlciAmJiB0b2tlbi51c2VyLmlzQWRtaW4pIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hdXRoU2VydmljZS5yZWRpcmVjdFVybCA9IHN0YXRlLnVybDtcclxuXHJcbiAgICBjb25zdCBhdXRoQ29uZmlnID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdhdXRoJyk7XHJcbiAgICBpZiAoYXV0aENvbmZpZyAmJiBhdXRoQ29uZmlnLmxvZ2luUm91dGUpIHtcclxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybChhdXRoQ29uZmlnLmxvZ2luUm91dGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn1cclxuIl19