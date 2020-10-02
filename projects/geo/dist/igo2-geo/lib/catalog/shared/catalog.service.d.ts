import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LanguageService, ConfigService } from '@igo2/core';
import { CapabilitiesService } from '../../datasource';
import { CatalogItem, CatalogItemGroup } from './catalog.interface';
import { Catalog } from './catalog.abstract';
export declare class CatalogService {
    private http;
    private config;
    private languageService;
    private capabilitiesService;
    constructor(http: HttpClient, config: ConfigService, languageService: LanguageService, capabilitiesService: CapabilitiesService);
    loadCatalogs(): Observable<Catalog[]>;
    loadCatalogItems(catalog: Catalog): Observable<CatalogItem[]>;
    loadCatalogBaseLayerItems(catalog: Catalog): Observable<CatalogItemGroup[]>;
    private getCatalogBaseLayersOptions;
    loadCatalogWMSLayerItems(catalog: Catalog): Observable<CatalogItem[]>;
    loadCatalogWMTSLayerItems(catalog: Catalog): Observable<CatalogItem[]>;
    loadCatalogCompositeLayerItems(catalog: Catalog): Observable<CatalogItem[]>;
    private getCatalogCapabilities;
    private prepareCatalogItemLayer;
    private prepareCatalogItemGroup;
    private includeRecursiveItems;
    private getWMTSItems;
    private testLayerRegexes;
    private retriveLayerInfoFormat;
    private findCatalogInfoFormat;
}
