/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OverlayAction } from './overlay.enum';
import * as i0 from "@angular/core";
var OverlayService = /** @class */ (function () {
    function OverlayService() {
        this.features$ = new BehaviorSubject([
            [],
            undefined
        ]);
    }
    /**
     * @param {?} features
     * @param {?=} action
     * @return {?}
     */
    OverlayService.prototype.setFeatures = /**
     * @param {?} features
     * @param {?=} action
     * @return {?}
     */
    function (features, action) {
        if (action === void 0) { action = OverlayAction.None; }
        this.features$.next([features, action]);
    };
    /**
     * @return {?}
     */
    OverlayService.prototype.clear = /**
     * @return {?}
     */
    function () {
        this.features$.next([[], OverlayAction.None]);
    };
    OverlayService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    OverlayService.ctorParameters = function () { return []; };
    /** @nocollapse */ OverlayService.ngInjectableDef = i0.defineInjectable({ factory: function OverlayService_Factory() { return new OverlayService(); }, token: OverlayService, providedIn: "root" });
    return OverlayService;
}());
export { OverlayService };
if (false) {
    /** @type {?} */
    OverlayService.prototype.features$;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL292ZXJsYXkvc2hhcmVkL292ZXJsYXkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBSXZDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFL0M7SUFTRTtRQUxPLGNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBNkI7WUFDakUsRUFBRTtZQUNGLFNBQVM7U0FDVixDQUFDLENBQUM7SUFFWSxDQUFDOzs7Ozs7SUFFaEIsb0NBQVc7Ozs7O0lBQVgsVUFBWSxRQUFtQixFQUFFLE1BQTBDO1FBQTFDLHVCQUFBLEVBQUEsU0FBd0IsYUFBYSxDQUFDLElBQUk7UUFDekUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUMxQyxDQUFDOzs7O0lBRUQsOEJBQUs7OztJQUFMO1FBQ0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7Z0JBakJGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7O3lCQVREO0NBeUJDLEFBbEJELElBa0JDO1NBZlksY0FBYzs7O0lBQ3pCLG1DQUdHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEZlYXR1cmUgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLmludGVyZmFjZXMnO1xyXG5cclxuaW1wb3J0IHsgT3ZlcmxheUFjdGlvbiB9IGZyb20gJy4vb3ZlcmxheS5lbnVtJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE92ZXJsYXlTZXJ2aWNlIHtcclxuICBwdWJsaWMgZmVhdHVyZXMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxbRmVhdHVyZVtdLCBPdmVybGF5QWN0aW9uXT4oW1xyXG4gICAgW10sXHJcbiAgICB1bmRlZmluZWRcclxuICBdKTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBzZXRGZWF0dXJlcyhmZWF0dXJlczogRmVhdHVyZVtdLCBhY3Rpb246IE92ZXJsYXlBY3Rpb24gPSBPdmVybGF5QWN0aW9uLk5vbmUpIHtcclxuICAgIHRoaXMuZmVhdHVyZXMkLm5leHQoW2ZlYXR1cmVzLCBhY3Rpb25dKTtcclxuICB9XHJcblxyXG4gIGNsZWFyKCkge1xyXG4gICAgdGhpcy5mZWF0dXJlcyQubmV4dChbW10sIE92ZXJsYXlBY3Rpb24uTm9uZV0pO1xyXG4gIH1cclxufVxyXG4iXX0=