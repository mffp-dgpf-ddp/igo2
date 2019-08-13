import olSourceWMTS from 'ol/source/WMTS';
import { DataSource } from './datasource';
import { WMTSDataSourceOptions } from './wmts-datasource.interface';
export declare class WMTSDataSource extends DataSource {
    options: WMTSDataSourceOptions;
    ol: olSourceWMTS;
    constructor(options: WMTSDataSourceOptions);
    protected createOlSource(): olSourceWMTS;
    onUnwatch(): void;
}
