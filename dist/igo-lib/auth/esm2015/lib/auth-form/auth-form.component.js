/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ChangeDetectionStrategy, Input, Optional } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ConfigService } from '@igo2/core';
import { AuthService } from '../shared/auth.service';
export class AuthFormComponent {
    /**
     * @param {?} auth
     * @param {?} config
     * @param {?} router
     */
    constructor(auth, config, router) {
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
    /**
     * @return {?}
     */
    get backgroundDisable() {
        if (this.isLogoutRoute || this.isLogoutRoute) {
            return false;
        }
        return this._backgroundDisable;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set backgroundDisable(value) {
        this._backgroundDisable = value.toString() === 'true';
    }
    /**
     * @return {?}
     */
    get hasAlreadyConnectedDiv() {
        return this._hasAlreadyConnectedDiv;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set hasAlreadyConnectedDiv(value) {
        this._hasAlreadyConnectedDiv = value.toString() === 'true';
    }
    /**
     * @return {?}
     */
    get hasLogoutDiv() {
        return this._hasLogoutDiv;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set hasLogoutDiv(value) {
        this._hasLogoutDiv = value.toString() === 'true';
    }
    /**
     * @return {?}
     */
    get showAlreadyConnectedDiv() {
        if (this.isLogoutRoute) {
            return this.hasAlreadyConnectedDiv;
        }
        return this._showAlreadyConnectedDiv;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showAlreadyConnectedDiv(value) {
        this._showAlreadyConnectedDiv = value.toString() === 'true';
    }
    /**
     * @return {?}
     */
    get showLogoutDiv() {
        if (this.isLogoutRoute) {
            return this.hasLogoutDiv;
        }
        return this._showLogoutDiv;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showLogoutDiv(value) {
        this._showLogoutDiv = value.toString() === 'true';
    }
    /**
     * @return {?}
     */
    get showLoginDiv() {
        if (!this.isLogoutRoute) {
            return true;
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.analyzeRoute();
        this.getName();
    }
    /**
     * @return {?}
     */
    login() {
        this.auth.goToRedirectUrl();
        this.getName();
    }
    /**
     * @return {?}
     */
    logout() {
        this.auth.logout().subscribe((/**
         * @return {?}
         */
        () => {
            this.user = undefined;
            if (this.router) {
                if (this.options.logoutRoute) {
                    this.router.navigate([this.options.logoutRoute]);
                }
                else if (this.options.homeRoute) {
                    this.router.navigate([this.options.homeRoute]);
                }
            }
        }));
    }
    /**
     * @return {?}
     */
    home() {
        if (this.router && this.options.homeRoute) {
            this.router.navigate([this.options.homeRoute]);
        }
    }
    /**
     * @private
     * @return {?}
     */
    getName() {
        if (this.auth.decodeToken()) {
            /** @type {?} */
            const tokenDecoded = this.auth.decodeToken();
            this.user = {
                name: tokenDecoded.user.firstName || tokenDecoded.user.sourceId
            };
        }
    }
    /**
     * @private
     * @return {?}
     */
    analyzeRoute() {
        if (!this.router) {
            return;
        }
        this.router.events
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => event instanceof NavigationStart)))
            .subscribe((/**
         * @param {?} changeEvent
         * @return {?}
         */
        (changeEvent) => {
            if (changeEvent.url) {
                /** @type {?} */
                const currentRoute = changeEvent.url;
                /** @type {?} */
                const logoutRoute = this.options.logoutRoute;
                /** @type {?} */
                const loginRoute = this.options.loginRoute;
                this.isLogoutRoute = currentRoute === logoutRoute;
                this.isLoginRoute = currentRoute === loginRoute;
                if (this.isLogoutRoute) {
                    this.auth.logout();
                }
            }
        }));
    }
}
AuthFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-auth-form',
                template: "<div *ngIf=\"visible\">\r\n  <div *ngIf=\"!auth.logged && backgroundDisable\" class=\"backgroundDisable\"></div>\r\n\r\n  <div *ngIf=\"!auth.logged && showLoginDiv\" class=\"login center-block\">\r\n    <h1>{{'igo.auth.connection' | translate}}</h1>\r\n\r\n    <igo-auth-google\r\n      *ngIf=\"options.google && options.google.enabled !== false\"\r\n      (login)=\"login()\">\r\n    </igo-auth-google>\r\n    <igo-auth-facebook\r\n      *ngIf=\"options.facebook && options.facebook.enabled !== false\"\r\n      (login)=\"login()\">\r\n    </igo-auth-facebook>\r\n    <igo-auth-intern\r\n      *ngIf=\"!options.intern || options.intern.enabled !== false\"\r\n      [allowAnonymous]=\"options.allowAnonymous\"\r\n      (login)=\"login()\">\r\n    </igo-auth-intern>\r\n  </div>\r\n\r\n  <div *ngIf=\"auth.logged && showAlreadyConnectedDiv\" class=\"login center-block\">\r\n    <p>{{'igo.auth.welcome' |\u00A0translate: user}}</p>\r\n    <button mat-raised-button type=\"button\" (click)=\"logout()\">{{'igo.auth.signOut' |\u00A0translate}}</button>\r\n  </div>\r\n\r\n  <div *ngIf=\"showLogoutDiv\" class=\"login center-block\">\r\n    <p>{{'igo.auth.deconnection' |\u00A0translate}}</p>\r\n    <button *ngIf=\"options.homeRoute\" mat-raised-button type=\"button\" (click)=\"home()\">{{'igo.auth.home' |\u00A0translate}}</button>\r\n  </div>\r\n\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.Default,
                styles: [":host{z-index:999}div.login{z-index:200;width:90%;min-width:360px;max-width:600px;padding:25px 50px;border:1px solid #888;background-color:#fff}.center-block{position:fixed;top:20%;left:50%;-webkit-transform:translate(-50%,0);transform:translate(-50%,0)}.backgroundDisable{position:fixed;top:0;left:0;background:#000;opacity:.8;z-index:100;height:100%;width:100%}"]
            }] }
];
/** @nocollapse */
AuthFormComponent.ctorParameters = () => [
    { type: AuthService },
    { type: ConfigService },
    { type: Router, decorators: [{ type: Optional }] }
];
AuthFormComponent.propDecorators = {
    backgroundDisable: [{ type: Input }],
    hasAlreadyConnectedDiv: [{ type: Input }],
    hasLogoutDiv: [{ type: Input }],
    showAlreadyConnectedDiv: [{ type: Input }],
    showLogoutDiv: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2F1dGgvIiwic291cmNlcyI6WyJsaWIvYXV0aC1mb3JtL2F1dGgtZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsdUJBQXVCLEVBRXZCLEtBQUssRUFDTCxRQUFRLEVBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUUzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFRckQsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7O0lBcUU1QixZQUNTLElBQWlCLEVBQ2hCLE1BQXFCLEVBQ1QsTUFBYztRQUYzQixTQUFJLEdBQUosSUFBSSxDQUFhO1FBQ2hCLFdBQU0sR0FBTixNQUFNLENBQWU7UUFDVCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBN0Q1Qix1QkFBa0IsR0FBRyxJQUFJLENBQUM7UUFTMUIsNEJBQXVCLEdBQUcsSUFBSSxDQUFDO1FBUy9CLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBWXJCLDZCQUF3QixHQUFHLEtBQUssQ0FBQztRQVlqQyxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQVd4QixZQUFPLEdBQUcsSUFBSSxDQUFDO1FBVXBCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25ELElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO0lBQ3ZFLENB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QUMsQ0FBQztJQUNQLENBQUM7OztZQS9JRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLDQxQ0FBeUM7Z0JBRXpDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPOzthQUNqRDs7OztZQVBRLFdBQVc7WUFGWCxhQUFhO1lBSGIsTUFBTSx1QkFxRlYsUUFBUTs7O2dDQXZFVixLQUFLO3FDQVlMLEtBQUs7MkJBU0wsS0FBSztzQ0FTTCxLQUFLOzRCQVlMLEtBQUs7Ozs7Ozs7SUFoQ04sK0NBQWtDOzs7OztJQVNsQyxvREFBdUM7Ozs7O0lBU3ZDLDBDQUE2Qjs7Ozs7SUFZN0IscURBQXlDOzs7OztJQVl6QywyQ0FBK0I7O0lBUS9CLG9DQUE0Qjs7SUFDNUIsaUNBQVk7O0lBRVosb0NBQXNCOzs7OztJQUV0Qix5Q0FBOEI7Ozs7O0lBQzlCLDBDQUErQjs7SUFHN0IsaUNBQXdCOzs7OztJQUN4QixtQ0FBNkI7Ozs7O0lBQzdCLG1DQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIE9uSW5pdCxcclxuICBJbnB1dCxcclxuICBPcHRpb25hbFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25TdGFydCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgQXV0aE9wdGlvbnMgfSBmcm9tICcuLi9zaGFyZWQvYXV0aC5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9hdXRoLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tYXV0aC1mb3JtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXV0aC1mb3JtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hdXRoLWZvcm0uY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcclxufSlcclxuZXhwb3J0IGNsYXNzIEF1dGhGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKVxyXG4gIGdldCBiYWNrZ3JvdW5kRGlzYWJsZSgpOiBib29sZWFuIHtcclxuICAgIGlmICh0aGlzLmlzTG9nb3V0Um91dGUgfHwgdGhpcy5pc0xvZ291dFJvdXRlKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9iYWNrZ3JvdW5kRGlzYWJsZTtcclxuICB9XHJcbiAgc2V0IGJhY2tncm91bmREaXNhYmxlKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9iYWNrZ3JvdW5kRGlzYWJsZSA9IHZhbHVlLnRvU3RyaW5nKCkgPT09ICd0cnVlJztcclxuICB9XHJcbiAgcHJpdmF0ZSBfYmFja2dyb3VuZERpc2FibGUgPSB0cnVlO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBoYXNBbHJlYWR5Q29ubmVjdGVkRGl2KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2hhc0FscmVhZHlDb25uZWN0ZWREaXY7XHJcbiAgfVxyXG4gIHNldCBoYXNBbHJlYWR5Q29ubmVjdGVkRGl2KHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9oYXNBbHJlYWR5Q29ubmVjdGVkRGl2ID0gdmFsdWUudG9TdHJpbmcoKSA9PT0gJ3RydWUnO1xyXG4gIH1cclxuICBwcml2YXRlIF9oYXNBbHJlYWR5Q29ubmVjdGVkRGl2ID0gdHJ1ZTtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgaGFzTG9nb3V0RGl2KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2hhc0xvZ291dERpdjtcclxuICB9XHJcbiAgc2V0IGhhc0xvZ291dERpdih2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5faGFzTG9nb3V0RGl2ID0gdmFsdWUudG9TdHJpbmcoKSA9PT0gJ3RydWUnO1xyXG4gIH1cclxuICBwcml2YXRlIF9oYXNMb2dvdXREaXYgPSB0cnVlO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBzaG93QWxyZWFkeUNvbm5lY3RlZERpdigpOiBib29sZWFuIHtcclxuICAgIGlmICh0aGlzLmlzTG9nb3V0Um91dGUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaGFzQWxyZWFkeUNvbm5lY3RlZERpdjtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9zaG93QWxyZWFkeUNvbm5lY3RlZERpdjtcclxuICB9XHJcbiAgc2V0IHNob3dBbHJlYWR5Q29ubmVjdGVkRGl2KHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9zaG93QWxyZWFkeUNvbm5lY3RlZERpdiA9IHZhbHVlLnRvU3RyaW5nKCkgPT09ICd0cnVlJztcclxuICB9XHJcbiAgcHJpdmF0ZSBfc2hvd0FscmVhZHlDb25uZWN0ZWREaXYgPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgc2hvd0xvZ291dERpdigpOiBib29sZWFuIHtcclxuICAgIGlmICh0aGlzLmlzTG9nb3V0Um91dGUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaGFzTG9nb3V0RGl2O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX3Nob3dMb2dvdXREaXY7XHJcbiAgfVxyXG4gIHNldCBzaG93TG9nb3V0RGl2KHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9zaG93TG9nb3V0RGl2ID0gdmFsdWUudG9TdHJpbmcoKSA9PT0gJ3RydWUnO1xyXG4gIH1cclxuICBwcml2YXRlIF9zaG93TG9nb3V0RGl2ID0gZmFsc2U7XHJcblxyXG4gIGdldCBzaG93TG9naW5EaXYoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIXRoaXMuaXNMb2dvdXRSb3V0ZSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBvcHRpb25zOiBBdXRoT3B0aW9ucztcclxuICBwdWJsaWMgdXNlcjtcclxuXHJcbiAgcHVibGljIHZpc2libGUgPSB0cnVlO1xyXG5cclxuICBwcml2YXRlIGlzTG9naW5Sb3V0ZTogYm9vbGVhbjtcclxuICBwcml2YXRlIGlzTG9nb3V0Um91dGU6IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGF1dGg6IEF1dGhTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UsXHJcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJvdXRlcjogUm91dGVyXHJcbiAgKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmNvbmZpZy5nZXRDb25maWcoJ2F1dGgnKSB8fCB7fTtcclxuICAgIHRoaXMudmlzaWJsZSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMub3B0aW9ucykubGVuZ3RoICE9PSAwO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5hbmFseXplUm91dGUoKTtcclxuICAgIHRoaXMuZ2V0TmFtZSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGxvZ2luKCkge1xyXG4gICAgdGhpcy5hdXRoLmdvVG9SZWRpcmVjdFVybCgpO1xyXG4gICAgdGhpcy5nZXROYW1lKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbG9nb3V0KCkge1xyXG4gICAgdGhpcy5hdXRoLmxvZ291dCgpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMudXNlciA9IHVuZGVmaW5lZDtcclxuICAgICAgaWYgKHRoaXMucm91dGVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5sb2dvdXRSb3V0ZSkge1xyXG4gICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMub3B0aW9ucy5sb2dvdXRSb3V0ZV0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLmhvbWVSb3V0ZSkge1xyXG4gICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMub3B0aW9ucy5ob21lUm91dGVdKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGhvbWUoKSB7XHJcbiAgICBpZiAodGhpcy5yb3V0ZXIgJiYgdGhpcy5vcHRpb25zLmhvbWVSb3V0ZSkge1xyXG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5vcHRpb25zLmhvbWVSb3V0ZV0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXROYW1lKCkge1xyXG4gICAgaWYgKHRoaXMuYXV0aC5kZWNvZGVUb2tlbigpKSB7XHJcbiAgICAgIGNvbnN0IHRva2VuRGVjb2RlZCA9IHRoaXMuYXV0aC5kZWNvZGVUb2tlbigpO1xyXG4gICAgICB0aGlzLnVzZXIgPSB7XHJcbiAgICAgICAgbmFtZTogdG9rZW5EZWNvZGVkLnVzZXIuZmlyc3ROYW1lIHx8IHRva2VuRGVjb2RlZC51c2VyLnNvdXJjZUlkXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFuYWx5emVSb3V0ZSgpIHtcclxuICAgIGlmICghdGhpcy5yb3V0ZXIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucm91dGVyLmV2ZW50c1xyXG4gICAgICAucGlwZShmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uU3RhcnQpKVxyXG4gICAgICAuc3Vic2NyaWJlKChjaGFuZ2VFdmVudDogYW55KSA9PiB7XHJcbiAgICAgICAgaWYgKGNoYW5nZUV2ZW50LnVybCkge1xyXG4gICAgICAgICAgY29uc3QgY3VycmVudFJvdXRlID0gY2hhbmdlRXZlbnQudXJsO1xyXG4gICAgICAgICAgY29uc3QgbG9nb3V0Um91dGUgPSB0aGlzLm9wdGlvbnMubG9nb3V0Um91dGU7XHJcbiAgICAgICAgICBjb25zdCBsb2dpblJvdXRlID0gdGhpcy5vcHRpb25zLmxvZ2luUm91dGU7XHJcblxyXG4gICAgICAgICAgdGhpcy5pc0xvZ291dFJvdXRlID0gY3VycmVudFJvdXRlID09PSBsb2dvdXRSb3V0ZTtcclxuICAgICAgICAgIHRoaXMuaXNMb2dpblJvdXRlID0gY3VycmVudFJvdXRlID09PSBsb2dpblJvdXRlO1xyXG5cclxuICAgICAgICAgIGlmICh0aGlzLmlzTG9nb3V0Um91dGUpIHtcclxuICAgICAgICAgICAgdGhpcy5hdXRoLmxvZ291dCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==