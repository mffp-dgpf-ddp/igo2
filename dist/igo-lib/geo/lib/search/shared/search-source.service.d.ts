import { SearchSource } from './sources/source';
/**
 * Service where all available search sources are registered.
 */
export declare class SearchSourceService {
    private sources;
    constructor(sources: SearchSource[]);
    /**
     * Return available search sources
     * @returns Search sources
     */
    getSources(): SearchSource[];
    /**
     * Return enabled search sources
     * @returns Search sources
     */
    getEnabledSources(): SearchSource[];
    /**
     * Enable search sources of given type
     * @param type Search type
     * @todo It would be better to track the enabled search sources
     *  without updating their 'enabled' property.
     */
    enableSourcesByType(type: string): void;
}
