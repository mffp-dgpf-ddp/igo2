import olSourceVector from 'ol/source/Vector';
import { DataSource } from './datasource';
import { FeatureDataSourceOptions } from './feature-datasource.interface';
export declare class FeatureDataSource extends DataSource {
    options: FeatureDataSourceOptions;
    ol: olSourceVector;
    protected createOlSource(): olSourceVector;
    protected getSourceFormatFromOptions(options: FeatureDataSourceOptions): any;
}
