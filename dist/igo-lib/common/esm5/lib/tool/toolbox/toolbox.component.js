/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActionStore } from '../../action';
import { Toolbox } from '../shared/toolbox';
import { toolSlideInOut } from './toolbox.animation';
var ToolboxComponent = /** @class */ (function () {
    function ToolboxComponent() {
        /**
         * Observable of the active tool
         */
        this.activeTool$ = new BehaviorSubject(undefined);
        /**
         * Store of actions that toggle tools
         */
        this.actionStore = new ActionStore([]);
        /**
         * Observable of he anmation state
         */
        this.animation$ = new BehaviorSubject('none');
        /**
         * Observable of the toolbar
         */
        this.toolbar$ = new BehaviorSubject([]);
        /**
         * Observable of the ongoing animation. This is useful when
         * multiple animations are triggered at once i.e. when the user clicks
         * too fast on different actions
         */
        this.animating$ = new BehaviorSubject(false);
        /**
         * Whether the toolbox should animate the first tool entering
         */
        this.animate = false;
    }
    Object.defineProperty(ToolboxComponent.prototype, "toolbarWithTitle", {
        /**
         * Whether the Toolbar should display actions' titles
         */
        get: /**
         * Whether the Toolbar should display actions' titles
         * @return {?}
         */
        function () {
            return this.activeTool$.value === undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initialize the toolbar and subscribe to the active tool
     * @internal
     */
    /**
     * Initialize the toolbar and subscribe to the active tool
     * \@internal
     * @return {?}
     */
    ToolboxComponent.prototype.ngOnInit = /**
     * Initialize the toolbar and subscribe to the active tool
     * \@internal
     * @return {?}
     */
    function () {
        var _this = this;
        this.toolbar$$ = this.toolbox.toolbar$.subscribe((/**
         * @param {?} toolbar
         * @return {?}
         */
        function (toolbar) {
            return _this.onToolbarChange(toolbar);
        }));
        this.activeTool$$ = this.toolbox.activeTool$.subscribe((/**
         * @param {?} tool
         * @return {?}
         */
        function (tool) {
            return _this.onActiveToolChange(tool);
        }));
    };
    /**
     * Unsubscribe to the active tool and destroy the action store
     * @internal
     */
    /**
     * Unsubscribe to the active tool and destroy the action store
     * \@internal
     * @return {?}
     */
    ToolboxComponent.prototype.ngOnDestroy = /**
     * Unsubscribe to the active tool and destroy the action store
     * \@internal
     * @return {?}
     */
    function () {
        this.toolbar$$.unsubscribe();
        this.activeTool$$.unsubscribe();
        this.actionStore.destroy();
    };
    /**
     * Track the starting animation
     * @internal
     */
    /**
     * Track the starting animation
     * \@internal
     * @return {?}
     */
    ToolboxComponent.prototype.onAnimationStart = /**
     * Track the starting animation
     * \@internal
     * @return {?}
     */
    function () {
        this.animating$.next(true);
    };
    /**
     * Untrack the completed animation
     * @internal
     */
    /**
     * Untrack the completed animation
     * \@internal
     * @return {?}
     */
    ToolboxComponent.prototype.onAnimationComplete = /**
     * Untrack the completed animation
     * \@internal
     * @return {?}
     */
    function () {
        this.animating$.next(false);
    };
    /**
     * Return a tool's inputs
     * @param tool Tool
     * @returns Tool inputs
     * @internal
     */
    /**
     * Return a tool's inputs
     * \@internal
     * @param {?} tool Tool
     * @return {?} Tool inputs
     */
    ToolboxComponent.prototype.getToolInputs = /**
     * Return a tool's inputs
     * \@internal
     * @param {?} tool Tool
     * @return {?} Tool inputs
     */
    function (tool) {
        return tool.options || {};
    };
    Object.defineProperty(ToolboxComponent.prototype, "actionBarItemClassFunc", {
        /**
         * Get Action bar item class function
         * @internal
         */
        get: /**
         * Get Action bar item class function
         * \@internal
         * @return {?}
         */
        function () {
            var _this = this;
            return (/**
             * @param {?} tool
             * @return {?}
             */
            function (tool) {
                if (!_this.toolbox.activeTool$.value) {
                    return;
                }
                return { 'tool-actived': tool.id === _this.toolbox.activeTool$.value.name };
            });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initialize an action store
     * @param toolbar Toolbar
     */
    /**
     * Initialize an action store
     * @private
     * @param {?} toolbar Toolbar
     * @return {?}
     */
    ToolboxComponent.prototype.onToolbarChange = /**
     * Initialize an action store
     * @private
     * @param {?} toolbar Toolbar
     * @return {?}
     */
    function (toolbar) {
        this.setToolbar(toolbar);
    };
    /**
     * Activate a tool and trigger an animation or not
     * @param tool Tool to activate
     */
    /**
     * Activate a tool and trigger an animation or not
     * @private
     * @param {?} tool Tool to activate
     * @return {?}
     */
    ToolboxComponent.prototype.onActiveToolChange = /**
     * Activate a tool and trigger an animation or not
     * @private
     * @param {?} tool Tool to activate
     * @return {?}
     */
    function (tool) {
        var _this = this;
        if (!this.animate) {
            this.setActiveTool(tool);
            return;
        }
        this.onAnimate((/**
         * @return {?}
         */
        function () { return _this.setActiveTool(tool); }));
    };
    /**
     * Set the active tool
     * @param tool Tool to activate
     */
    /**
     * Set the active tool
     * @private
     * @param {?} tool Tool to activate
     * @return {?}
     */
    ToolboxComponent.prototype.setActiveTool = /**
     * Set the active tool
     * @private
     * @param {?} tool Tool to activate
     * @return {?}
     */
    function (tool) {
        if (tool === undefined) {
            this.actionStore.state.updateAll({ active: false });
        }
        else {
            /** @type {?} */
            var action = this.actionStore.get(tool.name);
            if (action !== undefined) {
                this.actionStore.state.update(action, { active: true }, true);
            }
        }
        this.activeTool$.next(tool);
        if (this.animate) {
            this.animation$.next('enter');
        }
    };
    /**
     * Initialize the toolbar
     */
    /**
     * Initialize the toolbar
     * @private
     * @param {?} toolbar
     * @return {?}
     */
    ToolboxComponent.prototype.setToolbar = /**
     * Initialize the toolbar
     * @private
     * @param {?} toolbar
     * @return {?}
     */
    function (toolbar) {
        var _this = this;
        /** @type {?} */
        var actions = toolbar.reduce((/**
         * @param {?} acc
         * @param {?} toolName
         * @return {?}
         */
        function (acc, toolName) {
            /** @type {?} */
            var tool = _this.toolbox.getTool(toolName);
            if (tool === undefined) {
                return acc;
            }
            acc.push({
                id: tool.name,
                title: tool.title,
                icon: tool.icon,
                // iconImage: tool.iconImage,
                tooltip: tool.tooltip,
                args: [tool, _this.toolbox],
                handler: (/**
                 * @param {?} _tool
                 * @param {?} _toolbox
                 * @return {?}
                 */
                function (_tool, _toolbox) {
                    _toolbox.activateTool(_tool.name);
                })
            });
            return acc;
        }), []);
        this.actionStore.load(actions);
        this.toolbar$.next(toolbar);
    };
    /**
     * Observe the ongoing animation and ignore any incoming animation
     * while one is still ongoing.
     * @param callback Callback to execute when the animation completes
     */
    /**
     * Observe the ongoing animation and ignore any incoming animation
     * while one is still ongoing.
     * @private
     * @param {?} callback Callback to execute when the animation completes
     * @return {?}
     */
    ToolboxComponent.prototype.onAnimate = /**
     * Observe the ongoing animation and ignore any incoming animation
     * while one is still ongoing.
     * @private
     * @param {?} callback Callback to execute when the animation completes
     * @return {?}
     */
    function (callback) {
        var _this = this;
        this.unAnimate();
        this.animating$$ = this.animating$.subscribe((/**
         * @param {?} animation
         * @return {?}
         */
        function (animation) {
            if (!animation) {
                callback.call(_this);
                _this.unAnimate();
            }
        }));
    };
    /**
     * Stop observing an animation when it's complete
     */
    /**
     * Stop observing an animation when it's complete
     * @private
     * @return {?}
     */
    ToolboxComponent.prototype.unAnimate = /**
     * Stop observing an animation when it's complete
     * @private
     * @return {?}
     */
    function () {
        if (this.animating$$) {
            this.animating$$.unsubscribe();
        }
    };
    ToolboxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-toolbox',
                    template: "<igo-actionbar\r\n  *ngIf=\"(toolbar$ | async).length > 0\"\r\n  [store]=\"actionStore\"\r\n  [withIcon]=\"true\"\r\n  [withTitle]=\"toolbarWithTitle\"\r\n  [horizontal]=\"false\"\r\n  [itemClassFunc]=\"actionBarItemClassFunc\">\r\n</igo-actionbar>\r\n\r\n<div\r\n  *ngIf=\"activeTool$ | async as tool\"\r\n  class=\"igo-tool-container\"\r\n  [ngClass]=\"{'igo-tool-container-with-toolbar': !actionStore.empty, 'igo-tool-container-with-animation': animate}\"\r\n  [@toolSlideInOut]=\"animation$ | async\"\r\n  (@toolSlideInOut.start)=\"onAnimationStart()\"\r\n  (@toolSlideInOut.done)=\"onAnimationComplete()\">\r\n\r\n  <igo-dynamic-outlet\r\n    [component]=\"tool.component\"\r\n    [inputs]=\"getToolInputs(tool)\">\r\n  </igo-dynamic-outlet>\r\n\r\n</div>\r\n",
                    animations: [toolSlideInOut()],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:block;position:relative;overflow:hidden;width:100%;height:100%}.igo-tool-container{position:absolute;top:0;bottom:0;left:0;right:0}.igo-tool-container-with-animation{transform:translate3d(100%,0,0)}.igo-tool-container-with-toolbar{left:51px}igo-actionbar{height:100%}igo-actionbar.with-title{width:100%;overflow:auto}igo-actionbar:not(.with-title){width:48px;overflow:hidden;-o-box-shadow:2px 0 2px 0 #ddd;box-shadow:2px 0 2px 0 #ddd}igo-actionbar ::ng-deep igo-actionbar-item.tool-actived ::ng-deep mat-list-item{background-color:#e0e0e0}igo-dynamic-outlet{overflow:auto}"]
                }] }
    ];
    ToolboxComponent.propDecorators = {
        toolbox: [{ type: Input }],
        animate: [{ type: Input }]
    };
    return ToolboxComponent;
}());
export { ToolboxComponent };
if (false) {
    /**
     * Observable of the active tool
     * @type {?}
     */
    ToolboxComponent.prototype.activeTool$;
    /**
     * Store of actions that toggle tools
     * @type {?}
     */
    ToolboxComponent.prototype.actionStore;
    /**
     * Observable of he anmation state
     * @type {?}
     */
    ToolboxComponent.prototype.animation$;
    /**
     * Observable of the toolbar
     * @type {?}
     */
    ToolboxComponent.prototype.toolbar$;
    /**
     * Subscription to the active tool
     * @type {?}
     * @private
     */
    ToolboxComponent.prototype.activeTool$$;
    /**
     * Subscription to the toolbar
     * @type {?}
     * @private
     */
    ToolboxComponent.prototype.toolbar$$;
    /**
     * Observable of the ongoing animation. This is useful when
     * multiple animations are triggered at once i.e. when the user clicks
     * too fast on different actions
     * @type {?}
     * @private
     */
    ToolboxComponent.prototype.animating$;
    /**
     * Subscription to the ongoing animation
     * @type {?}
     * @private
     */
    ToolboxComponent.prototype.animating$$;
    /**
     * Toolbox
     * @type {?}
     */
    ToolboxComponent.prototype.toolbox;
    /**
     * Whether the toolbox should animate the first tool entering
     * @type {?}
     */
    ToolboxComponent.prototype.animate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJveC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvdG9vbC90b29sYm94L3Rvb2xib3guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFHTCx1QkFBdUIsRUFDeEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFnQixlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFckQsT0FBTyxFQUFVLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUVuRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDNUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXJEO0lBQUE7Ozs7UUFXRSxnQkFBVyxHQUEwQixJQUFJLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7OztRQUtwRSxnQkFBVyxHQUFnQixJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7OztRQUsvQyxlQUFVLEdBQTRCLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7O1FBS2xFLGFBQVEsR0FBOEIsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7Ozs7OztRQWlCdEQsZUFBVSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDOzs7O1FBZWhELFlBQU8sR0FBWSxLQUFLLENBQUM7SUFpS3BDLENBQUM7SUE1SkMsc0JBQUksOENBQWdCO1FBSHBCOztXQUVHOzs7OztRQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUM7UUFDOUMsQ0FBQzs7O09BQUE7SUFFRDs7O09BR0c7Ozs7OztJQUNILG1DQUFROzs7OztJQUFSO1FBQUEsaUJBT0M7UUFOQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxD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QUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUzs7OztRQUFDLFVBQUMsU0FBa0I7WUFDOUQsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDZCxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDO2dCQUNwQixLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDbEI7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0ssb0NBQVM7Ozs7O0lBQWpCO1FBQ0UsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDaEM7SUFDSCxDQUFDOztnQkExTkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO29CQUN2Qix3d0JBQXFDO29CQUVyQyxVQUFVLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDOUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OzBCQStDRSxLQUFLOzBCQUtMLEtBQUs7O0lBaUtSLHVCQUFDO0NBQUEsQUEzTkQsSUEyTkM7U0FwTlksZ0JBQWdCOzs7Ozs7SUFJM0IsdUNBQW9FOzs7OztJQUtwRSx1Q0FBK0M7Ozs7O0lBSy9DLHNDQUFrRTs7Ozs7SUFLbEUsb0NBQThEOzs7Ozs7SUFLOUQsd0NBQW1DOzs7Ozs7SUFLbkMscUNBQWdDOzs7Ozs7OztJQU9oQyxzQ0FBeUQ7Ozs7OztJQUt6RCx1Q0FBa0M7Ozs7O0lBS2xDLG1DQUEwQjs7Ozs7SUFLMUIsbUNBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEFjdGlvbiwgQWN0aW9uU3RvcmUgfSBmcm9tICcuLi8uLi9hY3Rpb24nO1xyXG5pbXBvcnQgeyBUb29sIH0gZnJvbSAnLi4vc2hhcmVkL3Rvb2wuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgVG9vbGJveCB9IGZyb20gJy4uL3NoYXJlZC90b29sYm94JztcclxuaW1wb3J0IHsgdG9vbFNsaWRlSW5PdXQgfSBmcm9tICcuL3Rvb2xib3guYW5pbWF0aW9uJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXRvb2xib3gnLFxyXG4gIHRlbXBsYXRlVXJsOiAndG9vbGJveC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJ3Rvb2xib3guY29tcG9uZW50LnNjc3MnXSxcclxuICBhbmltYXRpb25zOiBbdG9vbFNsaWRlSW5PdXQoKV0sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFRvb2xib3hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBvZiB0aGUgYWN0aXZlIHRvb2xcclxuICAgKi9cclxuICBhY3RpdmVUb29sJDogQmVoYXZpb3JTdWJqZWN0PFRvb2w+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh1bmRlZmluZWQpO1xyXG5cclxuICAvKipcclxuICAgKiBTdG9yZSBvZiBhY3Rpb25zIHRoYXQgdG9nZ2xlIHRvb2xzXHJcbiAgICovXHJcbiAgYWN0aW9uU3RvcmU6IEFjdGlvblN0b3JlID0gbmV3IEFjdGlvblN0b3JlKFtdKTtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBvZiBoZSBhbm1hdGlvbiBzdGF0ZVxyXG4gICAqL1xyXG4gIGFuaW1hdGlvbiQ6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCgnbm9uZScpO1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIG9mIHRoZSB0b29sYmFyXHJcbiAgICovXHJcbiAgdG9vbGJhciQ6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvIHRoZSBhY3RpdmUgdG9vbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWN0aXZlVG9vbCQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgdG9vbGJhclxyXG4gICAqL1xyXG4gIHByaXZhdGUgdG9vbGJhciQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgb2YgdGhlIG9uZ29pbmcgYW5pbWF0aW9uLiBUaGlzIGlzIHVzZWZ1bCB3aGVuXHJcbiAgICogbXVsdGlwbGUgYW5pbWF0aW9ucyBhcmUgdHJpZ2dlcmVkIGF0IG9uY2UgaS5lLiB3aGVuIHRoZSB1c2VyIGNsaWNrc1xyXG4gICAqIHRvbyBmYXN0IG9uIGRpZmZlcmVudCBhY3Rpb25zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhbmltYXRpbmckID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgb25nb2luZyBhbmltYXRpb25cclxuICAgKi9cclxuICBwcml2YXRlIGFuaW1hdGluZyQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFRvb2xib3hcclxuICAgKi9cclxuICBASW5wdXQoKSB0b29sYm94OiBUb29sYm94O1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoZSB0b29sYm94IHNob3VsZCBhbmltYXRlIHRoZSBmaXJzdCB0b29sIGVudGVyaW5nXHJcbiAgICovXHJcbiAgQElucHV0KCkgYW5pbWF0ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoZSBUb29sYmFyIHNob3VsZCBkaXNwbGF5IGFjdGlvbnMnIHRpdGxlc1xyXG4gICAqL1xyXG4gIGdldCB0b29sYmFyV2l0aFRpdGxlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlVG9vbCQudmFsdWUgPT09IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgdGhlIHRvb2xiYXIgYW5kIHN1YnNjcmliZSB0byB0aGUgYWN0aXZlIHRvb2xcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMudG9vbGJhciQkID0gdGhpcy50b29sYm94LnRvb2xiYXIkLnN1YnNjcmliZSgodG9vbGJhcjogc3RyaW5nW10pID0+XHJcbiAgICAgIHRoaXMub25Ub29sYmFyQ2hhbmdlKHRvb2xiYXIpXHJcbiAgICApO1xyXG4gICAgdGhpcy5hY3RpdmVUb29sJCQgPSB0aGlzLnRvb2xib3guYWN0aXZlVG9vbCQuc3Vic2NyaWJlKCh0b29sOiBUb29sKSA9PlxyXG4gICAgICB0aGlzLm9uQWN0aXZlVG9vbENoYW5nZSh0b29sKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuc3Vic2NyaWJlIHRvIHRoZSBhY3RpdmUgdG9vbCBhbmQgZGVzdHJveSB0aGUgYWN0aW9uIHN0b3JlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnRvb2xiYXIkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5hY3RpdmVUb29sJCQudW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuYWN0aW9uU3RvcmUuZGVzdHJveSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHJhY2sgdGhlIHN0YXJ0aW5nIGFuaW1hdGlvblxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uQW5pbWF0aW9uU3RhcnQoKSB7XHJcbiAgICB0aGlzLmFuaW1hdGluZyQubmV4dCh0cnVlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVudHJhY2sgdGhlIGNvbXBsZXRlZCBhbmltYXRpb25cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvbkFuaW1hdGlvbkNvbXBsZXRlKCkge1xyXG4gICAgdGhpcy5hbmltYXRpbmckLm5leHQoZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIGEgdG9vbCdzIGlucHV0c1xyXG4gICAqIEBwYXJhbSB0b29sIFRvb2xcclxuICAgKiBAcmV0dXJucyBUb29sIGlucHV0c1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldFRvb2xJbnB1dHModG9vbDogVG9vbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0ge1xyXG4gICAgcmV0dXJuIHRvb2wub3B0aW9ucyB8fCB7fTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBBY3Rpb24gYmFyIGl0ZW0gY2xhc3MgZnVuY3Rpb25cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgYWN0aW9uQmFySXRlbUNsYXNzRnVuYygpIHtcclxuICAgIHJldHVybiAodG9vbDogVG9vbCkgPT4ge1xyXG4gICAgICBpZiAoIXRoaXMudG9vbGJveC5hY3RpdmVUb29sJC52YWx1ZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4geyAndG9vbC1hY3RpdmVkJzogdG9vbC5pZCA9PT0gdGhpcy50b29sYm94LmFjdGl2ZVRvb2wkLnZhbHVlLm5hbWUgfTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIGFuIGFjdGlvbiBzdG9yZVxyXG4gICAqIEBwYXJhbSB0b29sYmFyIFRvb2xiYXJcclxuICAgKi9cclxuICBwcml2YXRlIG9uVG9vbGJhckNoYW5nZSh0b29sYmFyOiBzdHJpbmdbXSkge1xyXG4gICAgdGhpcy5zZXRUb29sYmFyKHRvb2xiYXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWN0aXZhdGUgYSB0b29sIGFuZCB0cmlnZ2VyIGFuIGFuaW1hdGlvbiBvciBub3RcclxuICAgKiBAcGFyYW0gdG9vbCBUb29sIHRvIGFjdGl2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkFjdGl2ZVRvb2xDaGFuZ2UodG9vbDogVG9vbCkge1xyXG4gICAgaWYgKCF0aGlzLmFuaW1hdGUpIHtcclxuICAgICAgdGhpcy5zZXRBY3RpdmVUb29sKHRvb2wpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLm9uQW5pbWF0ZSgoKSA9PiB0aGlzLnNldEFjdGl2ZVRvb2wodG9vbCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBhY3RpdmUgdG9vbFxyXG4gICAqIEBwYXJhbSB0b29sIFRvb2wgdG8gYWN0aXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIHNldEFjdGl2ZVRvb2wodG9vbDogVG9vbCB8IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKHRvb2wgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmFjdGlvblN0b3JlLnN0YXRlLnVwZGF0ZUFsbCh7IGFjdGl2ZTogZmFsc2UgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBhY3Rpb24gPSB0aGlzLmFjdGlvblN0b3JlLmdldCh0b29sLm5hbWUpO1xyXG4gICAgICBpZiAoYWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLmFjdGlvblN0b3JlLnN0YXRlLnVwZGF0ZShhY3Rpb24sIHsgYWN0aXZlOiB0cnVlIH0sIHRydWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hY3RpdmVUb29sJC5uZXh0KHRvb2wpO1xyXG4gICAgaWYgKHRoaXMuYW5pbWF0ZSkge1xyXG4gICAgICB0aGlzLmFuaW1hdGlvbiQubmV4dCgnZW50ZXInKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgdGhlIHRvb2xiYXJcclxuICAgKi9cclxuICBwcml2YXRlIHNldFRvb2xiYXIodG9vbGJhcjogc3RyaW5nW10pIHtcclxuICAgIGNvbnN0IGFjdGlvbnMgPSB0b29sYmFyLnJlZHVjZSgoYWNjOiBBY3Rpb25bXSwgdG9vbE5hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgICBjb25zdCB0b29sID0gdGhpcy50b29sYm94LmdldFRvb2wodG9vbE5hbWUpO1xyXG4gICAgICBpZiAodG9vbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIGFjYztcclxuICAgICAgfVxyXG5cclxuICAgICAgYWNjLnB1c2goe1xyXG4gICAgICAgIGlkOiB0b29sLm5hbWUsXHJcbiAgICAgICAgdGl0bGU6IHRvb2wudGl0bGUsXHJcbiAgICAgICAgaWNvbjogdG9vbC5pY29uLFxyXG4gICAgICAgIC8vIGljb25JbWFnZTogdG9vbC5pY29uSW1hZ2UsXHJcbiAgICAgICAgdG9vbHRpcDogdG9vbC50b29sdGlwLFxyXG4gICAgICAgIGFyZ3M6IFt0b29sLCB0aGlzLnRvb2xib3hdLFxyXG4gICAgICAgIGhhbmRsZXI6IChfdG9vbDogVG9vbCwgX3Rvb2xib3g6IFRvb2xib3gpID0+IHtcclxuICAgICAgICAgIF90b29sYm94LmFjdGl2YXRlVG9vbChfdG9vbC5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSwgW10pO1xyXG4gICAgdGhpcy5hY3Rpb25TdG9yZS5sb2FkKGFjdGlvbnMpO1xyXG4gICAgdGhpcy50b29sYmFyJC5uZXh0KHRvb2xiYXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2ZSB0aGUgb25nb2luZyBhbmltYXRpb24gYW5kIGlnbm9yZSBhbnkgaW5jb21pbmcgYW5pbWF0aW9uXHJcbiAgICogd2hpbGUgb25lIGlzIHN0aWxsIG9uZ29pbmcuXHJcbiAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIHRvIGV4ZWN1dGUgd2hlbiB0aGUgYW5pbWF0aW9uIGNvbXBsZXRlc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgb25BbmltYXRlKGNhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XHJcbiAgICB0aGlzLnVuQW5pbWF0ZSgpO1xyXG4gICAgdGhpcy5hbmltYXRpbmckJCA9IHRoaXMuYW5pbWF0aW5nJC5zdWJzY3JpYmUoKGFuaW1hdGlvbjogYm9vbGVhbikgPT4ge1xyXG4gICAgICBpZiAoIWFuaW1hdGlvbikge1xyXG4gICAgICAgIGNhbGxiYWNrLmNhbGwodGhpcyk7XHJcbiAgICAgICAgdGhpcy51bkFuaW1hdGUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdG9wIG9ic2VydmluZyBhbiBhbmltYXRpb24gd2hlbiBpdCdzIGNvbXBsZXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1bkFuaW1hdGUoKSB7XHJcbiAgICBpZiAodGhpcy5hbmltYXRpbmckJCkge1xyXG4gICAgICB0aGlzLmFuaW1hdGluZyQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==