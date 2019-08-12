/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { uuid } from '@igo2/utils';
import { ConfigService } from '@igo2/core';
import { RoutingFormat, SourceRoutingType } from '../shared/routing.enum';
import { RoutingSource } from './routing-source';
var OsrmRoutingSource = /** @class */ (function (_super) {
    tslib_1.__extends(OsrmRoutingSource, _super);
    function OsrmRoutingSource(http, config) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.config = config;
        _this.routingUrl = 'https://geoegl.msp.gouv.qc.ca/services/itineraire/route/v1/driving/';
        _this.options = _this.config.getConfig('routingSources.osrm') || {};
        _this.routingUrl = _this.options.url || _this.routingUrl;
        return _this;
    }
    Object.defineProperty(OsrmRoutingSource.prototype, "enabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this.options.enabled !== false;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.options.enabled = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OsrmRoutingSource.prototype.getName = /**
     * @return {?}
     */
    function () {
        return OsrmRoutingSource._name;
    };
    /**
     * @param {?} coordinates
     * @return {?}
     */
    OsrmRoutingSource.prototype.route = /**
     * @param {?} coordinates
     * @return {?}
     */
    function (coordinates) {
        var _this = this;
        /** @type {?} */
        var routingParams = this.getRouteParams();
        return this.http
            .get(this.routingUrl + coordinates.join(';'), {
            params: routingParams
        })
            .pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return _this.extractRoutesData(res); })));
    };
    /**
     * @private
     * @param {?} response
     * @return {?}
     */
    OsrmRoutingSource.prototype.extractRoutesData = /**
     * @private
     * @param {?} response
     * @return {?}
     */
    function (response) {
        var _this = this;
        /** @type {?} */
        var routeResponse = [];
        response.routes.forEach((/**
         * @param {?} route
         * @return {?}
         */
        function (route) {
            routeResponse.push(_this.formatRoute(route, response.waypoints));
        }));
        return routeResponse;
    };
    /**
     * @private
     * @return {?}
     */
    OsrmRoutingSource.prototype.getRouteParams = /**
     * @private
     * @return {?}
     */
    function () {
        return new HttpParams({
            fromObject: {
                overview: 'full',
                steps: 'true',
                geometries: 'geojson',
                alternatives: 'true'
            }
        });
    };
    /**
     * @private
     * @param {?} roadNetworkRoute
     * @param {?} waypoints
     * @return {?}
     */
    OsrmRoutingSource.prototype.formatRoute = /**
     * @private
     * @param {?} roadNetworkRoute
     * @param {?} waypoints
     * @return {?}
     */
    function (roadNetworkRoute, waypoints) {
        /** @type {?} */
        var stepsUI = [];
        roadNetworkRoute.legs.forEach((/**
         * @param {?} leg
         * @return {?}
         */
        function (leg) {
            leg.steps.forEach((/**
             * @param {?} step
             * @return {?}
             */
            function (step) {
                stepsUI.push(step);
            }));
        }));
        return {
            id: uuid(),
            title: roadNetworkRoute.legs[0].summary,
            source: OsrmRoutingSource._name,
            sourceType: SourceRoutingType.Route,
            order: 1,
            format: RoutingFormat.GeoJSON,
            icon: 'directions',
            projection: 'EPSG:4326',
            waypoints: waypoints,
            distance: roadNetworkRoute.distance,
            duration: roadNetworkRoute.duration,
            geometry: roadNetworkRoute.geometry,
            legs: roadNetworkRoute.legs,
            steps: stepsUI,
            weight: roadNetworkRoute.weight,
            weight_name: roadNetworkRoute.weight_name
        };
    };
    OsrmRoutingSource._name = 'OSRM Québec';
    OsrmRoutingSource.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    OsrmRoutingSource.ctorParameters = function () { return [
        { type: HttpClient },
        { type: ConfigService }
    ]; };
    return OsrmRoutingSource;
}(RoutingSource));
export { OsrmRoutingSource };
if (false) {
    /** @type {?} */
    OsrmRoutingSource._name;
    /**
     * @type {?}
     * @private
     */
    OsrmRoutingSource.prototype.routingUrl;
    /**
     * @type {?}
     * @private
     */
    OsrmRoutingSource.prototype.options;
    /**
     * @type {?}
     * @private
     */
    OsrmRoutingSource.prototype.http;
    /**
     * @type {?}
     * @private
     */
    OsrmRoutingSource.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3NybS1yb3V0aW5nLXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9yb3V0aW5nL3JvdXRpbmctc291cmNlcy9vc3JtLXJvdXRpbmctc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTlELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ25DLE9BQU8sRUFBRSxhQUFhLEVBQVcsTUFBTSxZQUFZLENBQUM7QUFHcEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUdqRDtJQUN1Qyw2Q0FBYTtJQVlsRCwyQkFBb0IsSUFBZ0IsRUFBVSxNQUFxQjtRQUFuRSxZQUNFLGlCQUFPLFNBR1I7UUFKbUIsVUFBSSxHQUFKLElBQUksQ0FBWTtRQUFVLFlBQU0sR0FBTixNQUFNLENBQWU7UUFKM0QsZ0JBQVUsR0FDaEIscUVBQXFFLENBQUM7UUFLdEUsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNsRSxLQUFJLENBQUMsVUFBVSxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLEtBQUksQ0FBQyxVQUFVLENBQUM7O0lBQ3hELENBQUM7SUFmRCxzQkFBSSxzQ0FBTzs7OztRQUFYO1lBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sS0FBSyxLQUFLLENBQUM7UUFDeEMsQ0FBQzs7Ozs7UUFD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QUE2Qjs7Ozs7SUFDN0IsdUNBQ3dFOzs7OztJQUN4RSxvQ0FBc0M7Ozs7O0lBRTFCLGlDQUF3Qjs7Ozs7SUFBRSxtQ0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgdXVpZCB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSwgTWVzc2FnZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgUm91dGluZyB9IGZyb20gJy4uL3NoYXJlZC9yb3V0aW5nLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFJvdXRpbmdGb3JtYXQsIFNvdXJjZVJvdXRpbmdUeXBlIH0gZnJvbSAnLi4vc2hhcmVkL3JvdXRpbmcuZW51bSc7XHJcblxyXG5pbXBvcnQgeyBSb3V0aW5nU291cmNlIH0gZnJvbSAnLi9yb3V0aW5nLXNvdXJjZSc7XHJcbmltcG9ydCB7IFJvdXRpbmdTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi9yb3V0aW5nLXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgT3NybVJvdXRpbmdTb3VyY2UgZXh0ZW5kcyBSb3V0aW5nU291cmNlIHtcclxuICBnZXQgZW5hYmxlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZW5hYmxlZCAhPT0gZmFsc2U7XHJcbiAgfVxyXG4gIHNldCBlbmFibGVkKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMuZW5hYmxlZCA9IHZhbHVlO1xyXG4gIH1cclxuICBzdGF0aWMgX25hbWUgPSAnT1NSTSBRdcOpYmVjJztcclxuICBwcml2YXRlIHJvdXRpbmdVcmwgPVxyXG4gICAgJ2h0dHBzOi8vZ2VvZWdsLm1zcC5nb3V2LnFjLmNhL3NlcnZpY2VzL2l0aW5lcmFpcmUvcm91dGUvdjEvZHJpdmluZy8nO1xyXG4gIHByaXZhdGUgb3B0aW9uczogUm91dGluZ1NvdXJjZU9wdGlvbnM7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmNvbmZpZy5nZXRDb25maWcoJ3JvdXRpbmdTb3VyY2VzLm9zcm0nKSB8fCB7fTtcclxuICAgIHRoaXMucm91dGluZ1VybCA9IHRoaXMub3B0aW9ucy51cmwgfHwgdGhpcy5yb3V0aW5nVXJsO1xyXG4gIH1cclxuXHJcbiAgZ2V0TmFtZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIE9zcm1Sb3V0aW5nU291cmNlLl9uYW1lO1xyXG4gIH1cclxuXHJcbiAgcm91dGUoY29vcmRpbmF0ZXM6IFtudW1iZXIsIG51bWJlcl1bXSk6IE9ic2VydmFibGU8Um91dGluZ1tdPiB7XHJcbiAgICBjb25zdCByb3V0aW5nUGFyYW1zID0gdGhpcy5nZXRSb3V0ZVBhcmFtcygpO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuZ2V0PEpTT05bXT4odGhpcy5yb3V0aW5nVXJsICsgY29vcmRpbmF0ZXMuam9pbignOycpLCB7XHJcbiAgICAgICAgcGFyYW1zOiByb3V0aW5nUGFyYW1zXHJcbiAgICAgIH0pXHJcbiAgICAgIC5waXBlKG1hcChyZXMgPT4gdGhpcy5leHRyYWN0Um91dGVzRGF0YShyZXMpKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RSb3V0ZXNEYXRhKHJlc3BvbnNlKTogUm91dGluZ1tdIHtcclxuICAgIGNvbnN0IHJvdXRlUmVzcG9uc2UgPSBbXTtcclxuICAgIHJlc3BvbnNlLnJvdXRlcy5mb3JFYWNoKHJvdXRlID0+IHtcclxuICAgICAgcm91dGVSZXNwb25zZS5wdXNoKHRoaXMuZm9ybWF0Um91dGUocm91dGUsIHJlc3BvbnNlLndheXBvaW50cykpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcm91dGVSZXNwb25zZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0Um91dGVQYXJhbXMoKTogSHR0cFBhcmFtcyB7XHJcbiAgICByZXR1cm4gbmV3IEh0dHBQYXJhbXMoe1xyXG4gICAgICBmcm9tT2JqZWN0OiB7XHJcbiAgICAgICAgb3ZlcnZpZXc6ICdmdWxsJyxcclxuICAgICAgICBzdGVwczogJ3RydWUnLFxyXG4gICAgICAgIGdlb21ldHJpZXM6ICdnZW9qc29uJyxcclxuICAgICAgICBhbHRlcm5hdGl2ZXM6ICd0cnVlJ1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZm9ybWF0Um91dGUocm9hZE5ldHdvcmtSb3V0ZTogYW55LCB3YXlwb2ludHM6IGFueSk6IFJvdXRpbmcge1xyXG4gICAgY29uc3Qgc3RlcHNVSSA9IFtdO1xyXG4gICAgcm9hZE5ldHdvcmtSb3V0ZS5sZWdzLmZvckVhY2gobGVnID0+IHtcclxuICAgICAgbGVnLnN0ZXBzLmZvckVhY2goc3RlcCA9PiB7XHJcbiAgICAgICAgc3RlcHNVSS5wdXNoKHN0ZXApO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaWQ6IHV1aWQoKSxcclxuICAgICAgdGl0bGU6IHJvYWROZXR3b3JrUm91dGUubGVnc1swXS5zdW1tYXJ5LFxyXG4gICAgICBzb3VyY2U6IE9zcm1Sb3V0aW5nU291cmNlLl9uYW1lLFxyXG4gICAgICBzb3VyY2VUeXBlOiBTb3VyY2VSb3V0aW5nVHlwZS5Sb3V0ZSxcclxuICAgICAgb3JkZXI6IDEsXHJcbiAgICAgIGZvcm1hdDogUm91dGluZ0Zvcm1hdC5HZW9KU09OLFxyXG4gICAgICBpY29uOiAnZGlyZWN0aW9ucycsXHJcbiAgICAgIHByb2plY3Rpb246ICdFUFNHOjQzMjYnLFxyXG4gICAgICB3YXlwb2ludHMsXHJcbiAgICAgIGRpc3RhbmNlOiByb2FkTmV0d29ya1JvdXRlLmRpc3RhbmNlLFxyXG4gICAgICBkdXJhdGlvbjogcm9hZE5ldHdvcmtSb3V0ZS5kdXJhdGlvbixcclxuICAgICAgZ2VvbWV0cnk6IHJvYWROZXR3b3JrUm91dGUuZ2VvbWV0cnksXHJcbiAgICAgIGxlZ3M6IHJvYWROZXR3b3JrUm91dGUubGVncyxcclxuICAgICAgc3RlcHM6IHN0ZXBzVUksXHJcbiAgICAgIHdlaWdodDogcm9hZE5ldHdvcmtSb3V0ZS53ZWlnaHQsXHJcbiAgICAgIHdlaWdodF9uYW1lOiByb2FkTmV0d29ya1JvdXRlLndlaWdodF9uYW1lXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=