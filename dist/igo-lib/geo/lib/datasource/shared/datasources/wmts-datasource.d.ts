import olSourceWMTS from 'ol/source/WMTS';
import { DataSource } from './datasource';
import { WMTSDataSourceOptions } from './wmts-datasource.interface';
import { NetworkService } from '@igo2/core/igo2-core';
export declare class WMTSDataSource extends DataSource {
    options: WMTSDataSourceOptions;
    ol: olSourceWMTS;
    constructor(options: WMTSDataSourceOptions, networkService: NetworkService);
    protected createOlSource(): olSourceWMTS;
}
