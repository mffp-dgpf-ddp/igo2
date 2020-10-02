import { HttpClient } from '@angular/common/http';
import { ConfigService, LanguageService } from '@igo2/core';
import { Observable } from 'rxjs';
import { Feature } from '../../feature/shared';
import { SpatialFilterQueryType, SpatialFilterItemType } from './spatial-filter.enum';
import { SpatialFilterThematic } from './spatial-filter.interface';
export declare class SpatialFilterService {
    private http;
    private languageService;
    private configService;
    baseUrl: string;
    urlFilterList: {
        AdmRegion: string;
        Arrond: string;
        CircFed: string;
        CircProv: string;
        DirReg: string;
        MRC: string;
        Mun: string;
        RegTour: string;
        bornes: string;
        hydro: string;
        routes: string;
    };
    constructor(http: HttpClient, languageService: LanguageService, configService: ConfigService);
    getKeyByValue(object: any, value: any): string;
    loadFilterList(type: SpatialFilterQueryType): Observable<Feature[]>;
    loadThematicsList(): Observable<SpatialFilterThematic[]>;
    loadFilterItem(feature: any, itemType: SpatialFilterItemType, type?: SpatialFilterQueryType, thematic?: SpatialFilterThematic, buffer?: number): Observable<Feature<{
        [key: string]: any;
    }>[]>;
    loadItemById(feature: Feature, type: SpatialFilterQueryType): Observable<Feature>;
}
