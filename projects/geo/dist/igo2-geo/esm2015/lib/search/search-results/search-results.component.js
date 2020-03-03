/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ContentChild, ChangeDetectionStrategy, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { EMPTY, timer, BehaviorSubject } from 'rxjs';
import { debounce, map } from 'rxjs/operators';
import { EntityStore, EntityStoreWatcher } from '@igo2/common';
import { IgoMap } from '../../map';
import { SearchService } from '../shared/search.service';
/** @enum {string} */
const SearchResultMode = {
    Grouped: 'grouped',
    Flat: 'flat',
};
export { SearchResultMode };
/**
 * List of search results with focus and selection capabilities.
 * This component is dumb and only emits events.
 */
export class SearchResultsComponent {
    /**
     * @param {?} cdRef
     * @param {?} searchService
     */
    constructor(cdRef, searchService) {
        this.cdRef = cdRef;
        this.searchService = searchService;
        /**
         * Reference to the SearchResultMode enum
         * \@internal
         */
        this.searchResultMode = SearchResultMode;
        this.pageIterator = [];
        this.collapsed = [];
        /**
         * Search results display mode
         */
        this.mode = SearchResultMode.Grouped;
        /**
         * Whether there should be a zoom button
         */
        this.withZoomButton = false;
        this.settingsChange$ = new BehaviorSubject(undefined);
        /**
         * Event emitted when a result is focused
         */
        this.resultFocus = new EventEmitter();
        /**
         * Event emitted when a result is unfocused
         */
        this.resultUnfocus = new EventEmitter();
        /**
         * Event emitted when a result is selected
         */
        this.resultSelect = new EventEmitter();
        /**
         * Event emitted when a research is completed after displaying more results is clicked
         */
        this.moreResults = new EventEmitter();
        /**
         * Events emitted when a result is focus or unfocus by mouse event
         */
        this.resultMouseenter = new EventEmitter();
        this.resultMouseleave = new EventEmitter();
    }
    /**
     * Search term
     * @return {?}
     */
    get term() {
        return this._term;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set term(value) {
        this._term = value;
        this.pageIterator = [];
    }
    /**
     * @return {?}
     */
    get results$() {
        if (this._results$ === undefined) {
            this._results$ = this.liftResults();
        }
        return this._results$;
    }
    /**
     * Bind the search results store to the watcher
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        this.watcher = new EntityStoreWatcher(this.store, this.cdRef);
        this.settingsChange$.subscribe((/**
         * @return {?}
         */
        () => {
            this.pageIterator = [];
        }));
    }
    /**
     * Unbind the search results store from the watcher
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        this.watcher.destroy();
    }
    /**
     * When a result is focused, update it's state in the store and emit
     * an event.
     * \@internal
     * @param {?} result Search result
     * @return {?}
     */
    onResultFocus(result) {
        if (this.store.state.get(result)) {
            if (this.store.state.get(result).focused === true) {
                return;
            }
        }
        this.store.state.update(result, { focused: true }, true);
        this.resultFocus.emit(result);
    }
    /**
     * @param {?} result
     * @return {?}
     */
    onResultUnfocus(result) {
        this.resultUnfocus.emit(result);
    }
    /**
     * Compute a group title
     * \@internal
     * @param {?} group Search results group
     * @return {?} Group title
     */
    computeGroupTitle(group) {
        /** @type {?} */
        const parts = [group.source.title];
        /** @type {?} */
        const count = group.results.length;
        if (count > 1) {
            parts.push(`(${count})`);
        }
        return parts.join(' ');
    }
    /**
     * When a result is selected, update it's state in the store and emit
     * an event. A selected result is also considered focused
     * \@internal
     * @param {?} result Search result
     * @return {?}
     */
    onResultSelect(result) {
        if (this.store.state.get(result)) {
            if (this.store.state.get(result).selected === true) {
                return;
            }
        }
        this.store.state.update(result, { focused: true, selected: true }, true);
        this.resultSelect.emit(result);
    }
    /**
     * Return an observable of the search results, grouped by search source
     * \@internal
     * @private
     * @return {?} Observable of grouped search results
     */
    liftResults() {
        return this.store.view.all$().pipe(debounce((/**
         * @param {?} results
         * @return {?}
         */
        (results) => {
            return results.length === 0 ? EMPTY : timer(200);
        })), map((/**
         * @param {?} results
         * @return {?}
         */
        (results) => {
            return this.groupResults(results.sort(this.sortByOrder));
        })));
    }
    /**
     * Sort the results by display order.
     * @private
     * @param {?} r1 First result
     * @param {?} r2 Second result
     * @return {?}
     */
    sortByOrder(r1, r2) {
        return r1.source.displayOrder - r2.source.displayOrder;
    }
    /**
     * Group results by search source
     * @private
     * @param {?} results Search results from all sources
     * @return {?} Search results grouped by source
     */
    groupResults(results) {
        /** @type {?} */
        const grouped = new Map();
        results.forEach((/**
         * @param {?} result
         * @return {?}
         */
        (result) => {
            /** @type {?} */
            const source = result.source;
            /** @type {?} */
            let sourceResults = grouped.get(source);
            if (sourceResults === undefined) {
                sourceResults = [];
                grouped.set(source, sourceResults);
            }
            sourceResults.push(result);
        }));
        return Array.from(grouped.keys()).map((/**
         * @param {?} source
         * @return {?}
         */
        (source) => {
            if (this.pageIterator[source.getId()] === undefined) {
                this.pageIterator[source.getId()] = 1;
            }
            return { source, results: grouped.get(source) };
        }));
    }
    /**
     * @param {?} group
     * @return {?}
     */
    isMoreResults(group) {
        return group.results && group.results[group.results.length - 1].meta.nextPage === true;
    }
    /**
     * @param {?} group
     * @return {?}
     */
    displayMoreResults(group) {
        /** @type {?} */
        const options = {
            sourceId: group.source.getId(),
            page: ++this.pageIterator[group.source.getId()]
        };
        /** @type {?} */
        const researches = this.searchService.search(this.term, options);
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
                /** @type {?} */
                const newResults = group.results.concat(results);
                if (!results.length) {
                    newResults[newResults.length - 1].meta.nextPage = false;
                }
                this.moreResults.emit({ research, results: newResults });
            }));
        }));
        return;
    }
}
SearchResultsComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-search-results',
                template: "<igo-list [navigation]=\"true\">\r\n  <ng-template\r\n    #groupTemplate\r\n    ngFor let-group\r\n    [ngForOf]=\"results$ | async\">\r\n\r\n    <igo-collapsible\r\n      *ngIf=\"mode === searchResultMode.Grouped; else flatTemplate\"\r\n      [title]=\"computeGroupTitle(group)\"\r\n      [collapsed]=\"collapsed[group.source.title]\"\r\n      (toggle)=\"collapsed[group.source.title] = $event\">\r\n      <ng-container *ngTemplateOutlet=\"storeItemTemplate; context: {results: group.results}\"></ng-container>\r\n    </igo-collapsible>\r\n\r\n    <ng-template #flatTemplate>\r\n      <ng-container *ngTemplateOutlet=\"storeItemTemplate; context: {results: group.results}\"></ng-container>\r\n    </ng-template>\r\n\r\n    <ng-template #storeItemTemplate let-results=\"results\">\r\n      <ng-template ngFor let-result [ngForOf]=\"results\">\r\n        <igo-search-results-item\r\n          igoListItem\r\n          color=\"accent\"\r\n          [map]=\"map\"\r\n          [result]=\"result\"\r\n          [showIcons]=\"showIcons\"\r\n          [withZoomButton]=\"withZoomButton\"\r\n          [focused]=\"store.state.get(result).focused\"\r\n          [selected]=\"store.state.get(result).selected\"\r\n          (focus)=\"onResultFocus(result)\"\r\n          (unfocus)=\"onResultUnfocus(result)\"\r\n          (select)=\"onResultSelect(result)\"\r\n          (mouseenter)=\"resultMouseenter.emit(result)\"\r\n          (mouseleave)=\"resultMouseleave.emit(result)\">\r\n\r\n          <ng-container igoSearchItemToolbar\r\n            [ngTemplateOutlet]=\"templateSearchToolbar\"\r\n            [ngTemplateOutletContext]=\"{result: result}\">\r\n          </ng-container>\r\n\r\n        </igo-search-results-item>\r\n      </ng-template>\r\n      <span class=\"moreResults mat-typography\" *ngIf=\"isMoreResults(group)\" (click)=\"displayMoreResults(group)\">\r\n        <u>{{ 'igo.geo.search.displayMoreResults' | translate }}</u>\r\n      </span>\r\n    </ng-template>\r\n\r\n  </ng-template>\r\n\r\n</igo-list>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".moreResults{cursor:pointer;color:#00f;float:right;margin-right:10px;margin-top:5px}"]
            }] }
];
/** @nocollapse */
SearchResultsComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: SearchService }
];
SearchResultsComponent.propDecorators = {
    map: [{ type: Input }],
    store: [{ type: Input }],
    showIcons: [{ type: Input }],
    mode: [{ type: Input }],
    withZoomButton: [{ type: Input }],
    term: [{ type: Input }],
    settingsChange$: [{ type: Input }],
    resultFocus: [{ type: Output }],
    resultUnfocus: [{ type: Output }],
    resultSelect: [{ type: Output }],
    moreResults: [{ type: Output }],
    resultMouseenter: [{ type: Output }],
    resultMouseleave: [{ type: Output }],
    templateSearchToolbar: [{ type: ContentChild, args: ['igoSearchItemToolbar',] }]
};
if (false) {
    /**
     * Reference to the SearchResultMode enum
     * \@internal
     * @type {?}
     */
    SearchResultsComponent.prototype.searchResultMode;
    /**
     * Search results store watcher
     * @type {?}
     * @private
     */
    SearchResultsComponent.prototype.watcher;
    /** @type {?} */
    SearchResultsComponent.prototype.pageIterator;
    /** @type {?} */
    SearchResultsComponent.prototype.collapsed;
    /** @type {?} */
    SearchResultsComponent.prototype.map;
    /**
     * Search results store
     * @type {?}
     */
    SearchResultsComponent.prototype.store;
    /**
     * to show hide results icons
     * @type {?}
     */
    SearchResultsComponent.prototype.showIcons;
    /**
     * Search results display mode
     * @type {?}
     */
    SearchResultsComponent.prototype.mode;
    /**
     * Whether there should be a zoom button
     * @type {?}
     */
    SearchResultsComponent.prototype.withZoomButton;
    /** @type {?} */
    SearchResultsComponent.prototype._term;
    /** @type {?} */
    SearchResultsComponent.prototype.settingsChange$;
    /**
     * Event emitted when a result is focused
     * @type {?}
     */
    SearchResultsComponent.prototype.resultFocus;
    /**
     * Event emitted when a result is unfocused
     * @type {?}
     */
    SearchResultsComponent.prototype.resultUnfocus;
    /**
     * Event emitted when a result is selected
     * @type {?}
     */
    SearchResultsComponent.prototype.resultSelect;
    /**
     * Event emitted when a research is completed after displaying more results is clicked
     * @type {?}
     */
    SearchResultsComponent.prototype.moreResults;
    /**
     * Events emitted when a result is focus or unfocus by mouse event
     * @type {?}
     */
    SearchResultsComponent.prototype.resultMouseenter;
    /** @type {?} */
    SearchResultsComponent.prototype.resultMouseleave;
    /** @type {?} */
    SearchResultsComponent.prototype.templateSearchToolbar;
    /**
     * @type {?}
     * @private
     */
    SearchResultsComponent.prototype._results$;
    /**
     * @type {?}
     * @private
     */
    SearchResultsComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    SearchResultsComponent.prototype.searchService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zZWFyY2gtcmVzdWx0cy9zZWFyY2gtcmVzdWx0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osWUFBWSxFQUNaLHVCQUF1QixFQUN2QixpQkFBaUIsRUFFakIsV0FBVyxFQUVaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBYyxLQUFLLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFL0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUduQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7OztJQUt2RCxTQUFVLFNBQVM7SUFDbkIsTUFBTyxNQUFNOzs7Ozs7O0FBYWYsTUFBTSxPQUFPLHNCQUFzQjs7Ozs7SUE4RmpDLFlBQW9CLEtBQXdCLEVBQ3hCLGFBQTRCO1FBRDVCLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ3hCLGtCQUFhLEdBQWIsYUFBYSxDQUFlOzs7OztRQTFGekMscUJBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFPcEMsaUJBQVksR0FBeUIsRUFBRSxDQUFDO1FBRXhDLGNBQVMsR0FBeUIsRUFBRSxDQUFDOzs7O1FBaUJuQyxTQUFJLEdBQXFCLGdCQUFnQixDQUFDLE9BQU8sQ0FBQzs7OztRQUtsRCxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQWV2QixvQkFBZSxHQUFHLElBQUksZUFBZSxDQUFVLFNBQVMsQ0FBQyxD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RTs7Ozs7SUFLbkUsNkNBQXlEOzs7OztJQUt6RCwrQ0FBMkQ7Ozs7O0lBSzNELDhDQUEwRDs7Ozs7SUFLMUQsNkNBR0s7Ozs7O0lBS0wsa0RBQThEOztJQUM5RCxrREFBOEQ7O0lBRTlELHVEQUE4RTs7Ozs7SUFROUUsMkNBRUU7Ozs7O0lBRVUsdUNBQWdDOzs7OztJQUNoQywrQ0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIENvbnRlbnRDaGlsZCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBPbkluaXQsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgT25EZXN0cm95XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBFTVBUWSwgdGltZXIsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBkZWJvdW5jZSwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgRW50aXR5U3RvcmUsIEVudGl0eVN0b3JlV2F0Y2hlciB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5cclxuaW1wb3J0IHsgVGV4dFNlYXJjaE9wdGlvbnMgfSBmcm9tICcuLi9zaGFyZWQvc291cmNlcy9zb3VyY2UuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IFNlYXJjaFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VhcmNoLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQsIFJlc2VhcmNoIH0gZnJvbSAnLi4vc2hhcmVkL3NlYXJjaC5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgU2VhcmNoU291cmNlIH0gZnJvbSAnLi4vc2hhcmVkL3NvdXJjZXMvc291cmNlJztcclxuXHJcbmV4cG9ydCBlbnVtIFNlYXJjaFJlc3VsdE1vZGUge1xyXG4gIEdyb3VwZWQgPSAnZ3JvdXBlZCcsXHJcbiAgRmxhdCA9ICdmbGF0J1xyXG59XHJcblxyXG4vKipcclxuICogTGlzdCBvZiBzZWFyY2ggcmVzdWx0cyB3aXRoIGZvY3VzIGFuZCBzZWxlY3Rpb24gY2FwYWJpbGl0aWVzLlxyXG4gKiBUaGlzIGNvbXBvbmVudCBpcyBkdW1iIGFuZCBvbmx5IGVtaXRzIGV2ZW50cy5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXNlYXJjaC1yZXN1bHRzJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc2VhcmNoLXJlc3VsdHMuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3NlYXJjaC1yZXN1bHRzLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFNlYXJjaFJlc3VsdHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgLyoqXHJcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBTZWFyY2hSZXN1bHRNb2RlIGVudW1cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwdWJsaWMgc2VhcmNoUmVzdWx0TW9kZSA9IFNlYXJjaFJlc3VsdE1vZGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCByZXN1bHRzIHN0b3JlIHdhdGNoZXJcclxuICAgKi9cclxuICBwcml2YXRlIHdhdGNoZXI6IEVudGl0eVN0b3JlV2F0Y2hlcjxTZWFyY2hSZXN1bHQ+O1xyXG5cclxuICBwdWJsaWMgcGFnZUl0ZXJhdG9yOiB7c291cmNlSWQ6IHN0cmluZ31bXSA9IFtdO1xyXG5cclxuICBwdWJsaWMgY29sbGFwc2VkOiB7c291cmNlSWQ6IHN0cmluZ31bXSA9IFtdO1xyXG5cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHJlc3VsdHMgc3RvcmVcclxuICAgKi9cclxuICBASW5wdXQoKSBzdG9yZTogRW50aXR5U3RvcmU8U2VhcmNoUmVzdWx0PjtcclxuXHJcbiAgLyoqXHJcbiAgICogdG8gc2hvdyBoaWRlIHJlc3VsdHMgaWNvbnNcclxuICAgKi9cclxuICBASW5wdXQoKSBzaG93SWNvbnM6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCByZXN1bHRzIGRpc3BsYXkgbW9kZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1vZGU6IFNlYXJjaFJlc3VsdE1vZGUgPSBTZWFyY2hSZXN1bHRNb2RlLkdyb3VwZWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhlcmUgc2hvdWxkIGJlIGEgem9vbSBidXR0b25cclxuICAgKi9cclxuICBASW5wdXQoKSB3aXRoWm9vbUJ1dHRvbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggdGVybVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHRlcm0oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl90ZXJtO1xyXG4gIH1cclxuICBzZXQgdGVybSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl90ZXJtID0gdmFsdWU7XHJcbiAgICB0aGlzLnBhZ2VJdGVyYXRvciA9IFtdO1xyXG4gIH1cclxuICBwdWJsaWMgX3Rlcm06IHN0cmluZztcclxuXHJcbiAgQElucHV0KCkgc2V0dGluZ3NDaGFuZ2UkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih1bmRlZmluZWQpO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gYSByZXN1bHQgaXMgZm9jdXNlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSByZXN1bHRGb2N1cyA9IG5ldyBFdmVudEVtaXR0ZXI8U2VhcmNoUmVzdWx0PigpO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gYSByZXN1bHQgaXMgdW5mb2N1c2VkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHJlc3VsdFVuZm9jdXMgPSBuZXcgRXZlbnRFbWl0dGVyPFNlYXJjaFJlc3VsdD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIGEgcmVzdWx0IGlzIHNlbGVjdGVkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHJlc3VsdFNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8U2VhcmNoUmVzdWx0PigpO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gYSByZXNlYXJjaCBpcyBjb21wbGV0ZWQgYWZ0ZXIgZGlzcGxheWluZyBtb3JlIHJlc3VsdHMgaXMgY2xpY2tlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBtb3JlUmVzdWx0cyA9IG5ldyBFdmVudEVtaXR0ZXI8e1xyXG4gICAgcmVzZWFyY2g6IFJlc2VhcmNoO1xyXG4gICAgcmVzdWx0czogU2VhcmNoUmVzdWx0W107XHJcbiAgfT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnRzIGVtaXR0ZWQgd2hlbiBhIHJlc3VsdCBpcyBmb2N1cyBvciB1bmZvY3VzIGJ5IG1vdXNlIGV2ZW50XHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHJlc3VsdE1vdXNlZW50ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPFNlYXJjaFJlc3VsdD4oKTtcclxuICBAT3V0cHV0KCkgcmVzdWx0TW91c2VsZWF2ZSA9IG5ldyBFdmVudEVtaXR0ZXI8U2VhcmNoUmVzdWx0PigpO1xyXG5cclxuICBAQ29udGVudENoaWxkKCdpZ29TZWFyY2hJdGVtVG9vbGJhcicpIHRlbXBsYXRlU2VhcmNoVG9vbGJhcjogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgZ2V0IHJlc3VsdHMkKCk6IE9ic2VydmFibGU8e3NvdXJjZTogU2VhcmNoU291cmNlOyByZXN1bHRzOiBTZWFyY2hSZXN1bHRbXX1bXT4ge1xyXG4gICAgaWYgKHRoaXMuX3Jlc3VsdHMkID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5fcmVzdWx0cyQgPSB0aGlzLmxpZnRSZXN1bHRzKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fcmVzdWx0cyQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3Jlc3VsdHMkOiBPYnNlcnZhYmxlPFxyXG4gICAge3NvdXJjZTogU2VhcmNoU291cmNlOyByZXN1bHRzOiBTZWFyY2hSZXN1bHRbXX1bXVxyXG4gID47XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZSkge31cclxuXHJcbiAgLyoqXHJcbiAgICogQmluZCB0aGUgc2VhcmNoIHJlc3VsdHMgc3RvcmUgdG8gdGhlIHdhdGNoZXJcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMud2F0Y2hlciA9IG5ldyBFbnRpdHlTdG9yZVdhdGNoZXIodGhpcy5zdG9yZSwgdGhpcy5jZFJlZik7XHJcblxyXG4gICAgdGhpcy5zZXR0aW5nc0NoYW5nZSQuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5wYWdlSXRlcmF0b3IgPSBbXTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5iaW5kIHRoZSBzZWFyY2ggcmVzdWx0cyBzdG9yZSBmcm9tIHRoZSB3YXRjaGVyXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLndhdGNoZXIuZGVzdHJveSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBhIHJlc3VsdCBpcyBmb2N1c2VkLCB1cGRhdGUgaXQncyBzdGF0ZSBpbiB0aGUgc3RvcmUgYW5kIGVtaXRcclxuICAgKiBhbiBldmVudC5cclxuICAgKiBAcGFyYW0gcmVzdWx0IFNlYXJjaCByZXN1bHRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvblJlc3VsdEZvY3VzKHJlc3VsdDogU2VhcmNoUmVzdWx0KSB7XHJcbiAgICBpZiAodGhpcy5zdG9yZS5zdGF0ZS5nZXQocmVzdWx0KSkge1xyXG4gICAgICBpZiAodGhpcy5zdG9yZS5zdGF0ZS5nZXQocmVzdWx0KS5mb2N1c2VkID09PSB0cnVlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0b3JlLnN0YXRlLnVwZGF0ZShyZXN1bHQsIHtmb2N1c2VkOiB0cnVlfSwgdHJ1ZSk7XHJcbiAgICB0aGlzLnJlc3VsdEZvY3VzLmVtaXQocmVzdWx0KTtcclxuICB9XHJcblxyXG4gIG9uUmVzdWx0VW5mb2N1cyhyZXN1bHQ6IFNlYXJjaFJlc3VsdCkge1xyXG4gICAgdGhpcy5yZXN1bHRVbmZvY3VzLmVtaXQocmVzdWx0KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbXB1dGUgYSBncm91cCB0aXRsZVxyXG4gICAqIEBwYXJhbSBncm91cCBTZWFyY2ggcmVzdWx0cyBncm91cFxyXG4gICAqIEByZXR1cm5zIEdyb3VwIHRpdGxlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgY29tcHV0ZUdyb3VwVGl0bGUoZ3JvdXA6IHtzb3VyY2U6IFNlYXJjaFNvdXJjZTsgcmVzdWx0czogU2VhcmNoUmVzdWx0W119KTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHBhcnRzID0gW2dyb3VwLnNvdXJjZS50aXRsZV07XHJcbiAgICBjb25zdCBjb3VudCA9IGdyb3VwLnJlc3VsdHMubGVuZ3RoO1xyXG4gICAgaWYgKGNvdW50ID4gMSkge1xyXG4gICAgICBwYXJ0cy5wdXNoKGAoJHtjb3VudH0pYCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFydHMuam9pbignICcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBhIHJlc3VsdCBpcyBzZWxlY3RlZCwgdXBkYXRlIGl0J3Mgc3RhdGUgaW4gdGhlIHN0b3JlIGFuZCBlbWl0XHJcbiAgICogYW4gZXZlbnQuIEEgc2VsZWN0ZWQgcmVzdWx0IGlzIGFsc28gY29uc2lkZXJlZCBmb2N1c2VkXHJcbiAgICogQHBhcmFtIHJlc3VsdCBTZWFyY2ggcmVzdWx0XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25SZXN1bHRTZWxlY3QocmVzdWx0OiBTZWFyY2hSZXN1bHQpIHtcclxuICAgIGlmICh0aGlzLnN0b3JlLnN0YXRlLmdldChyZXN1bHQpKSB7XHJcbiAgICAgIGlmICh0aGlzLnN0b3JlLnN0YXRlLmdldChyZXN1bHQpLnNlbGVjdGVkID09PSB0cnVlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0b3JlLnN0YXRlLnVwZGF0ZShyZXN1bHQsIHtmb2N1c2VkOiB0cnVlLCBzZWxlY3RlZDogdHJ1ZX0sIHRydWUpO1xyXG4gICAgdGhpcy5yZXN1bHRTZWxlY3QuZW1pdChyZXN1bHQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIGFuIG9ic2VydmFibGUgb2YgdGhlIHNlYXJjaCByZXN1bHRzLCBncm91cGVkIGJ5IHNlYXJjaCBzb3VyY2VcclxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIGdyb3VwZWQgc2VhcmNoIHJlc3VsdHNcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcml2YXRlIGxpZnRSZXN1bHRzKCk6IE9ic2VydmFibGU8e3NvdXJjZTogU2VhcmNoU291cmNlOyByZXN1bHRzOiBTZWFyY2hSZXN1bHRbXX1bXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RvcmUudmlldy5hbGwkKCkucGlwZShcclxuICAgICAgZGVib3VuY2UoKHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdHMubGVuZ3RoID09PSAwID8gRU1QVFkgOiB0aW1lcigyMDApO1xyXG4gICAgICB9KSxcclxuICAgICAgbWFwKChyZXN1bHRzOiBTZWFyY2hSZXN1bHRbXSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdyb3VwUmVzdWx0cyhyZXN1bHRzLnNvcnQodGhpcy5zb3J0QnlPcmRlcikpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNvcnQgdGhlIHJlc3VsdHMgYnkgZGlzcGxheSBvcmRlci5cclxuICAgKiBAcGFyYW0gcjEgRmlyc3QgcmVzdWx0XHJcbiAgICogQHBhcmFtIHIyIFNlY29uZCByZXN1bHRcclxuICAgKi9cclxuICBwcml2YXRlIHNvcnRCeU9yZGVyKHIxOiBTZWFyY2hSZXN1bHQsIHIyOiBTZWFyY2hSZXN1bHQpIHtcclxuICAgIHJldHVybiByMS5zb3VyY2UuZGlzcGxheU9yZGVyIC0gcjIuc291cmNlLmRpc3BsYXlPcmRlcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdyb3VwIHJlc3VsdHMgYnkgc2VhcmNoIHNvdXJjZVxyXG4gICAqIEBwYXJhbSByZXN1bHRzIFNlYXJjaCByZXN1bHRzIGZyb20gYWxsIHNvdXJjZXNcclxuICAgKiBAcmV0dXJucyBTZWFyY2ggcmVzdWx0cyBncm91cGVkIGJ5IHNvdXJjZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ3JvdXBSZXN1bHRzKHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdKToge3NvdXJjZTogU2VhcmNoU291cmNlOyByZXN1bHRzOiBTZWFyY2hSZXN1bHRbXX1bXSB7XHJcbiAgICBjb25zdCBncm91cGVkID0gbmV3IE1hcDxTZWFyY2hTb3VyY2UsIFNlYXJjaFJlc3VsdFtdPigpO1xyXG4gICAgcmVzdWx0cy5mb3JFYWNoKChyZXN1bHQ6IFNlYXJjaFJlc3VsdCkgPT4ge1xyXG4gICAgICBjb25zdCBzb3VyY2UgPSByZXN1bHQuc291cmNlO1xyXG4gICAgICBsZXQgc291cmNlUmVzdWx0cyA9IGdyb3VwZWQuZ2V0KHNvdXJjZSk7XHJcbiAgICAgIGlmIChzb3VyY2VSZXN1bHRzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBzb3VyY2VSZXN1bHRzID0gW107XHJcbiAgICAgICAgZ3JvdXBlZC5zZXQoc291cmNlLCBzb3VyY2VSZXN1bHRzKTtcclxuICAgICAgfVxyXG4gICAgICBzb3VyY2VSZXN1bHRzLnB1c2gocmVzdWx0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBBcnJheS5mcm9tKGdyb3VwZWQua2V5cygpKS5tYXAoKHNvdXJjZTogU2VhcmNoU291cmNlKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnBhZ2VJdGVyYXRvcltzb3VyY2UuZ2V0SWQoKV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMucGFnZUl0ZXJhdG9yW3NvdXJjZS5nZXRJZCgpXSA9IDE7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHtzb3VyY2UsIHJlc3VsdHM6IGdyb3VwZWQuZ2V0KHNvdXJjZSl9O1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpc01vcmVSZXN1bHRzKGdyb3VwOiB7c291cmNlOiBTZWFyY2hTb3VyY2U7IHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdfSkge1xyXG4gICAgcmV0dXJuIGdyb3VwLnJlc3VsdHMgJiYgZ3JvdXAucmVzdWx0c1tncm91cC5yZXN1bHRzLmxlbmd0aCAtIDFdLm1ldGEubmV4dFBhZ2UgPT09IHRydWU7XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5TW9yZVJlc3VsdHMoZ3JvdXA6IHtzb3VyY2U6IFNlYXJjaFNvdXJjZTsgcmVzdWx0czogU2VhcmNoUmVzdWx0W119KSB7XHJcbiAgICBjb25zdCBvcHRpb25zOiBUZXh0U2VhcmNoT3B0aW9ucyA9IHtcclxuICAgICAgc291cmNlSWQ6IGdyb3VwLnNvdXJjZS5nZXRJZCgpLFxyXG4gICAgICBwYWdlOiArK3RoaXMucGFnZUl0ZXJhdG9yW2dyb3VwLnNvdXJjZS5nZXRJZCgpXVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZXNlYXJjaGVzID0gdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaCh0aGlzLnRlcm0sIG9wdGlvbnMpO1xyXG4gICAgcmVzZWFyY2hlcy5tYXAocmVzZWFyY2ggPT4ge1xyXG4gICAgICByZXNlYXJjaC5yZXF1ZXN0LnN1YnNjcmliZSgocmVzdWx0czogU2VhcmNoUmVzdWx0W10pID0+IHtcclxuICAgICAgICBjb25zdCBuZXdSZXN1bHRzID0gZ3JvdXAucmVzdWx0cy5jb25jYXQocmVzdWx0cyk7XHJcbiAgICAgICAgaWYgKCFyZXN1bHRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgbmV3UmVzdWx0c1tuZXdSZXN1bHRzLmxlbmd0aCAtIDFdLm1ldGEubmV4dFBhZ2UgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tb3JlUmVzdWx0cy5lbWl0KHtyZXNlYXJjaCwgcmVzdWx0czogbmV3UmVzdWx0c30pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxufVxyXG4iXX0=