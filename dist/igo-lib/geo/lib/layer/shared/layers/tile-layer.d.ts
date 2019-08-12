import olLayerTile from 'ol/layer/Tile';
import { IgoMap } from '../../../map';
import { OSMDataSource } from '../../../datasource/shared/datasources/osm-datasource';
import { WMTSDataSource } from '../../../datasource/shared/datasources/wmts-datasource';
import { XYZDataSource } from '../../../datasource/shared/datasources/xyz-datasource';
import { CartoDataSource } from '../../../datasource/shared/datasources/carto-datasource';
import { TileArcGISRestDataSource } from '../../../datasource/shared/datasources/tilearcgisrest-datasource';
import { Layer } from './layer';
import { TileLayerOptions } from './tile-layer.interface';
export declare class TileLayer extends Layer {
    dataSource: OSMDataSource | WMTSDataSource | XYZDataSource | CartoDataSource | TileArcGISRestDataSource;
    options: TileLayerOptions;
    ol: olLayerTile;
    private watcher;
    constructor(options: TileLayerOptions);
    protected createOlLayer(): olLayerTile;
    setMap(map: IgoMap | undefined): void;
}
