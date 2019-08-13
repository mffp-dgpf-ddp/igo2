/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ToolComponent } from '@igo2/common';
import { ToolState } from '../../tool/tool.state';
let ContextManagerToolComponent = class ContextManagerToolComponent {
    /**
     * @param {?} toolState
     */
    constructor(toolState) {
        this.toolState = toolState;
    }
    /**
     * @return {?}
     */
    editContext() {
        this.toolState.toolbox.activateTool('contextEditor');
    }
    /**
     * @return {?}
     */
    managePermissions() {
        this.toolState.toolbox.activateTool('contextPermissionManager');
    }
};
ContextManagerToolComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-context-manager-tool',
                template: "<igo-context-list\r\n  igoContextListBinding\r\n  (edit)=\"editContext()\"\r\n  (managePermissions)=\"managePermissions()\">\r\n</igo-context-list>\r\n"
            }] }
];
/** @nocollapse */
ContextManagerToolComponent.ctorParameters = () => [
    { type: ToolState }
];
ContextManagerToolComponent = tslib_1.__decorate([
    ToolComponent({
        name: 'contextManager',
        title: 'igo.integration.tools.contexts',
        icon: 'star'
    }),
    tslib_1.__metadata("design:paramtypes", [ToolState])
], ContextManagerToolComponent);
export { ContextManagerToolComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ContextManagerToolComponent.prototype.toolState;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tYW5hZ2VyLXRvb2wuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvaW50ZWdyYXRpb24vIiwic291cmNlcyI6WyJsaWIvY29udGV4dC9jb250ZXh0LW1hbmFnZXItdG9vbC9jb250ZXh0LW1hbmFnZXItdG9vbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFN0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0lBV3JDLDJCQUEyQixTQUEzQiwyQkFBMkI7Ozs7SUFDdEMsWUFBb0IsU0FBb0I7UUFBcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztJQUFHLENBQUM7Ozs7SUFFNUMsV0FBVztRQUNULElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN2RCxDQUFDOzs7O0lBRUQsaUJBQWlCO1FBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLDBCQUEwQixDQUFDLENBQUM7SUFDbEUsQ0FBQztDQUNGLENBQUE7O1lBZEEsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLG1LQUFvRDthQUNyRDs7OztZQVZRLFNBQVM7O0FBV0wsMkJBQTJCO0lBVHZDLGFBQWEsQ0FBQztRQUNiLElBQUksRUFBRSxnQkFBZ0I7UUFDdEIsS0FBSyxFQUFFLGdDQUFnQztRQUN2QyxJQUFJLEVBQUUsTUFBTTtLQUNiLENBQUM7NkNBTStCLFNBQVM7R0FEN0IsMkJBQTJCLENBVXZDO1NBVlksMkJBQTJCOzs7Ozs7SUFDMUIsZ0RBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBUb29sQ29tcG9uZW50IH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IFRvb2xTdGF0ZSB9IGZyb20gJy4uLy4uL3Rvb2wvdG9vbC5zdGF0ZSc7XHJcblxyXG5AVG9vbENvbXBvbmVudCh7XHJcbiAgbmFtZTogJ2NvbnRleHRNYW5hZ2VyJyxcclxuICB0aXRsZTogJ2lnby5pbnRlZ3JhdGlvbi50b29scy5jb250ZXh0cycsXHJcbiAgaWNvbjogJ3N0YXInXHJcbn0pXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWNvbnRleHQtbWFuYWdlci10b29sJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY29udGV4dC1tYW5hZ2VyLXRvb2wuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb250ZXh0TWFuYWdlclRvb2xDb21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdG9vbFN0YXRlOiBUb29sU3RhdGUpIHt9XHJcblxyXG4gIGVkaXRDb250ZXh0KCkge1xyXG4gICAgdGhpcy50b29sU3RhdGUudG9vbGJveC5hY3RpdmF0ZVRvb2woJ2NvbnRleHRFZGl0b3InKTtcclxuICB9XHJcblxyXG4gIG1hbmFnZVBlcm1pc3Npb25zKCkge1xyXG4gICAgdGhpcy50b29sU3RhdGUudG9vbGJveC5hY3RpdmF0ZVRvb2woJ2NvbnRleHRQZXJtaXNzaW9uTWFuYWdlcicpO1xyXG4gIH1cclxufVxyXG4iXX0=