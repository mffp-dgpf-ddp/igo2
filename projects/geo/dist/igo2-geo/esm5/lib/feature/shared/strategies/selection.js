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
        _this.setMotion(options.motion);
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
     * Define the motion to apply on select
     * @param motion Feature motion
     */
    /**
     * Define the motion to apply on select
     * @param {?} motion Feature motion
     * @return {?}
     */
    FeatureStoreSelectionStrategy.prototype.setMotion = /**
     * Define the motion to apply on select
     * @param {?} motion Feature motion
     * @return {?}
     */
    function (motion) {
        this.motion = motion;
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
     * Clear the overlay
     */
    /**
     * Clear the overlay
     * @return {?}
     */
    FeatureStoreSelectionStrategy.prototype.clear = /**
     * Clear the overlay
     * @return {?}
     */
    function () {
        this.overlayStore.source.ol.clear();
        this.overlayStore.clear();
    };
    /**
     * Deactivate the selection without removing the selection
     * overlay.
     */
    /**
     * Deactivate the selection without removing the selection
     * overlay.
     * @return {?}
     */
    FeatureStoreSelectionStrategy.prototype.deactivateSelection = /**
     * Deactivate the selection without removing the selection
     * overlay.
     * @return {?}
     */
    function () {
        this.unlistenToMapClick();
        this.removeDragBoxInteraction();
        this.unwatchAll();
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
        this.deactivateSelection();
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
        this.stores$$ = combineLatest(stores$)
            .pipe(debounceTime(5), skip(1), // Skip intial selection
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
        var motion = this.motion;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ZlYXR1cmUvc2hhcmVkL3N0cmF0ZWdpZXMvc2VsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxvQkFBb0IsTUFBTSx3QkFBd0IsQ0FBQztBQUkxRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXhDLE9BQU8sRUFBZ0IsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpELE9BQU8sRUFBMkIsbUJBQW1CLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFNUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBVSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN4QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFakQ7SUFBc0MsbURBQW9CO0lBQ3hELGlDQUFZLE9BQU87ZUFDakIsa0JBQU0sT0FBTyxDQUFDO0lBQ2hCLENBQUM7SUFDSCw4QkFBQztBQUFELENBQUMsQUFKRCxDQUFzQyxvQkFBb0IsR0FJekQ7Ozs7Ozs7Ozs7O0FBWUQ7Ozs7Ozs7Ozs7O0lBQW1ELHlEQUFtQjtJQStCcEUsdUNBQXNCLE9BQTZDO1FBQW5FLFlBQ0Usa0JBQU0sT0FBTyxDQUFDLFNBR2Y7UUFKcUIsYUFBTyxHQUFQLE9BQU8sQ0FBc0M7UUFFakUsS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0IsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFJ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O0lBRUQ7O09BRUc7Ozs7OztJQUNLLDBEQUFrQjs7Ozs7SUFBMUI7UUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBQ0gsb0NBQUM7QUFBRCxDQUFDLEFBaFpELENBQW1ELG1CQUFtQixHQWdackU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUExWUMseURBQTJDOzs7OztJQUUzQyxnRUFBeUQ7Ozs7O0lBRXpELHNFQUE4Qzs7Ozs7O0lBSzlDLGlEQUErQjs7Ozs7SUFFL0IsK0NBQThCOzs7OztJQVk5QixzREFBb0M7Ozs7O0lBRXhCLGdEQUF1RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBPbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCBPbERyYWdCb3hJbnRlcmFjdGlvbiBmcm9tICdvbC9pbnRlcmFjdGlvbi9EcmFnQm94JztcclxuaW1wb3J0IHsgRHJhZ0JveEV2ZW50IGFzIE9sRHJhZ0JveEV2ZW50IH0gZnJvbSAnb2wvaW50ZXJhY3Rpb24vRHJhZ0JveCc7XHJcbmltcG9ydCB7IExpc3RlbmVyRnVuY3Rpb24gfSBmcm9tICdvbC9ldmVudHMnO1xyXG5pbXBvcnQgeyBNYXBCcm93c2VyUG9pbnRlckV2ZW50IGFzIE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCB9IGZyb20gJ29sL01hcEJyb3dzZXJFdmVudCc7XHJcbmltcG9ydCB7IHVuQnlLZXkgfSBmcm9tICdvbC9PYnNlcnZhYmxlJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgY29tYmluZUxhdGVzdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAsIGRlYm91bmNlVGltZSwgc2tpcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IEVudGl0eUtleSwgRW50aXR5UmVjb3JkLCBFbnRpdHlTdG9yZVN0cmF0ZWd5IH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IEZlYXR1cmVEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IFZlY3RvckxheWVyIH0gZnJvbSAnLi4vLi4vLi4vbGF5ZXInO1xyXG5pbXBvcnQgeyBJZ29NYXAsIGN0cmxLZXlEb3duIH0gZnJvbSAnLi4vLi4vLi4vbWFwJztcclxuXHJcbmltcG9ydCB7IEZlYXR1cmUsIEZlYXR1cmVTdG9yZVNlbGVjdGlvblN0cmF0ZWd5T3B0aW9ucyB9IGZyb20gJy4uL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IEZlYXR1cmVTdG9yZSB9IGZyb20gJy4uL3N0b3JlJztcclxuaW1wb3J0IHsgRmVhdHVyZU1vdGlvbiB9IGZyb20gJy4uL2ZlYXR1cmUuZW51bXMnO1xyXG5cclxuY2xhc3MgT2xEcmFnU2VsZWN0SW50ZXJhY3Rpb24gZXh0ZW5kcyBPbERyYWdCb3hJbnRlcmFjdGlvbiB7XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogVGhpcyBzdHJhdGVneSBzeW5jaHJvbml6ZXMgYSBzdG9yZSBhbmQgYSBsYXllciBzZWxlY3RlZCBlbnRpdGllcy5cclxuICogVGhlIHN0b3JlIDwtPiBsYXllciBiaW5kaW5nIGlzIGEgdHdvLXdheSBiaW5kaW5nLlxyXG4gKlxyXG4gKiBJbiBtYW55IGNhc2VzLCBhIHNpbmdsZSBzdHJhdGVneSBib3VuZCB0byBtdWx0aXBsZSBzdG9yZXNcclxuICogd2lsbCB5aWVsZCBiZXR0ZXIgcmVzdWx0cyB0aGF0IG11bHRpcGxlIHN0cmF0ZWdpZXMgd2l0aCBlYWNoIHRoZWlyXHJcbiAqIG93biBzdG9yZS4gSW4gdGhlIGxhdHRlciBzY2VuYXJpbywgYSBjbGljayBvbiBvdmVybGFwcGluZyBmZWF0dXJlc1xyXG4gKiB3b3VsZCB0cmlnZ2VyIHRoZSBzdHJhdGVneSBvZiBlYWNoIGxheWVyIGFuZCB0aGV5IHdvdWxkIGNhbmNlbFxyXG4gKiBlYWNoIG90aGVyIGFzIHdlbGwgYXMgbW92ZSB0aGUgbWFwIHZpZXcgYXJvdW5kIG5lZWRsZXNzbHkuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRmVhdHVyZVN0b3JlU2VsZWN0aW9uU3RyYXRlZ3kgZXh0ZW5kcyBFbnRpdHlTdG9yZVN0cmF0ZWd5IHtcclxuXHJcbiAgLyoqXHJcbiAgICogTGlzdGVuZXIgdG8gdGhlIG1hcCBjbGljayBldmVudCB0aGF0IGFsbG93cyBzZWxlY3RpbmcgYSBmZWF0dXJlXHJcbiAgICogYnkgY2xpY2tpbmcgb24gdGhlIG1hcFxyXG4gICAqL1xyXG4gIHByaXZhdGUgbWFwQ2xpY2tMaXN0ZW5lcjogTGlzdGVuZXJGdW5jdGlvbjtcclxuXHJcbiAgcHJpdmF0ZSBvbERyYWdTZWxlY3RJbnRlcmFjdGlvbjogT2xEcmFnU2VsZWN0SW50ZXJhY3Rpb247XHJcblxyXG4gIHByaXZhdGUgb2xEcmFnU2VsZWN0SW50ZXJhY3Rpb25FbmRLZXk6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvIGFsbCBzdG9yZXMgc2VsZWN0ZWQgZW50aXRpZXNcclxuICAgKi9cclxuICBwcml2YXRlIHN0b3JlcyQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIHByaXZhdGUgbW90aW9uOiBGZWF0dXJlTW90aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbWFwIHRoZSBsYXllcnMgYmVsb25nIHRvXHJcbiAgICovXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAgeyByZXR1cm4gdGhpcy5vcHRpb25zLm1hcDsgfVxyXG5cclxuICAvKipcclxuICAgKiBBIGZlYXR1cmUgc3RvcmUgdGhhdCdsbCBjb250YWluIHRoZSBzZWxlY3RlZCBmZWF0dXJlcy4gSXQgaGFzIGl0J3Mgb3duXHJcbiAgICogbGF5ZXIsIHNoYXJlZCBieSBhbGwgdGhlIHN0b3JlcyB0aGlzIHN0YXJldGd5IGlzIGJvdW5kIHRvLlxyXG4gICAqL1xyXG4gIGdldCBvdmVybGF5U3RvcmUoKTogRmVhdHVyZVN0b3JlIHsgcmV0dXJuIHRoaXMuX292ZXJsYXlTdG9yZTsgfVxyXG4gIHByaXZhdGUgX292ZXJsYXlTdG9yZTogRmVhdHVyZVN0b3JlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgb3B0aW9uczogRmVhdHVyZVN0b3JlU2VsZWN0aW9uU3RyYXRlZ3lPcHRpb25zKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICAgIHRoaXMuc2V0TW90aW9uKG9wdGlvbnMubW90aW9uKTtcclxuICAgIHRoaXMuX292ZXJsYXlTdG9yZSA9IHRoaXMuY3JlYXRlT3ZlcmxheVN0b3JlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBCaW5kIHRoaXMgc3RyYXRlZ3kgdG8gYSBzdG9yZSBhbmQgZm9yY2UgdGhpcyBzdHJhdGVneSdzXHJcbiAgICogcmVhY3RpdmF0aW9uIHRvIHByb3Blcmx5IHNldHVwIHdhdGNoZXJzLlxyXG4gICAqIEBwYXJhbSBzdG9yZSBGZWF0dXJlIHN0b3JlXHJcbiAgICovXHJcbiAgYmluZFN0b3JlKHN0b3JlOiBGZWF0dXJlU3RvcmUpIHtcclxuICAgIHN1cGVyLmJpbmRTdG9yZShzdG9yZSk7XHJcbiAgICBpZiAodGhpcy5hY3RpdmUgPT09IHRydWUpIHtcclxuICAgICAgLy8gRm9yY2UgcmVhY3RpdmF0aW9uXHJcbiAgICAgIHRoaXMuYWN0aXZhdGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuYmluZCB0aGlzIHN0cmF0ZWd5IGZyb20gYSBzdG9yZSBhbmQgZm9yY2UgdGhpcyBzdHJhdGVneSdzXHJcbiAgICogcmVhY3RpdmF0aW9uIHRvIHByb3Blcmx5IHNldHVwIHdhdGNoZXJzLlxyXG4gICAqIEBwYXJhbSBzdG9yZSBGZWF0dXJlIHN0b3JlXHJcbiAgICovXHJcbiAgdW5iaW5kU3RvcmUoc3RvcmU6IEZlYXR1cmVTdG9yZSkge1xyXG4gICAgc3VwZXIudW5iaW5kU3RvcmUoc3RvcmUpO1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlID09PSB0cnVlKSB7XHJcbiAgICAgIC8vIEZvcmNlIHJlYWN0aXZhdGlvblxyXG4gICAgICB0aGlzLmFjdGl2YXRlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmUgdGhlIG1vdGlvbiB0byBhcHBseSBvbiBzZWxlY3RcclxuICAgKiBAcGFyYW0gbW90aW9uIEZlYXR1cmUgbW90aW9uXHJcbiAgICovXHJcbiAgc2V0TW90aW9uKG1vdGlvbjogRmVhdHVyZU1vdGlvbikge1xyXG4gICAgdGhpcy5tb3Rpb24gPSBtb3Rpb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbnNlbGVjdCBhbGwgZW50aXRpZXMsIGZyb20gYWxsIHN0b3Jlc1xyXG4gICAqL1xyXG4gIHVuc2VsZWN0QWxsKCkge1xyXG4gICAgdGhpcy5zdG9yZXMuZm9yRWFjaCgoc3RvcmU6IEZlYXR1cmVTdG9yZSkgPT4ge1xyXG4gICAgICBzdG9yZS5zdGF0ZS51cGRhdGVBbGwoe3NlbGVjdGVkOiBmYWxzZX0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgb3ZlcmxheVxyXG4gICAqL1xyXG4gIGNsZWFyKCkge1xyXG4gICAgdGhpcy5vdmVybGF5U3RvcmUuc291cmNlLm9sLmNsZWFyKCk7XHJcbiAgICB0aGlzLm92ZXJsYXlTdG9yZS5jbGVhcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVhY3RpdmF0ZSB0aGUgc2VsZWN0aW9uIHdpdGhvdXQgcmVtb3ZpbmcgdGhlIHNlbGVjdGlvblxyXG4gICAqIG92ZXJsYXkuXHJcbiAgICovXHJcbiAgZGVhY3RpdmF0ZVNlbGVjdGlvbigpIHtcclxuICAgIHRoaXMudW5saXN0ZW5Ub01hcENsaWNrKCk7XHJcbiAgICB0aGlzLnJlbW92ZURyYWdCb3hJbnRlcmFjdGlvbigpO1xyXG4gICAgdGhpcy51bndhdGNoQWxsKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgdGhlIG92ZXJsYXkgbGF5ZXIsIHNldHVwIHRoZSBtYXAgY2xpY2sgbHNpdGVuZXIgYW5kXHJcbiAgICogc3RhcnQgd2F0Y2hpbmcgZm9yIHN0b3JlcyBzZWxlY3Rpb25cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgZG9BY3RpdmF0ZSgpIHtcclxuICAgIHRoaXMuYWRkT3ZlcmxheUxheWVyKCk7XHJcbiAgICB0aGlzLmxpc3RlblRvTWFwQ2xpY2soKTtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuZHJhZ0JveCA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmFkZERyYWdCb3hJbnRlcmFjdGlvbigpO1xyXG4gICAgfVxyXG4gICAgdGhpcy53YXRjaEFsbCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIHRoZSBvdmVybGF5IGxheWVyLCByZW1vdmUgdGhlIG1hcCBjbGljayBsc2l0ZW5lciBhbmRcclxuICAgKiBzdG9wIHdhdGNoaW5nIGZvciBzdG9yZXMgc2VsZWN0aW9uXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGRvRGVhY3RpdmF0ZSgpIHtcclxuICAgIHRoaXMuZGVhY3RpdmF0ZVNlbGVjdGlvbigpO1xyXG4gICAgdGhpcy5yZW1vdmVPdmVybGF5TGF5ZXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIHNpbmdsZSBvYnNlcnZhYmxlIG9mIGFsbCB0aGUgc3RvcmVzLiBXaXRoIGEgc2luZ2xlIG9ic2VydmFibGUsXHJcbiAgICogZmVhdHVyZXMgY2FuIGJlIGFkZGVkIGFsbCBhdCBvbmNlIHRvIHRoZSBvdmVybGF5IGxheWVyIGFuZCBhIHNpbmdsZVxyXG4gICAqIG1vdGlvbiBjYW4gYmUgcGVyZm9ybWVkLiBNdWx0aXBsZSBvYnNlcnZhYmxlIHdvdWxkIGhhdmVcclxuICAgKiBhIGNhbmNlbGxpbmcgZWZmZWN0IG9uIGVhY2ggb3RoZXIuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB3YXRjaEFsbCgpIHtcclxuICAgIHRoaXMudW53YXRjaEFsbCgpO1xyXG5cclxuICAgIGNvbnN0IHN0b3JlcyQgPSB0aGlzLnN0b3Jlcy5tYXAoKHN0b3JlOiBGZWF0dXJlU3RvcmUpID0+IHtcclxuICAgICAgcmV0dXJuIHN0b3JlLnN0YXRlVmlldy5tYW55QnkkKChyZWNvcmQ6IEVudGl0eVJlY29yZDxGZWF0dXJlPikgPT4ge1xyXG4gICAgICAgIHJldHVybiByZWNvcmQuc3RhdGUuc2VsZWN0ZWQgPT09IHRydWU7XHJcbiAgICAgIH0pLnBpcGUoXHJcbiAgICAgICAgbWFwKChyZWNvcmRzOiBFbnRpdHlSZWNvcmQ8RmVhdHVyZT5bXSkgPT4gcmVjb3Jkcy5tYXAocmVjb3JkID0+IHJlY29yZC5lbnRpdHkpKVxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnN0b3JlcyQkID0gY29tYmluZUxhdGVzdChzdG9yZXMkKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBkZWJvdW5jZVRpbWUoNSksXHJcbiAgICAgICAgc2tpcCgxKSwgLy8gU2tpcCBpbnRpYWwgc2VsZWN0aW9uXHJcbiAgICAgICAgbWFwKChmZWF0dXJlczogQXJyYXk8RmVhdHVyZVtdPikgPT4gZmVhdHVyZXMucmVkdWNlKChhLCBiKSA9PiBhLmNvbmNhdChiKSkpXHJcbiAgICAgICkuc3Vic2NyaWJlKChmZWF0dXJlczogRmVhdHVyZVtdKSA9PiB0aGlzLm9uU2VsZWN0RnJvbVN0b3JlKGZlYXR1cmVzKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdG9wIHdhdGNoaW5nIGZvciBzZWxlY3Rpb24gaW4gYWxsIHN0b3Jlcy5cclxuICAgKi9cclxuICBwcml2YXRlIHVud2F0Y2hBbGwoKSB7XHJcbiAgICBpZiAodGhpcy5zdG9yZXMkJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuc3RvcmVzJCQudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhICdzaW5nbGVjbGljaycgbGlzdGVuZXIgdG8gdGhlIG1hcCB0aGF0J2xsIGFsbG93IHNlbGVjdGluZ1xyXG4gICAqIGZlYXR1cmVzIGJ5IGNsaWNraW5nIG9uIHRoZSBtYXAuIFRoZSBzZWxlY3Rpb24gd2lsbCBiZSBwZXJmb3JtZWRcclxuICAgKiBvbmx5IG9uIHRoZSBsYXllcnMgYm91bmQgdG8gdGhpcyBzdHJhdGVneS5cclxuICAgKi9cclxuICBwcml2YXRlIGxpc3RlblRvTWFwQ2xpY2soKSB7XHJcbiAgICB0aGlzLm1hcENsaWNrTGlzdGVuZXIgPSB0aGlzLm1hcC5vbC5vbignc2luZ2xlY2xpY2snLCAoZXZlbnQ6IE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCkgPT4ge1xyXG4gICAgICB0aGlzLm9uTWFwQ2xpY2soZXZlbnQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgdGhlIG1hcCBjbGljayBsaXN0ZW5lclxyXG4gICAqL1xyXG4gIHByaXZhdGUgdW5saXN0ZW5Ub01hcENsaWNrKCkge1xyXG4gICAgaWYgKHRoaXMubWFwQ2xpY2tMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMubWFwLm9sLnVuKFxyXG4gICAgICAgIHRoaXMubWFwQ2xpY2tMaXN0ZW5lci50eXBlLFxyXG4gICAgICAgIHRoaXMubWFwQ2xpY2tMaXN0ZW5lci5saXN0ZW5lclxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gbWFwIGNsaWNrLCBzZWxlY3QgZmVhdHVyZSBhdCBwaXhlbFxyXG4gICAqIEBwYXJhbSBldmVudCBPTCBNYXBCcm93c2VyUG9pbnRlckV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbk1hcENsaWNrKGV2ZW50OiBPbE1hcEJyb3dzZXJQb2ludGVyRXZlbnQpIHtcclxuICAgIGNvbnN0IGV4Y2x1c2l2ZSA9ICFjdHJsS2V5RG93bihldmVudCk7XHJcbiAgICBjb25zdCByZXZlcnNlID0gIWV4Y2x1c2l2ZTtcclxuICAgIGNvbnN0IG9sRmVhdHVyZXMgPSBldmVudC5tYXAuZ2V0RmVhdHVyZXNBdFBpeGVsKGV2ZW50LnBpeGVsLCB7XHJcbiAgICAgIGhpdFRvbGVyYW5jZTogdGhpcy5vcHRpb25zLmhpdFRvbGVyYW5jZSB8fCAwLFxyXG4gICAgICBsYXllckZpbHRlcjogKG9sTGF5ZXIpID0+IHtcclxuICAgICAgICBjb25zdCBzdG9yZU9sTGF5ZXIgPSB0aGlzLnN0b3Jlcy5maW5kKChzdG9yZTogRmVhdHVyZVN0b3JlKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gc3RvcmUubGF5ZXIub2wgPT09IG9sTGF5ZXI7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHN0b3JlT2xMYXllciAhPT0gdW5kZWZpbmVkO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMub25TZWxlY3RGcm9tTWFwKG9sRmVhdHVyZXMsIGV4Y2x1c2l2ZSwgcmV2ZXJzZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYSBkcmFnIGJveCBpbnRlcmFjdGlvbiBhbmQsIG9uIGRyYWcgYm94IGVuZCwgc2VsZWN0IGZlYXR1cmVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGREcmFnQm94SW50ZXJhY3Rpb24oKSB7XHJcbiAgICBsZXQgb2xEcmFnU2VsZWN0SW50ZXJhY3Rpb247XHJcbiAgICBjb25zdCBvbEludGVyYWN0aW9ucyA9IHRoaXMubWFwLm9sLmdldEludGVyYWN0aW9ucygpLmdldEFycmF5KCk7XHJcblxyXG4gICAgLy8gVGhlcmUgY2FuIG9ubHkgYmUgb25lIGRyYWdib3ggaW50ZXJhY3Rpb24sIHNvIGZpbmQgdGhlIGN1cnJlbnQgb25lLCBpZiBhbnlcclxuICAgIC8vIERvbid0IGtlZXAgYSByZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnQgZHJhZ2JveCBiZWNhdXNlIHdlIGRvbid0IHdhbnRcclxuICAgIC8vIHRvIHJlbW92ZSBpdCB3aGVuIHRoaXMgc3RhcnRlZ3kgaXMgZGVhY3RpdmF0ZWRcclxuICAgIGZvciAoY29uc3Qgb2xJbnRlcmFjdGlvbiBvZiBvbEludGVyYWN0aW9ucykge1xyXG4gICAgICBpZiAob2xJbnRlcmFjdGlvbiBpbnN0YW5jZW9mIE9sRHJhZ1NlbGVjdEludGVyYWN0aW9uKSB7XHJcbiAgICAgICAgb2xEcmFnU2VsZWN0SW50ZXJhY3Rpb24gPSBvbEludGVyYWN0aW9uO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBJZiBubyBkcmFnIGJveCBpbnRlcmFjdGlvbiBpcyBmb3VuZCwgY3JlYXRlIGEgbmV3IG9uZSBhbmQgYWRkIGl0IHRvIHRoZSBtYXBcclxuICAgIGlmIChvbERyYWdTZWxlY3RJbnRlcmFjdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIG9sRHJhZ1NlbGVjdEludGVyYWN0aW9uID0gbmV3IE9sRHJhZ1NlbGVjdEludGVyYWN0aW9uKHtcclxuICAgICAgICBjb25kaXRpb246IGN0cmxLZXlEb3duXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLm1hcC5vbC5hZGRJbnRlcmFjdGlvbihvbERyYWdTZWxlY3RJbnRlcmFjdGlvbik7XHJcbiAgICAgIHRoaXMub2xEcmFnU2VsZWN0SW50ZXJhY3Rpb24gPSBvbERyYWdTZWxlY3RJbnRlcmFjdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9sRHJhZ1NlbGVjdEludGVyYWN0aW9uRW5kS2V5ID0gb2xEcmFnU2VsZWN0SW50ZXJhY3Rpb24ub24oXHJcbiAgICAgICdib3hlbmQnLFxyXG4gICAgICAoZXZlbnQ6IE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCkgPT4gdGhpcy5vbkRyYWdCb3hFbmQoZXZlbnQpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIGRyYWcgYm94IGludGVyYWN0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZW1vdmVEcmFnQm94SW50ZXJhY3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5vbERyYWdTZWxlY3RJbnRlcmFjdGlvbkVuZEtleSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHVuQnlLZXkodGhpcy5vbERyYWdTZWxlY3RJbnRlcmFjdGlvbkVuZEtleSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5vbERyYWdTZWxlY3RJbnRlcmFjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMubWFwLm9sLnJlbW92ZUludGVyYWN0aW9uKHRoaXMub2xEcmFnU2VsZWN0SW50ZXJhY3Rpb24pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vbERyYWdTZWxlY3RJbnRlcmFjdGlvbiA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIGRyYWdib3ggZW5kLCBzZWxlY3QgZmVhdHVyZXMgaW4gZHJhZyBib3hcclxuICAgKiBAcGFyYW0gZXZlbnQgT0wgTWFwQnJvd3NlclBvaW50ZXJFdmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25EcmFnQm94RW5kKGV2ZW50OiBPbERyYWdCb3hFdmVudCkge1xyXG4gICAgY29uc3QgZXhjbHVzaXZlID0gIWN0cmxLZXlEb3duKGV2ZW50Lm1hcEJyb3dzZXJFdmVudCk7XHJcbiAgICBjb25zdCBleHRlbnQgPSBldmVudC50YXJnZXQuZ2V0R2VvbWV0cnkoKS5nZXRFeHRlbnQoKTtcclxuICAgIGNvbnN0IG9sRmVhdHVyZXMgPSB0aGlzLnN0b3Jlcy5yZWR1Y2UoKGFjYzogT2xGZWF0dXJlW10sIHN0b3JlOiBGZWF0dXJlU3RvcmUpID0+IHtcclxuICAgICAgY29uc3Qgb2xTb3VyY2UgPSBzdG9yZS5sYXllci5vbC5nZXRTb3VyY2UoKTtcclxuICAgICAgYWNjLnB1c2goLi4ub2xTb3VyY2UuZ2V0RmVhdHVyZXNJbkV4dGVudChleHRlbnQpKTtcclxuICAgICAgcmV0dXJuIGFjYztcclxuICAgIH0sIFtdKTtcclxuICAgIHRoaXMub25TZWxlY3RGcm9tTWFwKG9sRmVhdHVyZXMsIGV4Y2x1c2l2ZSwgZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBmZWF0dXJlcyBhcmUgc2VsZWN0ZWQgZnJvbSB0aGUgc3RvcmUsIGFkZFxyXG4gICAqIHRoZW0gdG8gdGhpcyBzdGFydGVneSdzIG92ZXJsYXkgbGF5ZXIgKHNlbGVjdCBvbiBtYXApXHJcbiAgICogQHBhcmFtIGZlYXR1cmVzIFN0b3JlIGZlYXR1cmVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvblNlbGVjdEZyb21TdG9yZShmZWF0dXJlczogRmVhdHVyZVtdKSB7XHJcbiAgICBjb25zdCBtb3Rpb24gPSB0aGlzLm1vdGlvbjtcclxuICAgIGNvbnN0IG9sT3ZlcmxheUZlYXR1cmVzID0gdGhpcy5vdmVybGF5U3RvcmUubGF5ZXIub2wuZ2V0U291cmNlKCkuZ2V0RmVhdHVyZXMoKTtcclxuICAgIGNvbnN0IG92ZXJsYXlGZWF0dXJlc0tleXMgPSBvbE92ZXJsYXlGZWF0dXJlcy5tYXAoKG9sRmVhdHVyZTogT2xGZWF0dXJlKSA9PiBvbEZlYXR1cmUuZ2V0SWQoKSk7XHJcbiAgICBjb25zdCBmZWF0dXJlc0tleXMgPSBmZWF0dXJlcy5tYXAodGhpcy5vdmVybGF5U3RvcmUuZ2V0S2V5KTtcclxuXHJcbiAgICBsZXQgZG9Nb3Rpb247XHJcbiAgICBpZiAoZmVhdHVyZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGRvTW90aW9uID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkb01vdGlvbiA9IG92ZXJsYXlGZWF0dXJlc0tleXMubGVuZ3RoICE9PSBmZWF0dXJlc0tleXMubGVuZ3RoIHx8XHJcbiAgICAgICAgIW92ZXJsYXlGZWF0dXJlc0tleXMuZXZlcnkoKGtleTogRW50aXR5S2V5KSA9PiBmZWF0dXJlc0tleXMuaW5kZXhPZihrZXkpID49IDApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub3ZlcmxheVN0b3JlLnNldExheWVyRmVhdHVyZXMoXHJcbiAgICAgIGZlYXR1cmVzLFxyXG4gICAgICBkb01vdGlvbiA/IG1vdGlvbiA6IEZlYXR1cmVNb3Rpb24uTm9uZSxcclxuICAgICAgdGhpcy5vcHRpb25zLnZpZXdTY2FsZSxcclxuICAgICAgdGhpcy5vcHRpb25zLmFyZWFSYXRpbyxcclxuICAgICAgdGhpcy5vcHRpb25zLmdldEZlYXR1cmVJZFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gZmVhdHVyZXMgYXJlIHNlbGVjdGVkIGZyb20gdGhlIG1hcCwgYWxzbyBzZWxlY3QgdGhlbVxyXG4gICAqIGluIHRoZWlyIHN0b3JlLlxyXG4gICAqIEBwYXJhbSBvbEZlYXR1cmVzIE9MIGZlYXR1cmUgb2JqZWN0c1xyXG4gICAqL1xyXG4gIHByaXZhdGUgb25TZWxlY3RGcm9tTWFwKG9sRmVhdHVyZXM6IE9sRmVhdHVyZVtdLCBleGNsdXNpdmU6IGJvb2xlYW4sIHJldmVyc2U6IGJvb2xlYW4pIHtcclxuICAgIGNvbnN0IGdyb3VwZWRGZWF0dXJlcyA9IHRoaXMuZ3JvdXBGZWF0dXJlc0J5U3RvcmUob2xGZWF0dXJlcyk7XHJcblxyXG4gICAgdGhpcy5zdG9yZXMuZm9yRWFjaCgoc3RvcmU6IEZlYXR1cmVTdG9yZSkgPT4ge1xyXG4gICAgICBjb25zdCBmZWF0dXJlcyA9IGdyb3VwZWRGZWF0dXJlcy5nZXQoc3RvcmUpO1xyXG4gICAgICBpZiAoZmVhdHVyZXMgPT09IHVuZGVmaW5lZCAmJiBleGNsdXNpdmUgPT09IHRydWUpIHtcclxuICAgICAgICB0aGlzLnVuc2VsZWN0QWxsRmVhdHVyZXNGcm9tU3RvcmUoc3RvcmUpO1xyXG4gICAgICB9IGVsc2UgaWYgKGZlYXR1cmVzID09PSB1bmRlZmluZWQgJiYgZXhjbHVzaXZlID09PSBmYWxzZSkge1xyXG4gICAgICAgIC8vIERvIG5vdGhpbmdcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnNlbGVjdEZlYXR1cmVzRnJvbVN0b3JlKHN0b3JlLCBmZWF0dXJlcywgZXhjbHVzaXZlLCByZXZlcnNlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWxlY3QgZmVhdHVyZXMgaW4gc3RvcmVcclxuICAgKiBAcGFyYW0gc3RvcmU6IEZlYXR1cmUgc3RvcmVcclxuICAgKiBAcGFyYW0gZmVhdHVyZXMgRmVhdHVyZXNcclxuICAgKi9cclxuICBwcml2YXRlIHNlbGVjdEZlYXR1cmVzRnJvbVN0b3JlKHN0b3JlOiBGZWF0dXJlU3RvcmUsIGZlYXR1cmVzOiBGZWF0dXJlW10sIGV4Y2x1c2l2ZTogYm9vbGVhbiwgcmV2ZXJzZTogYm9vbGVhbikge1xyXG4gICAgaWYgKHJldmVyc2UgPT09IHRydWUpIHtcclxuICAgICAgc3RvcmUuc3RhdGUucmV2ZXJzZU1hbnkoZmVhdHVyZXMsIFsnc2VsZWN0ZWQnXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdG9yZS5zdGF0ZS51cGRhdGVNYW55KGZlYXR1cmVzLCB7c2VsZWN0ZWQ6IHRydWV9LCBleGNsdXNpdmUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5zZWxlY3QgYWxsIGZlYXR1cmVzIGZyb20gc3RvcmVcclxuICAgKiBAcGFyYW0gc3RvcmU6IEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICBwcml2YXRlIHVuc2VsZWN0QWxsRmVhdHVyZXNGcm9tU3RvcmUoc3RvcmU6IEZlYXR1cmVTdG9yZSkge1xyXG4gICAgc3RvcmUuc3RhdGUudXBkYXRlQWxsKHtzZWxlY3RlZDogZmFsc2V9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYSBzdG9yZSAtPiBmZWF0dXJlcyBtYXBwaW5nIGZyb20gYSBsaXN0XHJcbiAgICogb2YgT0wgc2VsZWN0ZWQgZmVhdHVyZXMuIE9MIGZlYXR1cmVzIGtlZXAgYSByZWZlcmVuY2UgdG8gdGhlIHN0b3JlXHJcbiAgICogdGhleSBhcmUgZnJvbS5cclxuICAgKiBAcGFyYW0gb2xGZWF0dXJlczogT0wgZmVhdHVyZSBvYmplY3RzXHJcbiAgICogQHJldHVybnMgU3RvcmUgLT4gZmVhdHVyZXMgbWFwcGluZ1xyXG4gICAqL1xyXG4gIHByaXZhdGUgZ3JvdXBGZWF0dXJlc0J5U3RvcmUob2xGZWF0dXJlczogT2xGZWF0dXJlW10pOiBNYXA8RmVhdHVyZVN0b3JlLCBGZWF0dXJlW10+IHtcclxuICAgIGNvbnN0IGdyb3VwZWRGZWF0dXJlcyA9IG5ldyBNYXA8RmVhdHVyZVN0b3JlLCBGZWF0dXJlW10+KCk7XHJcbiAgICBpZiAob2xGZWF0dXJlcyA9PT0gbnVsbCB8fCBvbEZlYXR1cmVzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIGdyb3VwZWRGZWF0dXJlcztcclxuICAgIH1cclxuXHJcbiAgICBvbEZlYXR1cmVzLmZvckVhY2goKG9sRmVhdHVyZTogT2xGZWF0dXJlKSA9PiB7XHJcbiAgICAgIGNvbnN0IHN0b3JlID0gb2xGZWF0dXJlLmdldCgnX2ZlYXR1cmVTdG9yZScpO1xyXG4gICAgICBpZiAoc3RvcmUgPT09IHVuZGVmaW5lZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgIGxldCBmZWF0dXJlcyA9IGdyb3VwZWRGZWF0dXJlcy5nZXQoc3RvcmUpO1xyXG4gICAgICBpZiAoZmVhdHVyZXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGZlYXR1cmVzID0gW107XHJcbiAgICAgICAgZ3JvdXBlZEZlYXR1cmVzLnNldChzdG9yZSwgZmVhdHVyZXMpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBmZWF0dXJlID0gc3RvcmUuZ2V0KG9sRmVhdHVyZS5nZXRJZCgpKTtcclxuICAgICAgaWYgKGZlYXR1cmUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGZlYXR1cmVzLnB1c2goZmVhdHVyZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBncm91cGVkRmVhdHVyZXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYW4gb3ZlcmxheSBzdG9yZSB0aGF0J2xsIGNvbnRhaW4gdGhlIHNlbGVjdGVkIGZlYXR1cmVzLlxyXG4gICAqIEByZXR1cm5zIE92ZXJsYXkgc3RvcmVcclxuICAgKi9cclxuICBwcml2YXRlIGNyZWF0ZU92ZXJsYXlTdG9yZSgpOiBGZWF0dXJlU3RvcmUge1xyXG4gICAgY29uc3Qgb3ZlcmxheUxheWVyID0gdGhpcy5vcHRpb25zLmxheWVyXHJcbiAgICAgID8gdGhpcy5vcHRpb25zLmxheWVyXHJcbiAgICAgIDogdGhpcy5jcmVhdGVPdmVybGF5TGF5ZXIoKTtcclxuICAgIHJldHVybiBuZXcgRmVhdHVyZVN0b3JlKFtdLCB7bWFwOiB0aGlzLm1hcH0pLmJpbmRMYXllcihvdmVybGF5TGF5ZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGFuIG92ZXJsYXkgc3RvcmUgdGhhdCdsbCBjb250YWluIHRoZSBzZWxlY3RlZCBmZWF0dXJlcy5cclxuICAgKiBAcmV0dXJucyBPdmVybGF5IGxheWVyXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjcmVhdGVPdmVybGF5TGF5ZXIoKTogVmVjdG9yTGF5ZXIge1xyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3JMYXllcih7XHJcbiAgICAgIHpJbmRleDogMzAwLFxyXG4gICAgICBzb3VyY2U6IG5ldyBGZWF0dXJlRGF0YVNvdXJjZSgpLFxyXG4gICAgICBzdHlsZTogdW5kZWZpbmVkLFxyXG4gICAgICBzaG93SW5MYXllckxpc3Q6IGZhbHNlLFxyXG4gICAgICBleHBvcnRhYmxlOiBmYWxzZSxcclxuICAgICAgYnJvd3NhYmxlOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgdGhlIG92ZXJsYXkgc3RvcmUncyBsYXllciB0byB0aGUgbWFwIHRvIGRpc3BsYXkgdGhlIHNlbGVjdGVkXHJcbiAgICogZmVhdHVyZXMuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRPdmVybGF5TGF5ZXIoKSB7XHJcbiAgICBpZiAodGhpcy5vdmVybGF5U3RvcmUubGF5ZXIubWFwID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5tYXAuYWRkTGF5ZXIodGhpcy5vdmVybGF5U3RvcmUubGF5ZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIHRoZSBvdmVybGF5IGxheWVyIGZyb20gdGhlIG1hcFxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlT3ZlcmxheUxheWVyKCkge1xyXG4gICAgdGhpcy5vdmVybGF5U3RvcmUuc291cmNlLm9sLmNsZWFyKCk7XHJcbiAgICB0aGlzLm1hcC5yZW1vdmVMYXllcih0aGlzLm92ZXJsYXlTdG9yZS5sYXllcik7XHJcbiAgfVxyXG59XHJcbiJdfQ==