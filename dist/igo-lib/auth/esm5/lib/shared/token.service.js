/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Injector } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { ConfigService } from '@igo2/core';
import * as i0 from "@angular/core";
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
    /** @nocollapse */ TokenService.ngInjectableDef = i0.defineInjectable({ factory: function TokenService_Factory() { return new TokenService(i0.inject(i0.INJECTOR)); }, token: TokenService, providedIn: "root" });
    return TokenService;
}());
export { TokenService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    TokenService.prototype.options;
    /**
     * @type {?}
     * @private
     */
    TokenService.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2F1dGgvIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL3Rva2VuLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sU0FBUyxNQUFNLFlBQVksQ0FBQztBQUVuQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDOztBQUczQztJQU1FLHNCQUFvQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQUcsQ0FBQzs7Ozs7SUFFMUMsMEJBQUc7Ozs7SUFBSCxVQUFJLEtBQUs7UUFDUCxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7OztJQUVELDZCQUFNOzs7SUFBTjtRQUNFLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Ozs7SUFFRCwwQkFBRzs7O0lBQUg7UUFDRSxPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzdDLENBQUM7Ozs7SUFFRCw2QkFBTTs7O0lBQU47O1lBQ1EsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDeEIsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLE9BQU87U0FDUjtRQUNELE9BQU8sU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7Ozs7SUFFRCxnQ0FBUzs7O0lBQVQ7O1lBQ1EsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7O1lBQ25CLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUk7UUFDL0MsSUFBSSxHQUFHLElBQUksV0FBVyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUU7WUFDaEMsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELHNCQUFZLGtDQUFROzs7OztRQUFwQjs7Z0JBQ1EsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztZQUMvQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzlDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDL0IsQ0FBQzs7O09BQUE7O2dCQXpDRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQVJvQixRQUFROzs7dUJBQTdCO0NBZ0RDLEFBMUNELElBMENDO1NBdkNZLFlBQVk7Ozs7OztJQUN2QiwrQkFBNkI7Ozs7O0lBRWpCLGdDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCBqd3REZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XHJcblxyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IEF1dGhPcHRpb25zIH0gZnJvbSAnLi9hdXRoLmludGVyZmFjZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUb2tlblNlcnZpY2Uge1xyXG4gIHByaXZhdGUgb3B0aW9uczogQXV0aE9wdGlvbnM7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7fVxyXG5cclxuICBzZXQodG9rZW4pIHtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMudG9rZW5LZXksIHRva2VuKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZSgpIHtcclxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMudG9rZW5LZXkpO1xyXG4gIH1cclxuXHJcbiAgZ2V0KCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy50b2tlbktleSk7XHJcbiAgfVxyXG5cclxuICBkZWNvZGUoKSB7XHJcbiAgICBjb25zdCB0b2tlbiA9IHRoaXMuZ2V0KCk7XHJcbiAgICBpZiAoIXRva2VuKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJldHVybiBqd3REZWNvZGUodG9rZW4pO1xyXG4gIH1cclxuXHJcbiAgaXNFeHBpcmVkKCkge1xyXG4gICAgY29uc3Qgand0ID0gdGhpcy5kZWNvZGUoKTtcclxuICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwO1xyXG4gICAgaWYgKGp3dCAmJiBjdXJyZW50VGltZSA8IGp3dC5leHApIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldCB0b2tlbktleSgpIHtcclxuICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuaW5qZWN0b3IuZ2V0KENvbmZpZ1NlcnZpY2UpO1xyXG4gICAgdGhpcy5vcHRpb25zID0gY29uZmlnLmdldENvbmZpZygnYXV0aCcpIHx8IHt9O1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy50b2tlbktleTtcclxuICB9XHJcbn1cclxuIl19