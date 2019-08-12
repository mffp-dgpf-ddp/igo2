/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
var ContextPermissionsComponent = /** @class */ (function () {
    function ContextPermissionsComponent(formBuilder) {
        this.formBuilder = formBuilder;
        this.addPermission = new EventEmitter();
        this.removePermission = new EventEmitter();
        this.scopeChanged = new EventEmitter();
    }
    Object.defineProperty(ContextPermissionsComponent.prototype, "context", {
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
    Object.defineProperty(ContextPermissionsComponent.prototype, "permissions", {
        get: /**
         * @return {?}
         */
        function () {
            return this._permissions;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._permissions = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ContextPermissionsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.buildForm();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ContextPermissionsComponent.prototype.handleFormSubmit = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.addPermission.emit(value);
    };
    /**
     * @private
     * @return {?}
     */
    ContextPermissionsComponent.prototype.buildForm = /**
     * @private
     * @return {?}
     */
    function () {
        this.form = this.formBuilder.group({
            profil: [],
            typePermission: ['read']
        });
    };
    ContextPermissionsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-context-permissions',
                    template: "<div *ngIf=\"context\">\r\n\r\n  <div class=\"scopeForm\">\r\n    <mat-radio-group [(ngModel)]=\"context.scope\"\r\n                    (change)=\"scopeChanged.emit(context)\">\r\n      <mat-radio-button value=\"private\">\r\n        {{ 'igo.context.permission.scope.private' | translate }}\r\n      </mat-radio-button>\r\n      <mat-radio-button value=\"protected\">\r\n        {{ 'igo.context.permission.scope.protected' | translate }}\r\n      </mat-radio-button>\r\n      <mat-radio-button value=\"public\">\r\n        {{ 'igo.context.permission.scope.public' | translate }}\r\n      </mat-radio-button>\r\n    </mat-radio-group>\r\n  </div>\r\n\r\n  <form *ngIf=\"context.scope !== 'private'\" [formGroup]=\"form\"\r\n    (ngSubmit)=\"handleFormSubmit(form.value)\">\r\n\r\n    <mat-form-field class=\"full-width\">\r\n      <input matInput required\r\n             [placeholder]=\"'igo.context.permission.profil' | translate\"\r\n             formControlName=\"profil\">\r\n     <mat-error>\r\n       {{ 'igo.context.permission.profilRequired' | translate }}\r\n     </mat-error>\r\n    </mat-form-field>\r\n\r\n\r\n    <mat-radio-group formControlName=\"typePermission\">\r\n      <mat-radio-button value=\"read\">\r\n        {{ 'igo.context.permission.read' | translate }}\r\n      </mat-radio-button>\r\n      <mat-radio-button value=\"write\">\r\n        {{ 'igo.context.permission.write' | translate }}\r\n      </mat-radio-button>\r\n    </mat-radio-group>\r\n\r\n\r\n    <div class=\"igo-form-button-group\">\r\n      <button\r\n        mat-raised-button\r\n        type=\"submit\"\r\n        [disabled]=\"!form.valid\">\r\n        {{ 'igo.context.permission.addBtn' | translate }}\r\n      </button>\r\n    </div>\r\n\r\n  </form>\r\n\r\n  <igo-list *ngIf=\"permissions && context.scope !== 'private'\">\r\n    <ng-template ngFor let-groupPermissions [ngForOf]=\"permissions | keyvalue\">\r\n      <igo-collapsible\r\n        *ngIf=\"groupPermissions.value.length\"\r\n        [title]=\"'igo.context.permission.' + groupPermissions.key | translate\">\r\n\r\n        <ng-template ngFor let-permission [ngForOf]=\"groupPermissions.value\">\r\n          <mat-list-item>\r\n            <mat-icon mat-list-avatar svgIcon=\"account-outline\"></mat-icon>\r\n            <h4 mat-line>{{permission.profil}}</h4>\r\n\r\n            <div igoStopPropagation\r\n                 class=\"igo-actions-container\">\r\n\r\n               <button\r\n                 mat-icon-button\r\n                 [matTooltip]=\"'igo.context.permission.delete' | translate\"\r\n                 matTooltipShowDelay=\"500\"\r\n                 color=\"warn\"\r\n                 (click)=\"removePermission.emit(permission)\">\r\n                 <mat-icon svgIcon=\"delete\"></mat-icon>\r\n               </button>\r\n            </div>\r\n\r\n          </mat-list-item>\r\n        </ng-template>\r\n      </igo-collapsible>\r\n    </ng-template>\r\n  </igo-list>\r\n\r\n</div>\r\n",
                    styles: [":host{margin:0 10px}.full-width{width:100%}mat-radio-button{padding:14px 14px 14px 0}.scopeForm,form{padding:5px}"]
                }] }
    ];
    /** @nocollapse */
    ContextPermissionsComponent.ctorParameters = function () { return [
        { type: FormBuilder }
    ]; };
    ContextPermissionsComponent.propDecorators = {
        context: [{ type: Input }],
        permissions: [{ type: Input }],
        addPermission: [{ type: Output }],
        removePermission: [{ type: Output }],
        scopeChanged: [{ type: Output }]
    };
    return ContextPermissionsComponent;
}());
export { ContextPermissionsComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1wZXJtaXNzaW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb250ZXh0LyIsInNvdXJjZXMiOlsibGliL2NvbnRleHQtbWFuYWdlci9jb250ZXh0LXBlcm1pc3Npb25zL2NvbnRleHQtcGVybWlzc2lvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxXQUFXLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQVF4RDtJQStCRSxxQ0FBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFMbEMsa0JBQWEsR0FBb0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU5RSxxQkFBZ0IsR0FBb0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM3RCxpQkFBWSxHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBRXBCLENBQUM7SUF2QmhELHNCQUNJLGdEQUFPOzs7O1FBRFg7WUFFRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdkIsQ0FBQzs7Ozs7UUFDRCxVQUFZLEtBQWM7WUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQzs7O09BSEE7SUFNRCxzQkFDSSxvREFBVzs7OztRQURmO1lBRUUsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzNCLENBQUM7Ozs7O1FBQ0QsVUFBZ0IsS0FBNkI7WUFDM0MsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDNUIsQ0FBQzs7O09BSEE7Ozs7SUFhRCw4Q0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQzs7Ozs7SUFFTSxzREFBZ0I7Ozs7SUFBdkIsVUFBd0IsS0FBSztRQUMzQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7OztJQUVPLCtDQUFTOzs7O0lBQWpCO1FBQ0UsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUNqQyxNQUFNLEVBQUUsRUFBRTtZQUNWLGNBQWMsRUFBRSxDQUFDLE1BQU0sQ0FBQztTQUN6QixDQUFDLENBQUM7SUFDTCxDQUFDOztnQkE5Q0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLGk2RkFBbUQ7O2lCQUVwRDs7OztnQkFaUSxXQUFXOzs7MEJBZ0JqQixLQUFLOzhCQVNMLEtBQUs7Z0NBU0wsTUFBTTttQ0FDTixNQUFNOytCQUVOLE1BQU07O0lBa0JULGtDQUFDO0NBQUEsQUEvQ0QsSUErQ0M7U0ExQ1ksMkJBQTJCOzs7SUFDdEMsMkNBQXVCOzs7OztJQVN2QiwrQ0FBMEI7Ozs7O0lBUzFCLG1EQUE2Qzs7SUFFN0Msb0RBQThFOztJQUM5RSx1REFDdUU7O0lBQ3ZFLG1EQUFtRTs7Ozs7SUFFdkQsa0RBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHtcclxuICBDb250ZXh0LFxyXG4gIENvbnRleHRQZXJtaXNzaW9uLFxyXG4gIENvbnRleHRQZXJtaXNzaW9uc0xpc3RcclxufSBmcm9tICcuLi9zaGFyZWQvY29udGV4dC5pbnRlcmZhY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tY29udGV4dC1wZXJtaXNzaW9ucycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbnRleHQtcGVybWlzc2lvbnMuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2NvbnRleHQtcGVybWlzc2lvbnMuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29udGV4dFBlcm1pc3Npb25zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBwdWJsaWMgZm9ybTogRm9ybUdyb3VwO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBjb250ZXh0KCk6IENvbnRleHQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQ7XHJcbiAgfVxyXG4gIHNldCBjb250ZXh0KHZhbHVlOiBDb250ZXh0KSB7XHJcbiAgICB0aGlzLl9jb250ZXh0ID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2NvbnRleHQ6IENvbnRleHQ7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHBlcm1pc3Npb25zKCk6IENvbnRleHRQZXJtaXNzaW9uc0xpc3Qge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Blcm1pc3Npb25zO1xyXG4gIH1cclxuICBzZXQgcGVybWlzc2lvbnModmFsdWU6IENvbnRleHRQZXJtaXNzaW9uc0xpc3QpIHtcclxuICAgIHRoaXMuX3Blcm1pc3Npb25zID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3Blcm1pc3Npb25zOiBDb250ZXh0UGVybWlzc2lvbnNMaXN0O1xyXG5cclxuICBAT3V0cHV0KCkgYWRkUGVybWlzc2lvbjogRXZlbnRFbWl0dGVyPENvbnRleHRQZXJtaXNzaW9uPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KClcclxuICByZW1vdmVQZXJtaXNzaW9uOiBFdmVudEVtaXR0ZXI8Q29udGV4dFBlcm1pc3Npb24+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBzY29wZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxDb250ZXh0PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIpIHt9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5idWlsZEZvcm0oKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoYW5kbGVGb3JtU3VibWl0KHZhbHVlKSB7XHJcbiAgICB0aGlzLmFkZFBlcm1pc3Npb24uZW1pdCh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGJ1aWxkRm9ybSgpOiB2b2lkIHtcclxuICAgIHRoaXMuZm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICBwcm9maWw6IFtdLFxyXG4gICAgICB0eXBlUGVybWlzc2lvbjogWydyZWFkJ11cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=