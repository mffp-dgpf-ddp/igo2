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
var StyleListService = /** @class */ (function () {
    function StyleListService(injector) {
        this.injector = injector;
        this.styleList = {};
    }
    /**
     * Use to get the data found in styleList file
     */
    /**
     * Use to get the data found in styleList file
     * @param {?} key
     * @return {?}
     */
    StyleListService.prototype.getStyleList = /**
     * Use to get the data found in styleList file
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return ObjectUtils.resolve(this.styleList, key);
    };
    /**
     * This method loads "[path]" to get all styleList's variables
     */
    /**
     * This method loads "[path]" to get all styleList's variables
     * @param {?} options
     * @return {?}
     */
    StyleListService.prototype.load = /**
     * This method loads "[path]" to get all styleList's variables
     * @param {?} options
     * @return {?}
     */
    function (options) {
        var _this = this;
        /** @type {?} */
        var baseStyleList = options.default || {};
        if (!options.path) {
            this.styleList = baseStyleList;
            return true;
        }
        /** @type {?} */
        var http = this.injector.get(HttpClient);
        return new Promise((/**
         * @param {?} resolve
         * @param {?} _reject
         * @return {?}
         */
        function (resolve, _reject) {
            http
                .get(options.path)
                .pipe(catchError((/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                console.log("StyleList file " + options.path + " could not be read");
                resolve(true);
                return throwError(error.error || 'Server error');
            })))
                .subscribe((/**
             * @param {?} styleListResponse
             * @return {?}
             */
            function (styleListResponse) {
                _this.styleList = ObjectUtils.mergeDeep(baseStyleList, styleListResponse);
                resolve(true);
            }));
        }));
    };
    StyleListService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    StyleListService.ctorParameters = function () { return [
        { type: Injector }
    ]; };
    /** @nocollapse */ StyleListService.ngInjectableDef = i0.defineInjectable({ factory: function StyleListService_Factory() { return new StyleListService(i0.inject(i0.INJECTOR)); }, token: StyleListService, providedIn: "root" });
    return StyleListService;
}());
export { StyleListService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUtbGlzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ltcG9ydC1leHBvcnQvc3R5bGUtbGlzdC9zdHlsZS1saXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU1QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDOztBQUkxQztJQU1FLDBCQUFvQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBRjlCLGNBQVMsR0FBVyxFQUFFLENBQUM7SUFFVSxDQUFDO0lBRTFDOztPQUVHOzs7Ozs7SUFDSSx1Q0FBWTs7Ozs7SUFBbkIsVUFBb0IsR0FBVztRQUM3QixPQUFPLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQ7O09BRUc7Ozs7OztJQUNJLCtCQUFJOzs7OztJQUFYLFVBQVksT0FBeUI7UUFBckMsaUJBd0JDOztZQXZCTyxhQUFhLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFO1FBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO1lBQy9CLE9BQU8sSUFBSSxDQUFDO1NBQ2I7O1lBRUssSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztRQUUxQyxPQUFPLElBQUksT0FBTzs7Ozs7UUFBQyxVQUFDLE9BQU8sRUFBRSxPQUFPO1lBQ2xDLElBQUk7aUJBQ0QsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7aUJBQ2pCLElBQUksQ0FDSCxVQUFVOzs7O1lBQUMsVUFBQyxLQUFVO2dCQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFrQixPQUFPLENBQUMsSUFBSSx1QkFBb0IsQ0FBQyxDQUFDO2dCQUNoRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2QsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxjQUFjLENBQUMsQ0FBQztZQUNuRCxDQUFDLEVBQUMsQ0FDSDtpQkFDQSxTQUFTOzs7O1lBQUMsVUFBQSxpQkFBaUI7Z0JBQzFCLEtBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztnQkFDekUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLENBQUMsRUFBQyxDQUFDO1FBQ1AsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOztnQkExQ0YsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFYb0IsUUFBUTs7OzJCQUE3QjtDQW9EQyxBQTNDRCxJQTJDQztTQXhDWSxnQkFBZ0I7Ozs7OztJQUMzQixxQ0FBK0I7Ozs7O0lBRW5CLG9DQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IE9iamVjdFV0aWxzIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgU3R5bGVMaXN0T3B0aW9ucyB9IGZyb20gJy4vc3R5bGUtbGlzdC5pbnRlcmZhY2UnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU3R5bGVMaXN0U2VydmljZSB7XHJcbiAgcHJpdmF0ZSBzdHlsZUxpc3Q6IG9iamVjdCA9IHt9O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge31cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGdldCB0aGUgZGF0YSBmb3VuZCBpbiBzdHlsZUxpc3QgZmlsZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRTdHlsZUxpc3Qoa2V5OiBzdHJpbmcpOiBhbnkge1xyXG4gICAgcmV0dXJuIE9iamVjdFV0aWxzLnJlc29sdmUodGhpcy5zdHlsZUxpc3QsIGtleSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIG1ldGhvZCBsb2FkcyBcIltwYXRoXVwiIHRvIGdldCBhbGwgc3R5bGVMaXN0J3MgdmFyaWFibGVzXHJcbiAgICovXHJcbiAgcHVibGljIGxvYWQob3B0aW9uczogU3R5bGVMaXN0T3B0aW9ucykge1xyXG4gICAgY29uc3QgYmFzZVN0eWxlTGlzdCA9IG9wdGlvbnMuZGVmYXVsdCB8fCB7fTtcclxuICAgIGlmICghb3B0aW9ucy5wYXRoKSB7XHJcbiAgICAgIHRoaXMuc3R5bGVMaXN0ID0gYmFzZVN0eWxlTGlzdDtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaHR0cCA9IHRoaXMuaW5qZWN0b3IuZ2V0KEh0dHBDbGllbnQpO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgX3JlamVjdCkgPT4ge1xyXG4gICAgICBodHRwXHJcbiAgICAgICAgLmdldChvcHRpb25zLnBhdGgpXHJcbiAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcjogYW55KTogYW55ID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYFN0eWxlTGlzdCBmaWxlICR7b3B0aW9ucy5wYXRofSBjb3VsZCBub3QgYmUgcmVhZGApO1xyXG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvci5lcnJvciB8fCAnU2VydmVyIGVycm9yJyk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIClcclxuICAgICAgICAuc3Vic2NyaWJlKHN0eWxlTGlzdFJlc3BvbnNlID0+IHtcclxuICAgICAgICAgIHRoaXMuc3R5bGVMaXN0ID0gT2JqZWN0VXRpbHMubWVyZ2VEZWVwKGJhc2VTdHlsZUxpc3QsIHN0eWxlTGlzdFJlc3BvbnNlKTtcclxuICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19