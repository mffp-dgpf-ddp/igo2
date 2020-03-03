import { OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouteService } from '@igo2/core';
import { MapService } from '../../map/shared/map.service';
import { LayerListComponent } from './layer-list.component';
import { LayerListService } from './layer-list.service';
export declare class LayerListBindingDirective implements OnInit, AfterViewInit, OnDestroy {
    private mapService;
    private layerListService;
    private route;
    private component;
    private layersOrResolutionChange$$;
    layersVisibility$$: Subscription;
    layersRange$$: Subscription;
    constructor(component: LayerListComponent, mapService: MapService, layerListService: LayerListService, route: RouteService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    private setLayersVisibilityRangeStatus;
    private initRoutes;
    ngOnDestroy(): void;
}
