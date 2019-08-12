import { FeatureStoreStrategyOptions } from '../feature.interfaces';
import { FeatureStore } from '../store';
/**
 * Strategies or responsible of synchronizing a feature store and a layer.
 * A strategy can be shared among multiple stores. Sharing a strategy
 * is a good idea when multiple strategies would have on cancelling effect
 * on each other.
 *
 * At creation, strategy is inactive and needs to be manually activated.
 */
export declare class FeatureStoreStrategy {
    protected options: FeatureStoreStrategyOptions;
    /**
     * Feature store
     * @internal
     */
    protected stores: FeatureStore[];
    /**
     * Whether this strategy is active
     * @internal
     */
    protected active: boolean;
    constructor(options?: FeatureStoreStrategyOptions);
    /**
     * Whether this strategy is active
     */
    isActive(): boolean;
    /**
     * Activate the strategy. If it's already active, it'll be deactivated
     * and activated again.
     */
    activate(): void;
    /**
     * Activate the strategy. If it's already active, it'll be deactivated
     * and activated again.
     */
    deactivate(): void;
    /**
     * Bind this strategy to a store
     * @param store Feature store
     */
    bindStore(store: FeatureStore): void;
    /**
     * Unbind this strategy from store
     * @param store Feature store
     */
    unbindStore(store: FeatureStore): void;
    /**
     * Do the stataegy activation
     * @internal
     */
    protected doActivate(): void;
    /**
     * Do the strategy deactivation
     * @internal
     */
    protected doDeactivate(): void;
}
