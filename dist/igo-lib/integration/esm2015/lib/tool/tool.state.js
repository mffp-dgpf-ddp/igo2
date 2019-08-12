/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Toolbox, ToolService } from '@igo2/common';
import * as i0 from "@angular/core";
import * as i1 from "@igo2/common";
/**
 * Service that holds the state of the search module
 */
export class ToolState {
    /**
     * @param {?} toolService
     */
    constructor(toolService) {
        this.toolService = toolService;
        /**
         * Toolbox that holds main tools
         */
        this.toolbox = new Toolbox();
        this.toolbox.setTools(this.toolService.getTools());
    }
}
ToolState.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ToolState.ctorParameters = () => [
    { type: ToolService }
];
/** @nocollapse */ ToolState.ngInjectableDef = i0.defineInjectable({ factory: function ToolState_Factory() { return new ToolState(i0.inject(i1.ToolService)); }, token: ToolState, providedIn: "root" });
if (false) {
    /**
     * Toolbox that holds main tools
     * @type {?}
     */
    ToolState.prototype.toolbox;
    /**
     * @type {?}
     * @private
     */
    ToolState.prototype.toolService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbC5zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2ludGVncmF0aW9uLyIsInNvdXJjZXMiOlsibGliL3Rvb2wvdG9vbC5zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7Ozs7O0FBUXBELE1BQU0sT0FBTyxTQUFTOzs7O0lBTXBCLFlBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhOzs7O1FBRjVDLFlBQU8sR0FBWSxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBRy9CLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUNyRCxDQUFDOzs7WUFYRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFQaUIsV0FBVzs7Ozs7Ozs7SUFZM0IsNEJBQWlDOzs7OztJQUVyQixnQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBUb29sYm94LCBUb29sU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG4vKipcclxuICogU2VydmljZSB0aGF0IGhvbGRzIHRoZSBzdGF0ZSBvZiB0aGUgc2VhcmNoIG1vZHVsZVxyXG4gKi9cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVG9vbFN0YXRlIHtcclxuICAvKipcclxuICAgKiBUb29sYm94IHRoYXQgaG9sZHMgbWFpbiB0b29sc1xyXG4gICAqL1xyXG4gIHRvb2xib3g6IFRvb2xib3ggPSBuZXcgVG9vbGJveCgpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRvb2xTZXJ2aWNlOiBUb29sU2VydmljZSkge1xyXG4gICAgdGhpcy50b29sYm94LnNldFRvb2xzKHRoaXMudG9vbFNlcnZpY2UuZ2V0VG9vbHMoKSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==