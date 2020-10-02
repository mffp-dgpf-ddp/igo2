/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { uuid } from '@igo2/utils';
import { ConfigService } from '@igo2/core';
import { DirectionsFormat, SourceDirectionsType } from '../shared/directions.enum';
import { DirectionsSource } from './directions-source';
export class OsrmDirectionsSource extends DirectionsSource {
    /**
     * @param {?} http
     * @param {?} config
     */
    constructor(http, config) {
        super();
        this.http = http;
        this.config = config;
        this.directionsUrl = 'https://geoegl.msp.gouv.qc.ca/services/itineraire/route/v1/driving/';
        this.options = this.config.getConfig('directionsSources.osrm') || {};
        this.directionsUrl = this.options.url || this.directionsUrl;
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
        return OsrmDirectionsSource._name;
    }
    /**
     * @param {?} coordinates
     * @param {?=} directionsOptions
     * @return {?}
     */
    route(coordinates, directionsOptions = {}) {
        /** @type {?} */
        const directionsParams = this.getRouteParams(directionsOptions);
        return this.http
            .get(this.directionsUrl + coordinates.join(';'), {
            params: directionsParams
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
     * @param {?=} directionsOptions
     * @return {?}
     */
    getRouteParams(directionsOptions = {}) {
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
            source: OsrmDirectionsSource._name,
            sourceType: SourceDirectionsType.Route,
            order: 1,
            format: DirectionsFormat.GeoJSON,
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
OsrmDirectionsSource._name = 'OSRM Québec';
OsrmDirectionsSource.decorators = [
    { type: Injectable }
];
/** @nocollapse */
OsrmDirectionsSource.ctorParameters = () => [
    { type: HttpClient },
    { type: ConfigService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3NybS1kaXJlY3Rpb25zLXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3Rpb25zL2RpcmVjdGlvbnMtc291cmNlcy9vc3JtLWRpcmVjdGlvbnMtc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFOUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDbkMsT0FBTyxFQUFFLGFBQWEsRUFBVyxNQUFNLFlBQVksQ0FBQztBQUdwRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVuRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUl2RCxNQUFNLE9BQU8sb0JBQXFCLFNBQVEsZ0JBQWdCOzs7OztJQVl4RCxZQUFvQixJQUFnQixFQUFVLE1BQXFCO1FBQ2pFLEtBQUssRUFBRSxDQUFDO1FBRFUsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQWU7UUFKM0Qsa0JBQWEsR0FDbkIscUVBQXFFLENBQUM7UUFLdEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyRSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDOUQsQ0FBQzs7OztJQWZELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEtBQUssS0FB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QUM7WUFDckIsQ0FBQyxFQUFDLENBQUM7UUFDTCxDQUFDLEVBQUMsQ0FBQztRQUNILE9BQU87WUFDTCxFQUFFLEVBQUUsSUFBSSxFQUFFO1lBQ1YsS0FBSyxFQUFFLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPO1lBQ3ZDLE1BQU0sRUFBRSxvQkFBb0IsQ0FBQyxLQUFLO1lBQ2xDLFVBQVUsRUFBRSxvQkFBb0IsQ0FBQyxLQUFLO1lBQ3RDLEtBQUssRUFBRSxDQUFDO1lBQ1IsTUFBTSxFQUFFLGdCQUFnQixDQUFDLE9BQU87WUFDaEMsSUFBSSxFQUFFLFlBQVk7WUFDbEIsVUFBVSxFQUFFLFdBQVc7WUFDdkIsU0FBUztZQUNULFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxRQUFRO1lBQ25DLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxRQUFRO1lBQ25DLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxRQUFRO1lBQ25DLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJO1lBQzNCLEtBQUssRUFBRSxPQUFPO1lBQ2QsTUFBTSxFQUFFLGdCQUFnQixDQUFDLE1BQU07WUFDL0IsV0FBVyxFQUFFLGdCQUFnQixDQUFDLFdBQVc7U0FDMUMsQ0FBQztJQUNKLENBQUM7O0FBMUVNLDBCQUFLLEdBQUcsYUFBYSxDQUFDOztZQVI5QixVQUFVOzs7O1lBYkYsVUFBVTtZQUtWLGFBQWE7Ozs7SUFnQnBCLDJCQUE2Qjs7Ozs7SUFDN0IsNkNBQ3dFOzs7OztJQUN4RSx1Q0FBeUM7Ozs7O0lBRTdCLG9DQUF3Qjs7Ozs7SUFBRSxzQ0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgdXVpZCB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSwgTWVzc2FnZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRGlyZWN0aW9ucywgRGlyZWN0aW9uc09wdGlvbnMgfSBmcm9tICcuLi9zaGFyZWQvZGlyZWN0aW9ucy5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBEaXJlY3Rpb25zRm9ybWF0LCBTb3VyY2VEaXJlY3Rpb25zVHlwZSB9IGZyb20gJy4uL3NoYXJlZC9kaXJlY3Rpb25zLmVudW0nO1xyXG5cclxuaW1wb3J0IHsgRGlyZWN0aW9uc1NvdXJjZSB9IGZyb20gJy4vZGlyZWN0aW9ucy1zb3VyY2UnO1xyXG5pbXBvcnQgeyBEaXJlY3Rpb25zU291cmNlT3B0aW9ucyB9IGZyb20gJy4vZGlyZWN0aW9ucy1zb3VyY2UuaW50ZXJmYWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE9zcm1EaXJlY3Rpb25zU291cmNlIGV4dGVuZHMgRGlyZWN0aW9uc1NvdXJjZSB7XHJcbiAgZ2V0IGVuYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmVuYWJsZWQgIT09IGZhbHNlO1xyXG4gIH1cclxuICBzZXQgZW5hYmxlZCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5vcHRpb25zLmVuYWJsZWQgPSB2YWx1ZTtcclxuICB9XHJcbiAgc3RhdGljIF9uYW1lID0gJ09TUk0gUXXDqWJlYyc7XHJcbiAgcHJpdmF0ZSBkaXJlY3Rpb25zVXJsID1cclxuICAgICdodHRwczovL2dlb2VnbC5tc3AuZ291di5xYy5jYS9zZXJ2aWNlcy9pdGluZXJhaXJlL3JvdXRlL3YxL2RyaXZpbmcvJztcclxuICBwcml2YXRlIG9wdGlvbnM6IERpcmVjdGlvbnNTb3VyY2VPcHRpb25zO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdkaXJlY3Rpb25zU291cmNlcy5vc3JtJykgfHwge307XHJcbiAgICB0aGlzLmRpcmVjdGlvbnNVcmwgPSB0aGlzLm9wdGlvbnMudXJsIHx8IHRoaXMuZGlyZWN0aW9uc1VybDtcclxuICB9XHJcblxyXG4gIGdldE5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBPc3JtRGlyZWN0aW9uc1NvdXJjZS5fbmFtZTtcclxuICB9XHJcblxyXG4gIHJvdXRlKGNvb3JkaW5hdGVzOiBbbnVtYmVyLCBudW1iZXJdW10sIGRpcmVjdGlvbnNPcHRpb25zOiBEaXJlY3Rpb25zT3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxEaXJlY3Rpb25zW10+IHtcclxuICAgIGNvbnN0IGRpcmVjdGlvbnNQYXJhbXMgPSB0aGlzLmdldFJvdXRlUGFyYW1zKGRpcmVjdGlvbnNPcHRpb25zKTtcclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLmdldDxKU09OW10+KHRoaXMuZGlyZWN0aW9uc1VybCArIGNvb3JkaW5hdGVzLmpvaW4oJzsnKSwge1xyXG4gICAgICAgIHBhcmFtczogZGlyZWN0aW9uc1BhcmFtc1xyXG4gICAgICB9KVxyXG4gICAgICAucGlwZShtYXAocmVzID0+IHRoaXMuZXh0cmFjdFJvdXRlc0RhdGEocmVzKSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0Um91dGVzRGF0YShyZXNwb25zZSk6IERpcmVjdGlvbnNbXSB7XHJcbiAgICBjb25zdCByb3V0ZVJlc3BvbnNlID0gW107XHJcbiAgICByZXNwb25zZS5yb3V0ZXMuZm9yRWFjaChyb3V0ZSA9PiB7XHJcbiAgICAgIHJvdXRlUmVzcG9uc2UucHVzaCh0aGlzLmZvcm1hdFJvdXRlKHJvdXRlLCByZXNwb25zZS53YXlwb2ludHMpKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJvdXRlUmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFJvdXRlUGFyYW1zKGRpcmVjdGlvbnNPcHRpb25zOiBEaXJlY3Rpb25zT3B0aW9ucyA9IHt9KTogSHR0cFBhcmFtcyB7XHJcblxyXG4gICAgZGlyZWN0aW9uc09wdGlvbnMuYWx0ZXJuYXRpdmVzID0gZGlyZWN0aW9uc09wdGlvbnMuYWx0ZXJuYXRpdmVzICE9PSB1bmRlZmluZWQgPyBkaXJlY3Rpb25zT3B0aW9ucy5hbHRlcm5hdGl2ZXMgOiB0cnVlO1xyXG4gICAgZGlyZWN0aW9uc09wdGlvbnMuc3RlcHMgPSBkaXJlY3Rpb25zT3B0aW9ucy5zdGVwcyAhPT0gdW5kZWZpbmVkICA/IGRpcmVjdGlvbnNPcHRpb25zLnN0ZXBzIDogdHJ1ZTtcclxuICAgIGRpcmVjdGlvbnNPcHRpb25zLmdlb21ldHJpZXMgPSBkaXJlY3Rpb25zT3B0aW9ucy5nZW9tZXRyaWVzICE9PSB1bmRlZmluZWQgID8gZGlyZWN0aW9uc09wdGlvbnMuZ2VvbWV0cmllcyA6ICdnZW9qc29uJztcclxuICAgIGRpcmVjdGlvbnNPcHRpb25zLm92ZXJ2aWV3ID0gZGlyZWN0aW9uc09wdGlvbnMub3ZlcnZpZXcgIT09IHVuZGVmaW5lZCAgPyBkaXJlY3Rpb25zT3B0aW9ucy5vdmVydmlldyA6IGZhbHNlO1xyXG5cclxuICAgIHJldHVybiBuZXcgSHR0cFBhcmFtcyh7XHJcbiAgICAgIGZyb21PYmplY3Q6IHtcclxuICAgICAgICBhbHRlcm5hdGl2ZXM6IGRpcmVjdGlvbnNPcHRpb25zLmFsdGVybmF0aXZlcyA/ICd0cnVlJyA6ICdmYWxzZScsXHJcbiAgICAgICAgb3ZlcnZpZXc6IGRpcmVjdGlvbnNPcHRpb25zLm92ZXJ2aWV3ID8gJ3NpbXBsaWZpZWQnIDogJ2Z1bGwnLFxyXG4gICAgICAgIHN0ZXBzOiBkaXJlY3Rpb25zT3B0aW9ucy5zdGVwcyA/ICd0cnVlJyA6ICdmYWxzZScsXHJcbiAgICAgICAgZ2VvbWV0cmllczogZGlyZWN0aW9uc09wdGlvbnMuZ2VvbWV0cmllcyA/IGRpcmVjdGlvbnNPcHRpb25zLmdlb21ldHJpZXMgOiAnZ2VvanNvbicsXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmb3JtYXRSb3V0ZShyb2FkTmV0d29ya1JvdXRlOiBhbnksIHdheXBvaW50czogYW55KTogRGlyZWN0aW9ucyB7XHJcbiAgICBjb25zdCBzdGVwc1VJID0gW107XHJcbiAgICByb2FkTmV0d29ya1JvdXRlLmxlZ3MuZm9yRWFjaChsZWcgPT4ge1xyXG4gICAgICBsZWcuc3RlcHMuZm9yRWFjaChzdGVwID0+IHtcclxuICAgICAgICBzdGVwc1VJLnB1c2goc3RlcCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBpZDogdXVpZCgpLFxyXG4gICAgICB0aXRsZTogcm9hZE5ldHdvcmtSb3V0ZS5sZWdzWzBdLnN1bW1hcnksXHJcbiAgICAgIHNvdXJjZTogT3NybURpcmVjdGlvbnNTb3VyY2UuX25hbWUsXHJcbiAgICAgIHNvdXJjZVR5cGU6IFNvdXJjZURpcmVjdGlvbnNUeXBlLlJvdXRlLFxyXG4gICAgICBvcmRlcjogMSxcclxuICAgICAgZm9ybWF0OiBEaXJlY3Rpb25zRm9ybWF0Lkdlb0pTT04sXHJcbiAgICAgIGljb246ICdkaXJlY3Rpb25zJyxcclxuICAgICAgcHJvamVjdGlvbjogJ0VQU0c6NDMyNicsXHJcbiAgICAgIHdheXBvaW50cyxcclxuICAgICAgZGlzdGFuY2U6IHJvYWROZXR3b3JrUm91dGUuZGlzdGFuY2UsXHJcbiAgICAgIGR1cmF0aW9uOiByb2FkTmV0d29ya1JvdXRlLmR1cmF0aW9uLFxyXG4gICAgICBnZW9tZXRyeTogcm9hZE5ldHdvcmtSb3V0ZS5nZW9tZXRyeSxcclxuICAgICAgbGVnczogcm9hZE5ldHdvcmtSb3V0ZS5sZWdzLFxyXG4gICAgICBzdGVwczogc3RlcHNVSSxcclxuICAgICAgd2VpZ2h0OiByb2FkTmV0d29ya1JvdXRlLndlaWdodCxcclxuICAgICAgd2VpZ2h0X25hbWU6IHJvYWROZXR3b3JrUm91dGUud2VpZ2h0X25hbWVcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==