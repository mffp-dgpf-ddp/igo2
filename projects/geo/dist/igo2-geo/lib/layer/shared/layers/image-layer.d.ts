import olLayerImage from 'ol/layer/Image';
import { AuthInterceptor } from '@igo2/auth';
import { IgoMap } from '../../../map';
import { WMSDataSource } from '../../../datasource/shared/datasources/wms-datasource';
import { Layer } from './layer';
import { ImageLayerOptions } from './image-layer.interface';
export declare class ImageLayer extends Layer {
    authInterceptor?: AuthInterceptor;
    dataSource: WMSDataSource;
    options: ImageLayerOptions;
    ol: olLayerImage;
    private watcher;
    constructor(options: ImageLayerOptions, authInterceptor?: AuthInterceptor);
    protected createOlLayer(): olLayerImage;
    setMap(map: IgoMap | undefined): void;
    private customLoader;
}
