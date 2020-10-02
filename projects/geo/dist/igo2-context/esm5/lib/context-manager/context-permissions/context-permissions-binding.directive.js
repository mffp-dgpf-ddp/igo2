/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Self, HostListener, ChangeDetectorRef } from '@angular/core';
import { MessageService, LanguageService } from '@igo2/core';
import { ContextService } from '../shared/context.service';
import { ContextPermissionsComponent } from './context-permissions.component';
var ContextPermissionsBindingDirective = /** @class */ (function () {
    function ContextPermissionsBindingDirective(component, contextService, languageService, messageService, cd) {
        this.contextService = contextService;
        this.languageService = languageService;
        this.messageService = messageService;
        this.cd = cd;
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
        var translate = this.languageService.translate;
        if (!permission.profil) {
            /** @type {?} */
            var message = translate.instant('igo.context.contextManager.errors.addPermissionEmpty');
            /** @type {?} */
            var title = translate.instant('igo.context.contextManager.errors.addPermissionTitle');
            this.messageService.error(message, title);
            return;
        }
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
            var message = translate.instant('igo.context.permission.dialog.addMsg', {
                value: profil
            });
            /** @type {?} */
            var title = translate.instant('igo.context.permission.dialog.addTitle');
            _this.messageService.success(message, title);
            _this.cd.detectChanges();
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
            _this.cd.detectChanges();
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
        this.contextService.editedContext$.next(undefined);
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
        { type: MessageService },
        { type: ChangeDetectorRef }
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
    /**
     * @type {?}
     * @private
     */
    ContextPermissionsBindingDirective.prototype.cd;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1wZXJtaXNzaW9ucy1iaW5kaW5nLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tYW5hZ2VyL2NvbnRleHQtcGVybWlzc2lvbnMvY29udGV4dC1wZXJtaXNzaW9ucy1iaW5kaW5nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsSUFBSSxFQUdKLFlBQVksRUFDWixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFPN0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRTlFO0lBNkZFLDRDQUNVLFNBQXNDLEVBQ3RDLGNBQThCLEVBQzlCLGVBQWdDLEVBQ2hDLGNBQThCLEVBQzlCLEVBQXFCO1FBSHJCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBRTdCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBN0ZELDREQUFlOzs7O0lBRGYsVUFDZ0IsVUFBNkI7UUFEN0MsaUJBcUNDOztZQW5DTyxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTO1FBQ2hELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFOztnQkFDaEIsT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQy9CLHNEQUFzRCxDQUN2RDs7Z0JBQ0ssS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQzdCLHNEQUFzRCxDQUN2RDtZQUNELElB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b0JBQ0YsS0FBSyxFQUFFLGdCQUFnQixDQUFDLE1BQU07Ozs7b0JBQUMsVUFBQSxDQUFDO3dCQUM5QixPQUFPLENBQUMsQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLEtBQUssT0FBTyxDQUFDO29CQUNqRCxDQUFDLEVBQUM7aUJBQ0g7Z0JBQ0QsT0FBTyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxDQUFDO1lBQ3BELENBQUMsRUFBQyxDQUFDO1NBQ047SUFDSCxDQUFDOztnQkFySUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQ0FBZ0M7aUJBQzNDOzs7O2dCQUpRLDJCQUEyQix1QkFnRy9CLElBQUk7Z0JBakdBLGNBQWM7Z0JBUEUsZUFBZTtnQkFBL0IsY0FBYztnQkFKckIsaUJBQWlCOzs7a0NBcUJoQixZQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDO3FDQXVDeEMsWUFBWSxTQUFDLGtCQUFrQixFQUFFLENBQUMsUUFBUSxDQUFDO2lDQTZCM0MsWUFBWSxTQUFDLGNBQWMsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7SUEyRDFDLHlDQUFDO0NBQUEsQUF0SUQsSUFzSUM7U0FuSVksa0NBQWtDOzs7Ozs7SUFDN0MsdURBQStDOzs7OztJQUMvQyw2REFBc0M7Ozs7O0lBMEZwQyw0REFBc0M7Ozs7O0lBQ3RDLDZEQUF3Qzs7Ozs7SUFDeEMsNERBQXNDOzs7OztJQUN0QyxnREFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBTZWxmLFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIENoYW5nZURldGVjdG9yUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UsIExhbmd1YWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtcclxuICBDb250ZXh0LFxyXG4gIENvbnRleHRQZXJtaXNzaW9uLFxyXG4gIERldGFpbGVkQ29udGV4dFxyXG59IGZyb20gJy4uL3NoYXJlZC9jb250ZXh0LmludGVyZmFjZSc7XHJcbmltcG9ydCB7IENvbnRleHRTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2NvbnRleHQuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbnRleHRQZXJtaXNzaW9uc0NvbXBvbmVudCB9IGZyb20gJy4vY29udGV4dC1wZXJtaXNzaW9ucy5jb21wb25lbnQnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaWdvQ29udGV4dFBlcm1pc3Npb25zQmluZGluZ10nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb250ZXh0UGVybWlzc2lvbnNCaW5kaW5nRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgY29tcG9uZW50OiBDb250ZXh0UGVybWlzc2lvbnNDb21wb25lbnQ7XHJcbiAgcHJpdmF0ZSBlZGl0ZWRDb250ZXh0JCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignYWRkUGVybWlzc2lvbicsIFsnJGV2ZW50J10pXHJcbiAgb25BZGRQZXJtaXNzaW9uKHBlcm1pc3Npb246IENvbnRleHRQZXJtaXNzaW9uKSB7XHJcbiAgICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgICBpZiAoIXBlcm1pc3Npb24ucHJvZmlsKSB7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmNvbnRleHQuY29udGV4dE1hbmFnZXIuZXJyb3JzLmFkZFBlcm1pc3Npb25FbXB0eSdcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmNvbnRleHQuY29udGV4dE1hbmFnZXIuZXJyb3JzLmFkZFBlcm1pc3Npb25UaXRsZSdcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5lcnJvcihtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IGNvbnRleHRJZCA9IHRoaXMuY29tcG9uZW50LmNvbnRleHQuaWQ7XHJcbiAgICB0aGlzLmNvbnRleHRTZXJ2aWNlXHJcbiAgICAgIC5hZGRQZXJtaXNzaW9uQXNzb2NpYXRpb24oXHJcbiAgICAgICAgY29udGV4dElkLFxyXG4gICAgICAgIHBlcm1pc3Npb24ucHJvZmlsLFxyXG4gICAgICAgIHBlcm1pc3Npb24udHlwZVBlcm1pc3Npb25cclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKHByb2ZpbHMgPT4ge1xyXG4gICAgICAgIGZvciAoY29uc3QgcCBvZiBwcm9maWxzKSB7XHJcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudC5wZXJtaXNzaW9uc1twZXJtaXNzaW9uLnR5cGVQZXJtaXNzaW9uXS5wdXNoKHApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwcm9maWwgPSBwZXJtaXNzaW9uLnByb2ZpbDtcclxuICAgICAgICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAnaWdvLmNvbnRleHQucGVybWlzc2lvbi5kaWFsb2cuYWRkTXNnJyxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWU6IHByb2ZpbFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICdpZ28uY29udGV4dC5wZXJtaXNzaW9uLmRpYWxvZy5hZGRUaXRsZSdcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2Uuc3VjY2VzcyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcigncmVtb3ZlUGVybWlzc2lvbicsIFsnJGV2ZW50J10pXHJcbiAgb25SZW1vdmVQZXJtaXNzaW9uKHBlcm1pc3Npb246IENvbnRleHRQZXJtaXNzaW9uKSB7XHJcbiAgICBjb25zdCBjb250ZXh0SWQgPSB0aGlzLmNvbXBvbmVudC5jb250ZXh0LmlkO1xyXG4gICAgdGhpcy5jb250ZXh0U2VydmljZVxyXG4gICAgICAuZGVsZXRlUGVybWlzc2lvbkFzc29jaWF0aW9uKGNvbnRleHRJZCwgcGVybWlzc2lvbi5pZClcclxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmNvbXBvbmVudC5wZXJtaXNzaW9uc1tcclxuICAgICAgICAgIHBlcm1pc3Npb24udHlwZVBlcm1pc3Npb25cclxuICAgICAgICBdLmZpbmRJbmRleChwID0+IHtcclxuICAgICAgICAgIHJldHVybiBwLmlkID09PSBwZXJtaXNzaW9uLmlkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnBlcm1pc3Npb25zW3Blcm1pc3Npb24udHlwZVBlcm1pc3Npb25dLnNwbGljZShpbmRleCwgMSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHByb2ZpbCA9IHBlcm1pc3Npb24ucHJvZmlsO1xyXG4gICAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgICAgICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAnaWdvLmNvbnRleHQucGVybWlzc2lvbi5kaWFsb2cuZGVsZXRlTXNnJyxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWU6IHByb2ZpbFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICdpZ28uY29udGV4dC5wZXJtaXNzaW9uLmRpYWxvZy5kZWxldGVUaXRsZSdcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2Uuc3VjY2VzcyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignc2NvcGVDaGFuZ2VkJywgWyckZXZlbnQnXSlcclxuICBvblNjb3BlQ2hhbmdlZChjb250ZXh0OiBDb250ZXh0KSB7XHJcbiAgICBjb25zdCBzY29wZSA9IGNvbnRleHQuc2NvcGU7XHJcbiAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLnVwZGF0ZShjb250ZXh0LmlkLCB7IHNjb3BlIH0pLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uY29udGV4dC5wZXJtaXNzaW9uLmRpYWxvZy5zY29wZUNoYW5nZWRNc2cnLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHZhbHVlOiB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmNvbnRleHQucGVybWlzc2lvbi5zY29wZS4nICsgc2NvcGUpXHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uY29udGV4dC5wZXJtaXNzaW9uLmRpYWxvZy5zY29wZUNoYW5nZWRUaXRsZSdcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5zdWNjZXNzKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBAU2VsZigpIGNvbXBvbmVudDogQ29udGV4dFBlcm1pc3Npb25zQ29tcG9uZW50LFxyXG4gICAgcHJpdmF0ZSBjb250ZXh0U2VydmljZTogQ29udGV4dFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZlxyXG4gICkge1xyXG4gICAgdGhpcy5jb21wb25lbnQgPSBjb21wb25lbnQ7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuZWRpdGVkQ29udGV4dCQkID0gdGhpcy5jb250ZXh0U2VydmljZS5lZGl0ZWRDb250ZXh0JC5zdWJzY3JpYmUoXHJcbiAgICAgIGNvbnRleHQgPT4gdGhpcy5oYW5kbGVFZGl0ZWRDb250ZXh0Q2hhbmdlKGNvbnRleHQpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmVkaXRlZENvbnRleHQkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5jb250ZXh0U2VydmljZS5lZGl0ZWRDb250ZXh0JC5uZXh0KHVuZGVmaW5lZCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUVkaXRlZENvbnRleHRDaGFuZ2UoY29udGV4dDogRGV0YWlsZWRDb250ZXh0KSB7XHJcbiAgICB0aGlzLmNvbXBvbmVudC5jb250ZXh0ID0gY29udGV4dDtcclxuXHJcbiAgICBpZiAoY29udGV4dCkge1xyXG4gICAgICB0aGlzLmNvbnRleHRTZXJ2aWNlXHJcbiAgICAgICAgLmdldFBlcm1pc3Npb25zKGNvbnRleHQuaWQpXHJcbiAgICAgICAgLnN1YnNjcmliZShwZXJtaXNzaW9uc0FycmF5ID0+IHtcclxuICAgICAgICAgIHBlcm1pc3Npb25zQXJyYXkgPSBwZXJtaXNzaW9uc0FycmF5IHx8IFtdO1xyXG4gICAgICAgICAgY29uc3QgcGVybWlzc2lvbnMgPSB7XHJcbiAgICAgICAgICAgIHJlYWQ6IHBlcm1pc3Npb25zQXJyYXkuZmlsdGVyKHAgPT4ge1xyXG4gICAgICAgICAgICAgIHJldHVybiBwLnR5cGVQZXJtaXNzaW9uLnRvU3RyaW5nKCkgPT09ICdyZWFkJztcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIHdyaXRlOiBwZXJtaXNzaW9uc0FycmF5LmZpbHRlcihwID0+IHtcclxuICAgICAgICAgICAgICByZXR1cm4gcC50eXBlUGVybWlzc2lvbi50b1N0cmluZygpID09PSAnd3JpdGUnO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHJldHVybiAodGhpcy5jb21wb25lbnQucGVybWlzc2lvbnMgPSBwZXJtaXNzaW9ucyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==