import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WMSDataSourceOptions } from '../datasources';
import { OptionsService } from './options.service';
import { OptionsApiOptions } from './options-api.interface';
export declare class OptionsApiService extends OptionsService {
    private http;
    private urlApi;
    constructor(http: HttpClient, options?: OptionsApiOptions);
    getWMSOptions(baseOptions: WMSDataSourceOptions): Observable<WMSDataSourceOptions>;
}
