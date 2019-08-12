import { FeatureDataSourceOptions } from './feature-datasource.interface';
export interface WFSDataSourceOptions extends FeatureDataSourceOptions {
    params: WFSDataSourceOptionsParams;
    paramsWFS?: WFSDataSourceOptionsParams;
    urlWfs?: string;
}
export interface WFSDataSourceOptionsParams {
    version?: string;
    featureTypes: string;
    fieldNameGeometry: string;
    maxFeatures?: number;
    outputFormat: string;
    outputFormatDownload?: string;
    srsName?: string;
    xmlFilter?: string;
    wfsCapabilities?: WFSCapabilitiesParams;
}
export interface WFSCapabilitiesParams {
    xmlBody?: string;
    GetPropertyValue?: boolean;
}
