/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { RoutingSourceService } from './routing-source.service';
import * as i0 from "@angular/core";
import * as i1 from "./routing-source.service";
var RoutingService = /** @class */ (function () {
    function RoutingService(routingSourceService) {
        this.routingSourceService = routingSourceService;
    }
    /**
     * @param {?} coordinates
     * @return {?}
     */
    RoutingService.prototype.route = /**
     * @param {?} coordinates
     * @return {?}
     */
    function (coordinates) {
        var _this = this;
        if (coordinates.length === 0) {
            return;
        }
        return this.routingSourceService.sources
            .filter((/**
         * @param {?} source
         * @return {?}
         */
        function (source) { return source.enabled; }))
            .map((/**
         * @param {?} source
         * @return {?}
         */
        function (source) { return _this.routeSource(source, coordinates); }));
    };
    /**
     * @param {?} source
     * @param {?} coordinates
     * @return {?}
     */
    RoutingService.prototype.routeSource = /**
     * @param {?} source
     * @param {?} coordinates
     * @return {?}
     */
    function (source, coordinates) {
        /** @type {?} */
        var request = source.route(coordinates);
        return request;
    };
    RoutingService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    RoutingService.ctorParameters = function () { return [
        { type: RoutingSourceService }
    ]; };
    /** @nocollapse */ RoutingService.ngInjectableDef = i0.defineInjectable({ factory: function RoutingService_Factory() { return new RoutingService(i0.inject(i1.RoutingSourceService)); }, token: RoutingService, providedIn: "root" });
    return RoutingService;
}());
export { RoutingService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    RoutingService.prototype.routingSourceService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3JvdXRpbmcvc2hhcmVkL3JvdXRpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU8zQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7O0FBRWhFO0lBSUUsd0JBQW9CLG9CQUEwQztRQUExQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO0lBQUcsQ0FBQzs7Ozs7SUFFbEUsOEJBQUs7Ozs7SUFBTCxVQUFNLFdBQStCO1FBQXJDLGlCQU9DO1FBTkMsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUM1QixPQUFPO1NBQ1I7UUFDRCxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPO2FBQ3JDLE1BQU07Ozs7UUFBQyxVQUFDLE1BQXFCLElBQUssT0FBQSxNQUFNLENBQUMsT0FBTyxFQUFkLENBQWMsRUFBQzthQUNqRCxHQUFHOzs7O1FBQUMsVUFBQyxNQUFxQixJQUFLLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLEVBQXJDLENBQXFDLEVBQUMsQ0FBQztJQUMzRSxDQUFDOzs7Ozs7SUFFRCxvQ0FBVzs7Ozs7SUFBWCxVQUNFLE1BQXFCLEVBQ3JCLFdBQStCOztZQUV6QixPQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7UUFDekMsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQzs7Z0JBckJGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBSlEsb0JBQW9COzs7eUJBUDdCO0NBK0JDLEFBdEJELElBc0JDO1NBbkJZLGNBQWM7Ozs7OztJQUNiLDhDQUFrRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgUm91dGluZyB9IGZyb20gJy4uL3NoYXJlZC9yb3V0aW5nLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFJvdXRpbmdTb3VyY2UgfSBmcm9tICcuLi9yb3V0aW5nLXNvdXJjZXMvcm91dGluZy1zb3VyY2UnO1xyXG5pbXBvcnQgeyBSb3V0aW5nU291cmNlU2VydmljZSB9IGZyb20gJy4vcm91dGluZy1zb3VyY2Uuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSb3V0aW5nU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0aW5nU291cmNlU2VydmljZTogUm91dGluZ1NvdXJjZVNlcnZpY2UpIHt9XHJcblxyXG4gIHJvdXRlKGNvb3JkaW5hdGVzOiBbbnVtYmVyLCBudW1iZXJdW10pOiBPYnNlcnZhYmxlPFJvdXRpbmdbXT5bXSB7XHJcbiAgICBpZiAoY29vcmRpbmF0ZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnJvdXRpbmdTb3VyY2VTZXJ2aWNlLnNvdXJjZXNcclxuICAgICAgLmZpbHRlcigoc291cmNlOiBSb3V0aW5nU291cmNlKSA9PiBzb3VyY2UuZW5hYmxlZClcclxuICAgICAgLm1hcCgoc291cmNlOiBSb3V0aW5nU291cmNlKSA9PiB0aGlzLnJvdXRlU291cmNlKHNvdXJjZSwgY29vcmRpbmF0ZXMpKTtcclxuICB9XHJcblxyXG4gIHJvdXRlU291cmNlKFxyXG4gICAgc291cmNlOiBSb3V0aW5nU291cmNlLFxyXG4gICAgY29vcmRpbmF0ZXM6IFtudW1iZXIsIG51bWJlcl1bXVxyXG4gICk6IE9ic2VydmFibGU8Um91dGluZ1tdPiB7XHJcbiAgICBjb25zdCByZXF1ZXN0ID0gc291cmNlLnJvdXRlKGNvb3JkaW5hdGVzKTtcclxuICAgIHJldHVybiByZXF1ZXN0O1xyXG4gIH1cclxufVxyXG4iXX0=