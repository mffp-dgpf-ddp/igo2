import { AfterViewInit, OnDestroy, ApplicationRef } from '@angular/core';
import { Layer } from '../../layer/shared';
import { LayerService } from '../../layer/shared/layer.service';
import { IgoMap } from '../shared';
export declare class MiniBaseMapComponent implements AfterViewInit, OnDestroy {
    private layerService;
    private appRef;
    map: IgoMap;
    private _map;
    baseLayer: Layer;
    private _baseLayer;
    disabled: boolean;
    private _disabled;
    display: boolean;
    private _display;
    basemap: IgoMap;
    constructor(layerService: LayerService, appRef: ApplicationRef);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    changeBaseLayer(baseLayer: Layer): void;
    private handleMoveEnd;
    private handleBaseLayerChanged;
}
