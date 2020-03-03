import { Observable, BehaviorSubject } from 'rxjs';
import { CapabilitiesService } from './capabilities.service';
import { WFSService } from './datasources/wfs.service';
import { DataSource, AnyDataSourceOptions } from './datasources';
export declare class DataSourceService {
    private capabilitiesService;
    private wfsDataSourceService;
    datasources$: BehaviorSubject<DataSource[]>;
    constructor(capabilitiesService: CapabilitiesService, wfsDataSourceService: WFSService);
    createAsyncDataSource(context: AnyDataSourceOptions): Observable<DataSource>;
    private createOSMDataSource;
    private createFeatureDataSource;
    private createWebSocketDataSource;
    private createWFSDataSource;
    private createWMSDataSource;
    private createWMTSDataSource;
    private createXYZDataSource;
    private createCartoDataSource;
    private createArcGISRestDataSource;
    private createTileArcGISRestDataSource;
    private createMVTDataSource;
    private createClusterDataSource;
}
