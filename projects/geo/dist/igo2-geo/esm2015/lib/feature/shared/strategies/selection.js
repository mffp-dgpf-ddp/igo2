/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import OlDragBoxInteraction from 'ol/interaction/DragBox';
import { unByKey } from 'ol/Observable';
import { combineLatest } from 'rxjs';
import { map, debounceTime, skip } from 'rxjs/operators';
import { EntityStoreStrategy } from '@igo2/common';
import { FeatureDataSource } from '../../../datasource';
import { VectorLayer } from '../../../layer';
import { ctrlKeyDown } from '../../../map';
import { FeatureStore } from '../store';
import { FeatureMotion } from '../feature.enums';
class OlDragSelectInteraction extends OlDragBoxInteraction {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
    }
}
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
export class FeatureStoreSelectionStrategy extends EntityStoreStrategy {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
        this.options = options;
        this.setMotion(options.motion);
        this._overlayStore = this.createOverlayStore();
    }
    /**
     * The map the layers belong to
     * @return {?}
     */
    get map() { return this.options.map; }
    /**
     * A feature store that'll contain the selected features. It has it's own
     * layer, shared by all the stores this staretgy is bound to.
     * @return {?}
     */
    get overlayStore() { return this._overlayStore; }
    /**
     * Bind this strategy to a store and force this strategy's
     * reactivation to properly setup watchers.
     * @param {?} store Feature store
     * @return {?}
     */
    bindStore(store) {
        super.bindStore(store);
        if (this.active === true) {
            // Force reactivation
            this.activate();
        }
    }
    /**
     * Unbind this strategy from a store and force this strategy's
     * reactivation to properly setup watchers.
     * @param {?} store Feature store
     * @return {?}
     */
    unbindStore(store) {
        super.unbindStore(store);
        if (this.active === true) {
            // Force reactivation
            this.activate();
        }
    }
    /**
     * Define the motion to apply on select
     * @param {?} motion Feature motion
     * @return {?}
     */
    setMotion(motion) {
        this.motion = motion;
    }
    /**
     * Unselect all entities, from all stores
     * @return {?}
     */
    unselectAll() {
        this.stores.forEach((/**
         * @param {?} store
         * @return {?}
         */
        (store) => {
            store.state.updateAll({ selected: false });
        }));
    }
    /**
     * Clear the overlay
     * @return {?}
     */
    clear() {
        this.overlayStore.source.ol.clear();
        this.overlayStore.clear();
    }
    /**
     * Deactivate the selection without removing the selection
     * overlay.
     * @return {?}
     */
    deactivateSelection() {
        this.unlistenToMapClick();
        this.removeDragBoxInteraction();
        this.unwatchAll();
    }
    /**
     * Add the overlay layer, setup the map click lsitener and
     * start watching for stores selection
     * \@internal
     * @protected
     * @return {?}
     */
    doActivate() {
        this.addOverlayLayer();
        this.listenToMapClick();
        if (this.options.dragBox === true) {
            this.addDragBoxInteraction();
        }
        this.watchAll();
    }
    /**
     * Remove the overlay layer, remove the map click lsitener and
     * stop watching for stores selection
     * \@internal
     * @protected
     * @return {?}
     */
    doDeactivate() {
        this.deactivateSelection();
        this.removeOverlayLayer();
    }
    /**
     * Create a single observable of all the stores. With a single observable,
     * features can be added all at once to the overlay layer and a single
     * motion can be performed. Multiple observable would have
     * a cancelling effect on each other.
     * @private
     * @return {?}
     */
    watchAll() {
        this.unwatchAll();
        /** @type {?} */
        const stores$ = this.stores.map((/**
         * @param {?} store
         * @return {?}
         */
        (store) => {
            return store.stateView.manyBy$((/**
             * @param {?} record
             * @return {?}
             */
            (record) => {
                return record.state.selected === true;
            })).pipe(map((/**
             * @param {?} records
             * @return {?}
             */
            (records) => records.map((/**
             * @param {?} record
             * @return {?}
             */
            record => record.entity)))));
        }));
        this.stores$$ = combineLatest(stores$)
            .pipe(debounceTime(5), skip(1), // Skip intial selection
        map((/**
         * @param {?} features
         * @return {?}
         */
        (features) => features.reduce((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => a.concat(b)))))).subscribe((/**
         * @param {?} features
         * @return {?}
         */
        (features) => this.onSelectFromStore(features)));
    }
    /**
     * Stop watching for selection in all stores.
     * @private
     * @return {?}
     */
    unwatchAll() {
        if (this.stores$$ !== undefined) {
            this.stores$$.unsubscribe();
        }
    }
    /**
     * Add a 'singleclick' listener to the map that'll allow selecting
     * features by clicking on the map. The selection will be performed
     * only on the layers bound to this strategy.
     * @private
     * @return {?}
     */
    listenToMapClick() {
        this.mapClickListener = this.map.ol.on('singleclick', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.onMapClick(event);
        }));
    }
    /**
     * Remove the map click listener
     * @private
     * @return {?}
     */
    unlistenToMapClick() {
        if (this.mapClickListener !== undefined) {
            this.map.ol.un(this.mapClickListener.type, this.mapClickListener.listener);
        }
    }
    /**
     * On map click, select feature at pixel
     * @private
     * @param {?} event OL MapBrowserPointerEvent
     * @return {?}
     */
    onMapClick(event) {
        /** @type {?} */
        const exclusive = !ctrlKeyDown(event);
        /** @type {?} */
        const reverse = !exclusive;
        /** @type {?} */
        const olFeatures = event.map.getFeaturesAtPixel(event.pixel, {
            hitTolerance: this.options.hitTolerance || 0,
            layerFilter: (/**
             * @param {?} olLayer
             * @return {?}
             */
            (olLayer) => {
                /** @type {?} */
                const storeOlLayer = this.stores.find((/**
                 * @param {?} store
                 * @return {?}
                 */
                (store) => {
                    return store.layer.ol === olLayer;
                }));
                return storeOlLayer !== undefined;
            })
        });
        this.onSelectFromMap(olFeatures, exclusive, reverse);
    }
    /**
     * Add a drag box interaction and, on drag box end, select features
     * @private
     * @return {?}
     */
    addDragBoxInteraction() {
        /** @type {?} */
        let olDragSelectInteraction;
        /** @type {?} */
        const olInteractions = this.map.ol.getInteractions().getArray();
        // There can only be one dragbox interaction, so find the current one, if any
        // Don't keep a reference to the current dragbox because we don't want
        // to remove it when this startegy is deactivated
        for (const olInteraction of olInteractions) {
            if (olInteraction instanceof OlDragSelectInteraction) {
                olDragSelectInteraction = olInteraction;
                break;
            }
        }
        // If no drag box interaction is found, create a new one and add it to the map
        if (olDragSelectInteraction === undefined) {
            olDragSelectInteraction = new OlDragSelectInteraction({
                condition: ctrlKeyDown
            });
            this.map.ol.addInteraction(olDragSelectInteraction);
            this.olDragSelectInteraction = olDragSelectInteraction;
        }
        this.olDragSelectInteractionEndKey = olDragSelectInteraction.on('boxend', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => this.onDragBoxEnd(event)));
    }
    /**
     * Remove drag box interaction
     * @private
     * @return {?}
     */
    removeDragBoxInteraction() {
        if (this.olDragSelectInteractionEndKey !== undefined) {
            unByKey(this.olDragSelectInteractionEndKey);
        }
        if (this.olDragSelectInteraction !== undefined) {
            this.map.ol.removeInteraction(this.olDragSelectInteraction);
        }
        this.olDragSelectInteraction = undefined;
    }
    /**
     * On dragbox end, select features in drag box
     * @private
     * @param {?} event OL MapBrowserPointerEvent
     * @return {?}
     */
    onDragBoxEnd(event) {
        /** @type {?} */
        const exclusive = !ctrlKeyDown(event.mapBrowserEvent);
        /** @type {?} */
        const extent = event.target.getGeometry().getExtent();
        /** @type {?} */
        const olFeatures = this.stores.reduce((/**
         * @param {?} acc
         * @param {?} store
         * @return {?}
         */
        (acc, store) => {
            /** @type {?} */
            const olSource = store.layer.ol.getSource();
            acc.push(...olSource.getFeaturesInExtent(extent));
            return acc;
        }), []);
        this.onSelectFromMap(olFeatures, exclusive, false);
    }
    /**
     * When features are selected from the store, add
     * them to this startegy's overlay layer (select on map)
     * @private
     * @param {?} features Store features
     * @return {?}
     */
    onSelectFromStore(features) {
        /** @type {?} */
        const motion = this.motion;
        /** @type {?} */
        const olOverlayFeatures = this.overlayStore.layer.ol.getSource().getFeatures();
        /** @type {?} */
        const overlayFeaturesKeys = olOverlayFeatures.map((/**
         * @param {?} olFeature
         * @return {?}
         */
        (olFeature) => olFeature.getId()));
        /** @type {?} */
        const featuresKeys = features.map(this.overlayStore.getKey);
        /** @type {?} */
        let doMotion;
        if (features.length === 0) {
            doMotion = false;
        }
        else {
            doMotion = overlayFeaturesKeys.length !== featuresKeys.length ||
                !overlayFeaturesKeys.every((/**
                 * @param {?} key
                 * @return {?}
                 */
                (key) => featuresKeys.indexOf(key) >= 0));
        }
        this.overlayStore.setLayerFeatures(features, doMotion ? motion : FeatureMotion.None, this.options.viewScale, this.options.areaRatio, this.options.getFeatureId);
    }
    /**
     * When features are selected from the map, also select them
     * in their store.
     * @private
     * @param {?} olFeatures OL feature objects
     * @param {?} exclusive
     * @param {?} reverse
     * @return {?}
     */
    onSelectFromMap(olFeatures, exclusive, reverse) {
        /** @type {?} */
        const groupedFeatures = this.groupFeaturesByStore(olFeatures);
        this.stores.forEach((/**
         * @param {?} store
         * @return {?}
         */
        (store) => {
            /** @type {?} */
            const features = groupedFeatures.get(store);
            if (features === undefined && exclusive === true) {
                this.unselectAllFeaturesFromStore(store);
            }
            else if (features === undefined && exclusive === false) {
                // Do nothing
            }
            else {
                this.selectFeaturesFromStore(store, features, exclusive, reverse);
            }
        }));
    }
    /**
     * Select features in store
     * @private
     * @param {?} store
     * @param {?} features Features
     * @param {?} exclusive
     * @param {?} reverse
     * @return {?}
     */
    selectFeaturesFromStore(store, features, exclusive, reverse) {
        if (reverse === true) {
            store.state.reverseMany(features, ['selected']);
        }
        else {
            store.state.updateMany(features, { selected: true }, exclusive);
        }
    }
    /**
     * Unselect all features from store
     * @private
     * @param {?} store
     * @return {?}
     */
    unselectAllFeaturesFromStore(store) {
        store.state.updateAll({ selected: false });
    }
    /**
     * This method returns a store -> features mapping from a list
     * of OL selected features. OL features keep a reference to the store
     * they are from.
     * @private
     * @param {?} olFeatures
     * @return {?} Store -> features mapping
     */
    groupFeaturesByStore(olFeatures) {
        /** @type {?} */
        const groupedFeatures = new Map();
        if (olFeatures === null || olFeatures === undefined) {
            return groupedFeatures;
        }
        olFeatures.forEach((/**
         * @param {?} olFeature
         * @return {?}
         */
        (olFeature) => {
            /** @type {?} */
            const store = olFeature.get('_featureStore');
            if (store === undefined) {
                return;
            }
            /** @type {?} */
            let features = groupedFeatures.get(store);
            if (features === undefined) {
                features = [];
                groupedFeatures.set(store, features);
            }
            /** @type {?} */
            const feature = store.get(olFeature.getId());
            if (feature !== undefined) {
                features.push(feature);
            }
        }));
        return groupedFeatures;
    }
    /**
     * Create an overlay store that'll contain the selected features.
     * @private
     * @return {?} Overlay store
     */
    createOverlayStore() {
        /** @type {?} */
        const overlayLayer = this.options.layer
            ? this.options.layer
            : this.createOverlayLayer();
        return new FeatureStore([], { map: this.map }).bindLayer(overlayLayer);
    }
    /**
     * Create an overlay store that'll contain the selected features.
     * @private
     * @return {?} Overlay layer
     */
    createOverlayLayer() {
        return new VectorLayer({
            zIndex: 300,
            source: new FeatureDataSource(),
            style: undefined,
            showInLayerList: false,
            exportable: false,
            browsable: false
        });
    }
    /**
     * Add the overlay store's layer to the map to display the selected
     * features.
     * @private
     * @return {?}
     */
    addOverlayLayer() {
        if (this.overlayStore.layer.map === undefined) {
            this.map.addLayer(this.overlayStore.layer);
        }
    }
    /**
     * Remove the overlay layer from the map
     * @private
     * @return {?}
     */
    removeOverlayLayer() {
        this.overlayStore.source.ol.clear();
        this.map.removeLayer(this.overlayStore.layer);
    }
}
if (false) {
    /**
     * Listener to the map click event that allows selecting a feature
     * by clicking on the map
     * @type {?}
     * @private
     */
    FeatureStoreSelectionStrategy.prototype.mapClickListener;
    /**
     * @type {?}
     * @private
     */
    FeatureStoreSelectionStrategy.prototype.olDragSelectInteraction;
    /**
     * @type {?}
     * @private
     */
    FeatureStoreSelectionStrategy.prototype.olDragSelectInteractionEndKey;
    /**
     * Subscription to all stores selected entities
     * @type {?}
     * @private
     */
    FeatureStoreSelectionStrategy.prototype.stores$$;
    /**
     * @type {?}
     * @private
     */
    FeatureStoreSelectionStrategy.prototype.motion;
    /**
     * @type {?}
     * @private
     */
    FeatureStoreSelectionStrategy.prototype._overlayStore;
    /**
     * @type {?}
     * @protected
     */
    FeatureStoreSelectionStrategy.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ZlYXR1cmUvc2hhcmVkL3N0cmF0ZWdpZXMvc2VsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLG9CQUFvQixNQUFNLHdCQUF3QixDQUFDO0FBSTFELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFeEMsT0FBTyxFQUFnQixhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekQsT0FBTyxFQUEyQixtQkFBbUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUU1RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFVLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUduRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRCxNQUFNLHVCQUF3QixTQUFRLG9CQUFvQjs7OztJQUN4RCxZQUFZLE9BQU87UUFDakIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7Q0FDRjs7Ozs7Ozs7Ozs7QUFZRCxNQUFNLE9BQU8sNkJBQThCLFNBQVEsbUJBQW1COzs7O0lBK0JwRSxZQUFzQixPQUE2QztRQUNqRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFESyxZQUFPLEdBQVAsT0FBTyxDQUFzQztRQUVqRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0Is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UyxFQUFFLEtBQUs7U0FDakIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7OztJQU1PLGVBQWU7UUFDckIsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssU0FBUyxFQUFFO1lBQzdDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDNUM7SUFDSCxDQUFDOzs7Ozs7SUFLTyxrQkFBa0I7UUFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEQsQ0FBQztDQUNGOzs7Ozs7OztJQTFZQyx5REFBMkM7Ozs7O0lBRTNDLGdFQUF5RDs7Ozs7SUFFekQsc0VBQThDOzs7Ozs7SUFLOUMsaURBQStCOzs7OztJQUUvQiwrQ0FBOEI7Ozs7O0lBWTlCLHNEQUFvQzs7Ozs7SUFFeEIsZ0RBQXVEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuaW1wb3J0IE9sRHJhZ0JveEludGVyYWN0aW9uIGZyb20gJ29sL2ludGVyYWN0aW9uL0RyYWdCb3gnO1xyXG5pbXBvcnQgeyBEcmFnQm94RXZlbnQgYXMgT2xEcmFnQm94RXZlbnQgfSBmcm9tICdvbC9pbnRlcmFjdGlvbi9EcmFnQm94JztcclxuaW1wb3J0IHsgTGlzdGVuZXJGdW5jdGlvbiB9IGZyb20gJ29sL2V2ZW50cyc7XHJcbmltcG9ydCB7IE1hcEJyb3dzZXJQb2ludGVyRXZlbnQgYXMgT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50IH0gZnJvbSAnb2wvTWFwQnJvd3NlckV2ZW50JztcclxuaW1wb3J0IHsgdW5CeUtleSB9IGZyb20gJ29sL09ic2VydmFibGUnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBjb21iaW5lTGF0ZXN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCwgZGVib3VuY2VUaW1lLCBza2lwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgRW50aXR5S2V5LCBFbnRpdHlSZWNvcmQsIEVudGl0eVN0b3JlU3RyYXRlZ3kgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgVmVjdG9yTGF5ZXIgfSBmcm9tICcuLi8uLi8uLi9sYXllcic7XHJcbmltcG9ydCB7IElnb01hcCwgY3RybEtleURvd24gfSBmcm9tICcuLi8uLi8uLi9tYXAnO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZSwgRmVhdHVyZVN0b3JlU2VsZWN0aW9uU3RyYXRlZ3lPcHRpb25zIH0gZnJvbSAnLi4vZmVhdHVyZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgRmVhdHVyZVN0b3JlIH0gZnJvbSAnLi4vc3RvcmUnO1xyXG5pbXBvcnQgeyBGZWF0dXJlTW90aW9uIH0gZnJvbSAnLi4vZmVhdHVyZS5lbnVtcyc7XHJcblxyXG5jbGFzcyBPbERyYWdTZWxlY3RJbnRlcmFjdGlvbiBleHRlbmRzIE9sRHJhZ0JveEludGVyYWN0aW9uIHtcclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGlzIHN0cmF0ZWd5IHN5bmNocm9uaXplcyBhIHN0b3JlIGFuZCBhIGxheWVyIHNlbGVjdGVkIGVudGl0aWVzLlxyXG4gKiBUaGUgc3RvcmUgPC0+IGxheWVyIGJpbmRpbmcgaXMgYSB0d28td2F5IGJpbmRpbmcuXHJcbiAqXHJcbiAqIEluIG1hbnkgY2FzZXMsIGEgc2luZ2xlIHN0cmF0ZWd5IGJvdW5kIHRvIG11bHRpcGxlIHN0b3Jlc1xyXG4gKiB3aWxsIHlpZWxkIGJldHRlciByZXN1bHRzIHRoYXQgbXVsdGlwbGUgc3RyYXRlZ2llcyB3aXRoIGVhY2ggdGhlaXJcclxuICogb3duIHN0b3JlLiBJbiB0aGUgbGF0dGVyIHNjZW5hcmlvLCBhIGNsaWNrIG9uIG92ZXJsYXBwaW5nIGZlYXR1cmVzXHJcbiAqIHdvdWxkIHRyaWdnZXIgdGhlIHN0cmF0ZWd5IG9mIGVhY2ggbGF5ZXIgYW5kIHRoZXkgd291bGQgY2FuY2VsXHJcbiAqIGVhY2ggb3RoZXIgYXMgd2VsbCBhcyBtb3ZlIHRoZSBtYXAgdmlldyBhcm91bmQgbmVlZGxlc3NseS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneSBleHRlbmRzIEVudGl0eVN0b3JlU3RyYXRlZ3kge1xyXG5cclxuICAvKipcclxuICAgKiBMaXN0ZW5lciB0byB0aGUgbWFwIGNsaWNrIGV2ZW50IHRoYXQgYWxsb3dzIHNlbGVjdGluZyBhIGZlYXR1cmVcclxuICAgKiBieSBjbGlja2luZyBvbiB0aGUgbWFwXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBtYXBDbGlja0xpc3RlbmVyOiBMaXN0ZW5lckZ1bmN0aW9uO1xyXG5cclxuICBwcml2YXRlIG9sRHJhZ1NlbGVjdEludGVyYWN0aW9uOiBPbERyYWdTZWxlY3RJbnRlcmFjdGlvbjtcclxuXHJcbiAgcHJpdmF0ZSBvbERyYWdTZWxlY3RJbnRlcmFjdGlvbkVuZEtleTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gYWxsIHN0b3JlcyBzZWxlY3RlZCBlbnRpdGllc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RvcmVzJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgcHJpdmF0ZSBtb3Rpb246IEZlYXR1cmVNb3Rpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBtYXAgdGhlIGxheWVycyBiZWxvbmcgdG9cclxuICAgKi9cclxuICBnZXQgbWFwKCk6IElnb01hcCB7IHJldHVybiB0aGlzLm9wdGlvbnMubWFwOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZmVhdHVyZSBzdG9yZSB0aGF0J2xsIGNvbnRhaW4gdGhlIHNlbGVjdGVkIGZlYXR1cmVzLiBJdCBoYXMgaXQncyBvd25cclxuICAgKiBsYXllciwgc2hhcmVkIGJ5IGFsbCB0aGUgc3RvcmVzIHRoaXMgc3RhcmV0Z3kgaXMgYm91bmQgdG8uXHJcbiAgICovXHJcbiAgZ2V0IG92ZXJsYXlTdG9yZSgpOiBGZWF0dXJlU3RvcmUgeyByZXR1cm4gdGhpcy5fb3ZlcmxheVN0b3JlOyB9XHJcbiAgcHJpdmF0ZSBfb3ZlcmxheVN0b3JlOiBGZWF0dXJlU3RvcmU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBvcHRpb25zOiBGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneU9wdGlvbnMpIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgdGhpcy5zZXRNb3Rpb24ob3B0aW9ucy5tb3Rpb24pO1xyXG4gICAgdGhpcy5fb3ZlcmxheVN0b3JlID0gdGhpcy5jcmVhdGVPdmVybGF5U3RvcmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEJpbmQgdGhpcyBzdHJhdGVneSB0byBhIHN0b3JlIGFuZCBmb3JjZSB0aGlzIHN0cmF0ZWd5J3NcclxuICAgKiByZWFjdGl2YXRpb24gdG8gcHJvcGVybHkgc2V0dXAgd2F0Y2hlcnMuXHJcbiAgICogQHBhcmFtIHN0b3JlIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICBiaW5kU3RvcmUoc3RvcmU6IEZlYXR1cmVTdG9yZSkge1xyXG4gICAgc3VwZXIuYmluZFN0b3JlKHN0b3JlKTtcclxuICAgIGlmICh0aGlzLmFjdGl2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAvLyBGb3JjZSByZWFjdGl2YXRpb25cclxuICAgICAgdGhpcy5hY3RpdmF0ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5iaW5kIHRoaXMgc3RyYXRlZ3kgZnJvbSBhIHN0b3JlIGFuZCBmb3JjZSB0aGlzIHN0cmF0ZWd5J3NcclxuICAgKiByZWFjdGl2YXRpb24gdG8gcHJvcGVybHkgc2V0dXAgd2F0Y2hlcnMuXHJcbiAgICogQHBhcmFtIHN0b3JlIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICB1bmJpbmRTdG9yZShzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBzdXBlci51bmJpbmRTdG9yZShzdG9yZSk7XHJcbiAgICBpZiAodGhpcy5hY3RpdmUgPT09IHRydWUpIHtcclxuICAgICAgLy8gRm9yY2UgcmVhY3RpdmF0aW9uXHJcbiAgICAgIHRoaXMuYWN0aXZhdGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlZmluZSB0aGUgbW90aW9uIHRvIGFwcGx5IG9uIHNlbGVjdFxyXG4gICAqIEBwYXJhbSBtb3Rpb24gRmVhdHVyZSBtb3Rpb25cclxuICAgKi9cclxuICBzZXRNb3Rpb24obW90aW9uOiBGZWF0dXJlTW90aW9uKSB7XHJcbiAgICB0aGlzLm1vdGlvbiA9IG1vdGlvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuc2VsZWN0IGFsbCBlbnRpdGllcywgZnJvbSBhbGwgc3RvcmVzXHJcbiAgICovXHJcbiAgdW5zZWxlY3RBbGwoKSB7XHJcbiAgICB0aGlzLnN0b3Jlcy5mb3JFYWNoKChzdG9yZTogRmVhdHVyZVN0b3JlKSA9PiB7XHJcbiAgICAgIHN0b3JlLnN0YXRlLnVwZGF0ZUFsbCh7c2VsZWN0ZWQ6IGZhbHNlfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBvdmVybGF5XHJcbiAgICovXHJcbiAgY2xlYXIoKSB7XHJcbiAgICB0aGlzLm92ZXJsYXlTdG9yZS5zb3VyY2Uub2wuY2xlYXIoKTtcclxuICAgIHRoaXMub3ZlcmxheVN0b3JlLmNsZWFyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWFjdGl2YXRlIHRoZSBzZWxlY3Rpb24gd2l0aG91dCByZW1vdmluZyB0aGUgc2VsZWN0aW9uXHJcbiAgICogb3ZlcmxheS5cclxuICAgKi9cclxuICBkZWFjdGl2YXRlU2VsZWN0aW9uKCkge1xyXG4gICAgdGhpcy51bmxpc3RlblRvTWFwQ2xpY2soKTtcclxuICAgIHRoaXMucmVtb3ZlRHJhZ0JveEludGVyYWN0aW9uKCk7XHJcbiAgICB0aGlzLnVud2F0Y2hBbGwoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCB0aGUgb3ZlcmxheSBsYXllciwgc2V0dXAgdGhlIG1hcCBjbGljayBsc2l0ZW5lciBhbmRcclxuICAgKiBzdGFydCB3YXRjaGluZyBmb3Igc3RvcmVzIHNlbGVjdGlvblxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBkb0FjdGl2YXRlKCkge1xyXG4gICAgdGhpcy5hZGRPdmVybGF5TGF5ZXIoKTtcclxuICAgIHRoaXMubGlzdGVuVG9NYXBDbGljaygpO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5kcmFnQm94ID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuYWRkRHJhZ0JveEludGVyYWN0aW9uKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLndhdGNoQWxsKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgdGhlIG92ZXJsYXkgbGF5ZXIsIHJlbW92ZSB0aGUgbWFwIGNsaWNrIGxzaXRlbmVyIGFuZFxyXG4gICAqIHN0b3Agd2F0Y2hpbmcgZm9yIHN0b3JlcyBzZWxlY3Rpb25cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgZG9EZWFjdGl2YXRlKCkge1xyXG4gICAgdGhpcy5kZWFjdGl2YXRlU2VsZWN0aW9uKCk7XHJcbiAgICB0aGlzLnJlbW92ZU92ZXJsYXlMYXllcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgc2luZ2xlIG9ic2VydmFibGUgb2YgYWxsIHRoZSBzdG9yZXMuIFdpdGggYSBzaW5nbGUgb2JzZXJ2YWJsZSxcclxuICAgKiBmZWF0dXJlcyBjYW4gYmUgYWRkZWQgYWxsIGF0IG9uY2UgdG8gdGhlIG92ZXJsYXkgbGF5ZXIgYW5kIGEgc2luZ2xlXHJcbiAgICogbW90aW9uIGNhbiBiZSBwZXJmb3JtZWQuIE11bHRpcGxlIG9ic2VydmFibGUgd291bGQgaGF2ZVxyXG4gICAqIGEgY2FuY2VsbGluZyBlZmZlY3Qgb24gZWFjaCBvdGhlci5cclxuICAgKi9cclxuICBwcml2YXRlIHdhdGNoQWxsKCkge1xyXG4gICAgdGhpcy51bndhdGNoQWxsKCk7XHJcblxyXG4gICAgY29uc3Qgc3RvcmVzJCA9IHRoaXMuc3RvcmVzLm1hcCgoc3RvcmU6IEZlYXR1cmVTdG9yZSkgPT4ge1xyXG4gICAgICByZXR1cm4gc3RvcmUuc3RhdGVWaWV3Lm1hbnlCeSQoKHJlY29yZDogRW50aXR5UmVjb3JkPEZlYXR1cmU+KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlY29yZC5zdGF0ZS5zZWxlY3RlZCA9PT0gdHJ1ZTtcclxuICAgICAgfSkucGlwZShcclxuICAgICAgICBtYXAoKHJlY29yZHM6IEVudGl0eVJlY29yZDxGZWF0dXJlPltdKSA9PiByZWNvcmRzLm1hcChyZWNvcmQgPT4gcmVjb3JkLmVudGl0eSkpXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc3RvcmVzJCQgPSBjb21iaW5lTGF0ZXN0KHN0b3JlcyQpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIGRlYm91bmNlVGltZSg1KSxcclxuICAgICAgICBza2lwKDEpLCAvLyBTa2lwIGludGlhbCBzZWxlY3Rpb25cclxuICAgICAgICBtYXAoKGZlYXR1cmVzOiBBcnJheTxGZWF0dXJlW10+KSA9PiBmZWF0dXJlcy5yZWR1Y2UoKGEsIGIpID0+IGEuY29uY2F0KGIpKSlcclxuICAgICAgKS5zdWJzY3JpYmUoKGZlYXR1cmVzOiBGZWF0dXJlW10pID0+IHRoaXMub25TZWxlY3RGcm9tU3RvcmUoZmVhdHVyZXMpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3Agd2F0Y2hpbmcgZm9yIHNlbGVjdGlvbiBpbiBhbGwgc3RvcmVzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgdW53YXRjaEFsbCgpIHtcclxuICAgIGlmICh0aGlzLnN0b3JlcyQkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5zdG9yZXMkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGEgJ3NpbmdsZWNsaWNrJyBsaXN0ZW5lciB0byB0aGUgbWFwIHRoYXQnbGwgYWxsb3cgc2VsZWN0aW5nXHJcbiAgICogZmVhdHVyZXMgYnkgY2xpY2tpbmcgb24gdGhlIG1hcC4gVGhlIHNlbGVjdGlvbiB3aWxsIGJlIHBlcmZvcm1lZFxyXG4gICAqIG9ubHkgb24gdGhlIGxheWVycyBib3VuZCB0byB0aGlzIHN0cmF0ZWd5LlxyXG4gICAqL1xyXG4gIHByaXZhdGUgbGlzdGVuVG9NYXBDbGljaygpIHtcclxuICAgIHRoaXMubWFwQ2xpY2tMaXN0ZW5lciA9IHRoaXMubWFwLm9sLm9uKCdzaW5nbGVjbGljaycsIChldmVudDogT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMub25NYXBDbGljayhldmVudCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSB0aGUgbWFwIGNsaWNrIGxpc3RlbmVyXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1bmxpc3RlblRvTWFwQ2xpY2soKSB7XHJcbiAgICBpZiAodGhpcy5tYXBDbGlja0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5tYXAub2wudW4oXHJcbiAgICAgICAgdGhpcy5tYXBDbGlja0xpc3RlbmVyLnR5cGUsXHJcbiAgICAgICAgdGhpcy5tYXBDbGlja0xpc3RlbmVyLmxpc3RlbmVyXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPbiBtYXAgY2xpY2ssIHNlbGVjdCBmZWF0dXJlIGF0IHBpeGVsXHJcbiAgICogQHBhcmFtIGV2ZW50IE9MIE1hcEJyb3dzZXJQb2ludGVyRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uTWFwQ2xpY2soZXZlbnQ6IE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCkge1xyXG4gICAgY29uc3QgZXhjbHVzaXZlID0gIWN0cmxLZXlEb3duKGV2ZW50KTtcclxuICAgIGNvbnN0IHJldmVyc2UgPSAhZXhjbHVzaXZlO1xyXG4gICAgY29uc3Qgb2xGZWF0dXJlcyA9IGV2ZW50Lm1hcC5nZXRGZWF0dXJlc0F0UGl4ZWwoZXZlbnQucGl4ZWwsIHtcclxuICAgICAgaGl0VG9sZXJhbmNlOiB0aGlzLm9wdGlvbnMuaGl0VG9sZXJhbmNlIHx8IDAsXHJcbiAgICAgIGxheWVyRmlsdGVyOiAob2xMYXllcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHN0b3JlT2xMYXllciA9IHRoaXMuc3RvcmVzLmZpbmQoKHN0b3JlOiBGZWF0dXJlU3RvcmUpID0+IHtcclxuICAgICAgICAgIHJldHVybiBzdG9yZS5sYXllci5vbCA9PT0gb2xMYXllcjtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc3RvcmVPbExheWVyICE9PSB1bmRlZmluZWQ7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5vblNlbGVjdEZyb21NYXAob2xGZWF0dXJlcywgZXhjbHVzaXZlLCByZXZlcnNlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhIGRyYWcgYm94IGludGVyYWN0aW9uIGFuZCwgb24gZHJhZyBib3ggZW5kLCBzZWxlY3QgZmVhdHVyZXNcclxuICAgKi9cclxuICBwcml2YXRlIGFkZERyYWdCb3hJbnRlcmFjdGlvbigpIHtcclxuICAgIGxldCBvbERyYWdTZWxlY3RJbnRlcmFjdGlvbjtcclxuICAgIGNvbnN0IG9sSW50ZXJhY3Rpb25zID0gdGhpcy5tYXAub2wuZ2V0SW50ZXJhY3Rpb25zKCkuZ2V0QXJyYXkoKTtcclxuXHJcbiAgICAvLyBUaGVyZSBjYW4gb25seSBiZSBvbmUgZHJhZ2JveCBpbnRlcmFjdGlvbiwgc28gZmluZCB0aGUgY3VycmVudCBvbmUsIGlmIGFueVxyXG4gICAgLy8gRG9uJ3Qga2VlcCBhIHJlZmVyZW5jZSB0byB0aGUgY3VycmVudCBkcmFnYm94IGJlY2F1c2Ugd2UgZG9uJ3Qgd2FudFxyXG4gICAgLy8gdG8gcmVtb3ZlIGl0IHdoZW4gdGhpcyBzdGFydGVneSBpcyBkZWFjdGl2YXRlZFxyXG4gICAgZm9yIChjb25zdCBvbEludGVyYWN0aW9uIG9mIG9sSW50ZXJhY3Rpb25zKSB7XHJcbiAgICAgIGlmIChvbEludGVyYWN0aW9uIGluc3RhbmNlb2YgT2xEcmFnU2VsZWN0SW50ZXJhY3Rpb24pIHtcclxuICAgICAgICBvbERyYWdTZWxlY3RJbnRlcmFjdGlvbiA9IG9sSW50ZXJhY3Rpb247XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIElmIG5vIGRyYWcgYm94IGludGVyYWN0aW9uIGlzIGZvdW5kLCBjcmVhdGUgYSBuZXcgb25lIGFuZCBhZGQgaXQgdG8gdGhlIG1hcFxyXG4gICAgaWYgKG9sRHJhZ1NlbGVjdEludGVyYWN0aW9uID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgb2xEcmFnU2VsZWN0SW50ZXJhY3Rpb24gPSBuZXcgT2xEcmFnU2VsZWN0SW50ZXJhY3Rpb24oe1xyXG4gICAgICAgIGNvbmRpdGlvbjogY3RybEtleURvd25cclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMubWFwLm9sLmFkZEludGVyYWN0aW9uKG9sRHJhZ1NlbGVjdEludGVyYWN0aW9uKTtcclxuICAgICAgdGhpcy5vbERyYWdTZWxlY3RJbnRlcmFjdGlvbiA9IG9sRHJhZ1NlbGVjdEludGVyYWN0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub2xEcmFnU2VsZWN0SW50ZXJhY3Rpb25FbmRLZXkgPSBvbERyYWdTZWxlY3RJbnRlcmFjdGlvbi5vbihcclxuICAgICAgJ2JveGVuZCcsXHJcbiAgICAgIChldmVudDogT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50KSA9PiB0aGlzLm9uRHJhZ0JveEVuZChldmVudClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgZHJhZyBib3ggaW50ZXJhY3Rpb25cclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZURyYWdCb3hJbnRlcmFjdGlvbigpIHtcclxuICAgIGlmICh0aGlzLm9sRHJhZ1NlbGVjdEludGVyYWN0aW9uRW5kS2V5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdW5CeUtleSh0aGlzLm9sRHJhZ1NlbGVjdEludGVyYWN0aW9uRW5kS2V5KTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLm9sRHJhZ1NlbGVjdEludGVyYWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5tYXAub2wucmVtb3ZlSW50ZXJhY3Rpb24odGhpcy5vbERyYWdTZWxlY3RJbnRlcmFjdGlvbik7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9sRHJhZ1NlbGVjdEludGVyYWN0aW9uID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gZHJhZ2JveCBlbmQsIHNlbGVjdCBmZWF0dXJlcyBpbiBkcmFnIGJveFxyXG4gICAqIEBwYXJhbSBldmVudCBPTCBNYXBCcm93c2VyUG9pbnRlckV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkRyYWdCb3hFbmQoZXZlbnQ6IE9sRHJhZ0JveEV2ZW50KSB7XHJcbiAgICBjb25zdCBleGNsdXNpdmUgPSAhY3RybEtleURvd24oZXZlbnQubWFwQnJvd3NlckV2ZW50KTtcclxuICAgIGNvbnN0IGV4dGVudCA9IGV2ZW50LnRhcmdldC5nZXRHZW9tZXRyeSgpLmdldEV4dGVudCgpO1xyXG4gICAgY29uc3Qgb2xGZWF0dXJlcyA9IHRoaXMuc3RvcmVzLnJlZHVjZSgoYWNjOiBPbEZlYXR1cmVbXSwgc3RvcmU6IEZlYXR1cmVTdG9yZSkgPT4ge1xyXG4gICAgICBjb25zdCBvbFNvdXJjZSA9IHN0b3JlLmxheWVyLm9sLmdldFNvdXJjZSgpO1xyXG4gICAgICBhY2MucHVzaCguLi5vbFNvdXJjZS5nZXRGZWF0dXJlc0luRXh0ZW50KGV4dGVudCkpO1xyXG4gICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSwgW10pO1xyXG4gICAgdGhpcy5vblNlbGVjdEZyb21NYXAob2xGZWF0dXJlcywgZXhjbHVzaXZlLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGZlYXR1cmVzIGFyZSBzZWxlY3RlZCBmcm9tIHRoZSBzdG9yZSwgYWRkXHJcbiAgICogdGhlbSB0byB0aGlzIHN0YXJ0ZWd5J3Mgb3ZlcmxheSBsYXllciAoc2VsZWN0IG9uIG1hcClcclxuICAgKiBAcGFyYW0gZmVhdHVyZXMgU3RvcmUgZmVhdHVyZXNcclxuICAgKi9cclxuICBwcml2YXRlIG9uU2VsZWN0RnJvbVN0b3JlKGZlYXR1cmVzOiBGZWF0dXJlW10pIHtcclxuICAgIGNvbnN0IG1vdGlvbiA9IHRoaXMubW90aW9uO1xyXG4gICAgY29uc3Qgb2xPdmVybGF5RmVhdHVyZXMgPSB0aGlzLm92ZXJsYXlTdG9yZS5sYXllci5vbC5nZXRTb3VyY2UoKS5nZXRGZWF0dXJlcygpO1xyXG4gICAgY29uc3Qgb3ZlcmxheUZlYXR1cmVzS2V5cyA9IG9sT3ZlcmxheUZlYXR1cmVzLm1hcCgob2xGZWF0dXJlOiBPbEZlYXR1cmUpID0+IG9sRmVhdHVyZS5nZXRJZCgpKTtcclxuICAgIGNvbnN0IGZlYXR1cmVzS2V5cyA9IGZlYXR1cmVzLm1hcCh0aGlzLm92ZXJsYXlTdG9yZS5nZXRLZXkpO1xyXG5cclxuICAgIGxldCBkb01vdGlvbjtcclxuICAgIGlmIChmZWF0dXJlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgZG9Nb3Rpb24gPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRvTW90aW9uID0gb3ZlcmxheUZlYXR1cmVzS2V5cy5sZW5ndGggIT09IGZlYXR1cmVzS2V5cy5sZW5ndGggfHxcclxuICAgICAgICAhb3ZlcmxheUZlYXR1cmVzS2V5cy5ldmVyeSgoa2V5OiBFbnRpdHlLZXkpID0+IGZlYXR1cmVzS2V5cy5pbmRleE9mKGtleSkgPj0gMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vdmVybGF5U3RvcmUuc2V0TGF5ZXJGZWF0dXJlcyhcclxuICAgICAgZmVhdHVyZXMsXHJcbiAgICAgIGRvTW90aW9uID8gbW90aW9uIDogRmVhdHVyZU1vdGlvbi5Ob25lLFxyXG4gICAgICB0aGlzLm9wdGlvbnMudmlld1NjYWxlLFxyXG4gICAgICB0aGlzLm9wdGlvbnMuYXJlYVJhdGlvLFxyXG4gICAgICB0aGlzLm9wdGlvbnMuZ2V0RmVhdHVyZUlkXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBmZWF0dXJlcyBhcmUgc2VsZWN0ZWQgZnJvbSB0aGUgbWFwLCBhbHNvIHNlbGVjdCB0aGVtXHJcbiAgICogaW4gdGhlaXIgc3RvcmUuXHJcbiAgICogQHBhcmFtIG9sRmVhdHVyZXMgT0wgZmVhdHVyZSBvYmplY3RzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvblNlbGVjdEZyb21NYXAob2xGZWF0dXJlczogT2xGZWF0dXJlW10sIGV4Y2x1c2l2ZTogYm9vbGVhbiwgcmV2ZXJzZTogYm9vbGVhbikge1xyXG4gICAgY29uc3QgZ3JvdXBlZEZlYXR1cmVzID0gdGhpcy5ncm91cEZlYXR1cmVzQnlTdG9yZShvbEZlYXR1cmVzKTtcclxuXHJcbiAgICB0aGlzLnN0b3Jlcy5mb3JFYWNoKChzdG9yZTogRmVhdHVyZVN0b3JlKSA9PiB7XHJcbiAgICAgIGNvbnN0IGZlYXR1cmVzID0gZ3JvdXBlZEZlYXR1cmVzLmdldChzdG9yZSk7XHJcbiAgICAgIGlmIChmZWF0dXJlcyA9PT0gdW5kZWZpbmVkICYmIGV4Y2x1c2l2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMudW5zZWxlY3RBbGxGZWF0dXJlc0Zyb21TdG9yZShzdG9yZSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoZmVhdHVyZXMgPT09IHVuZGVmaW5lZCAmJiBleGNsdXNpdmUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgLy8gRG8gbm90aGluZ1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0RmVhdHVyZXNGcm9tU3RvcmUoc3RvcmUsIGZlYXR1cmVzLCBleGNsdXNpdmUsIHJldmVyc2UpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlbGVjdCBmZWF0dXJlcyBpbiBzdG9yZVxyXG4gICAqIEBwYXJhbSBzdG9yZTogRmVhdHVyZSBzdG9yZVxyXG4gICAqIEBwYXJhbSBmZWF0dXJlcyBGZWF0dXJlc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgc2VsZWN0RmVhdHVyZXNGcm9tU3RvcmUoc3RvcmU6IEZlYXR1cmVTdG9yZSwgZmVhdHVyZXM6IEZlYXR1cmVbXSwgZXhjbHVzaXZlOiBib29sZWFuLCByZXZlcnNlOiBib29sZWFuKSB7XHJcbiAgICBpZiAocmV2ZXJzZSA9PT0gdHJ1ZSkge1xyXG4gICAgICBzdG9yZS5zdGF0ZS5yZXZlcnNlTWFueShmZWF0dXJlcywgWydzZWxlY3RlZCddKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN0b3JlLnN0YXRlLnVwZGF0ZU1hbnkoZmVhdHVyZXMsIHtzZWxlY3RlZDogdHJ1ZX0sIGV4Y2x1c2l2ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbnNlbGVjdCBhbGwgZmVhdHVyZXMgZnJvbSBzdG9yZVxyXG4gICAqIEBwYXJhbSBzdG9yZTogRmVhdHVyZSBzdG9yZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgdW5zZWxlY3RBbGxGZWF0dXJlc0Zyb21TdG9yZShzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBzdG9yZS5zdGF0ZS51cGRhdGVBbGwoe3NlbGVjdGVkOiBmYWxzZX0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBtZXRob2QgcmV0dXJucyBhIHN0b3JlIC0+IGZlYXR1cmVzIG1hcHBpbmcgZnJvbSBhIGxpc3RcclxuICAgKiBvZiBPTCBzZWxlY3RlZCBmZWF0dXJlcy4gT0wgZmVhdHVyZXMga2VlcCBhIHJlZmVyZW5jZSB0byB0aGUgc3RvcmVcclxuICAgKiB0aGV5IGFyZSBmcm9tLlxyXG4gICAqIEBwYXJhbSBvbEZlYXR1cmVzOiBPTCBmZWF0dXJlIG9iamVjdHNcclxuICAgKiBAcmV0dXJucyBTdG9yZSAtPiBmZWF0dXJlcyBtYXBwaW5nXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBncm91cEZlYXR1cmVzQnlTdG9yZShvbEZlYXR1cmVzOiBPbEZlYXR1cmVbXSk6IE1hcDxGZWF0dXJlU3RvcmUsIEZlYXR1cmVbXT4ge1xyXG4gICAgY29uc3QgZ3JvdXBlZEZlYXR1cmVzID0gbmV3IE1hcDxGZWF0dXJlU3RvcmUsIEZlYXR1cmVbXT4oKTtcclxuICAgIGlmIChvbEZlYXR1cmVzID09PSBudWxsIHx8IG9sRmVhdHVyZXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gZ3JvdXBlZEZlYXR1cmVzO1xyXG4gICAgfVxyXG5cclxuICAgIG9sRmVhdHVyZXMuZm9yRWFjaCgob2xGZWF0dXJlOiBPbEZlYXR1cmUpID0+IHtcclxuICAgICAgY29uc3Qgc3RvcmUgPSBvbEZlYXR1cmUuZ2V0KCdfZmVhdHVyZVN0b3JlJyk7XHJcbiAgICAgIGlmIChzdG9yZSA9PT0gdW5kZWZpbmVkKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgbGV0IGZlYXR1cmVzID0gZ3JvdXBlZEZlYXR1cmVzLmdldChzdG9yZSk7XHJcbiAgICAgIGlmIChmZWF0dXJlcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgZmVhdHVyZXMgPSBbXTtcclxuICAgICAgICBncm91cGVkRmVhdHVyZXMuc2V0KHN0b3JlLCBmZWF0dXJlcyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGZlYXR1cmUgPSBzdG9yZS5nZXQob2xGZWF0dXJlLmdldElkKCkpO1xyXG4gICAgICBpZiAoZmVhdHVyZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgZmVhdHVyZXMucHVzaChmZWF0dXJlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGdyb3VwZWRGZWF0dXJlcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhbiBvdmVybGF5IHN0b3JlIHRoYXQnbGwgY29udGFpbiB0aGUgc2VsZWN0ZWQgZmVhdHVyZXMuXHJcbiAgICogQHJldHVybnMgT3ZlcmxheSBzdG9yZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgY3JlYXRlT3ZlcmxheVN0b3JlKCk6IEZlYXR1cmVTdG9yZSB7XHJcbiAgICBjb25zdCBvdmVybGF5TGF5ZXIgPSB0aGlzLm9wdGlvbnMubGF5ZXJcclxuICAgICAgPyB0aGlzLm9wdGlvbnMubGF5ZXJcclxuICAgICAgOiB0aGlzLmNyZWF0ZU92ZXJsYXlMYXllcigpO1xyXG4gICAgcmV0dXJuIG5ldyBGZWF0dXJlU3RvcmUoW10sIHttYXA6IHRoaXMubWFwfSkuYmluZExheWVyKG92ZXJsYXlMYXllcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYW4gb3ZlcmxheSBzdG9yZSB0aGF0J2xsIGNvbnRhaW4gdGhlIHNlbGVjdGVkIGZlYXR1cmVzLlxyXG4gICAqIEByZXR1cm5zIE92ZXJsYXkgbGF5ZXJcclxuICAgKi9cclxuICBwcml2YXRlIGNyZWF0ZU92ZXJsYXlMYXllcigpOiBWZWN0b3JMYXllciB7XHJcbiAgICByZXR1cm4gbmV3IFZlY3RvckxheWVyKHtcclxuICAgICAgekluZGV4OiAzMDAsXHJcbiAgICAgIHNvdXJjZTogbmV3IEZlYXR1cmVEYXRhU291cmNlKCksXHJcbiAgICAgIHN0eWxlOiB1bmRlZmluZWQsXHJcbiAgICAgIHNob3dJbkxheWVyTGlzdDogZmFsc2UsXHJcbiAgICAgIGV4cG9ydGFibGU6IGZhbHNlLFxyXG4gICAgICBicm93c2FibGU6IGZhbHNlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCB0aGUgb3ZlcmxheSBzdG9yZSdzIGxheWVyIHRvIHRoZSBtYXAgdG8gZGlzcGxheSB0aGUgc2VsZWN0ZWRcclxuICAgKiBmZWF0dXJlcy5cclxuICAgKi9cclxuICBwcml2YXRlIGFkZE92ZXJsYXlMYXllcigpIHtcclxuICAgIGlmICh0aGlzLm92ZXJsYXlTdG9yZS5sYXllci5tYXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm1hcC5hZGRMYXllcih0aGlzLm92ZXJsYXlTdG9yZS5sYXllcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgdGhlIG92ZXJsYXkgbGF5ZXIgZnJvbSB0aGUgbWFwXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZW1vdmVPdmVybGF5TGF5ZXIoKSB7XHJcbiAgICB0aGlzLm92ZXJsYXlTdG9yZS5zb3VyY2Uub2wuY2xlYXIoKTtcclxuICAgIHRoaXMubWFwLnJlbW92ZUxheWVyKHRoaXMub3ZlcmxheVN0b3JlLmxheWVyKTtcclxuICB9XHJcbn1cclxuIl19