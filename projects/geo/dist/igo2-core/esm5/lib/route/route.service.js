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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvcmUvIiwic291cmNlcyI6WyJsaWIvcm91dGUvcm91dGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUUsY0FBYyxFQUFVLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFLekQsTUFBTSxLQUFLLHFCQUFxQixHQUFHLElBQUksY0FBYyxDQUNuRCxxQkFBcUIsQ0FDdEI7Ozs7O0FBRUQsTUFBTSxVQUFVLDBCQUEwQixDQUFDLE9BQTRCO0lBQ3JFLE9BQU87UUFDTCxPQUFPLEVBQUUscUJBQXFCO1FBQzlCLFFBQVEsRUFBRSxPQUFPO0tBQ2xCLENBQUM7QUFDSixDQUFDO0FBRUQ7SUFNRSxzQkFDUyxLQUFxQixFQUc1QixPQUE0QjtRQUhyQixVQUFLLEdBQUwsS0FBSyxDQUFnQjs7WUFLdEIsY0FBYyxHQUFHO1lBQ3JCLFNBQVMsRUFBRSxRQUFRO1lBQ25CLE9BQU8sRUFBRSxNQUFNO1lBQ2YsYUFBYSxFQUFFLFlBQVk7WUFDM0IsVUFBVSxFQUFFLFNBQVM7WUFDckIsU0FBUyxFQUFFLFFBQVE7WUFDbkIsa0JBQWtCLEVBQUUsZUFBZTtZQUNuQyxtQkFBbUIsRUFBRSxpQkFBaUI7WUFDdEMsa0JBQWtCLEVBQUUsU0FBUztZQUM3QixPQUFPLEVBQUUsTUFBTTtZQUNmLFNBQVMsRUFBRSxRQUFRO1lBQ25CLFlBQVksRUFBRyxXQUFXO1lBQzFCLFVBQVUsRUFBRSxTQUFTO1lBQ3JCLGFBQWEsRUFBRyxZQUFZO1lBQzVCLFNBQVMsRUFBRSxRQUFRO1NBQ3BCO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELHNCQUFJLHFDQUFXOzs7O1FBQWY7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO1FBQ2hDLENBQUM7OztPQUFBOztnQkFqQ0YsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFsQlEsY0FBYztnREF3QmxCLE1BQU0sU0FBQyxxQkFBcUIsY0FDNUIsUUFBUTs7O3VCQTFCYjtDQW1EQyxBQWxDRCxJQWtDQztTQS9CWSxZQUFZOzs7SUFDdkIsK0JBQW9DOztJQUdsQyw2QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIEluamVjdGlvblRva2VuLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgUm91dGVTZXJ2aWNlT3B0aW9ucyB9IGZyb20gJy4vcm91dGUuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBsZXQgUk9VVEVfU0VSVklDRV9PUFRJT05TID0gbmV3IEluamVjdGlvblRva2VuPFJvdXRlU2VydmljZU9wdGlvbnM+KFxyXG4gICdyb3V0ZVNlcnZpY2VPcHRpb25zJ1xyXG4pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVSb3V0ZVNlcnZpY2VPcHRpb25zKG9wdGlvbnM6IFJvdXRlU2VydmljZU9wdGlvbnMpIHtcclxuICByZXR1cm4ge1xyXG4gICAgcHJvdmlkZTogUk9VVEVfU0VSVklDRV9PUFRJT05TLFxyXG4gICAgdXNlVmFsdWU6IG9wdGlvbnNcclxuICB9O1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSb3V0ZVNlcnZpY2Uge1xyXG4gIHB1YmxpYyBvcHRpb25zOiBSb3V0ZVNlcnZpY2VPcHRpb25zO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICBASW5qZWN0KFJPVVRFX1NFUlZJQ0VfT1BUSU9OUylcclxuICAgIEBPcHRpb25hbCgpXHJcbiAgICBvcHRpb25zOiBSb3V0ZVNlcnZpY2VPcHRpb25zXHJcbiAgKSB7XHJcbiAgICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcclxuICAgICAgY2VudGVyS2V5OiAnY2VudGVyJyxcclxuICAgICAgem9vbUtleTogJ3pvb20nLFxyXG4gICAgICBwcm9qZWN0aW9uS2V5OiAncHJvamVjdGlvbicsXHJcbiAgICAgIGNvbnRleHRLZXk6ICdjb250ZXh0JyxcclxuICAgICAgc2VhcmNoS2V5OiAnc2VhcmNoJyxcclxuICAgICAgdmlzaWJsZU9uTGF5ZXJzS2V5OiAndmlzaWJsZWxheWVycycsXHJcbiAgICAgIHZpc2libGVPZmZMYXllcnNLZXk6ICdpbnZpc2libGVsYXllcnMnLFxyXG4gICAgICBkaXJlY3Rpb25zQ29vcmRLZXk6ICdyb3V0aW5nJyxcclxuICAgICAgdG9vbEtleTogJ3Rvb2wnLFxyXG4gICAgICB3bXNVcmxLZXk6ICd3bXNVcmwnLFxyXG4gICAgICB3bXNMYXllcnNLZXk6ICAnd21zTGF5ZXJzJyxcclxuICAgICAgd210c1VybEtleTogJ3dtdHNVcmwnLFxyXG4gICAgICB3bXRzTGF5ZXJzS2V5OiAgJ3dtdHNMYXllcnMnLFxyXG4gICAgICB2ZWN0b3JLZXk6ICd2ZWN0b3InXHJcbiAgICB9O1xyXG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHF1ZXJ5UGFyYW1zKCk6IE9ic2VydmFibGU8UGFyYW1zPiB7XHJcbiAgICByZXR1cm4gdGhpcy5yb3V0ZS5xdWVyeVBhcmFtcztcclxuICB9XHJcbn1cclxuIl19