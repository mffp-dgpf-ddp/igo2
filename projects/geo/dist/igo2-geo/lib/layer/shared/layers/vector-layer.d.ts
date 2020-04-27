import olLayerVector from 'ol/layer/Vector';
import { FeatureDataSource } from '../../../datasource/shared/datasources/feature-datasource';
import { WFSDataSource } from '../../../datasource/shared/datasources/wfs-datasource';
import { ArcGISRestDataSource } from '../../../datasource/shared/datasources/arcgisrest-datasource';
import { WebSocketDataSource } from '../../../datasource/shared/datasources/websocket-datasource';
import { ClusterDataSource } from '../../../datasource/shared/datasources/cluster-datasource';
import { IgoMap } from '../../../map';
import { Layer } from './layer';
import { VectorLayerOptions } from './vector-layer.interface';
export declare class VectorLayer extends Layer {
    dataSource: FeatureDataSource | WFSDataSource | ArcGISRestDataSource | WebSocketDataSource | ClusterDataSource;
    options: VectorLayerOptions;
    ol: olLayerVector;
    private watcher;
    private trackFeatureListenerId;
    readonly browsable: boolean;
    readonly exportable: boolean;
    constructor(options: VectorLayerOptions);
    protected createOlLayer(): olLayerVector;
    protected flash(feature: any): void;
    setMap(map: IgoMap | undefined): void;
    onUnwatch(): void;
    stopAnimation(): void;
    enableTrackFeature(id: string | number): void;
    centerMapOnFeature(id: string | number): void;
    trackFeature(id: any, feat: any): void;
    disableTrackFeature(id?: string | number): void;
}