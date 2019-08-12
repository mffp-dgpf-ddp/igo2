/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { Subject, EMPTY, timer } from 'rxjs';
import { debounce, distinctUntilChanged } from 'rxjs/operators';
import { EntityStore } from '@igo2/common';
import { SEARCH_TYPES } from '../shared/search.enums';
import { SearchService } from '../shared/search.service';
/**
 * Searchbar that triggers a research in all search sources enabled.
 * If the store input is defined, the search results will be loaded
 * into that store. An event is always emitted when a research is completed.
 */
var SearchBarComponent = /** @class */ (function () {
    function SearchBarComponent(searchService) {
        this.searchService = searchService;
        /**
         * Invalid keys
         */
        this.invalidKeys = ['Control', 'Shift', 'Alt'];
        /**
         * Search term stream
         */
        this.stream$ = new Subject();
        /**
         * Search term
         */
        this.term = '';
        /**
         * Whether a float label should be displayed
         */
        this.floatLabel = 'never';
        /**
         * Whether this component is disabled
         */
        this.disabled = false;
        /**
         * Icons color (search and clear)
         */
        this.color = 'primary';
        /**
         * Debounce time between each keystroke
         */
        this.debounce = 300;
        /**
         * Minimum term length required to trigger a research
         */
        this.minLength = 2;
        /**
         * List of available search types
         */
        this.searchTypes = SEARCH_TYPES;
        /**
         * Event emitted when the search term changes
         */
        this.change = new EventEmitter();
        /**
         * Event emitted when a research is completed
         */
        this.search = new EventEmitter();
        /**
         * Event emitted when the search type changes
         */
        this.searchTypeChange = new EventEmitter();
        this._placeholder = '';
    }
    Object.defineProperty(SearchBarComponent.prototype, "emptyClass", {
        /**
         * Host's empty class
         * @internal
         */
        get: /**
         * Host's empty class
         * \@internal
         * @return {?}
         */
        function () {
            return this.empty;
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
    Object.defineProperty(SearchBarComponent.prototype, "placeholder", {
        get: /**
         * @return {?}
         */
        function () {
            return this.empty ? this._placeholder : '';
        },
        /**
         * Search bar palceholder
         * @internal
         */
        set: /**
         * Search bar palceholder
         * \@internal
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._placeholder = value;
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
        this.stream$$ = this.stream$
            .pipe(debounce((/**
         * @param {?} term
         * @return {?}
         */
        function (term) {
            return term === '' ? EMPTY : timer(300);
        })), distinctUntilChanged())
            .subscribe((/**
         * @param {?} term
         * @return {?}
         */
        function (term) { return _this.onTermChange(term); }));
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
        this.stream$$.unsubscribe();
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
        var key = ((/** @type {?} */ (event.target))).value;
        if (!this.keyIsValid(key)) {
            return;
        }
        this.setTerm(key);
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
    SearchBarComponent.prototype.onSearchTypeChange = /**
     * Update the placeholder with the enabled search type. The placeholder
     * for all availables search typers needs to be defined in the locale
     * files or an error will be thrown.
     * \@internal
     * @param {?} searchType Enabled search type
     * @return {?}
     */
    function (searchType) {
        this.searchTypeChange.emit(searchType);
        this.placeholder = "search." + searchType.toLowerCase() + ".placeholder";
        this.doSearch(this.term);
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
        this.term = term;
        if (term.length >= this.minLength || term.length === 0) {
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
        this.term = '';
        this.stream$.next(this.term);
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
        return this.invalidKeys.indexOf(key) === -1;
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
    SearchBarComponent.prototype.onTermChange = /**
     * When the search term changes, emit an event and trigger a
     * research in every enabled search sources.
     * @private
     * @param {?} term Search term
     * @return {?}
     */
    function (term) {
        this.change.emit(term);
        this.doSearch(term);
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
        if (term === undefined || term === '') {
            if (this.store !== undefined) {
                this.store.clear();
            }
            return;
        }
        if (this.store !== undefined) {
            this.store.softClear();
        }
        /** @type {?} */
        var researches = this.searchService.search(term);
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
            var newResults = this.store.entities$.value
                .filter((/**
             * @param {?} result
             * @return {?}
             */
            function (result) { return result.source !== research.source; }))
                .concat(results);
            this.store.load(newResults);
        }
    };
    SearchBarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-search-bar',
                    template: "<div class=\"igo-search-bar-container\">\r\n  <mat-form-field [floatLabel]=\"floatLabel\">\r\n    <input\r\n      #input\r\n      matInput\r\n      autocomplete=\"off\"\r\n      [ngClass]=\"{'hasSearchIcon': searchIcon}\"\r\n      [disabled]=\"disabled\"\r\n      [placeholder]=\"placeholder | translate\"\r\n      [ngModel]=\"term\"\r\n      (keyup)=\"onKeyup($event)\"\r\n      (touchend)=\"onKeyup($event)\">\r\n  </mat-form-field>\r\n\r\n  <div class=\"search-bar-buttons\">\r\n    <button\r\n      mat-icon-button\r\n      [color]=\"color\"\r\n      *ngIf=\"searchIcon !== undefined\">\r\n      <mat-icon svgIcon=\"{{searchIcon}}\"></mat-icon>\r\n    </button>\r\n\r\n    <button\r\n      mat-icon-button\r\n      [color]=\"color\"\r\n      (click)=\"onClearButtonClick()\"\r\n      *ngIf=\"!empty\">\r\n      <mat-icon svgIcon=\"close\"></mat-icon>\r\n    </button>\r\n  </div>\r\n\r\n  <igo-search-selector\r\n    [searchTypes]=\"searchTypes\"\r\n    (change)=\"onSearchTypeChange($event)\">\r\n  </igo-search-selector>\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host ::ng-deep .mat-form-field{padding:0 5px}:host ::ng-deep .mat-form-field-wrapper{margin-bottom:-1.5em}:host ::ng-deep span.mat-form-field-label-wrapper{top:-20px}:host ::ng-deep div.mat-form-field-infix{left:5px;right:5px;padding:0 0 12px!important}:host ::ng-deep div.mat-form-field-underline{display:none}.igo-search-bar-container{position:relative;width:100%}.igo-search-bar-container>mat-form-field{width:calc(100% - (2 * 40px))}:host.empty .igo-search-bar-container>mat-form-field{width:calc(100% - 40px)}.search-bar-buttons{position:absolute;right:40px;top:0}.search-bar-buttons>button:nth-child(2)::before{content:'';position:absolute;left:0;top:5px;border-right:1px solid #ddd;height:28px}igo-search-selector{display:inline-block;background-color:#fff;position:absolute;right:0;top:0;border-radius:0}"]
                }] }
    ];
    /** @nocollapse */
    SearchBarComponent.ctorParameters = function () { return [
        { type: SearchService }
    ]; };
    SearchBarComponent.propDecorators = {
        term: [{ type: Input }],
        floatLabel: [{ type: Input }],
        disabled: [{ type: Input }],
        color: [{ type: Input }],
        debounce: [{ type: Input }],
        minLength: [{ type: Input }],
        searchIcon: [{ type: Input }],
        store: [{ type: Input }],
        searchTypes: [{ type: Input }],
        change: [{ type: Output }],
        search: [{ type: Output }],
        searchTypeChange: [{ type: Output }],
        input: [{ type: ViewChild, args: ['input',] }],
        emptyClass: [{ type: HostBinding, args: ['class.empty',] }]
    };
    return SearchBarComponent;
}());
export { SearchBarComponent };
if (false) {
    /**
     * Invalid keys
     * @type {?}
     * @private
     */
    SearchBarComponent.prototype.invalidKeys;
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
     * Search term
     * @type {?}
     */
    SearchBarComponent.prototype.term;
    /**
     * Whether a float label should be displayed
     * @type {?}
     */
    SearchBarComponent.prototype.floatLabel;
    /**
     * Whether this component is disabled
     * @type {?}
     */
    SearchBarComponent.prototype.disabled;
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
     * Search results store
     * @type {?}
     */
    SearchBarComponent.prototype.store;
    /**
     * List of available search types
     * @type {?}
     */
    SearchBarComponent.prototype.searchTypes;
    /**
     * Event emitted when the search term changes
     * @type {?}
     */
    SearchBarComponent.prototype.change;
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
     * Input element
     * \@internal
     * @type {?}
     */
    SearchBarComponent.prototype.input;
    /**
     * @type {?}
     * @private
     */
    SearchBarComponent.prototype._placeholder;
    /**
     * @type {?}
     * @private
     */
    SearchBarComponent.prototype.searchService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NlYXJjaC1iYXIvc2VhcmNoLWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBR1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDVixXQUFXLEVBQ1gsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxPQUFPLEVBQWdCLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWhFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXRELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7O0FBT3pEO0lBd0hFLDRCQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTs7OztRQTlHL0IsZ0JBQVcsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7Ozs7UUFLbkQsWUFBTyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7Ozs7UUFVL0IsU0FBSSxHQUFHLEVBQUUsQ0FBQzs7OztRQUtWLGVBQVUsR0FBbUIsT0FBTyxDQUFDOzs7O1FBS3JDLGFBQVEsR0FBRyxLQUFLLENBQUM7Ozs7UUFLakIsVUFBSyxHQUFHLFNBQVMsQ0FBQzs7OztRQUtsQixhQUFRLEdBQUcsR0FBRyxDQUFDOzs7O1FBS2YsY0FBUyxHQUFHLENBQUMsQ0FBQzs7OztRQWVkLGdCQUFXLEdBQWEsWUFBWSxDQUFDOzs7O1FBS3BDLFdBQU0sR0FBRyxJ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O1NBL1BZLGtCQUFrQjs7Ozs7OztJQUk3Qix5Q0FBMkQ7Ozs7OztJQUszRCxxQ0FBd0M7Ozs7OztJQUt4QyxzQ0FBK0I7Ozs7O0lBSy9CLGtDQUFtQjs7Ozs7SUFLbkIsd0NBQThDOzs7OztJQUs5QyxzQ0FBMEI7Ozs7O0lBSzFCLG1DQUEyQjs7Ozs7SUFLM0Isc0NBQXdCOzs7OztJQUt4Qix1Q0FBdUI7Ozs7O0lBS3ZCLHdDQUE0Qjs7Ozs7SUFLNUIsbUNBQTBDOzs7OztJQUsxQyx5Q0FBOEM7Ozs7O0lBSzlDLG9DQUE4Qzs7Ozs7SUFLOUMsb0NBR0s7Ozs7O0lBS0wsOENBQXdEOzs7Ozs7SUFNeEQsbUNBQXNDOzs7OztJQTZCdEMsMENBQTBCOzs7OztJQUVkLDJDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBWaWV3Q2hpbGQsXHJcbiAgRWxlbWVudFJlZixcclxuICBIb3N0QmluZGluZyxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGbG9hdExhYmVsVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiwgRU1QVFksIHRpbWVyIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IEVudGl0eVN0b3JlIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IFNFQVJDSF9UWVBFUyB9IGZyb20gJy4uL3NoYXJlZC9zZWFyY2guZW51bXMnO1xyXG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQsIFJlc2VhcmNoIH0gZnJvbSAnLi4vc2hhcmVkL3NlYXJjaC5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgU2VhcmNoU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZWFyY2guc2VydmljZSc7XHJcblxyXG4vKipcclxuICogU2VhcmNoYmFyIHRoYXQgdHJpZ2dlcnMgYSByZXNlYXJjaCBpbiBhbGwgc2VhcmNoIHNvdXJjZXMgZW5hYmxlZC5cclxuICogSWYgdGhlIHN0b3JlIGlucHV0IGlzIGRlZmluZWQsIHRoZSBzZWFyY2ggcmVzdWx0cyB3aWxsIGJlIGxvYWRlZFxyXG4gKiBpbnRvIHRoYXQgc3RvcmUuIEFuIGV2ZW50IGlzIGFsd2F5cyBlbWl0dGVkIHdoZW4gYSByZXNlYXJjaCBpcyBjb21wbGV0ZWQuXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1zZWFyY2gtYmFyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc2VhcmNoLWJhci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc2VhcmNoLWJhci5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hCYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgLyoqXHJcbiAgICogSW52YWxpZCBrZXlzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZWFkb25seSBpbnZhbGlkS2V5cyA9IFsnQ29udHJvbCcsICdTaGlmdCcsICdBbHQnXTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHRlcm0gc3RyZWFtXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdHJlYW0kID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIHNlYXJjaCB0ZXJtIHN0cmVhbVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RyZWFtJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHRlcm1cclxuICAgKi9cclxuICBASW5wdXQoKSB0ZXJtID0gJyc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgYSBmbG9hdCBsYWJlbCBzaG91bGQgYmUgZGlzcGxheWVkXHJcbiAgICovXHJcbiAgQElucHV0KCkgZmxvYXRMYWJlbDogRmxvYXRMYWJlbFR5cGUgPSAnbmV2ZXInO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoaXMgY29tcG9uZW50IGlzIGRpc2FibGVkXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogSWNvbnMgY29sb3IgKHNlYXJjaCBhbmQgY2xlYXIpXHJcbiAgICovXHJcbiAgQElucHV0KCkgY29sb3IgPSAncHJpbWFyeSc7XHJcblxyXG4gIC8qKlxyXG4gICAqIERlYm91bmNlIHRpbWUgYmV0d2VlbiBlYWNoIGtleXN0cm9rZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRlYm91bmNlID0gMzAwO1xyXG5cclxuICAvKipcclxuICAgKiBNaW5pbXVtIHRlcm0gbGVuZ3RoIHJlcXVpcmVkIHRvIHRyaWdnZXIgYSByZXNlYXJjaFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1pbkxlbmd0aCA9IDI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBpY29uXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2VhcmNoSWNvbjogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggcmVzdWx0cyBzdG9yZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0b3JlOiBFbnRpdHlTdG9yZTxTZWFyY2hSZXN1bHQ+O1xyXG5cclxuICAvKipcclxuICAgKiBMaXN0IG9mIGF2YWlsYWJsZSBzZWFyY2ggdHlwZXNcclxuICAgKi9cclxuICBASW5wdXQoKSBzZWFyY2hUeXBlczogc3RyaW5nW10gPSBTRUFSQ0hfVFlQRVM7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VhcmNoIHRlcm0gY2hhbmdlc1xyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIGEgcmVzZWFyY2ggaXMgY29tcGxldGVkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHNlYXJjaCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xyXG4gICAgcmVzZWFyY2g6IFJlc2VhcmNoO1xyXG4gICAgcmVzdWx0czogU2VhcmNoUmVzdWx0W107XHJcbiAgfT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWFyY2ggdHlwZSBjaGFuZ2VzXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHNlYXJjaFR5cGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5wdXQgZWxlbWVudFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIEBWaWV3Q2hpbGQoJ2lucHV0JykgaW5wdXQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gIC8qKlxyXG4gICAqIEhvc3QncyBlbXB0eSBjbGFzc1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZW1wdHknKVxyXG4gIGdldCBlbXB0eUNsYXNzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZW1wdHk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoZSBzZWFyY2ggYmFyIGlzIGVtcHR5XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IGVtcHR5KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMudGVybS5sZW5ndGggPT09IDA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggYmFyIHBhbGNlaG9sZGVyXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgc2V0IHBsYWNlaG9sZGVyKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gdmFsdWU7XHJcbiAgfVxyXG4gIGdldCBwbGFjZWhvbGRlcigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuZW1wdHkgPyB0aGlzLl9wbGFjZWhvbGRlciA6ICcnO1xyXG4gIH1cclxuICBwcml2YXRlIF9wbGFjZWhvbGRlciA9ICcnO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlYXJjaFNlcnZpY2U6IFNlYXJjaFNlcnZpY2UpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmliZSB0byB0aGUgc2VhcmNoIHRlcm0gc3RyZWFtIGFuZCB0cmlnZ2VyIHJlc2VhcmNoZXNcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuc3RyZWFtJCQgPSB0aGlzLnN0cmVhbSRcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgZGVib3VuY2UoKHRlcm06IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHRlcm0gPT09ICcnID8gRU1QVFkgOiB0aW1lcigzMDApO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKCh0ZXJtOiBzdHJpbmcpID0+IHRoaXMub25UZXJtQ2hhbmdlKHRlcm0pKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuc3Vic2NyaWJlIHRvIHRoZSBzZWFyY2ggdGVybSBzdHJlYW1cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuc3RyZWFtJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gYSB1c2VyIHR5cGVzLCB2YWxpZGF0ZXMgdGhlIGtleSBhbmQgc2VuZCBpdCBpbnRvIHRoZVxyXG4gICAqIHN0cmVhbSBpZiBpdCdzIHZhbGlkXHJcbiAgICogQHBhcmFtIGV2ZW50IEtleWJvYXJkIGV2ZW50XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25LZXl1cChldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgY29uc3Qga2V5ID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcclxuICAgIGlmICghdGhpcy5rZXlJc1ZhbGlkKGtleSkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRUZXJtKGtleSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgc3RyZWFtIGFuZCB0aGUgaW5wdXRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvbkNsZWFyQnV0dG9uQ2xpY2soKSB7XHJcbiAgICB0aGlzLmNsZWFyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgdGhlIHBsYWNlaG9sZGVyIHdpdGggdGhlIGVuYWJsZWQgc2VhcmNoIHR5cGUuIFRoZSBwbGFjZWhvbGRlclxyXG4gICAqIGZvciBhbGwgYXZhaWxhYmxlcyBzZWFyY2ggdHlwZXJzIG5lZWRzIHRvIGJlIGRlZmluZWQgaW4gdGhlIGxvY2FsZVxyXG4gICAqIGZpbGVzIG9yIGFuIGVycm9yIHdpbGwgYmUgdGhyb3duLlxyXG4gICAqIEBwYXJhbSBzZWFyY2hUeXBlIEVuYWJsZWQgc2VhcmNoIHR5cGVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvblNlYXJjaFR5cGVDaGFuZ2Uoc2VhcmNoVHlwZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnNlYXJjaFR5cGVDaGFuZ2UuZW1pdChzZWFyY2hUeXBlKTtcclxuICAgIHRoaXMucGxhY2Vob2xkZXIgPSBgc2VhcmNoLiR7c2VhcmNoVHlwZS50b0xvd2VyQ2FzZSgpfS5wbGFjZWhvbGRlcmA7XHJcbiAgICB0aGlzLmRvU2VhcmNoKHRoaXMudGVybSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZW5kIHRoZSB0ZXJtIGludG8gdGhlIHN0cmVhbSBvbmx5IGlmIHRoaXMgY29tcG9uZW50IGlzIG5vdCBkaXNhYmxlZFxyXG4gICAqIEBwYXJhbSB0ZXJtIFNlYXJjaCB0ZXJtXHJcbiAgICovXHJcbiAgc2V0VGVybSh0ZXJtOiBzdHJpbmcpIHtcclxuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnRlcm0gPSB0ZXJtO1xyXG4gICAgaWYgKHRlcm0ubGVuZ3RoID49IHRoaXMubWluTGVuZ3RoIHx8IHRlcm0ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRoaXMuc3RyZWFtJC5uZXh0KHRlcm0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhlIHN0cmVhbSBhbmQgdGhlIGlucHV0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjbGVhcigpIHtcclxuICAgIHRoaXMudGVybSA9ICcnO1xyXG4gICAgdGhpcy5zdHJlYW0kLm5leHQodGhpcy50ZXJtKTtcclxuICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVmFsaWRhdGUgaWYgYSBnaXZlbiBrZXkgc3Ryb2tlIGlzIGEgdmFsaWQgaW5wdXRcclxuICAgKi9cclxuICBwcml2YXRlIGtleUlzVmFsaWQoa2V5OiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLmludmFsaWRLZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTE7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHRoZSBzZWFyY2ggdGVybSBjaGFuZ2VzLCBlbWl0IGFuIGV2ZW50IGFuZCB0cmlnZ2VyIGFcclxuICAgKiByZXNlYXJjaCBpbiBldmVyeSBlbmFibGVkIHNlYXJjaCBzb3VyY2VzLlxyXG4gICAqIEBwYXJhbSB0ZXJtIFNlYXJjaCB0ZXJtXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvblRlcm1DaGFuZ2UodGVybTogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XHJcbiAgICB0aGlzLmNoYW5nZS5lbWl0KHRlcm0pO1xyXG4gICAgdGhpcy5kb1NlYXJjaCh0ZXJtKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4ZWN1dGUgdGhlIHNlYXJjaFxyXG4gICAqIEBwYXJhbSB0ZXJtIFNlYXJjaCB0ZXJtXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkb1NlYXJjaCh0ZXJtOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcclxuICAgIGlmICh0ZXJtID09PSB1bmRlZmluZWQgfHwgdGVybSA9PT0gJycpIHtcclxuICAgICAgaWYgKHRoaXMuc3RvcmUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuc3RvcmUuY2xlYXIoKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuc3RvcmUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnN0b3JlLnNvZnRDbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlc2VhcmNoZXMgPSB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoKHRlcm0pO1xyXG4gICAgcmVzZWFyY2hlcy5tYXAocmVzZWFyY2ggPT4ge1xyXG4gICAgICByZXNlYXJjaC5yZXF1ZXN0LnN1YnNjcmliZSgocmVzdWx0czogU2VhcmNoUmVzdWx0W10pID0+IHtcclxuICAgICAgICB0aGlzLm9uUmVzZWFyY2hDb21wbGV0ZWQocmVzZWFyY2gsIHJlc3VsdHMpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBhIHJlc2VhcmNoICBpcyBjb21wbGV0ZWQsIGVtaXQgYW4gZXZlbnQgYW5kIHVwZGF0ZVxyXG4gICAqIHRoZSBzdG9yZSdzIGl0ZW1zLlxyXG4gICAqIEBwYXJhbSByZXNlYXJjaCBSZXNlYXJjaFxyXG4gICAqIEBwYXJhbSByZXN1bHRzIFJlc2VhcmNoIHJlc3VsdHNcclxuICAgKi9cclxuICBwcml2YXRlIG9uUmVzZWFyY2hDb21wbGV0ZWQocmVzZWFyY2g6IFJlc2VhcmNoLCByZXN1bHRzOiBTZWFyY2hSZXN1bHRbXSkge1xyXG4gICAgdGhpcy5zZWFyY2guZW1pdCh7IHJlc2VhcmNoLCByZXN1bHRzIH0pO1xyXG5cclxuICAgIGlmICh0aGlzLnN0b3JlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgY29uc3QgbmV3UmVzdWx0cyA9IHRoaXMuc3RvcmUuZW50aXRpZXMkLnZhbHVlXHJcbiAgICAgICAgLmZpbHRlcihyZXN1bHQgPT4gcmVzdWx0LnNvdXJjZSAhPT0gcmVzZWFyY2guc291cmNlKVxyXG4gICAgICAgIC5jb25jYXQocmVzdWx0cyk7XHJcbiAgICAgIHRoaXMuc3RvcmUubG9hZChuZXdSZXN1bHRzKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19