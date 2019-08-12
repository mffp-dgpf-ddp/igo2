/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { EMPTY, timer } from 'rxjs';
import { debounce, map } from 'rxjs/operators';
import { EntityStore, EntityStoreWatcher } from '@igo2/common';
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
     */
    constructor(cdRef) {
        this.cdRef = cdRef;
        /**
         * Reference to the SearchResultMode enum
         * \@internal
         */
        this.searchResultMode = SearchResultMode;
        /**
         * Search results display mode
         */
        this.mode = SearchResultMode.Grouped;
        /**
         * Event emitted when a result is focused
         */
        this.resultFocus = new EventEmitter();
        /**
         * Event emitted when a result is selected
         */
        this.resultSelect = new EventEmitter();
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
        this.store.state.update(result, { focused: true }, true);
        this.resultFocus.emit(result);
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
        this.store.state.update(result, {
            focused: true,
            selected: true
        }, true);
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
            return { source, results: grouped.get(source) };
        }));
    }
}
SearchResultsComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-search-results',
                template: "<igo-list [navigation]=\"true\">\r\n  <ng-template\r\n    #groupTemplate\r\n    ngFor let-group\r\n    [ngForOf]=\"results$ | async\">\r\n\r\n    <igo-collapsible\r\n      *ngIf=\"mode === searchResultMode.Grouped; else flatTemplate\"\r\n      [title]=\"computeGroupTitle(group)\">\r\n      <ng-container *ngTemplateOutlet=\"storeItemTemplate; context: {results: group.results}\"></ng-container>\r\n    </igo-collapsible>\r\n\r\n    <ng-template #flatTemplate>\r\n      <ng-container *ngTemplateOutlet=\"storeItemTemplate; context: {results: group.results}\"></ng-container>\r\n    </ng-template>\r\n\r\n    <ng-template #storeItemTemplate let-results=\"results\">\r\n      <ng-template ngFor let-result [ngForOf]=\"results\">\r\n        <igo-search-results-item\r\n          igoListItem\r\n          color=\"accent\"\r\n          [result]=\"result\"\r\n          [focused]=\"store.state.get(result).focused\"\r\n          [selected]=\"store.state.get(result).selected\"\r\n          (focus)=\"onResultFocus(result)\"\r\n          (select)=\"onResultSelect(result)\">\r\n        </igo-search-results-item>\r\n      </ng-template>\r\n    </ng-template>\r\n\r\n  </ng-template>\r\n</igo-list>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
SearchResultsComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
SearchResultsComponent.propDecorators = {
    store: [{ type: Input }],
    mode: [{ type: Input }],
    resultFocus: [{ type: Output }],
    resultSelect: [{ type: Output }]
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
    /**
     * Search results store
     * @type {?}
     */
    SearchResultsComponent.prototype.store;
    /**
     * Search results display mode
     * @type {?}
     */
    SearchResultsComponent.prototype.mode;
    /**
     * Event emitted when a result is focused
     * @type {?}
     */
    SearchResultsComponent.prototype.resultFocus;
    /**
     * Event emitted when a result is selected
     * @type {?}
     */
    SearchResultsComponent.prototype.resultSelect;
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zZWFyY2gtcmVzdWx0cy9zZWFyY2gtcmVzdWx0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUdsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQWEsS0FBSyxFQUFFLEtBQUssRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUMsUUFBUSxFQUFFLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBQyxXQUFXLEVBQUUsa0JBQWtCLEVBQUMsTUFBTSxjQUFjLENBQUM7OztJQU0zRCxTQUFVLFNBQVM7SUFDbkIsTUFBTyxNQUFNOzs7Ozs7O0FBWWYsTUFBTSxPQUFPLHNCQUFzQjs7OztJQTBDakMsWUFBb0IsS0FBd0I7UUFBeEIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7Ozs7O1FBckNyQyxxQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQzs7OztRQWVsQyxTQUFJLEdBQXFCLGdCQUFnQixDQUFDLE9BQU8sQ0FBQzs7OztRQUtqRCxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFnQixDQUFDOzs7O1FBSy9DLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQWdCLENBQUM7SUFZWCxDQUFDOzs7O0lBVmhELElBQUksUUFBUTtRQUNWLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDckM7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQzs7Ozs7O0lBV0QsUUFBUTtRQUNOLElBQUksQ0FBQyxPQUFP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TSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUM7UUFDaEQsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7WUExSkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLHNyQ0FBOEM7Z0JBQzlDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7O1lBMUJDLGlCQUFpQjs7O29CQTBDaEIsS0FBSzttQkFLTCxLQUFLOzBCQUtMLE1BQU07MkJBS04sTUFBTTs7Ozs7Ozs7SUF6QlAsa0RBQTJDOzs7Ozs7SUFLM0MseUNBQWtEOzs7OztJQUtsRCx1Q0FBMEM7Ozs7O0lBSzFDLHNDQUEyRDs7Ozs7SUFLM0QsNkNBQXlEOzs7OztJQUt6RCw4Q0FBMEQ7Ozs7O0lBUTFELDJDQUVFOzs7OztJQUVVLHVDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtPYnNlcnZhYmxlLCBFTVBUWSwgdGltZXJ9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge2RlYm91bmNlLCBtYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7RW50aXR5U3RvcmUsIEVudGl0eVN0b3JlV2F0Y2hlcn0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7U2VhcmNoUmVzdWx0fSBmcm9tICcuLi9zaGFyZWQvc2VhcmNoLmludGVyZmFjZXMnO1xyXG5pbXBvcnQge1NlYXJjaFNvdXJjZX0gZnJvbSAnLi4vc2hhcmVkL3NvdXJjZXMvc291cmNlJztcclxuXHJcbmV4cG9ydCBlbnVtIFNlYXJjaFJlc3VsdE1vZGUge1xyXG4gIEdyb3VwZWQgPSAnZ3JvdXBlZCcsXHJcbiAgRmxhdCA9ICdmbGF0J1xyXG59XHJcblxyXG4vKipcclxuICogTGlzdCBvZiBzZWFyY2ggcmVzdWx0cyB3aXRoIGZvY3VzIGFuZCBzZWxlY3Rpb24gY2FwYWJpbGl0aWVzLlxyXG4gKiBUaGlzIGNvbXBvbmVudCBpcyBkdW1iIGFuZCBvbmx5IGVtaXRzIGV2ZW50cy5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXNlYXJjaC1yZXN1bHRzJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc2VhcmNoLXJlc3VsdHMuY29tcG9uZW50Lmh0bWwnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hSZXN1bHRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIFJlZmVyZW5jZSB0byB0aGUgU2VhcmNoUmVzdWx0TW9kZSBlbnVtXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHVibGljIHNlYXJjaFJlc3VsdE1vZGUgPSBTZWFyY2hSZXN1bHRNb2RlO1xyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggcmVzdWx0cyBzdG9yZSB3YXRjaGVyXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB3YXRjaGVyOiBFbnRpdHlTdG9yZVdhdGNoZXI8U2VhcmNoUmVzdWx0PjtcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHJlc3VsdHMgc3RvcmVcclxuICAgKi9cclxuICBASW5wdXQoKSBzdG9yZTogRW50aXR5U3RvcmU8U2VhcmNoUmVzdWx0PjtcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHJlc3VsdHMgZGlzcGxheSBtb2RlXHJcbiAgICovXHJcbiAgQElucHV0KCkgbW9kZTogU2VhcmNoUmVzdWx0TW9kZSA9IFNlYXJjaFJlc3VsdE1vZGUuR3JvdXBlZDtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIGEgcmVzdWx0IGlzIGZvY3VzZWRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgcmVzdWx0Rm9jdXMgPSBuZXcgRXZlbnRFbWl0dGVyPFNlYXJjaFJlc3VsdD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIGEgcmVzdWx0IGlzIHNlbGVjdGVkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHJlc3VsdFNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8U2VhcmNoUmVzdWx0PigpO1xyXG5cclxuICBnZXQgcmVzdWx0cyQoKTogT2JzZXJ2YWJsZTx7c291cmNlOiBTZWFyY2hTb3VyY2U7IHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdfVtdPiB7XHJcbiAgICBpZiAodGhpcy5fcmVzdWx0cyQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLl9yZXN1bHRzJCA9IHRoaXMubGlmdFJlc3VsdHMoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9yZXN1bHRzJDtcclxuICB9XHJcbiAgcHJpdmF0ZSBfcmVzdWx0cyQ6IE9ic2VydmFibGU8XHJcbiAgICB7c291cmNlOiBTZWFyY2hTb3VyY2U7IHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdfVtdXHJcbiAgPjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIEJpbmQgdGhlIHNlYXJjaCByZXN1bHRzIHN0b3JlIHRvIHRoZSB3YXRjaGVyXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLndhdGNoZXIgPSBuZXcgRW50aXR5U3RvcmVXYXRjaGVyKHRoaXMuc3RvcmUsIHRoaXMuY2RSZWYpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5iaW5kIHRoZSBzZWFyY2ggcmVzdWx0cyBzdG9yZSBmcm9tIHRoZSB3YXRjaGVyXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLndhdGNoZXIuZGVzdHJveSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBhIHJlc3VsdCBpcyBmb2N1c2VkLCB1cGRhdGUgaXQncyBzdGF0ZSBpbiB0aGUgc3RvcmUgYW5kIGVtaXRcclxuICAgKiBhbiBldmVudC5cclxuICAgKiBAcGFyYW0gcmVzdWx0IFNlYXJjaCByZXN1bHRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvblJlc3VsdEZvY3VzKHJlc3VsdDogU2VhcmNoUmVzdWx0KSB7XHJcbiAgICB0aGlzLnN0b3JlLnN0YXRlLnVwZGF0ZShyZXN1bHQsIHtmb2N1c2VkOiB0cnVlfSwgdHJ1ZSk7XHJcbiAgICB0aGlzLnJlc3VsdEZvY3VzLmVtaXQocmVzdWx0KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbXB1dGUgYSBncm91cCB0aXRsZVxyXG4gICAqIEBwYXJhbSBncm91cCBTZWFyY2ggcmVzdWx0cyBncm91cFxyXG4gICAqIEByZXR1cm5zIEdyb3VwIHRpdGxlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgY29tcHV0ZUdyb3VwVGl0bGUoZ3JvdXA6IHtzb3VyY2U6IFNlYXJjaFNvdXJjZTsgcmVzdWx0czogU2VhcmNoUmVzdWx0W119KTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHBhcnRzID0gW2dyb3VwLnNvdXJjZS50aXRsZV07XHJcbiAgICBjb25zdCBjb3VudCA9IGdyb3VwLnJlc3VsdHMubGVuZ3RoO1xyXG4gICAgaWYgKGNvdW50ID4gMSkge1xyXG4gICAgICBwYXJ0cy5wdXNoKGAoJHtjb3VudH0pYCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFydHMuam9pbignICcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBhIHJlc3VsdCBpcyBzZWxlY3RlZCwgdXBkYXRlIGl0J3Mgc3RhdGUgaW4gdGhlIHN0b3JlIGFuZCBlbWl0XHJcbiAgICogYW4gZXZlbnQuIEEgc2VsZWN0ZWQgcmVzdWx0IGlzIGFsc28gY29uc2lkZXJlZCBmb2N1c2VkXHJcbiAgICogQHBhcmFtIHJlc3VsdCBTZWFyY2ggcmVzdWx0XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25SZXN1bHRTZWxlY3QocmVzdWx0OiBTZWFyY2hSZXN1bHQpIHtcclxuICAgIHRoaXMuc3RvcmUuc3RhdGUudXBkYXRlKFxyXG4gICAgICByZXN1bHQsXHJcbiAgICAgIHtcclxuICAgICAgICBmb2N1c2VkOiB0cnVlLFxyXG4gICAgICAgIHNlbGVjdGVkOiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgIHRydWVcclxuICAgICk7XHJcbiAgICB0aGlzLnJlc3VsdFNlbGVjdC5lbWl0KHJlc3VsdCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gYW4gb2JzZXJ2YWJsZSBvZiB0aGUgc2VhcmNoIHJlc3VsdHMsIGdyb3VwZWQgYnkgc2VhcmNoIHNvdXJjZVxyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgZ3JvdXBlZCBzZWFyY2ggcmVzdWx0c1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgbGlmdFJlc3VsdHMoKTogT2JzZXJ2YWJsZTx7c291cmNlOiBTZWFyY2hTb3VyY2U7IHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdfVtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5zdG9yZS52aWV3LmFsbCQoKS5waXBlKFxyXG4gICAgICBkZWJvdW5jZSgocmVzdWx0czogU2VhcmNoUmVzdWx0W10pID0+IHtcclxuICAgICAgICByZXR1cm4gcmVzdWx0cy5sZW5ndGggPT09IDAgPyBFTVBUWSA6IHRpbWVyKDIwMCk7XHJcbiAgICAgIH0pLFxyXG4gICAgICBtYXAoKHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ3JvdXBSZXN1bHRzKHJlc3VsdHMuc29ydCh0aGlzLnNvcnRCeU9yZGVyKSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU29ydCB0aGUgcmVzdWx0cyBieSBkaXNwbGF5IG9yZGVyLlxyXG4gICAqIEBwYXJhbSByMSBGaXJzdCByZXN1bHRcclxuICAgKiBAcGFyYW0gcjIgU2Vjb25kIHJlc3VsdFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc29ydEJ5T3JkZXIocjE6IFNlYXJjaFJlc3VsdCwgcjI6IFNlYXJjaFJlc3VsdCkge1xyXG4gICAgcmV0dXJuIHIxLnNvdXJjZS5kaXNwbGF5T3JkZXIgLSByMi5zb3VyY2UuZGlzcGxheU9yZGVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR3JvdXAgcmVzdWx0cyBieSBzZWFyY2ggc291cmNlXHJcbiAgICogQHBhcmFtIHJlc3VsdHMgU2VhcmNoIHJlc3VsdHMgZnJvbSBhbGwgc291cmNlc1xyXG4gICAqIEByZXR1cm5zIFNlYXJjaCByZXN1bHRzIGdyb3VwZWQgYnkgc291cmNlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBncm91cFJlc3VsdHMocmVzdWx0czogU2VhcmNoUmVzdWx0W10pOiB7c291cmNlOiBTZWFyY2hTb3VyY2U7IHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdfVtdIHtcclxuICAgIGNvbnN0IGdyb3VwZWQgPSBuZXcgTWFwPFNlYXJjaFNvdXJjZSwgU2VhcmNoUmVzdWx0W10+KCk7XHJcbiAgICByZXN1bHRzLmZvckVhY2goKHJlc3VsdDogU2VhcmNoUmVzdWx0KSA9PiB7XHJcbiAgICAgIGNvbnN0IHNvdXJjZSA9IHJlc3VsdC5zb3VyY2U7XHJcbiAgICAgIGxldCBzb3VyY2VSZXN1bHRzID0gZ3JvdXBlZC5nZXQoc291cmNlKTtcclxuICAgICAgaWYgKHNvdXJjZVJlc3VsdHMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHNvdXJjZVJlc3VsdHMgPSBbXTtcclxuICAgICAgICBncm91cGVkLnNldChzb3VyY2UsIHNvdXJjZVJlc3VsdHMpO1xyXG4gICAgICB9XHJcbiAgICAgIHNvdXJjZVJlc3VsdHMucHVzaChyZXN1bHQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIEFycmF5LmZyb20oZ3JvdXBlZC5rZXlzKCkpLm1hcCgoc291cmNlOiBTZWFyY2hTb3VyY2UpID0+IHtcclxuICAgICAgcmV0dXJuIHtzb3VyY2UsIHJlc3VsdHM6IGdyb3VwZWQuZ2V0KHNvdXJjZSl9O1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==