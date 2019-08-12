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
    /** @nocollapse */ AuthGuard.ngInjectableDef = i0.defineInjectable({ factory: function AuthGuard_Factory() { return new AuthGuard(i0.inject(i1.AuthService), i0.inject(i2.ConfigService), i0.inject(i3.Router)); }, token: AuthGuard, providedIn: "root" });
    return AuthGuard;
}());
export { AuthGuard };
if (false) {
    /**
     * @type {?}
     * @private
     */
    AuthGuard.prototype.authService;
    /**
     * @type {?}
     * @private
     */
    AuthGuard.prototype.config;
    /**
     * @type {?}
     * @private
     */
    AuthGuard.prototype.router;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2F1dGgvIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL2F1dGguZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUVMLE1BQU0sRUFHUCxNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7OztBQUU3QztJQUlFLG1CQUNVLFdBQXdCLEVBQ3hCLE1BQXFCLEVBQ3JCLE1BQWM7UUFGZCxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVE7SUFDckIsQ0FBQzs7Ozs7O0lBRUosK0JBQVc7Ozs7O0lBQVgsVUFBWSxLQUE2QixFQUFFLEtBQTBCO1FBQ25FLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUU7WUFDbEMsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7O1lBRW5DLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFDaEQsSUFBSSxVQUFVLElBQUksVUFBVSxDQUFDLFVBQVUsRUFBRTtZQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDbEQ7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7O2dCQXZCRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQUpRLFdBQVc7Z0JBRFgsYUFBYTtnQkFMcEIsTUFBTTs7O29CQUhSO0NBbUNDLEFBeEJELElBd0JDO1NBckJZLFNBQVM7Ozs7OztJQUVsQixnQ0FBZ0M7Ozs7O0lBQ2hDLDJCQUE2Qjs7Ozs7SUFDN0IsMkJBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIENhbkFjdGl2YXRlLFxyXG4gIFJvdXRlcixcclxuICBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LFxyXG4gIFJvdXRlclN0YXRlU25hcHNob3RcclxufSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vYXV0aC5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEF1dGhHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyXHJcbiAgKSB7fVxyXG5cclxuICBjYW5BY3RpdmF0ZShyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpIHtcclxuICAgIGlmICh0aGlzLmF1dGhTZXJ2aWNlLmF1dGhlbnRpY2F0ZWQpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hdXRoU2VydmljZS5yZWRpcmVjdFVybCA9IHN0YXRlLnVybDtcclxuXHJcbiAgICBjb25zdCBhdXRoQ29uZmlnID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdhdXRoJyk7XHJcbiAgICBpZiAoYXV0aENvbmZpZyAmJiBhdXRoQ29uZmlnLmxvZ2luUm91dGUpIHtcclxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybChhdXRoQ29uZmlnLmxvZ2luUm91dGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn1cclxuIl19