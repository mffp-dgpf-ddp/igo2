import { OnInit, EventEmitter } from '@angular/core';
import { SpatialFilterQueryType, SpatialFilterType } from '../../shared/spatial-filter.enum';
import { FormControl } from '@angular/forms';
import { EntityStore } from '@igo2/common';
import { Feature } from '../../../feature';
/**
 * Spatial Filter Type
 */
export declare class SpatialFilterTypeComponent implements OnInit {
    store: EntityStore<Feature>;
    private _store;
    queryType: string[];
    selectedTypeIndex: FormControl;
    /**
     * Reference to the SpatialFIlterType enum
     * @internal
     */
    spatialType: typeof SpatialFilterType;
    activeDrawType: SpatialFilterType;
    selectedQueryType: SpatialFilterQueryType;
    zone: Feature;
    type: SpatialFilterType;
    eventType: EventEmitter<SpatialFilterType>;
    eventQueryType: EventEmitter<SpatialFilterQueryType>;
    zoneChange: EventEmitter<Feature<{
        [key: string]: any;
    }>>;
    constructor();
    ngOnInit(): void;
    onTypeChange(event: any): void;
    onQueryTypeChange(event: any): void;
    onZoneChange(feature: any): void;
    onDrawTypeChange(spatialType: SpatialFilterType): void;
}
