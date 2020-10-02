import { EventEmitter, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@igo2/auth';
import { LanguageService, StorageService } from '@igo2/core';
import { IgoMap } from '@igo2/geo';
import { DetailedContext, ContextsList, ContextUserPermission, ContextProfils } from '../shared/context.interface';
import { ContextListControlsEnum } from './context-list.enum';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ActionStore, ActionbarMode } from '@igo2/common';
import { ContextService } from '../shared/context.service';
export declare class ContextListComponent implements OnInit, OnDestroy {
    private cdRef;
    private contextService;
    auth: AuthService;
    private dialog;
    private languageService;
    private storageService;
    private contextsInitial;
    contexts$: BehaviorSubject<ContextsList>;
    change$: ReplaySubject<void>;
    private change$$;
    contexts: ContextsList;
    private _contexts;
    selectedContext: DetailedContext;
    private _selectedContext;
    map: IgoMap;
    private _map;
    defaultContextId: string;
    private _defaultContextId;
    collapsed: {
        contextScope: any;
    }[];
    select: EventEmitter<DetailedContext>;
    unselect: EventEmitter<DetailedContext>;
    edit: EventEmitter<DetailedContext>;
    delete: EventEmitter<DetailedContext>;
    save: EventEmitter<DetailedContext>;
    clone: EventEmitter<DetailedContext>;
    create: EventEmitter<{
        title: string;
        empty: boolean;
    }>;
    hide: EventEmitter<DetailedContext>;
    show: EventEmitter<DetailedContext>;
    showHiddenContexts: EventEmitter<boolean>;
    favorite: EventEmitter<DetailedContext>;
    managePermissions: EventEmitter<DetailedContext>;
    manageTools: EventEmitter<DetailedContext>;
    filterPermissionsChanged: EventEmitter<ContextUserPermission[]>;
    titleMapping: {
        ours: string;
        shared: string;
        public: string;
    };
    users: ContextProfils[];
    permissions: ContextUserPermission[];
    actionStore: ActionStore;
    actionbarMode: ActionbarMode;
    color: string;
    showHidden: boolean;
    /**
     * Context filter term
     */
    term: string;
    _term: string;
    sortedAlpha: boolean;
    private _sortedAlpha;
    showContextFilter: ContextListControlsEnum;
    thresholdToFilter: number;
    constructor(cdRef: ChangeDetectorRef, contextService: ContextService, auth: AuthService, dialog: MatDialog, languageService: LanguageService, storageService: StorageService);
    ngOnInit(): void;
    private next;
    private filterContextsList;
    ngOnDestroy(): void;
    showFilter(): boolean;
    sortContextsList(contexts: ContextsList): any;
    normalize(str: string): string;
    toggleSort(sortAlpha: boolean): void;
    clearFilter(): void;
    createContext(empty?: boolean): void;
    getPermission(user?: any): ContextUserPermission;
    userSelection(user: any, parent?: any): void;
    hideContext(context: DetailedContext): void;
    showContext(context: DetailedContext): void;
}
