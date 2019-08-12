import { IgoMap } from '../../../map';
import { FeatureStoreSelectionStrategyOptions } from '../feature.interfaces';
import { FeatureStore } from '../store';
import { FeatureStoreStrategy } from './strategy';
/**
 * This strategy synchronizes a store and a layer selected entities.
 * The store <-> layer binding is a two-way binding.
 *
 * In many cases, a single strategy bound to multiple stores
 * will yield better results that multiple strategies with each their
 * own store. In the latter scenario, a click on overlapping features
 * would trigger the strategy of each layer and they would cancel
 * each other as well as move the map view around needlessly.
 */
export declare class FeatureStoreSelectionStrategy extends FeatureStoreStrategy {
    protected options: FeatureStoreSelectionStrategyOptions;
    /**
     * Listener to the map click event that allows selecting a feature
     * by clicking on the map
     */
    private mapClickListener;
    private olDragSelectInteraction;
    private olDragSelectInteractionEndKey;
    /**
     * A feature store that'll contain the selected features. It has it's own
     * layer, shared by all the stores this staretgy is bound to.
     */
    private overlayStore;
    /**
     * Subscription to all stores selected entities
     */
    private stores$$;
    /**
     * The map the layers belong to
     */
    readonly map: IgoMap;
    constructor(options: FeatureStoreSelectionStrategyOptions);
    /**
     * Bind this strategy to a store and force this strategy's
     * reactivation to properly setup watchers.
     * @param store Feature store
     */
    bindStore(store: FeatureStore): void;
    /**
     * Unbind this strategy from a store and force this strategy's
     * reactivation to properly setup watchers.
     * @param store Feature store
     */
    unbindStore(store: FeatureStore): void;
    /**
     * Unselect all entities, from all stores
     */
    unselectAll(): void;
    clear(): void;
    /**
     * Add the overlay layer, setup the map click lsitener and
     * start watching for stores selection
     * @internal
     */
    protected doActivate(): void;
    /**
     * Remove the overlay layer, remove the map click lsitener and
     * stop watching for stores selection
     * @internal
     */
    protected doDeactivate(): void;
    /**
     * Create a single observable of all the stores. With a single observable,
     * features can be added all at once to the overlay layer and a single
     * motion can be performed. Multiple observable would have
     * a cancelling effect on each other.
     */
    private watchAll;
    /**
     * Stop watching for selection in all stores.
     */
    private unwatchAll;
    /**
     * Add a 'singleclick' listener to the map that'll allow selecting
     * features by clicking on the map. The selection will be performed
     * only on the layers bound to this strategy.
     */
    private listenToMapClick;
    /**
     * Remove the map click listener
     */
    private unlistenToMapClick;
    /**
     * On map click, select feature at pixel
     * @param event OL MapBrowserPointerEvent
     */
    private onMapClick;
    /**
     * Add a drag box interaction and, on drag box end, select features
     */
    private addDragBoxInteraction;
    /**
     * Remove drag box interaction
     */
    private removeDragBoxInteraction;
    /**
     * On dragbox end, select features in drag box
     * @param event OL MapBrowserPointerEvent
     */
    private onDragBoxEnd;
    /**
     * When features are selected from the store, add
     * them to this startegy's overlay layer (select on map)
     * @param features Store features
     */
    private onSelectFromStore;
    /**
     * When features are selected from the map, also select them
     * in their store.
     * @param olFeatures OL feature objects
     */
    private onSelectFromMap;
    /**
     * Select features in store
     * @param store: Feature store
     * @param features Features
     */
    private selectFeaturesFromStore;
    /**
     * Unselect all features from store
     * @param store: Feature store
     */
    private unselectAllFeaturesFromStore;
    /**
     * This method returns a store -> features mapping from a list
     * of OL selected features. OL features keep a reference to the store
     * they are from.
     * @param olFeatures: OL feature objects
     * @returns Store -> features mapping
     */
    private groupFeaturesByStore;
    /**
     * Create an overlay store that'll contain the selected features.
     * @returns Overlay store
     */
    private createOverlayStore;
    /**
     * Create an overlay store that'll contain the selected features.
     * @returns Overlay layer
     */
    private createOverlayLayer;
    /**
     * Add the overlay store's layer to the map to display the selected
     * features.
     */
    private addOverlayLayer;
    /**
     * Remove the overlay layer from the map
     */
    private removeOverlayLayer;
}
