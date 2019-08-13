/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FeatureMotion, featureToOl, moveToOlFeatures } from '../../feature';
import { createOverlayLayer } from './overlay.utils';
/**
 * This class is simply a shortcut for adding features to a map.
 * It does nothing more than a standard layer but it's shipped with
 * a defautl style based on the geometry type of the features it contains.
 * \@todo Enhance that by using a FeatureStore and strategies.
 */
var /**
 * This class is simply a shortcut for adding features to a map.
 * It does nothing more than a standard layer but it's shipped with
 * a defautl style based on the geometry type of the features it contains.
 * \@todo Enhance that by using a FeatureStore and strategies.
 */
Overlay = /** @class */ (function () {
    function Overlay(map) {
        this.layer = createOverlayLayer();
        this.setMap(map);
    }
    Object.defineProperty(Overlay.prototype, "dataSource", {
        /**
         * Overlay layer's data source
         */
        get: /**
         * Overlay layer's data source
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this.layer.dataSource));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Bind this to a map and add the overlay layer to that map
     * @param map Map
     */
    /**
     * Bind this to a map and add the overlay layer to that map
     * @param {?} map Map
     * @return {?}
     */
    Overlay.prototype.setMap = /**
     * Bind this to a map and add the overlay layer to that map
     * @param {?} map Map
     * @return {?}
     */
    function (map) {
        if (map === undefined) {
            if (this.map !== undefined) {
                this.map.ol.removeLayer(this.layer.ol);
            }
        }
        else {
            map.ol.addLayer(this.layer.ol);
        }
        this.map = map;
    };
    /**
     * Set the overlay features and, optionally, move to them
     * @param features Features
     * @param motion Optional: Apply this motion to the map view
     */
    /**
     * Set the overlay features and, optionally, move to them
     * @param {?} features Features
     * @param {?=} motion Optional: Apply this motion to the map view
     * @return {?}
     */
    Overlay.prototype.setFeatures = /**
     * Set the overlay features and, optionally, move to them
     * @param {?} features Features
     * @param {?=} motion Optional: Apply this motion to the map view
     * @return {?}
     */
    function (features, motion) {
        if (motion === void 0) { motion = FeatureMotion.Default; }
        this.clear();
        this.addFeatures(features, motion);
    };
    /**
     * Add a feature to the  overlay and, optionally, move to it
     * @param feature Feature
     * @param motion Optional: Apply this motion to the map view
     */
    /**
     * Add a feature to the  overlay and, optionally, move to it
     * @param {?} feature Feature
     * @param {?=} motion Optional: Apply this motion to the map view
     * @return {?}
     */
    Overlay.prototype.addFeature = /**
     * Add a feature to the  overlay and, optionally, move to it
     * @param {?} feature Feature
     * @param {?=} motion Optional: Apply this motion to the map view
     * @return {?}
     */
    function (feature, motion) {
        if (motion === void 0) { motion = FeatureMotion.Default; }
        this.addFeatures([feature], motion);
    };
    /**
     * Add features to the  overlay and, optionally, move to them
     * @param features Features
     * @param motion Optional: Apply this motion to the map view
     */
    /**
     * Add features to the  overlay and, optionally, move to them
     * @param {?} features Features
     * @param {?=} motion Optional: Apply this motion to the map view
     * @return {?}
     */
    Overlay.prototype.addFeatures = /**
     * Add features to the  overlay and, optionally, move to them
     * @param {?} features Features
     * @param {?=} motion Optional: Apply this motion to the map view
     * @return {?}
     */
    function (features, motion) {
        var _this = this;
        if (motion === void 0) { motion = FeatureMotion.Default; }
        /** @type {?} */
        var olFeatures = [];
        features.forEach((/**
         * @param {?} feature
         * @return {?}
         */
        function (feature) {
            /** @type {?} */
            var olFeature = featureToOl(feature, _this.map.projection);
            /** @type {?} */
            var olGeometry = olFeature.getGeometry();
            if (olGeometry === null) {
                return;
            }
            olFeatures.push(olFeature);
        }));
        this.addOlFeatures(olFeatures, motion);
    };
    /**
     * Add a OpenLayers feature to the  overlay and, optionally, move to it
     * @param olFeature OpenLayers Feature
     * @param motion Optional: Apply this motion to the map view
     */
    /**
     * Add a OpenLayers feature to the  overlay and, optionally, move to it
     * @param {?} olFeature OpenLayers Feature
     * @param {?=} motion Optional: Apply this motion to the map view
     * @return {?}
     */
    Overlay.prototype.addOlFeature = /**
     * Add a OpenLayers feature to the  overlay and, optionally, move to it
     * @param {?} olFeature OpenLayers Feature
     * @param {?=} motion Optional: Apply this motion to the map view
     * @return {?}
     */
    function (olFeature, motion) {
        if (motion === void 0) { motion = FeatureMotion.Default; }
        this.addOlFeature([olFeature], motion);
    };
    /**
     * Add OpenLayers features to the overlay and, optionally, move to them
     * @param olFeatures OpenLayers Features
     * @param motion Optional: Apply this motion to the map view
     */
    /**
     * Add OpenLayers features to the overlay and, optionally, move to them
     * @param {?} olFeatures OpenLayers Features
     * @param {?=} motion Optional: Apply this motion to the map view
     * @return {?}
     */
    Overlay.prototype.addOlFeatures = /**
     * Add OpenLayers features to the overlay and, optionally, move to them
     * @param {?} olFeatures OpenLayers Features
     * @param {?=} motion Optional: Apply this motion to the map view
     * @return {?}
     */
    function (olFeatures, motion) {
        if (motion === void 0) { motion = FeatureMotion.Default; }
        this.dataSource.ol.addFeatures(olFeatures);
        moveToOlFeatures(this.map, olFeatures, motion);
    };
    /**
     * Clear the overlay
     */
    /**
     * Clear the overlay
     * @return {?}
     */
    Overlay.prototype.clear = /**
     * Clear the overlay
     * @return {?}
     */
    function () {
        this.dataSource.ol.clear();
    };
    return Overlay;
}());
/**
 * This class is simply a shortcut for adding features to a map.
 * It does nothing more than a standard layer but it's shipped with
 * a defautl style based on the geometry type of the features it contains.
 * \@todo Enhance that by using a FeatureStore and strategies.
 */
export { Overlay };
if (false) {
    /**
     * The map to add the layer to
     * @type {?}
     * @private
     */
    Overlay.prototype.map;
    /**
     * Overlay layer
     * @type {?}
     * @private
     */
    Overlay.prototype.layer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9vdmVybGF5L3NoYXJlZC9vdmVybGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBRUwsYUFBYSxFQUNiLFdBQVcsRUFDWCxnQkFBZ0IsRUFDakIsTUFBTSxlQUFlLENBQUM7QUFLdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7QUFRckQ7Ozs7Ozs7SUFrQkUsaUJBQVksR0FBWTtRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLGtCQUFrQixFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBUEQsc0JBQUksK0JBQVU7UUFIZDs7V0FFRzs7Ozs7UUFDSDtZQUNFLE9BQU8sbUJBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQXFCLENBQUM7UUFDcEQsQ0FBQzs7O09BQUE7SUFPRDs7O09BR0c7Ozs7OztJQUNILHdCQUFNOzs7OztJQUFOLFVBQU8sR0FBVztRQUNoQixJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7WUFDckIsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLFNBQVMsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDeEM7U0FDRjthQUFNO1lBQ0wsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNoQztRQUNELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gsNkJBQVc7Ozs7OztJQUFYLFVBQ0UsUUFBbUIsRUFDbkIsTUFBNkM7UUFBN0MsdUJBQUEsRUFBQSxTQUF3QixhQUFhLENBQUMsT0FBTztRQUU3QyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNILDRCQUFVOzs7Ozs7SUFBVixVQUFXLE9BQWdCLEVBQUUsTUFBNkM7UUFBN0MsdUJBQUEsRUFBQSxTQUF3QixhQUFhLENBQUMsT0FBTztRQUN4RSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCw2QkFBVzs7Ozs7O0lBQVgsVUFDRSxRQUFtQixFQUNuQixNQUE2QztRQUYvQyxpQkFlQztRQWJDLHVCQUFBLEVBQUEsU0FBd0IsYUFBYSxDQUFDLE9BQU87O1lBRXZDLFVBQVUsR0FBRyxFQUFFO1FBQ3JCLFFBQVEsQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQyxPQUFnQjs7Z0JBQzFCLFNBQVMsR0FBRyxXQUFXLENBQUMsT0FBTyxFQUFFLEtBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDOztnQkFDckQsVUFBVSxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUU7WUFDMUMsSUFBSSxVQUFVLEtBQUssSUFBSSxFQUFFO2dCQUN2QixPQUFPO2FBQ1I7WUFDRCxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdCLENBQUMsRUFBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCw4QkFBWTs7Ozs7O0lBQVosVUFDRSxTQUFvQixFQUNwQixNQUE2QztRQUE3Qyx1QkFBQSxFQUFBLFNBQXdCLGFBQWEsQ0FBQyxPQUFPO1FBRTdDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNILCtCQUFhOzs7Ozs7SUFBYixVQUNFLFVBQXVCLEVBQ3ZCLE1BQTZDO1FBQTdDLHVCQUFBLEVBQUEsU0FBd0IsYUFBYSxDQUFDLE9BQU87UUFFN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCx1QkFBSzs7OztJQUFMO1FBQ0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUNILGNBQUM7QUFBRCxDQUFDLEFBakhELElBaUhDOzs7Ozs7Ozs7Ozs7OztJQTdHQyxzQkFBb0I7Ozs7OztJQUtwQix3QkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgT2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5cclxuaW1wb3J0IHtcclxuICBGZWF0dXJlLFxyXG4gIEZlYXR1cmVNb3Rpb24sXHJcbiAgZmVhdHVyZVRvT2wsXHJcbiAgbW92ZVRvT2xGZWF0dXJlc1xyXG59IGZyb20gJy4uLy4uL2ZlYXR1cmUnO1xyXG5pbXBvcnQgeyBGZWF0dXJlRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBWZWN0b3JMYXllciB9IGZyb20gJy4uLy4uL2xheWVyJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuXHJcbmltcG9ydCB7IGNyZWF0ZU92ZXJsYXlMYXllciB9IGZyb20gJy4vb3ZlcmxheS51dGlscyc7XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBpcyBzaW1wbHkgYSBzaG9ydGN1dCBmb3IgYWRkaW5nIGZlYXR1cmVzIHRvIGEgbWFwLlxyXG4gKiBJdCBkb2VzIG5vdGhpbmcgbW9yZSB0aGFuIGEgc3RhbmRhcmQgbGF5ZXIgYnV0IGl0J3Mgc2hpcHBlZCB3aXRoXHJcbiAqIGEgZGVmYXV0bCBzdHlsZSBiYXNlZCBvbiB0aGUgZ2VvbWV0cnkgdHlwZSBvZiB0aGUgZmVhdHVyZXMgaXQgY29udGFpbnMuXHJcbiAqIEB0b2RvIEVuaGFuY2UgdGhhdCBieSB1c2luZyBhIEZlYXR1cmVTdG9yZSBhbmQgc3RyYXRlZ2llcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBPdmVybGF5IHtcclxuICAvKipcclxuICAgKiBUaGUgbWFwIHRvIGFkZCB0aGUgbGF5ZXIgdG9cclxuICAgKi9cclxuICBwcml2YXRlIG1hcDogSWdvTWFwO1xyXG5cclxuICAvKipcclxuICAgKiBPdmVybGF5IGxheWVyXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBsYXllcjogVmVjdG9yTGF5ZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIE92ZXJsYXkgbGF5ZXIncyBkYXRhIHNvdXJjZVxyXG4gICAqL1xyXG4gIGdldCBkYXRhU291cmNlKCk6IEZlYXR1cmVEYXRhU291cmNlIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVyLmRhdGFTb3VyY2UgYXMgRmVhdHVyZURhdGFTb3VyY2U7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihtYXA/OiBJZ29NYXApIHtcclxuICAgIHRoaXMubGF5ZXIgPSBjcmVhdGVPdmVybGF5TGF5ZXIoKTtcclxuICAgIHRoaXMuc2V0TWFwKG1hcCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBCaW5kIHRoaXMgdG8gYSBtYXAgYW5kIGFkZCB0aGUgb3ZlcmxheSBsYXllciB0byB0aGF0IG1hcFxyXG4gICAqIEBwYXJhbSBtYXAgTWFwXHJcbiAgICovXHJcbiAgc2V0TWFwKG1hcDogSWdvTWFwKSB7XHJcbiAgICBpZiAobWFwID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgaWYgKHRoaXMubWFwICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLm1hcC5vbC5yZW1vdmVMYXllcih0aGlzLmxheWVyLm9sKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbWFwLm9sLmFkZExheWVyKHRoaXMubGF5ZXIub2wpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5tYXAgPSBtYXA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIG92ZXJsYXkgZmVhdHVyZXMgYW5kLCBvcHRpb25hbGx5LCBtb3ZlIHRvIHRoZW1cclxuICAgKiBAcGFyYW0gZmVhdHVyZXMgRmVhdHVyZXNcclxuICAgKiBAcGFyYW0gbW90aW9uIE9wdGlvbmFsOiBBcHBseSB0aGlzIG1vdGlvbiB0byB0aGUgbWFwIHZpZXdcclxuICAgKi9cclxuICBzZXRGZWF0dXJlcyhcclxuICAgIGZlYXR1cmVzOiBGZWF0dXJlW10sXHJcbiAgICBtb3Rpb246IEZlYXR1cmVNb3Rpb24gPSBGZWF0dXJlTW90aW9uLkRlZmF1bHRcclxuICApIHtcclxuICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIHRoaXMuYWRkRmVhdHVyZXMoZmVhdHVyZXMsIG1vdGlvbik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYSBmZWF0dXJlIHRvIHRoZSAgb3ZlcmxheSBhbmQsIG9wdGlvbmFsbHksIG1vdmUgdG8gaXRcclxuICAgKiBAcGFyYW0gZmVhdHVyZSBGZWF0dXJlXHJcbiAgICogQHBhcmFtIG1vdGlvbiBPcHRpb25hbDogQXBwbHkgdGhpcyBtb3Rpb24gdG8gdGhlIG1hcCB2aWV3XHJcbiAgICovXHJcbiAgYWRkRmVhdHVyZShmZWF0dXJlOiBGZWF0dXJlLCBtb3Rpb246IEZlYXR1cmVNb3Rpb24gPSBGZWF0dXJlTW90aW9uLkRlZmF1bHQpIHtcclxuICAgIHRoaXMuYWRkRmVhdHVyZXMoW2ZlYXR1cmVdLCBtb3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGZlYXR1cmVzIHRvIHRoZSAgb3ZlcmxheSBhbmQsIG9wdGlvbmFsbHksIG1vdmUgdG8gdGhlbVxyXG4gICAqIEBwYXJhbSBmZWF0dXJlcyBGZWF0dXJlc1xyXG4gICAqIEBwYXJhbSBtb3Rpb24gT3B0aW9uYWw6IEFwcGx5IHRoaXMgbW90aW9uIHRvIHRoZSBtYXAgdmlld1xyXG4gICAqL1xyXG4gIGFkZEZlYXR1cmVzKFxyXG4gICAgZmVhdHVyZXM6IEZlYXR1cmVbXSxcclxuICAgIG1vdGlvbjogRmVhdHVyZU1vdGlvbiA9IEZlYXR1cmVNb3Rpb24uRGVmYXVsdFxyXG4gICkge1xyXG4gICAgY29uc3Qgb2xGZWF0dXJlcyA9IFtdO1xyXG4gICAgZmVhdHVyZXMuZm9yRWFjaCgoZmVhdHVyZTogRmVhdHVyZSkgPT4ge1xyXG4gICAgICBjb25zdCBvbEZlYXR1cmUgPSBmZWF0dXJlVG9PbChmZWF0dXJlLCB0aGlzLm1hcC5wcm9qZWN0aW9uKTtcclxuICAgICAgY29uc3Qgb2xHZW9tZXRyeSA9IG9sRmVhdHVyZS5nZXRHZW9tZXRyeSgpO1xyXG4gICAgICBpZiAob2xHZW9tZXRyeSA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBvbEZlYXR1cmVzLnB1c2gob2xGZWF0dXJlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuYWRkT2xGZWF0dXJlcyhvbEZlYXR1cmVzLCBtb3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGEgT3BlbkxheWVycyBmZWF0dXJlIHRvIHRoZSAgb3ZlcmxheSBhbmQsIG9wdGlvbmFsbHksIG1vdmUgdG8gaXRcclxuICAgKiBAcGFyYW0gb2xGZWF0dXJlIE9wZW5MYXllcnMgRmVhdHVyZVxyXG4gICAqIEBwYXJhbSBtb3Rpb24gT3B0aW9uYWw6IEFwcGx5IHRoaXMgbW90aW9uIHRvIHRoZSBtYXAgdmlld1xyXG4gICAqL1xyXG4gIGFkZE9sRmVhdHVyZShcclxuICAgIG9sRmVhdHVyZTogT2xGZWF0dXJlLFxyXG4gICAgbW90aW9uOiBGZWF0dXJlTW90aW9uID0gRmVhdHVyZU1vdGlvbi5EZWZhdWx0XHJcbiAgKSB7XHJcbiAgICB0aGlzLmFkZE9sRmVhdHVyZShbb2xGZWF0dXJlXSwgbW90aW9uKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBPcGVuTGF5ZXJzIGZlYXR1cmVzIHRvIHRoZSBvdmVybGF5IGFuZCwgb3B0aW9uYWxseSwgbW92ZSB0byB0aGVtXHJcbiAgICogQHBhcmFtIG9sRmVhdHVyZXMgT3BlbkxheWVycyBGZWF0dXJlc1xyXG4gICAqIEBwYXJhbSBtb3Rpb24gT3B0aW9uYWw6IEFwcGx5IHRoaXMgbW90aW9uIHRvIHRoZSBtYXAgdmlld1xyXG4gICAqL1xyXG4gIGFkZE9sRmVhdHVyZXMoXHJcbiAgICBvbEZlYXR1cmVzOiBPbEZlYXR1cmVbXSxcclxuICAgIG1vdGlvbjogRmVhdHVyZU1vdGlvbiA9IEZlYXR1cmVNb3Rpb24uRGVmYXVsdFxyXG4gICkge1xyXG4gICAgdGhpcy5kYXRhU291cmNlLm9sLmFkZEZlYXR1cmVzKG9sRmVhdHVyZXMpO1xyXG4gICAgbW92ZVRvT2xGZWF0dXJlcyh0aGlzLm1hcCwgb2xGZWF0dXJlcywgbW90aW9uKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBvdmVybGF5XHJcbiAgICovXHJcbiAgY2xlYXIoKSB7XHJcbiAgICB0aGlzLmRhdGFTb3VyY2Uub2wuY2xlYXIoKTtcclxuICB9XHJcbn1cclxuIl19