import { EventEmitter, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityStore } from '@igo2/common';
import { SearchResult } from '../shared/search.interfaces';
import { SearchSource } from '../shared/sources/source';
export declare enum SearchResultMode {
    Grouped = "grouped",
    Flat = "flat"
}
/**
 * List of search results with focus and selection capabilities.
 * This component is dumb and only emits events.
 */
export declare class SearchResultsComponent implements OnInit, OnDestroy {
    private cdRef;
    /**
     * Reference to the SearchResultMode enum
     * @internal
     */
    searchResultMode: typeof SearchResultMode;
    /**
     * Search results store watcher
     */
    private watcher;
    /**
     * Search results store
     */
    store: EntityStore<SearchResult>;
    /**
     * Search results display mode
     */
    mode: SearchResultMode;
    /**
     * Event emitted when a result is focused
     */
    resultFocus: EventEmitter<SearchResult<{
        [key: string]: any;
    }>>;
    /**
     * Event emitted when a result is selected
     */
    resultSelect: EventEmitter<SearchResult<{
        [key: string]: any;
    }>>;
    readonly results$: Observable<{
        source: SearchSource;
        results: SearchResult[];
    }[]>;
    private _results$;
    constructor(cdRef: ChangeDetectorRef);
    /**
     * Bind the search results store to the watcher
     * @internal
     */
    ngOnInit(): void;
    /**
     * Unbind the search results store from the watcher
     * @internal
     */
    ngOnDestroy(): void;
    /**
     * When a result is focused, update it's state in the store and emit
     * an event.
     * @param result Search result
     * @internal
     */
    onResultFocus(result: SearchResult): void;
    /**
     * Compute a group title
     * @param group Search results group
     * @returns Group title
     * @internal
     */
    computeGroupTitle(group: {
        source: SearchSource;
        results: SearchResult[];
    }): string;
    /**
     * When a result is selected, update it's state in the store and emit
     * an event. A selected result is also considered focused
     * @param result Search result
     * @internal
     */
    onResultSelect(result: SearchResult): void;
    /**
     * Return an observable of the search results, grouped by search source
     * @returns Observable of grouped search results
     * @internal
     */
    private liftResults;
    /**
     * Sort the results by display order.
     * @param r1 First result
     * @param r2 Second result
     */
    private sortByOrder;
    /**
     * Group results by search source
     * @param results Search results from all sources
     * @returns Search results grouped by source
     */
    private groupResults;
}
