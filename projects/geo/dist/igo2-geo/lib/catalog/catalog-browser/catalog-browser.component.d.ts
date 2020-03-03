import { ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EntityStore } from '@igo2/common';
import { LayerService } from '../../layer/shared/layer.service';
import { IgoMap } from '../../map';
import { Catalog, CatalogItem, CatalogItemLayer, CatalogItemGroup, CatalogItemState } from '../shared';
/**
 * Component to browse a catalog's groups and layers and display them on a map.
 */
export declare class CatalogBrowserComponent implements OnInit, OnDestroy {
    private layerService;
    private cdRef;
    /**
     * Catalog items store watcher
     */
    private watcher;
    readonly resolution$: BehaviorSubject<number>;
    catalogAllowLegend: boolean;
    /**
     * Catalog
     */
    catalog: Catalog;
    /**
     * Store holding the catalog's items
     */
    store: EntityStore<CatalogItem, CatalogItemState>;
    /**
     * Map to add the catalog items to
     */
    map: IgoMap;
    /**
     * Whether a group can be toggled when it's collapsed
     */
    toggleCollapsedGroup: boolean;
    constructor(layerService: LayerService, cdRef: ChangeDetectorRef);
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
     * When a layer is added or removed, add or remove it from the map
     * @internal
     * @param event Layer added event
     */
    onLayerAddedChange(event: {
        added: boolean;
        layer: CatalogItemLayer;
    }): void;
    /**
     * When a froup is added or removed, add or remove it from the map
     * @internal
     * @param event Group added event
     */
    onGroupAddedChange(event: {
        added: boolean;
        group: CatalogItemGroup;
    }): void;
    /**
     * Add layer to map
     * @param layer Catalog layer
     */
    private addLayerToMap;
    /**
     * Remove layer from map
     * @param layer Catalog layer
     */
    private removeLayerFromMap;
    /**
     * Add multiple layers to map
     * @param layers Catalog layers
     */
    private addLayersToMap;
    /**
     * Remove multiple layers from map
     * @param layers Catalog layers
     */
    private removeLayersFromMap;
    /**
     * Sort the layers by title. asc or desc.
     * @internal
     */
    private sortCatalogItemsByTitle;
    /**
     * Add all the layers of a group to map
     * @param group Catalog group
     */
    private addGroupToMap;
    /**
     * Remove all the layers of a group from map
     * @param group Catalog group
     */
    private removeGroupFromMap;
}
