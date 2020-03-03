import { EventEmitter } from '@angular/core';
import { SearchResult } from '../shared/search.interfaces';
import { IgoMap } from '../../map';
/**
 * Search results list item
 */
export declare class SearchResultsItemComponent {
    /**
     * Search result item
     */
    result: SearchResult;
    map: IgoMap;
    /**
     * Search result title
     * @internal
     */
    /**
     * to show hide results icons
     */
    showIcons: boolean;
    /**
     * Whether there should be a zoom button
     */
    withZoomButton: boolean;
    zoomEvent: EventEmitter<boolean>;
    private format;
    readonly title: string;
    /**
     * Search result HTML title
     * @internal
     */
    readonly titleHtml: string;
    /**
     * Search result tooltip
     * @internal
     */
    readonly tooltipHtml: string;
    /**
     * Search result icon
     * @internal
     */
    readonly icon: string;
    constructor();
    onZoomHandler(): void;
}
