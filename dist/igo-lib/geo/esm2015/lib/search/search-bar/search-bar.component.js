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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NlYXJjaC1iYXIvc2VhcmNoLWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBR1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDVixXQUFXLEVBQ1gsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxPQUFPLEVBQWdCLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWhFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXRELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7O0FBYXpELE1BQU0sT0FBTyxrQkFBa0I7Ozs7SUFrSDdCLFlBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlOzs7O1FBOUcvQixnQkFBVyxHQUFHLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQzs7OztRQUtuRCxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQzs7OztRQVUvQixTQUFJLEdBQUcsRUFBRSxDQUFDOzs7O1FBS1YsZUFBVSxHQUFtQixPQUFPLENBQUM7Ozs7UUFLckMsYUFBUSxHQUFHLEtBQUssQ0FBQzs7OztRQUtqQixVQUFLLEdBQUcsU0FBUyxDQUFDOzs7O1FBS2xCLGFBQVEsR0FBRyxHQUFHLENBQUM7Ozs7UUFLZixjQUFTLEdBQUcsQ0FBQyxDQUFDOzs7O1FBZWQsZ0JBQVcsR0FBYSxZQUFZLENBQUM7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Ozs7OztJQUs5QyxvQ0FHSzs7Ozs7SUFLTCw4Q0FBd0Q7Ozs7OztJQU14RCxtQ0FBc0M7Ozs7O0lBNkJ0QywwQ0FBMEI7Ozs7O0lBRWQsMkNBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIFZpZXdDaGlsZCxcclxuICBFbGVtZW50UmVmLFxyXG4gIEhvc3RCaW5kaW5nLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZsb2F0TGFiZWxUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uLCBFTVBUWSwgdGltZXIgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGVib3VuY2UsIGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgRW50aXR5U3RvcmUgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgU0VBUkNIX1RZUEVTIH0gZnJvbSAnLi4vc2hhcmVkL3NlYXJjaC5lbnVtcyc7XHJcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCwgUmVzZWFyY2ggfSBmcm9tICcuLi9zaGFyZWQvc2VhcmNoLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlYXJjaC5zZXJ2aWNlJztcclxuXHJcbi8qKlxyXG4gKiBTZWFyY2hiYXIgdGhhdCB0cmlnZ2VycyBhIHJlc2VhcmNoIGluIGFsbCBzZWFyY2ggc291cmNlcyBlbmFibGVkLlxyXG4gKiBJZiB0aGUgc3RvcmUgaW5wdXQgaXMgZGVmaW5lZCwgdGhlIHNlYXJjaCByZXN1bHRzIHdpbGwgYmUgbG9hZGVkXHJcbiAqIGludG8gdGhhdCBzdG9yZS4gQW4gZXZlbnQgaXMgYWx3YXlzIGVtaXR0ZWQgd2hlbiBhIHJlc2VhcmNoIGlzIGNvbXBsZXRlZC5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXNlYXJjaC1iYXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWFyY2gtYmFyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zZWFyY2gtYmFyLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFNlYXJjaEJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAvKipcclxuICAgKiBJbnZhbGlkIGtleXNcclxuICAgKi9cclxuICBwcml2YXRlIHJlYWRvbmx5IGludmFsaWRLZXlzID0gWydDb250cm9sJywgJ1NoaWZ0JywgJ0FsdCddO1xyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggdGVybSBzdHJlYW1cclxuICAgKi9cclxuICBwcml2YXRlIHN0cmVhbSQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgc2VhcmNoIHRlcm0gc3RyZWFtXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdHJlYW0kJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggdGVybVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHRlcm0gPSAnJztcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBhIGZsb2F0IGxhYmVsIHNob3VsZCBiZSBkaXNwbGF5ZWRcclxuICAgKi9cclxuICBASW5wdXQoKSBmbG9hdExhYmVsOiBGbG9hdExhYmVsVHlwZSA9ICduZXZlcic7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhpcyBjb21wb25lbnQgaXMgZGlzYWJsZWRcclxuICAgKi9cclxuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBJY29ucyBjb2xvciAoc2VhcmNoIGFuZCBjbGVhcilcclxuICAgKi9cclxuICBASW5wdXQoKSBjb2xvciA9ICdwcmltYXJ5JztcclxuXHJcbiAgLyoqXHJcbiAgICogRGVib3VuY2UgdGltZSBiZXR3ZWVuIGVhY2gga2V5c3Ryb2tlXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGVib3VuY2UgPSAzMDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIE1pbmltdW0gdGVybSBsZW5ndGggcmVxdWlyZWQgdG8gdHJpZ2dlciBhIHJlc2VhcmNoXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWluTGVuZ3RoID0gMjtcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIGljb25cclxuICAgKi9cclxuICBASW5wdXQoKSBzZWFyY2hJY29uOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCByZXN1bHRzIHN0b3JlXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3RvcmU6IEVudGl0eVN0b3JlPFNlYXJjaFJlc3VsdD47XHJcblxyXG4gIC8qKlxyXG4gICAqIExpc3Qgb2YgYXZhaWxhYmxlIHNlYXJjaCB0eXBlc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNlYXJjaFR5cGVzOiBzdHJpbmdbXSA9IFNFQVJDSF9UWVBFUztcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWFyY2ggdGVybSBjaGFuZ2VzXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gYSByZXNlYXJjaCBpcyBjb21wbGV0ZWRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgc2VhcmNoID0gbmV3IEV2ZW50RW1pdHRlcjx7XHJcbiAgICByZXNlYXJjaDogUmVzZWFyY2g7XHJcbiAgICByZXN1bHRzOiBTZWFyY2hSZXN1bHRbXTtcclxuICB9PigpO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlYXJjaCB0eXBlIGNoYW5nZXNcclxuICAgKi9cclxuICBAT3V0cHV0KCkgc2VhcmNoVHlwZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICAvKipcclxuICAgKiBJbnB1dCBlbGVtZW50XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgQFZpZXdDaGlsZCgnaW5wdXQnKSBpbnB1dDogRWxlbWVudFJlZjtcclxuXHJcbiAgLyoqXHJcbiAgICogSG9zdCdzIGVtcHR5IGNsYXNzXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5lbXB0eScpXHJcbiAgZ2V0IGVtcHR5Q2xhc3MoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5lbXB0eTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhlIHNlYXJjaCBiYXIgaXMgZW1wdHlcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgZW1wdHkoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy50ZXJtLmxlbmd0aCA9PT0gMDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBiYXIgcGFsY2Vob2xkZXJcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBzZXQgcGxhY2Vob2xkZXIodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5fcGxhY2Vob2xkZXIgPSB2YWx1ZTtcclxuICB9XHJcbiAgZ2V0IHBsYWNlaG9sZGVyKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5lbXB0eSA/IHRoaXMuX3BsYWNlaG9sZGVyIDogJyc7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3BsYWNlaG9sZGVyID0gJyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZSkge31cclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaWJlIHRvIHRoZSBzZWFyY2ggdGVybSBzdHJlYW0gYW5kIHRyaWdnZXIgcmVzZWFyY2hlc1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5zdHJlYW0kJCA9IHRoaXMuc3RyZWFtJFxyXG4gICAgICAucGlwZShcclxuICAgICAgICBkZWJvdW5jZSgodGVybTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gdGVybSA9PT0gJycgPyBFTVBUWSA6IHRpbWVyKDMwMCk7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUoKHRlcm06IHN0cmluZykgPT4gdGhpcy5vblRlcm1DaGFuZ2UodGVybSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5zdWJzY3JpYmUgdG8gdGhlIHNlYXJjaCB0ZXJtIHN0cmVhbVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5zdHJlYW0kJC51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBhIHVzZXIgdHlwZXMsIHZhbGlkYXRlcyB0aGUga2V5IGFuZCBzZW5kIGl0IGludG8gdGhlXHJcbiAgICogc3RyZWFtIGlmIGl0J3MgdmFsaWRcclxuICAgKiBAcGFyYW0gZXZlbnQgS2V5Ym9hcmQgZXZlbnRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvbktleXVwKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICBjb25zdCBrZXkgPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xyXG4gICAgaWYgKCF0aGlzLmtleUlzVmFsaWQoa2V5KSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnNldFRlcm0oa2V5KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBzdHJlYW0gYW5kIHRoZSBpbnB1dFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uQ2xlYXJCdXR0b25DbGljaygpIHtcclxuICAgIHRoaXMuY2xlYXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSB0aGUgcGxhY2Vob2xkZXIgd2l0aCB0aGUgZW5hYmxlZCBzZWFyY2ggdHlwZS4gVGhlIHBsYWNlaG9sZGVyXHJcbiAgICogZm9yIGFsbCBhdmFpbGFibGVzIHNlYXJjaCB0eXBlcnMgbmVlZHMgdG8gYmUgZGVmaW5lZCBpbiB0aGUgbG9jYWxlXHJcbiAgICogZmlsZXMgb3IgYW4gZXJyb3Igd2lsbCBiZSB0aHJvd24uXHJcbiAgICogQHBhcmFtIHNlYXJjaFR5cGUgRW5hYmxlZCBzZWFyY2ggdHlwZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uU2VhcmNoVHlwZUNoYW5nZShzZWFyY2hUeXBlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuc2VhcmNoVHlwZUNoYW5nZS5lbWl0KHNlYXJjaFR5cGUpO1xyXG4gICAgdGhpcy5wbGFjZWhvbGRlciA9IGBzZWFyY2guJHtzZWFyY2hUeXBlLnRvTG93ZXJDYXNlKCl9LnBsYWNlaG9sZGVyYDtcclxuICAgIHRoaXMuZG9TZWFyY2godGhpcy50ZXJtKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlbmQgdGhlIHRlcm0gaW50byB0aGUgc3RyZWFtIG9ubHkgaWYgdGhpcyBjb21wb25lbnQgaXMgbm90IGRpc2FibGVkXHJcbiAgICogQHBhcmFtIHRlcm0gU2VhcmNoIHRlcm1cclxuICAgKi9cclxuICBzZXRUZXJtKHRlcm06IHN0cmluZykge1xyXG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudGVybSA9IHRlcm07XHJcbiAgICBpZiAodGVybS5yZXBsYWNlKC8oI1teXFxzXSopL2csICcnKS50cmltKCkubGVuZ3RoID49IHRoaXMubWluTGVuZ3RoIHx8XHJcbiAgICAgIHRlcm0ucmVwbGFjZSgvKCNbXlxcc10qKS9nLCAnJykudHJpbSgpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0aGlzLnN0cmVhbSQubmV4dCh0ZXJtKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBzdHJlYW0gYW5kIHRoZSBpbnB1dFxyXG4gICAqL1xyXG4gIHByaXZhdGUgY2xlYXIoKSB7XHJcbiAgICB0aGlzLnRlcm0gPSAnJztcclxuICAgIHRoaXMuc3RyZWFtJC5uZXh0KHRoaXMudGVybSk7XHJcbiAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFZhbGlkYXRlIGlmIGEgZ2l2ZW4ga2V5IHN0cm9rZSBpcyBhIHZhbGlkIGlucHV0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBrZXlJc1ZhbGlkKGtleTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pbnZhbGlkS2V5cy5pbmRleE9mKGtleSkgPT09IC0xO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0aGUgc2VhcmNoIHRlcm0gY2hhbmdlcywgZW1pdCBhbiBldmVudCBhbmQgdHJpZ2dlciBhXHJcbiAgICogcmVzZWFyY2ggaW4gZXZlcnkgZW5hYmxlZCBzZWFyY2ggc291cmNlcy5cclxuICAgKiBAcGFyYW0gdGVybSBTZWFyY2ggdGVybVxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25UZXJtQ2hhbmdlKHRlcm06IHN0cmluZyB8IHVuZGVmaW5lZCkge1xyXG4gICAgdGhpcy5jaGFuZ2UuZW1pdCh0ZXJtKTtcclxuICAgIHRoaXMuZG9TZWFyY2godGVybSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFeGVjdXRlIHRoZSBzZWFyY2hcclxuICAgKiBAcGFyYW0gdGVybSBTZWFyY2ggdGVybVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZG9TZWFyY2godGVybTogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XHJcbiAgICBpZiAodGVybSA9PT0gdW5kZWZpbmVkIHx8IHRlcm0ucmVwbGFjZSgvKCNbXlxcc10qKS9nLCAnJykudHJpbSgpID09PSAnJykge1xyXG4gICAgICBpZiAodGhpcy5zdG9yZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yZS5jbGVhcigpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5zdG9yZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuc3RvcmUuc29mdENsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzZWFyY2hlcyA9IHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2godGVybSk7XHJcbiAgICByZXNlYXJjaGVzLm1hcChyZXNlYXJjaCA9PiB7XHJcbiAgICAgIHJlc2VhcmNoLnJlcXVlc3Quc3Vic2NyaWJlKChyZXN1bHRzOiBTZWFyY2hSZXN1bHRbXSkgPT4ge1xyXG4gICAgICAgIHRoaXMub25SZXNlYXJjaENvbXBsZXRlZChyZXNlYXJjaCwgcmVzdWx0cyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGEgcmVzZWFyY2ggIGlzIGNvbXBsZXRlZCwgZW1pdCBhbiBldmVudCBhbmQgdXBkYXRlXHJcbiAgICogdGhlIHN0b3JlJ3MgaXRlbXMuXHJcbiAgICogQHBhcmFtIHJlc2VhcmNoIFJlc2VhcmNoXHJcbiAgICogQHBhcmFtIHJlc3VsdHMgUmVzZWFyY2ggcmVzdWx0c1xyXG4gICAqL1xyXG4gIHByaXZhdGUgb25SZXNlYXJjaENvbXBsZXRlZChyZXNlYXJjaDogUmVzZWFyY2gsIHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdKSB7XHJcbiAgICB0aGlzLnNlYXJjaC5lbWl0KHsgcmVzZWFyY2gsIHJlc3VsdHMgfSk7XHJcblxyXG4gICAgaWYgKHRoaXMuc3RvcmUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBjb25zdCBuZXdSZXN1bHRzID0gdGhpcy5zdG9yZS5lbnRpdGllcyQudmFsdWVcclxuICAgICAgICAuZmlsdGVyKHJlc3VsdCA9PiByZXN1bHQuc291cmNlICE9PSByZXNlYXJjaC5zb3VyY2UpXHJcbiAgICAgICAgLmNvbmNhdChyZXN1bHRzKTtcclxuICAgICAgdGhpcy5zdG9yZS5sb2FkKG5ld1Jlc3VsdHMpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=