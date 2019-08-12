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
        if (term.length >= this.minLength || term.length === 0) {
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
                template: "<div class=\"igo-search-bar-container\">\r\n  <mat-form-field [floatLabel]=\"floatLabel\">\r\n    <input\r\n      #input\r\n      matInput\r\n      autocomplete=\"off\"\r\n      [ngClass]=\"{'hasSearchIcon': searchIcon}\"\r\n      [disabled]=\"disabled\"\r\n      [placeholder]=\"placeholder | translate\"\r\n      [ngModel]=\"term\"\r\n      (keyup)=\"onKeyup($event)\"\r\n      (touchend)=\"onKeyup($event)\">\r\n  </mat-form-field>\r\n\r\n  <div class=\"search-bar-buttons\">\r\n    <button\r\n      mat-icon-button\r\n      [color]=\"color\"\r\n      *ngIf=\"searchIcon !== undefined\">\r\n      <mat-icon svgIcon=\"{{searchIcon}}\"></mat-icon>\r\n    </button>\r\n\r\n    <button\r\n      mat-icon-button\r\n      [color]=\"color\"\r\n      (click)=\"onClearButtonClick()\"\r\n      *ngIf=\"!empty\">\r\n      <mat-icon svgIcon=\"close\"></mat-icon>\r\n    </button>\r\n  </div>\r\n\r\n  <igo-search-selector\r\n    [searchTypes]=\"searchTypes\"\r\n    (change)=\"onSearchTypeChange($event)\">\r\n  </igo-search-selector>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host ::ng-deep .mat-form-field{padding:0 5px}:host ::ng-deep .mat-form-field-wrapper{margin-bottom:-1.5em}:host ::ng-deep span.mat-form-field-label-wrapper{top:-20px}:host ::ng-deep div.mat-form-field-infix{left:5px;right:5px;padding:0 0 12px!important}:host ::ng-deep div.mat-form-field-underline{display:none}.igo-search-bar-container{position:relative;width:100%}.igo-search-bar-container>mat-form-field{width:calc(100% - (2 * 40px))}:host.empty .igo-search-bar-container>mat-form-field{width:calc(100% - 40px)}.search-bar-buttons{position:absolute;right:40px;top:0}.search-bar-buttons>button:nth-child(2)::before{content:'';position:absolute;left:0;top:5px;border-right:1px solid #ddd;height:28px}igo-search-selector{display:inline-block;background-color:#fff;position:absolute;right:0;top:0;border-radius:0}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NlYXJjaC1iYXIvc2VhcmNoLWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBR1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDVixXQUFXLEVBQ1gsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxPQUFPLEVBQWdCLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWhFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXRELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7O0FBYXpELE1BQU0sT0FBTyxrQkFBa0I7Ozs7SUFrSDdCLFlBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlOzs7O1FBOUcvQixnQkFBVyxHQUFHLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQzs7OztRQUtuRCxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQzs7OztRQVUvQixTQUFJLEdBQUcsRUFBRSxDQUFDOzs7O1FBS1YsZUFBVSxHQUFtQixPQUFPLENBQUM7Ozs7UUFLckMsYUFBUSxHQUFHLEtBQUssQ0FBQzs7OztRQUtqQixVQUFLLEdBQUcsU0FBUyxDQUFDOzs7O1FBS2xCLGFBQVEsR0FBRyxHQUFHLENBQUM7Ozs7UUFLZixjQUFTLEdBQUcsQ0FBQyxDQUFDOzs7O1FBZWQsZ0JBQVcsR0FBYSxZQUFZLENBQUM7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UyxFQUFFOztrQkFDdEIsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUs7aUJBQzFDLE1BQU07Ozs7WUFBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssUUFBUSxDQUFDLE1BQU0sRUFBQztpQkFDbkQsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM3QjtJQUNILENBQUM7OztZQXBRRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsNGhDQUEwQztnQkFFMUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBWlEsYUFBYTs7O21CQWdDbkIsS0FBSzt5QkFLTCxLQUFLO3VCQUtMLEtBQUs7b0JBS0wsS0FBSzt1QkFLTCxLQUFLO3dCQUtMLEtBQUs7eUJBS0wsS0FBSztvQkFLTCxLQUFLOzBCQUtMLEtBQUs7cUJBS0wsTUFBTTtxQkFLTixNQUFNOytCQVFOLE1BQU07b0JBTU4sU0FBUyxTQUFDLE9BQU87eUJBTWpCLFdBQVcsU0FBQyxhQUFhOzs7Ozs7OztJQXJGMUIseUNBQTJEOzs7Ozs7SUFLM0QscUNBQXdDOzs7Ozs7SUFLeEMsc0NBQStCOzs7OztJQUsvQixrQ0FBbUI7Ozs7O0lBS25CLHdDQUE4Qzs7Ozs7SUFLOUMsc0NBQTBCOzs7OztJQUsxQixtQ0FBMkI7Ozs7O0lBSzNCLHNDQUF3Qjs7Ozs7SUFLeEIsdUNBQXVCOzs7OztJQUt2Qix3Q0FBNEI7Ozs7O0lBSzVCLG1DQUEwQzs7Ozs7SUFLMUMseUNBQThDOzs7OztJQUs5QyxvQ0FBOEM7Ozs7O0lBSzlDLG9DQUdLOzs7OztJQUtMLDhDQUF3RDs7Ozs7O0lBTXhELG1DQUFzQzs7Ozs7SUE2QnRDLDBDQUEwQjs7Ozs7SUFFZCwyQ0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgVmlld0NoaWxkLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgSG9zdEJpbmRpbmcsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRmxvYXRMYWJlbFR5cGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24sIEVNUFRZLCB0aW1lciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBkZWJvdW5jZSwgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBFbnRpdHlTdG9yZSB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBTRUFSQ0hfVFlQRVMgfSBmcm9tICcuLi9zaGFyZWQvc2VhcmNoLmVudW1zJztcclxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0LCBSZXNlYXJjaCB9IGZyb20gJy4uL3NoYXJlZC9zZWFyY2guaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IFNlYXJjaFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VhcmNoLnNlcnZpY2UnO1xyXG5cclxuLyoqXHJcbiAqIFNlYXJjaGJhciB0aGF0IHRyaWdnZXJzIGEgcmVzZWFyY2ggaW4gYWxsIHNlYXJjaCBzb3VyY2VzIGVuYWJsZWQuXHJcbiAqIElmIHRoZSBzdG9yZSBpbnB1dCBpcyBkZWZpbmVkLCB0aGUgc2VhcmNoIHJlc3VsdHMgd2lsbCBiZSBsb2FkZWRcclxuICogaW50byB0aGF0IHN0b3JlLiBBbiBldmVudCBpcyBhbHdheXMgZW1pdHRlZCB3aGVuIGEgcmVzZWFyY2ggaXMgY29tcGxldGVkLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tc2VhcmNoLWJhcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NlYXJjaC1iYXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3NlYXJjaC1iYXIuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VhcmNoQmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIEludmFsaWQga2V5c1xyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgaW52YWxpZEtleXMgPSBbJ0NvbnRyb2wnLCAnU2hpZnQnLCAnQWx0J107XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCB0ZXJtIHN0cmVhbVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RyZWFtJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvIHRoZSBzZWFyY2ggdGVybSBzdHJlYW1cclxuICAgKi9cclxuICBwcml2YXRlIHN0cmVhbSQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCB0ZXJtXHJcbiAgICovXHJcbiAgQElucHV0KCkgdGVybSA9ICcnO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGEgZmxvYXQgbGFiZWwgc2hvdWxkIGJlIGRpc3BsYXllZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGZsb2F0TGFiZWw6IEZsb2F0TGFiZWxUeXBlID0gJ25ldmVyJztcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGlzIGNvbXBvbmVudCBpcyBkaXNhYmxlZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEljb25zIGNvbG9yIChzZWFyY2ggYW5kIGNsZWFyKVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNvbG9yID0gJ3ByaW1hcnknO1xyXG5cclxuICAvKipcclxuICAgKiBEZWJvdW5jZSB0aW1lIGJldHdlZW4gZWFjaCBrZXlzdHJva2VcclxuICAgKi9cclxuICBASW5wdXQoKSBkZWJvdW5jZSA9IDMwMDtcclxuXHJcbiAgLyoqXHJcbiAgICogTWluaW11bSB0ZXJtIGxlbmd0aCByZXF1aXJlZCB0byB0cmlnZ2VyIGEgcmVzZWFyY2hcclxuICAgKi9cclxuICBASW5wdXQoKSBtaW5MZW5ndGggPSAyO1xyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggaWNvblxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNlYXJjaEljb246IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHJlc3VsdHMgc3RvcmVcclxuICAgKi9cclxuICBASW5wdXQoKSBzdG9yZTogRW50aXR5U3RvcmU8U2VhcmNoUmVzdWx0PjtcclxuXHJcbiAgLyoqXHJcbiAgICogTGlzdCBvZiBhdmFpbGFibGUgc2VhcmNoIHR5cGVzXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2VhcmNoVHlwZXM6IHN0cmluZ1tdID0gU0VBUkNIX1RZUEVTO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlYXJjaCB0ZXJtIGNoYW5nZXNcclxuICAgKi9cclxuICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiBhIHJlc2VhcmNoIGlzIGNvbXBsZXRlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzZWFyY2ggPSBuZXcgRXZlbnRFbWl0dGVyPHtcclxuICAgIHJlc2VhcmNoOiBSZXNlYXJjaDtcclxuICAgIHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdO1xyXG4gIH0+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VhcmNoIHR5cGUgY2hhbmdlc1xyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzZWFyY2hUeXBlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIElucHV0IGVsZW1lbnRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBAVmlld0NoaWxkKCdpbnB1dCcpIGlucHV0OiBFbGVtZW50UmVmO1xyXG5cclxuICAvKipcclxuICAgKiBIb3N0J3MgZW1wdHkgY2xhc3NcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmVtcHR5JylcclxuICBnZXQgZW1wdHlDbGFzcygpIHtcclxuICAgIHJldHVybiB0aGlzLmVtcHR5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgc2VhcmNoIGJhciBpcyBlbXB0eVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBlbXB0eSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnRlcm0ubGVuZ3RoID09PSAwO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIGJhciBwYWxjZWhvbGRlclxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHNldCBwbGFjZWhvbGRlcih2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9wbGFjZWhvbGRlciA9IHZhbHVlO1xyXG4gIH1cclxuICBnZXQgcGxhY2Vob2xkZXIoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmVtcHR5ID8gdGhpcy5fcGxhY2Vob2xkZXIgOiAnJztcclxuICB9XHJcbiAgcHJpdmF0ZSBfcGxhY2Vob2xkZXIgPSAnJztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpYmUgdG8gdGhlIHNlYXJjaCB0ZXJtIHN0cmVhbSBhbmQgdHJpZ2dlciByZXNlYXJjaGVzXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnN0cmVhbSQkID0gdGhpcy5zdHJlYW0kXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIGRlYm91bmNlKCh0ZXJtOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgIHJldHVybiB0ZXJtID09PSAnJyA/IEVNUFRZIDogdGltZXIoMzAwKTtcclxuICAgICAgICB9KSxcclxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSgodGVybTogc3RyaW5nKSA9PiB0aGlzLm9uVGVybUNoYW5nZSh0ZXJtKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbnN1YnNjcmliZSB0byB0aGUgc2VhcmNoIHRlcm0gc3RyZWFtXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnN0cmVhbSQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGEgdXNlciB0eXBlcywgdmFsaWRhdGVzIHRoZSBrZXkgYW5kIHNlbmQgaXQgaW50byB0aGVcclxuICAgKiBzdHJlYW0gaWYgaXQncyB2YWxpZFxyXG4gICAqIEBwYXJhbSBldmVudCBLZXlib2FyZCBldmVudFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uS2V5dXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgIGNvbnN0IGtleSA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XHJcbiAgICBpZiAoIXRoaXMua2V5SXNWYWxpZChrZXkpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuc2V0VGVybShrZXkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhlIHN0cmVhbSBhbmQgdGhlIGlucHV0XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25DbGVhckJ1dHRvbkNsaWNrKCkge1xyXG4gICAgdGhpcy5jbGVhcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHRoZSBwbGFjZWhvbGRlciB3aXRoIHRoZSBlbmFibGVkIHNlYXJjaCB0eXBlLiBUaGUgcGxhY2Vob2xkZXJcclxuICAgKiBmb3IgYWxsIGF2YWlsYWJsZXMgc2VhcmNoIHR5cGVycyBuZWVkcyB0byBiZSBkZWZpbmVkIGluIHRoZSBsb2NhbGVcclxuICAgKiBmaWxlcyBvciBhbiBlcnJvciB3aWxsIGJlIHRocm93bi5cclxuICAgKiBAcGFyYW0gc2VhcmNoVHlwZSBFbmFibGVkIHNlYXJjaCB0eXBlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25TZWFyY2hUeXBlQ2hhbmdlKHNlYXJjaFR5cGU6IHN0cmluZykge1xyXG4gICAgdGhpcy5zZWFyY2hUeXBlQ2hhbmdlLmVtaXQoc2VhcmNoVHlwZSk7XHJcbiAgICB0aGlzLnBsYWNlaG9sZGVyID0gYHNlYXJjaC4ke3NlYXJjaFR5cGUudG9Mb3dlckNhc2UoKX0ucGxhY2Vob2xkZXJgO1xyXG4gICAgdGhpcy5kb1NlYXJjaCh0aGlzLnRlcm0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VuZCB0aGUgdGVybSBpbnRvIHRoZSBzdHJlYW0gb25seSBpZiB0aGlzIGNvbXBvbmVudCBpcyBub3QgZGlzYWJsZWRcclxuICAgKiBAcGFyYW0gdGVybSBTZWFyY2ggdGVybVxyXG4gICAqL1xyXG4gIHNldFRlcm0odGVybTogc3RyaW5nKSB7XHJcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50ZXJtID0gdGVybTtcclxuICAgIGlmICh0ZXJtLmxlbmd0aCA+PSB0aGlzLm1pbkxlbmd0aCB8fCB0ZXJtLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0aGlzLnN0cmVhbSQubmV4dCh0ZXJtKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBzdHJlYW0gYW5kIHRoZSBpbnB1dFxyXG4gICAqL1xyXG4gIHByaXZhdGUgY2xlYXIoKSB7XHJcbiAgICB0aGlzLnRlcm0gPSAnJztcclxuICAgIHRoaXMuc3RyZWFtJC5uZXh0KHRoaXMudGVybSk7XHJcbiAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFZhbGlkYXRlIGlmIGEgZ2l2ZW4ga2V5IHN0cm9rZSBpcyBhIHZhbGlkIGlucHV0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBrZXlJc1ZhbGlkKGtleTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pbnZhbGlkS2V5cy5pbmRleE9mKGtleSkgPT09IC0xO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0aGUgc2VhcmNoIHRlcm0gY2hhbmdlcywgZW1pdCBhbiBldmVudCBhbmQgdHJpZ2dlciBhXHJcbiAgICogcmVzZWFyY2ggaW4gZXZlcnkgZW5hYmxlZCBzZWFyY2ggc291cmNlcy5cclxuICAgKiBAcGFyYW0gdGVybSBTZWFyY2ggdGVybVxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25UZXJtQ2hhbmdlKHRlcm06IHN0cmluZyB8IHVuZGVmaW5lZCkge1xyXG4gICAgdGhpcy5jaGFuZ2UuZW1pdCh0ZXJtKTtcclxuICAgIHRoaXMuZG9TZWFyY2godGVybSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFeGVjdXRlIHRoZSBzZWFyY2hcclxuICAgKiBAcGFyYW0gdGVybSBTZWFyY2ggdGVybVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZG9TZWFyY2godGVybTogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XHJcbiAgICBpZiAodGVybSA9PT0gdW5kZWZpbmVkIHx8IHRlcm0gPT09ICcnKSB7XHJcbiAgICAgIGlmICh0aGlzLnN0b3JlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLnN0b3JlLmNsZWFyKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnN0b3JlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5zdG9yZS5zb2Z0Q2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXNlYXJjaGVzID0gdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaCh0ZXJtKTtcclxuICAgIHJlc2VhcmNoZXMubWFwKHJlc2VhcmNoID0+IHtcclxuICAgICAgcmVzZWFyY2gucmVxdWVzdC5zdWJzY3JpYmUoKHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdKSA9PiB7XHJcbiAgICAgICAgdGhpcy5vblJlc2VhcmNoQ29tcGxldGVkKHJlc2VhcmNoLCByZXN1bHRzKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gYSByZXNlYXJjaCAgaXMgY29tcGxldGVkLCBlbWl0IGFuIGV2ZW50IGFuZCB1cGRhdGVcclxuICAgKiB0aGUgc3RvcmUncyBpdGVtcy5cclxuICAgKiBAcGFyYW0gcmVzZWFyY2ggUmVzZWFyY2hcclxuICAgKiBAcGFyYW0gcmVzdWx0cyBSZXNlYXJjaCByZXN1bHRzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvblJlc2VhcmNoQ29tcGxldGVkKHJlc2VhcmNoOiBSZXNlYXJjaCwgcmVzdWx0czogU2VhcmNoUmVzdWx0W10pIHtcclxuICAgIHRoaXMuc2VhcmNoLmVtaXQoeyByZXNlYXJjaCwgcmVzdWx0cyB9KTtcclxuXHJcbiAgICBpZiAodGhpcy5zdG9yZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGNvbnN0IG5ld1Jlc3VsdHMgPSB0aGlzLnN0b3JlLmVudGl0aWVzJC52YWx1ZVxyXG4gICAgICAgIC5maWx0ZXIocmVzdWx0ID0+IHJlc3VsdC5zb3VyY2UgIT09IHJlc2VhcmNoLnNvdXJjZSlcclxuICAgICAgICAuY29uY2F0KHJlc3VsdHMpO1xyXG4gICAgICB0aGlzLnN0b3JlLmxvYWQobmV3UmVzdWx0cyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==