import olSourceOSM from 'ol/source/OSM';
import { DataSource } from './datasource';
import { OSMDataSourceOptions } from './osm-datasource.interface';
export declare class OSMDataSource extends DataSource {
    options: OSMDataSourceOptions;
    ol: olSourceOSM;
    protected createOlSource(): olSourceOSM;
    onUnwatch(): void;
}
