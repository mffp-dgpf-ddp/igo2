import { OnInit, OnDestroy, EventEmitter, Renderer2, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Layer } from '../shared/layers';
import { NetworkService, ConnectionState } from '@igo2/core';
export declare class LayerItemComponent implements OnInit, OnDestroy {
    private networkService;
    private renderer;
    private elRef;
    focusedCls: string;
    activeLayer: any;
    private _activeLayer;
    layerTool$: BehaviorSubject<boolean>;
    showLegend$: BehaviorSubject<boolean>;
    inResolutionRange$: BehaviorSubject<boolean>;
    queryBadgeHidden$: BehaviorSubject<boolean>;
    tooltipText: string;
    state: ConnectionState;
    selectAll: boolean;
    private _selectAll;
    layerCheck: any;
    private resolution$$;
    layers$: BehaviorSubject<Layer>;
    layer: any;
    private _layer;
    toggleLegendOnVisibilityChange: boolean;
    expandLegendIfVisible: boolean;
    updateLegendOnResolutionChange: boolean;
    orderable: boolean;
    lowerDisabled: boolean;
    raiseDisabled: boolean;
    queryBadge: boolean;
    selectionMode: any;
    readonly removable: boolean;
    opacity: number;
    action: EventEmitter<Layer>;
    checkbox: EventEmitter<{
        layer: Layer;
        check: boolean;
    }>;
    constructor(networkService: NetworkService, renderer: Renderer2, elRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    toggleLegend(collapsed: boolean): void;
    toggleLegendOnClick(): void;
    toggleVisibility(): void;
    computeTooltip(): string;
    private onResolutionChange;
    private updateQueryBadge;
    toggleLayerTool(): void;
    check(): void;
}
