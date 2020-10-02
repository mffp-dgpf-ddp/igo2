import olSourceVector from 'ol/source/Vector';
import { DataSource } from './datasource';
import { WFSDataSourceOptions } from './wfs-datasource.interface';
import { WFSService } from './wfs.service';
export declare class WFSDataSource extends DataSource {
    options: WFSDataSourceOptions;
    protected wfsService: WFSService;
    ol: olSourceVector;
    constructor(options: WFSDataSourceOptions, wfsService: WFSService);
    protected createOlSource(): olSourceVector;
    private buildUrl;
    onUnwatch(): void;
}
