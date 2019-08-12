import olMap from 'ol/Map';
import olFeature from 'ol/Feature';
import OlProjection from 'ol/proj/Projection';
import olCircle from 'ol/geom/Circle';
import * as olstyle from 'ol/style';
import { BehaviorSubject, Subject } from 'rxjs';
import { SubjectStatus } from '@igo2/utils';
import { Layer } from '../../layer/shared/layers';
import { Overlay } from '../../overlay/shared/overlay';
import { MapViewOptions, MapOptions, MapExtent } from './map.interface';
import { MapViewController } from './controllers/view';
import { FeatureDataSource } from '../../datasource/shared/datasources/feature-datasource';
export declare class IgoMap {
    ol: olMap;
    layers$: BehaviorSubject<Layer[]>;
    status$: Subject<SubjectStatus>;
    geolocation$: BehaviorSubject<any>;
    geolocationFeature: olFeature;
    bufferGeom: olCircle;
    bufferFeature: olFeature;
    buffer: Overlay;
    overlay: Overlay;
    viewController: MapViewController;
    bufferStyle: olstyle.Style;
    bufferDataSource: FeatureDataSource;
    private layerWatcher;
    private geolocation;
    private geolocation$$;
    private options;
    private defaultOptions;
    readonly layers: Layer[];
    readonly projection: string;
    constructor(options?: MapOptions);
    init(): void;
    setTarget(id: string): void;
    updateView(options: MapViewOptions): void;
    /**
     * Set the map view
     * @param options Map view options
     */
    setView(options: MapViewOptions): void;
    getCenter(projection?: string | OlProjection): [number, number];
    getExtent(projection?: string | OlProjection): MapExtent;
    getZoom(): number;
    changeBaseLayer(baseLayer: Layer): void;
    getBaseLayers(): Layer[];
    getLayerById(id: string): Layer;
    getLayerByAlias(alias: string): Layer;
    /**
     * Add a single layer
     * @param layer Layer to add
     * @param push DEPRECATED
     */
    addLayer(layer: Layer, push?: boolean): void;
    /**
     * Add many layers
     * @param layers Layers to add
     * @param push DEPRECATED
     */
    addLayers(layers: Layer[], push?: boolean): void;
    addBuffer(feature: olFeature): void;
    /**
     * Remove a single layer
     * @param layer Layer to remove
     */
    removeLayer(layer: Layer): void;
    /**
     * Remove many layers
     * @param layers Layers to remove
     */
    removeLayers(layers: Layer[]): void;
    /**
     * Remove all layers
     */
    removeAllLayers(): void;
    raiseLayer(layer: Layer): void;
    lowerLayer(layer: Layer): void;
    moveLayer(layer: Layer, from: number, to: number): void;
    /**
     * Add a layer to the OL map and start watching. If the layer is already
     * added to this map, make it visible but don't add it one again.
     * @param layer Layer
     * @returns The layer added, if any
     */
    private doAddLayer;
    /**
     * Remove a layer from the OL map and stop watching
     * @param layer Layer
     */
    private doRemoveLayer;
    /**
     * Update the layers observable
     * @param layers Layers
     */
    private setLayers;
    /**
     * Sort layers by descending zIndex
     * @param layers Array of layers
     * @returns The original array, sorted by zIndex
     */
    private sortLayersByZIndex;
    /**
     * Get layer index in the map's inenr array of layers
     * @param layer Layer
     * @returns The layer index
     */
    private getLayerIndex;
    geolocate(track?: boolean): void;
    unsubscribeGeolocate(): void;
    private startGeolocation;
    private stopGeolocation;
}
