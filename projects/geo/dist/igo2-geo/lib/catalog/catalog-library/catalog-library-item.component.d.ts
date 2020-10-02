import { IgoMap } from '../../map';
import { Catalog } from '../shared/catalog.abstract';
/**
 * Catalog library item
 */
export declare class CatalogLibaryItemComponent {
    /**
     * Catalog
     */
    catalog: Catalog;
    /**
     * Map to add the catalog items to
     */
    map: IgoMap;
    /**
     * @internal
     */
    readonly title: string;
}
