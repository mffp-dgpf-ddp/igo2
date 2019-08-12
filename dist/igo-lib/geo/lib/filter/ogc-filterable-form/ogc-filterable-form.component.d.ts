import { OgcFilterableDataSource } from '../shared/ogc-filter.interface';
import { IgoMap } from '../../map';
export declare class OgcFilterableFormComponent {
    datasource: OgcFilterableDataSource;
    map: IgoMap;
    refreshFilters: Function;
    readonly refreshFunc: Function;
    showFeatureOnMap: boolean;
    private _showFeatureOnMap;
    private _map;
    private _dataSource;
    color: string;
    constructor();
}
