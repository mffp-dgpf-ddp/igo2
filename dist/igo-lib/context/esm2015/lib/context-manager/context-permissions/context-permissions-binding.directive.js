/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Self, HostListener } from '@angular/core';
import { MessageService, LanguageService } from '@igo2/core';
import { ContextService } from '../shared/context.service';
import { ContextPermissionsComponent } from './context-permissions.component';
export class ContextPermissionsBindingDirective {
    /**
     * @param {?} component
     * @param {?} contextService
     * @param {?} languageService
     * @param {?} messageService
     */
    constructor(component, contextService, languageService, messageService) {
        this.contextService = contextService;
        this.languageService = languageService;
        this.messageService = messageService;
        this.component = component;
    }
    /**
     * @param {?} permission
     * @return {?}
     */
    onAddPermission(permission) {
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
            const translate = this.languageService.translate;
            /** @type {?} */
            const message = translate.instant('igo.context.permission.dialog.addMsg', {
                value: profil
            });
            /** @type {?} */
            const title = translate.instant('igo.context.permission.dialog.addTitle');
            this.messageService.success(message, title);
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
    { type: MessageService }
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1wZXJtaXNzaW9ucy1iaW5kaW5nLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tYW5hZ2VyL2NvbnRleHQtcGVybWlzc2lvbnMvY29udGV4dC1wZXJtaXNzaW9ucy1iaW5kaW5nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxJQUFJLEVBR0osWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBTzdELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUs5RSxNQUFNLE9BQU8sa0NBQWtDOzs7Ozs7O0lBb0U3QyxZQUNVLFNBQXNDLEVBQ3RDLGNBQThCLEVBQzlCLGVBQWdDLEVBQ2hDLGNBQThCO1FBRjlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBRXRDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBdEVELGVBQWUsQ0FBQyxVQUE2Qjs7Y0FDckMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDM0MsSUFBSSxDQUFDLGNBQWM7YUFDaEIsd0JBQXdCLENBQ3ZCLFNBQVMsRUFDVCxVQUFVLENBQUMsTUFBTSxFQUNqQixVQUFVLENBQUMsY0FBYyxDQUMxQjthQUNBLFNBQVM7Ozs7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNuQixLQUFLLE1BQU0sQ0FBQyxJQUFJLE9BQU8sRUFBRTtnQkFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxX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SUFDdEMsNkRBQXdDOzs7OztJQUN4Qyw0REFBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBTZWxmLFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgSG9zdExpc3RlbmVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UsIExhbmd1YWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtcclxuICBDb250ZXh0LFxyXG4gIENvbnRleHRQZXJtaXNzaW9uLFxyXG4gIERldGFpbGVkQ29udGV4dFxyXG59IGZyb20gJy4uL3NoYXJlZC9jb250ZXh0LmludGVyZmFjZSc7XHJcbmltcG9ydCB7IENvbnRleHRTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2NvbnRleHQuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbnRleHRQZXJtaXNzaW9uc0NvbXBvbmVudCB9IGZyb20gJy4vY29udGV4dC1wZXJtaXNzaW9ucy5jb21wb25lbnQnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaWdvQ29udGV4dFBlcm1pc3Npb25zQmluZGluZ10nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb250ZXh0UGVybWlzc2lvbnNCaW5kaW5nRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgY29tcG9uZW50OiBDb250ZXh0UGVybWlzc2lvbnNDb21wb25lbnQ7XHJcbiAgcHJpdmF0ZSBlZGl0ZWRDb250ZXh0JCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignYWRkUGVybWlzc2lvbicsIFsnJGV2ZW50J10pXHJcbiAgb25BZGRQZXJtaXNzaW9uKHBlcm1pc3Npb246IENvbnRleHRQZXJtaXNzaW9uKSB7XHJcbiAgICBjb25zdCBjb250ZXh0SWQgPSB0aGlzLmNvbXBvbmVudC5jb250ZXh0LmlkO1xyXG4gICAgdGhpcy5jb250ZXh0U2VydmljZVxyXG4gICAgICAuYWRkUGVybWlzc2lvbkFzc29jaWF0aW9uKFxyXG4gICAgICAgIGNvbnRleHRJZCxcclxuICAgICAgICBwZXJtaXNzaW9uLnByb2ZpbCxcclxuICAgICAgICBwZXJtaXNzaW9uLnR5cGVQZXJtaXNzaW9uXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZShwcm9maWxzID0+IHtcclxuICAgICAgICBmb3IgKGNvbnN0IHAgb2YgcHJvZmlscykge1xyXG4gICAgICAgICAgdGhpcy5jb21wb25lbnQucGVybWlzc2lvbnNbcGVybWlzc2lvbi50eXBlUGVybWlzc2lvbl0ucHVzaChwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcHJvZmlsID0gcGVybWlzc2lvbi5wcm9maWw7XHJcbiAgICAgICAgY29uc3QgdHJhbnNsYXRlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmNvbnRleHQucGVybWlzc2lvbi5kaWFsb2cuYWRkTXNnJywge1xyXG4gICAgICAgICAgdmFsdWU6IHByb2ZpbFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5jb250ZXh0LnBlcm1pc3Npb24uZGlhbG9nLmFkZFRpdGxlJyk7XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5zdWNjZXNzKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdyZW1vdmVQZXJtaXNzaW9uJywgWyckZXZlbnQnXSlcclxuICBvblJlbW92ZVBlcm1pc3Npb24ocGVybWlzc2lvbjogQ29udGV4dFBlcm1pc3Npb24pIHtcclxuICAgIGNvbnN0IGNvbnRleHRJZCA9IHRoaXMuY29tcG9uZW50LmNvbnRleHQuaWQ7XHJcbiAgICB0aGlzLmNvbnRleHRTZXJ2aWNlXHJcbiAgICAgIC5kZWxldGVQZXJtaXNzaW9uQXNzb2NpYXRpb24oY29udGV4dElkLCBwZXJtaXNzaW9uLmlkKVxyXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuY29tcG9uZW50LnBlcm1pc3Npb25zW1xyXG4gICAgICAgICAgcGVybWlzc2lvbi50eXBlUGVybWlzc2lvblxyXG4gICAgICAgIF0uZmluZEluZGV4KHAgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHAuaWQgPT09IHBlcm1pc3Npb24uaWQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQucGVybWlzc2lvbnNbcGVybWlzc2lvbi50eXBlUGVybWlzc2lvbl0uc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcbiAgICAgICAgY29uc3QgcHJvZmlsID0gcGVybWlzc2lvbi5wcm9maWw7XHJcbiAgICAgICAgY29uc3QgdHJhbnNsYXRlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmNvbnRleHQucGVybWlzc2lvbi5kaWFsb2cuZGVsZXRlTXNnJywge1xyXG4gICAgICAgICAgdmFsdWU6IHByb2ZpbFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5jb250ZXh0LnBlcm1pc3Npb24uZGlhbG9nLmRlbGV0ZVRpdGxlJyk7XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5zdWNjZXNzKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdzY29wZUNoYW5nZWQnLCBbJyRldmVudCddKVxyXG4gIG9uU2NvcGVDaGFuZ2VkKGNvbnRleHQ6IENvbnRleHQpIHtcclxuICAgIGNvbnN0IHNjb3BlID0gY29udGV4dC5zY29wZTtcclxuICAgIHRoaXMuY29udGV4dFNlcnZpY2UudXBkYXRlKGNvbnRleHQuaWQsIHsgc2NvcGUgfSkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgY29uc3QgdHJhbnNsYXRlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gICAgICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgJ2lnby5jb250ZXh0LnBlcm1pc3Npb24uZGlhbG9nLnNjb3BlQ2hhbmdlZE1zZycsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdmFsdWU6IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uY29udGV4dC5wZXJtaXNzaW9uLnNjb3BlLicgKyBzY29wZSlcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgJ2lnby5jb250ZXh0LnBlcm1pc3Npb24uZGlhbG9nLnNjb3BlQ2hhbmdlZFRpdGxlJ1xyXG4gICAgICApO1xyXG4gICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnN1Y2Nlc3MobWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBTZWxmKCkgY29tcG9uZW50OiBDb250ZXh0UGVybWlzc2lvbnNDb21wb25lbnQsXHJcbiAgICBwcml2YXRlIGNvbnRleHRTZXJ2aWNlOiBDb250ZXh0U2VydmljZSxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5jb21wb25lbnQgPSBjb21wb25lbnQ7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuZWRpdGVkQ29udGV4dCQkID0gdGhpcy5jb250ZXh0U2VydmljZS5lZGl0ZWRDb250ZXh0JC5zdWJzY3JpYmUoXHJcbiAgICAgIGNvbnRleHQgPT4gdGhpcy5oYW5kbGVFZGl0ZWRDb250ZXh0Q2hhbmdlKGNvbnRleHQpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmVkaXRlZENvbnRleHQkJC51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVFZGl0ZWRDb250ZXh0Q2hhbmdlKGNvbnRleHQ6IERldGFpbGVkQ29udGV4dCkge1xyXG4gICAgdGhpcy5jb21wb25lbnQuY29udGV4dCA9IGNvbnRleHQ7XHJcblxyXG4gICAgaWYgKGNvbnRleHQpIHtcclxuICAgICAgdGhpcy5jb250ZXh0U2VydmljZVxyXG4gICAgICAgIC5nZXRQZXJtaXNzaW9ucyhjb250ZXh0LmlkKVxyXG4gICAgICAgIC5zdWJzY3JpYmUocGVybWlzc2lvbnNBcnJheSA9PiB7XHJcbiAgICAgICAgICBwZXJtaXNzaW9uc0FycmF5ID0gcGVybWlzc2lvbnNBcnJheSB8fCBbXTtcclxuICAgICAgICAgIGNvbnN0IHBlcm1pc3Npb25zID0ge1xyXG4gICAgICAgICAgICByZWFkOiBwZXJtaXNzaW9uc0FycmF5LmZpbHRlcihwID0+IHtcclxuICAgICAgICAgICAgICByZXR1cm4gcC50eXBlUGVybWlzc2lvbi50b1N0cmluZygpID09PSAncmVhZCc7XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB3cml0ZTogcGVybWlzc2lvbnNBcnJheS5maWx0ZXIocCA9PiB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHAudHlwZVBlcm1pc3Npb24udG9TdHJpbmcoKSA9PT0gJ3dyaXRlJztcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICByZXR1cm4gKHRoaXMuY29tcG9uZW50LnBlcm1pc3Npb25zID0gcGVybWlzc2lvbnMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=