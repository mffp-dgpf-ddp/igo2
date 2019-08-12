import olSourceVectorTile from 'ol/source/VectorTile';
import { SubjectStatus } from '@igo2/utils';
import { DataSource } from './datasource';
import { MVTDataSourceOptions } from './mvt-datasource.interface';
export declare class MVTDataSource extends DataSource {
    ol: olSourceVectorTile;
    options: MVTDataSourceOptions;
    status: boolean;
    protected createOlSource(): olSourceVectorTile;
    protected generateId(): string;
    onLayerStatusChange(status: SubjectStatus): void;
}
