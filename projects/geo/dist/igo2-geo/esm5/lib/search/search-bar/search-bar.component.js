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
var SearchBarComponent = /** @class */ (function () {
    function SearchBarComponent(languageService, searchService) {
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
    Object.defineProperty(SearchBarComponent.prototype, "searchType", {
        get: /**
         * @return {?}
         */
        function () {
            return this.searchType$.value;
        },
        /**
         * Search term
         */
        set: /**
         * Search term
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.setSearchType(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchBarComponent.prototype, "term", {
        get: /**
         * @return {?}
         */
        function () {
            return this.term$.value;
        },
        /**
         * Search term
         */
        set: /**
         * Search term
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.setTerm(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchBarComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this.disabled$.value;
        },
        /**
         * Whether this component is disabled
         */
        set: /**
         * Whether this component is disabled
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.disabled$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchBarComponent.prototype, "empty", {
        /**
         * Whether the search bar is empty
         * @internal
         */
        get: /**
         * Whether the search bar is empty
         * \@internal
         * @return {?}
         */
        function () {
            return this.term.length === 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Subscribe to the search term stream and trigger researches
     * @internal
     */
    /**
     * Subscribe to the search term stream and trigger researches
     * \@internal
     * @return {?}
     */
    SearchBarComponent.prototype.ngOnInit = /**
     * Subscribe to the search term stream and trigger researches
     * \@internal
     * @return {?}
     */
    function () {
        var _this = this;
        this.term$$ = this.term$.subscribe((/**
         * @param {?} term
         * @return {?}
         */
        function (term) {
            _this.empty$.next(term === undefined || term.length === 0);
        }));
        this.stream$$ = this.stream$
            .pipe(debounce((/**
         * @param {?} term
         * @return {?}
         */
        function (term) { return (term === '' ? EMPTY : timer(_this.debounce)); })))
            .subscribe((/**
         * @param {?} term
         * @return {?}
         */
        function (term) { return _this.onSetTerm(term); }));
        this.searchType$$ = this.searchType$
            .pipe(distinctUntilChanged())
            .subscribe((/**
         * @param {?} searchType
         * @return {?}
         */
        function (searchType) { return _this.onSetSearchType(searchType); }));
    };
    /**
     * Unsubscribe to the search term stream
     * @internal
     */
    /**
     * Unsubscribe to the search term stream
     * \@internal
     * @return {?}
     */
    SearchBarComponent.prototype.ngOnDestroy = /**
     * Unsubscribe to the search term stream
     * \@internal
     * @return {?}
     */
    function () {
        this.term$$.unsubscribe();
        this.stream$$.unsubscribe();
        this.searchType$$.unsubscribe();
    };
    /**
     * When a user types, validates the key and send it into the
     * stream if it's valid
     * @param event Keyboard event
     * @internal
     */
    /**
     * When a user types, validates the key and send it into the
     * stream if it's valid
     * \@internal
     * @param {?} event Keyboard event
     * @return {?}
     */
    SearchBarComponent.prototype.onKeyup = /**
     * When a user types, validates the key and send it into the
     * stream if it's valid
     * \@internal
     * @param {?} event Keyboard event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var key = event.key;
        if (!this.keyIsValid(key)) {
            return;
        }
        /** @type {?} */
        var term = ((/** @type {?} */ (event.target))).value;
        this.setTerm(term);
    };
    /**
     * Clear the stream and the input
     * @internal
     */
    /**
     * Clear the stream and the input
     * \@internal
     * @return {?}
     */
    SearchBarComponent.prototype.onClearButtonClick = /**
     * Clear the stream and the input
     * \@internal
     * @return {?}
     */
    function () {
        this.clear();
        this.clearFeature.emit();
    };
    /**
     * Update search type
     * @param searchType Enabled search type
     * @internal
     */
    /**
     * Update search type
     * \@internal
     * @param {?} searchType Enabled search type
     * @return {?}
     */
    SearchBarComponent.prototype.onSearchTypeChange = /**
     * Update search type
     * \@internal
     * @param {?} searchType Enabled search type
     * @return {?}
     */
    function (searchType) {
        this.setSearchType(searchType);
    };
    /**
     * Update the placeholder with the enabled search type. The placeholder
     * for all availables search typers needs to be defined in the locale
     * files or an error will be thrown.
     * @param searchType Enabled search type
     * @internal
     */
    /**
     * Update the placeholder with the enabled search type. The placeholder
     * for all availables search typers needs to be defined in the locale
     * files or an error will be thrown.
     * \@internal
     * @param {?} searchType Enabled search type
     * @return {?}
     */
    SearchBarComponent.prototype.setSearchType = /**
     * Update the placeholder with the enabled search type. The placeholder
     * for all availables search typers needs to be defined in the locale
     * files or an error will be thrown.
     * \@internal
     * @param {?} searchType Enabled search type
     * @return {?}
     */
    function (searchType) {
        this.searchType$.next(searchType);
    };
    /**
     * @return {?}
     */
    SearchBarComponent.prototype.onSearchSettingsChange = /**
     * @return {?}
     */
    function () {
        this.doSearch(this.term);
        this.searchSettingsChange.emit();
    };
    /**
     * Send the term into the stream only if this component is not disabled
     * @param term Search term
     */
    /**
     * Send the term into the stream only if this component is not disabled
     * @param {?} term Search term
     * @return {?}
     */
    SearchBarComponent.prototype.setTerm = /**
     * Send the term into the stream only if this component is not disabled
     * @param {?} term Search term
     * @return {?}
     */
    function (term) {
        if (this.disabled) {
            return;
        }
        term = term || '';
        if (term !== this.term) {
            this.term$.next(term);
        }
        /** @type {?} */
        var slug = term.replace(/(#[^\s]*)/g, '').trim();
        if (slug.length >= this.minLength || slug.length === 0) {
            this.stream$.next(term);
        }
    };
    /**
     * Clear the stream and the input
     */
    /**
     * Clear the stream and the input
     * @private
     * @return {?}
     */
    SearchBarComponent.prototype.clear = /**
     * Clear the stream and the input
     * @private
     * @return {?}
     */
    function () {
        this.term$.next('');
        this.stream$.next('');
        this.input.nativeElement.focus();
    };
    /**
     * Validate if a given key stroke is a valid input
     */
    /**
     * Validate if a given key stroke is a valid input
     * @private
     * @param {?} key
     * @return {?}
     */
    SearchBarComponent.prototype.keyIsValid = /**
     * Validate if a given key stroke is a valid input
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return SearchBarComponent.invalidKeys.indexOf(key) === -1;
    };
    /**
     * When the search term changes, emit an event and trigger a
     * research in every enabled search sources.
     * @param term Search term
     */
    /**
     * When the search term changes, emit an event and trigger a
     * research in every enabled search sources.
     * @private
     * @param {?} term Search term
     * @return {?}
     */
    SearchBarComponent.prototype.onSetTerm = /**
     * When the search term changes, emit an event and trigger a
     * research in every enabled search sources.
     * @private
     * @param {?} term Search term
     * @return {?}
     */
    function (term) {
        this.searchTermChange.emit(term);
        this.doSearch(term);
    };
    /**
     * @private
     * @param {?} searchType
     * @return {?}
     */
    SearchBarComponent.prototype.onSetSearchType = /**
     * @private
     * @param {?} searchType
     * @return {?}
     */
    function (searchType) {
        if (searchType === undefined || searchType === null) {
            return;
        }
        this.searchTypeChange.emit(searchType);
        /** @type {?} */
        var placeholder = "igo.geo.search." + searchType.toLowerCase() + ".placeholder";
        this.placeholder$.next(placeholder);
        this.setTerm(this.term);
    };
    /**
     * Execute the search
     * @param term Search term
     */
    /**
     * Execute the search
     * @private
     * @param {?} term Search term
     * @return {?}
     */
    SearchBarComponent.prototype.doSearch = /**
     * Execute the search
     * @private
     * @param {?} term Search term
     * @return {?}
     */
    function (term) {
        var _this = this;
        /** @type {?} */
        var slug = term ? term.replace(/(#[^\s]*)/g, '').trim() : '';
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
        var researches = this.searchService.search(term, {
            forceNA: this.forceNA
        });
        researches.map((/**
         * @param {?} research
         * @return {?}
         */
        function (research) {
            research.request.subscribe((/**
             * @param {?} results
             * @return {?}
             */
            function (results) {
                _this.onResearchCompleted(research, results);
            }));
        }));
    };
    /**
     * When a research  is completed, emit an event and update
     * the store's items.
     * @param research Research
     * @param results Research results
     */
    /**
     * When a research  is completed, emit an event and update
     * the store's items.
     * @private
     * @param {?} research Research
     * @param {?} results Research results
     * @return {?}
     */
    SearchBarComponent.prototype.onResearchCompleted = /**
     * When a research  is completed, emit an event and update
     * the store's items.
     * @private
     * @param {?} research Research
     * @param {?} results Research results
     * @return {?}
     */
    function (research, results) {
        this.search.emit({ research: research, results: results });
        if (this.store !== undefined) {
            /** @type {?} */
            var newResults = this.store
                .all()
                .filter((/**
             * @param {?} result
             * @return {?}
             */
            function (result) { return result.source !== research.source; }))
                .concat(results);
            this.store.load(newResults);
        }
    };
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
    SearchBarComponent.ctorParameters = function () { return [
        { type: LanguageService },
        { type: SearchService }
    ]; };
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
    return SearchBarComponent;
}());
export { SearchBarComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NlYXJjaC1iYXIvc2VhcmNoLWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBR1QsdUJBQXVCLEVBQ3ZCLEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFNBQVMsRUFDVCxVQUFVLEVBQ1gsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLGVBQWUsRUFBZ0IsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRSxPQUFPLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFaEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7OztBQU96RDtJQXNMRSw0QkFDVSxlQUFnQyxFQUNoQyxhQUE0QjtRQUQ1QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFwSzdCLGlCQUFZLEdBQTRCLElBQUksZUFBZSxDQUNsRSw0QkFBNEIsQ0FDN0IsQ0FBQztRQUVPLFdBQU0sR0FBNkIsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7UUFVOUQsWUFBTyxHQUE0QixJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7OztRQWUxRCxnQkFBVyxHQUFhLFlBQVksQ0FBQztRQVlyQyxnQkFBVyxHQUE0QixJQUFJLGVBQWUsQ0FDakUsU0FBUyxDQUNWLENBQUM7Ozs7UUFLUSx5QkFBb0IsR0FBRyxJQUFJ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LEtBQUs7dUNBY0wsTUFBTTt1QkFLTixLQUFLOzJCQVlMLEtBQUs7d0NBU0wsS0FBSzs2QkFJTCxLQUFLO3dCQUtMLEtBQUs7MkJBS0wsS0FBSzs0QkFLTCxLQUFLOzZCQUtMLEtBQUs7aUNBS0wsS0FBSztpQ0FLTCxLQUFLOzBCQUtMLEtBQUs7d0JBS0wsS0FBSzttQ0FLTCxNQUFNO3lCQUtOLE1BQU07bUNBUU4sTUFBTTsrQkFLTixNQUFNO3VDQUtOLE1BQU07d0JBTU4sU0FBUyxTQUFDLE9BQU87O0lBc01wQix5QkFBQztDQUFBLEFBbFhELElBa1hDO1NBNVdZLGtCQUFrQjs7Ozs7O0lBSTdCLCtCQVFFOztJQUVGLDBDQUVFOztJQUVGLG9DQUFzRTs7Ozs7O0lBS3RFLG9DQUE2Qjs7Ozs7O0lBSzdCLHFDQUFtRTs7Ozs7O0lBS25FLHNDQUErQjs7Ozs7O0lBSy9CLDBDQUFtQzs7Ozs7SUFLbkMseUNBQThDOztJQVk5Qyx5Q0FFRTs7Ozs7SUFLRixrREFBNkQ7O0lBWTdELG1DQUFrRTs7SUFZbEUsdUNBQTBFOztJQUUxRSxtREFBZ0Q7Ozs7O0lBSWhELHdDQUE4Qzs7Ozs7SUFLOUMsbUNBQTJCOzs7OztJQUszQixzQ0FBd0I7Ozs7O0lBS3hCLHVDQUF1Qjs7Ozs7SUFLdkIsd0NBQTRCOzs7OztJQUs1Qiw0Q0FBZ0M7Ozs7O0lBS2hDLDRDQUFnQzs7Ozs7SUFLaEMscUNBQXlCOzs7OztJQUt6QixtQ0FBMEM7Ozs7O0lBSzFDLDhDQUF3RDs7Ozs7SUFLeEQsb0NBR0s7Ozs7O0lBS0wsOENBQXdEOzs7OztJQUt4RCwwQ0FBNEM7Ozs7O0lBSzVDLGtEQUFvRDs7Ozs7O0lBTXBELG1DQUFzQzs7Ozs7SUFXcEMsNkNBQXdDOzs7OztJQUN4QywyQ0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgVmlld0NoaWxkLFxyXG4gIEVsZW1lbnRSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRmxvYXRMYWJlbFR5cGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiwgRU1QVFksIHRpbWVyIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IExhbmd1YWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBFbnRpdHlTdG9yZSB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBTRUFSQ0hfVFlQRVMgfSBmcm9tICcuLi9zaGFyZWQvc2VhcmNoLmVudW1zJztcclxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0LCBSZXNlYXJjaCB9IGZyb20gJy4uL3NoYXJlZC9zZWFyY2guaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IFNlYXJjaFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VhcmNoLnNlcnZpY2UnO1xyXG5cclxuLyoqXHJcbiAqIFNlYXJjaGJhciB0aGF0IHRyaWdnZXJzIGEgcmVzZWFyY2ggaW4gYWxsIHNlYXJjaCBzb3VyY2VzIGVuYWJsZWQuXHJcbiAqIElmIHRoZSBzdG9yZSBpbnB1dCBpcyBkZWZpbmVkLCB0aGUgc2VhcmNoIHJlc3VsdHMgd2lsbCBiZSBsb2FkZWRcclxuICogaW50byB0aGF0IHN0b3JlLiBBbiBldmVudCBpcyBhbHdheXMgZW1pdHRlZCB3aGVuIGEgcmVzZWFyY2ggaXMgY29tcGxldGVkLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tc2VhcmNoLWJhcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NlYXJjaC1iYXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3NlYXJjaC1iYXIuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VhcmNoQmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIEludmFsaWQga2V5c1xyXG4gICAqL1xyXG4gIHN0YXRpYyBpbnZhbGlkS2V5cyA9IFtcclxuICAgICdDb250cm9sJyxcclxuICAgICdTaGlmdCcsXHJcbiAgICAnQWx0JyxcclxuICAgICdBcnJvd0Rvd24nLFxyXG4gICAgJ0Fycm93VXAnLFxyXG4gICAgJ0Fycm93UmlnaHQnLFxyXG4gICAgJ0Fycm93TGVmdCdcclxuICBdO1xyXG5cclxuICByZWFkb25seSBwbGFjZWhvbGRlciQ6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChcclxuICAgICdpZ28uZ2VvLnNlYXJjaC5wbGFjZWhvbGRlcidcclxuICApO1xyXG5cclxuICByZWFkb25seSBlbXB0eSQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QodHJ1ZSk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgc3NlYXJjaCBiYXIgdGVybVxyXG4gICAqL1xyXG4gIHByaXZhdGUgdGVybSQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCB0ZXJtIHN0cmVhbVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RyZWFtJDogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KCcnKTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvIHRoZSBzZWFyY2ggdGVybSBzdHJlYW1cclxuICAgKi9cclxuICBwcml2YXRlIHN0cmVhbSQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgc2VhcmNoIHR5cGVcclxuICAgKi9cclxuICBwcml2YXRlIHNlYXJjaFR5cGUkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBMaXN0IG9mIGF2YWlsYWJsZSBzZWFyY2ggdHlwZXNcclxuICAgKi9cclxuICBASW5wdXQoKSBzZWFyY2hUeXBlczogc3RyaW5nW10gPSBTRUFSQ0hfVFlQRVM7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCB0ZXJtXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBzZXQgc2VhcmNoVHlwZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnNldFNlYXJjaFR5cGUodmFsdWUpO1xyXG4gIH1cclxuICBnZXQgc2VhcmNoVHlwZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VhcmNoVHlwZSQudmFsdWU7XHJcbiAgfVxyXG4gIHJlYWRvbmx5IHNlYXJjaFR5cGUkOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoXHJcbiAgICB1bmRlZmluZWRcclxuICApO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHBvaW50ZXIgc3VtbWFyeSBpcyBhY3RpdmF0ZWQgYnkgdGhlIHNlYXJjaGJhciBzZXR0aW5nXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHBvaW50ZXJTdW1tYXJ5U3RhdHVzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggdGVybVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHRlcm0odmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5zZXRUZXJtKHZhbHVlKTtcclxuICB9XHJcbiAgZ2V0IHRlcm0oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLnRlcm0kLnZhbHVlO1xyXG4gIH1cclxuICByZWFkb25seSB0ZXJtJDogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KCcnKTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGlzIGNvbXBvbmVudCBpcyBkaXNhYmxlZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmRpc2FibGVkJC5uZXh0KHZhbHVlKTtcclxuICB9XHJcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQkLnZhbHVlO1xyXG4gIH1cclxuICByZWFkb25seSBkaXNhYmxlZCQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xyXG5cclxuICBASW5wdXQoKSBwb2ludGVyU3VtbWFyeUVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAvKipcclxuICAgKiBXaGV0aGVyIGEgZmxvYXQgbGFiZWwgc2hvdWxkIGJlIGRpc3BsYXllZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGZsb2F0TGFiZWw6IEZsb2F0TGFiZWxUeXBlID0gJ25ldmVyJztcclxuXHJcbiAgLyoqXHJcbiAgICogSWNvbnMgY29sb3IgKHNlYXJjaCBhbmQgY2xlYXIpXHJcbiAgICovXHJcbiAgQElucHV0KCkgY29sb3IgPSAncHJpbWFyeSc7XHJcblxyXG4gIC8qKlxyXG4gICAqIERlYm91bmNlIHRpbWUgYmV0d2VlbiBlYWNoIGtleXN0cm9rZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRlYm91bmNlID0gMjAwO1xyXG5cclxuICAvKipcclxuICAgKiBNaW5pbXVtIHRlcm0gbGVuZ3RoIHJlcXVpcmVkIHRvIHRyaWdnZXIgYSByZXNlYXJjaFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1pbkxlbmd0aCA9IDI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBpY29uXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2VhcmNoSWNvbjogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggU2VsZWN0b3JcclxuICAgKi9cclxuICBASW5wdXQoKSBzZWFyY2hTZWxlY3RvciA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggU2V0dGluZ3NcclxuICAgKi9cclxuICBASW5wdXQoKSBzZWFyY2hTZXR0aW5ncyA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBGb3JjZSBjb29yZGluYXRlcyBpbiBub3J0aCBhbWVyaWNhXHJcbiAgICovXHJcbiAgQElucHV0KCkgZm9yY2VOQSA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggcmVzdWx0cyBzdG9yZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0b3JlOiBFbnRpdHlTdG9yZTxTZWFyY2hSZXN1bHQ+O1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlYXJjaCB0ZXJtIGNoYW5nZXNcclxuICAgKi9cclxuICBAT3V0cHV0KCkgc2VhcmNoVGVybUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gYSByZXNlYXJjaCBpcyBjb21wbGV0ZWRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgc2VhcmNoID0gbmV3IEV2ZW50RW1pdHRlcjx7XHJcbiAgICByZXNlYXJjaDogUmVzZWFyY2g7XHJcbiAgICByZXN1bHRzOiBTZWFyY2hSZXN1bHRbXTtcclxuICB9PigpO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlYXJjaCB0eXBlIGNoYW5nZXNcclxuICAgKi9cclxuICBAT3V0cHV0KCkgc2VhcmNoVHlwZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlYXJjaCB0eXBlIGNoYW5nZXNcclxuICAgKi9cclxuICBAT3V0cHV0KCkgY2xlYXJGZWF0dXJlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlYXJjaCBzZXR0aW5ncyBjaGFuZ2VzXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHNlYXJjaFNldHRpbmdzQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvKipcclxuICAgKiBJbnB1dCBlbGVtZW50XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgQFZpZXdDaGlsZCgnaW5wdXQnKSBpbnB1dDogRWxlbWVudFJlZjtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgc2VhcmNoIGJhciBpcyBlbXB0eVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBlbXB0eSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnRlcm0ubGVuZ3RoID09PSAwO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpYmUgdG8gdGhlIHNlYXJjaCB0ZXJtIHN0cmVhbSBhbmQgdHJpZ2dlciByZXNlYXJjaGVzXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnRlcm0kJCA9IHRoaXMudGVybSQuc3Vic2NyaWJlKCh0ZXJtOiBzdHJpbmcpID0+IHtcclxuICAgICAgdGhpcy5lbXB0eSQubmV4dCh0ZXJtID09PSB1bmRlZmluZWQgfHwgdGVybS5sZW5ndGggPT09IDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5zdHJlYW0kJCA9IHRoaXMuc3RyZWFtJFxyXG4gICAgICAucGlwZShcclxuICAgICAgICBkZWJvdW5jZSgodGVybTogc3RyaW5nKSA9PiAodGVybSA9PT0gJycgPyBFTVBUWSA6IHRpbWVyKHRoaXMuZGVib3VuY2UpKSlcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKCh0ZXJtOiBzdHJpbmcpID0+IHRoaXMub25TZXRUZXJtKHRlcm0pKTtcclxuXHJcbiAgICB0aGlzLnNlYXJjaFR5cGUkJCA9IHRoaXMuc2VhcmNoVHlwZSRcclxuICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSlcclxuICAgICAgLnN1YnNjcmliZSgoc2VhcmNoVHlwZTogc3RyaW5nKSA9PiB0aGlzLm9uU2V0U2VhcmNoVHlwZShzZWFyY2hUeXBlKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbnN1YnNjcmliZSB0byB0aGUgc2VhcmNoIHRlcm0gc3RyZWFtXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnRlcm0kJC51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5zdHJlYW0kJC51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5zZWFyY2hUeXBlJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gYSB1c2VyIHR5cGVzLCB2YWxpZGF0ZXMgdGhlIGtleSBhbmQgc2VuZCBpdCBpbnRvIHRoZVxyXG4gICAqIHN0cmVhbSBpZiBpdCdzIHZhbGlkXHJcbiAgICogQHBhcmFtIGV2ZW50IEtleWJvYXJkIGV2ZW50XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25LZXl1cChldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgY29uc3Qga2V5ID0gZXZlbnQua2V5O1xyXG4gICAgaWYgKCF0aGlzLmtleUlzVmFsaWQoa2V5KSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCB0ZXJtID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcclxuICAgIHRoaXMuc2V0VGVybSh0ZXJtKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBzdHJlYW0gYW5kIHRoZSBpbnB1dFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uQ2xlYXJCdXR0b25DbGljaygpIHtcclxuICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIHRoaXMuY2xlYXJGZWF0dXJlLmVtaXQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSBzZWFyY2ggdHlwZVxyXG4gICAqIEBwYXJhbSBzZWFyY2hUeXBlIEVuYWJsZWQgc2VhcmNoIHR5cGVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvblNlYXJjaFR5cGVDaGFuZ2Uoc2VhcmNoVHlwZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnNldFNlYXJjaFR5cGUoc2VhcmNoVHlwZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgdGhlIHBsYWNlaG9sZGVyIHdpdGggdGhlIGVuYWJsZWQgc2VhcmNoIHR5cGUuIFRoZSBwbGFjZWhvbGRlclxyXG4gICAqIGZvciBhbGwgYXZhaWxhYmxlcyBzZWFyY2ggdHlwZXJzIG5lZWRzIHRvIGJlIGRlZmluZWQgaW4gdGhlIGxvY2FsZVxyXG4gICAqIGZpbGVzIG9yIGFuIGVycm9yIHdpbGwgYmUgdGhyb3duLlxyXG4gICAqIEBwYXJhbSBzZWFyY2hUeXBlIEVuYWJsZWQgc2VhcmNoIHR5cGVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBzZXRTZWFyY2hUeXBlKHNlYXJjaFR5cGU6IHN0cmluZykge1xyXG4gICAgdGhpcy5zZWFyY2hUeXBlJC5uZXh0KHNlYXJjaFR5cGUpO1xyXG4gIH1cclxuXHJcbiAgb25TZWFyY2hTZXR0aW5nc0NoYW5nZSgpIHtcclxuICAgIHRoaXMuZG9TZWFyY2godGhpcy50ZXJtKTtcclxuICAgIHRoaXMuc2VhcmNoU2V0dGluZ3NDaGFuZ2UuZW1pdCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VuZCB0aGUgdGVybSBpbnRvIHRoZSBzdHJlYW0gb25seSBpZiB0aGlzIGNvbXBvbmVudCBpcyBub3QgZGlzYWJsZWRcclxuICAgKiBAcGFyYW0gdGVybSBTZWFyY2ggdGVybVxyXG4gICAqL1xyXG4gIHNldFRlcm0odGVybTogc3RyaW5nKSB7XHJcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGVybSA9IHRlcm0gfHwgJyc7XHJcblxyXG4gICAgaWYgKHRlcm0gIT09IHRoaXMudGVybSkge1xyXG4gICAgICB0aGlzLnRlcm0kLm5leHQodGVybSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2x1ZyA9IHRlcm0ucmVwbGFjZSgvKCNbXlxcc10qKS9nLCAnJykudHJpbSgpO1xyXG4gICAgaWYgKHNsdWcubGVuZ3RoID49IHRoaXMubWluTGVuZ3RoIHx8IHNsdWcubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRoaXMuc3RyZWFtJC5uZXh0KHRlcm0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhlIHN0cmVhbSBhbmQgdGhlIGlucHV0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjbGVhcigpIHtcclxuICAgIHRoaXMudGVybSQubmV4dCgnJyk7XHJcbiAgICB0aGlzLnN0cmVhbSQubmV4dCgnJyk7XHJcbiAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFZhbGlkYXRlIGlmIGEgZ2l2ZW4ga2V5IHN0cm9rZSBpcyBhIHZhbGlkIGlucHV0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBrZXlJc1ZhbGlkKGtleTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gU2VhcmNoQmFyQ29tcG9uZW50LmludmFsaWRLZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTE7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHRoZSBzZWFyY2ggdGVybSBjaGFuZ2VzLCBlbWl0IGFuIGV2ZW50IGFuZCB0cmlnZ2VyIGFcclxuICAgKiByZXNlYXJjaCBpbiBldmVyeSBlbmFibGVkIHNlYXJjaCBzb3VyY2VzLlxyXG4gICAqIEBwYXJhbSB0ZXJtIFNlYXJjaCB0ZXJtXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvblNldFRlcm0odGVybTogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XHJcbiAgICB0aGlzLnNlYXJjaFRlcm1DaGFuZ2UuZW1pdCh0ZXJtKTtcclxuICAgIHRoaXMuZG9TZWFyY2godGVybSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uU2V0U2VhcmNoVHlwZShzZWFyY2hUeXBlOiBzdHJpbmcpIHtcclxuICAgIGlmIChzZWFyY2hUeXBlID09PSB1bmRlZmluZWQgfHwgc2VhcmNoVHlwZSA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZWFyY2hUeXBlQ2hhbmdlLmVtaXQoc2VhcmNoVHlwZSk7XHJcblxyXG4gICAgY29uc3QgcGxhY2Vob2xkZXIgPSBgaWdvLmdlby5zZWFyY2guJHtzZWFyY2hUeXBlLnRvTG93ZXJDYXNlKCl9LnBsYWNlaG9sZGVyYDtcclxuICAgIHRoaXMucGxhY2Vob2xkZXIkLm5leHQocGxhY2Vob2xkZXIpO1xyXG5cclxuICAgIHRoaXMuc2V0VGVybSh0aGlzLnRlcm0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRXhlY3V0ZSB0aGUgc2VhcmNoXHJcbiAgICogQHBhcmFtIHRlcm0gU2VhcmNoIHRlcm1cclxuICAgKi9cclxuICBwcml2YXRlIGRvU2VhcmNoKHRlcm06IHN0cmluZyB8IHVuZGVmaW5lZCkge1xyXG4gICAgY29uc3Qgc2x1ZyA9IHRlcm0gPyB0ZXJtLnJlcGxhY2UoLygjW15cXHNdKikvZywgJycpLnRyaW0oKSA6ICcnO1xyXG4gICAgaWYgKHNsdWcgPT09ICcnKSB7XHJcbiAgICAgIGlmICh0aGlzLnN0b3JlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLnN0b3JlLmNsZWFyKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnN0b3JlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5zdG9yZS5zb2Z0Q2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXNlYXJjaGVzID0gdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaCh0ZXJtLCB7XHJcbiAgICAgIGZvcmNlTkE6IHRoaXMuZm9yY2VOQVxyXG4gICAgfSk7XHJcbiAgICByZXNlYXJjaGVzLm1hcChyZXNlYXJjaCA9PiB7XHJcbiAgICAgIHJlc2VhcmNoLnJlcXVlc3Quc3Vic2NyaWJlKChyZXN1bHRzOiBTZWFyY2hSZXN1bHRbXSkgPT4ge1xyXG4gICAgICAgIHRoaXMub25SZXNlYXJjaENvbXBsZXRlZChyZXNlYXJjaCwgcmVzdWx0cyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGEgcmVzZWFyY2ggIGlzIGNvbXBsZXRlZCwgZW1pdCBhbiBldmVudCBhbmQgdXBkYXRlXHJcbiAgICogdGhlIHN0b3JlJ3MgaXRlbXMuXHJcbiAgICogQHBhcmFtIHJlc2VhcmNoIFJlc2VhcmNoXHJcbiAgICogQHBhcmFtIHJlc3VsdHMgUmVzZWFyY2ggcmVzdWx0c1xyXG4gICAqL1xyXG4gIHByaXZhdGUgb25SZXNlYXJjaENvbXBsZXRlZChyZXNlYXJjaDogUmVzZWFyY2gsIHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdKSB7XHJcbiAgICB0aGlzLnNlYXJjaC5lbWl0KHsgcmVzZWFyY2gsIHJlc3VsdHMgfSk7XHJcblxyXG4gICAgaWYgKHRoaXMuc3RvcmUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBjb25zdCBuZXdSZXN1bHRzID0gdGhpcy5zdG9yZVxyXG4gICAgICAgIC5hbGwoKVxyXG4gICAgICAgIC5maWx0ZXIocmVzdWx0ID0+IHJlc3VsdC5zb3VyY2UgIT09IHJlc2VhcmNoLnNvdXJjZSlcclxuICAgICAgICAuY29uY2F0KHJlc3VsdHMpO1xyXG4gICAgICB0aGlzLnN0b3JlLmxvYWQobmV3UmVzdWx0cyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==