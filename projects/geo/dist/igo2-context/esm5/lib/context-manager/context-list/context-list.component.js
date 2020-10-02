/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var ContextListComponent = /** @class */ (function () {
    function ContextListComponent(cdRef, contextService, auth, dialog, languageService, storageService) {
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
    Object.defineProperty(ContextListComponent.prototype, "contexts", {
        get: /**
         * @return {?}
         */
        function () {
            return this._contexts;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._contexts = value;
            this.cdRef.detectChanges();
            this.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextListComponent.prototype, "selectedContext", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selectedContext;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._selectedContext = value;
            this.cdRef.detectChanges();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextListComponent.prototype, "map", {
        get: /**
         * @return {?}
         */
        function () {
            return this._map;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._map = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextListComponent.prototype, "defaultContextId", {
        get: /**
         * @return {?}
         */
        function () {
            return this._defaultContextId;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._defaultContextId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextListComponent.prototype, "term", {
        get: /**
         * @return {?}
         */
        function () {
            return this._term;
        },
        /**
         * Context filter term
         */
        set: /**
         * Context filter term
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._term = value;
            this.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextListComponent.prototype, "sortedAlpha", {
        get: /**
         * @return {?}
         */
        function () {
            return this._sortedAlpha;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._sortedAlpha = value;
            this.next();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ContextListComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.change$$ = this.change$
            .pipe(debounce((/**
         * @return {?}
         */
        function () {
            return _this.contexts.ours.length === 0 ? EMPTY : timer(50);
        })))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.contexts$.next(_this.filterContextsList(_this.contexts));
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
                function () {
                    _this.createContext(true);
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
                function () {
                    _this.createContext(false);
                })
            }
        ]);
    };
    /**
     * @private
     * @return {?}
     */
    ContextListComponent.prototype.next = /**
     * @private
     * @return {?}
     */
    function () {
        this.change$.next();
    };
    /**
     * @private
     * @param {?} contexts
     * @return {?}
     */
    ContextListComponent.prototype.filterContextsList = /**
     * @private
     * @param {?} contexts
     * @return {?}
     */
    function (contexts) {
        var _this = this;
        if (this.term === '') {
            if (this.sortedAlpha) {
                contexts = this.sortContextsList(contexts);
            }
            return contexts;
        }
        else {
            /** @type {?} */
            var ours = contexts.ours.filter((/**
             * @param {?} context
             * @return {?}
             */
            function (context) {
                /** @type {?} */
                var filterNormalized = _this.term
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '');
                /** @type {?} */
                var contextTitleNormalized = context.title
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '');
                return contextTitleNormalized.includes(filterNormalized);
            }));
            /** @type {?} */
            var updateContexts = {
                ours: ours
            };
            if (this.contexts.public) {
                /** @type {?} */
                var publics = contexts.public.filter((/**
                 * @param {?} context
                 * @return {?}
                 */
                function (context) {
                    /** @type {?} */
                    var filterNormalized = _this.term
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '');
                    /** @type {?} */
                    var contextTitleNormalized = context.title
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '');
                    return contextTitleNormalized.includes(filterNormalized);
                }));
                updateContexts.public = publics;
            }
            if (this.contexts.shared) {
                /** @type {?} */
                var shared = contexts.shared.filter((/**
                 * @param {?} context
                 * @return {?}
                 */
                function (context) {
                    /** @type {?} */
                    var filterNormalized = _this.term
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '');
                    /** @type {?} */
                    var contextTitleNormalized = context.title
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
    };
    /**
     * @return {?}
     */
    ContextListComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.change$$.unsubscribe();
    };
    /**
     * @return {?}
     */
    ContextListComponent.prototype.showFilter = /**
     * @return {?}
     */
    function () {
        switch (this.showContextFilter) {
            case ContextListControlsEnum.always:
                return true;
            case ContextListControlsEnum.never:
                return false;
            default:
                /** @type {?} */
                var totalLength = this.contexts.ours.length;
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
    };
    /**
     * @param {?} contexts
     * @return {?}
     */
    ContextListComponent.prototype.sortContextsList = /**
     * @param {?} contexts
     * @return {?}
     */
    function (contexts) {
        var _this = this;
        if (contexts) {
            /** @type {?} */
            var contextsList = JSON.parse(JSON.stringify(contexts));
            contextsList.ours.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) {
                if (_this.normalize(a.title) < _this.normalize(b.title)) {
                    return -1;
                }
                if (_this.normalize(a.title) > _this.normalize(b.title)) {
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
                function (a, b) {
                    if (_this.normalize(a.title) < _this.normalize(b.title)) {
                        return -1;
                    }
                    if (_this.normalize(a.title) > _this.normalize(b.title)) {
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
                function (a, b) {
                    if (_this.normalize(a.title) < _this.normalize(b.title)) {
                        return -1;
                    }
                    if (_this.normalize(a.title) > _this.normalize(b.title)) {
                        return 1;
                    }
                    return 0;
                }));
            }
            return contextsList;
        }
    };
    /**
     * @param {?} str
     * @return {?}
     */
    ContextListComponent.prototype.normalize = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
    };
    /**
     * @param {?} sortAlpha
     * @return {?}
     */
    ContextListComponent.prototype.toggleSort = /**
     * @param {?} sortAlpha
     * @return {?}
     */
    function (sortAlpha) {
        this.sortedAlpha = sortAlpha;
    };
    /**
     * @return {?}
     */
    ContextListComponent.prototype.clearFilter = /**
     * @return {?}
     */
    function () {
        this.term = '';
    };
    /**
     * @param {?=} empty
     * @return {?}
     */
    ContextListComponent.prototype.createContext = /**
     * @param {?=} empty
     * @return {?}
     */
    function (empty) {
        var _this = this;
        this.dialog
            .open(BookmarkDialogComponent, { disableClose: false })
            .afterClosed()
            .subscribe((/**
         * @param {?} title
         * @return {?}
         */
        function (title) {
            if (title) {
                _this.create.emit({ title: title, empty: empty });
            }
        }));
    };
    /**
     * @param {?=} user
     * @return {?}
     */
    ContextListComponent.prototype.getPermission = /**
     * @param {?=} user
     * @return {?}
     */
    function (user) {
        if (user) {
            /** @type {?} */
            var permission = this.permissions.find((/**
             * @param {?} p
             * @return {?}
             */
            function (p) { return p.name === user.name; }));
            return permission;
        }
    };
    /**
     * @param {?} user
     * @param {?=} parent
     * @return {?}
     */
    ContextListComponent.prototype.userSelection = /**
     * @param {?} user
     * @param {?=} parent
     * @return {?}
     */
    function (user, parent) {
        var e_1, _a, e_2, _b;
        /** @type {?} */
        var permission = this.getPermission(user);
        if (permission) {
            permission.checked = !permission.checked;
            this.storageService.set('contexts.permissions.' + permission.name, permission.checked);
            permission.indeterminate = false;
        }
        if (parent) {
            /** @type {?} */
            var indeterminate = false;
            try {
                for (var _c = tslib_1.__values(parent.childs), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var c = _d.value;
                    /** @type {?} */
                    var cPermission = this.getPermission(c);
                    if (cPermission.checked !== permission.checked) {
                        indeterminate = true;
                        break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            /** @type {?} */
            var parentPermission = this.getPermission(parent);
            if (parentPermission) {
                parentPermission.checked = permission.checked;
                this.storageService.set('contexts.permissions.' + parentPermission.name, permission.checked);
                parentPermission.indeterminate = indeterminate;
            }
        }
        if (user.childs) {
            try {
                for (var _e = tslib_1.__values(user.childs), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var c = _f.value;
                    /** @type {?} */
                    var childrenPermission = this.getPermission(c);
                    if (childrenPermission &&
                        childrenPermission.checked !== permission.checked) {
                        childrenPermission.checked = permission.checked;
                        this.storageService.set('contexts.permissions.' + childrenPermission.name, permission.checked);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        this.filterPermissionsChanged.emit(this.permissions);
    };
    /**
     * @param {?} context
     * @return {?}
     */
    ContextListComponent.prototype.hideContext = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        context.hidden = true;
        if (!this.showHidden) {
            /** @type {?} */
            var contexts = { ours: [], shared: [], public: [] };
            contexts.ours = this.contexts.ours.filter((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c.id !== context.id; }));
            contexts.shared = this.contexts.shared.filter((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c.id !== context.id; }));
            contexts.public = this.contexts.public.filter((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c.id !== context.id; }));
            this.contexts = contexts;
        }
        this.hide.emit(context);
    };
    /**
     * @param {?} context
     * @return {?}
     */
    ContextListComponent.prototype.showContext = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        context.hidden = false;
        this.show.emit(context);
    };
    ContextListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-context-list',
                    template: "<igo-list [navigation]=\"true\">\r\n  <mat-form-field *ngIf=\"showFilter()\" [ngClass]=\"auth.authenticated ? 'context-filter-min-width' : 'context-filter-max-width'\">\r\n    <input\r\n      matInput\r\n      type=\"text\"\r\n      [placeholder]=\"'igo.context.contextManager.filterPlaceHolder' | translate\"\r\n      [(ngModel)]=\"term\">\r\n    <button\r\n      mat-button\r\n      mat-icon-button\r\n      matSuffix\r\n      class=\"clear-button\"\r\n      *ngIf=\"term.length\"\r\n      aria-label=\"Clear\"\r\n      color=\"warn\"\r\n      (click)=\"clearFilter()\">\r\n      <mat-icon svgIcon=\"close\"></mat-icon>\r\n    </button>\r\n  </mat-form-field>\r\n\r\n  <button\r\n  *ngIf=\"!sortedAlpha\"\r\n  mat-icon-button\r\n  [matTooltip]=\"'igo.context.contextManager.sortAlphabetically' | translate\"\r\n  matTooltipShowDelay=\"500\"\r\n  (click)=\"toggleSort(true)\">\r\n  <mat-icon color=\"primary\" svgIcon=\"sort-alphabetical\"></mat-icon>\r\n  </button>\r\n  <button\r\n    *ngIf=\"sortedAlpha\"\r\n    mat-icon-button\r\n    [matTooltip]=\"'igo.context.contextManager.sortContextOrder' | translate\"\r\n    matTooltipShowDelay=\"500\"\r\n    (click)=\"toggleSort(false)\">\r\n    <mat-icon color=\"warn\" svgIcon=\"sort-variant-remove\"></mat-icon>\r\n  </button>\r\n\r\n  <igo-actionbar *ngIf=\"auth.authenticated\"\r\n    class=\"add-context-button\"\r\n    [iconColor]=\"color\"\r\n    [store]=\"actionStore\"\r\n    [withIcon]=\"true\"\r\n    icon=\"plus\"\r\n    [withTitle]=\"actionbarMode === 'overlay'\"\r\n    [horizontal]=\"false\"\r\n    [mode]=\"actionbarMode\">\r\n  </igo-actionbar>\r\n\r\n  <button *ngIf=\"auth.authenticated && users && users.length\"\r\n    mat-icon-button\r\n    [matTooltip]=\"'igo.context.contextManager.filterUser' | translate\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matMenuTriggerFor]=\"accountMenu\">\r\n    <mat-icon color=\"primary\" svgIcon=\"filter-menu\"></mat-icon>\r\n  </button>\r\n\r\n  <mat-menu #accountMenu=\"matMenu\">\r\n    <ng-container *ngFor=\"let user of users\">\r\n      <span class=\"profilsMenu\">\r\n        <mat-checkbox\r\n          class=\"mat-menu-item\"\r\n          [checked]=\"getPermission(user).checked\"\r\n          [indeterminate]=\"getPermission(user).indeterminate\"\r\n          (click)=\"$event.stopPropagation()\"\r\n          (change)=\"userSelection(user)\">\r\n        </mat-checkbox>\r\n        <button *ngIf=\"user.childs\"\r\n          [matMenuTriggerFor]=\"subAccountMenu\"\r\n          mat-menu-item>\r\n          {{user.title}}\r\n        </button>\r\n        <button\r\n          mat-menu-item\r\n          *ngIf=\"!user.childs\">\r\n          {{user.title}}\r\n        </button>\r\n      </span>\r\n\r\n      <mat-menu #subAccountMenu=\"matMenu\">\r\n        <mat-checkbox *ngFor=\"let child of user.childs\"\r\n          class=\"mat-menu-item\"\r\n          [checked]=\"getPermission(child).checked\"\r\n          (click)=\"$event.stopPropagation()\"\r\n          (change)=\"userSelection(child, user)\">\r\n          {{child.title}}\r\n        </mat-checkbox>\r\n      </mat-menu>\r\n    </ng-container>\r\n\r\n    <span class=\"profilsMenu\">\r\n      <mat-checkbox\r\n        class=\"mat-menu-item\"\r\n        [checked]=\"showHidden\"\r\n        (click)=\"$event.stopPropagation()\"\r\n        (change)=\"showHiddenContexts.emit()\">\r\n      </mat-checkbox>\r\n      <button mat-menu-item>\r\n        {{ 'igo.context.contextManager.showHidden' | translate }}\r\n      </button>\r\n    </span>\r\n  </mat-menu>\r\n\r\n  <ng-template ngFor let-groupContexts [ngForOf]=\"contexts$ | async | keyvalue\">\r\n\r\n    <igo-collapsible *ngIf=\"groupContexts.value.length && auth.authenticated\" [title]=\"titleMapping[groupContexts.key] | translate\"\r\n      [collapsed]=\"collapsed[titleMapping[groupContexts.key]]\" (toggle)=\"collapsed[titleMapping[groupContexts.key]] = $event\">\r\n\r\n      <ng-template ngFor let-context [ngForOf]=\"groupContexts.value\">\r\n        <igo-context-item\r\n          igoListItem\r\n          color=\"accent\"\r\n          [selected]=\"selectedContext && selectedContext.uri === context.uri\"\r\n          [context]=\"context\"\r\n          [default]=\"context.id && this.defaultContextId && this.defaultContextId === context.id\"\r\n          (edit)=\"edit.emit(context)\"\r\n          (delete)=\"delete.emit(context)\"\r\n          (clone)=\"clone.emit(context)\"\r\n          (save)=\"save.emit(context)\"\r\n          (hide)=\"hideContext(context)\"\r\n          (show)=\"showContext(context)\"\r\n          (favorite)=\"favorite.emit(context)\"\r\n          (manageTools)=\"manageTools.emit(context)\"\r\n          (managePermissions)=\"managePermissions.emit(context)\"\r\n          (select)=\"select.emit(context)\"\r\n          (unselect)=\"unselect.emit(context)\">\r\n        </igo-context-item>\r\n      </ng-template>\r\n\r\n    </igo-collapsible>\r\n\r\n    <ng-template *ngIf=\"groupContexts.value.length && !auth.authenticated\" ngFor let-context [ngForOf]=\"groupContexts.value\">\r\n      <igo-context-item\r\n        igoListItem\r\n        color=\"accent\"\r\n        [selected]=\"selectedContext && selectedContext.uri === context.uri\"\r\n        [context]=\"context\"\r\n        [default]=\"this.defaultContextId === context.id\"\r\n        (select)=\"select.emit(context)\"\r\n        (unselect)=\"unselect.emit(context)\">\r\n      </igo-context-item>\r\n    </ng-template>\r\n\r\n  </ng-template>\r\n</igo-list>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".context-filter-max-width{width:calc(100% - 100px);margin:5px;padding-left:6px}.context-filter-min-width{width:calc(100% - 135px);margin:5px;padding-left:6px}.clear-button{padding-right:5px}mat-form-field{height:40px}.profilsMenu{display:-webkit-box;display:flex}.profilsMenu>mat-checkbox{width:8px}.add-context-button{margin:0;width:40px;display:-webkit-inline-box;display:inline-flex}"]
                }] }
    ];
    /** @nocollapse */
    ContextListComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ContextService },
        { type: AuthService },
        { type: MatDialog },
        { type: LanguageService },
        { type: StorageService }
    ]; };
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
    return ContextListComponent;
}());
export { ContextListComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tYW5hZ2VyL2NvbnRleHQtbGlzdC9jb250ZXh0LWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixpQkFBaUIsRUFFakIsdUJBQXVCLEVBRXhCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDN0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQVFuQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM5RCxPQUFPLEVBRUwsZUFBZSxFQUNmLGFBQWEsRUFDYixLQUFLLEVBQ0wsS0FBSyxFQUNOLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9FQUFvRSxDQUFDO0FBQzdHLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFM0Q7SUFvSEUsOEJBQ1UsS0FBd0IsRUFDeEIsY0FBOEIsRUFDL0IsSUFBaUIsRUFDaEIsTUFBaUIsRUFDakIsZUFBZ0MsRUFDaEMsY0FBOEI7UUFMOUIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFDeEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQy9CLFNB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LDJDQUFpRDs7SUFFakQsMkNBQXlDOztJQUN6Qyw2Q0FBNkM7O0lBRTdDLHFDQUF5Qjs7SUFFekIsMENBQTBCOztJQWExQixxQ0FBMEI7Ozs7O0lBUzFCLDRDQUEwQzs7SUFFMUMsaURBQTBEOztJQUUxRCxpREFBNkI7Ozs7O0lBRzNCLHFDQUFnQzs7Ozs7SUFDaEMsOENBQXNDOztJQUN0QyxvQ0FBd0I7Ozs7O0lBQ3hCLHNDQUF5Qjs7Ozs7SUFDekIsK0NBQXdDOzs7OztJQUN4Qyw4Q0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIE9uSW5pdCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBPbkRlc3Ryb3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvYXV0aCc7XHJcbmltcG9ydCB7IExhbmd1YWdlU2VydmljZSwgU3RvcmFnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnQGlnbzIvZ2VvJztcclxuXHJcbmltcG9ydCB7XHJcbiAgRGV0YWlsZWRDb250ZXh0LFxyXG4gIENvbnRleHRzTGlzdCxcclxuICBDb250ZXh0VXNlclBlcm1pc3Npb24sXHJcbiAgQ29udGV4dFByb2ZpbHNcclxufSBmcm9tICcuLi9zaGFyZWQvY29udGV4dC5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBDb250ZXh0TGlzdENvbnRyb2xzRW51bSB9IGZyb20gJy4vY29udGV4dC1saXN0LmVudW0nO1xyXG5pbXBvcnQge1xyXG4gIFN1YnNjcmlwdGlvbixcclxuICBCZWhhdmlvclN1YmplY3QsXHJcbiAgUmVwbGF5U3ViamVjdCxcclxuICBFTVBUWSxcclxuICB0aW1lclxyXG59IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCB7IEJvb2ttYXJrRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29udGV4dC1tYXAtYnV0dG9uL2Jvb2ttYXJrLWJ1dHRvbi9ib29rbWFyay1kaWFsb2cuY29tcG9uZW50JztcclxuaW1wb3J0IHsgZGVib3VuY2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IEFjdGlvblN0b3JlLCBBY3Rpb25iYXJNb2RlIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuaW1wb3J0IHsgQ29udGV4dFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvY29udGV4dC5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWNvbnRleHQtbGlzdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbnRleHQtbGlzdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vY29udGV4dC1saXN0LmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbnRleHRMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgY29udGV4dHNJbml0aWFsOiBDb250ZXh0c0xpc3QgPSB7IG91cnM6IFtdIH07XHJcbiAgY29udGV4dHMkOiBCZWhhdmlvclN1YmplY3Q8Q29udGV4dHNMaXN0PiA9IG5ldyBCZWhhdmlvclN1YmplY3QoXHJcbiAgICB0aGlzLmNvbnRleHRzSW5pdGlhbFxyXG4gICk7XHJcblxyXG4gIGNoYW5nZSQgPSBuZXcgUmVwbGF5U3ViamVjdDx2b2lkPigxKTtcclxuXHJcbiAgcHJpdmF0ZSBjaGFuZ2UkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBjb250ZXh0cygpOiBDb250ZXh0c0xpc3Qge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHRzO1xyXG4gIH1cclxuICBzZXQgY29udGV4dHModmFsdWU6IENvbnRleHRzTGlzdCkge1xyXG4gICAgdGhpcy5fY29udGV4dHMgPSB2YWx1ZTtcclxuICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgdGhpcy5uZXh0KCk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2NvbnRleHRzOiBDb250ZXh0c0xpc3QgPSB7IG91cnM6IFtdIH07XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHNlbGVjdGVkQ29udGV4dCgpOiBEZXRhaWxlZENvbnRleHQge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkQ29udGV4dDtcclxuICB9XHJcbiAgc2V0IHNlbGVjdGVkQ29udGV4dCh2YWx1ZTogRGV0YWlsZWRDb250ZXh0KSB7XHJcbiAgICB0aGlzLl9zZWxlY3RlZENvbnRleHQgPSB2YWx1ZTtcclxuICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuICBwcml2YXRlIF9zZWxlY3RlZENvbnRleHQ6IERldGFpbGVkQ29udGV4dDtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgbWFwKCk6IElnb01hcCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWFwO1xyXG4gIH1cclxuICBzZXQgbWFwKHZhbHVlOiBJZ29NYXApIHtcclxuICAgIHRoaXMuX21hcCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9tYXA6IElnb01hcDtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgZGVmYXVsdENvbnRleHRJZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRDb250ZXh0SWQ7XHJcbiAgfVxyXG4gIHNldCBkZWZhdWx0Q29udGV4dElkKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2RlZmF1bHRDb250ZXh0SWQgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfZGVmYXVsdENvbnRleHRJZDogc3RyaW5nO1xyXG5cclxuICBwdWJsaWMgY29sbGFwc2VkOiB7IGNvbnRleHRTY29wZSB9W10gPSBbXTtcclxuXHJcbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8RGV0YWlsZWRDb250ZXh0PigpO1xyXG4gIEBPdXRwdXQoKSB1bnNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8RGV0YWlsZWRDb250ZXh0PigpO1xyXG4gIEBPdXRwdXQoKSBlZGl0ID0gbmV3IEV2ZW50RW1pdHRlcjxEZXRhaWxlZENvbnRleHQ+KCk7XHJcbiAgQE91dHB1dCgpIGRlbGV0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8RGV0YWlsZWRDb250ZXh0PigpO1xyXG4gIEBPdXRwdXQoKSBzYXZlID0gbmV3IEV2ZW50RW1pdHRlcjxEZXRhaWxlZENvbnRleHQ+KCk7XHJcbiAgQE91dHB1dCgpIGNsb25lID0gbmV3IEV2ZW50RW1pdHRlcjxEZXRhaWxlZENvbnRleHQ+KCk7XHJcbiAgQE91dHB1dCgpIGNyZWF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8eyB0aXRsZTogc3RyaW5nOyBlbXB0eTogYm9vbGVhbiB9PigpO1xyXG4gIEBPdXRwdXQoKSBoaWRlID0gbmV3IEV2ZW50RW1pdHRlcjxEZXRhaWxlZENvbnRleHQ+KCk7XHJcbiAgQE91dHB1dCgpIHNob3cgPSBuZXcgRXZlbnRFbWl0dGVyPERldGFpbGVkQ29udGV4dD4oKTtcclxuICBAT3V0cHV0KCkgc2hvd0hpZGRlbkNvbnRleHRzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG4gIEBPdXRwdXQoKSBmYXZvcml0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8RGV0YWlsZWRDb250ZXh0PigpO1xyXG4gIEBPdXRwdXQoKSBtYW5hZ2VQZXJtaXNzaW9ucyA9IG5ldyBFdmVudEVtaXR0ZXI8RGV0YWlsZWRDb250ZXh0PigpO1xyXG4gIEBPdXRwdXQoKSBtYW5hZ2VUb29scyA9IG5ldyBFdmVudEVtaXR0ZXI8RGV0YWlsZWRDb250ZXh0PigpO1xyXG4gIEBPdXRwdXQoKSBmaWx0ZXJQZXJtaXNzaW9uc0NoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFxyXG4gICAgQ29udGV4dFVzZXJQZXJtaXNzaW9uW11cclxuICA+KCk7XHJcblxyXG4gIHB1YmxpYyB0aXRsZU1hcHBpbmcgPSB7XHJcbiAgICBvdXJzOiAnaWdvLmNvbnRleHQuY29udGV4dE1hbmFnZXIub3VyQ29udGV4dHMnLFxyXG4gICAgc2hhcmVkOiAnaWdvLmNvbnRleHQuY29udGV4dE1hbmFnZXIuc2hhcmVkQ29udGV4dHMnLFxyXG4gICAgcHVibGljOiAnaWdvLmNvbnRleHQuY29udGV4dE1hbmFnZXIucHVibGljQ29udGV4dHMnXHJcbiAgfTtcclxuXHJcbiAgcHVibGljIHVzZXJzOiBDb250ZXh0UHJvZmlsc1tdO1xyXG4gIHB1YmxpYyBwZXJtaXNzaW9uczogQ29udGV4dFVzZXJQZXJtaXNzaW9uW10gPSBbXTtcclxuXHJcbiAgcHVibGljIGFjdGlvblN0b3JlID0gbmV3IEFjdGlvblN0b3JlKFtdKTtcclxuICBwdWJsaWMgYWN0aW9uYmFyTW9kZSA9IEFjdGlvbmJhck1vZGUuT3ZlcmxheTtcclxuXHJcbiAgcHVibGljIGNvbG9yID0gJ3ByaW1hcnknO1xyXG5cclxuICBwdWJsaWMgc2hvd0hpZGRlbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBDb250ZXh0IGZpbHRlciB0ZXJtXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBzZXQgdGVybSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl90ZXJtID0gdmFsdWU7XHJcbiAgICB0aGlzLm5leHQoKTtcclxuICB9XHJcbiAgZ2V0IHRlcm0oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl90ZXJtO1xyXG4gIH1cclxuICBwdWJsaWMgX3Rlcm06IHN0cmluZyA9ICcnO1xyXG5cclxuICBnZXQgc29ydGVkQWxwaGEoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fc29ydGVkQWxwaGE7XHJcbiAgfVxyXG4gIHNldCBzb3J0ZWRBbHBoYSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fc29ydGVkQWxwaGEgPSB2YWx1ZTtcclxuICAgIHRoaXMubmV4dCgpO1xyXG4gIH1cclxuICBwcml2YXRlIF9zb3J0ZWRBbHBoYTogYm9vbGVhbiA9IHVuZGVmaW5lZDtcclxuXHJcbiAgcHVibGljIHNob3dDb250ZXh0RmlsdGVyID0gQ29udGV4dExpc3RDb250cm9sc0VudW0uYWx3YXlzO1xyXG5cclxuICBwdWJsaWMgdGhyZXNob2xkVG9GaWx0ZXIgPSA1O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgcHJpdmF0ZSBjb250ZXh0U2VydmljZTogQ29udGV4dFNlcnZpY2UsXHJcbiAgICBwdWJsaWMgYXV0aDogQXV0aFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGRpYWxvZzogTWF0RGlhbG9nLFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgc3RvcmFnZVNlcnZpY2U6IFN0b3JhZ2VTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuY2hhbmdlJCQgPSB0aGlzLmNoYW5nZSRcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgZGVib3VuY2UoKCkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dHMub3Vycy5sZW5ndGggPT09IDAgPyBFTVBUWSA6IHRpbWVyKDUwKTtcclxuICAgICAgICB9KVxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuY29udGV4dHMkLm5leHQodGhpcy5maWx0ZXJDb250ZXh0c0xpc3QodGhpcy5jb250ZXh0cykpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB0aGlzLmFjdGlvblN0b3JlLmxvYWQoW1xyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICdlbXB0eUNvbnRleHQnLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5lbXB0eUNvbnRleHQnXHJcbiAgICAgICAgKSxcclxuICAgICAgICBpY29uOiAnbWFwLW91dGxpbmUnLFxyXG4gICAgICAgIHRvb2x0aXA6IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgJ2lnby5jb250ZXh0LmNvbnRleHRNYW5hZ2VyLmVtcHR5Q29udGV4dFRvb2x0aXAnXHJcbiAgICAgICAgKSxcclxuICAgICAgICBoYW5kbGVyOiAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNyZWF0ZUNvbnRleHQodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICdjb250ZXh0RnJvbU1hcCcsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgJ2lnby5jb250ZXh0LmNvbnRleHRNYW5hZ2VyLmNvbnRleHRNYXAnXHJcbiAgICAgICAgKSxcclxuICAgICAgICBpY29uOiAnbWFwLWNoZWNrJyxcclxuICAgICAgICB0b29sdGlwOiB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5jb250ZXh0TWFwVG9vbHRpcCdcclxuICAgICAgICApLFxyXG4gICAgICAgIGhhbmRsZXI6ICgpID0+IHtcclxuICAgICAgICAgIHRoaXMuY3JlYXRlQ29udGV4dChmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICBdKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbmV4dCgpIHtcclxuICAgIHRoaXMuY2hhbmdlJC5uZXh0KCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZpbHRlckNvbnRleHRzTGlzdChjb250ZXh0czogQ29udGV4dHNMaXN0KSB7XHJcbiAgICBpZiAodGhpcy50ZXJtID09PSAnJykge1xyXG4gICAgICBpZiAodGhpcy5zb3J0ZWRBbHBoYSkge1xyXG4gICAgICAgIGNvbnRleHRzID0gdGhpcy5zb3J0Q29udGV4dHNMaXN0KGNvbnRleHRzKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gY29udGV4dHM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBvdXJzID0gY29udGV4dHMub3Vycy5maWx0ZXIoKGNvbnRleHQpID0+IHtcclxuICAgICAgICBjb25zdCBmaWx0ZXJOb3JtYWxpemVkID0gdGhpcy50ZXJtXHJcbiAgICAgICAgICAudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgICAgLm5vcm1hbGl6ZSgnTkZEJylcclxuICAgICAgICAgIC5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXS9nLCAnJyk7XHJcbiAgICAgICAgY29uc3QgY29udGV4dFRpdGxlTm9ybWFsaXplZCA9IGNvbnRleHQudGl0bGVcclxuICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICAgICAubm9ybWFsaXplKCdORkQnKVxyXG4gICAgICAgICAgLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2csICcnKTtcclxuICAgICAgICByZXR1cm4gY29udGV4dFRpdGxlTm9ybWFsaXplZC5pbmNsdWRlcyhmaWx0ZXJOb3JtYWxpemVkKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBsZXQgdXBkYXRlQ29udGV4dHM6IENvbnRleHRzTGlzdCA9IHtcclxuICAgICAgICBvdXJzXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAodGhpcy5jb250ZXh0cy5wdWJsaWMpIHtcclxuICAgICAgICBjb25zdCBwdWJsaWNzID0gY29udGV4dHMucHVibGljLmZpbHRlcigoY29udGV4dCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZmlsdGVyTm9ybWFsaXplZCA9IHRoaXMudGVybVxyXG4gICAgICAgICAgICAudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgICAgICAubm9ybWFsaXplKCdORkQnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgJycpO1xyXG4gICAgICAgICAgY29uc3QgY29udGV4dFRpdGxlTm9ybWFsaXplZCA9IGNvbnRleHQudGl0bGVcclxuICAgICAgICAgICAgLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAgICAgLm5vcm1hbGl6ZSgnTkZEJylcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2csICcnKTtcclxuICAgICAgICAgIHJldHVybiBjb250ZXh0VGl0bGVOb3JtYWxpemVkLmluY2x1ZGVzKGZpbHRlck5vcm1hbGl6ZWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHVwZGF0ZUNvbnRleHRzLnB1YmxpYyA9IHB1YmxpY3M7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLmNvbnRleHRzLnNoYXJlZCkge1xyXG4gICAgICAgIGNvbnN0IHNoYXJlZCA9IGNvbnRleHRzLnNoYXJlZC5maWx0ZXIoKGNvbnRleHQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGZpbHRlck5vcm1hbGl6ZWQgPSB0aGlzLnRlcm1cclxuICAgICAgICAgICAgLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAgICAgLm5vcm1hbGl6ZSgnTkZEJylcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2csICcnKTtcclxuICAgICAgICAgIGNvbnN0IGNvbnRleHRUaXRsZU5vcm1hbGl6ZWQgPSBjb250ZXh0LnRpdGxlXHJcbiAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICAgICAgIC5ub3JtYWxpemUoJ05GRCcpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXS9nLCAnJyk7XHJcbiAgICAgICAgICByZXR1cm4gY29udGV4dFRpdGxlTm9ybWFsaXplZC5pbmNsdWRlcyhmaWx0ZXJOb3JtYWxpemVkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB1cGRhdGVDb250ZXh0cy5zaGFyZWQgPSBzaGFyZWQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLnNvcnRlZEFscGhhKSB7XHJcbiAgICAgICAgdXBkYXRlQ29udGV4dHMgPSB0aGlzLnNvcnRDb250ZXh0c0xpc3QodXBkYXRlQ29udGV4dHMpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB1cGRhdGVDb250ZXh0cztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5jaGFuZ2UkJC51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNob3dGaWx0ZXIoKSB7XHJcbiAgICBzd2l0Y2ggKHRoaXMuc2hvd0NvbnRleHRGaWx0ZXIpIHtcclxuICAgICAgY2FzZSBDb250ZXh0TGlzdENvbnRyb2xzRW51bS5hbHdheXM6XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIGNhc2UgQ29udGV4dExpc3RDb250cm9sc0VudW0ubmV2ZXI6XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGxldCB0b3RhbExlbmd0aCA9IHRoaXMuY29udGV4dHMub3Vycy5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0cy5wdWJsaWNcclxuICAgICAgICAgID8gKHRvdGFsTGVuZ3RoICs9IHRoaXMuY29udGV4dHMucHVibGljLmxlbmd0aClcclxuICAgICAgICAgIDogKHRvdGFsTGVuZ3RoICs9IDApO1xyXG4gICAgICAgIHRoaXMuY29udGV4dHMuc2hhcmVkXHJcbiAgICAgICAgICA/ICh0b3RhbExlbmd0aCArPSB0aGlzLmNvbnRleHRzLnNoYXJlZC5sZW5ndGgpXHJcbiAgICAgICAgICA6ICh0b3RhbExlbmd0aCArPSAwKTtcclxuICAgICAgICBpZiAodG90YWxMZW5ndGggPj0gdGhpcy50aHJlc2hvbGRUb0ZpbHRlcikge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNvcnRDb250ZXh0c0xpc3QoY29udGV4dHM6IENvbnRleHRzTGlzdCkge1xyXG4gICAgaWYgKGNvbnRleHRzKSB7XHJcbiAgICAgIGNvbnN0IGNvbnRleHRzTGlzdCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY29udGV4dHMpKTtcclxuICAgICAgY29udGV4dHNMaXN0Lm91cnMuc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLm5vcm1hbGl6ZShhLnRpdGxlKSA8IHRoaXMubm9ybWFsaXplKGIudGl0bGUpKSB7XHJcbiAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm5vcm1hbGl6ZShhLnRpdGxlKSA+IHRoaXMubm9ybWFsaXplKGIudGl0bGUpKSB7XHJcbiAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKGNvbnRleHRzTGlzdC5zaGFyZWQpIHtcclxuICAgICAgICBjb250ZXh0c0xpc3Quc2hhcmVkLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLm5vcm1hbGl6ZShhLnRpdGxlKSA8IHRoaXMubm9ybWFsaXplKGIudGl0bGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0aGlzLm5vcm1hbGl6ZShhLnRpdGxlKSA+IHRoaXMubm9ybWFsaXplKGIudGl0bGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoY29udGV4dHNMaXN0LnB1YmxpYykge1xyXG4gICAgICAgIGNvbnRleHRzTGlzdC5wdWJsaWMuc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICAgICAgaWYgKHRoaXMubm9ybWFsaXplKGEudGl0bGUpIDwgdGhpcy5ub3JtYWxpemUoYi50aXRsZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHRoaXMubm9ybWFsaXplKGEudGl0bGUpID4gdGhpcy5ub3JtYWxpemUoYi50aXRsZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gY29udGV4dHNMaXN0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbm9ybWFsaXplKHN0cjogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gc3RyXHJcbiAgICAgIC5ub3JtYWxpemUoJ05GRCcpXHJcbiAgICAgIC5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXS9nLCAnJylcclxuICAgICAgLnRvTG93ZXJDYXNlKCk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVTb3J0KHNvcnRBbHBoYTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5zb3J0ZWRBbHBoYSA9IHNvcnRBbHBoYTtcclxuICB9XHJcblxyXG4gIGNsZWFyRmlsdGVyKCkge1xyXG4gICAgdGhpcy50ZXJtID0gJyc7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVDb250ZXh0KGVtcHR5PzogYm9vbGVhbikge1xyXG4gICAgdGhpcy5kaWFsb2dcclxuICAgICAgLm9wZW4oQm9va21hcmtEaWFsb2dDb21wb25lbnQsIHsgZGlzYWJsZUNsb3NlOiBmYWxzZSB9KVxyXG4gICAgICAuYWZ0ZXJDbG9zZWQoKVxyXG4gICAgICAuc3Vic2NyaWJlKCh0aXRsZSkgPT4ge1xyXG4gICAgICAgIGlmICh0aXRsZSkge1xyXG4gICAgICAgICAgdGhpcy5jcmVhdGUuZW1pdCh7IHRpdGxlLCBlbXB0eSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0UGVybWlzc2lvbih1c2VyPyk6IENvbnRleHRVc2VyUGVybWlzc2lvbiB7XHJcbiAgICBpZiAodXNlcikge1xyXG4gICAgICBjb25zdCBwZXJtaXNzaW9uID0gdGhpcy5wZXJtaXNzaW9ucy5maW5kKChwKSA9PiBwLm5hbWUgPT09IHVzZXIubmFtZSk7XHJcbiAgICAgIHJldHVybiBwZXJtaXNzaW9uO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXNlclNlbGVjdGlvbih1c2VyLCBwYXJlbnQ/KSB7XHJcbiAgICBjb25zdCBwZXJtaXNzaW9uID0gdGhpcy5nZXRQZXJtaXNzaW9uKHVzZXIpO1xyXG4gICAgaWYgKHBlcm1pc3Npb24pIHtcclxuICAgICAgcGVybWlzc2lvbi5jaGVja2VkID0gIXBlcm1pc3Npb24uY2hlY2tlZDtcclxuICAgICAgdGhpcy5zdG9yYWdlU2VydmljZS5zZXQoXHJcbiAgICAgICAgJ2NvbnRleHRzLnBlcm1pc3Npb25zLicgKyBwZXJtaXNzaW9uLm5hbWUsXHJcbiAgICAgICAgcGVybWlzc2lvbi5jaGVja2VkXHJcbiAgICAgICk7XHJcbiAgICAgIHBlcm1pc3Npb24uaW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwYXJlbnQpIHtcclxuICAgICAgbGV0IGluZGV0ZXJtaW5hdGUgPSBmYWxzZTtcclxuXHJcbiAgICAgIGZvciAoY29uc3QgYyBvZiBwYXJlbnQuY2hpbGRzKSB7XHJcbiAgICAgICAgY29uc3QgY1Blcm1pc3Npb24gPSB0aGlzLmdldFBlcm1pc3Npb24oYyk7XHJcbiAgICAgICAgaWYgKGNQZXJtaXNzaW9uLmNoZWNrZWQgIT09IHBlcm1pc3Npb24uY2hlY2tlZCkge1xyXG4gICAgICAgICAgaW5kZXRlcm1pbmF0ZSA9IHRydWU7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgcGFyZW50UGVybWlzc2lvbiA9IHRoaXMuZ2V0UGVybWlzc2lvbihwYXJlbnQpO1xyXG4gICAgICBpZiAocGFyZW50UGVybWlzc2lvbikge1xyXG4gICAgICAgIHBhcmVudFBlcm1pc3Npb24uY2hlY2tlZCA9IHBlcm1pc3Npb24uY2hlY2tlZDtcclxuICAgICAgICB0aGlzLnN0b3JhZ2VTZXJ2aWNlLnNldChcclxuICAgICAgICAgICdjb250ZXh0cy5wZXJtaXNzaW9ucy4nICsgcGFyZW50UGVybWlzc2lvbi5uYW1lLFxyXG4gICAgICAgICAgcGVybWlzc2lvbi5jaGVja2VkXHJcbiAgICAgICAgKTtcclxuICAgICAgICBwYXJlbnRQZXJtaXNzaW9uLmluZGV0ZXJtaW5hdGUgPSBpbmRldGVybWluYXRlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHVzZXIuY2hpbGRzKSB7XHJcbiAgICAgIGZvciAoY29uc3QgYyBvZiB1c2VyLmNoaWxkcykge1xyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuUGVybWlzc2lvbiA9IHRoaXMuZ2V0UGVybWlzc2lvbihjKTtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICBjaGlsZHJlblBlcm1pc3Npb24gJiZcclxuICAgICAgICAgIGNoaWxkcmVuUGVybWlzc2lvbi5jaGVja2VkICE9PSBwZXJtaXNzaW9uLmNoZWNrZWRcclxuICAgICAgICApIHtcclxuICAgICAgICAgIGNoaWxkcmVuUGVybWlzc2lvbi5jaGVja2VkID0gcGVybWlzc2lvbi5jaGVja2VkO1xyXG4gICAgICAgICAgdGhpcy5zdG9yYWdlU2VydmljZS5zZXQoXHJcbiAgICAgICAgICAgICdjb250ZXh0cy5wZXJtaXNzaW9ucy4nICsgY2hpbGRyZW5QZXJtaXNzaW9uLm5hbWUsXHJcbiAgICAgICAgICAgIHBlcm1pc3Npb24uY2hlY2tlZFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmZpbHRlclBlcm1pc3Npb25zQ2hhbmdlZC5lbWl0KHRoaXMucGVybWlzc2lvbnMpO1xyXG4gIH1cclxuXHJcbiAgaGlkZUNvbnRleHQoY29udGV4dDogRGV0YWlsZWRDb250ZXh0KSB7XHJcbiAgICBjb250ZXh0LmhpZGRlbiA9IHRydWU7XHJcbiAgICBpZiAoIXRoaXMuc2hvd0hpZGRlbikge1xyXG4gICAgICBjb25zdCBjb250ZXh0czogQ29udGV4dHNMaXN0ID0geyBvdXJzOiBbXSwgc2hhcmVkOiBbXSwgcHVibGljOiBbXSB9O1xyXG4gICAgICBjb250ZXh0cy5vdXJzID0gdGhpcy5jb250ZXh0cy5vdXJzLmZpbHRlcigoYykgPT4gYy5pZCAhPT0gY29udGV4dC5pZCk7XHJcbiAgICAgIGNvbnRleHRzLnNoYXJlZCA9IHRoaXMuY29udGV4dHMuc2hhcmVkLmZpbHRlcigoYykgPT4gYy5pZCAhPT0gY29udGV4dC5pZCk7XHJcbiAgICAgIGNvbnRleHRzLnB1YmxpYyA9IHRoaXMuY29udGV4dHMucHVibGljLmZpbHRlcigoYykgPT4gYy5pZCAhPT0gY29udGV4dC5pZCk7XHJcbiAgICAgIHRoaXMuY29udGV4dHMgPSBjb250ZXh0cztcclxuICAgIH1cclxuICAgIHRoaXMuaGlkZS5lbWl0KGNvbnRleHQpO1xyXG4gIH1cclxuXHJcbiAgc2hvd0NvbnRleHQoY29udGV4dDogRGV0YWlsZWRDb250ZXh0KSB7XHJcbiAgICBjb250ZXh0LmhpZGRlbiA9IGZhbHNlO1xyXG4gICAgdGhpcy5zaG93LmVtaXQoY29udGV4dCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==