/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { getEntityId, EntityStore } from '@igo2/common';
import { FeatureMotion } from './feature.enums';
import { featureFromOl, featureToOl, moveToOlFeatures } from './feature.utils';
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
        /**
         * Feature store strategies responsible of synchronizing the store
         * and the layer
         */
        _this.strategies = [];
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
     * Add a strategy to this store
     * @param strategy Feature store strategy
     * @returns Feature store
     */
    /**
     * Add a strategy to this store
     * @param {?} strategy Feature store strategy
     * @param {?=} activate
     * @return {?} Feature store
     */
    FeatureStore.prototype.addStrategy = /**
     * Add a strategy to this store
     * @param {?} strategy Feature store strategy
     * @param {?=} activate
     * @return {?} Feature store
     */
    function (strategy, activate) {
        if (activate === void 0) { activate = false; }
        /** @type {?} */
        var existingStrategy = this.strategies.find((/**
         * @param {?} _strategy
         * @return {?}
         */
        function (_strategy) {
            return strategy.constructor === _strategy.constructor;
        }));
        if (existingStrategy !== undefined) {
            throw new Error('A strategy of this type already exists on that FeatureStore.');
        }
        this.strategies.push(strategy);
        strategy.bindStore(this);
        if (activate === true) {
            strategy.activate();
        }
        return this;
    };
    /**
     * Remove a strategy from this store
     * @param strategy Feature store strategy
     * @returns Feature store
     */
    /**
     * Remove a strategy from this store
     * @param {?} strategy Feature store strategy
     * @return {?} Feature store
     */
    FeatureStore.prototype.removeStrategy = /**
     * Remove a strategy from this store
     * @param {?} strategy Feature store strategy
     * @return {?} Feature store
     */
    function (strategy) {
        /** @type {?} */
        var index = this.strategies.indexOf(strategy);
        if (index >= 0) {
            this.strategies.splice(index, 1);
            strategy.unbindStore(this);
        }
        return this;
    };
    /**
     * Return strategies of a given type
     * @param type Feature store strategy class
     * @returns Strategies
     */
    /**
     * Return strategies of a given type
     * @param {?} type Feature store strategy class
     * @return {?} Strategies
     */
    FeatureStore.prototype.getStrategyOfType = /**
     * Return strategies of a given type
     * @param {?} type Feature store strategy class
     * @return {?} Strategies
     */
    function (type) {
        return this.strategies.find((/**
         * @param {?} strategy
         * @return {?}
         */
        function (strategy) {
            return strategy instanceof type;
        }));
    };
    /**
     * Activate strategies of a given type
     * @param type Feature store strategy class
     */
    /**
     * Activate strategies of a given type
     * @param {?} type Feature store strategy class
     * @return {?}
     */
    FeatureStore.prototype.activateStrategyOfType = /**
     * Activate strategies of a given type
     * @param {?} type Feature store strategy class
     * @return {?}
     */
    function (type) {
        /** @type {?} */
        var strategy = this.getStrategyOfType(type);
        if (strategy !== undefined) {
            strategy.activate();
        }
    };
    /**
     * Deactivate strategies of a given type
     * @param type Feature store strategy class
     */
    /**
     * Deactivate strategies of a given type
     * @param {?} type Feature store strategy class
     * @return {?}
     */
    FeatureStore.prototype.deactivateStrategyOfType = /**
     * Deactivate strategies of a given type
     * @param {?} type Feature store strategy class
     * @return {?}
     */
    function (type) {
        /** @type {?} */
        var strategy = this.getStrategyOfType(type);
        if (strategy !== undefined) {
            strategy.deactivate();
        }
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
        var olFeaturesMap = new Map();
        olFeatures.forEach((/**
         * @param {?} olFeature
         * @return {?}
         */
        function (olFeature) {
            olFeaturesMap.set(olFeature.getId(), olFeature);
        }));
        /** @type {?} */
        var olFeaturesToRemove = [];
        this.source.ol.forEachFeature((/**
         * @param {?} olFeature
         * @return {?}
         */
        function (olFeature) {
            /** @type {?} */
            var newOlFeature = olFeaturesMap.get(olFeature.getId());
            if (newOlFeature === undefined) {
                olFeaturesToRemove.push(olFeature);
            }
            else if (newOlFeature.get('_entityRevision') !== olFeature.get('_entityRevision')) {
                olFeaturesToRemove.push(olFeature);
            }
            else {
                olFeaturesMap.delete(newOlFeature.getId());
            }
        }));
        /** @type {?} */
        var olFeaturesToAddIds = Array.from(olFeaturesMap.keys());
        /** @type {?} */
        var olFeaturesToAdd = olFeatures.filter((/**
         * @param {?} olFeature
         * @return {?}
         */
        function (olFeature) {
            return olFeaturesToAddIds.indexOf(olFeature.getId()) >= 0;
        }));
        if (olFeaturesToRemove.length > 0) {
            this.removeOlFeaturesFromLayer(olFeaturesToRemove);
        }
        if (olFeaturesToAdd.length > 0) {
            this.addOlFeaturesToLayer(olFeaturesToAdd);
        }
        if (olFeaturesToAdd.length > 0) {
            // If features are added, do a motion toward the newly added features
            moveToOlFeatures(this.map, olFeaturesToAdd, motion, viewScale, areaRatio);
        }
        else if (olFeatures.length > 0) {
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
     * Feature store strategies responsible of synchronizing the store
     * and the layer
     * @type {?}
     */
    FeatureStore.prototype.strategies;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmVhdHVyZS9zaGFyZWQvc3RvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEVBQ0wsV0FBVyxFQUVYLFdBQVcsRUFDWixNQUFNLGNBQWMsQ0FBQztBQU10QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFaEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7OztBQVEvRTs7Ozs7OztJQUErRCx3Q0FBYztJQXlCM0Usc0JBQVksUUFBYSxFQUFFLE9BQTRCO1FBQXZELFlBQ0Usa0JBQU0sUUFBUSxFQUFFLE9BQU8sQ0FBQyxTQUV6Qjs7Ozs7UUF0QkQsZ0JBQVUsR0FBMkIsRUFBRSxDQUFDO1FBcUJ0QyxLQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7O0lBQ3pCLENBQUM7SUFQRCxzQkFBSSxnQ0FBTTtRQUhWOztXQUVHOzs7OztRQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxtQkFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBcUIsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQzdFLENBQUM7OztPQUFBO0lBT0Q7Ozs7T0FJRzs7Ozs7O0lBQ0gsZ0NBQVM7Ozs7O0lBQVQsVUFBVSxLQUFrQjtRQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gsa0NBQVc7Ozs7OztJQUFYLFVBQVksUUFBOEIsRUFBRSxRQUF5QjtRQUF6Qix5QkFBQSxFQUFBLGdCQUF5Qjs7WUFDN0QsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJOzs7O1FBQUMsVUFBQyxT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QUFVLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUN0RTtJQUNILENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7SUFDSywyQ0FBb0I7Ozs7OztJQUE1QixVQUE2QixVQUF1QjtRQUFwRCxpQkFLQztRQUpDLFVBQVUsQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQyxTQUFvQjtZQUN0QyxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxLQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0MsQ0FBQyxFQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7OztJQUNLLGdEQUF5Qjs7Ozs7O0lBQWpDLFVBQWtDLFVBQXVCO1FBQXpELGlCQUlDO1FBSEMsVUFBVSxDQUFDLE9BQU87Ozs7UUFBQyxVQUFDLFNBQW9CO1lBQ3RDLEtBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxQyxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7SUFFSCxtQkFBQztBQUFELENBQUMsQUF4T0QsQ0FBK0QsV0FBVyxHQXdPekU7Ozs7Ozs7Ozs7Ozs7O0lBbE9DLGtDQUF3Qzs7Ozs7SUFLeEMsNkJBQW1COzs7OztJQUtuQiwyQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgT2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5cclxuaW1wb3J0IHtcclxuICBnZXRFbnRpdHlJZCxcclxuICBFbnRpdHlLZXksXHJcbiAgRW50aXR5U3RvcmVcclxufSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgVmVjdG9yTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllcic7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcCc7XHJcblxyXG5pbXBvcnQgeyBGZWF0dXJlTW90aW9uIH0gZnJvbSAnLi9mZWF0dXJlLmVudW1zJztcclxuaW1wb3J0IHsgRmVhdHVyZSwgRmVhdHVyZVN0b3JlT3B0aW9ucyB9IGZyb20gJy4vZmVhdHVyZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgZmVhdHVyZUZyb21PbCwgZmVhdHVyZVRvT2wsIG1vdmVUb09sRmVhdHVyZXMgfSBmcm9tICcuL2ZlYXR1cmUudXRpbHMnO1xyXG5pbXBvcnQgeyBGZWF0dXJlU3RvcmVTdHJhdGVneSB9IGZyb20gJy4vc3RyYXRlZ2llcy9zdHJhdGVneSc7XHJcblxyXG4vKipcclxuICogVGhlIGNsYXNzIGlzIGEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBhbiBFbnRpdHlTdG9yZSB0aGF0IHN0b3Jlc1xyXG4gKiBmZWF0dXJlcyBhbmQgdGhlIG1hcCBsYXllciB0byBkaXNwbGF5IHRoZW0gb24uIFN5bmNocm9uaXphdGlvblxyXG4gKiBiZXR3ZWVuIHRoZSBzdG9yZSBhbmQgdGhlIGxheWVyIGlzIGhhbmRsZWQgYnkgc3RyYXRlZ2llcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBGZWF0dXJlU3RvcmU8VCBleHRlbmRzIEZlYXR1cmUgPSBGZWF0dXJlPiBleHRlbmRzIEVudGl0eVN0b3JlPFQ+IHtcclxuXHJcbiAgLyoqXHJcbiAgICogRmVhdHVyZSBzdG9yZSBzdHJhdGVnaWVzIHJlc3BvbnNpYmxlIG9mIHN5bmNocm9uaXppbmcgdGhlIHN0b3JlXHJcbiAgICogYW5kIHRoZSBsYXllclxyXG4gICAqL1xyXG4gIHN0cmF0ZWdpZXM6IEZlYXR1cmVTdG9yZVN0cmF0ZWd5W10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogVmVjdG9yIGxheWVyIHRvIGRpc3BsYXkgdGhlIGZlYXR1cmVzIG9uXHJcbiAgICovXHJcbiAgbGF5ZXI6IFZlY3RvckxheWVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbWFwIHRoZSBsYXllciBpcyBib3VuZCB0b1xyXG4gICAqL1xyXG4gIHJlYWRvbmx5IG1hcDogSWdvTWFwO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbGF5ZXIncyBkYXRhIHNvdXJjZVxyXG4gICAqL1xyXG4gIGdldCBzb3VyY2UoKTogRmVhdHVyZURhdGFTb3VyY2Uge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXIgPyB0aGlzLmxheWVyLmRhdGFTb3VyY2UgYXMgRmVhdHVyZURhdGFTb3VyY2UgOiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihlbnRpdGllczogVFtdLCBvcHRpb25zOiBGZWF0dXJlU3RvcmVPcHRpb25zKSB7XHJcbiAgICBzdXBlcihlbnRpdGllcywgb3B0aW9ucyk7XHJcbiAgICB0aGlzLm1hcCA9IG9wdGlvbnMubWFwO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQmluZCB0aGlzIHN0b3JlIHRvIGEgdmVjdG9yIGxheWVyXHJcbiAgICogQHBhcmFtIGxheWVyIFZlY3RvciBsYXllclxyXG4gICAqIEByZXR1cm5zIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICBiaW5kTGF5ZXIobGF5ZXI6IFZlY3RvckxheWVyKTogRmVhdHVyZVN0b3JlIHtcclxuICAgIHRoaXMubGF5ZXIgPSBsYXllcjtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGEgc3RyYXRlZ3kgdG8gdGhpcyBzdG9yZVxyXG4gICAqIEBwYXJhbSBzdHJhdGVneSBGZWF0dXJlIHN0b3JlIHN0cmF0ZWd5XHJcbiAgICogQHJldHVybnMgRmVhdHVyZSBzdG9yZVxyXG4gICAqL1xyXG4gIGFkZFN0cmF0ZWd5KHN0cmF0ZWd5OiBGZWF0dXJlU3RvcmVTdHJhdGVneSwgYWN0aXZhdGU6IGJvb2xlYW4gPSBmYWxzZSk6IEZlYXR1cmVTdG9yZSB7XHJcbiAgICBjb25zdCBleGlzdGluZ1N0cmF0ZWd5ID0gdGhpcy5zdHJhdGVnaWVzLmZpbmQoKF9zdHJhdGVneTogRmVhdHVyZVN0b3JlU3RyYXRlZ3kpID0+IHtcclxuICAgICAgcmV0dXJuIHN0cmF0ZWd5LmNvbnN0cnVjdG9yID09PSBfc3RyYXRlZ3kuY29uc3RydWN0b3I7XHJcbiAgICB9KTtcclxuICAgIGlmIChleGlzdGluZ1N0cmF0ZWd5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBIHN0cmF0ZWd5IG9mIHRoaXMgdHlwZSBhbHJlYWR5IGV4aXN0cyBvbiB0aGF0IEZlYXR1cmVTdG9yZS4nKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnN0cmF0ZWdpZXMucHVzaChzdHJhdGVneSk7XHJcbiAgICBzdHJhdGVneS5iaW5kU3RvcmUodGhpcyk7XHJcblxyXG4gICAgaWYgKGFjdGl2YXRlID09PSB0cnVlKSB7XHJcbiAgICAgIHN0cmF0ZWd5LmFjdGl2YXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgYSBzdHJhdGVneSBmcm9tIHRoaXMgc3RvcmVcclxuICAgKiBAcGFyYW0gc3RyYXRlZ3kgRmVhdHVyZSBzdG9yZSBzdHJhdGVneVxyXG4gICAqIEByZXR1cm5zIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICByZW1vdmVTdHJhdGVneShzdHJhdGVneTogRmVhdHVyZVN0b3JlU3RyYXRlZ3kpOiBGZWF0dXJlU3RvcmUge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnN0cmF0ZWdpZXMuaW5kZXhPZihzdHJhdGVneSk7XHJcbiAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICB0aGlzLnN0cmF0ZWdpZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgc3RyYXRlZ3kudW5iaW5kU3RvcmUodGhpcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiBzdHJhdGVnaWVzIG9mIGEgZ2l2ZW4gdHlwZVxyXG4gICAqIEBwYXJhbSB0eXBlIEZlYXR1cmUgc3RvcmUgc3RyYXRlZ3kgY2xhc3NcclxuICAgKiBAcmV0dXJucyBTdHJhdGVnaWVzXHJcbiAgICovXHJcbiAgZ2V0U3RyYXRlZ3lPZlR5cGUodHlwZTogdHlwZW9mIEZlYXR1cmVTdG9yZVN0cmF0ZWd5KTogRmVhdHVyZVN0b3JlU3RyYXRlZ3kge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RyYXRlZ2llcy5maW5kKChzdHJhdGVneTogRmVhdHVyZVN0b3JlU3RyYXRlZ3kpID0+IHtcclxuICAgICAgcmV0dXJuIHN0cmF0ZWd5IGluc3RhbmNlb2YgdHlwZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWN0aXZhdGUgc3RyYXRlZ2llcyBvZiBhIGdpdmVuIHR5cGVcclxuICAgKiBAcGFyYW0gdHlwZSBGZWF0dXJlIHN0b3JlIHN0cmF0ZWd5IGNsYXNzXHJcbiAgICovXHJcbiAgYWN0aXZhdGVTdHJhdGVneU9mVHlwZSh0eXBlOiB0eXBlb2YgRmVhdHVyZVN0b3JlU3RyYXRlZ3kpIHtcclxuICAgIGNvbnN0IHN0cmF0ZWd5ID0gdGhpcy5nZXRTdHJhdGVneU9mVHlwZSh0eXBlKTtcclxuICAgIGlmIChzdHJhdGVneSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHN0cmF0ZWd5LmFjdGl2YXRlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWFjdGl2YXRlIHN0cmF0ZWdpZXMgb2YgYSBnaXZlbiB0eXBlXHJcbiAgICogQHBhcmFtIHR5cGUgRmVhdHVyZSBzdG9yZSBzdHJhdGVneSBjbGFzc1xyXG4gICAqL1xyXG4gIGRlYWN0aXZhdGVTdHJhdGVneU9mVHlwZSh0eXBlOiB0eXBlb2YgRmVhdHVyZVN0b3JlU3RyYXRlZ3kpIHtcclxuICAgIGNvbnN0IHN0cmF0ZWd5ID0gdGhpcy5nZXRTdHJhdGVneU9mVHlwZSh0eXBlKTtcclxuICAgIGlmIChzdHJhdGVneSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHN0cmF0ZWd5LmRlYWN0aXZhdGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgbGF5ZXIncyBmZWF0dXJlcyBhbmQgcGVyZm9ybSBhIG1vdGlvbiB0byBtYWtlIHRoZW0gdmlzaWJsZS4gU3RyYXRlZ2llc1xyXG4gICAqIG1ha2UgZXh0ZW5zaXZlIHVzZSBvZiB0aGF0IG1ldGhvZC5cclxuICAgKiBAcGFyYW0gZmVhdHVyZXMgRmVhdHVyZXNcclxuICAgKiBAcGFyYW0gbW90aW9uIE9wdGlvbmFsOiBUaGUgdHlwZSBvZiBtb3Rpb24gdG8gcGVyZm9ybVxyXG4gICAqL1xyXG4gIHNldExheWVyRmVhdHVyZXMoXHJcbiAgICBmZWF0dXJlczogRmVhdHVyZVtdLFxyXG4gICAgbW90aW9uOiBGZWF0dXJlTW90aW9uID0gRmVhdHVyZU1vdGlvbi5EZWZhdWx0LFxyXG4gICAgdmlld1NjYWxlPzogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sXHJcbiAgICBhcmVhUmF0aW8/OiBudW1iZXIsXHJcbiAgICBnZXRJZD86IChGZWF0dXJlKSA9PiBFbnRpdHlLZXlcclxuICApIHtcclxuICAgIGdldElkID0gZ2V0SWQgPyBnZXRJZCA6IGdldEVudGl0eUlkO1xyXG4gICAgdGhpcy5jaGVja0xheWVyKCk7XHJcblxyXG4gICAgY29uc3Qgb2xGZWF0dXJlcyA9IGZlYXR1cmVzXHJcbiAgICAgIC5tYXAoKGZlYXR1cmU6IEZlYXR1cmUpID0+IGZlYXR1cmVUb09sKGZlYXR1cmUsIHRoaXMubWFwLnByb2plY3Rpb24sIGdldElkKSk7XHJcbiAgICB0aGlzLnNldExheWVyT2xGZWF0dXJlcyhvbEZlYXR1cmVzLCBtb3Rpb24sIHZpZXdTY2FsZSwgYXJlYVJhdGlvKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgc3RvcmUncyBmZWF0dXJlcyBmcm9tIGFuIGFycmF5IG9mIE9MIGZlYXR1cmVzLlxyXG4gICAqIEBwYXJhbSBvbEZlYXR1cmVzIE9sIGZlYXR1cmVzXHJcbiAgICovXHJcbiAgc2V0U3RvcmVPbEZlYXR1cmVzKG9sRmVhdHVyZXM6IE9sRmVhdHVyZVtdKSB7XHJcbiAgICB0aGlzLmNoZWNrTGF5ZXIoKTtcclxuXHJcbiAgICBjb25zdCBmZWF0dXJlcyA9IG9sRmVhdHVyZXMubWFwKChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4ge1xyXG4gICAgICBvbEZlYXR1cmUuc2V0KCdfZmVhdHVyZVN0b3JlJywgdGhpcywgdHJ1ZSk7XHJcbiAgICAgIHJldHVybiBmZWF0dXJlRnJvbU9sKG9sRmVhdHVyZSwgdGhpcy5sYXllci5tYXAucHJvamVjdGlvbik7XHJcbiAgICB9KTtcclxuICAgIHRoaXMubG9hZChmZWF0dXJlcyBhcyBUW10pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIGFsbCBmZWF0dXJlcyBmcm9tIHRoZSBsYXllclxyXG4gICAqL1xyXG4gIGNsZWFyTGF5ZXIoKSB7XHJcbiAgICB0aGlzLmNoZWNrTGF5ZXIoKTtcclxuICAgIHRoaXMuc291cmNlLm9sLmNsZWFyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayB3ZXRoZXIgYSBsYXllciBpcyBib3VuZCBvciBub3QgYW5kIHRocm93IGFuIGVycm9yIGlmIG5vdC5cclxuICAgKi9cclxuICBwcml2YXRlIGNoZWNrTGF5ZXIoKSB7XHJcbiAgICBpZiAodGhpcy5sYXllciA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBGZWF0dXJlU3RvcmUgaXMgbm90IGJvdW5kIHRvIGEgbGF5ZXIuJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIGxheWVyJ3MgZmVhdHVyZXMgYW5kIHBlcmZvcm0gYSBtb3Rpb24gdG8gbWFrZSB0aGVtIHZpc2libGUuXHJcbiAgICogQHBhcmFtIGZlYXR1cmVzIE9wZW5sYXllcnMgZmVhdHVyZSBvYmplY3RzXHJcbiAgICogQHBhcmFtIG1vdGlvbiBPcHRpb25hbDogVGhlIHR5cGUgb2YgbW90aW9uIHRvIHBlcmZvcm1cclxuICAgKi9cclxuICBwcml2YXRlIHNldExheWVyT2xGZWF0dXJlcyhcclxuICAgIG9sRmVhdHVyZXM6IE9sRmVhdHVyZVtdLFxyXG4gICAgbW90aW9uOiBGZWF0dXJlTW90aW9uID0gRmVhdHVyZU1vdGlvbi5EZWZhdWx0LFxyXG4gICAgdmlld1NjYWxlPzogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sXHJcbiAgICBhcmVhUmF0aW8/OiBudW1iZXJcclxuICApIHtcclxuICAgIGNvbnN0IG9sRmVhdHVyZXNNYXAgPSBuZXcgTWFwKCk7XHJcbiAgICBvbEZlYXR1cmVzLmZvckVhY2goKG9sRmVhdHVyZTogT2xGZWF0dXJlKSA9PiB7XHJcbiAgICAgIG9sRmVhdHVyZXNNYXAuc2V0KG9sRmVhdHVyZS5nZXRJZCgpLCBvbEZlYXR1cmUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3Qgb2xGZWF0dXJlc1RvUmVtb3ZlID0gW107XHJcbiAgICB0aGlzLnNvdXJjZS5vbC5mb3JFYWNoRmVhdHVyZSgob2xGZWF0dXJlOiBPbEZlYXR1cmUpID0+IHtcclxuICAgICAgY29uc3QgbmV3T2xGZWF0dXJlID0gb2xGZWF0dXJlc01hcC5nZXQob2xGZWF0dXJlLmdldElkKCkpO1xyXG4gICAgICBpZiAobmV3T2xGZWF0dXJlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBvbEZlYXR1cmVzVG9SZW1vdmUucHVzaChvbEZlYXR1cmUpO1xyXG4gICAgICB9IGVsc2UgaWYgKG5ld09sRmVhdHVyZS5nZXQoJ19lbnRpdHlSZXZpc2lvbicpICE9PSBvbEZlYXR1cmUuZ2V0KCdfZW50aXR5UmV2aXNpb24nKSkge1xyXG4gICAgICAgIG9sRmVhdHVyZXNUb1JlbW92ZS5wdXNoKG9sRmVhdHVyZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgb2xGZWF0dXJlc01hcC5kZWxldGUobmV3T2xGZWF0dXJlLmdldElkKCkpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBvbEZlYXR1cmVzVG9BZGRJZHMgPSBBcnJheS5mcm9tKG9sRmVhdHVyZXNNYXAua2V5cygpKTtcclxuICAgIGNvbnN0IG9sRmVhdHVyZXNUb0FkZCA9IG9sRmVhdHVyZXMuZmlsdGVyKChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4ge1xyXG4gICAgICByZXR1cm4gb2xGZWF0dXJlc1RvQWRkSWRzLmluZGV4T2Yob2xGZWF0dXJlLmdldElkKCkpID49IDA7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAob2xGZWF0dXJlc1RvUmVtb3ZlLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5yZW1vdmVPbEZlYXR1cmVzRnJvbUxheWVyKG9sRmVhdHVyZXNUb1JlbW92ZSk7XHJcbiAgICB9XHJcbiAgICBpZiAob2xGZWF0dXJlc1RvQWRkLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5hZGRPbEZlYXR1cmVzVG9MYXllcihvbEZlYXR1cmVzVG9BZGQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvbEZlYXR1cmVzVG9BZGQubGVuZ3RoID4gMCkge1xyXG4gICAgICAvLyBJZiBmZWF0dXJlcyBhcmUgYWRkZWQsIGRvIGEgbW90aW9uIHRvd2FyZCB0aGUgbmV3bHkgYWRkZWQgZmVhdHVyZXNcclxuICAgICAgbW92ZVRvT2xGZWF0dXJlcyh0aGlzLm1hcCwgb2xGZWF0dXJlc1RvQWRkLCBtb3Rpb24sIHZpZXdTY2FsZSwgYXJlYVJhdGlvKTtcclxuICAgIH0gZWxzZSBpZiAob2xGZWF0dXJlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIC8vIEVsc2UsIGRvIGEgbW90aW9uIHRvd2FyZCBhbGwgdGhlIGZlYXR1cmVzXHJcbiAgICAgIG1vdmVUb09sRmVhdHVyZXModGhpcy5tYXAsIG9sRmVhdHVyZXMsIG1vdGlvbiwgdmlld1NjYWxlLCBhcmVhUmF0aW8pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGZlYXR1cmVzIHRvIHRoZSB0aGUgbGF5ZXJcclxuICAgKiBAcGFyYW0gZmVhdHVyZXMgT3BlbmxheWVycyBmZWF0dXJlIG9iamVjdHNcclxuICAgKi9cclxuICBwcml2YXRlIGFkZE9sRmVhdHVyZXNUb0xheWVyKG9sRmVhdHVyZXM6IE9sRmVhdHVyZVtdKSB7XHJcbiAgICBvbEZlYXR1cmVzLmZvckVhY2goKG9sRmVhdHVyZTogT2xGZWF0dXJlKSA9PiB7XHJcbiAgICAgIG9sRmVhdHVyZS5zZXQoJ19mZWF0dXJlU3RvcmUnLCB0aGlzLCB0cnVlKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zb3VyY2Uub2wuYWRkRmVhdHVyZXMob2xGZWF0dXJlcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgZmVhdHVyZXMgZnJvbSB0aGUgdGhlIGxheWVyXHJcbiAgICogQHBhcmFtIGZlYXR1cmVzIE9wZW5sYXllcnMgZmVhdHVyZSBvYmplY3RzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZW1vdmVPbEZlYXR1cmVzRnJvbUxheWVyKG9sRmVhdHVyZXM6IE9sRmVhdHVyZVtdKSB7XHJcbiAgICBvbEZlYXR1cmVzLmZvckVhY2goKG9sRmVhdHVyZTogT2xGZWF0dXJlKSA9PiB7XHJcbiAgICAgIHRoaXMuc291cmNlLm9sLnJlbW92ZUZlYXR1cmUob2xGZWF0dXJlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbn1cclxuIl19