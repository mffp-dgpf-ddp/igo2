import { ChangeDetectorRef } from '@angular/core';
import { Layer } from '../../layer/shared/layers/layer';
import { IgoMap } from '../../map';
export declare class OgcFilterableListComponent {
    private cdRef;
    layers: Layer[];
    map: IgoMap;
    private _map;
    private _layers;
    constructor(cdRef: ChangeDetectorRef);
}
