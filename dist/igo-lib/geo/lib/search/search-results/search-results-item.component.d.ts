import { SearchResult } from '../shared/search.interfaces';
/**
 * Search results list item
 */
export declare class SearchResultsItemComponent {
    /**
     * Search result item
     */
    result: SearchResult;
    /**
     * Search result title
     * @internal
     */
    readonly title: string;
    /**
     * Search result HTML title
     * @internal
     */
    readonly titleHtml: string;
    /**
     * Search result icon
     * @internal
     */
    readonly icon: string;
    constructor();
}
