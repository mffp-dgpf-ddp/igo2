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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ZlYXR1cmUvc2hhcmVkL3N0cmF0ZWdpZXMvc2VsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxvQkFBb0IsTUFBTSx3QkFBd0IsQ0FBQztBQUkxRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXhDLE9BQU8sRUFBZ0IsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpELE9BQU8sRUFBMkIsbUJBQW1CLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFNUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBVSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN4QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFakQ7SUFBc0MsbURBQW9CO0lBQ3hELGlDQUFZLE9BQU87ZUFDakIsa0JBQU0sT0FBTyxDQUFDO0lBQ2hCLENBQUM7SUFDSCw4QkFBQztBQUFELENBQUMsQUFKRCxDQUFzQyxvQkFBb0IsR0FJekQ7Ozs7Ozs7Ozs7O0FBWUQ7Ozs7Ozs7Ozs7O0lBQW1ELHlEQUFtQjtJQTZCcEUsdUNBQXNCLE9BQTZDO1FBQW5FLFlBQ0Usa0JBQU0sT0FBTyxDQUFDLFNBRWY7UUFIcUIsYUFBTyxHQUFQLE9BQU8sQ0FBc0M7UUFFakUsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzs7SUFDakQsQ0FBQztJQVpELHNCQUFJLDhDQUFH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SUFDSCxvQ0FBQztBQUFELENBQUMsQUExWEQsQ0FBbUQsbUJBQW1CLEdBMFhyRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXBYQyx5REFBMkM7Ozs7O0lBRTNDLGdFQUF5RDs7Ozs7SUFFekQsc0VBQThDOzs7Ozs7SUFLOUMsaURBQStCOzs7OztJQVkvQixzREFBb0M7Ozs7O0lBRXhCLGdEQUF1RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBPbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCBPbERyYWdCb3hJbnRlcmFjdGlvbiBmcm9tICdvbC9pbnRlcmFjdGlvbi9EcmFnQm94JztcclxuaW1wb3J0IHsgRHJhZ0JveEV2ZW50IGFzIE9sRHJhZ0JveEV2ZW50IH0gZnJvbSAnb2wvaW50ZXJhY3Rpb24vRHJhZ0JveCc7XHJcbmltcG9ydCB7IExpc3RlbmVyRnVuY3Rpb24gfSBmcm9tICdvbC9ldmVudHMnO1xyXG5pbXBvcnQgeyBNYXBCcm93c2VyUG9pbnRlckV2ZW50IGFzIE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCB9IGZyb20gJ29sL01hcEJyb3dzZXJFdmVudCc7XHJcbmltcG9ydCB7IHVuQnlLZXkgfSBmcm9tICdvbC9PYnNlcnZhYmxlJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgY29tYmluZUxhdGVzdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAsIGRlYm91bmNlVGltZSwgc2tpcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IEVudGl0eUtleSwgRW50aXR5UmVjb3JkLCBFbnRpdHlTdG9yZVN0cmF0ZWd5IH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IEZlYXR1cmVEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IFZlY3RvckxheWVyIH0gZnJvbSAnLi4vLi4vLi4vbGF5ZXInO1xyXG5pbXBvcnQgeyBJZ29NYXAsIGN0cmxLZXlEb3duIH0gZnJvbSAnLi4vLi4vLi4vbWFwJztcclxuXHJcbmltcG9ydCB7IEZlYXR1cmUsIEZlYXR1cmVTdG9yZVNlbGVjdGlvblN0cmF0ZWd5T3B0aW9ucyB9IGZyb20gJy4uL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IEZlYXR1cmVTdG9yZSB9IGZyb20gJy4uL3N0b3JlJztcclxuaW1wb3J0IHsgRmVhdHVyZU1vdGlvbiB9IGZyb20gJy4uL2ZlYXR1cmUuZW51bXMnO1xyXG5cclxuY2xhc3MgT2xEcmFnU2VsZWN0SW50ZXJhY3Rpb24gZXh0ZW5kcyBPbERyYWdCb3hJbnRlcmFjdGlvbiB7XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogVGhpcyBzdHJhdGVneSBzeW5jaHJvbml6ZXMgYSBzdG9yZSBhbmQgYSBsYXllciBzZWxlY3RlZCBlbnRpdGllcy5cclxuICogVGhlIHN0b3JlIDwtPiBsYXllciBiaW5kaW5nIGlzIGEgdHdvLXdheSBiaW5kaW5nLlxyXG4gKlxyXG4gKiBJbiBtYW55IGNhc2VzLCBhIHNpbmdsZSBzdHJhdGVneSBib3VuZCB0byBtdWx0aXBsZSBzdG9yZXNcclxuICogd2lsbCB5aWVsZCBiZXR0ZXIgcmVzdWx0cyB0aGF0IG11bHRpcGxlIHN0cmF0ZWdpZXMgd2l0aCBlYWNoIHRoZWlyXHJcbiAqIG93biBzdG9yZS4gSW4gdGhlIGxhdHRlciBzY2VuYXJpbywgYSBjbGljayBvbiBvdmVybGFwcGluZyBmZWF0dXJlc1xyXG4gKiB3b3VsZCB0cmlnZ2VyIHRoZSBzdHJhdGVneSBvZiBlYWNoIGxheWVyIGFuZCB0aGV5IHdvdWxkIGNhbmNlbFxyXG4gKiBlYWNoIG90aGVyIGFzIHdlbGwgYXMgbW92ZSB0aGUgbWFwIHZpZXcgYXJvdW5kIG5lZWRsZXNzbHkuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRmVhdHVyZVN0b3JlU2VsZWN0aW9uU3RyYXRlZ3kgZXh0ZW5kcyBFbnRpdHlTdG9yZVN0cmF0ZWd5IHtcclxuXHJcbiAgLyoqXHJcbiAgICogTGlzdGVuZXIgdG8gdGhlIG1hcCBjbGljayBldmVudCB0aGF0IGFsbG93cyBzZWxlY3RpbmcgYSBmZWF0dXJlXHJcbiAgICogYnkgY2xpY2tpbmcgb24gdGhlIG1hcFxyXG4gICAqL1xyXG4gIHByaXZhdGUgbWFwQ2xpY2tMaXN0ZW5lcjogTGlzdGVuZXJGdW5jdGlvbjtcclxuXHJcbiAgcHJpdmF0ZSBvbERyYWdTZWxlY3RJbnRlcmFjdGlvbjogT2xEcmFnU2VsZWN0SW50ZXJhY3Rpb247XHJcblxyXG4gIHByaXZhdGUgb2xEcmFnU2VsZWN0SW50ZXJhY3Rpb25FbmRLZXk6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvIGFsbCBzdG9yZXMgc2VsZWN0ZWQgZW50aXRpZXNcclxuICAgKi9cclxuICBwcml2YXRlIHN0b3JlcyQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBtYXAgdGhlIGxheWVycyBiZWxvbmcgdG9cclxuICAgKi9cclxuICBnZXQgbWFwKCk6IElnb01hcCB7IHJldHVybiB0aGlzLm9wdGlvbnMubWFwOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZmVhdHVyZSBzdG9yZSB0aGF0J2xsIGNvbnRhaW4gdGhlIHNlbGVjdGVkIGZlYXR1cmVzLiBJdCBoYXMgaXQncyBvd25cclxuICAgKiBsYXllciwgc2hhcmVkIGJ5IGFsbCB0aGUgc3RvcmVzIHRoaXMgc3RhcmV0Z3kgaXMgYm91bmQgdG8uXHJcbiAgICovXHJcbiAgZ2V0IG92ZXJsYXlTdG9yZSgpOiBGZWF0dXJlU3RvcmUgeyByZXR1cm4gdGhpcy5fb3ZlcmxheVN0b3JlOyB9XHJcbiAgcHJpdmF0ZSBfb3ZlcmxheVN0b3JlOiBGZWF0dXJlU3RvcmU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBvcHRpb25zOiBGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneU9wdGlvbnMpIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgdGhpcy5fb3ZlcmxheVN0b3JlID0gdGhpcy5jcmVhdGVPdmVybGF5U3RvcmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEJpbmQgdGhpcyBzdHJhdGVneSB0byBhIHN0b3JlIGFuZCBmb3JjZSB0aGlzIHN0cmF0ZWd5J3NcclxuICAgKiByZWFjdGl2YXRpb24gdG8gcHJvcGVybHkgc2V0dXAgd2F0Y2hlcnMuXHJcbiAgICogQHBhcmFtIHN0b3JlIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICBiaW5kU3RvcmUoc3RvcmU6IEZlYXR1cmVTdG9yZSkge1xyXG4gICAgc3VwZXIuYmluZFN0b3JlKHN0b3JlKTtcclxuICAgIGlmICh0aGlzLmFjdGl2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAvLyBGb3JjZSByZWFjdGl2YXRpb25cclxuICAgICAgdGhpcy5hY3RpdmF0ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5iaW5kIHRoaXMgc3RyYXRlZ3kgZnJvbSBhIHN0b3JlIGFuZCBmb3JjZSB0aGlzIHN0cmF0ZWd5J3NcclxuICAgKiByZWFjdGl2YXRpb24gdG8gcHJvcGVybHkgc2V0dXAgd2F0Y2hlcnMuXHJcbiAgICogQHBhcmFtIHN0b3JlIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICB1bmJpbmRTdG9yZShzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBzdXBlci51bmJpbmRTdG9yZShzdG9yZSk7XHJcbiAgICBpZiAodGhpcy5hY3RpdmUgPT09IHRydWUpIHtcclxuICAgICAgLy8gRm9yY2UgcmVhY3RpdmF0aW9uXHJcbiAgICAgIHRoaXMuYWN0aXZhdGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuc2VsZWN0IGFsbCBlbnRpdGllcywgZnJvbSBhbGwgc3RvcmVzXHJcbiAgICovXHJcbiAgdW5zZWxlY3RBbGwoKSB7XHJcbiAgICB0aGlzLnN0b3Jlcy5mb3JFYWNoKChzdG9yZTogRmVhdHVyZVN0b3JlKSA9PiB7XHJcbiAgICAgIHN0b3JlLnN0YXRlLnVwZGF0ZUFsbCh7c2VsZWN0ZWQ6IGZhbHNlfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNsZWFyKCkge1xyXG4gICAgdGhpcy5vdmVybGF5U3RvcmUuc291cmNlLm9sLmNsZWFyKCk7XHJcbiAgICB0aGlzLm92ZXJsYXlTdG9yZS5jbGVhcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIHRoZSBvdmVybGF5IGxheWVyLCBzZXR1cCB0aGUgbWFwIGNsaWNrIGxzaXRlbmVyIGFuZFxyXG4gICAqIHN0YXJ0IHdhdGNoaW5nIGZvciBzdG9yZXMgc2VsZWN0aW9uXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGRvQWN0aXZhdGUoKSB7XHJcbiAgICB0aGlzLmFkZE92ZXJsYXlMYXllcigpO1xyXG4gICAgdGhpcy5saXN0ZW5Ub01hcENsaWNrKCk7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmRyYWdCb3ggPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5hZGREcmFnQm94SW50ZXJhY3Rpb24oKTtcclxuICAgIH1cclxuICAgIHRoaXMud2F0Y2hBbGwoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSB0aGUgb3ZlcmxheSBsYXllciwgcmVtb3ZlIHRoZSBtYXAgY2xpY2sgbHNpdGVuZXIgYW5kXHJcbiAgICogc3RvcCB3YXRjaGluZyBmb3Igc3RvcmVzIHNlbGVjdGlvblxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBkb0RlYWN0aXZhdGUoKSB7XHJcbiAgICB0aGlzLnVubGlzdGVuVG9NYXBDbGljaygpO1xyXG4gICAgdGhpcy5yZW1vdmVEcmFnQm94SW50ZXJhY3Rpb24oKTtcclxuICAgIHRoaXMudW53YXRjaEFsbCgpO1xyXG4gICAgdGhpcy5yZW1vdmVPdmVybGF5TGF5ZXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIHNpbmdsZSBvYnNlcnZhYmxlIG9mIGFsbCB0aGUgc3RvcmVzLiBXaXRoIGEgc2luZ2xlIG9ic2VydmFibGUsXHJcbiAgICogZmVhdHVyZXMgY2FuIGJlIGFkZGVkIGFsbCBhdCBvbmNlIHRvIHRoZSBvdmVybGF5IGxheWVyIGFuZCBhIHNpbmdsZVxyXG4gICAqIG1vdGlvbiBjYW4gYmUgcGVyZm9ybWVkLiBNdWx0aXBsZSBvYnNlcnZhYmxlIHdvdWxkIGhhdmVcclxuICAgKiBhIGNhbmNlbGxpbmcgZWZmZWN0IG9uIGVhY2ggb3RoZXIuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB3YXRjaEFsbCgpIHtcclxuICAgIHRoaXMudW53YXRjaEFsbCgpO1xyXG5cclxuICAgIGNvbnN0IHN0b3JlcyQgPSB0aGlzLnN0b3Jlcy5tYXAoKHN0b3JlOiBGZWF0dXJlU3RvcmUpID0+IHtcclxuICAgICAgcmV0dXJuIHN0b3JlLnN0YXRlVmlldy5tYW55QnkkKChyZWNvcmQ6IEVudGl0eVJlY29yZDxGZWF0dXJlPikgPT4ge1xyXG4gICAgICAgIHJldHVybiByZWNvcmQuc3RhdGUuc2VsZWN0ZWQgPT09IHRydWU7XHJcbiAgICAgIH0pLnBpcGUoXHJcbiAgICAgICAgbWFwKChyZWNvcmRzOiBFbnRpdHlSZWNvcmQ8RmVhdHVyZT5bXSkgPT4gcmVjb3Jkcy5tYXAocmVjb3JkID0+IHJlY29yZC5lbnRpdHkpKVxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnN0b3JlcyQkID0gY29tYmluZUxhdGVzdChzdG9yZXMkKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBkZWJvdW5jZVRpbWUoNSksXHJcbiAgICAgICAgc2tpcCgxKSwgLy8gU2tpcCBpbnRpYWwgc2VsZWN0aW9uXHJcbiAgICAgICAgbWFwKChmZWF0dXJlczogQXJyYXk8RmVhdHVyZVtdPikgPT4gZmVhdHVyZXMucmVkdWNlKChhLCBiKSA9PiBhLmNvbmNhdChiKSkpXHJcbiAgICAgICkuc3Vic2NyaWJlKChmZWF0dXJlczogRmVhdHVyZVtdKSA9PiB0aGlzLm9uU2VsZWN0RnJvbVN0b3JlKGZlYXR1cmVzKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdG9wIHdhdGNoaW5nIGZvciBzZWxlY3Rpb24gaW4gYWxsIHN0b3Jlcy5cclxuICAgKi9cclxuICBwcml2YXRlIHVud2F0Y2hBbGwoKSB7XHJcbiAgICBpZiAodGhpcy5zdG9yZXMkJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuc3RvcmVzJCQudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhICdzaW5nbGVjbGljaycgbGlzdGVuZXIgdG8gdGhlIG1hcCB0aGF0J2xsIGFsbG93IHNlbGVjdGluZ1xyXG4gICAqIGZlYXR1cmVzIGJ5IGNsaWNraW5nIG9uIHRoZSBtYXAuIFRoZSBzZWxlY3Rpb24gd2lsbCBiZSBwZXJmb3JtZWRcclxuICAgKiBvbmx5IG9uIHRoZSBsYXllcnMgYm91bmQgdG8gdGhpcyBzdHJhdGVneS5cclxuICAgKi9cclxuICBwcml2YXRlIGxpc3RlblRvTWFwQ2xpY2soKSB7XHJcbiAgICB0aGlzLm1hcENsaWNrTGlzdGVuZXIgPSB0aGlzLm1hcC5vbC5vbignc2luZ2xlY2xpY2snLCAoZXZlbnQ6IE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCkgPT4ge1xyXG4gICAgICB0aGlzLm9uTWFwQ2xpY2soZXZlbnQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgdGhlIG1hcCBjbGljayBsaXN0ZW5lclxyXG4gICAqL1xyXG4gIHByaXZhdGUgdW5saXN0ZW5Ub01hcENsaWNrKCkge1xyXG4gICAgaWYgKHRoaXMubWFwQ2xpY2tMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMubWFwLm9sLnVuKFxyXG4gICAgICAgIHRoaXMubWFwQ2xpY2tMaXN0ZW5lci50eXBlLFxyXG4gICAgICAgIHRoaXMubWFwQ2xpY2tMaXN0ZW5lci5saXN0ZW5lclxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gbWFwIGNsaWNrLCBzZWxlY3QgZmVhdHVyZSBhdCBwaXhlbFxyXG4gICAqIEBwYXJhbSBldmVudCBPTCBNYXBCcm93c2VyUG9pbnRlckV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbk1hcENsaWNrKGV2ZW50OiBPbE1hcEJyb3dzZXJQb2ludGVyRXZlbnQpIHtcclxuICAgIGNvbnN0IGV4Y2x1c2l2ZSA9ICFjdHJsS2V5RG93bihldmVudCk7XHJcbiAgICBjb25zdCByZXZlcnNlID0gIWV4Y2x1c2l2ZTtcclxuICAgIGNvbnN0IG9sRmVhdHVyZXMgPSBldmVudC5tYXAuZ2V0RmVhdHVyZXNBdFBpeGVsKGV2ZW50LnBpeGVsLCB7XHJcbiAgICAgIGhpdFRvbGVyYW5jZTogdGhpcy5vcHRpb25zLmhpdFRvbGVyYW5jZSB8fCAwLFxyXG4gICAgICBsYXllckZpbHRlcjogKG9sTGF5ZXIpID0+IHtcclxuICAgICAgICBjb25zdCBzdG9yZU9sTGF5ZXIgPSB0aGlzLnN0b3Jlcy5maW5kKChzdG9yZTogRmVhdHVyZVN0b3JlKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gc3RvcmUubGF5ZXIub2wgPT09IG9sTGF5ZXI7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHN0b3JlT2xMYXllciAhPT0gdW5kZWZpbmVkO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMub25TZWxlY3RGcm9tTWFwKG9sRmVhdHVyZXMsIGV4Y2x1c2l2ZSwgcmV2ZXJzZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYSBkcmFnIGJveCBpbnRlcmFjdGlvbiBhbmQsIG9uIGRyYWcgYm94IGVuZCwgc2VsZWN0IGZlYXR1cmVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGREcmFnQm94SW50ZXJhY3Rpb24oKSB7XHJcbiAgICBsZXQgb2xEcmFnU2VsZWN0SW50ZXJhY3Rpb247XHJcbiAgICBjb25zdCBvbEludGVyYWN0aW9ucyA9IHRoaXMubWFwLm9sLmdldEludGVyYWN0aW9ucygpLmdldEFycmF5KCk7XHJcblxyXG4gICAgLy8gVGhlcmUgY2FuIG9ubHkgYmUgb25lIGRyYWdib3ggaW50ZXJhY3Rpb24sIHNvIGZpbmQgdGhlIGN1cnJlbnQgb25lLCBpZiBhbnlcclxuICAgIC8vIERvbid0IGtlZXAgYSByZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnQgZHJhZ2JveCBiZWNhdXNlIHdlIGRvbid0IHdhbnRcclxuICAgIC8vIHRvIHJlbW92ZSBpdCB3aGVuIHRoaXMgc3RhcnRlZ3kgaXMgZGVhY3RpdmF0ZWRcclxuICAgIGZvciAoY29uc3Qgb2xJbnRlcmFjdGlvbiBvZiBvbEludGVyYWN0aW9ucykge1xyXG4gICAgICBpZiAob2xJbnRlcmFjdGlvbiBpbnN0YW5jZW9mIE9sRHJhZ1NlbGVjdEludGVyYWN0aW9uKSB7XHJcbiAgICAgICAgb2xEcmFnU2VsZWN0SW50ZXJhY3Rpb24gPSBvbEludGVyYWN0aW9uO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBJZiBubyBkcmFnIGJveCBpbnRlcmFjdGlvbiBpcyBmb3VuZCwgY3JlYXRlIGEgbmV3IG9uZSBhbmQgYWRkIGl0IHRvIHRoZSBtYXBcclxuICAgIGlmIChvbERyYWdTZWxlY3RJbnRlcmFjdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIG9sRHJhZ1NlbGVjdEludGVyYWN0aW9uID0gbmV3IE9sRHJhZ1NlbGVjdEludGVyYWN0aW9uKHtcclxuICAgICAgICBjb25kaXRpb246IGN0cmxLZXlEb3duXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLm1hcC5vbC5hZGRJbnRlcmFjdGlvbihvbERyYWdTZWxlY3RJbnRlcmFjdGlvbik7XHJcbiAgICAgIHRoaXMub2xEcmFnU2VsZWN0SW50ZXJhY3Rpb24gPSBvbERyYWdTZWxlY3RJbnRlcmFjdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9sRHJhZ1NlbGVjdEludGVyYWN0aW9uRW5kS2V5ID0gb2xEcmFnU2VsZWN0SW50ZXJhY3Rpb24ub24oXHJcbiAgICAgICdib3hlbmQnLFxyXG4gICAgICAoZXZlbnQ6IE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCkgPT4gdGhpcy5vbkRyYWdCb3hFbmQoZXZlbnQpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIGRyYWcgYm94IGludGVyYWN0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZW1vdmVEcmFnQm94SW50ZXJhY3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5vbERyYWdTZWxlY3RJbnRlcmFjdGlvbkVuZEtleSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHVuQnlLZXkodGhpcy5vbERyYWdTZWxlY3RJbnRlcmFjdGlvbkVuZEtleSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5vbERyYWdTZWxlY3RJbnRlcmFjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMubWFwLm9sLnJlbW92ZUludGVyYWN0aW9uKHRoaXMub2xEcmFnU2VsZWN0SW50ZXJhY3Rpb24pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vbERyYWdTZWxlY3RJbnRlcmFjdGlvbiA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIGRyYWdib3ggZW5kLCBzZWxlY3QgZmVhdHVyZXMgaW4gZHJhZyBib3hcclxuICAgKiBAcGFyYW0gZXZlbnQgT0wgTWFwQnJvd3NlclBvaW50ZXJFdmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25EcmFnQm94RW5kKGV2ZW50OiBPbERyYWdCb3hFdmVudCkge1xyXG4gICAgY29uc3QgZXhjbHVzaXZlID0gIWN0cmxLZXlEb3duKGV2ZW50Lm1hcEJyb3dzZXJFdmVudCk7XHJcbiAgICBjb25zdCBleHRlbnQgPSBldmVudC50YXJnZXQuZ2V0R2VvbWV0cnkoKS5nZXRFeHRlbnQoKTtcclxuICAgIGNvbnN0IG9sRmVhdHVyZXMgPSB0aGlzLnN0b3Jlcy5yZWR1Y2UoKGFjYzogT2xGZWF0dXJlW10sIHN0b3JlOiBGZWF0dXJlU3RvcmUpID0+IHtcclxuICAgICAgY29uc3Qgb2xTb3VyY2UgPSBzdG9yZS5sYXllci5vbC5nZXRTb3VyY2UoKTtcclxuICAgICAgYWNjLnB1c2goLi4ub2xTb3VyY2UuZ2V0RmVhdHVyZXNJbkV4dGVudChleHRlbnQpKTtcclxuICAgICAgcmV0dXJuIGFjYztcclxuICAgIH0sIFtdKTtcclxuICAgIHRoaXMub25TZWxlY3RGcm9tTWFwKG9sRmVhdHVyZXMsIGV4Y2x1c2l2ZSwgZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBmZWF0dXJlcyBhcmUgc2VsZWN0ZWQgZnJvbSB0aGUgc3RvcmUsIGFkZFxyXG4gICAqIHRoZW0gdG8gdGhpcyBzdGFydGVneSdzIG92ZXJsYXkgbGF5ZXIgKHNlbGVjdCBvbiBtYXApXHJcbiAgICogQHBhcmFtIGZlYXR1cmVzIFN0b3JlIGZlYXR1cmVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvblNlbGVjdEZyb21TdG9yZShmZWF0dXJlczogRmVhdHVyZVtdKSB7XHJcbiAgICBjb25zdCBtb3Rpb24gPSB0aGlzLm9wdGlvbnMgPyB0aGlzLm9wdGlvbnMubW90aW9uIDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3Qgb2xPdmVybGF5RmVhdHVyZXMgPSB0aGlzLm92ZXJsYXlTdG9yZS5sYXllci5vbC5nZXRTb3VyY2UoKS5nZXRGZWF0dXJlcygpO1xyXG4gICAgY29uc3Qgb3ZlcmxheUZlYXR1cmVzS2V5cyA9IG9sT3ZlcmxheUZlYXR1cmVzLm1hcCgob2xGZWF0dXJlOiBPbEZlYXR1cmUpID0+IG9sRmVhdHVyZS5nZXRJZCgpKTtcclxuICAgIGNvbnN0IGZlYXR1cmVzS2V5cyA9IGZlYXR1cmVzLm1hcCh0aGlzLm92ZXJsYXlTdG9yZS5nZXRLZXkpO1xyXG5cclxuICAgIGxldCBkb01vdGlvbjtcclxuICAgIGlmIChmZWF0dXJlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgZG9Nb3Rpb24gPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRvTW90aW9uID0gb3ZlcmxheUZlYXR1cmVzS2V5cy5sZW5ndGggIT09IGZlYXR1cmVzS2V5cy5sZW5ndGggfHxcclxuICAgICAgICAhb3ZlcmxheUZlYXR1cmVzS2V5cy5ldmVyeSgoa2V5OiBFbnRpdHlLZXkpID0+IGZlYXR1cmVzS2V5cy5pbmRleE9mKGtleSkgPj0gMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vdmVybGF5U3RvcmUuc2V0TGF5ZXJGZWF0dXJlcyhcclxuICAgICAgZmVhdHVyZXMsXHJcbiAgICAgIGRvTW90aW9uID8gbW90aW9uIDogRmVhdHVyZU1vdGlvbi5Ob25lLFxyXG4gICAgICB0aGlzLm9wdGlvbnMudmlld1NjYWxlLFxyXG4gICAgICB0aGlzLm9wdGlvbnMuYXJlYVJhdGlvLFxyXG4gICAgICB0aGlzLm9wdGlvbnMuZ2V0RmVhdHVyZUlkXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBmZWF0dXJlcyBhcmUgc2VsZWN0ZWQgZnJvbSB0aGUgbWFwLCBhbHNvIHNlbGVjdCB0aGVtXHJcbiAgICogaW4gdGhlaXIgc3RvcmUuXHJcbiAgICogQHBhcmFtIG9sRmVhdHVyZXMgT0wgZmVhdHVyZSBvYmplY3RzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvblNlbGVjdEZyb21NYXAob2xGZWF0dXJlczogT2xGZWF0dXJlW10sIGV4Y2x1c2l2ZTogYm9vbGVhbiwgcmV2ZXJzZTogYm9vbGVhbikge1xyXG4gICAgY29uc3QgZ3JvdXBlZEZlYXR1cmVzID0gdGhpcy5ncm91cEZlYXR1cmVzQnlTdG9yZShvbEZlYXR1cmVzKTtcclxuXHJcbiAgICB0aGlzLnN0b3Jlcy5mb3JFYWNoKChzdG9yZTogRmVhdHVyZVN0b3JlKSA9PiB7XHJcbiAgICAgIGNvbnN0IGZlYXR1cmVzID0gZ3JvdXBlZEZlYXR1cmVzLmdldChzdG9yZSk7XHJcbiAgICAgIGlmIChmZWF0dXJlcyA9PT0gdW5kZWZpbmVkICYmIGV4Y2x1c2l2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMudW5zZWxlY3RBbGxGZWF0dXJlc0Zyb21TdG9yZShzdG9yZSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoZmVhdHVyZXMgPT09IHVuZGVmaW5lZCAmJiBleGNsdXNpdmUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgLy8gRG8gbm90aGluZ1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0RmVhdHVyZXNGcm9tU3RvcmUoc3RvcmUsIGZlYXR1cmVzLCBleGNsdXNpdmUsIHJldmVyc2UpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlbGVjdCBmZWF0dXJlcyBpbiBzdG9yZVxyXG4gICAqIEBwYXJhbSBzdG9yZTogRmVhdHVyZSBzdG9yZVxyXG4gICAqIEBwYXJhbSBmZWF0dXJlcyBGZWF0dXJlc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgc2VsZWN0RmVhdHVyZXNGcm9tU3RvcmUoc3RvcmU6IEZlYXR1cmVTdG9yZSwgZmVhdHVyZXM6IEZlYXR1cmVbXSwgZXhjbHVzaXZlOiBib29sZWFuLCByZXZlcnNlOiBib29sZWFuKSB7XHJcbiAgICBpZiAocmV2ZXJzZSA9PT0gdHJ1ZSkge1xyXG4gICAgICBzdG9yZS5zdGF0ZS5yZXZlcnNlTWFueShmZWF0dXJlcywgWydzZWxlY3RlZCddKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN0b3JlLnN0YXRlLnVwZGF0ZU1hbnkoZmVhdHVyZXMsIHtzZWxlY3RlZDogdHJ1ZX0sIGV4Y2x1c2l2ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbnNlbGVjdCBhbGwgZmVhdHVyZXMgZnJvbSBzdG9yZVxyXG4gICAqIEBwYXJhbSBzdG9yZTogRmVhdHVyZSBzdG9yZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgdW5zZWxlY3RBbGxGZWF0dXJlc0Zyb21TdG9yZShzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBzdG9yZS5zdGF0ZS51cGRhdGVBbGwoe3NlbGVjdGVkOiBmYWxzZX0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBtZXRob2QgcmV0dXJucyBhIHN0b3JlIC0+IGZlYXR1cmVzIG1hcHBpbmcgZnJvbSBhIGxpc3RcclxuICAgKiBvZiBPTCBzZWxlY3RlZCBmZWF0dXJlcy4gT0wgZmVhdHVyZXMga2VlcCBhIHJlZmVyZW5jZSB0byB0aGUgc3RvcmVcclxuICAgKiB0aGV5IGFyZSBmcm9tLlxyXG4gICAqIEBwYXJhbSBvbEZlYXR1cmVzOiBPTCBmZWF0dXJlIG9iamVjdHNcclxuICAgKiBAcmV0dXJucyBTdG9yZSAtPiBmZWF0dXJlcyBtYXBwaW5nXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBncm91cEZlYXR1cmVzQnlTdG9yZShvbEZlYXR1cmVzOiBPbEZlYXR1cmVbXSk6IE1hcDxGZWF0dXJlU3RvcmUsIEZlYXR1cmVbXT4ge1xyXG4gICAgY29uc3QgZ3JvdXBlZEZlYXR1cmVzID0gbmV3IE1hcDxGZWF0dXJlU3RvcmUsIEZlYXR1cmVbXT4oKTtcclxuICAgIGlmIChvbEZlYXR1cmVzID09PSBudWxsIHx8IG9sRmVhdHVyZXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gZ3JvdXBlZEZlYXR1cmVzO1xyXG4gICAgfVxyXG5cclxuICAgIG9sRmVhdHVyZXMuZm9yRWFjaCgob2xGZWF0dXJlOiBPbEZlYXR1cmUpID0+IHtcclxuICAgICAgY29uc3Qgc3RvcmUgPSBvbEZlYXR1cmUuZ2V0KCdfZmVhdHVyZVN0b3JlJyk7XHJcbiAgICAgIGlmIChzdG9yZSA9PT0gdW5kZWZpbmVkKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgbGV0IGZlYXR1cmVzID0gZ3JvdXBlZEZlYXR1cmVzLmdldChzdG9yZSk7XHJcbiAgICAgIGlmIChmZWF0dXJlcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgZmVhdHVyZXMgPSBbXTtcclxuICAgICAgICBncm91cGVkRmVhdHVyZXMuc2V0KHN0b3JlLCBmZWF0dXJlcyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGZlYXR1cmUgPSBzdG9yZS5nZXQob2xGZWF0dXJlLmdldElkKCkpO1xyXG4gICAgICBpZiAoZmVhdHVyZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgZmVhdHVyZXMucHVzaChmZWF0dXJlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGdyb3VwZWRGZWF0dXJlcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhbiBvdmVybGF5IHN0b3JlIHRoYXQnbGwgY29udGFpbiB0aGUgc2VsZWN0ZWQgZmVhdHVyZXMuXHJcbiAgICogQHJldHVybnMgT3ZlcmxheSBzdG9yZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgY3JlYXRlT3ZlcmxheVN0b3JlKCk6IEZlYXR1cmVTdG9yZSB7XHJcbiAgICBjb25zdCBvdmVybGF5TGF5ZXIgPSB0aGlzLm9wdGlvbnMubGF5ZXJcclxuICAgICAgPyB0aGlzLm9wdGlvbnMubGF5ZXJcclxuICAgICAgOiB0aGlzLmNyZWF0ZU92ZXJsYXlMYXllcigpO1xyXG4gICAgcmV0dXJuIG5ldyBGZWF0dXJlU3RvcmUoW10sIHttYXA6IHRoaXMubWFwfSkuYmluZExheWVyKG92ZXJsYXlMYXllcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYW4gb3ZlcmxheSBzdG9yZSB0aGF0J2xsIGNvbnRhaW4gdGhlIHNlbGVjdGVkIGZlYXR1cmVzLlxyXG4gICAqIEByZXR1cm5zIE92ZXJsYXkgbGF5ZXJcclxuICAgKi9cclxuICBwcml2YXRlIGNyZWF0ZU92ZXJsYXlMYXllcigpOiBWZWN0b3JMYXllciB7XHJcbiAgICByZXR1cm4gbmV3IFZlY3RvckxheWVyKHtcclxuICAgICAgekluZGV4OiAzMDAsXHJcbiAgICAgIHNvdXJjZTogbmV3IEZlYXR1cmVEYXRhU291cmNlKCksXHJcbiAgICAgIHN0eWxlOiB1bmRlZmluZWQsXHJcbiAgICAgIHNob3dJbkxheWVyTGlzdDogZmFsc2UsXHJcbiAgICAgIGV4cG9ydGFibGU6IGZhbHNlLFxyXG4gICAgICBicm93c2FibGU6IGZhbHNlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCB0aGUgb3ZlcmxheSBzdG9yZSdzIGxheWVyIHRvIHRoZSBtYXAgdG8gZGlzcGxheSB0aGUgc2VsZWN0ZWRcclxuICAgKiBmZWF0dXJlcy5cclxuICAgKi9cclxuICBwcml2YXRlIGFkZE92ZXJsYXlMYXllcigpIHtcclxuICAgIGlmICh0aGlzLm92ZXJsYXlTdG9yZS5sYXllci5tYXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm1hcC5hZGRMYXllcih0aGlzLm92ZXJsYXlTdG9yZS5sYXllcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgdGhlIG92ZXJsYXkgbGF5ZXIgZnJvbSB0aGUgbWFwXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZW1vdmVPdmVybGF5TGF5ZXIoKSB7XHJcbiAgICB0aGlzLm92ZXJsYXlTdG9yZS5zb3VyY2Uub2wuY2xlYXIoKTtcclxuICAgIHRoaXMubWFwLnJlbW92ZUxheWVyKHRoaXMub3ZlcmxheVN0b3JlLmxheWVyKTtcclxuICB9XHJcbn1cclxuIl19