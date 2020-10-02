/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { DirectionsSourceService } from './directions-source.service';
import * as i0 from "@angular/core";
import * as i1 from "./directions-source.service";
var DirectionsService = /** @class */ (function () {
    function DirectionsService(directionsSourceService) {
        this.directionsSourceService = directionsSourceService;
    }
    /**
     * @param {?} coordinates
     * @param {?=} directionsOptions
     * @return {?}
     */
    DirectionsService.prototype.route = /**
     * @param {?} coordinates
     * @param {?=} directionsOptions
     * @return {?}
     */
    function (coordinates, directionsOptions) {
        var _this = this;
        if (directionsOptions === void 0) { directionsOptions = {}; }
        if (coordinates.length === 0) {
            return;
        }
        return this.directionsSourceService.sources
            .filter((/**
         * @param {?} source
         * @return {?}
         */
        function (source) { return source.enabled; }))
            .map((/**
         * @param {?} source
         * @return {?}
         */
        function (source) { return _this.routeSource(source, coordinates, directionsOptions); }));
    };
    /**
     * @param {?} source
     * @param {?} coordinates
     * @param {?=} directionsOptions
     * @return {?}
     */
    DirectionsService.prototype.routeSource = /**
     * @param {?} source
     * @param {?} coordinates
     * @param {?=} directionsOptions
     * @return {?}
     */
    function (source, coordinates, directionsOptions) {
        if (directionsOptions === void 0) { directionsOptions = {}; }
        /** @type {?} */
        var request = source.route(coordinates, directionsOptions);
        return request;
    };
    DirectionsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    DirectionsService.ctorParameters = function () { return [
        { type: DirectionsSourceService }
    ]; };
    /** @nocollapse */ DirectionsService.ngInjectableDef = i0.defineInjectable({ factory: function DirectionsService_Factory() { return new DirectionsService(i0.inject(i1.DirectionsSourceService)); }, token: DirectionsService, providedIn: "root" });
    return DirectionsService;
}());
export { DirectionsService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DirectionsService.prototype.directionsSourceService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aW9ucy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGlvbnMvc2hhcmVkL2RpcmVjdGlvbnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU8zQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7O0FBRXRFO0lBSUUsMkJBQW9CLHVCQUFnRDtRQUFoRCw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO0lBQUcsQ0FBQzs7Ozs7O0lBRXhFLGlDQUFLOzs7OztJQUFMLFVBQU0sV0FBK0IsRUFBRSxpQkFBeUM7UUFBaEYsaUJBT0M7UUFQc0Msa0NBQUEsRUFBQSxzQkFBeUM7UUFDOUUsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUM1QixPQUFPO1NBQ1I7UUFDRCxPQUFPLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPO2FBQ3hDLE1BQU07Ozs7UUFBQyxVQUFDLE1BQXdCLElBQUssT0FBQSxNQUFNLENBQUMsT0FBTyxFQUFkLENBQWMsRUFBQzthQUNwRCxHQUFHOzs7O1FBQUMsVUFBQyxNQUF3QixJQUFLLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixDQUFDLEVBQXhELENBQXdELEVBQUMsQ0FBQztJQUNqRyxDQUFDOzs7Ozs7O0lBRUQsdUNBQVc7Ozs7OztJQUFYLFVBQ0UsTUFBd0IsRUFDeEIsV0FBK0IsRUFDL0IsaUJBQXlDO1FBQXpDLGtDQUFBLEVBQUEsc0JBQXlDOztZQUVuQyxPQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsaUJBQWlCLENBQUU7UUFDN0QsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQzs7Z0JBdEJGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBSlEsdUJBQXVCOzs7NEJBUGhDO0NBZ0NDLEFBdkJELElBdUJDO1NBcEJZLGlCQUFpQjs7Ozs7O0lBQ2hCLG9EQUF3RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRGlyZWN0aW9ucywgRGlyZWN0aW9uc09wdGlvbnMgfSBmcm9tICcuLi9zaGFyZWQvZGlyZWN0aW9ucy5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBEaXJlY3Rpb25zU291cmNlIH0gZnJvbSAnLi4vZGlyZWN0aW9ucy1zb3VyY2VzL2RpcmVjdGlvbnMtc291cmNlJztcclxuaW1wb3J0IHsgRGlyZWN0aW9uc1NvdXJjZVNlcnZpY2UgfSBmcm9tICcuL2RpcmVjdGlvbnMtc291cmNlLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRGlyZWN0aW9uc1NlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGlyZWN0aW9uc1NvdXJjZVNlcnZpY2U6IERpcmVjdGlvbnNTb3VyY2VTZXJ2aWNlKSB7fVxyXG5cclxuICByb3V0ZShjb29yZGluYXRlczogW251bWJlciwgbnVtYmVyXVtdLCBkaXJlY3Rpb25zT3B0aW9uczogRGlyZWN0aW9uc09wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8RGlyZWN0aW9uc1tdPltdIHtcclxuICAgIGlmIChjb29yZGluYXRlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuZGlyZWN0aW9uc1NvdXJjZVNlcnZpY2Uuc291cmNlc1xyXG4gICAgICAuZmlsdGVyKChzb3VyY2U6IERpcmVjdGlvbnNTb3VyY2UpID0+IHNvdXJjZS5lbmFibGVkKVxyXG4gICAgICAubWFwKChzb3VyY2U6IERpcmVjdGlvbnNTb3VyY2UpID0+IHRoaXMucm91dGVTb3VyY2Uoc291cmNlLCBjb29yZGluYXRlcywgZGlyZWN0aW9uc09wdGlvbnMpKTtcclxuICB9XHJcblxyXG4gIHJvdXRlU291cmNlKFxyXG4gICAgc291cmNlOiBEaXJlY3Rpb25zU291cmNlLFxyXG4gICAgY29vcmRpbmF0ZXM6IFtudW1iZXIsIG51bWJlcl1bXSxcclxuICAgIGRpcmVjdGlvbnNPcHRpb25zOiBEaXJlY3Rpb25zT3B0aW9ucyA9IHt9XHJcbiAgKTogT2JzZXJ2YWJsZTxEaXJlY3Rpb25zW10+IHtcclxuICAgIGNvbnN0IHJlcXVlc3QgPSBzb3VyY2Uucm91dGUoY29vcmRpbmF0ZXMsIGRpcmVjdGlvbnNPcHRpb25zICk7XHJcbiAgICByZXR1cm4gcmVxdWVzdDtcclxuICB9XHJcbn1cclxuIl19