import { WFSDataSourceOptions } from './wfs-datasource.interface';
export declare const defaultEpsg = "EPSG:3857";
export declare const defaultMaxFeatures = 5000;
export declare const defaultWfsVersion = "2.0.0";
export declare const defaultFieldNameGeometry = "geometry";
export declare const gmlRegex: RegExp;
export declare const jsonRegex: RegExp;
/**
 * This method build/standardize WFS call query params based on the layer property.
 * @param wfsDataSourceOptions  WFSDataSourceOptions The common wfs datasource options interface
 * @param count  Number: Used to control the number of feature. Used to bypass whe wfs datasource options interface (maxFeatures)
 * @param epsg  String: Used to control the EPSG code (es: 'EPSG3857'). Used to bypass whe wfs datasource options interface (srsName)
 * @param properties  String: Used to control the queried fields  (WFS service).
 * @returns An array array of {name: '', value: ''} of predefined query params.
 */
export declare function formatWFSQueryString(wfsDataSourceOptions: WFSDataSourceOptions, count?: number, epsg?: string, properties?: string): {
    name: string;
    value: string;
}[];
/**
 * Validate/Modify layer's wfs options based on :
 * 1- an Openlayers's issue with GML provided from WFS. Refer to
 * https://github.com/openlayers/openlayers/pull/6400
 * 2- Set default values for optionals parameters.
 * @param wfsDataSourceOptions  WFSDataSourceOptions The common wfs datasource options interface
 * @returns An array array of {name: '', value: ''} of predefined query params.
 */
export declare function checkWfsParams(wfsDataSourceOptions: any, srcType?: string): any;
