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
                template: "<igo-list [navigation]=\"true\">\r\n  <ng-template\r\n    #groupTemplate\r\n    ngFor let-group\r\n    [ngForOf]=\"results$ | async\">\r\n\r\n    <igo-collapsible [class]=\"group.source.getId()\"\r\n      *ngIf=\"mode === searchResultMode.Grouped; else flatTemplate\"\r\n      [title]=\"computeGroupTitle(group)\"\r\n      [collapsed]=\"collapsed[group.source.title]\"\r\n      (toggle)=\"collapsed[group.source.title] = $event\">\r\n      <ng-container *ngTemplateOutlet=\"storeItemTemplate; context: {results: group.results}\"></ng-container>\r\n    </igo-collapsible>\r\n\r\n    <ng-template #flatTemplate>\r\n      <ng-container *ngTemplateOutlet=\"storeItemTemplate; context: {results: group.results}\"></ng-container>\r\n    </ng-template>\r\n\r\n    <ng-template #storeItemTemplate let-results=\"results\">\r\n      <ng-template ngFor let-result [ngForOf]=\"results\">\r\n        <igo-search-results-item\r\n          igoListItem\r\n          color=\"accent\"\r\n          [map]=\"map\"\r\n          [result]=\"result\"\r\n          [showIcons]=\"showIcons\"\r\n          [withZoomButton]=\"withZoomButton\"\r\n          [focused]=\"store.state.get(result).focused\"\r\n          [selected]=\"store.state.get(result).selected\"\r\n          (focus)=\"resultFocus.emit(result)\"\r\n          (unfocus)=\"resultUnfocus.emit(result)\"\r\n          (select)=\"onResultSelect(result)\"\r\n          (mouseenter)=\"resultFocus.emit(result)\"\r\n          (mouseleave)=\"resultUnfocus.emit(result)\">\r\n\r\n          <ng-container igoSearchItemToolbar\r\n            [ngTemplateOutlet]=\"templateSearchToolbar\"\r\n            [ngTemplateOutletContext]=\"{result: result}\">\r\n          </ng-container>\r\n\r\n        </igo-search-results-item>\r\n      </ng-template>\r\n      <span class=\"moreResults mat-typography\" *ngIf=\"isMoreResults(group)\" (click)=\"displayMoreResults(group)\">\r\n        <u>{{ 'igo.geo.search.displayMoreResults' | translate }}</u>\r\n      </span>\r\n    </ng-template>\r\n\r\n  </ng-template>\r\n\r\n</igo-list>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".moreResults{cursor:pointer;color:#00f;float:right;margin-right:10px;margin-top:5px}igo-list ::ng-deep mat-list{height:100%}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zZWFyY2gtcmVzdWx0cy9zZWFyY2gtcmVzdWx0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osWUFBWSxFQUNaLHVCQUF1QixFQUN2QixpQkFBaUIsRUFFakIsV0FBVyxFQUVaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBYyxLQUFLLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFL0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUduQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7OztJQUt2RCxTQUFVLFNBQVM7SUFDbkIsTUFBTyxNQUFNOzs7Ozs7O0FBYWYsTUFBTSxPQUFPLHNCQUFzQjs7Ozs7SUE4RmpDLFlBQW9CLEtBQXdCLEVBQ3hCLGFBQTRCO1FBRDVCLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ3hCLGtCQUFhLEdBQWIsYUFBYSxDQUFlOzs7OztRQTFGekMscUJBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFPcEMsaUJBQVksR0FBeUIsRUFBRSxDQUFDO1FBRXhDLGNBQVMsR0FBeUIsRUFBRSxDQUFDOzs7O1FBaUJuQyxTQUFJLEdBQXFCLGdCQUFnQixDQUFDLE9BQU8sQ0FBQzs7OztRQUtsRCxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQWV2QixvQkFBZSxHQUFHLElBQUksZUFBZSxDQUFVLFNBQVMsQ0FBQyxD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QkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5Qiw4Z0VBQThDO2dCQUU5QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs7WUFoQ0MsaUJBQWlCO1lBY1YsYUFBYTs7O2tCQW1DbkIsS0FBSztvQkFLTCxLQUFLO3dCQUtMLEtBQUs7bUJBS0wsS0FBSzs2QkFLTCxLQUFLO21CQUtMLEtBQUs7OEJBVUwsS0FBSzswQkFLTCxNQUFNOzRCQUtOLE1BQU07MkJBS04sTUFBTTswQkFLTixNQUFNOytCQVFOLE1BQU07K0JBQ04sTUFBTTtvQ0FFTixZQUFZLFNBQUMsc0JBQXNCOzs7Ozs7OztJQTdFcEMsa0RBQTJDOzs7Ozs7SUFLM0MseUNBQWtEOztJQUVsRCw4Q0FBK0M7O0lBRS9DLDJDQUE0Qzs7SUFFNUMscUNBQXFCOzs7OztJQUtyQix1Q0FBMEM7Ozs7O0lBSzFDLDJDQUE0Qjs7Ozs7SUFLNUIsc0NBQTJEOzs7OztJQUszRCxnREFBZ0M7O0lBYWhDLHVDQUFxQjs7SUFFckIsaURBQW1FOzs7OztJQUtuRSw2Q0FBeUQ7Ozs7O0lBS3pELCtDQUEyRDs7Ozs7SUFLM0QsOENBQTBEOzs7OztJQUsxRCw2Q0FHSzs7Ozs7SUFLTCxrREFBOEQ7O0lBQzlELGtEQUE4RDs7SUFFOUQsdURBQThFOzs7OztJQVE5RSwyQ0FFRTs7Ozs7SUFFVSx1Q0FBZ0M7Ozs7O0lBQ2hDLCtDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgQ29udGVudENoaWxkLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIE9uSW5pdCxcclxuICBUZW1wbGF0ZVJlZixcclxuICBPbkRlc3Ryb3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUsIEVNUFRZLCB0aW1lciwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBFbnRpdHlTdG9yZSwgRW50aXR5U3RvcmVXYXRjaGVyIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcCc7XHJcblxyXG5pbXBvcnQgeyBUZXh0U2VhcmNoT3B0aW9ucyB9IGZyb20gJy4uL3NoYXJlZC9zb3VyY2VzL3NvdXJjZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgU2VhcmNoU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZWFyY2guc2VydmljZSc7XHJcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCwgUmVzZWFyY2ggfSBmcm9tICcuLi9zaGFyZWQvc2VhcmNoLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2UgfSBmcm9tICcuLi9zaGFyZWQvc291cmNlcy9zb3VyY2UnO1xyXG5cclxuZXhwb3J0IGVudW0gU2VhcmNoUmVzdWx0TW9kZSB7XHJcbiAgR3JvdXBlZCA9ICdncm91cGVkJyxcclxuICBGbGF0ID0gJ2ZsYXQnXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMaXN0IG9mIHNlYXJjaCByZXN1bHRzIHdpdGggZm9jdXMgYW5kIHNlbGVjdGlvbiBjYXBhYmlsaXRpZXMuXHJcbiAqIFRoaXMgY29tcG9uZW50IGlzIGR1bWIgYW5kIG9ubHkgZW1pdHMgZXZlbnRzLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tc2VhcmNoLXJlc3VsdHMnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWFyY2gtcmVzdWx0cy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc2VhcmNoLXJlc3VsdHMuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VhcmNoUmVzdWx0c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAvKipcclxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIFNlYXJjaFJlc3VsdE1vZGUgZW51bVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZWFyY2hSZXN1bHRNb2RlID0gU2VhcmNoUmVzdWx0TW9kZTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHJlc3VsdHMgc3RvcmUgd2F0Y2hlclxyXG4gICAqL1xyXG4gIHByaXZhdGUgd2F0Y2hlcjogRW50aXR5U3RvcmVXYXRjaGVyPFNlYXJjaFJlc3VsdD47XHJcblxyXG4gIHB1YmxpYyBwYWdlSXRlcmF0b3I6IHtzb3VyY2VJZDogc3RyaW5nfVtdID0gW107XHJcblxyXG4gIHB1YmxpYyBjb2xsYXBzZWQ6IHtzb3VyY2VJZDogc3RyaW5nfVtdID0gW107XHJcblxyXG4gIEBJbnB1dCgpIG1hcDogSWdvTWFwO1xyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggcmVzdWx0cyBzdG9yZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0b3JlOiBFbnRpdHlTdG9yZTxTZWFyY2hSZXN1bHQ+O1xyXG5cclxuICAvKipcclxuICAgKiB0byBzaG93IGhpZGUgcmVzdWx0cyBpY29uc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNob3dJY29uczogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHJlc3VsdHMgZGlzcGxheSBtb2RlXHJcbiAgICovXHJcbiAgQElucHV0KCkgbW9kZTogU2VhcmNoUmVzdWx0TW9kZSA9IFNlYXJjaFJlc3VsdE1vZGUuR3JvdXBlZDtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGVyZSBzaG91bGQgYmUgYSB6b29tIGJ1dHRvblxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHdpdGhab29tQnV0dG9uID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCB0ZXJtXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBnZXQgdGVybSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Rlcm07XHJcbiAgfVxyXG4gIHNldCB0ZXJtKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX3Rlcm0gPSB2YWx1ZTtcclxuICAgIHRoaXMucGFnZUl0ZXJhdG9yID0gW107XHJcbiAgfVxyXG4gIHB1YmxpYyBfdGVybTogc3RyaW5nO1xyXG5cclxuICBASW5wdXQoKSBzZXR0aW5nc0NoYW5nZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHVuZGVmaW5lZCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiBhIHJlc3VsdCBpcyBmb2N1c2VkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHJlc3VsdEZvY3VzID0gbmV3IEV2ZW50RW1pdHRlcjxTZWFyY2hSZXN1bHQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiBhIHJlc3VsdCBpcyB1bmZvY3VzZWRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgcmVzdWx0VW5mb2N1cyA9IG5ldyBFdmVudEVtaXR0ZXI8U2VhcmNoUmVzdWx0PigpO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gYSByZXN1bHQgaXMgc2VsZWN0ZWRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgcmVzdWx0U2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxTZWFyY2hSZXN1bHQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiBhIHJlc2VhcmNoIGlzIGNvbXBsZXRlZCBhZnRlciBkaXNwbGF5aW5nIG1vcmUgcmVzdWx0cyBpcyBjbGlja2VkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG1vcmVSZXN1bHRzID0gbmV3IEV2ZW50RW1pdHRlcjx7XHJcbiAgICByZXNlYXJjaDogUmVzZWFyY2g7XHJcbiAgICByZXN1bHRzOiBTZWFyY2hSZXN1bHRbXTtcclxuICB9PigpO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudHMgZW1pdHRlZCB3aGVuIGEgcmVzdWx0IGlzIGZvY3VzIG9yIHVuZm9jdXMgYnkgbW91c2UgZXZlbnRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgcmVzdWx0TW91c2VlbnRlciA9IG5ldyBFdmVudEVtaXR0ZXI8U2VhcmNoUmVzdWx0PigpO1xyXG4gIEBPdXRwdXQoKSByZXN1bHRNb3VzZWxlYXZlID0gbmV3IEV2ZW50RW1pdHRlcjxTZWFyY2hSZXN1bHQ+KCk7XHJcblxyXG4gIEBDb250ZW50Q2hpbGQoJ2lnb1NlYXJjaEl0ZW1Ub29sYmFyJykgdGVtcGxhdGVTZWFyY2hUb29sYmFyOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBnZXQgcmVzdWx0cyQoKTogT2JzZXJ2YWJsZTx7c291cmNlOiBTZWFyY2hTb3VyY2U7IHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdfVtdPiB7XHJcbiAgICBpZiAodGhpcy5fcmVzdWx0cyQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLl9yZXN1bHRzJCA9IHRoaXMubGlmdFJlc3VsdHMoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9yZXN1bHRzJDtcclxuICB9XHJcbiAgcHJpdmF0ZSBfcmVzdWx0cyQ6IE9ic2VydmFibGU8XHJcbiAgICB7c291cmNlOiBTZWFyY2hTb3VyY2U7IHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdfVtdXHJcbiAgPjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBCaW5kIHRoZSBzZWFyY2ggcmVzdWx0cyBzdG9yZSB0byB0aGUgd2F0Y2hlclxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy53YXRjaGVyID0gbmV3IEVudGl0eVN0b3JlV2F0Y2hlcih0aGlzLnN0b3JlLCB0aGlzLmNkUmVmKTtcclxuXHJcbiAgICB0aGlzLnNldHRpbmdzQ2hhbmdlJC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLnBhZ2VJdGVyYXRvciA9IFtdO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbmJpbmQgdGhlIHNlYXJjaCByZXN1bHRzIHN0b3JlIGZyb20gdGhlIHdhdGNoZXJcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMud2F0Y2hlci5kZXN0cm95KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb21wdXRlIGEgZ3JvdXAgdGl0bGVcclxuICAgKiBAcGFyYW0gZ3JvdXAgU2VhcmNoIHJlc3VsdHMgZ3JvdXBcclxuICAgKiBAcmV0dXJucyBHcm91cCB0aXRsZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGNvbXB1dGVHcm91cFRpdGxlKGdyb3VwOiB7c291cmNlOiBTZWFyY2hTb3VyY2U7IHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdfSk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBwYXJ0cyA9IFtncm91cC5zb3VyY2UudGl0bGVdO1xyXG4gICAgY29uc3QgY291bnQgPSBncm91cC5yZXN1bHRzLmxlbmd0aDtcclxuICAgIGlmIChjb3VudCA+IDEpIHtcclxuICAgICAgcGFydHMucHVzaChgKCR7Y291bnR9KWApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhcnRzLmpvaW4oJyAnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gYSByZXN1bHQgaXMgc2VsZWN0ZWQsIHVwZGF0ZSBpdCdzIHN0YXRlIGluIHRoZSBzdG9yZSBhbmQgZW1pdFxyXG4gICAqIGFuIGV2ZW50LiBBIHNlbGVjdGVkIHJlc3VsdCBpcyBhbHNvIGNvbnNpZGVyZWQgZm9jdXNlZFxyXG4gICAqIEBwYXJhbSByZXN1bHQgU2VhcmNoIHJlc3VsdFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uUmVzdWx0U2VsZWN0KHJlc3VsdDogU2VhcmNoUmVzdWx0KSB7XHJcbiAgICBpZiAodGhpcy5zdG9yZS5zdGF0ZS5nZXQocmVzdWx0KSkge1xyXG4gICAgICBpZiAodGhpcy5zdG9yZS5zdGF0ZS5nZXQocmVzdWx0KS5zZWxlY3RlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5zdG9yZS5zdGF0ZS51cGRhdGUocmVzdWx0LCB7Zm9jdXNlZDogdHJ1ZSwgc2VsZWN0ZWQ6IHRydWV9LCB0cnVlKTtcclxuICAgIHRoaXMucmVzdWx0U2VsZWN0LmVtaXQocmVzdWx0KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiBhbiBvYnNlcnZhYmxlIG9mIHRoZSBzZWFyY2ggcmVzdWx0cywgZ3JvdXBlZCBieSBzZWFyY2ggc291cmNlXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBncm91cGVkIHNlYXJjaCByZXN1bHRzXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBsaWZ0UmVzdWx0cygpOiBPYnNlcnZhYmxlPHtzb3VyY2U6IFNlYXJjaFNvdXJjZTsgcmVzdWx0czogU2VhcmNoUmVzdWx0W119W10+IHtcclxuICAgIHJldHVybiB0aGlzLnN0b3JlLnZpZXcuYWxsJCgpLnBpcGUoXHJcbiAgICAgIGRlYm91bmNlKChyZXN1bHRzOiBTZWFyY2hSZXN1bHRbXSkgPT4ge1xyXG4gICAgICAgIHJldHVybiByZXN1bHRzLmxlbmd0aCA9PT0gMCA/IEVNUFRZIDogdGltZXIoMjAwKTtcclxuICAgICAgfSksXHJcbiAgICAgIG1hcCgocmVzdWx0czogU2VhcmNoUmVzdWx0W10pID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ncm91cFJlc3VsdHMocmVzdWx0cy5zb3J0KHRoaXMuc29ydEJ5T3JkZXIpKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTb3J0IHRoZSByZXN1bHRzIGJ5IGRpc3BsYXkgb3JkZXIuXHJcbiAgICogQHBhcmFtIHIxIEZpcnN0IHJlc3VsdFxyXG4gICAqIEBwYXJhbSByMiBTZWNvbmQgcmVzdWx0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzb3J0QnlPcmRlcihyMTogU2VhcmNoUmVzdWx0LCByMjogU2VhcmNoUmVzdWx0KSB7XHJcbiAgICByZXR1cm4gcjEuc291cmNlLmRpc3BsYXlPcmRlciAtIHIyLnNvdXJjZS5kaXNwbGF5T3JkZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHcm91cCByZXN1bHRzIGJ5IHNlYXJjaCBzb3VyY2VcclxuICAgKiBAcGFyYW0gcmVzdWx0cyBTZWFyY2ggcmVzdWx0cyBmcm9tIGFsbCBzb3VyY2VzXHJcbiAgICogQHJldHVybnMgU2VhcmNoIHJlc3VsdHMgZ3JvdXBlZCBieSBzb3VyY2VcclxuICAgKi9cclxuICBwcml2YXRlIGdyb3VwUmVzdWx0cyhyZXN1bHRzOiBTZWFyY2hSZXN1bHRbXSk6IHtzb3VyY2U6IFNlYXJjaFNvdXJjZTsgcmVzdWx0czogU2VhcmNoUmVzdWx0W119W10ge1xyXG4gICAgY29uc3QgZ3JvdXBlZCA9IG5ldyBNYXA8U2VhcmNoU291cmNlLCBTZWFyY2hSZXN1bHRbXT4oKTtcclxuICAgIHJlc3VsdHMuZm9yRWFjaCgocmVzdWx0OiBTZWFyY2hSZXN1bHQpID0+IHtcclxuICAgICAgY29uc3Qgc291cmNlID0gcmVzdWx0LnNvdXJjZTtcclxuICAgICAgbGV0IHNvdXJjZVJlc3VsdHMgPSBncm91cGVkLmdldChzb3VyY2UpO1xyXG4gICAgICBpZiAoc291cmNlUmVzdWx0cyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgc291cmNlUmVzdWx0cyA9IFtdO1xyXG4gICAgICAgIGdyb3VwZWQuc2V0KHNvdXJjZSwgc291cmNlUmVzdWx0cyk7XHJcbiAgICAgIH1cclxuICAgICAgc291cmNlUmVzdWx0cy5wdXNoKHJlc3VsdCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbShncm91cGVkLmtleXMoKSkubWFwKChzb3VyY2U6IFNlYXJjaFNvdXJjZSkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5wYWdlSXRlcmF0b3Jbc291cmNlLmdldElkKCldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLnBhZ2VJdGVyYXRvcltzb3VyY2UuZ2V0SWQoKV0gPSAxO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB7c291cmNlLCByZXN1bHRzOiBncm91cGVkLmdldChzb3VyY2UpfTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaXNNb3JlUmVzdWx0cyhncm91cDoge3NvdXJjZTogU2VhcmNoU291cmNlOyByZXN1bHRzOiBTZWFyY2hSZXN1bHRbXX0pIHtcclxuICAgIHJldHVybiBncm91cC5yZXN1bHRzICYmIGdyb3VwLnJlc3VsdHNbZ3JvdXAucmVzdWx0cy5sZW5ndGggLSAxXS5tZXRhLm5leHRQYWdlID09PSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgZGlzcGxheU1vcmVSZXN1bHRzKGdyb3VwOiB7c291cmNlOiBTZWFyY2hTb3VyY2U7IHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdfSkge1xyXG4gICAgY29uc3Qgb3B0aW9uczogVGV4dFNlYXJjaE9wdGlvbnMgPSB7XHJcbiAgICAgIHNvdXJjZUlkOiBncm91cC5zb3VyY2UuZ2V0SWQoKSxcclxuICAgICAgcGFnZTogKyt0aGlzLnBhZ2VJdGVyYXRvcltncm91cC5zb3VyY2UuZ2V0SWQoKV1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcmVzZWFyY2hlcyA9IHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2godGhpcy50ZXJtLCBvcHRpb25zKTtcclxuICAgIHJlc2VhcmNoZXMubWFwKHJlc2VhcmNoID0+IHtcclxuICAgICAgcmVzZWFyY2gucmVxdWVzdC5zdWJzY3JpYmUoKHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV3UmVzdWx0cyA9IGdyb3VwLnJlc3VsdHMuY29uY2F0KHJlc3VsdHMpO1xyXG4gICAgICAgIGlmICghcmVzdWx0cy5sZW5ndGgpIHtcclxuICAgICAgICAgIG5ld1Jlc3VsdHNbbmV3UmVzdWx0cy5sZW5ndGggLSAxXS5tZXRhLm5leHRQYWdlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubW9yZVJlc3VsdHMuZW1pdCh7cmVzZWFyY2gsIHJlc3VsdHM6IG5ld1Jlc3VsdHN9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbn1cclxuIl19