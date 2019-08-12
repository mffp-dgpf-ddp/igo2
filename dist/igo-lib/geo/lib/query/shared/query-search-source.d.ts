import { SearchSource } from '../../search/shared/sources/source';
import { SearchSourceOptions } from '../../search/shared/sources/source.interfaces';
/**
 * Map search source. For now it has no search capability. All it does
 * is act as a placeholder for the map query results' "search source".
 */
export declare class QuerySearchSource extends SearchSource {
    static id: string;
    static type: string;
    constructor(options: SearchSourceOptions);
    getId(): string;
    protected getDefaultOptions(): SearchSourceOptions;
}
