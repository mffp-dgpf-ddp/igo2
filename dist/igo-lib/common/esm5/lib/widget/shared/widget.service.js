/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { DynamicComponentService } from '../../dynamic-component/shared/dynamic-component.service';
import * as i0 from "@angular/core";
import * as i1 from "../../dynamic-component/shared/dynamic-component.service";
var WidgetService = /** @class */ (function () {
    function WidgetService(dynamicComponentService) {
        this.dynamicComponentService = dynamicComponentService;
    }
    /**
     * @param {?} widgetCls
     * @return {?}
     */
    WidgetService.prototype.create = /**
     * @param {?} widgetCls
     * @return {?}
     */
    function (widgetCls) {
        return this.dynamicComponentService.create((/** @type {?} */ (widgetCls)));
    };
    WidgetService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    WidgetService.ctorParameters = function () { return [
        { type: DynamicComponentService }
    ]; };
    /** @nocollapse */ WidgetService.ngInjectableDef = i0.defineInjectable({ factory: function WidgetService_Factory() { return new WidgetService(i0.inject(i1.DynamicComponentService)); }, token: WidgetService, providedIn: "root" });
    return WidgetService;
}());
export { WidgetService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    WidgetService.prototype.dynamicComponentService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvd2lkZ2V0L3NoYXJlZC93aWRnZXQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwREFBMEQsQ0FBQzs7O0FBS25HO0lBS0UsdUJBQW9CLHVCQUFnRDtRQUFoRCw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO0lBQUcsQ0FBQzs7Ozs7SUFFeEUsOEJBQU07Ozs7SUFBTixVQUFPLFNBQWM7UUFDbkIsT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLG1CQUFBLFNBQVMsRUFBbUIsQ0FBQyxDQUFDO0lBQzNFLENBQUM7O2dCQVRGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBUFEsdUJBQXVCOzs7d0JBRmhDO0NBaUJDLEFBVkQsSUFVQztTQVBZLGFBQWE7Ozs7OztJQUVaLGdEQUF3RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IER5bmFtaWNDb21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vZHluYW1pYy1jb21wb25lbnQvc2hhcmVkL2R5bmFtaWMtY29tcG9uZW50LnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgV2lkZ2V0IH0gZnJvbSAnLi93aWRnZXQnO1xyXG5pbXBvcnQgeyBXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL3dpZGdldC5pbnRlcmZhY2VzJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFdpZGdldFNlcnZpY2Uge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGR5bmFtaWNDb21wb25lbnRTZXJ2aWNlOiBEeW5hbWljQ29tcG9uZW50U2VydmljZSkge31cclxuXHJcbiAgY3JlYXRlKHdpZGdldENsczogYW55KTogV2lkZ2V0IHtcclxuICAgIHJldHVybiB0aGlzLmR5bmFtaWNDb21wb25lbnRTZXJ2aWNlLmNyZWF0ZSh3aWRnZXRDbHMgYXMgV2lkZ2V0Q29tcG9uZW50KTtcclxuICB9XHJcbn1cclxuIl19