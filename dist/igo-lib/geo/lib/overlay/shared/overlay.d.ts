import OlFeature from 'ol/Feature';
import { Feature, FeatureMotion } from '../../feature';
import { FeatureDataSource } from '../../datasource';
import { IgoMap } from '../../map';
/**
 * This class is simply a shortcut for adding features to a map.
 * It does nothing more than a standard layer but it's shipped with
 * a defautl style based on the geometry type of the features it contains.
 * @todo Enhance that by using a FeatureStore and strategies.
 */
export declare class Overlay {
    /**
     * The map to add the layer to
     */
    private map;
    /**
     * Overlay layer
     */
    private layer;
    /**
     * Overlay layer's data source
     */
    readonly dataSource: FeatureDataSource;
    constructor(map?: IgoMap);
    /**
     * Bind this to a map and add the overlay layer to that map
     * @param map Map
     */
    setMap(map: IgoMap): void;
    /**
     * Set the overlay features and, optionally, move to them
     * @param features Features
     * @param motion Optional: Apply this motion to the map view
     */
    setFeatures(features: Feature[], motion?: FeatureMotion): void;
    /**
     * Add a feature to the  overlay and, optionally, move to it
     * @param feature Feature
     * @param motion Optional: Apply this motion to the map view
     */
    addFeature(feature: Feature, motion?: FeatureMotion): void;
    /**
     * Add features to the  overlay and, optionally, move to them
     * @param features Features
     * @param motion Optional: Apply this motion to the map view
     */
    addFeatures(features: Feature[], motion?: FeatureMotion): void;
    /**
     * Add a OpenLayers feature to the  overlay and, optionally, move to it
     * @param olFeature OpenLayers Feature
     * @param motion Optional: Apply this motion to the map view
     */
    addOlFeature(olFeature: OlFeature, motion?: FeatureMotion): void;
    /**
     * Add OpenLayers features to the overlay and, optionally, move to them
     * @param olFeatures OpenLayers Features
     * @param motion Optional: Apply this motion to the map view
     */
    addOlFeatures(olFeatures: OlFeature[], motion?: FeatureMotion): void;
    /**
     * Clear the overlay
     */
    clear(): void;
}
