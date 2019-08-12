/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject, InjectionToken, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
/** @type {?} */
export var ROUTE_SERVICE_OPTIONS = new InjectionToken('routeServiceOptions');
/**
 * @param {?} options
 * @return {?}
 */
export function provideRouteServiceOptions(options) {
    return {
        provide: ROUTE_SERVICE_OPTIONS,
        useValue: options
    };
}
var RouteService = /** @class */ (function () {
    function RouteService(route, options) {
        this.route = route;
        /** @type {?} */
        var defaultOptions = {
            centerKey: 'center',
            zoomKey: 'zoom',
            projectionKey: 'projection',
            contextKey: 'context',
            searchKey: 'search',
            visibleOnLayersKey: 'visiblelayers',
            visibleOffLayersKey: 'invisiblelayers',
            routingCoordKey: 'routing',
            toolKey: 'tool',
            llcKKey: 'llck',
            llcAKey: 'llca',
            llcVKey: 'llcv',
            llcRKey: 'llcr'
        };
        this.options = Object.assign({}, defaultOptions, options);
    }
    Object.defineProperty(RouteService.prototype, "queryParams", {
        get: /**
         * @return {?}
         */
        function () {
            return this.route.queryParams;
        },
        enumerable: true,
        configurable: true
    });
    RouteService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    RouteService.ctorParameters = function () { return [
        { type: ActivatedRoute },
        { type: undefined, decorators: [{ type: Inject, args: [ROUTE_SERVICE_OPTIONS,] }, { type: Optional }] }
    ]; };
    /** @nocollapse */ RouteService.ngInjectableDef = i0.defineInjectable({ factory: function RouteService_Factory() { return new RouteService(i0.inject(i1.ActivatedRoute), i0.inject(ROUTE_SERVICE_OPTIONS, 8)); }, token: RouteService, providedIn: "root" });
    return RouteService;
}());
export { RouteService };
if (false) {
    /** @type {?} */
    RouteService.prototype.options;
    /** @type {?} */
    RouteService.prototype.route;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvcmUvIiwic291cmNlcyI6WyJsaWIvcm91dGUvcm91dGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUUsY0FBYyxFQUFVLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFLekQsTUFBTSxLQUFLLHFCQUFxQixHQUFHLElBQUksY0FBYyxDQUNuRCxxQkFBcUIsQ0FDdEI7Ozs7O0FBRUQsTUFBTSxVQUFVLDBCQUEwQixDQUFDLE9BQTRCO0lBQ3JFLE9BQU87UUFDTCxPQUFPLEVBQUUscUJBQXFCO1FBQzlCLFFBQVEsRUFBRSxPQUFPO0tBQ2xCLENBQUM7QUFDSixDQUFDO0FBRUQ7SUFNRSxzQkFDUyxLQUFxQixFQUc1QixPQUE0QjtRQUhyQixVQUFLLEdBQUwsS0FBSyxDQUFnQjs7WUFLdEIsY0FBYyxHQUFHO1lBQ3JCLFNBQVMsRUFBRSxRQUFRO1lBQ25CLE9BQU8sRUFBRSxNQUFNO1lBQ2YsYUFBYSxFQUFFLFlBQVk7WUFDM0IsVUFBVSxFQUFFLFNBQVM7WUFDckIsU0FBUyxFQUFFLFFBQVE7WUFDbkIsa0JBQWtCLEVBQUUsZUFBZTtZQUNuQyxtQkFBbUIsRUFBRSxpQkFBaUI7WUFDdEMsZUFBZSxFQUFFLFNBQVM7WUFDMUIsT0FBTyxFQUFFLE1BQU07WUFDZixPQUFPLEVBQUUsTUFBTTtZQUNmLE9BQU8sRUFBRSxNQUFNO1lBQ2YsT0FBTyxFQUFFLE1BQU07WUFDZixPQUFPLEVBQUUsTUFBTTtTQUNoQjtRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxzQkFBSSxxQ0FBVzs7OztRQUFmO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUNoQyxDQUFDOzs7T0FBQTs7Z0JBaENGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBbEJRLGNBQWM7Z0RBd0JsQixNQUFNLFNBQUMscUJBQXFCLGNBQzVCLFFBQVE7Ozt1QkExQmI7Q0FrREMsQUFqQ0QsSUFpQ0M7U0E5QlksWUFBWTs7O0lBQ3ZCLCtCQUFvQzs7SUFHbEMsNkJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBJbmplY3Rpb25Ub2tlbiwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IFJvdXRlU2VydmljZU9wdGlvbnMgfSBmcm9tICcuL3JvdXRlLmludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgbGV0IFJPVVRFX1NFUlZJQ0VfT1BUSU9OUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxSb3V0ZVNlcnZpY2VPcHRpb25zPihcclxuICAncm91dGVTZXJ2aWNlT3B0aW9ucydcclxuKTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlUm91dGVTZXJ2aWNlT3B0aW9ucyhvcHRpb25zOiBSb3V0ZVNlcnZpY2VPcHRpb25zKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHByb3ZpZGU6IFJPVVRFX1NFUlZJQ0VfT1BUSU9OUyxcclxuICAgIHVzZVZhbHVlOiBvcHRpb25zXHJcbiAgfTtcclxufVxyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUm91dGVTZXJ2aWNlIHtcclxuICBwdWJsaWMgb3B0aW9uczogUm91dGVTZXJ2aWNlT3B0aW9ucztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgQEluamVjdChST1VURV9TRVJWSUNFX09QVElPTlMpXHJcbiAgICBAT3B0aW9uYWwoKVxyXG4gICAgb3B0aW9uczogUm91dGVTZXJ2aWNlT3B0aW9uc1xyXG4gICkge1xyXG4gICAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XHJcbiAgICAgIGNlbnRlcktleTogJ2NlbnRlcicsXHJcbiAgICAgIHpvb21LZXk6ICd6b29tJyxcclxuICAgICAgcHJvamVjdGlvbktleTogJ3Byb2plY3Rpb24nLFxyXG4gICAgICBjb250ZXh0S2V5OiAnY29udGV4dCcsXHJcbiAgICAgIHNlYXJjaEtleTogJ3NlYXJjaCcsXHJcbiAgICAgIHZpc2libGVPbkxheWVyc0tleTogJ3Zpc2libGVsYXllcnMnLFxyXG4gICAgICB2aXNpYmxlT2ZmTGF5ZXJzS2V5OiAnaW52aXNpYmxlbGF5ZXJzJyxcclxuICAgICAgcm91dGluZ0Nvb3JkS2V5OiAncm91dGluZycsXHJcbiAgICAgIHRvb2xLZXk6ICd0b29sJyxcclxuICAgICAgbGxjS0tleTogJ2xsY2snLFxyXG4gICAgICBsbGNBS2V5OiAnbGxjYScsXHJcbiAgICAgIGxsY1ZLZXk6ICdsbGN2JyxcclxuICAgICAgbGxjUktleTogJ2xsY3InXHJcbiAgICB9O1xyXG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHF1ZXJ5UGFyYW1zKCk6IE9ic2VydmFibGU8UGFyYW1zPiB7XHJcbiAgICByZXR1cm4gdGhpcy5yb3V0ZS5xdWVyeVBhcmFtcztcclxuICB9XHJcbn1cclxuIl19