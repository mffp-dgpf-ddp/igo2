/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import OlDragBoxInteraction from 'ol/interaction/DragBox';
import { unByKey } from 'ol/Observable';
import { combineLatest } from 'rxjs';
import { map, debounceTime, skip } from 'rxjs/operators';
import { FeatureDataSource } from '../../../datasource';
import { VectorLayer } from '../../../layer';
import { ctrlKeyDown } from '../../../map';
import { FeatureStore } from '../store';
import { FeatureStoreStrategy } from './strategy';
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
export class FeatureStoreSelectionStrategy extends FeatureStoreStrategy {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
        this.options = options;
        this.overlayStore = this.createOverlayStore();
    }
    /**
     * The map the layers belong to
     * @return {?}
     */
    get map() { return this.options.map; }
    /**
     * Bind this strategy to a store and force this strategy's
     * reactivation to properly setup watchers.
     * @param {?} store Feature store
     * @return {?}
     */
    bindStore(store) {
        super.bindStore(store);
        if (this.isActive() === true) {
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
        if (this.isActive() === true) {
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
            .pipe(debounceTime(25), skip(1), // Skip intial selection
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
        const doMotion = overlayFeaturesKeys.length !== featuresKeys.length ||
            !overlayFeaturesKeys.every((/**
             * @param {?} key
             * @return {?}
             */
            (key) => featuresKeys.indexOf(key) >= 0));
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
     * A feature store that'll contain the selected features. It has it's own
     * layer, shared by all the stores this staretgy is bound to.
     * @type {?}
     * @private
     */
    FeatureStoreSelectionStrategy.prototype.overlayStore;
    /**
     * Subscription to all stores selected entities
     * @type {?}
     * @private
     */
    FeatureStoreSelectionStrategy.prototype.stores$$;
    /**
     * @type {?}
     * @protected
     */
    FeatureStoreSelectionStrategy.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ZlYXR1cmUvc2hhcmVkL3N0cmF0ZWdpZXMvc2VsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLG9CQUFvQixNQUFNLHdCQUF3QixDQUFDO0FBSTFELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFeEMsT0FBTyxFQUFnQixhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBVSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN4QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRWpELE1BQU0sdUJBQXdCLFNBQVEsb0JBQW9COzs7O0lBQ3hELFlBQVksT0FBTztRQUNqQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQztDQUNGOzs7Ozs7Ozs7OztBQVlELE1BQU0sT0FBTyw2QkFBOEIsU0FBUSxvQkFBb0I7Ozs7SUE0QnJFLFlBQXNCLE9BQTZDO1FBQ2pFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQURLLFlBQU8sR0FBUCxPQUFPLENBQXNDO1FBRWpFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDaEQsQ0FBQzs7Ozs7SUFMRCxJQUFJLEdBQUcsS0FBYSxPQUFPLElB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QUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7Q0FDRjs7Ozs7Ozs7SUE3V0MseURBQTJDOzs7OztJQUUzQyxnRUFBeUQ7Ozs7O0lBRXpELHNFQUE4Qzs7Ozs7OztJQU05QyxxREFBbUM7Ozs7OztJQUtuQyxpREFBK0I7Ozs7O0lBT25CLGdEQUF1RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBPbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCBPbERyYWdCb3hJbnRlcmFjdGlvbiBmcm9tICdvbC9pbnRlcmFjdGlvbi9EcmFnQm94JztcclxuaW1wb3J0IHsgRHJhZ0JveEV2ZW50IGFzIE9sRHJhZ0JveEV2ZW50IH0gZnJvbSAnb2wvaW50ZXJhY3Rpb24vRHJhZ0JveCc7XHJcbmltcG9ydCB7IExpc3RlbmVyRnVuY3Rpb24gfSBmcm9tICdvbC9ldmVudHMnO1xyXG5pbXBvcnQgeyBNYXBCcm93c2VyUG9pbnRlckV2ZW50IGFzIE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCB9IGZyb20gJ29sL01hcEJyb3dzZXJFdmVudCc7XHJcbmltcG9ydCB7IHVuQnlLZXkgfSBmcm9tICdvbC9PYnNlcnZhYmxlJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgY29tYmluZUxhdGVzdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAsIGRlYm91bmNlVGltZSwgc2tpcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IEVudGl0eUtleSwgRW50aXR5UmVjb3JkIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IEZlYXR1cmVEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IFZlY3RvckxheWVyIH0gZnJvbSAnLi4vLi4vLi4vbGF5ZXInO1xyXG5pbXBvcnQgeyBJZ29NYXAsIGN0cmxLZXlEb3duIH0gZnJvbSAnLi4vLi4vLi4vbWFwJztcclxuXHJcbmltcG9ydCB7IEZlYXR1cmUsIEZlYXR1cmVTdG9yZVNlbGVjdGlvblN0cmF0ZWd5T3B0aW9ucyB9IGZyb20gJy4uL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IEZlYXR1cmVTdG9yZSB9IGZyb20gJy4uL3N0b3JlJztcclxuaW1wb3J0IHsgRmVhdHVyZVN0b3JlU3RyYXRlZ3kgfSBmcm9tICcuL3N0cmF0ZWd5JztcclxuaW1wb3J0IHsgRmVhdHVyZU1vdGlvbiB9IGZyb20gJy4uL2ZlYXR1cmUuZW51bXMnO1xyXG5cclxuY2xhc3MgT2xEcmFnU2VsZWN0SW50ZXJhY3Rpb24gZXh0ZW5kcyBPbERyYWdCb3hJbnRlcmFjdGlvbiB7XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogVGhpcyBzdHJhdGVneSBzeW5jaHJvbml6ZXMgYSBzdG9yZSBhbmQgYSBsYXllciBzZWxlY3RlZCBlbnRpdGllcy5cclxuICogVGhlIHN0b3JlIDwtPiBsYXllciBiaW5kaW5nIGlzIGEgdHdvLXdheSBiaW5kaW5nLlxyXG4gKlxyXG4gKiBJbiBtYW55IGNhc2VzLCBhIHNpbmdsZSBzdHJhdGVneSBib3VuZCB0byBtdWx0aXBsZSBzdG9yZXNcclxuICogd2lsbCB5aWVsZCBiZXR0ZXIgcmVzdWx0cyB0aGF0IG11bHRpcGxlIHN0cmF0ZWdpZXMgd2l0aCBlYWNoIHRoZWlyXHJcbiAqIG93biBzdG9yZS4gSW4gdGhlIGxhdHRlciBzY2VuYXJpbywgYSBjbGljayBvbiBvdmVybGFwcGluZyBmZWF0dXJlc1xyXG4gKiB3b3VsZCB0cmlnZ2VyIHRoZSBzdHJhdGVneSBvZiBlYWNoIGxheWVyIGFuZCB0aGV5IHdvdWxkIGNhbmNlbFxyXG4gKiBlYWNoIG90aGVyIGFzIHdlbGwgYXMgbW92ZSB0aGUgbWFwIHZpZXcgYXJvdW5kIG5lZWRsZXNzbHkuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRmVhdHVyZVN0b3JlU2VsZWN0aW9uU3RyYXRlZ3kgZXh0ZW5kcyBGZWF0dXJlU3RvcmVTdHJhdGVneSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIExpc3RlbmVyIHRvIHRoZSBtYXAgY2xpY2sgZXZlbnQgdGhhdCBhbGxvd3Mgc2VsZWN0aW5nIGEgZmVhdHVyZVxyXG4gICAqIGJ5IGNsaWNraW5nIG9uIHRoZSBtYXBcclxuICAgKi9cclxuICBwcml2YXRlIG1hcENsaWNrTGlzdGVuZXI6IExpc3RlbmVyRnVuY3Rpb247XHJcblxyXG4gIHByaXZhdGUgb2xEcmFnU2VsZWN0SW50ZXJhY3Rpb246IE9sRHJhZ1NlbGVjdEludGVyYWN0aW9uO1xyXG5cclxuICBwcml2YXRlIG9sRHJhZ1NlbGVjdEludGVyYWN0aW9uRW5kS2V5OiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZmVhdHVyZSBzdG9yZSB0aGF0J2xsIGNvbnRhaW4gdGhlIHNlbGVjdGVkIGZlYXR1cmVzLiBJdCBoYXMgaXQncyBvd25cclxuICAgKiBsYXllciwgc2hhcmVkIGJ5IGFsbCB0aGUgc3RvcmVzIHRoaXMgc3RhcmV0Z3kgaXMgYm91bmQgdG8uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvdmVybGF5U3RvcmU6IEZlYXR1cmVTdG9yZTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvIGFsbCBzdG9yZXMgc2VsZWN0ZWQgZW50aXRpZXNcclxuICAgKi9cclxuICBwcml2YXRlIHN0b3JlcyQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBtYXAgdGhlIGxheWVycyBiZWxvbmcgdG9cclxuICAgKi9cclxuICBnZXQgbWFwKCk6IElnb01hcCB7IHJldHVybiB0aGlzLm9wdGlvbnMubWFwOyB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBvcHRpb25zOiBGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneU9wdGlvbnMpIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgdGhpcy5vdmVybGF5U3RvcmUgPSB0aGlzLmNyZWF0ZU92ZXJsYXlTdG9yZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQmluZCB0aGlzIHN0cmF0ZWd5IHRvIGEgc3RvcmUgYW5kIGZvcmNlIHRoaXMgc3RyYXRlZ3knc1xyXG4gICAqIHJlYWN0aXZhdGlvbiB0byBwcm9wZXJseSBzZXR1cCB3YXRjaGVycy5cclxuICAgKiBAcGFyYW0gc3RvcmUgRmVhdHVyZSBzdG9yZVxyXG4gICAqL1xyXG4gIGJpbmRTdG9yZShzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBzdXBlci5iaW5kU3RvcmUoc3RvcmUpO1xyXG4gICAgaWYgKHRoaXMuaXNBY3RpdmUoKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAvLyBGb3JjZSByZWFjdGl2YXRpb25cclxuICAgICAgdGhpcy5hY3RpdmF0ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5iaW5kIHRoaXMgc3RyYXRlZ3kgZnJvbSBhIHN0b3JlIGFuZCBmb3JjZSB0aGlzIHN0cmF0ZWd5J3NcclxuICAgKiByZWFjdGl2YXRpb24gdG8gcHJvcGVybHkgc2V0dXAgd2F0Y2hlcnMuXHJcbiAgICogQHBhcmFtIHN0b3JlIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICB1bmJpbmRTdG9yZShzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBzdXBlci51bmJpbmRTdG9yZShzdG9yZSk7XHJcbiAgICBpZiAodGhpcy5pc0FjdGl2ZSgpID09PSB0cnVlKSB7XHJcbiAgICAgIC8vIEZvcmNlIHJlYWN0aXZhdGlvblxyXG4gICAgICB0aGlzLmFjdGl2YXRlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbnNlbGVjdCBhbGwgZW50aXRpZXMsIGZyb20gYWxsIHN0b3Jlc1xyXG4gICAqL1xyXG4gIHVuc2VsZWN0QWxsKCkge1xyXG4gICAgdGhpcy5zdG9yZXMuZm9yRWFjaCgoc3RvcmU6IEZlYXR1cmVTdG9yZSkgPT4ge1xyXG4gICAgICBzdG9yZS5zdGF0ZS51cGRhdGVBbGwoe3NlbGVjdGVkOiBmYWxzZX0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjbGVhcigpIHtcclxuICAgIHRoaXMub3ZlcmxheVN0b3JlLnNvdXJjZS5vbC5jbGVhcigpO1xyXG4gICAgdGhpcy5vdmVybGF5U3RvcmUuY2xlYXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCB0aGUgb3ZlcmxheSBsYXllciwgc2V0dXAgdGhlIG1hcCBjbGljayBsc2l0ZW5lciBhbmRcclxuICAgKiBzdGFydCB3YXRjaGluZyBmb3Igc3RvcmVzIHNlbGVjdGlvblxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBkb0FjdGl2YXRlKCkge1xyXG4gICAgdGhpcy5hZGRPdmVybGF5TGF5ZXIoKTtcclxuICAgIHRoaXMubGlzdGVuVG9NYXBDbGljaygpO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5kcmFnQm94ID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuYWRkRHJhZ0JveEludGVyYWN0aW9uKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLndhdGNoQWxsKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgdGhlIG92ZXJsYXkgbGF5ZXIsIHJlbW92ZSB0aGUgbWFwIGNsaWNrIGxzaXRlbmVyIGFuZFxyXG4gICAqIHN0b3Agd2F0Y2hpbmcgZm9yIHN0b3JlcyBzZWxlY3Rpb25cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgZG9EZWFjdGl2YXRlKCkge1xyXG4gICAgdGhpcy51bmxpc3RlblRvTWFwQ2xpY2soKTtcclxuICAgIHRoaXMucmVtb3ZlRHJhZ0JveEludGVyYWN0aW9uKCk7XHJcbiAgICB0aGlzLnVud2F0Y2hBbGwoKTtcclxuICAgIHRoaXMucmVtb3ZlT3ZlcmxheUxheWVyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYSBzaW5nbGUgb2JzZXJ2YWJsZSBvZiBhbGwgdGhlIHN0b3Jlcy4gV2l0aCBhIHNpbmdsZSBvYnNlcnZhYmxlLFxyXG4gICAqIGZlYXR1cmVzIGNhbiBiZSBhZGRlZCBhbGwgYXQgb25jZSB0byB0aGUgb3ZlcmxheSBsYXllciBhbmQgYSBzaW5nbGVcclxuICAgKiBtb3Rpb24gY2FuIGJlIHBlcmZvcm1lZC4gTXVsdGlwbGUgb2JzZXJ2YWJsZSB3b3VsZCBoYXZlXHJcbiAgICogYSBjYW5jZWxsaW5nIGVmZmVjdCBvbiBlYWNoIG90aGVyLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgd2F0Y2hBbGwoKSB7XHJcbiAgICB0aGlzLnVud2F0Y2hBbGwoKTtcclxuXHJcbiAgICBjb25zdCBzdG9yZXMkID0gdGhpcy5zdG9yZXMubWFwKChzdG9yZTogRmVhdHVyZVN0b3JlKSA9PiB7XHJcbiAgICAgIHJldHVybiBzdG9yZS5zdGF0ZVZpZXcubWFueUJ5JCgocmVjb3JkOiBFbnRpdHlSZWNvcmQ8RmVhdHVyZT4pID0+IHtcclxuICAgICAgICByZXR1cm4gcmVjb3JkLnN0YXRlLnNlbGVjdGVkID09PSB0cnVlO1xyXG4gICAgICB9KS5waXBlKFxyXG4gICAgICAgIG1hcCgocmVjb3JkczogRW50aXR5UmVjb3JkPEZlYXR1cmU+W10pID0+IHJlY29yZHMubWFwKHJlY29yZCA9PiByZWNvcmQuZW50aXR5KSlcclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zdG9yZXMkJCA9IGNvbWJpbmVMYXRlc3QoLi4uc3RvcmVzJClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgZGVib3VuY2VUaW1lKDI1KSxcclxuICAgICAgICBza2lwKDEpLCAvLyBTa2lwIGludGlhbCBzZWxlY3Rpb25cclxuICAgICAgICBtYXAoKGZlYXR1cmVzOiBBcnJheTxGZWF0dXJlW10+KSA9PiBmZWF0dXJlcy5yZWR1Y2UoKGEsIGIpID0+IGEuY29uY2F0KGIpKSlcclxuICAgICAgKS5zdWJzY3JpYmUoKGZlYXR1cmVzOiBGZWF0dXJlW10pID0+IHRoaXMub25TZWxlY3RGcm9tU3RvcmUoZmVhdHVyZXMpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3Agd2F0Y2hpbmcgZm9yIHNlbGVjdGlvbiBpbiBhbGwgc3RvcmVzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgdW53YXRjaEFsbCgpIHtcclxuICAgIGlmICh0aGlzLnN0b3JlcyQkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5zdG9yZXMkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGEgJ3NpbmdsZWNsaWNrJyBsaXN0ZW5lciB0byB0aGUgbWFwIHRoYXQnbGwgYWxsb3cgc2VsZWN0aW5nXHJcbiAgICogZmVhdHVyZXMgYnkgY2xpY2tpbmcgb24gdGhlIG1hcC4gVGhlIHNlbGVjdGlvbiB3aWxsIGJlIHBlcmZvcm1lZFxyXG4gICAqIG9ubHkgb24gdGhlIGxheWVycyBib3VuZCB0byB0aGlzIHN0cmF0ZWd5LlxyXG4gICAqL1xyXG4gIHByaXZhdGUgbGlzdGVuVG9NYXBDbGljaygpIHtcclxuICAgIHRoaXMubWFwQ2xpY2tMaXN0ZW5lciA9IHRoaXMubWFwLm9sLm9uKCdzaW5nbGVjbGljaycsIChldmVudDogT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMub25NYXBDbGljayhldmVudCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSB0aGUgbWFwIGNsaWNrIGxpc3RlbmVyXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1bmxpc3RlblRvTWFwQ2xpY2soKSB7XHJcbiAgICBpZiAodGhpcy5tYXBDbGlja0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5tYXAub2wudW4oXHJcbiAgICAgICAgdGhpcy5tYXBDbGlja0xpc3RlbmVyLnR5cGUsXHJcbiAgICAgICAgdGhpcy5tYXBDbGlja0xpc3RlbmVyLmxpc3RlbmVyXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPbiBtYXAgY2xpY2ssIHNlbGVjdCBmZWF0dXJlIGF0IHBpeGVsXHJcbiAgICogQHBhcmFtIGV2ZW50IE9MIE1hcEJyb3dzZXJQb2ludGVyRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uTWFwQ2xpY2soZXZlbnQ6IE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCkge1xyXG4gICAgY29uc3QgZXhjbHVzaXZlID0gIWN0cmxLZXlEb3duKGV2ZW50KTtcclxuICAgIGNvbnN0IHJldmVyc2UgPSAhZXhjbHVzaXZlO1xyXG4gICAgY29uc3Qgb2xGZWF0dXJlcyA9IGV2ZW50Lm1hcC5nZXRGZWF0dXJlc0F0UGl4ZWwoZXZlbnQucGl4ZWwsIHtcclxuICAgICAgaGl0VG9sZXJhbmNlOiB0aGlzLm9wdGlvbnMuaGl0VG9sZXJhbmNlIHx8IDAsXHJcbiAgICAgIGxheWVyRmlsdGVyOiAob2xMYXllcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHN0b3JlT2xMYXllciA9IHRoaXMuc3RvcmVzLmZpbmQoKHN0b3JlOiBGZWF0dXJlU3RvcmUpID0+IHtcclxuICAgICAgICAgIHJldHVybiBzdG9yZS5sYXllci5vbCA9PT0gb2xMYXllcjtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc3RvcmVPbExheWVyICE9PSB1bmRlZmluZWQ7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5vblNlbGVjdEZyb21NYXAob2xGZWF0dXJlcywgZXhjbHVzaXZlLCByZXZlcnNlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhIGRyYWcgYm94IGludGVyYWN0aW9uIGFuZCwgb24gZHJhZyBib3ggZW5kLCBzZWxlY3QgZmVhdHVyZXNcclxuICAgKi9cclxuICBwcml2YXRlIGFkZERyYWdCb3hJbnRlcmFjdGlvbigpIHtcclxuICAgIGxldCBvbERyYWdTZWxlY3RJbnRlcmFjdGlvbjtcclxuICAgIGNvbnN0IG9sSW50ZXJhY3Rpb25zID0gdGhpcy5tYXAub2wuZ2V0SW50ZXJhY3Rpb25zKCkuZ2V0QXJyYXkoKTtcclxuXHJcbiAgICAvLyBUaGVyZSBjYW4gb25seSBiZSBvbmUgZHJhZ2JveCBpbnRlcmFjdGlvbiwgc28gZmluZCB0aGUgY3VycmVudCBvbmUsIGlmIGFueVxyXG4gICAgLy8gRG9uJ3Qga2VlcCBhIHJlZmVyZW5jZSB0byB0aGUgY3VycmVudCBkcmFnYm94IGJlY2F1c2Ugd2UgZG9uJ3Qgd2FudFxyXG4gICAgLy8gdG8gcmVtb3ZlIGl0IHdoZW4gdGhpcyBzdGFydGVneSBpcyBkZWFjdGl2YXRlZFxyXG4gICAgZm9yIChjb25zdCBvbEludGVyYWN0aW9uIG9mIG9sSW50ZXJhY3Rpb25zKSB7XHJcbiAgICAgIGlmIChvbEludGVyYWN0aW9uIGluc3RhbmNlb2YgT2xEcmFnU2VsZWN0SW50ZXJhY3Rpb24pIHtcclxuICAgICAgICBvbERyYWdTZWxlY3RJbnRlcmFjdGlvbiA9IG9sSW50ZXJhY3Rpb247XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIElmIG5vIGRyYWcgYm94IGludGVyYWN0aW9uIGlzIGZvdW5kLCBjcmVhdGUgYSBuZXcgb25lIGFuZCBhZGQgaXQgdG8gdGhlIG1hcFxyXG4gICAgaWYgKG9sRHJhZ1NlbGVjdEludGVyYWN0aW9uID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgb2xEcmFnU2VsZWN0SW50ZXJhY3Rpb24gPSBuZXcgT2xEcmFnU2VsZWN0SW50ZXJhY3Rpb24oe1xyXG4gICAgICAgIGNvbmRpdGlvbjogY3RybEtleURvd25cclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMubWFwLm9sLmFkZEludGVyYWN0aW9uKG9sRHJhZ1NlbGVjdEludGVyYWN0aW9uKTtcclxuICAgICAgdGhpcy5vbERyYWdTZWxlY3RJbnRlcmFjdGlvbiA9IG9sRHJhZ1NlbGVjdEludGVyYWN0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub2xEcmFnU2VsZWN0SW50ZXJhY3Rpb25FbmRLZXkgPSBvbERyYWdTZWxlY3RJbnRlcmFjdGlvbi5vbihcclxuICAgICAgJ2JveGVuZCcsXHJcbiAgICAgIChldmVudDogT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50KSA9PiB0aGlzLm9uRHJhZ0JveEVuZChldmVudClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgZHJhZyBib3ggaW50ZXJhY3Rpb25cclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZURyYWdCb3hJbnRlcmFjdGlvbigpIHtcclxuICAgIGlmICh0aGlzLm9sRHJhZ1NlbGVjdEludGVyYWN0aW9uRW5kS2V5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdW5CeUtleSh0aGlzLm9sRHJhZ1NlbGVjdEludGVyYWN0aW9uRW5kS2V5KTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLm9sRHJhZ1NlbGVjdEludGVyYWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5tYXAub2wucmVtb3ZlSW50ZXJhY3Rpb24odGhpcy5vbERyYWdTZWxlY3RJbnRlcmFjdGlvbik7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9sRHJhZ1NlbGVjdEludGVyYWN0aW9uID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gZHJhZ2JveCBlbmQsIHNlbGVjdCBmZWF0dXJlcyBpbiBkcmFnIGJveFxyXG4gICAqIEBwYXJhbSBldmVudCBPTCBNYXBCcm93c2VyUG9pbnRlckV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkRyYWdCb3hFbmQoZXZlbnQ6IE9sRHJhZ0JveEV2ZW50KSB7XHJcbiAgICBjb25zdCBleGNsdXNpdmUgPSAhY3RybEtleURvd24oZXZlbnQubWFwQnJvd3NlckV2ZW50KTtcclxuICAgIGNvbnN0IGV4dGVudCA9IGV2ZW50LnRhcmdldC5nZXRHZW9tZXRyeSgpLmdldEV4dGVudCgpO1xyXG4gICAgY29uc3Qgb2xGZWF0dXJlcyA9IHRoaXMuc3RvcmVzLnJlZHVjZSgoYWNjOiBPbEZlYXR1cmVbXSwgc3RvcmU6IEZlYXR1cmVTdG9yZSkgPT4ge1xyXG4gICAgICBjb25zdCBvbFNvdXJjZSA9IHN0b3JlLmxheWVyLm9sLmdldFNvdXJjZSgpO1xyXG4gICAgICBhY2MucHVzaCguLi5vbFNvdXJjZS5nZXRGZWF0dXJlc0luRXh0ZW50KGV4dGVudCkpO1xyXG4gICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSwgW10pO1xyXG4gICAgdGhpcy5vblNlbGVjdEZyb21NYXAob2xGZWF0dXJlcywgZXhjbHVzaXZlLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGZlYXR1cmVzIGFyZSBzZWxlY3RlZCBmcm9tIHRoZSBzdG9yZSwgYWRkXHJcbiAgICogdGhlbSB0byB0aGlzIHN0YXJ0ZWd5J3Mgb3ZlcmxheSBsYXllciAoc2VsZWN0IG9uIG1hcClcclxuICAgKiBAcGFyYW0gZmVhdHVyZXMgU3RvcmUgZmVhdHVyZXNcclxuICAgKi9cclxuICBwcml2YXRlIG9uU2VsZWN0RnJvbVN0b3JlKGZlYXR1cmVzOiBGZWF0dXJlW10pIHtcclxuICAgIGNvbnN0IG1vdGlvbiA9IHRoaXMub3B0aW9ucyA/IHRoaXMub3B0aW9ucy5tb3Rpb24gOiB1bmRlZmluZWQ7XHJcbiAgICBjb25zdCBvbE92ZXJsYXlGZWF0dXJlcyA9IHRoaXMub3ZlcmxheVN0b3JlLmxheWVyLm9sLmdldFNvdXJjZSgpLmdldEZlYXR1cmVzKCk7XHJcbiAgICBjb25zdCBvdmVybGF5RmVhdHVyZXNLZXlzID0gb2xPdmVybGF5RmVhdHVyZXMubWFwKChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4gb2xGZWF0dXJlLmdldElkKCkpO1xyXG4gICAgY29uc3QgZmVhdHVyZXNLZXlzID0gZmVhdHVyZXMubWFwKHRoaXMub3ZlcmxheVN0b3JlLmdldEtleSk7XHJcbiAgICBjb25zdCBkb01vdGlvbiA9IG92ZXJsYXlGZWF0dXJlc0tleXMubGVuZ3RoICE9PSBmZWF0dXJlc0tleXMubGVuZ3RoIHx8XHJcbiAgICAgICFvdmVybGF5RmVhdHVyZXNLZXlzLmV2ZXJ5KChrZXk6IEVudGl0eUtleSkgPT4gZmVhdHVyZXNLZXlzLmluZGV4T2Yoa2V5KSA+PSAwKTtcclxuXHJcbiAgICB0aGlzLm92ZXJsYXlTdG9yZS5zZXRMYXllckZlYXR1cmVzKFxyXG4gICAgICBmZWF0dXJlcyxcclxuICAgICAgZG9Nb3Rpb24gPyBtb3Rpb24gOiBGZWF0dXJlTW90aW9uLk5vbmUsXHJcbiAgICAgIHRoaXMub3B0aW9ucy52aWV3U2NhbGUsXHJcbiAgICAgIHRoaXMub3B0aW9ucy5hcmVhUmF0aW8sXHJcbiAgICAgIHRoaXMub3B0aW9ucy5nZXRGZWF0dXJlSWRcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGZlYXR1cmVzIGFyZSBzZWxlY3RlZCBmcm9tIHRoZSBtYXAsIGFsc28gc2VsZWN0IHRoZW1cclxuICAgKiBpbiB0aGVpciBzdG9yZS5cclxuICAgKiBAcGFyYW0gb2xGZWF0dXJlcyBPTCBmZWF0dXJlIG9iamVjdHNcclxuICAgKi9cclxuICBwcml2YXRlIG9uU2VsZWN0RnJvbU1hcChvbEZlYXR1cmVzOiBPbEZlYXR1cmVbXSwgZXhjbHVzaXZlOiBib29sZWFuLCByZXZlcnNlOiBib29sZWFuKSB7XHJcbiAgICBjb25zdCBncm91cGVkRmVhdHVyZXMgPSB0aGlzLmdyb3VwRmVhdHVyZXNCeVN0b3JlKG9sRmVhdHVyZXMpO1xyXG5cclxuICAgIHRoaXMuc3RvcmVzLmZvckVhY2goKHN0b3JlOiBGZWF0dXJlU3RvcmUpID0+IHtcclxuICAgICAgY29uc3QgZmVhdHVyZXMgPSBncm91cGVkRmVhdHVyZXMuZ2V0KHN0b3JlKTtcclxuICAgICAgaWYgKGZlYXR1cmVzID09PSB1bmRlZmluZWQgJiYgZXhjbHVzaXZlID09PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy51bnNlbGVjdEFsbEZlYXR1cmVzRnJvbVN0b3JlKHN0b3JlKTtcclxuICAgICAgfSBlbHNlIGlmIChmZWF0dXJlcyA9PT0gdW5kZWZpbmVkICYmIGV4Y2x1c2l2ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAvLyBEbyBub3RoaW5nXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RGZWF0dXJlc0Zyb21TdG9yZShzdG9yZSwgZmVhdHVyZXMsIGV4Y2x1c2l2ZSwgcmV2ZXJzZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VsZWN0IGZlYXR1cmVzIGluIHN0b3JlXHJcbiAgICogQHBhcmFtIHN0b3JlOiBGZWF0dXJlIHN0b3JlXHJcbiAgICogQHBhcmFtIGZlYXR1cmVzIEZlYXR1cmVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZWxlY3RGZWF0dXJlc0Zyb21TdG9yZShzdG9yZTogRmVhdHVyZVN0b3JlLCBmZWF0dXJlczogRmVhdHVyZVtdLCBleGNsdXNpdmU6IGJvb2xlYW4sIHJldmVyc2U6IGJvb2xlYW4pIHtcclxuICAgIGlmIChyZXZlcnNlID09PSB0cnVlKSB7XHJcbiAgICAgIHN0b3JlLnN0YXRlLnJldmVyc2VNYW55KGZlYXR1cmVzLCBbJ3NlbGVjdGVkJ10pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3RvcmUuc3RhdGUudXBkYXRlTWFueShmZWF0dXJlcywge3NlbGVjdGVkOiB0cnVlfSwgZXhjbHVzaXZlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuc2VsZWN0IGFsbCBmZWF0dXJlcyBmcm9tIHN0b3JlXHJcbiAgICogQHBhcmFtIHN0b3JlOiBGZWF0dXJlIHN0b3JlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1bnNlbGVjdEFsbEZlYXR1cmVzRnJvbVN0b3JlKHN0b3JlOiBGZWF0dXJlU3RvcmUpIHtcclxuICAgIHN0b3JlLnN0YXRlLnVwZGF0ZUFsbCh7c2VsZWN0ZWQ6IGZhbHNlfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIGEgc3RvcmUgLT4gZmVhdHVyZXMgbWFwcGluZyBmcm9tIGEgbGlzdFxyXG4gICAqIG9mIE9MIHNlbGVjdGVkIGZlYXR1cmVzLiBPTCBmZWF0dXJlcyBrZWVwIGEgcmVmZXJlbmNlIHRvIHRoZSBzdG9yZVxyXG4gICAqIHRoZXkgYXJlIGZyb20uXHJcbiAgICogQHBhcmFtIG9sRmVhdHVyZXM6IE9MIGZlYXR1cmUgb2JqZWN0c1xyXG4gICAqIEByZXR1cm5zIFN0b3JlIC0+IGZlYXR1cmVzIG1hcHBpbmdcclxuICAgKi9cclxuICBwcml2YXRlIGdyb3VwRmVhdHVyZXNCeVN0b3JlKG9sRmVhdHVyZXM6IE9sRmVhdHVyZVtdKTogTWFwPEZlYXR1cmVTdG9yZSwgRmVhdHVyZVtdPiB7XHJcbiAgICBjb25zdCBncm91cGVkRmVhdHVyZXMgPSBuZXcgTWFwPEZlYXR1cmVTdG9yZSwgRmVhdHVyZVtdPigpO1xyXG4gICAgaWYgKG9sRmVhdHVyZXMgPT09IG51bGwgfHwgb2xGZWF0dXJlcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiBncm91cGVkRmVhdHVyZXM7XHJcbiAgICB9XHJcblxyXG4gICAgb2xGZWF0dXJlcy5mb3JFYWNoKChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4ge1xyXG4gICAgICBjb25zdCBzdG9yZSA9IG9sRmVhdHVyZS5nZXQoJ19mZWF0dXJlU3RvcmUnKTtcclxuICAgICAgaWYgKHN0b3JlID09PSB1bmRlZmluZWQpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICBsZXQgZmVhdHVyZXMgPSBncm91cGVkRmVhdHVyZXMuZ2V0KHN0b3JlKTtcclxuICAgICAgaWYgKGZlYXR1cmVzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBmZWF0dXJlcyA9IFtdO1xyXG4gICAgICAgIGdyb3VwZWRGZWF0dXJlcy5zZXQoc3RvcmUsIGZlYXR1cmVzKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgZmVhdHVyZSA9IHN0b3JlLmdldChvbEZlYXR1cmUuZ2V0SWQoKSk7XHJcbiAgICAgIGlmIChmZWF0dXJlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBmZWF0dXJlcy5wdXNoKGZlYXR1cmUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZ3JvdXBlZEZlYXR1cmVzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGFuIG92ZXJsYXkgc3RvcmUgdGhhdCdsbCBjb250YWluIHRoZSBzZWxlY3RlZCBmZWF0dXJlcy5cclxuICAgKiBAcmV0dXJucyBPdmVybGF5IHN0b3JlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjcmVhdGVPdmVybGF5U3RvcmUoKTogRmVhdHVyZVN0b3JlIHtcclxuICAgIGNvbnN0IG92ZXJsYXlMYXllciA9IHRoaXMub3B0aW9ucy5sYXllclxyXG4gICAgICA/IHRoaXMub3B0aW9ucy5sYXllclxyXG4gICAgICA6IHRoaXMuY3JlYXRlT3ZlcmxheUxheWVyKCk7XHJcbiAgICByZXR1cm4gbmV3IEZlYXR1cmVTdG9yZShbXSwge21hcDogdGhpcy5tYXB9KS5iaW5kTGF5ZXIob3ZlcmxheUxheWVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhbiBvdmVybGF5IHN0b3JlIHRoYXQnbGwgY29udGFpbiB0aGUgc2VsZWN0ZWQgZmVhdHVyZXMuXHJcbiAgICogQHJldHVybnMgT3ZlcmxheSBsYXllclxyXG4gICAqL1xyXG4gIHByaXZhdGUgY3JlYXRlT3ZlcmxheUxheWVyKCk6IFZlY3RvckxheWVyIHtcclxuICAgIHJldHVybiBuZXcgVmVjdG9yTGF5ZXIoe1xyXG4gICAgICB6SW5kZXg6IDMwMCxcclxuICAgICAgc291cmNlOiBuZXcgRmVhdHVyZURhdGFTb3VyY2UoKSxcclxuICAgICAgc3R5bGU6IHVuZGVmaW5lZCxcclxuICAgICAgc2hvd0luTGF5ZXJMaXN0OiBmYWxzZSxcclxuICAgICAgZXhwb3J0YWJsZTogZmFsc2UsXHJcbiAgICAgIGJyb3dzYWJsZTogZmFsc2VcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIHRoZSBvdmVybGF5IHN0b3JlJ3MgbGF5ZXIgdG8gdGhlIG1hcCB0byBkaXNwbGF5IHRoZSBzZWxlY3RlZFxyXG4gICAqIGZlYXR1cmVzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkT3ZlcmxheUxheWVyKCkge1xyXG4gICAgaWYgKHRoaXMub3ZlcmxheVN0b3JlLmxheWVyLm1hcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMubWFwLmFkZExheWVyKHRoaXMub3ZlcmxheVN0b3JlLmxheWVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSB0aGUgb3ZlcmxheSBsYXllciBmcm9tIHRoZSBtYXBcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZU92ZXJsYXlMYXllcigpIHtcclxuICAgIHRoaXMub3ZlcmxheVN0b3JlLnNvdXJjZS5vbC5jbGVhcigpO1xyXG4gICAgdGhpcy5tYXAucmVtb3ZlTGF5ZXIodGhpcy5vdmVybGF5U3RvcmUubGF5ZXIpO1xyXG4gIH1cclxufVxyXG4iXX0=