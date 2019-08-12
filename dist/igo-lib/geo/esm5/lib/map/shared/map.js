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
     * @param {?} feature
     * @return {?}
     */
    IgoMap.prototype.addBuffer = /**
     * @param {?} feature
     * @return {?}
     */
    function (feature) {
        /** @type {?} */
        var geometry = feature.getGeometry();
        if (geometry === null) {
            return;
        }
        this.bufferDataSource.ol.addFeature(feature);
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
            if (accuracy < 4140000) {
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
                    console.log(_this.bufferFeature);
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
    IgoMap.prototype.bufferStyle;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL21hcC9zaGFyZWQvbWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxLQUFLLE1BQU0sUUFBUSxDQUFDO0FBQzNCLE9BQU8sTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUM3QixPQUFPLFNBQVMsTUFBTSxZQUFZLENBQUM7QUFDbkMsT0FBTyxhQUFhLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxvQkFBb0IsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLGtCQUFrQixNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sS0FBSyxNQUFNLE1BQU0sU0FBUyxDQUFDO0FBQ2xDLE9BQU8sS0FBSyxPQUFPLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sS0FBSyxhQUFhLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxRQUFRLE1BQU0sZ0JBQWdCLENBQUM7QUFHdEMsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQzFCLE9BQU8sRUFBRSxlQUFlLEVBQXlCLE1BQU0sTUFBTSxDQUFDO0FBSzlELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUV2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFRdEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7OztBQUt2RDs7OztJQWdDRSxnQkFBWSxPQUFvQjtRQTlCekIsWUFBTyxHQUFHLElBQUksZUFBZSxDQUFVLEVBQUUsQ0FBQyxDQUFDO1FBRTNDLGlCQUFZLEdBQUcsSUFBSSxlQUFlLENBQWdCLFNBQVMsQ0FBQyxDQUFDO1FBZ0I1RCxtQkFBYyxHQUF3QjtZQUM1QyxRQUFRLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO1NBQ2pDLENBQUM7UUFXQSxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFN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Q3BCLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQztJQUNILGFBQUM7QUFBRCxDQUFDLEFBeGFELElBd2FDOzs7Ozs7SUF2YUMsb0JBQWlCOztJQUNqQix5QkFBa0Q7O0lBQ2xELHlCQUF1Qzs7SUFDdkMsOEJBQW9FOztJQUNwRSxvQ0FBcUM7O0lBQ3JDLDRCQUE0Qjs7SUFDNUIsK0JBQWdDOztJQUNoQyx3QkFBdUI7O0lBQ3ZCLHlCQUF3Qjs7SUFDeEIsZ0NBQXlDOztJQUV6Qyw2QkFBa0M7O0lBQ2xDLGtDQUEyQzs7Ozs7SUFFM0MsOEJBQW1DOzs7OztJQUNuQyw2QkFBbUM7Ozs7O0lBQ25DLCtCQUFvQzs7Ozs7SUFFcEMseUJBQTRCOzs7OztJQUM1QixnQ0FFRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvbE1hcCBmcm9tICdvbC9NYXAnO1xyXG5pbXBvcnQgb2xWaWV3IGZyb20gJ29sL1ZpZXcnO1xyXG5pbXBvcnQgb2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5pbXBvcnQgb2xHZW9sb2NhdGlvbiBmcm9tICdvbC9HZW9sb2NhdGlvbic7XHJcbmltcG9ydCBvbENvbnRyb2xBdHRyaWJ1dGlvbiBmcm9tICdvbC9jb250cm9sL0F0dHJpYnV0aW9uJztcclxuaW1wb3J0IG9sQ29udHJvbFNjYWxlTGluZSBmcm9tICdvbC9jb250cm9sL1NjYWxlTGluZSc7XHJcbmltcG9ydCAqIGFzIG9scHJvaiBmcm9tICdvbC9wcm9qJztcclxuaW1wb3J0ICogYXMgb2xwcm9qNCBmcm9tICdvbC9wcm9qL3Byb2o0JztcclxuaW1wb3J0IE9sUHJvamVjdGlvbiBmcm9tICdvbC9wcm9qL1Byb2plY3Rpb24nO1xyXG5pbXBvcnQgKiBhcyBvbGludGVyYWN0aW9uIGZyb20gJ29sL2ludGVyYWN0aW9uJztcclxuaW1wb3J0IG9sQ2lyY2xlIGZyb20gJ29sL2dlb20vQ2lyY2xlJztcclxuaW1wb3J0ICogYXMgb2xzdHlsZSBmcm9tICdvbC9zdHlsZSc7XHJcblxyXG5pbXBvcnQgcHJvajQgZnJvbSAncHJvajQnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgU3ViamVjdFN0YXR1cyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7IExheWVyLCBWZWN0b3JMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMnO1xyXG5pbXBvcnQgeyBPdmVybGF5IH0gZnJvbSAnLi4vLi4vb3ZlcmxheS9zaGFyZWQvb3ZlcmxheSc7XHJcblxyXG5pbXBvcnQgeyBMYXllcldhdGNoZXIgfSBmcm9tICcuLi91dGlscy9sYXllci13YXRjaGVyJztcclxuaW1wb3J0IHtcclxuICBNYXBWaWV3T3B0aW9ucyxcclxuICBNYXBPcHRpb25zLFxyXG4gIE1hcEF0dHJpYnV0aW9uT3B0aW9ucyxcclxuICBNYXBTY2FsZUxpbmVPcHRpb25zLFxyXG4gIE1hcEV4dGVudFxyXG59IGZyb20gJy4vbWFwLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IE1hcFZpZXdDb250cm9sbGVyIH0gZnJvbSAnLi9jb250cm9sbGVycy92aWV3JztcclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9mZWF0dXJlLWRhdGFzb3VyY2UnO1xyXG5cclxuLy8gVE9ETzogVGhpcyBjbGFzcyBpcyBtZXNzeS4gQ2xlYXJseSBkZWZpbmUgaXQncyBzY29wZSBhbmQgdGhlIG1hcCBicm93c2VyJ3MuXHJcbi8vIE1vdmUgc29tZSBzdHVmZiBpbnRvIGNvbnRyb2xsZXJzLlxyXG5leHBvcnQgY2xhc3MgSWdvTWFwIHtcclxuICBwdWJsaWMgb2w6IG9sTWFwO1xyXG4gIHB1YmxpYyBsYXllcnMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxMYXllcltdPihbXSk7XHJcbiAgcHVibGljIHN0YXR1cyQ6IFN1YmplY3Q8U3ViamVjdFN0YXR1cz47XHJcbiAgcHVibGljIGdlb2xvY2F0aW9uJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8b2xHZW9sb2NhdGlvbj4odW5kZWZpbmVkKTtcclxuICBwdWJsaWMgZ2VvbG9jYXRpb25GZWF0dXJlOiBvbEZlYXR1cmU7XHJcbiAgcHVibGljIGJ1ZmZlckdlb206IG9sQ2lyY2xlO1xyXG4gIHB1YmxpYyBidWZmZXJGZWF0dXJlOiBvbEZlYXR1cmU7XHJcbiAgcHVibGljIGJ1ZmZlcjogT3ZlcmxheTtcclxuICBwdWJsaWMgb3ZlcmxheTogT3ZlcmxheTtcclxuICBwdWJsaWMgdmlld0NvbnRyb2xsZXI6IE1hcFZpZXdDb250cm9sbGVyO1xyXG5cclxuICBwdWJsaWMgYnVmZmVyU3R5bGU6IG9sc3R5bGUuU3R5bGU7XHJcbiAgcHVibGljIGJ1ZmZlckRhdGFTb3VyY2U6IEZlYXR1cmVEYXRhU291cmNlO1xyXG5cclxuICBwcml2YXRlIGxheWVyV2F0Y2hlcjogTGF5ZXJXYXRjaGVyO1xyXG4gIHByaXZhdGUgZ2VvbG9jYXRpb246IG9sR2VvbG9jYXRpb247XHJcbiAgcHJpdmF0ZSBnZW9sb2NhdGlvbiQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIHByaXZhdGUgb3B0aW9uczogTWFwT3B0aW9ucztcclxuICBwcml2YXRlIGRlZmF1bHRPcHRpb25zOiBQYXJ0aWFsPE1hcE9wdGlvbnM+ID0ge1xyXG4gICAgY29udHJvbHM6IHsgYXR0cmlidXRpb246IGZhbHNlIH1cclxuICB9O1xyXG5cclxuICBnZXQgbGF5ZXJzKCk6IExheWVyW10ge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJzJC52YWx1ZTtcclxuICB9XHJcblxyXG4gIGdldCBwcm9qZWN0aW9uKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy52aWV3Q29udHJvbGxlci5nZXRPbFByb2plY3Rpb24oKS5nZXRDb2RlKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zPzogTWFwT3B0aW9ucykge1xyXG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICB0aGlzLmxheWVyV2F0Y2hlciA9IG5ldyBMYXllcldhdGNoZXIoKTtcclxuICAgIHRoaXMuc3RhdHVzJCA9IHRoaXMubGF5ZXJXYXRjaGVyLnN0YXR1cyQ7XHJcbiAgICBvbHByb2o0LnJlZ2lzdGVyKHByb2o0KTtcclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgaW5pdCgpIHtcclxuICAgIGNvbnN0IGNvbnRyb2xzID0gW107XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRyb2xzKSB7XHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuY29udHJvbHMuYXR0cmlidXRpb24pIHtcclxuICAgICAgICBjb25zdCBhdHRyaWJ1dGlvbk9wdCA9ICh0aGlzLm9wdGlvbnMuY29udHJvbHMuYXR0cmlidXRpb24gPT09IHRydWVcclxuICAgICAgICAgID8ge31cclxuICAgICAgICAgIDogdGhpcy5vcHRpb25zLmNvbnRyb2xzLmF0dHJpYnV0aW9uKSBhcyBNYXBBdHRyaWJ1dGlvbk9wdGlvbnM7XHJcbiAgICAgICAgY29udHJvbHMucHVzaChuZXcgb2xDb250cm9sQXR0cmlidXRpb24oYXR0cmlidXRpb25PcHQpKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRyb2xzLnNjYWxlTGluZSkge1xyXG4gICAgICAgIGNvbnN0IHNjYWxlTGluZU9wdCA9ICh0aGlzLm9wdGlvbnMuY29udHJvbHMuc2NhbGVMaW5lID09PSB0cnVlXHJcbiAgICAgICAgICA/IHt9XHJcbiAgICAgICAgICA6IHRoaXMub3B0aW9ucy5jb250cm9scy5zY2FsZUxpbmUpIGFzIE1hcFNjYWxlTGluZU9wdGlvbnM7XHJcbiAgICAgICAgY29udHJvbHMucHVzaChuZXcgb2xDb250cm9sU2NhbGVMaW5lKHNjYWxlTGluZU9wdCkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgaW50ZXJhY3Rpb25zID0ge307XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmludGVyYWN0aW9ucyA9PT0gZmFsc2UpIHtcclxuICAgICAgaW50ZXJhY3Rpb25zID0ge1xyXG4gICAgICAgIGFsdFNoaWZ0RHJhZ1JvdGF0ZTogZmFsc2UsXHJcbiAgICAgICAgZG91YmxlQ2xpY2tab29tOiBmYWxzZSxcclxuICAgICAgICBrZXlib2FyZDogZmFsc2UsXHJcbiAgICAgICAgbW91c2VXaGVlbFpvb206IGZhbHNlLFxyXG4gICAgICAgIHNoaWZ0RHJhZ1pvb206IGZhbHNlLFxyXG4gICAgICAgIGRyYWdQYW46IGZhbHNlLFxyXG4gICAgICAgIHBpbmNoUm90YXRlOiBmYWxzZSxcclxuICAgICAgICBwaW5jaFpvb206IGZhbHNlXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vbCA9IG5ldyBvbE1hcCh7XHJcbiAgICAgIGludGVyYWN0aW9uczogb2xpbnRlcmFjdGlvbi5kZWZhdWx0cyhpbnRlcmFjdGlvbnMpLFxyXG4gICAgICBjb250cm9sc1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5zZXRWaWV3KHRoaXMub3B0aW9ucy52aWV3IHx8IHt9KTtcclxuICAgIHRoaXMudmlld0NvbnRyb2xsZXIgPSBuZXcgTWFwVmlld0NvbnRyb2xsZXIoe1xyXG4gICAgICBzdGF0ZUhpc3Rvcnk6IHRydWVcclxuICAgIH0pO1xyXG4gICAgdGhpcy52aWV3Q29udHJvbGxlci5zZXRPbE1hcCh0aGlzLm9sKTtcclxuICAgIHRoaXMub3ZlcmxheSA9IG5ldyBPdmVybGF5KHRoaXMpO1xyXG4gICAgdGhpcy5idWZmZXIgPSBuZXcgT3ZlcmxheSh0aGlzKTtcclxuICB9XHJcblxyXG4gIHNldFRhcmdldChpZDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLm9sLnNldFRhcmdldChpZCk7XHJcbiAgICBpZiAoaWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmxheWVyV2F0Y2hlci5zdWJzY3JpYmUoKCkgPT4ge30sIG51bGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5sYXllcldhdGNoZXIudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZVZpZXcob3B0aW9uczogTWFwVmlld09wdGlvbnMpIHtcclxuICAgIGNvbnN0IGN1cnJlbnRWaWV3ID0gdGhpcy5vbC5nZXRWaWV3KCk7XHJcbiAgICBjb25zdCB2aWV3T3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgIHtcclxuICAgICAgICB6b29tOiBjdXJyZW50Vmlldy5nZXRab29tKClcclxuICAgICAgfSxcclxuICAgICAgY3VycmVudFZpZXcuZ2V0UHJvcGVydGllcygpXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuc2V0VmlldyhPYmplY3QuYXNzaWduKHZpZXdPcHRpb25zLCBvcHRpb25zKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIG1hcCB2aWV3XHJcbiAgICogQHBhcmFtIG9wdGlvbnMgTWFwIHZpZXcgb3B0aW9uc1xyXG4gICAqL1xyXG4gIHNldFZpZXcob3B0aW9uczogTWFwVmlld09wdGlvbnMpIHtcclxuICAgIGlmICh0aGlzLnZpZXdDb250cm9sbGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy52aWV3Q29udHJvbGxlci5jbGVhclN0YXRlSGlzdG9yeSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHZpZXcgPSBuZXcgb2xWaWV3KG9wdGlvbnMpO1xyXG4gICAgdGhpcy5vbC5zZXRWaWV3KHZpZXcpO1xyXG5cclxuICAgIHRoaXMudW5zdWJzY3JpYmVHZW9sb2NhdGUoKTtcclxuICAgIGlmIChvcHRpb25zKSB7XHJcbiAgICAgIGlmIChvcHRpb25zLmNlbnRlcikge1xyXG4gICAgICAgIGNvbnN0IHByb2plY3Rpb24gPSB2aWV3LmdldFByb2plY3Rpb24oKS5nZXRDb2RlKCk7XHJcbiAgICAgICAgY29uc3QgY2VudGVyID0gb2xwcm9qLmZyb21Mb25MYXQob3B0aW9ucy5jZW50ZXIsIHByb2plY3Rpb24pO1xyXG4gICAgICAgIHZpZXcuc2V0Q2VudGVyKGNlbnRlcik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChvcHRpb25zLmdlb2xvY2F0ZSkge1xyXG4gICAgICAgIHRoaXMuZ2VvbG9jYXRlKHRydWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBUT0RPOiBNb3ZlIHRvIFZpZXdDb250cm9sbGVyIGFuZCB1cGRhdGUgZXZlcnkgcGxhY2UgaXQncyB1c2VkXHJcbiAgZ2V0Q2VudGVyKHByb2plY3Rpb24/OiBzdHJpbmcgfCBPbFByb2plY3Rpb24pOiBbbnVtYmVyLCBudW1iZXJdIHtcclxuICAgIHJldHVybiB0aGlzLnZpZXdDb250cm9sbGVyLmdldENlbnRlcigpO1xyXG4gIH1cclxuXHJcbiAgLy8gVE9ETzogTW92ZSB0byBWaWV3Q29udHJvbGxlciBhbmQgdXBkYXRlIGV2ZXJ5IHBsYWNlIGl0J3MgdXNlZFxyXG4gIGdldEV4dGVudChwcm9qZWN0aW9uPzogc3RyaW5nIHwgT2xQcm9qZWN0aW9uKTogTWFwRXh0ZW50IHtcclxuICAgIHJldHVybiB0aGlzLnZpZXdDb250cm9sbGVyLmdldEV4dGVudCgpO1xyXG4gIH1cclxuXHJcbiAgLy8gVE9ETzogTW92ZSB0byBWaWV3Q29udHJvbGxlciBhbmQgdXBkYXRlIGV2ZXJ5IHBsYWNlIGl0J3MgdXNlZFxyXG4gIGdldFpvb20oKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLnZpZXdDb250cm9sbGVyLmdldFpvb20oKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZUJhc2VMYXllcihiYXNlTGF5ZXI6IExheWVyKSB7XHJcbiAgICBpZiAoIWJhc2VMYXllcikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBibCBvZiB0aGlzLmdldEJhc2VMYXllcnMoKSkge1xyXG4gICAgICBibC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgYmFzZUxheWVyLnZpc2libGUgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgZ2V0QmFzZUxheWVycygpOiBMYXllcltdIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVycy5maWx0ZXIoKGxheWVyOiBMYXllcikgPT4gbGF5ZXIuYmFzZUxheWVyID09PSB0cnVlKTtcclxuICB9XHJcblxyXG4gIGdldExheWVyQnlJZChpZDogc3RyaW5nKTogTGF5ZXIge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJzLmZpbmQoKGxheWVyOiBMYXllcikgPT4gbGF5ZXIuaWQgJiYgbGF5ZXIuaWQgPT09IGlkKTtcclxuICB9XHJcblxyXG4gIGdldExheWVyQnlBbGlhcyhhbGlhczogc3RyaW5nKTogTGF5ZXIge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJzLmZpbmQoKGxheWVyOiBMYXllcikgPT4gbGF5ZXIuYWxpYXMgJiYgbGF5ZXIuYWxpYXMgPT09IGFsaWFzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhIHNpbmdsZSBsYXllclxyXG4gICAqIEBwYXJhbSBsYXllciBMYXllciB0byBhZGRcclxuICAgKiBAcGFyYW0gcHVzaCBERVBSRUNBVEVEXHJcbiAgICovXHJcbiAgYWRkTGF5ZXIobGF5ZXI6IExheWVyLCBwdXNoID0gdHJ1ZSkge1xyXG4gICAgdGhpcy5hZGRMYXllcnMoW2xheWVyXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgbWFueSBsYXllcnNcclxuICAgKiBAcGFyYW0gbGF5ZXJzIExheWVycyB0byBhZGRcclxuICAgKiBAcGFyYW0gcHVzaCBERVBSRUNBVEVEXHJcbiAgICovXHJcbiAgYWRkTGF5ZXJzKGxheWVyczogTGF5ZXJbXSwgcHVzaCA9IHRydWUpIHtcclxuICAgIGNvbnN0IGFkZGVkTGF5ZXJzID0gbGF5ZXJzXHJcbiAgICAgIC5tYXAoKGxheWVyOiBMYXllcikgPT4gdGhpcy5kb0FkZExheWVyKGxheWVyKSlcclxuICAgICAgLmZpbHRlcigobGF5ZXI6IExheWVyIHwgdW5kZWZpbmVkKSA9PiBsYXllciAhPT0gdW5kZWZpbmVkKTtcclxuICAgIHRoaXMuc2V0TGF5ZXJzKFtdLmNvbmNhdCh0aGlzLmxheWVycywgYWRkZWRMYXllcnMpKTtcclxuICB9XHJcblxyXG4gIGFkZEJ1ZmZlcihmZWF0dXJlOiBvbEZlYXR1cmUpIHtcclxuICAgIGNvbnN0IGdlb21ldHJ5ID0gZmVhdHVyZS5nZXRHZW9tZXRyeSgpO1xyXG4gICAgaWYgKGdlb21ldHJ5ID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmJ1ZmZlckRhdGFTb3VyY2Uub2wuYWRkRmVhdHVyZShmZWF0dXJlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBhIHNpbmdsZSBsYXllclxyXG4gICAqIEBwYXJhbSBsYXllciBMYXllciB0byByZW1vdmVcclxuICAgKi9cclxuICByZW1vdmVMYXllcihsYXllcjogTGF5ZXIpIHtcclxuICAgIHRoaXMucmVtb3ZlTGF5ZXJzKFtsYXllcl0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIG1hbnkgbGF5ZXJzXHJcbiAgICogQHBhcmFtIGxheWVycyBMYXllcnMgdG8gcmVtb3ZlXHJcbiAgICovXHJcbiAgcmVtb3ZlTGF5ZXJzKGxheWVyczogTGF5ZXJbXSkge1xyXG4gICAgY29uc3QgbmV3TGF5ZXJzID0gdGhpcy5sYXllcnMkLnZhbHVlLnNsaWNlKDApO1xyXG4gICAgY29uc3QgbGF5ZXJzVG9SZW1vdmUgPSBbXTtcclxuICAgIGxheWVycy5mb3JFYWNoKChsYXllcjogTGF5ZXIpID0+IHtcclxuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmdldExheWVySW5kZXgobGF5ZXIpO1xyXG4gICAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgIGxheWVyc1RvUmVtb3ZlLnB1c2gobGF5ZXIpO1xyXG4gICAgICAgIG5ld0xheWVycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBsYXllcnNUb1JlbW92ZS5mb3JFYWNoKChsYXllcjogTGF5ZXIpID0+IHRoaXMuZG9SZW1vdmVMYXllcihsYXllcikpO1xyXG4gICAgdGhpcy5zZXRMYXllcnMobmV3TGF5ZXJzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBhbGwgbGF5ZXJzXHJcbiAgICovXHJcbiAgcmVtb3ZlQWxsTGF5ZXJzKCkge1xyXG4gICAgdGhpcy5sYXllcnMuZm9yRWFjaCgobGF5ZXI6IExheWVyKSA9PiB0aGlzLmRvUmVtb3ZlTGF5ZXIobGF5ZXIpKTtcclxuICAgIHRoaXMubGF5ZXJzJC5uZXh0KFtdKTtcclxuICB9XHJcblxyXG4gIHJhaXNlTGF5ZXIobGF5ZXI6IExheWVyKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0TGF5ZXJJbmRleChsYXllcik7XHJcbiAgICBpZiAoaW5kZXggPiAwKSB7XHJcbiAgICAgIHRoaXMubW92ZUxheWVyKGxheWVyLCBpbmRleCwgaW5kZXggLSAxKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxvd2VyTGF5ZXIobGF5ZXI6IExheWVyKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0TGF5ZXJJbmRleChsYXllcik7XHJcbiAgICBpZiAoaW5kZXggPCB0aGlzLmxheWVycy5sZW5ndGggLSAxKSB7XHJcbiAgICAgIHRoaXMubW92ZUxheWVyKGxheWVyLCBpbmRleCwgaW5kZXggKyAxKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG1vdmVMYXllcihsYXllcjogTGF5ZXIsIGZyb206IG51bWJlciwgdG86IG51bWJlcikge1xyXG4gICAgY29uc3QgbGF5ZXJUbyA9IHRoaXMubGF5ZXJzW3RvXTtcclxuICAgIGNvbnN0IHpJbmRleFRvID0gbGF5ZXJUby56SW5kZXg7XHJcbiAgICBjb25zdCB6SW5kZXhGcm9tID0gbGF5ZXIuekluZGV4O1xyXG5cclxuICAgIGxheWVyLnpJbmRleCA9IHpJbmRleFRvO1xyXG4gICAgbGF5ZXJUby56SW5kZXggPSB6SW5kZXhGcm9tO1xyXG5cclxuICAgIHRoaXMubGF5ZXJzW3RvXSA9IGxheWVyO1xyXG4gICAgdGhpcy5sYXllcnNbZnJvbV0gPSBsYXllclRvO1xyXG4gICAgdGhpcy5sYXllcnMkLm5leHQodGhpcy5sYXllcnMuc2xpY2UoMCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGEgbGF5ZXIgdG8gdGhlIE9MIG1hcCBhbmQgc3RhcnQgd2F0Y2hpbmcuIElmIHRoZSBsYXllciBpcyBhbHJlYWR5XHJcbiAgICogYWRkZWQgdG8gdGhpcyBtYXAsIG1ha2UgaXQgdmlzaWJsZSBidXQgZG9uJ3QgYWRkIGl0IG9uZSBhZ2Fpbi5cclxuICAgKiBAcGFyYW0gbGF5ZXIgTGF5ZXJcclxuICAgKiBAcmV0dXJucyBUaGUgbGF5ZXIgYWRkZWQsIGlmIGFueVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZG9BZGRMYXllcihsYXllcjogTGF5ZXIpIHtcclxuICAgIGlmIChsYXllci5iYXNlTGF5ZXIgJiYgbGF5ZXIudmlzaWJsZSkge1xyXG4gICAgICB0aGlzLmNoYW5nZUJhc2VMYXllcihsYXllcik7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZXhpc3RpbmdMYXllciA9IHRoaXMuZ2V0TGF5ZXJCeUlkKGxheWVyLmlkKTtcclxuICAgIGlmIChleGlzdGluZ0xheWVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgZXhpc3RpbmdMYXllci52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChsYXllci56SW5kZXggPT09IHVuZGVmaW5lZCB8fCBsYXllci56SW5kZXggPT09IDApIHtcclxuICAgICAgY29uc3Qgb2Zmc2V0ID0gbGF5ZXIuYmFzZUxheWVyID8gMSA6IDEwO1xyXG4gICAgICBsYXllci56SW5kZXggPSB0aGlzLmxheWVycy5sZW5ndGggKyBvZmZzZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgbGF5ZXIuc2V0TWFwKHRoaXMpO1xyXG4gICAgdGhpcy5sYXllcldhdGNoZXIud2F0Y2hMYXllcihsYXllcik7XHJcbiAgICB0aGlzLm9sLmFkZExheWVyKGxheWVyLm9sKTtcclxuXHJcbiAgICByZXR1cm4gbGF5ZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgYSBsYXllciBmcm9tIHRoZSBPTCBtYXAgYW5kIHN0b3Agd2F0Y2hpbmdcclxuICAgKiBAcGFyYW0gbGF5ZXIgTGF5ZXJcclxuICAgKi9cclxuICBwcml2YXRlIGRvUmVtb3ZlTGF5ZXIobGF5ZXI6IExheWVyKSB7XHJcbiAgICB0aGlzLmxheWVyV2F0Y2hlci51bndhdGNoTGF5ZXIobGF5ZXIpO1xyXG4gICAgdGhpcy5vbC5yZW1vdmVMYXllcihsYXllci5vbCk7XHJcbiAgICBsYXllci5zZXRNYXAodW5kZWZpbmVkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSB0aGUgbGF5ZXJzIG9ic2VydmFibGVcclxuICAgKiBAcGFyYW0gbGF5ZXJzIExheWVyc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgc2V0TGF5ZXJzKGxheWVyczogTGF5ZXJbXSkge1xyXG4gICAgdGhpcy5sYXllcnMkLm5leHQodGhpcy5zb3J0TGF5ZXJzQnlaSW5kZXgobGF5ZXJzKS5zbGljZSgwKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTb3J0IGxheWVycyBieSBkZXNjZW5kaW5nIHpJbmRleFxyXG4gICAqIEBwYXJhbSBsYXllcnMgQXJyYXkgb2YgbGF5ZXJzXHJcbiAgICogQHJldHVybnMgVGhlIG9yaWdpbmFsIGFycmF5LCBzb3J0ZWQgYnkgekluZGV4XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzb3J0TGF5ZXJzQnlaSW5kZXgobGF5ZXJzOiBMYXllcltdKSB7XHJcbiAgICAvLyBTb3J0IGJ5IGRlc2NlbmRpbmcgekluZGV4XHJcbiAgICByZXR1cm4gbGF5ZXJzLnNvcnQoKGxheWVyMTogTGF5ZXIsIGxheWVyMjogTGF5ZXIpID0+IGxheWVyMi56SW5kZXggLSBsYXllcjEuekluZGV4KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBsYXllciBpbmRleCBpbiB0aGUgbWFwJ3MgaW5lbnIgYXJyYXkgb2YgbGF5ZXJzXHJcbiAgICogQHBhcmFtIGxheWVyIExheWVyXHJcbiAgICogQHJldHVybnMgVGhlIGxheWVyIGluZGV4XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRMYXllckluZGV4KGxheWVyOiBMYXllcikge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJzLmZpbmRJbmRleCgoX2xheWVyOiBMYXllcikgPT4gX2xheWVyID09PSBsYXllcik7XHJcbiAgfVxyXG5cclxuICAvLyBUT0RPOiBDcmVhdGUgYSBHZW9sb2NhdGlvbkNvbnRyb2xsZXIgd2l0aCBldmVyeXRoaW5nIGJlbG93XHJcbiAgZ2VvbG9jYXRlKHRyYWNrID0gZmFsc2UpIHtcclxuICAgIGxldCBmaXJzdCA9IHRydWU7XHJcbiAgICBpZiAodGhpcy5nZW9sb2NhdGlvbiQkKSB7XHJcbiAgICAgIHRyYWNrID0gdGhpcy5nZW9sb2NhdGlvbi5nZXRUcmFja2luZygpO1xyXG4gICAgICB0aGlzLnVuc3Vic2NyaWJlR2VvbG9jYXRlKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0YXJ0R2VvbG9jYXRpb24oKTtcclxuXHJcbiAgICB0aGlzLmdlb2xvY2F0aW9uJCQgPSB0aGlzLmdlb2xvY2F0aW9uJC5zdWJzY3JpYmUoZ2VvbG9jYXRpb24gPT4ge1xyXG4gICAgICBpZiAoIWdlb2xvY2F0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGFjY3VyYWN5ID0gZ2VvbG9jYXRpb24uZ2V0QWNjdXJhY3koKTtcclxuICAgICAgaWYgKGFjY3VyYWN5IDwgNDE0MDAwMCkge1xyXG4gICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gZ2VvbG9jYXRpb24uZ2V0QWNjdXJhY3lHZW9tZXRyeSgpO1xyXG4gICAgICAgIGNvbnN0IGV4dGVudCA9IGdlb21ldHJ5LmdldEV4dGVudCgpO1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHRoaXMuZ2VvbG9jYXRpb25GZWF0dXJlICYmXHJcbiAgICAgICAgICB0aGlzLm92ZXJsYXkuZGF0YVNvdXJjZS5vbC5nZXRGZWF0dXJlQnlJZChcclxuICAgICAgICAgICAgdGhpcy5nZW9sb2NhdGlvbkZlYXR1cmUuZ2V0SWQoKVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgdGhpcy5vdmVybGF5LmRhdGFTb3VyY2Uub2wucmVtb3ZlRmVhdHVyZSh0aGlzLmdlb2xvY2F0aW9uRmVhdHVyZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2VvbG9jYXRpb25GZWF0dXJlID0gbmV3IG9sRmVhdHVyZSh7IGdlb21ldHJ5IH0pO1xyXG4gICAgICAgIHRoaXMuZ2VvbG9jYXRpb25GZWF0dXJlLnNldElkKCdnZW9sb2NhdGlvbkZlYXR1cmUnKTtcclxuICAgICAgICB0aGlzLm92ZXJsYXkuYWRkT2xGZWF0dXJlKHRoaXMuZ2VvbG9jYXRpb25GZWF0dXJlKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub2wuZ2V0VmlldygpLm9wdGlvbnNfLmJ1ZmZlcikge1xyXG4gICAgICAgICAgY29uc3QgYnVmZmVyUmFkaXVzID0gdGhpcy5vbC5nZXRWaWV3KCkub3B0aW9uc18uYnVmZmVyLmJ1ZmZlclJhZGl1cztcclxuICAgICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gZ2VvbG9jYXRpb24uZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgIHRoaXMuYnVmZmVyR2VvbSA9IG5ldyBvbENpcmNsZShjb29yZGluYXRlcywgYnVmZmVyUmFkaXVzKTtcclxuICAgICAgICAgIGNvbnN0IGJ1ZmZlclN0cm9rZSA9IHRoaXMub2wuZ2V0VmlldygpLm9wdGlvbnNfLmJ1ZmZlci5idWZmZXJTdHJva2U7XHJcbiAgICAgICAgICBjb25zdCBidWZmZXJGaWxsID0gdGhpcy5vbC5nZXRWaWV3KCkub3B0aW9uc18uYnVmZmVyLmJ1ZmZlckZpbGw7XHJcblxyXG4gICAgICAgICAgbGV0IGJ1ZmZlclRleHQ7XHJcbiAgICAgICAgICBpZiAodGhpcy5vbC5nZXRWaWV3KCkub3B0aW9uc18uYnVmZmVyLnNob3dCdWZmZXJSYWRpdXMpIHtcclxuICAgICAgICAgICAgYnVmZmVyVGV4dCA9IGJ1ZmZlclJhZGl1cy50b1N0cmluZygpICsgJ20nO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYnVmZmVyVGV4dCA9ICcnO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRoaXMuYnVmZmVyRmVhdHVyZSA9IG5ldyBvbEZlYXR1cmUodGhpcy5idWZmZXJHZW9tKTtcclxuICAgICAgICAgIHRoaXMuYnVmZmVyRmVhdHVyZS5zZXRJZCgnYnVmZmVyRmVhdHVyZScpO1xyXG4gICAgICAgICAgdGhpcy5idWZmZXJGZWF0dXJlLnNldCgnYnVmZmVyU3Ryb2tlJywgYnVmZmVyU3Ryb2tlKTtcclxuICAgICAgICAgIHRoaXMuYnVmZmVyRmVhdHVyZS5zZXQoJ2J1ZmZlckZpbGwnLCBidWZmZXJGaWxsKTtcclxuICAgICAgICAgIHRoaXMuYnVmZmVyRmVhdHVyZS5zZXQoJ2J1ZmZlclRleHQnLCBidWZmZXJUZXh0KTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYnVmZmVyRmVhdHVyZSk7XHJcbiAgICAgICAgICB0aGlzLmJ1ZmZlci5hZGRPbEZlYXR1cmUodGhpcy5idWZmZXJGZWF0dXJlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChmaXJzdCkge1xyXG4gICAgICAgICAgdGhpcy52aWV3Q29udHJvbGxlci56b29tVG9FeHRlbnQoZXh0ZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAoZmlyc3QpIHtcclxuICAgICAgICBjb25zdCB2aWV3ID0gdGhpcy5vbC5nZXRWaWV3KCk7XHJcbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBnZW9sb2NhdGlvbi5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIHZpZXcuc2V0Q2VudGVyKGNvb3JkaW5hdGVzKTtcclxuICAgICAgICB2aWV3LnNldFpvb20oMTQpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0cmFjaykge1xyXG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmVHZW9sb2NhdGUoKTtcclxuICAgICAgfVxyXG4gICAgICBmaXJzdCA9IGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB1bnN1YnNjcmliZUdlb2xvY2F0ZSgpIHtcclxuICAgIHRoaXMuc3RvcEdlb2xvY2F0aW9uKCk7XHJcbiAgICBpZiAodGhpcy5nZW9sb2NhdGlvbiQkKSB7XHJcbiAgICAgIHRoaXMuZ2VvbG9jYXRpb24kJC51bnN1YnNjcmliZSgpO1xyXG4gICAgICB0aGlzLmdlb2xvY2F0aW9uJCQgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXJ0R2VvbG9jYXRpb24oKSB7XHJcbiAgICBpZiAoIXRoaXMuZ2VvbG9jYXRpb24pIHtcclxuICAgICAgdGhpcy5nZW9sb2NhdGlvbiA9IG5ldyBvbEdlb2xvY2F0aW9uKHtcclxuICAgICAgICBwcm9qZWN0aW9uOiB0aGlzLnByb2plY3Rpb24sXHJcbiAgICAgICAgdHJhY2tpbmc6IHRydWVcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLmdlb2xvY2F0aW9uLm9uKCdjaGFuZ2UnLCBldnQgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2VvbG9jYXRpb24kLm5leHQodGhpcy5nZW9sb2NhdGlvbik7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5nZW9sb2NhdGlvbi5zZXRUcmFja2luZyh0cnVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RvcEdlb2xvY2F0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMuZ2VvbG9jYXRpb24pIHtcclxuICAgICAgdGhpcy5nZW9sb2NhdGlvbi5zZXRUcmFja2luZyhmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==