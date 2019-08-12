/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var OlDragSelectInteraction = /** @class */ (function (_super) {
    tslib_1.__extends(OlDragSelectInteraction, _super);
    function OlDragSelectInteraction(options) {
        return _super.call(this, options) || this;
    }
    return OlDragSelectInteraction;
}(OlDragBoxInteraction));
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
var /**
 * This strategy synchronizes a store and a layer selected entities.
 * The store <-> layer binding is a two-way binding.
 *
 * In many cases, a single strategy bound to multiple stores
 * will yield better results that multiple strategies with each their
 * own store. In the latter scenario, a click on overlapping features
 * would trigger the strategy of each layer and they would cancel
 * each other as well as move the map view around needlessly.
 */
FeatureStoreSelectionStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(FeatureStoreSelectionStrategy, _super);
    function FeatureStoreSelectionStrategy(options) {
        var _this = _super.call(this, options) || this;
        _this.options = options;
        _this.overlayStore = _this.createOverlayStore();
        return _this;
    }
    Object.defineProperty(FeatureStoreSelectionStrategy.prototype, "map", {
        /**
         * The map the layers belong to
         */
        get: /**
         * The map the layers belong to
         * @return {?}
         */
        function () { return this.options.map; },
        enumerable: true,
        configurable: true
    });
    /**
     * Bind this strategy to a store and force this strategy's
     * reactivation to properly setup watchers.
     * @param store Feature store
     */
    /**
     * Bind this strategy to a store and force this strategy's
     * reactivation to properly setup watchers.
     * @param {?} store Feature store
     * @return {?}
     */
    FeatureStoreSelectionStrategy.prototype.bindStore = /**
     * Bind this strategy to a store and force this strategy's
     * reactivation to properly setup watchers.
     * @param {?} store Feature store
     * @return {?}
     */
    function (store) {
        _super.prototype.bindStore.call(this, store);
        if (this.isActive() === true) {
            // Force reactivation
            this.activate();
        }
    };
    /**
     * Unbind this strategy from a store and force this strategy's
     * reactivation to properly setup watchers.
     * @param store Feature store
     */
    /**
     * Unbind this strategy from a store and force this strategy's
     * reactivation to properly setup watchers.
     * @param {?} store Feature store
     * @return {?}
     */
    FeatureStoreSelectionStrategy.prototype.unbindStore = /**
     * Unbind this strategy from a store and force this strategy's
     * reactivation to properly setup watchers.
     * @param {?} store Feature store
     * @return {?}
     */
    function (store) {
        _super.prototype.unbindStore.call(this, store);
        if (this.isActive() === true) {
            // Force reactivation
            this.activate();
        }
    };
    /**
     * Unselect all entities, from all stores
     */
    /**
     * Unselect all entities, from all stores
     * @return {?}
     */
    FeatureStoreSelectionStrategy.prototype.unselectAll = /**
     * Unselect all entities, from all stores
     * @return {?}
     */
    function () {
        this.stores.forEach((/**
         * @param {?} store
         * @return {?}
         */
        function (store) {
            store.state.updateAll({ selected: false });
        }));
    };
    /**
     * @return {?}
     */
    FeatureStoreSelectionStrategy.prototype.clear = /**
     * @return {?}
     */
    function () {
        this.overlayStore.source.ol.clear();
        this.overlayStore.clear();
    };
    /**
     * Add the overlay layer, setup the map click lsitener and
     * start watching for stores selection
     * @internal
     */
    /**
     * Add the overlay layer, setup the map click lsitener and
     * start watching for stores selection
     * \@internal
     * @protected
     * @return {?}
     */
    FeatureStoreSelectionStrategy.prototype.doActivate = /**
     * Add the overlay layer, setup the map click lsitener and
     * start watching for stores selection
     * \@internal
     * @protected
     * @return {?}
     */
    function () {
        this.addOverlayLayer();
        this.listenToMapClick();
        if (this.options.dragBox === true) {
            this.addDragBoxInteraction();
        }
        this.watchAll();
    };
    /**
     * Remove the overlay layer, remove the map click lsitener and
     * stop watching for stores selection
     * @internal
     */
    /**
     * Remove the overlay layer, remove the map click lsitener and
     * stop watching for stores selection
     * \@internal
     * @protected
     * @return {?}
     */
    FeatureStoreSelectionStrategy.prototype.doDeactivate = /**
     * Remove the overlay layer, remove the map click lsitener and
     * stop watching for stores selection
     * \@internal
     * @protected
     * @return {?}
     */
    function () {
        this.unlistenToMapClick();
        this.removeDragBoxInteraction();
        this.unwatchAll();
        this.removeOverlayLayer();
    };
    /**
     * Create a single observable of all the stores. With a single observable,
     * features can be added all at once to the overlay layer and a single
     * motion can be performed. Multiple observable would have
     * a cancelling effect on each other.
     */
    /**
     * Create a single observable of all the stores. With a single observable,
     * features can be added all at once to the overlay layer and a single
     * motion can be performed. Multiple observable would have
     * a cancelling effect on each other.
     * @private
     * @return {?}
     */
    FeatureStoreSelectionStrategy.prototype.watchAll = /**
     * Create a single observable of all the stores. With a single observable,
     * features can be added all at once to the overlay layer and a single
     * motion can be performed. Multiple observable would have
     * a cancelling effect on each other.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.unwatchAll();
        /** @type {?} */
        var stores$ = this.stores.map((/**
         * @param {?} store
         * @return {?}
         */
        function (store) {
            return store.stateView.manyBy$((/**
             * @param {?} record
             * @return {?}
             */
            function (record) {
                return record.state.selected === true;
            })).pipe(map((/**
             * @param {?} records
             * @return {?}
             */
            function (records) { return records.map((/**
             * @param {?} record
             * @return {?}
             */
            function (record) { return record.entity; })); })));
        }));
        this.stores$$ = combineLatest.apply(void 0, tslib_1.__spread(stores$)).pipe(debounceTime(25), skip(1), // Skip intial selection
        map((/**
         * @param {?} features
         * @return {?}
         */
        function (features) { return features.reduce((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) { return a.concat(b); })); }))).subscribe((/**
         * @param {?} features
         * @return {?}
         */
        function (features) { return _this.onSelectFromStore(features); }));
    };
    /**
     * Stop watching for selection in all stores.
     */
    /**
     * Stop watching for selection in all stores.
     * @private
     * @return {?}
     */
    FeatureStoreSelectionStrategy.prototype.unwatchAll = /**
     * Stop watching for selection in all stores.
     * @private
     * @return {?}
     */
    function () {
        if (this.stores$$ !== undefined) {
            this.stores$$.unsubscribe();
        }
    };
    /**
     * Add a 'singleclick' listener to the map that'll allow selecting
     * features by clicking on the map. The selection will be performed
     * only on the layers bound to this strategy.
     */
    /**
     * Add a 'singleclick' listener to the map that'll allow selecting
     * features by clicking on the map. The selection will be performed
     * only on the layers bound to this strategy.
     * @private
     * @return {?}
     */
    FeatureStoreSelectionStrategy.prototype.listenToMapClick = /**
     * Add a 'singleclick' listener to the map that'll allow selecting
     * features by clicking on the map. The selection will be performed
     * only on the layers bound to this strategy.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.mapClickListener = this.map.ol.on('singleclick', (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.onMapClick(event);
        }));
    };
    /**
     * Remove the map click listener
     */
    /**
     * Remove the map click listener
     * @private
     * @return {?}
     */
    FeatureStoreSelectionStrategy.prototype.unlistenToMapClick = /**
     * Remove the map click listener
     * @private
     * @return {?}
     */
    function () {
        if (this.mapClickListener !== undefined) {
            this.map.ol.un(this.mapClickListener.type, this.mapClickListener.listener);
        }
    };
    /**
     * On map click, select feature at pixel
     * @param event OL MapBrowserPointerEvent
     */
    /**
     * On map click, select feature at pixel
     * @private
     * @param {?} event OL MapBrowserPointerEvent
     * @return {?}
     */
    FeatureStoreSelectionStrategy.prototype.onMapClick = /**
     * On map click, select feature at pixel
     * @private
     * @param {?} event OL MapBrowserPointerEvent
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
        var exclusive = !ctrlKeyDown(event);
        /** @type {?} */
        var reverse = !exclusive;
        /** @type {?} */
        var olFeatures = event.map.getFeaturesAtPixel(event.pixel, {
            hitTolerance: this.options.hitTolerance || 0,
            layerFilter: (/**
             * @param {?} olLayer
             * @return {?}
             */
            function (olLayer) {
                /** @type {?} */
                var storeOlLayer = _this.stores.find((/**
                 * @param {?} store
                 * @return {?}
                 */
                function (store) {
                    return store.layer.ol === olLayer;
                }));
                return storeOlLayer !== undefined;
            })
        });
        this.onSelectFromMap(olFeatures, exclusive, reverse);
    };
    /**
     * Add a drag box interaction and, on drag box end, select features
     */
    /**
     * Add a drag box interaction and, on drag box end, select features
     * @private
     * @return {?}
     */
    FeatureStoreSelectionStrategy.prototype.addDragBoxInteraction = /**
     * Add a drag box interaction and, on drag box end, select features
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        var e_1, _a;
        /** @type {?} */
        var olDragSelectInteraction;
        /** @type {?} */
        var olInteractions = this.map.ol.getInteractions().getArray();
        try {
            // There can only be one dragbox interaction, so find the current one, if any
            // Don't keep a reference to the current dragbox because we don't want
            // to remove it when this startegy is deactivated
            for (var olInteractions_1 = tslib_1.__values(olInteractions), olInteractions_1_1 = olInteractions_1.next(); !olInteractions_1_1.done; olInteractions_1_1 = olInteractions_1.next()) {
                var olInteraction = olInteractions_1_1.value;
                if (olInteraction instanceof OlDragSelectInteraction) {
                    olDragSelectInteraction = olInteraction;
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (olInteractions_1_1 && !olInteractions_1_1.done && (_a = olInteractions_1.return)) _a.call(olInteractions_1);
            }
            finally { if (e_1) throw e_1.error; }
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
        function (event) { return _this.onDragBoxEnd(event); }));
    };
    /**
     * Remove drag box interaction
     */
    /**
     * Remove drag box interaction
     * @private
     * @return {?}
     */
    FeatureStoreSelectionStrategy.prototype.removeDragBoxInteraction = /**
     * Remove drag box interaction
     * @private
     * @return {?}
     */
    function () {
        if (this.olDragSelectInteractionEndKey !== undefined) {
            unByKey(this.olDragSelectInteractionEndKey);
        }
        if (this.olDragSelectInteraction !== undefined) {
            this.map.ol.removeInteraction(this.olDragSelectInteraction);
        }
        this.olDragSelectInteraction = undefined;
    };
    /**
     * On dragbox end, select features in drag box
     * @param event OL MapBrowserPointerEvent
     */
    /**
     * On dragbox end, select features in drag box
     * @private
     * @param {?} event OL MapBrowserPointerEvent
     * @return {?}
     */
    FeatureStoreSelectionStrategy.prototype.onDragBoxEnd = /**
     * On dragbox end, select features in drag box
     * @private
     * @param {?} event OL MapBrowserPointerEvent
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var exclusive = !ctrlKeyDown(event.mapBrowserEvent);
        /** @type {?} */
        var extent = event.target.getGeometry().getExtent();
        /** @type {?} */
        var olFeatures = this.stores.reduce((/**
         * @param {?} acc
         * @param {?} store
         * @return {?}
         */
        function (acc, store) {
            /** @type {?} */
            var olSource = store.layer.ol.getSource();
            acc.push.apply(acc, tslib_1.__spread(olSource.getFeaturesInExtent(extent)));
            return acc;
        }), []);
        this.onSelectFromMap(olFeatures, exclusive, false);
    };
    /**
     * When features are selected from the store, add
     * them to this startegy's overlay layer (select on map)
     * @param features Store features
     */
    /**
     * When features are selected from the store, add
     * them to this startegy's overlay layer (select on map)
     * @private
     * @param {?} features Store features
     * @return {?}
     */
    FeatureStoreSelectionStrategy.prototype.onSelectFromStore = /**
     * When features are selected from the store, add
     * them to this startegy's overlay layer (select on map)
     * @private
     * @param {?} features Store features
     * @return {?}
     */
    function (features) {
        /** @type {?} */
        var motion = this.options ? this.options.motion : undefined;
        /** @type {?} */
        var olOverlayFeatures = this.overlayStore.layer.ol.getSource().getFeatures();
        /** @type {?} */
        var overlayFeaturesKeys = olOverlayFeatures.map((/**
         * @param {?} olFeature
         * @return {?}
         */
        function (olFeature) { return olFeature.getId(); }));
        /** @type {?} */
        var featuresKeys = features.map(this.overlayStore.getKey);
        /** @type {?} */
        var doMotion = overlayFeaturesKeys.length !== featuresKeys.length ||
            !overlayFeaturesKeys.every((/**
             * @param {?} key
             * @return {?}
             */
            function (key) { return featuresKeys.indexOf(key) >= 0; }));
        this.overlayStore.setLayerFeatures(features, doMotion ? motion : FeatureMotion.None, this.options.viewScale, this.options.areaRatio, this.options.getFeatureId);
    };
    /**
     * When features are selected from the map, also select them
     * in their store.
     * @param olFeatures OL feature objects
     */
    /**
     * When features are selected from the map, also select them
     * in their store.
     * @private
     * @param {?} olFeatures OL feature objects
     * @param {?} exclusive
     * @param {?} reverse
     * @return {?}
     */
    FeatureStoreSelectionStrategy.prototype.onSelectFromMap = /**
     * When features are selected from the map, also select them
     * in their store.
     * @private
     * @param {?} olFeatures OL feature objects
     * @param {?} exclusive
     * @param {?} reverse
     * @return {?}
     */
    function (olFeatures, exclusive, reverse) {
        var _this = this;
        /** @type {?} */
        var groupedFeatures = this.groupFeaturesByStore(olFeatures);
        this.stores.forEach((/**
         * @param {?} store
         * @return {?}
         */
        function (store) {
            /** @type {?} */
            var features = groupedFeatures.get(store);
            if (features === undefined && exclusive === true) {
                _this.unselectAllFeaturesFromStore(store);
            }
            else if (features === undefined && exclusive === false) {
                // Do nothing
            }
            else {
                _this.selectFeaturesFromStore(store, features, exclusive, reverse);
            }
        }));
    };
    /**
     * Select features in store
     * @param store: Feature store
     * @param features Features
     */
    /**
     * Select features in store
     * @private
     * @param {?} store
     * @param {?} features Features
     * @param {?} exclusive
     * @param {?} reverse
     * @return {?}
     */
    FeatureStoreSelectionStrategy.prototype.selectFeaturesFromStore = /**
     * Select features in store
     * @private
     * @param {?} store
     * @param {?} features Features
     * @param {?} exclusive
     * @param {?} reverse
     * @return {?}
     */
    function (store, features, exclusive, reverse) {
        if (reverse === true) {
            store.state.reverseMany(features, ['selected']);
        }
        else {
            store.state.updateMany(features, { selected: true }, exclusive);
        }
    };
    /**
     * Unselect all features from store
     * @param store: Feature store
     */
    /**
     * Unselect all features from store
     * @private
     * @param {?} store
     * @return {?}
     */
    FeatureStoreSelectionStrategy.prototype.unselectAllFeaturesFromStore = /**
     * Unselect all features from store
     * @private
     * @param {?} store
     * @return {?}
     */
    function (store) {
        store.state.updateAll({ selected: false });
    };
    /**
     * This method returns a store -> features mapping from a list
     * of OL selected features. OL features keep a reference to the store
     * they are from.
     * @param olFeatures: OL feature objects
     * @returns Store -> features mapping
     */
    /**
     * This method returns a store -> features mapping from a list
     * of OL selected features. OL features keep a reference to the store
     * they are from.
     * @private
     * @param {?} olFeatures
     * @return {?} Store -> features mapping
     */
    FeatureStoreSelectionStrategy.prototype.groupFeaturesByStore = /**
     * This method returns a store -> features mapping from a list
     * of OL selected features. OL features keep a reference to the store
     * they are from.
     * @private
     * @param {?} olFeatures
     * @return {?} Store -> features mapping
     */
    function (olFeatures) {
        /** @type {?} */
        var groupedFeatures = new Map();
        if (olFeatures === null || olFeatures === undefined) {
            return groupedFeatures;
        }
        olFeatures.forEach((/**
         * @param {?} olFeature
         * @return {?}
         */
        function (olFeature) {
            /** @type {?} */
            var store = olFeature.get('_featureStore');
            if (store === undefined) {
                return;
            }
            /** @type {?} */
            var features = groupedFeatures.get(store);
            if (features === undefined) {
                features = [];
                groupedFeatures.set(store, features);
            }
            /** @type {?} */
            var feature = store.get(olFeature.getId());
            if (feature !== undefined) {
                features.push(feature);
            }
        }));
        return groupedFeatures;
    };
    /**
     * Create an overlay store that'll contain the selected features.
     * @returns Overlay store
     */
    /**
     * Create an overlay store that'll contain the selected features.
     * @private
     * @return {?} Overlay store
     */
    FeatureStoreSelectionStrategy.prototype.createOverlayStore = /**
     * Create an overlay store that'll contain the selected features.
     * @private
     * @return {?} Overlay store
     */
    function () {
        /** @type {?} */
        var overlayLayer = this.options.layer
            ? this.options.layer
            : this.createOverlayLayer();
        return new FeatureStore([], { map: this.map }).bindLayer(overlayLayer);
    };
    /**
     * Create an overlay store that'll contain the selected features.
     * @returns Overlay layer
     */
    /**
     * Create an overlay store that'll contain the selected features.
     * @private
     * @return {?} Overlay layer
     */
    FeatureStoreSelectionStrategy.prototype.createOverlayLayer = /**
     * Create an overlay store that'll contain the selected features.
     * @private
     * @return {?} Overlay layer
     */
    function () {
        return new VectorLayer({
            zIndex: 300,
            source: new FeatureDataSource(),
            style: undefined,
            showInLayerList: false,
            exportable: false,
            browsable: false
        });
    };
    /**
     * Add the overlay store's layer to the map to display the selected
     * features.
     */
    /**
     * Add the overlay store's layer to the map to display the selected
     * features.
     * @private
     * @return {?}
     */
    FeatureStoreSelectionStrategy.prototype.addOverlayLayer = /**
     * Add the overlay store's layer to the map to display the selected
     * features.
     * @private
     * @return {?}
     */
    function () {
        if (this.overlayStore.layer.map === undefined) {
            this.map.addLayer(this.overlayStore.layer);
        }
    };
    /**
     * Remove the overlay layer from the map
     */
    /**
     * Remove the overlay layer from the map
     * @private
     * @return {?}
     */
    FeatureStoreSelectionStrategy.prototype.removeOverlayLayer = /**
     * Remove the overlay layer from the map
     * @private
     * @return {?}
     */
    function () {
        this.overlayStore.source.ol.clear();
        this.map.removeLayer(this.overlayStore.layer);
    };
    return FeatureStoreSelectionStrategy;
}(FeatureStoreStrategy));
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
export { FeatureStoreSelectionStrategy };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ZlYXR1cmUvc2hhcmVkL3N0cmF0ZWdpZXMvc2VsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxvQkFBb0IsTUFBTSx3QkFBd0IsQ0FBQztBQUkxRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXhDLE9BQU8sRUFBZ0IsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSXpELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQVUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBR25ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDeEMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRDtJQUFzQyxtREFBb0I7SUFDeEQsaUNBQVksT0FBTztlQUNqQixrQkFBTSxPQUFPLENBQUM7SUFDaEIsQ0FBQztJQUNILDhCQUFDO0FBQUQsQ0FBQyxBQUpELENBQXNDLG9CQUFvQixHQUl6RDs7Ozs7Ozs7Ozs7QUFZRDs7Ozs7Ozs7Ozs7SUFBbUQseURBQW9CO0lBNEJyRSx1Q0FBc0IsT0FBNkM7UUFBbkUsWUFDRSxrQkFBTSxPQUFPLENBQUMsU0FFZjtRQUhxQixhQUFPLEdBQVAsT0FBTyxDQUFzQztRQUVqRSxLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDOztJQUNoRCxDQUFDO0lBTEQsc0JBQUksOENBQUc7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IjpbImltcG9ydCBPbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCBPbERyYWdCb3hJbnRlcmFjdGlvbiBmcm9tICdvbC9pbnRlcmFjdGlvbi9EcmFnQm94JztcclxuaW1wb3J0IHsgRHJhZ0JveEV2ZW50IGFzIE9sRHJhZ0JveEV2ZW50IH0gZnJvbSAnb2wvaW50ZXJhY3Rpb24vRHJhZ0JveCc7XHJcbmltcG9ydCB7IExpc3RlbmVyRnVuY3Rpb24gfSBmcm9tICdvbC9ldmVudHMnO1xyXG5pbXBvcnQgeyBNYXBCcm93c2VyUG9pbnRlckV2ZW50IGFzIE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCB9IGZyb20gJ29sL01hcEJyb3dzZXJFdmVudCc7XHJcbmltcG9ydCB7IHVuQnlLZXkgfSBmcm9tICdvbC9PYnNlcnZhYmxlJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgY29tYmluZUxhdGVzdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAsIGRlYm91bmNlVGltZSwgc2tpcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IEVudGl0eUtleSwgRW50aXR5UmVjb3JkIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IEZlYXR1cmVEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IFZlY3RvckxheWVyIH0gZnJvbSAnLi4vLi4vLi4vbGF5ZXInO1xyXG5pbXBvcnQgeyBJZ29NYXAsIGN0cmxLZXlEb3duIH0gZnJvbSAnLi4vLi4vLi4vbWFwJztcclxuXHJcbmltcG9ydCB7IEZlYXR1cmUsIEZlYXR1cmVTdG9yZVNlbGVjdGlvblN0cmF0ZWd5T3B0aW9ucyB9IGZyb20gJy4uL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IEZlYXR1cmVTdG9yZSB9IGZyb20gJy4uL3N0b3JlJztcclxuaW1wb3J0IHsgRmVhdHVyZVN0b3JlU3RyYXRlZ3kgfSBmcm9tICcuL3N0cmF0ZWd5JztcclxuaW1wb3J0IHsgRmVhdHVyZU1vdGlvbiB9IGZyb20gJy4uL2ZlYXR1cmUuZW51bXMnO1xyXG5cclxuY2xhc3MgT2xEcmFnU2VsZWN0SW50ZXJhY3Rpb24gZXh0ZW5kcyBPbERyYWdCb3hJbnRlcmFjdGlvbiB7XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogVGhpcyBzdHJhdGVneSBzeW5jaHJvbml6ZXMgYSBzdG9yZSBhbmQgYSBsYXllciBzZWxlY3RlZCBlbnRpdGllcy5cclxuICogVGhlIHN0b3JlIDwtPiBsYXllciBiaW5kaW5nIGlzIGEgdHdvLXdheSBiaW5kaW5nLlxyXG4gKlxyXG4gKiBJbiBtYW55IGNhc2VzLCBhIHNpbmdsZSBzdHJhdGVneSBib3VuZCB0byBtdWx0aXBsZSBzdG9yZXNcclxuICogd2lsbCB5aWVsZCBiZXR0ZXIgcmVzdWx0cyB0aGF0IG11bHRpcGxlIHN0cmF0ZWdpZXMgd2l0aCBlYWNoIHRoZWlyXHJcbiAqIG93biBzdG9yZS4gSW4gdGhlIGxhdHRlciBzY2VuYXJpbywgYSBjbGljayBvbiBvdmVybGFwcGluZyBmZWF0dXJlc1xyXG4gKiB3b3VsZCB0cmlnZ2VyIHRoZSBzdHJhdGVneSBvZiBlYWNoIGxheWVyIGFuZCB0aGV5IHdvdWxkIGNhbmNlbFxyXG4gKiBlYWNoIG90aGVyIGFzIHdlbGwgYXMgbW92ZSB0aGUgbWFwIHZpZXcgYXJvdW5kIG5lZWRsZXNzbHkuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRmVhdHVyZVN0b3JlU2VsZWN0aW9uU3RyYXRlZ3kgZXh0ZW5kcyBGZWF0dXJlU3RvcmVTdHJhdGVneSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIExpc3RlbmVyIHRvIHRoZSBtYXAgY2xpY2sgZXZlbnQgdGhhdCBhbGxvd3Mgc2VsZWN0aW5nIGEgZmVhdHVyZVxyXG4gICAqIGJ5IGNsaWNraW5nIG9uIHRoZSBtYXBcclxuICAgKi9cclxuICBwcml2YXRlIG1hcENsaWNrTGlzdGVuZXI6IExpc3RlbmVyRnVuY3Rpb247XHJcblxyXG4gIHByaXZhdGUgb2xEcmFnU2VsZWN0SW50ZXJhY3Rpb246IE9sRHJhZ1NlbGVjdEludGVyYWN0aW9uO1xyXG5cclxuICBwcml2YXRlIG9sRHJhZ1NlbGVjdEludGVyYWN0aW9uRW5kS2V5OiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZmVhdHVyZSBzdG9yZSB0aGF0J2xsIGNvbnRhaW4gdGhlIHNlbGVjdGVkIGZlYXR1cmVzLiBJdCBoYXMgaXQncyBvd25cclxuICAgKiBsYXllciwgc2hhcmVkIGJ5IGFsbCB0aGUgc3RvcmVzIHRoaXMgc3RhcmV0Z3kgaXMgYm91bmQgdG8uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvdmVybGF5U3RvcmU6IEZlYXR1cmVTdG9yZTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvIGFsbCBzdG9yZXMgc2VsZWN0ZWQgZW50aXRpZXNcclxuICAgKi9cclxuICBwcml2YXRlIHN0b3JlcyQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBtYXAgdGhlIGxheWVycyBiZWxvbmcgdG9cclxuICAgKi9cclxuICBnZXQgbWFwKCk6IElnb01hcCB7IHJldHVybiB0aGlzLm9wdGlvbnMubWFwOyB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBvcHRpb25zOiBGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneU9wdGlvbnMpIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgdGhpcy5vdmVybGF5U3RvcmUgPSB0aGlzLmNyZWF0ZU92ZXJsYXlTdG9yZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQmluZCB0aGlzIHN0cmF0ZWd5IHRvIGEgc3RvcmUgYW5kIGZvcmNlIHRoaXMgc3RyYXRlZ3knc1xyXG4gICAqIHJlYWN0aXZhdGlvbiB0byBwcm9wZXJseSBzZXR1cCB3YXRjaGVycy5cclxuICAgKiBAcGFyYW0gc3RvcmUgRmVhdHVyZSBzdG9yZVxyXG4gICAqL1xyXG4gIGJpbmRTdG9yZShzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBzdXBlci5iaW5kU3RvcmUoc3RvcmUpO1xyXG4gICAgaWYgKHRoaXMuaXNBY3RpdmUoKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAvLyBGb3JjZSByZWFjdGl2YXRpb25cclxuICAgICAgdGhpcy5hY3RpdmF0ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5iaW5kIHRoaXMgc3RyYXRlZ3kgZnJvbSBhIHN0b3JlIGFuZCBmb3JjZSB0aGlzIHN0cmF0ZWd5J3NcclxuICAgKiByZWFjdGl2YXRpb24gdG8gcHJvcGVybHkgc2V0dXAgd2F0Y2hlcnMuXHJcbiAgICogQHBhcmFtIHN0b3JlIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICB1bmJpbmRTdG9yZShzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBzdXBlci51bmJpbmRTdG9yZShzdG9yZSk7XHJcbiAgICBpZiAodGhpcy5pc0FjdGl2ZSgpID09PSB0cnVlKSB7XHJcbiAgICAgIC8vIEZvcmNlIHJlYWN0aXZhdGlvblxyXG4gICAgICB0aGlzLmFjdGl2YXRlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbnNlbGVjdCBhbGwgZW50aXRpZXMsIGZyb20gYWxsIHN0b3Jlc1xyXG4gICAqL1xyXG4gIHVuc2VsZWN0QWxsKCkge1xyXG4gICAgdGhpcy5zdG9yZXMuZm9yRWFjaCgoc3RvcmU6IEZlYXR1cmVTdG9yZSkgPT4ge1xyXG4gICAgICBzdG9yZS5zdGF0ZS51cGRhdGVBbGwoe3NlbGVjdGVkOiBmYWxzZX0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjbGVhcigpIHtcclxuICAgIHRoaXMub3ZlcmxheVN0b3JlLnNvdXJjZS5vbC5jbGVhcigpO1xyXG4gICAgdGhpcy5vdmVybGF5U3RvcmUuY2xlYXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCB0aGUgb3ZlcmxheSBsYXllciwgc2V0dXAgdGhlIG1hcCBjbGljayBsc2l0ZW5lciBhbmRcclxuICAgKiBzdGFydCB3YXRjaGluZyBmb3Igc3RvcmVzIHNlbGVjdGlvblxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBkb0FjdGl2YXRlKCkge1xyXG4gICAgdGhpcy5hZGRPdmVybGF5TGF5ZXIoKTtcclxuICAgIHRoaXMubGlzdGVuVG9NYXBDbGljaygpO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5kcmFnQm94ID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuYWRkRHJhZ0JveEludGVyYWN0aW9uKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLndhdGNoQWxsKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgdGhlIG92ZXJsYXkgbGF5ZXIsIHJlbW92ZSB0aGUgbWFwIGNsaWNrIGxzaXRlbmVyIGFuZFxyXG4gICAqIHN0b3Agd2F0Y2hpbmcgZm9yIHN0b3JlcyBzZWxlY3Rpb25cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgZG9EZWFjdGl2YXRlKCkge1xyXG4gICAgdGhpcy51bmxpc3RlblRvTWFwQ2xpY2soKTtcclxuICAgIHRoaXMucmVtb3ZlRHJhZ0JveEludGVyYWN0aW9uKCk7XHJcbiAgICB0aGlzLnVud2F0Y2hBbGwoKTtcclxuICAgIHRoaXMucmVtb3ZlT3ZlcmxheUxheWVyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYSBzaW5nbGUgb2JzZXJ2YWJsZSBvZiBhbGwgdGhlIHN0b3Jlcy4gV2l0aCBhIHNpbmdsZSBvYnNlcnZhYmxlLFxyXG4gICAqIGZlYXR1cmVzIGNhbiBiZSBhZGRlZCBhbGwgYXQgb25jZSB0byB0aGUgb3ZlcmxheSBsYXllciBhbmQgYSBzaW5nbGVcclxuICAgKiBtb3Rpb24gY2FuIGJlIHBlcmZvcm1lZC4gTXVsdGlwbGUgb2JzZXJ2YWJsZSB3b3VsZCBoYXZlXHJcbiAgICogYSBjYW5jZWxsaW5nIGVmZmVjdCBvbiBlYWNoIG90aGVyLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgd2F0Y2hBbGwoKSB7XHJcbiAgICB0aGlzLnVud2F0Y2hBbGwoKTtcclxuXHJcbiAgICBjb25zdCBzdG9yZXMkID0gdGhpcy5zdG9yZXMubWFwKChzdG9yZTogRmVhdHVyZVN0b3JlKSA9PiB7XHJcbiAgICAgIHJldHVybiBzdG9yZS5zdGF0ZVZpZXcubWFueUJ5JCgocmVjb3JkOiBFbnRpdHlSZWNvcmQ8RmVhdHVyZT4pID0+IHtcclxuICAgICAgICByZXR1cm4gcmVjb3JkLnN0YXRlLnNlbGVjdGVkID09PSB0cnVlO1xyXG4gICAgICB9KS5waXBlKFxyXG4gICAgICAgIG1hcCgocmVjb3JkczogRW50aXR5UmVjb3JkPEZlYXR1cmU+W10pID0+IHJlY29yZHMubWFwKHJlY29yZCA9PiByZWNvcmQuZW50aXR5KSlcclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zdG9yZXMkJCA9IGNvbWJpbmVMYXRlc3QoLi4uc3RvcmVzJClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgZGVib3VuY2VUaW1lKDI1KSxcclxuICAgICAgICBza2lwKDEpLCAvLyBTa2lwIGludGlhbCBzZWxlY3Rpb25cclxuICAgICAgICBtYXAoKGZlYXR1cmVzOiBBcnJheTxGZWF0dXJlW10+KSA9PiBmZWF0dXJlcy5yZWR1Y2UoKGEsIGIpID0+IGEuY29uY2F0KGIpKSlcclxuICAgICAgKS5zdWJzY3JpYmUoKGZlYXR1cmVzOiBGZWF0dXJlW10pID0+IHRoaXMub25TZWxlY3RGcm9tU3RvcmUoZmVhdHVyZXMpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3Agd2F0Y2hpbmcgZm9yIHNlbGVjdGlvbiBpbiBhbGwgc3RvcmVzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgdW53YXRjaEFsbCgpIHtcclxuICAgIGlmICh0aGlzLnN0b3JlcyQkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5zdG9yZXMkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGEgJ3NpbmdsZWNsaWNrJyBsaXN0ZW5lciB0byB0aGUgbWFwIHRoYXQnbGwgYWxsb3cgc2VsZWN0aW5nXHJcbiAgICogZmVhdHVyZXMgYnkgY2xpY2tpbmcgb24gdGhlIG1hcC4gVGhlIHNlbGVjdGlvbiB3aWxsIGJlIHBlcmZvcm1lZFxyXG4gICAqIG9ubHkgb24gdGhlIGxheWVycyBib3VuZCB0byB0aGlzIHN0cmF0ZWd5LlxyXG4gICAqL1xyXG4gIHByaXZhdGUgbGlzdGVuVG9NYXBDbGljaygpIHtcclxuICAgIHRoaXMubWFwQ2xpY2tMaXN0ZW5lciA9IHRoaXMubWFwLm9sLm9uKCdzaW5nbGVjbGljaycsIChldmVudDogT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMub25NYXBDbGljayhldmVudCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSB0aGUgbWFwIGNsaWNrIGxpc3RlbmVyXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1bmxpc3RlblRvTWFwQ2xpY2soKSB7XHJcbiAgICBpZiAodGhpcy5tYXBDbGlja0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5tYXAub2wudW4oXHJcbiAgICAgICAgdGhpcy5tYXBDbGlja0xpc3RlbmVyLnR5cGUsXHJcbiAgICAgICAgdGhpcy5tYXBDbGlja0xpc3RlbmVyLmxpc3RlbmVyXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPbiBtYXAgY2xpY2ssIHNlbGVjdCBmZWF0dXJlIGF0IHBpeGVsXHJcbiAgICogQHBhcmFtIGV2ZW50IE9MIE1hcEJyb3dzZXJQb2ludGVyRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uTWFwQ2xpY2soZXZlbnQ6IE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCkge1xyXG4gICAgY29uc3QgZXhjbHVzaXZlID0gIWN0cmxLZXlEb3duKGV2ZW50KTtcclxuICAgIGNvbnN0IHJldmVyc2UgPSAhZXhjbHVzaXZlO1xyXG4gICAgY29uc3Qgb2xGZWF0dXJlcyA9IGV2ZW50Lm1hcC5nZXRGZWF0dXJlc0F0UGl4ZWwoZXZlbnQucGl4ZWwsIHtcclxuICAgICAgaGl0VG9sZXJhbmNlOiB0aGlzLm9wdGlvbnMuaGl0VG9sZXJhbmNlIHx8IDAsXHJcbiAgICAgIGxheWVyRmlsdGVyOiAob2xMYXllcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHN0b3JlT2xMYXllciA9IHRoaXMuc3RvcmVzLmZpbmQoKHN0b3JlOiBGZWF0dXJlU3RvcmUpID0+IHtcclxuICAgICAgICAgIHJldHVybiBzdG9yZS5sYXllci5vbCA9PT0gb2xMYXllcjtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc3RvcmVPbExheWVyICE9PSB1bmRlZmluZWQ7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5vblNlbGVjdEZyb21NYXAob2xGZWF0dXJlcywgZXhjbHVzaXZlLCByZXZlcnNlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhIGRyYWcgYm94IGludGVyYWN0aW9uIGFuZCwgb24gZHJhZyBib3ggZW5kLCBzZWxlY3QgZmVhdHVyZXNcclxuICAgKi9cclxuICBwcml2YXRlIGFkZERyYWdCb3hJbnRlcmFjdGlvbigpIHtcclxuICAgIGxldCBvbERyYWdTZWxlY3RJbnRlcmFjdGlvbjtcclxuICAgIGNvbnN0IG9sSW50ZXJhY3Rpb25zID0gdGhpcy5tYXAub2wuZ2V0SW50ZXJhY3Rpb25zKCkuZ2V0QXJyYXkoKTtcclxuXHJcbiAgICAvLyBUaGVyZSBjYW4gb25seSBiZSBvbmUgZHJhZ2JveCBpbnRlcmFjdGlvbiwgc28gZmluZCB0aGUgY3VycmVudCBvbmUsIGlmIGFueVxyXG4gICAgLy8gRG9uJ3Qga2VlcCBhIHJlZmVyZW5jZSB0byB0aGUgY3VycmVudCBkcmFnYm94IGJlY2F1c2Ugd2UgZG9uJ3Qgd2FudFxyXG4gICAgLy8gdG8gcmVtb3ZlIGl0IHdoZW4gdGhpcyBzdGFydGVneSBpcyBkZWFjdGl2YXRlZFxyXG4gICAgZm9yIChjb25zdCBvbEludGVyYWN0aW9uIG9mIG9sSW50ZXJhY3Rpb25zKSB7XHJcbiAgICAgIGlmIChvbEludGVyYWN0aW9uIGluc3RhbmNlb2YgT2xEcmFnU2VsZWN0SW50ZXJhY3Rpb24pIHtcclxuICAgICAgICBvbERyYWdTZWxlY3RJbnRlcmFjdGlvbiA9IG9sSW50ZXJhY3Rpb247XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIElmIG5vIGRyYWcgYm94IGludGVyYWN0aW9uIGlzIGZvdW5kLCBjcmVhdGUgYSBuZXcgb25lIGFuZCBhZGQgaXQgdG8gdGhlIG1hcFxyXG4gICAgaWYgKG9sRHJhZ1NlbGVjdEludGVyYWN0aW9uID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgb2xEcmFnU2VsZWN0SW50ZXJhY3Rpb24gPSBuZXcgT2xEcmFnU2VsZWN0SW50ZXJhY3Rpb24oe1xyXG4gICAgICAgIGNvbmRpdGlvbjogY3RybEtleURvd25cclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMubWFwLm9sLmFkZEludGVyYWN0aW9uKG9sRHJhZ1NlbGVjdEludGVyYWN0aW9uKTtcclxuICAgICAgdGhpcy5vbERyYWdTZWxlY3RJbnRlcmFjdGlvbiA9IG9sRHJhZ1NlbGVjdEludGVyYWN0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub2xEcmFnU2VsZWN0SW50ZXJhY3Rpb25FbmRLZXkgPSBvbERyYWdTZWxlY3RJbnRlcmFjdGlvbi5vbihcclxuICAgICAgJ2JveGVuZCcsXHJcbiAgICAgIChldmVudDogT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50KSA9PiB0aGlzLm9uRHJhZ0JveEVuZChldmVudClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgZHJhZyBib3ggaW50ZXJhY3Rpb25cclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZURyYWdCb3hJbnRlcmFjdGlvbigpIHtcclxuICAgIGlmICh0aGlzLm9sRHJhZ1NlbGVjdEludGVyYWN0aW9uRW5kS2V5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdW5CeUtleSh0aGlzLm9sRHJhZ1NlbGVjdEludGVyYWN0aW9uRW5kS2V5KTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLm9sRHJhZ1NlbGVjdEludGVyYWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5tYXAub2wucmVtb3ZlSW50ZXJhY3Rpb24odGhpcy5vbERyYWdTZWxlY3RJbnRlcmFjdGlvbik7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9sRHJhZ1NlbGVjdEludGVyYWN0aW9uID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gZHJhZ2JveCBlbmQsIHNlbGVjdCBmZWF0dXJlcyBpbiBkcmFnIGJveFxyXG4gICAqIEBwYXJhbSBldmVudCBPTCBNYXBCcm93c2VyUG9pbnRlckV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkRyYWdCb3hFbmQoZXZlbnQ6IE9sRHJhZ0JveEV2ZW50KSB7XHJcbiAgICBjb25zdCBleGNsdXNpdmUgPSAhY3RybEtleURvd24oZXZlbnQubWFwQnJvd3NlckV2ZW50KTtcclxuICAgIGNvbnN0IGV4dGVudCA9IGV2ZW50LnRhcmdldC5nZXRHZW9tZXRyeSgpLmdldEV4dGVudCgpO1xyXG4gICAgY29uc3Qgb2xGZWF0dXJlcyA9IHRoaXMuc3RvcmVzLnJlZHVjZSgoYWNjOiBPbEZlYXR1cmVbXSwgc3RvcmU6IEZlYXR1cmVTdG9yZSkgPT4ge1xyXG4gICAgICBjb25zdCBvbFNvdXJjZSA9IHN0b3JlLmxheWVyLm9sLmdldFNvdXJjZSgpO1xyXG4gICAgICBhY2MucHVzaCguLi5vbFNvdXJjZS5nZXRGZWF0dXJlc0luRXh0ZW50KGV4dGVudCkpO1xyXG4gICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSwgW10pO1xyXG4gICAgdGhpcy5vblNlbGVjdEZyb21NYXAob2xGZWF0dXJlcywgZXhjbHVzaXZlLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGZlYXR1cmVzIGFyZSBzZWxlY3RlZCBmcm9tIHRoZSBzdG9yZSwgYWRkXHJcbiAgICogdGhlbSB0byB0aGlzIHN0YXJ0ZWd5J3Mgb3ZlcmxheSBsYXllciAoc2VsZWN0IG9uIG1hcClcclxuICAgKiBAcGFyYW0gZmVhdHVyZXMgU3RvcmUgZmVhdHVyZXNcclxuICAgKi9cclxuICBwcml2YXRlIG9uU2VsZWN0RnJvbVN0b3JlKGZlYXR1cmVzOiBGZWF0dXJlW10pIHtcclxuICAgIGNvbnN0IG1vdGlvbiA9IHRoaXMub3B0aW9ucyA/IHRoaXMub3B0aW9ucy5tb3Rpb24gOiB1bmRlZmluZWQ7XHJcbiAgICBjb25zdCBvbE92ZXJsYXlGZWF0dXJlcyA9IHRoaXMub3ZlcmxheVN0b3JlLmxheWVyLm9sLmdldFNvdXJjZSgpLmdldEZlYXR1cmVzKCk7XHJcbiAgICBjb25zdCBvdmVybGF5RmVhdHVyZXNLZXlzID0gb2xPdmVybGF5RmVhdHVyZXMubWFwKChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4gb2xGZWF0dXJlLmdldElkKCkpO1xyXG4gICAgY29uc3QgZmVhdHVyZXNLZXlzID0gZmVhdHVyZXMubWFwKHRoaXMub3ZlcmxheVN0b3JlLmdldEtleSk7XHJcbiAgICBjb25zdCBkb01vdGlvbiA9IG92ZXJsYXlGZWF0dXJlc0tleXMubGVuZ3RoICE9PSBmZWF0dXJlc0tleXMubGVuZ3RoIHx8XHJcbiAgICAgICFvdmVybGF5RmVhdHVyZXNLZXlzLmV2ZXJ5KChrZXk6IEVudGl0eUtleSkgPT4gZmVhdHVyZXNLZXlzLmluZGV4T2Yoa2V5KSA+PSAwKTtcclxuXHJcbiAgICB0aGlzLm92ZXJsYXlTdG9yZS5zZXRMYXllckZlYXR1cmVzKFxyXG4gICAgICBmZWF0dXJlcyxcclxuICAgICAgZG9Nb3Rpb24gPyBtb3Rpb24gOiBGZWF0dXJlTW90aW9uLk5vbmUsXHJcbiAgICAgIHRoaXMub3B0aW9ucy52aWV3U2NhbGUsXHJcbiAgICAgIHRoaXMub3B0aW9ucy5hcmVhUmF0aW8sXHJcbiAgICAgIHRoaXMub3B0aW9ucy5nZXRGZWF0dXJlSWRcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGZlYXR1cmVzIGFyZSBzZWxlY3RlZCBmcm9tIHRoZSBtYXAsIGFsc28gc2VsZWN0IHRoZW1cclxuICAgKiBpbiB0aGVpciBzdG9yZS5cclxuICAgKiBAcGFyYW0gb2xGZWF0dXJlcyBPTCBmZWF0dXJlIG9iamVjdHNcclxuICAgKi9cclxuICBwcml2YXRlIG9uU2VsZWN0RnJvbU1hcChvbEZlYXR1cmVzOiBPbEZlYXR1cmVbXSwgZXhjbHVzaXZlOiBib29sZWFuLCByZXZlcnNlOiBib29sZWFuKSB7XHJcbiAgICBjb25zdCBncm91cGVkRmVhdHVyZXMgPSB0aGlzLmdyb3VwRmVhdHVyZXNCeVN0b3JlKG9sRmVhdHVyZXMpO1xyXG5cclxuICAgIHRoaXMuc3RvcmVzLmZvckVhY2goKHN0b3JlOiBGZWF0dXJlU3RvcmUpID0+IHtcclxuICAgICAgY29uc3QgZmVhdHVyZXMgPSBncm91cGVkRmVhdHVyZXMuZ2V0KHN0b3JlKTtcclxuICAgICAgaWYgKGZlYXR1cmVzID09PSB1bmRlZmluZWQgJiYgZXhjbHVzaXZlID09PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy51bnNlbGVjdEFsbEZlYXR1cmVzRnJvbVN0b3JlKHN0b3JlKTtcclxuICAgICAgfSBlbHNlIGlmIChmZWF0dXJlcyA9PT0gdW5kZWZpbmVkICYmIGV4Y2x1c2l2ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAvLyBEbyBub3RoaW5nXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RGZWF0dXJlc0Zyb21TdG9yZShzdG9yZSwgZmVhdHVyZXMsIGV4Y2x1c2l2ZSwgcmV2ZXJzZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VsZWN0IGZlYXR1cmVzIGluIHN0b3JlXHJcbiAgICogQHBhcmFtIHN0b3JlOiBGZWF0dXJlIHN0b3JlXHJcbiAgICogQHBhcmFtIGZlYXR1cmVzIEZlYXR1cmVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZWxlY3RGZWF0dXJlc0Zyb21TdG9yZShzdG9yZTogRmVhdHVyZVN0b3JlLCBmZWF0dXJlczogRmVhdHVyZVtdLCBleGNsdXNpdmU6IGJvb2xlYW4sIHJldmVyc2U6IGJvb2xlYW4pIHtcclxuICAgIGlmIChyZXZlcnNlID09PSB0cnVlKSB7XHJcbiAgICAgIHN0b3JlLnN0YXRlLnJldmVyc2VNYW55KGZlYXR1cmVzLCBbJ3NlbGVjdGVkJ10pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3RvcmUuc3RhdGUudXBkYXRlTWFueShmZWF0dXJlcywge3NlbGVjdGVkOiB0cnVlfSwgZXhjbHVzaXZlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuc2VsZWN0IGFsbCBmZWF0dXJlcyBmcm9tIHN0b3JlXHJcbiAgICogQHBhcmFtIHN0b3JlOiBGZWF0dXJlIHN0b3JlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1bnNlbGVjdEFsbEZlYXR1cmVzRnJvbVN0b3JlKHN0b3JlOiBGZWF0dXJlU3RvcmUpIHtcclxuICAgIHN0b3JlLnN0YXRlLnVwZGF0ZUFsbCh7c2VsZWN0ZWQ6IGZhbHNlfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIGEgc3RvcmUgLT4gZmVhdHVyZXMgbWFwcGluZyBmcm9tIGEgbGlzdFxyXG4gICAqIG9mIE9MIHNlbGVjdGVkIGZlYXR1cmVzLiBPTCBmZWF0dXJlcyBrZWVwIGEgcmVmZXJlbmNlIHRvIHRoZSBzdG9yZVxyXG4gICAqIHRoZXkgYXJlIGZyb20uXHJcbiAgICogQHBhcmFtIG9sRmVhdHVyZXM6IE9MIGZlYXR1cmUgb2JqZWN0c1xyXG4gICAqIEByZXR1cm5zIFN0b3JlIC0+IGZlYXR1cmVzIG1hcHBpbmdcclxuICAgKi9cclxuICBwcml2YXRlIGdyb3VwRmVhdHVyZXNCeVN0b3JlKG9sRmVhdHVyZXM6IE9sRmVhdHVyZVtdKTogTWFwPEZlYXR1cmVTdG9yZSwgRmVhdHVyZVtdPiB7XHJcbiAgICBjb25zdCBncm91cGVkRmVhdHVyZXMgPSBuZXcgTWFwPEZlYXR1cmVTdG9yZSwgRmVhdHVyZVtdPigpO1xyXG4gICAgaWYgKG9sRmVhdHVyZXMgPT09IG51bGwgfHwgb2xGZWF0dXJlcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiBncm91cGVkRmVhdHVyZXM7XHJcbiAgICB9XHJcblxyXG4gICAgb2xGZWF0dXJlcy5mb3JFYWNoKChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4ge1xyXG4gICAgICBjb25zdCBzdG9yZSA9IG9sRmVhdHVyZS5nZXQoJ19mZWF0dXJlU3RvcmUnKTtcclxuICAgICAgaWYgKHN0b3JlID09PSB1bmRlZmluZWQpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICBsZXQgZmVhdHVyZXMgPSBncm91cGVkRmVhdHVyZXMuZ2V0KHN0b3JlKTtcclxuICAgICAgaWYgKGZlYXR1cmVzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBmZWF0dXJlcyA9IFtdO1xyXG4gICAgICAgIGdyb3VwZWRGZWF0dXJlcy5zZXQoc3RvcmUsIGZlYXR1cmVzKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgZmVhdHVyZSA9IHN0b3JlLmdldChvbEZlYXR1cmUuZ2V0SWQoKSk7XHJcbiAgICAgIGlmIChmZWF0dXJlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBmZWF0dXJlcy5wdXNoKGZlYXR1cmUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZ3JvdXBlZEZlYXR1cmVzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGFuIG92ZXJsYXkgc3RvcmUgdGhhdCdsbCBjb250YWluIHRoZSBzZWxlY3RlZCBmZWF0dXJlcy5cclxuICAgKiBAcmV0dXJucyBPdmVybGF5IHN0b3JlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjcmVhdGVPdmVybGF5U3RvcmUoKTogRmVhdHVyZVN0b3JlIHtcclxuICAgIGNvbnN0IG92ZXJsYXlMYXllciA9IHRoaXMub3B0aW9ucy5sYXllclxyXG4gICAgICA/IHRoaXMub3B0aW9ucy5sYXllclxyXG4gICAgICA6IHRoaXMuY3JlYXRlT3ZlcmxheUxheWVyKCk7XHJcbiAgICByZXR1cm4gbmV3IEZlYXR1cmVTdG9yZShbXSwge21hcDogdGhpcy5tYXB9KS5iaW5kTGF5ZXIob3ZlcmxheUxheWVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhbiBvdmVybGF5IHN0b3JlIHRoYXQnbGwgY29udGFpbiB0aGUgc2VsZWN0ZWQgZmVhdHVyZXMuXHJcbiAgICogQHJldHVybnMgT3ZlcmxheSBsYXllclxyXG4gICAqL1xyXG4gIHByaXZhdGUgY3JlYXRlT3ZlcmxheUxheWVyKCk6IFZlY3RvckxheWVyIHtcclxuICAgIHJldHVybiBuZXcgVmVjdG9yTGF5ZXIoe1xyXG4gICAgICB6SW5kZXg6IDMwMCxcclxuICAgICAgc291cmNlOiBuZXcgRmVhdHVyZURhdGFTb3VyY2UoKSxcclxuICAgICAgc3R5bGU6IHVuZGVmaW5lZCxcclxuICAgICAgc2hvd0luTGF5ZXJMaXN0OiBmYWxzZSxcclxuICAgICAgZXhwb3J0YWJsZTogZmFsc2UsXHJcbiAgICAgIGJyb3dzYWJsZTogZmFsc2VcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIHRoZSBvdmVybGF5IHN0b3JlJ3MgbGF5ZXIgdG8gdGhlIG1hcCB0byBkaXNwbGF5IHRoZSBzZWxlY3RlZFxyXG4gICAqIGZlYXR1cmVzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkT3ZlcmxheUxheWVyKCkge1xyXG4gICAgaWYgKHRoaXMub3ZlcmxheVN0b3JlLmxheWVyLm1hcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMubWFwLmFkZExheWVyKHRoaXMub3ZlcmxheVN0b3JlLmxheWVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSB0aGUgb3ZlcmxheSBsYXllciBmcm9tIHRoZSBtYXBcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZU92ZXJsYXlMYXllcigpIHtcclxuICAgIHRoaXMub3ZlcmxheVN0b3JlLnNvdXJjZS5vbC5jbGVhcigpO1xyXG4gICAgdGhpcy5tYXAucmVtb3ZlTGF5ZXIodGhpcy5vdmVybGF5U3RvcmUubGF5ZXIpO1xyXG4gIH1cclxufVxyXG4iXX0=