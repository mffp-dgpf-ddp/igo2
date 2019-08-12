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
export class ProfilsGuard {
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
/** @nocollapse */ ProfilsGuard.ngInjectableDef = i0.defineInjectable({ factory: function ProfilsGuard_Factory() { return new ProfilsGuard(i0.inject(i1.AuthService), i0.inject(i2.ConfigService), i0.inject(i3.Router)); }, token: ProfilsGuard, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlscy5ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2F1dGgvIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL3Byb2ZpbHMuZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUVMLE1BQU0sRUFHUCxNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFLN0MsTUFBTSxPQUFPLFlBQVk7Ozs7OztJQUN2QixZQUNVLFdBQXdCLEVBQ3hCLE1BQXFCLEVBQ3JCLE1BQWM7UUFGZCxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVE7SUFDckIsQ0FBQzs7Ozs7O0lBRUosV0FBVyxDQUFDLEtBQTZCLEVBQUUsS0FBMEI7UUFDbkUsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FDdkMsR0FBRzs7OztRQUFDLENBQUMsT0FBaUIsRUFBRSxFQUFFOztrQkFDbEIsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztZQUVoRCxJQUNFLE9BQU87Z0JBQ1AsT0FBTyxDQUFDLElBQUk7Ozs7Z0JBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxFQUM1RDtnQkFDQSxPQUFPLElBQUksQ0FBQzthQUNiO1lBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUV6QyxJQUFJLFVBQVUsSUFBSSxVQUFVLENBQUMsVUFBVSxFQUFFO2dCQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDbEQ7WUFFRCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDOzs7WUEvQkYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBSlEsV0FBVztZQURYLGFBQWE7WUFQcEIsTUFBTTs7Ozs7Ozs7SUFlSixtQ0FBZ0M7Ozs7O0lBQ2hDLDhCQUE2Qjs7Ozs7SUFDN0IsOEJBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIENhbkFjdGl2YXRlLFxyXG4gIFJvdXRlcixcclxuICBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LFxyXG4gIFJvdXRlclN0YXRlU25hcHNob3RcclxufSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuL2F1dGguc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQcm9maWxzR3VhcmQgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlclxyXG4gICkge31cclxuXHJcbiAgY2FuQWN0aXZhdGUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KSB7XHJcbiAgICByZXR1cm4gdGhpcy5hdXRoU2VydmljZS5nZXRQcm9maWxzKCkucGlwZShcclxuICAgICAgbWFwKChwcm9maWxzOiBzdHJpbmdbXSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGF1dGhDb25maWcgPSB0aGlzLmNvbmZpZy5nZXRDb25maWcoJ2F1dGgnKTtcclxuXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgcHJvZmlscyAmJlxyXG4gICAgICAgICAgcHJvZmlscy5zb21lKHYgPT4gYXV0aENvbmZpZy5wcm9maWxzR3VhcmQuaW5kZXhPZih2KSAhPT0gLTEpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2UucmVkaXJlY3RVcmwgPSBzdGF0ZS51cmw7XHJcblxyXG4gICAgICAgIGlmIChhdXRoQ29uZmlnICYmIGF1dGhDb25maWcubG9naW5Sb3V0ZSkge1xyXG4gICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybChhdXRoQ29uZmlnLmxvZ2luUm91dGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19