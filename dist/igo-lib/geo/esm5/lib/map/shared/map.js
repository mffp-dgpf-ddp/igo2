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
        if (zIndexTo < 10) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL21hcC9zaGFyZWQvbWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxLQUFLLE1BQU0sUUFBUSxDQUFDO0FBQzNCLE9BQU8sTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUM3QixPQUFPLFNBQVMsTUFBTSxZQUFZLENBQUM7QUFDbkMsT0FBTyxhQUFhLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxvQkFBb0IsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLGtCQUFrQixNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sS0FBSyxNQUFNLE1BQU0sU0FBUyxDQUFDO0FBQ2xDLE9BQU8sS0FBSyxPQUFPLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sS0FBSyxhQUFhLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxRQUFRLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEMsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQzFCLE9BQU8sRUFBRSxlQUFlLEVBQXlCLE1BQU0sTUFBTSxDQUFDO0FBSzlELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUV2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFRdEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7OztBQUt2RDs7OztJQStCRSxnQkFBWSxPQUFvQjtRQTdCekIsWUFBTyxHQUFHLElBQUksZUFBZSxDQUFVLEVBQUUsQ0FBQyxDQUFDO1FBRTNDLGlCQUFZLEdBQUcsSUFBSSxlQUFlLENBQWdCLFNBQVMsQ0FBQyxDQUFDO1FBZTVELG1CQUFjLEdBQXdCO1lBQzVDLFFBQVEsRUFBRSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7U0FDakMsQ0FBQztRQVdBLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0s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OztJQUNoQyx3QkFBdUI7O0lBQ3ZCLHlCQUF3Qjs7SUFDeEIsZ0NBQXlDOztJQUV6QyxrQ0FBMkM7Ozs7O0lBRTNDLDhCQUFtQzs7Ozs7SUFDbkMsNkJBQW1DOzs7OztJQUNuQywrQkFBb0M7Ozs7O0lBRXBDLHlCQUE0Qjs7Ozs7SUFDNUIsZ0NBRUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwJztcclxuaW1wb3J0IG9sVmlldyBmcm9tICdvbC9WaWV3JztcclxuaW1wb3J0IG9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuaW1wb3J0IG9sR2VvbG9jYXRpb24gZnJvbSAnb2wvR2VvbG9jYXRpb24nO1xyXG5pbXBvcnQgb2xDb250cm9sQXR0cmlidXRpb24gZnJvbSAnb2wvY29udHJvbC9BdHRyaWJ1dGlvbic7XHJcbmltcG9ydCBvbENvbnRyb2xTY2FsZUxpbmUgZnJvbSAnb2wvY29udHJvbC9TY2FsZUxpbmUnO1xyXG5pbXBvcnQgKiBhcyBvbHByb2ogZnJvbSAnb2wvcHJvaic7XHJcbmltcG9ydCAqIGFzIG9scHJvajQgZnJvbSAnb2wvcHJvai9wcm9qNCc7XHJcbmltcG9ydCBPbFByb2plY3Rpb24gZnJvbSAnb2wvcHJvai9Qcm9qZWN0aW9uJztcclxuaW1wb3J0ICogYXMgb2xpbnRlcmFjdGlvbiBmcm9tICdvbC9pbnRlcmFjdGlvbic7XHJcbmltcG9ydCBvbENpcmNsZSBmcm9tICdvbC9nZW9tL0NpcmNsZSc7XHJcblxyXG5pbXBvcnQgcHJvajQgZnJvbSAncHJvajQnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgU3ViamVjdFN0YXR1cyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycyc7XHJcbmltcG9ydCB7IE92ZXJsYXkgfSBmcm9tICcuLi8uLi9vdmVybGF5L3NoYXJlZC9vdmVybGF5JztcclxuXHJcbmltcG9ydCB7IExheWVyV2F0Y2hlciB9IGZyb20gJy4uL3V0aWxzL2xheWVyLXdhdGNoZXInO1xyXG5pbXBvcnQge1xyXG4gIE1hcFZpZXdPcHRpb25zLFxyXG4gIE1hcE9wdGlvbnMsXHJcbiAgTWFwQXR0cmlidXRpb25PcHRpb25zLFxyXG4gIE1hcFNjYWxlTGluZU9wdGlvbnMsXHJcbiAgTWFwRXh0ZW50XHJcbn0gZnJvbSAnLi9tYXAuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgTWFwVmlld0NvbnRyb2xsZXIgfSBmcm9tICcuL2NvbnRyb2xsZXJzL3ZpZXcnO1xyXG5pbXBvcnQgeyBGZWF0dXJlRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2ZlYXR1cmUtZGF0YXNvdXJjZSc7XHJcblxyXG4vLyBUT0RPOiBUaGlzIGNsYXNzIGlzIG1lc3N5LiBDbGVhcmx5IGRlZmluZSBpdCdzIHNjb3BlIGFuZCB0aGUgbWFwIGJyb3dzZXIncy5cclxuLy8gTW92ZSBzb21lIHN0dWZmIGludG8gY29udHJvbGxlcnMuXHJcbmV4cG9ydCBjbGFzcyBJZ29NYXAge1xyXG4gIHB1YmxpYyBvbDogb2xNYXA7XHJcbiAgcHVibGljIGxheWVycyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PExheWVyW10+KFtdKTtcclxuICBwdWJsaWMgc3RhdHVzJDogU3ViamVjdDxTdWJqZWN0U3RhdHVzPjtcclxuICBwdWJsaWMgZ2VvbG9jYXRpb24kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxvbEdlb2xvY2F0aW9uPih1bmRlZmluZWQpO1xyXG4gIHB1YmxpYyBnZW9sb2NhdGlvbkZlYXR1cmU6IG9sRmVhdHVyZTtcclxuICBwdWJsaWMgYnVmZmVyR2VvbTogb2xDaXJjbGU7XHJcbiAgcHVibGljIGJ1ZmZlckZlYXR1cmU6IG9sRmVhdHVyZTtcclxuICBwdWJsaWMgYnVmZmVyOiBPdmVybGF5O1xyXG4gIHB1YmxpYyBvdmVybGF5OiBPdmVybGF5O1xyXG4gIHB1YmxpYyB2aWV3Q29udHJvbGxlcjogTWFwVmlld0NvbnRyb2xsZXI7XHJcblxyXG4gIHB1YmxpYyBidWZmZXJEYXRhU291cmNlOiBGZWF0dXJlRGF0YVNvdXJjZTtcclxuXHJcbiAgcHJpdmF0ZSBsYXllcldhdGNoZXI6IExheWVyV2F0Y2hlcjtcclxuICBwcml2YXRlIGdlb2xvY2F0aW9uOiBvbEdlb2xvY2F0aW9uO1xyXG4gIHByaXZhdGUgZ2VvbG9jYXRpb24kJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBwcml2YXRlIG9wdGlvbnM6IE1hcE9wdGlvbnM7XHJcbiAgcHJpdmF0ZSBkZWZhdWx0T3B0aW9uczogUGFydGlhbDxNYXBPcHRpb25zPiA9IHtcclxuICAgIGNvbnRyb2xzOiB7IGF0dHJpYnV0aW9uOiBmYWxzZSB9XHJcbiAgfTtcclxuXHJcbiAgZ2V0IGxheWVycygpOiBMYXllcltdIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVycyQudmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXQgcHJvamVjdGlvbigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMudmlld0NvbnRyb2xsZXIuZ2V0T2xQcm9qZWN0aW9uKCkuZ2V0Q29kZSgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucz86IE1hcE9wdGlvbnMpIHtcclxuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgdGhpcy5sYXllcldhdGNoZXIgPSBuZXcgTGF5ZXJXYXRjaGVyKCk7XHJcbiAgICB0aGlzLnN0YXR1cyQgPSB0aGlzLmxheWVyV2F0Y2hlci5zdGF0dXMkO1xyXG4gICAgb2xwcm9qNC5yZWdpc3Rlcihwcm9qNCk7XHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIGluaXQoKSB7XHJcbiAgICBjb25zdCBjb250cm9scyA9IFtdO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb250cm9scykge1xyXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRyb2xzLmF0dHJpYnV0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgYXR0cmlidXRpb25PcHQgPSAodGhpcy5vcHRpb25zLmNvbnRyb2xzLmF0dHJpYnV0aW9uID09PSB0cnVlXHJcbiAgICAgICAgICA/IHt9XHJcbiAgICAgICAgICA6IHRoaXMub3B0aW9ucy5jb250cm9scy5hdHRyaWJ1dGlvbikgYXMgTWFwQXR0cmlidXRpb25PcHRpb25zO1xyXG4gICAgICAgIGNvbnRyb2xzLnB1c2gobmV3IG9sQ29udHJvbEF0dHJpYnV0aW9uKGF0dHJpYnV0aW9uT3B0KSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5jb250cm9scy5zY2FsZUxpbmUpIHtcclxuICAgICAgICBjb25zdCBzY2FsZUxpbmVPcHQgPSAodGhpcy5vcHRpb25zLmNvbnRyb2xzLnNjYWxlTGluZSA9PT0gdHJ1ZVxyXG4gICAgICAgICAgPyB7fVxyXG4gICAgICAgICAgOiB0aGlzLm9wdGlvbnMuY29udHJvbHMuc2NhbGVMaW5lKSBhcyBNYXBTY2FsZUxpbmVPcHRpb25zO1xyXG4gICAgICAgIGNvbnRyb2xzLnB1c2gobmV3IG9sQ29udHJvbFNjYWxlTGluZShzY2FsZUxpbmVPcHQpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGV0IGludGVyYWN0aW9ucyA9IHt9O1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5pbnRlcmFjdGlvbnMgPT09IGZhbHNlKSB7XHJcbiAgICAgIGludGVyYWN0aW9ucyA9IHtcclxuICAgICAgICBhbHRTaGlmdERyYWdSb3RhdGU6IGZhbHNlLFxyXG4gICAgICAgIGRvdWJsZUNsaWNrWm9vbTogZmFsc2UsXHJcbiAgICAgICAga2V5Ym9hcmQ6IGZhbHNlLFxyXG4gICAgICAgIG1vdXNlV2hlZWxab29tOiBmYWxzZSxcclxuICAgICAgICBzaGlmdERyYWdab29tOiBmYWxzZSxcclxuICAgICAgICBkcmFnUGFuOiBmYWxzZSxcclxuICAgICAgICBwaW5jaFJvdGF0ZTogZmFsc2UsXHJcbiAgICAgICAgcGluY2hab29tOiBmYWxzZVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub2wgPSBuZXcgb2xNYXAoe1xyXG4gICAgICBpbnRlcmFjdGlvbnM6IG9saW50ZXJhY3Rpb24uZGVmYXVsdHMoaW50ZXJhY3Rpb25zKSxcclxuICAgICAgY29udHJvbHNcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuc2V0Vmlldyh0aGlzLm9wdGlvbnMudmlldyB8fCB7fSk7XHJcbiAgICB0aGlzLnZpZXdDb250cm9sbGVyID0gbmV3IE1hcFZpZXdDb250cm9sbGVyKHtcclxuICAgICAgc3RhdGVIaXN0b3J5OiB0cnVlXHJcbiAgICB9KTtcclxuICAgIHRoaXMudmlld0NvbnRyb2xsZXIuc2V0T2xNYXAodGhpcy5vbCk7XHJcbiAgICB0aGlzLm92ZXJsYXkgPSBuZXcgT3ZlcmxheSh0aGlzKTtcclxuICAgIHRoaXMuYnVmZmVyID0gbmV3IE92ZXJsYXkodGhpcyk7XHJcbiAgfVxyXG5cclxuICBzZXRUYXJnZXQoaWQ6IHN0cmluZykge1xyXG4gICAgdGhpcy5vbC5zZXRUYXJnZXQoaWQpO1xyXG4gICAgaWYgKGlkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5sYXllcldhdGNoZXIuc3Vic2NyaWJlKCgpID0+IHt9LCBudWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubGF5ZXJXYXRjaGVyLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGVWaWV3KG9wdGlvbnM6IE1hcFZpZXdPcHRpb25zKSB7XHJcbiAgICBjb25zdCBjdXJyZW50VmlldyA9IHRoaXMub2wuZ2V0VmlldygpO1xyXG4gICAgY29uc3Qgdmlld09wdGlvbnMgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgICB7XHJcbiAgICAgICAgem9vbTogY3VycmVudFZpZXcuZ2V0Wm9vbSgpXHJcbiAgICAgIH0sXHJcbiAgICAgIGN1cnJlbnRWaWV3LmdldFByb3BlcnRpZXMoKVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnNldFZpZXcoT2JqZWN0LmFzc2lnbih2aWV3T3B0aW9ucywgb3B0aW9ucykpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBtYXAgdmlld1xyXG4gICAqIEBwYXJhbSBvcHRpb25zIE1hcCB2aWV3IG9wdGlvbnNcclxuICAgKi9cclxuICBzZXRWaWV3KG9wdGlvbnM6IE1hcFZpZXdPcHRpb25zKSB7XHJcbiAgICBpZiAodGhpcy52aWV3Q29udHJvbGxlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMudmlld0NvbnRyb2xsZXIuY2xlYXJTdGF0ZUhpc3RvcnkoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB2aWV3ID0gbmV3IG9sVmlldyhvcHRpb25zKTtcclxuICAgIHRoaXMub2wuc2V0Vmlldyh2aWV3KTtcclxuXHJcbiAgICB0aGlzLnVuc3Vic2NyaWJlR2VvbG9jYXRlKCk7XHJcbiAgICBpZiAob3B0aW9ucykge1xyXG4gICAgICBpZiAob3B0aW9ucy5jZW50ZXIpIHtcclxuICAgICAgICBjb25zdCBwcm9qZWN0aW9uID0gdmlldy5nZXRQcm9qZWN0aW9uKCkuZ2V0Q29kZSgpO1xyXG4gICAgICAgIGNvbnN0IGNlbnRlciA9IG9scHJvai5mcm9tTG9uTGF0KG9wdGlvbnMuY2VudGVyLCBwcm9qZWN0aW9uKTtcclxuICAgICAgICB2aWV3LnNldENlbnRlcihjZW50ZXIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAob3B0aW9ucy5nZW9sb2NhdGUpIHtcclxuICAgICAgICB0aGlzLmdlb2xvY2F0ZSh0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gVE9ETzogTW92ZSB0byBWaWV3Q29udHJvbGxlciBhbmQgdXBkYXRlIGV2ZXJ5IHBsYWNlIGl0J3MgdXNlZFxyXG4gIGdldENlbnRlcihwcm9qZWN0aW9uPzogc3RyaW5nIHwgT2xQcm9qZWN0aW9uKTogW251bWJlciwgbnVtYmVyXSB7XHJcbiAgICByZXR1cm4gdGhpcy52aWV3Q29udHJvbGxlci5nZXRDZW50ZXIoKTtcclxuICB9XHJcblxyXG4gIC8vIFRPRE86IE1vdmUgdG8gVmlld0NvbnRyb2xsZXIgYW5kIHVwZGF0ZSBldmVyeSBwbGFjZSBpdCdzIHVzZWRcclxuICBnZXRFeHRlbnQocHJvamVjdGlvbj86IHN0cmluZyB8IE9sUHJvamVjdGlvbik6IE1hcEV4dGVudCB7XHJcbiAgICByZXR1cm4gdGhpcy52aWV3Q29udHJvbGxlci5nZXRFeHRlbnQoKTtcclxuICB9XHJcblxyXG4gIC8vIFRPRE86IE1vdmUgdG8gVmlld0NvbnRyb2xsZXIgYW5kIHVwZGF0ZSBldmVyeSBwbGFjZSBpdCdzIHVzZWRcclxuICBnZXRab29tKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy52aWV3Q29udHJvbGxlci5nZXRab29tKCk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VCYXNlTGF5ZXIoYmFzZUxheWVyOiBMYXllcikge1xyXG4gICAgaWYgKCFiYXNlTGF5ZXIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3QgYmwgb2YgdGhpcy5nZXRCYXNlTGF5ZXJzKCkpIHtcclxuICAgICAgYmwudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGJhc2VMYXllci52aXNpYmxlID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGdldEJhc2VMYXllcnMoKTogTGF5ZXJbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllcnMuZmlsdGVyKChsYXllcjogTGF5ZXIpID0+IGxheWVyLmJhc2VMYXllciA9PT0gdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBnZXRMYXllckJ5SWQoaWQ6IHN0cmluZyk6IExheWVyIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVycy5maW5kKChsYXllcjogTGF5ZXIpID0+IGxheWVyLmlkICYmIGxheWVyLmlkID09PSBpZCk7XHJcbiAgfVxyXG5cclxuICBnZXRMYXllckJ5QWxpYXMoYWxpYXM6IHN0cmluZyk6IExheWVyIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVycy5maW5kKChsYXllcjogTGF5ZXIpID0+IGxheWVyLmFsaWFzICYmIGxheWVyLmFsaWFzID09PSBhbGlhcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYSBzaW5nbGUgbGF5ZXJcclxuICAgKiBAcGFyYW0gbGF5ZXIgTGF5ZXIgdG8gYWRkXHJcbiAgICogQHBhcmFtIHB1c2ggREVQUkVDQVRFRFxyXG4gICAqL1xyXG4gIGFkZExheWVyKGxheWVyOiBMYXllciwgcHVzaCA9IHRydWUpIHtcclxuICAgIHRoaXMuYWRkTGF5ZXJzKFtsYXllcl0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIG1hbnkgbGF5ZXJzXHJcbiAgICogQHBhcmFtIGxheWVycyBMYXllcnMgdG8gYWRkXHJcbiAgICogQHBhcmFtIHB1c2ggREVQUkVDQVRFRFxyXG4gICAqL1xyXG4gIGFkZExheWVycyhsYXllcnM6IExheWVyW10sIHB1c2ggPSB0cnVlKSB7XHJcbiAgICBjb25zdCBhZGRlZExheWVycyA9IGxheWVyc1xyXG4gICAgICAubWFwKChsYXllcjogTGF5ZXIpID0+IHRoaXMuZG9BZGRMYXllcihsYXllcikpXHJcbiAgICAgIC5maWx0ZXIoKGxheWVyOiBMYXllciB8IHVuZGVmaW5lZCkgPT4gbGF5ZXIgIT09IHVuZGVmaW5lZCk7XHJcbiAgICB0aGlzLnNldExheWVycyhbXS5jb25jYXQodGhpcy5sYXllcnMsIGFkZGVkTGF5ZXJzKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgYSBzaW5nbGUgbGF5ZXJcclxuICAgKiBAcGFyYW0gbGF5ZXIgTGF5ZXIgdG8gcmVtb3ZlXHJcbiAgICovXHJcbiAgcmVtb3ZlTGF5ZXIobGF5ZXI6IExheWVyKSB7XHJcbiAgICB0aGlzLnJlbW92ZUxheWVycyhbbGF5ZXJdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBtYW55IGxheWVyc1xyXG4gICAqIEBwYXJhbSBsYXllcnMgTGF5ZXJzIHRvIHJlbW92ZVxyXG4gICAqL1xyXG4gIHJlbW92ZUxheWVycyhsYXllcnM6IExheWVyW10pIHtcclxuICAgIGNvbnN0IG5ld0xheWVycyA9IHRoaXMubGF5ZXJzJC52YWx1ZS5zbGljZSgwKTtcclxuICAgIGNvbnN0IGxheWVyc1RvUmVtb3ZlID0gW107XHJcbiAgICBsYXllcnMuZm9yRWFjaCgobGF5ZXI6IExheWVyKSA9PiB7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRMYXllckluZGV4KGxheWVyKTtcclxuICAgICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgICBsYXllcnNUb1JlbW92ZS5wdXNoKGxheWVyKTtcclxuICAgICAgICBuZXdMYXllcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgbGF5ZXJzVG9SZW1vdmUuZm9yRWFjaCgobGF5ZXI6IExheWVyKSA9PiB0aGlzLmRvUmVtb3ZlTGF5ZXIobGF5ZXIpKTtcclxuICAgIHRoaXMuc2V0TGF5ZXJzKG5ld0xheWVycyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgYWxsIGxheWVyc1xyXG4gICAqL1xyXG4gIHJlbW92ZUFsbExheWVycygpIHtcclxuICAgIHRoaXMubGF5ZXJzLmZvckVhY2goKGxheWVyOiBMYXllcikgPT4gdGhpcy5kb1JlbW92ZUxheWVyKGxheWVyKSk7XHJcbiAgICB0aGlzLmxheWVycyQubmV4dChbXSk7XHJcbiAgfVxyXG5cclxuICByYWlzZUxheWVyKGxheWVyOiBMYXllcikge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmdldExheWVySW5kZXgobGF5ZXIpO1xyXG4gICAgaWYgKGluZGV4ID4gMCkge1xyXG4gICAgICB0aGlzLm1vdmVMYXllcihsYXllciwgaW5kZXgsIGluZGV4IC0gMSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsb3dlckxheWVyKGxheWVyOiBMYXllcikge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmdldExheWVySW5kZXgobGF5ZXIpO1xyXG4gICAgaWYgKGluZGV4IDwgdGhpcy5sYXllcnMubGVuZ3RoIC0gMSkge1xyXG4gICAgICB0aGlzLm1vdmVMYXllcihsYXllciwgaW5kZXgsIGluZGV4ICsgMSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtb3ZlTGF5ZXIobGF5ZXI6IExheWVyLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IGxheWVyVG8gPSB0aGlzLmxheWVyc1t0b107XHJcbiAgICBjb25zdCB6SW5kZXhUbyA9IGxheWVyVG8uekluZGV4O1xyXG4gICAgY29uc3QgekluZGV4RnJvbSA9IGxheWVyLnpJbmRleDtcclxuXHJcbiAgICBpZiAoekluZGV4VG8gPCAxMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGF5ZXIuekluZGV4ID0gekluZGV4VG87XHJcbiAgICBsYXllclRvLnpJbmRleCA9IHpJbmRleEZyb207XHJcblxyXG4gICAgdGhpcy5sYXllcnNbdG9dID0gbGF5ZXI7XHJcbiAgICB0aGlzLmxheWVyc1tmcm9tXSA9IGxheWVyVG87XHJcbiAgICB0aGlzLmxheWVycyQubmV4dCh0aGlzLmxheWVycy5zbGljZSgwKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYSBsYXllciB0byB0aGUgT0wgbWFwIGFuZCBzdGFydCB3YXRjaGluZy4gSWYgdGhlIGxheWVyIGlzIGFscmVhZHlcclxuICAgKiBhZGRlZCB0byB0aGlzIG1hcCwgbWFrZSBpdCB2aXNpYmxlIGJ1dCBkb24ndCBhZGQgaXQgb25lIGFnYWluLlxyXG4gICAqIEBwYXJhbSBsYXllciBMYXllclxyXG4gICAqIEByZXR1cm5zIFRoZSBsYXllciBhZGRlZCwgaWYgYW55XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkb0FkZExheWVyKGxheWVyOiBMYXllcikge1xyXG4gICAgaWYgKGxheWVyLmJhc2VMYXllciAmJiBsYXllci52aXNpYmxlKSB7XHJcbiAgICAgIHRoaXMuY2hhbmdlQmFzZUxheWVyKGxheWVyKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBleGlzdGluZ0xheWVyID0gdGhpcy5nZXRMYXllckJ5SWQobGF5ZXIuaWQpO1xyXG4gICAgaWYgKGV4aXN0aW5nTGF5ZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBleGlzdGluZ0xheWVyLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxheWVyLnpJbmRleCA9PT0gdW5kZWZpbmVkIHx8IGxheWVyLnpJbmRleCA9PT0gMCkge1xyXG4gICAgICBjb25zdCBvZmZzZXQgPSBsYXllci5iYXNlTGF5ZXIgPyAxIDogMTA7XHJcbiAgICAgIGxheWVyLnpJbmRleCA9IHRoaXMubGF5ZXJzLmxlbmd0aCArIG9mZnNldDtcclxuICAgIH1cclxuXHJcbiAgICBsYXllci5zZXRNYXAodGhpcyk7XHJcbiAgICB0aGlzLmxheWVyV2F0Y2hlci53YXRjaExheWVyKGxheWVyKTtcclxuICAgIHRoaXMub2wuYWRkTGF5ZXIobGF5ZXIub2wpO1xyXG5cclxuICAgIHJldHVybiBsYXllcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBhIGxheWVyIGZyb20gdGhlIE9MIG1hcCBhbmQgc3RvcCB3YXRjaGluZ1xyXG4gICAqIEBwYXJhbSBsYXllciBMYXllclxyXG4gICAqL1xyXG4gIHByaXZhdGUgZG9SZW1vdmVMYXllcihsYXllcjogTGF5ZXIpIHtcclxuICAgIHRoaXMubGF5ZXJXYXRjaGVyLnVud2F0Y2hMYXllcihsYXllcik7XHJcbiAgICB0aGlzLm9sLnJlbW92ZUxheWVyKGxheWVyLm9sKTtcclxuICAgIGxheWVyLnNldE1hcCh1bmRlZmluZWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHRoZSBsYXllcnMgb2JzZXJ2YWJsZVxyXG4gICAqIEBwYXJhbSBsYXllcnMgTGF5ZXJzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZXRMYXllcnMobGF5ZXJzOiBMYXllcltdKSB7XHJcbiAgICB0aGlzLmxheWVycyQubmV4dCh0aGlzLnNvcnRMYXllcnNCeVpJbmRleChsYXllcnMpLnNsaWNlKDApKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNvcnQgbGF5ZXJzIGJ5IGRlc2NlbmRpbmcgekluZGV4XHJcbiAgICogQHBhcmFtIGxheWVycyBBcnJheSBvZiBsYXllcnNcclxuICAgKiBAcmV0dXJucyBUaGUgb3JpZ2luYWwgYXJyYXksIHNvcnRlZCBieSB6SW5kZXhcclxuICAgKi9cclxuICBwcml2YXRlIHNvcnRMYXllcnNCeVpJbmRleChsYXllcnM6IExheWVyW10pIHtcclxuICAgIC8vIFNvcnQgYnkgZGVzY2VuZGluZyB6SW5kZXhcclxuICAgIHJldHVybiBsYXllcnMuc29ydCgobGF5ZXIxOiBMYXllciwgbGF5ZXIyOiBMYXllcikgPT4gbGF5ZXIyLnpJbmRleCAtIGxheWVyMS56SW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGxheWVyIGluZGV4IGluIHRoZSBtYXAncyBpbmVuciBhcnJheSBvZiBsYXllcnNcclxuICAgKiBAcGFyYW0gbGF5ZXIgTGF5ZXJcclxuICAgKiBAcmV0dXJucyBUaGUgbGF5ZXIgaW5kZXhcclxuICAgKi9cclxuICBwcml2YXRlIGdldExheWVySW5kZXgobGF5ZXI6IExheWVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllcnMuZmluZEluZGV4KChfbGF5ZXI6IExheWVyKSA9PiBfbGF5ZXIgPT09IGxheWVyKTtcclxuICB9XHJcblxyXG4gIC8vIFRPRE86IENyZWF0ZSBhIEdlb2xvY2F0aW9uQ29udHJvbGxlciB3aXRoIGV2ZXJ5dGhpbmcgYmVsb3dcclxuICBnZW9sb2NhdGUodHJhY2sgPSBmYWxzZSkge1xyXG4gICAgbGV0IGZpcnN0ID0gdHJ1ZTtcclxuICAgIGlmICh0aGlzLmdlb2xvY2F0aW9uJCQpIHtcclxuICAgICAgdHJhY2sgPSB0aGlzLmdlb2xvY2F0aW9uLmdldFRyYWNraW5nKCk7XHJcbiAgICAgIHRoaXMudW5zdWJzY3JpYmVHZW9sb2NhdGUoKTtcclxuICAgIH1cclxuICAgIHRoaXMuc3RhcnRHZW9sb2NhdGlvbigpO1xyXG5cclxuICAgIHRoaXMuZ2VvbG9jYXRpb24kJCA9IHRoaXMuZ2VvbG9jYXRpb24kLnN1YnNjcmliZShnZW9sb2NhdGlvbiA9PiB7XHJcbiAgICAgIGlmICghZ2VvbG9jYXRpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgYWNjdXJhY3kgPSBnZW9sb2NhdGlvbi5nZXRBY2N1cmFjeSgpO1xyXG4gICAgICBpZiAoYWNjdXJhY3kgPCA0MTQwMDAwKSB7XHJcbiAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBnZW9sb2NhdGlvbi5nZXRBY2N1cmFjeUdlb21ldHJ5KCk7XHJcbiAgICAgICAgY29uc3QgZXh0ZW50ID0gZ2VvbWV0cnkuZ2V0RXh0ZW50KCk7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgdGhpcy5nZW9sb2NhdGlvbkZlYXR1cmUgJiZcclxuICAgICAgICAgIHRoaXMub3ZlcmxheS5kYXRhU291cmNlLm9sLmdldEZlYXR1cmVCeUlkKFxyXG4gICAgICAgICAgICB0aGlzLmdlb2xvY2F0aW9uRmVhdHVyZS5nZXRJZCgpXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICB0aGlzLm92ZXJsYXkuZGF0YVNvdXJjZS5vbC5yZW1vdmVGZWF0dXJlKHRoaXMuZ2VvbG9jYXRpb25GZWF0dXJlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZW9sb2NhdGlvbkZlYXR1cmUgPSBuZXcgb2xGZWF0dXJlKHsgZ2VvbWV0cnkgfSk7XHJcbiAgICAgICAgdGhpcy5nZW9sb2NhdGlvbkZlYXR1cmUuc2V0SWQoJ2dlb2xvY2F0aW9uRmVhdHVyZScpO1xyXG4gICAgICAgIHRoaXMub3ZlcmxheS5hZGRPbEZlYXR1cmUodGhpcy5nZW9sb2NhdGlvbkZlYXR1cmUpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vbC5nZXRWaWV3KCkub3B0aW9uc18uYnVmZmVyKSB7XHJcbiAgICAgICAgICBjb25zdCBidWZmZXJSYWRpdXMgPSB0aGlzLm9sLmdldFZpZXcoKS5vcHRpb25zXy5idWZmZXIuYnVmZmVyUmFkaXVzO1xyXG4gICAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBnZW9sb2NhdGlvbi5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgdGhpcy5idWZmZXJHZW9tID0gbmV3IG9sQ2lyY2xlKGNvb3JkaW5hdGVzLCBidWZmZXJSYWRpdXMpO1xyXG4gICAgICAgICAgY29uc3QgYnVmZmVyU3Ryb2tlID0gdGhpcy5vbC5nZXRWaWV3KCkub3B0aW9uc18uYnVmZmVyLmJ1ZmZlclN0cm9rZTtcclxuICAgICAgICAgIGNvbnN0IGJ1ZmZlckZpbGwgPSB0aGlzLm9sLmdldFZpZXcoKS5vcHRpb25zXy5idWZmZXIuYnVmZmVyRmlsbDtcclxuXHJcbiAgICAgICAgICBsZXQgYnVmZmVyVGV4dDtcclxuICAgICAgICAgIGlmICh0aGlzLm9sLmdldFZpZXcoKS5vcHRpb25zXy5idWZmZXIuc2hvd0J1ZmZlclJhZGl1cykge1xyXG4gICAgICAgICAgICBidWZmZXJUZXh0ID0gYnVmZmVyUmFkaXVzLnRvU3RyaW5nKCkgKyAnbSc7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBidWZmZXJUZXh0ID0gJyc7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdGhpcy5idWZmZXJGZWF0dXJlID0gbmV3IG9sRmVhdHVyZSh0aGlzLmJ1ZmZlckdlb20pO1xyXG4gICAgICAgICAgdGhpcy5idWZmZXJGZWF0dXJlLnNldElkKCdidWZmZXJGZWF0dXJlJyk7XHJcbiAgICAgICAgICB0aGlzLmJ1ZmZlckZlYXR1cmUuc2V0KCdidWZmZXJTdHJva2UnLCBidWZmZXJTdHJva2UpO1xyXG4gICAgICAgICAgdGhpcy5idWZmZXJGZWF0dXJlLnNldCgnYnVmZmVyRmlsbCcsIGJ1ZmZlckZpbGwpO1xyXG4gICAgICAgICAgdGhpcy5idWZmZXJGZWF0dXJlLnNldCgnYnVmZmVyVGV4dCcsIGJ1ZmZlclRleHQpO1xyXG4gICAgICAgICAgdGhpcy5idWZmZXIuYWRkT2xGZWF0dXJlKHRoaXMuYnVmZmVyRmVhdHVyZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZmlyc3QpIHtcclxuICAgICAgICAgIHRoaXMudmlld0NvbnRyb2xsZXIuem9vbVRvRXh0ZW50KGV4dGVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKGZpcnN0KSB7XHJcbiAgICAgICAgY29uc3QgdmlldyA9IHRoaXMub2wuZ2V0VmlldygpO1xyXG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gZ2VvbG9jYXRpb24uZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICB2aWV3LnNldENlbnRlcihjb29yZGluYXRlcyk7XHJcbiAgICAgICAgdmlldy5zZXRab29tKDE0KTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHJhY2spIHtcclxuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlR2VvbG9jYXRlKCk7XHJcbiAgICAgIH1cclxuICAgICAgZmlyc3QgPSBmYWxzZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdW5zdWJzY3JpYmVHZW9sb2NhdGUoKSB7XHJcbiAgICB0aGlzLnN0b3BHZW9sb2NhdGlvbigpO1xyXG4gICAgaWYgKHRoaXMuZ2VvbG9jYXRpb24kJCkge1xyXG4gICAgICB0aGlzLmdlb2xvY2F0aW9uJCQudW5zdWJzY3JpYmUoKTtcclxuICAgICAgdGhpcy5nZW9sb2NhdGlvbiQkID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdGFydEdlb2xvY2F0aW9uKCkge1xyXG4gICAgaWYgKCF0aGlzLmdlb2xvY2F0aW9uKSB7XHJcbiAgICAgIHRoaXMuZ2VvbG9jYXRpb24gPSBuZXcgb2xHZW9sb2NhdGlvbih7XHJcbiAgICAgICAgcHJvamVjdGlvbjogdGhpcy5wcm9qZWN0aW9uLFxyXG4gICAgICAgIHRyYWNraW5nOiB0cnVlXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5nZW9sb2NhdGlvbi5vbignY2hhbmdlJywgZXZ0ID0+IHtcclxuICAgICAgICB0aGlzLmdlb2xvY2F0aW9uJC5uZXh0KHRoaXMuZ2VvbG9jYXRpb24pO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZ2VvbG9jYXRpb24uc2V0VHJhY2tpbmcodHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0b3BHZW9sb2NhdGlvbigpIHtcclxuICAgIGlmICh0aGlzLmdlb2xvY2F0aW9uKSB7XHJcbiAgICAgIHRoaXMuZ2VvbG9jYXRpb24uc2V0VHJhY2tpbmcoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=