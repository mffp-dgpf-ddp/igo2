import OlFeature from 'ol/Feature';
import { EntityKey, EntityStore } from '@igo2/common';
import { FeatureDataSource } from '../../datasource';
import { VectorLayer } from '../../layer';
import { IgoMap } from '../../map';
import { FeatureMotion } from './feature.enums';
import { Feature, FeatureStoreOptions } from './feature.interfaces';
import { FeatureStoreStrategy } from './strategies/strategy';
/**
 * The class is a specialized version of an EntityStore that stores
 * features and the map layer to display them on. Synchronization
 * between the store and the layer is handled by strategies.
 */
export declare class FeatureStore<T extends Feature = Feature> extends EntityStore<T> {
    /**
     * Feature store strategies responsible of synchronizing the store
     * and the layer
     */
    strategies: FeatureStoreStrategy[];
    /**
     * Vector layer to display the features on
     */
    layer: VectorLayer;
    /**
     * The map the layer is bound to
     */
    readonly map: IgoMap;
    /**
     * The layer's data source
     */
    readonly source: FeatureDataSource;
    constructor(entities: T[], options: FeatureStoreOptions);
    /**
     * Bind this store to a vector layer
     * @param layer Vector layer
     * @returns Feature store
     */
    bindLayer(layer: VectorLayer): FeatureStore;
    /**
     * Add a strategy to this store
     * @param strategy Feature store strategy
     * @returns Feature store
     */
    addStrategy(strategy: FeatureStoreStrategy, activate?: boolean): FeatureStore;
    /**
     * Remove a strategy from this store
     * @param strategy Feature store strategy
     * @returns Feature store
     */
    removeStrategy(strategy: FeatureStoreStrategy): FeatureStore;
    /**
     * Return strategies of a given type
     * @param type Feature store strategy class
     * @returns Strategies
     */
    getStrategyOfType(type: typeof FeatureStoreStrategy): FeatureStoreStrategy;
    /**
     * Activate strategies of a given type
     * @param type Feature store strategy class
     */
    activateStrategyOfType(type: typeof FeatureStoreStrategy): void;
    /**
     * Deactivate strategies of a given type
     * @param type Feature store strategy class
     */
    deactivateStrategyOfType(type: typeof FeatureStoreStrategy): void;
    /**
     * Set the layer's features and perform a motion to make them visible. Strategies
     * make extensive use of that method.
     * @param features Features
     * @param motion Optional: The type of motion to perform
     */
    setLayerFeatures(features: Feature[], motion?: FeatureMotion, viewScale?: [number, number, number, number], areaRatio?: number, getId?: (Feature: any) => EntityKey): void;
    /**
     * Set the store's features from an array of OL features.
     * @param olFeatures Ol features
     */
    setStoreOlFeatures(olFeatures: OlFeature[]): void;
    /**
     * Remove all features from the layer
     */
    clearLayer(): void;
    /**
     * Check wether a layer is bound or not and throw an error if not.
     */
    private checkLayer;
    /**
     * Set the layer's features and perform a motion to make them visible.
     * @param features Openlayers feature objects
     * @param motion Optional: The type of motion to perform
     */
    private setLayerOlFeatures;
    /**
     * Add features to the the layer
     * @param features Openlayers feature objects
     */
    private addOlFeaturesToLayer;
    /**
     * Remove features from the the layer
     * @param features Openlayers feature objects
     */
    private removeOlFeaturesFromLayer;
}
