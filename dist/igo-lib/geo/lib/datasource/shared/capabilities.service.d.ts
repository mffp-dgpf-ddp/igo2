import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WMTSDataSourceOptions, WMSDataSourceOptions, CartoDataSourceOptions, ArcGISRestDataSourceOptions, TileArcGISRestDataSourceOptions } from './datasources';
export declare class CapabilitiesService {
    private http;
    private capabilitiesStore;
    private parsers;
    constructor(http: HttpClient);
    getWMSOptions(baseOptions: WMSDataSourceOptions): Observable<WMSDataSourceOptions>;
    getWMTSOptions(baseOptions: WMTSDataSourceOptions): Observable<WMTSDataSourceOptions>;
    getCartoOptions(baseOptions: CartoDataSourceOptions): Observable<CartoDataSourceOptions>;
    getArcgisOptions(baseOptions: ArcGISRestDataSourceOptions): Observable<ArcGISRestDataSourceOptions>;
    getTileArcgisOptions(baseOptions: TileArcGISRestDataSourceOptions): Observable<TileArcGISRestDataSourceOptions>;
    getCapabilities(service: 'wms' | 'wmts', baseUrl: string, version?: string): Observable<any>;
    private parseWMSOptions;
    private parseWMTSOptions;
    private parseCartoOptions;
    private parseArcgisOptions;
    private parseTileArcgisOptions;
    private findDataSourceInCapabilities;
    getTimeFilter(layer: any): any;
}
