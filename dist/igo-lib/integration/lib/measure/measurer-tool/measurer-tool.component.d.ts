import { FeatureStore, FeatureWithMeasure, IgoMap } from '@igo2/geo';
import { MapState } from '../../map/map.state';
import { MeasureState } from '../measure.state';
/**
 * Tool to measure lengths and areas
 */
export declare class MeasurerToolComponent {
    private measureState;
    private mapState;
    /**
     * Map to measure on
     * @internal
     */
    readonly store: FeatureStore<FeatureWithMeasure>;
    /**
     * Map to measure on
     * @internal
     */
    readonly map: IgoMap;
    constructor(measureState: MeasureState, mapState: MapState);
}
