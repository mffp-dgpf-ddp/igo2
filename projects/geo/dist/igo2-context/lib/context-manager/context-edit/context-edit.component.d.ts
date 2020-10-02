import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Context } from '../shared/context.interface';
export declare class ContextEditComponent {
    private cd;
    context: Context;
    private _context;
    submitForm: EventEmitter<Context>;
    constructor(cd: ChangeDetectorRef);
    refresh(): void;
}
