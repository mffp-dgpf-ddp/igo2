import { WMSDataSource } from '../../datasource/shared/datasources/wms-datasource';
import { OgcFilterableDataSource } from './ogc-filter.interface';
export declare class OGCFilterService {
    constructor();
    filterByOgc(wmsDatasource: WMSDataSource, filterString: string): void;
    setOgcWFSFiltersOptions(wfsDatasource: OgcFilterableDataSource): void;
    setOgcWMSFiltersOptions(wmsDatasource: OgcFilterableDataSource): void;
}
