/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
     * @param sourceId Optional: Remove features of certain sourceId (ex: 'Map' for query features)
     */
    /**
     * Set the overlay features and, optionally, move to them
     * @param {?} features Features
     * @param {?=} motion Optional: Apply this motion to the map view
     * @param {?=} sourceId Optional: Remove features of certain sourceId (ex: 'Map' for query features)
     * @return {?}
     */
    Overlay.prototype.setFeatures = /**
     * Set the overlay features and, optionally, move to them
     * @param {?} features Features
     * @param {?=} motion Optional: Apply this motion to the map view
     * @param {?=} sourceId Optional: Remove features of certain sourceId (ex: 'Map' for query features)
     * @return {?}
     */
    function (features, motion, sourceId) {
        if (motion === void 0) { motion = FeatureMotion.Default; }
        var e_1, _a;
        if (sourceId) {
            try {
                for (var _b = tslib_1.__values(this.dataSource.ol.getFeatures()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var olFeature = _c.value;
                    if (olFeature.get('_sourceId') === sourceId) {
                        this.removeOlFeature(olFeature);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            this.clear();
        }
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
        this.addOlFeatures([olFeature], motion);
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
     * Remove a feature from the overlay
     * @param feature Feature
     */
    /**
     * Remove a feature from the overlay
     * @param {?} feature Feature
     * @return {?}
     */
    Overlay.prototype.removeFeature = /**
     * Remove a feature from the overlay
     * @param {?} feature Feature
     * @return {?}
     */
    function (feature) {
        this.removeFeatures([feature]);
    };
    /**
     * Remove features from the overlay
     * @param features Features
     */
    /**
     * Remove features from the overlay
     * @param {?} features Features
     * @return {?}
     */
    Overlay.prototype.removeFeatures = /**
     * Remove features from the overlay
     * @param {?} features Features
     * @return {?}
     */
    function (features) {
        var _this = this;
        features.forEach((/**
         * @param {?} feature
         * @return {?}
         */
        function (feature) {
            if (feature.meta) {
                if (_this.dataSource.ol.getFeatureById(feature.meta.id)) {
                    _this.removeOlFeature(_this.dataSource.ol.getFeatureById(feature.meta.id));
                }
            }
        }));
    };
    /**
     * Remove an OpenLayers feature from the overlay
     * @param olFeature OpenLayers Feature
     */
    /**
     * Remove an OpenLayers feature from the overlay
     * @param {?} olFeature OpenLayers Feature
     * @return {?}
     */
    Overlay.prototype.removeOlFeature = /**
     * Remove an OpenLayers feature from the overlay
     * @param {?} olFeature OpenLayers Feature
     * @return {?}
     */
    function (olFeature) {
        this.dataSource.ol.removeFeature(olFeature);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9vdmVybGF5L3NoYXJlZC9vdmVybGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsT0FBTyxFQUVMLGFBQWEsRUFDYixXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBS3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7O0FBUXJEOzs7Ozs7O0lBa0JFLGlCQUFZLEdBQVk7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQVBELHNCQUFJLCtCQUFVO1FBSGQ7O1dBRUc7Ozs7O1FBQ0g7WUFDRSxPQUFPLG1CQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFxQixDQUFDO1FBQ3BELENBQUM7OztPQUFBO0lBT0Q7OztPQUdHOzs7Ozs7SUFDSCx3QkFBTTs7Ozs7SUFBTixVQUFPLEdBQVc7UUFDaEIsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO1lBQ3JCLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxTQUFTLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3hDO1NBQ0Y7YUFBTTtZQUNMLEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDaEM7UUFDRCxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7O0lBQ0gsNkJBQVc7Ozs7Ozs7SUFBWCxVQUNFLFFBQW1CLEVBQ25CLE1BQTZDLEVBQzdDLFFBQWlCO1FB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RSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQzFFO2FBQ0Y7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUNILGlDQUFlOzs7OztJQUFmLFVBQWdCLFNBQW9CO1FBQ2xDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsdUJBQUs7Ozs7SUFBTDtRQUNFLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFDSCxjQUFDO0FBQUQsQ0FBQyxBQXpKRCxJQXlKQzs7Ozs7Ozs7Ozs7Ozs7SUFySkMsc0JBQW9COzs7Ozs7SUFLcEIsd0JBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VhcmNoU291cmNlIH0gZnJvbSAnLi8uLi8uLi9zZWFyY2gvc2hhcmVkL3NvdXJjZXMvc291cmNlJztcclxuaW1wb3J0IE9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuXHJcbmltcG9ydCB7XHJcbiAgRmVhdHVyZSxcclxuICBGZWF0dXJlTW90aW9uLFxyXG4gIGZlYXR1cmVUb09sLFxyXG4gIG1vdmVUb09sRmVhdHVyZXNcclxufSBmcm9tICcuLi8uLi9mZWF0dXJlJztcclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgVmVjdG9yTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllcic7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcCc7XHJcblxyXG5pbXBvcnQgeyBjcmVhdGVPdmVybGF5TGF5ZXIgfSBmcm9tICcuL292ZXJsYXkudXRpbHMnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaXMgc2ltcGx5IGEgc2hvcnRjdXQgZm9yIGFkZGluZyBmZWF0dXJlcyB0byBhIG1hcC5cclxuICogSXQgZG9lcyBub3RoaW5nIG1vcmUgdGhhbiBhIHN0YW5kYXJkIGxheWVyIGJ1dCBpdCdzIHNoaXBwZWQgd2l0aFxyXG4gKiBhIGRlZmF1dGwgc3R5bGUgYmFzZWQgb24gdGhlIGdlb21ldHJ5IHR5cGUgb2YgdGhlIGZlYXR1cmVzIGl0IGNvbnRhaW5zLlxyXG4gKiBAdG9kbyBFbmhhbmNlIHRoYXQgYnkgdXNpbmcgYSBGZWF0dXJlU3RvcmUgYW5kIHN0cmF0ZWdpZXMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgT3ZlcmxheSB7XHJcbiAgLyoqXHJcbiAgICogVGhlIG1hcCB0byBhZGQgdGhlIGxheWVyIHRvXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBtYXA6IElnb01hcDtcclxuXHJcbiAgLyoqXHJcbiAgICogT3ZlcmxheSBsYXllclxyXG4gICAqL1xyXG4gIHByaXZhdGUgbGF5ZXI6IFZlY3RvckxheWVyO1xyXG5cclxuICAvKipcclxuICAgKiBPdmVybGF5IGxheWVyJ3MgZGF0YSBzb3VyY2VcclxuICAgKi9cclxuICBnZXQgZGF0YVNvdXJjZSgpOiBGZWF0dXJlRGF0YVNvdXJjZSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllci5kYXRhU291cmNlIGFzIEZlYXR1cmVEYXRhU291cmNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IobWFwPzogSWdvTWFwKSB7XHJcbiAgICB0aGlzLmxheWVyID0gY3JlYXRlT3ZlcmxheUxheWVyKCk7XHJcbiAgICB0aGlzLnNldE1hcChtYXApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQmluZCB0aGlzIHRvIGEgbWFwIGFuZCBhZGQgdGhlIG92ZXJsYXkgbGF5ZXIgdG8gdGhhdCBtYXBcclxuICAgKiBAcGFyYW0gbWFwIE1hcFxyXG4gICAqL1xyXG4gIHNldE1hcChtYXA6IElnb01hcCkge1xyXG4gICAgaWYgKG1hcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGlmICh0aGlzLm1hcCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5tYXAub2wucmVtb3ZlTGF5ZXIodGhpcy5sYXllci5vbCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG1hcC5vbC5hZGRMYXllcih0aGlzLmxheWVyLm9sKTtcclxuICAgIH1cclxuICAgIHRoaXMubWFwID0gbWFwO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBvdmVybGF5IGZlYXR1cmVzIGFuZCwgb3B0aW9uYWxseSwgbW92ZSB0byB0aGVtXHJcbiAgICogQHBhcmFtIGZlYXR1cmVzIEZlYXR1cmVzXHJcbiAgICogQHBhcmFtIG1vdGlvbiBPcHRpb25hbDogQXBwbHkgdGhpcyBtb3Rpb24gdG8gdGhlIG1hcCB2aWV3XHJcbiAgICogQHBhcmFtIHNvdXJjZUlkIE9wdGlvbmFsOiBSZW1vdmUgZmVhdHVyZXMgb2YgY2VydGFpbiBzb3VyY2VJZCAoZXg6ICdNYXAnIGZvciBxdWVyeSBmZWF0dXJlcylcclxuICAgKi9cclxuICBzZXRGZWF0dXJlcyhcclxuICAgIGZlYXR1cmVzOiBGZWF0dXJlW10sXHJcbiAgICBtb3Rpb246IEZlYXR1cmVNb3Rpb24gPSBGZWF0dXJlTW90aW9uLkRlZmF1bHQsXHJcbiAgICBzb3VyY2VJZD86IHN0cmluZ1xyXG4gICkge1xyXG4gICAgaWYgKHNvdXJjZUlkKSB7XHJcbiAgICAgIGZvciAoY29uc3Qgb2xGZWF0dXJlIG9mIHRoaXMuZGF0YVNvdXJjZS5vbC5nZXRGZWF0dXJlcygpKSB7XHJcbiAgICAgICAgaWYgKG9sRmVhdHVyZS5nZXQoJ19zb3VyY2VJZCcpID09PSBzb3VyY2VJZCkge1xyXG4gICAgICAgICAgdGhpcy5yZW1vdmVPbEZlYXR1cmUob2xGZWF0dXJlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIH1cclxuICAgIHRoaXMuYWRkRmVhdHVyZXMoZmVhdHVyZXMsIG1vdGlvbik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYSBmZWF0dXJlIHRvIHRoZSAgb3ZlcmxheSBhbmQsIG9wdGlvbmFsbHksIG1vdmUgdG8gaXRcclxuICAgKiBAcGFyYW0gZmVhdHVyZSBGZWF0dXJlXHJcbiAgICogQHBhcmFtIG1vdGlvbiBPcHRpb25hbDogQXBwbHkgdGhpcyBtb3Rpb24gdG8gdGhlIG1hcCB2aWV3XHJcbiAgICovXHJcbiAgYWRkRmVhdHVyZShmZWF0dXJlOiBGZWF0dXJlLCBtb3Rpb246IEZlYXR1cmVNb3Rpb24gPSBGZWF0dXJlTW90aW9uLkRlZmF1bHQpIHtcclxuICAgIHRoaXMuYWRkRmVhdHVyZXMoW2ZlYXR1cmVdLCBtb3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGZlYXR1cmVzIHRvIHRoZSAgb3ZlcmxheSBhbmQsIG9wdGlvbmFsbHksIG1vdmUgdG8gdGhlbVxyXG4gICAqIEBwYXJhbSBmZWF0dXJlcyBGZWF0dXJlc1xyXG4gICAqIEBwYXJhbSBtb3Rpb24gT3B0aW9uYWw6IEFwcGx5IHRoaXMgbW90aW9uIHRvIHRoZSBtYXAgdmlld1xyXG4gICAqL1xyXG4gIGFkZEZlYXR1cmVzKFxyXG4gICAgZmVhdHVyZXM6IEZlYXR1cmVbXSxcclxuICAgIG1vdGlvbjogRmVhdHVyZU1vdGlvbiA9IEZlYXR1cmVNb3Rpb24uRGVmYXVsdFxyXG4gICkge1xyXG4gICAgY29uc3Qgb2xGZWF0dXJlcyA9IFtdO1xyXG4gICAgZmVhdHVyZXMuZm9yRWFjaCgoZmVhdHVyZTogRmVhdHVyZSkgPT4ge1xyXG4gICAgICBjb25zdCBvbEZlYXR1cmUgPSBmZWF0dXJlVG9PbChmZWF0dXJlLCB0aGlzLm1hcC5wcm9qZWN0aW9uKTtcclxuICAgICAgY29uc3Qgb2xHZW9tZXRyeSA9IG9sRmVhdHVyZS5nZXRHZW9tZXRyeSgpO1xyXG4gICAgICBpZiAob2xHZW9tZXRyeSA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBvbEZlYXR1cmVzLnB1c2gob2xGZWF0dXJlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuYWRkT2xGZWF0dXJlcyhvbEZlYXR1cmVzLCBtb3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGEgT3BlbkxheWVycyBmZWF0dXJlIHRvIHRoZSAgb3ZlcmxheSBhbmQsIG9wdGlvbmFsbHksIG1vdmUgdG8gaXRcclxuICAgKiBAcGFyYW0gb2xGZWF0dXJlIE9wZW5MYXllcnMgRmVhdHVyZVxyXG4gICAqIEBwYXJhbSBtb3Rpb24gT3B0aW9uYWw6IEFwcGx5IHRoaXMgbW90aW9uIHRvIHRoZSBtYXAgdmlld1xyXG4gICAqL1xyXG4gIGFkZE9sRmVhdHVyZShcclxuICAgIG9sRmVhdHVyZTogT2xGZWF0dXJlLFxyXG4gICAgbW90aW9uOiBGZWF0dXJlTW90aW9uID0gRmVhdHVyZU1vdGlvbi5EZWZhdWx0XHJcbiAgKSB7XHJcbiAgICB0aGlzLmFkZE9sRmVhdHVyZXMoW29sRmVhdHVyZV0sIG1vdGlvbik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgT3BlbkxheWVycyBmZWF0dXJlcyB0byB0aGUgb3ZlcmxheSBhbmQsIG9wdGlvbmFsbHksIG1vdmUgdG8gdGhlbVxyXG4gICAqIEBwYXJhbSBvbEZlYXR1cmVzIE9wZW5MYXllcnMgRmVhdHVyZXNcclxuICAgKiBAcGFyYW0gbW90aW9uIE9wdGlvbmFsOiBBcHBseSB0aGlzIG1vdGlvbiB0byB0aGUgbWFwIHZpZXdcclxuICAgKi9cclxuICBhZGRPbEZlYXR1cmVzKFxyXG4gICAgb2xGZWF0dXJlczogT2xGZWF0dXJlW10sXHJcbiAgICBtb3Rpb246IEZlYXR1cmVNb3Rpb24gPSBGZWF0dXJlTW90aW9uLkRlZmF1bHRcclxuICApIHtcclxuICAgIHRoaXMuZGF0YVNvdXJjZS5vbC5hZGRGZWF0dXJlcyhvbEZlYXR1cmVzKTtcclxuICAgIG1vdmVUb09sRmVhdHVyZXModGhpcy5tYXAsIG9sRmVhdHVyZXMsIG1vdGlvbik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgYSBmZWF0dXJlIGZyb20gdGhlIG92ZXJsYXlcclxuICAgKiBAcGFyYW0gZmVhdHVyZSBGZWF0dXJlXHJcbiAgICovXHJcbiAgcmVtb3ZlRmVhdHVyZShmZWF0dXJlOiBGZWF0dXJlKSB7XHJcbiAgICB0aGlzLnJlbW92ZUZlYXR1cmVzKFtmZWF0dXJlXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgZmVhdHVyZXMgZnJvbSB0aGUgb3ZlcmxheVxyXG4gICAqIEBwYXJhbSBmZWF0dXJlcyBGZWF0dXJlc1xyXG4gICAqL1xyXG4gIHJlbW92ZUZlYXR1cmVzKGZlYXR1cmVzOiBGZWF0dXJlW10pIHtcclxuICAgIGZlYXR1cmVzLmZvckVhY2goKGZlYXR1cmU6IEZlYXR1cmUpID0+IHtcclxuICAgICAgaWYgKGZlYXR1cmUubWV0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2Uub2wuZ2V0RmVhdHVyZUJ5SWQoZmVhdHVyZS5tZXRhLmlkKSkge1xyXG4gICAgICAgICAgdGhpcy5yZW1vdmVPbEZlYXR1cmUodGhpcy5kYXRhU291cmNlLm9sLmdldEZlYXR1cmVCeUlkKGZlYXR1cmUubWV0YS5pZCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgYW4gT3BlbkxheWVycyBmZWF0dXJlIGZyb20gdGhlIG92ZXJsYXlcclxuICAgKiBAcGFyYW0gb2xGZWF0dXJlIE9wZW5MYXllcnMgRmVhdHVyZVxyXG4gICAqL1xyXG4gIHJlbW92ZU9sRmVhdHVyZShvbEZlYXR1cmU6IE9sRmVhdHVyZSkge1xyXG4gICAgdGhpcy5kYXRhU291cmNlLm9sLnJlbW92ZUZlYXR1cmUob2xGZWF0dXJlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBvdmVybGF5XHJcbiAgICovXHJcbiAgY2xlYXIoKSB7XHJcbiAgICB0aGlzLmRhdGFTb3VyY2Uub2wuY2xlYXIoKTtcclxuICB9XHJcbn1cclxuIl19