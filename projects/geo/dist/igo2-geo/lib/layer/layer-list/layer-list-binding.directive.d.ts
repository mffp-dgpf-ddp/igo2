import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouteService } from '@igo2/core';
import { MapService } from '../../map/shared/map.service';
import { LayerListComponent } from './layer-list.component';
export declare class LayerListBindingDirective implements OnInit, OnDestroy {
    private mapService;
    private route;
    private component;
    private layersOrResolutionChange$$;
    layersVisibility$$: Subscription;
    constructor(component: LayerListComponent, mapService: MapService, route: RouteService);
    ngOnInit(): void;
    private setLayersVisibilityStatus;
    ngOnDestroy(): void;
}
