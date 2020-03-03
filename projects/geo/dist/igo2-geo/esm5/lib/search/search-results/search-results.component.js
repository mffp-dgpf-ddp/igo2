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
var SearchResultMode = {
    Grouped: 'grouped',
    Flat: 'flat',
};
export { SearchResultMode };
/**
 * List of search results with focus and selection capabilities.
 * This component is dumb and only emits events.
 */
var SearchResultsComponent = /** @class */ (function () {
    function SearchResultsComponent(cdRef, searchService) {
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
    Object.defineProperty(SearchResultsComponent.prototype, "term", {
        /**
         * Search term
         */
        get: /**
         * Search term
         * @return {?}
         */
        function () {
            return this._term;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._term = value;
            this.pageIterator = [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchResultsComponent.prototype, "results$", {
        get: /**
         * @return {?}
         */
        function () {
            if (this._results$ === undefined) {
                this._results$ = this.liftResults();
            }
            return this._results$;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Bind the search results store to the watcher
     * @internal
     */
    /**
     * Bind the search results store to the watcher
     * \@internal
     * @return {?}
     */
    SearchResultsComponent.prototype.ngOnInit = /**
     * Bind the search results store to the watcher
     * \@internal
     * @return {?}
     */
    function () {
        var _this = this;
        this.watcher = new EntityStoreWatcher(this.store, this.cdRef);
        this.settingsChange$.subscribe((/**
         * @return {?}
         */
        function () {
            _this.pageIterator = [];
        }));
    };
    /**
     * Unbind the search results store from the watcher
     * @internal
     */
    /**
     * Unbind the search results store from the watcher
     * \@internal
     * @return {?}
     */
    SearchResultsComponent.prototype.ngOnDestroy = /**
     * Unbind the search results store from the watcher
     * \@internal
     * @return {?}
     */
    function () {
        this.watcher.destroy();
    };
    /**
     * When a result is focused, update it's state in the store and emit
     * an event.
     * @param result Search result
     * @internal
     */
    /**
     * When a result is focused, update it's state in the store and emit
     * an event.
     * \@internal
     * @param {?} result Search result
     * @return {?}
     */
    SearchResultsComponent.prototype.onResultFocus = /**
     * When a result is focused, update it's state in the store and emit
     * an event.
     * \@internal
     * @param {?} result Search result
     * @return {?}
     */
    function (result) {
        if (this.store.state.get(result)) {
            if (this.store.state.get(result).focused === true) {
                return;
            }
        }
        this.store.state.update(result, { focused: true }, true);
        this.resultFocus.emit(result);
    };
    /**
     * @param {?} result
     * @return {?}
     */
    SearchResultsComponent.prototype.onResultUnfocus = /**
     * @param {?} result
     * @return {?}
     */
    function (result) {
        this.resultUnfocus.emit(result);
    };
    /**
     * Compute a group title
     * @param group Search results group
     * @returns Group title
     * @internal
     */
    /**
     * Compute a group title
     * \@internal
     * @param {?} group Search results group
     * @return {?} Group title
     */
    SearchResultsComponent.prototype.computeGroupTitle = /**
     * Compute a group title
     * \@internal
     * @param {?} group Search results group
     * @return {?} Group title
     */
    function (group) {
        /** @type {?} */
        var parts = [group.source.title];
        /** @type {?} */
        var count = group.results.length;
        if (count > 1) {
            parts.push("(" + count + ")");
        }
        return parts.join(' ');
    };
    /**
     * When a result is selected, update it's state in the store and emit
     * an event. A selected result is also considered focused
     * @param result Search result
     * @internal
     */
    /**
     * When a result is selected, update it's state in the store and emit
     * an event. A selected result is also considered focused
     * \@internal
     * @param {?} result Search result
     * @return {?}
     */
    SearchResultsComponent.prototype.onResultSelect = /**
     * When a result is selected, update it's state in the store and emit
     * an event. A selected result is also considered focused
     * \@internal
     * @param {?} result Search result
     * @return {?}
     */
    function (result) {
        if (this.store.state.get(result)) {
            if (this.store.state.get(result).selected === true) {
                return;
            }
        }
        this.store.state.update(result, { focused: true, selected: true }, true);
        this.resultSelect.emit(result);
    };
    /**
     * Return an observable of the search results, grouped by search source
     * @returns Observable of grouped search results
     * @internal
     */
    /**
     * Return an observable of the search results, grouped by search source
     * \@internal
     * @private
     * @return {?} Observable of grouped search results
     */
    SearchResultsComponent.prototype.liftResults = /**
     * Return an observable of the search results, grouped by search source
     * \@internal
     * @private
     * @return {?} Observable of grouped search results
     */
    function () {
        var _this = this;
        return this.store.view.all$().pipe(debounce((/**
         * @param {?} results
         * @return {?}
         */
        function (results) {
            return results.length === 0 ? EMPTY : timer(200);
        })), map((/**
         * @param {?} results
         * @return {?}
         */
        function (results) {
            return _this.groupResults(results.sort(_this.sortByOrder));
        })));
    };
    /**
     * Sort the results by display order.
     * @param r1 First result
     * @param r2 Second result
     */
    /**
     * Sort the results by display order.
     * @private
     * @param {?} r1 First result
     * @param {?} r2 Second result
     * @return {?}
     */
    SearchResultsComponent.prototype.sortByOrder = /**
     * Sort the results by display order.
     * @private
     * @param {?} r1 First result
     * @param {?} r2 Second result
     * @return {?}
     */
    function (r1, r2) {
        return r1.source.displayOrder - r2.source.displayOrder;
    };
    /**
     * Group results by search source
     * @param results Search results from all sources
     * @returns Search results grouped by source
     */
    /**
     * Group results by search source
     * @private
     * @param {?} results Search results from all sources
     * @return {?} Search results grouped by source
     */
    SearchResultsComponent.prototype.groupResults = /**
     * Group results by search source
     * @private
     * @param {?} results Search results from all sources
     * @return {?} Search results grouped by source
     */
    function (results) {
        var _this = this;
        /** @type {?} */
        var grouped = new Map();
        results.forEach((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            /** @type {?} */
            var source = result.source;
            /** @type {?} */
            var sourceResults = grouped.get(source);
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
        function (source) {
            if (_this.pageIterator[source.getId()] === undefined) {
                _this.pageIterator[source.getId()] = 1;
            }
            return { source: source, results: grouped.get(source) };
        }));
    };
    /**
     * @param {?} group
     * @return {?}
     */
    SearchResultsComponent.prototype.isMoreResults = /**
     * @param {?} group
     * @return {?}
     */
    function (group) {
        return group.results && group.results[group.results.length - 1].meta.nextPage === true;
    };
    /**
     * @param {?} group
     * @return {?}
     */
    SearchResultsComponent.prototype.displayMoreResults = /**
     * @param {?} group
     * @return {?}
     */
    function (group) {
        var _this = this;
        /** @type {?} */
        var options = {
            sourceId: group.source.getId(),
            page: ++this.pageIterator[group.source.getId()]
        };
        /** @type {?} */
        var researches = this.searchService.search(this.term, options);
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
                /** @type {?} */
                var newResults = group.results.concat(results);
                if (!results.length) {
                    newResults[newResults.length - 1].meta.nextPage = false;
                }
                _this.moreResults.emit({ research: research, results: newResults });
            }));
        }));
        return;
    };
    SearchResultsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-search-results',
                    template: "<igo-list [navigation]=\"true\">\r\n  <ng-template\r\n    #groupTemplate\r\n    ngFor let-group\r\n    [ngForOf]=\"results$ | async\">\r\n\r\n    <igo-collapsible\r\n      *ngIf=\"mode === searchResultMode.Grouped; else flatTemplate\"\r\n      [title]=\"computeGroupTitle(group)\"\r\n      [collapsed]=\"collapsed[group.source.title]\"\r\n      (toggle)=\"collapsed[group.source.title] = $event\">\r\n      <ng-container *ngTemplateOutlet=\"storeItemTemplate; context: {results: group.results}\"></ng-container>\r\n    </igo-collapsible>\r\n\r\n    <ng-template #flatTemplate>\r\n      <ng-container *ngTemplateOutlet=\"storeItemTemplate; context: {results: group.results}\"></ng-container>\r\n    </ng-template>\r\n\r\n    <ng-template #storeItemTemplate let-results=\"results\">\r\n      <ng-template ngFor let-result [ngForOf]=\"results\">\r\n        <igo-search-results-item\r\n          igoListItem\r\n          color=\"accent\"\r\n          [map]=\"map\"\r\n          [result]=\"result\"\r\n          [showIcons]=\"showIcons\"\r\n          [withZoomButton]=\"withZoomButton\"\r\n          [focused]=\"store.state.get(result).focused\"\r\n          [selected]=\"store.state.get(result).selected\"\r\n          (focus)=\"onResultFocus(result)\"\r\n          (unfocus)=\"onResultUnfocus(result)\"\r\n          (select)=\"onResultSelect(result)\"\r\n          (mouseenter)=\"resultMouseenter.emit(result)\"\r\n          (mouseleave)=\"resultMouseleave.emit(result)\">\r\n\r\n          <ng-container igoSearchItemToolbar\r\n            [ngTemplateOutlet]=\"templateSearchToolbar\"\r\n            [ngTemplateOutletContext]=\"{result: result}\">\r\n          </ng-container>\r\n\r\n        </igo-search-results-item>\r\n      </ng-template>\r\n      <span class=\"moreResults mat-typography\" *ngIf=\"isMoreResults(group)\" (click)=\"displayMoreResults(group)\">\r\n        <u>{{ 'igo.geo.search.displayMoreResults' | translate }}</u>\r\n      </span>\r\n    </ng-template>\r\n\r\n  </ng-template>\r\n\r\n</igo-list>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".moreResults{cursor:pointer;color:#00f;float:right;margin-right:10px;margin-top:5px}"]
                }] }
    ];
    /** @nocollapse */
    SearchResultsComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: SearchService }
    ]; };
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
    return SearchResultsComponent;
}());
export { SearchResultsComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zZWFyY2gtcmVzdWx0cy9zZWFyY2gtcmVzdWx0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osWUFBWSxFQUNaLHVCQUF1QixFQUN2QixpQkFBaUIsRUFFakIsV0FBVyxFQUVaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBYyxLQUFLLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFL0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUduQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7OztJQUt2RCxTQUFVLFNBQVM7SUFDbkIsTUFBTyxNQUFNOzs7Ozs7O0FBT2Y7SUFvR0UsZ0NBQW9CLEtBQXdCLEVBQ3hCLGFBQTRCO1FBRDVCLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ3hCLGtCQUFhLEdBQWIsYUFBYSxDQUFlOzs7OztRQTFGekMscUJBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFPcEMsaUJBQVksR0FBeUIsRUFBRSxDQUFDO1FBRXhDLGNBQVMsR0FBeUIsRUFBRSxDQUFDOzs7O1FBaUJuQyxTQUFJLEdBQXFCLGdCQUFnQixDQUFDLE9BQU8sQ0FBQzs7OztRQUtsRCxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQWV2QixvQkFBZSxHQUFHLElBQUksZUFBZSxDQUFVLFNBQVMsQ0FBQyxDQUFDOzs7O1FBS3pELGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQWdCLENBQUM7Ozs7UUFLL0Msa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBZ0IsQ0FBQzs7OztRQUtqRCxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFnQixDQUFDOzs7O1FBS2hELGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBR3BDLENBQUM7Ozs7UUFLSyxxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFBZ0IsQ0FBQztRQUNwRCxxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFBZ0IsQ0FBQztJQWVYLENBQUM7SUF0RHBELHNCQUNJLHdDQUFJO1FBSlI7O1dBRUc7Ozs7O1FBQ0g7WUFFRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDcEIsQ0FBQzs7Ozs7UUFDRCxVQUFTLEtBQWE7WUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDekIsQ0FBQzs7O09BSkE7SUF3Q0Qsc0JBQUksNENBQVE7Ozs7UUFBWjtZQUNFLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3JDO1lBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hCLENBQUM7OztPQUFBO0lBUUQ7OztPQUdHOzs7Ozs7SUFDSCx5Q0FBUTs7Ozs7SUFBUjtRQUFBLGlCQU1DO1FBTEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTlELElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUzs7O1FBQUM7WUFDN0IsS0FBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDekIsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCw0Q0FBVzs7Ozs7SUFBWDtRQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7OztPQUtHOzs7Ozs7OztJQUNILDhDQUFhOzs7Ozs7O0lBQWIsVUFBYyxNQUFvQjtRQUNoQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNoQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUFFO2dCQUNqRCxPQUFPO2FBQ1I7U0FDRjtRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7Ozs7SUFFRCxnREFBZTs7OztJQUFmLFVBQWdCLE1BQW9CO1FBQ2xDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7Ozs7T0FLRzs7Ozs7OztJQUNILGtEQUFpQjs7Ozs7O0lBQWpCLFVBQWtCLEtBQXNEOztZQUNoRSxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzs7WUFDNUIsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTTtRQUNsQyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDYixLQUFLLENBQUMsSUFBSSxDQUFDLE1BQUksS0FBSyxNQUFHLENBQUMsQ0FBQztTQUMxQjtRQUNELE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7O0lBQ0gsK0NBQWM7Ozs7Ozs7SUFBZCxVQUFlLE1BQW9CO1FBQ2pDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2hDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQUU7Z0JBQ2xELE9BQU87YUFDUjtTQUNGO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0ssNENBQVc7Ozs7OztJQUFuQjtRQUFBLGlCQVNDO1FBUkMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQ2hDLFFBQVE7Ozs7UUFBQyxVQUFDLE9BQXVCO1lBQy9CLE9BQU8sT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25ELENBQUMsRUFBQyxFQUNGLEdBQUc7Ozs7UUFBQyxVQUFDLE9BQXVCO1lBQzFCLE9BQU8sS0FBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQzNELENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7Ozs7SUFDSyw0Q0FBVzs7Ozs7OztJQUFuQixVQUFvQixFQUFnQixFQUFFLEVBQWdCO1FBQ3BELE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7SUFDekQsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSyw2Q0FBWTs7Ozs7O0lBQXBCLFVBQXFCLE9BQXVCO1FBQTVDLGlCQWtCQzs7WUFqQk8sT0FBTyxHQUFHLElBQUksR0FBRyxFQUFnQztRQUN2RCxPQUFPLENBQUMsT0FBTzs7OztRQUFDLFVBQUMsTUFBb0I7O2dCQUM3QixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU07O2dCQUN4QixhQUFhLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7WUFDdkMsSUFBSSxhQUFhLEtBQUssU0FBUyxFQUFFO2dCQUMvQixhQUFhLEdBQUcsRUFBRSxDQUFDO2dCQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQzthQUNwQztZQUNELGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxFQUFDLENBQUM7UUFFSCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRzs7OztRQUFDLFVBQUMsTUFBb0I7WUFDekQsSUFBSSxLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLFNBQVMsRUFBRTtnQkFDbkQsS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdkM7WUFDRCxPQUFPLEVBQUMsTUFBTSxRQUFBLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQztRQUNoRCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRUQsOENBQWE7Ozs7SUFBYixVQUFjLEtBQXNEO1FBQ2xFLE9BQU8sS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDO0lBQ3pGLENBQUM7Ozs7O0lBRUQsbURBQWtCOzs7O0lBQWxCLFVBQW1CLEtBQXNEO1FBQXpFLGlCQWlCQzs7WUFoQk8sT0FBTyxHQUFzQjtZQUNqQyxRQUFRLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDOUIsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2hEOztZQUVLLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQztRQUNoRSxVQUFVLENBQUMsR0FBRzs7OztRQUFDLFVBQUEsUUFBUTtZQUNyQixRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVM7Ozs7WUFBQyxVQUFDLE9BQXVCOztvQkFDM0MsVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztnQkFDaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7b0JBQ25CLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2lCQUN6RDtnQkFDRCxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFDLFFBQVEsVUFBQSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDO1lBQ3pELENBQUMsRUFBQyxDQUFDO1FBQ0wsQ0FBQyxFQUFDLENBQUM7UUFDSCxPQUFPO0lBQ1QsQ0FBQzs7Z0JBclBGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QiwrK0RBQThDO29CQUU5QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQWhDQyxpQkFBaUI7Z0JBY1YsYUFBYTs7O3NCQW1DbkIsS0FBSzt3QkFLTCxLQUFLOzRCQUtMLEtBQUs7dUJBS0wsS0FBSztpQ0FLTCxLQUFLO3VCQUtMLEtBQUs7a0NBVUwsS0FBSzs4QkFLTCxNQUFNO2dDQUtOLE1BQU07K0JBS04sTUFBTTs4QkFLTixNQUFNO21DQVFOLE1BQU07bUNBQ04sTUFBTTt3Q0FFTixZQUFZLFNBQUMsc0JBQXNCOztJQThKdEMsNkJBQUM7Q0FBQSxBQXRQRCxJQXNQQztTQWhQWSxzQkFBc0I7Ozs7Ozs7SUFLakMsa0RBQTJDOzs7Ozs7SUFLM0MseUNBQWtEOztJQUVsRCw4Q0FBK0M7O0lBRS9DLDJDQUE0Qzs7SUFFNUMscUNBQXFCOzs7OztJQUtyQix1Q0FBMEM7Ozs7O0lBSzFDLDJDQUE0Qjs7Ozs7SUFLNUIsc0NBQTJEOzs7OztJQUszRCxnREFBZ0M7O0lBYWhDLHVDQUFxQjs7SUFFckIsaURBQW1FOzs7OztJQUtuRSw2Q0FBeUQ7Ozs7O0lBS3pELCtDQUEyRDs7Ozs7SUFLM0QsOENBQTBEOzs7OztJQUsxRCw2Q0FHSzs7Ozs7SUFLTCxrREFBOEQ7O0lBQzlELGtEQUE4RDs7SUFFOUQsdURBQThFOzs7OztJQVE5RSwyQ0FFRTs7Ozs7SUFFVSx1Q0FBZ0M7Ozs7O0lBQ2hDLCtDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgQ29udGVudENoaWxkLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIE9uSW5pdCxcclxuICBUZW1wbGF0ZVJlZixcclxuICBPbkRlc3Ryb3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUsIEVNUFRZLCB0aW1lciwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBFbnRpdHlTdG9yZSwgRW50aXR5U3RvcmVXYXRjaGVyIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcCc7XHJcblxyXG5pbXBvcnQgeyBUZXh0U2VhcmNoT3B0aW9ucyB9IGZyb20gJy4uL3NoYXJlZC9zb3VyY2VzL3NvdXJjZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgU2VhcmNoU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZWFyY2guc2VydmljZSc7XHJcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCwgUmVzZWFyY2ggfSBmcm9tICcuLi9zaGFyZWQvc2VhcmNoLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2UgfSBmcm9tICcuLi9zaGFyZWQvc291cmNlcy9zb3VyY2UnO1xyXG5cclxuZXhwb3J0IGVudW0gU2VhcmNoUmVzdWx0TW9kZSB7XHJcbiAgR3JvdXBlZCA9ICdncm91cGVkJyxcclxuICBGbGF0ID0gJ2ZsYXQnXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMaXN0IG9mIHNlYXJjaCByZXN1bHRzIHdpdGggZm9jdXMgYW5kIHNlbGVjdGlvbiBjYXBhYmlsaXRpZXMuXHJcbiAqIFRoaXMgY29tcG9uZW50IGlzIGR1bWIgYW5kIG9ubHkgZW1pdHMgZXZlbnRzLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tc2VhcmNoLXJlc3VsdHMnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWFyY2gtcmVzdWx0cy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc2VhcmNoLXJlc3VsdHMuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VhcmNoUmVzdWx0c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAvKipcclxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIFNlYXJjaFJlc3VsdE1vZGUgZW51bVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZWFyY2hSZXN1bHRNb2RlID0gU2VhcmNoUmVzdWx0TW9kZTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHJlc3VsdHMgc3RvcmUgd2F0Y2hlclxyXG4gICAqL1xyXG4gIHByaXZhdGUgd2F0Y2hlcjogRW50aXR5U3RvcmVXYXRjaGVyPFNlYXJjaFJlc3VsdD47XHJcblxyXG4gIHB1YmxpYyBwYWdlSXRlcmF0b3I6IHtzb3VyY2VJZDogc3RyaW5nfVtdID0gW107XHJcblxyXG4gIHB1YmxpYyBjb2xsYXBzZWQ6IHtzb3VyY2VJZDogc3RyaW5nfVtdID0gW107XHJcblxyXG4gIEBJbnB1dCgpIG1hcDogSWdvTWFwO1xyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggcmVzdWx0cyBzdG9yZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0b3JlOiBFbnRpdHlTdG9yZTxTZWFyY2hSZXN1bHQ+O1xyXG5cclxuICAvKipcclxuICAgKiB0byBzaG93IGhpZGUgcmVzdWx0cyBpY29uc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNob3dJY29uczogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHJlc3VsdHMgZGlzcGxheSBtb2RlXHJcbiAgICovXHJcbiAgQElucHV0KCkgbW9kZTogU2VhcmNoUmVzdWx0TW9kZSA9IFNlYXJjaFJlc3VsdE1vZGUuR3JvdXBlZDtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGVyZSBzaG91bGQgYmUgYSB6b29tIGJ1dHRvblxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHdpdGhab29tQnV0dG9uID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCB0ZXJtXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBnZXQgdGVybSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Rlcm07XHJcbiAgfVxyXG4gIHNldCB0ZXJtKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX3Rlcm0gPSB2YWx1ZTtcclxuICAgIHRoaXMucGFnZUl0ZXJhdG9yID0gW107XHJcbiAgfVxyXG4gIHB1YmxpYyBfdGVybTogc3RyaW5nO1xyXG5cclxuICBASW5wdXQoKSBzZXR0aW5nc0NoYW5nZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHVuZGVmaW5lZCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiBhIHJlc3VsdCBpcyBmb2N1c2VkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHJlc3VsdEZvY3VzID0gbmV3IEV2ZW50RW1pdHRlcjxTZWFyY2hSZXN1bHQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiBhIHJlc3VsdCBpcyB1bmZvY3VzZWRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgcmVzdWx0VW5mb2N1cyA9IG5ldyBFdmVudEVtaXR0ZXI8U2VhcmNoUmVzdWx0PigpO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gYSByZXN1bHQgaXMgc2VsZWN0ZWRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgcmVzdWx0U2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxTZWFyY2hSZXN1bHQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiBhIHJlc2VhcmNoIGlzIGNvbXBsZXRlZCBhZnRlciBkaXNwbGF5aW5nIG1vcmUgcmVzdWx0cyBpcyBjbGlja2VkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG1vcmVSZXN1bHRzID0gbmV3IEV2ZW50RW1pdHRlcjx7XHJcbiAgICByZXNlYXJjaDogUmVzZWFyY2g7XHJcbiAgICByZXN1bHRzOiBTZWFyY2hSZXN1bHRbXTtcclxuICB9PigpO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudHMgZW1pdHRlZCB3aGVuIGEgcmVzdWx0IGlzIGZvY3VzIG9yIHVuZm9jdXMgYnkgbW91c2UgZXZlbnRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgcmVzdWx0TW91c2VlbnRlciA9IG5ldyBFdmVudEVtaXR0ZXI8U2VhcmNoUmVzdWx0PigpO1xyXG4gIEBPdXRwdXQoKSByZXN1bHRNb3VzZWxlYXZlID0gbmV3IEV2ZW50RW1pdHRlcjxTZWFyY2hSZXN1bHQ+KCk7XHJcblxyXG4gIEBDb250ZW50Q2hpbGQoJ2lnb1NlYXJjaEl0ZW1Ub29sYmFyJykgdGVtcGxhdGVTZWFyY2hUb29sYmFyOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBnZXQgcmVzdWx0cyQoKTogT2JzZXJ2YWJsZTx7c291cmNlOiBTZWFyY2hTb3VyY2U7IHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdfVtdPiB7XHJcbiAgICBpZiAodGhpcy5fcmVzdWx0cyQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLl9yZXN1bHRzJCA9IHRoaXMubGlmdFJlc3VsdHMoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9yZXN1bHRzJDtcclxuICB9XHJcbiAgcHJpdmF0ZSBfcmVzdWx0cyQ6IE9ic2VydmFibGU8XHJcbiAgICB7c291cmNlOiBTZWFyY2hTb3VyY2U7IHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdfVtdXHJcbiAgPjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBCaW5kIHRoZSBzZWFyY2ggcmVzdWx0cyBzdG9yZSB0byB0aGUgd2F0Y2hlclxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy53YXRjaGVyID0gbmV3IEVudGl0eVN0b3JlV2F0Y2hlcih0aGlzLnN0b3JlLCB0aGlzLmNkUmVmKTtcclxuXHJcbiAgICB0aGlzLnNldHRpbmdzQ2hhbmdlJC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLnBhZ2VJdGVyYXRvciA9IFtdO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbmJpbmQgdGhlIHNlYXJjaCByZXN1bHRzIHN0b3JlIGZyb20gdGhlIHdhdGNoZXJcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMud2F0Y2hlci5kZXN0cm95KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGEgcmVzdWx0IGlzIGZvY3VzZWQsIHVwZGF0ZSBpdCdzIHN0YXRlIGluIHRoZSBzdG9yZSBhbmQgZW1pdFxyXG4gICAqIGFuIGV2ZW50LlxyXG4gICAqIEBwYXJhbSByZXN1bHQgU2VhcmNoIHJlc3VsdFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uUmVzdWx0Rm9jdXMocmVzdWx0OiBTZWFyY2hSZXN1bHQpIHtcclxuICAgIGlmICh0aGlzLnN0b3JlLnN0YXRlLmdldChyZXN1bHQpKSB7XHJcbiAgICAgIGlmICh0aGlzLnN0b3JlLnN0YXRlLmdldChyZXN1bHQpLmZvY3VzZWQgPT09IHRydWUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuc3RvcmUuc3RhdGUudXBkYXRlKHJlc3VsdCwge2ZvY3VzZWQ6IHRydWV9LCB0cnVlKTtcclxuICAgIHRoaXMucmVzdWx0Rm9jdXMuZW1pdChyZXN1bHQpO1xyXG4gIH1cclxuXHJcbiAgb25SZXN1bHRVbmZvY3VzKHJlc3VsdDogU2VhcmNoUmVzdWx0KSB7XHJcbiAgICB0aGlzLnJlc3VsdFVuZm9jdXMuZW1pdChyZXN1bHQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29tcHV0ZSBhIGdyb3VwIHRpdGxlXHJcbiAgICogQHBhcmFtIGdyb3VwIFNlYXJjaCByZXN1bHRzIGdyb3VwXHJcbiAgICogQHJldHVybnMgR3JvdXAgdGl0bGVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBjb21wdXRlR3JvdXBUaXRsZShncm91cDoge3NvdXJjZTogU2VhcmNoU291cmNlOyByZXN1bHRzOiBTZWFyY2hSZXN1bHRbXX0pOiBzdHJpbmcge1xyXG4gICAgY29uc3QgcGFydHMgPSBbZ3JvdXAuc291cmNlLnRpdGxlXTtcclxuICAgIGNvbnN0IGNvdW50ID0gZ3JvdXAucmVzdWx0cy5sZW5ndGg7XHJcbiAgICBpZiAoY291bnQgPiAxKSB7XHJcbiAgICAgIHBhcnRzLnB1c2goYCgke2NvdW50fSlgKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXJ0cy5qb2luKCcgJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGEgcmVzdWx0IGlzIHNlbGVjdGVkLCB1cGRhdGUgaXQncyBzdGF0ZSBpbiB0aGUgc3RvcmUgYW5kIGVtaXRcclxuICAgKiBhbiBldmVudC4gQSBzZWxlY3RlZCByZXN1bHQgaXMgYWxzbyBjb25zaWRlcmVkIGZvY3VzZWRcclxuICAgKiBAcGFyYW0gcmVzdWx0IFNlYXJjaCByZXN1bHRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvblJlc3VsdFNlbGVjdChyZXN1bHQ6IFNlYXJjaFJlc3VsdCkge1xyXG4gICAgaWYgKHRoaXMuc3RvcmUuc3RhdGUuZ2V0KHJlc3VsdCkpIHtcclxuICAgICAgaWYgKHRoaXMuc3RvcmUuc3RhdGUuZ2V0KHJlc3VsdCkuc2VsZWN0ZWQgPT09IHRydWUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuc3RvcmUuc3RhdGUudXBkYXRlKHJlc3VsdCwge2ZvY3VzZWQ6IHRydWUsIHNlbGVjdGVkOiB0cnVlfSwgdHJ1ZSk7XHJcbiAgICB0aGlzLnJlc3VsdFNlbGVjdC5lbWl0KHJlc3VsdCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gYW4gb2JzZXJ2YWJsZSBvZiB0aGUgc2VhcmNoIHJlc3VsdHMsIGdyb3VwZWQgYnkgc2VhcmNoIHNvdXJjZVxyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgZ3JvdXBlZCBzZWFyY2ggcmVzdWx0c1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgbGlmdFJlc3VsdHMoKTogT2JzZXJ2YWJsZTx7c291cmNlOiBTZWFyY2hTb3VyY2U7IHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdfVtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5zdG9yZS52aWV3LmFsbCQoKS5waXBlKFxyXG4gICAgICBkZWJvdW5jZSgocmVzdWx0czogU2VhcmNoUmVzdWx0W10pID0+IHtcclxuICAgICAgICByZXR1cm4gcmVzdWx0cy5sZW5ndGggPT09IDAgPyBFTVBUWSA6IHRpbWVyKDIwMCk7XHJcbiAgICAgIH0pLFxyXG4gICAgICBtYXAoKHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ3JvdXBSZXN1bHRzKHJlc3VsdHMuc29ydCh0aGlzLnNvcnRCeU9yZGVyKSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU29ydCB0aGUgcmVzdWx0cyBieSBkaXNwbGF5IG9yZGVyLlxyXG4gICAqIEBwYXJhbSByMSBGaXJzdCByZXN1bHRcclxuICAgKiBAcGFyYW0gcjIgU2Vjb25kIHJlc3VsdFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc29ydEJ5T3JkZXIocjE6IFNlYXJjaFJlc3VsdCwgcjI6IFNlYXJjaFJlc3VsdCkge1xyXG4gICAgcmV0dXJuIHIxLnNvdXJjZS5kaXNwbGF5T3JkZXIgLSByMi5zb3VyY2UuZGlzcGxheU9yZGVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR3JvdXAgcmVzdWx0cyBieSBzZWFyY2ggc291cmNlXHJcbiAgICogQHBhcmFtIHJlc3VsdHMgU2VhcmNoIHJlc3VsdHMgZnJvbSBhbGwgc291cmNlc1xyXG4gICAqIEByZXR1cm5zIFNlYXJjaCByZXN1bHRzIGdyb3VwZWQgYnkgc291cmNlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBncm91cFJlc3VsdHMocmVzdWx0czogU2VhcmNoUmVzdWx0W10pOiB7c291cmNlOiBTZWFyY2hTb3VyY2U7IHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdfVtdIHtcclxuICAgIGNvbnN0IGdyb3VwZWQgPSBuZXcgTWFwPFNlYXJjaFNvdXJjZSwgU2VhcmNoUmVzdWx0W10+KCk7XHJcbiAgICByZXN1bHRzLmZvckVhY2goKHJlc3VsdDogU2VhcmNoUmVzdWx0KSA9PiB7XHJcbiAgICAgIGNvbnN0IHNvdXJjZSA9IHJlc3VsdC5zb3VyY2U7XHJcbiAgICAgIGxldCBzb3VyY2VSZXN1bHRzID0gZ3JvdXBlZC5nZXQoc291cmNlKTtcclxuICAgICAgaWYgKHNvdXJjZVJlc3VsdHMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHNvdXJjZVJlc3VsdHMgPSBbXTtcclxuICAgICAgICBncm91cGVkLnNldChzb3VyY2UsIHNvdXJjZVJlc3VsdHMpO1xyXG4gICAgICB9XHJcbiAgICAgIHNvdXJjZVJlc3VsdHMucHVzaChyZXN1bHQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIEFycmF5LmZyb20oZ3JvdXBlZC5rZXlzKCkpLm1hcCgoc291cmNlOiBTZWFyY2hTb3VyY2UpID0+IHtcclxuICAgICAgaWYgKHRoaXMucGFnZUl0ZXJhdG9yW3NvdXJjZS5nZXRJZCgpXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlSXRlcmF0b3Jbc291cmNlLmdldElkKCldID0gMTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4ge3NvdXJjZSwgcmVzdWx0czogZ3JvdXBlZC5nZXQoc291cmNlKX07XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGlzTW9yZVJlc3VsdHMoZ3JvdXA6IHtzb3VyY2U6IFNlYXJjaFNvdXJjZTsgcmVzdWx0czogU2VhcmNoUmVzdWx0W119KSB7XHJcbiAgICByZXR1cm4gZ3JvdXAucmVzdWx0cyAmJiBncm91cC5yZXN1bHRzW2dyb3VwLnJlc3VsdHMubGVuZ3RoIC0gMV0ubWV0YS5uZXh0UGFnZSA9PT0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGRpc3BsYXlNb3JlUmVzdWx0cyhncm91cDoge3NvdXJjZTogU2VhcmNoU291cmNlOyByZXN1bHRzOiBTZWFyY2hSZXN1bHRbXX0pIHtcclxuICAgIGNvbnN0IG9wdGlvbnM6IFRleHRTZWFyY2hPcHRpb25zID0ge1xyXG4gICAgICBzb3VyY2VJZDogZ3JvdXAuc291cmNlLmdldElkKCksXHJcbiAgICAgIHBhZ2U6ICsrdGhpcy5wYWdlSXRlcmF0b3JbZ3JvdXAuc291cmNlLmdldElkKCldXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJlc2VhcmNoZXMgPSB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoKHRoaXMudGVybSwgb3B0aW9ucyk7XHJcbiAgICByZXNlYXJjaGVzLm1hcChyZXNlYXJjaCA9PiB7XHJcbiAgICAgIHJlc2VhcmNoLnJlcXVlc3Quc3Vic2NyaWJlKChyZXN1bHRzOiBTZWFyY2hSZXN1bHRbXSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5ld1Jlc3VsdHMgPSBncm91cC5yZXN1bHRzLmNvbmNhdChyZXN1bHRzKTtcclxuICAgICAgICBpZiAoIXJlc3VsdHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICBuZXdSZXN1bHRzW25ld1Jlc3VsdHMubGVuZ3RoIC0gMV0ubWV0YS5uZXh0UGFnZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1vcmVSZXN1bHRzLmVtaXQoe3Jlc2VhcmNoLCByZXN1bHRzOiBuZXdSZXN1bHRzfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG59XHJcbiJdfQ==