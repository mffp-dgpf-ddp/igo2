import { TemplateRef, OnInit, OnDestroy, EventEmitter, ElementRef } from '@angular/core';
import { FloatLabelType } from '@angular/material';
import { Layer } from '../shared';
import { BehaviorSubject, ReplaySubject, Subscription } from 'rxjs';
import { LayerListControlsOptions } from '../layer-list-tool/layer-list-tool.interface';
import { IgoMap } from '../../map/shared/map';
export declare class LayerListComponent implements OnInit, OnDestroy {
    private elRef;
    orderable: boolean;
    thresholdToFilterAndSort: number;
    layers$: BehaviorSubject<Layer[]>;
    change$: ReplaySubject<void>;
    showToolbar$: BehaviorSubject<boolean>;
    layerTool: boolean;
    activeLayer$: BehaviorSubject<Layer>;
    layersChecked: Layer[];
    selection: any;
    private change$$;
    templateLayerToolbar: TemplateRef<any>;
    layersAreAllVisible: boolean;
    ogcButton: boolean;
    timeButton: boolean;
    map: IgoMap;
    private _map;
    layers: Layer[];
    private _layers;
    activeLayer: Layer;
    private _activeLayer;
    floatLabel: FloatLabelType;
    layerFilterAndSortOptions: LayerListControlsOptions;
    excludeBaseLayers: boolean;
    toggleLegendOnVisibilityChange: boolean;
    expandLegendOfVisibleLayers: boolean;
    updateLegendOnResolutionChange: boolean;
    queryBadge: boolean;
    appliedFilterAndSort: EventEmitter<LayerListControlsOptions>;
    keyword: string;
    private _keyword;
    onlyVisible: boolean;
    private _onlyVisible;
    sortAlpha: boolean;
    private _sortedAlpha;
    opacity: number;
    readonly badgeOpacity: number;
    readonly raiseDisabled: boolean;
    readonly lowerDisabled: boolean;
    readonly raiseDisabledSelection: boolean;
    readonly lowerDisabledSelection: boolean;
    checkOpacity: number;
    toggleOpacity: boolean;
    selectAllCheck$: BehaviorSubject<boolean>;
    selectAllCheck$$: Subscription;
    selectAllCheck: any;
    constructor(elRef: ElementRef);
    /**
     * Subscribe to the search term stream and trigger researches
     * @internal
     */
    ngOnInit(): void;
    ngOnDestroy(): void;
    clearKeyword(): void;
    getLowerLayer(): {
        zIndex: any;
        id: any;
    };
    isLowerBaselayer(layer: any): boolean;
    getUpperLayer(): {
        zIndex: any;
        id: any;
    };
    isUpperBaselayer(layer: any): boolean;
    raisableLayers(layers: Layer[]): boolean;
    raisableLayer(index: number): any;
    raiseLayers(layers: Layer[]): void;
    lowerableLayers(layers: Layer[]): boolean;
    lowerableLayer(index: number): any;
    lowerLayers(layers: Layer[]): void;
    private next;
    private computeLayers;
    onKeywordChange(term: any): void;
    onAppliedFilterAndSortChange(appliedFilter: LayerListControlsOptions): void;
    private filterLayers;
    private sortLayersByZindex;
    private sortLayersByTitle;
    private normalize;
    private computeShowToolbar;
    toggleLayerTool(layer: any): void;
    removeLayers(layers?: Layer[]): void;
    layersCheck(event: {
        layer: Layer;
        check: boolean;
    }): void;
    toggleSelectionMode(value: boolean): void;
    layersCheckedOpacity(): any;
    selectAll(): void;
    isScrolledIntoView(elemSource: any, elem: any): boolean;
    computeElementRef(type?: string): any[];
}
