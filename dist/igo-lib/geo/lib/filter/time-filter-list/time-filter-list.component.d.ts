import { ChangeDetectorRef } from '@angular/core';
import { Layer } from '../../layer/shared/layers/layer';
export declare class TimeFilterListComponent {
    private cdRef;
    layers: Layer[];
    private _layers;
    constructor(cdRef: ChangeDetectorRef);
}
