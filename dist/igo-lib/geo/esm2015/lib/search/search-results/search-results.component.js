/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ContentChild, ChangeDetectionStrategy, ChangeDetectorRef, TemplateRef } from '@angular/core';
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
            return { source, results: grouped.get(source) };
        }));
    }
}
SearchResultsComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-search-results',
                template: "<igo-list [navigation]=\"true\">\r\n  <ng-template\r\n    #groupTemplate\r\n    ngFor let-group\r\n    [ngForOf]=\"results$ | async\">\r\n\r\n    <igo-collapsible\r\n      *ngIf=\"mode === searchResultMode.Grouped; else flatTemplate\"\r\n      [title]=\"computeGroupTitle(group)\">\r\n      <ng-container *ngTemplateOutlet=\"storeItemTemplate; context: {results: group.results}\"></ng-container>\r\n    </igo-collapsible>\r\n\r\n    <ng-template #flatTemplate>\r\n      <ng-container *ngTemplateOutlet=\"storeItemTemplate; context: {results: group.results}\"></ng-container>\r\n    </ng-template>\r\n\r\n    <ng-template #storeItemTemplate let-results=\"results\">\r\n      <ng-template ngFor let-result [ngForOf]=\"results\">\r\n        <igo-search-results-item\r\n          igoListItem\r\n          color=\"accent\"\r\n          [result]=\"result\"\r\n          [focused]=\"store.state.get(result).focused\"\r\n          [selected]=\"store.state.get(result).selected\"\r\n          (focus)=\"onResultFocus(result)\"\r\n          (select)=\"onResultSelect(result)\">\r\n\r\n          <ng-container igoSearchItemToolbar\r\n            [ngTemplateOutlet]=\"templateSearchToolbar\"\r\n            [ngTemplateOutletContext]=\"{result: result}\">\r\n          </ng-container>\r\n\r\n        </igo-search-results-item>\r\n      </ng-template>\r\n    </ng-template>\r\n\r\n  </ng-template>\r\n</igo-list>\r\n",
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
    resultSelect: [{ type: Output }],
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zZWFyY2gtcmVzdWx0cy9zZWFyY2gtcmVzdWx0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osWUFBWSxFQUNaLHVCQUF1QixFQUN2QixpQkFBaUIsRUFFakIsV0FBVyxFQUVaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBYyxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7O0lBTTdELFNBQVUsU0FBUztJQUNuQixNQUFPLE1BQU07Ozs7Ozs7QUFZZixNQUFNLE9BQU8sc0JBQXNCOzs7O0lBNENqQyxZQUFvQixLQUF3QjtRQUF4QixVQUFLLEdBQUwsS0FBSyxDQUFtQjs7Ozs7UUF2Q3JDLHFCQUFnQixHQUFHLGdCQUFnQixDQUFDOzs7O1FBZWxDLFNBQUksR0FBcUIsZ0JBQWdCLENBQUMsT0FBTyxDQUFDOzs7O1FBS2pELGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQWdCLENBQUM7Ozs7UUFLL0MsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBZ0IsQ0FBQztJQWNYLENBQUM7Ozs7SUFWaEQsSUFBSSxRQUFRO1FBQ1YsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtZQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNyQztRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOzs7Ozs7SUFXRCxRQUFR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O1lBQzdELE9BQU8sRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQztRQUNoRCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7OztZQXJKRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsczRDQUE4QztnQkFDOUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7Ozs7WUEzQkMsaUJBQWlCOzs7b0JBMkNoQixLQUFLO21CQUtMLEtBQUs7MEJBS0wsTUFBTTsyQkFLTixNQUFNO29DQUVOLFlBQVksU0FBQyxzQkFBc0I7Ozs7Ozs7O0lBM0JwQyxrREFBMkM7Ozs7OztJQUszQyx5Q0FBa0Q7Ozs7O0lBS2xELHVDQUEwQzs7Ozs7SUFLMUMsc0NBQTJEOzs7OztJQUszRCw2Q0FBeUQ7Ozs7O0lBS3pELDhDQUEwRDs7SUFFMUQsdURBQThFOzs7OztJQVE5RSwyQ0FFRTs7Ozs7SUFFVSx1Q0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIENvbnRlbnRDaGlsZCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBPbkluaXQsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgT25EZXN0cm95XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBFTVBUWSwgdGltZXIgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGVib3VuY2UsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IEVudGl0eVN0b3JlLCBFbnRpdHlTdG9yZVdhdGNoZXIgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi4vc2hhcmVkL3NlYXJjaC5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgU2VhcmNoU291cmNlIH0gZnJvbSAnLi4vc2hhcmVkL3NvdXJjZXMvc291cmNlJztcclxuXHJcbmV4cG9ydCBlbnVtIFNlYXJjaFJlc3VsdE1vZGUge1xyXG4gIEdyb3VwZWQgPSAnZ3JvdXBlZCcsXHJcbiAgRmxhdCA9ICdmbGF0J1xyXG59XHJcblxyXG4vKipcclxuICogTGlzdCBvZiBzZWFyY2ggcmVzdWx0cyB3aXRoIGZvY3VzIGFuZCBzZWxlY3Rpb24gY2FwYWJpbGl0aWVzLlxyXG4gKiBUaGlzIGNvbXBvbmVudCBpcyBkdW1iIGFuZCBvbmx5IGVtaXRzIGV2ZW50cy5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXNlYXJjaC1yZXN1bHRzJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc2VhcmNoLXJlc3VsdHMuY29tcG9uZW50Lmh0bWwnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hSZXN1bHRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIFJlZmVyZW5jZSB0byB0aGUgU2VhcmNoUmVzdWx0TW9kZSBlbnVtXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHVibGljIHNlYXJjaFJlc3VsdE1vZGUgPSBTZWFyY2hSZXN1bHRNb2RlO1xyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggcmVzdWx0cyBzdG9yZSB3YXRjaGVyXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB3YXRjaGVyOiBFbnRpdHlTdG9yZVdhdGNoZXI8U2VhcmNoUmVzdWx0PjtcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHJlc3VsdHMgc3RvcmVcclxuICAgKi9cclxuICBASW5wdXQoKSBzdG9yZTogRW50aXR5U3RvcmU8U2VhcmNoUmVzdWx0PjtcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHJlc3VsdHMgZGlzcGxheSBtb2RlXHJcbiAgICovXHJcbiAgQElucHV0KCkgbW9kZTogU2VhcmNoUmVzdWx0TW9kZSA9IFNlYXJjaFJlc3VsdE1vZGUuR3JvdXBlZDtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIGEgcmVzdWx0IGlzIGZvY3VzZWRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgcmVzdWx0Rm9jdXMgPSBuZXcgRXZlbnRFbWl0dGVyPFNlYXJjaFJlc3VsdD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIGEgcmVzdWx0IGlzIHNlbGVjdGVkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHJlc3VsdFNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8U2VhcmNoUmVzdWx0PigpO1xyXG5cclxuICBAQ29udGVudENoaWxkKCdpZ29TZWFyY2hJdGVtVG9vbGJhcicpIHRlbXBsYXRlU2VhcmNoVG9vbGJhcjogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgZ2V0IHJlc3VsdHMkKCk6IE9ic2VydmFibGU8e3NvdXJjZTogU2VhcmNoU291cmNlOyByZXN1bHRzOiBTZWFyY2hSZXN1bHRbXX1bXT4ge1xyXG4gICAgaWYgKHRoaXMuX3Jlc3VsdHMkID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5fcmVzdWx0cyQgPSB0aGlzLmxpZnRSZXN1bHRzKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fcmVzdWx0cyQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3Jlc3VsdHMkOiBPYnNlcnZhYmxlPFxyXG4gICAge3NvdXJjZTogU2VhcmNoU291cmNlOyByZXN1bHRzOiBTZWFyY2hSZXN1bHRbXX1bXVxyXG4gID47XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBCaW5kIHRoZSBzZWFyY2ggcmVzdWx0cyBzdG9yZSB0byB0aGUgd2F0Y2hlclxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy53YXRjaGVyID0gbmV3IEVudGl0eVN0b3JlV2F0Y2hlcih0aGlzLnN0b3JlLCB0aGlzLmNkUmVmKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuYmluZCB0aGUgc2VhcmNoIHJlc3VsdHMgc3RvcmUgZnJvbSB0aGUgd2F0Y2hlclxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy53YXRjaGVyLmRlc3Ryb3koKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gYSByZXN1bHQgaXMgZm9jdXNlZCwgdXBkYXRlIGl0J3Mgc3RhdGUgaW4gdGhlIHN0b3JlIGFuZCBlbWl0XHJcbiAgICogYW4gZXZlbnQuXHJcbiAgICogQHBhcmFtIHJlc3VsdCBTZWFyY2ggcmVzdWx0XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25SZXN1bHRGb2N1cyhyZXN1bHQ6IFNlYXJjaFJlc3VsdCkge1xyXG4gICAgdGhpcy5zdG9yZS5zdGF0ZS51cGRhdGUocmVzdWx0LCB7Zm9jdXNlZDogdHJ1ZX0sIHRydWUpO1xyXG4gICAgdGhpcy5yZXN1bHRGb2N1cy5lbWl0KHJlc3VsdCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb21wdXRlIGEgZ3JvdXAgdGl0bGVcclxuICAgKiBAcGFyYW0gZ3JvdXAgU2VhcmNoIHJlc3VsdHMgZ3JvdXBcclxuICAgKiBAcmV0dXJucyBHcm91cCB0aXRsZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGNvbXB1dGVHcm91cFRpdGxlKGdyb3VwOiB7c291cmNlOiBTZWFyY2hTb3VyY2U7IHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdfSk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBwYXJ0cyA9IFtncm91cC5zb3VyY2UudGl0bGVdO1xyXG4gICAgY29uc3QgY291bnQgPSBncm91cC5yZXN1bHRzLmxlbmd0aDtcclxuICAgIGlmIChjb3VudCA+IDEpIHtcclxuICAgICAgcGFydHMucHVzaChgKCR7Y291bnR9KWApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhcnRzLmpvaW4oJyAnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gYSByZXN1bHQgaXMgc2VsZWN0ZWQsIHVwZGF0ZSBpdCdzIHN0YXRlIGluIHRoZSBzdG9yZSBhbmQgZW1pdFxyXG4gICAqIGFuIGV2ZW50LiBBIHNlbGVjdGVkIHJlc3VsdCBpcyBhbHNvIGNvbnNpZGVyZWQgZm9jdXNlZFxyXG4gICAqIEBwYXJhbSByZXN1bHQgU2VhcmNoIHJlc3VsdFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uUmVzdWx0U2VsZWN0KHJlc3VsdDogU2VhcmNoUmVzdWx0KSB7XHJcbiAgICB0aGlzLnN0b3JlLnN0YXRlLnVwZGF0ZShyZXN1bHQsIHtmb2N1c2VkOiB0cnVlLCBzZWxlY3RlZDogdHJ1ZX0sIHRydWUpO1xyXG4gICAgdGhpcy5yZXN1bHRTZWxlY3QuZW1pdChyZXN1bHQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIGFuIG9ic2VydmFibGUgb2YgdGhlIHNlYXJjaCByZXN1bHRzLCBncm91cGVkIGJ5IHNlYXJjaCBzb3VyY2VcclxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIGdyb3VwZWQgc2VhcmNoIHJlc3VsdHNcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcml2YXRlIGxpZnRSZXN1bHRzKCk6IE9ic2VydmFibGU8e3NvdXJjZTogU2VhcmNoU291cmNlOyByZXN1bHRzOiBTZWFyY2hSZXN1bHRbXX1bXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RvcmUudmlldy5hbGwkKCkucGlwZShcclxuICAgICAgZGVib3VuY2UoKHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdHMubGVuZ3RoID09PSAwID8gRU1QVFkgOiB0aW1lcigyMDApO1xyXG4gICAgICB9KSxcclxuICAgICAgbWFwKChyZXN1bHRzOiBTZWFyY2hSZXN1bHRbXSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdyb3VwUmVzdWx0cyhyZXN1bHRzLnNvcnQodGhpcy5zb3J0QnlPcmRlcikpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNvcnQgdGhlIHJlc3VsdHMgYnkgZGlzcGxheSBvcmRlci5cclxuICAgKiBAcGFyYW0gcjEgRmlyc3QgcmVzdWx0XHJcbiAgICogQHBhcmFtIHIyIFNlY29uZCByZXN1bHRcclxuICAgKi9cclxuICBwcml2YXRlIHNvcnRCeU9yZGVyKHIxOiBTZWFyY2hSZXN1bHQsIHIyOiBTZWFyY2hSZXN1bHQpIHtcclxuICAgIHJldHVybiByMS5zb3VyY2UuZGlzcGxheU9yZGVyIC0gcjIuc291cmNlLmRpc3BsYXlPcmRlcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdyb3VwIHJlc3VsdHMgYnkgc2VhcmNoIHNvdXJjZVxyXG4gICAqIEBwYXJhbSByZXN1bHRzIFNlYXJjaCByZXN1bHRzIGZyb20gYWxsIHNvdXJjZXNcclxuICAgKiBAcmV0dXJucyBTZWFyY2ggcmVzdWx0cyBncm91cGVkIGJ5IHNvdXJjZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ3JvdXBSZXN1bHRzKHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdKToge3NvdXJjZTogU2VhcmNoU291cmNlOyByZXN1bHRzOiBTZWFyY2hSZXN1bHRbXX1bXSB7XHJcbiAgICBjb25zdCBncm91cGVkID0gbmV3IE1hcDxTZWFyY2hTb3VyY2UsIFNlYXJjaFJlc3VsdFtdPigpO1xyXG4gICAgcmVzdWx0cy5mb3JFYWNoKChyZXN1bHQ6IFNlYXJjaFJlc3VsdCkgPT4ge1xyXG4gICAgICBjb25zdCBzb3VyY2UgPSByZXN1bHQuc291cmNlO1xyXG4gICAgICBsZXQgc291cmNlUmVzdWx0cyA9IGdyb3VwZWQuZ2V0KHNvdXJjZSk7XHJcbiAgICAgIGlmIChzb3VyY2VSZXN1bHRzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBzb3VyY2VSZXN1bHRzID0gW107XHJcbiAgICAgICAgZ3JvdXBlZC5zZXQoc291cmNlLCBzb3VyY2VSZXN1bHRzKTtcclxuICAgICAgfVxyXG4gICAgICBzb3VyY2VSZXN1bHRzLnB1c2gocmVzdWx0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBBcnJheS5mcm9tKGdyb3VwZWQua2V5cygpKS5tYXAoKHNvdXJjZTogU2VhcmNoU291cmNlKSA9PiB7XHJcbiAgICAgIHJldHVybiB7c291cmNlLCByZXN1bHRzOiBncm91cGVkLmdldChzb3VyY2UpfTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=