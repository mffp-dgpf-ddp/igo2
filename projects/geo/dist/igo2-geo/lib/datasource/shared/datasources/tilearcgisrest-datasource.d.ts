import olSourceTileArcGISRest from 'ol/source/TileArcGISRest';
import { DataSource } from './datasource';
import { Legend } from './datasource.interface';
import { TileArcGISRestDataSourceOptions } from './tilearcgisrest-datasource.interface';
export declare class TileArcGISRestDataSource extends DataSource {
    ol: olSourceTileArcGISRest;
    options: TileArcGISRestDataSourceOptions;
    readonly params: any;
    readonly queryTitle: string;
    readonly mapLabel: string;
    readonly queryHtmlTarget: string;
    protected createOlSource(): olSourceTileArcGISRest;
    getLegend(): Legend[];
    onUnwatch(): void;
}
