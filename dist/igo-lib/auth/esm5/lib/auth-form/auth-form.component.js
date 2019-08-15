/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ChangeDetectionStrategy, Input, Optional } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ConfigService } from '@igo2/core';
import { AuthService } from '../shared/auth.service';
var AuthFormComponent = /** @class */ (function () {
    function AuthFormComponent(auth, config, router) {
        this.auth = auth;
        this.config = config;
        this.router = router;
        this._backgroundDisable = true;
        this._hasAlreadyConnectedDiv = true;
        this._hasLogoutDiv = true;
        this._showAlreadyConnectedDiv = false;
        this._showLogoutDiv = false;
        this.visible = true;
        this.options = this.config.getConfig('auth') || {};
        this.visible = Object.getOwnPropertyNames(this.options).length !== 0;
    }
    Object.defineProperty(AuthFormComponent.prototype, "backgroundDisable", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.isLogoutRoute || this.isLogoutRoute) {
                return false;
            }
            return this._backgroundDisable;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._backgroundDisable = value.toString() === 'true';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthFormComponent.prototype, "hasAlreadyConnectedDiv", {
        get: /**
         * @return {?}
         */
        function () {
            return this._hasAlreadyConnectedDiv;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._hasAlreadyConnectedDiv = value.toString() === 'true';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthFormComponent.prototype, "hasLogoutDiv", {
        get: /**
         * @return {?}
         */
        function () {
            return this._hasLogoutDiv;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._hasLogoutDiv = value.toString() === 'true';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthFormComponent.prototype, "showAlreadyConnectedDiv", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.isLogoutRoute) {
                return this.hasAlreadyConnectedDiv;
            }
            return this._showAlreadyConnectedDiv;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._showAlreadyConnectedDiv = value.toString() === 'true';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthFormComponent.prototype, "showLogoutDiv", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.isLogoutRoute) {
                return this.hasLogoutDiv;
            }
            return this._showLogoutDiv;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._showLogoutDiv = value.toString() === 'true';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthFormComponent.prototype, "showLoginDiv", {
        get: /**
         * @return {?}
         */
        function () {
            if (!this.isLogoutRoute) {
                return true;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AuthFormComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.analyzeRoute();
        this.getName();
    };
    /**
     * @return {?}
     */
    AuthFormComponent.prototype.login = /**
     * @return {?}
     */
    function () {
        this.auth.goToRedirectUrl();
        this.getName();
    };
    /**
     * @return {?}
     */
    AuthFormComponent.prototype.logout = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.auth.logout().subscribe((/**
         * @return {?}
         */
        function () {
            _this.user = undefined;
            if (_this.router) {
                if (_this.options.logoutRoute) {
                    _this.router.navigate([_this.options.logoutRoute]);
                }
                else if (_this.options.homeRoute) {
                    _this.router.navigate([_this.options.homeRoute]);
                }
            }
        }));
    };
    /**
     * @return {?}
     */
    AuthFormComponent.prototype.home = /**
     * @return {?}
     */
    function () {
        if (this.router && this.options.homeRoute) {
            this.router.navigate([this.options.homeRoute]);
        }
    };
    /**
     * @private
     * @return {?}
     */
    AuthFormComponent.prototype.getName = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.auth.decodeToken()) {
            /** @type {?} */
            var tokenDecoded = this.auth.decodeToken();
            this.user = {
                name: tokenDecoded.user.firstName || tokenDecoded.user.sourceId
            };
        }
    };
    /**
     * @private
     * @return {?}
     */
    AuthFormComponent.prototype.analyzeRoute = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.router) {
            return;
        }
        this.router.events
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event instanceof NavigationStart; })))
            .subscribe((/**
         * @param {?} changeEvent
         * @return {?}
         */
        function (changeEvent) {
            if (changeEvent.url) {
                /** @type {?} */
                var currentRoute = changeEvent.url;
                /** @type {?} */
                var logoutRoute = _this.options.logoutRoute;
                /** @type {?} */
                var loginRoute = _this.options.loginRoute;
                _this.isLogoutRoute = currentRoute === logoutRoute;
                _this.isLoginRoute = currentRoute === loginRoute;
                if (_this.isLogoutRoute) {
                    _this.auth.logout();
                }
            }
        }));
    };
    AuthFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-auth-form',
                    template: "<div *ngIf=\"visible\">\r\n  <div *ngIf=\"!auth.logged && backgroundDisable\" class=\"backgroundDisable\"></div>\r\n\r\n  <div *ngIf=\"!auth.logged && showLoginDiv\" class=\"login center-block\">\r\n    <h1>{{'igo.auth.connection' | translate}}</h1>\r\n\r\n    <igo-auth-google\r\n      *ngIf=\"options.google && options.google.enabled !== false\"\r\n      (login)=\"login()\">\r\n    </igo-auth-google>\r\n    <igo-auth-facebook\r\n      *ngIf=\"options.facebook && options.facebook.enabled !== false\"\r\n      (login)=\"login()\">\r\n    </igo-auth-facebook>\r\n    <igo-auth-intern\r\n      *ngIf=\"!options.intern || options.intern.enabled !== false\"\r\n      [allowAnonymous]=\"options.allowAnonymous\"\r\n      (login)=\"login()\">\r\n    </igo-auth-intern>\r\n  </div>\r\n\r\n  <div *ngIf=\"auth.logged && showAlreadyConnectedDiv\" class=\"login center-block\">\r\n    <p>{{'igo.auth.welcome' |\u00A0translate: user}}</p>\r\n    <button mat-raised-button type=\"button\" (click)=\"logout()\">{{'igo.auth.signOut' |\u00A0translate}}</button>\r\n  </div>\r\n\r\n  <div *ngIf=\"showLogoutDiv\" class=\"login center-block\">\r\n    <p>{{'igo.auth.deconnection' |\u00A0translate}}</p>\r\n    <button *ngIf=\"options.homeRoute\" mat-raised-button type=\"button\" (click)=\"home()\">{{'igo.auth.home' |\u00A0translate}}</button>\r\n  </div>\r\n\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.Default,
                    styles: [":host{z-index:999}div.login{z-index:200;width:90%;min-width:360px;max-width:600px;padding:25px 50px;border:1px solid #888;background-color:#fff}.center-block{position:fixed;top:20%;left:50%;transform:translate(-50%,0)}.backgroundDisable{position:fixed;top:0;left:0;background:#000;opacity:.8;z-index:100;height:100%;width:100%}"]
                }] }
    ];
    /** @nocollapse */
    AuthFormComponent.ctorParameters = function () { return [
        { type: AuthService },
        { type: ConfigService },
        { type: Router, decorators: [{ type: Optional }] }
    ]; };
    AuthFormComponent.propDecorators = {
        backgroundDisable: [{ type: Input }],
        hasAlreadyConnectedDiv: [{ type: Input }],
        hasLogoutDiv: [{ type: Input }],
        showAlreadyConnectedDiv: [{ type: Input }],
        showLogoutDiv: [{ type: Input }]
    };
    return AuthFormComponent;
}());
export { AuthFormComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    AuthFormComponent.prototype._backgroundDisable;
    /**
     * @type {?}
     * @private
     */
    AuthFormComponent.prototype._hasAlreadyConnectedDiv;
    /**
     * @type {?}
     * @private
     */
    AuthFormComponent.prototype._hasLogoutDiv;
    /**
     * @type {?}
     * @private
     */
    AuthFormComponent.prototype._showAlreadyConnectedDiv;
    /**
     * @type {?}
     * @private
     */
    AuthFormComponent.prototype._showLogoutDiv;
    /** @type {?} */
    AuthFormComponent.prototype.options;
    /** @type {?} */
    AuthFormComponent.prototype.user;
    /** @type {?} */
    AuthFormComponent.prototype.visible;
    /**
     * @type {?}
     * @private
     */
    AuthFormComponent.prototype.isLoginRoute;
    /**
     * @type {?}
     * @private
     */
    AuthFormComponent.prototype.isLogoutRoute;
    /** @type {?} */
    AuthFormComponent.prototype.auth;
    /**
     * @type {?}
     * @private
     */
    AuthFormComponent.prototype.config;
    /**
     * @type {?}
     * @private
     */
    AuthFormComponent.prototype.router;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2F1dGgvIiwic291cmNlcyI6WyJsaWIvYXV0aC1mb3JtL2F1dGgtZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsdUJBQXVCLEVBRXZCLEtBQUssRUFDTCxRQUFRLEVBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUUzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFckQ7SUEyRUUsMkJBQ1MsSUFBaUIsRUFDaEIsTUFBcUIsRUFDVCxNQUFjO1FBRjNCLFNBQUksR0FBSixJQUFJLENBQWE7UUFDaEIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUNULFdBQU0sR0FBTixNQUFNLENBQVE7UUE3RDVCLHVCQUFrQixHQUFHLElBQUksQ0FBQztRQVMxQiw0QkFBdUIsR0FBRyxJQUFJLENBQUM7UUFTL0Isa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFZckIsNkJBQXdCLEdBQUcsS0FBSyxDQUFDO1FBWWpDLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBV3hCLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFVcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkQsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQTNFRCxzQkFDSSxnREFBaUI7Ozs7UUFEckI7WUFFRSxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDNUMsT0FBTyxLQUFLLENBQUM7YUFDZDtZQUNELE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBQ2pDLENBQUM7Ozs7O1FBQ0QsVUFBc0IsS0FBYztZQUNsQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLE1BQU0sQ0FBQztRQUN4RCxDQUFDOzs7T0FIQTtJQU1ELHNCQUNJLHFEQUFzQjs7OztRQUQxQjtZQUVFLE9BQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFDO1FBQ3RDLENBQUM7Ozs7O1FBQ0QsVUFBMkIsS0FBYztZQUN2QyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLE1BQU0sQ0FBQztRQUM3RCxDQUFDOzs7T0FIQTtJQU1ELHNCQUNJLDJDQUFZOzs7O1FBRGhCO1lBRUUsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzVCLENBQUM7Ozs7O1FBQ0QsVUFBaUIsS0FBYztZQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxNQUFNLENBQUM7UUFDbkQsQ0FBQzs7O09BSEE7SUFNRCxzQkFDSSxzREFBdUI7Ozs7UUFEM0I7WUFFRSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ3RCLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDO2FBQ3BDO1lBQ0QsT0FBTyxJQUFJLENBQUMsd0JBQXdCLENBQUM7UUFDdkMsQ0FBQzs7Ozs7UUFDRCxVQUE0QixLQUFjO1lBQ3hDLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssTUFBTSxDQUFDO1FBQzlELENBQUM7OztPQUhBO0lBTUQsc0JBQ0ksNENBQWE7Ozs7UUFEakI7WUFFRSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ3RCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQzthQUMxQjtZQUNELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUM3QixDQUFDOzs7OztRQUNELFVBQWtCLEtBQWM7WUFDOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssTUFBTSxDQUFDO1FBQ3BELENBQUM7OztPQUhBO0lBTUQsc0JBQUksMkNBQVk7Ozs7UUFBaEI7WUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDdkIsT0FBTyxJQUFJLENBQUM7YUFDYjtRQUNILENBQUM7OztPQUFBOzs7O0lBbUJNLG9DQUFROzs7SUFBZjtRQUNFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQzs7OztJQUVNLGlDQUFLOzs7SUFBWjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7Ozs7SUFFTSxrQ0FBTTs7O0lBQWI7UUFBQSxpQkFXQztRQVZDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsU0FBUzs7O1FBQUM7WUFDM0IsS0FBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7WUFDdEIsSUFBSSxLQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNmLElBQUksS0FBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUU7b0JBQzVCLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2lCQUNsRDtxQkFBTSxJQUFJLEtBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFO29CQUNqQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztpQkFDaEQ7YUFDRjtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVNLGdDQUFJOzs7SUFBWDtRQUNFLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTtZQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztTQUNoRDtJQUNILENBQUM7Ozs7O0lBRU8sbUNBQU87Ozs7SUFBZjtRQUNFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTs7Z0JBQ3JCLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUM1QyxJQUFJLENBQUMsSUFBSSxHQUFHO2dCQUNWLElBQUksRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVE7YUFDaEUsQ0FBQztTQUNIO0lBQ0gsQ0FBQzs7Ozs7SUFFTyx3Q0FBWTs7OztJQUFwQjtRQUFBLGlCQXFCQztRQXBCQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07YUFDZixJQUFJLENBQUMsTUFBTTs7OztRQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxZQUFZLGVBQWUsRUFBaEMsQ0FBZ0MsRUFBQyxDQUFDO2FBQ3ZELFNBQVM7Ozs7UUFBQyxVQUFDLFdBQWdCO1lBQzFCLElBQUksV0FBVyxDQUFDLEdBQUcsRUFBRTs7b0JBQ2IsWUFBWSxHQUFHLFdBQVcsQ0FBQyxHQUFHOztvQkFDOUIsV0FBVyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsV0FBVzs7b0JBQ3RDLFVBQVUsR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLFVBQVU7Z0JBRTFDLEtBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxLQUFLLFdBQVcsQ0FBQztnQkFDbEQsS0FBSSxDQUFDLFlBQVksR0FBRyxZQUFZLEtBQUssVUFBVSxDQUFDO2dCQUVoRCxJQUFJLEtBQUksQ0FBQyxhQUFhLEVBQUU7b0JBQ3RCLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7aUJBQ3BCO2FBQ0Y7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7O2dCQS9JRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLDQxQ0FBeUM7b0JBRXpDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPOztpQkFDakQ7Ozs7Z0JBUFEsV0FBVztnQkFGWCxhQUFhO2dCQUhiLE1BQU0sdUJBcUZWLFFBQVE7OztvQ0F2RVYsS0FBSzt5Q0FZTCxLQUFLOytCQVNMLEtBQUs7MENBU0wsS0FBSztnQ0FZTCxLQUFLOztJQStGUix3QkFBQztDQUFBLEFBaEpELElBZ0pDO1NBMUlZLGlCQUFpQjs7Ozs7O0lBVzVCLCtDQUFrQzs7Ozs7SUFTbEMsb0RBQXVDOzs7OztJQVN2QywwQ0FBNkI7Ozs7O0lBWTdCLHFEQUF5Qzs7Ozs7SUFZekMsMkNBQStCOztJQVEvQixvQ0FBNEI7O0lBQzVCLGlDQUFZOztJQUVaLG9DQUFzQjs7Ozs7SUFFdEIseUNBQThCOzs7OztJQUM5QiwwQ0FBK0I7O0lBRzdCLGlDQUF3Qjs7Ozs7SUFDeEIsbUNBQTZCOzs7OztJQUM3QixtQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBPbkluaXQsXHJcbiAgSW5wdXQsXHJcbiAgT3B0aW9uYWxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uU3RhcnQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IEF1dGhPcHRpb25zIH0gZnJvbSAnLi4vc2hhcmVkL2F1dGguaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvYXV0aC5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWF1dGgtZm9ybScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2F1dGgtZm9ybS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYXV0aC1mb3JtLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBdXRoRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KClcclxuICBnZXQgYmFja2dyb3VuZERpc2FibGUoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5pc0xvZ291dFJvdXRlIHx8IHRoaXMuaXNMb2dvdXRSb3V0ZSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fYmFja2dyb3VuZERpc2FibGU7XHJcbiAgfVxyXG4gIHNldCBiYWNrZ3JvdW5kRGlzYWJsZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fYmFja2dyb3VuZERpc2FibGUgPSB2YWx1ZS50b1N0cmluZygpID09PSAndHJ1ZSc7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2JhY2tncm91bmREaXNhYmxlID0gdHJ1ZTtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgaGFzQWxyZWFkeUNvbm5lY3RlZERpdigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9oYXNBbHJlYWR5Q29ubmVjdGVkRGl2O1xyXG4gIH1cclxuICBzZXQgaGFzQWxyZWFkeUNvbm5lY3RlZERpdih2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5faGFzQWxyZWFkeUNvbm5lY3RlZERpdiA9IHZhbHVlLnRvU3RyaW5nKCkgPT09ICd0cnVlJztcclxuICB9XHJcbiAgcHJpdmF0ZSBfaGFzQWxyZWFkeUNvbm5lY3RlZERpdiA9IHRydWU7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGhhc0xvZ291dERpdigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9oYXNMb2dvdXREaXY7XHJcbiAgfVxyXG4gIHNldCBoYXNMb2dvdXREaXYodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2hhc0xvZ291dERpdiA9IHZhbHVlLnRvU3RyaW5nKCkgPT09ICd0cnVlJztcclxuICB9XHJcbiAgcHJpdmF0ZSBfaGFzTG9nb3V0RGl2ID0gdHJ1ZTtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgc2hvd0FscmVhZHlDb25uZWN0ZWREaXYoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5pc0xvZ291dFJvdXRlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmhhc0FscmVhZHlDb25uZWN0ZWREaXY7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fc2hvd0FscmVhZHlDb25uZWN0ZWREaXY7XHJcbiAgfVxyXG4gIHNldCBzaG93QWxyZWFkeUNvbm5lY3RlZERpdih2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fc2hvd0FscmVhZHlDb25uZWN0ZWREaXYgPSB2YWx1ZS50b1N0cmluZygpID09PSAndHJ1ZSc7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3Nob3dBbHJlYWR5Q29ubmVjdGVkRGl2ID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHNob3dMb2dvdXREaXYoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5pc0xvZ291dFJvdXRlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmhhc0xvZ291dERpdjtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9zaG93TG9nb3V0RGl2O1xyXG4gIH1cclxuICBzZXQgc2hvd0xvZ291dERpdih2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fc2hvd0xvZ291dERpdiA9IHZhbHVlLnRvU3RyaW5nKCkgPT09ICd0cnVlJztcclxuICB9XHJcbiAgcHJpdmF0ZSBfc2hvd0xvZ291dERpdiA9IGZhbHNlO1xyXG5cclxuICBnZXQgc2hvd0xvZ2luRGl2KCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKCF0aGlzLmlzTG9nb3V0Um91dGUpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb3B0aW9uczogQXV0aE9wdGlvbnM7XHJcbiAgcHVibGljIHVzZXI7XHJcblxyXG4gIHB1YmxpYyB2aXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgcHJpdmF0ZSBpc0xvZ2luUm91dGU6IGJvb2xlYW47XHJcbiAgcHJpdmF0ZSBpc0xvZ291dFJvdXRlOiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBhdXRoOiBBdXRoU2VydmljZSxcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlLFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlclxyXG4gICkge1xyXG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdhdXRoJykgfHwge307XHJcbiAgICB0aGlzLnZpc2libGUgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzLm9wdGlvbnMpLmxlbmd0aCAhPT0gMDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuYW5hbHl6ZVJvdXRlKCk7XHJcbiAgICB0aGlzLmdldE5hbWUoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBsb2dpbigpIHtcclxuICAgIHRoaXMuYXV0aC5nb1RvUmVkaXJlY3RVcmwoKTtcclxuICAgIHRoaXMuZ2V0TmFtZSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGxvZ291dCgpIHtcclxuICAgIHRoaXMuYXV0aC5sb2dvdXQoKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLnVzZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgIGlmICh0aGlzLnJvdXRlcikge1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMubG9nb3V0Um91dGUpIHtcclxuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLm9wdGlvbnMubG9nb3V0Um91dGVdKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5ob21lUm91dGUpIHtcclxuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLm9wdGlvbnMuaG9tZVJvdXRlXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBob21lKCkge1xyXG4gICAgaWYgKHRoaXMucm91dGVyICYmIHRoaXMub3B0aW9ucy5ob21lUm91dGUpIHtcclxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMub3B0aW9ucy5ob21lUm91dGVdKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0TmFtZSgpIHtcclxuICAgIGlmICh0aGlzLmF1dGguZGVjb2RlVG9rZW4oKSkge1xyXG4gICAgICBjb25zdCB0b2tlbkRlY29kZWQgPSB0aGlzLmF1dGguZGVjb2RlVG9rZW4oKTtcclxuICAgICAgdGhpcy51c2VyID0ge1xyXG4gICAgICAgIG5hbWU6IHRva2VuRGVjb2RlZC51c2VyLmZpcnN0TmFtZSB8fCB0b2tlbkRlY29kZWQudXNlci5zb3VyY2VJZFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhbmFseXplUm91dGUoKSB7XHJcbiAgICBpZiAoIXRoaXMucm91dGVyKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJvdXRlci5ldmVudHNcclxuICAgICAgLnBpcGUoZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvblN0YXJ0KSlcclxuICAgICAgLnN1YnNjcmliZSgoY2hhbmdlRXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICAgIGlmIChjaGFuZ2VFdmVudC51cmwpIHtcclxuICAgICAgICAgIGNvbnN0IGN1cnJlbnRSb3V0ZSA9IGNoYW5nZUV2ZW50LnVybDtcclxuICAgICAgICAgIGNvbnN0IGxvZ291dFJvdXRlID0gdGhpcy5vcHRpb25zLmxvZ291dFJvdXRlO1xyXG4gICAgICAgICAgY29uc3QgbG9naW5Sb3V0ZSA9IHRoaXMub3B0aW9ucy5sb2dpblJvdXRlO1xyXG5cclxuICAgICAgICAgIHRoaXMuaXNMb2dvdXRSb3V0ZSA9IGN1cnJlbnRSb3V0ZSA9PT0gbG9nb3V0Um91dGU7XHJcbiAgICAgICAgICB0aGlzLmlzTG9naW5Sb3V0ZSA9IGN1cnJlbnRSb3V0ZSA9PT0gbG9naW5Sb3V0ZTtcclxuXHJcbiAgICAgICAgICBpZiAodGhpcy5pc0xvZ291dFJvdXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0aC5sb2dvdXQoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=