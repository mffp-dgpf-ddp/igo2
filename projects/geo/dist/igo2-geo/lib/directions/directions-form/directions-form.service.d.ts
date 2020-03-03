import { Stop } from '../shared/directions.interface';
export declare class DirectionsFormService {
    private stops;
    constructor();
    getStopsCoordinates(): [number, number][];
    setStops(stops: Stop[]): void;
    getStops(): Stop[];
}
