/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class MetadataService {
    constructor() { }
    /**
     * @param {?} metadata
     * @return {?}
     */
    open(metadata) {
        if (metadata.extern) {
            window.open(metadata.url, '_blank');
        }
    }
}
MetadataService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
MetadataService.ctorParameters = () => [];
/** @nocollapse */ MetadataService.ngInjectableDef = i0.defineInjectable({ factory: function MetadataService_Factory() { return new MetadataService(); }, token: MetadataService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhdGEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9tZXRhZGF0YS9zaGFyZWQvbWV0YWRhdGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFPM0MsTUFBTSxPQUFPLGVBQWU7SUFDMUIsZ0JBQWUsQ0FBQzs7Ozs7SUFFaEIsSUFBSSxDQUFDLFFBQXlCO1FBQzVCLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDckM7SUFDSCxDQUFDOzs7WUFWRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBNZXRhZGF0YU9wdGlvbnMgfSBmcm9tICcuL21ldGFkYXRhLmludGVyZmFjZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNZXRhZGF0YVNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgb3BlbihtZXRhZGF0YTogTWV0YWRhdGFPcHRpb25zKSB7XHJcbiAgICBpZiAobWV0YWRhdGEuZXh0ZXJuKSB7XHJcbiAgICAgIHdpbmRvdy5vcGVuKG1ldGFkYXRhLnVybCwgJ19ibGFuaycpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=