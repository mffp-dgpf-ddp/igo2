import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WMTSDataSourceOptions, WMSDataSourceOptions, CartoDataSourceOptions, ArcGISRestDataSourceOptions, TileArcGISRestDataSourceOptions } from './datasources';
import { LegendOptions } from '../../layer/shared/layers/layer.interface';
export declare enum TypeCapabilities {
    wms = "wms",
    wmts = "wmts"
}
export declare type TypeCapabilitiesStrings = keyof typeof TypeCapabilities;
export declare class CapabilitiesService {
    private http;
    private parsers;
    constructor(http: HttpClient);
    getWMSOptions(baseOptions: WMSDataSourceOptions): Observable<WMSDataSourceOptions>;
    getWMTSOptions(baseOptions: WMTSDataSourceOptions): Observable<WMTSDataSourceOptions>;
    getCartoOptions(baseOptions: CartoDataSourceOptions): Observable<CartoDataSourceOptions>;
    getArcgisOptions(baseOptions: ArcGISRestDataSourceOptions): Observable<ArcGISRestDataSourceOptions>;
    getTileArcgisOptions(baseOptions: TileArcGISRestDataSourceOptions): Observable<TileArcGISRestDataSourceOptions>;
    getCapabilities(service: TypeCapabilitiesStrings, baseUrl: string, version?: string): Observable<any>;
    private parseWMSOptions;
    private parseWMTSOptions;
    private parseCartoOptions;
    private parseArcgisOptions;
    private parseTileArcgisOptions;
    private findDataSourceInCapabilities;
    getTimeFilter(layer: any): any;
    getStyle(Style: any): LegendOptions;
}
