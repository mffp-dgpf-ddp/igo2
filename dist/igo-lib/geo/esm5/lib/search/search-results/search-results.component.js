/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { EMPTY, timer } from 'rxjs';
import { debounce, map } from 'rxjs/operators';
import { EntityStore, EntityStoreWatcher } from '@igo2/common';
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
    function SearchResultsComponent(cdRef) {
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
        this.watcher = new EntityStoreWatcher(this.store, this.cdRef);
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
        this.store.state.update(result, { focused: true }, true);
        this.resultFocus.emit(result);
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
        this.store.state.update(result, {
            focused: true,
            selected: true
        }, true);
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
            return { source: source, results: grouped.get(source) };
        }));
    };
    SearchResultsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-search-results',
                    template: "<igo-list [navigation]=\"true\">\r\n  <ng-template\r\n    #groupTemplate\r\n    ngFor let-group\r\n    [ngForOf]=\"results$ | async\">\r\n\r\n    <igo-collapsible\r\n      *ngIf=\"mode === searchResultMode.Grouped; else flatTemplate\"\r\n      [title]=\"computeGroupTitle(group)\">\r\n      <ng-container *ngTemplateOutlet=\"storeItemTemplate; context: {results: group.results}\"></ng-container>\r\n    </igo-collapsible>\r\n\r\n    <ng-template #flatTemplate>\r\n      <ng-container *ngTemplateOutlet=\"storeItemTemplate; context: {results: group.results}\"></ng-container>\r\n    </ng-template>\r\n\r\n    <ng-template #storeItemTemplate let-results=\"results\">\r\n      <ng-template ngFor let-result [ngForOf]=\"results\">\r\n        <igo-search-results-item\r\n          igoListItem\r\n          color=\"accent\"\r\n          [result]=\"result\"\r\n          [focused]=\"store.state.get(result).focused\"\r\n          [selected]=\"store.state.get(result).selected\"\r\n          (focus)=\"onResultFocus(result)\"\r\n          (select)=\"onResultSelect(result)\">\r\n        </igo-search-results-item>\r\n      </ng-template>\r\n    </ng-template>\r\n\r\n  </ng-template>\r\n</igo-list>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    SearchResultsComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    SearchResultsComponent.propDecorators = {
        store: [{ type: Input }],
        mode: [{ type: Input }],
        resultFocus: [{ type: Output }],
        resultSelect: [{ type: Output }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zZWFyY2gtcmVzdWx0cy9zZWFyY2gtcmVzdWx0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUdsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQWEsS0FBSyxFQUFFLEtBQUssRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUMsUUFBUSxFQUFFLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBQyxXQUFXLEVBQUUsa0JBQWtCLEVBQUMsTUFBTSxjQUFjLENBQUM7OztJQU0zRCxTQUFVLFNBQVM7SUFDbkIsTUFBTyxNQUFNOzs7Ozs7O0FBT2Y7SUErQ0UsZ0NBQW9CLEtBQXdCO1FBQXhCLFVBQUssR0FBTCxLQUFLLENBQW1COzs7OztRQXJDckMscUJBQWdCLEdBQUcsZ0JBQWdCLENBQUM7Ozs7UUFlbEMsU0FBSSxHQUFxQixnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7Ozs7UUFLakQsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBZ0IsQ0FBQzs7OztRQUsvQyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFnQixDQUFDO0lBWVgsQ0FBQztJQVZoRCxzQkFBSSw0Q0FBUTs7OztRQUFaO1lBQ0UsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDckM7WUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFPRDs7O09BR0c7Ozs7OztJQUNILHlDQUFROzs7OztJQUFSO1FB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O1lBQ0QsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QixDQUFDLEVBQUMsQ0FBQztRQUVILE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQyxNQUFvQjtZQUN6RCxPQUFPLEVBQUMsTUFBTSxRQUFBLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQztRQUNoRCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7O2dCQTFKRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsc3JDQUE4QztvQkFDOUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzs7O2dCQTFCQyxpQkFBaUI7Ozt3QkEwQ2hCLEtBQUs7dUJBS0wsS0FBSzs4QkFLTCxNQUFNOytCQUtOLE1BQU07O0lBd0hULDZCQUFDO0NBQUEsQUEzSkQsSUEySkM7U0F0Slksc0JBQXNCOzs7Ozs7O0lBS2pDLGtEQUEyQzs7Ozs7O0lBSzNDLHlDQUFrRDs7Ozs7SUFLbEQsdUNBQTBDOzs7OztJQUsxQyxzQ0FBMkQ7Ozs7O0lBSzNELDZDQUF5RDs7Ozs7SUFLekQsOENBQTBEOzs7OztJQVExRCwyQ0FFRTs7Ozs7SUFFVSx1Q0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7T2JzZXJ2YWJsZSwgRU1QVFksIHRpbWVyfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtkZWJvdW5jZSwgbWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQge0VudGl0eVN0b3JlLCBFbnRpdHlTdG9yZVdhdGNoZXJ9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQge1NlYXJjaFJlc3VsdH0gZnJvbSAnLi4vc2hhcmVkL3NlYXJjaC5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHtTZWFyY2hTb3VyY2V9IGZyb20gJy4uL3NoYXJlZC9zb3VyY2VzL3NvdXJjZSc7XHJcblxyXG5leHBvcnQgZW51bSBTZWFyY2hSZXN1bHRNb2RlIHtcclxuICBHcm91cGVkID0gJ2dyb3VwZWQnLFxyXG4gIEZsYXQgPSAnZmxhdCdcclxufVxyXG5cclxuLyoqXHJcbiAqIExpc3Qgb2Ygc2VhcmNoIHJlc3VsdHMgd2l0aCBmb2N1cyBhbmQgc2VsZWN0aW9uIGNhcGFiaWxpdGllcy5cclxuICogVGhpcyBjb21wb25lbnQgaXMgZHVtYiBhbmQgb25seSBlbWl0cyBldmVudHMuXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1zZWFyY2gtcmVzdWx0cycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NlYXJjaC1yZXN1bHRzLmNvbXBvbmVudC5odG1sJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VhcmNoUmVzdWx0c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAvKipcclxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIFNlYXJjaFJlc3VsdE1vZGUgZW51bVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZWFyY2hSZXN1bHRNb2RlID0gU2VhcmNoUmVzdWx0TW9kZTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHJlc3VsdHMgc3RvcmUgd2F0Y2hlclxyXG4gICAqL1xyXG4gIHByaXZhdGUgd2F0Y2hlcjogRW50aXR5U3RvcmVXYXRjaGVyPFNlYXJjaFJlc3VsdD47XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCByZXN1bHRzIHN0b3JlXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3RvcmU6IEVudGl0eVN0b3JlPFNlYXJjaFJlc3VsdD47XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCByZXN1bHRzIGRpc3BsYXkgbW9kZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1vZGU6IFNlYXJjaFJlc3VsdE1vZGUgPSBTZWFyY2hSZXN1bHRNb2RlLkdyb3VwZWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiBhIHJlc3VsdCBpcyBmb2N1c2VkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHJlc3VsdEZvY3VzID0gbmV3IEV2ZW50RW1pdHRlcjxTZWFyY2hSZXN1bHQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiBhIHJlc3VsdCBpcyBzZWxlY3RlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSByZXN1bHRTZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPFNlYXJjaFJlc3VsdD4oKTtcclxuXHJcbiAgZ2V0IHJlc3VsdHMkKCk6IE9ic2VydmFibGU8e3NvdXJjZTogU2VhcmNoU291cmNlOyByZXN1bHRzOiBTZWFyY2hSZXN1bHRbXX1bXT4ge1xyXG4gICAgaWYgKHRoaXMuX3Jlc3VsdHMkID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5fcmVzdWx0cyQgPSB0aGlzLmxpZnRSZXN1bHRzKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fcmVzdWx0cyQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3Jlc3VsdHMkOiBPYnNlcnZhYmxlPFxyXG4gICAge3NvdXJjZTogU2VhcmNoU291cmNlOyByZXN1bHRzOiBTZWFyY2hSZXN1bHRbXX1bXVxyXG4gID47XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBCaW5kIHRoZSBzZWFyY2ggcmVzdWx0cyBzdG9yZSB0byB0aGUgd2F0Y2hlclxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy53YXRjaGVyID0gbmV3IEVudGl0eVN0b3JlV2F0Y2hlcih0aGlzLnN0b3JlLCB0aGlzLmNkUmVmKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuYmluZCB0aGUgc2VhcmNoIHJlc3VsdHMgc3RvcmUgZnJvbSB0aGUgd2F0Y2hlclxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy53YXRjaGVyLmRlc3Ryb3koKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gYSByZXN1bHQgaXMgZm9jdXNlZCwgdXBkYXRlIGl0J3Mgc3RhdGUgaW4gdGhlIHN0b3JlIGFuZCBlbWl0XHJcbiAgICogYW4gZXZlbnQuXHJcbiAgICogQHBhcmFtIHJlc3VsdCBTZWFyY2ggcmVzdWx0XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25SZXN1bHRGb2N1cyhyZXN1bHQ6IFNlYXJjaFJlc3VsdCkge1xyXG4gICAgdGhpcy5zdG9yZS5zdGF0ZS51cGRhdGUocmVzdWx0LCB7Zm9jdXNlZDogdHJ1ZX0sIHRydWUpO1xyXG4gICAgdGhpcy5yZXN1bHRGb2N1cy5lbWl0KHJlc3VsdCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb21wdXRlIGEgZ3JvdXAgdGl0bGVcclxuICAgKiBAcGFyYW0gZ3JvdXAgU2VhcmNoIHJlc3VsdHMgZ3JvdXBcclxuICAgKiBAcmV0dXJucyBHcm91cCB0aXRsZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGNvbXB1dGVHcm91cFRpdGxlKGdyb3VwOiB7c291cmNlOiBTZWFyY2hTb3VyY2U7IHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdfSk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBwYXJ0cyA9IFtncm91cC5zb3VyY2UudGl0bGVdO1xyXG4gICAgY29uc3QgY291bnQgPSBncm91cC5yZXN1bHRzLmxlbmd0aDtcclxuICAgIGlmIChjb3VudCA+IDEpIHtcclxuICAgICAgcGFydHMucHVzaChgKCR7Y291bnR9KWApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhcnRzLmpvaW4oJyAnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gYSByZXN1bHQgaXMgc2VsZWN0ZWQsIHVwZGF0ZSBpdCdzIHN0YXRlIGluIHRoZSBzdG9yZSBhbmQgZW1pdFxyXG4gICAqIGFuIGV2ZW50LiBBIHNlbGVjdGVkIHJlc3VsdCBpcyBhbHNvIGNvbnNpZGVyZWQgZm9jdXNlZFxyXG4gICAqIEBwYXJhbSByZXN1bHQgU2VhcmNoIHJlc3VsdFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uUmVzdWx0U2VsZWN0KHJlc3VsdDogU2VhcmNoUmVzdWx0KSB7XHJcbiAgICB0aGlzLnN0b3JlLnN0YXRlLnVwZGF0ZShcclxuICAgICAgcmVzdWx0LFxyXG4gICAgICB7XHJcbiAgICAgICAgZm9jdXNlZDogdHJ1ZSxcclxuICAgICAgICBzZWxlY3RlZDogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICB0cnVlXHJcbiAgICApO1xyXG4gICAgdGhpcy5yZXN1bHRTZWxlY3QuZW1pdChyZXN1bHQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIGFuIG9ic2VydmFibGUgb2YgdGhlIHNlYXJjaCByZXN1bHRzLCBncm91cGVkIGJ5IHNlYXJjaCBzb3VyY2VcclxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIGdyb3VwZWQgc2VhcmNoIHJlc3VsdHNcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcml2YXRlIGxpZnRSZXN1bHRzKCk6IE9ic2VydmFibGU8e3NvdXJjZTogU2VhcmNoU291cmNlOyByZXN1bHRzOiBTZWFyY2hSZXN1bHRbXX1bXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RvcmUudmlldy5hbGwkKCkucGlwZShcclxuICAgICAgZGVib3VuY2UoKHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdHMubGVuZ3RoID09PSAwID8gRU1QVFkgOiB0aW1lcigyMDApO1xyXG4gICAgICB9KSxcclxuICAgICAgbWFwKChyZXN1bHRzOiBTZWFyY2hSZXN1bHRbXSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdyb3VwUmVzdWx0cyhyZXN1bHRzLnNvcnQodGhpcy5zb3J0QnlPcmRlcikpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNvcnQgdGhlIHJlc3VsdHMgYnkgZGlzcGxheSBvcmRlci5cclxuICAgKiBAcGFyYW0gcjEgRmlyc3QgcmVzdWx0XHJcbiAgICogQHBhcmFtIHIyIFNlY29uZCByZXN1bHRcclxuICAgKi9cclxuICBwcml2YXRlIHNvcnRCeU9yZGVyKHIxOiBTZWFyY2hSZXN1bHQsIHIyOiBTZWFyY2hSZXN1bHQpIHtcclxuICAgIHJldHVybiByMS5zb3VyY2UuZGlzcGxheU9yZGVyIC0gcjIuc291cmNlLmRpc3BsYXlPcmRlcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdyb3VwIHJlc3VsdHMgYnkgc2VhcmNoIHNvdXJjZVxyXG4gICAqIEBwYXJhbSByZXN1bHRzIFNlYXJjaCByZXN1bHRzIGZyb20gYWxsIHNvdXJjZXNcclxuICAgKiBAcmV0dXJucyBTZWFyY2ggcmVzdWx0cyBncm91cGVkIGJ5IHNvdXJjZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ3JvdXBSZXN1bHRzKHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdKToge3NvdXJjZTogU2VhcmNoU291cmNlOyByZXN1bHRzOiBTZWFyY2hSZXN1bHRbXX1bXSB7XHJcbiAgICBjb25zdCBncm91cGVkID0gbmV3IE1hcDxTZWFyY2hTb3VyY2UsIFNlYXJjaFJlc3VsdFtdPigpO1xyXG4gICAgcmVzdWx0cy5mb3JFYWNoKChyZXN1bHQ6IFNlYXJjaFJlc3VsdCkgPT4ge1xyXG4gICAgICBjb25zdCBzb3VyY2UgPSByZXN1bHQuc291cmNlO1xyXG4gICAgICBsZXQgc291cmNlUmVzdWx0cyA9IGdyb3VwZWQuZ2V0KHNvdXJjZSk7XHJcbiAgICAgIGlmIChzb3VyY2VSZXN1bHRzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBzb3VyY2VSZXN1bHRzID0gW107XHJcbiAgICAgICAgZ3JvdXBlZC5zZXQoc291cmNlLCBzb3VyY2VSZXN1bHRzKTtcclxuICAgICAgfVxyXG4gICAgICBzb3VyY2VSZXN1bHRzLnB1c2gocmVzdWx0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBBcnJheS5mcm9tKGdyb3VwZWQua2V5cygpKS5tYXAoKHNvdXJjZTogU2VhcmNoU291cmNlKSA9PiB7XHJcbiAgICAgIHJldHVybiB7c291cmNlLCByZXN1bHRzOiBncm91cGVkLmdldChzb3VyY2UpfTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=