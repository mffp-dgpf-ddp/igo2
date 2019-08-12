/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '@igo2/auth';
import { TypePermission } from '../shared/context.enum';
export class ContextItemComponent {
    /**
     * @param {?} auth
     */
    constructor(auth) {
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
    /**
     * @return {?}
     */
    get context() {
        return this._context;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set context(value) {
        this._context = value;
    }
    /**
     * @return {?}
     */
    get default() {
        return this._default;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set default(value) {
        this._default = value;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    favoriteClick(context) {
        if (this.auth.authenticated) {
            this.favorite.emit(context);
        }
    }
}
ContextItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-context-item',
                template: "<mat-list-item>\r\n  <button mat-list-avatar\r\n    mat-icon-button\r\n    igoStopPropagation\r\n    [matTooltip]=\"'igo.context.contextManager.favorite' | translate\"\r\n    matTooltipShowDelay=\"500\"\r\n    [color]=\"default ? 'primary' : 'default'\"\r\n    (click)=\"favoriteClick(context)\">\r\n    <mat-icon *ngIf=\"!context.iconImage\" svgIcon=\"{{context.icon ? context.icon : context.scope === 'public' ? 'earth' : 'star'}}\"></mat-icon>\r\n    <img *ngIf=\"context.iconImage\" [src]=\"context.iconImage\">\r\n  </button>\r\n  <h4 matLine>{{context.title}}</h4>\r\n\r\n  <div *ngIf=\"auth.authenticated && context.permission === typePermission[typePermission.read]\"\r\n       igoStopPropagation\r\n       class=\"igo-actions-container\">\r\n\r\n       <button\r\n         mat-icon-button\r\n         [matTooltip]=\"'igo.context.contextManager.clone' | translate\"\r\n         matTooltipShowDelay=\"500\"\r\n         [color]=\"color\"\r\n         (click)=\"clone.emit(context)\">\r\n         <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n       </button>\r\n </div>\r\n\r\n\r\n  <div *ngIf=\"context.permission === typePermission[typePermission.write]\"\r\n       igoStopPropagation\r\n       class=\"igo-actions-container\">\r\n\r\n     <button *ngIf=\"collapsed\"\r\n       mat-icon-button\r\n       [matTooltip]=\"'igo.context.contextManager.save' | translate\"\r\n       matTooltipShowDelay=\"500\"\r\n       [color]=\"color\"\r\n       (click)=\"save.emit(context)\">\r\n       <mat-icon svgIcon=\"content-save\"></mat-icon>\r\n     </button>\r\n\r\n    <div #actions class=\"igo-actions-expand-container\">\r\n\r\n      <button\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.context.contextManager.managePermissions' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        [color]=\"color\"\r\n        (click)=\"managePermissions.emit(context)\">\r\n        <mat-icon svgIcon=\"account-outline\"></mat-icon>\r\n      </button>\r\n\r\n      <!--button\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.context.contextManager.manageTools' | translate\"\r\n        [color]=\"color\"\r\n        (click)=\"manageTools.emit(context)\">\r\n        <mat-icon svgIcon=\"widgets\"></mat-icon>\r\n      </button-->\r\n\r\n      <button\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.context.contextManager.clone' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        [color]=\"color\"\r\n        (click)=\"clone.emit(context)\">\r\n        <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n      </button>\r\n\r\n      <button\r\n        mat-icon-button\r\n        [color]=\"color\"\r\n        [matTooltip]=\"'igo.context.contextManager.edit' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"edit.emit(context)\">\r\n        <mat-icon svgIcon=\"pencil\"></mat-icon>\r\n      </button>\r\n\r\n      <button\r\n        mat-icon-button\r\n        color=\"warn\"\r\n        [matTooltip]=\"'igo.context.contextManager.delete' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"delete.emit(context)\">\r\n        <mat-icon svgIcon=\"delete\"></mat-icon>\r\n      </button>\r\n    </div>\r\n\r\n    <button\r\n      mat-icon-button\r\n      igoCollapse\r\n      [color]=\"color\"\r\n      [target]=\"actions\"\r\n      [collapsed]=collapsed\r\n      (click)=\"collapsed = !collapsed\">\r\n      <mat-icon svgIcon=\"dots-horizontal\"></mat-icon>\r\n    </button>\r\n\r\n  </div>\r\n\r\n</mat-list-item>\r\n",
                styles: [":host{overflow:hidden}.igo-actions-container{flex-shrink:0}.igo-actions-expand-container{display:inline-flex}mat-list-item>>>.mat-list-item-content .mat-list-text{padding:0}mat-list-item>>>.mat-list-item-content .mat-list-text>h4{padding:0 16px}mat-icon.disabled{color:rgba(0,0,0,.38)}"]
            }] }
];
/** @nocollapse */
ContextItemComponent.ctorParameters = () => [
    { type: AuthService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tYW5hZ2VyL2NvbnRleHQtaXRlbS9jb250ZXh0LWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBUXhELE1BQU0sT0FBTyxvQkFBb0I7Ozs7SUErQi9CLFlBQW1CLElBQWlCO1FBQWpCLFNBQUksR0FBSixJQUFJLENBQWE7UUE5QjdCLG1CQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ2hDLFVBQUssR0FBRyxTQUFTLENBQUM7UUFDbEIsY0FBUyxHQUFHLElBQUksQ0FBQztRQWtCaEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUVmLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztRQUMzQyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDN0MsU0FBSSxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQzNDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztRQUM1QyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDL0Msc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDeEQsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztJQUVyQixDQUFDOzs7O0lBMUJ4QyxJQUNJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFDRCxJQUFJLE9BQU8sQ0FBQyxLQUFzQjtRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDOzs7O0lBR0QsSUFDSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBQ0QsSUFBSSxPQUFPLENBQUMsS0FBYztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDOzs7OztJQWFELGFBQWEsQ0FBQyxPQUFPO1FBQ25CLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDN0I7SUFDSCxDQUFDOzs7WUExQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLDA3R0FBNEM7O2FBRTdDOzs7O1lBUlEsV0FBVzs7O3NCQWNqQixLQUFLO3NCQVNMLEtBQUs7bUJBU0wsTUFBTTtxQkFDTixNQUFNO21CQUNOLE1BQU07b0JBQ04sTUFBTTt1QkFDTixNQUFNO2dDQUNOLE1BQU07MEJBQ04sTUFBTTs7OztJQTVCUCw4Q0FBdUM7O0lBQ3ZDLHFDQUF5Qjs7SUFDekIseUNBQXdCOzs7OztJQVN4Qix3Q0FBa0M7Ozs7O0lBU2xDLHdDQUF5Qjs7SUFFekIsb0NBQXFEOztJQUNyRCxzQ0FBdUQ7O0lBQ3ZELG9DQUFxRDs7SUFDckQscUNBQXNEOztJQUN0RCx3Q0FBeUQ7O0lBQ3pELGlEQUFrRTs7SUFDbEUsMkNBQTREOztJQUVoRCxvQ0FBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICdAaWdvMi9hdXRoJztcclxuaW1wb3J0IHsgVHlwZVBlcm1pc3Npb24gfSBmcm9tICcuLi9zaGFyZWQvY29udGV4dC5lbnVtJztcclxuaW1wb3J0IHsgRGV0YWlsZWRDb250ZXh0IH0gZnJvbSAnLi4vc2hhcmVkL2NvbnRleHQuaW50ZXJmYWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWNvbnRleHQtaXRlbScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbnRleHQtaXRlbS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vY29udGV4dC1pdGVtLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIENvbnRleHRJdGVtQ29tcG9uZW50IHtcclxuICBwdWJsaWMgdHlwZVBlcm1pc3Npb24gPSBUeXBlUGVybWlzc2lvbjtcclxuICBwdWJsaWMgY29sb3IgPSAncHJpbWFyeSc7XHJcbiAgcHVibGljIGNvbGxhcHNlZCA9IHRydWU7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGNvbnRleHQoKTogRGV0YWlsZWRDb250ZXh0IHtcclxuICAgIHJldHVybiB0aGlzLl9jb250ZXh0O1xyXG4gIH1cclxuICBzZXQgY29udGV4dCh2YWx1ZTogRGV0YWlsZWRDb250ZXh0KSB7XHJcbiAgICB0aGlzLl9jb250ZXh0ID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2NvbnRleHQ6IERldGFpbGVkQ29udGV4dDtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgZGVmYXVsdCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9kZWZhdWx0O1xyXG4gIH1cclxuICBzZXQgZGVmYXVsdCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fZGVmYXVsdCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9kZWZhdWx0ID0gZmFsc2U7XHJcblxyXG4gIEBPdXRwdXQoKSBlZGl0ID0gbmV3IEV2ZW50RW1pdHRlcjxEZXRhaWxlZENvbnRleHQ+KCk7XHJcbiAgQE91dHB1dCgpIGRlbGV0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8RGV0YWlsZWRDb250ZXh0PigpO1xyXG4gIEBPdXRwdXQoKSBzYXZlID0gbmV3IEV2ZW50RW1pdHRlcjxEZXRhaWxlZENvbnRleHQ+KCk7XHJcbiAgQE91dHB1dCgpIGNsb25lID0gbmV3IEV2ZW50RW1pdHRlcjxEZXRhaWxlZENvbnRleHQ+KCk7XHJcbiAgQE91dHB1dCgpIGZhdm9yaXRlID0gbmV3IEV2ZW50RW1pdHRlcjxEZXRhaWxlZENvbnRleHQ+KCk7XHJcbiAgQE91dHB1dCgpIG1hbmFnZVBlcm1pc3Npb25zID0gbmV3IEV2ZW50RW1pdHRlcjxEZXRhaWxlZENvbnRleHQ+KCk7XHJcbiAgQE91dHB1dCgpIG1hbmFnZVRvb2xzID0gbmV3IEV2ZW50RW1pdHRlcjxEZXRhaWxlZENvbnRleHQ+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBhdXRoOiBBdXRoU2VydmljZSkge31cclxuXHJcbiAgZmF2b3JpdGVDbGljayhjb250ZXh0KSB7XHJcbiAgICBpZiAodGhpcy5hdXRoLmF1dGhlbnRpY2F0ZWQpIHtcclxuICAgICAgdGhpcy5mYXZvcml0ZS5lbWl0KGNvbnRleHQpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=