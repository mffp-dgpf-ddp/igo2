/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Self, HostListener, ChangeDetectorRef } from '@angular/core';
import { MessageService, LanguageService } from '@igo2/core';
import { ContextService } from '../shared/context.service';
import { ContextPermissionsComponent } from './context-permissions.component';
export class ContextPermissionsBindingDirective {
    /**
     * @param {?} component
     * @param {?} contextService
     * @param {?} languageService
     * @param {?} messageService
     * @param {?} cd
     */
    constructor(component, contextService, languageService, messageService, cd) {
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
    onAddPermission(permission) {
        /** @type {?} */
        const translate = this.languageService.translate;
        if (!permission.profil) {
            /** @type {?} */
            const message = translate.instant('igo.context.contextManager.errors.addPermissionEmpty');
            /** @type {?} */
            const title = translate.instant('igo.context.contextManager.errors.addPermissionTitle');
            this.messageService.error(message, title);
            return;
        }
        /** @type {?} */
        const contextId = this.component.context.id;
        this.contextService
            .addPermissionAssociation(contextId, permission.profil, permission.typePermission)
            .subscribe((/**
         * @param {?} profils
         * @return {?}
         */
        profils => {
            for (const p of profils) {
                this.component.permissions[permission.typePermission].push(p);
            }
            /** @type {?} */
            const profil = permission.profil;
            /** @type {?} */
            const message = translate.instant('igo.context.permission.dialog.addMsg', {
                value: profil
            });
            /** @type {?} */
            const title = translate.instant('igo.context.permission.dialog.addTitle');
            this.messageService.success(message, title);
            this.cd.detectChanges();
        }));
    }
    /**
     * @param {?} permission
     * @return {?}
     */
    onRemovePermission(permission) {
        /** @type {?} */
        const contextId = this.component.context.id;
        this.contextService
            .deletePermissionAssociation(contextId, permission.id)
            .subscribe((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const index = this.component.permissions[permission.typePermission].findIndex((/**
             * @param {?} p
             * @return {?}
             */
            p => {
                return p.id === permission.id;
            }));
            this.component.permissions[permission.typePermission].splice(index, 1);
            /** @type {?} */
            const profil = permission.profil;
            /** @type {?} */
            const translate = this.languageService.translate;
            /** @type {?} */
            const message = translate.instant('igo.context.permission.dialog.deleteMsg', {
                value: profil
            });
            /** @type {?} */
            const title = translate.instant('igo.context.permission.dialog.deleteTitle');
            this.messageService.success(message, title);
            this.cd.detectChanges();
        }));
    }
    /**
     * @param {?} context
     * @return {?}
     */
    onScopeChanged(context) {
        /** @type {?} */
        const scope = context.scope;
        this.contextService.update(context.id, { scope }).subscribe((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const translate = this.languageService.translate;
            /** @type {?} */
            const message = translate.instant('igo.context.permission.dialog.scopeChangedMsg', {
                value: translate.instant('igo.context.permission.scope.' + scope)
            });
            /** @type {?} */
            const title = translate.instant('igo.context.permission.dialog.scopeChangedTitle');
            this.messageService.success(message, title);
        }));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.editedContext$$ = this.contextService.editedContext$.subscribe((/**
         * @param {?} context
         * @return {?}
         */
        context => this.handleEditedContextChange(context)));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.editedContext$$.unsubscribe();
        this.contextService.editedContext$.next(undefined);
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    handleEditedContextChange(context) {
        this.component.context = context;
        if (context) {
            this.contextService
                .getPermissions(context.id)
                .subscribe((/**
             * @param {?} permissionsArray
             * @return {?}
             */
            permissionsArray => {
                permissionsArray = permissionsArray || [];
                /** @type {?} */
                const permissions = {
                    read: permissionsArray.filter((/**
                     * @param {?} p
                     * @return {?}
                     */
                    p => {
                        return p.typePermission.toString() === 'read';
                    })),
                    write: permissionsArray.filter((/**
                     * @param {?} p
                     * @return {?}
                     */
                    p => {
                        return p.typePermission.toString() === 'write';
                    }))
                };
                return (this.component.permissions = permissions);
            }));
        }
    }
}
ContextPermissionsBindingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoContextPermissionsBinding]'
            },] }
];
/** @nocollapse */
ContextPermissionsBindingDirective.ctorParameters = () => [
    { type: ContextPermissionsComponent, decorators: [{ type: Self }] },
    { type: ContextService },
    { type: LanguageService },
    { type: MessageService },
    { type: ChangeDetectorRef }
];
ContextPermissionsBindingDirective.propDecorators = {
    onAddPermission: [{ type: HostListener, args: ['addPermission', ['$event'],] }],
    onRemovePermission: [{ type: HostListener, args: ['removePermission', ['$event'],] }],
    onScopeChanged: [{ type: HostListener, args: ['scopeChanged', ['$event'],] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1wZXJtaXNzaW9ucy1iaW5kaW5nLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tYW5hZ2VyL2NvbnRleHQtcGVybWlzc2lvbnMvY29udGV4dC1wZXJtaXNzaW9ucy1iaW5kaW5nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxJQUFJLEVBR0osWUFBWSxFQUNaLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQU83RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFLOUUsTUFBTSxPQUFPLGtDQUFrQzs7Ozs7Ozs7SUEwRjdDLFlBQ1UsU0FBc0MsRUFDdEMsY0FBOEIsRUFDOUIsZUFBZ0MsRUFDaEMsY0FBOEIsRUFDOUIsRUFBcUI7UUFIckIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFFN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQzs7Ozs7SUE3RkQsZUFBZSxDQUFDLFVBQTZCOztjQUNyQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTO1FBQ2hELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFOztrQkFDaEIsT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQy9CLHNEQUFzRCxDQUN2RDs7a0JBQ0ssS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQzdCLHNEQUFzRCxDQUN2RDtZQUNELElB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LENBQUMsRUFBQztpQkFDSDtnQkFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLENBQUM7WUFDcEQsQ0FBQyxFQUFDLENBQUM7U0FDTjtJQUNILENBQUM7OztZQXJJRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdDQUFnQzthQUMzQzs7OztZQUpRLDJCQUEyQix1QkFnRy9CLElBQUk7WUFqR0EsY0FBYztZQVBFLGVBQWU7WUFBL0IsY0FBYztZQUpyQixpQkFBaUI7Ozs4QkFxQmhCLFlBQVksU0FBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUM7aUNBdUN4QyxZQUFZLFNBQUMsa0JBQWtCLEVBQUUsQ0FBQyxRQUFRLENBQUM7NkJBNkIzQyxZQUFZLFNBQUMsY0FBYyxFQUFFLENBQUMsUUFBUSxDQUFDOzs7Ozs7O0lBdkV4Qyx1REFBK0M7Ozs7O0lBQy9DLDZEQUFzQzs7Ozs7SUEwRnBDLDREQUFzQzs7Ozs7SUFDdEMsNkRBQXdDOzs7OztJQUN4Qyw0REFBc0M7Ozs7O0lBQ3RDLGdEQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIFNlbGYsXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSwgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5pbXBvcnQge1xyXG4gIENvbnRleHQsXHJcbiAgQ29udGV4dFBlcm1pc3Npb24sXHJcbiAgRGV0YWlsZWRDb250ZXh0XHJcbn0gZnJvbSAnLi4vc2hhcmVkL2NvbnRleHQuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgQ29udGV4dFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvY29udGV4dC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29udGV4dFBlcm1pc3Npb25zQ29tcG9uZW50IH0gZnJvbSAnLi9jb250ZXh0LXBlcm1pc3Npb25zLmNvbXBvbmVudCc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tpZ29Db250ZXh0UGVybWlzc2lvbnNCaW5kaW5nXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbnRleHRQZXJtaXNzaW9uc0JpbmRpbmdEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSBjb21wb25lbnQ6IENvbnRleHRQZXJtaXNzaW9uc0NvbXBvbmVudDtcclxuICBwcml2YXRlIGVkaXRlZENvbnRleHQkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBASG9zdExpc3RlbmVyKCdhZGRQZXJtaXNzaW9uJywgWyckZXZlbnQnXSlcclxuICBvbkFkZFBlcm1pc3Npb24ocGVybWlzc2lvbjogQ29udGV4dFBlcm1pc3Npb24pIHtcclxuICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgIGlmICghcGVybWlzc2lvbi5wcm9maWwpIHtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5lcnJvcnMuYWRkUGVybWlzc2lvbkVtcHR5J1xyXG4gICAgICApO1xyXG4gICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5lcnJvcnMuYWRkUGVybWlzc2lvblRpdGxlJ1xyXG4gICAgICApO1xyXG4gICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmVycm9yKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgY29udGV4dElkID0gdGhpcy5jb21wb25lbnQuY29udGV4dC5pZDtcclxuICAgIHRoaXMuY29udGV4dFNlcnZpY2VcclxuICAgICAgLmFkZFBlcm1pc3Npb25Bc3NvY2lhdGlvbihcclxuICAgICAgICBjb250ZXh0SWQsXHJcbiAgICAgICAgcGVybWlzc2lvbi5wcm9maWwsXHJcbiAgICAgICAgcGVybWlzc2lvbi50eXBlUGVybWlzc2lvblxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUocHJvZmlscyA9PiB7XHJcbiAgICAgICAgZm9yIChjb25zdCBwIG9mIHByb2ZpbHMpIHtcclxuICAgICAgICAgIHRoaXMuY29tcG9uZW50LnBlcm1pc3Npb25zW3Blcm1pc3Npb24udHlwZVBlcm1pc3Npb25dLnB1c2gocCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHByb2ZpbCA9IHBlcm1pc3Npb24ucHJvZmlsO1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICdpZ28uY29udGV4dC5wZXJtaXNzaW9uLmRpYWxvZy5hZGRNc2cnLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTogcHJvZmlsXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgJ2lnby5jb250ZXh0LnBlcm1pc3Npb24uZGlhbG9nLmFkZFRpdGxlJ1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5zdWNjZXNzKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdyZW1vdmVQZXJtaXNzaW9uJywgWyckZXZlbnQnXSlcclxuICBvblJlbW92ZVBlcm1pc3Npb24ocGVybWlzc2lvbjogQ29udGV4dFBlcm1pc3Npb24pIHtcclxuICAgIGNvbnN0IGNvbnRleHRJZCA9IHRoaXMuY29tcG9uZW50LmNvbnRleHQuaWQ7XHJcbiAgICB0aGlzLmNvbnRleHRTZXJ2aWNlXHJcbiAgICAgIC5kZWxldGVQZXJtaXNzaW9uQXNzb2NpYXRpb24oY29udGV4dElkLCBwZXJtaXNzaW9uLmlkKVxyXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuY29tcG9uZW50LnBlcm1pc3Npb25zW1xyXG4gICAgICAgICAgcGVybWlzc2lvbi50eXBlUGVybWlzc2lvblxyXG4gICAgICAgIF0uZmluZEluZGV4KHAgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHAuaWQgPT09IHBlcm1pc3Npb24uaWQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQucGVybWlzc2lvbnNbcGVybWlzc2lvbi50eXBlUGVybWlzc2lvbl0uc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcbiAgICAgICAgY29uc3QgcHJvZmlsID0gcGVybWlzc2lvbi5wcm9maWw7XHJcbiAgICAgICAgY29uc3QgdHJhbnNsYXRlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICdpZ28uY29udGV4dC5wZXJtaXNzaW9uLmRpYWxvZy5kZWxldGVNc2cnLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTogcHJvZmlsXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgJ2lnby5jb250ZXh0LnBlcm1pc3Npb24uZGlhbG9nLmRlbGV0ZVRpdGxlJ1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5zdWNjZXNzKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdzY29wZUNoYW5nZWQnLCBbJyRldmVudCddKVxyXG4gIG9uU2NvcGVDaGFuZ2VkKGNvbnRleHQ6IENvbnRleHQpIHtcclxuICAgIGNvbnN0IHNjb3BlID0gY29udGV4dC5zY29wZTtcclxuICAgIHRoaXMuY29udGV4dFNlcnZpY2UudXBkYXRlKGNvbnRleHQuaWQsIHsgc2NvcGUgfSkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgY29uc3QgdHJhbnNsYXRlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gICAgICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgJ2lnby5jb250ZXh0LnBlcm1pc3Npb24uZGlhbG9nLnNjb3BlQ2hhbmdlZE1zZycsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdmFsdWU6IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uY29udGV4dC5wZXJtaXNzaW9uLnNjb3BlLicgKyBzY29wZSlcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgJ2lnby5jb250ZXh0LnBlcm1pc3Npb24uZGlhbG9nLnNjb3BlQ2hhbmdlZFRpdGxlJ1xyXG4gICAgICApO1xyXG4gICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnN1Y2Nlc3MobWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBTZWxmKCkgY29tcG9uZW50OiBDb250ZXh0UGVybWlzc2lvbnNDb21wb25lbnQsXHJcbiAgICBwcml2YXRlIGNvbnRleHRTZXJ2aWNlOiBDb250ZXh0U2VydmljZSxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgKSB7XHJcbiAgICB0aGlzLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5lZGl0ZWRDb250ZXh0JCQgPSB0aGlzLmNvbnRleHRTZXJ2aWNlLmVkaXRlZENvbnRleHQkLnN1YnNjcmliZShcclxuICAgICAgY29udGV4dCA9PiB0aGlzLmhhbmRsZUVkaXRlZENvbnRleHRDaGFuZ2UoY29udGV4dClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuZWRpdGVkQ29udGV4dCQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLmVkaXRlZENvbnRleHQkLm5leHQodW5kZWZpbmVkKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlRWRpdGVkQ29udGV4dENoYW5nZShjb250ZXh0OiBEZXRhaWxlZENvbnRleHQpIHtcclxuICAgIHRoaXMuY29tcG9uZW50LmNvbnRleHQgPSBjb250ZXh0O1xyXG5cclxuICAgIGlmIChjb250ZXh0KSB7XHJcbiAgICAgIHRoaXMuY29udGV4dFNlcnZpY2VcclxuICAgICAgICAuZ2V0UGVybWlzc2lvbnMoY29udGV4dC5pZClcclxuICAgICAgICAuc3Vic2NyaWJlKHBlcm1pc3Npb25zQXJyYXkgPT4ge1xyXG4gICAgICAgICAgcGVybWlzc2lvbnNBcnJheSA9IHBlcm1pc3Npb25zQXJyYXkgfHwgW107XHJcbiAgICAgICAgICBjb25zdCBwZXJtaXNzaW9ucyA9IHtcclxuICAgICAgICAgICAgcmVhZDogcGVybWlzc2lvbnNBcnJheS5maWx0ZXIocCA9PiB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHAudHlwZVBlcm1pc3Npb24udG9TdHJpbmcoKSA9PT0gJ3JlYWQnO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgd3JpdGU6IHBlcm1pc3Npb25zQXJyYXkuZmlsdGVyKHAgPT4ge1xyXG4gICAgICAgICAgICAgIHJldHVybiBwLnR5cGVQZXJtaXNzaW9uLnRvU3RyaW5nKCkgPT09ICd3cml0ZSc7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgcmV0dXJuICh0aGlzLmNvbXBvbmVudC5wZXJtaXNzaW9ucyA9IHBlcm1pc3Npb25zKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19