import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WFSDataSourceOptions } from './wfs-datasource.interface';
import { WMSDataSourceOptions } from './wms-datasource.interface';
import { DataService } from './data.service';
export declare class WFSService extends DataService {
    private http;
    constructor(http: HttpClient);
    getData(): string;
    getSourceFieldsFromWFS(dataSourceOptions: WFSDataSourceOptions | WMSDataSourceOptions): void;
    private wfsGetFeature;
    defineFieldAndValuefromWFS(dataSourceOptions: WFSDataSourceOptions | WMSDataSourceOptions): Observable<any>;
    private built_properties_value;
}
