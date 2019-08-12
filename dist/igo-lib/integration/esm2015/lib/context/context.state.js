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
export class ContextState {
    /**
     * @param {?} contextService
     * @param {?} toolService
     * @param {?} toolState
     * @param {?} languageService
     */
    constructor(contextService, toolService, toolState, languageService) {
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
        (context) => {
            this.onContextChange(context);
        }));
    }
    /**
     * Set the active context
     * @private
     * @param {?} context Detailed context
     * @return {?}
     */
    setContext(context) {
        this.updateTools(context);
        this.context$.next(context);
    }
    /**
     * Update the tool state with the context's tools
     * @private
     * @param {?} context Detailed context
     * @return {?}
     */
    updateTools(context) {
        /** @type {?} */
        const toolbox = this.toolState.toolbox;
        /** @type {?} */
        const tools = [];
        /** @type {?} */
        const contextTools = context.tools || [];
        contextTools.forEach((/**
         * @param {?} contextTool
         * @return {?}
         */
        (contextTool) => {
            /** @type {?} */
            const baseTool = this.toolService.getTool(contextTool.name);
            if (baseTool === undefined) {
                return;
            }
            /** @type {?} */
            const options = Object.assign({}, baseTool.options || {}, contextTool.options || {});
            /** @type {?} */
            const tool = Object.assign({}, baseTool, contextTool, { options });
            tools.push(tool);
        }));
        toolbox.setTools(tools);
        toolbox.setToolbar(context.toolbar || []);
        // TODO: This is a patch so the context service can work without
        // injecting the ToolState or without being completely refactored
        this.contextService.setTools([].concat(tools));
    }
    /**
     * Set a new context and update the tool state
     * @private
     * @param {?} context Detailed context
     * @return {?}
     */
    onContextChange(context) {
        if (context === undefined) {
            return;
        }
        this.setContext(context);
    }
}
ContextState.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ContextState.ctorParameters = () => [
    { type: ContextService },
    { type: ToolService },
    { type: ToolState },
    { type: LanguageService }
];
/** @nocollapse */ ContextState.ngInjectableDef = i0.defineInjectable({ factory: function ContextState_Factory() { return new ContextState(i0.inject(i1.ContextService), i0.inject(i2.ToolService), i0.inject(i3.ToolState), i0.inject(i4.LanguageService)); }, token: ContextState, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2ludGVncmF0aW9uLyIsInNvdXJjZXMiOlsibGliL2NvbnRleHQvY29udGV4dC5zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXZDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDN0MsT0FBTyxFQUFRLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNqRCxPQUFPLEVBQUUsY0FBYyxFQUFtQixNQUFNLGVBQWUsQ0FBQztBQUVoRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7Ozs7OztBQVEvQyxNQUFNLE9BQU8sWUFBWTs7Ozs7OztJQU12QixZQUNVLGNBQThCLEVBQzlCLFdBQXdCLEVBQ3hCLFNBQW9CLEVBQ3BCLGVBQWdDO1FBSGhDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjs7OztRQU4xQyxhQUFRLEdBQXFDLElBQUksZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBUTFFLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFNBQVM7Ozs7UUFBQyxDQUFDLE9BQXdCLEVBQUUsRUFBRTtZQUNsRSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hDLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7OztJQU1PLFVBQVUsQ0FBQyxPQUF3QjtRQUN6QyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlCLENBQUM7Ozs7Ozs7SUFNTyxXQUFXLENBQUMsT0FBd0I7O2NBQ3BDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU87O2NBRWhDLEtBQUssR0FBRyxFQUFFOztjQUNWLFlBQVksR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDeEMsWUFBWSxDQUFDLE9BQU87Ozs7UUFBQyxDQUFDLFdBQWlCLEVBQUUsRUFBRTs7a0JBQ25DLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQzNELElBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtnQkFDMUIsT0FBTzthQUNSOztrQkFFSyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FDM0IsRUFBRSxFQUNGLFFBQVEsQ0FBQyxPQUFPLElBQUksRUFBRSxFQUN0QixXQUFXLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FDMUI7O2tCQUNLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUM7WUFDbEUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQixDQUFDLEVBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEIsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRTFDLGdFQUFnRTtRQUNoRSxpRUFBaUU7UUFDakUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7Ozs7Ozs7SUFNTyxlQUFlLENBQUMsT0FBd0I7UUFDOUMsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQ3pCLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0IsQ0FBQzs7O1lBdEVGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQVRRLGNBQWM7WUFEUixXQUFXO1lBR2pCLFNBQVM7WUFKVCxlQUFlOzs7Ozs7OztJQWdCdEIsZ0NBQTRFOzs7OztJQUcxRSxzQ0FBc0M7Ozs7O0lBQ3RDLG1DQUFnQzs7Ozs7SUFDaEMsaUNBQTRCOzs7OztJQUM1Qix1Q0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IExhbmd1YWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBUb29sLCBUb29sU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcbmltcG9ydCB7IENvbnRleHRTZXJ2aWNlLCBEZXRhaWxlZENvbnRleHQgfSBmcm9tICdAaWdvMi9jb250ZXh0JztcclxuXHJcbmltcG9ydCB7IFRvb2xTdGF0ZSB9IGZyb20gJy4uL3Rvb2wvdG9vbC5zdGF0ZSc7XHJcblxyXG4vKipcclxuICogU2VydmljZSB0aGF0IGhvbGRzIHRoZSBzdGF0ZSBvZiB0aGUgY29udGV4dCBtb2R1bGVcclxuICovXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbnRleHRTdGF0ZSB7XHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBvZiB0aGUgYWN0aXZlIGNvbnRleHRcclxuICAgKi9cclxuICBjb250ZXh0JDogQmVoYXZpb3JTdWJqZWN0PERldGFpbGVkQ29udGV4dD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHVuZGVmaW5lZCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjb250ZXh0U2VydmljZTogQ29udGV4dFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHRvb2xTZXJ2aWNlOiBUb29sU2VydmljZSxcclxuICAgIHByaXZhdGUgdG9vbFN0YXRlOiBUb29sU3RhdGUsXHJcbiAgICBwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLmNvbnRleHQkLnN1YnNjcmliZSgoY29udGV4dDogRGV0YWlsZWRDb250ZXh0KSA9PiB7XHJcbiAgICAgIHRoaXMub25Db250ZXh0Q2hhbmdlKGNvbnRleHQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIGFjdGl2ZSBjb250ZXh0XHJcbiAgICogQHBhcmFtIGNvbnRleHQgRGV0YWlsZWQgY29udGV4dFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2V0Q29udGV4dChjb250ZXh0OiBEZXRhaWxlZENvbnRleHQpIHtcclxuICAgIHRoaXMudXBkYXRlVG9vbHMoY29udGV4dCk7XHJcbiAgICB0aGlzLmNvbnRleHQkLm5leHQoY29udGV4dCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgdGhlIHRvb2wgc3RhdGUgd2l0aCB0aGUgY29udGV4dCdzIHRvb2xzXHJcbiAgICogQHBhcmFtIGNvbnRleHQgRGV0YWlsZWQgY29udGV4dFxyXG4gICAqL1xyXG4gIHByaXZhdGUgdXBkYXRlVG9vbHMoY29udGV4dDogRGV0YWlsZWRDb250ZXh0KSB7XHJcbiAgICBjb25zdCB0b29sYm94ID0gdGhpcy50b29sU3RhdGUudG9vbGJveDtcclxuXHJcbiAgICBjb25zdCB0b29scyA9IFtdO1xyXG4gICAgY29uc3QgY29udGV4dFRvb2xzID0gY29udGV4dC50b29scyB8fCBbXTtcclxuICAgIGNvbnRleHRUb29scy5mb3JFYWNoKChjb250ZXh0VG9vbDogVG9vbCkgPT4ge1xyXG4gICAgICBjb25zdCBiYXNlVG9vbCA9IHRoaXMudG9vbFNlcnZpY2UuZ2V0VG9vbChjb250ZXh0VG9vbC5uYW1lKTtcclxuICAgICAgaWYgKGJhc2VUb29sID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgICAgIHt9LFxyXG4gICAgICAgIGJhc2VUb29sLm9wdGlvbnMgfHwge30sXHJcbiAgICAgICAgY29udGV4dFRvb2wub3B0aW9ucyB8fCB7fVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCB0b29sID0gT2JqZWN0LmFzc2lnbih7fSwgYmFzZVRvb2wsIGNvbnRleHRUb29sLCB7IG9wdGlvbnMgfSk7XHJcbiAgICAgIHRvb2xzLnB1c2godG9vbCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0b29sYm94LnNldFRvb2xzKHRvb2xzKTtcclxuICAgIHRvb2xib3guc2V0VG9vbGJhcihjb250ZXh0LnRvb2xiYXIgfHwgW10pO1xyXG5cclxuICAgIC8vIFRPRE86IFRoaXMgaXMgYSBwYXRjaCBzbyB0aGUgY29udGV4dCBzZXJ2aWNlIGNhbiB3b3JrIHdpdGhvdXRcclxuICAgIC8vIGluamVjdGluZyB0aGUgVG9vbFN0YXRlIG9yIHdpdGhvdXQgYmVpbmcgY29tcGxldGVseSByZWZhY3RvcmVkXHJcbiAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLnNldFRvb2xzKFtdLmNvbmNhdCh0b29scykpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IGEgbmV3IGNvbnRleHQgYW5kIHVwZGF0ZSB0aGUgdG9vbCBzdGF0ZVxyXG4gICAqIEBwYXJhbSBjb250ZXh0IERldGFpbGVkIGNvbnRleHRcclxuICAgKi9cclxuICBwcml2YXRlIG9uQ29udGV4dENoYW5nZShjb250ZXh0OiBEZXRhaWxlZENvbnRleHQpIHtcclxuICAgIGlmIChjb250ZXh0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRDb250ZXh0KGNvbnRleHQpO1xyXG4gIH1cclxufVxyXG4iXX0=