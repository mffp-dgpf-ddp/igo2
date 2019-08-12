import { EventEmitter } from '@angular/core';
import { Context } from '../shared/context.interface';
export declare class ContextEditComponent {
    context: Context;
    private _context;
    submitForm: EventEmitter<any>;
    constructor();
}
