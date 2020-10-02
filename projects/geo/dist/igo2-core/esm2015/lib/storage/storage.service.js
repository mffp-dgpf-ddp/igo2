/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { StorageScope } from './storage.interface';
import * as i0 from "@angular/core";
import * as i1 from "../config/config.service";
export class StorageService {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.config = config;
        this.options = this.config.getConfig('storage') || { key: 'igo' };
    }
    /**
     * Use to get the data found in storage file
     * @param {?} key
     * @param {?=} scope
     * @return {?}
     */
    get(key, scope) {
        /** @type {?} */
        let value;
        if (!scope || scope === StorageScope.SESSION) {
            value = sessionStorage.getItem(`${this.options.key}.${key}`);
        }
        if (scope === StorageScope.LOCAL || (!value && !scope)) {
            value = localStorage.getItem(`${this.options.key}.${key}`);
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
    }
    /**
     * @param {?} key
     * @param {?} value
     * @param {?=} scope
     * @return {?}
     */
    set(key, value, scope = StorageScope.LOCAL) {
        if (scope === StorageScope.SESSION) {
            sessionStorage.setItem(`${this.options.key}.${key}`, JSON.stringify(value));
        }
        else {
            localStorage.setItem(`${this.options.key}.${key}`, JSON.stringify(value));
        }
    }
    /**
     * @param {?} key
     * @param {?=} scope
     * @return {?}
     */
    remove(key, scope = StorageScope.LOCAL) {
        if (scope === StorageScope.SESSION) {
            sessionStorage.removeItem(`${this.options.key}.${key}`);
        }
        else {
            localStorage.removeItem(`${this.options.key}.${key}`);
        }
    }
}
StorageService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
StorageService.ctorParameters = () => [
    { type: ConfigService }
];
/** @nocollapse */ StorageService.ngInjectableDef = i0.defineInjectable({ factory: function StorageService_Factory() { return new StorageService(i0.inject(i1.ConfigService)); }, token: StorageService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zdG9yYWdlL3N0b3JhZ2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBa0IsTUFBTSxxQkFBcUIsQ0FBQzs7O0FBS25FLE1BQU0sT0FBTyxjQUFjOzs7O0lBR3pCLFlBQW9CLE1BQXFCO1FBQXJCLFdBQU0sR0FBTixNQUFNLENBQWU7UUFDdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUNwRSxDQUFDOzs7Ozs7O0lBSUQsR0FBRyxDQUFDLEdBQVcsRUFBRSxLQUFvQjs7WUFDL0IsS0FBVTtRQUVkLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxLQUFLLFlBQVksQ0FBQyxPQUFPLEVBQUU7WUFDNUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQzlEO1FBRUQsSUFBSSxLQUFLLEtBQUssWUFBWSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdEQsS0FBSyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQzVEO1FBRUQsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJO2dCQUNGLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzNCO1lBQUMsV0FBTTtnQkFDTixLQUFLLEdBQUcsS0FBSyxDQUFDO2FBQ2Y7U0FDRjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Ozs7OztJQUVELEdBQUcsQ0FDRCxHQUFXLEVBQ1gsS0FBeUMsRUFDekMsUUFBc0IsWUFBWSxDQUFDLEtBQUs7UUFFeEMsSUFBSSxLQUFLLEtBQUssWUFBWSxDQUFDLE9BQU8sRUFBRTtZQUNsQyxjQUFjLENBQUMsT0FBTyxDQUNwQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBRSxFQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUN0QixDQUFDO1NBQ0g7YUFBTTtZQUNMLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDM0U7SUFDSCxDQUFDOzs7Ozs7SUFFRCxNQUFNLENBQUMsR0FBVyxFQUFFLFFBQXNCLFlBQVksQ0FBQyxLQUFLO1FBQzFELElBQUksS0FBSyxLQUFLLFlBQVksQ0FBQyxPQUFPLEVBQUU7WUFDbEMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDekQ7YUFBTTtZQUNMLFlBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZEO0lBQ0gsQ0FBQzs7O1lBdkRGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQUxRLGFBQWE7Ozs7Ozs7O0lBT3BCLGlDQUFrQzs7Ozs7SUFFdEIsZ0NBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4uL2NvbmZpZy9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0b3JhZ2VTY29wZSwgU3RvcmFnZU9wdGlvbnMgfSBmcm9tICcuL3N0b3JhZ2UuaW50ZXJmYWNlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFN0b3JhZ2VTZXJ2aWNlIHtcclxuICBwcm90ZWN0ZWQgb3B0aW9uczogU3RvcmFnZU9wdGlvbnM7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmNvbmZpZy5nZXRDb25maWcoJ3N0b3JhZ2UnKSB8fCB7IGtleTogJ2lnbycgfTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGdldCB0aGUgZGF0YSBmb3VuZCBpbiBzdG9yYWdlIGZpbGVcclxuICAgKi9cclxuICBnZXQoa2V5OiBzdHJpbmcsIHNjb3BlPzogU3RvcmFnZVNjb3BlKTogc3RyaW5nIHwgb2JqZWN0IHwgYm9vbGVhbiB8IG51bWJlciB7XHJcbiAgICBsZXQgdmFsdWU6IGFueTtcclxuXHJcbiAgICBpZiAoIXNjb3BlIHx8IHNjb3BlID09PSBTdG9yYWdlU2NvcGUuU0VTU0lPTikge1xyXG4gICAgICB2YWx1ZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oYCR7dGhpcy5vcHRpb25zLmtleX0uJHtrZXl9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNjb3BlID09PSBTdG9yYWdlU2NvcGUuTE9DQUwgfHwgKCF2YWx1ZSAmJiAhc2NvcGUpKSB7XHJcbiAgICAgIHZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7dGhpcy5vcHRpb25zLmtleX0uJHtrZXl9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdmFsdWUgPSBKU09OLnBhcnNlKHZhbHVlKTtcclxuICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgdmFsdWUgPSB2YWx1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHNldChcclxuICAgIGtleTogc3RyaW5nLFxyXG4gICAgdmFsdWU6IHN0cmluZyB8IG9iamVjdCB8IGJvb2xlYW4gfCBudW1iZXIsXHJcbiAgICBzY29wZTogU3RvcmFnZVNjb3BlID0gU3RvcmFnZVNjb3BlLkxPQ0FMXHJcbiAgKSB7XHJcbiAgICBpZiAoc2NvcGUgPT09IFN0b3JhZ2VTY29wZS5TRVNTSU9OKSB7XHJcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXHJcbiAgICAgICAgYCR7dGhpcy5vcHRpb25zLmtleX0uJHtrZXl9YCxcclxuICAgICAgICBKU09OLnN0cmluZ2lmeSh2YWx1ZSlcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGAke3RoaXMub3B0aW9ucy5rZXl9LiR7a2V5fWAsIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW1vdmUoa2V5OiBzdHJpbmcsIHNjb3BlOiBTdG9yYWdlU2NvcGUgPSBTdG9yYWdlU2NvcGUuTE9DQUwpIHtcclxuICAgIGlmIChzY29wZSA9PT0gU3RvcmFnZVNjb3BlLlNFU1NJT04pIHtcclxuICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShgJHt0aGlzLm9wdGlvbnMua2V5fS4ke2tleX1gKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGAke3RoaXMub3B0aW9ucy5rZXl9LiR7a2V5fWApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=