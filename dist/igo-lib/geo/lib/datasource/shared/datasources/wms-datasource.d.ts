import olSourceImageWMS from 'ol/source/ImageWMS';
import { DataSource } from './datasource';
import { DataSourceLegendOptions } from './datasource.interface';
import { WMSDataSourceOptions } from './wms-datasource.interface';
import { WFSService } from './wfs.service';
export declare class WMSDataSource extends DataSource {
    options: WMSDataSourceOptions;
    protected wfsService: WFSService;
    ol: olSourceImageWMS;
    readonly params: any;
    readonly queryTitle: string;
    readonly queryHtmlTarget: string;
    constructor(options: WMSDataSourceOptions, wfsService: WFSService);
    refresh(): void;
    private buildDynamicDownloadUrlFromParamsWFS;
    protected createOlSource(): olSourceImageWMS;
    getLegend(scale?: number): DataSourceLegendOptions[];
    onUnwatch(): void;
}
