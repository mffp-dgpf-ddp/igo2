/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject, InjectionToken, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
/** @type {?} */
export let ROUTE_SERVICE_OPTIONS = new InjectionToken('routeServiceOptions');
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
export class RouteService {
    /**
     * @param {?} route
     * @param {?} options
     */
    constructor(route, options) {
        this.route = route;
        /** @type {?} */
        const defaultOptions = {
            centerKey: 'center',
            zoomKey: 'zoom',
            projectionKey: 'projection',
            contextKey: 'context',
            searchKey: 'search',
            visibleOnLayersKey: 'visiblelayers',
            visibleOffLayersKey: 'invisiblelayers',
            directionsCoordKey: 'routing',
            toolKey: 'tool',
            llcKKey: 'llck',
            llcAKey: 'llca',
            llcVKey: 'llcv',
            llcRKey: 'llcr',
            wmsUrlKey: 'wmsUrl',
            layersKey: 'layers'
        };
        this.options = Object.assign({}, defaultOptions, options);
    }
    /**
     * @return {?}
     */
    get queryParams() {
        return this.route.queryParams;
    }
}
RouteService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
RouteService.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: undefined, decorators: [{ type: Inject, args: [ROUTE_SERVICE_OPTIONS,] }, { type: Optional }] }
];
/** @nocollapse */ RouteService.ngInjectableDef = i0.defineInjectable({ factory: function RouteService_Factory() { return new RouteService(i0.inject(i1.ActivatedRoute), i0.inject(ROUTE_SERVICE_OPTIONS, 8)); }, token: RouteService, providedIn: "root" });
if (false) {
    /** @type {?} */
    RouteService.prototype.options;
    /** @type {?} */
    RouteService.prototype.route;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvcmUvIiwic291cmNlcyI6WyJsaWIvcm91dGUvcm91dGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUUsY0FBYyxFQUFVLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFLekQsTUFBTSxLQUFLLHFCQUFxQixHQUFHLElBQUksY0FBYyxDQUNuRCxxQkFBcUIsQ0FDdEI7Ozs7O0FBRUQsTUFBTSxVQUFVLDBCQUEwQixDQUFDLE9BQTRCO0lBQ3JFLE9BQU87UUFDTCxPQUFPLEVBQUUscUJBQXFCO1FBQzlCLFFBQVEsRUFBRSxPQUFPO0tBQ2xCLENBQUM7QUFDSixDQUFDO0FBS0QsTUFBTSxPQUFPLFlBQVk7Ozs7O0lBR3ZCLFlBQ1MsS0FBcUIsRUFHNUIsT0FBNEI7UUFIckIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7O2NBS3RCLGNBQWMsR0FBRztZQUNyQixTQUFTLEVBQUUsUUFBUTtZQUNuQixPQUFPLEVBQUUsTUFBTTtZQUNmLGFBQWEsRUFBRSxZQUFZO1lBQzNCLFVBQVUsRUFBRSxTQUFTO1lBQ3JCLFNBQVMsRUFBRSxRQUFRO1lBQ25CLGtCQUFrQixFQUFFLGVBQWU7WUFDbkMsbUJBQW1CLEVBQUUsaUJBQWlCO1lBQ3RDLGtCQUFrQixFQUFFLFNBQVM7WUFDN0IsT0FBTyxFQUFFLE1BQU07WUFDZixPQUFPLEVBQUUsTUFBTTtZQUNmLE9BQU8sRUFBRSxNQUFNO1lBQ2YsT0FBTyxFQUFFLE1BQU07WUFDZixPQUFPLEVBQUUsTUFBTTtZQUNmLFNBQVMsRUFBRSxRQUFRO1lBQ25CLFNBQVMsRUFBRyxRQUFRO1NBQ3JCO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDNUQsQ0FBQzs7OztJQUVELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7SUFDaEMsQ0FBQzs7O1lBbENGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQWxCUSxjQUFjOzRDQXdCbEIsTUFBTSxTQUFDLHFCQUFxQixjQUM1QixRQUFROzs7OztJQUxYLCtCQUFvQzs7SUFHbEMsNkJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBJbmplY3Rpb25Ub2tlbiwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IFJvdXRlU2VydmljZU9wdGlvbnMgfSBmcm9tICcuL3JvdXRlLmludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgbGV0IFJPVVRFX1NFUlZJQ0VfT1BUSU9OUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxSb3V0ZVNlcnZpY2VPcHRpb25zPihcclxuICAncm91dGVTZXJ2aWNlT3B0aW9ucydcclxuKTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlUm91dGVTZXJ2aWNlT3B0aW9ucyhvcHRpb25zOiBSb3V0ZVNlcnZpY2VPcHRpb25zKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHByb3ZpZGU6IFJPVVRFX1NFUlZJQ0VfT1BUSU9OUyxcclxuICAgIHVzZVZhbHVlOiBvcHRpb25zXHJcbiAgfTtcclxufVxyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUm91dGVTZXJ2aWNlIHtcclxuICBwdWJsaWMgb3B0aW9uczogUm91dGVTZXJ2aWNlT3B0aW9ucztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgQEluamVjdChST1VURV9TRVJWSUNFX09QVElPTlMpXHJcbiAgICBAT3B0aW9uYWwoKVxyXG4gICAgb3B0aW9uczogUm91dGVTZXJ2aWNlT3B0aW9uc1xyXG4gICkge1xyXG4gICAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XHJcbiAgICAgIGNlbnRlcktleTogJ2NlbnRlcicsXHJcbiAgICAgIHpvb21LZXk6ICd6b29tJyxcclxuICAgICAgcHJvamVjdGlvbktleTogJ3Byb2plY3Rpb24nLFxyXG4gICAgICBjb250ZXh0S2V5OiAnY29udGV4dCcsXHJcbiAgICAgIHNlYXJjaEtleTogJ3NlYXJjaCcsXHJcbiAgICAgIHZpc2libGVPbkxheWVyc0tleTogJ3Zpc2libGVsYXllcnMnLFxyXG4gICAgICB2aXNpYmxlT2ZmTGF5ZXJzS2V5OiAnaW52aXNpYmxlbGF5ZXJzJyxcclxuICAgICAgZGlyZWN0aW9uc0Nvb3JkS2V5OiAncm91dGluZycsXHJcbiAgICAgIHRvb2xLZXk6ICd0b29sJyxcclxuICAgICAgbGxjS0tleTogJ2xsY2snLFxyXG4gICAgICBsbGNBS2V5OiAnbGxjYScsXHJcbiAgICAgIGxsY1ZLZXk6ICdsbGN2JyxcclxuICAgICAgbGxjUktleTogJ2xsY3InLFxyXG4gICAgICB3bXNVcmxLZXk6ICd3bXNVcmwnLFxyXG4gICAgICBsYXllcnNLZXk6ICAnbGF5ZXJzJ1xyXG4gICAgfTtcclxuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIGdldCBxdWVyeVBhcmFtcygpOiBPYnNlcnZhYmxlPFBhcmFtcz4ge1xyXG4gICAgcmV0dXJuIHRoaXMucm91dGUucXVlcnlQYXJhbXM7XHJcbiAgfVxyXG59XHJcbiJdfQ==