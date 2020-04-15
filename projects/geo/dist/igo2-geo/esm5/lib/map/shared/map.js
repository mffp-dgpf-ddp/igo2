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
import olCircle from 'ol/geom/Circle';
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
        this.offlineButtonToggle$ = new BehaviorSubject(false);
        this.offlineButtonState = false;
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
        this.buffer = new Overlay(this);
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
        if (options.maxZoomOnExtent) {
            this.viewController.maxZoomOnExtent = options.maxZoomOnExtent;
        }
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
    /**
     * Deprecated
     * TODO: Move to ViewController and update every place it's used
     */
    /**
     * Deprecated
     * TODO: Move to ViewController and update every place it's used
     * @param {?=} projection
     * @return {?}
     */
    IgoMap.prototype.getCenter = /**
     * Deprecated
     * TODO: Move to ViewController and update every place it's used
     * @param {?=} projection
     * @return {?}
     */
    function (projection) {
        return this.viewController.getCenter(projection);
    };
    /**
     * Deprecated
     * TODO: Move to ViewController and update every place it's used
     */
    /**
     * Deprecated
     * TODO: Move to ViewController and update every place it's used
     * @param {?=} projection
     * @return {?}
     */
    IgoMap.prototype.getExtent = /**
     * Deprecated
     * TODO: Move to ViewController and update every place it's used
     * @param {?=} projection
     * @return {?}
     */
    function (projection) {
        return this.viewController.getExtent(projection);
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
        this.viewController.olView.setMinZoom(baseLayer.dataSource.options.minZoom || (this.options.view || {}).minZoom);
        this.viewController.olView.setMaxZoom(baseLayer.dataSource.options.maxZoom || (this.options.view || {}).maxZoom);
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
        var incrementArray = 0;
        /** @type {?} */
        var addedLayers = layers
            .map((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) { return _this.doAddLayer(layer, incrementArray++); }))
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
        if (layerTo.baseLayer) {
            return;
        }
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
     * @param {?} length
     * @return {?} The layer added, if any
     */
    IgoMap.prototype.doAddLayer = /**
     * Add a layer to the OL map and start watching. If the layer is already
     * added to this map, make it visible but don't add it one again.
     * @private
     * @param {?} layer Layer
     * @param {?} length
     * @return {?} The layer added, if any
     */
    function (layer, length) {
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
            layer.zIndex = this.layers.length + offset + length;
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
                if (_this.bufferFeature) {
                    _this.buffer.dataSource.ol.removeFeature(_this.bufferFeature);
                }
                _this.geolocationFeature = new olFeature({ geometry: geometry });
                _this.geolocationFeature.setId('geolocationFeature');
                _this.overlay.addOlFeature(_this.geolocationFeature);
                if (_this.ol.getView().options_.buffer) {
                    /** @type {?} */
                    var bufferRadius = _this.ol.getView().options_.buffer.bufferRadius;
                    /** @type {?} */
                    var coordinates = geolocation.getPosition();
                    _this.bufferGeom = new olCircle(coordinates, bufferRadius);
                    /** @type {?} */
                    var bufferStroke = _this.ol.getView().options_.buffer.bufferStroke;
                    /** @type {?} */
                    var bufferFill = _this.ol.getView().options_.buffer.bufferFill;
                    /** @type {?} */
                    var bufferText = void 0;
                    if (_this.ol.getView().options_.buffer.showBufferRadius) {
                        bufferText = bufferRadius.toString() + 'm';
                    }
                    else {
                        bufferText = '';
                    }
                    _this.bufferFeature = new olFeature(_this.bufferGeom);
                    _this.bufferFeature.setId('bufferFeature');
                    _this.bufferFeature.set('bufferStroke', bufferStroke);
                    _this.bufferFeature.set('bufferFill', bufferFill);
                    _this.bufferFeature.set('bufferText', bufferText);
                    _this.buffer.addOlFeature(_this.bufferFeature);
                }
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
                trackingOptions: {
                    enableHighAccuracy: true
                },
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
    /**
     * @param {?} offline
     * @return {?}
     */
    IgoMap.prototype.onOfflineToggle = /**
     * @param {?} offline
     * @return {?}
     */
    function (offline) {
        this.offlineButtonToggle$.next(offline);
        this.offlineButtonState = offline;
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
    IgoMap.prototype.offlineButtonToggle$;
    /** @type {?} */
    IgoMap.prototype.offlineButtonState;
    /** @type {?} */
    IgoMap.prototype.layers$;
    /** @type {?} */
    IgoMap.prototype.status$;
    /** @type {?} */
    IgoMap.prototype.geolocation$;
    /** @type {?} */
    IgoMap.prototype.geolocationFeature;
    /** @type {?} */
    IgoMap.prototype.bufferGeom;
    /** @type {?} */
    IgoMap.prototype.bufferFeature;
    /** @type {?} */
    IgoMap.prototype.buffer;
    /** @type {?} */
    IgoMap.prototype.overlay;
    /** @type {?} */
    IgoMap.prototype.viewController;
    /** @type {?} */
    IgoMap.prototype.bufferDataSource;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL21hcC9zaGFyZWQvbWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxLQUFLLE1BQU0sUUFBUSxDQUFDO0FBQzNCLE9BQU8sTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUM3QixPQUFPLFNBQVMsTUFBTSxZQUFZLENBQUM7QUFDbkMsT0FBTyxhQUFhLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxvQkFBb0IsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLGtCQUFrQixNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sS0FBSyxNQUFNLE1BQU0sU0FBUyxDQUFDO0FBQ2xDLE9BQU8sS0FBSyxPQUFPLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sS0FBSyxhQUFhLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxRQUFRLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEMsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQzFCLE9BQU8sRUFBRSxlQUFlLEVBQXlCLE1BQU0sTUFBTSxDQUFDO0FBSzlELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUV2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFRdEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7OztBQUt2RDs7OztJQWlDRSxnQkFBWSxPQUFvQjtRQS9CekIseUJBQW9CLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7UUFDM0QsdUJBQWtCLEdBQVksS0FBSyxDQUFDO1FBQ3BDLFlBQU8sR0FBRyxJQUFJLGVBQWUsQ0FBVSxFQUFFLENBQUMsQ0FBQztRQUUzQyxpQkFBWSxHQUFHLElBQUksZUFBZSxDQUFnQixTQUFTLENBQUMsQ0FBQztRQWU1RCxtQkFBYyxHQUF3QjtZQUM1QyxRQUFRLEVBQUUs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SUFDdkIseUJBQXdCOztJQUN4QixnQ0FBeUM7O0lBRXpDLGtDQUEyQzs7Ozs7SUFFM0MsOEJBQW1DOzs7OztJQUNuQyw2QkFBbUM7Ozs7O0lBQ25DLCtCQUFvQzs7Ozs7SUFFcEMseUJBQTRCOzs7OztJQUM1QixnQ0FFRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvbE1hcCBmcm9tICdvbC9NYXAnO1xyXG5pbXBvcnQgb2xWaWV3IGZyb20gJ29sL1ZpZXcnO1xyXG5pbXBvcnQgb2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5pbXBvcnQgb2xHZW9sb2NhdGlvbiBmcm9tICdvbC9HZW9sb2NhdGlvbic7XHJcbmltcG9ydCBvbENvbnRyb2xBdHRyaWJ1dGlvbiBmcm9tICdvbC9jb250cm9sL0F0dHJpYnV0aW9uJztcclxuaW1wb3J0IG9sQ29udHJvbFNjYWxlTGluZSBmcm9tICdvbC9jb250cm9sL1NjYWxlTGluZSc7XHJcbmltcG9ydCAqIGFzIG9scHJvaiBmcm9tICdvbC9wcm9qJztcclxuaW1wb3J0ICogYXMgb2xwcm9qNCBmcm9tICdvbC9wcm9qL3Byb2o0JztcclxuaW1wb3J0IE9sUHJvamVjdGlvbiBmcm9tICdvbC9wcm9qL1Byb2plY3Rpb24nO1xyXG5pbXBvcnQgKiBhcyBvbGludGVyYWN0aW9uIGZyb20gJ29sL2ludGVyYWN0aW9uJztcclxuaW1wb3J0IG9sQ2lyY2xlIGZyb20gJ29sL2dlb20vQ2lyY2xlJztcclxuXHJcbmltcG9ydCBwcm9qNCBmcm9tICdwcm9qNCc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBTdWJqZWN0U3RhdHVzIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzJztcclxuaW1wb3J0IHsgT3ZlcmxheSB9IGZyb20gJy4uLy4uL292ZXJsYXkvc2hhcmVkL292ZXJsYXknO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXJXYXRjaGVyIH0gZnJvbSAnLi4vdXRpbHMvbGF5ZXItd2F0Y2hlcic7XHJcbmltcG9ydCB7XHJcbiAgTWFwVmlld09wdGlvbnMsXHJcbiAgTWFwT3B0aW9ucyxcclxuICBNYXBBdHRyaWJ1dGlvbk9wdGlvbnMsXHJcbiAgTWFwU2NhbGVMaW5lT3B0aW9ucyxcclxuICBNYXBFeHRlbnRcclxufSBmcm9tICcuL21hcC5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBNYXBWaWV3Q29udHJvbGxlciB9IGZyb20gJy4vY29udHJvbGxlcnMvdmlldyc7XHJcbmltcG9ydCB7IEZlYXR1cmVEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvZmVhdHVyZS1kYXRhc291cmNlJztcclxuXHJcbi8vIFRPRE86IFRoaXMgY2xhc3MgaXMgbWVzc3kuIENsZWFybHkgZGVmaW5lIGl0J3Mgc2NvcGUgYW5kIHRoZSBtYXAgYnJvd3NlcidzLlxyXG4vLyBNb3ZlIHNvbWUgc3R1ZmYgaW50byBjb250cm9sbGVycy5cclxuZXhwb3J0IGNsYXNzIElnb01hcCB7XHJcbiAgcHVibGljIG9sOiBvbE1hcDtcclxuICBwdWJsaWMgb2ZmbGluZUJ1dHRvblRvZ2dsZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcclxuICBwdWJsaWMgb2ZmbGluZUJ1dHRvblN0YXRlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHVibGljIGxheWVycyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PExheWVyW10+KFtdKTtcclxuICBwdWJsaWMgc3RhdHVzJDogU3ViamVjdDxTdWJqZWN0U3RhdHVzPjtcclxuICBwdWJsaWMgZ2VvbG9jYXRpb24kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxvbEdlb2xvY2F0aW9uPih1bmRlZmluZWQpO1xyXG4gIHB1YmxpYyBnZW9sb2NhdGlvbkZlYXR1cmU6IG9sRmVhdHVyZTtcclxuICBwdWJsaWMgYnVmZmVyR2VvbTogb2xDaXJjbGU7XHJcbiAgcHVibGljIGJ1ZmZlckZlYXR1cmU6IG9sRmVhdHVyZTtcclxuICBwdWJsaWMgYnVmZmVyOiBPdmVybGF5O1xyXG4gIHB1YmxpYyBvdmVybGF5OiBPdmVybGF5O1xyXG4gIHB1YmxpYyB2aWV3Q29udHJvbGxlcjogTWFwVmlld0NvbnRyb2xsZXI7XHJcblxyXG4gIHB1YmxpYyBidWZmZXJEYXRhU291cmNlOiBGZWF0dXJlRGF0YVNvdXJjZTtcclxuXHJcbiAgcHJpdmF0ZSBsYXllcldhdGNoZXI6IExheWVyV2F0Y2hlcjtcclxuICBwcml2YXRlIGdlb2xvY2F0aW9uOiBvbEdlb2xvY2F0aW9uO1xyXG4gIHByaXZhdGUgZ2VvbG9jYXRpb24kJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBwcml2YXRlIG9wdGlvbnM6IE1hcE9wdGlvbnM7XHJcbiAgcHJpdmF0ZSBkZWZhdWx0T3B0aW9uczogUGFydGlhbDxNYXBPcHRpb25zPiA9IHtcclxuICAgIGNvbnRyb2xzOiB7IGF0dHJpYnV0aW9uOiBmYWxzZSB9XHJcbiAgfTtcclxuXHJcbiAgZ2V0IGxheWVycygpOiBMYXllcltdIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVycyQudmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXQgcHJvamVjdGlvbigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMudmlld0NvbnRyb2xsZXIuZ2V0T2xQcm9qZWN0aW9uKCkuZ2V0Q29kZSgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucz86IE1hcE9wdGlvbnMpIHtcclxuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgdGhpcy5sYXllcldhdGNoZXIgPSBuZXcgTGF5ZXJXYXRjaGVyKCk7XHJcbiAgICB0aGlzLnN0YXR1cyQgPSB0aGlzLmxheWVyV2F0Y2hlci5zdGF0dXMkO1xyXG4gICAgb2xwcm9qNC5yZWdpc3Rlcihwcm9qNCk7XHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIGluaXQoKSB7XHJcbiAgICBjb25zdCBjb250cm9scyA9IFtdO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb250cm9scykge1xyXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRyb2xzLmF0dHJpYnV0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgYXR0cmlidXRpb25PcHQgPSAodGhpcy5vcHRpb25zLmNvbnRyb2xzLmF0dHJpYnV0aW9uID09PSB0cnVlXHJcbiAgICAgICAgICA/IHt9XHJcbiAgICAgICAgICA6IHRoaXMub3B0aW9ucy5jb250cm9scy5hdHRyaWJ1dGlvbikgYXMgTWFwQXR0cmlidXRpb25PcHRpb25zO1xyXG4gICAgICAgIGNvbnRyb2xzLnB1c2gobmV3IG9sQ29udHJvbEF0dHJpYnV0aW9uKGF0dHJpYnV0aW9uT3B0KSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5jb250cm9scy5zY2FsZUxpbmUpIHtcclxuICAgICAgICBjb25zdCBzY2FsZUxpbmVPcHQgPSAodGhpcy5vcHRpb25zLmNvbnRyb2xzLnNjYWxlTGluZSA9PT0gdHJ1ZVxyXG4gICAgICAgICAgPyB7fVxyXG4gICAgICAgICAgOiB0aGlzLm9wdGlvbnMuY29udHJvbHMuc2NhbGVMaW5lKSBhcyBNYXBTY2FsZUxpbmVPcHRpb25zO1xyXG4gICAgICAgIGNvbnRyb2xzLnB1c2gobmV3IG9sQ29udHJvbFNjYWxlTGluZShzY2FsZUxpbmVPcHQpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGV0IGludGVyYWN0aW9ucyA9IHt9O1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5pbnRlcmFjdGlvbnMgPT09IGZhbHNlKSB7XHJcbiAgICAgIGludGVyYWN0aW9ucyA9IHtcclxuICAgICAgICBhbHRTaGlmdERyYWdSb3RhdGU6IGZhbHNlLFxyXG4gICAgICAgIGRvdWJsZUNsaWNrWm9vbTogZmFsc2UsXHJcbiAgICAgICAga2V5Ym9hcmQ6IGZhbHNlLFxyXG4gICAgICAgIG1vdXNlV2hlZWxab29tOiBmYWxzZSxcclxuICAgICAgICBzaGlmdERyYWdab29tOiBmYWxzZSxcclxuICAgICAgICBkcmFnUGFuOiBmYWxzZSxcclxuICAgICAgICBwaW5jaFJvdGF0ZTogZmFsc2UsXHJcbiAgICAgICAgcGluY2hab29tOiBmYWxzZVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub2wgPSBuZXcgb2xNYXAoe1xyXG4gICAgICBpbnRlcmFjdGlvbnM6IG9saW50ZXJhY3Rpb24uZGVmYXVsdHMoaW50ZXJhY3Rpb25zKSxcclxuICAgICAgY29udHJvbHNcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuc2V0Vmlldyh0aGlzLm9wdGlvbnMudmlldyB8fCB7fSk7XHJcbiAgICB0aGlzLnZpZXdDb250cm9sbGVyID0gbmV3IE1hcFZpZXdDb250cm9sbGVyKHtcclxuICAgICAgc3RhdGVIaXN0b3J5OiB0cnVlXHJcbiAgICB9KTtcclxuICAgIHRoaXMudmlld0NvbnRyb2xsZXIuc2V0T2xNYXAodGhpcy5vbCk7XHJcbiAgICB0aGlzLm92ZXJsYXkgPSBuZXcgT3ZlcmxheSh0aGlzKTtcclxuICAgIHRoaXMuYnVmZmVyID0gbmV3IE92ZXJsYXkodGhpcyk7XHJcbiAgfVxyXG5cclxuICBzZXRUYXJnZXQoaWQ6IHN0cmluZykge1xyXG4gICAgdGhpcy5vbC5zZXRUYXJnZXQoaWQpO1xyXG4gICAgaWYgKGlkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5sYXllcldhdGNoZXIuc3Vic2NyaWJlKCgpID0+IHt9LCBudWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubGF5ZXJXYXRjaGVyLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGVWaWV3KG9wdGlvbnM6IE1hcFZpZXdPcHRpb25zKSB7XHJcbiAgICBjb25zdCBjdXJyZW50VmlldyA9IHRoaXMub2wuZ2V0VmlldygpO1xyXG4gICAgY29uc3Qgdmlld09wdGlvbnMgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgICB7XHJcbiAgICAgICAgem9vbTogY3VycmVudFZpZXcuZ2V0Wm9vbSgpXHJcbiAgICAgIH0sXHJcbiAgICAgIGN1cnJlbnRWaWV3LmdldFByb3BlcnRpZXMoKVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnNldFZpZXcoT2JqZWN0LmFzc2lnbih2aWV3T3B0aW9ucywgb3B0aW9ucykpO1xyXG4gICAgaWYgKG9wdGlvbnMubWF4Wm9vbU9uRXh0ZW50KSB7XHJcbiAgICAgIHRoaXMudmlld0NvbnRyb2xsZXIubWF4Wm9vbU9uRXh0ZW50ID0gb3B0aW9ucy5tYXhab29tT25FeHRlbnQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIG1hcCB2aWV3XHJcbiAgICogQHBhcmFtIG9wdGlvbnMgTWFwIHZpZXcgb3B0aW9uc1xyXG4gICAqL1xyXG4gIHNldFZpZXcob3B0aW9uczogTWFwVmlld09wdGlvbnMpIHtcclxuICAgIGlmICh0aGlzLnZpZXdDb250cm9sbGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy52aWV3Q29udHJvbGxlci5jbGVhclN0YXRlSGlzdG9yeSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHZpZXcgPSBuZXcgb2xWaWV3KG9wdGlvbnMpO1xyXG4gICAgdGhpcy5vbC5zZXRWaWV3KHZpZXcpO1xyXG5cclxuICAgIHRoaXMudW5zdWJzY3JpYmVHZW9sb2NhdGUoKTtcclxuICAgIGlmIChvcHRpb25zKSB7XHJcbiAgICAgIGlmIChvcHRpb25zLmNlbnRlcikge1xyXG4gICAgICAgIGNvbnN0IHByb2plY3Rpb24gPSB2aWV3LmdldFByb2plY3Rpb24oKS5nZXRDb2RlKCk7XHJcbiAgICAgICAgY29uc3QgY2VudGVyID0gb2xwcm9qLmZyb21Mb25MYXQob3B0aW9ucy5jZW50ZXIsIHByb2plY3Rpb24pO1xyXG4gICAgICAgIHZpZXcuc2V0Q2VudGVyKGNlbnRlcik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChvcHRpb25zLmdlb2xvY2F0ZSkge1xyXG4gICAgICAgIHRoaXMuZ2VvbG9jYXRlKHRydWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZXByZWNhdGVkXHJcbiAgICogVE9ETzogTW92ZSB0byBWaWV3Q29udHJvbGxlciBhbmQgdXBkYXRlIGV2ZXJ5IHBsYWNlIGl0J3MgdXNlZFxyXG4gICAqL1xyXG4gIGdldENlbnRlcihwcm9qZWN0aW9uPzogc3RyaW5nIHwgT2xQcm9qZWN0aW9uKTogW251bWJlciwgbnVtYmVyXSB7XHJcbiAgICByZXR1cm4gdGhpcy52aWV3Q29udHJvbGxlci5nZXRDZW50ZXIocHJvamVjdGlvbik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZXByZWNhdGVkXHJcbiAgICogVE9ETzogTW92ZSB0byBWaWV3Q29udHJvbGxlciBhbmQgdXBkYXRlIGV2ZXJ5IHBsYWNlIGl0J3MgdXNlZFxyXG4gICAqL1xyXG4gIGdldEV4dGVudChwcm9qZWN0aW9uPzogc3RyaW5nIHwgT2xQcm9qZWN0aW9uKTogTWFwRXh0ZW50IHtcclxuICAgIHJldHVybiB0aGlzLnZpZXdDb250cm9sbGVyLmdldEV4dGVudChwcm9qZWN0aW9uKTtcclxuICB9XHJcblxyXG4gIC8vIFRPRE86IE1vdmUgdG8gVmlld0NvbnRyb2xsZXIgYW5kIHVwZGF0ZSBldmVyeSBwbGFjZSBpdCdzIHVzZWRcclxuICBnZXRab29tKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy52aWV3Q29udHJvbGxlci5nZXRab29tKCk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VCYXNlTGF5ZXIoYmFzZUxheWVyOiBMYXllcikge1xyXG4gICAgaWYgKCFiYXNlTGF5ZXIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3QgYmwgb2YgdGhpcy5nZXRCYXNlTGF5ZXJzKCkpIHtcclxuICAgICAgYmwudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGJhc2VMYXllci52aXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLnZpZXdDb250cm9sbGVyLm9sVmlldy5zZXRNaW5ab29tKFxyXG4gICAgICBiYXNlTGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zLm1pblpvb20gfHwgKHRoaXMub3B0aW9ucy52aWV3IHx8IHt9KS5taW5ab29tXHJcbiAgICApO1xyXG4gICAgdGhpcy52aWV3Q29udHJvbGxlci5vbFZpZXcuc2V0TWF4Wm9vbShcclxuICAgICAgYmFzZUxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucy5tYXhab29tIHx8ICh0aGlzLm9wdGlvbnMudmlldyB8fCB7fSkubWF4Wm9vbVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdldEJhc2VMYXllcnMoKTogTGF5ZXJbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllcnMuZmlsdGVyKChsYXllcjogTGF5ZXIpID0+IGxheWVyLmJhc2VMYXllciA9PT0gdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBnZXRMYXllckJ5SWQoaWQ6IHN0cmluZyk6IExheWVyIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVycy5maW5kKChsYXllcjogTGF5ZXIpID0+IGxheWVyLmlkICYmIGxheWVyLmlkID09PSBpZCk7XHJcbiAgfVxyXG5cclxuICBnZXRMYXllckJ5QWxpYXMoYWxpYXM6IHN0cmluZyk6IExheWVyIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVycy5maW5kKFxyXG4gICAgICAobGF5ZXI6IExheWVyKSA9PiBsYXllci5hbGlhcyAmJiBsYXllci5hbGlhcyA9PT0gYWxpYXNcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYSBzaW5nbGUgbGF5ZXJcclxuICAgKiBAcGFyYW0gbGF5ZXIgTGF5ZXIgdG8gYWRkXHJcbiAgICogQHBhcmFtIHB1c2ggREVQUkVDQVRFRFxyXG4gICAqL1xyXG4gIGFkZExheWVyKGxheWVyOiBMYXllciwgcHVzaCA9IHRydWUpIHtcclxuICAgIHRoaXMuYWRkTGF5ZXJzKFtsYXllcl0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIG1hbnkgbGF5ZXJzXHJcbiAgICogQHBhcmFtIGxheWVycyBMYXllcnMgdG8gYWRkXHJcbiAgICogQHBhcmFtIHB1c2ggREVQUkVDQVRFRFxyXG4gICAqL1xyXG4gIGFkZExheWVycyhsYXllcnM6IExheWVyW10sIHB1c2ggPSB0cnVlKSB7XHJcbiAgICBsZXQgaW5jcmVtZW50QXJyYXkgPSAwO1xyXG4gICAgY29uc3QgYWRkZWRMYXllcnMgPSBsYXllcnNcclxuICAgICAgLm1hcCgobGF5ZXI6IExheWVyKSA9PiB0aGlzLmRvQWRkTGF5ZXIobGF5ZXIsIGluY3JlbWVudEFycmF5KyspKVxyXG4gICAgICAuZmlsdGVyKChsYXllcjogTGF5ZXIgfCB1bmRlZmluZWQpID0+IGxheWVyICE9PSB1bmRlZmluZWQpO1xyXG4gICAgdGhpcy5zZXRMYXllcnMoW10uY29uY2F0KHRoaXMubGF5ZXJzLCBhZGRlZExheWVycykpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIGEgc2luZ2xlIGxheWVyXHJcbiAgICogQHBhcmFtIGxheWVyIExheWVyIHRvIHJlbW92ZVxyXG4gICAqL1xyXG4gIHJlbW92ZUxheWVyKGxheWVyOiBMYXllcikge1xyXG4gICAgdGhpcy5yZW1vdmVMYXllcnMoW2xheWVyXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgbWFueSBsYXllcnNcclxuICAgKiBAcGFyYW0gbGF5ZXJzIExheWVycyB0byByZW1vdmVcclxuICAgKi9cclxuICByZW1vdmVMYXllcnMobGF5ZXJzOiBMYXllcltdKSB7XHJcbiAgICBjb25zdCBuZXdMYXllcnMgPSB0aGlzLmxheWVycyQudmFsdWUuc2xpY2UoMCk7XHJcbiAgICBjb25zdCBsYXllcnNUb1JlbW92ZSA9IFtdO1xyXG4gICAgbGF5ZXJzLmZvckVhY2goKGxheWVyOiBMYXllcikgPT4ge1xyXG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0TGF5ZXJJbmRleChsYXllcik7XHJcbiAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgbGF5ZXJzVG9SZW1vdmUucHVzaChsYXllcik7XHJcbiAgICAgICAgbmV3TGF5ZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGxheWVyc1RvUmVtb3ZlLmZvckVhY2goKGxheWVyOiBMYXllcikgPT4gdGhpcy5kb1JlbW92ZUxheWVyKGxheWVyKSk7XHJcbiAgICB0aGlzLnNldExheWVycyhuZXdMYXllcnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIGFsbCBsYXllcnNcclxuICAgKi9cclxuICByZW1vdmVBbGxMYXllcnMoKSB7XHJcbiAgICB0aGlzLmxheWVycy5mb3JFYWNoKChsYXllcjogTGF5ZXIpID0+IHRoaXMuZG9SZW1vdmVMYXllcihsYXllcikpO1xyXG4gICAgdGhpcy5sYXllcnMkLm5leHQoW10pO1xyXG4gIH1cclxuXHJcbiAgcmFpc2VMYXllcihsYXllcjogTGF5ZXIpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRMYXllckluZGV4KGxheWVyKTtcclxuICAgIGlmIChpbmRleCA+IDApIHtcclxuICAgICAgdGhpcy5tb3ZlTGF5ZXIobGF5ZXIsIGluZGV4LCBpbmRleCAtIDEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbG93ZXJMYXllcihsYXllcjogTGF5ZXIpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRMYXllckluZGV4KGxheWVyKTtcclxuICAgIGlmIChpbmRleCA8IHRoaXMubGF5ZXJzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgdGhpcy5tb3ZlTGF5ZXIobGF5ZXIsIGluZGV4LCBpbmRleCArIDEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbW92ZUxheWVyKGxheWVyOiBMYXllciwgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBsYXllclRvID0gdGhpcy5sYXllcnNbdG9dO1xyXG4gICAgY29uc3QgekluZGV4VG8gPSBsYXllclRvLnpJbmRleDtcclxuICAgIGNvbnN0IHpJbmRleEZyb20gPSBsYXllci56SW5kZXg7XHJcblxyXG4gICAgaWYgKGxheWVyVG8uYmFzZUxheWVyKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsYXllci56SW5kZXggPSB6SW5kZXhUbztcclxuICAgIGxheWVyVG8uekluZGV4ID0gekluZGV4RnJvbTtcclxuXHJcbiAgICB0aGlzLmxheWVyc1t0b10gPSBsYXllcjtcclxuICAgIHRoaXMubGF5ZXJzW2Zyb21dID0gbGF5ZXJUbztcclxuICAgIHRoaXMubGF5ZXJzJC5uZXh0KHRoaXMubGF5ZXJzLnNsaWNlKDApKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhIGxheWVyIHRvIHRoZSBPTCBtYXAgYW5kIHN0YXJ0IHdhdGNoaW5nLiBJZiB0aGUgbGF5ZXIgaXMgYWxyZWFkeVxyXG4gICAqIGFkZGVkIHRvIHRoaXMgbWFwLCBtYWtlIGl0IHZpc2libGUgYnV0IGRvbid0IGFkZCBpdCBvbmUgYWdhaW4uXHJcbiAgICogQHBhcmFtIGxheWVyIExheWVyXHJcbiAgICogQHJldHVybnMgVGhlIGxheWVyIGFkZGVkLCBpZiBhbnlcclxuICAgKi9cclxuICBwcml2YXRlIGRvQWRkTGF5ZXIobGF5ZXI6IExheWVyLCBsZW5ndGg6IG51bWJlcikge1xyXG4gICAgaWYgKGxheWVyLmJhc2VMYXllciAmJiBsYXllci52aXNpYmxlKSB7XHJcbiAgICAgIHRoaXMuY2hhbmdlQmFzZUxheWVyKGxheWVyKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBleGlzdGluZ0xheWVyID0gdGhpcy5nZXRMYXllckJ5SWQobGF5ZXIuaWQpO1xyXG4gICAgaWYgKGV4aXN0aW5nTGF5ZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBleGlzdGluZ0xheWVyLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxheWVyLnpJbmRleCA9PT0gdW5kZWZpbmVkIHx8IGxheWVyLnpJbmRleCA9PT0gMCkge1xyXG4gICAgICBjb25zdCBvZmZzZXQgPSBsYXllci5iYXNlTGF5ZXIgPyAxIDogMTA7XHJcbiAgICAgIGxheWVyLnpJbmRleCA9IHRoaXMubGF5ZXJzLmxlbmd0aCArIG9mZnNldCArIGxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBsYXllci5zZXRNYXAodGhpcyk7XHJcbiAgICB0aGlzLmxheWVyV2F0Y2hlci53YXRjaExheWVyKGxheWVyKTtcclxuICAgIHRoaXMub2wuYWRkTGF5ZXIobGF5ZXIub2wpO1xyXG5cclxuICAgIHJldHVybiBsYXllcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBhIGxheWVyIGZyb20gdGhlIE9MIG1hcCBhbmQgc3RvcCB3YXRjaGluZ1xyXG4gICAqIEBwYXJhbSBsYXllciBMYXllclxyXG4gICAqL1xyXG4gIHByaXZhdGUgZG9SZW1vdmVMYXllcihsYXllcjogTGF5ZXIpIHtcclxuICAgIHRoaXMubGF5ZXJXYXRjaGVyLnVud2F0Y2hMYXllcihsYXllcik7XHJcbiAgICB0aGlzLm9sLnJlbW92ZUxheWVyKGxheWVyLm9sKTtcclxuICAgIGxheWVyLnNldE1hcCh1bmRlZmluZWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHRoZSBsYXllcnMgb2JzZXJ2YWJsZVxyXG4gICAqIEBwYXJhbSBsYXllcnMgTGF5ZXJzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZXRMYXllcnMobGF5ZXJzOiBMYXllcltdKSB7XHJcbiAgICB0aGlzLmxheWVycyQubmV4dCh0aGlzLnNvcnRMYXllcnNCeVpJbmRleChsYXllcnMpLnNsaWNlKDApKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNvcnQgbGF5ZXJzIGJ5IGRlc2NlbmRpbmcgekluZGV4XHJcbiAgICogQHBhcmFtIGxheWVycyBBcnJheSBvZiBsYXllcnNcclxuICAgKiBAcmV0dXJucyBUaGUgb3JpZ2luYWwgYXJyYXksIHNvcnRlZCBieSB6SW5kZXhcclxuICAgKi9cclxuICBwcml2YXRlIHNvcnRMYXllcnNCeVpJbmRleChsYXllcnM6IExheWVyW10pIHtcclxuICAgIC8vIFNvcnQgYnkgZGVzY2VuZGluZyB6SW5kZXhcclxuICAgIHJldHVybiBsYXllcnMuc29ydChcclxuICAgICAgKGxheWVyMTogTGF5ZXIsIGxheWVyMjogTGF5ZXIpID0+IGxheWVyMi56SW5kZXggLSBsYXllcjEuekluZGV4XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGxheWVyIGluZGV4IGluIHRoZSBtYXAncyBpbmVuciBhcnJheSBvZiBsYXllcnNcclxuICAgKiBAcGFyYW0gbGF5ZXIgTGF5ZXJcclxuICAgKiBAcmV0dXJucyBUaGUgbGF5ZXIgaW5kZXhcclxuICAgKi9cclxuICBwcml2YXRlIGdldExheWVySW5kZXgobGF5ZXI6IExheWVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllcnMuZmluZEluZGV4KChfbGF5ZXI6IExheWVyKSA9PiBfbGF5ZXIgPT09IGxheWVyKTtcclxuICB9XHJcblxyXG4gIC8vIFRPRE86IENyZWF0ZSBhIEdlb2xvY2F0aW9uQ29udHJvbGxlciB3aXRoIGV2ZXJ5dGhpbmcgYmVsb3dcclxuICBnZW9sb2NhdGUodHJhY2sgPSBmYWxzZSkge1xyXG4gICAgbGV0IGZpcnN0ID0gdHJ1ZTtcclxuICAgIGlmICh0aGlzLmdlb2xvY2F0aW9uJCQpIHtcclxuICAgICAgdHJhY2sgPSB0aGlzLmdlb2xvY2F0aW9uLmdldFRyYWNraW5nKCk7XHJcbiAgICAgIHRoaXMudW5zdWJzY3JpYmVHZW9sb2NhdGUoKTtcclxuICAgIH1cclxuICAgIHRoaXMuc3RhcnRHZW9sb2NhdGlvbigpO1xyXG5cclxuICAgIHRoaXMuZ2VvbG9jYXRpb24kJCA9IHRoaXMuZ2VvbG9jYXRpb24kLnN1YnNjcmliZShnZW9sb2NhdGlvbiA9PiB7XHJcbiAgICAgIGlmICghZ2VvbG9jYXRpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgYWNjdXJhY3kgPSBnZW9sb2NhdGlvbi5nZXRBY2N1cmFjeSgpO1xyXG4gICAgICBpZiAoYWNjdXJhY3kgPCAxMDAwMCkge1xyXG4gICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gZ2VvbG9jYXRpb24uZ2V0QWNjdXJhY3lHZW9tZXRyeSgpO1xyXG4gICAgICAgIGNvbnN0IGV4dGVudCA9IGdlb21ldHJ5LmdldEV4dGVudCgpO1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHRoaXMuZ2VvbG9jYXRpb25GZWF0dXJlICYmXHJcbiAgICAgICAgICB0aGlzLm92ZXJsYXkuZGF0YVNvdXJjZS5vbC5nZXRGZWF0dXJlQnlJZChcclxuICAgICAgICAgICAgdGhpcy5nZW9sb2NhdGlvbkZlYXR1cmUuZ2V0SWQoKVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgdGhpcy5vdmVybGF5LmRhdGFTb3VyY2Uub2wucmVtb3ZlRmVhdHVyZSh0aGlzLmdlb2xvY2F0aW9uRmVhdHVyZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5idWZmZXJGZWF0dXJlKSB7XHJcbiAgICAgICAgICB0aGlzLmJ1ZmZlci5kYXRhU291cmNlLm9sLnJlbW92ZUZlYXR1cmUodGhpcy5idWZmZXJGZWF0dXJlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZ2VvbG9jYXRpb25GZWF0dXJlID0gbmV3IG9sRmVhdHVyZSh7IGdlb21ldHJ5IH0pO1xyXG4gICAgICAgIHRoaXMuZ2VvbG9jYXRpb25GZWF0dXJlLnNldElkKCdnZW9sb2NhdGlvbkZlYXR1cmUnKTtcclxuICAgICAgICB0aGlzLm92ZXJsYXkuYWRkT2xGZWF0dXJlKHRoaXMuZ2VvbG9jYXRpb25GZWF0dXJlKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub2wuZ2V0VmlldygpLm9wdGlvbnNfLmJ1ZmZlcikge1xyXG4gICAgICAgICAgY29uc3QgYnVmZmVyUmFkaXVzID0gdGhpcy5vbC5nZXRWaWV3KCkub3B0aW9uc18uYnVmZmVyLmJ1ZmZlclJhZGl1cztcclxuICAgICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gZ2VvbG9jYXRpb24uZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgIHRoaXMuYnVmZmVyR2VvbSA9IG5ldyBvbENpcmNsZShjb29yZGluYXRlcywgYnVmZmVyUmFkaXVzKTtcclxuICAgICAgICAgIGNvbnN0IGJ1ZmZlclN0cm9rZSA9IHRoaXMub2wuZ2V0VmlldygpLm9wdGlvbnNfLmJ1ZmZlci5idWZmZXJTdHJva2U7XHJcbiAgICAgICAgICBjb25zdCBidWZmZXJGaWxsID0gdGhpcy5vbC5nZXRWaWV3KCkub3B0aW9uc18uYnVmZmVyLmJ1ZmZlckZpbGw7XHJcblxyXG4gICAgICAgICAgbGV0IGJ1ZmZlclRleHQ7XHJcbiAgICAgICAgICBpZiAodGhpcy5vbC5nZXRWaWV3KCkub3B0aW9uc18uYnVmZmVyLnNob3dCdWZmZXJSYWRpdXMpIHtcclxuICAgICAgICAgICAgYnVmZmVyVGV4dCA9IGJ1ZmZlclJhZGl1cy50b1N0cmluZygpICsgJ20nO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYnVmZmVyVGV4dCA9ICcnO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRoaXMuYnVmZmVyRmVhdHVyZSA9IG5ldyBvbEZlYXR1cmUodGhpcy5idWZmZXJHZW9tKTtcclxuICAgICAgICAgIHRoaXMuYnVmZmVyRmVhdHVyZS5zZXRJZCgnYnVmZmVyRmVhdHVyZScpO1xyXG4gICAgICAgICAgdGhpcy5idWZmZXJGZWF0dXJlLnNldCgnYnVmZmVyU3Ryb2tlJywgYnVmZmVyU3Ryb2tlKTtcclxuICAgICAgICAgIHRoaXMuYnVmZmVyRmVhdHVyZS5zZXQoJ2J1ZmZlckZpbGwnLCBidWZmZXJGaWxsKTtcclxuICAgICAgICAgIHRoaXMuYnVmZmVyRmVhdHVyZS5zZXQoJ2J1ZmZlclRleHQnLCBidWZmZXJUZXh0KTtcclxuICAgICAgICAgIHRoaXMuYnVmZmVyLmFkZE9sRmVhdHVyZSh0aGlzLmJ1ZmZlckZlYXR1cmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZmlyc3QpIHtcclxuICAgICAgICAgIHRoaXMudmlld0NvbnRyb2xsZXIuem9vbVRvRXh0ZW50KGV4dGVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKGZpcnN0KSB7XHJcbiAgICAgICAgY29uc3QgdmlldyA9IHRoaXMub2wuZ2V0VmlldygpO1xyXG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gZ2VvbG9jYXRpb24uZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICB2aWV3LnNldENlbnRlcihjb29yZGluYXRlcyk7XHJcbiAgICAgICAgdmlldy5zZXRab29tKDE0KTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHJhY2spIHtcclxuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlR2VvbG9jYXRlKCk7XHJcbiAgICAgIH1cclxuICAgICAgZmlyc3QgPSBmYWxzZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdW5zdWJzY3JpYmVHZW9sb2NhdGUoKSB7XHJcbiAgICB0aGlzLnN0b3BHZW9sb2NhdGlvbigpO1xyXG4gICAgaWYgKHRoaXMuZ2VvbG9jYXRpb24kJCkge1xyXG4gICAgICB0aGlzLmdlb2xvY2F0aW9uJCQudW5zdWJzY3JpYmUoKTtcclxuICAgICAgdGhpcy5nZW9sb2NhdGlvbiQkID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdGFydEdlb2xvY2F0aW9uKCkge1xyXG4gICAgaWYgKCF0aGlzLmdlb2xvY2F0aW9uKSB7XHJcbiAgICAgIHRoaXMuZ2VvbG9jYXRpb24gPSBuZXcgb2xHZW9sb2NhdGlvbih7XHJcbiAgICAgICAgdHJhY2tpbmdPcHRpb25zOiB7XHJcbiAgICAgICAgICBlbmFibGVIaWdoQWNjdXJhY3k6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHByb2plY3Rpb246IHRoaXMucHJvamVjdGlvbixcclxuICAgICAgICB0cmFja2luZzogdHJ1ZVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMuZ2VvbG9jYXRpb24ub24oJ2NoYW5nZScsIGV2dCA9PiB7XHJcbiAgICAgICAgdGhpcy5nZW9sb2NhdGlvbiQubmV4dCh0aGlzLmdlb2xvY2F0aW9uKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmdlb2xvY2F0aW9uLnNldFRyYWNraW5nKHRydWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdG9wR2VvbG9jYXRpb24oKSB7XHJcbiAgICBpZiAodGhpcy5nZW9sb2NhdGlvbikge1xyXG4gICAgICB0aGlzLmdlb2xvY2F0aW9uLnNldFRyYWNraW5nKGZhbHNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uT2ZmbGluZVRvZ2dsZShvZmZsaW5lOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLm9mZmxpbmVCdXR0b25Ub2dnbGUkLm5leHQob2ZmbGluZSk7XHJcbiAgICB0aGlzLm9mZmxpbmVCdXR0b25TdGF0ZSA9IG9mZmxpbmU7XHJcbiAgfVxyXG59XHJcbiJdfQ==