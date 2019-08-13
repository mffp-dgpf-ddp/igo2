/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import olMap from 'ol/Map';
import olView from 'ol/View';
import olFeature from 'ol/Feature';
import olGeolocation from 'ol/Geolocation';
import olControlAttribution from 'ol/control/Attribution';
import olControlScaleLine from 'ol/control/ScaleLine';
import * as olproj from 'ol/proj';
import * as olproj4 from 'ol/proj/proj4';
import * as olinteraction from 'ol/interaction';
import proj4 from 'proj4';
import { BehaviorSubject } from 'rxjs';
import { Overlay } from '../../overlay/shared/overlay';
import { LayerWatcher } from '../utils/layer-watcher';
import { MapViewController } from './controllers/view';
// TODO: This class is messy. Clearly define it's scope and the map browser's.
// Move some stuff into controllers.
var 
// TODO: This class is messy. Clearly define it's scope and the map browser's.
// Move some stuff into controllers.
IgoMap = /** @class */ (function () {
    function IgoMap(options) {
        this.layers$ = new BehaviorSubject([]);
        this.geolocation$ = new BehaviorSubject(undefined);
        this.defaultOptions = {
            controls: { attribution: false }
        };
        this.options = Object.assign({}, this.defaultOptions, options);
        this.layerWatcher = new LayerWatcher();
        this.status$ = this.layerWatcher.status$;
        olproj4.register(proj4);
        this.init();
    }
    Object.defineProperty(IgoMap.prototype, "layers", {
        get: /**
         * @return {?}
         */
        function () {
            return this.layers$.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IgoMap.prototype, "projection", {
        get: /**
         * @return {?}
         */
        function () {
            return this.viewController.getOlProjection().getCode();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    IgoMap.prototype.init = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var controls = [];
        if (this.options.controls) {
            if (this.options.controls.attribution) {
                /** @type {?} */
                var attributionOpt = (/** @type {?} */ ((this.options.controls.attribution === true
                    ? {}
                    : this.options.controls.attribution)));
                controls.push(new olControlAttribution(attributionOpt));
            }
            if (this.options.controls.scaleLine) {
                /** @type {?} */
                var scaleLineOpt = (/** @type {?} */ ((this.options.controls.scaleLine === true
                    ? {}
                    : this.options.controls.scaleLine)));
                controls.push(new olControlScaleLine(scaleLineOpt));
            }
        }
        /** @type {?} */
        var interactions = {};
        if (this.options.interactions === false) {
            interactions = {
                altShiftDragRotate: false,
                doubleClickZoom: false,
                keyboard: false,
                mouseWheelZoom: false,
                shiftDragZoom: false,
                dragPan: false,
                pinchRotate: false,
                pinchZoom: false
            };
        }
        this.ol = new olMap({
            interactions: olinteraction.defaults(interactions),
            controls: controls
        });
        this.setView(this.options.view || {});
        this.viewController = new MapViewController({
            stateHistory: true
        });
        this.viewController.setOlMap(this.ol);
        this.overlay = new Overlay(this);
    };
    /**
     * @param {?} id
     * @return {?}
     */
    IgoMap.prototype.setTarget = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        this.ol.setTarget(id);
        if (id !== undefined) {
            this.layerWatcher.subscribe((/**
             * @return {?}
             */
            function () { }), null);
        }
        else {
            this.layerWatcher.unsubscribe();
        }
    };
    /**
     * @param {?} options
     * @return {?}
     */
    IgoMap.prototype.updateView = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        /** @type {?} */
        var currentView = this.ol.getView();
        /** @type {?} */
        var viewOptions = Object.assign({
            zoom: currentView.getZoom()
        }, currentView.getProperties());
        this.setView(Object.assign(viewOptions, options));
    };
    /**
     * Set the map view
     * @param options Map view options
     */
    /**
     * Set the map view
     * @param {?} options Map view options
     * @return {?}
     */
    IgoMap.prototype.setView = /**
     * Set the map view
     * @param {?} options Map view options
     * @return {?}
     */
    function (options) {
        if (this.viewController !== undefined) {
            this.viewController.clearStateHistory();
        }
        /** @type {?} */
        var view = new olView(options);
        this.ol.setView(view);
        this.unsubscribeGeolocate();
        if (options) {
            if (options.center) {
                /** @type {?} */
                var projection = view.getProjection().getCode();
                /** @type {?} */
                var center = olproj.fromLonLat(options.center, projection);
                view.setCenter(center);
            }
            if (options.geolocate) {
                this.geolocate(true);
            }
        }
    };
    // TODO: Move to ViewController and update every place it's used
    // TODO: Move to ViewController and update every place it's used
    /**
     * @param {?=} projection
     * @return {?}
     */
    IgoMap.prototype.getCenter = 
    // TODO: Move to ViewController and update every place it's used
    /**
     * @param {?=} projection
     * @return {?}
     */
    function (projection) {
        return this.viewController.getCenter();
    };
    // TODO: Move to ViewController and update every place it's used
    // TODO: Move to ViewController and update every place it's used
    /**
     * @param {?=} projection
     * @return {?}
     */
    IgoMap.prototype.getExtent = 
    // TODO: Move to ViewController and update every place it's used
    /**
     * @param {?=} projection
     * @return {?}
     */
    function (projection) {
        return this.viewController.getExtent();
    };
    // TODO: Move to ViewController and update every place it's used
    // TODO: Move to ViewController and update every place it's used
    /**
     * @return {?}
     */
    IgoMap.prototype.getZoom = 
    // TODO: Move to ViewController and update every place it's used
    /**
     * @return {?}
     */
    function () {
        return this.viewController.getZoom();
    };
    /**
     * @param {?} baseLayer
     * @return {?}
     */
    IgoMap.prototype.changeBaseLayer = /**
     * @param {?} baseLayer
     * @return {?}
     */
    function (baseLayer) {
        var e_1, _a;
        if (!baseLayer) {
            return;
        }
        try {
            for (var _b = tslib_1.__values(this.getBaseLayers()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var bl = _c.value;
                bl.visible = false;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        baseLayer.visible = true;
    };
    /**
     * @return {?}
     */
    IgoMap.prototype.getBaseLayers = /**
     * @return {?}
     */
    function () {
        return this.layers.filter((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) { return layer.baseLayer === true; }));
    };
    /**
     * @param {?} id
     * @return {?}
     */
    IgoMap.prototype.getLayerById = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return this.layers.find((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) { return layer.id && layer.id === id; }));
    };
    /**
     * @param {?} alias
     * @return {?}
     */
    IgoMap.prototype.getLayerByAlias = /**
     * @param {?} alias
     * @return {?}
     */
    function (alias) {
        return this.layers.find((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) { return layer.alias && layer.alias === alias; }));
    };
    /**
     * Add a single layer
     * @param layer Layer to add
     * @param push DEPRECATED
     */
    /**
     * Add a single layer
     * @param {?} layer Layer to add
     * @param {?=} push DEPRECATED
     * @return {?}
     */
    IgoMap.prototype.addLayer = /**
     * Add a single layer
     * @param {?} layer Layer to add
     * @param {?=} push DEPRECATED
     * @return {?}
     */
    function (layer, push) {
        if (push === void 0) { push = true; }
        this.addLayers([layer]);
    };
    /**
     * Add many layers
     * @param layers Layers to add
     * @param push DEPRECATED
     */
    /**
     * Add many layers
     * @param {?} layers Layers to add
     * @param {?=} push DEPRECATED
     * @return {?}
     */
    IgoMap.prototype.addLayers = /**
     * Add many layers
     * @param {?} layers Layers to add
     * @param {?=} push DEPRECATED
     * @return {?}
     */
    function (layers, push) {
        var _this = this;
        if (push === void 0) { push = true; }
        /** @type {?} */
        var addedLayers = layers
            .map((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) { return _this.doAddLayer(layer); }))
            .filter((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) { return layer !== undefined; }));
        this.setLayers([].concat(this.layers, addedLayers));
    };
    /**
     * Remove a single layer
     * @param layer Layer to remove
     */
    /**
     * Remove a single layer
     * @param {?} layer Layer to remove
     * @return {?}
     */
    IgoMap.prototype.removeLayer = /**
     * Remove a single layer
     * @param {?} layer Layer to remove
     * @return {?}
     */
    function (layer) {
        this.removeLayers([layer]);
    };
    /**
     * Remove many layers
     * @param layers Layers to remove
     */
    /**
     * Remove many layers
     * @param {?} layers Layers to remove
     * @return {?}
     */
    IgoMap.prototype.removeLayers = /**
     * Remove many layers
     * @param {?} layers Layers to remove
     * @return {?}
     */
    function (layers) {
        var _this = this;
        /** @type {?} */
        var newLayers = this.layers$.value.slice(0);
        /** @type {?} */
        var layersToRemove = [];
        layers.forEach((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) {
            /** @type {?} */
            var index = _this.getLayerIndex(layer);
            if (index >= 0) {
                layersToRemove.push(layer);
                newLayers.splice(index, 1);
            }
        }));
        layersToRemove.forEach((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) { return _this.doRemoveLayer(layer); }));
        this.setLayers(newLayers);
    };
    /**
     * Remove all layers
     */
    /**
     * Remove all layers
     * @return {?}
     */
    IgoMap.prototype.removeAllLayers = /**
     * Remove all layers
     * @return {?}
     */
    function () {
        var _this = this;
        this.layers.forEach((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) { return _this.doRemoveLayer(layer); }));
        this.layers$.next([]);
    };
    /**
     * @param {?} layer
     * @return {?}
     */
    IgoMap.prototype.raiseLayer = /**
     * @param {?} layer
     * @return {?}
     */
    function (layer) {
        /** @type {?} */
        var index = this.getLayerIndex(layer);
        if (index > 0) {
            this.moveLayer(layer, index, index - 1);
        }
    };
    /**
     * @param {?} layer
     * @return {?}
     */
    IgoMap.prototype.lowerLayer = /**
     * @param {?} layer
     * @return {?}
     */
    function (layer) {
        /** @type {?} */
        var index = this.getLayerIndex(layer);
        if (index < this.layers.length - 1) {
            this.moveLayer(layer, index, index + 1);
        }
    };
    /**
     * @param {?} layer
     * @param {?} from
     * @param {?} to
     * @return {?}
     */
    IgoMap.prototype.moveLayer = /**
     * @param {?} layer
     * @param {?} from
     * @param {?} to
     * @return {?}
     */
    function (layer, from, to) {
        /** @type {?} */
        var layerTo = this.layers[to];
        /** @type {?} */
        var zIndexTo = layerTo.zIndex;
        /** @type {?} */
        var zIndexFrom = layer.zIndex;
        layer.zIndex = zIndexTo;
        layerTo.zIndex = zIndexFrom;
        this.layers[to] = layer;
        this.layers[from] = layerTo;
        this.layers$.next(this.layers.slice(0));
    };
    /**
     * Add a layer to the OL map and start watching. If the layer is already
     * added to this map, make it visible but don't add it one again.
     * @param layer Layer
     * @returns The layer added, if any
     */
    /**
     * Add a layer to the OL map and start watching. If the layer is already
     * added to this map, make it visible but don't add it one again.
     * @private
     * @param {?} layer Layer
     * @return {?} The layer added, if any
     */
    IgoMap.prototype.doAddLayer = /**
     * Add a layer to the OL map and start watching. If the layer is already
     * added to this map, make it visible but don't add it one again.
     * @private
     * @param {?} layer Layer
     * @return {?} The layer added, if any
     */
    function (layer) {
        if (layer.baseLayer && layer.visible) {
            this.changeBaseLayer(layer);
        }
        /** @type {?} */
        var existingLayer = this.getLayerById(layer.id);
        if (existingLayer !== undefined) {
            existingLayer.visible = true;
            return;
        }
        if (layer.zIndex === undefined || layer.zIndex === 0) {
            /** @type {?} */
            var offset = layer.baseLayer ? 1 : 10;
            layer.zIndex = this.layers.length + offset;
        }
        layer.setMap(this);
        this.layerWatcher.watchLayer(layer);
        this.ol.addLayer(layer.ol);
        return layer;
    };
    /**
     * Remove a layer from the OL map and stop watching
     * @param layer Layer
     */
    /**
     * Remove a layer from the OL map and stop watching
     * @private
     * @param {?} layer Layer
     * @return {?}
     */
    IgoMap.prototype.doRemoveLayer = /**
     * Remove a layer from the OL map and stop watching
     * @private
     * @param {?} layer Layer
     * @return {?}
     */
    function (layer) {
        this.layerWatcher.unwatchLayer(layer);
        this.ol.removeLayer(layer.ol);
        layer.setMap(undefined);
    };
    /**
     * Update the layers observable
     * @param layers Layers
     */
    /**
     * Update the layers observable
     * @private
     * @param {?} layers Layers
     * @return {?}
     */
    IgoMap.prototype.setLayers = /**
     * Update the layers observable
     * @private
     * @param {?} layers Layers
     * @return {?}
     */
    function (layers) {
        this.layers$.next(this.sortLayersByZIndex(layers).slice(0));
    };
    /**
     * Sort layers by descending zIndex
     * @param layers Array of layers
     * @returns The original array, sorted by zIndex
     */
    /**
     * Sort layers by descending zIndex
     * @private
     * @param {?} layers Array of layers
     * @return {?} The original array, sorted by zIndex
     */
    IgoMap.prototype.sortLayersByZIndex = /**
     * Sort layers by descending zIndex
     * @private
     * @param {?} layers Array of layers
     * @return {?} The original array, sorted by zIndex
     */
    function (layers) {
        // Sort by descending zIndex
        return layers.sort((/**
         * @param {?} layer1
         * @param {?} layer2
         * @return {?}
         */
        function (layer1, layer2) { return layer2.zIndex - layer1.zIndex; }));
    };
    /**
     * Get layer index in the map's inenr array of layers
     * @param layer Layer
     * @returns The layer index
     */
    /**
     * Get layer index in the map's inenr array of layers
     * @private
     * @param {?} layer Layer
     * @return {?} The layer index
     */
    IgoMap.prototype.getLayerIndex = /**
     * Get layer index in the map's inenr array of layers
     * @private
     * @param {?} layer Layer
     * @return {?} The layer index
     */
    function (layer) {
        return this.layers.findIndex((/**
         * @param {?} _layer
         * @return {?}
         */
        function (_layer) { return _layer === layer; }));
    };
    // TODO: Create a GeolocationController with everything below
    // TODO: Create a GeolocationController with everything below
    /**
     * @param {?=} track
     * @return {?}
     */
    IgoMap.prototype.geolocate = 
    // TODO: Create a GeolocationController with everything below
    /**
     * @param {?=} track
     * @return {?}
     */
    function (track) {
        var _this = this;
        if (track === void 0) { track = false; }
        /** @type {?} */
        var first = true;
        if (this.geolocation$$) {
            track = this.geolocation.getTracking();
            this.unsubscribeGeolocate();
        }
        this.startGeolocation();
        this.geolocation$$ = this.geolocation$.subscribe((/**
         * @param {?} geolocation
         * @return {?}
         */
        function (geolocation) {
            if (!geolocation) {
                return;
            }
            /** @type {?} */
            var accuracy = geolocation.getAccuracy();
            if (accuracy < 10000) {
                /** @type {?} */
                var geometry = geolocation.getAccuracyGeometry();
                /** @type {?} */
                var extent = geometry.getExtent();
                if (_this.geolocationFeature &&
                    _this.overlay.dataSource.ol.getFeatureById(_this.geolocationFeature.getId())) {
                    _this.overlay.dataSource.ol.removeFeature(_this.geolocationFeature);
                }
                _this.geolocationFeature = new olFeature({ geometry: geometry });
                _this.geolocationFeature.setId('geolocationFeature');
                _this.overlay.addFeature(_this.geolocationFeature);
                if (first) {
                    _this.viewController.zoomToExtent(extent);
                }
            }
            else if (first) {
                /** @type {?} */
                var view = _this.ol.getView();
                /** @type {?} */
                var coordinates = geolocation.getPosition();
                view.setCenter(coordinates);
                view.setZoom(14);
            }
            if (track) {
                _this.unsubscribeGeolocate();
            }
            first = false;
        }));
    };
    /**
     * @return {?}
     */
    IgoMap.prototype.unsubscribeGeolocate = /**
     * @return {?}
     */
    function () {
        this.stopGeolocation();
        if (this.geolocation$$) {
            this.geolocation$$.unsubscribe();
            this.geolocation$$ = undefined;
        }
    };
    /**
     * @private
     * @return {?}
     */
    IgoMap.prototype.startGeolocation = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.geolocation) {
            this.geolocation = new olGeolocation({
                projection: this.projection,
                tracking: true
            });
            this.geolocation.on('change', (/**
             * @param {?} evt
             * @return {?}
             */
            function (evt) {
                _this.geolocation$.next(_this.geolocation);
            }));
        }
        else {
            this.geolocation.setTracking(true);
        }
    };
    /**
     * @private
     * @return {?}
     */
    IgoMap.prototype.stopGeolocation = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.geolocation) {
            this.geolocation.setTracking(false);
        }
    };
    return IgoMap;
}());
// TODO: This class is messy. Clearly define it's scope and the map browser's.
// Move some stuff into controllers.
export { IgoMap };
if (false) {
    /** @type {?} */
    IgoMap.prototype.ol;
    /** @type {?} */
    IgoMap.prototype.layers$;
    /** @type {?} */
    IgoMap.prototype.status$;
    /** @type {?} */
    IgoMap.prototype.geolocation$;
    /** @type {?} */
    IgoMap.prototype.geolocationFeature;
    /** @type {?} */
    IgoMap.prototype.overlay;
    /** @type {?} */
    IgoMap.prototype.viewController;
    /**
     * @type {?}
     * @private
     */
    IgoMap.prototype.layerWatcher;
    /**
     * @type {?}
     * @private
     */
    IgoMap.prototype.geolocation;
    /**
     * @type {?}
     * @private
     */
    IgoMap.prototype.geolocation$$;
    /**
     * @type {?}
     * @private
     */
    IgoMap.prototype.options;
    /**
     * @type {?}
     * @private
     */
    IgoMap.prototype.defaultOptions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL21hcC9zaGFyZWQvbWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxLQUFLLE1BQU0sUUFBUSxDQUFDO0FBQzNCLE9BQU8sTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUM3QixPQUFPLFNBQVMsTUFBTSxZQUFZLENBQUM7QUFDbkMsT0FBTyxhQUFhLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxvQkFBb0IsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLGtCQUFrQixNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sS0FBSyxNQUFNLE1BQU0sU0FBUyxDQUFDO0FBQ2xDLE9BQU8sS0FBSyxPQUFPLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sS0FBSyxhQUFhLE1BQU0sZ0JBQWdCLENBQUM7QUFFaEQsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQzFCLE9BQU8sRUFBRSxlQUFlLEVBQXlCLE1BQU0sTUFBTSxDQUFDO0FBSzlELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUV2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFRdEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7OztBQUl2RDs7OztJQTBCRSxnQkFBWSxPQUFvQjtRQXhCekIsWUFBTyxHQUFHLElBQUksZUFBZSxDQUFVLEVBQUUsQ0FBQyxDQUFDO1FBRTNDLGlCQUFZLEdBQUcsSUFBSSxlQUFlLENBQWdCLFNBQVMsQ0FBQyxDQUFDO1FBVTVELG1CQUFjLEdBQXdCO1lBQzVDLFFBQVEsRUFBRSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7U0FDakMsQ0FBQztRQVdBLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFB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QUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7U0FDaEM7SUFDSCxDQUFDOzs7OztJQUVPLGlDQUFnQjs7OztJQUF4QjtRQUFBLGlCQWFDO1FBWkMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLGFBQWEsQ0FBQztnQkFDbkMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO2dCQUMzQixRQUFRLEVBQUUsSUFBSTthQUNmLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFFBQVE7Ozs7WUFBRSxVQUFBLEdBQUc7Z0JBQy9CLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMzQyxDQUFDLEVBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwQztJQUNILENBQUM7Ozs7O0lBRU8sZ0NBQWU7Ozs7SUFBdkI7UUFDRSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDckM7SUFDSCxDQUFDO0lBQ0gsYUFBQztBQUFELENBQUMsQUFoWUQsSUFnWUM7Ozs7OztJQS9YQyxvQkFBaUI7O0lBQ2pCLHlCQUFrRDs7SUFDbEQseUJBQXVDOztJQUN2Qyw4QkFBb0U7O0lBQ3BFLG9DQUFxQzs7SUFDckMseUJBQXdCOztJQUN4QixnQ0FBeUM7Ozs7O0lBRXpDLDhCQUFtQzs7Ozs7SUFDbkMsNkJBQW1DOzs7OztJQUNuQywrQkFBb0M7Ozs7O0lBRXBDLHlCQUE0Qjs7Ozs7SUFDNUIsZ0NBRUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwJztcclxuaW1wb3J0IG9sVmlldyBmcm9tICdvbC9WaWV3JztcclxuaW1wb3J0IG9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuaW1wb3J0IG9sR2VvbG9jYXRpb24gZnJvbSAnb2wvR2VvbG9jYXRpb24nO1xyXG5pbXBvcnQgb2xDb250cm9sQXR0cmlidXRpb24gZnJvbSAnb2wvY29udHJvbC9BdHRyaWJ1dGlvbic7XHJcbmltcG9ydCBvbENvbnRyb2xTY2FsZUxpbmUgZnJvbSAnb2wvY29udHJvbC9TY2FsZUxpbmUnO1xyXG5pbXBvcnQgKiBhcyBvbHByb2ogZnJvbSAnb2wvcHJvaic7XHJcbmltcG9ydCAqIGFzIG9scHJvajQgZnJvbSAnb2wvcHJvai9wcm9qNCc7XHJcbmltcG9ydCBPbFByb2plY3Rpb24gZnJvbSAnb2wvcHJvai9Qcm9qZWN0aW9uJztcclxuaW1wb3J0ICogYXMgb2xpbnRlcmFjdGlvbiBmcm9tICdvbC9pbnRlcmFjdGlvbic7XHJcblxyXG5pbXBvcnQgcHJvajQgZnJvbSAncHJvajQnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgU3ViamVjdFN0YXR1cyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycyc7XHJcbmltcG9ydCB7IE92ZXJsYXkgfSBmcm9tICcuLi8uLi9vdmVybGF5L3NoYXJlZC9vdmVybGF5JztcclxuXHJcbmltcG9ydCB7IExheWVyV2F0Y2hlciB9IGZyb20gJy4uL3V0aWxzL2xheWVyLXdhdGNoZXInO1xyXG5pbXBvcnQge1xyXG4gIE1hcFZpZXdPcHRpb25zLFxyXG4gIE1hcE9wdGlvbnMsXHJcbiAgTWFwQXR0cmlidXRpb25PcHRpb25zLFxyXG4gIE1hcFNjYWxlTGluZU9wdGlvbnMsXHJcbiAgTWFwRXh0ZW50XHJcbn0gZnJvbSAnLi9tYXAuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgTWFwVmlld0NvbnRyb2xsZXIgfSBmcm9tICcuL2NvbnRyb2xsZXJzL3ZpZXcnO1xyXG5cclxuLy8gVE9ETzogVGhpcyBjbGFzcyBpcyBtZXNzeS4gQ2xlYXJseSBkZWZpbmUgaXQncyBzY29wZSBhbmQgdGhlIG1hcCBicm93c2VyJ3MuXHJcbi8vIE1vdmUgc29tZSBzdHVmZiBpbnRvIGNvbnRyb2xsZXJzLlxyXG5leHBvcnQgY2xhc3MgSWdvTWFwIHtcclxuICBwdWJsaWMgb2w6IG9sTWFwO1xyXG4gIHB1YmxpYyBsYXllcnMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxMYXllcltdPihbXSk7XHJcbiAgcHVibGljIHN0YXR1cyQ6IFN1YmplY3Q8U3ViamVjdFN0YXR1cz47XHJcbiAgcHVibGljIGdlb2xvY2F0aW9uJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8b2xHZW9sb2NhdGlvbj4odW5kZWZpbmVkKTtcclxuICBwdWJsaWMgZ2VvbG9jYXRpb25GZWF0dXJlOiBvbEZlYXR1cmU7XHJcbiAgcHVibGljIG92ZXJsYXk6IE92ZXJsYXk7XHJcbiAgcHVibGljIHZpZXdDb250cm9sbGVyOiBNYXBWaWV3Q29udHJvbGxlcjtcclxuXHJcbiAgcHJpdmF0ZSBsYXllcldhdGNoZXI6IExheWVyV2F0Y2hlcjtcclxuICBwcml2YXRlIGdlb2xvY2F0aW9uOiBvbEdlb2xvY2F0aW9uO1xyXG4gIHByaXZhdGUgZ2VvbG9jYXRpb24kJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBwcml2YXRlIG9wdGlvbnM6IE1hcE9wdGlvbnM7XHJcbiAgcHJpdmF0ZSBkZWZhdWx0T3B0aW9uczogUGFydGlhbDxNYXBPcHRpb25zPiA9IHtcclxuICAgIGNvbnRyb2xzOiB7IGF0dHJpYnV0aW9uOiBmYWxzZSB9XHJcbiAgfTtcclxuXHJcbiAgZ2V0IGxheWVycygpOiBMYXllcltdIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVycyQudmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXQgcHJvamVjdGlvbigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMudmlld0NvbnRyb2xsZXIuZ2V0T2xQcm9qZWN0aW9uKCkuZ2V0Q29kZSgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucz86IE1hcE9wdGlvbnMpIHtcclxuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgdGhpcy5sYXllcldhdGNoZXIgPSBuZXcgTGF5ZXJXYXRjaGVyKCk7XHJcbiAgICB0aGlzLnN0YXR1cyQgPSB0aGlzLmxheWVyV2F0Y2hlci5zdGF0dXMkO1xyXG4gICAgb2xwcm9qNC5yZWdpc3Rlcihwcm9qNCk7XHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIGluaXQoKSB7XHJcbiAgICBjb25zdCBjb250cm9scyA9IFtdO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb250cm9scykge1xyXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRyb2xzLmF0dHJpYnV0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgYXR0cmlidXRpb25PcHQgPSAodGhpcy5vcHRpb25zLmNvbnRyb2xzLmF0dHJpYnV0aW9uID09PSB0cnVlXHJcbiAgICAgICAgICA/IHt9XHJcbiAgICAgICAgICA6IHRoaXMub3B0aW9ucy5jb250cm9scy5hdHRyaWJ1dGlvbikgYXMgTWFwQXR0cmlidXRpb25PcHRpb25zO1xyXG4gICAgICAgIGNvbnRyb2xzLnB1c2gobmV3IG9sQ29udHJvbEF0dHJpYnV0aW9uKGF0dHJpYnV0aW9uT3B0KSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5jb250cm9scy5zY2FsZUxpbmUpIHtcclxuICAgICAgICBjb25zdCBzY2FsZUxpbmVPcHQgPSAodGhpcy5vcHRpb25zLmNvbnRyb2xzLnNjYWxlTGluZSA9PT0gdHJ1ZVxyXG4gICAgICAgICAgPyB7fVxyXG4gICAgICAgICAgOiB0aGlzLm9wdGlvbnMuY29udHJvbHMuc2NhbGVMaW5lKSBhcyBNYXBTY2FsZUxpbmVPcHRpb25zO1xyXG4gICAgICAgIGNvbnRyb2xzLnB1c2gobmV3IG9sQ29udHJvbFNjYWxlTGluZShzY2FsZUxpbmVPcHQpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGV0IGludGVyYWN0aW9ucyA9IHt9O1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5pbnRlcmFjdGlvbnMgPT09IGZhbHNlKSB7XHJcbiAgICAgIGludGVyYWN0aW9ucyA9IHtcclxuICAgICAgICBhbHRTaGlmdERyYWdSb3RhdGU6IGZhbHNlLFxyXG4gICAgICAgIGRvdWJsZUNsaWNrWm9vbTogZmFsc2UsXHJcbiAgICAgICAga2V5Ym9hcmQ6IGZhbHNlLFxyXG4gICAgICAgIG1vdXNlV2hlZWxab29tOiBmYWxzZSxcclxuICAgICAgICBzaGlmdERyYWdab29tOiBmYWxzZSxcclxuICAgICAgICBkcmFnUGFuOiBmYWxzZSxcclxuICAgICAgICBwaW5jaFJvdGF0ZTogZmFsc2UsXHJcbiAgICAgICAgcGluY2hab29tOiBmYWxzZVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub2wgPSBuZXcgb2xNYXAoe1xyXG4gICAgICBpbnRlcmFjdGlvbnM6IG9saW50ZXJhY3Rpb24uZGVmYXVsdHMoaW50ZXJhY3Rpb25zKSxcclxuICAgICAgY29udHJvbHNcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuc2V0Vmlldyh0aGlzLm9wdGlvbnMudmlldyB8fCB7fSk7XHJcbiAgICB0aGlzLnZpZXdDb250cm9sbGVyID0gbmV3IE1hcFZpZXdDb250cm9sbGVyKHtcclxuICAgICAgc3RhdGVIaXN0b3J5OiB0cnVlXHJcbiAgICB9KTtcclxuICAgIHRoaXMudmlld0NvbnRyb2xsZXIuc2V0T2xNYXAodGhpcy5vbCk7XHJcbiAgICB0aGlzLm92ZXJsYXkgPSBuZXcgT3ZlcmxheSh0aGlzKTtcclxuICB9XHJcblxyXG4gIHNldFRhcmdldChpZDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLm9sLnNldFRhcmdldChpZCk7XHJcbiAgICBpZiAoaWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmxheWVyV2F0Y2hlci5zdWJzY3JpYmUoKCkgPT4ge30sIG51bGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5sYXllcldhdGNoZXIudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZVZpZXcob3B0aW9uczogTWFwVmlld09wdGlvbnMpIHtcclxuICAgIGNvbnN0IGN1cnJlbnRWaWV3ID0gdGhpcy5vbC5nZXRWaWV3KCk7XHJcbiAgICBjb25zdCB2aWV3T3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgIHtcclxuICAgICAgICB6b29tOiBjdXJyZW50Vmlldy5nZXRab29tKClcclxuICAgICAgfSxcclxuICAgICAgY3VycmVudFZpZXcuZ2V0UHJvcGVydGllcygpXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuc2V0VmlldyhPYmplY3QuYXNzaWduKHZpZXdPcHRpb25zLCBvcHRpb25zKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIG1hcCB2aWV3XHJcbiAgICogQHBhcmFtIG9wdGlvbnMgTWFwIHZpZXcgb3B0aW9uc1xyXG4gICAqL1xyXG4gIHNldFZpZXcob3B0aW9uczogTWFwVmlld09wdGlvbnMpIHtcclxuICAgIGlmICh0aGlzLnZpZXdDb250cm9sbGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy52aWV3Q29udHJvbGxlci5jbGVhclN0YXRlSGlzdG9yeSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHZpZXcgPSBuZXcgb2xWaWV3KG9wdGlvbnMpO1xyXG4gICAgdGhpcy5vbC5zZXRWaWV3KHZpZXcpO1xyXG5cclxuICAgIHRoaXMudW5zdWJzY3JpYmVHZW9sb2NhdGUoKTtcclxuICAgIGlmIChvcHRpb25zKSB7XHJcbiAgICAgIGlmIChvcHRpb25zLmNlbnRlcikge1xyXG4gICAgICAgIGNvbnN0IHByb2plY3Rpb24gPSB2aWV3LmdldFByb2plY3Rpb24oKS5nZXRDb2RlKCk7XHJcbiAgICAgICAgY29uc3QgY2VudGVyID0gb2xwcm9qLmZyb21Mb25MYXQob3B0aW9ucy5jZW50ZXIsIHByb2plY3Rpb24pO1xyXG4gICAgICAgIHZpZXcuc2V0Q2VudGVyKGNlbnRlcik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChvcHRpb25zLmdlb2xvY2F0ZSkge1xyXG4gICAgICAgIHRoaXMuZ2VvbG9jYXRlKHRydWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBUT0RPOiBNb3ZlIHRvIFZpZXdDb250cm9sbGVyIGFuZCB1cGRhdGUgZXZlcnkgcGxhY2UgaXQncyB1c2VkXHJcbiAgZ2V0Q2VudGVyKHByb2plY3Rpb24/OiBzdHJpbmcgfCBPbFByb2plY3Rpb24pOiBbbnVtYmVyLCBudW1iZXJdIHtcclxuICAgIHJldHVybiB0aGlzLnZpZXdDb250cm9sbGVyLmdldENlbnRlcigpO1xyXG4gIH1cclxuXHJcbiAgLy8gVE9ETzogTW92ZSB0byBWaWV3Q29udHJvbGxlciBhbmQgdXBkYXRlIGV2ZXJ5IHBsYWNlIGl0J3MgdXNlZFxyXG4gIGdldEV4dGVudChwcm9qZWN0aW9uPzogc3RyaW5nIHwgT2xQcm9qZWN0aW9uKTogTWFwRXh0ZW50IHtcclxuICAgIHJldHVybiB0aGlzLnZpZXdDb250cm9sbGVyLmdldEV4dGVudCgpO1xyXG4gIH1cclxuXHJcbiAgLy8gVE9ETzogTW92ZSB0byBWaWV3Q29udHJvbGxlciBhbmQgdXBkYXRlIGV2ZXJ5IHBsYWNlIGl0J3MgdXNlZFxyXG4gIGdldFpvb20oKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLnZpZXdDb250cm9sbGVyLmdldFpvb20oKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZUJhc2VMYXllcihiYXNlTGF5ZXI6IExheWVyKSB7XHJcbiAgICBpZiAoIWJhc2VMYXllcikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBibCBvZiB0aGlzLmdldEJhc2VMYXllcnMoKSkge1xyXG4gICAgICBibC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgYmFzZUxheWVyLnZpc2libGUgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgZ2V0QmFzZUxheWVycygpOiBMYXllcltdIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVycy5maWx0ZXIoKGxheWVyOiBMYXllcikgPT4gbGF5ZXIuYmFzZUxheWVyID09PSB0cnVlKTtcclxuICB9XHJcblxyXG4gIGdldExheWVyQnlJZChpZDogc3RyaW5nKTogTGF5ZXIge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJzLmZpbmQoKGxheWVyOiBMYXllcikgPT4gbGF5ZXIuaWQgJiYgbGF5ZXIuaWQgPT09IGlkKTtcclxuICB9XHJcblxyXG4gIGdldExheWVyQnlBbGlhcyhhbGlhczogc3RyaW5nKTogTGF5ZXIge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJzLmZpbmQoKGxheWVyOiBMYXllcikgPT4gbGF5ZXIuYWxpYXMgJiYgbGF5ZXIuYWxpYXMgPT09IGFsaWFzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhIHNpbmdsZSBsYXllclxyXG4gICAqIEBwYXJhbSBsYXllciBMYXllciB0byBhZGRcclxuICAgKiBAcGFyYW0gcHVzaCBERVBSRUNBVEVEXHJcbiAgICovXHJcbiAgYWRkTGF5ZXIobGF5ZXI6IExheWVyLCBwdXNoID0gdHJ1ZSkge1xyXG4gICAgdGhpcy5hZGRMYXllcnMoW2xheWVyXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgbWFueSBsYXllcnNcclxuICAgKiBAcGFyYW0gbGF5ZXJzIExheWVycyB0byBhZGRcclxuICAgKiBAcGFyYW0gcHVzaCBERVBSRUNBVEVEXHJcbiAgICovXHJcbiAgYWRkTGF5ZXJzKGxheWVyczogTGF5ZXJbXSwgcHVzaCA9IHRydWUpIHtcclxuICAgIGNvbnN0IGFkZGVkTGF5ZXJzID0gbGF5ZXJzXHJcbiAgICAgIC5tYXAoKGxheWVyOiBMYXllcikgPT4gdGhpcy5kb0FkZExheWVyKGxheWVyKSlcclxuICAgICAgLmZpbHRlcigobGF5ZXI6IExheWVyIHwgdW5kZWZpbmVkKSA9PiBsYXllciAhPT0gdW5kZWZpbmVkKTtcclxuICAgIHRoaXMuc2V0TGF5ZXJzKFtdLmNvbmNhdCh0aGlzLmxheWVycywgYWRkZWRMYXllcnMpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBhIHNpbmdsZSBsYXllclxyXG4gICAqIEBwYXJhbSBsYXllciBMYXllciB0byByZW1vdmVcclxuICAgKi9cclxuICByZW1vdmVMYXllcihsYXllcjogTGF5ZXIpIHtcclxuICAgIHRoaXMucmVtb3ZlTGF5ZXJzKFtsYXllcl0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIG1hbnkgbGF5ZXJzXHJcbiAgICogQHBhcmFtIGxheWVycyBMYXllcnMgdG8gcmVtb3ZlXHJcbiAgICovXHJcbiAgcmVtb3ZlTGF5ZXJzKGxheWVyczogTGF5ZXJbXSkge1xyXG4gICAgY29uc3QgbmV3TGF5ZXJzID0gdGhpcy5sYXllcnMkLnZhbHVlLnNsaWNlKDApO1xyXG4gICAgY29uc3QgbGF5ZXJzVG9SZW1vdmUgPSBbXTtcclxuICAgIGxheWVycy5mb3JFYWNoKChsYXllcjogTGF5ZXIpID0+IHtcclxuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmdldExheWVySW5kZXgobGF5ZXIpO1xyXG4gICAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgIGxheWVyc1RvUmVtb3ZlLnB1c2gobGF5ZXIpO1xyXG4gICAgICAgIG5ld0xheWVycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBsYXllcnNUb1JlbW92ZS5mb3JFYWNoKChsYXllcjogTGF5ZXIpID0+IHRoaXMuZG9SZW1vdmVMYXllcihsYXllcikpO1xyXG4gICAgdGhpcy5zZXRMYXllcnMobmV3TGF5ZXJzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBhbGwgbGF5ZXJzXHJcbiAgICovXHJcbiAgcmVtb3ZlQWxsTGF5ZXJzKCkge1xyXG4gICAgdGhpcy5sYXllcnMuZm9yRWFjaCgobGF5ZXI6IExheWVyKSA9PiB0aGlzLmRvUmVtb3ZlTGF5ZXIobGF5ZXIpKTtcclxuICAgIHRoaXMubGF5ZXJzJC5uZXh0KFtdKTtcclxuICB9XHJcblxyXG4gIHJhaXNlTGF5ZXIobGF5ZXI6IExheWVyKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0TGF5ZXJJbmRleChsYXllcik7XHJcbiAgICBpZiAoaW5kZXggPiAwKSB7XHJcbiAgICAgIHRoaXMubW92ZUxheWVyKGxheWVyLCBpbmRleCwgaW5kZXggLSAxKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxvd2VyTGF5ZXIobGF5ZXI6IExheWVyKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0TGF5ZXJJbmRleChsYXllcik7XHJcbiAgICBpZiAoaW5kZXggPCB0aGlzLmxheWVycy5sZW5ndGggLSAxKSB7XHJcbiAgICAgIHRoaXMubW92ZUxheWVyKGxheWVyLCBpbmRleCwgaW5kZXggKyAxKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG1vdmVMYXllcihsYXllcjogTGF5ZXIsIGZyb206IG51bWJlciwgdG86IG51bWJlcikge1xyXG4gICAgY29uc3QgbGF5ZXJUbyA9IHRoaXMubGF5ZXJzW3RvXTtcclxuICAgIGNvbnN0IHpJbmRleFRvID0gbGF5ZXJUby56SW5kZXg7XHJcbiAgICBjb25zdCB6SW5kZXhGcm9tID0gbGF5ZXIuekluZGV4O1xyXG5cclxuICAgIGxheWVyLnpJbmRleCA9IHpJbmRleFRvO1xyXG4gICAgbGF5ZXJUby56SW5kZXggPSB6SW5kZXhGcm9tO1xyXG5cclxuICAgIHRoaXMubGF5ZXJzW3RvXSA9IGxheWVyO1xyXG4gICAgdGhpcy5sYXllcnNbZnJvbV0gPSBsYXllclRvO1xyXG4gICAgdGhpcy5sYXllcnMkLm5leHQodGhpcy5sYXllcnMuc2xpY2UoMCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGEgbGF5ZXIgdG8gdGhlIE9MIG1hcCBhbmQgc3RhcnQgd2F0Y2hpbmcuIElmIHRoZSBsYXllciBpcyBhbHJlYWR5XHJcbiAgICogYWRkZWQgdG8gdGhpcyBtYXAsIG1ha2UgaXQgdmlzaWJsZSBidXQgZG9uJ3QgYWRkIGl0IG9uZSBhZ2Fpbi5cclxuICAgKiBAcGFyYW0gbGF5ZXIgTGF5ZXJcclxuICAgKiBAcmV0dXJucyBUaGUgbGF5ZXIgYWRkZWQsIGlmIGFueVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZG9BZGRMYXllcihsYXllcjogTGF5ZXIpIHtcclxuICAgIGlmIChsYXllci5iYXNlTGF5ZXIgJiYgbGF5ZXIudmlzaWJsZSkge1xyXG4gICAgICB0aGlzLmNoYW5nZUJhc2VMYXllcihsYXllcik7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZXhpc3RpbmdMYXllciA9IHRoaXMuZ2V0TGF5ZXJCeUlkKGxheWVyLmlkKTtcclxuICAgIGlmIChleGlzdGluZ0xheWVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgZXhpc3RpbmdMYXllci52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChsYXllci56SW5kZXggPT09IHVuZGVmaW5lZCB8fCBsYXllci56SW5kZXggPT09IDApIHtcclxuICAgICAgY29uc3Qgb2Zmc2V0ID0gbGF5ZXIuYmFzZUxheWVyID8gMSA6IDEwO1xyXG4gICAgICBsYXllci56SW5kZXggPSB0aGlzLmxheWVycy5sZW5ndGggKyBvZmZzZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgbGF5ZXIuc2V0TWFwKHRoaXMpO1xyXG4gICAgdGhpcy5sYXllcldhdGNoZXIud2F0Y2hMYXllcihsYXllcik7XHJcbiAgICB0aGlzLm9sLmFkZExheWVyKGxheWVyLm9sKTtcclxuXHJcbiAgICByZXR1cm4gbGF5ZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgYSBsYXllciBmcm9tIHRoZSBPTCBtYXAgYW5kIHN0b3Agd2F0Y2hpbmdcclxuICAgKiBAcGFyYW0gbGF5ZXIgTGF5ZXJcclxuICAgKi9cclxuICBwcml2YXRlIGRvUmVtb3ZlTGF5ZXIobGF5ZXI6IExheWVyKSB7XHJcbiAgICB0aGlzLmxheWVyV2F0Y2hlci51bndhdGNoTGF5ZXIobGF5ZXIpO1xyXG4gICAgdGhpcy5vbC5yZW1vdmVMYXllcihsYXllci5vbCk7XHJcbiAgICBsYXllci5zZXRNYXAodW5kZWZpbmVkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSB0aGUgbGF5ZXJzIG9ic2VydmFibGVcclxuICAgKiBAcGFyYW0gbGF5ZXJzIExheWVyc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgc2V0TGF5ZXJzKGxheWVyczogTGF5ZXJbXSkge1xyXG4gICAgdGhpcy5sYXllcnMkLm5leHQodGhpcy5zb3J0TGF5ZXJzQnlaSW5kZXgobGF5ZXJzKS5zbGljZSgwKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTb3J0IGxheWVycyBieSBkZXNjZW5kaW5nIHpJbmRleFxyXG4gICAqIEBwYXJhbSBsYXllcnMgQXJyYXkgb2YgbGF5ZXJzXHJcbiAgICogQHJldHVybnMgVGhlIG9yaWdpbmFsIGFycmF5LCBzb3J0ZWQgYnkgekluZGV4XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzb3J0TGF5ZXJzQnlaSW5kZXgobGF5ZXJzOiBMYXllcltdKSB7XHJcbiAgICAvLyBTb3J0IGJ5IGRlc2NlbmRpbmcgekluZGV4XHJcbiAgICByZXR1cm4gbGF5ZXJzLnNvcnQoKGxheWVyMTogTGF5ZXIsIGxheWVyMjogTGF5ZXIpID0+IGxheWVyMi56SW5kZXggLSBsYXllcjEuekluZGV4KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBsYXllciBpbmRleCBpbiB0aGUgbWFwJ3MgaW5lbnIgYXJyYXkgb2YgbGF5ZXJzXHJcbiAgICogQHBhcmFtIGxheWVyIExheWVyXHJcbiAgICogQHJldHVybnMgVGhlIGxheWVyIGluZGV4XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRMYXllckluZGV4KGxheWVyOiBMYXllcikge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJzLmZpbmRJbmRleCgoX2xheWVyOiBMYXllcikgPT4gX2xheWVyID09PSBsYXllcik7XHJcbiAgfVxyXG5cclxuICAvLyBUT0RPOiBDcmVhdGUgYSBHZW9sb2NhdGlvbkNvbnRyb2xsZXIgd2l0aCBldmVyeXRoaW5nIGJlbG93XHJcbiAgZ2VvbG9jYXRlKHRyYWNrID0gZmFsc2UpIHtcclxuICAgIGxldCBmaXJzdCA9IHRydWU7XHJcbiAgICBpZiAodGhpcy5nZW9sb2NhdGlvbiQkKSB7XHJcbiAgICAgIHRyYWNrID0gdGhpcy5nZW9sb2NhdGlvbi5nZXRUcmFja2luZygpO1xyXG4gICAgICB0aGlzLnVuc3Vic2NyaWJlR2VvbG9jYXRlKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0YXJ0R2VvbG9jYXRpb24oKTtcclxuXHJcbiAgICB0aGlzLmdlb2xvY2F0aW9uJCQgPSB0aGlzLmdlb2xvY2F0aW9uJC5zdWJzY3JpYmUoZ2VvbG9jYXRpb24gPT4ge1xyXG4gICAgICBpZiAoIWdlb2xvY2F0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGFjY3VyYWN5ID0gZ2VvbG9jYXRpb24uZ2V0QWNjdXJhY3koKTtcclxuICAgICAgaWYgKGFjY3VyYWN5IDwgMTAwMDApIHtcclxuICAgICAgICBjb25zdCBnZW9tZXRyeSA9IGdlb2xvY2F0aW9uLmdldEFjY3VyYWN5R2VvbWV0cnkoKTtcclxuICAgICAgICBjb25zdCBleHRlbnQgPSBnZW9tZXRyeS5nZXRFeHRlbnQoKTtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB0aGlzLmdlb2xvY2F0aW9uRmVhdHVyZSAmJlxyXG4gICAgICAgICAgdGhpcy5vdmVybGF5LmRhdGFTb3VyY2Uub2wuZ2V0RmVhdHVyZUJ5SWQoXHJcbiAgICAgICAgICAgIHRoaXMuZ2VvbG9jYXRpb25GZWF0dXJlLmdldElkKClcclxuICAgICAgICAgIClcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHRoaXMub3ZlcmxheS5kYXRhU291cmNlLm9sLnJlbW92ZUZlYXR1cmUodGhpcy5nZW9sb2NhdGlvbkZlYXR1cmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdlb2xvY2F0aW9uRmVhdHVyZSA9IG5ldyBvbEZlYXR1cmUoeyBnZW9tZXRyeSB9KTtcclxuICAgICAgICB0aGlzLmdlb2xvY2F0aW9uRmVhdHVyZS5zZXRJZCgnZ2VvbG9jYXRpb25GZWF0dXJlJyk7XHJcbiAgICAgICAgdGhpcy5vdmVybGF5LmFkZEZlYXR1cmUodGhpcy5nZW9sb2NhdGlvbkZlYXR1cmUpO1xyXG4gICAgICAgIGlmIChmaXJzdCkge1xyXG4gICAgICAgICAgdGhpcy52aWV3Q29udHJvbGxlci56b29tVG9FeHRlbnQoZXh0ZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAoZmlyc3QpIHtcclxuICAgICAgICBjb25zdCB2aWV3ID0gdGhpcy5vbC5nZXRWaWV3KCk7XHJcbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBnZW9sb2NhdGlvbi5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIHZpZXcuc2V0Q2VudGVyKGNvb3JkaW5hdGVzKTtcclxuICAgICAgICB2aWV3LnNldFpvb20oMTQpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0cmFjaykge1xyXG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmVHZW9sb2NhdGUoKTtcclxuICAgICAgfVxyXG4gICAgICBmaXJzdCA9IGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB1bnN1YnNjcmliZUdlb2xvY2F0ZSgpIHtcclxuICAgIHRoaXMuc3RvcEdlb2xvY2F0aW9uKCk7XHJcbiAgICBpZiAodGhpcy5nZW9sb2NhdGlvbiQkKSB7XHJcbiAgICAgIHRoaXMuZ2VvbG9jYXRpb24kJC51bnN1YnNjcmliZSgpO1xyXG4gICAgICB0aGlzLmdlb2xvY2F0aW9uJCQgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXJ0R2VvbG9jYXRpb24oKSB7XHJcbiAgICBpZiAoIXRoaXMuZ2VvbG9jYXRpb24pIHtcclxuICAgICAgdGhpcy5nZW9sb2NhdGlvbiA9IG5ldyBvbEdlb2xvY2F0aW9uKHtcclxuICAgICAgICBwcm9qZWN0aW9uOiB0aGlzLnByb2plY3Rpb24sXHJcbiAgICAgICAgdHJhY2tpbmc6IHRydWVcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLmdlb2xvY2F0aW9uLm9uKCdjaGFuZ2UnLCBldnQgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2VvbG9jYXRpb24kLm5leHQodGhpcy5nZW9sb2NhdGlvbik7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5nZW9sb2NhdGlvbi5zZXRUcmFja2luZyh0cnVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RvcEdlb2xvY2F0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMuZ2VvbG9jYXRpb24pIHtcclxuICAgICAgdGhpcy5nZW9sb2NhdGlvbi5zZXRUcmFja2luZyhmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==