import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@igo2/core';
import { SearchSource } from './source';
import { NominatimSearchSource } from './nominatim';
/**
 * Nominatim search source factory
 * @ignore
 */
export declare function nominatimSearchSourceFactory(http: HttpClient, config: ConfigService): NominatimSearchSource;
/**
 * Function that returns a provider for the Nominatim search source
 */
export declare function provideNominatimSearchSource(): {
    provide: typeof SearchSource;
    useFactory: typeof nominatimSearchSourceFactory;
    multi: boolean;
    deps: (typeof HttpClient | typeof ConfigService)[];
};
