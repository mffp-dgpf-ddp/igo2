import { OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Layer } from '../shared/layers';
export declare class LayerItemComponent implements OnInit, OnDestroy {
    private cdRef;
    showLegend$: BehaviorSubject<boolean>;
    inResolutionRange$: BehaviorSubject<boolean>;
    queryBadgeHidden$: BehaviorSubject<boolean>;
    tooltipText: string;
    private resolution$$;
    layer: Layer;
    toggleLegendOnVisibilityChange: boolean;
    expandLegendIfVisible: boolean;
    updateLegendOnResolutionChange: boolean;
    orderable: boolean;
    queryBadge: boolean;
    readonly removable: boolean;
    opacity: number;
    constructor(cdRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    toggleLegend(collapsed: boolean): void;
    toggleVisibility(): void;
    computeTooltip(): string;
    private onResolutionChange;
    private updateQueryBadge;
}
