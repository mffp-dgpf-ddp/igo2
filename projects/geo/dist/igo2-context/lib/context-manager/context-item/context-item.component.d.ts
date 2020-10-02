import { EventEmitter } from '@angular/core';
import { StorageService } from '@igo2/core';
import { AuthService } from '@igo2/auth';
import { TypePermission } from '../shared/context.enum';
import { DetailedContext } from '../shared/context.interface';
export declare class ContextItemComponent {
    auth: AuthService;
    private storageService;
    typePermission: typeof TypePermission;
    color: string;
    collapsed: boolean;
    context: DetailedContext;
    private _context;
    default: boolean;
    private _default;
    selected: boolean;
    edit: EventEmitter<DetailedContext>;
    delete: EventEmitter<DetailedContext>;
    save: EventEmitter<DetailedContext>;
    clone: EventEmitter<DetailedContext>;
    hide: EventEmitter<DetailedContext>;
    show: EventEmitter<DetailedContext>;
    favorite: EventEmitter<DetailedContext>;
    managePermissions: EventEmitter<DetailedContext>;
    manageTools: EventEmitter<DetailedContext>;
    readonly hidden: boolean;
    readonly canShare: boolean;
    constructor(auth: AuthService, storageService: StorageService);
    favoriteClick(context: any): void;
}
