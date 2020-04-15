/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class IgoMap {
    /**
     * @param {?=} options
     */
    constructor(options) {
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
    /**
     * @return {?}
     */
    get layers() {
        return this.layers$.value;
    }
    /**
     * @return {?}
     */
    get projection() {
        return this.viewController.getOlProjection().getCode();
    }
    /**
     * @return {?}
     */
    init() {
        /** @type {?} */
        const controls = [];
        if (this.options.controls) {
            if (this.options.controls.attribution) {
                /** @type {?} */
                const attributionOpt = (/** @type {?} */ ((this.options.controls.attribution === true
                    ? {}
                    : this.options.controls.attribution)));
                controls.push(new olControlAttribution(attributionOpt));
            }
            if (this.options.controls.scaleLine) {
                /** @type {?} */
                const scaleLineOpt = (/** @type {?} */ ((this.options.controls.scaleLine === true
                    ? {}
                    : this.options.controls.scaleLine)));
                controls.push(new olControlScaleLine(scaleLineOpt));
            }
        }
        /** @type {?} */
        let interactions = {};
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
            controls
        });
        this.setView(this.options.view || {});
        this.viewController = new MapViewController({
            stateHistory: true
        });
        this.viewController.setOlMap(this.ol);
        this.overlay = new Overlay(this);
        this.buffer = new Overlay(this);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    setTarget(id) {
        this.ol.setTarget(id);
        if (id !== undefined) {
            this.layerWatcher.subscribe((/**
             * @return {?}
             */
            () => { }), null);
        }
        else {
            this.layerWatcher.unsubscribe();
        }
    }
    /**
     * @param {?} options
     * @return {?}
     */
    updateView(options) {
        /** @type {?} */
        const currentView = this.ol.getView();
        /** @type {?} */
        const viewOptions = Object.assign({
            zoom: currentView.getZoom()
        }, currentView.getProperties());
        this.setView(Object.assign(viewOptions, options));
        if (options.maxZoomOnExtent) {
            this.viewController.maxZoomOnExtent = options.maxZoomOnExtent;
        }
    }
    /**
     * Set the map view
     * @param {?} options Map view options
     * @return {?}
     */
    setView(options) {
        if (this.viewController !== undefined) {
            this.viewController.clearStateHistory();
        }
        /** @type {?} */
        const view = new olView(options);
        this.ol.setView(view);
        this.unsubscribeGeolocate();
        if (options) {
            if (options.center) {
                /** @type {?} */
                const projection = view.getProjection().getCode();
                /** @type {?} */
                const center = olproj.fromLonLat(options.center, projection);
                view.setCenter(center);
            }
            if (options.geolocate) {
                this.geolocate(true);
            }
        }
    }
    /**
     * Deprecated
     * TODO: Move to ViewController and update every place it's used
     * @param {?=} projection
     * @return {?}
     */
    getCenter(projection) {
        return this.viewController.getCenter(projection);
    }
    /**
     * Deprecated
     * TODO: Move to ViewController and update every place it's used
     * @param {?=} projection
     * @return {?}
     */
    getExtent(projection) {
        return this.viewController.getExtent(projection);
    }
    // TODO: Move to ViewController and update every place it's used
    /**
     * @return {?}
     */
    getZoom() {
        return this.viewController.getZoom();
    }
    /**
     * @param {?} baseLayer
     * @return {?}
     */
    changeBaseLayer(baseLayer) {
        if (!baseLayer) {
            return;
        }
        for (const bl of this.getBaseLayers()) {
            bl.visible = false;
        }
        baseLayer.visible = true;
        this.viewController.olView.setMinZoom(baseLayer.dataSource.options.minZoom || (this.options.view || {}).minZoom);
        this.viewController.olView.setMaxZoom(baseLayer.dataSource.options.maxZoom || (this.options.view || {}).maxZoom);
    }
    /**
     * @return {?}
     */
    getBaseLayers() {
        return this.layers.filter((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => layer.baseLayer === true));
    }
    /**
     * @param {?} id
     * @return {?}
     */
    getLayerById(id) {
        return this.layers.find((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => layer.id && layer.id === id));
    }
    /**
     * @param {?} alias
     * @return {?}
     */
    getLayerByAlias(alias) {
        return this.layers.find((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => layer.alias && layer.alias === alias));
    }
    /**
     * Add a single layer
     * @param {?} layer Layer to add
     * @param {?=} push DEPRECATED
     * @return {?}
     */
    addLayer(layer, push = true) {
        this.addLayers([layer]);
    }
    /**
     * Add many layers
     * @param {?} layers Layers to add
     * @param {?=} push DEPRECATED
     * @return {?}
     */
    addLayers(layers, push = true) {
        /** @type {?} */
        let incrementArray = 0;
        /** @type {?} */
        const addedLayers = layers
            .map((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => this.doAddLayer(layer, incrementArray++)))
            .filter((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => layer !== undefined));
        this.setLayers([].concat(this.layers, addedLayers));
    }
    /**
     * Remove a single layer
     * @param {?} layer Layer to remove
     * @return {?}
     */
    removeLayer(layer) {
        this.removeLayers([layer]);
    }
    /**
     * Remove many layers
     * @param {?} layers Layers to remove
     * @return {?}
     */
    removeLayers(layers) {
        /** @type {?} */
        const newLayers = this.layers$.value.slice(0);
        /** @type {?} */
        const layersToRemove = [];
        layers.forEach((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => {
            /** @type {?} */
            const index = this.getLayerIndex(layer);
            if (index >= 0) {
                layersToRemove.push(layer);
                newLayers.splice(index, 1);
            }
        }));
        layersToRemove.forEach((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => this.doRemoveLayer(layer)));
        this.setLayers(newLayers);
    }
    /**
     * Remove all layers
     * @return {?}
     */
    removeAllLayers() {
        this.layers.forEach((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => this.doRemoveLayer(layer)));
        this.layers$.next([]);
    }
    /**
     * @param {?} layer
     * @return {?}
     */
    raiseLayer(layer) {
        /** @type {?} */
        const index = this.getLayerIndex(layer);
        if (index > 0) {
            this.moveLayer(layer, index, index - 1);
        }
    }
    /**
     * @param {?} layer
     * @return {?}
     */
    lowerLayer(layer) {
        /** @type {?} */
        const index = this.getLayerIndex(layer);
        if (index < this.layers.length - 1) {
            this.moveLayer(layer, index, index + 1);
        }
    }
    /**
     * @param {?} layer
     * @param {?} from
     * @param {?} to
     * @return {?}
     */
    moveLayer(layer, from, to) {
        /** @type {?} */
        const layerTo = this.layers[to];
        /** @type {?} */
        const zIndexTo = layerTo.zIndex;
        /** @type {?} */
        const zIndexFrom = layer.zIndex;
        if (layerTo.baseLayer) {
            return;
        }
        layer.zIndex = zIndexTo;
        layerTo.zIndex = zIndexFrom;
        this.layers[to] = layer;
        this.layers[from] = layerTo;
        this.layers$.next(this.layers.slice(0));
    }
    /**
     * Add a layer to the OL map and start watching. If the layer is already
     * added to this map, make it visible but don't add it one again.
     * @private
     * @param {?} layer Layer
     * @param {?} length
     * @return {?} The layer added, if any
     */
    doAddLayer(layer, length) {
        if (layer.baseLayer && layer.visible) {
            this.changeBaseLayer(layer);
        }
        /** @type {?} */
        const existingLayer = this.getLayerById(layer.id);
        if (existingLayer !== undefined) {
            existingLayer.visible = true;
            return;
        }
        if (layer.zIndex === undefined || layer.zIndex === 0) {
            /** @type {?} */
            const offset = layer.baseLayer ? 1 : 10;
            layer.zIndex = this.layers.length + offset + length;
        }
        layer.setMap(this);
        this.layerWatcher.watchLayer(layer);
        this.ol.addLayer(layer.ol);
        return layer;
    }
    /**
     * Remove a layer from the OL map and stop watching
     * @private
     * @param {?} layer Layer
     * @return {?}
     */
    doRemoveLayer(layer) {
        this.layerWatcher.unwatchLayer(layer);
        this.ol.removeLayer(layer.ol);
        layer.setMap(undefined);
    }
    /**
     * Update the layers observable
     * @private
     * @param {?} layers Layers
     * @return {?}
     */
    setLayers(layers) {
        this.layers$.next(this.sortLayersByZIndex(layers).slice(0));
    }
    /**
     * Sort layers by descending zIndex
     * @private
     * @param {?} layers Array of layers
     * @return {?} The original array, sorted by zIndex
     */
    sortLayersByZIndex(layers) {
        // Sort by descending zIndex
        return layers.sort((/**
         * @param {?} layer1
         * @param {?} layer2
         * @return {?}
         */
        (layer1, layer2) => layer2.zIndex - layer1.zIndex));
    }
    /**
     * Get layer index in the map's inenr array of layers
     * @private
     * @param {?} layer Layer
     * @return {?} The layer index
     */
    getLayerIndex(layer) {
        return this.layers.findIndex((/**
         * @param {?} _layer
         * @return {?}
         */
        (_layer) => _layer === layer));
    }
    // TODO: Create a GeolocationController with everything below
    /**
     * @param {?=} track
     * @return {?}
     */
    geolocate(track = false) {
        /** @type {?} */
        let first = true;
        if (this.geolocation$$) {
            track = this.geolocation.getTracking();
            this.unsubscribeGeolocate();
        }
        this.startGeolocation();
        this.geolocation$$ = this.geolocation$.subscribe((/**
         * @param {?} geolocation
         * @return {?}
         */
        geolocation => {
            if (!geolocation) {
                return;
            }
            /** @type {?} */
            const accuracy = geolocation.getAccuracy();
            if (accuracy < 10000) {
                /** @type {?} */
                const geometry = geolocation.getAccuracyGeometry();
                /** @type {?} */
                const extent = geometry.getExtent();
                if (this.geolocationFeature &&
                    this.overlay.dataSource.ol.getFeatureById(this.geolocationFeature.getId())) {
                    this.overlay.dataSource.ol.removeFeature(this.geolocationFeature);
                }
                if (this.bufferFeature) {
                    this.buffer.dataSource.ol.removeFeature(this.bufferFeature);
                }
                this.geolocationFeature = new olFeature({ geometry });
                this.geolocationFeature.setId('geolocationFeature');
                this.overlay.addOlFeature(this.geolocationFeature);
                if (this.ol.getView().options_.buffer) {
                    /** @type {?} */
                    const bufferRadius = this.ol.getView().options_.buffer.bufferRadius;
                    /** @type {?} */
                    const coordinates = geolocation.getPosition();
                    this.bufferGeom = new olCircle(coordinates, bufferRadius);
                    /** @type {?} */
                    const bufferStroke = this.ol.getView().options_.buffer.bufferStroke;
                    /** @type {?} */
                    const bufferFill = this.ol.getView().options_.buffer.bufferFill;
                    /** @type {?} */
                    let bufferText;
                    if (this.ol.getView().options_.buffer.showBufferRadius) {
                        bufferText = bufferRadius.toString() + 'm';
                    }
                    else {
                        bufferText = '';
                    }
                    this.bufferFeature = new olFeature(this.bufferGeom);
                    this.bufferFeature.setId('bufferFeature');
                    this.bufferFeature.set('bufferStroke', bufferStroke);
                    this.bufferFeature.set('bufferFill', bufferFill);
                    this.bufferFeature.set('bufferText', bufferText);
                    this.buffer.addOlFeature(this.bufferFeature);
                }
                if (first) {
                    this.viewController.zoomToExtent(extent);
                }
            }
            else if (first) {
                /** @type {?} */
                const view = this.ol.getView();
                /** @type {?} */
                const coordinates = geolocation.getPosition();
                view.setCenter(coordinates);
                view.setZoom(14);
            }
            if (track) {
                this.unsubscribeGeolocate();
            }
            first = false;
        }));
    }
    /**
     * @return {?}
     */
    unsubscribeGeolocate() {
        this.stopGeolocation();
        if (this.geolocation$$) {
            this.geolocation$$.unsubscribe();
            this.geolocation$$ = undefined;
        }
    }
    /**
     * @private
     * @return {?}
     */
    startGeolocation() {
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
            evt => {
                this.geolocation$.next(this.geolocation);
            }));
        }
        else {
            this.geolocation.setTracking(true);
        }
    }
    /**
     * @private
     * @return {?}
     */
    stopGeolocation() {
        if (this.geolocation) {
            this.geolocation.setTracking(false);
        }
    }
    /**
     * @param {?} offline
     * @return {?}
     */
    onOfflineToggle(offline) {
        this.offlineButtonToggle$.next(offline);
        this.offlineButtonState = offline;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL21hcC9zaGFyZWQvbWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssTUFBTSxRQUFRLENBQUM7QUFDM0IsT0FBTyxNQUFNLE1BQU0sU0FBUyxDQUFDO0FBQzdCLE9BQU8sU0FBUyxNQUFNLFlBQVksQ0FBQztBQUNuQyxPQUFPLGFBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLG9CQUFvQixNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sa0JBQWtCLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxLQUFLLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFDbEMsT0FBTyxLQUFLLE9BQU8sTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxLQUFLLGFBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRCxPQUFPLFFBQVEsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0QyxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDMUIsT0FBTyxFQUFFLGVBQWUsRUFBeUIsTUFBTSxNQUFNLENBQUM7QUFLOUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRXZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQVF0RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7O0FBS3ZELE1BQU0sT0FBTyxNQUFNOzs7O0lBaUNqQixZQUFZLE9BQW9CO1FBL0J6Qix5QkFBb0IsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztRQUMzRCx1QkFBa0IsR0FBWSxLQUFLLENBQUM7UUFDcEMsWUFBTyxHQUFHLElBQUksZUFBZSxDQUFVLEVBQUUsQ0FBQyxDQUFDO1FBRTNDLGlCQUFZLEdBQUcsSUFBSSxlQUFlLENBQWdCLFNBQVMsQ0FBQyxDQUFDO1FBZTVELG1CQUFjLEdBQXdCO1lB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Q0FBQyxrQkFBa0IsR0FBRyxPQUFPLENBQUM7SUFDcEMsQ0FBQztDQUNGOzs7SUFuY0Msb0JBQWlCOztJQUNqQixzQ0FBa0U7O0lBQ2xFLG9DQUEyQzs7SUFDM0MseUJBQWtEOztJQUNsRCx5QkFBdUM7O0lBQ3ZDLDhCQUFvRTs7SUFDcEUsb0NBQXFDOztJQUNyQyw0QkFBNEI7O0lBQzVCLCtCQUFnQzs7SUFDaEMsd0JBQXVCOztJQUN2Qix5QkFBd0I7O0lBQ3hCLGdDQUF5Qzs7SUFFekMsa0NBQTJDOzs7OztJQUUzQyw4QkFBbUM7Ozs7O0lBQ25DLDZCQUFtQzs7Ozs7SUFDbkMsK0JBQW9DOzs7OztJQUVwQyx5QkFBNEI7Ozs7O0lBQzVCLGdDQUVFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9sTWFwIGZyb20gJ29sL01hcCc7XHJcbmltcG9ydCBvbFZpZXcgZnJvbSAnb2wvVmlldyc7XHJcbmltcG9ydCBvbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCBvbEdlb2xvY2F0aW9uIGZyb20gJ29sL0dlb2xvY2F0aW9uJztcclxuaW1wb3J0IG9sQ29udHJvbEF0dHJpYnV0aW9uIGZyb20gJ29sL2NvbnRyb2wvQXR0cmlidXRpb24nO1xyXG5pbXBvcnQgb2xDb250cm9sU2NhbGVMaW5lIGZyb20gJ29sL2NvbnRyb2wvU2NhbGVMaW5lJztcclxuaW1wb3J0ICogYXMgb2xwcm9qIGZyb20gJ29sL3Byb2onO1xyXG5pbXBvcnQgKiBhcyBvbHByb2o0IGZyb20gJ29sL3Byb2ovcHJvajQnO1xyXG5pbXBvcnQgT2xQcm9qZWN0aW9uIGZyb20gJ29sL3Byb2ovUHJvamVjdGlvbic7XHJcbmltcG9ydCAqIGFzIG9saW50ZXJhY3Rpb24gZnJvbSAnb2wvaW50ZXJhY3Rpb24nO1xyXG5pbXBvcnQgb2xDaXJjbGUgZnJvbSAnb2wvZ2VvbS9DaXJjbGUnO1xyXG5cclxuaW1wb3J0IHByb2o0IGZyb20gJ3Byb2o0JztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IFN1YmplY3RTdGF0dXMgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMnO1xyXG5pbXBvcnQgeyBPdmVybGF5IH0gZnJvbSAnLi4vLi4vb3ZlcmxheS9zaGFyZWQvb3ZlcmxheSc7XHJcblxyXG5pbXBvcnQgeyBMYXllcldhdGNoZXIgfSBmcm9tICcuLi91dGlscy9sYXllci13YXRjaGVyJztcclxuaW1wb3J0IHtcclxuICBNYXBWaWV3T3B0aW9ucyxcclxuICBNYXBPcHRpb25zLFxyXG4gIE1hcEF0dHJpYnV0aW9uT3B0aW9ucyxcclxuICBNYXBTY2FsZUxpbmVPcHRpb25zLFxyXG4gIE1hcEV4dGVudFxyXG59IGZyb20gJy4vbWFwLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IE1hcFZpZXdDb250cm9sbGVyIH0gZnJvbSAnLi9jb250cm9sbGVycy92aWV3JztcclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9mZWF0dXJlLWRhdGFzb3VyY2UnO1xyXG5cclxuLy8gVE9ETzogVGhpcyBjbGFzcyBpcyBtZXNzeS4gQ2xlYXJseSBkZWZpbmUgaXQncyBzY29wZSBhbmQgdGhlIG1hcCBicm93c2VyJ3MuXHJcbi8vIE1vdmUgc29tZSBzdHVmZiBpbnRvIGNvbnRyb2xsZXJzLlxyXG5leHBvcnQgY2xhc3MgSWdvTWFwIHtcclxuICBwdWJsaWMgb2w6IG9sTWFwO1xyXG4gIHB1YmxpYyBvZmZsaW5lQnV0dG9uVG9nZ2xlJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xyXG4gIHB1YmxpYyBvZmZsaW5lQnV0dG9uU3RhdGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwdWJsaWMgbGF5ZXJzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TGF5ZXJbXT4oW10pO1xyXG4gIHB1YmxpYyBzdGF0dXMkOiBTdWJqZWN0PFN1YmplY3RTdGF0dXM+O1xyXG4gIHB1YmxpYyBnZW9sb2NhdGlvbiQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG9sR2VvbG9jYXRpb24+KHVuZGVmaW5lZCk7XHJcbiAgcHVibGljIGdlb2xvY2F0aW9uRmVhdHVyZTogb2xGZWF0dXJlO1xyXG4gIHB1YmxpYyBidWZmZXJHZW9tOiBvbENpcmNsZTtcclxuICBwdWJsaWMgYnVmZmVyRmVhdHVyZTogb2xGZWF0dXJlO1xyXG4gIHB1YmxpYyBidWZmZXI6IE92ZXJsYXk7XHJcbiAgcHVibGljIG92ZXJsYXk6IE92ZXJsYXk7XHJcbiAgcHVibGljIHZpZXdDb250cm9sbGVyOiBNYXBWaWV3Q29udHJvbGxlcjtcclxuXHJcbiAgcHVibGljIGJ1ZmZlckRhdGFTb3VyY2U6IEZlYXR1cmVEYXRhU291cmNlO1xyXG5cclxuICBwcml2YXRlIGxheWVyV2F0Y2hlcjogTGF5ZXJXYXRjaGVyO1xyXG4gIHByaXZhdGUgZ2VvbG9jYXRpb246IG9sR2VvbG9jYXRpb247XHJcbiAgcHJpdmF0ZSBnZW9sb2NhdGlvbiQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIHByaXZhdGUgb3B0aW9uczogTWFwT3B0aW9ucztcclxuICBwcml2YXRlIGRlZmF1bHRPcHRpb25zOiBQYXJ0aWFsPE1hcE9wdGlvbnM+ID0ge1xyXG4gICAgY29udHJvbHM6IHsgYXR0cmlidXRpb246IGZhbHNlIH1cclxuICB9O1xyXG5cclxuICBnZXQgbGF5ZXJzKCk6IExheWVyW10ge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJzJC52YWx1ZTtcclxuICB9XHJcblxyXG4gIGdldCBwcm9qZWN0aW9uKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy52aWV3Q29udHJvbGxlci5nZXRPbFByb2plY3Rpb24oKS5nZXRDb2RlKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zPzogTWFwT3B0aW9ucykge1xyXG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICB0aGlzLmxheWVyV2F0Y2hlciA9IG5ldyBMYXllcldhdGNoZXIoKTtcclxuICAgIHRoaXMuc3RhdHVzJCA9IHRoaXMubGF5ZXJXYXRjaGVyLnN0YXR1cyQ7XHJcbiAgICBvbHByb2o0LnJlZ2lzdGVyKHByb2o0KTtcclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgaW5pdCgpIHtcclxuICAgIGNvbnN0IGNvbnRyb2xzID0gW107XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRyb2xzKSB7XHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuY29udHJvbHMuYXR0cmlidXRpb24pIHtcclxuICAgICAgICBjb25zdCBhdHRyaWJ1dGlvbk9wdCA9ICh0aGlzLm9wdGlvbnMuY29udHJvbHMuYXR0cmlidXRpb24gPT09IHRydWVcclxuICAgICAgICAgID8ge31cclxuICAgICAgICAgIDogdGhpcy5vcHRpb25zLmNvbnRyb2xzLmF0dHJpYnV0aW9uKSBhcyBNYXBBdHRyaWJ1dGlvbk9wdGlvbnM7XHJcbiAgICAgICAgY29udHJvbHMucHVzaChuZXcgb2xDb250cm9sQXR0cmlidXRpb24oYXR0cmlidXRpb25PcHQpKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRyb2xzLnNjYWxlTGluZSkge1xyXG4gICAgICAgIGNvbnN0IHNjYWxlTGluZU9wdCA9ICh0aGlzLm9wdGlvbnMuY29udHJvbHMuc2NhbGVMaW5lID09PSB0cnVlXHJcbiAgICAgICAgICA/IHt9XHJcbiAgICAgICAgICA6IHRoaXMub3B0aW9ucy5jb250cm9scy5zY2FsZUxpbmUpIGFzIE1hcFNjYWxlTGluZU9wdGlvbnM7XHJcbiAgICAgICAgY29udHJvbHMucHVzaChuZXcgb2xDb250cm9sU2NhbGVMaW5lKHNjYWxlTGluZU9wdCkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgaW50ZXJhY3Rpb25zID0ge307XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmludGVyYWN0aW9ucyA9PT0gZmFsc2UpIHtcclxuICAgICAgaW50ZXJhY3Rpb25zID0ge1xyXG4gICAgICAgIGFsdFNoaWZ0RHJhZ1JvdGF0ZTogZmFsc2UsXHJcbiAgICAgICAgZG91YmxlQ2xpY2tab29tOiBmYWxzZSxcclxuICAgICAgICBrZXlib2FyZDogZmFsc2UsXHJcbiAgICAgICAgbW91c2VXaGVlbFpvb206IGZhbHNlLFxyXG4gICAgICAgIHNoaWZ0RHJhZ1pvb206IGZhbHNlLFxyXG4gICAgICAgIGRyYWdQYW46IGZhbHNlLFxyXG4gICAgICAgIHBpbmNoUm90YXRlOiBmYWxzZSxcclxuICAgICAgICBwaW5jaFpvb206IGZhbHNlXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vbCA9IG5ldyBvbE1hcCh7XHJcbiAgICAgIGludGVyYWN0aW9uczogb2xpbnRlcmFjdGlvbi5kZWZhdWx0cyhpbnRlcmFjdGlvbnMpLFxyXG4gICAgICBjb250cm9sc1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5zZXRWaWV3KHRoaXMub3B0aW9ucy52aWV3IHx8IHt9KTtcclxuICAgIHRoaXMudmlld0NvbnRyb2xsZXIgPSBuZXcgTWFwVmlld0NvbnRyb2xsZXIoe1xyXG4gICAgICBzdGF0ZUhpc3Rvcnk6IHRydWVcclxuICAgIH0pO1xyXG4gICAgdGhpcy52aWV3Q29udHJvbGxlci5zZXRPbE1hcCh0aGlzLm9sKTtcclxuICAgIHRoaXMub3ZlcmxheSA9IG5ldyBPdmVybGF5KHRoaXMpO1xyXG4gICAgdGhpcy5idWZmZXIgPSBuZXcgT3ZlcmxheSh0aGlzKTtcclxuICB9XHJcblxyXG4gIHNldFRhcmdldChpZDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLm9sLnNldFRhcmdldChpZCk7XHJcbiAgICBpZiAoaWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmxheWVyV2F0Y2hlci5zdWJzY3JpYmUoKCkgPT4ge30sIG51bGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5sYXllcldhdGNoZXIudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZVZpZXcob3B0aW9uczogTWFwVmlld09wdGlvbnMpIHtcclxuICAgIGNvbnN0IGN1cnJlbnRWaWV3ID0gdGhpcy5vbC5nZXRWaWV3KCk7XHJcbiAgICBjb25zdCB2aWV3T3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgIHtcclxuICAgICAgICB6b29tOiBjdXJyZW50Vmlldy5nZXRab29tKClcclxuICAgICAgfSxcclxuICAgICAgY3VycmVudFZpZXcuZ2V0UHJvcGVydGllcygpXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuc2V0VmlldyhPYmplY3QuYXNzaWduKHZpZXdPcHRpb25zLCBvcHRpb25zKSk7XHJcbiAgICBpZiAob3B0aW9ucy5tYXhab29tT25FeHRlbnQpIHtcclxuICAgICAgdGhpcy52aWV3Q29udHJvbGxlci5tYXhab29tT25FeHRlbnQgPSBvcHRpb25zLm1heFpvb21PbkV4dGVudDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgbWFwIHZpZXdcclxuICAgKiBAcGFyYW0gb3B0aW9ucyBNYXAgdmlldyBvcHRpb25zXHJcbiAgICovXHJcbiAgc2V0VmlldyhvcHRpb25zOiBNYXBWaWV3T3B0aW9ucykge1xyXG4gICAgaWYgKHRoaXMudmlld0NvbnRyb2xsZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnZpZXdDb250cm9sbGVyLmNsZWFyU3RhdGVIaXN0b3J5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdmlldyA9IG5ldyBvbFZpZXcob3B0aW9ucyk7XHJcbiAgICB0aGlzLm9sLnNldFZpZXcodmlldyk7XHJcblxyXG4gICAgdGhpcy51bnN1YnNjcmliZUdlb2xvY2F0ZSgpO1xyXG4gICAgaWYgKG9wdGlvbnMpIHtcclxuICAgICAgaWYgKG9wdGlvbnMuY2VudGVyKSB7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdGlvbiA9IHZpZXcuZ2V0UHJvamVjdGlvbigpLmdldENvZGUoKTtcclxuICAgICAgICBjb25zdCBjZW50ZXIgPSBvbHByb2ouZnJvbUxvbkxhdChvcHRpb25zLmNlbnRlciwgcHJvamVjdGlvbik7XHJcbiAgICAgICAgdmlldy5zZXRDZW50ZXIoY2VudGVyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKG9wdGlvbnMuZ2VvbG9jYXRlKSB7XHJcbiAgICAgICAgdGhpcy5nZW9sb2NhdGUodHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlcHJlY2F0ZWRcclxuICAgKiBUT0RPOiBNb3ZlIHRvIFZpZXdDb250cm9sbGVyIGFuZCB1cGRhdGUgZXZlcnkgcGxhY2UgaXQncyB1c2VkXHJcbiAgICovXHJcbiAgZ2V0Q2VudGVyKHByb2plY3Rpb24/OiBzdHJpbmcgfCBPbFByb2plY3Rpb24pOiBbbnVtYmVyLCBudW1iZXJdIHtcclxuICAgIHJldHVybiB0aGlzLnZpZXdDb250cm9sbGVyLmdldENlbnRlcihwcm9qZWN0aW9uKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlcHJlY2F0ZWRcclxuICAgKiBUT0RPOiBNb3ZlIHRvIFZpZXdDb250cm9sbGVyIGFuZCB1cGRhdGUgZXZlcnkgcGxhY2UgaXQncyB1c2VkXHJcbiAgICovXHJcbiAgZ2V0RXh0ZW50KHByb2plY3Rpb24/OiBzdHJpbmcgfCBPbFByb2plY3Rpb24pOiBNYXBFeHRlbnQge1xyXG4gICAgcmV0dXJuIHRoaXMudmlld0NvbnRyb2xsZXIuZ2V0RXh0ZW50KHByb2plY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgLy8gVE9ETzogTW92ZSB0byBWaWV3Q29udHJvbGxlciBhbmQgdXBkYXRlIGV2ZXJ5IHBsYWNlIGl0J3MgdXNlZFxyXG4gIGdldFpvb20oKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLnZpZXdDb250cm9sbGVyLmdldFpvb20oKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZUJhc2VMYXllcihiYXNlTGF5ZXI6IExheWVyKSB7XHJcbiAgICBpZiAoIWJhc2VMYXllcikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBibCBvZiB0aGlzLmdldEJhc2VMYXllcnMoKSkge1xyXG4gICAgICBibC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgYmFzZUxheWVyLnZpc2libGUgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMudmlld0NvbnRyb2xsZXIub2xWaWV3LnNldE1pblpvb20oXHJcbiAgICAgIGJhc2VMYXllci5kYXRhU291cmNlLm9wdGlvbnMubWluWm9vbSB8fCAodGhpcy5vcHRpb25zLnZpZXcgfHwge30pLm1pblpvb21cclxuICAgICk7XHJcbiAgICB0aGlzLnZpZXdDb250cm9sbGVyLm9sVmlldy5zZXRNYXhab29tKFxyXG4gICAgICBiYXNlTGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zLm1heFpvb20gfHwgKHRoaXMub3B0aW9ucy52aWV3IHx8IHt9KS5tYXhab29tXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0QmFzZUxheWVycygpOiBMYXllcltdIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVycy5maWx0ZXIoKGxheWVyOiBMYXllcikgPT4gbGF5ZXIuYmFzZUxheWVyID09PSB0cnVlKTtcclxuICB9XHJcblxyXG4gIGdldExheWVyQnlJZChpZDogc3RyaW5nKTogTGF5ZXIge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJzLmZpbmQoKGxheWVyOiBMYXllcikgPT4gbGF5ZXIuaWQgJiYgbGF5ZXIuaWQgPT09IGlkKTtcclxuICB9XHJcblxyXG4gIGdldExheWVyQnlBbGlhcyhhbGlhczogc3RyaW5nKTogTGF5ZXIge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJzLmZpbmQoXHJcbiAgICAgIChsYXllcjogTGF5ZXIpID0+IGxheWVyLmFsaWFzICYmIGxheWVyLmFsaWFzID09PSBhbGlhc1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhIHNpbmdsZSBsYXllclxyXG4gICAqIEBwYXJhbSBsYXllciBMYXllciB0byBhZGRcclxuICAgKiBAcGFyYW0gcHVzaCBERVBSRUNBVEVEXHJcbiAgICovXHJcbiAgYWRkTGF5ZXIobGF5ZXI6IExheWVyLCBwdXNoID0gdHJ1ZSkge1xyXG4gICAgdGhpcy5hZGRMYXllcnMoW2xheWVyXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgbWFueSBsYXllcnNcclxuICAgKiBAcGFyYW0gbGF5ZXJzIExheWVycyB0byBhZGRcclxuICAgKiBAcGFyYW0gcHVzaCBERVBSRUNBVEVEXHJcbiAgICovXHJcbiAgYWRkTGF5ZXJzKGxheWVyczogTGF5ZXJbXSwgcHVzaCA9IHRydWUpIHtcclxuICAgIGxldCBpbmNyZW1lbnRBcnJheSA9IDA7XHJcbiAgICBjb25zdCBhZGRlZExheWVycyA9IGxheWVyc1xyXG4gICAgICAubWFwKChsYXllcjogTGF5ZXIpID0+IHRoaXMuZG9BZGRMYXllcihsYXllciwgaW5jcmVtZW50QXJyYXkrKykpXHJcbiAgICAgIC5maWx0ZXIoKGxheWVyOiBMYXllciB8IHVuZGVmaW5lZCkgPT4gbGF5ZXIgIT09IHVuZGVmaW5lZCk7XHJcbiAgICB0aGlzLnNldExheWVycyhbXS5jb25jYXQodGhpcy5sYXllcnMsIGFkZGVkTGF5ZXJzKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgYSBzaW5nbGUgbGF5ZXJcclxuICAgKiBAcGFyYW0gbGF5ZXIgTGF5ZXIgdG8gcmVtb3ZlXHJcbiAgICovXHJcbiAgcmVtb3ZlTGF5ZXIobGF5ZXI6IExheWVyKSB7XHJcbiAgICB0aGlzLnJlbW92ZUxheWVycyhbbGF5ZXJdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBtYW55IGxheWVyc1xyXG4gICAqIEBwYXJhbSBsYXllcnMgTGF5ZXJzIHRvIHJlbW92ZVxyXG4gICAqL1xyXG4gIHJlbW92ZUxheWVycyhsYXllcnM6IExheWVyW10pIHtcclxuICAgIGNvbnN0IG5ld0xheWVycyA9IHRoaXMubGF5ZXJzJC52YWx1ZS5zbGljZSgwKTtcclxuICAgIGNvbnN0IGxheWVyc1RvUmVtb3ZlID0gW107XHJcbiAgICBsYXllcnMuZm9yRWFjaCgobGF5ZXI6IExheWVyKSA9PiB7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRMYXllckluZGV4KGxheWVyKTtcclxuICAgICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgICBsYXllcnNUb1JlbW92ZS5wdXNoKGxheWVyKTtcclxuICAgICAgICBuZXdMYXllcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgbGF5ZXJzVG9SZW1vdmUuZm9yRWFjaCgobGF5ZXI6IExheWVyKSA9PiB0aGlzLmRvUmVtb3ZlTGF5ZXIobGF5ZXIpKTtcclxuICAgIHRoaXMuc2V0TGF5ZXJzKG5ld0xheWVycyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgYWxsIGxheWVyc1xyXG4gICAqL1xyXG4gIHJlbW92ZUFsbExheWVycygpIHtcclxuICAgIHRoaXMubGF5ZXJzLmZvckVhY2goKGxheWVyOiBMYXllcikgPT4gdGhpcy5kb1JlbW92ZUxheWVyKGxheWVyKSk7XHJcbiAgICB0aGlzLmxheWVycyQubmV4dChbXSk7XHJcbiAgfVxyXG5cclxuICByYWlzZUxheWVyKGxheWVyOiBMYXllcikge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmdldExheWVySW5kZXgobGF5ZXIpO1xyXG4gICAgaWYgKGluZGV4ID4gMCkge1xyXG4gICAgICB0aGlzLm1vdmVMYXllcihsYXllciwgaW5kZXgsIGluZGV4IC0gMSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsb3dlckxheWVyKGxheWVyOiBMYXllcikge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmdldExheWVySW5kZXgobGF5ZXIpO1xyXG4gICAgaWYgKGluZGV4IDwgdGhpcy5sYXllcnMubGVuZ3RoIC0gMSkge1xyXG4gICAgICB0aGlzLm1vdmVMYXllcihsYXllciwgaW5kZXgsIGluZGV4ICsgMSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtb3ZlTGF5ZXIobGF5ZXI6IExheWVyLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IGxheWVyVG8gPSB0aGlzLmxheWVyc1t0b107XHJcbiAgICBjb25zdCB6SW5kZXhUbyA9IGxheWVyVG8uekluZGV4O1xyXG4gICAgY29uc3QgekluZGV4RnJvbSA9IGxheWVyLnpJbmRleDtcclxuXHJcbiAgICBpZiAobGF5ZXJUby5iYXNlTGF5ZXIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxheWVyLnpJbmRleCA9IHpJbmRleFRvO1xyXG4gICAgbGF5ZXJUby56SW5kZXggPSB6SW5kZXhGcm9tO1xyXG5cclxuICAgIHRoaXMubGF5ZXJzW3RvXSA9IGxheWVyO1xyXG4gICAgdGhpcy5sYXllcnNbZnJvbV0gPSBsYXllclRvO1xyXG4gICAgdGhpcy5sYXllcnMkLm5leHQodGhpcy5sYXllcnMuc2xpY2UoMCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGEgbGF5ZXIgdG8gdGhlIE9MIG1hcCBhbmQgc3RhcnQgd2F0Y2hpbmcuIElmIHRoZSBsYXllciBpcyBhbHJlYWR5XHJcbiAgICogYWRkZWQgdG8gdGhpcyBtYXAsIG1ha2UgaXQgdmlzaWJsZSBidXQgZG9uJ3QgYWRkIGl0IG9uZSBhZ2Fpbi5cclxuICAgKiBAcGFyYW0gbGF5ZXIgTGF5ZXJcclxuICAgKiBAcmV0dXJucyBUaGUgbGF5ZXIgYWRkZWQsIGlmIGFueVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZG9BZGRMYXllcihsYXllcjogTGF5ZXIsIGxlbmd0aDogbnVtYmVyKSB7XHJcbiAgICBpZiAobGF5ZXIuYmFzZUxheWVyICYmIGxheWVyLnZpc2libGUpIHtcclxuICAgICAgdGhpcy5jaGFuZ2VCYXNlTGF5ZXIobGF5ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGV4aXN0aW5nTGF5ZXIgPSB0aGlzLmdldExheWVyQnlJZChsYXllci5pZCk7XHJcbiAgICBpZiAoZXhpc3RpbmdMYXllciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGV4aXN0aW5nTGF5ZXIudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobGF5ZXIuekluZGV4ID09PSB1bmRlZmluZWQgfHwgbGF5ZXIuekluZGV4ID09PSAwKSB7XHJcbiAgICAgIGNvbnN0IG9mZnNldCA9IGxheWVyLmJhc2VMYXllciA/IDEgOiAxMDtcclxuICAgICAgbGF5ZXIuekluZGV4ID0gdGhpcy5sYXllcnMubGVuZ3RoICsgb2Zmc2V0ICsgbGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIGxheWVyLnNldE1hcCh0aGlzKTtcclxuICAgIHRoaXMubGF5ZXJXYXRjaGVyLndhdGNoTGF5ZXIobGF5ZXIpO1xyXG4gICAgdGhpcy5vbC5hZGRMYXllcihsYXllci5vbCk7XHJcblxyXG4gICAgcmV0dXJuIGxheWVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIGEgbGF5ZXIgZnJvbSB0aGUgT0wgbWFwIGFuZCBzdG9wIHdhdGNoaW5nXHJcbiAgICogQHBhcmFtIGxheWVyIExheWVyXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkb1JlbW92ZUxheWVyKGxheWVyOiBMYXllcikge1xyXG4gICAgdGhpcy5sYXllcldhdGNoZXIudW53YXRjaExheWVyKGxheWVyKTtcclxuICAgIHRoaXMub2wucmVtb3ZlTGF5ZXIobGF5ZXIub2wpO1xyXG4gICAgbGF5ZXIuc2V0TWFwKHVuZGVmaW5lZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgdGhlIGxheWVycyBvYnNlcnZhYmxlXHJcbiAgICogQHBhcmFtIGxheWVycyBMYXllcnNcclxuICAgKi9cclxuICBwcml2YXRlIHNldExheWVycyhsYXllcnM6IExheWVyW10pIHtcclxuICAgIHRoaXMubGF5ZXJzJC5uZXh0KHRoaXMuc29ydExheWVyc0J5WkluZGV4KGxheWVycykuc2xpY2UoMCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU29ydCBsYXllcnMgYnkgZGVzY2VuZGluZyB6SW5kZXhcclxuICAgKiBAcGFyYW0gbGF5ZXJzIEFycmF5IG9mIGxheWVyc1xyXG4gICAqIEByZXR1cm5zIFRoZSBvcmlnaW5hbCBhcnJheSwgc29ydGVkIGJ5IHpJbmRleFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc29ydExheWVyc0J5WkluZGV4KGxheWVyczogTGF5ZXJbXSkge1xyXG4gICAgLy8gU29ydCBieSBkZXNjZW5kaW5nIHpJbmRleFxyXG4gICAgcmV0dXJuIGxheWVycy5zb3J0KFxyXG4gICAgICAobGF5ZXIxOiBMYXllciwgbGF5ZXIyOiBMYXllcikgPT4gbGF5ZXIyLnpJbmRleCAtIGxheWVyMS56SW5kZXhcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgbGF5ZXIgaW5kZXggaW4gdGhlIG1hcCdzIGluZW5yIGFycmF5IG9mIGxheWVyc1xyXG4gICAqIEBwYXJhbSBsYXllciBMYXllclxyXG4gICAqIEByZXR1cm5zIFRoZSBsYXllciBpbmRleFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0TGF5ZXJJbmRleChsYXllcjogTGF5ZXIpIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVycy5maW5kSW5kZXgoKF9sYXllcjogTGF5ZXIpID0+IF9sYXllciA9PT0gbGF5ZXIpO1xyXG4gIH1cclxuXHJcbiAgLy8gVE9ETzogQ3JlYXRlIGEgR2VvbG9jYXRpb25Db250cm9sbGVyIHdpdGggZXZlcnl0aGluZyBiZWxvd1xyXG4gIGdlb2xvY2F0ZSh0cmFjayA9IGZhbHNlKSB7XHJcbiAgICBsZXQgZmlyc3QgPSB0cnVlO1xyXG4gICAgaWYgKHRoaXMuZ2VvbG9jYXRpb24kJCkge1xyXG4gICAgICB0cmFjayA9IHRoaXMuZ2VvbG9jYXRpb24uZ2V0VHJhY2tpbmcoKTtcclxuICAgICAgdGhpcy51bnN1YnNjcmliZUdlb2xvY2F0ZSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zdGFydEdlb2xvY2F0aW9uKCk7XHJcblxyXG4gICAgdGhpcy5nZW9sb2NhdGlvbiQkID0gdGhpcy5nZW9sb2NhdGlvbiQuc3Vic2NyaWJlKGdlb2xvY2F0aW9uID0+IHtcclxuICAgICAgaWYgKCFnZW9sb2NhdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBhY2N1cmFjeSA9IGdlb2xvY2F0aW9uLmdldEFjY3VyYWN5KCk7XHJcbiAgICAgIGlmIChhY2N1cmFjeSA8IDEwMDAwKSB7XHJcbiAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBnZW9sb2NhdGlvbi5nZXRBY2N1cmFjeUdlb21ldHJ5KCk7XHJcbiAgICAgICAgY29uc3QgZXh0ZW50ID0gZ2VvbWV0cnkuZ2V0RXh0ZW50KCk7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgdGhpcy5nZW9sb2NhdGlvbkZlYXR1cmUgJiZcclxuICAgICAgICAgIHRoaXMub3ZlcmxheS5kYXRhU291cmNlLm9sLmdldEZlYXR1cmVCeUlkKFxyXG4gICAgICAgICAgICB0aGlzLmdlb2xvY2F0aW9uRmVhdHVyZS5nZXRJZCgpXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICB0aGlzLm92ZXJsYXkuZGF0YVNvdXJjZS5vbC5yZW1vdmVGZWF0dXJlKHRoaXMuZ2VvbG9jYXRpb25GZWF0dXJlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmJ1ZmZlckZlYXR1cmUpIHtcclxuICAgICAgICAgIHRoaXMuYnVmZmVyLmRhdGFTb3VyY2Uub2wucmVtb3ZlRmVhdHVyZSh0aGlzLmJ1ZmZlckZlYXR1cmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5nZW9sb2NhdGlvbkZlYXR1cmUgPSBuZXcgb2xGZWF0dXJlKHsgZ2VvbWV0cnkgfSk7XHJcbiAgICAgICAgdGhpcy5nZW9sb2NhdGlvbkZlYXR1cmUuc2V0SWQoJ2dlb2xvY2F0aW9uRmVhdHVyZScpO1xyXG4gICAgICAgIHRoaXMub3ZlcmxheS5hZGRPbEZlYXR1cmUodGhpcy5nZW9sb2NhdGlvbkZlYXR1cmUpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vbC5nZXRWaWV3KCkub3B0aW9uc18uYnVmZmVyKSB7XHJcbiAgICAgICAgICBjb25zdCBidWZmZXJSYWRpdXMgPSB0aGlzLm9sLmdldFZpZXcoKS5vcHRpb25zXy5idWZmZXIuYnVmZmVyUmFkaXVzO1xyXG4gICAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBnZW9sb2NhdGlvbi5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgdGhpcy5idWZmZXJHZW9tID0gbmV3IG9sQ2lyY2xlKGNvb3JkaW5hdGVzLCBidWZmZXJSYWRpdXMpO1xyXG4gICAgICAgICAgY29uc3QgYnVmZmVyU3Ryb2tlID0gdGhpcy5vbC5nZXRWaWV3KCkub3B0aW9uc18uYnVmZmVyLmJ1ZmZlclN0cm9rZTtcclxuICAgICAgICAgIGNvbnN0IGJ1ZmZlckZpbGwgPSB0aGlzLm9sLmdldFZpZXcoKS5vcHRpb25zXy5idWZmZXIuYnVmZmVyRmlsbDtcclxuXHJcbiAgICAgICAgICBsZXQgYnVmZmVyVGV4dDtcclxuICAgICAgICAgIGlmICh0aGlzLm9sLmdldFZpZXcoKS5vcHRpb25zXy5idWZmZXIuc2hvd0J1ZmZlclJhZGl1cykge1xyXG4gICAgICAgICAgICBidWZmZXJUZXh0ID0gYnVmZmVyUmFkaXVzLnRvU3RyaW5nKCkgKyAnbSc7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBidWZmZXJUZXh0ID0gJyc7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdGhpcy5idWZmZXJGZWF0dXJlID0gbmV3IG9sRmVhdHVyZSh0aGlzLmJ1ZmZlckdlb20pO1xyXG4gICAgICAgICAgdGhpcy5idWZmZXJGZWF0dXJlLnNldElkKCdidWZmZXJGZWF0dXJlJyk7XHJcbiAgICAgICAgICB0aGlzLmJ1ZmZlckZlYXR1cmUuc2V0KCdidWZmZXJTdHJva2UnLCBidWZmZXJTdHJva2UpO1xyXG4gICAgICAgICAgdGhpcy5idWZmZXJGZWF0dXJlLnNldCgnYnVmZmVyRmlsbCcsIGJ1ZmZlckZpbGwpO1xyXG4gICAgICAgICAgdGhpcy5idWZmZXJGZWF0dXJlLnNldCgnYnVmZmVyVGV4dCcsIGJ1ZmZlclRleHQpO1xyXG4gICAgICAgICAgdGhpcy5idWZmZXIuYWRkT2xGZWF0dXJlKHRoaXMuYnVmZmVyRmVhdHVyZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChmaXJzdCkge1xyXG4gICAgICAgICAgdGhpcy52aWV3Q29udHJvbGxlci56b29tVG9FeHRlbnQoZXh0ZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAoZmlyc3QpIHtcclxuICAgICAgICBjb25zdCB2aWV3ID0gdGhpcy5vbC5nZXRWaWV3KCk7XHJcbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBnZW9sb2NhdGlvbi5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIHZpZXcuc2V0Q2VudGVyKGNvb3JkaW5hdGVzKTtcclxuICAgICAgICB2aWV3LnNldFpvb20oMTQpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0cmFjaykge1xyXG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmVHZW9sb2NhdGUoKTtcclxuICAgICAgfVxyXG4gICAgICBmaXJzdCA9IGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB1bnN1YnNjcmliZUdlb2xvY2F0ZSgpIHtcclxuICAgIHRoaXMuc3RvcEdlb2xvY2F0aW9uKCk7XHJcbiAgICBpZiAodGhpcy5nZW9sb2NhdGlvbiQkKSB7XHJcbiAgICAgIHRoaXMuZ2VvbG9jYXRpb24kJC51bnN1YnNjcmliZSgpO1xyXG4gICAgICB0aGlzLmdlb2xvY2F0aW9uJCQgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXJ0R2VvbG9jYXRpb24oKSB7XHJcbiAgICBpZiAoIXRoaXMuZ2VvbG9jYXRpb24pIHtcclxuICAgICAgdGhpcy5nZW9sb2NhdGlvbiA9IG5ldyBvbEdlb2xvY2F0aW9uKHtcclxuICAgICAgICB0cmFja2luZ09wdGlvbnM6IHtcclxuICAgICAgICAgIGVuYWJsZUhpZ2hBY2N1cmFjeTogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJvamVjdGlvbjogdGhpcy5wcm9qZWN0aW9uLFxyXG4gICAgICAgIHRyYWNraW5nOiB0cnVlXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5nZW9sb2NhdGlvbi5vbignY2hhbmdlJywgZXZ0ID0+IHtcclxuICAgICAgICB0aGlzLmdlb2xvY2F0aW9uJC5uZXh0KHRoaXMuZ2VvbG9jYXRpb24pO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZ2VvbG9jYXRpb24uc2V0VHJhY2tpbmcodHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0b3BHZW9sb2NhdGlvbigpIHtcclxuICAgIGlmICh0aGlzLmdlb2xvY2F0aW9uKSB7XHJcbiAgICAgIHRoaXMuZ2VvbG9jYXRpb24uc2V0VHJhY2tpbmcoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25PZmZsaW5lVG9nZ2xlKG9mZmxpbmU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMub2ZmbGluZUJ1dHRvblRvZ2dsZSQubmV4dChvZmZsaW5lKTtcclxuICAgIHRoaXMub2ZmbGluZUJ1dHRvblN0YXRlID0gb2ZmbGluZTtcclxuICB9XHJcbn1cclxuIl19