import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { DetailedContext, ContextsList } from '../shared/context.interface';
export declare class ContextListComponent {
    private cdRef;
    contexts: ContextsList;
    private _contexts;
    selectedContext: DetailedContext;
    private _selectedContext;
    defaultContextId: string;
    private _defaultContextId;
    select: EventEmitter<DetailedContext>;
    unselect: EventEmitter<DetailedContext>;
    edit: EventEmitter<DetailedContext>;
    delete: EventEmitter<DetailedContext>;
    save: EventEmitter<DetailedContext>;
    clone: EventEmitter<DetailedContext>;
    favorite: EventEmitter<DetailedContext>;
    managePermissions: EventEmitter<DetailedContext>;
    manageTools: EventEmitter<DetailedContext>;
    titleMapping: {
        ours: string;
        shared: string;
        public: string;
    };
    constructor(cdRef: ChangeDetectorRef);
}
