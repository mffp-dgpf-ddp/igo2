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
     * @return {?}
     */
    clear() {
        this.overlayStore.source.ol.clear();
        this.overlayStore.clear();
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
        this.unlistenToMapClick();
        this.removeDragBoxInteraction();
        this.unwatchAll();
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
        this.stores$$ = combineLatest(...stores$)
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
        const motion = this.options ? this.options.motion : undefined;
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
    FeatureStoreSelectionStrategy.prototype._overlayStore;
    /**
     * @type {?}
     * @protected
     */
    FeatureStoreSelectionStrategy.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ZlYXR1cmUvc2hhcmVkL3N0cmF0ZWdpZXMvc2VsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLG9CQUFvQixNQUFNLHdCQUF3QixDQUFDO0FBSTFELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFeEMsT0FBTyxFQUFnQixhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekQsT0FBTyxFQUEyQixtQkFBbUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUU1RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFVLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUduRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRCxNQUFNLHVCQUF3QixTQUFRLG9CQUFvQjs7OztJQUN4RCxZQUFZLE9BQU87UUFDakIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7Q0FDRjs7Ozs7Ozs7Ozs7QUFZRCxNQUFNLE9BQU8sNkJBQThCLFNBQVEsbUJBQW1COzs7O0lBNkJwRSxZQUFzQixPQUE2QztRQUNqRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFESyxZQUFPLEdBQVAsT0FBTyxDQUFzQztRQUVqRSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQ2pELENBQUM7Ozs7O0lBWkQsSUFBSSxHQUFHLEtBQWEsT0FBTyxJ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SUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM1QztJQUNILENBQUM7Ozs7OztJQUtPLGtCQUFrQjtRQUN4QixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDO0NBQ0Y7Ozs7Ozs7O0lBcFhDLHlEQUEyQzs7Ozs7SUFFM0MsZ0VBQXlEOzs7OztJQUV6RCxzRUFBOEM7Ozs7OztJQUs5QyxpREFBK0I7Ozs7O0lBWS9CLHNEQUFvQzs7Ozs7SUFFeEIsZ0RBQXVEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuaW1wb3J0IE9sRHJhZ0JveEludGVyYWN0aW9uIGZyb20gJ29sL2ludGVyYWN0aW9uL0RyYWdCb3gnO1xyXG5pbXBvcnQgeyBEcmFnQm94RXZlbnQgYXMgT2xEcmFnQm94RXZlbnQgfSBmcm9tICdvbC9pbnRlcmFjdGlvbi9EcmFnQm94JztcclxuaW1wb3J0IHsgTGlzdGVuZXJGdW5jdGlvbiB9IGZyb20gJ29sL2V2ZW50cyc7XHJcbmltcG9ydCB7IE1hcEJyb3dzZXJQb2ludGVyRXZlbnQgYXMgT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50IH0gZnJvbSAnb2wvTWFwQnJvd3NlckV2ZW50JztcclxuaW1wb3J0IHsgdW5CeUtleSB9IGZyb20gJ29sL09ic2VydmFibGUnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBjb21iaW5lTGF0ZXN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCwgZGVib3VuY2VUaW1lLCBza2lwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgRW50aXR5S2V5LCBFbnRpdHlSZWNvcmQsIEVudGl0eVN0b3JlU3RyYXRlZ3kgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgVmVjdG9yTGF5ZXIgfSBmcm9tICcuLi8uLi8uLi9sYXllcic7XHJcbmltcG9ydCB7IElnb01hcCwgY3RybEtleURvd24gfSBmcm9tICcuLi8uLi8uLi9tYXAnO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZSwgRmVhdHVyZVN0b3JlU2VsZWN0aW9uU3RyYXRlZ3lPcHRpb25zIH0gZnJvbSAnLi4vZmVhdHVyZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgRmVhdHVyZVN0b3JlIH0gZnJvbSAnLi4vc3RvcmUnO1xyXG5pbXBvcnQgeyBGZWF0dXJlTW90aW9uIH0gZnJvbSAnLi4vZmVhdHVyZS5lbnVtcyc7XHJcblxyXG5jbGFzcyBPbERyYWdTZWxlY3RJbnRlcmFjdGlvbiBleHRlbmRzIE9sRHJhZ0JveEludGVyYWN0aW9uIHtcclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGlzIHN0cmF0ZWd5IHN5bmNocm9uaXplcyBhIHN0b3JlIGFuZCBhIGxheWVyIHNlbGVjdGVkIGVudGl0aWVzLlxyXG4gKiBUaGUgc3RvcmUgPC0+IGxheWVyIGJpbmRpbmcgaXMgYSB0d28td2F5IGJpbmRpbmcuXHJcbiAqXHJcbiAqIEluIG1hbnkgY2FzZXMsIGEgc2luZ2xlIHN0cmF0ZWd5IGJvdW5kIHRvIG11bHRpcGxlIHN0b3Jlc1xyXG4gKiB3aWxsIHlpZWxkIGJldHRlciByZXN1bHRzIHRoYXQgbXVsdGlwbGUgc3RyYXRlZ2llcyB3aXRoIGVhY2ggdGhlaXJcclxuICogb3duIHN0b3JlLiBJbiB0aGUgbGF0dGVyIHNjZW5hcmlvLCBhIGNsaWNrIG9uIG92ZXJsYXBwaW5nIGZlYXR1cmVzXHJcbiAqIHdvdWxkIHRyaWdnZXIgdGhlIHN0cmF0ZWd5IG9mIGVhY2ggbGF5ZXIgYW5kIHRoZXkgd291bGQgY2FuY2VsXHJcbiAqIGVhY2ggb3RoZXIgYXMgd2VsbCBhcyBtb3ZlIHRoZSBtYXAgdmlldyBhcm91bmQgbmVlZGxlc3NseS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneSBleHRlbmRzIEVudGl0eVN0b3JlU3RyYXRlZ3kge1xyXG5cclxuICAvKipcclxuICAgKiBMaXN0ZW5lciB0byB0aGUgbWFwIGNsaWNrIGV2ZW50IHRoYXQgYWxsb3dzIHNlbGVjdGluZyBhIGZlYXR1cmVcclxuICAgKiBieSBjbGlja2luZyBvbiB0aGUgbWFwXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBtYXBDbGlja0xpc3RlbmVyOiBMaXN0ZW5lckZ1bmN0aW9uO1xyXG5cclxuICBwcml2YXRlIG9sRHJhZ1NlbGVjdEludGVyYWN0aW9uOiBPbERyYWdTZWxlY3RJbnRlcmFjdGlvbjtcclxuXHJcbiAgcHJpdmF0ZSBvbERyYWdTZWxlY3RJbnRlcmFjdGlvbkVuZEtleTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gYWxsIHN0b3JlcyBzZWxlY3RlZCBlbnRpdGllc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RvcmVzJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG1hcCB0aGUgbGF5ZXJzIGJlbG9uZyB0b1xyXG4gICAqL1xyXG4gIGdldCBtYXAoKTogSWdvTWFwIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5tYXA7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogQSBmZWF0dXJlIHN0b3JlIHRoYXQnbGwgY29udGFpbiB0aGUgc2VsZWN0ZWQgZmVhdHVyZXMuIEl0IGhhcyBpdCdzIG93blxyXG4gICAqIGxheWVyLCBzaGFyZWQgYnkgYWxsIHRoZSBzdG9yZXMgdGhpcyBzdGFyZXRneSBpcyBib3VuZCB0by5cclxuICAgKi9cclxuICBnZXQgb3ZlcmxheVN0b3JlKCk6IEZlYXR1cmVTdG9yZSB7IHJldHVybiB0aGlzLl9vdmVybGF5U3RvcmU7IH1cclxuICBwcml2YXRlIF9vdmVybGF5U3RvcmU6IEZlYXR1cmVTdG9yZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIG9wdGlvbnM6IEZlYXR1cmVTdG9yZVNlbGVjdGlvblN0cmF0ZWd5T3B0aW9ucykge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICB0aGlzLl9vdmVybGF5U3RvcmUgPSB0aGlzLmNyZWF0ZU92ZXJsYXlTdG9yZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQmluZCB0aGlzIHN0cmF0ZWd5IHRvIGEgc3RvcmUgYW5kIGZvcmNlIHRoaXMgc3RyYXRlZ3knc1xyXG4gICAqIHJlYWN0aXZhdGlvbiB0byBwcm9wZXJseSBzZXR1cCB3YXRjaGVycy5cclxuICAgKiBAcGFyYW0gc3RvcmUgRmVhdHVyZSBzdG9yZVxyXG4gICAqL1xyXG4gIGJpbmRTdG9yZShzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBzdXBlci5iaW5kU3RvcmUoc3RvcmUpO1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlID09PSB0cnVlKSB7XHJcbiAgICAgIC8vIEZvcmNlIHJlYWN0aXZhdGlvblxyXG4gICAgICB0aGlzLmFjdGl2YXRlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbmJpbmQgdGhpcyBzdHJhdGVneSBmcm9tIGEgc3RvcmUgYW5kIGZvcmNlIHRoaXMgc3RyYXRlZ3knc1xyXG4gICAqIHJlYWN0aXZhdGlvbiB0byBwcm9wZXJseSBzZXR1cCB3YXRjaGVycy5cclxuICAgKiBAcGFyYW0gc3RvcmUgRmVhdHVyZSBzdG9yZVxyXG4gICAqL1xyXG4gIHVuYmluZFN0b3JlKHN0b3JlOiBGZWF0dXJlU3RvcmUpIHtcclxuICAgIHN1cGVyLnVuYmluZFN0b3JlKHN0b3JlKTtcclxuICAgIGlmICh0aGlzLmFjdGl2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAvLyBGb3JjZSByZWFjdGl2YXRpb25cclxuICAgICAgdGhpcy5hY3RpdmF0ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5zZWxlY3QgYWxsIGVudGl0aWVzLCBmcm9tIGFsbCBzdG9yZXNcclxuICAgKi9cclxuICB1bnNlbGVjdEFsbCgpIHtcclxuICAgIHRoaXMuc3RvcmVzLmZvckVhY2goKHN0b3JlOiBGZWF0dXJlU3RvcmUpID0+IHtcclxuICAgICAgc3RvcmUuc3RhdGUudXBkYXRlQWxsKHtzZWxlY3RlZDogZmFsc2V9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2xlYXIoKSB7XHJcbiAgICB0aGlzLm92ZXJsYXlTdG9yZS5zb3VyY2Uub2wuY2xlYXIoKTtcclxuICAgIHRoaXMub3ZlcmxheVN0b3JlLmNsZWFyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgdGhlIG92ZXJsYXkgbGF5ZXIsIHNldHVwIHRoZSBtYXAgY2xpY2sgbHNpdGVuZXIgYW5kXHJcbiAgICogc3RhcnQgd2F0Y2hpbmcgZm9yIHN0b3JlcyBzZWxlY3Rpb25cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgZG9BY3RpdmF0ZSgpIHtcclxuICAgIHRoaXMuYWRkT3ZlcmxheUxheWVyKCk7XHJcbiAgICB0aGlzLmxpc3RlblRvTWFwQ2xpY2soKTtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuZHJhZ0JveCA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmFkZERyYWdCb3hJbnRlcmFjdGlvbigpO1xyXG4gICAgfVxyXG4gICAgdGhpcy53YXRjaEFsbCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIHRoZSBvdmVybGF5IGxheWVyLCByZW1vdmUgdGhlIG1hcCBjbGljayBsc2l0ZW5lciBhbmRcclxuICAgKiBzdG9wIHdhdGNoaW5nIGZvciBzdG9yZXMgc2VsZWN0aW9uXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGRvRGVhY3RpdmF0ZSgpIHtcclxuICAgIHRoaXMudW5saXN0ZW5Ub01hcENsaWNrKCk7XHJcbiAgICB0aGlzLnJlbW92ZURyYWdCb3hJbnRlcmFjdGlvbigpO1xyXG4gICAgdGhpcy51bndhdGNoQWxsKCk7XHJcbiAgICB0aGlzLnJlbW92ZU92ZXJsYXlMYXllcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgc2luZ2xlIG9ic2VydmFibGUgb2YgYWxsIHRoZSBzdG9yZXMuIFdpdGggYSBzaW5nbGUgb2JzZXJ2YWJsZSxcclxuICAgKiBmZWF0dXJlcyBjYW4gYmUgYWRkZWQgYWxsIGF0IG9uY2UgdG8gdGhlIG92ZXJsYXkgbGF5ZXIgYW5kIGEgc2luZ2xlXHJcbiAgICogbW90aW9uIGNhbiBiZSBwZXJmb3JtZWQuIE11bHRpcGxlIG9ic2VydmFibGUgd291bGQgaGF2ZVxyXG4gICAqIGEgY2FuY2VsbGluZyBlZmZlY3Qgb24gZWFjaCBvdGhlci5cclxuICAgKi9cclxuICBwcml2YXRlIHdhdGNoQWxsKCkge1xyXG4gICAgdGhpcy51bndhdGNoQWxsKCk7XHJcblxyXG4gICAgY29uc3Qgc3RvcmVzJCA9IHRoaXMuc3RvcmVzLm1hcCgoc3RvcmU6IEZlYXR1cmVTdG9yZSkgPT4ge1xyXG4gICAgICByZXR1cm4gc3RvcmUuc3RhdGVWaWV3Lm1hbnlCeSQoKHJlY29yZDogRW50aXR5UmVjb3JkPEZlYXR1cmU+KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlY29yZC5zdGF0ZS5zZWxlY3RlZCA9PT0gdHJ1ZTtcclxuICAgICAgfSkucGlwZShcclxuICAgICAgICBtYXAoKHJlY29yZHM6IEVudGl0eVJlY29yZDxGZWF0dXJlPltdKSA9PiByZWNvcmRzLm1hcChyZWNvcmQgPT4gcmVjb3JkLmVudGl0eSkpXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc3RvcmVzJCQgPSBjb21iaW5lTGF0ZXN0KC4uLnN0b3JlcyQpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIGRlYm91bmNlVGltZSg1KSxcclxuICAgICAgICBza2lwKDEpLCAvLyBTa2lwIGludGlhbCBzZWxlY3Rpb25cclxuICAgICAgICBtYXAoKGZlYXR1cmVzOiBBcnJheTxGZWF0dXJlW10+KSA9PiBmZWF0dXJlcy5yZWR1Y2UoKGEsIGIpID0+IGEuY29uY2F0KGIpKSlcclxuICAgICAgKS5zdWJzY3JpYmUoKGZlYXR1cmVzOiBGZWF0dXJlW10pID0+IHRoaXMub25TZWxlY3RGcm9tU3RvcmUoZmVhdHVyZXMpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3Agd2F0Y2hpbmcgZm9yIHNlbGVjdGlvbiBpbiBhbGwgc3RvcmVzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgdW53YXRjaEFsbCgpIHtcclxuICAgIGlmICh0aGlzLnN0b3JlcyQkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5zdG9yZXMkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGEgJ3NpbmdsZWNsaWNrJyBsaXN0ZW5lciB0byB0aGUgbWFwIHRoYXQnbGwgYWxsb3cgc2VsZWN0aW5nXHJcbiAgICogZmVhdHVyZXMgYnkgY2xpY2tpbmcgb24gdGhlIG1hcC4gVGhlIHNlbGVjdGlvbiB3aWxsIGJlIHBlcmZvcm1lZFxyXG4gICAqIG9ubHkgb24gdGhlIGxheWVycyBib3VuZCB0byB0aGlzIHN0cmF0ZWd5LlxyXG4gICAqL1xyXG4gIHByaXZhdGUgbGlzdGVuVG9NYXBDbGljaygpIHtcclxuICAgIHRoaXMubWFwQ2xpY2tMaXN0ZW5lciA9IHRoaXMubWFwLm9sLm9uKCdzaW5nbGVjbGljaycsIChldmVudDogT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMub25NYXBDbGljayhldmVudCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSB0aGUgbWFwIGNsaWNrIGxpc3RlbmVyXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1bmxpc3RlblRvTWFwQ2xpY2soKSB7XHJcbiAgICBpZiAodGhpcy5tYXBDbGlja0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5tYXAub2wudW4oXHJcbiAgICAgICAgdGhpcy5tYXBDbGlja0xpc3RlbmVyLnR5cGUsXHJcbiAgICAgICAgdGhpcy5tYXBDbGlja0xpc3RlbmVyLmxpc3RlbmVyXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPbiBtYXAgY2xpY2ssIHNlbGVjdCBmZWF0dXJlIGF0IHBpeGVsXHJcbiAgICogQHBhcmFtIGV2ZW50IE9MIE1hcEJyb3dzZXJQb2ludGVyRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uTWFwQ2xpY2soZXZlbnQ6IE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCkge1xyXG4gICAgY29uc3QgZXhjbHVzaXZlID0gIWN0cmxLZXlEb3duKGV2ZW50KTtcclxuICAgIGNvbnN0IHJldmVyc2UgPSAhZXhjbHVzaXZlO1xyXG4gICAgY29uc3Qgb2xGZWF0dXJlcyA9IGV2ZW50Lm1hcC5nZXRGZWF0dXJlc0F0UGl4ZWwoZXZlbnQucGl4ZWwsIHtcclxuICAgICAgaGl0VG9sZXJhbmNlOiB0aGlzLm9wdGlvbnMuaGl0VG9sZXJhbmNlIHx8IDAsXHJcbiAgICAgIGxheWVyRmlsdGVyOiAob2xMYXllcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHN0b3JlT2xMYXllciA9IHRoaXMuc3RvcmVzLmZpbmQoKHN0b3JlOiBGZWF0dXJlU3RvcmUpID0+IHtcclxuICAgICAgICAgIHJldHVybiBzdG9yZS5sYXllci5vbCA9PT0gb2xMYXllcjtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc3RvcmVPbExheWVyICE9PSB1bmRlZmluZWQ7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5vblNlbGVjdEZyb21NYXAob2xGZWF0dXJlcywgZXhjbHVzaXZlLCByZXZlcnNlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhIGRyYWcgYm94IGludGVyYWN0aW9uIGFuZCwgb24gZHJhZyBib3ggZW5kLCBzZWxlY3QgZmVhdHVyZXNcclxuICAgKi9cclxuICBwcml2YXRlIGFkZERyYWdCb3hJbnRlcmFjdGlvbigpIHtcclxuICAgIGxldCBvbERyYWdTZWxlY3RJbnRlcmFjdGlvbjtcclxuICAgIGNvbnN0IG9sSW50ZXJhY3Rpb25zID0gdGhpcy5tYXAub2wuZ2V0SW50ZXJhY3Rpb25zKCkuZ2V0QXJyYXkoKTtcclxuXHJcbiAgICAvLyBUaGVyZSBjYW4gb25seSBiZSBvbmUgZHJhZ2JveCBpbnRlcmFjdGlvbiwgc28gZmluZCB0aGUgY3VycmVudCBvbmUsIGlmIGFueVxyXG4gICAgLy8gRG9uJ3Qga2VlcCBhIHJlZmVyZW5jZSB0byB0aGUgY3VycmVudCBkcmFnYm94IGJlY2F1c2Ugd2UgZG9uJ3Qgd2FudFxyXG4gICAgLy8gdG8gcmVtb3ZlIGl0IHdoZW4gdGhpcyBzdGFydGVneSBpcyBkZWFjdGl2YXRlZFxyXG4gICAgZm9yIChjb25zdCBvbEludGVyYWN0aW9uIG9mIG9sSW50ZXJhY3Rpb25zKSB7XHJcbiAgICAgIGlmIChvbEludGVyYWN0aW9uIGluc3RhbmNlb2YgT2xEcmFnU2VsZWN0SW50ZXJhY3Rpb24pIHtcclxuICAgICAgICBvbERyYWdTZWxlY3RJbnRlcmFjdGlvbiA9IG9sSW50ZXJhY3Rpb247XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIElmIG5vIGRyYWcgYm94IGludGVyYWN0aW9uIGlzIGZvdW5kLCBjcmVhdGUgYSBuZXcgb25lIGFuZCBhZGQgaXQgdG8gdGhlIG1hcFxyXG4gICAgaWYgKG9sRHJhZ1NlbGVjdEludGVyYWN0aW9uID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgb2xEcmFnU2VsZWN0SW50ZXJhY3Rpb24gPSBuZXcgT2xEcmFnU2VsZWN0SW50ZXJhY3Rpb24oe1xyXG4gICAgICAgIGNvbmRpdGlvbjogY3RybEtleURvd25cclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMubWFwLm9sLmFkZEludGVyYWN0aW9uKG9sRHJhZ1NlbGVjdEludGVyYWN0aW9uKTtcclxuICAgICAgdGhpcy5vbERyYWdTZWxlY3RJbnRlcmFjdGlvbiA9IG9sRHJhZ1NlbGVjdEludGVyYWN0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub2xEcmFnU2VsZWN0SW50ZXJhY3Rpb25FbmRLZXkgPSBvbERyYWdTZWxlY3RJbnRlcmFjdGlvbi5vbihcclxuICAgICAgJ2JveGVuZCcsXHJcbiAgICAgIChldmVudDogT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50KSA9PiB0aGlzLm9uRHJhZ0JveEVuZChldmVudClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgZHJhZyBib3ggaW50ZXJhY3Rpb25cclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZURyYWdCb3hJbnRlcmFjdGlvbigpIHtcclxuICAgIGlmICh0aGlzLm9sRHJhZ1NlbGVjdEludGVyYWN0aW9uRW5kS2V5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdW5CeUtleSh0aGlzLm9sRHJhZ1NlbGVjdEludGVyYWN0aW9uRW5kS2V5KTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLm9sRHJhZ1NlbGVjdEludGVyYWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5tYXAub2wucmVtb3ZlSW50ZXJhY3Rpb24odGhpcy5vbERyYWdTZWxlY3RJbnRlcmFjdGlvbik7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9sRHJhZ1NlbGVjdEludGVyYWN0aW9uID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gZHJhZ2JveCBlbmQsIHNlbGVjdCBmZWF0dXJlcyBpbiBkcmFnIGJveFxyXG4gICAqIEBwYXJhbSBldmVudCBPTCBNYXBCcm93c2VyUG9pbnRlckV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkRyYWdCb3hFbmQoZXZlbnQ6IE9sRHJhZ0JveEV2ZW50KSB7XHJcbiAgICBjb25zdCBleGNsdXNpdmUgPSAhY3RybEtleURvd24oZXZlbnQubWFwQnJvd3NlckV2ZW50KTtcclxuICAgIGNvbnN0IGV4dGVudCA9IGV2ZW50LnRhcmdldC5nZXRHZW9tZXRyeSgpLmdldEV4dGVudCgpO1xyXG4gICAgY29uc3Qgb2xGZWF0dXJlcyA9IHRoaXMuc3RvcmVzLnJlZHVjZSgoYWNjOiBPbEZlYXR1cmVbXSwgc3RvcmU6IEZlYXR1cmVTdG9yZSkgPT4ge1xyXG4gICAgICBjb25zdCBvbFNvdXJjZSA9IHN0b3JlLmxheWVyLm9sLmdldFNvdXJjZSgpO1xyXG4gICAgICBhY2MucHVzaCguLi5vbFNvdXJjZS5nZXRGZWF0dXJlc0luRXh0ZW50KGV4dGVudCkpO1xyXG4gICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSwgW10pO1xyXG4gICAgdGhpcy5vblNlbGVjdEZyb21NYXAob2xGZWF0dXJlcywgZXhjbHVzaXZlLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGZlYXR1cmVzIGFyZSBzZWxlY3RlZCBmcm9tIHRoZSBzdG9yZSwgYWRkXHJcbiAgICogdGhlbSB0byB0aGlzIHN0YXJ0ZWd5J3Mgb3ZlcmxheSBsYXllciAoc2VsZWN0IG9uIG1hcClcclxuICAgKiBAcGFyYW0gZmVhdHVyZXMgU3RvcmUgZmVhdHVyZXNcclxuICAgKi9cclxuICBwcml2YXRlIG9uU2VsZWN0RnJvbVN0b3JlKGZlYXR1cmVzOiBGZWF0dXJlW10pIHtcclxuICAgIGNvbnN0IG1vdGlvbiA9IHRoaXMub3B0aW9ucyA/IHRoaXMub3B0aW9ucy5tb3Rpb24gOiB1bmRlZmluZWQ7XHJcbiAgICBjb25zdCBvbE92ZXJsYXlGZWF0dXJlcyA9IHRoaXMub3ZlcmxheVN0b3JlLmxheWVyLm9sLmdldFNvdXJjZSgpLmdldEZlYXR1cmVzKCk7XHJcbiAgICBjb25zdCBvdmVybGF5RmVhdHVyZXNLZXlzID0gb2xPdmVybGF5RmVhdHVyZXMubWFwKChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4gb2xGZWF0dXJlLmdldElkKCkpO1xyXG4gICAgY29uc3QgZmVhdHVyZXNLZXlzID0gZmVhdHVyZXMubWFwKHRoaXMub3ZlcmxheVN0b3JlLmdldEtleSk7XHJcblxyXG4gICAgbGV0IGRvTW90aW9uO1xyXG4gICAgaWYgKGZlYXR1cmVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBkb01vdGlvbiA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZG9Nb3Rpb24gPSBvdmVybGF5RmVhdHVyZXNLZXlzLmxlbmd0aCAhPT0gZmVhdHVyZXNLZXlzLmxlbmd0aCB8fFxyXG4gICAgICAgICFvdmVybGF5RmVhdHVyZXNLZXlzLmV2ZXJ5KChrZXk6IEVudGl0eUtleSkgPT4gZmVhdHVyZXNLZXlzLmluZGV4T2Yoa2V5KSA+PSAwKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm92ZXJsYXlTdG9yZS5zZXRMYXllckZlYXR1cmVzKFxyXG4gICAgICBmZWF0dXJlcyxcclxuICAgICAgZG9Nb3Rpb24gPyBtb3Rpb24gOiBGZWF0dXJlTW90aW9uLk5vbmUsXHJcbiAgICAgIHRoaXMub3B0aW9ucy52aWV3U2NhbGUsXHJcbiAgICAgIHRoaXMub3B0aW9ucy5hcmVhUmF0aW8sXHJcbiAgICAgIHRoaXMub3B0aW9ucy5nZXRGZWF0dXJlSWRcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGZlYXR1cmVzIGFyZSBzZWxlY3RlZCBmcm9tIHRoZSBtYXAsIGFsc28gc2VsZWN0IHRoZW1cclxuICAgKiBpbiB0aGVpciBzdG9yZS5cclxuICAgKiBAcGFyYW0gb2xGZWF0dXJlcyBPTCBmZWF0dXJlIG9iamVjdHNcclxuICAgKi9cclxuICBwcml2YXRlIG9uU2VsZWN0RnJvbU1hcChvbEZlYXR1cmVzOiBPbEZlYXR1cmVbXSwgZXhjbHVzaXZlOiBib29sZWFuLCByZXZlcnNlOiBib29sZWFuKSB7XHJcbiAgICBjb25zdCBncm91cGVkRmVhdHVyZXMgPSB0aGlzLmdyb3VwRmVhdHVyZXNCeVN0b3JlKG9sRmVhdHVyZXMpO1xyXG5cclxuICAgIHRoaXMuc3RvcmVzLmZvckVhY2goKHN0b3JlOiBGZWF0dXJlU3RvcmUpID0+IHtcclxuICAgICAgY29uc3QgZmVhdHVyZXMgPSBncm91cGVkRmVhdHVyZXMuZ2V0KHN0b3JlKTtcclxuICAgICAgaWYgKGZlYXR1cmVzID09PSB1bmRlZmluZWQgJiYgZXhjbHVzaXZlID09PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy51bnNlbGVjdEFsbEZlYXR1cmVzRnJvbVN0b3JlKHN0b3JlKTtcclxuICAgICAgfSBlbHNlIGlmIChmZWF0dXJlcyA9PT0gdW5kZWZpbmVkICYmIGV4Y2x1c2l2ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAvLyBEbyBub3RoaW5nXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RGZWF0dXJlc0Zyb21TdG9yZShzdG9yZSwgZmVhdHVyZXMsIGV4Y2x1c2l2ZSwgcmV2ZXJzZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VsZWN0IGZlYXR1cmVzIGluIHN0b3JlXHJcbiAgICogQHBhcmFtIHN0b3JlOiBGZWF0dXJlIHN0b3JlXHJcbiAgICogQHBhcmFtIGZlYXR1cmVzIEZlYXR1cmVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZWxlY3RGZWF0dXJlc0Zyb21TdG9yZShzdG9yZTogRmVhdHVyZVN0b3JlLCBmZWF0dXJlczogRmVhdHVyZVtdLCBleGNsdXNpdmU6IGJvb2xlYW4sIHJldmVyc2U6IGJvb2xlYW4pIHtcclxuICAgIGlmIChyZXZlcnNlID09PSB0cnVlKSB7XHJcbiAgICAgIHN0b3JlLnN0YXRlLnJldmVyc2VNYW55KGZlYXR1cmVzLCBbJ3NlbGVjdGVkJ10pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3RvcmUuc3RhdGUudXBkYXRlTWFueShmZWF0dXJlcywge3NlbGVjdGVkOiB0cnVlfSwgZXhjbHVzaXZlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuc2VsZWN0IGFsbCBmZWF0dXJlcyBmcm9tIHN0b3JlXHJcbiAgICogQHBhcmFtIHN0b3JlOiBGZWF0dXJlIHN0b3JlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1bnNlbGVjdEFsbEZlYXR1cmVzRnJvbVN0b3JlKHN0b3JlOiBGZWF0dXJlU3RvcmUpIHtcclxuICAgIHN0b3JlLnN0YXRlLnVwZGF0ZUFsbCh7c2VsZWN0ZWQ6IGZhbHNlfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIGEgc3RvcmUgLT4gZmVhdHVyZXMgbWFwcGluZyBmcm9tIGEgbGlzdFxyXG4gICAqIG9mIE9MIHNlbGVjdGVkIGZlYXR1cmVzLiBPTCBmZWF0dXJlcyBrZWVwIGEgcmVmZXJlbmNlIHRvIHRoZSBzdG9yZVxyXG4gICAqIHRoZXkgYXJlIGZyb20uXHJcbiAgICogQHBhcmFtIG9sRmVhdHVyZXM6IE9MIGZlYXR1cmUgb2JqZWN0c1xyXG4gICAqIEByZXR1cm5zIFN0b3JlIC0+IGZlYXR1cmVzIG1hcHBpbmdcclxuICAgKi9cclxuICBwcml2YXRlIGdyb3VwRmVhdHVyZXNCeVN0b3JlKG9sRmVhdHVyZXM6IE9sRmVhdHVyZVtdKTogTWFwPEZlYXR1cmVTdG9yZSwgRmVhdHVyZVtdPiB7XHJcbiAgICBjb25zdCBncm91cGVkRmVhdHVyZXMgPSBuZXcgTWFwPEZlYXR1cmVTdG9yZSwgRmVhdHVyZVtdPigpO1xyXG4gICAgaWYgKG9sRmVhdHVyZXMgPT09IG51bGwgfHwgb2xGZWF0dXJlcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiBncm91cGVkRmVhdHVyZXM7XHJcbiAgICB9XHJcblxyXG4gICAgb2xGZWF0dXJlcy5mb3JFYWNoKChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4ge1xyXG4gICAgICBjb25zdCBzdG9yZSA9IG9sRmVhdHVyZS5nZXQoJ19mZWF0dXJlU3RvcmUnKTtcclxuICAgICAgaWYgKHN0b3JlID09PSB1bmRlZmluZWQpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICBsZXQgZmVhdHVyZXMgPSBncm91cGVkRmVhdHVyZXMuZ2V0KHN0b3JlKTtcclxuICAgICAgaWYgKGZlYXR1cmVzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBmZWF0dXJlcyA9IFtdO1xyXG4gICAgICAgIGdyb3VwZWRGZWF0dXJlcy5zZXQoc3RvcmUsIGZlYXR1cmVzKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgZmVhdHVyZSA9IHN0b3JlLmdldChvbEZlYXR1cmUuZ2V0SWQoKSk7XHJcbiAgICAgIGlmIChmZWF0dXJlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBmZWF0dXJlcy5wdXNoKGZlYXR1cmUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZ3JvdXBlZEZlYXR1cmVzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGFuIG92ZXJsYXkgc3RvcmUgdGhhdCdsbCBjb250YWluIHRoZSBzZWxlY3RlZCBmZWF0dXJlcy5cclxuICAgKiBAcmV0dXJucyBPdmVybGF5IHN0b3JlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjcmVhdGVPdmVybGF5U3RvcmUoKTogRmVhdHVyZVN0b3JlIHtcclxuICAgIGNvbnN0IG92ZXJsYXlMYXllciA9IHRoaXMub3B0aW9ucy5sYXllclxyXG4gICAgICA/IHRoaXMub3B0aW9ucy5sYXllclxyXG4gICAgICA6IHRoaXMuY3JlYXRlT3ZlcmxheUxheWVyKCk7XHJcbiAgICByZXR1cm4gbmV3IEZlYXR1cmVTdG9yZShbXSwge21hcDogdGhpcy5tYXB9KS5iaW5kTGF5ZXIob3ZlcmxheUxheWVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhbiBvdmVybGF5IHN0b3JlIHRoYXQnbGwgY29udGFpbiB0aGUgc2VsZWN0ZWQgZmVhdHVyZXMuXHJcbiAgICogQHJldHVybnMgT3ZlcmxheSBsYXllclxyXG4gICAqL1xyXG4gIHByaXZhdGUgY3JlYXRlT3ZlcmxheUxheWVyKCk6IFZlY3RvckxheWVyIHtcclxuICAgIHJldHVybiBuZXcgVmVjdG9yTGF5ZXIoe1xyXG4gICAgICB6SW5kZXg6IDMwMCxcclxuICAgICAgc291cmNlOiBuZXcgRmVhdHVyZURhdGFTb3VyY2UoKSxcclxuICAgICAgc3R5bGU6IHVuZGVmaW5lZCxcclxuICAgICAgc2hvd0luTGF5ZXJMaXN0OiBmYWxzZSxcclxuICAgICAgZXhwb3J0YWJsZTogZmFsc2UsXHJcbiAgICAgIGJyb3dzYWJsZTogZmFsc2VcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIHRoZSBvdmVybGF5IHN0b3JlJ3MgbGF5ZXIgdG8gdGhlIG1hcCB0byBkaXNwbGF5IHRoZSBzZWxlY3RlZFxyXG4gICAqIGZlYXR1cmVzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkT3ZlcmxheUxheWVyKCkge1xyXG4gICAgaWYgKHRoaXMub3ZlcmxheVN0b3JlLmxheWVyLm1hcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMubWFwLmFkZExheWVyKHRoaXMub3ZlcmxheVN0b3JlLmxheWVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSB0aGUgb3ZlcmxheSBsYXllciBmcm9tIHRoZSBtYXBcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZU92ZXJsYXlMYXllcigpIHtcclxuICAgIHRoaXMub3ZlcmxheVN0b3JlLnNvdXJjZS5vbC5jbGVhcigpO1xyXG4gICAgdGhpcy5tYXAucmVtb3ZlTGF5ZXIodGhpcy5vdmVybGF5U3RvcmUubGF5ZXIpO1xyXG4gIH1cclxufVxyXG4iXX0=