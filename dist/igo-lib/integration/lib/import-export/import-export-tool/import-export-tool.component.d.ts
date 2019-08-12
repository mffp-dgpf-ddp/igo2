import { IgoMap } from '@igo2/geo';
import { MapState } from '../../map/map.state';
export declare class ImportExportToolComponent {
    private mapState;
    /**
     * Map to measure on
     * @internal
     */
    readonly map: IgoMap;
    constructor(mapState: MapState);
}
