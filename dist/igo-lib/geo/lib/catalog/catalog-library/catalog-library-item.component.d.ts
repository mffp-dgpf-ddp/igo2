import { IgoMap } from '../../map';
import { Catalog } from '../shared/catalog.interface';
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
    /**
     * @internal
     */
    readonly icon: string;
}
