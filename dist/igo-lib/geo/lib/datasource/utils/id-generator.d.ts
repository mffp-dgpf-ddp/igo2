import { AnyDataSourceOptions } from '../shared/datasources/any-datasource.interface';
import { DataSourceOptions } from '../shared/datasources/datasource.interface';
import { WMSDataSourceOptions } from '../shared/datasources/wms-datasource.interface';
import { WMTSDataSourceOptions } from '../shared/datasources/wmts-datasource.interface';
/**
 * Generate a id from it's datasource options.
 * @param options Data source options
 * @returns A id
 */
export declare function generateIdFromSourceOptions(options: DataSourceOptions): string;
/**
 * Generate a id from WMS data source options
 * @param options WMS data source options
 * @returns A md5 hash of the the url and layers
 */
export declare function generateWMSIdFromSourceOptions(options: WMSDataSourceOptions): string;
/**
 * Generate a id from WMTS data source options
 * @param options WMTS data source options
 * @returns A md5 hash of the the url and layer
 */
export declare function generateWMTSIdFromSourceOptions(options: WMTSDataSourceOptions): string;
/**
 * Generate a id from XYZ data source options
 * @param options XYZ data source options
 * @returns A md5 hash of the the url and layer
 */
export declare function generateXYZIdFromSourceOptions(options: WMTSDataSourceOptions): string;
/**
 * Generate a id from feature data source options
 * @param options XYZ data source options
 * @returns A md5 hash of the the url and layer
 */
export declare function generateFeatureIdFromSourceOptions(options: WMTSDataSourceOptions): string;
/**
 * Generate a unique id
 * @returns A uuid
 */
export declare function generateId(options: AnyDataSourceOptions): string;
