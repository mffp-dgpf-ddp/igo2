import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
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
    private languageService;
    private formatter;
    static id: string;
    static type: string;
    static propertiesBlacklist: string[];
    title$: BehaviorSubject<string>;
    private hashtagsLieuxToKeep;
    readonly title: string;
    constructor(http: HttpClient, languageService: LanguageService, options: SearchSourceOptions, formatter: IChercheSearchResultFormatter, injector: Injector);
    getId(): string;
    getType(): string;
    protected getDefaultOptions(): SearchSourceOptions;
    /**
     * Search a location by name or keyword
     * @param term Location name or keyword
     * @returns Observable of <SearchResult<Feature>[]
     */
    search(term: string, options?: TextSearchOptions): Observable<SearchResult<Feature>[]>;
    private getAllowedTypes;
    private computeRequestParams;
    private extractResults;
    private dataToResult;
    private computeProperties;
    /**
     * Remove hashtag from query
     * @param term Query with hashtag
     */
    private computeTerm;
    /**
     * Add hashtag to param if valid
     * @param term Query with hashtag
     * @param options TextSearchOptions
     */
    private computeOptionsParam;
}
/**
 * IChercheReverse search source
 */
export declare class IChercheReverseSearchSource extends SearchSource implements ReverseSearch {
    private http;
    private languageService;
    static id: string;
    static type: string;
    static propertiesBlacklist: string[];
    title$: BehaviorSubject<string>;
    readonly title: string;
    constructor(http: HttpClient, languageService: LanguageService, options: SearchSourceOptions, injector: Injector);
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
    private getAllowedTypes;
    private computeRequestParams;
    private extractResults;
    private getSubtitle;
    private dataToResult;
    private computeProperties;
    private computeExtent;
}
