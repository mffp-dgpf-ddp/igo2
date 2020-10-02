import { Observable } from 'rxjs';
import { TooltipType } from '../../layer';
import { TimeFilterOptions } from '../../filter';
import { QueryFormat, QueryHtmlTarget } from '../../query';
import { ICatalog, ICompositeCatalog, CatalogItem, CatalogItemGroup } from './catalog.interface';
import { CatalogService } from './catalog.service';
import { TypeCatalogStrings } from './catalog.enum';
export declare abstract class Catalog implements ICatalog {
    id: string;
    title: string;
    url: string;
    items?: CatalogItem[];
    type?: TypeCatalogStrings;
    version?: string;
    matrixSet?: string;
    requestEncoding?: string;
    regFilters?: string[];
    groupImpose?: CatalogItemGroup;
    timeFilter?: TimeFilterOptions;
    queryFormat?: QueryFormat;
    queryHtmlTarget?: QueryHtmlTarget;
    queryParams?: {
        [key: string]: string;
    };
    sourceOptions?: {
        [key: string]: any;
    };
    count?: number;
    tooltipType?: TooltipType.ABSTRACT | TooltipType.TITLE;
    sortDirection?: 'asc' | 'desc';
    setCrossOriginAnonymous?: boolean;
    showLegend?: boolean;
    protected catalogService: CatalogService;
    constructor(options: Catalog, service: CatalogService);
    abstract collectCatalogItems(): Observable<CatalogItem[]>;
}
export declare class CompositeCatalog extends Catalog implements ICompositeCatalog {
    composite: ICatalog[];
    constructor(options: Catalog, service: CatalogService);
    collectCatalogItems(): Observable<CatalogItem[]>;
}
export declare class CatalogFactory {
    static createInstanceCatalog(options: Catalog, service: CatalogService): Catalog;
}
