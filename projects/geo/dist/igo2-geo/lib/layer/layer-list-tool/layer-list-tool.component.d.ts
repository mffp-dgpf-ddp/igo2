import { OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { FloatLabelType } from '@angular/material';
import { BehaviorSubject, Subscription } from 'rxjs';
import { LayerListControlsOptions } from './layer-list-tool.interface';
export declare class LayerListToolComponent implements OnInit, OnDestroy {
    onlyVisible$: BehaviorSubject<boolean>;
    sortAlpha$: BehaviorSubject<boolean>;
    term$: BehaviorSubject<string>;
    onlyVisible$$: Subscription;
    sortAlpha$$: Subscription;
    term$$: Subscription;
    layersAreAllVisible: boolean;
    floatLabel: FloatLabelType;
    onlyVisible: boolean;
    sortAlpha: boolean;
    term: string;
    selectionMode: boolean;
    appliedFilterAndSort: EventEmitter<LayerListControlsOptions>;
    selection: EventEmitter<boolean>;
    ngOnInit(): void;
    ngOnDestroy(): void;
    clearTerm(): void;
    toggleSortAlpha(): void;
    toggleOnlyVisible(): void;
    toggleSelectionMode(): void;
}
