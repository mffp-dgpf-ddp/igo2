import { Observable, BehaviorSubject } from 'rxjs';
import { CapabilitiesService } from './capabilities.service';
import { WFSService } from './datasources/wfs.service';
import { NetworkService } from '@igo2/core';
import { DataSource, AnyDataSourceOptions } from './datasources';
export declare class DataSourceService {
    private capabilitiesService;
    private wfsDataSourceService;
    networkService: NetworkService;
    datasources$: BehaviorSubject<DataSource[]>;
    constructor(capabilitiesService: CapabilitiesService, wfsDataSourceService: WFSService, networkService: NetworkService);
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
