/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ContentChild, ChangeDetectionStrategy, ChangeDetectorRef, TemplateRef } from '@angular/core';
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
                    template: "<igo-list [navigation]=\"true\">\r\n  <ng-template\r\n    #groupTemplate\r\n    ngFor let-group\r\n    [ngForOf]=\"results$ | async\">\r\n\r\n    <igo-collapsible\r\n      *ngIf=\"mode === searchResultMode.Grouped; else flatTemplate\"\r\n      [title]=\"computeGroupTitle(group)\">\r\n      <ng-container *ngTemplateOutlet=\"storeItemTemplate; context: {results: group.results}\"></ng-container>\r\n    </igo-collapsible>\r\n\r\n    <ng-template #flatTemplate>\r\n      <ng-container *ngTemplateOutlet=\"storeItemTemplate; context: {results: group.results}\"></ng-container>\r\n    </ng-template>\r\n\r\n    <ng-template #storeItemTemplate let-results=\"results\">\r\n      <ng-template ngFor let-result [ngForOf]=\"results\">\r\n        <igo-search-results-item\r\n          igoListItem\r\n          color=\"accent\"\r\n          [result]=\"result\"\r\n          [focused]=\"store.state.get(result).focused\"\r\n          [selected]=\"store.state.get(result).selected\"\r\n          (focus)=\"onResultFocus(result)\"\r\n          (select)=\"onResultSelect(result)\">\r\n\r\n          <ng-container igoSearchItemToolbar\r\n            [ngTemplateOutlet]=\"templateSearchToolbar\"\r\n            [ngTemplateOutletContext]=\"{result: result}\">\r\n          </ng-container>\r\n\r\n        </igo-search-results-item>\r\n      </ng-template>\r\n    </ng-template>\r\n\r\n  </ng-template>\r\n</igo-list>\r\n",
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
        resultSelect: [{ type: Output }],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zZWFyY2gtcmVzdWx0cy9zZWFyY2gtcmVzdWx0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osWUFBWSxFQUNaLHVCQUF1QixFQUN2QixpQkFBaUIsRUFFakIsV0FBVyxFQUVaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBYyxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7O0lBTTdELFNBQVUsU0FBUztJQUNuQixNQUFPLE1BQU07Ozs7Ozs7QUFPZjtJQWlERSxnQ0FBb0IsS0FBd0I7UUFBeEIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7Ozs7O1FBdkNyQyxxQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQzs7OztRQWVsQyxTQUFJLEdBQXFCLGdCQUFnQixDQUFDLE9BQU8sQ0FBQzs7OztRQUtqRCxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFnQixDQUFDOzs7O1FBSy9DLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQWdCLENBQUM7SUFjWCxDQUFDO0lBVmhELHNCQUFJLDRDQUFROzs7O1FBQVo7WUFDRSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO2dCQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUNyQztZQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQU9EOzs7T0FHRzs7Ozs7O0lB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YUFBYSxDQUFDLENBQUM7YUFDcEM7WUFDRCxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdCLENBQUMsRUFBQyxDQUFDO1FBRUgsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUc7Ozs7UUFBQyxVQUFDLE1BQW9CO1lBQ3pELE9BQU8sRUFBQyxNQUFNLFFBQUEsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBQyxDQUFDO1FBQ2hELENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0JBckpGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixzNENBQThDO29CQUM5QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7Ozs7Z0JBM0JDLGlCQUFpQjs7O3dCQTJDaEIsS0FBSzt1QkFLTCxLQUFLOzhCQUtMLE1BQU07K0JBS04sTUFBTTt3Q0FFTixZQUFZLFNBQUMsc0JBQXNCOztJQWlIdEMsNkJBQUM7Q0FBQSxBQXRKRCxJQXNKQztTQWpKWSxzQkFBc0I7Ozs7Ozs7SUFLakMsa0RBQTJDOzs7Ozs7SUFLM0MseUNBQWtEOzs7OztJQUtsRCx1Q0FBMEM7Ozs7O0lBSzFDLHNDQUEyRDs7Ozs7SUFLM0QsNkNBQXlEOzs7OztJQUt6RCw4Q0FBMEQ7O0lBRTFELHVEQUE4RTs7Ozs7SUFROUUsMkNBRUU7Ozs7O0lBRVUsdUNBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBDb250ZW50Q2hpbGQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgT25Jbml0LFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIE9uRGVzdHJveVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgRU1QVFksIHRpbWVyIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBFbnRpdHlTdG9yZSwgRW50aXR5U3RvcmVXYXRjaGVyIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCB9IGZyb20gJy4uL3NoYXJlZC9zZWFyY2guaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZSB9IGZyb20gJy4uL3NoYXJlZC9zb3VyY2VzL3NvdXJjZSc7XHJcblxyXG5leHBvcnQgZW51bSBTZWFyY2hSZXN1bHRNb2RlIHtcclxuICBHcm91cGVkID0gJ2dyb3VwZWQnLFxyXG4gIEZsYXQgPSAnZmxhdCdcclxufVxyXG5cclxuLyoqXHJcbiAqIExpc3Qgb2Ygc2VhcmNoIHJlc3VsdHMgd2l0aCBmb2N1cyBhbmQgc2VsZWN0aW9uIGNhcGFiaWxpdGllcy5cclxuICogVGhpcyBjb21wb25lbnQgaXMgZHVtYiBhbmQgb25seSBlbWl0cyBldmVudHMuXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1zZWFyY2gtcmVzdWx0cycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NlYXJjaC1yZXN1bHRzLmNvbXBvbmVudC5odG1sJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VhcmNoUmVzdWx0c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAvKipcclxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIFNlYXJjaFJlc3VsdE1vZGUgZW51bVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZWFyY2hSZXN1bHRNb2RlID0gU2VhcmNoUmVzdWx0TW9kZTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHJlc3VsdHMgc3RvcmUgd2F0Y2hlclxyXG4gICAqL1xyXG4gIHByaXZhdGUgd2F0Y2hlcjogRW50aXR5U3RvcmVXYXRjaGVyPFNlYXJjaFJlc3VsdD47XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCByZXN1bHRzIHN0b3JlXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3RvcmU6IEVudGl0eVN0b3JlPFNlYXJjaFJlc3VsdD47XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCByZXN1bHRzIGRpc3BsYXkgbW9kZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1vZGU6IFNlYXJjaFJlc3VsdE1vZGUgPSBTZWFyY2hSZXN1bHRNb2RlLkdyb3VwZWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiBhIHJlc3VsdCBpcyBmb2N1c2VkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHJlc3VsdEZvY3VzID0gbmV3IEV2ZW50RW1pdHRlcjxTZWFyY2hSZXN1bHQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiBhIHJlc3VsdCBpcyBzZWxlY3RlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSByZXN1bHRTZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPFNlYXJjaFJlc3VsdD4oKTtcclxuXHJcbiAgQENvbnRlbnRDaGlsZCgnaWdvU2VhcmNoSXRlbVRvb2xiYXInKSB0ZW1wbGF0ZVNlYXJjaFRvb2xiYXI6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIGdldCByZXN1bHRzJCgpOiBPYnNlcnZhYmxlPHtzb3VyY2U6IFNlYXJjaFNvdXJjZTsgcmVzdWx0czogU2VhcmNoUmVzdWx0W119W10+IHtcclxuICAgIGlmICh0aGlzLl9yZXN1bHRzJCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuX3Jlc3VsdHMkID0gdGhpcy5saWZ0UmVzdWx0cygpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX3Jlc3VsdHMkO1xyXG4gIH1cclxuICBwcml2YXRlIF9yZXN1bHRzJDogT2JzZXJ2YWJsZTxcclxuICAgIHtzb3VyY2U6IFNlYXJjaFNvdXJjZTsgcmVzdWx0czogU2VhcmNoUmVzdWx0W119W11cclxuICA+O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cclxuXHJcbiAgLyoqXHJcbiAgICogQmluZCB0aGUgc2VhcmNoIHJlc3VsdHMgc3RvcmUgdG8gdGhlIHdhdGNoZXJcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMud2F0Y2hlciA9IG5ldyBFbnRpdHlTdG9yZVdhdGNoZXIodGhpcy5zdG9yZSwgdGhpcy5jZFJlZik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbmJpbmQgdGhlIHNlYXJjaCByZXN1bHRzIHN0b3JlIGZyb20gdGhlIHdhdGNoZXJcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMud2F0Y2hlci5kZXN0cm95KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGEgcmVzdWx0IGlzIGZvY3VzZWQsIHVwZGF0ZSBpdCdzIHN0YXRlIGluIHRoZSBzdG9yZSBhbmQgZW1pdFxyXG4gICAqIGFuIGV2ZW50LlxyXG4gICAqIEBwYXJhbSByZXN1bHQgU2VhcmNoIHJlc3VsdFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uUmVzdWx0Rm9jdXMocmVzdWx0OiBTZWFyY2hSZXN1bHQpIHtcclxuICAgIHRoaXMuc3RvcmUuc3RhdGUudXBkYXRlKHJlc3VsdCwge2ZvY3VzZWQ6IHRydWV9LCB0cnVlKTtcclxuICAgIHRoaXMucmVzdWx0Rm9jdXMuZW1pdChyZXN1bHQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29tcHV0ZSBhIGdyb3VwIHRpdGxlXHJcbiAgICogQHBhcmFtIGdyb3VwIFNlYXJjaCByZXN1bHRzIGdyb3VwXHJcbiAgICogQHJldHVybnMgR3JvdXAgdGl0bGVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBjb21wdXRlR3JvdXBUaXRsZShncm91cDoge3NvdXJjZTogU2VhcmNoU291cmNlOyByZXN1bHRzOiBTZWFyY2hSZXN1bHRbXX0pOiBzdHJpbmcge1xyXG4gICAgY29uc3QgcGFydHMgPSBbZ3JvdXAuc291cmNlLnRpdGxlXTtcclxuICAgIGNvbnN0IGNvdW50ID0gZ3JvdXAucmVzdWx0cy5sZW5ndGg7XHJcbiAgICBpZiAoY291bnQgPiAxKSB7XHJcbiAgICAgIHBhcnRzLnB1c2goYCgke2NvdW50fSlgKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXJ0cy5qb2luKCcgJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGEgcmVzdWx0IGlzIHNlbGVjdGVkLCB1cGRhdGUgaXQncyBzdGF0ZSBpbiB0aGUgc3RvcmUgYW5kIGVtaXRcclxuICAgKiBhbiBldmVudC4gQSBzZWxlY3RlZCByZXN1bHQgaXMgYWxzbyBjb25zaWRlcmVkIGZvY3VzZWRcclxuICAgKiBAcGFyYW0gcmVzdWx0IFNlYXJjaCByZXN1bHRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvblJlc3VsdFNlbGVjdChyZXN1bHQ6IFNlYXJjaFJlc3VsdCkge1xyXG4gICAgdGhpcy5zdG9yZS5zdGF0ZS51cGRhdGUocmVzdWx0LCB7Zm9jdXNlZDogdHJ1ZSwgc2VsZWN0ZWQ6IHRydWV9LCB0cnVlKTtcclxuICAgIHRoaXMucmVzdWx0U2VsZWN0LmVtaXQocmVzdWx0KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiBhbiBvYnNlcnZhYmxlIG9mIHRoZSBzZWFyY2ggcmVzdWx0cywgZ3JvdXBlZCBieSBzZWFyY2ggc291cmNlXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBncm91cGVkIHNlYXJjaCByZXN1bHRzXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBsaWZ0UmVzdWx0cygpOiBPYnNlcnZhYmxlPHtzb3VyY2U6IFNlYXJjaFNvdXJjZTsgcmVzdWx0czogU2VhcmNoUmVzdWx0W119W10+IHtcclxuICAgIHJldHVybiB0aGlzLnN0b3JlLnZpZXcuYWxsJCgpLnBpcGUoXHJcbiAgICAgIGRlYm91bmNlKChyZXN1bHRzOiBTZWFyY2hSZXN1bHRbXSkgPT4ge1xyXG4gICAgICAgIHJldHVybiByZXN1bHRzLmxlbmd0aCA9PT0gMCA/IEVNUFRZIDogdGltZXIoMjAwKTtcclxuICAgICAgfSksXHJcbiAgICAgIG1hcCgocmVzdWx0czogU2VhcmNoUmVzdWx0W10pID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ncm91cFJlc3VsdHMocmVzdWx0cy5zb3J0KHRoaXMuc29ydEJ5T3JkZXIpKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTb3J0IHRoZSByZXN1bHRzIGJ5IGRpc3BsYXkgb3JkZXIuXHJcbiAgICogQHBhcmFtIHIxIEZpcnN0IHJlc3VsdFxyXG4gICAqIEBwYXJhbSByMiBTZWNvbmQgcmVzdWx0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzb3J0QnlPcmRlcihyMTogU2VhcmNoUmVzdWx0LCByMjogU2VhcmNoUmVzdWx0KSB7XHJcbiAgICByZXR1cm4gcjEuc291cmNlLmRpc3BsYXlPcmRlciAtIHIyLnNvdXJjZS5kaXNwbGF5T3JkZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHcm91cCByZXN1bHRzIGJ5IHNlYXJjaCBzb3VyY2VcclxuICAgKiBAcGFyYW0gcmVzdWx0cyBTZWFyY2ggcmVzdWx0cyBmcm9tIGFsbCBzb3VyY2VzXHJcbiAgICogQHJldHVybnMgU2VhcmNoIHJlc3VsdHMgZ3JvdXBlZCBieSBzb3VyY2VcclxuICAgKi9cclxuICBwcml2YXRlIGdyb3VwUmVzdWx0cyhyZXN1bHRzOiBTZWFyY2hSZXN1bHRbXSk6IHtzb3VyY2U6IFNlYXJjaFNvdXJjZTsgcmVzdWx0czogU2VhcmNoUmVzdWx0W119W10ge1xyXG4gICAgY29uc3QgZ3JvdXBlZCA9IG5ldyBNYXA8U2VhcmNoU291cmNlLCBTZWFyY2hSZXN1bHRbXT4oKTtcclxuICAgIHJlc3VsdHMuZm9yRWFjaCgocmVzdWx0OiBTZWFyY2hSZXN1bHQpID0+IHtcclxuICAgICAgY29uc3Qgc291cmNlID0gcmVzdWx0LnNvdXJjZTtcclxuICAgICAgbGV0IHNvdXJjZVJlc3VsdHMgPSBncm91cGVkLmdldChzb3VyY2UpO1xyXG4gICAgICBpZiAoc291cmNlUmVzdWx0cyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgc291cmNlUmVzdWx0cyA9IFtdO1xyXG4gICAgICAgIGdyb3VwZWQuc2V0KHNvdXJjZSwgc291cmNlUmVzdWx0cyk7XHJcbiAgICAgIH1cclxuICAgICAgc291cmNlUmVzdWx0cy5wdXNoKHJlc3VsdCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbShncm91cGVkLmtleXMoKSkubWFwKChzb3VyY2U6IFNlYXJjaFNvdXJjZSkgPT4ge1xyXG4gICAgICByZXR1cm4ge3NvdXJjZSwgcmVzdWx0czogZ3JvdXBlZC5nZXQoc291cmNlKX07XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19