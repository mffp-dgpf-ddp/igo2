import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@igo2/core';
import { RoutingSource } from './routing-source';
import { OsrmRoutingSource } from './osrm-routing-source';
export declare function osrmRoutingSourcesFactory(http: HttpClient, config: ConfigService): OsrmRoutingSource;
export declare function provideOsrmRoutingSource(): {
    provide: typeof RoutingSource;
    useFactory: typeof osrmRoutingSourcesFactory;
    multi: boolean;
    deps: (typeof HttpClient | typeof ConfigService)[];
};
