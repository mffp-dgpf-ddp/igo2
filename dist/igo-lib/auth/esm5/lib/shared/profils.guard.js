/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ConfigService } from '@igo2/core';
import { AuthService } from './auth.service';
import * as i0 from "@angular/core";
import * as i1 from "./auth.service";
import * as i2 from "@igo2/core";
import * as i3 from "@angular/router";
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
    /** @nocollapse */ ProfilsGuard.ngInjectableDef = i0.defineInjectable({ factory: function ProfilsGuard_Factory() { return new ProfilsGuard(i0.inject(i1.AuthService), i0.inject(i2.ConfigService), i0.inject(i3.Router)); }, token: ProfilsGuard, providedIn: "root" });
    return ProfilsGuard;
}());
export { ProfilsGuard };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ProfilsGuard.prototype.authService;
    /**
     * @type {?}
     * @private
     */
    ProfilsGuard.prototype.config;
    /**
     * @type {?}
     * @private
     */
    ProfilsGuard.prototype.router;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlscy5ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2F1dGgvIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL3Byb2ZpbHMuZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUVMLE1BQU0sRUFHUCxNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFFN0M7SUFJRSxzQkFDVSxXQUF3QixFQUN4QixNQUFxQixFQUNyQixNQUFjO1FBRmQsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUNyQixXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQ3JCLENBQUM7Ozs7OztJQUVKLGtDQUFXOzs7OztJQUFYLFVBQVksS0FBNkIsRUFBRSxLQUEwQjtRQUFyRSxpQkFxQkM7UUFwQkMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FDdkMsR0FBRzs7OztRQUFDLFVBQUMsT0FBaUI7O2dCQUNkLFVBQVUsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7WUFFaEQsSUFDRSxPQUFPO2dCQUNQLE9BQU8sQ0FBQyxJQUFJOzs7O2dCQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQXpDLENBQXlDLEVBQUMsRUFDNUQ7Z0JBQ0EsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUVELEtBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFFekMsSUFBSSxVQUFVLElBQUksVUFBVSxDQUFDLFVBQVUsRUFBRTtnQkFDdkMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2xEO1lBRUQsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7Z0JBL0JGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBSlEsV0FBVztnQkFEWCxhQUFhO2dCQVBwQixNQUFNOzs7dUJBSFI7Q0E2Q0MsQUFoQ0QsSUFnQ0M7U0E3QlksWUFBWTs7Ozs7O0lBRXJCLG1DQUFnQzs7Ozs7SUFDaEMsOEJBQTZCOzs7OztJQUM3Qiw4QkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQ2FuQWN0aXZhdGUsXHJcbiAgUm91dGVyLFxyXG4gIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXHJcbiAgUm91dGVyU3RhdGVTbmFwc2hvdFxyXG59IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vYXV0aC5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFByb2ZpbHNHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyXHJcbiAgKSB7fVxyXG5cclxuICBjYW5BY3RpdmF0ZShyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpIHtcclxuICAgIHJldHVybiB0aGlzLmF1dGhTZXJ2aWNlLmdldFByb2ZpbHMoKS5waXBlKFxyXG4gICAgICBtYXAoKHByb2ZpbHM6IHN0cmluZ1tdKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYXV0aENvbmZpZyA9IHRoaXMuY29uZmlnLmdldENvbmZpZygnYXV0aCcpO1xyXG5cclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICBwcm9maWxzICYmXHJcbiAgICAgICAgICBwcm9maWxzLnNvbWUodiA9PiBhdXRoQ29uZmlnLnByb2ZpbHNHdWFyZC5pbmRleE9mKHYpICE9PSAtMSlcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS5yZWRpcmVjdFVybCA9IHN0YXRlLnVybDtcclxuXHJcbiAgICAgICAgaWYgKGF1dGhDb25maWcgJiYgYXV0aENvbmZpZy5sb2dpblJvdXRlKSB7XHJcbiAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKGF1dGhDb25maWcubG9naW5Sb3V0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=