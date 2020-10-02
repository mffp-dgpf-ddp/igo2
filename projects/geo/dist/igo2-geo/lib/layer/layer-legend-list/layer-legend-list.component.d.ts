import { OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Layer } from '../shared';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
export declare class LayerLegendListComponent implements OnInit, OnDestroy {
    orderable: boolean;
    hasVisibleOrInRangeLayers$: BehaviorSubject<boolean>;
    hasVisibleAndNotInRangeLayers$: BehaviorSubject<boolean>;
    layersInUi$: BehaviorSubject<Layer[]>;
    layers$: BehaviorSubject<Layer[]>;
    showAllLegend: boolean;
    change$: ReplaySubject<void>;
    private change$$;
    layers: Layer[];
    private _layers;
    excludeBaseLayers: boolean;
    updateLegendOnResolutionChange: boolean;
    allowShowAllLegends: boolean;
    showAllLegendsValue: boolean;
    allLegendsShown: EventEmitter<boolean>;
    constructor();
    ngOnInit(): void;
    ngOnDestroy(): void;
    private next;
    private computeShownLayers;
    private sortLayersByZindex;
    toggleShowAllLegends(toggle: boolean): void;
}
