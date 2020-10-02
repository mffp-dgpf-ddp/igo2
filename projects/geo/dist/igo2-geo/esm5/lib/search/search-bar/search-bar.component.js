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
        if (this.researches$$) {
            this.researches$$.map((/**
             * @param {?} research
             * @return {?}
             */
            function (research) { return research.unsubscribe(); }));
            this.researches$$ = undefined;
        }
        /** @type {?} */
        var slug = term ? term.replace(/(#[^\s]*)/g, '').trim() : '';
        if (slug === '') {
            if (this.store !== undefined) {
                this.store.clear();
            }
            return;
        }
        /** @type {?} */
        var researches = this.searchService.search(term, {
            forceNA: this.forceNA
        });
        this.researches$$ = researches.map((/**
         * @param {?} research
         * @return {?}
         */
        function (research) {
            return research.request.subscribe((/**
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NlYXJjaC1iYXIvc2VhcmNoLWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBR1QsdUJBQXVCLEVBQ3ZCLEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFNBQVMsRUFDVCxVQUFVLEVBQ1gsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLGVBQWUsRUFBZ0IsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRSxPQUFPLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFaEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7OztBQU96RDtJQXdMRSw0QkFDVSxlQUFnQyxFQUNoQyxhQUE0QjtRQUQ1QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUF0SzdCLGlCQUFZLEdBQTRCLElBQUksZUFBZSxDQUNsRSw0QkFBNEIsQ0FDN0IsQ0FBQztRQUVPLFdBQU0sR0FBNkIsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7UUFVOUQsWUFBTyxHQUE0QixJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7OztRQWlCMUQsZ0JBQVcsR0FBYSxZQUFZLENBQUM7UUFZckMsZ0JBQVcsR0FBNEIsSUFBSSxlQUFlLENBQ2pFLFNBQVMsQ0FDVixDQUFDOzs7O1FBS1EseUJBQW9CLEdBQUcsSUFB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dGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgVmlld0NoaWxkLFxyXG4gIEVsZW1lbnRSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRmxvYXRMYWJlbFR5cGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiwgRU1QVFksIHRpbWVyIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IExhbmd1YWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBFbnRpdHlTdG9yZSB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBTRUFSQ0hfVFlQRVMgfSBmcm9tICcuLi9zaGFyZWQvc2VhcmNoLmVudW1zJztcclxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0LCBSZXNlYXJjaCB9IGZyb20gJy4uL3NoYXJlZC9zZWFyY2guaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IFNlYXJjaFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VhcmNoLnNlcnZpY2UnO1xyXG5cclxuLyoqXHJcbiAqIFNlYXJjaGJhciB0aGF0IHRyaWdnZXJzIGEgcmVzZWFyY2ggaW4gYWxsIHNlYXJjaCBzb3VyY2VzIGVuYWJsZWQuXHJcbiAqIElmIHRoZSBzdG9yZSBpbnB1dCBpcyBkZWZpbmVkLCB0aGUgc2VhcmNoIHJlc3VsdHMgd2lsbCBiZSBsb2FkZWRcclxuICogaW50byB0aGF0IHN0b3JlLiBBbiBldmVudCBpcyBhbHdheXMgZW1pdHRlZCB3aGVuIGEgcmVzZWFyY2ggaXMgY29tcGxldGVkLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tc2VhcmNoLWJhcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NlYXJjaC1iYXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3NlYXJjaC1iYXIuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VhcmNoQmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIEludmFsaWQga2V5c1xyXG4gICAqL1xyXG4gIHN0YXRpYyBpbnZhbGlkS2V5cyA9IFtcclxuICAgICdDb250cm9sJyxcclxuICAgICdTaGlmdCcsXHJcbiAgICAnQWx0JyxcclxuICAgICdBcnJvd0Rvd24nLFxyXG4gICAgJ0Fycm93VXAnLFxyXG4gICAgJ0Fycm93UmlnaHQnLFxyXG4gICAgJ0Fycm93TGVmdCdcclxuICBdO1xyXG5cclxuICByZWFkb25seSBwbGFjZWhvbGRlciQ6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChcclxuICAgICdpZ28uZ2VvLnNlYXJjaC5wbGFjZWhvbGRlcidcclxuICApO1xyXG5cclxuICByZWFkb25seSBlbXB0eSQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QodHJ1ZSk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgc3NlYXJjaCBiYXIgdGVybVxyXG4gICAqL1xyXG4gIHByaXZhdGUgdGVybSQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCB0ZXJtIHN0cmVhbVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RyZWFtJDogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KCcnKTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvIHRoZSBzZWFyY2ggdGVybSBzdHJlYW1cclxuICAgKi9cclxuICBwcml2YXRlIHN0cmVhbSQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgc2VhcmNoIHR5cGVcclxuICAgKi9cclxuICBwcml2YXRlIHNlYXJjaFR5cGUkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBwcml2YXRlIHJlc2VhcmNoZXMkJDogU3Vic2NyaXB0aW9uW107XHJcblxyXG4gIC8qKlxyXG4gICAqIExpc3Qgb2YgYXZhaWxhYmxlIHNlYXJjaCB0eXBlc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNlYXJjaFR5cGVzOiBzdHJpbmdbXSA9IFNFQVJDSF9UWVBFUztcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHRlcm1cclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCBzZWFyY2hUeXBlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuc2V0U2VhcmNoVHlwZSh2YWx1ZSk7XHJcbiAgfVxyXG4gIGdldCBzZWFyY2hUeXBlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWFyY2hUeXBlJC52YWx1ZTtcclxuICB9XHJcbiAgcmVhZG9ubHkgc2VhcmNoVHlwZSQ6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChcclxuICAgIHVuZGVmaW5lZFxyXG4gICk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgcG9pbnRlciBzdW1tYXJ5IGlzIGFjdGl2YXRlZCBieSB0aGUgc2VhcmNoYmFyIHNldHRpbmdcclxuICAgKi9cclxuICBAT3V0cHV0KCkgcG9pbnRlclN1bW1hcnlTdGF0dXMgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCB0ZXJtXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBzZXQgdGVybSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnNldFRlcm0odmFsdWUpO1xyXG4gIH1cclxuICBnZXQgdGVybSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMudGVybSQudmFsdWU7XHJcbiAgfVxyXG4gIHJlYWRvbmx5IHRlcm0kOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoJycpO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoaXMgY29tcG9uZW50IGlzIGRpc2FibGVkXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuZGlzYWJsZWQkLm5leHQodmFsdWUpO1xyXG4gIH1cclxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCQudmFsdWU7XHJcbiAgfVxyXG4gIHJlYWRvbmx5IGRpc2FibGVkJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XHJcblxyXG4gIEBJbnB1dCgpIHBvaW50ZXJTdW1tYXJ5RW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgYSBmbG9hdCBsYWJlbCBzaG91bGQgYmUgZGlzcGxheWVkXHJcbiAgICovXHJcbiAgQElucHV0KCkgZmxvYXRMYWJlbDogRmxvYXRMYWJlbFR5cGUgPSAnbmV2ZXInO1xyXG5cclxuICAvKipcclxuICAgKiBJY29ucyBjb2xvciAoc2VhcmNoIGFuZCBjbGVhcilcclxuICAgKi9cclxuICBASW5wdXQoKSBjb2xvciA9ICdwcmltYXJ5JztcclxuXHJcbiAgLyoqXHJcbiAgICogRGVib3VuY2UgdGltZSBiZXR3ZWVuIGVhY2gga2V5c3Ryb2tlXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGVib3VuY2UgPSAyMDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIE1pbmltdW0gdGVybSBsZW5ndGggcmVxdWlyZWQgdG8gdHJpZ2dlciBhIHJlc2VhcmNoXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWluTGVuZ3RoID0gMjtcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIGljb25cclxuICAgKi9cclxuICBASW5wdXQoKSBzZWFyY2hJY29uOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBTZWxlY3RvclxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNlYXJjaFNlbGVjdG9yID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBTZXR0aW5nc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNlYXJjaFNldHRpbmdzID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZvcmNlIGNvb3JkaW5hdGVzIGluIG5vcnRoIGFtZXJpY2FcclxuICAgKi9cclxuICBASW5wdXQoKSBmb3JjZU5BID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCByZXN1bHRzIHN0b3JlXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3RvcmU6IEVudGl0eVN0b3JlPFNlYXJjaFJlc3VsdD47XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VhcmNoIHRlcm0gY2hhbmdlc1xyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzZWFyY2hUZXJtQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiBhIHJlc2VhcmNoIGlzIGNvbXBsZXRlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzZWFyY2ggPSBuZXcgRXZlbnRFbWl0dGVyPHtcclxuICAgIHJlc2VhcmNoOiBSZXNlYXJjaDtcclxuICAgIHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdO1xyXG4gIH0+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VhcmNoIHR5cGUgY2hhbmdlc1xyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzZWFyY2hUeXBlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VhcmNoIHR5cGUgY2hhbmdlc1xyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBjbGVhckZlYXR1cmUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VhcmNoIHNldHRpbmdzIGNoYW5nZXNcclxuICAgKi9cclxuICBAT3V0cHV0KCkgc2VhcmNoU2V0dGluZ3NDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIElucHV0IGVsZW1lbnRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBAVmlld0NoaWxkKCdpbnB1dCcpIGlucHV0OiBFbGVtZW50UmVmO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoZSBzZWFyY2ggYmFyIGlzIGVtcHR5XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IGVtcHR5KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMudGVybS5sZW5ndGggPT09IDA7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHNlYXJjaFNlcnZpY2U6IFNlYXJjaFNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmliZSB0byB0aGUgc2VhcmNoIHRlcm0gc3RyZWFtIGFuZCB0cmlnZ2VyIHJlc2VhcmNoZXNcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMudGVybSQkID0gdGhpcy50ZXJtJC5zdWJzY3JpYmUoKHRlcm06IHN0cmluZykgPT4ge1xyXG4gICAgICB0aGlzLmVtcHR5JC5uZXh0KHRlcm0gPT09IHVuZGVmaW5lZCB8fCB0ZXJtLmxlbmd0aCA9PT0gMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnN0cmVhbSQkID0gdGhpcy5zdHJlYW0kXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIGRlYm91bmNlKCh0ZXJtOiBzdHJpbmcpID0+ICh0ZXJtID09PSAnJyA/IEVNUFRZIDogdGltZXIodGhpcy5kZWJvdW5jZSkpKVxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUoKHRlcm06IHN0cmluZykgPT4gdGhpcy5vblNldFRlcm0odGVybSkpO1xyXG5cclxuICAgIHRoaXMuc2VhcmNoVHlwZSQkID0gdGhpcy5zZWFyY2hUeXBlJFxyXG4gICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKVxyXG4gICAgICAuc3Vic2NyaWJlKChzZWFyY2hUeXBlOiBzdHJpbmcpID0+IHRoaXMub25TZXRTZWFyY2hUeXBlKHNlYXJjaFR5cGUpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuc3Vic2NyaWJlIHRvIHRoZSBzZWFyY2ggdGVybSBzdHJlYW1cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMudGVybSQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLnN0cmVhbSQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLnNlYXJjaFR5cGUkJC51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBhIHVzZXIgdHlwZXMsIHZhbGlkYXRlcyB0aGUga2V5IGFuZCBzZW5kIGl0IGludG8gdGhlXHJcbiAgICogc3RyZWFtIGlmIGl0J3MgdmFsaWRcclxuICAgKiBAcGFyYW0gZXZlbnQgS2V5Ym9hcmQgZXZlbnRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvbktleXVwKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICBjb25zdCBrZXkgPSBldmVudC5rZXk7XHJcbiAgICBpZiAoIXRoaXMua2V5SXNWYWxpZChrZXkpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHRlcm0gPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xyXG4gICAgdGhpcy5zZXRUZXJtKHRlcm0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhlIHN0cmVhbSBhbmQgdGhlIGlucHV0XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25DbGVhckJ1dHRvbkNsaWNrKCkge1xyXG4gICAgdGhpcy5jbGVhcigpO1xyXG4gICAgdGhpcy5jbGVhckZlYXR1cmUuZW1pdCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHNlYXJjaCB0eXBlXHJcbiAgICogQHBhcmFtIHNlYXJjaFR5cGUgRW5hYmxlZCBzZWFyY2ggdHlwZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uU2VhcmNoVHlwZUNoYW5nZShzZWFyY2hUeXBlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuc2V0U2VhcmNoVHlwZShzZWFyY2hUeXBlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSB0aGUgcGxhY2Vob2xkZXIgd2l0aCB0aGUgZW5hYmxlZCBzZWFyY2ggdHlwZS4gVGhlIHBsYWNlaG9sZGVyXHJcbiAgICogZm9yIGFsbCBhdmFpbGFibGVzIHNlYXJjaCB0eXBlcnMgbmVlZHMgdG8gYmUgZGVmaW5lZCBpbiB0aGUgbG9jYWxlXHJcbiAgICogZmlsZXMgb3IgYW4gZXJyb3Igd2lsbCBiZSB0aHJvd24uXHJcbiAgICogQHBhcmFtIHNlYXJjaFR5cGUgRW5hYmxlZCBzZWFyY2ggdHlwZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHNldFNlYXJjaFR5cGUoc2VhcmNoVHlwZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnNlYXJjaFR5cGUkLm5leHQoc2VhcmNoVHlwZSk7XHJcbiAgfVxyXG5cclxuICBvblNlYXJjaFNldHRpbmdzQ2hhbmdlKCkge1xyXG4gICAgdGhpcy5kb1NlYXJjaCh0aGlzLnRlcm0pO1xyXG4gICAgdGhpcy5zZWFyY2hTZXR0aW5nc0NoYW5nZS5lbWl0KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZW5kIHRoZSB0ZXJtIGludG8gdGhlIHN0cmVhbSBvbmx5IGlmIHRoaXMgY29tcG9uZW50IGlzIG5vdCBkaXNhYmxlZFxyXG4gICAqIEBwYXJhbSB0ZXJtIFNlYXJjaCB0ZXJtXHJcbiAgICovXHJcbiAgc2V0VGVybSh0ZXJtOiBzdHJpbmcpIHtcclxuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0ZXJtID0gdGVybSB8fCAnJztcclxuXHJcbiAgICBpZiAodGVybSAhPT0gdGhpcy50ZXJtKSB7XHJcbiAgICAgIHRoaXMudGVybSQubmV4dCh0ZXJtKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzbHVnID0gdGVybS5yZXBsYWNlKC8oI1teXFxzXSopL2csICcnKS50cmltKCk7XHJcbiAgICBpZiAoc2x1Zy5sZW5ndGggPj0gdGhpcy5taW5MZW5ndGggfHwgc2x1Zy5sZW5ndGggPT09IDApIHtcclxuICAgICAgdGhpcy5zdHJlYW0kLm5leHQodGVybSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgc3RyZWFtIGFuZCB0aGUgaW5wdXRcclxuICAgKi9cclxuICBwcml2YXRlIGNsZWFyKCkge1xyXG4gICAgdGhpcy50ZXJtJC5uZXh0KCcnKTtcclxuICAgIHRoaXMuc3RyZWFtJC5uZXh0KCcnKTtcclxuICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVmFsaWRhdGUgaWYgYSBnaXZlbiBrZXkgc3Ryb2tlIGlzIGEgdmFsaWQgaW5wdXRcclxuICAgKi9cclxuICBwcml2YXRlIGtleUlzVmFsaWQoa2V5OiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBTZWFyY2hCYXJDb21wb25lbnQuaW52YWxpZEtleXMuaW5kZXhPZihrZXkpID09PSAtMTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdGhlIHNlYXJjaCB0ZXJtIGNoYW5nZXMsIGVtaXQgYW4gZXZlbnQgYW5kIHRyaWdnZXIgYVxyXG4gICAqIHJlc2VhcmNoIGluIGV2ZXJ5IGVuYWJsZWQgc2VhcmNoIHNvdXJjZXMuXHJcbiAgICogQHBhcmFtIHRlcm0gU2VhcmNoIHRlcm1cclxuICAgKi9cclxuICBwcml2YXRlIG9uU2V0VGVybSh0ZXJtOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcclxuICAgIHRoaXMuc2VhcmNoVGVybUNoYW5nZS5lbWl0KHRlcm0pO1xyXG4gICAgdGhpcy5kb1NlYXJjaCh0ZXJtKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25TZXRTZWFyY2hUeXBlKHNlYXJjaFR5cGU6IHN0cmluZykge1xyXG4gICAgaWYgKHNlYXJjaFR5cGUgPT09IHVuZGVmaW5lZCB8fCBzZWFyY2hUeXBlID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNlYXJjaFR5cGVDaGFuZ2UuZW1pdChzZWFyY2hUeXBlKTtcclxuXHJcbiAgICBjb25zdCBwbGFjZWhvbGRlciA9IGBpZ28uZ2VvLnNlYXJjaC4ke3NlYXJjaFR5cGUudG9Mb3dlckNhc2UoKX0ucGxhY2Vob2xkZXJgO1xyXG4gICAgdGhpcy5wbGFjZWhvbGRlciQubmV4dChwbGFjZWhvbGRlcik7XHJcblxyXG4gICAgdGhpcy5zZXRUZXJtKHRoaXMudGVybSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFeGVjdXRlIHRoZSBzZWFyY2hcclxuICAgKiBAcGFyYW0gdGVybSBTZWFyY2ggdGVybVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZG9TZWFyY2godGVybTogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XHJcbiAgICBpZiAodGhpcy5yZXNlYXJjaGVzJCQpIHtcclxuICAgICAgdGhpcy5yZXNlYXJjaGVzJCQubWFwKHJlc2VhcmNoID0+IHJlc2VhcmNoLnVuc3Vic2NyaWJlKCkpO1xyXG4gICAgICB0aGlzLnJlc2VhcmNoZXMkJCA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzbHVnID0gdGVybSA/IHRlcm0ucmVwbGFjZSgvKCNbXlxcc10qKS9nLCAnJykudHJpbSgpIDogJyc7XHJcbiAgICBpZiAoc2x1ZyA9PT0gJycpIHtcclxuICAgICAgaWYgKHRoaXMuc3RvcmUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuc3RvcmUuY2xlYXIoKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzZWFyY2hlcyA9IHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2godGVybSwge1xyXG4gICAgICBmb3JjZU5BOiB0aGlzLmZvcmNlTkFcclxuICAgIH0pO1xyXG4gICAgdGhpcy5yZXNlYXJjaGVzJCQgPSByZXNlYXJjaGVzLm1hcChyZXNlYXJjaCA9PiB7XHJcbiAgICAgIHJldHVybiByZXNlYXJjaC5yZXF1ZXN0LnN1YnNjcmliZSgocmVzdWx0czogU2VhcmNoUmVzdWx0W10pID0+IHtcclxuICAgICAgICB0aGlzLm9uUmVzZWFyY2hDb21wbGV0ZWQocmVzZWFyY2gsIHJlc3VsdHMpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBhIHJlc2VhcmNoICBpcyBjb21wbGV0ZWQsIGVtaXQgYW4gZXZlbnQgYW5kIHVwZGF0ZVxyXG4gICAqIHRoZSBzdG9yZSdzIGl0ZW1zLlxyXG4gICAqIEBwYXJhbSByZXNlYXJjaCBSZXNlYXJjaFxyXG4gICAqIEBwYXJhbSByZXN1bHRzIFJlc2VhcmNoIHJlc3VsdHNcclxuICAgKi9cclxuICBwcml2YXRlIG9uUmVzZWFyY2hDb21wbGV0ZWQocmVzZWFyY2g6IFJlc2VhcmNoLCByZXN1bHRzOiBTZWFyY2hSZXN1bHRbXSkge1xyXG4gICAgdGhpcy5zZWFyY2guZW1pdCh7IHJlc2VhcmNoLCByZXN1bHRzIH0pO1xyXG5cclxuICAgIGlmICh0aGlzLnN0b3JlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgY29uc3QgbmV3UmVzdWx0cyA9IHRoaXMuc3RvcmVcclxuICAgICAgICAuYWxsKClcclxuICAgICAgICAuZmlsdGVyKHJlc3VsdCA9PiByZXN1bHQuc291cmNlICE9PSByZXNlYXJjaC5zb3VyY2UpXHJcbiAgICAgICAgLmNvbmNhdChyZXN1bHRzKTtcclxuICAgICAgdGhpcy5zdG9yZS5sb2FkKG5ld1Jlc3VsdHMpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=