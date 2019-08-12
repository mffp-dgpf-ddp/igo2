import { EventEmitter, OnInit } from '@angular/core';
import { EntityStore } from '@igo2/common';
import { IgoMap } from '../../map';
import { Catalog } from '../shared/catalog.interface';
/**
 * Component to browse a list of available catalogs
 */
export declare class CatalogLibaryComponent implements OnInit {
    /**
     * Store holding the catalogs
     */
    store: EntityStore<Catalog>;
    /**
     * Map to add the catalog items to
     */
    map: IgoMap;
    /**
     * Event emitted a catalog is selected or unselected
     */
    catalogSelectChange: EventEmitter<{
        selected: boolean;
        catalog: Catalog;
    }>;
    /**
     * @internal
     */
    ngOnInit(): void;
    /**
     * When a catalog is selected, update it's state in the store
     * and emit the catalog select change event
     * @internal
     */
    onCatalogSelect(catalog: Catalog): void;
}
