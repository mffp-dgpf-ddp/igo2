import { ConfigService } from '@igo2/core';
import { SearchSource } from '../../search/shared/sources/source';
import { QuerySearchSource } from './query-search-source';
/**
 * Map search source factory
 * @ignore
 */
export declare function querySearchSourceFactory(config: ConfigService): QuerySearchSource;
/**
 * Function that returns a provider for the map search source
 */
export declare function provideQuerySearchSource(): {
    provide: typeof SearchSource;
    useFactory: typeof querySearchSourceFactory;
    multi: boolean;
    deps: (typeof ConfigService)[];
};
