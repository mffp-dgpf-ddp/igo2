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
            routingCoordKey: 'routing',
            toolKey: 'tool',
            llcKKey: 'llck',
            llcAKey: 'llca',
            llcVKey: 'llcv',
            llcRKey: 'llcr'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvcmUvIiwic291cmNlcyI6WyJsaWIvcm91dGUvcm91dGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUUsY0FBYyxFQUFVLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFLekQsTUFBTSxLQUFLLHFCQUFxQixHQUFHLElBQUksY0FBYyxDQUNuRCxxQkFBcUIsQ0FDdEI7Ozs7O0FBRUQsTUFBTSxVQUFVLDBCQUEwQixDQUFDLE9BQTRCO0lBQ3JFLE9BQU87UUFDTCxPQUFPLEVBQUUscUJBQXFCO1FBQzlCLFFBQVEsRUFBRSxPQUFPO0tBQ2xCLENBQUM7QUFDSixDQUFDO0FBS0QsTUFBTSxPQUFPLFlBQVk7Ozs7O0lBR3ZCLFlBQ1MsS0FBcUIsRUFHNUIsT0FBNEI7UUFIckIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7O2NBS3RCLGNBQWMsR0FBRztZQUNyQixTQUFTLEVBQUUsUUFBUTtZQUNuQixPQUFPLEVBQUUsTUFBTTtZQUNmLGFBQWEsRUFBRSxZQUFZO1lBQzNCLFVBQVUsRUFBRSxTQUFTO1lBQ3JCLFNBQVMsRUFBRSxRQUFRO1lBQ25CLGtCQUFrQixFQUFFLGVBQWU7WUFDbkMsbUJBQW1CLEVBQUUsaUJBQWlCO1lBQ3RDLGVBQWUsRUFBRSxTQUFTO1lBQzFCLE9BQU8sRUFBRSxNQUFNO1lBQ2YsT0FBTyxFQUFFLE1BQU07WUFDZixPQUFPLEVBQUUsTUFBTTtZQUNmLE9BQU8sRUFBRSxNQUFNO1lBQ2YsT0FBTyxFQUFFLE1BQU07U0FDaEI7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLGNBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM1RCxDQUFDOzs7O0lBRUQsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztJQUNoQyxDQUFDOzs7WUFoQ0YsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBbEJRLGNBQWM7NENBd0JsQixNQUFNLFNBQUMscUJBQXFCLGNBQzVCLFFBQVE7Ozs7O0lBTFgsK0JBQW9DOztJQUdsQyw2QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIEluamVjdGlvblRva2VuLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgUm91dGVTZXJ2aWNlT3B0aW9ucyB9IGZyb20gJy4vcm91dGUuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBsZXQgUk9VVEVfU0VSVklDRV9PUFRJT05TID0gbmV3IEluamVjdGlvblRva2VuPFJvdXRlU2VydmljZU9wdGlvbnM+KFxyXG4gICdyb3V0ZVNlcnZpY2VPcHRpb25zJ1xyXG4pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVSb3V0ZVNlcnZpY2VPcHRpb25zKG9wdGlvbnM6IFJvdXRlU2VydmljZU9wdGlvbnMpIHtcclxuICByZXR1cm4ge1xyXG4gICAgcHJvdmlkZTogUk9VVEVfU0VSVklDRV9PUFRJT05TLFxyXG4gICAgdXNlVmFsdWU6IG9wdGlvbnNcclxuICB9O1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSb3V0ZVNlcnZpY2Uge1xyXG4gIHB1YmxpYyBvcHRpb25zOiBSb3V0ZVNlcnZpY2VPcHRpb25zO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICBASW5qZWN0KFJPVVRFX1NFUlZJQ0VfT1BUSU9OUylcclxuICAgIEBPcHRpb25hbCgpXHJcbiAgICBvcHRpb25zOiBSb3V0ZVNlcnZpY2VPcHRpb25zXHJcbiAgKSB7XHJcbiAgICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcclxuICAgICAgY2VudGVyS2V5OiAnY2VudGVyJyxcclxuICAgICAgem9vbUtleTogJ3pvb20nLFxyXG4gICAgICBwcm9qZWN0aW9uS2V5OiAncHJvamVjdGlvbicsXHJcbiAgICAgIGNvbnRleHRLZXk6ICdjb250ZXh0JyxcclxuICAgICAgc2VhcmNoS2V5OiAnc2VhcmNoJyxcclxuICAgICAgdmlzaWJsZU9uTGF5ZXJzS2V5OiAndmlzaWJsZWxheWVycycsXHJcbiAgICAgIHZpc2libGVPZmZMYXllcnNLZXk6ICdpbnZpc2libGVsYXllcnMnLFxyXG4gICAgICByb3V0aW5nQ29vcmRLZXk6ICdyb3V0aW5nJyxcclxuICAgICAgdG9vbEtleTogJ3Rvb2wnLFxyXG4gICAgICBsbGNLS2V5OiAnbGxjaycsXHJcbiAgICAgIGxsY0FLZXk6ICdsbGNhJyxcclxuICAgICAgbGxjVktleTogJ2xsY3YnLFxyXG4gICAgICBsbGNSS2V5OiAnbGxjcidcclxuICAgIH07XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBnZXQgcXVlcnlQYXJhbXMoKTogT2JzZXJ2YWJsZTxQYXJhbXM+IHtcclxuICAgIHJldHVybiB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zO1xyXG4gIH1cclxufVxyXG4iXX0=