import olAttribution from 'ol/control/Attribution';
import { FeatureDataSourceOptions } from './feature-datasource.interface';
export interface ArcGISRestDataSourceOptions extends FeatureDataSourceOptions {
    layer: string;
    params?: ArcGISRestDataSourceOptionsParams;
}
export interface ArcGISRestDataSourceOptionsParams {
    customParams?: string[];
    legendInfo?: any;
    style?: any;
    timefilter?: any;
    timeExtent?: string;
    attributions?: olAttribution;
}
