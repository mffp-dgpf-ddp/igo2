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
export class Overlay {
    /**
     * Overlay layer's data source
     * @return {?}
     */
    get dataSource() {
        return (/** @type {?} */ (this.layer.dataSource));
    }
    /**
     * @param {?=} map
     */
    constructor(map) {
        this.layer = createOverlayLayer();
        this.setMap(map);
    }
    /**
     * Bind this to a map and add the overlay layer to that map
     * @param {?} map Map
     * @return {?}
     */
    setMap(map) {
        if (map === undefined) {
            if (this.map !== undefined) {
                this.map.ol.removeLayer(this.layer.ol);
            }
        }
        else {
            map.ol.addLayer(this.layer.ol);
        }
        this.map = map;
    }
    /**
     * Set the overlay features and, optionally, move to them
     * @param {?} features Features
     * @param {?=} motion Optional: Apply this motion to the map view
     * @return {?}
     */
    setFeatures(features, motion = FeatureMotion.Default) {
        this.clear();
        this.addFeatures(features, motion);
    }
    /**
     * Add a feature to the  overlay and, optionally, move to it
     * @param {?} feature Feature
     * @param {?=} motion Optional: Apply this motion to the map view
     * @return {?}
     */
    addFeature(feature, motion = FeatureMotion.Default) {
        this.addFeatures([feature], motion);
    }
    /**
     * Add features to the  overlay and, optionally, move to them
     * @param {?} features Features
     * @param {?=} motion Optional: Apply this motion to the map view
     * @return {?}
     */
    addFeatures(features, motion = FeatureMotion.Default) {
        /** @type {?} */
        const olFeatures = [];
        features.forEach((/**
         * @param {?} feature
         * @return {?}
         */
        (feature) => {
            /** @type {?} */
            const olFeature = featureToOl(feature, this.map.projection);
            /** @type {?} */
            const olGeometry = olFeature.getGeometry();
            if (olGeometry === null) {
                return;
            }
            olFeatures.push(olFeature);
        }));
        this.addOlFeatures(olFeatures, motion);
    }
    /**
     * Add a OpenLayers feature to the  overlay and, optionally, move to it
     * @param {?} olFeature OpenLayers Feature
     * @param {?=} motion Optional: Apply this motion to the map view
     * @return {?}
     */
    addOlFeature(olFeature, motion = FeatureMotion.Default) {
        this.addOlFeature([olFeature], motion);
    }
    /**
     * Add OpenLayers features to the overlay and, optionally, move to them
     * @param {?} olFeatures OpenLayers Features
     * @param {?=} motion Optional: Apply this motion to the map view
     * @return {?}
     */
    addOlFeatures(olFeatures, motion = FeatureMotion.Default) {
        this.dataSource.ol.addFeatures(olFeatures);
        moveToOlFeatures(this.map, olFeatures, motion);
    }
    /**
     * Clear the overlay
     * @return {?}
     */
    clear() {
        this.dataSource.ol.clear();
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9vdmVybGF5L3NoYXJlZC9vdmVybGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBRUwsYUFBYSxFQUNiLFdBQVcsRUFDWCxnQkFBZ0IsRUFDakIsTUFBTSxlQUFlLENBQUM7QUFLdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7QUFRckQsTUFBTSxPQUFPLE9BQU87Ozs7O0lBY2xCLElBQUksVUFBVTtRQUNaLE9BQU8sbUJBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQXFCLENBQUM7SUFDcEQsQ0FBQzs7OztJQUVELFlBQVksR0FBWTtRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLGtCQUFrQixFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDOzs7Ozs7SUFNRCxNQUFNLENBQUMsR0FBVztRQUNoQixJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7WUFDckIsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLFNBQVMsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDeEM7U0FDRjthQUFNO1lBQ0wsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNoQztRQUNELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2pCLENBQUM7Ozs7Ozs7SUFPRCxXQUFXLENBQ1QsUUFBbUIsRUFDbkIsU0FBd0IsYUFBYSxDQUFDLE9BQU87UUFFN0MsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDckMsQ0FBQzs7Ozs7OztJQU9ELFVBQVUsQ0FBQyxPQUFnQixFQUFFLFNBQXdCLGFBQWEsQ0FBQyxPQUFPO1FBQ3hFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDOzs7Ozs7O0lBT0QsV0FBVyxDQUNULFFBQW1CLEVBQ25CLFNBQXdCLGFBQWEsQ0FBQyxPQUFPOztjQUV2QyxVQUFVLEdBQUcsRUFBRTtRQUNyQixRQUFRLENBQUMsT0FBTzs7OztRQUFDLENBQUMsT0FBZ0IsRUFBRSxFQUFFOztrQkFDOUIsU0FBUyxHQUFHLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7O2tCQUNyRCxVQUFVLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRTtZQUMxQyxJQUFJLFVBQVUsS0FBSyxJQUFJLEVBQUU7Z0JBQ3ZCLE9BQU87YUFDUjtZQUNELFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxFQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN6QyxDQUFDOzs7Ozs7O0lBT0QsWUFBWSxDQUNWLFNBQW9CLEVBQ3BCLFNBQXdCLGFBQWEsQ0FBQyxPQUFPO1FBRTdDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN6QyxDQUFDOzs7Ozs7O0lBT0QsYUFBYSxDQUNYLFVBQXVCLEVBQ3ZCLFNBQXdCLGFBQWEsQ0FBQyxPQUFPO1FBRTdDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7OztJQUtELEtBQUs7UUFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3QixDQUFDO0NBQ0Y7Ozs7Ozs7SUE3R0Msc0JBQW9COzs7Ozs7SUFLcEIsd0JBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuXHJcbmltcG9ydCB7XHJcbiAgRmVhdHVyZSxcclxuICBGZWF0dXJlTW90aW9uLFxyXG4gIGZlYXR1cmVUb09sLFxyXG4gIG1vdmVUb09sRmVhdHVyZXNcclxufSBmcm9tICcuLi8uLi9mZWF0dXJlJztcclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgVmVjdG9yTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllcic7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcCc7XHJcblxyXG5pbXBvcnQgeyBjcmVhdGVPdmVybGF5TGF5ZXIgfSBmcm9tICcuL292ZXJsYXkudXRpbHMnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaXMgc2ltcGx5IGEgc2hvcnRjdXQgZm9yIGFkZGluZyBmZWF0dXJlcyB0byBhIG1hcC5cclxuICogSXQgZG9lcyBub3RoaW5nIG1vcmUgdGhhbiBhIHN0YW5kYXJkIGxheWVyIGJ1dCBpdCdzIHNoaXBwZWQgd2l0aFxyXG4gKiBhIGRlZmF1dGwgc3R5bGUgYmFzZWQgb24gdGhlIGdlb21ldHJ5IHR5cGUgb2YgdGhlIGZlYXR1cmVzIGl0IGNvbnRhaW5zLlxyXG4gKiBAdG9kbyBFbmhhbmNlIHRoYXQgYnkgdXNpbmcgYSBGZWF0dXJlU3RvcmUgYW5kIHN0cmF0ZWdpZXMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgT3ZlcmxheSB7XHJcbiAgLyoqXHJcbiAgICogVGhlIG1hcCB0byBhZGQgdGhlIGxheWVyIHRvXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBtYXA6IElnb01hcDtcclxuXHJcbiAgLyoqXHJcbiAgICogT3ZlcmxheSBsYXllclxyXG4gICAqL1xyXG4gIHByaXZhdGUgbGF5ZXI6IFZlY3RvckxheWVyO1xyXG5cclxuICAvKipcclxuICAgKiBPdmVybGF5IGxheWVyJ3MgZGF0YSBzb3VyY2VcclxuICAgKi9cclxuICBnZXQgZGF0YVNvdXJjZSgpOiBGZWF0dXJlRGF0YVNvdXJjZSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllci5kYXRhU291cmNlIGFzIEZlYXR1cmVEYXRhU291cmNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IobWFwPzogSWdvTWFwKSB7XHJcbiAgICB0aGlzLmxheWVyID0gY3JlYXRlT3ZlcmxheUxheWVyKCk7XHJcbiAgICB0aGlzLnNldE1hcChtYXApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQmluZCB0aGlzIHRvIGEgbWFwIGFuZCBhZGQgdGhlIG92ZXJsYXkgbGF5ZXIgdG8gdGhhdCBtYXBcclxuICAgKiBAcGFyYW0gbWFwIE1hcFxyXG4gICAqL1xyXG4gIHNldE1hcChtYXA6IElnb01hcCkge1xyXG4gICAgaWYgKG1hcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGlmICh0aGlzLm1hcCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5tYXAub2wucmVtb3ZlTGF5ZXIodGhpcy5sYXllci5vbCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG1hcC5vbC5hZGRMYXllcih0aGlzLmxheWVyLm9sKTtcclxuICAgIH1cclxuICAgIHRoaXMubWFwID0gbWFwO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBvdmVybGF5IGZlYXR1cmVzIGFuZCwgb3B0aW9uYWxseSwgbW92ZSB0byB0aGVtXHJcbiAgICogQHBhcmFtIGZlYXR1cmVzIEZlYXR1cmVzXHJcbiAgICogQHBhcmFtIG1vdGlvbiBPcHRpb25hbDogQXBwbHkgdGhpcyBtb3Rpb24gdG8gdGhlIG1hcCB2aWV3XHJcbiAgICovXHJcbiAgc2V0RmVhdHVyZXMoXHJcbiAgICBmZWF0dXJlczogRmVhdHVyZVtdLFxyXG4gICAgbW90aW9uOiBGZWF0dXJlTW90aW9uID0gRmVhdHVyZU1vdGlvbi5EZWZhdWx0XHJcbiAgKSB7XHJcbiAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICB0aGlzLmFkZEZlYXR1cmVzKGZlYXR1cmVzLCBtb3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGEgZmVhdHVyZSB0byB0aGUgIG92ZXJsYXkgYW5kLCBvcHRpb25hbGx5LCBtb3ZlIHRvIGl0XHJcbiAgICogQHBhcmFtIGZlYXR1cmUgRmVhdHVyZVxyXG4gICAqIEBwYXJhbSBtb3Rpb24gT3B0aW9uYWw6IEFwcGx5IHRoaXMgbW90aW9uIHRvIHRoZSBtYXAgdmlld1xyXG4gICAqL1xyXG4gIGFkZEZlYXR1cmUoZmVhdHVyZTogRmVhdHVyZSwgbW90aW9uOiBGZWF0dXJlTW90aW9uID0gRmVhdHVyZU1vdGlvbi5EZWZhdWx0KSB7XHJcbiAgICB0aGlzLmFkZEZlYXR1cmVzKFtmZWF0dXJlXSwgbW90aW9uKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBmZWF0dXJlcyB0byB0aGUgIG92ZXJsYXkgYW5kLCBvcHRpb25hbGx5LCBtb3ZlIHRvIHRoZW1cclxuICAgKiBAcGFyYW0gZmVhdHVyZXMgRmVhdHVyZXNcclxuICAgKiBAcGFyYW0gbW90aW9uIE9wdGlvbmFsOiBBcHBseSB0aGlzIG1vdGlvbiB0byB0aGUgbWFwIHZpZXdcclxuICAgKi9cclxuICBhZGRGZWF0dXJlcyhcclxuICAgIGZlYXR1cmVzOiBGZWF0dXJlW10sXHJcbiAgICBtb3Rpb246IEZlYXR1cmVNb3Rpb24gPSBGZWF0dXJlTW90aW9uLkRlZmF1bHRcclxuICApIHtcclxuICAgIGNvbnN0IG9sRmVhdHVyZXMgPSBbXTtcclxuICAgIGZlYXR1cmVzLmZvckVhY2goKGZlYXR1cmU6IEZlYXR1cmUpID0+IHtcclxuICAgICAgY29uc3Qgb2xGZWF0dXJlID0gZmVhdHVyZVRvT2woZmVhdHVyZSwgdGhpcy5tYXAucHJvamVjdGlvbik7XHJcbiAgICAgIGNvbnN0IG9sR2VvbWV0cnkgPSBvbEZlYXR1cmUuZ2V0R2VvbWV0cnkoKTtcclxuICAgICAgaWYgKG9sR2VvbWV0cnkgPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgb2xGZWF0dXJlcy5wdXNoKG9sRmVhdHVyZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmFkZE9sRmVhdHVyZXMob2xGZWF0dXJlcywgbW90aW9uKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhIE9wZW5MYXllcnMgZmVhdHVyZSB0byB0aGUgIG92ZXJsYXkgYW5kLCBvcHRpb25hbGx5LCBtb3ZlIHRvIGl0XHJcbiAgICogQHBhcmFtIG9sRmVhdHVyZSBPcGVuTGF5ZXJzIEZlYXR1cmVcclxuICAgKiBAcGFyYW0gbW90aW9uIE9wdGlvbmFsOiBBcHBseSB0aGlzIG1vdGlvbiB0byB0aGUgbWFwIHZpZXdcclxuICAgKi9cclxuICBhZGRPbEZlYXR1cmUoXHJcbiAgICBvbEZlYXR1cmU6IE9sRmVhdHVyZSxcclxuICAgIG1vdGlvbjogRmVhdHVyZU1vdGlvbiA9IEZlYXR1cmVNb3Rpb24uRGVmYXVsdFxyXG4gICkge1xyXG4gICAgdGhpcy5hZGRPbEZlYXR1cmUoW29sRmVhdHVyZV0sIG1vdGlvbik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgT3BlbkxheWVycyBmZWF0dXJlcyB0byB0aGUgb3ZlcmxheSBhbmQsIG9wdGlvbmFsbHksIG1vdmUgdG8gdGhlbVxyXG4gICAqIEBwYXJhbSBvbEZlYXR1cmVzIE9wZW5MYXllcnMgRmVhdHVyZXNcclxuICAgKiBAcGFyYW0gbW90aW9uIE9wdGlvbmFsOiBBcHBseSB0aGlzIG1vdGlvbiB0byB0aGUgbWFwIHZpZXdcclxuICAgKi9cclxuICBhZGRPbEZlYXR1cmVzKFxyXG4gICAgb2xGZWF0dXJlczogT2xGZWF0dXJlW10sXHJcbiAgICBtb3Rpb246IEZlYXR1cmVNb3Rpb24gPSBGZWF0dXJlTW90aW9uLkRlZmF1bHRcclxuICApIHtcclxuICAgIHRoaXMuZGF0YVNvdXJjZS5vbC5hZGRGZWF0dXJlcyhvbEZlYXR1cmVzKTtcclxuICAgIG1vdmVUb09sRmVhdHVyZXModGhpcy5tYXAsIG9sRmVhdHVyZXMsIG1vdGlvbik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgb3ZlcmxheVxyXG4gICAqL1xyXG4gIGNsZWFyKCkge1xyXG4gICAgdGhpcy5kYXRhU291cmNlLm9sLmNsZWFyKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==