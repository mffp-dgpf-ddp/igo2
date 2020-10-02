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
import { DirectionsFormat, SourceDirectionsType } from '../shared/directions.enum';
import { DirectionsSource } from './directions-source';
var OsrmDirectionsSource = /** @class */ (function (_super) {
    tslib_1.__extends(OsrmDirectionsSource, _super);
    function OsrmDirectionsSource(http, config) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.config = config;
        _this.directionsUrl = 'https://geoegl.msp.gouv.qc.ca/services/itineraire/route/v1/driving/';
        _this.options = _this.config.getConfig('directionsSources.osrm') || {};
        _this.directionsUrl = _this.options.url || _this.directionsUrl;
        return _this;
    }
    Object.defineProperty(OsrmDirectionsSource.prototype, "enabled", {
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
    OsrmDirectionsSource.prototype.getName = /**
     * @return {?}
     */
    function () {
        return OsrmDirectionsSource._name;
    };
    /**
     * @param {?} coordinates
     * @param {?=} directionsOptions
     * @return {?}
     */
    OsrmDirectionsSource.prototype.route = /**
     * @param {?} coordinates
     * @param {?=} directionsOptions
     * @return {?}
     */
    function (coordinates, directionsOptions) {
        var _this = this;
        if (directionsOptions === void 0) { directionsOptions = {}; }
        /** @type {?} */
        var directionsParams = this.getRouteParams(directionsOptions);
        return this.http
            .get(this.directionsUrl + coordinates.join(';'), {
            params: directionsParams
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
    OsrmDirectionsSource.prototype.extractRoutesData = /**
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
     * @param {?=} directionsOptions
     * @return {?}
     */
    OsrmDirectionsSource.prototype.getRouteParams = /**
     * @private
     * @param {?=} directionsOptions
     * @return {?}
     */
    function (directionsOptions) {
        if (directionsOptions === void 0) { directionsOptions = {}; }
        directionsOptions.alternatives = directionsOptions.alternatives !== undefined ? directionsOptions.alternatives : true;
        directionsOptions.steps = directionsOptions.steps !== undefined ? directionsOptions.steps : true;
        directionsOptions.geometries = directionsOptions.geometries !== undefined ? directionsOptions.geometries : 'geojson';
        directionsOptions.overview = directionsOptions.overview !== undefined ? directionsOptions.overview : false;
        return new HttpParams({
            fromObject: {
                alternatives: directionsOptions.alternatives ? 'true' : 'false',
                overview: directionsOptions.overview ? 'simplified' : 'full',
                steps: directionsOptions.steps ? 'true' : 'false',
                geometries: directionsOptions.geometries ? directionsOptions.geometries : 'geojson',
            }
        });
    };
    /**
     * @private
     * @param {?} roadNetworkRoute
     * @param {?} waypoints
     * @return {?}
     */
    OsrmDirectionsSource.prototype.formatRoute = /**
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
            source: OsrmDirectionsSource._name,
            sourceType: SourceDirectionsType.Route,
            order: 1,
            format: DirectionsFormat.GeoJSON,
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
    OsrmDirectionsSource._name = 'OSRM Québec';
    OsrmDirectionsSource.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    OsrmDirectionsSource.ctorParameters = function () { return [
        { type: HttpClient },
        { type: ConfigService }
    ]; };
    return OsrmDirectionsSource;
}(DirectionsSource));
export { OsrmDirectionsSource };
if (false) {
    /** @type {?} */
    OsrmDirectionsSource._name;
    /**
     * @type {?}
     * @private
     */
    OsrmDirectionsSource.prototype.directionsUrl;
    /**
     * @type {?}
     * @private
     */
    OsrmDirectionsSource.prototype.options;
    /**
     * @type {?}
     * @private
     */
    OsrmDirectionsSource.prototype.http;
    /**
     * @type {?}
     * @private
     */
    OsrmDirectionsSource.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3NybS1kaXJlY3Rpb25zLXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3Rpb25zL2RpcmVjdGlvbnMtc291cmNlcy9vc3JtLWRpcmVjdGlvbnMtc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTlELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ25DLE9BQU8sRUFBRSxhQUFhLEVBQVcsTUFBTSxZQUFZLENBQUM7QUFHcEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFbkYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHdkQ7SUFDMEMsZ0RBQWdCO0lBWXhELDhCQUFvQixJQUFnQixFQUFVLE1BQXFCO1FBQW5FLFlBQ0UsaUJBQU8sU0FHUjtRQUptQixVQUFJLEdBQUosSUFBSSxDQUFZO1FBQVUsWUFBTSxHQUFOLE1BQU0sQ0FBZTtRQUozRCxtQkFBYSxHQUNuQixxRUFBcUUsQ0FBQztRQUt0RSxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLHdCQUF3QixDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JFLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksS0FBSSxDQUFDLGFBQWEsQ0FBQzs7SUFDOUQsQ0FBQztJQWZELHNCQUFJLHlDQUFPOzs7O1FBQVg7WUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLEtBQUssQ0FBQztR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cm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyB1dWlkIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlLCBNZXNzYWdlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBEaXJlY3Rpb25zLCBEaXJlY3Rpb25zT3B0aW9ucyB9IGZyb20gJy4uL3NoYXJlZC9kaXJlY3Rpb25zLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IERpcmVjdGlvbnNGb3JtYXQsIFNvdXJjZURpcmVjdGlvbnNUeXBlIH0gZnJvbSAnLi4vc2hhcmVkL2RpcmVjdGlvbnMuZW51bSc7XHJcblxyXG5pbXBvcnQgeyBEaXJlY3Rpb25zU291cmNlIH0gZnJvbSAnLi9kaXJlY3Rpb25zLXNvdXJjZSc7XHJcbmltcG9ydCB7IERpcmVjdGlvbnNTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi9kaXJlY3Rpb25zLXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgT3NybURpcmVjdGlvbnNTb3VyY2UgZXh0ZW5kcyBEaXJlY3Rpb25zU291cmNlIHtcclxuICBnZXQgZW5hYmxlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZW5hYmxlZCAhPT0gZmFsc2U7XHJcbiAgfVxyXG4gIHNldCBlbmFibGVkKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMuZW5hYmxlZCA9IHZhbHVlO1xyXG4gIH1cclxuICBzdGF0aWMgX25hbWUgPSAnT1NSTSBRdcOpYmVjJztcclxuICBwcml2YXRlIGRpcmVjdGlvbnNVcmwgPVxyXG4gICAgJ2h0dHBzOi8vZ2VvZWdsLm1zcC5nb3V2LnFjLmNhL3NlcnZpY2VzL2l0aW5lcmFpcmUvcm91dGUvdjEvZHJpdmluZy8nO1xyXG4gIHByaXZhdGUgb3B0aW9uczogRGlyZWN0aW9uc1NvdXJjZU9wdGlvbnM7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmNvbmZpZy5nZXRDb25maWcoJ2RpcmVjdGlvbnNTb3VyY2VzLm9zcm0nKSB8fCB7fTtcclxuICAgIHRoaXMuZGlyZWN0aW9uc1VybCA9IHRoaXMub3B0aW9ucy51cmwgfHwgdGhpcy5kaXJlY3Rpb25zVXJsO1xyXG4gIH1cclxuXHJcbiAgZ2V0TmFtZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIE9zcm1EaXJlY3Rpb25zU291cmNlLl9uYW1lO1xyXG4gIH1cclxuXHJcbiAgcm91dGUoY29vcmRpbmF0ZXM6IFtudW1iZXIsIG51bWJlcl1bXSwgZGlyZWN0aW9uc09wdGlvbnM6IERpcmVjdGlvbnNPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPERpcmVjdGlvbnNbXT4ge1xyXG4gICAgY29uc3QgZGlyZWN0aW9uc1BhcmFtcyA9IHRoaXMuZ2V0Um91dGVQYXJhbXMoZGlyZWN0aW9uc09wdGlvbnMpO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuZ2V0PEpTT05bXT4odGhpcy5kaXJlY3Rpb25zVXJsICsgY29vcmRpbmF0ZXMuam9pbignOycpLCB7XHJcbiAgICAgICAgcGFyYW1zOiBkaXJlY3Rpb25zUGFyYW1zXHJcbiAgICAgIH0pXHJcbiAgICAgIC5waXBlKG1hcChyZXMgPT4gdGhpcy5leHRyYWN0Um91dGVzRGF0YShyZXMpKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RSb3V0ZXNEYXRhKHJlc3BvbnNlKTogRGlyZWN0aW9uc1tdIHtcclxuICAgIGNvbnN0IHJvdXRlUmVzcG9uc2UgPSBbXTtcclxuICAgIHJlc3BvbnNlLnJvdXRlcy5mb3JFYWNoKHJvdXRlID0+IHtcclxuICAgICAgcm91dGVSZXNwb25zZS5wdXNoKHRoaXMuZm9ybWF0Um91dGUocm91dGUsIHJlc3BvbnNlLndheXBvaW50cykpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcm91dGVSZXNwb25zZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0Um91dGVQYXJhbXMoZGlyZWN0aW9uc09wdGlvbnM6IERpcmVjdGlvbnNPcHRpb25zID0ge30pOiBIdHRwUGFyYW1zIHtcclxuXHJcbiAgICBkaXJlY3Rpb25zT3B0aW9ucy5hbHRlcm5hdGl2ZXMgPSBkaXJlY3Rpb25zT3B0aW9ucy5hbHRlcm5hdGl2ZXMgIT09IHVuZGVmaW5lZCA/IGRpcmVjdGlvbnNPcHRpb25zLmFsdGVybmF0aXZlcyA6IHRydWU7XHJcbiAgICBkaXJlY3Rpb25zT3B0aW9ucy5zdGVwcyA9IGRpcmVjdGlvbnNPcHRpb25zLnN0ZXBzICE9PSB1bmRlZmluZWQgID8gZGlyZWN0aW9uc09wdGlvbnMuc3RlcHMgOiB0cnVlO1xyXG4gICAgZGlyZWN0aW9uc09wdGlvbnMuZ2VvbWV0cmllcyA9IGRpcmVjdGlvbnNPcHRpb25zLmdlb21ldHJpZXMgIT09IHVuZGVmaW5lZCAgPyBkaXJlY3Rpb25zT3B0aW9ucy5nZW9tZXRyaWVzIDogJ2dlb2pzb24nO1xyXG4gICAgZGlyZWN0aW9uc09wdGlvbnMub3ZlcnZpZXcgPSBkaXJlY3Rpb25zT3B0aW9ucy5vdmVydmlldyAhPT0gdW5kZWZpbmVkICA/IGRpcmVjdGlvbnNPcHRpb25zLm92ZXJ2aWV3IDogZmFsc2U7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBIdHRwUGFyYW1zKHtcclxuICAgICAgZnJvbU9iamVjdDoge1xyXG4gICAgICAgIGFsdGVybmF0aXZlczogZGlyZWN0aW9uc09wdGlvbnMuYWx0ZXJuYXRpdmVzID8gJ3RydWUnIDogJ2ZhbHNlJyxcclxuICAgICAgICBvdmVydmlldzogZGlyZWN0aW9uc09wdGlvbnMub3ZlcnZpZXcgPyAnc2ltcGxpZmllZCcgOiAnZnVsbCcsXHJcbiAgICAgICAgc3RlcHM6IGRpcmVjdGlvbnNPcHRpb25zLnN0ZXBzID8gJ3RydWUnIDogJ2ZhbHNlJyxcclxuICAgICAgICBnZW9tZXRyaWVzOiBkaXJlY3Rpb25zT3B0aW9ucy5nZW9tZXRyaWVzID8gZGlyZWN0aW9uc09wdGlvbnMuZ2VvbWV0cmllcyA6ICdnZW9qc29uJyxcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZvcm1hdFJvdXRlKHJvYWROZXR3b3JrUm91dGU6IGFueSwgd2F5cG9pbnRzOiBhbnkpOiBEaXJlY3Rpb25zIHtcclxuICAgIGNvbnN0IHN0ZXBzVUkgPSBbXTtcclxuICAgIHJvYWROZXR3b3JrUm91dGUubGVncy5mb3JFYWNoKGxlZyA9PiB7XHJcbiAgICAgIGxlZy5zdGVwcy5mb3JFYWNoKHN0ZXAgPT4ge1xyXG4gICAgICAgIHN0ZXBzVUkucHVzaChzdGVwKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGlkOiB1dWlkKCksXHJcbiAgICAgIHRpdGxlOiByb2FkTmV0d29ya1JvdXRlLmxlZ3NbMF0uc3VtbWFyeSxcclxuICAgICAgc291cmNlOiBPc3JtRGlyZWN0aW9uc1NvdXJjZS5fbmFtZSxcclxuICAgICAgc291cmNlVHlwZTogU291cmNlRGlyZWN0aW9uc1R5cGUuUm91dGUsXHJcbiAgICAgIG9yZGVyOiAxLFxyXG4gICAgICBmb3JtYXQ6IERpcmVjdGlvbnNGb3JtYXQuR2VvSlNPTixcclxuICAgICAgaWNvbjogJ2RpcmVjdGlvbnMnLFxyXG4gICAgICBwcm9qZWN0aW9uOiAnRVBTRzo0MzI2JyxcclxuICAgICAgd2F5cG9pbnRzLFxyXG4gICAgICBkaXN0YW5jZTogcm9hZE5ldHdvcmtSb3V0ZS5kaXN0YW5jZSxcclxuICAgICAgZHVyYXRpb246IHJvYWROZXR3b3JrUm91dGUuZHVyYXRpb24sXHJcbiAgICAgIGdlb21ldHJ5OiByb2FkTmV0d29ya1JvdXRlLmdlb21ldHJ5LFxyXG4gICAgICBsZWdzOiByb2FkTmV0d29ya1JvdXRlLmxlZ3MsXHJcbiAgICAgIHN0ZXBzOiBzdGVwc1VJLFxyXG4gICAgICB3ZWlnaHQ6IHJvYWROZXR3b3JrUm91dGUud2VpZ2h0LFxyXG4gICAgICB3ZWlnaHRfbmFtZTogcm9hZE5ldHdvcmtSb3V0ZS53ZWlnaHRfbmFtZVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19