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
export class MapState {
    /**
     * @param {?} mapService
     * @param {?} projectionService
     */
    constructor(mapService, projectionService // Don't remove this or it'll never be injected
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
    /**
     * Active map
     * @return {?}
     */
    get map() { return this._map; }
}
MapState.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
MapState.ctorParameters = () => [
    { type: MapService },
    { type: ProjectionService }
];
/** @nocollapse */ MapState.ngInjectableDef = i0.defineInjectable({ factory: function MapState_Factory() { return new MapState(i0.inject(i1.MapService), i0.inject(i1.ProjectionService)); }, token: MapState, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLnN0YXRlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvaW50ZWdyYXRpb24vIiwic291cmNlcyI6WyJsaWIvbWFwL21hcC5zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFdBQVcsQ0FBQzs7Ozs7O0FBUWxFLE1BQU0sT0FBTyxRQUFROzs7OztJQVFuQixZQUNVLFVBQXNCLEVBQ3RCLGlCQUFvQyxDQUFFLCtDQUErQzs7UUFEckYsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBRTVDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUM7WUFDckIsUUFBUSxFQUFFO2dCQUNSLFNBQVMsRUFBRSxJQUFJO2dCQUNmLFdBQVcsRUFBRTtvQkFDWCxTQUFTLEVBQUUsS0FBSztpQkFDakI7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7OztJQWpCRCxJQUFJLEdBQUcsS0FBYSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7WUFSeEMsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBUGdCLFVBQVU7WUFBRSxpQkFBaUI7Ozs7Ozs7O0lBYzVDLHdCQUFxQjs7Ozs7SUFHbkIsOEJBQThCOzs7OztJQUM5QixxQ0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBJZ29NYXAsIE1hcFNlcnZpY2UsIFByb2plY3Rpb25TZXJ2aWNlIH0gZnJvbSAnQGlnbzIvZ2VvJztcclxuXHJcbi8qKlxyXG4gKiBTZXJ2aWNlIHRoYXQgaG9sZHMgdGhlIHN0YXRlIG9mIHRoZSBtYXAgbW9kdWxlXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXBTdGF0ZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjdGl2ZSBtYXBcclxuICAgKi9cclxuICBnZXQgbWFwKCk6IElnb01hcCB7IHJldHVybiB0aGlzLl9tYXA7IH1cclxuICBwcml2YXRlIF9tYXA6IElnb01hcDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHByb2plY3Rpb25TZXJ2aWNlOiBQcm9qZWN0aW9uU2VydmljZSAgLy8gRG9uJ3QgcmVtb3ZlIHRoaXMgb3IgaXQnbGwgbmV2ZXIgYmUgaW5qZWN0ZWRcclxuICApIHtcclxuICAgIHRoaXMuX21hcCA9IG5ldyBJZ29NYXAoe1xyXG4gICAgICBjb250cm9sczoge1xyXG4gICAgICAgIHNjYWxlTGluZTogdHJ1ZSxcclxuICAgICAgICBhdHRyaWJ1dGlvbjoge1xyXG4gICAgICAgICAgY29sbGFwc2VkOiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5tYXBTZXJ2aWNlLnNldE1hcCh0aGlzLm1hcCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==