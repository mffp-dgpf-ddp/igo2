import { EventEmitter } from '@angular/core';
import { AuthService } from '@igo2/auth';
import { TypePermission } from '../shared/context.enum';
import { DetailedContext } from '../shared/context.interface';
export declare class ContextItemComponent {
    auth: AuthService;
    typePermission: typeof TypePermission;
    color: string;
    collapsed: boolean;
    context: DetailedContext;
    private _context;
    default: boolean;
    private _default;
    edit: EventEmitter<DetailedContext>;
    delete: EventEmitter<DetailedContext>;
    save: EventEmitter<DetailedContext>;
    clone: EventEmitter<DetailedContext>;
    favorite: EventEmitter<DetailedContext>;
    managePermissions: EventEmitter<DetailedContext>;
    manageTools: EventEmitter<DetailedContext>;
    constructor(auth: AuthService);
    favoriteClick(context: any): void;
}
