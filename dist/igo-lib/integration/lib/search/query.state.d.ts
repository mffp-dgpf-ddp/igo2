import { EntityStore } from '@igo2/common';
import { SearchResult } from '@igo2/geo';
/**
 * Service that holds the state of the query module
 */
export declare class QueryState {
    /**
     * Store that holds the query results
     */
    store: EntityStore<SearchResult>;
    constructor();
}
