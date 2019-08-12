import { FeatureStore, FeatureWithMeasure } from '@igo2/geo';
import { MapState } from '../map/map.state';
/**
 * Service that holds the state of the measure module
 */
export declare class MeasureState {
    private mapState;
    /**
     * Store that holds the measures
     */
    store: FeatureStore<FeatureWithMeasure>;
    constructor(mapState: MapState);
}
