import { DirectionsSource } from '../directions-sources/directions-source';
export declare class DirectionsSourceService {
    sources: DirectionsSource[];
    constructor(sources: DirectionsSource[]);
}
export declare function directionsSourceServiceFactory(sources: DirectionsSource[]): DirectionsSourceService;
export declare function provideDirectionsSourceService(): {
    provide: typeof DirectionsSourceService;
    useFactory: typeof directionsSourceServiceFactory;
    deps: (typeof DirectionsSource)[];
};
