/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { TypePermission } from '../shared/context.enum';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@igo2/auth';
export class ContextPermissionsComponent {
    /**
     * @param {?} formBuilder
     * @param {?} cd
     * @param {?} http
     * @param {?} authService
     */
    constructor(formBuilder, cd, http, authService) {
        this.formBuilder = formBuilder;
        this.cd = cd;
        this.http = http;
        this.authService = authService;
        this._profils = [];
        this.baseUrlProfils = '/apis/igo2/profils-users?';
        this.formControl = new FormControl();
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
        this.cd.detectChanges();
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
        this.cd.detectChanges();
    }
    /**
     * @return {?}
     */
    get profils() {
        return this._profils;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set profils(value) {
        this._profils = value;
        this.cd.detectChanges();
    }
    /**
     * @return {?}
     */
    get canWrite() {
        return this.context.permission === TypePermission[TypePermission.write];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.buildForm();
        this.formValueChanges$$ = this.formControl.valueChanges.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            if (value.length) {
                this.http.get(this.baseUrlProfils + 'q=' + value).subscribe((/**
                 * @param {?} profils
                 * @return {?}
                 */
                profils => {
                    this.profils = (/** @type {?} */ (profils));
                }));
                this.profils.filter((/**
                 * @param {?} profil
                 * @return {?}
                 */
                (profil) => {
                    /** @type {?} */
                    const filterNormalized = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    /** @type {?} */
                    const profilTitleNormalized = profil.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    /** @type {?} */
                    const profilNameNormalized = profil.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    /** @type {?} */
                    const profilNormalized = profilNameNormalized + profilTitleNormalized;
                    return profilNormalized.includes(filterNormalized);
                }));
            }
            else {
                this.profils = [];
            }
        }));
    }
    /**
     * @param {?=} profil
     * @return {?}
     */
    displayFn(profil) {
        return profil ? profil.title : undefined;
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
    /**
     * @param {?} value
     * @return {?}
     */
    onProfilSelected(value) {
        this.form.setValue({
            profil: value.name,
            typePermission: this.form.value.typePermission
        });
    }
}
ContextPermissionsComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-context-permissions',
                template: "<div *ngIf=\"context\">\r\n\r\n  <div *ngIf=\"!canWrite\" class=\"scopeForm\">\r\n    <h4>{{ 'igo.context.permission.readOnlyTitle' | translate }}</h4>\r\n    <p>{{ 'igo.context.permission.readOnlyMsg' | translate }}</p>\r\n  </div>\r\n\r\n  <div *ngIf=\"canWrite\" class=\"scopeForm\">\r\n    <mat-radio-group [(ngModel)]=\"context.scope\"\r\n                    (change)=\"scopeChanged.emit(context)\">\r\n      <mat-radio-button value=\"private\">\r\n        {{ 'igo.context.permission.scope.private' | translate }}\r\n      </mat-radio-button>\r\n      <mat-radio-button value=\"protected\">\r\n        {{ 'igo.context.permission.scope.shared' | translate }}\r\n      </mat-radio-button>\r\n      <mat-radio-button *ngIf=\"authService.isAdmin\" value=\"public\">\r\n        {{ 'igo.context.permission.scope.public' | translate }}\r\n      </mat-radio-button>\r\n    </mat-radio-group>\r\n  </div>\r\n\r\n  <form *ngIf=\"context.scope !== 'private' && canWrite\" [formGroup]=\"form\"\r\n    (ngSubmit)=\"handleFormSubmit(form.value)\">\r\n\r\n    <mat-form-field class=\"full-width\">\r\n      <input matInput required\r\n             [placeholder]=\"'igo.context.permission.user' | translate\"\r\n             [formControl]=\"formControl\"\r\n             [matAutocomplete]=\"auto\">\r\n      <mat-autocomplete #auto=\"matAutocomplete\" (optionSelected)=\"onProfilSelected($event.option.value)\"\r\n        [displayWith]=\"displayFn\">\r\n          <mat-option *ngFor=\"let profil of this.profils\" [value]=\"profil\">\r\n              {{profil.title}}<br>\r\n              <small class=\"mat-typography\">{{profil.name}}</small>\r\n          </mat-option>\r\n      </mat-autocomplete>\r\n     <mat-error>\r\n       {{ 'igo.context.permission.profilRequired' | translate }}\r\n     </mat-error>\r\n    </mat-form-field>\r\n\r\n\r\n    <mat-radio-group formControlName=\"typePermission\">\r\n      <mat-radio-button value=\"read\">\r\n        {{ 'igo.context.permission.read' | translate }}\r\n      </mat-radio-button>\r\n      <mat-radio-button value=\"write\">\r\n        {{ 'igo.context.permission.write' | translate }}\r\n      </mat-radio-button>\r\n    </mat-radio-group>\r\n\r\n\r\n    <div class=\"igo-form-button-group\">\r\n      <button\r\n        mat-raised-button\r\n        type=\"submit\"\r\n        [disabled]=\"!form.valid\">\r\n        {{ 'igo.context.permission.addBtn' | translate }}\r\n      </button>\r\n    </div>\r\n\r\n  </form>\r\n\r\n  <igo-list *ngIf=\"permissions && context.scope !== 'private'\">\r\n    <ng-template ngFor let-groupPermissions [ngForOf]=\"permissions | keyvalue\">\r\n      <igo-collapsible\r\n        *ngIf=\"groupPermissions.value.length\"\r\n        [title]=\"'igo.context.permission.' + groupPermissions.key | translate\">\r\n\r\n        <ng-template ngFor let-permission [ngForOf]=\"groupPermissions.value\">\r\n          <mat-list-item>\r\n            <mat-icon mat-list-avatar svgIcon=\"account-outline\"></mat-icon>\r\n            <h4 mat-line>{{permission.profilTitle}} <small class=\"mat-typography\">{{permission.profil}}</small></h4>\r\n\r\n            <div igoStopPropagation\r\n                 class=\"igo-actions-container\">\r\n\r\n               <button *ngIf=\"canWrite || permission.profil === authService.decodeToken().user.sourceId\"\r\n                 mat-icon-button\r\n                 [matTooltip]=\"'igo.context.permission.delete' | translate\"\r\n                 matTooltipShowDelay=\"500\"\r\n                 color=\"warn\"\r\n                 (click)=\"removePermission.emit(permission)\">\r\n                 <mat-icon svgIcon=\"delete\"></mat-icon>\r\n               </button>\r\n            </div>\r\n\r\n          </mat-list-item>\r\n        </ng-template>\r\n      </igo-collapsible>\r\n    </ng-template>\r\n  </igo-list>\r\n\r\n</div>\r\n",
                styles: [":host{margin:10px}.full-width{width:100%}mat-radio-button{padding:14px 14px 14px 0}.scopeForm,form{padding:5px}mat-option ::ng-deep .mat-option-text{line-height:initial}"]
            }] }
];
/** @nocollapse */
ContextPermissionsComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: ChangeDetectorRef },
    { type: HttpClient },
    { type: AuthService }
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
    /**
     * @type {?}
     * @private
     */
    ContextPermissionsComponent.prototype._profils;
    /**
     * @type {?}
     * @private
     */
    ContextPermissionsComponent.prototype.baseUrlProfils;
    /** @type {?} */
    ContextPermissionsComponent.prototype.formControl;
    /** @type {?} */
    ContextPermissionsComponent.prototype.formValueChanges$$;
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
    /**
     * @type {?}
     * @private
     */
    ContextPermissionsComponent.prototype.cd;
    /**
     * @type {?}
     * @private
     */
    ContextPermissionsComponent.prototype.http;
    /** @type {?} */
    ContextPermissionsComponent.prototype.authService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1wZXJtaXNzaW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb250ZXh0LyIsInNvdXJjZXMiOlsibGliL2NvbnRleHQtbWFuYWdlci9jb250ZXh0LXBlcm1pc3Npb25zL2NvbnRleHQtcGVybWlzc2lvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFVLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxXQUFXLEVBQWEsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFRckUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXhELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUdsRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBT3pDLE1BQU0sT0FBTywyQkFBMkI7Ozs7Ozs7SUE2Q3RDLFlBQW9CLFdBQXdCLEVBQ3hCLEVBQXFCLEVBQ3JCLElBQWdCLEVBQ2pCLFdBQXdCO1FBSHZCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQ3JCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDakIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFsQm5DLGFBQVEsR0FBcUIsRUFBRSxDQUFDO1FBTWhDLG1CQUFjLEdBQUcsMkJBQTJCLENBQUM7UUFFOUMsZ0JBQVcsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBRzdCLGtCQUFhLEdBQW9DLElBQUksWUFBWSxFQUFFLENBQUM7UUFDcEUscUJBQWdCLEdBQW9DLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdkUsaUJBQVksR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUtyQixDQUFDOzs7O0lBN0MvQyxJQUNJLE9BQU87UUFD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LENBQUM7WUFDakMsTUFBTSxFQUFFLEVBQUU7WUFDVixjQUFjLEVBQUUsQ0FBQyxNQUFNLENBQUM7U0FDekIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxLQUFLO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ2pCLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSTtZQUNsQixjQUFjLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYztTQUMvQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7WUFoR0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLGl3SEFBbUQ7O2FBRXBEOzs7O1lBbkJRLFdBQVc7WUFEcUMsaUJBQWlCO1lBV2pFLFVBQVU7WUFHVixXQUFXOzs7c0JBVWpCLEtBQUs7MEJBVUwsS0FBSzs0QkE0QkwsTUFBTTsrQkFDTixNQUFNOzJCQUNOLE1BQU07Ozs7SUExQ1AsMkNBQXVCOzs7OztJQVV2QiwrQ0FBMEI7Ozs7O0lBVTFCLG1EQUE2Qzs7Ozs7SUFTN0MsK0NBQXdDOzs7OztJQU14QyxxREFBcUQ7O0lBRXJELGtEQUF1Qzs7SUFDdkMseURBQWlDOztJQUVqQyxvREFBOEU7O0lBQzlFLHVEQUFpRjs7SUFDakYsbURBQW1FOzs7OztJQUV2RCxrREFBZ0M7Ozs7O0lBQ2hDLHlDQUE2Qjs7Ozs7SUFDN0IsMkNBQXdCOztJQUN4QixrREFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25Jbml0LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7XHJcbiAgQ29udGV4dCxcclxuICBDb250ZXh0UGVybWlzc2lvbixcclxuICBDb250ZXh0UGVybWlzc2lvbnNMaXN0LFxyXG4gIENvbnRleHRQcm9maWxzXHJcbn0gZnJvbSAnLi4vc2hhcmVkL2NvbnRleHQuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgVHlwZVBlcm1pc3Npb24gfSBmcm9tICcuLi9zaGFyZWQvY29udGV4dC5lbnVtJztcclxuXHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICdAaWdvMi9hdXRoJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWNvbnRleHQtcGVybWlzc2lvbnMnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9jb250ZXh0LXBlcm1pc3Npb25zLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9jb250ZXh0LXBlcm1pc3Npb25zLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIENvbnRleHRQZXJtaXNzaW9uc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcHVibGljIGZvcm06IEZvcm1Hcm91cDtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgY29udGV4dCgpOiBDb250ZXh0IHtcclxuICAgIHJldHVybiB0aGlzLl9jb250ZXh0O1xyXG4gIH1cclxuICBzZXQgY29udGV4dCh2YWx1ZTogQ29udGV4dCkge1xyXG4gICAgdGhpcy5fY29udGV4dCA9IHZhbHVlO1xyXG4gICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2NvbnRleHQ6IENvbnRleHQ7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHBlcm1pc3Npb25zKCk6IENvbnRleHRQZXJtaXNzaW9uc0xpc3Qge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Blcm1pc3Npb25zO1xyXG4gIH1cclxuICBzZXQgcGVybWlzc2lvbnModmFsdWU6IENvbnRleHRQZXJtaXNzaW9uc0xpc3QpIHtcclxuICAgIHRoaXMuX3Blcm1pc3Npb25zID0gdmFsdWU7XHJcbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfcGVybWlzc2lvbnM6IENvbnRleHRQZXJtaXNzaW9uc0xpc3Q7XHJcblxyXG4gIGdldCBwcm9maWxzKCk6IENvbnRleHRQcm9maWxzW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Byb2ZpbHM7XHJcbiAgfVxyXG4gIHNldCBwcm9maWxzKHZhbHVlOiBDb250ZXh0UHJvZmlsc1tdKSB7XHJcbiAgICB0aGlzLl9wcm9maWxzID0gdmFsdWU7XHJcbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfcHJvZmlsczogQ29udGV4dFByb2ZpbHNbXSA9IFtdO1xyXG5cclxuICBnZXQgY2FuV3JpdGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0LnBlcm1pc3Npb24gPT09IFR5cGVQZXJtaXNzaW9uW1R5cGVQZXJtaXNzaW9uLndyaXRlXTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYmFzZVVybFByb2ZpbHMgPSAnL2FwaXMvaWdvMi9wcm9maWxzLXVzZXJzPyc7XHJcblxyXG4gIHB1YmxpYyBmb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xyXG4gIGZvcm1WYWx1ZUNoYW5nZXMkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBAT3V0cHV0KCkgYWRkUGVybWlzc2lvbjogRXZlbnRFbWl0dGVyPENvbnRleHRQZXJtaXNzaW9uPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgcmVtb3ZlUGVybWlzc2lvbjogRXZlbnRFbWl0dGVyPENvbnRleHRQZXJtaXNzaW9uPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgc2NvcGVDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8Q29udGV4dD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgICAgICAgICAgICBwdWJsaWMgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuYnVpbGRGb3JtKCk7XHJcblxyXG4gICAgdGhpcy5mb3JtVmFsdWVDaGFuZ2VzJCQgPSB0aGlzLmZvcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XHJcbiAgICAgIGlmICh2YWx1ZS5sZW5ndGgpIHtcclxuICAgICAgICB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZVVybFByb2ZpbHMgKyAncT0nICsgdmFsdWUpLnN1YnNjcmliZShwcm9maWxzID0+IHtcclxuICAgICAgICAgIHRoaXMucHJvZmlscyA9IHByb2ZpbHMgYXMgQ29udGV4dFByb2ZpbHNbXTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnByb2ZpbHMuZmlsdGVyKChwcm9maWwpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGZpbHRlck5vcm1hbGl6ZWQgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpLm5vcm1hbGl6ZSgnTkZEJykucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgJycpO1xyXG4gICAgICAgICAgY29uc3QgcHJvZmlsVGl0bGVOb3JtYWxpemVkID0gcHJvZmlsLnRpdGxlLnRvTG93ZXJDYXNlKCkubm9ybWFsaXplKCdORkQnKS5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXS9nLCAnJyk7XHJcbiAgICAgICAgICBjb25zdCBwcm9maWxOYW1lTm9ybWFsaXplZCA9IHByb2ZpbC5uYW1lLnRvTG93ZXJDYXNlKCkubm9ybWFsaXplKCdORkQnKS5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXS9nLCAnJyk7XHJcbiAgICAgICAgICBjb25zdCBwcm9maWxOb3JtYWxpemVkID0gcHJvZmlsTmFtZU5vcm1hbGl6ZWQgKyBwcm9maWxUaXRsZU5vcm1hbGl6ZWQ7XHJcbiAgICAgICAgICByZXR1cm4gcHJvZmlsTm9ybWFsaXplZC5pbmNsdWRlcyhmaWx0ZXJOb3JtYWxpemVkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnByb2ZpbHMgPSBbXTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5Rm4ocHJvZmlsPzogQ29udGV4dFByb2ZpbHMpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHByb2ZpbCA/IHByb2ZpbC50aXRsZSA6IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoYW5kbGVGb3JtU3VibWl0KHZhbHVlKSB7XHJcbiAgICB0aGlzLmFkZFBlcm1pc3Npb24uZW1pdCh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGJ1aWxkRm9ybSgpOiB2b2lkIHtcclxuICAgIHRoaXMuZm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICBwcm9maWw6IFtdLFxyXG4gICAgICB0eXBlUGVybWlzc2lvbjogWydyZWFkJ11cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25Qcm9maWxTZWxlY3RlZCh2YWx1ZSkge1xyXG4gICAgdGhpcy5mb3JtLnNldFZhbHVlKHtcclxuICAgICAgcHJvZmlsOiB2YWx1ZS5uYW1lLFxyXG4gICAgICB0eXBlUGVybWlzc2lvbjogdGhpcy5mb3JtLnZhbHVlLnR5cGVQZXJtaXNzaW9uXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19