import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@igo2/core';
import { DirectionsSource } from './directions-source';
import { OsrmDirectionsSource } from './osrm-directions-source';
export declare function osrmDirectionsSourcesFactory(http: HttpClient, config: ConfigService): OsrmDirectionsSource;
export declare function provideOsrmDirectionsSource(): {
    provide: typeof DirectionsSource;
    useFactory: typeof osrmDirectionsSourcesFactory;
    multi: boolean;
    deps: (typeof HttpClient | typeof ConfigService)[];
};
