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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL21hcC9zaGFyZWQvbWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxLQUFLLE1BQU0sUUFBUSxDQUFDO0FBQzNCLE9BQU8sTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUM3QixPQUFPLFNBQVMsTUFBTSxZQUFZLENBQUM7QUFDbkMsT0FBTyxhQUFhLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxvQkFBb0IsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLGtCQUFrQixNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sS0FBSyxNQUFNLE1BQU0sU0FBUyxDQUFDO0FBQ2xDLE9BQU8sS0FBSyxPQUFPLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sS0FBSyxhQUFhLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxRQUFRLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEMsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQzFCLE9BQU8sRUFBRSxlQUFlLEVBQXlCLE1BQU0sTUFBTSxDQUFDO0FBSzlELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUV2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFRdEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7OztBQUt2RDs7OztJQWdDRSxnQkFBWSxPQUFvQjtRQTlCekIseUJBQW9CLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7UUFDM0QsWUFBTyxHQUFHLElBQUksZUFBZSxDQUFVLEVBQUUsQ0FBQyxDQUFDO1FBRTNDLGlCQUFZLEdBQUcsSUFBSSxlQUFlLENBQWdCLFNBQVMsQ0FBQyxDQUFDO1FBZTVELG1CQUFjLEdBQXdCO1lBQzVDLFFBQVEsRUFBRSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7U0FD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LGdDQUVFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9sTWFwIGZyb20gJ29sL01hcCc7XHJcbmltcG9ydCBvbFZpZXcgZnJvbSAnb2wvVmlldyc7XHJcbmltcG9ydCBvbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCBvbEdlb2xvY2F0aW9uIGZyb20gJ29sL0dlb2xvY2F0aW9uJztcclxuaW1wb3J0IG9sQ29udHJvbEF0dHJpYnV0aW9uIGZyb20gJ29sL2NvbnRyb2wvQXR0cmlidXRpb24nO1xyXG5pbXBvcnQgb2xDb250cm9sU2NhbGVMaW5lIGZyb20gJ29sL2NvbnRyb2wvU2NhbGVMaW5lJztcclxuaW1wb3J0ICogYXMgb2xwcm9qIGZyb20gJ29sL3Byb2onO1xyXG5pbXBvcnQgKiBhcyBvbHByb2o0IGZyb20gJ29sL3Byb2ovcHJvajQnO1xyXG5pbXBvcnQgT2xQcm9qZWN0aW9uIGZyb20gJ29sL3Byb2ovUHJvamVjdGlvbic7XHJcbmltcG9ydCAqIGFzIG9saW50ZXJhY3Rpb24gZnJvbSAnb2wvaW50ZXJhY3Rpb24nO1xyXG5pbXBvcnQgb2xDaXJjbGUgZnJvbSAnb2wvZ2VvbS9DaXJjbGUnO1xyXG5cclxuaW1wb3J0IHByb2o0IGZyb20gJ3Byb2o0JztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IFN1YmplY3RTdGF0dXMgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMnO1xyXG5pbXBvcnQgeyBPdmVybGF5IH0gZnJvbSAnLi4vLi4vb3ZlcmxheS9zaGFyZWQvb3ZlcmxheSc7XHJcblxyXG5pbXBvcnQgeyBMYXllcldhdGNoZXIgfSBmcm9tICcuLi91dGlscy9sYXllci13YXRjaGVyJztcclxuaW1wb3J0IHtcclxuICBNYXBWaWV3T3B0aW9ucyxcclxuICBNYXBPcHRpb25zLFxyXG4gIE1hcEF0dHJpYnV0aW9uT3B0aW9ucyxcclxuICBNYXBTY2FsZUxpbmVPcHRpb25zLFxyXG4gIE1hcEV4dGVudFxyXG59IGZyb20gJy4vbWFwLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IE1hcFZpZXdDb250cm9sbGVyIH0gZnJvbSAnLi9jb250cm9sbGVycy92aWV3JztcclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9mZWF0dXJlLWRhdGFzb3VyY2UnO1xyXG5cclxuLy8gVE9ETzogVGhpcyBjbGFzcyBpcyBtZXNzeS4gQ2xlYXJseSBkZWZpbmUgaXQncyBzY29wZSBhbmQgdGhlIG1hcCBicm93c2VyJ3MuXHJcbi8vIE1vdmUgc29tZSBzdHVmZiBpbnRvIGNvbnRyb2xsZXJzLlxyXG5leHBvcnQgY2xhc3MgSWdvTWFwIHtcclxuICBwdWJsaWMgb2w6IG9sTWFwO1xyXG4gIHB1YmxpYyBvZmZsaW5lQnV0dG9uVG9nZ2xlJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xyXG4gIHB1YmxpYyBsYXllcnMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxMYXllcltdPihbXSk7XHJcbiAgcHVibGljIHN0YXR1cyQ6IFN1YmplY3Q8U3ViamVjdFN0YXR1cz47XHJcbiAgcHVibGljIGdlb2xvY2F0aW9uJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8b2xHZW9sb2NhdGlvbj4odW5kZWZpbmVkKTtcclxuICBwdWJsaWMgZ2VvbG9jYXRpb25GZWF0dXJlOiBvbEZlYXR1cmU7XHJcbiAgcHVibGljIGJ1ZmZlckdlb206IG9sQ2lyY2xlO1xyXG4gIHB1YmxpYyBidWZmZXJGZWF0dXJlOiBvbEZlYXR1cmU7XHJcbiAgcHVibGljIGJ1ZmZlcjogT3ZlcmxheTtcclxuICBwdWJsaWMgb3ZlcmxheTogT3ZlcmxheTtcclxuICBwdWJsaWMgdmlld0NvbnRyb2xsZXI6IE1hcFZpZXdDb250cm9sbGVyO1xyXG5cclxuICBwdWJsaWMgYnVmZmVyRGF0YVNvdXJjZTogRmVhdHVyZURhdGFTb3VyY2U7XHJcblxyXG4gIHByaXZhdGUgbGF5ZXJXYXRjaGVyOiBMYXllcldhdGNoZXI7XHJcbiAgcHJpdmF0ZSBnZW9sb2NhdGlvbjogb2xHZW9sb2NhdGlvbjtcclxuICBwcml2YXRlIGdlb2xvY2F0aW9uJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgcHJpdmF0ZSBvcHRpb25zOiBNYXBPcHRpb25zO1xyXG4gIHByaXZhdGUgZGVmYXVsdE9wdGlvbnM6IFBhcnRpYWw8TWFwT3B0aW9ucz4gPSB7XHJcbiAgICBjb250cm9sczogeyBhdHRyaWJ1dGlvbjogZmFsc2UgfVxyXG4gIH07XHJcblxyXG4gIGdldCBsYXllcnMoKTogTGF5ZXJbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllcnMkLnZhbHVlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHByb2plY3Rpb24oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLnZpZXdDb250cm9sbGVyLmdldE9sUHJvamVjdGlvbigpLmdldENvZGUoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiBNYXBPcHRpb25zKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcclxuICAgIHRoaXMubGF5ZXJXYXRjaGVyID0gbmV3IExheWVyV2F0Y2hlcigpO1xyXG4gICAgdGhpcy5zdGF0dXMkID0gdGhpcy5sYXllcldhdGNoZXIuc3RhdHVzJDtcclxuICAgIG9scHJvajQucmVnaXN0ZXIocHJvajQpO1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBpbml0KCkge1xyXG4gICAgY29uc3QgY29udHJvbHMgPSBbXTtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuY29udHJvbHMpIHtcclxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5jb250cm9scy5hdHRyaWJ1dGlvbikge1xyXG4gICAgICAgIGNvbnN0IGF0dHJpYnV0aW9uT3B0ID0gKHRoaXMub3B0aW9ucy5jb250cm9scy5hdHRyaWJ1dGlvbiA9PT0gdHJ1ZVxyXG4gICAgICAgICAgPyB7fVxyXG4gICAgICAgICAgOiB0aGlzLm9wdGlvbnMuY29udHJvbHMuYXR0cmlidXRpb24pIGFzIE1hcEF0dHJpYnV0aW9uT3B0aW9ucztcclxuICAgICAgICBjb250cm9scy5wdXNoKG5ldyBvbENvbnRyb2xBdHRyaWJ1dGlvbihhdHRyaWJ1dGlvbk9wdCkpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuY29udHJvbHMuc2NhbGVMaW5lKSB7XHJcbiAgICAgICAgY29uc3Qgc2NhbGVMaW5lT3B0ID0gKHRoaXMub3B0aW9ucy5jb250cm9scy5zY2FsZUxpbmUgPT09IHRydWVcclxuICAgICAgICAgID8ge31cclxuICAgICAgICAgIDogdGhpcy5vcHRpb25zLmNvbnRyb2xzLnNjYWxlTGluZSkgYXMgTWFwU2NhbGVMaW5lT3B0aW9ucztcclxuICAgICAgICBjb250cm9scy5wdXNoKG5ldyBvbENvbnRyb2xTY2FsZUxpbmUoc2NhbGVMaW5lT3B0KSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCBpbnRlcmFjdGlvbnMgPSB7fTtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuaW50ZXJhY3Rpb25zID09PSBmYWxzZSkge1xyXG4gICAgICBpbnRlcmFjdGlvbnMgPSB7XHJcbiAgICAgICAgYWx0U2hpZnREcmFnUm90YXRlOiBmYWxzZSxcclxuICAgICAgICBkb3VibGVDbGlja1pvb206IGZhbHNlLFxyXG4gICAgICAgIGtleWJvYXJkOiBmYWxzZSxcclxuICAgICAgICBtb3VzZVdoZWVsWm9vbTogZmFsc2UsXHJcbiAgICAgICAgc2hpZnREcmFnWm9vbTogZmFsc2UsXHJcbiAgICAgICAgZHJhZ1BhbjogZmFsc2UsXHJcbiAgICAgICAgcGluY2hSb3RhdGU6IGZhbHNlLFxyXG4gICAgICAgIHBpbmNoWm9vbTogZmFsc2VcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9sID0gbmV3IG9sTWFwKHtcclxuICAgICAgaW50ZXJhY3Rpb25zOiBvbGludGVyYWN0aW9uLmRlZmF1bHRzKGludGVyYWN0aW9ucyksXHJcbiAgICAgIGNvbnRyb2xzXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnNldFZpZXcodGhpcy5vcHRpb25zLnZpZXcgfHwge30pO1xyXG4gICAgdGhpcy52aWV3Q29udHJvbGxlciA9IG5ldyBNYXBWaWV3Q29udHJvbGxlcih7XHJcbiAgICAgIHN0YXRlSGlzdG9yeTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnZpZXdDb250cm9sbGVyLnNldE9sTWFwKHRoaXMub2wpO1xyXG4gICAgdGhpcy5vdmVybGF5ID0gbmV3IE92ZXJsYXkodGhpcyk7XHJcbiAgICB0aGlzLmJ1ZmZlciA9IG5ldyBPdmVybGF5KHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgc2V0VGFyZ2V0KGlkOiBzdHJpbmcpIHtcclxuICAgIHRoaXMub2wuc2V0VGFyZ2V0KGlkKTtcclxuICAgIGlmIChpZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMubGF5ZXJXYXRjaGVyLnN1YnNjcmliZSgoKSA9PiB7fSwgbnVsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmxheWVyV2F0Y2hlci51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlVmlldyhvcHRpb25zOiBNYXBWaWV3T3B0aW9ucykge1xyXG4gICAgY29uc3QgY3VycmVudFZpZXcgPSB0aGlzLm9sLmdldFZpZXcoKTtcclxuICAgIGNvbnN0IHZpZXdPcHRpb25zID0gT2JqZWN0LmFzc2lnbihcclxuICAgICAge1xyXG4gICAgICAgIHpvb206IGN1cnJlbnRWaWV3LmdldFpvb20oKVxyXG4gICAgICB9LFxyXG4gICAgICBjdXJyZW50Vmlldy5nZXRQcm9wZXJ0aWVzKClcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5zZXRWaWV3KE9iamVjdC5hc3NpZ24odmlld09wdGlvbnMsIG9wdGlvbnMpKTtcclxuICAgIGlmIChvcHRpb25zLm1heFpvb21PbkV4dGVudCkge1xyXG4gICAgICB0aGlzLnZpZXdDb250cm9sbGVyLm1heFpvb21PbkV4dGVudCA9IG9wdGlvbnMubWF4Wm9vbU9uRXh0ZW50O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBtYXAgdmlld1xyXG4gICAqIEBwYXJhbSBvcHRpb25zIE1hcCB2aWV3IG9wdGlvbnNcclxuICAgKi9cclxuICBzZXRWaWV3KG9wdGlvbnM6IE1hcFZpZXdPcHRpb25zKSB7XHJcbiAgICBpZiAodGhpcy52aWV3Q29udHJvbGxlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMudmlld0NvbnRyb2xsZXIuY2xlYXJTdGF0ZUhpc3RvcnkoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB2aWV3ID0gbmV3IG9sVmlldyhvcHRpb25zKTtcclxuICAgIHRoaXMub2wuc2V0Vmlldyh2aWV3KTtcclxuXHJcbiAgICB0aGlzLnVuc3Vic2NyaWJlR2VvbG9jYXRlKCk7XHJcbiAgICBpZiAob3B0aW9ucykge1xyXG4gICAgICBpZiAob3B0aW9ucy5jZW50ZXIpIHtcclxuICAgICAgICBjb25zdCBwcm9qZWN0aW9uID0gdmlldy5nZXRQcm9qZWN0aW9uKCkuZ2V0Q29kZSgpO1xyXG4gICAgICAgIGNvbnN0IGNlbnRlciA9IG9scHJvai5mcm9tTG9uTGF0KG9wdGlvbnMuY2VudGVyLCBwcm9qZWN0aW9uKTtcclxuICAgICAgICB2aWV3LnNldENlbnRlcihjZW50ZXIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAob3B0aW9ucy5nZW9sb2NhdGUpIHtcclxuICAgICAgICB0aGlzLmdlb2xvY2F0ZSh0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVwcmVjYXRlZFxyXG4gICAqIFRPRE86IE1vdmUgdG8gVmlld0NvbnRyb2xsZXIgYW5kIHVwZGF0ZSBldmVyeSBwbGFjZSBpdCdzIHVzZWRcclxuICAgKi9cclxuICBnZXRDZW50ZXIocHJvamVjdGlvbj86IHN0cmluZyB8IE9sUHJvamVjdGlvbik6IFtudW1iZXIsIG51bWJlcl0ge1xyXG4gICAgcmV0dXJuIHRoaXMudmlld0NvbnRyb2xsZXIuZ2V0Q2VudGVyKHByb2plY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVwcmVjYXRlZFxyXG4gICAqIFRPRE86IE1vdmUgdG8gVmlld0NvbnRyb2xsZXIgYW5kIHVwZGF0ZSBldmVyeSBwbGFjZSBpdCdzIHVzZWRcclxuICAgKi9cclxuICBnZXRFeHRlbnQocHJvamVjdGlvbj86IHN0cmluZyB8IE9sUHJvamVjdGlvbik6IE1hcEV4dGVudCB7XHJcbiAgICByZXR1cm4gdGhpcy52aWV3Q29udHJvbGxlci5nZXRFeHRlbnQocHJvamVjdGlvbik7XHJcbiAgfVxyXG5cclxuICAvLyBUT0RPOiBNb3ZlIHRvIFZpZXdDb250cm9sbGVyIGFuZCB1cGRhdGUgZXZlcnkgcGxhY2UgaXQncyB1c2VkXHJcbiAgZ2V0Wm9vbSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMudmlld0NvbnRyb2xsZXIuZ2V0Wm9vbSgpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlQmFzZUxheWVyKGJhc2VMYXllcjogTGF5ZXIpIHtcclxuICAgIGlmICghYmFzZUxheWVyKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGNvbnN0IGJsIG9mIHRoaXMuZ2V0QmFzZUxheWVycygpKSB7XHJcbiAgICAgIGJsLnZpc2libGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBiYXNlTGF5ZXIudmlzaWJsZSA9IHRydWU7XHJcblxyXG4gICAgdGhpcy52aWV3Q29udHJvbGxlci5vbFZpZXcuc2V0TWluWm9vbShcclxuICAgICAgYmFzZUxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucy5taW5ab29tIHx8ICh0aGlzLm9wdGlvbnMudmlldyB8fCB7fSkubWluWm9vbVxyXG4gICAgKTtcclxuICAgIHRoaXMudmlld0NvbnRyb2xsZXIub2xWaWV3LnNldE1heFpvb20oXHJcbiAgICAgIGJhc2VMYXllci5kYXRhU291cmNlLm9wdGlvbnMubWF4Wm9vbSB8fCAodGhpcy5vcHRpb25zLnZpZXcgfHwge30pLm1heFpvb21cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXRCYXNlTGF5ZXJzKCk6IExheWVyW10ge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJzLmZpbHRlcigobGF5ZXI6IExheWVyKSA9PiBsYXllci5iYXNlTGF5ZXIgPT09IHRydWUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGF5ZXJCeUlkKGlkOiBzdHJpbmcpOiBMYXllciB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllcnMuZmluZCgobGF5ZXI6IExheWVyKSA9PiBsYXllci5pZCAmJiBsYXllci5pZCA9PT0gaWQpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGF5ZXJCeUFsaWFzKGFsaWFzOiBzdHJpbmcpOiBMYXllciB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllcnMuZmluZChcclxuICAgICAgKGxheWVyOiBMYXllcikgPT4gbGF5ZXIuYWxpYXMgJiYgbGF5ZXIuYWxpYXMgPT09IGFsaWFzXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGEgc2luZ2xlIGxheWVyXHJcbiAgICogQHBhcmFtIGxheWVyIExheWVyIHRvIGFkZFxyXG4gICAqIEBwYXJhbSBwdXNoIERFUFJFQ0FURURcclxuICAgKi9cclxuICBhZGRMYXllcihsYXllcjogTGF5ZXIsIHB1c2ggPSB0cnVlKSB7XHJcbiAgICB0aGlzLmFkZExheWVycyhbbGF5ZXJdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBtYW55IGxheWVyc1xyXG4gICAqIEBwYXJhbSBsYXllcnMgTGF5ZXJzIHRvIGFkZFxyXG4gICAqIEBwYXJhbSBwdXNoIERFUFJFQ0FURURcclxuICAgKi9cclxuICBhZGRMYXllcnMobGF5ZXJzOiBMYXllcltdLCBwdXNoID0gdHJ1ZSkge1xyXG4gICAgbGV0IGluY3JlbWVudEFycmF5ID0gMDtcclxuICAgIGNvbnN0IGFkZGVkTGF5ZXJzID0gbGF5ZXJzXHJcbiAgICAgIC5tYXAoKGxheWVyOiBMYXllcikgPT4gdGhpcy5kb0FkZExheWVyKGxheWVyLCBpbmNyZW1lbnRBcnJheSsrKSlcclxuICAgICAgLmZpbHRlcigobGF5ZXI6IExheWVyIHwgdW5kZWZpbmVkKSA9PiBsYXllciAhPT0gdW5kZWZpbmVkKTtcclxuICAgIHRoaXMuc2V0TGF5ZXJzKFtdLmNvbmNhdCh0aGlzLmxheWVycywgYWRkZWRMYXllcnMpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBhIHNpbmdsZSBsYXllclxyXG4gICAqIEBwYXJhbSBsYXllciBMYXllciB0byByZW1vdmVcclxuICAgKi9cclxuICByZW1vdmVMYXllcihsYXllcjogTGF5ZXIpIHtcclxuICAgIHRoaXMucmVtb3ZlTGF5ZXJzKFtsYXllcl0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIG1hbnkgbGF5ZXJzXHJcbiAgICogQHBhcmFtIGxheWVycyBMYXllcnMgdG8gcmVtb3ZlXHJcbiAgICovXHJcbiAgcmVtb3ZlTGF5ZXJzKGxheWVyczogTGF5ZXJbXSkge1xyXG4gICAgY29uc3QgbmV3TGF5ZXJzID0gdGhpcy5sYXllcnMkLnZhbHVlLnNsaWNlKDApO1xyXG4gICAgY29uc3QgbGF5ZXJzVG9SZW1vdmUgPSBbXTtcclxuICAgIGxheWVycy5mb3JFYWNoKChsYXllcjogTGF5ZXIpID0+IHtcclxuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmdldExheWVySW5kZXgobGF5ZXIpO1xyXG4gICAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgIGxheWVyc1RvUmVtb3ZlLnB1c2gobGF5ZXIpO1xyXG4gICAgICAgIG5ld0xheWVycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBsYXllcnNUb1JlbW92ZS5mb3JFYWNoKChsYXllcjogTGF5ZXIpID0+IHRoaXMuZG9SZW1vdmVMYXllcihsYXllcikpO1xyXG4gICAgdGhpcy5zZXRMYXllcnMobmV3TGF5ZXJzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBhbGwgbGF5ZXJzXHJcbiAgICovXHJcbiAgcmVtb3ZlQWxsTGF5ZXJzKCkge1xyXG4gICAgdGhpcy5sYXllcnMuZm9yRWFjaCgobGF5ZXI6IExheWVyKSA9PiB0aGlzLmRvUmVtb3ZlTGF5ZXIobGF5ZXIpKTtcclxuICAgIHRoaXMubGF5ZXJzJC5uZXh0KFtdKTtcclxuICB9XHJcblxyXG4gIHJhaXNlTGF5ZXIobGF5ZXI6IExheWVyKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0TGF5ZXJJbmRleChsYXllcik7XHJcbiAgICBpZiAoaW5kZXggPiAwKSB7XHJcbiAgICAgIHRoaXMubW92ZUxheWVyKGxheWVyLCBpbmRleCwgaW5kZXggLSAxKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxvd2VyTGF5ZXIobGF5ZXI6IExheWVyKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0TGF5ZXJJbmRleChsYXllcik7XHJcbiAgICBpZiAoaW5kZXggPCB0aGlzLmxheWVycy5sZW5ndGggLSAxKSB7XHJcbiAgICAgIHRoaXMubW92ZUxheWVyKGxheWVyLCBpbmRleCwgaW5kZXggKyAxKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG1vdmVMYXllcihsYXllcjogTGF5ZXIsIGZyb206IG51bWJlciwgdG86IG51bWJlcikge1xyXG4gICAgY29uc3QgbGF5ZXJUbyA9IHRoaXMubGF5ZXJzW3RvXTtcclxuICAgIGNvbnN0IHpJbmRleFRvID0gbGF5ZXJUby56SW5kZXg7XHJcbiAgICBjb25zdCB6SW5kZXhGcm9tID0gbGF5ZXIuekluZGV4O1xyXG5cclxuICAgIGlmIChsYXllclRvLmJhc2VMYXllcikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGF5ZXIuekluZGV4ID0gekluZGV4VG87XHJcbiAgICBsYXllclRvLnpJbmRleCA9IHpJbmRleEZyb207XHJcblxyXG4gICAgdGhpcy5sYXllcnNbdG9dID0gbGF5ZXI7XHJcbiAgICB0aGlzLmxheWVyc1tmcm9tXSA9IGxheWVyVG87XHJcbiAgICB0aGlzLmxheWVycyQubmV4dCh0aGlzLmxheWVycy5zbGljZSgwKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYSBsYXllciB0byB0aGUgT0wgbWFwIGFuZCBzdGFydCB3YXRjaGluZy4gSWYgdGhlIGxheWVyIGlzIGFscmVhZHlcclxuICAgKiBhZGRlZCB0byB0aGlzIG1hcCwgbWFrZSBpdCB2aXNpYmxlIGJ1dCBkb24ndCBhZGQgaXQgb25lIGFnYWluLlxyXG4gICAqIEBwYXJhbSBsYXllciBMYXllclxyXG4gICAqIEByZXR1cm5zIFRoZSBsYXllciBhZGRlZCwgaWYgYW55XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkb0FkZExheWVyKGxheWVyOiBMYXllciwgbGVuZ3RoOiBudW1iZXIpIHtcclxuICAgIGlmIChsYXllci5iYXNlTGF5ZXIgJiYgbGF5ZXIudmlzaWJsZSkge1xyXG4gICAgICB0aGlzLmNoYW5nZUJhc2VMYXllcihsYXllcik7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZXhpc3RpbmdMYXllciA9IHRoaXMuZ2V0TGF5ZXJCeUlkKGxheWVyLmlkKTtcclxuICAgIGlmIChleGlzdGluZ0xheWVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgZXhpc3RpbmdMYXllci52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChsYXllci56SW5kZXggPT09IHVuZGVmaW5lZCB8fCBsYXllci56SW5kZXggPT09IDApIHtcclxuICAgICAgY29uc3Qgb2Zmc2V0ID0gbGF5ZXIuYmFzZUxheWVyID8gMSA6IDEwO1xyXG4gICAgICBsYXllci56SW5kZXggPSB0aGlzLmxheWVycy5sZW5ndGggKyBvZmZzZXQgKyBsZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgbGF5ZXIuc2V0TWFwKHRoaXMpO1xyXG4gICAgdGhpcy5sYXllcldhdGNoZXIud2F0Y2hMYXllcihsYXllcik7XHJcbiAgICB0aGlzLm9sLmFkZExheWVyKGxheWVyLm9sKTtcclxuXHJcbiAgICByZXR1cm4gbGF5ZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgYSBsYXllciBmcm9tIHRoZSBPTCBtYXAgYW5kIHN0b3Agd2F0Y2hpbmdcclxuICAgKiBAcGFyYW0gbGF5ZXIgTGF5ZXJcclxuICAgKi9cclxuICBwcml2YXRlIGRvUmVtb3ZlTGF5ZXIobGF5ZXI6IExheWVyKSB7XHJcbiAgICB0aGlzLmxheWVyV2F0Y2hlci51bndhdGNoTGF5ZXIobGF5ZXIpO1xyXG4gICAgdGhpcy5vbC5yZW1vdmVMYXllcihsYXllci5vbCk7XHJcbiAgICBsYXllci5zZXRNYXAodW5kZWZpbmVkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSB0aGUgbGF5ZXJzIG9ic2VydmFibGVcclxuICAgKiBAcGFyYW0gbGF5ZXJzIExheWVyc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgc2V0TGF5ZXJzKGxheWVyczogTGF5ZXJbXSkge1xyXG4gICAgdGhpcy5sYXllcnMkLm5leHQodGhpcy5zb3J0TGF5ZXJzQnlaSW5kZXgobGF5ZXJzKS5zbGljZSgwKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTb3J0IGxheWVycyBieSBkZXNjZW5kaW5nIHpJbmRleFxyXG4gICAqIEBwYXJhbSBsYXllcnMgQXJyYXkgb2YgbGF5ZXJzXHJcbiAgICogQHJldHVybnMgVGhlIG9yaWdpbmFsIGFycmF5LCBzb3J0ZWQgYnkgekluZGV4XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzb3J0TGF5ZXJzQnlaSW5kZXgobGF5ZXJzOiBMYXllcltdKSB7XHJcbiAgICAvLyBTb3J0IGJ5IGRlc2NlbmRpbmcgekluZGV4XHJcbiAgICByZXR1cm4gbGF5ZXJzLnNvcnQoXHJcbiAgICAgIChsYXllcjE6IExheWVyLCBsYXllcjI6IExheWVyKSA9PiBsYXllcjIuekluZGV4IC0gbGF5ZXIxLnpJbmRleFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBsYXllciBpbmRleCBpbiB0aGUgbWFwJ3MgaW5lbnIgYXJyYXkgb2YgbGF5ZXJzXHJcbiAgICogQHBhcmFtIGxheWVyIExheWVyXHJcbiAgICogQHJldHVybnMgVGhlIGxheWVyIGluZGV4XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRMYXllckluZGV4KGxheWVyOiBMYXllcikge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJzLmZpbmRJbmRleCgoX2xheWVyOiBMYXllcikgPT4gX2xheWVyID09PSBsYXllcik7XHJcbiAgfVxyXG5cclxuICAvLyBUT0RPOiBDcmVhdGUgYSBHZW9sb2NhdGlvbkNvbnRyb2xsZXIgd2l0aCBldmVyeXRoaW5nIGJlbG93XHJcbiAgZ2VvbG9jYXRlKHRyYWNrID0gZmFsc2UpIHtcclxuICAgIGxldCBmaXJzdCA9IHRydWU7XHJcbiAgICBpZiAodGhpcy5nZW9sb2NhdGlvbiQkKSB7XHJcbiAgICAgIHRyYWNrID0gdGhpcy5nZW9sb2NhdGlvbi5nZXRUcmFja2luZygpO1xyXG4gICAgICB0aGlzLnVuc3Vic2NyaWJlR2VvbG9jYXRlKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0YXJ0R2VvbG9jYXRpb24oKTtcclxuXHJcbiAgICB0aGlzLmdlb2xvY2F0aW9uJCQgPSB0aGlzLmdlb2xvY2F0aW9uJC5zdWJzY3JpYmUoZ2VvbG9jYXRpb24gPT4ge1xyXG4gICAgICBpZiAoIWdlb2xvY2F0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGFjY3VyYWN5ID0gZ2VvbG9jYXRpb24uZ2V0QWNjdXJhY3koKTtcclxuICAgICAgaWYgKGFjY3VyYWN5IDwgMTAwMDApIHtcclxuICAgICAgICBjb25zdCBnZW9tZXRyeSA9IGdlb2xvY2F0aW9uLmdldEFjY3VyYWN5R2VvbWV0cnkoKTtcclxuICAgICAgICBjb25zdCBleHRlbnQgPSBnZW9tZXRyeS5nZXRFeHRlbnQoKTtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB0aGlzLmdlb2xvY2F0aW9uRmVhdHVyZSAmJlxyXG4gICAgICAgICAgdGhpcy5vdmVybGF5LmRhdGFTb3VyY2Uub2wuZ2V0RmVhdHVyZUJ5SWQoXHJcbiAgICAgICAgICAgIHRoaXMuZ2VvbG9jYXRpb25GZWF0dXJlLmdldElkKClcclxuICAgICAgICAgIClcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHRoaXMub3ZlcmxheS5kYXRhU291cmNlLm9sLnJlbW92ZUZlYXR1cmUodGhpcy5nZW9sb2NhdGlvbkZlYXR1cmUpO1xyXG4gICAgICAgICAgdGhpcy5idWZmZXIuZGF0YVNvdXJjZS5vbC5yZW1vdmVGZWF0dXJlKHRoaXMuYnVmZmVyRmVhdHVyZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2VvbG9jYXRpb25GZWF0dXJlID0gbmV3IG9sRmVhdHVyZSh7IGdlb21ldHJ5IH0pO1xyXG4gICAgICAgIHRoaXMuZ2VvbG9jYXRpb25GZWF0dXJlLnNldElkKCdnZW9sb2NhdGlvbkZlYXR1cmUnKTtcclxuICAgICAgICB0aGlzLm92ZXJsYXkuYWRkT2xGZWF0dXJlKHRoaXMuZ2VvbG9jYXRpb25GZWF0dXJlKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub2wuZ2V0VmlldygpLm9wdGlvbnNfLmJ1ZmZlcikge1xyXG4gICAgICAgICAgY29uc3QgYnVmZmVyUmFkaXVzID0gdGhpcy5vbC5nZXRWaWV3KCkub3B0aW9uc18uYnVmZmVyLmJ1ZmZlclJhZGl1cztcclxuICAgICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gZ2VvbG9jYXRpb24uZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgIHRoaXMuYnVmZmVyR2VvbSA9IG5ldyBvbENpcmNsZShjb29yZGluYXRlcywgYnVmZmVyUmFkaXVzKTtcclxuICAgICAgICAgIGNvbnN0IGJ1ZmZlclN0cm9rZSA9IHRoaXMub2wuZ2V0VmlldygpLm9wdGlvbnNfLmJ1ZmZlci5idWZmZXJTdHJva2U7XHJcbiAgICAgICAgICBjb25zdCBidWZmZXJGaWxsID0gdGhpcy5vbC5nZXRWaWV3KCkub3B0aW9uc18uYnVmZmVyLmJ1ZmZlckZpbGw7XHJcblxyXG4gICAgICAgICAgbGV0IGJ1ZmZlclRleHQ7XHJcbiAgICAgICAgICBpZiAodGhpcy5vbC5nZXRWaWV3KCkub3B0aW9uc18uYnVmZmVyLnNob3dCdWZmZXJSYWRpdXMpIHtcclxuICAgICAgICAgICAgYnVmZmVyVGV4dCA9IGJ1ZmZlclJhZGl1cy50b1N0cmluZygpICsgJ20nO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYnVmZmVyVGV4dCA9ICcnO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRoaXMuYnVmZmVyRmVhdHVyZSA9IG5ldyBvbEZlYXR1cmUodGhpcy5idWZmZXJHZW9tKTtcclxuICAgICAgICAgIHRoaXMuYnVmZmVyRmVhdHVyZS5zZXRJZCgnYnVmZmVyRmVhdHVyZScpO1xyXG4gICAgICAgICAgdGhpcy5idWZmZXJGZWF0dXJlLnNldCgnYnVmZmVyU3Ryb2tlJywgYnVmZmVyU3Ryb2tlKTtcclxuICAgICAgICAgIHRoaXMuYnVmZmVyRmVhdHVyZS5zZXQoJ2J1ZmZlckZpbGwnLCBidWZmZXJGaWxsKTtcclxuICAgICAgICAgIHRoaXMuYnVmZmVyRmVhdHVyZS5zZXQoJ2J1ZmZlclRleHQnLCBidWZmZXJUZXh0KTtcclxuICAgICAgICAgIHRoaXMuYnVmZmVyLmFkZE9sRmVhdHVyZSh0aGlzLmJ1ZmZlckZlYXR1cmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZmlyc3QpIHtcclxuICAgICAgICAgIHRoaXMudmlld0NvbnRyb2xsZXIuem9vbVRvRXh0ZW50KGV4dGVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKGZpcnN0KSB7XHJcbiAgICAgICAgY29uc3QgdmlldyA9IHRoaXMub2wuZ2V0VmlldygpO1xyXG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gZ2VvbG9jYXRpb24uZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICB2aWV3LnNldENlbnRlcihjb29yZGluYXRlcyk7XHJcbiAgICAgICAgdmlldy5zZXRab29tKDE0KTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHJhY2spIHtcclxuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlR2VvbG9jYXRlKCk7XHJcbiAgICAgIH1cclxuICAgICAgZmlyc3QgPSBmYWxzZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdW5zdWJzY3JpYmVHZW9sb2NhdGUoKSB7XHJcbiAgICB0aGlzLnN0b3BHZW9sb2NhdGlvbigpO1xyXG4gICAgaWYgKHRoaXMuZ2VvbG9jYXRpb24kJCkge1xyXG4gICAgICB0aGlzLmdlb2xvY2F0aW9uJCQudW5zdWJzY3JpYmUoKTtcclxuICAgICAgdGhpcy5nZW9sb2NhdGlvbiQkID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdGFydEdlb2xvY2F0aW9uKCkge1xyXG4gICAgaWYgKCF0aGlzLmdlb2xvY2F0aW9uKSB7XHJcbiAgICAgIHRoaXMuZ2VvbG9jYXRpb24gPSBuZXcgb2xHZW9sb2NhdGlvbih7XHJcbiAgICAgICAgdHJhY2tpbmdPcHRpb25zOiB7XHJcbiAgICAgICAgICBlbmFibGVIaWdoQWNjdXJhY3k6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHByb2plY3Rpb246IHRoaXMucHJvamVjdGlvbixcclxuICAgICAgICB0cmFja2luZzogdHJ1ZVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMuZ2VvbG9jYXRpb24ub24oJ2NoYW5nZScsIGV2dCA9PiB7XHJcbiAgICAgICAgdGhpcy5nZW9sb2NhdGlvbiQubmV4dCh0aGlzLmdlb2xvY2F0aW9uKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmdlb2xvY2F0aW9uLnNldFRyYWNraW5nKHRydWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdG9wR2VvbG9jYXRpb24oKSB7XHJcbiAgICBpZiAodGhpcy5nZW9sb2NhdGlvbikge1xyXG4gICAgICB0aGlzLmdlb2xvY2F0aW9uLnNldFRyYWNraW5nKGZhbHNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uT2ZmbGluZVRvZ2dsZShvZmZsaW5lOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLm9mZmxpbmVCdXR0b25Ub2dnbGUkLm5leHQob2ZmbGluZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==