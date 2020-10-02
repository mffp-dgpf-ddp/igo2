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
            wmsUrlKey: 'wmsUrl',
            wmsLayersKey: 'wmsLayers',
            wmtsUrlKey: 'wmtsUrl',
            wmtsLayersKey: 'wmtsLayers',
            vectorKey: 'vector'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvcmUvIiwic291cmNlcyI6WyJsaWIvcm91dGUvcm91dGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUUsY0FBYyxFQUFVLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFLekQsTUFBTSxLQUFLLHFCQUFxQixHQUFHLElBQUksY0FBYyxDQUNuRCxxQkFBcUIsQ0FDdEI7Ozs7O0FBRUQsTUFBTSxVQUFVLDBCQUEwQixDQUFDLE9BQTRCO0lBQ3JFLE9BQU87UUFDTCxPQUFPLEVBQUUscUJBQXFCO1FBQzlCLFFBQVEsRUFBRSxPQUFPO0tBQ2xCLENBQUM7QUFDSixDQUFDO0FBS0QsTUFBTSxPQUFPLFlBQVk7Ozs7O0lBR3ZCLFlBQ1MsS0FBcUIsRUFHNUIsT0FBNEI7UUFIckIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7O2NBS3RCLGNBQWMsR0FBRztZQUNyQixTQUFTLEVBQUUsUUFBUTtZQUNuQixPQUFPLEVBQUUsTUFBTTtZQUNmLGFBQWEsRUFBRSxZQUFZO1lBQzNCLFVBQVUsRUFBRSxTQUFTO1lBQ3JCLFNBQVMsRUFBRSxRQUFRO1lBQ25CLGtCQUFrQixFQUFFLGVBQWU7WUFDbkMsbUJBQW1CLEVBQUUsaUJBQWlCO1lBQ3RDLGtCQUFrQixFQUFFLFNBQVM7WUFDN0IsT0FBTyxFQUFFLE1BQU07WUFDZixTQUFTLEVBQUUsUUFBUTtZQUNuQixZQUFZLEVBQUcsV0FBVztZQUMxQixVQUFVLEVBQUUsU0FBUztZQUNyQixhQUFhLEVBQUcsWUFBWTtZQUM1QixTQUFTLEVBQUUsUUFBUTtTQUNwQjtRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzVELENBQUM7Ozs7SUFFRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO0lBQ2hDLENBQUM7OztZQWpDRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFsQlEsY0FBYzs0Q0F3QmxCLE1BQU0sU0FBQyxxQkFBcUIsY0FDNUIsUUFBUTs7Ozs7SUFMWCwrQkFBb0M7O0lBR2xDLDZCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgSW5qZWN0aW9uVG9rZW4sIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBSb3V0ZVNlcnZpY2VPcHRpb25zIH0gZnJvbSAnLi9yb3V0ZS5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGxldCBST1VURV9TRVJWSUNFX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48Um91dGVTZXJ2aWNlT3B0aW9ucz4oXHJcbiAgJ3JvdXRlU2VydmljZU9wdGlvbnMnXHJcbik7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZVJvdXRlU2VydmljZU9wdGlvbnMob3B0aW9uczogUm91dGVTZXJ2aWNlT3B0aW9ucykge1xyXG4gIHJldHVybiB7XHJcbiAgICBwcm92aWRlOiBST1VURV9TRVJWSUNFX09QVElPTlMsXHJcbiAgICB1c2VWYWx1ZTogb3B0aW9uc1xyXG4gIH07XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFJvdXRlU2VydmljZSB7XHJcbiAgcHVibGljIG9wdGlvbnM6IFJvdXRlU2VydmljZU9wdGlvbnM7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIEBJbmplY3QoUk9VVEVfU0VSVklDRV9PUFRJT05TKVxyXG4gICAgQE9wdGlvbmFsKClcclxuICAgIG9wdGlvbnM6IFJvdXRlU2VydmljZU9wdGlvbnNcclxuICApIHtcclxuICAgIGNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xyXG4gICAgICBjZW50ZXJLZXk6ICdjZW50ZXInLFxyXG4gICAgICB6b29tS2V5OiAnem9vbScsXHJcbiAgICAgIHByb2plY3Rpb25LZXk6ICdwcm9qZWN0aW9uJyxcclxuICAgICAgY29udGV4dEtleTogJ2NvbnRleHQnLFxyXG4gICAgICBzZWFyY2hLZXk6ICdzZWFyY2gnLFxyXG4gICAgICB2aXNpYmxlT25MYXllcnNLZXk6ICd2aXNpYmxlbGF5ZXJzJyxcclxuICAgICAgdmlzaWJsZU9mZkxheWVyc0tleTogJ2ludmlzaWJsZWxheWVycycsXHJcbiAgICAgIGRpcmVjdGlvbnNDb29yZEtleTogJ3JvdXRpbmcnLFxyXG4gICAgICB0b29sS2V5OiAndG9vbCcsXHJcbiAgICAgIHdtc1VybEtleTogJ3dtc1VybCcsXHJcbiAgICAgIHdtc0xheWVyc0tleTogICd3bXNMYXllcnMnLFxyXG4gICAgICB3bXRzVXJsS2V5OiAnd210c1VybCcsXHJcbiAgICAgIHdtdHNMYXllcnNLZXk6ICAnd210c0xheWVycycsXHJcbiAgICAgIHZlY3RvcktleTogJ3ZlY3RvcidcclxuICAgIH07XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBnZXQgcXVlcnlQYXJhbXMoKTogT2JzZXJ2YWJsZTxQYXJhbXM+IHtcclxuICAgIHJldHVybiB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zO1xyXG4gIH1cclxufVxyXG4iXX0=