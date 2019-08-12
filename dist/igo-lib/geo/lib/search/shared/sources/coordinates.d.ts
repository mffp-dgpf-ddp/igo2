import { Observable } from 'rxjs';
import { Feature } from '../../../feature';
import { SearchResult } from '../search.interfaces';
import { SearchSource, ReverseSearch } from './source';
import { SearchSourceOptions, TextSearchOptions } from './source.interfaces';
import { LanguageService } from '@igo2/core';
export declare class CoordinatesSearchResultFormatter {
    private languageService;
    constructor(languageService: LanguageService);
    formatResult(result: SearchResult<Feature>): SearchResult<Feature>;
}
/**
 * CoordinatesReverse search source
 */
export declare class CoordinatesReverseSearchSource extends SearchSource implements ReverseSearch {
    static id: string;
    static type: string;
    constructor(options: SearchSourceOptions);
    getId(): string;
    protected getDefaultOptions(): SearchSourceOptions;
    /**
     * Search a location by coordinates
     * @param lonLat Location coordinates
     * @param distance Search raidus around lonLat
     * @returns Observable of <SearchResult<Feature>[]
     */
    reverseSearch(lonLat: [number, number], options?: TextSearchOptions): Observable<SearchResult<Feature>[]>;
    private dataToResult;
}
