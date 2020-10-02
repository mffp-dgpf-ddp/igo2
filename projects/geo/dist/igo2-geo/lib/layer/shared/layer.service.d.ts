import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthInterceptor } from '@igo2/auth';
import { DataSourceService } from '../../datasource/shared/datasource.service';
import { Layer, AnyLayerOptions } from './layers';
import { StyleService } from './style.service';
export declare class LayerService {
    private http;
    private styleService;
    private dataSourceService;
    private authInterceptor;
    constructor(http: HttpClient, styleService: StyleService, dataSourceService: DataSourceService, authInterceptor: AuthInterceptor);
    createLayer(layerOptions: AnyLayerOptions): Layer;
    createAsyncLayer(layerOptions: AnyLayerOptions): Observable<Layer>;
    private createImageLayer;
    private createTileLayer;
    private createVectorLayer;
    private createVectorTileLayer;
    private applyMapboxStyle;
    getMapboxGlStyle(url: string): Observable<any>;
}
