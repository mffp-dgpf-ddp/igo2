/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { getEntityId, EntityStore } from '@igo2/common';
import { FeatureMotion } from './feature.enums';
import { featureFromOl, featureToOl, moveToOlFeatures } from './feature.utils';
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
        /**
         * Feature store strategies responsible of synchronizing the store
         * and the layer
         */
        this.strategies = [];
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
     * Add a strategy to this store
     * @param {?} strategy Feature store strategy
     * @param {?=} activate
     * @return {?} Feature store
     */
    addStrategy(strategy, activate = false) {
        /** @type {?} */
        const existingStrategy = this.strategies.find((/**
         * @param {?} _strategy
         * @return {?}
         */
        (_strategy) => {
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
    }
    /**
     * Remove a strategy from this store
     * @param {?} strategy Feature store strategy
     * @return {?} Feature store
     */
    removeStrategy(strategy) {
        /** @type {?} */
        const index = this.strategies.indexOf(strategy);
        if (index >= 0) {
            this.strategies.splice(index, 1);
            strategy.unbindStore(this);
        }
        return this;
    }
    /**
     * Return strategies of a given type
     * @param {?} type Feature store strategy class
     * @return {?} Strategies
     */
    getStrategyOfType(type) {
        return this.strategies.find((/**
         * @param {?} strategy
         * @return {?}
         */
        (strategy) => {
            return strategy instanceof type;
        }));
    }
    /**
     * Activate strategies of a given type
     * @param {?} type Feature store strategy class
     * @return {?}
     */
    activateStrategyOfType(type) {
        /** @type {?} */
        const strategy = this.getStrategyOfType(type);
        if (strategy !== undefined) {
            strategy.activate();
        }
    }
    /**
     * Deactivate strategies of a given type
     * @param {?} type Feature store strategy class
     * @return {?}
     */
    deactivateStrategyOfType(type) {
        /** @type {?} */
        const strategy = this.getStrategyOfType(type);
        if (strategy !== undefined) {
            strategy.deactivate();
        }
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
        const olFeaturesMap = new Map();
        olFeatures.forEach((/**
         * @param {?} olFeature
         * @return {?}
         */
        (olFeature) => {
            olFeaturesMap.set(olFeature.getId(), olFeature);
        }));
        /** @type {?} */
        const olFeaturesToRemove = [];
        this.source.ol.forEachFeature((/**
         * @param {?} olFeature
         * @return {?}
         */
        (olFeature) => {
            /** @type {?} */
            const newOlFeature = olFeaturesMap.get(olFeature.getId());
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
        const olFeaturesToAddIds = Array.from(olFeaturesMap.keys());
        /** @type {?} */
        const olFeaturesToAdd = olFeatures.filter((/**
         * @param {?} olFeature
         * @return {?}
         */
        (olFeature) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmVhdHVyZS9zaGFyZWQvc3RvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFDTCxXQUFXLEVBRVgsV0FBVyxFQUNaLE1BQU0sY0FBYyxDQUFDO0FBTXRCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVoRCxPQUFPLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7O0FBUS9FLE1BQU0sT0FBTyxZQUEwQyxTQUFRLFdBQWM7Ozs7O0lBeUIzRSxZQUFZLFFBQWEsRUFBRSxPQUE0QjtRQUNyRCxLQUFLLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDOzs7OztRQXBCM0IsZUFBVSxHQUEyQixFQUFFLENBQUM7UUFxQnRDLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztJQUN6QixDQUFDOzs7OztJQVBELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsbUJBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQXFCLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUM3RSxDQUFDOzs7Ozs7SUFZRCxTQUFTLENBQUMsS0FBa0I7UUFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7Ozs7O0lBT0QsV0FBVyxDQUFDLFFBQThCLEVBQUUsV0FBb0IsS0FBSzs7Y0FDN0QsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJOzs7O1FBQUMsQ0FBQyxTQUErQixFQUFFLEVBQUU7WUFDaEYsT0FBTyxRQUFRLENBQUMsV0FBVyxLQUFLLFNBQVMsQ0FBQyxXQUFXLENBQUM7UUFDeEQsQ0FBQyxFQUFDO1FBQ0YsSUFBSSxnQkFBZ0IsS0FBSyxTQUFTLEVBQUU7WUFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyw4REFBOEQsQ0FBQyxDQUFDO1NBQ2pGO1FBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0IsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV6QixJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7WUFDckIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ3JCO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7Ozs7SUFPRCxjQUFjLENBQUMsUUFBOEI7O2NBQ3JDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDL0MsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7OztJQU9ELGlCQUFpQixDQUFDLElBQWlDO1FBQ2pELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJOzs7O1FBQUMsQ0FBQyxRQUE4QixFQUFFLEVBQUU7WUFDN0QsT0FBTyxRQUFRLFlBQVksSUFBSSxDQUFDO1FBQ2xDLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBTUQsc0JBQXNCLENBQUMsSUFBaUM7O2NBQ2hELFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDO1FBQzdDLElBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtZQUMxQixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDckI7SUFDSCxDQUFDOzs7Ozs7SUFNRCx3QkFBd0IsQ0FBQyxJQUFpQzs7Y0FDbEQsUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7UUFDN0MsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO1lBQzFCLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUN2QjtJQUNILENBQUM7Ozs7Ozs7Ozs7O0lBUUQsZ0JBQWdCLENBQ2QsUUFBbUIsRUFDbkIsU0FBd0IsYUFBYSxDQUFDLE9BQU8sRUFDN0MsU0FBNEMsRUFDNUMsU0FBa0IsRUFDbEIsS0FBOEI7UUFFOUIsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7UUFDcEMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDOztjQUVaLFVBQVUsR0FBRyxRQUFRO2FBQ3hCLEdBQUc7Ozs7UUFBQyxDQUFDLE9BQWdCLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLEVBQUM7UUFDOUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7Ozs7OztJQU1ELGtCQUFrQixDQUFDLFVBQXVCO1FBQ3hDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzs7Y0FFWixRQUFRLEdBQUcsVUFBVSxDQUFDLEdBQUc7Ozs7UUFBQyxDQUFDLFNBQW9CLEVBQUUsRUFBRTtZQUN2RCxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDM0MsT0FBTyxhQUFhLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzdELENBQUMsRUFBQztRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQUEsUUFBUSxFQUFPLENBQUMsQ0FBQztJQUM3QixDQUFDOzs7OztJQUtELFVBQVU7UUFDUixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDekIsQ0FBQzs7Ozs7O0lBS08sVUFBVTtRQUNoQixJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQztTQUMvRDtJQUNILENBQUM7Ozs7Ozs7Ozs7SUFPTyxrQkFBa0IsQ0FDeEIsVUFBdUIsRUFDdkIsU0FBd0IsYUFBYSxDQUFDLE9BQU8sRUFDN0MsU0FBNEMsRUFDNUMsU0FBa0I7O2NBRVosYUFBYSxHQUFHLElBQUksR0FBRyxFQUFFO1FBQy9CLFVBQVUsQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxTQUFvQixFQUFFLEVBQUU7WUFDMUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDbEQsQ0FBQyxFQUFDLENBQUM7O2NBRUcsa0JBQWtCLEdBQUcsRUFBRTtRQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxjQUFjOzs7O1FBQUMsQ0FBQyxTQUFvQixFQUFFLEVBQUU7O2tCQUMvQyxZQUFZLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDekQsSUFBSSxZQUFZLEtBQUssU0FBUyxFQUFFO2dCQUM5QixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDcEM7aUJBQU0sSUFBSSxZQUFZLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEtBQUssU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO2dCQUNuRixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDcEM7aUJBQU07Z0JBQ0wsYUFBYSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQzthQUM1QztRQUNILENBQUMsRUFBQyxDQUFDOztjQUVHLGtCQUFrQixHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDOztjQUNyRCxlQUFlLEdBQUcsVUFBVSxDQUFDLE1BQU07Ozs7UUFBQyxDQUFDLFNBQW9CLEVBQUUsRUFBRTtZQUNqRSxPQUFPLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUQsQ0FBQyxFQUFDO1FBRUYsSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ2pDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQ3BEO1FBQ0QsSUFBSSxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUM5QixJQUFJLENBQUMsb0JBQW9CLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDNUM7UUFFRCxJQUFJLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzlCLHFFQUFxRTtZQUNyRSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQzNFO2FBQU0sSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNoQyw0Q0FBNEM7WUFDNUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUN0RTtJQUNILENBQUM7Ozs7Ozs7SUFNTyxvQkFBb0IsQ0FBQyxVQUF1QjtRQUNsRCxVQUFVLENBQUMsT0FBTzs7OztRQUFDLENBQUMsU0FBb0IsRUFBRSxFQUFFO1lBQzFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3QyxDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6QyxDQUFDOzs7Ozs7O0lBTU8seUJBQXlCLENBQUMsVUFBdUI7UUFDdkQsVUFBVSxDQUFDLE9BQU87Ozs7UUFBQyxDQUFDLFNBQW9CLEVBQUUsRUFBRTtZQUMxQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDO0NBRUY7Ozs7Ozs7SUFsT0Msa0NBQXdDOzs7OztJQUt4Qyw2QkFBbUI7Ozs7O0lBS25CLDJCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBPbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcblxyXG5pbXBvcnQge1xyXG4gIGdldEVudGl0eUlkLFxyXG4gIEVudGl0eUtleSxcclxuICBFbnRpdHlTdG9yZVxyXG59IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBGZWF0dXJlRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBWZWN0b3JMYXllciB9IGZyb20gJy4uLy4uL2xheWVyJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuXHJcbmltcG9ydCB7IEZlYXR1cmVNb3Rpb24gfSBmcm9tICcuL2ZlYXR1cmUuZW51bXMnO1xyXG5pbXBvcnQgeyBGZWF0dXJlLCBGZWF0dXJlU3RvcmVPcHRpb25zIH0gZnJvbSAnLi9mZWF0dXJlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBmZWF0dXJlRnJvbU9sLCBmZWF0dXJlVG9PbCwgbW92ZVRvT2xGZWF0dXJlcyB9IGZyb20gJy4vZmVhdHVyZS51dGlscyc7XHJcbmltcG9ydCB7IEZlYXR1cmVTdG9yZVN0cmF0ZWd5IH0gZnJvbSAnLi9zdHJhdGVnaWVzL3N0cmF0ZWd5JztcclxuXHJcbi8qKlxyXG4gKiBUaGUgY2xhc3MgaXMgYSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGFuIEVudGl0eVN0b3JlIHRoYXQgc3RvcmVzXHJcbiAqIGZlYXR1cmVzIGFuZCB0aGUgbWFwIGxheWVyIHRvIGRpc3BsYXkgdGhlbSBvbi4gU3luY2hyb25pemF0aW9uXHJcbiAqIGJldHdlZW4gdGhlIHN0b3JlIGFuZCB0aGUgbGF5ZXIgaXMgaGFuZGxlZCBieSBzdHJhdGVnaWVzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEZlYXR1cmVTdG9yZTxUIGV4dGVuZHMgRmVhdHVyZSA9IEZlYXR1cmU+IGV4dGVuZHMgRW50aXR5U3RvcmU8VD4ge1xyXG5cclxuICAvKipcclxuICAgKiBGZWF0dXJlIHN0b3JlIHN0cmF0ZWdpZXMgcmVzcG9uc2libGUgb2Ygc3luY2hyb25pemluZyB0aGUgc3RvcmVcclxuICAgKiBhbmQgdGhlIGxheWVyXHJcbiAgICovXHJcbiAgc3RyYXRlZ2llczogRmVhdHVyZVN0b3JlU3RyYXRlZ3lbXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBWZWN0b3IgbGF5ZXIgdG8gZGlzcGxheSB0aGUgZmVhdHVyZXMgb25cclxuICAgKi9cclxuICBsYXllcjogVmVjdG9yTGF5ZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBtYXAgdGhlIGxheWVyIGlzIGJvdW5kIHRvXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgbWFwOiBJZ29NYXA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBsYXllcidzIGRhdGEgc291cmNlXHJcbiAgICovXHJcbiAgZ2V0IHNvdXJjZSgpOiBGZWF0dXJlRGF0YVNvdXJjZSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllciA/IHRoaXMubGF5ZXIuZGF0YVNvdXJjZSBhcyBGZWF0dXJlRGF0YVNvdXJjZSA6IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKGVudGl0aWVzOiBUW10sIG9wdGlvbnM6IEZlYXR1cmVTdG9yZU9wdGlvbnMpIHtcclxuICAgIHN1cGVyKGVudGl0aWVzLCBvcHRpb25zKTtcclxuICAgIHRoaXMubWFwID0gb3B0aW9ucy5tYXA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBCaW5kIHRoaXMgc3RvcmUgdG8gYSB2ZWN0b3IgbGF5ZXJcclxuICAgKiBAcGFyYW0gbGF5ZXIgVmVjdG9yIGxheWVyXHJcbiAgICogQHJldHVybnMgRmVhdHVyZSBzdG9yZVxyXG4gICAqL1xyXG4gIGJpbmRMYXllcihsYXllcjogVmVjdG9yTGF5ZXIpOiBGZWF0dXJlU3RvcmUge1xyXG4gICAgdGhpcy5sYXllciA9IGxheWVyO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYSBzdHJhdGVneSB0byB0aGlzIHN0b3JlXHJcbiAgICogQHBhcmFtIHN0cmF0ZWd5IEZlYXR1cmUgc3RvcmUgc3RyYXRlZ3lcclxuICAgKiBAcmV0dXJucyBGZWF0dXJlIHN0b3JlXHJcbiAgICovXHJcbiAgYWRkU3RyYXRlZ3koc3RyYXRlZ3k6IEZlYXR1cmVTdG9yZVN0cmF0ZWd5LCBhY3RpdmF0ZTogYm9vbGVhbiA9IGZhbHNlKTogRmVhdHVyZVN0b3JlIHtcclxuICAgIGNvbnN0IGV4aXN0aW5nU3RyYXRlZ3kgPSB0aGlzLnN0cmF0ZWdpZXMuZmluZCgoX3N0cmF0ZWd5OiBGZWF0dXJlU3RvcmVTdHJhdGVneSkgPT4ge1xyXG4gICAgICByZXR1cm4gc3RyYXRlZ3kuY29uc3RydWN0b3IgPT09IF9zdHJhdGVneS5jb25zdHJ1Y3RvcjtcclxuICAgIH0pO1xyXG4gICAgaWYgKGV4aXN0aW5nU3RyYXRlZ3kgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Egc3RyYXRlZ3kgb2YgdGhpcyB0eXBlIGFscmVhZHkgZXhpc3RzIG9uIHRoYXQgRmVhdHVyZVN0b3JlLicpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3RyYXRlZ2llcy5wdXNoKHN0cmF0ZWd5KTtcclxuICAgIHN0cmF0ZWd5LmJpbmRTdG9yZSh0aGlzKTtcclxuXHJcbiAgICBpZiAoYWN0aXZhdGUgPT09IHRydWUpIHtcclxuICAgICAgc3RyYXRlZ3kuYWN0aXZhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBhIHN0cmF0ZWd5IGZyb20gdGhpcyBzdG9yZVxyXG4gICAqIEBwYXJhbSBzdHJhdGVneSBGZWF0dXJlIHN0b3JlIHN0cmF0ZWd5XHJcbiAgICogQHJldHVybnMgRmVhdHVyZSBzdG9yZVxyXG4gICAqL1xyXG4gIHJlbW92ZVN0cmF0ZWd5KHN0cmF0ZWd5OiBGZWF0dXJlU3RvcmVTdHJhdGVneSk6IEZlYXR1cmVTdG9yZSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuc3RyYXRlZ2llcy5pbmRleE9mKHN0cmF0ZWd5KTtcclxuICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgIHRoaXMuc3RyYXRlZ2llcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICBzdHJhdGVneS51bmJpbmRTdG9yZSh0aGlzKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIHN0cmF0ZWdpZXMgb2YgYSBnaXZlbiB0eXBlXHJcbiAgICogQHBhcmFtIHR5cGUgRmVhdHVyZSBzdG9yZSBzdHJhdGVneSBjbGFzc1xyXG4gICAqIEByZXR1cm5zIFN0cmF0ZWdpZXNcclxuICAgKi9cclxuICBnZXRTdHJhdGVneU9mVHlwZSh0eXBlOiB0eXBlb2YgRmVhdHVyZVN0b3JlU3RyYXRlZ3kpOiBGZWF0dXJlU3RvcmVTdHJhdGVneSB7XHJcbiAgICByZXR1cm4gdGhpcy5zdHJhdGVnaWVzLmZpbmQoKHN0cmF0ZWd5OiBGZWF0dXJlU3RvcmVTdHJhdGVneSkgPT4ge1xyXG4gICAgICByZXR1cm4gc3RyYXRlZ3kgaW5zdGFuY2VvZiB0eXBlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBY3RpdmF0ZSBzdHJhdGVnaWVzIG9mIGEgZ2l2ZW4gdHlwZVxyXG4gICAqIEBwYXJhbSB0eXBlIEZlYXR1cmUgc3RvcmUgc3RyYXRlZ3kgY2xhc3NcclxuICAgKi9cclxuICBhY3RpdmF0ZVN0cmF0ZWd5T2ZUeXBlKHR5cGU6IHR5cGVvZiBGZWF0dXJlU3RvcmVTdHJhdGVneSkge1xyXG4gICAgY29uc3Qgc3RyYXRlZ3kgPSB0aGlzLmdldFN0cmF0ZWd5T2ZUeXBlKHR5cGUpO1xyXG4gICAgaWYgKHN0cmF0ZWd5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgc3RyYXRlZ3kuYWN0aXZhdGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlYWN0aXZhdGUgc3RyYXRlZ2llcyBvZiBhIGdpdmVuIHR5cGVcclxuICAgKiBAcGFyYW0gdHlwZSBGZWF0dXJlIHN0b3JlIHN0cmF0ZWd5IGNsYXNzXHJcbiAgICovXHJcbiAgZGVhY3RpdmF0ZVN0cmF0ZWd5T2ZUeXBlKHR5cGU6IHR5cGVvZiBGZWF0dXJlU3RvcmVTdHJhdGVneSkge1xyXG4gICAgY29uc3Qgc3RyYXRlZ3kgPSB0aGlzLmdldFN0cmF0ZWd5T2ZUeXBlKHR5cGUpO1xyXG4gICAgaWYgKHN0cmF0ZWd5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgc3RyYXRlZ3kuZGVhY3RpdmF0ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBsYXllcidzIGZlYXR1cmVzIGFuZCBwZXJmb3JtIGEgbW90aW9uIHRvIG1ha2UgdGhlbSB2aXNpYmxlLiBTdHJhdGVnaWVzXHJcbiAgICogbWFrZSBleHRlbnNpdmUgdXNlIG9mIHRoYXQgbWV0aG9kLlxyXG4gICAqIEBwYXJhbSBmZWF0dXJlcyBGZWF0dXJlc1xyXG4gICAqIEBwYXJhbSBtb3Rpb24gT3B0aW9uYWw6IFRoZSB0eXBlIG9mIG1vdGlvbiB0byBwZXJmb3JtXHJcbiAgICovXHJcbiAgc2V0TGF5ZXJGZWF0dXJlcyhcclxuICAgIGZlYXR1cmVzOiBGZWF0dXJlW10sXHJcbiAgICBtb3Rpb246IEZlYXR1cmVNb3Rpb24gPSBGZWF0dXJlTW90aW9uLkRlZmF1bHQsXHJcbiAgICB2aWV3U2NhbGU/OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcclxuICAgIGFyZWFSYXRpbz86IG51bWJlcixcclxuICAgIGdldElkPzogKEZlYXR1cmUpID0+IEVudGl0eUtleVxyXG4gICkge1xyXG4gICAgZ2V0SWQgPSBnZXRJZCA/IGdldElkIDogZ2V0RW50aXR5SWQ7XHJcbiAgICB0aGlzLmNoZWNrTGF5ZXIoKTtcclxuXHJcbiAgICBjb25zdCBvbEZlYXR1cmVzID0gZmVhdHVyZXNcclxuICAgICAgLm1hcCgoZmVhdHVyZTogRmVhdHVyZSkgPT4gZmVhdHVyZVRvT2woZmVhdHVyZSwgdGhpcy5tYXAucHJvamVjdGlvbiwgZ2V0SWQpKTtcclxuICAgIHRoaXMuc2V0TGF5ZXJPbEZlYXR1cmVzKG9sRmVhdHVyZXMsIG1vdGlvbiwgdmlld1NjYWxlLCBhcmVhUmF0aW8pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBzdG9yZSdzIGZlYXR1cmVzIGZyb20gYW4gYXJyYXkgb2YgT0wgZmVhdHVyZXMuXHJcbiAgICogQHBhcmFtIG9sRmVhdHVyZXMgT2wgZmVhdHVyZXNcclxuICAgKi9cclxuICBzZXRTdG9yZU9sRmVhdHVyZXMob2xGZWF0dXJlczogT2xGZWF0dXJlW10pIHtcclxuICAgIHRoaXMuY2hlY2tMYXllcigpO1xyXG5cclxuICAgIGNvbnN0IGZlYXR1cmVzID0gb2xGZWF0dXJlcy5tYXAoKG9sRmVhdHVyZTogT2xGZWF0dXJlKSA9PiB7XHJcbiAgICAgIG9sRmVhdHVyZS5zZXQoJ19mZWF0dXJlU3RvcmUnLCB0aGlzLCB0cnVlKTtcclxuICAgICAgcmV0dXJuIGZlYXR1cmVGcm9tT2wob2xGZWF0dXJlLCB0aGlzLmxheWVyLm1hcC5wcm9qZWN0aW9uKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5sb2FkKGZlYXR1cmVzIGFzIFRbXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgYWxsIGZlYXR1cmVzIGZyb20gdGhlIGxheWVyXHJcbiAgICovXHJcbiAgY2xlYXJMYXllcigpIHtcclxuICAgIHRoaXMuY2hlY2tMYXllcigpO1xyXG4gICAgdGhpcy5zb3VyY2Uub2wuY2xlYXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIHdldGhlciBhIGxheWVyIGlzIGJvdW5kIG9yIG5vdCBhbmQgdGhyb3cgYW4gZXJyb3IgaWYgbm90LlxyXG4gICAqL1xyXG4gIHByaXZhdGUgY2hlY2tMYXllcigpIHtcclxuICAgIGlmICh0aGlzLmxheWVyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIEZlYXR1cmVTdG9yZSBpcyBub3QgYm91bmQgdG8gYSBsYXllci4nKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgbGF5ZXIncyBmZWF0dXJlcyBhbmQgcGVyZm9ybSBhIG1vdGlvbiB0byBtYWtlIHRoZW0gdmlzaWJsZS5cclxuICAgKiBAcGFyYW0gZmVhdHVyZXMgT3BlbmxheWVycyBmZWF0dXJlIG9iamVjdHNcclxuICAgKiBAcGFyYW0gbW90aW9uIE9wdGlvbmFsOiBUaGUgdHlwZSBvZiBtb3Rpb24gdG8gcGVyZm9ybVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2V0TGF5ZXJPbEZlYXR1cmVzKFxyXG4gICAgb2xGZWF0dXJlczogT2xGZWF0dXJlW10sXHJcbiAgICBtb3Rpb246IEZlYXR1cmVNb3Rpb24gPSBGZWF0dXJlTW90aW9uLkRlZmF1bHQsXHJcbiAgICB2aWV3U2NhbGU/OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcclxuICAgIGFyZWFSYXRpbz86IG51bWJlclxyXG4gICkge1xyXG4gICAgY29uc3Qgb2xGZWF0dXJlc01hcCA9IG5ldyBNYXAoKTtcclxuICAgIG9sRmVhdHVyZXMuZm9yRWFjaCgob2xGZWF0dXJlOiBPbEZlYXR1cmUpID0+IHtcclxuICAgICAgb2xGZWF0dXJlc01hcC5zZXQob2xGZWF0dXJlLmdldElkKCksIG9sRmVhdHVyZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBvbEZlYXR1cmVzVG9SZW1vdmUgPSBbXTtcclxuICAgIHRoaXMuc291cmNlLm9sLmZvckVhY2hGZWF0dXJlKChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4ge1xyXG4gICAgICBjb25zdCBuZXdPbEZlYXR1cmUgPSBvbEZlYXR1cmVzTWFwLmdldChvbEZlYXR1cmUuZ2V0SWQoKSk7XHJcbiAgICAgIGlmIChuZXdPbEZlYXR1cmUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIG9sRmVhdHVyZXNUb1JlbW92ZS5wdXNoKG9sRmVhdHVyZSk7XHJcbiAgICAgIH0gZWxzZSBpZiAobmV3T2xGZWF0dXJlLmdldCgnX2VudGl0eVJldmlzaW9uJykgIT09IG9sRmVhdHVyZS5nZXQoJ19lbnRpdHlSZXZpc2lvbicpKSB7XHJcbiAgICAgICAgb2xGZWF0dXJlc1RvUmVtb3ZlLnB1c2gob2xGZWF0dXJlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBvbEZlYXR1cmVzTWFwLmRlbGV0ZShuZXdPbEZlYXR1cmUuZ2V0SWQoKSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IG9sRmVhdHVyZXNUb0FkZElkcyA9IEFycmF5LmZyb20ob2xGZWF0dXJlc01hcC5rZXlzKCkpO1xyXG4gICAgY29uc3Qgb2xGZWF0dXJlc1RvQWRkID0gb2xGZWF0dXJlcy5maWx0ZXIoKG9sRmVhdHVyZTogT2xGZWF0dXJlKSA9PiB7XHJcbiAgICAgIHJldHVybiBvbEZlYXR1cmVzVG9BZGRJZHMuaW5kZXhPZihvbEZlYXR1cmUuZ2V0SWQoKSkgPj0gMDtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChvbEZlYXR1cmVzVG9SZW1vdmUubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aGlzLnJlbW92ZU9sRmVhdHVyZXNGcm9tTGF5ZXIob2xGZWF0dXJlc1RvUmVtb3ZlKTtcclxuICAgIH1cclxuICAgIGlmIChvbEZlYXR1cmVzVG9BZGQubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aGlzLmFkZE9sRmVhdHVyZXNUb0xheWVyKG9sRmVhdHVyZXNUb0FkZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9sRmVhdHVyZXNUb0FkZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIC8vIElmIGZlYXR1cmVzIGFyZSBhZGRlZCwgZG8gYSBtb3Rpb24gdG93YXJkIHRoZSBuZXdseSBhZGRlZCBmZWF0dXJlc1xyXG4gICAgICBtb3ZlVG9PbEZlYXR1cmVzKHRoaXMubWFwLCBvbEZlYXR1cmVzVG9BZGQsIG1vdGlvbiwgdmlld1NjYWxlLCBhcmVhUmF0aW8pO1xyXG4gICAgfSBlbHNlIGlmIChvbEZlYXR1cmVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgLy8gRWxzZSwgZG8gYSBtb3Rpb24gdG93YXJkIGFsbCB0aGUgZmVhdHVyZXNcclxuICAgICAgbW92ZVRvT2xGZWF0dXJlcyh0aGlzLm1hcCwgb2xGZWF0dXJlcywgbW90aW9uLCB2aWV3U2NhbGUsIGFyZWFSYXRpbyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgZmVhdHVyZXMgdG8gdGhlIHRoZSBsYXllclxyXG4gICAqIEBwYXJhbSBmZWF0dXJlcyBPcGVubGF5ZXJzIGZlYXR1cmUgb2JqZWN0c1xyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkT2xGZWF0dXJlc1RvTGF5ZXIob2xGZWF0dXJlczogT2xGZWF0dXJlW10pIHtcclxuICAgIG9sRmVhdHVyZXMuZm9yRWFjaCgob2xGZWF0dXJlOiBPbEZlYXR1cmUpID0+IHtcclxuICAgICAgb2xGZWF0dXJlLnNldCgnX2ZlYXR1cmVTdG9yZScsIHRoaXMsIHRydWUpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNvdXJjZS5vbC5hZGRGZWF0dXJlcyhvbEZlYXR1cmVzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBmZWF0dXJlcyBmcm9tIHRoZSB0aGUgbGF5ZXJcclxuICAgKiBAcGFyYW0gZmVhdHVyZXMgT3BlbmxheWVycyBmZWF0dXJlIG9iamVjdHNcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZU9sRmVhdHVyZXNGcm9tTGF5ZXIob2xGZWF0dXJlczogT2xGZWF0dXJlW10pIHtcclxuICAgIG9sRmVhdHVyZXMuZm9yRWFjaCgob2xGZWF0dXJlOiBPbEZlYXR1cmUpID0+IHtcclxuICAgICAgdGhpcy5zb3VyY2Uub2wucmVtb3ZlRmVhdHVyZShvbEZlYXR1cmUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=