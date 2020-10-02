/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '@igo2/auth';
import { LanguageService, StorageService } from '@igo2/core';
import { IgoMap } from '@igo2/geo';
import { ContextListControlsEnum } from './context-list.enum';
import { BehaviorSubject, ReplaySubject, EMPTY, timer } from 'rxjs';
import { MatDialog } from '@angular/material';
import { BookmarkDialogComponent } from '../../context-map-button/bookmark-button/bookmark-dialog.component';
import { debounce } from 'rxjs/operators';
import { ActionStore, ActionbarMode } from '@igo2/common';
import { ContextService } from '../shared/context.service';
export class ContextListComponent {
    /**
     * @param {?} cdRef
     * @param {?} contextService
     * @param {?} auth
     * @param {?} dialog
     * @param {?} languageService
     * @param {?} storageService
     */
    constructor(cdRef, contextService, auth, dialog, languageService, storageService) {
        this.cdRef = cdRef;
        this.contextService = contextService;
        this.auth = auth;
        this.dialog = dialog;
        this.languageService = languageService;
        this.storageService = storageService;
        this.contextsInitial = { ours: [] };
        this.contexts$ = new BehaviorSubject(this.contextsInitial);
        this.change$ = new ReplaySubject(1);
        this._contexts = { ours: [] };
        this.collapsed = [];
        this.select = new EventEmitter();
        this.unselect = new EventEmitter();
        this.edit = new EventEmitter();
        this.delete = new EventEmitter();
        this.save = new EventEmitter();
        this.clone = new EventEmitter();
        this.create = new EventEmitter();
        this.hide = new EventEmitter();
        this.show = new EventEmitter();
        this.showHiddenContexts = new EventEmitter();
        this.favorite = new EventEmitter();
        this.managePermissions = new EventEmitter();
        this.manageTools = new EventEmitter();
        this.filterPermissionsChanged = new EventEmitter();
        this.titleMapping = {
            ours: 'igo.context.contextManager.ourContexts',
            shared: 'igo.context.contextManager.sharedContexts',
            public: 'igo.context.contextManager.publicContexts'
        };
        this.permissions = [];
        this.actionStore = new ActionStore([]);
        this.actionbarMode = ActionbarMode.Overlay;
        this.color = 'primary';
        this.showHidden = false;
        this._term = '';
        this._sortedAlpha = undefined;
        this.showContextFilter = ContextListControlsEnum.always;
        this.thresholdToFilter = 5;
    }
    /**
     * @return {?}
     */
    get contexts() {
        return this._contexts;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set contexts(value) {
        this._contexts = value;
        this.cdRef.detectChanges();
        this.next();
    }
    /**
     * @return {?}
     */
    get selectedContext() {
        return this._selectedContext;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selectedContext(value) {
        this._selectedContext = value;
        this.cdRef.detectChanges();
    }
    /**
     * @return {?}
     */
    get map() {
        return this._map;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set map(value) {
        this._map = value;
    }
    /**
     * @return {?}
     */
    get defaultContextId() {
        return this._defaultContextId;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set defaultContextId(value) {
        this._defaultContextId = value;
    }
    /**
     * Context filter term
     * @param {?} value
     * @return {?}
     */
    set term(value) {
        this._term = value;
        this.next();
    }
    /**
     * @return {?}
     */
    get term() {
        return this._term;
    }
    /**
     * @return {?}
     */
    get sortedAlpha() {
        return this._sortedAlpha;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set sortedAlpha(value) {
        this._sortedAlpha = value;
        this.next();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.change$$ = this.change$
            .pipe(debounce((/**
         * @return {?}
         */
        () => {
            return this.contexts.ours.length === 0 ? EMPTY : timer(50);
        })))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.contexts$.next(this.filterContextsList(this.contexts));
        }));
        this.actionStore.load([
            {
                id: 'emptyContext',
                title: this.languageService.translate.instant('igo.context.contextManager.emptyContext'),
                icon: 'map-outline',
                tooltip: this.languageService.translate.instant('igo.context.contextManager.emptyContextTooltip'),
                handler: (/**
                 * @return {?}
                 */
                () => {
                    this.createContext(true);
                })
            },
            {
                id: 'contextFromMap',
                title: this.languageService.translate.instant('igo.context.contextManager.contextMap'),
                icon: 'map-check',
                tooltip: this.languageService.translate.instant('igo.context.contextManager.contextMapTooltip'),
                handler: (/**
                 * @return {?}
                 */
                () => {
                    this.createContext(false);
                })
            }
        ]);
    }
    /**
     * @private
     * @return {?}
     */
    next() {
        this.change$.next();
    }
    /**
     * @private
     * @param {?} contexts
     * @return {?}
     */
    filterContextsList(contexts) {
        if (this.term === '') {
            if (this.sortedAlpha) {
                contexts = this.sortContextsList(contexts);
            }
            return contexts;
        }
        else {
            /** @type {?} */
            const ours = contexts.ours.filter((/**
             * @param {?} context
             * @return {?}
             */
            (context) => {
                /** @type {?} */
                const filterNormalized = this.term
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '');
                /** @type {?} */
                const contextTitleNormalized = context.title
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '');
                return contextTitleNormalized.includes(filterNormalized);
            }));
            /** @type {?} */
            let updateContexts = {
                ours
            };
            if (this.contexts.public) {
                /** @type {?} */
                const publics = contexts.public.filter((/**
                 * @param {?} context
                 * @return {?}
                 */
                (context) => {
                    /** @type {?} */
                    const filterNormalized = this.term
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '');
                    /** @type {?} */
                    const contextTitleNormalized = context.title
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '');
                    return contextTitleNormalized.includes(filterNormalized);
                }));
                updateContexts.public = publics;
            }
            if (this.contexts.shared) {
                /** @type {?} */
                const shared = contexts.shared.filter((/**
                 * @param {?} context
                 * @return {?}
                 */
                (context) => {
                    /** @type {?} */
                    const filterNormalized = this.term
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '');
                    /** @type {?} */
                    const contextTitleNormalized = context.title
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '');
                    return contextTitleNormalized.includes(filterNormalized);
                }));
                updateContexts.shared = shared;
            }
            if (this.sortedAlpha) {
                updateContexts = this.sortContextsList(updateContexts);
            }
            return updateContexts;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.change$$.unsubscribe();
    }
    /**
     * @return {?}
     */
    showFilter() {
        switch (this.showContextFilter) {
            case ContextListControlsEnum.always:
                return true;
            case ContextListControlsEnum.never:
                return false;
            default:
                /** @type {?} */
                let totalLength = this.contexts.ours.length;
                this.contexts.public
                    ? (totalLength += this.contexts.public.length)
                    : (totalLength += 0);
                this.contexts.shared
                    ? (totalLength += this.contexts.shared.length)
                    : (totalLength += 0);
                if (totalLength >= this.thresholdToFilter) {
                    return true;
                }
                return false;
        }
    }
    /**
     * @param {?} contexts
     * @return {?}
     */
    sortContextsList(contexts) {
        if (contexts) {
            /** @type {?} */
            const contextsList = JSON.parse(JSON.stringify(contexts));
            contextsList.ours.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            (a, b) => {
                if (this.normalize(a.title) < this.normalize(b.title)) {
                    return -1;
                }
                if (this.normalize(a.title) > this.normalize(b.title)) {
                    return 1;
                }
                return 0;
            }));
            if (contextsList.shared) {
                contextsList.shared.sort((/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                (a, b) => {
                    if (this.normalize(a.title) < this.normalize(b.title)) {
                        return -1;
                    }
                    if (this.normalize(a.title) > this.normalize(b.title)) {
                        return 1;
                    }
                    return 0;
                }));
            }
            else if (contextsList.public) {
                contextsList.public.sort((/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                (a, b) => {
                    if (this.normalize(a.title) < this.normalize(b.title)) {
                        return -1;
                    }
                    if (this.normalize(a.title) > this.normalize(b.title)) {
                        return 1;
                    }
                    return 0;
                }));
            }
            return contextsList;
        }
    }
    /**
     * @param {?} str
     * @return {?}
     */
    normalize(str) {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
    }
    /**
     * @param {?} sortAlpha
     * @return {?}
     */
    toggleSort(sortAlpha) {
        this.sortedAlpha = sortAlpha;
    }
    /**
     * @return {?}
     */
    clearFilter() {
        this.term = '';
    }
    /**
     * @param {?=} empty
     * @return {?}
     */
    createContext(empty) {
        this.dialog
            .open(BookmarkDialogComponent, { disableClose: false })
            .afterClosed()
            .subscribe((/**
         * @param {?} title
         * @return {?}
         */
        (title) => {
            if (title) {
                this.create.emit({ title, empty });
            }
        }));
    }
    /**
     * @param {?=} user
     * @return {?}
     */
    getPermission(user) {
        if (user) {
            /** @type {?} */
            const permission = this.permissions.find((/**
             * @param {?} p
             * @return {?}
             */
            (p) => p.name === user.name));
            return permission;
        }
    }
    /**
     * @param {?} user
     * @param {?=} parent
     * @return {?}
     */
    userSelection(user, parent) {
        /** @type {?} */
        const permission = this.getPermission(user);
        if (permission) {
            permission.checked = !permission.checked;
            this.storageService.set('contexts.permissions.' + permission.name, permission.checked);
            permission.indeterminate = false;
        }
        if (parent) {
            /** @type {?} */
            let indeterminate = false;
            for (const c of parent.childs) {
                /** @type {?} */
                const cPermission = this.getPermission(c);
                if (cPermission.checked !== permission.checked) {
                    indeterminate = true;
                    break;
                }
            }
            /** @type {?} */
            const parentPermission = this.getPermission(parent);
            if (parentPermission) {
                parentPermission.checked = permission.checked;
                this.storageService.set('contexts.permissions.' + parentPermission.name, permission.checked);
                parentPermission.indeterminate = indeterminate;
            }
        }
        if (user.childs) {
            for (const c of user.childs) {
                /** @type {?} */
                const childrenPermission = this.getPermission(c);
                if (childrenPermission &&
                    childrenPermission.checked !== permission.checked) {
                    childrenPermission.checked = permission.checked;
                    this.storageService.set('contexts.permissions.' + childrenPermission.name, permission.checked);
                }
            }
        }
        this.filterPermissionsChanged.emit(this.permissions);
    }
    /**
     * @param {?} context
     * @return {?}
     */
    hideContext(context) {
        context.hidden = true;
        if (!this.showHidden) {
            /** @type {?} */
            const contexts = { ours: [], shared: [], public: [] };
            contexts.ours = this.contexts.ours.filter((/**
             * @param {?} c
             * @return {?}
             */
            (c) => c.id !== context.id));
            contexts.shared = this.contexts.shared.filter((/**
             * @param {?} c
             * @return {?}
             */
            (c) => c.id !== context.id));
            contexts.public = this.contexts.public.filter((/**
             * @param {?} c
             * @return {?}
             */
            (c) => c.id !== context.id));
            this.contexts = contexts;
        }
        this.hide.emit(context);
    }
    /**
     * @param {?} context
     * @return {?}
     */
    showContext(context) {
        context.hidden = false;
        this.show.emit(context);
    }
}
ContextListComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-context-list',
                template: "<igo-list [navigation]=\"true\">\r\n  <mat-form-field *ngIf=\"showFilter()\" [ngClass]=\"auth.authenticated ? 'context-filter-min-width' : 'context-filter-max-width'\">\r\n    <input\r\n      matInput\r\n      type=\"text\"\r\n      [placeholder]=\"'igo.context.contextManager.filterPlaceHolder' | translate\"\r\n      [(ngModel)]=\"term\">\r\n    <button\r\n      mat-button\r\n      mat-icon-button\r\n      matSuffix\r\n      class=\"clear-button\"\r\n      *ngIf=\"term.length\"\r\n      aria-label=\"Clear\"\r\n      color=\"warn\"\r\n      (click)=\"clearFilter()\">\r\n      <mat-icon svgIcon=\"close\"></mat-icon>\r\n    </button>\r\n  </mat-form-field>\r\n\r\n  <button\r\n  *ngIf=\"!sortedAlpha\"\r\n  mat-icon-button\r\n  [matTooltip]=\"'igo.context.contextManager.sortAlphabetically' | translate\"\r\n  matTooltipShowDelay=\"500\"\r\n  (click)=\"toggleSort(true)\">\r\n  <mat-icon color=\"primary\" svgIcon=\"sort-alphabetical\"></mat-icon>\r\n  </button>\r\n  <button\r\n    *ngIf=\"sortedAlpha\"\r\n    mat-icon-button\r\n    [matTooltip]=\"'igo.context.contextManager.sortContextOrder' | translate\"\r\n    matTooltipShowDelay=\"500\"\r\n    (click)=\"toggleSort(false)\">\r\n    <mat-icon color=\"warn\" svgIcon=\"sort-variant-remove\"></mat-icon>\r\n  </button>\r\n\r\n  <igo-actionbar *ngIf=\"auth.authenticated\"\r\n    class=\"add-context-button\"\r\n    [iconColor]=\"color\"\r\n    [store]=\"actionStore\"\r\n    [withIcon]=\"true\"\r\n    icon=\"plus\"\r\n    [withTitle]=\"actionbarMode === 'overlay'\"\r\n    [horizontal]=\"false\"\r\n    [mode]=\"actionbarMode\">\r\n  </igo-actionbar>\r\n\r\n  <button *ngIf=\"auth.authenticated && users && users.length\"\r\n    mat-icon-button\r\n    [matTooltip]=\"'igo.context.contextManager.filterUser' | translate\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matMenuTriggerFor]=\"accountMenu\">\r\n    <mat-icon color=\"primary\" svgIcon=\"filter-menu\"></mat-icon>\r\n  </button>\r\n\r\n  <mat-menu #accountMenu=\"matMenu\">\r\n    <ng-container *ngFor=\"let user of users\">\r\n      <span class=\"profilsMenu\">\r\n        <mat-checkbox\r\n          class=\"mat-menu-item\"\r\n          [checked]=\"getPermission(user).checked\"\r\n          [indeterminate]=\"getPermission(user).indeterminate\"\r\n          (click)=\"$event.stopPropagation()\"\r\n          (change)=\"userSelection(user)\">\r\n        </mat-checkbox>\r\n        <button *ngIf=\"user.childs\"\r\n          [matMenuTriggerFor]=\"subAccountMenu\"\r\n          mat-menu-item>\r\n          {{user.title}}\r\n        </button>\r\n        <button\r\n          mat-menu-item\r\n          *ngIf=\"!user.childs\">\r\n          {{user.title}}\r\n        </button>\r\n      </span>\r\n\r\n      <mat-menu #subAccountMenu=\"matMenu\">\r\n        <mat-checkbox *ngFor=\"let child of user.childs\"\r\n          class=\"mat-menu-item\"\r\n          [checked]=\"getPermission(child).checked\"\r\n          (click)=\"$event.stopPropagation()\"\r\n          (change)=\"userSelection(child, user)\">\r\n          {{child.title}}\r\n        </mat-checkbox>\r\n      </mat-menu>\r\n    </ng-container>\r\n\r\n    <span class=\"profilsMenu\">\r\n      <mat-checkbox\r\n        class=\"mat-menu-item\"\r\n        [checked]=\"showHidden\"\r\n        (click)=\"$event.stopPropagation()\"\r\n        (change)=\"showHiddenContexts.emit()\">\r\n      </mat-checkbox>\r\n      <button mat-menu-item>\r\n        {{ 'igo.context.contextManager.showHidden' | translate }}\r\n      </button>\r\n    </span>\r\n  </mat-menu>\r\n\r\n  <ng-template ngFor let-groupContexts [ngForOf]=\"contexts$ | async | keyvalue\">\r\n\r\n    <igo-collapsible *ngIf=\"groupContexts.value.length && auth.authenticated\" [title]=\"titleMapping[groupContexts.key] | translate\"\r\n      [collapsed]=\"collapsed[titleMapping[groupContexts.key]]\" (toggle)=\"collapsed[titleMapping[groupContexts.key]] = $event\">\r\n\r\n      <ng-template ngFor let-context [ngForOf]=\"groupContexts.value\">\r\n        <igo-context-item\r\n          igoListItem\r\n          color=\"accent\"\r\n          [selected]=\"selectedContext && selectedContext.uri === context.uri\"\r\n          [context]=\"context\"\r\n          [default]=\"context.id && this.defaultContextId && this.defaultContextId === context.id\"\r\n          (edit)=\"edit.emit(context)\"\r\n          (delete)=\"delete.emit(context)\"\r\n          (clone)=\"clone.emit(context)\"\r\n          (save)=\"save.emit(context)\"\r\n          (hide)=\"hideContext(context)\"\r\n          (show)=\"showContext(context)\"\r\n          (favorite)=\"favorite.emit(context)\"\r\n          (manageTools)=\"manageTools.emit(context)\"\r\n          (managePermissions)=\"managePermissions.emit(context)\"\r\n          (select)=\"select.emit(context)\"\r\n          (unselect)=\"unselect.emit(context)\">\r\n        </igo-context-item>\r\n      </ng-template>\r\n\r\n    </igo-collapsible>\r\n\r\n    <ng-template *ngIf=\"groupContexts.value.length && !auth.authenticated\" ngFor let-context [ngForOf]=\"groupContexts.value\">\r\n      <igo-context-item\r\n        igoListItem\r\n        color=\"accent\"\r\n        [selected]=\"selectedContext && selectedContext.uri === context.uri\"\r\n        [context]=\"context\"\r\n        [default]=\"this.defaultContextId === context.id\"\r\n        (select)=\"select.emit(context)\"\r\n        (unselect)=\"unselect.emit(context)\">\r\n      </igo-context-item>\r\n    </ng-template>\r\n\r\n  </ng-template>\r\n</igo-list>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".context-filter-max-width{width:calc(100% - 100px);margin:5px;padding-left:6px}.context-filter-min-width{width:calc(100% - 135px);margin:5px;padding-left:6px}.clear-button{padding-right:5px}mat-form-field{height:40px}.profilsMenu{display:-webkit-box;display:flex}.profilsMenu>mat-checkbox{width:8px}.add-context-button{margin:0;width:40px;display:-webkit-inline-box;display:inline-flex}"]
            }] }
];
/** @nocollapse */
ContextListComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ContextService },
    { type: AuthService },
    { type: MatDialog },
    { type: LanguageService },
    { type: StorageService }
];
ContextListComponent.propDecorators = {
    contexts: [{ type: Input }],
    selectedContext: [{ type: Input }],
    map: [{ type: Input }],
    defaultContextId: [{ type: Input }],
    select: [{ type: Output }],
    unselect: [{ type: Output }],
    edit: [{ type: Output }],
    delete: [{ type: Output }],
    save: [{ type: Output }],
    clone: [{ type: Output }],
    create: [{ type: Output }],
    hide: [{ type: Output }],
    show: [{ type: Output }],
    showHiddenContexts: [{ type: Output }],
    favorite: [{ type: Output }],
    managePermissions: [{ type: Output }],
    manageTools: [{ type: Output }],
    filterPermissionsChanged: [{ type: Output }],
    term: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    ContextListComponent.prototype.contextsInitial;
    /** @type {?} */
    ContextListComponent.prototype.contexts$;
    /** @type {?} */
    ContextListComponent.prototype.change$;
    /**
     * @type {?}
     * @private
     */
    ContextListComponent.prototype.change$$;
    /**
     * @type {?}
     * @private
     */
    ContextListComponent.prototype._contexts;
    /**
     * @type {?}
     * @private
     */
    ContextListComponent.prototype._selectedContext;
    /**
     * @type {?}
     * @private
     */
    ContextListComponent.prototype._map;
    /**
     * @type {?}
     * @private
     */
    ContextListComponent.prototype._defaultContextId;
    /** @type {?} */
    ContextListComponent.prototype.collapsed;
    /** @type {?} */
    ContextListComponent.prototype.select;
    /** @type {?} */
    ContextListComponent.prototype.unselect;
    /** @type {?} */
    ContextListComponent.prototype.edit;
    /** @type {?} */
    ContextListComponent.prototype.delete;
    /** @type {?} */
    ContextListComponent.prototype.save;
    /** @type {?} */
    ContextListComponent.prototype.clone;
    /** @type {?} */
    ContextListComponent.prototype.create;
    /** @type {?} */
    ContextListComponent.prototype.hide;
    /** @type {?} */
    ContextListComponent.prototype.show;
    /** @type {?} */
    ContextListComponent.prototype.showHiddenContexts;
    /** @type {?} */
    ContextListComponent.prototype.favorite;
    /** @type {?} */
    ContextListComponent.prototype.managePermissions;
    /** @type {?} */
    ContextListComponent.prototype.manageTools;
    /** @type {?} */
    ContextListComponent.prototype.filterPermissionsChanged;
    /** @type {?} */
    ContextListComponent.prototype.titleMapping;
    /** @type {?} */
    ContextListComponent.prototype.users;
    /** @type {?} */
    ContextListComponent.prototype.permissions;
    /** @type {?} */
    ContextListComponent.prototype.actionStore;
    /** @type {?} */
    ContextListComponent.prototype.actionbarMode;
    /** @type {?} */
    ContextListComponent.prototype.color;
    /** @type {?} */
    ContextListComponent.prototype.showHidden;
    /** @type {?} */
    ContextListComponent.prototype._term;
    /**
     * @type {?}
     * @private
     */
    ContextListComponent.prototype._sortedAlpha;
    /** @type {?} */
    ContextListComponent.prototype.showContextFilter;
    /** @type {?} */
    ContextListComponent.prototype.thresholdToFilter;
    /**
     * @type {?}
     * @private
     */
    ContextListComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    ContextListComponent.prototype.contextService;
    /** @type {?} */
    ContextListComponent.prototype.auth;
    /**
     * @type {?}
     * @private
     */
    ContextListComponent.prototype.dialog;
    /**
     * @type {?}
     * @private
     */
    ContextListComponent.prototype.languageService;
    /**
     * @type {?}
     * @private
     */
    ContextListComponent.prototype.storageService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tYW5hZ2VyL2NvbnRleHQtbGlzdC9jb250ZXh0LWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLGlCQUFpQixFQUVqQix1QkFBdUIsRUFFeEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN6QyxPQUFPLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM3RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBUW5DLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlELE9BQU8sRUFFTCxlQUFlLEVBQ2YsYUFBYSxFQUNiLEtBQUssRUFDTCxLQUFLLEVBQ04sTUFBTSxNQUFNLENBQUM7QUFDZCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sb0VBQW9FLENBQUM7QUFDN0csT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzFELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQVEzRCxNQUFNLE9BQU8sb0JBQW9COzs7Ozs7Ozs7SUE4Ry9CLFlBQ1UsS0FBd0IsRUFDeEIsY0FBOEIsRUFDL0IsSUFBaUIsRUFDaEIsTUFBaUIsRUFDakIsZUFBZ0MsRUFDaEMsY0FBOEI7UUFMOUIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFDeEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQy9CLFNBQUksR0FBSixJQUFJLENBQWE7UUFDaEIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBbkhoQyxvQkFBZSxHQUFpQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUNyRCxjQUFTLEdBQWtDLElBQUksZUFBZSxDQUM1RCxJQUFJLENBQUMsZUFBZSxDQUNyQixDQUFDO1FBRUYsWUFBTyxHQUFHLElBQUksYUFBYSxDQUFPLENBQUMsQ0FBQyxDQUFDO1FBYTdCLGNBQVMsR0FBaUIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUM7UUE4QnhDLGNBQVMsR0FBdUIsRUFBRSxDQUFDO1FBRWhDLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztRQUM3QyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDL0MsU0FBSSxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQzNDLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztRQUM3QyxTQUFJLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDM0MsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQzVDLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBcUMsQ0FBQztRQUMvRCxTQUFJLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDM0MsU0FBSSxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQzNDLHVCQUFrQixHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDakQsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQy9DLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQ3hELGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDbEQsNkJBQXdCLEdBQUcsSUFBSSxZQUFZLEVBRWxELENBQUM7UUFFRyxpQkFBWSxHQUFHO1lBQ3BCLElBQUksRUFBRSx3Q0FBd0M7WUFDOUMsTUFBTSxFQUFFLDJDQUEyQztZQUNuRCxNQUFNLEVBQUUsMkNBQTJDO1NBQ3BELENBQUM7UUFHSyxnQkFBVyxHQUE0QixFQUFFLENBQUM7UUFFMUMsZ0JBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsQyxrQkFBYSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUM7UUFFdEMsVUFBSyxHQUFHLFNBQVMsQ0FBQztRQUVsQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBYW5CLFVBQUssR0FBVyxFQUFFLENBQUM7UUFTbEIsaUJBQVksR0FBWSxTQUFTLENBQUM7UUFFbkMsc0JBQWlCLEdBQUcsdUJBQXVCLENBQUMsTUFBTSxDQUFDO1FBRW5ELHNCQUFpQixHQUFHLENBQUMsQ0FBQztJQVMxQixDQUFDOzs7O0lBM0dKLElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOzs7OztJQUNELElBQUksUUFBUSxDQUFDLEtBQW1CO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQzs7OztJQUdELElBQ0ksZUFBZTtRQUNqQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUMvQixDQUFDOzs7OztJQUNELElBQUksZUFBZSxDQUFDLEtBQXNCO1FBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7O0lBR0QsSUFDSSxHQUFHO1FBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7Ozs7O0lBQ0QsSUFBSSxHQUFHLENBQUMsS0FBYTtRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUNwQixDQUFDOzs7O0lBR0QsSUFDSSxnQkFBZ0I7UUFDbEIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDaEMsQ0FBQzs7Ozs7SUFDRCxJQUFJLGdCQUFnQixDQUFDLEtBQWE7UUFDaEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNqQyxDQUFDOzs7Ozs7SUF5Q0QsSUFDSSxJQUFJLENBQUMsS0FBYTtRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDOzs7O0lBQ0QsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7Ozs7SUFHRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQzs7Ozs7SUFDRCxJQUFJLFdBQVcsQ0FBQyxLQUFjO1FBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7Ozs7SUFnQkQsUUFBUTtRQUNOLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU87YUFDekIsSUFBSSxDQUNILFFBQVE7OztRQUFDLEdBQUcsRUFBRTtZQUNaLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0QsQ0FBQyxFQUFDLENBQ0g7YUFDQSxTQUFTOzs7UUFBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDOUQsQ0FBQyxFQUFDLENBQUM7UUFFTCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUNwQjtnQkFDRSxFQUFFLEVBQUUsY0FBYztnQkFDbEIsS0FBSyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FDM0MseUNBQXlDLENBQzFDO2dCQUNELElBQUksRUFBRSxhQUFhO2dCQUNuQixPQUFPLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUM3QyxnREFBZ0QsQ0FDakQ7Z0JBQ0QsT0FBTzs7O2dCQUFFLEdBQUcsRUFBRTtvQkFDWixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzQixDQUFDLENBQUE7YUFDRjtZQUNEO2dCQUNFLEVBQUUsRUFBRSxnQkFBZ0I7Z0JBQ3BCLEtBQUssRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQzNDLHVDQUF1QyxDQUN4QztnQkFDRCxJQUFJLEVBQUUsV0FBVztnQkFDakIsT0FBTyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FDN0MsOENBQThDLENBQy9DO2dCQUNELE9BQU87OztnQkFBRSxHQUFHLEVBQUU7b0JBQ1osSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDNUIsQ0FBQyxDQUFBO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVPLElBQUk7UUFDVixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3RCLENBQUM7Ozs7OztJQUVPLGtCQUFrQixDQUFDLFFBQXNCO1FBQy9DLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxFQUFFLEVBQUU7WUFDcEIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNwQixRQUFRLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzVDO1lBQ0QsT0FBTyxRQUFRLENBQUM7U0FDakI7YUFBTTs7a0JBQ0MsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTTs7OztZQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7O3NCQUN0QyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsSUFBSTtxQkFDL0IsV0FBVyxFQUFFO3FCQUNiLFNBQVMsQ0FBQyxLQUFLLENBQUM7cUJBQ2hCLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLENBQUM7O3NCQUM1QixzQkFBc0IsR0FBRyxPQUFPLENBQUMsS0FBSztxQkFDekMsV0FBVyxFQUFFO3FCQUNiLFNBQVMsQ0FBQyxLQUFLLENBQUM7cUJBQ2hCLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLENBQUM7Z0JBQ2xDLE9BQU8sc0JBQXNCLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDM0QsQ0FBQyxFQUFDOztnQkFFRSxjQUFjLEdBQWlCO2dCQUNqQyxJQUFJO2FBQ0w7WUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFOztzQkFDbEIsT0FBTyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTTs7OztnQkFBQyxDQUFDLE9BQU8sRUFBRSxFQUFFOzswQkFDM0MsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLElBQUk7eUJBQy9CLFdBQVcsRUFBRTt5QkFDYixTQUFTLENBQUMsS0FBSyxDQUFDO3lCQUNoQixPQUFPLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDOzswQkFDNUIsc0JBQXNCLEdBQUcsT0FBTyxDQUFDLEtBQUs7eUJBQ3pDLFdBQVcsRUFBRTt5QkFDYixTQUFTLENBQUMsS0FBSyxDQUFDO3lCQUNoQixPQUFPLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDO29CQUNsQyxPQUFPLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUMzRCxDQUFDLEVBQUM7Z0JBQ0YsY0FBYyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7YUFDakM7WUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFOztzQkFDbEIsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTTs7OztnQkFBQyxDQUFDLE9BQU8sRUFBRSxFQUFFOzswQkFDMUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLElBQUk7eUJBQy9CLFdBQVcsRUFBRTt5QkFDYixTQUFTLENBQUMsS0FBSyxDQUFDO3lCQUNoQixPQUFPLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDOzswQkFDNUIsc0JBQXNCLEdBQUcsT0FBTyxDQUFDLEtBQUs7eUJBQ3pDLFdBQVcsRUFBRTt5QkFDYixTQUFTLENBQUMsS0FBSyxDQUFDO3lCQUNoQixPQUFPLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDO29CQUNsQyxPQUFPLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUMzRCxDQUFDLEVBQUM7Z0JBQ0YsY0FBYyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7YUFDaEM7WUFFRCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ3BCLGNBQWMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDeEQ7WUFDRCxPQUFPLGNBQWMsQ0FBQztTQUN2QjtJQUNILENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM5QixDQUFDOzs7O0lBRU0sVUFBVTtRQUNmLFFBQVEsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzlCLEtBQUssdUJBQXVCLENBQUMsTUFBTTtnQkFDakMsT0FBTyxJQUFJLENBQUM7WUFDZCxLQUFLLHVCQUF1QixDQUFDLEtBQUs7Z0JBQ2hDLE9BQU8sS0FBSyxDQUFDO1lBQ2Y7O29CQUNNLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNO2dCQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU07b0JBQ2xCLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7b0JBQzlDLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNO29CQUNsQixDQUFDLENBQUMsQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO29CQUM5QyxDQUFDLENBQUMsQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksV0FBVyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtvQkFDekMsT0FBTyxJQUFJLENBQUM7aUJBQ2I7Z0JBQ0QsT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDSCxDQUFDOzs7OztJQUVELGdCQUFnQixDQUFDLFFBQXNCO1FBQ3JDLElBQUksUUFBUSxFQUFFOztrQkFDTixZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pELFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSTs7Ozs7WUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDOUIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDckQsT0FBTyxDQUFDLENBQUMsQ0FBQztpQkFDWDtnQkFDRCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUNyRCxPQUFPLENBQUMsQ0FBQztpQkFDVjtnQkFDRCxPQUFPLENBQUMsQ0FBQztZQUNYLENBQUMsRUFBQyxDQUFDO1lBRUgsSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFFO2dCQUN2QixZQUFZLENBQUMsTUFBTSxDQUFDLElBQUk7Ozs7O2dCQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNoQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO3dCQUNyRCxPQUFPLENBQUMsQ0FBQyxDQUFDO3FCQUNYO29CQUNELElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7d0JBQ3JELE9BQU8sQ0FBQyxDQUFDO3FCQUNWO29CQUNELE9BQU8sQ0FBQyxDQUFDO2dCQUNYLENBQUMsRUFBQyxDQUFDO2FBQ0o7aUJBQU0sSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFFO2dCQUM5QixZQUFZLENBQUMsTUFBTSxDQUFDLElBQUk7Ozs7O2dCQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNoQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO3dCQUNyRCxPQUFPLENBQUMsQ0FBQyxDQUFDO3FCQUNYO29CQUNELElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7d0JBQ3JELE9BQU8sQ0FBQyxDQUFDO3FCQUNWO29CQUNELE9BQU8sQ0FBQyxDQUFDO2dCQUNYLENBQUMsRUFBQyxDQUFDO2FBQ0o7WUFDRCxPQUFPLFlBQVksQ0FBQztTQUNyQjtJQUNILENBQUM7Ozs7O0lBRUQsU0FBUyxDQUFDLEdBQVc7UUFDbkIsT0FBTyxHQUFHO2FBQ1AsU0FBUyxDQUFDLEtBQUssQ0FBQzthQUNoQixPQUFPLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDO2FBQy9CLFdBQVcsRUFBRSxDQUFDO0lBQ25CLENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLFNBQWtCO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO0lBQy9CLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7SUFDakIsQ0FBQzs7Ozs7SUFFRCxhQUFhLENBQUMsS0FBZTtRQUMzQixJQUFJLENBQUMsTUFBTTthQUNSLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsQ0FBQzthQUN0RCxXQUFXLEVBQUU7YUFDYixTQUFTOzs7O1FBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNuQixJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2FBQ3BDO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7OztJQUVELGFBQWEsQ0FBQyxJQUFLO1FBQ2pCLElBQUksSUFBSSxFQUFFOztrQkFDRixVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJOzs7O1lBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksRUFBQztZQUNyRSxPQUFPLFVBQVUsQ0FBQztTQUNuQjtJQUNILENBQUM7Ozs7OztJQUVELGFBQWEsQ0FBQyxJQUFJLEVBQUUsTUFBTzs7Y0FDbkIsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQzNDLElBQUksVUFBVSxFQUFFO1lBQ2QsVUFBVSxDQUFDLE9BQU8sR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7WUFDekMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQ3JCLHVCQUF1QixHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQ3pDLFVBQVUsQ0FBQyxPQUFPLENBQ25CLENBQUM7WUFDRixVQUFVLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztTQUNsQztRQUVELElBQUksTUFBTSxFQUFFOztnQkFDTixhQUFhLEdBQUcsS0FBSztZQUV6QixLQUFLLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7O3NCQUN2QixXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLElBQUksV0FBVyxDQUFDLE9BQU8sS0FBSyxVQUFVLENBQUMsT0FBTyxFQUFFO29CQUM5QyxhQUFhLEdBQUcsSUFBSSxDQUFDO29CQUNyQixNQUFNO2lCQUNQO2FBQ0Y7O2tCQUNLLGdCQUFnQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1lBQ25ELElBQUksZ0JBQWdCLEVBQUU7Z0JBQ3BCLGdCQUFnQixDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDO2dCQUM5QyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FDckIsdUJBQXVCLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxFQUMvQyxVQUFVLENBQUMsT0FBTyxDQUNuQixDQUFDO2dCQUNGLGdCQUFnQixDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7YUFDaEQ7U0FDRjtRQUVELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLEtBQUssTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTs7c0JBQ3JCLGtCQUFrQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxJQUNFLGtCQUFrQjtvQkFDbEIsa0JBQWtCLENBQUMsT0FBTyxLQUFLLFVBQVUsQ0FBQyxPQUFPLEVBQ2pEO29CQUNBLGtCQUFrQixDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDO29CQUNoRCxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FDckIsdUJBQXVCLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxFQUNqRCxVQUFVLENBQUMsT0FBTyxDQUNuQixDQUFDO2lCQUNIO2FBQ0Y7U0FDRjtRQUVELElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQXdCO1FBQ2xDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFOztrQkFDZCxRQUFRLEdBQWlCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7WUFDbkUsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNOzs7O1lBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLEVBQUUsRUFBQyxDQUFDO1lBQ3RFLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTTs7OztZQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLE9BQU8sQ0FBQyxFQUFFLEVBQUMsQ0FBQztZQUMxRSxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU07Ozs7WUFBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxPQUFPLENBQUMsRUFBRSxFQUFDLENBQUM7WUFDMUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7U0FDMUI7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxQixDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxPQUF3QjtRQUNsQyxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxQixDQUFDOzs7WUF4WUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLDIzS0FBNEM7Z0JBRTVDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7OztZQW5DQyxpQkFBaUI7WUE0QlYsY0FBYztZQXRCZCxXQUFXO1lBa0JYLFNBQVM7WUFqQlQsZUFBZTtZQUFFLGNBQWM7Ozt1QkF1Q3JDLEtBQUs7OEJBV0wsS0FBSztrQkFVTCxLQUFLOytCQVNMLEtBQUs7cUJBV0wsTUFBTTt1QkFDTixNQUFNO21CQUNOLE1BQU07cUJBQ04sTUFBTTttQkFDTixNQUFNO29CQUNOLE1BQU07cUJBQ04sTUFBTTttQkFDTixNQUFNO21CQUNOLE1BQU07aUNBQ04sTUFBTTt1QkFDTixNQUFNO2dDQUNOLE1BQU07MEJBQ04sTUFBTTt1Q0FDTixNQUFNO21CQXVCTixLQUFLOzs7Ozs7O0lBdEZOLCtDQUFxRDs7SUFDckQseUNBRUU7O0lBRUYsdUNBQXFDOzs7OztJQUVyQyx3Q0FBK0I7Ozs7O0lBVy9CLHlDQUErQzs7Ozs7SUFVL0MsZ0RBQTBDOzs7OztJQVMxQyxvQ0FBcUI7Ozs7O0lBU3JCLGlEQUFrQzs7SUFFbEMseUNBQTBDOztJQUUxQyxzQ0FBdUQ7O0lBQ3ZELHdDQUF5RDs7SUFDekQsb0NBQXFEOztJQUNyRCxzQ0FBdUQ7O0lBQ3ZELG9DQUFxRDs7SUFDckQscUNBQXNEOztJQUN0RCxzQ0FBeUU7O0lBQ3pFLG9DQUFxRDs7SUFDckQsb0NBQXFEOztJQUNyRCxrREFBMkQ7O0lBQzNELHdDQUF5RDs7SUFDekQsaURBQWtFOztJQUNsRSwyQ0FBNEQ7O0lBQzVELHdEQUVJOztJQUVKLDRDQUlFOztJQUVGLHFDQUErQjs7SUFDL0IsMkNBQWlEOztJQUVqRCwyQ0FBeUM7O0lBQ3pDLDZDQUE2Qzs7SUFFN0MscUNBQXlCOztJQUV6QiwwQ0FBMEI7O0lBYTFCLHFDQUEwQjs7Ozs7SUFTMUIsNENBQTBDOztJQUUxQyxpREFBMEQ7O0lBRTFELGlEQUE2Qjs7Ozs7SUFHM0IscUNBQWdDOzs7OztJQUNoQyw4Q0FBc0M7O0lBQ3RDLG9DQUF3Qjs7Ozs7SUFDeEIsc0NBQXlCOzs7OztJQUN6QiwrQ0FBd0M7Ozs7O0lBQ3hDLDhDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgT25Jbml0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIE9uRGVzdHJveVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICdAaWdvMi9hdXRoJztcclxuaW1wb3J0IHsgTGFuZ3VhZ2VTZXJ2aWNlLCBTdG9yYWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICdAaWdvMi9nZW8nO1xyXG5cclxuaW1wb3J0IHtcclxuICBEZXRhaWxlZENvbnRleHQsXHJcbiAgQ29udGV4dHNMaXN0LFxyXG4gIENvbnRleHRVc2VyUGVybWlzc2lvbixcclxuICBDb250ZXh0UHJvZmlsc1xyXG59IGZyb20gJy4uL3NoYXJlZC9jb250ZXh0LmludGVyZmFjZSc7XHJcbmltcG9ydCB7IENvbnRleHRMaXN0Q29udHJvbHNFbnVtIH0gZnJvbSAnLi9jb250ZXh0LWxpc3QuZW51bSc7XHJcbmltcG9ydCB7XHJcbiAgU3Vic2NyaXB0aW9uLFxyXG4gIEJlaGF2aW9yU3ViamVjdCxcclxuICBSZXBsYXlTdWJqZWN0LFxyXG4gIEVNUFRZLFxyXG4gIHRpbWVyXHJcbn0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHsgQm9va21hcmtEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb250ZXh0LW1hcC1idXR0b24vYm9va21hcmstYnV0dG9uL2Jvb2ttYXJrLWRpYWxvZy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgQWN0aW9uU3RvcmUsIEFjdGlvbmJhck1vZGUgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5pbXBvcnQgeyBDb250ZXh0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9jb250ZXh0LnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tY29udGV4dC1saXN0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY29udGV4dC1saXN0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9jb250ZXh0LWxpc3QuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29udGV4dExpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSBjb250ZXh0c0luaXRpYWw6IENvbnRleHRzTGlzdCA9IHsgb3VyczogW10gfTtcclxuICBjb250ZXh0cyQ6IEJlaGF2aW9yU3ViamVjdDxDb250ZXh0c0xpc3Q+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChcclxuICAgIHRoaXMuY29udGV4dHNJbml0aWFsXHJcbiAgKTtcclxuXHJcbiAgY2hhbmdlJCA9IG5ldyBSZXBsYXlTdWJqZWN0PHZvaWQ+KDEpO1xyXG5cclxuICBwcml2YXRlIGNoYW5nZSQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGNvbnRleHRzKCk6IENvbnRleHRzTGlzdCB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dHM7XHJcbiAgfVxyXG4gIHNldCBjb250ZXh0cyh2YWx1ZTogQ29udGV4dHNMaXN0KSB7XHJcbiAgICB0aGlzLl9jb250ZXh0cyA9IHZhbHVlO1xyXG4gICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB0aGlzLm5leHQoKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfY29udGV4dHM6IENvbnRleHRzTGlzdCA9IHsgb3VyczogW10gfTtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgc2VsZWN0ZWRDb250ZXh0KCk6IERldGFpbGVkQ29udGV4dCB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRDb250ZXh0O1xyXG4gIH1cclxuICBzZXQgc2VsZWN0ZWRDb250ZXh0KHZhbHVlOiBEZXRhaWxlZENvbnRleHQpIHtcclxuICAgIHRoaXMuX3NlbGVjdGVkQ29udGV4dCA9IHZhbHVlO1xyXG4gICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3NlbGVjdGVkQ29udGV4dDogRGV0YWlsZWRDb250ZXh0O1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBtYXAoKTogSWdvTWFwIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXA7XHJcbiAgfVxyXG4gIHNldCBtYXAodmFsdWU6IElnb01hcCkge1xyXG4gICAgdGhpcy5fbWFwID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX21hcDogSWdvTWFwO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBkZWZhdWx0Q29udGV4dElkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGVmYXVsdENvbnRleHRJZDtcclxuICB9XHJcbiAgc2V0IGRlZmF1bHRDb250ZXh0SWQodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5fZGVmYXVsdENvbnRleHRJZCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9kZWZhdWx0Q29udGV4dElkOiBzdHJpbmc7XHJcblxyXG4gIHB1YmxpYyBjb2xsYXBzZWQ6IHsgY29udGV4dFNjb3BlIH1bXSA9IFtdO1xyXG5cclxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxEZXRhaWxlZENvbnRleHQ+KCk7XHJcbiAgQE91dHB1dCgpIHVuc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxEZXRhaWxlZENvbnRleHQ+KCk7XHJcbiAgQE91dHB1dCgpIGVkaXQgPSBuZXcgRXZlbnRFbWl0dGVyPERldGFpbGVkQ29udGV4dD4oKTtcclxuICBAT3V0cHV0KCkgZGVsZXRlID0gbmV3IEV2ZW50RW1pdHRlcjxEZXRhaWxlZENvbnRleHQ+KCk7XHJcbiAgQE91dHB1dCgpIHNhdmUgPSBuZXcgRXZlbnRFbWl0dGVyPERldGFpbGVkQ29udGV4dD4oKTtcclxuICBAT3V0cHV0KCkgY2xvbmUgPSBuZXcgRXZlbnRFbWl0dGVyPERldGFpbGVkQ29udGV4dD4oKTtcclxuICBAT3V0cHV0KCkgY3JlYXRlID0gbmV3IEV2ZW50RW1pdHRlcjx7IHRpdGxlOiBzdHJpbmc7IGVtcHR5OiBib29sZWFuIH0+KCk7XHJcbiAgQE91dHB1dCgpIGhpZGUgPSBuZXcgRXZlbnRFbWl0dGVyPERldGFpbGVkQ29udGV4dD4oKTtcclxuICBAT3V0cHV0KCkgc2hvdyA9IG5ldyBFdmVudEVtaXR0ZXI8RGV0YWlsZWRDb250ZXh0PigpO1xyXG4gIEBPdXRwdXQoKSBzaG93SGlkZGVuQ29udGV4dHMgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgQE91dHB1dCgpIGZhdm9yaXRlID0gbmV3IEV2ZW50RW1pdHRlcjxEZXRhaWxlZENvbnRleHQ+KCk7XHJcbiAgQE91dHB1dCgpIG1hbmFnZVBlcm1pc3Npb25zID0gbmV3IEV2ZW50RW1pdHRlcjxEZXRhaWxlZENvbnRleHQ+KCk7XHJcbiAgQE91dHB1dCgpIG1hbmFnZVRvb2xzID0gbmV3IEV2ZW50RW1pdHRlcjxEZXRhaWxlZENvbnRleHQ+KCk7XHJcbiAgQE91dHB1dCgpIGZpbHRlclBlcm1pc3Npb25zQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8XHJcbiAgICBDb250ZXh0VXNlclBlcm1pc3Npb25bXVxyXG4gID4oKTtcclxuXHJcbiAgcHVibGljIHRpdGxlTWFwcGluZyA9IHtcclxuICAgIG91cnM6ICdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5vdXJDb250ZXh0cycsXHJcbiAgICBzaGFyZWQ6ICdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5zaGFyZWRDb250ZXh0cycsXHJcbiAgICBwdWJsaWM6ICdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5wdWJsaWNDb250ZXh0cydcclxuICB9O1xyXG5cclxuICBwdWJsaWMgdXNlcnM6IENvbnRleHRQcm9maWxzW107XHJcbiAgcHVibGljIHBlcm1pc3Npb25zOiBDb250ZXh0VXNlclBlcm1pc3Npb25bXSA9IFtdO1xyXG5cclxuICBwdWJsaWMgYWN0aW9uU3RvcmUgPSBuZXcgQWN0aW9uU3RvcmUoW10pO1xyXG4gIHB1YmxpYyBhY3Rpb25iYXJNb2RlID0gQWN0aW9uYmFyTW9kZS5PdmVybGF5O1xyXG5cclxuICBwdWJsaWMgY29sb3IgPSAncHJpbWFyeSc7XHJcblxyXG4gIHB1YmxpYyBzaG93SGlkZGVuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnRleHQgZmlsdGVyIHRlcm1cclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCB0ZXJtKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX3Rlcm0gPSB2YWx1ZTtcclxuICAgIHRoaXMubmV4dCgpO1xyXG4gIH1cclxuICBnZXQgdGVybSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Rlcm07XHJcbiAgfVxyXG4gIHB1YmxpYyBfdGVybTogc3RyaW5nID0gJyc7XHJcblxyXG4gIGdldCBzb3J0ZWRBbHBoYSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9zb3J0ZWRBbHBoYTtcclxuICB9XHJcbiAgc2V0IHNvcnRlZEFscGhhKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9zb3J0ZWRBbHBoYSA9IHZhbHVlO1xyXG4gICAgdGhpcy5uZXh0KCk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3NvcnRlZEFscGhhOiBib29sZWFuID0gdW5kZWZpbmVkO1xyXG5cclxuICBwdWJsaWMgc2hvd0NvbnRleHRGaWx0ZXIgPSBDb250ZXh0TGlzdENvbnRyb2xzRW51bS5hbHdheXM7XHJcblxyXG4gIHB1YmxpYyB0aHJlc2hvbGRUb0ZpbHRlciA9IDU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwcml2YXRlIGNvbnRleHRTZXJ2aWNlOiBDb250ZXh0U2VydmljZSxcclxuICAgIHB1YmxpYyBhdXRoOiBBdXRoU2VydmljZSxcclxuICAgIHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2csXHJcbiAgICBwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzdG9yYWdlU2VydmljZTogU3RvcmFnZVNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5jaGFuZ2UkJCA9IHRoaXMuY2hhbmdlJFxyXG4gICAgICAucGlwZShcclxuICAgICAgICBkZWJvdW5jZSgoKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0cy5vdXJzLmxlbmd0aCA9PT0gMCA/IEVNUFRZIDogdGltZXIoNTApO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0cyQubmV4dCh0aGlzLmZpbHRlckNvbnRleHRzTGlzdCh0aGlzLmNvbnRleHRzKSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHRoaXMuYWN0aW9uU3RvcmUubG9hZChbXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogJ2VtcHR5Q29udGV4dCcsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgJ2lnby5jb250ZXh0LmNvbnRleHRNYW5hZ2VyLmVtcHR5Q29udGV4dCdcclxuICAgICAgICApLFxyXG4gICAgICAgIGljb246ICdtYXAtb3V0bGluZScsXHJcbiAgICAgICAgdG9vbHRpcDogdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAnaWdvLmNvbnRleHQuY29udGV4dE1hbmFnZXIuZW1wdHlDb250ZXh0VG9vbHRpcCdcclxuICAgICAgICApLFxyXG4gICAgICAgIGhhbmRsZXI6ICgpID0+IHtcclxuICAgICAgICAgIHRoaXMuY3JlYXRlQ29udGV4dCh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogJ2NvbnRleHRGcm9tTWFwJyxcclxuICAgICAgICB0aXRsZTogdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAnaWdvLmNvbnRleHQuY29udGV4dE1hbmFnZXIuY29udGV4dE1hcCdcclxuICAgICAgICApLFxyXG4gICAgICAgIGljb246ICdtYXAtY2hlY2snLFxyXG4gICAgICAgIHRvb2x0aXA6IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgJ2lnby5jb250ZXh0LmNvbnRleHRNYW5hZ2VyLmNvbnRleHRNYXBUb29sdGlwJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgaGFuZGxlcjogKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jcmVhdGVDb250ZXh0KGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIF0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBuZXh0KCkge1xyXG4gICAgdGhpcy5jaGFuZ2UkLm5leHQoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZmlsdGVyQ29udGV4dHNMaXN0KGNvbnRleHRzOiBDb250ZXh0c0xpc3QpIHtcclxuICAgIGlmICh0aGlzLnRlcm0gPT09ICcnKSB7XHJcbiAgICAgIGlmICh0aGlzLnNvcnRlZEFscGhhKSB7XHJcbiAgICAgICAgY29udGV4dHMgPSB0aGlzLnNvcnRDb250ZXh0c0xpc3QoY29udGV4dHMpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBjb250ZXh0cztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IG91cnMgPSBjb250ZXh0cy5vdXJzLmZpbHRlcigoY29udGV4dCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGZpbHRlck5vcm1hbGl6ZWQgPSB0aGlzLnRlcm1cclxuICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICAgICAubm9ybWFsaXplKCdORkQnKVxyXG4gICAgICAgICAgLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2csICcnKTtcclxuICAgICAgICBjb25zdCBjb250ZXh0VGl0bGVOb3JtYWxpemVkID0gY29udGV4dC50aXRsZVxyXG4gICAgICAgICAgLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAgIC5ub3JtYWxpemUoJ05GRCcpXHJcbiAgICAgICAgICAucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgJycpO1xyXG4gICAgICAgIHJldHVybiBjb250ZXh0VGl0bGVOb3JtYWxpemVkLmluY2x1ZGVzKGZpbHRlck5vcm1hbGl6ZWQpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGxldCB1cGRhdGVDb250ZXh0czogQ29udGV4dHNMaXN0ID0ge1xyXG4gICAgICAgIG91cnNcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmICh0aGlzLmNvbnRleHRzLnB1YmxpYykge1xyXG4gICAgICAgIGNvbnN0IHB1YmxpY3MgPSBjb250ZXh0cy5wdWJsaWMuZmlsdGVyKChjb250ZXh0KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBmaWx0ZXJOb3JtYWxpemVkID0gdGhpcy50ZXJtXHJcbiAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICAgICAgIC5ub3JtYWxpemUoJ05GRCcpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXS9nLCAnJyk7XHJcbiAgICAgICAgICBjb25zdCBjb250ZXh0VGl0bGVOb3JtYWxpemVkID0gY29udGV4dC50aXRsZVxyXG4gICAgICAgICAgICAudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgICAgICAubm9ybWFsaXplKCdORkQnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgJycpO1xyXG4gICAgICAgICAgcmV0dXJuIGNvbnRleHRUaXRsZU5vcm1hbGl6ZWQuaW5jbHVkZXMoZmlsdGVyTm9ybWFsaXplZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdXBkYXRlQ29udGV4dHMucHVibGljID0gcHVibGljcztcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMuY29udGV4dHMuc2hhcmVkKSB7XHJcbiAgICAgICAgY29uc3Qgc2hhcmVkID0gY29udGV4dHMuc2hhcmVkLmZpbHRlcigoY29udGV4dCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZmlsdGVyTm9ybWFsaXplZCA9IHRoaXMudGVybVxyXG4gICAgICAgICAgICAudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgICAgICAubm9ybWFsaXplKCdORkQnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgJycpO1xyXG4gICAgICAgICAgY29uc3QgY29udGV4dFRpdGxlTm9ybWFsaXplZCA9IGNvbnRleHQudGl0bGVcclxuICAgICAgICAgICAgLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAgICAgLm5vcm1hbGl6ZSgnTkZEJylcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2csICcnKTtcclxuICAgICAgICAgIHJldHVybiBjb250ZXh0VGl0bGVOb3JtYWxpemVkLmluY2x1ZGVzKGZpbHRlck5vcm1hbGl6ZWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHVwZGF0ZUNvbnRleHRzLnNoYXJlZCA9IHNoYXJlZDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMuc29ydGVkQWxwaGEpIHtcclxuICAgICAgICB1cGRhdGVDb250ZXh0cyA9IHRoaXMuc29ydENvbnRleHRzTGlzdCh1cGRhdGVDb250ZXh0cyk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHVwZGF0ZUNvbnRleHRzO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmNoYW5nZSQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2hvd0ZpbHRlcigpIHtcclxuICAgIHN3aXRjaCAodGhpcy5zaG93Q29udGV4dEZpbHRlcikge1xyXG4gICAgICBjYXNlIENvbnRleHRMaXN0Q29udHJvbHNFbnVtLmFsd2F5czpcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgY2FzZSBDb250ZXh0TGlzdENvbnRyb2xzRW51bS5uZXZlcjpcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgbGV0IHRvdGFsTGVuZ3RoID0gdGhpcy5jb250ZXh0cy5vdXJzLmxlbmd0aDtcclxuICAgICAgICB0aGlzLmNvbnRleHRzLnB1YmxpY1xyXG4gICAgICAgICAgPyAodG90YWxMZW5ndGggKz0gdGhpcy5jb250ZXh0cy5wdWJsaWMubGVuZ3RoKVxyXG4gICAgICAgICAgOiAodG90YWxMZW5ndGggKz0gMCk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0cy5zaGFyZWRcclxuICAgICAgICAgID8gKHRvdGFsTGVuZ3RoICs9IHRoaXMuY29udGV4dHMuc2hhcmVkLmxlbmd0aClcclxuICAgICAgICAgIDogKHRvdGFsTGVuZ3RoICs9IDApO1xyXG4gICAgICAgIGlmICh0b3RhbExlbmd0aCA+PSB0aGlzLnRocmVzaG9sZFRvRmlsdGVyKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc29ydENvbnRleHRzTGlzdChjb250ZXh0czogQ29udGV4dHNMaXN0KSB7XHJcbiAgICBpZiAoY29udGV4dHMpIHtcclxuICAgICAgY29uc3QgY29udGV4dHNMaXN0ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjb250ZXh0cykpO1xyXG4gICAgICBjb250ZXh0c0xpc3Qub3Vycy5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMubm9ybWFsaXplKGEudGl0bGUpIDwgdGhpcy5ub3JtYWxpemUoYi50aXRsZSkpIHtcclxuICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubm9ybWFsaXplKGEudGl0bGUpID4gdGhpcy5ub3JtYWxpemUoYi50aXRsZSkpIHtcclxuICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoY29udGV4dHNMaXN0LnNoYXJlZCkge1xyXG4gICAgICAgIGNvbnRleHRzTGlzdC5zaGFyZWQuc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICAgICAgaWYgKHRoaXMubm9ybWFsaXplKGEudGl0bGUpIDwgdGhpcy5ub3JtYWxpemUoYi50aXRsZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHRoaXMubm9ybWFsaXplKGEudGl0bGUpID4gdGhpcy5ub3JtYWxpemUoYi50aXRsZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIGlmIChjb250ZXh0c0xpc3QucHVibGljKSB7XHJcbiAgICAgICAgY29udGV4dHNMaXN0LnB1YmxpYy5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgICAgICBpZiAodGhpcy5ub3JtYWxpemUoYS50aXRsZSkgPCB0aGlzLm5vcm1hbGl6ZShiLnRpdGxlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodGhpcy5ub3JtYWxpemUoYS50aXRsZSkgPiB0aGlzLm5vcm1hbGl6ZShiLnRpdGxlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBjb250ZXh0c0xpc3Q7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBub3JtYWxpemUoc3RyOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBzdHJcclxuICAgICAgLm5vcm1hbGl6ZSgnTkZEJylcclxuICAgICAgLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2csICcnKVxyXG4gICAgICAudG9Mb3dlckNhc2UoKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZVNvcnQoc29ydEFscGhhOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLnNvcnRlZEFscGhhID0gc29ydEFscGhhO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJGaWx0ZXIoKSB7XHJcbiAgICB0aGlzLnRlcm0gPSAnJztcclxuICB9XHJcblxyXG4gIGNyZWF0ZUNvbnRleHQoZW1wdHk/OiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmRpYWxvZ1xyXG4gICAgICAub3BlbihCb29rbWFya0RpYWxvZ0NvbXBvbmVudCwgeyBkaXNhYmxlQ2xvc2U6IGZhbHNlIH0pXHJcbiAgICAgIC5hZnRlckNsb3NlZCgpXHJcbiAgICAgIC5zdWJzY3JpYmUoKHRpdGxlKSA9PiB7XHJcbiAgICAgICAgaWYgKHRpdGxlKSB7XHJcbiAgICAgICAgICB0aGlzLmNyZWF0ZS5lbWl0KHsgdGl0bGUsIGVtcHR5IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRQZXJtaXNzaW9uKHVzZXI/KTogQ29udGV4dFVzZXJQZXJtaXNzaW9uIHtcclxuICAgIGlmICh1c2VyKSB7XHJcbiAgICAgIGNvbnN0IHBlcm1pc3Npb24gPSB0aGlzLnBlcm1pc3Npb25zLmZpbmQoKHApID0+IHAubmFtZSA9PT0gdXNlci5uYW1lKTtcclxuICAgICAgcmV0dXJuIHBlcm1pc3Npb247XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1c2VyU2VsZWN0aW9uKHVzZXIsIHBhcmVudD8pIHtcclxuICAgIGNvbnN0IHBlcm1pc3Npb24gPSB0aGlzLmdldFBlcm1pc3Npb24odXNlcik7XHJcbiAgICBpZiAocGVybWlzc2lvbikge1xyXG4gICAgICBwZXJtaXNzaW9uLmNoZWNrZWQgPSAhcGVybWlzc2lvbi5jaGVja2VkO1xyXG4gICAgICB0aGlzLnN0b3JhZ2VTZXJ2aWNlLnNldChcclxuICAgICAgICAnY29udGV4dHMucGVybWlzc2lvbnMuJyArIHBlcm1pc3Npb24ubmFtZSxcclxuICAgICAgICBwZXJtaXNzaW9uLmNoZWNrZWRcclxuICAgICAgKTtcclxuICAgICAgcGVybWlzc2lvbi5pbmRldGVybWluYXRlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHBhcmVudCkge1xyXG4gICAgICBsZXQgaW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgZm9yIChjb25zdCBjIG9mIHBhcmVudC5jaGlsZHMpIHtcclxuICAgICAgICBjb25zdCBjUGVybWlzc2lvbiA9IHRoaXMuZ2V0UGVybWlzc2lvbihjKTtcclxuICAgICAgICBpZiAoY1Blcm1pc3Npb24uY2hlY2tlZCAhPT0gcGVybWlzc2lvbi5jaGVja2VkKSB7XHJcbiAgICAgICAgICBpbmRldGVybWluYXRlID0gdHJ1ZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjb25zdCBwYXJlbnRQZXJtaXNzaW9uID0gdGhpcy5nZXRQZXJtaXNzaW9uKHBhcmVudCk7XHJcbiAgICAgIGlmIChwYXJlbnRQZXJtaXNzaW9uKSB7XHJcbiAgICAgICAgcGFyZW50UGVybWlzc2lvbi5jaGVja2VkID0gcGVybWlzc2lvbi5jaGVja2VkO1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZVNlcnZpY2Uuc2V0KFxyXG4gICAgICAgICAgJ2NvbnRleHRzLnBlcm1pc3Npb25zLicgKyBwYXJlbnRQZXJtaXNzaW9uLm5hbWUsXHJcbiAgICAgICAgICBwZXJtaXNzaW9uLmNoZWNrZWRcclxuICAgICAgICApO1xyXG4gICAgICAgIHBhcmVudFBlcm1pc3Npb24uaW5kZXRlcm1pbmF0ZSA9IGluZGV0ZXJtaW5hdGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodXNlci5jaGlsZHMpIHtcclxuICAgICAgZm9yIChjb25zdCBjIG9mIHVzZXIuY2hpbGRzKSB7XHJcbiAgICAgICAgY29uc3QgY2hpbGRyZW5QZXJtaXNzaW9uID0gdGhpcy5nZXRQZXJtaXNzaW9uKGMpO1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIGNoaWxkcmVuUGVybWlzc2lvbiAmJlxyXG4gICAgICAgICAgY2hpbGRyZW5QZXJtaXNzaW9uLmNoZWNrZWQgIT09IHBlcm1pc3Npb24uY2hlY2tlZFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgY2hpbGRyZW5QZXJtaXNzaW9uLmNoZWNrZWQgPSBwZXJtaXNzaW9uLmNoZWNrZWQ7XHJcbiAgICAgICAgICB0aGlzLnN0b3JhZ2VTZXJ2aWNlLnNldChcclxuICAgICAgICAgICAgJ2NvbnRleHRzLnBlcm1pc3Npb25zLicgKyBjaGlsZHJlblBlcm1pc3Npb24ubmFtZSxcclxuICAgICAgICAgICAgcGVybWlzc2lvbi5jaGVja2VkXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZmlsdGVyUGVybWlzc2lvbnNDaGFuZ2VkLmVtaXQodGhpcy5wZXJtaXNzaW9ucyk7XHJcbiAgfVxyXG5cclxuICBoaWRlQ29udGV4dChjb250ZXh0OiBEZXRhaWxlZENvbnRleHQpIHtcclxuICAgIGNvbnRleHQuaGlkZGVuID0gdHJ1ZTtcclxuICAgIGlmICghdGhpcy5zaG93SGlkZGVuKSB7XHJcbiAgICAgIGNvbnN0IGNvbnRleHRzOiBDb250ZXh0c0xpc3QgPSB7IG91cnM6IFtdLCBzaGFyZWQ6IFtdLCBwdWJsaWM6IFtdIH07XHJcbiAgICAgIGNvbnRleHRzLm91cnMgPSB0aGlzLmNvbnRleHRzLm91cnMuZmlsdGVyKChjKSA9PiBjLmlkICE9PSBjb250ZXh0LmlkKTtcclxuICAgICAgY29udGV4dHMuc2hhcmVkID0gdGhpcy5jb250ZXh0cy5zaGFyZWQuZmlsdGVyKChjKSA9PiBjLmlkICE9PSBjb250ZXh0LmlkKTtcclxuICAgICAgY29udGV4dHMucHVibGljID0gdGhpcy5jb250ZXh0cy5wdWJsaWMuZmlsdGVyKChjKSA9PiBjLmlkICE9PSBjb250ZXh0LmlkKTtcclxuICAgICAgdGhpcy5jb250ZXh0cyA9IGNvbnRleHRzO1xyXG4gICAgfVxyXG4gICAgdGhpcy5oaWRlLmVtaXQoY29udGV4dCk7XHJcbiAgfVxyXG5cclxuICBzaG93Q29udGV4dChjb250ZXh0OiBEZXRhaWxlZENvbnRleHQpIHtcclxuICAgIGNvbnRleHQuaGlkZGVuID0gZmFsc2U7XHJcbiAgICB0aGlzLnNob3cuZW1pdChjb250ZXh0KTtcclxuICB9XHJcbn1cclxuIl19