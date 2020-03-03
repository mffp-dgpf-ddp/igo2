/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
        _this._overlayStore = _this.createOverlayStore();
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
    Object.defineProperty(FeatureStoreSelectionStrategy.prototype, "overlayStore", {
        /**
         * A feature store that'll contain the selected features. It has it's own
         * layer, shared by all the stores this staretgy is bound to.
         */
        get: /**
         * A feature store that'll contain the selected features. It has it's own
         * layer, shared by all the stores this staretgy is bound to.
         * @return {?}
         */
        function () { return this._overlayStore; },
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
        if (this.active === true) {
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
        if (this.active === true) {
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
        this.stores$$ = combineLatest.apply(void 0, tslib_1.__spread(stores$)).pipe(debounceTime(5), skip(1), // Skip intial selection
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
        var doMotion;
        if (features.length === 0) {
            doMotion = false;
        }
        else {
            doMotion = overlayFeaturesKeys.length !== featuresKeys.length ||
                !overlayFeaturesKeys.every((/**
                 * @param {?} key
                 * @return {?}
                 */
                function (key) { return featuresKeys.indexOf(key) >= 0; }));
        }
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
}(EntityStoreStrategy));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ZlYXR1cmUvc2hhcmVkL3N0cmF0ZWdpZXMvc2VsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxvQkFBb0IsTUFBTSx3QkFBd0IsQ0FBQztBQUkxRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXhDLE9BQU8sRUFBZ0IsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpELE9BQU8sRUFBMkIsbUJBQW1CLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFNUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBVSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN4QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFakQ7SUFBc0MsbURBQW9CO0lBQ3hELGlDQUFZLE9BQU87ZUFDakIsa0JBQU0sT0FBTyxDQUFDO0lBQ2hCLENBQUM7SUFDSCw4QkFBQztBQUFELENBQUMsQUFKRCxDQUFzQyxvQkFBb0IsR0FJekQ7Ozs7Ozs7Ozs7O0FBWUQ7Ozs7Ozs7Ozs7O0lBQW1ELHlEQUFtQjtJQTZCcEUsdUNBQXNCLE9BQTZDO1FBQW5FLFlBQ0Usa0JBQU0sT0FBTyxDQUFDLFNBRWY7UUFIcUIsYUFBTyxHQUFQLE9BQU8sQ0FBc0M7UUFFakUsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzs7SUFDakQsQ0FBQztJQVpELHNCQUFJLDhDQUFH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LG9DQUFDO0FBQUQsQ0FBQyxBQTFYRCxDQUFtRCxtQkFBbUIsR0EwWHJFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBcFhDLHlEQUEyQzs7Ozs7SUFFM0MsZ0VBQXlEOzs7OztJQUV6RCxzRUFBOEM7Ozs7OztJQUs5QyxpREFBK0I7Ozs7O0lBWS9CLHNEQUFvQzs7Ozs7SUFFeEIsZ0RBQXVEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuaW1wb3J0IE9sRHJhZ0JveEludGVyYWN0aW9uIGZyb20gJ29sL2ludGVyYWN0aW9uL0RyYWdCb3gnO1xyXG5pbXBvcnQgeyBEcmFnQm94RXZlbnQgYXMgT2xEcmFnQm94RXZlbnQgfSBmcm9tICdvbC9pbnRlcmFjdGlvbi9EcmFnQm94JztcclxuaW1wb3J0IHsgTGlzdGVuZXJGdW5jdGlvbiB9IGZyb20gJ29sL2V2ZW50cyc7XHJcbmltcG9ydCB7IE1hcEJyb3dzZXJQb2ludGVyRXZlbnQgYXMgT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50IH0gZnJvbSAnb2wvTWFwQnJvd3NlckV2ZW50JztcclxuaW1wb3J0IHsgdW5CeUtleSB9IGZyb20gJ29sL09ic2VydmFibGUnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBjb21iaW5lTGF0ZXN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCwgZGVib3VuY2VUaW1lLCBza2lwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgRW50aXR5S2V5LCBFbnRpdHlSZWNvcmQsIEVudGl0eVN0b3JlU3RyYXRlZ3kgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgVmVjdG9yTGF5ZXIgfSBmcm9tICcuLi8uLi8uLi9sYXllcic7XHJcbmltcG9ydCB7IElnb01hcCwgY3RybEtleURvd24gfSBmcm9tICcuLi8uLi8uLi9tYXAnO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZSwgRmVhdHVyZVN0b3JlU2VsZWN0aW9uU3RyYXRlZ3lPcHRpb25zIH0gZnJvbSAnLi4vZmVhdHVyZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgRmVhdHVyZVN0b3JlIH0gZnJvbSAnLi4vc3RvcmUnO1xyXG5pbXBvcnQgeyBGZWF0dXJlTW90aW9uIH0gZnJvbSAnLi4vZmVhdHVyZS5lbnVtcyc7XHJcblxyXG5jbGFzcyBPbERyYWdTZWxlY3RJbnRlcmFjdGlvbiBleHRlbmRzIE9sRHJhZ0JveEludGVyYWN0aW9uIHtcclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGlzIHN0cmF0ZWd5IHN5bmNocm9uaXplcyBhIHN0b3JlIGFuZCBhIGxheWVyIHNlbGVjdGVkIGVudGl0aWVzLlxyXG4gKiBUaGUgc3RvcmUgPC0+IGxheWVyIGJpbmRpbmcgaXMgYSB0d28td2F5IGJpbmRpbmcuXHJcbiAqXHJcbiAqIEluIG1hbnkgY2FzZXMsIGEgc2luZ2xlIHN0cmF0ZWd5IGJvdW5kIHRvIG11bHRpcGxlIHN0b3Jlc1xyXG4gKiB3aWxsIHlpZWxkIGJldHRlciByZXN1bHRzIHRoYXQgbXVsdGlwbGUgc3RyYXRlZ2llcyB3aXRoIGVhY2ggdGhlaXJcclxuICogb3duIHN0b3JlLiBJbiB0aGUgbGF0dGVyIHNjZW5hcmlvLCBhIGNsaWNrIG9uIG92ZXJsYXBwaW5nIGZlYXR1cmVzXHJcbiAqIHdvdWxkIHRyaWdnZXIgdGhlIHN0cmF0ZWd5IG9mIGVhY2ggbGF5ZXIgYW5kIHRoZXkgd291bGQgY2FuY2VsXHJcbiAqIGVhY2ggb3RoZXIgYXMgd2VsbCBhcyBtb3ZlIHRoZSBtYXAgdmlldyBhcm91bmQgbmVlZGxlc3NseS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneSBleHRlbmRzIEVudGl0eVN0b3JlU3RyYXRlZ3kge1xyXG5cclxuICAvKipcclxuICAgKiBMaXN0ZW5lciB0byB0aGUgbWFwIGNsaWNrIGV2ZW50IHRoYXQgYWxsb3dzIHNlbGVjdGluZyBhIGZlYXR1cmVcclxuICAgKiBieSBjbGlja2luZyBvbiB0aGUgbWFwXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBtYXBDbGlja0xpc3RlbmVyOiBMaXN0ZW5lckZ1bmN0aW9uO1xyXG5cclxuICBwcml2YXRlIG9sRHJhZ1NlbGVjdEludGVyYWN0aW9uOiBPbERyYWdTZWxlY3RJbnRlcmFjdGlvbjtcclxuXHJcbiAgcHJpdmF0ZSBvbERyYWdTZWxlY3RJbnRlcmFjdGlvbkVuZEtleTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gYWxsIHN0b3JlcyBzZWxlY3RlZCBlbnRpdGllc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RvcmVzJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG1hcCB0aGUgbGF5ZXJzIGJlbG9uZyB0b1xyXG4gICAqL1xyXG4gIGdldCBtYXAoKTogSWdvTWFwIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5tYXA7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogQSBmZWF0dXJlIHN0b3JlIHRoYXQnbGwgY29udGFpbiB0aGUgc2VsZWN0ZWQgZmVhdHVyZXMuIEl0IGhhcyBpdCdzIG93blxyXG4gICAqIGxheWVyLCBzaGFyZWQgYnkgYWxsIHRoZSBzdG9yZXMgdGhpcyBzdGFyZXRneSBpcyBib3VuZCB0by5cclxuICAgKi9cclxuICBnZXQgb3ZlcmxheVN0b3JlKCk6IEZlYXR1cmVTdG9yZSB7IHJldHVybiB0aGlzLl9vdmVybGF5U3RvcmU7IH1cclxuICBwcml2YXRlIF9vdmVybGF5U3RvcmU6IEZlYXR1cmVTdG9yZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIG9wdGlvbnM6IEZlYXR1cmVTdG9yZVNlbGVjdGlvblN0cmF0ZWd5T3B0aW9ucykge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICB0aGlzLl9vdmVybGF5U3RvcmUgPSB0aGlzLmNyZWF0ZU92ZXJsYXlTdG9yZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQmluZCB0aGlzIHN0cmF0ZWd5IHRvIGEgc3RvcmUgYW5kIGZvcmNlIHRoaXMgc3RyYXRlZ3knc1xyXG4gICAqIHJlYWN0aXZhdGlvbiB0byBwcm9wZXJseSBzZXR1cCB3YXRjaGVycy5cclxuICAgKiBAcGFyYW0gc3RvcmUgRmVhdHVyZSBzdG9yZVxyXG4gICAqL1xyXG4gIGJpbmRTdG9yZShzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBzdXBlci5iaW5kU3RvcmUoc3RvcmUpO1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlID09PSB0cnVlKSB7XHJcbiAgICAgIC8vIEZvcmNlIHJlYWN0aXZhdGlvblxyXG4gICAgICB0aGlzLmFjdGl2YXRlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbmJpbmQgdGhpcyBzdHJhdGVneSBmcm9tIGEgc3RvcmUgYW5kIGZvcmNlIHRoaXMgc3RyYXRlZ3knc1xyXG4gICAqIHJlYWN0aXZhdGlvbiB0byBwcm9wZXJseSBzZXR1cCB3YXRjaGVycy5cclxuICAgKiBAcGFyYW0gc3RvcmUgRmVhdHVyZSBzdG9yZVxyXG4gICAqL1xyXG4gIHVuYmluZFN0b3JlKHN0b3JlOiBGZWF0dXJlU3RvcmUpIHtcclxuICAgIHN1cGVyLnVuYmluZFN0b3JlKHN0b3JlKTtcclxuICAgIGlmICh0aGlzLmFjdGl2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAvLyBGb3JjZSByZWFjdGl2YXRpb25cclxuICAgICAgdGhpcy5hY3RpdmF0ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5zZWxlY3QgYWxsIGVudGl0aWVzLCBmcm9tIGFsbCBzdG9yZXNcclxuICAgKi9cclxuICB1bnNlbGVjdEFsbCgpIHtcclxuICAgIHRoaXMuc3RvcmVzLmZvckVhY2goKHN0b3JlOiBGZWF0dXJlU3RvcmUpID0+IHtcclxuICAgICAgc3RvcmUuc3RhdGUudXBkYXRlQWxsKHtzZWxlY3RlZDogZmFsc2V9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2xlYXIoKSB7XHJcbiAgICB0aGlzLm92ZXJsYXlTdG9yZS5zb3VyY2Uub2wuY2xlYXIoKTtcclxuICAgIHRoaXMub3ZlcmxheVN0b3JlLmNsZWFyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgdGhlIG92ZXJsYXkgbGF5ZXIsIHNldHVwIHRoZSBtYXAgY2xpY2sgbHNpdGVuZXIgYW5kXHJcbiAgICogc3RhcnQgd2F0Y2hpbmcgZm9yIHN0b3JlcyBzZWxlY3Rpb25cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgZG9BY3RpdmF0ZSgpIHtcclxuICAgIHRoaXMuYWRkT3ZlcmxheUxheWVyKCk7XHJcbiAgICB0aGlzLmxpc3RlblRvTWFwQ2xpY2soKTtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuZHJhZ0JveCA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmFkZERyYWdCb3hJbnRlcmFjdGlvbigpO1xyXG4gICAgfVxyXG4gICAgdGhpcy53YXRjaEFsbCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIHRoZSBvdmVybGF5IGxheWVyLCByZW1vdmUgdGhlIG1hcCBjbGljayBsc2l0ZW5lciBhbmRcclxuICAgKiBzdG9wIHdhdGNoaW5nIGZvciBzdG9yZXMgc2VsZWN0aW9uXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGRvRGVhY3RpdmF0ZSgpIHtcclxuICAgIHRoaXMudW5saXN0ZW5Ub01hcENsaWNrKCk7XHJcbiAgICB0aGlzLnJlbW92ZURyYWdCb3hJbnRlcmFjdGlvbigpO1xyXG4gICAgdGhpcy51bndhdGNoQWxsKCk7XHJcbiAgICB0aGlzLnJlbW92ZU92ZXJsYXlMYXllcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgc2luZ2xlIG9ic2VydmFibGUgb2YgYWxsIHRoZSBzdG9yZXMuIFdpdGggYSBzaW5nbGUgb2JzZXJ2YWJsZSxcclxuICAgKiBmZWF0dXJlcyBjYW4gYmUgYWRkZWQgYWxsIGF0IG9uY2UgdG8gdGhlIG92ZXJsYXkgbGF5ZXIgYW5kIGEgc2luZ2xlXHJcbiAgICogbW90aW9uIGNhbiBiZSBwZXJmb3JtZWQuIE11bHRpcGxlIG9ic2VydmFibGUgd291bGQgaGF2ZVxyXG4gICAqIGEgY2FuY2VsbGluZyBlZmZlY3Qgb24gZWFjaCBvdGhlci5cclxuICAgKi9cclxuICBwcml2YXRlIHdhdGNoQWxsKCkge1xyXG4gICAgdGhpcy51bndhdGNoQWxsKCk7XHJcblxyXG4gICAgY29uc3Qgc3RvcmVzJCA9IHRoaXMuc3RvcmVzLm1hcCgoc3RvcmU6IEZlYXR1cmVTdG9yZSkgPT4ge1xyXG4gICAgICByZXR1cm4gc3RvcmUuc3RhdGVWaWV3Lm1hbnlCeSQoKHJlY29yZDogRW50aXR5UmVjb3JkPEZlYXR1cmU+KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlY29yZC5zdGF0ZS5zZWxlY3RlZCA9PT0gdHJ1ZTtcclxuICAgICAgfSkucGlwZShcclxuICAgICAgICBtYXAoKHJlY29yZHM6IEVudGl0eVJlY29yZDxGZWF0dXJlPltdKSA9PiByZWNvcmRzLm1hcChyZWNvcmQgPT4gcmVjb3JkLmVudGl0eSkpXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc3RvcmVzJCQgPSBjb21iaW5lTGF0ZXN0KC4uLnN0b3JlcyQpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIGRlYm91bmNlVGltZSg1KSxcclxuICAgICAgICBza2lwKDEpLCAvLyBTa2lwIGludGlhbCBzZWxlY3Rpb25cclxuICAgICAgICBtYXAoKGZlYXR1cmVzOiBBcnJheTxGZWF0dXJlW10+KSA9PiBmZWF0dXJlcy5yZWR1Y2UoKGEsIGIpID0+IGEuY29uY2F0KGIpKSlcclxuICAgICAgKS5zdWJzY3JpYmUoKGZlYXR1cmVzOiBGZWF0dXJlW10pID0+IHRoaXMub25TZWxlY3RGcm9tU3RvcmUoZmVhdHVyZXMpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3Agd2F0Y2hpbmcgZm9yIHNlbGVjdGlvbiBpbiBhbGwgc3RvcmVzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgdW53YXRjaEFsbCgpIHtcclxuICAgIGlmICh0aGlzLnN0b3JlcyQkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5zdG9yZXMkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGEgJ3NpbmdsZWNsaWNrJyBsaXN0ZW5lciB0byB0aGUgbWFwIHRoYXQnbGwgYWxsb3cgc2VsZWN0aW5nXHJcbiAgICogZmVhdHVyZXMgYnkgY2xpY2tpbmcgb24gdGhlIG1hcC4gVGhlIHNlbGVjdGlvbiB3aWxsIGJlIHBlcmZvcm1lZFxyXG4gICAqIG9ubHkgb24gdGhlIGxheWVycyBib3VuZCB0byB0aGlzIHN0cmF0ZWd5LlxyXG4gICAqL1xyXG4gIHByaXZhdGUgbGlzdGVuVG9NYXBDbGljaygpIHtcclxuICAgIHRoaXMubWFwQ2xpY2tMaXN0ZW5lciA9IHRoaXMubWFwLm9sLm9uKCdzaW5nbGVjbGljaycsIChldmVudDogT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMub25NYXBDbGljayhldmVudCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSB0aGUgbWFwIGNsaWNrIGxpc3RlbmVyXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1bmxpc3RlblRvTWFwQ2xpY2soKSB7XHJcbiAgICBpZiAodGhpcy5tYXBDbGlja0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5tYXAub2wudW4oXHJcbiAgICAgICAgdGhpcy5tYXBDbGlja0xpc3RlbmVyLnR5cGUsXHJcbiAgICAgICAgdGhpcy5tYXBDbGlja0xpc3RlbmVyLmxpc3RlbmVyXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPbiBtYXAgY2xpY2ssIHNlbGVjdCBmZWF0dXJlIGF0IHBpeGVsXHJcbiAgICogQHBhcmFtIGV2ZW50IE9MIE1hcEJyb3dzZXJQb2ludGVyRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uTWFwQ2xpY2soZXZlbnQ6IE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCkge1xyXG4gICAgY29uc3QgZXhjbHVzaXZlID0gIWN0cmxLZXlEb3duKGV2ZW50KTtcclxuICAgIGNvbnN0IHJldmVyc2UgPSAhZXhjbHVzaXZlO1xyXG4gICAgY29uc3Qgb2xGZWF0dXJlcyA9IGV2ZW50Lm1hcC5nZXRGZWF0dXJlc0F0UGl4ZWwoZXZlbnQucGl4ZWwsIHtcclxuICAgICAgaGl0VG9sZXJhbmNlOiB0aGlzLm9wdGlvbnMuaGl0VG9sZXJhbmNlIHx8IDAsXHJcbiAgICAgIGxheWVyRmlsdGVyOiAob2xMYXllcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHN0b3JlT2xMYXllciA9IHRoaXMuc3RvcmVzLmZpbmQoKHN0b3JlOiBGZWF0dXJlU3RvcmUpID0+IHtcclxuICAgICAgICAgIHJldHVybiBzdG9yZS5sYXllci5vbCA9PT0gb2xMYXllcjtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc3RvcmVPbExheWVyICE9PSB1bmRlZmluZWQ7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5vblNlbGVjdEZyb21NYXAob2xGZWF0dXJlcywgZXhjbHVzaXZlLCByZXZlcnNlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhIGRyYWcgYm94IGludGVyYWN0aW9uIGFuZCwgb24gZHJhZyBib3ggZW5kLCBzZWxlY3QgZmVhdHVyZXNcclxuICAgKi9cclxuICBwcml2YXRlIGFkZERyYWdCb3hJbnRlcmFjdGlvbigpIHtcclxuICAgIGxldCBvbERyYWdTZWxlY3RJbnRlcmFjdGlvbjtcclxuICAgIGNvbnN0IG9sSW50ZXJhY3Rpb25zID0gdGhpcy5tYXAub2wuZ2V0SW50ZXJhY3Rpb25zKCkuZ2V0QXJyYXkoKTtcclxuXHJcbiAgICAvLyBUaGVyZSBjYW4gb25seSBiZSBvbmUgZHJhZ2JveCBpbnRlcmFjdGlvbiwgc28gZmluZCB0aGUgY3VycmVudCBvbmUsIGlmIGFueVxyXG4gICAgLy8gRG9uJ3Qga2VlcCBhIHJlZmVyZW5jZSB0byB0aGUgY3VycmVudCBkcmFnYm94IGJlY2F1c2Ugd2UgZG9uJ3Qgd2FudFxyXG4gICAgLy8gdG8gcmVtb3ZlIGl0IHdoZW4gdGhpcyBzdGFydGVneSBpcyBkZWFjdGl2YXRlZFxyXG4gICAgZm9yIChjb25zdCBvbEludGVyYWN0aW9uIG9mIG9sSW50ZXJhY3Rpb25zKSB7XHJcbiAgICAgIGlmIChvbEludGVyYWN0aW9uIGluc3RhbmNlb2YgT2xEcmFnU2VsZWN0SW50ZXJhY3Rpb24pIHtcclxuICAgICAgICBvbERyYWdTZWxlY3RJbnRlcmFjdGlvbiA9IG9sSW50ZXJhY3Rpb247XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIElmIG5vIGRyYWcgYm94IGludGVyYWN0aW9uIGlzIGZvdW5kLCBjcmVhdGUgYSBuZXcgb25lIGFuZCBhZGQgaXQgdG8gdGhlIG1hcFxyXG4gICAgaWYgKG9sRHJhZ1NlbGVjdEludGVyYWN0aW9uID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgb2xEcmFnU2VsZWN0SW50ZXJhY3Rpb24gPSBuZXcgT2xEcmFnU2VsZWN0SW50ZXJhY3Rpb24oe1xyXG4gICAgICAgIGNvbmRpdGlvbjogY3RybEtleURvd25cclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMubWFwLm9sLmFkZEludGVyYWN0aW9uKG9sRHJhZ1NlbGVjdEludGVyYWN0aW9uKTtcclxuICAgICAgdGhpcy5vbERyYWdTZWxlY3RJbnRlcmFjdGlvbiA9IG9sRHJhZ1NlbGVjdEludGVyYWN0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub2xEcmFnU2VsZWN0SW50ZXJhY3Rpb25FbmRLZXkgPSBvbERyYWdTZWxlY3RJbnRlcmFjdGlvbi5vbihcclxuICAgICAgJ2JveGVuZCcsXHJcbiAgICAgIChldmVudDogT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50KSA9PiB0aGlzLm9uRHJhZ0JveEVuZChldmVudClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgZHJhZyBib3ggaW50ZXJhY3Rpb25cclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZURyYWdCb3hJbnRlcmFjdGlvbigpIHtcclxuICAgIGlmICh0aGlzLm9sRHJhZ1NlbGVjdEludGVyYWN0aW9uRW5kS2V5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdW5CeUtleSh0aGlzLm9sRHJhZ1NlbGVjdEludGVyYWN0aW9uRW5kS2V5KTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLm9sRHJhZ1NlbGVjdEludGVyYWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5tYXAub2wucmVtb3ZlSW50ZXJhY3Rpb24odGhpcy5vbERyYWdTZWxlY3RJbnRlcmFjdGlvbik7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9sRHJhZ1NlbGVjdEludGVyYWN0aW9uID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gZHJhZ2JveCBlbmQsIHNlbGVjdCBmZWF0dXJlcyBpbiBkcmFnIGJveFxyXG4gICAqIEBwYXJhbSBldmVudCBPTCBNYXBCcm93c2VyUG9pbnRlckV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkRyYWdCb3hFbmQoZXZlbnQ6IE9sRHJhZ0JveEV2ZW50KSB7XHJcbiAgICBjb25zdCBleGNsdXNpdmUgPSAhY3RybEtleURvd24oZXZlbnQubWFwQnJvd3NlckV2ZW50KTtcclxuICAgIGNvbnN0IGV4dGVudCA9IGV2ZW50LnRhcmdldC5nZXRHZW9tZXRyeSgpLmdldEV4dGVudCgpO1xyXG4gICAgY29uc3Qgb2xGZWF0dXJlcyA9IHRoaXMuc3RvcmVzLnJlZHVjZSgoYWNjOiBPbEZlYXR1cmVbXSwgc3RvcmU6IEZlYXR1cmVTdG9yZSkgPT4ge1xyXG4gICAgICBjb25zdCBvbFNvdXJjZSA9IHN0b3JlLmxheWVyLm9sLmdldFNvdXJjZSgpO1xyXG4gICAgICBhY2MucHVzaCguLi5vbFNvdXJjZS5nZXRGZWF0dXJlc0luRXh0ZW50KGV4dGVudCkpO1xyXG4gICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSwgW10pO1xyXG4gICAgdGhpcy5vblNlbGVjdEZyb21NYXAob2xGZWF0dXJlcywgZXhjbHVzaXZlLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGZlYXR1cmVzIGFyZSBzZWxlY3RlZCBmcm9tIHRoZSBzdG9yZSwgYWRkXHJcbiAgICogdGhlbSB0byB0aGlzIHN0YXJ0ZWd5J3Mgb3ZlcmxheSBsYXllciAoc2VsZWN0IG9uIG1hcClcclxuICAgKiBAcGFyYW0gZmVhdHVyZXMgU3RvcmUgZmVhdHVyZXNcclxuICAgKi9cclxuICBwcml2YXRlIG9uU2VsZWN0RnJvbVN0b3JlKGZlYXR1cmVzOiBGZWF0dXJlW10pIHtcclxuICAgIGNvbnN0IG1vdGlvbiA9IHRoaXMub3B0aW9ucyA/IHRoaXMub3B0aW9ucy5tb3Rpb24gOiB1bmRlZmluZWQ7XHJcbiAgICBjb25zdCBvbE92ZXJsYXlGZWF0dXJlcyA9IHRoaXMub3ZlcmxheVN0b3JlLmxheWVyLm9sLmdldFNvdXJjZSgpLmdldEZlYXR1cmVzKCk7XHJcbiAgICBjb25zdCBvdmVybGF5RmVhdHVyZXNLZXlzID0gb2xPdmVybGF5RmVhdHVyZXMubWFwKChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4gb2xGZWF0dXJlLmdldElkKCkpO1xyXG4gICAgY29uc3QgZmVhdHVyZXNLZXlzID0gZmVhdHVyZXMubWFwKHRoaXMub3ZlcmxheVN0b3JlLmdldEtleSk7XHJcblxyXG4gICAgbGV0IGRvTW90aW9uO1xyXG4gICAgaWYgKGZlYXR1cmVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBkb01vdGlvbiA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZG9Nb3Rpb24gPSBvdmVybGF5RmVhdHVyZXNLZXlzLmxlbmd0aCAhPT0gZmVhdHVyZXNLZXlzLmxlbmd0aCB8fFxyXG4gICAgICAgICFvdmVybGF5RmVhdHVyZXNLZXlzLmV2ZXJ5KChrZXk6IEVudGl0eUtleSkgPT4gZmVhdHVyZXNLZXlzLmluZGV4T2Yoa2V5KSA+PSAwKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm92ZXJsYXlTdG9yZS5zZXRMYXllckZlYXR1cmVzKFxyXG4gICAgICBmZWF0dXJlcyxcclxuICAgICAgZG9Nb3Rpb24gPyBtb3Rpb24gOiBGZWF0dXJlTW90aW9uLk5vbmUsXHJcbiAgICAgIHRoaXMub3B0aW9ucy52aWV3U2NhbGUsXHJcbiAgICAgIHRoaXMub3B0aW9ucy5hcmVhUmF0aW8sXHJcbiAgICAgIHRoaXMub3B0aW9ucy5nZXRGZWF0dXJlSWRcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGZlYXR1cmVzIGFyZSBzZWxlY3RlZCBmcm9tIHRoZSBtYXAsIGFsc28gc2VsZWN0IHRoZW1cclxuICAgKiBpbiB0aGVpciBzdG9yZS5cclxuICAgKiBAcGFyYW0gb2xGZWF0dXJlcyBPTCBmZWF0dXJlIG9iamVjdHNcclxuICAgKi9cclxuICBwcml2YXRlIG9uU2VsZWN0RnJvbU1hcChvbEZlYXR1cmVzOiBPbEZlYXR1cmVbXSwgZXhjbHVzaXZlOiBib29sZWFuLCByZXZlcnNlOiBib29sZWFuKSB7XHJcbiAgICBjb25zdCBncm91cGVkRmVhdHVyZXMgPSB0aGlzLmdyb3VwRmVhdHVyZXNCeVN0b3JlKG9sRmVhdHVyZXMpO1xyXG5cclxuICAgIHRoaXMuc3RvcmVzLmZvckVhY2goKHN0b3JlOiBGZWF0dXJlU3RvcmUpID0+IHtcclxuICAgICAgY29uc3QgZmVhdHVyZXMgPSBncm91cGVkRmVhdHVyZXMuZ2V0KHN0b3JlKTtcclxuICAgICAgaWYgKGZlYXR1cmVzID09PSB1bmRlZmluZWQgJiYgZXhjbHVzaXZlID09PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy51bnNlbGVjdEFsbEZlYXR1cmVzRnJvbVN0b3JlKHN0b3JlKTtcclxuICAgICAgfSBlbHNlIGlmIChmZWF0dXJlcyA9PT0gdW5kZWZpbmVkICYmIGV4Y2x1c2l2ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAvLyBEbyBub3RoaW5nXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RGZWF0dXJlc0Zyb21TdG9yZShzdG9yZSwgZmVhdHVyZXMsIGV4Y2x1c2l2ZSwgcmV2ZXJzZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VsZWN0IGZlYXR1cmVzIGluIHN0b3JlXHJcbiAgICogQHBhcmFtIHN0b3JlOiBGZWF0dXJlIHN0b3JlXHJcbiAgICogQHBhcmFtIGZlYXR1cmVzIEZlYXR1cmVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZWxlY3RGZWF0dXJlc0Zyb21TdG9yZShzdG9yZTogRmVhdHVyZVN0b3JlLCBmZWF0dXJlczogRmVhdHVyZVtdLCBleGNsdXNpdmU6IGJvb2xlYW4sIHJldmVyc2U6IGJvb2xlYW4pIHtcclxuICAgIGlmIChyZXZlcnNlID09PSB0cnVlKSB7XHJcbiAgICAgIHN0b3JlLnN0YXRlLnJldmVyc2VNYW55KGZlYXR1cmVzLCBbJ3NlbGVjdGVkJ10pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3RvcmUuc3RhdGUudXBkYXRlTWFueShmZWF0dXJlcywge3NlbGVjdGVkOiB0cnVlfSwgZXhjbHVzaXZlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuc2VsZWN0IGFsbCBmZWF0dXJlcyBmcm9tIHN0b3JlXHJcbiAgICogQHBhcmFtIHN0b3JlOiBGZWF0dXJlIHN0b3JlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1bnNlbGVjdEFsbEZlYXR1cmVzRnJvbVN0b3JlKHN0b3JlOiBGZWF0dXJlU3RvcmUpIHtcclxuICAgIHN0b3JlLnN0YXRlLnVwZGF0ZUFsbCh7c2VsZWN0ZWQ6IGZhbHNlfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIGEgc3RvcmUgLT4gZmVhdHVyZXMgbWFwcGluZyBmcm9tIGEgbGlzdFxyXG4gICAqIG9mIE9MIHNlbGVjdGVkIGZlYXR1cmVzLiBPTCBmZWF0dXJlcyBrZWVwIGEgcmVmZXJlbmNlIHRvIHRoZSBzdG9yZVxyXG4gICAqIHRoZXkgYXJlIGZyb20uXHJcbiAgICogQHBhcmFtIG9sRmVhdHVyZXM6IE9MIGZlYXR1cmUgb2JqZWN0c1xyXG4gICAqIEByZXR1cm5zIFN0b3JlIC0+IGZlYXR1cmVzIG1hcHBpbmdcclxuICAgKi9cclxuICBwcml2YXRlIGdyb3VwRmVhdHVyZXNCeVN0b3JlKG9sRmVhdHVyZXM6IE9sRmVhdHVyZVtdKTogTWFwPEZlYXR1cmVTdG9yZSwgRmVhdHVyZVtdPiB7XHJcbiAgICBjb25zdCBncm91cGVkRmVhdHVyZXMgPSBuZXcgTWFwPEZlYXR1cmVTdG9yZSwgRmVhdHVyZVtdPigpO1xyXG4gICAgaWYgKG9sRmVhdHVyZXMgPT09IG51bGwgfHwgb2xGZWF0dXJlcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiBncm91cGVkRmVhdHVyZXM7XHJcbiAgICB9XHJcblxyXG4gICAgb2xGZWF0dXJlcy5mb3JFYWNoKChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4ge1xyXG4gICAgICBjb25zdCBzdG9yZSA9IG9sRmVhdHVyZS5nZXQoJ19mZWF0dXJlU3RvcmUnKTtcclxuICAgICAgaWYgKHN0b3JlID09PSB1bmRlZmluZWQpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICBsZXQgZmVhdHVyZXMgPSBncm91cGVkRmVhdHVyZXMuZ2V0KHN0b3JlKTtcclxuICAgICAgaWYgKGZlYXR1cmVzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBmZWF0dXJlcyA9IFtdO1xyXG4gICAgICAgIGdyb3VwZWRGZWF0dXJlcy5zZXQoc3RvcmUsIGZlYXR1cmVzKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgZmVhdHVyZSA9IHN0b3JlLmdldChvbEZlYXR1cmUuZ2V0SWQoKSk7XHJcbiAgICAgIGlmIChmZWF0dXJlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBmZWF0dXJlcy5wdXNoKGZlYXR1cmUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZ3JvdXBlZEZlYXR1cmVzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGFuIG92ZXJsYXkgc3RvcmUgdGhhdCdsbCBjb250YWluIHRoZSBzZWxlY3RlZCBmZWF0dXJlcy5cclxuICAgKiBAcmV0dXJucyBPdmVybGF5IHN0b3JlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjcmVhdGVPdmVybGF5U3RvcmUoKTogRmVhdHVyZVN0b3JlIHtcclxuICAgIGNvbnN0IG92ZXJsYXlMYXllciA9IHRoaXMub3B0aW9ucy5sYXllclxyXG4gICAgICA/IHRoaXMub3B0aW9ucy5sYXllclxyXG4gICAgICA6IHRoaXMuY3JlYXRlT3ZlcmxheUxheWVyKCk7XHJcbiAgICByZXR1cm4gbmV3IEZlYXR1cmVTdG9yZShbXSwge21hcDogdGhpcy5tYXB9KS5iaW5kTGF5ZXIob3ZlcmxheUxheWVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhbiBvdmVybGF5IHN0b3JlIHRoYXQnbGwgY29udGFpbiB0aGUgc2VsZWN0ZWQgZmVhdHVyZXMuXHJcbiAgICogQHJldHVybnMgT3ZlcmxheSBsYXllclxyXG4gICAqL1xyXG4gIHByaXZhdGUgY3JlYXRlT3ZlcmxheUxheWVyKCk6IFZlY3RvckxheWVyIHtcclxuICAgIHJldHVybiBuZXcgVmVjdG9yTGF5ZXIoe1xyXG4gICAgICB6SW5kZXg6IDMwMCxcclxuICAgICAgc291cmNlOiBuZXcgRmVhdHVyZURhdGFTb3VyY2UoKSxcclxuICAgICAgc3R5bGU6IHVuZGVmaW5lZCxcclxuICAgICAgc2hvd0luTGF5ZXJMaXN0OiBmYWxzZSxcclxuICAgICAgZXhwb3J0YWJsZTogZmFsc2UsXHJcbiAgICAgIGJyb3dzYWJsZTogZmFsc2VcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIHRoZSBvdmVybGF5IHN0b3JlJ3MgbGF5ZXIgdG8gdGhlIG1hcCB0byBkaXNwbGF5IHRoZSBzZWxlY3RlZFxyXG4gICAqIGZlYXR1cmVzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkT3ZlcmxheUxheWVyKCkge1xyXG4gICAgaWYgKHRoaXMub3ZlcmxheVN0b3JlLmxheWVyLm1hcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMubWFwLmFkZExheWVyKHRoaXMub3ZlcmxheVN0b3JlLmxheWVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSB0aGUgb3ZlcmxheSBsYXllciBmcm9tIHRoZSBtYXBcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZU92ZXJsYXlMYXllcigpIHtcclxuICAgIHRoaXMub3ZlcmxheVN0b3JlLnNvdXJjZS5vbC5jbGVhcigpO1xyXG4gICAgdGhpcy5tYXAucmVtb3ZlTGF5ZXIodGhpcy5vdmVybGF5U3RvcmUubGF5ZXIpO1xyXG4gIH1cclxufVxyXG4iXX0=