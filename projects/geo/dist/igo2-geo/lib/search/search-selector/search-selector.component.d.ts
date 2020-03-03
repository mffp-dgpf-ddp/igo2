import { EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchSourceService } from '../shared/search-source.service';
/**
 * This component allows a user to select a search type yo enable. In it's
 * current version, only one search type can be selected at once (radio). If
 * this component were to support more than one search source enabled (checkbox),
 * the searchbar component would require a small change to it's
 * placeholder getter. The search source service already supports having
 * more than one search source enabled.
 */
export declare class SearchSelectorComponent implements OnInit, OnDestroy {
    private searchSourceService;
    readonly searchType$: BehaviorSubject<string>;
    /**
     * Subscription to the search type
     */
    private searchType$$;
    /**
     * List of available search types
     */
    searchTypes: string[];
    /**
     * The search type enabled
     */
    searchType: string;
    /**
     * Event emitted when the enabled search type changes
     */
    searchTypeChange: EventEmitter<string>;
    constructor(searchSourceService: SearchSourceService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Enable the selected search type
     * @param searchType Search type
     * @internal
     */
    onSearchTypeChange(searchType: string): void;
    /**
     * Get a search type's title. The title
     * for all availables search typers needs to be defined in the locale
     * files or an error will be thrown.
     * @param searchType Search type
     * @internal
     */
    getSearchTypeTitle(searchType: string): string;
    /**
     * Emit an event and enable the search sources of the given type.
     * @param searchType Search type
     */
    private setSearchType;
    private onSetSearchType;
}
