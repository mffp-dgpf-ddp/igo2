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
var ProjectionService = /** @class */ (function () {
    function ProjectionService(config) {
        var _this = this;
        this.config = config;
        /** @type {?} */
        var projections = this.config.getConfig('projections') || [];
        projections.forEach((/**
         * @param {?} projection
         * @return {?}
         */
        function (projection) {
            _this.registerProjection(projection);
        }));
    }
    /**
     * Define a proj4 projection and register it in OL
     * @param projection Projection
     */
    /**
     * Define a proj4 projection and register it in OL
     * @param {?} projection Projection
     * @return {?}
     */
    ProjectionService.prototype.registerProjection = /**
     * Define a proj4 projection and register it in OL
     * @param {?} projection Projection
     * @return {?}
     */
    function (projection) {
        proj4.defs(projection.code, projection.def);
        olproj4.register(proj4);
        olproj.get(projection.code).setExtent(projection.extent);
    };
    ProjectionService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ProjectionService.ctorParameters = function () { return [
        { type: ConfigService }
    ]; };
    /** @nocollapse */ ProjectionService.ngInjectableDef = i0.defineInjectable({ factory: function ProjectionService_Factory() { return new ProjectionService(i0.inject(i1.ConfigService)); }, token: ProjectionService, providedIn: "root" });
    return ProjectionService;
}());
export { ProjectionService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ProjectionService.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL21hcC9zaGFyZWQvcHJvamVjdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMxQixPQUFPLEtBQUssTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUNsQyxPQUFPLEtBQUssT0FBTyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDOzs7Ozs7OztBQVMzQztJQUtFLDJCQUFvQixNQUFxQjtRQUF6QyxpQkFLQztRQUxtQixXQUFNLEdBQU4sTUFBTSxDQUFlOztZQUNqQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRTtRQUM5RCxXQUFXLENBQUMsT0FBTzs7OztRQUFDLFVBQUMsVUFBc0I7WUFDekMsS0FBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsOENBQWtCOzs7OztJQUFsQixVQUFtQixVQUFzQjtRQUN2QyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzRCxDQUFDOztnQkFwQkYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFYUSxhQUFhOzs7NEJBTnRCO0NBcUNDLEFBdEJELElBc0JDO1NBbkJZLGlCQUFpQjs7Ozs7O0lBRWhCLG1DQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCBwcm9qNCBmcm9tICdwcm9qNCc7XHJcbmltcG9ydCAqIGFzIG9scHJvaiBmcm9tICdvbC9wcm9qJztcclxuaW1wb3J0ICogYXMgb2xwcm9qNCBmcm9tICdvbC9wcm9qL3Byb2o0JztcclxuXHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7IFByb2plY3Rpb24gfSBmcm9tICcuL3Byb2plY3Rpb24uaW50ZXJmYWNlcyc7XHJcblxyXG4vKipcclxuICogV2hlbiBpbmplY3RlZCwgdGhpcyBzZXJ2aWNlIGF1dG9tYXRpY2FsbHkgcmVnaXN0ZXJzIGFuZFxyXG4gKiBwcm9qZWN0aW9uIGRlZmluZWQgaW4gdGhlIGFwcGxpY2F0aW9uIGNvbmZpZy4gQSBjdXN0b20gcHJvamVjdGlvblxyXG4gKiBuZWVkcyB0byBiZSByZWdpc3RlcmVkIHRvIGJlIHVzYWJsZSBieSBPTC5cclxuICovXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFByb2plY3Rpb25TZXJ2aWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UpIHtcclxuICAgIGNvbnN0IHByb2plY3Rpb25zID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdwcm9qZWN0aW9ucycpIHx8IFtdO1xyXG4gICAgcHJvamVjdGlvbnMuZm9yRWFjaCgocHJvamVjdGlvbjogUHJvamVjdGlvbikgPT4ge1xyXG4gICAgICB0aGlzLnJlZ2lzdGVyUHJvamVjdGlvbihwcm9qZWN0aW9uKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5lIGEgcHJvajQgcHJvamVjdGlvbiBhbmQgcmVnaXN0ZXIgaXQgaW4gT0xcclxuICAgKiBAcGFyYW0gcHJvamVjdGlvbiBQcm9qZWN0aW9uXHJcbiAgICovXHJcbiAgcmVnaXN0ZXJQcm9qZWN0aW9uKHByb2plY3Rpb246IFByb2plY3Rpb24pIHtcclxuICAgIHByb2o0LmRlZnMocHJvamVjdGlvbi5jb2RlLCBwcm9qZWN0aW9uLmRlZik7XHJcbiAgICBvbHByb2o0LnJlZ2lzdGVyKHByb2o0KTtcclxuICAgIG9scHJvai5nZXQocHJvamVjdGlvbi5jb2RlKS5zZXRFeHRlbnQocHJvamVjdGlvbi5leHRlbnQpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19