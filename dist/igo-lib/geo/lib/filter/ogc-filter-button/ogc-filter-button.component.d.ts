import { Layer } from '../../layer/shared/layers/layer';
import { IgoMap } from '../../map';
import { OgcFilterableDataSourceOptions } from '../shared/ogc-filter.interface';
export declare class OgcFilterButtonComponent {
    layer: Layer;
    map: IgoMap;
    color: string;
    ogcFiltersInLayers: boolean;
    readonly options: OgcFilterableDataSourceOptions;
    ogcFilterCollapse: boolean;
    constructor();
    toggleOgcFilter(): void;
}
