import { IgoMap } from '@igo2/geo';
import { MapState } from '../../map/map.state';
export declare class ContextShareToolComponent {
    private mapState;
    hasCopyLinkButton: boolean;
    hasShareMapButton: boolean;
    readonly map: IgoMap;
    constructor(mapState: MapState);
}
