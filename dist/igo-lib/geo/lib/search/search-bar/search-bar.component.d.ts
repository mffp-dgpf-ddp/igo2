import { OnInit, OnDestroy, EventEmitter, ElementRef } from '@angular/core';
import { FloatLabelType } from '@angular/material';
import { EntityStore } from '@igo2/common';
import { SearchResult, Research } from '../shared/search.interfaces';
import { SearchService } from '../shared/search.service';
/**
 * Searchbar that triggers a research in all search sources enabled.
 * If the store input is defined, the search results will be loaded
 * into that store. An event is always emitted when a research is completed.
 */
export declare class SearchBarComponent implements OnInit, OnDestroy {
    private searchService;
    /**
     * Invalid keys
     */
    private readonly invalidKeys;
    /**
     * Search term stream
     */
    private stream$;
    /**
     * Subscription to the search term stream
     */
    private stream$$;
    /**
     * Search term
     */
    term: string;
    /**
     * Whether a float label should be displayed
     */
    floatLabel: FloatLabelType;
    /**
     * Whether this component is disabled
     */
    disabled: boolean;
    /**
     * Icons color (search and clear)
     */
    color: string;
    /**
     * Debounce time between each keystroke
     */
    debounce: number;
    /**
     * Minimum term length required to trigger a research
     */
    minLength: number;
    /**
     * Search icon
     */
    searchIcon: string;
    /**
     * Search results store
     */
    store: EntityStore<SearchResult>;
    /**
     * List of available search types
     */
    searchTypes: string[];
    /**
     * Event emitted when the search term changes
     */
    change: EventEmitter<string>;
    /**
     * Event emitted when a research is completed
     */
    search: EventEmitter<{
        research: Research;
        results: SearchResult<{
            [key: string]: any;
        }>[];
    }>;
    /**
     * Event emitted when the search type changes
     */
    searchTypeChange: EventEmitter<string>;
    /**
     * Event emitted when the search type changes
     */
    clearFeature: EventEmitter<{}>;
    /**
     * Input element
     * @internal
     */
    input: ElementRef;
    /**
     * Host's empty class
     * @internal
     */
    readonly emptyClass: boolean;
    /**
     * Whether the search bar is empty
     * @internal
     */
    readonly empty: boolean;
    /**
     * Search bar palceholder
     * @internal
     */
    placeholder: string;
    private _placeholder;
    constructor(searchService: SearchService);
    /**
     * Subscribe to the search term stream and trigger researches
     * @internal
     */
    ngOnInit(): void;
    /**
     * Unsubscribe to the search term stream
     * @internal
     */
    ngOnDestroy(): void;
    /**
     * When a user types, validates the key and send it into the
     * stream if it's valid
     * @param event Keyboard event
     * @internal
     */
    onKeyup(event: KeyboardEvent): void;
    /**
     * Clear the stream and the input
     * @internal
     */
    onClearButtonClick(): void;
    /**
     * Update the placeholder with the enabled search type. The placeholder
     * for all availables search typers needs to be defined in the locale
     * files or an error will be thrown.
     * @param searchType Enabled search type
     * @internal
     */
    onSearchTypeChange(searchType: string): void;
    /**
     * Send the term into the stream only if this component is not disabled
     * @param term Search term
     */
    setTerm(term: string): void;
    /**
     * Clear the stream and the input
     */
    private clear;
    /**
     * Validate if a given key stroke is a valid input
     */
    private keyIsValid;
    /**
     * When the search term changes, emit an event and trigger a
     * research in every enabled search sources.
     * @param term Search term
     */
    private onTermChange;
    /**
     * Execute the search
     * @param term Search term
     */
    private doSearch;
    /**
     * When a research  is completed, emit an event and update
     * the store's items.
     * @param research Research
     * @param results Research results
     */
    private onResearchCompleted;
}
