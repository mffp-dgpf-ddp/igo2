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
export class DynamicComponentService {
    /**
     * @param {?} resolver
     */
    constructor(resolver) {
        this.resolver = resolver;
    }
    /**
     * Creates a DynamicComponent instance from a base component class
     * @param {?} componentCls The component class
     * @return {?} DynamicComponent instance
     */
    create(componentCls) {
        /** @type {?} */
        const factory = this.resolver.resolveComponentFactory((/** @type {?} */ (componentCls)));
        return new DynamicComponent(factory);
    }
}
DynamicComponentService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
DynamicComponentService.ctorParameters = () => [
    { type: ComponentFactoryResolver }
];
/** @nocollapse */ DynamicComponentService.ngInjectableDef = i0.defineInjectable({ factory: function DynamicComponentService_Factory() { return new DynamicComponentService(i0.inject(i0.ComponentFactoryResolver)); }, token: DynamicComponentService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    DynamicComponentService.prototype.resolver;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1jb21wb25lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9keW5hbWljLWNvbXBvbmVudC9zaGFyZWQvZHluYW1pYy1jb21wb25lbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLHdCQUF3QixFQUN4QixVQUFVLEVBQ1gsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7O0FBUXZELE1BQU0sT0FBTyx1QkFBdUI7Ozs7SUFFbEMsWUFBb0IsUUFBa0M7UUFBbEMsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7SUFBRyxDQUFDOzs7Ozs7SUFPMUQsTUFBTSxDQUFDLFlBQWlCOztjQUNoQixPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxtQkFBQSxZQUFZLEVBQU8sQ0FBQztRQUMxRSxPQUFPLElBQUksZ0JBQWdCLENBQXNCLE9BQU8sQ0FBQyxDQUFDO0lBQzVELENBQUM7OztZQWZGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQVhDLHdCQUF3Qjs7Ozs7Ozs7SUFjWiwyQ0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICBJbmplY3RhYmxlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBEeW5hbWljQ29tcG9uZW50IH0gZnJvbSAnLi9keW5hbWljLWNvbXBvbmVudCc7XHJcblxyXG4vKipcclxuICogU2VydmljZSB0byBjcmVhdGVzIER5bmFtaWNDb21wb25lbnQgaW5zdGFuY2VzIGZyb20gYmFzZSBjb21wb25lbnQgY2xhc3Nlc1xyXG4gKi9cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRHluYW1pY0NvbXBvbmVudFNlcnZpY2Uge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBEeW5hbWljQ29tcG9uZW50IGluc3RhbmNlIGZyb20gYSBiYXNlIGNvbXBvbmVudCBjbGFzc1xyXG4gICAqIEBwYXJhbSBjb21wb25lbnRDbHMgVGhlIGNvbXBvbmVudCBjbGFzc1xyXG4gICAqIEByZXR1cm5zIER5bmFtaWNDb21wb25lbnQgaW5zdGFuY2VcclxuICAgKi9cclxuICBjcmVhdGUoY29tcG9uZW50Q2xzOiBhbnkpOiBEeW5hbWljQ29tcG9uZW50PGFueT4ge1xyXG4gICAgY29uc3QgZmFjdG9yeSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50Q2xzIGFzIGFueSk7XHJcbiAgICByZXR1cm4gbmV3IER5bmFtaWNDb21wb25lbnQ8dHlwZW9mIGNvbXBvbmVudENscz4oZmFjdG9yeSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==