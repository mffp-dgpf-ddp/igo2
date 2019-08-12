/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, HostBinding, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { EntityStoreWatcher } from '../../entity';
import { ActionbarMode } from '../shared/action.enums';
import { ActionStore } from '../shared/store';
import { Overlay } from '@angular/cdk/overlay';
/**
 * A list of action buttons.
 * This component can be displayed in one of two way: 'dock' or 'overlay'
 */
export class ActionbarComponent {
    /**
     * @param {?} cdRef
     * @param {?} overlay
     */
    constructor(cdRef, overlay) {
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
            () => {
                this.collapsed = !this.collapsed;
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
    /**
     * Class to add to the actionbar overlay
     * @param {?} value
     * @return {?}
     */
    set overlayClass(value) {
        this._overlayClass = value;
    }
    /**
     * @return {?}
     */
    get overlayClass() {
        return [this._overlayClass, 'igo-actionbar-overlay'].join(' ');
    }
    /**
     * @ignore
     * @return {?}
     */
    get withTitleClass() {
        return this.withTitle;
    }
    /**
     * @ignore
     * @return {?}
     */
    get withIconClass() {
        return this.withIcon;
    }
    /**
     * @ignore
     * @return {?}
     */
    get horizontalClass() {
        return this.horizontal;
    }
    /**
     * @param {?} action
     * @return {?}
     */
    static defaultItemClassFunc(action) {
        return {};
    }
    /**
     * \@internal
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const store = changes.store;
        if (store && store.currentValue !== store.previousValue) {
            if (this.watcher !== undefined) {
                this.watcher.destroy();
            }
            this.watcher = new EntityStoreWatcher(this.store, this.cdRef);
        }
    }
    /**
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        this.watcher.destroy();
    }
    /**
     * Invoke the action handler
     * \@internal
     * @param {?} action
     * @return {?}
     */
    onTriggerAction(action) {
        /** @type {?} */
        const args = action.args || [];
        action.handler(...args);
    }
}
ActionbarComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-actionbar',
                template: "<mat-list *ngIf=\"mode === actionbarMode.Dock\">\r\n\r\n  <igo-actionbar-item\r\n    *ngIf=\"withToggleButton\"\r\n    color=\"accent\"\r\n    [withTitle]=\"false\"\r\n    [withIcon]=\"true\"\r\n    [color]=\"color\"\r\n    [disabled]=\"store.view.empty\"\r\n    [action]=\"toggleCollapseAction\"\r\n    (trigger)=\"onTriggerAction(toggleCollapseAction)\">\r\n  </igo-actionbar-item>\r\n\r\n  <ng-template *ngIf=\"!collapsed\" ngFor let-action [ngForOf]=\"store.view.all$() | async\">\r\n    <igo-actionbar-item\r\n      [ngClass]=\"itemClassFunc(action)\"\r\n      color=\"accent\"\r\n      [withTitle]=\"withTitle\"\r\n      [withIcon]=\"withIcon\"\r\n      [color]=\"color\"\r\n      [disabled]=\"store.state.get(action).disabled\"\r\n      [action]=\"action\"\r\n      (trigger)=\"onTriggerAction(action)\">\r\n    </igo-actionbar-item>\r\n  </ng-template>\r\n</mat-list>\r\n\r\n<div *ngIf=\"mode === actionbarMode.Overlay\">\r\n  <button\r\n    mat-icon-button\r\n    [matMenuTriggerFor]=\"actionbarMenu\"\r\n    [disabled]=\"store.view.empty\">\r\n    <mat-icon svgIcon=\"dots-horizontal\"></mat-icon>\r\n  </button>\r\n\r\n  <mat-menu\r\n    #actionbarMenu=\"matMenu\"\r\n    class=\"igo-compact-menu igo-no-min-width-menu\"\r\n    overlapTrigger=\"true\"\r\n    [xPosition]=\"xPosition\"\r\n    [yPosition]=\"yPosition\"\r\n    [class]=\"overlayClass\">\r\n\r\n    <mat-list>\r\n      <ng-template ngFor let-action [ngForOf]=\"store.view.all$() | async\">\r\n        <igo-actionbar-item\r\n          color=\"accent\"\r\n          [withTitle]=\"withTitle\"\r\n          [withIcon]=\"withIcon\"\r\n          [color]=\"color\"\r\n          [disabled]=\"store.state.get(action).disabled\"\r\n          [action]=\"action\"\r\n          (trigger)=\"onTriggerAction(action)\">\r\n        </igo-actionbar-item>\r\n      </ng-template>\r\n    </mat-list>\r\n  </mat-menu>\r\n</div>\r\n<mat-card *ngIf=\"mode === actionbarMode.Context\" class=\"context-menu-card mat-elevation-z4\">\r\n  <mat-list>\r\n      <ng-template ngFor let-action [ngForOf]=\"store.view.all$() | async\">\r\n          <igo-actionbar-item\r\n            color=\"accent\"\r\n            [withTitle]=\"withTitle\"\r\n            [withIcon]=\"withIcon\"\r\n            [color]=\"color\"\r\n            [disabled]=\"store.state.get(action).disabled\"\r\n            [action]=\"action\"\r\n            (trigger)=\"onTriggerAction(action)\">\r\n          </igo-actionbar-item>\r\n        <br/>\r\n      </ng-template>\r\n  </mat-list>\r\n</mat-card>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block;height:100%;overflow:auto;position:relative}button{margin:4px}mat-list{padding-top:0}:host.horizontal{max-width:100%;overflow:hidden}:host.horizontal mat-list{width:auto;white-space:nowrap}:host.horizontal igo-actionbar-item{display:inline-block}:host ::ng-deep .mat-list .mat-list-item .mat-list-text>*{white-space:normal;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;max-height:36px;line-height:18px;-webkit-line-clamp:2}:host ::ng-deep .mat-list-base .mat-list-item.mat-list-item-with-avatar{height:46px}:host ::ng-deep .mat-list-base .mat-list-item.mat-list-item-with-avatar .mat-list-item-content{display:-webkit-flex;height:46px;padding:3px}:host ::ng-deep .mat-list-base .mat-list-item.mat-list-item-with-avatar .mat-list-item-content>mat-icon{padding:8px}igo-actionbar-item ::ng-deep mat-list-item [mat-list-avatar]{height:auto;width:40px}igo-actionbar-item ::ng-deep mat-list-item:hover{cursor:pointer}.context-menu-card{padding:8px 3px;margin:10px}"]
            }] }
];
/** @nocollapse */
ActionbarComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Overlay }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9hY3Rpb24vYWN0aW9uYmFyL2FjdGlvbmJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsdUJBQXVCLEVBSXhCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUVsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7QUFZL0MsTUFBTSxPQUFPLGtCQUFrQjs7Ozs7SUEwSDdCLFlBQW9CLEtBQXdCLEVBQVMsT0FBZ0I7UUFBakQsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFTOzs7OztRQXJIckUsa0JBQWEsR0FBRyxhQUFhLENBQUM7Ozs7O1FBTTlCLGNBQVMsR0FBRyxLQUFLLENBQUM7Ozs7O1FBTWxCLHlCQUFvQixHQUFHO1lBQ3JCLEVBQUUsRUFBRSxrQkFBa0I7WUFDdEIsSUFBSSxFQUFFLGVBQWU7WUFDckIsT0FBTzs7O1lBQUUsR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ25DLENBQUMsQ0FBQTtTQUNGLENBQUM7Ozs7UUFnQk8sU0FBSSxHQUFrQixhQUFhLENBQUMsSUFBSSxDQUFDOzs7O1FBS3pDLHFCQUFnQixHQUFHLEtBQUssQ0FBQzs7OztRQUt6QixlQUFVLEdBQUcsS0FBSyxDQUFDOzs7O1FBS25CLFVBQUssR0FBRyxTQUFTLENBQUM7Ozs7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ICBIb3N0QmluZGluZyxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25EZXN0cm95LFxyXG4gIFNpbXBsZUNoYW5nZXNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEVudGl0eVN0b3JlV2F0Y2hlciB9IGZyb20gJy4uLy4uL2VudGl0eSc7XHJcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJy4uL3NoYXJlZC9hY3Rpb24uaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IEFjdGlvbmJhck1vZGUgfSBmcm9tICcuLi9zaGFyZWQvYWN0aW9uLmVudW1zJztcclxuaW1wb3J0IHsgQWN0aW9uU3RvcmUgfSBmcm9tICcuLi9zaGFyZWQvc3RvcmUnO1xyXG5pbXBvcnQgeyBPdmVybGF5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xyXG5cclxuLyoqXHJcbiAqIEEgbGlzdCBvZiBhY3Rpb24gYnV0dG9ucy5cclxuICogVGhpcyBjb21wb25lbnQgY2FuIGJlIGRpc3BsYXllZCBpbiBvbmUgb2YgdHdvIHdheTogJ2RvY2snIG9yICdvdmVybGF5J1xyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tYWN0aW9uYmFyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYWN0aW9uYmFyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hY3Rpb25iYXIuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWN0aW9uYmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95LCBPbkNoYW5nZXMge1xyXG4gIC8qKlxyXG4gICAqIFJlZmVyZW5jZSB0byB0aGUgQWN0aW9uYmFyTW9kZSBlbnVtIGZvciB1c2UgaW4gdGhlIHRlbXBsYXRlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgYWN0aW9uYmFyTW9kZSA9IEFjdGlvbmJhck1vZGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhlIGFjdGlvbmJhciBpcyBjb2xsYXBzZWQgKERvY2sgbW9kZSlcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBjb2xsYXBzZWQgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVG9nZ2xlIGNvbGxhcHNlIGFjdGlvbiAoRG9jaylcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICB0b2dnbGVDb2xsYXBzZUFjdGlvbiA9IHtcclxuICAgIGlkOiAnYWN0aW9uYmFyX3RvZ2dsZScsXHJcbiAgICBpY29uOiAnZG90cy12ZXJ0aWNhbCcsXHJcbiAgICBoYW5kbGVyOiAoKSA9PiB7XHJcbiAgICAgIHRoaXMuY29sbGFwc2VkID0gIXRoaXMuY29sbGFwc2VkO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjdGlvbiBzdG9yZSB3YXRjaGVyXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB3YXRjaGVyOiBFbnRpdHlTdG9yZVdhdGNoZXI8QWN0aW9uPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQWN0aW9uIHN0b3JlXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3RvcmU6IEFjdGlvblN0b3JlO1xyXG5cclxuICAvKipcclxuICAgKiBBY3Rpb25iYXIgbW9kZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1vZGU6IEFjdGlvbmJhck1vZGUgPSBBY3Rpb25iYXJNb2RlLkRvY2s7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgYSB0b2dnbGUgYnV0dG9uIHNob3VsZCBiZSBkaXNwbGF5ZWQgKERvY2sgbW9kZSlcclxuICAgKi9cclxuICBASW5wdXQoKSB3aXRoVG9nZ2xlQnV0dG9uID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgYSB0aGUgYWN0aW9uYmFyIHNob3VsZCBkaXNwbGF5IGJ1dHRvbnMgaG9yaXpvbnRhbGx5XHJcbiAgICovXHJcbiAgQElucHV0KCkgaG9yaXpvbnRhbCA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBDb2xvclxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNvbG9yID0gJ2RlZmF1bHQnO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGFjdGlvbiB0aXRsZXMgYXJlIGRpc3BsYXllZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHdpdGhUaXRsZSA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgYWN0aW9uIGljb25zIGFyZSBkaXNwbGF5ZWRcclxuICAgKi9cclxuICBASW5wdXQoKSB3aXRoSWNvbiA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIE92ZXJsYXkgWCBwb3NpdGlvblxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHhQb3NpdGlvbiA9ICdiZWZvcmUnO1xyXG5cclxuICAvKipcclxuICAgKiBPdmVybGF5IFggcG9zaXRpb25cclxuICAgKi9cclxuICBASW5wdXQoKSB5UG9zaXRpb24gPSAnYWJvdmUnO1xyXG5cclxuICAvKipcclxuICAgKiBDbGFzcyB0byBhZGQgdG8gdGhlIGFjdGlvbmJhciBvdmVybGF5XHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBzZXQgb3ZlcmxheUNsYXNzKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX292ZXJsYXlDbGFzcyA9IHZhbHVlO1xyXG4gIH1cclxuICBnZXQgb3ZlcmxheUNsYXNzKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gW3RoaXMuX292ZXJsYXlDbGFzcywgJ2lnby1hY3Rpb25iYXItb3ZlcmxheSddLmpvaW4oJyAnKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfb3ZlcmxheUNsYXNzID0gJyc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIHRvIGFkZCBjbGFzcyB0byBpdGVtIGFjdGlvbmJhclxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGl0ZW1DbGFzc0Z1bmM6IChhY3Rpb246IEFjdGlvbikgPT4geyBba2V5OiBzdHJpbmddOiBib29sZWFuIH0gPVxyXG4gICAgQWN0aW9uYmFyQ29tcG9uZW50LmRlZmF1bHRJdGVtQ2xhc3NGdW5jO1xyXG5cclxuICAvKipcclxuICAgKiBAaWdub3JlXHJcbiAgICovXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy53aXRoLXRpdGxlJylcclxuICBnZXQgd2l0aFRpdGxlQ2xhc3MoKSB7XHJcbiAgICByZXR1cm4gdGhpcy53aXRoVGl0bGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaWdub3JlXHJcbiAgICovXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy53aXRoLWljb24nKVxyXG4gIGdldCB3aXRoSWNvbkNsYXNzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMud2l0aEljb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaWdub3JlXHJcbiAgICovXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5ob3Jpem9udGFsJylcclxuICBnZXQgaG9yaXpvbnRhbENsYXNzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaG9yaXpvbnRhbDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBkZWZhdWx0SXRlbUNsYXNzRnVuYyhhY3Rpb246IEFjdGlvbikge1xyXG4gICAgcmV0dXJuIHt9O1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHB1YmxpYyBvdmVybGF5OiBPdmVybGF5KSB7fVxyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBjb25zdCBzdG9yZSA9IGNoYW5nZXMuc3RvcmU7XHJcbiAgICBpZiAoc3RvcmUgJiYgc3RvcmUuY3VycmVudFZhbHVlICE9PSBzdG9yZS5wcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgIGlmICh0aGlzLndhdGNoZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMud2F0Y2hlci5kZXN0cm95KCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy53YXRjaGVyID0gbmV3IEVudGl0eVN0b3JlV2F0Y2hlcih0aGlzLnN0b3JlLCB0aGlzLmNkUmVmKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy53YXRjaGVyLmRlc3Ryb3koKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEludm9rZSB0aGUgYWN0aW9uIGhhbmRsZXJcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvblRyaWdnZXJBY3Rpb24oYWN0aW9uOiBBY3Rpb24pIHtcclxuICAgIGNvbnN0IGFyZ3MgPSBhY3Rpb24uYXJncyB8fCBbXTtcclxuICAgIGFjdGlvbi5oYW5kbGVyKC4uLmFyZ3MpO1xyXG4gIH1cclxufVxyXG4iXX0=