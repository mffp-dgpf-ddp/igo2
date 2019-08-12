import olSourceImageWMS from 'ol/source/ImageWMS';
import { DataSource } from './datasource';
import { DataSourceLegendOptions } from './datasource.interface';
import { WMSDataSourceOptions } from './wms-datasource.interface';
import { WFSService } from './wfs.service';
import { OgcFilterWriter } from '../../../filter/shared/ogc-filter';
import { NetworkService } from '@igo2/core';
export declare class WMSDataSource extends DataSource {
    options: WMSDataSourceOptions;
    networkService: NetworkService;
    protected wfsService: WFSService;
    ol: olSourceImageWMS;
    ogcFilterWriter: OgcFilterWriter;
    readonly params: any;
    readonly queryTitle: string;
    readonly queryHtmlTarget: string;
    constructor(options: WMSDataSourceOptions, networkService: NetworkService, wfsService: WFSService);
    refresh(): void;
    formatProcessedOgcFilter(processedFilter: any, layers: any): string;
    private buildDynamicDownloadUrlFromParamsWFS;
    protected createOlSource(): olSourceImageWMS;
    getLegend(scale?: number): DataSourceLegendOptions[];
}
