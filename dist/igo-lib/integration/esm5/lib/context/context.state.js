/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LanguageService } from '@igo2/core';
import { ToolService } from '@igo2/common';
import { ContextService } from '@igo2/context';
import { ToolState } from '../tool/tool.state';
import * as i0 from "@angular/core";
import * as i1 from "@igo2/context";
import * as i2 from "@igo2/common";
import * as i3 from "../tool/tool.state";
import * as i4 from "@igo2/core";
/**
 * Service that holds the state of the context module
 */
var ContextState = /** @class */ (function () {
    function ContextState(contextService, toolService, toolState, languageService) {
        var _this = this;
        this.contextService = contextService;
        this.toolService = toolService;
        this.toolState = toolState;
        this.languageService = languageService;
        /**
         * Observable of the active context
         */
        this.context$ = new BehaviorSubject(undefined);
        this.contextService.context$.subscribe((/**
         * @param {?} context
         * @return {?}
         */
        function (context) {
            _this.onContextChange(context);
        }));
    }
    /**
     * Set the active context
     * @param context Detailed context
     */
    /**
     * Set the active context
     * @private
     * @param {?} context Detailed context
     * @return {?}
     */
    ContextState.prototype.setContext = /**
     * Set the active context
     * @private
     * @param {?} context Detailed context
     * @return {?}
     */
    function (context) {
        this.updateTools(context);
        this.context$.next(context);
    };
    /**
     * Update the tool state with the context's tools
     * @param context Detailed context
     */
    /**
     * Update the tool state with the context's tools
     * @private
     * @param {?} context Detailed context
     * @return {?}
     */
    ContextState.prototype.updateTools = /**
     * Update the tool state with the context's tools
     * @private
     * @param {?} context Detailed context
     * @return {?}
     */
    function (context) {
        var _this = this;
        /** @type {?} */
        var toolbox = this.toolState.toolbox;
        /** @type {?} */
        var tools = [];
        /** @type {?} */
        var contextTools = context.tools || [];
        contextTools.forEach((/**
         * @param {?} contextTool
         * @return {?}
         */
        function (contextTool) {
            /** @type {?} */
            var baseTool = _this.toolService.getTool(contextTool.name);
            if (baseTool === undefined) {
                return;
            }
            /** @type {?} */
            var options = Object.assign({}, baseTool.options || {}, contextTool.options || {});
            /** @type {?} */
            var tool = Object.assign({}, baseTool, contextTool, { options: options });
            tools.push(tool);
        }));
        toolbox.setTools(tools);
        toolbox.setToolbar(context.toolbar || []);
        // TODO: This is a patch so the context service can work without
        // injecting the ToolState or without being completely refactored
        this.contextService.setTools([].concat(tools));
    };
    /**
     * Set a new context and update the tool state
     * @param context Detailed context
     */
    /**
     * Set a new context and update the tool state
     * @private
     * @param {?} context Detailed context
     * @return {?}
     */
    ContextState.prototype.onContextChange = /**
     * Set a new context and update the tool state
     * @private
     * @param {?} context Detailed context
     * @return {?}
     */
    function (context) {
        if (context === undefined) {
            return;
        }
        this.setContext(context);
    };
    ContextState.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ContextState.ctorParameters = function () { return [
        { type: ContextService },
        { type: ToolService },
        { type: ToolState },
        { type: LanguageService }
    ]; };
    /** @nocollapse */ ContextState.ngInjectableDef = i0.defineInjectable({ factory: function ContextState_Factory() { return new ContextState(i0.inject(i1.ContextService), i0.inject(i2.ToolService), i0.inject(i3.ToolState), i0.inject(i4.LanguageService)); }, token: ContextState, providedIn: "root" });
    return ContextState;
}());
export { ContextState };
if (false) {
    /**
     * Observable of the active context
     * @type {?}
     */
    ContextState.prototype.context$;
    /**
     * @type {?}
     * @private
     */
    ContextState.prototype.contextService;
    /**
     * @type {?}
     * @private
     */
    ContextState.prototype.toolService;
    /**
     * @type {?}
     * @private
     */
    ContextState.prototype.toolState;
    /**
     * @type {?}
     * @private
     */
    ContextState.prototype.languageService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2ludGVncmF0aW9uLyIsInNvdXJjZXMiOlsibGliL2NvbnRleHQvY29udGV4dC5zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXZDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDN0MsT0FBTyxFQUFRLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNqRCxPQUFPLEVBQUUsY0FBYyxFQUFtQixNQUFNLGVBQWUsQ0FBQztBQUVoRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7Ozs7OztBQUsvQztJQVNFLHNCQUNVLGNBQThCLEVBQzlCLFdBQXdCLEVBQ3hCLFNBQW9CLEVBQ3BCLGVBQWdDO1FBSjFDLGlCQVNDO1FBUlMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsb0JBQWUsR0FBZixlQUFlLENBQWlCOzs7O1FBTjFDLGFBQVEsR0FBcUMsSUFBSSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFRMUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsU0FBUzs7OztRQUFDLFVBQUMsT0FBd0I7WUFDOUQsS0FBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoQyxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7SUFDSyxpQ0FBVTs7Ozs7O0lBQWxCLFVBQW1CLE9BQXdCO1FBQ3pDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7OztJQUNLLGtDQUFXOzs7Ozs7SUFBbkIsVUFBb0IsT0FBd0I7UUFBNUMsaUJBMEJDOztZQXpCTyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPOztZQUVoQyxLQUFLLEdBQUcsRUFBRTs7WUFDVixZQUFZLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3hDLFlBQVksQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQyxXQUFpQjs7Z0JBQy9CLFFBQVEsR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQzNELElBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtnQkFDMUIsT0FBTzthQUNSOztnQkFFSyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FDM0IsRUFBRSxFQUNGLFFBQVEsQ0FBQyxPQUFPLElBQUksRUFBRSxFQUN0QixXQUFXLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FDMUI7O2dCQUNLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQztZQUNsRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25CLENBQUMsRUFBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUM7UUFFMUMsZ0VBQWdFO1FBQ2hFLGlFQUFpRTtRQUNqRSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7OztJQUNLLHNDQUFlOzs7Ozs7SUFBdkIsVUFBd0IsT0FBd0I7UUFDOUMsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQ3pCLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0IsQ0FBQzs7Z0JBdEVGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBVFEsY0FBYztnQkFEUixXQUFXO2dCQUdqQixTQUFTO2dCQUpULGVBQWU7Ozt1QkFKeEI7Q0FvRkMsQUF2RUQsSUF1RUM7U0FwRVksWUFBWTs7Ozs7O0lBSXZCLGdDQUE0RTs7Ozs7SUFHMUUsc0NBQXNDOzs7OztJQUN0QyxtQ0FBZ0M7Ozs7O0lBQ2hDLGlDQUE0Qjs7Ozs7SUFDNUIsdUNBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgVG9vbCwgVG9vbFNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5pbXBvcnQgeyBDb250ZXh0U2VydmljZSwgRGV0YWlsZWRDb250ZXh0IH0gZnJvbSAnQGlnbzIvY29udGV4dCc7XHJcblxyXG5pbXBvcnQgeyBUb29sU3RhdGUgfSBmcm9tICcuLi90b29sL3Rvb2wuc3RhdGUnO1xyXG5cclxuLyoqXHJcbiAqIFNlcnZpY2UgdGhhdCBob2xkcyB0aGUgc3RhdGUgb2YgdGhlIGNvbnRleHQgbW9kdWxlXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb250ZXh0U3RhdGUge1xyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgb2YgdGhlIGFjdGl2ZSBjb250ZXh0XHJcbiAgICovXHJcbiAgY29udGV4dCQ6IEJlaGF2aW9yU3ViamVjdDxEZXRhaWxlZENvbnRleHQ+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh1bmRlZmluZWQpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY29udGV4dFNlcnZpY2U6IENvbnRleHRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB0b29sU2VydmljZTogVG9vbFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHRvb2xTdGF0ZTogVG9vbFN0YXRlLFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5jb250ZXh0U2VydmljZS5jb250ZXh0JC5zdWJzY3JpYmUoKGNvbnRleHQ6IERldGFpbGVkQ29udGV4dCkgPT4ge1xyXG4gICAgICB0aGlzLm9uQ29udGV4dENoYW5nZShjb250ZXh0KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBhY3RpdmUgY29udGV4dFxyXG4gICAqIEBwYXJhbSBjb250ZXh0IERldGFpbGVkIGNvbnRleHRcclxuICAgKi9cclxuICBwcml2YXRlIHNldENvbnRleHQoY29udGV4dDogRGV0YWlsZWRDb250ZXh0KSB7XHJcbiAgICB0aGlzLnVwZGF0ZVRvb2xzKGNvbnRleHQpO1xyXG4gICAgdGhpcy5jb250ZXh0JC5uZXh0KGNvbnRleHQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHRoZSB0b29sIHN0YXRlIHdpdGggdGhlIGNvbnRleHQncyB0b29sc1xyXG4gICAqIEBwYXJhbSBjb250ZXh0IERldGFpbGVkIGNvbnRleHRcclxuICAgKi9cclxuICBwcml2YXRlIHVwZGF0ZVRvb2xzKGNvbnRleHQ6IERldGFpbGVkQ29udGV4dCkge1xyXG4gICAgY29uc3QgdG9vbGJveCA9IHRoaXMudG9vbFN0YXRlLnRvb2xib3g7XHJcblxyXG4gICAgY29uc3QgdG9vbHMgPSBbXTtcclxuICAgIGNvbnN0IGNvbnRleHRUb29scyA9IGNvbnRleHQudG9vbHMgfHwgW107XHJcbiAgICBjb250ZXh0VG9vbHMuZm9yRWFjaCgoY29udGV4dFRvb2w6IFRvb2wpID0+IHtcclxuICAgICAgY29uc3QgYmFzZVRvb2wgPSB0aGlzLnRvb2xTZXJ2aWNlLmdldFRvb2woY29udGV4dFRvb2wubmFtZSk7XHJcbiAgICAgIGlmIChiYXNlVG9vbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihcclxuICAgICAgICB7fSxcclxuICAgICAgICBiYXNlVG9vbC5vcHRpb25zIHx8IHt9LFxyXG4gICAgICAgIGNvbnRleHRUb29sLm9wdGlvbnMgfHwge31cclxuICAgICAgKTtcclxuICAgICAgY29uc3QgdG9vbCA9IE9iamVjdC5hc3NpZ24oe30sIGJhc2VUb29sLCBjb250ZXh0VG9vbCwgeyBvcHRpb25zIH0pO1xyXG4gICAgICB0b29scy5wdXNoKHRvb2wpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdG9vbGJveC5zZXRUb29scyh0b29scyk7XHJcbiAgICB0b29sYm94LnNldFRvb2xiYXIoY29udGV4dC50b29sYmFyIHx8IFtdKTtcclxuXHJcbiAgICAvLyBUT0RPOiBUaGlzIGlzIGEgcGF0Y2ggc28gdGhlIGNvbnRleHQgc2VydmljZSBjYW4gd29yayB3aXRob3V0XHJcbiAgICAvLyBpbmplY3RpbmcgdGhlIFRvb2xTdGF0ZSBvciB3aXRob3V0IGJlaW5nIGNvbXBsZXRlbHkgcmVmYWN0b3JlZFxyXG4gICAgdGhpcy5jb250ZXh0U2VydmljZS5zZXRUb29scyhbXS5jb25jYXQodG9vbHMpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCBhIG5ldyBjb250ZXh0IGFuZCB1cGRhdGUgdGhlIHRvb2wgc3RhdGVcclxuICAgKiBAcGFyYW0gY29udGV4dCBEZXRhaWxlZCBjb250ZXh0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkNvbnRleHRDaGFuZ2UoY29udGV4dDogRGV0YWlsZWRDb250ZXh0KSB7XHJcbiAgICBpZiAoY29udGV4dCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuc2V0Q29udGV4dChjb250ZXh0KTtcclxuICB9XHJcbn1cclxuIl19