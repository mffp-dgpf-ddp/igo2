/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { getEntityId, EntityStore } from '@igo2/common';
import { FeatureMotion } from './feature.enums';
import { computeOlFeaturesDiff, featureFromOl, featureToOl, moveToOlFeatures } from './feature.utils';
/**
 * The class is a specialized version of an EntityStore that stores
 * features and the map layer to display them on. Synchronization
 * between the store and the layer is handled by strategies.
 * @template T
 */
export class FeatureStore extends EntityStore {
    /**
     * @param {?} entities
     * @param {?} options
     */
    constructor(entities, options) {
        super(entities, options);
        this.map = options.map;
    }
    /**
     * The layer's data source
     * @return {?}
     */
    get source() {
        return this.layer ? (/** @type {?} */ (this.layer.dataSource)) : undefined;
    }
    /**
     * Bind this store to a vector layer
     * @param {?} layer Vector layer
     * @return {?} Feature store
     */
    bindLayer(layer) {
        this.layer = layer;
        return this;
    }
    /**
     * Set the layer's features and perform a motion to make them visible. Strategies
     * make extensive use of that method.
     * @param {?} features Features
     * @param {?=} motion Optional: The type of motion to perform
     * @param {?=} viewScale
     * @param {?=} areaRatio
     * @param {?=} getId
     * @return {?}
     */
    setLayerFeatures(features, motion = FeatureMotion.Default, viewScale, areaRatio, getId) {
        getId = getId ? getId : getEntityId;
        this.checkLayer();
        /** @type {?} */
        const olFeatures = features
            .map((/**
         * @param {?} feature
         * @return {?}
         */
        (feature) => featureToOl(feature, this.map.projection, getId)));
        this.setLayerOlFeatures(olFeatures, motion, viewScale, areaRatio);
    }
    /**
     * Set the store's features from an array of OL features.
     * @param {?} olFeatures Ol features
     * @return {?}
     */
    setStoreOlFeatures(olFeatures) {
        this.checkLayer();
        /** @type {?} */
        const features = olFeatures.map((/**
         * @param {?} olFeature
         * @return {?}
         */
        (olFeature) => {
            olFeature.set('_featureStore', this, true);
            return featureFromOl(olFeature, this.layer.map.projection);
        }));
        this.load((/** @type {?} */ (features)));
    }
    /**
     * Remove all features from the layer
     * @return {?}
     */
    clearLayer() {
        this.checkLayer();
        this.source.ol.clear();
    }
    /**
     * Check wether a layer is bound or not and throw an error if not.
     * @private
     * @return {?}
     */
    checkLayer() {
        if (this.layer === undefined) {
            throw new Error('This FeatureStore is not bound to a layer.');
        }
    }
    /**
     * Set the layer's features and perform a motion to make them visible.
     * @private
     * @param {?} olFeatures
     * @param {?=} motion Optional: The type of motion to perform
     * @param {?=} viewScale
     * @param {?=} areaRatio
     * @return {?}
     */
    setLayerOlFeatures(olFeatures, motion = FeatureMotion.Default, viewScale, areaRatio) {
        /** @type {?} */
        const olSource = this.layer.ol.getSource();
        /** @type {?} */
        const diff = computeOlFeaturesDiff(olSource.getFeatures(), olFeatures);
        if (diff.remove.length > 0) {
            this.removeOlFeaturesFromLayer(diff.remove);
        }
        if (diff.add.length > 0) {
            this.addOlFeaturesToLayer(diff.add);
        }
        if (diff.add.length > 0) {
            // If features are added, do a motion toward the newly added features
            moveToOlFeatures(this.map, diff.add, motion, viewScale, areaRatio);
        }
        else if (diff.remove.length > 0) {
            // Else, do a motion toward all the features
            moveToOlFeatures(this.map, olFeatures, motion, viewScale, areaRatio);
        }
    }
    /**
     * Add features to the the layer
     * @private
     * @param {?} olFeatures
     * @return {?}
     */
    addOlFeaturesToLayer(olFeatures) {
        olFeatures.forEach((/**
         * @param {?} olFeature
         * @return {?}
         */
        (olFeature) => {
            olFeature.set('_featureStore', this, true);
        }));
        this.source.ol.addFeatures(olFeatures);
    }
    /**
     * Remove features from the the layer
     * @private
     * @param {?} olFeatures
     * @return {?}
     */
    removeOlFeaturesFromLayer(olFeatures) {
        olFeatures.forEach((/**
         * @param {?} olFeature
         * @return {?}
         */
        (olFeature) => {
            this.source.ol.removeFeature(olFeature);
        }));
    }
}
if (false) {
    /**
     * Vector layer to display the features on
     * @type {?}
     */
    FeatureStore.prototype.layer;
    /**
     * The map the layer is bound to
     * @type {?}
     */
    FeatureStore.prototype.map;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmVhdHVyZS9zaGFyZWQvc3RvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFDTCxXQUFXLEVBRVgsV0FBVyxFQUNaLE1BQU0sY0FBYyxDQUFDO0FBTXRCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVoRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7O0FBT3RHLE1BQU0sT0FBTyxZQUEwQyxTQUFRLFdBQWM7Ozs7O0lBbUIzRSxZQUFZLFFBQWEsRUFBRSxPQUE0QjtRQUNyRCxLQUFLLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztJQUN6QixDQUFDOzs7OztJQVBELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsbUJBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQXFCLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUM3RSxDQUFDOzs7Ozs7SUFZRCxTQUFTLENBQUMsS0FBa0I7UUFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7Ozs7Ozs7OztJQVFELGdCQUFnQixDQUNkLFFBQW1CLEVBQ25CLFNBQXdCLGFBQWEsQ0FBQyxPQUFPLEVBQzdDLFNBQTRDLEVBQzVDLFNBQWtCLEVBQ2xCLEtBQThCO1FBRTlCLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzs7Y0FFWixVQUFVLEdB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QUFvQixFQUFFLEVBQUU7WUFDMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQztDQUVGOzs7Ozs7SUFwSUMsNkJBQW1COzs7OztJQUtuQiwyQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgT2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5cclxuaW1wb3J0IHtcclxuICBnZXRFbnRpdHlJZCxcclxuICBFbnRpdHlLZXksXHJcbiAgRW50aXR5U3RvcmVcclxufSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgVmVjdG9yTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllcic7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcCc7XHJcblxyXG5pbXBvcnQgeyBGZWF0dXJlTW90aW9uIH0gZnJvbSAnLi9mZWF0dXJlLmVudW1zJztcclxuaW1wb3J0IHsgRmVhdHVyZSwgRmVhdHVyZVN0b3JlT3B0aW9ucyB9IGZyb20gJy4vZmVhdHVyZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgY29tcHV0ZU9sRmVhdHVyZXNEaWZmLCBmZWF0dXJlRnJvbU9sLCBmZWF0dXJlVG9PbCwgbW92ZVRvT2xGZWF0dXJlcyB9IGZyb20gJy4vZmVhdHVyZS51dGlscyc7XHJcblxyXG4vKipcclxuICogVGhlIGNsYXNzIGlzIGEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBhbiBFbnRpdHlTdG9yZSB0aGF0IHN0b3Jlc1xyXG4gKiBmZWF0dXJlcyBhbmQgdGhlIG1hcCBsYXllciB0byBkaXNwbGF5IHRoZW0gb24uIFN5bmNocm9uaXphdGlvblxyXG4gKiBiZXR3ZWVuIHRoZSBzdG9yZSBhbmQgdGhlIGxheWVyIGlzIGhhbmRsZWQgYnkgc3RyYXRlZ2llcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBGZWF0dXJlU3RvcmU8VCBleHRlbmRzIEZlYXR1cmUgPSBGZWF0dXJlPiBleHRlbmRzIEVudGl0eVN0b3JlPFQ+IHtcclxuXHJcbiAgLyoqXHJcbiAgICogVmVjdG9yIGxheWVyIHRvIGRpc3BsYXkgdGhlIGZlYXR1cmVzIG9uXHJcbiAgICovXHJcbiAgbGF5ZXI6IFZlY3RvckxheWVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbWFwIHRoZSBsYXllciBpcyBib3VuZCB0b1xyXG4gICAqL1xyXG4gIHJlYWRvbmx5IG1hcDogSWdvTWFwO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbGF5ZXIncyBkYXRhIHNvdXJjZVxyXG4gICAqL1xyXG4gIGdldCBzb3VyY2UoKTogRmVhdHVyZURhdGFTb3VyY2Uge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXIgPyB0aGlzLmxheWVyLmRhdGFTb3VyY2UgYXMgRmVhdHVyZURhdGFTb3VyY2UgOiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihlbnRpdGllczogVFtdLCBvcHRpb25zOiBGZWF0dXJlU3RvcmVPcHRpb25zKSB7XHJcbiAgICBzdXBlcihlbnRpdGllcywgb3B0aW9ucyk7XHJcbiAgICB0aGlzLm1hcCA9IG9wdGlvbnMubWFwO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQmluZCB0aGlzIHN0b3JlIHRvIGEgdmVjdG9yIGxheWVyXHJcbiAgICogQHBhcmFtIGxheWVyIFZlY3RvciBsYXllclxyXG4gICAqIEByZXR1cm5zIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICBiaW5kTGF5ZXIobGF5ZXI6IFZlY3RvckxheWVyKTogRmVhdHVyZVN0b3JlIHtcclxuICAgIHRoaXMubGF5ZXIgPSBsYXllcjtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBsYXllcidzIGZlYXR1cmVzIGFuZCBwZXJmb3JtIGEgbW90aW9uIHRvIG1ha2UgdGhlbSB2aXNpYmxlLiBTdHJhdGVnaWVzXHJcbiAgICogbWFrZSBleHRlbnNpdmUgdXNlIG9mIHRoYXQgbWV0aG9kLlxyXG4gICAqIEBwYXJhbSBmZWF0dXJlcyBGZWF0dXJlc1xyXG4gICAqIEBwYXJhbSBtb3Rpb24gT3B0aW9uYWw6IFRoZSB0eXBlIG9mIG1vdGlvbiB0byBwZXJmb3JtXHJcbiAgICovXHJcbiAgc2V0TGF5ZXJGZWF0dXJlcyhcclxuICAgIGZlYXR1cmVzOiBGZWF0dXJlW10sXHJcbiAgICBtb3Rpb246IEZlYXR1cmVNb3Rpb24gPSBGZWF0dXJlTW90aW9uLkRlZmF1bHQsXHJcbiAgICB2aWV3U2NhbGU/OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcclxuICAgIGFyZWFSYXRpbz86IG51bWJlcixcclxuICAgIGdldElkPzogKEZlYXR1cmUpID0+IEVudGl0eUtleVxyXG4gICkge1xyXG4gICAgZ2V0SWQgPSBnZXRJZCA/IGdldElkIDogZ2V0RW50aXR5SWQ7XHJcbiAgICB0aGlzLmNoZWNrTGF5ZXIoKTtcclxuXHJcbiAgICBjb25zdCBvbEZlYXR1cmVzID0gZmVhdHVyZXNcclxuICAgICAgLm1hcCgoZmVhdHVyZTogRmVhdHVyZSkgPT4gZmVhdHVyZVRvT2woZmVhdHVyZSwgdGhpcy5tYXAucHJvamVjdGlvbiwgZ2V0SWQpKTtcclxuICAgIHRoaXMuc2V0TGF5ZXJPbEZlYXR1cmVzKG9sRmVhdHVyZXMsIG1vdGlvbiwgdmlld1NjYWxlLCBhcmVhUmF0aW8pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBzdG9yZSdzIGZlYXR1cmVzIGZyb20gYW4gYXJyYXkgb2YgT0wgZmVhdHVyZXMuXHJcbiAgICogQHBhcmFtIG9sRmVhdHVyZXMgT2wgZmVhdHVyZXNcclxuICAgKi9cclxuICBzZXRTdG9yZU9sRmVhdHVyZXMob2xGZWF0dXJlczogT2xGZWF0dXJlW10pIHtcclxuICAgIHRoaXMuY2hlY2tMYXllcigpO1xyXG5cclxuICAgIGNvbnN0IGZlYXR1cmVzID0gb2xGZWF0dXJlcy5tYXAoKG9sRmVhdHVyZTogT2xGZWF0dXJlKSA9PiB7XHJcbiAgICAgIG9sRmVhdHVyZS5zZXQoJ19mZWF0dXJlU3RvcmUnLCB0aGlzLCB0cnVlKTtcclxuICAgICAgcmV0dXJuIGZlYXR1cmVGcm9tT2wob2xGZWF0dXJlLCB0aGlzLmxheWVyLm1hcC5wcm9qZWN0aW9uKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5sb2FkKGZlYXR1cmVzIGFzIFRbXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgYWxsIGZlYXR1cmVzIGZyb20gdGhlIGxheWVyXHJcbiAgICovXHJcbiAgY2xlYXJMYXllcigpIHtcclxuICAgIHRoaXMuY2hlY2tMYXllcigpO1xyXG4gICAgdGhpcy5zb3VyY2Uub2wuY2xlYXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIHdldGhlciBhIGxheWVyIGlzIGJvdW5kIG9yIG5vdCBhbmQgdGhyb3cgYW4gZXJyb3IgaWYgbm90LlxyXG4gICAqL1xyXG4gIHByaXZhdGUgY2hlY2tMYXllcigpIHtcclxuICAgIGlmICh0aGlzLmxheWVyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIEZlYXR1cmVTdG9yZSBpcyBub3QgYm91bmQgdG8gYSBsYXllci4nKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgbGF5ZXIncyBmZWF0dXJlcyBhbmQgcGVyZm9ybSBhIG1vdGlvbiB0byBtYWtlIHRoZW0gdmlzaWJsZS5cclxuICAgKiBAcGFyYW0gZmVhdHVyZXMgT3BlbmxheWVycyBmZWF0dXJlIG9iamVjdHNcclxuICAgKiBAcGFyYW0gbW90aW9uIE9wdGlvbmFsOiBUaGUgdHlwZSBvZiBtb3Rpb24gdG8gcGVyZm9ybVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2V0TGF5ZXJPbEZlYXR1cmVzKFxyXG4gICAgb2xGZWF0dXJlczogT2xGZWF0dXJlW10sXHJcbiAgICBtb3Rpb246IEZlYXR1cmVNb3Rpb24gPSBGZWF0dXJlTW90aW9uLkRlZmF1bHQsXHJcbiAgICB2aWV3U2NhbGU/OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcclxuICAgIGFyZWFSYXRpbz86IG51bWJlclxyXG4gICkge1xyXG4gICAgY29uc3Qgb2xTb3VyY2UgPSB0aGlzLmxheWVyLm9sLmdldFNvdXJjZSgpO1xyXG4gICAgY29uc3QgZGlmZiA9IGNvbXB1dGVPbEZlYXR1cmVzRGlmZihvbFNvdXJjZS5nZXRGZWF0dXJlcygpLCBvbEZlYXR1cmVzKTtcclxuICAgIGlmIChkaWZmLnJlbW92ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRoaXMucmVtb3ZlT2xGZWF0dXJlc0Zyb21MYXllcihkaWZmLnJlbW92ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRpZmYuYWRkLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5hZGRPbEZlYXR1cmVzVG9MYXllcihkaWZmLmFkZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRpZmYuYWRkLmxlbmd0aCA+IDApIHtcclxuICAgICAgLy8gSWYgZmVhdHVyZXMgYXJlIGFkZGVkLCBkbyBhIG1vdGlvbiB0b3dhcmQgdGhlIG5ld2x5IGFkZGVkIGZlYXR1cmVzXHJcbiAgICAgIG1vdmVUb09sRmVhdHVyZXModGhpcy5tYXAsIGRpZmYuYWRkLCBtb3Rpb24sIHZpZXdTY2FsZSwgYXJlYVJhdGlvKTtcclxuICAgIH0gZWxzZSBpZiAoZGlmZi5yZW1vdmUubGVuZ3RoID4gMCkge1xyXG4gICAgICAvLyBFbHNlLCBkbyBhIG1vdGlvbiB0b3dhcmQgYWxsIHRoZSBmZWF0dXJlc1xyXG4gICAgICBtb3ZlVG9PbEZlYXR1cmVzKHRoaXMubWFwLCBvbEZlYXR1cmVzLCBtb3Rpb24sIHZpZXdTY2FsZSwgYXJlYVJhdGlvKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBmZWF0dXJlcyB0byB0aGUgdGhlIGxheWVyXHJcbiAgICogQHBhcmFtIGZlYXR1cmVzIE9wZW5sYXllcnMgZmVhdHVyZSBvYmplY3RzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRPbEZlYXR1cmVzVG9MYXllcihvbEZlYXR1cmVzOiBPbEZlYXR1cmVbXSkge1xyXG4gICAgb2xGZWF0dXJlcy5mb3JFYWNoKChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4ge1xyXG4gICAgICBvbEZlYXR1cmUuc2V0KCdfZmVhdHVyZVN0b3JlJywgdGhpcywgdHJ1ZSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc291cmNlLm9sLmFkZEZlYXR1cmVzKG9sRmVhdHVyZXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIGZlYXR1cmVzIGZyb20gdGhlIHRoZSBsYXllclxyXG4gICAqIEBwYXJhbSBmZWF0dXJlcyBPcGVubGF5ZXJzIGZlYXR1cmUgb2JqZWN0c1xyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlT2xGZWF0dXJlc0Zyb21MYXllcihvbEZlYXR1cmVzOiBPbEZlYXR1cmVbXSkge1xyXG4gICAgb2xGZWF0dXJlcy5mb3JFYWNoKChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4ge1xyXG4gICAgICB0aGlzLnNvdXJjZS5vbC5yZW1vdmVGZWF0dXJlKG9sRmVhdHVyZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==