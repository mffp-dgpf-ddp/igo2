import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import olFeature from 'ol/Feature';
import { Feature } from '../../feature/shared/feature.interfaces';
import { Layer } from '../../layer/shared/layers/layer';
import { QueryOptions } from './query.interfaces';
export declare class QueryService {
    private http;
    queryEnabled: boolean;
    constructor(http: HttpClient);
    query(layers: Layer[], options: QueryOptions): Observable<Feature[]>[];
    queryLayer(layer: Layer, options: QueryOptions): Observable<Feature[]>;
    private mergeGML;
    cross(a: any, b: any, o: any): number;
    /**
     * @param points An array of [X, Y] coordinates
     * This method is use instead of turf.js convexHull because Turf needs at least 3 point to make a hull.
     * https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain#JavaScript
     */
    convexHull(points: any): any[];
    private extractData;
    private createGeometryFromUrlClick;
    private extractGML2Data;
    private extractGML3Data;
    private extractGeoJSONData;
    private extractEsriJSONData;
    private extractTextData;
    private extractHtmlData;
    private getQueryParams;
    featureToResult(featureOL: olFeature, zIndex: number, allowedFieldsAndAlias?: any): Feature;
    private getQueryUrl;
    private getMimeInfoFormat;
    getAllowedFieldsAndAlias(layer: any): any;
    getQueryTitle(feature: Feature, layer: Layer): string;
    getLabelMatch(feature: Feature, labelMatch: any): string;
}
