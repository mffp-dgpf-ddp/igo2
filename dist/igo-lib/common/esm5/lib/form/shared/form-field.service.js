/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Service where all available form fields are registered.
 */
var FormFieldService = /** @class */ (function () {
    function FormFieldService() {
    }
    /**
     * @param {?} type
     * @param {?} component
     * @return {?}
     */
    FormFieldService.register = /**
     * @param {?} type
     * @param {?} component
     * @return {?}
     */
    function (type, component) {
        FormFieldService.fields[type] = component;
    };
    /**
     * Return field component by type
     * @param type Field type
     * @returns Field component
     */
    /**
     * Return field component by type
     * @param {?} type Field type
     * @return {?} Field component
     */
    FormFieldService.prototype.getFieldByType = /**
     * Return field component by type
     * @param {?} type Field type
     * @return {?} Field component
     */
    function (type) {
        return FormFieldService.fields[type];
    };
    FormFieldService.fields = {};
    FormFieldService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    FormFieldService.ctorParameters = function () { return []; };
    /** @nocollapse */ FormFieldService.ngInjectableDef = i0.defineInjectable({ factory: function FormFieldService_Factory() { return new FormFieldService(); }, token: FormFieldService, providedIn: "root" });
    return FormFieldService;
}());
export { FormFieldService };
if (false) {
    /** @type {?} */
    FormFieldService.fields;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2Zvcm0vc2hhcmVkL2Zvcm0tZmllbGQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFLM0M7SUFXRTtJQUFlLENBQUM7Ozs7OztJQUpULHlCQUFROzs7OztJQUFmLFVBQWdCLElBQVksRUFBRSxTQUFjO1FBQzFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUM7SUFDNUMsQ0FBQztJQUlEOzs7O09BSUc7Ozs7OztJQUNILHlDQUFjOzs7OztJQUFkLFVBQWUsSUFBWTtRQUN6QixPQUFPLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBZk0sdUJBQU0sR0FBeUIsRUFBRSxDQUFDOztnQkFMMUMsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7Ozs7MkJBUEQ7Q0EyQkMsQUF0QkQsSUFzQkM7U0FuQlksZ0JBQWdCOzs7SUFFM0Isd0JBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIFNlcnZpY2Ugd2hlcmUgYWxsIGF2YWlsYWJsZSBmb3JtIGZpZWxkcyBhcmUgcmVnaXN0ZXJlZC5cclxuICovXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1GaWVsZFNlcnZpY2Uge1xyXG5cclxuICBzdGF0aWMgZmllbGRzOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9O1xyXG5cclxuICBzdGF0aWMgcmVnaXN0ZXIodHlwZTogc3RyaW5nLCBjb21wb25lbnQ6IGFueSkge1xyXG4gICAgRm9ybUZpZWxkU2VydmljZS5maWVsZHNbdHlwZV0gPSBjb21wb25lbnQ7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiBmaWVsZCBjb21wb25lbnQgYnkgdHlwZVxyXG4gICAqIEBwYXJhbSB0eXBlIEZpZWxkIHR5cGVcclxuICAgKiBAcmV0dXJucyBGaWVsZCBjb21wb25lbnRcclxuICAgKi9cclxuICBnZXRGaWVsZEJ5VHlwZSh0eXBlOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgcmV0dXJuIEZvcm1GaWVsZFNlcnZpY2UuZmllbGRzW3R5cGVdO1xyXG4gIH1cclxuXHJcbn1cclxuIl19