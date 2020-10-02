import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@igo2/core';
import { SearchSource } from './source';
import { CadastreSearchSource } from './cadastre';
/**
 * Cadastre search source factory
 * @ignore
 */
export declare function cadastreSearchSourceFactory(http: HttpClient, config: ConfigService): CadastreSearchSource;
/**
 * Function that returns a provider for the Cadastre search source
 */
export declare function provideCadastreSearchSource(): {
    provide: typeof SearchSource;
    useFactory: typeof cadastreSearchSourceFactory;
    multi: boolean;
    deps: (typeof HttpClient | typeof ConfigService)[];
};
