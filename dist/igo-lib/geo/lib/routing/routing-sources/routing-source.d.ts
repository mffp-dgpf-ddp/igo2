import { Observable } from 'rxjs';
import { Routing } from '../shared/routing.interface';
export declare abstract class RoutingSource {
    abstract enabled: boolean;
    abstract getName(): string;
    abstract route(coordinates: [number, number][]): Observable<Routing[]>;
}
