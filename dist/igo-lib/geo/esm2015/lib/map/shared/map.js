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
    // TODO: Move to ViewController and update every place it's used
    /**
     * @param {?=} projection
     * @return {?}
     */
    getCenter(projection) {
        return this.viewController.getCenter();
    }
    // TODO: Move to ViewController and update every place it's used
    /**
     * @param {?=} projection
     * @return {?}
     */
    getExtent(projection) {
        return this.viewController.getExtent();
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
        const addedLayers = layers
            .map((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => this.doAddLayer(layer)))
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
     * @return {?} The layer added, if any
     */
    doAddLayer(layer) {
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
            layer.zIndex = this.layers.length + offset;
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
                this.geolocationFeature = new olFeature({ geometry });
                this.geolocationFeature.setId('geolocationFeature');
                this.overlay.addFeature(this.geolocationFeature);
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
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL21hcC9zaGFyZWQvbWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssTUFBTSxRQUFRLENBQUM7QUFDM0IsT0FBTyxNQUFNLE1BQU0sU0FBUyxDQUFDO0FBQzdCLE9BQU8sU0FBUyxNQUFNLFlBQVksQ0FBQztBQUNuQyxPQUFPLGFBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLG9CQUFvQixNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sa0JBQWtCLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxLQUFLLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFDbEMsT0FBTyxLQUFLLE9BQU8sTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxLQUFLLGFBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRCxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDMUIsT0FBTyxFQUFFLGVBQWUsRUFBeUIsTUFBTSxNQUFNLENBQUM7QUFLOUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRXZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQVF0RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7O0FBSXZELE1BQU0sT0FBTyxNQUFNOzs7O0lBMEJqQixZQUFZLE9BQW9CO1FBeEJ6QixZQUFPLEdBQUcsSUFBSSxlQUFlLENBQVUsRUFBRSxDQUFDLENBQUM7UUFFM0MsaUJBQVksR0FBRyxJQUFJLGVBQWUsQ0FBZ0IsU0FBUyxDQUFDLENBQUM7UUFVNUQsbUJBQWMsR0FBd0I7WUFDNUMsUUFBUSxFQUFFLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRTtTQUNqQyxDQUFDO1FBV0EsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJ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ekMsOEJBQW1DOzs7OztJQUNuQyw2QkFBbUM7Ozs7O0lBQ25DLCtCQUFvQzs7Ozs7SUFFcEMseUJBQTRCOzs7OztJQUM1QixnQ0FFRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvbE1hcCBmcm9tICdvbC9NYXAnO1xyXG5pbXBvcnQgb2xWaWV3IGZyb20gJ29sL1ZpZXcnO1xyXG5pbXBvcnQgb2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5pbXBvcnQgb2xHZW9sb2NhdGlvbiBmcm9tICdvbC9HZW9sb2NhdGlvbic7XHJcbmltcG9ydCBvbENvbnRyb2xBdHRyaWJ1dGlvbiBmcm9tICdvbC9jb250cm9sL0F0dHJpYnV0aW9uJztcclxuaW1wb3J0IG9sQ29udHJvbFNjYWxlTGluZSBmcm9tICdvbC9jb250cm9sL1NjYWxlTGluZSc7XHJcbmltcG9ydCAqIGFzIG9scHJvaiBmcm9tICdvbC9wcm9qJztcclxuaW1wb3J0ICogYXMgb2xwcm9qNCBmcm9tICdvbC9wcm9qL3Byb2o0JztcclxuaW1wb3J0IE9sUHJvamVjdGlvbiBmcm9tICdvbC9wcm9qL1Byb2plY3Rpb24nO1xyXG5pbXBvcnQgKiBhcyBvbGludGVyYWN0aW9uIGZyb20gJ29sL2ludGVyYWN0aW9uJztcclxuXHJcbmltcG9ydCBwcm9qNCBmcm9tICdwcm9qNCc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBTdWJqZWN0U3RhdHVzIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzJztcclxuaW1wb3J0IHsgT3ZlcmxheSB9IGZyb20gJy4uLy4uL292ZXJsYXkvc2hhcmVkL292ZXJsYXknO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXJXYXRjaGVyIH0gZnJvbSAnLi4vdXRpbHMvbGF5ZXItd2F0Y2hlcic7XHJcbmltcG9ydCB7XHJcbiAgTWFwVmlld09wdGlvbnMsXHJcbiAgTWFwT3B0aW9ucyxcclxuICBNYXBBdHRyaWJ1dGlvbk9wdGlvbnMsXHJcbiAgTWFwU2NhbGVMaW5lT3B0aW9ucyxcclxuICBNYXBFeHRlbnRcclxufSBmcm9tICcuL21hcC5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBNYXBWaWV3Q29udHJvbGxlciB9IGZyb20gJy4vY29udHJvbGxlcnMvdmlldyc7XHJcblxyXG4vLyBUT0RPOiBUaGlzIGNsYXNzIGlzIG1lc3N5LiBDbGVhcmx5IGRlZmluZSBpdCdzIHNjb3BlIGFuZCB0aGUgbWFwIGJyb3dzZXIncy5cclxuLy8gTW92ZSBzb21lIHN0dWZmIGludG8gY29udHJvbGxlcnMuXHJcbmV4cG9ydCBjbGFzcyBJZ29NYXAge1xyXG4gIHB1YmxpYyBvbDogb2xNYXA7XHJcbiAgcHVibGljIGxheWVycyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PExheWVyW10+KFtdKTtcclxuICBwdWJsaWMgc3RhdHVzJDogU3ViamVjdDxTdWJqZWN0U3RhdHVzPjtcclxuICBwdWJsaWMgZ2VvbG9jYXRpb24kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxvbEdlb2xvY2F0aW9uPih1bmRlZmluZWQpO1xyXG4gIHB1YmxpYyBnZW9sb2NhdGlvbkZlYXR1cmU6IG9sRmVhdHVyZTtcclxuICBwdWJsaWMgb3ZlcmxheTogT3ZlcmxheTtcclxuICBwdWJsaWMgdmlld0NvbnRyb2xsZXI6IE1hcFZpZXdDb250cm9sbGVyO1xyXG5cclxuICBwcml2YXRlIGxheWVyV2F0Y2hlcjogTGF5ZXJXYXRjaGVyO1xyXG4gIHByaXZhdGUgZ2VvbG9jYXRpb246IG9sR2VvbG9jYXRpb247XHJcbiAgcHJpdmF0ZSBnZW9sb2NhdGlvbiQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIHByaXZhdGUgb3B0aW9uczogTWFwT3B0aW9ucztcclxuICBwcml2YXRlIGRlZmF1bHRPcHRpb25zOiBQYXJ0aWFsPE1hcE9wdGlvbnM+ID0ge1xyXG4gICAgY29udHJvbHM6IHsgYXR0cmlidXRpb246IGZhbHNlIH1cclxuICB9O1xyXG5cclxuICBnZXQgbGF5ZXJzKCk6IExheWVyW10ge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJzJC52YWx1ZTtcclxuICB9XHJcblxyXG4gIGdldCBwcm9qZWN0aW9uKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy52aWV3Q29udHJvbGxlci5nZXRPbFByb2plY3Rpb24oKS5nZXRDb2RlKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zPzogTWFwT3B0aW9ucykge1xyXG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICB0aGlzLmxheWVyV2F0Y2hlciA9IG5ldyBMYXllcldhdGNoZXIoKTtcclxuICAgIHRoaXMuc3RhdHVzJCA9IHRoaXMubGF5ZXJXYXRjaGVyLnN0YXR1cyQ7XHJcbiAgICBvbHByb2o0LnJlZ2lzdGVyKHByb2o0KTtcclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgaW5pdCgpIHtcclxuICAgIGNvbnN0IGNvbnRyb2xzID0gW107XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRyb2xzKSB7XHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuY29udHJvbHMuYXR0cmlidXRpb24pIHtcclxuICAgICAgICBjb25zdCBhdHRyaWJ1dGlvbk9wdCA9ICh0aGlzLm9wdGlvbnMuY29udHJvbHMuYXR0cmlidXRpb24gPT09IHRydWVcclxuICAgICAgICAgID8ge31cclxuICAgICAgICAgIDogdGhpcy5vcHRpb25zLmNvbnRyb2xzLmF0dHJpYnV0aW9uKSBhcyBNYXBBdHRyaWJ1dGlvbk9wdGlvbnM7XHJcbiAgICAgICAgY29udHJvbHMucHVzaChuZXcgb2xDb250cm9sQXR0cmlidXRpb24oYXR0cmlidXRpb25PcHQpKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRyb2xzLnNjYWxlTGluZSkge1xyXG4gICAgICAgIGNvbnN0IHNjYWxlTGluZU9wdCA9ICh0aGlzLm9wdGlvbnMuY29udHJvbHMuc2NhbGVMaW5lID09PSB0cnVlXHJcbiAgICAgICAgICA/IHt9XHJcbiAgICAgICAgICA6IHRoaXMub3B0aW9ucy5jb250cm9scy5zY2FsZUxpbmUpIGFzIE1hcFNjYWxlTGluZU9wdGlvbnM7XHJcbiAgICAgICAgY29udHJvbHMucHVzaChuZXcgb2xDb250cm9sU2NhbGVMaW5lKHNjYWxlTGluZU9wdCkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgaW50ZXJhY3Rpb25zID0ge307XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmludGVyYWN0aW9ucyA9PT0gZmFsc2UpIHtcclxuICAgICAgaW50ZXJhY3Rpb25zID0ge1xyXG4gICAgICAgIGFsdFNoaWZ0RHJhZ1JvdGF0ZTogZmFsc2UsXHJcbiAgICAgICAgZG91YmxlQ2xpY2tab29tOiBmYWxzZSxcclxuICAgICAgICBrZXlib2FyZDogZmFsc2UsXHJcbiAgICAgICAgbW91c2VXaGVlbFpvb206IGZhbHNlLFxyXG4gICAgICAgIHNoaWZ0RHJhZ1pvb206IGZhbHNlLFxyXG4gICAgICAgIGRyYWdQYW46IGZhbHNlLFxyXG4gICAgICAgIHBpbmNoUm90YXRlOiBmYWxzZSxcclxuICAgICAgICBwaW5jaFpvb206IGZhbHNlXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vbCA9IG5ldyBvbE1hcCh7XHJcbiAgICAgIGludGVyYWN0aW9uczogb2xpbnRlcmFjdGlvbi5kZWZhdWx0cyhpbnRlcmFjdGlvbnMpLFxyXG4gICAgICBjb250cm9sc1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5zZXRWaWV3KHRoaXMub3B0aW9ucy52aWV3IHx8IHt9KTtcclxuICAgIHRoaXMudmlld0NvbnRyb2xsZXIgPSBuZXcgTWFwVmlld0NvbnRyb2xsZXIoe1xyXG4gICAgICBzdGF0ZUhpc3Rvcnk6IHRydWVcclxuICAgIH0pO1xyXG4gICAgdGhpcy52aWV3Q29udHJvbGxlci5zZXRPbE1hcCh0aGlzLm9sKTtcclxuICAgIHRoaXMub3ZlcmxheSA9IG5ldyBPdmVybGF5KHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgc2V0VGFyZ2V0KGlkOiBzdHJpbmcpIHtcclxuICAgIHRoaXMub2wuc2V0VGFyZ2V0KGlkKTtcclxuICAgIGlmIChpZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMubGF5ZXJXYXRjaGVyLnN1YnNjcmliZSgoKSA9PiB7fSwgbnVsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmxheWVyV2F0Y2hlci51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlVmlldyhvcHRpb25zOiBNYXBWaWV3T3B0aW9ucykge1xyXG4gICAgY29uc3QgY3VycmVudFZpZXcgPSB0aGlzLm9sLmdldFZpZXcoKTtcclxuICAgIGNvbnN0IHZpZXdPcHRpb25zID0gT2JqZWN0LmFzc2lnbihcclxuICAgICAge1xyXG4gICAgICAgIHpvb206IGN1cnJlbnRWaWV3LmdldFpvb20oKVxyXG4gICAgICB9LFxyXG4gICAgICBjdXJyZW50Vmlldy5nZXRQcm9wZXJ0aWVzKClcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5zZXRWaWV3KE9iamVjdC5hc3NpZ24odmlld09wdGlvbnMsIG9wdGlvbnMpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgbWFwIHZpZXdcclxuICAgKiBAcGFyYW0gb3B0aW9ucyBNYXAgdmlldyBvcHRpb25zXHJcbiAgICovXHJcbiAgc2V0VmlldyhvcHRpb25zOiBNYXBWaWV3T3B0aW9ucykge1xyXG4gICAgaWYgKHRoaXMudmlld0NvbnRyb2xsZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnZpZXdDb250cm9sbGVyLmNsZWFyU3RhdGVIaXN0b3J5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdmlldyA9IG5ldyBvbFZpZXcob3B0aW9ucyk7XHJcbiAgICB0aGlzLm9sLnNldFZpZXcodmlldyk7XHJcblxyXG4gICAgdGhpcy51bnN1YnNjcmliZUdlb2xvY2F0ZSgpO1xyXG4gICAgaWYgKG9wdGlvbnMpIHtcclxuICAgICAgaWYgKG9wdGlvbnMuY2VudGVyKSB7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdGlvbiA9IHZpZXcuZ2V0UHJvamVjdGlvbigpLmdldENvZGUoKTtcclxuICAgICAgICBjb25zdCBjZW50ZXIgPSBvbHByb2ouZnJvbUxvbkxhdChvcHRpb25zLmNlbnRlciwgcHJvamVjdGlvbik7XHJcbiAgICAgICAgdmlldy5zZXRDZW50ZXIoY2VudGVyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKG9wdGlvbnMuZ2VvbG9jYXRlKSB7XHJcbiAgICAgICAgdGhpcy5nZW9sb2NhdGUodHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIFRPRE86IE1vdmUgdG8gVmlld0NvbnRyb2xsZXIgYW5kIHVwZGF0ZSBldmVyeSBwbGFjZSBpdCdzIHVzZWRcclxuICBnZXRDZW50ZXIocHJvamVjdGlvbj86IHN0cmluZyB8IE9sUHJvamVjdGlvbik6IFtudW1iZXIsIG51bWJlcl0ge1xyXG4gICAgcmV0dXJuIHRoaXMudmlld0NvbnRyb2xsZXIuZ2V0Q2VudGVyKCk7XHJcbiAgfVxyXG5cclxuICAvLyBUT0RPOiBNb3ZlIHRvIFZpZXdDb250cm9sbGVyIGFuZCB1cGRhdGUgZXZlcnkgcGxhY2UgaXQncyB1c2VkXHJcbiAgZ2V0RXh0ZW50KHByb2plY3Rpb24/OiBzdHJpbmcgfCBPbFByb2plY3Rpb24pOiBNYXBFeHRlbnQge1xyXG4gICAgcmV0dXJuIHRoaXMudmlld0NvbnRyb2xsZXIuZ2V0RXh0ZW50KCk7XHJcbiAgfVxyXG5cclxuICAvLyBUT0RPOiBNb3ZlIHRvIFZpZXdDb250cm9sbGVyIGFuZCB1cGRhdGUgZXZlcnkgcGxhY2UgaXQncyB1c2VkXHJcbiAgZ2V0Wm9vbSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMudmlld0NvbnRyb2xsZXIuZ2V0Wm9vbSgpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlQmFzZUxheWVyKGJhc2VMYXllcjogTGF5ZXIpIHtcclxuICAgIGlmICghYmFzZUxheWVyKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGNvbnN0IGJsIG9mIHRoaXMuZ2V0QmFzZUxheWVycygpKSB7XHJcbiAgICAgIGJsLnZpc2libGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBiYXNlTGF5ZXIudmlzaWJsZSA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBnZXRCYXNlTGF5ZXJzKCk6IExheWVyW10ge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJzLmZpbHRlcigobGF5ZXI6IExheWVyKSA9PiBsYXllci5iYXNlTGF5ZXIgPT09IHRydWUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGF5ZXJCeUlkKGlkOiBzdHJpbmcpOiBMYXllciB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllcnMuZmluZCgobGF5ZXI6IExheWVyKSA9PiBsYXllci5pZCAmJiBsYXllci5pZCA9PT0gaWQpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGF5ZXJCeUFsaWFzKGFsaWFzOiBzdHJpbmcpOiBMYXllciB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllcnMuZmluZCgobGF5ZXI6IExheWVyKSA9PiBsYXllci5hbGlhcyAmJiBsYXllci5hbGlhcyA9PT0gYWxpYXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGEgc2luZ2xlIGxheWVyXHJcbiAgICogQHBhcmFtIGxheWVyIExheWVyIHRvIGFkZFxyXG4gICAqIEBwYXJhbSBwdXNoIERFUFJFQ0FURURcclxuICAgKi9cclxuICBhZGRMYXllcihsYXllcjogTGF5ZXIsIHB1c2ggPSB0cnVlKSB7XHJcbiAgICB0aGlzLmFkZExheWVycyhbbGF5ZXJdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBtYW55IGxheWVyc1xyXG4gICAqIEBwYXJhbSBsYXllcnMgTGF5ZXJzIHRvIGFkZFxyXG4gICAqIEBwYXJhbSBwdXNoIERFUFJFQ0FURURcclxuICAgKi9cclxuICBhZGRMYXllcnMobGF5ZXJzOiBMYXllcltdLCBwdXNoID0gdHJ1ZSkge1xyXG4gICAgY29uc3QgYWRkZWRMYXllcnMgPSBsYXllcnNcclxuICAgICAgLm1hcCgobGF5ZXI6IExheWVyKSA9PiB0aGlzLmRvQWRkTGF5ZXIobGF5ZXIpKVxyXG4gICAgICAuZmlsdGVyKChsYXllcjogTGF5ZXIgfCB1bmRlZmluZWQpID0+IGxheWVyICE9PSB1bmRlZmluZWQpO1xyXG4gICAgdGhpcy5zZXRMYXllcnMoW10uY29uY2F0KHRoaXMubGF5ZXJzLCBhZGRlZExheWVycykpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIGEgc2luZ2xlIGxheWVyXHJcbiAgICogQHBhcmFtIGxheWVyIExheWVyIHRvIHJlbW92ZVxyXG4gICAqL1xyXG4gIHJlbW92ZUxheWVyKGxheWVyOiBMYXllcikge1xyXG4gICAgdGhpcy5yZW1vdmVMYXllcnMoW2xheWVyXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgbWFueSBsYXllcnNcclxuICAgKiBAcGFyYW0gbGF5ZXJzIExheWVycyB0byByZW1vdmVcclxuICAgKi9cclxuICByZW1vdmVMYXllcnMobGF5ZXJzOiBMYXllcltdKSB7XHJcbiAgICBjb25zdCBuZXdMYXllcnMgPSB0aGlzLmxheWVycyQudmFsdWUuc2xpY2UoMCk7XHJcbiAgICBjb25zdCBsYXllcnNUb1JlbW92ZSA9IFtdO1xyXG4gICAgbGF5ZXJzLmZvckVhY2goKGxheWVyOiBMYXllcikgPT4ge1xyXG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0TGF5ZXJJbmRleChsYXllcik7XHJcbiAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgbGF5ZXJzVG9SZW1vdmUucHVzaChsYXllcik7XHJcbiAgICAgICAgbmV3TGF5ZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGxheWVyc1RvUmVtb3ZlLmZvckVhY2goKGxheWVyOiBMYXllcikgPT4gdGhpcy5kb1JlbW92ZUxheWVyKGxheWVyKSk7XHJcbiAgICB0aGlzLnNldExheWVycyhuZXdMYXllcnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIGFsbCBsYXllcnNcclxuICAgKi9cclxuICByZW1vdmVBbGxMYXllcnMoKSB7XHJcbiAgICB0aGlzLmxheWVycy5mb3JFYWNoKChsYXllcjogTGF5ZXIpID0+IHRoaXMuZG9SZW1vdmVMYXllcihsYXllcikpO1xyXG4gICAgdGhpcy5sYXllcnMkLm5leHQoW10pO1xyXG4gIH1cclxuXHJcbiAgcmFpc2VMYXllcihsYXllcjogTGF5ZXIpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRMYXllckluZGV4KGxheWVyKTtcclxuICAgIGlmIChpbmRleCA+IDApIHtcclxuICAgICAgdGhpcy5tb3ZlTGF5ZXIobGF5ZXIsIGluZGV4LCBpbmRleCAtIDEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbG93ZXJMYXllcihsYXllcjogTGF5ZXIpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRMYXllckluZGV4KGxheWVyKTtcclxuICAgIGlmIChpbmRleCA8IHRoaXMubGF5ZXJzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgdGhpcy5tb3ZlTGF5ZXIobGF5ZXIsIGluZGV4LCBpbmRleCArIDEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbW92ZUxheWVyKGxheWVyOiBMYXllciwgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBsYXllclRvID0gdGhpcy5sYXllcnNbdG9dO1xyXG4gICAgY29uc3QgekluZGV4VG8gPSBsYXllclRvLnpJbmRleDtcclxuICAgIGNvbnN0IHpJbmRleEZyb20gPSBsYXllci56SW5kZXg7XHJcblxyXG4gICAgbGF5ZXIuekluZGV4ID0gekluZGV4VG87XHJcbiAgICBsYXllclRvLnpJbmRleCA9IHpJbmRleEZyb207XHJcblxyXG4gICAgdGhpcy5sYXllcnNbdG9dID0gbGF5ZXI7XHJcbiAgICB0aGlzLmxheWVyc1tmcm9tXSA9IGxheWVyVG87XHJcbiAgICB0aGlzLmxheWVycyQubmV4dCh0aGlzLmxheWVycy5zbGljZSgwKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYSBsYXllciB0byB0aGUgT0wgbWFwIGFuZCBzdGFydCB3YXRjaGluZy4gSWYgdGhlIGxheWVyIGlzIGFscmVhZHlcclxuICAgKiBhZGRlZCB0byB0aGlzIG1hcCwgbWFrZSBpdCB2aXNpYmxlIGJ1dCBkb24ndCBhZGQgaXQgb25lIGFnYWluLlxyXG4gICAqIEBwYXJhbSBsYXllciBMYXllclxyXG4gICAqIEByZXR1cm5zIFRoZSBsYXllciBhZGRlZCwgaWYgYW55XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkb0FkZExheWVyKGxheWVyOiBMYXllcikge1xyXG4gICAgaWYgKGxheWVyLmJhc2VMYXllciAmJiBsYXllci52aXNpYmxlKSB7XHJcbiAgICAgIHRoaXMuY2hhbmdlQmFzZUxheWVyKGxheWVyKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBleGlzdGluZ0xheWVyID0gdGhpcy5nZXRMYXllckJ5SWQobGF5ZXIuaWQpO1xyXG4gICAgaWYgKGV4aXN0aW5nTGF5ZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBleGlzdGluZ0xheWVyLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxheWVyLnpJbmRleCA9PT0gdW5kZWZpbmVkIHx8IGxheWVyLnpJbmRleCA9PT0gMCkge1xyXG4gICAgICBjb25zdCBvZmZzZXQgPSBsYXllci5iYXNlTGF5ZXIgPyAxIDogMTA7XHJcbiAgICAgIGxheWVyLnpJbmRleCA9IHRoaXMubGF5ZXJzLmxlbmd0aCArIG9mZnNldDtcclxuICAgIH1cclxuXHJcbiAgICBsYXllci5zZXRNYXAodGhpcyk7XHJcbiAgICB0aGlzLmxheWVyV2F0Y2hlci53YXRjaExheWVyKGxheWVyKTtcclxuICAgIHRoaXMub2wuYWRkTGF5ZXIobGF5ZXIub2wpO1xyXG5cclxuICAgIHJldHVybiBsYXllcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBhIGxheWVyIGZyb20gdGhlIE9MIG1hcCBhbmQgc3RvcCB3YXRjaGluZ1xyXG4gICAqIEBwYXJhbSBsYXllciBMYXllclxyXG4gICAqL1xyXG4gIHByaXZhdGUgZG9SZW1vdmVMYXllcihsYXllcjogTGF5ZXIpIHtcclxuICAgIHRoaXMubGF5ZXJXYXRjaGVyLnVud2F0Y2hMYXllcihsYXllcik7XHJcbiAgICB0aGlzLm9sLnJlbW92ZUxheWVyKGxheWVyLm9sKTtcclxuICAgIGxheWVyLnNldE1hcCh1bmRlZmluZWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHRoZSBsYXllcnMgb2JzZXJ2YWJsZVxyXG4gICAqIEBwYXJhbSBsYXllcnMgTGF5ZXJzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZXRMYXllcnMobGF5ZXJzOiBMYXllcltdKSB7XHJcbiAgICB0aGlzLmxheWVycyQubmV4dCh0aGlzLnNvcnRMYXllcnNCeVpJbmRleChsYXllcnMpLnNsaWNlKDApKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNvcnQgbGF5ZXJzIGJ5IGRlc2NlbmRpbmcgekluZGV4XHJcbiAgICogQHBhcmFtIGxheWVycyBBcnJheSBvZiBsYXllcnNcclxuICAgKiBAcmV0dXJucyBUaGUgb3JpZ2luYWwgYXJyYXksIHNvcnRlZCBieSB6SW5kZXhcclxuICAgKi9cclxuICBwcml2YXRlIHNvcnRMYXllcnNCeVpJbmRleChsYXllcnM6IExheWVyW10pIHtcclxuICAgIC8vIFNvcnQgYnkgZGVzY2VuZGluZyB6SW5kZXhcclxuICAgIHJldHVybiBsYXllcnMuc29ydCgobGF5ZXIxOiBMYXllciwgbGF5ZXIyOiBMYXllcikgPT4gbGF5ZXIyLnpJbmRleCAtIGxheWVyMS56SW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGxheWVyIGluZGV4IGluIHRoZSBtYXAncyBpbmVuciBhcnJheSBvZiBsYXllcnNcclxuICAgKiBAcGFyYW0gbGF5ZXIgTGF5ZXJcclxuICAgKiBAcmV0dXJucyBUaGUgbGF5ZXIgaW5kZXhcclxuICAgKi9cclxuICBwcml2YXRlIGdldExheWVySW5kZXgobGF5ZXI6IExheWVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllcnMuZmluZEluZGV4KChfbGF5ZXI6IExheWVyKSA9PiBfbGF5ZXIgPT09IGxheWVyKTtcclxuICB9XHJcblxyXG4gIC8vIFRPRE86IENyZWF0ZSBhIEdlb2xvY2F0aW9uQ29udHJvbGxlciB3aXRoIGV2ZXJ5dGhpbmcgYmVsb3dcclxuICBnZW9sb2NhdGUodHJhY2sgPSBmYWxzZSkge1xyXG4gICAgbGV0IGZpcnN0ID0gdHJ1ZTtcclxuICAgIGlmICh0aGlzLmdlb2xvY2F0aW9uJCQpIHtcclxuICAgICAgdHJhY2sgPSB0aGlzLmdlb2xvY2F0aW9uLmdldFRyYWNraW5nKCk7XHJcbiAgICAgIHRoaXMudW5zdWJzY3JpYmVHZW9sb2NhdGUoKTtcclxuICAgIH1cclxuICAgIHRoaXMuc3RhcnRHZW9sb2NhdGlvbigpO1xyXG5cclxuICAgIHRoaXMuZ2VvbG9jYXRpb24kJCA9IHRoaXMuZ2VvbG9jYXRpb24kLnN1YnNjcmliZShnZW9sb2NhdGlvbiA9PiB7XHJcbiAgICAgIGlmICghZ2VvbG9jYXRpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgYWNjdXJhY3kgPSBnZW9sb2NhdGlvbi5nZXRBY2N1cmFjeSgpO1xyXG4gICAgICBpZiAoYWNjdXJhY3kgPCAxMDAwMCkge1xyXG4gICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gZ2VvbG9jYXRpb24uZ2V0QWNjdXJhY3lHZW9tZXRyeSgpO1xyXG4gICAgICAgIGNvbnN0IGV4dGVudCA9IGdlb21ldHJ5LmdldEV4dGVudCgpO1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHRoaXMuZ2VvbG9jYXRpb25GZWF0dXJlICYmXHJcbiAgICAgICAgICB0aGlzLm92ZXJsYXkuZGF0YVNvdXJjZS5vbC5nZXRGZWF0dXJlQnlJZChcclxuICAgICAgICAgICAgdGhpcy5nZW9sb2NhdGlvbkZlYXR1cmUuZ2V0SWQoKVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgdGhpcy5vdmVybGF5LmRhdGFTb3VyY2Uub2wucmVtb3ZlRmVhdHVyZSh0aGlzLmdlb2xvY2F0aW9uRmVhdHVyZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2VvbG9jYXRpb25GZWF0dXJlID0gbmV3IG9sRmVhdHVyZSh7IGdlb21ldHJ5IH0pO1xyXG4gICAgICAgIHRoaXMuZ2VvbG9jYXRpb25GZWF0dXJlLnNldElkKCdnZW9sb2NhdGlvbkZlYXR1cmUnKTtcclxuICAgICAgICB0aGlzLm92ZXJsYXkuYWRkRmVhdHVyZSh0aGlzLmdlb2xvY2F0aW9uRmVhdHVyZSk7XHJcbiAgICAgICAgaWYgKGZpcnN0KSB7XHJcbiAgICAgICAgICB0aGlzLnZpZXdDb250cm9sbGVyLnpvb21Ub0V4dGVudChleHRlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChmaXJzdCkge1xyXG4gICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLm9sLmdldFZpZXcoKTtcclxuICAgICAgICBjb25zdCBjb29yZGluYXRlcyA9IGdlb2xvY2F0aW9uLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgdmlldy5zZXRDZW50ZXIoY29vcmRpbmF0ZXMpO1xyXG4gICAgICAgIHZpZXcuc2V0Wm9vbSgxNCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRyYWNrKSB7XHJcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZUdlb2xvY2F0ZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIGZpcnN0ID0gZmFsc2U7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHVuc3Vic2NyaWJlR2VvbG9jYXRlKCkge1xyXG4gICAgdGhpcy5zdG9wR2VvbG9jYXRpb24oKTtcclxuICAgIGlmICh0aGlzLmdlb2xvY2F0aW9uJCQpIHtcclxuICAgICAgdGhpcy5nZW9sb2NhdGlvbiQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIHRoaXMuZ2VvbG9jYXRpb24kJCA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhcnRHZW9sb2NhdGlvbigpIHtcclxuICAgIGlmICghdGhpcy5nZW9sb2NhdGlvbikge1xyXG4gICAgICB0aGlzLmdlb2xvY2F0aW9uID0gbmV3IG9sR2VvbG9jYXRpb24oe1xyXG4gICAgICAgIHByb2plY3Rpb246IHRoaXMucHJvamVjdGlvbixcclxuICAgICAgICB0cmFja2luZzogdHJ1ZVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMuZ2VvbG9jYXRpb24ub24oJ2NoYW5nZScsIGV2dCA9PiB7XHJcbiAgICAgICAgdGhpcy5nZW9sb2NhdGlvbiQubmV4dCh0aGlzLmdlb2xvY2F0aW9uKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmdlb2xvY2F0aW9uLnNldFRyYWNraW5nKHRydWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdG9wR2VvbG9jYXRpb24oKSB7XHJcbiAgICBpZiAodGhpcy5nZW9sb2NhdGlvbikge1xyXG4gICAgICB0aGlzLmdlb2xvY2F0aW9uLnNldFRyYWNraW5nKGZhbHNlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19