import { SearchSource } from './sources/source';
import { SearchSourceService } from './search-source.service';
/**
 * Search source factory
 * @ignore
 */
export declare function searchSourceServiceFactory(sources: SearchSource[]): SearchSourceService;
/**
 * Function that returns a provider for the SearchSource service
 */
export declare function provideSearchSourceService(): {
    provide: typeof SearchSourceService;
    useFactory: typeof searchSourceServiceFactory;
    deps: (typeof SearchSource)[];
};
