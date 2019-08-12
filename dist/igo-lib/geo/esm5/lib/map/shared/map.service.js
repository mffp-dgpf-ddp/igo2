/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * MapService
 *
 * This service tracks the IgoMap instance, if any.
 * Currently, only one map instance is supported
 * but support for multiple maps may be added in the future.
 * This will impact other services such as the OverlayService
 * because these maps won't be sharing overlayed features.
 */
var MapService = /** @class */ (function () {
    function MapService() {
    }
    /**
     * @return {?}
     */
    MapService.prototype.getMap = /**
     * @return {?}
     */
    function () {
        return this.map;
    };
    /**
     * @param {?} map
     * @return {?}
     */
    MapService.prototype.setMap = /**
     * @param {?} map
     * @return {?}
     */
    function (map) {
        this.map = map;
    };
    MapService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    MapService.ctorParameters = function () { return []; };
    /** @nocollapse */ MapService.ngInjectableDef = i0.defineInjectable({ factory: function MapService_Factory() { return new MapService(); }, token: MapService, providedIn: "root" });
    return MapService;
}());
export { MapService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    MapService.prototype.map;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbWFwL3NoYXJlZC9tYXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7QUFhM0M7SUFNRTtJQUFlLENBQUM7Ozs7SUFFaEIsMkJBQU07OztJQUFOO1FBQ0UsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7Ozs7O0lBRUQsMkJBQU07Ozs7SUFBTixVQUFPLEdBQVc7UUFDaEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDakIsQ0FBQzs7Z0JBZEYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7Ozs7cUJBZkQ7Q0E0QkMsQUFmRCxJQWVDO1NBWlksVUFBVTs7Ozs7O0lBQ3JCLHlCQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4vbWFwJztcclxuXHJcbi8qKlxyXG4gKiBNYXBTZXJ2aWNlXHJcbiAqXHJcbiAqIFRoaXMgc2VydmljZSB0cmFja3MgdGhlIElnb01hcCBpbnN0YW5jZSwgaWYgYW55LlxyXG4gKiBDdXJyZW50bHksIG9ubHkgb25lIG1hcCBpbnN0YW5jZSBpcyBzdXBwb3J0ZWRcclxuICogYnV0IHN1cHBvcnQgZm9yIG11bHRpcGxlIG1hcHMgbWF5IGJlIGFkZGVkIGluIHRoZSBmdXR1cmUuXHJcbiAqIFRoaXMgd2lsbCBpbXBhY3Qgb3RoZXIgc2VydmljZXMgc3VjaCBhcyB0aGUgT3ZlcmxheVNlcnZpY2VcclxuICogYmVjYXVzZSB0aGVzZSBtYXBzIHdvbid0IGJlIHNoYXJpbmcgb3ZlcmxheWVkIGZlYXR1cmVzLlxyXG4gKi9cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFwU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBtYXA6IElnb01hcDtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBnZXRNYXAoKTogSWdvTWFwIHtcclxuICAgIHJldHVybiB0aGlzLm1hcDtcclxuICB9XHJcblxyXG4gIHNldE1hcChtYXA6IElnb01hcCkge1xyXG4gICAgdGhpcy5tYXAgPSBtYXA7XHJcbiAgfVxyXG59XHJcbiJdfQ==