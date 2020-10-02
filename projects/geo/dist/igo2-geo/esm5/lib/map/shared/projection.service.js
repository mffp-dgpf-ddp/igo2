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
            projection.alias = projection.alias ? projection.alias : projection.code;
            _this.registerProjection(projection);
        }));
        // register all utm zones
        for (var utmZone = 1; utmZone < 61; utmZone++) {
            /** @type {?} */
            var code = utmZone < 10 ? "EPSG:3260" + utmZone : "EPSG:326" + utmZone;
            /** @type {?} */
            var def = "+proj=utm +zone=" + utmZone + " +datum=WGS84 +units=m +no_defs";
            /** @type {?} */
            var proj = { code: code, def: def, extent: undefined };
            this.registerProjection(proj);
        }
        // register all mtm zones
        for (var mtmZone = 1; mtmZone < 11; mtmZone++) {
            /** @type {?} */
            var code = mtmZone < 10 ? "EPSG:3218" + mtmZone : "EPSG:321" + (80 + mtmZone);
            /** @type {?} */
            var lon0 = void 0;
            if (Number(mtmZone) <= 2) {
                lon0 = -50 - Number(mtmZone) * 3;
            }
            else if (Number(mtmZone) >= 12) {
                lon0 = -81 - (Number(mtmZone) - 12) * 3;
            }
            else {
                lon0 = -49.5 - Number(mtmZone) * 3;
            }
            /** @type {?} */
            var def = "+proj=tmerc +lat_0=0 +lon_0=" + lon0 + " +k=0.9999 +x_0=304800 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs\"";
            /** @type {?} */
            var proj = { code: code, def: def, extent: undefined };
            this.registerProjection(proj);
        }
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
        if (projection.extent) {
            olproj.get(projection.code).setExtent(projection.extent);
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL21hcC9zaGFyZWQvcHJvamVjdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMxQixPQUFPLEtBQUssTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUNsQyxPQUFPLEtBQUssT0FBTyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDOzs7Ozs7OztBQVMzQztJQUtFLDJCQUFvQixNQUFxQjtRQUF6QyxpQkE4QkM7UUE5Qm1CLFdBQU0sR0FBTixNQUFNLENBQWU7O1lBQ2pDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFO1FBQzlELFdBQVcsQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQyxVQUFzQjtZQUN6QyxVQUFVLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDekUsS0FBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsRUFBQyxDQUFDO1FBRUgseUJBQXlCO1FBQ3pCLEtBQUssSUFBSSxPQUFPLEdBQUcsQ0FBQyxFQUFFLE9BQU8sR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUU7O2dCQUN2QyxJQUFJLEdBQUcsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBWSxPQUFTLENBQUMsQ0FBQyxDQUFDLGFBQVcsT0FBUzs7Z0JBQ2xFLEdBQUcsR0FBRyxxQkFBbUIsT0FBTyxvQ0FBaUM7O2dCQUNqRSxJQUFJLEdBQWUsRUFBRSxJQUFJLE1BQUEsRUFBRSxHQUFHLEtBQUEsRUFBRSxNQUFNLEVBQUcsU0FBUyxFQUFDO1lBQ3pELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMvQjtRQUVELHlCQUF5QjtRQUN6QixLQUFLLElBQUksT0FBTyxHQUFHLENBQUMsRUFBRSxPQUFPLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFOztnQkFDdkMsSUFBSSxHQUFHLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQVksT0FBUyxDQUFDLENBQUMsQ0FBQyxjQUFXLEVBQUUsR0FBRyxPQUFPLENBQUU7O2dCQUN6RSxJQUFJLFNBQUE7WUFDUixJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3hCLElBQUksR0FBRyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2xDO2lCQUFNLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDaEMsSUFBSSxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN6QztpQkFBTTtnQkFDTCxJQUFJLEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNwQzs7Z0JBQ0ssR0FBRyxHQUFHLGlDQUErQixJQUFJLDBGQUFzRjs7Z0JBQy9ILElBQUksR0FBZSxFQUFFLElBQUksTUFBQSxFQUFFLEdBQUcsS0FBQSxFQUFFLE1BQU0sRUFBRyxTQUFTLEVBQUM7WUFDekQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQy9CO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsOENBQWtCOzs7OztJQUFsQixVQUFtQixVQUFzQjtRQUN2QyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEIsSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFO1lBQ3JCLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDMUQ7SUFDSCxDQUFDOztnQkEvQ0YsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFYUSxhQUFhOzs7NEJBTnRCO0NBZ0VDLEFBakRELElBaURDO1NBOUNZLGlCQUFpQjs7Ozs7O0lBRWhCLG1DQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCBwcm9qNCBmcm9tICdwcm9qNCc7XHJcbmltcG9ydCAqIGFzIG9scHJvaiBmcm9tICdvbC9wcm9qJztcclxuaW1wb3J0ICogYXMgb2xwcm9qNCBmcm9tICdvbC9wcm9qL3Byb2o0JztcclxuXHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7IFByb2plY3Rpb24gfSBmcm9tICcuL3Byb2plY3Rpb24uaW50ZXJmYWNlcyc7XHJcblxyXG4vKipcclxuICogV2hlbiBpbmplY3RlZCwgdGhpcyBzZXJ2aWNlIGF1dG9tYXRpY2FsbHkgcmVnaXN0ZXJzIGFuZFxyXG4gKiBwcm9qZWN0aW9uIGRlZmluZWQgaW4gdGhlIGFwcGxpY2F0aW9uIGNvbmZpZy4gQSBjdXN0b20gcHJvamVjdGlvblxyXG4gKiBuZWVkcyB0byBiZSByZWdpc3RlcmVkIHRvIGJlIHVzYWJsZSBieSBPTC5cclxuICovXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFByb2plY3Rpb25TZXJ2aWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UpIHtcclxuICAgIGNvbnN0IHByb2plY3Rpb25zID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdwcm9qZWN0aW9ucycpIHx8IFtdO1xyXG4gICAgcHJvamVjdGlvbnMuZm9yRWFjaCgocHJvamVjdGlvbjogUHJvamVjdGlvbikgPT4ge1xyXG4gICAgICBwcm9qZWN0aW9uLmFsaWFzID0gcHJvamVjdGlvbi5hbGlhcyA/IHByb2plY3Rpb24uYWxpYXMgOiBwcm9qZWN0aW9uLmNvZGU7XHJcbiAgICAgIHRoaXMucmVnaXN0ZXJQcm9qZWN0aW9uKHByb2plY3Rpb24pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gcmVnaXN0ZXIgYWxsIHV0bSB6b25lc1xyXG4gICAgZm9yIChsZXQgdXRtWm9uZSA9IDE7IHV0bVpvbmUgPCA2MTsgdXRtWm9uZSsrKSB7XHJcbiAgICAgIGNvbnN0IGNvZGUgPSB1dG1ab25lIDwgMTAgPyBgRVBTRzozMjYwJHt1dG1ab25lfWAgOiBgRVBTRzozMjYke3V0bVpvbmV9YDtcclxuICAgICAgY29uc3QgZGVmID0gYCtwcm9qPXV0bSArem9uZT0ke3V0bVpvbmV9ICtkYXR1bT1XR1M4NCArdW5pdHM9bSArbm9fZGVmc2A7XHJcbiAgICAgIGNvbnN0IHByb2o6IFByb2plY3Rpb24gPSB7IGNvZGUsIGRlZiwgZXh0ZW50IDogdW5kZWZpbmVkfTtcclxuICAgICAgdGhpcy5yZWdpc3RlclByb2plY3Rpb24ocHJvaik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmVnaXN0ZXIgYWxsIG10bSB6b25lc1xyXG4gICAgZm9yIChsZXQgbXRtWm9uZSA9IDE7IG10bVpvbmUgPCAxMTsgbXRtWm9uZSsrKSB7XHJcbiAgICAgIGNvbnN0IGNvZGUgPSBtdG1ab25lIDwgMTAgPyBgRVBTRzozMjE4JHttdG1ab25lfWAgOiBgRVBTRzozMjEkezgwICsgbXRtWm9uZX1gO1xyXG4gICAgICBsZXQgbG9uMDtcclxuICAgICAgaWYgKE51bWJlcihtdG1ab25lKSA8PSAyKSB7XHJcbiAgICAgICAgbG9uMCA9IC01MCAtIE51bWJlcihtdG1ab25lKSAqIDM7XHJcbiAgICAgIH0gZWxzZSBpZiAoTnVtYmVyKG10bVpvbmUpID49IDEyKSB7XHJcbiAgICAgICAgbG9uMCA9IC04MSAtIChOdW1iZXIobXRtWm9uZSkgLSAxMikgKiAzO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxvbjAgPSAtNDkuNSAtIE51bWJlcihtdG1ab25lKSAqIDM7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgZGVmID0gYCtwcm9qPXRtZXJjICtsYXRfMD0wICtsb25fMD0ke2xvbjB9ICtrPTAuOTk5OSAreF8wPTMwNDgwMCAreV8wPTAgK2VsbHBzPUdSUzgwICt0b3dnczg0PTAsMCwwLDAsMCwwLDAgK3VuaXRzPW0gK25vX2RlZnNcImA7XHJcbiAgICAgIGNvbnN0IHByb2o6IFByb2plY3Rpb24gPSB7IGNvZGUsIGRlZiwgZXh0ZW50IDogdW5kZWZpbmVkfTtcclxuICAgICAgdGhpcy5yZWdpc3RlclByb2plY3Rpb24ocHJvaik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmUgYSBwcm9qNCBwcm9qZWN0aW9uIGFuZCByZWdpc3RlciBpdCBpbiBPTFxyXG4gICAqIEBwYXJhbSBwcm9qZWN0aW9uIFByb2plY3Rpb25cclxuICAgKi9cclxuICByZWdpc3RlclByb2plY3Rpb24ocHJvamVjdGlvbjogUHJvamVjdGlvbikge1xyXG4gICAgcHJvajQuZGVmcyhwcm9qZWN0aW9uLmNvZGUsIHByb2plY3Rpb24uZGVmKTtcclxuICAgIG9scHJvajQucmVnaXN0ZXIocHJvajQpO1xyXG4gICAgaWYgKHByb2plY3Rpb24uZXh0ZW50KSB7XHJcbiAgICAgIG9scHJvai5nZXQocHJvamVjdGlvbi5jb2RlKS5zZXRFeHRlbnQocHJvamVjdGlvbi5leHRlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIl19