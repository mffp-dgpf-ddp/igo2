import olSourceCluster from 'ol/source/Cluster';
import { FeatureDataSource } from './feature-datasource';
import { ClusterDataSourceOptions } from './cluster-datasource.interface';
export declare class ClusterDataSource extends FeatureDataSource {
    options: ClusterDataSourceOptions;
    ol: olSourceCluster;
    protected createOlSource(): olSourceCluster;
    protected generateId(): string;
    onUnwatch(): void;
}
