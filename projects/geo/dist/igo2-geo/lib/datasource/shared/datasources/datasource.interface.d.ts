import olSource from 'ol/source/Source';
import { DownloadOptions } from '../../../download/shared/download.interface';
export interface DataSourceOptions {
    type?: 'wms' | 'wfs' | 'vector' | 'wmts' | 'xyz' | 'osm' | 'carto' | 'arcgisrest' | 'tilearcgisrest' | 'websocket' | 'mvt' | 'cluster';
    optionsFromCapabilities?: boolean;
    id?: string;
    ol?: olSource;
    minZoom?: number;
    maxZoom?: number;
    sourceFields?: SourceFieldsOptionsParams[];
    download?: DownloadOptions;
}
export interface SourceFieldsOptionsParams {
    name: any;
    alias?: any;
    values?: any;
    excludeFromOgcFilters?: boolean;
}
export interface Legend {
    collapsed?: boolean;
    display?: boolean;
    url?: string;
    html?: string;
    style?: {
        [key: string]: string | number;
    };
    title?: string;
    currentStyle?: string;
}