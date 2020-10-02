/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Self, HostListener } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { MessageService, LanguageService, StorageService } from '@igo2/core';
import { AuthService } from '@igo2/auth';
import { ConfirmDialogService } from '@igo2/common';
import { MapService } from '@igo2/geo';
import { ContextService } from '../shared/context.service';
import { ContextListComponent } from './context-list.component';
var ContextListBindingDirective = /** @class */ (function () {
    function ContextListBindingDirective(component, contextService, mapService, languageService, confirmDialogService, messageService, auth, storageService) {
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
    ContextListBindingDirective.prototype.onSelect = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        this.contextService.loadContext(context.uri);
    };
    /**
     * @param {?} context
     * @return {?}
     */
    ContextListBindingDirective.prototype.onEdit = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        this.contextService.loadEditedContext(context.uri);
    };
    /**
     * @param {?} context
     * @return {?}
     */
    ContextListBindingDirective.prototype.onSave = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        var _this = this;
        /** @type {?} */
        var map = this.mapService.getMap();
        /** @type {?} */
        var contextFromMap = this.contextService.getContextFromMap(map);
        /** @type {?} */
        var msgSuccess = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var translate = _this.languageService.translate;
            /** @type {?} */
            var message = translate.instant('igo.context.contextManager.dialog.saveMsg', {
                value: context.title
            });
            /** @type {?} */
            var title = translate.instant('igo.context.contextManager.dialog.saveTitle');
            _this.messageService.success(message, title);
        });
        if (context.imported) {
            contextFromMap.title = context.title;
            this.contextService.delete(context.id, true);
            this.contextService.create(contextFromMap).subscribe((/**
             * @param {?} contextCreated
             * @return {?}
             */
            function (contextCreated) {
                _this.contextService.loadContext(contextCreated.uri);
                msgSuccess();
            }));
            return;
        }
        /** @type {?} */
        var changes = {
            layers: contextFromMap.layers,
            map: {
                view: contextFromMap.map.view
            }
        };
        this.contextService.update(context.id, changes).subscribe((/**
         * @return {?}
         */
        function () {
            msgSuccess();
        }));
    };
    /**
     * @param {?} context
     * @return {?}
     */
    ContextListBindingDirective.prototype.onFavorite = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        var _this = this;
        this.contextService.setDefault(context.id).subscribe((/**
         * @return {?}
         */
        function () {
            _this.contextService.defaultContextId$.next(context.id);
            /** @type {?} */
            var translate = _this.languageService.translate;
            /** @type {?} */
            var message = translate.instant('igo.context.contextManager.dialog.favoriteMsg', {
                value: context.title
            });
            /** @type {?} */
            var title = translate.instant('igo.context.contextManager.dialog.favoriteTitle');
            _this.messageService.success(message, title);
        }));
    };
    /**
     * @param {?} context
     * @return {?}
     */
    ContextListBindingDirective.prototype.onManageTools = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        this.contextService.loadEditedContext(context.uri);
    };
    /**
     * @param {?} context
     * @return {?}
     */
    ContextListBindingDirective.prototype.onManagePermissions = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        this.contextService.loadEditedContext(context.uri);
    };
    /**
     * @param {?} context
     * @return {?}
     */
    ContextListBindingDirective.prototype.onDelete = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        var _this = this;
        /** @type {?} */
        var translate = this.languageService.translate;
        this.confirmDialogService
            .open(translate.instant('igo.context.contextManager.dialog.confirmDelete'))
            .subscribe((/**
         * @param {?} confirm
         * @return {?}
         */
        function (confirm) {
            if (confirm) {
                _this.contextService
                    .delete(context.id, context.imported)
                    .subscribe((/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var message = translate.instant('igo.context.contextManager.dialog.deleteMsg', {
                        value: context.title
                    });
                    /** @type {?} */
                    var title = translate.instant('igo.context.contextManager.dialog.deleteTitle');
                    _this.messageService.info(message, title);
                }));
            }
        }));
    };
    /**
     * @param {?} context
     * @return {?}
     */
    ContextListBindingDirective.prototype.onClone = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        var _this = this;
        /** @type {?} */
        var properties = {
            title: context.title + '-copy',
            uri: context.uri + '-copy'
        };
        this.contextService.clone(context.id, properties).subscribe((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var translate = _this.languageService.translate;
            /** @type {?} */
            var message = translate.instant('igo.context.contextManager.dialog.cloneMsg', {
                value: context.title
            });
            /** @type {?} */
            var title = translate.instant('igo.context.contextManager.dialog.cloneTitle');
            _this.messageService.success(message, title);
        }));
    };
    /**
     * @param {?} opts
     * @return {?}
     */
    ContextListBindingDirective.prototype.onCreate = /**
     * @param {?} opts
     * @return {?}
     */
    function (opts) {
        var _this = this;
        var title = opts.title, empty = opts.empty;
        /** @type {?} */
        var context = this.contextService.getContextFromMap(this.component.map, empty);
        context.title = title;
        this.contextService.create(context).subscribe((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var translate = _this.languageService.translate;
            /** @type {?} */
            var titleD = translate.instant('igo.context.bookmarkButton.dialog.createTitle');
            /** @type {?} */
            var message = translate.instant('igo.context.bookmarkButton.dialog.createMsg', {
                value: context.title
            });
            _this.messageService.success(message, titleD);
            _this.contextService.loadContext(context.uri);
        }));
    };
    /**
     * @return {?}
     */
    ContextListBindingDirective.prototype.loadContexts = /**
     * @return {?}
     */
    function () {
        var e_1, _a;
        /** @type {?} */
        var permissions = ['none'];
        try {
            for (var _b = tslib_1.__values(this.component.permissions), _c = _b.next(); !_c.done; _c = _b.next()) {
                var p = _c.value;
                if (p.checked === true || p.indeterminate === true) {
                    permissions.push(p.name);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.component.showHidden
            ? this.contextService.loadContexts(permissions, true)
            : this.contextService.loadContexts(permissions, false);
    };
    /**
     * @return {?}
     */
    ContextListBindingDirective.prototype.showHiddenContexts = /**
     * @return {?}
     */
    function () {
        this.component.showHidden = !this.component.showHidden;
        this.storageService.set('contexts.showHidden', this.component.showHidden);
        this.loadContexts();
    };
    /**
     * @param {?} context
     * @return {?}
     */
    ContextListBindingDirective.prototype.onShowContext = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        this.contextService.showContext(context.id).subscribe();
    };
    /**
     * @param {?} context
     * @return {?}
     */
    ContextListBindingDirective.prototype.onHideContext = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        this.contextService.hideContext(context.id).subscribe();
    };
    /**
     * @return {?}
     */
    ContextListBindingDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Override input contexts
        this.component.contexts = { ours: [] };
        this.component.showHidden = (/** @type {?} */ (this.storageService.get('contexts.showHidden')));
        this.contexts$$ = this.contextService.contexts$.subscribe((/**
         * @param {?} contexts
         * @return {?}
         */
        function (contexts) {
            return _this.handleContextsChange(contexts);
        }));
        this.defaultContextId$$ = this.contextService.defaultContextId$.subscribe((/**
         * @param {?} id
         * @return {?}
         */
        function (id) {
            _this.component.defaultContextId = id;
        }));
        // See feature-list.component for an explanation about the debounce time
        this.selectedContext$$ = this.contextService.context$
            .pipe(debounceTime(100))
            .subscribe((/**
         * @param {?} context
         * @return {?}
         */
        function (context) { return (_this.component.selectedContext = context); }));
        this.auth.authenticate$.subscribe((/**
         * @param {?} authenticate
         * @return {?}
         */
        function (authenticate) {
            if (authenticate) {
                _this.contextService.getProfilByUser().subscribe((/**
                 * @param {?} profils
                 * @return {?}
                 */
                function (profils) {
                    var e_2, _a, e_3, _b;
                    _this.component.users = profils;
                    _this.component.permissions = [];
                    /** @type {?} */
                    var profilsAcc = _this.component.users.reduce((/**
                     * @param {?} acc
                     * @param {?} cur
                     * @return {?}
                     */
                    function (acc, cur) {
                        acc = acc.concat(cur);
                        acc = cur.childs ? acc.concat(cur.childs) : acc;
                        return acc;
                    }), []);
                    try {
                        for (var profilsAcc_1 = tslib_1.__values(profilsAcc), profilsAcc_1_1 = profilsAcc_1.next(); !profilsAcc_1_1.done; profilsAcc_1_1 = profilsAcc_1.next()) {
                            var user = profilsAcc_1_1.value;
                            /** @type {?} */
                            var permission = {
                                name: user.name,
                                checked: (/** @type {?} */ (_this.storageService.get('contexts.permissions.' + user.name)))
                            };
                            _this.component.permissions.push(permission);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (profilsAcc_1_1 && !profilsAcc_1_1.done && (_a = profilsAcc_1.return)) _a.call(profilsAcc_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    /** @type {?} */
                    var permissions = ['none'];
                    try {
                        for (var _c = tslib_1.__values(_this.component.permissions), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var p = _d.value;
                            if (p.checked === true || p.indeterminate === true) {
                                permissions.push(p.name);
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    _this.component.showHidden
                        ? _this.contextService.loadContexts(permissions, true)
                        : _this.contextService.loadContexts(permissions, false);
                }));
            }
        }));
    };
    /**
     * @return {?}
     */
    ContextListBindingDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.contexts$$.unsubscribe();
        this.selectedContext$$.unsubscribe();
        this.defaultContextId$$.unsubscribe();
    };
    /**
     * @private
     * @param {?} contexts
     * @return {?}
     */
    ContextListBindingDirective.prototype.handleContextsChange = /**
     * @private
     * @param {?} contexts
     * @return {?}
     */
    function (contexts) {
        this.component.contexts = contexts;
    };
    ContextListBindingDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoContextListBinding]'
                },] }
    ];
    /** @nocollapse */
    ContextListBindingDirective.ctorParameters = function () { return [
        { type: ContextListComponent, decorators: [{ type: Self }] },
        { type: ContextService },
        { type: MapService },
        { type: LanguageService },
        { type: ConfirmDialogService },
        { type: MessageService },
        { type: AuthService },
        { type: StorageService }
    ]; };
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
    return ContextListBindingDirective;
}());
export { ContextListBindingDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1saXN0LWJpbmRpbmcuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29udGV4dC8iLCJzb3VyY2VzIjpbImxpYi9jb250ZXh0LW1hbmFnZXIvY29udGV4dC1saXN0L2NvbnRleHQtbGlzdC1iaW5kaW5nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsSUFBSSxFQUdKLFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3BELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFRdkMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRWhFO0lBOExFLHFDQUNVLFNBQStCLEVBQy9CLGNBQThCLEVBQzlCLFVBQXNCLEVBQ3RCLGVBQWdDLEVBQ2hDLG9CQUEwQyxFQUMxQyxjQUE4QixFQUM5QixJQUFpQixFQUNqQixjQUE4QjtRQU45QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUNqQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFFdEMsSUFBSSxDQUFDLFNB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USxDQUFDO2dDQWtCbkMsWUFBWSxTQUFDLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQztzQ0FLdEMsWUFBWSxTQUFDLG1CQUFtQixFQUFFLENBQUMsUUFBUSxDQUFDOzJCQUs1QyxZQUFZLFNBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDOzBCQTJCakMsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQzsyQkFxQmhDLFlBQVksU0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUM7K0JBd0JqQyxZQUFZLFNBQUMsMEJBQTBCO3FDQWF2QyxZQUFZLFNBQUMsb0JBQW9CO2dDQU9qQyxZQUFZLFNBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDO2dDQUsvQixZQUFZLFNBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDOztJQWtGbEMsa0NBQUM7Q0FBQSxBQTNRRCxJQTJRQztTQXhRWSwyQkFBMkI7Ozs7OztJQUN0QyxnREFBd0M7Ozs7O0lBQ3hDLGlEQUFpQzs7Ozs7SUFDakMsd0RBQXdDOzs7OztJQUN4Qyx5REFBeUM7Ozs7O0lBeUx2QyxxREFBc0M7Ozs7O0lBQ3RDLGlEQUE4Qjs7Ozs7SUFDOUIsc0RBQXdDOzs7OztJQUN4QywyREFBa0Q7Ozs7O0lBQ2xELHFEQUFzQzs7Ozs7SUFDdEMsMkNBQXlCOzs7OztJQUN6QixxREFBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBTZWxmLFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgSG9zdExpc3RlbmVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSwgTGFuZ3VhZ2VTZXJ2aWNlLCBTdG9yYWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJ0BpZ28yL2F1dGgnO1xyXG5pbXBvcnQgeyBDb25maXJtRGlhbG9nU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICdAaWdvMi9nZW8nO1xyXG5cclxuaW1wb3J0IHtcclxuICBDb250ZXh0LFxyXG4gIERldGFpbGVkQ29udGV4dCxcclxuICBDb250ZXh0c0xpc3QsXHJcbiAgQ29udGV4dFVzZXJQZXJtaXNzaW9uXHJcbn0gZnJvbSAnLi4vc2hhcmVkL2NvbnRleHQuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgQ29udGV4dFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvY29udGV4dC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29udGV4dExpc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbnRleHQtbGlzdC5jb21wb25lbnQnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaWdvQ29udGV4dExpc3RCaW5kaW5nXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbnRleHRMaXN0QmluZGluZ0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBwcml2YXRlIGNvbXBvbmVudDogQ29udGV4dExpc3RDb21wb25lbnQ7XHJcbiAgcHJpdmF0ZSBjb250ZXh0cyQkOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBzZWxlY3RlZENvbnRleHQkJDogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgZGVmYXVsdENvbnRleHRJZCQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ3NlbGVjdCcsIFsnJGV2ZW50J10pXHJcbiAgb25TZWxlY3QoY29udGV4dDogQ29udGV4dCkge1xyXG4gICAgdGhpcy5jb250ZXh0U2VydmljZS5sb2FkQ29udGV4dChjb250ZXh0LnVyaSk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdlZGl0JywgWyckZXZlbnQnXSlcclxuICBvbkVkaXQoY29udGV4dDogQ29udGV4dCkge1xyXG4gICAgdGhpcy5jb250ZXh0U2VydmljZS5sb2FkRWRpdGVkQ29udGV4dChjb250ZXh0LnVyaSk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdzYXZlJywgWyckZXZlbnQnXSlcclxuICBvblNhdmUoY29udGV4dDogQ29udGV4dCkge1xyXG4gICAgY29uc3QgbWFwID0gdGhpcy5tYXBTZXJ2aWNlLmdldE1hcCgpO1xyXG4gICAgY29uc3QgY29udGV4dEZyb21NYXAgPSB0aGlzLmNvbnRleHRTZXJ2aWNlLmdldENvbnRleHRGcm9tTWFwKG1hcCk7XHJcblxyXG4gICAgY29uc3QgbXNnU3VjY2VzcyA9ICgpID0+IHtcclxuICAgICAgY29uc3QgdHJhbnNsYXRlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gICAgICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgJ2lnby5jb250ZXh0LmNvbnRleHRNYW5hZ2VyLmRpYWxvZy5zYXZlTXNnJyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB2YWx1ZTogY29udGV4dC50aXRsZVxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmNvbnRleHQuY29udGV4dE1hbmFnZXIuZGlhbG9nLnNhdmVUaXRsZSdcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5zdWNjZXNzKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGNvbnRleHQuaW1wb3J0ZWQpIHtcclxuICAgICAgY29udGV4dEZyb21NYXAudGl0bGUgPSBjb250ZXh0LnRpdGxlO1xyXG4gICAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLmRlbGV0ZShjb250ZXh0LmlkLCB0cnVlKTtcclxuICAgICAgdGhpcy5jb250ZXh0U2VydmljZS5jcmVhdGUoY29udGV4dEZyb21NYXApLnN1YnNjcmliZSgoY29udGV4dENyZWF0ZWQpID0+IHtcclxuICAgICAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLmxvYWRDb250ZXh0KGNvbnRleHRDcmVhdGVkLnVyaSk7XHJcbiAgICAgICAgbXNnU3VjY2VzcygpO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNoYW5nZXM6IGFueSA9IHtcclxuICAgICAgbGF5ZXJzOiBjb250ZXh0RnJvbU1hcC5sYXllcnMsXHJcbiAgICAgIG1hcDoge1xyXG4gICAgICAgIHZpZXc6IGNvbnRleHRGcm9tTWFwLm1hcC52aWV3XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5jb250ZXh0U2VydmljZS51cGRhdGUoY29udGV4dC5pZCwgY2hhbmdlcykuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgbXNnU3VjY2VzcygpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdmYXZvcml0ZScsIFsnJGV2ZW50J10pXHJcbiAgb25GYXZvcml0ZShjb250ZXh0OiBDb250ZXh0KSB7XHJcbiAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLnNldERlZmF1bHQoY29udGV4dC5pZCkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5jb250ZXh0U2VydmljZS5kZWZhdWx0Q29udGV4dElkJC5uZXh0KGNvbnRleHQuaWQpO1xyXG4gICAgICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmNvbnRleHQuY29udGV4dE1hbmFnZXIuZGlhbG9nLmZhdm9yaXRlTXNnJyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB2YWx1ZTogY29udGV4dC50aXRsZVxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmNvbnRleHQuY29udGV4dE1hbmFnZXIuZGlhbG9nLmZhdm9yaXRlVGl0bGUnXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2Uuc3VjY2VzcyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ21hbmFnZVRvb2xzJywgWyckZXZlbnQnXSlcclxuICBvbk1hbmFnZVRvb2xzKGNvbnRleHQ6IENvbnRleHQpIHtcclxuICAgIHRoaXMuY29udGV4dFNlcnZpY2UubG9hZEVkaXRlZENvbnRleHQoY29udGV4dC51cmkpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignbWFuYWdlUGVybWlzc2lvbnMnLCBbJyRldmVudCddKVxyXG4gIG9uTWFuYWdlUGVybWlzc2lvbnMoY29udGV4dDogQ29udGV4dCkge1xyXG4gICAgdGhpcy5jb250ZXh0U2VydmljZS5sb2FkRWRpdGVkQ29udGV4dChjb250ZXh0LnVyaSk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdkZWxldGUnLCBbJyRldmVudCddKVxyXG4gIG9uRGVsZXRlKGNvbnRleHQ6IENvbnRleHQpIHtcclxuICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgIHRoaXMuY29uZmlybURpYWxvZ1NlcnZpY2VcclxuICAgICAgLm9wZW4oXHJcbiAgICAgICAgdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5jb250ZXh0LmNvbnRleHRNYW5hZ2VyLmRpYWxvZy5jb25maXJtRGVsZXRlJylcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKChjb25maXJtKSA9PiB7XHJcbiAgICAgICAgaWYgKGNvbmZpcm0pIHtcclxuICAgICAgICAgIHRoaXMuY29udGV4dFNlcnZpY2VcclxuICAgICAgICAgICAgLmRlbGV0ZShjb250ZXh0LmlkLCBjb250ZXh0LmltcG9ydGVkKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAgICAgICAnaWdvLmNvbnRleHQuY29udGV4dE1hbmFnZXIuZGlhbG9nLmRlbGV0ZU1zZycsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBjb250ZXh0LnRpdGxlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgICAgICAgJ2lnby5jb250ZXh0LmNvbnRleHRNYW5hZ2VyLmRpYWxvZy5kZWxldGVUaXRsZSdcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuaW5mbyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbG9uZScsIFsnJGV2ZW50J10pXHJcbiAgb25DbG9uZShjb250ZXh0OiBEZXRhaWxlZENvbnRleHQpIHtcclxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSB7XHJcbiAgICAgIHRpdGxlOiBjb250ZXh0LnRpdGxlICsgJy1jb3B5JyxcclxuICAgICAgdXJpOiBjb250ZXh0LnVyaSArICctY29weSdcclxuICAgIH07XHJcbiAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLmNsb25lKGNvbnRleHQuaWQsIHByb3BlcnRpZXMpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5kaWFsb2cuY2xvbmVNc2cnLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHZhbHVlOiBjb250ZXh0LnRpdGxlXHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5kaWFsb2cuY2xvbmVUaXRsZSdcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5zdWNjZXNzKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY3JlYXRlJywgWyckZXZlbnQnXSlcclxuICBvbkNyZWF0ZShvcHRzOiB7IHRpdGxlOiBzdHJpbmc7IGVtcHR5OiBib29sZWFuIH0pIHtcclxuICAgIGNvbnN0IHsgdGl0bGUsIGVtcHR5IH0gPSBvcHRzO1xyXG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMuY29udGV4dFNlcnZpY2UuZ2V0Q29udGV4dEZyb21NYXAoXHJcbiAgICAgIHRoaXMuY29tcG9uZW50Lm1hcCxcclxuICAgICAgZW1wdHlcclxuICAgICk7XHJcbiAgICBjb250ZXh0LnRpdGxlID0gdGl0bGU7XHJcbiAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLmNyZWF0ZShjb250ZXh0KS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgICAgIGNvbnN0IHRpdGxlRCA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uY29udGV4dC5ib29rbWFya0J1dHRvbi5kaWFsb2cuY3JlYXRlVGl0bGUnXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmNvbnRleHQuYm9va21hcmtCdXR0b24uZGlhbG9nLmNyZWF0ZU1zZycsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdmFsdWU6IGNvbnRleHQudGl0bGVcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2Uuc3VjY2VzcyhtZXNzYWdlLCB0aXRsZUQpO1xyXG4gICAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLmxvYWRDb250ZXh0KGNvbnRleHQudXJpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZmlsdGVyUGVybWlzc2lvbnNDaGFuZ2VkJylcclxuICBsb2FkQ29udGV4dHMoKSB7XHJcbiAgICBjb25zdCBwZXJtaXNzaW9ucyA9IFsnbm9uZSddO1xyXG4gICAgZm9yIChjb25zdCBwIG9mIHRoaXMuY29tcG9uZW50LnBlcm1pc3Npb25zKSB7XHJcbiAgICAgIGlmIChwLmNoZWNrZWQgPT09IHRydWUgfHwgcC5pbmRldGVybWluYXRlID09PSB0cnVlKSB7XHJcbiAgICAgICAgcGVybWlzc2lvbnMucHVzaChwLm5hbWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmNvbXBvbmVudC5zaG93SGlkZGVuXHJcbiAgICAgID8gdGhpcy5jb250ZXh0U2VydmljZS5sb2FkQ29udGV4dHMocGVybWlzc2lvbnMsIHRydWUpXHJcbiAgICAgIDogdGhpcy5jb250ZXh0U2VydmljZS5sb2FkQ29udGV4dHMocGVybWlzc2lvbnMsIGZhbHNlKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ3Nob3dIaWRkZW5Db250ZXh0cycpXHJcbiAgc2hvd0hpZGRlbkNvbnRleHRzKCkge1xyXG4gICAgdGhpcy5jb21wb25lbnQuc2hvd0hpZGRlbiA9ICF0aGlzLmNvbXBvbmVudC5zaG93SGlkZGVuO1xyXG4gICAgdGhpcy5zdG9yYWdlU2VydmljZS5zZXQoJ2NvbnRleHRzLnNob3dIaWRkZW4nLCB0aGlzLmNvbXBvbmVudC5zaG93SGlkZGVuKTtcclxuICAgIHRoaXMubG9hZENvbnRleHRzKCk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdzaG93JywgWyckZXZlbnQnXSlcclxuICBvblNob3dDb250ZXh0KGNvbnRleHQ6IERldGFpbGVkQ29udGV4dCkge1xyXG4gICAgdGhpcy5jb250ZXh0U2VydmljZS5zaG93Q29udGV4dChjb250ZXh0LmlkKS5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2hpZGUnLCBbJyRldmVudCddKVxyXG4gIG9uSGlkZUNvbnRleHQoY29udGV4dDogRGV0YWlsZWRDb250ZXh0KSB7XHJcbiAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLmhpZGVDb250ZXh0KGNvbnRleHQuaWQpLnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBAU2VsZigpIGNvbXBvbmVudDogQ29udGV4dExpc3RDb21wb25lbnQsXHJcbiAgICBwcml2YXRlIGNvbnRleHRTZXJ2aWNlOiBDb250ZXh0U2VydmljZSxcclxuICAgIHByaXZhdGUgbWFwU2VydmljZTogTWFwU2VydmljZSxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbmZpcm1EaWFsb2dTZXJ2aWNlOiBDb25maXJtRGlhbG9nU2VydmljZSxcclxuICAgIHByaXZhdGUgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSxcclxuICAgIHByaXZhdGUgc3RvcmFnZVNlcnZpY2U6IFN0b3JhZ2VTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgLy8gT3ZlcnJpZGUgaW5wdXQgY29udGV4dHNcclxuICAgIHRoaXMuY29tcG9uZW50LmNvbnRleHRzID0geyBvdXJzOiBbXSB9O1xyXG4gICAgdGhpcy5jb21wb25lbnQuc2hvd0hpZGRlbiA9IHRoaXMuc3RvcmFnZVNlcnZpY2UuZ2V0KFxyXG4gICAgICAnY29udGV4dHMuc2hvd0hpZGRlbidcclxuICAgICkgYXMgYm9vbGVhbjtcclxuXHJcbiAgICB0aGlzLmNvbnRleHRzJCQgPSB0aGlzLmNvbnRleHRTZXJ2aWNlLmNvbnRleHRzJC5zdWJzY3JpYmUoKGNvbnRleHRzKSA9PlxyXG4gICAgICB0aGlzLmhhbmRsZUNvbnRleHRzQ2hhbmdlKGNvbnRleHRzKVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLmRlZmF1bHRDb250ZXh0SWQkJCA9IHRoaXMuY29udGV4dFNlcnZpY2UuZGVmYXVsdENvbnRleHRJZCQuc3Vic2NyaWJlKFxyXG4gICAgICAoaWQpID0+IHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kZWZhdWx0Q29udGV4dElkID0gaWQ7XHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgLy8gU2VlIGZlYXR1cmUtbGlzdC5jb21wb25lbnQgZm9yIGFuIGV4cGxhbmF0aW9uIGFib3V0IHRoZSBkZWJvdW5jZSB0aW1lXHJcbiAgICB0aGlzLnNlbGVjdGVkQ29udGV4dCQkID0gdGhpcy5jb250ZXh0U2VydmljZS5jb250ZXh0JFxyXG4gICAgICAucGlwZShkZWJvdW5jZVRpbWUoMTAwKSlcclxuICAgICAgLnN1YnNjcmliZSgoY29udGV4dCkgPT4gKHRoaXMuY29tcG9uZW50LnNlbGVjdGVkQ29udGV4dCA9IGNvbnRleHQpKTtcclxuXHJcbiAgICB0aGlzLmF1dGguYXV0aGVudGljYXRlJC5zdWJzY3JpYmUoKGF1dGhlbnRpY2F0ZSkgPT4ge1xyXG4gICAgICBpZiAoYXV0aGVudGljYXRlKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0U2VydmljZS5nZXRQcm9maWxCeVVzZXIoKS5zdWJzY3JpYmUoKHByb2ZpbHMpID0+IHtcclxuICAgICAgICAgIHRoaXMuY29tcG9uZW50LnVzZXJzID0gcHJvZmlscztcclxuICAgICAgICAgIHRoaXMuY29tcG9uZW50LnBlcm1pc3Npb25zID0gW107XHJcbiAgICAgICAgICBjb25zdCBwcm9maWxzQWNjID0gdGhpcy5jb21wb25lbnQudXNlcnMucmVkdWNlKChhY2MsIGN1cikgPT4ge1xyXG4gICAgICAgICAgICBhY2MgPSBhY2MuY29uY2F0KGN1cik7XHJcbiAgICAgICAgICAgIGFjYyA9IGN1ci5jaGlsZHMgPyBhY2MuY29uY2F0KGN1ci5jaGlsZHMpIDogYWNjO1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICAgICAgfSwgW10pO1xyXG4gICAgICAgICAgZm9yIChjb25zdCB1c2VyIG9mIHByb2ZpbHNBY2MpIHtcclxuICAgICAgICAgICAgY29uc3QgcGVybWlzc2lvbjogQ29udGV4dFVzZXJQZXJtaXNzaW9uID0ge1xyXG4gICAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcclxuICAgICAgICAgICAgICBjaGVja2VkOiB0aGlzLnN0b3JhZ2VTZXJ2aWNlLmdldChcclxuICAgICAgICAgICAgICAgICdjb250ZXh0cy5wZXJtaXNzaW9ucy4nICsgdXNlci5uYW1lXHJcbiAgICAgICAgICAgICAgKSBhcyBib29sZWFuXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LnBlcm1pc3Npb25zLnB1c2gocGVybWlzc2lvbik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb25zdCBwZXJtaXNzaW9ucyA9IFsnbm9uZSddO1xyXG4gICAgICAgICAgZm9yIChjb25zdCBwIG9mIHRoaXMuY29tcG9uZW50LnBlcm1pc3Npb25zKSB7XHJcbiAgICAgICAgICAgIGlmIChwLmNoZWNrZWQgPT09IHRydWUgfHwgcC5pbmRldGVybWluYXRlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgcGVybWlzc2lvbnMucHVzaChwLm5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudC5zaG93SGlkZGVuXHJcbiAgICAgICAgICAgID8gdGhpcy5jb250ZXh0U2VydmljZS5sb2FkQ29udGV4dHMocGVybWlzc2lvbnMsIHRydWUpXHJcbiAgICAgICAgICAgIDogdGhpcy5jb250ZXh0U2VydmljZS5sb2FkQ29udGV4dHMocGVybWlzc2lvbnMsIGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuY29udGV4dHMkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5zZWxlY3RlZENvbnRleHQkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5kZWZhdWx0Q29udGV4dElkJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlQ29udGV4dHNDaGFuZ2UoY29udGV4dHM6IENvbnRleHRzTGlzdCkge1xyXG4gICAgdGhpcy5jb21wb25lbnQuY29udGV4dHMgPSBjb250ZXh0cztcclxuICB9XHJcbn1cclxuIl19