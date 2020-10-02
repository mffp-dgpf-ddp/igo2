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
                    template: "<igo-list [navigation]=\"true\">\r\n  <ng-template\r\n    #groupTemplate\r\n    ngFor let-group\r\n    [ngForOf]=\"results$ | async\">\r\n\r\n    <igo-collapsible [class]=\"group.source.getId()\"\r\n      *ngIf=\"mode === searchResultMode.Grouped; else flatTemplate\"\r\n      [title]=\"computeGroupTitle(group)\"\r\n      [collapsed]=\"collapsed[group.source.title]\"\r\n      (toggle)=\"collapsed[group.source.title] = $event\">\r\n      <ng-container *ngTemplateOutlet=\"storeItemTemplate; context: {results: group.results}\"></ng-container>\r\n    </igo-collapsible>\r\n\r\n    <ng-template #flatTemplate>\r\n      <ng-container *ngTemplateOutlet=\"storeItemTemplate; context: {results: group.results}\"></ng-container>\r\n    </ng-template>\r\n\r\n    <ng-template #storeItemTemplate let-results=\"results\">\r\n      <ng-template ngFor let-result [ngForOf]=\"results\">\r\n        <igo-search-results-item\r\n          igoListItem\r\n          color=\"accent\"\r\n          [map]=\"map\"\r\n          [result]=\"result\"\r\n          [showIcons]=\"showIcons\"\r\n          [withZoomButton]=\"withZoomButton\"\r\n          [focused]=\"store.state.get(result).focused\"\r\n          [selected]=\"store.state.get(result).selected\"\r\n          (focus)=\"resultFocus.emit(result)\"\r\n          (unfocus)=\"resultUnfocus.emit(result)\"\r\n          (select)=\"onResultSelect(result)\"\r\n          (mouseenter)=\"resultFocus.emit(result)\"\r\n          (mouseleave)=\"resultUnfocus.emit(result)\">\r\n\r\n          <ng-container igoSearchItemToolbar\r\n            [ngTemplateOutlet]=\"templateSearchToolbar\"\r\n            [ngTemplateOutletContext]=\"{result: result}\">\r\n          </ng-container>\r\n\r\n        </igo-search-results-item>\r\n      </ng-template>\r\n      <span class=\"moreResults mat-typography\" *ngIf=\"isMoreResults(group)\" (click)=\"displayMoreResults(group)\">\r\n        <u>{{ 'igo.geo.search.displayMoreResults' | translate }}</u>\r\n      </span>\r\n    </ng-template>\r\n\r\n  </ng-template>\r\n\r\n</igo-list>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".moreResults{cursor:pointer;color:#00f;float:right;margin-right:10px;margin-top:5px}igo-list ::ng-deep mat-list{height:100%}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zZWFyY2gtcmVzdWx0cy9zZWFyY2gtcmVzdWx0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osWUFBWSxFQUNaLHVCQUF1QixFQUN2QixpQkFBaUIsRUFFakIsV0FBVyxFQUVaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBYyxLQUFLLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFL0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUduQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7OztJQUt2RCxTQUFVLFNBQVM7SUFDbkIsTUFBTyxNQUFNOzs7Ozs7O0FBT2Y7SUFvR0UsZ0NBQW9CLEtBQXdCLEVBQ3hCLGFBQTRCO1FBRDVCLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ3hCLGtCQUFhLEdBQWIsYUFBYSxDQUFlOzs7OztRQTFGekMscUJBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFPcEMsaUJBQVksR0FBeUIsRUFBRSxDQUFDO1FBRXhDLGNBQVMsR0FBeUIsRUFBRSxDQUFDOzs7O1FBaUJuQyxTQUFJLEdBQXFCLGdCQUFnQixDQUFDLE9BQU8sQ0FBQzs7OztRQUtsRCxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQWV2QixvQkFBZSxHQUFHLElBQUksZUFBZSxDQUFVLFNBQVMsQ0FBQyxDQUFDOzs7O1FBS3pELGdCQUFXLEdB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SW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBDb250ZW50Q2hpbGQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgT25Jbml0LFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIE9uRGVzdHJveVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgRU1QVFksIHRpbWVyLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGVib3VuY2UsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IEVudGl0eVN0b3JlLCBFbnRpdHlTdG9yZVdhdGNoZXIgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuXHJcbmltcG9ydCB7IFRleHRTZWFyY2hPcHRpb25zIH0gZnJvbSAnLi4vc2hhcmVkL3NvdXJjZXMvc291cmNlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlYXJjaC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0LCBSZXNlYXJjaCB9IGZyb20gJy4uL3NoYXJlZC9zZWFyY2guaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZSB9IGZyb20gJy4uL3NoYXJlZC9zb3VyY2VzL3NvdXJjZSc7XHJcblxyXG5leHBvcnQgZW51bSBTZWFyY2hSZXN1bHRNb2RlIHtcclxuICBHcm91cGVkID0gJ2dyb3VwZWQnLFxyXG4gIEZsYXQgPSAnZmxhdCdcclxufVxyXG5cclxuLyoqXHJcbiAqIExpc3Qgb2Ygc2VhcmNoIHJlc3VsdHMgd2l0aCBmb2N1cyBhbmQgc2VsZWN0aW9uIGNhcGFiaWxpdGllcy5cclxuICogVGhpcyBjb21wb25lbnQgaXMgZHVtYiBhbmQgb25seSBlbWl0cyBldmVudHMuXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1zZWFyY2gtcmVzdWx0cycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NlYXJjaC1yZXN1bHRzLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zZWFyY2gtcmVzdWx0cy5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hSZXN1bHRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIFJlZmVyZW5jZSB0byB0aGUgU2VhcmNoUmVzdWx0TW9kZSBlbnVtXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHVibGljIHNlYXJjaFJlc3VsdE1vZGUgPSBTZWFyY2hSZXN1bHRNb2RlO1xyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggcmVzdWx0cyBzdG9yZSB3YXRjaGVyXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB3YXRjaGVyOiBFbnRpdHlTdG9yZVdhdGNoZXI8U2VhcmNoUmVzdWx0PjtcclxuXHJcbiAgcHVibGljIHBhZ2VJdGVyYXRvcjoge3NvdXJjZUlkOiBzdHJpbmd9W10gPSBbXTtcclxuXHJcbiAgcHVibGljIGNvbGxhcHNlZDoge3NvdXJjZUlkOiBzdHJpbmd9W10gPSBbXTtcclxuXHJcbiAgQElucHV0KCkgbWFwOiBJZ29NYXA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCByZXN1bHRzIHN0b3JlXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3RvcmU6IEVudGl0eVN0b3JlPFNlYXJjaFJlc3VsdD47XHJcblxyXG4gIC8qKlxyXG4gICAqIHRvIHNob3cgaGlkZSByZXN1bHRzIGljb25zXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2hvd0ljb25zOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggcmVzdWx0cyBkaXNwbGF5IG1vZGVcclxuICAgKi9cclxuICBASW5wdXQoKSBtb2RlOiBTZWFyY2hSZXN1bHRNb2RlID0gU2VhcmNoUmVzdWx0TW9kZS5Hcm91cGVkO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoZXJlIHNob3VsZCBiZSBhIHpvb20gYnV0dG9uXHJcbiAgICovXHJcbiAgQElucHV0KCkgd2l0aFpvb21CdXR0b24gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHRlcm1cclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCB0ZXJtKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fdGVybTtcclxuICB9XHJcbiAgc2V0IHRlcm0odmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5fdGVybSA9IHZhbHVlO1xyXG4gICAgdGhpcy5wYWdlSXRlcmF0b3IgPSBbXTtcclxuICB9XHJcbiAgcHVibGljIF90ZXJtOiBzdHJpbmc7XHJcblxyXG4gIEBJbnB1dCgpIHNldHRpbmdzQ2hhbmdlJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odW5kZWZpbmVkKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIGEgcmVzdWx0IGlzIGZvY3VzZWRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgcmVzdWx0Rm9jdXMgPSBuZXcgRXZlbnRFbWl0dGVyPFNlYXJjaFJlc3VsdD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIGEgcmVzdWx0IGlzIHVuZm9jdXNlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSByZXN1bHRVbmZvY3VzID0gbmV3IEV2ZW50RW1pdHRlcjxTZWFyY2hSZXN1bHQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiBhIHJlc3VsdCBpcyBzZWxlY3RlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSByZXN1bHRTZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPFNlYXJjaFJlc3VsdD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIGEgcmVzZWFyY2ggaXMgY29tcGxldGVkIGFmdGVyIGRpc3BsYXlpbmcgbW9yZSByZXN1bHRzIGlzIGNsaWNrZWRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgbW9yZVJlc3VsdHMgPSBuZXcgRXZlbnRFbWl0dGVyPHtcclxuICAgIHJlc2VhcmNoOiBSZXNlYXJjaDtcclxuICAgIHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdO1xyXG4gIH0+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50cyBlbWl0dGVkIHdoZW4gYSByZXN1bHQgaXMgZm9jdXMgb3IgdW5mb2N1cyBieSBtb3VzZSBldmVudFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSByZXN1bHRNb3VzZWVudGVyID0gbmV3IEV2ZW50RW1pdHRlcjxTZWFyY2hSZXN1bHQ+KCk7XHJcbiAgQE91dHB1dCgpIHJlc3VsdE1vdXNlbGVhdmUgPSBuZXcgRXZlbnRFbWl0dGVyPFNlYXJjaFJlc3VsdD4oKTtcclxuXHJcbiAgQENvbnRlbnRDaGlsZCgnaWdvU2VhcmNoSXRlbVRvb2xiYXInKSB0ZW1wbGF0ZVNlYXJjaFRvb2xiYXI6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIGdldCByZXN1bHRzJCgpOiBPYnNlcnZhYmxlPHtzb3VyY2U6IFNlYXJjaFNvdXJjZTsgcmVzdWx0czogU2VhcmNoUmVzdWx0W119W10+IHtcclxuICAgIGlmICh0aGlzLl9yZXN1bHRzJCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuX3Jlc3VsdHMkID0gdGhpcy5saWZ0UmVzdWx0cygpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX3Jlc3VsdHMkO1xyXG4gIH1cclxuICBwcml2YXRlIF9yZXN1bHRzJDogT2JzZXJ2YWJsZTxcclxuICAgIHtzb3VyY2U6IFNlYXJjaFNvdXJjZTsgcmVzdWx0czogU2VhcmNoUmVzdWx0W119W11cclxuICA+O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgICAgICAgICAgICBwcml2YXRlIHNlYXJjaFNlcnZpY2U6IFNlYXJjaFNlcnZpY2UpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIEJpbmQgdGhlIHNlYXJjaCByZXN1bHRzIHN0b3JlIHRvIHRoZSB3YXRjaGVyXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLndhdGNoZXIgPSBuZXcgRW50aXR5U3RvcmVXYXRjaGVyKHRoaXMuc3RvcmUsIHRoaXMuY2RSZWYpO1xyXG5cclxuICAgIHRoaXMuc2V0dGluZ3NDaGFuZ2UkLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMucGFnZUl0ZXJhdG9yID0gW107XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuYmluZCB0aGUgc2VhcmNoIHJlc3VsdHMgc3RvcmUgZnJvbSB0aGUgd2F0Y2hlclxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy53YXRjaGVyLmRlc3Ryb3koKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbXB1dGUgYSBncm91cCB0aXRsZVxyXG4gICAqIEBwYXJhbSBncm91cCBTZWFyY2ggcmVzdWx0cyBncm91cFxyXG4gICAqIEByZXR1cm5zIEdyb3VwIHRpdGxlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgY29tcHV0ZUdyb3VwVGl0bGUoZ3JvdXA6IHtzb3VyY2U6IFNlYXJjaFNvdXJjZTsgcmVzdWx0czogU2VhcmNoUmVzdWx0W119KTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHBhcnRzID0gW2dyb3VwLnNvdXJjZS50aXRsZV07XHJcbiAgICBjb25zdCBjb3VudCA9IGdyb3VwLnJlc3VsdHMubGVuZ3RoO1xyXG4gICAgaWYgKGNvdW50ID4gMSkge1xyXG4gICAgICBwYXJ0cy5wdXNoKGAoJHtjb3VudH0pYCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFydHMuam9pbignICcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBhIHJlc3VsdCBpcyBzZWxlY3RlZCwgdXBkYXRlIGl0J3Mgc3RhdGUgaW4gdGhlIHN0b3JlIGFuZCBlbWl0XHJcbiAgICogYW4gZXZlbnQuIEEgc2VsZWN0ZWQgcmVzdWx0IGlzIGFsc28gY29uc2lkZXJlZCBmb2N1c2VkXHJcbiAgICogQHBhcmFtIHJlc3VsdCBTZWFyY2ggcmVzdWx0XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25SZXN1bHRTZWxlY3QocmVzdWx0OiBTZWFyY2hSZXN1bHQpIHtcclxuICAgIGlmICh0aGlzLnN0b3JlLnN0YXRlLmdldChyZXN1bHQpKSB7XHJcbiAgICAgIGlmICh0aGlzLnN0b3JlLnN0YXRlLmdldChyZXN1bHQpLnNlbGVjdGVkID09PSB0cnVlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0b3JlLnN0YXRlLnVwZGF0ZShyZXN1bHQsIHtmb2N1c2VkOiB0cnVlLCBzZWxlY3RlZDogdHJ1ZX0sIHRydWUpO1xyXG4gICAgdGhpcy5yZXN1bHRTZWxlY3QuZW1pdChyZXN1bHQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIGFuIG9ic2VydmFibGUgb2YgdGhlIHNlYXJjaCByZXN1bHRzLCBncm91cGVkIGJ5IHNlYXJjaCBzb3VyY2VcclxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIGdyb3VwZWQgc2VhcmNoIHJlc3VsdHNcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcml2YXRlIGxpZnRSZXN1bHRzKCk6IE9ic2VydmFibGU8e3NvdXJjZTogU2VhcmNoU291cmNlOyByZXN1bHRzOiBTZWFyY2hSZXN1bHRbXX1bXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RvcmUudmlldy5hbGwkKCkucGlwZShcclxuICAgICAgZGVib3VuY2UoKHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdHMubGVuZ3RoID09PSAwID8gRU1QVFkgOiB0aW1lcigyMDApO1xyXG4gICAgICB9KSxcclxuICAgICAgbWFwKChyZXN1bHRzOiBTZWFyY2hSZXN1bHRbXSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdyb3VwUmVzdWx0cyhyZXN1bHRzLnNvcnQodGhpcy5zb3J0QnlPcmRlcikpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNvcnQgdGhlIHJlc3VsdHMgYnkgZGlzcGxheSBvcmRlci5cclxuICAgKiBAcGFyYW0gcjEgRmlyc3QgcmVzdWx0XHJcbiAgICogQHBhcmFtIHIyIFNlY29uZCByZXN1bHRcclxuICAgKi9cclxuICBwcml2YXRlIHNvcnRCeU9yZGVyKHIxOiBTZWFyY2hSZXN1bHQsIHIyOiBTZWFyY2hSZXN1bHQpIHtcclxuICAgIHJldHVybiByMS5zb3VyY2UuZGlzcGxheU9yZGVyIC0gcjIuc291cmNlLmRpc3BsYXlPcmRlcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdyb3VwIHJlc3VsdHMgYnkgc2VhcmNoIHNvdXJjZVxyXG4gICAqIEBwYXJhbSByZXN1bHRzIFNlYXJjaCByZXN1bHRzIGZyb20gYWxsIHNvdXJjZXNcclxuICAgKiBAcmV0dXJucyBTZWFyY2ggcmVzdWx0cyBncm91cGVkIGJ5IHNvdXJjZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ3JvdXBSZXN1bHRzKHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdKToge3NvdXJjZTogU2VhcmNoU291cmNlOyByZXN1bHRzOiBTZWFyY2hSZXN1bHRbXX1bXSB7XHJcbiAgICBjb25zdCBncm91cGVkID0gbmV3IE1hcDxTZWFyY2hTb3VyY2UsIFNlYXJjaFJlc3VsdFtdPigpO1xyXG4gICAgcmVzdWx0cy5mb3JFYWNoKChyZXN1bHQ6IFNlYXJjaFJlc3VsdCkgPT4ge1xyXG4gICAgICBjb25zdCBzb3VyY2UgPSByZXN1bHQuc291cmNlO1xyXG4gICAgICBsZXQgc291cmNlUmVzdWx0cyA9IGdyb3VwZWQuZ2V0KHNvdXJjZSk7XHJcbiAgICAgIGlmIChzb3VyY2VSZXN1bHRzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBzb3VyY2VSZXN1bHRzID0gW107XHJcbiAgICAgICAgZ3JvdXBlZC5zZXQoc291cmNlLCBzb3VyY2VSZXN1bHRzKTtcclxuICAgICAgfVxyXG4gICAgICBzb3VyY2VSZXN1bHRzLnB1c2gocmVzdWx0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBBcnJheS5mcm9tKGdyb3VwZWQua2V5cygpKS5tYXAoKHNvdXJjZTogU2VhcmNoU291cmNlKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnBhZ2VJdGVyYXRvcltzb3VyY2UuZ2V0SWQoKV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMucGFnZUl0ZXJhdG9yW3NvdXJjZS5nZXRJZCgpXSA9IDE7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHtzb3VyY2UsIHJlc3VsdHM6IGdyb3VwZWQuZ2V0KHNvdXJjZSl9O1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpc01vcmVSZXN1bHRzKGdyb3VwOiB7c291cmNlOiBTZWFyY2hTb3VyY2U7IHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdfSkge1xyXG4gICAgcmV0dXJuIGdyb3VwLnJlc3VsdHMgJiYgZ3JvdXAucmVzdWx0c1tncm91cC5yZXN1bHRzLmxlbmd0aCAtIDFdLm1ldGEubmV4dFBhZ2UgPT09IHRydWU7XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5TW9yZVJlc3VsdHMoZ3JvdXA6IHtzb3VyY2U6IFNlYXJjaFNvdXJjZTsgcmVzdWx0czogU2VhcmNoUmVzdWx0W119KSB7XHJcbiAgICBjb25zdCBvcHRpb25zOiBUZXh0U2VhcmNoT3B0aW9ucyA9IHtcclxuICAgICAgc291cmNlSWQ6IGdyb3VwLnNvdXJjZS5nZXRJZCgpLFxyXG4gICAgICBwYWdlOiArK3RoaXMucGFnZUl0ZXJhdG9yW2dyb3VwLnNvdXJjZS5nZXRJZCgpXVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZXNlYXJjaGVzID0gdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaCh0aGlzLnRlcm0sIG9wdGlvbnMpO1xyXG4gICAgcmVzZWFyY2hlcy5tYXAocmVzZWFyY2ggPT4ge1xyXG4gICAgICByZXNlYXJjaC5yZXF1ZXN0LnN1YnNjcmliZSgocmVzdWx0czogU2VhcmNoUmVzdWx0W10pID0+IHtcclxuICAgICAgICBjb25zdCBuZXdSZXN1bHRzID0gZ3JvdXAucmVzdWx0cy5jb25jYXQocmVzdWx0cyk7XHJcbiAgICAgICAgaWYgKCFyZXN1bHRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgbmV3UmVzdWx0c1tuZXdSZXN1bHRzLmxlbmd0aCAtIDFdLm1ldGEubmV4dFBhZ2UgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tb3JlUmVzdWx0cy5lbWl0KHtyZXNlYXJjaCwgcmVzdWx0czogbmV3UmVzdWx0c30pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxufVxyXG4iXX0=