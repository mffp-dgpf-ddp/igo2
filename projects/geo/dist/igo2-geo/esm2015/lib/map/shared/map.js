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
import { FeatureMotion } from '../../feature/shared/feature.enums';
// TODO: This class is messy. Clearly define it's scope and the map browser's.
// Move some stuff into controllers.
export class IgoMap {
    /**
     * @param {?=} options
     */
    constructor(options) {
        this.offlineButtonToggle$ = new BehaviorSubject(false);
        this.layers$ = new BehaviorSubject([]);
        this.positionFollower = true;
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
            if (options.alwaysTracking) {
                this.alwaysTracking = true;
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
        let offsetZIndex = 0;
        /** @type {?} */
        let offsetBaseLayerZIndex = 0;
        /** @type {?} */
        const addedLayers = layers
            .map((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => {
            /** @type {?} */
            const offset = layer.zIndex
                ? 0
                : layer.baseLayer
                    ? offsetBaseLayerZIndex++
                    : offsetZIndex++;
            return this.doAddLayer(layer, offset);
        }))
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
        if (index > 1) {
            this.moveLayer(layer, index, index - 1);
        }
    }
    /**
     * @param {?} layers
     * @return {?}
     */
    raiseLayers(layers) {
        for (const layer of layers) {
            this.raiseLayer(layer);
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
     * @param {?} layers
     * @return {?}
     */
    lowerLayers(layers) {
        /** @type {?} */
        const reverseLayers = layers.reverse();
        for (const layer of reverseLayers) {
            this.lowerLayer(layer);
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
        if (layerTo.baseLayer || layer.baseLayer) {
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
     * @param {?} offsetZIndex
     * @return {?} The layer added, if any
     */
    doAddLayer(layer, offsetZIndex) {
        if (layer.baseLayer && layer.visible) {
            this.changeBaseLayer(layer);
        }
        /** @type {?} */
        const existingLayer = this.getLayerById(layer.id);
        if (existingLayer !== undefined) {
            existingLayer.visible = true;
            return;
        }
        if (!layer.baseLayer && layer.zIndex) {
            layer.zIndex += 10;
        }
        if (layer.zIndex === undefined || layer.zIndex === 0) {
            /** @type {?} */
            const maxZIndex = Math.max(layer.baseLayer ? 0 : 10, ...this.layers
                .filter((/**
             * @param {?} l
             * @return {?}
             */
            l => l.baseLayer === layer.baseLayer && l.zIndex < 200 // zIndex > 200 = system layer
            ))
                .map((/**
             * @param {?} l
             * @return {?}
             */
            l => l.zIndex)));
            layer.zIndex = maxZIndex + 1 + offsetZIndex;
        }
        if (layer.baseLayer && layer.zIndex > 9) {
            layer.zIndex = 10; // baselayer must have zIndex < 10
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
                if (!this.positionFollower && this.alwaysTracking) {
                    this.overlay.addOlFeature(this.geolocationFeature, FeatureMotion.None);
                }
                else if (this.positionFollower && this.alwaysTracking) {
                    this.overlay.addOlFeature(this.geolocationFeature, FeatureMotion.Move);
                }
                else {
                    this.overlay.addOlFeature(this.geolocationFeature);
                }
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
                    this.buffer.addOlFeature(this.bufferFeature, FeatureMotion.None);
                }
                if (first) {
                    this.viewController.zoomToExtent(extent);
                    this.positionFollower = !this.positionFollower;
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
            if (track && !this.alwaysTracking) {
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
    }
}
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
    IgoMap.prototype.alwaysTracking;
    /** @type {?} */
    IgoMap.prototype.positionFollower;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL21hcC9zaGFyZWQvbWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssTUFBTSxRQUFRLENBQUM7QUFDM0IsT0FBTyxNQUFNLE1BQU0sU0FBUyxDQUFDO0FBQzdCLE9BQU8sU0FBUyxNQUFNLFlBQVksQ0FBQztBQUNuQyxPQUFPLGFBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLG9CQUFvQixNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sa0JBQWtCLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxLQUFLLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFDbEMsT0FBTyxLQUFLLE9BQU8sTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxLQUFLLGFBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRCxPQUFPLFFBQVEsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0QyxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDMUIsT0FBTyxFQUFFLGVBQWUsRUFBeUIsTUFBTSxNQUFNLENBQUM7QUFLOUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRXZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQVF0RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUV2RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7OztBQUluRSxNQUFNLE9BQU8sTUFBTTs7OztJQWtDakIsWUFBWSxPQUFvQjtRQWhDekIseUJBQW9CLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7UUFDM0QsWUFBTyxHQUFHLElBQUksZUFBZSxDQUFVLEVBQUUsQ0FBQyxDQUFDO1FBRzNDLHFCQUFnQixHQUFZLElBQUksQ0FBQztRQUNqQyxpQkFBWSxHQUFHLElBQUksZUFBZSxDQUFnQixTQUFTLENBQUMsQ0FBQztRQWU1RCxtQkFBYyxHQUF3QjtZQUM1QyxRQUFRLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO1NBQ2pDLENBQUM7UUFXQSxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUM7UUFDekMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDOzs7O0lBZEQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztJQUM1QixDQUFDOzs7O0lBRUQsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3pELENBQUM7Ozs7SUFVRCxJQUFJOztjQUNJLFFBQVEsR0FBRyxFQUFFO1FBQ25CLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDekIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7O3NCQUMvQixjQUFjLEdBQUcsbUJBQUEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEtBQUssSUFBSTtvQkFDaEUsQ0FBQyxDQUFDLEVBQUU7b0JBQ0osQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUF5QjtnQkFDL0QsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7YUFDekQ7WUFDRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRTs7c0JBQzdCLFlBQVksR0FBRyxtQkFBQSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsS0FBSyxJQUFJO29CQUM1RCxDQUFDLENBQUMsRUFBRTtvQkFDSixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQXVCO2dCQUMzRCxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzthQUNyRDtTQUNGOztZQUNHLFlBQVksR0FBRyxFQUFFO1FBQ3JCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEtBQUssS0FBSyxFQUFFO1lBQ3ZDLFlBQVksR0FBRztnQkFDYixrQkFBa0IsRUFBRSxLQUFLO2dCQUN6QixlQUFlLEVBQUUsS0FBSztnQkFDdEIsUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsY0FBYyxFQUFFLEtBQUs7Z0JBQ3JCLGFBQWEsRUFBRSxLQUFLO2dCQUNwQixPQUFPLEVBQUUsS0FBSztnQkFDZCxXQUFXLEVBQUUsS0FBSztnQkFDbEIsU0FBUyxFQUFFLEtBQUs7YUFDakIsQ0FBQztTQUNIO1FBRUQsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLEtBQUssQ0FBQztZQUNsQixZQUFZLEVBQUUsYUFBYSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUM7WUFDbEQsUUFBUTtTQUNULENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGlCQUFpQixDQUFDO1lBQzFDLFlBQVksRUFBRSxJQUFJO1NBQ25CLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7Ozs7SUFFRCxTQUFTLENBQUMsRUFBVTtRQUNsQixJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0QixJQUFJLEVBQUUsS0FBSyxTQUFTLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTOzs7WUFBQyxHQUFHLEVBQUUsR0FBRSxDQUFDLEdBQUUsSUFBSSxDQUFDLENBQUM7U0FDN0M7YUFBTTtZQUNMLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDakM7SUFDSCxDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxPQUF1Qjs7Y0FDMUIsV0FBVyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFOztjQUMvQixXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FDL0I7WUFDRSxJQUFJLEVBQUUsV0FBVyxDQUFDLE9BQU8sRUFBRTtTQUM1QixFQUNELFdBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FDNUI7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDbEQsSUFBSSxPQUFPLENBQUMsZUFBZSxFQUFFO1lBQzNCLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUM7U0FDL0Q7SUFDSCxDQUFDOzs7Ozs7SUFNRCxPQUFPLENBQUMsT0FBdUI7UUFDN0IsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLFNBQVMsRUFBRTtZQUNyQyxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDekM7O2NBRUssSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNoQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV0QixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM1QixJQUFJLE9BQU8sRUFBRTtZQUNYLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTs7c0JBQ1osVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxPQUFPLEVBQUU7O3NCQUMzQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQztnQkFDNUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN4QjtZQUVELElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtnQkFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN0QjtZQUVELElBQUksT0FBTyxDQUFDLGNBQWMsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7YUFDNUI7U0FDRjtJQUNILENBQUM7Ozs7Ozs7SUFNRCxTQUFTLENBQUMsVUFBa0M7UUFDMUMsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNuRCxDQUFDOzs7Ozs7O0lBTUQsU0FBUyxDQUFDLFVBQWtDO1FBQzFDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbkQsQ0FBQzs7Ozs7SUFHRCxPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3ZDLENBQUM7Ozs7O0lBRUQsZUFBZSxDQUFDLFNBQWdCO1FBQzlCLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDZCxPQUFPO1NBQ1I7UUFFRCxLQUFLLE1BQU0sRUFBRSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUNyQyxFQUFFLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUNwQjtRQUVELFNBQVMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBRXpCLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FDbkMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUMxRSxDQUFDO1FBQ0YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUNuQyxTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQzFFLENBQUM7SUFDSixDQUFDOzs7O0lBRUQsYUFBYTtRQUNYLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNOzs7O1FBQUMsQ0FBQyxLQUFZLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssSUFBSSxFQUFDLENBQUM7SUFDeEUsQ0FBQzs7Ozs7SUFFRCxZQUFZLENBQUMsRUFBVTtRQUNyQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSTs7OztRQUFDLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFDLENBQUM7SUFDekUsQ0FBQzs7Ozs7OztJQU9ELFFBQVEsQ0FBQyxLQUFZLEVBQUUsSUFBSSxHQUFHLElBQUk7UUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDMUIsQ0FBQzs7Ozs7OztJQU9ELFNBQVMsQ0FBQyxNQUFlLEVBQUUsSUFBSSxHQUFHLElBQUk7O1lBQ2hDLFlBQVksR0FBRyxDQUFDOztZQUNoQixxQkFBcUIsR0FBRyxDQUFDOztjQUN2QixXQUFXLEdBQUcsTUFBTTthQUN2QixHQUFHOzs7O1FBQUMsQ0FBQyxLQUFZLEVBQUUsRUFBRTs7a0JBQ2QsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNO2dCQUN6QixDQUFDLENBQUMsQ0FBQztnQkFDSCxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVM7b0JBQ2pCLENBQUMsQ0FBQyxxQkFBcUIsRUFBRTtvQkFDekIsQ0FBQyxDQUFDLFlBQVksRUFBRTtZQUNsQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLENBQUMsRUFBQzthQUNELE1BQU07Ozs7UUFBQyxDQUFDLEtBQXdCLEVBQUUsRUFBRSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUM7UUFDNUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUN0RCxDQUFDOzs7Ozs7SUFNRCxXQUFXLENBQUMsS0FBWTtRQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM3QixDQUFDOzs7Ozs7SUFNRCxZQUFZLENBQUMsTUFBZTs7Y0FDcEIsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7O2NBQ3ZDLGNBQWMsR0FBRyxFQUFFO1FBQ3pCLE1BQU0sQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxLQUFZLEVBQUUsRUFBRTs7a0JBQ3hCLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztZQUN2QyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUU7Z0JBQ2QsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDM0IsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDNUI7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUVILGNBQWMsQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxLQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzVCLENBQUM7Ozs7O0lBS0QsZUFBZTtRQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTzs7OztRQUFDLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsS0FBWTs7Y0FDZixLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDdkMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztTQUN6QztJQUNILENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLE1BQWU7UUFDekIsS0FBSyxNQUFNLEtBQUssSUFBSSxNQUFNLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN4QjtJQUNILENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLEtBQVk7O2NBQ2YsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO1FBQ3ZDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3pDO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsTUFBZTs7Y0FDbkIsYUFBYSxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUU7UUFDdEMsS0FBSyxNQUFNLEtBQUssSUFBSSxhQUFhLEVBQUU7WUFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN4QjtJQUNILENBQUM7Ozs7Ozs7SUFFRCxTQUFTLENBQUMsS0FBWSxFQUFFLElBQVksRUFBRSxFQUFVOztjQUN4QyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7O2NBQ3pCLFFBQVEsR0FBRyxPQUFPLENBQUMsTUFBTTs7Y0FDekIsVUFBVSxHQUFHLEtBQUssQ0FBQyxNQUFNO1FBRS9CLElBQUksT0FBTyxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUMsU0FBUyxFQUFFO1lBQ3hDLE9BQU87U0FDUjtRQUVELEtBQUssQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO1FBQ3hCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO1FBRTVCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7Ozs7Ozs7O0lBUU8sVUFBVSxDQUFDLEtBQVksRUFBRSxZQUFvQjtRQUNuRCxJQUFJLEtBQUssQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUNwQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdCOztjQUVLLGFBQWEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDakQsSUFBSSxhQUFhLEtBQUssU0FBUyxFQUFFO1lBQy9CLGFBQWEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQzdCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDcEMsS0FBSyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7U0FDcEI7UUFFRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssU0FBUyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFOztrQkFDOUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQ3hCLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUN4QixHQUFHLElBQUksQ0FBQyxNQUFNO2lCQUNYLE1BQU07Ozs7WUFDTCxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLEtBQUssS0FBSyxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyw4QkFBOEI7Y0FDdEY7aUJBQ0EsR0FBRzs7OztZQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBQyxDQUN0QjtZQUNELEtBQUssQ0FBQyxNQUFNLEdBQUcsU0FBUyxHQUFHLENBQUMsR0FBRyxZQUFZLENBQUM7U0FDN0M7UUFFRCxJQUFJLEtBQUssQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdkMsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxrQ0FBa0M7U0FDdEQ7UUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUUzQixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Ozs7Ozs7SUFNTyxhQUFhLENBQUMsS0FBWTtRQUNoQyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMxQixDQUFDOzs7Ozs7O0lBTU8sU0FBUyxDQUFDLE1BQWU7UUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7Ozs7Ozs7SUFPTyxrQkFBa0IsQ0FBQyxNQUFlO1FBQ3hDLDRCQUE0QjtRQUM1QixPQUFPLE1BQU0sQ0FBQyxJQUFJOzs7OztRQUNoQixDQUFDLE1BQWEsRUFBRSxNQUFhLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFDaEUsQ0FBQztJQUNKLENBQUM7Ozs7Ozs7SUFPTyxhQUFhLENBQUMsS0FBWTtRQUNoQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUzs7OztRQUFDLENBQUMsTUFBYSxFQUFFLEVBQUUsQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUFDLENBQUM7SUFDcEUsQ0FBQzs7Ozs7O0lBR0QsU0FBUyxDQUFDLEtBQUssR0FBRyxLQUFLOztZQUNqQixLQUFLLEdBQUcsSUFBSTtRQUNoQixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdkMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7U0FDN0I7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUV4QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUzs7OztRQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQzdELElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ2hCLE9BQU87YUFDUjs7a0JBQ0ssUUFBUSxHQUFHLFdBQVcsQ0FBQyxXQUFXLEVBQUU7WUFDMUMsSUFBSSxRQUFRLEdBQUcsS0FBSyxFQUFFOztzQkFDZCxRQUFRLEdBQUcsV0FBVyxDQUFDLG1CQUFtQixFQUFFOztzQkFDNUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxTQUFTLEVBQUU7Z0JBQ25DLElBQ0UsSUFBSSxDQUFDLGtCQUFrQjtvQkFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FDdkMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxDQUNoQyxFQUNEO29CQUNBLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7aUJBQ25FO2dCQUVELElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtvQkFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7aUJBQzdEO2dCQUVELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ3RELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztnQkFDcEQsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO29CQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUN4RTtxQkFBTSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO29CQUN2RCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUN4RTtxQkFBTTtvQkFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztpQkFDcEQ7Z0JBRUQsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7OzBCQUMvQixZQUFZLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFlBQVk7OzBCQUM3RCxXQUFXLEdBQUcsV0FBVyxDQUFDLFdBQVcsRUFBRTtvQkFDN0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLENBQUM7OzBCQUNwRCxZQUFZLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFlBQVk7OzBCQUM3RCxVQUFVLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQVU7O3dCQUUzRCxVQUFVO29CQUNkLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFO3dCQUN0RCxVQUFVLEdBQUcsWUFBWSxDQUFDLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQztxQkFDNUM7eUJBQU07d0JBQ0wsVUFBVSxHQUFHLEVBQUUsQ0FBQztxQkFDakI7b0JBRUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3BELElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO29CQUMxQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsWUFBWSxDQUFDLENBQUM7b0JBQ3JELElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztvQkFDakQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO29CQUNqRCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDbEU7Z0JBQ0QsSUFBSSxLQUFLLEVBQUU7b0JBQ1QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztpQkFDaEQ7YUFDRjtpQkFBTSxJQUFJLEtBQUssRUFBRTs7c0JBQ1YsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFOztzQkFDeEIsV0FBVyxHQUFHLFdBQVcsQ0FBQyxXQUFXLEVBQUU7Z0JBQzdDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDbEI7WUFDRCxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2FBQzdCO1lBQ0QsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNoQixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCxvQkFBb0I7UUFDbEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQzs7Ozs7SUFFTyxnQkFBZ0I7UUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLGFBQWEsQ0FBQztnQkFDbkMsZUFBZSxFQUFFO29CQUNmLGtCQUFrQixFQUFFLElBQUk7aUJBQ3pCO2dCQUNELFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtnQkFDM0IsUUFBUSxFQUFFLElBQUk7YUFDZixDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxRQUFROzs7O1lBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMzQyxDQUFDLEVBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwQztJQUNILENBQUM7Ozs7O0lBRU8sZUFBZTtRQUNyQixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDckM7SUFDSCxDQUFDOzs7OztJQUVELGVBQWUsQ0FBQyxPQUFnQjtRQUM5QixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLENBQUM7Q0FDRjs7O0lBNWVDLG9CQUFpQjs7SUFDakIsc0NBQWtFOztJQUNsRSx5QkFBa0Q7O0lBQ2xELHlCQUF1Qzs7SUFDdkMsZ0NBQStCOztJQUMvQixrQ0FBd0M7O0lBQ3hDLDhCQUFvRTs7SUFDcEUsb0NBQXFDOztJQUNyQyw0QkFBNEI7O0lBQzVCLCtCQUFnQzs7SUFDaEMsd0JBQXVCOztJQUN2Qix5QkFBd0I7O0lBQ3hCLGdDQUF5Qzs7SUFFekMsa0NBQTJDOzs7OztJQUUzQyw4QkFBbUM7Ozs7O0lBQ25DLDZCQUFtQzs7Ozs7SUFDbkMsK0JBQW9DOzs7OztJQUVwQyx5QkFBNEI7Ozs7O0lBQzVCLGdDQUVFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9sTWFwIGZyb20gJ29sL01hcCc7XHJcbmltcG9ydCBvbFZpZXcgZnJvbSAnb2wvVmlldyc7XHJcbmltcG9ydCBvbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCBvbEdlb2xvY2F0aW9uIGZyb20gJ29sL0dlb2xvY2F0aW9uJztcclxuaW1wb3J0IG9sQ29udHJvbEF0dHJpYnV0aW9uIGZyb20gJ29sL2NvbnRyb2wvQXR0cmlidXRpb24nO1xyXG5pbXBvcnQgb2xDb250cm9sU2NhbGVMaW5lIGZyb20gJ29sL2NvbnRyb2wvU2NhbGVMaW5lJztcclxuaW1wb3J0ICogYXMgb2xwcm9qIGZyb20gJ29sL3Byb2onO1xyXG5pbXBvcnQgKiBhcyBvbHByb2o0IGZyb20gJ29sL3Byb2ovcHJvajQnO1xyXG5pbXBvcnQgT2xQcm9qZWN0aW9uIGZyb20gJ29sL3Byb2ovUHJvamVjdGlvbic7XHJcbmltcG9ydCAqIGFzIG9saW50ZXJhY3Rpb24gZnJvbSAnb2wvaW50ZXJhY3Rpb24nO1xyXG5pbXBvcnQgb2xDaXJjbGUgZnJvbSAnb2wvZ2VvbS9DaXJjbGUnO1xyXG5cclxuaW1wb3J0IHByb2o0IGZyb20gJ3Byb2o0JztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IFN1YmplY3RTdGF0dXMgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMnO1xyXG5pbXBvcnQgeyBPdmVybGF5IH0gZnJvbSAnLi4vLi4vb3ZlcmxheS9zaGFyZWQvb3ZlcmxheSc7XHJcblxyXG5pbXBvcnQgeyBMYXllcldhdGNoZXIgfSBmcm9tICcuLi91dGlscy9sYXllci13YXRjaGVyJztcclxuaW1wb3J0IHtcclxuICBNYXBWaWV3T3B0aW9ucyxcclxuICBNYXBPcHRpb25zLFxyXG4gIE1hcEF0dHJpYnV0aW9uT3B0aW9ucyxcclxuICBNYXBTY2FsZUxpbmVPcHRpb25zLFxyXG4gIE1hcEV4dGVudFxyXG59IGZyb20gJy4vbWFwLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IE1hcFZpZXdDb250cm9sbGVyIH0gZnJvbSAnLi9jb250cm9sbGVycy92aWV3JztcclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9mZWF0dXJlLWRhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBGZWF0dXJlTW90aW9uIH0gZnJvbSAnLi4vLi4vZmVhdHVyZS9zaGFyZWQvZmVhdHVyZS5lbnVtcyc7XHJcblxyXG4vLyBUT0RPOiBUaGlzIGNsYXNzIGlzIG1lc3N5LiBDbGVhcmx5IGRlZmluZSBpdCdzIHNjb3BlIGFuZCB0aGUgbWFwIGJyb3dzZXIncy5cclxuLy8gTW92ZSBzb21lIHN0dWZmIGludG8gY29udHJvbGxlcnMuXHJcbmV4cG9ydCBjbGFzcyBJZ29NYXAge1xyXG4gIHB1YmxpYyBvbDogb2xNYXA7XHJcbiAgcHVibGljIG9mZmxpbmVCdXR0b25Ub2dnbGUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XHJcbiAgcHVibGljIGxheWVycyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PExheWVyW10+KFtdKTtcclxuICBwdWJsaWMgc3RhdHVzJDogU3ViamVjdDxTdWJqZWN0U3RhdHVzPjtcclxuICBwdWJsaWMgYWx3YXlzVHJhY2tpbmc6IGJvb2xlYW47XHJcbiAgcHVibGljIHBvc2l0aW9uRm9sbG93ZXI6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIHB1YmxpYyBnZW9sb2NhdGlvbiQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG9sR2VvbG9jYXRpb24+KHVuZGVmaW5lZCk7XHJcbiAgcHVibGljIGdlb2xvY2F0aW9uRmVhdHVyZTogb2xGZWF0dXJlO1xyXG4gIHB1YmxpYyBidWZmZXJHZW9tOiBvbENpcmNsZTtcclxuICBwdWJsaWMgYnVmZmVyRmVhdHVyZTogb2xGZWF0dXJlO1xyXG4gIHB1YmxpYyBidWZmZXI6IE92ZXJsYXk7XHJcbiAgcHVibGljIG92ZXJsYXk6IE92ZXJsYXk7XHJcbiAgcHVibGljIHZpZXdDb250cm9sbGVyOiBNYXBWaWV3Q29udHJvbGxlcjtcclxuXHJcbiAgcHVibGljIGJ1ZmZlckRhdGFTb3VyY2U6IEZlYXR1cmVEYXRhU291cmNlO1xyXG5cclxuICBwcml2YXRlIGxheWVyV2F0Y2hlcjogTGF5ZXJXYXRjaGVyO1xyXG4gIHByaXZhdGUgZ2VvbG9jYXRpb246IG9sR2VvbG9jYXRpb247XHJcbiAgcHJpdmF0ZSBnZW9sb2NhdGlvbiQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIHByaXZhdGUgb3B0aW9uczogTWFwT3B0aW9ucztcclxuICBwcml2YXRlIGRlZmF1bHRPcHRpb25zOiBQYXJ0aWFsPE1hcE9wdGlvbnM+ID0ge1xyXG4gICAgY29udHJvbHM6IHsgYXR0cmlidXRpb246IGZhbHNlIH1cclxuICB9O1xyXG5cclxuICBnZXQgbGF5ZXJzKCk6IExheWVyW10ge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJzJC52YWx1ZTtcclxuICB9XHJcblxyXG4gIGdldCBwcm9qZWN0aW9uKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy52aWV3Q29udHJvbGxlci5nZXRPbFByb2plY3Rpb24oKS5nZXRDb2RlKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zPzogTWFwT3B0aW9ucykge1xyXG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICB0aGlzLmxheWVyV2F0Y2hlciA9IG5ldyBMYXllcldhdGNoZXIoKTtcclxuICAgIHRoaXMuc3RhdHVzJCA9IHRoaXMubGF5ZXJXYXRjaGVyLnN0YXR1cyQ7XHJcbiAgICBvbHByb2o0LnJlZ2lzdGVyKHByb2o0KTtcclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgaW5pdCgpIHtcclxuICAgIGNvbnN0IGNvbnRyb2xzID0gW107XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRyb2xzKSB7XHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuY29udHJvbHMuYXR0cmlidXRpb24pIHtcclxuICAgICAgICBjb25zdCBhdHRyaWJ1dGlvbk9wdCA9ICh0aGlzLm9wdGlvbnMuY29udHJvbHMuYXR0cmlidXRpb24gPT09IHRydWVcclxuICAgICAgICAgID8ge31cclxuICAgICAgICAgIDogdGhpcy5vcHRpb25zLmNvbnRyb2xzLmF0dHJpYnV0aW9uKSBhcyBNYXBBdHRyaWJ1dGlvbk9wdGlvbnM7XHJcbiAgICAgICAgY29udHJvbHMucHVzaChuZXcgb2xDb250cm9sQXR0cmlidXRpb24oYXR0cmlidXRpb25PcHQpKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRyb2xzLnNjYWxlTGluZSkge1xyXG4gICAgICAgIGNvbnN0IHNjYWxlTGluZU9wdCA9ICh0aGlzLm9wdGlvbnMuY29udHJvbHMuc2NhbGVMaW5lID09PSB0cnVlXHJcbiAgICAgICAgICA/IHt9XHJcbiAgICAgICAgICA6IHRoaXMub3B0aW9ucy5jb250cm9scy5zY2FsZUxpbmUpIGFzIE1hcFNjYWxlTGluZU9wdGlvbnM7XHJcbiAgICAgICAgY29udHJvbHMucHVzaChuZXcgb2xDb250cm9sU2NhbGVMaW5lKHNjYWxlTGluZU9wdCkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgaW50ZXJhY3Rpb25zID0ge307XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmludGVyYWN0aW9ucyA9PT0gZmFsc2UpIHtcclxuICAgICAgaW50ZXJhY3Rpb25zID0ge1xyXG4gICAgICAgIGFsdFNoaWZ0RHJhZ1JvdGF0ZTogZmFsc2UsXHJcbiAgICAgICAgZG91YmxlQ2xpY2tab29tOiBmYWxzZSxcclxuICAgICAgICBrZXlib2FyZDogZmFsc2UsXHJcbiAgICAgICAgbW91c2VXaGVlbFpvb206IGZhbHNlLFxyXG4gICAgICAgIHNoaWZ0RHJhZ1pvb206IGZhbHNlLFxyXG4gICAgICAgIGRyYWdQYW46IGZhbHNlLFxyXG4gICAgICAgIHBpbmNoUm90YXRlOiBmYWxzZSxcclxuICAgICAgICBwaW5jaFpvb206IGZhbHNlXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vbCA9IG5ldyBvbE1hcCh7XHJcbiAgICAgIGludGVyYWN0aW9uczogb2xpbnRlcmFjdGlvbi5kZWZhdWx0cyhpbnRlcmFjdGlvbnMpLFxyXG4gICAgICBjb250cm9sc1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5zZXRWaWV3KHRoaXMub3B0aW9ucy52aWV3IHx8IHt9KTtcclxuICAgIHRoaXMudmlld0NvbnRyb2xsZXIgPSBuZXcgTWFwVmlld0NvbnRyb2xsZXIoe1xyXG4gICAgICBzdGF0ZUhpc3Rvcnk6IHRydWVcclxuICAgIH0pO1xyXG4gICAgdGhpcy52aWV3Q29udHJvbGxlci5zZXRPbE1hcCh0aGlzLm9sKTtcclxuICAgIHRoaXMub3ZlcmxheSA9IG5ldyBPdmVybGF5KHRoaXMpO1xyXG4gICAgdGhpcy5idWZmZXIgPSBuZXcgT3ZlcmxheSh0aGlzKTtcclxuICB9XHJcblxyXG4gIHNldFRhcmdldChpZDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLm9sLnNldFRhcmdldChpZCk7XHJcbiAgICBpZiAoaWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmxheWVyV2F0Y2hlci5zdWJzY3JpYmUoKCkgPT4ge30sIG51bGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5sYXllcldhdGNoZXIudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZVZpZXcob3B0aW9uczogTWFwVmlld09wdGlvbnMpIHtcclxuICAgIGNvbnN0IGN1cnJlbnRWaWV3ID0gdGhpcy5vbC5nZXRWaWV3KCk7XHJcbiAgICBjb25zdCB2aWV3T3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgIHtcclxuICAgICAgICB6b29tOiBjdXJyZW50Vmlldy5nZXRab29tKClcclxuICAgICAgfSxcclxuICAgICAgY3VycmVudFZpZXcuZ2V0UHJvcGVydGllcygpXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuc2V0VmlldyhPYmplY3QuYXNzaWduKHZpZXdPcHRpb25zLCBvcHRpb25zKSk7XHJcbiAgICBpZiAob3B0aW9ucy5tYXhab29tT25FeHRlbnQpIHtcclxuICAgICAgdGhpcy52aWV3Q29udHJvbGxlci5tYXhab29tT25FeHRlbnQgPSBvcHRpb25zLm1heFpvb21PbkV4dGVudDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgbWFwIHZpZXdcclxuICAgKiBAcGFyYW0gb3B0aW9ucyBNYXAgdmlldyBvcHRpb25zXHJcbiAgICovXHJcbiAgc2V0VmlldyhvcHRpb25zOiBNYXBWaWV3T3B0aW9ucykge1xyXG4gICAgaWYgKHRoaXMudmlld0NvbnRyb2xsZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnZpZXdDb250cm9sbGVyLmNsZWFyU3RhdGVIaXN0b3J5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdmlldyA9IG5ldyBvbFZpZXcob3B0aW9ucyk7XHJcbiAgICB0aGlzLm9sLnNldFZpZXcodmlldyk7XHJcblxyXG4gICAgdGhpcy51bnN1YnNjcmliZUdlb2xvY2F0ZSgpO1xyXG4gICAgaWYgKG9wdGlvbnMpIHtcclxuICAgICAgaWYgKG9wdGlvbnMuY2VudGVyKSB7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdGlvbiA9IHZpZXcuZ2V0UHJvamVjdGlvbigpLmdldENvZGUoKTtcclxuICAgICAgICBjb25zdCBjZW50ZXIgPSBvbHByb2ouZnJvbUxvbkxhdChvcHRpb25zLmNlbnRlciwgcHJvamVjdGlvbik7XHJcbiAgICAgICAgdmlldy5zZXRDZW50ZXIoY2VudGVyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKG9wdGlvbnMuZ2VvbG9jYXRlKSB7XHJcbiAgICAgICAgdGhpcy5nZW9sb2NhdGUodHJ1ZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChvcHRpb25zLmFsd2F5c1RyYWNraW5nKSB7XHJcbiAgICAgICAgdGhpcy5hbHdheXNUcmFja2luZyA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlcHJlY2F0ZWRcclxuICAgKiBUT0RPOiBNb3ZlIHRvIFZpZXdDb250cm9sbGVyIGFuZCB1cGRhdGUgZXZlcnkgcGxhY2UgaXQncyB1c2VkXHJcbiAgICovXHJcbiAgZ2V0Q2VudGVyKHByb2plY3Rpb24/OiBzdHJpbmcgfCBPbFByb2plY3Rpb24pOiBbbnVtYmVyLCBudW1iZXJdIHtcclxuICAgIHJldHVybiB0aGlzLnZpZXdDb250cm9sbGVyLmdldENlbnRlcihwcm9qZWN0aW9uKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlcHJlY2F0ZWRcclxuICAgKiBUT0RPOiBNb3ZlIHRvIFZpZXdDb250cm9sbGVyIGFuZCB1cGRhdGUgZXZlcnkgcGxhY2UgaXQncyB1c2VkXHJcbiAgICovXHJcbiAgZ2V0RXh0ZW50KHByb2plY3Rpb24/OiBzdHJpbmcgfCBPbFByb2plY3Rpb24pOiBNYXBFeHRlbnQge1xyXG4gICAgcmV0dXJuIHRoaXMudmlld0NvbnRyb2xsZXIuZ2V0RXh0ZW50KHByb2plY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgLy8gVE9ETzogTW92ZSB0byBWaWV3Q29udHJvbGxlciBhbmQgdXBkYXRlIGV2ZXJ5IHBsYWNlIGl0J3MgdXNlZFxyXG4gIGdldFpvb20oKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLnZpZXdDb250cm9sbGVyLmdldFpvb20oKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZUJhc2VMYXllcihiYXNlTGF5ZXI6IExheWVyKSB7XHJcbiAgICBpZiAoIWJhc2VMYXllcikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBibCBvZiB0aGlzLmdldEJhc2VMYXllcnMoKSkge1xyXG4gICAgICBibC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgYmFzZUxheWVyLnZpc2libGUgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMudmlld0NvbnRyb2xsZXIub2xWaWV3LnNldE1pblpvb20oXHJcbiAgICAgIGJhc2VMYXllci5kYXRhU291cmNlLm9wdGlvbnMubWluWm9vbSB8fCAodGhpcy5vcHRpb25zLnZpZXcgfHwge30pLm1pblpvb21cclxuICAgICk7XHJcbiAgICB0aGlzLnZpZXdDb250cm9sbGVyLm9sVmlldy5zZXRNYXhab29tKFxyXG4gICAgICBiYXNlTGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zLm1heFpvb20gfHwgKHRoaXMub3B0aW9ucy52aWV3IHx8IHt9KS5tYXhab29tXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0QmFzZUxheWVycygpOiBMYXllcltdIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVycy5maWx0ZXIoKGxheWVyOiBMYXllcikgPT4gbGF5ZXIuYmFzZUxheWVyID09PSB0cnVlKTtcclxuICB9XHJcblxyXG4gIGdldExheWVyQnlJZChpZDogc3RyaW5nKTogTGF5ZXIge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJzLmZpbmQoKGxheWVyOiBMYXllcikgPT4gbGF5ZXIuaWQgJiYgbGF5ZXIuaWQgPT09IGlkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhIHNpbmdsZSBsYXllclxyXG4gICAqIEBwYXJhbSBsYXllciBMYXllciB0byBhZGRcclxuICAgKiBAcGFyYW0gcHVzaCBERVBSRUNBVEVEXHJcbiAgICovXHJcbiAgYWRkTGF5ZXIobGF5ZXI6IExheWVyLCBwdXNoID0gdHJ1ZSkge1xyXG4gICAgdGhpcy5hZGRMYXllcnMoW2xheWVyXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgbWFueSBsYXllcnNcclxuICAgKiBAcGFyYW0gbGF5ZXJzIExheWVycyB0byBhZGRcclxuICAgKiBAcGFyYW0gcHVzaCBERVBSRUNBVEVEXHJcbiAgICovXHJcbiAgYWRkTGF5ZXJzKGxheWVyczogTGF5ZXJbXSwgcHVzaCA9IHRydWUpIHtcclxuICAgIGxldCBvZmZzZXRaSW5kZXggPSAwO1xyXG4gICAgbGV0IG9mZnNldEJhc2VMYXllclpJbmRleCA9IDA7XHJcbiAgICBjb25zdCBhZGRlZExheWVycyA9IGxheWVyc1xyXG4gICAgICAubWFwKChsYXllcjogTGF5ZXIpID0+IHtcclxuICAgICAgICBjb25zdCBvZmZzZXQgPSBsYXllci56SW5kZXhcclxuICAgICAgICAgID8gMFxyXG4gICAgICAgICAgOiBsYXllci5iYXNlTGF5ZXJcclxuICAgICAgICAgID8gb2Zmc2V0QmFzZUxheWVyWkluZGV4KytcclxuICAgICAgICAgIDogb2Zmc2V0WkluZGV4Kys7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9BZGRMYXllcihsYXllciwgb2Zmc2V0KTtcclxuICAgICAgfSlcclxuICAgICAgLmZpbHRlcigobGF5ZXI6IExheWVyIHwgdW5kZWZpbmVkKSA9PiBsYXllciAhPT0gdW5kZWZpbmVkKTtcclxuICAgIHRoaXMuc2V0TGF5ZXJzKFtdLmNvbmNhdCh0aGlzLmxheWVycywgYWRkZWRMYXllcnMpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBhIHNpbmdsZSBsYXllclxyXG4gICAqIEBwYXJhbSBsYXllciBMYXllciB0byByZW1vdmVcclxuICAgKi9cclxuICByZW1vdmVMYXllcihsYXllcjogTGF5ZXIpIHtcclxuICAgIHRoaXMucmVtb3ZlTGF5ZXJzKFtsYXllcl0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIG1hbnkgbGF5ZXJzXHJcbiAgICogQHBhcmFtIGxheWVycyBMYXllcnMgdG8gcmVtb3ZlXHJcbiAgICovXHJcbiAgcmVtb3ZlTGF5ZXJzKGxheWVyczogTGF5ZXJbXSkge1xyXG4gICAgY29uc3QgbmV3TGF5ZXJzID0gdGhpcy5sYXllcnMkLnZhbHVlLnNsaWNlKDApO1xyXG4gICAgY29uc3QgbGF5ZXJzVG9SZW1vdmUgPSBbXTtcclxuICAgIGxheWVycy5mb3JFYWNoKChsYXllcjogTGF5ZXIpID0+IHtcclxuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmdldExheWVySW5kZXgobGF5ZXIpO1xyXG4gICAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgIGxheWVyc1RvUmVtb3ZlLnB1c2gobGF5ZXIpO1xyXG4gICAgICAgIG5ld0xheWVycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBsYXllcnNUb1JlbW92ZS5mb3JFYWNoKChsYXllcjogTGF5ZXIpID0+IHRoaXMuZG9SZW1vdmVMYXllcihsYXllcikpO1xyXG4gICAgdGhpcy5zZXRMYXllcnMobmV3TGF5ZXJzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBhbGwgbGF5ZXJzXHJcbiAgICovXHJcbiAgcmVtb3ZlQWxsTGF5ZXJzKCkge1xyXG4gICAgdGhpcy5sYXllcnMuZm9yRWFjaCgobGF5ZXI6IExheWVyKSA9PiB0aGlzLmRvUmVtb3ZlTGF5ZXIobGF5ZXIpKTtcclxuICAgIHRoaXMubGF5ZXJzJC5uZXh0KFtdKTtcclxuICB9XHJcblxyXG4gIHJhaXNlTGF5ZXIobGF5ZXI6IExheWVyKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0TGF5ZXJJbmRleChsYXllcik7XHJcbiAgICBpZiAoaW5kZXggPiAxKSB7XHJcbiAgICAgIHRoaXMubW92ZUxheWVyKGxheWVyLCBpbmRleCwgaW5kZXggLSAxKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJhaXNlTGF5ZXJzKGxheWVyczogTGF5ZXJbXSkge1xyXG4gICAgZm9yIChjb25zdCBsYXllciBvZiBsYXllcnMpIHtcclxuICAgICAgdGhpcy5yYWlzZUxheWVyKGxheWVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxvd2VyTGF5ZXIobGF5ZXI6IExheWVyKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0TGF5ZXJJbmRleChsYXllcik7XHJcbiAgICBpZiAoaW5kZXggPCB0aGlzLmxheWVycy5sZW5ndGggLSAxKSB7XHJcbiAgICAgIHRoaXMubW92ZUxheWVyKGxheWVyLCBpbmRleCwgaW5kZXggKyAxKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxvd2VyTGF5ZXJzKGxheWVyczogTGF5ZXJbXSkge1xyXG4gICAgY29uc3QgcmV2ZXJzZUxheWVycyA9IGxheWVycy5yZXZlcnNlKCk7XHJcbiAgICBmb3IgKGNvbnN0IGxheWVyIG9mIHJldmVyc2VMYXllcnMpIHtcclxuICAgICAgdGhpcy5sb3dlckxheWVyKGxheWVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG1vdmVMYXllcihsYXllcjogTGF5ZXIsIGZyb206IG51bWJlciwgdG86IG51bWJlcikge1xyXG4gICAgY29uc3QgbGF5ZXJUbyA9IHRoaXMubGF5ZXJzW3RvXTtcclxuICAgIGNvbnN0IHpJbmRleFRvID0gbGF5ZXJUby56SW5kZXg7XHJcbiAgICBjb25zdCB6SW5kZXhGcm9tID0gbGF5ZXIuekluZGV4O1xyXG5cclxuICAgIGlmIChsYXllclRvLmJhc2VMYXllciB8fCBsYXllci5iYXNlTGF5ZXIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxheWVyLnpJbmRleCA9IHpJbmRleFRvO1xyXG4gICAgbGF5ZXJUby56SW5kZXggPSB6SW5kZXhGcm9tO1xyXG5cclxuICAgIHRoaXMubGF5ZXJzW3RvXSA9IGxheWVyO1xyXG4gICAgdGhpcy5sYXllcnNbZnJvbV0gPSBsYXllclRvO1xyXG4gICAgdGhpcy5sYXllcnMkLm5leHQodGhpcy5sYXllcnMuc2xpY2UoMCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGEgbGF5ZXIgdG8gdGhlIE9MIG1hcCBhbmQgc3RhcnQgd2F0Y2hpbmcuIElmIHRoZSBsYXllciBpcyBhbHJlYWR5XHJcbiAgICogYWRkZWQgdG8gdGhpcyBtYXAsIG1ha2UgaXQgdmlzaWJsZSBidXQgZG9uJ3QgYWRkIGl0IG9uZSBhZ2Fpbi5cclxuICAgKiBAcGFyYW0gbGF5ZXIgTGF5ZXJcclxuICAgKiBAcmV0dXJucyBUaGUgbGF5ZXIgYWRkZWQsIGlmIGFueVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZG9BZGRMYXllcihsYXllcjogTGF5ZXIsIG9mZnNldFpJbmRleDogbnVtYmVyKSB7XHJcbiAgICBpZiAobGF5ZXIuYmFzZUxheWVyICYmIGxheWVyLnZpc2libGUpIHtcclxuICAgICAgdGhpcy5jaGFuZ2VCYXNlTGF5ZXIobGF5ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGV4aXN0aW5nTGF5ZXIgPSB0aGlzLmdldExheWVyQnlJZChsYXllci5pZCk7XHJcbiAgICBpZiAoZXhpc3RpbmdMYXllciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGV4aXN0aW5nTGF5ZXIudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWxheWVyLmJhc2VMYXllciAmJiBsYXllci56SW5kZXgpIHtcclxuICAgICAgbGF5ZXIuekluZGV4ICs9IDEwO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChsYXllci56SW5kZXggPT09IHVuZGVmaW5lZCB8fCBsYXllci56SW5kZXggPT09IDApIHtcclxuICAgICAgY29uc3QgbWF4WkluZGV4ID0gTWF0aC5tYXgoXHJcbiAgICAgICAgbGF5ZXIuYmFzZUxheWVyID8gMCA6IDEwLFxyXG4gICAgICAgIC4uLnRoaXMubGF5ZXJzXHJcbiAgICAgICAgICAuZmlsdGVyKFxyXG4gICAgICAgICAgICBsID0+IGwuYmFzZUxheWVyID09PSBsYXllci5iYXNlTGF5ZXIgJiYgbC56SW5kZXggPCAyMDAgLy8gekluZGV4ID4gMjAwID0gc3lzdGVtIGxheWVyXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgICAubWFwKGwgPT4gbC56SW5kZXgpXHJcbiAgICAgICk7XHJcbiAgICAgIGxheWVyLnpJbmRleCA9IG1heFpJbmRleCArIDEgKyBvZmZzZXRaSW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxheWVyLmJhc2VMYXllciAmJiBsYXllci56SW5kZXggPiA5KSB7XHJcbiAgICAgIGxheWVyLnpJbmRleCA9IDEwOyAvLyBiYXNlbGF5ZXIgbXVzdCBoYXZlIHpJbmRleCA8IDEwXHJcbiAgICB9XHJcblxyXG4gICAgbGF5ZXIuc2V0TWFwKHRoaXMpO1xyXG4gICAgdGhpcy5sYXllcldhdGNoZXIud2F0Y2hMYXllcihsYXllcik7XHJcbiAgICB0aGlzLm9sLmFkZExheWVyKGxheWVyLm9sKTtcclxuXHJcbiAgICByZXR1cm4gbGF5ZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgYSBsYXllciBmcm9tIHRoZSBPTCBtYXAgYW5kIHN0b3Agd2F0Y2hpbmdcclxuICAgKiBAcGFyYW0gbGF5ZXIgTGF5ZXJcclxuICAgKi9cclxuICBwcml2YXRlIGRvUmVtb3ZlTGF5ZXIobGF5ZXI6IExheWVyKSB7XHJcbiAgICB0aGlzLmxheWVyV2F0Y2hlci51bndhdGNoTGF5ZXIobGF5ZXIpO1xyXG4gICAgdGhpcy5vbC5yZW1vdmVMYXllcihsYXllci5vbCk7XHJcbiAgICBsYXllci5zZXRNYXAodW5kZWZpbmVkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSB0aGUgbGF5ZXJzIG9ic2VydmFibGVcclxuICAgKiBAcGFyYW0gbGF5ZXJzIExheWVyc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgc2V0TGF5ZXJzKGxheWVyczogTGF5ZXJbXSkge1xyXG4gICAgdGhpcy5sYXllcnMkLm5leHQodGhpcy5zb3J0TGF5ZXJzQnlaSW5kZXgobGF5ZXJzKS5zbGljZSgwKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTb3J0IGxheWVycyBieSBkZXNjZW5kaW5nIHpJbmRleFxyXG4gICAqIEBwYXJhbSBsYXllcnMgQXJyYXkgb2YgbGF5ZXJzXHJcbiAgICogQHJldHVybnMgVGhlIG9yaWdpbmFsIGFycmF5LCBzb3J0ZWQgYnkgekluZGV4XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzb3J0TGF5ZXJzQnlaSW5kZXgobGF5ZXJzOiBMYXllcltdKSB7XHJcbiAgICAvLyBTb3J0IGJ5IGRlc2NlbmRpbmcgekluZGV4XHJcbiAgICByZXR1cm4gbGF5ZXJzLnNvcnQoXHJcbiAgICAgIChsYXllcjE6IExheWVyLCBsYXllcjI6IExheWVyKSA9PiBsYXllcjIuekluZGV4IC0gbGF5ZXIxLnpJbmRleFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBsYXllciBpbmRleCBpbiB0aGUgbWFwJ3MgaW5lbnIgYXJyYXkgb2YgbGF5ZXJzXHJcbiAgICogQHBhcmFtIGxheWVyIExheWVyXHJcbiAgICogQHJldHVybnMgVGhlIGxheWVyIGluZGV4XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRMYXllckluZGV4KGxheWVyOiBMYXllcikge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJzLmZpbmRJbmRleCgoX2xheWVyOiBMYXllcikgPT4gX2xheWVyID09PSBsYXllcik7XHJcbiAgfVxyXG5cclxuICAvLyBUT0RPOiBDcmVhdGUgYSBHZW9sb2NhdGlvbkNvbnRyb2xsZXIgd2l0aCBldmVyeXRoaW5nIGJlbG93XHJcbiAgZ2VvbG9jYXRlKHRyYWNrID0gZmFsc2UpIHtcclxuICAgIGxldCBmaXJzdCA9IHRydWU7XHJcbiAgICBpZiAodGhpcy5nZW9sb2NhdGlvbiQkKSB7XHJcbiAgICAgIHRyYWNrID0gdGhpcy5nZW9sb2NhdGlvbi5nZXRUcmFja2luZygpO1xyXG4gICAgICB0aGlzLnVuc3Vic2NyaWJlR2VvbG9jYXRlKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0YXJ0R2VvbG9jYXRpb24oKTtcclxuXHJcbiAgICB0aGlzLmdlb2xvY2F0aW9uJCQgPSB0aGlzLmdlb2xvY2F0aW9uJC5zdWJzY3JpYmUoZ2VvbG9jYXRpb24gPT4ge1xyXG4gICAgICBpZiAoIWdlb2xvY2F0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGFjY3VyYWN5ID0gZ2VvbG9jYXRpb24uZ2V0QWNjdXJhY3koKTtcclxuICAgICAgaWYgKGFjY3VyYWN5IDwgMTAwMDApIHtcclxuICAgICAgICBjb25zdCBnZW9tZXRyeSA9IGdlb2xvY2F0aW9uLmdldEFjY3VyYWN5R2VvbWV0cnkoKTtcclxuICAgICAgICBjb25zdCBleHRlbnQgPSBnZW9tZXRyeS5nZXRFeHRlbnQoKTtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB0aGlzLmdlb2xvY2F0aW9uRmVhdHVyZSAmJlxyXG4gICAgICAgICAgdGhpcy5vdmVybGF5LmRhdGFTb3VyY2Uub2wuZ2V0RmVhdHVyZUJ5SWQoXHJcbiAgICAgICAgICAgIHRoaXMuZ2VvbG9jYXRpb25GZWF0dXJlLmdldElkKClcclxuICAgICAgICAgIClcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHRoaXMub3ZlcmxheS5kYXRhU291cmNlLm9sLnJlbW92ZUZlYXR1cmUodGhpcy5nZW9sb2NhdGlvbkZlYXR1cmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYnVmZmVyRmVhdHVyZSkge1xyXG4gICAgICAgICAgdGhpcy5idWZmZXIuZGF0YVNvdXJjZS5vbC5yZW1vdmVGZWF0dXJlKHRoaXMuYnVmZmVyRmVhdHVyZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmdlb2xvY2F0aW9uRmVhdHVyZSA9IG5ldyBvbEZlYXR1cmUoeyBnZW9tZXRyeSB9KTtcclxuICAgICAgICB0aGlzLmdlb2xvY2F0aW9uRmVhdHVyZS5zZXRJZCgnZ2VvbG9jYXRpb25GZWF0dXJlJyk7XHJcbiAgICAgICAgaWYgKCF0aGlzLnBvc2l0aW9uRm9sbG93ZXIgJiYgdGhpcy5hbHdheXNUcmFja2luZykge1xyXG4gICAgICAgICAgdGhpcy5vdmVybGF5LmFkZE9sRmVhdHVyZSh0aGlzLmdlb2xvY2F0aW9uRmVhdHVyZSwgRmVhdHVyZU1vdGlvbi5Ob25lKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucG9zaXRpb25Gb2xsb3dlciAmJiB0aGlzLmFsd2F5c1RyYWNraW5nKSB7XHJcbiAgICAgICAgICB0aGlzLm92ZXJsYXkuYWRkT2xGZWF0dXJlKHRoaXMuZ2VvbG9jYXRpb25GZWF0dXJlLCBGZWF0dXJlTW90aW9uLk1vdmUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLm92ZXJsYXkuYWRkT2xGZWF0dXJlKHRoaXMuZ2VvbG9jYXRpb25GZWF0dXJlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9sLmdldFZpZXcoKS5vcHRpb25zXy5idWZmZXIpIHtcclxuICAgICAgICAgIGNvbnN0IGJ1ZmZlclJhZGl1cyA9IHRoaXMub2wuZ2V0VmlldygpLm9wdGlvbnNfLmJ1ZmZlci5idWZmZXJSYWRpdXM7XHJcbiAgICAgICAgICBjb25zdCBjb29yZGluYXRlcyA9IGdlb2xvY2F0aW9uLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgICB0aGlzLmJ1ZmZlckdlb20gPSBuZXcgb2xDaXJjbGUoY29vcmRpbmF0ZXMsIGJ1ZmZlclJhZGl1cyk7XHJcbiAgICAgICAgICBjb25zdCBidWZmZXJTdHJva2UgPSB0aGlzLm9sLmdldFZpZXcoKS5vcHRpb25zXy5idWZmZXIuYnVmZmVyU3Ryb2tlO1xyXG4gICAgICAgICAgY29uc3QgYnVmZmVyRmlsbCA9IHRoaXMub2wuZ2V0VmlldygpLm9wdGlvbnNfLmJ1ZmZlci5idWZmZXJGaWxsO1xyXG5cclxuICAgICAgICAgIGxldCBidWZmZXJUZXh0O1xyXG4gICAgICAgICAgaWYgKHRoaXMub2wuZ2V0VmlldygpLm9wdGlvbnNfLmJ1ZmZlci5zaG93QnVmZmVyUmFkaXVzKSB7XHJcbiAgICAgICAgICAgIGJ1ZmZlclRleHQgPSBidWZmZXJSYWRpdXMudG9TdHJpbmcoKSArICdtJztcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGJ1ZmZlclRleHQgPSAnJztcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0aGlzLmJ1ZmZlckZlYXR1cmUgPSBuZXcgb2xGZWF0dXJlKHRoaXMuYnVmZmVyR2VvbSk7XHJcbiAgICAgICAgICB0aGlzLmJ1ZmZlckZlYXR1cmUuc2V0SWQoJ2J1ZmZlckZlYXR1cmUnKTtcclxuICAgICAgICAgIHRoaXMuYnVmZmVyRmVhdHVyZS5zZXQoJ2J1ZmZlclN0cm9rZScsIGJ1ZmZlclN0cm9rZSk7XHJcbiAgICAgICAgICB0aGlzLmJ1ZmZlckZlYXR1cmUuc2V0KCdidWZmZXJGaWxsJywgYnVmZmVyRmlsbCk7XHJcbiAgICAgICAgICB0aGlzLmJ1ZmZlckZlYXR1cmUuc2V0KCdidWZmZXJUZXh0JywgYnVmZmVyVGV4dCk7XHJcbiAgICAgICAgICB0aGlzLmJ1ZmZlci5hZGRPbEZlYXR1cmUodGhpcy5idWZmZXJGZWF0dXJlLCBGZWF0dXJlTW90aW9uLk5vbmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZmlyc3QpIHtcclxuICAgICAgICAgIHRoaXMudmlld0NvbnRyb2xsZXIuem9vbVRvRXh0ZW50KGV4dGVudCk7XHJcbiAgICAgICAgICB0aGlzLnBvc2l0aW9uRm9sbG93ZXIgPSAhdGhpcy5wb3NpdGlvbkZvbGxvd2VyO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChmaXJzdCkge1xyXG4gICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLm9sLmdldFZpZXcoKTtcclxuICAgICAgICBjb25zdCBjb29yZGluYXRlcyA9IGdlb2xvY2F0aW9uLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgdmlldy5zZXRDZW50ZXIoY29vcmRpbmF0ZXMpO1xyXG4gICAgICAgIHZpZXcuc2V0Wm9vbSgxNCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRyYWNrICYmICF0aGlzLmFsd2F5c1RyYWNraW5nKSB7XHJcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZUdlb2xvY2F0ZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIGZpcnN0ID0gZmFsc2U7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHVuc3Vic2NyaWJlR2VvbG9jYXRlKCkge1xyXG4gICAgdGhpcy5zdG9wR2VvbG9jYXRpb24oKTtcclxuICAgIGlmICh0aGlzLmdlb2xvY2F0aW9uJCQpIHtcclxuICAgICAgdGhpcy5nZW9sb2NhdGlvbiQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIHRoaXMuZ2VvbG9jYXRpb24kJCA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhcnRHZW9sb2NhdGlvbigpIHtcclxuICAgIGlmICghdGhpcy5nZW9sb2NhdGlvbikge1xyXG4gICAgICB0aGlzLmdlb2xvY2F0aW9uID0gbmV3IG9sR2VvbG9jYXRpb24oe1xyXG4gICAgICAgIHRyYWNraW5nT3B0aW9uczoge1xyXG4gICAgICAgICAgZW5hYmxlSGlnaEFjY3VyYWN5OiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcm9qZWN0aW9uOiB0aGlzLnByb2plY3Rpb24sXHJcbiAgICAgICAgdHJhY2tpbmc6IHRydWVcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLmdlb2xvY2F0aW9uLm9uKCdjaGFuZ2UnLCBldnQgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2VvbG9jYXRpb24kLm5leHQodGhpcy5nZW9sb2NhdGlvbik7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5nZW9sb2NhdGlvbi5zZXRUcmFja2luZyh0cnVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RvcEdlb2xvY2F0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMuZ2VvbG9jYXRpb24pIHtcclxuICAgICAgdGhpcy5nZW9sb2NhdGlvbi5zZXRUcmFja2luZyhmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbk9mZmxpbmVUb2dnbGUob2ZmbGluZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5vZmZsaW5lQnV0dG9uVG9nZ2xlJC5uZXh0KG9mZmxpbmUpO1xyXG4gIH1cclxufVxyXG4iXX0=