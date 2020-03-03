/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { GestureConfig } from '@angular/material';
var IgoGestureConfig = /** @class */ (function (_super) {
    tslib_1.__extends(IgoGestureConfig, _super);
    function IgoGestureConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    IgoGestureConfig.prototype.buildHammer = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var mc = (/** @type {?} */ (_super.prototype.buildHammer.call(this, element)));
        mc.set({ touchAction: 'pan-y' });
        return mc;
    };
    IgoGestureConfig.decorators = [
        { type: Injectable }
    ];
    return IgoGestureConfig;
}(GestureConfig));
export { IgoGestureConfig };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VzdHVyZS5wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvcmUvIiwic291cmNlcyI6WyJsaWIvZ2VzdHVyZS9nZXN0dXJlLnByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFpQixNQUFNLG1CQUFtQixDQUFDO0FBRWpFO0lBQ3NDLDRDQUFhO0lBRG5EOztJQU9BLENBQUM7Ozs7O0lBTEMsc0NBQVc7Ozs7SUFBWCxVQUFZLE9BQW9COztZQUN4QixFQUFFLEdBQUcsbUJBQUEsaUJBQU0sV0FBVyxZQUFDLE9BQU8sQ0FBQyxFQUFpQjtRQUN0RCxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDakMsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDOztnQkFORixVQUFVOztJQU9YLHVCQUFDO0NBQUEsQUFQRCxDQUNzQyxhQUFhLEdBTWxEO1NBTlksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBHZXN0dXJlQ29uZmlnLCBIYW1tZXJNYW5hZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSWdvR2VzdHVyZUNvbmZpZyBleHRlbmRzIEdlc3R1cmVDb25maWcge1xyXG4gIGJ1aWxkSGFtbWVyKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XHJcbiAgICBjb25zdCBtYyA9IHN1cGVyLmJ1aWxkSGFtbWVyKGVsZW1lbnQpIGFzIEhhbW1lck1hbmFnZXI7XHJcbiAgICBtYy5zZXQoeyB0b3VjaEFjdGlvbjogJ3Bhbi15JyB9KTtcclxuICAgIHJldHVybiBtYztcclxuICB9XHJcbn1cclxuIl19