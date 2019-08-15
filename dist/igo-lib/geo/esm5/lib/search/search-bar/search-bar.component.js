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
        /**
         * Event emitted when the search type changes
         */
        this.clearFeature = new EventEmitter();
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
        this.clearFeature.emit();
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
        if (term.replace(/(#[^\s]*)/g, '').trim().length >= this.minLength ||
            term.replace(/(#[^\s]*)/g, '').trim().length === 0) {
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
        if (term === undefined || term.replace(/(#[^\s]*)/g, '').trim() === '') {
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
                    template: "<div class=\"igo-search-bar-container\">\r\n  <mat-form-field [floatLabel]=\"floatLabel\">\r\n    <input\r\n      #input\r\n      matInput\r\n      autocomplete=\"off\"\r\n      [ngClass]=\"{'hasSearchIcon': searchIcon}\"\r\n      [disabled]=\"disabled\"\r\n      [placeholder]=\"placeholder | translate\"\r\n      [ngModel]=\"term\"\r\n      (keyup)=\"onKeyup($event)\"\r\n      (touchend)=\"onKeyup($event)\">\r\n  </mat-form-field>\r\n\r\n  <div class=\"search-bar-buttons\">\r\n    <button\r\n      mat-icon-button\r\n      [color]=\"color\"\r\n      *ngIf=\"searchIcon !== undefined\">\r\n      <mat-icon svgIcon=\"{{searchIcon}}\"></mat-icon>\r\n    </button>\r\n\r\n    <button\r\n      mat-icon-button\r\n      [color]=\"color\"\r\n      (click)=\"onClearButtonClick()\"\r\n      *ngIf=\"!empty\">\r\n      <mat-icon svgIcon=\"close\"></mat-icon>\r\n    </button>\r\n\r\n    <igo-search-selector\r\n      [searchTypes]=\"searchTypes\"\r\n      (change)=\"onSearchTypeChange($event)\">\r\n    </igo-search-selector>\r\n\r\n    <igo-search-settings></igo-search-settings>\r\n  </div>\r\n\r\n\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host ::ng-deep .mat-form-field{padding:0 5px}:host ::ng-deep .mat-form-field-wrapper{margin-bottom:-1.5em}:host ::ng-deep span.mat-form-field-label-wrapper{top:-20px}:host ::ng-deep div.mat-form-field-infix{left:5px;right:5px;padding:0 0 12px!important}:host ::ng-deep div.mat-form-field-underline{display:none}.igo-search-bar-container{position:relative;width:100%;display:inline-flex;overflow:hidden}.igo-search-bar-container>mat-form-field{width:calc(100% - (2 * 40px))}:host.empty .igo-search-bar-container>mat-form-field{width:calc(100% - 40px)}.search-bar-buttons{position:relative;right:0;display:inline-flex;top:0}.search-bar-buttons>button:nth-child(2)::before{content:'';left:0;top:5px;border-right:1px solid #ddd;height:28px}igo-search-selector,igo-search-settings{background-color:#fff;top:0;border-radius:0}"]
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
        clearFeature: [{ type: Output }],
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
     * Event emitted when the search type changes
     * @type {?}
     */
    SearchBarComponent.prototype.clearFeature;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NlYXJjaC1iYXIvc2VhcmNoLWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBR1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDVixXQUFXLEVBQ1gsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxPQUFPLEVBQWdCLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWhFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXRELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7O0FBT3pEO0lBNkhFLDRCQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTs7OztRQW5IL0IsZ0JBQVcsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7Ozs7UUFLbkQsWUFBTyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7Ozs7UUFVL0IsU0FBSSxHQUFHLEVBQUUsQ0FBQzs7OztRQUtWLGVBQVUsR0FBbUIsT0FBTyxDQUFDOzs7O1FBS3JDLGFBQVEsR0FBRyxLQUFLLENBQUM7Ozs7UUFLakIsVUFBSyxHQUFHLFNBQVMsQ0FBQzs7OztRQUtsQixhQUFRLEdBQUcsR0FBRyxDQUFDOzs7O1FBS2YsY0FBUyxHQUFHLENBQUMsQ0FBQzs7OztRQWVkLGdCQUFXLEdBQWEsWUFBWSxDQUFDOzs7O1FBS3BDLFdBQU0sR0FBRyxJ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OztpQkFDaEQ7Ozs7Z0JBWlEsYUFBYTs7O3VCQWdDbkIsS0FBSzs2QkFLTCxLQUFLOzJCQUtMLEtBQUs7d0JBS0wsS0FBSzsyQkFLTCxLQUFLOzRCQUtMLEtBQUs7NkJBS0wsS0FBSzt3QkFLTCxLQUFLOzhCQUtMLEtBQUs7eUJBS0wsTUFBTTt5QkFLTixNQUFNO21DQVFOLE1BQU07K0JBS04sTUFBTTt3QkFNTixTQUFTLFNBQUMsT0FBTzs2QkFNakIsV0FBVyxTQUFDLGFBQWE7O0lBd0s1Qix5QkFBQztDQUFBLEFBNVFELElBNFFDO1NBdFFZLGtCQUFrQjs7Ozs7OztJQUk3Qix5Q0FBMkQ7Ozs7OztJQUszRCxxQ0FBd0M7Ozs7OztJQUt4QyxzQ0FBK0I7Ozs7O0lBSy9CLGtDQUFtQjs7Ozs7SUFLbkIsd0NBQThDOzs7OztJQUs5QyxzQ0FBMEI7Ozs7O0lBSzFCLG1DQUEyQjs7Ozs7SUFLM0Isc0NBQXdCOzs7OztJQUt4Qix1Q0FBdUI7Ozs7O0lBS3ZCLHdDQUE0Qjs7Ozs7SUFLNUIsbUNBQTBDOzs7OztJQUsxQyx5Q0FBOEM7Ozs7O0lBSzlDLG9DQUE4Qzs7Ozs7SUFLOUMsb0NBR0s7Ozs7O0lBS0wsOENBQXdEOzs7OztJQUt4RCwwQ0FBNEM7Ozs7OztJQU01QyxtQ0FBc0M7Ozs7O0lBNkJ0QywwQ0FBMEI7Ozs7O0lBRWQsMkNBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIFZpZXdDaGlsZCxcclxuICBFbGVtZW50UmVmLFxyXG4gIEhvc3RCaW5kaW5nLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZsb2F0TGFiZWxUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uLCBFTVBUWSwgdGltZXIgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGVib3VuY2UsIGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgRW50aXR5U3RvcmUgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgU0VBUkNIX1RZUEVTIH0gZnJvbSAnLi4vc2hhcmVkL3NlYXJjaC5lbnVtcyc7XHJcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCwgUmVzZWFyY2ggfSBmcm9tICcuLi9zaGFyZWQvc2VhcmNoLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlYXJjaC5zZXJ2aWNlJztcclxuXHJcbi8qKlxyXG4gKiBTZWFyY2hiYXIgdGhhdCB0cmlnZ2VycyBhIHJlc2VhcmNoIGluIGFsbCBzZWFyY2ggc291cmNlcyBlbmFibGVkLlxyXG4gKiBJZiB0aGUgc3RvcmUgaW5wdXQgaXMgZGVmaW5lZCwgdGhlIHNlYXJjaCByZXN1bHRzIHdpbGwgYmUgbG9hZGVkXHJcbiAqIGludG8gdGhhdCBzdG9yZS4gQW4gZXZlbnQgaXMgYWx3YXlzIGVtaXR0ZWQgd2hlbiBhIHJlc2VhcmNoIGlzIGNvbXBsZXRlZC5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXNlYXJjaC1iYXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWFyY2gtYmFyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zZWFyY2gtYmFyLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFNlYXJjaEJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAvKipcclxuICAgKiBJbnZhbGlkIGtleXNcclxuICAgKi9cclxuICBwcml2YXRlIHJlYWRvbmx5IGludmFsaWRLZXlzID0gWydDb250cm9sJywgJ1NoaWZ0JywgJ0FsdCddO1xyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggdGVybSBzdHJlYW1cclxuICAgKi9cclxuICBwcml2YXRlIHN0cmVhbSQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgc2VhcmNoIHRlcm0gc3RyZWFtXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdHJlYW0kJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggdGVybVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHRlcm0gPSAnJztcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBhIGZsb2F0IGxhYmVsIHNob3VsZCBiZSBkaXNwbGF5ZWRcclxuICAgKi9cclxuICBASW5wdXQoKSBmbG9hdExhYmVsOiBGbG9hdExhYmVsVHlwZSA9ICduZXZlcic7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhpcyBjb21wb25lbnQgaXMgZGlzYWJsZWRcclxuICAgKi9cclxuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBJY29ucyBjb2xvciAoc2VhcmNoIGFuZCBjbGVhcilcclxuICAgKi9cclxuICBASW5wdXQoKSBjb2xvciA9ICdwcmltYXJ5JztcclxuXHJcbiAgLyoqXHJcbiAgICogRGVib3VuY2UgdGltZSBiZXR3ZWVuIGVhY2gga2V5c3Ryb2tlXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGVib3VuY2UgPSAzMDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIE1pbmltdW0gdGVybSBsZW5ndGggcmVxdWlyZWQgdG8gdHJpZ2dlciBhIHJlc2VhcmNoXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWluTGVuZ3RoID0gMjtcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIGljb25cclxuICAgKi9cclxuICBASW5wdXQoKSBzZWFyY2hJY29uOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCByZXN1bHRzIHN0b3JlXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3RvcmU6IEVudGl0eVN0b3JlPFNlYXJjaFJlc3VsdD47XHJcblxyXG4gIC8qKlxyXG4gICAqIExpc3Qgb2YgYXZhaWxhYmxlIHNlYXJjaCB0eXBlc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNlYXJjaFR5cGVzOiBzdHJpbmdbXSA9IFNFQVJDSF9UWVBFUztcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWFyY2ggdGVybSBjaGFuZ2VzXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gYSByZXNlYXJjaCBpcyBjb21wbGV0ZWRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgc2VhcmNoID0gbmV3IEV2ZW50RW1pdHRlcjx7XHJcbiAgICByZXNlYXJjaDogUmVzZWFyY2g7XHJcbiAgICByZXN1bHRzOiBTZWFyY2hSZXN1bHRbXTtcclxuICB9PigpO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlYXJjaCB0eXBlIGNoYW5nZXNcclxuICAgKi9cclxuICBAT3V0cHV0KCkgc2VhcmNoVHlwZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlYXJjaCB0eXBlIGNoYW5nZXNcclxuICAgKi9cclxuICBAT3V0cHV0KCkgY2xlYXJGZWF0dXJlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvKipcclxuICAgKiBJbnB1dCBlbGVtZW50XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgQFZpZXdDaGlsZCgnaW5wdXQnKSBpbnB1dDogRWxlbWVudFJlZjtcclxuXHJcbiAgLyoqXHJcbiAgICogSG9zdCdzIGVtcHR5IGNsYXNzXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5lbXB0eScpXHJcbiAgZ2V0IGVtcHR5Q2xhc3MoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5lbXB0eTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhlIHNlYXJjaCBiYXIgaXMgZW1wdHlcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgZW1wdHkoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy50ZXJtLmxlbmd0aCA9PT0gMDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBiYXIgcGFsY2Vob2xkZXJcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBzZXQgcGxhY2Vob2xkZXIodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5fcGxhY2Vob2xkZXIgPSB2YWx1ZTtcclxuICB9XHJcbiAgZ2V0IHBsYWNlaG9sZGVyKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5lbXB0eSA/IHRoaXMuX3BsYWNlaG9sZGVyIDogJyc7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3BsYWNlaG9sZGVyID0gJyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZSkge31cclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaWJlIHRvIHRoZSBzZWFyY2ggdGVybSBzdHJlYW0gYW5kIHRyaWdnZXIgcmVzZWFyY2hlc1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5zdHJlYW0kJCA9IHRoaXMuc3RyZWFtJFxyXG4gICAgICAucGlwZShcclxuICAgICAgICBkZWJvdW5jZSgodGVybTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gdGVybSA9PT0gJycgPyBFTVBUWSA6IHRpbWVyKDMwMCk7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUoKHRlcm06IHN0cmluZykgPT4gdGhpcy5vblRlcm1DaGFuZ2UodGVybSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5zdWJzY3JpYmUgdG8gdGhlIHNlYXJjaCB0ZXJtIHN0cmVhbVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5zdHJlYW0kJC51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBhIHVzZXIgdHlwZXMsIHZhbGlkYXRlcyB0aGUga2V5IGFuZCBzZW5kIGl0IGludG8gdGhlXHJcbiAgICogc3RyZWFtIGlmIGl0J3MgdmFsaWRcclxuICAgKiBAcGFyYW0gZXZlbnQgS2V5Ym9hcmQgZXZlbnRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvbktleXVwKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICBjb25zdCBrZXkgPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xyXG4gICAgaWYgKCF0aGlzLmtleUlzVmFsaWQoa2V5KSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnNldFRlcm0oa2V5KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBzdHJlYW0gYW5kIHRoZSBpbnB1dFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uQ2xlYXJCdXR0b25DbGljaygpIHtcclxuICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIHRoaXMuY2xlYXJGZWF0dXJlLmVtaXQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSB0aGUgcGxhY2Vob2xkZXIgd2l0aCB0aGUgZW5hYmxlZCBzZWFyY2ggdHlwZS4gVGhlIHBsYWNlaG9sZGVyXHJcbiAgICogZm9yIGFsbCBhdmFpbGFibGVzIHNlYXJjaCB0eXBlcnMgbmVlZHMgdG8gYmUgZGVmaW5lZCBpbiB0aGUgbG9jYWxlXHJcbiAgICogZmlsZXMgb3IgYW4gZXJyb3Igd2lsbCBiZSB0aHJvd24uXHJcbiAgICogQHBhcmFtIHNlYXJjaFR5cGUgRW5hYmxlZCBzZWFyY2ggdHlwZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uU2VhcmNoVHlwZUNoYW5nZShzZWFyY2hUeXBlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuc2VhcmNoVHlwZUNoYW5nZS5lbWl0KHNlYXJjaFR5cGUpO1xyXG4gICAgdGhpcy5wbGFjZWhvbGRlciA9IGBzZWFyY2guJHtzZWFyY2hUeXBlLnRvTG93ZXJDYXNlKCl9LnBsYWNlaG9sZGVyYDtcclxuICAgIHRoaXMuZG9TZWFyY2godGhpcy50ZXJtKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlbmQgdGhlIHRlcm0gaW50byB0aGUgc3RyZWFtIG9ubHkgaWYgdGhpcyBjb21wb25lbnQgaXMgbm90IGRpc2FibGVkXHJcbiAgICogQHBhcmFtIHRlcm0gU2VhcmNoIHRlcm1cclxuICAgKi9cclxuICBzZXRUZXJtKHRlcm06IHN0cmluZykge1xyXG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudGVybSA9IHRlcm07XHJcbiAgICBpZiAodGVybS5yZXBsYWNlKC8oI1teXFxzXSopL2csICcnKS50cmltKCkubGVuZ3RoID49IHRoaXMubWluTGVuZ3RoIHx8XHJcbiAgICAgIHRlcm0ucmVwbGFjZSgvKCNbXlxcc10qKS9nLCAnJykudHJpbSgpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0aGlzLnN0cmVhbSQubmV4dCh0ZXJtKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBzdHJlYW0gYW5kIHRoZSBpbnB1dFxyXG4gICAqL1xyXG4gIHByaXZhdGUgY2xlYXIoKSB7XHJcbiAgICB0aGlzLnRlcm0gPSAnJztcclxuICAgIHRoaXMuc3RyZWFtJC5uZXh0KHRoaXMudGVybSk7XHJcbiAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFZhbGlkYXRlIGlmIGEgZ2l2ZW4ga2V5IHN0cm9rZSBpcyBhIHZhbGlkIGlucHV0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBrZXlJc1ZhbGlkKGtleTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pbnZhbGlkS2V5cy5pbmRleE9mKGtleSkgPT09IC0xO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0aGUgc2VhcmNoIHRlcm0gY2hhbmdlcywgZW1pdCBhbiBldmVudCBhbmQgdHJpZ2dlciBhXHJcbiAgICogcmVzZWFyY2ggaW4gZXZlcnkgZW5hYmxlZCBzZWFyY2ggc291cmNlcy5cclxuICAgKiBAcGFyYW0gdGVybSBTZWFyY2ggdGVybVxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25UZXJtQ2hhbmdlKHRlcm06IHN0cmluZyB8IHVuZGVmaW5lZCkge1xyXG4gICAgdGhpcy5jaGFuZ2UuZW1pdCh0ZXJtKTtcclxuICAgIHRoaXMuZG9TZWFyY2godGVybSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFeGVjdXRlIHRoZSBzZWFyY2hcclxuICAgKiBAcGFyYW0gdGVybSBTZWFyY2ggdGVybVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZG9TZWFyY2godGVybTogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XHJcbiAgICBpZiAodGVybSA9PT0gdW5kZWZpbmVkIHx8IHRlcm0ucmVwbGFjZSgvKCNbXlxcc10qKS9nLCAnJykudHJpbSgpID09PSAnJykge1xyXG4gICAgICBpZiAodGhpcy5zdG9yZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yZS5jbGVhcigpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5zdG9yZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuc3RvcmUuc29mdENsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzZWFyY2hlcyA9IHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2godGVybSk7XHJcbiAgICByZXNlYXJjaGVzLm1hcChyZXNlYXJjaCA9PiB7XHJcbiAgICAgIHJlc2VhcmNoLnJlcXVlc3Quc3Vic2NyaWJlKChyZXN1bHRzOiBTZWFyY2hSZXN1bHRbXSkgPT4ge1xyXG4gICAgICAgIHRoaXMub25SZXNlYXJjaENvbXBsZXRlZChyZXNlYXJjaCwgcmVzdWx0cyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGEgcmVzZWFyY2ggIGlzIGNvbXBsZXRlZCwgZW1pdCBhbiBldmVudCBhbmQgdXBkYXRlXHJcbiAgICogdGhlIHN0b3JlJ3MgaXRlbXMuXHJcbiAgICogQHBhcmFtIHJlc2VhcmNoIFJlc2VhcmNoXHJcbiAgICogQHBhcmFtIHJlc3VsdHMgUmVzZWFyY2ggcmVzdWx0c1xyXG4gICAqL1xyXG4gIHByaXZhdGUgb25SZXNlYXJjaENvbXBsZXRlZChyZXNlYXJjaDogUmVzZWFyY2gsIHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdKSB7XHJcbiAgICB0aGlzLnNlYXJjaC5lbWl0KHsgcmVzZWFyY2gsIHJlc3VsdHMgfSk7XHJcblxyXG4gICAgaWYgKHRoaXMuc3RvcmUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBjb25zdCBuZXdSZXN1bHRzID0gdGhpcy5zdG9yZS5lbnRpdGllcyQudmFsdWVcclxuICAgICAgICAuZmlsdGVyKHJlc3VsdCA9PiByZXN1bHQuc291cmNlICE9PSByZXNlYXJjaC5zb3VyY2UpXHJcbiAgICAgICAgLmNvbmNhdChyZXN1bHRzKTtcclxuICAgICAgdGhpcy5zdG9yZS5sb2FkKG5ld1Jlc3VsdHMpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=