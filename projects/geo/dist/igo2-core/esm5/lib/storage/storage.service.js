/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { StorageScope } from './storage.interface';
import * as i0 from "@angular/core";
import * as i1 from "../config/config.service";
var StorageService = /** @class */ (function () {
    function StorageService(config) {
        this.config = config;
        this.options = this.config.getConfig('storage') || { key: 'igo' };
    }
    /**
     * Use to get the data found in storage file
     */
    /**
     * Use to get the data found in storage file
     * @param {?} key
     * @param {?=} scope
     * @return {?}
     */
    StorageService.prototype.get = /**
     * Use to get the data found in storage file
     * @param {?} key
     * @param {?=} scope
     * @return {?}
     */
    function (key, scope) {
        /** @type {?} */
        var value;
        if (!scope || scope === StorageScope.SESSION) {
            value = sessionStorage.getItem(this.options.key + "." + key);
        }
        if (scope === StorageScope.LOCAL || (!value && !scope)) {
            value = localStorage.getItem(this.options.key + "." + key);
        }
        if (value) {
            try {
                value = JSON.parse(value);
            }
            catch (_a) {
                value = value;
            }
        }
        return value;
    };
    /**
     * @param {?} key
     * @param {?} value
     * @param {?=} scope
     * @return {?}
     */
    StorageService.prototype.set = /**
     * @param {?} key
     * @param {?} value
     * @param {?=} scope
     * @return {?}
     */
    function (key, value, scope) {
        if (scope === void 0) { scope = StorageScope.LOCAL; }
        if (scope === StorageScope.SESSION) {
            sessionStorage.setItem(this.options.key + "." + key, JSON.stringify(value));
        }
        else {
            localStorage.setItem(this.options.key + "." + key, JSON.stringify(value));
        }
    };
    /**
     * @param {?} key
     * @param {?=} scope
     * @return {?}
     */
    StorageService.prototype.remove = /**
     * @param {?} key
     * @param {?=} scope
     * @return {?}
     */
    function (key, scope) {
        if (scope === void 0) { scope = StorageScope.LOCAL; }
        if (scope === StorageScope.SESSION) {
            sessionStorage.removeItem(this.options.key + "." + key);
        }
        else {
            localStorage.removeItem(this.options.key + "." + key);
        }
    };
    StorageService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    StorageService.ctorParameters = function () { return [
        { type: ConfigService }
    ]; };
    /** @nocollapse */ StorageService.ngInjectableDef = i0.defineInjectable({ factory: function StorageService_Factory() { return new StorageService(i0.inject(i1.ConfigService)); }, token: StorageService, providedIn: "root" });
    return StorageService;
}());
export { StorageService };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    StorageService.prototype.options;
    /**
     * @type {?}
     * @private
     */
    StorageService.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zdG9yYWdlL3N0b3JhZ2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBa0IsTUFBTSxxQkFBcUIsQ0FBQzs7O0FBRW5FO0lBTUUsd0JBQW9CLE1BQXFCO1FBQXJCLFdBQU0sR0FBTixNQUFNLENBQWU7UUFDdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUNwRSxDQUFDO0lBQ0Q7O09BRUc7Ozs7Ozs7SUFDSCw0QkFBRzs7Ozs7O0lBQUgsVUFBSSxHQUFXLEVBQUUsS0FBb0I7O1lBQy9CLEtBQVU7UUFFZCxJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssS0FBSyxZQUFZLENBQUMsT0FBTyxFQUFFO1lBQzVDLEtBQUssR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxTQUFJLEdBQUssQ0FBQyxDQUFDO1NBQzlEO1FBRUQsSUFBSSxLQUFLLEtBQUssWUFBWSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdEQsS0FBSyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQUksR0FBSyxDQUFDLENBQUM7U0FDNUQ7UUFFRCxJQUFJLEtBQUssRUFBRTtZQUNULElBQUk7Z0JBQ0YsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDM0I7WUFBQyxXQUFNO2dCQUNOLEtBQUssR0FBRyxLQUFLLENBQUM7YUFDZjtTQUNGO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7Ozs7O0lBRUQsNEJBQUc7Ozs7OztJQUFILFVBQ0UsR0FBVyxFQUNYLEtBQXlDLEVBQ3pDLEtBQXdDO1FBQXhDLHNCQUFBLEVBQUEsUUFBc0IsWUFBWSxDQUFDLEtBQUs7UUFFeEMsSUFBSSxLQUFLLEtBQUssWUFBWSxDQUFDLE9BQU8sRUFBRTtZQUNsQyxjQUFjLENBQUMsT0FBTyxDQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBSSxHQUFLLEVBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQ3RCLENBQUM7U0FDSDthQUFNO1lBQ0wsWUFBWSxDQUFDLE9BQU8sQ0FBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBSSxHQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQzNFO0lBQ0gsQ0FBQzs7Ozs7O0lBRUQsK0JBQU07Ozs7O0lBQU4sVUFBTyxHQUFXLEVBQUUsS0FBd0M7UUFBeEMsc0JBQUEsRUFBQSxRQUFzQixZQUFZLENBQUMsS0FBSztRQUMxRCxJQUFJLEtBQUssS0FBSyxZQUFZLENBQUMsT0FBTyxFQUFFO1lBQ2xDLGNBQWMsQ0FBQyxVQUFVLENBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQUksR0FBSyxDQUFDLENBQUM7U0FDekQ7YUFBTTtZQUNMLFlBQVksQ0FBQyxVQUFVLENBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQUksR0FBSyxDQUFDLENBQUM7U0FDdkQ7SUFDSCxDQUFDOztnQkF2REYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFMUSxhQUFhOzs7eUJBRnRCO0NBNkRDLEFBeERELElBd0RDO1NBckRZLGNBQWM7Ozs7OztJQUN6QixpQ0FBa0M7Ozs7O0lBRXRCLGdDQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi9jb25maWcvY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdG9yYWdlU2NvcGUsIFN0b3JhZ2VPcHRpb25zIH0gZnJvbSAnLi9zdG9yYWdlLmludGVyZmFjZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdG9yYWdlU2VydmljZSB7XHJcbiAgcHJvdGVjdGVkIG9wdGlvbnM6IFN0b3JhZ2VPcHRpb25zO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkge1xyXG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdzdG9yYWdlJykgfHwgeyBrZXk6ICdpZ28nIH07XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBnZXQgdGhlIGRhdGEgZm91bmQgaW4gc3RvcmFnZSBmaWxlXHJcbiAgICovXHJcbiAgZ2V0KGtleTogc3RyaW5nLCBzY29wZT86IFN0b3JhZ2VTY29wZSk6IHN0cmluZyB8IG9iamVjdCB8IGJvb2xlYW4gfCBudW1iZXIge1xyXG4gICAgbGV0IHZhbHVlOiBhbnk7XHJcblxyXG4gICAgaWYgKCFzY29wZSB8fCBzY29wZSA9PT0gU3RvcmFnZVNjb3BlLlNFU1NJT04pIHtcclxuICAgICAgdmFsdWUgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGAke3RoaXMub3B0aW9ucy5rZXl9LiR7a2V5fWApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzY29wZSA9PT0gU3RvcmFnZVNjb3BlLkxPQ0FMIHx8ICghdmFsdWUgJiYgIXNjb3BlKSkge1xyXG4gICAgICB2YWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke3RoaXMub3B0aW9ucy5rZXl9LiR7a2V5fWApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHZhbHVlID0gSlNPTi5wYXJzZSh2YWx1ZSk7XHJcbiAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgIHZhbHVlID0gdmFsdWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBzZXQoXHJcbiAgICBrZXk6IHN0cmluZyxcclxuICAgIHZhbHVlOiBzdHJpbmcgfCBvYmplY3QgfCBib29sZWFuIHwgbnVtYmVyLFxyXG4gICAgc2NvcGU6IFN0b3JhZ2VTY29wZSA9IFN0b3JhZ2VTY29wZS5MT0NBTFxyXG4gICkge1xyXG4gICAgaWYgKHNjb3BlID09PSBTdG9yYWdlU2NvcGUuU0VTU0lPTikge1xyXG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFxyXG4gICAgICAgIGAke3RoaXMub3B0aW9ucy5rZXl9LiR7a2V5fWAsXHJcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkodmFsdWUpXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgJHt0aGlzLm9wdGlvbnMua2V5fS4ke2tleX1gLCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlKGtleTogc3RyaW5nLCBzY29wZTogU3RvcmFnZVNjb3BlID0gU3RvcmFnZVNjb3BlLkxPQ0FMKSB7XHJcbiAgICBpZiAoc2NvcGUgPT09IFN0b3JhZ2VTY29wZS5TRVNTSU9OKSB7XHJcbiAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oYCR7dGhpcy5vcHRpb25zLmtleX0uJHtrZXl9YCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgJHt0aGlzLm9wdGlvbnMua2V5fS4ke2tleX1gKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19