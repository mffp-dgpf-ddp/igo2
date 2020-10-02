import { EventEmitter, OnInit } from '@angular/core';
import { CatalogItemLayer } from '../shared';
import { BehaviorSubject } from 'rxjs';
import { LayerService } from '../../layer/shared/layer.service';
import { Layer } from '../../layer/shared/layers';
/**
 * Catalog browser layer item
 */
export declare class CatalogBrowserLayerComponent implements OnInit {
    private layerService;
    inRange$: BehaviorSubject<boolean>;
    isPreview$: BehaviorSubject<boolean>;
    private lastTimeoutRequest;
    layerLegendShown$: BehaviorSubject<boolean>;
    igoLayer$: BehaviorSubject<Layer>;
    resolution: number;
    catalogAllowLegend: boolean;
    /**
     * Catalog layer
     */
    layer: CatalogItemLayer;
    /**
     * Whether the layer is already added to the map
     */
    added: boolean;
    /**
     * Event emitted when the add/remove button is clicked
     */
    addedChange: EventEmitter<{
        added: boolean;
        layer: CatalogItemLayer<import("../../metadata").MetadataLayerOptions>;
    }>;
    addedLayerIsPreview: EventEmitter<boolean>;
    /**
     * @internal
     */
    readonly title: string;
    /**
     * @internal
     */
    readonly icon: string;
    constructor(layerService: LayerService);
    ngOnInit(): void;
    /**
     * On mouse event, mouseenter /mouseleave
     * @internal
     */
    onMouseEvent(event: any): void;
    askForLegend(event: any): void;
    /**
     * On toggle button click, emit the added change event
     * @internal
     */
    onToggleClick(event: any): void;
    /**
     * Emit added change event with added = true
     */
    private add;
    /**
     * Emit added change event with added = false
     */
    private remove;
    haveGroup(): boolean;
    isInResolutionsRange(): boolean;
    computeTooltip(): string;
}
