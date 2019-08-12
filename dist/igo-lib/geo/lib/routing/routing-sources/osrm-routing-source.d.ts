import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '@igo2/core';
import { Routing } from '../shared/routing.interface';
import { RoutingSource } from './routing-source';
export declare class OsrmRoutingSource extends RoutingSource {
    private http;
    private config;
    enabled: boolean;
    static _name: string;
    private routingUrl;
    private options;
    constructor(http: HttpClient, config: ConfigService);
    getName(): string;
    route(coordinates: [number, number][]): Observable<Routing[]>;
    private extractRoutesData;
    private getRouteParams;
    private formatRoute;
}
