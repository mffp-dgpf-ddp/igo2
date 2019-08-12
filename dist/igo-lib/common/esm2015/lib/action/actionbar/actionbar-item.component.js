/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
/**
 * An action button
 */
export class ActionbarItemComponent {
    constructor() {
        /**
         * Color
         */
        this.color = 'default';
        /**
         * Whether the action title is displayed
         */
        this.withTitle = true;
        /**
         * Whether the action icon is displayed
         */
        this.withIcon = true;
        /**
         * Whether the action is disabled
         */
        this.disabled = false;
        /**
         * Event emitted when the action button is clicked
         */
        this.trigger = new EventEmitter();
    }
    /**
     * \@internal
     * @return {?}
     */
    get title() { return this.action.title; }
    /**
     * \@internal
     * @return {?}
     */
    get tooltip() { return this.action.tooltip || this.title; }
    /**
     * \@internal
     * @return {?}
     */
    get icon() { return this.action.icon; }
    /**
     * When the action button is clicked, emit the 'trigger' event but don't
     * invoke the action handler. This is handled by the parent component.
     * \@internal
     * @return {?}
     */
    onClick() {
        if (this.disabled === true) {
            return;
        }
        this.trigger.emit(this.action);
    }
}
ActionbarItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-actionbar-item',
                template: "<mat-list-item\r\n  matTooltipClass=\"actionbarItemTooltip\"\r\n  matTooltipShowDelay=\"500\"\r\n  [matTooltip]=\"tooltip | translate\"\r\n  [ngClass]=\"{'igo-actionbar-item-disabled': disabled}\"\r\n  (click)=\"onClick()\">\r\n  <button *ngIf=\"withIcon\"\r\n    mat-list-avatar\r\n    mat-icon-button\r\n    [color]=\"color\"\r\n    [disabled]=\"disabled\">\r\n    <mat-icon *ngIf=\"withIcon\" svgIcon=\"{{icon}}\"></mat-icon>\r\n  </button>\r\n  <h4 *ngIf=\"withTitle\" matLine>{{title | translate}}</h4>\r\n</mat-list-item>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["mat-list-item.igo-actionbar-item-disabled{color:rgba(0,0,0,.26);cursor:default!important}"]
            }] }
];
/** @nocollapse */
ActionbarItemComponent.ctorParameters = () => [];
ActionbarItemComponent.propDecorators = {
    action: [{ type: Input }],
    color: [{ type: Input }],
    withTitle: [{ type: Input }],
    withIcon: [{ type: Input }],
    disabled: [{ type: Input }],
    trigger: [{ type: Output }]
};
if (false) {
    /**
     * Action
     * @type {?}
     */
    ActionbarItemComponent.prototype.action;
    /**
     * Color
     * @type {?}
     */
    ActionbarItemComponent.prototype.color;
    /**
     * Whether the action title is displayed
     * @type {?}
     */
    ActionbarItemComponent.prototype.withTitle;
    /**
     * Whether the action icon is displayed
     * @type {?}
     */
    ActionbarItemComponent.prototype.withIcon;
    /**
     * Whether the action is disabled
     * @type {?}
     */
    ActionbarItemComponent.prototype.disabled;
    /**
     * Event emitted when the action button is clicked
     * @type {?}
     */
    ActionbarItemComponent.prototype.trigger;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uYmFyLWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2FjdGlvbi9hY3Rpb25iYXIvYWN0aW9uYmFyLWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQzs7OztBQWF2QixNQUFNLE9BQU8sc0JBQXNCO0lBK0NqQzs7OztRQXJDUyxVQUFLLEdBQUcsU0FBUyxDQUFDOzs7O1FBS2xCLGNBQVMsR0FBRyxJQUFJLENBQUM7Ozs7UUFLakIsYUFBUSxHQUFHLElBQUksQ0FBQzs7OztRQUtoQixhQUFRLEdBQUcsS0FBSyxDQUFDOzs7O1FBS2hCLFlBQU8sR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQWlCOUMsQ0FBQzs7Ozs7SUFaaEIsSUFBSSxLQUFLLEtBQWEsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Ozs7O0lBS2pELElBQUksT0FBTyxLQUFhLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Ozs7O0lBS25FLElBQUksSUFBSSxLQUFhLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O0lBUy9DLE9BQU87UUFDTCxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxFQUFFO1lBQzFCLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7WUFqRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLCtoQkFBOEM7Z0JBRTlDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7Ozs7cUJBTUUsS0FBSztvQkFLTCxLQUFLO3dCQUtMLEtBQUs7dUJBS0wsS0FBSzt1QkFLTCxLQUFLO3NCQUtMLE1BQU07Ozs7Ozs7SUF6QlAsd0NBQXdCOzs7OztJQUt4Qix1Q0FBMkI7Ozs7O0lBSzNCLDJDQUEwQjs7Ozs7SUFLMUIsMENBQXlCOzs7OztJQUt6QiwwQ0FBMEI7Ozs7O0lBSzFCLHlDQUE2RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJy4uL3NoYXJlZC9hY3Rpb24uaW50ZXJmYWNlcyc7XHJcblxyXG4gLyoqXHJcbiAgKiBBbiBhY3Rpb24gYnV0dG9uXHJcbiAgKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tYWN0aW9uYmFyLWl0ZW0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hY3Rpb25iYXItaXRlbS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYWN0aW9uYmFyLWl0ZW0uY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWN0aW9uYmFySXRlbUNvbXBvbmVudCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjdGlvblxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGFjdGlvbjogQWN0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBDb2xvclxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNvbG9yID0gJ2RlZmF1bHQnO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoZSBhY3Rpb24gdGl0bGUgaXMgZGlzcGxheWVkXHJcbiAgICovXHJcbiAgQElucHV0KCkgd2l0aFRpdGxlID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgYWN0aW9uIGljb24gaXMgZGlzcGxheWVkXHJcbiAgICovXHJcbiAgQElucHV0KCkgd2l0aEljb24gPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoZSBhY3Rpb24gaXMgZGlzYWJsZWRcclxuICAgKi9cclxuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGFjdGlvbiBidXR0b24gaXMgY2xpY2tlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSB0cmlnZ2VyOiBFdmVudEVtaXR0ZXI8QWN0aW9uPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLmFjdGlvbi50aXRsZTsgfVxyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgdG9vbHRpcCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5hY3Rpb24udG9vbHRpcCB8fCB0aGlzLnRpdGxlOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBpY29uKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLmFjdGlvbi5pY29uOyB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0aGUgYWN0aW9uIGJ1dHRvbiBpcyBjbGlja2VkLCBlbWl0IHRoZSAndHJpZ2dlcicgZXZlbnQgYnV0IGRvbid0XHJcbiAgICogaW52b2tlIHRoZSBhY3Rpb24gaGFuZGxlci4gVGhpcyBpcyBoYW5kbGVkIGJ5IHRoZSBwYXJlbnQgY29tcG9uZW50LlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uQ2xpY2soKSB7XHJcbiAgICBpZiAodGhpcy5kaXNhYmxlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnRyaWdnZXIuZW1pdCh0aGlzLmFjdGlvbik7XHJcbiAgfVxyXG59XHJcbiJdfQ==