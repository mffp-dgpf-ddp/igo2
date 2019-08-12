import olSourceVectorTile from 'ol/source/VectorTile';
import olAttribution from 'ol/control/Attribution';
import { DataSourceOptions } from './datasource.interface';
export interface MVTDataSourceOptions extends DataSourceOptions {
    projection?: string;
    attributions?: olAttribution;
    key?: string;
    format?: any;
    ol?: olSourceVectorTile;
}
