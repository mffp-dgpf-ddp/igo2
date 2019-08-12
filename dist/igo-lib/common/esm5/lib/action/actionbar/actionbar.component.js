/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, HostBinding, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { EntityStoreWatcher } from '../../entity';
import { ActionbarMode } from '../shared/action.enums';
import { ActionStore } from '../shared/store';
import { Overlay } from '@angular/cdk/overlay';
/**
 * A list of action buttons.
 * This component can be displayed in one of two way: 'dock' or 'overlay'
 */
var ActionbarComponent = /** @class */ (function () {
    function ActionbarComponent(cdRef, overlay) {
        var _this = this;
        this.cdRef = cdRef;
        this.overlay = overlay;
        /**
         * Reference to the ActionbarMode enum for use in the template
         * \@internal
         */
        this.actionbarMode = ActionbarMode;
        /**
         * Whether the actionbar is collapsed (Dock mode)
         * \@internal
         */
        this.collapsed = false;
        /**
         * Toggle collapse action (Dock)
         * \@internal
         */
        this.toggleCollapseAction = {
            id: 'actionbar_toggle',
            icon: 'dots-vertical',
            handler: (/**
             * @return {?}
             */
            function () {
                _this.collapsed = !_this.collapsed;
            })
        };
        /**
         * Actionbar mode
         */
        this.mode = ActionbarMode.Dock;
        /**
         * Whether a toggle button should be displayed (Dock mode)
         */
        this.withToggleButton = false;
        /**
         * Whether a the actionbar should display buttons horizontally
         */
        this.horizontal = false;
        /**
         * Color
         */
        this.color = 'default';
        /**
         * Whether action titles are displayed
         */
        this.withTitle = true;
        /**
         * Whether action icons are displayed
         */
        this.withIcon = true;
        /**
         * Overlay X position
         */
        this.xPosition = 'before';
        /**
         * Overlay X position
         */
        this.yPosition = 'above';
        this._overlayClass = '';
        /**
         * Function to add class to item actionbar
         */
        this.itemClassFunc = ActionbarComponent.defaultItemClassFunc;
    }
    Object.defineProperty(ActionbarComponent.prototype, "overlayClass", {
        get: /**
         * @return {?}
         */
        function () {
            return [this._overlayClass, 'igo-actionbar-overlay'].join(' ');
        },
        /**
         * Class to add to the actionbar overlay
         */
        set: /**
         * Class to add to the actionbar overlay
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._overlayClass = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionbarComponent.prototype, "withTitleClass", {
        /**
         * @ignore
         */
        get: /**
         * @ignore
         * @return {?}
         */
        function () {
            return this.withTitle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionbarComponent.prototype, "withIconClass", {
        /**
         * @ignore
         */
        get: /**
         * @ignore
         * @return {?}
         */
        function () {
            return this.withIcon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionbarComponent.prototype, "horizontalClass", {
        /**
         * @ignore
         */
        get: /**
         * @ignore
         * @return {?}
         */
        function () {
            return this.horizontal;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} action
     * @return {?}
     */
    ActionbarComponent.defaultItemClassFunc = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        return {};
    };
    /**
     * @internal
     */
    /**
     * \@internal
     * @param {?} changes
     * @return {?}
     */
    ActionbarComponent.prototype.ngOnChanges = /**
     * \@internal
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var store = changes.store;
        if (store && store.currentValue !== store.previousValue) {
            if (this.watcher !== undefined) {
                this.watcher.destroy();
            }
            this.watcher = new EntityStoreWatcher(this.store, this.cdRef);
        }
    };
    /**
     * @internal
     */
    /**
     * \@internal
     * @return {?}
     */
    ActionbarComponent.prototype.ngOnDestroy = /**
     * \@internal
     * @return {?}
     */
    function () {
        this.watcher.destroy();
    };
    /**
     * Invoke the action handler
     * @internal
     */
    /**
     * Invoke the action handler
     * \@internal
     * @param {?} action
     * @return {?}
     */
    ActionbarComponent.prototype.onTriggerAction = /**
     * Invoke the action handler
     * \@internal
     * @param {?} action
     * @return {?}
     */
    function (action) {
        /** @type {?} */
        var args = action.args || [];
        action.handler.apply(action, tslib_1.__spread(args));
    };
    ActionbarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-actionbar',
                    template: "<mat-list *ngIf=\"mode === actionbarMode.Dock\">\r\n\r\n  <igo-actionbar-item\r\n    *ngIf=\"withToggleButton\"\r\n    color=\"accent\"\r\n    [withTitle]=\"false\"\r\n    [withIcon]=\"true\"\r\n    [color]=\"color\"\r\n    [disabled]=\"store.view.empty\"\r\n    [action]=\"toggleCollapseAction\"\r\n    (trigger)=\"onTriggerAction(toggleCollapseAction)\">\r\n  </igo-actionbar-item>\r\n\r\n  <ng-template *ngIf=\"!collapsed\" ngFor let-action [ngForOf]=\"store.view.all$() | async\">\r\n    <igo-actionbar-item\r\n      [ngClass]=\"itemClassFunc(action)\"\r\n      color=\"accent\"\r\n      [withTitle]=\"withTitle\"\r\n      [withIcon]=\"withIcon\"\r\n      [color]=\"color\"\r\n      [disabled]=\"store.state.get(action).disabled\"\r\n      [action]=\"action\"\r\n      (trigger)=\"onTriggerAction(action)\">\r\n    </igo-actionbar-item>\r\n  </ng-template>\r\n</mat-list>\r\n\r\n<div *ngIf=\"mode === actionbarMode.Overlay\">\r\n  <button\r\n    mat-icon-button\r\n    [matMenuTriggerFor]=\"actionbarMenu\"\r\n    [disabled]=\"store.view.empty\">\r\n    <mat-icon svgIcon=\"dots-horizontal\"></mat-icon>\r\n  </button>\r\n\r\n  <mat-menu\r\n    #actionbarMenu=\"matMenu\"\r\n    class=\"igo-compact-menu igo-no-min-width-menu\"\r\n    overlapTrigger=\"true\"\r\n    [xPosition]=\"xPosition\"\r\n    [yPosition]=\"yPosition\"\r\n    [class]=\"overlayClass\">\r\n\r\n    <mat-list>\r\n      <ng-template ngFor let-action [ngForOf]=\"store.view.all$() | async\">\r\n        <igo-actionbar-item\r\n          color=\"accent\"\r\n          [withTitle]=\"withTitle\"\r\n          [withIcon]=\"withIcon\"\r\n          [color]=\"color\"\r\n          [disabled]=\"store.state.get(action).disabled\"\r\n          [action]=\"action\"\r\n          (trigger)=\"onTriggerAction(action)\">\r\n        </igo-actionbar-item>\r\n      </ng-template>\r\n    </mat-list>\r\n  </mat-menu>\r\n</div>\r\n<mat-card *ngIf=\"mode === actionbarMode.Context\" class=\"context-menu-card mat-elevation-z4\">\r\n  <mat-list>\r\n      <ng-template ngFor let-action [ngForOf]=\"store.view.all$() | async\">\r\n          <igo-actionbar-item\r\n            color=\"accent\"\r\n            [withTitle]=\"withTitle\"\r\n            [withIcon]=\"withIcon\"\r\n            [color]=\"color\"\r\n            [disabled]=\"store.state.get(action).disabled\"\r\n            [action]=\"action\"\r\n            (trigger)=\"onTriggerAction(action)\">\r\n          </igo-actionbar-item>\r\n        <br/>\r\n      </ng-template>\r\n  </mat-list>\r\n</mat-card>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:block;height:100%;overflow:auto;position:relative}button{margin:4px}mat-list{padding-top:0}:host.horizontal{max-width:100%;overflow:hidden}:host.horizontal mat-list{width:auto;white-space:nowrap}:host.horizontal igo-actionbar-item{display:inline-block}:host ::ng-deep .mat-list .mat-list-item .mat-list-text>*{white-space:normal;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;max-height:36px;line-height:18px;-webkit-line-clamp:2}:host ::ng-deep .mat-list-base .mat-list-item.mat-list-item-with-avatar{height:46px}:host ::ng-deep .mat-list-base .mat-list-item.mat-list-item-with-avatar .mat-list-item-content{display:-webkit-flex;height:46px;padding:3px}:host ::ng-deep .mat-list-base .mat-list-item.mat-list-item-with-avatar .mat-list-item-content>mat-icon{padding:8px}igo-actionbar-item ::ng-deep mat-list-item [mat-list-avatar]{height:auto;width:40px}igo-actionbar-item ::ng-deep mat-list-item:hover{cursor:pointer}.context-menu-card{padding:8px 3px;margin:10px}"]
                }] }
    ];
    /** @nocollapse */
    ActionbarComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: Overlay }
    ]; };
    ActionbarComponent.propDecorators = {
        store: [{ type: Input }],
        mode: [{ type: Input }],
        withToggleButton: [{ type: Input }],
        horizontal: [{ type: Input }],
        color: [{ type: Input }],
        withTitle: [{ type: Input }],
        withIcon: [{ type: Input }],
        xPosition: [{ type: Input }],
        yPosition: [{ type: Input }],
        overlayClass: [{ type: Input }],
        itemClassFunc: [{ type: Input }],
        withTitleClass: [{ type: HostBinding, args: ['class.with-title',] }],
        withIconClass: [{ type: HostBinding, args: ['class.with-icon',] }],
        horizontalClass: [{ type: HostBinding, args: ['class.horizontal',] }]
    };
    return ActionbarComponent;
}());
export { ActionbarComponent };
if (false) {
    /**
     * Reference to the ActionbarMode enum for use in the template
     * \@internal
     * @type {?}
     */
    ActionbarComponent.prototype.actionbarMode;
    /**
     * Whether the actionbar is collapsed (Dock mode)
     * \@internal
     * @type {?}
     */
    ActionbarComponent.prototype.collapsed;
    /**
     * Toggle collapse action (Dock)
     * \@internal
     * @type {?}
     */
    ActionbarComponent.prototype.toggleCollapseAction;
    /**
     * Action store watcher
     * \@internal
     * @type {?}
     * @private
     */
    ActionbarComponent.prototype.watcher;
    /**
     * Action store
     * @type {?}
     */
    ActionbarComponent.prototype.store;
    /**
     * Actionbar mode
     * @type {?}
     */
    ActionbarComponent.prototype.mode;
    /**
     * Whether a toggle button should be displayed (Dock mode)
     * @type {?}
     */
    ActionbarComponent.prototype.withToggleButton;
    /**
     * Whether a the actionbar should display buttons horizontally
     * @type {?}
     */
    ActionbarComponent.prototype.horizontal;
    /**
     * Color
     * @type {?}
     */
    ActionbarComponent.prototype.color;
    /**
     * Whether action titles are displayed
     * @type {?}
     */
    ActionbarComponent.prototype.withTitle;
    /**
     * Whether action icons are displayed
     * @type {?}
     */
    ActionbarComponent.prototype.withIcon;
    /**
     * Overlay X position
     * @type {?}
     */
    ActionbarComponent.prototype.xPosition;
    /**
     * Overlay X position
     * @type {?}
     */
    ActionbarComponent.prototype.yPosition;
    /**
     * @type {?}
     * @private
     */
    ActionbarComponent.prototype._overlayClass;
    /**
     * Function to add class to item actionbar
     * @type {?}
     */
    ActionbarComponent.prototype.itemClassFunc;
    /**
     * @type {?}
     * @private
     */
    ActionbarComponent.prototype.cdRef;
    /** @type {?} */
    ActionbarComponent.prototype.overlay;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9hY3Rpb24vYWN0aW9uYmFyL2FjdGlvbmJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxXQUFXLEVBQ1gsaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUl4QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7O0FBTS9DO0lBZ0lFLDRCQUFvQixLQUF3QixFQUFTLE9BQWdCO1FBQXJFLGlCQUF5RTtRQUFyRCxVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUFTLFlBQU8sR0FBUCxPQUFPLENBQVM7Ozs7O1FBckhyRSxrQkFBYSxHQUFHLGFBQWEsQ0FBQzs7Ozs7UUFNOUIsY0FBUyxHQUFHLEtBQUssQ0FBQzs7Ozs7UUFNbEIseUJBQW9CLEdBQUc7WUFDckIsRUFBRSxFQUFFLGtCQUFrQjtZQUN0QixJQUFJLEVBQUUsZUFBZTtZQUNyQixPQUFPOzs7WUFBRTtnQkFDUCxLQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQztZQUNuQyxDQUFDLENBQUE7U0FDRixDQUFDOzs7O1FBZ0JPLFNBQUksR0FBa0IsYUFBYSxDQUFDLElBQUksQ0FBQzs7OztRQUt6QyxxQkFBZ0IsR0FBRyxLQUFLLENBQUM7Ozs7UUFLekIsZUFBVSxHQUFHLEtBQUssQ0FBQzs7OztRQUtuQixVQUFLLEdBQUcsU0FBUyxDQUFDOzs7O1FBS2xCLGNBQVMsR0FBRyxJ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SzNCLHVDQUEwQjs7Ozs7SUFLMUIsc0NBQXlCOzs7OztJQUt6Qix1Q0FBOEI7Ozs7O0lBSzlCLHVDQUE2Qjs7Ozs7SUFZN0IsMkNBQTJCOzs7OztJQUszQiwyQ0FDMEM7Ozs7O0lBOEI5QixtQ0FBZ0M7O0lBQUUscUNBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgSG9zdEJpbmRpbmcsXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgT25DaGFuZ2VzLFxyXG4gIE9uRGVzdHJveSxcclxuICBTaW1wbGVDaGFuZ2VzXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBFbnRpdHlTdG9yZVdhdGNoZXIgfSBmcm9tICcuLi8uLi9lbnRpdHknO1xyXG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICcuLi9zaGFyZWQvYWN0aW9uLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBBY3Rpb25iYXJNb2RlIH0gZnJvbSAnLi4vc2hhcmVkL2FjdGlvbi5lbnVtcyc7XHJcbmltcG9ydCB7IEFjdGlvblN0b3JlIH0gZnJvbSAnLi4vc2hhcmVkL3N0b3JlJztcclxuaW1wb3J0IHsgT3ZlcmxheSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcclxuXHJcbi8qKlxyXG4gKiBBIGxpc3Qgb2YgYWN0aW9uIGJ1dHRvbnMuXHJcbiAqIFRoaXMgY29tcG9uZW50IGNhbiBiZSBkaXNwbGF5ZWQgaW4gb25lIG9mIHR3byB3YXk6ICdkb2NrJyBvciAnb3ZlcmxheSdcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWFjdGlvbmJhcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FjdGlvbmJhci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYWN0aW9uYmFyLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEFjdGlvbmJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcclxuICAvKipcclxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIEFjdGlvbmJhck1vZGUgZW51bSBmb3IgdXNlIGluIHRoZSB0ZW1wbGF0ZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGFjdGlvbmJhck1vZGUgPSBBY3Rpb25iYXJNb2RlO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoZSBhY3Rpb25iYXIgaXMgY29sbGFwc2VkIChEb2NrIG1vZGUpXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgY29sbGFwc2VkID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRvZ2dsZSBjb2xsYXBzZSBhY3Rpb24gKERvY2spXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgdG9nZ2xlQ29sbGFwc2VBY3Rpb24gPSB7XHJcbiAgICBpZDogJ2FjdGlvbmJhcl90b2dnbGUnLFxyXG4gICAgaWNvbjogJ2RvdHMtdmVydGljYWwnLFxyXG4gICAgaGFuZGxlcjogKCkgPT4ge1xyXG4gICAgICB0aGlzLmNvbGxhcHNlZCA9ICF0aGlzLmNvbGxhcHNlZDtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBBY3Rpb24gc3RvcmUgd2F0Y2hlclxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgd2F0Y2hlcjogRW50aXR5U3RvcmVXYXRjaGVyPEFjdGlvbj47XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjdGlvbiBzdG9yZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0b3JlOiBBY3Rpb25TdG9yZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQWN0aW9uYmFyIG1vZGVcclxuICAgKi9cclxuICBASW5wdXQoKSBtb2RlOiBBY3Rpb25iYXJNb2RlID0gQWN0aW9uYmFyTW9kZS5Eb2NrO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGEgdG9nZ2xlIGJ1dHRvbiBzaG91bGQgYmUgZGlzcGxheWVkIChEb2NrIG1vZGUpXHJcbiAgICovXHJcbiAgQElucHV0KCkgd2l0aFRvZ2dsZUJ1dHRvbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGEgdGhlIGFjdGlvbmJhciBzaG91bGQgZGlzcGxheSBidXR0b25zIGhvcml6b250YWxseVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGhvcml6b250YWwgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29sb3JcclxuICAgKi9cclxuICBASW5wdXQoKSBjb2xvciA9ICdkZWZhdWx0JztcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBhY3Rpb24gdGl0bGVzIGFyZSBkaXNwbGF5ZWRcclxuICAgKi9cclxuICBASW5wdXQoKSB3aXRoVGl0bGUgPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGFjdGlvbiBpY29ucyBhcmUgZGlzcGxheWVkXHJcbiAgICovXHJcbiAgQElucHV0KCkgd2l0aEljb24gPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBPdmVybGF5IFggcG9zaXRpb25cclxuICAgKi9cclxuICBASW5wdXQoKSB4UG9zaXRpb24gPSAnYmVmb3JlJztcclxuXHJcbiAgLyoqXHJcbiAgICogT3ZlcmxheSBYIHBvc2l0aW9uXHJcbiAgICovXHJcbiAgQElucHV0KCkgeVBvc2l0aW9uID0gJ2Fib3ZlJztcclxuXHJcbiAgLyoqXHJcbiAgICogQ2xhc3MgdG8gYWRkIHRvIHRoZSBhY3Rpb25iYXIgb3ZlcmxheVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IG92ZXJsYXlDbGFzcyh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9vdmVybGF5Q2xhc3MgPSB2YWx1ZTtcclxuICB9XHJcbiAgZ2V0IG92ZXJsYXlDbGFzcygpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIFt0aGlzLl9vdmVybGF5Q2xhc3MsICdpZ28tYWN0aW9uYmFyLW92ZXJsYXknXS5qb2luKCcgJyk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX292ZXJsYXlDbGFzcyA9ICcnO1xyXG5cclxuICAvKipcclxuICAgKiBGdW5jdGlvbiB0byBhZGQgY2xhc3MgdG8gaXRlbSBhY3Rpb25iYXJcclxuICAgKi9cclxuICBASW5wdXQoKSBpdGVtQ2xhc3NGdW5jOiAoYWN0aW9uOiBBY3Rpb24pID0+IHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9ID1cclxuICAgIEFjdGlvbmJhckNvbXBvbmVudC5kZWZhdWx0SXRlbUNsYXNzRnVuYztcclxuXHJcbiAgLyoqXHJcbiAgICogQGlnbm9yZVxyXG4gICAqL1xyXG4gIEBIb3N0QmluZGluZygnY2xhc3Mud2l0aC10aXRsZScpXHJcbiAgZ2V0IHdpdGhUaXRsZUNsYXNzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMud2l0aFRpdGxlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGlnbm9yZVxyXG4gICAqL1xyXG4gIEBIb3N0QmluZGluZygnY2xhc3Mud2l0aC1pY29uJylcclxuICBnZXQgd2l0aEljb25DbGFzcygpIHtcclxuICAgIHJldHVybiB0aGlzLndpdGhJY29uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGlnbm9yZVxyXG4gICAqL1xyXG4gIEBIb3N0QmluZGluZygnY2xhc3MuaG9yaXpvbnRhbCcpXHJcbiAgZ2V0IGhvcml6b250YWxDbGFzcygpIHtcclxuICAgIHJldHVybiB0aGlzLmhvcml6b250YWw7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZGVmYXVsdEl0ZW1DbGFzc0Z1bmMoYWN0aW9uOiBBY3Rpb24pIHtcclxuICAgIHJldHVybiB7fTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLCBwdWJsaWMgb3ZlcmxheTogT3ZlcmxheSkge31cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgY29uc3Qgc3RvcmUgPSBjaGFuZ2VzLnN0b3JlO1xyXG4gICAgaWYgKHN0b3JlICYmIHN0b3JlLmN1cnJlbnRWYWx1ZSAhPT0gc3RvcmUucHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICBpZiAodGhpcy53YXRjaGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLndhdGNoZXIuZGVzdHJveSgpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMud2F0Y2hlciA9IG5ldyBFbnRpdHlTdG9yZVdhdGNoZXIodGhpcy5zdG9yZSwgdGhpcy5jZFJlZik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMud2F0Y2hlci5kZXN0cm95KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnZva2UgdGhlIGFjdGlvbiBoYW5kbGVyXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25UcmlnZ2VyQWN0aW9uKGFjdGlvbjogQWN0aW9uKSB7XHJcbiAgICBjb25zdCBhcmdzID0gYWN0aW9uLmFyZ3MgfHwgW107XHJcbiAgICBhY3Rpb24uaGFuZGxlciguLi5hcmdzKTtcclxuICB9XHJcbn1cclxuIl19