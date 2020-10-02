/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { TypePermission } from '../shared/context.enum';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@igo2/auth';
var ContextPermissionsComponent = /** @class */ (function () {
    function ContextPermissionsComponent(formBuilder, cd, http, authService) {
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
            this.cd.detectChanges();
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
            this.cd.detectChanges();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextPermissionsComponent.prototype, "profils", {
        get: /**
         * @return {?}
         */
        function () {
            return this._profils;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._profils = value;
            this.cd.detectChanges();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextPermissionsComponent.prototype, "canWrite", {
        get: /**
         * @return {?}
         */
        function () {
            return this.context.permission === TypePermission[TypePermission.write];
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
        var _this = this;
        this.buildForm();
        this.formValueChanges$$ = this.formControl.valueChanges.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value.length) {
                _this.http.get(_this.baseUrlProfils + 'q=' + value).subscribe((/**
                 * @param {?} profils
                 * @return {?}
                 */
                function (profils) {
                    _this.profils = (/** @type {?} */ (profils));
                }));
                _this.profils.filter((/**
                 * @param {?} profil
                 * @return {?}
                 */
                function (profil) {
                    /** @type {?} */
                    var filterNormalized = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    /** @type {?} */
                    var profilTitleNormalized = profil.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    /** @type {?} */
                    var profilNameNormalized = profil.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    /** @type {?} */
                    var profilNormalized = profilNameNormalized + profilTitleNormalized;
                    return profilNormalized.includes(filterNormalized);
                }));
            }
            else {
                _this.profils = [];
            }
        }));
    };
    /**
     * @param {?=} profil
     * @return {?}
     */
    ContextPermissionsComponent.prototype.displayFn = /**
     * @param {?=} profil
     * @return {?}
     */
    function (profil) {
        return profil ? profil.title : undefined;
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
    /**
     * @param {?} value
     * @return {?}
     */
    ContextPermissionsComponent.prototype.onProfilSelected = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.form.setValue({
            profil: value.name,
            typePermission: this.form.value.typePermission
        });
    };
    ContextPermissionsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-context-permissions',
                    template: "<div *ngIf=\"context\">\r\n\r\n  <div *ngIf=\"!canWrite\" class=\"scopeForm\">\r\n    <h4>{{ 'igo.context.permission.readOnlyTitle' | translate }}</h4>\r\n    <p>{{ 'igo.context.permission.readOnlyMsg' | translate }}</p>\r\n  </div>\r\n\r\n  <div *ngIf=\"canWrite\" class=\"scopeForm\">\r\n    <mat-radio-group [(ngModel)]=\"context.scope\"\r\n                    (change)=\"scopeChanged.emit(context)\">\r\n      <mat-radio-button value=\"private\">\r\n        {{ 'igo.context.permission.scope.private' | translate }}\r\n      </mat-radio-button>\r\n      <mat-radio-button value=\"protected\">\r\n        {{ 'igo.context.permission.scope.shared' | translate }}\r\n      </mat-radio-button>\r\n      <mat-radio-button *ngIf=\"authService.isAdmin\" value=\"public\">\r\n        {{ 'igo.context.permission.scope.public' | translate }}\r\n      </mat-radio-button>\r\n    </mat-radio-group>\r\n  </div>\r\n\r\n  <form *ngIf=\"context.scope !== 'private' && canWrite\" [formGroup]=\"form\"\r\n    (ngSubmit)=\"handleFormSubmit(form.value)\">\r\n\r\n    <mat-form-field class=\"full-width\">\r\n      <input matInput required\r\n             [placeholder]=\"'igo.context.permission.user' | translate\"\r\n             [formControl]=\"formControl\"\r\n             [matAutocomplete]=\"auto\">\r\n      <mat-autocomplete #auto=\"matAutocomplete\" (optionSelected)=\"onProfilSelected($event.option.value)\"\r\n        [displayWith]=\"displayFn\">\r\n          <mat-option *ngFor=\"let profil of this.profils\" [value]=\"profil\">\r\n              {{profil.title}}<br>\r\n              <small class=\"mat-typography\">{{profil.name}}</small>\r\n          </mat-option>\r\n      </mat-autocomplete>\r\n     <mat-error>\r\n       {{ 'igo.context.permission.profilRequired' | translate }}\r\n     </mat-error>\r\n    </mat-form-field>\r\n\r\n\r\n    <mat-radio-group formControlName=\"typePermission\">\r\n      <mat-radio-button value=\"read\">\r\n        {{ 'igo.context.permission.read' | translate }}\r\n      </mat-radio-button>\r\n      <mat-radio-button value=\"write\">\r\n        {{ 'igo.context.permission.write' | translate }}\r\n      </mat-radio-button>\r\n    </mat-radio-group>\r\n\r\n\r\n    <div class=\"igo-form-button-group\">\r\n      <button\r\n        mat-raised-button\r\n        type=\"submit\"\r\n        [disabled]=\"!form.valid\">\r\n        {{ 'igo.context.permission.addBtn' | translate }}\r\n      </button>\r\n    </div>\r\n\r\n  </form>\r\n\r\n  <igo-list *ngIf=\"permissions && context.scope !== 'private'\">\r\n    <ng-template ngFor let-groupPermissions [ngForOf]=\"permissions | keyvalue\">\r\n      <igo-collapsible\r\n        *ngIf=\"groupPermissions.value.length\"\r\n        [title]=\"'igo.context.permission.' + groupPermissions.key | translate\">\r\n\r\n        <ng-template ngFor let-permission [ngForOf]=\"groupPermissions.value\">\r\n          <mat-list-item>\r\n            <mat-icon mat-list-avatar svgIcon=\"account-outline\"></mat-icon>\r\n            <h4 mat-line>{{permission.profilTitle}} <small class=\"mat-typography\">{{permission.profil}}</small></h4>\r\n\r\n            <div igoStopPropagation\r\n                 class=\"igo-actions-container\">\r\n\r\n               <button *ngIf=\"canWrite || permission.profil === authService.decodeToken().user.sourceId\"\r\n                 mat-icon-button\r\n                 [matTooltip]=\"'igo.context.permission.delete' | translate\"\r\n                 matTooltipShowDelay=\"500\"\r\n                 color=\"warn\"\r\n                 (click)=\"removePermission.emit(permission)\">\r\n                 <mat-icon svgIcon=\"delete\"></mat-icon>\r\n               </button>\r\n            </div>\r\n\r\n          </mat-list-item>\r\n        </ng-template>\r\n      </igo-collapsible>\r\n    </ng-template>\r\n  </igo-list>\r\n\r\n</div>\r\n",
                    styles: [":host{margin:10px}.full-width{width:100%}mat-radio-button{padding:14px 14px 14px 0}.scopeForm,form{padding:5px}mat-option ::ng-deep .mat-option-text{line-height:initial}"]
                }] }
    ];
    /** @nocollapse */
    ContextPermissionsComponent.ctorParameters = function () { return [
        { type: FormBuilder },
        { type: ChangeDetectorRef },
        { type: HttpClient },
        { type: AuthService }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1wZXJtaXNzaW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb250ZXh0LyIsInNvdXJjZXMiOlsibGliL2NvbnRleHQtbWFuYWdlci9jb250ZXh0LXBlcm1pc3Npb25zL2NvbnRleHQtcGVybWlzc2lvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFVLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxXQUFXLEVBQWEsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFRckUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXhELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUdsRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRXpDO0lBa0RFLHFDQUFvQixXQUF3QixFQUN4QixFQUFxQixFQUNyQixJQUFnQixFQUNqQixXQUF3QjtRQUh2QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUNyQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2pCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBbEJuQyxhQUFRLEdBQXFCLEVBQUUsQ0FBQztRQU1oQyxtQkFBYyxHQUFHLDJCQUEyQixDQUFDO1FBRTlDLGdCQUFXLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUc3QixrQkFBYSxHQUFvQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3BFLHFCQUFnQixHQUFvQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3ZFLGlCQUFZLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7SUFLckIsQ0FBQztJQTdDL0Msc0JBQ0ksZ0RBQU87Ozs7UUFEWDtZQUVFLE9BQU8sSUFBSSxDQUFD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R0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUNqQyxNQUFNLEVBQUUsRUFBRTtZQUNWLGNBQWMsRUFBRSxDQUFDLE1BQU0sQ0FBQztTQUN6QixDQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVELHNEQUFnQjs7OztJQUFoQixVQUFpQixLQUFLO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ2pCLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSTtZQUNsQixjQUFjLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYztTQUMvQyxDQUFDLENBQUM7SUFDTCxDQUFDOztnQkFoR0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLGl3SEFBbUQ7O2lCQUVwRDs7OztnQkFuQlEsV0FBVztnQkFEcUMsaUJBQWlCO2dCQVdqRSxVQUFVO2dCQUdWLFdBQVc7OzswQkFVakIsS0FBSzs4QkFVTCxLQUFLO2dDQTRCTCxNQUFNO21DQUNOLE1BQU07K0JBQ04sTUFBTTs7SUFpRFQsa0NBQUM7Q0FBQSxBQWpHRCxJQWlHQztTQTVGWSwyQkFBMkI7OztJQUN0QywyQ0FBdUI7Ozs7O0lBVXZCLCtDQUEwQjs7Ozs7SUFVMUIsbURBQTZDOzs7OztJQVM3QywrQ0FBd0M7Ozs7O0lBTXhDLHFEQUFxRDs7SUFFckQsa0RBQXVDOztJQUN2Qyx5REFBaUM7O0lBRWpDLG9EQUE4RTs7SUFDOUUsdURBQWlGOztJQUNqRixtREFBbUU7Ozs7O0lBRXZELGtEQUFnQzs7Ozs7SUFDaEMseUNBQTZCOzs7OztJQUM3QiwyQ0FBd0I7O0lBQ3hCLGtEQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkluaXQsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHtcclxuICBDb250ZXh0LFxyXG4gIENvbnRleHRQZXJtaXNzaW9uLFxyXG4gIENvbnRleHRQZXJtaXNzaW9uc0xpc3QsXHJcbiAgQ29udGV4dFByb2ZpbHNcclxufSBmcm9tICcuLi9zaGFyZWQvY29udGV4dC5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBUeXBlUGVybWlzc2lvbiB9IGZyb20gJy4uL3NoYXJlZC9jb250ZXh0LmVudW0nO1xyXG5cclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJ0BpZ28yL2F1dGgnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tY29udGV4dC1wZXJtaXNzaW9ucycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbnRleHQtcGVybWlzc2lvbnMuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2NvbnRleHQtcGVybWlzc2lvbnMuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29udGV4dFBlcm1pc3Npb25zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBwdWJsaWMgZm9ybTogRm9ybUdyb3VwO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBjb250ZXh0KCk6IENvbnRleHQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQ7XHJcbiAgfVxyXG4gIHNldCBjb250ZXh0KHZhbHVlOiBDb250ZXh0KSB7XHJcbiAgICB0aGlzLl9jb250ZXh0ID0gdmFsdWU7XHJcbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfY29udGV4dDogQ29udGV4dDtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgcGVybWlzc2lvbnMoKTogQ29udGV4dFBlcm1pc3Npb25zTGlzdCB7XHJcbiAgICByZXR1cm4gdGhpcy5fcGVybWlzc2lvbnM7XHJcbiAgfVxyXG4gIHNldCBwZXJtaXNzaW9ucyh2YWx1ZTogQ29udGV4dFBlcm1pc3Npb25zTGlzdCkge1xyXG4gICAgdGhpcy5fcGVybWlzc2lvbnMgPSB2YWx1ZTtcclxuICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuICBwcml2YXRlIF9wZXJtaXNzaW9uczogQ29udGV4dFBlcm1pc3Npb25zTGlzdDtcclxuXHJcbiAgZ2V0IHByb2ZpbHMoKTogQ29udGV4dFByb2ZpbHNbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcHJvZmlscztcclxuICB9XHJcbiAgc2V0IHByb2ZpbHModmFsdWU6IENvbnRleHRQcm9maWxzW10pIHtcclxuICAgIHRoaXMuX3Byb2ZpbHMgPSB2YWx1ZTtcclxuICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuICBwcml2YXRlIF9wcm9maWxzOiBDb250ZXh0UHJvZmlsc1tdID0gW107XHJcblxyXG4gIGdldCBjYW5Xcml0ZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmNvbnRleHQucGVybWlzc2lvbiA9PT0gVHlwZVBlcm1pc3Npb25bVHlwZVBlcm1pc3Npb24ud3JpdGVdO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBiYXNlVXJsUHJvZmlscyA9ICcvYXBpcy9pZ28yL3Byb2ZpbHMtdXNlcnM/JztcclxuXHJcbiAgcHVibGljIGZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCk7XHJcbiAgZm9ybVZhbHVlQ2hhbmdlcyQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIEBPdXRwdXQoKSBhZGRQZXJtaXNzaW9uOiBFdmVudEVtaXR0ZXI8Q29udGV4dFBlcm1pc3Npb24+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSByZW1vdmVQZXJtaXNzaW9uOiBFdmVudEVtaXR0ZXI8Q29udGV4dFBlcm1pc3Npb24+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBzY29wZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxDb250ZXh0PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgICAgICAgICAgIHB1YmxpYyBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHt9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5idWlsZEZvcm0oKTtcclxuXHJcbiAgICB0aGlzLmZvcm1WYWx1ZUNoYW5nZXMkJCA9IHRoaXMuZm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodmFsdWUpID0+IHtcclxuICAgICAgaWYgKHZhbHVlLmxlbmd0aCkge1xyXG4gICAgICAgIHRoaXMuaHR0cC5nZXQodGhpcy5iYXNlVXJsUHJvZmlscyArICdxPScgKyB2YWx1ZSkuc3Vic2NyaWJlKHByb2ZpbHMgPT4ge1xyXG4gICAgICAgICAgdGhpcy5wcm9maWxzID0gcHJvZmlscyBhcyBDb250ZXh0UHJvZmlsc1tdO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucHJvZmlscy5maWx0ZXIoKHByb2ZpbCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZmlsdGVyTm9ybWFsaXplZCA9IHZhbHVlLnRvTG93ZXJDYXNlKCkubm9ybWFsaXplKCdORkQnKS5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXS9nLCAnJyk7XHJcbiAgICAgICAgICBjb25zdCBwcm9maWxUaXRsZU5vcm1hbGl6ZWQgPSBwcm9maWwudGl0bGUudG9Mb3dlckNhc2UoKS5ub3JtYWxpemUoJ05GRCcpLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2csICcnKTtcclxuICAgICAgICAgIGNvbnN0IHByb2ZpbE5hbWVOb3JtYWxpemVkID0gcHJvZmlsLm5hbWUudG9Mb3dlckNhc2UoKS5ub3JtYWxpemUoJ05GRCcpLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2csICcnKTtcclxuICAgICAgICAgIGNvbnN0IHByb2ZpbE5vcm1hbGl6ZWQgPSBwcm9maWxOYW1lTm9ybWFsaXplZCArIHByb2ZpbFRpdGxlTm9ybWFsaXplZDtcclxuICAgICAgICAgIHJldHVybiBwcm9maWxOb3JtYWxpemVkLmluY2x1ZGVzKGZpbHRlck5vcm1hbGl6ZWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucHJvZmlscyA9IFtdO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGRpc3BsYXlGbihwcm9maWw/OiBDb250ZXh0UHJvZmlscyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgICByZXR1cm4gcHJvZmlsID8gcHJvZmlsLnRpdGxlIDogdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGhhbmRsZUZvcm1TdWJtaXQodmFsdWUpIHtcclxuICAgIHRoaXMuYWRkUGVybWlzc2lvbi5lbWl0KHZhbHVlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYnVpbGRGb3JtKCk6IHZvaWQge1xyXG4gICAgdGhpcy5mb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XHJcbiAgICAgIHByb2ZpbDogW10sXHJcbiAgICAgIHR5cGVQZXJtaXNzaW9uOiBbJ3JlYWQnXVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBvblByb2ZpbFNlbGVjdGVkKHZhbHVlKSB7XHJcbiAgICB0aGlzLmZvcm0uc2V0VmFsdWUoe1xyXG4gICAgICBwcm9maWw6IHZhbHVlLm5hbWUsXHJcbiAgICAgIHR5cGVQZXJtaXNzaW9uOiB0aGlzLmZvcm0udmFsdWUudHlwZVBlcm1pc3Npb25cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=