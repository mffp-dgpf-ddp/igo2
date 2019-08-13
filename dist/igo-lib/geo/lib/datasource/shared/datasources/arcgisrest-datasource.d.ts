import olSourceVector from 'ol/source/Vector';
import { DataSource } from './datasource';
import { DataSourceLegendOptions } from './datasource.interface';
import { ArcGISRestDataSourceOptions } from './arcgisrest-datasource.interface';
export declare class ArcGISRestDataSource extends DataSource {
    ol: olSourceVector;
    options: ArcGISRestDataSourceOptions;
    protected createOlSource(): olSourceVector;
    getLegend(): DataSourceLegendOptions[];
    onUnwatch(): void;
}
