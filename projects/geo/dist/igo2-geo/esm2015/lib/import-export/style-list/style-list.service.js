/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ObjectUtils } from '@igo2/utils';
import * as i0 from "@angular/core";
export class StyleListService {
    /**
     * @param {?} injector
     */
    constructor(injector) {
        this.injector = injector;
        this.styleList = {};
    }
    /**
     * Use to get the data found in styleList file
     * @param {?} key
     * @return {?}
     */
    getStyleList(key) {
        return ObjectUtils.resolve(this.styleList, key);
    }
    /**
     * This method loads "[path]" to get all styleList's variables
     * @param {?} options
     * @return {?}
     */
    load(options) {
        /** @type {?} */
        const baseStyleList = options.default || {};
        if (!options.path) {
            this.styleList = baseStyleList;
            return true;
        }
        /** @type {?} */
        const http = this.injector.get(HttpClient);
        return new Promise((/**
         * @param {?} resolve
         * @param {?} _reject
         * @return {?}
         */
        (resolve, _reject) => {
            http
                .get(options.path)
                .pipe(catchError((/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                console.log(`StyleList file ${options.path} could not be read`);
                resolve(true);
                return throwError(error.error || 'Server error');
            })))
                .subscribe((/**
             * @param {?} styleListResponse
             * @return {?}
             */
            styleListResponse => {
                this.styleList = ObjectUtils.mergeDeep(baseStyleList, styleListResponse);
                resolve(true);
            }));
        }));
    }
}
StyleListService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
StyleListService.ctorParameters = () => [
    { type: Injector }
];
/** @nocollapse */ StyleListService.ngInjectableDef = i0.defineInjectable({ factory: function StyleListService_Factory() { return new StyleListService(i0.inject(i0.INJECTOR)); }, token: StyleListService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    StyleListService.prototype.styleList;
    /**
     * @type {?}
     * @private
     */
    StyleListService.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUtbGlzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ltcG9ydC1leHBvcnQvc3R5bGUtbGlzdC9zdHlsZS1saXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU1QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDOztBQU8xQyxNQUFNLE9BQU8sZ0JBQWdCOzs7O0lBRzNCLFlBQW9CLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFGOUIsY0FBUyxHQUFXLEVBQUUsQ0FBQztJQUVVLENBQUM7Ozs7OztJQUtuQyxZQUFZLENBQUMsR0FBVztRQUM3QixPQUFPLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNsRCxDQUFDOzs7Ozs7SUFLTSxJQUFJLENBQUMsT0FBeUI7O2NBQzdCLGFBQWEsR0FBRyxPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUU7UUFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7WUFDL0IsT0FBTyxJQUFJLENBQUM7U0FDYjs7Y0FFSyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO1FBRTFDLE9BQU8sSUFBSSxPQUFPOzs7OztRQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFO1lBQ3RDLElBQUk7aUJBQ0QsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7aUJBQ2pCLElBQUksQ0FDSCxVQUFVOzs7O1lBQUMsQ0FBQyxLQUFVLEVBQU8sRUFBRTtnQkFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsT0FBTyxDQUFDLElBQUksb0JBQW9CLENBQUMsQ0FBQztnQkFDaEUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNkLE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksY0FBYyxDQUFDLENBQUM7WUFDbkQsQ0FBQyxFQUFDLENBQ0g7aUJBQ0EsU0FBUzs7OztZQUFDLGlCQUFpQixDQUFDLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztnQkFDekUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLENBQUMsRUFBQyxDQUFDO1FBQ1AsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7WUExQ0YsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBWG9CLFFBQVE7Ozs7Ozs7O0lBYTNCLHFDQUErQjs7Ozs7SUFFbkIsb0NBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgT2JqZWN0VXRpbHMgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQgeyBTdHlsZUxpc3RPcHRpb25zIH0gZnJvbSAnLi9zdHlsZS1saXN0LmludGVyZmFjZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdHlsZUxpc3RTZXJ2aWNlIHtcclxuICBwcml2YXRlIHN0eWxlTGlzdDogb2JqZWN0ID0ge307XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gZ2V0IHRoZSBkYXRhIGZvdW5kIGluIHN0eWxlTGlzdCBmaWxlXHJcbiAgICovXHJcbiAgcHVibGljIGdldFN0eWxlTGlzdChrZXk6IHN0cmluZyk6IGFueSB7XHJcbiAgICByZXR1cm4gT2JqZWN0VXRpbHMucmVzb2x2ZSh0aGlzLnN0eWxlTGlzdCwga2V5KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgbWV0aG9kIGxvYWRzIFwiW3BhdGhdXCIgdG8gZ2V0IGFsbCBzdHlsZUxpc3QncyB2YXJpYWJsZXNcclxuICAgKi9cclxuICBwdWJsaWMgbG9hZChvcHRpb25zOiBTdHlsZUxpc3RPcHRpb25zKSB7XHJcbiAgICBjb25zdCBiYXNlU3R5bGVMaXN0ID0gb3B0aW9ucy5kZWZhdWx0IHx8IHt9O1xyXG4gICAgaWYgKCFvcHRpb25zLnBhdGgpIHtcclxuICAgICAgdGhpcy5zdHlsZUxpc3QgPSBiYXNlU3R5bGVMaXN0O1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBodHRwID0gdGhpcy5pbmplY3Rvci5nZXQoSHR0cENsaWVudCk7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCBfcmVqZWN0KSA9PiB7XHJcbiAgICAgIGh0dHBcclxuICAgICAgICAuZ2V0KG9wdGlvbnMucGF0aClcclxuICAgICAgICAucGlwZShcclxuICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yOiBhbnkpOiBhbnkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgU3R5bGVMaXN0IGZpbGUgJHtvcHRpb25zLnBhdGh9IGNvdWxkIG5vdCBiZSByZWFkYCk7XHJcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yLmVycm9yIHx8ICdTZXJ2ZXIgZXJyb3InKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoc3R5bGVMaXN0UmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zdHlsZUxpc3QgPSBPYmplY3RVdGlscy5tZXJnZURlZXAoYmFzZVN0eWxlTGlzdCwgc3R5bGVMaXN0UmVzcG9uc2UpO1xyXG4gICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=