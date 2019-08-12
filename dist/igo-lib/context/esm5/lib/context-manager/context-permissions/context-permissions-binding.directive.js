/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Self, HostListener } from '@angular/core';
import { MessageService, LanguageService } from '@igo2/core';
import { ContextService } from '../shared/context.service';
import { ContextPermissionsComponent } from './context-permissions.component';
var ContextPermissionsBindingDirective = /** @class */ (function () {
    function ContextPermissionsBindingDirective(component, contextService, languageService, messageService) {
        this.contextService = contextService;
        this.languageService = languageService;
        this.messageService = messageService;
        this.component = component;
    }
    /**
     * @param {?} permission
     * @return {?}
     */
    ContextPermissionsBindingDirective.prototype.onAddPermission = /**
     * @param {?} permission
     * @return {?}
     */
    function (permission) {
        var _this = this;
        /** @type {?} */
        var contextId = this.component.context.id;
        this.contextService
            .addPermissionAssociation(contextId, permission.profil, permission.typePermission)
            .subscribe((/**
         * @param {?} profils
         * @return {?}
         */
        function (profils) {
            var e_1, _a;
            try {
                for (var profils_1 = tslib_1.__values(profils), profils_1_1 = profils_1.next(); !profils_1_1.done; profils_1_1 = profils_1.next()) {
                    var p = profils_1_1.value;
                    _this.component.permissions[permission.typePermission].push(p);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (profils_1_1 && !profils_1_1.done && (_a = profils_1.return)) _a.call(profils_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            /** @type {?} */
            var profil = permission.profil;
            /** @type {?} */
            var translate = _this.languageService.translate;
            /** @type {?} */
            var message = translate.instant('igo.context.permission.dialog.addMsg', {
                value: profil
            });
            /** @type {?} */
            var title = translate.instant('igo.context.permission.dialog.addTitle');
            _this.messageService.success(message, title);
        }));
    };
    /**
     * @param {?} permission
     * @return {?}
     */
    ContextPermissionsBindingDirective.prototype.onRemovePermission = /**
     * @param {?} permission
     * @return {?}
     */
    function (permission) {
        var _this = this;
        /** @type {?} */
        var contextId = this.component.context.id;
        this.contextService
            .deletePermissionAssociation(contextId, permission.id)
            .subscribe((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var index = _this.component.permissions[permission.typePermission].findIndex((/**
             * @param {?} p
             * @return {?}
             */
            function (p) {
                return p.id === permission.id;
            }));
            _this.component.permissions[permission.typePermission].splice(index, 1);
            /** @type {?} */
            var profil = permission.profil;
            /** @type {?} */
            var translate = _this.languageService.translate;
            /** @type {?} */
            var message = translate.instant('igo.context.permission.dialog.deleteMsg', {
                value: profil
            });
            /** @type {?} */
            var title = translate.instant('igo.context.permission.dialog.deleteTitle');
            _this.messageService.success(message, title);
        }));
    };
    /**
     * @param {?} context
     * @return {?}
     */
    ContextPermissionsBindingDirective.prototype.onScopeChanged = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        var _this = this;
        /** @type {?} */
        var scope = context.scope;
        this.contextService.update(context.id, { scope: scope }).subscribe((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var translate = _this.languageService.translate;
            /** @type {?} */
            var message = translate.instant('igo.context.permission.dialog.scopeChangedMsg', {
                value: translate.instant('igo.context.permission.scope.' + scope)
            });
            /** @type {?} */
            var title = translate.instant('igo.context.permission.dialog.scopeChangedTitle');
            _this.messageService.success(message, title);
        }));
    };
    /**
     * @return {?}
     */
    ContextPermissionsBindingDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.editedContext$$ = this.contextService.editedContext$.subscribe((/**
         * @param {?} context
         * @return {?}
         */
        function (context) { return _this.handleEditedContextChange(context); }));
    };
    /**
     * @return {?}
     */
    ContextPermissionsBindingDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.editedContext$$.unsubscribe();
    };
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    ContextPermissionsBindingDirective.prototype.handleEditedContextChange = /**
     * @private
     * @param {?} context
     * @return {?}
     */
    function (context) {
        var _this = this;
        this.component.context = context;
        if (context) {
            this.contextService
                .getPermissions(context.id)
                .subscribe((/**
             * @param {?} permissionsArray
             * @return {?}
             */
            function (permissionsArray) {
                permissionsArray = permissionsArray || [];
                /** @type {?} */
                var permissions = {
                    read: permissionsArray.filter((/**
                     * @param {?} p
                     * @return {?}
                     */
                    function (p) {
                        return p.typePermission.toString() === 'read';
                    })),
                    write: permissionsArray.filter((/**
                     * @param {?} p
                     * @return {?}
                     */
                    function (p) {
                        return p.typePermission.toString() === 'write';
                    }))
                };
                return (_this.component.permissions = permissions);
            }));
        }
    };
    ContextPermissionsBindingDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoContextPermissionsBinding]'
                },] }
    ];
    /** @nocollapse */
    ContextPermissionsBindingDirective.ctorParameters = function () { return [
        { type: ContextPermissionsComponent, decorators: [{ type: Self }] },
        { type: ContextService },
        { type: LanguageService },
        { type: MessageService }
    ]; };
    ContextPermissionsBindingDirective.propDecorators = {
        onAddPermission: [{ type: HostListener, args: ['addPermission', ['$event'],] }],
        onRemovePermission: [{ type: HostListener, args: ['removePermission', ['$event'],] }],
        onScopeChanged: [{ type: HostListener, args: ['scopeChanged', ['$event'],] }]
    };
    return ContextPermissionsBindingDirective;
}());
export { ContextPermissionsBindingDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ContextPermissionsBindingDirective.prototype.component;
    /**
     * @type {?}
     * @private
     */
    ContextPermissionsBindingDirective.prototype.editedContext$$;
    /**
     * @type {?}
     * @private
     */
    ContextPermissionsBindingDirective.prototype.contextService;
    /**
     * @type {?}
     * @private
     */
    ContextPermissionsBindingDirective.prototype.languageService;
    /**
     * @type {?}
     * @private
     */
    ContextPermissionsBindingDirective.prototype.messageService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1wZXJtaXNzaW9ucy1iaW5kaW5nLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tYW5hZ2VyL2NvbnRleHQtcGVybWlzc2lvbnMvY29udGV4dC1wZXJtaXNzaW9ucy1iaW5kaW5nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsSUFBSSxFQUdKLFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQU83RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFOUU7SUF1RUUsNENBQ1UsU0FBc0MsRUFDdEMsY0FBOEIsRUFDOUIsZUFBZ0MsRUFDaEMsY0FBOEI7UUFGOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFFdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQzs7Ozs7SUF0RUQsNERBQWU7Ozs7SUFEZixVQUNnQixVQUE2QjtRQUQ3QyxpQkFxQkM7O1lBbkJPLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzNDLElBQUksQ0FBQyxjQUFjO2FBQ2hCLHdCQUF3QixDQUN2QixTQUFTLEVBQ1QsVUFBVSxDQUFDLE1BQU0sRUFDakIsVUFBVSxDQUFDLGNBQWMsQ0FDMUI7YUFDQSxTQUFTOzs7O1FBQUMsVUFBQSxPQUFPOzs7Z0JBQ2hCLEtBQWdCLElBQUEsWUFBQSxpQkFBQSxPQUFPLENBQUEsZ0NBQUEscURBQUU7b0JBQXBCLElBQU0sQ0FBQyxvQkFBQTtvQkFDVixLQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMvRDs7Ozs7Ozs7OztnQkFDSyxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU07O2dCQUMxQixTQUFTLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTOztnQkFDMUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsc0NBQXNDLEVBQUU7Z0JBQ3hFLEtBQUssRUFBRSxNQUFNO2FBQ2QsQ0FBQzs7Z0JBQ0ksS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsd0NBQXdDLENBQUM7WUFDekUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzlDLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFHRCwrREFBa0I7Ozs7SUFEbEIsVUFDbUIsVUFBNkI7UUFEaEQsaUJBcUJDOztZQW5CTyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUMzQyxJQUFJLENBQUMsY0FBYzthQUNoQiwyQkFBMkIsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQzthQUNyRCxTQUFTOzs7UUFBQzs7Z0JBQ0gsS0FBSyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUN0QyxVQUFVLENBQUMsY0FBYyxDQUMxQixDQUFDLFNBQVM7Ozs7WUFBQyxVQUFBLENBQUM7Z0JBQ1gsT0FBTyxDQUFDLENBQUMsRUFBRSxLQUFLLFVBQVUsQ0FBQyxFQUFFLENBQUM7WUFDaEMsQ0FBQyxFQUFDO1lBQ0YsS0FBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7O2dCQUVqRSxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU07O2dCQUMxQixTQUFTLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTOztnQkFDMUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMseUNBQXlDLEVBQUU7Z0JBQzNFLEtBQUssRUFBRSxNQUFNO2FBQ2QsQ0FBQzs7Z0JBQ0ksS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsMkNBQTJDLENBQUM7WUFDNUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzlDLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFHRCwyREFBYzs7OztJQURkLFVBQ2UsT0FBZ0I7UUFEL0IsaUJBZ0JDOztZQWRPLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSztRQUMzQixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxPQUFBLEVBQUUsQ0FBQyxDQUFDLFNBQVM7OztRQUFDOztnQkFDcEQsU0FBUyxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsU0FBUzs7Z0JBQzFDLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUMvQiwrQ0FBK0MsRUFDL0M7Z0JBQ0UsS0FBSyxFQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsK0JBQStCLEdBQUcsS0FBSyxDQUFDO2FBQ2xFLENBQ0Y7O2dCQUNLLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUM3QixpREFBaUQsQ0FDbEQ7WUFDRCxLQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDOUMsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7O0lBV0QscURBQVE7OztJQUFSO1FBQUEsaUJBSUM7UUFIQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLFNBQVM7Ozs7UUFDakUsVUFBQSxPQUFPLElBQUksT0FBQSxLQUFJLENBQUMseUJBQXlCLENBQUMsT0FBTyxDQUFDLEVBQXZDLENBQXVDLEVBQ25ELENBQUM7SUFDSixDQUFDOzs7O0lBRUQsd0RBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQyxDQUFDOzs7Ozs7SUFFTyxzRUFBeUI7Ozs7O0lBQWpDLFVBQWtDLE9BQXdCO1FBQTFELGlCQW1CQztRQWxCQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFFakMsSUFBSSxPQUFPLEVBQUU7WUFDWCxJQUFJLENBQUMsY0FBYztpQkFDaEIsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7aUJBQzFCLFNBQVM7Ozs7WUFBQyxVQUFBLGdCQUFnQjtnQkFDekIsZ0JBQWdCLEdBQUcsZ0JBQWdCLElBQUksRUFBRSxDQUFDOztvQkFDcEMsV0FBVyxHQUFHO29CQUNsQixJQUFJLEVBQUUsZ0JBQWdCLENBQUMsTUFBTTs7OztvQkFBQyxVQUFBLENBQUM7d0JBQzdCLE9BQU8sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxNQUFNLENBQUM7b0JBQ2hELENBQUMsRUFBQztvQkFDRixLQUFLLEVBQUUsZ0JBQWdCLENBQUMsTUFBTTs7OztvQkFBQyxVQUFBLENBQUM7d0JBQzlCLE9BQU8sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxPQUFPLENBQUM7b0JBQ2pELENBQUMsRUFBQztpQkFDSDtnQkFDRCxPQUFPLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLENBQUM7WUFDcEQsQ0FBQyxFQUFDLENBQUM7U0FDTjtJQUNILENBQUM7O2dCQTdHRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGdDQUFnQztpQkFDM0M7Ozs7Z0JBSlEsMkJBQTJCLHVCQTBFL0IsSUFBSTtnQkEzRUEsY0FBYztnQkFQRSxlQUFlO2dCQUEvQixjQUFjOzs7a0NBaUJwQixZQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDO3FDQXVCeEMsWUFBWSxTQUFDLGtCQUFrQixFQUFFLENBQUMsUUFBUSxDQUFDO2lDQXVCM0MsWUFBWSxTQUFDLGNBQWMsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7SUF5RDFDLHlDQUFDO0NBQUEsQUE5R0QsSUE4R0M7U0EzR1ksa0NBQWtDOzs7Ozs7SUFDN0MsdURBQStDOzs7OztJQUMvQyw2REFBc0M7Ozs7O0lBb0VwQyw0REFBc0M7Ozs7O0lBQ3RDLDZEQUF3Qzs7Ozs7SUFDeEMsNERBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgU2VsZixcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIEhvc3RMaXN0ZW5lclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlLCBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7XHJcbiAgQ29udGV4dCxcclxuICBDb250ZXh0UGVybWlzc2lvbixcclxuICBEZXRhaWxlZENvbnRleHRcclxufSBmcm9tICcuLi9zaGFyZWQvY29udGV4dC5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBDb250ZXh0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9jb250ZXh0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb250ZXh0UGVybWlzc2lvbnNDb21wb25lbnQgfSBmcm9tICcuL2NvbnRleHQtcGVybWlzc2lvbnMuY29tcG9uZW50JztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2lnb0NvbnRleHRQZXJtaXNzaW9uc0JpbmRpbmddJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29udGV4dFBlcm1pc3Npb25zQmluZGluZ0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBwcml2YXRlIGNvbXBvbmVudDogQ29udGV4dFBlcm1pc3Npb25zQ29tcG9uZW50O1xyXG4gIHByaXZhdGUgZWRpdGVkQ29udGV4dCQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2FkZFBlcm1pc3Npb24nLCBbJyRldmVudCddKVxyXG4gIG9uQWRkUGVybWlzc2lvbihwZXJtaXNzaW9uOiBDb250ZXh0UGVybWlzc2lvbikge1xyXG4gICAgY29uc3QgY29udGV4dElkID0gdGhpcy5jb21wb25lbnQuY29udGV4dC5pZDtcclxuICAgIHRoaXMuY29udGV4dFNlcnZpY2VcclxuICAgICAgLmFkZFBlcm1pc3Npb25Bc3NvY2lhdGlvbihcclxuICAgICAgICBjb250ZXh0SWQsXHJcbiAgICAgICAgcGVybWlzc2lvbi5wcm9maWwsXHJcbiAgICAgICAgcGVybWlzc2lvbi50eXBlUGVybWlzc2lvblxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUocHJvZmlscyA9PiB7XHJcbiAgICAgICAgZm9yIChjb25zdCBwIG9mIHByb2ZpbHMpIHtcclxuICAgICAgICAgIHRoaXMuY29tcG9uZW50LnBlcm1pc3Npb25zW3Blcm1pc3Npb24udHlwZVBlcm1pc3Npb25dLnB1c2gocCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHByb2ZpbCA9IHBlcm1pc3Npb24ucHJvZmlsO1xyXG4gICAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgICAgICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5jb250ZXh0LnBlcm1pc3Npb24uZGlhbG9nLmFkZE1zZycsIHtcclxuICAgICAgICAgIHZhbHVlOiBwcm9maWxcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uY29udGV4dC5wZXJtaXNzaW9uLmRpYWxvZy5hZGRUaXRsZScpO1xyXG4gICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2Uuc3VjY2VzcyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcigncmVtb3ZlUGVybWlzc2lvbicsIFsnJGV2ZW50J10pXHJcbiAgb25SZW1vdmVQZXJtaXNzaW9uKHBlcm1pc3Npb246IENvbnRleHRQZXJtaXNzaW9uKSB7XHJcbiAgICBjb25zdCBjb250ZXh0SWQgPSB0aGlzLmNvbXBvbmVudC5jb250ZXh0LmlkO1xyXG4gICAgdGhpcy5jb250ZXh0U2VydmljZVxyXG4gICAgICAuZGVsZXRlUGVybWlzc2lvbkFzc29jaWF0aW9uKGNvbnRleHRJZCwgcGVybWlzc2lvbi5pZClcclxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmNvbXBvbmVudC5wZXJtaXNzaW9uc1tcclxuICAgICAgICAgIHBlcm1pc3Npb24udHlwZVBlcm1pc3Npb25cclxuICAgICAgICBdLmZpbmRJbmRleChwID0+IHtcclxuICAgICAgICAgIHJldHVybiBwLmlkID09PSBwZXJtaXNzaW9uLmlkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnBlcm1pc3Npb25zW3Blcm1pc3Npb24udHlwZVBlcm1pc3Npb25dLnNwbGljZShpbmRleCwgMSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHByb2ZpbCA9IHBlcm1pc3Npb24ucHJvZmlsO1xyXG4gICAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgICAgICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5jb250ZXh0LnBlcm1pc3Npb24uZGlhbG9nLmRlbGV0ZU1zZycsIHtcclxuICAgICAgICAgIHZhbHVlOiBwcm9maWxcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uY29udGV4dC5wZXJtaXNzaW9uLmRpYWxvZy5kZWxldGVUaXRsZScpO1xyXG4gICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2Uuc3VjY2VzcyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignc2NvcGVDaGFuZ2VkJywgWyckZXZlbnQnXSlcclxuICBvblNjb3BlQ2hhbmdlZChjb250ZXh0OiBDb250ZXh0KSB7XHJcbiAgICBjb25zdCBzY29wZSA9IGNvbnRleHQuc2NvcGU7XHJcbiAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLnVwZGF0ZShjb250ZXh0LmlkLCB7IHNjb3BlIH0pLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uY29udGV4dC5wZXJtaXNzaW9uLmRpYWxvZy5zY29wZUNoYW5nZWRNc2cnLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHZhbHVlOiB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmNvbnRleHQucGVybWlzc2lvbi5zY29wZS4nICsgc2NvcGUpXHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uY29udGV4dC5wZXJtaXNzaW9uLmRpYWxvZy5zY29wZUNoYW5nZWRUaXRsZSdcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5zdWNjZXNzKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBAU2VsZigpIGNvbXBvbmVudDogQ29udGV4dFBlcm1pc3Npb25zQ29tcG9uZW50LFxyXG4gICAgcHJpdmF0ZSBjb250ZXh0U2VydmljZTogQ29udGV4dFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMuY29tcG9uZW50ID0gY29tcG9uZW50O1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmVkaXRlZENvbnRleHQkJCA9IHRoaXMuY29udGV4dFNlcnZpY2UuZWRpdGVkQ29udGV4dCQuc3Vic2NyaWJlKFxyXG4gICAgICBjb250ZXh0ID0+IHRoaXMuaGFuZGxlRWRpdGVkQ29udGV4dENoYW5nZShjb250ZXh0KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5lZGl0ZWRDb250ZXh0JCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlRWRpdGVkQ29udGV4dENoYW5nZShjb250ZXh0OiBEZXRhaWxlZENvbnRleHQpIHtcclxuICAgIHRoaXMuY29tcG9uZW50LmNvbnRleHQgPSBjb250ZXh0O1xyXG5cclxuICAgIGlmIChjb250ZXh0KSB7XHJcbiAgICAgIHRoaXMuY29udGV4dFNlcnZpY2VcclxuICAgICAgICAuZ2V0UGVybWlzc2lvbnMoY29udGV4dC5pZClcclxuICAgICAgICAuc3Vic2NyaWJlKHBlcm1pc3Npb25zQXJyYXkgPT4ge1xyXG4gICAgICAgICAgcGVybWlzc2lvbnNBcnJheSA9IHBlcm1pc3Npb25zQXJyYXkgfHwgW107XHJcbiAgICAgICAgICBjb25zdCBwZXJtaXNzaW9ucyA9IHtcclxuICAgICAgICAgICAgcmVhZDogcGVybWlzc2lvbnNBcnJheS5maWx0ZXIocCA9PiB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHAudHlwZVBlcm1pc3Npb24udG9TdHJpbmcoKSA9PT0gJ3JlYWQnO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgd3JpdGU6IHBlcm1pc3Npb25zQXJyYXkuZmlsdGVyKHAgPT4ge1xyXG4gICAgICAgICAgICAgIHJldHVybiBwLnR5cGVQZXJtaXNzaW9uLnRvU3RyaW5nKCkgPT09ICd3cml0ZSc7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgcmV0dXJuICh0aGlzLmNvbXBvbmVudC5wZXJtaXNzaW9ucyA9IHBlcm1pc3Npb25zKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19