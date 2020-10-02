import { OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Layer } from '../shared/layers';
import { NetworkService, ConnectionState } from '@igo2/core';
export declare class LayerLegendItemComponent implements OnInit, OnDestroy {
    private networkService;
    inResolutionRange$: BehaviorSubject<boolean>;
    tooltipText: string;
    state: ConnectionState;
    private resolution$$;
    layer: Layer;
    updateLegendOnResolutionChange: boolean;
    constructor(networkService: NetworkService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    computeTooltip(): string;
    private onResolutionChange;
}
