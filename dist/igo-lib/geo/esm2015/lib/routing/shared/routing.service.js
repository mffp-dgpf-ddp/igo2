/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { RoutingSourceService } from './routing-source.service';
import * as i0 from "@angular/core";
import * as i1 from "./routing-source.service";
export class RoutingService {
    /**
     * @param {?} routingSourceService
     */
    constructor(routingSourceService) {
        this.routingSourceService = routingSourceService;
    }
    /**
     * @param {?} coordinates
     * @return {?}
     */
    route(coordinates) {
        if (coordinates.length === 0) {
            return;
        }
        return this.routingSourceService.sources
            .filter((/**
         * @param {?} source
         * @return {?}
         */
        (source) => source.enabled))
            .map((/**
         * @param {?} source
         * @return {?}
         */
        (source) => this.routeSource(source, coordinates)));
    }
    /**
     * @param {?} source
     * @param {?} coordinates
     * @return {?}
     */
    routeSource(source, coordinates) {
        /** @type {?} */
        const request = source.route(coordinates);
        return request;
    }
}
RoutingService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
RoutingService.ctorParameters = () => [
    { type: RoutingSourceService }
];
/** @nocollapse */ RoutingService.ngInjectableDef = i0.defineInjectable({ factory: function RoutingService_Factory() { return new RoutingService(i0.inject(i1.RoutingSourceService)); }, token: RoutingService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    RoutingService.prototype.routingSourceService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3JvdXRpbmcvc2hhcmVkL3JvdXRpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU8zQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7O0FBS2hFLE1BQU0sT0FBTyxjQUFjOzs7O0lBQ3pCLFlBQW9CLG9CQUEwQztRQUExQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO0lBQUcsQ0FBQzs7Ozs7SUFFbEUsS0FBSyxDQUFDLFdBQStCO1FBQ25DLElBQUksV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDNUIsT0FBTztTQUNSO1FBQ0QsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTzthQUNyQyxNQUFNOzs7O1FBQUMsQ0FBQyxNQUFxQixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDO2FBQ2pELEdBQUc7Ozs7UUFBQyxDQUFDLE1BQXFCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxFQUFDLENBQUM7SUFDM0UsQ0FBQzs7Ozs7O0lBRUQsV0FBVyxDQUNULE1BQXFCLEVBQ3JCLFdBQStCOztjQUV6QixPQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7UUFDekMsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQzs7O1lBckJGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQUpRLG9CQUFvQjs7Ozs7Ozs7SUFNZiw4Q0FBa0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7IFJvdXRpbmcgfSBmcm9tICcuLi9zaGFyZWQvcm91dGluZy5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBSb3V0aW5nU291cmNlIH0gZnJvbSAnLi4vcm91dGluZy1zb3VyY2VzL3JvdXRpbmctc291cmNlJztcclxuaW1wb3J0IHsgUm91dGluZ1NvdXJjZVNlcnZpY2UgfSBmcm9tICcuL3JvdXRpbmctc291cmNlLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUm91dGluZ1NlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGluZ1NvdXJjZVNlcnZpY2U6IFJvdXRpbmdTb3VyY2VTZXJ2aWNlKSB7fVxyXG5cclxuICByb3V0ZShjb29yZGluYXRlczogW251bWJlciwgbnVtYmVyXVtdKTogT2JzZXJ2YWJsZTxSb3V0aW5nW10+W10ge1xyXG4gICAgaWYgKGNvb3JkaW5hdGVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5yb3V0aW5nU291cmNlU2VydmljZS5zb3VyY2VzXHJcbiAgICAgIC5maWx0ZXIoKHNvdXJjZTogUm91dGluZ1NvdXJjZSkgPT4gc291cmNlLmVuYWJsZWQpXHJcbiAgICAgIC5tYXAoKHNvdXJjZTogUm91dGluZ1NvdXJjZSkgPT4gdGhpcy5yb3V0ZVNvdXJjZShzb3VyY2UsIGNvb3JkaW5hdGVzKSk7XHJcbiAgfVxyXG5cclxuICByb3V0ZVNvdXJjZShcclxuICAgIHNvdXJjZTogUm91dGluZ1NvdXJjZSxcclxuICAgIGNvb3JkaW5hdGVzOiBbbnVtYmVyLCBudW1iZXJdW11cclxuICApOiBPYnNlcnZhYmxlPFJvdXRpbmdbXT4ge1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IHNvdXJjZS5yb3V0ZShjb29yZGluYXRlcyk7XHJcbiAgICByZXR1cm4gcmVxdWVzdDtcclxuICB9XHJcbn1cclxuIl19