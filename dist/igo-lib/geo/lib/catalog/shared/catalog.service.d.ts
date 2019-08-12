import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LanguageService, ConfigService } from '@igo2/core';
import { CapabilitiesService } from '../../datasource';
import { Catalog, CatalogItem } from './catalog.interface';
export declare class CatalogService {
    private http;
    private config;
    private languageService;
    private capabilitiesService;
    constructor(http: HttpClient, config: ConfigService, languageService: LanguageService, capabilitiesService: CapabilitiesService);
    loadCatalogs(): Observable<Catalog[]>;
    loadCatalogItems(catalog: Catalog): Observable<CatalogItem[]>;
    private loadCatalogBaseLayerItems;
    private getCatalogBaseLayersOptions;
    private loadCatalogWMSLayerItems;
    private loadCatalogWMTSLayerItems;
    private getCatalogWMSCapabilities;
    private getCatalogWMTSCapabilities;
    private includeRecursiveItems;
    private getWMTSItems;
    private testLayerRegexes;
    private retriveLayerInfoFormat;
    private retrieveTooltipType;
    private findCatalogInfoFormat;
}
