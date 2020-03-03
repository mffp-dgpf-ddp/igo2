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
            projection.alias = projection.alias ? projection.alias : projection.code;
            this.registerProjection(projection);
        }));
        // register all utm zones
        for (let utmZone = 1; utmZone < 61; utmZone++) {
            /** @type {?} */
            const code = utmZone < 10 ? `EPSG:3260${utmZone}` : `EPSG:326${utmZone}`;
            /** @type {?} */
            const def = `+proj=utm +zone=${utmZone} +datum=WGS84 +units=m +no_defs`;
            /** @type {?} */
            const proj = { code, def, extent: undefined };
            this.registerProjection(proj);
        }
        // register all mtm zones
        for (let mtmZone = 1; mtmZone < 11; mtmZone++) {
            /** @type {?} */
            const code = mtmZone < 10 ? `EPSG:3218${mtmZone}` : `EPSG:321${80 + mtmZone}`;
            /** @type {?} */
            let lon0;
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
            const def = `+proj=tmerc +lat_0=0 +lon_0=${lon0} +k=0.9999 +x_0=304800 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"`;
            /** @type {?} */
            const proj = { code, def, extent: undefined };
            this.registerProjection(proj);
        }
    }
    /**
     * Define a proj4 projection and register it in OL
     * @param {?} projection Projection
     * @return {?}
     */
    registerProjection(projection) {
        proj4.defs(projection.code, projection.def);
        olproj4.register(proj4);
        if (projection.extent) {
            olproj.get(projection.code).setExtent(projection.extent);
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL21hcC9zaGFyZWQvcHJvamVjdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMxQixPQUFPLEtBQUssTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUNsQyxPQUFPLEtBQUssT0FBTyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDOzs7Ozs7OztBQVkzQyxNQUFNLE9BQU8saUJBQWlCOzs7O0lBRTVCLFlBQW9CLE1BQXFCO1FBQXJCLFdBQU0sR0FBTixNQUFNLENBQWU7O2NBQ2pDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFO1FBQzlELFdBQVcsQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxVQUFzQixFQUFFLEVBQUU7WUFDN0MsVUFBVSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQ3pFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0QyxDQUFDLEVBQUMsQ0FBQztRQUVILHlCQUF5QjtRQUN6QixLQUFLLElBQUksT0FBTyxHQUFHLENBQUMsRUFBRSxPQUFPLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFOztrQkFDdkMsSUFBSSxHQUFHLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsT0FBTyxFQUFFOztrQkFDbEUsR0FBRyxHQUFHLG1CQUFtQixPQUFPLGlDQUFpQzs7a0JBQ2pFLElBQUksR0FBZSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFHLFNBQVMsRUFBQztZQUN6RCxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDL0I7UUFFRCx5QkFBeUI7UUFDekIsS0FBSyxJQUFJLE9BQU8sR0FBRyxDQUFDLEVBQUUsT0FBTyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRTs7a0JBQ3ZDLElBQUksR0FBRyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxPQUFPLEVBQUU7O2dCQUN6RSxJQUFJO1lBQ1IsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN4QixJQUFJLEdBQUcsQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNsQztpQkFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ2hDLElBQUksR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDekM7aUJBQU07Z0JBQ0wsSUFBSSxHQUFHLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDcEM7O2tCQUNLLEdBQUcsR0FBRywrQkFBK0IsSUFBSSxzRkFBc0Y7O2tCQUMvSCxJQUFJLEdBQWUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRyxTQUFTLEVBQUM7WUFDekQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQy9CO0lBQ0gsQ0FBQzs7Ozs7O0lBTUQsa0JBQWtCLENBQUMsVUFBc0I7UUFDdkMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLElBQUksVUFBVSxDQUFDLE1BQU0sRUFBRTtZQUNyQixNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzFEO0lBQ0gsQ0FBQzs7O1lBL0NGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQVhRLGFBQWE7Ozs7Ozs7O0lBY1IsbUNBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHByb2o0IGZyb20gJ3Byb2o0JztcclxuaW1wb3J0ICogYXMgb2xwcm9qIGZyb20gJ29sL3Byb2onO1xyXG5pbXBvcnQgKiBhcyBvbHByb2o0IGZyb20gJ29sL3Byb2ovcHJvajQnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgUHJvamVjdGlvbiB9IGZyb20gJy4vcHJvamVjdGlvbi5pbnRlcmZhY2VzJztcclxuXHJcbi8qKlxyXG4gKiBXaGVuIGluamVjdGVkLCB0aGlzIHNlcnZpY2UgYXV0b21hdGljYWxseSByZWdpc3RlcnMgYW5kXHJcbiAqIHByb2plY3Rpb24gZGVmaW5lZCBpbiB0aGUgYXBwbGljYXRpb24gY29uZmlnLiBBIGN1c3RvbSBwcm9qZWN0aW9uXHJcbiAqIG5lZWRzIHRvIGJlIHJlZ2lzdGVyZWQgdG8gYmUgdXNhYmxlIGJ5IE9MLlxyXG4gKi9cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUHJvamVjdGlvblNlcnZpY2Uge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkge1xyXG4gICAgY29uc3QgcHJvamVjdGlvbnMgPSB0aGlzLmNvbmZpZy5nZXRDb25maWcoJ3Byb2plY3Rpb25zJykgfHwgW107XHJcbiAgICBwcm9qZWN0aW9ucy5mb3JFYWNoKChwcm9qZWN0aW9uOiBQcm9qZWN0aW9uKSA9PiB7XHJcbiAgICAgIHByb2plY3Rpb24uYWxpYXMgPSBwcm9qZWN0aW9uLmFsaWFzID8gcHJvamVjdGlvbi5hbGlhcyA6IHByb2plY3Rpb24uY29kZTtcclxuICAgICAgdGhpcy5yZWdpc3RlclByb2plY3Rpb24ocHJvamVjdGlvbik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyByZWdpc3RlciBhbGwgdXRtIHpvbmVzXHJcbiAgICBmb3IgKGxldCB1dG1ab25lID0gMTsgdXRtWm9uZSA8IDYxOyB1dG1ab25lKyspIHtcclxuICAgICAgY29uc3QgY29kZSA9IHV0bVpvbmUgPCAxMCA/IGBFUFNHOjMyNjAke3V0bVpvbmV9YCA6IGBFUFNHOjMyNiR7dXRtWm9uZX1gO1xyXG4gICAgICBjb25zdCBkZWYgPSBgK3Byb2o9dXRtICt6b25lPSR7dXRtWm9uZX0gK2RhdHVtPVdHUzg0ICt1bml0cz1tICtub19kZWZzYDtcclxuICAgICAgY29uc3QgcHJvajogUHJvamVjdGlvbiA9IHsgY29kZSwgZGVmLCBleHRlbnQgOiB1bmRlZmluZWR9O1xyXG4gICAgICB0aGlzLnJlZ2lzdGVyUHJvamVjdGlvbihwcm9qKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyByZWdpc3RlciBhbGwgbXRtIHpvbmVzXHJcbiAgICBmb3IgKGxldCBtdG1ab25lID0gMTsgbXRtWm9uZSA8IDExOyBtdG1ab25lKyspIHtcclxuICAgICAgY29uc3QgY29kZSA9IG10bVpvbmUgPCAxMCA/IGBFUFNHOjMyMTgke210bVpvbmV9YCA6IGBFUFNHOjMyMSR7ODAgKyBtdG1ab25lfWA7XHJcbiAgICAgIGxldCBsb24wO1xyXG4gICAgICBpZiAoTnVtYmVyKG10bVpvbmUpIDw9IDIpIHtcclxuICAgICAgICBsb24wID0gLTUwIC0gTnVtYmVyKG10bVpvbmUpICogMztcclxuICAgICAgfSBlbHNlIGlmIChOdW1iZXIobXRtWm9uZSkgPj0gMTIpIHtcclxuICAgICAgICBsb24wID0gLTgxIC0gKE51bWJlcihtdG1ab25lKSAtIDEyKSAqIDM7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbG9uMCA9IC00OS41IC0gTnVtYmVyKG10bVpvbmUpICogMztcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBkZWYgPSBgK3Byb2o9dG1lcmMgK2xhdF8wPTAgK2xvbl8wPSR7bG9uMH0gK2s9MC45OTk5ICt4XzA9MzA0ODAwICt5XzA9MCArZWxscHM9R1JTODAgK3Rvd2dzODQ9MCwwLDAsMCwwLDAsMCArdW5pdHM9bSArbm9fZGVmc1wiYDtcclxuICAgICAgY29uc3QgcHJvajogUHJvamVjdGlvbiA9IHsgY29kZSwgZGVmLCBleHRlbnQgOiB1bmRlZmluZWR9O1xyXG4gICAgICB0aGlzLnJlZ2lzdGVyUHJvamVjdGlvbihwcm9qKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlZmluZSBhIHByb2o0IHByb2plY3Rpb24gYW5kIHJlZ2lzdGVyIGl0IGluIE9MXHJcbiAgICogQHBhcmFtIHByb2plY3Rpb24gUHJvamVjdGlvblxyXG4gICAqL1xyXG4gIHJlZ2lzdGVyUHJvamVjdGlvbihwcm9qZWN0aW9uOiBQcm9qZWN0aW9uKSB7XHJcbiAgICBwcm9qNC5kZWZzKHByb2plY3Rpb24uY29kZSwgcHJvamVjdGlvbi5kZWYpO1xyXG4gICAgb2xwcm9qNC5yZWdpc3Rlcihwcm9qNCk7XHJcbiAgICBpZiAocHJvamVjdGlvbi5leHRlbnQpIHtcclxuICAgICAgb2xwcm9qLmdldChwcm9qZWN0aW9uLmNvZGUpLnNldEV4dGVudChwcm9qZWN0aW9uLmV4dGVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=