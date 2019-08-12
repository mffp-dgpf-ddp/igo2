import { AfterViewInit, OnDestroy } from '@angular/core';
import { MediaService } from '@igo2/core';
import { Layer } from '../../layer';
import { IgoMap } from '../shared';
export declare class BaseLayersSwitcherComponent implements AfterViewInit, OnDestroy {
    private mediaService;
    map: IgoMap;
    private _map;
    useStaticIcon: boolean;
    private _useStaticIcon;
    _baseLayers: Layer[];
    expand: boolean;
    showButton: boolean;
    private layers$$;
    constructor(mediaService: MediaService);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    collapseOrExpand(): void;
    readonly baseLayers: Layer[];
}
