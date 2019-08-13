import olSourceCarto from 'ol/source/CartoDB';
import { DataSource } from './datasource';
import { DataSourceLegendOptions } from './datasource.interface';
import { CartoDataSourceOptions } from './carto-datasource.interface';
export declare class CartoDataSource extends DataSource {
    ol: olSourceCarto;
    options: CartoDataSourceOptions;
    readonly params: any;
    readonly queryTitle: string;
    readonly queryHtmlTarget: string;
    protected createOlSource(): olSourceCarto;
    getLegend(): DataSourceLegendOptions[];
    onUnwatch(): void;
}
