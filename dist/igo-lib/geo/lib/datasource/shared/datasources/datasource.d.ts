import olSource from 'ol/source/Source';
import { SubjectStatus } from '@igo2/utils';
import { DataSourceOptions, DataSourceLegendOptions } from './datasource.interface';
import { DataService } from './data.service';
import { NetworkService } from '@igo2/core';
export declare abstract class DataSource {
    options: DataSourceOptions;
    protected networkService?: NetworkService;
    protected dataService?: DataService;
    id: string;
    ol: olSource;
    constructor(options?: DataSourceOptions, networkService?: NetworkService, dataService?: DataService);
    protected abstract createOlSource(): olSource;
    protected generateId(): string;
    getLegend(scale?: number): DataSourceLegendOptions[];
    onLayerStatusChange(status: SubjectStatus): void;
}
