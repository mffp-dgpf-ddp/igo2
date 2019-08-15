/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActionStore } from '../../action';
import { Toolbox } from '../shared/toolbox';
import { toolSlideInOut } from './toolbox.animation';
export class ToolboxComponent {
    constructor() {
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
    /**
     * Whether the Toolbar should display actions' titles
     * @return {?}
     */
    get toolbarWithTitle() {
        return this.activeTool$.value === undefined;
    }
    /**
     * Initialize the toolbar and subscribe to the active tool
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        this.toolbar$$ = this.toolbox.toolbar$.subscribe((/**
         * @param {?} toolbar
         * @return {?}
         */
        (toolbar) => this.onToolbarChange(toolbar)));
        this.activeTool$$ = this.toolbox.activeTool$.subscribe((/**
         * @param {?} tool
         * @return {?}
         */
        (tool) => this.onActiveToolChange(tool)));
    }
    /**
     * Unsubscribe to the active tool and destroy the action store
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        this.toolbar$$.unsubscribe();
        this.activeTool$$.unsubscribe();
        this.actionStore.destroy();
    }
    /**
     * Track the starting animation
     * \@internal
     * @return {?}
     */
    onAnimationStart() {
        this.animating$.next(true);
    }
    /**
     * Untrack the completed animation
     * \@internal
     * @return {?}
     */
    onAnimationComplete() {
        this.animating$.next(false);
    }
    /**
     * Return a tool's inputs
     * \@internal
     * @param {?} tool Tool
     * @return {?} Tool inputs
     */
    getToolInputs(tool) {
        return tool.options || {};
    }
    /**
     * Get Action bar item class function
     * \@internal
     * @return {?}
     */
    get actionBarItemClassFunc() {
        return (/**
         * @param {?} tool
         * @return {?}
         */
        (tool) => {
            if (!this.toolbox.activeTool$.value) {
                return;
            }
            return { 'tool-actived': tool.id === this.toolbox.activeTool$.value.name };
        });
    }
    /**
     * Initialize an action store
     * @private
     * @param {?} toolbar Toolbar
     * @return {?}
     */
    onToolbarChange(toolbar) {
        this.setToolbar(toolbar);
    }
    /**
     * Activate a tool and trigger an animation or not
     * @private
     * @param {?} tool Tool to activate
     * @return {?}
     */
    onActiveToolChange(tool) {
        if (!this.animate) {
            this.setActiveTool(tool);
            return;
        }
        this.onAnimate((/**
         * @return {?}
         */
        () => this.setActiveTool(tool)));
    }
    /**
     * Set the active tool
     * @private
     * @param {?} tool Tool to activate
     * @return {?}
     */
    setActiveTool(tool) {
        if (tool === undefined) {
            this.actionStore.state.updateAll({ active: false });
        }
        else {
            /** @type {?} */
            const action = this.actionStore.get(tool.name);
            if (action !== undefined) {
                this.actionStore.state.update(action, { active: true }, true);
            }
        }
        this.activeTool$.next(tool);
        if (this.animate) {
            this.animation$.next('enter');
        }
    }
    /**
     * Initialize the toolbar
     * @private
     * @param {?} toolbar
     * @return {?}
     */
    setToolbar(toolbar) {
        /** @type {?} */
        const actions = toolbar.reduce((/**
         * @param {?} acc
         * @param {?} toolName
         * @return {?}
         */
        (acc, toolName) => {
            /** @type {?} */
            const tool = this.toolbox.getTool(toolName);
            if (tool === undefined) {
                return acc;
            }
            acc.push({
                id: tool.name,
                title: tool.title,
                icon: tool.icon,
                // iconImage: tool.iconImage,
                tooltip: tool.tooltip,
                args: [tool, this.toolbox],
                handler: (/**
                 * @param {?} _tool
                 * @param {?} _toolbox
                 * @return {?}
                 */
                (_tool, _toolbox) => {
                    _toolbox.activateTool(_tool.name);
                })
            });
            return acc;
        }), []);
        this.actionStore.load(actions);
        this.toolbar$.next(toolbar);
    }
    /**
     * Observe the ongoing animation and ignore any incoming animation
     * while one is still ongoing.
     * @private
     * @param {?} callback Callback to execute when the animation completes
     * @return {?}
     */
    onAnimate(callback) {
        this.unAnimate();
        this.animating$$ = this.animating$.subscribe((/**
         * @param {?} animation
         * @return {?}
         */
        (animation) => {
            if (!animation) {
                callback.call(this);
                this.unAnimate();
            }
        }));
    }
    /**
     * Stop observing an animation when it's complete
     * @private
     * @return {?}
     */
    unAnimate() {
        if (this.animating$$) {
            this.animating$$.unsubscribe();
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJveC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvdG9vbC90b29sYm94L3Rvb2xib3guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFHTCx1QkFBdUIsRUFDeEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFnQixlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFckQsT0FBTyxFQUFVLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUVuRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDNUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBU3JELE1BQU0sT0FBTyxnQkFBZ0I7SUFQN0I7Ozs7UUFXRSxnQkFBVyxHQUEwQixJQUFJLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7OztRQUtwRSxnQkFBVyxHQUFnQixJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7OztRQUsvQyxlQUFVLEdBQTRCLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7O1FBS2xFLGFBQVEsR0FBOEIsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7Ozs7OztRQWlCdEQsZUFBVSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDOzs7O1FBZWhELFlBQU8sR0FBWSxLQUFLLENBQUM7SUFpS3BDLENBQUM7Ozs7O0lBNUpDLElBQUksZ0JBQWdCO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDO0lBQzlDLENBQUM7Ozs7OztJQU1ELFFBQVE7UUFDTixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVM7Ozs7UUFBQyxDQUFDLE9BQWlCLEVBQUUsRUFBRSxD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Q0FBQztTQUNoQztJQUNILENBQUM7OztZQTFORixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLHd3QkFBcUM7Z0JBRXJDLFVBQVUsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUM5QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7OztzQkErQ0UsS0FBSztzQkFLTCxLQUFLOzs7Ozs7O0lBL0NOLHVDQUFvRTs7Ozs7SUFLcEUsdUNBQStDOzs7OztJQUsvQyxzQ0FBa0U7Ozs7O0lBS2xFLG9DQUE4RDs7Ozs7O0lBSzlELHdDQUFtQzs7Ozs7O0lBS25DLHFDQUFnQzs7Ozs7Ozs7SUFPaEMsc0NBQXlEOzs7Ozs7SUFLekQsdUNBQWtDOzs7OztJQUtsQyxtQ0FBMEI7Ozs7O0lBSzFCLG1DQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE9uRGVzdHJveSxcclxuICBPbkluaXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBBY3Rpb24sIEFjdGlvblN0b3JlIH0gZnJvbSAnLi4vLi4vYWN0aW9uJztcclxuaW1wb3J0IHsgVG9vbCB9IGZyb20gJy4uL3NoYXJlZC90b29sLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFRvb2xib3ggfSBmcm9tICcuLi9zaGFyZWQvdG9vbGJveCc7XHJcbmltcG9ydCB7IHRvb2xTbGlkZUluT3V0IH0gZnJvbSAnLi90b29sYm94LmFuaW1hdGlvbic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby10b29sYm94JyxcclxuICB0ZW1wbGF0ZVVybDogJ3Rvb2xib3guY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWyd0b29sYm94LmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgYW5pbWF0aW9uczogW3Rvb2xTbGlkZUluT3V0KCldLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUb29sYm94Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgb2YgdGhlIGFjdGl2ZSB0b29sXHJcbiAgICovXHJcbiAgYWN0aXZlVG9vbCQ6IEJlaGF2aW9yU3ViamVjdDxUb29sPiA9IG5ldyBCZWhhdmlvclN1YmplY3QodW5kZWZpbmVkKTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcmUgb2YgYWN0aW9ucyB0aGF0IHRvZ2dsZSB0b29sc1xyXG4gICAqL1xyXG4gIGFjdGlvblN0b3JlOiBBY3Rpb25TdG9yZSA9IG5ldyBBY3Rpb25TdG9yZShbXSk7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgb2YgaGUgYW5tYXRpb24gc3RhdGVcclxuICAgKi9cclxuICBhbmltYXRpb24kOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoJ25vbmUnKTtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBvZiB0aGUgdG9vbGJhclxyXG4gICAqL1xyXG4gIHRvb2xiYXIkOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgYWN0aXZlIHRvb2xcclxuICAgKi9cclxuICBwcml2YXRlIGFjdGl2ZVRvb2wkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIHRvb2xiYXJcclxuICAgKi9cclxuICBwcml2YXRlIHRvb2xiYXIkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIG9mIHRoZSBvbmdvaW5nIGFuaW1hdGlvbi4gVGhpcyBpcyB1c2VmdWwgd2hlblxyXG4gICAqIG11bHRpcGxlIGFuaW1hdGlvbnMgYXJlIHRyaWdnZXJlZCBhdCBvbmNlIGkuZS4gd2hlbiB0aGUgdXNlciBjbGlja3NcclxuICAgKiB0b28gZmFzdCBvbiBkaWZmZXJlbnQgYWN0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgYW5pbWF0aW5nJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIG9uZ29pbmcgYW5pbWF0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhbmltYXRpbmckJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBUb29sYm94XHJcbiAgICovXHJcbiAgQElucHV0KCkgdG9vbGJveDogVG9vbGJveDtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgdG9vbGJveCBzaG91bGQgYW5pbWF0ZSB0aGUgZmlyc3QgdG9vbCBlbnRlcmluZ1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGFuaW1hdGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgVG9vbGJhciBzaG91bGQgZGlzcGxheSBhY3Rpb25zJyB0aXRsZXNcclxuICAgKi9cclxuICBnZXQgdG9vbGJhcldpdGhUaXRsZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmFjdGl2ZVRvb2wkLnZhbHVlID09PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIHRoZSB0b29sYmFyIGFuZCBzdWJzY3JpYmUgdG8gdGhlIGFjdGl2ZSB0b29sXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnRvb2xiYXIkJCA9IHRoaXMudG9vbGJveC50b29sYmFyJC5zdWJzY3JpYmUoKHRvb2xiYXI6IHN0cmluZ1tdKSA9PlxyXG4gICAgICB0aGlzLm9uVG9vbGJhckNoYW5nZSh0b29sYmFyKVxyXG4gICAgKTtcclxuICAgIHRoaXMuYWN0aXZlVG9vbCQkID0gdGhpcy50b29sYm94LmFjdGl2ZVRvb2wkLnN1YnNjcmliZSgodG9vbDogVG9vbCkgPT5cclxuICAgICAgdGhpcy5vbkFjdGl2ZVRvb2xDaGFuZ2UodG9vbClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbnN1YnNjcmliZSB0byB0aGUgYWN0aXZlIHRvb2wgYW5kIGRlc3Ryb3kgdGhlIGFjdGlvbiBzdG9yZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy50b29sYmFyJCQudW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuYWN0aXZlVG9vbCQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLmFjdGlvblN0b3JlLmRlc3Ryb3koKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyYWNrIHRoZSBzdGFydGluZyBhbmltYXRpb25cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvbkFuaW1hdGlvblN0YXJ0KCkge1xyXG4gICAgdGhpcy5hbmltYXRpbmckLm5leHQodHJ1ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbnRyYWNrIHRoZSBjb21wbGV0ZWQgYW5pbWF0aW9uXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25BbmltYXRpb25Db21wbGV0ZSgpIHtcclxuICAgIHRoaXMuYW5pbWF0aW5nJC5uZXh0KGZhbHNlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiBhIHRvb2wncyBpbnB1dHNcclxuICAgKiBAcGFyYW0gdG9vbCBUb29sXHJcbiAgICogQHJldHVybnMgVG9vbCBpbnB1dHNcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXRUb29sSW5wdXRzKHRvb2w6IFRvb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHtcclxuICAgIHJldHVybiB0b29sLm9wdGlvbnMgfHwge307XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgQWN0aW9uIGJhciBpdGVtIGNsYXNzIGZ1bmN0aW9uXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IGFjdGlvbkJhckl0ZW1DbGFzc0Z1bmMoKSB7XHJcbiAgICByZXR1cm4gKHRvb2w6IFRvb2wpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLnRvb2xib3guYWN0aXZlVG9vbCQudmFsdWUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHsgJ3Rvb2wtYWN0aXZlZCc6IHRvb2wuaWQgPT09IHRoaXMudG9vbGJveC5hY3RpdmVUb29sJC52YWx1ZS5uYW1lIH07XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZSBhbiBhY3Rpb24gc3RvcmVcclxuICAgKiBAcGFyYW0gdG9vbGJhciBUb29sYmFyXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvblRvb2xiYXJDaGFuZ2UodG9vbGJhcjogc3RyaW5nW10pIHtcclxuICAgIHRoaXMuc2V0VG9vbGJhcih0b29sYmFyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjdGl2YXRlIGEgdG9vbCBhbmQgdHJpZ2dlciBhbiBhbmltYXRpb24gb3Igbm90XHJcbiAgICogQHBhcmFtIHRvb2wgVG9vbCB0byBhY3RpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25BY3RpdmVUb29sQ2hhbmdlKHRvb2w6IFRvb2wpIHtcclxuICAgIGlmICghdGhpcy5hbmltYXRlKSB7XHJcbiAgICAgIHRoaXMuc2V0QWN0aXZlVG9vbCh0b29sKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vbkFuaW1hdGUoKCkgPT4gdGhpcy5zZXRBY3RpdmVUb29sKHRvb2wpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgYWN0aXZlIHRvb2xcclxuICAgKiBAcGFyYW0gdG9vbCBUb29sIHRvIGFjdGl2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZXRBY3RpdmVUb29sKHRvb2w6IFRvb2wgfCB1bmRlZmluZWQpIHtcclxuICAgIGlmICh0b29sID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5hY3Rpb25TdG9yZS5zdGF0ZS51cGRhdGVBbGwoeyBhY3RpdmU6IGZhbHNlIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgYWN0aW9uID0gdGhpcy5hY3Rpb25TdG9yZS5nZXQodG9vbC5uYW1lKTtcclxuICAgICAgaWYgKGFjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5hY3Rpb25TdG9yZS5zdGF0ZS51cGRhdGUoYWN0aW9uLCB7IGFjdGl2ZTogdHJ1ZSB9LCB0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWN0aXZlVG9vbCQubmV4dCh0b29sKTtcclxuICAgIGlmICh0aGlzLmFuaW1hdGUpIHtcclxuICAgICAgdGhpcy5hbmltYXRpb24kLm5leHQoJ2VudGVyJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIHRoZSB0b29sYmFyXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZXRUb29sYmFyKHRvb2xiYXI6IHN0cmluZ1tdKSB7XHJcbiAgICBjb25zdCBhY3Rpb25zID0gdG9vbGJhci5yZWR1Y2UoKGFjYzogQWN0aW9uW10sIHRvb2xOYW1lOiBzdHJpbmcpID0+IHtcclxuICAgICAgY29uc3QgdG9vbCA9IHRoaXMudG9vbGJveC5nZXRUb29sKHRvb2xOYW1lKTtcclxuICAgICAgaWYgKHRvb2wgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGFjYy5wdXNoKHtcclxuICAgICAgICBpZDogdG9vbC5uYW1lLFxyXG4gICAgICAgIHRpdGxlOiB0b29sLnRpdGxlLFxyXG4gICAgICAgIGljb246IHRvb2wuaWNvbixcclxuICAgICAgICAvLyBpY29uSW1hZ2U6IHRvb2wuaWNvbkltYWdlLFxyXG4gICAgICAgIHRvb2x0aXA6IHRvb2wudG9vbHRpcCxcclxuICAgICAgICBhcmdzOiBbdG9vbCwgdGhpcy50b29sYm94XSxcclxuICAgICAgICBoYW5kbGVyOiAoX3Rvb2w6IFRvb2wsIF90b29sYm94OiBUb29sYm94KSA9PiB7XHJcbiAgICAgICAgICBfdG9vbGJveC5hY3RpdmF0ZVRvb2woX3Rvb2wubmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIGFjYztcclxuICAgIH0sIFtdKTtcclxuICAgIHRoaXMuYWN0aW9uU3RvcmUubG9hZChhY3Rpb25zKTtcclxuICAgIHRoaXMudG9vbGJhciQubmV4dCh0b29sYmFyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmUgdGhlIG9uZ29pbmcgYW5pbWF0aW9uIGFuZCBpZ25vcmUgYW55IGluY29taW5nIGFuaW1hdGlvblxyXG4gICAqIHdoaWxlIG9uZSBpcyBzdGlsbCBvbmdvaW5nLlxyXG4gICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayB0byBleGVjdXRlIHdoZW4gdGhlIGFuaW1hdGlvbiBjb21wbGV0ZXNcclxuICAgKi9cclxuICBwcml2YXRlIG9uQW5pbWF0ZShjYWxsYmFjazogKCkgPT4gdm9pZCkge1xyXG4gICAgdGhpcy51bkFuaW1hdGUoKTtcclxuICAgIHRoaXMuYW5pbWF0aW5nJCQgPSB0aGlzLmFuaW1hdGluZyQuc3Vic2NyaWJlKChhbmltYXRpb246IGJvb2xlYW4pID0+IHtcclxuICAgICAgaWYgKCFhbmltYXRpb24pIHtcclxuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXMpO1xyXG4gICAgICAgIHRoaXMudW5BbmltYXRlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCBvYnNlcnZpbmcgYW4gYW5pbWF0aW9uIHdoZW4gaXQncyBjb21wbGV0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgdW5BbmltYXRlKCkge1xyXG4gICAgaWYgKHRoaXMuYW5pbWF0aW5nJCQpIHtcclxuICAgICAgdGhpcy5hbmltYXRpbmckJC51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=