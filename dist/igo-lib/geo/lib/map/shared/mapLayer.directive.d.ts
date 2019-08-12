import { AfterViewInit } from '@angular/core';
import { IgoMap } from './map';
import { MapBrowserComponent } from '../map-browser/map-browser.component';
import { NetworkService } from '@igo2/core';
export declare class MapLayerDirective implements AfterViewInit {
    private networkService;
    private context$$;
    private state;
    private component;
    readonly map: IgoMap;
    constructor(component: MapBrowserComponent, networkService: NetworkService);
    ngAfterViewInit(): void;
    private changeLayer;
}
