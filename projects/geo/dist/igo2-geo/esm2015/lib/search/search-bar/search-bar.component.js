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
        /** @type {?} */
        const slug = term ? term.replace(/(#[^\s]*)/g, '').trim() : '';
        if (slug === '') {
            if (this.store !== undefined) {
                this.store.clear();
            }
            return;
        }
        if (this.store !== undefined) {
            this.store.softClear();
        }
        /** @type {?} */
        const researches = this.searchService.search(term, {
            forceNA: this.forceNA
        });
        researches.map((/**
         * @param {?} research
         * @return {?}
         */
        research => {
            research.request.subscribe((/**
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NlYXJjaC1iYXIvc2VhcmNoLWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBR1QsdUJBQXVCLEVBQ3ZCLEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFNBQVMsRUFDVCxVQUFVLEVBQ1gsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLGVBQWUsRUFBZ0IsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRSxPQUFPLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFaEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7OztBQWF6RCxNQUFNLE9BQU8sa0JBQWtCOzs7OztJQWdMN0IsWUFDVSxlQUFnQyxFQUNoQyxhQUE0QjtRQUQ1QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFwSzdCLGlCQUFZLEdBQTRCLElBQUksZUFBZSxDQUNsRSw0QkFBNEIsQ0FDN0IsQ0FBQztRQUVPLFdBQU0sR0FBNkIsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7UUFVOUQsWUFBTyxHQUE0QixJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7OztRQWUxRCxnQkFBVyxHQUFhLFlBQVksQ0FBQztRQVlyQyxnQkFBVyxHQUE0QixJQUFJLGVBQWUsQ0FDakUsU0FBUyxDQUNWLENBQUM7Ozs7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LHVDQUEwRTs7SUFFMUUsbURBQWdEOzs7OztJQUloRCx3Q0FBOEM7Ozs7O0lBSzlDLG1DQUEyQjs7Ozs7SUFLM0Isc0NBQXdCOzs7OztJQUt4Qix1Q0FBdUI7Ozs7O0lBS3ZCLHdDQUE0Qjs7Ozs7SUFLNUIsNENBQWdDOzs7OztJQUtoQyw0Q0FBZ0M7Ozs7O0lBS2hDLHFDQUF5Qjs7Ozs7SUFLekIsbUNBQTBDOzs7OztJQUsxQyw4Q0FBd0Q7Ozs7O0lBS3hELG9DQUdLOzs7OztJQUtMLDhDQUF3RDs7Ozs7SUFLeEQsMENBQTRDOzs7OztJQUs1QyxrREFBb0Q7Ozs7OztJQU1wRCxtQ0FBc0M7Ozs7O0lBV3BDLDZDQUF3Qzs7Ozs7SUFDeEMsMkNBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIFZpZXdDaGlsZCxcclxuICBFbGVtZW50UmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZsb2F0TGFiZWxUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24sIEVNUFRZLCB0aW1lciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBkZWJvdW5jZSwgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgRW50aXR5U3RvcmUgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgU0VBUkNIX1RZUEVTIH0gZnJvbSAnLi4vc2hhcmVkL3NlYXJjaC5lbnVtcyc7XHJcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCwgUmVzZWFyY2ggfSBmcm9tICcuLi9zaGFyZWQvc2VhcmNoLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlYXJjaC5zZXJ2aWNlJztcclxuXHJcbi8qKlxyXG4gKiBTZWFyY2hiYXIgdGhhdCB0cmlnZ2VycyBhIHJlc2VhcmNoIGluIGFsbCBzZWFyY2ggc291cmNlcyBlbmFibGVkLlxyXG4gKiBJZiB0aGUgc3RvcmUgaW5wdXQgaXMgZGVmaW5lZCwgdGhlIHNlYXJjaCByZXN1bHRzIHdpbGwgYmUgbG9hZGVkXHJcbiAqIGludG8gdGhhdCBzdG9yZS4gQW4gZXZlbnQgaXMgYWx3YXlzIGVtaXR0ZWQgd2hlbiBhIHJlc2VhcmNoIGlzIGNvbXBsZXRlZC5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXNlYXJjaC1iYXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWFyY2gtYmFyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zZWFyY2gtYmFyLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFNlYXJjaEJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAvKipcclxuICAgKiBJbnZhbGlkIGtleXNcclxuICAgKi9cclxuICBzdGF0aWMgaW52YWxpZEtleXMgPSBbXHJcbiAgICAnQ29udHJvbCcsXHJcbiAgICAnU2hpZnQnLFxyXG4gICAgJ0FsdCcsXHJcbiAgICAnQXJyb3dEb3duJyxcclxuICAgICdBcnJvd1VwJyxcclxuICAgICdBcnJvd1JpZ2h0JyxcclxuICAgICdBcnJvd0xlZnQnXHJcbiAgXTtcclxuXHJcbiAgcmVhZG9ubHkgcGxhY2Vob2xkZXIkOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoXHJcbiAgICAnaWdvLmdlby5zZWFyY2gucGxhY2Vob2xkZXInXHJcbiAgKTtcclxuXHJcbiAgcmVhZG9ubHkgZW1wdHkkOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHRydWUpO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIHNzZWFyY2ggYmFyIHRlcm1cclxuICAgKi9cclxuICBwcml2YXRlIHRlcm0kJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggdGVybSBzdHJlYW1cclxuICAgKi9cclxuICBwcml2YXRlIHN0cmVhbSQ6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCgnJyk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgc2VhcmNoIHRlcm0gc3RyZWFtXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdHJlYW0kJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIHNlYXJjaCB0eXBlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZWFyY2hUeXBlJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogTGlzdCBvZiBhdmFpbGFibGUgc2VhcmNoIHR5cGVzXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2VhcmNoVHlwZXM6IHN0cmluZ1tdID0gU0VBUkNIX1RZUEVTO1xyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggdGVybVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHNlYXJjaFR5cGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5zZXRTZWFyY2hUeXBlKHZhbHVlKTtcclxuICB9XHJcbiAgZ2V0IHNlYXJjaFR5cGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLnNlYXJjaFR5cGUkLnZhbHVlO1xyXG4gIH1cclxuICByZWFkb25seSBzZWFyY2hUeXBlJDogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFxyXG4gICAgdW5kZWZpbmVkXHJcbiAgKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBwb2ludGVyIHN1bW1hcnkgaXMgYWN0aXZhdGVkIGJ5IHRoZSBzZWFyY2hiYXIgc2V0dGluZ1xyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBwb2ludGVyU3VtbWFyeVN0YXR1cyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHRlcm1cclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCB0ZXJtKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuc2V0VGVybSh2YWx1ZSk7XHJcbiAgfVxyXG4gIGdldCB0ZXJtKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy50ZXJtJC52YWx1ZTtcclxuICB9XHJcbiAgcmVhZG9ubHkgdGVybSQ6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCgnJyk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhpcyBjb21wb25lbnQgaXMgZGlzYWJsZWRcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5kaXNhYmxlZCQubmV4dCh2YWx1ZSk7XHJcbiAgfVxyXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmRpc2FibGVkJC52YWx1ZTtcclxuICB9XHJcbiAgcmVhZG9ubHkgZGlzYWJsZWQkOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcclxuXHJcbiAgQElucHV0KCkgcG9pbnRlclN1bW1hcnlFbmFibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBhIGZsb2F0IGxhYmVsIHNob3VsZCBiZSBkaXNwbGF5ZWRcclxuICAgKi9cclxuICBASW5wdXQoKSBmbG9hdExhYmVsOiBGbG9hdExhYmVsVHlwZSA9ICduZXZlcic7XHJcblxyXG4gIC8qKlxyXG4gICAqIEljb25zIGNvbG9yIChzZWFyY2ggYW5kIGNsZWFyKVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNvbG9yID0gJ3ByaW1hcnknO1xyXG5cclxuICAvKipcclxuICAgKiBEZWJvdW5jZSB0aW1lIGJldHdlZW4gZWFjaCBrZXlzdHJva2VcclxuICAgKi9cclxuICBASW5wdXQoKSBkZWJvdW5jZSA9IDIwMDtcclxuXHJcbiAgLyoqXHJcbiAgICogTWluaW11bSB0ZXJtIGxlbmd0aCByZXF1aXJlZCB0byB0cmlnZ2VyIGEgcmVzZWFyY2hcclxuICAgKi9cclxuICBASW5wdXQoKSBtaW5MZW5ndGggPSAyO1xyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggaWNvblxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNlYXJjaEljb246IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIFNlbGVjdG9yXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2VhcmNoU2VsZWN0b3IgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIFNldHRpbmdzXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2VhcmNoU2V0dGluZ3MgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogRm9yY2UgY29vcmRpbmF0ZXMgaW4gbm9ydGggYW1lcmljYVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGZvcmNlTkEgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHJlc3VsdHMgc3RvcmVcclxuICAgKi9cclxuICBASW5wdXQoKSBzdG9yZTogRW50aXR5U3RvcmU8U2VhcmNoUmVzdWx0PjtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWFyY2ggdGVybSBjaGFuZ2VzXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHNlYXJjaFRlcm1DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIGEgcmVzZWFyY2ggaXMgY29tcGxldGVkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHNlYXJjaCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xyXG4gICAgcmVzZWFyY2g6IFJlc2VhcmNoO1xyXG4gICAgcmVzdWx0czogU2VhcmNoUmVzdWx0W107XHJcbiAgfT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWFyY2ggdHlwZSBjaGFuZ2VzXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHNlYXJjaFR5cGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWFyY2ggdHlwZSBjaGFuZ2VzXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGNsZWFyRmVhdHVyZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWFyY2ggc2V0dGluZ3MgY2hhbmdlc1xyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzZWFyY2hTZXR0aW5nc0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5wdXQgZWxlbWVudFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIEBWaWV3Q2hpbGQoJ2lucHV0JykgaW5wdXQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhlIHNlYXJjaCBiYXIgaXMgZW1wdHlcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgZW1wdHkoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy50ZXJtLmxlbmd0aCA9PT0gMDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaWJlIHRvIHRoZSBzZWFyY2ggdGVybSBzdHJlYW0gYW5kIHRyaWdnZXIgcmVzZWFyY2hlc1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy50ZXJtJCQgPSB0aGlzLnRlcm0kLnN1YnNjcmliZSgodGVybTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHRoaXMuZW1wdHkkLm5leHQodGVybSA9PT0gdW5kZWZpbmVkIHx8IHRlcm0ubGVuZ3RoID09PSAwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuc3RyZWFtJCQgPSB0aGlzLnN0cmVhbSRcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgZGVib3VuY2UoKHRlcm06IHN0cmluZykgPT4gKHRlcm0gPT09ICcnID8gRU1QVFkgOiB0aW1lcih0aGlzLmRlYm91bmNlKSkpXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSgodGVybTogc3RyaW5nKSA9PiB0aGlzLm9uU2V0VGVybSh0ZXJtKSk7XHJcblxyXG4gICAgdGhpcy5zZWFyY2hUeXBlJCQgPSB0aGlzLnNlYXJjaFR5cGUkXHJcbiAgICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpXHJcbiAgICAgIC5zdWJzY3JpYmUoKHNlYXJjaFR5cGU6IHN0cmluZykgPT4gdGhpcy5vblNldFNlYXJjaFR5cGUoc2VhcmNoVHlwZSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5zdWJzY3JpYmUgdG8gdGhlIHNlYXJjaCB0ZXJtIHN0cmVhbVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy50ZXJtJCQudW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuc3RyZWFtJCQudW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuc2VhcmNoVHlwZSQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGEgdXNlciB0eXBlcywgdmFsaWRhdGVzIHRoZSBrZXkgYW5kIHNlbmQgaXQgaW50byB0aGVcclxuICAgKiBzdHJlYW0gaWYgaXQncyB2YWxpZFxyXG4gICAqIEBwYXJhbSBldmVudCBLZXlib2FyZCBldmVudFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uS2V5dXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleTtcclxuICAgIGlmICghdGhpcy5rZXlJc1ZhbGlkKGtleSkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdGVybSA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XHJcbiAgICB0aGlzLnNldFRlcm0odGVybSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgc3RyZWFtIGFuZCB0aGUgaW5wdXRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvbkNsZWFyQnV0dG9uQ2xpY2soKSB7XHJcbiAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICB0aGlzLmNsZWFyRmVhdHVyZS5lbWl0KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgc2VhcmNoIHR5cGVcclxuICAgKiBAcGFyYW0gc2VhcmNoVHlwZSBFbmFibGVkIHNlYXJjaCB0eXBlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25TZWFyY2hUeXBlQ2hhbmdlKHNlYXJjaFR5cGU6IHN0cmluZykge1xyXG4gICAgdGhpcy5zZXRTZWFyY2hUeXBlKHNlYXJjaFR5cGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHRoZSBwbGFjZWhvbGRlciB3aXRoIHRoZSBlbmFibGVkIHNlYXJjaCB0eXBlLiBUaGUgcGxhY2Vob2xkZXJcclxuICAgKiBmb3IgYWxsIGF2YWlsYWJsZXMgc2VhcmNoIHR5cGVycyBuZWVkcyB0byBiZSBkZWZpbmVkIGluIHRoZSBsb2NhbGVcclxuICAgKiBmaWxlcyBvciBhbiBlcnJvciB3aWxsIGJlIHRocm93bi5cclxuICAgKiBAcGFyYW0gc2VhcmNoVHlwZSBFbmFibGVkIHNlYXJjaCB0eXBlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgc2V0U2VhcmNoVHlwZShzZWFyY2hUeXBlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuc2VhcmNoVHlwZSQubmV4dChzZWFyY2hUeXBlKTtcclxuICB9XHJcblxyXG4gIG9uU2VhcmNoU2V0dGluZ3NDaGFuZ2UoKSB7XHJcbiAgICB0aGlzLmRvU2VhcmNoKHRoaXMudGVybSk7XHJcbiAgICB0aGlzLnNlYXJjaFNldHRpbmdzQ2hhbmdlLmVtaXQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlbmQgdGhlIHRlcm0gaW50byB0aGUgc3RyZWFtIG9ubHkgaWYgdGhpcyBjb21wb25lbnQgaXMgbm90IGRpc2FibGVkXHJcbiAgICogQHBhcmFtIHRlcm0gU2VhcmNoIHRlcm1cclxuICAgKi9cclxuICBzZXRUZXJtKHRlcm06IHN0cmluZykge1xyXG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRlcm0gPSB0ZXJtIHx8ICcnO1xyXG5cclxuICAgIGlmICh0ZXJtICE9PSB0aGlzLnRlcm0pIHtcclxuICAgICAgdGhpcy50ZXJtJC5uZXh0KHRlcm0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNsdWcgPSB0ZXJtLnJlcGxhY2UoLygjW15cXHNdKikvZywgJycpLnRyaW0oKTtcclxuICAgIGlmIChzbHVnLmxlbmd0aCA+PSB0aGlzLm1pbkxlbmd0aCB8fCBzbHVnLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0aGlzLnN0cmVhbSQubmV4dCh0ZXJtKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBzdHJlYW0gYW5kIHRoZSBpbnB1dFxyXG4gICAqL1xyXG4gIHByaXZhdGUgY2xlYXIoKSB7XHJcbiAgICB0aGlzLnRlcm0kLm5leHQoJycpO1xyXG4gICAgdGhpcy5zdHJlYW0kLm5leHQoJycpO1xyXG4gICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBWYWxpZGF0ZSBpZiBhIGdpdmVuIGtleSBzdHJva2UgaXMgYSB2YWxpZCBpbnB1dFxyXG4gICAqL1xyXG4gIHByaXZhdGUga2V5SXNWYWxpZChrZXk6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIFNlYXJjaEJhckNvbXBvbmVudC5pbnZhbGlkS2V5cy5pbmRleE9mKGtleSkgPT09IC0xO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0aGUgc2VhcmNoIHRlcm0gY2hhbmdlcywgZW1pdCBhbiBldmVudCBhbmQgdHJpZ2dlciBhXHJcbiAgICogcmVzZWFyY2ggaW4gZXZlcnkgZW5hYmxlZCBzZWFyY2ggc291cmNlcy5cclxuICAgKiBAcGFyYW0gdGVybSBTZWFyY2ggdGVybVxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25TZXRUZXJtKHRlcm06IHN0cmluZyB8IHVuZGVmaW5lZCkge1xyXG4gICAgdGhpcy5zZWFyY2hUZXJtQ2hhbmdlLmVtaXQodGVybSk7XHJcbiAgICB0aGlzLmRvU2VhcmNoKHRlcm0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvblNldFNlYXJjaFR5cGUoc2VhcmNoVHlwZTogc3RyaW5nKSB7XHJcbiAgICBpZiAoc2VhcmNoVHlwZSA9PT0gdW5kZWZpbmVkIHx8IHNlYXJjaFR5cGUgPT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2VhcmNoVHlwZUNoYW5nZS5lbWl0KHNlYXJjaFR5cGUpO1xyXG5cclxuICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gYGlnby5nZW8uc2VhcmNoLiR7c2VhcmNoVHlwZS50b0xvd2VyQ2FzZSgpfS5wbGFjZWhvbGRlcmA7XHJcbiAgICB0aGlzLnBsYWNlaG9sZGVyJC5uZXh0KHBsYWNlaG9sZGVyKTtcclxuXHJcbiAgICB0aGlzLnNldFRlcm0odGhpcy50ZXJtKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4ZWN1dGUgdGhlIHNlYXJjaFxyXG4gICAqIEBwYXJhbSB0ZXJtIFNlYXJjaCB0ZXJtXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkb1NlYXJjaCh0ZXJtOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcclxuICAgIGNvbnN0IHNsdWcgPSB0ZXJtID8gdGVybS5yZXBsYWNlKC8oI1teXFxzXSopL2csICcnKS50cmltKCkgOiAnJztcclxuICAgIGlmIChzbHVnID09PSAnJykge1xyXG4gICAgICBpZiAodGhpcy5zdG9yZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yZS5jbGVhcigpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5zdG9yZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuc3RvcmUuc29mdENsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzZWFyY2hlcyA9IHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2godGVybSwge1xyXG4gICAgICBmb3JjZU5BOiB0aGlzLmZvcmNlTkFcclxuICAgIH0pO1xyXG4gICAgcmVzZWFyY2hlcy5tYXAocmVzZWFyY2ggPT4ge1xyXG4gICAgICByZXNlYXJjaC5yZXF1ZXN0LnN1YnNjcmliZSgocmVzdWx0czogU2VhcmNoUmVzdWx0W10pID0+IHtcclxuICAgICAgICB0aGlzLm9uUmVzZWFyY2hDb21wbGV0ZWQocmVzZWFyY2gsIHJlc3VsdHMpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBhIHJlc2VhcmNoICBpcyBjb21wbGV0ZWQsIGVtaXQgYW4gZXZlbnQgYW5kIHVwZGF0ZVxyXG4gICAqIHRoZSBzdG9yZSdzIGl0ZW1zLlxyXG4gICAqIEBwYXJhbSByZXNlYXJjaCBSZXNlYXJjaFxyXG4gICAqIEBwYXJhbSByZXN1bHRzIFJlc2VhcmNoIHJlc3VsdHNcclxuICAgKi9cclxuICBwcml2YXRlIG9uUmVzZWFyY2hDb21wbGV0ZWQocmVzZWFyY2g6IFJlc2VhcmNoLCByZXN1bHRzOiBTZWFyY2hSZXN1bHRbXSkge1xyXG4gICAgdGhpcy5zZWFyY2guZW1pdCh7IHJlc2VhcmNoLCByZXN1bHRzIH0pO1xyXG5cclxuICAgIGlmICh0aGlzLnN0b3JlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgY29uc3QgbmV3UmVzdWx0cyA9IHRoaXMuc3RvcmVcclxuICAgICAgICAuYWxsKClcclxuICAgICAgICAuZmlsdGVyKHJlc3VsdCA9PiByZXN1bHQuc291cmNlICE9PSByZXNlYXJjaC5zb3VyY2UpXHJcbiAgICAgICAgLmNvbmNhdChyZXN1bHRzKTtcclxuICAgICAgdGhpcy5zdG9yZS5sb2FkKG5ld1Jlc3VsdHMpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=