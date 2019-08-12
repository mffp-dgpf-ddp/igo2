import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feature } from '../../../feature';
import { SearchResult } from '../search.interfaces';
import { SearchSource, TextSearch } from './source';
import { SearchSourceOptions, TextSearchOptions } from './source.interfaces';
/**
 * Nominatim search source
 */
export declare class NominatimSearchSource extends SearchSource implements TextSearch {
    private http;
    static id: string;
    static type: string;
    constructor(http: HttpClient, options: SearchSourceOptions);
    getId(): string;
    protected getDefaultOptions(): SearchSourceOptions;
    /**
     * Search a place by name
     * @param term Place name
     * @returns Observable of <SearchResult<Feature>[]
     */
    search(term: string | undefined, options?: TextSearchOptions): Observable<SearchResult<Feature>[]>;
    private computeSearchRequestParams;
    private extractResults;
    private dataToResult;
    private computeProperties;
    private computeGeometry;
    private computeExtent;
}
