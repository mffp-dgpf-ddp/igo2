import { Observable } from 'rxjs';
import { ConfigService } from '@igo2/core';
import { DataSourceService } from '../../datasource/shared/datasource.service';
import { Layer, AnyLayerOptions } from './layers';
import { StyleService } from './style.service';
export declare class LayerService {
    private styleService;
    private dataSourceService;
    private config;
    private tokenKey;
    constructor(styleService: StyleService, dataSourceService: DataSourceService, config: ConfigService);
    createLayer(layerOptions: AnyLayerOptions): Layer;
    createAsyncLayer(layerOptions: AnyLayerOptions): Observable<Layer>;
    private createImageLayer;
    private createTileLayer;
    private createVectorLayer;
    private createVectorTileLayer;
}
