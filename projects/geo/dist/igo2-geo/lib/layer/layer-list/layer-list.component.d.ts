import { TemplateRef, OnInit, OnDestroy } from '@angular/core';
import { FloatLabelType } from '@angular/material';
import { Layer } from '../shared';
import { LayerListService } from './layer-list.service';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
export declare class LayerListComponent implements OnInit, OnDestroy {
    private layerListService;
    orderable: boolean;
    thresholdToFilterAndSort: number;
    layers$: BehaviorSubject<Layer[]>;
    change$: ReplaySubject<void>;
    showToolbar$: BehaviorSubject<boolean>;
    private change$$;
    templateLayerToolbar: TemplateRef<any>;
    layersAreAllVisible: boolean;
    layersAreAllInRange: boolean;
    layers: Layer[];
    private _layers;
    floatLabel: FloatLabelType;
    layerFilterAndSortOptions: any;
    excludeBaseLayers: boolean;
    toggleLegendOnVisibilityChange: boolean;
    expandLegendOfVisibleLayers: boolean;
    updateLegendOnResolutionChange: boolean;
    queryBadge: boolean;
    keyword: string;
    keywordInitialized: boolean;
    onlyVisible: boolean;
    onlyVisibleInitialized: boolean;
    onlyInRange: boolean;
    onlyInRangeInitialized: boolean;
    sortedAlpha: boolean;
    sortedAlphaInitialized: boolean;
    constructor(layerListService: LayerListService);
    /**
     * Subscribe to the search term stream and trigger researches
     * @internal
     */
    ngOnInit(): void;
    ngOnDestroy(): void;
    toggleOnlyVisible(): void;
    toggleOnlyInRange(): void;
    toggleSort(sortAlpha: boolean): void;
    clearKeyword(): void;
    getLowerLayer(): {
        zIndex: any;
        id: any;
    };
    getUpperLayer(): {
        zIndex: any;
        id: any;
    };
    private next;
    private computeLayers;
    private filterLayers;
    private sortLayersByZindex;
    private sortLayersByTitle;
    private computeShowToolbar;
    private initLayerFilterAndSortOptions;
}
