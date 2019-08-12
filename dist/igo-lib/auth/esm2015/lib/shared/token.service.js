/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Injector } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { ConfigService } from '@igo2/core';
import * as i0 from "@angular/core";
export class TokenService {
    /**
     * @param {?} injector
     */
    constructor(injector) {
        this.injector = injector;
    }
    /**
     * @param {?} token
     * @return {?}
     */
    set(token) {
        localStorage.setItem(this.tokenKey, token);
    }
    /**
     * @return {?}
     */
    remove() {
        localStorage.removeItem(this.tokenKey);
    }
    /**
     * @return {?}
     */
    get() {
        return localStorage.getItem(this.tokenKey);
    }
    /**
     * @return {?}
     */
    decode() {
        /** @type {?} */
        const token = this.get();
        if (!token) {
            return;
        }
        return jwtDecode(token);
    }
    /**
     * @return {?}
     */
    isExpired() {
        /** @type {?} */
        const jwt = this.decode();
        /** @type {?} */
        const currentTime = new Date().getTime() / 1000;
        if (jwt && currentTime < jwt.exp) {
            return false;
        }
        return true;
    }
    /**
     * @private
     * @return {?}
     */
    get tokenKey() {
        /** @type {?} */
        const config = this.injector.get(ConfigService);
        this.options = config.getConfig('auth') || {};
        return this.options.tokenKey;
    }
}
TokenService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
TokenService.ctorParameters = () => [
    { type: Injector }
];
/** @nocollapse */ TokenService.ngInjectableDef = i0.defineInjectable({ factory: function TokenService_Factory() { return new TokenService(i0.inject(i0.INJECTOR)); }, token: TokenService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2F1dGgvIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL3Rva2VuLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sU0FBUyxNQUFNLFlBQVksQ0FBQztBQUVuQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDOztBQU0zQyxNQUFNLE9BQU8sWUFBWTs7OztJQUd2QixZQUFvQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQUcsQ0FBQzs7Ozs7SUFFMUMsR0FBRyxDQUFDLEtBQUs7UUFDUCxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7OztJQUVELE1BQU07UUFDSixZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN6QyxDQUFDOzs7O0lBRUQsR0FBRztRQUNELE9BQU8sWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7OztJQUVELE1BQU07O2NBQ0UsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDeEIsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLE9BQU87U0FDUjtRQUNELE9BQU8sU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7Ozs7SUFFRCxTQUFTOztjQUNELEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFOztjQUNuQixXQUFXLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJO1FBQy9DLElBQUksR0FBRyxJQUFJLFdBQVcsR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFO1lBQ2hDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7O0lBRUQsSUFBWSxRQUFROztjQUNaLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7UUFDL0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM5QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO0lBQy9CLENBQUM7OztZQXpDRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFSb0IsUUFBUTs7Ozs7Ozs7SUFVM0IsK0JBQTZCOzs7OztJQUVqQixnQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgand0RGVjb2RlIGZyb20gJ2p3dC1kZWNvZGUnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBBdXRoT3B0aW9ucyB9IGZyb20gJy4vYXV0aC5pbnRlcmZhY2UnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVG9rZW5TZXJ2aWNlIHtcclxuICBwcml2YXRlIG9wdGlvbnM6IEF1dGhPcHRpb25zO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge31cclxuXHJcbiAgc2V0KHRva2VuKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLnRva2VuS2V5LCB0b2tlbik7XHJcbiAgfVxyXG5cclxuICByZW1vdmUoKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLnRva2VuS2V5KTtcclxuICB9XHJcblxyXG4gIGdldCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMudG9rZW5LZXkpO1xyXG4gIH1cclxuXHJcbiAgZGVjb2RlKCkge1xyXG4gICAgY29uc3QgdG9rZW4gPSB0aGlzLmdldCgpO1xyXG4gICAgaWYgKCF0b2tlbikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gand0RGVjb2RlKHRva2VuKTtcclxuICB9XHJcblxyXG4gIGlzRXhwaXJlZCgpIHtcclxuICAgIGNvbnN0IGp3dCA9IHRoaXMuZGVjb2RlKCk7XHJcbiAgICBjb25zdCBjdXJyZW50VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMDtcclxuICAgIGlmIChqd3QgJiYgY3VycmVudFRpbWUgPCBqd3QuZXhwKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXQgdG9rZW5LZXkoKSB7XHJcbiAgICBjb25zdCBjb25maWcgPSB0aGlzLmluamVjdG9yLmdldChDb25maWdTZXJ2aWNlKTtcclxuICAgIHRoaXMub3B0aW9ucyA9IGNvbmZpZy5nZXRDb25maWcoJ2F1dGgnKSB8fCB7fTtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMudG9rZW5LZXk7XHJcbiAgfVxyXG59XHJcbiJdfQ==