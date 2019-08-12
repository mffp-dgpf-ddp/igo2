import olSourceVector from 'ol/source/Vector';
import { DataSource } from './datasource';
import { WFSDataSourceOptions } from './wfs-datasource.interface';
import { WFSService } from './wfs.service';
import { OgcFilterWriter } from '../../../filter/shared/ogc-filter';
import { NetworkService } from '@igo2/core';
export declare class WFSDataSource extends DataSource {
    options: WFSDataSourceOptions;
    networkService: NetworkService;
    protected wfsService: WFSService;
    ol: olSourceVector;
    ogcFilterWriter: OgcFilterWriter;
    constructor(options: WFSDataSourceOptions, networkService: NetworkService, wfsService: WFSService);
    protected createOlSource(): olSourceVector;
    private getFormatFromOptions;
}
