import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feature } from '../../../feature';
import { SearchResult } from '../search.interfaces';
import { SearchSource, TextSearch, ReverseSearch } from './source';
import { SearchSourceOptions, TextSearchOptions, ReverseSearchOptions } from './source.interfaces';
import { StoredQueriesSearchSourceOptions, StoredQueriesReverseSearchSourceOptions } from './storedqueries.interfaces';
/**
 * StoredQueries search source
 */
export declare class StoredQueriesSearchSource extends SearchSource implements TextSearch {
    private http;
    static id: string;
    static type: string;
    static propertiesBlacklist: string[];
    resultTitle: 'title';
    storedQueriesOptions: StoredQueriesSearchSourceOptions;
    multipleFieldsQuery: boolean;
    constructor(http: HttpClient, options: SearchSourceOptions);
    getId(): string;
    getType(): string;
    protected getDefaultOptions(): SearchSourceOptions;
    /**
     * Search a location by name or keyword
     * @param term Location name or keyword
     * @returns Observable of <SearchResult<Feature>[]
     */
    search(term: string, options?: TextSearchOptions): Observable<SearchResult<Feature>[]>;
    private getFormatFromOptions;
    private extractWFSData;
    private termSplitter;
    private computeRequestParams;
    private extractResults;
    private dataToResult;
    private computeProperties;
}
/**
 * StoredQueriesReverse search source
 */
export declare class StoredQueriesReverseSearchSource extends SearchSource implements ReverseSearch {
    private http;
    static id: string;
    static type: string;
    static propertiesBlacklist: string[];
    resultTitle: 'title';
    storedQueriesOptions: StoredQueriesReverseSearchSourceOptions;
    multipleFieldsQuery: boolean;
    constructor(http: HttpClient, options: SearchSourceOptions);
    getId(): string;
    getType(): string;
    protected getDefaultOptions(): SearchSourceOptions;
    /**
     * Search a location by coordinates
     * @param lonLat Location coordinates
     * @param distance Search raidus around lonLat
     * @returns Observable of <SearchResult<Feature>[]
     */
    reverseSearch(lonLat: [number, number], options?: ReverseSearchOptions): Observable<SearchResult<Feature>[]>;
    private getFormatFromOptions;
    private extractWFSData;
    private computeRequestParams;
    private extractResults;
    private dataToResult;
    private computeProperties;
}
