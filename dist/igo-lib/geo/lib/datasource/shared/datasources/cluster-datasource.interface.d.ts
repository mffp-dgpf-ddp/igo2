import olSourceVector from 'ol/source/Vector';
import { FeatureDataSource } from './feature-datasource';
import { FeatureDataSourceOptions } from './feature-datasource.interface';
export interface ClusterDataSourceOptions extends FeatureDataSourceOptions {
    distance?: number;
    source?: FeatureDataSource;
    ol?: olSourceVector;
}
