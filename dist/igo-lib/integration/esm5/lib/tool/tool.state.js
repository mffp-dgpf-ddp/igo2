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
var ToolState = /** @class */ (function () {
    function ToolState(toolService) {
        this.toolService = toolService;
        /**
         * Toolbox that holds main tools
         */
        this.toolbox = new Toolbox();
        this.toolbox.setTools(this.toolService.getTools());
    }
    ToolState.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ToolState.ctorParameters = function () { return [
        { type: ToolService }
    ]; };
    /** @nocollapse */ ToolState.ngInjectableDef = i0.defineInjectable({ factory: function ToolState_Factory() { return new ToolState(i0.inject(i1.ToolService)); }, token: ToolState, providedIn: "root" });
    return ToolState;
}());
export { ToolState };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbC5zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2ludGVncmF0aW9uLyIsInNvdXJjZXMiOlsibGliL3Rvb2wvdG9vbC5zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7Ozs7O0FBS3BEO0lBU0UsbUJBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhOzs7O1FBRjVDLFlBQU8sR0FBWSxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBRy9CLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUNyRCxDQUFDOztnQkFYRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQVBpQixXQUFXOzs7b0JBRjdCO0NBbUJDLEFBWkQsSUFZQztTQVRZLFNBQVM7Ozs7OztJQUlwQiw0QkFBaUM7Ozs7O0lBRXJCLGdDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFRvb2xib3gsIFRvb2xTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbi8qKlxyXG4gKiBTZXJ2aWNlIHRoYXQgaG9sZHMgdGhlIHN0YXRlIG9mIHRoZSBzZWFyY2ggbW9kdWxlXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUb29sU3RhdGUge1xyXG4gIC8qKlxyXG4gICAqIFRvb2xib3ggdGhhdCBob2xkcyBtYWluIHRvb2xzXHJcbiAgICovXHJcbiAgdG9vbGJveDogVG9vbGJveCA9IG5ldyBUb29sYm94KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdG9vbFNlcnZpY2U6IFRvb2xTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLnRvb2xib3guc2V0VG9vbHModGhpcy50b29sU2VydmljZS5nZXRUb29scygpKTtcclxuICB9XHJcbn1cclxuIl19