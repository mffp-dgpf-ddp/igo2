/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Service where runtime tool configurations are registered
 */
export class ToolService {
    constructor() { }
    /**
     * @param {?} tool
     * @return {?}
     */
    static register(tool) {
        ToolService.tools[tool.name] = tool;
    }
    /**
     * Return a tool
     * @param {?} name Tool name
     * @return {?} tool Tool
     */
    getTool(name) {
        return ToolService.tools[name];
    }
    /**
     * Return all tools
     * @return {?} tTols
     */
    getTools() {
        return Object.values(ToolService.tools);
    }
}
ToolService.tools = {};
ToolService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ToolService.ctorParameters = () => [];
/** @nocollapse */ ToolService.ngInjectableDef = i0.defineInjectable({ factory: function ToolService_Factory() { return new ToolService(); }, token: ToolService, providedIn: "root" });
if (false) {
    /** @type {?} */
    ToolService.tools;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL3Rvb2wvc2hhcmVkL3Rvb2wuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFVM0MsTUFBTSxPQUFPLFdBQVc7SUFRdEIsZ0JBQWUsQ0FBQzs7Ozs7SUFKaEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFVO1FBQ3hCLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUN0QyxDQUFDOzs7Ozs7SUFTRCxPQUFPLENBQUMsSUFBWTtRQUNsQixPQUFPLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQzs7Ozs7SUFNRCxRQUFRO1FBQ04sT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQyxDQUFDOztBQXZCTSxpQkFBSyxHQUEwQixFQUFFLENBQUM7O1lBTDFDLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7Ozs7OztJQUdDLGtCQUF5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFRvb2wgfSBmcm9tICcuL3Rvb2wuaW50ZXJmYWNlJztcclxuXHJcbi8qKlxyXG4gKiBTZXJ2aWNlIHdoZXJlIHJ1bnRpbWUgdG9vbCBjb25maWd1cmF0aW9ucyBhcmUgcmVnaXN0ZXJlZFxyXG4gKi9cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVG9vbFNlcnZpY2Uge1xyXG5cclxuICBzdGF0aWMgdG9vbHM6IHtba2V5OiBzdHJpbmddOiBUb29sfSA9IHt9O1xyXG5cclxuICBzdGF0aWMgcmVnaXN0ZXIodG9vbDogVG9vbCkge1xyXG4gICAgVG9vbFNlcnZpY2UudG9vbHNbdG9vbC5uYW1lXSA9IHRvb2w7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiBhIHRvb2xcclxuICAgKiBAcGFyYW0gbmFtZSBUb29sIG5hbWVcclxuICAgKiBAcmV0dXJucyB0b29sIFRvb2xcclxuICAgKi9cclxuICBnZXRUb29sKG5hbWU6IHN0cmluZyk6IFRvb2wge1xyXG4gICAgcmV0dXJuIFRvb2xTZXJ2aWNlLnRvb2xzW25hbWVdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIGFsbCB0b29sc1xyXG4gICAqIEByZXR1cm5zIHRUb2xzXHJcbiAgICovXHJcbiAgZ2V0VG9vbHMoKTogVG9vbFtdIHtcclxuICAgIHJldHVybiBPYmplY3QudmFsdWVzKFRvb2xTZXJ2aWNlLnRvb2xzKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==