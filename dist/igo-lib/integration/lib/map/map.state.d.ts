import { IgoMap, MapService, ProjectionService } from '@igo2/geo';
/**
 * Service that holds the state of the map module
 */
export declare class MapState {
    private mapService;
    private projectionService;
    /**
     * Active map
     */
    readonly map: IgoMap;
    private _map;
    constructor(mapService: MapService, projectionService: ProjectionService);
}
