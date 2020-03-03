import { EntityStoreStrategy } from '@igo2/common';
import { FeatureStore } from '../store';
import { FeatureStoreLoadingLayerStrategyOptions } from '../feature.interfaces';
/**
 * This strategy loads a layer's features into it's store counterpart.
 * The layer -> store binding is a one-way binding. That means any OL feature
 * added to the layer will be added to the store but the opposite is false.
 *
 * Important: In it's current state, this strategy is to meant to be combined
 * with a standard Loading strategy and it would probably cause recursion issues.
 */
export declare class FeatureStoreLoadingLayerStrategy extends EntityStoreStrategy {
    protected options: FeatureStoreLoadingLayerStrategyOptions;
    /**
     * Subscription to the store's OL source changes
     */
    private stores$$;
    constructor(options: FeatureStoreLoadingLayerStrategyOptions);
    /**
     * Bind this strategy to a store and start watching for Ol source changes
     * @param store Feature store
     */
    bindStore(store: FeatureStore): void;
    /**
     * Unbind this strategy from a store and stop watching for Ol source changes
     * @param store Feature store
     */
    unbindStore(store: FeatureStore): void;
    /**
     * Start watching all stores already bound to that strategy at once.
     * @internal
     */
    protected doActivate(): void;
    /**
     * Stop watching all stores bound to that strategy
     * @internal
     */
    protected doDeactivate(): void;
    /**
     * Watch for a store's  OL source changes
     * @param store Feature store
     */
    private watchStore;
    /**
     * Stop watching for a store's OL source changes
     * @param store Feature store
     */
    private unwatchStore;
    /**
     * Stop watching for OL source changes in all stores.
     */
    private unwatchAll;
    /**
     * Load features from an OL source into a  store or clear the store if the source is empty
     * @param features Store filtered features
     * @param store Feature store
     */
    private onSourceChanges;
}
