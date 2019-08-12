import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WFSDataSourceOptions } from './wfs-datasource.interface';
import { DataService } from './data.service';
export declare class WFSService extends DataService {
    private http;
    constructor(http: HttpClient);
    getData(): string;
    getSourceFieldsFromWFS(datasource: any): void;
    checkWfsOptions(wfsDataSourceOptions: any): any;
    buildBaseWfsUrl(wfsDataSourceOptions: WFSDataSourceOptions, wfsQuery: string): string;
    wfsGetFeature(wfsDataSourceOptions: WFSDataSourceOptions, nb?: number, epsgCode?: number, propertyname?: string): Observable<any>;
    getValueFromWfsGetPropertyValues(wfsDataSourceOptions: WFSDataSourceOptions, field: any, maxFeatures?: number, startIndex?: number, retry?: number): Observable<any>;
    wfsGetCapabilities(options: any): Observable<any>;
    defineFieldAndValuefromWFS(wfsDataSourceOptions: WFSDataSourceOptions): Observable<any>;
    wfsGetPropertyValue(wfsDataSourceOptions: WFSDataSourceOptions, field: any, maxFeatures?: number, startIndex?: number): Observable<any>;
    private built_properties_value;
}
