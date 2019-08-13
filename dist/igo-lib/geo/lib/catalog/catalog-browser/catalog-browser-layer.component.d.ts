import { EventEmitter } from '@angular/core';
import { CatalogItemLayer } from '../shared';
/**
 * Catalog browser layer item
 */
export declare class CatalogBrowserLayerComponent {
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
    /**
     * @internal
     */
    readonly title: string;
    /**
     * @internal
     */
    readonly icon: string;
    constructor();
    /**
     * On toggle button click, emit the added change event
     * @internal
     */
    onToggleClick(): void;
    /**
     * Emit added change event with added = true
     */
    private add;
    /**
     * Emit added change event with added = false
     */
    private remove;
}
