import { Observable } from 'rxjs';
import { Directions, DirectionsOptions } from '../shared/directions.interface';
import { DirectionsSource } from '../directions-sources/directions-source';
import { DirectionsSourceService } from './directions-source.service';
export declare class DirectionsService {
    private directionsSourceService;
    constructor(directionsSourceService: DirectionsSourceService);
    route(coordinates: [number, number][], directionsOptions?: DirectionsOptions): Observable<Directions[]>[];
    routeSource(source: DirectionsSource, coordinates: [number, number][], directionsOptions?: DirectionsOptions): Observable<Directions[]>;
}
