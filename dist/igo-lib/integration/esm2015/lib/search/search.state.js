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
export class SearchState {
    /**
     * @param {?} searchSourceService
     */
    constructor(searchSourceService) {
        this.searchSourceService = searchSourceService;
        /**
         * Store that holds the search results
         */
        this.store = new EntityStore([]);
    }
    /**
     * Search types currently enabled in the search source service
     * @return {?}
     */
    get searchTypes() {
        return this.searchSourceService
            .getEnabledSources()
            .map((/**
         * @param {?} source
         * @return {?}
         */
        (source) => ((/** @type {?} */ (source.constructor))).type));
    }
}
SearchState.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
SearchState.ctorParameters = () => [
    { type: SearchSourceService }
];
/** @nocollapse */ SearchState.ngInjectableDef = i0.defineInjectable({ factory: function SearchState_Factory() { return new SearchState(i0.inject(i1.SearchSourceService)); }, token: SearchState, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnN0YXRlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvaW50ZWdyYXRpb24vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NlYXJjaC5zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzNDLE9BQU8sRUFBZ0IsbUJBQW1CLEVBQWdCLE1BQU0sV0FBVyxDQUFDOzs7Ozs7QUFRNUUsTUFBTSxPQUFPLFdBQVc7Ozs7SUFldEIsWUFBb0IsbUJBQXdDO1FBQXhDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7Ozs7UUFYckQsVUFBSyxHQUE4QixJQUFJLFdBQVcsQ0FBZSxFQUFFLENBQUMsQ0FBQztJQVdiLENBQUM7Ozs7O0lBTmhFLElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLG1CQUFtQjthQUM1QixpQkFBaUIsRUFBRTthQUNuQixHQUFHOzs7O1FBQUMsQ0FBQyxNQUFvQixFQUFFLEVBQUUsQ0FBQyxDQUFDLG1CQUFBLE1BQU0sQ0FBQyxXQUFXLEVBQU8sQ0FBQyxDQUFDLElBQUksRUFBQyxDQUFDO0lBQ3JFLENBQUM7OztZQWhCRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFQc0IsbUJBQW1COzs7Ozs7OztJQVl4Qyw0QkFBNEU7Ozs7O0lBV2hFLDBDQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEVudGl0eVN0b3JlIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0LCBTZWFyY2hTb3VyY2VTZXJ2aWNlLCBTZWFyY2hTb3VyY2UgfSBmcm9tICdAaWdvMi9nZW8nO1xyXG5cclxuLyoqXHJcbiAqIFNlcnZpY2UgdGhhdCBob2xkcyB0aGUgc3RhdGUgb2YgdGhlIHNlYXJjaCBtb2R1bGVcclxuICovXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFNlYXJjaFN0YXRlIHtcclxuICAvKipcclxuICAgKiBTdG9yZSB0aGF0IGhvbGRzIHRoZSBzZWFyY2ggcmVzdWx0c1xyXG4gICAqL1xyXG4gIHB1YmxpYyBzdG9yZTogRW50aXR5U3RvcmU8U2VhcmNoUmVzdWx0PiA9IG5ldyBFbnRpdHlTdG9yZTxTZWFyY2hSZXN1bHQ+KFtdKTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHR5cGVzIGN1cnJlbnRseSBlbmFibGVkIGluIHRoZSBzZWFyY2ggc291cmNlIHNlcnZpY2VcclxuICAgKi9cclxuICBnZXQgc2VhcmNoVHlwZXMoKTogc3RyaW5nW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VhcmNoU291cmNlU2VydmljZVxyXG4gICAgICAuZ2V0RW5hYmxlZFNvdXJjZXMoKVxyXG4gICAgICAubWFwKChzb3VyY2U6IFNlYXJjaFNvdXJjZSkgPT4gKHNvdXJjZS5jb25zdHJ1Y3RvciBhcyBhbnkpLnR5cGUpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZWFyY2hTb3VyY2VTZXJ2aWNlOiBTZWFyY2hTb3VyY2VTZXJ2aWNlKSB7fVxyXG59XHJcbiJdfQ==