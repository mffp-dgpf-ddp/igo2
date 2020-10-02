import { OgcFilterableDataSource } from '../shared/ogc-filter.interface';
import { IgoMap } from '../../map';
export declare class OgcFilterableFormComponent {
    datasource: OgcFilterableDataSource;
    map: IgoMap;
    refreshFilters: () => void;
    readonly refreshFunc: () => void;
    readonly advancedOgcFilters: boolean;
    color: string;
    constructor();
}
