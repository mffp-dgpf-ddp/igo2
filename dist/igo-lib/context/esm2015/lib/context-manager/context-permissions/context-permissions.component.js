/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
export class ContextPermissionsComponent {
    /**
     * @param {?} formBuilder
     */
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.addPermission = new EventEmitter();
        this.removePermission = new EventEmitter();
        this.scopeChanged = new EventEmitter();
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
    get permissions() {
        return this._permissions;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set permissions(value) {
        this._permissions = value;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.buildForm();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    handleFormSubmit(value) {
        this.addPermission.emit(value);
    }
    /**
     * @private
     * @return {?}
     */
    buildForm() {
        this.form = this.formBuilder.group({
            profil: [],
            typePermission: ['read']
        });
    }
}
ContextPermissionsComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-context-permissions',
                template: "<div *ngIf=\"context\">\r\n\r\n  <div class=\"scopeForm\">\r\n    <mat-radio-group [(ngModel)]=\"context.scope\"\r\n                    (change)=\"scopeChanged.emit(context)\">\r\n      <mat-radio-button value=\"private\">\r\n        {{ 'igo.context.permission.scope.private' | translate }}\r\n      </mat-radio-button>\r\n      <mat-radio-button value=\"protected\">\r\n        {{ 'igo.context.permission.scope.protected' | translate }}\r\n      </mat-radio-button>\r\n      <mat-radio-button value=\"public\">\r\n        {{ 'igo.context.permission.scope.public' | translate }}\r\n      </mat-radio-button>\r\n    </mat-radio-group>\r\n  </div>\r\n\r\n  <form *ngIf=\"context.scope !== 'private'\" [formGroup]=\"form\"\r\n    (ngSubmit)=\"handleFormSubmit(form.value)\">\r\n\r\n    <mat-form-field class=\"full-width\">\r\n      <input matInput required\r\n             [placeholder]=\"'igo.context.permission.profil' | translate\"\r\n             formControlName=\"profil\">\r\n     <mat-error>\r\n       {{ 'igo.context.permission.profilRequired' | translate }}\r\n     </mat-error>\r\n    </mat-form-field>\r\n\r\n\r\n    <mat-radio-group formControlName=\"typePermission\">\r\n      <mat-radio-button value=\"read\">\r\n        {{ 'igo.context.permission.read' | translate }}\r\n      </mat-radio-button>\r\n      <mat-radio-button value=\"write\">\r\n        {{ 'igo.context.permission.write' | translate }}\r\n      </mat-radio-button>\r\n    </mat-radio-group>\r\n\r\n\r\n    <div class=\"igo-form-button-group\">\r\n      <button\r\n        mat-raised-button\r\n        type=\"submit\"\r\n        [disabled]=\"!form.valid\">\r\n        {{ 'igo.context.permission.addBtn' | translate }}\r\n      </button>\r\n    </div>\r\n\r\n  </form>\r\n\r\n  <igo-list *ngIf=\"permissions && context.scope !== 'private'\">\r\n    <ng-template ngFor let-groupPermissions [ngForOf]=\"permissions | keyvalue\">\r\n      <igo-collapsible\r\n        *ngIf=\"groupPermissions.value.length\"\r\n        [title]=\"'igo.context.permission.' + groupPermissions.key | translate\">\r\n\r\n        <ng-template ngFor let-permission [ngForOf]=\"groupPermissions.value\">\r\n          <mat-list-item>\r\n            <mat-icon mat-list-avatar svgIcon=\"account-outline\"></mat-icon>\r\n            <h4 mat-line>{{permission.profil}}</h4>\r\n\r\n            <div igoStopPropagation\r\n                 class=\"igo-actions-container\">\r\n\r\n               <button\r\n                 mat-icon-button\r\n                 [matTooltip]=\"'igo.context.permission.delete' | translate\"\r\n                 matTooltipShowDelay=\"500\"\r\n                 color=\"warn\"\r\n                 (click)=\"removePermission.emit(permission)\">\r\n                 <mat-icon svgIcon=\"delete\"></mat-icon>\r\n               </button>\r\n            </div>\r\n\r\n          </mat-list-item>\r\n        </ng-template>\r\n      </igo-collapsible>\r\n    </ng-template>\r\n  </igo-list>\r\n\r\n</div>\r\n",
                styles: [":host{margin:10px}.full-width{width:100%}mat-radio-button{padding:14px 14px 14px 0}.scopeForm,form{padding:5px}"]
            }] }
];
/** @nocollapse */
ContextPermissionsComponent.ctorParameters = () => [
    { type: FormBuilder }
];
ContextPermissionsComponent.propDecorators = {
    context: [{ type: Input }],
    permissions: [{ type: Input }],
    addPermission: [{ type: Output }],
    removePermission: [{ type: Output }],
    scopeChanged: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    ContextPermissionsComponent.prototype.form;
    /**
     * @type {?}
     * @private
     */
    ContextPermissionsComponent.prototype._context;
    /**
     * @type {?}
     * @private
     */
    ContextPermissionsComponent.prototype._permissions;
    /** @type {?} */
    ContextPermissionsComponent.prototype.addPermission;
    /** @type {?} */
    ContextPermissionsComponent.prototype.removePermission;
    /** @type {?} */
    ContextPermissionsComponent.prototype.scopeChanged;
    /**
     * @type {?}
     * @private
     */
    ContextPermissionsComponent.prototype.formBuilder;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1wZXJtaXNzaW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb250ZXh0LyIsInNvdXJjZXMiOlsibGliL2NvbnRleHQtbWFuYWdlci9jb250ZXh0LXBlcm1pc3Npb25zL2NvbnRleHQtcGVybWlzc2lvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxXQUFXLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQWF4RCxNQUFNLE9BQU8sMkJBQTJCOzs7O0lBMEJ0QyxZQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUxsQyxrQkFBYSxHQUFvQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTlFLHFCQUFnQixHQUFvQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzdELGlCQUFZLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7SUFFcEIsQ0FBQzs7OztJQXZCaEQsSUFDSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBQ0QsSUFBSSxPQUFPLENBQUMsS0FBYztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDOzs7O0lBR0QsSUFDSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBQ0QsSUFBSSxXQUFXLENBQUMsS0FBNkI7UUFDM0MsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDNUIsQ0FBQzs7OztJQVVELFFBQVE7UUFDTixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQzs7Ozs7SUFFTSxnQkFBZ0IsQ0FBQyxLQUFLO1FBQzNCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7Ozs7O0lBRU8sU0FBUztRQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDakMsTUFBTSxFQUFFLEVBQUU7WUFDVixjQUFjLEVBQUUsQ0FBQyxNQUFNLENBQUM7U0FDekIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBOUNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxpNkZBQW1EOzthQUVwRDs7OztZQVpRLFdBQVc7OztzQkFnQmpCLEtBQUs7MEJBU0wsS0FBSzs0QkFTTCxNQUFNOytCQUNOLE1BQU07MkJBRU4sTUFBTTs7OztJQXZCUCwyQ0FBdUI7Ozs7O0lBU3ZCLCtDQUEwQjs7Ozs7SUFTMUIsbURBQTZDOztJQUU3QyxvREFBOEU7O0lBQzlFLHVEQUN1RTs7SUFDdkUsbURBQW1FOzs7OztJQUV2RCxrREFBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gIENvbnRleHQsXHJcbiAgQ29udGV4dFBlcm1pc3Npb24sXHJcbiAgQ29udGV4dFBlcm1pc3Npb25zTGlzdFxyXG59IGZyb20gJy4uL3NoYXJlZC9jb250ZXh0LmludGVyZmFjZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1jb250ZXh0LXBlcm1pc3Npb25zJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY29udGV4dC1wZXJtaXNzaW9ucy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vY29udGV4dC1wZXJtaXNzaW9ucy5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb250ZXh0UGVybWlzc2lvbnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIHB1YmxpYyBmb3JtOiBGb3JtR3JvdXA7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGNvbnRleHQoKTogQ29udGV4dCB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcclxuICB9XHJcbiAgc2V0IGNvbnRleHQodmFsdWU6IENvbnRleHQpIHtcclxuICAgIHRoaXMuX2NvbnRleHQgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfY29udGV4dDogQ29udGV4dDtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgcGVybWlzc2lvbnMoKTogQ29udGV4dFBlcm1pc3Npb25zTGlzdCB7XHJcbiAgICByZXR1cm4gdGhpcy5fcGVybWlzc2lvbnM7XHJcbiAgfVxyXG4gIHNldCBwZXJtaXNzaW9ucyh2YWx1ZTogQ29udGV4dFBlcm1pc3Npb25zTGlzdCkge1xyXG4gICAgdGhpcy5fcGVybWlzc2lvbnMgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfcGVybWlzc2lvbnM6IENvbnRleHRQZXJtaXNzaW9uc0xpc3Q7XHJcblxyXG4gIEBPdXRwdXQoKSBhZGRQZXJtaXNzaW9uOiBFdmVudEVtaXR0ZXI8Q29udGV4dFBlcm1pc3Npb24+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKVxyXG4gIHJlbW92ZVBlcm1pc3Npb246IEV2ZW50RW1pdHRlcjxDb250ZXh0UGVybWlzc2lvbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIHNjb3BlQ2hhbmdlZDogRXZlbnRFbWl0dGVyPENvbnRleHQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcikge31cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmJ1aWxkRm9ybSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGhhbmRsZUZvcm1TdWJtaXQodmFsdWUpIHtcclxuICAgIHRoaXMuYWRkUGVybWlzc2lvbi5lbWl0KHZhbHVlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYnVpbGRGb3JtKCk6IHZvaWQge1xyXG4gICAgdGhpcy5mb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XHJcbiAgICAgIHByb2ZpbDogW10sXHJcbiAgICAgIHR5cGVQZXJtaXNzaW9uOiBbJ3JlYWQnXVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==