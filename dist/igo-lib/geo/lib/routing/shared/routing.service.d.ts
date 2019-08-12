import { Observable } from 'rxjs';
import { Routing } from '../shared/routing.interface';
import { RoutingSource } from '../routing-sources/routing-source';
import { RoutingSourceService } from './routing-source.service';
export declare class RoutingService {
    private routingSourceService;
    constructor(routingSourceService: RoutingSourceService);
    route(coordinates: [number, number][]): Observable<Routing[]>[];
    routeSource(source: RoutingSource, coordinates: [number, number][]): Observable<Routing[]>;
}
