/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Self, HostListener } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { MessageService, LanguageService, StorageService } from '@igo2/core';
import { AuthService } from '@igo2/auth';
import { ConfirmDialogService } from '@igo2/common';
import { MapService } from '@igo2/geo';
import { ContextService } from '../shared/context.service';
import { ContextListComponent } from './context-list.component';
export class ContextListBindingDirective {
    /**
     * @param {?} component
     * @param {?} contextService
     * @param {?} mapService
     * @param {?} languageService
     * @param {?} confirmDialogService
     * @param {?} messageService
     * @param {?} auth
     * @param {?} storageService
     */
    constructor(component, contextService, mapService, languageService, confirmDialogService, messageService, auth, storageService) {
        this.contextService = contextService;
        this.mapService = mapService;
        this.languageService = languageService;
        this.confirmDialogService = confirmDialogService;
        this.messageService = messageService;
        this.auth = auth;
        this.storageService = storageService;
        this.component = component;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    onSelect(context) {
        this.contextService.loadContext(context.uri);
    }
    /**
     * @param {?} context
     * @return {?}
     */
    onEdit(context) {
        this.contextService.loadEditedContext(context.uri);
    }
    /**
     * @param {?} context
     * @return {?}
     */
    onSave(context) {
        /** @type {?} */
        const map = this.mapService.getMap();
        /** @type {?} */
        const contextFromMap = this.contextService.getContextFromMap(map);
        /** @type {?} */
        const msgSuccess = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const translate = this.languageService.translate;
            /** @type {?} */
            const message = translate.instant('igo.context.contextManager.dialog.saveMsg', {
                value: context.title
            });
            /** @type {?} */
            const title = translate.instant('igo.context.contextManager.dialog.saveTitle');
            this.messageService.success(message, title);
        });
        if (context.imported) {
            contextFromMap.title = context.title;
            this.contextService.delete(context.id, true);
            this.contextService.create(contextFromMap).subscribe((/**
             * @param {?} contextCreated
             * @return {?}
             */
            (contextCreated) => {
                this.contextService.loadContext(contextCreated.uri);
                msgSuccess();
            }));
            return;
        }
        /** @type {?} */
        const changes = {
            layers: contextFromMap.layers,
            map: {
                view: contextFromMap.map.view
            }
        };
        this.contextService.update(context.id, changes).subscribe((/**
         * @return {?}
         */
        () => {
            msgSuccess();
        }));
    }
    /**
     * @param {?} context
     * @return {?}
     */
    onFavorite(context) {
        this.contextService.setDefault(context.id).subscribe((/**
         * @return {?}
         */
        () => {
            this.contextService.defaultContextId$.next(context.id);
            /** @type {?} */
            const translate = this.languageService.translate;
            /** @type {?} */
            const message = translate.instant('igo.context.contextManager.dialog.favoriteMsg', {
                value: context.title
            });
            /** @type {?} */
            const title = translate.instant('igo.context.contextManager.dialog.favoriteTitle');
            this.messageService.success(message, title);
        }));
    }
    /**
     * @param {?} context
     * @return {?}
     */
    onManageTools(context) {
        this.contextService.loadEditedContext(context.uri);
    }
    /**
     * @param {?} context
     * @return {?}
     */
    onManagePermissions(context) {
        this.contextService.loadEditedContext(context.uri);
    }
    /**
     * @param {?} context
     * @return {?}
     */
    onDelete(context) {
        /** @type {?} */
        const translate = this.languageService.translate;
        this.confirmDialogService
            .open(translate.instant('igo.context.contextManager.dialog.confirmDelete'))
            .subscribe((/**
         * @param {?} confirm
         * @return {?}
         */
        (confirm) => {
            if (confirm) {
                this.contextService
                    .delete(context.id, context.imported)
                    .subscribe((/**
                 * @return {?}
                 */
                () => {
                    /** @type {?} */
                    const message = translate.instant('igo.context.contextManager.dialog.deleteMsg', {
                        value: context.title
                    });
                    /** @type {?} */
                    const title = translate.instant('igo.context.contextManager.dialog.deleteTitle');
                    this.messageService.info(message, title);
                }));
            }
        }));
    }
    /**
     * @param {?} context
     * @return {?}
     */
    onClone(context) {
        /** @type {?} */
        const properties = {
            title: context.title + '-copy',
            uri: context.uri + '-copy'
        };
        this.contextService.clone(context.id, properties).subscribe((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const translate = this.languageService.translate;
            /** @type {?} */
            const message = translate.instant('igo.context.contextManager.dialog.cloneMsg', {
                value: context.title
            });
            /** @type {?} */
            const title = translate.instant('igo.context.contextManager.dialog.cloneTitle');
            this.messageService.success(message, title);
        }));
    }
    /**
     * @param {?} opts
     * @return {?}
     */
    onCreate(opts) {
        const { title, empty } = opts;
        /** @type {?} */
        const context = this.contextService.getContextFromMap(this.component.map, empty);
        context.title = title;
        this.contextService.create(context).subscribe((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const translate = this.languageService.translate;
            /** @type {?} */
            const titleD = translate.instant('igo.context.bookmarkButton.dialog.createTitle');
            /** @type {?} */
            const message = translate.instant('igo.context.bookmarkButton.dialog.createMsg', {
                value: context.title
            });
            this.messageService.success(message, titleD);
            this.contextService.loadContext(context.uri);
        }));
    }
    /**
     * @return {?}
     */
    loadContexts() {
        /** @type {?} */
        const permissions = ['none'];
        for (const p of this.component.permissions) {
            if (p.checked === true || p.indeterminate === true) {
                permissions.push(p.name);
            }
        }
        this.component.showHidden
            ? this.contextService.loadContexts(permissions, true)
            : this.contextService.loadContexts(permissions, false);
    }
    /**
     * @return {?}
     */
    showHiddenContexts() {
        this.component.showHidden = !this.component.showHidden;
        this.storageService.set('contexts.showHidden', this.component.showHidden);
        this.loadContexts();
    }
    /**
     * @param {?} context
     * @return {?}
     */
    onShowContext(context) {
        this.contextService.showContext(context.id).subscribe();
    }
    /**
     * @param {?} context
     * @return {?}
     */
    onHideContext(context) {
        this.contextService.hideContext(context.id).subscribe();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Override input contexts
        this.component.contexts = { ours: [] };
        this.component.showHidden = (/** @type {?} */ (this.storageService.get('contexts.showHidden')));
        this.contexts$$ = this.contextService.contexts$.subscribe((/**
         * @param {?} contexts
         * @return {?}
         */
        (contexts) => this.handleContextsChange(contexts)));
        this.defaultContextId$$ = this.contextService.defaultContextId$.subscribe((/**
         * @param {?} id
         * @return {?}
         */
        (id) => {
            this.component.defaultContextId = id;
        }));
        // See feature-list.component for an explanation about the debounce time
        this.selectedContext$$ = this.contextService.context$
            .pipe(debounceTime(100))
            .subscribe((/**
         * @param {?} context
         * @return {?}
         */
        (context) => (this.component.selectedContext = context)));
        this.auth.authenticate$.subscribe((/**
         * @param {?} authenticate
         * @return {?}
         */
        (authenticate) => {
            if (authenticate) {
                this.contextService.getProfilByUser().subscribe((/**
                 * @param {?} profils
                 * @return {?}
                 */
                (profils) => {
                    this.component.users = profils;
                    this.component.permissions = [];
                    /** @type {?} */
                    const profilsAcc = this.component.users.reduce((/**
                     * @param {?} acc
                     * @param {?} cur
                     * @return {?}
                     */
                    (acc, cur) => {
                        acc = acc.concat(cur);
                        acc = cur.childs ? acc.concat(cur.childs) : acc;
                        return acc;
                    }), []);
                    for (const user of profilsAcc) {
                        /** @type {?} */
                        const permission = {
                            name: user.name,
                            checked: (/** @type {?} */ (this.storageService.get('contexts.permissions.' + user.name)))
                        };
                        this.component.permissions.push(permission);
                    }
                    /** @type {?} */
                    const permissions = ['none'];
                    for (const p of this.component.permissions) {
                        if (p.checked === true || p.indeterminate === true) {
                            permissions.push(p.name);
                        }
                    }
                    this.component.showHidden
                        ? this.contextService.loadContexts(permissions, true)
                        : this.contextService.loadContexts(permissions, false);
                }));
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.contexts$$.unsubscribe();
        this.selectedContext$$.unsubscribe();
        this.defaultContextId$$.unsubscribe();
    }
    /**
     * @private
     * @param {?} contexts
     * @return {?}
     */
    handleContextsChange(contexts) {
        this.component.contexts = contexts;
    }
}
ContextListBindingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoContextListBinding]'
            },] }
];
/** @nocollapse */
ContextListBindingDirective.ctorParameters = () => [
    { type: ContextListComponent, decorators: [{ type: Self }] },
    { type: ContextService },
    { type: MapService },
    { type: LanguageService },
    { type: ConfirmDialogService },
    { type: MessageService },
    { type: AuthService },
    { type: StorageService }
];
ContextListBindingDirective.propDecorators = {
    onSelect: [{ type: HostListener, args: ['select', ['$event'],] }],
    onEdit: [{ type: HostListener, args: ['edit', ['$event'],] }],
    onSave: [{ type: HostListener, args: ['save', ['$event'],] }],
    onFavorite: [{ type: HostListener, args: ['favorite', ['$event'],] }],
    onManageTools: [{ type: HostListener, args: ['manageTools', ['$event'],] }],
    onManagePermissions: [{ type: HostListener, args: ['managePermissions', ['$event'],] }],
    onDelete: [{ type: HostListener, args: ['delete', ['$event'],] }],
    onClone: [{ type: HostListener, args: ['clone', ['$event'],] }],
    onCreate: [{ type: HostListener, args: ['create', ['$event'],] }],
    loadContexts: [{ type: HostListener, args: ['filterPermissionsChanged',] }],
    showHiddenContexts: [{ type: HostListener, args: ['showHiddenContexts',] }],
    onShowContext: [{ type: HostListener, args: ['show', ['$event'],] }],
    onHideContext: [{ type: HostListener, args: ['hide', ['$event'],] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    ContextListBindingDirective.prototype.component;
    /**
     * @type {?}
     * @private
     */
    ContextListBindingDirective.prototype.contexts$$;
    /**
     * @type {?}
     * @private
     */
    ContextListBindingDirective.prototype.selectedContext$$;
    /**
     * @type {?}
     * @private
     */
    ContextListBindingDirective.prototype.defaultContextId$$;
    /**
     * @type {?}
     * @private
     */
    ContextListBindingDirective.prototype.contextService;
    /**
     * @type {?}
     * @private
     */
    ContextListBindingDirective.prototype.mapService;
    /**
     * @type {?}
     * @private
     */
    ContextListBindingDirective.prototype.languageService;
    /**
     * @type {?}
     * @private
     */
    ContextListBindingDirective.prototype.confirmDialogService;
    /**
     * @type {?}
     * @private
     */
    ContextListBindingDirective.prototype.messageService;
    /**
     * @type {?}
     * @private
     */
    ContextListBindingDirective.prototype.auth;
    /**
     * @type {?}
     * @private
     */
    ContextListBindingDirective.prototype.storageService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1saXN0LWJpbmRpbmcuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29udGV4dC8iLCJzb3VyY2VzIjpbImxpYi9jb250ZXh0LW1hbmFnZXIvY29udGV4dC1saXN0L2NvbnRleHQtbGlzdC1iaW5kaW5nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxJQUFJLEVBR0osWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDN0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN6QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQVF2QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFLaEUsTUFBTSxPQUFPLDJCQUEyQjs7Ozs7Ozs7Ozs7SUEyTHRDLFlBQ1UsU0FBK0IsRUFDL0IsY0FBOEIsRUFDOUIsVUFBc0IsRUFDdEIsZUFBZ0MsRUFDaEMsb0JBQTBDLEVBQzFDLGNBQThCLEVBQzlCLElBQWlCLEVBQ2pCLGNBQThCO1FBTjlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixTQUFJLEdBQUosSUFBSSxDQUFhO1FBQ2pCLG1CQUFjLEdBQWQsY0FB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QUM7MkJBd0JqQyxZQUFZLFNBQUMsMEJBQTBCO2lDQWF2QyxZQUFZLFNBQUMsb0JBQW9COzRCQU9qQyxZQUFZLFNBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDOzRCQUsvQixZQUFZLFNBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDOzs7Ozs7O0lBckxoQyxnREFBd0M7Ozs7O0lBQ3hDLGlEQUFpQzs7Ozs7SUFDakMsd0RBQXdDOzs7OztJQUN4Qyx5REFBeUM7Ozs7O0lBeUx2QyxxREFBc0M7Ozs7O0lBQ3RDLGlEQUE4Qjs7Ozs7SUFDOUIsc0RBQXdDOzs7OztJQUN4QywyREFBa0Q7Ozs7O0lBQ2xELHFEQUFzQzs7Ozs7SUFDdEMsMkNBQXlCOzs7OztJQUN6QixxREFBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBTZWxmLFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgSG9zdExpc3RlbmVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSwgTGFuZ3VhZ2VTZXJ2aWNlLCBTdG9yYWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJ0BpZ28yL2F1dGgnO1xyXG5pbXBvcnQgeyBDb25maXJtRGlhbG9nU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICdAaWdvMi9nZW8nO1xyXG5cclxuaW1wb3J0IHtcclxuICBDb250ZXh0LFxyXG4gIERldGFpbGVkQ29udGV4dCxcclxuICBDb250ZXh0c0xpc3QsXHJcbiAgQ29udGV4dFVzZXJQZXJtaXNzaW9uXHJcbn0gZnJvbSAnLi4vc2hhcmVkL2NvbnRleHQuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgQ29udGV4dFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvY29udGV4dC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29udGV4dExpc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbnRleHQtbGlzdC5jb21wb25lbnQnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaWdvQ29udGV4dExpc3RCaW5kaW5nXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbnRleHRMaXN0QmluZGluZ0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBwcml2YXRlIGNvbXBvbmVudDogQ29udGV4dExpc3RDb21wb25lbnQ7XHJcbiAgcHJpdmF0ZSBjb250ZXh0cyQkOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBzZWxlY3RlZENvbnRleHQkJDogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgZGVmYXVsdENvbnRleHRJZCQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ3NlbGVjdCcsIFsnJGV2ZW50J10pXHJcbiAgb25TZWxlY3QoY29udGV4dDogQ29udGV4dCkge1xyXG4gICAgdGhpcy5jb250ZXh0U2VydmljZS5sb2FkQ29udGV4dChjb250ZXh0LnVyaSk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdlZGl0JywgWyckZXZlbnQnXSlcclxuICBvbkVkaXQoY29udGV4dDogQ29udGV4dCkge1xyXG4gICAgdGhpcy5jb250ZXh0U2VydmljZS5sb2FkRWRpdGVkQ29udGV4dChjb250ZXh0LnVyaSk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdzYXZlJywgWyckZXZlbnQnXSlcclxuICBvblNhdmUoY29udGV4dDogQ29udGV4dCkge1xyXG4gICAgY29uc3QgbWFwID0gdGhpcy5tYXBTZXJ2aWNlLmdldE1hcCgpO1xyXG4gICAgY29uc3QgY29udGV4dEZyb21NYXAgPSB0aGlzLmNvbnRleHRTZXJ2aWNlLmdldENvbnRleHRGcm9tTWFwKG1hcCk7XHJcblxyXG4gICAgY29uc3QgbXNnU3VjY2VzcyA9ICgpID0+IHtcclxuICAgICAgY29uc3QgdHJhbnNsYXRlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gICAgICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgJ2lnby5jb250ZXh0LmNvbnRleHRNYW5hZ2VyLmRpYWxvZy5zYXZlTXNnJyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB2YWx1ZTogY29udGV4dC50aXRsZVxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmNvbnRleHQuY29udGV4dE1hbmFnZXIuZGlhbG9nLnNhdmVUaXRsZSdcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5zdWNjZXNzKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGNvbnRleHQuaW1wb3J0ZWQpIHtcclxuICAgICAgY29udGV4dEZyb21NYXAudGl0bGUgPSBjb250ZXh0LnRpdGxlO1xyXG4gICAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLmRlbGV0ZShjb250ZXh0LmlkLCB0cnVlKTtcclxuICAgICAgdGhpcy5jb250ZXh0U2VydmljZS5jcmVhdGUoY29udGV4dEZyb21NYXApLnN1YnNjcmliZSgoY29udGV4dENyZWF0ZWQpID0+IHtcclxuICAgICAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLmxvYWRDb250ZXh0KGNvbnRleHRDcmVhdGVkLnVyaSk7XHJcbiAgICAgICAgbXNnU3VjY2VzcygpO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNoYW5nZXM6IGFueSA9IHtcclxuICAgICAgbGF5ZXJzOiBjb250ZXh0RnJvbU1hcC5sYXllcnMsXHJcbiAgICAgIG1hcDoge1xyXG4gICAgICAgIHZpZXc6IGNvbnRleHRGcm9tTWFwLm1hcC52aWV3XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5jb250ZXh0U2VydmljZS51cGRhdGUoY29udGV4dC5pZCwgY2hhbmdlcykuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgbXNnU3VjY2VzcygpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdmYXZvcml0ZScsIFsnJGV2ZW50J10pXHJcbiAgb25GYXZvcml0ZShjb250ZXh0OiBDb250ZXh0KSB7XHJcbiAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLnNldERlZmF1bHQoY29udGV4dC5pZCkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5jb250ZXh0U2VydmljZS5kZWZhdWx0Q29udGV4dElkJC5uZXh0KGNvbnRleHQuaWQpO1xyXG4gICAgICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmNvbnRleHQuY29udGV4dE1hbmFnZXIuZGlhbG9nLmZhdm9yaXRlTXNnJyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB2YWx1ZTogY29udGV4dC50aXRsZVxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmNvbnRleHQuY29udGV4dE1hbmFnZXIuZGlhbG9nLmZhdm9yaXRlVGl0bGUnXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2Uuc3VjY2VzcyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ21hbmFnZVRvb2xzJywgWyckZXZlbnQnXSlcclxuICBvbk1hbmFnZVRvb2xzKGNvbnRleHQ6IENvbnRleHQpIHtcclxuICAgIHRoaXMuY29udGV4dFNlcnZpY2UubG9hZEVkaXRlZENvbnRleHQoY29udGV4dC51cmkpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignbWFuYWdlUGVybWlzc2lvbnMnLCBbJyRldmVudCddKVxyXG4gIG9uTWFuYWdlUGVybWlzc2lvbnMoY29udGV4dDogQ29udGV4dCkge1xyXG4gICAgdGhpcy5jb250ZXh0U2VydmljZS5sb2FkRWRpdGVkQ29udGV4dChjb250ZXh0LnVyaSk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdkZWxldGUnLCBbJyRldmVudCddKVxyXG4gIG9uRGVsZXRlKGNvbnRleHQ6IENvbnRleHQpIHtcclxuICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgIHRoaXMuY29uZmlybURpYWxvZ1NlcnZpY2VcclxuICAgICAgLm9wZW4oXHJcbiAgICAgICAgdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5jb250ZXh0LmNvbnRleHRNYW5hZ2VyLmRpYWxvZy5jb25maXJtRGVsZXRlJylcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKChjb25maXJtKSA9PiB7XHJcbiAgICAgICAgaWYgKGNvbmZpcm0pIHtcclxuICAgICAgICAgIHRoaXMuY29udGV4dFNlcnZpY2VcclxuICAgICAgICAgICAgLmRlbGV0ZShjb250ZXh0LmlkLCBjb250ZXh0LmltcG9ydGVkKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAgICAgICAnaWdvLmNvbnRleHQuY29udGV4dE1hbmFnZXIuZGlhbG9nLmRlbGV0ZU1zZycsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBjb250ZXh0LnRpdGxlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgICAgICAgJ2lnby5jb250ZXh0LmNvbnRleHRNYW5hZ2VyLmRpYWxvZy5kZWxldGVUaXRsZSdcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuaW5mbyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbG9uZScsIFsnJGV2ZW50J10pXHJcbiAgb25DbG9uZShjb250ZXh0OiBEZXRhaWxlZENvbnRleHQpIHtcclxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSB7XHJcbiAgICAgIHRpdGxlOiBjb250ZXh0LnRpdGxlICsgJy1jb3B5JyxcclxuICAgICAgdXJpOiBjb250ZXh0LnVyaSArICctY29weSdcclxuICAgIH07XHJcbiAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLmNsb25lKGNvbnRleHQuaWQsIHByb3BlcnRpZXMpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5kaWFsb2cuY2xvbmVNc2cnLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHZhbHVlOiBjb250ZXh0LnRpdGxlXHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5kaWFsb2cuY2xvbmVUaXRsZSdcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5zdWNjZXNzKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY3JlYXRlJywgWyckZXZlbnQnXSlcclxuICBvbkNyZWF0ZShvcHRzOiB7IHRpdGxlOiBzdHJpbmc7IGVtcHR5OiBib29sZWFuIH0pIHtcclxuICAgIGNvbnN0IHsgdGl0bGUsIGVtcHR5IH0gPSBvcHRzO1xyXG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMuY29udGV4dFNlcnZpY2UuZ2V0Q29udGV4dEZyb21NYXAoXHJcbiAgICAgIHRoaXMuY29tcG9uZW50Lm1hcCxcclxuICAgICAgZW1wdHlcclxuICAgICk7XHJcbiAgICBjb250ZXh0LnRpdGxlID0gdGl0bGU7XHJcbiAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLmNyZWF0ZShjb250ZXh0KS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgICAgIGNvbnN0IHRpdGxlRCA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uY29udGV4dC5ib29rbWFya0J1dHRvbi5kaWFsb2cuY3JlYXRlVGl0bGUnXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmNvbnRleHQuYm9va21hcmtCdXR0b24uZGlhbG9nLmNyZWF0ZU1zZycsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdmFsdWU6IGNvbnRleHQudGl0bGVcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2Uuc3VjY2VzcyhtZXNzYWdlLCB0aXRsZUQpO1xyXG4gICAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLmxvYWRDb250ZXh0KGNvbnRleHQudXJpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZmlsdGVyUGVybWlzc2lvbnNDaGFuZ2VkJylcclxuICBsb2FkQ29udGV4dHMoKSB7XHJcbiAgICBjb25zdCBwZXJtaXNzaW9ucyA9IFsnbm9uZSddO1xyXG4gICAgZm9yIChjb25zdCBwIG9mIHRoaXMuY29tcG9uZW50LnBlcm1pc3Npb25zKSB7XHJcbiAgICAgIGlmIChwLmNoZWNrZWQgPT09IHRydWUgfHwgcC5pbmRldGVybWluYXRlID09PSB0cnVlKSB7XHJcbiAgICAgICAgcGVybWlzc2lvbnMucHVzaChwLm5hbWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmNvbXBvbmVudC5zaG93SGlkZGVuXHJcbiAgICAgID8gdGhpcy5jb250ZXh0U2VydmljZS5sb2FkQ29udGV4dHMocGVybWlzc2lvbnMsIHRydWUpXHJcbiAgICAgIDogdGhpcy5jb250ZXh0U2VydmljZS5sb2FkQ29udGV4dHMocGVybWlzc2lvbnMsIGZhbHNlKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ3Nob3dIaWRkZW5Db250ZXh0cycpXHJcbiAgc2hvd0hpZGRlbkNvbnRleHRzKCkge1xyXG4gICAgdGhpcy5jb21wb25lbnQuc2hvd0hpZGRlbiA9ICF0aGlzLmNvbXBvbmVudC5zaG93SGlkZGVuO1xyXG4gICAgdGhpcy5zdG9yYWdlU2VydmljZS5zZXQoJ2NvbnRleHRzLnNob3dIaWRkZW4nLCB0aGlzLmNvbXBvbmVudC5zaG93SGlkZGVuKTtcclxuICAgIHRoaXMubG9hZENvbnRleHRzKCk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdzaG93JywgWyckZXZlbnQnXSlcclxuICBvblNob3dDb250ZXh0KGNvbnRleHQ6IERldGFpbGVkQ29udGV4dCkge1xyXG4gICAgdGhpcy5jb250ZXh0U2VydmljZS5zaG93Q29udGV4dChjb250ZXh0LmlkKS5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2hpZGUnLCBbJyRldmVudCddKVxyXG4gIG9uSGlkZUNvbnRleHQoY29udGV4dDogRGV0YWlsZWRDb250ZXh0KSB7XHJcbiAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLmhpZGVDb250ZXh0KGNvbnRleHQuaWQpLnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBAU2VsZigpIGNvbXBvbmVudDogQ29udGV4dExpc3RDb21wb25lbnQsXHJcbiAgICBwcml2YXRlIGNvbnRleHRTZXJ2aWNlOiBDb250ZXh0U2VydmljZSxcclxuICAgIHByaXZhdGUgbWFwU2VydmljZTogTWFwU2VydmljZSxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbmZpcm1EaWFsb2dTZXJ2aWNlOiBDb25maXJtRGlhbG9nU2VydmljZSxcclxuICAgIHByaXZhdGUgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSxcclxuICAgIHByaXZhdGUgc3RvcmFnZVNlcnZpY2U6IFN0b3JhZ2VTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgLy8gT3ZlcnJpZGUgaW5wdXQgY29udGV4dHNcclxuICAgIHRoaXMuY29tcG9uZW50LmNvbnRleHRzID0geyBvdXJzOiBbXSB9O1xyXG4gICAgdGhpcy5jb21wb25lbnQuc2hvd0hpZGRlbiA9IHRoaXMuc3RvcmFnZVNlcnZpY2UuZ2V0KFxyXG4gICAgICAnY29udGV4dHMuc2hvd0hpZGRlbidcclxuICAgICkgYXMgYm9vbGVhbjtcclxuXHJcbiAgICB0aGlzLmNvbnRleHRzJCQgPSB0aGlzLmNvbnRleHRTZXJ2aWNlLmNvbnRleHRzJC5zdWJzY3JpYmUoKGNvbnRleHRzKSA9PlxyXG4gICAgICB0aGlzLmhhbmRsZUNvbnRleHRzQ2hhbmdlKGNvbnRleHRzKVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLmRlZmF1bHRDb250ZXh0SWQkJCA9IHRoaXMuY29udGV4dFNlcnZpY2UuZGVmYXVsdENvbnRleHRJZCQuc3Vic2NyaWJlKFxyXG4gICAgICAoaWQpID0+IHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kZWZhdWx0Q29udGV4dElkID0gaWQ7XHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgLy8gU2VlIGZlYXR1cmUtbGlzdC5jb21wb25lbnQgZm9yIGFuIGV4cGxhbmF0aW9uIGFib3V0IHRoZSBkZWJvdW5jZSB0aW1lXHJcbiAgICB0aGlzLnNlbGVjdGVkQ29udGV4dCQkID0gdGhpcy5jb250ZXh0U2VydmljZS5jb250ZXh0JFxyXG4gICAgICAucGlwZShkZWJvdW5jZVRpbWUoMTAwKSlcclxuICAgICAgLnN1YnNjcmliZSgoY29udGV4dCkgPT4gKHRoaXMuY29tcG9uZW50LnNlbGVjdGVkQ29udGV4dCA9IGNvbnRleHQpKTtcclxuXHJcbiAgICB0aGlzLmF1dGguYXV0aGVudGljYXRlJC5zdWJzY3JpYmUoKGF1dGhlbnRpY2F0ZSkgPT4ge1xyXG4gICAgICBpZiAoYXV0aGVudGljYXRlKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0U2VydmljZS5nZXRQcm9maWxCeVVzZXIoKS5zdWJzY3JpYmUoKHByb2ZpbHMpID0+IHtcclxuICAgICAgICAgIHRoaXMuY29tcG9uZW50LnVzZXJzID0gcHJvZmlscztcclxuICAgICAgICAgIHRoaXMuY29tcG9uZW50LnBlcm1pc3Npb25zID0gW107XHJcbiAgICAgICAgICBjb25zdCBwcm9maWxzQWNjID0gdGhpcy5jb21wb25lbnQudXNlcnMucmVkdWNlKChhY2MsIGN1cikgPT4ge1xyXG4gICAgICAgICAgICBhY2MgPSBhY2MuY29uY2F0KGN1cik7XHJcbiAgICAgICAgICAgIGFjYyA9IGN1ci5jaGlsZHMgPyBhY2MuY29uY2F0KGN1ci5jaGlsZHMpIDogYWNjO1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICAgICAgfSwgW10pO1xyXG4gICAgICAgICAgZm9yIChjb25zdCB1c2VyIG9mIHByb2ZpbHNBY2MpIHtcclxuICAgICAgICAgICAgY29uc3QgcGVybWlzc2lvbjogQ29udGV4dFVzZXJQZXJtaXNzaW9uID0ge1xyXG4gICAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcclxuICAgICAgICAgICAgICBjaGVja2VkOiB0aGlzLnN0b3JhZ2VTZXJ2aWNlLmdldChcclxuICAgICAgICAgICAgICAgICdjb250ZXh0cy5wZXJtaXNzaW9ucy4nICsgdXNlci5uYW1lXHJcbiAgICAgICAgICAgICAgKSBhcyBib29sZWFuXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LnBlcm1pc3Npb25zLnB1c2gocGVybWlzc2lvbik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb25zdCBwZXJtaXNzaW9ucyA9IFsnbm9uZSddO1xyXG4gICAgICAgICAgZm9yIChjb25zdCBwIG9mIHRoaXMuY29tcG9uZW50LnBlcm1pc3Npb25zKSB7XHJcbiAgICAgICAgICAgIGlmIChwLmNoZWNrZWQgPT09IHRydWUgfHwgcC5pbmRldGVybWluYXRlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgcGVybWlzc2lvbnMucHVzaChwLm5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudC5zaG93SGlkZGVuXHJcbiAgICAgICAgICAgID8gdGhpcy5jb250ZXh0U2VydmljZS5sb2FkQ29udGV4dHMocGVybWlzc2lvbnMsIHRydWUpXHJcbiAgICAgICAgICAgIDogdGhpcy5jb250ZXh0U2VydmljZS5sb2FkQ29udGV4dHMocGVybWlzc2lvbnMsIGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuY29udGV4dHMkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5zZWxlY3RlZENvbnRleHQkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5kZWZhdWx0Q29udGV4dElkJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlQ29udGV4dHNDaGFuZ2UoY29udGV4dHM6IENvbnRleHRzTGlzdCkge1xyXG4gICAgdGhpcy5jb21wb25lbnQuY29udGV4dHMgPSBjb250ZXh0cztcclxuICB9XHJcbn1cclxuIl19