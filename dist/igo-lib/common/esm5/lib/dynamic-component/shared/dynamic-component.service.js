/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { DynamicComponent } from './dynamic-component';
import * as i0 from "@angular/core";
/**
 * Service to creates DynamicComponent instances from base component classes
 */
var DynamicComponentService = /** @class */ (function () {
    function DynamicComponentService(resolver) {
        this.resolver = resolver;
    }
    /**
     * Creates a DynamicComponent instance from a base component class
     * @param componentCls The component class
     * @returns DynamicComponent instance
     */
    /**
     * Creates a DynamicComponent instance from a base component class
     * @param {?} componentCls The component class
     * @return {?} DynamicComponent instance
     */
    DynamicComponentService.prototype.create = /**
     * Creates a DynamicComponent instance from a base component class
     * @param {?} componentCls The component class
     * @return {?} DynamicComponent instance
     */
    function (componentCls) {
        /** @type {?} */
        var factory = this.resolver.resolveComponentFactory((/** @type {?} */ (componentCls)));
        return new DynamicComponent(factory);
    };
    DynamicComponentService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    DynamicComponentService.ctorParameters = function () { return [
        { type: ComponentFactoryResolver }
    ]; };
    /** @nocollapse */ DynamicComponentService.ngInjectableDef = i0.defineInjectable({ factory: function DynamicComponentService_Factory() { return new DynamicComponentService(i0.inject(i0.ComponentFactoryResolver)); }, token: DynamicComponentService, providedIn: "root" });
    return DynamicComponentService;
}());
export { DynamicComponentService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DynamicComponentService.prototype.resolver;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1jb21wb25lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9keW5hbWljLWNvbXBvbmVudC9zaGFyZWQvZHluYW1pYy1jb21wb25lbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLHdCQUF3QixFQUN4QixVQUFVLEVBQ1gsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7O0FBS3ZEO0lBS0UsaUNBQW9CLFFBQWtDO1FBQWxDLGFBQVEsR0FBUixRQUFRLENBQTBCO0lBQUcsQ0FBQztJQUUxRDs7OztPQUlHOzs7Ozs7SUFDSCx3Q0FBTTs7Ozs7SUFBTixVQUFPLFlBQWlCOztZQUNoQixPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxtQkFBQSxZQUFZLEVBQU8sQ0FBQztRQUMxRSxPQUFPLElBQUksZ0JBQWdCLENBQXNCLE9BQU8sQ0FBQyxDQUFDO0lBQzVELENBQUM7O2dCQWZGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBWEMsd0JBQXdCOzs7a0NBRDFCO0NBMEJDLEFBaEJELElBZ0JDO1NBYlksdUJBQXVCOzs7Ozs7SUFFdEIsMkNBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgSW5qZWN0YWJsZVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRHluYW1pY0NvbXBvbmVudCB9IGZyb20gJy4vZHluYW1pYy1jb21wb25lbnQnO1xyXG5cclxuLyoqXHJcbiAqIFNlcnZpY2UgdG8gY3JlYXRlcyBEeW5hbWljQ29tcG9uZW50IGluc3RhbmNlcyBmcm9tIGJhc2UgY29tcG9uZW50IGNsYXNzZXNcclxuICovXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIER5bmFtaWNDb21wb25lbnRTZXJ2aWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgRHluYW1pY0NvbXBvbmVudCBpbnN0YW5jZSBmcm9tIGEgYmFzZSBjb21wb25lbnQgY2xhc3NcclxuICAgKiBAcGFyYW0gY29tcG9uZW50Q2xzIFRoZSBjb21wb25lbnQgY2xhc3NcclxuICAgKiBAcmV0dXJucyBEeW5hbWljQ29tcG9uZW50IGluc3RhbmNlXHJcbiAgICovXHJcbiAgY3JlYXRlKGNvbXBvbmVudENsczogYW55KTogRHluYW1pY0NvbXBvbmVudDxhbnk+IHtcclxuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudENscyBhcyBhbnkpO1xyXG4gICAgcmV0dXJuIG5ldyBEeW5hbWljQ29tcG9uZW50PHR5cGVvZiBjb21wb25lbnRDbHM+KGZhY3RvcnkpO1xyXG4gIH1cclxufVxyXG4iXX0=