import olSource from 'ol/source/Source';
import { DataSourceOptions, Legend } from './datasource.interface';
import { DataService } from './data.service';
import { LegendOptions } from '../../../layer';
export declare abstract class DataSource {
    options: DataSourceOptions;
    protected dataService?: DataService;
    id: string;
    ol: olSource;
    private legend;
    constructor(options?: DataSourceOptions, dataService?: DataService);
    protected abstract createOlSource(): olSource;
    protected generateId(): string;
    getLegend(style?: string, scale?: number): Legend[];
    setLegend(options: LegendOptions): Legend[];
    protected abstract onUnwatch(): any;
}
