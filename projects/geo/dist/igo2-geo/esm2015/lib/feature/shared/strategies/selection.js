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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ZlYXR1cmUvc2hhcmVkL3N0cmF0ZWdpZXMvc2VsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLG9CQUFvQixNQUFNLHdCQUF3QixDQUFDO0FBSTFELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFeEMsT0FBTyxFQUFnQixhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekQsT0FBTyxFQUEyQixtQkFBbUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUU1RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFVLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUduRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRCxNQUFNLHVCQUF3QixTQUFRLG9CQUFvQjs7OztJQUN4RCxZQUFZLE9BQU87UUFDakIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7Q0FDRjs7Ozs7Ozs7Ozs7QUFZRCxNQUFNLE9BQU8sNkJBQThCLFNBQVEsbUJBQW1COzs7O0lBNkJwRSxZQUFzQixPQUE2QztRQUNqRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFESyxZQUFPLEdBQVAsT0FBTyxDQUFzQztRQUVqRSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQ2pELENBQUM7Ozs7O0lBWkQsSUFBSSxHQUFHLEtBQWEsT0FBTyxJ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Q0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDNUM7SUFDSCxDQUFDOzs7Ozs7SUFLTyxrQkFBa0I7UUFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEQsQ0FBQztDQUNGOzs7Ozs7OztJQXBYQyx5REFBMkM7Ozs7O0lBRTNDLGdFQUF5RDs7Ozs7SUFFekQsc0VBQThDOzs7Ozs7SUFLOUMsaURBQStCOzs7OztJQVkvQixzREFBb0M7Ozs7O0lBRXhCLGdEQUF1RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBPbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCBPbERyYWdCb3hJbnRlcmFjdGlvbiBmcm9tICdvbC9pbnRlcmFjdGlvbi9EcmFnQm94JztcclxuaW1wb3J0IHsgRHJhZ0JveEV2ZW50IGFzIE9sRHJhZ0JveEV2ZW50IH0gZnJvbSAnb2wvaW50ZXJhY3Rpb24vRHJhZ0JveCc7XHJcbmltcG9ydCB7IExpc3RlbmVyRnVuY3Rpb24gfSBmcm9tICdvbC9ldmVudHMnO1xyXG5pbXBvcnQgeyBNYXBCcm93c2VyUG9pbnRlckV2ZW50IGFzIE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCB9IGZyb20gJ29sL01hcEJyb3dzZXJFdmVudCc7XHJcbmltcG9ydCB7IHVuQnlLZXkgfSBmcm9tICdvbC9PYnNlcnZhYmxlJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgY29tYmluZUxhdGVzdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAsIGRlYm91bmNlVGltZSwgc2tpcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IEVudGl0eUtleSwgRW50aXR5UmVjb3JkLCBFbnRpdHlTdG9yZVN0cmF0ZWd5IH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IEZlYXR1cmVEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IFZlY3RvckxheWVyIH0gZnJvbSAnLi4vLi4vLi4vbGF5ZXInO1xyXG5pbXBvcnQgeyBJZ29NYXAsIGN0cmxLZXlEb3duIH0gZnJvbSAnLi4vLi4vLi4vbWFwJztcclxuXHJcbmltcG9ydCB7IEZlYXR1cmUsIEZlYXR1cmVTdG9yZVNlbGVjdGlvblN0cmF0ZWd5T3B0aW9ucyB9IGZyb20gJy4uL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IEZlYXR1cmVTdG9yZSB9IGZyb20gJy4uL3N0b3JlJztcclxuaW1wb3J0IHsgRmVhdHVyZU1vdGlvbiB9IGZyb20gJy4uL2ZlYXR1cmUuZW51bXMnO1xyXG5cclxuY2xhc3MgT2xEcmFnU2VsZWN0SW50ZXJhY3Rpb24gZXh0ZW5kcyBPbERyYWdCb3hJbnRlcmFjdGlvbiB7XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogVGhpcyBzdHJhdGVneSBzeW5jaHJvbml6ZXMgYSBzdG9yZSBhbmQgYSBsYXllciBzZWxlY3RlZCBlbnRpdGllcy5cclxuICogVGhlIHN0b3JlIDwtPiBsYXllciBiaW5kaW5nIGlzIGEgdHdvLXdheSBiaW5kaW5nLlxyXG4gKlxyXG4gKiBJbiBtYW55IGNhc2VzLCBhIHNpbmdsZSBzdHJhdGVneSBib3VuZCB0byBtdWx0aXBsZSBzdG9yZXNcclxuICogd2lsbCB5aWVsZCBiZXR0ZXIgcmVzdWx0cyB0aGF0IG11bHRpcGxlIHN0cmF0ZWdpZXMgd2l0aCBlYWNoIHRoZWlyXHJcbiAqIG93biBzdG9yZS4gSW4gdGhlIGxhdHRlciBzY2VuYXJpbywgYSBjbGljayBvbiBvdmVybGFwcGluZyBmZWF0dXJlc1xyXG4gKiB3b3VsZCB0cmlnZ2VyIHRoZSBzdHJhdGVneSBvZiBlYWNoIGxheWVyIGFuZCB0aGV5IHdvdWxkIGNhbmNlbFxyXG4gKiBlYWNoIG90aGVyIGFzIHdlbGwgYXMgbW92ZSB0aGUgbWFwIHZpZXcgYXJvdW5kIG5lZWRsZXNzbHkuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRmVhdHVyZVN0b3JlU2VsZWN0aW9uU3RyYXRlZ3kgZXh0ZW5kcyBFbnRpdHlTdG9yZVN0cmF0ZWd5IHtcclxuXHJcbiAgLyoqXHJcbiAgICogTGlzdGVuZXIgdG8gdGhlIG1hcCBjbGljayBldmVudCB0aGF0IGFsbG93cyBzZWxlY3RpbmcgYSBmZWF0dXJlXHJcbiAgICogYnkgY2xpY2tpbmcgb24gdGhlIG1hcFxyXG4gICAqL1xyXG4gIHByaXZhdGUgbWFwQ2xpY2tMaXN0ZW5lcjogTGlzdGVuZXJGdW5jdGlvbjtcclxuXHJcbiAgcHJpdmF0ZSBvbERyYWdTZWxlY3RJbnRlcmFjdGlvbjogT2xEcmFnU2VsZWN0SW50ZXJhY3Rpb247XHJcblxyXG4gIHByaXZhdGUgb2xEcmFnU2VsZWN0SW50ZXJhY3Rpb25FbmRLZXk6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvIGFsbCBzdG9yZXMgc2VsZWN0ZWQgZW50aXRpZXNcclxuICAgKi9cclxuICBwcml2YXRlIHN0b3JlcyQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBtYXAgdGhlIGxheWVycyBiZWxvbmcgdG9cclxuICAgKi9cclxuICBnZXQgbWFwKCk6IElnb01hcCB7IHJldHVybiB0aGlzLm9wdGlvbnMubWFwOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZmVhdHVyZSBzdG9yZSB0aGF0J2xsIGNvbnRhaW4gdGhlIHNlbGVjdGVkIGZlYXR1cmVzLiBJdCBoYXMgaXQncyBvd25cclxuICAgKiBsYXllciwgc2hhcmVkIGJ5IGFsbCB0aGUgc3RvcmVzIHRoaXMgc3RhcmV0Z3kgaXMgYm91bmQgdG8uXHJcbiAgICovXHJcbiAgZ2V0IG92ZXJsYXlTdG9yZSgpOiBGZWF0dXJlU3RvcmUgeyByZXR1cm4gdGhpcy5fb3ZlcmxheVN0b3JlOyB9XHJcbiAgcHJpdmF0ZSBfb3ZlcmxheVN0b3JlOiBGZWF0dXJlU3RvcmU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBvcHRpb25zOiBGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneU9wdGlvbnMpIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgdGhpcy5fb3ZlcmxheVN0b3JlID0gdGhpcy5jcmVhdGVPdmVybGF5U3RvcmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEJpbmQgdGhpcyBzdHJhdGVneSB0byBhIHN0b3JlIGFuZCBmb3JjZSB0aGlzIHN0cmF0ZWd5J3NcclxuICAgKiByZWFjdGl2YXRpb24gdG8gcHJvcGVybHkgc2V0dXAgd2F0Y2hlcnMuXHJcbiAgICogQHBhcmFtIHN0b3JlIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICBiaW5kU3RvcmUoc3RvcmU6IEZlYXR1cmVTdG9yZSkge1xyXG4gICAgc3VwZXIuYmluZFN0b3JlKHN0b3JlKTtcclxuICAgIGlmICh0aGlzLmFjdGl2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAvLyBGb3JjZSByZWFjdGl2YXRpb25cclxuICAgICAgdGhpcy5hY3RpdmF0ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5iaW5kIHRoaXMgc3RyYXRlZ3kgZnJvbSBhIHN0b3JlIGFuZCBmb3JjZSB0aGlzIHN0cmF0ZWd5J3NcclxuICAgKiByZWFjdGl2YXRpb24gdG8gcHJvcGVybHkgc2V0dXAgd2F0Y2hlcnMuXHJcbiAgICogQHBhcmFtIHN0b3JlIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICB1bmJpbmRTdG9yZShzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBzdXBlci51bmJpbmRTdG9yZShzdG9yZSk7XHJcbiAgICBpZiAodGhpcy5hY3RpdmUgPT09IHRydWUpIHtcclxuICAgICAgLy8gRm9yY2UgcmVhY3RpdmF0aW9uXHJcbiAgICAgIHRoaXMuYWN0aXZhdGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuc2VsZWN0IGFsbCBlbnRpdGllcywgZnJvbSBhbGwgc3RvcmVzXHJcbiAgICovXHJcbiAgdW5zZWxlY3RBbGwoKSB7XHJcbiAgICB0aGlzLnN0b3Jlcy5mb3JFYWNoKChzdG9yZTogRmVhdHVyZVN0b3JlKSA9PiB7XHJcbiAgICAgIHN0b3JlLnN0YXRlLnVwZGF0ZUFsbCh7c2VsZWN0ZWQ6IGZhbHNlfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNsZWFyKCkge1xyXG4gICAgdGhpcy5vdmVybGF5U3RvcmUuc291cmNlLm9sLmNsZWFyKCk7XHJcbiAgICB0aGlzLm92ZXJsYXlTdG9yZS5jbGVhcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIHRoZSBvdmVybGF5IGxheWVyLCBzZXR1cCB0aGUgbWFwIGNsaWNrIGxzaXRlbmVyIGFuZFxyXG4gICAqIHN0YXJ0IHdhdGNoaW5nIGZvciBzdG9yZXMgc2VsZWN0aW9uXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGRvQWN0aXZhdGUoKSB7XHJcbiAgICB0aGlzLmFkZE92ZXJsYXlMYXllcigpO1xyXG4gICAgdGhpcy5saXN0ZW5Ub01hcENsaWNrKCk7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmRyYWdCb3ggPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5hZGREcmFnQm94SW50ZXJhY3Rpb24oKTtcclxuICAgIH1cclxuICAgIHRoaXMud2F0Y2hBbGwoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSB0aGUgb3ZlcmxheSBsYXllciwgcmVtb3ZlIHRoZSBtYXAgY2xpY2sgbHNpdGVuZXIgYW5kXHJcbiAgICogc3RvcCB3YXRjaGluZyBmb3Igc3RvcmVzIHNlbGVjdGlvblxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBkb0RlYWN0aXZhdGUoKSB7XHJcbiAgICB0aGlzLnVubGlzdGVuVG9NYXBDbGljaygpO1xyXG4gICAgdGhpcy5yZW1vdmVEcmFnQm94SW50ZXJhY3Rpb24oKTtcclxuICAgIHRoaXMudW53YXRjaEFsbCgpO1xyXG4gICAgdGhpcy5yZW1vdmVPdmVybGF5TGF5ZXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIHNpbmdsZSBvYnNlcnZhYmxlIG9mIGFsbCB0aGUgc3RvcmVzLiBXaXRoIGEgc2luZ2xlIG9ic2VydmFibGUsXHJcbiAgICogZmVhdHVyZXMgY2FuIGJlIGFkZGVkIGFsbCBhdCBvbmNlIHRvIHRoZSBvdmVybGF5IGxheWVyIGFuZCBhIHNpbmdsZVxyXG4gICAqIG1vdGlvbiBjYW4gYmUgcGVyZm9ybWVkLiBNdWx0aXBsZSBvYnNlcnZhYmxlIHdvdWxkIGhhdmVcclxuICAgKiBhIGNhbmNlbGxpbmcgZWZmZWN0IG9uIGVhY2ggb3RoZXIuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB3YXRjaEFsbCgpIHtcclxuICAgIHRoaXMudW53YXRjaEFsbCgpO1xyXG5cclxuICAgIGNvbnN0IHN0b3JlcyQgPSB0aGlzLnN0b3Jlcy5tYXAoKHN0b3JlOiBGZWF0dXJlU3RvcmUpID0+IHtcclxuICAgICAgcmV0dXJuIHN0b3JlLnN0YXRlVmlldy5tYW55QnkkKChyZWNvcmQ6IEVudGl0eVJlY29yZDxGZWF0dXJlPikgPT4ge1xyXG4gICAgICAgIHJldHVybiByZWNvcmQuc3RhdGUuc2VsZWN0ZWQgPT09IHRydWU7XHJcbiAgICAgIH0pLnBpcGUoXHJcbiAgICAgICAgbWFwKChyZWNvcmRzOiBFbnRpdHlSZWNvcmQ8RmVhdHVyZT5bXSkgPT4gcmVjb3Jkcy5tYXAocmVjb3JkID0+IHJlY29yZC5lbnRpdHkpKVxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnN0b3JlcyQkID0gY29tYmluZUxhdGVzdChzdG9yZXMkKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBkZWJvdW5jZVRpbWUoNSksXHJcbiAgICAgICAgc2tpcCgxKSwgLy8gU2tpcCBpbnRpYWwgc2VsZWN0aW9uXHJcbiAgICAgICAgbWFwKChmZWF0dXJlczogQXJyYXk8RmVhdHVyZVtdPikgPT4gZmVhdHVyZXMucmVkdWNlKChhLCBiKSA9PiBhLmNvbmNhdChiKSkpXHJcbiAgICAgICkuc3Vic2NyaWJlKChmZWF0dXJlczogRmVhdHVyZVtdKSA9PiB0aGlzLm9uU2VsZWN0RnJvbVN0b3JlKGZlYXR1cmVzKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdG9wIHdhdGNoaW5nIGZvciBzZWxlY3Rpb24gaW4gYWxsIHN0b3Jlcy5cclxuICAgKi9cclxuICBwcml2YXRlIHVud2F0Y2hBbGwoKSB7XHJcbiAgICBpZiAodGhpcy5zdG9yZXMkJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuc3RvcmVzJCQudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhICdzaW5nbGVjbGljaycgbGlzdGVuZXIgdG8gdGhlIG1hcCB0aGF0J2xsIGFsbG93IHNlbGVjdGluZ1xyXG4gICAqIGZlYXR1cmVzIGJ5IGNsaWNraW5nIG9uIHRoZSBtYXAuIFRoZSBzZWxlY3Rpb24gd2lsbCBiZSBwZXJmb3JtZWRcclxuICAgKiBvbmx5IG9uIHRoZSBsYXllcnMgYm91bmQgdG8gdGhpcyBzdHJhdGVneS5cclxuICAgKi9cclxuICBwcml2YXRlIGxpc3RlblRvTWFwQ2xpY2soKSB7XHJcbiAgICB0aGlzLm1hcENsaWNrTGlzdGVuZXIgPSB0aGlzLm1hcC5vbC5vbignc2luZ2xlY2xpY2snLCAoZXZlbnQ6IE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCkgPT4ge1xyXG4gICAgICB0aGlzLm9uTWFwQ2xpY2soZXZlbnQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgdGhlIG1hcCBjbGljayBsaXN0ZW5lclxyXG4gICAqL1xyXG4gIHByaXZhdGUgdW5saXN0ZW5Ub01hcENsaWNrKCkge1xyXG4gICAgaWYgKHRoaXMubWFwQ2xpY2tMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMubWFwLm9sLnVuKFxyXG4gICAgICAgIHRoaXMubWFwQ2xpY2tMaXN0ZW5lci50eXBlLFxyXG4gICAgICAgIHRoaXMubWFwQ2xpY2tMaXN0ZW5lci5saXN0ZW5lclxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gbWFwIGNsaWNrLCBzZWxlY3QgZmVhdHVyZSBhdCBwaXhlbFxyXG4gICAqIEBwYXJhbSBldmVudCBPTCBNYXBCcm93c2VyUG9pbnRlckV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbk1hcENsaWNrKGV2ZW50OiBPbE1hcEJyb3dzZXJQb2ludGVyRXZlbnQpIHtcclxuICAgIGNvbnN0IGV4Y2x1c2l2ZSA9ICFjdHJsS2V5RG93bihldmVudCk7XHJcbiAgICBjb25zdCByZXZlcnNlID0gIWV4Y2x1c2l2ZTtcclxuICAgIGNvbnN0IG9sRmVhdHVyZXMgPSBldmVudC5tYXAuZ2V0RmVhdHVyZXNBdFBpeGVsKGV2ZW50LnBpeGVsLCB7XHJcbiAgICAgIGhpdFRvbGVyYW5jZTogdGhpcy5vcHRpb25zLmhpdFRvbGVyYW5jZSB8fCAwLFxyXG4gICAgICBsYXllckZpbHRlcjogKG9sTGF5ZXIpID0+IHtcclxuICAgICAgICBjb25zdCBzdG9yZU9sTGF5ZXIgPSB0aGlzLnN0b3Jlcy5maW5kKChzdG9yZTogRmVhdHVyZVN0b3JlKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gc3RvcmUubGF5ZXIub2wgPT09IG9sTGF5ZXI7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHN0b3JlT2xMYXllciAhPT0gdW5kZWZpbmVkO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMub25TZWxlY3RGcm9tTWFwKG9sRmVhdHVyZXMsIGV4Y2x1c2l2ZSwgcmV2ZXJzZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYSBkcmFnIGJveCBpbnRlcmFjdGlvbiBhbmQsIG9uIGRyYWcgYm94IGVuZCwgc2VsZWN0IGZlYXR1cmVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGREcmFnQm94SW50ZXJhY3Rpb24oKSB7XHJcbiAgICBsZXQgb2xEcmFnU2VsZWN0SW50ZXJhY3Rpb247XHJcbiAgICBjb25zdCBvbEludGVyYWN0aW9ucyA9IHRoaXMubWFwLm9sLmdldEludGVyYWN0aW9ucygpLmdldEFycmF5KCk7XHJcblxyXG4gICAgLy8gVGhlcmUgY2FuIG9ubHkgYmUgb25lIGRyYWdib3ggaW50ZXJhY3Rpb24sIHNvIGZpbmQgdGhlIGN1cnJlbnQgb25lLCBpZiBhbnlcclxuICAgIC8vIERvbid0IGtlZXAgYSByZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnQgZHJhZ2JveCBiZWNhdXNlIHdlIGRvbid0IHdhbnRcclxuICAgIC8vIHRvIHJlbW92ZSBpdCB3aGVuIHRoaXMgc3RhcnRlZ3kgaXMgZGVhY3RpdmF0ZWRcclxuICAgIGZvciAoY29uc3Qgb2xJbnRlcmFjdGlvbiBvZiBvbEludGVyYWN0aW9ucykge1xyXG4gICAgICBpZiAob2xJbnRlcmFjdGlvbiBpbnN0YW5jZW9mIE9sRHJhZ1NlbGVjdEludGVyYWN0aW9uKSB7XHJcbiAgICAgICAgb2xEcmFnU2VsZWN0SW50ZXJhY3Rpb24gPSBvbEludGVyYWN0aW9uO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBJZiBubyBkcmFnIGJveCBpbnRlcmFjdGlvbiBpcyBmb3VuZCwgY3JlYXRlIGEgbmV3IG9uZSBhbmQgYWRkIGl0IHRvIHRoZSBtYXBcclxuICAgIGlmIChvbERyYWdTZWxlY3RJbnRlcmFjdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIG9sRHJhZ1NlbGVjdEludGVyYWN0aW9uID0gbmV3IE9sRHJhZ1NlbGVjdEludGVyYWN0aW9uKHtcclxuICAgICAgICBjb25kaXRpb246IGN0cmxLZXlEb3duXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLm1hcC5vbC5hZGRJbnRlcmFjdGlvbihvbERyYWdTZWxlY3RJbnRlcmFjdGlvbik7XHJcbiAgICAgIHRoaXMub2xEcmFnU2VsZWN0SW50ZXJhY3Rpb24gPSBvbERyYWdTZWxlY3RJbnRlcmFjdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9sRHJhZ1NlbGVjdEludGVyYWN0aW9uRW5kS2V5ID0gb2xEcmFnU2VsZWN0SW50ZXJhY3Rpb24ub24oXHJcbiAgICAgICdib3hlbmQnLFxyXG4gICAgICAoZXZlbnQ6IE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCkgPT4gdGhpcy5vbkRyYWdCb3hFbmQoZXZlbnQpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIGRyYWcgYm94IGludGVyYWN0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZW1vdmVEcmFnQm94SW50ZXJhY3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5vbERyYWdTZWxlY3RJbnRlcmFjdGlvbkVuZEtleSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHVuQnlLZXkodGhpcy5vbERyYWdTZWxlY3RJbnRlcmFjdGlvbkVuZEtleSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5vbERyYWdTZWxlY3RJbnRlcmFjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMubWFwLm9sLnJlbW92ZUludGVyYWN0aW9uKHRoaXMub2xEcmFnU2VsZWN0SW50ZXJhY3Rpb24pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vbERyYWdTZWxlY3RJbnRlcmFjdGlvbiA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIGRyYWdib3ggZW5kLCBzZWxlY3QgZmVhdHVyZXMgaW4gZHJhZyBib3hcclxuICAgKiBAcGFyYW0gZXZlbnQgT0wgTWFwQnJvd3NlclBvaW50ZXJFdmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25EcmFnQm94RW5kKGV2ZW50OiBPbERyYWdCb3hFdmVudCkge1xyXG4gICAgY29uc3QgZXhjbHVzaXZlID0gIWN0cmxLZXlEb3duKGV2ZW50Lm1hcEJyb3dzZXJFdmVudCk7XHJcbiAgICBjb25zdCBleHRlbnQgPSBldmVudC50YXJnZXQuZ2V0R2VvbWV0cnkoKS5nZXRFeHRlbnQoKTtcclxuICAgIGNvbnN0IG9sRmVhdHVyZXMgPSB0aGlzLnN0b3Jlcy5yZWR1Y2UoKGFjYzogT2xGZWF0dXJlW10sIHN0b3JlOiBGZWF0dXJlU3RvcmUpID0+IHtcclxuICAgICAgY29uc3Qgb2xTb3VyY2UgPSBzdG9yZS5sYXllci5vbC5nZXRTb3VyY2UoKTtcclxuICAgICAgYWNjLnB1c2goLi4ub2xTb3VyY2UuZ2V0RmVhdHVyZXNJbkV4dGVudChleHRlbnQpKTtcclxuICAgICAgcmV0dXJuIGFjYztcclxuICAgIH0sIFtdKTtcclxuICAgIHRoaXMub25TZWxlY3RGcm9tTWFwKG9sRmVhdHVyZXMsIGV4Y2x1c2l2ZSwgZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBmZWF0dXJlcyBhcmUgc2VsZWN0ZWQgZnJvbSB0aGUgc3RvcmUsIGFkZFxyXG4gICAqIHRoZW0gdG8gdGhpcyBzdGFydGVneSdzIG92ZXJsYXkgbGF5ZXIgKHNlbGVjdCBvbiBtYXApXHJcbiAgICogQHBhcmFtIGZlYXR1cmVzIFN0b3JlIGZlYXR1cmVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvblNlbGVjdEZyb21TdG9yZShmZWF0dXJlczogRmVhdHVyZVtdKSB7XHJcbiAgICBjb25zdCBtb3Rpb24gPSB0aGlzLm9wdGlvbnMgPyB0aGlzLm9wdGlvbnMubW90aW9uIDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3Qgb2xPdmVybGF5RmVhdHVyZXMgPSB0aGlzLm92ZXJsYXlTdG9yZS5sYXllci5vbC5nZXRTb3VyY2UoKS5nZXRGZWF0dXJlcygpO1xyXG4gICAgY29uc3Qgb3ZlcmxheUZlYXR1cmVzS2V5cyA9IG9sT3ZlcmxheUZlYXR1cmVzLm1hcCgob2xGZWF0dXJlOiBPbEZlYXR1cmUpID0+IG9sRmVhdHVyZS5nZXRJZCgpKTtcclxuICAgIGNvbnN0IGZlYXR1cmVzS2V5cyA9IGZlYXR1cmVzLm1hcCh0aGlzLm92ZXJsYXlTdG9yZS5nZXRLZXkpO1xyXG5cclxuICAgIGxldCBkb01vdGlvbjtcclxuICAgIGlmIChmZWF0dXJlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgZG9Nb3Rpb24gPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRvTW90aW9uID0gb3ZlcmxheUZlYXR1cmVzS2V5cy5sZW5ndGggIT09IGZlYXR1cmVzS2V5cy5sZW5ndGggfHxcclxuICAgICAgICAhb3ZlcmxheUZlYXR1cmVzS2V5cy5ldmVyeSgoa2V5OiBFbnRpdHlLZXkpID0+IGZlYXR1cmVzS2V5cy5pbmRleE9mKGtleSkgPj0gMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vdmVybGF5U3RvcmUuc2V0TGF5ZXJGZWF0dXJlcyhcclxuICAgICAgZmVhdHVyZXMsXHJcbiAgICAgIGRvTW90aW9uID8gbW90aW9uIDogRmVhdHVyZU1vdGlvbi5Ob25lLFxyXG4gICAgICB0aGlzLm9wdGlvbnMudmlld1NjYWxlLFxyXG4gICAgICB0aGlzLm9wdGlvbnMuYXJlYVJhdGlvLFxyXG4gICAgICB0aGlzLm9wdGlvbnMuZ2V0RmVhdHVyZUlkXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBmZWF0dXJlcyBhcmUgc2VsZWN0ZWQgZnJvbSB0aGUgbWFwLCBhbHNvIHNlbGVjdCB0aGVtXHJcbiAgICogaW4gdGhlaXIgc3RvcmUuXHJcbiAgICogQHBhcmFtIG9sRmVhdHVyZXMgT0wgZmVhdHVyZSBvYmplY3RzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvblNlbGVjdEZyb21NYXAob2xGZWF0dXJlczogT2xGZWF0dXJlW10sIGV4Y2x1c2l2ZTogYm9vbGVhbiwgcmV2ZXJzZTogYm9vbGVhbikge1xyXG4gICAgY29uc3QgZ3JvdXBlZEZlYXR1cmVzID0gdGhpcy5ncm91cEZlYXR1cmVzQnlTdG9yZShvbEZlYXR1cmVzKTtcclxuXHJcbiAgICB0aGlzLnN0b3Jlcy5mb3JFYWNoKChzdG9yZTogRmVhdHVyZVN0b3JlKSA9PiB7XHJcbiAgICAgIGNvbnN0IGZlYXR1cmVzID0gZ3JvdXBlZEZlYXR1cmVzLmdldChzdG9yZSk7XHJcbiAgICAgIGlmIChmZWF0dXJlcyA9PT0gdW5kZWZpbmVkICYmIGV4Y2x1c2l2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMudW5zZWxlY3RBbGxGZWF0dXJlc0Zyb21TdG9yZShzdG9yZSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoZmVhdHVyZXMgPT09IHVuZGVmaW5lZCAmJiBleGNsdXNpdmUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgLy8gRG8gbm90aGluZ1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0RmVhdHVyZXNGcm9tU3RvcmUoc3RvcmUsIGZlYXR1cmVzLCBleGNsdXNpdmUsIHJldmVyc2UpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlbGVjdCBmZWF0dXJlcyBpbiBzdG9yZVxyXG4gICAqIEBwYXJhbSBzdG9yZTogRmVhdHVyZSBzdG9yZVxyXG4gICAqIEBwYXJhbSBmZWF0dXJlcyBGZWF0dXJlc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgc2VsZWN0RmVhdHVyZXNGcm9tU3RvcmUoc3RvcmU6IEZlYXR1cmVTdG9yZSwgZmVhdHVyZXM6IEZlYXR1cmVbXSwgZXhjbHVzaXZlOiBib29sZWFuLCByZXZlcnNlOiBib29sZWFuKSB7XHJcbiAgICBpZiAocmV2ZXJzZSA9PT0gdHJ1ZSkge1xyXG4gICAgICBzdG9yZS5zdGF0ZS5yZXZlcnNlTWFueShmZWF0dXJlcywgWydzZWxlY3RlZCddKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN0b3JlLnN0YXRlLnVwZGF0ZU1hbnkoZmVhdHVyZXMsIHtzZWxlY3RlZDogdHJ1ZX0sIGV4Y2x1c2l2ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbnNlbGVjdCBhbGwgZmVhdHVyZXMgZnJvbSBzdG9yZVxyXG4gICAqIEBwYXJhbSBzdG9yZTogRmVhdHVyZSBzdG9yZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgdW5zZWxlY3RBbGxGZWF0dXJlc0Zyb21TdG9yZShzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBzdG9yZS5zdGF0ZS51cGRhdGVBbGwoe3NlbGVjdGVkOiBmYWxzZX0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBtZXRob2QgcmV0dXJucyBhIHN0b3JlIC0+IGZlYXR1cmVzIG1hcHBpbmcgZnJvbSBhIGxpc3RcclxuICAgKiBvZiBPTCBzZWxlY3RlZCBmZWF0dXJlcy4gT0wgZmVhdHVyZXMga2VlcCBhIHJlZmVyZW5jZSB0byB0aGUgc3RvcmVcclxuICAgKiB0aGV5IGFyZSBmcm9tLlxyXG4gICAqIEBwYXJhbSBvbEZlYXR1cmVzOiBPTCBmZWF0dXJlIG9iamVjdHNcclxuICAgKiBAcmV0dXJucyBTdG9yZSAtPiBmZWF0dXJlcyBtYXBwaW5nXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBncm91cEZlYXR1cmVzQnlTdG9yZShvbEZlYXR1cmVzOiBPbEZlYXR1cmVbXSk6IE1hcDxGZWF0dXJlU3RvcmUsIEZlYXR1cmVbXT4ge1xyXG4gICAgY29uc3QgZ3JvdXBlZEZlYXR1cmVzID0gbmV3IE1hcDxGZWF0dXJlU3RvcmUsIEZlYXR1cmVbXT4oKTtcclxuICAgIGlmIChvbEZlYXR1cmVzID09PSBudWxsIHx8IG9sRmVhdHVyZXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gZ3JvdXBlZEZlYXR1cmVzO1xyXG4gICAgfVxyXG5cclxuICAgIG9sRmVhdHVyZXMuZm9yRWFjaCgob2xGZWF0dXJlOiBPbEZlYXR1cmUpID0+IHtcclxuICAgICAgY29uc3Qgc3RvcmUgPSBvbEZlYXR1cmUuZ2V0KCdfZmVhdHVyZVN0b3JlJyk7XHJcbiAgICAgIGlmIChzdG9yZSA9PT0gdW5kZWZpbmVkKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgbGV0IGZlYXR1cmVzID0gZ3JvdXBlZEZlYXR1cmVzLmdldChzdG9yZSk7XHJcbiAgICAgIGlmIChmZWF0dXJlcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgZmVhdHVyZXMgPSBbXTtcclxuICAgICAgICBncm91cGVkRmVhdHVyZXMuc2V0KHN0b3JlLCBmZWF0dXJlcyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGZlYXR1cmUgPSBzdG9yZS5nZXQob2xGZWF0dXJlLmdldElkKCkpO1xyXG4gICAgICBpZiAoZmVhdHVyZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgZmVhdHVyZXMucHVzaChmZWF0dXJlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGdyb3VwZWRGZWF0dXJlcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhbiBvdmVybGF5IHN0b3JlIHRoYXQnbGwgY29udGFpbiB0aGUgc2VsZWN0ZWQgZmVhdHVyZXMuXHJcbiAgICogQHJldHVybnMgT3ZlcmxheSBzdG9yZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgY3JlYXRlT3ZlcmxheVN0b3JlKCk6IEZlYXR1cmVTdG9yZSB7XHJcbiAgICBjb25zdCBvdmVybGF5TGF5ZXIgPSB0aGlzLm9wdGlvbnMubGF5ZXJcclxuICAgICAgPyB0aGlzLm9wdGlvbnMubGF5ZXJcclxuICAgICAgOiB0aGlzLmNyZWF0ZU92ZXJsYXlMYXllcigpO1xyXG4gICAgcmV0dXJuIG5ldyBGZWF0dXJlU3RvcmUoW10sIHttYXA6IHRoaXMubWFwfSkuYmluZExheWVyKG92ZXJsYXlMYXllcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYW4gb3ZlcmxheSBzdG9yZSB0aGF0J2xsIGNvbnRhaW4gdGhlIHNlbGVjdGVkIGZlYXR1cmVzLlxyXG4gICAqIEByZXR1cm5zIE92ZXJsYXkgbGF5ZXJcclxuICAgKi9cclxuICBwcml2YXRlIGNyZWF0ZU92ZXJsYXlMYXllcigpOiBWZWN0b3JMYXllciB7XHJcbiAgICByZXR1cm4gbmV3IFZlY3RvckxheWVyKHtcclxuICAgICAgekluZGV4OiAzMDAsXHJcbiAgICAgIHNvdXJjZTogbmV3IEZlYXR1cmVEYXRhU291cmNlKCksXHJcbiAgICAgIHN0eWxlOiB1bmRlZmluZWQsXHJcbiAgICAgIHNob3dJbkxheWVyTGlzdDogZmFsc2UsXHJcbiAgICAgIGV4cG9ydGFibGU6IGZhbHNlLFxyXG4gICAgICBicm93c2FibGU6IGZhbHNlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCB0aGUgb3ZlcmxheSBzdG9yZSdzIGxheWVyIHRvIHRoZSBtYXAgdG8gZGlzcGxheSB0aGUgc2VsZWN0ZWRcclxuICAgKiBmZWF0dXJlcy5cclxuICAgKi9cclxuICBwcml2YXRlIGFkZE92ZXJsYXlMYXllcigpIHtcclxuICAgIGlmICh0aGlzLm92ZXJsYXlTdG9yZS5sYXllci5tYXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm1hcC5hZGRMYXllcih0aGlzLm92ZXJsYXlTdG9yZS5sYXllcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgdGhlIG92ZXJsYXkgbGF5ZXIgZnJvbSB0aGUgbWFwXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZW1vdmVPdmVybGF5TGF5ZXIoKSB7XHJcbiAgICB0aGlzLm92ZXJsYXlTdG9yZS5zb3VyY2Uub2wuY2xlYXIoKTtcclxuICAgIHRoaXMubWFwLnJlbW92ZUxheWVyKHRoaXMub3ZlcmxheVN0b3JlLmxheWVyKTtcclxuICB9XHJcbn1cclxuIl19