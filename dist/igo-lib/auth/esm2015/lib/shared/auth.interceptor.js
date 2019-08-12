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
export class AuthInterceptor {
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
/** @nocollapse */ AuthInterceptor.ngInjectableDef = i0.defineInjectable({ factory: function AuthInterceptor_Factory() { return new AuthInterceptor(i0.inject(i1.ConfigService), i0.inject(i2.TokenService)); }, token: AuthInterceptor, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2F1dGgvIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL2F1dGguaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFTM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFLL0MsTUFBTSxPQUFPLGVBQWU7Ozs7O0lBRzFCLFlBQ1UsTUFBcUIsRUFDckIsWUFBMEI7UUFEMUIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUNyQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUo1QixlQUFVLEdBQWEsRUFBRSxDQUFDO1FBTWhDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7Ozs7SUFFRCxTQUFTLENBQ1AsR0FBcUIsRUFDckIsSUFBaUI7O2NBRVgsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFOztjQUMvQixPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUM7UUFDM0MsT0FBTyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBRXZCLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzlELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN6Qjs7Y0FFSyxVQUFVLEdBQUcsVUFBVSxLQUFLLEVBQUU7O2NBQzlCLE9BQU8sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQ3hCLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDO1NBQ3RELENBQUM7UUFDRixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7O1lBL0JGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQUxRLGFBQWE7WUFDYixZQUFZOzs7Ozs7OztJQU1uQixxQ0FBa0M7Ozs7O0lBR2hDLGlDQUE2Qjs7Ozs7SUFDN0IsdUNBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIEh0dHBFdmVudCxcclxuICBIdHRwSW50ZXJjZXB0b3IsXHJcbiAgSHR0cEhhbmRsZXIsXHJcbiAgSHR0cFJlcXVlc3RcclxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgVG9rZW5TZXJ2aWNlIH0gZnJvbSAnLi90b2tlbi5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEF1dGhJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XHJcbiAgcHJpdmF0ZSB0cnVzdEhvc3RzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB0b2tlblNlcnZpY2U6IFRva2VuU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy50cnVzdEhvc3RzID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdhdXRoLnRydXN0SG9zdHMnKSB8fCBbXTtcclxuICAgIHRoaXMudHJ1c3RIb3N0cy5wdXNoKHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSk7XHJcbiAgfVxyXG5cclxuICBpbnRlcmNlcHQoXHJcbiAgICByZXE6IEh0dHBSZXF1ZXN0PGFueT4sXHJcbiAgICBuZXh0OiBIdHRwSGFuZGxlclxyXG4gICk6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcclxuICAgIGNvbnN0IHRva2VuID0gdGhpcy50b2tlblNlcnZpY2UuZ2V0KCk7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgZWxlbWVudC5ocmVmID0gcmVxLnVybDtcclxuXHJcbiAgICBpZiAoIXRva2VuICYmIHRoaXMudHJ1c3RIb3N0cy5pbmRleE9mKGVsZW1lbnQuaG9zdG5hbWUpID09PSAtMSkge1xyXG4gICAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhdXRoSGVhZGVyID0gYEJlYXJlciAke3Rva2VufWA7XHJcbiAgICBjb25zdCBhdXRoUmVxID0gcmVxLmNsb25lKHtcclxuICAgICAgaGVhZGVyczogcmVxLmhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgYXV0aEhlYWRlcilcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKGF1dGhSZXEpO1xyXG4gIH1cclxufVxyXG4iXX0=