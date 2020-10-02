import { OnInit } from '@angular/core';
import { Layer } from '../../layer/shared/layers/layer';
import { IgoMap } from '../../map';
import { OgcFilterableDataSourceOptions } from '../shared/ogc-filter.interface';
export declare class OgcFilterButtonComponent implements OnInit {
    options: OgcFilterableDataSourceOptions;
    readonly badge: any;
    layer: Layer;
    private _layer;
    map: IgoMap;
    color: string;
    header: boolean;
    ogcFilterCollapse: boolean;
    constructor();
    ngOnInit(): void;
}
