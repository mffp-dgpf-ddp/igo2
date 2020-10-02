/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { BehaviorSubject, EMPTY, timer } from 'rxjs';
import { debounce, distinctUntilChanged } from 'rxjs/operators';
import { LanguageService } from '@igo2/core';
import { EntityStore } from '@igo2/common';
import { SEARCH_TYPES } from '../shared/search.enums';
import { SearchService } from '../shared/search.service';
/**
 * Searchbar that triggers a research in all search sources enabled.
 * If the store input is defined, the search results will be loaded
 * into that store. An event is always emitted when a research is completed.
 */
export class SearchBarComponent {
    /**
     * @param {?} languageService
     * @param {?} searchService
     */
    constructor(languageService, searchService) {
        this.languageService = languageService;
        this.searchService = searchService;
        this.placeholder$ = new BehaviorSubject('igo.geo.search.placeholder');
        this.empty$ = new BehaviorSubject(true);
        /**
         * Search term stream
         */
        this.stream$ = new BehaviorSubject('');
        /**
         * List of available search types
         */
        this.searchTypes = SEARCH_TYPES;
        this.searchType$ = new BehaviorSubject(undefined);
        /**
         * Event emitted when the pointer summary is activated by the searchbar setting
         */
        this.pointerSummaryStatus = new EventEmitter();
        this.term$ = new BehaviorSubject('');
        this.disabled$ = new BehaviorSubject(false);
        this.pointerSummaryEnabled = false;
        /**
         * Whether a float label should be displayed
         */
        this.floatLabel = 'never';
        /**
         * Icons color (search and clear)
         */
        this.color = 'primary';
        /**
         * Debounce time between each keystroke
         */
        this.debounce = 200;
        /**
         * Minimum term length required to trigger a research
         */
        this.minLength = 2;
        /**
         * Search Selector
         */
        this.searchSelector = false;
        /**
         * Search Settings
         */
        this.searchSettings = false;
        /**
         * Force coordinates in north america
         */
        this.forceNA = false;
        /**
         * Event emitted when the search term changes
         */
        this.searchTermChange = new EventEmitter();
        /**
         * Event emitted when a research is completed
         */
        this.search = new EventEmitter();
        /**
         * Event emitted when the search type changes
         */
        this.searchTypeChange = new EventEmitter();
        /**
         * Event emitted when the search type changes
         */
        this.clearFeature = new EventEmitter();
        /**
         * Event emitted when the search settings changes
         */
        this.searchSettingsChange = new EventEmitter();
    }
    /**
     * Search term
     * @param {?} value
     * @return {?}
     */
    set searchType(value) {
        this.setSearchType(value);
    }
    /**
     * @return {?}
     */
    get searchType() {
        return this.searchType$.value;
    }
    /**
     * Search term
     * @param {?} value
     * @return {?}
     */
    set term(value) {
        this.setTerm(value);
    }
    /**
     * @return {?}
     */
    get term() {
        return this.term$.value;
    }
    /**
     * Whether this component is disabled
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this.disabled$.next(value);
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this.disabled$.value;
    }
    /**
     * Whether the search bar is empty
     * \@internal
     * @return {?}
     */
    get empty() {
        return this.term.length === 0;
    }
    /**
     * Subscribe to the search term stream and trigger researches
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        this.term$$ = this.term$.subscribe((/**
         * @param {?} term
         * @return {?}
         */
        (term) => {
            this.empty$.next(term === undefined || term.length === 0);
        }));
        this.stream$$ = this.stream$
            .pipe(debounce((/**
         * @param {?} term
         * @return {?}
         */
        (term) => (term === '' ? EMPTY : timer(this.debounce)))))
            .subscribe((/**
         * @param {?} term
         * @return {?}
         */
        (term) => this.onSetTerm(term)));
        this.searchType$$ = this.searchType$
            .pipe(distinctUntilChanged())
            .subscribe((/**
         * @param {?} searchType
         * @return {?}
         */
        (searchType) => this.onSetSearchType(searchType)));
    }
    /**
     * Unsubscribe to the search term stream
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        this.term$$.unsubscribe();
        this.stream$$.unsubscribe();
        this.searchType$$.unsubscribe();
    }
    /**
     * When a user types, validates the key and send it into the
     * stream if it's valid
     * \@internal
     * @param {?} event Keyboard event
     * @return {?}
     */
    onKeyup(event) {
        /** @type {?} */
        const key = event.key;
        if (!this.keyIsValid(key)) {
            return;
        }
        /** @type {?} */
        const term = ((/** @type {?} */ (event.target))).value;
        this.setTerm(term);
    }
    /**
     * Clear the stream and the input
     * \@internal
     * @return {?}
     */
    onClearButtonClick() {
        this.clear();
        this.clearFeature.emit();
    }
    /**
     * Update search type
     * \@internal
     * @param {?} searchType Enabled search type
     * @return {?}
     */
    onSearchTypeChange(searchType) {
        this.setSearchType(searchType);
    }
    /**
     * Update the placeholder with the enabled search type. The placeholder
     * for all availables search typers needs to be defined in the locale
     * files or an error will be thrown.
     * \@internal
     * @param {?} searchType Enabled search type
     * @return {?}
     */
    setSearchType(searchType) {
        this.searchType$.next(searchType);
    }
    /**
     * @return {?}
     */
    onSearchSettingsChange() {
        this.doSearch(this.term);
        this.searchSettingsChange.emit();
    }
    /**
     * Send the term into the stream only if this component is not disabled
     * @param {?} term Search term
     * @return {?}
     */
    setTerm(term) {
        if (this.disabled) {
            return;
        }
        term = term || '';
        if (term !== this.term) {
            this.term$.next(term);
        }
        /** @type {?} */
        const slug = term.replace(/(#[^\s]*)/g, '').trim();
        if (slug.length >= this.minLength || slug.length === 0) {
            this.stream$.next(term);
        }
    }
    /**
     * Clear the stream and the input
     * @private
     * @return {?}
     */
    clear() {
        this.term$.next('');
        this.stream$.next('');
        this.input.nativeElement.focus();
    }
    /**
     * Validate if a given key stroke is a valid input
     * @private
     * @param {?} key
     * @return {?}
     */
    keyIsValid(key) {
        return SearchBarComponent.invalidKeys.indexOf(key) === -1;
    }
    /**
     * When the search term changes, emit an event and trigger a
     * research in every enabled search sources.
     * @private
     * @param {?} term Search term
     * @return {?}
     */
    onSetTerm(term) {
        this.searchTermChange.emit(term);
        this.doSearch(term);
    }
    /**
     * @private
     * @param {?} searchType
     * @return {?}
     */
    onSetSearchType(searchType) {
        if (searchType === undefined || searchType === null) {
            return;
        }
        this.searchTypeChange.emit(searchType);
        /** @type {?} */
        const placeholder = `igo.geo.search.${searchType.toLowerCase()}.placeholder`;
        this.placeholder$.next(placeholder);
        this.setTerm(this.term);
    }
    /**
     * Execute the search
     * @private
     * @param {?} term Search term
     * @return {?}
     */
    doSearch(term) {
        if (this.researches$$) {
            this.researches$$.map((/**
             * @param {?} research
             * @return {?}
             */
            research => research.unsubscribe()));
            this.researches$$ = undefined;
        }
        /** @type {?} */
        const slug = term ? term.replace(/(#[^\s]*)/g, '').trim() : '';
        if (slug === '') {
            if (this.store !== undefined) {
                this.store.clear();
            }
            return;
        }
        /** @type {?} */
        const researches = this.searchService.search(term, {
            forceNA: this.forceNA
        });
        this.researches$$ = researches.map((/**
         * @param {?} research
         * @return {?}
         */
        research => {
            return research.request.subscribe((/**
             * @param {?} results
             * @return {?}
             */
            (results) => {
                this.onResearchCompleted(research, results);
            }));
        }));
    }
    /**
     * When a research  is completed, emit an event and update
     * the store's items.
     * @private
     * @param {?} research Research
     * @param {?} results Research results
     * @return {?}
     */
    onResearchCompleted(research, results) {
        this.search.emit({ research, results });
        if (this.store !== undefined) {
            /** @type {?} */
            const newResults = this.store
                .all()
                .filter((/**
             * @param {?} result
             * @return {?}
             */
            result => result.source !== research.source))
                .concat(results);
            this.store.load(newResults);
        }
    }
}
/**
 * Invalid keys
 */
SearchBarComponent.invalidKeys = [
    'Control',
    'Shift',
    'Alt',
    'ArrowDown',
    'ArrowUp',
    'ArrowRight',
    'ArrowLeft'
];
SearchBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-search-bar',
                template: "<div class=\"igo-search-bar-container\" [ngClass]=\"{empty: empty$ | async}\">\r\n  <mat-form-field [floatLabel]=\"floatLabel\">\r\n    <input\r\n      #input\r\n      matInput\r\n      autocomplete=\"off\"\r\n      [ngClass]=\"{'hasSearchIcon': searchIcon}\"\r\n      [disabled]=\"disabled$ | async\"\r\n      [placeholder]=\"(placeholder$ | async) ? (placeholder$.value | translate) : undefined\"\r\n      [value]=\"term$ | async\"\r\n      (keyup)=\"onKeyup($event)\"\r\n      (touchend)=\"onKeyup($event)\">\r\n  </mat-form-field>\r\n\r\n  <div class=\"search-bar-buttons\">\r\n    <button\r\n      mat-icon-button\r\n      [color]=\"color\"\r\n      *ngIf=\"searchIcon !== undefined\">\r\n      <mat-icon svgIcon=\"{{searchIcon}}\"></mat-icon>\r\n    </button>\r\n\r\n    <button\r\n      *ngIf=\"!(empty$ | async)\"\r\n      mat-icon-button\r\n      [color]=\"color\"\r\n      (click)=\"onClearButtonClick()\">\r\n      <mat-icon svgIcon=\"close\"></mat-icon>\r\n    </button>\r\n\r\n    <igo-search-selector\r\n      *ngIf=\"searchSelector\"\r\n      [searchTypes]=\"searchTypes\"\r\n      [searchType]=\"searchType$ | async\"\r\n      (searchTypeChange)=\"onSearchTypeChange($event)\">\r\n    </igo-search-selector>\r\n\r\n    <igo-search-settings\r\n      *ngIf=\"searchSettings\"\r\n      [pointerSummaryEnabled]=\"pointerSummaryEnabled\"\r\n      (pointerSummaryStatus)=\"pointerSummaryStatus.emit($event)\"\r\n      (searchSourceChange)=\"onSearchSettingsChange()\">\r\n    </igo-search-settings>\r\n  </div>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host ::ng-deep .mat-form-field{padding:0 5px}:host ::ng-deep .mat-form-field-wrapper{margin-bottom:-1.5em}:host ::ng-deep span.mat-form-field-label-wrapper{top:-20px}:host ::ng-deep div.mat-form-field-infix{left:5px;right:5px;padding:0 0 12px!important}:host ::ng-deep div.mat-form-field-underline{display:none}.igo-search-bar-container{position:relative;width:100%;display:-webkit-inline-box;display:inline-flex;overflow:hidden}.igo-search-bar-container>mat-form-field{width:calc(100% - (2 * 40px))}.igo-search-bar-container.empty>mat-form-field{width:calc(100% - 40px)}.search-bar-buttons{position:relative;right:0;display:-webkit-inline-box;display:inline-flex;top:0}.search-bar-buttons>button:nth-child(2)::before{content:'';left:0;top:5px;border-right:1px solid #ddd;height:28px}igo-search-selector,igo-search-settings{background-color:#fff;top:0;border-radius:0}"]
            }] }
];
/** @nocollapse */
SearchBarComponent.ctorParameters = () => [
    { type: LanguageService },
    { type: SearchService }
];
SearchBarComponent.propDecorators = {
    searchTypes: [{ type: Input }],
    searchType: [{ type: Input }],
    pointerSummaryStatus: [{ type: Output }],
    term: [{ type: Input }],
    disabled: [{ type: Input }],
    pointerSummaryEnabled: [{ type: Input }],
    floatLabel: [{ type: Input }],
    color: [{ type: Input }],
    debounce: [{ type: Input }],
    minLength: [{ type: Input }],
    searchIcon: [{ type: Input }],
    searchSelector: [{ type: Input }],
    searchSettings: [{ type: Input }],
    forceNA: [{ type: Input }],
    store: [{ type: Input }],
    searchTermChange: [{ type: Output }],
    search: [{ type: Output }],
    searchTypeChange: [{ type: Output }],
    clearFeature: [{ type: Output }],
    searchSettingsChange: [{ type: Output }],
    input: [{ type: ViewChild, args: ['input',] }]
};
if (false) {
    /**
     * Invalid keys
     * @type {?}
     */
    SearchBarComponent.invalidKeys;
    /** @type {?} */
    SearchBarComponent.prototype.placeholder$;
    /** @type {?} */
    SearchBarComponent.prototype.empty$;
    /**
     * Subscription to the ssearch bar term
     * @type {?}
     * @private
     */
    SearchBarComponent.prototype.term$$;
    /**
     * Search term stream
     * @type {?}
     * @private
     */
    SearchBarComponent.prototype.stream$;
    /**
     * Subscription to the search term stream
     * @type {?}
     * @private
     */
    SearchBarComponent.prototype.stream$$;
    /**
     * Subscription to the search type
     * @type {?}
     * @private
     */
    SearchBarComponent.prototype.searchType$$;
    /**
     * @type {?}
     * @private
     */
    SearchBarComponent.prototype.researches$$;
    /**
     * List of available search types
     * @type {?}
     */
    SearchBarComponent.prototype.searchTypes;
    /** @type {?} */
    SearchBarComponent.prototype.searchType$;
    /**
     * Event emitted when the pointer summary is activated by the searchbar setting
     * @type {?}
     */
    SearchBarComponent.prototype.pointerSummaryStatus;
    /** @type {?} */
    SearchBarComponent.prototype.term$;
    /** @type {?} */
    SearchBarComponent.prototype.disabled$;
    /** @type {?} */
    SearchBarComponent.prototype.pointerSummaryEnabled;
    /**
     * Whether a float label should be displayed
     * @type {?}
     */
    SearchBarComponent.prototype.floatLabel;
    /**
     * Icons color (search and clear)
     * @type {?}
     */
    SearchBarComponent.prototype.color;
    /**
     * Debounce time between each keystroke
     * @type {?}
     */
    SearchBarComponent.prototype.debounce;
    /**
     * Minimum term length required to trigger a research
     * @type {?}
     */
    SearchBarComponent.prototype.minLength;
    /**
     * Search icon
     * @type {?}
     */
    SearchBarComponent.prototype.searchIcon;
    /**
     * Search Selector
     * @type {?}
     */
    SearchBarComponent.prototype.searchSelector;
    /**
     * Search Settings
     * @type {?}
     */
    SearchBarComponent.prototype.searchSettings;
    /**
     * Force coordinates in north america
     * @type {?}
     */
    SearchBarComponent.prototype.forceNA;
    /**
     * Search results store
     * @type {?}
     */
    SearchBarComponent.prototype.store;
    /**
     * Event emitted when the search term changes
     * @type {?}
     */
    SearchBarComponent.prototype.searchTermChange;
    /**
     * Event emitted when a research is completed
     * @type {?}
     */
    SearchBarComponent.prototype.search;
    /**
     * Event emitted when the search type changes
     * @type {?}
     */
    SearchBarComponent.prototype.searchTypeChange;
    /**
     * Event emitted when the search type changes
     * @type {?}
     */
    SearchBarComponent.prototype.clearFeature;
    /**
     * Event emitted when the search settings changes
     * @type {?}
     */
    SearchBarComponent.prototype.searchSettingsChange;
    /**
     * Input element
     * \@internal
     * @type {?}
     */
    SearchBarComponent.prototype.input;
    /**
     * @type {?}
     * @private
     */
    SearchBarComponent.prototype.languageService;
    /**
     * @type {?}
     * @private
     */
    SearchBarComponent.prototype.searchService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NlYXJjaC1iYXIvc2VhcmNoLWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBR1QsdUJBQXVCLEVBQ3ZCLEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFNBQVMsRUFDVCxVQUFVLEVBQ1gsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLGVBQWUsRUFBZ0IsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRSxPQUFPLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFaEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7OztBQWF6RCxNQUFNLE9BQU8sa0JBQWtCOzs7OztJQWtMN0IsWUFDVSxlQUFnQyxFQUNoQyxhQUE0QjtRQUQ1QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUF0SzdCLGlCQUFZLEdBQTRCLElBQUksZUFBZSxDQUNsRSw0QkFBNEIsQ0FDN0IsQ0FBQztRQUVPLFdBQU0sR0FBNkIsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7UUFVOUQsWUFBTyxHQUE0QixJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7OztRQWlCMUQsZ0JBQVcsR0FBYSxZQUFZLENBQUM7UUFZckMsZ0JBQVcsR0FBNEIsSUFBSSxlQUFlLENBQ2pFLFNBQVMsQ0FDVixDQUFDOzs7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Ozs7SUFLbkUsc0NBQStCOzs7Ozs7SUFLL0IsMENBQW1DOzs7OztJQUVuQywwQ0FBcUM7Ozs7O0lBS3JDLHlDQUE4Qzs7SUFZOUMseUNBRUU7Ozs7O0lBS0Ysa0RBQTZEOztJQVk3RCxtQ0FBa0U7O0lBWWxFLHVDQUEwRTs7SUFFMUUsbURBQWdEOzs7OztJQUloRCx3Q0FBOEM7Ozs7O0lBSzlDLG1DQUEyQjs7Ozs7SUFLM0Isc0NBQXdCOzs7OztJQUt4Qix1Q0FBdUI7Ozs7O0lBS3ZCLHdDQUE0Qjs7Ozs7SUFLNUIsNENBQWdDOzs7OztJQUtoQyw0Q0FBZ0M7Ozs7O0lBS2hDLHFDQUF5Qjs7Ozs7SUFLekIsbUNBQTBDOzs7OztJQUsxQyw4Q0FBd0Q7Ozs7O0lBS3hELG9DQUdLOzs7OztJQUtMLDhDQUF3RDs7Ozs7SUFLeEQsMENBQTRDOzs7OztJQUs1QyxrREFBb0Q7Ozs7OztJQU1wRCxtQ0FBc0M7Ozs7O0lBV3BDLDZDQUF3Qzs7Ozs7SUFDeEMsMkNBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIFZpZXdDaGlsZCxcclxuICBFbGVtZW50UmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZsb2F0TGFiZWxUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24sIEVNUFRZLCB0aW1lciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBkZWJvdW5jZSwgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgRW50aXR5U3RvcmUgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgU0VBUkNIX1RZUEVTIH0gZnJvbSAnLi4vc2hhcmVkL3NlYXJjaC5lbnVtcyc7XHJcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCwgUmVzZWFyY2ggfSBmcm9tICcuLi9zaGFyZWQvc2VhcmNoLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlYXJjaC5zZXJ2aWNlJztcclxuXHJcbi8qKlxyXG4gKiBTZWFyY2hiYXIgdGhhdCB0cmlnZ2VycyBhIHJlc2VhcmNoIGluIGFsbCBzZWFyY2ggc291cmNlcyBlbmFibGVkLlxyXG4gKiBJZiB0aGUgc3RvcmUgaW5wdXQgaXMgZGVmaW5lZCwgdGhlIHNlYXJjaCByZXN1bHRzIHdpbGwgYmUgbG9hZGVkXHJcbiAqIGludG8gdGhhdCBzdG9yZS4gQW4gZXZlbnQgaXMgYWx3YXlzIGVtaXR0ZWQgd2hlbiBhIHJlc2VhcmNoIGlzIGNvbXBsZXRlZC5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXNlYXJjaC1iYXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWFyY2gtYmFyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zZWFyY2gtYmFyLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFNlYXJjaEJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAvKipcclxuICAgKiBJbnZhbGlkIGtleXNcclxuICAgKi9cclxuICBzdGF0aWMgaW52YWxpZEtleXMgPSBbXHJcbiAgICAnQ29udHJvbCcsXHJcbiAgICAnU2hpZnQnLFxyXG4gICAgJ0FsdCcsXHJcbiAgICAnQXJyb3dEb3duJyxcclxuICAgICdBcnJvd1VwJyxcclxuICAgICdBcnJvd1JpZ2h0JyxcclxuICAgICdBcnJvd0xlZnQnXHJcbiAgXTtcclxuXHJcbiAgcmVhZG9ubHkgcGxhY2Vob2xkZXIkOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoXHJcbiAgICAnaWdvLmdlby5zZWFyY2gucGxhY2Vob2xkZXInXHJcbiAgKTtcclxuXHJcbiAgcmVhZG9ubHkgZW1wdHkkOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHRydWUpO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIHNzZWFyY2ggYmFyIHRlcm1cclxuICAgKi9cclxuICBwcml2YXRlIHRlcm0kJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggdGVybSBzdHJlYW1cclxuICAgKi9cclxuICBwcml2YXRlIHN0cmVhbSQ6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCgnJyk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgc2VhcmNoIHRlcm0gc3RyZWFtXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdHJlYW0kJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIHNlYXJjaCB0eXBlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZWFyY2hUeXBlJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgcHJpdmF0ZSByZXNlYXJjaGVzJCQ6IFN1YnNjcmlwdGlvbltdO1xyXG5cclxuICAvKipcclxuICAgKiBMaXN0IG9mIGF2YWlsYWJsZSBzZWFyY2ggdHlwZXNcclxuICAgKi9cclxuICBASW5wdXQoKSBzZWFyY2hUeXBlczogc3RyaW5nW10gPSBTRUFSQ0hfVFlQRVM7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCB0ZXJtXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBzZXQgc2VhcmNoVHlwZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnNldFNlYXJjaFR5cGUodmFsdWUpO1xyXG4gIH1cclxuICBnZXQgc2VhcmNoVHlwZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VhcmNoVHlwZSQudmFsdWU7XHJcbiAgfVxyXG4gIHJlYWRvbmx5IHNlYXJjaFR5cGUkOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoXHJcbiAgICB1bmRlZmluZWRcclxuICApO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHBvaW50ZXIgc3VtbWFyeSBpcyBhY3RpdmF0ZWQgYnkgdGhlIHNlYXJjaGJhciBzZXR0aW5nXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHBvaW50ZXJTdW1tYXJ5U3RhdHVzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggdGVybVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHRlcm0odmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5zZXRUZXJtKHZhbHVlKTtcclxuICB9XHJcbiAgZ2V0IHRlcm0oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLnRlcm0kLnZhbHVlO1xyXG4gIH1cclxuICByZWFkb25seSB0ZXJtJDogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KCcnKTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGlzIGNvbXBvbmVudCBpcyBkaXNhYmxlZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmRpc2FibGVkJC5uZXh0KHZhbHVlKTtcclxuICB9XHJcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQkLnZhbHVlO1xyXG4gIH1cclxuICByZWFkb25seSBkaXNhYmxlZCQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xyXG5cclxuICBASW5wdXQoKSBwb2ludGVyU3VtbWFyeUVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAvKipcclxuICAgKiBXaGV0aGVyIGEgZmxvYXQgbGFiZWwgc2hvdWxkIGJlIGRpc3BsYXllZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGZsb2F0TGFiZWw6IEZsb2F0TGFiZWxUeXBlID0gJ25ldmVyJztcclxuXHJcbiAgLyoqXHJcbiAgICogSWNvbnMgY29sb3IgKHNlYXJjaCBhbmQgY2xlYXIpXHJcbiAgICovXHJcbiAgQElucHV0KCkgY29sb3IgPSAncHJpbWFyeSc7XHJcblxyXG4gIC8qKlxyXG4gICAqIERlYm91bmNlIHRpbWUgYmV0d2VlbiBlYWNoIGtleXN0cm9rZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRlYm91bmNlID0gMjAwO1xyXG5cclxuICAvKipcclxuICAgKiBNaW5pbXVtIHRlcm0gbGVuZ3RoIHJlcXVpcmVkIHRvIHRyaWdnZXIgYSByZXNlYXJjaFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1pbkxlbmd0aCA9IDI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBpY29uXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2VhcmNoSWNvbjogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggU2VsZWN0b3JcclxuICAgKi9cclxuICBASW5wdXQoKSBzZWFyY2hTZWxlY3RvciA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggU2V0dGluZ3NcclxuICAgKi9cclxuICBASW5wdXQoKSBzZWFyY2hTZXR0aW5ncyA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBGb3JjZSBjb29yZGluYXRlcyBpbiBub3J0aCBhbWVyaWNhXHJcbiAgICovXHJcbiAgQElucHV0KCkgZm9yY2VOQSA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggcmVzdWx0cyBzdG9yZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0b3JlOiBFbnRpdHlTdG9yZTxTZWFyY2hSZXN1bHQ+O1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlYXJjaCB0ZXJtIGNoYW5nZXNcclxuICAgKi9cclxuICBAT3V0cHV0KCkgc2VhcmNoVGVybUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gYSByZXNlYXJjaCBpcyBjb21wbGV0ZWRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgc2VhcmNoID0gbmV3IEV2ZW50RW1pdHRlcjx7XHJcbiAgICByZXNlYXJjaDogUmVzZWFyY2g7XHJcbiAgICByZXN1bHRzOiBTZWFyY2hSZXN1bHRbXTtcclxuICB9PigpO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlYXJjaCB0eXBlIGNoYW5nZXNcclxuICAgKi9cclxuICBAT3V0cHV0KCkgc2VhcmNoVHlwZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlYXJjaCB0eXBlIGNoYW5nZXNcclxuICAgKi9cclxuICBAT3V0cHV0KCkgY2xlYXJGZWF0dXJlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlYXJjaCBzZXR0aW5ncyBjaGFuZ2VzXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHNlYXJjaFNldHRpbmdzQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvKipcclxuICAgKiBJbnB1dCBlbGVtZW50XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgQFZpZXdDaGlsZCgnaW5wdXQnKSBpbnB1dDogRWxlbWVudFJlZjtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgc2VhcmNoIGJhciBpcyBlbXB0eVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBlbXB0eSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnRlcm0ubGVuZ3RoID09PSAwO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpYmUgdG8gdGhlIHNlYXJjaCB0ZXJtIHN0cmVhbSBhbmQgdHJpZ2dlciByZXNlYXJjaGVzXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnRlcm0kJCA9IHRoaXMudGVybSQuc3Vic2NyaWJlKCh0ZXJtOiBzdHJpbmcpID0+IHtcclxuICAgICAgdGhpcy5lbXB0eSQubmV4dCh0ZXJtID09PSB1bmRlZmluZWQgfHwgdGVybS5sZW5ndGggPT09IDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5zdHJlYW0kJCA9IHRoaXMuc3RyZWFtJFxyXG4gICAgICAucGlwZShcclxuICAgICAgICBkZWJvdW5jZSgodGVybTogc3RyaW5nKSA9PiAodGVybSA9PT0gJycgPyBFTVBUWSA6IHRpbWVyKHRoaXMuZGVib3VuY2UpKSlcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKCh0ZXJtOiBzdHJpbmcpID0+IHRoaXMub25TZXRUZXJtKHRlcm0pKTtcclxuXHJcbiAgICB0aGlzLnNlYXJjaFR5cGUkJCA9IHRoaXMuc2VhcmNoVHlwZSRcclxuICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSlcclxuICAgICAgLnN1YnNjcmliZSgoc2VhcmNoVHlwZTogc3RyaW5nKSA9PiB0aGlzLm9uU2V0U2VhcmNoVHlwZShzZWFyY2hUeXBlKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbnN1YnNjcmliZSB0byB0aGUgc2VhcmNoIHRlcm0gc3RyZWFtXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnRlcm0kJC51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5zdHJlYW0kJC51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5zZWFyY2hUeXBlJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gYSB1c2VyIHR5cGVzLCB2YWxpZGF0ZXMgdGhlIGtleSBhbmQgc2VuZCBpdCBpbnRvIHRoZVxyXG4gICAqIHN0cmVhbSBpZiBpdCdzIHZhbGlkXHJcbiAgICogQHBhcmFtIGV2ZW50IEtleWJvYXJkIGV2ZW50XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25LZXl1cChldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgY29uc3Qga2V5ID0gZXZlbnQua2V5O1xyXG4gICAgaWYgKCF0aGlzLmtleUlzVmFsaWQoa2V5KSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCB0ZXJtID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcclxuICAgIHRoaXMuc2V0VGVybSh0ZXJtKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBzdHJlYW0gYW5kIHRoZSBpbnB1dFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uQ2xlYXJCdXR0b25DbGljaygpIHtcclxuICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIHRoaXMuY2xlYXJGZWF0dXJlLmVtaXQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSBzZWFyY2ggdHlwZVxyXG4gICAqIEBwYXJhbSBzZWFyY2hUeXBlIEVuYWJsZWQgc2VhcmNoIHR5cGVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvblNlYXJjaFR5cGVDaGFuZ2Uoc2VhcmNoVHlwZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnNldFNlYXJjaFR5cGUoc2VhcmNoVHlwZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgdGhlIHBsYWNlaG9sZGVyIHdpdGggdGhlIGVuYWJsZWQgc2VhcmNoIHR5cGUuIFRoZSBwbGFjZWhvbGRlclxyXG4gICAqIGZvciBhbGwgYXZhaWxhYmxlcyBzZWFyY2ggdHlwZXJzIG5lZWRzIHRvIGJlIGRlZmluZWQgaW4gdGhlIGxvY2FsZVxyXG4gICAqIGZpbGVzIG9yIGFuIGVycm9yIHdpbGwgYmUgdGhyb3duLlxyXG4gICAqIEBwYXJhbSBzZWFyY2hUeXBlIEVuYWJsZWQgc2VhcmNoIHR5cGVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBzZXRTZWFyY2hUeXBlKHNlYXJjaFR5cGU6IHN0cmluZykge1xyXG4gICAgdGhpcy5zZWFyY2hUeXBlJC5uZXh0KHNlYXJjaFR5cGUpO1xyXG4gIH1cclxuXHJcbiAgb25TZWFyY2hTZXR0aW5nc0NoYW5nZSgpIHtcclxuICAgIHRoaXMuZG9TZWFyY2godGhpcy50ZXJtKTtcclxuICAgIHRoaXMuc2VhcmNoU2V0dGluZ3NDaGFuZ2UuZW1pdCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VuZCB0aGUgdGVybSBpbnRvIHRoZSBzdHJlYW0gb25seSBpZiB0aGlzIGNvbXBvbmVudCBpcyBub3QgZGlzYWJsZWRcclxuICAgKiBAcGFyYW0gdGVybSBTZWFyY2ggdGVybVxyXG4gICAqL1xyXG4gIHNldFRlcm0odGVybTogc3RyaW5nKSB7XHJcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGVybSA9IHRlcm0gfHwgJyc7XHJcblxyXG4gICAgaWYgKHRlcm0gIT09IHRoaXMudGVybSkge1xyXG4gICAgICB0aGlzLnRlcm0kLm5leHQodGVybSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2x1ZyA9IHRlcm0ucmVwbGFjZSgvKCNbXlxcc10qKS9nLCAnJykudHJpbSgpO1xyXG4gICAgaWYgKHNsdWcubGVuZ3RoID49IHRoaXMubWluTGVuZ3RoIHx8IHNsdWcubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRoaXMuc3RyZWFtJC5uZXh0KHRlcm0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhlIHN0cmVhbSBhbmQgdGhlIGlucHV0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjbGVhcigpIHtcclxuICAgIHRoaXMudGVybSQubmV4dCgnJyk7XHJcbiAgICB0aGlzLnN0cmVhbSQubmV4dCgnJyk7XHJcbiAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFZhbGlkYXRlIGlmIGEgZ2l2ZW4ga2V5IHN0cm9rZSBpcyBhIHZhbGlkIGlucHV0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBrZXlJc1ZhbGlkKGtleTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gU2VhcmNoQmFyQ29tcG9uZW50LmludmFsaWRLZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTE7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHRoZSBzZWFyY2ggdGVybSBjaGFuZ2VzLCBlbWl0IGFuIGV2ZW50IGFuZCB0cmlnZ2VyIGFcclxuICAgKiByZXNlYXJjaCBpbiBldmVyeSBlbmFibGVkIHNlYXJjaCBzb3VyY2VzLlxyXG4gICAqIEBwYXJhbSB0ZXJtIFNlYXJjaCB0ZXJtXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvblNldFRlcm0odGVybTogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XHJcbiAgICB0aGlzLnNlYXJjaFRlcm1DaGFuZ2UuZW1pdCh0ZXJtKTtcclxuICAgIHRoaXMuZG9TZWFyY2godGVybSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uU2V0U2VhcmNoVHlwZShzZWFyY2hUeXBlOiBzdHJpbmcpIHtcclxuICAgIGlmIChzZWFyY2hUeXBlID09PSB1bmRlZmluZWQgfHwgc2VhcmNoVHlwZSA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZWFyY2hUeXBlQ2hhbmdlLmVtaXQoc2VhcmNoVHlwZSk7XHJcblxyXG4gICAgY29uc3QgcGxhY2Vob2xkZXIgPSBgaWdvLmdlby5zZWFyY2guJHtzZWFyY2hUeXBlLnRvTG93ZXJDYXNlKCl9LnBsYWNlaG9sZGVyYDtcclxuICAgIHRoaXMucGxhY2Vob2xkZXIkLm5leHQocGxhY2Vob2xkZXIpO1xyXG5cclxuICAgIHRoaXMuc2V0VGVybSh0aGlzLnRlcm0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRXhlY3V0ZSB0aGUgc2VhcmNoXHJcbiAgICogQHBhcmFtIHRlcm0gU2VhcmNoIHRlcm1cclxuICAgKi9cclxuICBwcml2YXRlIGRvU2VhcmNoKHRlcm06IHN0cmluZyB8IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKHRoaXMucmVzZWFyY2hlcyQkKSB7XHJcbiAgICAgIHRoaXMucmVzZWFyY2hlcyQkLm1hcChyZXNlYXJjaCA9PiByZXNlYXJjaC51bnN1YnNjcmliZSgpKTtcclxuICAgICAgdGhpcy5yZXNlYXJjaGVzJCQgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2x1ZyA9IHRlcm0gPyB0ZXJtLnJlcGxhY2UoLygjW15cXHNdKikvZywgJycpLnRyaW0oKSA6ICcnO1xyXG4gICAgaWYgKHNsdWcgPT09ICcnKSB7XHJcbiAgICAgIGlmICh0aGlzLnN0b3JlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLnN0b3JlLmNsZWFyKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlc2VhcmNoZXMgPSB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoKHRlcm0sIHtcclxuICAgICAgZm9yY2VOQTogdGhpcy5mb3JjZU5BXHJcbiAgICB9KTtcclxuICAgIHRoaXMucmVzZWFyY2hlcyQkID0gcmVzZWFyY2hlcy5tYXAocmVzZWFyY2ggPT4ge1xyXG4gICAgICByZXR1cm4gcmVzZWFyY2gucmVxdWVzdC5zdWJzY3JpYmUoKHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdKSA9PiB7XHJcbiAgICAgICAgdGhpcy5vblJlc2VhcmNoQ29tcGxldGVkKHJlc2VhcmNoLCByZXN1bHRzKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gYSByZXNlYXJjaCAgaXMgY29tcGxldGVkLCBlbWl0IGFuIGV2ZW50IGFuZCB1cGRhdGVcclxuICAgKiB0aGUgc3RvcmUncyBpdGVtcy5cclxuICAgKiBAcGFyYW0gcmVzZWFyY2ggUmVzZWFyY2hcclxuICAgKiBAcGFyYW0gcmVzdWx0cyBSZXNlYXJjaCByZXN1bHRzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvblJlc2VhcmNoQ29tcGxldGVkKHJlc2VhcmNoOiBSZXNlYXJjaCwgcmVzdWx0czogU2VhcmNoUmVzdWx0W10pIHtcclxuICAgIHRoaXMuc2VhcmNoLmVtaXQoeyByZXNlYXJjaCwgcmVzdWx0cyB9KTtcclxuXHJcbiAgICBpZiAodGhpcy5zdG9yZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGNvbnN0IG5ld1Jlc3VsdHMgPSB0aGlzLnN0b3JlXHJcbiAgICAgICAgLmFsbCgpXHJcbiAgICAgICAgLmZpbHRlcihyZXN1bHQgPT4gcmVzdWx0LnNvdXJjZSAhPT0gcmVzZWFyY2guc291cmNlKVxyXG4gICAgICAgIC5jb25jYXQocmVzdWx0cyk7XHJcbiAgICAgIHRoaXMuc3RvcmUubG9hZChuZXdSZXN1bHRzKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19