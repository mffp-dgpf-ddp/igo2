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
     * @param {?=} sourceId Optional: Remove features of certain sourceId (ex: 'Map' for query features)
     * @return {?}
     */
    setFeatures(features, motion = FeatureMotion.Default, sourceId) {
        if (sourceId) {
            for (const olFeature of this.dataSource.ol.getFeatures()) {
                if (olFeature.get('_sourceId') === sourceId) {
                    this.removeOlFeature(olFeature);
                }
            }
        }
        else {
            this.clear();
        }
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
        this.addOlFeatures([olFeature], motion);
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
     * Remove a feature from the overlay
     * @param {?} feature Feature
     * @return {?}
     */
    removeFeature(feature) {
        this.removeFeatures([feature]);
    }
    /**
     * Remove features from the overlay
     * @param {?} features Features
     * @return {?}
     */
    removeFeatures(features) {
        features.forEach((/**
         * @param {?} feature
         * @return {?}
         */
        (feature) => {
            if (feature.meta) {
                if (this.dataSource.ol.getFeatureById(feature.meta.id)) {
                    this.removeOlFeature(this.dataSource.ol.getFeatureById(feature.meta.id));
                }
            }
        }));
    }
    /**
     * Remove an OpenLayers feature from the overlay
     * @param {?} olFeature OpenLayers Feature
     * @return {?}
     */
    removeOlFeature(olFeature) {
        this.dataSource.ol.removeFeature(olFeature);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9vdmVybGF5L3NoYXJlZC9vdmVybGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFHQSxPQUFPLEVBRUwsYUFBYSxFQUNiLFdBQVcsRUFDWCxnQkFBZ0IsRUFDakIsTUFBTSxlQUFlLENBQUM7QUFLdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7QUFRckQsTUFBTSxPQUFPLE9BQU87Ozs7O0lBY2xCLElBQUksVUFBVTtRQUNaLE9BQU8sbUJBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQXFCLENBQUM7SUFDcEQsQ0FBQzs7OztJQUVELFlBQVksR0FBWTtRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLGtCQUFrQixFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDOzs7Ozs7SUFNRCxNQUFNLENBQUMsR0FBVztRQUNoQixJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7WUFDckIsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLFNBQVMsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDeEM7U0FDRjthQUFNO1lBQ0wsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNoQztRQUNELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2pCLENBQUM7Ozs7Ozs7O0lBUUQsV0FBVyxDQUNULFFBQW1CLEVBQ25CLFNBQXdCLGFBQWEsQ0FBQyxPQUFPLEVBQzdDLFFBQWlCO1FBRWpCLElBQUksUUFBUSxFQUFFO1lBQ1osS0FBSyxNQUFNLFNBQVMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDeEQsSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLFFBQVEsRUFBRTtvQkFDM0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDakM7YUFDRjtTQUNGO2FBQU07WUFDTCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDZDtRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7Ozs7SUFPRCxVQUFVLENBQUMsT0FBZ0IsRUFBRSxTQUF3QixhQUFhLENBQUMsT0FBTztRQUN4RSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7Ozs7OztJQU9ELFdBQVcsQ0FDVCxRQUFtQixFQUNuQixTQUF3QixhQUFhLENBQUMsT0FBTzs7Y0FFdkMsVUFBVSxHQUFHLEVBQUU7UUFDckIsUUFBUSxDQUFDLE9BQU87Ozs7UUFBQyxDQUFDLE9BQWdCLEVBQUUsRUFBRTs7a0JBQzlCLFNBQVMsR0FBRyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDOztrQkFDckQsVUFBVSxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUU7WUFDMUMsSUFBSSxVQUFVLEtBQUssSUFBSSxFQUFFO2dCQUN2QixPQUFPO2FBQ1I7WUFDRCxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdCLENBQUMsRUFBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDekMsQ0FBQzs7Ozs7OztJQU9ELFlBQVksQ0FDVixTQUFvQixFQUNwQixTQUF3QixhQUFhLENBQUMsT0FBTztRQUU3QyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7Ozs7OztJQU9ELGFBQWEsQ0FDWCxVQUF1QixFQUN2QixTQUF3QixhQUFhLENBQUMsT0FBTztRQUU3QyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0MsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDakQsQ0FBQzs7Ozs7O0lBTUQsYUFBYSxDQUFDLE9BQWdCO1FBQzVCLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7Ozs7OztJQU1ELGNBQWMsQ0FBQyxRQUFtQjtRQUNoQyxRQUFRLENBQUMsT0FBTzs7OztRQUFDLENBQUMsT0FBZ0IsRUFBRSxFQUFFO1lBQ3BDLElBQUksT0FBTyxDQUFDLElBQUksRUFBRTtnQkFDaEIsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFDdEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUMxRTthQUNGO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7SUFNRCxlQUFlLENBQUMsU0FBb0I7UUFDbEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7Ozs7O0lBS0QsS0FBSztRQUNILElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLENBQUM7Q0FDRjs7Ozs7OztJQXJKQyxzQkFBb0I7Ozs7OztJQUtwQix3QkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZWFyY2hTb3VyY2UgfSBmcm9tICcuLy4uLy4uL3NlYXJjaC9zaGFyZWQvc291cmNlcy9zb3VyY2UnO1xyXG5pbXBvcnQgT2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5cclxuaW1wb3J0IHtcclxuICBGZWF0dXJlLFxyXG4gIEZlYXR1cmVNb3Rpb24sXHJcbiAgZmVhdHVyZVRvT2wsXHJcbiAgbW92ZVRvT2xGZWF0dXJlc1xyXG59IGZyb20gJy4uLy4uL2ZlYXR1cmUnO1xyXG5pbXBvcnQgeyBGZWF0dXJlRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBWZWN0b3JMYXllciB9IGZyb20gJy4uLy4uL2xheWVyJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuXHJcbmltcG9ydCB7IGNyZWF0ZU92ZXJsYXlMYXllciB9IGZyb20gJy4vb3ZlcmxheS51dGlscyc7XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBpcyBzaW1wbHkgYSBzaG9ydGN1dCBmb3IgYWRkaW5nIGZlYXR1cmVzIHRvIGEgbWFwLlxyXG4gKiBJdCBkb2VzIG5vdGhpbmcgbW9yZSB0aGFuIGEgc3RhbmRhcmQgbGF5ZXIgYnV0IGl0J3Mgc2hpcHBlZCB3aXRoXHJcbiAqIGEgZGVmYXV0bCBzdHlsZSBiYXNlZCBvbiB0aGUgZ2VvbWV0cnkgdHlwZSBvZiB0aGUgZmVhdHVyZXMgaXQgY29udGFpbnMuXHJcbiAqIEB0b2RvIEVuaGFuY2UgdGhhdCBieSB1c2luZyBhIEZlYXR1cmVTdG9yZSBhbmQgc3RyYXRlZ2llcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBPdmVybGF5IHtcclxuICAvKipcclxuICAgKiBUaGUgbWFwIHRvIGFkZCB0aGUgbGF5ZXIgdG9cclxuICAgKi9cclxuICBwcml2YXRlIG1hcDogSWdvTWFwO1xyXG5cclxuICAvKipcclxuICAgKiBPdmVybGF5IGxheWVyXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBsYXllcjogVmVjdG9yTGF5ZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIE92ZXJsYXkgbGF5ZXIncyBkYXRhIHNvdXJjZVxyXG4gICAqL1xyXG4gIGdldCBkYXRhU291cmNlKCk6IEZlYXR1cmVEYXRhU291cmNlIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVyLmRhdGFTb3VyY2UgYXMgRmVhdHVyZURhdGFTb3VyY2U7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihtYXA/OiBJZ29NYXApIHtcclxuICAgIHRoaXMubGF5ZXIgPSBjcmVhdGVPdmVybGF5TGF5ZXIoKTtcclxuICAgIHRoaXMuc2V0TWFwKG1hcCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBCaW5kIHRoaXMgdG8gYSBtYXAgYW5kIGFkZCB0aGUgb3ZlcmxheSBsYXllciB0byB0aGF0IG1hcFxyXG4gICAqIEBwYXJhbSBtYXAgTWFwXHJcbiAgICovXHJcbiAgc2V0TWFwKG1hcDogSWdvTWFwKSB7XHJcbiAgICBpZiAobWFwID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgaWYgKHRoaXMubWFwICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLm1hcC5vbC5yZW1vdmVMYXllcih0aGlzLmxheWVyLm9sKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbWFwLm9sLmFkZExheWVyKHRoaXMubGF5ZXIub2wpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5tYXAgPSBtYXA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIG92ZXJsYXkgZmVhdHVyZXMgYW5kLCBvcHRpb25hbGx5LCBtb3ZlIHRvIHRoZW1cclxuICAgKiBAcGFyYW0gZmVhdHVyZXMgRmVhdHVyZXNcclxuICAgKiBAcGFyYW0gbW90aW9uIE9wdGlvbmFsOiBBcHBseSB0aGlzIG1vdGlvbiB0byB0aGUgbWFwIHZpZXdcclxuICAgKiBAcGFyYW0gc291cmNlSWQgT3B0aW9uYWw6IFJlbW92ZSBmZWF0dXJlcyBvZiBjZXJ0YWluIHNvdXJjZUlkIChleDogJ01hcCcgZm9yIHF1ZXJ5IGZlYXR1cmVzKVxyXG4gICAqL1xyXG4gIHNldEZlYXR1cmVzKFxyXG4gICAgZmVhdHVyZXM6IEZlYXR1cmVbXSxcclxuICAgIG1vdGlvbjogRmVhdHVyZU1vdGlvbiA9IEZlYXR1cmVNb3Rpb24uRGVmYXVsdCxcclxuICAgIHNvdXJjZUlkPzogc3RyaW5nXHJcbiAgKSB7XHJcbiAgICBpZiAoc291cmNlSWQpIHtcclxuICAgICAgZm9yIChjb25zdCBvbEZlYXR1cmUgb2YgdGhpcy5kYXRhU291cmNlLm9sLmdldEZlYXR1cmVzKCkpIHtcclxuICAgICAgICBpZiAob2xGZWF0dXJlLmdldCgnX3NvdXJjZUlkJykgPT09IHNvdXJjZUlkKSB7XHJcbiAgICAgICAgICB0aGlzLnJlbW92ZU9sRmVhdHVyZShvbEZlYXR1cmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hZGRGZWF0dXJlcyhmZWF0dXJlcywgbW90aW9uKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhIGZlYXR1cmUgdG8gdGhlICBvdmVybGF5IGFuZCwgb3B0aW9uYWxseSwgbW92ZSB0byBpdFxyXG4gICAqIEBwYXJhbSBmZWF0dXJlIEZlYXR1cmVcclxuICAgKiBAcGFyYW0gbW90aW9uIE9wdGlvbmFsOiBBcHBseSB0aGlzIG1vdGlvbiB0byB0aGUgbWFwIHZpZXdcclxuICAgKi9cclxuICBhZGRGZWF0dXJlKGZlYXR1cmU6IEZlYXR1cmUsIG1vdGlvbjogRmVhdHVyZU1vdGlvbiA9IEZlYXR1cmVNb3Rpb24uRGVmYXVsdCkge1xyXG4gICAgdGhpcy5hZGRGZWF0dXJlcyhbZmVhdHVyZV0sIG1vdGlvbik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgZmVhdHVyZXMgdG8gdGhlICBvdmVybGF5IGFuZCwgb3B0aW9uYWxseSwgbW92ZSB0byB0aGVtXHJcbiAgICogQHBhcmFtIGZlYXR1cmVzIEZlYXR1cmVzXHJcbiAgICogQHBhcmFtIG1vdGlvbiBPcHRpb25hbDogQXBwbHkgdGhpcyBtb3Rpb24gdG8gdGhlIG1hcCB2aWV3XHJcbiAgICovXHJcbiAgYWRkRmVhdHVyZXMoXHJcbiAgICBmZWF0dXJlczogRmVhdHVyZVtdLFxyXG4gICAgbW90aW9uOiBGZWF0dXJlTW90aW9uID0gRmVhdHVyZU1vdGlvbi5EZWZhdWx0XHJcbiAgKSB7XHJcbiAgICBjb25zdCBvbEZlYXR1cmVzID0gW107XHJcbiAgICBmZWF0dXJlcy5mb3JFYWNoKChmZWF0dXJlOiBGZWF0dXJlKSA9PiB7XHJcbiAgICAgIGNvbnN0IG9sRmVhdHVyZSA9IGZlYXR1cmVUb09sKGZlYXR1cmUsIHRoaXMubWFwLnByb2plY3Rpb24pO1xyXG4gICAgICBjb25zdCBvbEdlb21ldHJ5ID0gb2xGZWF0dXJlLmdldEdlb21ldHJ5KCk7XHJcbiAgICAgIGlmIChvbEdlb21ldHJ5ID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIG9sRmVhdHVyZXMucHVzaChvbEZlYXR1cmUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5hZGRPbEZlYXR1cmVzKG9sRmVhdHVyZXMsIG1vdGlvbik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYSBPcGVuTGF5ZXJzIGZlYXR1cmUgdG8gdGhlICBvdmVybGF5IGFuZCwgb3B0aW9uYWxseSwgbW92ZSB0byBpdFxyXG4gICAqIEBwYXJhbSBvbEZlYXR1cmUgT3BlbkxheWVycyBGZWF0dXJlXHJcbiAgICogQHBhcmFtIG1vdGlvbiBPcHRpb25hbDogQXBwbHkgdGhpcyBtb3Rpb24gdG8gdGhlIG1hcCB2aWV3XHJcbiAgICovXHJcbiAgYWRkT2xGZWF0dXJlKFxyXG4gICAgb2xGZWF0dXJlOiBPbEZlYXR1cmUsXHJcbiAgICBtb3Rpb246IEZlYXR1cmVNb3Rpb24gPSBGZWF0dXJlTW90aW9uLkRlZmF1bHRcclxuICApIHtcclxuICAgIHRoaXMuYWRkT2xGZWF0dXJlcyhbb2xGZWF0dXJlXSwgbW90aW9uKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBPcGVuTGF5ZXJzIGZlYXR1cmVzIHRvIHRoZSBvdmVybGF5IGFuZCwgb3B0aW9uYWxseSwgbW92ZSB0byB0aGVtXHJcbiAgICogQHBhcmFtIG9sRmVhdHVyZXMgT3BlbkxheWVycyBGZWF0dXJlc1xyXG4gICAqIEBwYXJhbSBtb3Rpb24gT3B0aW9uYWw6IEFwcGx5IHRoaXMgbW90aW9uIHRvIHRoZSBtYXAgdmlld1xyXG4gICAqL1xyXG4gIGFkZE9sRmVhdHVyZXMoXHJcbiAgICBvbEZlYXR1cmVzOiBPbEZlYXR1cmVbXSxcclxuICAgIG1vdGlvbjogRmVhdHVyZU1vdGlvbiA9IEZlYXR1cmVNb3Rpb24uRGVmYXVsdFxyXG4gICkge1xyXG4gICAgdGhpcy5kYXRhU291cmNlLm9sLmFkZEZlYXR1cmVzKG9sRmVhdHVyZXMpO1xyXG4gICAgbW92ZVRvT2xGZWF0dXJlcyh0aGlzLm1hcCwgb2xGZWF0dXJlcywgbW90aW9uKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBhIGZlYXR1cmUgZnJvbSB0aGUgb3ZlcmxheVxyXG4gICAqIEBwYXJhbSBmZWF0dXJlIEZlYXR1cmVcclxuICAgKi9cclxuICByZW1vdmVGZWF0dXJlKGZlYXR1cmU6IEZlYXR1cmUpIHtcclxuICAgIHRoaXMucmVtb3ZlRmVhdHVyZXMoW2ZlYXR1cmVdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBmZWF0dXJlcyBmcm9tIHRoZSBvdmVybGF5XHJcbiAgICogQHBhcmFtIGZlYXR1cmVzIEZlYXR1cmVzXHJcbiAgICovXHJcbiAgcmVtb3ZlRmVhdHVyZXMoZmVhdHVyZXM6IEZlYXR1cmVbXSkge1xyXG4gICAgZmVhdHVyZXMuZm9yRWFjaCgoZmVhdHVyZTogRmVhdHVyZSkgPT4ge1xyXG4gICAgICBpZiAoZmVhdHVyZS5tZXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YVNvdXJjZS5vbC5nZXRGZWF0dXJlQnlJZChmZWF0dXJlLm1ldGEuaWQpKSB7XHJcbiAgICAgICAgICB0aGlzLnJlbW92ZU9sRmVhdHVyZSh0aGlzLmRhdGFTb3VyY2Uub2wuZ2V0RmVhdHVyZUJ5SWQoZmVhdHVyZS5tZXRhLmlkKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBhbiBPcGVuTGF5ZXJzIGZlYXR1cmUgZnJvbSB0aGUgb3ZlcmxheVxyXG4gICAqIEBwYXJhbSBvbEZlYXR1cmUgT3BlbkxheWVycyBGZWF0dXJlXHJcbiAgICovXHJcbiAgcmVtb3ZlT2xGZWF0dXJlKG9sRmVhdHVyZTogT2xGZWF0dXJlKSB7XHJcbiAgICB0aGlzLmRhdGFTb3VyY2Uub2wucmVtb3ZlRmVhdHVyZShvbEZlYXR1cmUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhlIG92ZXJsYXlcclxuICAgKi9cclxuICBjbGVhcigpIHtcclxuICAgIHRoaXMuZGF0YVNvdXJjZS5vbC5jbGVhcigpO1xyXG4gIH1cclxufVxyXG4iXX0=