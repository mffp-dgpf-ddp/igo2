import { OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Layer } from '../shared/layers';
export declare class LayerItemComponent implements OnInit, OnDestroy {
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
    lowerDisabled: boolean;
    raiseDisabled: boolean;
    queryBadge: boolean;
    readonly removable: boolean;
    opacity: number;
    constructor();
    ngOnInit(): void;
    ngOnDestroy(): void;
    toggleLegend(collapsed: boolean): void;
    toggleVisibility(): void;
    computeTooltip(): string;
    private onResolutionChange;
    private updateQueryBadge;
}
