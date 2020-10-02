import olSourceImageWMS from 'ol/source/ImageWMS';
import { DataSourceOptions } from './datasource.interface';
import { WFSDataSourceOptionsParams } from './wfs-datasource.interface';
export interface WMSDataSourceOptions extends DataSourceOptions {
    paramsWFS?: WFSDataSourceOptionsParams;
    urlWfs?: string;
    url: string;
    params: WMSDataSourceOptionsParams;
    crossOrigin?: string;
    projection?: string;
    resolutions?: number[];
    serverType?: string;
    ratio?: number;
    ol?: olSourceImageWMS;
    refreshIntervalSec?: number;
    excludeAttribute?: Array<string>;
}
export interface WMSDataSourceOptionsParams {
    LAYERS: string;
    VERSION?: string;
    TIME?: string;
    FEATURE_COUNT?: number;
    FILTER?: string;
    INFO_FORMAT?: string;
    DPI?: number;
    MAP_RESOLUTION?: number;
    FORMAT_OPTIONS?: string;
}
