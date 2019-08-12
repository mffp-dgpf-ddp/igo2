import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LanguageService } from '@igo2/core';
import { LayerOptions } from '../../../layer';
import { SearchResult } from '../search.interfaces';
import { SearchSource, TextSearch } from './source';
import { TextSearchOptions } from './source.interfaces';
import { ILayerSearchSourceOptions } from './ilayer.interfaces';
/**
 * ILayer search source
 */
export declare class ILayerSearchSource extends SearchSource implements TextSearch {
    private http;
    private languageService;
    static id: string;
    static type: string;
    readonly title: string;
    constructor(http: HttpClient, languageService: LanguageService, options: ILayerSearchSourceOptions);
    getId(): string;
    protected getDefaultOptions(): ILayerSearchSourceOptions;
    /**
     * Search a layer by name or keyword
     * @param term Layer name or keyword
     * @returns Observable of <SearchResult<LayerOptions>[]
     */
    search(term: string | undefined, options?: TextSearchOptions): Observable<SearchResult<LayerOptions>[]>;
    private computeSearchRequestParams;
    private extractResults;
    private dataToResult;
    private computeLayerOptions;
    private extractQueryParamsFromSourceUrl;
}
