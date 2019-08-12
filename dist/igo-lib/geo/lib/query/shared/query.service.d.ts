import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feature } from '../../feature/shared/feature.interfaces';
import { Layer } from '../../layer/shared/layers/layer';
import { QueryOptions } from './query.interfaces';
export declare class QueryService {
    private http;
    queryEnabled: boolean;
    constructor(http: HttpClient);
    query(layers: Layer[], options: QueryOptions): Observable<Feature[]>[];
    queryLayer(layer: Layer, options: QueryOptions): Observable<Feature[]>;
    private extractData;
    private extractGML2Data;
    private extractGML3Data;
    private extractGeoJSONData;
    private extractEsriJSONData;
    private extractTextData;
    private extractHtmlData;
    private getQueryParams;
    private featureToResult;
    private getQueryUrl;
    private getMimeInfoFormat;
}
