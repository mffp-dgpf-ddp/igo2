/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { StorageService } from '@igo2/core';
import { AuthService } from '@igo2/auth';
import { TypePermission } from '../shared/context.enum';
var ContextItemComponent = /** @class */ (function () {
    function ContextItemComponent(auth, storageService) {
        this.auth = auth;
        this.storageService = storageService;
        this.typePermission = TypePermission;
        this.color = 'primary';
        this.collapsed = true;
        this._default = false;
        this.edit = new EventEmitter();
        this.delete = new EventEmitter();
        this.save = new EventEmitter();
        this.clone = new EventEmitter();
        this.hide = new EventEmitter();
        this.show = new EventEmitter();
        this.favorite = new EventEmitter();
        this.managePermissions = new EventEmitter();
        this.manageTools = new EventEmitter();
    }
    Object.defineProperty(ContextItemComponent.prototype, "context", {
        get: /**
         * @return {?}
         */
        function () {
            return this._context;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._context = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextItemComponent.prototype, "default", {
        get: /**
         * @return {?}
         */
        function () {
            return this._default;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._default = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextItemComponent.prototype, "hidden", {
        get: /**
         * @return {?}
         */
        function () {
            return this.context.hidden;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextItemComponent.prototype, "canShare", {
        get: /**
         * @return {?}
         */
        function () {
            return this.storageService.get('canShare') === true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} context
     * @return {?}
     */
    ContextItemComponent.prototype.favoriteClick = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        if (this.auth.authenticated) {
            this.favorite.emit(context);
        }
    };
    ContextItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-context-item',
                    template: "<mat-list-item\r\n  class=\"mat-list-item\"\r\n  [ngClass]=\"{'mat-list-item-light': hidden}\">\r\n  <button mat-list-avatar\r\n    *ngIf=\"auth.authenticated\"\r\n    mat-icon-button\r\n    igoStopPropagation\r\n    [matTooltip]=\"auth.authenticated ? ('igo.context.contextManager.favorite' | translate) : ''\"\r\n    matTooltipShowDelay=\"500\"\r\n    [color]=\"default ? 'primary' : 'default'\"\r\n    (click)=\"favoriteClick(context)\">\r\n    <mat-icon *ngIf=\"!context.iconImage\" svgIcon=\"{{context.icon ? context.icon : context.scope === 'public' ? 'earth' : 'star'}}\"></mat-icon>\r\n    <img *ngIf=\"context.iconImage\" [src]=\"context.iconImage\">\r\n  </button>\r\n  <h4 matLine>{{context.title}}</h4>\r\n\r\n  <div *ngIf=\"auth.authenticated\"\r\n       igoStopPropagation\r\n       class=\"igo-actions-container\">\r\n\r\n     <button *ngIf=\"collapsed && selected && (context.permission === typePermission[typePermission.write] || context.imported)\"\r\n       mat-icon-button\r\n       [matTooltip]=\"'igo.context.contextManager.save' | translate\"\r\n       matTooltipShowDelay=\"500\"\r\n       [color]=\"color\"\r\n       (click)=\"save.emit(context)\">\r\n       <mat-icon svgIcon=\"content-save\"></mat-icon>\r\n     </button>\r\n\r\n    <div #actions class=\"igo-actions-expand-container\">\r\n\r\n      <button *ngIf=\"canShare && !context.imported\"\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.context.contextManager.managePermissions' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        [color]=\"color\"\r\n        (click)=\"managePermissions.emit(context)\">\r\n        <mat-icon svgIcon=\"account-arrow-right\"></mat-icon>\r\n      </button>\r\n\r\n      <!--button\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.context.contextManager.manageTools' | translate\"\r\n        [color]=\"color\"\r\n        (click)=\"manageTools.emit(context)\">\r\n        <mat-icon svgIcon=\"widgets\"></mat-icon>\r\n      </button-->\r\n\r\n      <button *ngIf=\"!context.imported\"\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.context.contextManager.clone' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        [color]=\"color\"\r\n        (click)=\"clone.emit(context)\">\r\n        <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n      </button>\r\n\r\n      <button *ngIf=\"context.permission === typePermission[typePermission.write] && !context.imported\"\r\n        mat-icon-button\r\n        [color]=\"color\"\r\n        [matTooltip]=\"'igo.context.contextManager.edit' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"edit.emit(context)\">\r\n        <mat-icon svgIcon=\"pencil\"></mat-icon>\r\n      </button>\r\n\r\n      <button *ngIf=\"!context.hidden && !context.imported\"\r\n        mat-icon-button\r\n        [color]=\"color\"\r\n        [matTooltip]=\"'igo.context.contextManager.hide' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"hide.emit(context)\">\r\n        <mat-icon svgIcon=\"eye\"></mat-icon>\r\n      </button>\r\n\r\n      <button *ngIf=\"context.hidden && !context.imported\"\r\n        mat-icon-button\r\n        [color]=\"color\"\r\n        [matTooltip]=\"'igo.context.contextManager.show' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"show.emit(context)\">\r\n        <mat-icon svgIcon=\"eye-off\"></mat-icon>\r\n      </button>\r\n\r\n      <button *ngIf=\"context.permission === typePermission[typePermission.write] || context.imported\"\r\n        mat-icon-button\r\n        color=\"warn\"\r\n        [matTooltip]=\"'igo.context.contextManager.delete' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"delete.emit(context)\">\r\n        <mat-icon svgIcon=\"delete\"></mat-icon>\r\n      </button>\r\n    </div>\r\n\r\n    <button\r\n      mat-icon-button\r\n      igoCollapse\r\n      [color]=\"color\"\r\n      [target]=\"actions\"\r\n      [collapsed]=collapsed\r\n      (click)=\"collapsed = !collapsed\">\r\n      <mat-icon svgIcon=\"dots-horizontal\"></mat-icon>\r\n    </button>\r\n\r\n  </div>\r\n\r\n</mat-list-item>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host{overflow:hidden}.igo-actions-container{flex-shrink:0}.igo-actions-expand-container{display:-webkit-inline-box;display:inline-flex}mat-list-item>>>.mat-list-item-content .mat-list-text{padding:0}mat-icon.disabled{color:rgba(0,0,0,.38)}mat-list-item.mat-list-item-light>>>.mat-list-item-content{color:#969696}"]
                }] }
    ];
    /** @nocollapse */
    ContextItemComponent.ctorParameters = function () { return [
        { type: AuthService },
        { type: StorageService }
    ]; };
    ContextItemComponent.propDecorators = {
        context: [{ type: Input }],
        default: [{ type: Input }],
        selected: [{ type: Input }],
        edit: [{ type: Output }],
        delete: [{ type: Output }],
        save: [{ type: Output }],
        clone: [{ type: Output }],
        hide: [{ type: Output }],
        show: [{ type: Output }],
        favorite: [{ type: Output }],
        managePermissions: [{ type: Output }],
        manageTools: [{ type: Output }]
    };
    return ContextItemComponent;
}());
export { ContextItemComponent };
if (false) {
    /** @type {?} */
    ContextItemComponent.prototype.typePermission;
    /** @type {?} */
    ContextItemComponent.prototype.color;
    /** @type {?} */
    ContextItemComponent.prototype.collapsed;
    /**
     * @type {?}
     * @private
     */
    ContextItemComponent.prototype._context;
    /**
     * @type {?}
     * @private
     */
    ContextItemComponent.prototype._default;
    /** @type {?} */
    ContextItemComponent.prototype.selected;
    /** @type {?} */
    ContextItemComponent.prototype.edit;
    /** @type {?} */
    ContextItemComponent.prototype.delete;
    /** @type {?} */
    ContextItemComponent.prototype.save;
    /** @type {?} */
    ContextItemComponent.prototype.clone;
    /** @type {?} */
    ContextItemComponent.prototype.hide;
    /** @type {?} */
    ContextItemComponent.prototype.show;
    /** @type {?} */
    ContextItemComponent.prototype.favorite;
    /** @type {?} */
    ContextItemComponent.prototype.managePermissions;
    /** @type {?} */
    ContextItemComponent.prototype.manageTools;
    /** @type {?} */
    ContextItemComponent.prototype.auth;
    /**
     * @type {?}
     * @private
     */
    ContextItemComponent.prototype.storageService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tYW5hZ2VyL2NvbnRleHQtaXRlbS9jb250ZXh0LWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBR3hEO0lBaURFLDhCQUNTLElBQWlCLEVBQ2hCLGNBQThCO1FBRC9CLFNBQUksR0FBSixJQUFJLENBQWE7UUFDaEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBNUNqQyxtQkFBYyxHQUFHLGNBQWMsQ0FBQztRQUNoQyxVQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ2xCLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFrQmhCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFJZixTQUFJLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDM0MsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQzdDLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztRQUMzQyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDNUMsU0FBSSxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQzNDLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztRQUMzQyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDL0Msc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDeEQsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztJQWF6RCxDQUFDO0lBekNKLHNCQUNJLHlDQUFPOzs7O1FBRFg7WUFFRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdkIsQ0FBQzs7Ozs7UUFDRCxVQUFZLEtBQXNCO1lBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUM7OztPQUhBO0lBTUQsc0JBQ0kseUNBQU87Ozs7UUFEWDtZQUVFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN2QixDQUFDOzs7OztRQUNELFVBQVksS0FBYztZQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDOzs7T0FIQTtJQWtCRCxzQkFBSSx3Q0FBTTs7OztRQUFWO1lBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM3QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDBDQUFROzs7O1FBQVo7WUFDRSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLElBQUksQ0FBQztRQUN0RCxDQUFDOzs7T0FBQTs7Ozs7SUFPRCw0Q0FBYTs7OztJQUFiLFVBQWMsT0FBTztRQUNuQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzdCO0lBQ0gsQ0FBQzs7Z0JBMURGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QiwwaklBQTRDO29CQUU1QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQVRRLFdBQVc7Z0JBRFgsY0FBYzs7OzBCQWdCcEIsS0FBSzswQkFTTCxLQUFLOzJCQVNMLEtBQUs7dUJBRUwsTUFBTTt5QkFDTixNQUFNO3VCQUNOLE1BQU07d0JBQ04sTUFBTTt1QkFDTixNQUFNO3VCQUNOLE1BQU07MkJBQ04sTUFBTTtvQ0FDTixNQUFNOzhCQUNOLE1BQU07O0lBb0JULDJCQUFDO0NBQUEsQUEzREQsSUEyREM7U0FyRFksb0JBQW9COzs7SUFDL0IsOENBQXVDOztJQUN2QyxxQ0FBeUI7O0lBQ3pCLHlDQUF3Qjs7Ozs7SUFTeEIsd0NBQWtDOzs7OztJQVNsQyx3Q0FBeUI7O0lBRXpCLHdDQUEyQjs7SUFFM0Isb0NBQXFEOztJQUNyRCxzQ0FBdUQ7O0lBQ3ZELG9DQUFxRDs7SUFDckQscUNBQXNEOztJQUN0RCxvQ0FBcUQ7O0lBQ3JELG9DQUFxRDs7SUFDckQsd0NBQXlEOztJQUN6RCxpREFBa0U7O0lBQ2xFLDJDQUE0RDs7SUFXMUQsb0NBQXdCOzs7OztJQUN4Qiw4Q0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTdG9yYWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJ0BpZ28yL2F1dGgnO1xyXG5pbXBvcnQgeyBUeXBlUGVybWlzc2lvbiB9IGZyb20gJy4uL3NoYXJlZC9jb250ZXh0LmVudW0nO1xyXG5pbXBvcnQgeyBEZXRhaWxlZENvbnRleHQgfSBmcm9tICcuLi9zaGFyZWQvY29udGV4dC5pbnRlcmZhY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tY29udGV4dC1pdGVtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY29udGV4dC1pdGVtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9jb250ZXh0LWl0ZW0uY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29udGV4dEl0ZW1Db21wb25lbnQge1xyXG4gIHB1YmxpYyB0eXBlUGVybWlzc2lvbiA9IFR5cGVQZXJtaXNzaW9uO1xyXG4gIHB1YmxpYyBjb2xvciA9ICdwcmltYXJ5JztcclxuICBwdWJsaWMgY29sbGFwc2VkID0gdHJ1ZTtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgY29udGV4dCgpOiBEZXRhaWxlZENvbnRleHQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQ7XHJcbiAgfVxyXG4gIHNldCBjb250ZXh0KHZhbHVlOiBEZXRhaWxlZENvbnRleHQpIHtcclxuICAgIHRoaXMuX2NvbnRleHQgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfY29udGV4dDogRGV0YWlsZWRDb250ZXh0O1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBkZWZhdWx0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RlZmF1bHQ7XHJcbiAgfVxyXG4gIHNldCBkZWZhdWx0KHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9kZWZhdWx0ID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2RlZmF1bHQgPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgc2VsZWN0ZWQ6IGJvb2xlYW47XHJcblxyXG4gIEBPdXRwdXQoKSBlZGl0ID0gbmV3IEV2ZW50RW1pdHRlcjxEZXRhaWxlZENvbnRleHQ+KCk7XHJcbiAgQE91dHB1dCgpIGRlbGV0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8RGV0YWlsZWRDb250ZXh0PigpO1xyXG4gIEBPdXRwdXQoKSBzYXZlID0gbmV3IEV2ZW50RW1pdHRlcjxEZXRhaWxlZENvbnRleHQ+KCk7XHJcbiAgQE91dHB1dCgpIGNsb25lID0gbmV3IEV2ZW50RW1pdHRlcjxEZXRhaWxlZENvbnRleHQ+KCk7XHJcbiAgQE91dHB1dCgpIGhpZGUgPSBuZXcgRXZlbnRFbWl0dGVyPERldGFpbGVkQ29udGV4dD4oKTtcclxuICBAT3V0cHV0KCkgc2hvdyA9IG5ldyBFdmVudEVtaXR0ZXI8RGV0YWlsZWRDb250ZXh0PigpO1xyXG4gIEBPdXRwdXQoKSBmYXZvcml0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8RGV0YWlsZWRDb250ZXh0PigpO1xyXG4gIEBPdXRwdXQoKSBtYW5hZ2VQZXJtaXNzaW9ucyA9IG5ldyBFdmVudEVtaXR0ZXI8RGV0YWlsZWRDb250ZXh0PigpO1xyXG4gIEBPdXRwdXQoKSBtYW5hZ2VUb29scyA9IG5ldyBFdmVudEVtaXR0ZXI8RGV0YWlsZWRDb250ZXh0PigpO1xyXG5cclxuICBnZXQgaGlkZGVuKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY29udGV4dC5oaWRkZW47XHJcbiAgfVxyXG5cclxuICBnZXQgY2FuU2hhcmUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlU2VydmljZS5nZXQoJ2NhblNoYXJlJykgPT09IHRydWU7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBhdXRoOiBBdXRoU2VydmljZSxcclxuICAgIHByaXZhdGUgc3RvcmFnZVNlcnZpY2U6IFN0b3JhZ2VTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBmYXZvcml0ZUNsaWNrKGNvbnRleHQpIHtcclxuICAgIGlmICh0aGlzLmF1dGguYXV0aGVudGljYXRlZCkge1xyXG4gICAgICB0aGlzLmZhdm9yaXRlLmVtaXQoY29udGV4dCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==