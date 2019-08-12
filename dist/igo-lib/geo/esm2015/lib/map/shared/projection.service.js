/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import proj4 from 'proj4';
import * as olproj from 'ol/proj';
import * as olproj4 from 'ol/proj/proj4';
import { ConfigService } from '@igo2/core';
import * as i0 from "@angular/core";
import * as i1 from "@igo2/core";
/**
 * When injected, this service automatically registers and
 * projection defined in the application config. A custom projection
 * needs to be registered to be usable by OL.
 */
export class ProjectionService {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.config = config;
        /** @type {?} */
        const projections = this.config.getConfig('projections') || [];
        projections.forEach((/**
         * @param {?} projection
         * @return {?}
         */
        (projection) => {
            this.registerProjection(projection);
        }));
    }
    /**
     * Define a proj4 projection and register it in OL
     * @param {?} projection Projection
     * @return {?}
     */
    registerProjection(projection) {
        proj4.defs(projection.code, projection.def);
        olproj4.register(proj4);
        olproj.get(projection.code).setExtent(projection.extent);
    }
}
ProjectionService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ProjectionService.ctorParameters = () => [
    { type: ConfigService }
];
/** @nocollapse */ ProjectionService.ngInjectableDef = i0.defineInjectable({ factory: function ProjectionService_Factory() { return new ProjectionService(i0.inject(i1.ConfigService)); }, token: ProjectionService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    ProjectionService.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL21hcC9zaGFyZWQvcHJvamVjdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMxQixPQUFPLEtBQUssTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUNsQyxPQUFPLEtBQUssT0FBTyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDOzs7Ozs7OztBQVkzQyxNQUFNLE9BQU8saUJBQWlCOzs7O0lBRTVCLFlBQW9CLE1BQXFCO1FBQXJCLFdBQU0sR0FBTixNQUFNLENBQWU7O2NBQ2pDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFO1FBQzlELFdBQVcsQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxVQUFzQixFQUFFLEVBQUU7WUFDN0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBTUQsa0JBQWtCLENBQUMsVUFBc0I7UUFDdkMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7O1lBcEJGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQVhRLGFBQWE7Ozs7Ozs7O0lBY1IsbUNBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHByb2o0IGZyb20gJ3Byb2o0JztcclxuaW1wb3J0ICogYXMgb2xwcm9qIGZyb20gJ29sL3Byb2onO1xyXG5pbXBvcnQgKiBhcyBvbHByb2o0IGZyb20gJ29sL3Byb2ovcHJvajQnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgUHJvamVjdGlvbiB9IGZyb20gJy4vcHJvamVjdGlvbi5pbnRlcmZhY2VzJztcclxuXHJcbi8qKlxyXG4gKiBXaGVuIGluamVjdGVkLCB0aGlzIHNlcnZpY2UgYXV0b21hdGljYWxseSByZWdpc3RlcnMgYW5kXHJcbiAqIHByb2plY3Rpb24gZGVmaW5lZCBpbiB0aGUgYXBwbGljYXRpb24gY29uZmlnLiBBIGN1c3RvbSBwcm9qZWN0aW9uXHJcbiAqIG5lZWRzIHRvIGJlIHJlZ2lzdGVyZWQgdG8gYmUgdXNhYmxlIGJ5IE9MLlxyXG4gKi9cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUHJvamVjdGlvblNlcnZpY2Uge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkge1xyXG4gICAgY29uc3QgcHJvamVjdGlvbnMgPSB0aGlzLmNvbmZpZy5nZXRDb25maWcoJ3Byb2plY3Rpb25zJykgfHwgW107XHJcbiAgICBwcm9qZWN0aW9ucy5mb3JFYWNoKChwcm9qZWN0aW9uOiBQcm9qZWN0aW9uKSA9PiB7XHJcbiAgICAgIHRoaXMucmVnaXN0ZXJQcm9qZWN0aW9uKHByb2plY3Rpb24pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmUgYSBwcm9qNCBwcm9qZWN0aW9uIGFuZCByZWdpc3RlciBpdCBpbiBPTFxyXG4gICAqIEBwYXJhbSBwcm9qZWN0aW9uIFByb2plY3Rpb25cclxuICAgKi9cclxuICByZWdpc3RlclByb2plY3Rpb24ocHJvamVjdGlvbjogUHJvamVjdGlvbikge1xyXG4gICAgcHJvajQuZGVmcyhwcm9qZWN0aW9uLmNvZGUsIHByb2plY3Rpb24uZGVmKTtcclxuICAgIG9scHJvajQucmVnaXN0ZXIocHJvajQpO1xyXG4gICAgb2xwcm9qLmdldChwcm9qZWN0aW9uLmNvZGUpLnNldEV4dGVudChwcm9qZWN0aW9uLmV4dGVudCk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=