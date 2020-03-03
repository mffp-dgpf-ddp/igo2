import { OnInit, OnDestroy } from '@angular/core';
import { IgoMap } from '../../map/shared/map';
import { MapBrowserComponent } from '../../map/map-browser/map-browser.component';
import { OverlayService } from '../shared/overlay.service';
export declare class OverlayDirective implements OnInit, OnDestroy {
    private component;
    private overlayService;
    private features$$;
    private format;
    readonly map: IgoMap;
    constructor(component: MapBrowserComponent, overlayService: OverlayService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private handleFeatures;
}
