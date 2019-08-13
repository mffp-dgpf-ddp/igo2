import olSource from 'ol/source/Source';
import { DataSourceOptions, DataSourceLegendOptions } from './datasource.interface';
import { DataService } from './data.service';
export declare abstract class DataSource {
    options: DataSourceOptions;
    protected dataService?: DataService;
    id: string;
    ol: olSource;
    constructor(options?: DataSourceOptions, dataService?: DataService);
    protected abstract createOlSource(): olSource;
    protected generateId(): string;
    getLegend(scale?: number): DataSourceLegendOptions[];
    protected abstract onUnwatch(): any;
}
