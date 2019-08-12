import { OnInit, OnDestroy } from '@angular/core';
import { MapService } from '../../map/shared/map.service';
import { TimeFilterListComponent } from './time-filter-list.component';
export declare class TimeFilterListBindingDirective implements OnInit, OnDestroy {
    private mapService;
    private component;
    private layers$$;
    constructor(component: TimeFilterListComponent, mapService: MapService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
