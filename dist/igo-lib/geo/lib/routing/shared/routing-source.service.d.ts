import { RoutingSource } from '../routing-sources/routing-source';
export declare class RoutingSourceService {
    sources: RoutingSource[];
    constructor(sources: RoutingSource[]);
}
export declare function routingSourceServiceFactory(sources: RoutingSource[]): RoutingSourceService;
export declare function provideRoutingSourceService(): {
    provide: typeof RoutingSourceService;
    useFactory: typeof routingSourceServiceFactory;
    deps: (typeof RoutingSource)[];
};
