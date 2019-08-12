import { ChangeDetectorRef, TemplateRef, OnInit, OnDestroy } from '@angular/core';
import { FloatLabelType } from '@angular/material';
import { Layer } from '../shared';
import { LayerListService } from './layer-list.service';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
export declare class LayerListComponent implements OnInit, OnDestroy {
    private cdRef;
    private layerListService;
    hasLayerNotVisible: boolean;
    hasLayerOutOfRange: boolean;
    orderable: boolean;
    thresholdToFilterAndSort: number;
    layers$: BehaviorSubject<Layer[]>;
    change$: ReplaySubject<void>;
    showToolbar$: BehaviorSubject<boolean>;
    private change$$;
    templateLayerToolbar: TemplateRef<any>;
    layers: Layer[];
    private _layers;
    placeholder: string;
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
    constructor(cdRef: ChangeDetectorRef, layerListService: LayerListService);
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
    private next;
    private computeLayers;
    private filterLayers;
    private sortLayersByZindex;
    private sortLayersByTitle;
    private computeOrderable;
    private computeShowToolbar;
    private initLayerFilterAndSortOptions;
    private setLayers;
}
