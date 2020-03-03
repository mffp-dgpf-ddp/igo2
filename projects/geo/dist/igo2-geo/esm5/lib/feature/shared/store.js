/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { getEntityId, EntityStore } from '@igo2/common';
import { FeatureMotion } from './feature.enums';
import { computeOlFeaturesDiff, featureFromOl, featureToOl, moveToOlFeatures } from './feature.utils';
/**
 * The class is a specialized version of an EntityStore that stores
 * features and the map layer to display them on. Synchronization
 * between the store and the layer is handled by strategies.
 * @template T
 */
var /**
 * The class is a specialized version of an EntityStore that stores
 * features and the map layer to display them on. Synchronization
 * between the store and the layer is handled by strategies.
 * @template T
 */
FeatureStore = /** @class */ (function (_super) {
    tslib_1.__extends(FeatureStore, _super);
    function FeatureStore(entities, options) {
        var _this = _super.call(this, entities, options) || this;
        _this.map = options.map;
        return _this;
    }
    Object.defineProperty(FeatureStore.prototype, "source", {
        /**
         * The layer's data source
         */
        get: /**
         * The layer's data source
         * @return {?}
         */
        function () {
            return this.layer ? (/** @type {?} */ (this.layer.dataSource)) : undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Bind this store to a vector layer
     * @param layer Vector layer
     * @returns Feature store
     */
    /**
     * Bind this store to a vector layer
     * @param {?} layer Vector layer
     * @return {?} Feature store
     */
    FeatureStore.prototype.bindLayer = /**
     * Bind this store to a vector layer
     * @param {?} layer Vector layer
     * @return {?} Feature store
     */
    function (layer) {
        this.layer = layer;
        return this;
    };
    /**
     * Set the layer's features and perform a motion to make them visible. Strategies
     * make extensive use of that method.
     * @param features Features
     * @param motion Optional: The type of motion to perform
     */
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
    FeatureStore.prototype.setLayerFeatures = /**
     * Set the layer's features and perform a motion to make them visible. Strategies
     * make extensive use of that method.
     * @param {?} features Features
     * @param {?=} motion Optional: The type of motion to perform
     * @param {?=} viewScale
     * @param {?=} areaRatio
     * @param {?=} getId
     * @return {?}
     */
    function (features, motion, viewScale, areaRatio, getId) {
        var _this = this;
        if (motion === void 0) { motion = FeatureMotion.Default; }
        getId = getId ? getId : getEntityId;
        this.checkLayer();
        /** @type {?} */
        var olFeatures = features
            .map((/**
         * @param {?} feature
         * @return {?}
         */
        function (feature) { return featureToOl(feature, _this.map.projection, getId); }));
        this.setLayerOlFeatures(olFeatures, motion, viewScale, areaRatio);
    };
    /**
     * Set the store's features from an array of OL features.
     * @param olFeatures Ol features
     */
    /**
     * Set the store's features from an array of OL features.
     * @param {?} olFeatures Ol features
     * @return {?}
     */
    FeatureStore.prototype.setStoreOlFeatures = /**
     * Set the store's features from an array of OL features.
     * @param {?} olFeatures Ol features
     * @return {?}
     */
    function (olFeatures) {
        var _this = this;
        this.checkLayer();
        /** @type {?} */
        var features = olFeatures.map((/**
         * @param {?} olFeature
         * @return {?}
         */
        function (olFeature) {
            olFeature.set('_featureStore', _this, true);
            return featureFromOl(olFeature, _this.layer.map.projection);
        }));
        this.load((/** @type {?} */ (features)));
    };
    /**
     * Remove all features from the layer
     */
    /**
     * Remove all features from the layer
     * @return {?}
     */
    FeatureStore.prototype.clearLayer = /**
     * Remove all features from the layer
     * @return {?}
     */
    function () {
        this.checkLayer();
        this.source.ol.clear();
    };
    /**
     * Check wether a layer is bound or not and throw an error if not.
     */
    /**
     * Check wether a layer is bound or not and throw an error if not.
     * @private
     * @return {?}
     */
    FeatureStore.prototype.checkLayer = /**
     * Check wether a layer is bound or not and throw an error if not.
     * @private
     * @return {?}
     */
    function () {
        if (this.layer === undefined) {
            throw new Error('This FeatureStore is not bound to a layer.');
        }
    };
    /**
     * Set the layer's features and perform a motion to make them visible.
     * @param features Openlayers feature objects
     * @param motion Optional: The type of motion to perform
     */
    /**
     * Set the layer's features and perform a motion to make them visible.
     * @private
     * @param {?} olFeatures
     * @param {?=} motion Optional: The type of motion to perform
     * @param {?=} viewScale
     * @param {?=} areaRatio
     * @return {?}
     */
    FeatureStore.prototype.setLayerOlFeatures = /**
     * Set the layer's features and perform a motion to make them visible.
     * @private
     * @param {?} olFeatures
     * @param {?=} motion Optional: The type of motion to perform
     * @param {?=} viewScale
     * @param {?=} areaRatio
     * @return {?}
     */
    function (olFeatures, motion, viewScale, areaRatio) {
        if (motion === void 0) { motion = FeatureMotion.Default; }
        /** @type {?} */
        var olSource = this.layer.ol.getSource();
        /** @type {?} */
        var diff = computeOlFeaturesDiff(olSource.getFeatures(), olFeatures);
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
    };
    /**
     * Add features to the the layer
     * @param features Openlayers feature objects
     */
    /**
     * Add features to the the layer
     * @private
     * @param {?} olFeatures
     * @return {?}
     */
    FeatureStore.prototype.addOlFeaturesToLayer = /**
     * Add features to the the layer
     * @private
     * @param {?} olFeatures
     * @return {?}
     */
    function (olFeatures) {
        var _this = this;
        olFeatures.forEach((/**
         * @param {?} olFeature
         * @return {?}
         */
        function (olFeature) {
            olFeature.set('_featureStore', _this, true);
        }));
        this.source.ol.addFeatures(olFeatures);
    };
    /**
     * Remove features from the the layer
     * @param features Openlayers feature objects
     */
    /**
     * Remove features from the the layer
     * @private
     * @param {?} olFeatures
     * @return {?}
     */
    FeatureStore.prototype.removeOlFeaturesFromLayer = /**
     * Remove features from the the layer
     * @private
     * @param {?} olFeatures
     * @return {?}
     */
    function (olFeatures) {
        var _this = this;
        olFeatures.forEach((/**
         * @param {?} olFeature
         * @return {?}
         */
        function (olFeature) {
            _this.source.ol.removeFeature(olFeature);
        }));
    };
    return FeatureStore;
}(EntityStore));
/**
 * The class is a specialized version of an EntityStore that stores
 * features and the map layer to display them on. Synchronization
 * between the store and the layer is handled by strategies.
 * @template T
 */
export { FeatureStore };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmVhdHVyZS9zaGFyZWQvc3RvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEVBQ0wsV0FBVyxFQUVYLFdBQVcsRUFDWixNQUFNLGNBQWMsQ0FBQztBQU10QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFaEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7OztBQU90Rzs7Ozs7OztJQUErRCx3Q0FBYztJQW1CM0Usc0JBQVksUUFBYSxFQUFFLE9BQTRCO1FBQXZELFlBQ0Usa0JBQU0sUUFBUSxFQUFFLE9BQU8sQ0FBQyxTQUV6QjtRQURDLEtBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQzs7SUFDekIsQ0FBQztJQVBELHNCQUFJLGdDQUFNO1FBSFY7O1dBRUc7Ozs7O1FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLG1CQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFxQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDN0UsQ0FBQzs7O09BQUE7SUFPRDs7OztPQUlHOzs7Ozs7SUFDSCxnQ0FBUzs7Ozs7SUFBVCxVQUFVLEtBQWtCO1FBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7OztPQUtHOzs7Ozs7Ozs7OztJQUNILHVDQUFnQjs7Ozs7Ozs7OztJQUFoQixVQUNFLFFBQW1CLEVBQ25CLE1BQTZDLEVBQzdDLFNBQTRDLEVBQzVDLFNBQWtCLEVBQ2xCLEtBQThCO1FBTGhDLGlCQWFDO1FBWEMsdUJBQUEsRUFBQSxTQUF3QixhQUFhLENBQUMsT0FBTztRQUs3QyxL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QUFVLENBQUMsT0FBTzs7OztRQUFDLFVBQUMsU0FBb0I7WUFDdEMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsS0FBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdDLENBQUMsRUFBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7SUFDSyxnREFBeUI7Ozs7OztJQUFqQyxVQUFrQyxVQUF1QjtRQUF6RCxpQkFJQztRQUhDLFVBQVUsQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQyxTQUFvQjtZQUN0QyxLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDO0lBRUgsbUJBQUM7QUFBRCxDQUFDLEFBeklELENBQStELFdBQVcsR0F5SXpFOzs7Ozs7Ozs7Ozs7O0lBcElDLDZCQUFtQjs7Ozs7SUFLbkIsMkJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuXHJcbmltcG9ydCB7XHJcbiAgZ2V0RW50aXR5SWQsXHJcbiAgRW50aXR5S2V5LFxyXG4gIEVudGl0eVN0b3JlXHJcbn0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IEZlYXR1cmVEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IFZlY3RvckxheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXInO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZU1vdGlvbiB9IGZyb20gJy4vZmVhdHVyZS5lbnVtcyc7XHJcbmltcG9ydCB7IEZlYXR1cmUsIEZlYXR1cmVTdG9yZU9wdGlvbnMgfSBmcm9tICcuL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IGNvbXB1dGVPbEZlYXR1cmVzRGlmZiwgZmVhdHVyZUZyb21PbCwgZmVhdHVyZVRvT2wsIG1vdmVUb09sRmVhdHVyZXMgfSBmcm9tICcuL2ZlYXR1cmUudXRpbHMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBjbGFzcyBpcyBhIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYW4gRW50aXR5U3RvcmUgdGhhdCBzdG9yZXNcclxuICogZmVhdHVyZXMgYW5kIHRoZSBtYXAgbGF5ZXIgdG8gZGlzcGxheSB0aGVtIG9uLiBTeW5jaHJvbml6YXRpb25cclxuICogYmV0d2VlbiB0aGUgc3RvcmUgYW5kIHRoZSBsYXllciBpcyBoYW5kbGVkIGJ5IHN0cmF0ZWdpZXMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRmVhdHVyZVN0b3JlPFQgZXh0ZW5kcyBGZWF0dXJlID0gRmVhdHVyZT4gZXh0ZW5kcyBFbnRpdHlTdG9yZTxUPiB7XHJcblxyXG4gIC8qKlxyXG4gICAqIFZlY3RvciBsYXllciB0byBkaXNwbGF5IHRoZSBmZWF0dXJlcyBvblxyXG4gICAqL1xyXG4gIGxheWVyOiBWZWN0b3JMYXllcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG1hcCB0aGUgbGF5ZXIgaXMgYm91bmQgdG9cclxuICAgKi9cclxuICByZWFkb25seSBtYXA6IElnb01hcDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGxheWVyJ3MgZGF0YSBzb3VyY2VcclxuICAgKi9cclxuICBnZXQgc291cmNlKCk6IEZlYXR1cmVEYXRhU291cmNlIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVyID8gdGhpcy5sYXllci5kYXRhU291cmNlIGFzIEZlYXR1cmVEYXRhU291cmNlIDogdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoZW50aXRpZXM6IFRbXSwgb3B0aW9uczogRmVhdHVyZVN0b3JlT3B0aW9ucykge1xyXG4gICAgc3VwZXIoZW50aXRpZXMsIG9wdGlvbnMpO1xyXG4gICAgdGhpcy5tYXAgPSBvcHRpb25zLm1hcDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEJpbmQgdGhpcyBzdG9yZSB0byBhIHZlY3RvciBsYXllclxyXG4gICAqIEBwYXJhbSBsYXllciBWZWN0b3IgbGF5ZXJcclxuICAgKiBAcmV0dXJucyBGZWF0dXJlIHN0b3JlXHJcbiAgICovXHJcbiAgYmluZExheWVyKGxheWVyOiBWZWN0b3JMYXllcik6IEZlYXR1cmVTdG9yZSB7XHJcbiAgICB0aGlzLmxheWVyID0gbGF5ZXI7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgbGF5ZXIncyBmZWF0dXJlcyBhbmQgcGVyZm9ybSBhIG1vdGlvbiB0byBtYWtlIHRoZW0gdmlzaWJsZS4gU3RyYXRlZ2llc1xyXG4gICAqIG1ha2UgZXh0ZW5zaXZlIHVzZSBvZiB0aGF0IG1ldGhvZC5cclxuICAgKiBAcGFyYW0gZmVhdHVyZXMgRmVhdHVyZXNcclxuICAgKiBAcGFyYW0gbW90aW9uIE9wdGlvbmFsOiBUaGUgdHlwZSBvZiBtb3Rpb24gdG8gcGVyZm9ybVxyXG4gICAqL1xyXG4gIHNldExheWVyRmVhdHVyZXMoXHJcbiAgICBmZWF0dXJlczogRmVhdHVyZVtdLFxyXG4gICAgbW90aW9uOiBGZWF0dXJlTW90aW9uID0gRmVhdHVyZU1vdGlvbi5EZWZhdWx0LFxyXG4gICAgdmlld1NjYWxlPzogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sXHJcbiAgICBhcmVhUmF0aW8/OiBudW1iZXIsXHJcbiAgICBnZXRJZD86IChGZWF0dXJlKSA9PiBFbnRpdHlLZXlcclxuICApIHtcclxuICAgIGdldElkID0gZ2V0SWQgPyBnZXRJZCA6IGdldEVudGl0eUlkO1xyXG4gICAgdGhpcy5jaGVja0xheWVyKCk7XHJcblxyXG4gICAgY29uc3Qgb2xGZWF0dXJlcyA9IGZlYXR1cmVzXHJcbiAgICAgIC5tYXAoKGZlYXR1cmU6IEZlYXR1cmUpID0+IGZlYXR1cmVUb09sKGZlYXR1cmUsIHRoaXMubWFwLnByb2plY3Rpb24sIGdldElkKSk7XHJcbiAgICB0aGlzLnNldExheWVyT2xGZWF0dXJlcyhvbEZlYXR1cmVzLCBtb3Rpb24sIHZpZXdTY2FsZSwgYXJlYVJhdGlvKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgc3RvcmUncyBmZWF0dXJlcyBmcm9tIGFuIGFycmF5IG9mIE9MIGZlYXR1cmVzLlxyXG4gICAqIEBwYXJhbSBvbEZlYXR1cmVzIE9sIGZlYXR1cmVzXHJcbiAgICovXHJcbiAgc2V0U3RvcmVPbEZlYXR1cmVzKG9sRmVhdHVyZXM6IE9sRmVhdHVyZVtdKSB7XHJcbiAgICB0aGlzLmNoZWNrTGF5ZXIoKTtcclxuXHJcbiAgICBjb25zdCBmZWF0dXJlcyA9IG9sRmVhdHVyZXMubWFwKChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4ge1xyXG4gICAgICBvbEZlYXR1cmUuc2V0KCdfZmVhdHVyZVN0b3JlJywgdGhpcywgdHJ1ZSk7XHJcbiAgICAgIHJldHVybiBmZWF0dXJlRnJvbU9sKG9sRmVhdHVyZSwgdGhpcy5sYXllci5tYXAucHJvamVjdGlvbik7XHJcbiAgICB9KTtcclxuICAgIHRoaXMubG9hZChmZWF0dXJlcyBhcyBUW10pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIGFsbCBmZWF0dXJlcyBmcm9tIHRoZSBsYXllclxyXG4gICAqL1xyXG4gIGNsZWFyTGF5ZXIoKSB7XHJcbiAgICB0aGlzLmNoZWNrTGF5ZXIoKTtcclxuICAgIHRoaXMuc291cmNlLm9sLmNsZWFyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayB3ZXRoZXIgYSBsYXllciBpcyBib3VuZCBvciBub3QgYW5kIHRocm93IGFuIGVycm9yIGlmIG5vdC5cclxuICAgKi9cclxuICBwcml2YXRlIGNoZWNrTGF5ZXIoKSB7XHJcbiAgICBpZiAodGhpcy5sYXllciA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBGZWF0dXJlU3RvcmUgaXMgbm90IGJvdW5kIHRvIGEgbGF5ZXIuJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIGxheWVyJ3MgZmVhdHVyZXMgYW5kIHBlcmZvcm0gYSBtb3Rpb24gdG8gbWFrZSB0aGVtIHZpc2libGUuXHJcbiAgICogQHBhcmFtIGZlYXR1cmVzIE9wZW5sYXllcnMgZmVhdHVyZSBvYmplY3RzXHJcbiAgICogQHBhcmFtIG1vdGlvbiBPcHRpb25hbDogVGhlIHR5cGUgb2YgbW90aW9uIHRvIHBlcmZvcm1cclxuICAgKi9cclxuICBwcml2YXRlIHNldExheWVyT2xGZWF0dXJlcyhcclxuICAgIG9sRmVhdHVyZXM6IE9sRmVhdHVyZVtdLFxyXG4gICAgbW90aW9uOiBGZWF0dXJlTW90aW9uID0gRmVhdHVyZU1vdGlvbi5EZWZhdWx0LFxyXG4gICAgdmlld1NjYWxlPzogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sXHJcbiAgICBhcmVhUmF0aW8/OiBudW1iZXJcclxuICApIHtcclxuICAgIGNvbnN0IG9sU291cmNlID0gdGhpcy5sYXllci5vbC5nZXRTb3VyY2UoKTtcclxuICAgIGNvbnN0IGRpZmYgPSBjb21wdXRlT2xGZWF0dXJlc0RpZmYob2xTb3VyY2UuZ2V0RmVhdHVyZXMoKSwgb2xGZWF0dXJlcyk7XHJcbiAgICBpZiAoZGlmZi5yZW1vdmUubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aGlzLnJlbW92ZU9sRmVhdHVyZXNGcm9tTGF5ZXIoZGlmZi5yZW1vdmUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkaWZmLmFkZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRoaXMuYWRkT2xGZWF0dXJlc1RvTGF5ZXIoZGlmZi5hZGQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkaWZmLmFkZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIC8vIElmIGZlYXR1cmVzIGFyZSBhZGRlZCwgZG8gYSBtb3Rpb24gdG93YXJkIHRoZSBuZXdseSBhZGRlZCBmZWF0dXJlc1xyXG4gICAgICBtb3ZlVG9PbEZlYXR1cmVzKHRoaXMubWFwLCBkaWZmLmFkZCwgbW90aW9uLCB2aWV3U2NhbGUsIGFyZWFSYXRpbyk7XHJcbiAgICB9IGVsc2UgaWYgKGRpZmYucmVtb3ZlLmxlbmd0aCA+IDApIHtcclxuICAgICAgLy8gRWxzZSwgZG8gYSBtb3Rpb24gdG93YXJkIGFsbCB0aGUgZmVhdHVyZXNcclxuICAgICAgbW92ZVRvT2xGZWF0dXJlcyh0aGlzLm1hcCwgb2xGZWF0dXJlcywgbW90aW9uLCB2aWV3U2NhbGUsIGFyZWFSYXRpbyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgZmVhdHVyZXMgdG8gdGhlIHRoZSBsYXllclxyXG4gICAqIEBwYXJhbSBmZWF0dXJlcyBPcGVubGF5ZXJzIGZlYXR1cmUgb2JqZWN0c1xyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkT2xGZWF0dXJlc1RvTGF5ZXIob2xGZWF0dXJlczogT2xGZWF0dXJlW10pIHtcclxuICAgIG9sRmVhdHVyZXMuZm9yRWFjaCgob2xGZWF0dXJlOiBPbEZlYXR1cmUpID0+IHtcclxuICAgICAgb2xGZWF0dXJlLnNldCgnX2ZlYXR1cmVTdG9yZScsIHRoaXMsIHRydWUpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNvdXJjZS5vbC5hZGRGZWF0dXJlcyhvbEZlYXR1cmVzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBmZWF0dXJlcyBmcm9tIHRoZSB0aGUgbGF5ZXJcclxuICAgKiBAcGFyYW0gZmVhdHVyZXMgT3BlbmxheWVycyBmZWF0dXJlIG9iamVjdHNcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZU9sRmVhdHVyZXNGcm9tTGF5ZXIob2xGZWF0dXJlczogT2xGZWF0dXJlW10pIHtcclxuICAgIG9sRmVhdHVyZXMuZm9yRWFjaCgob2xGZWF0dXJlOiBPbEZlYXR1cmUpID0+IHtcclxuICAgICAgdGhpcy5zb3VyY2Uub2wucmVtb3ZlRmVhdHVyZShvbEZlYXR1cmUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=