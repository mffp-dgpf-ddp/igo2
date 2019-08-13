import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WFSDataSourceOptions } from './wfs-datasource.interface';
import { DataService } from './data.service';
export declare class WFSService extends DataService {
    private http;
    constructor(http: HttpClient);
    getData(): string;
    getSourceFieldsFromWFS(datasource: any): void;
    private wfsGetFeature;
    defineFieldAndValuefromWFS(wfsDataSourceOptions: WFSDataSourceOptions): Observable<any>;
    private built_properties_value;
}
