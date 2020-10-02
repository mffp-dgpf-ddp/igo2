import { EntityStoreStrategy } from '@igo2/common';
import { FeatureMotion } from '../feature.enums';
import { FeatureStoreLoadingStrategyOptions } from '../feature.interfaces';
import { FeatureStore } from '../store';
/**
 * This strategy loads a store's features into it's layer counterpart.
 * The store -> layer binding is a one-way binding. That means any entity
 * added to the store will be added to the layer but the opposite is false.
 *
 * Important: This strategy observes filtered entities, not raw entities. This
 * is not configurable yet.
 */
export declare class FeatureStoreLoadingStrategy extends EntityStoreStrategy {
    protected options: FeatureStoreLoadingStrategyOptions;
    /**
     * Subscription to the store's features
     */
    private stores$$;
    private motion;
    constructor(options: FeatureStoreLoadingStrategyOptions);
    /**
     * Bind this strategy to a store and start watching for entities changes
     * @param store Feature store
     */
    bindStore(store: FeatureStore): void;
    /**
     * Unbind this strategy from a store and stop watching for entities changes
     * @param store Feature store
     */
    unbindStore(store: FeatureStore): void;
    /**
     * Define the motion to apply on load
     * @param motion Feature motion
     */
    setMotion(motion: FeatureMotion): void;
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
     * Watch for entities changes in a store.
     * Important: Never observe a store's sorted entities. It makes no sense
     * to display sorted entities (instead of unsorted) on a layer and it
     * would potentially result in a lot of useless computation.
     * @param store Feature store
     */
    private watchStore;
    /**
     * Stop watching for entities changes in a store.
     * @param store Feature store
     */
    private unwatchStore;
    /**
     * Stop watching for entities changes in all stores.
     */
    private unwatchAll;
    /**
     * Load features into a layer or clear the layer if the array of features is empty.
     * @param features Store filtered features
     * @param store Feature store
     */
    private onFeaturesChange;
    /**
     * Selects the best motion
     * @param store A FeatureStore to apply the motion
     * @returns The motion selected
     */
    private selectMotion;
}
