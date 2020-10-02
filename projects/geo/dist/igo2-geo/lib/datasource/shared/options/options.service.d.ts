import { Observable } from 'rxjs';
import { WMSDataSourceOptions } from '../datasources';
export declare abstract class OptionsService {
    abstract getWMSOptions(_baseOptions: WMSDataSourceOptions): Observable<WMSDataSourceOptions>;
}
