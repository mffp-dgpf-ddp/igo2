import { OnInit } from '@angular/core';
import { EntityStore } from '@igo2/common';
import { Catalog, CatalogService } from '@igo2/geo';
import { ToolState } from '../../tool/tool.state';
import { CatalogState } from '../catalog.state';
/**
 * Tool to browse the list of available catalogs.
 */
export declare class CatalogLibraryToolComponent implements OnInit {
    private catalogService;
    private catalogState;
    private toolState;
    /**
     * Store that contains the catalogs
     * @internal
     */
    readonly store: EntityStore<Catalog>;
    constructor(catalogService: CatalogService, catalogState: CatalogState, toolState: ToolState);
    /**
     * @internal
     */
    ngOnInit(): void;
    /**
     * When the selected catalog changes, toggle the the CatalogBrowser tool.
     * @internal
     * @param event Select event
     */
    onCatalogSelectChange(event: {
        selected: boolean;
        catalog: Catalog;
    }): void;
    /**
     * Get all the available catalogs from the CatalogService and
     * load them into the store.
     */
    private loadCatalogs;
}
