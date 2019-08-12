import olLayerImage from 'ol/layer/Image';
import { IgoMap } from '../../../map';
import { WMSDataSource } from '../../../datasource/shared/datasources/wms-datasource';
import { Layer } from './layer';
import { ImageLayerOptions } from './image-layer.interface';
export declare class ImageLayer extends Layer {
    dataSource: WMSDataSource;
    options: ImageLayerOptions;
    ol: olLayerImage;
    private watcher;
    constructor(options: ImageLayerOptions);
    protected createOlLayer(): olLayerImage;
    setMap(map: IgoMap | undefined): void;
    private customLoader;
}
