/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { EntityStore } from '@igo2/common';
import * as i0 from "@angular/core";
/**
 * Service that holds the state of the query module
 */
export class QueryState {
    constructor() {
        /**
         * Store that holds the query results
         */
        this.store = new EntityStore([]);
    }
}
QueryState.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
QueryState.ctorParameters = () => [];
/** @nocollapse */ QueryState.ngInjectableDef = i0.defineInjectable({ factory: function QueryState_Factory() { return new QueryState(); }, token: QueryState, providedIn: "root" });
if (false) {
    /**
     * Store that holds the query results
     * @type {?}
     */
    QueryState.prototype.store;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuc3RhdGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9pbnRlZ3JhdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gvcXVlcnkuc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7Ozs7QUFTM0MsTUFBTSxPQUFPLFVBQVU7SUFNckI7Ozs7UUFGTyxVQUFLLEdBQThCLElBQUksV0FBVyxDQUFlLEVBQUUsQ0FBQyxDQUFDO0lBRTdELENBQUM7OztZQVRqQixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7Ozs7Ozs7SUFLQywyQkFBNEUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBFbnRpdHlTdG9yZSB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCB9IGZyb20gJ0BpZ28yL2dlbyc7XHJcblxyXG4vKipcclxuICogU2VydmljZSB0aGF0IGhvbGRzIHRoZSBzdGF0ZSBvZiB0aGUgcXVlcnkgbW9kdWxlXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBRdWVyeVN0YXRlIHtcclxuICAvKipcclxuICAgKiBTdG9yZSB0aGF0IGhvbGRzIHRoZSBxdWVyeSByZXN1bHRzXHJcbiAgICovXHJcbiAgcHVibGljIHN0b3JlOiBFbnRpdHlTdG9yZTxTZWFyY2hSZXN1bHQ+ID0gbmV3IEVudGl0eVN0b3JlPFNlYXJjaFJlc3VsdD4oW10pO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcbn1cclxuIl19