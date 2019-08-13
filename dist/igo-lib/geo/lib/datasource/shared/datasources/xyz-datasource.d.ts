import olSourceXYZ from 'ol/source/XYZ';
import { DataSource } from './datasource';
import { XYZDataSourceOptions } from './xyz-datasource.interface';
export declare class XYZDataSource extends DataSource {
    options: XYZDataSourceOptions;
    ol: olSourceXYZ;
    protected createOlSource(): olSourceXYZ;
    onUnwatch(): void;
}
