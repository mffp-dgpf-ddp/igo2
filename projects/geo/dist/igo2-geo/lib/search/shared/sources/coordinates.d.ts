import { Observable, BehaviorSubject } from 'rxjs';
import { Feature } from '../../../feature';
import { SearchResult } from '../search.interfaces';
import { SearchSource, ReverseSearch } from './source';
import { SearchSourceOptions, TextSearchOptions } from './source.interfaces';
import { LanguageService } from '@igo2/core';
import { Projection } from '../../../map/shared/projection.interfaces';
export declare class CoordinatesSearchResultFormatter {
    private languageService;
    constructor(languageService: LanguageService);
    formatResult(result: SearchResult<Feature>): SearchResult<Feature>;
}
/**
 * CoordinatesReverse search source
 */
export declare class CoordinatesReverseSearchSource extends SearchSource implements ReverseSearch {
    private languageService;
    static id: string;
    static type: string;
    private projections;
    title$: BehaviorSubject<string>;
    readonly title: string;
    constructor(options: SearchSourceOptions, languageService: LanguageService, projections: Projection[]);
    getId(): string;
    getType(): string;
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
