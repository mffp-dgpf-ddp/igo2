import olLayerVectorTile from 'ol/layer/VectorTile';
import { MVTDataSource } from '../../../datasource/shared/datasources/mvt-datasource';
import { Layer } from './layer';
import { VectorTileLayerOptions } from './vectortile-layer.interface';
export declare class VectorTileLayer extends Layer {
    dataSource: MVTDataSource;
    options: VectorTileLayerOptions;
    ol: olLayerVectorTile;
    private watcher;
    constructor(options: VectorTileLayerOptions);
    protected createOlLayer(): olLayerVectorTile;
}
