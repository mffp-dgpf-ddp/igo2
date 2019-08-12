/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Service where all available form fields are registered.
 */
export class FormFieldService {
    constructor() { }
    /**
     * @param {?} type
     * @param {?} component
     * @return {?}
     */
    static register(type, component) {
        FormFieldService.fields[type] = component;
    }
    /**
     * Return field component by type
     * @param {?} type Field type
     * @return {?} Field component
     */
    getFieldByType(type) {
        return FormFieldService.fields[type];
    }
}
FormFieldService.fields = {};
FormFieldService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
FormFieldService.ctorParameters = () => [];
/** @nocollapse */ FormFieldService.ngInjectableDef = i0.defineInjectable({ factory: function FormFieldService_Factory() { return new FormFieldService(); }, token: FormFieldService, providedIn: "root" });
if (false) {
    /** @type {?} */
    FormFieldService.fields;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2Zvcm0vc2hhcmVkL2Zvcm0tZmllbGQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFRM0MsTUFBTSxPQUFPLGdCQUFnQjtJQVEzQixnQkFBZSxDQUFDOzs7Ozs7SUFKaEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFZLEVBQUUsU0FBYztRQUMxQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBQzVDLENBQUM7Ozs7OztJQVNELGNBQWMsQ0FBQyxJQUFZO1FBQ3pCLE9BQU8sZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7O0FBZk0sdUJBQU0sR0FBeUIsRUFBRSxDQUFDOztZQUwxQyxVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7Ozs7SUFHQyx3QkFBeUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vKipcclxuICogU2VydmljZSB3aGVyZSBhbGwgYXZhaWxhYmxlIGZvcm0gZmllbGRzIGFyZSByZWdpc3RlcmVkLlxyXG4gKi9cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybUZpZWxkU2VydmljZSB7XHJcblxyXG4gIHN0YXRpYyBmaWVsZHM6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge307XHJcblxyXG4gIHN0YXRpYyByZWdpc3Rlcih0eXBlOiBzdHJpbmcsIGNvbXBvbmVudDogYW55KSB7XHJcbiAgICBGb3JtRmllbGRTZXJ2aWNlLmZpZWxkc1t0eXBlXSA9IGNvbXBvbmVudDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIGZpZWxkIGNvbXBvbmVudCBieSB0eXBlXHJcbiAgICogQHBhcmFtIHR5cGUgRmllbGQgdHlwZVxyXG4gICAqIEByZXR1cm5zIEZpZWxkIGNvbXBvbmVudFxyXG4gICAqL1xyXG4gIGdldEZpZWxkQnlUeXBlKHR5cGU6IHN0cmluZyk6IGFueSB7XHJcbiAgICByZXR1cm4gRm9ybUZpZWxkU2VydmljZS5maWVsZHNbdHlwZV07XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=