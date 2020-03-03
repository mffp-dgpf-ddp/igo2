import { OnInit } from '@angular/core';
import { Layer } from '../../layer/shared/layers/layer';
import { IgoMap } from '../../map';
import { OgcFilterableDataSourceOptions } from '../shared/ogc-filter.interface';
export declare class OgcFilterButtonComponent implements OnInit {
    options: OgcFilterableDataSourceOptions;
    layer: Layer;
    map: IgoMap;
    color: string;
    header: boolean;
    ogcFilterCollapse: boolean;
    constructor();
    ngOnInit(): void;
    toggleOgcFilter(): void;
}
