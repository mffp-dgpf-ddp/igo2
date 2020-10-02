import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MapService } from '../../map/shared/map.service';
import { LayerLegendListComponent } from './layer-legend-list.component';
export declare class LayerLegendListBindingDirective implements OnInit, OnDestroy {
    private mapService;
    private component;
    private layersOrResolutionChange$$;
    layersVisibility$$: Subscription;
    constructor(component: LayerLegendListComponent, mapService: MapService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
