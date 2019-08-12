/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { uuid } from '@igo2/utils';
import { ConfigService } from '@igo2/core';
import { RoutingFormat, SourceRoutingType } from '../shared/routing.enum';
import { RoutingSource } from './routing-source';
export class OsrmRoutingSource extends RoutingSource {
    /**
     * @param {?} http
     * @param {?} config
     */
    constructor(http, config) {
        super();
        this.http = http;
        this.config = config;
        this.routingUrl = 'https://geoegl.msp.gouv.qc.ca/services/itineraire/route/v1/driving/';
        this.options = this.config.getConfig('routingSources.osrm') || {};
        this.routingUrl = this.options.url || this.routingUrl;
    }
    /**
     * @return {?}
     */
    get enabled() {
        return this.options.enabled !== false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set enabled(value) {
        this.options.enabled = value;
    }
    /**
     * @return {?}
     */
    getName() {
        return OsrmRoutingSource._name;
    }
    /**
     * @param {?} coordinates
     * @return {?}
     */
    route(coordinates) {
        /** @type {?} */
        const routingParams = this.getRouteParams();
        return this.http
            .get(this.routingUrl + coordinates.join(';'), {
            params: routingParams
        })
            .pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        res => this.extractRoutesData(res))));
    }
    /**
     * @private
     * @param {?} response
     * @return {?}
     */
    extractRoutesData(response) {
        /** @type {?} */
        const routeResponse = [];
        response.routes.forEach((/**
         * @param {?} route
         * @return {?}
         */
        route => {
            routeResponse.push(this.formatRoute(route, response.waypoints));
        }));
        return routeResponse;
    }
    /**
     * @private
     * @return {?}
     */
    getRouteParams() {
        return new HttpParams({
            fromObject: {
                overview: 'full',
                steps: 'true',
                geometries: 'geojson',
                alternatives: 'true'
            }
        });
    }
    /**
     * @private
     * @param {?} roadNetworkRoute
     * @param {?} waypoints
     * @return {?}
     */
    formatRoute(roadNetworkRoute, waypoints) {
        /** @type {?} */
        const stepsUI = [];
        roadNetworkRoute.legs.forEach((/**
         * @param {?} leg
         * @return {?}
         */
        leg => {
            leg.steps.forEach((/**
             * @param {?} step
             * @return {?}
             */
            step => {
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
            waypoints,
            distance: roadNetworkRoute.distance,
            duration: roadNetworkRoute.duration,
            geometry: roadNetworkRoute.geometry,
            legs: roadNetworkRoute.legs,
            steps: stepsUI,
            weight: roadNetworkRoute.weight,
            weight_name: roadNetworkRoute.weight_name
        };
    }
}
OsrmRoutingSource._name = 'OSRM Québec';
OsrmRoutingSource.decorators = [
    { type: Injectable }
];
/** @nocollapse */
OsrmRoutingSource.ctorParameters = () => [
    { type: HttpClient },
    { type: ConfigService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3NybS1yb3V0aW5nLXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9yb3V0aW5nL3JvdXRpbmctc291cmNlcy9vc3JtLXJvdXRpbmctc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFOUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDbkMsT0FBTyxFQUFFLGFBQWEsRUFBVyxNQUFNLFlBQVksQ0FBQztBQUdwRCxPQUFPLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFMUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBSWpELE1BQU0sT0FBTyxpQkFBa0IsU0FBUSxhQUFhOzs7OztJQVlsRCxZQUFvQixJQUFnQixFQUFVLE1BQXFCO1FBQ2pFLEtBQUssRUFBRSxDQUFDO1FBRFUsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQWU7UUFKM0QsZUFBVSxHQUNoQixxRUFBcUUsQ0FBQztRQUt0RSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN4RCxDQUFDOzs7O0lBZkQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sS0FBSyxLQUFLLENBQUM7SUFDeEMsQ0FBQzs7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YW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyB1dWlkIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlLCBNZXNzYWdlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBSb3V0aW5nIH0gZnJvbSAnLi4vc2hhcmVkL3JvdXRpbmcuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgUm91dGluZ0Zvcm1hdCwgU291cmNlUm91dGluZ1R5cGUgfSBmcm9tICcuLi9zaGFyZWQvcm91dGluZy5lbnVtJztcclxuXHJcbmltcG9ydCB7IFJvdXRpbmdTb3VyY2UgfSBmcm9tICcuL3JvdXRpbmctc291cmNlJztcclxuaW1wb3J0IHsgUm91dGluZ1NvdXJjZU9wdGlvbnMgfSBmcm9tICcuL3JvdXRpbmctc291cmNlLmludGVyZmFjZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBPc3JtUm91dGluZ1NvdXJjZSBleHRlbmRzIFJvdXRpbmdTb3VyY2Uge1xyXG4gIGdldCBlbmFibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5lbmFibGVkICE9PSBmYWxzZTtcclxuICB9XHJcbiAgc2V0IGVuYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMub3B0aW9ucy5lbmFibGVkID0gdmFsdWU7XHJcbiAgfVxyXG4gIHN0YXRpYyBfbmFtZSA9ICdPU1JNIFF1w6liZWMnO1xyXG4gIHByaXZhdGUgcm91dGluZ1VybCA9XHJcbiAgICAnaHR0cHM6Ly9nZW9lZ2wubXNwLmdvdXYucWMuY2Evc2VydmljZXMvaXRpbmVyYWlyZS9yb3V0ZS92MS9kcml2aW5nLyc7XHJcbiAgcHJpdmF0ZSBvcHRpb25zOiBSb3V0aW5nU291cmNlT3B0aW9ucztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMuY29uZmlnLmdldENvbmZpZygncm91dGluZ1NvdXJjZXMub3NybScpIHx8IHt9O1xyXG4gICAgdGhpcy5yb3V0aW5nVXJsID0gdGhpcy5vcHRpb25zLnVybCB8fCB0aGlzLnJvdXRpbmdVcmw7XHJcbiAgfVxyXG5cclxuICBnZXROYW1lKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gT3NybVJvdXRpbmdTb3VyY2UuX25hbWU7XHJcbiAgfVxyXG5cclxuICByb3V0ZShjb29yZGluYXRlczogW251bWJlciwgbnVtYmVyXVtdKTogT2JzZXJ2YWJsZTxSb3V0aW5nW10+IHtcclxuICAgIGNvbnN0IHJvdXRpbmdQYXJhbXMgPSB0aGlzLmdldFJvdXRlUGFyYW1zKCk7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5nZXQ8SlNPTltdPih0aGlzLnJvdXRpbmdVcmwgKyBjb29yZGluYXRlcy5qb2luKCc7JyksIHtcclxuICAgICAgICBwYXJhbXM6IHJvdXRpbmdQYXJhbXNcclxuICAgICAgfSlcclxuICAgICAgLnBpcGUobWFwKHJlcyA9PiB0aGlzLmV4dHJhY3RSb3V0ZXNEYXRhKHJlcykpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdFJvdXRlc0RhdGEocmVzcG9uc2UpOiBSb3V0aW5nW10ge1xyXG4gICAgY29uc3Qgcm91dGVSZXNwb25zZSA9IFtdO1xyXG4gICAgcmVzcG9uc2Uucm91dGVzLmZvckVhY2gocm91dGUgPT4ge1xyXG4gICAgICByb3V0ZVJlc3BvbnNlLnB1c2godGhpcy5mb3JtYXRSb3V0ZShyb3V0ZSwgcmVzcG9uc2Uud2F5cG9pbnRzKSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByb3V0ZVJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRSb3V0ZVBhcmFtcygpOiBIdHRwUGFyYW1zIHtcclxuICAgIHJldHVybiBuZXcgSHR0cFBhcmFtcyh7XHJcbiAgICAgIGZyb21PYmplY3Q6IHtcclxuICAgICAgICBvdmVydmlldzogJ2Z1bGwnLFxyXG4gICAgICAgIHN0ZXBzOiAndHJ1ZScsXHJcbiAgICAgICAgZ2VvbWV0cmllczogJ2dlb2pzb24nLFxyXG4gICAgICAgIGFsdGVybmF0aXZlczogJ3RydWUnXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmb3JtYXRSb3V0ZShyb2FkTmV0d29ya1JvdXRlOiBhbnksIHdheXBvaW50czogYW55KTogUm91dGluZyB7XHJcbiAgICBjb25zdCBzdGVwc1VJID0gW107XHJcbiAgICByb2FkTmV0d29ya1JvdXRlLmxlZ3MuZm9yRWFjaChsZWcgPT4ge1xyXG4gICAgICBsZWcuc3RlcHMuZm9yRWFjaChzdGVwID0+IHtcclxuICAgICAgICBzdGVwc1VJLnB1c2goc3RlcCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBpZDogdXVpZCgpLFxyXG4gICAgICB0aXRsZTogcm9hZE5ldHdvcmtSb3V0ZS5sZWdzWzBdLnN1bW1hcnksXHJcbiAgICAgIHNvdXJjZTogT3NybVJvdXRpbmdTb3VyY2UuX25hbWUsXHJcbiAgICAgIHNvdXJjZVR5cGU6IFNvdXJjZVJvdXRpbmdUeXBlLlJvdXRlLFxyXG4gICAgICBvcmRlcjogMSxcclxuICAgICAgZm9ybWF0OiBSb3V0aW5nRm9ybWF0Lkdlb0pTT04sXHJcbiAgICAgIGljb246ICdkaXJlY3Rpb25zJyxcclxuICAgICAgcHJvamVjdGlvbjogJ0VQU0c6NDMyNicsXHJcbiAgICAgIHdheXBvaW50cyxcclxuICAgICAgZGlzdGFuY2U6IHJvYWROZXR3b3JrUm91dGUuZGlzdGFuY2UsXHJcbiAgICAgIGR1cmF0aW9uOiByb2FkTmV0d29ya1JvdXRlLmR1cmF0aW9uLFxyXG4gICAgICBnZW9tZXRyeTogcm9hZE5ldHdvcmtSb3V0ZS5nZW9tZXRyeSxcclxuICAgICAgbGVnczogcm9hZE5ldHdvcmtSb3V0ZS5sZWdzLFxyXG4gICAgICBzdGVwczogc3RlcHNVSSxcclxuICAgICAgd2VpZ2h0OiByb2FkTmV0d29ya1JvdXRlLndlaWdodCxcclxuICAgICAgd2VpZ2h0X25hbWU6IHJvYWROZXR3b3JrUm91dGUud2VpZ2h0X25hbWVcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==