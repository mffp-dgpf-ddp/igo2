import { EntityStore } from '@igo2/common';
import { Catalog, CatalogItem } from '@igo2/geo';
/**
 * Service that holds the state of the catalog module
 */
export declare class CatalogState {
    /**
     * Store that contains all the catalogs
     */
    readonly catalogStore: EntityStore<Catalog>;
    private _catalogStore;
    /**
     * Catalog -> Catalog items store mapping
     */
    private catalogItemsStores;
    constructor();
    /**
     * Get a catalog's items store
     * @param catalog Catalog
     * @returns Store that contains the catalog items
     */
    getCatalogItemsStore(catalog: Catalog): EntityStore<CatalogItem>;
    /**
     * Bind a catalog items store to a catalog
     * @param catalog Catalog
     * @param store Catalog items store
     */
    setCatalogItemsStore(catalog: Catalog, store: EntityStore<CatalogItem>): void;
}
