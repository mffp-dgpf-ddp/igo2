import olSourceImageWMS from 'ol/source/ImageWMS';
import { DataSource } from './datasource';
import { Legend } from './datasource.interface';
import { WMSDataSourceOptions } from './wms-datasource.interface';
import { WFSService } from './wfs.service';
export declare class WMSDataSource extends DataSource {
    options: WMSDataSourceOptions;
    protected wfsService: WFSService;
    ol: olSourceImageWMS;
    readonly params: any;
    readonly queryTitle: string;
    readonly mapLabel: string;
    readonly queryHtmlTarget: string;
    constructor(options: WMSDataSourceOptions, wfsService: WFSService);
    refresh(): void;
    private buildDynamicDownloadUrlFromParamsWFS;
    protected createOlSource(): olSourceImageWMS;
    getLegend(style?: string, scale?: number): Legend[];
    onUnwatch(): void;
}
