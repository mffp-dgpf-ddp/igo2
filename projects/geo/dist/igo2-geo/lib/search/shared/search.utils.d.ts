import { Feature } from '../../feature/shared/feature.interfaces';
import { SearchSource } from './sources/source';
import { SearchResult } from './search.interfaces';
/**
 * Function that checks whether a search source implements TextSearch
 * @param source Search source
 * @returns True if the search source implements TextSearch
 */
export declare function sourceCanSearch(source: SearchSource): boolean;
/**
 * Function that checks whether a search source implements ReverseSearch
 * @param source Search source
 * @returns True if the search source implements ReverseSearch
 */
export declare function sourceCanReverseSearch(source: SearchSource): boolean;
/**
 * Function that checks whether a search source implements ReverseSearch AND is shown in the pointer summary
 * @param source Search source
 * @returns True if the search source implements ReverseSearch AND is shown in the pointer summary
 */
export declare function sourceCanReverseSearchAsSummary(source: SearchSource): boolean;
/**
 * Return a search result out of an Feature. This is used to adapt
 * the IGO query module to the new Feature/SearchResult interfaces
 * @param feature feature
 * @param source Search source
 * @returns SearchResult
 */
export declare function featureToSearchResult(feature: Feature, source: SearchSource): SearchResult<Feature>;
