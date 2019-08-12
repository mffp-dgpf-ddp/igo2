export declare class RoutingFormService {
    private stopsCoordinates;
    private mapWaitingForRoutingClick;
    constructor();
    getStopsCoordinates(): [number, number][];
    setStopsCoordinates(stopsCoordinates: any): void;
    isMapWaitingForRoutingClick(): boolean;
    setMapWaitingForRoutingClick(): void;
    unsetMapWaitingForRoutingClick(): void;
}
