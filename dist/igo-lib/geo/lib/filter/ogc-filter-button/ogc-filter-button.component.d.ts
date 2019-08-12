import { Layer } from '../../layer/shared/layers/layer';
import { IgoMap } from '../../map';
import { OgcFilterableDataSourceOptions } from '../shared/ogc-filter.interface';
export declare class OgcFilterButtonComponent {
    layer: Layer;
    private _layer;
    map: IgoMap;
    private _map;
    color: string;
    private _color;
    ogcFilterCollapse: boolean;
    ogcFiltersInLayers: boolean;
    private _ogcFiltersInLayers;
    constructor();
    toggleOgcFilter(): void;
    readonly options: OgcFilterableDataSourceOptions;
}
