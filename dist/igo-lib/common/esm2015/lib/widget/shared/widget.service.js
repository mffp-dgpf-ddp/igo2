/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { DynamicComponentService } from '../../dynamic-component/shared/dynamic-component.service';
import * as i0 from "@angular/core";
import * as i1 from "../../dynamic-component/shared/dynamic-component.service";
export class WidgetService {
    /**
     * @param {?} dynamicComponentService
     */
    constructor(dynamicComponentService) {
        this.dynamicComponentService = dynamicComponentService;
    }
    /**
     * @param {?} widgetCls
     * @return {?}
     */
    create(widgetCls) {
        return this.dynamicComponentService.create((/** @type {?} */ (widgetCls)));
    }
}
WidgetService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
WidgetService.ctorParameters = () => [
    { type: DynamicComponentService }
];
/** @nocollapse */ WidgetService.ngInjectableDef = i0.defineInjectable({ factory: function WidgetService_Factory() { return new WidgetService(i0.inject(i1.DynamicComponentService)); }, token: WidgetService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    WidgetService.prototype.dynamicComponentService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvd2lkZ2V0L3NoYXJlZC93aWRnZXQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwREFBMEQsQ0FBQzs7O0FBUW5HLE1BQU0sT0FBTyxhQUFhOzs7O0lBRXhCLFlBQW9CLHVCQUFnRDtRQUFoRCw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO0lBQUcsQ0FBQzs7Ozs7SUFFeEUsTUFBTSxDQUFDLFNBQWM7UUFDbkIsT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLG1CQUFBLFNBQVMsRUFBbUIsQ0FBQyxDQUFDO0lBQzNFLENBQUM7OztZQVRGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQVBRLHVCQUF1Qjs7Ozs7Ozs7SUFVbEIsZ0RBQXdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRHluYW1pY0NvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9keW5hbWljLWNvbXBvbmVudC9zaGFyZWQvZHluYW1pYy1jb21wb25lbnQuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBXaWRnZXQgfSBmcm9tICcuL3dpZGdldCc7XHJcbmltcG9ydCB7IFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4vd2lkZ2V0LmludGVyZmFjZXMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgV2lkZ2V0U2VydmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZHluYW1pY0NvbXBvbmVudFNlcnZpY2U6IER5bmFtaWNDb21wb25lbnRTZXJ2aWNlKSB7fVxyXG5cclxuICBjcmVhdGUod2lkZ2V0Q2xzOiBhbnkpOiBXaWRnZXQge1xyXG4gICAgcmV0dXJuIHRoaXMuZHluYW1pY0NvbXBvbmVudFNlcnZpY2UuY3JlYXRlKHdpZGdldENscyBhcyBXaWRnZXRDb21wb25lbnQpO1xyXG4gIH1cclxufVxyXG4iXX0=