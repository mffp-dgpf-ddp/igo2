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
export class SearchBarComponent {
    /**
     * @param {?} searchService
     */
    constructor(searchService) {
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
    /**
     * Host's empty class
     * \@internal
     * @return {?}
     */
    get emptyClass() {
        return this.empty;
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
     * Search bar palceholder
     * \@internal
     * @param {?} value
     * @return {?}
     */
    set placeholder(value) {
        this._placeholder = value;
    }
    /**
     * @return {?}
     */
    get placeholder() {
        return this.empty ? this._placeholder : '';
    }
    /**
     * Subscribe to the search term stream and trigger researches
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        this.stream$$ = this.stream$
            .pipe(debounce((/**
         * @param {?} term
         * @return {?}
         */
        (term) => {
            return term === '' ? EMPTY : timer(300);
        })), distinctUntilChanged())
            .subscribe((/**
         * @param {?} term
         * @return {?}
         */
        (term) => this.onTermChange(term)));
    }
    /**
     * Unsubscribe to the search term stream
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        this.stream$$.unsubscribe();
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
        const key = ((/** @type {?} */ (event.target))).value;
        if (!this.keyIsValid(key)) {
            return;
        }
        this.setTerm(key);
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
     * Update the placeholder with the enabled search type. The placeholder
     * for all availables search typers needs to be defined in the locale
     * files or an error will be thrown.
     * \@internal
     * @param {?} searchType Enabled search type
     * @return {?}
     */
    onSearchTypeChange(searchType) {
        this.searchTypeChange.emit(searchType);
        this.placeholder = `search.${searchType.toLowerCase()}.placeholder`;
        this.doSearch(this.term);
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
        this.term = term;
        if (term.replace(/(#[^\s]*)/g, '').trim().length >= this.minLength ||
            term.replace(/(#[^\s]*)/g, '').trim().length === 0) {
            this.stream$.next(term);
        }
    }
    /**
     * Clear the stream and the input
     * @private
     * @return {?}
     */
    clear() {
        this.term = '';
        this.stream$.next(this.term);
        this.input.nativeElement.focus();
    }
    /**
     * Validate if a given key stroke is a valid input
     * @private
     * @param {?} key
     * @return {?}
     */
    keyIsValid(key) {
        return this.invalidKeys.indexOf(key) === -1;
    }
    /**
     * When the search term changes, emit an event and trigger a
     * research in every enabled search sources.
     * @private
     * @param {?} term Search term
     * @return {?}
     */
    onTermChange(term) {
        this.change.emit(term);
        this.doSearch(term);
    }
    /**
     * Execute the search
     * @private
     * @param {?} term Search term
     * @return {?}
     */
    doSearch(term) {
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
        const researches = this.searchService.search(term);
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
            const newResults = this.store.entities$.value
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
SearchBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-search-bar',
                template: "<div class=\"igo-search-bar-container\">\r\n  <mat-form-field [floatLabel]=\"floatLabel\">\r\n    <input\r\n      #input\r\n      matInput\r\n      autocomplete=\"off\"\r\n      [ngClass]=\"{'hasSearchIcon': searchIcon}\"\r\n      [disabled]=\"disabled\"\r\n      [placeholder]=\"placeholder | translate\"\r\n      [ngModel]=\"term\"\r\n      (keyup)=\"onKeyup($event)\"\r\n      (touchend)=\"onKeyup($event)\">\r\n  </mat-form-field>\r\n\r\n  <div class=\"search-bar-buttons\">\r\n    <button\r\n      mat-icon-button\r\n      [color]=\"color\"\r\n      *ngIf=\"searchIcon !== undefined\">\r\n      <mat-icon svgIcon=\"{{searchIcon}}\"></mat-icon>\r\n    </button>\r\n\r\n    <button\r\n      mat-icon-button\r\n      [color]=\"color\"\r\n      (click)=\"onClearButtonClick()\"\r\n      *ngIf=\"!empty\">\r\n      <mat-icon svgIcon=\"close\"></mat-icon>\r\n    </button>\r\n\r\n    <igo-search-selector\r\n      [searchTypes]=\"searchTypes\"\r\n      (change)=\"onSearchTypeChange($event)\">\r\n    </igo-search-selector>\r\n\r\n    <igo-search-settings></igo-search-settings>\r\n  </div>\r\n\r\n\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host ::ng-deep .mat-form-field{padding:0 5px}:host ::ng-deep .mat-form-field-wrapper{margin-bottom:-1.5em}:host ::ng-deep span.mat-form-field-label-wrapper{top:-20px}:host ::ng-deep div.mat-form-field-infix{left:5px;right:5px;padding:0 0 12px!important}:host ::ng-deep div.mat-form-field-underline{display:none}.igo-search-bar-container{position:relative;width:100%;display:inline-flex;overflow:hidden}.igo-search-bar-container>mat-form-field{width:calc(100% - (2 * 40px))}:host.empty .igo-search-bar-container>mat-form-field{width:calc(100% - 40px)}.search-bar-buttons{position:relative;right:0;display:inline-flex;top:0}.search-bar-buttons>button:nth-child(2)::before{content:'';left:0;top:5px;border-right:1px solid #ddd;height:28px}igo-search-selector,igo-search-settings{background-color:#fff;top:0;border-radius:0}"]
            }] }
];
/** @nocollapse */
SearchBarComponent.ctorParameters = () => [
    { type: SearchService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NlYXJjaC1iYXIvc2VhcmNoLWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBR1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDVixXQUFXLEVBQ1gsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxPQUFPLEVBQWdCLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWhFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXRELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7O0FBYXpELE1BQU0sT0FBTyxrQkFBa0I7Ozs7SUF1SDdCLFlBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlOzs7O1FBbkgvQixnQkFBVyxHQUFHLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQzs7OztRQUtuRCxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQzs7OztRQVUvQixTQUFJLEdBQUcsRUFBRSxDQUFDOzs7O1FBS1YsZUFBVSxHQUFtQixPQUFPLENBQUM7Ozs7UUFLckMsYUFBUSxHQUFHLEtBQUssQ0FBQzs7OztRQUtqQixVQUFLLEdBQUcsU0FBUyxDQUFDOzs7O1FBS2xCLGFBQVEsR0FBRyxHQUFHLENBQUM7Ozs7UUFLZixjQUFTLEdBQUcsQ0FBQyxDQUFDOzs7O1FBZWQsZ0JBQVcsR0FBYSxZQUFZLENBQUM7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LHNDQUF3Qjs7Ozs7SUFLeEIsdUNBQXVCOzs7OztJQUt2Qix3Q0FBNEI7Ozs7O0lBSzVCLG1DQUEwQzs7Ozs7SUFLMUMseUNBQThDOzs7OztJQUs5QyxvQ0FBOEM7Ozs7O0lBSzlDLG9DQUdLOzs7OztJQUtMLDhDQUF3RDs7Ozs7SUFLeEQsMENBQTRDOzs7Ozs7SUFNNUMsbUNBQXNDOzs7OztJQTZCdEMsMENBQTBCOzs7OztJQUVkLDJDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBWaWV3Q2hpbGQsXHJcbiAgRWxlbWVudFJlZixcclxuICBIb3N0QmluZGluZyxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGbG9hdExhYmVsVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiwgRU1QVFksIHRpbWVyIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IEVudGl0eVN0b3JlIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IFNFQVJDSF9UWVBFUyB9IGZyb20gJy4uL3NoYXJlZC9zZWFyY2guZW51bXMnO1xyXG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQsIFJlc2VhcmNoIH0gZnJvbSAnLi4vc2hhcmVkL3NlYXJjaC5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgU2VhcmNoU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZWFyY2guc2VydmljZSc7XHJcblxyXG4vKipcclxuICogU2VhcmNoYmFyIHRoYXQgdHJpZ2dlcnMgYSByZXNlYXJjaCBpbiBhbGwgc2VhcmNoIHNvdXJjZXMgZW5hYmxlZC5cclxuICogSWYgdGhlIHN0b3JlIGlucHV0IGlzIGRlZmluZWQsIHRoZSBzZWFyY2ggcmVzdWx0cyB3aWxsIGJlIGxvYWRlZFxyXG4gKiBpbnRvIHRoYXQgc3RvcmUuIEFuIGV2ZW50IGlzIGFsd2F5cyBlbWl0dGVkIHdoZW4gYSByZXNlYXJjaCBpcyBjb21wbGV0ZWQuXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1zZWFyY2gtYmFyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc2VhcmNoLWJhci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc2VhcmNoLWJhci5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hCYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgLyoqXHJcbiAgICogSW52YWxpZCBrZXlzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZWFkb25seSBpbnZhbGlkS2V5cyA9IFsnQ29udHJvbCcsICdTaGlmdCcsICdBbHQnXTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHRlcm0gc3RyZWFtXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdHJlYW0kID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIHNlYXJjaCB0ZXJtIHN0cmVhbVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RyZWFtJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHRlcm1cclxuICAgKi9cclxuICBASW5wdXQoKSB0ZXJtID0gJyc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgYSBmbG9hdCBsYWJlbCBzaG91bGQgYmUgZGlzcGxheWVkXHJcbiAgICovXHJcbiAgQElucHV0KCkgZmxvYXRMYWJlbDogRmxvYXRMYWJlbFR5cGUgPSAnbmV2ZXInO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoaXMgY29tcG9uZW50IGlzIGRpc2FibGVkXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogSWNvbnMgY29sb3IgKHNlYXJjaCBhbmQgY2xlYXIpXHJcbiAgICovXHJcbiAgQElucHV0KCkgY29sb3IgPSAncHJpbWFyeSc7XHJcblxyXG4gIC8qKlxyXG4gICAqIERlYm91bmNlIHRpbWUgYmV0d2VlbiBlYWNoIGtleXN0cm9rZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRlYm91bmNlID0gMzAwO1xyXG5cclxuICAvKipcclxuICAgKiBNaW5pbXVtIHRlcm0gbGVuZ3RoIHJlcXVpcmVkIHRvIHRyaWdnZXIgYSByZXNlYXJjaFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1pbkxlbmd0aCA9IDI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBpY29uXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2VhcmNoSWNvbjogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggcmVzdWx0cyBzdG9yZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0b3JlOiBFbnRpdHlTdG9yZTxTZWFyY2hSZXN1bHQ+O1xyXG5cclxuICAvKipcclxuICAgKiBMaXN0IG9mIGF2YWlsYWJsZSBzZWFyY2ggdHlwZXNcclxuICAgKi9cclxuICBASW5wdXQoKSBzZWFyY2hUeXBlczogc3RyaW5nW10gPSBTRUFSQ0hfVFlQRVM7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VhcmNoIHRlcm0gY2hhbmdlc1xyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIGEgcmVzZWFyY2ggaXMgY29tcGxldGVkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHNlYXJjaCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xyXG4gICAgcmVzZWFyY2g6IFJlc2VhcmNoO1xyXG4gICAgcmVzdWx0czogU2VhcmNoUmVzdWx0W107XHJcbiAgfT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWFyY2ggdHlwZSBjaGFuZ2VzXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHNlYXJjaFR5cGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWFyY2ggdHlwZSBjaGFuZ2VzXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGNsZWFyRmVhdHVyZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5wdXQgZWxlbWVudFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIEBWaWV3Q2hpbGQoJ2lucHV0JykgaW5wdXQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gIC8qKlxyXG4gICAqIEhvc3QncyBlbXB0eSBjbGFzc1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZW1wdHknKVxyXG4gIGdldCBlbXB0eUNsYXNzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZW1wdHk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoZSBzZWFyY2ggYmFyIGlzIGVtcHR5XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IGVtcHR5KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMudGVybS5sZW5ndGggPT09IDA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggYmFyIHBhbGNlaG9sZGVyXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgc2V0IHBsYWNlaG9sZGVyKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gdmFsdWU7XHJcbiAgfVxyXG4gIGdldCBwbGFjZWhvbGRlcigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuZW1wdHkgPyB0aGlzLl9wbGFjZWhvbGRlciA6ICcnO1xyXG4gIH1cclxuICBwcml2YXRlIF9wbGFjZWhvbGRlciA9ICcnO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlYXJjaFNlcnZpY2U6IFNlYXJjaFNlcnZpY2UpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmliZSB0byB0aGUgc2VhcmNoIHRlcm0gc3RyZWFtIGFuZCB0cmlnZ2VyIHJlc2VhcmNoZXNcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuc3RyZWFtJCQgPSB0aGlzLnN0cmVhbSRcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgZGVib3VuY2UoKHRlcm06IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHRlcm0gPT09ICcnID8gRU1QVFkgOiB0aW1lcigzMDApO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKCh0ZXJtOiBzdHJpbmcpID0+IHRoaXMub25UZXJtQ2hhbmdlKHRlcm0pKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuc3Vic2NyaWJlIHRvIHRoZSBzZWFyY2ggdGVybSBzdHJlYW1cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuc3RyZWFtJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gYSB1c2VyIHR5cGVzLCB2YWxpZGF0ZXMgdGhlIGtleSBhbmQgc2VuZCBpdCBpbnRvIHRoZVxyXG4gICAqIHN0cmVhbSBpZiBpdCdzIHZhbGlkXHJcbiAgICogQHBhcmFtIGV2ZW50IEtleWJvYXJkIGV2ZW50XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25LZXl1cChldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgY29uc3Qga2V5ID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcclxuICAgIGlmICghdGhpcy5rZXlJc1ZhbGlkKGtleSkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRUZXJtKGtleSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgc3RyZWFtIGFuZCB0aGUgaW5wdXRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvbkNsZWFyQnV0dG9uQ2xpY2soKSB7XHJcbiAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICB0aGlzLmNsZWFyRmVhdHVyZS5lbWl0KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgdGhlIHBsYWNlaG9sZGVyIHdpdGggdGhlIGVuYWJsZWQgc2VhcmNoIHR5cGUuIFRoZSBwbGFjZWhvbGRlclxyXG4gICAqIGZvciBhbGwgYXZhaWxhYmxlcyBzZWFyY2ggdHlwZXJzIG5lZWRzIHRvIGJlIGRlZmluZWQgaW4gdGhlIGxvY2FsZVxyXG4gICAqIGZpbGVzIG9yIGFuIGVycm9yIHdpbGwgYmUgdGhyb3duLlxyXG4gICAqIEBwYXJhbSBzZWFyY2hUeXBlIEVuYWJsZWQgc2VhcmNoIHR5cGVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvblNlYXJjaFR5cGVDaGFuZ2Uoc2VhcmNoVHlwZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnNlYXJjaFR5cGVDaGFuZ2UuZW1pdChzZWFyY2hUeXBlKTtcclxuICAgIHRoaXMucGxhY2Vob2xkZXIgPSBgc2VhcmNoLiR7c2VhcmNoVHlwZS50b0xvd2VyQ2FzZSgpfS5wbGFjZWhvbGRlcmA7XHJcbiAgICB0aGlzLmRvU2VhcmNoKHRoaXMudGVybSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZW5kIHRoZSB0ZXJtIGludG8gdGhlIHN0cmVhbSBvbmx5IGlmIHRoaXMgY29tcG9uZW50IGlzIG5vdCBkaXNhYmxlZFxyXG4gICAqIEBwYXJhbSB0ZXJtIFNlYXJjaCB0ZXJtXHJcbiAgICovXHJcbiAgc2V0VGVybSh0ZXJtOiBzdHJpbmcpIHtcclxuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnRlcm0gPSB0ZXJtO1xyXG4gICAgaWYgKHRlcm0ucmVwbGFjZSgvKCNbXlxcc10qKS9nLCAnJykudHJpbSgpLmxlbmd0aCA+PSB0aGlzLm1pbkxlbmd0aCB8fFxyXG4gICAgICB0ZXJtLnJlcGxhY2UoLygjW15cXHNdKikvZywgJycpLnRyaW0oKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgdGhpcy5zdHJlYW0kLm5leHQodGVybSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgc3RyZWFtIGFuZCB0aGUgaW5wdXRcclxuICAgKi9cclxuICBwcml2YXRlIGNsZWFyKCkge1xyXG4gICAgdGhpcy50ZXJtID0gJyc7XHJcbiAgICB0aGlzLnN0cmVhbSQubmV4dCh0aGlzLnRlcm0pO1xyXG4gICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBWYWxpZGF0ZSBpZiBhIGdpdmVuIGtleSBzdHJva2UgaXMgYSB2YWxpZCBpbnB1dFxyXG4gICAqL1xyXG4gIHByaXZhdGUga2V5SXNWYWxpZChrZXk6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMuaW52YWxpZEtleXMuaW5kZXhPZihrZXkpID09PSAtMTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdGhlIHNlYXJjaCB0ZXJtIGNoYW5nZXMsIGVtaXQgYW4gZXZlbnQgYW5kIHRyaWdnZXIgYVxyXG4gICAqIHJlc2VhcmNoIGluIGV2ZXJ5IGVuYWJsZWQgc2VhcmNoIHNvdXJjZXMuXHJcbiAgICogQHBhcmFtIHRlcm0gU2VhcmNoIHRlcm1cclxuICAgKi9cclxuICBwcml2YXRlIG9uVGVybUNoYW5nZSh0ZXJtOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcclxuICAgIHRoaXMuY2hhbmdlLmVtaXQodGVybSk7XHJcbiAgICB0aGlzLmRvU2VhcmNoKHRlcm0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRXhlY3V0ZSB0aGUgc2VhcmNoXHJcbiAgICogQHBhcmFtIHRlcm0gU2VhcmNoIHRlcm1cclxuICAgKi9cclxuICBwcml2YXRlIGRvU2VhcmNoKHRlcm06IHN0cmluZyB8IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKHRlcm0gPT09IHVuZGVmaW5lZCB8fCB0ZXJtLnJlcGxhY2UoLygjW15cXHNdKikvZywgJycpLnRyaW0oKSA9PT0gJycpIHtcclxuICAgICAgaWYgKHRoaXMuc3RvcmUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuc3RvcmUuY2xlYXIoKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuc3RvcmUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnN0b3JlLnNvZnRDbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlc2VhcmNoZXMgPSB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoKHRlcm0pO1xyXG4gICAgcmVzZWFyY2hlcy5tYXAocmVzZWFyY2ggPT4ge1xyXG4gICAgICByZXNlYXJjaC5yZXF1ZXN0LnN1YnNjcmliZSgocmVzdWx0czogU2VhcmNoUmVzdWx0W10pID0+IHtcclxuICAgICAgICB0aGlzLm9uUmVzZWFyY2hDb21wbGV0ZWQocmVzZWFyY2gsIHJlc3VsdHMpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBhIHJlc2VhcmNoICBpcyBjb21wbGV0ZWQsIGVtaXQgYW4gZXZlbnQgYW5kIHVwZGF0ZVxyXG4gICAqIHRoZSBzdG9yZSdzIGl0ZW1zLlxyXG4gICAqIEBwYXJhbSByZXNlYXJjaCBSZXNlYXJjaFxyXG4gICAqIEBwYXJhbSByZXN1bHRzIFJlc2VhcmNoIHJlc3VsdHNcclxuICAgKi9cclxuICBwcml2YXRlIG9uUmVzZWFyY2hDb21wbGV0ZWQocmVzZWFyY2g6IFJlc2VhcmNoLCByZXN1bHRzOiBTZWFyY2hSZXN1bHRbXSkge1xyXG4gICAgdGhpcy5zZWFyY2guZW1pdCh7IHJlc2VhcmNoLCByZXN1bHRzIH0pO1xyXG5cclxuICAgIGlmICh0aGlzLnN0b3JlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgY29uc3QgbmV3UmVzdWx0cyA9IHRoaXMuc3RvcmUuZW50aXRpZXMkLnZhbHVlXHJcbiAgICAgICAgLmZpbHRlcihyZXN1bHQgPT4gcmVzdWx0LnNvdXJjZSAhPT0gcmVzZWFyY2guc291cmNlKVxyXG4gICAgICAgIC5jb25jYXQocmVzdWx0cyk7XHJcbiAgICAgIHRoaXMuc3RvcmUubG9hZChuZXdSZXN1bHRzKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19