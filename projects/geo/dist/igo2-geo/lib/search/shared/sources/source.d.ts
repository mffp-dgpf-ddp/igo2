import { Observable } from 'rxjs';
import { SearchResult } from '../search.interfaces';
import { SearchSourceOptions, TextSearchOptions, ReverseSearchOptions, SearchSourceSettings } from './source.interfaces';
/**
 * Base search source class
 */
export declare class SearchSource {
    /**
     * Search source ID
     * @internal
     */
    static id: string;
    /**
     * Search source type
     * @internal
     */
    static type: string;
    /**
     * Search source options
     * @internal
     */
    protected options: SearchSourceOptions;
    /**
     * Get search source's id
     * @returns Search source's id
     */
    getId(): string;
    /**
     * Get search source's type
     * @returns Search source's type
     */
    getType(): string;
    /**
     * Get search source's default options
     * @returns Search source default options
     */
    protected getDefaultOptions(): SearchSourceOptions;
    /**
     * Search source's title
     */
    readonly title: string;
    /**
     * Whether the search source is available
     */
    readonly available: boolean;
    /**
     * Whether the search source is enabled
     */
    enabled: boolean;
    readonly showInPointerSummary: boolean;
    readonly showInSettings: boolean;
    /**
     * Search url
     */
    readonly searchUrl: string;
    /**
     * Search query params
     */
    readonly params: {
        [key: string]: string;
    };
    /**
     * Search settings
     */
    readonly settings: SearchSourceSettings[];
    /**
     * Set params from selected settings
     */
    setParamFromSetting(setting: SearchSourceSettings): void;
    /**
     * Search results display order
     */
    readonly displayOrder: number;
    constructor(options: SearchSourceOptions);
    /**
     * Get hashtags valid
     * @param hashtag hashtag from query
     */
    getHashtagsValid(term: string, settingsName: string): string[];
    getSettingsValues(search: string): SearchSourceSettings;
}
/**
 * Search sources that allow searching by text implement this class
 */
export interface TextSearch {
    /**
     * Search by text
     * @param term Text
     * @param options Optional: TextSearchOptions
     * @returns Observable or search results
     */
    search(term: string | undefined, options?: TextSearchOptions): Observable<SearchResult[]>;
}
/**
 * Search sources that allow searching by coordinates implement this class
 */
export interface ReverseSearch {
    /**
     * Search by text
     * @param lonLat Coordinates
     * @param options Optional: ReverseSearchOptions
     * @returns Observable or search results
     */
    reverseSearch(lonLat: [number, number], options?: ReverseSearchOptions): Observable<SearchResult[]>;
}
