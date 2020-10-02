/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
var MetadataService = /** @class */ (function () {
    function MetadataService() {
    }
    /**
     * @param {?} metadata
     * @return {?}
     */
    MetadataService.prototype.open = /**
     * @param {?} metadata
     * @return {?}
     */
    function (metadata) {
        if (metadata.extern) {
            window.open(metadata.url, '_blank');
        }
    };
    MetadataService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    MetadataService.ctorParameters = function () { return []; };
    /** @nocollapse */ MetadataService.ngInjectableDef = i0.defineInjectable({ factory: function MetadataService_Factory() { return new MetadataService(); }, token: MetadataService, providedIn: "root" });
    return MetadataService;
}());
export { MetadataService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhdGEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9tZXRhZGF0YS9zaGFyZWQvbWV0YWRhdGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFJM0M7SUFJRTtJQUFlLENBQUM7Ozs7O0lBRWhCLDhCQUFJOzs7O0lBQUosVUFBSyxRQUF5QjtRQUM1QixJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQzs7Z0JBVkYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7Ozs7MEJBTkQ7Q0FlQyxBQVhELElBV0M7U0FSWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTWV0YWRhdGFPcHRpb25zIH0gZnJvbSAnLi9tZXRhZGF0YS5pbnRlcmZhY2UnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTWV0YWRhdGFTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIG9wZW4obWV0YWRhdGE6IE1ldGFkYXRhT3B0aW9ucykge1xyXG4gICAgaWYgKG1ldGFkYXRhLmV4dGVybikge1xyXG4gICAgICB3aW5kb3cub3BlbihtZXRhZGF0YS51cmwsICdfYmxhbmsnKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19