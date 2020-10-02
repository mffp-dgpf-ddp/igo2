import { EntityStore } from '@igo2/common';
import { SpatialFilterService } from './../../shared/spatial-filter.service';
import { SpatialFilterQueryType } from './../../shared/spatial-filter.enum';
import { OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Feature } from '../../../feature';
export declare class SpatialFilterListComponent implements OnInit, OnDestroy {
    private spatialFilterService;
    store: EntityStore<Feature>;
    private _store;
    queryType: SpatialFilterQueryType;
    private _queryType;
    selectedZone: Feature;
    formControl: FormControl;
    zoneChange: EventEmitter<Feature<{
        [key: string]: any;
    }>>;
    formValueChanges$$: Subscription;
    ngOnInit(): void;
    ngOnDestroy(): void;
    displayFn(feature?: Feature): string | undefined;
    constructor(spatialFilterService: SpatialFilterService);
    onZoneChange(feature: any): void;
}
