import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LanguageService } from '@igo2/core';
import { Feature } from '../../../feature';
import { SearchResult } from '../search.interfaces';
import { SearchSource, TextSearch, ReverseSearch } from './source';
import { SearchSourceOptions, TextSearchOptions, ReverseSearchOptions } from './source.interfaces';
export declare class IChercheSearchResultFormatter {
    private languageService;
    constructor(languageService: LanguageService);
    formatResult(result: SearchResult<Feature>): SearchResult<Feature>;
}
/**
 * ICherche search source
 */
export declare class IChercheSearchSource extends SearchSource implements TextSearch {
    private http;
    private formatter;
    static id: string;
    static type: string;
    static propertiesBlacklist: string[];
    constructor(http: HttpClient, options: SearchSourceOptions, formatter: IChercheSearchResultFormatter);
    getId(): string;
    protected getDefaultOptions(): SearchSourceOptions;
    /**
     * Search a location by name or keyword
     * @param term Location name or keyword
     * @returns Observable of <SearchResult<Feature>[]
     */
    search(term: string, options?: TextSearchOptions): Observable<SearchResult<Feature>[]>;
    private computeRequestParams;
    private extractResults;
    private dataToResult;
    private computeProperties;
}
/**
 * IChercheReverse search source
 */
export declare class IChercheReverseSearchSource extends SearchSource implements ReverseSearch {
    private http;
    static id: string;
    static type: string;
    static propertiesBlacklist: string[];
    constructor(http: HttpClient, options: SearchSourceOptions);
    getId(): string;
    protected getDefaultOptions(): SearchSourceOptions;
    /**
     * Search a location by coordinates
     * @param lonLat Location coordinates
     * @param distance Search raidus around lonLat
     * @returns Observable of <SearchResult<Feature>[]
     */
    reverseSearch(lonLat: [number, number], options?: ReverseSearchOptions): Observable<SearchResult<Feature>[]>;
    private computeRequestParams;
    private extractResults;
    private dataToResult;
    private computeProperties;
    private computeExtent;
}
