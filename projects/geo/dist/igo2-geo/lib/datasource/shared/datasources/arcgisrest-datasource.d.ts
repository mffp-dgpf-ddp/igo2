import olSourceVector from 'ol/source/Vector';
import { DataSource } from './datasource';
import { Legend } from './datasource.interface';
import { ArcGISRestDataSourceOptions } from './arcgisrest-datasource.interface';
export declare class ArcGISRestDataSource extends DataSource {
    ol: olSourceVector;
    options: ArcGISRestDataSourceOptions;
    protected createOlSource(): olSourceVector;
    getLegend(): Legend[];
    onUnwatch(): void;
}
