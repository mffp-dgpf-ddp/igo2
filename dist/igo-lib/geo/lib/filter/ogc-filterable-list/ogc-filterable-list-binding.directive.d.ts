import { OnInit, OnDestroy } from '@angular/core';
import { MapService } from '../../map/shared/map.service';
import { OgcFilterableListComponent } from './ogc-filterable-list.component';
export declare class OgcFilterableListBindingDirective implements OnInit, OnDestroy {
    private mapService;
    private component;
    private layers$$;
    constructor(component: OgcFilterableListComponent, mapService: MapService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
