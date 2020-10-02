/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { StorageService } from '@igo2/core';
import { AuthService } from '@igo2/auth';
import { TypePermission } from '../shared/context.enum';
export class ContextItemComponent {
    /**
     * @param {?} auth
     * @param {?} storageService
     */
    constructor(auth, storageService) {
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
     * @return {?}
     */
    get hidden() {
        return this.context.hidden;
    }
    /**
     * @return {?}
     */
    get canShare() {
        return this.storageService.get('canShare') === true;
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
                template: "<mat-list-item\r\n  class=\"mat-list-item\"\r\n  [ngClass]=\"{'mat-list-item-light': hidden}\">\r\n  <button mat-list-avatar\r\n    *ngIf=\"auth.authenticated\"\r\n    mat-icon-button\r\n    igoStopPropagation\r\n    [matTooltip]=\"auth.authenticated ? ('igo.context.contextManager.favorite' | translate) : ''\"\r\n    matTooltipShowDelay=\"500\"\r\n    [color]=\"default ? 'primary' : 'default'\"\r\n    (click)=\"favoriteClick(context)\">\r\n    <mat-icon *ngIf=\"!context.iconImage\" svgIcon=\"{{context.icon ? context.icon : context.scope === 'public' ? 'earth' : 'star'}}\"></mat-icon>\r\n    <img *ngIf=\"context.iconImage\" [src]=\"context.iconImage\">\r\n  </button>\r\n  <h4 matLine>{{context.title}}</h4>\r\n\r\n  <div *ngIf=\"auth.authenticated\"\r\n       igoStopPropagation\r\n       class=\"igo-actions-container\">\r\n\r\n     <button *ngIf=\"collapsed && selected && (context.permission === typePermission[typePermission.write] || context.imported)\"\r\n       mat-icon-button\r\n       [matTooltip]=\"'igo.context.contextManager.save' | translate\"\r\n       matTooltipShowDelay=\"500\"\r\n       [color]=\"color\"\r\n       (click)=\"save.emit(context)\">\r\n       <mat-icon svgIcon=\"content-save\"></mat-icon>\r\n     </button>\r\n\r\n    <div #actions class=\"igo-actions-expand-container\">\r\n\r\n      <button *ngIf=\"canShare && !context.imported\"\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.context.contextManager.managePermissions' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        [color]=\"color\"\r\n        (click)=\"managePermissions.emit(context)\">\r\n        <mat-icon svgIcon=\"account-arrow-right\"></mat-icon>\r\n      </button>\r\n\r\n      <!--button\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.context.contextManager.manageTools' | translate\"\r\n        [color]=\"color\"\r\n        (click)=\"manageTools.emit(context)\">\r\n        <mat-icon svgIcon=\"widgets\"></mat-icon>\r\n      </button-->\r\n\r\n      <button *ngIf=\"!context.imported\"\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.context.contextManager.clone' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        [color]=\"color\"\r\n        (click)=\"clone.emit(context)\">\r\n        <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n      </button>\r\n\r\n      <button *ngIf=\"context.permission === typePermission[typePermission.write] && !context.imported\"\r\n        mat-icon-button\r\n        [color]=\"color\"\r\n        [matTooltip]=\"'igo.context.contextManager.edit' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"edit.emit(context)\">\r\n        <mat-icon svgIcon=\"pencil\"></mat-icon>\r\n      </button>\r\n\r\n      <button *ngIf=\"!context.hidden && !context.imported\"\r\n        mat-icon-button\r\n        [color]=\"color\"\r\n        [matTooltip]=\"'igo.context.contextManager.hide' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"hide.emit(context)\">\r\n        <mat-icon svgIcon=\"eye\"></mat-icon>\r\n      </button>\r\n\r\n      <button *ngIf=\"context.hidden && !context.imported\"\r\n        mat-icon-button\r\n        [color]=\"color\"\r\n        [matTooltip]=\"'igo.context.contextManager.show' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"show.emit(context)\">\r\n        <mat-icon svgIcon=\"eye-off\"></mat-icon>\r\n      </button>\r\n\r\n      <button *ngIf=\"context.permission === typePermission[typePermission.write] || context.imported\"\r\n        mat-icon-button\r\n        color=\"warn\"\r\n        [matTooltip]=\"'igo.context.contextManager.delete' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"delete.emit(context)\">\r\n        <mat-icon svgIcon=\"delete\"></mat-icon>\r\n      </button>\r\n    </div>\r\n\r\n    <button\r\n      mat-icon-button\r\n      igoCollapse\r\n      [color]=\"color\"\r\n      [target]=\"actions\"\r\n      [collapsed]=collapsed\r\n      (click)=\"collapsed = !collapsed\">\r\n      <mat-icon svgIcon=\"dots-horizontal\"></mat-icon>\r\n    </button>\r\n\r\n  </div>\r\n\r\n</mat-list-item>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{overflow:hidden}.igo-actions-container{flex-shrink:0}.igo-actions-expand-container{display:-webkit-inline-box;display:inline-flex}mat-list-item>>>.mat-list-item-content .mat-list-text{padding:0}mat-icon.disabled{color:rgba(0,0,0,.38)}mat-list-item.mat-list-item-light>>>.mat-list-item-content{color:#969696}"]
            }] }
];
/** @nocollapse */
ContextItemComponent.ctorParameters = () => [
    { type: AuthService },
    { type: StorageService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tYW5hZ2VyL2NvbnRleHQtaXRlbS9jb250ZXh0LWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBU3hELE1BQU0sT0FBTyxvQkFBb0I7Ozs7O0lBMkMvQixZQUNTLElBQWlCLEVBQ2hCLGNBQThCO1FBRC9CLFNBQUksR0FBSixJQUFJLENBQWE7UUFDaEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBNUNqQyxtQkFBYyxHQUFHLGNBQWMsQ0FBQztRQUNoQyxVQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ2xCLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFrQmhCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFJZixTQUFJLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDM0MsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQzdDLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztRQUMzQyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDNUMsU0FBSSxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQzNDLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztRQUMzQyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDL0Msc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDeEQsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztJQWF6RCxDQUFDOzs7O0lBekNKLElBQ0ksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDOzs7OztJQUNELElBQUksT0FBTyxDQUFDLEtBQXNCO1FBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7Ozs7SUFHRCxJQUNJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFDRCxJQUFJLE9BQU8sQ0FBQyxLQUFjO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7Ozs7SUFlRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLElBQUksQ0FBQztJQUN0RCxDQUFDOzs7OztJQU9ELGFBQWEsQ0FBQyxPQUFPO1FBQ25CLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDN0I7SUFDSCxDQUFDOzs7WUExREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLDBqSUFBNEM7Z0JBRTVDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7OztZQVRRLFdBQVc7WUFEWCxjQUFjOzs7c0JBZ0JwQixLQUFLO3NCQVNMLEtBQUs7dUJBU0wsS0FBSzttQkFFTCxNQUFNO3FCQUNOLE1BQU07bUJBQ04sTUFBTTtvQkFDTixNQUFNO21CQUNOLE1BQU07bUJBQ04sTUFBTTt1QkFDTixNQUFNO2dDQUNOLE1BQU07MEJBQ04sTUFBTTs7OztJQWhDUCw4Q0FBdUM7O0lBQ3ZDLHFDQUF5Qjs7SUFDekIseUNBQXdCOzs7OztJQVN4Qix3Q0FBa0M7Ozs7O0lBU2xDLHdDQUF5Qjs7SUFFekIsd0NBQTJCOztJQUUzQixvQ0FBcUQ7O0lBQ3JELHNDQUF1RDs7SUFDdkQsb0NBQXFEOztJQUNyRCxxQ0FBc0Q7O0lBQ3RELG9DQUFxRDs7SUFDckQsb0NBQXFEOztJQUNyRCx3Q0FBeUQ7O0lBQ3pELGlEQUFrRTs7SUFDbEUsMkNBQTREOztJQVcxRCxvQ0FBd0I7Ozs7O0lBQ3hCLDhDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvYXV0aCc7XHJcbmltcG9ydCB7IFR5cGVQZXJtaXNzaW9uIH0gZnJvbSAnLi4vc2hhcmVkL2NvbnRleHQuZW51bSc7XHJcbmltcG9ydCB7IERldGFpbGVkQ29udGV4dCB9IGZyb20gJy4uL3NoYXJlZC9jb250ZXh0LmludGVyZmFjZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1jb250ZXh0LWl0ZW0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9jb250ZXh0LWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2NvbnRleHQtaXRlbS5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb250ZXh0SXRlbUNvbXBvbmVudCB7XHJcbiAgcHVibGljIHR5cGVQZXJtaXNzaW9uID0gVHlwZVBlcm1pc3Npb247XHJcbiAgcHVibGljIGNvbG9yID0gJ3ByaW1hcnknO1xyXG4gIHB1YmxpYyBjb2xsYXBzZWQgPSB0cnVlO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBjb250ZXh0KCk6IERldGFpbGVkQ29udGV4dCB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcclxuICB9XHJcbiAgc2V0IGNvbnRleHQodmFsdWU6IERldGFpbGVkQ29udGV4dCkge1xyXG4gICAgdGhpcy5fY29udGV4dCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9jb250ZXh0OiBEZXRhaWxlZENvbnRleHQ7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGRlZmF1bHQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGVmYXVsdDtcclxuICB9XHJcbiAgc2V0IGRlZmF1bHQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2RlZmF1bHQgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfZGVmYXVsdCA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSBzZWxlY3RlZDogYm9vbGVhbjtcclxuXHJcbiAgQE91dHB1dCgpIGVkaXQgPSBuZXcgRXZlbnRFbWl0dGVyPERldGFpbGVkQ29udGV4dD4oKTtcclxuICBAT3V0cHV0KCkgZGVsZXRlID0gbmV3IEV2ZW50RW1pdHRlcjxEZXRhaWxlZENvbnRleHQ+KCk7XHJcbiAgQE91dHB1dCgpIHNhdmUgPSBuZXcgRXZlbnRFbWl0dGVyPERldGFpbGVkQ29udGV4dD4oKTtcclxuICBAT3V0cHV0KCkgY2xvbmUgPSBuZXcgRXZlbnRFbWl0dGVyPERldGFpbGVkQ29udGV4dD4oKTtcclxuICBAT3V0cHV0KCkgaGlkZSA9IG5ldyBFdmVudEVtaXR0ZXI8RGV0YWlsZWRDb250ZXh0PigpO1xyXG4gIEBPdXRwdXQoKSBzaG93ID0gbmV3IEV2ZW50RW1pdHRlcjxEZXRhaWxlZENvbnRleHQ+KCk7XHJcbiAgQE91dHB1dCgpIGZhdm9yaXRlID0gbmV3IEV2ZW50RW1pdHRlcjxEZXRhaWxlZENvbnRleHQ+KCk7XHJcbiAgQE91dHB1dCgpIG1hbmFnZVBlcm1pc3Npb25zID0gbmV3IEV2ZW50RW1pdHRlcjxEZXRhaWxlZENvbnRleHQ+KCk7XHJcbiAgQE91dHB1dCgpIG1hbmFnZVRvb2xzID0gbmV3IEV2ZW50RW1pdHRlcjxEZXRhaWxlZENvbnRleHQ+KCk7XHJcblxyXG4gIGdldCBoaWRkZW4oKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0LmhpZGRlbjtcclxuICB9XHJcblxyXG4gIGdldCBjYW5TaGFyZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnN0b3JhZ2VTZXJ2aWNlLmdldCgnY2FuU2hhcmUnKSA9PT0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGF1dGg6IEF1dGhTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzdG9yYWdlU2VydmljZTogU3RvcmFnZVNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIGZhdm9yaXRlQ2xpY2soY29udGV4dCkge1xyXG4gICAgaWYgKHRoaXMuYXV0aC5hdXRoZW50aWNhdGVkKSB7XHJcbiAgICAgIHRoaXMuZmF2b3JpdGUuZW1pdChjb250ZXh0KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19