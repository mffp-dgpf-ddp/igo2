import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '@igo2/core';
import { Directions, DirectionsOptions } from '../shared/directions.interface';
import { DirectionsSource } from './directions-source';
export declare class OsrmDirectionsSource extends DirectionsSource {
    private http;
    private config;
    enabled: boolean;
    static _name: string;
    private directionsUrl;
    private options;
    constructor(http: HttpClient, config: ConfigService);
    getName(): string;
    route(coordinates: [number, number][], directionsOptions?: DirectionsOptions): Observable<Directions[]>;
    private extractRoutesData;
    private getRouteParams;
    private formatRoute;
}
