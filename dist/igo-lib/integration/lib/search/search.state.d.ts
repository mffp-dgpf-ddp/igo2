import { EntityStore } from '@igo2/common';
import { SearchResult, SearchSourceService } from '@igo2/geo';
/**
 * Service that holds the state of the search module
 */
export declare class SearchState {
    private searchSourceService;
    /**
     * Store that holds the search results
     */
    store: EntityStore<SearchResult>;
    /**
     * Search types currently enabled in the search source service
     */
    readonly searchTypes: string[];
    constructor(searchSourceService: SearchSourceService);
}
