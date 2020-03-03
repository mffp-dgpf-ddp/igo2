import { MapService } from '../../map/shared/map.service';
import { TextSearchOptions, ReverseSearchOptions } from './sources/source.interfaces';
import { SearchSourceService } from './search-source.service';
import { Research } from './search.interfaces';
/**
 * This service perform researches in all the search sources enabled.
 * It returns Research objects who's 'request' property needs to be
 * subscribed to in order to trigger the research. This services has
 * keeps internal state of the researches it performed
 * and the results they yielded.
 */
export declare class SearchService {
    private searchSourceService;
    private mapService;
    constructor(searchSourceService: SearchSourceService, mapService: MapService);
    /**
     * Perform a research by text
     * @param term Any text
     * @returns Researches
     */
    search(term: string, options?: TextSearchOptions): Research[];
    /**
     * Perform a research by lon/lat
     * @param lonLat Any lon/lat coordinates
     * @returns Researches
     */
    reverseSearch(lonLat: [number, number], options?: ReverseSearchOptions, asPointerSummary?: boolean): Research[];
    /**
     * Create a text research out of all given search sources
     * @param sources Search sources that implement TextSearch
     * @param term Search term
     * @returns Observable of Researches
     */
    private searchSources;
    /**
     * Create a reverse research out of all given search sources
     * @param sources Search sources that implement ReverseSearch
     * @param lonLat Any lon/lat coordinates
     * @returns Observable of Researches
     */
    private reverseSearchSources;
    /**
     * Validate that a search term is valid
     * @param term Search term
     * @returns True if the search term is valid
     */
    private termIsValid;
}
