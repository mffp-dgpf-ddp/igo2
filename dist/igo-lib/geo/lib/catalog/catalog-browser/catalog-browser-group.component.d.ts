import { EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EntityStateManager, EntityStore } from '@igo2/common';
import { Catalog, CatalogItem, CatalogItemGroup, CatalogItemLayer, CatalogItemState } from '../shared';
/**
 * Catalog browser group item
 */
export declare class CatalogBrowserGroupComponent implements OnInit, OnDestroy {
    /**
     * Group's items store
     * @internal
     */
    store: EntityStore<CatalogItem, CatalogItemState>;
    /**
     * Whether all the layers of the group are added
     * @internal
     */
    added$: BehaviorSubject<boolean>;
    /**
     * Catalog
     */
    catalog: Catalog;
    /**
     * Catalog group
     */
    group: CatalogItemGroup;
    /**
     * Parent catalog's items store state. Groups share a unique
     * EntityState that tracks the group and it's layers state (whether they are added or not).
     * Sharing a unique state would also allow us to expand this component to allow
     * the selection of a layer while unselecting any layer already selected in another group.
     * This could be useful to display some layer info before adding it, for example.
     */
    state: EntityStateManager<CatalogItem, CatalogItemState>;
    /**
     * Event emitted when the add/remove button of the group is clicked
     */
    addedChange: EventEmitter<{
        added: boolean;
        group: CatalogItemGroup;
    }>;
    /**
     * Event emitted when the add/remove button of a layer is clicked
     */
    layerAddedChange: EventEmitter<{
        added: boolean;
        layer: CatalogItemLayer<import("../../layer").LayerOptions>;
    }>;
    /**
     * @internal
     */
    readonly title: string;
    /**
     * @internal
     */
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * @internal
     */
    isGroup(item: CatalogItem): boolean;
    /**
     * @internal
     */
    isLayer(item: CatalogItem): boolean;
    /**
     * On toggle button click, emit the added change event
     * @internal
     */
    onToggleClick(): void;
    /**
     * When a layer is added or removed, evaluate if all the layers of the group
     * are now added or removed. If so, consider that the group itself is added
     * or removed.
     * @internal
     * @param event Layer added change event
     */
    onLayerAddedChange(event: {
        added: boolean;
        layer: CatalogItemLayer;
    }): void;
    /**
     * Emit added change event with added = true
     */
    private add;
    /**
     * Emit added change event with added = true
     */
    private remove;
    /**
     * If all the layers of the group added or removed, add or remove the group itself.
     * @param event The last layer added change event to occur
     */
    private tryToggleGroup;
    private evaluateAdded;
}
