/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { EntityStore } from '@igo2/common';
import { SearchSourceService } from '@igo2/geo';
import * as i0 from "@angular/core";
import * as i1 from "@igo2/geo";
/**
 * Service that holds the state of the search module
 */
var SearchState = /** @class */ (function () {
    function SearchState(searchSourceService) {
        this.searchSourceService = searchSourceService;
        /**
         * Store that holds the search results
         */
        this.store = new EntityStore([]);
    }
    Object.defineProperty(SearchState.prototype, "searchTypes", {
        /**
         * Search types currently enabled in the search source service
         */
        get: /**
         * Search types currently enabled in the search source service
         * @return {?}
         */
        function () {
            return this.searchSourceService
                .getEnabledSources()
                .map((/**
             * @param {?} source
             * @return {?}
             */
            function (source) { return ((/** @type {?} */ (source.constructor))).type; }));
        },
        enumerable: true,
        configurable: true
    });
    SearchState.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    SearchState.ctorParameters = function () { return [
        { type: SearchSourceService }
    ]; };
    /** @nocollapse */ SearchState.ngInjectableDef = i0.defineInjectable({ factory: function SearchState_Factory() { return new SearchState(i0.inject(i1.SearchSourceService)); }, token: SearchState, providedIn: "root" });
    return SearchState;
}());
export { SearchState };
if (false) {
    /**
     * Store that holds the search results
     * @type {?}
     */
    SearchState.prototype.store;
    /**
     * @type {?}
     * @private
     */
    SearchState.prototype.searchSourceService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnN0YXRlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvaW50ZWdyYXRpb24vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NlYXJjaC5zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzNDLE9BQU8sRUFBZ0IsbUJBQW1CLEVBQWdCLE1BQU0sV0FBVyxDQUFDOzs7Ozs7QUFLNUU7SUFrQkUscUJBQW9CLG1CQUF3QztRQUF4Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCOzs7O1FBWHJELFVBQUssR0FBOEIsSUFBSSxXQUFXLENBQWUsRUFBRSxDQUFDLENBQUM7SUFXYixDQUFDO0lBTmhFLHNCQUFJLG9DQUFXO1FBSGY7O1dBRUc7Ozs7O1FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxtQkFBbUI7aUJBQzVCLGlCQUFpQixFQUFFO2lCQUNuQixHQUFHOzs7O1lBQUMsVUFBQyxNQUFvQixJQUFLLE9BQUEsQ0FBQyxtQkFBQSxNQUFNLENBQUMsV0FBVyxFQUFPLENBQUMsQ0FBQyxJQUFJLEVBQWhDLENBQWdDLEVBQUMsQ0FBQztRQUNyRSxDQUFDOzs7T0FBQTs7Z0JBaEJGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBUHNCLG1CQUFtQjs7O3NCQUgxQztDQTJCQyxBQW5CRCxJQW1CQztTQWhCWSxXQUFXOzs7Ozs7SUFJdEIsNEJBQTRFOzs7OztJQVdoRSwwQ0FBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBFbnRpdHlTdG9yZSB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCwgU2VhcmNoU291cmNlU2VydmljZSwgU2VhcmNoU291cmNlIH0gZnJvbSAnQGlnbzIvZ2VvJztcclxuXHJcbi8qKlxyXG4gKiBTZXJ2aWNlIHRoYXQgaG9sZHMgdGhlIHN0YXRlIG9mIHRoZSBzZWFyY2ggbW9kdWxlXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hTdGF0ZSB7XHJcbiAgLyoqXHJcbiAgICogU3RvcmUgdGhhdCBob2xkcyB0aGUgc2VhcmNoIHJlc3VsdHNcclxuICAgKi9cclxuICBwdWJsaWMgc3RvcmU6IEVudGl0eVN0b3JlPFNlYXJjaFJlc3VsdD4gPSBuZXcgRW50aXR5U3RvcmU8U2VhcmNoUmVzdWx0PihbXSk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCB0eXBlcyBjdXJyZW50bHkgZW5hYmxlZCBpbiB0aGUgc2VhcmNoIHNvdXJjZSBzZXJ2aWNlXHJcbiAgICovXHJcbiAgZ2V0IHNlYXJjaFR5cGVzKCk6IHN0cmluZ1tdIHtcclxuICAgIHJldHVybiB0aGlzLnNlYXJjaFNvdXJjZVNlcnZpY2VcclxuICAgICAgLmdldEVuYWJsZWRTb3VyY2VzKClcclxuICAgICAgLm1hcCgoc291cmNlOiBTZWFyY2hTb3VyY2UpID0+IChzb3VyY2UuY29uc3RydWN0b3IgYXMgYW55KS50eXBlKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VhcmNoU291cmNlU2VydmljZTogU2VhcmNoU291cmNlU2VydmljZSkge31cclxufVxyXG4iXX0=