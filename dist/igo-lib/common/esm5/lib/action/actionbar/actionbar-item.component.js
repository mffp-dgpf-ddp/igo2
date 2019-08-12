/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
/**
 * An action button
 */
var ActionbarItemComponent = /** @class */ (function () {
    function ActionbarItemComponent() {
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
    Object.defineProperty(ActionbarItemComponent.prototype, "title", {
        /**
         * @internal
         */
        get: /**
         * \@internal
         * @return {?}
         */
        function () { return this.action.title; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionbarItemComponent.prototype, "tooltip", {
        /**
         * @internal
         */
        get: /**
         * \@internal
         * @return {?}
         */
        function () { return this.action.tooltip || this.title; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionbarItemComponent.prototype, "icon", {
        /**
         * @internal
         */
        get: /**
         * \@internal
         * @return {?}
         */
        function () { return this.action.icon; },
        enumerable: true,
        configurable: true
    });
    /**
     * When the action button is clicked, emit the 'trigger' event but don't
     * invoke the action handler. This is handled by the parent component.
     * @internal
     */
    /**
     * When the action button is clicked, emit the 'trigger' event but don't
     * invoke the action handler. This is handled by the parent component.
     * \@internal
     * @return {?}
     */
    ActionbarItemComponent.prototype.onClick = /**
     * When the action button is clicked, emit the 'trigger' event but don't
     * invoke the action handler. This is handled by the parent component.
     * \@internal
     * @return {?}
     */
    function () {
        if (this.disabled === true) {
            return;
        }
        this.trigger.emit(this.action);
    };
    ActionbarItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-actionbar-item',
                    template: "<mat-list-item\r\n  matTooltipClass=\"actionbarItemTooltip\"\r\n  matTooltipShowDelay=\"500\"\r\n  [matTooltip]=\"tooltip | translate\"\r\n  [ngClass]=\"{'igo-actionbar-item-disabled': disabled}\"\r\n  (click)=\"onClick()\">\r\n  <button *ngIf=\"withIcon\"\r\n    mat-list-avatar\r\n    mat-icon-button\r\n    [color]=\"color\"\r\n    [disabled]=\"disabled\">\r\n    <mat-icon *ngIf=\"withIcon\" svgIcon=\"{{icon}}\"></mat-icon>\r\n  </button>\r\n  <h4 *ngIf=\"withTitle\" matLine>{{title | translate}}</h4>\r\n</mat-list-item>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["mat-list-item.igo-actionbar-item-disabled{color:rgba(0,0,0,.26);cursor:default!important}"]
                }] }
    ];
    /** @nocollapse */
    ActionbarItemComponent.ctorParameters = function () { return []; };
    ActionbarItemComponent.propDecorators = {
        action: [{ type: Input }],
        color: [{ type: Input }],
        withTitle: [{ type: Input }],
        withIcon: [{ type: Input }],
        disabled: [{ type: Input }],
        trigger: [{ type: Output }]
    };
    return ActionbarItemComponent;
}());
export { ActionbarItemComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uYmFyLWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2FjdGlvbi9hY3Rpb25iYXIvYWN0aW9uYmFyLWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQzs7OztBQU92QjtJQXFERTs7OztRQXJDUyxVQUFLLEdBQUcsU0FBUyxDQUFDOzs7O1FBS2xCLGNBQVMsR0FBRyxJQUFJLENBQUM7Ozs7UUFLakIsYUFBUSxHQUFHLElBQUksQ0FBQzs7OztRQUtoQixhQUFRLEdBQUcsS0FBSyxDQUFDOzs7O1FBS2hCLFlBQU8sR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQWlCOUMsQ0FBQztJQVpoQixzQkFBSSx5Q0FBSztRQUhUOztXQUVHOzs7OztRQUNILGNBQXNCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUtqRCxzQkFBSSwyQ0FBTztRQUhYOztXQUVHOzs7OztRQUNILGNBQXdCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBS25FLHNCQUFJLHdDQUFJO1FBSFI7O1dBRUc7Ozs7O1FBQ0gsY0FBcUIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBSS9DOzs7O09BSUc7Ozs7Ozs7SUFDSCx3Q0FBTzs7Ozs7O0lBQVA7UUFDRSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxFQUFFO1lBQzFCLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqQyxDQUFDOztnQkFqRUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLCtoQkFBOEM7b0JBRTlDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozs7O3lCQU1FLEtBQUs7d0JBS0wsS0FBSzs0QkFLTCxLQUFLOzJCQUtMLEtBQUs7MkJBS0wsS0FBSzswQkFLTCxNQUFNOztJQThCVCw2QkFBQztDQUFBLEFBbEVELElBa0VDO1NBNURZLHNCQUFzQjs7Ozs7O0lBS2pDLHdDQUF3Qjs7Ozs7SUFLeEIsdUNBQTJCOzs7OztJQUszQiwyQ0FBMEI7Ozs7O0lBSzFCLDBDQUF5Qjs7Ozs7SUFLekIsMENBQTBCOzs7OztJQUsxQix5Q0FBNkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICcuLi9zaGFyZWQvYWN0aW9uLmludGVyZmFjZXMnO1xyXG5cclxuIC8qKlxyXG4gICogQW4gYWN0aW9uIGJ1dHRvblxyXG4gICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWFjdGlvbmJhci1pdGVtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYWN0aW9uYmFyLWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2FjdGlvbmJhci1pdGVtLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEFjdGlvbmJhckl0ZW1Db21wb25lbnQge1xyXG5cclxuICAvKipcclxuICAgKiBBY3Rpb25cclxuICAgKi9cclxuICBASW5wdXQoKSBhY3Rpb246IEFjdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29sb3JcclxuICAgKi9cclxuICBASW5wdXQoKSBjb2xvciA9ICdkZWZhdWx0JztcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgYWN0aW9uIHRpdGxlIGlzIGRpc3BsYXllZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHdpdGhUaXRsZSA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhlIGFjdGlvbiBpY29uIGlzIGRpc3BsYXllZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHdpdGhJY29uID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgYWN0aW9uIGlzIGRpc2FibGVkXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBhY3Rpb24gYnV0dG9uIGlzIGNsaWNrZWRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgdHJpZ2dlcjogRXZlbnRFbWl0dGVyPEFjdGlvbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCB0aXRsZSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5hY3Rpb24udGl0bGU7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IHRvb2x0aXAoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuYWN0aW9uLnRvb2x0aXAgfHwgdGhpcy50aXRsZTsgfVxyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgaWNvbigpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5hY3Rpb24uaWNvbjsgfVxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdGhlIGFjdGlvbiBidXR0b24gaXMgY2xpY2tlZCwgZW1pdCB0aGUgJ3RyaWdnZXInIGV2ZW50IGJ1dCBkb24ndFxyXG4gICAqIGludm9rZSB0aGUgYWN0aW9uIGhhbmRsZXIuIFRoaXMgaXMgaGFuZGxlZCBieSB0aGUgcGFyZW50IGNvbXBvbmVudC5cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvbkNsaWNrKCkge1xyXG4gICAgaWYgKHRoaXMuZGlzYWJsZWQgPT09IHRydWUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy50cmlnZ2VyLmVtaXQodGhpcy5hY3Rpb24pO1xyXG4gIH1cclxufVxyXG4iXX0=