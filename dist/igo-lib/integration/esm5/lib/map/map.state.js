/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { IgoMap, MapService, ProjectionService } from '@igo2/geo';
import * as i0 from "@angular/core";
import * as i1 from "@igo2/geo";
/**
 * Service that holds the state of the map module
 */
var MapState = /** @class */ (function () {
    function MapState(mapService, projectionService // Don't remove this or it'll never be injected
    ) {
        this.mapService = mapService;
        this.projectionService = projectionService;
        this._map = new IgoMap({
            controls: {
                scaleLine: true,
                attribution: {
                    collapsed: false
                }
            }
        });
        this.mapService.setMap(this.map);
    }
    Object.defineProperty(MapState.prototype, "map", {
        /**
         * Active map
         */
        get: /**
         * Active map
         * @return {?}
         */
        function () { return this._map; },
        enumerable: true,
        configurable: true
    });
    MapState.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    MapState.ctorParameters = function () { return [
        { type: MapService },
        { type: ProjectionService }
    ]; };
    /** @nocollapse */ MapState.ngInjectableDef = i0.defineInjectable({ factory: function MapState_Factory() { return new MapState(i0.inject(i1.MapService), i0.inject(i1.ProjectionService)); }, token: MapState, providedIn: "root" });
    return MapState;
}());
export { MapState };
if (false) {
    /**
     * @type {?}
     * @private
     */
    MapState.prototype._map;
    /**
     * @type {?}
     * @private
     */
    MapState.prototype.mapService;
    /**
     * @type {?}
     * @private
     */
    MapState.prototype.projectionService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLnN0YXRlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvaW50ZWdyYXRpb24vIiwic291cmNlcyI6WyJsaWIvbWFwL21hcC5zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFdBQVcsQ0FBQzs7Ozs7O0FBS2xFO0lBV0Usa0JBQ1UsVUFBc0IsRUFDdEIsaUJBQW9DLENBQUUsK0NBQStDOztRQURyRixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFFNUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQztZQUNyQixRQUFRLEVBQUU7Z0JBQ1IsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsV0FBVyxFQUFFO29CQUNYLFNBQVMsRUFBRSxLQUFLO2lCQUNqQjthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFqQkQsc0JBQUkseUJBQUc7UUFIUDs7V0FFRzs7Ozs7UUFDSCxjQUFvQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTs7Z0JBUnhDLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBUGdCLFVBQVU7Z0JBQUUsaUJBQWlCOzs7bUJBRjlDO0NBaUNDLEFBMUJELElBMEJDO1NBdkJZLFFBQVE7Ozs7OztJQU1uQix3QkFBcUI7Ozs7O0lBR25CLDhCQUE4Qjs7Ozs7SUFDOUIscUNBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSWdvTWFwLCBNYXBTZXJ2aWNlLCBQcm9qZWN0aW9uU2VydmljZSB9IGZyb20gJ0BpZ28yL2dlbyc7XHJcblxyXG4vKipcclxuICogU2VydmljZSB0aGF0IGhvbGRzIHRoZSBzdGF0ZSBvZiB0aGUgbWFwIG1vZHVsZVxyXG4gKi9cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFwU3RhdGUge1xyXG5cclxuICAvKipcclxuICAgKiBBY3RpdmUgbWFwXHJcbiAgICovXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAgeyByZXR1cm4gdGhpcy5fbWFwOyB9XHJcbiAgcHJpdmF0ZSBfbWFwOiBJZ29NYXA7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBwcm9qZWN0aW9uU2VydmljZTogUHJvamVjdGlvblNlcnZpY2UgIC8vIERvbid0IHJlbW92ZSB0aGlzIG9yIGl0J2xsIG5ldmVyIGJlIGluamVjdGVkXHJcbiAgKSB7XHJcbiAgICB0aGlzLl9tYXAgPSBuZXcgSWdvTWFwKHtcclxuICAgICAgY29udHJvbHM6IHtcclxuICAgICAgICBzY2FsZUxpbmU6IHRydWUsXHJcbiAgICAgICAgYXR0cmlidXRpb246IHtcclxuICAgICAgICAgIGNvbGxhcHNlZDogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMubWFwU2VydmljZS5zZXRNYXAodGhpcy5tYXApO1xyXG4gIH1cclxufVxyXG4iXX0=