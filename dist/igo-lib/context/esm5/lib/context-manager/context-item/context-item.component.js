/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '@igo2/auth';
import { TypePermission } from '../shared/context.enum';
var ContextItemComponent = /** @class */ (function () {
    function ContextItemComponent(auth) {
        this.auth = auth;
        this.typePermission = TypePermission;
        this.color = 'primary';
        this.collapsed = true;
        this._default = false;
        this.edit = new EventEmitter();
        this.delete = new EventEmitter();
        this.save = new EventEmitter();
        this.clone = new EventEmitter();
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
                    template: "<mat-list-item>\r\n  <button mat-list-avatar\r\n    mat-icon-button\r\n    igoStopPropagation\r\n    [matTooltip]=\"'igo.context.contextManager.favorite' | translate\"\r\n    matTooltipShowDelay=\"500\"\r\n    [color]=\"default ? 'primary' : 'default'\"\r\n    (click)=\"favoriteClick(context)\">\r\n    <mat-icon *ngIf=\"!context.iconImage\" svgIcon=\"{{context.icon ? context.icon : context.scope === 'public' ? 'earth' : 'star'}}\"></mat-icon>\r\n    <img *ngIf=\"context.iconImage\" [src]=\"context.iconImage\">\r\n  </button>\r\n  <h4 matLine>{{context.title}}</h4>\r\n\r\n  <div *ngIf=\"auth.authenticated && context.permission === typePermission[typePermission.read]\"\r\n       igoStopPropagation\r\n       class=\"igo-actions-container\">\r\n\r\n       <button\r\n         mat-icon-button\r\n         [matTooltip]=\"'igo.context.contextManager.clone' | translate\"\r\n         matTooltipShowDelay=\"500\"\r\n         [color]=\"color\"\r\n         (click)=\"clone.emit(context)\">\r\n         <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n       </button>\r\n </div>\r\n\r\n\r\n  <div *ngIf=\"context.permission === typePermission[typePermission.write]\"\r\n       igoStopPropagation\r\n       class=\"igo-actions-container\">\r\n\r\n     <button *ngIf=\"collapsed\"\r\n       mat-icon-button\r\n       [matTooltip]=\"'igo.context.contextManager.save' | translate\"\r\n       matTooltipShowDelay=\"500\"\r\n       [color]=\"color\"\r\n       (click)=\"save.emit(context)\">\r\n       <mat-icon svgIcon=\"content-save\"></mat-icon>\r\n     </button>\r\n\r\n    <div #actions class=\"igo-actions-expand-container\">\r\n\r\n      <button\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.context.contextManager.managePermissions' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        [color]=\"color\"\r\n        (click)=\"managePermissions.emit(context)\">\r\n        <mat-icon svgIcon=\"account-outline\"></mat-icon>\r\n      </button>\r\n\r\n      <!--button\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.context.contextManager.manageTools' | translate\"\r\n        [color]=\"color\"\r\n        (click)=\"manageTools.emit(context)\">\r\n        <mat-icon svgIcon=\"widgets\"></mat-icon>\r\n      </button-->\r\n\r\n      <button\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.context.contextManager.clone' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        [color]=\"color\"\r\n        (click)=\"clone.emit(context)\">\r\n        <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n      </button>\r\n\r\n      <button\r\n        mat-icon-button\r\n        [color]=\"color\"\r\n        [matTooltip]=\"'igo.context.contextManager.edit' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"edit.emit(context)\">\r\n        <mat-icon svgIcon=\"pencil\"></mat-icon>\r\n      </button>\r\n\r\n      <button\r\n        mat-icon-button\r\n        color=\"warn\"\r\n        [matTooltip]=\"'igo.context.contextManager.delete' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"delete.emit(context)\">\r\n        <mat-icon svgIcon=\"delete\"></mat-icon>\r\n      </button>\r\n    </div>\r\n\r\n    <button\r\n      mat-icon-button\r\n      igoCollapse\r\n      [color]=\"color\"\r\n      [target]=\"actions\"\r\n      [collapsed]=collapsed\r\n      (click)=\"collapsed = !collapsed\">\r\n      <mat-icon svgIcon=\"dots-horizontal\"></mat-icon>\r\n    </button>\r\n\r\n  </div>\r\n\r\n</mat-list-item>\r\n",
                    styles: [":host{overflow:hidden}.igo-actions-container{flex-shrink:0}.igo-actions-expand-container{display:inline-flex}mat-list-item>>>.mat-list-item-content .mat-list-text{padding:0}mat-list-item>>>.mat-list-item-content .mat-list-text>h4{padding:0 16px}mat-icon.disabled{color:rgba(0,0,0,.38)}"]
                }] }
    ];
    /** @nocollapse */
    ContextItemComponent.ctorParameters = function () { return [
        { type: AuthService }
    ]; };
    ContextItemComponent.propDecorators = {
        context: [{ type: Input }],
        default: [{ type: Input }],
        edit: [{ type: Output }],
        delete: [{ type: Output }],
        save: [{ type: Output }],
        clone: [{ type: Output }],
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
    ContextItemComponent.prototype.edit;
    /** @type {?} */
    ContextItemComponent.prototype.delete;
    /** @type {?} */
    ContextItemComponent.prototype.save;
    /** @type {?} */
    ContextItemComponent.prototype.clone;
    /** @type {?} */
    ContextItemComponent.prototype.favorite;
    /** @type {?} */
    ContextItemComponent.prototype.managePermissions;
    /** @type {?} */
    ContextItemComponent.prototype.manageTools;
    /** @type {?} */
    ContextItemComponent.prototype.auth;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tYW5hZ2VyL2NvbnRleHQtaXRlbS9jb250ZXh0LWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBR3hEO0lBb0NFLDhCQUFtQixJQUFpQjtRQUFqQixTQUFJLEdBQUosSUFBSSxDQUFhO1FBOUI3QixtQkFBYyxHQUFHLGNBQWMsQ0FBQztRQUNoQyxVQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ2xCLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFrQmhCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFZixTQUFJLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDM0MsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQzdDLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztRQUMzQyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDNUMsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQy9DLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQ3hELGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7SUFFckIsQ0FBQztJQTFCeEMsc0JBQ0kseUNBQU87Ozs7UUFEWDtZQUVFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN2QixDQUFDOzs7OztRQUNELFVBQVksS0FBc0I7WUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQzs7O09BSEE7SUFNRCxzQkFDSSx5Q0FBTzs7OztRQURYO1lBRUUsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3ZCLENBQUM7Ozs7O1FBQ0QsVUFBWSxLQUFjO1lBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUM7OztPQUhBOzs7OztJQWdCRCw0Q0FBYTs7OztJQUFiLFVBQWMsT0FBTztRQUNuQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzdCO0lBQ0gsQ0FBQzs7Z0JBMUNGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QiwwN0dBQTRDOztpQkFFN0M7Ozs7Z0JBUlEsV0FBVzs7OzBCQWNqQixLQUFLOzBCQVNMLEtBQUs7dUJBU0wsTUFBTTt5QkFDTixNQUFNO3VCQUNOLE1BQU07d0JBQ04sTUFBTTsyQkFDTixNQUFNO29DQUNOLE1BQU07OEJBQ04sTUFBTTs7SUFTVCwyQkFBQztDQUFBLEFBM0NELElBMkNDO1NBdENZLG9CQUFvQjs7O0lBQy9CLDhDQUF1Qzs7SUFDdkMscUNBQXlCOztJQUN6Qix5Q0FBd0I7Ozs7O0lBU3hCLHdDQUFrQzs7Ozs7SUFTbEMsd0NBQXlCOztJQUV6QixvQ0FBcUQ7O0lBQ3JELHNDQUF1RDs7SUFDdkQsb0NBQXFEOztJQUNyRCxxQ0FBc0Q7O0lBQ3RELHdDQUF5RDs7SUFDekQsaURBQWtFOztJQUNsRSwyQ0FBNEQ7O0lBRWhELG9DQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJ0BpZ28yL2F1dGgnO1xyXG5pbXBvcnQgeyBUeXBlUGVybWlzc2lvbiB9IGZyb20gJy4uL3NoYXJlZC9jb250ZXh0LmVudW0nO1xyXG5pbXBvcnQgeyBEZXRhaWxlZENvbnRleHQgfSBmcm9tICcuLi9zaGFyZWQvY29udGV4dC5pbnRlcmZhY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tY29udGV4dC1pdGVtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY29udGV4dC1pdGVtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9jb250ZXh0LWl0ZW0uY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29udGV4dEl0ZW1Db21wb25lbnQge1xyXG4gIHB1YmxpYyB0eXBlUGVybWlzc2lvbiA9IFR5cGVQZXJtaXNzaW9uO1xyXG4gIHB1YmxpYyBjb2xvciA9ICdwcmltYXJ5JztcclxuICBwdWJsaWMgY29sbGFwc2VkID0gdHJ1ZTtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgY29udGV4dCgpOiBEZXRhaWxlZENvbnRleHQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQ7XHJcbiAgfVxyXG4gIHNldCBjb250ZXh0KHZhbHVlOiBEZXRhaWxlZENvbnRleHQpIHtcclxuICAgIHRoaXMuX2NvbnRleHQgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfY29udGV4dDogRGV0YWlsZWRDb250ZXh0O1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBkZWZhdWx0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RlZmF1bHQ7XHJcbiAgfVxyXG4gIHNldCBkZWZhdWx0KHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9kZWZhdWx0ID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2RlZmF1bHQgPSBmYWxzZTtcclxuXHJcbiAgQE91dHB1dCgpIGVkaXQgPSBuZXcgRXZlbnRFbWl0dGVyPERldGFpbGVkQ29udGV4dD4oKTtcclxuICBAT3V0cHV0KCkgZGVsZXRlID0gbmV3IEV2ZW50RW1pdHRlcjxEZXRhaWxlZENvbnRleHQ+KCk7XHJcbiAgQE91dHB1dCgpIHNhdmUgPSBuZXcgRXZlbnRFbWl0dGVyPERldGFpbGVkQ29udGV4dD4oKTtcclxuICBAT3V0cHV0KCkgY2xvbmUgPSBuZXcgRXZlbnRFbWl0dGVyPERldGFpbGVkQ29udGV4dD4oKTtcclxuICBAT3V0cHV0KCkgZmF2b3JpdGUgPSBuZXcgRXZlbnRFbWl0dGVyPERldGFpbGVkQ29udGV4dD4oKTtcclxuICBAT3V0cHV0KCkgbWFuYWdlUGVybWlzc2lvbnMgPSBuZXcgRXZlbnRFbWl0dGVyPERldGFpbGVkQ29udGV4dD4oKTtcclxuICBAT3V0cHV0KCkgbWFuYWdlVG9vbHMgPSBuZXcgRXZlbnRFbWl0dGVyPERldGFpbGVkQ29udGV4dD4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGF1dGg6IEF1dGhTZXJ2aWNlKSB7fVxyXG5cclxuICBmYXZvcml0ZUNsaWNrKGNvbnRleHQpIHtcclxuICAgIGlmICh0aGlzLmF1dGguYXV0aGVudGljYXRlZCkge1xyXG4gICAgICB0aGlzLmZhdm9yaXRlLmVtaXQoY29udGV4dCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==