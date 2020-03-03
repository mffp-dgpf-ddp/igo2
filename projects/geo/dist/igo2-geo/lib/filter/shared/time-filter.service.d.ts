import { WMSDataSource } from '../../datasource/shared/datasources/wms-datasource';
import { TileArcGISRestDataSource } from '../../datasource/shared/datasources/tilearcgisrest-datasource';
export declare class TimeFilterService {
    constructor();
    filterByDate(datasource: WMSDataSource | TileArcGISRestDataSource, date: Date | [Date, Date]): void;
    filterByYear(datasource: WMSDataSource | TileArcGISRestDataSource, year: string | [string, string]): void;
    private reformatDateTime;
}
