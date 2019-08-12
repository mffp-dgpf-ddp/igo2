import olSourceCarto from 'ol/source/CartoDB';
import { DataSourceOptions } from './datasource.interface';
export interface CartoDataSourceOptions extends DataSourceOptions {
    account: string;
    mapId?: string;
    params?: any;
    queryPrecision?: string;
    crossOrigin?: string;
    projection?: string;
    config?: any;
    map?: string;
    ol?: olSourceCarto;
}
