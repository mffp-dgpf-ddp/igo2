import { OnInit, OnDestroy } from '@angular/core';
import { SearchResult } from '../shared/search.interfaces';
import { IgoMap } from '../../map/shared/map';
import { LayerService } from '../../layer/shared/layer.service';
import { BehaviorSubject } from 'rxjs';
export declare class SearchResultAddButtonComponent implements OnInit, OnDestroy {
    private layerService;
    tooltip$: BehaviorSubject<string>;
    private resolution$$;
    inRange$: BehaviorSubject<boolean>;
    isPreview$: BehaviorSubject<boolean>;
    private layersSubcriptions;
    private lastTimeoutRequest;
    layer: SearchResult;
    /**
     * Whether the layer is already added to the map
     */
    added: boolean;
    /**
     * The map to add the search result layer to
     */
    map: IgoMap;
    color: string;
    private _color;
    constructor(layerService: LayerService);
    /**
     * @internal
     */
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * On mouse event, mouseenter /mouseleave
     * @internal
     */
    onMouseEvent(event: any): void;
    /**
     * On toggle button click, emit the added change event
     * @internal
     */
    onToggleClick(event: any): void;
    private add;
    private remove;
    /**
     * Emit added change event with added = true
     */
    private addLayerToMap;
    /**
     * Emit added change event with added = false
     */
    private removeLayerFromMap;
    isInResolutionsRange(resolution: number): void;
    computeTooltip(): string;
}
