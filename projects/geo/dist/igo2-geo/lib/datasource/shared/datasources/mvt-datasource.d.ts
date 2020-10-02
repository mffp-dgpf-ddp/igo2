import olSourceVectorTile from 'ol/source/VectorTile';
import { DataSource } from './datasource';
import { MVTDataSourceOptions } from './mvt-datasource.interface';
export declare class MVTDataSource extends DataSource {
    options: MVTDataSourceOptions;
    ol: olSourceVectorTile;
    protected createOlSource(): olSourceVectorTile;
    protected generateId(): string;
    onUnwatch(): void;
}
