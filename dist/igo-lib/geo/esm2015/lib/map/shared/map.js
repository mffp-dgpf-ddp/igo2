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
        if (zIndexTo < 10) {
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
            if (accuracy < 4140000) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL21hcC9zaGFyZWQvbWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssTUFBTSxRQUFRLENBQUM7QUFDM0IsT0FBTyxNQUFNLE1BQU0sU0FBUyxDQUFDO0FBQzdCLE9BQU8sU0FBUyxNQUFNLFlBQVksQ0FBQztBQUNuQyxPQUFPLGFBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLG9CQUFvQixNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sa0JBQWtCLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxLQUFLLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFDbEMsT0FBTyxLQUFLLE9BQU8sTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxLQUFLLGFBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRCxPQUFPLFFBQVEsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0QyxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDMUIsT0FBTyxFQUFFLGVBQWUsRUFBeUIsTUFBTSxNQUFNLENBQUM7QUFLOUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRXZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQVF0RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7O0FBS3ZELE1BQU0sT0FBTyxNQUFNOzs7O0lBK0JqQixZQUFZLE9BQW9CO1FBN0J6QixZQUFPLEdBQUcsSUFBSSxlQUFlLENBQVUsRUFBRSxDQUFDLENBQUM7UUFFM0MsaUJBQVksR0FBRyxJQUFJLGVBQWUsQ0FBZ0IsU0FBUyxDQUFDLENBQUM7UUFlNUQsbUJBQWMsR0FBd0I7WUFDNUMsUUFBUSxFQUFFLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRTtTQUNqQyxDQUFDO1FBV0EsSUFBSSxDQUFDLE9BQU8sR0FBRyxN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SUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQztDQUNGOzs7SUFoYUMsb0JBQWlCOztJQUNqQix5QkFBa0Q7O0lBQ2xELHlCQUF1Qzs7SUFDdkMsOEJBQW9FOztJQUNwRSxvQ0FBcUM7O0lBQ3JDLDRCQUE0Qjs7SUFDNUIsK0JBQWdDOztJQUNoQyx3QkFBdUI7O0lBQ3ZCLHlCQUF3Qjs7SUFDeEIsZ0NBQXlDOztJQUV6QyxrQ0FBMkM7Ozs7O0lBRTNDLDhCQUFtQzs7Ozs7SUFDbkMsNkJBQW1DOzs7OztJQUNuQywrQkFBb0M7Ozs7O0lBRXBDLHlCQUE0Qjs7Ozs7SUFDNUIsZ0NBRUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwJztcclxuaW1wb3J0IG9sVmlldyBmcm9tICdvbC9WaWV3JztcclxuaW1wb3J0IG9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuaW1wb3J0IG9sR2VvbG9jYXRpb24gZnJvbSAnb2wvR2VvbG9jYXRpb24nO1xyXG5pbXBvcnQgb2xDb250cm9sQXR0cmlidXRpb24gZnJvbSAnb2wvY29udHJvbC9BdHRyaWJ1dGlvbic7XHJcbmltcG9ydCBvbENvbnRyb2xTY2FsZUxpbmUgZnJvbSAnb2wvY29udHJvbC9TY2FsZUxpbmUnO1xyXG5pbXBvcnQgKiBhcyBvbHByb2ogZnJvbSAnb2wvcHJvaic7XHJcbmltcG9ydCAqIGFzIG9scHJvajQgZnJvbSAnb2wvcHJvai9wcm9qNCc7XHJcbmltcG9ydCBPbFByb2plY3Rpb24gZnJvbSAnb2wvcHJvai9Qcm9qZWN0aW9uJztcclxuaW1wb3J0ICogYXMgb2xpbnRlcmFjdGlvbiBmcm9tICdvbC9pbnRlcmFjdGlvbic7XHJcbmltcG9ydCBvbENpcmNsZSBmcm9tICdvbC9nZW9tL0NpcmNsZSc7XHJcblxyXG5pbXBvcnQgcHJvajQgZnJvbSAncHJvajQnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgU3ViamVjdFN0YXR1cyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycyc7XHJcbmltcG9ydCB7IE92ZXJsYXkgfSBmcm9tICcuLi8uLi9vdmVybGF5L3NoYXJlZC9vdmVybGF5JztcclxuXHJcbmltcG9ydCB7IExheWVyV2F0Y2hlciB9IGZyb20gJy4uL3V0aWxzL2xheWVyLXdhdGNoZXInO1xyXG5pbXBvcnQge1xyXG4gIE1hcFZpZXdPcHRpb25zLFxyXG4gIE1hcE9wdGlvbnMsXHJcbiAgTWFwQXR0cmlidXRpb25PcHRpb25zLFxyXG4gIE1hcFNjYWxlTGluZU9wdGlvbnMsXHJcbiAgTWFwRXh0ZW50XHJcbn0gZnJvbSAnLi9tYXAuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgTWFwVmlld0NvbnRyb2xsZXIgfSBmcm9tICcuL2NvbnRyb2xsZXJzL3ZpZXcnO1xyXG5pbXBvcnQgeyBGZWF0dXJlRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2ZlYXR1cmUtZGF0YXNvdXJjZSc7XHJcblxyXG4vLyBUT0RPOiBUaGlzIGNsYXNzIGlzIG1lc3N5LiBDbGVhcmx5IGRlZmluZSBpdCdzIHNjb3BlIGFuZCB0aGUgbWFwIGJyb3dzZXIncy5cclxuLy8gTW92ZSBzb21lIHN0dWZmIGludG8gY29udHJvbGxlcnMuXHJcbmV4cG9ydCBjbGFzcyBJZ29NYXAge1xyXG4gIHB1YmxpYyBvbDogb2xNYXA7XHJcbiAgcHVibGljIGxheWVycyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PExheWVyW10+KFtdKTtcclxuICBwdWJsaWMgc3RhdHVzJDogU3ViamVjdDxTdWJqZWN0U3RhdHVzPjtcclxuICBwdWJsaWMgZ2VvbG9jYXRpb24kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxvbEdlb2xvY2F0aW9uPih1bmRlZmluZWQpO1xyXG4gIHB1YmxpYyBnZW9sb2NhdGlvbkZlYXR1cmU6IG9sRmVhdHVyZTtcclxuICBwdWJsaWMgYnVmZmVyR2VvbTogb2xDaXJjbGU7XHJcbiAgcHVibGljIGJ1ZmZlckZlYXR1cmU6IG9sRmVhdHVyZTtcclxuICBwdWJsaWMgYnVmZmVyOiBPdmVybGF5O1xyXG4gIHB1YmxpYyBvdmVybGF5OiBPdmVybGF5O1xyXG4gIHB1YmxpYyB2aWV3Q29udHJvbGxlcjogTWFwVmlld0NvbnRyb2xsZXI7XHJcblxyXG4gIHB1YmxpYyBidWZmZXJEYXRhU291cmNlOiBGZWF0dXJlRGF0YVNvdXJjZTtcclxuXHJcbiAgcHJpdmF0ZSBsYXllcldhdGNoZXI6IExheWVyV2F0Y2hlcjtcclxuICBwcml2YXRlIGdlb2xvY2F0aW9uOiBvbEdlb2xvY2F0aW9uO1xyXG4gIHByaXZhdGUgZ2VvbG9jYXRpb24kJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBwcml2YXRlIG9wdGlvbnM6IE1hcE9wdGlvbnM7XHJcbiAgcHJpdmF0ZSBkZWZhdWx0T3B0aW9uczogUGFydGlhbDxNYXBPcHRpb25zPiA9IHtcclxuICAgIGNvbnRyb2xzOiB7IGF0dHJpYnV0aW9uOiBmYWxzZSB9XHJcbiAgfTtcclxuXHJcbiAgZ2V0IGxheWVycygpOiBMYXllcltdIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVycyQudmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXQgcHJvamVjdGlvbigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMudmlld0NvbnRyb2xsZXIuZ2V0T2xQcm9qZWN0aW9uKCkuZ2V0Q29kZSgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucz86IE1hcE9wdGlvbnMpIHtcclxuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgdGhpcy5sYXllcldhdGNoZXIgPSBuZXcgTGF5ZXJXYXRjaGVyKCk7XHJcbiAgICB0aGlzLnN0YXR1cyQgPSB0aGlzLmxheWVyV2F0Y2hlci5zdGF0dXMkO1xyXG4gICAgb2xwcm9qNC5yZWdpc3Rlcihwcm9qNCk7XHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIGluaXQoKSB7XHJcbiAgICBjb25zdCBjb250cm9scyA9IFtdO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb250cm9scykge1xyXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRyb2xzLmF0dHJpYnV0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgYXR0cmlidXRpb25PcHQgPSAodGhpcy5vcHRpb25zLmNvbnRyb2xzLmF0dHJpYnV0aW9uID09PSB0cnVlXHJcbiAgICAgICAgICA/IHt9XHJcbiAgICAgICAgICA6IHRoaXMub3B0aW9ucy5jb250cm9scy5hdHRyaWJ1dGlvbikgYXMgTWFwQXR0cmlidXRpb25PcHRpb25zO1xyXG4gICAgICAgIGNvbnRyb2xzLnB1c2gobmV3IG9sQ29udHJvbEF0dHJpYnV0aW9uKGF0dHJpYnV0aW9uT3B0KSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5jb250cm9scy5zY2FsZUxpbmUpIHtcclxuICAgICAgICBjb25zdCBzY2FsZUxpbmVPcHQgPSAodGhpcy5vcHRpb25zLmNvbnRyb2xzLnNjYWxlTGluZSA9PT0gdHJ1ZVxyXG4gICAgICAgICAgPyB7fVxyXG4gICAgICAgICAgOiB0aGlzLm9wdGlvbnMuY29udHJvbHMuc2NhbGVMaW5lKSBhcyBNYXBTY2FsZUxpbmVPcHRpb25zO1xyXG4gICAgICAgIGNvbnRyb2xzLnB1c2gobmV3IG9sQ29udHJvbFNjYWxlTGluZShzY2FsZUxpbmVPcHQpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGV0IGludGVyYWN0aW9ucyA9IHt9O1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5pbnRlcmFjdGlvbnMgPT09IGZhbHNlKSB7XHJcbiAgICAgIGludGVyYWN0aW9ucyA9IHtcclxuICAgICAgICBhbHRTaGlmdERyYWdSb3RhdGU6IGZhbHNlLFxyXG4gICAgICAgIGRvdWJsZUNsaWNrWm9vbTogZmFsc2UsXHJcbiAgICAgICAga2V5Ym9hcmQ6IGZhbHNlLFxyXG4gICAgICAgIG1vdXNlV2hlZWxab29tOiBmYWxzZSxcclxuICAgICAgICBzaGlmdERyYWdab29tOiBmYWxzZSxcclxuICAgICAgICBkcmFnUGFuOiBmYWxzZSxcclxuICAgICAgICBwaW5jaFJvdGF0ZTogZmFsc2UsXHJcbiAgICAgICAgcGluY2hab29tOiBmYWxzZVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub2wgPSBuZXcgb2xNYXAoe1xyXG4gICAgICBpbnRlcmFjdGlvbnM6IG9saW50ZXJhY3Rpb24uZGVmYXVsdHMoaW50ZXJhY3Rpb25zKSxcclxuICAgICAgY29udHJvbHNcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuc2V0Vmlldyh0aGlzLm9wdGlvbnMudmlldyB8fCB7fSk7XHJcbiAgICB0aGlzLnZpZXdDb250cm9sbGVyID0gbmV3IE1hcFZpZXdDb250cm9sbGVyKHtcclxuICAgICAgc3RhdGVIaXN0b3J5OiB0cnVlXHJcbiAgICB9KTtcclxuICAgIHRoaXMudmlld0NvbnRyb2xsZXIuc2V0T2xNYXAodGhpcy5vbCk7XHJcbiAgICB0aGlzLm92ZXJsYXkgPSBuZXcgT3ZlcmxheSh0aGlzKTtcclxuICAgIHRoaXMuYnVmZmVyID0gbmV3IE92ZXJsYXkodGhpcyk7XHJcbiAgfVxyXG5cclxuICBzZXRUYXJnZXQoaWQ6IHN0cmluZykge1xyXG4gICAgdGhpcy5vbC5zZXRUYXJnZXQoaWQpO1xyXG4gICAgaWYgKGlkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5sYXllcldhdGNoZXIuc3Vic2NyaWJlKCgpID0+IHt9LCBudWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubGF5ZXJXYXRjaGVyLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGVWaWV3KG9wdGlvbnM6IE1hcFZpZXdPcHRpb25zKSB7XHJcbiAgICBjb25zdCBjdXJyZW50VmlldyA9IHRoaXMub2wuZ2V0VmlldygpO1xyXG4gICAgY29uc3Qgdmlld09wdGlvbnMgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgICB7XHJcbiAgICAgICAgem9vbTogY3VycmVudFZpZXcuZ2V0Wm9vbSgpXHJcbiAgICAgIH0sXHJcbiAgICAgIGN1cnJlbnRWaWV3LmdldFByb3BlcnRpZXMoKVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnNldFZpZXcoT2JqZWN0LmFzc2lnbih2aWV3T3B0aW9ucywgb3B0aW9ucykpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBtYXAgdmlld1xyXG4gICAqIEBwYXJhbSBvcHRpb25zIE1hcCB2aWV3IG9wdGlvbnNcclxuICAgKi9cclxuICBzZXRWaWV3KG9wdGlvbnM6IE1hcFZpZXdPcHRpb25zKSB7XHJcbiAgICBpZiAodGhpcy52aWV3Q29udHJvbGxlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMudmlld0NvbnRyb2xsZXIuY2xlYXJTdGF0ZUhpc3RvcnkoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB2aWV3ID0gbmV3IG9sVmlldyhvcHRpb25zKTtcclxuICAgIHRoaXMub2wuc2V0Vmlldyh2aWV3KTtcclxuXHJcbiAgICB0aGlzLnVuc3Vic2NyaWJlR2VvbG9jYXRlKCk7XHJcbiAgICBpZiAob3B0aW9ucykge1xyXG4gICAgICBpZiAob3B0aW9ucy5jZW50ZXIpIHtcclxuICAgICAgICBjb25zdCBwcm9qZWN0aW9uID0gdmlldy5nZXRQcm9qZWN0aW9uKCkuZ2V0Q29kZSgpO1xyXG4gICAgICAgIGNvbnN0IGNlbnRlciA9IG9scHJvai5mcm9tTG9uTGF0KG9wdGlvbnMuY2VudGVyLCBwcm9qZWN0aW9uKTtcclxuICAgICAgICB2aWV3LnNldENlbnRlcihjZW50ZXIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAob3B0aW9ucy5nZW9sb2NhdGUpIHtcclxuICAgICAgICB0aGlzLmdlb2xvY2F0ZSh0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gVE9ETzogTW92ZSB0byBWaWV3Q29udHJvbGxlciBhbmQgdXBkYXRlIGV2ZXJ5IHBsYWNlIGl0J3MgdXNlZFxyXG4gIGdldENlbnRlcihwcm9qZWN0aW9uPzogc3RyaW5nIHwgT2xQcm9qZWN0aW9uKTogW251bWJlciwgbnVtYmVyXSB7XHJcbiAgICByZXR1cm4gdGhpcy52aWV3Q29udHJvbGxlci5nZXRDZW50ZXIoKTtcclxuICB9XHJcblxyXG4gIC8vIFRPRE86IE1vdmUgdG8gVmlld0NvbnRyb2xsZXIgYW5kIHVwZGF0ZSBldmVyeSBwbGFjZSBpdCdzIHVzZWRcclxuICBnZXRFeHRlbnQocHJvamVjdGlvbj86IHN0cmluZyB8IE9sUHJvamVjdGlvbik6IE1hcEV4dGVudCB7XHJcbiAgICByZXR1cm4gdGhpcy52aWV3Q29udHJvbGxlci5nZXRFeHRlbnQoKTtcclxuICB9XHJcblxyXG4gIC8vIFRPRE86IE1vdmUgdG8gVmlld0NvbnRyb2xsZXIgYW5kIHVwZGF0ZSBldmVyeSBwbGFjZSBpdCdzIHVzZWRcclxuICBnZXRab29tKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy52aWV3Q29udHJvbGxlci5nZXRab29tKCk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VCYXNlTGF5ZXIoYmFzZUxheWVyOiBMYXllcikge1xyXG4gICAgaWYgKCFiYXNlTGF5ZXIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3QgYmwgb2YgdGhpcy5nZXRCYXNlTGF5ZXJzKCkpIHtcclxuICAgICAgYmwudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGJhc2VMYXllci52aXNpYmxlID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGdldEJhc2VMYXllcnMoKTogTGF5ZXJbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllcnMuZmlsdGVyKChsYXllcjogTGF5ZXIpID0+IGxheWVyLmJhc2VMYXllciA9PT0gdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBnZXRMYXllckJ5SWQoaWQ6IHN0cmluZyk6IExheWVyIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVycy5maW5kKChsYXllcjogTGF5ZXIpID0+IGxheWVyLmlkICYmIGxheWVyLmlkID09PSBpZCk7XHJcbiAgfVxyXG5cclxuICBnZXRMYXllckJ5QWxpYXMoYWxpYXM6IHN0cmluZyk6IExheWVyIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVycy5maW5kKChsYXllcjogTGF5ZXIpID0+IGxheWVyLmFsaWFzICYmIGxheWVyLmFsaWFzID09PSBhbGlhcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYSBzaW5nbGUgbGF5ZXJcclxuICAgKiBAcGFyYW0gbGF5ZXIgTGF5ZXIgdG8gYWRkXHJcbiAgICogQHBhcmFtIHB1c2ggREVQUkVDQVRFRFxyXG4gICAqL1xyXG4gIGFkZExheWVyKGxheWVyOiBMYXllciwgcHVzaCA9IHRydWUpIHtcclxuICAgIHRoaXMuYWRkTGF5ZXJzKFtsYXllcl0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIG1hbnkgbGF5ZXJzXHJcbiAgICogQHBhcmFtIGxheWVycyBMYXllcnMgdG8gYWRkXHJcbiAgICogQHBhcmFtIHB1c2ggREVQUkVDQVRFRFxyXG4gICAqL1xyXG4gIGFkZExheWVycyhsYXllcnM6IExheWVyW10sIHB1c2ggPSB0cnVlKSB7XHJcbiAgICBjb25zdCBhZGRlZExheWVycyA9IGxheWVyc1xyXG4gICAgICAubWFwKChsYXllcjogTGF5ZXIpID0+IHRoaXMuZG9BZGRMYXllcihsYXllcikpXHJcbiAgICAgIC5maWx0ZXIoKGxheWVyOiBMYXllciB8IHVuZGVmaW5lZCkgPT4gbGF5ZXIgIT09IHVuZGVmaW5lZCk7XHJcbiAgICB0aGlzLnNldExheWVycyhbXS5jb25jYXQodGhpcy5sYXllcnMsIGFkZGVkTGF5ZXJzKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgYSBzaW5nbGUgbGF5ZXJcclxuICAgKiBAcGFyYW0gbGF5ZXIgTGF5ZXIgdG8gcmVtb3ZlXHJcbiAgICovXHJcbiAgcmVtb3ZlTGF5ZXIobGF5ZXI6IExheWVyKSB7XHJcbiAgICB0aGlzLnJlbW92ZUxheWVycyhbbGF5ZXJdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBtYW55IGxheWVyc1xyXG4gICAqIEBwYXJhbSBsYXllcnMgTGF5ZXJzIHRvIHJlbW92ZVxyXG4gICAqL1xyXG4gIHJlbW92ZUxheWVycyhsYXllcnM6IExheWVyW10pIHtcclxuICAgIGNvbnN0IG5ld0xheWVycyA9IHRoaXMubGF5ZXJzJC52YWx1ZS5zbGljZSgwKTtcclxuICAgIGNvbnN0IGxheWVyc1RvUmVtb3ZlID0gW107XHJcbiAgICBsYXllcnMuZm9yRWFjaCgobGF5ZXI6IExheWVyKSA9PiB7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRMYXllckluZGV4KGxheWVyKTtcclxuICAgICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgICBsYXllcnNUb1JlbW92ZS5wdXNoKGxheWVyKTtcclxuICAgICAgICBuZXdMYXllcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgbGF5ZXJzVG9SZW1vdmUuZm9yRWFjaCgobGF5ZXI6IExheWVyKSA9PiB0aGlzLmRvUmVtb3ZlTGF5ZXIobGF5ZXIpKTtcclxuICAgIHRoaXMuc2V0TGF5ZXJzKG5ld0xheWVycyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgYWxsIGxheWVyc1xyXG4gICAqL1xyXG4gIHJlbW92ZUFsbExheWVycygpIHtcclxuICAgIHRoaXMubGF5ZXJzLmZvckVhY2goKGxheWVyOiBMYXllcikgPT4gdGhpcy5kb1JlbW92ZUxheWVyKGxheWVyKSk7XHJcbiAgICB0aGlzLmxheWVycyQubmV4dChbXSk7XHJcbiAgfVxyXG5cclxuICByYWlzZUxheWVyKGxheWVyOiBMYXllcikge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmdldExheWVySW5kZXgobGF5ZXIpO1xyXG4gICAgaWYgKGluZGV4ID4gMCkge1xyXG4gICAgICB0aGlzLm1vdmVMYXllcihsYXllciwgaW5kZXgsIGluZGV4IC0gMSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsb3dlckxheWVyKGxheWVyOiBMYXllcikge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmdldExheWVySW5kZXgobGF5ZXIpO1xyXG4gICAgaWYgKGluZGV4IDwgdGhpcy5sYXllcnMubGVuZ3RoIC0gMSkge1xyXG4gICAgICB0aGlzLm1vdmVMYXllcihsYXllciwgaW5kZXgsIGluZGV4ICsgMSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtb3ZlTGF5ZXIobGF5ZXI6IExheWVyLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IGxheWVyVG8gPSB0aGlzLmxheWVyc1t0b107XHJcbiAgICBjb25zdCB6SW5kZXhUbyA9IGxheWVyVG8uekluZGV4O1xyXG4gICAgY29uc3QgekluZGV4RnJvbSA9IGxheWVyLnpJbmRleDtcclxuXHJcbiAgICBpZiAoekluZGV4VG8gPCAxMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGF5ZXIuekluZGV4ID0gekluZGV4VG87XHJcbiAgICBsYXllclRvLnpJbmRleCA9IHpJbmRleEZyb207XHJcblxyXG4gICAgdGhpcy5sYXllcnNbdG9dID0gbGF5ZXI7XHJcbiAgICB0aGlzLmxheWVyc1tmcm9tXSA9IGxheWVyVG87XHJcbiAgICB0aGlzLmxheWVycyQubmV4dCh0aGlzLmxheWVycy5zbGljZSgwKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYSBsYXllciB0byB0aGUgT0wgbWFwIGFuZCBzdGFydCB3YXRjaGluZy4gSWYgdGhlIGxheWVyIGlzIGFscmVhZHlcclxuICAgKiBhZGRlZCB0byB0aGlzIG1hcCwgbWFrZSBpdCB2aXNpYmxlIGJ1dCBkb24ndCBhZGQgaXQgb25lIGFnYWluLlxyXG4gICAqIEBwYXJhbSBsYXllciBMYXllclxyXG4gICAqIEByZXR1cm5zIFRoZSBsYXllciBhZGRlZCwgaWYgYW55XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkb0FkZExheWVyKGxheWVyOiBMYXllcikge1xyXG4gICAgaWYgKGxheWVyLmJhc2VMYXllciAmJiBsYXllci52aXNpYmxlKSB7XHJcbiAgICAgIHRoaXMuY2hhbmdlQmFzZUxheWVyKGxheWVyKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBleGlzdGluZ0xheWVyID0gdGhpcy5nZXRMYXllckJ5SWQobGF5ZXIuaWQpO1xyXG4gICAgaWYgKGV4aXN0aW5nTGF5ZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBleGlzdGluZ0xheWVyLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxheWVyLnpJbmRleCA9PT0gdW5kZWZpbmVkIHx8IGxheWVyLnpJbmRleCA9PT0gMCkge1xyXG4gICAgICBjb25zdCBvZmZzZXQgPSBsYXllci5iYXNlTGF5ZXIgPyAxIDogMTA7XHJcbiAgICAgIGxheWVyLnpJbmRleCA9IHRoaXMubGF5ZXJzLmxlbmd0aCArIG9mZnNldDtcclxuICAgIH1cclxuXHJcbiAgICBsYXllci5zZXRNYXAodGhpcyk7XHJcbiAgICB0aGlzLmxheWVyV2F0Y2hlci53YXRjaExheWVyKGxheWVyKTtcclxuICAgIHRoaXMub2wuYWRkTGF5ZXIobGF5ZXIub2wpO1xyXG5cclxuICAgIHJldHVybiBsYXllcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBhIGxheWVyIGZyb20gdGhlIE9MIG1hcCBhbmQgc3RvcCB3YXRjaGluZ1xyXG4gICAqIEBwYXJhbSBsYXllciBMYXllclxyXG4gICAqL1xyXG4gIHByaXZhdGUgZG9SZW1vdmVMYXllcihsYXllcjogTGF5ZXIpIHtcclxuICAgIHRoaXMubGF5ZXJXYXRjaGVyLnVud2F0Y2hMYXllcihsYXllcik7XHJcbiAgICB0aGlzLm9sLnJlbW92ZUxheWVyKGxheWVyLm9sKTtcclxuICAgIGxheWVyLnNldE1hcCh1bmRlZmluZWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHRoZSBsYXllcnMgb2JzZXJ2YWJsZVxyXG4gICAqIEBwYXJhbSBsYXllcnMgTGF5ZXJzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZXRMYXllcnMobGF5ZXJzOiBMYXllcltdKSB7XHJcbiAgICB0aGlzLmxheWVycyQubmV4dCh0aGlzLnNvcnRMYXllcnNCeVpJbmRleChsYXllcnMpLnNsaWNlKDApKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNvcnQgbGF5ZXJzIGJ5IGRlc2NlbmRpbmcgekluZGV4XHJcbiAgICogQHBhcmFtIGxheWVycyBBcnJheSBvZiBsYXllcnNcclxuICAgKiBAcmV0dXJucyBUaGUgb3JpZ2luYWwgYXJyYXksIHNvcnRlZCBieSB6SW5kZXhcclxuICAgKi9cclxuICBwcml2YXRlIHNvcnRMYXllcnNCeVpJbmRleChsYXllcnM6IExheWVyW10pIHtcclxuICAgIC8vIFNvcnQgYnkgZGVzY2VuZGluZyB6SW5kZXhcclxuICAgIHJldHVybiBsYXllcnMuc29ydCgobGF5ZXIxOiBMYXllciwgbGF5ZXIyOiBMYXllcikgPT4gbGF5ZXIyLnpJbmRleCAtIGxheWVyMS56SW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGxheWVyIGluZGV4IGluIHRoZSBtYXAncyBpbmVuciBhcnJheSBvZiBsYXllcnNcclxuICAgKiBAcGFyYW0gbGF5ZXIgTGF5ZXJcclxuICAgKiBAcmV0dXJucyBUaGUgbGF5ZXIgaW5kZXhcclxuICAgKi9cclxuICBwcml2YXRlIGdldExheWVySW5kZXgobGF5ZXI6IExheWVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllcnMuZmluZEluZGV4KChfbGF5ZXI6IExheWVyKSA9PiBfbGF5ZXIgPT09IGxheWVyKTtcclxuICB9XHJcblxyXG4gIC8vIFRPRE86IENyZWF0ZSBhIEdlb2xvY2F0aW9uQ29udHJvbGxlciB3aXRoIGV2ZXJ5dGhpbmcgYmVsb3dcclxuICBnZW9sb2NhdGUodHJhY2sgPSBmYWxzZSkge1xyXG4gICAgbGV0IGZpcnN0ID0gdHJ1ZTtcclxuICAgIGlmICh0aGlzLmdlb2xvY2F0aW9uJCQpIHtcclxuICAgICAgdHJhY2sgPSB0aGlzLmdlb2xvY2F0aW9uLmdldFRyYWNraW5nKCk7XHJcbiAgICAgIHRoaXMudW5zdWJzY3JpYmVHZW9sb2NhdGUoKTtcclxuICAgIH1cclxuICAgIHRoaXMuc3RhcnRHZW9sb2NhdGlvbigpO1xyXG5cclxuICAgIHRoaXMuZ2VvbG9jYXRpb24kJCA9IHRoaXMuZ2VvbG9jYXRpb24kLnN1YnNjcmliZShnZW9sb2NhdGlvbiA9PiB7XHJcbiAgICAgIGlmICghZ2VvbG9jYXRpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgYWNjdXJhY3kgPSBnZW9sb2NhdGlvbi5nZXRBY2N1cmFjeSgpO1xyXG4gICAgICBpZiAoYWNjdXJhY3kgPCA0MTQwMDAwKSB7XHJcbiAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBnZW9sb2NhdGlvbi5nZXRBY2N1cmFjeUdlb21ldHJ5KCk7XHJcbiAgICAgICAgY29uc3QgZXh0ZW50ID0gZ2VvbWV0cnkuZ2V0RXh0ZW50KCk7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgdGhpcy5nZW9sb2NhdGlvbkZlYXR1cmUgJiZcclxuICAgICAgICAgIHRoaXMub3ZlcmxheS5kYXRhU291cmNlLm9sLmdldEZlYXR1cmVCeUlkKFxyXG4gICAgICAgICAgICB0aGlzLmdlb2xvY2F0aW9uRmVhdHVyZS5nZXRJZCgpXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICB0aGlzLm92ZXJsYXkuZGF0YVNvdXJjZS5vbC5yZW1vdmVGZWF0dXJlKHRoaXMuZ2VvbG9jYXRpb25GZWF0dXJlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZW9sb2NhdGlvbkZlYXR1cmUgPSBuZXcgb2xGZWF0dXJlKHsgZ2VvbWV0cnkgfSk7XHJcbiAgICAgICAgdGhpcy5nZW9sb2NhdGlvbkZlYXR1cmUuc2V0SWQoJ2dlb2xvY2F0aW9uRmVhdHVyZScpO1xyXG4gICAgICAgIHRoaXMub3ZlcmxheS5hZGRPbEZlYXR1cmUodGhpcy5nZW9sb2NhdGlvbkZlYXR1cmUpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vbC5nZXRWaWV3KCkub3B0aW9uc18uYnVmZmVyKSB7XHJcbiAgICAgICAgICBjb25zdCBidWZmZXJSYWRpdXMgPSB0aGlzLm9sLmdldFZpZXcoKS5vcHRpb25zXy5idWZmZXIuYnVmZmVyUmFkaXVzO1xyXG4gICAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBnZW9sb2NhdGlvbi5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgdGhpcy5idWZmZXJHZW9tID0gbmV3IG9sQ2lyY2xlKGNvb3JkaW5hdGVzLCBidWZmZXJSYWRpdXMpO1xyXG4gICAgICAgICAgY29uc3QgYnVmZmVyU3Ryb2tlID0gdGhpcy5vbC5nZXRWaWV3KCkub3B0aW9uc18uYnVmZmVyLmJ1ZmZlclN0cm9rZTtcclxuICAgICAgICAgIGNvbnN0IGJ1ZmZlckZpbGwgPSB0aGlzLm9sLmdldFZpZXcoKS5vcHRpb25zXy5idWZmZXIuYnVmZmVyRmlsbDtcclxuXHJcbiAgICAgICAgICBsZXQgYnVmZmVyVGV4dDtcclxuICAgICAgICAgIGlmICh0aGlzLm9sLmdldFZpZXcoKS5vcHRpb25zXy5idWZmZXIuc2hvd0J1ZmZlclJhZGl1cykge1xyXG4gICAgICAgICAgICBidWZmZXJUZXh0ID0gYnVmZmVyUmFkaXVzLnRvU3RyaW5nKCkgKyAnbSc7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBidWZmZXJUZXh0ID0gJyc7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdGhpcy5idWZmZXJGZWF0dXJlID0gbmV3IG9sRmVhdHVyZSh0aGlzLmJ1ZmZlckdlb20pO1xyXG4gICAgICAgICAgdGhpcy5idWZmZXJGZWF0dXJlLnNldElkKCdidWZmZXJGZWF0dXJlJyk7XHJcbiAgICAgICAgICB0aGlzLmJ1ZmZlckZlYXR1cmUuc2V0KCdidWZmZXJTdHJva2UnLCBidWZmZXJTdHJva2UpO1xyXG4gICAgICAgICAgdGhpcy5idWZmZXJGZWF0dXJlLnNldCgnYnVmZmVyRmlsbCcsIGJ1ZmZlckZpbGwpO1xyXG4gICAgICAgICAgdGhpcy5idWZmZXJGZWF0dXJlLnNldCgnYnVmZmVyVGV4dCcsIGJ1ZmZlclRleHQpO1xyXG4gICAgICAgICAgdGhpcy5idWZmZXIuYWRkT2xGZWF0dXJlKHRoaXMuYnVmZmVyRmVhdHVyZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZmlyc3QpIHtcclxuICAgICAgICAgIHRoaXMudmlld0NvbnRyb2xsZXIuem9vbVRvRXh0ZW50KGV4dGVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKGZpcnN0KSB7XHJcbiAgICAgICAgY29uc3QgdmlldyA9IHRoaXMub2wuZ2V0VmlldygpO1xyXG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gZ2VvbG9jYXRpb24uZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICB2aWV3LnNldENlbnRlcihjb29yZGluYXRlcyk7XHJcbiAgICAgICAgdmlldy5zZXRab29tKDE0KTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHJhY2spIHtcclxuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlR2VvbG9jYXRlKCk7XHJcbiAgICAgIH1cclxuICAgICAgZmlyc3QgPSBmYWxzZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdW5zdWJzY3JpYmVHZW9sb2NhdGUoKSB7XHJcbiAgICB0aGlzLnN0b3BHZW9sb2NhdGlvbigpO1xyXG4gICAgaWYgKHRoaXMuZ2VvbG9jYXRpb24kJCkge1xyXG4gICAgICB0aGlzLmdlb2xvY2F0aW9uJCQudW5zdWJzY3JpYmUoKTtcclxuICAgICAgdGhpcy5nZW9sb2NhdGlvbiQkID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdGFydEdlb2xvY2F0aW9uKCkge1xyXG4gICAgaWYgKCF0aGlzLmdlb2xvY2F0aW9uKSB7XHJcbiAgICAgIHRoaXMuZ2VvbG9jYXRpb24gPSBuZXcgb2xHZW9sb2NhdGlvbih7XHJcbiAgICAgICAgcHJvamVjdGlvbjogdGhpcy5wcm9qZWN0aW9uLFxyXG4gICAgICAgIHRyYWNraW5nOiB0cnVlXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5nZW9sb2NhdGlvbi5vbignY2hhbmdlJywgZXZ0ID0+IHtcclxuICAgICAgICB0aGlzLmdlb2xvY2F0aW9uJC5uZXh0KHRoaXMuZ2VvbG9jYXRpb24pO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZ2VvbG9jYXRpb24uc2V0VHJhY2tpbmcodHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0b3BHZW9sb2NhdGlvbigpIHtcclxuICAgIGlmICh0aGlzLmdlb2xvY2F0aW9uKSB7XHJcbiAgICAgIHRoaXMuZ2VvbG9jYXRpb24uc2V0VHJhY2tpbmcoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=